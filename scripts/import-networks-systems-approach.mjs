#!/usr/bin/env node
/**
 * Import "Computer Networks: A Systems Approach" (6th ed.) into English
 * markdown slices and render its figures for the Arabic translation.
 *
 * Source: the project's RST repository (SystemsApproach/book), vendored under
 * content-src/networks-systems-approach/rst/. The build emits:
 *
 *   content-src/networks-systems-approach/src/<key>.en.md   one slice per page
 *   static/images/networks-systems-approach/fig-<key>-<n>.* chapter figures
 *
 * Page keys: preface, foreword, foreword-1e, ch01 … ch09. Chapter pages carry
 * their sections as `##` headings; section files are joined in toctree order so
 * figure/table/section numbers keep the book's own numbering.
 *
 * Usage: node scripts/import-networks-systems-approach.mjs [--no-images]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BOOK = 'networks-systems-approach';
const RST = path.join(ROOT, 'content-src', BOOK, 'rst');
const SRC_OUT = path.join(ROOT, 'content-src', BOOK, 'src');
const IMG_OUT = path.join(ROOT, 'static', 'images', BOOK);
const STRUCTURE_OUT = path.join(ROOT, 'content', `${BOOK}-structure.json`);
const SOURCE_URL = 'https://book.systemsapproach.org/';
const AUTHORS = 'Larry Peterson and Bruce Davie';

const CHAPTERS = [
  { key: 'ch01', dir: 'foundation', titleEn: 'Foundation', titleAr: 'الأساس' },
  { key: 'ch02', dir: 'direct', titleEn: 'Direct Links', titleAr: 'الروابط المباشرة' },
  { key: 'ch03', dir: 'internetworking', titleEn: 'Internetworking', titleAr: 'التشبيك البيني' },
  { key: 'ch04', dir: 'scaling', titleEn: 'Advanced Internetworking', titleAr: 'التشبيك البيني المتقدّم' },
  { key: 'ch05', dir: 'e2e', titleEn: 'End-to-End Protocols', titleAr: 'بروتوكولات الطرف إلى الطرف' },
  { key: 'ch06', dir: 'congestion', titleEn: 'Congestion Control', titleAr: 'التحكّم في الازدحام' },
  { key: 'ch07', dir: 'data', titleEn: 'End-to-End Data', titleAr: 'البيانات بين الطرفين' },
  { key: 'ch08', dir: 'security', titleEn: 'Network Security', titleAr: 'أمن الشبكات' },
  { key: 'ch09', dir: 'applications', titleEn: 'Applications', titleAr: 'التطبيقات' },
];

/* ------------------------------------------------------------------ math ---- */

const GREEK = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε',
  zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ',
  nu: 'ν', xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ',
  phi: 'φ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
  Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ',
  Upsilon: 'Υ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
};
const SYMBOLS = {
  times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓',
  le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', approx: '≈', equiv: '≡',
  sim: '∼', propto: '∝', ll: '≪', gg: '≫',
  rightarrow: '→', to: '→', leftarrow: '←', Rightarrow: '⇒', leftrightarrow: '↔',
  uparrow: '↑', downarrow: '↓',
  infty: '∞', partial: '∂', nabla: '∇', sum: 'Σ', prod: 'Π', int: '∫',
  lceil: '⌈', rceil: '⌉', lfloor: '⌊', rfloor: '⌋', langle: '⟨', rangle: '⟩',
  ldots: '…', dots: '…', cdots: '⋯', vdots: '⋮',
  in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', supset: '⊃', cup: '∪', cap: '∩',
  forall: '∀', exists: '∃', wedge: '∧', vee: '∨', neg: '¬', emptyset: '∅',
  degree: '°', angle: '∠', perp: '⊥', parallel: '∥', circ: '∘', star: '⋆',
  prime: '′', therefore: '∴', because: '∵', quad: ' ', qquad: ' ',
};
const SUPERSCRIPTS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻', n: 'ⁿ', i: 'ⁱ', k: 'ᵏ', x: 'ˣ' };
const SUBSCRIPTS = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉', '+': '₊', '-': '₋', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', n: 'ₙ', m: 'ₘ', x: 'ₓ' };

