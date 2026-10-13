/** Build the published kinney pages from the staged English source.
 *
 * `content-src/kinney/<course>--<lesson>.md` holds the untouched English body.
 * `content-src/kinney-translations.json` maps a page key (`<course>--<lesson>`)
 * to its Arabic title and a map of translated text segments. A page is emitted
 * with `lang: ar` once its segments are all translated and with `lang: en`
 * until then, so the book stays buildable while translation is still in flight.
 *
 * Only prose segments are ever replaced: fenced code blocks, inline code, link
 * and image destinations, autolinks and heading anchors are carried over from
 * the English source verbatim. A prose segment is one run of text between those
 * markers on a line outside code fences, including any markdown that wraps it,
 * so a translator sees exactly the string whose hash they are filling in.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content-src', 'kinney');
const outputDir = path.join(root, 'content', 'kinney');
const structurePath = path.join(root, 'content', 'kinney-structure.json');
const translationsPath = path.join(root, 'content-src', 'kinney-translations.json');

const hash = (text) => createHash('sha256').update(text).digest('hex');
const escape = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const isFenceEnd = (line, fence) => {
  const closer = line.match(FENCE);
  return Boolean(closer) && closer[1][0] === fence[0] && closer[1].length >= fence.length && !closer[2].trim();
};

/** Markup whose text must survive translation untouched: inline code, the
 * destination half of a link or image (the label stays translatable),
 * autolinks and heading anchors.
 */
const PROTECTED = /(``[^`\n]+``|`[^`\n]*`|\]\(\s*(?:<[^>\n]*>|[^()\s]*)(?:\s+"[^"\n]*")?\s*\)|<https?:\/\/[^>\s]+>|\{#[^}\s]+\})/g;

/** Split one markdown line into prose runs and preserved markup.
 * @param {string} line @returns {Array<{text: string, preserved: boolean}>}
 */
const segments = (line) => {
  const parts = [];
  let cursor = 0;
  for (const match of line.matchAll(PROTECTED)) {
    if (match.index > cursor) parts.push({ text: line.slice(cursor, match.index), preserved: false });
    parts.push({ text: match[0], preserved: true });
    cursor = match.index + match[0].length;
  }
  if (cursor < line.length) parts.push({ text: line.slice(cursor), preserved: false });
  return parts;
};

const translatable = (text) => /[a-zA-Z]{2}/.test(text.trim());

/** @param {string} markdown @param {Record<string, string>} translations @param {{segments: number, missing: string[]}} report @returns {string} */
const translateBody = (markdown, translations, report) => {
  const lines = markdown.split('\n');
  const out = [];
  let fence = null;
  for (const line of lines) {
    const marker = line.match(FENCE);
    if (!fence && marker) {
      fence = marker[1];
      out.push(line);
      continue;
    }
    if (fence) {
      if (isFenceEnd(line, fence)) fence = null;
      out.push(line);
      continue;
    }
    out.push(
      segments(line)
        .map(({ text, preserved }) => {
          if (preserved || !translatable(text)) return text;
          const key = hash(text.trim());
          if (!Object.hasOwn(translations, key)) {
            report.missing.push(text.trim().slice(0, 60));
            return text;
          }
          report.segments += 1;
          return text.replace(text.trim(), escape(translations[key]));
        })
        .join('')
    );
  }
  return out.join('\n');
};

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

const main = () => {
  if (!fs.existsSync(translationsPath)) fs.writeFileSync(translationsPath, '{}\n');
  const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
  const structure = JSON.parse(fs.readFileSync(structurePath, 'utf8'));

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const report = { pages: 0, arabic: 0, english: 0, segments: 0, missing: [] };
  const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith('.md')).sort();

  for (const file of files) {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
    const key = `${data.chapter}--${data.slug}`;
    const entry = translations[key];
    const title = typeof entry?.title === 'string' && entry.title.trim() ? entry.title.trim() : data.title;
    const lang = entry ? 'ar' : 'en';
    const output = entry ? translateBody(body, entry.segments || {}, report) : body;
    if (entry) report.arabic += 1;
    else report.english += 1;
    fs.writeFileSync(
      path.join(outputDir, file),
      `---\ntitle: ${JSON.stringify(title)}\nlang: ${lang}\nsource: ${JSON.stringify(data.source || '')}\n---\n\n${output.trim()}\n`
    );
    report.pages += 1;

    for (const chapter of structure.chapters) {
      if (chapter.key !== data.chapter) continue;
      const section = chapter.sections.find((item) => item.slug === data.slug);
      if (section) section.title = title;
    }
  }

  fs.writeFileSync(structurePath, `${JSON.stringify(structure, null, 2)}\n`);
  console.log(`kinney: ${report.pages} pages (${report.arabic} Arabic, ${report.english} English), ${report.segments} segments translated`);
  if (report.missing.length) {
    console.warn(`kinney: ${report.missing.length} segments have no translation yet`);
  }
};

main();
