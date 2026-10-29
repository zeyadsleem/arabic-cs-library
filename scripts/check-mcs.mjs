#!/usr/bin/env node
// Verifies the Arabic Mathematics for Computer Science pages before they are
// built: KaTeX must render every expression (the extraction that seeded this
// book broke formulas, so a silent math failure is the failure mode to catch),
// each page must declare Arabic, and the prose must actually be Arabic.
//
// Usage:
//   node scripts/check-mcs.mjs                 # every page of the book
//   node scripts/check-mcs.mjs ch02-well-ordering ch03-logical-formulas

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import footnotes from 'markdown-it-footnote';
import { installContentMath } from './lib/content-math.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bookDir = path.join(root, 'content', 'mathematics-for-cs');

const ARABIC = /[\u0600-\u06FF]/g;
const LATIN = /[A-Za-z]/g;

const requested = process.argv.slice(2);
const prefixes = requested.length
  ? requested.map((chapter) => chapter.replace(/\.md$/, ''))
  : null;

const files = fs
  .readdirSync(bookDir)
  .filter((name) => name.endsWith('.md'))
  .filter((name) => (prefixes ? prefixes.some((prefix) => name.startsWith(`${prefix}--`)) : true))
  .sort();

if (!files.length) {
  console.error('check-mcs: no page matched the requested chapters');
  process.exit(1);
}

/** @param {string} raw @returns {string} prose with code, math and markup removed */
function proseOnly(raw) {
  return raw
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\\\[[\s\S]*?\\\]/g, ' ')
    .replace(/\\\([\s\S]*?\\\)/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

let failed = 0;
let warnings = 0;

for (const name of files) {
  const raw = fs.readFileSync(path.join(bookDir, name), 'utf8');
  const { data, content } = matter(raw);
  const problems = [];

  if (data.lang !== 'ar') problems.push(`frontmatter lang is "${data.lang ?? 'missing'}"`);

  const mathErrors = [];
  const markdown = new MarkdownIt({ html: true, linkify: false, typographer: false });
  markdown.use(footnotes);
  installContentMath(markdown, {
    onError: (tex, error) => mathErrors.push({ tex, message: error.message }),
  });

  markdown.render(content);
  for (const failure of mathErrors) {
    problems.push(`katex: ${failure.tex.slice(0, 60)} — ${failure.message.split('\n')[0]}`);
  }

  if (/\[\d{2}:\d{2}\]/.test(content)) problems.push('timestamped transcript line');

  const headings = content.match(/^#{1,3}\s/gm) ?? [];
  if (!headings.length) problems.push('no heading');

  const prose = proseOnly(raw);
  const arabic = (prose.match(ARABIC) ?? []).length;
  const latin = (prose.match(LATIN) ?? []).length;
  if (arabic + latin > 0) {
    const ratio = arabic / (arabic + latin);
    if (ratio < 0.5) problems.push(`prose is ${Math.round(ratio * 100)}% Arabic`);
    else if (ratio < 0.8) {
      warnings += 1;
      console.log(`warn ${name}: prose is ${Math.round(ratio * 100)}% Arabic`);
    }
  }

  if (!content.trim()) problems.push('empty body');

  if (problems.length) {
    failed += 1;
    console.log(`FAIL ${name}`);
    for (const problem of problems) console.log(`  - ${problem}`);
  } else {
    console.log(`ok   ${name} (${headings.length} headings, ${arabic} Arabic letters)`);
  }
}

console.log(`\n${files.length} pages — ${files.length - failed} ok · ${failed} failed${warnings ? ` · ${warnings} warnings` : ''}`);
process.exit(failed ? 1 : 0);
