---
title: "إنشاء مساحات عمل متعدّدة الجذور"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/creating-a-multi-root-workspace"
---

1. **افتح Visual Studio Code:** شغّل Visual Studio Code.
2. **أغلق أي مجلد أو مساحة عمل مفتوحة:** إن كانت لديك مساحة عمل أو مجلد مفتوح، فأغلقه بالانتقال إلى **File > Close Folder** أو **File > Close Workspace**.
3. **أنشئ مساحة عمل فارغة:** انتقل إلى **File > Save Workspace As…**. وسيفتح ذلك نافذة حفظ.
4. **اختر الموضع والاسم:** اختر موضعًا في نظام ملفاتك تريد حفظ ملف مساحة العمل فيه. وأعطِ مساحة عملك اسمًا وصفيًا (مثل `my-complex-project.code-workspace`). وسيحفظ Visual Studio Code ملفًا بامتداد `.code-workspace`.
5. **أضف مجلدات إلى مساحة العمل:** بعد إنشاء مساحة العمل الفارغة، سترى لوحة Explorer فارغة. ولإضافة مجلدات، انقر على **File > Add Folder to Workspace…**.
6. **اختر المجلدات:** في نافذة الملفات، انتقل إلى المجلدات التي تريد ضمّها إلى مساحة العمل متعدّدة الجذور واخترها. ويمكنك اختيار عدّة مجلدات من مواضع مختلفة. وانقر **Add**.
7. **احفظ مساحة العمل (إن لم تكن محفوظة بالفعل):** إن لم تكن قد حفظت مساحة العمل بعد، أو إن كنت قد أجريت تغييرات، فانتقل إلى **File > Save Workspace** لحفظ إعداد مساحة العمل الحالي.

## تشريح ملف `.code-workspace`

```json
{
  "folders": [
    {
      "path": "path/to/folder1"
    },
    {
      "path": "path/to/folder2",
      "name": "Custom Folder Name"
    },
    {
      "uri": "git://repo-url?ref#folder-in-repo",
      "name": "Remote Repository Folder"
    }
  ],
  "settings": {
    "editor.tabSize": 2,
    "files.autoSave": "afterDelay"
  },
  "extensions": {
    "recommendations": ["ms-vscode.vscode-typescript", "dbaeumer.vscode-eslint"]
  }
}
```

حين ننتقل إلى المهام والتنقيح، سنرى أنه يمكنك تعريفها أيضًا في ملف `.code-workspace`.
