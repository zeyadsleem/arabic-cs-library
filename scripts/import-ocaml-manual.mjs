#!/usr/bin/env node
/**
 * Import "The OCaml system, release 5.5 — Documentation and user's manual"
 * into English markdown slices for the Arabic translation.
 *
 * Source: the refman HTML bundle (ocaml-5.5-refman-html.tar.gz), vendored
 * under content-src/ocaml-manual/htmlman/. The manual is split by hevea into
 * one file per chapter landing page plus one file per section; this script
 * joins them back into one slice per chapter, in table-of-contents order.
 *
 * Emits:
 *   content-src/ocaml-manual/src/<key>.en.md        one slice per page
 *   content/ocaml-manual-structure.json             chapter/section skeleton
 *
 * Page keys: foreword, ch01 … ch37. Code blocks are kept verbatim (English
 * identifiers and prompts included); only prose is meant to be translated.
 *
 * Usage: node scripts/import-ocaml-manual.mjs [--check]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BOOK = 'ocaml-manual';
const HTML_DIR = path.join(ROOT, 'content-src', BOOK, 'htmlman');
const SRC_OUT = path.join(ROOT, 'content-src', BOOK, 'src');
const STRUCTURE_OUT = path.join(ROOT, 'content', `${BOOK}-structure.json`);

const CHAPTERS = [
  { key: 'foreword', titleEn: 'Foreword', titleAr: 'تصدير', files: ['foreword'] },
  { key: 'ch01', titleEn: 'The core language', titleAr: 'اللغة الأساسية', files: ['coreexamples'] },
  { key: 'ch02', titleEn: 'The module system', titleAr: 'نظام الوحدات', files: ['moduleexamples'] },
  { key: 'ch03', titleEn: 'Objects in OCaml', titleAr: 'الكائنات في OCaml', files: ['objectexamples'] },
  { key: 'ch04', titleEn: 'Labeled arguments', titleAr: 'الوسائط المُعنونة', files: ['lablexamples'] },
  { key: 'ch05', titleEn: 'Polymorphic variants', titleAr: 'المتغيّرات متعدّدة الأشكال', files: ['polyvariant'] },
  { key: 'ch06', titleEn: 'Polymorphism and its limitations', titleAr: 'تعدّد الأشكال وحدوده', files: ['polymorphism'] },
  { key: 'ch07', titleEn: 'Generalized algebraic datatypes', titleAr: 'أنواع البيانات الجبرية المعمّمة', files: ['gadts-tutorial'] },
  { key: 'ch08', titleEn: 'Advanced examples with classes and modules', titleAr: 'أمثلة متقدّمة بالأصناف والوحدات', files: ['advexamples'] },
  { key: 'ch09', titleEn: 'Parallel programming', titleAr: 'البرمجة المتوازية', files: ['parallelism'] },
  { key: 'ch10', titleEn: 'Memory model: The hard bits', titleAr: 'نموذج الذاكرة: الأجزاء الصعبة', files: ['memorymodel'] },
  {
    key: 'ch11',
    titleEn: 'The OCaml language',
    titleAr: 'لغة OCaml',
    files: ['language', 'lex', 'values', 'names', 'types', 'const', 'patterns', 'expr', 'typedecl', 'classes', 'modtypes', 'modules', 'compunit'],
  },
  {
    key: 'ch12',
    titleEn: 'Language extensions',
    titleAr: 'امتدادات اللغة',
    files: [
      'extn', 'letrecvalues', 'recursivemodules', 'privatetypes', 'locallyabstract', 'firstclassmodules',
      'moduletypeof', 'signaturesubstitution', 'modulealias', 'overridingopen', 'gadts', 'bigarray',
      'attributes', 'extensionnodes', 'extensiblevariants', 'generativefunctors', 'extensionsyntax',
      'inlinerecords', 'doccomments', 'indexops', 'emptyvariants', 'alerts', 'generalizedopens',
      'bindingops', 'effects', 'arrayliterals', 'labeledtuples', 'externaltypes',
    ],
  },
  { key: 'ch13', titleEn: 'Batch compilation (ocamlc)', titleAr: 'الترجمة الدفعية (ocamlc)', files: ['comp'] },
  { key: 'ch14', titleEn: 'The toplevel system or REPL (ocaml)', titleAr: 'النظام التفاعلي أو REPL (ocaml)', files: ['toplevel'] },
  { key: 'ch15', titleEn: 'The runtime system (ocamlrun)', titleAr: 'نظام التشغيل (ocamlrun)', files: ['runtime'] },
  { key: 'ch16', titleEn: 'Native-code compilation (ocamlopt)', titleAr: 'الترجمة إلى الشيفرة الأصلية (ocamlopt)', files: ['native'] },
  { key: 'ch17', titleEn: 'Lexer and parser generators (ocamllex, ocamlyacc)', titleAr: 'مولّدات المحلّلات والمحلّلات النحوية (ocamllex, ocamlyacc)', files: ['lexyacc'] },
  { key: 'ch18', titleEn: 'Dependency generator (ocamldep)', titleAr: 'مولّد التبعيات (ocamldep)', files: ['depend'] },
  { key: 'ch19', titleEn: 'The documentation generator (ocamldoc)', titleAr: 'مولّد التوثيق (ocamldoc)', files: ['ocamldoc'] },
  { key: 'ch20', titleEn: 'The debugger (ocamldebug)', titleAr: 'المنقّح (ocamldebug)', files: ['debugger'] },
  { key: 'ch21', titleEn: 'Native debugging (gdb, lldb)', titleAr: 'التنقيح الأصلي (gdb, lldb)', files: ['native-debugger'] },
  { key: 'ch22', titleEn: 'Profiling (ocamlprof, perf)', titleAr: 'قياس الأداء (ocamlprof, perf)', files: ['profil'] },
  { key: 'ch23', titleEn: 'Interfacing C with OCaml', titleAr: 'الربط البيني مع لغة C', files: ['intfc'] },
  { key: 'ch24', titleEn: 'Optimisation with Flambda', titleAr: 'التحسين باستخدام Flambda', files: ['flambda'] },
  { key: 'ch25', titleEn: 'Fuzzing with afl-fuzz', titleAr: 'الاختبار العشوائي باستخدام afl-fuzz', files: ['afl-fuzz'] },
  { key: 'ch26', titleEn: 'Runtime tracing with runtime events', titleAr: 'تتبّع زمن التشغيل بأحداث runtime', files: ['runtime-tracing'] },
  { key: 'ch27', titleEn: 'The "Tail Modulo Constructor" program transformation', titleAr: 'تحويل «Tail Modulo Constructor»', files: ['tail_mod_cons'] },
  { key: 'ch28', titleEn: 'Runtime detection of data races with ThreadSanitizer', titleAr: 'الكشف عن تسابقات البيانات وقت التشغيل باستخدام ThreadSanitizer', files: ['tsan'] },
  { key: 'ch29', titleEn: 'The core library', titleAr: 'المكتبة الأساسية', files: ['core'] },
  { key: 'ch30', titleEn: 'The standard library', titleAr: 'المكتبة القياسية', files: ['stdlib'] },
  { key: 'ch31', titleEn: 'The compiler front-end', titleAr: 'واجهة المترجم الأمامية', files: ['parsing'] },
  { key: 'ch32', titleEn: 'The unix library: Unix system calls', titleAr: 'مكتبة unix: نداءات نظام Unix', files: ['libunix'] },
  { key: 'ch33', titleEn: 'The str library: regular expressions and string processing', titleAr: 'مكتبة str: التعابير النمطية ومعالجة السلاسل', files: ['libstr'] },
  { key: 'ch34', titleEn: 'The runtime_events library', titleAr: 'مكتبة runtime_events', files: ['runtime_events'] },
  { key: 'ch35', titleEn: 'The threads library', titleAr: 'مكتبة threads', files: ['libthreads'] },
  { key: 'ch36', titleEn: 'The dynlink library: dynamic loading and linking of object files', titleAr: 'مكتبة dynlink: التحميل والربط الديناميان', files: ['libdynlink'] },
  { key: 'ch37', titleEn: 'Recently removed or moved libraries (Graphics, Bigarray, Num, LablTk)', titleAr: 'المكتبات المُزالة أو المنقولة حديثًا (Graphics وBigarray وNum وLablTk)', files: ['old'] },
];

/* ------------------------------------------------------------- entities ---- */

