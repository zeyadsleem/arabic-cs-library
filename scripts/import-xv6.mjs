/**
 * Import the xv6 book (RISC-V edition) from https://mit-pdos.github.io/xv6-riscv-book/.
 * The site publishes one self-contained page per chapter, so one page becomes one
 * content file: chapters carry their whole text, their figures are downloaded as
 * webp, and the footnotes are renumbered into markdown footnote definitions.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, decode } from './lib/html-to-markdown.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'xv6';
const baseUrl = 'https://mit-pdos.github.io/xv6-riscv-book/';
const sourceDir = path.join(root, 'content-src', id);
const contentDir = path.join(root, 'content');
const targetDir = path.join(contentDir, id);
const imageDir = path.join(root, 'static', 'images', id);
const args = process.argv.slice(2);
const only = args.find((arg) => !arg.startsWith('--')) || '';
const refresh = args.includes('--refresh');

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const fetchText = (url) => {
  const result = execFileSync('curl', ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status} — ${url}`);
  return result.slice(0, split);
};

const downloadBinary = (url) =>
  execFileSync('curl', ['-fsL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      [raw, '-background', 'white', '-alpha', 'remove', '-alpha', 'off', '-resize', '1400x1400>', '-strip', '-quality', '75', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const MAIN_OPEN = '<main class="content" id="quarto-document-content">';

/** Balanced-tag remover: drops the element opening at `marker` and everything inside it. */
const removeElement = (html, marker) => {
  const at = html.indexOf(marker);
  if (at < 0) return html;
  const tag = marker.match(/^<([a-z0-9]+)/i)[1].toLowerCase();
  const pattern = new RegExp(`<${tag}\\b[^>]*>|</${tag}\\s*>`, 'gi');
  pattern.lastIndex = at;
  let depth = 0;
  let end = -1;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    if (match[0].startsWith('</')) {
      depth -= 1;
      if (depth === 0) {
        end = match.index + match[0].length;
        break;
      }
    } else if (!match[0].endsWith('/>')) {
      depth += 1;
    }
  }
  if (end < 0) throw new Error(`unbalanced <${tag}> at ${marker}`);
  return html.slice(0, at) + html.slice(end);
};

/** Every top-level element of `tag`, outermost only. */
const elements = (html, tag) => {
  const out = [];
  const pattern = new RegExp(`<${tag}\\b[^>]*>|</${tag}\\s*>`, 'gi');
  const stack = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    if (match[0].startsWith('</')) {
      const start = stack.pop();
      if (!stack.length && start) {
        out.push({
          html: html.slice(start.index, match.index + match[0].length),
          inner: html.slice(start.index + start[0].length, match.index),
        });
      }
    } else if (!match[0].endsWith('/>')) {
      stack.push(match);
    }
  }
  return out;
};

const chapterTitle = (main) => {
  const match = main.match(/<h1 class="title">([\s\S]*?)<\/h1>/);
  if (!match) return null;
  const number = match[1]
    .match(/<span class="chapter-number">([\s\S]*?)<\/span>/)?.[1]
    ?.replace(/\s+/g, ' ')
    .trim();
  const title = decode(match[1].match(/<span class="chapter-title">([\s\S]*?)<\/span>/)?.[1] ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return title ? { title, label: number ?? '' } : null;
};

/** \(...\) / \[...\] spans become $...$ / $$...$$ so the math survives markdown untouched. */
const convertMath = (html) =>
  html
    .replace(/<span class="math inline">\\\(([\s\S]*?)\\\)<\/span>/g, (_, tex) => ` $${tex}$ `)
    .replace(/<span class="math display">\\\[([\s\S]*?)\\\]<\/span>/g, (_, tex) => ` $$${tex}$$ `);

/** The `.coderef` anchors drive a JavaScript source panel; their text is the identifier. */
const convertCodeRefs = (html) =>
  html.replace(/<a[^>]+class="[^"]*coderef[^"]*"[^>]*>([\s\S]*?)<\/a>/g, (_, text) => `<code>${text.trim()}</code>`);

const convertFootnoteRefs = (html) =>
  html.replace(
    /<a href="#fn\d+" class="footnote-ref"[^>]*>\s*<sup>(\d+)<\/sup>\s*<\/a>/g,
    (_, index) => `[^${index}]`
  );

/** Figures: images are downloaded, table figures keep the table under a bold caption. */
const convertFigures = (html, images, chapterKey, pageUrl) => {
  for (const figure of elements(html, 'figure')) {
    const anchor = figure.html.match(/<figure[^>]+id="([^"]+)"/)?.[1] || '';
    const caption = figure.inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] || '';
    const captionText = caption
      ? decode(caption.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
      : '';
    const image = figure.inner.match(/<img[^>]+src="([^"]+)"[^>]*>/);
    if (image) {
      const resolved = new URL(image[1], pageUrl);
      const base = path.basename(resolved.pathname).replace(/[^.\w-]/g, '_') || 'image';
      const name = `${chapterKey}-${images.length}-${base.replace(/\.\w+$/, '')}`;
      const webp = path.join(imageDir, `${name}.webp`);
      if (!fs.existsSync(webp)) {
        const raw = path.join(imageDir, `${name}.tmp`);
        try {
          fs.writeFileSync(raw, downloadBinary(resolved.href));
          optimize(raw, webp);
        } catch {
          fs.rmSync(raw, { force: true });
        }
      }
      const local = fs.existsSync(webp) ? `/images/${id}/${path.basename(webp)}` : resolved.href;
      images.push({ src: image[1], alt: '', local });
      const anchorSuffix = anchor ? `{#${anchor}}` : '';
      const label = captionText ? `<p><strong>${captionText}</strong></p>` : '';
      html = html.replace(figure.html, () => ` IMAGE${images.length - 1}END ${anchorSuffix} ${label}`);
      continue;
    }
    const rest = figure.inner
      .replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/g, '')
      .trim();
    const label = captionText ? `<p><strong>${captionText}</strong></p>` : '';
    html = html.replace(figure.html, () => `${label}${rest}`);
  }
  return html;
};

