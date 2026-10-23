---
title: "المسارات المسطحة"
---

## ماذا سنتعلّم؟

في الدروس السابقة نظّمنا المسارات والتخطيطات المتداخلة بإنشاء مجلدات فرعية متداخلة داخل مجلد `routes`؛ فكان لكل تخطيط أو مسار فرعي مجلدٌ يحمل اسمه وبداخله ملفات المسارات. ورغم وضوح هذا الأسلوب، فإنه قد يؤدي في المشاريع الكبيرة إلى تداخلات شجرية عميقة في بنية الملفات.

في هذا الدرس سنتعلّم أسلوب **المسارات المسطحة (flat routes)** في `TanStack Router`، وهو بديلٌ يتيح لنا تسطيح مجلد `routes` بالكامل؛ بحيث تصبح جميع المسارات والتخطيطات ملفات مفردة على نفس المستوى، ونعبّر عن التداخل والتخطيطات باستخدام الفواصل النقطية (`.`) في أسماء الملفات.

## فكرة التسطيح باستخدام الفواصل النقطية

الفكرة الجوهرية بسيطة: بدلًا من إنشاء مجلد باسم `_settingsLayout` وبداخله `route.tsx`، ننشئ ملفًا مباشرًا باسم `_settingsLayout.tsx` ليمثّل التخطيط. ثم نربط المسارات الفرعية بهذا التخطيط بكتابة اسم التخطيط متبوعًا بنقطة ثم اسم المسار الفرعي.

هكذا يبدو ملف التخطيط المسطح `src/routes/_settingsLayout.tsx`:

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Nav from "./-components/Nav";

export const Route = createFileRoute("/_settingsLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _settingsLayout
      <Nav />
      <Outlet />
    </div>
  );
}
```

لاحظ أننا نقلنا مكوّن التنقّل `Nav` إلى مجلد `-components` داخل `routes`، واستوردناه في ملف التخطيط مباشرة دون الحاجة إلى مجلدات متداخلة.

## تداخل المسارات الفرعية في التخطيط

لإنشاء مسار فرعي يتبع تخطيط `_settingsLayout`، نستخدم النقطة (`.`) للفصل بين مقاطع المسار في اسم الملف. فبدلًا من وضع الملفات داخل مجلدات، نعرّف مسار الإعدادات العام `_settingsLayout.settings.tsx` هكذا:

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_settingsLayout/settings/"!
      <Outlet />
    </div>
  );
}
```

ولإضافة صفحات فرعية إضافية داخل مسار الإعدادات، مثل صفحة الدفع وصفحة الملف الشخصي، ننشئ ملفين مسطحين باسمين يعبّران عن المسار الكامل:
- `src/routes/_settingsLayout.settings.payment.tsx`
- `src/routes/_settingsLayout.settings.profile.tsx`

هذا هو محتوى مسار الدفع في `src/routes/_settingsLayout.settings.payment.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_settingsLayout/settings/payment"!</div>
}
```

يفهم مُولِّد المسارات التلقائي في `TanStack Router` هذه التسمية ويبني شجرة المسارات بنفس البنية والتداخل تمامًا كما لو كانت مقسمة عبر مجلدات متداخلة.

## استثناء المسارات من التخطيطات

تعلّمنا في درس التخطيطات متعدية المسار كيفية استخدام الشرطة السفلية اللاحقة (`_`) لكسر وراثة التخطيط. في أسلوب المسارات المسطحة يظل هذا المبدأ ساريًا بالكامل؛ فإذا أردنا إنشاء مسار لكلمة المرور لا يرث تخطيط `settings`، ننشئ ملفًا باسم `src/routes/_settingsLayout.settings_.password.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings_/password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings_/password"!</div>
}
```

تخبر الشرطة السفلية بعد `settings_` الموجّه بأن هذا المسار لا يرث مكوّنات التخطيط السابقة له في الشجرة، مع بقائه متاحًا على العنوان المطلوب.

## النتيجة

بعد تحويل مجلد المسارات إلى بنية مسطحة بالكامل، يعمل التطبيق والتنقل بين صفحات الإعدادات والدفع بنفس الكفاءة والسلوك:

![صفحة الدفع داخل تخطيط الإعدادات باستخدام المسارات المسطحة](/images/tanstack-router/router--flat-routes--settings-payment.png)

تمنحنا المسارات المسطحة حرية الاختيار؛ فيمكنك الاعتماد عليها بالكامل لتجنّب شجرة المجلدات العميقة، أو الدمج بينها وبين المجلدات بحسب ما يناسب حجم مشروعك وفريقك.

## جرّب بنفسك

1. راقب شجرة المسارات في أدوات التطوير (`TanStack Router Devtools`) ولاحظ كيف تتطابق تمامًا مع الشجرة التي بُنيت سابقًا باستخدام المجلدات المتداخلة.
2. أضف مسارًا مسطحًا جديدًا باسم `_settingsLayout.settings.notifications.tsx` وتأكد من ظهوره تلقائيًا داخل تخطيط الإعدادات مع إمكانية الوصول إليه عبر الرابط المناسب.

## المراجع

- [فيديو الدرس: المسارات المسطحة](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=2743s)
- [فرع الدرس على GitHub (`flat-routes`)](https://github.com/alialaa/tanstack-router-course/tree/flat-routes)
- [توثيق شجرة المسارات والمسارات المسطحة في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees)

---

> هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «المسارات المسطحة» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع `flat-routes` للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.
