/** Shared rules for the Arabic page translations of imported books.
 *
 * A translation is one markdown file per page, named `<chapter>--<slug>.md` after
 * its staged English source, for example `part-4--2-more-functions.md`. Each file
 * carries the Arabic page title in its frontmatter and the full Arabic body below
 * it.
 *
 * Every rule here exists because a page shipped without it renders wrong or reads
 * as untranslated English, so both the builder and the `check-*` script of a book
 * enforce the same set instead of trusting whatever a translation happens to contain.
 */
import fs from 'node:fs';
import matter from 'gray-matter';

const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const closesFence = (marker, open) =>
  Boolean(marker) && marker[1][0] === open.char && marker[1].length >= open.len && !marker[2].trim();

/** Fenced code, in document order: the library renders it verbatim.
 * Trailing whitespace is dropped per line: the sources carry it, and requiring a
 * translator to retype invisible spaces would fail correct translations.
 * @param {string} markdown @returns {Array<{lang: string, body: string}>}
 */
export const codeFences = (markdown) => {
  const fences = [];
  let open = null;
  let body = [];
  for (const line of markdown.split('\n')) {
    const marker = line.match(FENCE);
    if (open) {
      if (closesFence(marker, open)) {
        fences.push({ lang: open.info, body: body.map((line) => line.replace(/\s+$/, '')).join('\n') });
        open = null;
        body = [];
      } else {
        body.push(line);
      }
      continue;
    }
    if (marker) open = { char: marker[1][0], len: marker[1].length, info: marker[2].trim() };
  }
  if (open) fences.push({ lang: open.info, body: body.join('\n') });
  return fences;
};

/** Every inline link target, in document order. @param {string} markdown @returns {string[]} */
export const linkTargets = (markdown) =>
  [...markdown.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1].trim());

/** Markdown with code removed, so code cannot hide or fake Arabic text.
 * Fenced blocks and inline spans both count: the library renders both verbatim.
 * @param {string} markdown @returns {string}
 */
export const withoutCodeFences = (markdown) => {
  const lines = [];
  let open = null;
  for (const line of markdown.split('\n')) {
    const marker = line.match(FENCE);
    if (open) {
      if (closesFence(marker, open)) open = null;
      continue;
    }
    if (marker) {
      open = { char: marker[1][0], len: marker[1].length };
      continue;
    }
    lines.push(line.replace(/`[^`]*`/g, ' '));
  }
  return lines.join('\n');
};

export const ARABIC_LETTER = /[\u0621-\u064A]/;
const LATIN_WORD = /^[A-Za-z][A-Za-z'’-]*$/;

/** Prose words outside code and link destinations, in either script.
 * Compared between a source and its translation to catch pages that were
 * summarized, truncated, or replaced by a placeholder instead of translated.
 * @param {string} markdown @returns {number}
 */
export const proseWordCount = (markdown) =>
  (withoutDestinations(markdown).match(/[A-Za-z][A-Za-z'’-]*|[\u0621-\u064A]+/g) || []).length;

/** Text a translator left behind that is not page content: a tool's output
 * envelope, an absolute path, or a note about the translation itself. A page
 * carrying any of these is broken even when its Arabic ratio looks healthy.
 * @param {string} markdown @returns {string[]}
 */
export const leakedText = (markdown) => {
  const found = [];
  const text = withoutCodeFences(markdown);
  const patterns = [
    /^\s*filePath">/m,
    /^\s*\/(?:home|Users)\/[\w./-]+\.md\s*$/m,
    /<\|(?:end|start|message|channel|constrain)\|>/,
    /<rfl:parameter/,
    /تمت ترجمة هذا القسم/,
    /ترجمة مختصرة/,
    /راجع المصدر الإنجليزي/,
    /صفحة مترجمة/,
    /(?:Oops|Hmm),? (?:I|wait|let me)/i,
    /let me (?:rewrite|fix)/i,
    /need (?:fully )?Arabic/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) found.push(match[0]);
  }
  return found;
};

/** An inline link or image: the label is prose, the destination is not. */
const INLINE_LINK = /(!?\[)([^\]]*)(\]\(\s*(?:<[^>\n]*>|[^()\s]*)(?:\s+"[^"\n]*")?\s*\))/g;
/** A link reference definition carries a destination and no prose. */
const LINK_DEFINITION = /^[ \t]*\[[^\]\n]+\]:[ \t]*\S+.*$/gm;

/** Markdown with code and every link destination removed: the translatable prose.
 * A destination is copied byte-for-byte and never translated, so counting the
 * Latin letters of a URL as prose would sink an otherwise complete page such as a
 * lecture or reference table, whose rows are mostly external links.
 * Link labels are prose and are kept.
 * @param {string} markdown @returns {string}
 */
export const withoutDestinations = (markdown) =>
  withoutCodeFences(markdown)
    .replace(INLINE_LINK, '$1$2]()')
    .replace(LINK_DEFINITION, '')
    .replace(/<https?:\/\/[^>\s]+>/g, ' ')
    .replace(/(?<![("'\w])https?:\/\/\S+/g, ' ');

/** Share of Arabic letters among all letters outside code and link destinations:
 * 1 means fully Arabic. A translated page sits well above 0.5; an English page
 * pasted under an Arabic title lands near 0.
 * @param {string} markdown @returns {number}
 */
export const arabicLetterRatio = (markdown) => {
  const text = withoutDestinations(markdown);
  const arabic = (text.match(/[\u0621-\u064A]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return arabic + latin === 0 ? 0 : arabic / (arabic + latin);
};

/** Lines that are still English prose: enough words, and almost no Arabic.
 *
 * The page-wide ratio and the longest Latin run both tolerate a page that is
 * mostly translated but leaves a paragraph or an exercise prompt in English —
 * a 20-word English paragraph sits just under the run limit. A line carries at
 * least `UNTRANSLATED_MINIMUM_WORDS` words, and Arabic is a small share of its
 * letters, then it was left behind rather than translated.
 *
 * @param {string} markdown @returns {string[]}
 */
export const untranslatedLines = (markdown) => {
  const found = [];
  for (const line of withoutDestinations(markdown).split('\n')) {
    const words = line.split(/\s+/).filter((token) => LATIN_WORD.test(token));
    const threshold = HEADING_LINE.test(line) ? UNTRANSLATED_HEADING_MINIMUM_WORDS : UNTRANSLATED_MINIMUM_WORDS;
    if (words.length < threshold) continue;
    const arabic = (line.match(/[\u0621-\u064A]/g) || []).length;
    const latin = (line.match(/[A-Za-z]/g) || []).length;
    if (arabic + latin === 0 || arabic / (arabic + latin) >= UNTRANSLATED_ARABIC_SHARE) continue;
    found.push(line.trim());
  }
  return found;
};

/** Longest run of consecutive Latin words on a single line, code and link
 * destinations excluded. Arabic lines carry a term or two at most; untranslated
 * prose runs far longer.
 * @param {string} markdown @returns {number}
 */
export const longestLatinRun = (markdown) => {
  let longest = 0;
  for (const line of withoutDestinations(markdown).split('\n')) {
    let run = 0;
    for (const token of line.split(/[\s()[\].„“”,":;!?<>|=+*/\\_`{}]+/)) {
      if (LATIN_WORD.test(token)) {
        run += 1;
        if (run > longest) longest = run;
      } else {
        run = 0;
      }
    }
  }
  return longest;
};

