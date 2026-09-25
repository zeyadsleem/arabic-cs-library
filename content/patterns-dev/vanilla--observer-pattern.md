---
title: نمط المراقب (observer)
lang: ar
source: https://www.patterns.dev/vanilla/observer-pattern/
---
تخيل أنك تبني لوحة بيانات للأسعار. تصل حركة السعر عبر WebSocket، وتحتاج عدة أجزاء غير مترابطة من واجهة المستخدم إلى التفاعل: يعيد مخطط الرسم، ويومض صف في قائمة المتابعة باللون الأخضر أو الأحمر، ويُعاد حساب إجمالي المحفظة، ويسجل سجل تدقيق حركة السعر. ولا شأن لـ WebSocket بهذه المستهلكات. ما يحتاجه هو طريقة لقول «هنا حركة سعر جديدة» ثم ترك الأطراف المهتمة تقرر ما الذي يعنيه ذلك بالنسبة لها.

هذا هو نمط المراقب (observer). يحتفظ **الموضوع (subject)** بقائمة من **المراقبين (observers)** ويبث لهم التحديثات عند حدوث تغيير. يمكن للمراقبين الجدد الارتباط وقتما يشاؤون، ويمكن للمراقبين القائمين فك الارتباط عند انتهاء عملهم. لا يحتوي الموضوع على أي ارتباط ثابت بمستهلك بعينه.

## الشكل الأساسي

يحتاج الموضوع على الأقل إلى ثلاثة أمور: مكان لحفظ المراقبين، وطريقة لإضافتهم وإزالتهم، وطريقة لدفع التحديثات. إليك تطبيقًا صغيرًا يستخدم `Set` لنحصل على إزالة بتعقيد O(1) ومنع التكرار مجانًا.

```javascript
class Subject {

#observers = new Set();

subscribe(observer) {

this.#observers.add(observer);

// Hand back an unsubscribe function — easier than asking

// the caller to hold onto the reference they passed in.

return () => this.#observers.delete(observer);

}

notify(payload) {

for (const observer of this.#observers) {

observer(payload);

}

}

}
```

القيمة التي تعيدها `subscribe` تمثل مكسبًا صغيرًا في سهولة الاستخدام يغطي تكلفته أول مرة تنسى فيها ما مررته. يخزن المستدعي الدالة المعادة ويستدعيها عند انتهائه — من دون بحث أو مقارنة مساواة أو وجود دالة `unsubscribe` على الموضوع أصلًا.

## مثال ملموس: مؤشر أسعار

لنوصل الموضوع بتدفق أسعار وبضعة مستهلكين يريدون معرفتها.

```javascript
const ticker = new Subject();

// A chart that buffers ticks and redraws every animation frame.

const chartQueue = [];

let pending = false;

const drawChart = (tick) => {

chartQueue.push(tick);

if (pending) return;

pending = true;

requestAnimationFrame(() => {

renderChart(chartQueue);

chartQueue.length = 0;

pending = false;

});

};

// A watchlist row that flashes when its symbol updates.

const flashRow = ({ symbol, price, previous }) => {

if (symbol !== "AAPL") return;

document

.querySelector('[data-symbol="AAPL"]')

?.classList.toggle("up", price > previous);

};

// A logger that records every tick for replay.

const logTick = (tick) => console.debug("[tick]", tick);

const unsubChart = ticker.subscribe(drawChart);

const unsubRow   = ticker.subscribe(flashRow);

const unsubLog   = ticker.subscribe(logTick);

// Somewhere else, the WebSocket pushes new prices in:

socket.addEventListener("message", (event) => {

const tick = JSON.parse(event.data);

ticker.notify(tick);

});
```

كل مستهلك دالة صغيرة ومركزة. لا يعرف مؤشر الأسعار أيًا منها بالاسم. وإذا قررت لاحقًا أن صف قائمة المتابعة ينبغي أن يستخدم تأخير التجميع (debounce)، أو أن المسجل ينبغي أن يلتقط حركة واحدة من كل عشر، فستغير المستهلك — ويبقى مؤشر الأسعار دون مساس. هذا الفصل هو المكسب الكامل للنمط.

## استخدام المراقب المدمج في المتصفح (browser): `EventTarget`

لا تحتاج دائمًا إلى كتابة `Subject` خاص بك. منذ عام 2017، أتت كل المتصفحات بكائن `EventTarget` قابل للإنشاء — وهي الآلية نفسها التي يستخدمها DOM في `addEventListener`، لكنها متاحة الآن للكائنات العشوائية.

