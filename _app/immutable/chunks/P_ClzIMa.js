const s="kinney",n="react-performance",a="أداء React",t="usetransition-and-starttransition",l="دليل useTransition وstartTransition",p=[{depth:2,id:"المشكلة-تحديثات-تحجب-الواجهة",text:"المشكلة: تحديثات تحجب الواجهة"},{depth:2,id:"دور-usetransition",text:"دور useTransition"},{depth:2,id:"تعمق-في-خطاف-usetransition",text:"تعمّق في خُطّاف useTransition"},{depth:3,id:"قيمة-ispending",text:"قيمة isPending"},{depth:3,id:"الدالة-starttransition",text:"الدالة startTransition"},{depth:2,id:"الدالة-starttransition-المستقلة",text:"الدالة startTransition المستقلة"},{depth:2,id:"أنماط-واقعية",text:"أنماط واقعية"},{depth:3,id:"بحث-مع-التخميد-debouncing",text:"بحث مع التخميد (debouncing)"},{depth:3,id:"تحديثات-تصور-البيانات",text:"تحديثات تصوّر البيانات"},{depth:2,id:"متى-لا-تستخدم-الانتقالات",text:"متى لا تستخدم الانتقالات"},{depth:3,id:"استجابة-المستخدم-الحرجة",text:"استجابة المستخدم الحرجة"},{depth:3,id:"تحديثات-التنقل",text:"تحديثات التنقّل"},{depth:3,id:"التحديثات-الصغيرة-السريعة",text:"التحديثات الصغيرة السريعة"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"قياس-الأثر",text:"قياس الأثر"},{depth:3,id:"اعتبارات-الذاكرة",text:"اعتبارات الذاكرة"},{depth:2,id:"استراتيجية-الترحيل",text:"استراتيجية الترحيل"},{depth:3,id:"الخطوة-1-حدد-العمليات-المكلفة",text:"الخطوة 1: حدّد العمليات المكلفة"},{depth:3,id:"الخطوة-2-افصل-الحالة",text:"الخطوة 2: افصل الحالة"},{depth:3,id:"الخطوة-3-أضف-الانتقالات-تدريجيا",text:"الخطوة 3: أضف الانتقالات تدريجيًا"},{depth:3,id:"الخطوة-4-قس-وكرر",text:"الخطوة 4: قِس وكرّر"},{depth:2,id:"مزالق-شائعة",text:"مزالق شائعة"},{depth:3,id:"الإغلاقات-القديمة-في-الانتقالات",text:"الإغلاقات القديمة في الانتقالات"},{depth:3,id:"الانتقالات-لا-تجعل-الشيفرة-أسرع",text:"الانتقالات لا تجعل الشيفرة أسرع"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>قدّم React 18 ميزات متزامنة تساعد في إبقاء تطبيقك مستجيبًا حتى أثناء أداء عمل مكلف. وفي قلب ذلك يكمن مفهوم <strong>الانتقالات</strong> — تعليم بعض التحديثات بأنها أقل إلحاحًا حتى لا تُحجب التحديثات الأهم (مثل الاستجابة لإدخال المستخدم). تخيّل الأمر كإدارة مرور: مسارات سريعة للتحديثات العاجلة، ومسارات عادية لكل ما سواها.</p>
<p>يتيح لك <code>useTransition</code> و<code>startTransition</code> تأجيل تحديثات الحالة غير العاجلة، ومنعها من حجب خيط واجهة المستخدم أثناء كتابة المستخدمين أو نقرهم أو تمريرهم النشط. فبدل أن يتجمّد تطبيقك أثناء الحسابات الثقيلة، يبقى تفاعليًا بينما يجري العمل المكلف في الخلفية.</p>
<h2 id="المشكلة-تحديثات-تحجب-الواجهة">المشكلة: تحديثات تحجب الواجهة</h2>
<p>قبل أن نغوص في الحل، لنفهم ما الذي نحلّه. تأمّل مكوّن البحث هذا الذي يرشّح قائمة كبيرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This blocks the UI during expensive filtering</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [items] = <span class="hljs-title function_">useState</span>(<span class="hljs-title function_">generateLargeDataset</span>()); <span class="hljs-comment">// 10,000+ items</span>

  <span class="hljs-comment">// This filtering happens synchronously and blocks typing</span>
  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>
    item.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(query.<span class="hljs-title function_">toLowerCase</span>()),
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} placeholder=&quot;Search...&quot; /&gt;
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>عندما تكتب في مربع البحث، تُطلق كل ضغطة مفتاح عملية ترشيح مكلفة تحجب واجهة المستخدم. ويبدو حقل الإدخال بطيئًا لأن React لا يستطيع تحديث قيمته حتى يكتمل الترشيح. وليست هذه تمامًا التجربة السلسة التي يتوقّعها مستخدموك.</p>
<h2 id="دور-usetransition">دور <code>useTransition</code></h2>
<p>يمنحك <code>useTransition</code> طريقة لتعليم تحديثات بأنها «انتقالات» — تحديثات غير عاجلة يمكن أن يقاطعها عمل أهم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useTransition, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Smooth typing with transitions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [filteredQuery, setFilteredQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [items] = <span class="hljs-title function_">useState</span>(<span class="hljs-title function_">generateLargeDataset</span>());
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>
    item.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(filteredQuery.<span class="hljs-title function_">toLowerCase</span>()),
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(value); <span class="hljs-comment">// Urgent: update input immediately</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setFilteredQuery</span>(value); <span class="hljs-comment">// Non-urgent: defer filtering</span>
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleSearch(e.target.value)} placeholder=&quot;Search...&quot; /&gt;
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Filtering...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وإليك ما يجري:</p>
<ul>
<li><strong>تحديث فوري</strong>: يعمل <code>setQuery(value)</code> تزامنيًا، فتبقى الكتابة مستجيبة</li>
<li><strong>تحديث مؤجَّل</strong>: يحصل <code>setFilteredQuery(value)</code> داخل <code>startTransition</code> على أولوية أدنى</li>
<li><strong>حالة التحميل</strong>: يخبرنا <code>isPending</code> بأن الانتقال ما زال قيد المعالجة</li>
</ul>
<p>يتحدّث حقل الإدخال فورًا بينما يجري الترشيح المكلف في الخلفية. وإن واصل المستخدم الكتابة، سيقاطع React الترشيح الجاري ليعالج الإدخال الجديد.</p>
<h2 id="تعمق-في-خطاف-usetransition">تعمّق في خُطّاف <code>useTransition</code></h2>
<p>يعيد خُطّاف <code>useTransition</code> زوجًا من عنصرين:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
</code></pre>
<h3 id="قيمة-ispending">قيمة isPending</h3>
<p>قيمة منطقية تشير إلى ما إذا كان أي انتقال معلّقًا حاليًا. استخدمها لعرض مؤشرات التحميل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">FilteredList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-spinner&quot;</span>&gt;</span>Updating results...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {/* Your filtered content */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الدالة-starttransition">الدالة startTransition</h3>
<p>دالة تغلّف تحديثات الحالة التي تريد تعليمها كانتقالات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">handleExpensiveUpdate</span> = (<span class="hljs-params">newData</span>) =&gt; {
  <span class="hljs-comment">// Urgent updates outside the transition</span>
  <span class="hljs-title function_">setLoadingState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Non-urgent updates inside the transition</span>
    <span class="hljs-title function_">setFilteredData</span>(<span class="hljs-title function_">processData</span>(newData));
    <span class="hljs-title function_">setCurrentPage</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">setSelectedItems</span>([]);
  });
};
</code></pre>
<p>تُجمَّع تحديثات الحالة المتعددة داخل <code>startTransition</code> معًا في انتقال واحد قابل للمقاطعة.</p>
<h2 id="الدالة-starttransition-المستقلة">الدالة startTransition المستقلة</h2>
<p>لا تحتاج دائمًا إلى حالة <code>isPending</code>. وفي الحالات التي تريد فيها فقط تعليم التحديثات بأنها غير عاجلة، استورد <code>startTransition</code> مباشرةً:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { startTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TabContainer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [activeTab, setActiveTab] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;home&#x27;</span>);
  <span class="hljs-keyword">const</span> [tabContent, setTabContent] = <span class="hljs-title function_">useState</span>(<span class="hljs-title function_">getHomeContent</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">switchTab</span> = (<span class="hljs-params"><span class="hljs-attr">tab</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setActiveTab</span>(tab); <span class="hljs-comment">// Urgent: update tab highlight immediately</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Non-urgent: load expensive tab content</span>
      <span class="hljs-title function_">setTabContent</span>(<span class="hljs-title function_">getContentForTab</span>(tab));
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tabs&quot;</span>&gt;</span>
        {tabs.map((tab) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{tab}</span>
            <span class="hljs-attr">className</span>=<span class="hljs-string">{tab</span> === <span class="hljs-string">activeTab</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}
            <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> switchTab(tab)}
          &gt;
            {tab}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tab-content&quot;</span>&gt;</span>{tabContent}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يحدث تمييز التبويب فورًا (تجربة استخدام ممتازة)، بينما يجري تحميل المحتوى الذي قد يكون مكلفًا في صورة انتقال.</p>
<h2 id="أنماط-واقعية">أنماط واقعية</h2>
<h3 id="بحث-مع-التخميد-debouncing">بحث مع التخميد (debouncing)</h3>
<p>اجمع الانتقالات مع التخميد للحصول على أداء بحث أفضل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">AdvancedSearch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-comment">// Debounce the search to avoid excessive API calls</span>
  <span class="hljs-keyword">const</span> debouncedSearch = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">debounce</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">searchQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// This could be an API call or expensive filtering</span>
        <span class="hljs-title function_">performSearch</span>(searchQuery).<span class="hljs-title function_">then</span>(setResults);
      });
    }, <span class="hljs-number">300</span>),
    [],
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (query) {
      <span class="hljs-title function_">debouncedSearch</span>(query);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-title function_">setResults</span>([]);
    }
  }, [query, debouncedSearch]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)}
        placeholder=&quot;Search products...&quot;
      /&gt;

      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;results&quot;</span>&gt;</span>
        {results.map((result) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">SearchResult</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{result.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{result}</span> /&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="تحديثات-تصور-البيانات">تحديثات تصوّر البيانات</h3>
<p>مثالي للرسوم والمخططات التي تحتاج إعادة حسابات مكلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">DataDashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [filters, setFilters] = <span class="hljs-title function_">useState</span>(defaultFilters);
  <span class="hljs-keyword">const</span> [chartData, setChartData] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateFilters</span> = (<span class="hljs-params"><span class="hljs-attr">newFilters</span>: <span class="hljs-title class_">Filters</span></span>) =&gt; {
    <span class="hljs-title function_">setFilters</span>(newFilters); <span class="hljs-comment">// Update UI immediately</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Expensive data processing doesn&#x27;t block filter UI</span>
      <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">processLargeDataset</span>(rawData, newFilters);
      <span class="hljs-title function_">setChartData</span>(processedData);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">FilterControls</span> <span class="hljs-attr">filters</span>=<span class="hljs-string">{filters}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{updateFilters}</span> /&gt;</span>

      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;chart-loading&quot;</span>&gt;</span>Updating visualization...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{chartData}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متى-لا-تستخدم-الانتقالات">متى لا تستخدم الانتقالات</h2>
<p>ليست الانتقالات هي الجواب دائمًا. تجنّبها في:</p>
<h3 id="استجابة-المستخدم-الحرجة">استجابة المستخدم الحرجة</h3>
<p>لا تؤجّل التحديثات التي تقدّم استجابة فورية لأفعال المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t defer form validation feedback</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setErrors</span>(<span class="hljs-title function_">validateForm</span>(formData)); <span class="hljs-comment">// User needs immediate feedback</span>
  });
};