const SUPERSCRIPTS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻', n: 'ⁿ', i: 'ⁱ', k: 'ᵏ', a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', m: 'ᵐ', o: 'ᵒ', p: 'ᵖ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ' };
const SUBSCRIPTS = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉', '+': '₊', '-': '₋', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', n: 'ₙ', m: 'ₘ', x: 'ₓ', a: 'ₐ', e: 'ₑ', o: 'ₒ', p: 'ₚ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ' };

const toScript = (text, table) => {
  const chars = [...text];
  return chars.every((char) => table[char] !== undefined) ? chars.map((char) => table[char]).join('') : text;
};

/* --------------------------------------------------------------- helpers ---- */

const classOf = (node) => (node.getAttribute?.('class') ?? '').trim();
const hasClass = (node, name) => classOf(node).split(/\s+/).includes(name);
const isElement = (node) => node.nodeType === 1;
const isText = (node) => node.nodeType === 3;

const parentTable = (node) => {
  let current = node.parentNode;
  while (current) {
    if (current.tagName === 'TABLE') return current;
    current = current.parentNode;
  }
  return null;
};

const normalizeSpace = (text) => text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ');

const codeToText = (node) => {
  let out = '';
  for (const child of node.childNodes) {
    if (isText(child)) {
      out += child.text;
      continue;
    }
    if (!isElement(child)) continue;
    const tag = child.tagName.toLowerCase();
    if (tag === 'br') out += '\n';
    else if (tag === 'sub') out += toScript(child.text, SUBSCRIPTS);
    else if (tag === 'sup') out += toScript(child.text, SUPERSCRIPTS);
    else out += codeToText(child);
  }
  return out;
};

