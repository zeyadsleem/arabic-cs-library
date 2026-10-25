---
title: "أنواع متقدمة مع Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/advanced-types-with-zod"
---

## القيم الحرفية (Literals)

```typescript
const literalSchema = z.literal('hello');

literalSchema.parse('hello'); // Valid
// literalSchema.parse("world"); // Throws ZodError: Expected literal 'hello', received 'world'
```

## `z.enum()` للمجموعات الثابتة

عندما تسمح فقط بقيم نصية قليلة صالحة، عرّفها في مخطط تعداد.

### مثال

```typescript
const colorEnum = z.enum(['RED', 'GREEN', 'BLUE']);

// passes
colorEnum.parse('RED');

// fails
colorEnum.parse('PURPLE');
```

### لماذا لا تستخدم اتحاد `.literal()`؟

- `z.enum(["RED", "GREEN", "BLUE"])` أدنى مباشرةً للمجموعات الصغيرة من النصوص.
- يستطيع TS أيضًا تفسيره كاتحاد لتلك القيم النصية الحرفية.
- إن كانت لديك مجموعة كبيرة، فالانحاد صالح بالقدر نفسه، لكنه أكثر إسهابًا فقط.

## الصفوف (Tuples)

```typescript
const tupleSchema = z.tuple([z.string(), z.number()]);

tupleSchema.parse(['hello', 123]); // Valid
// tupleSchema.parse([123, "hello"]); // Throws ZodError: Expected string, received number at index 0
// tupleSchema.parse(["hello"]); // Throws ZodError: Expected tuple to have 2 elements, but got 1
```

## الاتحادات (Unions)

```typescript
const stringOrNumberSchema = z.union([z.string(), z.number()]);

stringOrNumberSchema.parse('hello'); // Valid
stringOrNumberSchema.parse(123); // Valid
// stringOrNumberSchema.parse(true);  // Throws ZodError: Expected string | number, received boolean
```

## التقاطعات (Intersections)

```typescript
const stringSchema = z.object({ a: z.string() });
const numberSchema = z.object({ b: z.number() });
const intersectionSchema = z.intersection(stringSchema, numberSchema);

intersectionSchema.parse({ a: 'hello', b: 123 }); // Valid
// intersectionSchema.parse({ a: "hello" }); // Throws ZodError: Required at 'b'
```

### مكوّنات مخططات قابلة لإعادة الاستخدام مع الاتحادات

أنشئ مكوّنات مخططات قابلة لإعادة الاستخدام بتعريف المخططات كمتغيّرات أو دوال. وهذا يعزّز المعيارية ويقلّل تكرار الشيفرة.

```typescript
const baseUserSchema = z.object({
  id: z.number().positive(),
  createdAt: z.date(),
});

const customerSchema = baseUserSchema.extend({
  customerType: z.literal('customer'),
  orders: z.array(z.object({ orderId: z.string() })),
});

const adminSchema = baseUserSchema.extend({
  customerType: z.literal('admin'),
  permissions: z.array(z.string()),
});

const userSchema = z.union([customerSchema, adminSchema]); // Combine reusable schemas
```

## الاتحادات المُميَّزة (Discriminated Unions)

عندما تحتوي بياناتك على حقل «مُميِّز» معروف، يكون `z.discriminatedUnion()` أكفأ (وأوضح) من الاتحادات العادية.

### مثال: `type` أو `kind` كمُميِّز

```typescript
import { z } from 'zod';

const customerSchema = z.object({
  type: z.literal('customer'),
  orders: z.array(z.string()),
});

const adminSchema = z.object({
  type: z.literal('admin'),
  permissions: z.array(z.string()),
});

const userSchema = z.discriminatedUnion('type', [customerSchema, adminSchema]);

// Succeeds if type === 'customer' or 'admin'
userSchema.parse({
  type: 'customer',
  orders: ['order1', 'order2'],
});
```

### الفوائد

- **الأداء**: يستطيع Zod تجاوز فحص كل فرع من فروع الاتحاد بمجرد رؤية المُميِّز.
- **الوضوح**: إذا كان `type` أو `kind` في كائن مدخلك غير صحيح، فستحصل على خطأ فوري.

## `never` و`unknown` و`any`

يضمّ Zod مخططات خاصة تحاكي الأنواع المساعدة المدمجة في TypeScript:

- `z.never()` — يفشل دائمًا. فإذا رأيت `z.never()`، فذلك الخاصية لا يمكن أن توجد بصورة صالحة *أبدًا*.
- `z.unknown()` — يمكن لأي شيء أن يمرّ، لكن النوع النهائي هو `unknown`. جيد لتخزين بيانات لن تتفاعل معها مباشرةً.
- `z.any()` — يمكن لأي شيء أن يمرّ *و* النوع النهائي هو `any`. نادرًا ما يُنصح به، لكنه قد يكون آخر ملاذ إن لم تستطع تنميط شيء ما إطلاقًا.

### مثال

```typescript
const exoticSchema = z.object({
  no: z.never(), // always invalid
  hidden: z.unknown(), // always valid, type = unknown
  whatever: z.any(), // always valid, type = any
});
```

**نصيحة احترافية**: اعتمد على التنميط القوي قدر الإمكان. فقد يكون `z.unknown()` و`z.any()` ضروريين، لكنهما يقلّلان أمان الأنواع عمومًا.

## الصرامة مقابل التمرير مقابل النزع

عند التحقّق من الكائنات، يتعامل Zod مع *المفاتيح الإضافية/المجهولة* بطرق مختلفة حسب النمط:

### النزع (افتراضي)

### الصرامة {#strict}

### التمرير

### مثال

```typescript
const baseObj = z.object({ name: z.string() });

// Strict
const strictObj = baseObj.strict();
strictObj.parse({ name: 'Zod', age: 99 });
// => throws: unrecognized key "age"

// Passthrough
const passObj = baseObj.passthrough();
passObj.parse({ name: 'Zod', age: 99 });
// => { name: "Zod", age: 99 }

// Default (strip)
baseObj.parse({ name: 'Zod', age: 99 });
// => { name: "Zod" } (age is stripped out)
```

> **Zod v4**
>
> في Zod v4، ما زال `.strict()` و`.passthrough()` يعملان، لكن المقاربة المفضّلة هي استخدام البانيين على المستوى الأعلى `z.strictObject({...})` و`z.looseObject({...})` عند تعريف مخططات جديدة.

استخدم النمط الذي يناسب بياناتك أكثر. الصرامة جيدة عندما تريد ضمان عدم تسلّل حقول غير متوقعة؛ والتمرير مفيد إن أردت الاحتفاظ بها للّوغنة أو التصحيح.
