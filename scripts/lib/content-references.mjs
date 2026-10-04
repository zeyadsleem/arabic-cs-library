import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

/** Resolve declared Pandoc references using actual anchors, not unrelated source-site URLs.
 * @param {string} directory @param {string} book @param {string} base @returns {void}
 */
export function resolveBookReferences(directory, book, base) {
  const files = fs.readdirSync(directory).filter((name) => name.startsWith(`${book}__`) && name.endsWith('.json'));
  const pages = files.map((file) => {
    const content = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
    return { file, content, document: parse(content.html) };
  });
  const anchors = new Map();
  const mathmlText = (node) => {
    if (node.nodeType === 3) return node.textContent;
    const tag = (node.rawTagName || '').toLowerCase();
    if (tag === 'annotation') return '';
    const parts = (node.childNodes || [])
      .map((child) => [mathmlText(child).trim(), (child.rawTagName || '').toLowerCase() === 'mo'])
      .filter(([text]) => text !== '');
    let text = '';
    let operator = true;
    for (const [part, isOperator] of parts) {
      if (text !== '' && (operator || isOperator)) text += ' ';
      text += part;
      operator = isOperator;
    }
    return text;
  };
  const privateUse = /[\ue000-\uf8ff]/;
  const plainText = (element) => {
    const copy = element.clone();
    for (const rendered of copy.querySelectorAll('.katex')) {
      const html = rendered.querySelector('.katex-html');
      const mathml = rendered.querySelector('.katex-mathml');
      // KaTeX draws a few glyphs with CSS and leaves a private-use placeholder in
      // the HTML copy, so read the MathML instead whenever that happens.
      if (html && mathml && privateUse.test(html.textContent)) {
        rendered.innerHTML = mathmlText(mathml).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        continue;
      }
      rendered.querySelectorAll('.katex-mathml').forEach((node) => node.remove());
    }
    return copy.textContent.trim().replace(/\s+/g, ' ');
  };
  for (const page of pages) {
    for (const element of page.document.querySelectorAll('[id]')) {
      const id = element.getAttribute('id');
      if (anchors.has(id)) continue;
      let label = null;
      const heading = element.closest('h1, h2, h3, h4, h5, h6');
      if (heading) {
        label = plainText(heading);
      } else if (element.tagName === 'IMG') label = 'الشكل التوضيحي';
      else if (element.classList.contains('callout')) {
        const title = element.querySelector('strong');
        label = title ? plainText(title) : null;
      }
      else if (element.nextElementSibling?.classList.contains('katex-display')) label = 'المعادلة';
      anchors.set(id, { page, label });
    }
  }
  for (const page of pages) {
    let changed = false;
    for (const reference of page.document.querySelectorAll('[data-source-reference]')) {
      const id = reference.getAttribute('data-source-reference');
      const target = anchors.get(id);
      if (!target) continue;
      const href = target.page === page ? `#${id}` : `${base}/book/${book}/${target.page.content.chapter}/${target.page.content.slug}#${id}`;
      reference.setAttribute('href', href);
      if (target.label) reference.textContent = target.label;
      changed = true;
    }
    if (changed) {
      page.content.html = page.document.toString();
      fs.writeFileSync(path.join(directory, page.file), JSON.stringify(page.content));
    }
  }
}
