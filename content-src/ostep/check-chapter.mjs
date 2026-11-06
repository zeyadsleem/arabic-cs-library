#!/usr/bin/env node
/** Verify "The OCaml Manual" chapters against their EN slices.
 *
 * Usage: node content-src/ocaml-manual/check-chapter.mjs [key ...]
 *        (default: every key in content/ostep-structure.json)
 *
 * The EN slices come from the manual's HTML (scripts/import-ocaml-manual.mjs),
 * so the Arabic page must not inherit any HTML or hevea markup: <span>, class=,
 * &lt; entities, or leftover LaTeX.
 * Exit 1 on FAIL.
 */
import fs from 'node:fs';

const ROOT = '/home/zeyad/projects/arabic-cs-library';
const SRC = `${ROOT}/content-src/ostep/src`;
const CONTENT = `${ROOT}/content/ostep`;
const SOURCE_URL = 'https://pages.cs.wisc.edu/~remzi/OSTEP/';

const structure = JSON.parse(fs.readFileSync(`${ROOT}/content/ostep-structure.json`, 'utf8'));
const titlesByKey = Object.fromEntries(structure.chapters.map((chapter) => [chapter.key, chapter.titleAr]));

const stripFrontmatter = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  return match ? { frontmatter: match[1], body: text.slice(match[0].length) } : { frontmatter: null, body: text };
};

const withoutCode = (markdown) => {
  const kept = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) kept.push(line);
  }
  return kept.join('\n');
};

