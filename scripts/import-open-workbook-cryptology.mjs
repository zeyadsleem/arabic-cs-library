#!/usr/bin/env node
/** Turn the LaTeX source of Open Workbook of Cryptology into English slices.
 *
 * The book is CC BY-SA 4.0 and ships its own TeX source, so the translation is
 * built from the author's own text rather than from scraped pages: headings,
 * boxes, figures and footnotes keep their order, and every formula arrives as
 * the macro the author typed instead of a picture of a formula.
 *
 * The converter understands exactly the constructs this book uses: the three
 * tcolorbox theorem styles (Reading Response, Code Task, Bonus Task), the
 * definition/example/theorem environments, `codedisp` verbatim blocks,
 * `description`/`itemize`/`enumerate` lists, `tabular` tables and the figure
 * environment. Anything else is passed through as prose.
 *
 * Usage: `node scripts/import-open-workbook-cryptology.mjs`
 *
 * Writes `content-src/open-workbook-cryptology/src/<key>.en.md` and renders
 * each figure from its EPS source into `static/images/open-workbook-cryptology/`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(root, 'content-src', 'open-workbook-cryptology');
const texPath = path.join(sourceDirectory, 'owoc.tex');
const bibPath = path.join(sourceDirectory, 'refs.bib');
const sliceDirectory = path.join(sourceDirectory, 'src');
const imageDirectory = path.join(root, 'static', 'images', 'open-workbook-cryptology');
const imageRoot = '/images/open-workbook-cryptology';

/** Front matter of each slice, in reading order. */
const CHAPTERS = [
  { key: 'release-notes', file: 'release-notes.en.md', marker: /^\\chapter\*\{Release Notes\}/, chapter: 0, title: 'Release Notes', label: 'Release Notes', authors: 'Jonathan A. Poritz' },
  { key: 'preface', file: 'preface.en.md', marker: /^\s*\\chapter\*\{Preface\}/, chapter: 0, title: 'Preface', label: 'Preface', authors: 'Jonathan A. Poritz' },
  { key: 'ch01', file: 'ch01.en.md', marker: /^\\chapter\{Preliminaries\}/, chapter: 1, title: 'Preliminaries', label: 'Chapter 1', authors: 'Jonathan A. Poritz' },
  { key: 'ch02', file: 'ch02.en.md', marker: /^\\chapter\{Block Ciphers\}/, chapter: 2, title: 'Block Ciphers', label: 'Chapter 2', authors: 'Jonathan A. Poritz' },
  { key: 'ch03', file: 'ch03.en.md', marker: /^\\chapter\{Asymmetric \[Public-Key\] Cryptosystems\}/, chapter: 3, title: 'Asymmetric [Public-Key] Cryptosystems', label: 'Chapter 3', authors: 'Jonathan A. Poritz' }
];

/** Greek letters, operators and relations the source actually uses. */
const MATH_SYMBOLS = new Map(Object.entries({
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ',
  eta: 'η', theta: 'θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν',
  xi: 'ξ', omicron: 'ο', pi: 'π', rho: 'ρ', sigma: 'σ', varsigma: 'ς', tau: 'τ', upsilon: 'υ',
  phi: 'φ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
  Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ',
  Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
  times: '×', cdot: '·', circ: '∘', oplus: '⊕', otimes: '⊗', bullet: '•', star: '⋆',
  equiv: '≡', cong: '≅', approx: '≈', sim: '∼', neq: '≠', ne: '≠', leq: '≤', le: '≤', geq: '≥', ge: '≥',
  lt: '<', gt: '>', ll: '≪', gg: '≫', propto: '∝', perp: '⊥', parallel: '∥',
  in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', supset: '⊃', supseteq: '⊇',
  cup: '∪', cap: '∩', emptyset: '∅', setminus: '∖', forall: '∀', exists: '∃',
  sum: 'Σ', prod: 'Π', int: '∫', partial: '∂', nabla: '∇', infty: '∞',
  rightarrow: '→', to: '→', leftarrow: '←', gets: '←', leftrightarrow: '↔',
  longleftrightarrow: '⟷', longrightarrow: '⟶', longleftarrow: '⟵',
  Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', implies: '⇒', iff: '⇔',
  mapsto: '↦', rightarrowtail: '↣', leftarrowtail: '↢', rightsquigarrow: '⇝',
  leftsquigarrow: '⇜', hookrightarrow: '↪', hookleftarrow: '↩',
  ell: 'ℓ', prime: '′', cdots: '…', dots: '…', ldots: '…', vdots: '⋮', ddots: '⋱',
  lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉', langle: '⟨', rangle: '⟩',
  vee: '∨', wedge: '∧', neg: '¬', lnot: '¬', ominus: '⊖', div: '÷', pm: '±', mp: '∓',
  aleph: 'ℵ', hbar: 'ℏ', Re: 'ℜ', Im: 'ℑ', angle: '∠', triangle: '△', degree: '°'
}));