const fence = (body, lang = 'text') => {
  const text = body.replace(/\r/g, '').replace(/\t/g, '  ').split('\n').map((line) => line.replace(/\s+$/, '')).join('\n').replace(/^\n+|\n+$/g, '');
  return ['```' + lang, text, '```'].join('\n');
};

/* ------------------------------------------------------------- inline ------ */

const BLOCK_TAGS = new Set(['div', 'p', 'pre', 'table', 'ul', 'ol', 'dl', 'blockquote', 'hr']);

const inlineOf = (node, context, skipBlocks = false) => {
  let out = '';
  for (const child of node.childNodes) {
    if (isText(child)) {
      out += child.text;
      continue;
    }
    if (!isElement(child)) continue;
    const tag = child.tagName.toLowerCase();
    if (skipBlocks && BLOCK_TAGS.has(tag)) continue;
    if (tag === 'br') {
      out += ' ';
      continue;
    }
    if (tag === 'img') continue;
    if (tag === 'script' || tag === 'style') continue;
    if (hasClass(child, 'section-anchor')) continue;
    if (tag === 'sub') {
      out += toScript(inlineOf(child, context), SUBSCRIPTS);
      continue;
    }
    if (tag === 'sup') {
      out += toScript(inlineOf(child, context), SUPERSCRIPTS);
      continue;
    }
    if (tag === 'a') {
      const href = child.getAttribute('href') ?? '';
      const body = inlineOf(child, context).trim();
      if (href.startsWith('#note')) {
        out += `[^${body}]`;
      } else if (/^https?:/.test(href) && body) {
        out += `[${body}](${href})`;
      } else {
        out += body;
      }
      continue;
    }
    const inner = inlineOf(child, context).trim();
    if (!inner) continue;
    if (BLOCK_TAGS.has(tag)) {
      out += ` ${inner} `;
      continue;
    }
    if (hasClass(child, 'font-tt') || hasClass(child, 'syntax-token') || tag === 'code') {
      out += inner.includes('`') ? `\`\`${inner}\`\`` : `\`${inner}\``;
    } else if (hasClass(child, 'nonterminal') || hasClass(child, 'font-it') || tag === 'em' || tag === 'i') {
      out += `*${inner}*`;
    } else if (hasClass(child, 'font-bold') || tag === 'strong' || tag === 'b') {
      out += `**${inner}**`;
    } else {
      out += inner;
    }
  }
  return normalizeSpace(out);
};

