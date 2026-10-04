#!/usr/bin/env node
/**
 * Rebuild crypto-101's figures from the book's own reST sources.
 *
 * crypto-101 was imported by converting its rendered HTML to markdown, which
 * lost the structure of every `figure`, `figmatrix` and `subfigure` directive.
 * A directive's options were flushed into the prose as their bare values, so
 * `:align: center` became a paragraph reading `center`, `:label:` and `:width:`
 * became `fix-encrypted-ecb` and `0.48` in front of the picture, and every
 * `.. _target:` became the literal line `   .. _fig-something:`. A subfigure's
 * body kept the directive's indentation, so captions indented by six spaces
 * rendered as a `<pre><code>` block instead of a caption.
 *
 * `content-src/<book>/<section>.rst` still holds the untouched directives, so
 * this script reads them as the oracle: every directive is paired with the
 * markdown image that carries its file, and the option values are then removed
 * by position rather than guessed from their text. Anything that does not line
 * up — an option run of the wrong length, an option value that is really prose,
 * an image the reST does not mention — aborts the whole section instead of
 * being rewritten on a guess.
 *
 * Hyperlink targets become real anchors on the image they label, the same
 * `{#id}` convention the rest of the pipeline uses, and a caption indented
 * deeply enough to become a code block is pulled back to three spaces.
 *
 * Usage: node scripts/repair-rst-figures.mjs [--write] [--log] [book ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const write = args.includes('--write');
const log = args.includes('--log');
const requested = args.filter((arg) => !arg.startsWith('--'));

const IMAGE_DIRECTIVES = new Set(['figure', 'figmatrix', 'subfigure', 'image']);

const directivePattern = () => /^([ ]*)\.\.[ ]+([A-Za-z][A-Za-z0-9_-]*)::[ \t]*(.*)$/;
const optionPattern = () => /^([ ]*):([A-Za-z][A-Za-z0-9_-]*):[ \t]*(.*)$/;
const targetPattern = () => /^([ ]*)\.\.[ ]+_([^:]+):[ \t]*$/;
const imagePattern = () => /!\[[^\][]*\]\(([^)\s]+)\)/;
const anchorPattern = () => /^(!\[[^\][]*\]\([^)\s]+\))(\{[^}]*\})?/;
/** A paragraph the converter dropped in place of a directive option value. */
const optionValuePattern = () => /^\S+(?: \S+){0,9}$/;
/** A reST target name that can become an HTML id. */
const anchorNamePattern = () => /^[A-Za-z_][A-Za-z0-9_:.-]*$/;

/** @param {string} line @returns {number} */
function indentOf(line) {
  return line.length - line.trimStart().length;
}

/** @param {string} value @returns {string} the file name without its extension */
function stemOf(value) {
  return path.basename(value).replace(/\.[A-Za-z0-9]+$/, '');
}

/**
 * Every image-bearing reST directive, in document order, with the options and
 * hyperlink targets the conversion dropped.
 *
 * @param {string} source the reST text
 * @returns {{ stem: string, options: string[], targets: string[], leading: string[],
 *   hasBody: boolean }[]}
 */
