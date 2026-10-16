/** Publish the MOOC course: Arabic where a translation exists, English otherwise.
 *
 * Translations live one file per page in `content-src/mooc-translations/`. A page
 * is published in Arabic only when its translation passes every rule in
 * `scripts/lib/mooc-translation.mjs`; anything else stays English and is reported.
 * The script exits non-zero until all 89 pages are translated and valid, so a
 * course can never ship half translated or with a corrupt page inside it.
 *
 * The English sources carry the course site's own root-relative links
 * (`/part-4/3-lists#removing-items-from-a-list`). The reader serves every page
 * under `/book/mooc/`, so publishing rewrites each destination to that shape and
 * writes the anchor a link names next to the heading it titles — the translated
 * heading's own slug is Arabic and would never answer an English fragment.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { outsideCode, slugifyHeading } from './lib/content-markup.mjs';
import {
  MOOC_CHAPTERS,
  linkTargets,
  readTranslation,
  stagedPages,
  translationsDirectory,
  validatePageTranslation,
} from './lib/mooc-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(root, 'content-src', 'mooc');
const outputDirectory = path.join(root, 'content', 'mooc');
const structurePath = path.join(root, 'content', 'mooc-structure.json');
const translationsDirectoryPath = translationsDirectory(root);

const FENCE_LINE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const HEADING_LINE = /^(#{1,6})[ \t]+(.*?)[ \t]*$/;
const ATTRIBUTE_BLOCK = /\{[#.][^}\n]*\}/;

/** The importer writes these where the course site renders a component; the
 * build replaces them with the real list, so no placeholder ever publishes. */
const PAGES_MARKER = '*سيتم عرض قائمة الصفحات في هذا القسم هنا.*';
const EXERCISES_MARKER = '*سيتم عرض قائمة التمارين في هذا القسم هنا.*';
const ALL_EXERCISES_MARKER = '*سيتم عرض قائمة جميع التمارين هنا.*';
const TOC_MARKER = '*جدول المحتويات*';
const EXERCISE_MARKER = /^> \*\*(تمرين برمجي|تمرين تفاعلي)(?:: (.*?))?\*\*[ \t]*$/gm;

/** Headings outside fenced and indented code, in document order.
 * The Python samples here are full of `# comment` lines, and reading one as a
 * heading would shift every later pairing by one.
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

/** Every in-book anchor a link points at, without the `#`.
 * External links carry fragments too (`…/random.html#random.randint`), and those
 * belong to the other site; only `#same-page` and `/root-relative#fragment` count.
 * @param {Array<{body: string}>} pages @returns {Set<string>}
 */
const linkedAnchors = (pages) => {
  const anchors = new Set();
  for (const page of pages) {
    for (const target of linkTargets(page.body)) {
      const internal = target.startsWith('#') || (target.startsWith('/') && !target.startsWith('//'));
      const hash = target.indexOf('#');
      if (internal && hash !== -1 && hash < target.length - 1) anchors.add(target.slice(hash + 1));
    }
  }
  return anchors;
};

/** The route of every page, plus the hyphen/underscore alias a link may use:
 * the course writes `part-2/1-programming-terminology` and the page is slugged
 * `part-2/1-programming_terminology`.
 * @param {Array<{chapter: string, slug: string}>} pages
 * @returns {{routes: Map<string, string>, hyphenated: Map<string, string>}}
 */
const linkRoutes = (pages) => {
  const routes = new Map();
  for (const page of pages) routes.set(`${page.chapter}/${page.slug}`, `${page.chapter}/${page.slug}`);
  const hyphenated = new Map([...routes.keys()].map((route) => [route.replace(/_/g, '-'), route]));
  return { routes, hyphenated };
};

/** Where a root-relative course link lands in the reader.
 * @param {string} target path, without a query
 * @param {{routes: Map<string, string>, hyphenated: Map<string, string>}} index
 * @returns {string | null} the route, or null when the book serves nothing there
 */
const resolveRoute = (target, index) => {
  const clean = target.replace(/^\/+|\/+$/g, '');
  return (
    index.routes.get(clean)
    ?? index.hyphenated.get(clean)
    ?? (index.routes.has(`${clean}/index`) ? `${clean}/index` : null)
    ?? (index.routes.has(`auxiliary/${clean}`) ? `auxiliary/${clean}` : null)
  );
};

