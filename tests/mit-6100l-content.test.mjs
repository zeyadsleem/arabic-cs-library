import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const directory = new URL('content/mit-6100l/', root);
const files = (await readdir(directory)).filter((file) => file.endsWith('.md'));
const texts = await Promise.all(files.map(async (file) => ({
  file,
  text: await readFile(new URL(file, directory), 'utf8'),
})));

test('MIT text contains no accidental invisible controls or mixed-word corruption', () => {
  for (const { file, text } of texts) {
    assert.doesNotMatch(text, /[\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/u, file);
    const glued = [...text.matchAll(/[\u0621-\u063a\u0641-\u064a]+[A-Za-z]+|[A-Za-z]+[\u0621-\u063a\u0641-\u064a]+/gu)]
      .map((match) => match[0]).filter((word) => !/^و[A-Za-z]+$/u.test(word));
    assert.deepEqual(glued, [], file);
  }
});

test('MIT lecture source links use the published PDF and code resource formats', () => {
  for (const { file, text } of texts) {
    assert.doesNotMatch(text, /\/resources\/mit6_100l_f22_lec\d+\.pdf/u, file);
    for (const match of text.matchAll(/mit6_100l_f22_lec(\d+)_code_(py|zip)\//gu)) {
      const expected = [12, 20, 25].includes(Number(match[1])) ? 'zip' : 'py';
      assert.equal(match[2], expected, `${file}: ${match[0]}`);
    }
  }
});

test('Plotting retains every original slide as a local licensed visual', async () => {
  const text = texts.find(({ file }) => file === 'lecture-25--notes.md').text;
  for (let slide = 1; slide <= 78; slide += 1) {
    const name = `lecture-25-slide-${String(slide).padStart(2, '0')}.webp`;
    assert.ok(text.includes(`/images/mit-6100l/${name}`), name);
    await access(new URL(`static/images/mit-6100l/${name}`, root));
  }
  assert.ok(text.includes("plt.figure('expo')"));
  assert.doesNotMatch(text, /Rights/u);
});

test('Every lecture ships its translated transcript before the course is labelled fully translated', async () => {
  const library = JSON.parse(await readFile(new URL('content/library.json', root), 'utf8'));
  const course = library.books.find(({ id }) => id === 'mit-6100l');
  for (let lecture = 1; lecture <= 26; lecture += 1) {
    const name = `lecture-${String(lecture).padStart(2, '0')}--transcript.md`;
    const entry = texts.find(({ file }) => file === name);
    assert.ok(entry, name);
    assert.match(entry.text, /^## صفحة المصدر 1$/mu, name);
  }
  assert.equal(course.status, 'translated');
  assert.equal(course.statusText, undefined);
});
