#!/usr/bin/env node
/**
 * Render the formula images the latex2html import left behind as real math.
 *
 * open-data-structures was imported by converting the output of `latex2html`, which
 * rasterises every equation into a PNG and puts the TeX source in the `alt`
 * attribute. The HTML to markdown conversion turned each of those into
 * `![$\displaystyle …$](/images/…png.webp)`, so the whole book shows its formulas as
 * pictures: not selectable, not searchable, and announced to a screen reader as raw
 * TeX. Where latex2html had to split one equation across several pictures the
 * conversion nested them, so `![$a$](a.png) ![$b$](b.png)` arrived as a single image
 * whose alt contains another image.
 *
 * This script puts the TeX back where it belongs. Formula images that span a whole
 * line are joined back into the display equation they were one equation before; a
 * formula inside a sentence becomes `$ … $`. Every candidate goes through the very
 * same KaTeX pipeline the site builds with — `installContentMath` plus the shared
 * macro table — and anything that does not render there, including the equations
 * latex2html truncated with a literal `...`, is left exactly as it was, so no formula
 * is ever lost.
 *
 * Usage: node scripts/render-formula-images.mjs [--write] [--log] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import { installContentMath } from './lib/content-math.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const args = process.argv.slice(2);
const write = args.includes('--write');
const log = args.includes('--log');

const failures = [];
const renderer = new MarkdownIt({ html: true, linkify: false, typographer: false });
installContentMath(renderer, { onError: (_tex, error) => failures.push(error.message) });

/** Environments whose column specification may carry LaTeX's `@{ … }` padding, which KaTeX rejects. */
const COLUMN_ENVIRONMENTS = new Set(['array', 'cases', 'tabular', 'matrix', 'pmatrix', 'bmatrix', 'Bmatrix']);

/**
 * Drop the `@{ … }` inter-column padding from a column specification.
 * @param {string} text
 * @returns {string}
 */
function stripColumnPadding(text) {
  let output = '';
  let index = 0;
  while (index < text.length) {
    const begin = text.indexOf('\\begin{', index);
    if (begin < 0) break;
    const open = text.indexOf('{', begin + '\\begin{'.length);
    if (open < 0) break;
    const name = text.slice(begin + '\\begin{'.length, open);
    output += text.slice(index, open + 1);
    if (!COLUMN_ENVIRONMENTS.has(name)) { index = open + 1; continue; }
    let cursor = open + 1;
    let spec = '';
    let depth = 0;
    while (cursor < text.length) {
      const character = text[cursor];
      if (character === '{') { depth += 1; if (depth === 1) { cursor += 1; continue; } }
      else if (character === '}') { depth -= 1; if (depth === 0) break; }
      spec += character;
      cursor += 1;
    }
    output += spec.replace(/@\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '');
    index = cursor;
  }
  return output + text.slice(index);
}

/**
 * @param {string} alt the `alt` text of a formula image
 * @returns {string} the TeX it carries, stripped of its `$ … $` wrapper
 */
const toExpression = (alt) => stripColumnPadding(alt.slice(1, -1)).trim();

/**
 * A dollar that latex2html escaped is part of the TeX; one that it did not closes a
 * math span, so it cannot be used as a delimiter here.
 * @param {string} expression
 * @returns {boolean}
 */
const hasStrayDollar = (expression) => /(^|[^\\])\$/.test(expression);

/**
 * Wrap TeX in delimiters that cannot collide with the expression itself, and confirm
 * the site renderer turns it into exactly one formula. `$ … $` closes at the first
 * unescaped dollar inside the expression — latex2html puts those inside `\mbox` — so
 * such an equation is only ever offered as a block, or as `\( … \)` inline.
 * @param {string} expression
 * @param {boolean} display
 * @returns {boolean}
 */
function renders(expression, display) {
  if (!expression || /[\n\r]/.test(expression)) return false;
  const stray = hasStrayDollar(expression);
  let source = null;
  if (display) source = stray ? `\\[${expression}\\]` : `$$\n${expression}\n$$`;
  else if (!stray) source = `$${expression}$`;
  else if (!expression.includes('\\)')) source = `\\( ${expression} \\)`;
  if (source === null) return false;
  failures.length = 0;
  const html = renderer.render(source);
  return failures.length === 0 && (html.match(/class="katex"/g) ?? []).length === 1;
}

/**
 * Read every markdown image on a line, honouring nested brackets and parentheses so
 * that `![a ![b](c)](d)` is seen as one image with `![b](c)` inside its alt.
 * @param {string} line
 * @returns {Array<{start: number, end: number, alt: string, target: string}>}
 */
