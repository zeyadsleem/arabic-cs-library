---
title: "استكشاف devcontainer.json"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/exploring-devcontainer-json"
---

خاصية **`image`:** تحدّد هذه الخاصية **صورة Docker** التي تُستخدم أساسًا لحاوية التطوير.

- **مثال:** `"image": "mcr.microsoft.com/devcontainers/javascript-node:18"` (يستخدم صورة Node.js 18 جاهزة من سجل Dev Containers الخاص بمايكروسوفت).
- **الاستخدام:** يمكنك استخدام صور جاهزة من سجلات عامة (مثل Docker Hub و[mcr.microsoft.com](https://www.google.com/search?q=mcr.microsoft.com&authuser=1))، أو صورك المخصّصة الخاصة. والصور الجاهزة مناسبة للبيئات الشائعة، أما الصور المخصّصة فتوفّر تحكّمًا أكبر وإعدادًا مسبقًا أوسع.
- **`dockerFile`:** بدلًا من `image`، يمكنك استخدام `dockerFile` لتحديد مسار **Dockerfile** داخل مشروعك.
- **مثال:** `"dockerFile": "Dockerfile"` (يفترض وجود Dockerfile باسم `Dockerfile` في مجلد `.devcontainer` نفسه).
- **الاستخدام:** استخدم `dockerFile` عندما تحتاج إلى تخصيص بيئة الحاوية تخصيصًا واسعًا يتجاوز ما توفّره الصور الجاهزة. فملفات Dockerfile تتيح لك تعريف كل جانب من جوانب صورة الحاوية.

## `context`

عند استخدام `dockerFile`، تحدّد هذه الخاصية الاختيارية **سياق البناء** (build context) لعملية بناء Docker. وهي افتراضيًا المجلد نفسه الذي يضمّ `dockerFile`. ويمكنك تغييرها عند الحاجة.

## الإضافات

خاصية `extensions` هي **مصفوفة من معرّفات إضافات Visual Studio Code** التي ينبغي تثبيتها تلقائيًا *داخل* حاوية التطوير عند بدء تشغيلها.

```json
"extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
]
```

ويضمن ذلك أن تكون المجموعة نفسها من الإضافات متاحة لكل من يستخدم حاوية التطوير. وتجد معرّفات الإضافات في عنوان URL الخاص بـ Visual Studio Code Marketplace، أو بالنقر بزر الفأرة الأيمن على إضافة في عرض Extensions واختيار “Copy Extension ID”.

## الإعدادات

خاصية `settings` هي **كائن JSON** يتيح لك تعريف إعدادات Visual Studio Code التي ستُطبَّق *داخل* حاوية التطوير.

```json
"settings": {
    "terminal.integrated.shell.linux": "/bin/bash",
    "editor.formatOnSave": true
}
```

## تحويل المنافذ

خاصية `forwardPorts` هي **مصفوفة منافذ** تريد تحويلها من الحاوية إلى جهازك المضيف.

فمثلًا، `"forwardPorts": [3000, 8080, 5432]` (يحوّل المنافذ 3000 و8080 و5432 من الحاوية إلى مضيفك).

وإذا كان تطبيق الويب لديك يعمل على المنفذ 3000 داخل الحاوية، فإن تحويل المنفذ 3000 يتيح لك الوصول إليه عبر `http://localhost:3000` في متصفح جهازك المضيف.

## إعدادات أخرى متنوّعة

**`workspaceFolder`:** يحدّد المسار *داخل الحاوية* الذي سيُثبَّت فيه مجلد مشروعك. وقيمته الافتراضية `/workspace`. ولا تحتاج عادةً إلى تغييرها.

**`postCreateCommand`:** تتيح لك هذه الخاصية تشغيل أوامر الطرفية **مرة واحدة بعد إنشاء الحاوية وتشغيلها للمرة الأولى.**

- **مثال:** `"postCreateCommand": "npm install"` (يشغّل `npm install` بعد إنشاء الحاوية لتثبيت اعتمادات المشروع).
- **الاستخدام:** استخدمه لتثبيت اعتمادات خاصة بالمشروع، أو تهيئة قواعد البيانات، أو تنفيذ مهام إعداد أخرى ينبغي أن تُنفَّذ مرة واحدة فقط.

**`postStartCommand`:** يشبه `postCreateCommand`، لكن هذا الأمر يُنفَّذ **في كل مرة تبدأ فيها حاوية التطوير.** فاستخدمه بحذر لأن التنفيذ المتكرّر قد يؤثّر في زمن بدء التشغيل. ويُستخدم غالبًا لتشغيل خدمات خلفية أو برامج خفية (daemons) تحتاجها بيئة التطوير.

**`remoteUser`:** يحدّد المستخدم الذي تتّصل به داخل الحاوية. وقيمته الافتراضية هي المستخدم المستخدَم عند بناء الصورة أو المستخدَم في تعليمة `USER` في Dockerfile. وقد تحتاج إلى تغييره إذا احتجت إلى سياق مستخدم محدّد.

## مثال

```json
{
  "name": "Node.js Development Container",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode", "ms-vscode.js-debug-nodejs"],
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash",
    "editor.formatOnSave": true,
    "eslint.alwaysShowStatus": true
  },
  "forwardPorts": [3000],
  "postCreateCommand": "npm install"
}
```
