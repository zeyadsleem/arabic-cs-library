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
const { id, origin, pages, mainSelector = 'body', titleSelector = 'h1' } = config;
const imageDir = path.join(root, 'static', 'images', id);
const contentDir = path.join(root, 'content', id);
const sourceDir = path.join(root, 'content-src', id);
for (const dir of [imageDir, contentDir, sourceDir]) fs.mkdirSync(dir, { recursive: true });

const dropMacroPreamble = (text) => {
  const start = text.indexOf('(\\usepackage');
  if (start === -1) return text;
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === '(') depth += 1;
    else if (text[index] === ')') {
      depth -= 1;
      if (depth === 0) {
        return `${text.slice(0, start)}${text
          .slice(index + 1)
          .replace(/^\s+/, '')}`;
      }
    }
  }
  return text;
};

const titleFromSlug = (slug) =>
  slug
    .replace(/^sec_/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .trim();

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

const fetchText = (url) => {
  const out = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '120', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }
  );
  const cut = out.lastIndexOf('\n');
  const status = Number(out.slice(cut + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
  return out.slice(0, cut);
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

const stripBoilerplate = (html, url) =>
  html
    .replace(/<header\b[\s\S]*?<\/header>/gi, '')
    .replace(/<div id="ptx-navbar"[\s\S]*?<\/div>/gi, '')
    .replace(/<a class="skip"[\s\S]*?<\/a>/gi, '')
    .replace(/Skip to main content/gi, '')
    .replace(/<div class="navigation"[\s\S]*?<\/div>/gi, '')
    .replace(/<p class="navigation"[\s\S]*?<\/p>/gi, '')
    .replace(
      /<img[^>]*alt="(?:next|up|prev|previous|contents|index|back|home|first|last|top|bottom)"[^>]*>/gi,
      ''
    )
    .replace(/<(script|style|head)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<nav\b[\s\S]*?<\/nav>/g, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/g, '')
    .replace(new RegExp(`<link[^>]*href="[^"]*${url.split('/').pop()}[^"]*"[^>]*>`, 'g'), '');

const chapterSections = new Map();
if (config.tocUrl) {
  const toc = fetchText(config.tocUrl);
  const chapterKeys = config.pages.map(([key]) => key);
  const order = [
    ...toc.matchAll(
      /href="(frontmatter|preface|ch_[a-z_]+|backmatter|sec_[a-z_]+-[a-z0-9_-]+)\.html"/g
    ),
  ].map((match) => match[1]);
  let current = null;
  for (const entry of order) {
    if (chapterKeys.includes(entry)) {
      current = entry;
      if (!chapterSections.has(current)) chapterSections.set(current, []);
    } else if (current && entry.startsWith('sec_')) {
      chapterSections.get(current).push(entry);
    }
  }
  const total = [...chapterSections.values()].reduce((sum, list) => sum + list.length, 0);
  console.log(`toc: ${total} sections across ${chapterSections.size} chapters`);
}

let sectionMap = new Map();
if (false) {
  const toc = fetchText(config.tocUrl);
  const seen = new Set();
  for (const match of toc.matchAll(/href="(\d+_[^"#]*?)\.html"/gi)) {
    const slug = match[1];
    const chapterKey = slug.split('_').slice(0, 2).join('_');
    if (seen.has(slug)) continue;
    seen.add(slug);
    if (!sectionMap.has(chapterKey)) sectionMap.set(chapterKey, []);
    sectionMap.get(chapterKey).push(slug);
  }
  console.log(`toc: ${seen.size} sections across ${sectionMap.size} chapters`);
}

const structure = { chapters: [] };
const vectorImages = new Set();
let imageCount = 0;

for (const [key, expectedTitle, sectionPrefix] of pages) {
  const url = `${origin}${key}${config.pageSuffix || ''}`;
  let html;
  try {
    html = fetchText(url);
  } catch (error) {
    console.warn(`skip ${key}: ${error.message}`);
    continue;
  }
  fs.writeFileSync(path.join(sourceDir, `${key}.html`), html);

  let article = extractMain(stripBoilerplate(html, url), mainSelector);
  if (config.legacy) article = normalizeLegacyHtml(article);
  if (config.bodyStart) {
    const at = article.search(new RegExp(config.bodyStart));
    if (at > 0) {
      const open = article.indexOf('>', at);
      article = article.slice(open + 1);
    }
  }

  const refs = [];
  article = article.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src) return '';
    let resolved;
    try {
      resolved = new URL(src, url).href;
    } catch {
      return '';
    }
    const name = `${key}-${path.basename(new URL(resolved).pathname).replace(/[^.\w-]/g, '_')}`;
    const webp = path.join(imageDir, `${name}.webp`);
    if (!fs.existsSync(webp)) {
      try {
        const raw = path.join(imageDir, `${name}.raw`);
        fs.writeFileSync(raw, download(resolved));
        if (/\.svg(\?|$)/i.test(resolved)) {
          const svg = path.join(imageDir, `${name}.svg`);
          fs.renameSync(raw, svg);
          vectorImages.add(path.basename(svg));
        } else {
          optimize(raw, webp);
        }
        imageCount += 1;
      } catch (error) {
        console.warn(`image failed: ${resolved}`);
      }
    }
    refs.push({
      alt,
      local: fs.existsSync(webp) ? `/images/${id}/${path.basename(webp)}` : src,
    });
    return ` IMAGE${refs.length - 1}END `;
  });

  let parts = [{ url, article, refs: [] }];
  if (config.discoverSections) {
    const chapterNumber = key.split('_')[0];
    const linkPattern = sectionPrefix
      ? new RegExp(`href=["'](${sectionPrefix}[^"']*?\\.html)["']`, 'gi')
      : new RegExp(`href=["'](${chapterNumber}_\\d[^"']*?\\.html)["']`, 'gi');
    const seen = new Set();
    const links = (chapterSections.get(key) || [])
      .map((slug) => `${slug}.html`)
      .filter((value) => !seen.has(value) && seen.add(value));
    for (const link of links) {
      const subUrl = `${origin}${link}`;
      let subHtml;
      try {
        subHtml = fetchText(subUrl);
      } catch (error) {
        console.warn(`  skip ${link}: ${error.message}`);
        continue;
      }
      let subArticle = extractMain(stripBoilerplate(subHtml, subUrl), mainSelector);
      if (config.legacy) subArticle = normalizeLegacyHtml(subArticle);
      const subRefs = [];
      subArticle = subArticle.replace(/<img[^>]*>/gi, (tag) => {
        const src = tag.match(/src="([^"]+)"/i)?.[1];
        const alt = (tag.match(/alt="([^"]*)"/i)?.[1] || '').trim();
        if (!src) return '';
        let resolved;
        try {
          resolved = new URL(src, subUrl).href;
        } catch {
          return '';
        }
        const name = `${link.replace(/\.html$/, '')}-${path
          .basename(new URL(resolved).pathname)
          .replace(/[^.\w-]/g, '_')}`;
        const webp = path.join(imageDir, `${name}.webp`);
        if (!fs.existsSync(webp)) {
          try {
            const raw = path.join(imageDir, `${name}.raw`);
            fs.writeFileSync(raw, download(resolved));
            if (/\.svg(\?|$)/i.test(resolved)) {
              const svg = path.join(imageDir, `${name}.svg`);
              fs.renameSync(raw, svg);
              vectorImages.add(path.basename(svg));
            } else {
              optimize(raw, webp);
            }
            imageCount += 1;
          } catch (error) {
            console.warn(`  image failed: ${resolved}`);
          }
        }
        const vectorName = `${name}.svg`;
        subRefs.push({
          alt,
          local: fs.existsSync(webp)
            ? `/images/${id}/${path.basename(webp)}`
            : vectorImages.has(vectorName)
              ? `/images/${id}/${vectorName}`
              : src,
        });
        return ` IMAGE${subRefs.length - 1}END `;
      });
      parts.push({ url: subUrl, article: subArticle, refs: subRefs });
    }
  }

  const rawTitle =
    article.match(new RegExp(`<${titleSelector}[^>]*>([\\s\\S]*?)</${titleSelector}>`))?.[1]?.replace(
      /<[^>]+>/g,
      ''
    ) ||
    html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<[^>]+>/g, '') ||
    expectedTitle;
  const title = (rawTitle || expectedTitle).replace(/\s+/g, ' ').trim();

  if (parts.length > 1) {
    parts = parts.slice(1);
  }

  const clean = (rawText) =>
    dropMacroPreamble(rawText)
      .replace(/^#\s+.*\n/, '')
      .replace(/\(\s*\\usepackage[^)]*?\)/g, '')
      .replace(/\[\]\([^)]*\)/g, '')
      .replace(/^\*\*\s*Next:\*\*.*$/m, '')
      .replace(/^\*\*\s*Up:\*\*.*$/m, '')
      .replace(/^\*\*\s*Previous:\*\*.*$/m, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

  const splitInline = (text) => {
    const blocks = [];
    const intro = [];
    let current = null;
    for (const line of text.split('\n')) {
      if (/^##\s+/.test(line)) {
        current = { heading: line.replace(/^##\s+/, '').trim(), lines: [line] };
        blocks.push(current);
      } else if (current) {
        current.lines.push(line);
      } else {
        intro.push(line);
      }
    }
    return {
      intro: intro.join('\n').trim(),
      blocks: blocks
        .map((block) => ({
          title: block.heading.replace(/^\d+(\.\d+)*\s*/, '').trim() || block.heading,
          text: block.lines.join('\n').trim(),
        }))
        .filter((block) => block.text),
    };
  };

  const sectionTitles = parts.map((part, index) => {
    const heading = part.article
      .match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
      ?.replace(/<[^>]+>/g, '')
      .replace(/^\d+(\.\d+)*\s*/, '')
      .trim();
    if (config.titleFromSlug && part.slug) return titleFromSlug(part.slug);
    if (heading && heading.toLowerCase() !== title.toLowerCase()) return heading;
    const convertedFirst = convert(part.article, part.refs).trim().split('\n')[0] || '';
    const fromContent = convertedFirst.replace(/^#+\s*/, '').trim();
    if (fromContent && fromContent.length > 3 && !/^\d+(\.\d+)*$/.test(fromContent)) {
      return fromContent.replace(/^\d+(\.\d+)*\s*/, '');
    }
    return `${title} — ${index + 1}`;
  });

  const bodies = parts.map((part, index) => {
    const converted = convert(part.article, part.refs).trim();
    if (index === 0) return clean(converted);
    const firstLine = converted.split('\n')[0] || '';
    if (/^#{1,2}\s/.test(firstLine)) return clean(converted.replace(/^#{1,2}\s/, '## '));
    return clean(`## ${sectionTitles[index]}\n\n${converted}`);
  });

  const writeFile = (slug, heading, text) => {
    const target = path.join(contentDir, `${key}--${slug}.md`);
    const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
    if (!/lang: ar/.test(existing)) {
      fs.writeFileSync(
        target,
        `---\ntitle: "${heading.replace(/"/g, '')}"\nlang: en\nsource: ${url}\n---\n\n${text}\n`
      );
    }
    return target;
  };

  const sections = [];
  if (config.splitSections) {
    let unitIndex = 0;
    bodies.forEach((text, index) => {
      if (parts.length === 1) {
        const { intro, blocks } = splitInline(text);
        if (intro) {
          writeFile('index', title, intro);
          sections.push({ slug: 'index', title, order: unitIndex });
          unitIndex += 1;
        }
        blocks.forEach((block) => {
          const slug = `s${unitIndex}-${slugify(block.title)}`;
          writeFile(slug, block.title, block.text);
          sections.push({ slug, title: block.title, order: unitIndex });
          unitIndex += 1;
        });
        return;
      }
      const slug =
        index === 0 && !parts.slice(1).length
          ? 'index'
          : `${slugify(sectionTitles[index]) || `s${index}`}`;
      writeFile(slug, sectionTitles[index], text);
      sections.push({ slug, title: sectionTitles[index], order: unitIndex });
      unitIndex += 1;
    });
  }

  const body = bodies.join('\n\n');
  if (!config.splitSections) {
    writeFile('index', title, body);
  }
  fs.writeFileSync(
    path.join(sourceDir, `${key}.md`),
    `---\ntitle: "${title.replace(/"/g, '')}"\nlang: en\n---\n\n${body}\n`
  );

  const file = path.join(contentDir, `${key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: "${title.replace(/"/g, '')}"\nlang: en\nsource: ${url}\n---\n\n${body}\n`
    );
  }
  fs.writeFileSync(
    path.join(sourceDir, `${key}.md`),
    `---\ntitle: "${title.replace(/"/g, '')}"\nlang: en\n---\n\n${body}\n`
  );

  structure.chapters.push({
    key,
    title,
    titleAr: title,
    sections: sections.length
      ? sections
      : [{ slug: 'index', title, order: structure.chapters.length }],
  });
  console.log(`${id}/${key}: ${body.length} chars, ${refs.length} images`);
}

fs.writeFileSync(
  path.join(root, 'content', `${id}-structure.json`),
  JSON.stringify(structure, null, 2)
);
console.log(`${id}: ${structure.chapters.length} chapters, ${imageCount} new images`);