<span class="hljs-comment">// ✅ Show validation errors immediately</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">setErrors</span>(<span class="hljs-title function_">validateForm</span>(formData));
};
</code></pre>
<h3 id="تحديثات-التنقل">تحديثات التنقّل</h3>
<p>ينبغي أن تبدو تغييرات المسار فورية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t defer navigation</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleNavigation</span> = (<span class="hljs-params"><span class="hljs-attr">route</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">navigate</span>(route); <span class="hljs-comment">// Users expect immediate navigation</span>
  });
};

<span class="hljs-comment">// ✅ Navigate immediately, defer expensive route data</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleNavigation</span> = (<span class="hljs-params"><span class="hljs-attr">route</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-title function_">navigate</span>(route);

  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">loadRouteData</span>(route).<span class="hljs-title function_">then</span>(setRouteData);
  });
};
</code></pre>
<h3 id="التحديثات-الصغيرة-السريعة">التحديثات الصغيرة السريعة</h3>
<p>في تغييرات الحالة التافهة، تضيف الانتقالات تعقيدًا بلا داعٍ:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Overkill for simple updates</span>
<span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>); <span class="hljs-comment">// This is already fast</span>
  });
};

<span class="hljs-comment">// ✅ Keep it simple</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>);
};
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="قياس-الأثر">قياس الأثر</h3>
<p>استخدم مُنمّق React DevTools لقياس الأثر الفعلي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before adding transitions, profile this component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveList</span>(<span class="hljs-params">{ items, query }</span>) {
  <span class="hljs-keyword">const</span> filteredItems = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Expensive filtering logic</span>
    <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> <span class="hljs-title function_">complexFilterLogic</span>(item, query));
  }, [items, query]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveListItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تُضف الانتقالات إلا إذا استطعت قياس تحسّن حقيقي في تجربة المستخدم. ولا تُحسّن قبل الأوان.</p>
