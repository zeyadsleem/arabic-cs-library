---
title: "التحقق من مخططات Zod (الحلول)"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/validating-zod-schemas-solution"
---

في ما يلي حلول التمارين الموجودة [هنا](https://stevekinney.com/courses/full-stack-typescript/validating-zod-schema-exercises).

## الحلول

### مرحبًا Zod

**الهدف**: التحقق من كائن يتضمّن اسمًا مطلوبًا (نص) وعمرًا (رقم غير سالب).

```typescript
import { z } from 'zod';

// 1. Define the schema
const basicUserSchema = z.object({
  name: z.string(),
  age: z.number().min(0, { message: "Age can't be negative." }),
});

// 2. Test data
const validData = { name: 'Ada', age: 36 };
const missingAge = { name: 'Charles' };
const negativeAge = { name: 'Bobby Tables', age: -1 };

// 3. Validate
try {
  const result = basicUserSchema.parse(validData);
  console.log('validData passed:', result);
} catch (err) {
  console.error('validData failed:', err);
}

try {
  const result = basicUserSchema.parse(missingAge);
  console.log('missingAge passed:', result);
} catch (err) {
  console.error('missingAge failed:', err);
}

try {
  const result = basicUserSchema.parse(negativeAge);
  console.log('negativeAge passed:', result);
} catch (err) {
  console.error('negativeAge failed:', err);
}
```

**ملاحظة**: ينبغي أن يوضّح هذا كيف سيُطلق `.parse()` خطأً للكائنات غير الصالحة.

## الحلول

### كل شيء عن الخيارات

**الهدف**: اجعل العمر اختياريًا. وإذا لم يُوفَّر، فإمّا أن تجعل قيمته الافتراضية 0 أو أن تعرض خطأً.

```typescript
import { z } from 'zod';

const optionalAgeSchema = z.object({
  name: z.string(),
  // Option A: Make age optional, and if not provided, transform it to 0
  age: z
    .number()
    .min(0)
    .optional()
    .transform((val) => val ?? 0),
});

const dataWithAge = { name: 'Ada', age: 36 };
const dataWithoutAge = { name: 'Ada' };

try {
  // With age
  const result1 = optionalAgeSchema.parse(dataWithAge);
  console.log('dataWithAge passed:', result1);
  // { name: "Ada", age: 36 }

  // Without age (defaults to 0)
  const result2 = optionalAgeSchema.parse(dataWithoutAge);
  console.log('dataWithoutAge passed:', result2);
  // { name: "Ada", age: 0 }
} catch (err) {
  console.error('Failed:', err);
}
```

**ملاحظة**: إن أردت إطلاق خطأ بدلًا من استخدام القيمة الافتراضية، فاحذف .transform(…) أو أطلق الخطأ داخل .refine().

## الحلول

### في الشارع الذي تسكن فيه

**الهدف**: كائنات متداخلة، ومصفوفات من العناوين، وعنوان واحد مطلوب على الأقل.

```typescript
import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string(),
  apartmentNumber: z.string().optional(),
});

const userProfileSchema = z.object({
  name: z.string(),
  addresses: z.array(addressSchema).min(1, { message: 'At least one address required.' }),
});

const validProfile = {
  name: 'Grace Hopper',
  addresses: [
    {
      street: '123 Naval Dr',
      city: 'Arlington',
      zip: '76010',
    },
    {
      street: '456 Code Ave',
      city: 'Boston',
      zip: '02108',
      apartmentNumber: 'Apt 101',
    },
  ],
};

const invalidProfile = {
  name: 'No Addresses Provided',
  addresses: [],
};

try {
  const parsedValid = userProfileSchema.parse(validProfile);
  console.log('Valid profile:', parsedValid);
} catch (err) {
  console.error('Valid profile failed:', err);
}

try {
  const parsedInvalid = userProfileSchema.parse(invalidProfile);
  console.log("Invalid profile passed (which shouldn't happen):", parsedInvalid);
} catch (err) {
  console.error('Invalid profile failed as expected:', err);
}
```

## الحلول

### الآن لشيء مختلف تمامًا: الأنواع الاتحادية

**الهدف**: اقبل إمّا النص “anonymous” أو كائنًا يتضمّن id (رقمًا) وname (نصًا).

```typescript
import { z } from 'zod';

// Create a union of two schemas:
const userIdentitySchema = z.union([
  z.literal('anonymous'),
  z.object({
    id: z.number(),
    name: z.string(),
  }),
]);

// Examples
const anonymousVal = 'anonymous';
const validObject = { id: 1, name: 'Alan' };
const invalidObject = { id: 'wrong', name: 'Marvin' };

try {
  console.log('anonymousVal passes:', userIdentitySchema.parse(anonymousVal));
  console.log('validObject passes:', userIdentitySchema.parse(validObject));
  // This will fail:
  console.log('invalidObject passes:', userIdentitySchema.parse(invalidObject));
} catch (err) {
  console.error('invalidObject failed as expected:', err);
}
```

## الحلول

### صقل الأذواق

**الهدف**: استخدم `.refine()` للتحقق مما إذا كان العدد أوليًا.

```typescript
import { z } from 'zod';

// A simple prime checker (not optimized, but fine for demonstration)
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primeNumberSchema = z.number().refine(isPrime, {
  message: 'Quantity must be prime!',
});

try {
  console.log('5 is prime:', primeNumberSchema.parse(5)); // Passes
  console.log('10 is prime:', primeNumberSchema.parse(10)); // Fails
} catch (err) {
  console.error('Failed:', err);
}
```

## الحلول

### المحوّلات: تحقق متنكّر

**الهدف**: اقبل نصًا بصيغة YYYY-MM-DD وحوّله إلى كائن Date.

```typescript
import { z } from 'zod';

const dateStringSchema = z
  .string()
  .refine(
    (val) => {
      // Basic check: must be parseable as a date
      return !isNaN(new Date(val).valueOf());
    },
    { message: 'Invalid date string' },
  )
  .transform((val) => new Date(val));

try {
  const date = dateStringSchema.parse('2025-03-20');
  console.log('Parsed date:', date); // Should be a valid Date object
} catch (err) {
  console.error('Failed date parse:', err);
}

try {
  dateStringSchema.parse('not-a-date'); // Will throw
} catch (err) {
  console.error('Invalid date string:', err);
}
```

## الحلول

### إضافة قليل من الوسم إلى حياتك

**الهدف**: نوع UserId موسوم يكون نصًا صالحًا للـ UUID.

```typescript
import { z } from 'zod';

const userIdSchema = z.string().uuid().brand<'UserId'>();

type UserId = z.infer<typeof userIdSchema>;
// -> string & { __brand: "UserId" }

const validUuid = '7c45ae8a-cf6e-4f72-b12f-6fbb21ce3ab9';
const invalidUuid = 'this-is-not-a-uuid';

try {
  const userId = userIdSchema.parse(validUuid);
  console.log('Branded UserId:', userId);

  // If you try to pass invalidUuid, it will throw:
  userIdSchema.parse(invalidUuid);
} catch (err) {
  console.error('Failed to parse userId:', err);
}
```

> **Zod v4**
>
> في Zod v4، تُكتب هذه الصيغة هكذا `z.uuid().brand<'UserId'>()`. وتحلّ `z.uuid()` على المستوى الأعلى محل `z.string().uuid()`، ويفرض `z.uuid()` في الإصدار الرابع تحققًا أكثر صرامة وفق RFC 9562. استخدم `z.guid()` لسلوك متوافق مع الإصدار الثالث.

**اختبار الوسم**: إذا كان لديك دالة تتوقع نوع UserId، فينبغي أن يفشل تمرير نص عادي في فحص الأنواع (في TypeScript). ولن يفشل ذلك وقت التشغيل، بل وقت التصريف.

## الحلول

### اجعل “Partial” و“Pick” و“Omit” أفضل أصدقائك

**الهدف**: استخدم مخططًا كبيرًا موجودًا، ثم أنشئ مخططات جزئية أو فرعية باستخدام .partial() و.pick() و.omit().

```typescript
import { z } from 'zod';

const fullUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  addresses: z
    .array(
      z.object({
        street: z.string(),
        city: z.string(),
        zip: z.string(),
      }),
    )
    .optional(),
});

// PART 1: Partial user update schema (all fields become optional)
const partialUserUpdateSchema = fullUserSchema.partial();

// PART 2: Public profile: pick only certain fields to reveal publicly
const publicProfileSchema = fullUserSchema.pick({
  name: true,
  addresses: true,
});

// PART 3: Omit sensitive data—e.g., remove `email` from the user object
const userWithoutEmailSchema = fullUserSchema.omit({
  email: true,
});

// Test them out
const sampleData = {
  name: 'Test User',
  email: 'test@example.com',
  phoneNumber: '123-456-7890',
  addresses: [{ street: '100 Test Ln', city: 'Nowhere', zip: '99999' }],
};

// 1. Partial update
const partialUpdate = { phoneNumber: '987-654-3210' };
try {
  console.log('Partial update passes:', partialUserUpdateSchema.parse(partialUpdate));
} catch (err) {
  console.error('Partial update error:', err);
}

// 2. Public profile
try {
  console.log('Public profile:', publicProfileSchema.parse(sampleData));
} catch (err) {
  console.error('Public profile error:', err);
}

// 3. Omit email
try {
  console.log('User without email:', userWithoutEmailSchema.parse(sampleData));
} catch (err) {
  console.error('User without email error:', err);
}
```

## الحلول

### مخططات مخصّصة باستخدام z.custom()

**الهدف**: التحقق من نص لون سداسي عشري: يجب أن يبدأ بـ # ويتكوّن من 3 أو 6 أرقام سداسية عشرية.

```typescript
import { z } from 'zod';

const hexColorSchema = z.custom<string>(
  (val) => {
    if (typeof val !== 'string') return false;
    // Simple regex check: must start with '#' and have 3 or 6 hex digits
    return /^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/.test(val);
  },
  {
    message: 'Invalid hex color',
  },
);

// Test
const validColors = ['#FFF', '#FFFFFF', '#abc', '#aBcDeF'];
const invalidColors = ['FFF', '#FFFFF', '#GGG', '#1234567', '#abcd'];

// Validate
for (const color of validColors) {
  try {
    console.log(`"${color}" passes:`, hexColorSchema.parse(color));
  } catch (err) {
    console.error(`"${color}" failed (unexpected):`, err);
  }
}

for (const color of invalidColors) {
  try {
    console.log(`"${color}" passes (shouldn't):`, hexColorSchema.parse(color));
  } catch (err) {
    console.error(`"${color}" failed (expected):`, err);
  }
}
```

## الحلول

### لنضع كل شيء معًا: بناء أداة تحقق للنماذج

**الهدف**: نموذج تسجيل يتطلّب اسم مستخدم وكلمة مرور وبريدًا إلكترونيًا، وتاريخ ميلاد اختياريًا صالحًا، مع قيود خاصة بكل حقل.

```typescript
import { z } from 'zod';

