const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="mocking-fetch-and-network-requests",e="محاكاة fetch وطلبات الشبكة (Mocking Fetch and Network Requests)",l=[{depth:2,id:"اكتب-دالة-لجلب-البيانات",text:"اكتب دالة لجلب البيانات"},{depth:2,id:"محاكاة-fetch-مع-vitest",text:"محاكاة fetch مع Vitest"},{depth:3,id:"هنا-يحدث-السحر",text:"هنا يحدث السحر"},{depth:2,id:"الخطوة-الرابعة-نظف-بعد-الاختبارات",text:"الخطوة الرابعة: نظّف بعد الاختبارات"},{depth:2,id:"حديث-صريح-اختبار-حالة-الخطأ",text:"حديث صريح: اختبار حالة الخطأ"},{depth:2,id:"خاتمة",text:"خاتمة"}],c=`<p>لنتحدث عن شيء عزيز على قلب كل مطوّر — التعامل مع <strong>طلبات الشبكة</strong> واختبارها. إذا كنت تعمل على تطبيق حتى <em>يستنشق</em> الإنترنت، فستحتاج إلى نداء واجهات برمجة التطبيقات، وفي النهاية ستحتاج إلى اختبار تلك الشيفرة. وعندما يحين ذلك الوقت، لا سبب لضرب واجهة برمجة التطبيقات فعليًا في كل مرة تشغّل فيها مجموعة اختباراتك — ففي النهاية، لن <em>نُغرق</em> خادم الواجهة بهجوم حرمان من الخدمة، أو الأسوأ: نجعل اختباراتك بطيئة للغاية. هنا يأتي دور <strong>محاكاة طلبات الشبكة</strong>، ولحسن الحظ فإن محاكاة <code>fetch</code> مع Vitest سهلة للغاية.</p>
<h2 id="اكتب-دالة-لجلب-البيانات">اكتب دالة لجلب البيانات</h2>
<p>لننشئ دالة أساسية تطلق نداء fetch في البرية وتعيد البيانات. سنبقي الأمور بسيطة باستخدام واجهة برمجة تطبيقات JSON placeholder.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos/1&#x27;</span>);
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">return</span> data;
}

<span class="hljs-keyword">export</span> { getData };
</code></pre>
<p>يبدو جيدًا. الآن إذا أردت اختبار هذه الدالة، فلا ينبغي لك فعليًا ضرب الواجهة الحقيقية في اختباراتك، لأنني أعدك… نداءات شبكة غير موثوقة في اختبارات CI عند الثالثة صباحًا؟ <em>ليست فكرة مستحبة.</em> ما نريده هو محاكاتها!</p>
<h2 id="محاكاة-fetch-مع-vitest">محاكاة fetch مع Vitest</h2>
<p>Vitest يدعمك عندما يتعلق الأمر بالمحاكاة. إليك التفاصيل: <code>fetch</code> متاحة على <code>window</code> في معظم البيئات. لذا عند المحاكاة، نخبر Vitest باستبدال <code>window.fetch</code> بنسختنا.</p>
<p>لنكتب اختبار Vitest بسيطًا سيحاكي <code>fetch</code>.</p>
<h3 id="هنا-يحدث-السحر">هنا يحدث السحر</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { test, vi, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { getData } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./yourFunctionFile&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;fetches data successfully from API&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-comment">// Mock the fetch function.</span>
  <span class="hljs-keyword">const</span> mockResponse = {
    <span class="hljs-attr">userId</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Test Todo&#x27;</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
  };

  <span class="hljs-comment">// Here we tell Vitest to mock fetch on the \`window\` object.</span>
  <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span> = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({
      <span class="hljs-attr">json</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(mockResponse),
    }),
  );

  <span class="hljs-comment">// Call the function and assert the result</span>
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getData</span>();
  <span class="hljs-title function_">expect</span>(data).<span class="hljs-title function_">toEqual</span>(mockResponse);

  <span class="hljs-comment">// Check that fetch was called exactly once</span>
  <span class="hljs-title function_">expect</span>(fetch).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);
  <span class="hljs-title function_">expect</span>(fetch).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos/1&#x27;</span>);
});
</code></pre>
<p>بوم! هذا كل شيء. لنمر على هذا سريعًا لأنك قد تفكر «أي سحر هذا؟»</p>
<ul>
<li><code>vi.fn()</code> هي دالة المحاكاة في Vitest. أنت تحاكي <code>fetch</code>، وتجعلها تعيد بالضبط ما نريد — في هذه الحالة، نحل الوعد بـ <code>mockResponse</code>.</li>
<li><code>global.fetch</code> هو المكان الذي نحاكي فيه دالة fetch لأن <code>fetch</code> في Node ليست متاحة عالميًا تلقائيًا كما في المتصفح.</li>
<li>أنت تتحقق من أن <code>fetch</code> تُستدعى مرة واحدة وبعنوان URL الصحيح. ستنام هادئًا في الليل وأنت تعرف أن شيفرتك تصرخ في الفراغ بالضبط كما ينبغي ومتى ينبغي.</li>
</ul>
<h2 id="الخطوة-الرابعة-نظف-بعد-الاختبارات">الخطوة الرابعة: نظّف بعد الاختبارات</h2>
<p>إخراج القمامة خطوة مهمة في الاختبار. قد تصبح البدائل المُحاكاة «لزجة» بعض الشيء (المصطلح التقني!)، لذا لنتأكد من إعادة تعيين <code>fetch</code> بعد كل اختبار.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { afterEach } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">clearAllMocks</span>(); <span class="hljs-comment">// Reset all mocked calls between tests</span>
});
</code></pre>
<p>نعم، إنها مجرد نظافة اختبار جيدة. نظّف بعد نفسك، وسيكون مستقبلك ممتنًا لك.</p>
<h2 id="حديث-صريح-اختبار-حالة-الخطأ">حديث صريح: اختبار حالة الخطأ</h2>
<p>لأنه، يا إلهي، ماذا يحدث إذا انفجر الإنترنت أو تجاهل الخادم طلبك ببساطة؟ عليك اختبار ذلك أيضًا!</p>
<p>لنرَ كيف نختبر خطأً، مثل عندما ترفض fetch نفسها:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;handles fetch failure&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span> = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">reject</span>(<span class="hljs-string">&#x27;API is down&#x27;</span>));

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getData</span>()).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toEqual</span>(<span class="hljs-string">&#x27;API is down&#x27;</span>);
  <span class="hljs-title function_">expect</span>(fetch).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);
});
</code></pre>
<p>هنا، ترفض <code>fetch</code> بخطأ، ونختبر أن دالتنا ترفض أيضًا بشكل صحيح. سهلة يسيرة.</p>
<h2 id="خاتمة">خاتمة</h2>
<p>تذكّر فقط أن الهدف ليس اختبار ما إذا كانت fetch تعمل. (<strong>تنبيه بالمفسد</strong>: إنها تعمل.) أنت تركّز على ضمان أن شيفرتك تتصرف بشكل صحيح في مجموعة متنوعة من السيناريوهات المتعلقة بـ fetch.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,p as default,l as headings,c as html,t as slug,e as title};
