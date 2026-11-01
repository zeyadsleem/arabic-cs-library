#!/usr/bin/env node
/** Verify Database Performance at Scale chapter translations against their EN slices.
 *
 * Usage: node check-chapter.mjs [key ...]      (default: every key in structure.json)
 *
 * Checks: file presence, frontmatter fields, H1, paragraph/word coverage,
 * code-fence, table and footnote parity, Latin-run sanity, image refs
 * (existence + size + alt), and emoji/LaTeX/placeholder bans. Exit 1 on FAIL.
 */
import fs from 'node:fs';

const ROOT = '/home/zeyad/projects/arabic-cs-library';
const SRC = `${ROOT}/content-src/db-performance-at-scale/src`;
const CONTENT = `${ROOT}/content/db-performance-at-scale`;
const SOURCE_URL = 'https://link.springer.com/book/10.1007/978-1-4842-9711-7';

const structure = JSON.parse(fs.readFileSync(`${ROOT}/content/db-performance-at-scale-structure.json`, 'utf8'));
const titlesByKey = Object.fromEntries(
  structure.chapters.map((c) => [c.key, new Set([c.titleAr, ...c.sections.map((s) => s.title)])])
);

const isLatin = (tok) => /[A-Za-z]/.test(tok);

const stripFrontmatter = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  return match ? { frontmatter: match[1], body: text.slice(match[0].length) } : { frontmatter: null, body: text };
};

