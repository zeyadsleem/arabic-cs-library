---
title: "مثال أوّل"
lang: ar
source: https://ahastack.dev/examples/1-first/
---

دعني أعمل مثالًا بسيطًا جدًا باستخدام Astro و htmx. لا يستخدم هذا المثال Alpine؛ سنضيفه في [المثال التالي](/book/ahastack/example-alpine/index).

أريد أن أبيع لك Astro و htmx أوّلًا.

سنحصل على صفحة فيها زرّان: واحد لزيادة عدّاد، والآخر لإنقاص القيمة.

شاهد هذا الشيء وهو يعمل على [https://demo.ahastack.dev/counter](https://demo.ahastack.dev/counter). يعمل على Cloudflare Workers، وتُخزَّن القيمة في قاعدة بيانات D1 (وهي SQLite الخاصة بـ Cloudflare).

الشيفرة الكاملة على GitHub: [https://github.com/flaviocopes/ahastack.dev/tree/main/demo](https://github.com/flaviocopes/ahastack.dev/tree/main/demo). يستضيف ذلك المستودع [18 عرضًا توضيحيًا](https://demo.ahastack.dev) على Worker واحد، لذا تقع الملفات في `src/pages/counter.astro` و`src/pages/api/counter/`، وتستخدم الصفحات تخطيطًا مشتركًا للتنسيق. والمنطق هو نفسه الذي سيأتي أدناه.

أظنّ أن هذا سيُظهر مدى بساطة هذه الحزمة (stack).

ثبّت Astro

نافذة الطرفية

```sh
npm create astro@latest
```

![](/images/ahastack/example-first-0-Screenshot-2024-01-03T10.04.51AM.hUp_C0W4_1fv4MY.webp)

شغّل الموقع وافتحه في VS Code

نافذة الطرفية

```sh
cd <project>
code .
npm run dev
```

code .npm run dev">

يُنتج Astro HTML ثابتًا وقت البناء افتراضيًا. عدّادنا يتغيّر مع كل نقرة، لذا نحتاج إلى أن يُعرِض Astro الصفحات على الخادم (server-rendered) وقت الطلب.

سننشر إلى Cloudflare، لذا نضيف مُحوِّل Cloudflare:

نافذة الطرفية

```sh
npx astro add cloudflare
```

ثم فعّل العرض على الخادم في `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
})
```

الآن نحتاج إلى مكان لتخزين القيمة.

لا تملك Cloudflare Workers نظام ملفات، لذا نستخدم D1، وهي قاعدة بيانات SQLite من Cloudflare. أنشئ واحدة:

نافذة الطرفية

```sh
npx wrangler d1 create aha-counter
```

يطبع Wrangler مُعرِّف قاعدة البيانات. أنشئ ملف `wrangler.jsonc` في جذر المشروع وأضف الربط (binding) مع مُعرِّفك:

```jsonc
{
  "name": "aha-counter",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "aha-counter",
      "database_id": "<your database id>"
    }
  ]
}
```

"  } ]}">

أنشئ ملف `schema.sql` فيه جدول واحد وصفّ واحد:

```sql
CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY, value INTEGER NOT NULL);
INSERT OR IGNORE INTO counter (id, value) VALUES (1, 0);
```

نفّذه على قاعدة البيانات المحلية (التي يستخدمها `npm run dev`) وعلى البعيدة (التي تُستخدم في الإنتاج):

نافذة الطرفية

```sh
npx wrangler d1 execute aha-counter --local --file ./schema.sql
npx wrangler d1 execute aha-counter --remote --file ./schema.sql
```

هذا كل الإعداد. الآن أنشئ `src/pages/index.astro`.

اكتب شيفرة على الخادم تقرأ القيمة من قاعدة البيانات وتضيفها إلى HTML:

```astro
---
import { env } from 'cloudflare:workers'

const count = await env.DB.prepare('SELECT value FROM counter WHERE id = 1')
  .first('value')
---

<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width' />
    <title>AHA counter</title>
  </head>
  <body>
    <h1>Count: {count}</h1>
  </body>
</html>
```

  AHA counter   

# العدّ: {count}

  ">

النتيجة في المتصفح حتى الآن:

![](/images/ahastack/example-first-1-Screenshot-2024-01-03T10.51.57AM.Duok8QBx_2dLwX6.webp)

في Astro، الجزء الواقع بين `---` في الأعلى يُنفَّذ على الخادم، والجزء الذي تحته هو HTML الذي يُعاد إلى جهة العميل.

`env.DB` هو ربط D1 الذي صرّحنا به في `wrangler.jsonc`. ويشغّل Astro خادم التطوير داخل بيئة تشغيل Cloudflare الحقيقية، لذا يعمل هذا محليًا أيضًا.

لنثبّت الآن htmx.

أضف هذا الوسم `` إلى `` في HTML الذي يُعيده `index.astro`:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@4.0.0"></script>
```

تم تثبيت htmx.

الآن يمكننا إنشاء الزرّين لزيادة القيمة أو إنقاصها:

```astro
<body>
  <h1>Count: {count}</h1>

  <button hx-post="/api/increment">Increment</button>
  <button hx-post="/api/decrement">Decrement</button>
</body>
```

 

# العدّ: {count}

 Increment  Decrement">

![](/images/ahastack/example-first-2-Screenshot-2024-01-03T10.52.59AM.B6vxtszX_zYXX.webp)

عندما تنقر زرّ Increment، يُصدر htmx طلب POST إلى `/api/increment`.

أنشئ `src/pages/api/increment.astro`

```astro
---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value'
).first('value')
---

{count}
```

`export const partial = true` تخبر Astro أن هذا يُعيد «شظية HTML» (HTML fragment) بسيطة، لا صفحة كاملة.

استعلام SQL يُجري الزيادة ويُعيد القيمة الجديدة في استعلام ذرّي واحد، لذا لا يستطيع شخصان ينقران في اللحظة نفسها أن يتداخلا مع بعضهما.

أصبح النقر على الزر يُعيد القيمة الجديدة داخل الزر، لأن htmx يستبدل افتراضيًا الـ HTML المُعاد مكان `innerHTML` للعنصر الذي أطلق طلب الشبكة.

![](/images/ahastack/example-first-3-Screenshot-2024-01-03T10.28.21AM.SaAhSXe1_Z1xmHNG.webp)

يمكنك تغيير HTML إلى

```astro
<body>
  <h1>
    Count: <span id='count'>{count}</span>
  </h1>

  <button hx-post='/api/increment' hx-target='#count'>
    Increment
  </button>
  <button hx-post='/api/decrement' hx-target='#count'>
    Decrement
  </button>
</body>
```

 

#  العدّ: {count}

     Increment     Decrement  ">

والآن تُحدَّث قيمة العدّاد ديناميكيًا.

انقر الزرّ، وسترى القيمة تزداد بشكل صحيح:

![](/images/ahastack/example-first-4-Screenshot-2024-01-03T10.24.10AM.BGAJNPYI_1QdSDx.webp)

لاحظ أننا أرسلنا HTML (في هذه الحالة، أرجعنا رقمًا فحسب، لكنه يُعاد بنوع MIME من نوع `text/html`، لا بصيغة أخرى مثل JSON مثلًا) إلى جهة العميل، وأن هذا HTML يُستبدل في الصفحة في الموضع الذي نريده تمامًا.

كما ننشئ «نداء الـ API» (API call) لإنقاص القيمة في `src/pages/api/decrement.astro`

```astro
---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value - 1 WHERE id = 1 RETURNING value'
).first('value')
---

