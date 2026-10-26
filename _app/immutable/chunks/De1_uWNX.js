const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="snapshot-testing",l="اختبار اللقطات (Snapshot Testing)",p=[{depth:2,id:"ما-هو-اختبار-اللقطات",text:"ما هو اختبار اللقطات؟"},{depth:2,id:"كيف-يعمل-اختبار-اللقطات-في-vitest",text:"كيف يعمل اختبار اللقطات في Vitest؟"},{depth:2,id:"إعداد-اختبار-اللقطات",text:"إعداد اختبار اللقطات"},{depth:2,id:"تحديث-اللقطات",text:"تحديث اللقطات"},{depth:2,id:"أفضل-الممارسات-لاختبار-اللقطات",text:"أفضل الممارسات لاختبار اللقطات"},{depth:3,id:"أبق-اللقطات-قابلة-للقراءة",text:"أبقِ اللقطات قابلة للقراءة"},{depth:3,id:"استخدم-أسماء-اختبارات-وصفية",text:"استخدم أسماء اختبارات وصفية"},{depth:3,id:"راجع-اللقطات-أثناء-مراجعات-الشيفرة",text:"راجع اللقطات أثناء مراجعات الشيفرة"},{depth:3,id:"حد-من-حجم-اللقطة",text:"حدّ من حجم اللقطة"},{depth:3,id:"ادمجها-مع-تحققات-أخرى",text:"ادمجها مع تحققات أخرى"},{depth:2,id:"متى-تكون-اللقطات-مفيدة",text:"متى تكون اللقطات مفيدة؟"},{depth:3,id:"تغذية-راجعة-سريعة-على-تغييرات-واجهة-المستخدم",text:"تغذية راجعة سريعة على تغييرات واجهة المستخدم"},{depth:3,id:"اختبار-التسلسل",text:"اختبار التسلسل"},{depth:3,id:"مخرجات-معقدة",text:"مخرجات معقدة"},{depth:2,id:"المزالق-المحتملة-لاختبار-اللقطات",text:"المزالق المحتملة لاختبار اللقطات"},{depth:3,id:"لقطات-هشة",text:"لقطات هشة"},{depth:3,id:"الاعتماد-المفرط-على-اللقطات",text:"الاعتماد المفرط على اللقطات"},{depth:3,id:"لقطات-كبيرة-وعصية-على-الإدارة",text:"لقطات كبيرة وعصية على الإدارة"},{depth:3,id:"تجاهل-إخفاقات-اللقطات",text:"تجاهل إخفاقات اللقطات"},{depth:2,id:"استراتيجيات-لإدارة-اللقطات-الهشة",text:"استراتيجيات لإدارة اللقطات الهشة"},{depth:3,id:"استخدم-اللقطات-المضمنة",text:"استخدم اللقطات المضمّنة"},{depth:3,id:"تخصيص-تسلسل-اللقطات",text:"تخصيص تسلسل اللقطات"},{depth:3,id:"استخدم-مطابقات-الخصائص",text:"استخدم مطابقات الخصائص"},{depth:2,id:"أمثلة-عملية",text:"أمثلة عملية"},{depth:3,id:"اختبار-استجابات-واجهة-برمجة-التطبيقات",text:"اختبار استجابات واجهة برمجة التطبيقات"},{depth:3,id:"اختبار-الترميز-المولد",text:"اختبار الترميز المولّد"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>اختبار اللقطات تقنية قوية في اختبار البرمجيات تلتقط مخرجات قطعة من الشيفرة وتقارنها بلقطة مرجعية مخزّنة إلى جانب الاختبار. إذا تغيرت المخرجات، يفشل الاختبار، منبّهًا المطورين إلى تغييرات غير متوقعة في قاعدة الشيفرة.</p>
<p>يستكشف هذا المقال كيفية تنفيذ اختبار اللقطات باستخدام Vitest، إطار اختبار وحدات سريع لتطبيقات JavaScript الحديثة. سنناقش أفضل الممارسات والفوائد والمزالق المحتملة، بما يساعدك على فهم متى تستخدم اللقطات بفعالية.</p>
<h2 id="ما-هو-اختبار-اللقطات">ما هو اختبار اللقطات؟</h2>
<p>يتضمن اختبار اللقطات حفظ مخرجات دالة أو مكوّن ومقارنتها بـ«لقطة» محفوظة في تشغيلات الاختبار اللاحقة. إنه مفيد بشكل خاص لاختبار المخرجات المعقدة أو الكبيرة، مثل الكائنات المتسلسلة أو بنى HTML أو استجابات واجهات برمجة التطبيقات.</p>
<h2 id="كيف-يعمل-اختبار-اللقطات-في-vitest">كيف يعمل اختبار اللقطات في Vitest؟</h2>
<p>يوفر Vitest دعمًا مدمجًا لاختبار اللقطات. عندما تشغّل اختبارًا يتضمن <code>expect(value).toMatchSnapshot()</code>، سيقوم Vitest بما يلي:</p>
<ol>
<li>توليد ملف لقطة (إن لم يكن موجودًا) يحتوي القيمة المتسلسلة.</li>
<li>في التشغيلات اللاحقة، مقارنة القيمة الحالية باللقطة المحفوظة.</li>
<li>الإبلاغ عن أي اختلافات كإخفاقات اختبار.</li>
</ol>
<h2 id="إعداد-اختبار-اللقطات">إعداد اختبار اللقطات</h2>
<p><strong>مثال أساسي:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// formatter.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">formatUser</span>(<span class="hljs-params">user</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`User: <span class="hljs-subst">\${user.name}</span>, Age: <span class="hljs-subst">\${user.age}</span>\`</span>;
}
</code></pre>
<p><strong>اختبار مع لقطة:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// formatter.test.js</span>
<span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { formatUser } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./formatter&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;formats user information correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> };
  <span class="hljs-keyword">const</span> formattedUser = <span class="hljs-title function_">formatUser</span>(user);
  <span class="hljs-title function_">expect</span>(formattedUser).<span class="hljs-title function_">toMatchSnapshot</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>في المرة الأولى التي يعمل فيها الاختبار، ينشئ Vitest ملف لقطة يحتوي مخرجات <code>formatUser(user)</code>.</li>
