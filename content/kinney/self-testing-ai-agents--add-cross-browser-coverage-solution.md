---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/add-cross-browser-coverage-solution"
---

الهدف هنا ليس «شغّل كل شيء في كل مكان». الهدف هو «شغّل الاختبارات الصحيحة على المتصفحات الصحيحة دون أن تجعل الحلقة الافتراضية بائسة». بادئة Shelf الحالية صغيرة بما يكفي ليبقى هذا بسيطًا إن أبقيت الفصل صادقًا.

## ما يجب إضافته

### تعريفات المشاريع في `playwright.config.ts`

الشكل الأدنى المستهدف ثلاثة مشاريع:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-smoke',
      grep: /@cross-browser/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit-smoke',
      grep: /@cross-browser/,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

Chromium هو المشغّل اليومي الافتراضي. Firefox وWebKit مشروعا دخان اختياريان يشغّلان فقط الاختبارات الموسومة `@cross-browser`.

`grep` على مستوى المشروع هو الحيلة كلها. إنه يُبقي المتصفحات البديلة صادقة دون تحويل كل تشغيل اختبار محلي إلى حدث ثلاثي المتصفحات. إن أضفت لاحقًا مشاريع `setup` أو `authenticated` من مختبرات المصادقة، فأبقِها في حلقة Chromium ما لم يكن لديك سبب محدد لتوسيعها.

### مجموعة الدخان الفرعية

وسّم المجموعة الصغيرة من الاختبارات التي تستحق تغطية عبر المتصفحات. ملف البادئة `tests/smoke.spec.ts` هو الهدف الأول البديهي:

```typescript
import { expect, test } from '@playwright/test';

test('home page renders', { tag: '@cross-browser' }, async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('login page renders', { tag: '@cross-browser' }, async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
```

أبقِ هذه المجموعة صغيرة. المجموعة الفرعية للدخان مفترض أن تثبت أن التطبيق يعمل أساسًا في المتصفحات البديلة، لا أن تعيد تشغيل المجموعة كلها لأن أحدهم أصبح طموحًا يوم جمعة.

### سكربتات `package.json`

الفصل في السكربتات يهم بقدر الفصل في المشاريع:

```json
{
  "scripts": {
    "test": "playwright test --project=chromium",
    "test:cross-browser": "playwright test --grep @cross-browser --project=chromium --project=firefox-smoke --project=webkit-smoke"
  }
}
```

يبقى `npm run test` سريعًا ومملًا. و`npm run test:cross-browser` هو الحلقة الأوسع المتعمدة. لا تدمجهما في أمر واحد إن كنت لا تستمتع بالانتظار لـ Firefox وWebKit في كل مرة تغيّر فيها نص زر.

قبل أن تستطيع تشغيل الحلقة الأوسع محليًا، ثبّت المتصفحات الإضافية:

```bash
npx playwright install --with-deps firefox webkit
```

تثبيت Playwright الافتراضي هو Chromium. ولهذا تظهر خطوة تثبيت المتصفحات في CI أيضًا. ما يعمل على حاسوبك لأنك شغّلته مرة قبل ستة أشهر لا يساعد منفّذًا جديدًا.

### توصيل سير العمل الليلي

بمجرد وجود الأمر ونزول مختبر سير العمل الليلي، تصبح مهمة الليل صغيرة. إليك الشكل الذي تستهدفه:

```yaml
cross-browser-smoke:
  name: Cross-browser smoke
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: '24'
    - name: Install dependencies
      run: npm ci --ignore-scripts
    - name: Install Playwright browsers
      run: npx playwright install --with-deps firefox webkit
    - name: Create .env for preview server
      run: |
        cat > .env <<'EOF'
        DATABASE_URL=file:./ci.db
        OPEN_LIBRARY_BASE_URL=https://openlibrary.org
        EOF
    - name: Run cross-browser smoke tests
      run: npm run test:cross-browser
    - name: Upload Playwright report
      if: failure()
      uses: actions/upload-artifact@v7
      with:
        name: cross-browser-smoke-report
        path: playwright-report/
        retention-days: 7
```

تفصيلان حاملان.

أولًا: `DATABASE_URL=file:./ci.db` يُبقي تهيئة المعاينة في ملف واحد داخل مجلد العمل — بلا مراسم مجلد إضافي لمجرد تشغيل خادم المعاينة.

ثانيًا: اسم مخرج التقرير محدد. عندما يفشل فحص ليلي، تريد أن يُقرأ الفشل كـ «فشل دخان المتصفحات المتعددة»، لا «هناك مخرج ما في مكان ما، حظًا سعيدًا».

## ما ما زلت بحاجة إلى تشغيله

ثبّت المتصفحات الإضافية مرة واحدة:

```bash
npx playwright install --with-deps firefox webkit
```

شغّل الحلقة السريعة:

```bash
npm run test
```

شغّل حلقة الدخان الأوسع:

```bash
npm run test:cross-browser
```

ثم اكسر شيئًا عمدًا في أحد اختبارات الدخان الموسومة وأعد تشغيل `npm run test:cross-browser`. ينبغي أن يخبرك المخرج بوضوح أي مشروع فشل: `chromium` أو `firefox-smoke` أو `webkit-smoke`. إن لم يكن الفشل خاصًا بمتصفح في المخرج، فأسماء مشاريعك أو تقاريرك غامضة أكثر من اللازم.

## المحلي مقابل المستضاف

**محليًا:** الإعداد والوسوم والسكربتات كلها قابلة للتحقق بالكامل الآن. يمكنك إثبات أن Chromium يبقى سريعًا وأن أمر الدخان الأوسع يتوزع على ثلاثة مشاريع.

**مستضافًا:** التشغيل الليلي المجدول ما زال يحتاج GitHub Actions على مستودع حقيقي. حتى ذلك الحين، `workflow_dispatch` هو أسهل طريقة لإثبات شكل سير العمل دون انتظار صباح الغد.

## أنماط تستحق الاحتفاظ بها

- أسماء المشاريع الصريحة تحمي الحلقة السريعة. `chromium` للعمل اليومي، و`firefox-smoke` و`webkit-smoke` للفحص الأوسع.
- الوسوم تتفوق على حيل المسارات هنا. يمكن لمواصفة الدخان نفسها أن تبقى في `tests/` وتختار التغطية الأوسع بـ `@cross-browser`.
- تثبيت المتصفح خطوة صريحة. عمل Chromium محليًا لا يعني أن Firefox وWebKit موجودان في أي مكان آخر.
- أسماء المخرجات والمشاريع جزء من تجربة التنقيح. مهمة ليلية حمراء ينبغي أن تخبرك بالفعل أي متصفح غير راضٍ.

## قراءات إضافية

- [مختبر: إضافة تغطية عبر المتصفحات](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage)
- [التحقّق عبر المتصفحات دون حرق حلقة التطوير](https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop)
