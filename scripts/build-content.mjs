import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import footnotes from 'markdown-it-footnote';
import hljs from 'highlight.js';
import { installContentMath } from './lib/content-math.mjs';
import { normalizeSourceMarkup, installSourceAttributes, outsideCode, readCallout, readCodeBlockCallout, readHeadingCallout } from './lib/content-markup.mjs';
import { createImageResolver } from './lib/content-images.mjs';
import { resolveBookReferences } from './lib/content-references.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const generatedDir = path.join(root, 'src', 'lib', 'generated');

const library = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'library.json'), 'utf8')
);
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
const resolveImages = createImageResolver(path.join(contentDir, 'image-assets.json'), basePath);

const withBasePath = (html) => {
  if (!basePath) return html;
  return html.replace(/(href|src)\s*=\s*"(\s*)(\/[^"]*)"/g, (match, attribute, space, value) => {
    if (value.startsWith(`${basePath}/`)) return match;
    return `${attribute}="${space}${basePath}${value}"`;
  });
};

const learningPath = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'learning-path.json'), 'utf8')
);

const markdown = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: false,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true })
          .value;
      } catch (e) {
        return '';
      }
    }
    return '';
  },
});
markdown.use(footnotes);

const slugifyHeading = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const addHeadingIds = (html) =>
  html.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h\1>/gs,
    (match, level, attrs, inner) => {
      if (/id=/.test(attrs)) return match;
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const id = slugifyHeading(text);
      if (!id) return match;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );

const mathErrors = [];
let currentSection = '';
installContentMath(markdown, {
  onError: (tex, error) => mathErrors.push({ section: currentSection, tex, error: error.message })
});
installSourceAttributes(markdown);

const calloutLabels = {
  exercise: 'تمرين',
  solvedexercise: 'تمرين محلول',
  solution: 'الحل',
  remark: 'ملاحظة',
  quote: 'اقتباس',
  recap: 'خلاصة',
  pause: 'توقّف وتأمّل',
  note: 'ملاحظة',
  nonmath: '',
  important: 'مهم',
  warning: 'تحذير',
  tip: 'تلميح',
  theorem: 'مبرهنة', definition: 'تعريف', lemma: 'لمّة',
  proof: 'برهان', example: 'مثال', algorithm: 'خوارزمية', claim: 'ادّعاء',
};

/** @param {string} info @returns {{kind: string, id: string, heading: string, open: string}} */
const describeCallout = (info) => {
  const classes = [...info.matchAll(/\.([a-z-]+)/g)].map((match) => match[1]);
  const kind = classes.find((name) => name in calloutLabels) ?? classes[0] ?? 'note';
  const id = info.match(/(?:^|\s)#([\w:.-]+)/)?.[1] ?? '';
  const title = (info.match(/title="((?:\\.|[^"\\])*)"/)?.[1] || '').trim();
  const heading = [calloutLabels[kind] ?? '', title].filter(Boolean).join(' — ');
  return { kind, id, heading, open: `<div class="callout callout--${kind}"${id ? ` id="${id}"` : ''}>` };
};

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;

/** Pandoc callouts written as fenced code blocks carry a title and anchor that markdown-it drops.
 * Re-express them as ::: callouts so the shared conversion below labels and anchors them.
 * @param {string} markdown @returns {string}
 */
const wrapCodeBlockCallouts = (markdown) => {
  const lines = markdown.split('\n');
  const out = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const opener = line.match(FENCE);
    const callout = opener ? readCodeBlockCallout(opener[2]) : null;
    if (!callout) {
      out.push(line);
      index += 1;
      continue;
    }
    let end = index + 1;
    while (end < lines.length && !isFenceEnd(lines[end], opener[1])) end += 1;
    if (end >= lines.length) {
      out.push(line);
      index += 1;
      continue;
    }
    const indent = line.slice(0, line.length - line.trimStart().length);
    out.push(`::: {${callout.info}}`, '', `${indent}${opener[1]}${callout.lang}`, ...lines.slice(index + 1, end + 1), '', ':::');
    index = end + 1;
  }
  return out.join('\n');
};

/** @param {string} line @param {string} fence @returns {boolean} */
const isFenceEnd = (line, fence) => {
  const closer = line.match(FENCE);
  return Boolean(closer) && closer[1][0] === fence[0] && closer[1].length >= fence.length && !closer[2].trim();
};

