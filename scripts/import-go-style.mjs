import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'go-style');
const sourceDir = path.join(root, 'content-src', 'go-style');
const origin = 'https://google.github.io/styleguide/go';

const pages = [
  { key: 'index', url: `${origin}/`, title: 'نظرة عامة على دليل أسلوب Go', split: 1 },
  { key: 'guide', url: `${origin}/guide`, title: 'دليل أسلوب Go', split: 1 },
  { key: 'decisions', url: `${origin}/decisions`, title: 'قرارات أسلوب Go', split: 2 },
  { key: 'best-practices', url: `${origin}/best-practices`, title: 'أفضل ممارسات أسلوب Go', split: 2 },
];

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '120', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
  return result.slice(0, split);
};

const splitSections = (markdown, parts) => {
  if (parts <= 1) return [markdown];
  const lines = markdown.split('\n');
  const sectionStarts = [];
  lines.forEach((line, index) => {
    if (/^##\s/.test(line)) sectionStarts.push(index);
  });
  if (sectionStarts.length < parts) return [markdown];

  const size = Math.ceil(sectionStarts.length / parts);
  const chunks = [];
  for (let part = 0; part < parts; part += 1) {
    const from = sectionStarts[part * size];
    const to = sectionStarts[(part + 1) * size];
    if (from === undefined) break;
    chunks.push(
      lines
        .slice(from, to === undefined ? lines.length : to)
        .join('\n')
        .trim()
    );
  }
  return chunks.filter(Boolean);
};

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });

const structure = { chapters: [] };
let order = 0;

for (const page of pages) {
  const html = fetchText(page.url);
  fs.writeFileSync(path.join(sourceDir, `${page.key}.html`), html);

  let article = extractMain(html, 'main');
  const articleEnd = article.indexOf('<footer');
  if (articleEnd > 0) article = article.slice(0, articleEnd);
  article = article
    .replace(/<(script|style|nav|form|aside)[\s\S]*?<\/\1>/g, '')
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');

  const markdown = convert(article, []).replace(/\n{3,}/g, '\n\n').trim();
  const chunks = splitSections(markdown, page.split);

  chunks.forEach((chunk, index) => {
    const key = page.split > 1 ? `${page.key}-${index + 1}` : page.key;
    const title =
      page.split > 1 ? `${page.title} (${index + 1} من ${chunks.length})` : page.title;
    const body = chunk.replace(/^#\s+.*\n/, '').trim();

    fs.writeFileSync(
      path.join(sourceDir, `${key}.md`),
      `---\ntitle: "${title}"\nlang: en\n---\n\n${body}\n`
    );

    const file = path.join(contentDir, `${key}--index.md`);
    const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    if (!/lang: ar/.test(existing)) {
      fs.writeFileSync(
        file,
        `---\ntitle: "${title}"\nlang: en\nsource: ${page.url}\n---\n\n${body}\n`
      );
    }

    structure.chapters.push({
      key,
      title,
      titleAr: title,
      sections: [{ slug: 'index', title, order }],
    });
    order += 1;
    console.log(`${key}: ${body.length} chars`);
  });
}

fs.writeFileSync(
  path.join(root, 'content', 'go-style-structure.json'),
  JSON.stringify(structure, null, 2)
);
console.log(`done: ${structure.chapters.length} chapters`);
