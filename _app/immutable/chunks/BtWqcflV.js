const s="kinney",n="testing",t="مدخل إلى الاختبارات",a="test-context",e="فهم سياق الاختبار",p=[{depth:2,id:"ضبط-السياق-باستخدام-testcontext",text:"ضبط السياق باستخدام test.context"},{depth:2,id:"الوصول-إلى-السياق-في-الخطافات",text:"الوصول إلى السياق في الخُطّافات"},{depth:2,id:"السياق-بين-الاختبارات-معزول",text:"السياق بين الاختبارات معزول"},{depth:2,id:"مثال-عملي-محاكاة-واجهة-برمجة-تطبيقات-في-السياق",text:"مثال عملي: محاكاة واجهة برمجة تطبيقات في السياق"},{depth:2,id:"متى-قد-يكون-السياق-أكثر-من-اللازم",text:"متى قد يكون السياق أكثر من اللازم"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],c=`<p>اسمح لي أن أرسم لك صورة: تخيّل أنك تعمل على مشروع (مشروعك، أو مشروع الفريق المركّب الفوضوي) حيث يعتمد كل اختبار على حالة مشتركة أو إعدادات أو بيانات مخصصة لكل اختبار. تريد تمرير معلومات مع اختباراتك بطريقة لا تبدو كلصق قيم عشوائية على متغيّرات عامة بشريط لاصق. ماذا تفعل؟ هنا يأتي <strong>سياق الاختبار</strong> (test context) في Vitest.</p>
<p>سياق الاختبار هو رفيقك المفيد عندما تكون لديك إعدادات أو بيانات تختلف من اختبار إلى آخر لكنها تحتاج إلى أن تكون متاحة بسهولة في متن الاختبار. بدلًا من التلاعب اليدوي بالمتغيّرات في كل حالة اختبار، يتيح لك <strong>Vitest</strong> أن تربط أي قيم سياقية تحتاجها بنسخة الاختبار نفسها. لنلقِ نظرة على كيفية تشغيل هذا السياق اللطيف.</p>
<p><a href="https://vitest.dev/guide/test-context.html">سياقات الاختبار</a> في Vitest مستوحاة من <a href="https://playwright.dev/docs/test-fixtures">تركيبات Playwright</a> (fixtures).</p>
<p>تأخذ <code>it</code> و<code>test</code> دالة كوسيط ثانٍ. تتلقى هذه الدالة سياق الاختبار كوسيط. لسياق الاختبار خاصيتان رئيسيتان:</p>
<ul>
<li><code>meta</code>: بعض البيانات الوصفية عن الاختبار نفسه.</li>
<li><code>expect</code>: نسخة من واجهة Expect مرتبطة بالاختبار الحالي.</li>
</ul>
<h2 id="ضبط-السياق-باستخدام-testcontext">ضبط السياق باستخدام <code>test.context</code></h2>
<p>يمنحك Vitest هذا الكائن السحري <code>test.context</code> الذي يمكنك رمي الأشياء فيه داخل كل اختبار. فكّر في <code>test.context</code> أساسًا كحزام الأدوات ذاك الذي يحفظ فيه باتمان (أنت) كل أجهزته دون أن تتحول الأمور إلى فوضى. يحصل كل اختبار على سياقه الخاص، فلا تتسرّب القيم بينها — ولحسن الحظ هذا ينجيك من لحظات <em>«لماذا ينكسر كل شيء عندما أشغّل كل اختباراتي معًا؟»</em>.</p>
<p>لنكتب اختبارًا بسيطًا يخزّن شيئًا في السياق:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;it should store a value in the context&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  <span class="hljs-comment">// let&#x27;s put some cool stuff into this context thing</span>
  ctx.<span class="hljs-property">foo</span> = <span class="hljs-string">&#x27;bar&#x27;</span>;

  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">foo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;bar&#x27;</span>);
});
</code></pre>
<p>لنتمهّل هنا: الكائن <code>ctx</code> الذي تراه؟ هذا هو السياق. يمكنك تخزين ما تشاء فيه، وهو محلي <strong>لذلك الاختبار بعينه</strong>. في هذه الحالة، ندفع قيمة <code>'bar'</code> في خانة <code>ctx.foo</code> ثم نتحقق من وجودها. مباشر وفي صلب الموضوع، أليس كذلك؟</p>
<h2 id="الوصول-إلى-السياق-في-الخطافات">الوصول إلى السياق في الخُطّافات</h2>
<p>انتظر — أنت على الأرجح تفكّر: <em>ماذا لو أردت ضبط السياق قبل تشغيل الاختبار؟ كأن يكون داخل خُطّاف <code>beforeEach</code> ما؟</em></p>
<p>هنا بالضبط تكون السياقات أقوى. يمكنك تعديل سياقات الاختبار <em>داخل</em> خُطّافات <code>beforeEach()</code> أو حتى <code>afterEach()</code>، ما يجعلها مفيدة بشكل مذهل عندما تحتاج إلى بعض التجهيز لكل اختبار دون إرباك الاختبار نفسه.</p>
<p>انظر إلى هذا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { beforeEach, test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  <span class="hljs-comment">// let&#x27;s set the context up in a hook</span>
  ctx.<span class="hljs-property">user</span> = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span> };
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;it should access the context modified in beforeEach&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">user</span>.<span class="hljs-property">name</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>);
  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">user</span>.<span class="hljs-property">role</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;admin&#x27;</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;it should have a different context for each test&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  <span class="hljs-comment">// this is a fresh context, distinct from the previous test</span>
  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">user</span>.<span class="hljs-property">name</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>);
  ctx.<span class="hljs-property">user</span>.<span class="hljs-property">role</span> = <span class="hljs-string">&#x27;editor&#x27;</span>;
  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">user</span>.<span class="hljs-property">role</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;editor&#x27;</span>);
});
</code></pre>
<p>هنا نحشو كائن <code>user</code> في السياق داخل خُطّاف <code>beforeEach</code>. الآن صار كل اختبار يملك وصولًا إلى هذا السياق الشهي دون تكرار نفسك، وهذا بالغ الأهمية عندما تحاول إبقاء اختباراتك جافة (DRY) وألا تنسخ وتلصق التجهيز نفسه في كل مكان.</p>
<p>ولاحظ: يحصل كل اختبار على سياقه <strong>الخاص</strong> المعزول. لذا فإن التغييرات في اختبار واحد <strong>لن</strong> تعبث باختبار آخر.</p>
<h2 id="السياق-بين-الاختبارات-معزول">السياق بين الاختبارات معزول</h2>
<p>الآن قد تتساءل: <em>إذن ماذا يحدث للسياق عبر اختبارات متعددة؟</em> الشيء الرائع هو أن لكل اختبار <strong>نسخة سياق خاصة به</strong>، أي أنك تستطيع تعديل السياق داخل اختبار بأمان، ولن يؤثر ذلك في الاختبارات الأخرى.</p>
<p>سابقًا، عندما حدّثنا <code>ctx.user.role = 'editor'</code> في الاختبار الثاني، لم يؤثر ذلك في <code>user.role</code> في الاختبار الأول. هذا هو السياق يؤدي عمله في إبقاء الأمور معزولة وسليمة. لا تريد أن تعيش في عالم تتشارك فيه الاختبارات المعلومات سرًّا من وراء ظهرك. ثق بي، إنه مكان مظلم.</p>
<h2 id="مثال-عملي-محاكاة-واجهة-برمجة-تطبيقات-في-السياق">مثال عملي: محاكاة واجهة برمجة تطبيقات في السياق</h2>
<p>مثال شبه واقعي: لنفترض أنك تحتاج إلى محاكاة نتيجة واجهة برمجة تطبيقات، ويحتاج كل اختبار إلى بيانات مختلفة. يمكنك لصق ذلك على السياق باستخدام الخُطّافات. شاهد:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { beforeEach, test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-comment">// pretending we&#x27;re mocking some API, no big deal</span>
<span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  ctx.<span class="hljs-property">apiResponse</span> = { <span class="hljs-attr">data</span>: <span class="hljs-string">&#x27;default&#x27;</span> }; <span class="hljs-comment">// set default data</span>
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;api returns default data initially&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">apiResponse</span>.<span class="hljs-property">data</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;default&#x27;</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;api returns different data for another test&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">ctx</span>) =&gt;</span> {
  <span class="hljs-comment">// yeah, just modify the context for this test only</span>
  ctx.<span class="hljs-property">apiResponse</span>.<span class="hljs-property">data</span> = <span class="hljs-string">&#x27;different!&#x27;</span>;

  <span class="hljs-title function_">expect</span>(ctx.<span class="hljs-property">apiResponse</span>.<span class="hljs-property">data</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;different!&#x27;</span>);
});
</code></pre>
<p>ماذا فعلنا هنا؟ هيّأنا استجابة واجهة برمجة تطبيقات افتراضية في <code>beforeEach</code>، فصار لكل اختبار صفحته البيضاء النظيفة. وإن احتاج اختبار ما إلى استجابة مختلفة، يمكنه تجاوز السياق لتلك التشغيلة تحديدًا دون إزعاج أي اختبار آخر.</p>
<h2 id="متى-قد-يكون-السياق-أكثر-من-اللازم">متى قد يكون السياق أكثر من اللازم</h2>
<p>السياق أنيق وكل ذلك، لكن مجرد أنك <em>تستطيع</em> لا يعني دائمًا أنك <em>ينبغي</em>. من المُغري أن تبدأ معاملة <code>ctx</code> كخزانة تخزين وتحشو فيها كل شيء. هل تحتاج حقًا إلى عشرين متغيّرًا في سياق اختبارك؟ على الأرجح لا. أحيانًا يكون من الأفضل إبقاء اختباراتك مباشرة واستخدام السياق باعتدال فقط، لقيم التجهيز أو النسخ المشتركة التي تكون منطقية فعلًا.</p>
<p>السياق رائع لتقليل النمط المتكرر في التجهيز المشترك، لكن لا تدعه ينمو إلى تلك الفوضى المجرّدة من القيم التي عليك تتبّعها لاحقًا. الهدف هو جعل الاختبارات قابلة للقراءة والصيانة، أليس كذلك؟ إن كان <code>test.context</code> يساعد في ذلك، فرائع! وإن لم يكن، فربما تراجع خطوة وتفكّر إن كنت تحاول حلّ مشكلة غير موجودة أصلًا (جميعنا مررنا بذلك).</p>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>سياق الاختبار في Vitest كالأداة الخفيّة لكن المفيدة التي لم تكن تعرف أنك تحتاجها. يبقي اختباراتك نظيفة، ويتيح لك تمرير البيانات بسلاسة، ويساعد في تجنّب المزالق الغريبة للحالة العامة بين الاختبارات. تذكّر فقط: الاعتدال هو المفتاح. السياق موجود ليساعد، لكن لا تحوّله إلى مكبّ نفايات!</p>
`,l={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:c};export{s as book,n as chapter,t as chapterTitle,l as default,p as headings,c as html,a as slug,e as title};
