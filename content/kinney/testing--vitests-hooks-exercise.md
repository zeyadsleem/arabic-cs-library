---
title: "تمرين"
lang: ar
source: "https://stevekinney.com/courses/testing/vitests-hooks-exercise"
---

هل يمكنك أخذ اختبارات `Character` من [الحل السابق](https://stevekinney.com/courses/testing/asymmetric-matchers-solution) واستخدام خطّاف `beforeEach` لإنشاء شخصية جديدة في كل مرة؟

لو أردنا فعل شيء مماثل مع `Person`، فقد يبدو هكذا.

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { Person } from './person.js';

describe('Person', () => {
  let person;

  beforeEach(() => {
    person = new Person('Grace', 'Hopper');
  });

  it('should create a person with a first name and last name', () => {
    expect(person).toMatchObject({
      firstName: 'Grace',
      lastName: 'Hopper',
    });
  });

  it('should throw an error if first name or last name is missing', () => {
    expect(() => new Person('Grace')).toThrow('First name and last name are required');

    expect(() => new Person()).toThrow('First name and last name are required');
  });

  it('should return the full name', () => {
    expect(person.fullName).toBe('Grace Hopper');
  });
});
```
