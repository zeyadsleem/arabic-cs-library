#!/usr/bin/env node
/**
 * Restore the heading anchors the HTML-to-markdown conversion dropped.
 *
 * Upstream sources put identities on their headings (`<h3 id="error-structure">`)
 * and the prose links to them, but the per-section English markdown that the
 * translations were made from kept only the heading text. Every "see
 * Section X" link in the book therefore points at an anchor that exists
 * nowhere in the site.
 *
 * Both halves of the alignment are checked rather than assumed: a section is
 * rewritten only when its translated headings and its English source headings
 * have the same count and the same level sequence, and an id is attached only
 * when the English text maps to an id in the upstream HTML that something in
 * the book actually links to.
 *
 * Usage: node scripts/recover-heading-anchors.mjs [--write] [--log] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const write = args.includes('--write');
const log = args.includes('--log');
const requested = args.filter((arg) => !arg.startsWith('--'));

const headingPattern = () => /^(#{1,6}[ \t]+)(.*?)(\n?)$/;
const attributeBlock = () => /\{[#.][^}\n]*\}/;

/**
 * Headings outside fenced code, indented code and inline code spans, each with
 * the offset of its text so a rewrite never has to search for it by content.
 *
 * Python samples inside these books are full of `# comment` lines, and reading
 * them as ATX headings shifts every later heading by one.
 *
 * @param {string} markdown @returns {{text: string, level: number, at: number, end: number}[]}
 */
function collectHeadings(markdown) {
  const headings = [];
  let fence = null;
  let at = 0;
  for (const line of markdown.split('\n')) {
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    const indented = /^(?: {4}|\t)/.test(line);
    const match = !open && !fence && !indented ? line.match(headingPattern()) : null;
    if (match) {
      headings.push({
        text: match[2]
          .replace(attributeBlock(), '')
          .replace(/`[^`]*`/g, '')
          .trim(),
        level: match[1].length - 1,
        at: at + match[1].length,
        end: at + match[1].length + match[2].length,
      });
    }
    if (open) {
      if (!fence) fence = open[1][0];
      else if (open[1][0] === fence && !line.trim().replace(/[`~]/g, '')) fence = null;
    }
    at += line.length + 1;
  }
  return headings;
}

/**
 * Collects every id that addresses a heading.
 *
 * Sites that rename their anchors leave the old ones behind as empty
 * `<p><a id="error-extra-info"></a></p>` placeholders in front of the new
 * heading, and go-style has 218 of them. The prose keeps linking to the old
 * ids, so all of them have to travel with the heading they now sit in front of.
 *
 * @param {string} book @returns {Map<string, string[]>} heading text to the ids that address it
 */
function htmlHeadingIds(book) {
  const dir = path.join(root, 'content-src', book);
  const ids = new Map();
  if (!fs.existsSync(dir)) return ids;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const document = parse(fs.readFileSync(path.join(dir, entry.name), 'utf8'), { lowerCaseTagName: false });
    let placeholders = [];
    for (const element of document.querySelectorAll('*')) {
      const tag = element.tagName.toUpperCase();
      const id = element.getAttribute('id');
      if (/^H[1-6]$/.test(tag)) {
        const text = element.text.trim();
        if (text) ids.set(text, [...(ids.get(text) ?? []), ...placeholders, id].filter(Boolean));
        placeholders = [];
        continue;
      }
      if (tag === 'A' && id && !element.text.trim()) placeholders.push(id);
      else placeholders = [];
    }
  }
  return ids;
}

/** @param {string} dir @returns {Map<string, number>} how often each `](#id)` target appears in a book */
function linkCounts(dir) {
  const counts = new Map();
  if (!fs.existsSync(dir)) return counts;
  const pattern = () => /\]\(#([^)\s]+)\)/g;
  for (const section of fs.readdirSync(dir).filter((name) => name.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(dir, section), 'utf8');
    for (const [, id] of text.matchAll(pattern())) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}

/** @param {string} book @param {string} section @returns {string | null} the English source that produced this section */
function sourceFor(book, section) {
  const dir = path.join(root, 'content-src', book);
  const stem = section.replace(/--index\.md$/, '');
  for (const candidate of [`${stem}.md`, section]) {
    if (fs.existsSync(path.join(dir, candidate))) return candidate;
  }
  return null;
}

const books = requested.length
  ? requested
  : fs.readdirSync(path.join(root, 'content'))
    .filter((name) => name.endsWith('-structure.json'))
    .map((name) => name.replace(/-structure\.json$/, ''));

const report = [];
for (const book of books) {
  const ids = htmlHeadingIds(book);
  const dir = path.join(root, 'content', book);
  if (!ids.size || !fs.existsSync(dir)) continue;
  const linked = linkCounts(dir);

  const counts = { aligned: 0, skipped: 0, added: 0, noId: 0, unreferenced: 0, kept: 0 };

  for (const section of fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const source = sourceFor(book, section);
    if (!source) { counts.skipped += 1; continue; }

    const english = collectHeadings(fs.readFileSync(path.join(root, 'content-src', book, source), 'utf8'));
    const file = path.join(dir, section);
    const translated = fs.readFileSync(file, 'utf8');
    const arabic = collectHeadings(translated);

    if (
      english.length !== arabic.length
      || english.some((heading, index) => heading.level !== arabic[index].level)
    ) {
      counts.skipped += 1;
      continue;
    }
    counts.aligned += 1;

    // Applied back to front so every recorded offset stays valid.
    const insertions = [];
    for (const [index, heading] of arabic.entries()) {
      const candidates = [...new Set(ids.get(english[index].text) ?? [])];
      if (!candidates.length) { counts.noId += 1; continue; }
      if (attributeBlock().test(translated.slice(heading.at, heading.end))) { counts.kept += 1; continue; }

      // A heading can only carry one id, and build-content.mjs then stops
      // giving it the Arabic slug. So an id is only worth restoring when
      // something actually links to it; otherwise the slug already in place
      // is the better anchor to keep.
      const [wanted] = candidates
        .slice()
        .sort((a, b) => (linked.get(b) ?? 0) - (linked.get(a) ?? 0))
        .filter((candidate) => (linked.get(candidate) ?? 0) > 0);
      if (!wanted) { counts.unreferenced += 1; continue; }
      counts.added += 1;

      insertions.push({ at: heading.end, text: ` {#${wanted}}` });
      if (log) {
        const line = translated.slice(0, heading.at).split('\n').length;
        console.log(`${book}/${section}:${line}  "${english[index].text}" -> {#${wanted}}`);
      }
    }

    if (!write) continue;
    let rewritten = translated;
    for (const insertion of insertions.reverse()) {
      rewritten = rewritten.slice(0, insertion.at) + insertion.text + rewritten.slice(insertion.at);
    }
    if (rewritten !== translated) fs.writeFileSync(file, rewritten);
  }

  if (counts.aligned || counts.added) report.push({ book, ...counts });
}

for (const row of report) {
  console.log(
    `${row.book.padEnd(22)} aligned ${String(row.aligned).padStart(3)}  anchors ${String(row.added).padStart(4)}`
    + `  no-upstream-id ${String(row.noId).padStart(4)}  unreferenced ${String(row.unreferenced).padStart(4)}`
    + `  already-has-attr ${String(row.kept).padStart(3)}  unaligned ${row.skipped}`,
  );
}
console.log(`\ntotal anchors ${report.reduce((sum, row) => sum + row.added, 0)}${write ? '' : ' (dry run — pass --write to apply)'}`);