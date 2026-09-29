import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'go-faq');
const sourceDir = path.join(root, 'content-src', 'go-faq');
const imageDir = path.join(root, 'static', 'images', 'go-faq');
const origin = 'https://go.dev';
const url = `${origin}/doc/faq`;

const fetchText = (target) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', target],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
  return result.slice(0, split);
};

const download = (target) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '90', target], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const html = fetchText(url);
fs.writeFileSync(path.join(sourceDir, 'faq.html'), html);

let article = extractMain(html, 'article');
const closeIndex = article.indexOf('</article>');
if (closeIndex > 0) article = article.slice(0, closeIndex);
article = article.replace(/<(script|style|nav|form)[\s\S]*?<\/\1>/g, '');

const images = [];
article = article.replace(/<img[^>]*>/g, (tag) => {
  const src = tag.match(/src="([^"]+)"/)?.[1];
  const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
  if (!src) return '';
  const resolved = new URL(src, url).href;
  const name = path
    .basename(new URL(resolved).pathname)
    .replace(/[^.\w-]/g, '_');
  const target = path.join(imageDir, name);
  const webp = target.replace(/\.\w+$/, '.webp');
  if (!fs.existsSync(webp)) {
    try {
      const raw = path.join(imageDir, `${name}.raw`);
      fs.writeFileSync(raw, download(resolved));
      try {
        execFileSync(
          'magick',
          ['convert', raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', webp],
          { stdio: 'ignore', timeout: 60000 }
        );
        fs.rmSync(raw, { force: true });
      } catch {
        fs.renameSync(raw, webp);
      }
    } catch (error) {
      console.warn(`تعذّر تنزيل ${resolved}`);
    }
  }
  const local = fs.existsSync(webp)
    ? `/images/go-faq/${path.basename(webp)}`
    : src;
  images.push({ alt, local });
  return ` IMAGE${images.length - 1}END `;
});

const body = convert(article, images)
  .replace(/^#[^\n]*\n/, '')
  .replace(/\[([^\]]+)\]\(\/doc\/[^)]+\)/g, '$1')
  .trim();

fs.writeFileSync(
  path.join(sourceDir, 'faq.md'),
  `---\ntitle: "Frequently Asked Questions (FAQ)"\nlang: en\n---\n\n${body}\n`
);

const structure = {
  chapters: [
    {
      key: 'faq',
      title: 'Frequently Asked Questions (FAQ)',
      titleAr: 'الأسئلة الشائعة عن Go',
      sections: [{ slug: 'index', title: 'الأسئلة الشائعة عن Go', order: 0 }],
    },
  ],
};

fs.writeFileSync(
  path.join(root, 'content', 'go-faq-structure.json'),
  JSON.stringify(structure, null, 2)
);

const file = path.join(contentDir, 'faq--index.md');
const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
if (!/lang: ar/.test(existing)) {
  fs.writeFileSync(
    file,
    `---\ntitle: "الأسئلة الشائعة عن Go"\nlang: en\nsource: ${url}\n---\n\n${body}\n`
  );
}

console.log(
  `go-faq: ${body.length} chars, ${images.length} images, ${(body.match(/^## /gm) || []).length} sections`
);
