/** Publish the staged Better Auth documentation: Arabic where a translation exists,
 * English otherwise. Code blocks and link targets are never translated, so a
 * translation that touches them is rejected instead of shipped.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'better-auth';
const sourceDir = path.join(root, 'content-src', id);
const outputDir = path.join(root, 'content', id);
const translationsPath = path.join(root, 'content-src', `${id}-translations.json`);

const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

/** Fenced code as `[language, body]` pairs: the library renders code verbatim.
 * @param {string} markdown @returns {Array<[string, string]>}
 */
const codeFences = (markdown) => {
  const blocks = [];
  const lines = [];
  let open = null; // { char: '`', len: 3, info: 'ts' }
  for (const line of markdown.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (open) {
      if (marker && marker[1][0] === open.char && marker[1].length >= open.len && !marker[2].trim()) {
        blocks.push([open.info, lines.join('\n')]);
        open = null;
        lines.length = 0;
      } else lines.push(line);
      continue;
    }
    if (marker) open = { char: marker[1][0], len: marker[1].length, info: marker[2].trim() };
  }
  if (open) blocks.push([open.info, lines.join('\n')]);
  return blocks;
};

/** Every link target in document order: URLs and in-book anchors stay as they are.
 * @param {string} markdown @returns {string[]}
 */
const linkTargets = (markdown) => [...markdown.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);

/** @param {string} name @param {string} source @param {string} arabic @returns {string[]} */
const checkTranslation = (name, source, arabic) => {
  const problems = [];
  const sourceFences = codeFences(source);
  const arabicFences = codeFences(arabic);
  if (sourceFences.length !== arabicFences.length) {
    problems.push(`${name}: ${sourceFences.length} code blocks in the source, ${arabicFences.length} in the translation`);
  }
  for (const [index, [language, text]] of sourceFences.entries()) {
    if (!arabicFences[index]) break;
    if (language !== arabicFences[index][0]) problems.push(`${name}: code block ${index + 1} language changed`);
    if (text !== arabicFences[index][1]) problems.push(`${name}: code block ${index + 1} body changed`);
  }
  const sourceLinks = linkTargets(source).sort();
  const arabicLinks = linkTargets(arabic).sort();
  if (sourceLinks.join('\n') !== arabicLinks.join('\n')) {
    problems.push(`${name}: link targets changed (${sourceLinks.length} in the source)`);
  }
  return problems;
};

const sources = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith('.md'))
  .sort();

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const failures = [];
let translated = 0;

for (const file of sources) {
  const name = file.replace(/\.md$/, '');
  const { data, content } = matter(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
  const english = content.trim();
  const page = translations[name];
  let title = data.title;
  let body = english;
  let lang = 'en';

  if (page !== undefined) {
    const arabic = (typeof page === 'string' ? page : page.body ?? '').trim();
    if (!arabic) {
      failures.push(`${name}: translation is empty`);
      continue;
    }
    failures.push(...checkTranslation(name, english, arabic));
    // The reader navigates by the frontmatter title, so a translation may retitle
    // its page without the structure file changing with it.
    title = (typeof page === 'string' ? data.title : page.title) || data.title;
    body = arabic;
    lang = 'ar';
    translated += 1;
  }

  fs.writeFileSync(
    path.join(outputDir, file),
    `---\ntitle: ${JSON.stringify(title)}\nlang: ${lang}\nchapter: ${data.chapter}\nslug: ${data.slug}\norder: ${data.order}\nsource: ${data.source}\n---\n\n${body}\n`
  );
}

console.log(`${id}: ${sources.length} pages (${translated} Arabic, ${sources.length - translated} English)`);
for (const failure of failures) console.log(`- ${failure}`);
if (failures.length) process.exitCode = 1;
