/** Apply source cleanup without modifying fenced or inline code, or raw HTML code blocks.
 * @param {string} source @param {(text: string) => string} transform @returns {string}
 */
export function outsideCode(source, transform) {
  let output = '', prose = '', fence = null;
  function flush() {
    const protectedParts = /<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|(`+)[^\n]*?\1/gi;
    let cursor = 0;
    for (const part of prose.matchAll(protectedParts)) {
      output += transform(prose.slice(cursor, part.index)) + part[0];
      cursor = part.index + part[0].length;
    }
    output += transform(prose.slice(cursor));
    prose = '';
  }
  for (const line of source.split(/(?<=\n)/)) {
    const match = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      output += line;
      if (match && match[1][0] === fence[0] && match[1].length >= fence.length && !match[2].trim()) fence = null;
    } else if (match) {
      flush(); fence = match[1]; output += line;
    } else prose += line;
  }
  flush();
  return output;
}

/** Alternate print-only content in 500 Lines must not appear a second time in HTML.
 * @param {string} source @returns {string}
 */
export function normalizeSourceMarkup(source) {
  return outsideCode(source, (text) => {
    text = text.replace(/<latex\b[^>]*>[\s\S]*?<\/latex>/gi, '').replace(/<\/?html>/gi, '');
    const candidates = /\\label\{([\w:.-]+)\}|\$|\\\(|\\\[|\\begin\{[\w*]+\}/g;
    let output = '', cursor = 0, match;
    while ((match = candidates.exec(text))) {
      if (match[1]) {
        output += text.slice(cursor, match.index) + `<span class="content-anchor" id="${match[1]}"></span>`;
        cursor = candidates.lastIndex;
      } else {
        const math = readMathExpression(text, match.index);
        if (math) candidates.lastIndex = math.end;
      }
    }
    return output + text.slice(cursor);
  });
}

/** @param {import('markdown-it')} markdown @returns {void} */
export function installSourceAttributes(markdown) {
  markdown.block.ruler.before('html_block', 'print_only_latex', (state, start, end, silent) => {
    if (state.sCount[start] - state.blkIndent >= 4) return false;
    const position = state.bMarks[start] + state.tShift[start];
    if (!/^<latex\s*>/i.test(state.src.slice(position))) return false;
    let finish = start;
    while (finish < end && !/<\/latex>/i.test(state.src.slice(state.bMarks[finish], state.eMarks[finish]))) finish++;
    if (finish >= end) return false;
    if (!silent) state.line = finish + 1;
    return true;
  });

  markdown.renderer.rules.html_block = (tokens, index) => {
    const html = tokens[index].content;
    if (!/<table\b/i.test(html)) return html;
    const document = parse(html);
    function convertChildren(element, protectedCode = false) {
      const preserve = protectedCode || ['PRE', 'CODE', 'SCRIPT', 'STYLE'].includes(element.tagName);
      if (preserve) return;
      for (const child of [...element.childNodes]) {
        if (child.nodeType === 1) convertChildren(child);
        else if (child.nodeType === 3 && /`|\$|\\\(|\\\[|\\begin/.test(child.rawText)) {
          const replacements = parse(markdown.renderInline(child.rawText)).childNodes;
          const offset = element.childNodes.indexOf(child);
          for (const replacement of replacements) replacement.parentNode = element;
          element.childNodes.splice(offset, 1, ...replacements);
        }
      }
    }
    convertChildren(document);
    return document.toString();
  };
  markdown.inline.ruler.before('escape', 'source_attributes', (state, silent) => {
    const tail = state.src.slice(state.pos);
    const label = tail.match(/^\\label\{([\w:.-]+)\}/);
    const attributes = tail.match(/^\{((?:\s*[.#][\w:.-]+\s*)+)\}/);
    const match = label || attributes;
    if (!match) return false;
    // One target may carry several identities: Sphinx figures are reachable both
    // through the wrapper id of the `<figure>` and through the label span in
    // front of the image, and prose links use the second one.
    const ids = label ? [label[1]] : (attributes[1].match(/#([\w:.-]+)/g) ?? []).map((id) => id.slice(1));
    if (!silent && attributes && /\.(?:ref|eqref)\b/.test(attributes[1]) && state.tokens[state.tokens.length - 1]?.type === 'link_close') {
      const opening = state.tokens.findLastIndex((token) => token.type === 'link_open');
      const reference = state.tokens.slice(opening + 1, -1).filter((token) => token.type === 'text').map((token) => token.content).join('');
      if (opening >= 0 && /^[\w:.-]+$/.test(reference)) {
        state.tokens[opening].attrSet('data-source-reference', reference);
      }
    }
    if (!silent) {
      const previous = state.tokens[state.tokens.length - 1];
      let index = 0;
      if (ids.length > 0 && previous?.type === 'image') {
        previous.attrSet('id', ids[0]);
        index = 1;
      }
      for (; index < ids.length; index += 1) {
        const token = state.push('html_inline', '', 0);
        token.content = `<span class="content-anchor" id="${markdown.utils.escapeHtml(ids[index])}"></span>`;
      }
    }
    state.pos += match[0].length;
    return true;
  });
}
import { parse } from 'node-html-parser';
import { readMathExpression } from './content-math.mjs';

/** Match a braced attribute list, ignoring TeX braces inside quoted titles.
 * @param {string} line @param {number} start index of the opening brace @returns {{info: string, rest: string} | null}
 */
function readAttributeList(line, start) {
  if (line[start] !== '{') return null;
  let depth = 0, quoted = false;
  for (let index = start; index < line.length; index++) {
    let slashes = 0, previous = index;
    while (previous > 0 && line[--previous] === '\\') slashes++;
    const escaped = slashes % 2 === 1;
    if (line[index] === '"' && !escaped) { quoted = !quoted; continue; }
    if (quoted || escaped) continue;
    if (line[index] === '{') depth++;
    if (line[index] === '}' && --depth === 0) return { info: line.slice(start + 1, index), rest: line.slice(index + 1).trim() };
  }
  return null;
}

/** Read a Pandoc callout's attributes without stopping at TeX braces inside quoted titles.
 * @param {string} line @returns {{info: string, rest: string} | null}
 */
export function readCallout(line) {
  const opening = line.match(/^:::\s*\{/);
  if (!opening) return null;
  return readAttributeList(line, opening[0].length - 1);
}

/** Read a Pandoc callout written as a fenced code block header, e.g. ``` { .algorithm #id }.
 * @param {string} info the fence info string @returns {{lang: string, info: string, rest: string} | null}
 */
export function readCodeBlockCallout(info) {
  const opening = info.match(/^\s*([^\s{]*)\s*\{/);
  if (!opening) return null;
  const attributes = readAttributeList(info, info.indexOf('{', opening[0].length - 1));
  if (!attributes) return null;
  return { lang: opening[1], info: attributes.info, rest: attributes.rest };
}

/** Read a Pandoc callout written as a blockquoted heading, e.g. > ### {.definition #id}.
 * @param {string} line @returns {{info: string, rest: string} | null}
 */
export function readHeadingCallout(line) {
  const opening = line.match(/^ {0,3}>\s*#{1,6}\s*\{/);
  if (!opening) return null;
  return readAttributeList(line, opening[0].length - 1);
}
