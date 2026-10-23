---
title: "مزيد عن مكوّن الرابط (Link)"
---

## ماذا سنتعلّم؟

في الدروس السابقة استخدمنا مكوّن `Link` للتنقّل بين الصفحات عبر تمرير مسارات مطلقة صريحة إلى الخاصية `to`، مثل `to="/products"` أو `to="/posts"`. ورغم أن هذه الطريقة تؤدي الغرض ومحمية بالكامل بأنواع `TypeScript`، فإن `TanStack Router` يوفّر إمكانيات متقدمة تجعل التنقّل أكثر مرونة وديناميكية.

في هذا الدرس سنتعلّم:
1. تمرير المسارات بصورة ديناميكية باستخدام الخاصية `to` المشتقة مباشرة من كائن المسار المصدر `Route.to`.
2. التنقّل النسبي (`relative navigation`) باستخدام الخاصية `from` لتحديد نقطة الانطلاق، واستخدام المسارات النسبية في `to`.
3. الصعود في شجرة المسارات إلى المسار الأب مباشرة باستخدام المسار النسبي `to=".."`.

## التوجيه الديناميكي عبر `Route.to`

بدلًا من كتابة المسار نصيًّا في كل رابط، يمكننا تصدير كائن المسار واستيراده حيث نحتاجه، ثم استخدام خاصية `to` الموجودة بداخله. ففي ملف `src/routes/index.tsx`، نستورد مسار المنتجات باسم `productsRoute`:

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Route as productsRoute } from "./products.index";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
```

ثم نمرّر `productsRoute.to` إلى مكوّن الرابط `Link`:

```tsx
      <Link
        to={productsRoute.to}
        search={{
          sort_by: "price",
          product_type: "shoes",
          pagination: {
            page: 1,
            pageSize: 10,
          },
          // colors: ["red", "blue"],
          // sale: true,
        }}
      >
        Products with Filters
      </Link>
```

تفيد هذه الطريقة عند إعادة تسمية المسارات أو تعديل بنيتها؛ حيث تُحدَّث الروابط تلقائيًا دون الحاجة لتتبع السلاسل النصية يدويًا عبر صفحات التطبيق.

## التنقّل النسبي باستخدام الخاصية `from`

في المسارات المتداخلة، قد نرغب في الرجوع إلى الوراء أو الانتقال بالنسبة للمسار الحالي بدل كتابة المسار المطلق من الجذر.

داخل صفحة تعديل المنشور في `src/routes/posts_.$postId.edit.tsx`، يمكننا تحديد المسار الذي ننطلق منه عبر الخاصية `from`، ثم استخدام `..` في الخاصية `to` للصعود في شجرة المسارات:

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts_/$postId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/posts/$postId/edit"!
      <br />
      <Link to="/posts">All Posts</Link>
      <br />
      <Link from="/posts/$postId/edit" to="../../../posts">
        All Posts
      </Link>
      <br />
      <Link from={Route.fullPath} to="../../../posts">
        All Posts
      </Link>
      <br />
      <Link to="..">Back to Post</Link>
    </div>
  );
}
```

لاحظ الخيارات المتاحة في الشيفرة السابقة:
- `to="/posts"`: مسار مطلق مباشر إلى قائمة المنشورات.
- `from="/posts/$postId/edit" to="../../../posts"`: تنقّل نسبي يحدّد نقطة البداية ويصعد عبر المستويات للوصول إلى المسار المطلوب مع إكمال تلقائي وتدقيق نوعي صارم.
- `from={Route.fullPath}`: طريقة ديناميكية تحدّد مسار الصفحة الحالية تلقائيًا دون كتابته نصيًّا.
- `to=".."`: يوجّه المستخدِم خطوة واحدة إلى المسار الأب المباشر في الشجرة (وهو صفحة المنشور نفسه `/posts/$postId`) دون الحاجة لتحديد خاصية `from`.

## النتيجة

عند زيارة صفحة تعديل المنشور، تظهر الروابط النسبية والمطلقة وهي تؤدي وظائف التنقّل بكفاءة وأمان كامل للأنواع:

![روابط التنقل النسبي والمطلق في صفحة تعديل المنشور](/images/tanstack-router/router--more-on-the-link-component--post.png)

## جرّب بنفسك

1. انقر على رابط `Back to Post` ذي المسار النسبي `to=".."` وتأكد من أنه يعيدك إلى تفاصيل المنشور الحالي.
2. جرّب تغيير عدد مستويات الصعود في الرابط النسبي مثل `../../posts` ولاحظ كيف يكتشف `TypeScript` فورًا أن المسار غير صحيح ويحذّرك من الخطأ أثناء الكتابة.

## المراجع

- [فيديو الدرس: مزيد عن مكوّن الرابط (Link)](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=5776s)
- [فرع الدرس على GitHub (`more-on-link`)](https://github.com/alialaa/tanstack-router-course/tree/more-on-link)
- [توثيق التنقّل ومكوّن Link في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/navigation)

---

> هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «مزيد عن مكوّن الرابط» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع `more-on-link` للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.
