import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain, decode, inline } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'use-the-index-luke';
const origin = 'https://use-the-index-luke.com';
const tocUrl = `${origin}/sql/table-of-contents`;
const contentDir = path.join(root, 'content', id);
const sourceDir = path.join(root, 'content-src', id);
const imageDir = path.join(root, 'static', 'images', id);

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

const download = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      ['convert', raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const keyOf = (url) =>
  new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-');

const articleOf = (html) => {
  const start = html.indexOf('<div id="article">');
  if (start < 0) return extractMain(html, 'article');
  const open = html.indexOf('>', start);
  const rest = html.slice(open + 1);
  const end = rest.indexOf('<div id="below-article">');
  return end >= 0 ? rest.slice(0, end) : rest;
};

const titleOf = (html) => {
  const heading = html.match(/<h1[^>]*id="main-title"[^>]*>([\s\S]*?)<\/h1>/);
  if (heading) return inline(heading[1]);
  const title = html.match(/<title>([\s\S]*?)<\/title>/);
  return title ? decode(title[1]).trim() : '';
};

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const pages = [];
const seen = new Set();
const addPage = (href, base) => {
  let resolved;
  try {
    resolved = new URL(href, base);
  } catch {
    return;
  }
  const pathname = resolved.pathname.replace(/\/$/, '');
  if (!pathname.startsWith('/sql/') || pathname === '/sql/table-of-contents') return;
  if (pathname.includes('3-minute-quiz')) return;
  const key = keyOf(resolved.href);
  if (seen.has(key)) return;
  seen.add(key);
  pages.push({ key, url: `${origin}${pathname}` });
};

const toc = fetchText(tocUrl);
for (const match of articleOf(toc).matchAll(/href="([^"]+)"/g)) addPage(match[1], tocUrl);

const structure = { chapters: [] };
const imageMap = {};
const failures = [];
let imported = 0;
let imagesDownloaded = 0;

for (let index = 0; index < pages.length; index += 1) {
  const { key, url } = pages[index];
  let html;
  try {
    html = fetchText(url);
  } catch (error) {
    failures.push(`${key}: ${error.message}`);
    console.warn(`تخطّي ${key}: ${error.message}`);
    continue;
  }
  fs.writeFileSync(path.join(sourceDir, `${key}.html`), html);

  const title = titleOf(html) || key;
  let article = articleOf(html)
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<(script|style|form|aside|footer|header|nav|button)[\s\S]*?<\/\1>/g, '')
    .replace(/<a[^>]*id="nav[-a-z]*"[^>]*>[\s\S]*?<\/a>/g, '');

  for (const match of article.matchAll(/href="([^"]+)"/g)) addPage(match[1], url);

  const images = [];
  article = article.replace(/<img[^>]*>/g, (tag) => {
    const src =
      tag.match(/data-lazy-src="([^"]+)"/)?.[1] ?? tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src || src.startsWith('data:')) return '';
    const resolved = new URL(src, url);
    const name = `${key}-${images.length}-${path
      .basename(resolved.pathname)
      .replace(/[^.\w-]/g, '_')}`;
    const target = path.join(imageDir, name);
    const webp = target.replace(/\.\w+$/, '.webp');
    if (!fs.existsSync(webp)) {
      try {
        const raw = path.join(imageDir, name);
        fs.writeFileSync(raw, download(resolved.href));
        optimize(raw, webp);
        imagesDownloaded += 1;
      } catch (error) {
        console.warn(`تعذّر تنزيل ${resolved.href}`);
      }
    }
    const local = fs.existsSync(webp)
      ? `/images/${id}/${path.basename(webp)}`
      : src;
    imageMap[src] = local;
    images.push({ src, alt, local });
    return ` IMAGE${images.length - 1}END `;
  });

  const body = convert(article, images).trim();

  fs.writeFileSync(
    path.join(sourceDir, `${key}.md`),
    `---\ntitle: "${title}"\nlang: en\n---\n\n${body}\n`
  );

  const file = path.join(contentDir, `${key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (/lang: ar/.test(existing)) {
    console.log(`تخطّي ${key}: ترجمة عربية موجودة`);
  } else {
    fs.writeFileSync(
      file,
      `---\ntitle: "${title}"\nlang: en\nsource: ${url}\n---\n\n${body}\n`
    );
    imported += 1;
  }

  structure.chapters.push({
    key,
    title,
    titleAr: title,
    sections: [{ slug: 'index', title, order: structure.chapters.length }],
  });
  console.log(`${key}: ${body.length} chars`);
}

const structureFile = path.join(root, 'content', `${id}-structure.json`);
fs.writeFileSync(structureFile, JSON.stringify(structure, null, 2));
fs.writeFileSync(
  path.join(sourceDir, 'image-map.json'),
  JSON.stringify(imageMap, null, 2)
);

const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith('--index.md'))
  .sort();
const short = [];
const unbalanced = [];
for (const file of files) {
  const text = fs.readFileSync(path.join(contentDir, file), 'utf8');
  if (text.length <= 1500) short.push(`${file} (${text.length})`);
  const fences = (text.match(/^```/gm) || []).length;
  if (fences % 2 !== 0) unbalanced.push(file);
}

console.log(`pages discovered: ${pages.length}`);
console.log(`pages imported: ${imported}`);
console.log(`images downloaded: ${imagesDownloaded}`);
console.log(`failures: ${failures.length}${failures.length ? ` — ${failures.join('; ')}` : ''}`);
console.log(`short files: ${short.length}${short.length ? ` — ${short.join(', ')}` : ''}`);
console.log(`unbalanced fences: ${unbalanced.length}${unbalanced.length ? ` — ${unbalanced.join(', ')}` : ''}`);
console.log(`structure: ${structureFile}`);
