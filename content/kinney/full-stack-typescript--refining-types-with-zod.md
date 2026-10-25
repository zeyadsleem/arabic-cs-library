---
title: "تحسين الأنواع مع Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/refining-types-with-zod"
---

يأتي Zod مزوّدًا بمجموعة سخية من تعريفات المخططات الأولية والمركّبة جاهزةً. فإذا كان «نوعك المخصّص» يمكن التعبير عنه ككائن أو اتحاد Zod مباشر، فاستخدم أحدها كما رأينا في [المقدّمة سابقًا](https://stevekinney.com/courses/full-stack-typescript/introduction-to-zod).

```typescript
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number().int().min(0),
});

type User = z.infer<typeof userSchema>;

const parsedUser = userSchema.parse({
  name: 'Ada Lovelace',
  age: 36,
});
```

> **نصيحة احترافية**
>
> إذا كان نوعك المخصّص مجرّد شكل منظّم (مثل شخص أو شكل أنيق له بعض الخصائص الاختيارية)، فقد لا تحتاج إلى أكثر من مخططات Zod القياسية.

## تحسين المخططات

تتيح لك طريقة `.refine()` في Zod إضافة منطق تحقّق مخصّص. لنفترض أن لديك حقل بريد إلكتروني *يجب* أن ينتهي بـ `frontendmasters.com`. ابدأ بنص عادي، ثم حسّنه:

```typescript
const emailSchema = z.string().refine((value) => value.endsWith('frontendmasters.com'), {
  message: 'Email must end with frontendmasters.com',
});

const validatedEmail = emailSchema.parse('hellofrontendmasters.com'); // passes

emailSchema.parse('hello@anotherdomain.com');
// throws ZodError: Email must end with frontendmasters.com
```

> **ملاحظة**
>
> إذا كنت تفضّل الاعتماد على مكتبات تحقّق خارجية (مثل validator.js)، فيمكنك ربطها داخل `.refine()`

## إنشاء مخططات مخصّصة

أحيانًا يكون لديك نوع غريب إلى حدّ لا يكفي معه `.refine()` — أو ربما تريد تحكّمًا أكثر مباشرة. هنا يأتي دور `z.custom()`. وهو مثالي للأشياء التي لا يمكن تمثيلها جيدًا بأنواع بسيطة، أو للتحقّق من الشكل مع الوسم معًا. على سبيل المثال:

```typescript
// Suppose we want a schema for a string that must parse into a valid Date
const validDateString = z.custom<string>(
  (value) => {
    if (typeof value !== 'string') return false;

    // Attempt to parse date
    const date = new Date(value);
    // Check if it's a real date
    return !isNaN(date.valueOf());
  },
  {
    message: 'Invalid date string provided',
  },
);

// If you also want TypeScript to know it's a string, you'll do:
type ValidDateString = z.infer<typeof validDateString>; // string

validDateString.parse('2025-03-20'); // success
validDateString.parse('not-a-date'); // throws ZodError
```

> **تحذير صريح**
>
> يُعيد `z.custom()` مخططًا يعطي النوع unknown افتراضيًا. وإذا أردت أن يثق بك TypeScript، فيمكنك التحويل صراحةً أو تعريف وسيط نوع عام مثل `z.custom<string>()`. فقط تأكّد أن منطق التحقّق لديك محصّن تمامًا.

## التحقّق من الأنواع المعقّدة أو المتداخلة

إذا كان لديك كائن يحتوي مصفوفات تحتوي كائنات (أو أشكال متاهيّة أخرى تبدو كأن أحد معجبي M.C. Escher صمّمها)، فركّب مخططاتك:

```typescript
const addressSchema = z.object({
  street: z.string(),
  zipCode: z.string().length(5),
});

const userWithAddressSchema = z.object({
  name: z.string(),
  addresses: z.array(addressSchema).nonempty(),
});

type UserWithAddress = z.infer<typeof userWithAddressSchema>;

userWithAddressSchema.parse({
  name: 'Grace Hopper',
  addresses: [
    { street: '1900 Sea St', zipCode: '12345' },
    { street: '3 Admiral Dr', zipCode: '99999' },
  ],
}); // passes
```

> **Zod v4**
>
> في Zod v4، ما زال `.nonempty()` يفرض حدًّا أدنى للطول قدره 1 في وقت التشغيل، لكنه لم يعد يضيّق نوع TypeScript المستنتَج إلى صفّ غير فارغ (`[T, ...T[]]`). وسيكون النوع المستنتَج `T[]` بدلًا من ذلك.

واصل التداخل كما تشاء. وإن كانت بنية بياناتك معقّدة، فمقاربة Zod الطبقية على الأقل تُبقي منطق التحقّق مرتّبًا.

## الأنواع الموسومة لدلالات إضافية

لدى Zod مفهوم الأنواع «الموسومة»، وهو يتيح لك إضافة علامات وسم مخصّصة للتمييز بين أوليّات متطابقة لولا ذلك. وهذا رائع إن أردت منح نوع معنى خاصًا دون إنشاء نوع وقت تشغيل جديد. فمثلًا، يمكن أن يكون لديك UserId ليس في جوهره إلا نصًا، لكنه يُعرَف في شيفرتك كوسم مستقل:

```typescript
const userIdSchema = z.string().uuid().brand<'UserId'>();

type UserId = z.infer<typeof userIdSchema>; // string & { __brand: "UserId" }

const userId = userIdSchema.parse('7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9'); // works
userIdSchema.parse('not-a-uuid'); // throws ZodError
```

> **Zod v4**
>
> في Zod v4، يُفضَّل كتابة `z.string().uuid()` بالصيغة `z.uuid()`. كما تقبل طريقة `.brand()` وسيطًا ثانيًا اختياريًا لتحديد الموضع: `"in"` أو `"out"` أو `"inout"`.

وهذا *قد* يساعد في التقاط الأخطاء إذا مرّرت بالخطأ نصًا خاطئًا إلى دالة تتوقع UserId.

## كن حاسمًا في رسائل الأخطاء

يملك Zod رسائل أخطاء مقبولة جاهزةً، لكن أسدِ نفسك في المستقبل (وزملاءك) معروفًا بتخصيص رسائل الأخطاء في `.refine()` و`.optional()` وغيرها:

```typescript
const fancySchema = z.number().int().min(1, {
  message: 'Number must be a positive integer. This includes you, 0.',
});
```

لا تخف من أن تكون صريحًا. فرسائل الأخطاء الغامضة تقود إلى مزيد من وقت التصحيح (والمزيد من القهوة، وقد يكون ذلك جيدًا، لكنه يقود أيضًا إلى مزيد من الإحباط، وهذا ليس جيدًا بالتأكيد).

---

## اختبار مخططاتك المخصّصة

خطُ الخطوة الإضافية واكتب اختبارًا أو اختبارين سريعين لمنطقك المخصّص:

```typescript
import { describe, it, expect } from 'vitest'; // or your test runner
import { validDateString } from './path/to/your/schema';

describe('validDateString', () => {
  it('should parse a valid date', () => {
    expect(() => validDateString.parse('2025-03-20')).not.toThrow();
  });

  it('should throw on invalid date', () => {
    expect(() => validDateString.parse('Feb 30th, 2025')).toThrow();
  });
});
```

تضمن الاختبارات أن نسختك المستقبلية (التي قد تكون محرومة من النوم) لن تكسر بالخطأ مخططاتك المخصّصة المبنية بعناية.

## تركيب مخططات Zod

يمكنك تركيب مخططات أصغر معًا. وحتى للاحتياجات المخصّصة الجامحة، فكّكها إلى قطع أصغر وأسهل في الاختبار. فمثلًا، إذا احتجت «عددًا صحيحًا موجبًا أقل من 1000 وأوليًا أيضًا»، فيمكنك تعريف فاحص أولية ثم `.refine()` فوق مخطط أصغر:

```typescript
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primeUnder1000Schema = z.number().int().min(2).max(999).refine(isPrime, {
  message: 'Number must be prime',
});
```

## التحسين الفائق (Super Refinement)

`.superRefine(refinement: (value, ctx: RefinementCtx<T>) => void)` يشبه `.refine()`، لكنه يوفّر كائن `RefinementCtx` لإضافة عدة رسائل خطأ أو أخطاء عند مسارات محددة داخل المخطط. وهو أقوى لسيناريوهات التحقّق المعقّدة.

```typescript
const productSchema = z
  .object({
    price: z.number().positive(),
    quantity: z.number().int().nonnegative(),
  })
  .superRefine((data, ctx) => {
    if (data.price > 1000 && data.quantity > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'High-value items must have quantity 0 for initial stock',
        path: ['quantity'],
      });
    }
  });

productSchema.parse({ price: 1200, quantity: 0 }); // Valid
// productSchema.parse({ price: 1200, quantity: 5 }); // Throws ZodError: High-value items must have quantity 0 for initial stock at 'quantity'
```

## المعالجة المسبقة

`.preprocess(fn: (input: unknown) => unknown, schema: ZodSchema)` يطبّق دالة معالجة مسبقة *قبل* التحقّق. وهو مفيد لتنظيف بيانات المدخلات أو تحويلها قبل التحقّق منها مقابل المخطط الأساسي.

```typescript
const preprocessNumberSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    return parseInt(val, 10); // Try to parse string to number
  }
  return val; // Otherwise, return original value
}, z.number().positive());

preprocessNumberSchema.parse('42'); // Valid, returns 42 (number)
preprocessNumberSchema.parse(42); // Valid, returns 42 (number)
// preprocessNumberSchema.parse("abc"); // Throws ZodError (after preprocessing): Expected number, received nan
```

إبقاء هذه التحقّقات منفصلة عن منطق المخطط الخام يُبقي شيفرتك أنظف وأسهل إدارة.

**معلومة طريفة**: هناك أيضًا `z.superPreprocess`. و`.superPreprocess(fn: (input: unknown, ctx: PreprocessContext) => unknown)` يشبه `.preprocess()`، لكنه يوفّر `PreprocessContext` لمزيد من التحكّم في المعالجة المسبقة ومعالجة الأخطاء أثناءها.

## `.superRefine()` للإبلاغ عن أخطاء متعددة

يتيح `.refine()` إطلاق خطأ واحد في المرة. أما `.superRefine()` فأكثر مرونة: تستدعي `ctx.addIssue(...)` لكل مشكلة.

### مثال: مشكلات متعددة في تحقّق واحد

```typescript
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8)
  .superRefine((val, ctx) => {
    if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must include an uppercase letter',
      });
    }
    if (!/\d/.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must include a digit',
      });
    }
    // You can add more checks if needed...
  });
```

الآن، إذا كانت كلمة المرور تفتقد الحروف الكبيرة *و*الأرقام معًا، فستحصل على *خطأين متمايزين.* وهذا مفيد لتغذية المستخدم الراجعة — وإلا فإن `.refine()` واحدًا سيُطلق عادةً رسالة خطأ واحدة فقط.

## بعض الخواطر الأخيرة

- **كن واعيًا بالأداء**: للمخططات الضخمة جدًا أو نقاط النهاية عالية الحركة، قد تحتاج إلى تحسين بعض الفحوص أو تخزين نتائجها مؤقتًا. فـ Zod كفء أصلًا، لكن إن فعلت شيئًا جنونيًا داخل .refine()، فستدفع الثمن.
- **تحقّق من المدخلات عند الأطراف**: لا تنتظر حتى يكون نصف قاعدة شيفرتك قد لمس البيانات لتدرك أنها غير صالحة. تحقّق من البيانات بأقرب ما يمكن إلى «نقطة دخول البيانات» — سواء أكانت نقطة نهاية API، أو إرسال نموذج، أو مستهلك طابور رسائل.
- **تابع التحديثات**: يتطوّر Zod. وقد تجلب الإصدارات الجديدة ميزات جديدة أو أداءً أفضل. ويستحقّ الأمر نظرة من حين إلى آخر لترى هل يمكن استبدال منطقك المخصّص بطريقة مدمجة صدرت حديثًا.
