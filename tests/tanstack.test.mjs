/**
 * TanStack Router / Form courses: staged structure and translation checks.
 * Mirrors scripts/check-tanstack.mjs invariants via scripts/lib/tanstack-translation.mjs.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  TANSTACK_BOOKS,
  codeFences,
  linkTargets,
  readTranslation,
  tanstackConfig,
  tanstackPages,
  translationsDirectory,
  validatePageTranslation,
} from '../scripts/lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Timestamps kept at paragraph starts: `[MM:SS]` runs must survive 1:1. */
const stamps = (markdown) => [...markdown.matchAll(/\[\d{2}:\d{2}\]/g)].map((match) => match[0]);

const translation = (bookId, page) =>
  readTranslation(translationsDirectory(root, bookId), `${page.chapter}--${page.slug}`);

for (const bookId of TANSTACK_BOOKS) {
  const config = tanstackConfig(bookId);
  const pages = tanstackPages(root, bookId);
  const structure = JSON.parse(
    fs.readFileSync(path.join(root, `content/${bookId}-structure.json`), 'utf8')
  );
  const library = JSON.parse(fs.readFileSync(path.join(root, 'content/library.json'), 'utf8'));
  const book = library.books.find((entry) => entry.id === bookId);

  test(`${bookId}: staged pages and structure agree in course order`, () => {
    const keys = pages.map((page) => `${page.chapter}--${page.slug}`);
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
    assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'content/library.json'), 'utf8')).books.some((e) => e.id === bookId), true);
  });

  for (const page of pages) {
    const key = `${page.chapter}--${page.slug}`;
    test(`${bookId}/${key}: translation complete and rule-clean`, () => {
      const entry = translation(bookId, page);
      if (!entry) {
        assert.equal(book.status, 'planned', `${key} missing while the book claims translated`);
        return;
      }
      assert.deepEqual(
        validatePageTranslation(key, page.body, entry),
        [],
        `${key} fails translation rules`
      );
      assert.deepEqual(
        stamps(entry.body),
        stamps(page.body),
        `${key} timestamps lost or reordered`
      );
      if (book.status === 'translated') {
        assert.ok(entry.title.trim().length > 0, `${key} lacks a title`);
      }
    });
  }
}

test('tanstack: structured sources count exactly 55 lessons', () => {
  const total = TANSTACK_BOOKS.reduce((sum, bookId) => sum + tanstackPages(root, bookId).length, 0);
  assert.deepEqual([34, 21], TANSTACK_BOOKS.map((bookId) => tanstackPages(root, bookId).length));
  assert.equal(total, 55, 'unexpected course size');
});
