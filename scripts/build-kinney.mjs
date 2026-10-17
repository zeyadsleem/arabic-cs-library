/** Build the published kinney pages from the staged English source.
 *
 * `content-src/kinney/<course>--<lesson>.md` holds the untouched English body and
 * `content-src/kinney-translations/<course>--<lesson>.md` holds the Arabic page,
 * same file name, with the Arabic title in its frontmatter. A page is emitted with
 * `lang: ar` once its translation exists and passes every rule in
 * `translation-rules.mjs`; otherwise the English body is published with
 * `lang: en`, so the book stays buildable for the whole translation period and
 * `scripts/check-kinney.mjs` is the gate that refuses to call a page done.
 *
 * Same-page anchors need help: a heading's slug comes from its text, so an English
 * fragment such as `#utility-types` stops resolving the moment the heading is
 * translated. Every fragment a page links to is therefore written next to the
 * heading that titles it, exactly as `scripts/build-mooc.mjs` does.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugifyHeading } from './lib/content-markup.mjs';
import {
  linkTargets,
  readTranslation,
  sourceDirectory,
  stagedPages,
  translationsDirectory,
  validatePageTranslation,
} from './lib/kinney-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'content', 'kinney');
const structurePath = path.join(root, 'content', 'kinney-structure.json');

const FENCE_LINE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const HEADING_LINE = /^(#{1,6})[ \t]+(.*?)[ \t]*$/;
const ATTRIBUTE_BLOCK = /\{[#.][^}\n]*\}/;

/** Headings outside fenced and indented code, in document order.
 * Some pages quote terminal output whose lines start with `#`, so code has to be
 * skipped or the heading pairing shifts by one.
 * @param {string} markdown @returns {Array<{line: number, level: number, text: string}>}
 */
const collectHeadings = (markdown) => {
  const headings = [];
  let fence = null;
  markdown.split('\n').forEach((line, index) => {
    const marker = line.match(FENCE_LINE);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      return;
    }
    if (marker) {
      fence = marker[1];
      return;
    }
    if (/^(?: {4}|\t)/.test(line)) return;
    const heading = line.match(HEADING_LINE);
    if (!heading) return;
    headings.push({
      line: index,
      level: heading[1].length,
      text: heading[2].replace(ATTRIBUTE_BLOCK, '').replace(/`[^`]*`/g, '').trim(),
    });
  });
  return headings;
};

/** The slug of each heading, in order, with repeats numbered the way GitHub does.
 * @param {Array<{text: string}>} headings @returns {string[]}
 */
const headingSlugs = (headings) => {
  const seen = new Map();
  return headings.map((heading) => {
    const base = slugifyHeading(heading.text);
    if (!base) return '';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  });
};

/** Every `#fragment` the pages link to. All Kinney links are absolute URLs to the
 * book's own site, so a fragment is the only in-page reference there is.
 * @param {Array<{body: string}>} pages @returns {Set<string>}
 */
const samePageAnchors = (pages) => {
  const anchors = new Set();
  for (const page of pages) {
    for (const target of linkTargets(page.body)) {
      const hash = target.indexOf('#');
      if (hash !== -1 && hash < target.length - 1) anchors.add(target.slice(hash + 1));
    }
  }
  return anchors;
};

/** Write the anchor a link names onto the translated heading it titles.
 * @param {string} translated @param {string} source @param {Set<string>} anchors
 * @returns {{body: string, attached: Set<string>}}
 */
const restoreAnchors = (translated, source, anchors) => {
  const attached = new Set();
  const english = collectHeadings(source);
  const arabic = collectHeadings(translated);
  if (english.length !== arabic.length) return { body: translated, attached };

  const slugs = headingSlugs(english);
  const lines = translated.split('\n');
  english.forEach((heading, position) => {
    const slug = slugs[position];
    if (!slug || heading.level !== arabic[position].level || !anchors.has(slug)) return;
    const line = lines[arabic[position].line];
    if (ATTRIBUTE_BLOCK.test(line)) return;
    lines[arabic[position].line] = `${line.replace(/[ \t]+$/, '')} {#${slug}}`;
    attached.add(slug);
  });
  return { body: lines.join('\n'), attached };
};

const main = () => {
  const pages = stagedPages(sourceDirectory(root));
  const anchors = samePageAnchors(pages);
  const resolved = new Set();
  const structure = JSON.parse(fs.readFileSync(structurePath, 'utf8'));

  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });

  const report = { pages: 0, arabic: 0, english: 0, invalid: [], misaligned: [] };

  for (const page of pages) {
    const translation = readTranslation(translationsDirectory(root), page.key);
    let body = page.body;
    let title = page.title;
    let lang = 'en';

    if (translation) {
      const problems = validatePageTranslation(page.key, page.body, translation);
      if (problems.length) {
        report.invalid.push({ key: page.key, problems });
      } else {
        const restored = restoreAnchors(translation.body.trim(), page.body, anchors);
        if (restored.attached.size === 0 && samePageAnchors([page]).size) report.misaligned.push(page.key);
        for (const slug of restored.attached) resolved.add(slug);
        body = restored.body;
        title = translation.title;
        lang = 'ar';
      }
    }

    if (lang === 'ar') report.arabic += 1;
    else report.english += 1;

    fs.writeFileSync(
      path.join(outputDirectory, `${page.key}.md`),
      `---\ntitle: ${JSON.stringify(title)}\nlang: ${lang}\nsource: ${JSON.stringify(page.source)}\n---\n\n${body.trim()}\n`
    );
    report.pages += 1;

    for (const chapter of structure.chapters) {
      if (chapter.key !== page.chapter) continue;
      const section = chapter.sections.find((item) => item.slug === page.slug);
      if (section) section.title = title;
    }
  }

  fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);
  console.log(`kinney: ${report.pages} pages (${report.arabic} Arabic, ${report.english} English)`);
  for (const { key, problems } of report.invalid) {
    console.warn(`kinney: ${key} is not valid Arabic yet, published in English`);
    for (const problem of problems) console.warn(`  - ${problem}`);
  }
  const unattached = [...anchors].filter((anchor) => !resolved.has(anchor));
  if (unattached.length) {
    console.warn(`kinney: ${unattached.length} anchor(s) no heading answers: ${unattached.join(', ')}`);
  }
};

main();
