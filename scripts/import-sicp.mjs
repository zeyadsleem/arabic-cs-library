import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, inline, decode } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'sicp';
const origin = 'https://sarabander.github.io';
const baseUrl = `${origin}/sicp/`;
const htmlUrl = `${baseUrl}html/`;
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', id);
const targetDir = path.join(contentDir, id);
const imageDir = path.join(root, 'static', 'images', id);
const only = process.argv[2] || '';

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status} — ${url}`);
  return result.slice(0, split);
};

const downloadBinary = (url) =>
  execFileSync('curl', ['-fsL', '--compressed', '-m', '90', url], {
    maxBuffer: 128 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      [raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const decodeNumericEntities = (html) =>
  html
    .replace(/&#(\d+);/g, (match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (match, code) =>
      String.fromCodePoint(parseInt(code, 16))
    );

const resolveLinks = (html, pageUrl) =>
  html.replace(/href="([^"]+)"/g, (match, href) => {
    if (/^(https?:|mailto:|#|data:)/i.test(href)) return match;
    return `href="${new URL(href, pageUrl).href}"`;
  });

const chapters = [
  {
    key: 'c0-frontmatter',
    title: 'Frontmatter',
    pages: [
      { file: 'Dedication.xhtml', slug: 'dedication', title: 'Dedication' },
      { file: 'Foreword.xhtml', slug: 'foreword', title: 'Foreword' },
      { file: 'Preface.xhtml', slug: 'preface', title: 'Preface to the Second Edition' },
      { file: 'Preface-1e.xhtml', slug: 'preface-1e', title: 'Preface to the First Edition' },
      { file: 'Acknowledgments.xhtml', slug: 'acknowledgments', title: 'Acknowledgments' },
    ],
  },
  {
    key: 'c1-building-abstractions-with-procedures',
    title: 'Building Abstractions with Procedures',
    pages: [
      { file: 'Chapter-1.xhtml', slug: 'index', title: 'Chapter 1' },
      { file: '1_002e1.xhtml', slug: '1-1', title: '1.1' },
      { file: '1_002e2.xhtml', slug: '1-2', title: '1.2' },
      { file: '1_002e3.xhtml', slug: '1-3', title: '1.3' },
    ],
  },
  {
    key: 'c2-building-abstractions-with-data',
    title: 'Building Abstractions with Data',
    pages: [
      { file: 'Chapter-2.xhtml', slug: 'index', title: 'Chapter 2' },
      { file: '2_002e1.xhtml', slug: '2-1', title: '2.1' },
      { file: '2_002e2.xhtml', slug: '2-2', title: '2.2' },
      { file: '2_002e3.xhtml', slug: '2-3', title: '2.3' },
      { file: '2_002e4.xhtml', slug: '2-4', title: '2.4' },
      { file: '2_002e5.xhtml', slug: '2-5', title: '2.5' },
    ],
  },
  {
    key: 'c3-modularity-objects-and-state',
    title: 'Modularity, Objects, and State',
    pages: [
      { file: 'Chapter-3.xhtml', slug: 'index', title: 'Chapter 3' },
      { file: '3_002e1.xhtml', slug: '3-1', title: '3.1' },
      { file: '3_002e2.xhtml', slug: '3-2', title: '3.2' },
      { file: '3_002e3.xhtml', slug: '3-3', title: '3.3' },
      { file: '3_002e4.xhtml', slug: '3-4', title: '3.4' },
      { file: '3_002e5.xhtml', slug: '3-5', title: '3.5' },
    ],
  },
  {
    key: 'c4-metalinguistic-abstraction',
    title: 'Metalinguistic Abstraction',
    pages: [
      { file: 'Chapter-4.xhtml', slug: 'index', title: 'Chapter 4' },
      { file: '4_002e1.xhtml', slug: '4-1', title: '4.1' },
      { file: '4_002e2.xhtml', slug: '4-2', title: '4.2' },
      { file: '4_002e3.xhtml', slug: '4-3', title: '4.3' },
      { file: '4_002e4.xhtml', slug: '4-4', title: '4.4' },
    ],
  },
  {
    key: 'c5-computing-with-register-machines',
    title: 'Computing with Register Machines',
    pages: [
      { file: 'Chapter-5.xhtml', slug: 'index', title: 'Chapter 5' },
      { file: '5_002e1.xhtml', slug: '5-1', title: '5.1' },
      { file: '5_002e2.xhtml', slug: '5-2', title: '5.2' },
      { file: '5_002e3.xhtml', slug: '5-3', title: '5.3' },
      { file: '5_002e4.xhtml', slug: '5-4', title: '5.4' },
      { file: '5_002e5.xhtml', slug: '5-5', title: '5.5' },
    ],
  },
  {
    key: 'c6-backmatter',
    title: 'Backmatter',
    pages: [
      { file: 'References.xhtml', slug: 'references', title: 'References' },
      { file: 'Exercises.xhtml', slug: 'exercises', title: 'List of Exercises' },
      { file: 'Figures.xhtml', slug: 'figures', title: 'List of Figures' },
      { file: 'Colophon.xhtml', slug: 'colophon', title: 'Colophon' },
    ],
  },
];

const stripPageChrome = (html) => {
  let page = html.replace(/[\s\S]*?<body>/i, '').replace(/<\/body>[\s\S]*$/i, '');
  const start = page.indexOf('<section');
  const end = page.lastIndexOf('</section>');
  if (start >= 0 && end >= start) page = page.slice(start, end + 10);
  page = page
    .replace(/<nav class="header">[\s\S]*?<\/nav>/g, ' ')
    .replace(/<span class="(?:top|bottom) jump"[^>]*>[\s\S]*?<\/span>/g, '')
    .replace(/<a id="page(?:top|bottom)"><\/a>/g, '')
    .replace(/<a id="pagetop"><\/a>/g, '');
  return page;
};

const spaceHeadingSpans = (html) =>
  html.replace(
    /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/g,
    (heading, tag, inner) =>
      `<${tag}>${inner.replace(/<\/span><span/g, '</span> <span')}</${tag}>`
  );

const mathLatex = (xml) => {
  const parseInto = (source, index, list) => {
    let i = index;
    while (i < source.length) {
      if (source[i] !== '<') {
        const match = source.slice(i).match(/^[^<]+/);
        if (!match) {
          i += 1;
          continue;
        }
        list.push({ text: decode(match[0]).trim() });
        i += match[0].length;
        continue;
      }
      if (source.startsWith('</', i)) {
        return source.indexOf('>', i) + 1;
      }
      const open = source.slice(i + 1, i + 40).match(/^([a-zA-Z]+)/);
      if (!open) {
        i += 1;
        continue;
      }
      const tag = open[1];
      const gt = source.indexOf('>', i);
      if (gt < 0) return source.length;
      if (source[gt - 1] === '/') {
        list.push({ tag, children: [] });
        i = gt + 1;
        continue;
      }
      const children = [];
      const next = parseInto(source, gt + 1, children);
      list.push({ tag, children });
      i = next;
    }
    return i;
  };
  const render = (node) => {
    if (node.text !== undefined) return node.text;
    const items = (node.children || []).map(render).filter((item) => item !== '');
    const joined = items.join(' ');
    switch (node.tag) {
      case 'mfrac': {
        const [a, b] = items;
        return a && b ? `\\frac{${a}}{${b}}` : joined;
      }
      case 'msup':
      case 'msub': {
        const [a, b] = items;
        const op = node.tag === 'msup' ? '^' : '_';
        return a && b ? `${a}${op}{${b}}` : joined;
      }
      case 'msubsup': {
        const [a, b, c] = items;
        return a && b && c ? `${a}_{${b}}^{${c}}` : joined;
      }
      case 'msqrt':
        return `\\sqrt{${joined}}`;
      case 'mroot': {
        const [a, b] = items;
        return a && b ? `\\sqrt[${b}]{${a}}` : joined;
      }
      case 'annotation':
        return '';
      default:
        return joined;
    }
  };
  const root = [];
  parseInto(xml, 0, root);
  return root.map(render).filter(Boolean).join(' ');
};

const replaceMath = (html, math) =>
  html.replace(/<math\b[^>]*>([\s\S]*?)<\/math>/g, (match, inner) => {
    const latex = mathLatex(inner.replace(/<!--[\s\S]*?-->/g, '')).replace(/[ \t\r\n]+/g, ' ').trim();
    if (!latex) return '';
    const index = math.length;
    math.push(latex);
    return ` LATEX${index}END `;
  });

const restoreMath = (text, math) =>
  text.replace(/LATEX(\d+)END/g, (match, index) => `$${math[Number(index)]}$`);

const replaceFigures = (html) =>
  html.replace(/<object\b([^>]*)>[\s\S]*?<\/object>/g, (figure, attrs) => {
    const data = attrs.match(/data="([^"]+)"/)?.[1];
    if (!data) return '';
    const caption = figure.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1];
    const alt = caption
      ? decodeNumericEntities(caption.replace(/<[^>]+>/g, ''))
          .replace(/\s+/g, ' ')
          .trim()
      : '';
    return `<img src="${data}" alt="${alt.replace(/"/g, '&quot;')}">`;
  });

