import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain, inline } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'database-foundations';
const contentDir = path.join(root, 'content', id);
const sourceDir = path.join(root, 'content-src', id);
const imageDir = path.join(root, 'static', 'images', id);
const origin = 'https://df.webontwerp.ucll.be';
const base = `${origin}/EN`;

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-skL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status} — ${url}`);
  return result.slice(0, split);
};

const download = (url) =>
  execFileSync('curl', ['-skL', '--compressed', '-m', '120', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  execFileSync(
    'magick',
    ['convert', raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target],
    { stdio: 'ignore', timeout: 120000 }
  );
  fs.rmSync(raw, { force: true });
};

const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

const linksOf = (html) => {
  const links = [];
  for (const match of stripComments(html).matchAll(/<a[^>]+href="([^"]+)"/gi)) {
    try {
      links.push(new URL(match[1], origin));
    } catch {
      continue;
    }
  }
  return links;
};

const articleOf = (html) => {
  let article = extractMain(html, 'main');
  const end = article.indexOf('</main>');
  if (end >= 0) article = article.slice(0, end);
  return article;
};

const modulePaths = (html, skip) => {
  const paths = [];
  for (const url of linksOf(articleOf(html))) {
    if (url.origin !== origin || !/^\/EN\/[A-Za-z][\w-]*\/?$/.test(url.pathname)) continue;
    const normalized = url.pathname.replace(/\/$/, '');
    if (skip.has(normalized)) continue;
    if (!paths.includes(normalized)) paths.push(normalized);
  }
  return paths;
};

const subpagesOf = (html, modulePath) => {
  const pages = [];
  for (const url of linksOf(articleOf(html))) {
    if (url.origin !== origin) continue;
    if (!url.pathname.startsWith(`${modulePath}/`)) continue;
    if (url.pathname === `${modulePath}/` || url.pathname === `${modulePath}/index.html`) continue;
    const href = `${url.origin}${url.pathname}`;
    if (!pages.includes(href)) pages.push(href);
  }
  return pages;
};

const stripBlocks = (html) =>
  html
    .replace(/<(script|style|nav|aside|footer|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(nav|aside|footer)\b[^>]*\/>/gi, '')
    .replace(/<(script|style|nav|aside|footer|noscript)\b[^>]*>/gi, '');

const stripClassBlocks = (html) => {
  const pattern = /<([a-z][\w-]*)\b[^>]*class="([^"]*)"[^>]*>/gi;
  let out = html;
  let match;
  while ((match = pattern.exec(out)) !== null) {
    const [open, tag, classes] = match;
    if (!/(nav|menu|footer|cookie|sidebar)/i.test(classes)) continue;
    const close = new RegExp(`</${tag}\\s*>`, 'gi');
    close.lastIndex = pattern.lastIndex;
    const end = close.exec(out);
    if (!end) {
      out = out.slice(0, match.index) + out.slice(match.index + open.length);
    } else {
      out = out.slice(0, match.index) + out.slice(end.index + end[0].length);
    }
    pattern.lastIndex = match.index;
  }
  return out;
};

const markSolutions = (html) =>
  html.replace(
    /<div\b[^>]*class="[^"]*\boplossing\b[^"]*"[^>]*>\s*(<h[1-6]\b[^>]*>)?/gi,
    (match, heading) => (heading ? match : `<h4>الحل</h4>${match}`)
  );

const failures = [];
let imageDownloads = 0;

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const skipMenus = new Set(['/EN/leerpad', '/EN/model_menu', '/EN/SQL_menu']);
const pathModules = modulePaths(fetchText(`${base}/leerpad/`), skipMenus);
const extraModules = [];
for (const menu of ['model_menu', 'SQL_menu']) {
  for (const modulePath of modulePaths(fetchText(`${base}/${menu}`), skipMenus)) {
    if (!pathModules.includes(modulePath) && !extraModules.includes(modulePath)) {
      extraModules.push(modulePath);
    }
  }
}
const modulePathsAll = [...pathModules, ...extraModules];

const structure = { chapters: [] };

for (const modulePath of modulePathsAll) {
  const moduleUrl = `${origin}${modulePath}/`;
  const key = modulePath.split('/').pop().toLowerCase().replace(/_/g, '-');

  let page;
  try {
    page = fetchText(moduleUrl);
  } catch (error) {
    failures.push(`${key}: ${error.message}`);
    continue;
  }
  fs.writeFileSync(path.join(sourceDir, `${key}.html`), page);

  const moduleArticle = articleOf(page);
  const h1 = moduleArticle.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1 ? inline(h1[1]) : key;

  const bodies = [
    moduleArticle.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, ''),
  ];

  for (const [index, subpageUrl] of subpagesOf(page, modulePath).entries()) {
    try {
      const subpage = fetchText(subpageUrl);
      fs.writeFileSync(path.join(sourceDir, `${key}-sub-${index + 1}.html`), subpage);
      bodies.push(articleOf(subpage));
    } catch (error) {
      failures.push(`${key}/${subpageUrl}: ${error.message}`);
    }
  }

  let article = stripClassBlocks(stripBlocks(bodies.join('\n\n')))
    .replace(/<button\b[^>]*>[\s\S]*?<\/button>/gi, '');

  article = markSolutions(article);

  const images = [];
  article = article.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src || src.startsWith('data:')) return '';
    const resolved = new URL(src, moduleUrl);
    const stem = path
      .basename(resolved.pathname, path.extname(resolved.pathname))
      .replace(/[^.\w-]/g, '_');
    const webp = path.join(imageDir, `${key}-${images.length}-${stem}.webp`);
    if (!fs.existsSync(webp)) {
      const raw = path.join(imageDir, `${key}-${images.length}-${stem}.bin`);
      try {
        fs.writeFileSync(raw, download(resolved.href));
        optimize(raw, webp);
        imageDownloads += 1;
      } catch (error) {
        fs.rmSync(raw, { force: true });
        failures.push(`${key}: image ${resolved.href} — ${error.message}`);
      }
    }
    const local = fs.existsSync(webp)
      ? `/images/${id}/${path.basename(webp)}`
      : resolved.href;
    images.push({ alt, local });
    return ` IMAGE${images.length - 1}END `;
  });

  const markdown = convert(article, images).trim();

  fs.writeFileSync(
    path.join(sourceDir, `${key}.md`),
    `---\ntitle: "${title}"\nlang: en\n---\n\n${markdown}\n`
  );

  const file = path.join(contentDir, `${key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!/lang: ar/.test(existing)) {
    fs.writeFileSync(
      file,
      `---\ntitle: "${title}"\nlang: en\nsource: ${moduleUrl}\n---\n\n${markdown}\n`
    );
  }

  structure.chapters.push({
    key,
    title,
    titleAr: title,
    sections: [{ slug: 'index', title, order: structure.chapters.length }],
  });
  console.log(`${key}: ${markdown.length} chars, ${images.length} images — ${title}`);
}

