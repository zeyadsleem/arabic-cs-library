#!/usr/bin/env node
/**
 * Validate the HPBN Arabic chapters with the repository's own translation rules.
 *
 * Source of truth for "is it translated": scripts/lib/translation-rules.mjs
 * (arabicLetterRatio, longestLatinRun, untranslatedLines, code fences, link targets).
 * The English source of every chapter is content-src/hpbn/<chapter>.md.
 *
 * Usage: node /tmp/opencode/check-hpbn.mjs [chapter-slug ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  arabicLetterRatio,
  longestLatinRun,
  untranslatedLines,
  codeFences,
  linkTargets,
  unrenderedTags,
  ARABIC_RATIO_MINIMUM,
  LATIN_RUN_MAXIMUM,
} from '/home/zeyad/projects/arabic-cs-library/scripts/lib/translation-rules.mjs';

const root = '/home/zeyad/projects/arabic-cs-library';
const bookDir = path.join(root, 'content', 'hpbn');
const srcDir = path.join(root, 'content-src', 'hpbn');

const only = process.argv.slice(2);
const files = fs.readdirSync(bookDir).filter((f) => f.endsWith('--index.md')).sort()
  .filter((f) => !only.length || only.includes(f.replace('--index.md', '')));

let failures = 0;
for (const file of files) {
  const slug = file.replace('--index.md', '');
  const problems = [];
  const raw = fs.readFileSync(path.join(bookDir, file), 'utf8');
  const parsed = matter(raw);
  const body = parsed.content;

  if (parsed.data.lang !== 'ar') problems.push(`frontmatter lang is ${JSON.stringify(parsed.data.lang)} (expected "ar")`);
  if (!/[\u0621-\u064A]/.test(String(parsed.data.title ?? ''))) {
    problems.push(`title is not Arabic: ${JSON.stringify(parsed.data.title)}`);
  }
  if (!parsed.data.source) problems.push('frontmatter has no source');

  const ratio = arabicLetterRatio(body);
  if (ratio < ARABIC_RATIO_MINIMUM) {
    problems.push(`only ${Math.round(ratio * 100)}% Arabic letters outside code`);
  }
  const run = longestLatinRun(body);
  if (run > LATIN_RUN_MAXIMUM) problems.push(`line of ${run} consecutive Latin words outside code`);

  const untranslated = untranslatedLines(body);
  if (untranslated.length) {
    problems.push(`${untranslated.length} untranslated line(s)`);
    for (const line of untranslated.slice(0, 6)) {
      problems.push(`    L: ${line.slice(0, 110)}`);
    }
  }

  const tags = unrenderedTags(body);
  if (tags.length) problems.push(`unrendered components: ${[...new Set(tags)].join(', ')}`);

  const srcPath = path.join(srcDir, `${slug}.md`);
  if (fs.existsSync(srcPath)) {
    const src = matter(fs.readFileSync(srcPath, 'utf8')).content;
    const srcFences = codeFences(src);
    const arFences = codeFences(body);
    if (srcFences.length !== arFences.length) {
      problems.push(`code blocks ${arFences.length} != source ${srcFences.length}`);
    } else {
      srcFences.forEach((block, i) => {
        if (block.body !== arFences[i].body) problems.push(`code block ${i + 1} body changed`);
        if (block.lang !== arFences[i].lang) problems.push(`code block ${i + 1} language changed`);
      });
    }
    const srcLinks = linkTargets(src).sort();
    const arLinks = linkTargets(body).sort();
    if (srcLinks.join('\n') !== arLinks.join('\n')) {
      const missing = srcLinks.filter((l) => !arLinks.includes(l));
      const extra = arLinks.filter((l) => !srcLinks.includes(l));
      problems.push(`link targets differ (missing: ${missing.join(', ') || 'none'} | extra: ${extra.join(', ') || 'none'})`);
    }
  } else {
    problems.push('no English source in content-src/hpbn');
  }

  if (problems.length) {
    failures += 1;
    console.log(`[FAIL] ${slug}`);
    for (const p of problems) console.log(`   - ${p}`);
  } else {
    console.log(`[ok]   ${slug}  ratio=${(ratio * 100).toFixed(0)}%  run=${run}`);
  }
}
console.log(`\n${failures} chapter(s) failing of ${files.length}`);
process.exit(failures ? 1 : 0);
