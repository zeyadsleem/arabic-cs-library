---
title: البث مع العرض في جانب الخادم
lang: ar
source: https://www.patterns.dev/react/streaming-ssr/
---
للعرض في جانب الخادم (server-side rendering، SSR) الكلاسيكي مشكلة حجز للاستجابة (buffering). ينفذ الخادم العرض كاملًا — بما في ذلك كل عملية جلب بيانات غير متزامنة تحتاجها الصفحة — ولا يكتب استجابة HTML واحدة إلا بعدها. إذا استغرق أبطأ جلب في الصفحة 800 مللي ثانية، سينتظر المستخدم 800 مللي ثانية على الأقل قبل رسم *أي* محتوى. إذ تحتجز أسرع أجزاء الصفحة رهينة لأبطئها.

يعالج SSR بالبث (streaming SSR) ذلك بالسماح لـ React بإرسال HTML إلى المتصفح فور توفّره. يُرسل الهيكل (shell)، أي الترويسة والتنقل وواجهة التخطيط وكل ما لا يعتمد على بيانات غير متزامنة، فورًا. أما الأجزاء البطيئة — المغلّفة بـ `` — فتُبث لاحقًا كقطع ضمن استجابة HTTP نفسها، ويحل كل جزء محل بديل احتياطي (fallback) كان ظاهرًا مسبقًا.

يبدأ المتصفح التحليل فور وصول البايتات. ينخفض TTFB لأن الخادم لا ينتظر. وينخفض LCP عادةً لأن المحتوى الرئيسي موجود في المقطع الأول. يرى المستخدم حركة — تتحول العناصر النائبة إلى محتوى حقيقي — بدلًا من التحديق في علامة تبويب فارغة.

## واجهتا البث في React 18+

أعادت React 18 تصميم واجهات الخادم حول البث. وهناك واجهتان حسب بيئة التشغيل:

- **`renderToPipeableStream`** — لـ Node.js. تُعيد تدفقًا قابلًا للتوجيه (Pipeable stream) تستدعي `pipe()` لإرساله في الاستجابة. وتستخدم الاستدعاءات `onShellReady` و`onAllReady` و`onError`.
- **`renderToReadableStream`** — لبيئات Web/Edge مثل Cloudflare Workers وVercel Edge وDeno وBun. تُعيد `Promise` تحتوي على `ReadableStream` من Web يمكنك إعادته بوصفه جسم الاستجابة.

أُزيلت `renderToNodeStream` الأقدم في React 19. إذا كنت تصون خادمًا ما زال يستخدمها، فهذه هي عملية الانتقال المطلوبة؛ لأنها لا تدعم `` أو أيًا من ضمانات البث الموضحة أدناه.

## البث على Node باستخدام `renderToPipeableStream`

إليك إعدادًا كاملًا لـ SSR بالبث في صفحة لوحة معلومات تحليلية. يُعرض الهيكل فورًا، بينما يعلّق كل من الرسم البياني وخلاصة النشاط الأخير تنفيذه على عمليات الجلب الخاصة به ويُبث كل منهما بصورة مستقلة.

```javascript
// server.jsx

import express from "express";

import { renderToPipeableStream } from "react-dom/server";

import Dashboard from "./Dashboard";\n

const app = express();\n

app.get("/", (req, res) => {

let didError = false;\n

const { pipe, abort } = renderToPipeableStream(<Dashboard />, {

bootstrapModules: ["/static/client.js"],

onShellReady() {

res.statusCode = didError ? 500 : 200;

res.setHeader("Content-Type", "text/html");

pipe(res);

},

onShellError(error) {

res.statusCode = 500;

res.setHeader("Content-Type", "text/html");

res.send("<h1>Dashboard unavailable</h1>");

},

onError(error) {

didError = true;

console.error(error);

},

});\n

// Drop the connection if a client hangs for too long.

setTimeout(abort, 10_000);

});\n

app.listen(3000);
```

وها هي الصفحة نفسها، مع اعتمادَي بيانات يعلّقان التنفيذ:

```javascript
// Dashboard.jsx

import { Suspense } from "react";

import ChartCard from "./ChartCard";

import ActivityFeed from "./ActivityFeed";\n

export default function Dashboard() {

return (

<html>

<body>

<header>

<h1>Analytics</h1>

<nav>{/* always-fast nav */}</nav>

</header>\n

<Suspense fallback={<ChartCardSkeleton />}>

<ChartCard /> {/* fetches a slow time series */}

</Suspense>\n

<Suspense fallback={<ActivityFeedSkeleton />}>

<ActivityFeed /> {/* fetches the last 50 events */}

</Suspense>

</body>

</html>

);

}
```

ما يراه المتصفح، بالترتيب:

- **الهيكل**، أي HTML والترويسة والتنقل وهيكلَي التحميل — يُرسل عند إطلاق `onShellReady`.
- **أيهما ينتهي أولًا من البيانات** — يُبث HTML الخاص به مع سكربت مضمّن يستبدل الهيكل المقابل.
- **الآخر**، عند جاهزيته.