const blocksOf = (markdown) =>
  withoutCode(markdown)
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter((block) => block && !/^!\[/.test(block) && !/^#/.test(block) && !/^\|/.test(block) && block.split(' ').length >= 4);

// Count only rows of genuine markdown tables: a run of `|`-lines that contains a
// separator row. The HTML importer leaves stray single `|` lines behind when it
// flattens display math, and those must not be counted as table rows.
const tableRows = (markdown) => {
  const isSeparator = (line) => /^\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line);
  let total = 0;
  let run = [];
  const flush = () => {
    if (run.length > 0 && run.some(isSeparator)) total += run.length;
    run = [];
  };
  for (const line of markdown.split('\n')) {
    if (line.startsWith('|')) run.push(line);
    else flush();
  }
  flush();
  return total;
};

const analyze = (en, ar, problems, warnings, stats) => {
  const enBody = stripFrontmatter(en).body;
  const enBlocks = blocksOf(enBody);
  const enWords = withoutCode(enBody).split(/\s+/).filter(Boolean).length;
  stats.enBlocks = enBlocks.length;
  stats.enWords = enWords;

  const { frontmatter, body } = stripFrontmatter(ar);
  if (frontmatter === null) problems.push('frontmatter block missing');
  else {
    const title = frontmatter.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1];
    if (title !== titlesByKey[stats.key]) problems.push(`frontmatter title mismatch: "${title}"`);
    if (!/^lang:\s*ar\s*$/m.test(frontmatter)) problems.push('frontmatter lang must be ar');
    if (!frontmatter.includes(`source: ${SOURCE_URL}`)) problems.push('frontmatter source URL missing');
  }

  const h1 = body.match(/^# (.+)$/m)?.[1];
  if (!h1) problems.push('H1 missing');
  else if (titlesByKey[stats.key] && !h1.includes(titlesByKey[stats.key])) problems.push(`H1 must carry "${titlesByKey[stats.key]}"`);

  const arBlocks = blocksOf(body);
  stats.arBlocks = arBlocks.length;
  stats.ratio = enBlocks.length ? +(arBlocks.length / enBlocks.length).toFixed(2) : 0;
  const arWords = withoutCode(body).split(/\s+/).filter(Boolean).length;
  stats.arWords = arWords;
  stats.wordRatio = enWords ? +(arWords / enWords).toFixed(2) : 0;
  if (stats.ratio < 0.55) warnings.push(`paragraph count low: ${arBlocks.length} AR vs ${enBlocks.length} EN (ratio ${stats.ratio})`);
  if (stats.wordRatio < 0.6) warnings.push(`word ratio low: ${stats.wordRatio}`);

  const count = (text, pattern) => (text.match(pattern) || []).length;
  const enFences = count(enBody, /^```/gm) / 2;
  const arFences = count(body, /^```/gm) / 2;
  stats.fences = `${enFences}/${arFences}`;
  if (enFences !== arFences) problems.push(`code fences differ: ${enFences} EN vs ${arFences} AR`);
  const enFenceBodies = [...enBody.matchAll(/^```[^\n]*\n([\s\S]*?)^```$/gm)].map((m) => m[1]);
  const arFenceBodies = [...body.matchAll(/^```[^\n]*\n([\s\S]*?)^```$/gm)].map((m) => m[1]);
  enFenceBodies.forEach((fenceBody, index) => {
    if (arFenceBodies[index] !== undefined && arFenceBodies[index] !== fenceBody) {
      problems.push(`code fence ${index + 1} content differs from source`);
    }
  });

  const enFigs = count(enBody, /^@@FIG@/gm);
  const arFigs = count(body, /^!\[/gm);
  stats.figs = `${enFigs}/${arFigs}`;
  if (enFigs !== arFigs) problems.push(`figure refs differ: ${enFigs} EN markers vs ${arFigs} AR images`);
  if (/@@FIG@/.test(body)) problems.push('unresolved @@FIG@ marker in AR');

  const enRows = tableRows(enBody);
  const arRows = tableRows(body);
  stats.rows = `${enRows}/${arRows}`;
  if (arRows < enRows) problems.push(`table rows missing: ${enRows} EN vs ${arRows} AR`);

  const enNotes = count(enBody, /^\[\^\d+\]:/gm);
  const arNotes = count(body, /^\[\^\d+\]:/gm);
  stats.notes = `${enNotes}/${arNotes}`;
  if (enNotes !== arNotes) problems.push(`footnote definitions differ: ${enNotes} EN vs ${arNotes} AR`);

  const enHeadings = count(enBody, /^#{2,5} /gm);
  const arHeadings = count(body, /^#{2,5} /gm);
  stats.headings = `${enHeadings}/${arHeadings}`;
  if (enHeadings !== arHeadings) problems.push(`headings differ: ${enHeadings} EN vs ${arHeadings} AR`);

  const bodyLines = body.split('\n').filter((line) => !/^\s*#/.test(line) && !/^\s*!\[/.test(line));
  let maxRun = 0;
  let maxLine = '';
  for (const line of bodyLines) {
    if (/https?:\/\//.test(line) || /^\s*\|/.test(line) || /^\s{2,}/.test(line)) continue;
    const tokens = line.split(/\s+/).filter(Boolean);
    let run = 0;
    for (const token of tokens) {
      run = /[A-Za-z]/.test(token) ? run + 1 : 0;
      if (run > maxRun) {
        maxRun = run;
        maxLine = line.trim().slice(0, 90);
      }
    }
  }
  stats.maxLatinRun = maxRun;
  if (maxRun > 16) warnings.push(`long Latin run (${maxRun}): "${maxLine}"`);

  const prose = withoutCode(body);
  if (/\p{Extended_Pictographic}/u.test(prose.replace(/[\u00a9\u00ae\u2122\u2192\u2190\u2194\u2191\u2193\u21d2]/g, ''))) problems.push('emoji found');
  for (const pattern of [/<span/, /<\/?(?:div|pre|code|em|strong|b|i|a|ul|ol|li|dl|dt|dd|table|tr|td|th|blockquote)\b/, /class="/, /&(?:lt|gt|amp|quot|#[0-9]+);/, /\$[^$\n]+\$/, /\^\{|_\{/, /^\.\. /m, /```html/]) {
    if (pattern.test(prose)) problems.push(`source artefact ${pattern} found`);
  }
  for (const bad of ['TODO', 'TBD', '??']) {
    if (prose.includes(bad)) problems.push(`placeholder "${bad}" found`);
  }
};

const keys = process.argv.slice(2).length ? process.argv.slice(2) : structure.chapters.map((chapter) => chapter.key);
let failures = 0;
const rows = [];
for (const key of keys) {
  const problems = [];
  const warnings = [];
  const stats = { key };
  const enPath = `${SRC}/${key}.en.md`;
  const arPath = `${CONTENT}/${key}--index.md`;
  if (!fs.existsSync(enPath)) problems.push('EN slice missing');
  if (!fs.existsSync(arPath)) problems.push('AR file missing');
  if (!problems.length) analyze(fs.readFileSync(enPath, 'utf8'), fs.readFileSync(arPath, 'utf8'), problems, warnings, stats);
  rows.push({ key, stats, problems, warnings });
  if (problems.length) failures += 1;
}

for (const { key, stats, problems, warnings } of rows) {
  const status = problems.length ? 'FAIL' : warnings.length ? 'WARN' : 'PASS';
  console.log(
    `${status} ${key.padEnd(10)} blocks ${stats.enBlocks ?? '-'}/${stats.arBlocks ?? '-'} (r ${stats.ratio ?? '-'})  words ${stats.enWords ?? '-'}/${stats.arWords ?? '-'}  fences ${stats.fences ?? '-'}  rows ${stats.rows ?? '-'}  notes ${stats.notes ?? '-'}  heads ${stats.headings ?? '-'}  figs ${stats.figs ?? '-'}  latin ${stats.maxLatinRun ?? '-'}`
  );
  for (const problem of problems) console.log(`   x ${problem}`);
  for (const warning of warnings) console.log(`   ! ${warning}`);
}
console.log(`\n${rows.length} keys — fail ${failures}`);
process.exit(failures ? 1 : 0);
