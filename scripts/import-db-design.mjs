import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', 'db-design');
const imageDir = path.join(root, 'static', 'images', 'db-design');
const origin = 'https://opentextbc.ca';

const pages = [
  { slug: 'chapter-1', path: '/dbdesign01/chapter/chapter-1-before-the-advent-of-database-systems/', title: 'Before the Advent of Database Systems' },
  { slug: 'chapter-2', path: '/dbdesign01/chapter/chapter-2-fundamental-concepts/', title: 'Fundamental Concepts' },
  { slug: 'chapter-3', path: '/dbdesign01/chapter/chapter-3-characteristics-and-benefits-of-a-database/', title: 'Characteristics and Benefits of a Database' },
  { slug: 'chapter-4', path: '/dbdesign01/chapter/chapter-4-types-of-database-models/', title: 'Types of Database Models' },
  { slug: 'chapter-5', path: '/dbdesign01/chapter/chapter-5-data-modelling/', title: 'Data Modelling' },
  { slug: 'chapter-6', path: '/dbdesign01/chapter/chapter-6-classification-of-database-systems/', title: 'Classification of Database Systems' },
  { slug: 'chapter-7', path: '/dbdesign01/chapter/chapter-7-the-relational-data-model/', title: 'The Relational Data Model' },
  { slug: 'chapter-8', path: '/dbdesign01/chapter/chapter-8-entity-relationship-model/', title: 'Entity Relationship Model' },
  { slug: 'chapter-9', path: '/dbdesign01/chapter/chapter-9-integrity-rules-and-constraints/', title: 'Integrity Rules and Constraints' },
  { slug: 'chapter-10', path: '/dbdesign01/chapter/chapter-10-er-modelling/', title: 'ER Modelling' },
  { slug: 'chapter-11', path: '/dbdesign01/chapter/chapter-11-functional-dependencies/', title: 'Functional Dependencies' },
  { slug: 'chapter-12', path: '/dbdesign01/chapter/chapter-12-normalization/', title: 'Normalization' },
  { slug: 'chapter-13', path: '/dbdesign01/chapter/chapter-13-database-development-process/', title: 'The Database Development Process' },
  { slug: 'chapter-14', path: '/dbdesign01/chapter/chapter-14-database-users/', title: 'Database Users' },
  { slug: 'chapter-sql', path: '/dbdesign01/chapter/sql-structured-query-language/', title: 'Structured Query Language' },
  { slug: 'chapter-sql-dml', path: '/dbdesign01/chapter/chapter-sql-dml/', title: 'SQL Data Manipulation' },
  { slug: 'appendix-a', path: '/dbdesign01/backmatter/appendix-a/', title: 'Appendix A: The relational model' },
  { slug: 'appendix-b', path: '/dbdesign01/backmatter/appendix-b/', title: 'Appendix B: ERD exercises' },
  { slug: 'appendix-c', path: '/dbdesign01/backmatter/appendix-c/', title: 'Appendix C: SQL lab' },
];

const get = async (url, attempts = 4) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const body = execFileSync(
        'curl',
        ['-sL', '--compressed', '-m', '60', '-w', '\n%{http_code}', url],
        { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
      );
      const split = body.lastIndexOf('\n');
      const status = Number(body.slice(split + 1).trim());
      if (status === 200) {
        return { ok: true, text: () => Promise.resolve(body.slice(0, split)) };
      }
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
  throw new Error(`تعذّر التحميل: ${url}`);
};

const decode = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&');

const inline = (html) => {
  let out = html;
  out = out.replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) => {
    const target = href.startsWith('/') ? `${origin}${href}` : href;
    return `[${text.trim()}](${target})`;
  });
  out = out.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/g,
    (_, code) => `\`${decode(code.replace(/<[^>]+>/g, ''))}\``
  );
  out = out.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '**$1**');
  out = out.replace(/<em[^>]*>([\s\S]*?)<\/em>/g, '*$1*');
  out = out.replace(/<[^>]+>/g, '');
  return decode(out).replace(/\s+/g, ' ').trim();
};

const list = (html) => {
  const items = [];
  let match;
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  while ((match = regex.exec(html)) !== null) {
    items.push(`- ${inline(match[1])}`);
  }
  return items.join('\n');
};

