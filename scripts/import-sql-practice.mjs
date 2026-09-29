import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, decode, extractMain } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceRoot = path.join(root, 'content-src');
const imageRoot = path.join(root, 'static', 'images');

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

const removeInteractive = (html) =>
  html
    .replace(/<(script|style|iframe|form|button)[\s\S]*?<\/\1>/g, '')
    .replace(/<sql-exercise[\s\S]*?<\/sql-exercise>/g, '')
    .replace(/&mdash;/g, '—');

const protectCodeSpans = (html, codeSpans) =>
  html
    .split(/(<pre[\s\S]*?<\/pre>)/g)
    .map((part) => {
      if (part.startsWith('<pre')) return part;
      return part.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (match, inner) => {
        const text = decode(inner.replace(/<[^>]+>/g, '')).trim();
        if (!/[`<>]/.test(text)) return match;
        const ticks = text.includes('``') ? '```' : text.includes('`') ? '``' : '`';
        codeSpans.push(`${ticks} ${text} ${ticks}`);
        return ` CODESPAN${codeSpans.length - 1}END `;
      });
    })
    .join('');

const books = {
  'select-star-sql': {
    origin: 'https://selectstarsql.com',
    pages: [
      ['frontmatter', '/frontmatter.html', 'Front Matter'],
      ['beazley', '/beazley.html', "Beazley's Last Statement"],
      ['innocence', '/innocence.html', 'Claims of Innocence'],
      ['hiatuses', '/hiatuses.html', 'Execution Hiatuses'],
      ['longtail', '/longtail.html', 'The Long Tail'],
      ['questions', '/questions.html', 'Closing Remarks and Challenge Questions'],
    ],
    prepare: (html) => {
      let article = extractMain(html, 'div');
      const start = article.indexOf('<div class="content">');
      if (start >= 0) article = article.slice(start);
      for (const marker of ['<div class="tutorial-nav">', '<div class="footer">']) {
        const end = article.indexOf(marker);
        if (end > 0) article = article.slice(0, end);
      }
      const nav = article.indexOf('<div class="section-nav">');
      if (nav >= 0) {
        const body = article.slice(nav).search(/<(p|h[1-6])[\s>]/);
        if (body >= 0) article = article.slice(nav + body);
      }
      return article;
    },
  },
  'sql-mystery': {
    origin: 'https://mystery.knightlab.com',
    pages: [
      ['index', '/', 'The SQL Murder Mystery'],
      ['walkthrough', '/walkthrough.html', 'The SQL Murder Mystery: Detailed Walkthrough'],
    ],
    prepare: (html) => {
      let article = extractMain(html, 'div');
      const start = article.indexOf('<div class="container">');
      if (start >= 0) article = article.slice(start);
      const end = article.indexOf('<footer');
      if (end > 0) article = article.slice(0, end);
      return article;
    },
  },
};

for (const [id, book] of Object.entries(books)) {
  const sourceDir = path.join(sourceRoot, id);
  const targetDir = path.join(contentDir, id);
  const imageDir = path.join(imageRoot, id);
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(imageDir, { recursive: true });

  const structure = { chapters: [] };
  const imageCache = new Map();
  let imageCount = 0;

  for (const [key, urlPath, title] of book.pages) {
    const url = `${book.origin}${urlPath}`;
    let html;
    try {
      html = fetchText(url);
    } catch (error) {
      console.warn(`تخطّي ${id}/${key}: ${error.message}`);
      continue;
    }
    fs.writeFileSync(path.join(sourceDir, `${key}.html`), html);

    const codeSpans = [];
    const article = protectCodeSpans(removeInteractive(book.prepare(html)), codeSpans);

    const images = [];
    const prepared = article.replace(/<img[^>]*>/g, (tag) => {
      const src = tag.match(/src="([^"]+)"/)?.[1];
      const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
      if (!src || src.startsWith('data:')) return '';
      const resolved = new URL(src, url).href;
      let local = imageCache.get(resolved);
      if (!local) {
        const name = `${key}-${images.length}-${path
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
        local = fs.existsSync(webp)
          ? `/images/${id}/${path.basename(webp)}`
          : resolved;
        imageCache.set(resolved, local);
      }
      images.push({ alt, local });
      return ` IMAGE${images.length - 1}END `;
    });

    const body = convert(prepared, images)
      .trim()
      .replace(/CODESPAN(\d+)END/g, (_, index) => codeSpans[Number(index)]);

    fs.writeFileSync(
      path.join(sourceDir, `${key}.md`),
      `---\ntitle: "${title}"\nlang: en\n---\n\n${body}\n`
    );

    const file = path.join(targetDir, `${key}--index.md`);
    const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    if (!/lang: ar/.test(existing)) {
      fs.writeFileSync(
        file,
        `---\ntitle: "${title}"\nlang: en\nsource: ${url}\n---\n\n${body}\n`
      );
    }

    structure.chapters.push({
      key,
      title,
      titleAr: title,
      sections: [{ slug: 'index', title, order: structure.chapters.length }],
    });
    console.log(`${id}/${key}: ${body.length} chars, ${images.length} images`);
  }

  fs.writeFileSync(
    path.join(contentDir, `${id}-structure.json`),
    JSON.stringify(structure, null, 2)
  );
  console.log(`done: ${id} — ${structure.chapters.length} chapters, ${imageCount} images`);
}
