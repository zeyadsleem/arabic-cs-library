#!/usr/bin/env node
/** Import "Operating Systems: Three Easy Pieces" (OSTEP) into markdown slices.
 *
 * Source: one PDF per chapter (Remzi & Andrea Arpaci-Dusseau, free download,
 * translation published with the authors' permission).
 *
 * The PDFs are converted to poppler's XML (`pdftohtml -xml`) once and the XML
 * is vendored under content-src/ostep/xml, so this script has no runtime
 * dependency on poppler. Run with --pdf to regenerate the XML from the PDFs.
 *
 * Outputs:
 *   content-src/ostep/src/<key>.en.md   English slice used by the checker
 *   content/ostep-structure.json        chapter keys and Arabic titles
 *
 * Usage: node scripts/import-ostep.mjs [--pdf] [--check] [key ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const BOOK = 'ostep';
const PDF_DIR = `${ROOT}/content-src/${BOOK}/pdf`;
const XML_DIR = `${ROOT}/content-src/${BOOK}/xml`;
const SRC_OUT = `${ROOT}/content-src/${BOOK}/src`;
const STRUCTURE_OUT = `${ROOT}/content/${BOOK}-structure.json`;

/** Chapter list in book order. `num` is the printed chapter number (null for
 *  front matter and appendices). `titleAr` is the Arabic page title. */
