---
title: "الحل"
---

ميزانيات الأداء من تلك الأشياء التي تبدو بيروقراطية إلى أن تنقذك أول مرة. تُشحن إعادة هيكلة، فيتضاعف حجم الحزمة، ولا يلاحظ أحد ذلك أسبوعين، ثم يصبح الأمر «هذا هو حجم التطبيق فحسب». والهدف من هذا المختبر أن يجعل ذلك السيناريو مستحيلًا بتحويل الحجم والسرعة إلى أرقام يستطيع سكربت فرضها.

بادئ Shelf لا يتضمّن هذه الحلقة. أضف القطع أدناه أثناء المختبر، ثم شغّل الحلقة لتثبت أنها تعمل. ابدأ بتثبيت اعتماد بناء الإحصاءات:

```bash
npm install -D rollup-plugin-visualizer
```

## ما الذي تضيفه

### `performance-budgets.json`

```json
{
  "build": {
    "maxTotalGzipKilobytes": 110,
    "maxLargestChunkGzipKilobytes": 55
  },
  "runtime": {
    "shelfRouteDomContentLoadedMilliseconds": 800
  }
}
```

هذا هو المصدر الوحيد للحقيقة لكل عتبة. فسكربت البناء واختبار Playwright كلاهما يقرأ من هذا الملف. وذلك مقصود — إن أردت تشديد ميزانية أو تخفيفها، فتغيّر رقمًا واحدًا في مكان واحد. وعتبات البناء بالكيلوبايت بعد ضغط gzip لأن ذلك هو ما ينتقل فعلًا على الشبكة. وأما عتبة وقت التشغيل فهي سقف `domContentLoaded` بالمللي ثانية لمسار `/shelf`.

### `scripts/check-performance-budgets.mjs`

هذا هو نصف حلقة الميزانيات الخاص بوقت البناء. يقرأ `build/stats.json` (الذي يُخرجه `vite build` حين تضبط `BUNDLE_STATS=1`) و`performance-budgets.json`، ثم يسير في بنية الإحصاءات ليحسب أحجام حزمة العميل.

والجزء المثير هو كيف ينتقل من ملف الإحصاءات إلى أرقام gzip الفعلية. فملف JSON الخاص بإحصاءات Vite ينظّم البيانات في ثلاث خرائط مترابطة:

```javascript
const computeClientBundleSizes = (stats) => {
  const parts = stats.nodeParts ?? {};
  const metas = stats.nodeMetas ?? {};
  const bundleGzipByFile = new Map();

  for (const meta of Object.values(metas)) {
    for (const [bundleFile, uid] of Object.entries(meta.moduleParts ?? {})) {
      const part = parts[uid];
      if (!part) continue;
      const previous = bundleGzipByFile.get(bundleFile) ?? 0;
      bundleGzipByFile.set(bundleFile, previous + (part.gzipLength ?? 0));
    }
  }

  const clientEntries = Array.from(bundleGzipByFile.entries()).filter(([bundleFile]) =>
    bundleFile.startsWith(CLIENT_BUNDLE_PREFIX),
  );
  const totalClientGzipBytes = clientEntries.reduce((sum, [, bytes]) => sum + bytes, 0);
  const largestClientChunkBytes = clientEntries.reduce((max, [, bytes]) => Math.max(max, bytes), 0);

  return { totalClientGzipBytes, largestClientChunkBytes, clientEntries };
};
```

`nodeMetas` يربط كل وحدة مصدرية بـ`moduleParts` الخاصة بها — قاموس من اسم ملف الحزمة الناتج إلى معرّف فريد. وذلك المعرّف يُفهرَس في `nodeParts`، حيث يقيم `gzipLength` الفعلي. ويجمع السكربت بايتات gzip لكل ملف حزمة، ثم يرشّح إلى قطع جهة العميل فقط (أي شيء تحت `_app/immutable`). وحزم الخادم لا تهمّ للأداء الذي يراه المستخدم، فنتجاوزها.

وبعد حساب المجاميع، يقارن السكربت النتائج بملف الميزانيات ويخرج برمز غير صفري إن تجاوز شيء العتبة:

```javascript
const failures = [];
if (typeof totalBudget === 'number' && totalGzipKilobytes > totalBudget) {
  failures.push(
    `Total client bundle size ${formatKilobytes(totalClientGzipBytes)} kB gzip exceeds budget of ${totalBudget} kB`,
  );
}
```

رمز الخروج 1 يعني أن ميزانية تجاوزت. ورمز الخروج 2 يعني أن السكربت نفسه أخطأ (ملف مفقود، أو JSON سيئ). وهذا التمييز يهمّ حين توصّله بـCI — فالفشل بسبب ميزانية قرار سياسي، لا انهيار.

### `tests/performance.spec.ts`

هذا هو النصف الخاص بوقت التشغيل. يحمّل هذا الاختبار الميزانيات من ملف JSON نفسه، وينتقل إلى `/shelf`، ثم يقرأ توقيت المتصفّح الفعلي:

```typescript
const navigationTiming = await page.evaluate(() => {
  const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  if (!entry) return { domContentLoaded: 0 };
  return {
    domContentLoaded: entry.domContentLoadedEventEnd - entry.startTime,
  };
});

expect(navigationTiming.domContentLoaded).toBeLessThan(budgetMilliseconds);
```

