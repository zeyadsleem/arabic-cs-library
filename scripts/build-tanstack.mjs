/** Build the published TanStack lesson pages from the authored Arabic lessons.
 *
 * `content-src/<book>-translations/<chapter>--<slug>.md` holds the full authored
 * lesson: an Arabic title in the frontmatter and an explanatory body that quotes
 * code from the lesson branch and shows captured screenshots. Nothing is injected
 * here — no video iframe, no transcript stamps. A page is published only when it
 * passes `validateLessonPage`; a missing or invalid lesson is reported and makes
 * the build exit non-zero instead of publishing a transcript under an Arabic title.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  lessonBundles,
  readTranslation,
  selectedBooks,
  stagedPages,
  translationsDirectory,
  validateLessonPage,
} from './lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const books = selectedBooks(process.argv.slice(2));

const main = () => {
  let failures = 0;

  for (const bookId of books) {
    const source = `${root}/content-src/${bookId}`;
    const outputDirectory = path.join(root, 'content', bookId);
    const structurePath = path.join(root, 'content', `${bookId}-structure.json`);
    const pages = stagedPages(source);
    const bundles = lessonBundles(root, bookId);
    const translations = translationsDirectory(root, bookId);
    const structure = JSON.parse(fs.readFileSync(structurePath, 'utf8'));

    fs.rmSync(outputDirectory, { recursive: true, force: true });
    fs.mkdirSync(outputDirectory, { recursive: true });

    let published = 0;
    const invalid = [];

    for (const page of pages) {
      const translation = readTranslation(translations, page.key);
      if (!translation) {
        invalid.push({ key: page.key, problems: [`${page.key}: no lesson file`] });
        continue;
      }
      const problems = validateLessonPage(page.key, translation, {
        root,
        bookId,
        lesson: bundles.get(page.key),
      });
      if (problems.length) {
        invalid.push({ key: page.key, problems });
        continue;
      }

      fs.writeFileSync(
        path.join(outputDirectory, `${page.key}.md`),
        `---\ntitle: ${JSON.stringify(translation.title)}\nlang: ar\nsource: ${JSON.stringify(page.source)}\n---\n\n${translation.body.trim()}\n`
      );
      published += 1;

      for (const chapter of structure.chapters) {
        if (chapter.key !== page.chapter) continue;
        const section = chapter.sections.find((item) => item.slug === page.slug);
        if (section) section.title = translation.title;
      }
    }

    fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);

    console.log(`${bookId}: ${published}/${pages.length} lessons published`);
    for (const { key, problems } of invalid) {
      console.warn(`${bookId}: ${key} is not ready`);
      for (const problem of problems) console.warn(`  - ${problem}`);
    }
    failures += invalid.length;
  }

  if (failures) {
    console.error(`build-tanstack: ${failures} lesson(s) missing or invalid`);
    process.exit(1);
  }
  console.log('build-tanstack: done');
};

main();
