const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="trpc-on-the-client",t="استخدام tRPC على العميل",p=[{depth:2,id:"تثبيت-الاعتمادات",text:"تثبيت الاعتمادات"},{depth:2,id:"تحديث-عميل-الواجهة-البرمجية",text:"تحديث عميل الواجهة البرمجية"},{depth:3,id:"أبرز-التغييرات-التي-أجريت",text:"أبرز التغييرات التي أُجريت"},{depth:3,id:"جلب-المهام",text:"جلب المهام"},{depth:3,id:"جلب-مهمة-واحدة",text:"جلب مهمة واحدة"},{depth:3,id:"إنشاء-مهمة",text:"إنشاء مهمة"},{depth:3,id:"تحديث-مهمة",text:"تحديث مهمة"},{depth:3,id:"حذف-مهمة",text:"حذف مهمة"},{depth:2,id:"فوائد-استخدام-trpc",text:"فوائد استخدام tRPC"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>يوثّق هذا الدليل كيف نقلنا واجهة العميل البرمجية من استخدام طلبات REST المباشرة إلى استخدام tRPC. وقبل تنفيذ هذه التغييرات كان ما يلي قد جُهّز:</p>
<ul>
<li>خادم tRPC (في <code>/server/src/trpc.ts</code>)</li>
<li>مخططات مشتركة بين العميل والخادم (في <code>shared/schemas.ts</code>)</li>
<li>عميل REST API قائم بالفعل (في <code>/client/src/api.ts</code>)</li>
</ul>
<h2 id="تثبيت-الاعتمادات">تثبيت الاعتمادات</h2>
<p>فعلت ذلك نيابةً عنك بالفعل، لكن يبدو من المناسب التنبيه إليه صراحةً. كانت الخطوة الأولى هي تثبيت حزم tRPC اللازمة على جانب العميل:</p>
<pre><code class="language-bash">npm install @trpc/client
</code></pre>
<h2 id="تحديث-عميل-الواجهة-البرمجية">تحديث عميل الواجهة البرمجية</h2>
<p>أُعيدت هيكلة عميل REST API القائم بالكامل لاستخدام tRPC:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-keyword">type</span> <span class="hljs-title class_">NewTask</span>, <span class="hljs-keyword">type</span> <span class="hljs-title class_">Task</span>, <span class="hljs-keyword">type</span> <span class="hljs-title class_">UpdateTask</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;busy-bee-schema&#x27;</span>;

<span class="hljs-keyword">import</span> { createTRPCProxyClient, httpBatchLink } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/client&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppRouter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../server/src/trpc&#x27;</span>;

<span class="hljs-keyword">const</span> client = createTRPCProxyClient&lt;<span class="hljs-title class_">AppRouter</span>&gt;({
  <span class="hljs-attr">links</span>: [
    <span class="hljs-title function_">httpBatchLink</span>({
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://localhost:4001/api/trpc&#x27;</span>,
    }),
  ],
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchTasks = <span class="hljs-title function_">async</span> (<span class="hljs-attr">showCompleted</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Task</span>[]&gt; =&gt; {
  <span class="hljs-keyword">return</span> client.<span class="hljs-property">task</span>.<span class="hljs-property">getTasks</span>.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">completed</span>: showCompleted ? <span class="hljs-literal">true</span> : <span class="hljs-literal">undefined</span> });
};
</code></pre>
<h3 id="أبرز-التغييرات-التي-أجريت">أبرز التغييرات التي أُجريت</h3>
<p><strong>إعداد العميل</strong>: أنشأنا عميل tRPC الوسيط الذي يتصل بنقطة نهاية الخادم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> client = createTRPCProxyClient&lt;<span class="hljs-title class_">AppRouter</span>&gt;({
  <span class="hljs-attr">links</span>: [
    <span class="hljs-title function_">httpBatchLink</span>({
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://localhost:4001/trpc&#x27;</span>,
    }),
  ],
});
</code></pre>
<h3 id="جلب-المهام">جلب المهام</h3>
<p>حُدِّث لاستخدام استعلام tRPC</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchTasks = <span class="hljs-title function_">async</span> (<span class="hljs-attr">showCompleted</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Task</span>[]&gt; =&gt; {
  <span class="hljs-keyword">return</span> client.<span class="hljs-property">task</span>.<span class="hljs-property">getTasks</span>.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">completed</span>: showCompleted ? <span class="hljs-literal">true</span> : <span class="hljs-literal">undefined</span> });
};
</code></pre>
<h3 id="جلب-مهمة-واحدة">جلب مهمة واحدة</h3>
<p>حُدِّث لاستخدام استعلام tRPC مع معامل المعرّف</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Task</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> task = <span class="hljs-keyword">await</span> client.<span class="hljs-property">task</span>.<span class="hljs-property">getTask</span>.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">id</span>: <span class="hljs-built_in">parseInt</span>(id, <span class="hljs-number">10</span>) });

  <span class="hljs-keyword">if</span> (!task) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch task&#x27;</span>);

  <span class="hljs-keyword">return</span> task;
};
</code></pre>
<h3 id="إنشاء-مهمة">إنشاء مهمة</h3>
<p>حُدِّث لاستخدام تعديل tRPC</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">task</span>: <span class="hljs-title class_">NewTask</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">await</span> client.<span class="hljs-property">task</span>.<span class="hljs-property">createTask</span>.<span class="hljs-title function_">mutate</span>(task);
};
</code></pre>
<h3 id="تحديث-مهمة">تحديث مهمة</h3>
<p>حُدِّث لاستخدام تعديل tRPC مع بنية معاملات سليمة</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updateTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">task</span>: <span class="hljs-title class_">UpdateTask</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">await</span> client.<span class="hljs-property">task</span>.<span class="hljs-property">updateTask</span>.<span class="hljs-title function_">mutate</span>({
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">parseInt</span>(id, <span class="hljs-number">10</span>),

    task,
  });
};
</code></pre>
<h3 id="حذف-مهمة">حذف مهمة</h3>
<p>حُدِّث لاستخدام تعديل tRPC</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> deleteTask = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">await</span> client.<span class="hljs-property">task</span>.<span class="hljs-property">deleteTask</span>.<span class="hljs-title function_">mutate</span>({ <span class="hljs-attr">id</span>: <span class="hljs-built_in">parseInt</span>(id, <span class="hljs-number">10</span>) });
};
</code></pre>
<h2 id="فوائد-استخدام-trpc">فوائد استخدام tRPC</h2>
<ol>
<li><strong>أمان الأنواع</strong>: أمان كامل للأنواع من طرف إلى طرف بين العميل والخادم</li>
<li><strong>استدعاءات واجهة برمجية مبسّطة</strong>: لا حاجة إلى بناء عناوين URL يدويًا أو التعامل مع أخطاء HTTP</li>
<li><strong>استنتاج تلقائي للأنواع</strong>: يعرف العميل تلقائيًا شكل البيانات القادمة من الخادم</li>
<li><strong>تقليل الشيفرة المتكرّرة</strong>: لا حاجة إلى تحقق صريح من البيانات أو تحليلها</li>
<li><strong>تجربة مطوّر أفضل</strong>: إكمال تلقائي لنقاط النهاية المتاحة</li>
</ol>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<ul>
<li>نفّذ تحديثات تفاؤلية لتحسين تجربة المستخدم</li>
<li>أضف وسيطًا لمعالجة الأخطاء</li>
<li>فكّر في تنفيذ تحديثات فورية باستخدام اشتراكات tRPC</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