{count}
```

كل تحديثات القيمة تحدث دون إعادة تحميل كاملة للصفحة، ودون أن نكتب *أي* شيفرة JavaScript بأنفسنا، ودون إطار «تطبيق صفحة واحدة» (SPA).

في لوحة الشبكة (network) في أدوات مطوّر المتصفح يمكنك رؤية كل الطلبات التي لا تُعيد سوى أجزاء من HTML.

![](/images/ahastack/example-first-5-Screenshot-2024-01-03T10.45.25AM.BESsjwtr_2cw3pv.webp)

![](/images/ahastack/example-first-6-Screenshot-2024-01-03T10.47.24AM.CRiPpMpT_2kTquq.webp)

إعادة تحميل الصفحة تُظهر لك القيمة الحالية. الحالة كلها مُدارة على الخادم.

دعني أخبرك بمبدّلات oob (out-of-band) في htmx، لأن هذا سيُذهلك.

في HTML المُعاد من `/api/decrement` أو `/api/increment`، بدلًا من إرجاع `{count}` يمكنك إرجاع:

```astro
<span id='count' hx-swap-oob='true'>{count}</span>
```

{count}">

ولن تعد بحاجة إلى وضع `hx-target='#count'` على الزرّين. فـ HTML الذي يُولَّد على الخادم هو ما يقرّر ما الذي يُستبدل.

عندما تحتوي الاستجابة على عناصر oob فقط، يترك htmx الزرّ وشأنه. لا يُستبدل شيء آخر.

الأمر المذهل أنه يمكنك أن يحتوي HTML المُعاد على عدة عناصر تحمل `hx-swap-oob='true'` فتحلّ محل أجزاء مختلفة من تطبيقك.

حان وقت النشر. ابنِ الموقع وادفعه إلى Cloudflare:

نافذة الطرفية

```sh
npx astro build
npx wrangler deploy
```

يطبع Wrangler عنوان URL الخاص بـ Worker. هذا كل شيء، التطبيق منشور الآن.

لم يكن هذا سوى مثال صغير على استخدام Astro لتوليد HTML، وhtmx لقيادة التفاعل من جهة العميل إلى الخادم، في طريقة كنتَ ستظنّ أنك تحتاج فيها إلى إطار معقّد لتطبيق صفحة واحدة (SPA) وإلى كمّ هائل من شيفرة JavaScript، لكننا هنا لم نكتب سطرًا واحدًا من شيفرة JavaScript في جهة العميل (كنا قد كتبنا شيفرة JS في الواجهة الخلفية لقراءة القيمة وكتابتها، لكن هذه قصة أخرى).

لقد كنت أستخدم هذه الحزمة لبناء تطبيق أعقد بكثير، بشاشات كثيرة وتفاعل وتسجيل دخول وقاعدة بيانات، وهذا النهج يتوسّع إلى حدٍّ جيّد.

هل يمكن أن يناسب هذا حالتك أنت أيضًا؟ كما يقولون، هذا يعتمد. جرّبه في أمور صغيرة وشاهد بنفسك.

شيفرة التطبيق الكاملة:

`src/pages/index.astro`

```astro
---
import { env } from 'cloudflare:workers'

const count = await env.DB.prepare('SELECT value FROM counter WHERE id = 1')
  .first('value')
---

<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width' />
    <title>AHA counter</title>
    <script src='https://cdn.jsdelivr.net/npm/htmx.org@4.0.0'></script>
  </head>
  <body>
    <h1>Count: <span id='count'>{count}</span></h1>

    <button hx-post='/api/increment'>Increment</button>
    <button hx-post='/api/decrement'>Decrement</button>
  </body>
</html>
```

  AHA counter   

# العدّ: {count}

 Increment  Decrement  ">

`src/pages/api/increment.astro`

```astro
---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value'
).first('value')
---

<span id='count' hx-swap-oob='true'>{count}</span>
```

{count}">

`src/pages/api/decrement.astro`

```astro
---
import { env } from 'cloudflare:workers'

export const partial = true

const count = await env.DB.prepare(
  'UPDATE counter SET value = value - 1 WHERE id = 1 RETURNING value'
).first('value')
---

<span id='count' hx-swap-oob='true'>{count}</span>
```

{count}">