const CHAPTERS = [
  { key: 'dedication', num: null, titleEn: 'Dedication', titleAr: 'الإهداء' },
  { key: 'preface', num: null, titleEn: 'Preface', titleAr: 'تمهيد' },
  { key: 'dialogue-threeeasy', num: 1, titleEn: 'Dialogue: The Three Easy Pieces', titleAr: 'حوار: القطع الثلاث السهلة' },
  { key: 'intro', num: 2, titleEn: 'Introduction to Operating Systems', titleAr: 'مقدمة في أنظمة التشغيل' },
  { key: 'dialogue-virtualization', num: 3, titleEn: 'Dialogue: Virtualization', titleAr: 'حوار: المحاكاة الافتراضية' },
  { key: 'cpu-intro', num: 4, titleEn: 'The Abstraction: The Process', titleAr: 'التجريد: العملية' },
  { key: 'cpu-api', num: 5, titleEn: 'Interlude: Process API', titleAr: 'استراحة: واجهة برمجة العمليات' },
  { key: 'cpu-mechanisms', num: 6, titleEn: 'Mechanism: Limited Direct Execution', titleAr: 'الآلية: التنفيذ المباشر المحدود' },
  { key: 'cpu-sched', num: 7, titleEn: 'Scheduling: Introduction', titleAr: 'الجدولة: مقدمة' },
  { key: 'cpu-sched-mlfq', num: 8, titleEn: 'Scheduling: The Multi-Level Feedback Queue', titleAr: 'الجدولة: قائمة الانتظار متعددة المستويات' },
  { key: 'cpu-sched-lottery', num: 9, titleEn: 'Scheduling: Proportional Share', titleAr: 'الجدولة: الحصة التناسبية' },
  { key: 'cpu-sched-multi', num: 10, titleEn: 'Multiprocessor Scheduling (Advanced)', titleAr: 'الجدولة على معالجات متعددة (متقدّم)' },
  { key: 'cpu-dialogue', num: 11, titleEn: 'Dialogue: Scheduling', titleAr: 'حوار: الجدولة' },
  { key: 'dialogue-vm', num: 12, titleEn: 'Dialogue: Virtual Memory', titleAr: 'حوار: الذاكرة الافتراضية' },
  { key: 'vm-intro', num: 13, titleEn: 'The Abstraction: Address Spaces', titleAr: 'التجريد: فضاءات العناوين' },
  { key: 'vm-api', num: 14, titleEn: 'Interlude: Memory API', titleAr: 'استراحة: واجهة برمجة الذاكرة' },
  { key: 'vm-mechanism', num: 15, titleEn: 'Mechanism: Address Translation', titleAr: 'الآلية: ترجمة العناوين' },
  { key: 'vm-segmentation', num: 16, titleEn: 'Segmentation', titleAr: 'التقطيع' },
  { key: 'vm-freespace', num: 17, titleEn: 'Free Space Management', titleAr: 'إدارة المساحة الحرة' },
  { key: 'vm-paging', num: 18, titleEn: 'Introduction to Paging', titleAr: 'مقدمة في الترقيم الصفحي' },
  { key: 'vm-tlbs', num: 19, titleEn: 'Translation Lookaside Buffers', titleAr: 'مخازن الترجمة المؤقتة (TLB)' },
  { key: 'vm-smalltables', num: 20, titleEn: 'Advanced Page Tables', titleAr: 'جداول صفحات متقدّمة' },
  { key: 'vm-beyondphys', num: 21, titleEn: 'Swapping: Mechanisms', titleAr: 'التبديل: الآليات' },
  { key: 'vm-beyondphys-policy', num: 22, titleEn: 'Swapping: Policies', titleAr: 'التبديل: السياسات' },
  { key: 'vm-complete', num: 23, titleEn: 'Complete Virtual Memory Systems', titleAr: 'أنظمة ذاكرة افتراضية كاملة' },
  { key: 'vm-dialogue', num: 24, titleEn: 'Dialogue: Virtual Memory (Summary)', titleAr: 'حوار: الذاكرة الافتراضية (خلاصة)' },
  { key: 'dialogue-concurrency', num: 25, titleEn: 'Dialogue: Concurrency', titleAr: 'حوار: التزامن' },
  { key: 'threads-intro', num: 26, titleEn: 'Concurrency: An Introduction', titleAr: 'التزامن: مقدمة' },
  { key: 'threads-api', num: 27, titleEn: 'Interlude: Thread API', titleAr: 'استراحة: واجهة برمجة الخيوط' },
  { key: 'threads-locks', num: 28, titleEn: 'Locks', titleAr: 'الأقفال' },
  { key: 'threads-locks-usage', num: 29, titleEn: 'Locked Data Structures', titleAr: 'بنى بيانات مقفلة' },
  { key: 'threads-cv', num: 30, titleEn: 'Condition Variables', titleAr: 'المتغيّرات الشرطية' },
  { key: 'threads-sema', num: 31, titleEn: 'Semaphores', titleAr: 'الإشارات' },
  { key: 'threads-bugs', num: 32, titleEn: 'Common Concurrency Problems', titleAr: 'أخطاء التزامن الشائعة' },
  { key: 'threads-events', num: 33, titleEn: 'Event-based Concurrency (Advanced)', titleAr: 'التزامن القائم على الأحداث (متقدّم)' },
  { key: 'threads-dialogue', num: 34, titleEn: 'Dialogue: Concurrency (Summary)', titleAr: 'حوار: التزامن (خلاصة)' },
  { key: 'dialogue-persistence', num: 35, titleEn: 'Dialogue: Persistence', titleAr: 'حوار: الاستمرارية' },
  { key: 'file-devices', num: 36, titleEn: 'I/O Devices', titleAr: 'أجهزة الإدخال والإخراج' },
  { key: 'file-disks', num: 37, titleEn: 'Hard Disk Drives', titleAr: 'محرّكات الأقراص الصلبة' },
  { key: 'file-raid', num: 38, titleEn: 'Redundant Arrays of Inexpensive Disks (RAID)', titleAr: 'المصفوفات المتكرّرة من الأقراص الرخيصة (RAID)' },
  { key: 'file-intro', num: 39, titleEn: 'Files and Directories', titleAr: 'الملفات والأدلّة' },
  { key: 'file-implementation', num: 40, titleEn: 'File System Implementation', titleAr: 'تنفيذ نظم الملفات' },
  { key: 'file-ffs', num: 41, titleEn: 'Locality and The Fast File System', titleAr: 'المحلّية ونظام الملفات السريع' },
  { key: 'file-journaling', num: 42, titleEn: 'Crash Consistency: FSCK and Journaling', titleAr: 'الاتساق بعد الانهيار: FSCK والسجلّات' },
  { key: 'file-lfs', num: 43, titleEn: 'Log-structured File Systems', titleAr: 'نظم الملفات ذات البنية السجلية' },
  { key: 'file-ssd', num: 44, titleEn: 'Flash-based SSDs', titleAr: 'أقراص الحالة الصلبة القائمة على الذاكرة الوميضية' },
  { key: 'file-integrity', num: 45, titleEn: 'Data Integrity and Protection', titleAr: 'سلامة البيانات وحمايتها' },
  { key: 'file-dialogue', num: 46, titleEn: 'Dialogue: Persistence (Summary)', titleAr: 'حوار: الاستمرارية (خلاصة)' },
  { key: 'dialogue-distribution', num: 47, titleEn: 'Dialogue: Distributed Systems', titleAr: 'حوار: الأنظمة الموزّعة' },
  { key: 'dist-intro', num: 48, titleEn: 'A Dialogue on Distributed Systems', titleAr: 'حوار حول الأنظمة الموزّعة' },
  { key: 'dist-nfs', num: 49, titleEn: 'Network File System (NFS)', titleAr: 'نظام ملفات الشبكة (NFS)' },
  { key: 'dist-afs', num: 50, titleEn: 'The Andrew File System (AFS)', titleAr: 'نظام ملفات أندرو (AFS)' },
  { key: 'dist-dialogue', num: 51, titleEn: 'Dialogue: Distributed Systems (Summary)', titleAr: 'حوار: الأنظمة الموزّعة (خلاصة)' },
  { key: 'dialogue-security', num: 52, titleEn: 'Dialogue: Security', titleAr: 'حوار: الأمن' },
  { key: 'security-intro', num: 53, titleEn: 'Introduction to Security', titleAr: 'مقدمة في الأمن' },
  { key: 'security-authentication', num: 54, titleEn: 'Authentication', titleAr: 'المصادقة' },
  { key: 'security-access', num: 55, titleEn: 'Access Control', titleAr: 'التحكّم في الوصول' },
  { key: 'security-crypto', num: 56, titleEn: 'Cryptography', titleAr: 'التعمية' },
  { key: 'security-distributed', num: 57, titleEn: 'Distributed Systems', titleAr: 'الأنظمة الموزّعة' },
  { key: 'dialogue-vmm', num: null, titleEn: 'Dialogue: Virtual Machine Monitors', titleAr: 'حوار: مراقبات الآلات الافتراضية' },
  { key: 'vmm-intro', num: null, titleEn: 'Virtual Machine Monitors', titleAr: 'مراقبات الآلات الافتراضية' },
  { key: 'dialogue-monitors', num: null, titleEn: 'Dialogue: Monitors', titleAr: 'حوار: المراقبات' },
  { key: 'threads-monitors', num: null, titleEn: 'Monitors (Deprecated)', titleAr: 'المراقبات (مهجورة)' },
  { key: 'dialogue-labs', num: null, titleEn: 'Dialogue: Labs', titleAr: 'حوار: المعامل' },
  { key: 'lab-tutorial', num: null, titleEn: 'Laboratory: Tutorial', titleAr: 'المعمل: دليل تمهيدي' },
  { key: 'lab-projects-systems', num: null, titleEn: 'Laboratory: Projects (Systems)', titleAr: 'المعمل: مشاريع الأنظمة' },
  { key: 'lab-projects-xv6', num: null, titleEn: 'Laboratory: Projects (xv6)', titleAr: 'المعمل: مشاريع xv6' },
];

