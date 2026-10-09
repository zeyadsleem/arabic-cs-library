import katex from 'katex';
import { decode } from './html-to-markdown.mjs';

const macros = {
  '\\N': '\\mathbb{N}', '\\R': '\\mathbb{R}', '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}', '\\C': '\\mathbb{C}', '\\E': '\\mathbb{E}',
  '\\B': '\\mathbf{B}', '\\U': '\\mathcal{U}',
  '\\x': '\\mathbf{x}', '\\y': '\\mathbf{y}',
  '\\X': '\\mathcal{X}', '\\Y': '\\mathcal{Y}', '\\pow': '\\mathcal{P}',
  '\\d': '\\displaystyle', '\\val': '\\mathrm{val}',
  '\\floor': '\\lfloor #1 \\rfloor', '\\ceil': '\\lceil #1 \\rceil',
  '\\expr': '\\langle #1 \\rangle', '\\card': '\\left|#1\\right|',
  '\\inv': '^{-1}', '\\st': ':', '\\iff': '\\leftrightarrow', '\\Iff': '\\Leftrightarrow',
  '\\imp': '\\rightarrow', '\\Imp': '\\Rightarrow', '\\isom': '\\cong',
  '\\lt': '<', '\\gt': '>', '\\amp': '&',
  '\\twoline': '\\begin{pmatrix}#1\\\\#2\\end{pmatrix}',
  '\\ensuremath': '#1', '\\mbox': '\\text{#1}', '\\ttfamily': '\\tt', '\\xor': '\\oplus',
  '\\qedhere': '\\square', '\\qedsymbol': '\\blacksquare',
  '\\textsc': '\\text{#1}', '\\ddiv': '\\mathbin{\\mathrm{div}}',
  '\\o': '\\circ'
};
const environments = /^(equation\*?|align\*?|aligned|gather\*?|gathered|multline\*?|split|displaymath)$/;

function escaped(text, index) {
  let slashes = 0;
  while (index > 0 && text[--index] === '\\') slashes++;
  return slashes % 2 === 1;
}

export function readMathExpression(text, start) {
  let open, close, display = false, includeDelimiters = false;
  if (text.startsWith('$$', start)) { open = close = '$$'; display = true; }
  else if (text[start] === '$' && !escaped(text, start)) { open = close = '$'; }
  else if (text.startsWith('\\(', start)) { open = '\\('; close = '\\)'; }
  else if (text.startsWith('\\[', start)) { open = '\\['; close = '\\]'; display = true; }
  else {
    const begin = text.slice(start).match(/^\\begin\{([^}]+)\}/);
    if (!begin || !environments.test(begin[1])) return null;
    open = begin[0]; close = `\\end{${begin[1]}}`;
    display = true; includeDelimiters = true;
  }
  const from = start + open.length;
  let end = from;
  while ((end = text.indexOf(close, end)) !== -1) {
    if (!escaped(text, end)) break;
    end += close.length;
  }
  if (end === -1) return null;
  const body = text.slice(from, end);
  if (!body.trim() || (open === '$' && (body.includes('\n') || /\d/.test(text[end + 1] || '')))) return null;
  return {
    content: includeDelimiters ? text.slice(start, end + close.length) : body,
    end: end + close.length, display,
    delimiter: open
  };
}

/** Keep math intact before Markdown sees backslashes, underscores, <, or image alt attributes.
 * @param {import('markdown-it')} markdown
 * @param {{onError?: (tex: string, error: Error) => void}} [options]
 * @returns {void}
 */
export function installContentMath(markdown, { onError } = {}) {
  markdown.inline.ruler.before('escape', 'content_math', (state, silent) => {
    const match = readMathExpression(state.src, state.pos);
    if (!match) return false;
    if (!silent) {
      const token = state.push('content_math', '', 0);
      token.content = match.content;
      token.meta = { display: match.display };
    }
    state.pos = match.end;
    return true;
  });

  markdown.block.ruler.before('fence', 'content_math_block', (state, startLine, endLine, silent) => {
    if (state.sCount[startLine] - state.blkIndent >= 4) return false;
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const match = readMathExpression(state.src, start);
    if (!match || !match.display) return false;
    let last = startLine;
    while (last < endLine && state.eMarks[last] < match.end) last++;
    if (last >= endLine || state.src.slice(match.end, state.eMarks[last]).trim()) return false;
    if (silent) return true;
    const token = state.push('content_math', '', 0);
    token.block = true;
    token.content = match.content;
    token.meta = { display: true };
    token.map = [startLine, last + 1];
    state.line = last + 1;
    return true;
  });

  markdown.renderer.rules.content_math = (tokens, index) => {
    const token = tokens[index];
    // HTML-derived books sometimes use unescaped identifiers in \text{}.
    const labelPattern = /\\label\{([\w:.-]+)\}/g;
    const anchors = [...token.content.matchAll(labelPattern)].map((label) => `<span class="content-anchor" id="${markdown.utils.escapeHtml(label[1])}"></span>`).join('');
    const tex = decode(token.content).replace(labelPattern, '').replace(/\\text\{([^{}]*)\}/g, (_, text) =>
      `\\text{${text.replace(/(?<!\\)([_%#&])/g, '\\$1')}}`);
    try {
      return anchors + katex.renderToString(tex, {
        displayMode: token.meta.display, throwOnError: true, strict: 'ignore',
        trust: false, output: 'htmlAndMathml', macros: { ...macros }
      }) + (token.block ? '\n' : '');
    } catch (error) {
      onError?.(tex, error);
      return `<span class="math-unrendered" data-math-error="${markdown.utils.escapeHtml(error.message)}">${markdown.utils.escapeHtml(token.content)}</span>`;
    }
  };
}
