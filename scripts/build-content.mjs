import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import katex from 'katex';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const generatedDir = path.join(root, 'src', 'lib', 'generated');

const library = JSON.parse(
  fs.readFileSync(path.join(contentDir, 'library.json'), 'utf8')
);
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');

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

let mathFailures = 0;

const renderMath = (html) => {
  const render = (tex, display) => {
    const warn = console.warn;
    console.warn = () => {};
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: false,
        output: 'html',
      });
    } catch (error) {
      mathFailures += 1;
      return tex;
    } finally {
      console.warn = warn;
    }
  };

  const segments = html.split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/g);
  const withMath = segments
    .map((segment, index) => {
      if (index % 2 === 1) return segment;
      return segment
        .replace(/\$\$([\s\S]+?)\$\$/g, (match, tex) => render(tex.trim(), true))
        .replace(/\\\[([\s\S]+?)\\\]/g, (match, tex) => render(tex.trim(), true))
        .replace(/\\\(([\s\S]+?)\\\)/g, (match, tex) => render(tex.trim(), false))
        .replace(/(?<![\\\w$])\$([^$\n]+?)\$(?!\d)/g, (match, tex) => {
          const value = tex.trim();
          const isFormula =
            /[\\^_{}]/.test(value) || /^[A-Za-z0-9+\-=<>()|:,.']{1,8}$/.test(value);
          if (!isFormula) return match;
          return render(value, false);
        });
    })
    .join('');

  return withMath;
};

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
};

const convertCallouts = (markdown) => {
  const normalized = markdown
    .replace(/([^\n])\s*(:::\s*\{)/g, '$1\n\n$2')
    .replace(/\s+(:::\s*)(?=\n)/g, '\n$1');
  const lines = normalized.split('\n');
  const out = [];
  let inFence = false;

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const opener = line.match(/^:::\s*\{([^}]*)\}\s*(.*)$/);
    if (opener) {
      const info = opener[1];
      const kind = info.match(/\.([a-z-]+)/)?.[1] || 'note';
      const id = info.match(/#([\w-]+)/)?.[1];
      const rawTitle = info.match(/title="([^"]*)"/)?.[1] || '';
      const title = rawTitle.replace(/\$/g, '').trim();
      const label = calloutLabels[kind] ?? '';
      const heading = [label, title].filter(Boolean).join(' — ');
      out.push('', `<div class="callout callout--${kind}"${id ? ` id="${id}"` : ''}>`, '');
      if (heading) out.push(`**${heading}**`, '');
      const rest = (line.slice(line.lastIndexOf('}') + 1) || '').trim();
      if (rest) out.push('', rest, '');
      continue;
    }

    if (/^:::\s*$/.test(line)) {
      out.push('', '</div>', '');
      continue;
    }

    out.push(line);
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
        const { data, content: rawContent } = matter(raw);
        const content = convertCallouts(rawContent);
        if (data.lang && data.lang !== 'ar') {
          console.log(`not translated yet: ${book.id}/${chapter.key}--${slug}`);
        }
        let html = markdown.render(content);
        html = renderMath(html);
        html = addHeadingIds(html);
        html = wrapExercises(html);
        html = withBasePath(html);

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

  if (mathFailures) {
    console.log(`math: ${mathFailures} expressions left unrendered`);
  }
};

run();
