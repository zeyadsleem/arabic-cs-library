---
title: "الاقتطاع والالتفاف"
lang: ar
source: "https://stevekinney.com/courses/tailwind/truncation-and-wrapping"
---

سلوك النص داخل الحاويات أمر أساسي للواجهات المهيكلة جيدًا. ويوفّر Tailwind أصنافًا مساعِدة للتحكّم في التفاف النص واقتطاعه.

## التحكّم في التفاف النص

يوفّر Tailwind أصنافًا مساعِدة للتحكّم في كيفية تدفّق النص وانقطاعه عبر الأسطر.

### قطع الكلمات (`word-break`)

تتحكّم الخاصية `word-break` في كيفية قطع الكلمات لمنع الفيض.

- **`break-normal`**: السلوك الافتراضي، يقطع فقط عند نقاط قطع الكلمات الطبيعية
- **`break-all`**: يقطع عند أي نقطة، حتى داخل الكلمات
- **`break-keep`**: يمنع القطع في النصوص الصينية أو اليابانية أو الكورية (CJK). ومع النصوص غير الـCJK يتصرّف مثل `break-normal`

طَبِّقه بشكل شرطي مع نقاط التوقّف:

*قطع الكلمات (word-break) — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f0ea3e97a6104d70c722a9f5f585b595afec3d23560fd55b7347999dae3ca39a.html)*

```html
<p class="break-all md:break-normal">Thisisasuperlongwordthatwillbreakanywherenecessary.</p>
```

### الالتفاف عند الفيض (`overflow-wrap`)

تحدّد الخاصية `overflow-wrap` ما إذا كان على المتصفحات قطع الأسطر داخل الكلمات لمنع الفيض.

- **`wrap-normal`**: السلوك الافتراضي، يقطع فقط عند نقاط الالتفاف الطبيعية مثل المسافات والشرطات
- **`wrap-break-word`**: يتيح فواصل الأسطر بين الحروف عند الحاجة لمنع الفيض
- **`wrap-anywhere`**: مشابه لـ`wrap-break-word` لكنه يأخذ في الحسبان القطع في منتصف الكلمة عند حساب الحجم الضمني. وهو مفيد لحاويات flex حيث ستحتاج إلى `min-width: 0` لولا ذلك

*الالتفاف عند الفيض (overflow-wrap) — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a3204cf71a475c3d8d7420c79c4537be109f9e1b812dd6cb8dc1379ab3c5a79f.html)*

```html
<div class="flex w-32">
  <p class="wrap-anywhere">Anotherlongwordtobreakanywhere.</p>
</div>
```

### التحكّم في المسافات البيضاء (`white-space`)

تتحكّم الخاصية `white-space` في كيفية التعامل مع المسافات البيضاء وفواصل الأسطر.

- **`whitespace-normal`**: يلفّ النص بشكل طبيعي، وتُدمج فواصل الأسطر والمسافات
- **`whitespace-nowrap`**: يمنع الالتفاف، ويفيض النص عند الحاجة. وتُدمج فواصل الأسطر والمسافات
- **`whitespace-pre`**: يحافظ على فواصل الأسطر والمسافات تمامًا كما كُتبت. ولا يلتفّ النص
- **`whitespace-pre-line`**: يحافظ على فواصل الأسطر لكنه يدمج المسافات. ويلتفّ النص بشكل طبيعي
- **`whitespace-pre-wrap`**: يحافظ على فواصل الأسطر والمسافات. ويلتفّ النص بشكل طبيعي
- **`whitespace-break-spaces`**: يحافظ على فواصل الأسطر والمسافات، بما في ذلك في نهايات الأسطر

*التحكّم في المسافات البيضاء (white-space) — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/302e64e93b8654d6025ae250a1742ce91dd3d95f6acbde245ebb4ca572c7bf38.html)*

```html
<p class="overflow-hidden text-ellipsis whitespace-nowrap">
  This text will not wrap and will be truncated with an ellipsis if it overflows.
</p>
<p class="whitespace-pre-wrap">This text preserves newlines and spaces, and wraps normally.</p>
```

### التحكّم في القطع داخل الأعمدة والصفحات

تحكّم في مواضع قطع المحتوى في التخطيطات متعددة الأعمدة أو أنماط الطباعة.

#### القطع بعد (`break-after`)

