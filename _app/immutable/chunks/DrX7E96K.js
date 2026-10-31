const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="testing-promises",l="اختبار الوعود (Promises)",e=[{depth:2,id:"لماذا-نختبر-الوعود",text:"لماذا نختبر الوعود؟"},{depth:2,id:"الاختبار-الأساسي-للوعود-المحلولة",text:"الاختبار الأساسي للوعود المحلولة"},{depth:2,id:"اختبار-الوعود-المرفوضة",text:"اختبار الوعود المرفوضة"},{depth:2,id:"استخدام-resolves-وrejects",text:"استخدام .resolves و.rejects"},{depth:3,id:"اختبار-الوعود-المحلولة",text:"اختبار الوعود المحلولة"},{depth:3,id:"اختبار-الوعود-المرفوضة-1",text:"اختبار الوعود المرفوضة"},{depth:2,id:"اختبار-الدوال-غير-المتزامنة-باستخدام-البدائل-المحاكاة",text:"اختبار الدوال غير المتزامنة باستخدام البدائل المُحاكاة"},{depth:2,id:"اختبار-وعود-متعددة-باستخدام-promiseall",text:"اختبار وعود متعددة باستخدام Promise.all"},{depth:2,id:"التعامل-مع-المهلات-غير-المتزامنة-في-اختبارات-الوعود",text:"التعامل مع المهلات غير المتزامنة في اختبارات الوعود"},{depth:2,id:"ملخص-سريع",text:"ملخّص سريع"}],p=`<p><em>يمكنك</em> استخدام الاستراتيجيات من <a href="https://stevekinney.com/courses/testing/testing-asynchronous-code">اختبار الشيفرة غير المتزامنة</a>، لكن دعنا نتعمّق قليلًا أكثر في الوعود (promises) تحديدًا.</p>
<h2 id="لماذا-نختبر-الوعود">لماذا نختبر الوعود؟</h2>
<ul>
<li><strong>ضمان السلوك غير المتزامن الصحيح</strong>: يساعد اختبار الوعود في ضمان أن شيفرتك تتعامل مع العمليات غير المتزامنة بشكل صحيح، مثل انتظار البيانات قبل المتابعة أو التقاط الأخطاء.</li>
<li><strong>محاكاة سيناريوهات النجاح والفشل</strong>: باختبار الوعود المحلولة والمرفوضة معًا، يمكنك التحقق من أن شيفرتك تعمل في كل الحالات الممكنة، بما فيها معالجة الأخطاء بلطف.</li>
<li><strong>منع الإخفاقات الصامتة</strong>: دون اختبار مناسب، قد تؤدي الإخفاقات الصامتة في الشيفرة غير المتزامنة إلى أخطاء يصعب تتبّعها وتنقيحها.</li>
</ul>
<h2 id="الاختبار-الأساسي-للوعود-المحلولة">الاختبار الأساسي للوعود المحلولة</h2>
<p>عندما يُحلّ وعد بنجاح، تريد التحقق من أن القيمة المُعادة تطابق ما تتوقعه. في Vitest، يتم ذلك عادةً باستخدام <code>async</code> و<code>await</code> أو بإعادة الوعد مباشرة من دالة الاختبار.</p>
<p>إليك مثالًا لاختبار دالة تعيد وعدًا محلولًا:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function to be tested</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchBandData</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">name</span>: bandName, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> });
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchBandData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return band data when the promise resolves&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Call the function</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchBandData</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Assert that the promise resolved with the correct value</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> });
  });
});
</code></pre>
<p>في هذا المثال، تعيد دالة <code>fetchBandData</code> وعدًا يُحلّ ببيانات الفرقة الموسيقية. وباستخدام <code>await</code> ننتظر حلّ الوعد ثم نتحقق من أن النتيجة صحيحة.</p>
<h2 id="اختبار-الوعود-المرفوضة">اختبار الوعود المرفوضة</h2>
<p>إضافةً إلى اختبار حلول الوعود الناجحة، لا يقل أهمية اختبار كيفية تعامل شيفرتك مع رفض الوعود (الأخطاء). يتيح لك Vitest اختبار الوعود المرفوضة باستخدام كتل <code>try/catch</code> أو <code>.rejects</code> في تحققاتك.</p>
<p>إليك كيفية اختبار وعد مرفوض:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function to be tested</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchBandDataWithError</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Band not found&#x27;</span>));
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchBandDataWithError&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error when the promise rejects&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Assert that the promise rejects with an error</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchBandDataWithError</span>(<span class="hljs-string">&#x27;Unknown Band&#x27;</span>)).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Band not found&#x27;</span>);
  });
});
</code></pre>
<p>في هذا الاختبار، من المتوقع أن يُرفض الوعد بخطأ، ويضمن <code>expect(…).rejects.toThrow()</code> أن الرفض يُلتقط ويُعالج بشكل صحيح.</p>
<h2 id="استخدام-resolves-وrejects">استخدام <code>.resolves</code> و<code>.rejects</code></h2>
<p>يوفر Vitest مطابقات مريحة <code>.resolves</code> و<code>.rejects</code> لاختبار الوعود مباشرة دون الحاجة إلى <code>async/await</code>. تتيح لك هذه المطابقات كتابة اختبارات أكثر إيجازًا وقابلية للقراءة لسيناريوهات الوعود الناجحة والفاشلة معًا.</p>
<h3 id="اختبار-الوعود-المحلولة">اختبار الوعود المحلولة</h3>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchBandData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should resolve with band data&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test promise resolution using .resolves</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchBandData</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>)).<span class="hljs-property">resolves</span>.<span class="hljs-title function_">toEqual</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>,
      <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span>,
    });
  });
});
</code></pre>
<p>في هذا المثال، يتحقق الاختبار من أن الوعد يُحلّ بالبيانات المتوقعة باستخدام <code>.resolves.toEqual()</code>.</p>
<h3 id="اختبار-الوعود-المرفوضة-1">اختبار الوعود المرفوضة</h3>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchBandDataWithError&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should reject with an error&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test promise rejection using .rejects</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchBandDataWithError</span>(<span class="hljs-string">&#x27;Unknown Band&#x27;</span>)).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Band not found&#x27;</span>);
  });
});
</code></pre>
<p>هنا يُستخدم <code>.rejects.toThrow()</code> للتحقق من أن الوعد مرفوض برسالة خطأ محدّدة.</p>
<h2 id="اختبار-الدوال-غير-المتزامنة-باستخدام-البدائل-المحاكاة">اختبار الدوال غير المتزامنة باستخدام البدائل المُحاكاة</h2>
<p>عندما تعتمد شيفرتك على خدمات خارجية غير متزامنة (مثل واجهات برمجة التطبيقات)، يمكنك استخدام بدائل مُحاكاة (mocks) لمحاكاة سلوكيات الوعود المختلفة — الحل والرفض معًا. هذا مفيد بشكل خاص عند اختبار دوال تعتمد على موارد خارجية دون إجراء طلبات فعلية.</p>
<p>إليك مثالًا يستخدم استدعاء واجهة برمجة تطبيقات مُحاكى:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Simulate an API module</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api&#x27;</span>;

<span class="hljs-comment">// Code under test</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getConcertDetails</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">fetchConcerts</span>(bandName);
  <span class="hljs-keyword">return</span> response.<span class="hljs-property">data</span>;
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;getConcertDetails&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Mock the API module</span>
  vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./api&#x27;</span>, <span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">fetchConcerts</span>: vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
      <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Wembley&#x27;</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">&#x27;2024-10-05&#x27;</span> }] }),
    ),
  }));

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return concert details from the mocked API&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Test with the mocked promise</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getConcertDetails</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Verify the result</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([{ <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Wembley&#x27;</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">&#x27;2024-10-05&#x27;</span> }]);
  });
});
</code></pre>
<p>في هذا الاختبار، تُحاكى دالة <code>api.fetchConcerts</code> لتعيد وعدًا محلولًا. ويمكنك بالمثل محاكاتها لتعيد وعدًا مرفوضًا واختبار مسار معالجة الأخطاء.</p>
<h2 id="اختبار-وعود-متعددة-باستخدام-promiseall">اختبار وعود متعددة باستخدام <code>Promise.all</code></h2>
<p>عند العمل مع وعود متعددة في شيفرتك، قد تحتاج إلى اختبارها مجتمعة باستخدام <code>Promise.all()</code>. في Vitest، يمكنك ضمان حلّ كل الوعود بشكل صحيح بانتظار <code>Promise.all</code> في اختباراتك.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function to be tested</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchMultipleBandData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
    <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> }),
    <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Nirvana&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Grunge&#x27;</span> }),
  ]);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchMultipleBandData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should resolve all promises with the correct data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Await all promises</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchMultipleBandData</span>();

    <span class="hljs-comment">// Verify the result of each promise</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Nirvana&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Grunge&#x27;</span> },
    ]);
  });
});
</code></pre>
<p>يوضح هذا المثال كيفية اختبار وعود متعددة، بما يضمن أن <code>Promise.all()</code> يُحلّ بالبيانات المتوقعة من الوعدين معًا.</p>
<h2 id="التعامل-مع-المهلات-غير-المتزامنة-في-اختبارات-الوعود">التعامل مع المهلات غير المتزامنة في اختبارات الوعود</h2>
<p>أحيانًا قد تتضمن وعودك تأخيرات باستخدام <code>setTimeout</code> أو عمليات غير متزامنة مشابهة. في هذه الحالات، يمكن أن تساعدك <code>vi.useFakeTimers()</code> في Vitest على محاكاة مرور الوقت دون انتظار المهلة الحقيقية.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function that returns a delayed promise</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">delayedBandData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> });
    }, <span class="hljs-number">3000</span>);
  });
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;delayedBandData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should resolve the promise after a delay&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Use fake timers to control time</span>
    vi.<span class="hljs-title function_">useFakeTimers</span>();

    <span class="hljs-comment">// Call the function (but do not await yet)</span>
    <span class="hljs-keyword">const</span> promise = <span class="hljs-title function_">delayedBandData</span>();

    <span class="hljs-comment">// Fast-forward time</span>
    vi.<span class="hljs-title function_">advanceTimersByTime</span>(<span class="hljs-number">3000</span>);

    <span class="hljs-comment">// Now await the promise resolution</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> promise;

    <span class="hljs-comment">// Verify the resolved data</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> });
  });
});
</code></pre>
<p>في هذا المثال، تتيح لنا <code>vi.useFakeTimers()</code> محاكاة تأخير الثلاث ثوانٍ في الوعد دون انتظار مرور الوقت الحقيقي.</p>
<h2 id="ملخص-سريع">ملخّص سريع</h2>
<p>يُعدّ اختبار الوعود في Vitest ضروريًا لضمان أن شيفرتك غير المتزامنة تتصرف كما هو متوقع. سواء كنت تختبر وعودًا محلولة أو وعودًا مرفوضة أو تتعامل مع عمليات غير متزامنة متعددة، يوفّر Vitest أدوات واضحة وفعّالة مثل <code>async/await</code> و<code>.resolves</code> و<code>.rejects</code> والدوال المُحاكاة. إضافةً إلى ذلك، يضمن استخدام المؤقتات الوهمية للمهلات أن تبقى الاختبارات سريعة وموثوقة. باختبار الوعود اختبارًا كاملًا، يمكنك التقاط الحالات الحدّية، ومعالجة الأخطاء بشكل صحيح، وبناء تطبيقات أكثر متانة.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