</blockquote>
<h3 id="اعتبارات-الذاكرة">اعتبارات الذاكرة</h3>
<p>قد تُبقي الانتقالات عدة نسخ من البيانات في الذاكرة في الوقت نفسه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedSearch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-comment">// Cleanup old results to prevent memory leaks</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (!isPending) {
        <span class="hljs-comment">// Clean up any cached expensive computations</span>
        <span class="hljs-title function_">cleanupExpensiveOperations</span>();
      }
    }, <span class="hljs-number">5000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timeoutId);
  }, [isPending]);

  <span class="hljs-comment">// ... rest of component</span>
}
</code></pre>
<h2 id="استراتيجية-الترحيل">استراتيجية الترحيل</h2>
<p>تحويل المكوّنات القائمة لاستخدام الانتقالات:</p>
<h3 id="الخطوة-1-حدد-العمليات-المكلفة">الخطوة 1: حدّد العمليات المكلفة</h3>
<p>ابحث عن العمليات التي تسبّب تجمّدًا ملحوظًا في الواجهة:</p>
<ul>
<li>ترشيح وترتيب قوائم كبيرة</li>
<li>حسابات معقّدة</li>
<li>تحديثات DOM ثقيلة</li>
<li>معالجة البيانات</li>
</ul>
<h3 id="الخطوة-2-افصل-الحالة">الخطوة 2: افصل الحالة</h3>
<p>افصل التحديثات الفورية عن المكلفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before: Single state causes blocking updates</span>
<span class="hljs-keyword">const</span> [searchState, setSearchState] = <span class="hljs-title function_">useState</span>({
  <span class="hljs-attr">query</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">results</span>: [],
});

