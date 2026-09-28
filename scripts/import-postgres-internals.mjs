import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'postgres-internals');
const sourceDir = path.join(root, 'content-src', 'postgres-internals');
const imageDir = path.join(root, 'static', 'images', 'postgres-internals');
const origin = 'https://www.interdb.jp';

const chapters = [
  ['pgsql01', 'Database Cluster, Databases, and Tables', 'عنقود قواعد البيانات والجداول'],
  ['pgsql02', 'Process and Memory Architecture', 'معمارية العمليات والذاكرة'],
  ['pgsql03', 'Query Processing', 'معالجة الاستعلامات'],
  ['pgsql04', 'Foreign Data Wrapper', 'مغلّف البيانات الخارجية'],
  ['pgsql05', 'Concurrency Control', 'التحكّم بالتزامن'],
  ['pgsql06', 'Vacuum Processing', 'معالجة التفريغ (Vacuum)'],
  ['pgsql07', 'Heap Only Tuple (HOT)', 'الصفوف المكتفية بالكومة (HOT)'],
  ['pgsql08', 'Buffer Manager', 'مدير المخزن المؤقت'],
  ['pgsql09', 'Write Ahead Logging', 'سجل ما قبل الكتابة (WAL)'],
  ['pgsql10', 'Base Backup and Point-In-Time Recovery', 'النسخ الاحتياطي الأساسي والاستعادة الزمنية'],
  ['pgsql11', 'Streaming Replication', 'النسخ المتماثل المتدفّق'],
  ['pgsql12', 'Logical Replication', 'النسخ المتماثل المنطقي'],
];

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
      ['convert', raw, '-auto-orient', '-resize', '1300x1300>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const sectionList = (indexHtml, chapter) => {
  const links = [
    ...new Set(
      [...indexHtml.matchAll(new RegExp(`(?:^|/)${chapter}/(\\d+)\\.html`, 'g'))].map(
        (match) => `${match[1]}.html`
      )
    ),
  ];
  return links.sort();
};

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const structure = { chapters: [] };
let imageCount = 0;

for (const [chapter, titleEn, titleAr] of chapters) {
  const base = `${origin}/pg/${chapter}`;
  let index;
  try {
    index = fetchText(`${base}/index.html`);
  } catch (error) {
    console.warn(`تخطّي ${chapter}: ${error.message}`);
    continue;
  }

  const sections = sectionList(index, chapter);
  const bodies = [];

  for (const section of sections) {
    const url = `${base}/${section}`;
    let html;
    try {
      html = fetchText(url);
    } catch (error) {
      console.warn(`تخطّي ${chapter}/${section}`);
      continue;
    }

    let article = extractMain(html, 'div');
    const start = article.indexOf('id="body-inner"');
    if (start >= 0) {
      const open = article.indexOf('>', start);
      article = article.slice(open + 1);
    }
    const navIndex = article.indexOf('<footer');
    if (navIndex > 0) article = article.slice(0, navIndex);
    article = article.replace(/<script[\s\S]*?<\/script>/g, '');

    const images = [];
    article = article.replace(/<img[^>]*>/g, (tag) => {
      const src = tag.match(/src="([^"]+)"/)?.[1];
      const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
      if (!src) return '';
      const resolved = new URL(src, url).href;
      const name = `${chapter}-${path
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
      const local = fs.existsSync(webp)
        ? `/images/postgres-internals/${path.basename(webp)}`
        : src;
      images.push({ alt, local });
      return ` IMAGE${images.length - 1}END `;
    });

    bodies.push(convert(article, images).trim());
  }

  const body = bodies.filter(Boolean).join('\n\n');

  fs.writeFileSync(
    path.join(sourceDir, `${chapter}.md`),
    `---\ntitle: "${titleEn}"\nlang: en\n---\n\n${body}\n`
  );

  const file = path.join(contentDir, `${chapter}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: "${titleAr}"\nlang: en\nsource: ${base}/index.html\n---\n\n${body}\n`
    );
  }

  structure.chapters.push({
    key: chapter,
    title: titleEn,
    titleAr,
    sections: [{ slug: 'index', title: titleAr, order: structure.chapters.length }],
  });
  console.log(`${chapter} (${titleAr}): ${sections.length} sections, ${body.length} chars`);
}

fs.writeFileSync(
  path.join(root, 'content', 'postgres-internals-structure.json'),
  JSON.stringify(structure, null, 2)
);
console.log(`done: ${structure.chapters.length} chapters, ${imageCount} images`);