/** A blockquoted callout heading is followed by its body without a closing marker.
 * Take the adjacent block, dropping the quote markers the body was written with.
 * @param {string[]} lines @param {number} start @returns {{body: string[], end: number}}
 */
const readCalloutBody = (lines, start) => {
  const body = [];
  let index = start;
  let fence = null;
  while (index < lines.length) {
    const line = lines[index].replace(/^ {0,3}> ?/, '');
    if (fence) {
      body.push(line);
      if (isFenceEnd(line, fence)) fence = null;
    } else if (!line.trim()) break;
    else if (/^:::/.test(line)) break;
    else {
      const start = line.match(FENCE);
      if (start) fence = start[1];
      body.push(line);
    }
    index += 1;
  }
  return { body, end: index };
};

const convertCallouts = (markdown) => {
  const normalized = outsideCode(wrapCodeBlockCallouts(markdown), (text) => text
    .replace(/^(\S[^\n]*?)[^\S\n]*(:::[^\S\n]*\{)/gm, '$1\n\n$2')
    .replace(/^(\S[^\n]*?)[^\S\n]+(:::[^\S\n]*)$/gm, '$1\n$2'));
  const lines = normalized.split('\n');
  const out = [];
  let fence = null;
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const marker = line.match(FENCE);
    if (marker && !fence) {
      fence = marker[1];
      out.push(line);
      index += 1;
      continue;
    }
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      out.push(line);
      index += 1;
      continue;
    }

    const opener = readCallout(line);
    if (opener) {
      const callout = describeCallout(opener.info);
      out.push('', callout.open, '');
      if (callout.heading) out.push(`**${callout.heading}**`, '');
      if (opener.rest) out.push('', opener.rest, '');
      index += 1;
      continue;
    }

    const quoted = readHeadingCallout(line);
    if (quoted) {
      const callout = describeCallout(quoted.info);
      const { body, end } = readCalloutBody(lines, index + 1);
      out.push('', callout.open, '');
      if (callout.heading) out.push(`**${callout.heading}**`, '');
      out.push(...body, '', '</div>', '');
      index = end;
      continue;
    }

    if (/^:::\s*$/.test(line)) {
      out.push('', '</div>', '');
      index += 1;
      continue;
    }

    out.push(line);
    index += 1;
  }

  return out.join('\n');
};

const wrapExercises = (html) => {
  const heading = (html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g) || []).find(
    (tag) => /exercises|تمارين/i.test(tag)
  );
  if (!heading) return html;
  const index = html.indexOf(heading);
  return `${html.slice(0, index)}<div class="exercises">${html.slice(index)}</div>`;
};

const extractHeadings = (html) => {
  const headings = [];
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gs;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      depth: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '').trim(),
    });
  }
  return headings;
};

const stripHtml = (html) =>
  html
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeText = (text) =>
  text.replace(/[\u064B-\u065F\u0670]/g, '').toLowerCase();

