#!/usr/bin/env node
/**
 * Strip the machinery the PreTeXt HTML export leaves behind in the Arabic
 * discrete-math pages.
 *
 * Runningstone publishes dmoi4 as HTML plus a flattened markdown rendering of
 * the same pages. The markdown drops every block boundary but keeps the
 * permalink anchors that PreTeXt appends to each block, so what reaches
 * `content/discrete-math/` is one enormous line per section, peppered with
 * `[🔗](#id)` links that exist only to power the "copy permalink" button on the
 * upstream site.
 *
 * Each anchor sits at the end of the block it names, which is exactly the
 * information the conversion threw away — so replacing an anchor with a blank
 * line puts the paragraph structure back. A table cell has no such boundary,
 * and the anchors inside one are dropped instead.
 *
 * The same export also drags page furniture into the body: the print-settings
 * line PreTeXt writes on every page, the previous/up/next toolbar, the
 * Cloudflare-obfuscated feedback address, and an inlined Google Analytics
 * snippet. None of it is book content.
 *
 * Usage: node scripts/fix-discrete-math-import.mjs [--check]
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const directory = path.join(root, 'content', 'discrete-math');

const PAGE_FURNITURE = [
  // PreTeXt writes its print state onto every exported page.
  [/^\\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print\n+/gm],
  // The previous / up / next toolbar, in either icon order, and the PreTeXt,
  // Runstone and MathJax badges of the page footer. Only furniture carries
  // these material-symbols glyphs; no translated paragraph ever does.
  [/^[^\n]*&#xe5(?:cb|cc|ce);[^\n]*\n?/gm],
  // Cloudflare rewrote the feedback address into a token the site cannot resolve.
  [/ ?\[[^\]]*\]\(\/cdn-cgi\/l\/email-protection#[0-9a-f]+\)/g],
  // The analytics bootstrap, inlined at the end of the body.
  [/ ?window\.dataLayer = window\.dataLayer \|\| \[\]; function gtag\(\)\{dataLayer\.push\(arguments\);\} gtag\('js', new Date\(\)\); gtag\('config', 'UA-[0-9-]+'\);?/g],
  // The "powered by PreTeXt / Runstone / MathJax" logo strip that closes every
  // page. `content/library.json` already credits the author, the source and
  // the licence, so the strip is decoration.
  [/^\[(?:شعار PreTeXt|PreTeXt logo)\]\(https:\/\/pretextbook\.org\)\[!\[[^\]]*\]\(\/images\/discrete-math\/[^)]*\)\]\(https:\/\/run(?:estone|stone)\.academy\)\[!\[[^\]]*\]\(\/images\/discrete-math\/[^)]*\)\]\(https:\/\/www\.mathjax\.org\)[ \t]*\n?/gm],
  // The WeBWorK "Activate" button opens the interactive version of a problem,
  // which this library does not ship. Upstream it is a `<button>` sitting in
  // its own block, so it reaches the page as a line of its own or as a prefix
  // glued to the problem statement.
  [/^Activate[ \t]*(?=\S)?\n?/gm],
  // `#paired` is the PreTeXt tag that lets two problems be answered as one.
  [/[ \t]*#paired\b/g],
  // `#distractor` marks the wrong choices of a WeBWorK multiple-choice proof.
  // The library has no interactive answer engine, so the tag only marks the
  // decoys for whoever reorders the statements by hand.
  [/[ \t]*#distractor\b/g],
  // The worksheet heading carries a "print this worksheet" link that points at
  // a query string of the upstream site and resolves to nothing here.
  [/\[&#xe8ad;\]\(\?printpreview=[^)]*\)/g],
];

// PreTeXt paragraph verbs. `\O` opens a proof, `\Q` closes one, `\This` and
// `\Does` open an exercise, and `\N` numbers a list item — in the flattened
// markdown they are typed as literal words, and the closing bracket lands on
// the next line, so the opening one is what is left to remove.
const PROOF_VERBS = /^\\(?:O|Q|This|Does)(?=\S)/gm;
// `\N` only reaches the page as the item marker of the first list entry.
const LIST_MARKER = /^\\(\d+)\. /gm;
// An escaped asterisk in front of an emphasis run.
const ESCAPED_STAR = /^\\\*/gm;
// An anchor the converter escaped, `\[🔗](#id)`, leaves its opening backslash
// behind once the anchor itself is gone. On its own it is a stray escape.
const LONE_ESCAPE = /^[\\]+[ \t]*$/gm;

/** Drops a lone anchor, or the runs of anchors a stripped block leaves behind. */
const ANCHOR = /\[(?:🔗|رابط)\]\(#[^)]*\)/g;
const HAS_ANCHOR = /\[(?:🔗|رابط)\]\(#[^)]*\)/;

const isTableRow = (line) => /^\s*\|/.test(line);

/**
 * Puts the block boundaries back: every anchor closes the block it names, so
 * an anchor outside a table row becomes a paragraph break and an anchor inside
 * a cell is simply dropped.
 * @param {string} text
 */
function splitBlocks(text) {
  return text
    .split('\n')
    .map((line) => {
      if (!HAS_ANCHOR.test(line)) return line;
      if (isTableRow(line)) return line.replace(ANCHOR, '');
      return line
        .split(ANCHOR)
        .map((part) => part.trim())
        .filter(Boolean)
        .join('\n\n');
    })
    .join('\n');
}

/** @param {string} text */
function tidy(text) {
  return `${text
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`;
}

const report = [];
for (const entry of fs.readdirSync(directory).filter((name) => name.endsWith('.md')).sort()) {
  const file = path.join(directory, entry);
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [pattern] of PAGE_FURNITURE) after = after.replace(pattern, '');
  after = after.replace(PROOF_VERBS, '').replace(LIST_MARKER, '$1. ').replace(ESCAPED_STAR, '*');
  const stripped = tidy(splitBlocks(after).replace(LONE_ESCAPE, ''));
  const removed = (before.match(ANCHOR)?.length ?? 0) + (before.match(/window\.dataLayer/g)?.length ?? 0);
  assert(!HAS_ANCHOR.test(stripped), `anchor survived in ${entry}`);
  if (stripped === before) continue;
  report.push(`${entry}: ${removed} artifacts removed`);
  if (!check) fs.writeFileSync(file, stripped);
}

for (const line of report) console.log(line);
console.log(`${report.length} files rewritten${check ? ' (dry run)' : ''}; ${report.reduce((sum, line) => sum + Number(line.match(/: (\d+)/)[1]), 0)} artifacts removed.`);
