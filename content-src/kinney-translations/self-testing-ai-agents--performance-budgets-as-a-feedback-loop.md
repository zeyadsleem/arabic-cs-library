---
title: "ميزانيات الأداء كحلقة تغذية راجعة"
---

ثمة صنف من الأخطاء يبرع الوكلاء في إدخاله بشكل غريب: الميزة تعمل، والاختبارات تنجح، ولقطة الشاشة تطابق، والصفحة صارت الآن أبطأ بشكل ملحوظ.

لا أحد يكتب ذلك الخطأ عن قصد. ومع ذلك يُشحن طوال الوقت.

إذن هذا الدرس عن إضافة حلقة أخرى: ميزانية أداء رخيصة ومملّة وقابلة للفرض. ليست بطولية. وليست من نوع «لنبنِ برنامج رصد كاملًا قبل الغداء». مجرد بوابة كافية لأن لا يستطيع وكيل أن يضاعف وزن مسارك بهدوء أو يحوّل تفاعلًا سريعًا إلى تفاعل لزج.

> **المتطلّبات المسبقة**
>
> يفترض هذا الدرس أنك ربطت الانحدار البصري بالفعل. فروق لقطات الشاشة تخبرك *بما تغيّر بصريًا*. أما ميزانيات الأداء فتخبرك ما إن كان التغيير نفسه قد جعل التطبيق أثقل أو أبطأ.

## لماذا تحتاج الأداءات حلقتها الخاصة

معظم الحلقات التي بنيناها حتى الآن تجيب عن أسئلة الصحة.

- هل تتصرّف الواجهة كما ينبغي؟
- هل ما تزال تبدو صحيحة؟
- هل تتبع الشيفرة القواعد؟
- هل رصد مراجع ثانٍ شيئًا غريبًا؟

الأداء مختلف لأن نمط الفشل عادةً ليس ثنائيًا. الصفحة ما تزال تُرسَم. والنموذج ما يزال يُرسَل. الخطأ هو أنها صارت تستغرق 900 مللي ثانية أطول، أو أن حزمة المسار نمت بمقدار 140 كيلوبايت، أو أن حالة التحميل تبقى على الشاشة مدة كافية لتشعر باللزوجة.

هذا النوع من الانحدار يتسرّب من كل حلقة أخرى ما لم تقرّر مسبقًا أن أرقامًا معيّنة غير مسموح لها بالانحراف بهدوء.

وذلك هو الميزانية: حدّ له عواقب.

## نموذج الميزانيتين

لا أريد برنامج أداء عملاقًا في ورشة من يوم واحد. أريد رقمين يستطيع الوكيل فرضهما فعلًا.

النموذج:

- **ميزانية وقت البناء**: كم كبرت حزمة العميل المشحونة؟
- **ميزانية وقت التشغيل**: كم استغرق مسار حرج واحد أو تفاعل واحد في بيئة قابلة لإعادة الإنتاج؟

هذا يكفي لالتقاط معظم الانحدارات العرضية.

بنهاية المختبر المرافق، سيكون لدى Shelf ملف `tests/performance.spec.ts` للجانب التشغيلي، وعائلة سكربتات `npm run performance:*` للجانب البنائي، مع `npm run performance:build` كنقطة الدخول الضيّقة «اجمع الأرقام فقط». وبيت القصيد أن تعيش الميزانية خلف أوامر مسمّاة يستطيع الوكيل تشغيلها، لا خلف مقال مدوّنة عن ثقافة الأداء.

## ميزانيات وقت البناء: التقط زيادة الوزن مبكرًا

في المختبر ستضيف `npm run build:stats` إلى Shelf، وهي تقلب متغيّر بيئة `BUNDLE_STATS=1` وتخبر تهيئة Vite بأن تمرّر [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer) إلى الناتج—فتنتج خريطة شجرية `build/stats.html` للبشر وملف بيانات خام `build/stats.json` للأتمتة. ويمكنك اتّباع الشكل نفسه مع أي مُجمِّع؛ فالمقصود ليس الإضافة.

التوصيل داخل `vite.config.ts` صغير. تستورد `visualizer` من `rollup-plugin-visualizer`، وتضمّن نسختين شرطيًا في قائمة إضافات Vite (واحدة HTML وواحدة JSON)، وتقيّد الكتلة كلها براية `BUNDLE_STATS` كي يبقى `npm run build` العادي سريعًا وصامتًا:

