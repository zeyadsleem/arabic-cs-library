---
title: "طرق أخرى للتنقّل البرمجي"
---

## ماذا سنتعلّم؟

الأصل في التنقّل داخل تطبيقات الويب أن يُبنى على الروابط الصريحة باستخدام مكوّن `Link`؛ فهو الخيار الأمثل لسهولة الوصول (`accessibility`) وتجربة المستخدِم. غير أنّ هناك حالات يتعذّر فيها استخدام الرابط، مثل الرغبة في التوجيه تلقائيًا بعد إرسال استمارة (`form submission`) أو اكتمال عملية غير متزامنة، أو عند الحاجة لإعادة التوجيه الشرطي أثناء التصيير.

في هذا الدرس سنتعلّم:
1. كيفية استخدام خُطّاف التوجيه البرمجي `useNavigate` داخل مكوّنات `React`.
2. إمكانية التنقّل البرمجي المباشر عبر كائن `router` من خارج مكوّنات `React`.
3. إعادة التوجيه الإعلاني (`declarative redirection`) باستخدام مكوّن `Navigate`.

## التوجيه بعد العمليات عبر خُطّاف `useNavigate`

تخيّل أن لدينا استمارة لتعديل المنشور في المسار `src/routes/posts_.$postId.edit.tsx`، وبعد حفظ البيانات نريد إعادة المستخدِم تلقائيًا إلى صفحة المنشور السابقة. لا يمكننا هنا وضع رابط ينقر عليه المستخدِم، بل نحتاج إلى كود برمجي ينفّذ الانتقال عند انتهاء الإرسال.

نستورد خُطّاف `useNavigate` من `@tanstack/react-router`، وننشئ دالة التنقّل مع تمرير `from: Route.fullPath` لدعم المسارات النسبية:

```tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/posts_/$postId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({
    from: Route.fullPath,
  });
```

ثم نستدعي دالة `navigate` داخل معالج الإرسال `onSubmit`:

```tsx
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate({
            to: "..",
          });
        }}
      >
        <button>Submit</button>
      </form>
```

تقبل دالة `navigate` نفس الخيارات التي نمررها إلى مكوّن `Link`، بما فيها المسارات النسبية والمعاملات، وبفضل تحديد نقطة البداية `from` تمكّنا من استخدام `to: ".."` للرجوع مستوى واحدًا إلى الوراء في شجرة المسارات.

## التنقّل خارج المكوّنات عبر كائن `router`

بالإضافة إلى الخُطّاف `useNavigate` الذي يعمل داخل مكوّنات `React`، يتيح لنا كائن الموجّه العام `router` (المُعرَّف في `src/main.tsx`) استدعاء دالة `router.navigate()` مباشرة من أي مكان داخل التطبيق، حتى خارج دورة حياة المكوّنات، مثل معالجات الأخطاء العامة أو طبقات الشبكة.

## إعادة التوجيه الشرطي عبر مكوّن `Navigate`

إذا أردنا تحويل المستخدِم إلى مسار آخر فور محاولته زيارة صفحة معينة وفق شرط محدد، فمن الأفضل عدم استخدام الخُطّاف داخل مؤثرات جانبية؛ بل نعتمد على مكوّن `Navigate` الذي يوفره `TanStack Router` للتوجيه الإعلاني المباشر.

في ملف `src/routes/about.tsx`، يمكننا فحص الشرط وإرجاع مكوّن `Navigate` بدل تصيير محتوى الصفحة:

```tsx
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  if (true) {
    return <Navigate to="/posts" />;
  }
  return (
    <div className="p-2 bg-pink-600">
      <h3 className="text-xl font-bold">About</h3>
    </div>
  );
}
```

عند محاولة زيارة المسار `/about`، يتحقّق الشرط فورًا ويُوجَّه المستخدِم مباشرة إلى مسار المنشورات `/posts` دون وميض في الصفحة أو تصيير غير ضروري.

## النتيجة

عند زيارة صفحة «عن الموقع» بعد تطبيق التحويل الشرطي، ينتقل المتصفح تلقائيًا إلى مسار المنشورات ويعرض القائمة:

![إعادة التوجيه البرمجي التلقائي إلى مسار المنشورات](/images/tanstack-router/router--other-ways-to-navigate-programmatically--posts.png)

## جرّب بنفسك

1. املأ الاستمارة في صفحة تعديل المنشور واضغط زر الإرسال، ولاحظ كيف ينتظر التطبيق مدة المحاكاة (ثانيتين) ثم ينقلك تلقائيًا إلى صفحة تفاصيل المنشور الأب.
2. غيّر الشرط في صفحة `about` ليصبح غير متحقق، وتأكد من أن الصفحة الوردية تُعرض بشكل طبيعي عند زيارتها.

## المراجع

- [فيديو الدرس: طرق أخرى للتنقّل البرمجي](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=6326s)
- [فرع الدرس على GitHub (`other-navigation`)](https://github.com/alialaa/tanstack-router-course/tree/other-navigation)
- [توثيق التنقّل البرمجي في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/navigation)

---

> هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «طرق أخرى للتنقّل البرمجي» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع `other-navigation` للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.
