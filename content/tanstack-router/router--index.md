---
title: "مقدمة"
lang: ar
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=0s"
---

الدرس 1 من 34 · دورة TanStack Router الكاملة · 2 دقيقة و45 ثانية

<div class="lecture-video"><iframe src="https://www.youtube.com/embed/8_sGz4DHwIA?start=0&amp;rel=0" title="مقدمة — الفيديو الأصلي" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>

<p>الفيديو الأصلي باللغة الإنجليزية. إذا تعذّر تشغيله هنا، <a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&t=0s" target="_blank" rel="noopener noreferrer">شاهده على موقع المؤلف</a>. التفريغ النصي العربي الكامل أدناه.</p>

<p><bdi dir="ltr">[00:02]</bdi> في هذا الدرس نستعرض TanStack Router. إن TanStack Router هو موجّه (router) يمكن</p>
استخدامه لبناء تطبيقات React وSolid. وما يميّز TanStack Router خصوصًا أنه
آمنُ الأنواع (type-safe) بالكامل (100%). لذا إذا ألقينا نظرة:

<p><bdi dir="ltr">[00:15]</bdi> حيث يوفّر تقريبًا نفس الميزات (features) التي تجدها في أي موجّه آخر مثل</p>
Next.js أو React Router. فهناك تخطيطات متداخلة (nested layouts) ومجموعات تخطيط
(layout groups). كما يوفّر التوجيه المبني على الملفات (file-based routing)، وتحميل
البيانات بالتوازي (parallel data loading)،

<p><bdi dir="ltr">[00:29]</bdi> والجلب المسبق (prefetching) وما شابه. مع ذلك، نمتلك دعم TypeScript المُستنتَج</p>
(inferred) بنسبة 100%.

<p><bdi dir="ltr">[00:35]</bdi> كل ما سنقوم به والمتعلق بالتنقّل سيكون آمنًا للأنواع (type-safe) بالكامل (100%).</p>
كما توجد ميزات مثل الذاكرة المؤقتة المدمجة (built-in caching). سنلقي نظرة على ذلك.
ويمكنك دمجه مع TanStack Query. كما يوفّر الكثير من الميزات المريحة عند التعامل مع
معلمات البحث (search parameters). فيمكننا مثلًا التحقق من معلمات البحث.

<p><bdi dir="ltr">[00:47]</bdi> كما في التحقق من معلمات البحث (search parameters).</p>

<p><bdi dir="ltr">[00:56]</bdi> يمكننا أيضًا جعل معلمات البحث آمنة الأنواع (type-safe) ويمكننا التعامل معها</p>
بسهولة شديدة. وسنستعرض كل ذلك. كما توجد ميزات أخرى مثل السياق (context) حيث يمكن
تمرير بعض الحالة (state) التي ستُشارَك عبر مسارات متعددة. يمكن استخدامه في المصادقة
(authentication) مثلًا لمشاركة بيانات المصادقة من أجل حماية بعض المسارات. كما توجد ميزات
أخرى مثل دوال التحميل (loading functions) أو دوال المُحمِّل (loader functions) التي يمكن
استخدامها لتحميل البيانات داخل مساراتنا. ويمكننا أيضًا بثّ البيانات (stream data).

<p><bdi dir="ltr">[01:08]</bdi> يمكننا تمرير بعض السياق، بعضَ الحالة (state) التي ستُشارَك عبر مسارات متعدّدة. يمكن</p>
استخدامه في المصادقة مثلًا، لمشاركة بيانات المصادقة من أجل حماية مسارات معينة. كما توجد
ميزات أخرى مثل دوال التحميل (loading
<p><bdi dir="ltr">[01:23]</bdi> يمكننا فعل الكثير. فلنتوقف عن الكلام كثيرًا ولنبدأ. وكل هذه الميزات ستظهر</p>

<p><bdi dir="ltr">[01:36]</bdi> أثناء تقدمنا في الفيديو. لكن ما تحتاج معرفته هو أن TanStack Router ليس إطار عمل</p>
(full stack framework). فهو غير مخصص ليُستخدم كإطار عمل متكامل (full stack framework).
غير أنه مصمَّم بحيث يمكن ترقيته إلى إطار عمل متكامل، وفي الواقع فهو يشغّل إطار العمل

<p><bdi dir="ltr">[01:52]</bdi> المتكامل الخاص بـ TanStack وهو TanStack Start الذي هو حاليًا في مرحلة بيتا (beta).</p>
هذا يستخدم React Router للتوجيه، وإذا كنت مهتمًا بتعلم TanStack Start في مرحلة
ما، فسيتعين عليك أن تكون مألوفًا مع TanStack Router. لذا قد يكون هذا الفيديو مفيدًا لك.

<p><bdi dir="ltr">[02:06]</bdi> وكذلك هنا، إن كنت مهتمًا، يمكنك إيجاد جدول مقارنة بين مختلف موجّهات React</p>
الشهيرة. فنحن لدينا TanStack Router، ولدينا React Router، ولدينا الموجّه الذي يأتي مع
Next.js. يمكنك إلقاء نظرة على ذلك. قد يساعدك في تحديد الموجّه الذي تستخدمه إذا كنت
تعمل على مشروع جديد.

<p><bdi dir="ltr">[02:20]</bdi> ومع ذلك، لنبدأ على الفور بإنشاء تطبيق جديد</p>

<p><bdi dir="ltr">[02:35]</bdi> واستخدام TanStack Router داخله.</p>

<p><bdi dir="ltr">[02:40]</bdi> [تصفيق] [موسيقى]</p>
