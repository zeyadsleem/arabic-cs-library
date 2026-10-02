import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';

/** @param {string} html @returns {Array<{type: number, tag?: string, attributes?: string, text?: string}>} */
function structure(html) {
  const result = [];
  function walk(node, protectedCode = false) {
    if (node.nodeType === 1) {
      const tag = node.tagName?.toLowerCase() || 'root';
      const preserve = protectedCode || tag === 'pre' || tag === 'code';
      result.push({ type: 1, tag, attributes: JSON.stringify(node.attributes) });
      for (const child of node.childNodes) walk(child, preserve);
      result.push({ type: -1, tag });
    } else if (node.nodeType === 3) {
      result.push({ type: 3, text: protectedCode || !node.rawText.trim() ? node.rawText : '<translated-text>' });
    } else {
      result.push({ type: node.nodeType, text: node.toString() });
    }
  }
  walk(parse(html));
  return result;
}

/**
 * Editorial adaptations allowed in the Arabic translation, each with a reason.
 * They exist because our interface differs from the original page, not to allow
 * silent omissions anywhere else in the text.
 */
const editorial = {
  'syntax-toggle-sentence': {
    source: /You can switch syntax highlighting on and off[\s\S]*?syntax<\/a> button\.[\s\S]*?<\/p>/,
    omission: '</p>',
    reason: 'الواجهة تعرض التلوين دائماً ولا تحتوي زر تبديل الصياغة.'
  }
};

/** Validate one fully translated module, preserving every source HTML node and code span.
 * @param {{Title: string, Description: string, Pages: Array<{Title: string, Content: string}>}} source
 * @param {{Title: string, Description: string, Pages: Array<{Title: string, Content: string}>}} translation
 * @param {string} id
 * @returns {{pages: number, paragraphs: number, lists: number, links: number, code: number}}
 */
export function validateTranslation(source, translation, id) {
  assert.deepEqual(Object.keys(translation).sort(), ['Description', 'Pages', 'Title'], `${id}: invalid module fields`);
  assert.equal(typeof translation.Title, 'string');
  assert.equal(typeof translation.Description, 'string');
  assert.ok(translation.Title.trim());
  assert.ok(translation.Description.trim());
  assert.equal(translation.Pages.length, source.Pages.length, `${id}: page omitted`);
  const counts = { pages: 0, paragraphs: 0, lists: 0, links: 0, code: 0 };
  translation.Pages.forEach((page, index) => {
    const location = `${id}/${index + 1}`;
    const keys = Object.keys(page).sort();
    const editorialKeys = Array.isArray(page.editorial) ? page.editorial : [];
    assert.deepEqual(
      keys.filter((key) => key !== 'editorial').sort(),
      ['Content', 'Title'],
      `${location}: invalid page fields`
    );
    assert.equal(typeof page.Title, 'string');
    assert.equal(typeof page.Content, 'string');
    assert.ok(page.Title.trim());
    for (const key of editorialKeys) {
      assert.ok(editorial[key], `${location}: unknown editorial rule ${key}`);
    }
    const adaptations = editorialKeys.map((key) => editorial[key]);
    const originalContent = adaptations.reduce(
      (text, rule) => text.replace(rule.source, rule.omission ?? ''),
      source.Pages[index].Content
    );
    const original = parse(originalContent);
    const arabic = parse(page.Content);
    assert.deepEqual(structure(page.Content), structure(originalContent), `${location}: omitted/changed HTML, code, link, or whitespace node`);
    assert.equal(arabic.querySelector('h2')?.textContent, page.Title, `${location}: heading differs from title`);
    assert.ok(/[\u0600-\u06ff]/.test(arabic.textContent), `${location}: missing Arabic translation`);
    // Every non-code prose node must have a nonempty counterpart, without English fallback.
    function prose(node, protectedCode = false, result = []) {
      const protectedChild = protectedCode || ['PRE', 'CODE'].includes(node.tagName);
      if (node.nodeType === 3 && node.rawText.trim() && !protectedCode) result.push(node.rawText);
      for (const child of node.childNodes || []) prose(child, protectedChild, result);
      return result;
    }
    const originalText = prose(original);
    const translatedText = prose(arabic);
    assert.equal(translatedText.length, originalText.length, `${location}: text node omitted`);
    originalText.forEach((text, textIndex) => {
      assert.ok(translatedText[textIndex].trim(), `${location}: empty translated paragraph`);
      if ((text.match(/[A-Za-z]{2,}/g) || []).length >= 4) {
        assert.notEqual(translatedText[textIndex].trim(), text.trim(), `${location}: English paragraph left untranslated`);
      }
    });
    counts.pages += 1;
    counts.paragraphs += arabic.querySelectorAll('p').length;
    counts.lists += arabic.querySelectorAll('li').length;
    counts.links += arabic.querySelectorAll('a').length;
    counts.code += arabic.querySelectorAll('pre, code').length;
  });
  return counts;
}
