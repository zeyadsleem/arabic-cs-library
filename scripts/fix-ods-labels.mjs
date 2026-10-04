#!/usr/bin/env node
// Repairs the doubled separator in the numbered theorem, lemma and
// exercise labels of the open-data-structures import.
//
// The book was converted from latex2html output, where every
// "Theorem 5.1" style label came through as "Theorem 5..1". The chapter
// number is always the file's own chapter number and the item number runs
// from 1 with no gaps, so collapsing the second dot restores the label the
// book actually uses. The chapter's own prose already refers to these
// numbers correctly ("see Exercise 7.10" pointing at the "Exercise 7..10"
// label), which is what makes the collapse provable rather than a guess.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BOOK = 'open-data-structures';

const labelPattern = () => /\*\*([^*\n]{0,40}?)(\s)(\d+)\.\.(\d+)(\*\*)/g;
const remainingPattern = () => /\*\*[^*\n]{0,40}?\s\d+\.\.\d+\*\*/g;

const chapterOf = (file) => path.basename(file).split('_')[0];

const books = process.argv.slice(2).filter((value) => !value.startsWith('-'));
const targets = books.length > 0 ? books : [BOOK];
const write = process.argv.includes('--write');
const log = process.argv.includes('--log');

const dir = path.join(root, 'content', BOOK);
const sourceDir = path.join(root, 'content-src', BOOK);

const repair = (file, tree) => {
  const original = fs.readFileSync(file, 'utf8');
  const chapter = chapterOf(file);
  let found = 0;
  let applied = 0;

  const repaired = original.replace(labelPattern(), (match, title, space, first, second, close) => {
    found += 1;
    if (first !== chapter) {
      throw new Error(`${path.relative(root, file)}: label ${match} does not start with chapter ${chapter}`);
    }
    applied += 1;
    return `**${title}${space}${first}.${second}${close}`;
  });

  const left = [...repaired.matchAll(remainingPattern())].length;
  if (left !== 0) {
    throw new Error(`${path.relative(root, file)}: ${left} labels still carry the doubled separator`);
  }
  if (applied !== found) {
    throw new Error(`${path.relative(root, file)}: matched ${found} labels but rewrote ${applied}`);
  }

  if (write && repaired !== original) {
    fs.writeFileSync(file, repaired);
  }
  return { tree, file: path.relative(root, file), found, written: repaired !== original, left };
};

const report = [];
for (const tree of [sourceDir, dir]) {
  if (!fs.existsSync(tree)) continue;
  for (const name of fs.readdirSync(tree).sort()) {
    if (!name.endsWith('.md')) continue;
    report.push(repair(path.join(tree, name), path.basename(tree)));
  }
}

const totals = report.reduce(
  (acc, row) => ({
    found: acc.found + row.found,
    written: acc.written + (row.written ? 1 : 0),
    left: acc.left + row.left,
  }),
  { found: 0, written: 0, left: 0 },
);

for (const row of report) {
  if (log || !row.written) {
    console.log(`${row.tree.padEnd(8)} ${row.file.padEnd(52)} ${String(row.found).padStart(3)}`);
  }
}
console.log(`${BOOK}   labels ${totals.found}   files ${totals.written}   still doubled ${totals.left}`);