import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const generatedDir = path.join(root, 'src', 'lib', 'generated');

const library = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'library.json'), 'utf8')
);
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

  const contentBooks = library.books.filter((book) =>
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
        const { data, content } = matter(raw);
        if (data.lang && data.lang !== 'ar') {
          console.log(`not translated yet: ${book.id}/${chapter.key}--${slug}`);
        }
        let html = markdown.render(content);
        html = addHeadingIds(html);

        const entry = {
          book: book.id,
          chapter: chapter.key,
          chapterTitle: chapterEntry.title,
          slug,
          title: data.title || section.title,
          headings: extractHeadings(html),
          html,
        };

        fs.writeFileSync(
          path.join(
            generatedDir,
            'sections',
            `${book.id}__${chapter.key}--${slug}.json`
          ),
          JSON.stringify(entry)
        );

        chapterEntry.sections.push({ slug, title: entry.title });
        searchIndex.push({
          book: book.id,
          bookTitle: book.title,
          chapter: chapter.key,
          chapterTitle: chapterEntry.title,
          slug,
          title: entry.title,
          text: normalizeText(stripHtml(html)).slice(0, 3000),
        });
        flatSections.push({
          book: book.id,
          chapter: chapter.key,
          chapterTitle: chapterEntry.title,
          slug,
          title: entry.title,
        });
        count += 1;
      }

      chapters.push(chapterEntry);
    }

    chaptersByBook.set(book.id, chapters);
    console.log(
      `Generated ${count} sections for ${book.id} (missing ${missing})`
    );
  }

  const books = library.books.map((book) => {
    const chapters = chaptersByBook.get(book.id);
    return chapters ? { ...book, chapters } : book;
  });

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
};

run();
