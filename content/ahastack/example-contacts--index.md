---
title: "مثال من كتاب Hypermedia Systems"
lang: ar
source: https://ahastack.dev/examples/2-contacts/
---

كتاب [Hypermedia Systems](https://hypermedia.systems/book/contents/) هو الكتاب الضروري الذي يجب أن تقرأه عندما تبدأ باستخدام htmx.

في الكتاب تبني تطبيق إدارة جهات اتصال بسيطًا باستخدام Flask و htmx.

أنشأت مستودعًا يتبع الكتاب باستخدام Astro و htmx بدلًا من ذلك، مع استخدام PocketBase كواجهة خلفية.

استخدم هذا المستودع أثناء قراءتك للكتاب، وإلا فلن يمرّ الأمر عليك بكثير.

تحتوي مجموعة PocketBase على خمسة حقول: `first` و`last` و`phone` و`email`.

تابِع الكتاب واستخدم التزامات (commits) هذا المستودع كمرجع:

[https://github.com/flaviocopes/astromediasystems/commits/main/](https://github.com/flaviocopes/astromediasystems/commits/main/)

ليس منفَّذًا بنسبة 100%، فالكثير من الأمور مفقودة (وهناك الكثير منها فعلًا)، لكنك تستطيع أن تلمح الفكرة عن كيف يكون العمل مع htmx و Astro لبناء تطبيقات Web.

يمكنك الآن أن ترى أثناء العمل: `hx-boost`، والبحث الفوري، وحوارات التأكيد، واستخدام طريقة HTTP `DELETE`، واستخدام `hx-push-url`، و `hx-select`، والترقيم.

لاحظ أن المستودع يستخدم htmx 1. والمفاهيم نفسها في htmx 4، لكن تحقّق من [ملاحظات الترحيل](https://four.htmx.org/docs/#migrating-from-htmx-2x-to-4x) إن نسخت شيفرة منه.