إذا حُلّت خلاصة النشاط خلال 80 مللي ثانية والرسم البياني خلال 600 مللي ثانية، فسيرى المستخدم خلاصة النشاط عند 80 مللي ثانية بدلًا من انتظار 600 كاملة. بدت الصفحة أسرع سبع مرات.

## `onShellReady` مقابل `onAllReady`

تمثل الاستدعاءان نوايا مختلفة جوهريًا:

- **`onShellReady`** يُطلق في اللحظة التي يصبح فيها كل ما هو *خارج* حدود `` قابلًا للعرض. وهذا هو الخيار الذي تريده للمستخدمين؛ أرسل الهيكل في أقرب وقت ممكن ودع البقية تبث.
- **`onAllReady`** لا يُطلق إلا عند عرض الشجرة كاملة، بما في ذلك محتوى كل حدود ``. استخدمه مع العملاء الذين لا يستطيعون معالجة التحديثات المبثوطة أو لا يريدون ذلك، مثل بعض زواحف البحث وعرض البريد الإلكتروني وأدوات جلب معاينات بطاقات التواصل ومصدّرات RSS.

النمط الشائع هو اكتشاف `user-agent` واختيار الاستدعاء المناسب:

```javascript
const isCrawler = /bot|crawler|spider|crawling/i.test(req.headers["user-agent"] || "");\n

const { pipe } = renderToPipeableStream(<App />, {

bootstrapModules: ["/static/client.js"],

[isCrawler ? "onAllReady" : "onShellReady"]() {

res.statusCode = didError ? 500 : 200;

res.setHeader("Content-Type", "text/html");

pipe(res);

},

onError(err) {

didError = true;

console.error(err);

},

});
```

## البث على الحافة (edge) باستخدام `renderToReadableStream`

لا تملك بيئات الحافة تدفقات Node؛ بل تستخدم `Web Streams`. الشكل مشابه، لكن الواجهة قائمة على `Promise`:

```python
// edge-handler.jsx

import { renderToReadableStream } from "react-dom/server";

import App from "./App";\n

export default {

async fetch(request) {

let didError = false;\n

const stream = await renderToReadableStream(<App />, {

bootstrapModules: ["/static/client.js"],

onError(err) {

didError = true;

console.error(err);

},

});\n

// Wait for the shell before responding — analogous to onShellReady.

await stream.allReady; // omit this to flush as early as possible

// Or, for crawlers, wait for the whole tree:

// await stream.allReady;\n

return new Response(stream, {

status: didError ? 500 : 200,

headers: { "content-type": "text/html" },

});

},

};
```

تُحل Promise التي تعيدها `renderToReadableStream` فور جاهزية الهيكل. أما التدفق نفسه فيملك Promise اسمها `allReady` يمكنك انتظارها متى احتجت الشجرة كاملة، كما في حالة زاحف البحث. وإذا لم تنتظر أي شيء بعد Promise الأولية، يبدأ بث الاستجابة فورًا.

## الترطيب مع البث

الترطيب في عالم البث هو نظير العرض: فور وصول كل مقطع، يطابق React في العميل عقد DOM الجديدة بشيفرة المكوّنات ويربط مستمعي أحداثها. وهذه هي **الترطيب الانتقائي (selective hydration)**، ولها خاصيتان مهمتان:

- **يتم الترطيب على شكل مقاطع.** تُرطَّب حدود `` بصورة مستقلة عن بقية الصفحة. فيستطيع المستخدم التفاعل مع التنقل بينما لا يزال الرسم البياني قيد التحميل.
- **تفوق إدخال المستخدم.** إذا ضغط المستخدم زرًا في منطقة لم تُرطَّب بعد، فإن React يعطي أولوية لترطيب *تلك* المنطقة أولًا. ويمنع الترطيب الانتقائي أسوأ أشكال الوادي الغريب، حيث تضيع نقرة بصمت لأن الترطيب كان مشغولًا في مكان آخر.

في جانب العميل، استخدم `hydrateRoot`:

```javascript
// client.jsx

import { hydrateRoot } from "react-dom/client";

import App from "./App";\n

hydrateRoot(document, <App />);
```

أُزيلت `ReactDOM.hydrate` في React 19. إذا ما زلت تستخدمها، فالتبديل إلى `hydrateRoot` هو مسار الترقية.

## حدود الأخطاء ليست اختيارية مع البث

بعد إرسال الهيكل، لا يستطيع خطأ في مكوّن أعمق تغيير رمز حالة HTTP. الخيارات المتاحة هي فقط: (أ) استبدال المنطقة المتأثرة بديل احتياطي في التدفق، أو (ب) ترك React تفككها في العميل أثناء الترطيب. ويتطلب الخياران Error Boundary.

