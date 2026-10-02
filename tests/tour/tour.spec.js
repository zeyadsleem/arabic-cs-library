import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { parse } from 'node-html-parser';

const base = '/arabic-cs-library';
const tour = (chapter, page = 1) => `${base}/book/go-tour/${chapter}/${page === 1 ? 'index' : `p${page}`}/`;

test('continue reading returns to the saved Go lesson with exactly one deployment prefix', async ({ page }) => {
  await page.goto(tour('basics', 6));
  await expect(page.locator('.reader-sheet > h1')).toHaveText('نتائج متعددة');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('arabic-cs-library:last-read') || 'null')?.slug)).toBe('p6');
  await page.goto(`${base}/`);
  const resume = page.locator('.continue-card').getByRole('link', { name: 'افتح الموضع' });
  await expect(resume).toHaveAttribute('href', `${base}/book/go-tour/basics/p6`);
  await resume.click();
  await expect(page.locator('.reader-sheet > h1')).toHaveText('نتائج متعددة');
  await expect(page.getByRole('textbox', { name: 'محرر شيفرة Go' })).toBeVisible();
  await page.reload();
  await expect(page.locator('.reader-sheet > h1')).toHaveText('نتائج متعددة');
  await page.goto(`${base}/book/go-tour/`);
  await page.getByRole('link', { name: /تابع من حيث توقّفت/ }).click();
  await expect(page.locator('.reader-sheet > h1')).toHaveText('نتائج متعددة');
});

test('previously published Tour URLs redirect to the matching book lesson', async ({ page }) => {
  await page.goto(`${base}/tour/#basics/6`);
  await expect(page).toHaveURL(tour('basics', 6));
  await expect(page.locator('.reader-sheet > h1')).toHaveText('نتائج متعددة');
});

/** Open a Tour page and wait for its editor, which loads on demand. */
async function openTour(page, chapter, index = 1) {
  await page.goto(tour(chapter, index));
  const editor = page.getByRole('textbox', { name: 'محرر شيفرة Go' });
  await expect(editor).toBeVisible({ timeout: 20_000 });
  return editor;
}

test('tour is a book in the catalogue with cover, facts and table of contents', async ({ page }) => {
  await page.goto(`${base}/`);
  const card = page.locator('.book-card', { hasText: 'جولة Go التفاعلية بالعربي' });
  await expect(card).toBeVisible();
  await card.click();
  await expect(page).toHaveURL(`${base}/book/go-tour/`);
  await expect(page.getByRole('heading', { name: 'جولة Go التفاعلية بالعربي', level: 1 })).toBeVisible();
  await expect(page.locator('.toc-chapter')).toHaveCount(7);
  await expect(page.locator('.toc-sections a')).toHaveCount(103);
  await page.locator('.toc-sections a', { hasText: 'الحزم' }).first().click();
  await expect(page.locator('.editor-host .cm-content')).toBeVisible({ timeout: 20_000 });
});

test('run, format, restore and per-lesson edits survive reload', async ({ page }) => {
  // The direct upstream is blocked: the same-origin gateway must still work.
  await page.route('https://play.golang.org/**', (route) => route.abort('failed'));
  await page.route('**/api/go/**', (route) => route.abort('failed'));
  const editor = await openTour(page, 'basics', 1);
  await editor.fill('package main; import "fmt"; func main(){fmt.Println("مرحبا من الاختبار")}');
  await editor.press('Shift+Enter');
  await expect(page.locator('.output-panel')).toContainText('مرحبا من الاختبار', { timeout: 40_000 });
  await editor.press('Control+Enter');
  await expect(page.getByRole('status')).toContainText('تم التنسيق', { timeout: 40_000 });
  await expect(editor).toContainText('func main()');
  await page.getByRole('link', { name: 'التالي' }).first().click();
  await expect(page).toHaveURL(tour('basics', 2));
  await page.goBack();
  await page.waitForURL(tour('basics', 1));
  await expect.poll(() => editor.innerText(), { timeout: 30_000 }).toContain('مرحبا من الاختبار');
  await page.reload();
  await expect.poll(() => editor.innerText(), { timeout: 30_000 }).toContain('مرحبا من الاختبار');
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'استعادة الأصل', exact: true }).click();
  await expect(editor).toContainText('rand.Intn');
});

