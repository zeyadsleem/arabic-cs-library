import dns from 'node:dns';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { convert, decode, inline, toTable } from './lib/html-to-markdown.mjs';

dns.setDefaultResultOrder('ipv4first');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = 'pgexercises';
const origin = 'https://pgexercises.com';
const contentDir = path.join(root, 'content');
const sourceDir = path.join(root, 'content-src', id);
const targetDir = path.join(contentDir, id);
const imageDir = path.join(root, 'static', 'images', id);

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const sets = [
  { key: 'basic', path: '/questions/basic/', requested: 'basic' },
  { key: 'joins', path: '/questions/joins/', requested: 'joins' },
  { key: 'aggregates', path: '/questions/aggregates/', requested: 'aggregates' },
  { key: 'updates', path: '/questions/updates/', requested: 'modifying' },
  { key: 'recursive', path: '/questions/recursive/', requested: 'recursive' },
  { key: 'date', path: '/questions/date/', requested: 'datetime' },
  { key: 'arrays', path: '/questions/arrays/', requested: 'arrays' },
];

const absent = ['/questions/subqueries/', '/questions/json/', '/questions/window/'];

const fetchText = (url) => {
  const result = execFileSync(
    'curl',
    ['-sL', '--compressed', '-m', '90', '-w', '\n%{http_code}', url],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  const split = result.lastIndexOf('\n');
  const status = Number(result.slice(split + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
  return result.slice(0, split);
};

const failures = [];
const skipped = [];
let imageCount = 0;

const downloadBinary = (url) =>
  execFileSync('curl', ['-fsL', '--compressed', '-m', '90', url], {
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  });

const optimize = (raw, target) => {
  try {
    execFileSync(
      'magick',
      [raw, '-auto-orient', '-resize', '1100x1100>', '-strip', '-quality', '70', target],
      { stdio: 'ignore', timeout: 60000 }
    );
    fs.rmSync(raw, { force: true });
  } catch {
    fs.renameSync(raw, target);
  }
};

const decodeNumericEntities = (html) =>
  html
    .replace(/&#(\d+);/g, (match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (match, code) =>
      String.fromCodePoint(parseInt(code, 16))
    );

const collectImages = (html, pageUrl, prefix) => {
  const images = [];
  const page = html.replace(/<img[^>]*>/g, (tag) => {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    if (!src || !/\/assets\//.test(src) || /\/(tick2|cross)\.svg$/.test(src)) {
      return '';
    }
    const alt = decodeNumericEntities(
      tag.match(/title="([^"]*)"/)?.[1] ||
        tag.match(/alt="([^"]*)"/)?.[1] ||
        ''
    ).trim();
    const resolved = new URL(src, pageUrl);
    const base = path.basename(resolved.pathname).replace(/[^.\w-]/g, '_') || 'image';
    const name = `${prefix}-${images.length}-${base}`;
    const webp = path.join(imageDir, name.replace(/\.\w+$/, '.webp'));
    if (!fs.existsSync(webp)) {
      try {
        const ext = path.extname(name) || '.img';
        const raw = path.join(
          imageDir,
          `${name.slice(0, name.length - ext.length)}.tmp${ext}`
        );
        fs.writeFileSync(raw, downloadBinary(resolved.href));
        optimize(raw, webp);
        imageCount += 1;
      } catch (error) {
        console.warn(`تعذّر تنزيل ${resolved.href}`);
        failures.push({ url: resolved.href, reason: 'image download' });
      }
    }
    const local = fs.existsSync(webp)
      ? `/images/${id}/${path.basename(webp)}`
      : resolved.href;
    images.push({ src, alt, local });
    return ` IMAGE${images.length - 1}END `;
  });
  return { page, images };
};

const pageTitle = (html) => {
  const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] || '';
  return inline(
    h1
      .replace(/<a[^>]*>[\s\S]*?<\/a>/g, '')
      .replace(/<img[^>]*>/g, '')
  );
};

const setIntro = (html) => {
  const headerEnd = html.indexOf('</div>', html.indexOf('class="page-header"'));
  const topicIndex = html.indexOf('class="topiclisting"');
  if (headerEnd < 0) return '';
  const end = topicIndex >= 0 ? html.lastIndexOf('<ul', topicIndex) : html.length;
  return convert(html.slice(headerEnd + '</div>'.length, end), []).trim();
};

