---
title: "التثبيت (Installation)"
lang: ar
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=165s"
---

الدرس 2 من 34 · دورة TanStack Router الكاملة · 4 دقيقة و29 ثانية

<div class="lecture-video"><iframe src="https://www.youtube.com/embed/8_sGz4DHwIA?start=165&amp;rel=0" title="التثبيت (Installation) — الفيديو الأصلي" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>

<p>الفيديو الأصلي باللغة الإنجليزية. إذا تعذّر تشغيله هنا، <a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&t=165s" target="_blank" rel="noopener noreferrer">شاهده على موقع المؤلف</a>. التفريغ النصي العربي الكامل أدناه.</p>

> **مستودع شيفرة هذا الدرس**
>
> الفرع: [`app-init`](https://github.com/alialaa/tanstack-router-course/tree/app-init)


<p><bdi dir="ltr">[00:00]</bdi> هيا بنا نثبّت TanStack Router. وللقيام بذلك سأُنشئ مشروع React جديداً، لكن دون استخدام أي إطار عمل (framework)، ودون Next.js أو ما شابه. ما سأفعله هو أنّني</p>

<p><bdi dir="ltr">[00:13]</bdi> أُنشئ مشروع React جديداً مع Vite فقط كأداة تجميع (bundler). يدعم TanStack Router عدّة أدوات تجميع (bundlers)، من بينها Vite الذي سنستخدمه. كما يدعم Webpack وES Build، وربما غيرها أيضاً.</p>

<p><bdi dir="ltr">[00:28]</bdi> لكن سنستخدم Vite لإنشاء مشروع Vite جديداً. دعنا نضعه ربما على سطح المكتب.</p>

<p><bdi dir="ltr">[00:35]</bdi> سأقوم بتشغيل npm create vite@latest. وسنحصل على قائمة خيارات. لذا فلنختر اسمًا. ليكن TanStack Router. ولنختر إطار عمل (framework). بالطبع سنستخدم React. بالمناسبة،</p>

<p><bdi dir="ltr">[00:53]</bdi> كما ذكرنا، يدعم TanStack Router أيضًا Solid، لكن سنستخدم React هنا. فلنختر React. وبالمناسبة، في هذا المكان يمكننا اختيار قالب (template) يشتمل بالفعل على TanStack Router. لكنني</p>

<p><bdi dir="ltr">[01:07]</bdi> لن أفعل ذلك لأنني أريد أن أُريك كيفية تثبيت TanStack Router من الصفر؛ إذا كنت مثلاً تستخدم TanStack Router في مشروع قائم. لذا سأقوم باختيار</p>

<p><bdi dir="ltr">[01:18]</bdi> TypeScript. فلنختر TypeScript هنا، ويجب أن يُنشأ مشروعنا على سطح المكتب. لذا دعنا ننتقل إليه، ثم نشغّل npm install.</p>

<p><bdi dir="ltr">[01:29]</bdi> وكذلك سأفتح هذا المشروع في محرر الشيفرة (code editor) الخاص بي. والآن مشروعي مفتوح في VS Code وقد ثبّتت الاعتماديات (dependencies). لكن الآن لنثبّت TanStack Router. وسأثبّت أيضًا Tailwind من أجل تنسيق سريع مع تقدّم الأمثلة على امتداد الفيديو.</p>

<p><bdi dir="ltr">[01:43]</bdi> لذلك لتثبيت TanStack Router، نحتاج إلى تثبيت هذه الحزم (packages). سأقوم بـ npm install. وكما ترون ها هنا: @tanstack/react-router و @tanstack/react-router-devtools. نحتاج إلى تثبيت هذه الحزم، كما نحتاج إلى Vite plugin ضمن اعتماديات التطوير (dev dependencies). بعد الانتهاء، دعنا نثبّت أيضاً TanStack Router plugin كاعتماديات تطوير (dev dependency).</p>

<p><bdi dir="ltr">[01:59]</bdi> React Router و @tanstack/react-router-devtools. نحتاج إلى تثبيت هذه الحزم، كما نحتاج إلى Vite plugin ضمن اعتماديات التطوير (dev dependencies). بعد الانتهاء، دعنا نثبّت أيضاً TanStack Router plugin كاعتماديات تطوير (dev dependency).</p>

<p><bdi dir="ltr">[02:17]</bdi> لنقشه. ثم بالنسبة إلى Tailwind، سأضيف تثبيتًا إضافيًا هنا، وهو npm install tailwindcss و tailwindcss/vite. هذا كل ما نحتاجه. الآن سندخل إلى Vite config الخاص بنا هنا، و</p>

<p><bdi dir="ltr">[02:37]</bdi> نحتاج إلى إنجاز بعض التعديلات. أولاً، نحتاج إلى استيراد إضافة Tailwind لـ Vite. فلندعم ذلك هنا. كما نحتاج إلى استيراد إضافة TanStack Router لـ Vite، ويمكن إنجاز ذلك by importing tanstackRouter from this import.</p>

<p><bdi dir="ltr">[02:54]</bdi> وكذلك سأُغلق إكمالات Copilot، لأنني أعتقد أنّها ستكون مزعجة لك.</p>

<p><bdi dir="ltr">[03:02]</bdi> بيد أن، ما نحتاج إلى فعله هو ببساطة استخدام هذه الإضافات في مصفوفة plugins لـ TanStack Router. يجب ضبطه قبل React. لذا هنا يمكن وضع TanStack Router هكذا.</p>

<p><bdi dir="ltr">[03:17]</bdi> و يمكننا تمرير خيارات الآن. فلنمرّر فقط الهدف (target) الذي ستكون React. يمكن أن يكون Solid أيضاً. ثم نحتاج إلى إضافة Tailwind plugin لغرض استخدم Tailwind ضمن app. والآن ما الذي نحتاج إلى</p>

<p><bdi dir="ltr">[03:33]</bdi> فعله هو فقط لغرض استخدم Tailwind، دعنا نفتح main styles index.tss هنا and استورد Tailwind هكذا.</p>

<p><bdi dir="ltr">[03:43]</bdi> كذلك سأقوم ربما حذف بعض هذه الأنماط الافتراضية. دعنا حذف الكل لكن ربما احتفظ بـ أنماط الأزرار. على سبيل المثال، دعنا حذف هذا.</p>

<p><bdi dir="ltr">[03:57]</bdi> نص H1 body.</p>
<p><bdi dir="ltr">[04:00]</bdi> فقط حذف هذه واحتفظ بـ الأنماط الجذر، أنماط الأزرار وأنماط الوضع الداكن أو الوضع الفاتح أيضاً. يجب أن يكون تطبيقنا. دعنا جرّب تشغيله بـ npm run dev ودعنا جرّب فتحه في المتصفح. ونحن</p>

<p><bdi dir="ltr">[04:18]</bdi> هناك خلل هنا. يمكن تجاهل هذا حالياً، لكن دعنا الآن نفتح هذا الرابط في المتصفح هكذا. والآن أصبح لدينا هذا التطبيق ويمكننا البدء بالعمل مع TanStack Router. في</p>
