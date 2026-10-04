#!/usr/bin/env node
/**
 * Turn the LaTeX the HTML conversions left in code fences into real math.
 *
 * crypto-101 and open-data-structures were imported by converting rendered HTML
 * to markdown, and that conversion emitted every display formula as an unlabelled
 * fenced code block holding raw LaTeX. Readers see `\begin{aligned} …` as
 * preformatted text instead of a rendered equation, and the content audit cannot
 * report the breakage either, because a fence is never parsed as math.
 *
 * This script promotes a fence to a `$$ … $$` display block when the fence is
 * unlabelled, its body reads as LaTeX, and the body renders through the very same
 * KaTeX pipeline the site builds with — `installContentMath` plus the shared macro
 * table. Anything that fails those three tests is left exactly as it was, so a
 * formula the renderer cannot handle stays visible as source rather than turning
 * into an error box, and a genuine code sample that happens to contain a backslash
 * is never rewritten.
 *
 * Usage: node scripts/convert-latex-fences.mjs [--write] [--log] [book ...]
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

/** Tokens that look like TeX rather than like a program. */
const LATEX_SIGNALS = [
  /\\begin\{(equation|aligned|align|matrix|pmatrix|bmatrix|cases|array|tabular|gathered|split)\b/,
  /\\\[|\\\]|\\frac\b|\\sqrt\b|\\sum\b|\\prod\b|\\mathbb\b|\\mathbf\b|\\operatorname\b/,
  /\\(?:cdot|times|leq|geq|neq|approx|equiv|infty|partial|mathcal|mathrm|mathtt|texttt|text|overline|underline|widehat)\b/,
  /\\(?:bmod|pmod)\b/,
];

/** @param {string} value */
const looksLikeLatex = (value) => LATEX_SIGNALS.some((signal) => signal.test(value));

const scanner = new MarkdownIt({ html: true, linkify: false, typographer: false });
const renderer = new MarkdownIt({ html: true, linkify: false, typographer: false });
const failures = [];
installContentMath(renderer, { onError: (_tex, error) => failures.push(error.message) });

/**
 * @param {string} body raw LaTeX
 * @returns {boolean} whether the site renderer turns it into a display equation
 */
function renders(body) {
  failures.length = 0;
  const html = renderer.render(`$$\n${body.trim()}\n$$`);
  return failures.length === 0 && html.includes('katex-display');
}

/**
 * @param {string} source a content markdown file
 * @returns {{converted: number, skipped: Array<{line: number, reason: string}>, output: string}}
 */
function plan(source) {
  const lines = source.split('\n');
  const open = new Map();
  const close = new Map();
  const skipped = [];
  let converted = 0;

  for (const token of scanner.parse(source, {})) {
    if (token.type !== 'fence' || token.info.trim() !== '') continue;
    const [first] = token.map;
    const last = token.map[1] - 1;
    if (!looksLikeLatex(token.content)) continue;
    if (lines[first].trim() !== '```' || lines[last]?.trim() !== '```') {
      skipped.push({ line: first + 1, reason: 'the fence is not a plain unindented triple backtick' });
      continue;
    }
    if (!renders(token.content)) {
      skipped.push({ line: first + 1, reason: failures[0] ?? 'the renderer did not produce a display equation' });
      continue;
    }
    open.set(first, true);
    close.set(last, true);
    converted += 1;
  }

  const output = lines
    .map((line, index) => (open.has(index) || close.has(index) ? '$$' : line))
    .join('\n');

  for (const token of scanner.parse(source, {})) {
    if (token.type !== 'fence' || token.info.trim() !== '') continue;
    if (!open.has(token.map[0])) continue;
    const body = lines.slice(token.map[0] + 1, token.map[1] - 1).join('\n');
    if (!output.includes(body)) throw new Error(`the formula on line ${token.map[0] + 1} did not survive`);
  }

  return { converted, skipped, output };
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
  const counts = { sections: 0, converted: 0, skipped: [] };

  for (const entry of fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const file = path.join(dir, entry);
    const original = fs.readFileSync(file, 'utf8');
    const result = plan(original);
    if (!result.converted && !result.skipped.length) continue;
    counts.sections += 1;
    counts.converted += result.converted;
    for (const note of result.skipped) counts.skipped.push(`${entry}:${note.line} ${note.reason}`);

    if (write && result.output !== original) fs.writeFileSync(file, result.output);
    if (log) console.log(`  ${book}/${entry}: ${result.converted} formulas, ${result.skipped.length} kept as source`);
  }

  if (counts.sections) report.push({ book, ...counts });
}

for (const row of report) {
  console.log(
    `${row.book.padEnd(22)} sections ${String(row.sections).padStart(3)}  formulas ${String(row.converted).padStart(4)}`
    + (row.skipped.length ? `  kept as source ${row.skipped.length}` : ''),
  );
  for (const note of row.skipped) console.log(`    ! ${note}`);
}

if (!report.length) console.log('No LaTeX code fences to convert.');