const toTable = (html) => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/g)].map((cell) => inline(cell[2]))
  );
  if (rows.length < 2) return '';
  const width = Math.max(...rows.map((cells) => cells.length));
  const pad = (cells) => [
    ...cells,
    ...Array.from({ length: width - cells.length }, () => ''),
  ];
  return [
    `| ${pad(rows[0]).join(' | ')} |`,
    `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
    ...rows.slice(1).map((cells) => `| ${pad(cells).join(' | ')} |`),
  ].join('\n');
};

const convert = (html, images) => {
  const codeBlocks = [];
  const rest0 = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, (_, code) => {
    const text = decode(
      code
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/^\n+/, '')
        .replace(/\s+$/, '')
    );
    codeBlocks.push(text);
    return ` CODE${codeBlocks.length - 1}END `;
  });

  const rest = rest0.replace(
    / IMAGE(\d+)END /g,
    (match, index) => ` ![${images[Number(index)]?.alt || ''}](${images[Number(index)]?.local || ''}) `
  );

  const chunks = [];
  const segments = rest.split(/( CODE\d+END )/);
  const pattern =
    /<(h[1-6]|p|ul|ol|blockquote|table|figure|div)[^>]*>([\s\S]*?)<\/\1>|<hr\s*\/?>/g;

  for (const [index, segment] of segments.entries()) {
    if (index % 2 === 1) {
      chunks.push(`\`\`\`sql\n${codeBlocks[Number(segment.match(/CODE(\d+)END/)[1])]}\n\`\`\``);
      continue;
    }
    const pushText = (text) => {
      const clean = text.replace(/CODE\d+END/g, '').trim();
      if (clean) chunks.push(inline(clean));
    };
    let cursor = 0;
    let match;
    while ((match = pattern.exec(segment)) !== null) {
      pushText(segment.slice(cursor, match.index));
      cursor = match.index + match[0].length;
      const tag = match[1];
      const inner = match[2] || '';
      if (tag === 'hr') chunks.push('---');
      else if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag[1]);
        chunks.push(`${'#'.repeat(Math.min(level, 4))} ${inline(inner)}`);
      } else if (tag === 'p') {
        const value = inline(inner);
        if (value) chunks.push(value);
      } else if (tag === 'ul' || tag === 'ol') {
        const value = list(inner);
        if (value) chunks.push(value);
      } else if (tag === 'blockquote') {
        const value = inner
          .split(/\n{2,}/)
          .map((line) => `> ${inline(line)}`)
          .join('\n> ');
        if (value) chunks.push(value);
      } else if (tag === 'table') {
        const value = toTable(inner);
        if (value) chunks.push(value);
      } else if (tag === 'figure') {
        const caption = inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
        if (caption) chunks.push(`*${inline(caption[1])}*`);
      }
    }
    pushText(segment.slice(cursor));
  }
  return chunks.join('\n\n');
};

const download = (url) =>
  execFileSync('curl', ['-sL', '--compressed', '-m', '60', url], {
    maxBuffer: 64 * 1024 * 1024,
  });

const saveImage = async (src, name) => {
  const target = path.join(imageDir, `${name}.webp`);
  const local = `/images/db-design/${name}.webp`;
  if (fs.existsSync(target)) return local;
  const buffer = download(new URL(src, origin).href);
  const rawPath = path.join(imageDir, `${name}.raw`);
  fs.writeFileSync(rawPath, buffer);
  try {
    execFileSync(
      'magick',
      ['convert', rawPath, '-auto-orient', '-resize', '1300x1300>', '-strip', '-quality', '70', target],
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
fs.mkdirSync(path.join(contentDir, 'db-design'), { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const structure = { chapters: [] };
let images = 0;

for (const page of pages) {
  const response = await get(`${origin}${page.path}`);
  const html = await response.text();
  fs.writeFileSync(path.join(sourceDir, `${page.slug}.html`), html);

  const start = html.indexOf('<div class="section') >= 0
    ? html.indexOf('<div class="section')
    : html.indexOf('<main');
  const mainStart = html.indexOf('<main') >= 0 ? html.indexOf('<main') : start;
  let article = html.slice(mainStart >= 0 ? mainStart : start);
  const navCut = article.indexOf('<nav');
  if (navCut > 0) article = article.slice(0, navCut);
  article = article
    .replace(/<(script|style|form|aside)[\s\S]*?<\/\1>/g, '')
    .replace(/<div class="[^"]*navigation[^"]*"[\s\S]*?<\/div>/g, '');

  const imageMeta = [];
  article = article.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src) return '';
    imageMeta.push({ src, alt, local: src });
    return ` IMAGE${imageMeta.length - 1}END `;
  });

  for (const [index, image] of imageMeta.entries()) {
    if (!image.src.startsWith('/')) continue;
    const name = `${page.slug}-${index}-${path
      .basename(image.src)
      .replace(/[^.\w]/g, '_')
      .replace(/\.\w+$/, '')}`;
    imageMeta[index].local = await saveImage(image.src, name);
    images += 1;
  }

  const markdown = convert(article, imageMeta);
  const body = markdown
    .replace(/^#\s*.*\n/, '')
    .replace(/Skip to main content[^\n]*\n/g, '')
    .trim();

  const file = path.join(contentDir, 'db-design', `${page.slug}.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: "${page.title.replace(/"/g, '')}"\nlang: en\nsource: ${origin}${page.path}\n---\n\n${body}\n`
    );
  }

  structure.chapters.push({
    key: page.slug,
    title: page.title,
    titleAr: page.title,
    sections: [{ slug: 'index', title: page.title, order: structure.chapters.length }],
  });
  console.log(`${page.slug}: ${body.length} chars, ${imageMeta.length} images`);
}

fs.writeFileSync(
  path.join(contentDir, 'db-design-structure.json'),
  JSON.stringify(structure, null, 2)
);
console.log(`done: ${pages.length} chapters, ${images} images`);
