---
title: "الحل: إعادة هيكلة تجهيزات Shelf"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/refactor-shelf-fixtures-solution"
---

الحل التالي من الدورة نقطة وصول معقولة واحدة. وقد تبدو نسختك مختلفة — فالمختبر يُقيّم جودة قراراتك، لا تطابقًا حرفيًا بايتًا ببايت. وما يلي سرد لكيفية انتقالي من `fixtures.ts` إلى شكل نهائي أنظف، إيداعًا تلو الآخر.

هذا المختبر يقع الآن بعد درس الزرع الحتمي عن قصد. فلا تصبح إعادة الهيكلة حقيقية إلا حين يوجد `tests/helpers/seed.ts` وتعمل `resetShelfContent()` فعلًا.

إن كنت قد أنهيت المختبر بالفعل وتريد المقارنة، فمرّر إلى [الملف النهائي](#the-final-file) في الأسفل.

## الإيداع 1: أعد تسمية كل شيء

أولًا، الأسماء. `setupUser` تصف ما *تفعله* التجهيزة (تعدّ مستخدمًا)؛ و`seededReader` تصف ما *توفّره* التجهيزة (القارئ الذي جرى زرعه). وكانت `setupEmptyShelf` و`setupShelfWithBooks` تكذبان على القارئ — فكلتاهما تستدعي `resetShelfContent`، والأداة المساعدة للزرع التي بنيتها سابقًا تضع Station Eleven وPiranesi على الرف *دائمًا*. ولا واحدة منهما توفّر رفًا فارغًا. فادمجهما في `seededShelf` واحدة.

```typescript
// Before:
setupUser: async ({}, use) => {
  await use({ email: 'alice@example.com' });
},

setupEmptyShelf: async ({ request }, use) => {
  await resetShelfContent();
  await use(request);
},

setupShelfWithBooks: async ({ request }, use) => {
  await resetShelfContent();
  await use(request);
},
```

```typescript
// After:
seededReader: async ({}, use) => {
  await use({ email: 'alice@example.com', name: 'Alice Reader' });
},

seededShelf: async ({ request }, use) => {
  await resetShelfContent();
  await use(request);
  await resetShelfContent();
},
```

حدّث تفكيكات معاملات المواصفة لتطابق ذلك: تصبح `setupUser` هي `seededReader`، وتصبح كل من `setupEmptyShelf` و`setupShelfWithBooks` هي `seededShelf`. وادمج الاختبارين اللذين استخدما اسمين مختلفين للتجهيزة نفسها في اختبار واحد، أو أبقِهما منفصلين — القرار لك. أنا أبقيتهما منفصلين لأن التحققات التي يفحصانها مختلفة.

شغّل المواصفة. ما زالت تنجح. أودِع.

## الإيداع 2: أضف التفكيك للتجهيزات المغيّرة للحالة

لاحظ `await resetShelfContent()` الجديد *بعد* `await use(request)` في `seededShelf`. هذا هو نصف التفكيك. لم تكن الحالة الابتدائية تحتوي عليه. وكان الاختبار ينجح بدونه، لأن الاختبار التالي في الملف الابتدائي كان يستدعي `resetShelfContent` أيضًا، وأداة الزرع عديمة الأثر عند التكرار. لكن لحظة أن تضيف اختبارًا جديدًا *لا* يستدعيها، يصبح التسريب مرئيًا.

القاعدة من الدرس: كل تجهيزة تغيّر الحالة لها نصف تفكيك، وهو دائمًا مسبوق بـ`await`. صفر استثناءات. وإن وُجد التفكيك لكن بلا `await`، فـ Playwright يظن أن التجهيزة انتهت فيتسابق مع إعداد الاختبار التالي.

أودِع التفكيك.

## الإيداع 3: أنزل رتبة الأدوات المساعدة

كانت `authedPage` كذبة. كانت تقول «ها هي صفحة موثَّقة»، لكن بحلول وصولك إلى هذا المختبر يفترض أن تكون لديك بالفعل تهيئة Playwright موثَّقة افتراضية لصفحات Shelf المحمية — عادةً حالة تخزين من دروس المصادقة السابقة. وكانت التجهيزة تنتقل إلى `/shelf` وتتحقق من المسار، وهذا ليس تجهيزة — بل سطرا شيفرة. احذفها، وضع الانتقال مباشرةً في المواصفة.

وكانت `loggedOutPage` مشكلة مختلفة. كانت تجهيزة حقيقية (تبني سياق متصفح جديدًا)، لكنها استُخدمت في اختبار واحد فقط، وكان تركيبها عسيرًا لأنها تصارع أي حالة متصفح موثَّقة افتراضية أعددتها بالفعل لتشغيل المختبر. فملف الحل ينقلها خارجًا كدالة مساعدة عادية ويترك التفكيك للمستدعي:

```typescript
// In fixtures.ts after the refactor:
export const openLoggedOutPage = async (browser: Browser) => {
  const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page = await context.newPage();
  return { page, context };
};
```

```typescript
// In the spec:
test('logged-out page is redirected to login when it asks for /shelf', async ({ browser }) => {
  const { page, context } = await openLoggedOutPage(browser);
  await page.goto('/shelf');
  await expect(page).toHaveURL(/\/login/);
  await context.close();
});
```

لاحظ المقايضة: الأداة المساعدة تعيد مسؤولية التفكيك إلى المستدعي، لأن التجهيزات وحدها تستطيع أن *تملك* التفكيك داخل دورة حياة Playwright. وإن نسيت `await context.close()`، فسينبّهك Playwright في نهاية التشغيل. ذلك التنبيه هو شبكة الأمان — ليست محكمة كتفكيك تجهيزة، لكنها مرئية.

شغّل المواصفة. ما زالت خضراء. أودِع.

## الإيداع 4: أضف تعليقات تبرير النطاق

قاعدة الدرس: كل تجهيزة لها تعليق من سطر واحد يسمّي اختيار النطاق وسببه. وهذا ما يقوله ملف الحل:

```typescript
// Test-scoped: the reader identity is a small, read-only value used
// across multiple labs. It's a constant right now; the fixture shape
// lets us swap in a different seeded user later without touching
// specs.
seededReader: async ({}, use) => { ... },

// Test-scoped: each test gets a freshly-seeded shelf. The teardown
// resets content on the way out, so any mutation this test made
// cannot leak into the next one via worker state.
seededShelf: async ({ request }, use) => { ... },
```

لا واحدة من التجهيزتين على مستوى العامل. وهذا هو الجواب الصادق. ولا واحدة منهما تحمل بيانات للقراءة فقط مكلفة بما يكفي لتستحق نطاقًا مشتركًا. والإغراء بجعل `seededShelf` على نطاق العامل حقيقي — سيكون أسرع — لكن كل اختبار في العامل سيرث عندئذٍ أي حالة خلّفها الاختبار السابق، وهذا بالضبط الخطأ الذي يريد الدرس منعك منه.

كتابة التبرير في تعليق هي طريقة جعل القرار مرئيًا للشخص التالي. (أي أنت المستقبلي، بعد ستة أشهر.)

## الملف النهائي {#the-final-file}

ملف `fixtures.ts` بعد إعادة الهيكلة هو تقريبًا هذا:

```typescript
import { test as base } from '@playwright/test';
import type { APIRequestContext, Browser } from '@playwright/test';
import { resetShelfContent } from '../../helpers/seed';

type SeededReader = {
  email: string;
  name: string;
};

type GoodFixtures = {
  seededReader: SeededReader;
  seededShelf: APIRequestContext;
};

export const test = base.extend<GoodFixtures>({
  // Test-scoped: see above.
  seededReader: async ({}, use) => {
    await use({ email: 'alice@example.com', name: 'Alice Reader' });
  },

  // Test-scoped: see above.
  seededShelf: async ({ request }, use) => {
    await resetShelfContent();
    await use(request);
    await resetShelfContent();
  },
});

export const openLoggedOutPage = async (browser: Browser) => {
  const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page = await context.newPage();
  return { page, context };
};

export { expect } from '@playwright/test';
```

خمس تجهيزات صارت تجهيزتين وأداة مساعدة واحدة. والملف أقصر. والقصد أوضح. والتفكيكات مسبوقة بـ`await`. واختيارات النطاق موثَّقة.

## ما ينبغي أن تشعر به

إن كانت نسختك مشابهة في *الشكل* ومختلفة في *التفاصيل* — أسماء تجهيزات مختلفة، وقرارات مختلفة حول أي أداة مساعدة تُنزَل رتبتها — فذلك صحيح تمامًا. لا توجد إعادة هيكلة صحيحة واحدة. توجد مجموعة مبادئ، وإما أن يحترمها ملفك أو لا يحترمها.

وما *لا* ينبغي أن تشعر به هو الرغبة في إضافة تجهيزات أكثر. فالدرس والمختبر كلاهما عن إزالة تعقيد التجهيزات، لا عن إضافته. فإن جعلت إعادة هيكلتك الملف أطول، فأنت تمضي في الاتجاه الخطأ.

## قراءات إضافية

- [التجهيزات: على مستوى العامل، وعلى مستوى الاختبار، والفخّ بينهما](https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped)
- [APIRequestContext فيما يتجاوز حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/api-request-context-beyond-storage-state) — الدرس التالي، الذي يبدأ من حيث انتهى مثال تركيب `authenticatedRequest` ويحوّله إلى نمط حقيقي لتبديل المستخدم في منتصف الاختبار.