test('compiler errors, image output and an unreachable service are explained', async ({ page }) => {
  await openTour(page, 'basics', 3);
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.locator('.output-panel .error')).toContainText('pi', { timeout: 30_000 });

  const editor = await openTour(page, 'moretypes', 18);
  await editor.fill('package main\nimport ("image"; "golang.org/x/tour/pic")\nfunc main(){pic.ShowImage(image.NewRGBA(image.Rect(0,0,10,10)))}');
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.getByAltText('الصورة التي أنتجها برنامج Go')).toBeVisible({ timeout: 40_000 });

  await page.route('**/go-browser/interpreter.wasm', (route) => route.abort('failed'));
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.locator('.output-panel .error')).toBeVisible({ timeout: 40_000 });
});

test('reading area is the larger pane, the code pane is resizable and code never moves', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const editor = await openTour(page, 'flowcontrol', 8);
  const lesson = page.locator('.lesson-text');
  const pane = page.locator('#lesson-code-pane');
  const lessonBox = await lesson.boundingBox();
  const paneBox = await pane.boundingBox();
  expect(lessonBox.width).toBeGreaterThan(paneBox.width);

  const source = JSON.parse(readFileSync(new URL('../../src/lib/tour/source.json', import.meta.url), 'utf8'));
  const original = parse(source.flowcontrol.Pages[7].Content);
  await expect(page.locator('.lesson-text > p')).toHaveCount(original.querySelectorAll('p').length);
  await expect(page.locator('.lesson-text > pre')).toHaveCount(original.querySelectorAll('pre').length);
  await expect(page.locator('.lesson-text')).toContainText('نيوتن');
  await expect(page.locator('.lesson-text pre').first()).toHaveText('z -= (z*z - x) / (2*z)');
  await expect(page.locator('.lesson-text > p a[href="https://go.dev/pkg/math/#Sqrt"]')).toHaveText('math.Sqrt');
  // The syntax-highlighting sentence was removed because our interface has no such button.
  await openTour(page, 'welcome', 1);
  await expect(page.locator('.lesson-text')).toContainText('gofmt');
  await expect(page.locator('.lesson-text')).not.toContainText('تلوين الشيفرة');
  await expect(page.locator('.lesson-text a[data-tour-action="syntax"]')).toHaveCount(0);
  await openTour(page, 'flowcontrol', 8);

  const before = await editor.innerText();
  const divider = page.getByRole('slider', { name: 'تغيير عرض المحرر' });
  await divider.focus();
  await divider.press('ArrowRight');
  await expect.poll(async () => (await pane.boundingBox()).width).toBeGreaterThan(paneBox.width);
  await divider.press('ArrowRight');
  await expect.poll(async () => (await pane.boundingBox()).width).toBeGreaterThan(paneBox.width + 10);
  // Dragging toward the reading pane shrinks the code pane again.
  const grab = await divider.boundingBox();
  await page.mouse.move(grab.x + grab.width / 2, grab.y + 20);
  await page.mouse.down();
  await page.mouse.move(grab.x + grab.width / 2 - 120, grab.y + 20, { steps: 10 });
  await page.mouse.up();
  await expect.poll(async () => (await pane.boundingBox()).width).toBeLessThan(paneBox.width * 1.1);
  await expect.poll(() => editor.innerText()).toBe(before);
  await expect.poll(() => page.locator('.editor-host .cm-line span').first().evaluate((span) => getComputedStyle(span).color !== getComputedStyle(span.parentElement).color)).toBe(true);
});