const toScript = (text, table, fallback) => {
  const out = [...text].map((char) => table[char]);
  return out.every((char) => char !== undefined) ? out.join('') : `${fallback}{${text}}`;
};

/** Read a braced or single-token argument starting at `i`. */
const readArg = (tex, i) => {
  while (tex[i] === ' ') i += 1;
  if (tex[i] === '{') {
    let depth = 0;
    for (let j = i; j < tex.length; j += 1) {
      if (tex[j] === '{') depth += 1;
      else if (tex[j] === '}') {
        depth -= 1;
        if (depth === 0) return { arg: tex.slice(i + 1, j), end: j + 1 };
      }
    }
    return { arg: tex.slice(i + 1), end: tex.length };
  }
  if (tex[i] === '\\') {
    const match = /^\\[A-Za-z]+/.exec(tex.slice(i));
    if (match) return { arg: match[0], end: i + match[0].length };
  }
  return { arg: tex[i] ?? '', end: i + 1 };
};

/** Convert the subset of LaTeX used by this book into Unicode math. */
const texToUnicode = (input) => {
  let tex = input.replace(/\s+/g, ' ').trim();
  tex = tex.replace(/\\left|\\right|\\!|\\,|\\;|\\:/g, '');
  let out = '';
  for (let i = 0; i < tex.length; i += 1) {
    const char = tex[i];
    if (char === '\\') {
      const name = /^[A-Za-z]+/.exec(tex.slice(i + 1))?.[0];
      if (!name) {
        const escaped = tex[i + 1];
        out += { ',': ' ', '%': '%', _: '_', '&': '&', '#': '#', ' ': ' ' }[escaped] ?? escaped;
        i += 1;
        continue;
      }
      i += name.length;
      if (name === 'frac') {
        const first = readArg(tex, i + 1);
        const second = readArg(tex, first.end);
        out += `${texToUnicode(first.arg)}/${texToUnicode(second.arg)}`;
        i = second.end - 1;
        continue;
      }
      if (name === 'sqrt') {
        let arg = readArg(tex, i + 1);
        let index = '';
        if (tex[i + 1] === '[') {
          const close = tex.indexOf(']', i + 1);
          index = tex.slice(i + 2, close);
          arg = readArg(tex, close + 1);
        }
        const inner = texToUnicode(arg.arg);
        out += index ? `${toScript(index, SUPERSCRIPTS, '^')}√(${inner})` : `√(${inner})`;
        i = arg.end - 1;
        continue;
      }
      if (['mathsf', 'mathrm', 'mathtt', 'textit', 'textbf', 'text', 'mbox', 'operatorname'].includes(name)) {
        const arg = readArg(tex, i + 1);
        out += texToUnicode(arg.arg);
        i = arg.end - 1;
        continue;
      }
      if (['overline', 'bar', 'hat', 'widehat', 'tilde', 'vec'].includes(name)) {
        const arg = readArg(tex, i + 1);
        out += texToUnicode(arg.arg);
        i = arg.end - 1;
        continue;
      }
      if (name === 'log' || name === 'ln' || name === 'exp' || name === 'max' || name === 'min' || name === 'lim' || name === 'sin' || name === 'cos' || name === 'tan') {
        out += name;
        continue;
      }
      if (name === 'bmod' || name === 'mod') {
        out += ' mod ';
        continue;
      }
      if (GREEK[name]) out += GREEK[name];
      else if (SYMBOLS[name]) out += SYMBOLS[name];
      else out += name;
      continue;
    }
    if (char === '^' || char === '_') {
      const arg = readArg(tex, i + 1);
      out += char === '^' ? toScript(arg.arg, SUPERSCRIPTS, '^') : toScript(arg.arg, SUBSCRIPTS, '_');
      i = arg.end - 1;
      continue;
    }
    if (char === '{' || char === '}') continue;
    if (char === '~') {
      out += ' ';
      continue;
    }
    out += char;
  }
  return out.replace(/\s+/g, ' ').trim();
};

/* -------------------------------------------------------------- inline ---- */

const escapeCell = (text) => text.replace(/\|/g, '\\|');