```javascript
class Ticker extends EventTarget {

push(tick) {

this.dispatchEvent(new CustomEvent("tick", { detail: tick }));

}

}

const ticker = new Ticker();

ticker.addEventListener("tick", (e) => drawChart(e.detail));

ticker.addEventListener("tick", (e) => flashRow(e.detail));
```

يوفر لك هذا آلية نشر/اشتراك (pub/sub) جاهزة مع ميزة مهمة: **التكامل مع `AbortSignal`**. يصبح التنظيف سطرًا واحدًا مهما كان عدد المستمعين الذين سجلتهم.

```javascript
const controller = new AbortController();

const { signal } = controller;

ticker.addEventListener("tick", drawChart, { signal });

ticker.addEventListener("tick", flashRow,  { signal });

ticker.addEventListener("tick", logTick,   { signal });

// Later, when the dashboard unmounts:

controller.abort(); // every listener attached with `signal` is removed
```

إذا نسيت يومًا إزالة مستمع وتتبعت تسريب ذاكرة عبر لقطات الذاكرة في Chrome DevTools، سيبدو هذا كمعجزة صغيرة. تحوّل الإشارة عبارة «تذكر كل اشتراك كي تنظفه» إلى استدعاء `abort()` واحد.

## المراقب مقابل النشر/الاشتراك

النمطان شقيقان، وكثيرًا ما يختلطان. لكن التمييز بينهما حقيقي ومفيد.

|  | المراقب | النشر/الاشتراك |
| --- | --- | --- |
| **الاقتران** | المراقب يعرف الموضوع | الناشر والمشترك يعرفان الوسيط فقط |
| **التوجيه** | موضوع واحد؛ يتلقى كل المراقبين كل إشعار | موضوع أو قناة — يشترك المشتركون في أسماء محددة |
| **التنفيذ** | دالة على الموضوع | كائن وسيط منفصل (ناقل أحداث) |
| **الاستخدام المعتاد** | كائن مجال يعلم مراقبيه | ناقل أحداث على مستوى التطبيق عبر وحدات غير مترابطة |

في مؤشر الأسعار أعلاه، يكون `ticker` هو الموضوع، ويتلقى كل مشترك حركة السعر — وهذا نمط المراقب الكلاسيكي. لكن لو كان لدينا بدلًا من ذلك `bus.publish("ticks/AAPL", price)` واختار المشتركون حسب الموضوع، فسيكون ذلك نشرًا/اشتراكًا.

إليك نظام نشر/اشتراك مصغرًا مبنيًا على `EventTarget`:

```javascript
class EventBus {

#target = new EventTarget();

publish(topic, data) {

this.#target.dispatchEvent(new CustomEvent(topic, { detail: data }));

}

subscribe(topic, handler, { signal } = {}) {

const listener = (e) => handler(e.detail);

this.#target.addEventListener(topic, listener, { signal });

return () => this.#target.removeEventListener(topic, listener);

}

}
```

## الصيغ الحديثة التي ينبغي معرفتها

### المتكررون غير المتزامنون (async iterators)

إذا كانت «أحداثك» تسلسلًا في الواقع، فإن متكررًا غير متزامن يحوّلها إلى حلقة `for await...of` — شيفرة تُقرأ من الأعلى إلى الأسفل وتتوقف عند كل تكرار:

```javascript
async function* watchTicks(socket, { signal }) {

while (!signal.aborted) {

const message = await new Promise((resolve, reject) => {

socket.addEventListener("message", resolve, { once: true, signal });

socket.addEventListener("error",   reject,  { once: true, signal });

});

yield JSON.parse(message.data);

}

}

const controller = new AbortController();

for await (const tick of watchTicks(socket, { signal: controller.signal })) {

drawChart(tick);

}
```

يتألف هذا جيدًا مع `AsyncIterator.prototype.map` وأمثالها — مقترحات تتقدم عبر TC39 وتعمل بالفعل في المحركات الحديثة عبر مكتبات مساعدة.

### الإشارات التفاعلية (reactive signals)

تتمثل صيغة مختلفة للمراقب في **الإشارة (signal)**: عنصر تفاعلي صغير يعرف الدوال التي تقرأه ويعيد تشغيلها عند تغيره. لقد تقاربت أنماط Preact وSolid وAngular وVue جميعها على شكل مشابه، وهناك مقترح من TC39 يستكشف صيغة معيارية.

```javascript
import { signal, computed, effect } from "@preact/signals-core";

const price    = signal(100);

const quantity = signal(2);

const total    = computed(() => price.value * quantity.value);

effect(() => console.log(`Total: $${total.value}`));

price.value = 110;   // logs "Total: $220"

quantity.value = 3;  // logs "Total: $330"
```

