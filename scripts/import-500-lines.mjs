import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', '500-lines');
const imageDir = path.join(root, 'static', 'images', '500-lines');
const raw = 'https://raw.githubusercontent.com/aosabook/500lines/master';

const chapters = [
  { dir: 'introduction', file: 'README.md', title: 'Introduction' },
  { dir: 'blockcode', title: 'A Code Block' },
  { dir: 'ci', title: 'Continuous Integration' },
  { dir: 'cluster', title: 'Cluster' },
  { dir: 'contingent', title: 'Contingent' },
  { dir: 'crawler', title: 'Crawler' },
  { dir: 'dagoba', title: 'Dagoba' },
  { dir: 'data-store', title: 'Data Store' },
  { dir: 'event-web-framework', title: 'Event Web Framework' },
  { dir: 'flow-shop', title: 'Flow Shop' },
  { dir: 'functionalDB', title: 'Functional DB' },
  { dir: 'image-filters', title: 'Image Filters' },
  { dir: 'interpreter', title: 'Interpreter' },
  { dir: 'modeller', title: 'Modeller' },
  { dir: 'objmodel', title: 'Object Model' },
  { dir: 'ocr', title: 'OCR' },
  { dir: 'pedometer', title: 'Pedometer' },
  { dir: 'same-origin-policy', title: 'Same-Origin Policy' },
  { dir: 'sampler', title: 'Sampler' },
  { dir: 'spreadsheet', title: 'Spreadsheet' },
  { dir: 'static-analysis', title: 'Static Analysis' },
  { dir: 'template-engine', title: 'Template Engine' },
  { dir: 'web-server', title: 'Web Server' },
];

const get = async (url, attempts = 4) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
  throw new Error(`تعذّر التحميل: ${url}`);
};

const saveImage = async (src, name, base) => {
  const target = path.join(imageDir, `${name}.webp`);
  const local = `/images/500-lines/${name}.webp`;
  if (fs.existsSync(target)) return local;
  const response = await get(`${base}/${src}`, 2);
  const buffer = Buffer.from(await response.arrayBuffer());
  const rawPath = path.join(imageDir, `${name}.raw`);
  fs.writeFileSync(rawPath, buffer);
  try {
    execFileSync(
      'magick',
      [
        'convert',
        rawPath,
        '-auto-orient',
        '-resize',
        '1300x1300>',
        '-strip',
        '-quality',
        '70',
        target,
      ],
      { stdio: 'ignore', timeout: 60000 }
    );
  } catch {
    fs.writeFileSync(target, buffer);
  } finally {
    fs.rmSync(rawPath, { force: true });
  }
  return local;
};

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(path.join(contentDir, '500-lines'), { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const structure = { chapters: [] };
let images = 0;
let index = 0;

for (const chapter of chapters) {
  const source =
    chapter.file ?? `${chapter.dir}/${chapter.dir}.markdown`;
  const response = await get(`${raw}/${source}`);
  let markdown = await response.text();
  fs.writeFileSync(path.join(sourceDir, `${chapter.dir}.md`), markdown);

  const heading = markdown.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  const title = heading || chapter.title;

  const body0 = markdown
    .replace(/^title:.*\n/m, '')
    .replace(/^author:.*\n/m, '')
    .replace(/^category:.*\n/m, '')
    .replace(/^---$/m, '')
    .replace(/<\/?markdown>/g, '')
    .trim();

  const referenced = [
    ...body0.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g),
    ...body0.matchAll(/\{([a-zA-Z0-9_./-]+\.(?:png|jpg|jpeg|svg|gif))\}/g),
  ];

  const locals = [];
  for (const [position, match] of referenced.entries()) {
    const src = match[1];
    if (/^https?:/i.test(src) || src.startsWith('/')) continue;
    const name = `${chapter.dir}-${position}-${path
      .basename(src)
      .replace(/[^.\w]/g, '_')
      .replace(/\.\w+$/, '')}`;
    let local;
    try {
      local = await saveImage(src, name, `${raw}/${chapter.dir}`);
      images += 1;
    } catch (error) {
      console.warn(`تعذّر تنزيل ${src}: ${error.message}`);
      continue;
    }
    locals.push({ from: match[0], to: local });
  }

  let body = body0;
  for (const item of locals) {
    body = body.split(item.from).join(item.to);
  }
  body = body.replace(/!\[[^\]]*\]\((\/images\/500-lines\/[^)]+)\)/g, '![]($1)');

  const file = path.join(contentDir, '500-lines', `${chapter.dir}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: "${title.replace(/"/g, String.fromCharCode(92) + String.fromCharCode(34))}"\nlang: en\nsource: https://aosabook.org/en/500L/${chapter.dir}.html\n---\n\n${body}\n`
    );
  }

  structure.chapters.push({
    key: chapter.dir,
    title,
    titleAr: title,
    sections: [{ slug: 'index', title, order: index }],
  });
  index += 1;
  console.log(`${chapter.dir}: ${body.length} chars, ${referenced.length} images`);
}

fs.writeFileSync(
  path.join(contentDir, '500-lines-structure.json'),
  JSON.stringify(structure, null, 2)
);
console.log(`done: ${chapters.length} chapters, ${images} images`);
