import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  convert,
  extractMain,
  decode,
  inline,
  toTable,
} from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'dive-into-systems';
const origin = 'https://diveintosystems.org';
const bookUrl = `${origin}/book/`;
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', id);
const targetDir = path.join(contentDir, id);
const imageDir = path.join(root, 'static', 'images', id);
const only = process.argv[2] || '';

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status} — ${url}`);
  return result.slice(0, split);
};

const downloadBinary = (url) =>
  execFileSync('curl', ['-fsL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      [raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const failures = [];
const skipped = [];
let imageCount = 0;

const decodeNumericEntities = (html) =>
  html
    .replace(/&#(\d+);/g, (match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (match, code) =>
      String.fromCodePoint(parseInt(code, 16))
    );

const patchCodeLanguages = (html) =>
  html.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, (match, attrs, inner) => {
    if (/data-language=/.test(attrs)) return match;
    const language =
      inner.match(/class="[^"]*\blanguage-([\w-]+)/)?.[1] ||
      inner.match(/data-lang="([\w-]+)"/)?.[1];
    return language ? `<pre${attrs} data-language="${language}">${inner}</pre>` : match;
  });

const extractAdmonitions = (html, deferred) =>
  html.replace(
    /<div class="admonitionblock ([\w-]+)">\s*<table>[\s\S]*?<\/table>\s*<\/div>/g,
    (block, kind) => {
      const contentMatch = block.match(
        /<td class="content">([\s\S]*)<\/td>\s*<\/tr>\s*<\/table>\s*<\/div>$/
      );
      const content = contentMatch ? contentMatch[1] : '';
      const title = content.match(/<div class="title">([\s\S]*?)<\/div>/)?.[1];
      const body = content.replace(/<div class="title">[\s\S]*?<\/div>/, '');
      deferred.push({ type: 'admonition', kind, title, body });
      return ` @@SPECIAL${deferred.length - 1}@@ `;
    }
  );

const extractComplexTables = (html, deferred) =>
  html.replace(/<table[\s\S]*?<\/table>/g, (table) => {
    if (!/<pre[\s>]/.test(table)) return table;
    deferred.push({ type: 'table', html: table });
    return ` @@SPECIAL${deferred.length - 1}@@ `;
  });

const renderDeferred = (item, images) => {
  if (item.type === 'admonition') {
    const label = item.kind.charAt(0).toUpperCase() + item.kind.slice(1);
    const title = item.title ? ` — ${inline(item.title)}` : '';
    const body = convertArticle(item.body, images);
    const quoted = body
      .split('\n')
      .map((line) => (line ? `> ${line}` : '>'))
      .join('\n');
    return `**${label}${title}**\n\n${quoted}`;
  }

  const rows = [...item.html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/g)].map((cell) => cell[2])
  );
  if (rows.length === 0) return '';
  const caption = item.html.match(/<caption[^>]*>([\s\S]*?)<\/caption>/)?.[1];
  const headers = rows[0].map((cell) => inline(cell));
  const chunks = [];
  if (caption) chunks.push(`**${inline(caption)}**`);
  for (const row of rows.slice(1)) {
    row.forEach((cell, index) => {
      const label = headers[index] ? `**${headers[index]}**` : '';
      const value = convertArticle(cell, images);
      const chunk = [label, value].filter(Boolean).join('\n\n');
      if (chunk) chunks.push(chunk);
    });
  }
  return chunks.join('\n\n');
};

const convertArticle = (article, images) => {
  const deferred = [];
  let html = decodeNumericEntities(patchCodeLanguages(article));
  html = extractAdmonitions(html, deferred);
  html = extractComplexTables(html, deferred);
  let markdown = convert(html, images);
  markdown = markdown.replace(/@@SPECIAL(\d+)@@/g, (match, index) => {
    const item = deferred[Number(index)];
    return item ? renderDeferred(item, images) : '';
  });
  return markdown;
};

const chapterKeyFor = (href, title) => {
  const number = title.match(/^(\d+)\./)?.[1];
  if (!number) return '';
  if (href === 'introduction.html') return `c${number}-introduction`;
  const dir = href.split('/')[0];
  let name;
  if (/^Appendix\d+$/.test(dir)) name = `appendix-${dir.replace('Appendix', '')}`;
  else {
    const parts = dir.split('-');
    name = (parts.length > 1 ? parts.slice(1).join('-') : parts[0]).replace(/^C_/i, '');
  }
  name = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `c${number}-${name}`;
};

const collectImages = (article, pageUrl, key) => {
  const images = [];
  const processed = article.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = decodeNumericEntities(
      tag.match(/alt="([^"]*)"/)?.[1] || ''
    ).trim();
    if (!src || src.startsWith('data:')) return '';
    const resolved = new URL(src, pageUrl);
    const base = path.basename(resolved.pathname).replace(/[^.\w-]/g, '_') || 'image';
    const name = `${key}-${images.length}-${base}`;
    const webp = path.join(imageDir, name.replace(/\.\w+$/, '.webp'));
    if (!fs.existsSync(webp)) {
      try {
        const ext = path.extname(name) || '.img';
        const raw = path.join(
          imageDir,
          `${name.slice(0, name.length - ext.length)}.tmp${ext}`
        );
        fs.writeFileSync(raw, downloadBinary(resolved.href));
        optimize(raw, webp);
        imageCount += 1;
      } catch (error) {
        console.warn(`تعذّر تنزيل ${resolved.href}`);
        failures.push({ url: resolved.href, reason: 'image download' });
      }
    }
    const local = fs.existsSync(webp)
      ? `/images/${id}/${path.basename(webp)}`
      : resolved.href;
    images.push({ src, alt, local });
    return ` IMAGE${images.length - 1}END `;
  });
  return { processed, images };
};

const extractArticle = (html) => {
  let main = extractMain(html, 'main');
  const end = main.lastIndexOf('</main>');
  if (end >= 0) main = main.slice(0, end);
  const match = main.match(/<article class="doc">([\s\S]*?)<\/article>/);
  let article = match ? match[1] : main;
  article = article
    .replace(/<(script|style|nav|aside|footer|header)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<div class="toolbar"[\s\S]*?<\/nav>\s*<\/div>/gi, '');
  return article;
};

const resolveLinks = (html, pageUrl) =>
  html.replace(/href="([^"]+)"/g, (match, href) => {
    if (/^(https?:|mailto:|#|data:)/i.test(href)) return match;
    return `href="${new URL(href, pageUrl).href}"`;
  });

const verify = (key, body) => {
  const fences = (body.match(/^```/gm) || []).length;
  const issues = [];
  if (body.length <= 1000) issues.push(`too short (${body.length})`);
  if (fences % 2 !== 0) issues.push(`unbalanced fences (${fences})`);
  if (issues.length > 0) failures.push({ url: `${id}/${key}`, reason: issues.join(', ') });
  return issues;
};

