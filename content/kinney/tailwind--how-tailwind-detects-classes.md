---
title: "كيف يكتشف Tailwind الأصناف"
lang: ar
source: "https://stevekinney.com/courses/tailwind/how-tailwind-detects-classes"
---

يفحص Tailwind مشروعك بحثًا عن أصناف الأدوات المساعدة ليولّد CSS بالحد الأدنى. وهو يحاول في الأساس إزالة كل ما لا تستخدمه وإدراج ما تستخدمه *فعلًا* فقط.

- يتعامل مع الملفات كنص عادي (دون تحليل شيفرة)
- يبحث عن رموز تشبه أسماء الأصناف
- يولّد CSS للأدوات المعروفة

يفحص Tailwind كل الملفات باستثناء المعتاد:

- مدخلات `.gitignore`
- الملفات الثنائية (الصور، والفيديو، وملفات zip)
- ملفات CSS
- ملفات قفل مدير الحزم

> **أسماء الأصناف الديناميكية لا تُكتشف**
>
> - `text-${color}-600` لن يعمل
> - استخدم أسماء أصناف ثابتة كاملة
> - اربط الخصائص بأسماء أصناف كاملة، ولا تبنِها ديناميكيًا

## التسجيل الصريح للمصادر

للملفات التي يفوتها الاكتشاف التلقائي (مثل المكتبات الخارجية)، استخدم `@source` لتسجيل المسارات:

```css
@import 'tailwindcss';
@source '../node_modules/my-library/src/components';
```

اضبط المسار الأساسي باستخدام `source()`:

```css
@import 'tailwindcss' source('./src');
```

تجاهل المسارات باستخدام `@source not`:

```css
@import 'tailwindcss';
@source not '../legacy';
```

عطّل الاكتشاف التلقائي: `source(none)`.

## القائمة الآمنة المضمّنة

اجبر توليد أصناف محدّدة باستخدام `@source inline()` (يحلّ محل مصفوفة `safelist` في Tailwind 3):

```css
@import 'tailwindcss';
@source inline('inline-block');
```

ضمّن المتغيّرات:

```css
@import 'tailwindcss';
@source inline('underline', 'hover:underline', 'focus:underline');
```

أو استخدم توسيع الأقواس:

```css
@import 'tailwindcss';
@source inline('{hover:,focus:,}underline');
```

ولّد نطاقات:

```css
@import 'tailwindcss';
@source inline('{hover:,}bg-red-{100..900 by 100,50,950}');
```

استثنِ الأصناف باستخدام `@source not inline()`:

```css
@import 'tailwindcss';
@source not inline('{hover:,focus:,}bg-red-{100..900,50,950}');
```
