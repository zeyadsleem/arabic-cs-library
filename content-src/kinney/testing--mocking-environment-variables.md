---
title: "Mocking Environment Variables"
lang: "en"
chapter: "testing"
slug: "mocking-environment-variables"
order: 26
source: "https://stevekinney.com/courses/testing/mocking-environment-variables"
---

Maybe you want to make sure your code behaves as expected given different environment variables. You could get really fancy in the way you filter your tests—or, you could just mock those environment variables for a hot minute.

Consider this example in `examples/logjam/src/log.test.js`.

```typescript
describe('development', () => {
  beforeEach(() => {
    vi.stubEnv('MODE', 'development');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs to the console in development mode', () => {
    const spy = vi.spyOn(console, 'log');

    log('Hello, world!');

    expect(spy).toHaveBeenCalledWith('Hello, world!');
  });
});
```

More importantly, we probably want to make sure that *doesn’t* log in production.

```typescript
describe('production', () => {
  beforeEach(() => {
    vi.stubEnv('MODE', 'production');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not log to the console in production mode', () => {
    const spy = vi.spyOn(console, 'log');

    log('Hello, world!');

    expect(spy).not.toHaveBeenCalledWith('Hello, world!');
  });
});
```