const blocksOf = (markdown) =>
  markdown
    .replace(/```[\s\S]*?```/g, '\n\n')
    .split(/\n\s*\n/)
    .map((b) => b.replace(/\s+/g, ' ').trim())
    .filter((b) => b && !/^!\[/.test(b) && !/^#/.test(b) && b.split(' ').length >= 4);

const analyze = (en, ar, problems, warnings, stats) => {
  const enBody = stripFrontmatter(en).body;
  const enBlocks = blocksOf(enBody);
  const enWords = enBody.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  stats.enBlocks = enBlocks.length;
  stats.enWords = enWords;

  const { frontmatter, body } = stripFrontmatter(ar);
  if (frontmatter === null) problems.push('frontmatter block missing');
  else {
    const title = frontmatter.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1];
    if (!titlesByKey[stats.key]?.has(title)) {
      problems.push(`frontmatter title mismatch: "${title}"`);
    }
    if (!/^lang:\s*ar\s*$/m.test(frontmatter)) problems.push('frontmatter lang must be ar');
    if (!frontmatter.includes(`source: ${SOURCE_URL}`)) problems.push('frontmatter source URL missing');
  }

  const h1 = body.match(/^# (.+)$/m)?.[1];
  if (!h1) problems.push('H1 missing');
  else if (!titlesByKey[stats.key]?.has(h1.replace(/^الفصل [^:]+:\s*/, '').replace(/^الملحق أ:\s*/, 'الملحق أ: ').trim())
    && ![...(titlesByKey[stats.key] ?? [])].some((t) => h1.includes(t))) {
    warnings.push(`H1 does not carry the Arabic title — got "${h1.slice(0, 60)}"`);
  }

  const arBlocks = blocksOf(body);
  stats.arBlocks = arBlocks.length;
  stats.ratio = enBlocks.length ? +(arBlocks.length / enBlocks.length).toFixed(2) : 0;
  const arWords = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  stats.arWords = arWords;
  stats.wordRatio = enWords ? +(arWords / enWords).toFixed(2) : 0;
  if (stats.ratio < 0.85) warnings.push(`paragraph count low: ${arBlocks.length} AR vs ${enBlocks.length} EN (ratio ${stats.ratio})`);
  if (stats.wordRatio < 0.55) warnings.push(`word ratio low: ${stats.wordRatio}`);

  const count = (text, re) => (text.match(re) || []).length;
  const enFences = count(enBody, /```/g) / 2;
  const arFences = count(body, /```/g) / 2;
  stats.fences = `${enFences}/${arFences}`;
  if (enFences !== arFences) problems.push(`code fences differ: ${enFences} EN vs ${arFences} AR`);

  const enRows = count(enBody, /^\|/gm);
  const arRows = count(body, /^\|/gm);
  stats.rows = `${enRows}/${arRows}`;
  if (arRows < enRows) problems.push(`table rows missing: ${enRows} EN vs ${arRows} AR`);

  const enNotes = count(enBody, /^\[\^\d+\]:/gm);
  const arNotes = count(body, /^\[\^\d+\]:/gm);
  stats.notes = `${enNotes}/${arNotes}`;
  if (enNotes !== arNotes) problems.push(`footnote definitions differ: ${enNotes} EN vs ${arNotes} AR`);

  const enFigs = count(enBody, /^!\[/gm);
  const arFigs = count(body, /^!\[/gm);
  stats.figs = `${enFigs}/${arFigs}`;
  if (enFigs !== arFigs) problems.push(`figures differ: ${enFigs} EN vs ${arFigs} AR`);

  const bodyLines = body.split('\n').filter((l) => !/^\s*#/.test(l) && !/^\s*!\[/.test(l));
  let maxRun = 0;
  let maxLine = '';
  for (const line of bodyLines) {
    if (/https?:\/\//.test(line) || /^\s*\|/.test(line) || /^\s{2,}/.test(line)) continue;
    const toks = line.split(/\s+/).filter(Boolean);
    let run = 0;
    for (const tok of toks) {
      run = isLatin(tok) ? run + 1 : 0;
      if (run > maxRun) {
        maxRun = run;
        maxLine = line.trim().slice(0, 90);
      }
    }
  }
  stats.maxLatinRun = maxRun;
  if (maxRun > 9) warnings.push(`long Latin run (${maxRun}): "${maxLine}"`);

  const prose = body.replace(/```[\s\S]*?```/g, ' ');
  const noCopyright = prose.replace(/[\u00a9\u00ae\u2122]/g, '');
  if (/\p{Extended_Pictographic}/u.test(noCopyright)) problems.push('emoji found');
  if (/\\\(|\\\[|\$\$/.test(prose)) problems.push('LaTeX found');
  for (const bad of ['TODO', 'TBD', 'Figure \\d', 'Springer Nature', 'An icon of']) {
    if (new RegExp(bad).test(prose)) problems.push(`placeholder/untranslated "${bad}" found`);
  }

  const refs = [...ar.matchAll(/!\[(.*?)\]\((\/images\/db-performance-at-scale\/[^)]+)\)/gs)];
  for (const ref of refs) {
    const file = ref[2].replace('/images/', `${ROOT}/static/images/`);
    if (!fs.existsSync(file)) {
      problems.push(`missing image file ${ref[2]}`);
      continue;
    }
    const size = fs.statSync(file).size;
    if (size < 4096) warnings.push(`tiny image (${(size / 1024).toFixed(1)}KB): ${ref[2]}`);
    if (!ref[1].trim()) problems.push(`empty alt text for ${ref[2]}`);
  }
};

const keys = process.argv.slice(2).length ? process.argv.slice(2) : structure.chapters.map((c) => c.key);
let failures = 0;
const rows = [];
for (const key of keys) {
  const problems = [];
  const warnings = [];
  const enPath = `${SRC}/${key}.en.md`;
  const arPath = `${CONTENT}/${key}--index.md`;
  const stats = { key };
  if (!fs.existsSync(enPath)) problems.push(`EN slice missing (${enPath})`);
  if (!fs.existsSync(arPath)) problems.push('AR file missing');
  if (!problems.length) {
    analyze(fs.readFileSync(enPath, 'utf8'), fs.readFileSync(arPath, 'utf8'), problems, warnings, stats);
  }
  rows.push({ key, stats, problems, warnings });
  if (problems.length) failures += 1;
}

for (const { key, stats, problems, warnings } of rows) {
  const status = problems.length ? 'FAIL' : warnings.length ? 'WARN' : 'PASS';
  console.log(
    `${status} ${key.padEnd(14)} blocks ${stats.enBlocks ?? '-'}/${stats.arBlocks ?? '-'} (r ${stats.ratio ?? '-'})  words ${stats.enWords ?? '-'}/${stats.arWords ?? '-'}  fences ${stats.fences ?? '-'}  rows ${stats.rows ?? '-'}  notes ${stats.notes ?? '-'}  figs ${stats.figs ?? '-'}  latin ${stats.maxLatinRun ?? '-'}`
  );
  for (const p of problems) console.log(`   x ${p}`);
  for (const w of warnings) console.log(`   ! ${w}`);
}
console.log(`\n${rows.length} keys — fail ${failures}`);
process.exit(failures ? 1 : 0);