/** Footnotes: `<li id="fnN">` becomes `[^N]: ...`, the in-text refs are already `[^N]`. */
const takeFootnotes = (html) => {
  const section = html.match(/<section id="footnotes"[\s\S]*?<\/section>/);
  if (!section) return { html, notes: [] };
  const notes = [];
  for (const item of elements(section[0], 'li')) {
    const index = item.html.match(/<li id="fn(\d+)"/)?.[1];
    if (!index) continue;
    const text = item.inner
      .replace(/<a[^>]*class="[^"]*footnote-back[^"]*"[^>]*>[\s\S]*?<\/a>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (text) notes.push(`[^${index}]: ${decode(text)}`);
  }
  return { html: html.replace(section[0], ''), notes };
};

/** Other chapters ship the bibliography hidden; the references chapter shows it. */
const convertBibliography = (html, hidden) => {
  if (hidden) return removeElement(html, '<div id="refs"');
  return html.replace(
    /<div id="(ref-[\w:.-]+)" class="csl-entry"[^>]*>([\s\S]*?)<\/div>/g,
    (_, anchor, inner) => `<p>${inner.trim()} {#${anchor}}</p>`
  );
};

/** Page-relative links must not stay relative once the page moves into the reader. */
const absolutizeLinks = (html) =>
  html.replace(/href="([^"]+)"/g, (match, href) => {
    if (/^(https?:|mailto:|#|data:|\/)/i.test(href)) return match;
    return `href="${new URL(href, baseUrl).href}"`;
  });