const BLACKBOARD = new Map(Object.entries({ Z: 'ℤ', N: 'ℕ', R: 'ℝ', Q: 'ℚ', C: 'ℂ', P: 'ℙ' }));

const SUPERSCRIPTS = new Map(Object.entries({
  0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', n: 'ⁿ', i: 'ⁱ'
}));

const SUBSCRIPTS = new Map(Object.entries({
  0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', a: 'ₐ', e: 'ₑ', o: 'ₒ', x: 'ₓ', k: 'ₖ',
  n: 'ₙ', i: 'ᵢ', j: 'ⱼ', p: 'ₚ', m: 'ₘ', t: 'ₜ', s: 'ₛ', h: 'ₕ'
}));

const scriptText = (value, map) => [...value].every((character) => map.has(character))
  ? [...value].map((character) => map.get(character)).join('')
  : null;

/** Index of the brace that closes the one at `start`. */
const closingBrace = (text, start) => {
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === '\\') {
      index += 1;
      continue;
    }
    if (text[index] === '{') depth += 1;
    else if (text[index] === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
};

/** The `{…}` group starting at `start`, plus the index just past it. */
const group = (text, start) => {
  if (text[start] !== '{') return ['', start];
  const end = closingBrace(text, start);
  if (end === -1) return [text.slice(start + 1), text.length];
  return [text.slice(start + 1, end), end + 1];
};

/** The `[…]` optional argument starting at `start`, empty when absent. */
const optional = (text, start) => {
  if (text[start] !== '[') return ['', start];
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === '\\') { index += 1; continue; }
    if (text[index] === '[') depth += 1;
    else if (text[index] === ']') {
      depth -= 1;
      if (depth === 0) return [text.slice(start + 1, index), index + 1];
    }
  }
  return ['', start];
};

/** Read a `{…}` group after skipping whitespace, used for macro arguments. */
const argument = (text, start) => {
  let index = start;
  while (index < text.length && /\s/.test(text[index])) index += 1;
  return group(text, index);
};

