const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="testing-function-arguments",t="التجسس على وسائط الدوال (Spying on Function Arguments)",c=[{depth:2,id:"لماذا-نتحقق-من-وسائط-الدوال",text:"لماذا نتحقق من وسائط الدوال؟"},{depth:2,id:"استخدام-الجواسيس-للتحقق-من-وسائط-الدوال",text:"استخدام الجواسيس للتحقق من وسائط الدوال"},{depth:2,id:"استخدام-البدائل-المحاكاة-للتحقق-من-وسائط-الدوال",text:"استخدام البدائل المُحاكاة للتحقق من وسائط الدوال"},{depth:2,id:"التحقق-من-استدعاءات-ووسائط-متعددة",text:"التحقق من استدعاءات ووسائط متعددة"},{depth:2,id:"التحقق-من-وسائط-الدوال-غير-المتزامنة",text:"التحقق من وسائط الدوال غير المتزامنة"},{depth:2,id:"الوصول-إلى-وسائط-محددة-باستخدام-mockcalls",text:"الوصول إلى وسائط محددة باستخدام mock.calls"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>في اختبار الوحدات، من المهام الأساسية التحقق من أن الدوال تُستدعى بالوسائط الصحيحة. يضمن ذلك أن تمر شيفرتك البيانات الصحيحة عبر النظام وأن تتفاعل مع الاعتماديات بالطريقة المتوقعة. يوفر Vitest أدوات قوية للتحقق من الوسائط الممرَّرة إلى دالة، سواء باستخدام الجواسيس (spies) أو البدائل المُحاكاة (mocks).</p>
<h2 id="لماذا-نتحقق-من-وسائط-الدوال">لماذا نتحقق من وسائط الدوال؟</h2>
<ul>
<li><strong>التحقق من تدفق البيانات الصحيح</strong>: ضمان أن دوالك تستقبل وتمرر الوسائط الصحيحة في كل مرحلة.</li>
<li><strong>اختبار الدوال المرجعة (callbacks)</strong>: التحقق من أن الدوال المرجعة تُستدعى بالبيانات الصحيحة، خصوصًا في الشيفرة غير المتزامنة.</li>
<li><strong>ضمان الاستخدام الصحيح للخدمات الخارجية</strong>: عندما تتفاعل شيفرتك مع واجهات برمجة التطبيقات (APIs) أو قواعد البيانات أو الخدمات الخارجية، فإن التحقق من الوسائط يضمن تكاملًا سليمًا.</li>
</ul>
<h2 id="استخدام-الجواسيس-للتحقق-من-وسائط-الدوال">استخدام الجواسيس للتحقق من وسائط الدوال</h2>
<p><a href="https://stevekinney.com/courses/testing/spies">الجواسيس</a> في Vitest يمكنها تتبع كيفية استدعاء دالة، بما في ذلك الوسائط الممرَّرة إليها. يتيح لك التابع <code>vi.spyOn()</code> مراقبة الدوال الموجودة والتحقق من وسائطها دون تعديل سلوكها.</p>
<p>إليك كيف تُنشئ جاسوسًا وتتحقق من الوسائط. لنلقِ نظرة على <code>examples/logjam/src/log.test.js</code>.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;logger&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;logs to the console in development mode&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> spy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;log&#x27;</span>);

    <span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);

    <span class="hljs-title function_">expect</span>(spy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);

    spy.<span class="hljs-title function_">mockRestore</span>();
  });
});
</code></pre>
<p>في هذا المثال، يتتبع <code>spy</code> الاستدعاءات إلى <code>console.log</code>. يتحقق التعبير <code>expect(spy).toHaveBeenCalledWith('Hello, world!')</code> من أن الدالة استُدعيت بالوسيط الصحيح.</p>
<h2 id="استخدام-البدائل-المحاكاة-للتحقق-من-وسائط-الدوال">استخدام البدائل المُحاكاة للتحقق من وسائط الدوال</h2>
<p><a href="https://stevekinney.com/courses/testing/mocks">البدائل المُحاكاة</a> يمكن استخدامها أيضًا للتحقق من الوسائط التي مُرّرت إلى دالة. عندما تُنشئ بديلًا مُحاكى بـ <code>vi.fn()</code>، يتتبع Vitest تلقائيًا الوسائط الممرَّرة إلى البديل، ما يتيح لك التحقق منها لاحقًا.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Create a mock function</span>
<span class="hljs-keyword">const</span> mockFn = vi.<span class="hljs-title function_">fn</span>();

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;mock function argument checking&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should be called with the correct arguments&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Call the mock function with some arguments</span>
    <span class="hljs-title function_">mockFn</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-string">&#x27;American Idiot&#x27;</span>);

    <span class="hljs-comment">// Check the arguments passed to the mock function</span>
    <span class="hljs-title function_">expect</span>(mockFn).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-string">&#x27;American Idiot&#x27;</span>);
  });
});
</code></pre>
<p>هنا، يُستدعى <code>mockFn</code> بوسيطين، ويتحقق <code>expect(mockFn).toHaveBeenCalledWith('Green Day', 'American Idiot')</code> من أن البديل استُدعي بالبيانات الصحيحة.</p>
<h2 id="التحقق-من-استدعاءات-ووسائط-متعددة">التحقق من استدعاءات ووسائط متعددة</h2>
<p>يتيح لك Vitest التحقق من الوسائط الممرَّرة إلى دالة عبر استدعاءات متعددة. تخزّن مصفوفة <code>mock.calls</code> الوسائط الممرَّرة إلى البديل في كل استدعاء، ما يسهّل التحقق من تفاعلات متعددة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> mockFn = vi.<span class="hljs-title function_">fn</span>();

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;checking multiple calls&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should track all the arguments for multiple calls&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Call the mock function multiple times with different arguments</span>
    <span class="hljs-title function_">mockFn</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-string">&#x27;Dookie&#x27;</span>);
    <span class="hljs-title function_">mockFn</span>(<span class="hljs-string">&#x27;Nirvana&#x27;</span>, <span class="hljs-string">&#x27;Nevermind&#x27;</span>);

    <span class="hljs-comment">// Check arguments of the first call</span>
    <span class="hljs-title function_">expect</span>(mockFn).<span class="hljs-title function_">toHaveBeenNthCalledWith</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-string">&#x27;Dookie&#x27;</span>);

    <span class="hljs-comment">// Check arguments of the second call</span>
    <span class="hljs-title function_">expect</span>(mockFn).<span class="hljs-title function_">toHaveBeenNthCalledWith</span>(<span class="hljs-number">2</span>, <span class="hljs-string">&#x27;Nirvana&#x27;</span>, <span class="hljs-string">&#x27;Nevermind&#x27;</span>);
  });
});
</code></pre>
<p>تتحقق الدالة <code>toHaveBeenNthCalledWith()</code> من وسائط الاستدعاء الأول والاستدعاء الثاني بشكل منفصل، بما يضمن أن كل استدعاء تلقى المعاملات الصحيحة.</p>
<h2 id="التحقق-من-وسائط-الدوال-غير-المتزامنة">التحقق من وسائط الدوال غير المتزامنة</h2>
<p>عند التعامل مع شيفرة غير متزامنة، من المهم ضمان تمرير الوسائط الصحيحة إلى الدوال عند التعامل مع الوعود (promises) أو الدوال المرجعة. يمكن لجواسيس Vitest وبدائله المُحاكاة التعامل مع الدوال غير المتزامنة أيضًا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchBandData</span>(<span class="hljs-params">bandName, callback</span>) {
  <span class="hljs-comment">// Simulate an async operation</span>
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">100</span>));
  <span class="hljs-title function_">callback</span>(<span class="hljs-string">\`<span class="hljs-subst">\${bandName}</span> data\`</span>);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchBandData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should call the callback with the correct data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Create a mock callback</span>
    <span class="hljs-keyword">const</span> callback = vi.<span class="hljs-title function_">fn</span>();

    <span class="hljs-comment">// Call the async function with the mock callback</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchBandData</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>, callback);

    <span class="hljs-comment">// Verify that the callback was called with the correct argument</span>
    <span class="hljs-title function_">expect</span>(callback).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Green Day data&#x27;</span>);
  });
});
</code></pre>
<p>في هذا المثال، يُمرَّر البديل المُحاكى <code>callback</code> إلى دالة غير متزامنة. يتحقق الاختبار من أن الدالة المرجعة استُدعيت بالوسيط الصحيح بعد اكتمال العملية غير المتزامنة.</p>
<h2 id="الوصول-إلى-وسائط-محددة-باستخدام-mockcalls">الوصول إلى وسائط محددة باستخدام <code>mock.calls</code></h2>
<p>في بعض الحالات، قد تحتاج إلى الوصول يدويًا إلى الوسائط الممرَّرة إلى دالة في كل استدعاء. يخزّن Vitest وسائط كل استدعاء في مصفوفة <code>mock.calls</code>، ما يتيح لك فحصها أو التحقق منها مباشرة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> mockFn = vi.<span class="hljs-title function_">fn</span>();

<span class="hljs-title function_">mockFn</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-string">&#x27;Dookie&#x27;</span>);
<span class="hljs-title function_">mockFn</span>(<span class="hljs-string">&#x27;Blink-182&#x27;</span>, <span class="hljs-string">&#x27;Enema of the State&#x27;</span>);

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;accessing arguments manually&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should manually access arguments of each call&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Access the arguments of the first call</span>
    <span class="hljs-keyword">const</span> firstCallArgs = mockFn.<span class="hljs-property">mock</span>.<span class="hljs-property">calls</span>[<span class="hljs-number">0</span>];
    <span class="hljs-title function_">expect</span>(firstCallArgs).<span class="hljs-title function_">toEqual</span>([<span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-string">&#x27;Dookie&#x27;</span>]);

    <span class="hljs-comment">// Access the arguments of the second call</span>
    <span class="hljs-keyword">const</span> secondCallArgs = mockFn.<span class="hljs-property">mock</span>.<span class="hljs-property">calls</span>[<span class="hljs-number">1</span>];
    <span class="hljs-title function_">expect</span>(secondCallArgs).<span class="hljs-title function_">toEqual</span>([<span class="hljs-string">&#x27;Blink-182&#x27;</span>, <span class="hljs-string">&#x27;Enema of the State&#x27;</span>]);
  });
});
</code></pre>
<p>يوضح هذا المثال كيف يمكنك فحص مصفوفة <code>mock.calls</code> يدويًا للوصول إلى الوسائط الممرَّرة إلى كل استدعاء. كل مدخل في <code>mock.calls</code> يقابل مصفوفة وسائط من استدعاء واحد للدالة.</p>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>التحقق من الوسائط الممرَّرة إلى دالة جزء بالغ الأهمية من التأكد من أن شيفرتك تتصرف بشكل صحيح في اختبارات الوحدات. سواء استخدمت الجواسيس لمراقبة دوال حقيقية أو البدائل المُحاكاة لمحاكاتها، يوفر Vitest أدوات قوية مثل <code>toHaveBeenCalledWith()</code> و<code>toHaveBeenNthCalledWith()</code> و<code>mock.calls</code> للتحقق من الوسائط الممرَّرة أثناء التنفيذ. تتيح لك هذه الإمكانات اختبار أن شيفرتك تمرر البيانات الصحيحة إلى الأماكن الصحيحة بثقة.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:c,html:e};export{s as book,n as chapter,a as chapterTitle,p as default,c as headings,e as html,l as slug,t as title};
