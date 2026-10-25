---
title: "اختبار مخطط Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/testing-zod-schema"
---

تُعدّ كتابة اختبارات وحدة شاملة لمخططات Zod ضرورية لضمان صحتها ومنع الانحدارات مع تطوّر تطبيقك. وإليك استراتيجيات أساسية لاختبار مخططات Zod:

## اختبار المدخلات الصحيحة

أنشئ حالات اختبار ببيانات مدخلة صحيحة ينبغي أن تُحلَّل بنجاح وفق مخططك. وتأكد من أن `schema.parse()` أو `schema.safeParse()` يعيد البيانات المتحقَّق منها المتوقعة دون أخطاء.

```typescript
import { z } from 'zod';
import { describe, it, expect } from 'vitest'; // Example using Vitest

const userSchema = z.object({
  name: z.string().min(2),
  age: z.number().positive(),
});

describe('User Schema', () => {
  it('should parse valid user data', () => {
    const validUserData = { name: 'Alice', age: 30 };
    const parsedUser = userSchema.parse(validUserData);
    expect(parsedUser).toEqual(validUserData); // Assert parsed data is as expected
  });
});
```

## اختبار المدخلات غير الصحيحة

أنشئ حالات اختبار ببيانات مدخلة غير صحيحة ينبغي أن *تفشل* في التحقق. وتأكد من أن `schema.parse()` يرمي `ZodError` أو أن `schema.safeParse()` يعيد `success: false`. وافحص مصفوفة `error.errors` للتحقق من أن رسائل الخطأ ومسارات الخطأ المحددة كما هي متوقعة.

```typescript
import { z } from 'zod';
import { describe, it, expect } from 'vitest';

const userSchema = z.object({
  name: z.string().min(2),
  age: z.number().positive(),
});

describe('User Schema', () => {
  it('should throw ZodError for invalid age', () => {
    const invalidUserData = { name: 'Bob', age: -5 };
    expect(() => userSchema.parse(invalidUserData)).toThrowError(z.ZodError); // Assert ZodError is thrown
    try {
      userSchema.parse(invalidUserData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        expect(error.errors[0].message).toBe('Number must be greater than 0'); // Assert specific error message
        expect(error.errors[0].path).toEqual(['age']); // Assert error path
      }
    }
  });

  it('should return success: false and ZodError for safeParse with invalid name', () => {
    const invalidUserData = { name: 'C', age: 25 };
    const result = userSchema.safeParse(invalidUserData);
    expect(result.success).toBe(false); // Assert safeParse returns failure
    if (!result.success) {
      expect(result.error).toBeInstanceOf(z.ZodError); // Assert error is ZodError
      expect(result.error.errors[0].message).toBe('String must be at least 2 characters'); // Assert error message
    }
  });
});
```

## اختبار الحالات الحدية والشروط الحدودية

خُذ في الحسبان الحالات الحدية والشروط الحدودية لمخططاتك (مثل السلاسل الفارغة، وقيم null حين لا يُحدَّد القبول بها، والأطوال القصوى المسموح بها، والقيم الدنيا والعليا). وأنشئ حالات اختبار للتأكد من أن مخططاتك تعالج هذه السيناريوهات على نحو صحيح.

## اختبار التحسينات والتحويلات المخصّصة

اختبر دوالك `.refine()` و`.superRefine()` و`.transform()` اختبارًا شاملًا للتأكد من أن منطق التحقق والتحويل المخصّص لديك يعمل كما هو متوقع.
