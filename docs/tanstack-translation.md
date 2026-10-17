# ترجمة صفحات دورات TanStack (Ali Alaa)

كل درس من الدورتين (34 درسًا في TanStack Router و21 درسًا في TanStack Form)
يُترجم في ملف مستقل. البناء (build-tanstack) ينشر الصفحة عربيًا فقط إذا اجتازت
قواعد `scripts/lib/translation-rules.mjs` (الاستعاضة من `scripts/check-tanstack.mjs`)،
وإلا يُنشر النسخة الإنجليزية حتى لا يتعطل البناء.

## حالة النشر والترخيص

الدورتان هي video courses على YouTube بإذن المؤلف. المستخدم أكّد الإذن
("الإذن مؤكد"). الترجمة غير رسمية. بيع — لا — غير تجاري.

## موضع الملفات

- English source: `content-src/tanstack-router/router--<slug>.md` و
  `content-src/tanstack-form/form--<slug>.md`.
- Arabic translation: `content-src/tanstack-router-translations/router--<slug>.md` و
  `content-src/tanstack-form-translations/form--<slug>.md` (شme identiders exact same name).
- Published output: `content/tanstack-router/`، `content/tanstack-form/` (built by build-tanstack).
- Structure index JSON: `content/tanstack-{router,form}-structure.json`.

## شكل ملف الترجمة

```markdown
---
title: "العنوان العربي (English Title)"
---

النص العربي الكامل للصفحة…
```

عنوان `title` must be Arabic. Do not write `chapter`/`slug`/`order`/`source` — the pipeline
reads them from the English source.

## ما لا يُمس أبدًا (never touch)

1. **الشيفرة** داخل fenced blocks: copy byte-for-byte (whitespace, words, fence language).
   Do not translate comments inside code or rename variable/function/type.
2. **Link targets**: كل `](هدف)` stays same target and order; translate display text only.
3. **صور والمسارات**: translate alt text only, path stays.
4. **HTML tags and attributes** (`div`, `class`, `href`, `src`, `sup`, `table`, …).
5. **Heading anchors** `{#english-slug}` إذا وُجدت — unchanged.
6. **Timestamp stamps** `[MM:SS]` at start of each paragraph — exact.
7. **Branch repository** URLs in the callout — unchanged.

## ما يُترجم

Headers, paragraphs, lists, tables (including headers), text between links, alt text,
callout titles and runk.

## style الترجمة

- عربية فصيحة بضمير المخاطب (ando talking), no emoji, no additions, no omissions.
- Do not truncate any paragraph; do not merge/split lines.
- First occurrence of important term: أصل in parentheses: «المكوّنات (components)»,
  then Arabic only.
- Keep Latin explicitly: TanStack, React, TypeScript, Vite, Zod, GitHub, shadcn/ui,
  Web Workers, React Query, command flags, file paths, names in code.
- مصطلحات standardized library: component = مكوّن | hook = خُطّاف | state = حالة
  | props = خصائص | render = تصيير | cache = ذاكرة مؤقتة | build = بناء
  | module = وحدة | function = دالة | type = نوع | generic = عام.

## Kaynağı (ASR cleanup applied during import)

The English source had YouTube ASR spelling fixes applied during import:
`tenstack`/`tanstack` → TanStack, `nex.js` → Next.js, etc. Already normalized.
No action needed.

## التحقق

```bash
node scripts/check-tanstack.mjs                 # all
node scripts/check-tanstack.mjs --book tanstack-form
node scripts/check-tanstack.mjs router--index.md
```

Output: `PASS` per verified page; `PENDING` = missing translation file;
`FAIL` = broken rule (code block count/changed code, differing links,
low Arabic ratio, excessive Latin run, leftover English lines, unrendered tag,
non-Arabic title).

## Translation	before reporting PASS

Each page must print `PASS` with 0 problems before being counted done.
Pages size ~55k chars max; if needed, split into two writes with cat, then remove temps.

## Assignment of work

- Three concurrent translation subagents maximum.
- Each subagent reads the English source from `content-src/<book>/<key>.md`
  and writes Arabic to `content-src/<book>-translations/<key>.md`.
- Each subagent must validate `node scripts/check-tanstack.mjs <key>` after writing and
  report PASS. Parallel writes don't collide across different page files.
EOF
echo done