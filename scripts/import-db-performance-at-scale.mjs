#!/usr/bin/env node
/** Turn the publisher EPUB of Database Performance at Scale into English slices.
 *
 * The book is CC BY 4.0, so the translation is published from the same text the
 * reader can check against. Springer ships an EPUB next to the PDF; its HTML is
 * semantic (headings, figures with captions, code lines, footnotes), which makes
 * it a far better translation source than page-scraped text: no running headers,
 * no page numbers, no hyphenation, and every figure arrives as its own file.
 *
 * Usage: `node scripts/import-db-performance-at-scale.mjs`
 *
 * Writes `content-src/db-performance-at-scale/src/<key>.en.md` and copies each
 * chapter's figures to `static/images/db-performance-at-scale/`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(root, 'content-src', 'db-performance-at-scale');
const epubPath = path.join(sourceDirectory, 'database-performance-at-scale.epub');
const unpacked = path.join(sourceDirectory, 'epub', 'OEBPS');
const sliceDirectory = path.join(sourceDirectory, 'src');
const imagesDirectory = path.join(root, 'static', 'images', 'db-performance-at-scale');

/** Chapter files in reading order, keyed the way the book's structure is. */
const CHAPTERS = [
  {
    key: 'introduction',
    file: '541783_1_En_BookFrontmatter_OnlinePDF.xhtml',
    label: 'Introduction',
    title: 'Introduction',
    keep: { start: /^## Why Read\/Write a Book on Database Performance\?$/, stop: /^Acknowledgments$/ }
  },
  ...Array.from({ length: 11 }, (_, index) => ({
    key: `ch${String(index + 1).padStart(2, '0')}`,
    file: `541783_1_En_${index + 1}_Chapter.xhtml`,
    label: `Chapter ${index + 1}`
  })),
  {
    key: 'appendix-a',
    file: '541783_1_En_BookBackmatter_OnlinePDF.xhtml',
    label: 'Appendix A',
    title: 'Appendix A: A Brief Look at Fundamental Database Design Decisions',
    keep: { stop: /^Index$/ }
  }
];

/** Classes carrying prose we publish, mapped to the markdown block they become. */
const SKIP_CLASSES = new Set([
  'ChapterContextInformation', 'AuthorGroup', 'Affiliation', 'Copyright', 'Advertising',
  'FootnoteSection', 'TableWrap', 'ClearBoth', 'TocLine'
]);

const squash = (value) => value.replace(/[ \t\u00a0]+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();

/** Inline markdown for the children of `node`, keeping emphasis, code and links. */
const inline = (node) => {
  let output = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      output += child.rawText;
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = (child.tagName ?? '').toLowerCase();
    const className = child.getAttribute('class') ?? '';
    const text = squash(inline(child));
    if (!text && !['br', 'img'].includes(tag)) continue;
    if (tag === 'br') output += '\n';
    else if (tag === 'em' || tag === 'i') output += text ? `*${text}*` : '';
    else if (tag === 'strong' || tag === 'b') output += text ? `**${text}**` : '';
    else if (tag === 'code' || /EmphasisFontCategoryNonProportional/.test(className)) output += text ? `\`${text}\`` : '';
    else if (tag === 'sup') output += text ? `^${text}` : '';
    else if (tag === 'sub') output += text ? `~${text}` : '';
    else if (tag === 'a') {
      const href = child.getAttribute('href') ?? '';
      if (/^#(Fn|Tab|Fig)/.test(href) || /^#/.test(href) && !href.includes('/')) output += text;
      else if (/^https?:/.test(href)) output += text ? `[${text}](${href})` : '';
      else output += text;
    } else output += text;
  }
  return output;
};

/** The markdown table a Springer table file carries. */
const table = (file) => {
  const html = parse(fs.readFileSync(path.join(unpacked, 'html', file), 'utf8'));
  const captionNode = html.querySelector('.Caption');
  const caption = captionNode ? squash(inline(captionNode)).replace(/\s+/g, ' ').trim() : '';
  const rows = html.querySelectorAll('tr').map((row) =>
    row.querySelectorAll('th,td').map((cell) => squash(inline(cell)).replace(/\s+/g, ' ').replace(/\|/g, '\\|'))
  );
  if (!rows.length) return '';
  const width = Math.max(...rows.map((row) => row.length));
  const pad = (row) => [...row, ...Array(width - row.length).fill('')];
  const [head, ...body] = rows;
  const lines = [
    `| ${pad(head).join(' | ')} |`,
    `| ${Array(width).fill('---').join(' | ')} |`,
    ...body.map((row) => `| ${pad(row).join(' | ')} |`)
  ];
  return `${caption ? `**${caption}**\n\n` : ''}${lines.join('\n')}`;
};

/** Walk a chapter body and emit markdown blocks in reading order. */
const convert = (container, key, state) => {
  const blocks = [];
  const push = (block) => {
    const trimmed = block.replace(/\n{3,}/g, '\n\n').trim();
    if (trimmed) blocks.push(trimmed);
  };

  const walk = (node) => {
    let buffer = '';
    const flush = () => {
      if (buffer.trim()) push(squash(buffer));
      buffer = '';
    };

    for (const child of node.childNodes) {
      if (child.nodeType === 3) {
        buffer += child.rawText;
        continue;
      }
      if (child.nodeType !== 1) continue;
      const tag = (child.tagName ?? '').toLowerCase();
      const className = child.getAttribute('class') ?? '';
      const classes = className.split(/\s+/).filter(Boolean);

      if (classes.some((name) => SKIP_CLASSES.has(name))) continue;

      if (/^h[2-4]$/.test(tag)) {
        flush();
        const text = squash(inline(child));
        if (text) push(`${'#'.repeat(Number(tag[1]))} ${text}`);
        continue;
      }

      if (tag === 'figure') {
        flush();
        const image = child.querySelector('img');
        const caption = child.querySelector('.Caption');
        const number = squash(caption?.querySelector('.CaptionNumber')?.text ?? '');
        const description = squash(caption?.querySelector('.SimplePara')?.text ?? '');
        const alt = squash(child.querySelector('.TextObject')?.text ?? '') || description;
        if (image) {
          const file = image.getAttribute('src') ?? '';
          state.figures.push({ file, number, description });
          const target = `fig-${key}-${state.figures.length}${path.extname(file) || '.jpg'}`;
          state.copies.push({ file, target });
          const label = [number, description].filter(Boolean).join('. ');
          push(`![${alt.replace(/[[\]]/g, '')}](/images/db-performance-at-scale/${target})\n\n**${label}**`);
        }
        continue;
      }

      if (classes.includes('ProgramCode') || classes.includes('ProgramCodeBlock')) {
        flush();
        const lines = child.querySelectorAll('.FixedLine').map((line) => line.text);
        if (lines.length) push(['```text', ...lines, '```'].join('\n'));
        continue;
      }

      if (tag === 'sup') {
        const note = squash(inline(child));
        if (note) buffer += `^${note}`;
        continue;
      }

      if (tag === 'ul' || tag === 'ol') {
        flush();
        const items = child.querySelectorAll('li').map((item) => squash(inline(item)));
        push(items.map((item, index) => `${tag === 'ol' ? `${index + 1}.` : '-'} ${item}`).join('\n'));
        continue;
      }


      if (tag === 'h1') continue;

      if (tag === 'p' || classes.includes('Para') || classes.includes('SimplePara')) {
        walk(child);
        continue;
      }

      if (tag === 'div' || tag === 'section' || tag === 'aside') {
        if (classes.includes('ProgramCode')) {
          flush();
          const lines = child.querySelectorAll('.FixedLine').map((line) => line.text);
          if (lines.length) push(['```text', ...lines, '```'].join('\n'));
          continue;
        }
        if (classes.includes('TableWrap') || classes.includes('ExternalTable')) {
          flush();
          const link = child.querySelector('a[href*="Table_"]');
          const file = link?.getAttribute('href')?.split('/').pop();
          if (file) push(table(file));
          continue;
        }
        if (child.querySelector('ul, ol, figure, table, .ProgramCode, h2, h3, h4, p')) flush();
        walk(child);
        continue;
      }

      buffer += inline(child);
    }
    flush();
  };

  walk(container);
  return blocks;
};

/** Footnotes are collected where Springer lists them: the chapter's own section. */
const footnotes = (html) => {
  const aside = html.querySelector('.FootnoteSection');
  if (!aside) return [];
  return aside.querySelectorAll('.Footnote').map((note, index) => {
    const number = squash(note.querySelector('.FootnoteNumber')?.text ?? String(index + 1));
    const content = note.querySelector('.FootnoteContent');
    return { number, text: content ? squash(inline(content)) : '' };
  });
};

/** The chapter's own title and authors, without the "N. " the publisher prefixes. */
const head = (html) => {
  const title = squash(html.querySelector('.ChapterTitle')?.text ?? '');
  const group = html.querySelector('.AuthorGroup');
  const authors = (group ?? html).querySelectorAll('.AuthorName').map((name) => squash(name.text));
  return { title: title.replace(/^\d+\.\s*/, ''), authors };
};

const main = () => {
  fs.mkdirSync(sliceDirectory, { recursive: true });
  fs.mkdirSync(imagesDirectory, { recursive: true });
  if (!fs.existsSync(unpacked)) {
    fs.rmSync(unpacked, { recursive: true, force: true });
    fs.mkdirSync(unpacked, { recursive: true });
    execFileSync('unzip', ['-q', epubPath, '-d', unpacked]);
  }

  for (const chapter of CHAPTERS) {
    const html = parse(fs.readFileSync(path.join(unpacked, 'html', chapter.file), 'utf8'));
    const container = html.querySelector('[role="doc-chapter"]') ?? html.querySelector('body');
    const meta = head(html);
    const state = { figures: [], copies: [] };
    let blocks = convert(container, chapter.key, state);
    if (chapter.keep) {
      const start = chapter.keep.start ? blocks.findIndex((block) => chapter.keep.start.test(block)) : 0;
      const stop = chapter.keep.stop ? blocks.findIndex((block) => chapter.keep.stop.test(block)) : blocks.length;
      blocks = blocks.slice(start === -1 ? 0 : start, stop === -1 ? blocks.length : stop);
    }

    for (const note of footnotes(html)) {
      if (note.text && !blocks.includes(note.text)) blocks.push(`[^${note.number}]: ${note.text}`);
    }

    for (const copy of state.copies) {
      const from = path.join(unpacked, 'images', copy.file.replace(/^\.\.\/images\//, ''));
      const source = from;
      if (!fs.existsSync(source)) continue;
      fs.copyFileSync(source, path.join(imagesDirectory, copy.target));
    }

    const title = chapter.title ?? meta.title;
    const authors = chapter.key === 'appendix-a' ? [] : [...new Set(meta.authors)];
    const frontmatter = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `chapter: ${JSON.stringify(chapter.label)}`,
      `authors: ${JSON.stringify(authors.join(', '))}`,
      '---',
      ''
    ].join('\n');

    fs.writeFileSync(path.join(sliceDirectory, `${chapter.key}.en.md`), `${frontmatter}${blocks.join('\n\n')}\n`);
    console.log(`${chapter.key}: ${blocks.length} blocks, ${state.figures.length} figures`);
  }
};

main();
