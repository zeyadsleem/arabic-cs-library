---
title: "أنماط النبض ومؤشّرات التحميل"
lang: ar
source: "https://stevekinney.com/courses/tailwind/pulse-and-loading-indicator-patterns"
---

تقديم تغذية راجعة فورية أثناء جلب البيانات أو تحميل المحتوى أمر بالغ الأهمية. ويوفّر Tailwind CSS أصنافًا مساعِدة لإنشاء مؤشّرات التحميل، من حركات النبض البسيطة إلى الأنماط المعقّدة.

## استخدام `animate-pulse` لهياكل التحميل (skeleton)

ينشئ الصنف المساعد `animate-pulse` في Tailwind هياكل تحميل—وهي معاينات نائبة تُقلّل الإحساس بزمن التحميل. ويطبّق الصنف حركة نابضة عبر تلاشي العتامة وإظهارها.

طَبِّقه على أي عنصر ليُشير إلى التحميل. واستخدم أشكالًا نائبة تحاكي بنية المحتوى النهائي.

*استخدام animate-pulse لهياكل التحميل — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4572875f03aaf7b51f3864ef540413ec477fe35c21691d6f0cebad008135d9b1.html)*

```html
<div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow">
  <div class="flex animate-pulse space-x-4">
    <div class="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 rounded bg-slate-200 dark:bg-slate-700"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 h-2 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div class="col-span-1 h-2 rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>
        <div class="h-2 rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  </div>
</div>
```

تنشئ العناصر ذات `bg-slate-200` (أو `dark:bg-slate-700`) أشكال بطاقات المحتوى. ويجعل صنف `animate-pulse` على العنصر الأب جميع العناصر النائبة الفرعية تنبض معًا.

### تخصيص حركة النبض

يوفّر `animate-pulse` حركة افتراضية. وخصّص السرعة أو العتامة عبر تعريف إطارات مفاتيح (keyframes) مخصّصة في `tailwind.config.js`، وإن كان الافتراضي كافيًا في الغالب.

## إنشاء الدوائر الدوّارة (spinners) باستخدام `animate-spin`

لمؤشّرات التحميل التقليدية، استخدم `animate-spin`. وهذه تطبّق حركة دوران دائري، تُستخدم عادةً للأيقونات أو الأشكال الهندسية.

*إنشاء الدوائر الدوّارة باستخدام animate-spin — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/63344d4a79568129d9661c75d72c157b63747df2ac970a8b04f010c07e96bb28.html)*

```html
<div class="flex items-center justify-center space-x-2">
  <div
    class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
  ></div>
  <p class="text-slate-600 dark:text-slate-300">Loading...</p>
</div>
```

هذا عنصر `div` مُنسَّق كدائرة ذات حدّ علوي شفاف. ويجعل `animate-spin` يدور، فيُنتج دوّارة دوّارة كلاسيكية. واضبط لون الحدّ والحجم والسرعة عبر إعدادات Tailwind.

## حركات تحميل مخصّصة

للحركات المعقّدة، عرّف إطارات مفاتيح (keyframes) مخصّصة في `tailwind.config.js`.

مثال حركة تحميل بـ«نقاط»:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'bounce-dots': 'bounce-dots 1.4s infinite ease-in-out both',
      },
      keyframes: {
        'bounce-dots': {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0' },
          '40%': { transform: 'scale(1.0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

استخدم `animate-bounce-dots` في HTML:

*حركات تحميل مخصّصة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4c62382ad7b7e4bcc62104b6d18dbe908ef6292cfb2b4ecdf098ab7e06ad07c9.html)*

```html
<div class="flex items-center justify-center space-x-2">
  <span class="sr-only">Loading...</span>
  <div class="animate-bounce-dots h-3 w-3 rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
  <div class="animate-bounce-dots h-3 w-3 rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
  <div class="animate-bounce-dots h-3 w-3 rounded-full bg-blue-600"></div>
</div>
```

تقفز ثلاث نقاط بالتتابع. و`animation-delay` (باستخدام قيم تعسّفية) يؤخّر الحركة بالتدرّج لإعطاء تأثير ديناميكي.

## مؤشّرات التحميل المعتمدة على SVG

توفّر SVG حركات تحميل مخصّصة أو معقّدة. وأدرجها مباشرةً داخل HTML واستخدم أصناف Tailwind المساعِدة للتنسيق والتحكّم بالحركة.

دوّارة دوّارة باستخدام `animate-spin`:

*مؤشّرات التحميل المعتمدة على SVG — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/06b160a4fe5ec6da357c8c15695371ca4b1194545b5770cd0eae6520ace4a851.html)*

```html
<svg
  class="h-5 w-5 animate-spin text-blue-500"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
>
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path
    class="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  ></path>
</svg>
```

جزآن: مسار دائري باهت، وقوس دوّار معتم. ويتولّى `animate-spin` الدوران؛ بينما يتحكّم `h-5 w-5 text-blue-500` في الحجم واللون.

## اعتبارات إمكانية الوصول

راعِ إمكانية الوصول عند تنفيذ مؤشّرات التحميل:

1. **مناطق `aria-live`**: استخدم `aria-live="polite"` أو `aria-live="assertive"` لتحديثات المحتوى الديناميكي.
2. **`aria-busy`**: طَبِّق `aria-busy="true"` على مناطق التحميل. واضبطه على `false` عند الانتهاء.
3. **نص قارئ الشاشة**: أدرج نصًا بـ`sr-only` للمؤشّرات البصرية فقط (`<span class="sr-only">Loading content...</span>`).
4. **تقليل الحركة**: استخدم مُبدّلات `motion-safe` و`motion-reduce` لاحترام تفضيلات المستخدم.

*اعتبارات إمكانية الوصول — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/959c80270e061b167847be8d3ec18b15317299923eb9eb26cb115690e5606a63.html)*

```html
<div role="status" aria-live="polite" class="flex items-center justify-center space-x-2">
  <div
    class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent motion-safe:animate-spin motion-reduce:hidden"
  ></div>
  <span class="sr-only">Loading...</span>
  <p class="text-slate-600 motion-reduce:hidden dark:text-slate-300">Loading...</p>
  <p class="hidden text-slate-600 motion-reduce:block dark:text-slate-300">
    Please wait, content is loading.
  </p>
</div>
```

تُخفى الدوّارة عند تقليل الحركة، ويُعرض النص البديل.

## أفضل الممارسات {#best-practices}

- **كن مُفصِحًا**: أبلغ بوضوح بأنّ النظام يعمل.
- **طابِق الأداء المُدرَك**: تجنّب المؤشّرات للعمليات سريعة جدًّا (أقل من ثانية واحدة).
- **الثبات**: استخدم أنماط تحميل متّسقة في تطبيقك كلّه.
- **تجنّب "الاهتزاز" (jank)**: تأكّد من انسيابية الحركات. وحركات CSS أداؤها جيّد.
- **مؤشّرات سياقية**: اعرض التحميل داخل المكوّنات المحدّثة بعينها.
- **وفّر مؤشّر التقدّم**: استخدم أشرطة التقدّم في العمليات الطويلة كلما أمكن.

وتُنشئ أصناف Tailwind المساعِدة للحركة، مع مراعاة إمكانية الوصول، أنماط تحميل فعّالة وسهلة الاستخدام.
