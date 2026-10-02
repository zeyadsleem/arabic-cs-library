import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { validateTranslation } from '../../scripts/lib/validate-tour-translation.mjs';

test('all 103 pages preserve every source HTML node, link and code snippet', async () => {
  const source = JSON.parse(await fs.readFile(new URL('../../src/lib/tour/source.json', import.meta.url), 'utf8'));
  let pages = 0;
  for (const [id, lesson] of Object.entries(source)) {
    const translation = JSON.parse(await fs.readFile(new URL(`../../src/lib/tour/translations/${id}.json`, import.meta.url), 'utf8'));
    pages += validateTranslation(lesson, translation, id).pages;
  }
  assert.equal(pages, 103);
});

test('audit rejects omitted paragraphs and modified code instead of silently publishing', () => {
  const source = {
    Title: 'Example', Description: 'Example module',
    Pages: [{ Title: 'Example', Content: '<h2>Example</h2><p>This is the first paragraph.</p><p>This is another important note.</p><pre>x := 1</pre>' }]
  };
  const translation = {
    Title: 'مثال', Description: 'وحدة المثال',
    Pages: [{ Title: 'مثال', Content: '<h2>مثال</h2><p>هذه هي الفقرة الأولى.</p><p>هذه ملاحظة مهمة أخرى.</p><pre>x := 1</pre>' }]
  };
  assert.equal(validateTranslation(source, translation, 'fixture').pages, 1);
  const omitted = structuredClone(translation);
  omitted.Pages[0].Content = omitted.Pages[0].Content.replace('<p>هذه ملاحظة مهمة أخرى.</p>', '');
  assert.throws(() => validateTranslation(source, omitted, 'fixture'), /omitted\/changed HTML/);
  const modified = structuredClone(translation);
  modified.Pages[0].Content = modified.Pages[0].Content.replace('x := 1', 'x := 2');
  assert.throws(() => validateTranslation(source, modified, 'fixture'), /omitted\/changed HTML/);
});
