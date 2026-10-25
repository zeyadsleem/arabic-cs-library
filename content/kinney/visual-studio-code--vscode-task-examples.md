---
title: "المهام: أمثلة"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/vscode-task-examples"
---

## مهام لمشروع Vite

في المثال أدناه، لدينا مهام منفصلة لفحص الشيفرة والاختبار والبناء وتشغيل تطبيق Vite.

توسم خاصية `"group"` مهمة الفحص كمهمة متعلّقة بالبناء ومهمة الاختبار كمهمة في مجموعة الاختبار، ما يتيح وصولًا سريعًا عبر أمري **Run Build Task** و **Run Test Task**. وتشغّل مهمة البناء بناء مشروعك للإنتاج (باستخدام Vite أو `tsc`) وتربط مطابِق مشكلات TypeScript لالتقاط أخطاء الترجمة.

وتعمل مهمة خادم التطوير في الخلفية لتستمر في العمل بينما تراقب تغييرات الملفات. ووسمها بـ `"isBackground": true` يمنع Visual Studio Code من اعتبارها منتهية، فتبقى عاملة حتى توقفها يدويًا.

```json
// .vscode/tasks.json (excerpt)
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lint",
      "type": "npm",
      "script": "lint",
      "group": "build", // Allows Run Build Task to trigger lint
      "problemMatcher": ["$eslint-stylish"] // Highlights ESLint errors in Problems pane
    },
    {
      "label": "Test",
      "type": "shell",
      "command": "npm run test", // Or a direct test runner command
      "group": "test", // Allows Run Test Task to trigger tests
      "problemMatcher": [] // (Attach a matcher if test output can be parsed for errors)
    },
    {
      "label": "Build (Frontend)",
      "type": "shell",
      "command": "npm run build", // Runs Vite or tsc build for frontend
      "problemMatcher": ["$tsc"] // Use TypeScript matcher to catch type errors
    },
    {
      "label": "Dev Server (Frontend)",
      "type": "npm",
      "script": "dev", // Launches Vite dev server
      "isBackground": true, // Mark as long-running background task
      "problemMatcher": "$tsc-watch" // Treat TS compile errors during dev
    }
  ]
}
```

### إضافة خادم خلفي

فلنفترض الآن أننا أردنا *أيضًا* تشغيل واجهة API الخلفية. فيمكننا إضافة بعض المهام الإضافية.

```json
// Compound task to run frontend and backend concurrently
{
  "label": "Dev: Full Stack",
  "dependsOn": ["Dev Server (Frontend)", "Dev Server (API)"]
  // By default, dependsOn tasks run in parallel in separate terminals ([Integrate with External Tools via Tasks](https://code.visualstudio.com/docs/editor/tasks#:~:text=You%20can%20also%20compose%20tasks,executed%20in%20parallel%20by%20default))
},
// The backend API server task might be defined as:
{
  "label": "Dev Server (API)",
  "type": "shell",
  "command": "nodemon src/server.ts",
  "isBackground": true,
  "problemMatcher": []  // (Use a matcher if you want to capture errors in Problems)
},
// Sequential compound task: lint -> test -> build
{
  "label": "Check & Build All",
  "dependsOn": ["Lint", "Test", "Build (Frontend)"],
  "dependsOrder": "sequence"               // Run tasks one by one in the given order ([Integrate with External Tools via Tasks](https://code.visualstudio.com/docs/editor/tasks#:~:text=))
  // "Check & Build All" will run Lint, then Test, then Build (Frontend) sequentially
}
```

## أمثلة أخرى

### ترجمة TypeScript ثم تشغيل اختبارات الوحدة

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Compile TypeScript",
      "type": "shell",
      "command": "tsc -p tsconfig.json",
      "problemMatcher": "$tsc",
      "group": "build",
    },
    {
      "label": "Run Tests",
      "type": "shell",
      "command": "npm run test",
      "group": "test",
      "dependsOn": "Compile TypeScript", // runs compile first, then test
    },
  ],
}
```

- يضمن `dependsOn` اكتمال `Compile TypeScript` قبل `Run Tests`.
- ضُبط `problemMatcher` على `$tsc`، ما يتيح لـ Visual Studio Code إبراز أخطاء TS في المحرّر.

### بناء Docker ودفعه

افترض أن لديك ملف Dockerfile وتريد البناء والدفع إلى سجل حاويات في خطوة واحدة:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Docker Build",
      "type": "shell",
      "command": "docker build -t myrepo/myimage:latest .",
      "problemMatcher": [],
    },
    {
      "label": "Docker Push",
      "type": "shell",
      "command": "docker push myrepo/myimage:latest",
      "problemMatcher": [],
      "dependsOn": "Docker Build",
    },
  ],
}
```

- لا توجد مطابِقات مشكلات مهمة هنا، لكن المهام تمنحك مع ذلك حلًا مريحًا بنقرة واحدة.
- ونربط المهام بـ `dependsOn`.

## استخدام المتغيّرات والمدخلات

يدعم Visual Studio Code [استبدال المتغيّرات](https://code.visualstudio.com/docs/editor/variables-reference) ومدخلات المستخدم. ولنسمح للمستخدم بإدخال بيئة مخصّصة، مثل `production` أو `staging`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Deploy",
      "type": "shell",
      "command": "npm run deploy -- --env ${input:whichEnv}",
    },
  ],
  "inputs": [
    {
      "id": "whichEnv",
      "type": "pickString",
      "description": "Select environment to deploy to",
      "options": ["development", "staging", "production"],
      "default": "development",
    },
  ],
}
```

- عند تشغيل `Deploy`، سيعرض Visual Studio Code منتقيًا لاختيار البيئة، ويستبدل اختيارك في الأمر.
- وهو مثالي للسكربتات التي تختلف حسب البيئة أو حسب معاملات أخرى.
