/**
 * Learn Programming with OCaml — EPUB import.
 *
 * The book ships only as PDF/EPUB (https://usr.lmf.cnrs.fr/lpo/); the EPUB is a
 * TeX4ht rendering of the LaTeX source, so every page is a small XHTML file with
 * stable classes instead of inline styles:
 *
 *   h2.chapterHead      → `## N. Title`
 *   h3.sectionHead      → `### N.M Title`
 *   h4.subsectionHead   → `#### N.M.K Title` (h4.likesubsectionHead is unnumbered)
 *   pre.listings        → ```ocaml, the listings colour spans are dropped
 *   pre.verbatim        → ```text, REPL and console transcripts
 *   div.math-display    → `$$…$$` rebuilt from the `<img alt>` LaTeX source
 *   span.ectt-*         → inline code,  span.ecti-* → emphasis
 *   hr.figure + caption → the repo's bold `**Figure N.N: …**` caption
 *   div.tcolorbox       → blockquote, carrying the `Program N — …` minipage
 *
 * Figures live in OEBPS/fig and OEBPS/perfgraph-source and are converted to webp.
 * Footnotes live one-per-file in OEBPS/mainNN.html and are renumbered per chapter.
 *
 * Refuses to overwrite any file whose frontmatter is `lang: ar` and preserves the
 * `titleAr` values already present in the structure file.
 *
 * usage: node scripts/import-lpo.mjs [only<key>] [--refresh]
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'learn-ocaml';
const epubUrl = 'https://usr.lmf.cnrs.fr/lpo/lpo.epub';

const sourceDir = path.join(root, 'content-src', id);
const unpackDir = path.join(sourceDir, 'OEBPS');
const contentDir = path.join(root, 'content', id);
const imageDir = path.join(root, 'static', 'images', id);
for (const dir of [sourceDir, contentDir, imageDir]) fs.mkdirSync(dir, { recursive: true });

const only = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const refresh = process.argv.includes('--refresh');

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
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#215;|&times;/g, '×')
    .replace(/&#8804;|&le;/g, '≤')
    .replace(/&#8805;|&ge;/g, '≥')
    .replace(/&#8800;|&ne;/g, '≠')
    .replace(/&#8776;|&approx;/g, '≈')
    .replace(/&#8721;|&sum;/g, '∑')
    .replace(/&#8730;|&radic;/g, '√')
    .replace(/&#8745;|&and;/g, '∧')
    .replace(/&#8746;|&or;/g, '∨')
    .replace(/&#8594;|&rarr;/g, '→')
    .replace(/&#8658;|&rArr;/g, '⇒')
    .replace(/&#8722;|&minus;/g, '−')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&#160;|&#xa0;/gi, ' ');

const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

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
    } else if (!match[0].endsWith('/>')) depth += 1;
  }
  if (end < 0) throw new Error(`unbalanced <${tag}> at ${marker}`);
  return html.slice(0, at) + html.slice(end);
};

/** Every outermost element of `tag`, in document order. */
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
    } else if (!match[0].endsWith('/>')) stack.push(match);
  }
  return out;
};

const textOf = (html) => decode(html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());

/**
 * TeX4ht emits `<img alt="…the LaTeX source…">` for every display formula, so the
 * formula survives as text instead of an opaque SVG. The alt text is LaTeX with
 * TeX4ht's spacing conventions, which KaTeX accepts once the line breaks go away.
 */
const mathFromAlt = (alt) => {
  const tex = alt
    .split('\n')
    .map((line) => line.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return tex;
};

const lintTex = (tex) =>
  tex
    .replace(/\s*([+\-=])\s*/g, ' $1 ')
    .replace(/\s*([<>])\s*/g, ' $1 ')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/≠/g, '\\ne ')
    .replace(/≈/g, '\\approx ')
    .replace(/×/g, '\\times ')
    .replace(/∑/g, '\\sum ')
    .replace(/√/g, '\\sqrt')
    .replace(/∧/g, '\\wedge ')
    .replace(/→/g, '\\to ')
    .replace(/∕/g, '/')
    .replace(/⋅/g, '\\cdot ')
    .replace(/≡/g, '\\equiv ')
    .replace(/∅/g, '\\emptyset ')
    .replace(/∈/g, '\\in ')
    .replace(/∉/g, '\\notin ')
    .replace(/∀/g, '\\forall ')
    .replace(/∃/g, '\\exists ')
    .replace(/−/g, '-')
    .replace(/𝜃/g, '\\theta ')
    .replace(/𝜙/g, '\\phi ')
    .replace(/ϕ/g, '\\phi ')
    .replace(/𝜖/g, '\\epsilon ')
    .replace(/∞/g, '\\infty ')
    .replace(/\s+/g, ' ')
    .trim();

