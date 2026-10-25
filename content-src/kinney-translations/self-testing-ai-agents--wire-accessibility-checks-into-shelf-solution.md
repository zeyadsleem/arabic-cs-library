---
title: "الحل"
---

يشحن هذا المختبر ملفين. أحدهما مواصفة Playwright تشغّل axe-core على مسارات Shelf الأعلى إشارة. والآخر قائمة تحقّق markdown من خمسة بنود للأمور التي لا يستطيع الماسح إثباتها. معًا، يحوّلان «نحن نهتم بإمكانية الوصول» إلى «انحدارات إمكانية الوصول تكسر البناء». وهذا هو المقصود كله.

## ما يجب إضافته

### الاعتماد

قد يكون `@axe-core/playwright` موجودًا بالفعل في `devDependencies`. إن لم يكن، فأضفه:

```bash
npm install -D @axe-core/playwright
```

اعتماد واحد. لا كلفة وقت تشغيل في الإنتاج. ولا كرنفال إضافات.

### المواصفة: `tests/accessibility.spec.ts`

إليك نسخة أولى نظيفة تطابق شكل بادئة Shelf الحالية:

```typescript
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const expectNoViolations = async (page: Page): Promise<void> => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations).toEqual([]);
};

test('home page has no automated accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoViolations(page);
});

test('login page has no automated accessibility violations', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoViolations(page);
});

test('design-system page has no automated accessibility violations', async ({ page }) => {
  await page.goto('/design-system');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoViolations(page);
});
```

ثلاثة أمور تهمّ هنا.

أولًا: هذه مسارات عامة. وهذا متعمد. البادئة الحالية لديها بالفعل حلقة Playwright عامة، لذا تنزل هذه المواصفة مباشرة في `tests/` وتبدأ في دفع إيجارها فورًا. يمكنك إضافة المسارات المصادَقة لاحقًا عندما تكون مختبرات حالة التخزين ومساعد التهيئة في مكانها. لا تجعل أول تمريرة لإمكانية الوصول أصعب مما تحتاج.

ثانيًا: كل اختبار ينتظر عنصرًا حقيقيًا قبل تشغيل axe. يعمل الفحص على DOM الحالي، لذا فإن إطلاقه فورًا بعد `goto()` هو الطريق إلى تدقيق حالة تحميل وتسميتها موقعًا. انتظار `h1` رخيص وصادق.

ثالثًا: `.withTags(['wcag2a', 'wcag2aa'])` يحصر الفحص في القواعد التي تحتاجها معظم الفرق فعلًا كبوابة. جلب كل قاعدة في axe من البداية هو كيف تحوّل فحصًا نافعًا إلى محرك اقتراحات لا يثق به أحد.

إن كنت قد بنيت مشروع المصادقة من مختبرات المصادقة السابقة، فوسّع الملف بفحص `/shelf`. عندئذٍ يكون النمط نفسه: أعد تهيئة الرف، وانتقل إلى `/shelf`، وانتظر العنوان مع مقالة واحدة مهيأة، ثم شغّل الفحص. المهم أن المسارات العامة تأتي أولًا لأن البادئة الحالية تستطيع تشغيلها فورًا.

### قائمة التحقّق: `docs/accessibility-smoke-checklist.md`

```markdown
# Accessibility smoke checklist

Run this manually after any UI change that touches a dialog, form,
or navigation flow. The automated axe scan in `tests/accessibility.spec.ts`
covers what a scanner can prove — this file covers what it cannot.

- Can every interactive control on the critical routes be reached with `Tab`
  and `Shift+Tab` in a sensible order?
- When a dialog opens, does focus move into it, and does it return to the
  triggering control when the dialog closes?
- Can a keyboard-only user submit the primary forms (login, search, rating)
  without touching the mouse?
- Are validation errors announced in text as well as color, and associated
  with their fields via `aria-describedby`?
- Do status toasts (`role="status"` / `aria-live="polite"`) actually announce
  in a screen reader when they appear?
```

خمسة فحوصات. كل واحد يسمّي تفاعلًا ملموسًا وشرط نجاح ملموسًا. لا يمكن إثبات أي منها بـ axe-core وحده، ولهذا توجد القائمة.

لاحظ الصياغة في المقدمة: «فحص axe الآلي يغطي ما يستطيع الماسح إثباته — وهذا الملف يغطي ما لا يستطيع». تلك الجملة تؤدي عملًا حقيقيًا. إنها تمنع الناس من اعتبار القائمة زائدة عن المواصفة.

### الصلة بـ CLAUDE.md

ينبغي أن يسمّي ملف التعليمات كلا الأثرين صراحة:

```markdown
## Accessibility

- Run `tests/accessibility.spec.ts` after any meaningful UI change. Treat
  new axe violations as blocking.
- Complex UI flows (dialogs, menus, keyboard navigation) also get a
  manual pass through `docs/accessibility-smoke-checklist.md`.
- Suppressions must be scoped narrowly with a written reason in code.
```

بلا هذا، تبقى المواصفة مجرد ملف آخر قد يلاحظه الوكيل أو لا يلاحظه. لا تُغلق الحلقة إلا عندما تخبر التعليمات الوكيل أن الفحص موجود ومتى يشغّله.

## ما ما زلت بحاجة إلى تشغيله

تأكد من الاعتماد:

```bash
grep '@axe-core/playwright' package.json
```

تأكد من وجود الملفين:

```bash
ls tests/accessibility.spec.ts
ls docs/accessibility-smoke-checklist.md
```

شغّل المواصفة مباشرة:

```bash
npx playwright test tests/accessibility.spec.ts
```

أو شغّلها عبر المجموعة الرئيسية:

```bash
npm run test -- tests/accessibility.spec.ts
```

إن أضفت لاحقًا فحص `/shelf` المصادَق، فتأكد من أنه ما زال يعمل عبر الحلقة الرئيسية نفسها بدلًا من أن يتحول إلى طقس منفرد لا يتذكره أحد.

## أنماط تستحق الاحتفاظ بها

- ابدأ بمسارات تستطيع البادئة الحالية تشغيلها فورًا. الصفحات العامة أولًا، والصفحات المصادَقة عندما توجد حلقة المصادقة.
- افحص بعد التصيير، لا بعد الانتقال. يجب أن يكون DOM الذي تدققه هو DOM الذي يراه المستخدم.
- احصر مجموعة القواعد. `wcag2a` و`wcag2aa` هما الافتراضي الصحيح لبوابة موثوقة.
- وثّق الفجوة. يلتقط Axe فئة من المشكلات، لا المشكلة كلها.
- سمّ الملفات في `CLAUDE.md`. اختبار لا يشغّله الوكيل أبدًا ليس بوابة.

## قراءات إضافية

- [مختبر: توصيل فحوصات إمكانية الوصول إلى Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-accessibility-checks-into-shelf)
- [إمكانية الوصول كبوابة جودة](https://stevekinney.com/courses/self-testing-ai-agents/accessibility-as-a-quality-gate)
