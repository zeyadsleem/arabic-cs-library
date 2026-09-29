import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, extractMain } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const sourceRoot = path.join(root, 'content-src');
const imageRoot = path.join(root, 'static', 'images');

const failures = [];

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
  execFileSync('curl', ['-sL', '-f', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target, size) => {
  try {
    execFileSync(
      'magick',
      ['convert', raw, '-auto-orient', '-resize', `${size}x${size}>`, '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const saveSource = (id, name, data) => {
  const dir = path.join(sourceRoot, id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), data);
};

const writeChapter = (id, key, title, source, body) => {
  const dir = path.join(contentDir, id);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (/lang: ar/.test(existing)) {
    console.log(`skipped (lang: ar): ${id}/${key}`);
    return false;
  }
  fs.writeFileSync(
    file,
    `---\ntitle: "${title}"\nlang: en\nsource: ${source}\n---\n\n${body}\n`
  );
  return true;
};

const embedImages = (html, pageUrl, id, prefix, size, images, map) => {
  const imageDir = path.join(imageRoot, id);
  fs.mkdirSync(imageDir, { recursive: true });
  return html.replace(/<img[^>]*>/g, (tag) => {
    const src =
      tag.match(/data-lazy-src="([^"]+)"/)?.[1] ??
      tag.match(/src="([^"]+)"/)?.[1];
    const alt = (tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src || src.startsWith('data:')) return '';
    const resolved = new URL(src, pageUrl);
    const name = `${prefix}-${images.length}-${path
      .basename(resolved.pathname)
      .replace(/[^.\w-]/g, '_')}`;
    const target = path.join(imageDir, name);
    const webp = target.replace(/\.\w+$/, '.webp');
    if (!fs.existsSync(webp)) {
      try {
        fs.writeFileSync(target, downloadBinary(resolved.href));
        optimize(target, webp, size);
      } catch (error) {
        failures.push(`image ${resolved.href}: ${error.message}`);
        console.warn(`image failed: ${resolved.href}`);
      }
    }
    const local = fs.existsSync(webp)
      ? `/images/${id}/${path.basename(webp)}`
      : resolved.href;
    map[src] = local;
    images.push({ src, alt, local });
    return ` IMAGE${images.length - 1}END `;
  });
};

const contentSection = (html) => {
  const marker = /class=['"]col-md-10['"]/.exec(html);
  let article = marker ? html.slice(html.indexOf('>', marker.index) + 1) : html;
  const footer = article.indexOf('<div style="text-align:center">');
  if (footer > 0) article = article.slice(0, footer);
  return article;
};

const txtToMarkdown = (text) => {
  const lines = text.split('\n');
  let cursor = 0;
  while (cursor < lines.length && !lines[cursor].trim()) cursor += 1;
  if (/^\/\/\s*-+/.test(lines[cursor] || '')) cursor += 1;
  while (cursor < lines.length && !lines[cursor].trim()) cursor += 1;
  let title = '';
  const heading = (lines[cursor] || '').match(/^\d+\.\s+(.*)$/);
  if (heading) {
    title = heading[1].trim();
    cursor += 1;
  }

  const out = [];
  let index = cursor;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      while (index < lines.length && !lines[index].trim()) index += 1;
      out.push('');
      continue;
    }
    if (/^\s{4,}\S/.test(line)) {
      const block = [];
      while (index < lines.length) {
        if (/^\s{4,}\S/.test(lines[index])) {
          block.push(lines[index]);
          index += 1;
          continue;
        }
        let next = index;
        while (next < lines.length && !lines[next].trim()) next += 1;
        if (next > index && next < lines.length && /^\s{4,}\S/.test(lines[next])) {
          block.push(...lines.slice(index, next));
          index = next;
          continue;
        }
        break;
      }
      out.push('```text', ...block, '```');
      continue;
    }
    out.push(line);
    index += 1;
  }

  return { title, body: out.join('\n').trim() };
};