/** A `{ …` case block opened by TeX4ht without its closing brace. */
const closeCase = (tex) => {
  if (!/^\s*\{/.test(tex)) return tex;
  const inner = tex.slice(tex.indexOf('{') + 1).trim();
  return `\\begin{cases} ${inner.replace(/,\s*/g, ' \\\\ ')} \\end{cases}`.replace(/\s+/g, ' ');
};

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

const downloadBinary = (url) =>
  execFileSync('curl', ['-fsL', '--compressed', '-m', '120', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const figureImage = (src, chapterKey, counter) => {
  const base = path.basename(src).replace(/[^.\w-]/g, '_') || 'figure';
  const name = `${chapterKey}-${counter}-${base.replace(/\.\w+$/, '')}`;
  const webp = path.join(imageDir, `${name}.webp`);
  if (!fs.existsSync(webp)) {
    // Figure sources ship inside the unpacked EPUB; the remote host is a fallback.
    const local = path.join(unpackDir, src);
    const raw = path.join(imageDir, `${name}.tmp`);
    try {
      if (fs.existsSync(local)) fs.copyFileSync(local, raw);
      else fs.writeFileSync(raw, downloadBinary(new URL(src, 'https://usr.lmf.cnrs.fr/lpo/').href));
      optimize(raw, webp);
    } catch {
      fs.rmSync(raw, { force: true });
    }
  }
  return fs.existsSync(webp) ? `/images/${id}/${path.basename(webp)}` : new URL(src, 'https://usr.lmf.cnrs.fr/lpo/').href;
};

const HEADING_TAGS = { h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

/** `1.1   Title` → number + title, so the markdown keeps the book's numbering. */
const splitTitlemark = (label, title) => {
  const number = label.replace(/\s+/g, ' ').trim();
  return number ? `${number} ${title}`.trim() : title.trim();
};

const inline = (html, ctx) => {
  let out = html;
  // Footnote references first: they carry their index in the href.
  out = out.replace(
    /<a href='main\d+\.html#fn(\d+)x\d+'><sup class='textsuperscript'>\d+<\/sup><\/a>/g,
    (_, index) => `[^${index}]`
  );
  out = out.replace(/<br\s*\/?>/g, ' ');
  out = out.replace(/<code class='lstinline'>([\s\S]*?)<\/code>/g, (_, code) =>
    `\`${textOf(code).replace(/\s+/g, '')}\``
  );
  out = out.replace(/<span class='ectt-[\d-]*'>([\s\S]*?)<\/span>/g, (_, code) => {
    // TeX4ht writes the inter-word space inside the span, so `ocamlc ` keeps its tail.
    const raw = decode(code).replace(/\s+/g, ' ');
    const trailing = /\s$/.test(raw) ? ' ' : '';
    const text = raw.trim();
    // A typewriter span may hold a sentence-initial capital of an identifier.
    return text ? `\`${text}\`${trailing}` : '';
  });
  out = out.replace(/<span class='ecti-[\d-]*'>([\s\S]*?)<\/span>/g, (_, ital) => {
    const text = textOf(ital);
    return text ? `*${text}*` : '';
  });
  out = out.replace(/<span class='ecbx-[\d-]*'>([\s\S]*?)<\/span>/g, (_, bold) => {
    const text = textOf(bold);
    return text ? `**${text}**` : '';
  });
  out = out.replace(/<a href='([^']+)'[^>]*>([\s\S]*?)<\/a>/g, (_, href, label) => {
    const text = textOf(label);
    if (!text) return '';
    const target = href.startsWith('http') || href.startsWith('#') ? href : `https://usr.lmf.cnrs.fr/lpo/${href}`;
    return `[${text}](${target})`;
  });
  out = out.replace(/<span class='(?:cmmi|cmsy|cmr|ecrm|cmex|msam|msbm)[\w-]*'>([\s\S]*?)<\/span>/g, '$1');
  out = out.replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1');
  out = out.replace(/<sub>([\s\S]*?)<\/sub>/g, (_, sub) => `<sub>${textOf(sub)}</sub>`);
  out = out.replace(/<sup>([\s\S]*?)<\/sup>/g, (_, sup) => `<sup>${textOf(sup)}</sup>`);
  out = out.replace(/<[^>]+>/g, '');
  return decode(
    out
      .replace(/[ \t]+/g, ' ')
      .replace(/¶/g, '')
      .replace(/\s+([,.;:!?])/g, '$1')
      .trim()
  );
};

const cellToMarkdown = (cell, ctx) => {
  const trimmed = stripComments(cell).trim();
  if (!trimmed) return '';
  return inline(trimmed, ctx);
};

const tableToMarkdown = (html, ctx) => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((cell) => cellToMarkdown(cell[1], ctx))
  );
  const meaningful = rows.filter((cells) => cells.some((cell) => cell));
  if (meaningful.length === 0) return '';
  const width = Math.max(...meaningful.map((cells) => cells.length));
  const pad = (cells) => [...cells, ...Array.from({ length: width - cells.length }, () => '')];
  return [
    `| ${pad(meaningful[0]).join(' | ')} |`,
    `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
    ...meaningful.slice(1).map((cells) => `| ${pad(cells).join(' | ')} |`),
  ].join('\n');
};

const codeLanguage = (code) => {
  const value = code.trim();
  if (!value) return 'text';
  if (/^\s*(?:>|#)\s/m.test(value) && /ocaml/i.test(value)) return 'console';
  if (/^OCaml version/m.test(value)) return 'console';
  if (/\blet\b|\bmatch\b|\bfunction\b|\bmodule\b|\brec\b|::|\btype\b/.test(value)) return 'ocaml';
  return 'text';
};

const preToFence = (html, ctx) => {
  const match = html.match(/^<pre([^>]*)>([\s\S]*)<\/pre>$/);
  if (!match) return null;
  const attrs = match[1];
  const inner = match[2];
  const cls = attrs.match(/class='([^']*)'/)?.[1] ?? '';
  let text = inner;
  if (/listings|lstinputlisting/.test(cls)) {
    // Drop the TeX4ht line-number anchors, then the listings colour spans.
    text = text.replace(/<span class='label'>[\s\S]*?<\/span>/g, '');
    text = text.replace(/<span(?: style='[^']*')?>([\s\S]*?)<\/span>/g, '$1');
    text = text.replace(/<a id='[^']*'>([\s\S]*?)<\/a>/g, '$1');
    text = stripComments(text).replace(/<[^>]+>/g, '');
    text = decode(text);
    // TeX4ht pads each line out to the listing width with trailing blanks.
    const lines = text.split('\n').map((line) => line.replace(/\s+$/, ''));
    while (lines.length && lines[lines.length - 1] === '') lines.pop();
    while (lines.length && lines[0] === '') lines.shift();
    return { language: 'ocaml', code: lines.join('\n') };
  }
  text = stripComments(text).replace(/<[^>]+>/g, '');
  text = decode(text);
  const lines = text.split('\n').map((line) => line.replace(/\s+$/, ''));
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  while (lines.length && lines[0] === '') lines.shift();
  return { language: codeLanguage(lines.join('\n')), code: lines.join('\n') };
};

const captionLabel = (caption) => {
  const lead = textOf(caption[1]).replace(/\s*$/, '');
  return `${/[:.]$/.test(lead) ? `${lead} ` : lead}${textOf(caption[2])}`.trim();
};

const convertFigure = (html, ctx) => {
  const idMatch = html.match(/class='figure' id='([^']+)'/);
  const caption = html.match(/<div class='caption'><span class='id'>([\s\S]*?)<\/span><span class='content'>([\s\S]*?)<\/span><\/div>/);
  const images = [...html.matchAll(/<img alt='([^']*)' src='([^']+)'([^>]*)>/g)];
  if (images.length === 0) {
    // A table figure: the caption stays, the wrapped table follows in the flow.
    const label = caption ? `**${captionLabel(caption)}**` : '';
    const body = stripComments(html)
      .replace(/<hr class='figure' \/>/g, '')
      .replace(/<hr class='endfigure' \/>/g, '')
      .replace(/<div class='figure'[^>]*>([\s\S]*)<\/div>\s*$/, '$1')
      .replace(/<div class='caption'>[\s\S]*?<\/div>/g, '')
      .replace(/<a id='[^']*'><\/a>/g, '');
    const rest = convertBlocks(body, ctx).join('\n\n').trim();
    return { markdown: [label, rest].filter(Boolean).join('\n\n') };
  }
  const local = figureImage(images[0][2], ctx.chapterKey, ctx.imageCount);
  ctx.imageCount += 1;
  const alt = images[0][1] && images[0][1] !== 'PIC' ? textOf(images[0][1]) : '';
  const anchorSuffix = idMatch ? `{#${idMatch[1]}}` : '';
  const label = caption ? `**${captionLabel(caption)}**` : '';
  const extras = images.slice(1).map((img) => `![${textOf(img[1])}](${figureImage(img[2], ctx.chapterKey, ctx.imageCount)})`);
  ctx.imageCount += images.length - 1;
  return { markdown: [`![${alt}](${local})${anchorSuffix}`, label, ...extras].filter(Boolean).join('\n\n') };
};

/** `tcolorbox` boxes are side notes; the `Program N — …` minipage is their caption. */
const convertTcolorbox = (html, ctx) => {
  const boxed = stripComments(html).replace(/^<div class='tcolorbox[^']*'[^>]*>/, '').replace(/<\/div>\s*$/, '');
  const program = boxed.match(/<span class='ecbx-[\d-]*'>(Program [\s\S]*?)<\/span>/);
  const body = boxed
    .replace(/<div class='minipage'[^>]*>[\s\S]*?<\/div>\s*(?=<)/g, '')
    .replace(/<div class='tcolorbox-content'>/g, '')
    .trim();
  const lines = [];
  if (program) lines.push(`**${textOf(program[1])}**`);
  lines.push(...convertBlocks(body, ctx));
  const text = lines.filter(Boolean).join('\n\n');
  return text
    .split('\n')
    .map((line) => (line.trim() ? `> ${line}` : '>'))
    .join('\n');
};

const convertList = (html, ctx, ordered) => {
  const items = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((item, index) => {
    const body = convertBlocks(stripComments(item[1]).trim(), ctx).join('\n\n');
    const marker = ordered ? `${index + 1}.` : '-';
    return body
      .split('\n')
      .map((line, at) => (at === 0 ? `${marker} ${line}` : `  ${line}`))
      .join('\n');
  });
  return items.join('\n');
};

/**
 * The span of `marker` up to its matching `</div>`, counted with a real scanner
 * because the boxes nest `div.minipage` inside `div.tcolorbox`.
 */
const spanOfDiv = (html, marker) => {
  const at = html.indexOf(marker);
  if (at < 0) return null;
  const pattern = /<div\b[^>]*>|<\/div\s*>/gi;
  pattern.lastIndex = at;
  let depth = 0;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    if (match[0].startsWith('</')) depth -= 1;
    else depth += 1;
    if (depth === 0) return { start: at, end: match.index + match[0].length };
  }
  return null;
};

