const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",t="testing-and-debugging-trpc",l="الاختبار وتصحيح الأخطاء في tRPC",p=[{depth:2,id:"اختبارات-الوحدة-على-جانب-الخادم",text:"اختبارات الوحدة على جانب الخادم"},{depth:2,id:"تصحيح-الأخطاء",text:"تصحيح الأخطاء"}],e=`<h2 id="اختبارات-الوحدة-على-جانب-الخادم">اختبارات الوحدة على جانب الخادم</h2>
<p>يوفّر tRPC تابعًا مفيدًا هو <code>createCaller()</code> لاستدعاء إجراءاتك مباشرةً دون تشغيل خادم Express. اجمع ذلك مع قاعدة بيانات اختبارية أو مع بديل مُحاكى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// server/test/userRouter.test.ts</span>
<span class="hljs-keyword">import</span> { test, expect, beforeEach } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { appRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/index&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Database</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;better-sqlite3&#x27;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-attr">db</span>: <span class="hljs-title class_">Database</span>;

<span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
  db = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Database</span>(<span class="hljs-string">&#x27;:memory:&#x27;</span>);
  db.<span class="hljs-title function_">prepare</span>(<span class="hljs-string">&#x27;CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT)&#x27;</span>).<span class="hljs-title function_">run</span>();
  db.<span class="hljs-title function_">prepare</span>(<span class="hljs-string">&#x27;INSERT INTO user (name, password) VALUES (?, ?)&#x27;</span>).<span class="hljs-title function_">run</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-string">&#x27;pass123&#x27;</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;getUser finds existing user&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> caller = appRouter.<span class="hljs-title function_">createCaller</span>({ db, <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span> });
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> caller.<span class="hljs-property">user</span>.<span class="hljs-title function_">getUser</span>(<span class="hljs-number">1</span>);
  <span class="hljs-title function_">expect</span>(user?.<span class="hljs-property">name</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>);
});
</code></pre>
<p>بلا تلاعب باستدعاءات HTTP، لذا فهو سريع. وإن أردت اختبارات تكامل أو اختبارات من طرف إلى طرف، فيمكنك تشغيل خادمك واستعلامه بشكل معتاد. وفي التطبيقات الكبيرة قد تُجري أيضًا اختبارات تكامل للواجهة الأمامية باستخدام Cypress أو Playwright.</p>
<h2 id="تصحيح-الأخطاء">تصحيح الأخطاء</h2>
<ul>
<li><strong>افحص السجلات</strong>: أضف <code>onError</code> إلى وسيط tRPC أو استخدم وسيطًا للتسجيل.</li>
<li><strong>أدوات تطوير React Query</strong>: إذا كنت تستخدم React، فيمكن لأدوات التطوير أن تكشف حالات الاستعلام والتخزين المؤقت وغير ذلك.</li>
<li><strong>سجلات الطرفية</strong>: عند الشك، انثرها هنا وهناك (وأزلها بعد أن تنتهي!).</li>
<li><strong>CORS</strong>: تأكد من تفعيله إذا كانت واجهتك العميلة تُقدَّم من أصل مختلف.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
