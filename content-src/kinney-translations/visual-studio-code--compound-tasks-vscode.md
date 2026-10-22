---
title: "المهام المركّبة"
---

تتيح لك المهام المركّبة تشغيل مهام متعددة بالتتابع. ويفيد ذلك في تنسيق مسارات عمل معقّدة.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Task A",
      "type": "shell",
      "command": "echo Task A"
    },
    {
      "label": "Task B",
      "type": "shell",
      "command": "echo Task B"
    },
    {
      "label": "Run A and B",
      "dependsOn": ["Task A", "Task B"],
      "dependsOrder": "sequence",
      "problemMatcher": []
    }
  ]
}
```

- `"dependsOn": ["Task A", "Task B"]` : ستشغّل مهمة `Run A and B` المهام ذات الوسمين `Task A` و `Task B`.
- `"dependsOrder": "sequence"`: ستُشغَّل المهام بالترتيب المعرّف في مصفوفة `dependsOn`.

## فهم اعتماديات المهام: `dependsOn` و `dependsOrder`

عند تنسيق مهام متعددة، تحتاج إلى التحكّم في المهام التي تُشغَّل (`dependsOn`) وفي طريقة تشغيلها بالنسبة إلى بعضها (`dependsOrder`). وتقبل خاصية `dependsOrder` ثلاث قيم، لكل منها سلوك مختلف:

### `sequence` (الافتراضي)

تعمل المهام تسلسليًا بالترتيب المذكور تمامًا في مصفوفة `dependsOn`. ويجب أن تكتمل كل مهمة قبل أن تبدأ التالية.

```json
{
  "label": "Sequential Build and Test",
  "dependsOn": ["Clean", "Build", "Test"],
  "dependsOrder": "sequence"
}
```

وهذا يضمن انتهاء “Clean” قبل بدء “Build”، وانتهاء “Build” قبل بدء “Test”. وإذا فشلت أي مهمة، فلا تعمل المهام اللاحقة.

### `parallel`

تبدأ كل المهام التابعة في الوقت نفسه وتعمل بالتوازي.

```json
{
  "label": "Parallel Assets Build",
  "dependsOn": ["Compile CSS", "Compile JavaScript", "Optimize Images"],
  "dependsOrder": "parallel"
}
```

وهذا يطلق مهام ترجمة الأصول الثلاث كلها دفعة واحدة، ما يمكن أن يسرّع أوقات البناء بدرجة كبيرة للعمليات المستقلة.

### `any`

يبدأ Visual Studio Code المهام بالتوازي، لكن المهمة الرئيسية تكتمل بمجرد انتهاء أي مهمة تابعة. ويفيد ذلك في سيناريوهات «حالة التسابق».

```json
{
  "label": "Development Server",
  "dependsOn": ["Start API Server", "Start Frontend Server"],
  "dependsOrder": "any"
}
```

وفي هذا المثال، تُعدّ مهمة “Development Server” مكتملة عندما يبدأ خادم الـ API أو خادم الواجهة الأمامية بنجاح.

### دمج الاعتماديات

يمكنك إنشاء أشجار مهام معقّدة بدمج الاعتماديات. مثلًا:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Clean",
      "type": "shell",
      "command": "rm -rf dist"
    },
    {
      "label": "Build Frontend",
      "type": "shell",
      "command": "npm run build:frontend",
      "dependsOn": ["Clean"]
    },
    {
      "label": "Build Backend",
      "type": "shell",
      "command": "npm run build:backend",
      "dependsOn": ["Clean"]
    },
    {
      "label": "Run Tests",
      "type": "shell",
      "command": "npm test",
      "dependsOn": ["Build Frontend", "Build Backend"],
      "dependsOrder": "sequence"
    },
    {
      "label": "Full Pipeline",
      "dependsOn": ["Run Tests"],
      "problemMatcher": []
    }
  ]
}
```

في هذا المثال:

1. تعمل مهمة “Clean” أولًا
2. ثم تعمل “Build Frontend” و “Build Backend” (وكلتاهما تعتمد على “Clean”)
3. وبعد اكتمال البناءين، تُنفَّذ “Run Tests” (وهي تعتمد على البناءين)
4. وأخيرًا تكتمل “Full Pipeline” بعد انتهاء “Run Tests”

> **نصيحة**
>
> انتبه إلى حالات التسابق المحتملة عند استخدام `parallel` مع مهام قد تتعارض (مثل مهام تكتب في الملفات نفسها). وفي هذه الحالات، يكون `sequence` أكثر أمانًا.