function parseImageSpecs(source) {
  const lines = source.split('\n');
  const specs = [];

  /**
   * @param {number} from @param {number} to
   * @param {{ options: string[], targets: string[] } | null} carry what an
   *   enclosing `figmatrix` contributes before its first picture
   * @returns {void}
   */
  function walk(from, to, carry) {
    let index = from;
    let pendingTargets = [];
    let activeCarry = carry;

    while (index < to) {
      const target = targetPattern().exec(lines[index]);
      if (target) {
        pendingTargets.push(target[2]);
        index += 1;
        continue;
      }

      if (!lines[index].trim()) {
        index += 1;
        continue;
      }

      const directive = directivePattern().exec(lines[index]);
      if (!directive || !IMAGE_DIRECTIVES.has(directive[2])) {
        // Anything else ends the run of `.. _target:` lines a directive can
        // claim, so a section label never lands on the next picture.
        pendingTargets = [];
        index += 1;
        continue;
      }

      const base = directive[1].length;
      let end = index + 1;
      while (end < to) {
        if (lines[end].trim() && indentOf(lines[end]) <= base) break;
        end += 1;
      }

      // reST field lists are contiguous, so the options are the lines that
      // follow the directive with nothing but more indentation between them.
      const options = [];
      let cursor = index + 1;
      while (cursor < end) {
        const option = optionPattern().exec(lines[cursor]);
        if (!option || option[1].length <= base) break;
        if (option[3].trim()) options.push(option[3].trim());
        cursor += 1;
      }

      const targetsInside = (/** @type {number} */ from2, /** @type {number} */ to2) => {
        const found = [];
        for (let at = from2; at < to2; at += 1) {
          const inner = targetPattern().exec(lines[at]);
          if (inner) found.push(inner[2]);
        }
        return found;
      };

      let firstNested = -1;
      for (let at = index + 1; at < end; at += 1) {
        const inner = directivePattern().exec(lines[at]);
        if (inner && IMAGE_DIRECTIVES.has(inner[2]) && inner[1].length > base) {
          firstNested = at;
          break;
        }
      }

      if (firstNested >= 0) {
        walk(index + 1, end, {
          options: [...(activeCarry?.options ?? []), ...options],
          targets: [...pendingTargets, ...targetsInside(index + 1, firstNested)],
        });
        activeCarry = null;
        pendingTargets = [];
        index = end;
        continue;
      }

      const targets = [...pendingTargets, ...targetsInside(index + 1, end)];
      pendingTargets = [];
      if (directive[3].trim()) {
        const body = lines.slice(index + 1, end)
          .filter((line) => line.trim() && !optionPattern().test(line) && !targetPattern().test(line));
        specs.push({
          stem: stemOf(directive[3].trim()),
          options,
          leading: activeCarry?.options ?? [],
          targets: [...(activeCarry?.targets ?? []), ...targets],
          hasBody: body.length > 0,
        });
      }
      activeCarry = null;
      index = end;
    }
  }

  walk(0, lines.length, null);
  return specs;
}