test('collapsed contents, independent lesson scrolling, English accordion and RTL dragging', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openTour(page, 'flowcontrol', 8);
  await expect(page.getByRole('complementary', { name: 'فهرس الكتاب' })).not.toBeVisible();
  await page.getByRole('button', { name: 'فهرس الكتاب', exact: true }).click();
  await expect(page.getByRole('complementary', { name: 'فهرس الكتاب' })).toBeVisible();
  await page.getByRole('button', { name: 'إغلاق الفهرس' }).click();
  const pane = page.locator('#lesson-code-pane');
  const before = await pane.boundingBox();
  await page.locator('.lesson-text').evaluate((element) => { element.scrollTop = 150; });
  const after = await pane.boundingBox();
  expect(after.y).toBe(before.y);
  const accordion = page.locator('.original-accordion');
  await accordion.locator('summary').click();
  await expect(accordion.locator('.original-content')).toContainText('Newton');
  const divider = page.getByRole('slider', { name: 'تغيير عرض المحرر' });
  const grab = await divider.boundingBox();
  const width = (await pane.boundingBox()).width;
  await page.mouse.move(grab.x + grab.width / 2, grab.y + 20);
  await page.mouse.down();
  await page.mouse.move(grab.x + grab.width / 2 + 70, grab.y + 20, { steps: 8 });
  await page.mouse.up();
  expect((await pane.boundingBox()).width).toBeGreaterThan(width);
  await expect(page.locator('body')).not.toContainText('التشغيل والتنسيق يتمّان عبر Go Playground');
});

test('browser runtime supports channels and can terminate an infinite loop without freezing the page', async ({ page }) => {
  await page.route('**/api/go/**', (route) => route.abort());
  await page.route('https://play.golang.org/**', (route) => route.abort());
  const editor = await openTour(page, 'concurrency', 2);
  await editor.fill('package main\nimport "fmt"\nfunc main(){c:=make(chan int);go func(){c<-42}();fmt.Println(<-c)}');
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.locator('.output-panel')).toContainText('42', { timeout: 30_000 });
  await editor.fill('package main\nfunc main(){for {}}');
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await page.getByRole('button', { name: 'إلغاء', exact: true }).click();
  await expect(page.locator('.output-panel')).toContainText('أُلغي التنفيذ');
  await editor.fill('package main\nimport "fmt"\nfunc main(){fmt.Println("recovered")}');
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.locator('.output-panel')).toContainText('recovered', { timeout: 30_000 });
});

test('browser runtime reports generics support accurately', async ({ page }) => {
  await openTour(page, 'generics', 1);
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.locator('.output-status')).not.toContainText('جارٍ', { timeout: 30_000 });
  await expect(page.locator('.output-panel .error')).toHaveCount(0);
  await expect(page.locator('.output-panel')).toContainText('2');
  await expect(page.locator('.output-panel')).toContainText('-1');
});

test('Tour helper packages work in the browser without external compilation', async ({ page }) => {
  await page.route('**/api/go/**', (route) => route.abort());
  await page.route('https://play.golang.org/**', (route) => route.abort());
  const editor = await openTour(page, 'moretypes', 23);
  await editor.fill(`package main
import ("strings"; "golang.org/x/tour/wc"; "golang.org/x/tour/reader"; "golang.org/x/tour/tree"; "fmt")
type MyReader struct{}
func (MyReader) Read(b []byte)(int,error){for i:=range b {b[i]='A'};return len(b),nil}
func count(t *tree.Tree) int {if t==nil{return 0};return 1+count(t.Left)+count(t.Right)}
func main(){
 wc.Test(func(s string)map[string]int {m:=map[string]int{};for _,w:=range strings.Fields(s){m[w]++};return m})
 reader.Validate(MyReader{})
 fmt.Println("tree nodes:",count(tree.New(1)))
}`);
  await page.getByRole('button', { name: '▶ تشغيل' }).click();
  await expect(page.locator('.output-panel')).toContainText('tree nodes: 10', { timeout: 30_000 });
  await expect(page.locator('.output-panel')).toContainText('PASS');
  await expect(page.locator('.output-panel')).toContainText('OK!');
  await expect(page.locator('.output-panel .error')).toHaveCount(0);
});

test('layout stays inside the viewport and reads without JavaScript links', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await openTour(page, 'methods', 1);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await expect(page.locator('.reader-bar__book')).toHaveText('جولة Go التفاعلية بالعربي');
});
