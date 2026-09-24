import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bookDir = path.join(root, 'sources', 'hello-algo');
const docsDir = path.join(bookDir, 'docs');
const codesDir = path.join(bookDir, 'codes');
const outDir = path.join(root, 'content-src', 'hello-algo');
const imagesDir = path.join(root, 'static', 'images', 'hello-algo');

const CHAPTER_TITLES = {};
let order = 0;

const readNav = () => {
  const lines = fs
    .readFileSync(path.join(bookDir, 'mkdocs.yml'), 'utf8')
    .split('\n');
  const start = lines.findIndex((line) => line.trim() === 'nav:');
  const navLines = lines.slice(start + 1);
  const chapters = [];
  let current = null;

  for (const line of navLines) {
    if (/^\S/.test(line)) break;
    const trimmed = line.trim();
    if (!trimmed.startsWith('- ')) continue;
    const value = trimmed.slice(2).trim();

    const chapterMatch = value.match(/^(.*?):\s*$/);
    if (chapterMatch) {
      const title = chapterMatch[1];
      if (title.startsWith('Chapter') || title === 'Before Starting') {
        current = { title: title.replace(/^Chapter \d+\.\s*/, ''), sections: [] };
        chapters.push(current);
        CHAPTER_TITLES[title] = current.title;
        continue;
      }
    }

    const sectionMatch = value.match(/^(?:(.*?):\s*)?(\S+\.md)$/);
    if (sectionMatch && current) {
      const [, label, file] = sectionMatch;
      current.sections.push({ label: label || '', file });
    }
  }
  return chapters;
};