function readImages(line) {
  const images = [];
  let index = 0;
  while (index < line.length) {
    const open = line.indexOf('![', index);
    if (open < 0) break;
    let cursor = open + 1;
    let depth = 0;
    let closed = -1;
    while (cursor < line.length) {
      if (line[cursor] === '[') depth += 1;
      else if (line[cursor] === ']' && --depth === 0) { closed = cursor; break; }
      cursor += 1;
    }
    if (closed < 0 || line[closed + 1] !== '(') { index = open + 2; continue; }
    let end = closed + 2;
    let parens = 1;
    while (end < line.length) {
      if (line[end] === '(') parens += 1;
      else if (line[end] === ')' && --parens === 0) break;
      end += 1;
    }
    if (end >= line.length) { index = open + 2; continue; }
    images.push({ start: open, end: end + 1, alt: line.slice(open + 2, closed), target: line.slice(closed + 2, end) });
    index = end + 1;
  }
  return images;
}

/** @param {string} alt @param {string} [failure] @returns {string} */
const reasonFor = (alt, failure) => (alt.includes('...')
  ? 'latex2html truncated this equation'
  : (failure ?? 'the renderer rejected it'));

/** @param {string} alt @returns {boolean} */
const carriesMath = (alt) => alt.startsWith('$') && alt.endsWith('$') && alt.length > 2;

/**
 * @param {string} source a content markdown file
 * @returns {{rendered: number, kept: Array<{line: number, reason: string}>, output: string}}
 */
function plan(source) {
  const lines = source.split('\n');
  const fenced = new Array(lines.length).fill(false);
  let fence = null;
  lines.forEach((line, index) => {
    const match = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      fenced[index] = true;
      if (match && match[1][0] === fence[0] && match[1].length >= fence.length && !match[2].trim()) fence = null;
    } else if (match) { fenced[index] = true; fence = match[1]; }
  });

  const output = [];
  const kept = [];
  let rendered = 0;

  for (const [index, line] of lines.entries()) {
    if (fenced[index] || !line.includes('![')) { output.push(line); continue; }
    const images = readImages(line);
    const formulas = images.filter((image) => carriesMath(image.alt));
    if (!formulas.length) { output.push(line); continue; }

    const bare = line
      .split('')
      .filter((_, at) => !formulas.some((image) => at >= image.start && at < image.end))
      .join('')
      .trim() === '';

    if (bare) {
      const whole = formulas.map((image) => toExpression(image.alt));
      const joined = [whole.join(''), whole.join(' ')]
        .map((merged) => stripColumnPadding(merged).trim())
        .find((merged) => renders(merged, true));
      if (joined !== undefined) {
        output.push(`$$\n${joined}\n$$`);
        rendered += formulas.length;
        continue;
      }
      output.push(whole.map((part, at) => {
        const image = formulas[at];
        failures.length = 0;
        if (!renders(part, true)) {
          kept.push({ line: index + 1, reason: reasonFor(image.alt, failures[0]) });
          return `![${image.alt}](${image.target})`;
        }
        rendered += 1;
        return `$$\n${part}\n$$`;
      }).join('\n\n'));
      continue;
    }

    let rebuilt = '';
    let cursor = 0;
    for (const image of formulas) {
      const expression = toExpression(image.alt);
      failures.length = 0;
      if (!renders(expression, false)) {
        kept.push({ line: index + 1, reason: reasonFor(image.alt, failures[0]) });
        continue;
      }
      rebuilt += line.slice(cursor, image.start) + `$${expression}$`;
      cursor = image.end;
      rendered += 1;
    }
    output.push(cursor ? rebuilt + line.slice(cursor) : line);
  }

  return { rendered, kept, output: output.join('\n') };
}

const requested = args.filter((arg) => !arg.startsWith('--'));
const books = (requested.length
  ? requested
  : fs.readdirSync(contentDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
).sort();

const report = [];
for (const book of books) {
  const dir = path.join(contentDir, book);
  if (!fs.existsSync(dir)) continue;
  const counts = { sections: 0, rendered: 0, kept: [] };

  for (const entry of fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const file = path.join(dir, entry);
    const original = fs.readFileSync(file, 'utf8');
    if (!original.includes('![')) continue;
    const result = plan(original);
    if (!result.rendered && !result.kept.length) continue;
    counts.sections += 1;
    counts.rendered += result.rendered;
    for (const note of result.kept) counts.kept.push(`${entry}:${note.line} ${note.reason}`);

    if (write && result.output !== original) fs.writeFileSync(file, result.output);
    if (log) console.log(`  ${book}/${entry}: ${result.rendered} rendered, ${result.kept.length} kept as an image`);
  }

  if (counts.sections) report.push({ book, ...counts });
}

for (const row of report) {
  console.log(
    `${row.book.padEnd(22)} sections ${String(row.sections).padStart(3)}  formulas ${String(row.rendered).padStart(4)}`
    + (row.kept.length ? `  kept as an image ${row.kept.length}` : ''),
  );
  for (const note of row.kept) console.log(`    ! ${note}`);
}

if (!report.length) console.log('No formula images to render.');