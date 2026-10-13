---
title: "Exercise"
lang: "en"
chapter: "testing"
slug: "vitests-hooks-exercise"
order: 11
source: "https://stevekinney.com/courses/testing/vitests-hooks-exercise"
---

Can you take the `Character` tests from the [previous solution](https://stevekinney.com/courses/testing/asymmetric-matchers-solution) and use a `beforeEach` hook to create a new character each time?

If we were to do something similar to `Person`, it might look like this.

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
