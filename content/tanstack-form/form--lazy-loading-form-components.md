---
title: "التحميل الكسول لمكوّنات النموذج (Lazy Loading Form Components)"
lang: ar
source: "https://www.youtube.com/watch?v=H2T21r5wu3g&t=7482s"
---

الدرس 19 من 21 · دورة TanStack Form الكاملة · 1 دقيقة و44 ثانية

<div class="lecture-video"><iframe src="https://www.youtube.com/embed/H2T21r5wu3g?start=7482&amp;rel=0" title="التحميل الكسول لمكوّنات النموذج (Lazy Loading Form Components) — الفيديو الأصلي" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>

<p>الفيديو الأصلي باللغة الإنجليزية. إذا تعذّر تشغيله هنا، <a href="https://www.youtube.com/watch?v=H2T21r5wu3g&t=7482s" target="_blank" rel="noopener noreferrer">شاهده على موقع المؤلف</a>. التفريغ النصي العربي الكامل أدناه.</p>

> **مستودع شيفرة هذا الدرس**
>
> الفرع: [`lazy-loading`](https://github.com/alialaa/tanstack-form-course/tree/lazy-loading)


<p><bdi dir="ltr">[00:01]</bdi> حتى الآن رائع. غير أنّه — في بعض الحالات — قد يكون لديك الكثير من مكوّنات النموذج ومكوّنات الحقول التي تعرّفها هنا في form.tsx. وفي هذه الحالة، إذا استوردتَ مكوّناتك هكذا، فستكون مضمَّنةً في حزمتِك في</p>

<p><bdi dir="ltr">[00:16]</bdi> حزمة JavaScript لديك حتى لو لم تكن تستخدمها جميعًا في جميع نماذجك.</p>

<p><bdi dir="ltr">[00:22]</bdi> فإذًا ما يمكننا فعله هو أننا نستورد هذه المكوّنات استيرادًا كسولًا (lazily) كي لا تكون مضمَّنةً في حزمة JavaScript لدينا. غير أنّها لن تُحمَّل إلا عندما تكون مطلوبةً فعلًا في نموذجٍ معيّنٍ نحاول</p>

<p><bdi dir="ltr">[00:35]</bdi> عرضه. فإذًا يمكن عمل هذا ببساطة بدلًا من الاستيراد هكذا، يمكننا فقط أن نستورد lazy من React. إذًا نستورد lazy من React ثم يمكننا ببساطة أن نستورد مكوّناتنا استيرادًا كسولًا هكذا.</p>

<p><bdi dir="ltr">[00:50]</bdi> فإذًا الشيء نفسه: TextInput، وSelect، وCheckbox، وSubmitButton. غير أنّنا نستورد باستخدام lazy ونركّبها بالطريقة نفسها. وعندما نفعل ذلك فسيلزمنا فقط أن نلفّ مكوّن النموذج لَدَينا بـ Suspense. فتذكّر — في</p>

<p><bdi dir="ltr">[01:06]</bdi> app.tsx، وهذا هو المكان الذي نعرض فيه نموذج التسجيل لَدَينا. وبما أنّ لَدَينا هنا أشياء تُحمَّل كسولًا، فسيلزمنا أن نلفّه بـ Suspense كي يكون لَدَينا بديل تحميل (fallback) بينما تُحمَّل مكوّناتنا. فإذًا يمكننا</p>

<p><bdi dir="ltr">[01:19]</bdi> استيراد Suspense. عذرًا، Suspense من React. لنلفّ نموذجنا به. ثم يمكننا أن نوفّر fallback. يمكنك أن تفعل أي شيء. أنا فقط سأضع، في هذه اللحظة، وسم p بالنصّ Loading هكذا.</p>

<p><bdi dir="ltr">[01:36]</bdi> والآن إذا حدّثنا، فقد تجد في هذا — ربّما — أقلّ من ثانيةٍ من التحميل حتى تُحمَّل مكوّناتنا ثم يُعرض نموذجنا. لقد تمكّنّا</p>