const runCryptopals = () => {
  const id = 'cryptopals';
  const origin = 'https://cryptopals.com';
  const imageMap = {};
  const chapters = [];

  for (let set = 1; set <= 8; set += 1) {
    const setUrl = `${origin}/sets/${set}`;
    const setHtml = fetchText(setUrl);
    saveSource(id, `set-${set}.html`, setHtml);

    let setArticle = contentSection(setHtml);
    const links = [];
    const linkRegex = /<a href=['"](\/sets\/\d+\/challenges\/[^'"]+)['"]>([\s\S]*?)<\/a>/g;
    let link;
    while ((link = linkRegex.exec(setArticle)) !== null) {
      links.push({
        href: link[1],
        title: link[2].replace(/<[^>]+>/g, '').trim(),
      });
    }

    setArticle = setArticle
      .replace(/<h3>[\s\S]*?<\/h3>/, '')
      .replace(/<ol[\s\S]*?<\/ol>/g, '')
      .replace(/<pre([^>]*)>/g, '<pre data-language="text"$1>');
    const setImages = [];
    setArticle = embedImages(setArticle, setUrl, id, `set-${set}`, 1300, setImages, imageMap);
    const intro = convert(setArticle, setImages);

    const pieces = [];
    if (intro.trim()) pieces.push(intro.trim());

    for (const item of links) {
      const url = `${origin}${item.href}`;
      const base = path.basename(item.href);
      const isText = base.endsWith('.txt');
      try {
        const raw = fetchText(url);
        saveSource(id, `set-${set}-${isText ? base : `${base}.html`}`, raw);
        let title = item.title;
        let body;
        if (isText) {
          const parsed = txtToMarkdown(raw);
          if (parsed.title) title = parsed.title;
          body = parsed.body;
        } else {
          let article = contentSection(raw);
          const heading = article.match(/<h3>([\s\S]*?)<\/h3>/);
          if (heading) {
            title = heading[1].replace(/<[^>]+>/g, '').trim();
            article = article.replace(/<h3>[\s\S]*?<\/h3>/, '');
          }
          article = article.replace(/<pre([^>]*)>/g, '<pre data-language="text"$1>');
          const images = [];
          article = embedImages(article, url, id, `set-${set}-${base}`, 1300, images, imageMap);
          body = convert(article, images);
        }
        const number = Number(base.replace(/\.txt$/, ''));
        pieces.push(`## ${number}. ${title}\n\n${body.trim()}`);
        saveSource(id, `set-${set}-${base.replace(/\.txt$/, '')}.md`, body);
      } catch (error) {
        failures.push(`cryptopals set ${set} ${base}: ${error.message}`);
        console.warn(`cryptopals set ${set} ${base}: ${error.message}`);
      }
    }

    const title = `Set ${set}`;
    const body = pieces.join('\n\n');
    writeChapter(id, `set-${set}`, title, setUrl, body);
    chapters.push({
      key: `set-${set}`,
      title,
      titleAr: title,
      sections: [{ slug: 'index', title, order: set - 1 }],
    });
    console.log(`cryptopals/set-${set}: ${body.length} chars, ${links.length} challenges`);
  }

  fs.writeFileSync(
    path.join(contentDir, `${id}-structure.json`),
    JSON.stringify({ chapters }, null, 2)
  );
  fs.writeFileSync(
    path.join(sourceRoot, id, 'image-map.json'),
    JSON.stringify(imageMap, null, 2)
  );
};

