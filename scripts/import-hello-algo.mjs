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
      if (
        title.startsWith('Chapter') ||
        title === 'Before Starting' ||
        title === 'References'
      ) {
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

const pythonBodyEnd = (lines, startIndex, defIndent) => {
  let i = startIndex + 1;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      i += 1;
      continue;
    }
    if (indentOf(line) <= defIndent) break;
    i += 1;
  }
  return i;
};

const pythonLeadingComments = (lines, startIndex) => {
  let i = startIndex - 1;
  while (i >= 0 && lines[i].trim() === '') i -= 1;
  const commentEnd = i;
  while (i >= 0 && lines[i].trim().startsWith('#')) i -= 1;
  return i + 1 <= commentEnd ? i + 1 : startIndex;
};

const extractPython = (chapterDir, file, className, funcName) => {
  const base = path.join(codesDir, 'python', chapterDir);
  const candidates = [
    path.join(base, file.replace(/-/g, '_') + '.py'),
    path.join(base, file + '.py'),
  ];
  const actual = candidates.find((candidate) => fs.existsSync(candidate));
  if (!actual) return null;
  const lines = fs.readFileSync(actual, 'utf8').split('\n');

  const extractDefinition = (namePatterns) => {
    for (let i = 0; i < lines.length; i += 1) {
      if (!namePatterns.some((pattern) => pattern.test(lines[i]))) continue;
      const defIndent = indentOf(lines[i]);
      const start = pythonLeadingComments(lines, i);
      let end = pythonBodyEnd(lines, i, defIndent);
      while (end > 0 && lines[end - 1].trim() === '') end -= 1;
      return lines.slice(start, end).join('\n');
    }
    return null;
  };

  if (funcName) {
    const camel = toCamel(funcName);
    return extractDefinition([
      new RegExp(`^\\s*def\\s+${funcName}\\s*\\(`),
      new RegExp(`^\\s*def\\s+${camel}\\s*\\(`),
    ]);
  }

  if (className) {
    const pascal = toPascal(className);
    return extractDefinition([new RegExp(`^\\s*class\\s+${pascal}\\b`)]);
  }

  const text = fs.readFileSync(actual, 'utf8');
  return (text.startsWith('"""')
    ? text.replace(/^"""[\s\S]*?"""\n+/, '')
    : text
  )
    .replace(/^#\s*File:.*\n(#[^\n]*\n)*/m, '')
    .trim();
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
  const pyCode = extractPython(fileDir, file, className, funcName);
  if (!pyCode) return '';
  return `\n<div class="lang-tab">\n<p class="lang-tab__label">Python</p>\n\n\`\`\`py\n${pyCode}\n\`\`\`\n\n</div>\n`;
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
      if (lang === 'Python') {
        output.push(`\n<div class="lang-tab">`);
        output.push(`<p class="lang-tab__label">${lang}</p>`);
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

const parseLangTabRuns = (text) => {
  const runs = [];
  const lines = text.split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i] === '<div class="lang-tab">' && start < 0) {
      start = i;
      continue;
    }
    if (lines[i] === '</div>' && start >= 0) {
      const block = lines.slice(start, i + 1);
      const label = block
        .find((line) => line.startsWith('<p class="lang-tab__label">'))
        ?.match(/>([^<]*)</)?.[1];
      runs.push({ bg: start, end: i, label });
      start = -1;
    }
  }
  if (start >= 0) throw new Error('Unmatched lang-tab opening div');
  return runs;
};

const mergeAdjacentRuns = (runs, lines) => {
  const groups = [];
  for (const run of runs) {
    const last = groups[groups.length - 1];
    if (last) {
      const between = lines.slice(last.end + 1, run.bg);
      if (between.every((line) => line.trim() === '')) {
        last.end = run.end;
        last.labels.push(run.label);
        continue;
      }
    }
    groups.push({ bg: run.bg, end: run.end, labels: [run.label] });
  }
  return groups;
};

const parseAnchors = (lines) => {
  const anchors = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const image = line.match(/^!\[.*\]\((\/images\/[^)\s]+|[^)\s]*\.png|[^)\s]*\.svg)\)/);
    if (image) {
      anchors.push({ line: i, key: `img:${image[1]}` });
      continue;
    }
    const heading = line.match(/^(#{1,6}) /);
    if (heading) anchors.push({ line: i, key: `h${heading[1].length}` });
  }
  return anchors;
};