// We'll create each field's schema and then combine.

const usernameSchema = z
  .string()
  .min(4, { message: 'Username must be at least 4 characters.' })
  .max(16, { message: 'Username can be at most 16 characters.' });

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  // refine to check for a digit
  .refine((val) => /\d/.test(val), {
    message: 'Password must contain at least one digit.',
  })
  // optional brand if you want to differentiate it:
  .brand<'SecureString'>();

const emailSchema = z
  .string()
  .email({ message: 'Must be a valid email address.' })
  // optional brand
  .brand<'EmailAddress'>();

// Optional birthDate, but if provided, must be a valid date
const birthDateSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val) return true; // optional
      return !isNaN(new Date(val).valueOf());
    },
    { message: 'Invalid birth date format.' },
  )
  .transform((val) => {
    return val ? new Date(val) : undefined;
  });

// Combine into a single schema
const registrationFormSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  birthDate: birthDateSchema,
});

// Now test it
const validFormData = {
  username: 'myuser',
  password: 'secret123',
  email: 'test@example.com',
  birthDate: '1985-01-01',
};

const invalidFormData = {
  username: 'me', // too short
  password: 'nopass', // not enough chars, no digit
  email: 'not-an-email', // not a valid email
  birthDate: 'not-a-date', // can't parse
};

try {
  const parsedValid = registrationFormSchema.parse(validFormData);
  console.log('Valid form data parsed:', parsedValid);
  // birthDate becomes a Date object, if you transform it.
} catch (err) {
  console.error('Valid form data error (unexpected):', err);
}

try {
  registrationFormSchema.parse(invalidFormData);
  console.log("Invalid form data passed (which shouldn't happen)");
} catch (err) {
  console.error('Invalid form data failed as expected:', err);
}
```

> **Zod v4**
>
> في Zod v4، الأفضل أن تكون `z.string().email()` هي `z.email()`، وخيار `{ message: "..." }` في المدقّقات مثل `.min()` و`.refine()` مهجور لصالح `{ error: "..." }`.

**النقاط الأساسية**:

1. استخدم مخططات منفصلة لكل حقل أو مفهوم.
2. ركّبها معًا باستخدام `z.object()`.
3. اعتمد على `.refine()` و`.transform()` والوسم أو أي تقنية أخرى في Zod تجدها مفيدة.