/** Inline LaTeX math as the Unicode an Arabic reader can follow. */
const math = (text) => {
  let output = '';
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '\\') {
      if (text[index + 1] === '\\') { output += ' '; index += 1; continue; }
      const match = /^\\([a-zA-Z]+)\s*/.exec(text.slice(index));
      if (!match) {
        const escaped = text[index + 1];
        output += escaped === ',' || escaped === ';' || escaped === ':' || escaped === ' ' ? ' ' : (escaped ?? '');
        index += 1;
        continue;
      }
      const name = match[1];
      index += match[0].length - 1;
      if (name === 'pmod') {
        const [value, next] = argument(text, index + 1);
        output += ` (mod ${math(value)})`;
        index = next - 1;
        continue;
      }
      if (name === 'bmod') { output += ' mod '; continue; }
      if (name === 'frac') {
        const [numerator, afterNumerator] = argument(text, index + 1);
        const [denominator, afterDenominator] = argument(text, afterNumerator);
        output += `${math(numerator)}/${math(denominator)}`;
        index = afterDenominator - 1;
        continue;
      }
      if (name === 'sqrt') {
        const [value, next] = argument(text, index + 1);
        output += `√(${math(value)})`;
        index = next - 1;
        continue;
      }
      if (name === 'boxed' || name === 'overline' || name === 'bar' || name === 'textbf' || name === 'texttt') {
        const [value, next] = argument(text, index + 1);
        output += math(value);
        index = next - 1;
        continue;
      }
      if (name === 'mathrm' || name === 'mathbf' || name === 'mathit' || name === 'text' || name === 'operatorname') {
        const [value, next] = argument(text, index + 1);
        output += math(value);
        index = next - 1;
        continue;
      }
      if (name === 'mathcal') {
        const [value, next] = argument(text, index + 1);
        output += math(value);
        index = next - 1;
        continue;
      }
      if (name === 'mathbb') {
        const [value, next] = argument(text, index + 1);
        output += BLACKBOARD.get(value.trim()) ?? math(value);
        index = next - 1;
        continue;
      }
      if (name === 'acute' || name === 'grave' || name === 'tilde' || name === 'hat' || name === 'vec') {
        const [value, next] = argument(text, index + 1);
        output += math(value);
        index = next - 1;
        continue;
      }
      if (name === 'hphantom' || name === 'phantom' || name === 'vphantom') {
        const [, next] = argument(text, index + 1);
        output += ' ';
        index = next - 1;
        continue;
      }
      if (name === 'quad' || name === 'qquad') { output += '  '; continue; }
      if (name === 'left' || name === 'right' || name === 'big' || name === 'Big') { continue; }
      if (MATH_SYMBOLS.has(name)) { output += MATH_SYMBOLS.get(name); continue; }
      output += name;
      continue;
    }
    if (character === '^' || character === '_') {
      let value;
      let next;
      if (text[index + 1] === '{') {
        [value, next] = group(text, index + 1);
      } else {
        value = text[index + 1] ?? '';
        next = index + 2;
      }
      const expanded = math(value);
      const rendered = scriptText(expanded, character === '^' ? SUPERSCRIPTS : SUBSCRIPTS);
      output += rendered ?? `${character}${expanded.length > 1 ? `(${expanded})` : expanded}`;
      index = next - 1;
      continue;
    }
    if (character === '{' || character === '}') continue;
    if (character === '~') { output += ' '; continue; }
    output += character;
  }
  return output.replace(/\s+/g, ' ').trim();
};

/** Author and year for each BibTeX entry, so `\cite` reads naturally. */
const bibliography = (text) => {
  const entries = new Map();
  const pattern = /@\w+\{([^,]+),([\s\S]*?)\n\}/g;
  for (const match of text.matchAll(pattern)) {
    const fields = new Map();
    for (const field of match[2].matchAll(/(\w+)\s*=\s*\{([\s\S]*?)\},?\s*(?=\n\s*\w+\s*=|\s*$)/g)) {
      fields.set(field[1].toLowerCase(), field[2].replace(/[{}]/g, '').replace(/\s+/g, ' ').trim());
    }
    const authors = (fields.get('author') ?? '').split(/\s+and\s+/).map((author) => {
      const [family, given] = author.split(',').map((part) => part.trim());
      return family ?? author;
    });
    entries.set(match[1].trim(), { fields, authors });
  }
  return entries;
};

const shortCite = (entries, keys) => keys.split(',').map((key) => {
  const entry = entries.get(key.trim());
  if (!entry) return key.trim();
  const year = entry.fields.get('year') ?? 'n.d.';
  const authors = entry.authors.length > 2
    ? `${entry.authors[0]} et al.`
    : entry.authors.join(' and ');
  return `${authors} ${year}`;
}).join('; ');

/** Numbers for the environments LaTeX numbers for us. */
const counters = { chapter: 0, section: 0, subsection: 0, theorem: 0, figure: 0, table: 0, exercise: 0 };
const labels = new Map();

const THEOREMS = new Set(['definition', 'example', 'examples', 'theorem', 'proposition', 'lemma', 'corollary', 'remark', 'fact']);
const BOXES = new Map([['AZtcb', 'Reading Response'], ['CTtcb', 'Code Task'], ['BTtcb', 'Bonus Task']]);

/** Text of a block joined into one prose paragraph. */
const paragraph = (lines, state) => inline(lines.join(' '), state)
  .replace(/[ \t\u00a0]+/g, ' ')
  .replace(/\s+([,.;:!?])/g, '$1')
  .replace(/\s+\n/g, '\n')
  .trim();

/** A `tabular` body as a markdown table. */
const table = (lines, state) => {
  const body = lines.join('\n').replace(/\\hline/g, '\n').replace(/\\cline\{[^}]*\}/g, '\n');
  const rows = body
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row && !/^\\/.test(row))
    .map((row) => row.replace(/\\$/, '').split('&').map((cell) => inline(cell, state).trim().replace(/\|/g, '\\|')));
  if (!rows.length) return '';
  const width = Math.max(...rows.map((row) => row.length));
  const pad = (row) => [...row, ...Array(width - row.length).fill('')];
  const [head, ...rest] = rows;
  return [`| ${pad(head).join(' | ')} |`, `| ${Array(width).fill('---').join(' | ')} |`, ...rest.map((row) => `| ${pad(row).join(' | ')} |`)].join('\n');
};