const toCamel = (snake) =>
  snake
    .split('_')
    .map((part, index) =>
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');

const toPascal = (snake) =>
  snake
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const findMatchingBrace = (text, startIndex) => {
  let depth = 0;
  let inString = null;
  for (let i = startIndex; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      if (ch === '\\') i += 1;
      else if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
};

const withLeadingComments = (lines, startLine) => {
  let i = startLine - 1;
  while (i >= 0 && lines[i].trim() === '') i -= 1;
  const commentEnd = i;
  while (i >= 0) {
    const line = lines[i].trim();
    if (line.startsWith('//') || line.endsWith('*/')) {
      if (line.endsWith('*/')) {
        while (i >= 0 && !lines[i].trim().startsWith('/*')) i -= 1;
      }
      i -= 1;
    } else break;
  }
  return i + 1 <= commentEnd ? i + 1 : startLine;
};

const extractGo = (chapterDir, file, className, funcName) => {
  const base = path.join(codesDir, 'go', chapterDir);
  const filePath = path.join(base, file.replace(/-/g, '_') + '.go');
  const filePathAlt = path.join(base, file + '.go');
  const actual = fs.existsSync(filePath) ? filePath : filePathAlt;
  if (!fs.existsSync(actual)) return null;
  const lines = fs.readFileSync(actual, 'utf8').split('\n');
  const text = lines.join('\n');

  const extractFunction = (name) => {
    const camel = toCamel(name);
    const regex = new RegExp(
      `^func\\s+(?:\\([^)]*\\)\\s+)?${camel}\\s*\\(`,
      'm'
    );
    const match = regex.exec(text);
    if (!match) {
      const regex2 = new RegExp(
        `^func\\s+(?:\\([^)]*\\)\\s+)?${name}\\s*\\(`,
        'm'
      );
      const match2 = regex2.exec(text);
      if (!match2) return null;
      const startLine = text.slice(0, match2.index).split('\n').length - 1;
      const start = text.indexOf('{', match2.index);
      const end = findMatchingBrace(text, start);
      if (end < 0) return null;
      const from = withLeadingComments(lines, startLine);
      return lines.slice(from, text.slice(0, end).split('\n').length).join('\n');
    }
    const startLine = text.slice(0, match.index).split('\n').length - 1;
    const start = text.indexOf('{', match.index);
    const end = findMatchingBrace(text, start);
    if (end < 0) return null;
    const from = withLeadingComments(lines, startLine);
    return lines.slice(from, text.slice(0, end).split('\n').length).join('\n');
  };

  if (funcName) return extractFunction(funcName);

  if (className) {
    const pascal = toPascal(className);
    const typeRegex = new RegExp(`^type\\s+${pascal}\\s+struct\\s*{`, 'm');
    const match = typeRegex.exec(text);
    if (!match) return null;
    const startLine = text.slice(0, match.index).split('\n').length - 1;
    const start = text.indexOf('{', match.index);
    const end = findMatchingBrace(text, start);
    if (end < 0) return null;
    let result = lines.slice(startLine, text.slice(0, end).split('\n').length).join('\n');

    const methodRegex = new RegExp(
      `^func\\s+\\([^)]*\\*?${pascal}\\)\\s+\\w+\\s*\\(`,
      'gm'
    );
    let methodMatch;
    while ((methodMatch = methodRegex.exec(text)) !== null) {
      const mStartLine = text.slice(0, methodMatch.index).split('\n').length - 1;
      const mStart = text.indexOf('{', methodMatch.index);
      const mEnd = findMatchingBrace(text, mStart);
      if (mEnd < 0) continue;
      const from = withLeadingComments(lines, mStartLine);
      result +=
        '\n\n' +
        lines.slice(from, text.slice(0, mEnd).split('\n').length).join('\n');
      methodRegex.lastIndex = mEnd;
    }
    return result;
  }

  return fs
    .readFileSync(actual, 'utf8')
    .replace(/^\/\/ File:.*\n(\/\/.*\n)*/m, '')
    .trim();
};

const extractTypeScript = (chapterDir, file, className, funcName) => {
  const base = path.join(codesDir, 'typescript', chapterDir);
  const candidates = [
    path.join(base, file.replace(/-/g, '_') + '.ts'),
    path.join(base, file + '.ts'),
  ];
  const actual = candidates.find((candidate) => fs.existsSync(candidate));
  if (!actual) return null;
  const lines = fs.readFileSync(actual, 'utf8').split('\n');
  const text = lines.join('\n');

  const extractFunction = (name) => {
    const camel = toCamel(name);
    const regex = new RegExp(`^function\\s+${camel}\\s*\\(`, 'm');
    const match =
      regex.exec(text) ||
      new RegExp(`^function\\s+${name}\\s*\\(`, 'm').exec(text);
    if (!match) return null;
    const startLine = text.slice(0, match.index).split('\n').length - 1;
    const start = text.indexOf('{', match.index);
    const end = findMatchingBrace(text, start);
    if (end < 0) return null;
    const from = withLeadingComments(lines, startLine);
    return lines.slice(from, text.slice(0, end).split('\n').length).join('\n');
  };

  if (funcName) return extractFunction(funcName);

  if (className) {
    const pascal = toPascal(className);
    const regex = new RegExp(`^class\\s+${pascal}\\s*{`, 'm');
    const match = regex.exec(text);
    if (!match) return null;
    const startLine = text.slice(0, match.index).split('\n').length - 1;
    const start = text.indexOf('{', match.index);
    const end = findMatchingBrace(text, start);
    if (end < 0) return null;
    const from = withLeadingComments(lines, startLine);
    return lines.slice(from, text.slice(0, end).split('\n').length).join('\n');
  }

  return fs.readFileSync(actual, 'utf8').trim();
};

const copyImage = (fileDir, src) => {
  const resolved = path.join(docsDir, fileDir, src);
  if (!fs.existsSync(resolved)) return null;
  const filename = `${fileDir.replace(/\//g, '--')}--${path.basename(resolved)}`;
  const target = path.join(imagesDir, filename);
  if (!fs.existsSync(target)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    fs.copyFileSync(resolved, target);
  }
  return `/images/hello-algo/${filename}`;
};

const indentOf = (line) => line.match(/^\s*/)[0].length;

const parseIndented = (lines, startIndex, baseIndent) => {
  const collected = [];
  let i = startIndex;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      collected.push('');
      i += 1;
      continue;
    }
    if (indentOf(line) <= baseIndent) break;
    collected.push(line.slice(baseIndent + 4));
    i += 1;
  }
  while (collected.length && collected[collected.length - 1].trim() === '') {
    collected.pop();
  }
  return { content: collected.join('\n'), next: i };
};

const resolveMacro = (fileDir, file, className, funcName) => {
  const goCode = extractGo(fileDir, file, className, funcName);
  const tsCode = extractTypeScript(fileDir, file, className, funcName);
  let out = '';
  if (goCode) {
    out += `\n<div class="lang-tab">\n<p class="lang-tab__label">Go</p>\n\n\`\`\`go\n${goCode}\n\`\`\`\n\n</div>\n`;
  }
  if (tsCode) {
    out += `\n<div class="lang-tab">\n<p class="lang-tab__label">TypeScript</p>\n\n\`\`\`ts\n${tsCode}\n\`\`\`\n\n</div>\n`;
  }
  return out;
};

