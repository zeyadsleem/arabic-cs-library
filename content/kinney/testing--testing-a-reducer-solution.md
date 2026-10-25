---
title: "الحل: اختبار مخفّض (reducer) في Zod"
lang: ar
source: "https://stevekinney.com/courses/testing/testing-a-reducer-solution"
---

إليك حلًا بسيطًا جدًا — وفيه خلل خفي أيضًا:

```typescript
import reducer, { add, remove, toggle, markAllAsUnpacked, update } from './items-slice';

it('returns an empty object as the initial state', () => {
  expect(reducer(undefined, { type: 'noop' })).toEqual([]);
});

it('supports adding an item', () => {
  expect(reducer([], add({ name: 'iPhone' }))).toEqual([
    expect.objectContaining({ name: 'iPhone' }),
  ]);
});

it('prefixes ids with "item-"', () => {
  expect(reducer([], add({ name: 'iPhone' }))).toEqual([
    expect.objectContaining({ id: expect.stringMatching(/^item-/) }),
  ]);
});

it('defaults new items to a packed status of false', () => {
  expect(reducer([], add({ name: 'iPhone' }))).toEqual([
    expect.objectContaining({ packed: false }),
  ]);
});

it('supports removing an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, remove({ id: '1' }));

  expect(result).toEqual([]);
});

it('supports toggling an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, toggle({ id: '1' }));

  expect(result).toEqual([
    {
      id: '1',
      name: 'iPhone',
      packed: true,
    },
  ]);
});

it('supports updating an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, update({ id: '1', name: 'Samsung Galaxy S23' }));

  expect(result).toEqual([
    {
      id: '1',
      name: 'Samsung Galaxy S23',
      packed: false,
    },
  ]);
});

it('supports marking all items as unpacked', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: true,
    },
    {
      id: '2',
      name: 'iPhone Charger',
      packed: true,
    },
  ];

  const result = reducer(state, markAllAsUnpacked());

  expect(result).toEqual([
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
    {
      id: '2',
      name: 'iPhone Charger',
      packed: false,
    },
  ]);
});
```

*يمكننا* المضي أبعد من ذلك في المطابقة غير المتماثلة، لكني لن أفعل لمجرد إثبات وجهة نظر: الأمر كله يتعلق بالمقايضات مع مراعاة ما يقدّم أكبر قيمة؟ *إذا* وجدنا أن بنية البيانات هذه تتغيّر كثيرًا وأن قليلًا إضافيًا من المرونة مفيد، فقد أختار ذلك. لكن حتى ذلك الحين، أتبنّى فلسفة [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) في هذا بمحاولة نصف ناضجة لأكون قدوة لك.

## الخطوات التالية

هناك الاختبارات التي أكتبها عندما أطوّر الشيفرة، والاختبارات التي أكتبها عندما أصون الشيفرة.

- قد أدمج الاختبارات القليلة الأولى في اختبار واحد، لأنه إن فشل أي جزء منها فسأحصل على رسالة فشل جيدة.
- إن انتهى بي الأمر إلى إضافة شيء مثل `dateCreated` أو `lastModified`، فستجدني بالتأكيد أكثر تسامحًا مع تلك الاختبارات اللاحقة.
