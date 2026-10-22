---
title: "تحرير الإعدادات عبر JSON"
---

يوفّر محرّر الإعدادات واجهة مرئية مريحة، لكن تحرير ملف `settings.json` مباشرةً يمنحك تحكّمًا أكثر تقدمًا وهو ضروري لبعض التخصيصات. وملفات `settings.json` هي ملفات نصية عادية مصاغة بتنسيق JSON (JavaScript Object Notation).

## الوصول إلى `settings.json`

- **محرّر الإعدادات:** في محرّر الإعدادات، انقر أيقونة “Open Settings (JSON)” في الزاوية العلوية اليمنى. وسيفتح ذلك ملف `settings.json` للنطاق المحدّد حاليًا (User أو Workspace).
- **لوحة الأوامر:** افتح لوحة الأوامر (`Ctrl+Shift+P` أو `Cmd+Shift+P`) ونفّذ “Preferences: Open Settings (JSON)“. يفتح ذلك ملف `settings.json` الخاص بـ User. ولفتح ملف `settings.json` الخاص بـ Workspace، نفّذ “Preferences: Open Workspace Settings (JSON)“.

وحسب نظامك الأساسي، يقع ملف إعدادات المستخدم هنا:

- **Windows** `%APPDATA%\Code\User\settings.json`
- **macOS** `$HOME/Library/Application\ Support/Code/User/settings.json`
- **Linux** `$HOME/.config/Code/User/settings.json`

### صياغة JSON ومخطّطه

```json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code",
  "editor.lineHeight": 22,
  "workbench.colorTheme": "Dracula",
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  },
  "explorer.confirmDelete": false,
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.fontFamily": "monospace",
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false
}
```

## تهيئة متقدّمة باستخدام `settings.json`

**التعليقات:** في حين أن JSON نفسه لا يدعم التعليقات، فإن ملف `settings.json` في Visual Studio Code يسمح بالتعليقات أحادية السطر (`//`) ومتعددة الأسطر (`/* … */`) للتوثيق والملاحظات.

**إعدادات شرطية:** يمكنك استخدام إعدادات خاصة بلغة معيّنة داخل `settings.json` لتطبيق تهيئات على لغات محدّدة فقط. مثلًا:

```json
{
  "[python]": {
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "python.linting.pylintEnabled": true
  },
  "[javascript]": {
    "editor.tabSize": 2,
    "editor.insertSpaces": true
  }
}
```

يضبط هذا المثال `tabSize` على 4 ويمكّن `pylint` لملفات Python، بينما يضبط `tabSize` على 2 لملفات JavaScript. ويُحاط معرّف اللغة (مثل `python` و `javascript`) بقوسين مربّعين `[]`. وتجد معرّفات اللغات في محدّد Language Mode في الزاوية السفلية اليمنى من Visual Studio Code.

**إعدادات المصفوفات والكائنات:** الإعدادات التي تكون مصفوفات أو كائنات يسهل غالبًا ضبطها مباشرةً في `settings.json`. فمثلًا، إعداد `files.exclude`، وهو كائن، يُعدّل عادةً في `settings.json` لإضافة أنماط الملفات التي تريد استثناءها من مستكشف الملفات أو إزالتها.

**البرمجة والأتمتة:** يمكن توليد ملفات `settings.json` أو تعديلها برمجيًا، ما يتيح برمجة تهيئة Visual Studio Code وأتمتتها. ويفيد ذلك في تهيئة بيئات تطوير متّسقة عبر الفرق، أو في ضبط الإعدادات ديناميكيًا بناءً على سكربتات أو متغيّرات بيئة.
