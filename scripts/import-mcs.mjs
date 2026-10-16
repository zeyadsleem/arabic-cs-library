/**
 * Mathematics for Computer Science (MCS) — PDF import.
 *
 * Source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
 * License: CC BY-SA 3.0
 * 1048 pages, 22 chapters in 4 parts
 *
 * Extracts chapters by page ranges from the table of contents.
 * Uses pdftotext for text extraction and converts to markdown.
 *
 * usage: node scripts/import-mcs.mjs [only<key>] [--refresh]
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'mcs';
const pdfUrl = 'https://courses.csail.mit.edu/6.042/spring18/mcs.pdf';

const sourceDir = path.join(root, 'content-src', id);
const contentDir = path.join(root, 'content', id);
const imageDir = path.join(root, 'static', 'images', id);
for (const dir of [sourceDir, contentDir, imageDir]) fs.mkdirSync(dir, { recursive: true });

const only = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const refresh = process.argv.includes('--refresh');

const pdfPath = path.join(sourceDir, 'mcs.pdf');

/** Download PDF if missing or --refresh */
if (refresh || !fs.existsSync(pdfPath)) {
  console.log(`Downloading ${pdfUrl}…`);
  execFileSync('curl', ['-fsL', '--compressed', '-m', '300', pdfUrl], {
    stdio: ['ignore', 'pipe', 'ignore'],
  }).then(() => {}); // curl writes to stdout, but we redirect to file
  // Actually use shell redirection
  execFileSync('curl', ['-fsL', '--compressed', '-m', '300', '-o', pdfPath, pdfUrl], {
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  console.log('PDF downloaded.');
}

/** Extract text from a page range (1-indexed, inclusive) */
function extractPages(start, end) {
  const out = execFileSync('pdftotext', [
    '-f', String(start),
    '-l', String(end),
    '-layout',
    '-nopgbrk',
    pdfPath,
    '-',
  ], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  return out;
}

/** Clean extracted text */
function clean(text) {
  return text
    .replace(/\f/g, '\n')                    // form feeds → newlines
    .replace(/“mcs”[^\n]*\n/g, '')           // remove page headers
    .replace(/page [ivx]+[^\n]*#\d+/g, '')  // remove page footers
    .replace(/\n{3,}/g, '\n\n')              // collapse excessive blank lines
    .replace(/^\s+|\s+$/g, '');              // trim
}

/** Convert plain text to basic markdown */
function toMarkdown(text) {
  return text
    // Headings: numbered like "1.1 Title" or "1 Title" at line start
    .replace(/^(\d+(?:\.\d+)*)\s+(.+)$/gm, (m, num, title) => {
      const depth = num.split('.').length;
      const hashes = '#'.repeat(Math.min(depth + 1, 4));
      return `${hashes} ${num} ${title.trim()}`;
    })
    // Bold figure/table captions
    .replace(/^(Figure|Table|Example)\s+\d+[\.:]\s*(.+)$/gmi, '**$1 $2**')
    // Code-like blocks (indented)
    .replace(/^(\s{4,}.+)$/gm, '```\n$1\n```')
    // Inline math $...$
    .replace(/\\\((.+?)\\\)/g, '$$$1$$')
    // Display math $$...$$
    .replace(/\\\[(.+?)\\\]/gs, '$$$1$$');
}

/** Chapter definitions with PDF page ranges (1-indexed, inclusive).
 *  Book page n → PDF page n+8 (8 pages of front matter: i–viii).
 */
const chapters = [
  // Part I: Proofs
  { key: 'ch01-what-is-a-proof', title: 'What is a Proof?', start: 13, end: 36 },
  { key: 'ch02-well-ordering', title: 'The Well Ordering Principle', start: 37, end: 54 },
  { key: 'ch03-logical-formulas', title: 'Logical Formulas', start: 55, end: 76 },
  { key: 'ch04-math-data-types', title: 'Mathematical Data Types', start: 111, end: 123 },
  { key: 'ch05-induction', title: 'Induction', start: 145, end: 160 },
  { key: 'ch06-state-machines', title: 'State Machines', start: 181, end: 200 },
  { key: 'ch07-recursive-data-types', title: 'Recursive Data Types', start: 225, end: 264 },
  { key: 'ch08-infinite-sets', title: 'Infinite Sets', start: 303, end: 322 },

  // Part II: Structures
  { key: 'ch09-number-theory', title: 'Number Theory', start: 349, end: 390 },
  { key: 'ch10-directed-graphs', title: 'Directed Graphs & Partial Orders', start: 429, end: 457 },
  { key: 'ch11-communication-networks', title: 'Communication Networks', start: 489, end: 508 },
  { key: 'ch12-simple-graphs', title: 'Simple Graphs', start: 509, end: 543 },
  { key: 'ch13-planar-graphs', title: 'Planar Graphs', start: 583, end: 602 },

  // Part III: Counting
  { key: 'ch14-sums-asymptotics', title: 'Sums and Asymptotics', start: 613, end: 638 },
  { key: 'ch15-cardinality-rules', title: 'Cardinality Rules', start: 663, end: 702 },
  { key: 'ch16-generating-functions', title: 'Generating Functions', start: 743, end: 762 },

  // Part IV: Probability
  { key: 'ch17-events-probability', title: 'Events and Probability Spaces', start: 781, end: 804 },
  { key: 'ch18-conditional-probability', title: 'Conditional Probability', start: 813, end: 836 },
  { key: 'ch19-random-variables', title: 'Random Variables', start: 865, end: 896 },
  { key: 'ch20-deviation', title: 'Deviation from the Mean', start: 897, end: 936 },
  { key: 'ch21-random-walks', title: 'Random Walks', start: 937, end: 964 },
  { key: 'ch22-bayesian', title: 'Bayesian Inference', start: 965, end: 996 },
];

/** Build structure.json */
const structure = { chapters: chapters.map((c, i) => ({
  key: c.key,
  title: c.title,
  sections: [{ slug: 'index', title: c.title, order: i }],
})) };

async function main() {
  if (only && !chapters.find(c => c.key === only)) {
    console.error(`Unknown chapter key: ${only}`);
    process.exit(1);
  }

  const targets = only ? chapters.filter(c => c.key === only) : chapters;

  for (const ch of targets) {
    const file = path.join(contentDir, `${ch.key}--index.md`);
    if (!refresh && fs.existsSync(file)) {
      const fm = fs.readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
      if (fm && fm[1].includes('lang: ar')) {
        console.log(`Skipping ${ch.key} (already translated)`);
        continue;
      }
    }

    console.log(`Extracting ${ch.key} (pages ${ch.start}–${ch.end})…`);
    const raw = extractPages(ch.start, ch.end);
    const cleaned = clean(raw);
    const md = toMarkdown(cleaned);

    const frontmatter = `---\ntitle: "${ch.title}"\nlang: en\n---\n\n`;
    fs.writeFileSync(file, frontmatter + md);
  }

  // Write structure.json
  fs.writeFileSync(
    path.join(contentDir, `${id}-structure.json`),
    JSON.stringify(structure, null, 2)
  );
  console.log('structure.json written.');
}

main().catch(e => { console.error(e); process.exit(1); });