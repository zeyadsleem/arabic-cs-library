const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="testing-local-storage",l="اختبار التخزين المحلي",e=[{depth:2,id:"مرة-أخرى-مع-بعض-التفاعل-مع-dom",text:"مرة أخرى: مع بعض التفاعل مع DOM"}],p=`<p>لنفترض أن لدينا شيفرة تلمس <code>localStorage</code>. عادةً تعمل اختباراتنا في Node، لكن <code>localStorage</code> ليست في Node. صحيح أننا <em>نستطيع</em> استخدام <a href="https://stevekinney.com/courses/testing/mocks">البدائل المُحاكاة</a> أو <a href="https://stevekinney.com/courses/testing/stubs">البدائل</a>، لكن يمكننا أيضًا أن نحاكي بيئة المتصفح فحسب.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should properly assign to localStorage&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> key = <span class="hljs-string">&#x27;secret&#x27;</span>;
  <span class="hljs-keyword">const</span> message = <span class="hljs-string">&quot;It&#x27;s a secret to everybody.&quot;</span>;

  <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(key, message);
  <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(key)).<span class="hljs-title function_">toBe</span>(message);
});
</code></pre>
<h2 id="مرة-أخرى-مع-بعض-التفاعل-مع-dom">مرة أخرى: مع بعض التفاعل مع DOM</h2>
<p>تأمّل هذه الدالة التي تُنشئ بعض العناصر لتخزين سرّ في <code>localStorage</code>. يمكنك العثور على هذا المثال في <code>examples/element-factory/src/secret-input.js</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createSecretInput</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> id = <span class="hljs-string">&#x27;secret-input&#x27;</span>;

  <span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>);
  <span class="hljs-keyword">const</span> input = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;input&#x27;</span>);
  <span class="hljs-keyword">const</span> label = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;label&#x27;</span>);
  <span class="hljs-keyword">const</span> button = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;button&#x27;</span>);

  input.<span class="hljs-property">id</span> = id;
  input.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;password&#x27;</span>;
  input.<span class="hljs-property">placeholder</span> = <span class="hljs-string">&#x27;Enter your secret…&#x27;</span>;

  label.<span class="hljs-property">htmlFor</span> = id;
  label.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;Secret&#x27;</span>;

  button.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;Store Secret&#x27;</span>;
  button.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;secret&#x27;</span>, input.<span class="hljs-property">value</span>);
    input.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;&#x27;</span>;
  });

  container.<span class="hljs-title function_">appendChild</span>(label);
  container.<span class="hljs-title function_">appendChild</span>(input);
  container.<span class="hljs-title function_">appendChild</span>(button);

  <span class="hljs-keyword">return</span> container;
}
</code></pre>
<p>يمكننا كتابة الاختبارات التالية للتحقّق من أنها تفعل ما نعتقد أنه ينبغي أن تفعله. ألقِ نظرة على <code>examples/element-factory/src/secret-input.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, expect, it, beforeEach } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { createSecretInput } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./secret-input.js&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;createSecretInput&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">clear</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should store the value in localStorage&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> secretInput = <span class="hljs-title function_">createSecretInput</span>();
    <span class="hljs-keyword">const</span> input = secretInput.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;input&#x27;</span>);
    <span class="hljs-keyword">const</span> button = secretInput.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;button&#x27;</span>);

    input.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;my secret&#x27;</span>;
    button.<span class="hljs-title function_">click</span>();

    <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;secret&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;my secret&#x27;</span>);
  });
});
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
