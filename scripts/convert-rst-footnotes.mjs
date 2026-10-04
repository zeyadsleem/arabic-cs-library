#!/usr/bin/env node
/**
 * Turn the reST auto-numbered footnotes the upstream conversion left raw into
 * real markdown-it footnotes.
 *
 * crypto-101 was imported from the book's reST sources through an
 * HTML-to-markdown conversion that copied the `.. [#]` markers and the `[#]_`
 * references verbatim. Both are meaningless to markdown-it, so every note
 * rendered as a paragraph starting with the literal text `.. [#]` and every
 * reference rendered as the literal text `[#]_`.
 *
 * reST pairs the Nth anonymous reference with the Nth anonymous definition and
 * matches `[#name]_` to `.. [#name]` exactly, so the notes are paired by
 * scanning the file once and giving each definition the nearest reference that
 * has not been claimed yet. Definitions no reference claims — the conversion
 * dropped those markers in the prose — keep their body as an ordinary
 * paragraph, which is where the reader already sees it, minus the marker.
 *
 * Every rewritten note is parsed back with markdown-it to confirm it produces
 * exactly one footnote definition.
 *
 * Usage: node scripts/convert-rst-footnotes.mjs [--write] [--log] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const write = args.includes('--write');
const log = args.includes('--log');
const requested = args.filter((arg) => !arg.startsWith('--'));

const probe = new MarkdownIt({ html: true, linkify: false, typographer: false }).use(markdownItFootnote);

/** `[#]_` or `[#name]_`, in document order. */
const referencePattern = () => /\[#\]_|\[#([A-Za-z0-9][A-Za-z0-9:._-]*)\]_/g;
/** `.. [#]` or `.. [#name]` on its own line. */
const definitionPattern = () => /^([ ]*)\.\. \[#([A-Za-z0-9][A-Za-z0-9:._-]*)?\][ \t]*$/;

/** @param {string} markdown @returns {{ lines: string[], fenced: boolean[] }} */
function readLines(markdown) {
  const lines = markdown.split('\n');
  const fenced = [];
  let fence = null;
  for (const line of lines) {
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (open) {
      if (!fence) fence = open[1][0];
      else if (open[1][0] === fence && !line.trim().replace(/[`~]/g, '')) fence = null;
      fenced.push(true);
      continue;
    }
    fenced.push(fence !== null);
  }
  return { lines, fenced };
}

/** @param {string} text @param {string} separator @returns {string[]} */
function splitOn(text, separator) {
  return text.split(separator).map((part) => part.trim()).filter(Boolean);
}

/**
 * @param {string} label @param {string} note @returns {void}
 */
function assertUsableNote(label, note) {
  const tokens = probe.parse(`[^${label}]\n\n${note}\n`, {});
  const opened = tokens.filter((token) => token.type === 'footnote_open').length;
  const images = tokens.filter((token) => token.type === 'image').length;
  const bare = tokens.filter((token) => token.type === 'link_open' && !token.attrGet('href')?.startsWith('http'));
  if (opened !== 1 || images || bare.length) {
    throw new Error(`note ${label} is not a usable footnote (openings ${opened}, images ${images}, bare links ${bare.length})`);
  }
}

/**
 * @param {string} label @param {string} body a definition body with its own indentation
 * @returns {string} the note as a markdown-it footnote definition
 */
function noteToMarkdown(label, body) {
  const [first, ...rest] = splitOn(body, /\n[ \t]*\n/);
  const lines = [`[^${label}]: ${first.replace(/\s+/g, ' ')}`];
  for (const paragraph of rest) lines.push('', `    ${paragraph.replace(/\n[ \t]*/g, ' ')}`);
  return lines.join('\n');
}


const report = [];

for (const book of requested) {
  const dir = path.join(root, 'content', book);
  if (!fs.existsSync(dir)) continue;
  const counts = { sections: 0, notes: 0, unclaimed: 0 };

  for (const entry of fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const file = path.join(dir, entry);
    const original = fs.readFileSync(file, 'utf8');
    const { lines, fenced } = readLines(original);
    const hasMarker = lines.some((line, index) => !fenced[index] && definitionPattern().test(line));
    if (!hasMarker) continue;

    // `pending` holds every reference seen so far, in document order, and each
    // definition claims the oldest one still unclaimed.
    const anonymous = [];
    const named = new Map();
    /** @type {string[][]} labels attached to the references of each line */
    const referenceLabels = lines.map(() => []);
    /** @type {{ start: number, end: number, replacement: string }[]} */
    const replacements = [];
    let assigned = 0;
    let skipped = 0;

    lines.forEach((line, index) => {
      if (fenced[index]) return;
      for (const [, name] of line.matchAll(referencePattern())) {
        if (name) named.set(name, [...(named.get(name) ?? []), referenceLabels[index]]);
        else anonymous.push(referenceLabels[index]);
        referenceLabels[index].push('');
      }

      const marker = line.match(definitionPattern());
      if (!marker) return;
      const [, indent, name] = marker;

      const raw = [];
      let cursor = index + 1;
      while (cursor < lines.length) {
        const next = lines[cursor];
        if (next.trim() && (next.match(/^ */) ?? [''])[0].length <= indent.length) break;
        raw.push(next);
        cursor += 1;
      }
      const prose = raw.filter((next) => next.trim());
      const common = Math.min(...prose.map((next) => (next.match(/^ */) ?? [''])[0].length));
      const nested = prose.some((next) => (next.match(/^ */) ?? [''])[0].length >= common + 4);
      if (nested) {
        skipped += 1;
        return;
      }
      const text = raw.map((next) => (next.trim() ? next.slice(common) : '')).join('\n').trim();

      const queue = name ? named.get(name) : anonymous;
      const target = queue?.[0];
      if (!target) {
        replacements.push({ start: index, end: cursor, replacement: text });
        return;
      }
      if (name) {
        const rest = queue.slice(1);
        if (rest.length) named.set(name, rest);
        else named.delete(name);
      } else anonymous.shift();
      const label = String((assigned += 1));
      target[0] = label;
      const note = noteToMarkdown(label, text);
      assertUsableNote(label, note);
      replacements.push({ start: index, end: cursor, replacement: note });
    });

    if (!replacements.length) continue;

    counts.sections += 1;
    counts.notes += referenceLabels.flat().filter(Boolean).length;
    counts.unclaimed += replacements.filter((edit) => !edit.replacement.startsWith('[^')).length;
    counts.skipped += skipped;

    if (write) {
      const out = [];
      let cursor = 0;
      const emit = (line) => { out.push(line); cursor += 1; };
      for (const edit of replacements) {
        while (cursor < edit.start) emit(rewriteLine(lines[cursor], referenceLabels[cursor]));
        if (out.length && out[out.length - 1] !== '') out.push('');
        out.push(edit.replacement);
        cursor = edit.end;
        // A paragraph written straight after a footnote definition is swallowed
        // by markdown-it, so the definition has to be closed off explicitly.
        if (edit.replacement.startsWith('[^') && (lines[cursor] ?? '').trim()) out.push('');
      }
      while (cursor < lines.length) emit(rewriteLine(lines[cursor], referenceLabels[cursor]));
      const body = out.join('\n').replace(/\n{3,}/g, '\n\n');
      if (body !== original) fs.writeFileSync(file, body);
    }

    if (log) {
      console.log(`  ${book}/${entry}: ${referenceLabels.flat().filter(Boolean).length} notes`);
    }
  }

  if (counts.sections) report.push({ book, ...counts });
}

/**
 * @param {string} line @param {string[]} labels one label per reference in the line
 * @returns {string}
 */
function rewriteLine(line, labels) {
  if (!labels.length) return line;
  let index = 0;
  return line.replace(referencePattern(), (whole) => (labels[index++] ? `[^${labels[index - 1]}]` : whole));
}

for (const row of report) {
  console.log(
    `${row.book.padEnd(22)} sections ${String(row.sections).padStart(3)}  notes ${String(row.notes).padStart(3)}`
    + `  unclaimed ${String(row.unclaimed).padStart(3)}`,
  );
}
