import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import { validateTranslation } from './lib/validate-tour-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(await fs.readFile(path.join(root, 'src/lib/tour/source.json'), 'utf8'));
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const modules = ['welcome', 'basics', 'flowcontrol', 'moretypes', 'methods', 'generics', 'concurrency'];
const allowed = new Set(['h2', 'h3', 'p', 'pre', 'code', 'ul', 'ol', 'li', 'a', 'img', 'b', 'i', 'em', 'strong', 'br']);
const bookSection = (module, number) => `${base}/book/go-tour/${module}/${number === 1 ? 'index' : `p${number}`}/`;
function content(html, headingId = '', module = '', number = 1) {
  const document = parse(html);
  for (const element of document.querySelectorAll('*')) {
    const tag = element.tagName.toLowerCase();
    if (!allowed.has(tag)) { element.remove(); continue; }
    const href = element.getAttribute('href');
    const src = element.getAttribute('src');
    for (const attribute of Object.keys(element.attributes)) element.removeAttribute(attribute);
    if (tag === 'h2' && headingId) {
      element.setAttribute('id', headingId);
      headingId = '';
    }
    if (tag === 'a' && href) {
      if (href.startsWith('javascript:')) {
        const actions = [
          ['.next-page', 'next'], ['.prev-page', 'previous'], ['#run', 'run'],
          ['#format', 'format'], ['.syntax-checkbox', 'editor'], ['.logo', 'modules'], ['.nav', 'modules']
        ];
        const action = actions.find(([selector]) => href.includes(selector))?.[1];
        if (action) {
          const moduleIndex = modules.indexOf(module);
          const count = source[module]?.Pages.length || 0;
          const target = action === 'next'
            ? number < count ? bookSection(module, number + 1) : modules[moduleIndex + 1] ? bookSection(modules[moduleIndex + 1], 1) : `${base}/book/go-tour/`
            : action === 'previous'
              ? number > 1 ? bookSection(module, number - 1) : modules[moduleIndex - 1] ? bookSection(modules[moduleIndex - 1], source[modules[moduleIndex - 1]].Pages.length) : `${base}/book/go-tour/`
              : action === 'modules' ? `${base}/book/go-tour/` : `#tour-${action}`;
          element.setAttribute('href', target);
          element.setAttribute('data-tour-action', action);
        } else element.replaceWith(element.innerHTML);
        continue;
      }
      const lesson = href.match(/^\/tour\/([a-z]+)\/(\d+)$/);
      if (lesson) element.setAttribute('href', bookSection(lesson[1], Number(lesson[2])));
      else if (href === '/tour/list') {
        element.setAttribute('href', `${base}/book/go-tour/`);
        element.setAttribute('data-tour-action', 'modules');
      }
      else {
        const url = new URL(href, 'https://go.dev');
        if (url.protocol !== 'https:' && url.protocol !== 'http:') { element.replaceWith(element.innerHTML); continue; }
        element.setAttribute('href', url.href);
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');
      }
    }
    if (tag === 'img' && src) {
      const url = new URL(src, 'https://go.dev');
      if (url.protocol !== 'https:') { element.remove(); continue; }
      element.setAttribute('src', url.href);
      element.setAttribute('alt', 'رسم توضيحي من جولة Go الأصلية');
      element.setAttribute('loading', 'lazy');
    }
  }
  return document.toString();
}
const lessons = [];
const audit = { pages: 0, paragraphs: 0, lists: 0, links: 0, code: 0 };
for (const id of modules) {
  const lesson = source[id];
  if (!lesson) throw new Error(`Missing source module: ${id}`);
  const translation = JSON.parse(await fs.readFile(path.join(root, `src/lib/tour/translations/${id}.json`), 'utf8'));
  const counts = validateTranslation(lesson, translation, id);
  for (const [key, value] of Object.entries(counts)) audit[key] += value;
  lessons.push({ id, title: translation.Title, description: translation.Description, pages: lesson.Pages.map((page, index) => {
    const translated = translation.Pages[index];
    for (const file of page.Files) {
      if (!/^[\w.-]+\.go$/.test(file.Name) || typeof file.Content !== 'string') throw new Error(`Invalid code file in ${id}`);
    }
    return { title: translated.Title, translation: content(translated.Content, 'lesson-title', id, index + 1), originalTitle: page.Title, original: content(page.Content, '', id, index + 1), files: page.Files.map(({ Name, Content }) => ({ Name, Content })) };
  }) });
}
await fs.writeFile(path.join(root, 'src/lib/tour/lessons.json'), JSON.stringify(lessons, null, 2) + '\n');
await fs.copyFile(path.join(root, 'src/lib/tour/LICENSE'), path.join(root, 'static/go-tour-license.txt'));
console.log(`Go Tour full translation verified: ${JSON.stringify(audit)}, ${lessons.length} modules`);