/* --------------------------------------------------------------- tables ---- */

const tableRows = (table) => {
  const rows = [];
  for (const row of table.querySelectorAll('tr')) {
    if (parentTable(row) !== table) continue;
    const cells = row.childNodes.filter((node) => isElement(node) && (node.tagName === 'TD' || node.tagName === 'TH'));
    if (!cells.length) continue;
    rows.push(cells.map((cell) => inlineOf(cell, null).replace(/\s+/g, ' ').trim()));
  }
  return rows;
};

const markdownTable = (rows) => {
  if (!rows.length) return '';
  const width = Math.max(...rows.map((row) => row.length));
  const pad = (row) => [...row, ...Array(width - row.length).fill('')].map((cell) => cell.replace(/\|/g, '\\|'));
  const head = pad(rows[0]);
  const lines = [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`];
  for (const row of rows.slice(1)) lines.push(`| ${pad(row).join(' | ')} |`);
  return lines.join('\n');
};

const syntaxLines = (container) => {
  const lines = [];
  for (const table of container.querySelectorAll('table')) {
    if (parentTable(table) && parentTable(table).tagName === 'TABLE') continue;
    for (const row of table.querySelectorAll('tr')) {
      if (parentTable(row) !== table) continue;
      const cells = row.childNodes.filter((node) => isElement(node) && (node.tagName === 'TD' || node.tagName === 'TH'));
      if (!cells.length) continue;
      const parts = cells.map((cell) => normalizeSpace(codeToText(cell)).trim()).filter(Boolean);
      if (!parts.length) continue;
      const text = parts.length >= 2 && /^(::=|\+=|:=)$/.test(parts[1])
        ? `${parts[0]} ${parts[1]} ${parts.slice(2).join(' ')}`
        : parts.join(' ');
      lines.push(text.replace(/\s+/g, ' ').replace(/ /g, ' ').trim());
    }
  }
  return lines;
};

/* -------------------------------------------------------------- blocks ----- */

const isTocList = (node) => {
  if (node.tagName !== 'UL') return false;
  const items = node.childNodes.filter((child) => isElement(child) && child.tagName === 'LI');
  if (!items.length) return false;
  return items.every((item) => {
    const anchors = item.childNodes.filter((child) => isElement(child));
    if (anchors.length !== 1 || anchors[0].tagName !== 'A') return false;
    return /^\d+(\.\d+)*\s/.test(normalizeSpace(anchors[0].text).trim());
  });
};

const renderList = (node, ordered) => {
  const items = node.childNodes.filter((child) => isElement(child) && child.tagName === 'LI');
  const lines = [];
  items.forEach((item, index) => {
    const body = inlineOf(item, null).trim();
    const marker = ordered ? `${index + 1}.` : '-';
    const nested = item.childNodes.filter((child) => isElement(child) && (child.tagName === 'UL' || child.tagName === 'OL'));
    lines.push(`${marker} ${body}`);
    for (const list of nested) {
      const inner = renderList(list, list.tagName === 'OL').split('\n').map((line) => `  ${line}`);
      lines.push(...inner);
    }
  });
  return lines.join('\n');
};

const blocksOf = (container, out, depth = 0) => {
  for (const node of container.childNodes) {
    if (isText(node)) {
      if (node.text.trim()) out.push({ type: 'para', text: normalizeSpace(node.text).trim() });
      continue;
    }
    if (!isElement(node)) continue;
    const tag = node.tagName.toLowerCase();
    const cls = classOf(node);

    if (tag === 'a' && node.querySelector('img')) continue;
    if (tag === 'hr' || tag === 'script' || tag === 'style' || tag === 'link') continue;

    if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5') {
      const level = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5 }[tag];
      const title = normalizeSpace(node.text).replace(/^\uFEFF/, '').trim();
      if (title) out.push({ type: 'heading', level, title });
      continue;
    }

    if (tag === 'p') {
      const text = inlineOf(node, null).trim();
      if (text) out.push({ type: 'para', text });
      continue;
    }

    if (tag === 'pre' || tag === 'preblock') {
      out.push({ type: 'code', lang: 'text', body: codeToText(node) });
      continue;
    }

    if (tag === 'ul' || tag === 'ol') {
      if (isTocList(node)) continue;
      const items = node.childNodes.filter((child) => isElement(child) && child.tagName === 'LI');
      items.forEach((item, index) => {
        const text = inlineOf(item, null, true).trim();
        if (text) out.push({ type: 'para', text: `${tag === 'ol' ? `${index + 1}.` : '-'} ${text}` });
        for (const child of item.childNodes) {
          if (!isElement(child) || !BLOCK_TAGS.has(child.tagName.toLowerCase())) continue;
          if (child.tagName.toLowerCase() === 'hr') continue;
          blocksOf({ childNodes: [child] }, out, depth + 1);
        }
      });
      continue;
    }

    if (tag === 'blockquote') {
      const text = inlineOf(node, null).trim();
      if (text) out.push({ type: 'quote', text });
      continue;
    }

    if (tag === 'table') {
      const rows = tableRows(node);
      if (rows.length) out.push({ type: 'table', rows });
      continue;
    }

    if (tag === 'dl') {
      const entries = [];
      let current = null;
      for (const child of node.childNodes) {
        if (!isElement(child)) continue;
        const childTag = child.tagName.toLowerCase();
        if (childTag === 'dt') {
          current = { term: inlineOf(child, null, true).trim(), body: [] };
          entries.push(current);
        } else if (childTag === 'dd') {
          const target = current ?? { term: '', body: [] };
          if (!current) entries.push(target);
          const text = inlineOf(child, null).trim();
          if (text) target.body.push(text);
        }
      }
      if (hasClass(node, 'thefootnotes')) {
        for (const entry of entries) {
          const number = entry.term.replace(/\D/g, '');
          const body = entry.body.join(' ').replace(/\[(\d+)\]/g, '[$1]');
          if (number && body) out.push({ type: 'footnote', number, text: body });
        }
      } else {
        for (const entry of entries) out.push({ type: 'definition', term: entry.term, body: entry.body });
      }
      continue;
    }

    if (tag === 'div' && (hasClass(node, 'caml-example') || hasClass(node, 'caml-example-toplevel'))) {
      const chunks = [];
      for (const pre of node.querySelectorAll('div.pre, pre')) {
        const text = codeToText(pre).replace(/^\n+|\n+$/g, '');
        if (text) chunks.push(text);
      }
      if (chunks.length) out.push({ type: 'code', lang: 'ocaml', body: chunks.join('\n\n') });
      continue;
    }

    if (tag === 'div' && (hasClass(node, 'syntax') || hasClass(node, 'syntaxleft'))) {
      const lines = syntaxLines(node);
      if (lines.length) out.push({ type: 'code', lang: 'text', body: lines.join('\n') });
      continue;
    }

    if (tag === 'div' && hasClass(node, 'tableau')) {
      const table = node.querySelector('table');
      if (table) {
        const rows = tableRows(table);
        if (rows.length) out.push({ type: 'table', rows });
      }
      continue;
    }

    if (tag === 'div' && hasClass(node, 'theorem')) {
      const text = inlineOf(node, null).trim();
      if (text) out.push({ type: 'para', text });
      continue;
    }

    // Generic container: recurse.
    blocksOf(node, out, depth + 1);
  }
};

/* ---------------------------------------------------------------- render --- */

const render = (blocks) => {
  const parts = [];
  for (const block of blocks) {
    switch (block.type) {
      case 'heading':
        parts.push(`${'#'.repeat(block.level)} ${block.title}`);
        break;
      case 'para':
        parts.push(block.text);
        break;
      case 'quote':
        parts.push(block.text.split('\n').map((line) => `> ${line}`).join('\n'));
        break;
      case 'code':
        parts.push(fence(block.body, block.lang));
        break;
      case 'table':
        parts.push(markdownTable(block.rows));
        break;
      case 'definition':
        parts.push(block.term);
        for (const paragraph of block.body) parts.push(paragraph);
        break;
      case 'footnote':
        parts.push(`[^${block.number}]: ${block.text}`);
        break;
      default:
        break;
    }
  }
  // Footnotes belong at the end of the page.
  const footnotes = parts.filter((part) => /^\[\^\d+\]:/.test(part));
  const body = parts.filter((part) => !/^\[\^\d+\]:/.test(part));
  return [...body, ...footnotes].join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
};

/* ------------------------------------------------------------------ main --- */

const main = () => {
  const checkOnly = process.argv.includes('--check');
  fs.mkdirSync(SRC_OUT, { recursive: true });
  const structure = { chapters: [] };
  const report = [];

  CHAPTERS.forEach((chapter, order) => {
    const blocks = [];
    for (const file of chapter.files) {
      const filePath = path.join(HTML_DIR, `${file}.html`);
      if (!fs.existsSync(filePath)) throw new Error(`missing source: ${filePath}`);
      // node-html-parser treats <pre> as a raw-text block; rename it so the
      // hevea markup inside verbatim blocks is parsed into elements.
      const html = fs
        .readFileSync(filePath, 'utf8')
        .replace(/<pre(\s[^>]*)?>/gi, '<preblock$1>')
        .replace(/<\/pre>/gi, '</preblock>');
      const root = parse(html);
      const body = root.querySelector('body');
      if (!body) throw new Error(`no body in ${filePath}`);
      blocksOf(body, blocks);
    }
    const markdown = render(blocks);
    if (!checkOnly) fs.writeFileSync(path.join(SRC_OUT, `${chapter.key}.en.md`), markdown);
    const fences = (markdown.match(/^```/gm) ?? []).length / 2;
    const rows = (markdown.match(/^\|/gm) ?? []).length;
    report.push({ key: chapter.key, words: markdown.split(/\s+/).filter(Boolean).length, fences, rows });
    structure.chapters.push({
      key: chapter.key,
      title: chapter.titleEn,
      titleAr: chapter.titleAr,
      sections: [{ slug: 'index', title: chapter.titleEn, titleAr: chapter.titleAr, order: 0 }],
    });
    if (order === 0) structure.chapters[0].order = 0;
  });

  if (!checkOnly) {
    fs.writeFileSync(STRUCTURE_OUT, JSON.stringify(structure, null, 2) + '\n');
  }
  for (const row of report) {
    console.log(`${row.key.padEnd(10)} ${String(row.words).padStart(6)} words  ${String(row.fences).padStart(3)} fences  ${String(row.rows).padStart(4)} rows`);
  }
  console.log(`total: ${report.reduce((sum, row) => sum + row.words, 0)} words`);
};

main();