const LIGATURES = { 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬀ': 'ff', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬅ': 'ft', 'ﬆ': 'st' };

const decodeEntities = (text) => text
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");

const normaliseText = (text) => decodeEntities(text)
  .replace(/[ﬁﬂﬀﬃﬄﬅﬆ]/g, (char) => LIGATURES[char] ?? char)
  .replace(/\u00a0/g, ' ')
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201c\u201d]/g, '"')
  .replace(/[\u2013\u2014]/g, '—')
  .replace(/\s+/g, ' ')
  .trim();

/** Parse the poppler XML into pages of positioned text runs. */
const parseXml = (xml) => {
  const fontspecs = new Map();
  for (const match of xml.matchAll(/<fontspec id="(\d+)" size="([\d.]+)" family="([^"]*)"/g)) {
    fontspecs.set(match[1], { size: Number(match[2]), family: match[3] });
  }
  const pages = [];
  for (const pageMatch of xml.matchAll(/<page[^>]*>([\s\S]*?)<\/page>/g)) {
    const runs = [];
    for (const textMatch of pageMatch[1].matchAll(/<text top="(-?\d+)" left="(-?\d+)" width="(-?\d+)" height="(-?\d+)" font="(\d+)">([\s\S]*?)<\/text>/g)) {
      const [, top, left, width, height, font, raw] = textMatch;
      const spec = fontspecs.get(font);
      const text = normaliseText(raw.replace(/<[^>]+>/g, ''));
      if (!text || !spec) continue;
      runs.push({
        top: Number(top),
        left: Number(left),
        width: Number(width),
        height: Number(height),
        size: spec.size,
        family: spec.family,
        bold: /<b>/.test(raw),
        italic: /<i>/.test(raw),
        text,
      });
    }
    pages.push(runs);
  }
  return pages;
};

