import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/lib/generated');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const base = '/arabic-cs-library';
const sectionUrl = (section) => `${base}/book/${section.book}/${section.chapter}/${section.slug}/`;

async function inspect(page, url) {
  await page.goto(url);
  await page.locator('h1').first().waitFor();
  return page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    return {
      width: document.documentElement.scrollWidth,
      viewport,
      offenders: [...document.querySelectorAll('main *')].filter((element) => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && (box.left < -2 || box.right > viewport + 2) &&
          !element.closest('pre, .katex, .table-scroll, table, .cm-scroller');
      }).slice(0, 5).map((element) => `${element.tagName}.${String(element.className).slice(0, 50)}`)
    };
  });
}

for (const width of [320, 390, 768]) {
  test(`all book covers and tables of contents fit at ${width}px`, async ({ page }) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: 844 });
    const failures = [];
    for (const book of manifest.books) {
      const url = `${base}/book/${book.id}/`;
      const result = await inspect(page, url);
      if (result.width > result.viewport + 2) failures.push({ url, ...result });
    }
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
}

test('every in-library book reader fits mobile, including rich tables, code and diagrams', async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 320, height: 740 });
  const sections = fs.readdirSync(path.join(root, 'sections'))
    .filter((file) => file.endsWith('.json'))
    .map((file) => JSON.parse(fs.readFileSync(path.join(root, 'sections', file), 'utf8')));
  const sample = new Map();
  for (const book of manifest.books.filter((book) => book.chapters?.length)) {
    const available = sections.filter((section) => section.book === book.id);
    if (!available.length) continue;
    const first = available.find((section) => section.chapter === book.chapters[0].key && section.slug === book.chapters[0].sections[0]?.slug);
    if (first) sample.set(sectionUrl(first), first);
    for (const pattern of [/<table\b/gi, /<pre\b/gi, /<img\b/gi]) {
      const richest = [...available].sort((a, b) =>
        (b.html.match(pattern) || []).length - (a.html.match(pattern) || []).length)[0];
      if (richest) sample.set(sectionUrl(richest), richest);
    }
  }
  const failures = [];
  for (const url of sample.keys()) {
    const result = await inspect(page, url);
    if (result.width > result.viewport + 2) failures.push({ url, ...result });
  }
  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
});

test('mobile readers start at the lesson, with usable contents and working header menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ['hello-algo', 'missing-semester', 'postgres-internals', 'go-tour']) {
    const section = manifest.sections.find((section) => section.book === id);
    await page.goto(sectionUrl(section));
    const heading = page.locator('.reader-sheet > h1');
    await expect(heading).toBeVisible();
    expect((await heading.boundingBox()).y).toBeLessThan(400);
    const contents = page.getByRole('complementary', { name: 'فهرس الكتاب' });
    await expect(contents).not.toBeVisible();
    const toggle = page.getByRole('button', { name: 'فهرس الكتاب', exact: true });
    expect((await toggle.boundingBox()).height).toBeGreaterThanOrEqual(44);
    await toggle.click();
    await expect(contents).toBeVisible();
    const box = await contents.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
    await page.keyboard.press('Escape');
    await expect(contents).not.toBeVisible();
    await expect(toggle).toBeFocused();
  }
  await page.getByRole('button', { name: 'فتح القائمة' }).click();
  await expect(page.locator('.press-nav--open')).toBeVisible();
  await page.locator('.press-nav--open').getByRole('link', { name: 'خارطة التعلّم' }).click();
  await expect(page).toHaveURL(/\/path\/?$/);
});

test('mobile rich tables and code remain scrollable, with readable dark-theme content', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(`${base}/book/db-design/chapter-12/index/`);
  const table = page.locator('.reader-content table').first();
  await expect(table).toBeVisible();
  expect(await table.evaluate((element) => ['auto', 'scroll'].includes(getComputedStyle(element).overflowX))).toBe(true);
  await page.goto(`${base}/book/missing-semester/command-line-environment/index/`);
  const pre = page.locator('.reader-content pre').first();
  expect(await pre.evaluate((element) => getComputedStyle(element).whiteSpace)).toBe('pre');
  await page.getByRole('button', { name: 'تبديل السمة' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(322);
});
