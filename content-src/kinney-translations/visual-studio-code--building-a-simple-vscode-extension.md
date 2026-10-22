---
title: "بناء إضافة بسيطة"
---

لنبنِ إضافة بسيطة تعثر على جميع عبارات `FIXME` في ملف JavaScript ثم تُزيّنها بحيث يمكننا رؤيتها بسهولة.

في `extension.js`، لنجعل نضيف ما يلي:

```javascript
const vscode = require('vscode');

// Step A: Define a decoration type
const decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255, 0, 0, 0.3)', // semi-transparent red
});

// Step B: Function to find and decorate words
function decorateWords() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const text = editor.document.getText();
  const regex = /\bFIXME\b/g;

  const ranges = [...text.matchAll(regex)].map((match) => {
    const startPos = editor.document.positionAt(match.index);
    const endPos = editor.document.positionAt(match.index + match[0].length);
    return new vscode.Range(startPos, endPos);
  });

  editor.setDecorations(decorationType, ranges);
}

// Step C: Hook the function into editor/document change events
function subscribeToDocumentChanges(context) {
  // Re-run whenever text changes
  vscode.workspace.onDidChangeTextDocument(() => decorateWords(), null, context.subscriptions);
  // Re-run whenever the active editor changes (switch tabs, etc.)
  vscode.window.onDidChangeActiveTextEditor(() => decorateWords(), null, context.subscriptions);

  // Run at least once on activation
  decorateWords();
}

// This is your extension's main activation
function activate(context) {
  // Register the decorator logic with events
  subscribeToDocumentChanges(context);
}

// export (so VS Code recognizes these functions)
module.exports = {
  activate,
  deactivate: () => {},
};
```

هذه الشيفرة:

- تُنشئ نمط تزيين (خلفية ضاربة إلى الحمرة).
- تبحث عن `FIXME` في المستند الحالي.
- تستدعي `setDecorations` لتُضاء كل حالة كشجرة الأعياد.
- تشترك في الأحداث ذات الصلة لإبقاء التزيينات محدَّثة.

## ربط ملف `package.json`

ينبغي أن يحتوي `package.json` على شيء مثل هذا في قسم `contributes` أو على هذه الحقول على الأقل، ليقرّر VS Code *متى* يُفعّل إضافتك:

```json
{
  "name": "comment-highlighter",
  "displayName": "comment-highlighter",
  "description": "It highlights comments.",
  "version": "0.0.1",
  "engines": {
    "vscode": "^1.98.0"
  },
  "activationEvents": ["onLanguage:javascript", "onLanguage:typescript"],
  "main": "./extension.js",
  "contributes": {
    "commands": [
      {
        "command": "extension.decorateWords",
        "title": "Decorate Words"
      }
    ]
  }
  // …More stuff…
}
```

- يشير `main` إلى `extension.js`.
- `activationEvents`: تخبر Visual Studio Code بتشغيل إضافتك عند محفّزات معيّنة، مثل ما بعد بدء التشغيل أو عند تغيّر المحرّر النشط.

أتريد تزيين كلمات أخرى (مثل `BUG` أو `TODO` أو `WTF` أو «الشيفرة مشتعلة»)؟ أضف فحوصات regex إضافية أو ادمجها في تعبير regex واحد أنيق. فمثلًا:

```javascript
// Catch FIXME, BUG, or TODO
const regex = /\b(FIXME|BUG|TODO)\b/g;
```

ومن الواضح أنك تستطيع أيضًا إضافة مزيد من أنماط التزيين لأنواع مختلفة من الأشياء التي تريد تزيينها.
