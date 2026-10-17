---
title: "دعم الوضع الداكن"
---

هناك عدد من الطرق التي يمكننا بها إضافة الوضع الداكن إلى مكوّننا، لكن لنبدأ بسلوك المسار الأقل مقاومة باستخدام Tailwind، فقد أرسينا الأساس [سابقًا](https://stevekinney.com/courses/storybook/setting-up-tailwind).

يدعم Tailwind أداة مساعدة تُسمّى `dark:` لا تُفعّل الصنف إلا عندما يبدأ عمل *أي شيء* اخترناه لتفعيل الوضع الداكن.

فمثلًا، سيطبّق هذا الصنف الثاني إذا وفقط إذا كنا في الوضع الداكن.

```html
<button class="bg-primary-600 dark:bg-primary-500">Button</button>
```

وفقًا لنظام التصميم لدينا، نستخدم القيم التالية للوضعين الفاتح والداكن.

| الاسم | الفاتح | الداكن |
| --- | --- | --- |
| **Button / Primary** |  |  |
| الافتراضي | Primary/600 | Primary/500 |
| التحويم | Primary/500 | Primary/400 |
| النشط | Primary/400 | Primary/300 |
| النص | White | White |
| الحد | Transparent | Transparent |
| **Button / Secondary** |  |  |
| الافتراضي | White | Slate/900 |
| التحويم | Slate/50 | Slate/800 |
| النشط | Slate/100 | Slate/700 |
| النص | Slate/900 | White |
| الحد | Slate/300 | Slate/900 |
| **Button / Destructive** |  |  |
| الافتراضي | Danger/600 | Danger/500 |
| التحويم | Danger/500 | Danger/400 |
| النشط | Danger/400 | Danger/300 |
| النص | White | White |
| الحد | Transparent | Transparent |
| **Button / Ghost** |  |  |
| الافتراضي | Transparent | Transparent |
| التحويم | Slate/50 | Slate/700 |
| النشط | Slate/100 | Slate/700 |
| النص | Slate/900 | White |
| الحد | Transparent | Transparent |

لذا، يمكننا تحديث مكوّننا كما يلي:

```diff
@@ -33,6 +33,9 @@ export const variants = cva(
           'border-transparent',
           'hover:bg-primary-500',
           'active:bg-primary-400',
+          'dark:bg-primary-500',
+          'dark:hover:bg-primary-400',
+          'dark:active:bg-primary-300',
         ],
         secondary: [
           'bg-white',
@@ -40,6 +43,11 @@ export const variants = cva(
           'border-slate-300',
           'hover:bg-slate-50',
           'active:bg-slate-100',
+          'dark:bg-slate-900',
+          'dark:text-white',
+          'dark:border-slate-900',
+          'dark:hover:bg-slate-800',
+          'dark:active:bg-slate-700',
         ],
         destructive: [
           'bg-danger-600',
@@ -47,6 +55,9 @@ export const variants = cva(
           'border-transparent',
           'hover:bg-danger-500',
           'active:bg-danger-400',
+          'dark:bg-danger-500',
+          'dark:hover:bg-danger-400',
+          'dark:active:bg-danger-300',
         ],
       },
       size: {
```
