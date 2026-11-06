// Splits the seven SICP chapter monoliths into one page per section, the same
// granularity as the Arabic source (sarabander.github.io/sicp), and rewrites
// every in-page sarabander anchor (#g_t…, #Figure-…, #Exercise-…, #Footnote-…)
// into a concrete site section URL.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const bookDir = path.join(root, 'content', 'sicp');
const structureFile = path.join(root, 'content', 'sicp-structure.json');

const CH = {
  1: 'c1-building-abstractions-with-procedures',
  2: 'c2-building-abstractions-with-data',
  3: 'c3-modularity-objects-and-state',
  4: 'c4-metalinguistic-abstraction',
  5: 'c5-computing-with-register-machines',
};

const FILES = [
  {
    key: 'c0-frontmatter',
    mode: 'h2',
    slugs: ['index', 'taqdimah', 'tamhida-2nd', 'tamhida-1st', 'shukr-taqdir'],
  },
  { key: CH[1], mode: 'num' },
  { key: CH[2], mode: 'num' },
  { key: CH[3], mode: 'num' },
  { key: CH[4], mode: 'num' },
  { key: CH[5], mode: 'num' },
  {
    key: 'c6-backmatter',
    mode: 'h2',
    slugs: ['index', 'lista-tamrin', 'lista-ashkal', 'bayanta-nashr'],
  },
];

const notes = [];
const note = (msg) => notes.push(msg);

const readParts = (file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split('\n');
  const fmEnd = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (lines[0].trim() !== '---' || fmEnd === -1) throw new Error(`${file}: no front matter`);
  return { fm: lines.slice(0, fmEnd + 1), body: lines.slice(fmEnd + 1) };
};

const parseAnchor = (anchor) => {
  let m = anchor.match(/^g_t(\d+)_002e(\d+)/);
  if (m) return { kind: 'section', x: +m[1], y: +m[2] };
  m = anchor.match(/^Figure-(\d+)_002e(\d+)/);
  if (m) return { kind: 'figure', x: +m[1], y: +m[2] };
  m = anchor.match(/^Exercise-(\d+)_002e(\d+)/);
  if (m) return { kind: 'exercise', x: +m[1], y: +m[2] };
  m = anchor.match(/^Footnote-(\d+)$/);
  if (m) return { kind: 'footnote', n: +m[1] };
  return { kind: 'unknown' };
};

// --- 1) read, split into groups, harvest footnote defs ----------------------
const groups = new Map(); // chapter key -> [{ slug, title, lines }]
const footnotes = new Map(); // n -> { chapterKey, lines }
const nonDefBody = new Map(); // chapter key -> body lines without def blocks

for (const spec of FILES) {
  const { body } = readParts(path.join(bookDir, `${spec.key}--index.md`));

  const defStarts = [];
  body.forEach((line, i) => {
    if (/^\[\^\d+\]:/.test(line)) defStarts.push(i);
  });
  const defRanges = [];
  for (const start of defStarts) {
    let end = start + 1;
    while (end < body.length && body[end].trim() !== '' && !/^\[\^\d+\]:/.test(body[end])) end += 1;
    defRanges.push({ start, end, n: +body[start].match(/^\[\^(\d+)\]:/)[1] });
  }
  for (const r of defRanges) {
    footnotes.set(r.n, { chapterKey: spec.key, lines: body.slice(r.start, r.end) });
  }
  const skip = new Set(defRanges.flatMap((r) => {
    const idx = [];
    for (let i = r.start; i < r.end; i += 1) idx.push(i);
    return idx;
  }));
  nonDefBody.set(spec.key, body.filter((_, i) => !skip.has(i)));
}

