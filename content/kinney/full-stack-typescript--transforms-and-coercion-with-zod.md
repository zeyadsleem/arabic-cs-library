---
title: "التحويلات والإكراه مع Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/transforms-and-coercion-with-zod"
---

## الاستفادة من التحويل لإنشاء أنواع متخصّصة

أحيانًا تريد تحويلًا (transform): لنقل إنك تقبل `string` لكن تخزّنه كـ `Date`. طريقة `.transform()` في Zod معك. ما زلت تتحقّق من المدخل أولًا، ثم تحوّله إلى الصيغة التي تحتاجها:

```typescript
const dateSchema = z
  .string()
  .refine((val) => !isNaN(new Date(val).valueOf()), {
    message: 'Invalid date string',
  })
  .transform((val) => new Date(val));

// Now your run-of-the-mill string is validated and transformed into a Date object
const date: Date = dateSchema.parse('2025-03-20');
```

هذه المقاربة رائعة لسدّ الفجوة بين ما تبدو عليه واجهة API أو مدخلات النموذج وما تحتاجه شيفرتك فعلًا.

## تسلسل التحويلات في خط أنابيب

يتيح Zod تسلسل التحويلات. فيمكنك استخدام `.transform()` عدة مرات، بشرط أن يطابق نوع مخرَج كل تحويل نوع مُدخَل التحويل التالي.

### مثال: الجمع بين التحقّق وتحويلات متسلسلة

```typescript
import { z } from 'zod';

// Start with a string
const pipeline = z
  .string()
  .transform((val) => val.trim()) // first transform
  .transform((trimmed) => trimmed.toUpperCase()); // second transform

// " hello " -> "hello" -> "HELLO"
pipeline.parse('  hello  ');
```

يمكنك أيضًا إجراء فحوص متقدمة بين التحويلات. وللتحويلات متعددة الخطوات، فكّر هل قد يكون `.superRefine()` أبسط إن احتجت إلى إضافة عدة مشكلات خطأ.