/** Rewrite the course site's root-relative link destinations to reader routes.
 * @param {string} markdown @param {ReturnType<typeof linkRoutes>} index
 * @returns {{body: string, unresolved: string[]}}
 */
const rewriteLinks = (markdown, index) => {
  const unresolved = [];
  const body = outsideCode(markdown, (text) =>
    text.replace(/\]\(\s*([^)\s]+)([^)]*)\)/g, (match, target, rest) => {
      if (!target.startsWith('/') || target.startsWith('//')) return match;
      if (target.startsWith('/images/') || target.startsWith('/book/')) return match;
      const hash = target.indexOf('#');
      const route = resolveRoute(hash === -1 ? target : target.slice(0, hash), index);
      if (!route) {
        unresolved.push(target);
        return match;
      }
      return `](/book/mooc/${route}${hash === -1 ? '' : target.slice(hash)}${rest})`;
    })
  );
  return { body, unresolved };
};

/** Write the anchor a link names onto the translated heading it titles.
 * The translated heading's own slug is Arabic, so an English fragment only
 * resolves once the source heading's slug is written next to it.
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

/** The exercises a page announces, in document order. */
const pageExercises = (body) => {
  const exercises = [];
  for (const match of body.matchAll(EXERCISE_MARKER)) {
    exercises.push({ kind: match[1], name: (match[2] ?? '').trim() });
  }
  return exercises;
};

/** The path a reader follows to a page. */
const pageRoute = (page) => `/book/mooc/${page.chapter}/${page.slug}`;

/** The pages of a chapter, in reading order, linked by their Arabic titles. */
const pagesList = (entries) =>
  [...entries]
    .filter((entry) => entry.page.slug !== 'index')
    .sort((a, b) => a.page.order - b.page.order)
    .map((entry) => `- [${entry.title}](${pageRoute(entry.page)})`);

/** Every exercise a chapter holds, in reading order, linked to its page. */
const exerciseList = (entries) => {
  const lines = [];
  for (const entry of [...entries].sort((a, b) => a.page.order - b.page.order)) {
    for (const exercise of pageExercises(entry.body)) {
      lines.push(`- [${exercise.name || exercise.kind}](${pageRoute(entry.page)})`);
    }
  }
  return lines;
};

/** Every exercise in the book, grouped by part. */
const allExercises = (entries) => {
  const lines = [];
  for (const chapter of MOOC_CHAPTERS) {
    const list = exerciseList(entries.filter((entry) => entry.page.chapter === chapter.key));
    if (!list.length) continue;
    if (lines.length) lines.push('');
    lines.push(`**${chapter.titleAr}:**`, '', ...list);
  }
  return lines;
};

/** Links to a page's own headings, using the ids the reader mints for them. */
const tableOfContents = (body) =>
  collectHeadings(body)
    .filter((heading) => heading.level === 2 || heading.level === 3)
    .map((heading) => ({ text: heading.text, id: slugifyHeading(heading.text) }))
    .filter((heading) => heading.id)
    .map((heading) => `- [${heading.text}](#${heading.id})`);

/** A labelled block, or nothing at all when the list is empty. */
const withLabel = (label, lines) => (lines.length ? [label, '', ...lines] : []);

/** Replace a whole placeholder line with the list built for it. */
const replaceMarker = (body, marker, replacement) => {
  const output = [];
  for (const line of body.split('\n')) {
    if (line.trim() === marker) output.push(...replacement);
    else output.push(line);
  }
  return output.join('\n');
};

