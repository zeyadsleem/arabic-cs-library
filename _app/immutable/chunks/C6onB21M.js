const e="patterns-dev",t="vanilla",n="أنماط JavaScript",o="observer-pattern",r="نمط المراقب (observer)",s=[{depth:2,id:"الشكل-الأساسي",text:"الشكل الأساسي"},{depth:2,id:"مثال-ملموس-مؤشر-أسعار",text:"مثال ملموس: مؤشر أسعار"},{depth:2,id:"استخدام-المراقب-المدمج-في-المتصفح-browser-eventtarget",text:"استخدام المراقب المدمج في المتصفح (browser): EventTarget"},{depth:2,id:"المراقب-مقابل-النشرالاشتراك",text:"المراقب مقابل النشر/الاشتراك"},{depth:2,id:"الصيغ-الحديثة-التي-ينبغي-معرفتها",text:"الصيغ الحديثة التي ينبغي معرفتها"},{depth:3,id:"المتكررون-غير-المتزامنون-async-iterators",text:"المتكررون غير المتزامنون (async iterators)"},{depth:3,id:"الإشارات-التفاعلية-reactive-signals",text:"الإشارات التفاعلية (reactive signals)"},{depth:3,id:"rxjs-لتركيب-التدفقات",text:"RxJS لتركيب التدفقات"},{depth:2,id:"المزالق-الشائعة",text:"المزالق الشائعة"},{depth:3,id:"تسريبات-الذاكرة-بسبب-الاشتراكات-المنسية",text:"تسريبات الذاكرة بسبب الاشتراكات المنسية"},{depth:3,id:"افتراضات-ترتيب-الإشعارات",text:"افتراضات ترتيب الإشعارات"},{depth:3,id:"عواصف-الإشعارات-المتزامنة",text:"عواصف الإشعارات المتزامنة"},{depth:3,id:"إشعارات-إعادة-الدخول",text:"إشعارات إعادة الدخول"},{depth:2,id:"متى-لا-تستخدم-المراقب",text:"متى لا تستخدم المراقب"},{depth:2,id:"المراجع",text:"المراجع"}],c=`<p>تخيل أنك تبني لوحة بيانات للأسعار. تصل حركة السعر عبر WebSocket، وتحتاج عدة أجزاء غير مترابطة من واجهة المستخدم إلى التفاعل: يعيد مخطط الرسم، ويومض صف في قائمة المتابعة باللون الأخضر أو الأحمر، ويُعاد حساب إجمالي المحفظة، ويسجل سجل تدقيق حركة السعر. ولا شأن لـ WebSocket بهذه المستهلكات. ما يحتاجه هو طريقة لقول «هنا حركة سعر جديدة» ثم ترك الأطراف المهتمة تقرر ما الذي يعنيه ذلك بالنسبة لها.</p>
<p>هذا هو نمط المراقب (observer). يحتفظ <strong>الموضوع (subject)</strong> بقائمة من <strong>المراقبين (observers)</strong> ويبث لهم التحديثات عند حدوث تغيير. يمكن للمراقبين الجدد الارتباط وقتما يشاؤون، ويمكن للمراقبين القائمين فك الارتباط عند انتهاء عملهم. لا يحتوي الموضوع على أي ارتباط ثابت بمستهلك بعينه.</p>
<h2 id="الشكل-الأساسي">الشكل الأساسي</h2>
<p>يحتاج الموضوع على الأقل إلى ثلاثة أمور: مكان لحفظ المراقبين، وطريقة لإضافتهم وإزالتهم، وطريقة لدفع التحديثات. إليك تطبيقًا صغيرًا يستخدم <code>Set</code> لنحصل على إزالة بتعقيد O(1) ومنع التكرار مجانًا.</p>
<pre><code>class Subject {
  #observers = new Set();

  subscribe(observer) {
    this.#observers.add(observer);
    // Hand back an unsubscribe function — easier than asking
    // the caller to hold onto the reference they passed in.
    return () =&gt; this.#observers.delete(observer);
  }

  notify(payload) {
    for (const observer of this.#observers) {
      observer(payload);
    }
  }
}
</code></pre>
<p>القيمة التي تعيدها <code>subscribe</code> تمثل مكسبًا صغيرًا في سهولة الاستخدام يغطي تكلفته أول مرة تنسى فيها ما مررته. يخزن المستدعي الدالة المعادة ويستدعيها عند انتهائه — من دون بحث أو مقارنة مساواة أو وجود دالة <code>unsubscribe</code> على الموضوع أصلًا.</p>
<h2 id="مثال-ملموس-مؤشر-أسعار">مثال ملموس: مؤشر أسعار</h2>
<p>لنوصل الموضوع بتدفق أسعار وبضعة مستهلكين يريدون معرفتها.</p>
<pre><code>const ticker = new Subject();

// A chart that buffers ticks and redraws every animation frame.
const chartQueue = [];
let pending = false;
const drawChart = (tick) =&gt; {
  chartQueue.push(tick);
  if (pending) return;
  pending = true;
  requestAnimationFrame(() =&gt; {
    renderChart(chartQueue);
    chartQueue.length = 0;
    pending = false;
  });
};

// A watchlist row that flashes when its symbol updates.
const flashRow = ({ symbol, price, previous }) =&gt; {
  if (symbol !== &quot;AAPL&quot;) return;
  document
    .querySelector('[data-symbol=&quot;AAPL&quot;]')
    ?.classList.toggle(&quot;up&quot;, price &gt; previous);
};

// A logger that records every tick for replay.
const logTick = (tick) =&gt; console.debug(&quot;[tick]&quot;, tick);

const unsubChart = ticker.subscribe(drawChart);
const unsubRow   = ticker.subscribe(flashRow);
const unsubLog   = ticker.subscribe(logTick);

// Somewhere else, the WebSocket pushes new prices in:
socket.addEventListener(&quot;message&quot;, (event) =&gt; {
  const tick = JSON.parse(event.data);
  ticker.notify(tick);
});
</code></pre>
<p>كل مستهلك دالة صغيرة ومركزة. لا يعرف مؤشر الأسعار أيًا منها بالاسم. وإذا قررت لاحقًا أن صف قائمة المتابعة ينبغي أن يستخدم تأخير التجميع (debounce)، أو أن المسجل ينبغي أن يلتقط حركة واحدة من كل عشر، فستغير المستهلك — ويبقى مؤشر الأسعار دون مساس. هذا الفصل هو المكسب الكامل للنمط.</p>
<h2 id="استخدام-المراقب-المدمج-في-المتصفح-browser-eventtarget">استخدام المراقب المدمج في المتصفح (browser): <code>EventTarget</code></h2>
<p>لا تحتاج دائمًا إلى كتابة <code>Subject</code> خاص بك. منذ عام 2017، أتت كل المتصفحات بكائن <code>EventTarget</code> قابل للإنشاء — وهي الآلية نفسها التي يستخدمها DOM في <code>addEventListener</code>، لكنها متاحة الآن للكائنات العشوائية.</p>
<pre><code>class Ticker extends EventTarget {
  push(tick) {
    this.dispatchEvent(new CustomEvent(&quot;tick&quot;, { detail: tick }));
  }
}

const ticker = new Ticker();

ticker.addEventListener(&quot;tick&quot;, (e) =&gt; drawChart(e.detail));
ticker.addEventListener(&quot;tick&quot;, (e) =&gt; flashRow(e.detail));
</code></pre>
<p>يوفر لك هذا آلية نشر/اشتراك (pub/sub) جاهزة مع ميزة مهمة: <strong>التكامل مع <code>AbortSignal</code></strong>. يصبح التنظيف سطرًا واحدًا مهما كان عدد المستمعين الذين سجلتهم.</p>
<pre><code>const controller = new AbortController();
const { signal } = controller;

ticker.addEventListener(&quot;tick&quot;, drawChart, { signal });
ticker.addEventListener(&quot;tick&quot;, flashRow,  { signal });
ticker.addEventListener(&quot;tick&quot;, logTick,   { signal });

// Later, when the dashboard unmounts:
controller.abort(); // every listener attached with \`signal\` is removed
</code></pre>
<p>إذا نسيت يومًا إزالة مستمع وتتبعت تسريب ذاكرة عبر لقطات الذاكرة في Chrome DevTools، سيبدو هذا كمعجزة صغيرة. تحوّل الإشارة عبارة «تذكر كل اشتراك كي تنظفه» إلى استدعاء <code>abort()</code> واحد.</p>
<h2 id="المراقب-مقابل-النشرالاشتراك">المراقب مقابل النشر/الاشتراك</h2>
<p>النمطان شقيقان، وكثيرًا ما يختلطان. لكن التمييز بينهما حقيقي ومفيد.</p>
<table>
<thead>
<tr>
<th></th>
<th>المراقب</th>
<th>النشر/الاشتراك</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الاقتران</strong></td>
<td>المراقب يعرف الموضوع</td>
<td>الناشر والمشترك يعرفان الوسيط فقط</td>
</tr>
<tr>
<td><strong>التوجيه</strong></td>
<td>موضوع واحد؛ يتلقى كل المراقبين كل إشعار</td>
<td>موضوع أو قناة — يشترك المشتركون في أسماء محددة</td>
</tr>
<tr>
<td><strong>التنفيذ</strong></td>
<td>دالة على الموضوع</td>
<td>كائن وسيط منفصل (ناقل أحداث)</td>
</tr>
<tr>
<td><strong>الاستخدام المعتاد</strong></td>
<td>كائن مجال يعلم مراقبيه</td>
<td>ناقل أحداث على مستوى التطبيق عبر وحدات غير مترابطة</td>
</tr>
</tbody>
</table>
<p>في مؤشر الأسعار أعلاه، يكون <code>ticker</code> هو الموضوع، ويتلقى كل مشترك حركة السعر — وهذا نمط المراقب الكلاسيكي. لكن لو كان لدينا بدلًا من ذلك <code>bus.publish(&quot;ticks/AAPL&quot;, price)</code> واختار المشتركون حسب الموضوع، فسيكون ذلك نشرًا/اشتراكًا.</p>
<p>إليك نظام نشر/اشتراك مصغرًا مبنيًا على <code>EventTarget</code>:</p>
<pre><code>class EventBus {
  #target = new EventTarget();

  publish(topic, data) {
    this.#target.dispatchEvent(new CustomEvent(topic, { detail: data }));
  }

  subscribe(topic, handler, { signal } = {}) {
    const listener = (e) =&gt; handler(e.detail);
    this.#target.addEventListener(topic, listener, { signal });
    return () =&gt; this.#target.removeEventListener(topic, listener);
  }
}
</code></pre>
<h2 id="الصيغ-الحديثة-التي-ينبغي-معرفتها">الصيغ الحديثة التي ينبغي معرفتها</h2>
<h3 id="المتكررون-غير-المتزامنون-async-iterators">المتكررون غير المتزامنون (async iterators)</h3>
<p>إذا كانت «أحداثك» تسلسلًا في الواقع، فإن متكررًا غير متزامن يحوّلها إلى حلقة <code>for await...of</code> — شيفرة تُقرأ من الأعلى إلى الأسفل وتتوقف عند كل تكرار:</p>
<pre><code>async function* watchTicks(socket, { signal }) {
  while (!signal.aborted) {
    const message = await new Promise((resolve, reject) =&gt; {
      socket.addEventListener(&quot;message&quot;, resolve, { once: true, signal });
      socket.addEventListener(&quot;error&quot;,   reject,  { once: true, signal });
    });
    yield JSON.parse(message.data);
  }
}

const controller = new AbortController();
for await (const tick of watchTicks(socket, { signal: controller.signal })) {
  drawChart(tick);
}
</code></pre>
<p>يتألف هذا جيدًا مع <code>AsyncIterator.prototype.map</code> وأمثالها — مقترحات تتقدم عبر TC39 وتعمل بالفعل في المحركات الحديثة عبر مكتبات مساعدة.</p>
<h3 id="الإشارات-التفاعلية-reactive-signals">الإشارات التفاعلية (reactive signals)</h3>
<p>تتمثل صيغة مختلفة للمراقب في <strong>الإشارة (signal)</strong>: عنصر تفاعلي صغير يعرف الدوال التي تقرأه ويعيد تشغيلها عند تغيره. لقد تقاربت أنماط Preact وSolid وAngular وVue جميعها على شكل مشابه، وهناك مقترح من TC39 يستكشف صيغة معيارية.</p>
<pre><code>import { signal, computed, effect } from &quot;@preact/signals-core&quot;;

const price    = signal(100);
const quantity = signal(2);
const total    = computed(() =&gt; price.value * quantity.value);

effect(() =&gt; console.log(\`Total: $\${total.value}\`));

price.value = 110;   // logs &quot;Total: $220&quot;
quantity.value = 3;  // logs &quot;Total: $330&quot;
</code></pre>
<p>الاشتراك غير مرئي — فـ<code>effect</code> يعيد التشغيل ببساطة عند تغير أي إشارة قرأها. وتحت السطح، لا يزال هذا مراقبًا: الإشارة هي الموضوع، والتأثير هو المراقب.</p>
<h3 id="rxjs-لتركيب-التدفقات">RxJS لتركيب التدفقات</h3>
<p>عندما تهم العلاقة بين الأحداث — مثل تأخير تجميع مربع بحث، أو دمج تدفقين، أو إعادة المحاولة عند الفشل — تبرر RxJS تكلفتها. إليك بحثًا فوريًا ينتظر المستخدم حتى يتوقف عن الكتابة، ويتجاهل عمليات البحث المكررة، ويلغي الطلبات القديمة:</p>
<pre><code>import { fromEvent, switchMap, debounceTime, distinctUntilChanged, map } from &quot;rxjs&quot;;

const input = document.querySelector(&quot;#search&quot;);

fromEvent(input, &quot;input&quot;).pipe(
  map((e) =&gt; e.target.value.trim()),
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((q) =&gt;
    q ? fetch(\`/api/search?q=\${encodeURIComponent(q)}\`).then((r) =&gt; r.json()) : []
  )
).subscribe(renderResults);
</code></pre>
<p>يلغي <code>switchMap</code> تلقائيًا الجلب السابق عند وصول استعلام جديد — وهو السلوك المطلوب تمامًا في البحث الفوري. ويمكن تنفيذ ذلك يدويًا فوق مراقب عادي، لكنه مرهق؛ تجعل RxJS الأمر تصريحيًا.</p>
<h2 id="المزالق-الشائعة">المزالق الشائعة</h2>
<h3 id="تسريبات-الذاكرة-بسبب-الاشتراكات-المنسية">تسريبات الذاكرة بسبب الاشتراكات المنسية</h3>
<p>هذا هو نمط الفشل الخاص بالنمط. كل اشتراك مرجع من الموضوع إلى المراقب؛ وإلى أن تلغي الاشتراك، لا يمكن جمع المراقب (ولا أي شيء يغلقه) في الذاكرة. وهناك ثلاثة طرق للتخفيف:</p>
<ul>
<li><strong>استخدم <code>AbortSignal</code></strong> مع <code>EventTarget</code> ليكون التنظيف باستدعاء <code>abort()</code> واحد.</li>
<li><strong>أعد دالة إلغاء اشتراك من <code>subscribe</code></strong> كي لا يحتاج المستدعون إلى البحث عن معالجهم من جديد.</li>
<li><strong>اربط الاشتراكات بدورات حياة المكونات</strong> في أطر العمل — تنظيف <code>useEffect</code> في React، و<code>onScopeDispose</code> في Vue، و<code>onDestroy</code> في Svelte.</li>
</ul>
<h3 id="افتراضات-ترتيب-الإشعارات">افتراضات ترتيب الإشعارات</h3>
<p>يتلقى المراقبون الإشعارات بترتيب الاشتراك في معظم التطبيقات، لكن لا ينبغي الاعتماد على ذلك في صحة البرنامج. إذا كان المراقب B يحتاج فعلًا إلى التنفيذ بعد المراقب A، فهذه تبعية لا يستطيع النمط التعبير عنها؛ صُرّح بها بدلًا من ذلك.</p>
<h3 id="عواصف-الإشعارات-المتزامنة">عواصف الإشعارات المتزامنة</h3>
<p>ينفذ <code>notify</code> كل مراقب بصورة متزامنة. إذا استغرق مراقب 200 مللي ثانية، فسينتظر كل المراقبين الذين يأتون بعده. وإذا وصلت حركة كل 16 مللي ثانية واستغرق مراقبوك وقتًا أطول من ذلك، فأنت على وشك فقدان إطارات العرض أو انفجار الطابور. فكّر في المعالجة على دفعات (كما في المثال السابق للمخطط) أو نقل الأعمال الثقيلة إلى <code>queueMicrotask</code> / <code>setTimeout</code>.</p>
<h3 id="إشعارات-إعادة-الدخول">إشعارات إعادة الدخول</h3>
<p>إذا كان معالج المراقب يطلق إشعار <code>notify</code> جديدًا على الموضوع نفسه، فقد تنتهي إلى تكرار غير متوقع. إذا كان هذا خطرًا حقيقيًا في مجالك، فاضبط الإشعارات في طابور بدلًا من إرسالها مباشرة.</p>
<h2 id="متى-لا-تستخدم-المراقب">متى لا تستخدم المراقب</h2>
<ul>
<li><strong>عندما يكفي تدفق بيانات لمرة واحدة.</strong> <code>Promise</code> هو الشكل المناسب لعبارة «أخبرني عندما ينتهي هذا، مرة واحدة». المراقب للأحداث المتكررة.</li>
<li><strong>عندما يبقى الموضوع والمراقب معًا دائمًا.</strong> إذا لم يراقب الموضوع سوى شيء واحد دائمًا وأنشئا معًا في المكان نفسه، فاستدعاء دالة مباشرة أبسط وأسهل في الفهم.</li>
<li><strong>عندما تحتاج إلى ذهاب وإياب بين الطلب (request) والاستجابة (response).</strong> المراقب إرسال بلا انتظار. إذا كان المستدعون يتوقعون إجابة، فاستخدم استدعاء دالة أو وعدًا أو ناقل أوامر.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget">EventTarget — MDN</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController">AbortController — MDN</a></li>
<li><a href="https://rxjs.dev">RxJS</a></li>
<li><a href="https://github.com/tc39/proposal-signals">مقترح Signals — TC39</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of">المتكررون غير المتزامنون — MDN</a></li>
</ul>
`,i={book:e,chapter:t,chapterTitle:n,slug:o,title:r,headings:s,html:c};export{e as book,t as chapter,n as chapterTitle,i as default,s as headings,c as html,o as slug,r as title};
