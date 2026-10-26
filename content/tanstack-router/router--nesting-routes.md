---
title: "تداخل المسارات (Nesting Routes)"
lang: ar
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=1647s"
---

## ماذا سنتعلّم؟

في الدرس السابق نقلنا الموجّه إلى الأسلوب المعتمد على الملفات، فصار لكلّ مسارٍ ملفٌّ داخل `src/routes/`. ويطالعنا في هذا الدرس سؤالان: كيف نجمع عدّة صفحات تحت أبٍ واحد يعرض واجهةً مشتركة، مثل `/settings` الذي تحت صفحاتُ الملف الشخصي والدفع؟ وكيف نجعل صفحةً داخل صفحةً أخرى في عنوانها؟

الإجابة في هذا الدرس بالمجلّدات: مجلّدٌ داخل مجلّد المسارات، وملفاتٌ داخله. وسنرى فيه مقارنةً بين طريقتين لتحصيل `/settings` نفسه: ملف `index.tsx` الذي يجعله صفحةً مستقلّةً لا علاقة لها ببناتها، وملف `route.tsx` الذي يجعله تخطيطًا يحيط ببناته ويعرضهم في `<Outlet />`. وننتهي إلى حيلةٍ تجعل العنوانَ يبدأ بـ `/settings` لكنّه لا يرث واجهةَ `settings`.

## الشرح

### تداخل المسارات بالمجلّدات

للتداخل طريقتان في TanStack Router: تداخلُ المجلّدات، أو تسميةُ الملفّ على نحوٍ يدلّ على أنّه داخل مسارٍ آخر. نبدأ بالأولى لأنّها الأبسط والأوضح، وهي أيضًا التي تناسب أغلب التطبيقات.

أنشئ داخل `src/routes/` مجلّدًا اسمه `settings`، وضع فيه ملفَّي `profile.tsx` و`payment.tsx`:

- `src/routes/settings/profile.tsx` — العنوان `/settings/profile`
- `src/routes/settings/payment.tsx` — العنوان `/settings/payment`

المولِّد يكتب في كلّ ملف سطرَ تعريف المسار، ويبدأ العنوان تلقائيًا باسم المجلّد:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-amber-700 border-2">Hello "/settings/profile"!</div>
  );
}
```

لاحظ أنّنا لم نكتب `/settings/profile` بيدنا ولا مرّة: المولِّد تركّبه من اسم المجلّد واسم الملف. والصفحةُ الثانية تُكتب بالطريقة نفسها:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/payment")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 bg-amber-700 border-2">Hello "/settings/payment"!</div>
  );
}
```

الآن افتح أدوات المطوّر في التطبيق، وستجد في شجرة المسارات `settings/profile` و`settings/payment`، لكنّك لن تجد `settings` وحدها. أي أنّ فتح العنوان `/settings` لا يطابق شيئًا، لأنّه لا مسارَ يحمل هذا العنوان بالضبط.

### `/settings` وحده: ملف `index.tsx`

الحلُّ الأوّل أن نضيف داخل المجلّد ملفًا اسمه `index.tsx`، فيتولّد له مسارٌ بعنوان `/settings` ينتهي بشرطةٍ مائلة. وهذا الشرطُ المائل مقصود: المسارُ لا يُطابَق إلّا إذا كان عنوان الصفحة `/settings` بالضبط، لا `/settings/…` مع أيّ شيءٍ بعده.

لكنّ هذا الحلّ يجعل `settings` صفحةً مستقلّةً في شجرة المسارات: شقيقةً لـ `settings/profile` و`settings/payment` لا أمًّا لهما. فحين تفتح `/settings/profile` لا تُصيَّر صفحة `settings` ولا يظهر شيءٌ من محتواها، لأنّها ليست جزءًا من ذلك المسار. وفي أدوات المطوّر تراها شقيقةً للاثنين لا أمًّا لهما.

### `/settings` تخطيطًا يجمع أبناءه: ملف `route.tsx`

بدلًا من `index.tsx` نضع داخل المجلّد ملفًّا اسمه `route.tsx`. الملفُّ بهذا الاسم يجعل المسارَ أبًا حقيقيًا، ويلتقط كلَّ عنوانٍ يبدأ بـ `/settings` بما في ذلك `/settings` نفسها:

```tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/settings/"!
      <div className="p-2 flex gap-2 mb-4 bg-yellow-600 border-2">
        <Link to="/settings/payment" className="[&.active]:font-bold">
          Payment
        </Link>{" "}
        <Link to="/settings/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
```

ثلاثةُ أمورٍ تغيّرت مقارنةً بالملف السابق:

1. **العنوان المولَّد** لم يعد منتهيًا بشرطةٍ مائلة، فصار المسارُ يطابق كلَّ عنوانٍ يبدأ بـ `/settings` وعلى رأسه `/settings` نفسها.
2. **`<Outlet />` صار ضرورة**، لأنّ المكوّن صار أبًا: فبدونه يبقى الإطارُ الأمّ معروضًا وفارغًا من محتوى الابن.
3. **شريطُ تنقّلٍ مشترك** أُضيف إلى المكوّن الأمّ، فيه رابطان إلى `Payment` و`Profile`، فيظهر أعلى كلّ صفحةٍ من صفحات الإعدادات.

### التنقّل داخل الإعدادات

النتيجةُ العملية أنّ مكوّن `route.tsx` يبقى معروضًا في كلّ مرّة تنتقل فيها داخل `/settings`، فصار المكانَ الطبيعيّ لروابط التنقّل بين الصفحات الفرعية. ولهذا وُضع شريطُ `Payment` و`Profile` فيه بالضبط.

ولأنّنا صرنا نستخدم عناوينَ أكثر، صارت هذه العناوين تظهر في اقتراحات المحرّر أثناء كتابة روابطٍ جديدة، فتكتب `/settings/profile` فيتلقّاها المحرّر دون أن تحفظه.

### مسارٌ يشارك العنوان ولا يرث الواجهة: مجلّد `settings_`

قد تحتاج إلى صفحةٍ عنوانها يبدأ بـ `/settings` لكنّك لا تريد أن ترث واجهةَ `settings` ولا شريطَ تنقّلها. والمشكلةُ أنّ أيّ ملفٍّ داخل مجلّد `settings` يُعامَل على أنّه ابنٌ لـ `settings`، فلا مفرّ من ذلك. والحلُّ أن تُنشئ مجلّدًا موازيًا اسمه `settings_` بشرطةٍ سفليةٍ في آخره، وتضع فيه ملف `password.tsx`:

- `src/routes/settings_/password.tsx` — العنوان `/settings/password`، لكنّه ابنُ الجذر لا ابنُ `settings`

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings_/password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/settings/passwrod"!</div>;
}
```

انظر إلى العنوان المولَّد داخل الملف: `createFileRoute("/settings_/password")`. الشرطةُ السفلية باقيةٌ في هذا المعرّف الداخليّ، لكنّها لا تظهر في عنوان الصفحة: العنوانُ في المتصفّح يبقى `/settings/password`، والشرطُ الوحيد أنّ الملفَ لا يُعامَل على أنّه داخل `settings`، فلا يرث شريطَ التنقّل ولا نصَّه. (ولن تنتبه إلى خطأٍ إملائيٍّ صغير في النصّ المعروض داخل المكوّن، فهو موجودٌ في فرع الدرس كما هو.)

## النتيجة

![صفحة الملف الشخصي داخل الإعدادات، مع تخطيط settings وشريط التنقّل المشترك في الأعلى](/images/tanstack-router/router--nesting-routes--settings-profile.png)

في الصورة: أوّلًا يظهر تخطيطُ `settings` — أي نصّه وشريطُ التنقّل الأصفرُ فيه رابطان إلى `Payment` و`Profile` — ثم تحته صفحةُ الملف الشخصي في مستطيلها الكهرماني. ولو فتحتَ `/settings/payment` لتبدّل المكوّن الأخير وحده وبقي الشريطُ والتخطيطُ كما هما، لأنّهما في المسار الأب.

## جرّب بنفسك

1. أنشئ مجلّد `src/routes/settings/` وضع فيه `profile.tsx` و`payment.tsx`، ولاحظ المسارات المولَّدة في كلّ ملف.
2. أضف `src/routes/settings/route.tsx` فيه `<Outlet />` وشريطُ تنقّل، وامسح `index.tsx` إن كنت أضفته.
3. أنشئ `src/routes/settings_/password.tsx` وقارن بينه وبين ملفّات مجلّد `settings` في شجرة أدوات المطوّر.
4. شغّل `npm run dev`، ثم تصفّح `/settings` و`/settings/profile` و`/settings/payment` و`/settings/password` ولاحظ أيُّها يعرض الشريطَ المشترك وأيُّها لا يعرضه.

## المراجع

- [فيديو الدرس: Nesting Routes](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=1647s)
- [شيفرة الدرس: فرع nesting-routes](https://github.com/alialaa/tanstack-router-course/tree/nesting-routes)
- [التوثيق الرسمي لـ TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview)

---

> هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Nesting Routes» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.