/**
 * Block-level walk. TeX4ht wraps almost everything in `<p class='indent'>` whose
 * leading whitespace is the LaTeX indentation, and separates blocks with
 * `<!-- l. N -->` comments that are already stripped.
 */
function convertBlocks(html, ctx) {
  // Figures and side-note boxes carry nested markup, so pull them out first.
  const deferred = [];
  const stash = (kind, markdown) => {
    deferred.push(markdown);
    return `\n@@${kind}${deferred.length - 1}@@\n`;
  };
  let scanned = html;
  let box = spanOfDiv(scanned, "<div class='tcolorbox");
  while (box) {
    scanned = scanned.slice(0, box.start) + stash('BOX', convertTcolorbox(scanned.slice(box.start, box.end), ctx)) + scanned.slice(box.end);
    box = spanOfDiv(scanned, "<div class='tcolorbox");
  }
  scanned = scanned.replace(
    /<hr class='figure' \/>[\s\S]*?<hr class='endfigure' \/>/g,
    (figure) => stash('FIG', convertFigure(figure, ctx).markdown)
  );

  const blocks = [];
  let rest = scanned;
  const token =
    /<(h2|h3|h4|h5|h6)\b[^>]*>[\s\S]*?<\/\1>|<pre\b[^>]*>[\s\S]*?<\/pre>|<div class='math-display'>[\s\S]*?<\/div>|<table\b[^>]*>[\s\S]*?<\/table>|<[ou]l\b[^>]*>[\s\S]*?<\/[ou]l>|<p\b[^>]*>[\s\S]*?<\/p>|@@(?:FIG|BOX)\d+@@/;
  let guard = 0;
  while (rest.length > 0 && guard < 20000) {
    guard += 1;
    const match = token.exec(rest);
    if (!match) {
      const leftover = stripComments(rest).replace(/<[^>]+>/g, '').trim();
      if (leftover) blocks.push(decode(leftover));
      break;
    }
    const before = stripComments(rest.slice(0, match.index)).replace(/<[^>]+>/g, '').trim();
    if (before) blocks.push(decode(before));
    const chunk = match[0];
    rest = rest.slice(match.index + chunk.length);

    if (chunk.startsWith('@@')) {
      blocks.push(deferred[Number(chunk.replace(/\D/g, ''))]);
      continue;
    }
    if (/^<h[2-6]\b/.test(chunk)) {
      const level = HEADING_TAGS[chunk.match(/^<(h[2-6])\b/)[1]];
      const label = chunk.match(/<span class='titlemark'>([\s\S]*?)<\/span>/)?.[1] ?? '';
      const body = chunk
        .replace(/<span class='titlemark'>[\s\S]*?<\/span>/g, '')
        .replace(/<br\s*\/?>/g, ' ')
        .replace(/<a id='[^']*'>[\s\S]*?<\/a>/g, '')
        .replace(/<span class='[^']*'>([\s\S]*?)<\/span>/g, '$1');
      const title = textOf(body.replace(/<\/?h\d[^>]*>/g, ''));
      const heading = splitTitlemark(label.replace(/<br\s*\/?>/g, ' '), title);
      if (heading) blocks.push(`${'#'.repeat(level)} ${heading}`);
      continue;
    }
    if (chunk.startsWith('<pre')) {
      const fence = preToFence(chunk, ctx);
      if (fence) blocks.push(`\`\`\`${fence.language}\n${fence.code}\n\`\`\``);
      continue;
    }
    if (chunk.startsWith("<div class='math-display'>")) {
      const alt = chunk.match(/<img alt='([^']*)'/)?.[1];
      if (alt) {
        const tex = closeCase(lintTex(mathFromAlt(decode(alt))));
        blocks.push(`$$${tex}$$`);
      }
      continue;
    }
    if (chunk.startsWith('<hr class=')) {
      blocks.push('');
      continue;
    }
    if (chunk.startsWith('<table')) {
      const table = tableToMarkdown(chunk, ctx);
      if (table) blocks.push(table);
      continue;
    }
    if (chunk.startsWith('<ul') || chunk.startsWith('<ol')) {
      blocks.push(convertList(chunk, ctx, chunk.startsWith('<ol')));
      continue;
    }
    const paragraph = inline(stripComments(chunk).replace(/^<p[^>]*>|<\/p>$/g, ''), ctx);
    if (paragraph) blocks.push(paragraph);
  }
  return blocks;
}

