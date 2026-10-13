---
title: "البرمجية الوسيطة Server-Timing"
book: hono
chapter: middleware-builtin
slug: timing
order: 51
source: https://hono.dev/docs/middleware/builtin/timing
lang: ar
---

الـ [`Server-Timing`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) توفّر البرمجيات الوسيطة
مقاييس الأداء في ترويسات الاستجابة.

ملاحظة: على Cloudflare Workers، قد لا تكون مقاييس المؤقت (timer metrics) دقيقة،
منذ [تُظهر المؤقتات فقط وقت آخر إدخال/إخراج (I/O)](https://developers.cloudflare.com/workers/learning/security-model/#step-1-disallow-timers-and-multi-threading).

## Import

```ts [npm]
import { Hono } from 'hono'
import {
  timing,
  setMetric,
  startTime,
  endTime,
  wrapTime,
} from 'hono/timing'
import type { TimingVariables } from 'hono/timing'
```

## الاستخدام

```js
// Specify the variable types to infer the `c.get('metric')`:
type Variables = TimingVariables

const app = new Hono<{ Variables: Variables }>()

// add the middleware to your router
app.use(timing());

app.get('/', async (c) => {

  // add custom metrics
  setMetric(c, 'region', 'europe-west3')

  // add custom metrics with timing, must be in milliseconds
  setMetric(c, 'custom', 23.8, 'My custom Metric')

  // start a new timer
  startTime(c, 'db');
  const data = await db.findMany(...);

  // end the timer
  endTime(c, 'db');

  // ...or you can also just wrap a Promise using this function:
  const data = await wrapTime(c, 'db', db.findMany(...));

  return c.json({ response: data });
});
```

### مُفعّلة شرطيًا

```ts
const app = new Hono()

app.use(
  '*',
  timing({
    // c: Context of the request
    enabled: (c) => c.req.method === 'POST',
  })
)
```

## النتيجة

![](/images/hono/timing-example.png)

## الخيارات

### <Badge type="info" text="optional" /> total: `boolean`

أظهر زمن الاستجابة الكلي. الافتراضي هو `true`.

### <Badge type="info" text="optional" /> enabled: `boolean` | `(c: Context) => boolean`

ما إذا كان يجب إضافة التوقيتات (timings) إلى الرؤوس (headers) أم لا. الافتراضي هو `true`.

### <Badge type="info" text="optional" /> totalDescription: `string`

وصف لإجمالي زمن الاستجابة. الافتراضي هو `Total Response Time`.

### <Badge type="info" text="optional" /> autoEnd: `boolean`

إذا `startTime()` يجب أن تنتهي تلقائيًا في نهاية الطلب.
إذا كان معطَّلاً، فلن تظهر المؤقتات (timers) التي لم تُنهَ يدوياً.

### <Badge type="info" text="optional" /> `crossOrigin`: `boolean` | `string` | `(c: Context) => boolean | string`

الأصل الذي ينبغي أن تكون ترويسة التوقيتات هذه قابلة للقراءة منه.

- إذا كانت false، فمن الأصل الحالي فقط.
- إذا كانت true، من جميع الأصول.
- إذا كانت سلسلة نصية، فمن هذه النطاقات. يجب فصل النطاقات المتعددة بفاصلة.

القيمة الافتراضية هي `false`. اطّلع على المزيد [المستندات](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin).