/** A figure: the EPS is rendered to PNG later, the slice only names it. */
const figure = (lines, state) => {
  const graphic = /\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/.exec(lines.join('\n'));
  if (!graphic) return;
  if (/^(by-sa|owoc_cover)\.eps$/.test(graphic[1])) return;
  const label = /\\label\{([^}]+)\}/.exec(lines.join('\n'))?.[1] ?? graphic[1];
  counters.figure += 1;
  const number = `${counters.chapter}.${counters.section}.${counters.figure}`;
  if (/^fig:/.test(label)) labels.set(label, number);
  const alt = label.replace(/^fig:/, '').replace(/[_-]+/g, ' ').trim();
  state.figures.push({ source: graphic[1], target: `fig-${state.key}-${state.figures.length + 1}.png` });
  return `![${alt}](${imageRoot}/${state.figures[state.figures.length - 1].target})\n\n**Figure ${number}.**`;
};

/** List items, with `description` items keeping their bold head. */
const list = (lines, state, ordered) => {
  const items = [];
  let current = null;
  for (const line of lines) {
    if (/^\s*\\item/.test(line)) {
      if (current) items.push(current);
      const rest = line.replace(/^\s*\\item/, '');
      const head = /^\s*\[([\s\S]*)\]/.exec(rest);
      current = head ? `**${inline(head[1], state)}** ${rest.slice(head[0].length)}` : rest;
      continue;
    }
    if (/^\s*\\(begin|end)\{(itemize|enumerate|description)\}/.test(line)) continue;
    if (current !== null) current += ` ${line}`;
  }
  if (current) items.push(current);
  return items
    .map((item, index) => `${ordered ? `${index + 1}.` : '-'} ${paragraph([item], state)}`)
    .filter((item) => item.length > 3)
    .join('\n');
};

