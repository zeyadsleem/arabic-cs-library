const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="testing-asynchronous-code",l="اختبار الشيفرة غير المتزامنة",e=[{depth:2,id:"استخدام-asyncawait",text:"استخدام async/await"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>كما هو الحال مع كل شيء تقريبًا في JavaScript، تجعل الشيفرة غير المتزامنة كل شيء أصعب. (<strong>حرق المفاجأة</strong>: لكن أيضًا—كما هو الحال مع كل شيء تقريبًا في JavaScript يتعلّق بالشيفرة غير المتزامنة، فإن <code>async</code>/<code>await</code> يميل إلى جعل ذلك الجزء الصعب أسهل.)</p>
<p>تأمّل هذا الاختبار للحظة:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Asynchronous code accidentally passes&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-literal">false</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  }, <span class="hljs-number">1</span>);
});
</code></pre>
<p>ليست المشكلة أن هذا الاختبار جيد بأي حال، بل إن التحقّق لا يُنفَّذ أبدًا.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Asynchronous code has zero expectations&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  expect.<span class="hljs-title function_">assertions</span>(<span class="hljs-number">0</span>);

  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-literal">false</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>بعبارة أخرى، يمكننا التأكيد على أن تحقّقنا لا… همم… <em>يتحقّق</em> أبدًا.</p>
<pre><code class="language-typescript">test.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;Code inside of callback never runs&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  expect.<span class="hljs-title function_">hasAssertions</span>();

  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-literal">false</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>في بعض الأطر، ستستطيع فعل شيء كهذا.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// 🚨 This will not work in Vitest.</span>

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Code inside of callback never runs&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">done</span>) =&gt;</span> {
  expect.<span class="hljs-title function_">hasAssertions</span>();

  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-literal">false</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-title function_">done</span>();
  }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>كما تقول التعليقات، هذا <em>لن</em> يعمل في Vitest. أذكره فقط لأن هذه الدورة ليست مخصّصة لـVitest—فتلك هي الأداة التي اخترنا استخدامها فحسب. على أي حال، ما يأتي هو <em>على الأرجح</em> ما تريده بالفعل.</p>
<h2 id="استخدام-asyncawait">استخدام <code>async</code>/<code>await</code></h2>
<p>لم نعد نعيش في عالم مليء بردود النداء. في هذه الأيام، تستخدم معظم شيفرتنا غير المتزامنة إمّا <code>async</code>/<code>await</code> أو—على الأقل—الوعود.</p>
<p>تأمّل الاختبارين التاليين:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">addAsync</span> = (<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span></span>) =&gt; <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(a + b);

it.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&quot;fails if you don&#x27;t use an async function&quot;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">addAsync</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);

  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;passes if use an \`async/await\`&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">addAsync</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>);

  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});
</code></pre>
<p>يفشل الاختبار الأول بالخطأ التالي:</p>
<pre><code class="language-diff"><span class="hljs-deletion">- Expected &quot;5&quot;</span>

<span class="hljs-addition">+ Received &quot;Promise {}&quot;</span>
</code></pre>
<blockquote>
<p><strong>العمل مع الوعود</strong></p>
<p>إذا كنت تعمل مع الوعود (Promises)، فإن <a href="https://stevekinney.com/courses/testing/testing-promises">لدى Vitest أيضًا بعض الوظائف الخاصة</a> التي يمكنك استخدامها اختياريًا.</p>
</blockquote>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/testing/testing-promises">اختبار الوعود</a></li>
<li><a href="https://stevekinney.com/courses/testing/testing-asynchronous-errors">اختبار الأخطاء غير المتزامنة</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
