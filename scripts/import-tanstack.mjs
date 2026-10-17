/** Import the two TanStack YouTube courses into staged English markdown pages.
 *
 * Reads `content-src/<book>/source.en.vtt` + `source.info.json` (downloads them with
 * yt-dlp if they are missing) and writes a page per video chapter:
 *   content-src/<book>/<chapter-key>--<slug>.md
 *
 * Usage: `node scripts/import-tanstack.mjs` (or `--book <id>`).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { sourceDirectory, translationsDirectory, TANSTACK_BOOKS, tanstackConfig, selectedBooks } from './lib/tanstack-translation.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const COURSE = {
  'tanstack-router': {
    id: 'tanstack-router',
    url: 'https://www.youtube.com/watch?v=8_sGz4DHwIA',
    title: 'TanStack Router Full Course',
  },
  'tanstack-form': {
    id: 'tanstack-form',
    url: 'https://www.youtube.com/watch?v=H2T21r5wu3g',
    title: 'TanStack Form Full Course',
  },
};

const YT_DLP = '/home/zeyad/.nix-profile/bin/yt-dlp';

const ASR_CORRECTIONS = [
  // Canonise product names mangled by YouTube ASR before they reach a translator.
  [/\btan\s*stack\b/gi, 'TanStack'],
  [/\btanstack\b/gi, 'TanStack'],
  [/\bten\s*stack\b/gi, 'TanStack'],
  [/\btenstack\b/gi, 'TanStack'],
  [/\bnex\.?\s*js\b/gi, 'Next.js'],
  [/\breact router\b/gi, 'React Router'],
  [/\bzod\b/gi, 'Zod'],
  [/\bvite\b/gi, 'Vite'],
  [/\bgithub\b/gi, 'GitHub'],
  [/\breact query\b/gi, 'React Query'],
  [/\breact form\b/gi, 'React Form'],
  [/\bshadcn\b/gi, 'shadcn/ui'],
  [/\bweb workers\b/gi, 'Web Workers'],
];

function cleanText(text) {
  let value = text.replace(/\s+/g, ' ').trim();
  for (const [pattern, replacement] of ASR_CORRECTIONS) value = value.replace(pattern, replacement);
  return value;
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(value) { return value.replace(/<[^>]*>/g, ''); }

function parseVtt(text) {
  const blocks = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split(/\n\s*\n/);
  const cues = [];
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    const headerIndex = lines.findIndex((line) => /\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->/.test(line));
    if (headerIndex === -1) continue;
    const header = lines[headerIndex];
    const match = header.match(/^(\d{2}):(\d{2}):(\d{2})[.,]\d{3}\s*-->/);
    if (!match) continue;
    const start = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
    const rawLines = lines.slice(headerIndex + 1)
      .map(stripTags)
      .map(decodeEntities)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (rawLines.length === 0) continue;
    cues.push({ start, plainLines: rawLines });
  }
  // Drop the rolling duplicates: every cue's last line is the line it stabilised into.
  const unique = [];
  let last = null;
  for (const cue of cues) {
    const candidate = cue.plainLines[cue.plainLines.length - 1];
    if (!candidate) continue;
    if (candidate !== last) { unique.push({ time: cue.start, text: cleanText(candidate) }); last = candidate; }
  }
  return unique;
}

function groupParagraphs(lines) {
  const paragraphs = [];
  let buffer = [];
  let stamp = null;
  const flush = () => {
    if (buffer.length === 0) return;
    const text = buffer.join(' ').replace(/\s+/g, ' ').trim();
    if (text) paragraphs.push({ stamp, text });
    buffer = [];
    stamp = null;
  };
  for (const entry of lines) {
    if (buffer.length === 0) stamp = entry.time;
    buffer.push(entry.text);
    const join = buffer.join(' ');
    const endsSentence = /[.!?…]$/.test(entry.text.trim());
    if (endsSentence || buffer.length >= 6 || join.length >= 500) flush();
  }
  flush();
  return paragraphs;
}

function formatStamp(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'lesson';
}

function parseBranches(description, chapterCount) {
  const lines = (description || '').split(/\n/);
  const found = [];
  for (const line of lines) {
    if (!/^\d{1,2}:\d{2}(:\d{2})?\s/.test(line.trim())) continue;
    const urls = [...line.matchAll(/\((https:\/\/github\.com[^)]*)\)/g)].map((match) => match[1]);
    found.push(urls);
    if (found.length >= chapterCount) break;
  }
  while (found.length < chapterCount) found.push([]);
  return found;
}

const ensureSources = (dir, course) => {
  const vttPath = path.join(dir, 'source.en.vtt');
  const infoPath = path.join(dir, 'source.info.json');
  const exists = fs.existsSync(vttPath) && fs.existsSync(infoPath);
  if (exists) return;
  console.log(`${course.id}: sources missing — downloading with yt-dlp`);
  fs.mkdirSync(dir, { recursive: true });
  const result = spawnSync(YT_DLP, [
    '--skip-download',
    '--write-auto-subs',
    '--sub-lang', 'en',
    '--sub-format', 'vtt',
    '--write-info-json',
    '--output', path.join(dir, '%(id)s.%(ext)s'),
    course.url,
  ], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`yt-dlp failed for ${course.id}`);
  // rename the downloaded artefacts
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith('.en.vtt') || file.endsWith('.vtt')) {
      if (!file.startsWith('source')) { const v = fs.readFileSync(path.join(dir, file)); fs.writeFileSync(vttPath, v); fs.rmSync(path.join(dir, file)); }
    }
    if (file.endsWith('.info.json') && !file.startsWith('source')) {
      const v = fs.readFileSync(path.join(dir, file)); fs.writeFileSync(infoPath, v); fs.rmSync(path.join(dir, file));
    }
  }
  if (!fs.existsSync(vttPath) || !fs.existsSync(infoPath)) {
    throw new Error(`could not find downloaded VTT/info for ${course.id}`);
  }
};

const buildBook = (bookId) => {
  const course = COURSE[bookId];
  const dir = sourceDirectory(root, bookId);
  fs.mkdirSync(dir, { recursive: true });
  ensureSources(dir, course);

  const vtt = fs.readFileSync(path.join(dir, 'source.en.vtt'), 'utf8');
  const info = JSON.parse(fs.readFileSync(path.join(dir, 'source.info.json'), 'utf8'));
  const branches = parseBranches(info.description, info.chapters.length);
  const lines = parseVtt(vtt);

  // Write a compact manifest so the staging decisions are auditable.
  const manifest = {
    generatedAt: new Date().toISOString(),
    origin: 'https://www.youtube.com',
    title: info.title,
    url: course.url,
    videoId: info.id,
    uploadDate: info.upload_date,
    duration: info.duration,
    chapters: info.chapters.map((chapter, index) => ({
      title: chapter.title,
      start: chapter.start_time,
      end: (info.chapters[index + 1]?.start_time) ?? info.duration,
      slug: index === 0 ? 'index' : slugify(chapter.title),
      repoBranches: branches[index] || [],
    })),
  };
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  let written = 0;
  for (let i = 0; i < info.chapters.length; i += 1) {
    const chapter = info.chapters[i];
    const start = chapter.start_time;
    const end = info.chapters[i + 1]?.start_time ?? info.duration + 1;
    const sectionLines = lines.filter((entry) => entry.time >= start && entry.time < end);
    const paragraphs = groupParagraphs(sectionLines);
    const slug = i === 0 ? 'index' : slugify(chapter.title);
    const chapterKey = tanstackConfig(bookId).chapter;
    const branchUrls = branches[i] || [];
    const branchBlock = branchUrls.length
      ? [
          '> **Code repository for this lesson**',
          '>',
          `> Branch${branchUrls.length > 1 ? 'es' : ''}: ${branchUrls.map((url) => {
            const name = (url.split('/tree/').pop() || url).trim();
            return `[\`${name}\`](${url})`;
          }).join(' · ')}`,
          '',
        ].join('\n')
      : '';

    const pageBody = [
      branchBlock,
      paragraphs.map((paragraph) => `[${formatStamp(paragraph.stamp - start)}] ${paragraph.text}`).join('\n\n'),
    ].filter(Boolean).join('\n\n');

    const sourceUrl = `https://www.youtube.com/watch?v=${info.id}&t=${start}s`;
    const frontmatter = `---\ntitle: ${JSON.stringify(chapter.title)}\nlang: en\nchapter: ${chapterKey}\nslug: ${slug}\norder: ${i}\nsource: ${JSON.stringify(sourceUrl)}\n---`;
    const file = path.join(dir, `${chapterKey}--${slug}.md`);
    fs.writeFileSync(file, `${frontmatter}\n\n${pageBody.trim()}\n`);

    written += 1;
  }

  const courseArTitle = bookId === 'tanstack-router'
    ? 'دورة TanStack Router الكاملة'
    : 'دورة TanStack Form الكاملة';
  const structure = {
    chapters: [
      {
        key: tanstackConfig(bookId).chapter,
        title: info.title,
        titleAr: courseArTitle,
        sections: info.chapters.map((chapter, i) => ({
          slug: i === 0 ? 'index' : slugify(chapter.title),
          title: chapter.title,
          order: i,
        })),
      },
    ],
  };
  fs.writeFileSync(
    path.join(root, 'content', `${bookId}-structure.json`),
    JSON.stringify(structure, null, 2) + '\n',
  );

  console.log(`${bookId}: staged ${written} pages from ${lines.length} captions`);
};

const books = selectedBooks(process.argv.slice(2));
for (const bookId of books) buildBook(bookId);
console.log('done');
