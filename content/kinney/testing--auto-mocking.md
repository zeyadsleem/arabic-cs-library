---
title: "Auto-Mocking in Vitest"
lang: en
source: "https://stevekinney.com/courses/testing/auto-mocking"
---

Vitest allows you to automatically [mock](https://stevekinney.com/courses/testing/mocks) entire modules or specific functions, making it easier to isolate and test code without manually creating mocks for every function. Auto-mocking is particularly useful when you are testing complex systems with many dependencies.

You can automatically mock a module using `vi.mock()`:

```javascript
vi.mock('./api', () => ({
  getConcertDetails: vi
    .fn()
    .mockResolvedValue({ band: 'Green Day', venue: 'Madison Square Garden' }),
}));
```

This will mock the entire `api` module and replace `getConcertDetails` with a mock function that returns predefined data. Auto-mocking simplifies the process of managing mocks in large tests by allowing you to define mocks upfront.