```typescript
// vite.config.ts (trimmed)
import path from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

const shouldEmitBundleStats = process.env.BUNDLE_STATS === '1';

export default defineConfig({
  plugins: [
    sveltekit(),
    ...(shouldEmitBundleStats
      ? [
          visualizer({
            filename: path.resolve('build/stats.html'),
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
            emitFile: false,
          }),
          visualizer({
            filename: path.resolve('build/stats.json'),
            template: 'raw-data',
            gzipSize: true,
            brotliSize: true,
            emitFile: false,
          }),
        ]
      : []),
  ],
});
```

ملاحظتان عن تلك الكتلة:

- **`template: 'treemap'`** ينتج الخريطة الشجرية HTML التي يستطيع إنسان التمرير فيها. و**`template: 'raw-data'`** ينتج JSON الذي سيحلّله سكربت الفحص. تريد الاثنين معًا — البشر يستخدمون أحدهما، والحلقة تستخدم الآخر.
- **`emitFile: false`** يكتب التقرير إلى القرص عبر `filename` بدلًا من دفعه عبر رسم ناتج Rollup. وهذا يُبقي ملفات التقرير خارج الحزمة المنشورة.

بعد المختبر المرافق، سيحمل `vite.config.ts` في Shelf هذا النمط بالضبط. والمقصود أن البناء الناجح ينتج أرقامًا مقروءة آليًا يمكنك مقارنتها بحدّ في التحكم بالمصادرات.

ما أريده من حلقة الجانب البنائي:

- الحجم الكلي لحزمة العميل
- أكبر حزمة مسار أو نقطة دخول
- ملف ناتج مستقر يستطيع الوكيل تحليله

إن قفزت تلك الأرقام، تصبح الحلقة حمراء قبل أن تسنح للانحدار فرصة أن يصير «حسنًا، ما يزال يعمل تقنيًا».

### كيف يبدو `build/stats.json` فعليًا

قبل أن تستطيع تحليله، عليك أن تعرف ما يحويه. فـ`rollup-plugin-visualizer` مع `template: 'raw-data'` يُخرج ملفًا يشبه هذا تقريبًا (مقتطع للقراءة):

```json
{
  "version": 2,
  "tree": {
    "name": "root",
    "children": [/* the whole module tree */],
  },
  "nodeMetas": {
    "abc-1": {
      "id": "/src/routes/(app)/shelf/+page.svelte",
      "moduleParts": {
        "_app/immutable/nodes/4.CdrmuZQ8.js": "abc-1-part",
      },
    },
  },
  "nodeParts": {
    "abc-1-part": {
      "renderedLength": 1820,
      "gzipLength": 640,
      "brotliLength": 560,
    },
  },
}
```

مفتاحان يحملان الإشارة التي نريدها:

- **`nodeMetas`** — مدخل واحد لكل ملف مصدري في الرسم. ولكل meta خريطة `moduleParts` مفاتيحها ملفات الحزمة *الناتجة* (مثل `_app/immutable/chunks/BiOosUrW.js`) وقيمها معرّفات uid داخل `nodeParts`.
- **`nodeParts`** — معلومات الحجم لكل قطعة شيفرة مُخرَجة: `renderedLength` (بايتات خام)، و`gzipLength`، و`brotliLength`.

وجمع بايتات gzip لكل `nodePart` ينتمي إلى ملف ناتج معيّن يعطيك الحجم المضغوط لذلك الملف. وجمع ذلك عبر كل ملف تحت `_app/immutable/` (بادئة حزم العميل في SvelteKit) يعطيك الحجم الكلي لحزمة العميل بعد gzip. وأكبر تلك المجاميع هو حزمة المسار في أسوأ حالة.

### سكربت الفحص

حين تعرف الشكل، يصبح الفحص قصيرًا. إنه يقرأ الملفين، ويمشي `nodeMetas` → `moduleParts` → `nodeParts`، ويجمّع حسب ملف الحزمة، ويصفّي إلى حزم العميل، ويقارن الإجماليات بالحدود المخزّنة:

