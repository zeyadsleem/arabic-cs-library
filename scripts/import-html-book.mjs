import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain, normalizeLegacyHtml } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = process.argv[2];
if (!configPath) {
  console.error('usage: node scripts/import-html-book.mjs <config.json>');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { id, origin, pages, mainSelector = 'body' } = config;
const imageDir = path.join(root, 'static', 'images', id);
const contentDir = path.join(root, 'content', id);
const sourceDir = path.join(root, 'content-src', id);
for (const dir of [imageDir, contentDir, sourceDir]) fs.mkdirSync(dir, { recursive: true });

const slugify = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

const fetchText = (url, attempts = 4) => {
  let lastError = new Error('unreachable');
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const out = execFileSync(
        'curl',
        [
          '-sL',
          '--compressed',
          '-m',
          '120',
          '--retry',
          '2',
          '--retry-delay',
          '3',
          '--retry-all-errors',
          '-w',
          '\n%{http_code}',
          url,
        ],
        { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }
      );
      const cut = out.lastIndexOf('\n');
      const status = Number(out.slice(cut + 1).trim());
      if (status === 200) return out.slice(0, cut);
      lastError = new Error(`HTTP ${status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

const download = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '120', url], {
    maxBuffer: 128 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      ['convert', raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 90000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const dropMacroPreamble = (text) => {
  const start = text.indexOf('(\\usepackage');
  if (start === -1) return text;
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === '(') depth += 1;
    else if (text[index] === ')') {
      depth -= 1;
      if (depth === 0) {
        return `${text.slice(0, start)}${text.slice(index + 1).replace(/^\s+/, '')}`;
      }
    }
  }
  return text;
};

const stripBoilerplate = (html) =>
  html
    .replace(/<header\b[\s\S]*?<\/header>/gi, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, '')
    .replace(/<div id="ptx-navbar"[\s\S]*?<\/div>/gi, '')
    .replace(/<div id="ptx-sidebar"[\s\S]*?<\/div>\s*<\/div>/gi, '')
    .replace(/<nav id="ptx-toc"[\s\S]*?<\/nav>/gi, '')
    .replace(/<div class="navigation"[\s\S]*?<\/div>/gi, '')
    .replace(
      /<img[^>]*alt="(?:next|up|prev|previous|contents|index|back|home|first|last|top|bottom)"[^>]*>/gi,
      ''
    )
    .replace(/Skip to main content/gi, '');

let imageCount = 0;
const vectorImages = new Set();

const localizeImages = (article, pageUrl, prefix) => {
  const refs = [];
  const next = article.replace(/<img[^>]*>/gi, (tag) => {
    const src = tag.match(/src="([^"]+)"/i)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/i)?.[1] || '').trim();
    if (!src) return '';
    let resolved;
    try {
      resolved = new URL(src, pageUrl).href;
    } catch {
      return '';
    }
    const name = `${prefix}-${path
      .basename(new URL(resolved).pathname)
      .replace(/[^.\w-]/g, '_')}`;
    const webp = path.join(imageDir, `${name}.webp`);
    const svg = path.join(imageDir, `${name}.svg`);
    try {
      if (/\.svg(\?|$)/i.test(resolved)) {
        if (!fs.existsSync(svg)) {
          const raw = path.join(imageDir, `${name}.raw`);
          fs.writeFileSync(raw, download(resolved));
          fs.renameSync(raw, svg);
          vectorImages.add(path.basename(svg));
          imageCount += 1;
        }
      } else if (!fs.existsSync(webp)) {
        const raw = path.join(imageDir, `${name}.raw`);
        fs.writeFileSync(raw, download(resolved));
        optimize(raw, webp);
        imageCount += 1;
      }
    } catch (error) {
      console.warn(`  image failed: ${resolved}`);
    }
    refs.push({
      alt,
      local: fs.existsSync(webp)
        ? `/images/${id}/${path.basename(webp)}`
        : vectorImages.has(path.basename(svg))
          ? `/images/${id}/${path.basename(svg)}`
          : src,
    });
    return ` IMAGE${refs.length - 1}END `;
  });
  return { article: next, refs };
};

const clean = (rawText) =>
  dropMacroPreamble(rawText)
    .replace(/^#\s+.*\n/, '')
    .replace(/\[\]\([^)]*\)/g, '')
    .replace(/^\*\*\s*Next:\*\*.*$/m, '')
    .replace(/^\*\*\s*Up:\*\*.*$/m, '')
    .replace(/^\*\*\s*Previous:\*\*.*$/m, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const loadPage = (url, key) => {
  const html = fetchText(url);
  fs.writeFileSync(path.join(sourceDir, `${key}.html`), html);
  let article = extractMain(stripBoilerplate(html), mainSelector);
  if (config.legacy) article = normalizeLegacyHtml(article);
  if (config.bodyStart) {
    const at = article.search(new RegExp(config.bodyStart));
    if (at > 0) {
      const open = article.indexOf('>', at);
      article = article.slice(open + 1);
    }
  }
  const localized = localizeImages(article, url, key);
  return {
    html,
    rawTitle: html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '',
    article: localized.article,
    refs: localized.refs,
    pageTitle: html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || '',
  };
};

// Some books split chapters into section pages whose slug prefixes do not match
// the chapter key, so the mapping is declared per book in the config. Section
// order follows the table of contents.
const sectionSlugs = new Map();
if (config.tocUrl && config.sectionChapterMap) {
  const toc = fetchText(config.tocUrl);
  const order = [
    ...new Set([...toc.matchAll(/href="(sec_[a-z0-9_-]+)\.html"/gi)].map((match) => match[1])),
  ];
  const prefixes = Object.keys(config.sectionChapterMap).sort((a, b) => b.length - a.length);
  for (const slug of order) {
    const prefix = prefixes.find((candidate) => slug.startsWith(candidate));
    if (!prefix) continue;
    const chapterKey = config.sectionChapterMap[prefix];
    if (!sectionSlugs.has(chapterKey)) sectionSlugs.set(chapterKey, []);
    sectionSlugs.get(chapterKey).push(slug);
  }
  const total = [...sectionSlugs.values()].reduce((sum, list) => sum + list.length, 0);
  console.log(`toc: ${total} sections across ${sectionSlugs.size} chapters`);
}

const structure = { chapters: [] };
const writeFile = (chapterKey, slug, heading, text, source) => {
  const target = path.join(contentDir, `${chapterKey}--${slug}.md`);
  const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      target,
      `---\ntitle: "${heading.replace(/"/g, '')}"\nlang: en\nsource: ${source}\n---\n\n${text}\n`
    );
  }
};

