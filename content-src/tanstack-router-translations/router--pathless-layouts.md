---
title: "التخطيطات بلا مسار (Pathless Layouts)"
---

## ماذا سنتعلّم؟

في الدرس السابق بنينا إعداداتٍ متداخلة: `/settings` مسارٌ أب، و`/settings/payment` و`/settings/profile` أبناء له، ويعرض المسارُ الأبُ تنقّلًا مشتركًا فوق أبنائه. لكن هذا المسارَ الأب له **عنوان** في الرابط، فإن أردتَ تنقّلًا مشتركًا يجمع مجموعة صفحاتٍ لا تريد لها عنوانًا خاصًّا، ستضطر إلى اختلاق عنوان زائد مثل `/settings-group` لا معنى له.

في هذا الدرس نتعلّم كيف يجعل TanStack Router المسارَ الأب بلا عنوان في الرابط، مع إبقائه أبًا حقيقيًا في شجرة المسارات: تضع ملفاته في مجلّدٍ يبدأ بشرطةٍ سفلية (`_`)، فيبقى في الشجرة ويُعرض كتخطيطٍ مشترك، لكن عنوان الصفحة يبقى `/settings/payment` لا `/_settingsLayout/settings/payment`.

## المسارُ الأب الذي نحتاجه

تخيّل شجرة المسارات على النحو التالي:

- `settings/route.tsx` — تخطيطٌ فيه شريط تنقّل
- `settings/payment.tsx` — صفحة الدفع
- `settings/profile.tsx` — صفحة الملف الشخصي

المسارُ الأب `/settings` هنا له عنوان، فكل رابطٍ إلى أحد أبنائه يبدأ بـ`/settings`. ولأننا نريد واجهةً مشتركة بين هذه الصفحات، نحتاج أحيانًا إلى أبٍّ يشترك أبناؤه في واجهته دون أن يفرض عنوانًا على الرابط.

الحلّ الذي تقدّمه المكتبة هو **تخطيطٌ بلا مسار** (pathless layout): أبٌ في شجرة المسارات يعرض واجهته المشتركة، لكنّه لا يُسهم في بناء عنوان الصفحة.

## اصطلاح الشرطة السفلية

اصطلاح TanStack Router بسيط: **أيّ مجلّدٍ يبدأ بشرطةٍ سفلية لا يُسهم في المسار**. وهذا ما نراه في شجرة الملفات بعد التعديل:

- `_settingsLayout/route.tsx` — المسارُ الأب بلا عنوان
- `_settingsLayout/settings/index.tsx` — الصفحة `/settings`
- `_settingsLayout/settings/payment.tsx` — الصفحة `/settings/payment`
- `_settingsLayout/settings/profile.tsx` — الصفحة `/settings/profile`

وهكذا يكون الملفُ الأب هكذا:

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

لاحظ ثلاث نقاط في هذا الملف:

1. **اسم المسار** في `createFileRoute("/_settingsLayout")` يحمل الشرطةَ السفلية، وهي التي تُخرج المجلّد من المسار.
2. **`<Outlet />`** هو مكانُ عرض المسار الابن، كما في المساراتِ الأبِّ الاعتيادية تمامًا.
3. **روابط التنقّل** تشير إلى العناوين النهائية (`/settings/payment`)، لا إلى مسارات المجلّدات؛ فالعلاقة بين شجرة المسارات وعنوان الصفحة أمران منفصلان.

## إبقاء العناوين كما كانت

نقلنا المجلّد `settings/` كاملًا إلى `_settingsLayout/`، فصارت أسماؤُ الملفات `_settingsLayout/settings/payment.tsx`، وبما أنّ الشرطةَ السفلية لا تُسهم في المسار فصار العنوان `/settings/payment` كما كان. أمّا الصفحةُ الأمّ `/settings` فلم تعد لها ملفٌ مستقلّ، لأنّ المجلّد `settings` لم يعد مجلّدًا فيه `route.tsx`، فأنشأنا له ملفَّ `index.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_settingsLayout/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_settingsLayout/settings/"!</div>
}
```

وثمّة صفحاتُ الإعدادات نفسها، وكلّها فارغةٌ من المنطق:

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

## النتيجة

![تخطيطٌ بلا مسار يعرض شريط تنقّل بين صفحات الإعدادات فوق صفحة «General»](/images/tanstack-router/router--pathless-layouts--settings.png)

في الصورة: الشريطُ الأصفر في الأعلى (General / Payment / Profile) هو التخطيطُ بلا مسار، وهو معروضٌ فوق أيٍّ من أبنائه الثلاثة. ولو انتقلتَ إلى `/settings/payment` لبقي الشريطُ نفسه معروضًا، لأنّ المسارَ الأب يبقى والدًا في شجرة المسارات وإن لم يكن له عنوان.

## تمييز الرابط النشطّ بدقّة

لاحظ في الشيفرة أعلاه أنّ رابط «General» يمرّر `activeOptions` بخيار `exact`. السبب: الرابطُ إلى `/settings` يُعدّ نشطًا تلقائيًا عندما يكون العنوانُ الحالي هو `/settings` **أو** أيّ عنوانٍ يبدأ به، مثل `/settings/payment`. وبما أنّنا نريد إبراز «General» وحده على `/settings`، منعنا التطابقَ الجزئي:

```tsx
        <Link
          to="/settings"
          activeOptions={{
            exact: true,
          }}
          className="[&.active]:font-bold"
        >
          General
        </Link>
```

ويمكن تمرير `exact` على مستوى الرابط الواحد كما هنا، أو على مستوى الموجّه كلّه عند تعريفه.

## جرّب بنفسك

1. أنشئ المجلّد `src/routes/_settingsLayout/` وانقل إليه مجلّد `settings` كاملًا.
2. أضف ملف `_settingsLayout/route.tsx` فيه شريطُ تنقّل و`<Outlet />`، كما في المثال أعلاه.
3. أضف `src/routes/_settingsLayout/settings/index.tsx` ليظهر العنوان `/settings`.
4. شغّل `npm run dev`، ثم افتح `/settings/payment` وتأكّد من ظهور الشريط المشترك وأنّ عنوان المتصفّح لا يحوي `_settingsLayout`.

## المراجع

- [فيديو الدرس: Pathless Layouts](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=2239s)
- [شيفرة الدرس: فرع pathless-layouts](https://github.com/alialaa/tanstack-router-course/tree/pathless-layouts)
- [التوثيق الرسمي لـ TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview)

---

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Pathless Layouts» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.
