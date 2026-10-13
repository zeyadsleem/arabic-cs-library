---
title: "الأسئلة الشائعة"
book: hono
chapter: guides
slug: faq
order: 81
source: https://hono.dev/docs/guides/faq
lang: ar
---

هذا الدليل عبارة عن مجموعة من الأسئلة الشائعة (FAQ) حول Hono وكيفية حلها.

## هل يوجد تكوين Renovate رسمي لـ Hono؟

لا يحتفظ فريق Hono حاليًا بـ [Renovate](https://github.com/renovatebot/renovate) الإعدادات.
لذلك، يُرجى استخدام renovate-config التابع لجهة خارجية كما يلي.

في `renovate.json` :

```json
// renovate.json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "github>shinGangan/renovate-config-hono" // [!code ++]
  ]
}
```

انظر [renovate-config-hono](https://github.com/shinGangan/renovate-config-hono) المستودع لمزيد من التفاصيل.
