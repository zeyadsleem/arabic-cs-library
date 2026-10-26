const s="kinney",a="react-performance",n="أداء React",l="usedeferredvalue-patterns",e="أنماط useDeferredValue",t=[{depth:2,id:"النمط-الأساسي",text:"النمط الأساسي"},{depth:2,id:"واجهة-بحث-واقعية",text:"واجهة بحث واقعية"},{depth:2,id:"نمط-متقدم-التأجيلات-المتتابعة",text:"نمط متقدّم: التأجيلات المتتابعة"},{depth:2,id:"التعامل-مع-حالات-التحميل",text:"التعامل مع حالات التحميل"},{depth:2,id:"متى-لا-تستخدم-usedeferredvalue",text:"متى لا تستخدم useDeferredValue"},{depth:2,id:"الدمج-مع-الميزات-المتزامنة",text:"الدمج مع الميزات المتزامنة"},{depth:2,id:"نصائح-للأداء",text:"نصائح للأداء"},{depth:3,id:"قس-قبل-أن-تحسن",text:"قِس قبل أن تُحسّن"},{depth:3,id:"تأجيلات-دقيقة",text:"تأجيلات دقيقة"},{depth:3,id:"خطافات-مخصصة-للأنماط-الشائعة",text:"خُطّافات مخصّصة للأنماط الشائعة"},{depth:2,id:"مزالق-شائعة",text:"مزالق شائعة"},{depth:3,id:"المزلق-1-حفظ-نتائج-مفقود",text:"المزلق 1: حفظ نتائج مفقود"},{depth:3,id:"المزلق-2-تأجيل-الشيء-الخطأ",text:"المزلق 2: تأجيل الشيء الخطأ"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],p=`<p>بنيتَ مكوّن بحث يرشّح قائمة ضخمة من المنتجات. ويبدأ مستخدموك في كتابة «iPhone» فيلاحظون فورًا أن حقل الإدخال يبدو بطيئًا — فكل ضغطة مفتاح تكاد تتعلّق لجزء من الثانية. إذ تنهال على خيط واجهة المستخدم عمليات مكلفة تُطلق مع كل تغيير حرف، فتبدو واجهتك التي كانت سريعة خرقاء.</p>
<p>وهنا يأتي <code>useDeferredValue</code> — حلّ React الأنيق لإبقاء التحديثات عالية الأولوية (مثل إدخال المستخدم) مستجيبة، مع السماح للتحديثات الأدنى أولوية (مثل الحسابات المكلفة) بالحدوث عندما يتوفّر للمتصفح دورات فائضة. اعتبره طريقة واجهتك في القول: «عالج الأمور العاجلة أولًا، وتولَّ العمل الثقيل حين يتوفّر الوقت».</p>
<p>وخلافًا للتخميد (debouncing) الذي يؤجّل التحديثات مدة زمنية ثابتة، فإن <code>useDeferredValue</code> متكيّف — لا يؤجّل التحديثات إلا عندما يكون React مشغولًا بعمل أهم. وحين يكون تطبيقك خاملًا، تتحدّث القيم المؤجَّلة فورًا. أما حين يكون React غارقًا في العمل، فإنها تتنحّى بأناقة.</p>
<h2 id="النمط-الأساسي">النمط الأساسي</h2>
<p>لنبدأ بمثال بسيط يوضّح المفهوم الجوهري:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useDeferredValue, useState, useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Defer the expensive computation</span>
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-comment">// Only recompute when the deferred value changes</span>
  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">searchExpensiveDatabase</span>(deferredQuery);
  }, [deferredQuery]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {results.map((result) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{result.id}</span>&gt;</span>{result.title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)}
        placeholder=&quot;Search products...&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchResults</span> <span class="hljs-attr">query</span>=<span class="hljs-string">{query}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وإليك ما يحدث: عندما تكتب بسرعة، يتحدّث <code>query</code> فورًا (فيبقى حقل الإدخال مستجيبًا)، أما <code>deferredQuery</code> فلا يتحدّث إلا حين يقرّر React أن ذلك آمن دون حجب تحديثات أكثر إلحاحًا. ويحصل حساب البحث المكلف على القيمة المؤجَّلة، فلا يتعارض مع الكتابة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>اقترن <code>useDeferredValue</code> دائمًا بـ <code>useMemo</code> أو <code>useCallback</code> — وإلا فستظل مكوّناتك تُعاد للتصيير مع كل تغيير، فتذهب الفائدة سدًى.</p>
</blockquote>
<h2 id="واجهة-بحث-واقعية">واجهة بحث واقعية</h2>
<p>لنبنِ واجهة بحث أكمل تُظهر عدة أنماط تعمل معًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useDeferredValue, useState, useMemo, useTransition, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Product</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">category</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">description</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductSearch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [category, setCategory] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;all&#x27;</span>);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-comment">// Defer the expensive filtering operation</span>
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);
  <span class="hljs-keyword">const</span> deferredCategory = <span class="hljs-title function_">useDeferredValue</span>(category);

  <span class="hljs-keyword">const</span> filteredProducts = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!deferredQuery &amp;&amp; deferredCategory === <span class="hljs-string">&#x27;all&#x27;</span>) {
      <span class="hljs-keyword">return</span> products; <span class="hljs-comment">// Return all products if no filters</span>
    }

    <span class="hljs-keyword">return</span> products.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">product</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> matchesQuery =
        deferredQuery === <span class="hljs-string">&#x27;&#x27;</span> ||
        product.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(deferredQuery.<span class="hljs-title function_">toLowerCase</span>()) ||
        product.<span class="hljs-property">description</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(deferredQuery.<span class="hljs-title function_">toLowerCase</span>());

      <span class="hljs-keyword">const</span> matchesCategory = deferredCategory === <span class="hljs-string">&#x27;all&#x27;</span> || product.<span class="hljs-property">category</span> === deferredCategory;

      <span class="hljs-keyword">return</span> matchesQuery &amp;&amp; matchesCategory;
    });
  }, [deferredQuery, deferredCategory]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleCategoryChange</span> = (<span class="hljs-params"><span class="hljs-attr">newCategory</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCategory</span>(newCategory);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-search&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;search-controls&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)}
          placeholder=&quot;Search products...&quot;
          className=&quot;search-input&quot;
        /&gt;

        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{category}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleCategoryChange(e.target.value)}
          className=&quot;category-filter&quot;
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;all&quot;</span>&gt;</span>All Categories<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;electronics&quot;</span>&gt;</span>Electronics<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;clothing&quot;</span>&gt;</span>Clothing<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;books&quot;</span>&gt;</span>Books<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductList</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{filteredProducts}</span> <span class="hljs-attr">isStale</span>=<span class="hljs-string">{isPending</span> || <span class="hljs-attr">query</span> !== <span class="hljs-string">deferredQuery}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params">{ products, isStale }: { products: Product[]; isStale: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">product-list</span> \${<span class="hljs-attr">isStale</span> ? &#x27;<span class="hljs-attr">stale</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}&gt;</span>
      {products.map((product) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-card&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;category&quot;</span>&gt;</span>{product.category}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;price&quot;</span>&gt;</span>\${product.price}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يجمع هذا المثال عدة أنماط قوية:</p>
<ul>
<li><strong>قيم مؤجَّلة</strong> لكل من عبارة البحث ومرشّح الفئة</li>
<li><strong>انتقالات</strong> لتغييرات الفئة (لأنها عادةً أقل إلحاحًا من الكتابة)</li>
<li><strong>استجابة بصرية</strong> عندما تصبح النتائج قديمة (لاحظ خاصية <code>isStale</code>)</li>
<li><strong>حساب محفوظ النتائج</strong> لمنع الترشيح غير الضروري</li>
</ul>
<h2 id="نمط-متقدم-التأجيلات-المتتابعة">نمط متقدّم: التأجيلات المتتابعة</h2>
<p>أحيانًا تكون لديك مستويات متعددة من الحسابات المكلفة. إليك نمطًا للتعامل مع التأجيلات المتتابعة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">DataDashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [dateRange, setDateRange] = <span class="hljs-title function_">useState</span>({ <span class="hljs-attr">start</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">end</span>: <span class="hljs-string">&#x27;&#x27;</span> });
  <span class="hljs-keyword">const</span> [filters, setFilters] = useState&lt;<span class="hljs-title class_">FilterOptions</span>&gt;({});

  <span class="hljs-comment">// First level: defer the raw data fetching</span>
  <span class="hljs-keyword">const</span> deferredDateRange = <span class="hljs-title function_">useDeferredValue</span>(dateRange);

  <span class="hljs-keyword">const</span> rawData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetchAnalyticsData</span>(deferredDateRange);
  }, [deferredDateRange]);

  <span class="hljs-comment">// Second level: defer the filtering of that data</span>
  <span class="hljs-keyword">const</span> deferredFilters = <span class="hljs-title function_">useDeferredValue</span>(filters);

  <span class="hljs-keyword">const</span> filteredData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">applyFilters</span>(rawData, deferredFilters);
  }, [rawData, deferredFilters]);

  <span class="hljs-comment">// Third level: defer the expensive chart calculations</span>
  <span class="hljs-keyword">const</span> chartData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">generateChartData</span>(filteredData);
  }, [filteredData]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DateRangePicker</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{dateRange}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setDateRange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">FilterControls</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{filters}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setFilters}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{chartData}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يحمي كل مستوى من التأجيل التحديثات الأكثر إلحاحًا فوقه. فغييرات نطاق التاريخ لن تحجب تحديثات المرشّحات، وغييرات المرشّحات لن تحجب تصيير الرسم البياني.</p>
<h2 id="التعامل-مع-حالات-التحميل">التعامل مع حالات التحميل</h2>
<p>من تحديات <code>useDeferredValue</code> إدارة حالات التحميل. وإليك نمطًا نظيفًا لتوضيح للمستخدمين متى تصبح النتائج قديمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchWithLoadingState</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Simulate expensive search</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">performExpensiveSearch</span>(deferredQuery);
  }, [deferredQuery]);

  <span class="hljs-comment">// Key insight: results are &quot;stale&quot; when the current query</span>
  <span class="hljs-comment">// doesn&#x27;t match the deferred query</span>
  <span class="hljs-keyword">const</span> isStale = query !== deferredQuery;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} placeholder=&quot;Search...&quot; /&gt;

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;results-container&quot;</span>&gt;</span>
        {isStale &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-overlay&quot;</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{isStale</span> ? &#x27;<span class="hljs-attr">results</span> <span class="hljs-attr">stale</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">results</span>&#x27;}&gt;</span>
          {results.map((result) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{result.id}</span>&gt;</span>{result.title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>فحص <code>isStale</code> صديقك — فهو يخبرك عندما تعرض واجهة المستخدم نتائج قديمة بينما تُحسب نتائج جديدة.</p>
<h2 id="متى-لا-تستخدم-usedeferredvalue">متى لا تستخدم <code>useDeferredValue</code></h2>
<p>ليست كل عملية مكلفة تستفيد من <code>useDeferredValue</code>. وإليك بعض الحالات التي لا تكون فيها الأداة المناسبة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t defer critical user feedback</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">LoginForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [email, setEmail] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> deferredEmail = <span class="hljs-title function_">useDeferredValue</span>(email); <span class="hljs-comment">// Bad idea!</span>

  <span class="hljs-keyword">const</span> validationErrors = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">validateEmail</span>(deferredEmail);
  }, [deferredEmail]);

  <span class="hljs-comment">// User expects immediate validation feedback</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{email}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setEmail(e.target.value)} /&gt;
      {validationErrors.map((error) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{error}</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ❌ Don&#x27;t defer simple computations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SimpleCounter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> deferredCount = <span class="hljs-title function_">useDeferredValue</span>(count); <span class="hljs-comment">// Unnecessary overhead</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Count: {deferredCount}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ DO use it for expensive, non-critical updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AnalyticsDashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">const</span> expensiveStats = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">calculateComplexAnalytics</span>(deferredQuery);
  }, [deferredQuery]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">ComplexChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{expensiveStats}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الدمج-مع-الميزات-المتزامنة">الدمج مع الميزات المتزامنة</h2>
<p>يعمل <code>useDeferredValue</code> بانسجام مع بقية ميزات React المتزامنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ModernSearchApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">searchDatabase</span>(deferredQuery);
  }, [deferredQuery]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleQueryChange</span> = (<span class="hljs-params"><span class="hljs-attr">newQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(newQuery); <span class="hljs-comment">// High priority - updates immediately</span>

    <span class="hljs-comment">// Low priority updates can be wrapped in transitions</span>
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">updateRecentSearches</span>(newQuery);
      <span class="hljs-title function_">logSearchAnalytics</span>(newQuery);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleQueryChange(e.target.value)}
        placeholder=&quot;Search...&quot;
      /&gt;

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">SearchSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchResults</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> <span class="hljs-attr">isLoading</span>=<span class="hljs-string">{isPending</span> || <span class="hljs-attr">query</span> !== <span class="hljs-string">deferredQuery}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="نصائح-للأداء">نصائح للأداء</h2>
<p>إليك بعض النصائح العملية للاستفادة القصوى من <code>useDeferredValue</code>:</p>
<h3 id="قس-قبل-أن-تحسن">قِس قبل أن تُحسّن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Use React DevTools Profiler to identify actual bottlenecks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params">{ data }: { data: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> deferredData = <span class="hljs-title function_">useDeferredValue</span>(data);

  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">time</span>(<span class="hljs-string">&#x27;expensive-computation&#x27;</span>);
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">doExpensiveWork</span>(deferredData);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">timeEnd</span>(<span class="hljs-string">&#x27;expensive-computation&#x27;</span>);
    <span class="hljs-keyword">return</span> result;
  }, [deferredData]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="تأجيلات-دقيقة">تأجيلات دقيقة</h3>
<p>أحيانًا يكون من الأفضل تأجيل أجزاء محددة بدلًا من كائنات كاملة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Defers the entire filter object</span>
<span class="hljs-keyword">const</span> deferredFilters = <span class="hljs-title function_">useDeferredValue</span>(filters);

<span class="hljs-comment">// ✅ Defer only the expensive parts</span>
<span class="hljs-keyword">const</span> deferredSearchTerm = <span class="hljs-title function_">useDeferredValue</span>(filters.<span class="hljs-property">searchTerm</span>);
<span class="hljs-keyword">const</span> deferredCategory = <span class="hljs-title function_">useDeferredValue</span>(filters.<span class="hljs-property">category</span>);
<span class="hljs-comment">// Keep sort order immediate since it&#x27;s not expensive</span>
<span class="hljs-keyword">const</span> sortOrder = filters.<span class="hljs-property">sortOrder</span>;
</code></pre>
<h3 id="خطافات-مخصصة-للأنماط-الشائعة">خُطّافات مخصّصة للأنماط الشائعة</h3>
<p>أنشئ خُطّافات قابلة لإعادة الاستخدام لأنماط التأجيل الشائعة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useDeferredSearch&lt;T&gt;(
  <span class="hljs-attr">items</span>: T[],
  <span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">searchFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">items</span>: T[], <span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> T[],
) {
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">searchFn</span>(items, deferredQuery);
  }, [items, deferredQuery, searchFn]);

  <span class="hljs-keyword">const</span> isStale = query !== deferredQuery;

  <span class="hljs-keyword">return</span> { results, isStale };
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductSearch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> { results, isStale } = <span class="hljs-title function_">useDeferredSearch</span>(products, query, <span class="hljs-function">(<span class="hljs-params">products, q</span>) =&gt;</span>
    products.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> p.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(q)),
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductList</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{results}</span> <span class="hljs-attr">isStale</span>=<span class="hljs-string">{isStale}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مزالق-شائعة">مزالق شائعة</h2>
<h3 id="المزلق-1-حفظ-نتائج-مفقود">المزلق 1: حفظ نتائج مفقود</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Still re-renders on every change</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-comment">// This runs on every render!</span>
  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">expensiveComputation</span>(deferredQuery);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{results}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Properly memoized</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">expensiveComputation</span>(deferredQuery);
  }, [deferredQuery]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{results}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="المزلق-2-تأجيل-الشيء-الخطأ">المزلق 2: تأجيل الشيء الخطأ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Deferring the final result instead of the input</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params">{ items, query }: { items: Item[]; query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(query));
  <span class="hljs-keyword">const</span> deferredItems = <span class="hljs-title function_">useDeferredValue</span>(filteredItems); <span class="hljs-comment">// Wrong!</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ItemList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{deferredItems}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Defer the input, memoize the computation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params">{ items, query }: { items: Item[]; query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">const</span> filteredItems = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(deferredQuery));
  }, [items, deferredQuery]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ItemList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{filteredItems}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>‏<code>useDeferredValue</code> أداة قوية لبناء واجهات مستجيبة تتعامل مع العمليات المكلفة بسلاسة. وأهم المبادئ التي يجب تذكّرها:</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:t,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,p as html,l as slug,e as title};
