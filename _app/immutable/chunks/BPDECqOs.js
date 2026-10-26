const s="kinney",n="testing",t="مدخل إلى الاختبارات",a="basic-math",e="تنفيذ الاختبارات الأساسية",l=[{depth:3,id:"الحد-الأدنى-من-الكلام-عن-التطوير-المدفوع-بالاختبارات",text:"الحد الأدنى من الكلام عن التطوير المدفوع بالاختبارات"},{depth:2,id:"إعادة-الاقتراب-من-دالة-add",text:"إعادة الاقتراب من دالة add"}],c=`<p>اتّضح أن الرياضيات أكثر بكثير من مجرد جمع الأعداد. يريد منّا مدير المنتج أيضًا، على ما يبدو، أن نستطيع طرح الأعداد وضربها وقسمتها. حديث عن تضخّم الميزات.</p>
<p>سنركّز على كتابة دوال خالصة لعمليات الحساب ونستخدم Vitest لكتابة اختبارات الوحدة وتشغيلها. لن تكون هناك واجهة مستخدم؛ فالهدف هو التدرّب على مبادئ <a href="https://stevekinney.com/courses/testing/test-driven-development">التطوير المدفوع بالاختبارات</a> واختبار الوحدة.</p>
<p>سننفّذ دوال الآلة الحاسبة التالية:</p>
<ul>
<li><code>add(a, b)</code></li>
<li><code>subtract(a, b)</code></li>
<li><code>multiply(a, b)</code></li>
<li><code>divide(a, b)</code></li>
</ul>
<p>سنكون مواطنين صالحين ونبدأ بكتابة الاختبارات أولًا ثم ننطلق من هناك. لقد كتبنا دالة <code>add</code> بالفعل. لذا سنبدأ من دالة <code>subtract</code>.</p>
<p>هناك بعض الشيفرة الأساسية الجاهزة لك في <code>examples/basic-math</code> في <a href="https://github.com/stevekinney/introduction-to-testing">مستودع الأمثلة</a>.</p>
<h3 id="الحد-الأدنى-من-الكلام-عن-التطوير-المدفوع-بالاختبارات">الحد الأدنى من الكلام عن التطوير المدفوع بالاختبارات</h3>
<p>لا أُصرّ على أن تتبع التطوير المدفوع بالاختبارات. أنا شخصيًا لا أفعله كثيرًا من الوقت. لكنني أشعر نوعًا ما أن من مسؤوليتي أن أرشدك على الأقل عبر بعض الأمثلة الأساسية حتى تشعر بالراحة إن طُرح الموضوع في محادثة (أي في مقابلة عمل).</p>
<p>الفكرة بسيطة:</p>
<ol>
<li>ابدأ باختبار فاشل. الاختبارات الفاشلة تكون عادةً <strong>حمراء</strong>.</li>
<li>اجعل الاختبار ينجح. الاختبارات الناجحة تكون <strong>خضراء</strong>.</li>
<li>اختياريًا: أعد هيكلة الدالة—مع إبقاء تلك الاختبارات خضراء إن أمكن.</li>
</ol>
<p>هذا كل شيء. بسيط، أليس كذلك؟ ربما تتساءل حتى عن سبب الحاجة إلى وجود شيء كهذا أصلًا.</p>
<p>حسنًا، هذا في الغالب بسبب النمط الأكثر شيوعًا بكثير:</p>
<ol>
<li>اكتب الشيفرة.</li>
<li>اذهب لاختبارها.</li>
<li>أدرك حقًا أن الشيفرة التي كتبتها صعبة الاختبار نوعًا ما.</li>
<li>لا تختبرها.</li>
<li>تعامل مع العواقب.</li>
</ol>
<h2 id="إعادة-الاقتراب-من-دالة-add">إعادة الاقتراب من دالة <code>add</code></h2>
<p>إذن، قد أبدأ باختبار كهذا:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;add&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;adds two positive numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
  });
});
</code></pre>
<p>بعد ذلك، سأشغّل الاختبار وأشاهده ينفجر.</p>
<p>ثم أنتقل إلى <code>arithmetic.js</code> وأضيف تنفيذًا معقولًا في معظمه:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">add</span> = (<span class="hljs-params">a, b</span>) =&gt; a + b;
</code></pre>
<p>ثم أشاهده ينجح. الآن، لا توجد إعادة هيكلة كثيرة هنا، لكنك فهمت الفكرة.</p>
<blockquote>
<p><strong>تمرين</strong></p>
<p>حسنًا، كفى استماعًا إلى حديثي. هل يمكنك تنفيذ بقية دوال الرياضيات الأساسية في <code>examples/basic-math/src/arithmetic.test.js</code>؟ من المثالي أن تجرّب التطوير المدفوع بالاختبارات قليلًا. من ناحية، هذا التمرين <em>سهل جدًا</em>. ومن ناحية أخرى، ليس لديك عذر حقيقي لعدم القيام ببعض التطوير المدفوع بالاختبارات. إن احتجت يد المساعدة، يمكنك متابعة <a href="https://stevekinney.com/courses/testing/basic-math-exercise-walkthrough">هذا الشرح التفصيلي</a>.</p>
</blockquote>
`,p={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:l,html:c};export{s as book,n as chapter,t as chapterTitle,p as default,l as headings,c as html,a as slug,e as title};
