/** Guardrails in the shared translation rules: a page that is complete enough to
 * pass the Arabic-ratio check can still be a placeholder, a truncation, or carry
 * leaked tool output. These cases pin the checks that reject them. */
import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePageTranslation } from '../scripts/lib/translation-rules.mjs';

const SOURCE = `# A page title

This paragraph explains the idea in enough English words to compare lengths.
It keeps a [reference](https://example.com/docs) and a code sample.

\`\`\`javascript
const answer = 42;
\`\`\`
`;

const translation = (body, title = 'عنوان الصفحة') => ({ title, body });

test('a faithful translation passes every rule', () => {
  const problems = validatePageTranslation(
    'book--page',
    SOURCE,
    translation(`# عنوان الصفحة

هذه فقرة تشرح الفكرة بما يكفي من الكلمات العربية لتقارن الأطوال، وتحتفظ
بـ[مرجع](https://example.com/docs) وعيّنة شيفرة.

\`\`\`javascript
const answer = 42;
\`\`\`
`)
  );
  assert.deepEqual(problems, []);
});

test('leaked tool output is rejected even when the Arabic ratio is healthy', () => {
  const problems = validatePageTranslation(
    'book--page',
    SOURCE,
    translation(`# عنوان الصفحة

هذه فقرة عربية سليمة تمامًا، فيها ما يكفي من الحروف لتجاوز فحص النسبة.
filePath">
/home/zeyad/projects/library/content-src/book-translations/book--page.md
`)
  );
  assert.ok(problems.some((problem) => problem.includes('leaked non-page text')));
});

test('a translator placeholder is rejected', () => {
  const problems = validatePageTranslation(
    'book--page',
    SOURCE,
    translation(`# عنوان الصفحة

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
`)
  );
  assert.ok(problems.some((problem) => problem.includes('leaked non-page text')));
});

test('a summarized page is rejected by the source coverage check', () => {
  const longSource = `# A page title\n\n${'This sentence explains the topic in enough detail. '.repeat(20)}`;
  const problems = validatePageTranslation(
    'book--page',
    longSource,
    translation(`# عنوان الصفحة

هذه جملة واحدة فقط تختصر الصفحة كلها.
`)
  );
  assert.ok(problems.some((problem) => problem.includes('summarized or truncated')));
});
