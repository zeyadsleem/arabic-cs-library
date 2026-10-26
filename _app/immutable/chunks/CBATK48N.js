const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="testing-asynchronous-errors",e="اختبار الأخطاء غير المتزامنة",c=[{depth:2,id:"استخدام-asyncawait-لاختبار-الأخطاء-المرفوضة",text:"استخدام async/await لاختبار الأخطاء المرفوضة"},{depth:2,id:"استخدام-rejects-لمعالجة-الأخطاء-القائمة-على-الوعود",text:"استخدام .rejects لمعالجة الأخطاء القائمة على الوعود"}],l=`<p>عند العمل مع دوال غير متزامنة ترمي أخطاء، تحتاج إلى التعامل مع الوعود (promises) والأخطاء المرفوضة. في Vitest، يمكنك اختبار معالجة الأخطاء غير المتزامنة باستخدام <code>async/await</code> أو مطابق <code>.rejects</code> للوعود.</p>
<h2 id="استخدام-asyncawait-لاختبار-الأخطاء-المرفوضة">استخدام <code>async/await</code> لاختبار الأخطاء المرفوضة</h2>
<pre><code class="language-javascript"><span class="hljs-comment">// Asynchronous function to be tested</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error when the promise is rejected&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Use try/catch to verify the error thrown by the asynchronous function</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchData</span>()).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>);
  });
});
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li>ترمي دالة <code>fetchData</code> خطأً بشكل غير متزامن (داخل وعد مرفوض).</li>
<li>يستخدم الاختبار <code>await expect(fetchData()).rejects.toThrow('Network error')</code> للتحقق من أن الخطأ يُرمى بشكل صحيح ويطابق الرسالة المتوقعة.</li>
</ul>
<h2 id="استخدام-rejects-لمعالجة-الأخطاء-القائمة-على-الوعود">استخدام <code>.rejects</code> لمعالجة الأخطاء القائمة على الوعود</h2>
<p>يوفر Vitest مطابق <code>.rejects</code> لاختبار ما إذا كان وعد ما مرفوضًا بخطأ. هذه طريقة موجزة لفحص الأخطاء غير المتزامنة دون الحاجة إلى كتل <code>try/catch</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Asynchronous function to be tested</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>));
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchUserData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should reject with an error&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test that the promise rejects with the correct error message</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchUserData</span>()).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>);
  });
});
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li>تعيد <code>fetchUserData()</code> وعدًا مرفوضًا.</li>
<li>يتحقق الاختبار من أن الوعد مرفوض وأن رسالة الخطأ تطابق <code>'User not found'</code>.</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:c,html:l};export{s as book,n as chapter,a as chapterTitle,p as default,c as headings,l as html,t as slug,e as title};
