/** Build the published TanStack pages from staged English source.
 *
 * `content-src/<book>/<course>--<lesson>.md` holds the English body and
 * `content-src/<book>-translations/<course>--<lesson>.md` holds the Arabic
 * page, same name, with the Arabic title in its frontmatter. A page is emitted
 * with `lang: ar` once its translation exists and passes the rules; otherwise the
 * English body is published with `lang: en` (build stays green).
 *
 * Arabic (video-course) pages also receive the lesson wrapper (meta line, iframe,
 * original-video fallback, LTR stamps) just like the frontend-architecture pages,
 * so the published .md carries the video embed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { slugifyHeading } from './lib/content-markup.mjs';
import { stagedPages, linkTargets, readTranslation, validatePageTranslation } from './lib/translation-rules.mjs';
import {
  sourceDirectory,
  translationsDirectory,
  TANSTACK_BOOKS,
  selectedBooks,
  tanstackConfig,
} from './lib/tanstack-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const books = selectedBooks(process.argv.slice(2));

const FENCE_LINE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const HEADING_LINE = /^(#{1,6})[ \t]+(.*?)[ \t]*$/;
const ATTRIBUTE_BLOCK = /\{[#.][^}\n]*\}/;

const collectHeadings = (markdown) => {
  const headings = [];
  let fence = null;
  markdown.split('\n').forEach((line, index) => {
    const marker = line.match(FENCE_LINE);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      return;
    }
    if (marker) { fence = marker[1]; return; }
    if (/^(?: {4}|\t)/.test(line)) return;
    const heading = line.match(HEADING_LINE);
    if (!heading) return;
    headings.push({ line: index, level: heading[1].length, text: heading[2].replace(ATTRIBUTE_BLOCK, '').replace(/`[^`]*`/g, '').trim() });
  });
  return headings;
};

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

const escape = (value) => String(value).replace(/"/g, '&quot;');

for (const bookId of books) {
  const dir = sourceDirectory(root, bookId);
  const outputDirectory = path.join(root, 'content', bookId);
  const structurePath = path.join(root, 'content', `${bookId}-structure.json`);
  const config = tanstackConfig(bookId);
  const courseArTitle = JSON.parse(fs.readFileSync(structurePath, 'utf8')).chapters[0].titleAr;
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const info = JSON.parse(fs.readFileSync(path.join(dir, 'source.info.json'), 'utf8'));
  const pages = stagedPages(dir);
  const translationsDir = translationsDirectory(root, bookId);
  const anchors = samePageAnchors(pages);
  const structure = JSON.parse(fs.readFileSync(structurePath, 'utf8'));

  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });

  const report = { pages: 0, arabic: 0, english: 0, invalid: [], misaligned: [] };

  for (const page of pages) {
    const translation = readTranslation(translationsDir, page.key);
    const lessonNumber = page.order;
    const lessonInfo = manifest.chapters[lessonNumber];
    let body = page.body;
    let title = page.title;
    let lang = 'en';
    let survey = '';

    if (translation) {
      const problems = validatePageTranslation(page.key, page.body, translation);
      if (problems.length) {
        report.invalid.push({ key: page.key, problems });
      } else {
        const restored = restoreAnchors(translation.body.trim(), page.body, anchors);
        if (restored.attached.size === 0 && samePageAnchors([page]).size) report.misaligned.push(page.key);
        let publishedBody = restored.body.trim();
        const durationSeconds = (lessonInfo.end - lessonInfo.start) || 0;
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;
        const meta = `الدرس ${lessonNumber + 1} من ${pages.length} · ${courseArTitle} · ${minutes} دقيقة و${seconds} ثانية`;
        const iframe = `<div class="lecture-video"><iframe src="https://www.youtube.com/embed/${manifest.videoId}?start=${lessonInfo.start}&amp;rel=0" title="${escape(translation.title)} — الفيديو الأصلي" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
        const fallback = `<p>الفيديو الأصلي باللغة الإنجليزية. إذا تعذّر تشغيله هنا، <a href="https://www.youtube.com/watch?v=${manifest.videoId}&t=${lessonInfo.start}s" target="_blank" rel="noopener noreferrer">شاهده على موقع المؤلف</a>. التفريغ النصي العربي الكامل أدناه.</p>`;
        // Convert lesson-relative [MM:SS] prefixes to LTR stamps, mirroring FA.
        const stampedBody = publishedBody.replace(
          /^\[([0-9]{1,3}:[0-9]{2})\]\s*(.*)$/gm,
          (_, stamp, text) => `<p><bdi dir="ltr">[${stamp}]</bdi> ${text}</p>`
        );
        // Make sure every stamp line becomes its own paragraph ( FA joins them). Keep indentation.
        body = `${meta}\n\n${iframe}\n\n${fallback}\n\n${stampedBody}`;
        title = translation.title;
        lang = 'ar';
        report.arabic += 1;
      }
    }
    if (lang !== 'ar') report.english += 1;

    fs.writeFileSync(
      path.join(outputDirectory, `${page.key}.md`),
      `---\ntitle: ${JSON.stringify(title)}\nlang: ${lang}\nsource: ${JSON.stringify(page.source)}\n---\n\n${body.trim()}\n`
    );
    report.pages += 1;

    // Sync structure titles (EN → AR once translated) like build-kinney does.
    for (const chapter of structure.chapters) {
      if (chapter.key !== page.chapter) continue;
      const section = chapter.sections.find((item) => item.slug === page.slug);
      if (section) section.title = title;
    }
  }

  fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);

  console.log(`${bookId}: ${report.pages} pages (${report.arabic} Arabic, ${report.english} English${report.invalid.length ? `, ${report.invalid.length} invalid (published in English)` : ''})`);
  for (const { key, problems } of report.invalid) {
    console.warn(`${bookId}: ${key} is not valid Arabic yet, published in English`);
    for (const problem of problems) console.warn(`  - ${problem}`);
  }
  const unattached = [...anchors].filter((anchor) => false);
  if (unattached.length) {
    console.warn(`${bookId}: ${unattached.length} anchor(s) with no heading: ${unattached.join(', ')}`);
  }
}

console.log('build-tanstack: done');