<li>في التشغيلات اللاحقة، يقارن Vitest المخرجات باللقطة.</li>
<li>إذا تغيرت المخرجات، يفشل الاختبار.</li>
</ul>
<h2 id="تحديث-اللقطات">تحديث اللقطات</h2>
<p>عند إجراء تغييرات مقصودة على المخرجات، يمكنك تحديث اللقطات:</p>
<ul>
<li>شغّل <code>vitest -u</code> أو <code>vitest --update</code> لتحديث كل اللقطات.</li>
<li>بدلًا من ذلك، حدّث اللقطات تفاعليًا عند المطالبة.</li>
</ul>
<h2 id="أفضل-الممارسات-لاختبار-اللقطات">أفضل الممارسات لاختبار اللقطات</h2>
<h3 id="أبق-اللقطات-قابلة-للقراءة">أبقِ اللقطات قابلة للقراءة</h3>
<p>تأكد من أن ملفات اللقطات مقروءة للبشر:</p>
<ul>
<li>تجنب التقاط بيانات غير ضرورية.</li>
<li>نسّق الكائنات المعقدة للوضوح.</li>
</ul>
<p>مثال:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">expect</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(largeObject, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toMatchSnapshot</span>();
</code></pre>
<h3 id="استخدم-أسماء-اختبارات-وصفية">استخدم أسماء اختبارات وصفية</h3>
<p>تساعد أسماء الاختبارات الواضحة في تحديد أي لقطة تقابل أي اختبار.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;formats user information with full details&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Test code</span>
});
</code></pre>
<h3 id="راجع-اللقطات-أثناء-مراجعات-الشيفرة">راجع اللقطات أثناء مراجعات الشيفرة</h3>
<p>تعامل مع تحديثات اللقطات بالتدقيق نفسه الذي تعامل به تغييرات الشيفرة:</p>
<ul>
<li>تحقق من أن التغييرات مقصودة.</li>
<li>تأكد من التحقيق في التغييرات غير المتوقعة.</li>
</ul>
<h3 id="حد-من-حجم-اللقطة">حدّ من حجم اللقطة</h3>
<p>اللقطات الكبيرة أصعب في المراجعة والصيانة:</p>
<ul>
<li>تجنب أخذ لقطات لكائنات أو استجابات كبيرة بأكملها.</li>
<li>ركّز على الأجزاء ذات الصلة من المخرجات.</li>
</ul>
<h3 id="ادمجها-مع-تحققات-أخرى">ادمجها مع تحققات أخرى</h3>
<p>استخدم اللقطات إلى جانب تحققات صريحة للقيم الحرجة:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">expect</span>(user.<span class="hljs-property">name</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>);
<span class="hljs-title function_">expect</span>(formattedUser).<span class="hljs-title function_">toMatchSnapshot</span>();
</code></pre>
<h2 id="متى-تكون-اللقطات-مفيدة">متى تكون اللقطات مفيدة؟</h2>
<h3 id="تغذية-راجعة-سريعة-على-تغييرات-واجهة-المستخدم">تغذية راجعة سريعة على تغييرات واجهة المستخدم</h3>
<ul>
<li><strong>حالة الاستخدام</strong>: اختبار HTML متسلسل أو مخرجات قوالب.</li>
<li><strong>الفائدة</strong>: يكتشف بسرعة التغييرات غير المقصودة في المخرجات المصيّرة.</li>
</ul>
<h3 id="اختبار-التسلسل">اختبار التسلسل</h3>
<ul>
<li><strong>حالة الاستخدام</strong>: ضمان تسلسل الكائنات بشكل متسق.</li>
<li><strong>الفائدة</strong>: يلتقط التغييرات في منطق التسلسل التي قد تؤثر في تخزين البيانات أو نقلها.</li>
</ul>
<h3 id="مخرجات-معقدة">مخرجات معقدة</h3>
<ul>
<li><strong>حالة الاستخدام</strong>: دوال تعيد بنى بيانات معقدة.</li>
<li><strong>الفائدة</strong>: يبسّط الاختبار بتجنب العديد من التحققات الصريحة.</li>
</ul>
<h2 id="المزالق-المحتملة-لاختبار-اللقطات">المزالق المحتملة لاختبار اللقطات</h2>
<h3 id="لقطات-هشة">لقطات هشة</h3>
<p><strong>المشكلة</strong>: قد تصبح اللقطات هشة إذا التقطت تغييرات غير ذات صلة، ما يؤدي إلى تحديثات غير ضرورية متكررة.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>أبقِ اللقطات مركّزة على مخرجات مستقرة.</li>
<li>استبعد البيانات الديناميكية مثل الطوابع الزمنية أو المعرّفات.</li>
</ul>
<p>مثال:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">12345</span>, <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() };
<span class="hljs-title function_">expect</span>(user).<span class="hljs-title function_">toMatchSnapshot</span>({
  <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
  <span class="hljs-attr">createdAt</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Date</span>),
});
</code></pre>
<h3 id="الاعتماد-المفرط-على-اللقطات">الاعتماد المفرط على اللقطات</h3>
<p><strong>المشكلة</strong>: الاعتماد على اللقطات وحدها قد يؤدي إلى تفويت أخطاء إذا لم تُراجع تغييرات اللقطة بعناية.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>استخدم اللقطات مكمّلًا للتحققات الصريحة، لا بديلًا عنها.</li>
<li>راجع تغييرات اللقطات بانتظام أثناء مراجعات الشيفرة.</li>
</ul>
<h3 id="لقطات-كبيرة-وعصية-على-الإدارة">لقطات كبيرة وعصية على الإدارة</h3>
<p><strong>المشكلة</strong>: اللقطات الكبيرة صعبة القراءة والصيانة، ما يقلل فعاليتها.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>حدّ من حجم اللقطات.</li>
<li>قسّم الاختبارات لتركّز على أجزاء محددة من المخرجات.</li>
</ul>
<h3 id="تجاهل-إخفاقات-اللقطات">تجاهل إخفاقات اللقطات</h3>
<p><strong>المشكلة</strong>: قد يصبح المطورون غير مبالين بإخفاقات اللقطات ويحدّثونها دون تحقيق مناسب.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>شجّع ثقافة الفحص الدقيق لتغييرات اللقطات.</li>
<li>حدّث اللقطات فقط عندما تكون التغييرات مقصودة ومفهومة.</li>
</ul>
<h2 id="استراتيجيات-لإدارة-اللقطات-الهشة">استراتيجيات لإدارة اللقطات الهشة</h2>
<h3 id="استخدم-اللقطات-المضمنة">استخدم اللقطات المضمّنة</h3>
<p>يدعم Vitest اللقطات المضمّنة، التي تخزّن اللقطة داخل ملف الاختبار.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;formats user information correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> };
  <span class="hljs-keyword">const</span> formattedUser = <span class="hljs-title function_">formatUser</span>(user);
  <span class="hljs-title function_">expect</span>(formattedUser).<span class="hljs-title function_">toMatchInlineSnapshot</span>(<span class="hljs-string">\`&quot;User: Alice, Age: 30&quot;\`</span>);
});
</code></pre>
<p><strong>الفوائد</strong>:</p>
<ul>
<li>مراجعة وصيانة اللقطات الصغيرة أسهل.</li>
<li>يقلل الحاجة إلى التنقل بين ملفات الاختبار واللقطات.</li>
</ul>
<h3 id="تخصيص-تسلسل-اللقطات">تخصيص تسلسل اللقطات</h3>
<p>نفّذ مسلسلات مخصصة (custom serializers) للتحكم في كيفية تسلسل الكائنات في اللقطات.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

expect.<span class="hljs-title function_">addSnapshotSerializer</span>({
  <span class="hljs-attr">test</span>: <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Date</span>,
  <span class="hljs-attr">serialize</span>: <span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> val.<span class="hljs-title function_">toISOString</span>(),
});
</code></pre>
<p><strong>الفوائد</strong>:</p>
<ul>
<li>يوفر تسلسلًا متسقًا لأنواع بيانات معقدة أو مخصصة.</li>
<li>يقلل الضوضاء في اللقطات الناتجة عن بيانات غير ذات صلة.</li>
</ul>
<h3 id="استخدم-مطابقات-الخصائص">استخدم مطابقات الخصائص</h3>
<p>استخدم مطابقات مثل <code>expect.any()</code> لتجاهل الخصائص الديناميكية.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">expect</span>(response).<span class="hljs-title function_">toMatchSnapshot</span>({
  <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
  <span class="hljs-attr">timestamp</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">String</span>),
});
</code></pre>
<p><strong>الفوائد</strong>:</p>
<ul>
<li>يركّز اللقطة على البيانات ذات الصلة.</li>
<li>يمنع إخفاقات اللقطة بسبب تقلب متوقع.</li>
</ul>
<h2 id="أمثلة-عملية">أمثلة عملية</h2>
<h3 id="اختبار-استجابات-واجهة-برمجة-التطبيقات">اختبار استجابات واجهة برمجة التطبيقات</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// apiClient.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/data&#x27;</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}
</code></pre>
<p><strong>اختبار مع لقطة:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// apiClient.test.js</span>
<span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { fetchData } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./apiClient&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;fetches data correctly&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchData</span>();
  <span class="hljs-title function_">expect</span>(data).<span class="hljs-title function_">toMatchSnapshot</span>({
    <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
    <span class="hljs-attr">createdAt</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">String</span>),
  });
});
</code></pre>
<p><strong>الشرح</strong>:</p>
<ul>
<li>تُطابق الخصائص الديناميكية مثل <code>id</code> و<code>createdAt</code> باستخدام <code>expect.any()</code>.</li>
<li>تركّز اللقطة على البنية والمحتوى الثابت.</li>
</ul>
<h3 id="اختبار-الترميز-المولد">اختبار الترميز المولّد</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// template.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">renderList</span>(<span class="hljs-params">items</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;ul&gt;<span class="hljs-subst">\${items.map((item) =&gt; <span class="hljs-string">\`&lt;li&gt;<span class="hljs-subst">\${item}</span>&lt;/li&gt;\`</span>).join(<span class="hljs-string">&#x27;&#x27;</span>)}</span>&lt;/ul&gt;\`</span>;
}
</code></pre>
<p><strong>اختبار مع لقطة:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// template.test.js</span>
<span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { renderList } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./template&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders list correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> items = [<span class="hljs-string">&#x27;Apple&#x27;</span>, <span class="hljs-string">&#x27;Banana&#x27;</span>, <span class="hljs-string">&#x27;Cherry&#x27;</span>];
  <span class="hljs-keyword">const</span> html = <span class="hljs-title function_">renderList</span>(items);
  <span class="hljs-title function_">expect</span>(html).<span class="hljs-title function_">toMatchSnapshot</span>();
});
</code></pre>
<p><strong>الشرح</strong>:</p>
<ul>
<li>يلتقط HTML المصيّر للقائمة.</li>
<li>يكتشف بسرعة التغييرات في منطق تصيير القالب.</li>
</ul>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>اختبار اللقطات مع Vitest أداة قيّمة للتحقق من المخرجات المعقدة بأقل جهد. بفهم متى تستخدم اللقطات وكيف تدير هشاشتها المحتملة، يمكنك تحسين فعالية مجموعة اختباراتك دون المساس بقابلية الصيانة.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
