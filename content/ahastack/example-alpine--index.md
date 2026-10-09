---
title: "إضافة Alpine"
lang: ar
source: https://ahastack.dev/examples/alpine/
---

في [المثال السابق](/book/ahastack/example-first/index) بنينا عدّادًا باستخدام Astro و htmx. لنضِف الآن «A» في نهاية AHA.

سنضيف زرّ إعادة تعيين (Reset). لكن إعادة التعيين إجراء مُتلِف، لذا نريد من المستخدم أن يؤكّد أولًا.

إليك قاعدة الإبهام: كل ما يتحدث إلى الخادم فهو htmx. وكل ما هو حالة واجهة (UI state) فحسب، تعيش في المتصفح وحده، فهو Alpine.

«هل أطلب تأكيدًا الآن؟» هي حالة واجهة. وهذه مهمة Alpine.

«اجعل القيمة صفرًا» يتحدث إلى الخادم. وهذه مهمة htmx.

ثبّت Alpine بإضافة وسم `` إلى ``، بجوار htmx:

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
```

الآن أضف هذا إلى ``، تحت الزرّين:

```html
<div x-data="{ confirming: false }">
  <button x-show="!confirming" @click="confirming = true">Reset</button>
  <span x-show="confirming">
    Sure?
    <button hx-post="/api/reset" @click="confirming = false">Yes</button>
    <button @click="confirming = false">No</button>
  </span>
</div>
```

  Reset    Sure?  Yes  No   ">

لنرَ ما يحدث هنا.

`x-data` ينشئ قطعة صغيرة من الحالة، هي `confirming`، محصورة في نطاق هذا `div` تحديدًا. وتبدأ بقيمة `false`.

`x-show` يُظهر عنصرًا أو يخفيه بحسب شرط. عندما تكون `confirming` مساوية لـ `false` نرى زرّ إعادة التعيين. وعندما تكون `true` نرى السؤال.

`@click` يشغّل بعض شيفرة JavaScript عند نقر العنصر. وهنا نحن نكتفي بعكس قيمة `confirming`.

زرّ «Yes» هو المكان الذي تلتقي فيه htmx و Alpine. فـ `hx-post` يُرسل الطلب إلى الخادم، و `@click` يُغلق نافذة التأكيد. سمتان بمكتبتين، وزرّ واحد.

الآن إلى جهة الخادم. أنشئ `src/pages/api/reset.astro`:

```astro
---
import { env } from 'cloudflare:workers'

export const partial = true

await env.DB.prepare('UPDATE counter SET value = 0 WHERE id = 1').run()
---

<span id='count' hx-swap-oob='true'>0</span>
```

0">

النمط نفسه كما في الزيادة والإنقاص. حدّث قاعدة البيانات، وأعِد القيمة الجديدة كمبادلة oob.

جرّبه على [https://demo.ahastack.dev/counter](https://demo.ahastack.dev/counter).

يوجد في ذلك الموقع [18 عرضًا توضيحيًا](https://demo.ahastack.dev): بحثٌ فوري، وقوائم مهام، وتحقّقٌ فوري من الحقول، وتمريرٌ لا نهائي، واستطلاع (polling)، ونوافذ منبثقة، وواجهة تفاؤلية (optimistic UI)، ومعالجة أخطاء، وتنقّلٌ مُعزَّز (boosted navigation)، وغيرها. ولكلٍّ منها قسم «ما الذي ينبغي الانتباه إليه» ورابطٌ إلى شيفرته المصدرية.

لاحظ ما *لم* نفعله. لم نكتب مستمع حدث (event listener). لم نُسأل DOM. لم نتتبّع الحالة في متغيّر JavaScript في مكان آخر ونزامنها مع الـ HTML.

الحالة تعيش في مكان استخدامها بالضبط. أنت تقرأ الـ HTML وتعرف ما الذي يحدث.

هذه هي رشة التفاعلية. Alpine ممتاز في هذه الأشياء الصغيرة والمحلية: التبديل، والإظهار والإخفاء، وتتبّع قيمة حقل إدخال، والاستجابة لضغطة مفتاح.

شيفرة الصفحة الكاملة، `src/pages/index.astro`:

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
    <script defer src='https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js'
    ></script>
  </head>
  <body>
    <h1>Count: <span id='count'>{count}</span></h1>

    <button hx-post='/api/increment'>Increment</button>
    <button hx-post='/api/decrement'>Decrement</button>

    <div x-data='{ confirming: false }'>
      <button x-show='!confirming' @click='confirming = true'>Reset</button>
      <span x-show='confirming'>
        Sure?
        <button hx-post='/api/reset' @click='confirming = false'>Yes</button>
        <button @click='confirming = false'>No</button>
      </span>
    </div>
  </body>
</html>
```

        AHA counter         

# العدّ: {count}

   Increment  Decrement     Reset    Sure?  Yes  No       ">