const renderFootnotes = (html, notes) => {
  const container = html.match(/<div class="footnote">/);
  if (!container) return html;
  const after = html.slice(container.index);
  const sectionEnd = after.search(/<\/section>|<\/body>/i);
  const blockEnd = sectionEnd >= 0 ? sectionEnd : after.length;
  const block = after.slice(0, blockEnd);
  const definitions = new Map();
  for (const foot of block.matchAll(/<div id="FOOT(\d+)">([\s\S]*?)<\/div>/g)) {
    definitions.set(
      Number(foot[1]),
      foot[2].replace(/<a class="footnote_backlink"[\s\S]*?<\/a>/g, '')
    );
  }
  const remaining = html.slice(0, container.index) + after.slice(blockEnd);
  const pattern =
    /<a class="footnote_link" id="DOCF(\d+)" href="#FOOT\1"><sup>\d+<\/sup><\/a>/g;
  const refs = [...remaining.matchAll(pattern)];
  if (refs.length === 0) return remaining;
  let output = '';
  let cursor = 0;
  for (const [index, ref] of refs.entries()) {
    const markdown = convertArticle(
      (() => {
        const footMath = [];
        const piece = definitions.get(Number(ref[1])) || '<p></p>';
        return restoreMath(convertArticle(replaceMath(piece, footMath), []).trim(), footMath);
      })(),
      []
    ).trim();
    const count = notes.length + 1;
    notes.push({ count, markdown });
    output += remaining.slice(cursor, ref.index) + `[^#${count}#]`;
    cursor = ref.index + ref[0].length;
  }
  output += remaining.slice(cursor);
  return output;
};