`page.evaluate` يعمل داخل نسخة Chromium الفعلية، فأنت تقرأ بيانات `PerformanceNavigationTiming` حقيقية — لا بديلًا مُحاكى ولا وسيطًا. والفرق `domContentLoadedEventEnd - startTime` يمنحك الزمن من بداية الانتقال إلى اللحظة التي يكون فيها HTML قد حُلّل تحليلًا كاملًا ونُفِّذت فيه كل السكربتات المتزامنة. وهو لا ينتظر الصور ولا الوحدات المحمّلة بكسل، وهذا بالضبط ما تريده لبوابة من نوع «هل هذه الصفحة تفاعلية؟».

وقيمة الميزانية تأتي من `performance-budgets.json` نفسه، فلا يوجد رقم سحري مخبّأ في ملف الاختبار. وإن كانت نسخة Shelf الحالية لديك قد أضافت مشروع Playwright الموثَّق من درس حالة التخزين، فشغّل هذه المواصفة هناك. وإن لم تكن، فوجّه النسخة الأولى من الفحص إلى مسار عام ثم شدّدها حين توجد حلقة المصادقة.

## ما يبقى عليك تشغيله

### حلقة ميزانية البناء

```bash
npm run performance:build
```

يشغّل هذا الأمر `npm run build:stats` (الذي يضبط `BUNDLE_STATS=1` ويشغّل `vite build` ليُخرج `build/stats.json`) ثم سكربت فحص الميزانيات. ويجب أن ترى مخرجات مثل:

```
Performance budget check OK: total 78.3 kB / 110 kB, largest chunk 42.1 kB / 55 kB
```

الأرقام الدقيقة ستتغيّر مع بناءك، لكن يجب أن تبقى تحت العتبات.

### ميزانية وقت التشغيل

```bash
npm run performance:runtime
```

يشغّل هذا الأمر مواصفة أداء Playwright على خادم المعاينة. وإن كنت قد بنيت المشروع الموثَّق في مختبر المصادقة السابق، فيجب أن يستهدف هذا الأمر ذلك المشروع. وإن لم تفعل، فالنسخة الأولى من فحص وقت التشغيل تستطيع أن تتوجّه إلى مسار عام بدلًا منه. وفي الحالتين، يقرأ الاختبار `domContentLoaded` من المتصفّح ويقارنه بالعتبة في `performance-budgets.json`.

### الحلقة الكاملة

```bash
npm run performance:check
```

يسلسل هذا الأمر النصفين: ميزانيات البناء أولًا، ثم وقت التشغيل. وإن فشل أي منهما، خرج الأمر برمز غير صفري. وهذا هو الأمر الذي توصّله بـCI.

### تجربة الفشل المتعمَّد

هذا هو الجزء الذي يثبت أن الميزانيات ليست للزينة فحسب. افتح `performance-budgets.json` وأنزل عتبة واحدة تحت ما ينتجه بناءك فعلًا:

```json
{
  "build": {
    "maxTotalGzipKilobytes": 5,
    "maxLargestChunkGzipKilobytes": 55
  }
}
```

والآن شغّل:

```bash
npm run performance:build
```

ويجب أن ترى:

```
Performance budget check FAILED:
  - Total client bundle size 78.3 kB gzip exceeds budget of 5 kB
```

رمز الخروج 1. السكربت أمسكه. وأعد التغيير حين تنتهي — فالهدف كان رؤية نمط الفشل، لا العيش مع ميزانية مستحيلة.

## أنماط تأخذها معك

- **ملف واحد، وحقيقة واحدة.** سكربت البناء واختبار Playwright كلاهما يقرأ من `performance-budgets.json`. فحين تشدّد ميزانية، تعدّل رقمًا واحدًا. وحين يقرأ وكيل الميزانية، يجد ملفًا واحدًا.
- **وقت البناء ووقت التشغيل سؤالان مختلفان.** حجم الحزمة خاصية من خصائص وقت البناء. وسرعة تحميل الصفحة خاصية من خصائص وقت التشغيل. وقياسهما معًا يمنحك تغطية لأشيع طريقتين يتراجع بهما الأداء.
- **رموز الخروج واجهة برمجية.** يميّز السكربت بين «تجاوز الميزانية» (الرمز 1) و«انهيار السكربت» (الرمز 2). وخطوط CI والوكلاء يستطيعون التصرّف بناءً على هذا التمييز.
- **توقيت متصفّح حقيقي، لا تقديرات.** يستخدم اختبار Playwright واجهة `PerformanceNavigationTiming` من نسخة Chromium فعلية. والمعايير الاصطناعية أفضل من لا معايير، لكن واجهات المتصفّح الحقيقية أفضل من المعايير الاصطناعية.
- **الأوامر المسمّاة تتركّب.** `performance:build` و`performance:runtime` و`performance:check` كلها قابلة للتشغيل منفصلة. فالوكيل يستطيع استدعاء ما يحتاجه دون تشغيل الحلقة كاملة كل مرة.

## قراءات إضافية

- [مختبر: إضافة ميزانيات الأداء إلى Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-performance-budgets-to-shelf)
- [ميزانيات الأداء كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop)
