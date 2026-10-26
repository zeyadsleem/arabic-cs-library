const s="kinney",n="testing",t="مدخل إلى الاختبارات",a="running-tests-for-related-files",e="تشغيل اختبارات الملفات ذات الصلة فقط",p=[{depth:2,id:"الأمر-vitest-related",text:"الأمر: vitest related"},{depth:2,id:"المثال-الأول-كنت-تعدل-دالة-واحدة-في-ملف-واحد",text:"المثال الأول: كنت تعدّل دالة واحدة في ملف واحد"},{depth:2,id:"المثال-الثاني-ملفات-متعددة-المبدأ-نفسه",text:"المثال الثاني: ملفات متعددة، المبدأ نفسه"},{depth:2,id:"نصيحة-احترافية-أضفه-إلى-سير-عملك",text:"نصيحة احترافية: أضفه إلى سير عملك"}],l=`<p>تخيّل هذا: كنت تعمل بجدّ على بعض الشيفرة، وتُجري تغييرات، وتتنقّل بين الملفات كبطل خارق مليء بالكافيين. ثم تأتي اللحظة المخيفة: وقت إعادة تشغيل الاختبارات. كلها. بلا استثناء.</p>
<p>مهلًا، ليس بهذه السرعة.</p>
<p>بدلًا من تشغيل مجموعة الاختبارات بأكملها، يمكنك أن تطلب من Vitest تشغيل الاختبارات المرتبطة فقط بالملفات التي كنت تعمل عليها. بهذه الطريقة توفّر على نفسك بعض الوقت الذي تضيّعه في بناء كامل لمجرد اختبار دالة صغيرة مزعجة. لنفكّك الأمر إلى خطوات بحجم اللقمة.</p>
<h2 id="الأمر-vitest-related">الأمر: <code>vitest related</code></h2>
<p>يوفّر Vitest ميزة مفيدة جدًا تُسمّى <code>vitest related</code>. وكما يوحي الاسم، فهو يشغّل الاختبارات <strong>المرتبطة بالتغييرات الأخيرة التي أجريتها</strong>. لذا إن كنت غارقًا في مشروع وأجريت بعض التغييرات على ملف معيّن، يمكنك ببساطة تشغيل الاختبارات المرتبطة بذلك الملف تحديدًا.</p>
<p>إليك كيفية استخدامه:</p>
<pre><code class="language-bash">npx vitest related path/to/your/file.js
</code></pre>
<p>أجل، الأمر بهذه البساطة. تُوجّه <code>vitest related</code> إلى ملفاتك المتغيّرة، ويتولى Vitest الباقي. يشغّل تلقائيًا الاختبارات المتأثرة بالملفات التي غيّرتها. لا مزيد من الانتظار لعدد لا يُحصى من الاختبارات الأخرى غير المرتبطة بتغييرك الحالي.</p>
<p>لكن لنفكّك سيناريوهين يكون فيهما هذا مفيدًا للغاية.</p>
<h2 id="المثال-الأول-كنت-تعدل-دالة-واحدة-في-ملف-واحد">المثال الأول: كنت تعدّل دالة واحدة في ملف واحد</h2>
<p>لنفترض أن لدينا دالة بسيطة تُجري بعض التعديلات في <code>mathUtils.js</code>. إليك الشيفرة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// mathUtils.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">addNumbers</span> = (<span class="hljs-params">a, b</span>) =&gt; a + b;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">subtractNumbers</span> = (<span class="hljs-params">a, b</span>) =&gt; a - b;
</code></pre>
<p>ولدينا بعض الاختبارات في <code>mathUtils.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// mathUtils.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { addNumbers, subtractNumbers } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./mathUtils&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;mathUtils&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should add numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">addNumbers</span>(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">4</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should subtract numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">subtractNumbers</span>(<span class="hljs-number">2</span>, <span class="hljs-number">1</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">1</span>);
  });
});
</code></pre>
<p>تُجري بعض التعديلات على <code>mathUtils.js</code>، ولنقل إنك تعيد التفكير في مسألة «طرح الأعداد» برمّتها لأن الطرح فوضوي (اسأل أي شخص يحاول موازنة الدفاتر…). تعدّل منطق الدالة.</p>
<p>بدلًا من تشغيل <strong>كل اختبار على حدة</strong> في تطبيقك، تمرّر فقط الملف الذي كنت تعدّله:</p>
<pre><code class="language-bash">npx vitest related src/utils/mathUtils.js
</code></pre>
<p>هذا كل شيء. ينظر Vitest في ذلك الملف، ويكتشف الاختبارات المقابلة له (<code>mathUtils.test.js</code>)، ويشغّل تلك فقط.</p>
<p>جميل، أليس كذلك؟</p>
<h2 id="المثال-الثاني-ملفات-متعددة-المبدأ-نفسه">المثال الثاني: ملفات متعددة، المبدأ نفسه</h2>
<p>الآن لننعطف إلى موقف أعقد قليلًا. ربما تعمل على ملفات متعددة: مساعدات، ومكوّنات، وكل ما في الحزمة. وتريد التأكد من أن تغييراتك جيدة دون تشغيل كل شيء.</p>
<p>سهل. فقط غذّه بكل الملفات التي عبثت بها:</p>
<pre><code class="language-bash">npx vitest related src/utils/mathUtils.js src/components/Button.js
</code></pre>
<p>سيبحث Vitest عن أي اختبارات مرتبطة بالملفات المعطاة ويشغّل تلك نيابةً عنك. لا انتظار بلا داعٍ، ولا مشاهدة لكل الاختبارات غير ذات الصلة تنجح.</p>
<h2 id="نصيحة-احترافية-أضفه-إلى-سير-عملك">نصيحة احترافية: أضفه إلى سير عملك</h2>
<p>هذا مثالي للحظات «عفوًا» التي لا تكون فيها متأكدًا إن كنت قد كسرت شيئًا للتوّ، لكنك لا تريد أن تخوض كل الاختبارات. إنه إضافة لطيفة إلى عملية ما قبل الإيداع، أو حتى موصولًا بمراحل CI/CD إن كنت بهذا الترف (أحسدك على روعتك).</p>
<p>لنجمع كل شيء، <strong><code>vitest related</code></strong> هو تذكرتك لتشغيل اختبارات سريع وفعّال بناءً على ما تلمسه حاليًا في الشيفرة. إنه بلا ألم، ويوفّر وقتًا هائلًا، ويُبقيك في حالة تدفّق دون أن تكسر مكابح مجموعة الاختبارات الكاملة. والأفضل؟ إنه يمنحك شعورًا جيدًا. كارتشاف قهوة طازجة بعد إدراك أن اختباراتك تنجح فعلًا.</p>
<p>حان وقت وضع هذه المعرفة موضع العمل! أبقِ اختباراتك مركّزة وسريعة، وتذكّر: مجرد أنك <em>تستطيع</em> تشغيل المجموعة بأكملها لا يعني دائمًا أنه <em>ينبغي</em> عليك ذلك.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,c as default,p as headings,l as html,a as slug,e as title};