const collectImages = (article, pageUrl, key) => {
  const images = [];
  const processed = article.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = decodeNumericEntities(tag.match(/alt="([^"]*)"/)?.[1] || '').trim();
    if (!src || src.startsWith('data:')) return '';
    const resolved = new URL(src, pageUrl);
    const base = path.basename(resolved.pathname).replace(/[^.\w-]/g, '_') || 'image';
    const name = `${key}-${images.length}-${base}`;
    const webp = path.join(imageDir, name.replace(/\.\w+$/, '.webp'));
    if (!fs.existsSync(webp)) {
      const raw = path.join(imageDir, `${name}.tmp`);
      try {
        fs.writeFileSync(raw, downloadBinary(resolved.href));
        optimize(raw, webp);
      } catch {
        fs.rmSync(raw, { force: true });
      }
    }
    const local = fs.existsSync(webp)
      ? `/images/${id}/${path.basename(webp)}`
      : resolved.href;
    images.push({ src, alt, local });
    return ` IMAGE${images.length - 1}END `;
  });
  return { processed, images };
};

const patchCodeLanguages = (html) =>
  html.replace(/<pre([^>]*)>/g, (match, attrs) => {
    if (/data-language=/.test(attrs)) return match;
    return /class="lisp/.test(attrs) ? `<pre${attrs} data-language="scheme">` : match;
  });

const convertArticle = (article, images) =>
  convert(decodeNumericEntities(patchCodeLanguages(article)), images);

