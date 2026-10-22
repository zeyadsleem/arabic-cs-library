/** Verify the authored TanStack lessons without publishing them.
 *
 * Usage: `node scripts/check-tanstack.mjs [--book <id>] [key ...]`
 * Each page is PASS, PENDING (no lesson file) or FAIL with the rules it broke.
 * Exits non-zero when anything is pending or invalid, so the same command is the
 * authoring gate: every lesson must teach with real code and real screenshots.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  arabicLetterRatio,
  codeFences,
  lessonBundles,
  readTranslation,
  selectedBooks,
  tanstackPages,
  translationsDirectory,
  validateLessonPage,
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
  const invalidPages = [];

  for (const bookId of bookIds) {
    const pages = tanstackPages(root, bookId);
    const bundles = lessonBundles(root, bookId);
    const selected = requested.length ? pages.filter((page) => requested.includes(page.key)) : pages;
    for (const page of selected) {
      const translation = readTranslation(translationsDirectory(root, bookId), page.key);
      if (!translation) {
        pendingTotal += 1;
        console.error(`PENDING ${bookId}/${page.key}`);
        continue;
      }
      const problems = validateLessonPage(page.key, translation, {
        root,
        bookId,
        lesson: bundles.get(page.key),
      });
      if (problems.length) {
        failedTotal += 1;
        invalidPages.push({ bookId, page: page.key, problems });
      } else {
        passedTotal += 1;
        if (requested.length) {
          console.log(
            `PASS ${page.key} ${pad(codeFences(translation.body).length)} blocks ${pad(
              Math.round(arabicLetterRatio(translation.body) * 100)
            )}% arabic`
          );
        }
      }
    }
  }

  const known = new Set(bookIds.flatMap((bookId) => tanstackPages(root, bookId).map((page) => page.key)));
  const unknown = requested.filter((key) => !known.has(key));

  for (const group of invalidPages) {
    console.error(`FAIL ${group.bookId}/${group.page}`);
    for (const problem of group.problems) console.error('  -', problem);
  }
  if (unknown.length) console.error(`unknown page(s): ${unknown.join(', ')}`);

  const total = passedTotal + pendingTotal + failedTotal;
  console.log(`\nall pages: ${total} — pass ${passedTotal} · pending ${pendingTotal} · invalid ${failedTotal}`);
  if (pendingTotal || failedTotal || unknown.length) {
    for (const bookId of bookIds) {
      const pages = tanstackPages(root, bookId);
      const bundles = lessonBundles(root, bookId);
      const results = pages.reduce(
        (acc, page) => {
          const translation = readTranslation(translationsDirectory(root, bookId), page.key);
          if (!translation) acc.pending += 1;
          else if (
            validateLessonPage(page.key, translation, { root, bookId, lesson: bundles.get(page.key) }).length
          ) {
            acc.invalid += 1;
          } else acc.pass += 1;
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