const makeInline = (context) => {
  /** Convert RST inline markup in one already-joined paragraph. */
  const inline = (raw) => {
    if (typeof raw !== 'string') {
      console.error('non-string inline input:', JSON.stringify(raw));
      return '';
    }
    let text = raw.replace(/\\\s/g, ' ').replace(/\s+/g, ' ').replace(/\[#\]_/g, '').trim();
    // :numref:`Figure %s <label>` / :numref:`Table %s <label>`
    text = text.replace(/:numref:`([^`<]*?)\s*<([^>]+)>`/g, (_, template, label) => {
      const target = context.labels.get(label.trim());
      const kind = /table/i.test(template) ? 'table' : /figure/i.test(template) ? 'figure' : 'other';
      if (!target) return template.replace('%s', '?').trim();
      if (kind === 'figure' && target.figure) return `Figure ${target.figure}`;
      if (kind === 'table' && target.table) return `Table ${target.table}`;
      return target.section ? `Section ${target.section}` : (target.title ?? template);
    });
    // :ref:`label` (and :ref:`text <label>`)
    text = text.replace(/:ref:`([^`]+)`/g, (_, body) => {
      const labelled = /^(.*?)\s*<([^>]+)>$/.exec(body);
      const label = (labelled ? labelled[2] : body).trim();
      const target = context.labels.get(label);
      if (labelled && labelled[1]) return labelled[1].trim();
      if (!target) return label;
      return target.section ? `Section ${target.section}` : (target.title ?? label);
    });
    // :math:`…`
    text = text.replace(/:math:`([^`]+)`/g, (_, tex) => texToUnicode(tex));
    // :sup:`…` / :sub:`…`
    text = text.replace(/:sup:`([^`]+)`/g, (_, body) => toScript(body.replace(/\\\s/g, ''), SUPERSCRIPTS, '^'));
    text = text.replace(/:sub:`([^`]+)`/g, (_, body) => toScript(body.replace(/\\\s/g, ''), SUBSCRIPTS, '_'));
    // `text <url>`__ and `text <url>`_
    text = text.replace(/`([^`<]+?)\s*<([^>]+)>`__?/g, (_, label, url) => `[${label.trim()}](${url.trim()})`);
    // `text`_ → text
    text = text.replace(/`([^`]+)`_{1,2}/g, '$1');
    // ``code`` → `code`
    text = text.replace(/``([^`]+)``/g, (_, body) => `\`${body.trim()}\``);
    // leftover `text` → text (targets without label)
    text = text.replace(/`([^`]+)`/g, '$1');
    return text.trim();
  };
  return inline;
};

/* ------------------------------------------------------------ grid tables -- */

const parseGridTable = (lines) => {
  const rows = [];
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
    rows.push(cells.map((cell) => cell.trim()));
  }
  return rows.filter((row) => row.length && row.some((cell) => cell));
};

const gridToMarkdown = (rows, inline) => {
  if (!rows.length) return [];
  const width = Math.max(...rows.map((row) => row.length));
  const grid = rows.map((row) => [...row, ...Array(width - row.length).fill('')]);
  const header = grid[0].map((cell) => escapeCell(inline(cell)));
  const body = grid.slice(1).map((row) => row.map((cell) => escapeCell(inline(cell))));
  const out = [`| ${header.join(' | ')} |`, `| ${header.map(() => '---').join(' | ')} |`];
  for (const row of body) out.push(`| ${row.join(' | ')} |`);
  return out;
};

/* -------------------------------------------------------------- parsing --- */

/** Split a directive body into option lines, a primary argument and content. */
const readDirective = (lines, start) => {
  const header = /^\.\.\s+([a-zA-Z-]+)::\s*(.*)$/.exec(lines[start]);
  const name = header[1];
  const firstArg = header[2].trim();
  let end = start + 1;
  while (end < lines.length) {
    const line = lines[end];
    if (line.trim() === '' || /^\s/.test(line)) end += 1;
    else break;
  }
  const body = lines.slice(start + 1, end).map((line) => line.replace(/^\s{1,4}/, ''));
  const options = {};
  const rest = [];
  let inOptions = true;
  for (const line of body) {
    const option = /^:([a-zA-Z-]+):\s*(.*)$/.exec(line);
    if (inOptions && option) {
      options[option[1]] = option[2].trim();
      continue;
    }
    if (line.trim() !== '') inOptions = false;
    rest.push(line);
  }
  return { name, firstArg, options, content: rest, end };
};

const parseFile = (rawText, context, chapterNumber, baseDir, isTitleFile) => {
  // RST roles may wrap across lines; collapse the whitespace inside them first
  // so :ref:/:numref:/:math: are always seen as a single span.
  const text = rawText
    .replace(/\r/g, '')
    .replace(/(:[a-z]+:`[^`]*`)/gs, (span) => span.replace(/\s+/g, ' '));
  const lines = text.split('\n');
  const blocks = [];
  const inline = makeInline(context);
  let sawTitle = false;

  const pushParagraph = (buffer) => {
    const joined = buffer.join(' ').replace(/\s+/g, ' ').trim();
    if (!joined) return;
    blocks.push({ type: 'para', text: inline(joined) });
  };

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    // Section title: text followed by an underline of repeated punctuation. The
    // source titles already carry their numbers (1.3, 1.3.1, …), so only the
    // heading depth is derived from the underline character.
    const underline = lines[index + 1];
    if (underline && /^([=\-~^"'])\1{2,}\s*$/.test(underline) && line.trim().length <= underline.trim().length + 8 && !line.startsWith('..')) {
      const marker = underline.trim()[0];
      const depth = { '=': 3, '-': 4, '~': 5, '^': 6, '"': 6, "'": 6 }[marker] ?? 4;
      const rawTitle = inline(line.trim());
      let level = depth;
      let title = rawTitle;
      if (!sawTitle) {
        sawTitle = true;
        level = isTitleFile ? 2 : 3;
      }
      blocks.push({ type: 'heading', level, title });
      index += 2;
      continue;
    }

    // Comments and targets.
    if (/^\.\.\s+_/.test(line)) {
      index += 1;
      continue;
    }
    if (/^\.\.\s+\[\#?[^\]]*\]\s/.test(line)) {
      const match = /^\.\.\s+\[([^\]]*)\]\s+(.*)$/.exec(line);
      const body = [match[2]];
      index += 1;
      while (index < lines.length && (lines[index].trim() === '' || /^\s+/.test(lines[index]))) {
        if (lines[index].trim()) body.push(lines[index].trim());
        index += 1;
      }
      blocks.push({ type: 'footnote', text: inline(body.join(' ')) });
      continue;
    }
    if (/^\.\.\s*$/.test(line.trim())) {
      index += 1;
      continue;
    }

    // Directives.
    const directive = /^\.\.\s+([a-zA-Z-]+)::/.exec(line);
    if (directive) {
      const parsed = readDirective(lines, index);
      index = parsed.end;
      const contentText = parsed.content.join('\n').trim();

      switch (parsed.name) {
        case 'figure': {
          const figurePath = parsed.firstArg || parsed.content.find((row) => row.trim())?.trim() || '';
          const captionLines = parsed.content
            .filter((row) => row.trim() && !/^:[a-zA-Z-]+:/.test(row) && row.trim() !== figurePath)
            .map((row) => row.trim());
          const caption = inline(captionLines.join(' '));
          const number = context.nextFigure(chapterNumber);
          blocks.push({ type: 'figure', src: baseDir ? `${baseDir}/${figurePath}` : figurePath, caption, number, alt: caption, options: parsed.options });
          break;
        }
        case 'table': {
          const caption = inline(parsed.firstArg);
          const rows = parseGridTable(parsed.content);
          const number = context.nextTable(chapterNumber);
          blocks.push({ type: 'table', caption, rows, number });
          break;
        }
        case 'math': {
          blocks.push({ type: 'math', text: texToUnicode(contentText) });
          break;
        }
        case 'admonition':
        case 'sidebar':
        case 'note':
        case 'warning':
        case 'tip':
        case 'hint':
        case 'important':
        case 'seealso':
        case 'topic': {
          const title = parsed.firstArg || (parsed.name === 'admonition' ? '' : parsed.name.charAt(0).toUpperCase() + parsed.name.slice(1));
          const paragraphs = contentText
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.split('\n').map((row) => row.trim()).filter(Boolean).join(' '))
            .filter(Boolean);
          blocks.push({ type: 'callout', title: inline(title), body: paragraphs });
          break;
        }
        case 'centered': {
          const textLines = [parsed.firstArg, ...parsed.content.map((row) => row.trim())].filter(Boolean);
          blocks.push({ type: 'centered', text: inline(textLines.join(' ')) });
          break;
        }
        case 'code-block':
        case 'code':
        case 'sourcecode': {
          blocks.push({ type: 'code', lang: parsed.firstArg || 'text', body: contentText.split('\n') });
          break;
        }
        case 'toctree':
        case 'index':
        case 'contents':
        case 'hlist':
          break;
        default:
          if (contentText) blocks.push({ type: 'para', text: inline(contentText.split('\n').join(' ')) });
          break;
      }
      continue;
    }

    // Lists.
    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items = [];
      let current = null;
      while (index < lines.length) {
        const row = lines[index];
        if (/^\s*([-*+]|\d+\.)\s+/.test(row)) {
          if (current) items.push(current);
          current = [row.replace(/^\s*([-*+]|\d+\.)\s+/, '')];
          index += 1;
          continue;
        }
        if (row.trim() === '') {
          const next = lines[index + 1] ?? '';
          if (/^\s*([-*+]|\d+\.)\s+/.test(next) || /^\s{2,}\S/.test(next)) {
            index += 1;
            continue;
          }
          break;
        }
        if (current && /^\s+\S/.test(row)) {
          current.push(row.trim());
          index += 1;
          continue;
        }
        break;
      }
      if (current) items.push(current);
      blocks.push({ type: 'list', ordered, items: items.map((item) => inline(item.join(' '))) });
      continue;
    }

    // Literal block introduced by a trailing "::".
    if (/::\s*$/.test(line)) {
      const intro = line.replace(/::\s*$/, '').trim();
      const literal = [];
      index += 1;
      while (index < lines.length && (lines[index].trim() === '' || /^\s{2,}\S/.test(lines[index]))) {
        if (lines[index].trim()) literal.push(lines[index].replace(/^\s{2,}/, ''));
        index += 1;
      }
      if (intro) pushParagraph([intro.endsWith(':') ? intro : `${intro}:`]);
      if (literal.length) blocks.push({ type: 'code', lang: 'text', body: literal });
      continue;
    }

    // Indented block quote.
    if (/^\s{2,}\S/.test(line)) {
      const quote = [];
      while (index < lines.length && (lines[index].trim() === '' || /^\s{2,}\S/.test(lines[index]))) {
        if (lines[index].trim()) quote.push(lines[index].trim());
        index += 1;
      }
      blocks.push({ type: 'quote', text: inline(quote.join(' ')) });
      continue;
    }

    // Plain paragraph: consume until a blank line or a new construct.
    const buffer = [];
    while (index < lines.length) {
      const row = lines[index];
      if (!row.trim()) break;
      if (/^\.\.\s+/.test(row) || /^\s*([-*+]|\d+\.)\s+/.test(row)) break;
      const next = lines[index + 1];
      if (next && /^([=\-~^"'])\1{2,}\s*$/.test(next) && !row.startsWith('..')) break;
      buffer.push(row);
      index += 1;
    }
    pushParagraph(buffer);
  }
  return blocks;
};

/* ---------------------------------------------------------------- render -- */

const renderFigure = (block, key, context) => {
  const file = context.copyFigure(block.src, key, block.number);
  const lines = [`![${block.alt || block.caption || 'figure'}](/images/${BOOK}/${file})`, '', `**Figure ${block.number}. ${block.caption}**`];
  return lines;
};

const renderBlocks = (blocks, key, context) => {
  const inline = makeInline(context);
  const chunks = [];
  let footnoteNumber = 0;
  for (const block of blocks) {
    switch (block.type) {
      case 'heading':
        chunks.push(`${'#'.repeat(Math.min(6, block.level))} ${block.title}`);
        break;
      case 'para':
      case 'centered':
      case 'math':
        chunks.push(block.text);
        break;
      case 'quote':
        chunks.push(`> ${block.text}`);
        break;
      case 'callout': {
        const lines = [`> **${block.title}**`];
        for (const row of block.body) {
          lines.push('>', `> ${inline(row)}`);
        }
        chunks.push(lines.join('\n'));
        break;
      }
      case 'code':
        chunks.push(['```' + (block.lang === 'text' ? 'text' : block.lang), ...block.body, '```'].join('\n'));
        break;
      case 'list': {
        const lines = block.items.map((item, position) => (block.ordered ? `${position + 1}. ${item}` : `- ${item}`));
        chunks.push(lines.join('\n'));
        break;
      }
      case 'table': {
        const rows = gridToMarkdown(block.rows, inline);
        chunks.push([`**Table ${block.number}. ${block.caption}**`, '', ...rows].join('\n'));
        break;
      }
      case 'figure':
        chunks.push(renderFigure(block, key, context).join('\n'));
        break;
      case 'footnote':
        footnoteNumber += 1;
        chunks.push(`[^${footnoteNumber}]: ${block.text}`);
        break;
      default:
        break;
    }
  }
  return chunks.filter((chunk) => chunk && chunk.trim()).join('\n\n');
};

/* ------------------------------------------------------------------ main -- */

const main = () => {
  const withImages = !process.argv.includes('--no-images');
  fs.mkdirSync(SRC_OUT, { recursive: true });
  if (withImages) fs.mkdirSync(IMG_OUT, { recursive: true });

  const labels = new Map();
  const figureCounters = new Map();
  const tableCounters = new Map();
  const copied = new Map();

  const context = {
    labels,
    nextFigure: (chapter) => {
      const value = (figureCounters.get(chapter) ?? 0) + 1;
      figureCounters.set(chapter, value);
      return `${chapter}.${value}`;
    },
    nextTable: (chapter) => {
      const value = (tableCounters.get(chapter) ?? 0) + 1;
      tableCounters.set(chapter, value);
      return `${chapter}.${value}`;
    },
    copyFigure: (source, key, number) => {
      const absolute = path.join(RST, source);
      const extension = path.extname(source) || '.png';
      const target = `fig-${key}-${number.split('.').pop()}${extension}`;
      if (withImages && fs.existsSync(absolute)) {
        const destination = path.join(IMG_OUT, target);
        fs.copyFileSync(absolute, destination);
        const size = fs.statSync(destination).size;
        if (size > 500_000 && extension.toLowerCase() !== '.svg') {
          try {
            execFileSync('magick', [destination, '-resize', '1400x1400>', destination], { stdio: 'ignore' });
          } catch {
            /* keep the original when ImageMagick is unavailable */
          }
        }
      }
      copied.set(source, target);
      return target;
    },
  };

  const structure = { chapters: [] };
  const pages = [];

  const simplePages = [
    { key: 'preface', file: 'preface.rst', titleEn: 'Preface', titleAr: 'تصدير' },
    { key: 'foreword', file: 'foreword.rst', titleEn: 'Foreword', titleAr: 'تقديم' },
    { key: 'foreword-1e', file: 'foreword_1e.rst', titleEn: 'Foreword to the First Edition', titleAr: 'تقديم الطبعة الأولى' },
  ];
  for (const page of simplePages) {
    pages.push({ ...page, files: [page.file], chapterNumber: 0, kind: 'simple' });
  }
  for (const [position, chapter] of CHAPTERS.entries()) {
    const chapterFile = `${chapter.dir}.rst`;
    const body = fs.readFileSync(path.join(RST, chapterFile), 'utf8');
    const sectionFiles = [...body.matchAll(/^\s{3}(\S+\.rst)\s*$/gm)].map((match) => match[1]);
    pages.push({
      key: chapter.key,
      titleEn: chapter.titleEn,
      titleAr: chapter.titleAr,
      chapterNumber: position + 1,
      chapterFile,
      files: sectionFiles,
      kind: 'chapter',
    });
  }

  // First pass: section numbers and labels, so :ref:/:numref: resolve everywhere.
  for (const page of pages) {
    const files = page.kind === 'chapter' ? [page.chapterFile, ...page.files] : page.files;
    const counters = [page.chapterNumber, 0, 0, 0];
    let figures = 0;
    let tables = 0;
    for (const file of files) {
      const text = fs.readFileSync(path.join(RST, file), 'utf8');
      const lines = text.split('\n');
      let pending = null;
      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        const labelMatch = /^\.\.\s+_([^:]+):\s*$/.exec(line);
        if (labelMatch) {
          pending = labelMatch[1];
          continue;
        }
        const underline = lines[index + 1];
        if (underline && /^([=\-~^"'])\1{2,}\s*$/.test(underline) && line.trim() && !line.startsWith('..')) {
          const marker = underline.trim()[0];
          const depth = { '=': 1, '-': 2, '~': 3, '^': 4 }[marker] ?? 2;
          const level = Math.max(page.kind === 'chapter' ? 1 : 1, depth);
          counters[level - 1] += 1;
          for (let rest = level; rest < counters.length; rest += 1) counters[rest] = 0;
          const number = counters.slice(0, level).filter((value, position) => position === 0 || value > 0).join('.');
          const title = line.trim().replace(/\s+/g, ' ');
          const entry = { section: number, title };
          labels.set(`section-${number}`, entry);
          if (pending) labels.set(pending, entry);
          pending = null;
        }
        if (/^\.\.\s+figure::/.test(line)) {
          figures += 1;
          if (pending) {
            labels.set(pending, { figure: `${page.chapterNumber}.${figures}` });
            pending = null;
          }
        }
        if (/^\.\.\s+table::/.test(line)) {
          tables += 1;
          if (pending) {
            labels.set(pending, { table: `${page.chapterNumber}.${tables}` });
            pending = null;
          }
        }
      }
    }
  }

  // Second pass: emit slices.
  for (const page of pages) {
    const files = page.kind === 'chapter' ? [page.chapterFile, ...page.files] : page.files;
    const chunks = [];
    for (const file of files) {
      const text = fs.readFileSync(path.join(RST, file), 'utf8');
      const baseDir = path.dirname(file);
      const blocks = parseFile(text, context, page.chapterNumber, baseDir === '.' ? '' : baseDir, file === files[0]);
      chunks.push(renderBlocks(blocks, page.key, context));
    }
    const joined = chunks.filter((chunk) => chunk && chunk.trim()).join('\n\n');
    // Footnotes are collected at the end of the page, renumbered in order.
    const footnotes = joined.split('\n').filter((line) => /^\[\^\d+\]:/.test(line));
    const body = [
      joined.split('\n').filter((line) => !/^\[\^\d+\]:/.test(line)).join('\n').replace(/\n{3,}/g, '\n\n').trim(),
      footnotes.map((line, position) => line.replace(/^\[\^\d+\]:/, `[^${position + 1}]:`)).join('\n\n'),
    ].filter(Boolean).join('\n\n');
    const title = page.titleEn;
    const markdown = `---\ntitle: "${title}"\nauthors: "${AUTHORS}"\nsource: ${SOURCE_URL}\n---\n\n${body}\n`;
    fs.writeFileSync(path.join(SRC_OUT, `${page.key}.en.md`), markdown);

    const sectionFiles = page.kind === 'chapter' ? page.files : [];
    const sections = [{ slug: 'index', title: page.titleAr, order: 0 }];
    sectionFiles.forEach((file, position) => {
      const base = path.basename(file, '.rst');
      sections.push({ slug: base, title: base, order: position + 1 });
    });
    structure.chapters.push({ key: page.key, title: title, titleAr: page.titleAr, sections });
    console.log(`${page.key}: ${files.length} file(s), ${body.split(/\s+/).length} words`);
  }

  fs.writeFileSync(STRUCTURE_OUT, `${JSON.stringify(structure, null, 2)}\n`);
  console.log(`\nwrote ${SRC_OUT} (${pages.length} slices) and ${STRUCTURE_OUT}`);
  console.log(`figures copied: ${copied.size}`);
};

main();