/** Plain HTML the library renders; anything else is an unrendered component.
 * Some source sites ship framework components (`<text-box>`, `<sample-output>`)
 * that the reader shows as nothing at all, so a translation rewrites them as
 * markdown instead of copying them through.
 */
export const RENDERED_HTML_TAGS = new Set([
  'a', 'abbr', 'audio', 'b', 'big', 'blockquote', 'br', 'canvas', 'center', 'cite', 'code',
  'dd', 'del', 'details', 'div', 'dl', 'dt', 'em', 'figcaption', 'figure', 'font', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'iframe', 'img', 'ins', 'kbd', 'li', 'mark', 'ol', 'p',
  'picture', 'pre', 'q', 's', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
  'sup', 'svg', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul', 'video', 'wbr',
]);

/** Tags outside code that the reader cannot render.
 * `<https://…>` is a markdown autolink, not a tag, so it is skipped.
 * @param {string} markdown @returns {string[]}
 */
export const unrenderedTags = (markdown) => {
  const tags = [];
  for (const line of withoutCodeFences(markdown).split('\n')) {
    for (const match of line.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9-]*)(?=[\s/>])/g)) {
      if (match[1].toLowerCase() === 'http' || match[1].toLowerCase() === 'https') continue;
      if (!RENDERED_HTML_TAGS.has(match[1].toLowerCase())) tags.push(match[1]);
    }
  }
  return tags;
};

/** Below this share of Arabic letters the page is not translated. */
export const ARABIC_RATIO_MINIMUM = 0.5;
/** Above this many Latin words in a row the page still carries English prose. */
export const LATIN_RUN_MAXIMUM = 20;
/** A source page shorter than this is too small for a useful word comparison. */
const COMPLETENESS_SOURCE_MINIMUM_WORDS = 120;
/** Below this share of the source's prose words the translation was summarized
 * or truncated. Arabic is terser than English, so a faithful page stays well
 * above half; a placeholder lands near zero. */
export const SOURCE_COVERAGE_MINIMUM = 0.4;
/** A line with at least this many Latin words, and this little Arabic, was left untranslated. */
const UNTRANSLATED_MINIMUM_WORDS = 12;
/** Headings are short, so they clear the prose threshold by accident: the English
 * `## Removing keys and values from a dictionary` sat below the 12-word rule. */