const runCs3110 = () => {
  const id = 'ocaml-cs3110';
  const origin = 'https://cs3110.github.io/textbook/';
  const coverUrl = `${origin}cover.html`;
  const cover = fetchText(coverUrl);
  saveSource(id, 'cover.html', cover);

  const navStart = cover.indexOf('id="bd-docs-nav"');
  const navEnd = cover.indexOf('</nav>', navStart);
  const nav = cover.slice(navStart, navEnd);

  const entries = [];
  const entryRegex =
    /<li class="toctree-l1([^"]*)">[\s\S]*?<a class="reference internal" href="([^"]+)">([\s\S]*?)<\/a>([\s\S]*?)(?=<li class="toctree-l1|<\/ul>\s*<\/li>\s*<\/ul>\s*<p|<\/ul>\s*<\/ul>\s*<\/nav>|<\/ul>\s*<\/nav>)/g;
  let entry;
  while ((entry = entryRegex.exec(nav)) !== null) {
    const children = [];
    const childRegex = /<a class="reference internal" href="([^"]+)">([\s\S]*?)<\/a>/g;
    let child;
    while ((child = childRegex.exec(entry[4])) !== null) {
      children.push({
        url: child[1],
        title: child[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '),
      });
    }
    entries.push({
      url: entry[2],
      title: entry[3].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '),
      children,
    });
  }

  const groups = new Map();
  for (const item of entries) {
    const folder = item.url.match(/^chapters\/([^/]+)\//)?.[1];
    if (!folder) continue;
    if (!groups.has(folder)) groups.set(folder, []);
    groups.get(folder).push(item);
  }

  const imageMap = {};
  const chapters = [];
  let order = 0;

  for (const [key, items] of groups) {
    const numbered = /^\d+\.\s/.test(items[0].title);
    if (key !== 'preface' && !numbered) continue;

    const chapterTitle =
      key === 'preface' ? 'Preface' : items[0].title.replace(/^\d+\.\s*/, '');
    const pages = [];
    for (const item of items) {
      pages.push(item.url);
      for (const child of item.children) pages.push(child.url);
    }

    const pieces = [];
    for (const pageUrl of pages) {
      const url = `${origin}${pageUrl}`;
      try {
        const html = fetchText(url);
        const sourceName = pageUrl
          .replace(/^chapters\//, '')
          .replace(/\//g, '--');
        saveSource(id, sourceName, html);

        let article = extractMain(html, 'main');
        const mainEnd = article.indexOf('</main>');
        if (mainEnd > 0) article = article.slice(0, mainEnd);
        article = article
          .replace(/<(script|style|form|aside|footer|header|nav)[\s\S]*?<\/\1>/g, '')
          .replace(/<iframe[\s\S]*?<\/iframe>/g, '')
          .replace(
            /<(\/?)h([1-6])([^>]*)>/g,
            (_, slash, level, attrs) =>
              `<${slash}h${Math.min(Number(level) + 1, 6)}${attrs}>`
          )
          .replace(
            /<div class="highlight-([\w-]+)[^"]*"[^>]*>\s*<div class="highlight"[^>]*>\s*<pre/g,
            (_, language) => {
              const tag = language.toLowerCase();
              return `<div><div><pre data-language="${tag === 'default' ? 'text' : tag}"`;
            }
          )
          .replace(
            /<div class="output[^"]*"[^>]*>\s*<div class="highlight"[^>]*>\s*<pre/g,
            () => '<div><div><pre data-language="text"'
          );

        const images = [];
        const prefix = `${key}-${path.basename(pageUrl, '.html')}`;
        article = embedImages(article, url, id, prefix, 1100, images, imageMap);
        const body = convert(article, images);
        if (body.trim()) pieces.push(body.trim());
        saveSource(id, sourceName.replace(/\.html$/, '.md'), body);
      } catch (error) {
        failures.push(`${id} ${pageUrl}: ${error.message}`);
        console.warn(`${id} ${pageUrl}: ${error.message}`);
      }
    }

    const source = `${origin}${pages[0]}`;
    const body = pieces.join('\n\n');
    writeChapter(id, key, chapterTitle, source, body);
    chapters.push({
      key,
      title: chapterTitle,
      titleAr: chapterTitle,
      sections: [{ slug: 'index', title: chapterTitle, order }],
    });
    order += 1;
    console.log(`${id}/${key}: ${body.length} chars, ${pages.length} pages`);
  }

  fs.writeFileSync(
    path.join(contentDir, `${id}-structure.json`),
    JSON.stringify({ chapters }, null, 2)
  );
  fs.writeFileSync(
    path.join(sourceRoot, id, 'image-map.json'),
    JSON.stringify(imageMap, null, 2)
  );
};

runCryptopals();
runCs3110();

if (failures.length) {
  console.log(`\nfailures (${failures.length}):`);
  for (const failure of failures) console.log(`- ${failure}`);
} else {
  console.log('\nfailures: none');
}
