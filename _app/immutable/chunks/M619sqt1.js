const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="mocking-environment-variables",t="محاكاة متغيرات البيئة (Mocking Environment Variables)",p=[],c=`<p>ربما تريد التأكد من أن شيفرتك تتصرف كما هو متوقع في ظل متغيرات بيئة مختلفة. يمكنك أن تتفنن كثيرًا في طريقة تصفية اختباراتك — أو يمكنك ببساطة محاكاة متغيرات البيئة تلك لبرهة.</p>
<p>تأمل هذا المثال في <code>examples/logjam/src/log.test.js</code>.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;development&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    vi.<span class="hljs-title function_">stubEnv</span>(<span class="hljs-string">&#x27;MODE&#x27;</span>, <span class="hljs-string">&#x27;development&#x27;</span>);
  });

  <span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
    vi.<span class="hljs-title function_">restoreAllMocks</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;logs to the console in development mode&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> spy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;log&#x27;</span>);

    <span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);

    <span class="hljs-title function_">expect</span>(spy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);
  });
});
</code></pre>
<p>الأهم من ذلك، أننا نريد على الأرجح التأكد من أنها <em>لا</em> تسجّل في الإنتاج.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;production&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    vi.<span class="hljs-title function_">stubEnv</span>(<span class="hljs-string">&#x27;MODE&#x27;</span>, <span class="hljs-string">&#x27;production&#x27;</span>);
  });

  <span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
    vi.<span class="hljs-title function_">restoreAllMocks</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;does not log to the console in production mode&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> spy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;log&#x27;</span>);

    <span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);

    <span class="hljs-title function_">expect</span>(spy).<span class="hljs-property">not</span>.<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);
  });
});
</code></pre>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
