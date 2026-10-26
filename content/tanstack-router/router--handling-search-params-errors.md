---
title: "معالجة أخطاء معاملات البحث"
lang: ar
source: "https://www.youtube.com/watch?v=8_sGz4DHwIA&t=5390s"
---

## ماذا سنتعلّم؟

في الدرس السابق بدأنا التحقّق من معاملات البحث (search params) لمسار المنتجات `/products` باستخدام مخطط (schema) من مكتبة `Zod` عبر المحوّل `zodValidator`. ولكن ماذا يحدث لو كتب المستخدِم في شريط العنوان قيمةً غير متوقعة أو غير صالحة، أو شارك أحدهم رابطًا يحتوي على معطيات خاطئة؟ في الحالة الافتراضية سيفشل التحقّق وتُعرض شاشة خطأ توقف تجربة المستخدِم.

في هذا الدرس سنتعلّم طريقتين للتعامل مع أخطاء معاملات البحث:
1. تخصيص شاشة الخطأ للمسار باستخدام الخيار `errorComponent`.
2. تقديم بديل افتراضي (`fallback`) عند حدوث خطأ دون تعطيل الصفحة، والمقارنة بين أسلوب `.catch()` في `Zod` ودالة `fallback` المخصصة من حزمة `@tanstack/zod-adapter` التي تحافظ على الأمان النوعي (`type safety`) داخل التطبيق.

## تخصيص شاشة الخطأ عبر `errorComponent`

عندما نتنقّل داخل التطبيق عبر مكوّن `Link`، تضمن لنا الأنواع عدم تمرير قيم خاطئة. لكن شريط العنوان في المتصفح مفتوحٌ للمستخدِم، فلو كتب مثلًا `?sort_by=anything` حيث القيمة ليست `price` ولا `newest` ولا `oldest`، فسيرمي التحقّق خطأً وتظهر صفحة الخطأ العامة للموجّه.

لتخصيص ما يظهر للمستخدِم في هذا المسار تحديدًا، نمرّر المكوّن `errorComponent` داخل تعريف المسار في `src/routes/products.index.tsx`:

```tsx
export const Route = createFileRoute("/products/")({
  component: RouteComponent,
  validateSearch: zodValidator(productSearchParamsSchema),
  errorComponent: () => <p>Error.</p>,
});
```

بهذا الشكل، عندما يواجه المسار خطأً في التحقّق من المعاملات، سيُصيّر الفقرة النصية البسيطة `<p>Error.</p>` بدلًا من إظهار صفحة الخطأ الافتراضية الكاملة. وسنتوسّع في معالجة الأخطاء بمزيد من التفصيل في درس لاحق من الدورة.

## تقديم بديل افتراضي عند الخطأ

في كثير من الحالات، بدلًا من إيقاف المستخدِم أمام صفحة خطأ لمجرّد كتابة معامل خاطئ في العنوان، تكون التجربة الأفضل هي التراجع التلقائي إلى قيمة صالحة افتراضية.

في مكتبة `Zod`، تتيح الدالة `.catch()` التقاط أخطاء التحقّق وإرجاع قيمة بديلة مثل `"newest"`. غير أن هذه الطريقة تؤدي إلى مشكلة مع `TypeScript`؛ إذ يتحول نوع الحقل إلى نوع غير معروف (`unknown`)، وتفقد الروابط حمايتها النوعية عند كتابة الشيفرة.

ولحل ذلك، توفّر حزمة `@tanstack/zod-adapter` دالة مساعدة باسم `fallback`. نغلّف بها نوع الحقل ونمرّر لها القيمة البديلة، فنحصل على الاسترجاع الهادئ عند وقت التشغيل مع الحفاظ الكامل على تدقيق الأنواع.

## استيراد دالة `fallback` وضبط المخطط

في ملف `src/routes/products.index.tsx`، نستورد `fallback` من `@tanstack/zod-adapter`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
```

ثم نحدّث المخطط لنغلّف به تعداد الترتيب `sort_by`، مع إضافة `.default("newest")`:

```tsx
const productSearchParamsSchema = z.object({
  sort_by: fallback(z.enum(["newest", "oldest", "price"]), "newest").default(
    "newest"
  ),
  product_type: z.enum(["shoes", "t-shirts"]).default("shoes"),
  pagination: z
    .object({
      page: z.number().default(1),
      pageSize: z.number().default(10),
    })
    .default({}),
  colors: z.array(z.enum(["red", "blue", "green"])).optional(),
  sale: z.boolean().default(true),
});
```

تجمع هذه الصياغة بين أمرين:
- دالة `fallback`: إذا كَتب المستخدِم قيمة غير مقبولة في العنوان (مثل كلمة غير موجودة في التعداد)، تتراجع القيمة تلقائيًا إلى `"newest"` بدل إظهار خطأ.
- دالة `.default("newest")`: إذا غاب المعامل كليًّا عن العنوان، تُعطى له القيمة الافتراضية `"newest"`.

## النتيجة

عند إدخال قيمة غير صالحة في شريط العنوان لمسار المنتجات مع تفعيل `errorComponent`، يعرض المسار مكوّن الخطأ المحدد بوضوح:

![شاشة الخطأ في مسار المنتجات عند إدخال معاملات غير صالحة](/images/tanstack-router/router--handling-search-params-errors--products-error.png)

وعند تطبيق دالة `fallback`، يتجنب المستخدِم شاشة الخطأ وتعود الصفحة إلى العرض الطبيعي بالقيمة البديلة، مع بقاء تدقيق الأنواع سليمًا أثناء التطوير.

## جرّب بنفسك

1. اكتب في شريط العنوان `/products?sort_by=test` وتأكد من أن القيمة المقروءة تعود إلى `"newest"`.
2. احذف معامل `sort_by` تمامًا من الرابط وتأكد من أن القيمة الافتراضية `"newest"` تُطبّق تلقائيًا.
3. جرّب تطبيق دالة `fallback` على حقول أخرى في المخطط باتباع النمط نفسه.

## المراجع

- [فيديو الدرس: معالجة أخطاء معاملات البحث](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=5390s)
- [فرع الدرس على GitHub (`search-3`)](https://github.com/alialaa/tanstack-router-course/tree/search-3)
- [توثيق معاملات البحث (Search Params) في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)

---

> هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «معالجة أخطاء معاملات البحث» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع `search-3` للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.