/** @param {string} markdown @returns {{ lines: string[], fenced: boolean[] }} */
function readLines(markdown) {
  const lines = markdown.split('\n');
  const fenced = [];
  let fence = null;
  for (const line of lines) {
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (open) {
      if (!fence) fence = open[1][0];
      else if (open[1][0] === fence && !line.trim().replace(/[`~]/g, '')) fence = null;
      fenced.push(true);
      continue;
    }
    fenced.push(fence !== null);
  }
  return { lines, fenced };
}

/**
 * @param {string[]} lines
 * @param {boolean[]} fenced
 * @param {ReturnType<typeof parseImageSpecs>} specs
 * @returns {{ removed: number, anchors: number, captions: number, out: string[] }}
 */
function planSection(lines, fenced, specs) {
  const removed = new Set();
  const anchors = new Map();
  const captions = new Map();
  let unusable = 0;

  /** @param {number} at @param {number} from @returns {number} */
  const findImage = (stem, from) => {
    for (let at = from; at < lines.length; at += 1) {
      if (fenced[at]) continue;
      const image = imagePattern().exec(lines[at]);
      if (!image) continue;
      const local = stemOf(image[1]);
      if (local === stem || local.endsWith(`-${stem}`) || local.endsWith(`_${stem}`)) return at;
    }
    return -1;
  };

  /** @param {number} at @returns {number} the next line with text on it */
  const nextText = (at) => {
    while (at < lines.length && !lines[at].trim()) at += 1;
    return at;
  };

  /** @param {number} at @returns {number} the previous line with text on it */
  const previousText = (at) => {
    while (at >= 0 && !lines[at].trim()) at -= 1;
    return at;
  };

  let searchFrom = 0;
  for (const spec of specs) {
    const at = findImage(spec.stem, searchFrom);
    if (at < 0) throw new Error(`no markdown image for the ${spec.stem} figure`);
    searchFrom = at + 1;

    // The converter emitted each option value as its own unindented paragraph
    // directly after the image, keeping the order the reST gave them.
    let after = nextText(at + 1);
    for (let taken = 0; taken < spec.options.length; taken += 1) {
      if (after >= lines.length) throw new Error(`the ${spec.stem} figure is missing option value ${taken + 1}`);
      const line = lines[after];
      if (fenced[after] || imagePattern().test(line) || indentOf(line) !== 0
        || line.length > 200 || !optionValuePattern().test(line.trim())) {
        throw new Error(`the ${spec.stem} figure has unexpected line ${after + 1}: ${line.trim().slice(0, 60)}`);
      }
      removed.add(after);
      after = nextText(after + 1);
    }
    if (spec.hasBody && (after >= lines.length || indentOf(lines[after]) < 3)) {
      throw new Error(`the ${spec.stem} figure runs into prose at line ${after + 1}`);
    }

    // Above the image sit the `.. _target:` lines and, for the first picture of
    // a `figmatrix`, the options of the matrix itself.
    let before = previousText(at - 1);
    while (before >= 0 && targetPattern().test(lines[before])) {
      removed.add(before);
      before = previousText(before - 1);
    }
    let matchedLeading = 0;
    for (; matchedLeading < spec.leading.length; matchedLeading += 1) {
      if (before < 0 || indentOf(lines[before]) !== 0
        || !optionValuePattern().test(lines[before].trim())) break;
      removed.add(before);
      before = previousText(before - 1);
    }
    if (matchedLeading !== spec.leading.length) {
      throw new Error(`the ${spec.stem} figure is missing its enclosing options`);
    }

    if (spec.targets.length) {
      const ids = [...new Set(spec.targets)].filter((name) => anchorNamePattern().test(name));
      if (ids.length) anchors.set(at, ids);
      else unusable += spec.targets.length;
    }

    // The directive's body kept the directive's indentation, which turns into a
    // code block past three spaces.
    let body = nextText(after);
    while (body < lines.length && lines[body].trim() && indentOf(lines[body]) >= 3) {
      if (indentOf(lines[body]) > 3) captions.set(body, 3);
      body += 1;
    }
  }

  const out = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (removed.has(index)) continue;
    let line = captions.has(index) ? ' '.repeat(captions.get(index)) + lines[index].trimStart() : lines[index];
    if (anchors.has(index)) {
      const ids = anchors.get(index).map((name) => `#${name}`).join(' ');
      const at = anchorPattern().exec(line);
      if (!at) throw new Error(`the image on line ${index + 1} has no anchor position`);
      line = `${at[1]}{${ids}${at[2] ? ` ${at[2].slice(1)}` : ''}}`;
    }
    out.push(line);
  }

  return { removed: removed.size, anchors: anchors.size, captions: captions.size, unusable, out };
}

const report = [];

for (const book of requested) {
  const dir = path.join(root, 'content', book);
  const sourceDir = path.join(root, 'content-src', book);
  if (!fs.existsSync(dir)) continue;
  const counts = { sections: 0, removed: 0, anchors: 0, captions: 0, unusable: 0, skipped: [] };

  for (const entry of fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const file = path.join(dir, entry);
    const source = path.join(sourceDir, entry.replace('--index.md', '.rst'));
    if (!fs.existsSync(source)) continue;
    const specs = parseImageSpecs(fs.readFileSync(source, 'utf8'));
    if (!specs.length) continue;

    const original = fs.readFileSync(file, 'utf8');
    const { lines, fenced } = readLines(original);
    try {
      const plan = planSection(lines, fenced, specs);
      counts.sections += 1;
      counts.removed += plan.removed;
      counts.anchors += plan.anchors;
      counts.captions += plan.captions;
      counts.unusable += plan.unusable;

      const body = plan.out.join('\n').replace(/\n{3,}/g, '\n\n');
      if (write && body !== original) fs.writeFileSync(file, body);
      if (log) console.log(`  ${book}/${entry}: ${plan.anchors} anchors, ${plan.captions} captions`);
    } catch (error) {
      counts.skipped.push(`${entry}: ${error.message}`);
    }
  }

  if (counts.sections || counts.skipped.length) report.push({ book, ...counts });
}

for (const row of report) {
  console.log(
    `${row.book.padEnd(22)} sections ${String(row.sections).padStart(3)}`
    + `  removed ${String(row.removed).padStart(4)}  anchors ${String(row.anchors).padStart(4)}`
    + `  captions ${String(row.captions).padStart(4)}`
    + (row.unusable ? `  unusable targets ${row.unusable}` : '')
    + (row.skipped.length ? `  skipped ${row.skipped.length}` : ''),
  );
  for (const note of row.skipped) console.log(`    ! ${note}`);
}

if (!report.length) console.log('Nothing to repair.');
