---
title: "Testing Asynchronous Code"
lang: "en"
chapter: "testing"
slug: "testing-asynchronous-code"
order: 13
source: "https://stevekinney.com/courses/testing/testing-asynchronous-code"
---

As with almost everything in JavaScript, asynchronous code makes everything harder. (**Spoiler**: But, also—as with almost everything in JavaScript relating to asynchronous code, `async`/`await` tends to make that hard part easier.)

Consider this test for a moment:

```typescript
test('Asynchronous code accidentally passes', () => {
  setTimeout(() => {
    expect(false).toBe(true);
  }, 1);
});
```

It’s not that this test is any good, it’s just that the assertion never runs.

```typescript
test('Asynchronous code has zero expectations', () => {
  expect.assertions(0);

  setTimeout(() => {
    expect(false).toBe(true);
  }, 1000);
});
```

Put another way, we can assert that our assertion never—umm—*asserts*.

```typescript
test.fails('Code inside of callback never runs', () => {
  expect.hasAssertions();

  setTimeout(() => {
    expect(false).toBe(true);
  }, 1000);
});
```

In some frameworks, you’d be able to do something like this.

```typescript
// 🚨 This will not work in Vitest.

test('Code inside of callback never runs', (done) => {
  expect.hasAssertions();

  setTimeout(() => {
    expect(false).toBe(true);

    done();
  }, 1000);
});
```

As the comment says, this will *not* work in Vitest. I only mention it because this course isn’t supposed to be Vitest-specific—that’s the just the tool we chose to use. Regardless, what follows is *probably* what you want anyway.

## Using `async`/`await`

We no longer live in a world riddled with callbacks. These days, most of our asynchronous code either uses `async`/`await` or—at least—uses promises.

Consider the following two tests:

```typescript
const addAsync = (a: number, b: number) => Promise.resolve(a + b);

it.fails("fails if you don't use an async function", () => {
  const result = addAsync(2, 3);

  expect(result).toBe(5);
});

it('passes if use an `async/await`', async () => {
  const result = await addAsync(2, 3);

  expect(result).toBe(5);
});
```

The first test fails with the following error:

```diff
- Expected "5"

+ Received "Promise {}"
```

> **Working with Promises**
>
> If you’re working with Promises, [Vitest also has some special functionality](https://stevekinney.com/courses/testing/testing-promises) that you could optionally use.

## Further Reading

- [Testing Promises](https://stevekinney.com/courses/testing/testing-promises)
- [Testing Asynchronous Errors](https://stevekinney.com/courses/testing/testing-asynchronous-errors)
