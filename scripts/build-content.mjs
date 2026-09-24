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
const helloAlgo = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'hello-algo-structure.json'), 'utf8')
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

  const chapters = [];
  const searchIndex = [];
  let total = 0;
  let missing = 0;

  const flatSections = [];

  for (const chapter of helloAlgo.chapters) {
    const chapterEntry = {
      key: chapter.key,
      title: chapter.titleAr || chapter.title,
      sections: [],
    };

    let first = true;
    for (const section of chapter.sections) {
      const slug = first ? 'index' : section.slug;
      first = false;
      const file = path.join(contentDir, 'hello-algo', `${chapter.key}--${slug}.md`);
      if (!fs.existsSync(file)) {
        console.log(`missing: ${chapter.key}--${slug}`);
        missing += 1;
        continue;
      }
      const raw = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(raw);
      let html = markdown.render(content);
      html = addHeadingIds(html);

      const entry = {
        book: 'hello-algo',
        chapter: chapter.key,
        chapterTitle: chapterEntry.title,
        slug,
        title: data.title || section.title,
        headings: extractHeadings(html),
        html,
      };

      fs.writeFileSync(
        path.join(generatedDir, 'sections', `${chapter.key}--${slug}.json`),
        JSON.stringify(entry)
      );

      chapterEntry.sections.push({ slug, title: entry.title });
      searchIndex.push({
        book: 'hello-algo',
        bookTitle: 'مرحباً بالخوارزميات',
        chapter: chapter.key,
        chapterTitle: chapterEntry.title,
        slug,
        title: entry.title,
        text: normalizeText(stripHtml(html)).slice(0, 3000),
      });
      flatSections.push({
        chapter: chapter.key,
        chapterTitle: chapterEntry.title,
        slug,
        title: entry.title,
      });
      total += 1;
    }

    chapters.push(chapterEntry);
  }

  for (let i = 0; i < flatSections.length; i += 1) {
    const item = flatSections[i];
    delete item.chapterTitle;
  }

  const manifest = {
    library: library.title,
    subtitle: library.subtitle,
    books: library.books.map((book) => {
      if (book.id === 'hello-algo') {
        return { ...book, chapters };
      }
      return book;
    }),
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

  console.log(
    `Generated ${total} sections for hello-algo (missing ${missing})`
  );
};

run();
