/** Verify TanStack translations without publishing them.
 *
 * Usage: `node scripts/check-tanstack.mjs [--book <id>] [key ...]`
 * Each page is PASS, PENDING (no translation file) or FAIL with the rules it broke.
 * Exits non-zero when anything is pending or invalid.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  selectedBooks,
  sourceDirectory,
  translationsDirectory,
  tanstackPages,
  readTranslation,
  validatePageTranslation,
  codeFences,
  arabicLetterRatio,
} from './lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawArgs = process.argv.slice(2);
const requested = [];
for (let i = 0; i < rawArgs.length; i += 1) {
  if (rawArgs[i] === '--book') { i += 1; continue; }
  if (rawArgs[i].startsWith('-')) continue;
  requested.push(rawArgs[i]);
}
const bookIds = selectedBooks(rawArgs);

const pad = (value) => String(value).padStart(4);

const main = () => {
  let passedTotal = 0;
  let pendingTotal = 0;
  let failedTotal = 0;
  let invalidPages = [];

  for (const bookId of bookIds) {
    const pages = tanstackPages(root, bookId);
    const selected = requested.length ? pages.filter((page) => requested.includes(page.key)) : pages;
    for (const page of selected) {
      const translation = readTranslation(translationsDirectory(root, bookId), page.key);
      if (!translation) { pendingTotal += 1; console.error(`PENDING ${bookId}/${page.key}`); continue; }
      const problems = validatePageTranslation(page.key, page.body, translation);
      if (problems.length) {
        failedTotal += 1;
        invalidPages.push({ bookId, page: page.key, problems });
      } else {
        passedTotal += 1;
      }
    }
  }

  const unknown = requested.filter((key) => !bookIds.flatMap((bookId) => tanstackPages(root, bookId)).some((page) => page.key === key));
  for (const pageGroup of invalidPages) {
    console.error(`FAIL ${pageGroup.bookId}/${pageGroup.page}`);
    for (const problem of pageGroup.problems) console.error('  -', problem);
  }
  if (unknown.length) console.error(`unknown page(s): ${unknown.join(', ')}`);

  console.log(
    `\nall pages: ${passedTotal + pendingTotal + failedTotal} — pass ${passedTotal} · pending ${pendingTotal} · invalid ${failedTotal}`
  );
  if (pendingTotal || failedTotal || unknown.length) {
    // Also print per-book progress when running the full suite.
    for (const bookId of bookIds) {
      const pages = tanstackPages(root, bookId);
      const results = pages.reduce(
        (acc, page) => {
          const t = readTranslation(translationsDirectory(root, bookId), page.key);
          if (!t) acc.pending += 1;
          else if (validatePageTranslation(page.key, page.body, t).length) acc.invalid += 1;
          else acc.pass += 1;
          return acc;
        },
        { pass: 0, pending: 0, invalid: 0 }
      );
      console.error(`${bookId}: pass ${results.pass} · pending ${results.pending} · invalid ${results.invalid}`);
    }
    process.exit(1);
  }
};

main();