const main = () => {
  const pages = stagedPages(sourceDirectory);
  const index = linkRoutes(pages);
  const anchors = linkedAnchors(pages);
  const attachedAnchors = new Set();
  const unresolvedLinks = [];
  const structure = {
    chapters: MOOC_CHAPTERS.map((chapter) => ({
      key: chapter.key,
      title: chapter.title,
      titleAr: chapter.titleAr,
      sections: [],
    })),
  };

  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });

  const pending = [];
  const failures = [];
  const translated = [];
  const resolved = [];

  // First pass: validate and prepare every page, so the generated lists can see
  // the whole book (a chapter's exercise list spans its other pages).
  for (const page of pages) {
    const translation = readTranslation(translationsDirectoryPath, page.key);
    let title = page.title;
    let lang = 'en';
    let body = page.body;

    if (!translation) {
      pending.push(page.key);
    } else {
      const problems = validatePageTranslation(page.key, page.body, translation);
      if (problems.length) {
        failures.push(problems);
      } else {
        const rewritten = rewriteLinks(translation.body, index);
        unresolvedLinks.push(...rewritten.unresolved);
        const anchored = restoreAnchors(rewritten.body, page.body, anchors);
        for (const anchor of anchored.attached) attachedAnchors.add(anchor);
        title = translation.title;
        lang = 'ar';
        body = anchored.body;
        translated.push(page.key);
      }
    }

    resolved.push({ page, title, lang, body });
  }

  const pagesByChapter = new Map();
  for (const entry of resolved) {
    const entries = pagesByChapter.get(entry.page.chapter) ?? [];
    entries.push(entry);
    pagesByChapter.set(entry.page.chapter, entries);
  }

  // Second pass: the importer leaves a marker line where the course site renders
  // a component. Put the real list in its place and publish. Only the published
  // output changes, so the translated sources stay exactly as they were.
  for (const entry of resolved) {
    const chapterEntries = pagesByChapter.get(entry.page.chapter) ?? [];
    let body = entry.body;

    body = replaceMarker(body, PAGES_MARKER, withLabel('**صفحات هذا القسم:**', pagesList(chapterEntries)));
    body = replaceMarker(body, EXERCISES_MARKER, withLabel('**تمارين هذا القسم:**', exerciseList(chapterEntries)));
    body = replaceMarker(body, ALL_EXERCISES_MARKER, allExercises(resolved));
    body = replaceMarker(body, TOC_MARKER, tableOfContents(body));

    fs.writeFileSync(
      path.join(outputDirectory, `${entry.page.chapter}--${entry.page.slug}.md`),
      `---\ntitle: ${JSON.stringify(entry.title)}\nlang: ${entry.lang}\nsource: ${JSON.stringify(entry.page.source)}\n---\n\n${body.trim()}\n`
    );

    const chapter = structure.chapters.find((item) => item.key === entry.page.chapter);
    chapter?.sections.push({ slug: entry.page.slug, title: entry.title, order: entry.page.order });
  }

  for (const chapter of structure.chapters) {
    chapter.sections.sort((a, b) => a.order - b.order);
  }
  fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);

  const orphans = fs.existsSync(translationsDirectoryPath)
    ? fs
        .readdirSync(translationsDirectoryPath)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''))
        .filter((key) => !pages.some((page) => page.key === key))
    : [];

  console.log(`mooc: ${pages.length} pages (${translated.length} Arabic, ${pending.length} untranslated)`);
  const grouped = new Map();
  for (const key of pending) {
    const chapter = key.split('--')[0];
    if (!grouped.has(chapter)) grouped.set(chapter, []);
    grouped.get(chapter).push(key.split('--')[1]);
  }
  for (const [chapter, slugs] of grouped) {
    console.log(`  pending ${chapter}: ${slugs.join(', ')}`);
  }
  const missingAnchors = [...anchors].filter((anchor) => !attachedAnchors.has(anchor));
  if (missingAnchors.length) {
    console.log(
      `  anchors no heading answers (broken on the course site too): ${missingAnchors.join(', ')}`
    );
  }
  for (const problems of failures) {
    console.error('INVALID TRANSLATION:');
    for (const problem of problems) console.error('  -', problem);
  }
  for (const target of new Set(unresolvedLinks)) {
    console.error(`mooc: link target not served by the book: ${target}`);
  }
  if (orphans.length) {
    console.error(`unknown translation files: ${orphans.join(', ')}`);
  }

  const problemsTotal =
    failures.reduce((sum, problems) => sum + problems.length, 0)
    + orphans.length
    + new Set(unresolvedLinks).size;
  if (pending.length || problemsTotal) {
    console.error(
      `mooc incomplete: ${pending.length} untranslated, ${failures.length} invalid — the book is published only when every page is translated and valid.`
    );
    process.exit(1);
  }
};

main();
