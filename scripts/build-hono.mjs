/** Build the Hono pages from the staged English source and reviewed translations.
 *
 * The importer stages the docs in content-src/hono; a translator fills
 * content-src/hono-translations.json with the Arabic for each text node, keyed by
 * the SHA-256 of that node. A page is published as Arabic only when every one of
 * its text nodes has been translated, so a page in progress stays English rather
 * than mixing both languages. Code and link URLs are never translated.
 *
 * Re-running rebuilds content/hono from whatever has been translated so far.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { HONO_CHAPTERS } from './lib/hono-chapters.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content-src', 'hono');
const outputDir = path.join(root, 'content', 'hono');
const structurePath = path.join(root, 'content', 'hono-structure.json');
const catalogPath = path.join(sourceDir, 'hono.json');
const translationsPath = path.join(sourceDir, 'hono-translations.json');

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
/** VitePress container markers (`::: code-group`, `::: info`, closing `:::`). The
 * site's markdown-it has no container plugin, so the wrappers are dropped and the
 * code fences or paragraphs inside them render on their own. */
const CONTAINER = /^\s*:::\s*[\w-]*\s*$/;
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
/** A code span, a link or an image, or a raw HTML tag: none of it is prose. */
const TOKEN = /(`+)[^\n]*?\1|!?\[[^\]\n]*\]\([^)\n]*\)|<[^>\n]+>/g;

const pages = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const translations = fs.existsSync(translationsPath) ? JSON.parse(fs.readFileSync(translationsPath, 'utf8')) : {};
const hash = (text) => createHash('sha256').update(text).digest('hex');
const tally = { done: 0, total: 0 };

/** Only fragments that actually carry prose are counted: a bare `:::` or `1.` has
 * nothing to translate, so it must not keep a page marked English forever. */
const TRANSLATABLE = /[a-zA-Z]{2}/;
const translateText = (text) => {
  const trimmed = text.trim();
  if (!trimmed || !TRANSLATABLE.test(trimmed)) return text;
  const translated = translations[hash(trimmed)];
  if (!translated) {
    tally.total += 1;
    return text;
  }
  tally.done += 1;
  tally.total += 1;
  return text.replace(trimmed, translated);
};

/** The Arabic for a short string (page title) when a translator supplied it. */
const translateString = (text) => translations[hash(text.trim())] || text;

/** Images are served from the site: a canonical hono.dev image is rewritten to its
 * vendored copy under static/images/hono only when that copy exists, so a missing
 * file never turns into a silently broken link. */
const imageDir = path.join(root, 'static', 'images', 'hono');
const localImages = new Set(fs.existsSync(imageDir) ? fs.readdirSync(imageDir) : []);
const REMOTE_IMAGES = {
  'https://github.com/user-attachments/assets/e4393c80-29dd-408d-93ab-d55c11ccca05': 'rpc-architecture.png',
};
const localizeImages = (body) => {
  const out = body.replace(/https:\/\/hono\.dev\/images\/([A-Za-z0-9._-]+)/g, (match, name) =>
    localImages.has(name) ? `/images/hono/${name}` : match
  );
  return Object.entries(REMOTE_IMAGES).reduce(
    (text, [remote, name]) => text.replaceAll(remote, `/images/hono/${name}`),
    out
  );
};

/** Translate a link's label and leave its URL exactly as the source wrote it. */
const translateToken = (token) => {
  const link = token.match(/^(!?)\[([^\]]*)\]\((.*)\)$/);
  if (!link) return token;
  return `${link[1]}[${translateLine(link[2])}](${link[3]})`;
};

function translateLine(line) {
  let out = '';
  let cursor = 0;
  for (const match of line.matchAll(TOKEN)) {
    out += translateText(line.slice(cursor, match.index));
    out += translateToken(match[0]);
    cursor = match.index + match[0].length;
  }
  return out + translateText(line.slice(cursor));
}

/** Translate every line except the inside of a fenced code block. */
const translateBody = (body) => {
  const lines = [];
  let fence = null;
  for (const line of body.split('\n')) {
    const marker = line.match(FENCE);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      lines.push(line);
      continue;
    }
    if (marker) {
      fence = marker[1];
      lines.push(line);
      continue;
    }
    if (CONTAINER.test(line)) continue;
    lines.push(translateLine(line));
  }
  return lines.join('\n');
};

const run = () => {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const structure = HONO_CHAPTERS.map((chapter) => ({ key: chapter.key, title: chapter.title, titleAr: chapter.titleAr, sections: [] }));
  const chapters = new Map(structure.map((chapter) => [chapter.key, chapter]));
  let arabic = 0;

  for (const page of pages) {
    const chapter = chapters.get(page.key);
    if (!chapter) throw new Error(`Unknown chapter in the catalogue: ${page.key}`);
    const source = fs.readFileSync(path.join(sourceDir, `${page.key}--${page.slug}.md`), 'utf8');
    const parts = source.match(FRONTMATTER);
    if (!parts) throw new Error(`${page.key}--${page.slug}.md: no frontmatter to build from`);
    const [, head, body] = parts;
    const beforeDone = tally.done;
    const beforeTotal = tally.total;
    const translated = translateBody(body);
    const done = tally.done - beforeDone;
    const pending = tally.total - beforeTotal - done;
    const language = pending === 0 ? 'ar' : 'en';
    if (language === 'ar') arabic += 1;
    else console.log(`hono: ${page.key}--${page.slug} translated ${done} text nodes, ${pending} still to translate`);
    const title = translateString(page.title);
    fs.writeFileSync(
      path.join(outputDir, `${page.key}--${page.slug}.md`),
      `---\n${head
        .replace(/^title: .*$/m, `title: ${JSON.stringify(title)}`)
        .replace(/^lang: .*$/m, `lang: ${language}`)}\n---\n\n${localizeImages(translated).trim()}\n`
    );
    chapter.sections.push({ slug: page.slug, title, order: page.order });
  }

  fs.writeFileSync(structurePath, `${JSON.stringify({ chapters: structure }, null, 2)}\n`);
  console.log(`hono: ${pages.length} pages built (${arabic} Arabic, ${pages.length - arabic} still English), ${tally.done}/${tally.total} text nodes translated`);
};

run();
