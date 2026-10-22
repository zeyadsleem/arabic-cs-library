---
title: "توليد الاختبارات باستخدام test.each وdescribe.each"
---

يمكننا استخدام test.each وdescribe.each لتوليد اختبارات ومجموعات اختبارات برمجيًا نيابةً عنا. تأمّل المثال التالي:

```typescript
export class Polygon {
  sides: number;
  length: number;

  constructor(sides: number, length: number) {
    if (sides < 3) throw new Error('Polygons must have three or more sides.');
    this.sides = sides;
    this.length = length;
  }

  get type(): PolygonType | undefined {
    if (this.sides === 3) return 'triangle';
    if (this.sides === 4) return 'quadrilateral';
    if (this.sides === 5) return 'pentagon';
    if (this.sides === 6) return 'hexagon';
    if (this.sides === 7) return 'heptagon';
    if (this.sides === 8) return 'octagon';
    if (this.sides === 9) return 'nonagon';
    if (this.sides === 10) return 'decagon';
  }

  // …
}
```

ربما نريد اختبار أننا نحصل على الاسم الصحيح حسب عدد الأضلاع. ليس *بالغ* الصعوبة كتابة مجموعة من الاختبارات لهذا، لكن يمكنك أن تضع قبّعة الخيال لحظةً وتتخيّل عالمًا لديك فيه حالات أكثر بكثير.

يتيح لنا `describe.each` و`it.each` (أو `test.each`) استخدام مصفوفة أو جدول لتوليد اختبارات لأنفسنا تلقائيًا.

على سبيل المثال، يمكننا استخدام مصفوفة من المصفوفات:

```typescript
  it.each([
    [3, 'triangle'],
    [4, 'quadrilateral'],
    [5, 'pentagon'],
    [6, 'hexagon'],
    [7, 'heptagon'],
    [8, 'octagon'],
    [9, 'nonagon'],
    [10, 'decagon'],
  ])('a polygon with %i sides should be considered a %s', (sides, type) => {
    const polygon = new Polygon(sides, 10);
    expect(polygon.type).toBe(type);
  });
});
```

سيولّد هذا عددًا من الاختبارات نيابةً عنا. ستلاحظ أن العنصر الأول في المصفوفة هو الوسيط الأول الممرَّر إلى دالة الاختبار، والعنصر الثاني هو الوسيط الثاني، وهكذا.

ستلاحظ أيضًا أننا نستطيع استخدام نصوص منسّقة لتوليد أسماء الاختبارات.

## استخدام مصفوفة من الكائنات

بدلًا من ذلك، يمكنك استخدام مصفوفة من الكائنات لتوليد اختباراتك.

```typescript
it.each([
  { sides: 3, type: 'triangle' },
  { sides: 4, type: 'quadrilateral' },
  { sides: 5, type: 'pentagon' },
  { sides: 6, type: 'hexagon' },
  { sides: 7, type: 'heptagon' },
  { sides: 8, type: 'octagon' },
  { sides: 9, type: 'nonagon' },
  { sides: 10, type: 'decagon' },
])('a polygon with $sides sides should be considered a $type', ({ sides, type }) => {
  const polygon = new Polygon(sides, 10);
  expect(polygon.type).toBe(type);
});
```

في هذا المثال ستلاحظ أنني أُفكّك كائنًا للحصول على القيم داخل الدالة، وأنني أستطيع استخدام `$property` في النص الذي يحدّد اسم الاختبار،

## استخدام جدول

ثمّة طريقة أخرى لتوليد الاختبارات، وهي استخدام جدول Markdown.

قد يكون لدينا شيء مثل هذا:

```typescript
polygonType        | sides | sumOfAngles | perimeter | area
${'triangle'}      | ${3}  | ${180}      | ${30}     | ${43.3012701892219}
${'quadrilateral'} | ${4}  | ${360}      | ${40}     | ${100}
${'pentagon'}      | ${5}  | ${540}      | ${50}     | ${172.047740058897}
${'hexagon'}       | ${6}  | ${720}      | ${60}     | ${259.807621135332}
${'heptagon'}      | ${7}  | ${900}      | ${70}     | ${363.391244400159}
${'octagon'}       | ${8}  | ${1080}     | ${80}     | ${482.842712474619}
${'nonagon'}       | ${9}  | ${1260}     | ${90}     | ${618.18241937729}
${'decagon'}       | ${10} | ${1440}     | ${100}    | ${769.420884293813}
```

يمكننا توليد سلسلة من الاختبارات بتمرير هذا إلى الدالة كنص قالب:

```typescript
describe.each`
  polygonType        | sides | sumOfAngles | perimeter | area
  ${'triangle'}      | ${3}  | ${180}      | ${30}     | ${43.3012701892219}
  ${'quadrilateral'} | ${4}  | ${360}      | ${40}     | ${100}
  ${'pentagon'}      | ${5}  | ${540}      | ${50}     | ${172.047740058897}
  ${'hexagon'}       | ${6}  | ${720}      | ${60}     | ${259.807621135332}
  ${'heptagon'}      | ${7}  | ${900}      | ${70}     | ${363.391244400159}
  ${'octagon'}       | ${8}  | ${1080}     | ${80}     | ${482.842712474619}
  ${'nonagon'}       | ${9}  | ${1260}     | ${90}     | ${618.18241937729}
  ${'decagon'}       | ${10} | ${1440}     | ${100}    | ${769.420884293813}
`('$polygonType', ({ polygonType, sides, lengthOfSide, sumOfAngles, perimeter, area }) => {
  //…
});
```

## تمرين

ألقِ نظرة على `src/examples/parameterizing-tests/polygon.test.ts`. هل تستطيع توليد اختبارات بناءً على البيانات؟

## سرّ

**ملاحظة مهمة**: هذا جزء من سلسلة نصائح وحيل هي أفكار سيئة بلا شك. ومع ذلك، فهي فعّالة بشكل مفاجئ، وأحيانًا عليك أن تخرق القواعد، أليس كذلك؟

أعرف. لدي TypeScript للتحقق من أن الدالة لن تتلقى سوى الوسائط التي أقول إنها ستتلقاها. لكن TypeScript لا يستطيع تحليل سوى قاعدة شيفرتك. فإن كان لجزء من شيفرتي أي تفاعل مع العالم الخارجي، فقد أختار إضافة بعض الحُرّاس للتأكد من أنها لا تنفجر. وسأستخدم وسائط الاختبار لجعل ذلك سهلًا على نفسي.