const chapterBody = (html, ctx, chapter) => {
  let main = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
  main = stripComments(main);
  main = removeElement(main, "<div class='crosslinks'>");
  // The caller re-emits `## N. Title`, so the page's own chapter heading is redundant.
  if (chapter.number) main = main.replace(/<h2 class='chapterHead'[\s\S]*?<\/h2>/, '');
  // The heading already carries the chapter title; the anchor-only paragraphs do not.
  main = main.replace(/<p id='[^']*'><a id='Q[^']*'><\/a>\s*<\/p>/g, '');
  return convertBlocks(main, ctx)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const footnoteDefs = new Map();
const readFootnotes = () => {
  for (const entry of fs.readdirSync(unpackDir)) {
    const match = entry.match(/^main(\d+)\.html$/);
    if (!match) continue;
    const html = fs.readFileSync(path.join(unpackDir, entry), 'utf8');
    const idMatch = html.match(/<a id='(fn\d+x\d+)'/);
    if (!idMatch) continue;
    const text = inline(
      html
        .slice(html.indexOf("<div class='footnote-text'>"))
        .replace(/<span class='footnote-mark'>[\s\S]*?<\/span>/, '')
        .replace(/<\/div>\s*<\/body>[\s\S]*$/, ''),
      { chapterKey: 'notes', imageCount: 0 }
    );
    if (text) footnoteDefs.set(idMatch[1], text);
  }
};

const chapters = [
  { key: 'frontmatter', file: 'main.html', title: 'Title page' },
  { key: 'preface', file: 'mainli2.html', title: 'Preface' },
  { key: 'working-environment', file: 'mainch1.html', title: 'The Working Environment', number: '1' },
  { key: 'first-steps', file: 'mainch2.html', title: 'First Steps with OCaml', number: '2' },
  { key: 'ocaml-concepts', file: 'mainch3.html', title: 'OCaml Concepts: A Closer Look', number: '3' },
  { key: 'arrays', file: 'mainch4.html', title: 'Arrays', number: '4' },
  { key: 'sets-and-dictionaries', file: 'mainch5.html', title: 'Sets and Dictionaries', number: '5' },
  { key: 'queues', file: 'mainch6.html', title: 'Queues', number: '6' },
  { key: 'graphs', file: 'mainch7.html', title: 'Graphs', number: '7' },
  { key: 'disjoint-sets', file: 'mainch8.html', title: 'Disjoint Sets', number: '8' },
  { key: 'zippers', file: 'mainch9.html', title: 'Zippers', number: '9' },
  { key: 'arithmetic', file: 'mainch10.html', title: 'Arithmetic', number: '10' },
  { key: 'dynamic-programming', file: 'mainch11.html', title: 'Dynamic Programming and Memoization', number: '11' },
  { key: 'sorting', file: 'mainch12.html', title: 'Sorting Algorithms', number: '12' },
  { key: 'graph-algorithms', file: 'mainch13.html', title: 'Graph Algorithms', number: '13' },
  { key: 'references', file: 'mainli3.html', title: 'Bibliography' },
];

/** The EPUB is the only complete source: cache it, then unpack it next to the cache. */
const epubPath = path.join(sourceDir, 'lpo.epub');
if (refresh || !fs.existsSync(epubPath)) {
  console.log(`downloading ${epubUrl}`);
  fs.writeFileSync(epubPath, downloadBinary(epubUrl));
}
if (refresh || !fs.existsSync(unpackDir)) {
  execFileSync('unzip', ['-oq', epubPath, '-d', sourceDir], { stdio: 'ignore' });
}
if (!fs.existsSync(path.join(unpackDir, 'mainch1.html'))) {
  console.error(`unpacked EPUB not found in ${unpackDir}`);
  process.exit(1);
}
readFootnotes();

const structureFile = path.join(root, 'content', `${id}-structure.json`);
const existingStructure = fs.existsSync(structureFile)
  ? JSON.parse(fs.readFileSync(structureFile, 'utf8'))
  : { chapters: [] };
const translatedTitles = existingStructure.chapters.reduce((acc, chapter) => {
  if (chapter.titleAr) acc[chapter.key] = chapter.titleAr;
  return acc;
}, {});

const structure = { chapters: [] };
const skipped = [];

for (const [index, chapter] of chapters.entries()) {
  if (only && chapter.key !== only) continue;
  const html = fs.readFileSync(path.join(unpackDir, chapter.file), 'utf8');
  const ctx = { chapterKey: chapter.key, imageCount: 0 };

  let body = chapterBody(html, ctx, chapter);
  const usedNotes = new Set();
  body = body.replace(/\[\^(\d+)\]/g, (match, indexRef) => {
    const at = [...footnoteDefs.keys()][Number(indexRef) - 1];
    if (!at) return match;
    usedNotes.add(at);
    return match;
  });

  // Footnotes are collected per chapter from the ones this chapter references.
  const notes = [];
  for (const key of usedNotes) notes.push(`[^${key.match(/^fn(\d+)/)[1]}]: ${footnoteDefs.get(key)}`);

  // `<title>` is "1 The Working Environment"; the heading on the page carries the same text.
  const rawTitle = textOf(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '') || chapter.title;
  const title = rawTitle.replace(/^\d+\s+/, '').trim() || chapter.title;
  const heading = chapter.number ? `${chapter.number}. ${title}` : title;

  const parts = ['---', `title: ${JSON.stringify(title)}`, 'lang: en', '---', '', `## ${heading}`, '', body];
  if (notes.length > 0) parts.push('', notes.join('\n'));
  const file = path.join(contentDir, `${chapter.key}--index.md`);
  if (fs.existsSync(file) && /lang:\s*ar/.test(fs.readFileSync(file, 'utf8'))) {
    console.warn(`تخطّي الكتابة (lang: ar): ${file}`);
    skipped.push(file);
  } else {
    fs.writeFileSync(file, `${parts.join('\n')}\n`);
  }

  structure.chapters.push({
    key: chapter.key,
    title,
    ...(translatedTitles[chapter.key] ? { titleAr: translatedTitles[chapter.key] } : {}),
    sections: [{ slug: 'index', title, order: index }],
  });
  console.log(`${chapter.key}: ${body.length} chars, ${ctx.imageCount} images, ${notes.length} notes`);
}

fs.writeFileSync(structureFile, `${JSON.stringify(structure, null, 2)}\n`);
console.log(`\n${id}: ${structure.chapters.length} chapters`);
if (skipped.length) console.log(`skipped (lang: ar): ${skipped.length}`);