/** The inline text of one line: macros expanded, math converted, escapes kept. */
function inline(text, state) {
  let output = '';
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '\\' && text[index + 1] === '[') {
      const end = text.indexOf('\\]', index + 2);
      if (end === -1) { output += ' '; index += 1; continue; }
      output += math(text.slice(index + 2, end));
      index = end + 1;
      continue;
    }
    if (character === '$' && text[index + 1] === '$') {
      const end = text.indexOf('$$', index + 2);
      if (end === -1) { output += ' '; index += 1; continue; }
      output += ` ${math(text.slice(index + 2, end))} `;
      index = end + 1;
      continue;
    }
    if (character === '$') {
      const end = text.indexOf('$', index + 1);
      if (end === -1) { output += character; continue; }
      output += math(text.slice(index + 1, end));
      index = end;
      continue;
    }
    if (character === '~') { output += ' '; continue; }
    if (character === '`' && text[index + 1] === '`') {
      const end = text.indexOf("''", index + 2);
      if (end === -1) { output += '“'; index += 1; continue; }
      output += `“${inline(text.slice(index + 2, end), state)}”`;
      index = end + 1;
      continue;
    }
    if (character === '{') {
      const end = closingBrace(text, index);
      const inner = end === -1 ? text.slice(index + 1) : text.slice(index + 1, end);
      const emphatic = /^\s*\\(bf|bfseries|itshape|it|em|emph|sl|sc|tt)\b/.exec(inner);
      if (emphatic) {
        const body = inner.replace(/^\s*\\(bf|bfseries|itshape|it|em|emph|sl|sc|tt)\b\s*/, '');
        const strong = /bf|series/.test(emphatic[1]);
        output += strong ? `**${inline(body, state)}**` : `*${inline(body, state)}*`;
      } else {
        output += inline(inner, state);
      }
      index = end === -1 ? text.length : end;
      continue;
    }
    if (character === '-' && text[index + 1] === '-') {
      output += text[index + 2] === '-' ? '—' : '–';
      index += text[index + 2] === '-' ? 2 : 1;
      continue;
    }
    if (character !== '\\') {
      output += character === '`' ? '‘' : character === "'" ? '’' : character;
      continue;
    }
    const next = text[index + 1];
    if (next === '\\') { output += '\n'; index += 1; continue; }
    if (!/[a-zA-Z]/.test(next ?? '')) {
      const escaped = { '%': '%', '&': '&', _: '_', '#': '#', $: '$', '{': '{', '}': '}', ' ': ' ' }[next] ?? '';
      output += escaped;
      index += 1;
      continue;
    }
    const match = /^\\([a-zA-Z]+)\s*/.exec(text.slice(index));
    const name = match[1];
    index += match[0].length - 1;
    const readOptional = () => {
      const [value, nextIndex] = optional(text, index + 1);
      if (nextIndex !== index + 1) index = nextIndex - 1;
      return value;
    };
    const read = () => {
      const [value, nextIndex] = argument(text, index + 1);
      index = nextIndex - 1;
      return value;
    };
    if (name === 'S') { output += '§'; continue; }
    if (name === 'index') { read(); continue; }
    if (name === 'label') { read(); continue; }
    if (name === 'ix') { output += inline(read(), state); continue; }
    if (name === 'code') {
      const value = read().replace(/\\%/g, '%').replace(/\\_/g, '_').replace(/\\#/g, '#').replace(/\\&/g, '&');
      output += `\`${value.replace(/`/g, '')}\``;
      continue;
    }
    if (name === 'textbf' || name === 'bf') { output += `**${inline(read(), state)}**`; continue; }
    if (name === 'textit' || name === 'it' || name === 'emph' || name === 'em' || name === 'sl' || name === 'sc') {
      output += `*${inline(read(), state)}*`;
      continue;
    }
    if (name === 'underline') { output += inline(read(), state); continue; }
    if (name === 'Python') { output += '**Python**'; continue; }
    if (name === 'Pythonthree') { output += '**Python 3**'; continue; }
    if (name === 'footnote') {
      const value = inline(read(), state);
      state.footnotes.push(value);
      output += `[^${state.footnotes.length}]`;
      continue;
    }
    if (name === 'ref') {
      const key = read().trim();
      output += labels.get(key) ?? '??';
      continue;
    }
    if (name === 'cite' || name === 'citep' || name === 'citet') {
      output += shortCite(state.bibliography, read());
      continue;
    }
    if (name === 'bhref' || name === 'href') {
      const url = read();
      const value = read();
      output += `[${inline(value, state)}](${url})`;
      continue;
    }
    if (name === 'blurl' || name === 'burl' || name === 'url') { const url = read(); output += `[${url}](${url})`; continue; }
    if (name === 'hyperref') {
      readOptional();
      output += inline(read(), state);
      continue;
    }
    if (name === 'hphantom' || name === 'phantom' || name === 'vphantom') { read(); output += ' '; continue; }
    if (name === 'textbackslash') { output += '\\'; continue; }
    if (name === 'timestamp') { output += '11 June 2021'; continue; }
    if (name === 'maketitle' || name === 'tableofcontents' || name === 'printindex') { continue; }
    if (name === 'vskip' || name === 'vfill' || name === 'pagebreak' || name === 'newpage' || name === 'clearpage'
      || name === 'noindent' || name === 'centering' || name === 'smallskip' || name === 'medskip' || name === 'quad'
      || name === 'qquad' || name === 'hfill' || name === 'vspace') {
      if (name === 'vskip' || name === 'vspace') readOptional().length; 
      output += ' ';
      continue;
    }
    if (MATH_SYMBOLS.has(name)) { output += MATH_SYMBOLS.get(name); continue; }
    output += read();
  }
  return output;
}

