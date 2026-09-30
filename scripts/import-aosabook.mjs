import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'aosabook');
const sourceDir = path.join(root, 'content-src', 'aosabook');
const imageDir = path.join(root, 'static', 'images', 'aosabook');
const origin = 'https://aosabook.org';

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
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

const index = fetchText(`${origin}/en/`);
const chapters = ['v1', 'v2'].flatMap((volume) =>
  [...new Set([...index.matchAll(new RegExp(`(${volume}/[a-z0-9_-]+\\.html)`, 'g'))].map((match) => match[1]))]
    .sort()
);

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const structure = { chapters: [] };
let imageCount = 0;

for (const chapter of chapters) {
  const url = `${origin}/en/${chapter}`;
  const key = chapter.replace(/\.html$/, '').replace('/', '-');
  let html;
  try {
    html = fetchText(url);
  } catch (error) {
    console.warn(`تخطّي ${chapter}`);
    continue;
  }
  fs.writeFileSync(path.join(sourceDir, `${key}.html`), html);

  let article = extractMain(html, 'article');
  const bodyStart = article.indexOf('id="content');
  if (bodyStart > 0) {
    const open = article.indexOf('>', bodyStart);
    article = article.slice(open + 1);
  }
  article = article.replace(/<(script|style|nav|footer|form)[\s\S]*?<\/\1>/g, '');

  const images = [];
  article = article.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src) return '';
    const resolved = new URL(src, url).href;
    const name = `${key}-${path
      .basename(new URL(resolved).pathname)
      .replace(/[^.\w-]/g, '_')}`;
    const target = path.join(imageDir, name);
    const webp = target.replace(/\.\w+$/, '.webp');
    if (!fs.existsSync(webp)) {
      try {
        const raw = path.join(imageDir, `${name}.raw`);
        fs.writeFileSync(raw, download(resolved));
        optimize(raw, webp);
        imageCount += 1;
      } catch (error) {
        console.warn(`تعذّر تنزيل ${resolved}`);
      }
    }
    images.push({
      alt,
      local: fs.existsSync(webp) ? `/images/aosabook/${path.basename(webp)}` : src,
    });
    return ` IMAGE${images.length - 1}END `;
  });

  const title =
    extractMain(html, 'h1') !== html
      ? html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim()
      : key;
  const body = convert(article, images)
    .replace(/^#\s+.*\n/, '')
    .trim();

  fs.writeFileSync(
    path.join(sourceDir, `${key}.md`),
    `---\ntitle: "${(title || key).replace(/"/g, '')}"\nlang: en\n---\n\n${body}\n`
  );

  const file = path.join(contentDir, `${key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: "${(title || key).replace(/"/g, '')}"\nlang: en\nsource: ${url}\n---\n\n${body}\n`
    );
  }

  const volume = chapter.startsWith('v2') ? 'المجلد الثاني' : 'المجلد الأول';
  structure.chapters.push({
    key,
    title: title || key,
    titleAr: title || key,
    volume,
    sections: [{ slug: 'index', title: title || key, order: structure.chapters.length }],
  });
  console.log(`${key}: ${body.length} chars`);
}

fs.writeFileSync(
  path.join(root, 'content', 'aosabook-structure.json'),
  JSON.stringify(structure, null, 2)
);
console.log(`done: ${structure.chapters.length} chapters, ${imageCount} images`);