const run = () => {
  fs.rmSync(generatedDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(generatedDir, 'sections'), { recursive: true });

  const searchIndex = [];
  const flatSections = [];
  const chaptersByBook = new Map();

  const emitSection = (book, chapter, slug, title, html) => {
    html = resolveImages(html);
    const entry = {
      book: book.id, chapter: chapter.key, chapterTitle: chapter.title,
      slug, title, headings: extractHeadings(html), html,
    };
    fs.writeFileSync(
      path.join(generatedDir, 'sections', `${book.id}__${chapter.key}--${slug}.json`),
      JSON.stringify(entry)
    );
    chapter.sections.push({ slug, title });
    searchIndex.push({
      book: book.id, bookTitle: book.title, chapter: chapter.key,
      chapterTitle: chapter.title, slug, title,
      text: normalizeText(stripHtml(html)).slice(0, 3000),
    });
    flatSections.push({
      book: book.id, chapter: chapter.key, chapterTitle: chapter.title, slug, title,
    });
  };

  const contentBooks = library.books.filter(
    (book) =>
      book.status === 'translated' &&
      fs.existsSync(path.join(contentDir, `${book.id}-structure.json`))
  );

  for (const book of contentBooks) {
    const structure = JSON.parse(
      fs.readFileSync(path.join(contentDir, `${book.id}-structure.json`), 'utf8')
    );
    const chapters = [];
    let missing = 0;
    let count = 0;

    for (const chapter of structure.chapters) {
      const chapterEntry = {
        key: chapter.key,
        title: chapter.titleAr || chapter.title,
        sections: [],
      };

      let first = true;
      for (const section of chapter.sections) {
        const slug = first ? 'index' : section.slug;
        first = false;
        const file = path.join(
          contentDir,
          book.id,
          `${chapter.key}--${slug}.md`
        );
        if (!fs.existsSync(file)) {
          console.log(`missing: ${book.id}/${chapter.key}--${slug}`);
          missing += 1;
          continue;
        }
        const raw = fs.readFileSync(file, 'utf8');
        const { data, content: rawContent } = matter(raw);
        const content = convertCallouts(normalizeSourceMarkup(rawContent));
        if (data.lang && data.lang !== 'ar') {
          console.log(`not translated yet: ${book.id}/${chapter.key}--${slug}`);
        }
        currentSection = `${book.id}/${chapter.key}--${slug}`;
        let html = markdown.render(content);
        html = addHeadingIds(html);
        html = wrapExercises(html);
        html = withBasePath(html);

        emitSection(book, chapterEntry, slug, data.title || section.title, html);
        count += 1;
      }

      chapters.push(chapterEntry);
    }

    chaptersByBook.set(book.id, chapters);
    console.log(
      `Generated ${count} sections for ${book.id} (missing ${missing})`
    );
  }

  const tour = library.books.find((book) => book.id === 'go-tour' && book.status === 'translated');
  if (tour) {
    const lessons = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/tour/lessons.json'), 'utf8'));
    const chapters = lessons.map((lesson) => {
      const chapter = { key: lesson.id, title: lesson.title, sections: [] };
      lesson.pages.forEach((page, index) => {
        const slug = index === 0 ? 'index' : `p${index + 1}`;
        emitSection(tour, chapter, slug, page.title, withBasePath(page.translation));
        // Retain both source prose and runnable examples in the book reader.
        {
          const file = path.join(generatedDir, 'sections', `${tour.id}__${chapter.key}--${slug}.json`);
          const entry = JSON.parse(fs.readFileSync(file, 'utf8'));
          entry.examples = page.files;
          entry.original = resolveImages(withBasePath(page.original));
          fs.writeFileSync(file, JSON.stringify(entry));
        }
      });
      return chapter;
    });
    chaptersByBook.set(tour.id, chapters);
    console.log(`Generated ${chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0)} sections for go-tour (missing 0)`);
  }

  const books = library.books.map((book) => {
    const chapters = chaptersByBook.get(book.id);
    return chapters ? { ...book, chapters } : book;
  });
  resolveBookReferences(path.join(generatedDir, 'sections'), 'introtcs', basePath);

  const stageIds = new Set(learningPath.stages.map((stage) => stage.id));
  for (const book of books) {
    if (book.stage && !stageIds.has(book.stage)) {
      throw new Error(`مرحلة غير معروفة للكتاب ${book.id}: ${book.stage}`);
    }
    if (book.replacement && !books.some((item) => item.id === book.replacement)) {
      throw new Error(`بديل غير موجود للكتاب ${book.id}: ${book.replacement}`);
    }
  }

  for (const book of books) {
    for (const prerequisite of book.prerequisites || []) {
      if (!books.some((item) => item.id === prerequisite)) {
        throw new Error(`متطلب غير موجود للكتاب ${book.id}: ${prerequisite}`);
      }
    }
  }

  const stages = learningPath.stages.map((stage) => ({
    ...stage,
    books: books
      .filter((book) => book.stage === stage.id)
      .sort((a, b) => a.order - b.order)
      .map((book) => book.id),
  }));

  const manifest = {
    library: library.title,
    subtitle: library.subtitle,
    path: { title: learningPath.title, intro: learningPath.intro, stages },
    books,
    sections: flatSections,
  };

  fs.writeFileSync(
    path.join(generatedDir, 'manifest.json'),
    JSON.stringify(manifest)
  );
  fs.writeFileSync(
    path.join(generatedDir, 'search-index.json'),
    JSON.stringify({ sections: searchIndex })
  );

  if (mathErrors.length) {
    fs.writeFileSync(path.join(generatedDir, 'math-errors.json'), JSON.stringify(mathErrors, null, 2));
    console.log(`math: ${mathErrors.length} source expressions need review (generated/math-errors.json)`);
  }
};

run();
