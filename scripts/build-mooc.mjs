/** Build MOOC Arabic pages from staged English source (page-level translation).
 *
 * Reads content-src/mooc-translations.json = { "<chapter>--<slug>": { title, body } }
 * where body is the FULL Arabic markdown body for that page.
 * Validates: (1) equal number of fenced code blocks, (2) each block's language and body
 * byte-identical, (3) identical sorted set of inline link targets ](...).
 * Writes content/mooc/*.md with lang: ar|en and content/mooc-structure.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content-src', 'mooc');
const outputDir = path.join(root, 'content', 'mooc');
const structurePath = path.join(root, 'content', 'mooc-structure.json');
const translationsPath = path.join(root, 'content-src', 'mooc-translations.json');

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const isFenceEnd = (line, fence) => {
  const closer = line.match(FENCE);
  return Boolean(closer) && closer[1][0] === fence[0] && closer[1].length >= fence.length && !closer[2].trim();
};

/** Extract code fences: [{ lang, body }] */
function codeFences(markdown) {
  const fences = [];
  const lines = markdown.split('\n');
  let fence = null;
  let body = [];
  for (const line of lines) {
    const marker = line.match(FENCE);
    if (!fence && marker) {
      fence = { char: marker[1][0], len: marker[1].length, info: marker[2].trim() };
      body = [];
      continue;
    }
    if (fence) {
      if (isFenceEnd(line, fence)) {
        fences.push({ lang: fence.info, body: body.join('\n') });
        fence = null;
      } else {
        body.push(line);
      }
      continue;
    }
  }
  return fences;
}

/** Extract inline link targets: sorted unique ](url) destinations. */
function linkTargets(markdown) {
  const targets = new Set();
  const regex = /\]\(([^)]+)\)/g;
  for (const match of markdown.matchAll(regex)) {
    targets.add(match[1].trim());
  }
  return Array.from(targets).sort();
}

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error('missing frontmatter');
  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 1) continue;
    const value = line.slice(separator + 1).trim();
    data[line.slice(0, separator).trim()] = value.startsWith('"') ? JSON.parse(value) : value;
  }
  return { data, body: raw.slice(match[0].length) };
};

/** Chapter definitions with Arabic titles. */
const MOOC_CHAPTERS = [
  { key: 'part-1', title: 'Part 1: Getting Started', titleAr: 'الجزء 1: البدء' },
  { key: 'part-2', title: 'Part 2: Conditional Statements', titleAr: 'الجزء 2: الجمل الشرطية' },
  { key: 'part-3', title: 'Part 3: Loops', titleAr: 'الجزء 3: الحلقات' },
  { key: 'part-4', title: 'Part 4: Functions and Lists', titleAr: 'الجزء 4: الدوال والقوائم' },
  { key: 'part-5', title: 'Part 5: Data Structures', titleAr: 'الجزء 5: هياكل البيانات' },
  { key: 'part-6', title: 'Part 6: Files and Errors', titleAr: 'الجزء 6: الملفات والأخطاء' },
  { key: 'part-7', title: 'Part 7: Modules', titleAr: 'الجزء 7: الوحدات' },
  { key: 'part-8', title: 'Part 8: Objects and Classes', titleAr: 'الجزء 8: الكائنات والصنوف' },
  { key: 'part-9', title: 'Part 9: More Objects', titleAr: 'الجزء 9: المزيد عن الكائنات' },
  { key: 'part-10', title: 'Part 10: Class Hierarchies', titleAr: 'الجزء 10: تراكيب الأصناف' },
  { key: 'part-11', title: 'Part 11: Advanced Features', titleAr: 'الجزء 11: ميزات متقدمة' },
  { key: 'part-12', title: 'Part 12: Functional Programming', titleAr: 'الجزء 12: البرمجة الدالية' },
  { key: 'part-13', title: 'Part 13: Games with Pygame', titleAr: 'الجزء 13: الألعاب مع Pygame' },
  { key: 'part-14', title: 'Part 14: Game Project', titleAr: 'الجزء 14: مشروع اللعبة' },
  { key: 'auxiliary', title: 'Auxiliary Pages', titleAr: 'صفحات مساعدة' },
];

const main = () => {
  if (!fs.existsSync(translationsPath)) fs.writeFileSync(translationsPath, '{}\n');
  const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

  // Build structure skeleton
  const structure = { chapters: MOOC_CHAPTERS.map(c => ({ key: c.key, title: c.title, titleAr: c.titleAr, sections: [] })) };

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const report = { pages: 0, arabic: 0, english: 0, problems: [] };
  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.md')).sort();

  for (const file of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
    const key = `${data.chapter}--${data.slug}`;
    const entry = translations[key];
    const title = typeof entry?.title === 'string' && entry.title.trim() ? entry.title.trim() : data.title;
    const lang = entry ? 'ar' : 'en';
    let output = body;

    if (entry) {
      // Validate code fences
      const srcFences = codeFences(body);
      const tgtFences = codeFences(entry.body);
      if (srcFences.length !== tgtFences.length) {
        report.problems.push(`${key}: code fence count mismatch (src=${srcFences.length}, tgt=${tgtFences.length})`);
      } else {
        for (let i = 0; i < srcFences.length; i++) {
          if (srcFences[i].lang !== tgtFences[i].lang) {
            report.problems.push(`${key}: fence ${i} lang mismatch (src=${srcFences[i].lang}, tgt=${tgtFences[i].lang})`);
          }
          if (srcFences[i].body !== tgtFences[i].body) {
            report.problems.push(`${key}: fence ${i} body differs`);
          }
        }
      }

      // Validate link targets (warn only, don't fail)
      const srcLinks = linkTargets(body);
      const tgtLinks = linkTargets(entry.body);
      if (JSON.stringify(srcLinks) !== JSON.stringify(tgtLinks)) {
        report.problems.push(`WARNING ${key}: link targets differ (src=${srcLinks.length}, tgt=${tgtLinks.length})`);
      }

      output = entry.body;
      report.arabic += 1;
    } else {
      report.english += 1;
    }

    fs.writeFileSync(
      path.join(outputDir, file),
      `---\ntitle: ${JSON.stringify(title)}\nlang: ${lang}\nsource: ${JSON.stringify(data.source || '')}\n---\n\n${output.trim()}\n`
    );
    report.pages += 1;

    for (const chapter of structure.chapters) {
      if (chapter.key !== data.chapter) continue;
      let section = chapter.sections.find((s) => s.slug === data.slug);
      if (!section) {
        section = { slug: data.slug, title, order: data.order };
        chapter.sections.push(section);
      } else {
        section.title = title;
      }
    }
  }

  // Sort sections by order
  for (const chapter of structure.chapters) {
    chapter.sections.sort((a, b) => a.order - b.order);
  }

  fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);
  console.log(`mooc: ${report.pages} pages (${report.arabic} Arabic, ${report.english} English)`);
  if (report.problems.length) {
    console.warn('VALIDATION WARNINGS:');
    for (const p of report.problems) console.warn('  -', p);
    // Don't exit on warnings
  }
};

main();