const tocHtml = fetchText(bookUrl);
fs.writeFileSync(path.join(sourceDir, 'toc.html'), tocHtml);

const links = [];
const navPattern =
  /<li class="nav-item" data-depth="(\d+)">\s*(?:<button[^>]*>\s*<\/button>\s*)?<a class="nav-link" href="([^"]+)">([\s\S]*?)<\/a>/g;
let navMatch;
while ((navMatch = navPattern.exec(tocHtml)) !== null) {
  links.push({
    depth: Number(navMatch[1]),
    href: navMatch[2],
    title: decode(navMatch[3].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(),
  });
}

const chapters = links
  .filter(
    (link) =>
      link.depth === 1 &&
      (link.href === 'introduction.html' ||
        /^(C\d+-[^/]+|Appendix\d+)\/index\.html$/.test(link.href))
  )
  .map((link) => ({
    ...link,
    key: chapterKeyFor(link.href, link.title),
    dir: link.href.includes('/') ? link.href.split('/')[0] : null,
  }));

if (chapters.some((chapter) => !chapter.key)) {
  throw new Error('تعذّر اشتقاق مفاتيح الفصول من فهرس الكتاب');
}

const structure = { chapters: [] };
const imageMap = {};

for (const [chapterIndex, chapter] of chapters.entries()) {
  if (only && chapter.key !== only && !chapter.key.startsWith(`${only}-`)) continue;

  const chapterDir = path.join(sourceDir, chapter.key);
  fs.mkdirSync(chapterDir, { recursive: true });

  const sectionLinks = chapter.dir
    ? links.filter(
        (link) =>
          link.href.startsWith(`${chapter.dir}/`) &&
          link.href.endsWith('.html') &&
          link.href !== chapter.href
      )
    : [];
  const seen = new Set();
  const pages = [
    { href: chapter.href, title: chapter.title, slug: 'index' },
    ...sectionLinks
      .filter((link) => {
        if (seen.has(link.href)) return false;
        seen.add(link.href);
        return true;
      })
      .map((link) => ({
        href: link.href,
        title: link.title,
        slug: link.href.split('/').pop().replace(/\.html$/, ''),
      })),
  ];

  const parts = [];
  let chapterTitle = chapter.title;

  for (const page of pages) {
    const pageUrl = new URL(page.href, bookUrl).href;
    let html;
    try {
      html = fetchText(pageUrl);
    } catch (error) {
      console.warn(`تخطّي ${chapter.key}/${page.slug}: ${error.message}`);
      failures.push({ url: pageUrl, reason: error.message });
      continue;
    }
    fs.writeFileSync(
      path.join(chapterDir, `${page.slug}.html`),
      html
    );

    const article = resolveLinks(extractArticle(html), pageUrl);
    const { processed, images } = collectImages(article, pageUrl, chapter.key);
    for (const image of images) imageMap[image.src] ??= image.local;

    let markdown = convertArticle(processed, images).trim();
    if (markdown.startsWith('#')) {
      const headingMatch = markdown.match(/^#{1,4}\s+(.+?)(?:\s+\{#[^}]+\})?\n/);
      if (headingMatch) {
        if (page.slug === 'index') {
          chapterTitle = headingMatch[1]
            .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
            .trim();
        }
        markdown = markdown.slice(headingMatch[0].length).trim();
      }
    }

    fs.writeFileSync(
      path.join(chapterDir, `${page.slug}.md`),
      `---\ntitle: ${JSON.stringify(page.title)}\nlang: en\n---\n\n${markdown}\n`
    );

    if (markdown) parts.push(markdown);
    console.log(`${chapter.key}/${page.slug}: ${markdown.length} chars`);
  }

  const body = parts.join('\n\n').trim();
  verify(chapter.key, body);

  const file = path.join(targetDir, `${chapter.key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (/lang:\s*ar/.test(existing)) {
    console.warn(`تخطّي الكتابة (lang: ar): ${file}`);
    skipped.push(file);
  } else {
    fs.writeFileSync(
      file,
      `---\ntitle: ${JSON.stringify(chapterTitle)}\nlang: en\nsource: ${new URL(chapter.href, bookUrl).href}\n---\n\n${body}\n`
    );
  }

  structure.chapters.push({
    key: chapter.key,
    title: chapterTitle,
    titleAr: chapterTitle,
    sections: [{ slug: 'index', title: chapterTitle, order: chapterIndex }],
  });
}

fs.writeFileSync(
  path.join(contentDir, `${id}-structure.json`),
  JSON.stringify(structure, null, 2)
);
fs.writeFileSync(
  path.join(sourceDir, 'image-map.json'),
  JSON.stringify(imageMap, null, 2)
);

console.log(`\n${id}: ${structure.chapters.length} chapters, ${imageCount} images`);
if (skipped.length) console.log(`skipped (lang: ar): ${skipped.length}`);
if (failures.length) {
  console.log(`failures: ${failures.length}`);
  for (const failure of failures) console.log(`  ${failure.url} — ${failure.reason}`);
}