---
title: "الاختبارات عبر المتصفحات مع Playwright (Cross-Browser Tests with Playwright)"
lang: ar
source: "https://stevekinney.com/courses/testing/cross-browser-testing-with-playwright"
---

لنتحدث عن الاختبار عبر المتصفحات، لأننا لنكن صادقين، احتمال أن يستخدم تطبيقك نسخة Chrome الأحدث فقط طوال الوقت يقارب احتمال إنهاء يوم جمعة دون الاصطدام بـ*تعارض دمج* واحد على الأقل. لديك مستخدمون بإعدادات مختلفة — Safari وFirefox وEdge، وربما حتى IE11 (مقرف).

لنستكشف طريقة سريعة وعملية لإعداد الاختبار عبر المتصفحات حتى تتعامل مع غرائب المتصفحات دون النقر بغضب إلى النسيان.

## تثبيت Vitest مع Playwright

لاختبار تطبيق عبر متصفحات متعددة، نحتاج إلى أداة أتمتة متصفح بلا واجهة (headless) لمحاكاتها. سنستخدم **Playwright** لأنه يتيح تشغيل الاختبارات في متصفحات مختلفة مثل Chrome (أو شقيقه الخجول Chromium) وFirefox وWebKit (يغطي Safari). أفضل جزء؟ يتصل مباشرة بإعداد Vitest لديك.

أولًا، تحتاج إلى جعل Vitest وPlaywright يعملان في وئام كوني:

```bash
npm install vitest @playwright/test
```

يمنحك ذلك وصولًا إلى متصفحات Playwright المؤتمتة داخل Vitest. مثل زبدة الفول السوداني والمربى، لكن لاختبار JavaScript.

## تهيئة Vitest لـ Playwright

التالي: إدارة بيئات المتصفح مع Vitest. ومع ذلك، قبل أن نقفز، لنعدّ تهيئة Playwright. أنشئ ملف `playwright.config.ts` في الدليل الجذري:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    port: 3000,
  },
  use: {
    browserName: 'chromium', // default browser, we'll override this in our tests
    headless: true, // no need to pop open an actual browser tab
  },
});
```

تأكد من أن خادمك المحلي يعمل على المنفذ 3000. يمكنك تغيير ذلك حسب إعدادك. تهيئة Playwright المدمجة مفيدة جدًا هنا لأنها تعرف كيفية التحكم في إعدادات المتصفح.

## كتابة اختبار عبر المتصفحات

الآن، لنكتب اختبار ميزة ونشغّله عبر مجموعة متصفحات.

أولًا، في ملف اختبارك، استورد ما نحتاجه للاختبار المؤتمت:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Cross-browser button test', () => {
  test('should render a button in Chromium', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const button = await page.locator('button');
    await expect(button).toHaveText('Submit');
  });

  test('should render a button in Firefox', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const button = await page.locator('button');
    await expect(button).toHaveText('Submit');
  });

  test('should render a button in WebKit', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const button = await page.locator('button');
    await expect(button).toHaveText('Submit');
  });
});
```

يمكنك أن تتفنن أكثر في هذا، لكننا نحاول إبقاءه بسيطًا الآن. هنا، يجبر Vitest كروم (عبر `chromium`) وFirefox وWebKit (مرحبًا Safari!) على الذهاب إلى `localhost:3000` والتحقق من وجود زر مكتوب عليه «Submit». إنه مثل تسجيل حضور لكل المتصفحات الرئيسية.

## تشغيل الاختبارات {#running-the-tests}

لبدء اختباراتك، أنشئ سكربتًا بسيطًا في `package.json`:

```json
"scripts": {
  "test:e2e": "vitest run"
}
```

ثم شغّل السكربت بـ:

```bash
npm run test:e2e
```

سيطلق Vitest سكربتات Playwright، ويحضر متصفحات افتراضية، ويشغّل الاختبارات. لا تنبثق المتصفحات فعليًا على شاشتك لأننا في وضع `headless`، لكن ثق بي — إنها تقوم بالعمل الشاق في الخلفية.

## اختبر في متصفحات متعددة في الوقت نفسه

إذا كنت تفضّل **اختبار متصفحات متعددة على التوازي**، يمكنك تعديل الصياغة بحلقات أو ميزة `projects` في Playwright. يستطيع Playwright تشغيل الاختبارات عبر متصفحات متعددة مثل ساحر متعدد المهام، دون أن يجعلك تحرق دورات دماغية إضافية:

```typescript
test.use({ browserName: 'webkit' });
test('webkit test', async ({ page }) => {
  await page.goto('https://example.com');
  // Your test here for WebKit
});
test.use({ browserName: 'firefox' });
test('firefox test', async ({ page }) => {
  await page.goto('https://example.com');
  // Your test here for Firefox
});
```

هذا يتنقل بكفاءة عبر اختبارات المتصفحات فلا تزدحم `test.describe` لديك.

## خاتمة

الشيء الرائع هو أن Vitest يتيح لـ Playwright القيام بمعظم العمل الشاق، بتشغيل تطبيقك داخل المتصفحات المحاكاة بأقل إعداد. لا تحصل على تغذية راجعة أسرع فحسب، بل لديك أيضًا تغطية جدية عبر المتصفحات الرئيسية دون تثبيت نصف دستة من الأجهزة الافتراضية أو الاحتفاظ بنسخة قديمة من IE.

هل ما زال الاختبار عبر المتصفحات مؤلمًا؟ آه، قليلًا. لكن على الأقل لدينا الأدوات التي تساعد في جعله مؤلمًا *بالقدر الكافي*.
