const s="hono",n="middleware-builtin",a="الوسائط المدمجة",t="timing",e="البرمجية الوسيطة Server-Timing",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:3,id:"مفعلة-شرطيا",text:"مُفعّلة شرطيًا"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"total-boolean",text:"total: boolean"},{depth:3,id:"enabled-boolean-c-context-gt-boolean",text:"enabled: boolean | (c: Context) =&gt; boolean"},{depth:3,id:"totaldescription-string",text:"totalDescription: string"},{depth:3,id:"autoend-boolean",text:"autoEnd: boolean"},{depth:3,id:"crossorigin-boolean-string-c-context-gt-boolean-string",text:"crossOrigin: boolean | string | (c: Context) =&gt; boolean | string"}],o=`<p>الـ <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing"><code>Server-Timing</code></a> توفّر البرمجيات الوسيطة
مقاييس الأداء في ترويسات الاستجابة.</p>
<p>ملاحظة: على Cloudflare Workers، قد لا تكون مقاييس المؤقت (timer metrics) دقيقة،
منذ <a href="https://developers.cloudflare.com/workers/learning/security-model/#step-1-disallow-timers-and-multi-threading">تُظهر المؤقتات فقط وقت آخر إدخال/إخراج (I/O)</a>.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> {
  timing,
  setMetric,
  startTime,
  endTime,
  wrapTime,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/timing&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">TimingVariables</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/timing&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-js"><span class="hljs-comment">// Specify the variable types to infer the \`c.get(&#x27;metric&#x27;)\`:</span>
type <span class="hljs-title class_">Variables</span> = <span class="hljs-title class_">TimingVariables</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Variables</span>: <span class="hljs-title class_">Variables</span> }&gt;()

<span class="hljs-comment">// add the middleware to your router</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">timing</span>());

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {

  <span class="hljs-comment">// add custom metrics</span>
  <span class="hljs-title function_">setMetric</span>(c, <span class="hljs-string">&#x27;region&#x27;</span>, <span class="hljs-string">&#x27;europe-west3&#x27;</span>)

  <span class="hljs-comment">// add custom metrics with timing, must be in milliseconds</span>
  <span class="hljs-title function_">setMetric</span>(c, <span class="hljs-string">&#x27;custom&#x27;</span>, <span class="hljs-number">23.8</span>, <span class="hljs-string">&#x27;My custom Metric&#x27;</span>)

  <span class="hljs-comment">// start a new timer</span>
  <span class="hljs-title function_">startTime</span>(c, <span class="hljs-string">&#x27;db&#x27;</span>);
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> db.<span class="hljs-title function_">findMany</span>(...);

  <span class="hljs-comment">// end the timer</span>
  <span class="hljs-title function_">endTime</span>(c, <span class="hljs-string">&#x27;db&#x27;</span>);

  <span class="hljs-comment">// ...or you can also just wrap a Promise using this function:</span>
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">wrapTime</span>(c, <span class="hljs-string">&#x27;db&#x27;</span>, db.<span class="hljs-title function_">findMany</span>(...));

  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">response</span>: data });
});
</code></pre>
<h3 id="مفعلة-شرطيا">مُفعّلة شرطيًا</h3>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">timing</span>({
    <span class="hljs-comment">// c: Context of the request</span>
    <span class="hljs-attr">enabled</span>: <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-property">req</span>.<span class="hljs-property">method</span> === <span class="hljs-string">&#x27;POST&#x27;</span>,
  })
)
</code></pre>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/hono/timing-example.png" alt=""></p>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="total-boolean"><Badge type="info" text="optional" /> total: <code>boolean</code></h3>
<p>أظهر زمن الاستجابة الكلي. الافتراضي هو <code>true</code>.</p>
<h3 id="enabled-boolean-c-context-gt-boolean"><Badge type="info" text="optional" /> enabled: <code>boolean</code> | <code>(c: Context) =&gt; boolean</code></h3>
<p>ما إذا كان يجب إضافة التوقيتات (timings) إلى الرؤوس (headers) أم لا. الافتراضي هو <code>true</code>.</p>
<h3 id="totaldescription-string"><Badge type="info" text="optional" /> totalDescription: <code>string</code></h3>
<p>وصف لإجمالي زمن الاستجابة. الافتراضي هو <code>Total Response Time</code>.</p>
<h3 id="autoend-boolean"><Badge type="info" text="optional" /> autoEnd: <code>boolean</code></h3>
<p>إذا <code>startTime()</code> يجب أن تنتهي تلقائيًا في نهاية الطلب.
إذا كان معطَّلاً، فلن تظهر المؤقتات (timers) التي لم تُنهَ يدوياً.</p>
<h3 id="crossorigin-boolean-string-c-context-gt-boolean-string"><Badge type="info" text="optional" /> <code>crossOrigin</code>: <code>boolean</code> | <code>string</code> | <code>(c: Context) =&gt; boolean | string</code></h3>
<p>الأصل الذي ينبغي أن تكون ترويسة التوقيتات هذه قابلة للقراءة منه.</p>
<ul>
<li>إذا كانت false، فمن الأصل الحالي فقط.</li>
<li>إذا كانت true، من جميع الأصول.</li>
<li>إذا كانت سلسلة نصية، فمن هذه النطاقات. يجب فصل النطاقات المتعددة بفاصلة.</li>
</ul>
<p>القيمة الافتراضية هي <code>false</code>. اطّلع على المزيد <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin">المستندات</a>.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,p as default,l as headings,o as html,t as slug,e as title};
