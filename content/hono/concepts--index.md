---
title: "الفلسفة"
book: hono
chapter: concepts
slug: index
order: 21
source: https://hono.dev/docs/concepts/motivation
lang: ar
---

في هذا القسم، نتحدث عن مفهوم Hono أو فلسفته.

## الدافع

في البداية، أردت فقط إنشاء تطبيق ويب على Cloudflare Workers.
لكن لم يكن هناك إطار عمل (framework) جيد يعمل على Cloudflare Workers.
لذا، بدأت في بناء Hono.

اعتقدت أنها ستكون فرصة جيدة لتعلم كيفية بناء موجّه باستخدام أشجار Trie.
ثم جاء صديق بموجّه (router) سريع للغاية اسمه "RegExpRouter".
ولدَيَّ أيضًا صديق أنشأ وسيط (middleware) المصادقة الأساسية (Basic authentication).

باستخدام واجهات برمجة تطبيقات الويب القياسية (Web Standard APIs) فقط، تمكنا من جعله يعمل على Deno و Bun. عندما سأل الناس "هل يوجد Express لـ Bun؟"، كان بإمكاننا الإجابة، "لا، لكن يوجد Hono".
(على الرغم من أن Express يعمل على Bun الآن.)

لدينا أيضًا أصدقاء يصنعون خوادم GraphQL ومصادقة Firebase ووسيطة Sentry.
كما لدينا أيضًا محوّل لـ Node.js.
نشأ نظام بيئي.

بعبارة أخرى، Hono سريع بشكل مذهل، ويجعل الكثير من الأشياء ممكنة، ويعمل في أي مكان.
يمكننا أن نتخيل أن Hono قد يصبح **معيار معايير الويب (Web Standards)**.
