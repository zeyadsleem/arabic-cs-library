const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="mocking-time",t="اختبار الوقت (Testing Time)",c=[{depth:2,id:"التلاعب-بالوقت",text:"التلاعب بالوقت"},{depth:3,id:"تعيين-الوقت",text:"تعيين الوقت"},{depth:3,id:"تقديم-الوقت-إلى-الأمام",text:"تقديم الوقت إلى الأمام"},{depth:2,id:"التنظيف",text:"التنظيف"},{depth:2,id:"محاكاة-المؤقتات-والتواريخ-وأدوات-النظام-الأخرى",text:"محاكاة المؤقتات والتواريخ وأدوات النظام الأخرى"},{depth:3,id:"محاكاة-المؤقتات",text:"محاكاة المؤقتات"},{depth:3,id:"محاكاة-التواريخ",text:"محاكاة التواريخ"},{depth:2,id:"محاكاة-الوحدات-وإعادة-تعيين-البدائل-المحاكاة",text:"محاكاة الوحدات وإعادة تعيين البدائل المُحاكاة"},{depth:3,id:"إعادة-تعيين-البدائل-المحاكاة",text:"إعادة تعيين البدائل المُحاكاة"},{depth:2,id:"دمج-البدائل-المحاكاة-مع-الجواسيس-والبدائل",text:"دمج البدائل المُحاكاة مع الجواسيس والبدائل"},{depth:2,id:"مثال-محاكاة-المهلات-أو-الدوال-غير-المتزامنة-مثل-settimeout",text:"مثال: محاكاة المهلات أو الدوال غير المتزامنة مثل setTimeout"}],l=`<p>كثير من واجهات المستخدم تميل إلى عرض أشياء مثل الوقت والتواريخ. وكما ناقشنا سابقًا، نريد أن تكون اختباراتنا متسقة. كما <a href="https://www.youtube.com/watch?v=HlItAutxJzk&amp;list=OLAK5uy_lRxgtVPfsBuzpgFdYdFi0Ej0J2mNwzz2A">كتب ستيف ميلر ذات مرة</a>، (ولكن لنكن صادقين، أنت تفكر في <a href="https://www.youtube.com/watch?v=gxbBp9SH81U">نسخة سيل من موسيقى فيلم Space Jam</a>):</p>
<blockquote>
<p>الوقت يستمر في الانزلاق نحو المستقبل.
الوقت يستمر في الانزلاق، والانزلاق، والانزلاق نحو المستقبل.</p>
</blockquote>
<p>في العمق، يستخدم Vitest <a href="https://github.com/sinonjs/fake-timers"><code>@sinonjs/fake-timers</code></a>.</p>
<p>عادةً، إذا كنت تحتاج إلى التحكم في الوقت في اختباراتك، فستختار استخدام مؤقتات Sinon المزيفة قبل مجموعة الاختبارات المعنية، ثم تكون مسافرًا عبر الزمن حسن السلوك وتحاول إعادة كل شيء إلى ما كان عليه عندما تنتهي.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Take control of time.</span>
  vi.<span class="hljs-title function_">useFakeTimers</span>();
});

<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Put things back the way you found it.</span>
  vi.<span class="hljs-title function_">useRealTimers</span>();
});
</code></pre>
<p>تستبدل <code>useFakeTimers()</code> الدوال العالمية <code>setTimeout</code> و<code>clearTimeout</code> و<code>setInterval</code> و<code>setImmediate</code> و<code>clearImmediate</code> و<code>process.hrtime</code> و<code>performance.now</code> و<code>Date</code> بتنفيذ مخصص يمكنك التحكم فيه.</p>
<p>تُعيد كائن <code>clock</code> يبدأ عند عصر يونكس (أي <code>0</code>). إذا أردت بدء الوقت من نقطة أخرى، يمكنك تمرير عدد صحيح مختلف، لكنني سأزعم أنك أفضل حالًا باستخدام <code>setSystemTime</code>، كما سنرى أدناه.</p>
<pre><code class="language-typescript">vi.<span class="hljs-title function_">useFakeTimers</span>(<span class="hljs-number">1677952591024</span>);
</code></pre>
<p>الوقت أيضًا مجمّد فعليًا ما لم تختر تقديمه بنفسك. إذا أردت أن يتقدم الوقت كما يفعل عادةً، يمكنك تمرير خيار إلى <code>useFakeTimers()</code>.</p>
<pre><code class="language-typescript">vi.<span class="hljs-title function_">useFakeTimers</span>({ <span class="hljs-attr">shouldAdvanceTime</span>: <span class="hljs-literal">true</span> });
</code></pre>
<h2 id="التلاعب-بالوقت">التلاعب بالوقت</h2>
<h3 id="تعيين-الوقت">تعيين الوقت</h3>
<p>الآن في أي اختبار، يمكنك تعيين الوقت يدويًا إلى ما تحتاجه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> date = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2012</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">13</span>);
vi.<span class="hljs-title function_">setSystemTime</span>(date);
</code></pre>
<ul>
<li>يمكنك الوصول إلى الوقت المُحاكى باستخدام <code>vi.getMockedSystemTime()</code>.</li>
<li>يمكنك الوصول إلى الوقت <em>الحقيقي</em> باستخدام <code>vi.getRealSystemTime()</code>. (لا أستطيع حتى ابتكار سبب قد يدفعك لفعل ذلك. أذكره فقط اكتمالًا.)</li>
</ul>
<h3 id="تقديم-الوقت-إلى-الأمام">تقديم الوقت إلى الأمام</h3>
<p>هذه مفيدة عند إعداد مؤقتات مثل <code>setInterval</code> و<code>setTimeout</code>.</p>
<ul>
<li><code>vi.advanceTimersByTime</code>، <code>vi.advanceTimersByTimeAsync</code>: يقدّم الوقت الحالي بعدد محدد من المللي ثانية.</li>
<li><code>vi.advanceTimersToNextTimer</code>، <code>vi.advanceTimersToNextTimerAsync</code>: يقدّم الوقت حتى يُطلق المؤقت التالي.</li>
<li><code>vi.getTimerCount</code>: يعيد عدد المؤقتات المتبقية.</li>
<li><code>vi.runAllTimers</code>، <code>vi.runAllTimersAsync</code>: يشغّل كل المؤقتات. (هذا الخيار سيرفع خطأ عند 10,000 محاولة إذا كان لديك <code>setInterval</code> لا يُمسح أبدًا.)</li>
<li><code>vi.runAllTicks</code>: يستدعي كل مهمة صغيرة (microtask) أنشأها <code>process.nextTick</code>.</li>
</ul>
<h2 id="التنظيف">التنظيف</h2>
<ul>
<li><code>vi.clearAllTimers</code>: يزيل أي مؤقتات مجدولة للتشغيل.</li>
<li><code>vi.restoreCurrentDate</code>: يعيد كائن <code>Date</code> الأصلي إلى مكانه.</li>
<li><code>vi.useRealTimers</code>: عندما تنتهي كل مؤقتاتك، يعيد هذا التابع كل مؤقتاتك المُحاكاة إلى تنفيذاتها الأصلية.</li>
</ul>
<h2 id="محاكاة-المؤقتات-والتواريخ-وأدوات-النظام-الأخرى">محاكاة المؤقتات والتواريخ وأدوات النظام الأخرى</h2>
<p>في بعض الحالات، قد تعتمد شيفرتك على أدوات نظام مثل المؤقتات أو التواريخ، وهو ما قد يدخل عدم قابلية التوقع إلى اختباراتك. يوفر Vitest وظائف مدمجة لمحاكاة أدوات النظام مثل <code>setTimeout</code> و<code>setInterval</code> و<code>Date</code> والتحكم فيها لضمان تصرف اختباراتك بشكل متسق.</p>
<h3 id="محاكاة-المؤقتات">محاكاة المؤقتات</h3>
<p>عند التعامل مع المؤقتات، مثل <code>setTimeout</code> أو <code>setInterval</code>، يمكنك محاكاتها للتحكم في سلوكها في الاختبارات باستخدام <code>vi.useFakeTimers()</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Mock the timers</span>
vi.<span class="hljs-title function_">useFakeTimers</span>();

<span class="hljs-comment">// Example function that uses setTimeout</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">delay</span>(<span class="hljs-params">callback</span>) {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">callback</span>(<span class="hljs-string">&#x27;Delayed&#x27;</span>);
  }, <span class="hljs-number">1000</span>);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;delay function&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should call callback after delay&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> callback = vi.<span class="hljs-title function_">fn</span>();

    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-title function_">delay</span>(callback);

    <span class="hljs-comment">// Fast-forward time</span>
    vi.<span class="hljs-title function_">advanceTimersByTime</span>(<span class="hljs-number">1000</span>);

    <span class="hljs-comment">// Assert that the callback was called</span>
    <span class="hljs-title function_">expect</span>(callback).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Delayed&#x27;</span>);
  });
});
</code></pre>
<p>في هذا المثال، يتيح لنا <code>vi.useFakeTimers()</code> التحكم في المؤقتات وتقديم الوقت بـ <code>vi.advanceTimersByTime(1000)</code> لمحاكاة مرور الوقت دون انتظار تأخيرات العالم الحقيقي.</p>
<h3 id="محاكاة-التواريخ">محاكاة التواريخ</h3>
<p>وبالمثل، يمكنك محاكاة مُنشئ <code>Date</code> لإرجاع تواريخ أو أوقات محددة.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Mock the current date to always return a specific date</span>
<span class="hljs-keyword">const</span> mockDate = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2024</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
vi.<span class="hljs-title function_">setSystemTime</span>(mockDate);

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;mocked Date&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the mocked date&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> currentDate = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();
    <span class="hljs-title function_">expect</span>(currentDate).<span class="hljs-title function_">toEqual</span>(mockDate);
  });
});
</code></pre>
<p>باستخدام <code>vi.setSystemTime()</code>، يمكنك ضمان أن <code>new Date()</code> تعيد دائمًا قيمة متسقة، ما يجعل الاختبارات التي تعتمد على التواريخ قابلة للتوقع.</p>
<h2 id="محاكاة-الوحدات-وإعادة-تعيين-البدائل-المحاكاة">محاكاة الوحدات وإعادة تعيين البدائل المُحاكاة</h2>
<p>في الأنظمة الأكثر تعقيدًا، قد تريد محاكاة وحدات كاملة لعزل الشيفرة قيد الاختبار. يتيح لك Vitest محاكاة وحدات محددة بـ <code>vi.mock()</code>، وهو ما يوفر مرونة في التحكم في سلوك الاعتماديات.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Mock the api module</span>
vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./api&#x27;</span>, <span class="hljs-function">() =&gt;</span> ({
  <span class="hljs-attr">getConcertDetails</span>: vi
    .<span class="hljs-title function_">fn</span>()
    .<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">band</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span> }),
}));
</code></pre>
<p>يتيح لك ذلك محاكاة كل الدوال داخل وحدة <code>api</code> دفعة واحدة. عند الاختبار، ستحل هذه النسخة المُحاكاة محل الوحدة الحقيقية، بما يضمن إمكانية محاكاة سيناريوهات متنوعة.</p>
<h3 id="إعادة-تعيين-البدائل-المحاكاة">إعادة تعيين البدائل المُحاكاة</h3>
<p>بعد تشغيل اختبار، من المهم إعادة تعيين البدائل المُحاكاة أو استعادتها إلى حالتها الأصلية لتجنب التداخل بين الاختبارات. يمكنك إعادة تعيين البدائل المُحاكاة باستخدام <code>vi.resetAllMocks()</code> أو استعادة التنفيذات الأصلية بـ <code>mockRestore()</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Reset all mocks after each test</span>
<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">resetAllMocks</span>();
});
</code></pre>
<p>يضمن ذلك أن يبدأ كل اختبار ببدائل مُحاكاة حديثة ويزيل السلوك غير المقصود الناتج عن الحالة المشتركة بين الاختبارات.</p>
<h2 id="دمج-البدائل-المحاكاة-مع-الجواسيس-والبدائل">دمج البدائل المُحاكاة مع الجواسيس والبدائل</h2>
<p>يمكنك دمج وظائف البدائل المُحاكاة والجواسيس والبدائل لسيناريوهات اختبار أكثر تقدمًا. على سبيل المثال، يمكنك محاكاة دالة والتجسس أيضًا على تفاعلاتها أو تثبيت تابع داخل بديل مُحاكى.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Create a mock and spy on one of its methods</span>
<span class="hljs-keyword">const</span> mockObject = {
  <span class="hljs-attr">method</span>: vi.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockReturnValue</span>(<span class="hljs-string">&#x27;Mocked result&#x27;</span>),
};

<span class="hljs-comment">// Spy on the method</span>
<span class="hljs-keyword">const</span> spy = vi.<span class="hljs-title function_">spyOn</span>(mockObject, <span class="hljs-string">&#x27;method&#x27;</span>);

mockObject.<span class="hljs-title function_">method</span>(<span class="hljs-string">&#x27;argument&#x27;</span>);

<span class="hljs-comment">// Verify the interaction</span>
<span class="hljs-title function_">expect</span>(spy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;argument&#x27;</span>);
<span class="hljs-title function_">expect</span>(spy).<span class="hljs-title function_">toHaveReturnedWith</span>(<span class="hljs-string">&#x27;Mocked result&#x27;</span>);
</code></pre>
<p>يجمع هذا المثال بين بديل مُحاكى وجاسوس، ما يتيح لك التحكم في سلوك التابع ومراقبة طريقة استخدامه داخل الاختبار.</p>
<h2 id="مثال-محاكاة-المهلات-أو-الدوال-غير-المتزامنة-مثل-settimeout">مثال: محاكاة المهلات أو الدوال غير المتزامنة مثل <code>setTimeout</code></h2>
<p>محاكاة الدوال غير المتزامنة مثل <code>setTimeout</code> حالة استخدام متقدمة أخرى. بمحاكاة المؤقتات، يمكنك محاكاة السلوك غير المتزامن دون الانتظار فعليًا للتأخير الحقيقي.</p>
<p>إليك مثالًا نحاكي فيه <code>setTimeout</code> ونستخدم <code>vi.useFakeTimers()</code> للتحكم في تدفق الوقت في دالة غير متزامنة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">delayedFunction</span>(<span class="hljs-params">callback</span>) {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">callback</span>(<span class="hljs-string">&#x27;Done&#x27;</span>);
  }, <span class="hljs-number">3000</span>);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;delayedFunction&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should call callback after timeout&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Mock the timer</span>
    vi.<span class="hljs-title function_">useFakeTimers</span>();

    <span class="hljs-keyword">const</span> callback = vi.<span class="hljs-title function_">fn</span>();

    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-title function_">delayedFunction</span>(callback);

    <span class="hljs-comment">// Fast-forward the timer</span>
    vi.<span class="hljs-title function_">advanceTimersByTime</span>(<span class="hljs-number">3000</span>);

    <span class="hljs-comment">// Assert that the callback was called</span>
    <span class="hljs-title function_">expect</span>(callback).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Done&#x27;</span>);
  });
});
</code></pre>
<p>في هذا الاختبار، يُتحكم في المؤقت باستخدام <code>vi.useFakeTimers()</code> و<code>vi.advanceTimersByTime()</code>، وهو ما يحاكي <code>setTimeout</code> دون انتظار التأخير الفعلي. يتيح لك ذلك اختبار شيفرة غير متزامنة بطريقة مُتحكَّم بها وقابلة للتوقع.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:c,html:l};export{s as book,n as chapter,a as chapterTitle,p as default,c as headings,l as html,e as slug,t as title};