```javascript
// scripts/check-performance-budgets.mjs
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const STATS_PATH = resolve('build/stats.json');
const BUDGETS_PATH = resolve('performance-budgets.json');
const CLIENT_BUNDLE_PREFIX = '_app/immutable';

const formatKilobytes = (bytes) => (bytes / 1024).toFixed(1);

const computeClientBundleSizes = (stats) => {
  const parts = stats.nodeParts ?? {};
  const metas = stats.nodeMetas ?? {};
  const bundleGzipByFile = new Map();

  for (const meta of Object.values(metas)) {
    for (const [bundleFile, uid] of Object.entries(meta.moduleParts ?? {})) {
      const part = parts[uid];
      if (!part) continue;
      bundleGzipByFile.set(
        bundleFile,
        (bundleGzipByFile.get(bundleFile) ?? 0) + (part.gzipLength ?? 0),
      );
    }
  }

  const clientEntries = [...bundleGzipByFile.entries()].filter(([file]) =>
    file.startsWith(CLIENT_BUNDLE_PREFIX),
  );
  return {
    totalClientGzipBytes: clientEntries.reduce((sum, [, bytes]) => sum + bytes, 0),
    largestClientChunkBytes: clientEntries.reduce((max, [, bytes]) => Math.max(max, bytes), 0),
  };
};

const [statsRaw, budgetsRaw] = await Promise.all([
  readFile(STATS_PATH, 'utf8'),
  readFile(BUDGETS_PATH, 'utf8'),
]);
const stats = JSON.parse(statsRaw);
const budgets = JSON.parse(budgetsRaw);

const { totalClientGzipBytes, largestClientChunkBytes } = computeClientBundleSizes(stats);
const totalKilobytes = totalClientGzipBytes / 1024;
const largestKilobytes = largestClientChunkBytes / 1024;

const failures = [];
if (totalKilobytes > budgets.build.maxTotalGzipKilobytes) {
  failures.push(
    `Total client bundle ${formatKilobytes(totalClientGzipBytes)} kB exceeds budget of ${budgets.build.maxTotalGzipKilobytes} kB`,
  );
}
if (largestKilobytes > budgets.build.maxLargestChunkGzipKilobytes) {
  failures.push(
    `Largest client chunk ${formatKilobytes(largestClientChunkBytes)} kB exceeds budget of ${budgets.build.maxLargestChunkGzipKilobytes} kB`,
  );
}

if (failures.length > 0) {
  console.error('Performance budget check FAILED:');
  for (const failure of failures) console.error('  - ' + failure);
  process.exit(1);
}

console.log(
  `Performance budget check OK: total ${formatKilobytes(totalClientGzipBytes)} kB / ${budgets.build.maxTotalGzipKilobytes} kB, ` +
    `largest chunk ${formatKilobytes(largestClientChunkBytes)} kB / ${budgets.build.maxLargestChunkGzipKilobytes} kB`,
);
```

و`performance-budgets.json` هو ملف الحدود المخزّنة بجانب السكربت. ابدأ بأرقام أعلى قليلًا من خط الأساس المقيس حاليًا:

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

> **المختبر يشحن هذا**
>
> حين تُكمل المختبر المرافق، سيكون `scripts/check-performance-budgets.mjs` في Shelf نسخة أطول قليلًا من هذا المخطط، تضيف `try/catch` حول تحليل JSON وتُعرّض `clientEntries` لقواعد مستقبلية. والمسير متطابق. اقرأ المخطط أعلاه لتفهم *كيف* يعمل التجميع، ثم قارنه بتنفيذ مختبرك أو بحل الدورة لترى الشكل الدقيق.

## ميزانيات وقت التشغيل: التقط البطء حيث يشعر به المستخدم

حجم البناء ليس الشيء نفسه كسرعة وقت التشغيل. أحيانًا لا تتغيّر الحزمة إلا قليلًا ومع ذلك يصبح المسار أبطأ لأن استعلامًا صار يعمل مرتين، أو مكوّنًا يرسم أكثر من اللازم، أو الصفحة تقوم بعمل مكلف عند التحميل.

هنا يستحق كل من [واجهة الأداء](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Performance_data) وتتبّعات Playwright مكانه.

أريد ميزانية وقت تشغيل واحدة موجّهة، لا لوحة معلومات كاملة:

- أن يُحمَّل مسار `/shelf` تحت حدّ مختار في معاينة شبيهة بالإنتاج
- أو أن يكتمل تفاعل «قيّم كتابًا» تحت حدّ مختار