const exerciseMarkdown = (html, position, title, images) => {
  const questionStart = html.indexOf('<h3>Question</h3>');
  const expectedStart = html.indexOf('<h3>Expected Results</h3>', questionStart);
  if (questionStart < 0 || expectedStart < 0) return '';
  let questionHtml = html.slice(
    questionStart + '<h3>Question</h3>'.length,
    expectedStart
  );
  const splitter = questionHtml.search(/<div id=["']?splittercontainerouter/);
  if (splitter >= 0) questionHtml = questionHtml.slice(0, splitter);
  const question = convert(questionHtml, images).trim();

  const tableStart = html.indexOf('<table id="exprestable"', expectedStart);
  let expected = '';
  if (tableStart >= 0) {
    const tableEnd = html.indexOf('</table>', tableStart);
    expected = toTable(html.slice(tableStart, tableEnd + '</table>'.length));
  }

  const answerMatch = html.match(/<pre id="querydiv"[^>]*>([\s\S]*?)<\/pre>/);
  const answer = answerMatch
    ? decode(answerMatch[1].replace(/<[^>]+>/g, ''))
        .replace(/^\n+/, '')
        .replace(/\s+$/, '')
    : '';

  const discussionStart = html.indexOf('<h3>Answers and Discussion');
  const navigation = html.lastIndexOf('<!--Navigation-->');
  let discussion = '';
  if (discussionStart >= 0) {
    const end = navigation > discussionStart ? navigation : html.length;
    const discussionHtml = html
      .slice(discussionStart, end)
      .replace(/<h3>Answers and Discussion[\s\S]*?<\/h3>/, '')
      .replace(/<pre id="querydiv"[^>]*>[\s\S]*?<\/pre>/, '');
    discussion = convert(discussionHtml, images).trim();
  }

  const hintMatch = html.match(/<div id="hint"[^>]*>([\s\S]*?)<\/div>/);
  const hint = hintMatch ? inline(hintMatch[1].replace(/<[^>]+>/g, '')) : '';

  const chunks = [`## ${position}. ${title}`];
  if (question) chunks.push(`**Question**\n\n${question}`);
  if (expected) chunks.push(`**Expected Results**\n\n${expected}`);
  if (answer) chunks.push(`**Answer**\n\n\`\`\`sql\n${answer}\n\`\`\``);
  if (discussion) chunks.push(discussion);
  if (hint) chunks.push(`**Hint:** ${hint}`);
  return chunks.join('\n\n');
};

const verify = (key, body) => {
  const fences = (body.match(/^```/gm) || []).length;
  const issues = [];
  if (body.length <= 1000) issues.push(`too short (${body.length})`);
  if (fences % 2 !== 0) issues.push(`unbalanced fences (${fences})`);
  if (issues.length > 0) failures.push({ url: `${id}/${key}`, reason: issues.join(', ') });
  return issues;
};

const structure = { chapters: [] };

for (const [chapterIndex, set] of sets.entries()) {
  const setUrl = `${origin}${set.path}`;
  let html;
  try {
    html = fetchText(setUrl);
  } catch (error) {
    console.warn(`تخطّي ${set.key}: ${error.message}`);
    failures.push({ url: setUrl, reason: error.message });
    continue;
  }

  const setDir = path.join(sourceDir, set.key);
  fs.mkdirSync(setDir, { recursive: true });
  fs.writeFileSync(path.join(setDir, 'index.html'), html);

  const decoded = decodeNumericEntities(html);
  const title = pageTitle(decoded);
  const intro = setIntro(decoded);

  const exercises = [
    ...decoded.matchAll(
      /<a class="listlink" href='([^']+)'>([^<]+)<\/a>/g
    ),
  ].map((match) => ({ href: match[1], title: decode(match[2]).trim() }));

  const parts = [];
  if (intro) parts.push(intro);

  for (const [exerciseIndex, exercise] of exercises.entries()) {
    const url = new URL(exercise.href, setUrl).href;
    let pageHtml;
    try {
      pageHtml = fetchText(url);
    } catch (error) {
      console.warn(`تخطّي ${set.key}/${exercise.href}: ${error.message}`);
      failures.push({ url, reason: error.message });
      continue;
    }
    fs.writeFileSync(
      path.join(setDir, exercise.href.replace(/\.html$/, '.html')),
      pageHtml
    );
    const { page, images } = collectImages(
      decodeNumericEntities(pageHtml),
      url,
      `${set.key}-${exercise.href.replace(/\.html$/, '')}`
    );
    const markdown = exerciseMarkdown(
      page,
      exerciseIndex + 1,
      exercise.title,
      images
    );
    if (!markdown) {
      failures.push({ url, reason: 'no question/expected results found' });
      continue;
    }
    parts.push(markdown);
  }

  const body = parts.join('\n\n').trim();
  verify(set.key, body);

  const file = path.join(targetDir, `${set.key}--index.md`);
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (/lang:\s*ar/.test(existing)) {
    console.warn(`تخطّي الكتابة (lang: ar): ${file}`);
    skipped.push(file);
  } else {
    fs.writeFileSync(
      file,
      `---\ntitle: ${JSON.stringify(title)}\nlang: en\nsource: ${setUrl}\n---\n\n${body}\n`
    );
  }

  structure.chapters.push({
    key: set.key,
    title,
    titleAr: title,
    sections: [{ slug: 'index', title, order: chapterIndex }],
  });
  console.log(`${set.key}: ${exercises.length} exercises, ${body.length} chars (${set.requested})`);
}

for (const pathName of absent) {
  const url = `${origin}${pathName}`;
  try {
    fetchText(url);
    failures.push({ url, reason: 'unexpectedly exists but was not imported' });
  } catch (error) {
    console.warn(`غير موجود: ${url} (${error.message})`);
    failures.push({ url, reason: `${error.message} — skipped` });
  }
}

fs.writeFileSync(
  path.join(contentDir, `${id}-structure.json`),
  JSON.stringify(structure, null, 2)
);

console.log(`\n${id}: ${structure.chapters.length} chapters`);
if (skipped.length) console.log(`skipped (lang: ar): ${skipped.length}`);
if (failures.length) {
  console.log(`failures: ${failures.length}`);
  for (const failure of failures) console.log(`  ${failure.url} — ${failure.reason}`);
}