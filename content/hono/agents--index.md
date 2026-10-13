---
title: "Hono لوكلاء البرمجة"
book: hono
chapter: agents
slug: index
order: 89
source: https://hono.dev/docs/agents/index
lang: ar
---

Hono مناسب جدًا للوكلاء البرمجيين (coding agents). الواجهة البرمجية (API) صغيرة ومبنية على معايير الويب، لذا يعرف الوكيل معظمها بالفعل. تسرد هذه الصفحة ما نقدمه لكي يعمل الوكلاء بشكل جيد مع Hono.

## البدء

أنشئ مشروعًا، ثم شغّل وكيلك فيه.

```sh
npm create hono@next my-app
```

تأتي القوالب بما يحتاجه الوكيل: ملف `AGENTS.md` يخبر الوكيل بكيفية فحص التطبيق، و [Hono CLI](https://hono.dev/docs/agents/cli) كاعتمادية تطوير. لا شيء آخر لإعداده.

## التوثيق للوكلاء (agents)

كل صفحة في هذا الموقع متاحة بصيغة Markdown. يمكنك جلبها باستخدام `Accept: text/markdown` header:

```sh
curl -H 'Accept: text/markdown' https://hono.dev/docs/api/routing
```

للعثور على الصفحة الصحيحة، ابدأ من [`/llms.txt`](https://hono.dev/llms.txt). يسرد كل صفحة مع وصف من سطر واحد. [`/llms-full.txt`](https://hono.dev/llms-full.txt) يحتوي على التوثيق بالكامل في ملف واحد، و [`/llms-small.txt`](https://hono.dev/llms-small.txt) نسخة أقصر.

## مهارات Hono

[مهارات `Hono`](https://github.com/honojs/skills) هي [مهارات الوكيل](https://agentskills.io) لـ `Hono`. إن `hono` تمنح المهارة الوكيل مرجعًا سطريًا لواجهة API وطريقة اختبار الطلبات باستخدام Hono CLI. `hono-jsx` تغطي المهارة واجهة المستخدم بـ `hono/jsx`.

ثبِّتها باستخدام [skills.sh](https://skills.sh) أو [GitHub CLI](https://cli.github.com). كلاهما يضع المهارات حيث يقرؤها وكيلك.

```sh
# skills.sh
npx skills add honojs/skills

# GitHub CLI
gh skill install honojs/skills hono
gh skill install honojs/skills hono-jsx
```

## Hono CLI

[Hono CLI](https://hono.dev/docs/agents/cli) يحمّل تطبيقك مباشرة، لذا يمكن للوكيل (agent) فحصه واختباره دون تشغيل خادم. كل أمر يطبع JSON.

```sh
hono routes          # all routes, without reading the source
hono request /users  # one request, through app.request()
hono batch -         # many requests with expectations, until "failed": 0
hono snapshot        # the current behavior, as batch lines
hono diff            # what changed vs the last commit
```

`hono --help` يبدأ بملاحظة للوكيل (agent)، و `hono <command> --help` يحتوي على أمثلة. لا حاجة لإعداد آخر.

## AGENTS.md

تتبع الوكلاء (Agents) الطريقة التي يحددها مشروعك لتشغيل الأمور والتحقق منها. سطر واحد في `AGENTS.md` كافٍ لدفعهم لاستخدام Hono CLI بدلاً من خادم التطوير. يتعلم الوكيل البقية من `hono --help`. قوالب create-hono تحتوي عليه بالفعل.

```md
## Hono CLI

Run `npx hono --help` first, and use the CLI instead of a dev server.
```

أو قل ذلك للوكيل (agent) مباشرة. السطر نفسه يعمل كمطالَبة (prompt).

## ما مدى جودة استخدام الوكلاء لـ Hono؟

نحن نقيسه. راجع [Agent DX](https://agent-dx.hono.dev) للنتائج.