const lcsAnchorAlignment = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      dp[i][j] =
        a[i].key === b[j].key
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const pairs = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i].key === b[j].key) {
      pairs.push({ a: a[i], b: b[j] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i += 1;
    } else {
      j += 1;
    }
  }
  return pairs;
};

const buildFullContent = (arabic, arabicGroups, english, englishGroups) => {
  const arabicLines = arabic.split('\n');
  const englishLines = english.split('\n');
  let output = '';
  let cursor = 0;
  for (let i = 0; i < arabicGroups.length; i += 1) {
    const sourceGroup = arabicGroups[i];
    const pythonGroup = englishGroups[i];
    if (!pythonGroup.labels.every((l) => l === 'Python')) {
      throw new Error('expected aligned Python group');
    }
    output +=
      arabicLines.slice(cursor, sourceGroup.bg).join('\n') +
      '\n' +
      englishLines.slice(pythonGroup.bg, pythonGroup.end + 1).join('\n');
    cursor = sourceGroup.end + 1;
  }
  output += arabicLines.slice(cursor).join('\n');
  return output.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+\n/g, '\n');
};

const contentDir = path.join(root, 'content', 'hello-algo');
const updateArabicContent = () => {
  fs.mkdirSync(contentDir, { recursive: true });
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const stats = { files: 0, replaced: 0, skipped: [] };
  for (const file of files) {
    const englishPath = path.join(outDir, file);
    if (!fs.existsSync(englishPath)) {
      stats.skipped.push(`${file} (no english source)`);
      continue;
    }
    const arabic = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const english = fs.readFileSync(englishPath, 'utf8');
    const arabicLines = arabic.split('\n');
    const englishLines = english.split('\n');
    const arabicGroups = mergeAdjacentRuns(parseLangTabRuns(arabic), arabicLines);
    const englishGroups = mergeAdjacentRuns(parseLangTabRuns(english), englishLines);
    if (arabicGroups.length === 0 && englishGroups.length === 0) continue;

    const isPurePython = (group) => group.labels.every((l) => l === 'Python');
    const groupText = (lines, g) => lines.slice(g.bg, g.end + 1).join('\n');
    if (arabicGroups.length === englishGroups.length) {
      if (
        arabicGroups.every(isPurePython) &&
        arabicGroups.every(
          (g, i) => groupText(arabicLines, g) === groupText(englishLines, englishGroups[i])
        )
      ) {
        continue;
      }
      if (
        arabicGroups.every(isPurePython) ||
        arabicGroups.every((g) =>
          g.labels.every((l) => ['Go', 'TypeScript'].includes(l))
        )
      ) {
        const output = buildFullContent(arabic, arabicGroups, english, englishGroups);
        fs.writeFileSync(path.join(contentDir, file), output);
        stats.files += 1;
        stats.replaced += arabicGroups.length;
        continue;
      }
      stats.skipped.push(
        `${file} (unexpected labels: ${arabicGroups
          .flatMap((g) => g.labels)
          .join(', ')})`
      );
      continue;
    }
    if (
      !arabicGroups.every((g) =>
        g.labels.every((l) => ['Go', 'TypeScript'].includes(l))
      ) ||
      !englishGroups.every(isPurePython)
    ) {
      stats.skipped.push(
        `${file} (${arabicGroups.length} go/ts groups -> ${englishGroups.length} python)`
      );
      continue;
    }

    // Align groups between the two documents using image/heading anchors so
    // extra python tabs (the group is missing from the arabic translation)
    // are merged into the nearest neighbour.
    const arabicAnchors = parseAnchors(arabicLines);
    const englishAnchors = parseAnchors(englishLines);
    const pairs = lcsAnchorAlignment(arabicAnchors, englishAnchors);
    const intervalOf = (line, anchors, side) => {
      for (let idx = 0; idx <= pairs.length; idx += 1) {
        const before = idx === 0 ? -1 : pairs[idx - 1][side].line + 1;
        const after = idx === pairs.length ? Infinity : pairs[idx][side].line;
        if (line >= before && line < after) return idx;
      }
      return -1;
    };
    // Maps intervals (indices relative to matched anchors) to groups.
    const buckets = {
      arabic: new Map(),
      english: new Map(),
    };
    arabicGroups.forEach((group, idx) => {
      const interval = intervalOf(group.bg, arabicAnchors, 'a');
      buckets.arabic.set(interval, [...(buckets.arabic.get(interval) ?? []), idx]);
    });
    englishGroups.forEach((group, idx) => {
      const interval = intervalOf(group.bg, englishAnchors, 'b');
      buckets.english.set(interval, [...(buckets.english.get(interval) ?? []), idx]);
    });
    const intervals = new Set([
      ...buckets.arabic.keys(),
      ...buckets.english.keys(),
    ]);
    let balanced = true;
    const plan = [];
    for (const interval of intervals) {
      const arabicIds = buckets.arabic.get(interval) ?? [];
      const englishIds = buckets.english.get(interval) ?? [];
      if (arabicIds.length === englishIds.length && arabicIds.length > 0) {
        for (let k = 0; k < arabicIds.length; k += 1) {
          plan.push({ type: 'replace', arabic: arabicIds[k], english: englishIds[k] });
        }
        continue;
      }
      if (arabicIds.length === 0 && englishIds.length > 0 && pairs.length > 0) {
        const anchorIndex = interval === pairs.length ? pairs.length - 1 : interval;
        plan.push({
          type: 'insert-before-anchor',
          anchor: pairs[anchorIndex],
          englishIds,
        });
        continue;
      }
      balanced = false;
      break;
    }
    if (!balanced) {
      stats.skipped.push(
        `${file} (${arabicGroups.length} go/ts groups -> ${englishGroups.length} python [unbalanced])`
      );
      continue;
    }
    plan.sort((x, y) =>
      x.type === 'replace' && y.type === 'replace'
        ? arabicGroups[x.arabic].bg - arabicGroups[y.arabic].bg
        : x.type === 'replace'
          ? arabicGroups[x.arabic].bg - y.anchor.a.line
          : x.anchor.a.line - (y.type === 'replace' ? arabicGroups[y.arabic].bg : y.anchor.a.line)
    );
    const processed = new Set();
    // Rebuild with plan; conversion deletes aligned arabic groups by id.
    const planOutputs = new Map();
    const removed = new Set(
      plan.filter((p) => p.type === 'replace').map((p) => ({
        bg: arabicGroups[p.arabic].bg,
        end: arabicGroups[p.arabic].end,
      }))
    );
    const inserts = plan.filter((p) => p.type === 'insert-before-anchor');
    let outLines = [];
    let cursor = 0;
    for (const pair of plan) {
      if (pair.type === 'replace') {
        const sourceGroup = arabicGroups[pair.arabic];
        const pythonGroup = englishGroups[pair.english];
        outLines = outLines
          .concat(arabicLines.slice(cursor, sourceGroup.bg))
          .concat(englishLines.slice(pythonGroup.bg, pythonGroup.end + 1));
        cursor = sourceGroup.end + 1;
      } else {
        const anchorLine = pair.anchor.a.line;
        const blocks = pair.englishIds
          .map((idx) => englishLines.slice(englishGroups[idx].bg, englishGroups[idx].end + 1).join('\n'))
          .join('\n');
        outLines = outLines
          .concat(arabicLines.slice(cursor, anchorLine))
          .concat([blocks]);
        cursor = anchorLine;
      }
    }
    outLines = outLines.concat(arabicLines.slice(cursor));
    const output = outLines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+\n/g, '\n');
    fs.writeFileSync(path.join(contentDir, file), output);
    stats.files += 1;
    stats.replaced += plan.filter((p) => p.type === 'replace').length + inserts.length;
    void removed;
    void intervals;
  }
  return stats;
};

const stats = updateArabicContent();
if (stats.skipped.length) {
  console.log(`hello-algo: arabic update skipped files:`);
  for (const entry of stats.skipped) console.log(`  - ${entry}`);
}
console.log(
  `hello-algo: ${stats.files} arabic files rebuilt with ${stats.replaced} python tabs`
);

console.log(
  `hello-algo: ${sectionIndex} sections, ${structure.length} chapters`
);
