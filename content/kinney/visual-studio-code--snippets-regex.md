---
title: "المقتطفات والتعبيرات النمطية"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/snippets-regex"
---

افترض أنك تريد توليد اسم ثابت في TypeScript بناءً على اسم الملف، بتحويل `hello-world.ts` إلى `HELLO_WORLD`. ومجموعات الالتقاط واستبدالات التعبيرات النمطية هما حليفاك هنا:

```json
"Uppercase Constant from Filename": {
  "prefix": "constfile",
  "body": [
    "const ${TM_FILENAME_BASE/(.*)/${1:/upcase}/} = '$1';"
  ],
  "description": "Creates an uppercase constant from filename"
}
```

لكن انتظر، هذا المقتطف حاليًا يجعل اسم الملف كاملًا بأحرف كبيرة فقط دون التعامل مع الشرطات. ولمعالجة ذلك، جرّب تحويل التعبير النمطي المحسّن هذا:

```json
"Snake Case Constant from Filename": {
  "prefix": "snakeconst",
  "body": [
    "const ${TM_FILENAME_BASE/([a-zA-Z0-9]+)([-_]*)/${1:/upcase}${2:+_}/g} = '$1';"
  ],
  "description": "Transforms filename (e.g., hello-world) into UPPER_SNAKE_CASE constant"
}
```

الآن يتحوّل `hello-world.ts` كالسحر إلى:

```typescript
const HELLO_WORLD = 'hello-world';
```

ويضيف الشرط `+_` (`${2:+_}`) شُرَطًا سفلية فقط إذا كانت هناك شرطات أو شُرَط سفلية بين المقاطع، فيضمن ألا تنتهي أبدًا بشرطات سفلية زائدة.

## استبدالات شرطية بالتعبيرات النمطية

تحتاج أحيانًا إلى شروط في مقتطفاتك. فمثلًا، تحويل نص محدّد إلى صيغة المفرد أو الجمع:

```json
"Pluralize selected word": {
  "prefix": "pluralize",
  "body": "${TM_SELECTED_TEXT/(.*?)(y|s)?$/${2:?${2/(y|s)/${2:/downcase}/}es:${1}s}/}",
  "description": "Pluralizes the selected English word"
}
```

وإليك كيف يعمل:

- إذا انتهى النص المحدّد بـ `y` أو `s`، جمّعه جمعًا صحيحًا: `city` → `cities` `class` → `classes`
  - `city` → `cities`
  - `class` → `classes`
- وإلا، أضاف ببساطة `s`: `dog` → `dogs`
  - `dog` → `dogs`

والتقاطات التعبير النمطي (`(.*?)` و `(y|s)?`) والشروط (`${2:?…:…}`) هي السرّ الذي يجعل ذلك ممكنًا.

> **هذا هو التحذير المعتاد بشأن التعبيرات النمطية**
>
> أنماط التعبيرات النمطية المعقّدة قوية لكنها قد تتشعّب بسرعة. فاختبر مقتطفاتك دائمًا بمدخلات متنوّعة لتضمن سلوكًا متّسقًا. فلا أحد يحبّ أخطاء التعبيرات النمطية في الثانية صباحًا.