/** Convert one chapter's lines into markdown blocks. */
const convert = (lines, state) => {
  const blocks = [];
  const push = (block) => {
    const trimmed = block.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
    if (trimmed) blocks.push(trimmed);
  };
  let buffer = [];
  const flush = () => {
    if (!buffer.length) return;
    const text = paragraph(buffer, state);
    buffer = [];
    if (text) push(text);
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const heading = /^\\(chapter\*?|section|subsection|subsubsection)\{/.exec(line);
    if (heading) {
      flush();
      const [, kind] = heading;
      const [title] = group(line, line.indexOf('{'));
      const text = inline(title, state).trim();
      if (kind.startsWith('chapter')) {
        counters.chapter += 1;
        counters.section = 0;
        counters.theorem = 0;
        counters.figure = 0;
        push(`## ${state.title}`);
      } else if (kind === 'section') {
        counters.section += 1;
        counters.subsection = 0;
        counters.theorem = 0;
        counters.figure = 0;
        push(`### ${text}`);
      } else if (kind === 'subsection') {
        counters.subsection += 1;
        push(`#### ${text}`);
      } else {
        push(`##### ${text}`);
      }
      const label = /\\label\{([^}]+)\}/.exec(line)?.[1];
      if (label) labels.set(label, `${counters.chapter}.${counters.section}`);
      continue;
    }

    const labelOnly = /^\s*\\label\{([^}]+)\}\s*$/.exec(line);
    if (labelOnly) {
      labels.set(labelOnly[1], `${counters.chapter}.${counters.section}`);
      continue;
    }

    if (/^\\(vskip|vfill|pagebreak|newpage|clearpage|noindent|centering|smallskip|medskip|vspace|\[|\]|$$)/.test(line)) {
      if (/^\\$$/.test(line) || /^\\\[/.test(line)) flush();
      continue;
    }

    const begin = /^\s*\\begin\{([^}]+)\}/.exec(line);
    if (begin) {
      const environment = begin[1];
      let depth = 1;
      const inner = [];
      let explicitLabel = '';
      const head = line
        .replace(/^\s*(?:\\hfill|\\noindent|\\centering|\\vskip\S*|\\vspace\{[^}]*\})?\s*\\begin\{[^}]+\}/, '')
        .replace(/^\s*\[[^\]]*\]/, '')
        .replace(/^\s*\{(?:l|r|c|p\{[^}]*\})[^{}]*\}/, ' ')
        .trim();
      const headLabel = /\[label=([^\]]+)\]/.exec(line);
      if (headLabel) explicitLabel = headLabel[1];
      for (index += 1; index < lines.length; index += 1) {
        const current = lines[index];
        if (new RegExp(`^\\s*\\\\begin\\{${environment}\\}`).test(current)) depth += 1;
        if (new RegExp(`^\\s*\\\\end\\{${environment}\\}`).test(current)) {
          depth -= 1;
          if (depth === 0) break;
        }
        inner.push(current);
      }
      const rest = inner.slice();
      const startsWithProse = head.replace(/\[[^\]]*\]/g, '').trim();

      flush();
      if (THEOREMS.has(environment)) {
        counters.theorem += 1;
        const number = `${counters.chapter}.${counters.section}.${counters.theorem}`;
        const label = /\\label\{([^}]+)\}/.exec(inner.join('\n'))?.[1];
        if (label) labels.set(label, number);
        const body = startsWithProse ? [startsWithProse, ...rest] : rest;
        const name = environment[0].toUpperCase() + environment.slice(1);
        const rendered = convert(body, state);
        const [first, ...others] = rendered;
        if (first) push(`**${name} ${number}.** ${first}`);
        for (const block of others) push(block);
        continue;
      }
      if (BOXES.has(environment)) {
        const body = startsWithProse ? [startsWithProse, ...rest] : rest;
        if (explicitLabel && /^(az|ct|bt):/.test(explicitLabel)) labels.set(explicitLabel, '');
        const rendered = convert(body, state);
        for (const block of rendered) {
          push(`> **${BOXES.get(environment)}.**\n>\n${block.split('\n').map((line) => `> ${line}`).join('\n')}`);
        }
        continue;
      }
      if (environment === 'itemize' || environment === 'enumerate' || environment === 'description') {
        push(list(rest, state, environment === 'enumerate'));
        continue;
      }
      if (environment === 'codedisp' || environment === 'BVerbatim' || environment === 'verbatim') {
        const code = rest.join('\n').replace(/\t/g, '    ').replace(/^\n+|\n+$/g, '');
        if (code.trim()) push(['```text', code, '```'].join('\n'));
        continue;
      }
      if (environment === 'figure' || environment === 'wrapfigure' || environment === 'table') {
        const rendered = figure(rest, state);
        if (rendered) push(rendered);
        continue;
      }
      if (environment === 'tabular') {
        const rows = head ? [head.replace(/^\{[^}]*\}/, '').trim(), ...rest] : rest;
        const rendered = table(rows, state);
        if (rendered) push(rendered);
        continue;
      }
      if (environment === 'matrix' || environment === 'tikzcd' || environment === 'tikzpicture') {
        push(`[diagram: ${rest.join(' ').replace(/\s+/g, ' ').slice(0, 200)}]`);
        continue;
      }
      if (['center', 'quote', 'adjustbox', 'tcolorbox', 'minipage', 'flushleft', 'flushright'].includes(environment)) {
        const rendered = convert(rest, state);
        for (const block of rendered) push(block);
        continue;
      }
      const rendered = convert(rest, state);
      for (const block of rendered) push(block);
      continue;
    }

    if (/^\s*\\item/.test(line)) { flush(); push(list([line], state, false)); continue; }
    if (/^\s*\\end\{/.test(line)) continue;
    if (!line.trim()) { flush(); continue; }
    if (/^\s*%/.test(line)) continue;
    buffer.push(line);
  }
  flush();
  return blocks;
};

