---
title: "المهام: نصائح وحيل"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/vscode-tasks-tips-and-tricks"
---

## مطابِقات مشكلات مخصّصة

يمكنك تعريف مطابِقات مشكلات مخصّصة لتحليل مخرجات أي أداة من أدوات سطر الأوامر. وهذا مفيد جدًا إن كان لديك مصرّف خاصّ أو حلّ مخصّص لفحص الشيفرة. ويستطيع مطابِق مخصّص إبراز مسارات الملفات وأرقام الأسطر في الأخطاء، لتتمكّن من النقر عليها والانتقال مباشرةً إلى الشيفرة.

```json
{
  "problemMatcher": [
    {
      "owner": "customLinter",
      "pattern": [
        {
          "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error)\\s+(.*)$",
          "file": 1,
          "line": 2,
          "column": 3,
          "severity": 4,
          "message": 5,
        },
      ],
    },
  ],
}
```

## خيارات العرض

يمكنك التحكّم في طريقة عرض مخرجات المهمة:

```json
{
  "label": "Verbose Build",
  "type": "shell",
  "command": "npm run build --verbose",
  "presentation": {
    "reveal": "always",
    "panel": "dedicated",
    "echo": true,
    "showReuseMessage": false,
    "clear": true,
  },
}
```

- `reveal`: إظهار اللوحة تلقائيًا أو عند وجود مشكلة فقط (`silent` و `never` وغيرها).
- `panel`: الاحتفاظ بمخرجات كل مهمة في لوحة منفصلة، أو إعادة استخدام لوحة طرفية واحدة.
- `clear`: مسح المخرجات السابقة قبل تشغيل المهمة الجديدة.

## متغيّرات البيئة

هل تحتاج متغيّرات بيئة لمهمة واحدة؟ أدرج `env` في المهمة:

```json
{
  "label": "Build with Env Var",
  "type": "shell",
  "command": "npm run build",
  "env": {
    "NODE_ENV": "production",
    "API_KEY": "xyz123",
  },
}
```

تعامل مع الأسرار بأمان، وتجنّب إيداع أسرار حقيقية في التحكّم في الإصدارات! واستخدم قيمًا نائبة أو اجلبها من مخزن آمن.

## تشغيل المهام تلقائيًا عند فتح مجلد

يمكنك ضبط المهام لتعمل تلقائيًا عند فتح مجلد أو مساحة عمل باستخدام خاصية `runOn`. وهذا مفيد بوجه خاص في تشغيل خوادم التطوير، أو تنفيذ خطوات البناء الأولية، أو تهيئة بيئة تطويرك.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "shell",
      "command": "npm run dev",
      "isBackground": true,
      "problemMatcher": {
        "owner": "custom",
        "pattern": {
          "regexp": ".",
        },
        "background": {
          "beginsPattern": "Starting development server",
          "endsPattern": "Development server started",
        },
      },
      "runOptions": {
        "runOn": "folderOpen",
      },
    },
  ],
}
```

### الخصائص الرئيسية:

- **`runOptions.runOn`:** يحدّد متى تُشغَّل المهمة. وتعني القيمة `"folderOpen"` أن المهمة ستبدأ تلقائيًا عند فتح المجلد.
- **`isBackground: true`:** يوسم المهمة كمهمة خلفية طويلة الأمد لا تعطّل Visual Studio Code.
- **`problemMatcher`:** اضبط أنماطًا لكشف بدء المهمة بنجاح.

### خيارات إضافية لـ `runOn`:

- **`folderOpen`:** العمل عند فتح المجلد أو مساحة العمل
- **`default`:** العمل عند التشغيل الصريح فقط

### نصائح للمهام التي تبدأ تلقائيًا:

**استخدم خيارات `presentation`** للتحكّم في ظهور الطرفية:

```json
"presentation": {
	"reveal": "silent",
	"panel": "dedicated",
	"showReuseMessage": false
}
```

**اجمعها مع اعتماديات المهام** لإنشاء مسارات عمل كاملة للإقلاع:

```json
{
  "label": "Dev Environment",
  "dependsOn": ["Start Backend", "Start Frontend", "Watch CSS"],
  "dependsOrder": "parallel",
  "runOptions": {
    "runOn": "folderOpen",
  },
}
```

**استخدم مطالبات للتأكيد** إن لم ترغب في تشغيل المهمة دائمًا:

```json
"inputs": [
	{
		"id": "confirmStart",
		"type": "pickString",
		"description": "Start development server?",
		"options": ["Yes", "No"],
		"default": "Yes"
	}
],
```