تتحكّم في قطع الأعمدة أو الصفحات *بعد* العنصر.

الأصناف المتاحة: `break-after-auto`، `break-after-avoid`، `break-after-all`، `break-after-avoid-page`، `break-after-page`، `break-after-left`، `break-after-right`، `break-after-column`.

*القطع بعد (break-after) — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/669d60e630354757117cff943623573462276c48cef8348005734437d92d9a1b.html)*

```html
<div class="columns-2">
  <p>Content before break...</p>
  <div class="break-after-column"></div>
  <p>Content after break...</p>
</div>
```

#### القطع قبل (`break-before`)

تتحكّم في قطع الأعمدة أو الصفحات *قبل* العنصر.

الأصناف المتاحة: `break-before-auto`، `break-before-avoid`، `break-before-all`، `break-before-avoid-page`، `break-before-page`، `break-before-left`، `break-before-right`، `break-before-column`.

*القطع قبل (break-before) — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/db7e8a9a2272b851ffb2f0243066c99c334e41588182091adc704180fb20494f.html)*

```html
<div class="columns-2">
  <p>Content before break...</p>
  <p class="break-before-column">Content after break...</p>
</div>
```

#### القطع داخل (`break-inside`)

تتحكّم في قطع الأعمدة أو الصفحات *داخل* العنصر.

الأصناف المتاحة: `break-inside-auto`، `break-inside-avoid`، `break-inside-avoid-page`، `break-inside-avoid-column`.

*القطع داخل (break-inside) — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/15150c0bd072df4f599a172681e8f5bde3b46f7a99efc97a1165f13607a6593e.html)*

```html
<div class="columns-2">
  <div class="break-inside-avoid">
    <p>This block of text should ideally not be broken across columns or pages.</p>
  </div>
</div>
```

### الوصل بالخط (`hyphens`)

تتحكّم الخاصية `hyphens` في ما إذا كان ينبغي وصل الكلمات بالشرطة عند التفاف النص.

- **`hyphens-none`**: يمنع الوصل بالخط، حتى مع اقتراحات قطع السطر (`­`)
- **`hyphens-manual`**: لا يصل إلا عند نقاط القطع المحدّدة (`­`). وهو الافتراضي في المتصفّح
- **`hyphens-auto`**: يسمح للمتصفّح باختيار مواضع الوصل بالخط تلقائيًا بحسب اللغة. وتُفضَّل الاقتراحات اليدوية

*الوصل بالخط (hyphens) — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/3c00da1c0dbd0fae4ef1b76cdefc0c670b8e50afce7e288ae646e0aac39a7955.html)*

```html
<p class="hyphens-auto">This word-processing example demonstrates automatic hyphenation.</p>
```

### الالتفاف العام للنص (`text-wrap`)

توفّر الخاصية `text-wrap` تحكّمًا حديثًا في التفاف النص.

- **`text-wrap`**: يتيح التفاف النص بشكل طبيعي عند النقاط المنطقية
- **`text-nowrap`**: يمنع التفاف النص
- **`text-balance`**: يوزّع النص بالتساوي عبر الأسطر. وكثيرًا ما تحدّ المتصفحات من ذلك إلى ~6 أسطر لأداء، ما يجعله مثاليًا للعناوين
- **`text-pretty`**: يحاول منع الكلمات اليتيمة (كلمة واحدة في السطر الأخير)

*الالتفاف العام للنص (text-wrap) — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9441d042565f963a9e83c4a6986b5e3894bc858ff0ab7cecfb48d221fbe1f6ef.html)*

```html
<h1 class="text-balance">A title that looks good across multiple lines.</h1>
<p class="text-pretty">
  A longer paragraph that avoids having a single word orphaned on the last line.
</p>
```

## إدارة اقتطاع النص

قيّد النص في مساحات محدّدة وأَشِر إلى ما إذا كان المحتوى مقتطعًا.

### الاقتطاع في سطر واحد (`text-overflow`)

امنع التفاف النص وأَشِر إلى الفيض.

