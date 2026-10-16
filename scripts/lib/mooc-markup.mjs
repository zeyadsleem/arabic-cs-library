/** Course components the reader renders as ordinary markdown.
 *
 * The course site wraps its material in PreTeXt/MDX components. Most are turned
 * into markdown on import; these rules cover the rest.
 *
 * Three kinds of thing share the `<name>` syntax, and conflating them destroys
 * content, so each is handled separately:
 *
 *  - **Wrappers** (`<text-box>`, `<quiz>`, …) carry prose that must survive and
 *    a tag that must not. Converted, or dropped once their content is markdown.
 *  - **Notation placeholders** (`<expression>`, `<item>`, `<series>`,
 *    `<condition>`) are the course's own syntax notation, the same role as
 *    italics in a formula. They are prose and must be kept — as inline code.
 *  - **Program output** (`<stdin>`, `<module>`, `<class 'str'>`) is ordinary
 *    text inside fenced code. Fenced code is never touched by any rule here.
 */

/** Components whose content is prose the reader should see. */
const WRAPPERS = [
  'text-box', 'sample-output', 'sample-data', 'notice', 'in-browser-programming-exercise',
  'programming-exercise', 'programming-exercises', 'quiz', 'pages-in-this-section',
  'exercises-in-this-section', 'exercises-in-all-sections', 'table-of-contents'
];

/** Components the course uses as syntax notation, e.g. `[<expression> for <item> in <series>]`. */
const NOTATION = ['expression', 'item', 'series', 'condition', 'block', 'class', 'variable', 'vocabulary'];

const LOG = 'ملاحظة';

/** Map `text` to `fn` on the parts of `markdown` that are neither fenced code nor inline code. */
export const outsideCode = (markdown, fn) =>
  markdown
    .split(/(^```[\s\S]*?^```$)/m)
    .map((block, index) => (index % 2 === 1 ? block : fn(block)))
    .join('');

/** Split on inline code spans, leaving them untouched in the odd-indexed parts. */
const outsideSpans = (markdown, fn) =>
  markdown
    .split(/(`+[^`]*`+)/)
    .map((part, index) => (index % 2 === 1 ? part : fn(part)))
    .join('');

/** Rewrite every `text-box` as a quoted note headed by its own name.
 * @param {string} markdown @returns {string}
 */
export const rewriteTextBoxes = (markdown) =>
  markdown.replace(
    /<text-box\s+([^>]*)>([\s\S]*?)<\/text-box>/g,
    (match, attributes, content) => {
      const name = attributes.match(/name=["']([^"']*)["']/)?.[1]?.trim();
      const body = content
        .trim()
        .split('\n')
        .map((line) => (line.trim() ? `> ${line}` : '>'))
        .join('\n');
      return `> **${name || LOG}**\n>\n${body}\n`;
    }
  );

/** Name the `<programming-exercise>` fallback gave itself, so the label reads once. */
export const dropDuplicatedExerciseNames = (markdown) =>
  markdown.replace(/^> \*\*تمرين برمجي: تمرين برمجي\*\*$/gm, '> **تمرين برمجي**');

/** Show notation placeholders as inline code so the reader does not show a raw tag. */
export const markNotation = (markdown) => {
  const pattern = new RegExp(`<(?:${NOTATION.join('|')})(?:\\s[^>]*)?>`, 'g');
  return outsideCode(markdown, (block) =>
    outsideSpans(block, (part) => part.replace(pattern, (tag) => `\`${tag}\``))
  );
};

/** Drop opening and closing tags of wrapper components that no rule converted.
 * Their content has already been written out as markdown; only the wrapper is left.
 * @param {string} markdown @returns {string}
 */
export const stripOrphanComponents = (markdown) => {
  const pattern = new RegExp(`</?(?:${WRAPPERS.join('|')})(?:\\s[^>]*)?/?>`, 'g');
  return outsideCode(markdown, (block) => block.replace(pattern, ''));
};

/** Every conversion this module owns, in the order they must run. */
export const normalizeCourseMarkup = (markdown) =>
  stripOrphanComponents(markNotation(dropDuplicatedExerciseNames(rewriteTextBoxes(markdown))));