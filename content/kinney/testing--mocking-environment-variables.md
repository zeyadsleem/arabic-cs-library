---
title: "محاكاة متغيرات البيئة (Mocking Environment Variables)"
lang: ar
source: "https://stevekinney.com/courses/testing/mocking-environment-variables"
---

ربما تريد التأكد من أن شيفرتك تتصرف كما هو متوقع في ظل متغيرات بيئة مختلفة. يمكنك أن تتفنن كثيرًا في طريقة تصفية اختباراتك — أو يمكنك ببساطة محاكاة متغيرات البيئة تلك لبرهة.

تأمل هذا المثال في `examples/logjam/src/log.test.js`.

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

الأهم من ذلك، أننا نريد على الأرجح التأكد من أنها *لا* تسجّل في الإنتاج.

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
