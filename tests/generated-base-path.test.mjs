import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { deployedBase } from '../scripts/lib/base-path.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const sectionFiles = () => {
  const dir = path.join(root, 'src/lib/generated/sections');
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => path.join(dir, name));
};

const absoluteUrls = (markup) =>
  [...markup.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((match) => match[1]);

test('committed section JSON carries the deployment base path on every absolute URL', () => {
  const base = deployedBase();
  assert.ok(base, 'تعذّر استخراج مسار النشر من المستودع');
  const files = sectionFiles();
  assert.ok(files.length > 0, 'لم يُعثر على أي قسم مُولَّد');

  const offenders = [];
  let checked = 0;
  for (const file of files) {
    const { html = '' } = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const url of absoluteUrls(html)) {
      checked += 1;
      if (!url.startsWith(`${base}/`)) offenders.push(`${path.basename(file)} → ${url}`);
    }
  }

  assert.equal(offenders.length, 0, `روابط بلا مسار النشر:\n${offenders.slice(0, 20).join('\n')}`);
  assert.ok(checked > 0, 'لم يُفحص أي رابط — الاختبار لا يتحقق من شيء');
});

test('committed go-tour lessons carry the deployment base path on every absolute URL', () => {
  const base = deployedBase();
  assert.ok(base, 'تعذّر استخراج مسار النشر من المستودع');
  const lessons = JSON.parse(
    fs.readFileSync(path.join(root, 'src/lib/tour/lessons.json'), 'utf8'),
  );
  const markup = JSON.stringify(lessons);
  const urls = absoluteUrls(markup.replaceAll('\\"', '"'));
  const offenders = urls.filter((url) => !url.startsWith(`${base}/`));

  assert.ok(urls.length > 0, 'لم يُعثر على أي رابط مطلق في دروس الجولة');
  assert.deepEqual(offenders.slice(0, 20), []);
});