<span class="hljs-comment">// After: Split for different update priorities</span>
<span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
<span class="hljs-keyword">const</span> [results, setResults] = <span class="hljs-title function_">useState</span>([]);
</code></pre>
<h3 id="الخطوة-3-أضف-الانتقالات-تدريجيا">الخطوة 3: أضف الانتقالات تدريجيًا</h3>
<p>ابدأ بأكثر المكوّنات إشكالًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Start here: Most obvious wins</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductSearch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-comment">// ... transition logic</span>
}

<span class="hljs-comment">// Then move to: Secondary bottlenecks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataTable</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ... apply same pattern</span>
}
</code></pre>
<h3 id="الخطوة-4-قس-وكرر">الخطوة 4: قِس وكرّر</h3>
<p>استخدم تنميق الأداء للتحقق من التحسينات والعثور على هدف التحسين التالي.</p>
<h2 id="مزالق-شائعة">مزالق شائعة</h2>
<h3 id="الإغلاقات-القديمة-في-الانتقالات">الإغلاقات القديمة في الانتقالات</h3>
<p>احترس من الإغلاقات (closures) داخل <code>startTransition</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This captures stale values</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// \`someValue\` might be stale if the transition is interrupted</span>
    <span class="hljs-title function_">setResults</span>(<span class="hljs-title function_">processData</span>(someValue));
  });
};

<span class="hljs-comment">// ✅ Get fresh values inside the transition</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setResults</span>(<span class="hljs-function">(<span class="hljs-params">currentResults</span>) =&gt;</span> <span class="hljs-title function_">processData</span>(<span class="hljs-title function_">getCurrentValue</span>()));
  });
};
</code></pre>
<h3 id="الانتقالات-لا-تجعل-الشيفرة-أسرع">الانتقالات لا تجعل الشيفرة أسرع</h3>
<p>لا تُسرّع الانتقالات شيفرتك بسحر — إنها فقط تمنع الشيفرة البطيئة من حجب التحديثات العاجلة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Still slow, just non-blocking</span>
<span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">setResults</span>(<span class="hljs-title function_">reallySlowOperation</span>(data)); <span class="hljs-comment">// This is still slow!</span>
});

<span class="hljs-comment">// ✅ Combine with other optimizations</span>
<span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Use web workers, memoization, virtualization, etc.</span>
  <span class="hljs-title function_">setResults</span>(<span class="hljs-title function_">optimizedOperation</span>(data));
});
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>بعد أن فهمت الانتقالات، أصبحت جاهزًا لبناء تطبيقات React أكثر استجابة. والمفتاح هو تحديد أي التحديثات عاجل (إدخال المستخدم، والتنقّل) وأيها يمكن أن ينتظر (نتائج البحث، وتصوّر البيانات).</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