const isMono = (run) => /Mon/i.test(run.family);
const isSans = (run) => /Sans|Helvetica|Arial/i.test(run.family);
const isSmallCaps = (run) => /Palladio/i.test(run.family) && run.size <= 11.5 && run.text.trim().length <= 40 && /[A-Z]/.test(run.text) && !/[a-z]/.test(run.text);

/** Strip running headers, footers and page folios. */
const foldSpacing = (text) => text.replace(/(?<=[A-Z])\s(?=[A-Z]\b)/g, '').replace(/\s+/g, ' ').trim();

const isChrome = (line) => {
  const text = line.text;
  const folded = foldSpacing(text);
  if (line.top < 100 || line.top > 872) return true;
  if (/^(OPERATING SYSTEMS|WWW\.OSTEP\.ORG|\[VERSION|THREE EASY PIECES)/.test(folded)) return true;
  if (/\bARPACI-DUSSEAU\b/.test(folded)) return true;
  if (/^©/.test(folded)) return true;
  if (/^\d{1,3}$/.test(text) && (line.top < 120 || line.top > 860)) return true;
  if (/^[ivxlcdm]{1,7}$/.test(text)) return true;
  if (/^\d+\s+[A-Z]\s?NTERLUDE/.test(folded)) return true;
  if (/^[A-Z]\s?NTERLUDE\s*:/.test(folded)) return true;
  return false;
};

/** Group positioned runs into text lines. */
const buildLines = (runs) => {
  const sorted = [...runs].sort((a, b) => a.top - b.top || a.left - b.left);
  const lines = [];
  for (const run of sorted) {
    const line = lines.at(-1);
    if (line && Math.abs(run.top - line.top) <= 7) {
      line.runs.push(run);
      line.top = Math.min(line.top, run.top);
    } else {
      lines.push({ top: run.top, runs: [run] });
    }
  }
  return lines.map((line) => {
    const runs = line.runs.sort((a, b) => a.left - b.left);
    const main = runs.reduce((best, run) => (run.text.length > best.text.length ? run : best), runs[0]);
    const lineIsMono = runs.some((run) => isMono(run));
    let text = '';
    let previousRight = null;
    for (const run of runs) {
      if (run.left < 75 && /^\d{1,3}$/.test(run.text.trim())) continue;
      const isMarker = !lineIsMono && run.size <= 9 && /^\d{1,2}$/.test(run.text);
      if (!isMarker && previousRight !== null && run.left - previousRight > 1.2) text += ' ';
      text += isMarker ? `[^${run.text}]` : run.text;
      previousRight = run.left + run.width;
    }
    return {
      top: line.top,
      left: runs[0].left,
      right: previousRight ?? runs[0].left,
      text: text.trim(),
      size: main.size,
      family: main.family,
      mono: isMono(main),
      sans: isSans(main),
      smallCaps: runs.some(isSmallCaps),
      bold: runs.some((run) => run.bold),
    };
  }).filter((line) => line.text && !isChrome(line));
};

/** Join physical lines into paragraphs, undoing end-of-line hyphenation. */
const joinLines = (lines) => {
  let text = '';
  for (const line of lines) {
    if (text === '') {
      text = line.text;
      continue;
    }
    if (/[a-z]-$/.test(text) && /^[a-z]/.test(line.text)) {
      text = text.slice(0, -1) + line.text;
      continue;
    }
    text += ` ${line.text}`;
  }
  return text;
};

const fenceOf = (codeLines) => {
  const indents = codeLines.map((line) => line.left).filter((left) => Number.isFinite(left));
  const base = indents.length > 0 ? Math.min(...indents) : 0;
  const body = codeLines.map((line) => {
    const indent = Math.max(0, Math.round((line.left - base) / 6.5));
    return `${' '.repeat(indent)}${line.text}`.replace(/\s+$/, '');
  });
  return ['```c', ...body, '```'].join('\n');
};

/** Convert one chapter's XML into a markdown slice. */
const convert = (chapter, pages) => {
  const out = [];
  const footnotes = [];
  const codeMeta = [];
  let figureCount = 0;
  let openFootnote = -1;
  let paragraph = [];
  const pendingBoxes = [];
  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push(joinLines(paragraph));
    paragraph = [];
    while (pendingBoxes.length > 0) out.push(pendingBoxes.shift());
  };

  pages.forEach((runs, pageIndex) => {
    openFootnote = -1;
    const lines = buildLines(runs);
    const bodyLefts = lines.filter((line) => !line.mono && line.size >= 9 && line.size <= 14).map((line) => line.left);
    const leftCounts = new Map();
    for (const left of bodyLefts) leftCounts.set(left, (leftCounts.get(left) ?? 0) + 1);
    const baseLeft = leftCounts.size > 0
      ? [...leftCounts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0]
      : 87;
    const proseLefts = lines.filter((line) => !line.mono && line.text.length > 40).map((line) => line.left);
    const proseCounts = new Map();
    for (const left of proseLefts) proseCounts.set(left, (proseCounts.get(left) ?? 0) + 1);
    const proseLeft = proseCounts.size > 0
      ? [...proseCounts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0]
      : baseLeft;
    const gaps = [];
    for (let index = 1; index < lines.length; index += 1) gaps.push(lines[index].top - lines[index - 1].top);
    const positive = gaps.filter((gap) => gap > 0).sort((a, b) => a - b);
    const medianGap = positive.length > 0 ? positive[Math.floor(positive.length / 2)] : 15;

    let codeBuffer = [];
    const flushCode = () => {
      if (codeBuffer.length === 0) return;
      if (codeBuffer.length === 1) {
        paragraph.push(`\`${codeBuffer[0].text.trim()}\``);
        codeBuffer = [];
        return;
      }
      out.push(fenceOf(codeBuffer));
      codeMeta.push({ index: out.length - 1, page: pageIndex, top: codeBuffer[0].top });
      codeBuffer = [];
    };

    let box = null;
    const closeBox = () => {
      if (box === null) return;
      const body = joinLines(box.lines);
      const blocks = [`> **${box.label}**`];
      if (body) blocks.push(`> ${body}`);
      pendingBoxes.push(blocks.join('\n>\n'));
      box = null;
    };

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const previous = lines[index - 1];

      if (line.mono) {
        flushParagraph();
        codeBuffer.push(line);
        continue;
      }
      flushCode();

      if (chapter.num !== null && /^\d{1,3}$/.test(line.text) && Number(line.text) === chapter.num) {
        continue;
      }

      if (/^Figure\s+\d+\.\d+:/.test(line.text)) {
        flushParagraph();
        figureCount += 1;
        // Crop a generous band ending at the caption; the rasteriser trims
        // the surrounding white space afterwards, so the exact top edge here
        // only has to clear the preceding paragraph.
        // Walk up from the caption and stop at the first full-width body line:
        // figure content is inset or centred, so its lines never reach the body
        // column's right edge with the body's left margin.
        let top = Math.max(100, line.top - 360);
        for (let up = index - 1; up >= 0 && up >= index - 40; up -= 1) {
          const above = lines[up];
          if (above.top > line.top - 20) continue;
          if (above.mono || above.text.length <= 40) continue;
          if (Math.abs(above.left - proseLeft) > 2) continue;
          top = Math.max(100, above.top + 22);
          break;
        }
        const caption = line.text.match(/^Figure\s+(\d+\.\d+):\s*(.*)$/);
        figures.push({
          key: chapter.key,
          n: figureCount,
          page: pageIndex + 1,
          x: 50,
          y: Math.round(top),
          w: 548,
          h: Math.max(40, Math.round(line.top - top - 14)),
          caption: caption ? caption[2] : line.text,
        });
        for (const meta of codeMeta) {
          if (meta.page === pageIndex && meta.top >= line.top - 460 && meta.top <= line.top) out[meta.index] = '';
        }
        out.push(`@@FIG@${chapter.key}-${figureCount}@@`);
        out.push(`**${line.text}**`);
        continue;
      }

      if (box !== null && line.left > baseLeft + 8) {
        box.lines.push(line);
        continue;
      }
      closeBox();

      if (line.smallCaps && /^[A-Z][A-Z :'’(),.&/-]{3,}$/.test(line.text)) {
        flushParagraph();
        box = { label: line.text.replace(/\s*:\s*$/, ''), lines: [] };
        continue;
      }

      if (line.sans && line.size >= 19) {
        flushParagraph();
        const sameAsChapter = line.text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
          === chapter.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        if (!sameAsChapter) out.push(`## ${line.text}`);
        continue;
      }

      const footnoteDef = line.text.match(/^\[\^(\d+)\](.*)$/);
      if (footnoteDef) {
        openFootnote = footnotes.length;
        footnotes.push(`[^${footnoteDef[1]}]: ${footnoteDef[2].trim()}`);
        continue;
      }

      const numbered = line.text.match(/^(\d+\.\d+(?:\.\d+)?)\s+(.+)$/);
      if (numbered && line.size >= 14) {
        flushParagraph();
        const depth = numbered[1].split('.').length - 1;
        out.push(`${'#'.repeat(Math.min(5, depth + 1))} ${numbered[1]} ${numbered[2]}`);
        continue;
      }
      if (line.size >= 14 && !line.mono) {
        flushParagraph();
        const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        if (slug(line.text) !== slug(chapter.titleEn)) out.push(`## ${line.text}`);
        continue;
      }

      if (line.size <= 10) {
        const rest = line.text.trim();
        if (rest === '') continue;
        if (openFootnote >= 0) footnotes[openFootnote] += ` ${rest}`;
        continue;
      }

      const bullet = /^•\s+/.test(line.text);
      if (bullet) {
        flushParagraph();
        paragraph.push({ ...line, text: line.text.replace(/^•\s+/, '- ') });
        continue;
      }

      const endsSentence = previous !== undefined && /[.!?:"”’)]$/.test(previous.text.trim());
      const startsParagraph = paragraph.length === 0
        || (previous && line.top - previous.top > medianGap * 1.5)
        || (line.left > baseLeft + 4 && endsSentence);
      if (startsParagraph) flushParagraph();
      paragraph.push(line);
    }
    flushCode();
    closeBox();
    const lastPart = paragraph.length > 0 ? paragraph[paragraph.length - 1] : undefined;
    const tail = typeof lastPart === 'string' ? lastPart.trim() : (lastPart?.text ?? '').trim();
    if (paragraph.length > 0 && /[.!?:"”’)]$/.test(tail)) flushParagraph();
  });

  flushParagraph();

  return [...out.filter((block) => block !== ''), ...footnotes];
};

const chapterMarkdown = (chapter, blocks) => {
  const heading = chapter.num === null ? `# ${chapter.titleEn}` : `# Chapter ${chapter.num} ${chapter.titleEn}`;
  return `${heading}\n\n${blocks.join('\n\n')}\n`;
};

const ensureDirs = () => {
  for (const dir of [PDF_DIR, XML_DIR, SRC_OUT]) fs.mkdirSync(dir, { recursive: true });
};

const toXml = (key) => {
  const pdf = `${PDF_DIR}/${key}.pdf`;
  if (!fs.existsSync(pdf)) return null;
  const target = `${XML_DIR}/${key}`;
  try {
    execFileSync('pdftohtml', ['-xml', '-i', '-stdout', pdf], { stdio: ['ignore', fs.openSync(`${target}.xml`, 'w'), 'ignore'] });
  } catch {
    // Some PDFs make poppler's -stdout mode fail; write the XML to a file instead.
    execFileSync('pdftohtml', ['-xml', '-i', pdf, target], { stdio: ['ignore', 'ignore', 'ignore'] });
  }
  return `${target}.xml`;
};

const figures = [];

const main = () => {
  const args = process.argv.slice(2);
  const regenerate = args.includes('--pdf');
  const check = args.includes('--check');
  const keys = args.filter((arg) => !arg.startsWith('--'));
  const selected = keys.length > 0 ? CHAPTERS.filter((chapter) => keys.includes(chapter.key)) : CHAPTERS;
  ensureDirs();

  const structure = { chapters: [] };
  let missing = 0;
  for (const chapter of CHAPTERS) {
    structure.chapters.push({
      key: chapter.key,
      title: chapter.titleEn,
      titleAr: chapter.titleAr,
      sections: [{ slug: 'index', title: chapter.titleEn, titleAr: chapter.titleAr, order: 0 }],
    });
  }

  for (const chapter of selected) {
    const xmlPath = `${XML_DIR}/${chapter.key}.xml`;
    if (regenerate || !fs.existsSync(xmlPath)) toXml(chapter.key);
    if (!fs.existsSync(xmlPath)) {
      console.error(`missing ${chapter.key}`);
      missing += 1;
      continue;
    }
    const xml = fs.readFileSync(xmlPath, 'utf8');
    const pages = parseXml(xml);
    const blocks = convert(chapter, pages);
    const markdown = chapterMarkdown(chapter, blocks);
    const words = markdown.split(/\s+/).filter(Boolean).length;
    if (!check) fs.writeFileSync(`${SRC_OUT}/${chapter.key}.en.md`, markdown);
    console.log(`${chapter.key.padEnd(26)} pages ${String(pages.length).padStart(3)}  blocks ${String(blocks.length).padStart(4)}  words ${words}`);
  }

  if (!check) fs.writeFileSync(STRUCTURE_OUT, `${JSON.stringify(structure, null, 2)}\n`);
  const figureFile = `${SRC_OUT}/../figures.json`;
  if (!check) {
    const existing = fs.existsSync(figureFile)
      ? JSON.parse(fs.readFileSync(figureFile, 'utf8'))
      : [];
    const fresh = existing.filter((entry) => !selected.some((chapter) => chapter.key === entry.key));
    fs.writeFileSync(figureFile, `${JSON.stringify([...fresh, ...figures], null, 2)}\n`);
  }
  if (missing > 0) console.log(`${missing} chapter(s) without a PDF`);
};

main();