الاشتراك غير مرئي — فـ`effect` يعيد التشغيل ببساطة عند تغير أي إشارة قرأها. وتحت السطح، لا يزال هذا مراقبًا: الإشارة هي الموضوع، والتأثير هو المراقب.

### RxJS لتركيب التدفقات

عندما تهم العلاقة بين الأحداث — مثل تأخير تجميع مربع بحث، أو دمج تدفقين، أو إعادة المحاولة عند الفشل — تبرر RxJS تكلفتها. إليك بحثًا فوريًا ينتظر المستخدم حتى يتوقف عن الكتابة، ويتجاهل عمليات البحث المكررة، ويلغي الطلبات القديمة:

```javascript
import { fromEvent, switchMap, debounceTime, distinctUntilChanged, map } from "rxjs";

const input = document.querySelector("#search");

fromEvent(input, "input").pipe(

map((e) => e.target.value.trim()),

debounceTime(250),

distinctUntilChanged(),

switchMap((q) =>

q ? fetch(`/api/search?q=${encodeURIComponent(q)}`).then((r) => r.json()) : []

)

).subscribe(renderResults);
```

يلغي `switchMap` تلقائيًا الجلب السابق عند وصول استعلام جديد — وهو السلوك المطلوب تمامًا في البحث الفوري. ويمكن تنفيذ ذلك يدويًا فوق مراقب عادي، لكنه مرهق؛ تجعل RxJS الأمر تصريحيًا.

## المزالق الشائعة

### تسريبات الذاكرة بسبب الاشتراكات المنسية

هذا هو نمط الفشل الخاص بالنمط. كل اشتراك مرجع من الموضوع إلى المراقب؛ وإلى أن تلغي الاشتراك، لا يمكن جمع المراقب (ولا أي شيء يغلقه) في الذاكرة. وهناك ثلاثة طرق للتخفيف:

- **استخدم `AbortSignal`** مع `EventTarget` ليكون التنظيف باستدعاء `abort()` واحد.
- **أعد دالة إلغاء اشتراك من `subscribe`** كي لا يحتاج المستدعون إلى البحث عن معالجهم من جديد.
- **اربط الاشتراكات بدورات حياة المكونات** في أطر العمل — تنظيف `useEffect` في React، و`onScopeDispose` في Vue، و`onDestroy` في Svelte.

### افتراضات ترتيب الإشعارات

يتلقى المراقبون الإشعارات بترتيب الاشتراك في معظم التطبيقات، لكن لا ينبغي الاعتماد على ذلك في صحة البرنامج. إذا كان المراقب B يحتاج فعلًا إلى التنفيذ بعد المراقب A، فهذه تبعية لا يستطيع النمط التعبير عنها؛ صُرّح بها بدلًا من ذلك.

### عواصف الإشعارات المتزامنة

ينفذ `notify` كل مراقب بصورة متزامنة. إذا استغرق مراقب 200 مللي ثانية، فسينتظر كل المراقبين الذين يأتون بعده. وإذا وصلت حركة كل 16 مللي ثانية واستغرق مراقبوك وقتًا أطول من ذلك، فأنت على وشك فقدان إطارات العرض أو انفجار الطابور. فكّر في المعالجة على دفعات (كما في المثال السابق للمخطط) أو نقل الأعمال الثقيلة إلى `queueMicrotask` / `setTimeout`.

### إشعارات إعادة الدخول

إذا كان معالج المراقب يطلق إشعار `notify` جديدًا على الموضوع نفسه، فقد تنتهي إلى تكرار غير متوقع. إذا كان هذا خطرًا حقيقيًا في مجالك، فاضبط الإشعارات في طابور بدلًا من إرسالها مباشرة.

## متى لا تستخدم المراقب

- **عندما يكفي تدفق بيانات لمرة واحدة.** `Promise` هو الشكل المناسب لعبارة «أخبرني عندما ينتهي هذا، مرة واحدة». المراقب للأحداث المتكررة.
- **عندما يبقى الموضوع والمراقب معًا دائمًا.** إذا لم يراقب الموضوع سوى شيء واحد دائمًا وأنشئا معًا في المكان نفسه، فاستدعاء دالة مباشرة أبسط وأسهل في الفهم.
- **عندما تحتاج إلى ذهاب وإياب بين الطلب (request) والاستجابة (response).** المراقب إرسال بلا انتظار. إذا كان المستدعون يتوقعون إجابة، فاستخدم استدعاء دالة أو وعدًا أو ناقل أوامر.

## المراجع

- [EventTarget — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [AbortController — MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [RxJS](https://rxjs.dev)
- [مقترح Signals — TC39](https://github.com/tc39/proposal-signals)
- [المتكررون غير المتزامنون — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
