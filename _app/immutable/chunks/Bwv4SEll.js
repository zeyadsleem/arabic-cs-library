const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="testing-a-reducer-solution",t="الحل: اختبار مخفّض (reducer) في Zod",p=[{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],c=`<p>إليك حلًا بسيطًا جدًا — وفيه خلل خفي أيضًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> reducer, { add, remove, toggle, markAllAsUnpacked, update } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./items-slice&#x27;</span>;

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns an empty object as the initial state&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">reducer</span>(<span class="hljs-literal">undefined</span>, { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;noop&#x27;</span> })).<span class="hljs-title function_">toEqual</span>([]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;supports adding an item&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">reducer</span>([], <span class="hljs-title function_">add</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span> }))).<span class="hljs-title function_">toEqual</span>([
    expect.<span class="hljs-title function_">objectContaining</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span> }),
  ]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;prefixes ids with &quot;item-&quot;&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">reducer</span>([], <span class="hljs-title function_">add</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span> }))).<span class="hljs-title function_">toEqual</span>([
    expect.<span class="hljs-title function_">objectContaining</span>({ <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">stringMatching</span>(<span class="hljs-regexp">/^item-/</span>) }),
  ]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;defaults new items to a packed status of false&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">reducer</span>([], <span class="hljs-title function_">add</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span> }))).<span class="hljs-title function_">toEqual</span>([
    expect.<span class="hljs-title function_">objectContaining</span>({ <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span> }),
  ]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;supports removing an item&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> state = [
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span>,
    },
  ];

  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">reducer</span>(state, <span class="hljs-title function_">remove</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span> }));

  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;supports toggling an item&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> state = [
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span>,
    },
  ];

  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">reducer</span>(state, <span class="hljs-title function_">toggle</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span> }));

  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">true</span>,
    },
  ]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;supports updating an item&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> state = [
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span>,
    },
  ];

  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">reducer</span>(state, <span class="hljs-title function_">update</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Samsung Galaxy S23&#x27;</span> }));

  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Samsung Galaxy S23&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span>,
    },
  ]);
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;supports marking all items as unpacked&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> state = [
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">true</span>,
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone Charger&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">true</span>,
    },
  ];

  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">reducer</span>(state, <span class="hljs-title function_">markAllAsUnpacked</span>());

  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;iPhone Charger&#x27;</span>,
      <span class="hljs-attr">packed</span>: <span class="hljs-literal">false</span>,
    },
  ]);
});
</code></pre>
<p><em>يمكننا</em> المضي أبعد من ذلك في المطابقة غير المتماثلة، لكني لن أفعل لمجرد إثبات وجهة نظر: الأمر كله يتعلق بالمقايضات مع مراعاة ما يقدّم أكبر قيمة؟ <em>إذا</em> وجدنا أن بنية البيانات هذه تتغيّر كثيرًا وأن قليلًا إضافيًا من المرونة مفيد، فقد أختار ذلك. لكن حتى ذلك الحين، أتبنّى فلسفة <a href="https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it">YAGNI</a> في هذا بمحاولة نصف ناضجة لأكون قدوة لك.</p>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>هناك الاختبارات التي أكتبها عندما أطوّر الشيفرة، والاختبارات التي أكتبها عندما أصون الشيفرة.</p>
<ul>
<li>قد أدمج الاختبارات القليلة الأولى في اختبار واحد، لأنه إن فشل أي جزء منها فسأحصل على رسالة فشل جيدة.</li>
<li>إن انتهى بي الأمر إلى إضافة شيء مثل <code>dateCreated</code> أو <code>lastModified</code>، فستجدني بالتأكيد أكثر تسامحًا مع تلك الاختبارات اللاحقة.</li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