fs.writeFileSync(
  path.join(root, 'content', `${id}-structure.json`),
  JSON.stringify(structure, null, 2)
);

for (const chapter of structure.chapters) {
  const file = path.join(contentDir, `${chapter.key}--index.md`);
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (text.length <= 1200) failures.push(`${chapter.key}: ${text.length} chars`);
  const fences = (text.match(/^```/gm) || []).length;
  if (fences % 2 !== 0) failures.push(`${chapter.key}: unbalanced fences (${fences})`);
  if (/!\[[^\]]*\]\(https?:/.test(text)) failures.push(`${chapter.key}: remote image`);
  if (/lang: en/.test(text) && /!\[[^\]]*\]\(\/images\//.test(text)) {
    for (const match of text.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g)) {
      const target = path.join(root, 'static', match[1]);
      if (!fs.existsSync(target)) failures.push(`${chapter.key}: missing ${match[1]}`);
    }
  }
}

const imageTotal = fs.readdirSync(imageDir).filter((name) => name.endsWith('.webp')).length;
console.log(`modules: ${structure.chapters.length}`);
console.log(`images: ${imageTotal} webp (${imageDownloads} downloaded now)`);
console.log(`failures: ${failures.length}`);
for (const failure of failures) console.log(`- ${failure}`);
console.log(`structure: content/${id}-structure.json`);

if (failures.length) process.exitCode = 1;