اختر تدفقًا واحدًا يشعر به المستخدمون فعلًا. وقِسه بالطريقة نفسها في كل مرة. وخزّن الحدّ. وافشل حين ينحرف.

هذا يكفي لجعل الحلقة حقيقية.

## لماذا لا ألجأ افتراضيًا إلى [Lighthouse](https://developer.chrome.com/docs/lighthouse) هنا

أحبّ [Lighthouse](https://developer.chrome.com/docs/lighthouse). وأعرف أيضًا ما يحدث حين يربطه الناس مبكرًا جدًا: يغرقون في الدرجات وضجيج البيئة ونصائح صحيحة تقنيًا لكنها عديمة الفائدة للمهمة المطروحة.

لهذه الورشة، أريد الحلقة الأرخص:

- إحصاءات البناء للوزن
- قياس واحد قابل لإعادة الإنتاج لوقت التشغيل من أجل السرعة
- تتبّع Playwright أو بيانات توقيت المتصفّح حين يسوء الرقم

حين تستقرّ تلك الحلقة، *حينها* يمكنك إضافة أدوات أكبر. لكني لن أبدأ من هناك.

> **انضباط القياس**
>
> قِس ميزانيات وقت التشغيل مقابل هدف معاينة مستقر، لا مقابل خادم تطوير بإعادة تحميل فورية. فإن تغيّرت البيئة في كل تشغيل، فالرقم يخبرك عن البيئة، لا عن الميزة.

## كيف تضبط الأرقام دون أن تجعلها زائفة

الطريقة الخاطئة: تختلق أرقامًا طموحة من الهواء وتراقب الفريق يعطّل الفحص بحلول الخميس.

الطريقة الصحيحة:

1. قِس الحالة الخضراء الحالية.
2. قرّر أي انحراف مقبول.
3. خزّن الحدّ في التحكم بالمصادرات.
4. شدّد لاحقًا إن أثبت الفريق أنه يستطيع الثبات على الخط.

عادةً أبدأ بـ«خط الأساس الحالي زائد هامش صغير» لأن ذلك يُبقي الحلقة صادقة. فالميزانية موجودة لالتقاط الانحدارات العرضية أولًا. أما بطولات التحسين فيمكن أن تأتي لاحقًا.

## ما ينبغي أن يفعله الوكيل عندما تُخترق الميزانية

حين تُخترق الميزانية، أريد أن يتصرّف الوكيل بالطريقة نفسها التي يتصرّف بها أمام اختبار فاشل:

- يفحص الملفات المتغيّرة
- يفحص إحصاءات البناء أو التتبّع
- يحدّد الشيء الذي صار أثقل أو أبطأ
- يصلحه أو يقترح تغيير الميزانية صراحةً

الجزء الأخير مهم. فالميزانية مسموح لها بالتغيّر. لكن التغيير ينبغي أن يكون متعمّدًا ومراجَعًا ومشروحًا، لا مُهرَّبًا لأن الوكيل أراد أن يتوقف الفحص عن الصراخ.

## قواعد الوكيل

```markdown
## Performance budgets

- After UI or bundle-affecting changes, run the performance budget
  checks before declaring the task done.
- Track two things: build-size drift and one critical runtime
  measurement on a production-like preview target.
- If a budget fails, inspect the stats or trace before guessing at a
  fix.
- Do not raise a budget just to make the check pass. If the budget needs
  to change, explain why in the summary or commit message.
```

## كيف تعرف أن الميزانية حقيقية

لديك هذه الحلقة عندما:

- يُخرج المستودع إحصاءات بناء يستطيع الوكيل تحليلها
- يكون لتدفق واحد حرج في وقت التشغيل حدّ توقيت قابل لإعادة الإنتاج
- يتعامل الوكيل مع إخفاقات الميزانية كإخفاقات حقيقية، لا كمخرجات استشارية

## الشيء الوحيد الذي يجب تذكّره

ميزانيات الأداء ليست عن مطاردة الدرجات المثالية. إنها عن جعل الانحدارات مستحيلة التجاهل. اختر رقمين يهمّان، وافرِضهما بثبات، ودع الوكيل يتعثّر بهما قبل مستخدميك.

## قراءات إضافية

- [الانحدار البصري كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop)
- [مختبر: إضافة ميزانيات أداء إلى Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-performance-budgets-to-shelf)
