---
title: "برمجية وسيطة للتخزين المؤقت"
book: hono
chapter: middleware-builtin
slug: cache
order: 31
source: https://hono.dev/docs/middleware/builtin/cache
lang: ar
---

يستخدم وسيط التخزين المؤقت (Cache) [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache).

يدعم وسيط Cache حاليًا مشاريع Cloudflare Workers التي تستخدم نطاقات مخصصة، ومشاريع Deno التي تستخدم [Deno 1.26+](https://github.com/denoland/deno/releases/tag/v1.26.0). متاح أيضًا مع Deno Deploy.

يحترم Cloudflare Workers الـ `Cache-Control` الترويسة (header) وإرجاع الاستجابات المخزَّنة مؤقتاً. للتفاصيل، راجع [التخزين المؤقت في وثائق Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/cache/). لا يحترم Deno الترويسات، لذا إذا كنت بحاجة إلى تحديث ذاكرة التخزين المؤقت (cache)، ستحتاج إلى تنفيذ آلية خاصة بك.

انظر [الاستخدام](#usage) أدناه للحصول على تعليمات لكل منصة.

## Import

```ts
import { Hono } from 'hono'
import { cache } from 'hono/cache'
```

## الاستخدام


```ts [Cloudflare Workers]
app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=3600',
  })
)
```

```ts [Deno]
// Must use `wait: true` for the Deno runtime
app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=3600',
    wait: true,
  })
)
```


## تخزين طلبات QUERY مؤقتًا

يخزّن وسيط التخزين المؤقت أيضًا الاستجابات لـ [QUERY](https://www.rfc-editor.org/rfc/rfc10008.html) الطلبات. وفقًا لما تتطلبه RFC 10008، يتضمن مفتاح التخزين المؤقت لطلب QUERY ملخصًا (digest) لمحتوى الطلب وبياناته الوصفية (metadata) الخاصة بالتمثيل، لذا تُخزن الطلبات ذات النصوص المختلفة مؤقتًا بشكل منفصل.

طلبات QUERY بجسم أكبر من `maxQueryBodySize` (64 KiB افتراضيًا) تتجاوز الذاكرة المؤقتة (cache).

لدعم ذلك، تُخزَّن الإدخالات المخزنة مؤقتًا (cached entries) تحت مفتاح داخلي بالصيغة `/.hono/cache?__hono_cache_key=...` بدلًا من عنوان URL للطلب نفسه. إذا قمت بمسح إدخالات ذاكرة التخزين المؤقت مباشرة عبر Cache API — على سبيل المثال، استدعاء `caches.delete()` مع عنوان URL الأصلي للطلب — ستحتاج إلى تحديث هذا المنطق. ينطبق هذا على جميع الأساليب، بما في ذلك GET.

## الخيارات

### <Badge type="danger" text="required" /> cacheName: `string` | `(c: Context) => string` | `Promise<string>`

اسم ذاكرة التخزين المؤقت (cache). يمكن استخدامه لتخزين عدة مخابئ بمعرفات مختلفة.

### <Badge type="info" text="optional" /> wait: `boolean`

قيمة منطقية (boolean) تشير إلى ما إذا كان ينبغي لـ Hono انتظار Promise الخاص بـ `cache.put` الدالة لإكمال التنفيذ قبل المتابعة مع الطلب. _مطلوب أن يكون true لبيئة Deno_. الافتراضي هو `false`.

### <Badge type="info" text="optional" /> `cacheControl`: `string`

سلسلة من التوجيهات لـ `Cache-Control` الترويسة. راجع [وثائق MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) لمزيد من المعلومات. عند عدم توفير هذا الخيار، لا `Cache-Control` تُضاف الترويسة إلى الطلبات.

### <Badge type="info" text="optional" /> vary: `string` | `string[]`

يضبط `Vary` في الاستجابة. إذا كان رأس الاستجابة الأصلي يحتوي بالفعل على `Vary` الرأس (header)، يتم دمج القيم مع إزالة أي قيم مكررة. وضبط هذا على `*` سيؤدي إلى خطأ. لمزيد من التفاصيل حول ترويسة Vary وتأثيراتها على استراتيجيات التخزين المؤقت، راجع [وثائق MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary).

### <Badge type="info" text="optional" /> `keyGenerator`: `(c: Context) => string | Promise<string>`

يولّد مفاتيح لكل طلب في `cacheName` مخزن. يمكن استخدامه لتخزين البيانات مؤقتًا بناءً على معاملات الطلب أو معاملات السياق. الافتراضي هو `c.req.url`. بالنسبة لطلبات QUERY، يتضمن المفتاح أيضًا ملخصًا (digest) لمحتوى الطلب وبياناته الوصفية (metadata) الخاصة بالتمثيل.

### <Badge type="info" text="optional" /> maxQueryBodySize: `number`

الحد الأقصى لحجم نص طلب QUERY بالبايت الذي يمكن تخزينه مؤقتًا. طلبات QUERY ذات النص الأكبر تتجاوز ذاكرة التخزين المؤقت. الافتراضي هو `65536` (64 KiB).

### <Badge type="info" text="optional" /> cacheableStatusCodes: `number[]`

مصفوفة برموز الحالة (status codes) التي ينبغي تخزينها مؤقتاً. الافتراضي هو `[200]`. استخدم هذا الخيار لتخزين الاستجابات ذات رموز الحالة (status codes) المحددة مؤقتًا في ذاكرة التخزين المؤقت (cache).

```ts
app.get(
  '*',
  cache({
    cacheName: 'my-app',
    cacheControl: 'max-age=3600',
    cacheableStatusCodes: [200, 404, 412],
  })
)
```

### <Badge type="info" text="optional" /> onCacheNotAvailable: `((reason: string) => void | Promise<void>)` | `false`

دالة استدعاء رجعي أو `false` الذي يتحكم في السلوك عندما لا تكون Cache API متاحة في النطاق العام (global scope)، أو عندما لا يمكن لتخزين QUERY المؤقت استخدام Web Crypto. تُستدعى الدالة مع السبب. افتراضيًا، يُسجل السبب باستخدام `console.log`. يمكنك تقديم دالة مخصصة لتخصيص السلوك، أو ضبطها على `false` لكتم السجل بالكامل.

```ts
// Custom logging
app.use(
  cache({
    cacheName: 'my-app-v1',
    onCacheNotAvailable: () => {
      console.log('Custom log: Cache API is not available.')
    },
  })
)
```

```ts
// Suppress logging
app.use(
  cache({
    cacheName: 'my-app-v1',
    onCacheNotAvailable: false,
  })
)
```
