---
title: "حزمة AHA للوكلاء الذكيين"
lang: ar
source: https://ahastack.dev/aha/7-ai-agents/
---

تُكتب معظم الشيفرة اليوم وفي حلقة العمل وكيل ذكي (agent). الوكلاء يعرفون React جيّدًا جدًا. ويعرفون htmx أقلّ، و htmx 4 أقلّ من ذلك، ويميلون بدافع من العادة إلى واجهة برمجية بصيغة JSON وإلى استدعاء `fetch()`.

لذلك دوّنت قواعد هذه الحزمة (stack) بصيغة يستطيع الوكلاء قراءتها. إنها مهارة (skill): ملف Markdown يضمّ النموذج الذهني، وتفاصيل Astro، وسمات htmx 4 وكيف تختلف عن htmx 2، والفصل بين htmx و Alpine، والأنماط المأخوذة من [العروض التوضيحية](https://demo.ahastack.dev).

يمكنك قراءته هنا: [https://ahastack.dev/skill.md](https://ahastack.dev/skill.md)

## ثبّتها

[القسم بعنوان «ثبّتها»](#install-it)

إذا كنت تستخدم Skills CLI (وهو يعمل مع Cursor و Claude Code و Codex وغيرها):

نافذة الطرفية

```sh
npx skills add flaviocopes/ahastack.dev@aha-stack
```

أو انسخ الملف يدويًا إلى مجلد المهارات لدى وكيلك:

نافذة الطرفية

```sh
mkdir -p .cursor/skills/aha-stack
curl -o .cursor/skills/aha-stack/SKILL.md https://ahastack.dev/skill.md
```

بالنسبة إلى Claude Code استخدم `.claude/skills/aha-stack/SKILL.md`. وبالنسبة إلى Codex استخدم `.agents/skills/aha-stack/SKILL.md`.

بعد تثبيتها، يحمّلها الوكيل عندما تذكر htmx أو Alpine أو حزمة AHA.

## أو أضِفها إلى AGENTS.md

[القسم بعنوان «أو أضِفها إلى AGENTS.md»](#or-add-it-to-agentsmd)

إن كنت تفضّل ألّا تثبّت شيئًا، فانسخ ما يلي إلى `AGENTS.md` الخاص بمشروعك (أو `CLAUDE.md`). وهذه هي النسخة المختصرة.

```markdown
## Stack

This is an AHA stack app: Astro (output: 'server') + htmx 4 + Alpine.js 3.
Full rules: https://ahastack.dev/skill.md

- The server owns the state. Endpoints return HTML fragments, never JSON.
- Fragments are `.astro` files under `src/pages/api/` with `export const partial = true`.
- htmx for anything that talks to the server. Alpine for UI-only state (open, editing, hover).
- One `.astro` component renders a piece of UI both on page load and inside an htmx response.
- htmx 4: attributes do not inherit (use `:inherited`), 4xx/5xx responses are swapped,
  oob-only responses skip the main swap, events are `htmx:after:request` style.
- Alpine directives need an `x-data` ancestor. Never keep app data in `x-data`.
- Read-modify-write goes in one SQL statement (`UPDATE ... RETURNING`).
- Astro 7 collapses newlines between text and inline tags. Keep such paragraphs on one line.
```

يحتوي [مشروع العرض التوضيحي](https://github.com/flaviocopes/ahastack.dev/tree/main/demo) على ملف `AGENTS.md` يمكنك الاطلاع عليه كنموذج.

## لماذا مهارة بدل ملف AGENTS.md أطول

[القسم بعنوان «لماذا مهارة بدل ملف AGENTS.md أطول»](#why-a-skill-and-not-a-longer-agentsmd)

يُحمَّل `AGENTS.md` في كل دورة. أما المهارة فلا تُحمَّل إلا حين تكون ذات صلة. والمهارة نحو 250 سطرًا. وهذا كثيرٌ لتحمّله معك وأنت تُصلح خطأً في CSS.

المقتطف أعلاه هو الجزء الذي يستحق التحميل في كل مرة. أما المهارة فهي الجزء الذي يستحق التحميل حين يكون الوكيل على وشك كتابة نقطة نهاية (endpoint) بـ htmx.

## وكلاء يتصفّحون الموقع

[القسم بعنوان «وكلاء يتصفّحون الموقع»](#agents-that-browse-the-site)

هناك أيضًا ملف [llms.txt](https://ahastack.dev/llms.txt) في جذر الموقع. وهو خريطة للموقع موجّهة إلى الوكلاء: المهارة أولًا، ثم صفحات التوثيق والعروض التوضيحية مع سطر واحد عن كلٍّ منها. والوكيل الذي يصل إلى ahastack.dev ويعرف هذا العرف يجد المهارة من تلقاء نفسه.

## إبقاؤها محدَّثة

[القسم بعنوان «إبقاؤها محدَّثة»](#keeping-it-current)

تعيش المهارة في [مستودع الموقع](https://github.com/flaviocopes/ahastack.dev/blob/main/skills/aha-stack/SKILL.md). وحين يغيّر htmx أو Astro شيئًا مهمًا، تتغيّر المهارة معهما. وإن ثبّتّها عبر Skills CLI، فإن `npx skills update` يجلب النسخة الجديدة.