for (const spec of FILES) {
  const headingRe = spec.mode === 'num' ? /^### (\d+)\.(\d+)\s/ : /^## /;
  const bodyNoDefs = nonDefBody.get(spec.key);
  const splits = [];
  bodyNoDefs.forEach((line, i) => {
    if (headingRe.test(line)) splits.push(i);
  });
  if (!splits.length) throw new Error(`${spec.key}: no split headings found`);

  const chapterGroups = [];
  const preamble = bodyNoDefs.slice(0, splits[0]);
  for (let g = 0; g < splits.length; g += 1) {
    const start = splits[g];
    const end = g + 1 < splits.length ? splits[g + 1] : bodyNoDefs.length;
    let lines = bodyNoDefs.slice(start, end);
    const heading = lines[0].replace(/^### |^## /, '').trim();
    let slug;
    let title = heading;
    if (spec.mode === 'num') {
      const m = heading.match(/^(\d+)\.(\d+)\s*(.*)$/);
      title = heading;
      slug = m[2] === '1' ? 'index' : `${m[1]}-${m[2]}`;
      if (g === 0) {
        slug = 'index';
        lines = [...preamble, '', ...lines];
      }
    } else {
      slug = spec.slugs[g];
    }
    chapterGroups.push({ slug, title, lines });
  }
  groups.set(spec.key, chapterGroups);
}

// --- 2) redistribute footnote defs to the groups that reference them --------
const footnoteHost = new Map(); // n -> chapter key where the def was re-appended
for (const [key, gs] of groups) {
  for (const g of gs) {
    const used = new Set();
    for (const line of g.lines) {
      for (const m of line.matchAll(/\[\^(\d+)\](?!:)/g)) used.add(+m[1]);
    }
    if (!used.size) continue;
    const defs = [];
    for (const n of [...used].sort((a, b) => a - b)) {
      const def = footnotes.get(n);
      if (!def) {
        note(`footnote [^${n}] referenced in ${key}/${g.slug} but undefined`);
        continue;
      }
      defs.push(def.lines.join('\n'));
      if (!footnoteHost.has(n)) footnoteHost.set(n, key);
    }
    if (defs.length) g.lines = [...g.lines, '', ...defs.join('\n\n').split('\n')];
  }
}
for (const [n, def] of footnotes) {
  if (!footnoteHost.has(n)) note(`footnote [^${n}] defined in ${def.chapterKey} but never referenced`);
}

// --- 3) rewrite legacy sarabander anchors -----------------------------------
const slugExists = (key, slug) => (groups.get(key) || []).some((g) => g.slug === slug);
const findGroupByText = (key, re) => {
  const hit = (groups.get(key) || []).find((g) =>
    g.lines.some((line) => re.test(line.replace(/\u200c/g, '')))
  );
  return hit ? hit.slug : null;
};
const urlFor = (key, slug) => `/book/sicp/${key}/${slug}/`;

for (const [key, gs] of groups) {
  for (const g of gs) {
    g.lines = g.lines.map((line) =>
      line.replace(/\]\(#([^)\s]+)\)/g, (whole, anchor) => {
        const t = parseAnchor(anchor);
        let target = null;
        if (t.kind === 'section' && CH[t.x]) {
          const slug = t.y === 1 ? 'index' : `${t.x}-${t.y}`;
          if (slugExists(CH[t.x], slug)) target = urlFor(CH[t.x], slug);
        } else if (t.kind === 'figure' && CH[t.x]) {
          const slug =
            findGroupByText(CH[t.x], new RegExp(`Fig${t.x}[.]${t.y}(?![0-9])`)) ||
            findGroupByText(CH[t.x], new RegExp(`الشكل ${t.x}\\.${t.y}(?![0-9])`));
          if (slug) target = urlFor(CH[t.x], slug);
        } else if (t.kind === 'exercise' && CH[t.x]) {
          const slug = findGroupByText(CH[t.x], new RegExp(`(ال)?تمرين ${t.x}\\.${t.y}\\b`));
          if (slug) target = urlFor(CH[t.x], slug);
        } else if (t.kind === 'footnote' && footnoteHost.has(t.n)) {
          const host = footnoteHost.get(t.n);
          const slug = findGroupByText(host, new RegExp(`^\\[\\^${t.n}\\]:`));
          if (slug) target = urlFor(host, slug);
        }
        if (!target) {
          note(`unmapped anchor #${anchor} in ${key}/${g.slug}`);
          return whole;
        }
        return `](${target})`;
      })
    );
  }
}

// --- 4) write files + structure ---------------------------------------------
const structure = JSON.parse(fs.readFileSync(structureFile, 'utf8'));

for (const spec of FILES) {
  const gs = groups.get(spec.key);
  // Read the original front matter BEFORE overwriting (index gets it verbatim).
  const originalFm = readParts(path.join(bookDir, `${spec.key}--index.md`)).fm;
  const originalTitle = (originalFm.join('\n').match(/title:\s*"([^"]*)"/) || [])[1] || '';
  for (const g of gs) {
    const fm =
      g.slug === 'index'
        ? originalFm
        : ['---', `title: "${g.title.replace(/"/g, '\\"')}"`, 'lang: ar', '---'];
    const out = [...fm, '', ...g.lines].join('\n').replace(/\s+$/, '\n');
    fs.writeFileSync(path.join(bookDir, `${spec.key}--${g.slug}.md`), out);
  }
  const chapter = structure.chapters.find((c) => c.key === spec.key);
  chapter.sections = gs.map((g, i) => ({
    slug: g.slug,
    title: i === 0 ? originalTitle : g.title,
    titleAr: i === 0 ? originalTitle : g.title,
    order: i,
  }));
}

fs.writeFileSync(structureFile, `${JSON.stringify(structure, null, 1)}\n`);

const total = [...groups.values()].reduce((s, gs) => s + gs.length, 0);
console.log(`split ${FILES.length} chapters into ${total} sections`);
if (notes.length) {
  console.log(`\n${notes.length} notes:`);
  for (const n of notes) console.log(`  ! ${n}`);
}
