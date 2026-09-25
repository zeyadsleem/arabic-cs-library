const s="patterns-dev",a="vanilla",n="أنماط JavaScript",l="route-based",t="التقسيم حسب المسار (Route Based Splitting)",p=[],e=`<p>نستطيع طلب الموارد التي لا تلزم إلا لمسارات (routes) محددة، وذلك بإضافة <em>التقسيم حسب المسار</em> (route-based splitting). ومن خلال الجمع بين <strong>React Suspense</strong> أو <code>loadable-components</code> مع مكتبات مثل <code>react-router</code>، يمكننا تحميل المكوّنات ديناميكيًا (dynamic import) بناءً على المسار الحالي.</p>
<p>JavaScript iconindex.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { lazy, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Switch</span>, <span class="hljs-title class_">Route</span>, <span class="hljs-title class_">BrowserRouter</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Router</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-router-dom&quot;</span>;


<span class="hljs-keyword">const</span> <span class="hljs-title class_">App</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;home&quot; */</span> <span class="hljs-string">&quot;./App&quot;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Overview</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;overview&quot; */</span> <span class="hljs-string">&quot;./Overview&quot;</span>)
);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Settings</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: &quot;settings&quot; */</span> <span class="hljs-string">&quot;./Settings&quot;</span>)
);


<span class="hljs-title function_">render</span>(
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/overview&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Overview</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/settings&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Settings</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>,
  <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;root&quot;</span>)
);


<span class="hljs-variable language_">module</span>.<span class="hljs-property">hot</span>.<span class="hljs-title function_">accept</span>();
</code></pre>
<p><a href="https://codesandbox.io/embed/webpack-dev-server-9shfr">افتح CodeSandbox</a></p>
<p>من خلال تحميل المكوّنات بشكل كسول (lazy loading) لكل مسار، فإننا نطلب الحزمة (bundle) التي تحتوي على الشيفرة الضرورية للمسار الحالي فقط. وبما أن معظم الناس معتادون على وجود بعض زمن التحميل أثناء إعادة التوجيه، فإن هذا هو المكان المثالي لتحميل المكوّنات بشكل كسول!</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