- **`truncate`**: صنف مساعد مركّب يضبط `overflow: hidden` و`text-overflow: ellipsis` و`white-space: nowrap`. يمنع الالتفاف ويقتطع بعلامة حذف (…) الاقتطاع في سطر واحد (text-overflow) — المثال 9[افتح المثال](https://stevekinney.com/generated/playgrounds/767919740663dbe3f3edbca75d825b2a4eb016d083f100d4779d3783c6b88e38.html) <code><span class="line"><span style="color:#7FDBCA"><</span><span style="color:#CAECE6">p</span><span style="color:#C5E478;font-style:italic"> class</span><span style="color:#7FDBCA">=</span><span style="color:#D9F5DD">"</span><span style="color:#ECC48D">w-32 truncate</span><span style="color:#D9F5DD">"</span><span style="color:#7FDBCA">></span><span style="color:#D6DEEB">هذا النص طويل جدًّا وسيُقتطع.</span><span style="color:#7FDBCA"></</span><span style="color:#CAECE6">p</span><span style="color:#7FDBCA">></span></span></code>
- **`text-ellipsis`**: يضبط `text-overflow: ellipsis`. واستخدمه مع `overflow: hidden` و`white-space: nowrap` لإضافة علامة حذف (…) إلى النص الفائض
- **`text-clip`**: يضبط `text-overflow: clip`. ويقتطع النص عند حدّ منطقة المحتوى من دون مؤشّر. وهو الافتراضي في المتصفّح

### التقييد متعدّد الأسطر (`line-clamp`)

اقتطع النص متعدّد الأسطر بعد عدد محدّد من الأسطر.

- **`line-clamp-<number>`**: يحدّ النص عند أسطر محدّدة (`line-clamp-2`، `line-clamp-3`). ويضبط `overflow: hidden` و`display: -webkit-box` و`-webkit-box-orient: vertical` و`-webkit-line-clamp: <number>` التقييد متعدّد الأسطر (line-clamp) — المثال 10[افتح المثال](https://stevekinney.com/generated/playgrounds/77f4aa7c0638da3e1518d77f04480fc5b4ac3abfe4e59f669615a595df93fd02.html) <code><span class="line"><span style="color:#7FDBCA"><</span><span style="color:#CAECE6">div</span><span style="color:#C5E478;font-style:italic"> class</span><span style="color:#7FDBCA">=</span><span style="color:#D9F5DD">"</span><span style="color:#ECC48D">w-48</span><span style="color:#D9F5DD">"</span><span style="color:#7FDBCA">></span></span>
<span class="line"><span style="color:#7FDBCA"> <</span><span style="color:#CAECE6">p</span><span style="color:#C5E478;font-style:italic"> class</span><span style="color:#7FDBCA">=</span><span style="color:#D9F5DD">"</span><span style="color:#ECC48D">line-clamp-3</span><span style="color:#D9F5DD">"</span><span style="color:#7FDBCA">></span></span>
<span class="line"><span style="color:#D6DEEB"> هذه كتلة نص أطول ستُقيَّد بثلاثة أسطر كحدّ أقصى قبل أن</span></span>
<span class="line"><span style="color:#D6DEEB"> تُقتطع بعلامة حذف.</span></span>
<span class="line"><span style="color:#7FDBCA"> </span><span style="color:#CAECE6">p</span><span style="color:#7FDBCA">></span></span>
<span class="line"><span style="color:#7FDBCA"></</span><span style="color:#CAECE6">div</span><span style="color:#7FDBCA">></span></span></code>
- **`line-clamp-none`**: يزيل التقييد المطبَّق سابقًا
- **قيم مخصّصة**: استخدم `line-clamp-[<value>]` لأعداد أسطر مخصّصة

طَبِّقه استجابةً:

*التقييد متعدّد الأسطر (line-clamp) — المثال 11 — [افتح المثال](https://stevekinney.com/generated/playgrounds/dc2e8ca349cb24d97c90cdaddc6ffcaec6f159d9eebb173140f44271868d7d77.html)*

```html
<p class="line-clamp-2 md:line-clamp-4">
  This text will show 2 lines on small screens and 4 on medium screens and up.
</p>
<p class="line-clamp-[5] lg:line-clamp-[8]">This text uses arbitrary line counts.</p>
```

وتوفّر أصناف Tailwind المساعِدة للالتفاف والاقتطاع تحكّمًا شاملًا في تدفّق النص مباشرةً داخل HTML، فيصبح من السهل إدارة التخطيطات المعقّدة والتعامل مع حالات الفيض على نحو متّسق.