const codeLanguage = (code) => {
  const value = code.trim();
  if (!value) return '';
  if (/^#\s*(include|define|ifdef|ifndef|endif|pragma)\b/m.test(value)) return 'c';
  if (/\b(?:static\s+)?(?:int|void|char|uint\d*_t|size_t|struct)\s+[\w*]+\s*[;({]/m.test(value)) return 'c';
  if (/->|__atomic_|\bprintk\s*\(/.test(value)) return 'c';
  if (/;\s*$/m.test(value)) return 'c';
  if (/^\s*(?:li|sd|ld|ecall|call|ret|j[a-z]*|b[a-z]+)\s+\S/m.test(value) && /:/.test(value)) return 'asm';
  if (/^\s*\$\s|^#\s*(?:objdump|ls|cat|grep|echo|\$)/m.test(value)) return 'bash';
  return '';
};

const patchCodeLanguages = (html) =>
  html.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, (match, attrs, inner) => {
    if (/data-language=/.test(attrs)) return match;
    const text = inner.replace(/<[^>]+>/g, '');
    const language = codeLanguage(text);
    return language ? `<pre${attrs} data-language="${language}">${inner}</pre>` : match;
  });

const chapters = [
  { key: 'foreword', file: 'index.html', title: 'Foreword and acknowledgments' },
  { key: 'unix', file: 'unix.html', title: 'Operating system interfaces' },
  { key: 'first', file: 'first.html', title: 'Operating system organization' },
  { key: 'mem', file: 'mem.html', title: 'Page tables' },
  { key: 'trap', file: 'trap.html', title: 'Traps and system calls' },
  { key: 'pgfault', file: 'pgfault.html', title: 'Page faults' },
  { key: 'interrupt', file: 'interrupt.html', title: 'Interrupts and device drivers' },
  { key: 'lock', file: 'lock.html', title: 'Locking' },
  { key: 'sched', file: 'sched.html', title: 'Scheduling' },
  { key: 'sleep', file: 'sleep.html', title: 'Sleep and Wakeup' },
  { key: 'fs', file: 'fs.html', title: 'File system' },
  { key: 'log', file: 'log.html', title: 'Logging' },
  { key: 'lock2', file: 'lock2.html', title: 'Concurrency revisited' },
  { key: 'sum', file: 'sum.html', title: 'Summary' },
  { key: 'references', file: 'references.html', title: 'References' },
];

const structureFile = path.join(contentDir, `${id}-structure.json`);
const existingStructure = fs.existsSync(structureFile)
  ? JSON.parse(fs.readFileSync(structureFile, 'utf8'))
  : { chapters: [] };
const translatedTitles = existingStructure.chapters.reduce((acc, chapter) => {
  if (chapter.titleAr) acc[chapter.key] = chapter.titleAr;
  return acc;
}, {});

const imageMapFile = path.join(sourceDir, 'image-map.json');
const imageMap = fs.existsSync(imageMapFile) ? JSON.parse(fs.readFileSync(imageMapFile, 'utf8')) : {};
const structure = { chapters: [] };
const skipped = [];

for (const [index, chapter] of chapters.entries()) {
  if (only && chapter.key !== only) continue;
  const pageUrl = `${baseUrl}${chapter.file}`;
  const cache = path.join(sourceDir, chapter.file);
  if (refresh || !fs.existsSync(cache)) fs.writeFileSync(cache, fetchText(pageUrl));
  const html = fs.readFileSync(cache, 'utf8');

  const at = html.indexOf(MAIN_OPEN);
  let main = at < 0 ? html : html.slice(at + MAIN_OPEN.length, html.indexOf('</main>', at));
  const title = chapterTitle(main);
  main = removeElement(main, '<header id="title-block-header"');
  main = convertMath(main);
  main = convertCodeRefs(main);
  main = convertFootnoteRefs(main);
  const images = [];
  main = convertFigures(main, images, chapter.key, pageUrl);
  const footnotes = takeFootnotes(main);
  main = convertBibliography(footnotes.html, chapter.key !== 'references');
  main = absolutizeLinks(main);
  main = patchCodeLanguages(main);
  for (const image of images) imageMap[image.src] ??= image.local;

  const markdown = convert(decode(main), images)
    .trim()
    .replace(/\)\s+\{#(fig:[\w:.-]+)\}/g, '){#$1}');
  const chapterName = title?.title || chapter.title;
  const heading = title?.label ? `${title.label}. ${chapterName}` : chapterName;
  const parts = [
    '---',
    `title: ${JSON.stringify(chapterName)}`,
    'lang: en',
    '---',
    '',
    `## ${heading}`,
    '',
    markdown,
  ];
  if (footnotes.notes.length > 0) parts.push('', footnotes.notes.join('\n'));
  const body = `${parts.join('\n')}\n`;

  const file = path.join(targetDir, `${chapter.key}--index.md`);
  if (fs.existsSync(file) && /lang:\s*ar/.test(fs.readFileSync(file, 'utf8'))) {
    console.warn(`تخطّي الكتابة (lang: ar): ${file}`);
    skipped.push(file);
  } else {
    fs.writeFileSync(file, body);
  }

  structure.chapters.push({
    key: chapter.key,
    title: chapterName,
    ...(translatedTitles[chapter.key] ? { titleAr: translatedTitles[chapter.key] } : {}),
    sections: [{ slug: 'index', title: chapterName, order: index }],
  });
  console.log(`${chapter.key}: ${markdown.length} chars, ${images.length} images, ${footnotes.notes.length} notes`);
}

fs.writeFileSync(structureFile, `${JSON.stringify(structure, null, 2)}\n`);
fs.writeFileSync(imageMapFile, `${JSON.stringify(imageMap, null, 2)}\n`);
console.log(`\n${id}: ${structure.chapters.length} chapters`);
if (skipped.length) console.log(`skipped (lang: ar): ${skipped.length}`);