```javascript
<ErrorBoundary fallback={<p>Could not load reviews.</p>}>

<Suspense fallback={<ReviewSkeleton />}>

<Reviews productId={id} />

</Suspense>

</ErrorBoundary>
```

النمط هو: لُف كل منطقة مبثوطة داخل *حد أخطاء* وحد Suspense معًا. يتولى حد Suspense حالة «ما زال قيد التحميل»، ويتولى حد الأخطاء حالة «اكتمل التحميل لكن فشل».

لاسترجاع الأخطاء بأمان، خصّص `onError` في `renderToPipeableStream` مكان التسجيل؛ أما حد الأخطاء فهو المكان الذي تعرض فيه واجهة بديلة.

## البث في Next.js

يتولى App Router كل ذلك نيابةً عنك. يتحول أي ملف `loading.tsx` في مقطع مسار تلقائيًا إلى حد ``، وأي مكوّن خادمي غير متزامن يعلّق التنفيذ يُبث عند حل بياناته.

```javascript
app/dashboard/

layout.tsx       <-- always renders, flushed first

loading.tsx      <-- Suspense fallback for the page

page.tsx         <-- async, can fetch data

@analytics/

loading.tsx

page.tsx       <-- parallel route, streams independently

error.tsx        <-- error boundary
```

لا تكتب `renderToPipeableStream` مباشرة؛ فـ Next.js تستدعيه، أو تكافئه على الحافة، نيابةً عنك وتربط البث وفق اصطلاحات الملفات هذه. وتكون النتيجة هي نفسها: يُرسل التخطيط الساكن فورًا، وتُبث البيانات البطيئة، ويتولى الترطيب الانتقائي التفاعلية.

## تكلفة البث

البث ليس مجانيًا. وفيما يلي بعض الأمور التي ينبغي الانتباه إليها:

- **لا يمكنك تغيير ترويسات الاستجابة بعد المقطع الأول.** رمز الحالة و`Set-Cookie` وإعادة التوجيه وترويسات الأمان — تتخذ كلها قراراتها قبل الإرسال الأول. إذا كان مكوّن أعمق سيؤدي إلى 404، فيمكنك عرض رسالة خطأ داخل البث، لكن رمز حالة الاستجابة يثبت عند 200.
- **تتعطل بعض البرمجيات الوسيطة.** أي شيء يجمع الاستجابة كاملة، كضغط被执行 بصورة خاطئة أو إعدادات معينة لـ WAF أو CDN، يبطل البث كليًا. تحقق باستخدام `curl` وراقب أن `Transfer-Encoding: chunked` يتصرف فعليًا كتدفق.
- **يبدو TTFB أقل من التجربة الفعلية.** تصل البايتة الأولى سريعًا، لكنها قد تكون الهيكل وحده. قارن SSR بالبث بـ SSR من دون بث عبر LCP وINP، لا TTFB وحده.
- **يغير Suspense أنماط جلب البيانات.** يجب أن يستخدم المكوّن الذي يعلّق التنفيذ طبقة بيانات متوافقة مع Suspense، إما hook `use()` في React، أو وسيط إطار عمل مثل `fetch` في Next.js و`useLoaderData` في Remix، أو مكتبة تتكيف مثل `useSuspenseQuery` في TanStack Query. ولا يعلّق `useEffect` العادي التنفيذ.

## متى يكون SSR بالبث الخيار الصحيح

| ملف الصفحة | هل تستخدم SSR بالبث؟ |
| --- | --- |
| لوحة معلومات تضم عدة عمليات جلب بطيئة | نعم — أكبر مكسب. |
| صفحة تسويق وكل بياناتها ساكنة | لا — استخدم SSG أو PPR. |
| صفحة محمية بالمصادقة وتضم عملية جلب سريعة واحدة | اختياري — المكاسب صغيرة إذا لم يكن هناك ما يتداخل زمنيًا. |
| تحديثات بيانات مباشرة وآنية | يتولى SSR بالبث الرسم الأولي؛ استخدم WebSocket أو SSE للتحديثات المستمرة. |
| صفحات تحتاج زواحف البحث إلى عرضها كاملة | نعم، لكن استخدم `onAllReady` لهذا النوع من العملاء. |

ينسجم SSR بالبث بصفة خاصة مع **العرض الجزئي المسبق (Partial Prerendering)**، حيث يُبث هيكل ساكن قبل بدء أي عمل ديناميكي، ومع **مكوّنات React الخادمية (React Server Components)**، التي تستطيع تنفيذ جلب بياناتها في الخادم من دون المساهمة في حزمة العميل. ويبدأ النمط التالي في هذه السلسلة، **الترطيب التدريجي (Progressive Hydration)**، من حيث يتوقف SSR بالبث — في حل مسألة *كم* من JavaScript ينبغي إرساله كي تصبح الصفحة تفاعلية، لا مجرد كيفية رسم HTML لها.