const convertBody = (fileDir, raw) => {
  const lines = raw.split('\n');
  const output = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    const adMatch = line.match(/^(\s*)!!!\s+(\w+)(?:\s+"(.*)")?\s*$/);
    if (adMatch) {
      const base = indentOf(line);
      const title = adMatch[3] || '';
      const { content, next } = parseIndented(lines, i + 1, base);
      output.push(`\n<div class="note">`);
      if (title) output.push(`<p class="note__title">${title}</p>`);
      output.push('');
      output.push(content.replace(/\n#/g, '\n\n#'));
      output.push('');
      output.push(`</div>\n`);
      i = next;
      continue;
    }

    const collapseMatch = line.match(
      /^\s*\?\?\?\s+(\w+)(?:\s+"(.*)")?\s*$/
    );
    if (collapseMatch) {
      const base = indentOf(line);
      const kind = collapseMatch[1];
      const title = collapseMatch[2] || '';
      const { content, next } = parseIndented(lines, i + 1, base);
      if (kind !== 'pythontutor' && content.trim()) {
        output.push(`\n<div class="note">`);
        if (title) output.push(`<p class="note__title">${title}</p>`);
        output.push('');
        output.push(content.replace(/\n#/g, '\n\n#'));
        output.push('');
        output.push(`</div>\n`);
      }
      i = next;
      continue;
    }

    const tabMatch = line.match(/^\s*===\s+"([^"]+)"\s*$/);
    if (tabMatch) {
      const lang = tabMatch[1];
      const base = indentOf(line);
      const { content, next } = parseIndented(lines, i + 1, base);
      if (['Go', 'TypeScript', 'TS'].includes(lang)) {
        const label = lang === 'TS' ? 'TypeScript' : lang;
        output.push(`\n<div class="lang-tab">`);
        output.push(`<p class="lang-tab__label">${label}</p>`);
        output.push('');
        output.push(content);
        output.push('');
        output.push(`</div>\n`);
      }
      i = next;
      continue;
    }

    if (line.trim() === '```src') {
      let j = i + 1;
      const contentLines = [];
      while (j < lines.length && lines[j].trim() !== '```') {
        contentLines.push(lines[j]);
        j += 1;
      }
      const content = contentLines.join('\n');
      const macro = content.match(
        /\[file\]\{([^}]*)\}-\[class\]\{([^}]*)\}-\[func\]\{([^}]*)\}/
      );
      if (macro) {
        output.push(resolveMacro(fileDir, macro[1], macro[2], macro[3]));
      }
      i = j + 1;
      continue;
    }

    const bareMacro = line.match(
      /^\s*\[file\]\{([^}]*)\}-\[class\]\{([^}]*)\}-\[func\]\{([^}]*)\}\s*$/
    );
    if (bareMacro) {
      output.push(
        resolveMacro(fileDir, bareMacro[1], bareMacro[2], bareMacro[3])
      );
      i += 1;
      continue;
    }

    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imageMatch && !/^https?:/.test(imageMatch[2])) {
      const local = copyImage(fileDir, imageMatch[2]);
      if (local) {
        output.push(`![${imageMatch[1]}](${local})`);
        i += 1;
        continue;
      }
    }

    output.push(line);
    i += 1;
  }

  return output.join('\n');
};

const clean = (markdown) =>
  markdown
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();

const chapters = readNav();
fs.mkdirSync(outDir, { recursive: true });

const structure = [];
let sectionIndex = 0;

for (const chapter of chapters) {
  const chapterKey = path.dirname(chapter.sections[0].file);
  const chapterEntry = {
    key: chapterKey,
    title: chapter.title,
    sections: [],
  };

  for (const section of chapter.sections) {
    const sourcePath = path.join(docsDir, section.file);
    if (!fs.existsSync(sourcePath)) continue;
    const raw = fs.readFileSync(sourcePath, 'utf8');
    const h1 = raw.match(/^#\s+(.*)$/m);
    const title = h1 ? h1[1].trim() : section.label || section.file;
    const body = clean(
      convertBody(path.dirname(section.file), raw).replace(/^#\s+.*$/m, '')
    );
    const slug =
      path.basename(section.file, '.md') === 'index'
        ? 'index'
        : path.basename(section.file, '.md');
    const outName = `${chapterKey}--${slug}.md`;
    const frontmatter = [
      '---',
      `title: ${JSON.stringify(title)}`,
      `book: hello-algo`,
      `chapter: ${chapterKey}`,
      `slug: ${slug}`,
      `order: ${sectionIndex}`,
      'lang: en',
      '---',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(outDir, outName), `${frontmatter}${body}\n`);
    chapterEntry.sections.push({ slug, title, order: sectionIndex });
    sectionIndex += 1;
  }
  structure.push(chapterEntry);
}

fs.writeFileSync(
  path.join(root, 'content', 'hello-algo-structure.json'),
  JSON.stringify({ chapters: structure }, null, 2)
);

console.log(
  `hello-algo: ${sectionIndex} sections, ${structure.length} chapters`
);
