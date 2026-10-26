const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="overriding-object-properties",t="تجاوز خصائص الكائنات",p=[{depth:2,id:"حالات-استخدام-تجاوز-خصائص-الكائنات",text:"حالات استخدام تجاوز خصائص الكائنات"},{depth:2,id:"تجاوز-خصائص-الكائنات-باستخدام-vispyon",text:"تجاوز خصائص الكائنات باستخدام vi.spyOn()"},{depth:2,id:"تجاوز-خصائص-الكائنات-مباشرة",text:"تجاوز خصائص الكائنات مباشرةً"},{depth:2,id:"تجاوز-الجامعات-والضوابط",text:"تجاوز الجامعات والضوابط"},{depth:2,id:"إعادة-الخصائص-المتجاوزة",text:"إعادة الخصائص المتجاوَزة"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],c=`<p>في بعض سيناريوهات الاختبار، قد تحتاج إلى تجاوز خصائص معيّنة في الكائنات أو محاكاتها بدلًا من الدوال. يمكن أن يكون هذا مفيدًا عند اختبار شيفرة تعتمد على خصائص كائنات مثل متغيّرات البيئة، أو إعدادات التهيئة، أو قيم ديناميكية تُقرأ من الكائنات وقت التشغيل. في Vitest، يمكنك تجاوز خصائص الكائنات باستخدام <code>vi.spyOn()</code> أو بتعيين الخصائص مباشرةً إلى قيم مُحاكاة أثناء اختباراتك.</p>
<h2 id="حالات-استخدام-تجاوز-خصائص-الكائنات">حالات استخدام تجاوز خصائص الكائنات</h2>
<ul>
<li><strong>متغيّرات البيئة</strong>: محاكاة بيئات مختلفة بتجاوز خصائص <code>process.env</code>.</li>
<li><strong>كائنات التهيئة</strong>: تغيير قيم إعدادات التهيئة لاختبار كيفية تصرف شيفرتك في ظروف مختلفة.</li>
<li><strong>الكائنات العامة</strong>: تجاوز كائنات عامة مثل <code>window</code> أو <code>navigator</code> أو <code>document</code> في التطبيقات القائمة على المتصفّح.</li>
<li><strong>الخصائص الديناميكية</strong>: محاكاة قيم خصائص تتغيّر مع الوقت، مثل <code>Date.now</code> أو <code>Math.random</code>.</li>
</ul>
<h2 id="تجاوز-خصائص-الكائنات-باستخدام-vispyon">تجاوز خصائص الكائنات باستخدام <code>vi.spyOn()</code></h2>
<p>عند تجاوز خصائص الجامع (getter) أو الضابط (setter)، يمكنك استخدام <code>vi.spyOn()</code> لاستبدال سلوكها. هذا مفيد بشكل خاص في خصائص الكائنات المدمجة مثل <code>window.location</code> أو <code>process.env</code> التي تحتاج إلى تجاوزها في اختبار.</p>
<p>إليك مثالًا على تجاوز جامع:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Spy on the global object property (e.g., window.location.href)</span>
vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">window</span>, <span class="hljs-string">&#x27;location&#x27;</span>, <span class="hljs-string">&#x27;get&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>({
  <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://mocked-url.com&#x27;</span>,
});

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;URL Test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should use the mocked location&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test that the code uses the mocked URL</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;https://mocked-url.com&#x27;</span>);
  });
});
</code></pre>
<p>في هذا المثال، تُستخدم الدالة <code>vi.spyOn()</code> للتجسّس على خاصية <code>location</code> في الكائن <code>window</code> ومحاكاتها. وهي تستبدل الجامع بحيث تُعيد <code>window.location.href</code> القيمة المُحاكاة <code>'https://mocked-url.com'</code> بدلًا من الرابط الحقيقي.</p>
<h2 id="تجاوز-خصائص-الكائنات-مباشرة">تجاوز خصائص الكائنات مباشرةً</h2>
<p>يمكنك أيضًا تجاوز خصائص الكائنات مباشرةً في السيناريوهات الأبسط، مثل تعديل الكائن <code>process.env</code> أو خصائص مخصّصة أخرى.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Override process.env property directly</span>
process.<span class="hljs-property">env</span>.<span class="hljs-property">API_KEY</span> = <span class="hljs-string">&#x27;mocked-api-key&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;API Key Test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should use the mocked API key&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test that the code reads the mocked API key</span>
    <span class="hljs-title function_">expect</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">API_KEY</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;mocked-api-key&#x27;</span>);
  });
});
</code></pre>
<p>في هذا المثال، تُتجاوز الخاصية <code>process.env.API_KEY</code> مباشرةً لمحاكاة تهيئة بيئة مختلفة للاختبار. وبعد الاختبار، يمكنك إعادة القيمة الأصلية لضمان عدم وجود آثار جانبية على اختبارات أخرى.</p>
<h2 id="تجاوز-الجامعات-والضوابط">تجاوز الجامعات والضوابط</h2>
<p>في السيناريوهات الأكثر تعقيدًا حين تستخدم الخصائص جامعات أو ضوابط، يمكنك تجاوزها مباشرةً بإعادة تعريف الخاصية باستخدام <code>Object.defineProperty()</code>.</p>
<p>إليك كيفية تجاوز خاصية بجامع مخصّص:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Override a property with a custom getter</span>
<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>(<span class="hljs-variable language_">window</span>, <span class="hljs-string">&#x27;innerWidth&#x27;</span>, {
  <span class="hljs-attr">get</span>: vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-number">1024</span>),
});

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Window Width Test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the mocked window width&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test that the code returns the mocked width</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">1024</span>);
  });
});
</code></pre>
<p>في هذا المثال، نستخدم <code>Object.defineProperty()</code> لمحاكاة <code>window.innerWidth</code> بجامع مخصّص يُعيد القيمة <code>1024</code>. يتيح لك ذلك التحكم في كيفية تصرّف الخاصية أثناء اختباراتك.</p>
<h2 id="إعادة-الخصائص-المتجاوزة">إعادة الخصائص المتجاوَزة</h2>
<p>بعد تجاوز خصائص الكائنات، من المهم إعادتها إلى حالتها الأصلية لتجنّب آثار جانبية في اختبارات أخرى. يوفّر Vitest <code>mockRestore()</code> لإعادة ضبط الخصائص المتجسَّس عليها أو المُحاكاة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> originalHref = <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>;

vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">window</span>, <span class="hljs-string">&#x27;location&#x27;</span>, <span class="hljs-string">&#x27;get&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>({
  <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://mocked-url.com&#x27;</span>,
});

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;URL Test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Restore the original property after each test</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span> = originalHref;
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should use the mocked location&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;https://mocked-url.com&#x27;</span>);
  });
});
</code></pre>
<p>بإعادة القيمة الأصلية لـ <code>window.location.href</code> داخل كتلة <code>afterEach()</code>، تضمن ألا تتعارض الخاصية المتجاوَزة مع اختبارات أخرى.</p>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>تجاوز خصائص الكائنات في Vitest تقنية قوية لاختبار شيفرة تعتمد على قيم ديناميكية أو خارجية مثل متغيّرات البيئة، أو كائنات التهيئة، أو الخصائص العامة. وسواء استخدمت <code>vi.spyOn()</code> لمحاكاة الجامعات والضوابط، أو عدّلت الخصائص مباشرةً، أو استخدمت <code>Object.defineProperty()</code> لتحكّم أكثر تقدمًا، فإن تجاوز الخصائص يتيح لك اختبار سيناريوهات مختلفة في عزلة. تذكّر دائمًا إعادة ضبط الخصائص الأصلية أو استعادتها بعد الاختبار للحفاظ على بيئات اختبار نظيفة ومعزولة.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,c as html,e as slug,t as title};
