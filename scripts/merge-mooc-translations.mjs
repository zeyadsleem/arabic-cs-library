/** Merge all MOOC translation chunks into content-src/mooc-translations.json. */
import fs from 'node:fs';
import path from 'node:path';

const outPath = path.join('/home/zeyad/projects/arabic-cs-library', 'content-src', 'mooc-translations.json');

const chunks = [
  'mooc-translate-out-0.json',
  'mooc-translate-out-1.json',
  'mooc-translate-out-4.json',
  'mooc-translate-out-5.json',
  'mooc-translate-out-6.json',
  'mooc-translate-out-7.json',
  'mooc-translate-out-21.json',
  'mooc-translate-out-30.json',
  'mooc-translate-out-31.json',
  'mooc-translate-out-60.json',
  'mooc-translate-out-61.json',
  'mooc-translate-out-600.json',
  'mooc-translate-out-601.json',
  'mooc-translate-out-2000.json',
  'mooc-translate-out-2001.json',
  'mooc-translate-out-2002.json',
  'mooc-translate-out-2010.json',
  'mooc-translate-out-2011.json',
  'mooc-translate-out-2012.json',
];

const merged = {};
let totalPages = 0;

for (const chunk of chunks) {
  const file = path.join('/tmp/opencode', chunk);
  if (!fs.existsSync(file)) {
    console.warn(`Missing chunk: ${chunk}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [key, value] of Object.entries(data)) {
    merged[key] = value;
    totalPages++;
  }
  console.log(`Merged ${chunk}: ${Object.keys(data).length} pages`);
}

// Verify all 89 expected pages
const expectedKeys = [
  'auxiliary--all-exercises', 'auxiliary--error_messages', 'auxiliary--exam',
  'auxiliary--exam_adv', 'auxiliary--exam_intro', 'auxiliary--faq',
  'auxiliary--frontmatter-guide', 'auxiliary--grading-and-exams',
  'auxiliary--index', 'auxiliary--support-and-assistance', 'auxiliary--vocabulary',
  'part-1--1-getting-started', 'part-1--2-information-from-the-user',
  'part-1--3-more-about-variables', 'part-1--4-arithmetic-operations',
  'part-1--5-conditional-statements', 'part-1--index',
  'part-2--1-programming_terminology', 'part-2--2-else-elif',
  'part-2--3-combining-conditions', 'part-2--4-simple-loops', 'part-2--index',
  'part-3--1-loops-with-conditions', 'part-3--2-working-with-strings',
  'part-3--3-more-loops', 'part-3--4-defining-functions', 'part-3--index',
  'part-4--1-vscode', 'part-4--2-more-functions', 'part-4--3-lists',
  'part-4--4-definite-iteration', 'part-4--5-print-statement-formatting',
  'part-4--6-strings-and-lists', 'part-4--index',
  'part-5--1-more-lists', 'part-5--2-references', 'part-5--3-dictionary',
  'part-5--4-tuple', 'part-5--index',
  'part-6--1-reading-files', 'part-6--2-writing-files', 'part-6--3-errors',
  'part-6--4-scope-of-variables', 'part-6--index',
  'part-7--1-modules', 'part-7--2-randomness', 'part-7--3-times-and-dates',
  'part-7--4-data-processing', 'part-7--5-creating-modules',
  'part-7--6-more-features', 'part-7--index',
  'part-8--1-objects-and-methods', 'part-8--2-classes-and-objects',
  'part-8--3-defining-classes', 'part-8--4-defining-methods',
  'part-8--5-more-examples-of-classes', 'part-8--index',
  'part-9--1-objects-and-references', 'part-9--2-objects-as-attributes',
  'part-9--3-encapsulation', 'part-9--4-scope-of-methods',
  'part-9--5-class-attributes', 'part-9--6-more-examples-with-classes',
  'part-9--index',
  'part-10--1-class-hierarchies', 'part-10--2-access-modifiers',
  'part-10--3-oo-programming-techniques', 'part-10--4-application-development',
  'part-10--index',
  'part-11--1-list-comprehensions', 'part-11--2-more-comprehensions',
  'part-11--3-recursion', 'part-11--4-more-recursion-examples',
  'part-11--index',
  'part-12--1-functions-as-arguments', 'part-12--2-generators',
  'part-12--3-functional-programming', 'part-12--4-regular-expressions',
  'part-12--index',
  'part-13--1-pygame', 'part-13--2-animation', 'part-13--3-events',
  'part-13--4-more-pygame-techniques', 'part-13--index',
  'part-14--1-game-project', 'part-14--2-robot-and-boxes',
  'part-14--3-finishing-the-game', 'part-14--4-your-own-game', 'part-14--index',
];

const missing = expectedKeys.filter(k => !merged[k]);
if (missing.length) {
  console.error(`MISSING ${missing.length} pages:`, missing);
  process.exit(1);
}

console.log(`Total merged pages: ${totalPages} (expected 89)`);
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));
console.log(`Written to ${outPath}`);