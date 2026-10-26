const s="kinney",n="testing",t="مدخل إلى الاختبارات",e="filtering-tests",a="ترشيح الاختبارات",l=[{depth:2,id:"الترشيح-حسب-اسم-الملف",text:"الترشيح حسب اسم الملف"},{depth:2,id:"الترشيح-حسب-اسم-الاختبار",text:"الترشيح حسب اسم الاختبار"},{depth:2,id:"الترشيح-حسب-المجلد-أو-الدليل",text:"الترشيح حسب المجلد أو الدليل"},{depth:2,id:"الترشيح-على-مستوى-الاختبار-الواحد",text:"الترشيح على مستوى الاختبار الواحد"},{depth:2,id:"تشغيل-اختبارات-معينة-فقط",text:"تشغيل اختبارات معيّنة فقط"},{depth:2,id:"تجاوز-اختبارات-معينة",text:"تجاوز اختبارات معيّنة"},{depth:2,id:"تشغيل-الاختبارات-شرطيا",text:"تشغيل الاختبارات شرطيًا"},{depth:2,id:"أمثلة",text:"أمثلة"},{depth:2,id:"ترشيح-الاختبارات-ديناميكيا",text:"ترشيح الاختبارات ديناميكيًا"},{depth:2,id:"ترشيح-الاختبارات-حسب-اسم-الملف-عند-البدء",text:"ترشيح الاختبارات حسب اسم الملف عند البدء"},{depth:2,id:"vitest-related",text:"vitest related"},{depth:2,id:"vitest-changed",text:"vitest --changed"}],p=`<p>يمنحك Vitest مجموعة من الطرق المثيرة لتشغيل <em>بعض</em> اختباراتك فقط. لنتناول بعضًا من أكثرها شيوعًا.</p>
<h2 id="الترشيح-حسب-اسم-الملف">الترشيح حسب اسم الملف</h2>
<p>إن مرّرت وسيطًا إلى Vitest، فسيُرشّح اختباراتك ولن يحاول مطابقة سوى التي تحمل ذلك الاسم.</p>
<pre><code class="language-bash">npx vitest arithmetic
</code></pre>
<p>سيشغّل هذا <code>src/close-enough.test.js</code>، ولن يشغّل أي اختبار آخر.</p>
<h2 id="الترشيح-حسب-اسم-الاختبار">الترشيح حسب اسم الاختبار</h2>
<p>يمكنك أيضًا استخدام الخيار <code>--testNamePattern &lt;pattern&gt;</code> (أو <code>-t</code> اختصارًا) لترشيح الاختبارات حسب اسمها. يكون هذا مفيدًا عندما تريد الترشيح حسب الاسم الذي أطلقته على الاختبار باستخدام <code>it</code> أو <code>test</code> داخل ملف، بدلًا من اسم الملف الذي يحتوي على الاختبار.</p>
<h2 id="الترشيح-حسب-المجلد-أو-الدليل">الترشيح حسب المجلد أو الدليل</h2>
<p>يحدّد العلم <code>--dir</code> في Vitest الدليل الذي تريد أن يبحث فيه Vitest عن الاختبارات.</p>
<pre><code class="language-bash">vitest --<span class="hljs-built_in">dir</span> ./packages/api
</code></pre>
<p>فبتمرير مسار دليل كوسيط إلى العلم <code>--dir</code>، سيمضي Vitest في البحث عوديًا عن ملفات الاختبار داخل ذلك الدليل ودليله الفرعية. يتيح لك ذلك تحديد دليل معيّن لتشغيل الاختبارات منه بسهولة، بدلًا من تشغيل الاختبارات من المشروع بأكمله.</p>
<h2 id="الترشيح-على-مستوى-الاختبار-الواحد">الترشيح على مستوى الاختبار الواحد</h2>
<p>أحيانًا لا نريد أن تُشغّل جميع اختباراتنا. وأحيانًا نريد أن تُشغّل اختبارات معيّنة فقط.</p>
<ul>
<li><code>test.skip</code>: تجاوز هذا الاختبار في الوقت الحالي.</li>
<li><code>test.only</code>: شغّل هذا الاختبار فقط وأي اختبار آخر يستخدم <code>.only</code>.</li>
<li><code>test.todo</code>: ملاحظة لنفسي—ما زلت بحاجة إلى كتابة هذا الاختبار.</li>
<li><code>test.fails</code>: أجل، أعرف أن هذا الاختبار يفشل. لا تُفجّر بقية تشغيل الاختبارات، من فضلك.</li>
</ul>
<h2 id="تشغيل-اختبارات-معينة-فقط">تشغيل اختبارات معيّنة فقط</h2>
<p>يمكنك استخدام <code>.only</code> إن أردت تشغيل <em>بعض</em> اختباراتك فقط.</p>
<pre><code class="language-typescript">it.<span class="hljs-title function_">only</span>(<span class="hljs-string">&#x27;should work&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;works with &quot;test&quot; as well&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
});
</code></pre>
<h2 id="تجاوز-اختبارات-معينة">تجاوز اختبارات معيّنة</h2>
<p>بدلًا من ذلك، يمكنك <code>skip</code> الاختبارات التي لا تريد تشغيلها الآن.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { it, expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should work&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
});

test.<span class="hljs-title function_">skip</span>(<span class="hljs-string">&#x27;works with &quot;test&quot; as well&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
});
</code></pre>
<p>بدلًا من ذلك، يمكنك استخدام <code>todo</code> للدلالة على أنك تريد تجاوز هذا الاختبار الآن، <em>لكن</em> السبب أنك تنوي كتابة تنفيذ له… في نهاية المطاف.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should work&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
	<span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
});

test.<span class="hljs-title function_">todo</span>(<span class="hljs-string">&#x27;works with &quot;test&quot; as well&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
	<span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-property">not</span> to be <span class="hljs-literal">false</span>);
});
</code></pre>
<h2 id="تشغيل-الاختبارات-شرطيا">تشغيل الاختبارات شرطيًا</h2>
<p>رأيت بعضًا من هذه سابقًا (أول اثنين فحسب)، لكنني سأشير إليها تحسّبًا لأن تكون فوّتها:</p>
<ul>
<li><code>test.skipIf</code>: تجاوز هذا الاختبار فقط إن أعطيتك قيمة صادقة.</li>
<li><code>test.runIf</code>: شغّل هذا الاختبار فقط إن أعطيتك قيمة صادقة.</li>
<li><code>test.concurrent</code>: شغّل هذا الاختبار بالتوازي مع أي اختبار آخر يستخدم <code>.concurrent</code>. سنتناول هذا في <a href="https://stevekinney.com/courses/testing/parallelizing-tests">تشغيل الاختبارات بالتوازي</a>.</li>
<li><code>test.each</code>: أريد توليد مجموعة من الاختبارات. سنتناول هذا في <a href="https://stevekinney.com/courses/testing/parameterizing-tests">توليد الاختبارات</a>.</li>
</ul>
<h2 id="أمثلة">أمثلة</h2>
<pre><code class="language-typescript">test.<span class="hljs-title function_">runIf</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>)(
  <span class="hljs-string">&#x27;it should run in development&#x27;</span>,

  <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;development&#x27;</span>);
  },
);
</code></pre>
<pre><code class="language-typescript">test.<span class="hljs-title function_">skipIf</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;test&#x27;</span>)(<span class="hljs-string">&#x27;it should run in test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;test&#x27;</span>);
});
</code></pre>
<h2 id="ترشيح-الاختبارات-ديناميكيا">ترشيح الاختبارات ديناميكيًا</h2>
<p>عندما يراقب Vitest (أو Jest، في هذا الشأن) التغييرات، يمكنك الضغط على المفتاح <strong>h</strong> لفتح بعض الخيارات:</p>
<ul>
<li>اضغط <strong>a</strong> لإعادة تشغيل كل الاختبارات</li>
<li>اضغط <strong>f</strong> لإعادة تشغيل الاختبارات الفاشلة فقط</li>
<li>اضغط <strong>u</strong> لتحديث لقطة الحالة</li>
<li>اضغط <strong>p</strong> للترشيح حسب اسم ملف</li>
<li>اضغط <strong>t</strong> للترشيح حسب نمط تعبير نمطي لاسم اختبار</li>
<li>اضغط <strong>q</strong> للخروج</li>
</ul>
<p>قد يكون الترشيح حسب اسم الاختبار مفيدًا جدًا إن كنت مثلي ولا تثق بنفسك في تذكّر إزالة تعليقات <code>skip</code> و<code>only</code>. (رغم أننا سنتحدث أكثر عن هذا لاحقًا.)</p>
<h2 id="ترشيح-الاختبارات-حسب-اسم-الملف-عند-البدء">ترشيح الاختبارات حسب اسم الملف عند البدء</h2>
<pre><code class="language-typescript">npm test foo
</code></pre>
<p>سيشغّل هذا <code>foo.test.ts</code>، و<em>ليس</em> <code>bar.test.ts</code>.</p>
<h2 id="vitest-related"><code>vitest related</code></h2>
<p>سيشغّل هذا الاختبارات المرتبطة بأي ملف تمرّره. (فهو أشبه بمرشّح لكنه يضيف بعضًا آخر إلى الخليط.)</p>
<h2 id="vitest-changed"><code>vitest --changed</code></h2>
<p>يشغّل الاختبارات المرتبطة بالملفات التي تغيّرت. بشكل افتراضي، يكون هذا مقابل أي ملفات غير مُودعة. لكن يمكنك أيضًا فعل أشياء رائعة مثل <code>--changed HEAD~1</code> أو إعطائه اسم فرع للمقارنة به أو إيداع بعينه.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:e,title:a,headings:l,html:p};export{s as book,n as chapter,t as chapterTitle,c as default,l as headings,p as html,e as slug,a as title};
