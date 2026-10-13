---
title: "Running Tests with Vitest"
lang: "en"
chapter: "testing"
slug: "running-tests"
order: 63
source: "https://stevekinney.com/courses/testing/running-tests"
---

From inside of [companion repository](https://github.com/stevekinney/introduction-to-testing), we’re going to navigate to `examples/basic-math`. You’ll see that we have two files in `src`:

- `calculator.js`
- `calculator.test.js`

You can use `vitest` to run your tests.

```bash
npx vitest

# Or, if you wanted to run your tests with Vitest UI.
npx vitest --ui
```

For our use cases, we have it defined in our `package.json`. For example, you might have the following script in your `package.json`.

```json
{
  // … other stuff
  "scripts": {
    "test": "vitest"
  }
  // more stuff …
}
```

As you’ve might have noticed, I’ve already done this for you.

This means that you can do run `npm test` to run our tests. If you wanted to run it with the UI, you could run `npm test -- --ui` to forward the flag to the `npm` script.

Out of the box, most test runners will run *every* test that matches whatever file naming conventions that they’re configured for. But you can have some control over this in the way you [provide a filter for which tests you want to run](https://stevekinney.com/courses/testing/filtering-tests).

## Additional Reading

- [Filtering Tests](https://stevekinney.com/courses/testing/filtering-tests)
- [Organizing and Annotating Tests](https://stevekinney.com/courses/testing/organizing-and-annotating-tests)
- [Running Tests for Related Files](https://stevekinney.com/courses/testing/running-tests-for-related-files)
