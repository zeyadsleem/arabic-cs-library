---
title: "المجلدات المتجاهلة ومجموعات المسارات"
---

## ماذا سنتعلّم؟

في نظام التوجيه المبني على الملفات (file-based routing) في `TanStack Router`، يُعدّ أي مجلد أو ملف يُضاف إلى داخل مجلد `routes` جزءًا من شجرة المسارات. ولكن في التطبيقات الواقعية، غالبًا ما نحتاج إلى وضع مكوّنات مساعدة خاصة بصفحة أو تخطيط معين بجوار ملفات المسار نفسها لتسهيل تنظيم الشيفرة وتجاورها (`colocation`).

في هذا الدرس سنتعلّم:
1. كيفية إنشاء مجلدات متجاهلة (`ignored folders`) داخل مجلد المسارات باستخدام بادئة الشرطة (`-`)، بحيث يتجاهلها مُولِّد المسارات تمامًا ولا يحوّلها إلى عناوين على الويب.
2. التعرّف على مجموعات المسارات (`route groups`) باستخدام الأقواس `(group)` للتنظيم المكتبي دون التأثير في روابط العناوين.

## تجنّب إنشاء مسارات غير مرغوبة عبر بادئة الشرطة `-`

إذا أنشأنا مجلدًا عاديًا باسم `components` داخل مسار مثل `_settingsLayout`، فسيعتبره `TanStack Router` مقطع مسار جديد وينشئ له عنوانًا مثل `/settings/components`.

لتجنّب هذا السلوك وإخبار الموجّه بتجاهل المجلد كليًّا، نضع شرطة أو ناقصًا (`-`) قبل اسم المجلد، مثل `-components`. أي مجلد يبدأ بهذه البادئة يُستثنى تلقائيًا من شجرة المسارات، مما يتيح لنا حفظ مكوّنات الواجهة داخله بأمان:

```tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _settingsLayout
      <div className="p-2 flex gap-2 mb-4 bg-yellow-600 border-2">
        <Link
          to="/settings"
          activeOptions={{
            exact: true,
          }}
          className="[&.active]:font-bold"
        >
          General
        </Link>
        <Link to="/settings/payment" className="[&.active]:font-bold">
          Payment
        </Link>
        <Link to="/settings/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
```

داخل هذا التخطيط نستخدم روابط التنقّل `Link` للتوجّه بين المسارات الفرعية للإعدادات، ونستطيع عزل عناصر واجهة المستخدم داخل المجلد المتجاهل واستيرادها عند الحاجة.

## تنظيم المسارات عبر المجموعات `(group)`

بالإضافة إلى المجلدات المتجاهلة، يتيح لنا `TanStack Router` تنظيم المسارات باستخدام مجموعات المسارات (`route groups`). وتُعرَّف بوضع اسم المجلد بين قوسين دائريين مثل `(app)` أو `(marketing)`.

الميزة في مجموعات المسارات أنها لا تظهر إطلاقًا في رابط العنوان (URL)؛ فهي مخصصة فقط للتنظيم المكتبي لملفات المشروع داخل المحرّر، وتسمح بفصل مناطق التطبيق منطقيًا دون تغيير هيكل الروابط الخارجية التي يراها المستخدِم.

## تكامل المسارات الفرعية مع التخطيطات

تبقى المسارات الفرعية داخل التخطيط نظيفة ومباشرة. فمثلًا يعرض مسار الدفع في `src/routes/_settingsLayout/settings/payment.tsx` محتواه المخصص داخل التخطيط الحاوي:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_settingsLayout/settings/payment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-amber-700 border-2">Hello "/settings/payment"!</div>
  );
}
```

وبفضل المجلدات المتجاهلة، نستطيع تنظيم كل ما يحتاجه هذا المسار بجواره مباشرة دون تلويث شجرة التوجيه.

## النتيجة

عند فتح صفحة الإعدادات أو المسارات المتفرعة منها، نرى شجرة التوجيه في أدوات التطوير (`TanStack Router Devtools`) محتفظةً بمساراتها النظيفة دون أي ظهور للمجلدات التنظيمية:

![شجرة المسارات مع الحفاظ على التخطيطات واستثناء المجلدات التنظيمية](/images/tanstack-router/router--ignored-folders--settings-password.png)

## جرّب بنفسك

1. أنشئ مجلدًا باسم `-helpers` داخل مجلد `routes` وضع بداخله ملف دوال مساعدة، وتأكد من أن أدوات التطوير لم تُنشئ أي مسار لهذا المجلد.
2. احذف الشرطة من بداية اسم المجلد ليصبح `helpers` ولاحظ كيف يلتقطه الموجّه فورًا ويضيفه إلى شجرة المسارات كمسار جديد.

## المراجع

- [فيديو الدرس: المجلدات المتجاهلة ومجموعات المسارات](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=2592s)
- [فرع الدرس على GitHub (`pathless-layouts`)](https://github.com/alialaa/tanstack-router-course/tree/pathless-layouts)
- [توثيق شجرة المسارات في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees)

---

> هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «المجلدات المتجاهلة» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع `pathless-layouts` للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.
