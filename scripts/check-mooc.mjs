/** Verify MOOC translations without publishing them.
 *
 * Usage: `node scripts/check-mooc.mjs [key ...]`
 * With keys, only those pages are reported; otherwise all 89 are. Each page is
 * PASS, PENDING (no translation file) or FAIL with the rules it broke. Exits
 * non-zero when anything is pending or invalid, so the same command doubles as
 * the build gate for translators.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  arabicLetterRatio,
  codeFences,
  readTranslation,
  stagedPages,
  translationsDirectory,
  validatePageTranslation,
} from './lib/mooc-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requested = process.argv.slice(2).filter((argument) => !argument.startsWith('-'));

/** @param {string} value @returns {number} */
const pad = (value) => String(value).padStart(4);

const main = () => {
  const pages = stagedPages(path.join(root, 'content-src', 'mooc'));
  const selected = requested.length ? pages.filter((page) => requested.includes(page.key)) : pages;
  const unknown = requested.filter((key) => !pages.some((page) => page.key === key));

  let passed = 0;
  const pending = [];
  const failures = [];

  for (const page of selected) {
    const translation = readTranslation(translationsDirectory(root), page.key);
    if (!translation) {
      pending.push(page.key);
      continue;
    }
    const problems = validatePageTranslation(page.key, page.body, translation);
    if (problems.length) failures.push(problems);
    else {
      passed += 1;
      console.log(
        `PASS ${page.key} ${pad(codeFences(page.body).length)} blocks ${pad(
          Math.round(arabicLetterRatio(translation.body) * 100)
        )}% arabic`
      );
    }
  }

  for (const problems of failures) {
    console.error(`FAIL ${problems[0].split(':')[0]}`);
    for (const problem of problems) console.error('  -', problem);
  }
  for (const key of pending) console.error(`PENDING ${key}`);
  if (unknown.length) console.error(`unknown page(s): ${unknown.join(', ')}`);

  console.log(
    `\n${selected.length} page(s): ${passed} pass, ${pending.length} pending, ${failures.length} invalid`
  );
  if (pending.length || failures.length || unknown.length) process.exit(1);
};

main();