const verify = (key, body) => {
  const fences = (body.match(/^```/gm) || []).length;
  const issues = [];
  if (body.length <= 1000) issues.push(`too short (${body.length})`);
  if (fences % 2 !== 0) issues.push(`unbalanced fences (${fences})`);
  if (issues.length > 0) console.warn(`مشكلة ${key}: ${issues.join(', ')}`);
};

const structure = { chapters: [] };
const structureFile = path.join(contentDir, `${id}-structure.json`);
const existingStructure = fs.existsSync(structureFile)
  ? JSON.parse(fs.readFileSync(structureFile, 'utf8'))
  : { chapters: [] };
const imageMap = {};
const failures = [];
const skipped = [];

for (const chapter of chapters) {
  if (only && chapter.key !== only) continue;
  const chapterDir = path.join(sourceDir, chapter.key);
  fs.mkdirSync(chapterDir, { recursive: true });
  const notes = [];
  const parts = [];
  const math = [];

  for (const page of chapter.pages) {
    const pageUrl = `${htmlUrl}${page.file}`;
    let raw;
    try {
      raw = fetchText(pageUrl);
    } catch (error) {
      console.warn(`تخطّي ${chapter.key}/${page.slug}: ${error.message}`);
      failures.push({ url: pageUrl, reason: error.message });
      continue;
    }
    fs.writeFileSync(path.join(chapterDir, `${page.slug}.xhtml`), raw);

    let pageHtml = resolveLinks(stripPageChrome(raw), pageUrl);
    pageHtml = spaceHeadingSpans(pageHtml);
    pageHtml = replaceMath(pageHtml, math);
    pageHtml = replaceFigures(pageHtml);
    pageHtml = renderFootnotes(pageHtml, notes);
    const { processed, images } = collectImages(pageHtml, pageUrl, chapter.key);
    for (const image of images) imageMap[image.src] ??= image.local;

    let markdown = restoreMath(convertArticle(processed, images).trim(), math);
    if (page.slug === 'index' && markdown.startsWith('#')) {
      const headingMatch = markdown.match(/^#{1,4}\s+(.+?)(?:\s+\{#[^}]+\})?\n/);
      if (headingMatch) {
        markdown = markdown.slice(headingMatch[0].length).trim();
      }
    }

    fs.writeFileSync(
      path.join(chapterDir, `${page.slug}.md`),
      `---\ntitle: ${JSON.stringify(page.title)}\nlang: en\n---\n\n${markdown}\n`
    );
    if (markdown) parts.push(markdown);
    console.log(`${chapter.key}/${page.slug}: ${markdown.length} chars`);
  }

  let body = parts.join('\n\n').trim();
  if (notes.length > 0) {
    body += `\n\n${notes.map((note) => `[^#${note.count}#]: ${note.markdown}`).join('\n\n')}`;
  }
  body = body.replace(/\[\^#(\d+)#\]/g, '[^$1]');
  verify(chapter.key, body);

  const file = path.join(targetDir, `${chapter.key}--index.md`);
  if (fs.existsSync(file) && /lang:\s*ar/.test(fs.readFileSync(file, 'utf8'))) {
    console.warn(`تخطّي الكتابة (lang: ar): ${file}`);
    skipped.push(file);
  } else {
    fs.writeFileSync(
      file,
      `---\ntitle: ${JSON.stringify(chapter.title)}\nlang: en\n---\n\n${body}\n`
    );
  }

  const translatedTitles = existingStructure.chapters.reduce((acc, chapter) => {
    if (chapter.titleAr) acc[chapter.key] = chapter.titleAr;
    return acc;
  }, {});

  structure.chapters.push({
    key: chapter.key,
    title: chapter.title,
    ...(translatedTitles[chapter.key] ? { titleAr: translatedTitles[chapter.key] } : {}),
    sections: [{ slug: 'index', title: chapter.title, order: chapters.indexOf(chapter) }],
  });
}

fs.writeFileSync(structureFile, JSON.stringify(structure, null, 2));
fs.writeFileSync(
  path.join(sourceDir, 'image-map.json'),
  JSON.stringify(imageMap, null, 2)
);

console.log(`\n${id}: ${structure.chapters.length} chapters`);
if (skipped.length) console.log(`skipped (lang: ar): ${skipped.length}`);
if (failures.length) {
  console.log(`failures: ${failures.length}`);
  for (const failure of failures) console.log(`  ${failure.url} — ${failure.reason}`);
}