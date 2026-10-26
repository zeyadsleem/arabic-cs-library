const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="testing-for-errors-exercise",c="اختبار القسمة على صفر في JavaScript",p=[{depth:2,id:"الخطوة-1-اكتب-الاختبار-الأحمر",text:"الخطوة 1: اكتب الاختبار (الأحمر)"},{depth:2,id:"الخطوة-2-شغل-الاختبار-وشاهده-يفشل",text:"الخطوة 2: شغّل الاختبار وشاهده يفشل"},{depth:2,id:"الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-الأخضر",text:"الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)"},{depth:2,id:"الخطوة-4-شغل-الاختبار-مرة-أخرى",text:"الخطوة 4: شغّل الاختبار مرة أخرى"},{depth:2,id:"تمرين",text:"تمرين"},{depth:3,id:"مقابل-مع-النصوص-والأعداد",text:"+ مقابل - مع النصوص والأعداد"},{depth:3,id:"الوسائط-المفقودة-تكون-undefined",text:"الوسائط المفقودة تكون undefined"}],t=`<p>للرياضيات قواعد. منها، مثلًا، أنه لا يُسمح لك بالقسمة على صفر. وJavaScript تصبح غريبة بشكل خاص في هذا الأمر. <code>5 / 0</code> تساوي <code>Infinity</code>. لا نريد ذلك. الغرض من مكتبة الأدوات المساعدة لدينا هو حمايتنا من بعض غرائب الأمور التي قد تظهر.</p>
<p>بدلًا من أن تعطينا أشياء مثل <code>Infinity</code> أو <code>NaN</code>، <em>نريد</em> أن ترمي مكتبتنا خطأً. وإن كنا نريد لشيفرتنا أن تفعل شيئًا، فمن المفترض أن نختبر أنها تفعل ما نريده، أليس كذلك؟</p>
<p>السؤال إذن: <strong>كيف نختبر للتأكد من أن شيفرتنا تنفجر في مواقف معيّنة</strong>؟</p>
<h2 id="الخطوة-1-اكتب-الاختبار-الأحمر">الخطوة 1: اكتب الاختبار (الأحمر)</h2>
<p>أضف اختبارًا للقسمة على صفر في <code>calculator.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/calculator.test.js</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;divide&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// … previous tests …</span>

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error when dividing by zero&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">divide</span>(<span class="hljs-number">5</span>, <span class="hljs-number">0</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Cannot divide by zero&#x27;</span>);
  });
});
</code></pre>
<h2 id="الخطوة-2-شغل-الاختبار-وشاهده-يفشل">الخطوة 2: شغّل الاختبار وشاهده يفشل</h2>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>يفشل الاختبار لأن الخطأ لا يُرمى.</p>
<h2 id="الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-الأخضر">الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h2>
<p>عدّل دالة <code>divide</code> في <code>calculator.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/calculator.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">divide</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">if</span> (b === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Cannot divide by zero&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> a / b;
}
</code></pre>
<h2 id="الخطوة-4-شغل-الاختبار-مرة-أخرى">الخطوة 4: شغّل الاختبار مرة أخرى</h2>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات، بما فيها اختبار القسمة على صفر.</p>
<h2 id="تمرين">تمرين</h2>
<p>اكتب بعض الاختبارات للغرائب الأخرى التالية. جرّب كم واحدًا منها تستطيع إضافته إلى مجموعة اختباراتك.</p>
<h3 id="مقابل-مع-النصوص-والأعداد"><code>+</code> مقابل <code>-</code> مع النصوص والأعداد</h3>
<p>عامل <code>+</code> يدمج النصوص، لكن <code>-</code> يعمل فقط للطرح مع الأعداد. لذا تحصل على نتائج مختلفة:</p>
<pre><code class="language-javascript"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">5</span> + <span class="hljs-string">&#x27;5&#x27;</span>); <span class="hljs-comment">// &quot;55&quot; (string concatenation)</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">5</span> - <span class="hljs-string">&#x27;5&#x27;</span>); <span class="hljs-comment">// 0 (subtraction)</span>
</code></pre>
<p><strong>خيارك</strong>: إما أن تكتب اختبارًا يضمن أن قيمتي <code>a</code> و<code>b</code> كلتيهما أعداد <em>أو</em> أن تكتب بعض الاختبارات التي تتحقق من تحويل النصوص إلى عدد. إن أسفر تحويل وسيط ما إلى نص عن <code>NaN</code>، فارمِ خطأً.</p>
<p>على سبيل المثال:</p>
<ul>
<li><code>add(5, '5')</code>: إما أن تكتب اختبارًا يرمي خطأً أو واحدًا يتحقق من أن <code>add</code> تعيد <code>10</code>.</li>
<li>لكن، مهما كان الأمر، فمن المفترض أن <code>add(5, 'hotdog')</code> ترمي خطأً.</li>
<li>افعل الشيء نفسه للطرح والضرب والقسمة.</li>
<li>بالنسبة للقسمة، تريد أن تتأكد من أن القسمة على النص <code>'0'</code> ترمي خطأً أيضًا.</li>
</ul>
<h3 id="الوسائط-المفقودة-تكون-undefined">الوسائط المفقودة تكون <code>undefined</code></h3>
<p>لسنا نستخدم TypeScript الآن. ليس مستبعدًا تمامًا أن ينادي أحدهم <code>add(5)</code>. ماذا ينبغي أن يحدث في هذه الحالة؟ هل ينبغي أن تجعل <code>b</code> تساوي <code>0</code> افتراضيًا؟ هل ينبغي أن ترمي خطأً؟ في كلتا الحالتين، من المفترض أن ترمي خطأً في حالة <code>divide</code>. اكتب بعض الاختبارات للتأكد من أن الأمر كذلك.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:e,title:c,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,t as html,e as slug,c as title};