const UNTRANSLATED_HEADING_MINIMUM_WORDS = 4;
const UNTRANSLATED_ARABIC_SHARE = 0.2;
/** A markdown heading line. Blockquote prefixes are excluded on purpose: a
 * `> # comment` line is a Python comment inside a quoted code block, not a
 * heading, and quoting a real heading is rare enough not to guess at. */
const HEADING_LINE = /^\s{0,3}#{1,6}\s+\S/;

/** Read one translation file.
 * @param {string} directory @param {string} key @returns {{title: string, body: string} | null}
 */
export const readTranslation = (directory, key) => {
  const file = `${directory}/${key}.md`;
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  return {
    title: typeof parsed.data.title === 'string' ? parsed.data.title.trim() : '',
    body: parsed.content,
  };
};

/** Every staged English page, in source order.
 * @param {string} sourceDirectory @returns {Array<{key: string, chapter: string, slug: string, order: number, title: string, source: string, body: string}>}
 */
export const stagedPages = (sourceDirectory) =>
  fs
    .readdirSync(sourceDirectory)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(`${sourceDirectory}/${file}`, 'utf8');
      const { data, content } = matter(raw);
      return {
        key: `${data.chapter}--${data.slug}`,
        chapter: String(data.chapter),
        slug: String(data.slug),
        order: Number(data.order),
        title: String(data.title ?? ''),
        source: String(data.source ?? ''),
        body: content,
      };
    });

/** Compare one translation against its English source page.
 * @param {string} key @param {string} source @param {{title: string, body: string}} translation
 * @returns {string[]} problems, empty when the page may be published
 */
export const validatePageTranslation = (key, source, translation) => {
  const problems = [];
  const sourceFences = codeFences(source);
  const arabicFences = codeFences(translation.body);

  if (sourceFences.length !== arabicFences.length) {
    problems.push(
      `${key}: ${sourceFences.length} code blocks in the source, ${arabicFences.length} in the translation`
    );
  }
  for (const [index, block] of sourceFences.entries()) {
    const translated = arabicFences[index];
    if (!translated) break;
    if (block.lang !== translated.lang) {
      problems.push(
        `${key}: code block ${index + 1} language changed (${block.lang || 'none'} -> ${translated.lang || 'none'})`
      );
    }
    if (block.body !== translated.body) {
      problems.push(`${key}: code block ${index + 1} body changed`);
    }
  }

  const sourceLinks = linkTargets(source).sort();
  const arabicLinks = linkTargets(translation.body).sort();
  if (sourceLinks.join('\n') !== arabicLinks.join('\n')) {
    problems.push(
      `${key}: link targets differ (${sourceLinks.length} in the source, ${arabicLinks.length} in the translation)`
    );
  }

  if (!translation.body.trim()) {
    problems.push(`${key}: empty body`);
    return problems;
  }
  const leaked = leakedText(translation.body);
  if (leaked.length) {
    problems.push(`${key}: leaked non-page text: ${JSON.stringify(leaked[0])}`);
  }
  const sourceWords = proseWordCount(source);
  const translationWords = proseWordCount(translation.body);
  if (
    sourceWords >= COMPLETENESS_SOURCE_MINIMUM_WORDS &&
    translationWords / sourceWords < SOURCE_COVERAGE_MINIMUM
  ) {
    problems.push(
      `${key}: translation covers ${Math.round(
        (translationWords / sourceWords) * 100
      )}% of the source prose — the page was summarized or truncated`
    );
  }
  const ratio = arabicLetterRatio(translation.body);
  if (ratio < ARABIC_RATIO_MINIMUM) {
    problems.push(
      `${key}: only ${Math.round(ratio * 100)}% Arabic letters outside code — the text is still English`
    );
  }
  const latinRun = longestLatinRun(translation.body);
  if (latinRun > LATIN_RUN_MAXIMUM) {
    problems.push(`${key}: line of ${latinRun} consecutive Latin words outside code`);
  }
  const untranslated = untranslatedLines(translation.body);
  if (untranslated.length) {
    problems.push(
      `${key}: ${untranslated.length} line(s) still in English, first: ${JSON.stringify(
        untranslated[0].slice(0, 90)
      )}`
    );
  }
  const tags = unrenderedTags(translation.body);
  if (tags.length) {
    const names = [...new Set(tags)].slice(0, 4).join(', ');
    problems.push(`${key}: unrendered component ${names}${tags.length > 4 ? ` (+${tags.length - 4})` : ''}`);
  }
  if (!ARABIC_LETTER.test(translation.title)) {
    problems.push(`${key}: title is not Arabic (${JSON.stringify(translation.title)})`);
  }

  return problems;
};