for (const [key, expectedTitle] of pages) {
  const url = `${origin}${key}${config.pageSuffix || ''}`;
  const sections = [];

  let chapterPage;
  try {
    chapterPage = loadPage(url, key);
  } catch (error) {
    console.warn(`skip ${key}: ${error.message}`);
    continue;
  }
  const ownSections = sectionSlugs.get(key) || [];
  if (ownSections.length) {
    for (const sectionSlug of ownSections) {
      const sectionUrl = `${origin}${sectionSlug}${config.pageSuffix || ''}`;
      let page;
      try {
        page = loadPage(sectionUrl, sectionSlug);
      } catch (error) {
        console.warn(`  skip ${sectionSlug}: ${error.message}`);
        continue;
      }
      const body = clean(convert(page.article, page.refs));
      if (!body) continue;
      const heading = (page.pageTitle || '').split(/\s*[—–|]\s*/)[0].trim() || expectedTitle;
      const slug = slugify(sectionSlug) || `s${sections.length}`;
      writeFile(key, slug, heading, body, sectionUrl);
      sections.push({ slug, title: heading, order: sections.length });
    }
    const chapterBody = sections
      .map((entry) => readSection(key, entry.slug))
      .join('\n\n');
    fs.writeFileSync(
      path.join(sourceDir, `${key}.md`),
      `---\ntitle: "${expectedTitle}"\nlang: en\n---\n\n${chapterBody}\n`
    );
    structure.chapters.push({ key, title: expectedTitle, titleAr: expectedTitle, sections });
    console.log(`${id}/${key}: ${sections.length} sections, ${chapterBody.length} chars`);
    continue;
  }

  const fullBody = clean(convert(chapterPage.article, chapterPage.refs));

  if (config.splitSections) {
    const intro = [];
    const blocks = [];
    let current = null;
    for (const line of fullBody.split('\n')) {
      if (/^#{1,3}\s+/.test(line)) {
        current = { title: line.replace(/^#+\s*/, '').trim(), lines: [line] };
        blocks.push(current);
      } else if (current) {
        current.lines.push(line);
      } else {
        intro.push(line);
      }
    }
    let order = 0;
    const introText = intro.join('\n').trim();
    if (introText) {
      writeFile(key, 'index', expectedTitle, introText, url);
      sections.push({ slug: 'index', title: expectedTitle, order });
      order += 1;
    }
    for (const block of blocks) {
      const text = block.lines.join('\n').trim();
      if (text.length < 200) continue;
      const slug = slugify(block.title) || `s${order}`;
      writeFile(key, slug, block.title, text, url);
      sections.push({ slug, title: block.title, order });
      order += 1;
    }
    const joined = sections.map((entry) => readSection(key, entry.slug)).join('\n\n');
    fs.writeFileSync(
      path.join(sourceDir, `${key}.md`),
      `---\ntitle: "${expectedTitle}"\nlang: en\n---\n\n${joined}\n`
    );
    structure.chapters.push({ key, title: expectedTitle, titleAr: expectedTitle, sections });
    console.log(`${id}/${key}: ${sections.length} sections, ${joined.length} chars`);
    continue;
  }

  const body = fullBody;
  const heading = chapterPage.rawTitle || expectedTitle;
  writeFile(key, 'index', heading, body, url);
  fs.writeFileSync(
    path.join(sourceDir, `${key}.md`),
    `---\ntitle: "${heading.replace(/"/g, '')}"\nlang: en\n---\n\n${body}\n`
  );
  structure.chapters.push({
    key,
    title: heading,
    titleAr: heading,
    sections: [{ slug: 'index', title: heading, order: 0 }],
  });
  console.log(`${id}/${key}: ${body.length} chars`);
}

function readSection(chapterKey, slug) {
  const file = path.join(contentDir, `${chapterKey}--${slug}.md`);
  return fs.existsSync(file)
    ? fs.readFileSync(file, 'utf8').replace(/^---[\s\S]*?---\n\n/, '').trim()
    : '';
}

fs.writeFileSync(
  path.join(root, 'content', `${id}-structure.json`),
  JSON.stringify(structure, null, 2)
);
console.log(`${id}: ${structure.chapters.length} chapters, ${imageCount} new images`);
