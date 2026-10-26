/**
 * TanStack Router / Form courses: staged structure, authored lessons, and the
 * machine-checkable contract (real code excerpts, real screenshots, references).
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  TANSTACK_BOOKS,
  lessonBundles,
  readTranslation,
  tanstackConfig,
  tanstackPages,
  translationsDirectory,
  validateLessonPage,
  withoutCodeFences,
} from '../scripts/lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FOREIGN_SCRIPT = /[\u0400-\u04FF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;

for (const bookId of TANSTACK_BOOKS) {
  const config = tanstackConfig(bookId);
  const pages = tanstackPages(root, bookId);
  const bundles = lessonBundles(root, bookId);
  const structure = JSON.parse(fs.readFileSync(path.join(root, `content/${bookId}-structure.json`), 'utf8'));
  const library = JSON.parse(fs.readFileSync(path.join(root, 'content/library.json'), 'utf8'));
  const book = library.books.find((entry) => entry.id === bookId);

  test(`${bookId}: staged pages and structure agree in course order`, () => {
    assert.equal(pages.length, book.pages, 'library.json page count differs from staged pages');
    assert.equal(structure.chapters.length, 1);
    assert.equal(structure.chapters[0].key, config.chapter);
    assert.ok(structure.chapters[0].titleAr, 'chapter lacks an Arabic title');
    const sections = structure.chapters[0].sections;
    assert.deepEqual(
      sections.map((section) => `${structure.chapters[0].key}--${section.slug}`),
      [...pages].sort((a, b) => a.order - b.order).map((page) => `${page.chapter}--${page.slug}`)
    );
    assert.equal(new Set(sections.map((section) => section.slug)).size, sections.length, 'duplicate slugs');
  });

  test(`${bookId}: every lesson has a code bundle`, () => {
    for (const page of pages) {
      assert.ok(bundles.has(page.key), `lesson bundle missing for ${page.key}`);
      const bundle = bundles.get(page.key);
      assert.ok(bundle.files.length > 0, `${page.key} bundle carries no files`);
      if (page.key.endsWith('--index')) {
        // An index lesson introduces the scaffold, so it either has no branch or
        // points at the repository's default branch — never at a feature branch.
        assert.ok(
          bundle.branch === null || bundle.branch === 'main',
          `index page sits on an unexpected branch: ${bundle.branch}`
        );
      }
    }
  });

  for (const page of pages) {
    const key = `${page.chapter}--${page.slug}`;
    test(`${bookId}/${key}: authored lesson is complete and grounded`, () => {
      const entry = readTranslation(translationsDirectory(root, bookId), key);
      assert.ok(entry, `${key} has no lesson file`);
      assert.deepEqual(
        validateLessonPage(key, entry, { root, bookId, lesson: bundles.get(key) }),
        [],
        `${key} fails the lesson rules`
      );
      assert.doesNotMatch(entry.body, /\[\d{1,3}:\d{2}\]/, 'transcript stamps leaked in');
      assert.doesNotMatch(entry.body, /<iframe\b/i, 'video iframe leaked in');
      assert.doesNotMatch(withoutCodeFences(entry.body), FOREIGN_SCRIPT, 'foreign-script text leaked in');
      assert.ok(entry.title.trim().length > 0, `${key} lacks a title`);
    });
  }
}

test('tanstack: structured sources count exactly 55 lessons', () => {
  const total = TANSTACK_BOOKS.reduce((sum, bookId) => sum + tanstackPages(root, bookId).length, 0);
  assert.deepEqual([34, 21], TANSTACK_BOOKS.map((bookId) => tanstackPages(root, bookId).length));
  assert.equal(total, 55, 'unexpected course size');
});