const SCAFFOLDING = /^\s*\\(setcounter|addtocounter|makeatletter|makeatother|def|newcommand|renewcommand|providecommand|let|tocdepth|tableofcontents|listoffigures|listoftables|pagestyle|thispagestyle|frontmatter|mainmatter|backmatter|newpagecolor|restorepagecolor|pagecolor|lstset|setlength|linespread|makeindex|appendix|bibliographystyle|bibliography|printindex|caption|vskip|vfill|pagebreak|newpage|clearpage|noindent|centering|smallskip|medskip|bigskip|hfill|vspace|index|glossary|addcontentsline|markboth)\b/;

const cleanLines = (text) => text
  .replace(/\\begin\{document\}/, '')
  .split('\n')
  .map((line) => line.replace(/(?<!\\)%.*$/, ''))
  .map((line) => line.replace(/\\dispcodestart\s*/g, '\n\\begin{codedisp}\n').replace(/\\dispcodeend\s*/g, '\n\\end{codedisp}\n'))
  .flatMap((line) => line.replace(/\\begin\{/g, '\n\\begin{').replace(/\\end\{/g, '\n\\end{').replace(/\\label\{/g, '\n\\label{').split('\n'))
  .filter((line) => !SCAFFOLDING.test(line));

const main = () => {
  fs.mkdirSync(sliceDirectory, { recursive: true });
  fs.mkdirSync(imageDirectory, { recursive: true });
  const entries = bibliography(fs.readFileSync(bibPath, 'utf8'));
  const lines = cleanLines(fs.readFileSync(texPath, 'utf8'));
  const documentStart = lines.findIndex((line) => /\\maketitle|\\frontmatter/.test(line));
  const body = lines.slice(documentStart === -1 ? 0 : documentStart);

  const starts = [];
  for (const chapter of CHAPTERS) {
    const index = body.findIndex((line) => chapter.marker.test(line));
    if (index === -1) throw new Error(`marker not found for ${chapter.key}`);
    starts.push(index);
  }
  const backmatter = body.findIndex((line) => /^\\backmatter/.test(line));

  CHAPTERS.forEach((chapter, position) => {
    const from = starts[position] + 1;
    const to = position + 1 < starts.length ? starts[position + 1] : (backmatter === -1 ? body.length : backmatter);
    counters.chapter = chapter.chapter - 1;
    counters.section = 0;
    counters.subsection = 0;
    counters.theorem = 0;
    counters.figure = 0;
    counters.table = 0;
    const state = { key: chapter.key, title: chapter.title, figures: [], footnotes: [], bibliography: entries };
    const blocks = convert(body.slice(from, to), state);
    for (const [index, note] of state.footnotes.entries()) blocks.push(`[^${index + 1}]: ${note}`);
    const frontmatter = ['---', `title: ${JSON.stringify(chapter.title)}`, `chapter: ${JSON.stringify(chapter.label)}`, `authors: ${JSON.stringify(chapter.authors)}`, '---', ''].join('\n');
    fs.writeFileSync(path.join(sliceDirectory, chapter.file), `${frontmatter}${blocks.join('\n\n')}\n`);
    for (const figureEntry of state.figures) {
      const source = path.join(sourceDirectory, figureEntry.source);
      const target = path.join(imageDirectory, figureEntry.target);
      execFileSync('magick', ['-density', '300', source, '-background', 'white', '-flatten', target]);
    }
    console.log(`${chapter.key}: ${blocks.length} blocks, ${state.figures.length} figures, ${state.footnotes.length} footnotes`);
  });
};

main();
