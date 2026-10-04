import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { COURSE, sourceUrl, readableHtml, readableVtt, sha256, downloadSource } from '../scripts/import-mit-6100l.mjs';

const source = fileURLToPath(new URL('../content-src/mit-6100l/', import.meta.url));

test('source boundary excludes other courses, textbook repositories and media hosts', () => {
  assert.equal(sourceUrl('../6-0001-introduction/'), null);
  assert.equal(sourceUrl('https://ocw.mit.edu.evil.example/courses/'), null);
  assert.equal(sourceUrl('https://github.com/guttag/Intro-to-Computation-and-Programming'), null);
  assert.equal(sourceUrl('http://ocw.mit.edu/'), null);
  assert.equal(sourceUrl('pages/readings/#chapter'), `${COURSE}pages/readings/`);
  assert.throws(() => downloadSource('https://example.com/course.pdf'), /outside allowed scope/);
  assert.throws(() => downloadSource(`${COURSE}lecture.mp4`), /outside allowed scope/);
});

test('readable exercise text decodes highlighted code without losing indentation or comparison operators', () => {
  const html = '<h3>Exercise</h3><pre><code><span>def check(x):</span>\n<span>    if x &lt; 3:</span>\n<span>        return "&lt;ok&gt;"</span></code></pre><p>Read <a href="pages/readings/">the assignment</a>.</p>';
  const text = readableHtml(html);
  assert.ok(text.includes('def check(x):\n    if x < 3:\n        return "<ok>"'));
  assert.ok(text.includes(`${COURSE}pages/readings/`));
  assert.doesNotMatch(text, /<span|<code|MIT6100LCODEBLOCK/);
});

test('caption text retains utterances while timed originals remain separate', () => {
  assert.equal(readableVtt('WEBVTT\n\n1\n00:00:00.000 --> 00:00:02.000\nANA: Hello.\n\n2\n00:00:02.000 --> 00:00:04.000\nWelcome to Python.\n'), 'ANA: Hello.\n\nWelcome to Python.\n');
});

test('nested HTML links use the source page rather than the course root', () => {
  const base = `${COURSE}pages/lecture-1-introduction/`;
  const text = readableHtml('<a href="../readings/">Readings</a><a href="#notes">Notes</a>', base);
  assert.ok(text.includes(`${COURSE}pages/readings/`));
  assert.ok(text.includes(`${base}#notes`));
});

test('WebVTT metadata blocks are excluded but numeric spoken answers are retained', () => {
  const text = readableVtt('WEBVTT\n\nNOTE editorial metadata\nnot spoken\n\nSTYLE\n::cue { color: white; }\n\nanswer-id\n00:00:00.000 --> 00:00:02.000\n42\n');
  assert.equal(text, '42\n');
  assert.throws(() => readableVtt('not captions'), /Invalid WebVTT header/);
});

test('ingested originals, archive members and extracted artifacts match the manifest hashes', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
  let checked = 0;
  for (const item of manifest.inventory) {
    const artifacts = [...(item.original ? [{ path: item.original, sha256: item.sha256 }] : []), ...(item.extracted || []), ...(item.members || [])];
    for (const member of item.members || []) artifacts.push(...member.extracted);
    for (const entry of artifacts) {
      assert.equal(sha256(fs.readFileSync(path.join(source, entry.path))), entry.sha256, entry.path);
      checked++;
    }
    if (item.kind === 'media-reference') {
      assert.equal(item.downloaded, false);
      assert.equal(item.original, null);
    }
  }
  assert.ok(checked > 500);
});

test('all 26 lectures resolve exact published resources, transcripts and notes', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
  const entries = new Map(manifest.inventory.map((item) => [item.url, item]));
  assert.equal(manifest.lectures.length, 26);
  for (const [index, lecture] of manifest.lectures.entries()) {
    assert.equal(lecture.number, index + 1);
    assert.equal(entries.get(lecture.transcript)?.kind, 'pdf');
    assert.equal(entries.get(lecture.video)?.kind, 'media-reference');
    assert.match(lecture.youtubeEmbed, /^https:\/\/www.youtube.com\/embed\//);
    const resources = lecture.sections.flatMap((section) => section.resources);
    assert.ok(resources.some((entry) => entry.url.endsWith(`lec${String(index + 1).padStart(2, '0')}_pdf/`)));
    for (const resource of resources) {
      assert.ok(entries.has(resource.url), resource.url);
      for (const download of resource.downloads) assert.ok(download.original, download.url);
    }
  }
  // OCW has exercises 1–20, 22 and 23, not one per lecture. Do not invent missing exercises.
  assert.equal(manifest.inventory.filter((item) => /\/mit6_100l_f22_ex\d+_sol\.pdf$/.test(item.url)).length, 22);
  assert.equal(manifest.inventory.filter((item) => /\/mit6_100l_f22_ps\d\.pdf$/.test(item.url)).length, 6);
});

test('copyright exceptions and Word recitation extracts remain explicit', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
  assert.equal(manifest.resourceExceptions.length, 9);
  assert.ok(manifest.resourceExceptions.every((entry) => entry.excludedPages.length > 0));
  const members = manifest.inventory.flatMap((item) => item.members || []);
  const wordSummaries = members.filter((member) => /\/R\d+_summary\.docx$/i.test(member.path) && !member.path.includes('__MACOSX'));
  assert.ok(wordSummaries.length >= 4);
  assert.ok(wordSummaries.every((member) => member.readable?.endsWith('.txt')));
  assert.ok(members.filter((member) => member.path.includes('__MACOSX')).every((member) => member.readable === null));
  const exercises = fs.readFileSync(path.join(source, 'extracted/pages/finger-exercises/index.txt'), 'utf8');
  assert.doesNotMatch(exercises, /<span|<code|MIT6100LCODEBLOCK/);
  assert.match(exercises, /def eval_quadratic\(a, b, c, x\):/);
  assert.equal(manifest.thirdPartyCodeHolds.length, 2);
  for (const held of manifest.thirdPartyCodeHolds) assert.ok(!manifest.archiveTranslationInputs.some((input) => input.path === held.path));
});

test('cached importer rerun reproduces the manifest without network refresh', () => {
  const manifest = path.join(source, 'manifest.json');
  const before = sha256(fs.readFileSync(manifest));
  const root = fileURLToPath(new URL('../', import.meta.url));
  execFileSync(process.execPath, ['scripts/import-mit-6100l.mjs'], { cwd: root, maxBuffer: 1024 * 1024, timeout: 120000 });
  assert.equal(sha256(fs.readFileSync(manifest)), before);
});
