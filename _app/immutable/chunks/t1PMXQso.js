const s="kinney",a="react-performance",n="أداء React",l="performance-testing-strategy",p="استراتيجية اختبار الأداء",t=[{depth:2,id:"هرم-اختبار-الأداء",text:"هرم اختبار الأداء"},{depth:2,id:"اختبار-الأداء-على-مستوى-الوحدة",text:"اختبار الأداء على مستوى الوحدة"},{depth:3,id:"أداء-تصيير-المكون",text:"أداء تصيير المكوّن"},{depth:3,id:"أمثلة-على-اختبارات-أداء-المكونات",text:"أمثلة على اختبارات أداء المكوّنات"},{depth:3,id:"اختبار-أداء-الخطافات",text:"اختبار أداء الخُطّافات"},{depth:3,id:"اختبار-استخدام-الذاكرة",text:"اختبار استخدام الذاكرة"},{depth:2,id:"اختبار-الأداء-التكاملي",text:"اختبار الأداء التكاملي"},{depth:3,id:"اختبارات-أداء-تحميل-الصفحة",text:"اختبارات أداء تحميل الصفحة"},{depth:3,id:"اختبارات-أداء-حجم-الحزمة",text:"اختبارات أداء حجم الحزمة"},{depth:2,id:"اختبار-الأداء-من-طرف-إلى-طرف",text:"اختبار الأداء من طرف إلى طرف"},{depth:3,id:"تكامل-lighthouse-ci",text:"تكامل Lighthouse CI"},{depth:3,id:"مجموعة-اختبارات-أداء-مخصصة",text:"مجموعة اختبارات أداء مخصّصة"},{depth:2,id:"المراقبة-المستمرة-للأداء",text:"المراقبة المستمرة للأداء"},{depth:3,id:"كشف-انحدارات-الأداء",text:"كشف انحدارات الأداء"},{depth:2,id:"أفضل-ممارسات-اختبار-الأداء",text:"أفضل ممارسات اختبار الأداء"},{depth:3,id:"إدارة-بيانات-الاختبار",text:"إدارة بيانات الاختبار"},{depth:3,id:"أدوات-مساعدة-لاختبار-الأداء",text:"أدوات مساعدة لاختبار الأداء"}],e=`<p>الأداء بلا اختبارات مجرّد أمنيات. فقد تحسّن مكوّنًا اليوم، لكن من دون اختبار آلي قد تُلغي إضافة ميزة غدًا كل عملك. ولا يقتصر اختبار الأداء على التقاط الانحدارات فحسب — بل يتعلّق بترسيخ الأداء كهمّ من الدرجة الأولى في عملية تطويرك، بما يضمن تقييم كل تغيير في الشيفرة لا من حيث الصحة فقط، بل من حيث أثره في تجربة المستخدم أيضًا.</p>
<p>يكمن التحدّي في اختبار الأداء في React في أن الأداء يتفاوت تفاوتًا هائلًا حسب حجم البيانات وقدرات الجهاز وظروف الشبكة. فمكوّن يصيّر 10 عناصر بسلاسة قد يتوقّف تمامًا مع 1,000 عنصر. وحزمة تُحمَّل فورًا على MacBook Pro قد تنتهي مهلتها على اتصال 3G. واختبار الأداء الفعّال يخلق سيناريوهات واقعية تلتقط هذه المشكلات قبل أن يكتشفها المستخدمون.</p>
<h2 id="هرم-اختبار-الأداء">هرم اختبار الأداء</h2>
<p>مثل هرم الاختبارات الوظيفية تمامًا، لاختبار الأداء طبقات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Performance Testing Pyramid (bottom to top)</span>

<span class="hljs-comment">// 1. Unit Performance Tests (Most tests, fastest feedback)</span>
<span class="hljs-comment">//    - Component render performance</span>
<span class="hljs-comment">//    - Hook performance</span>
<span class="hljs-comment">//    - Utility function performance</span>
<span class="hljs-comment">//    - Memory usage validation</span>

<span class="hljs-comment">// 2. Integration Performance Tests (Fewer tests, broader scope)</span>
<span class="hljs-comment">//    - Page load performance</span>
<span class="hljs-comment">//    - User interaction flows</span>
<span class="hljs-comment">//    - State management performance</span>
<span class="hljs-comment">//    - API integration performance</span>

<span class="hljs-comment">// 3. End-to-End Performance Tests (Fewest tests, most realistic)</span>
<span class="hljs-comment">//    - Real browser performance</span>
<span class="hljs-comment">//    - Network condition simulation</span>
<span class="hljs-comment">//    - Device capability testing</span>
<span class="hljs-comment">//    - Core Web Vitals measurement</span>

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceTestStrategy</span> {
  <span class="hljs-attr">unit</span>: {
    <span class="hljs-attr">tools</span>: [<span class="hljs-string">&#x27;@testing-library/react&#x27;</span>, <span class="hljs-string">&#x27;React DevTools Profiler API&#x27;</span>];
    <span class="hljs-attr">metrics</span>: [<span class="hljs-string">&#x27;render time&#x27;</span>, <span class="hljs-string">&#x27;memory usage&#x27;</span>, <span class="hljs-string">&#x27;re-render count&#x27;</span>];
    <span class="hljs-attr">threshold</span>: <span class="hljs-string">&#x27;&lt; 16ms per component&#x27;</span>;
  };

  <span class="hljs-attr">integration</span>: {
    <span class="hljs-attr">tools</span>: [<span class="hljs-string">&#x27;Puppeteer&#x27;</span>, <span class="hljs-string">&#x27;Playwright&#x27;</span>, <span class="hljs-string">&#x27;Cypress&#x27;</span>];
    <span class="hljs-attr">metrics</span>: [<span class="hljs-string">&#x27;page load time&#x27;</span>, <span class="hljs-string">&#x27;time to interactive&#x27;</span>, <span class="hljs-string">&#x27;bundle size&#x27;</span>];
    <span class="hljs-attr">threshold</span>: <span class="hljs-string">&#x27;&lt; 3s on 3G&#x27;</span>;
  };

  <span class="hljs-attr">e2e</span>: {
    <span class="hljs-attr">tools</span>: [<span class="hljs-string">&#x27;Lighthouse CI&#x27;</span>, <span class="hljs-string">&#x27;WebPageTest&#x27;</span>, <span class="hljs-string">&#x27;Chrome DevTools&#x27;</span>];
    <span class="hljs-attr">metrics</span>: [<span class="hljs-string">&#x27;Core Web Vitals&#x27;</span>, <span class="hljs-string">&#x27;real user metrics&#x27;</span>, <span class="hljs-string">&#x27;business KPIs&#x27;</span>];
    <span class="hljs-attr">threshold</span>: <span class="hljs-string">&#x27;LCP &lt; 2.5s, CLS &lt; 0.1&#x27;</span>;
  };
}
</code></pre>
<h2 id="اختبار-الأداء-على-مستوى-الوحدة">اختبار الأداء على مستوى الوحدة</h2>
<h3 id="أداء-تصيير-المكون">أداء تصيير المكوّن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/performance-test-helpers.ts</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Profiler</span>, <span class="hljs-title class_">ProfilerOnRenderCallback</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RenderMetrics</span> {
  <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">commitTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">actualDuration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">baseDuration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> measureRenderPerformance&lt;T&gt;(
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span>,
  <span class="hljs-attr">testName</span>: <span class="hljs-built_in">string</span>,
): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">RenderMetrics</span>&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">RenderMetrics</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-attr">onRender</span>: <span class="hljs-title class_">ProfilerOnRenderCallback</span> = <span class="hljs-function">(<span class="hljs-params">
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    </span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (phase === <span class="hljs-string">&#x27;mount&#x27;</span> || phase === <span class="hljs-string">&#x27;update&#x27;</span>) {
        metrics = {
          <span class="hljs-attr">renderTime</span>: actualDuration,
          commitTime,
          actualDuration,
          baseDuration,
          startTime,
        };
      }
    };

    <span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Profiler</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{testName}</span> <span class="hljs-attr">onRender</span>=<span class="hljs-string">{onRender}</span>&gt;</span>
        {component}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Profiler</span>&gt;</span></span>,
    );

    <span class="hljs-comment">// Allow React to complete rendering</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>(metrics), <span class="hljs-number">0</span>);
  });
}

<span class="hljs-comment">// Custom Jest matcher for performance assertions</span>
expect.<span class="hljs-title function_">extend</span>({
  <span class="hljs-title function_">toRenderWithinTime</span>(<span class="hljs-params"><span class="hljs-attr">received</span>: <span class="hljs-title class_">RenderMetrics</span>, <span class="hljs-attr">maxTime</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> pass = received.<span class="hljs-property">renderTime</span> &lt;= maxTime;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">message</span>: <span class="hljs-function">() =&gt;</span>
        <span class="hljs-string">\`Expected component to render in <span class="hljs-subst">\${maxTime}</span>ms, but took <span class="hljs-subst">\${received.renderTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
      pass,
    };
  },

  <span class="hljs-title function_">toHaveMaxReRenders</span>(<span class="hljs-params"><span class="hljs-attr">received</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">maxRenders</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> pass = received &lt;= maxRenders;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">message</span>: <span class="hljs-function">() =&gt;</span>
        <span class="hljs-string">\`Expected component to re-render at most <span class="hljs-subst">\${maxRenders}</span> times, but re-rendered <span class="hljs-subst">\${received}</span> times\`</span>,
      pass,
    };
  },
});
</code></pre>
<h3 id="أمثلة-على-اختبارات-أداء-المكونات">أمثلة على اختبارات أداء المكوّنات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/__tests__/UserList.performance.test.tsx</span>
<span class="hljs-keyword">import</span> { measureRenderPerformance } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../utils/performance-test-helpers&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserList</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../UserList&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;UserList Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">generateUsers</span> = (<span class="hljs-params"><span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span></span>) =&gt;
    <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: count }, <span class="hljs-function">(<span class="hljs-params">_, i</span>) =&gt;</span> ({
      <span class="hljs-attr">id</span>: i.<span class="hljs-title function_">toString</span>(),
      <span class="hljs-attr">name</span>: <span class="hljs-string">\`User <span class="hljs-subst">\${i}</span>\`</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">\`user<span class="hljs-subst">\${i}</span>@example.com\`</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;user&#x27;</span>,
    }));

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should render 100 users within 50ms&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> users = <span class="hljs-title function_">generateUsers</span>(<span class="hljs-number">100</span>);

    <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">await</span> <span class="hljs-title function_">measureRenderPerformance</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{users}</span> /&gt;</span></span>,
      <span class="hljs-string">&#x27;UserList-100-items&#x27;</span>,
    );

    <span class="hljs-title function_">expect</span>(metrics).<span class="hljs-title function_">toRenderWithinTime</span>(<span class="hljs-number">50</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle 1000 users without performance degradation&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> users = <span class="hljs-title function_">generateUsers</span>(<span class="hljs-number">1000</span>);

    <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">await</span> <span class="hljs-title function_">measureRenderPerformance</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{users}</span> /&gt;</span></span>,
      <span class="hljs-string">&#x27;UserList-1000-items&#x27;</span>,
    );

    <span class="hljs-comment">// Larger lists should still be reasonable</span>
    <span class="hljs-title function_">expect</span>(metrics).<span class="hljs-title function_">toRenderWithinTime</span>(<span class="hljs-number">200</span>);

    <span class="hljs-comment">// Memory usage shouldn&#x27;t be excessive</span>
    <span class="hljs-title function_">expect</span>(metrics.<span class="hljs-property">baseDuration</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">500</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should minimize re-renders when props change&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> users = <span class="hljs-title function_">generateUsers</span>(<span class="hljs-number">50</span>);
    <span class="hljs-keyword">let</span> renderCount = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">TestWrapper</span> = (<span class="hljs-params">{ extraProp }: { extraProp: <span class="hljs-built_in">string</span> }</span>) =&gt; {
      <span class="hljs-keyword">const</span> <span class="hljs-title function_">onRender</span> = (<span class="hljs-params"></span>) =&gt; {
        renderCount++;
      };

      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Profiler</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;rerender-test&quot;</span> <span class="hljs-attr">onRender</span>=<span class="hljs-string">{onRender}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{users}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Profiler</span>&gt;</span></span>
      );
    };

    <span class="hljs-keyword">const</span> { rerender } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestWrapper</span> <span class="hljs-attr">extraProp</span>=<span class="hljs-string">&quot;initial&quot;</span> /&gt;</span></span>);

    <span class="hljs-comment">// Changing unrelated prop shouldn&#x27;t cause re-render if memoized properly</span>
    <span class="hljs-title function_">rerender</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestWrapper</span> <span class="hljs-attr">extraProp</span>=<span class="hljs-string">&quot;changed&quot;</span> /&gt;</span></span>);

    <span class="hljs-title function_">expect</span>(renderCount).<span class="hljs-title function_">toHaveMaxReRenders</span>(<span class="hljs-number">1</span>);
  });
});
</code></pre>
<h3 id="اختبار-أداء-الخطافات">اختبار أداء الخُطّافات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/__tests__/useExpensiveCalculation.performance.test.ts</span>
<span class="hljs-keyword">import</span> { renderHook } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { performance } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;perf_hooks&#x27;</span>;
<span class="hljs-keyword">import</span> { useExpensiveCalculation } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../useExpensiveCalculation&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;useExpensiveCalculation Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should memoize expensive calculations&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> largeDataset = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">10000</span> }, <span class="hljs-function">(<span class="hljs-params">_, i</span>) =&gt;</span> i);

    <span class="hljs-keyword">const</span> { result, rerender } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> <span class="hljs-title function_">useExpensiveCalculation</span>(data), {
      <span class="hljs-attr">initialProps</span>: { <span class="hljs-attr">data</span>: largeDataset },
    });

    <span class="hljs-comment">// First render - should do the calculation</span>
    <span class="hljs-keyword">const</span> startTime1 = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> result1 = result.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">const</span> endTime1 = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> firstRenderTime = endTime1 - startTime1;

    <span class="hljs-comment">// Second render with same data - should be memoized</span>
    <span class="hljs-keyword">const</span> startTime2 = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-title function_">rerender</span>({ <span class="hljs-attr">data</span>: largeDataset });
    <span class="hljs-keyword">const</span> result2 = result.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">const</span> endTime2 = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> memoizedRenderTime = endTime2 - startTime2;

    <span class="hljs-comment">// Results should be identical (same reference due to memoization)</span>
    <span class="hljs-title function_">expect</span>(result1).<span class="hljs-title function_">toBe</span>(result2);

    <span class="hljs-comment">// Memoized render should be significantly faster</span>
    <span class="hljs-title function_">expect</span>(memoizedRenderTime).<span class="hljs-title function_">toBeLessThan</span>(firstRenderTime * <span class="hljs-number">0.1</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle large datasets efficiently&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> hugeDataset = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">100000</span> }, <span class="hljs-function">(<span class="hljs-params">_, i</span>) =&gt;</span> ({
      <span class="hljs-attr">id</span>: i,
      <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(),
      <span class="hljs-attr">category</span>: i % <span class="hljs-number">10</span>,
    }));

    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">const</span> { result } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">useExpensiveCalculation</span>(hugeDataset));

    <span class="hljs-keyword">const</span> endTime = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> renderTime = endTime - startTime;

    <span class="hljs-comment">// Should complete within reasonable time even for large datasets</span>
    <span class="hljs-title function_">expect</span>(renderTime).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// 100ms threshold</span>
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">current</span>).<span class="hljs-title function_">toBeDefined</span>();
  });
});
</code></pre>
<h3 id="اختبار-استخدام-الذاكرة">اختبار استخدام الذاكرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/memory-test-helpers.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">measureMemoryUsage</span>(<span class="hljs-params"><span class="hljs-attr">testFn</span>: () =&gt; <span class="hljs-built_in">void</span></span>): <span class="hljs-title class_">Promise</span>&lt;{
  <span class="hljs-attr">heapUsedBefore</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">heapUsedAfter</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">heapUsedDelta</span>: <span class="hljs-built_in">number</span>;
}&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    <span class="hljs-comment">// Force garbage collection if available</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">global</span>.<span class="hljs-property">gc</span>) {
      <span class="hljs-variable language_">global</span>.<span class="hljs-title function_">gc</span>();
    }

    <span class="hljs-keyword">const</span> memBefore = process.<span class="hljs-title function_">memoryUsage</span>();

    <span class="hljs-title function_">testFn</span>();

    <span class="hljs-comment">// Allow React to complete all updates</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">global</span>.<span class="hljs-property">gc</span>) {
        <span class="hljs-variable language_">global</span>.<span class="hljs-title function_">gc</span>();
      }

      <span class="hljs-keyword">const</span> memAfter = process.<span class="hljs-title function_">memoryUsage</span>();

      <span class="hljs-title function_">resolve</span>({
        <span class="hljs-attr">heapUsedBefore</span>: memBefore.<span class="hljs-property">heapUsed</span>,
        <span class="hljs-attr">heapUsedAfter</span>: memAfter.<span class="hljs-property">heapUsed</span>,
        <span class="hljs-attr">heapUsedDelta</span>: memAfter.<span class="hljs-property">heapUsed</span> - memBefore.<span class="hljs-property">heapUsed</span>,
      });
    }, <span class="hljs-number">100</span>);
  });
}

<span class="hljs-comment">// Memory leak detection</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MemoryLeakDetector</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">initialMemory</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">samples</span>: <span class="hljs-built_in">number</span>[] = [];

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">global</span>.<span class="hljs-property">gc</span>) <span class="hljs-variable language_">global</span>.<span class="hljs-title function_">gc</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">initialMemory</span> = process.<span class="hljs-title function_">memoryUsage</span>().<span class="hljs-property">heapUsed</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span> = [<span class="hljs-variable language_">this</span>.<span class="hljs-property">initialMemory</span>];
  }

  <span class="hljs-title function_">sample</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">global</span>.<span class="hljs-property">gc</span>) <span class="hljs-variable language_">global</span>.<span class="hljs-title function_">gc</span>();
    <span class="hljs-keyword">const</span> currentMemory = process.<span class="hljs-title function_">memoryUsage</span>().<span class="hljs-property">heapUsed</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-title function_">push</span>(currentMemory);
    <span class="hljs-keyword">return</span> currentMemory;
  }

  <span class="hljs-title function_">detectLeak</span>(<span class="hljs-attr">threshold</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">10</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>): {
    <span class="hljs-attr">hasLeak</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">memoryGrowth</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">samples</span>: <span class="hljs-built_in">number</span>[];
  } {
    <span class="hljs-keyword">const</span> finalMemory = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sample</span>();
    <span class="hljs-keyword">const</span> memoryGrowth = finalMemory - <span class="hljs-variable language_">this</span>.<span class="hljs-property">initialMemory</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hasLeak</span>: memoryGrowth &gt; threshold,
      memoryGrowth,
      <span class="hljs-attr">samples</span>: [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>],
    };
  }
}
</code></pre>
<h2 id="اختبار-الأداء-التكاملي">اختبار الأداء التكاملي</h2>
<h3 id="اختبارات-أداء-تحميل-الصفحة">اختبارات أداء تحميل الصفحة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/integration/page-performance.test.ts</span>
<span class="hljs-keyword">import</span> { chromium, <span class="hljs-title class_">Browser</span>, <span class="hljs-title class_">Page</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;playwright&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Page Performance Integration&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">browser</span>: <span class="hljs-title class_">Browser</span>;
  <span class="hljs-keyword">let</span> <span class="hljs-attr">page</span>: <span class="hljs-title class_">Page</span>;

  <span class="hljs-title function_">beforeAll</span>(<span class="hljs-title function_">async</span> () =&gt; {
    browser = <span class="hljs-keyword">await</span> chromium.<span class="hljs-title function_">launch</span>();
    page = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newPage</span>();

    <span class="hljs-comment">// Simulate slow 3G network</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">setNetworkConditions</span>({
      <span class="hljs-attr">offline</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">downloadThroughput</span>: (<span class="hljs-number">1.6</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>) / <span class="hljs-number">8</span>, <span class="hljs-comment">// 1.6 Mbps</span>
      <span class="hljs-attr">uploadThroughput</span>: (<span class="hljs-number">750</span> * <span class="hljs-number">1024</span>) / <span class="hljs-number">8</span>, <span class="hljs-comment">// 750 Kbps</span>
      <span class="hljs-attr">latency</span>: <span class="hljs-number">150</span>, <span class="hljs-comment">// 150ms RTT</span>
    });
  });

  <span class="hljs-title function_">afterAll</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">close</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should load homepage within 3 seconds on 3G&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> startTime = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>, {
      <span class="hljs-attr">waitUntil</span>: <span class="hljs-string">&#x27;networkidle&#x27;</span>,
    });

    <span class="hljs-keyword">const</span> loadTime = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - startTime;

    <span class="hljs-title function_">expect</span>(loadTime).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">3000</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should achieve good Core Web Vitals scores&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>);

    <span class="hljs-comment">// Collect Web Vitals</span>
    <span class="hljs-keyword">const</span> webVitals = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">vitals</span>: <span class="hljs-built_in">any</span> = {};

        <span class="hljs-comment">// LCP</span>
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
          vitals.<span class="hljs-property">lcp</span> = entries[entries.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>]?.<span class="hljs-property">startTime</span>;
        }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>] });

        <span class="hljs-comment">// FID</span>
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
          <span class="hljs-keyword">if</span> (entries.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
            vitals.<span class="hljs-property">fid</span> = entries[<span class="hljs-number">0</span>].<span class="hljs-property">processingStart</span> - entries[<span class="hljs-number">0</span>].<span class="hljs-property">startTime</span>;
          }
        }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;first-input&#x27;</span>] });

        <span class="hljs-comment">// CLS</span>
        <span class="hljs-keyword">let</span> clsValue = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
            <span class="hljs-keyword">if</span> (!(entry <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">hadRecentInput</span>) {
              clsValue += (entry <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">value</span>;
            }
          }
          vitals.<span class="hljs-property">cls</span> = clsValue;
        }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;layout-shift&#x27;</span>] });

        <span class="hljs-comment">// Resolve after collecting metrics</span>
        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>(vitals), <span class="hljs-number">5000</span>);
      });
    });

    <span class="hljs-title function_">expect</span>((webVitals <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">lcp</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">2500</span>); <span class="hljs-comment">// 2.5s</span>
    <span class="hljs-title function_">expect</span>((webVitals <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">cls</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">0.1</span>); <span class="hljs-comment">// 0.1</span>
    <span class="hljs-keyword">if</span> ((webVitals <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">fid</span>) {
      <span class="hljs-title function_">expect</span>((webVitals <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">fid</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// 100ms</span>
    }
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle user interactions within 200ms&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;http://localhost:3000/dashboard&#x27;</span>);

    <span class="hljs-comment">// Measure interaction response time</span>
    <span class="hljs-keyword">const</span> button = page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;[data-testid=&quot;load-more-button&quot;]&#x27;</span>);

    <span class="hljs-keyword">const</span> startTime = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">await</span> button.<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Wait for visual feedback (loading state or content update)</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForSelector</span>(<span class="hljs-string">&#x27;[data-testid=&quot;loading-indicator&quot;]&#x27;</span>, {
      <span class="hljs-attr">timeout</span>: <span class="hljs-number">1000</span>,
    });

    <span class="hljs-keyword">const</span> responseTime = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - startTime;

    <span class="hljs-title function_">expect</span>(responseTime).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">200</span>);
  });
});
</code></pre>
<h3 id="اختبارات-أداء-حجم-الحزمة">اختبارات أداء حجم الحزمة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/integration/bundle-performance.test.ts</span>
<span class="hljs-keyword">import</span> { exec } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;child_process&#x27;</span>;
<span class="hljs-keyword">import</span> { promisify } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;util&#x27;</span>;
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs/promises&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">const</span> execAsync = <span class="hljs-title function_">promisify</span>(exec);

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Bundle Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should stay within bundle size limits&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Build the application</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">execAsync</span>(<span class="hljs-string">&#x27;npm run build&#x27;</span>);

    <span class="hljs-comment">// Analyze bundle sizes</span>
    <span class="hljs-keyword">const</span> distPath = path.<span class="hljs-title function_">join</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;dist&#x27;</span>);
    <span class="hljs-keyword">const</span> files = <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">readdir</span>(distPath);

    <span class="hljs-keyword">const</span> bundles = {
      <span class="hljs-attr">main</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">vendor</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
    };

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> file <span class="hljs-keyword">of</span> files) {
      <span class="hljs-keyword">if</span> (file.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.js&#x27;</span>) &amp;&amp; !file.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.map&#x27;</span>)) {
        <span class="hljs-keyword">const</span> filePath = path.<span class="hljs-title function_">join</span>(distPath, file);
        <span class="hljs-keyword">const</span> stats = <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">stat</span>(filePath);

        bundles.<span class="hljs-property">total</span> += stats.<span class="hljs-property">size</span>;

        <span class="hljs-keyword">if</span> (file.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;main&#x27;</span>)) {
          bundles.<span class="hljs-property">main</span> += stats.<span class="hljs-property">size</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (file.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;vendor&#x27;</span>)) {
          bundles.<span class="hljs-property">vendor</span> += stats.<span class="hljs-property">size</span>;
        }
      }
    }

    <span class="hljs-comment">// Bundle size assertions</span>
    <span class="hljs-title function_">expect</span>(bundles.<span class="hljs-property">main</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">300</span> * <span class="hljs-number">1024</span>); <span class="hljs-comment">// 300KB</span>
    <span class="hljs-title function_">expect</span>(bundles.<span class="hljs-property">vendor</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">200</span> * <span class="hljs-number">1024</span>); <span class="hljs-comment">// 200KB</span>
    <span class="hljs-title function_">expect</span>(bundles.<span class="hljs-property">total</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">500</span> * <span class="hljs-number">1024</span>); <span class="hljs-comment">// 500KB total</span>
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not have bundle size regression &gt; 5%&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> previousSizesPath = <span class="hljs-string">&#x27;.bundle-sizes.json&#x27;</span>;

    <span class="hljs-keyword">let</span> previousSizes;
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">readFile</span>(previousSizesPath, <span class="hljs-string">&#x27;utf8&#x27;</span>);
      previousSizes = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(data);
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-comment">// No previous sizes - this is the first run</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;No previous bundle sizes found - skipping regression test&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> currentSizes = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getCurrentBundleSizes</span>();

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [bundle, currentSize] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(currentSizes)) {
      <span class="hljs-keyword">const</span> previousSize = previousSizes[bundle];
      <span class="hljs-keyword">if</span> (!previousSize) <span class="hljs-keyword">continue</span>;

      <span class="hljs-keyword">const</span> growth = (currentSize - previousSize) / previousSize;

      <span class="hljs-title function_">expect</span>(growth).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">0.05</span>); <span class="hljs-comment">// Max 5% growth</span>
    }

    <span class="hljs-comment">// Save current sizes for next run</span>
    <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">writeFile</span>(previousSizesPath, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(currentSizes, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
  });
});
</code></pre>
<h2 id="اختبار-الأداء-من-طرف-إلى-طرف">اختبار الأداء من طرف إلى طرف</h2>
<h3 id="تكامل-lighthouse-ci">تكامل Lighthouse CI</h3>
<p>للاطلاع على إعداد شامل لخط أنابيب CI/CD بما في ذلك ميزانيات الأداء، راجع <a href="https://stevekinney.com/courses/react-performance/performance-budgets-and-automation">performance-budgets-and-automation.md</a>.</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/performance.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">Performance</span> <span class="hljs-string">Testing</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">lighthouse:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v3</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Setup</span> <span class="hljs-string">Node.js</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v3</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-string">&#x27;18&#x27;</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">&#x27;npm&#x27;</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Build</span> <span class="hljs-string">application</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">build</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Start</span> <span class="hljs-string">server</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">serve</span> <span class="hljs-string">&amp;</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Wait</span> <span class="hljs-string">for</span> <span class="hljs-string">server</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">wait-on</span> <span class="hljs-string">http://localhost:3000</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">Lighthouse</span> <span class="hljs-string">CI</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">|
          npm install -g @lhci/cli
          lhci autorun
</span>        <span class="hljs-attr">env:</span>
          <span class="hljs-attr">LHCI_GITHUB_APP_TOKEN:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.LHCI_GITHUB_APP_TOKEN</span> <span class="hljs-string">}}</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">Lighthouse</span> <span class="hljs-string">results</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v3</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">name:</span> <span class="hljs-string">lighthouse-results</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">.lighthouseci</span>
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// lighthouserc.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">ci</span>: {
    <span class="hljs-attr">collect</span>: {
      <span class="hljs-attr">url</span>: [
        <span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>,
        <span class="hljs-string">&#x27;http://localhost:3000/dashboard&#x27;</span>,
        <span class="hljs-string">&#x27;http://localhost:3000/profile&#x27;</span>,
      ],
      <span class="hljs-attr">numberOfRuns</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">settings</span>: {
        <span class="hljs-comment">// Simulate mobile device</span>
        <span class="hljs-attr">emulatedFormFactor</span>: <span class="hljs-string">&#x27;mobile&#x27;</span>,
        <span class="hljs-comment">// Throttle network to slow 3G</span>
        <span class="hljs-attr">throttlingMethod</span>: <span class="hljs-string">&#x27;simulate&#x27;</span>,
        <span class="hljs-attr">throttling</span>: {
          <span class="hljs-attr">rttMs</span>: <span class="hljs-number">300</span>,
          <span class="hljs-attr">throughputKbps</span>: <span class="hljs-number">1638.4</span>,
          <span class="hljs-attr">cpuSlowdownMultiplier</span>: <span class="hljs-number">4</span>,
        },
      },
    },

    <span class="hljs-attr">assert</span>: {
      <span class="hljs-attr">assertions</span>: {
        <span class="hljs-comment">// Performance thresholds</span>
        <span class="hljs-string">&#x27;categories:performance&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.8</span> }],
        <span class="hljs-string">&#x27;categories:accessibility&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.9</span> }],

        <span class="hljs-comment">// Core Web Vitals</span>
        <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">2000</span> }],
        <span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">2500</span> }],
        <span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">0.1</span> }],
        <span class="hljs-string">&#x27;total-blocking-time&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">300</span> }],

        <span class="hljs-comment">// Resource budgets</span>
        <span class="hljs-string">&#x27;resource-summary:script:size&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">300000</span> }],
        <span class="hljs-string">&#x27;resource-summary:stylesheet:size&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">50000</span> }],
        <span class="hljs-string">&#x27;resource-summary:image:size&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">500000</span> }],
        <span class="hljs-string">&#x27;resource-summary:total:count&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">50</span> }],
      },
    },

    <span class="hljs-attr">upload</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;temporary-public-storage&#x27;</span>,
    },
  },
};
</code></pre>
<h3 id="مجموعة-اختبارات-أداء-مخصصة">مجموعة اختبارات أداء مخصّصة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/e2e/performance-suite.ts</span>
<span class="hljs-keyword">import</span> { chromium, <span class="hljs-title class_">Browser</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;playwright&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-attr">navigationTiming</span>: <span class="hljs-title class_">PerformanceNavigationTiming</span>;
  <span class="hljs-attr">resourceTiming</span>: <span class="hljs-title class_">PerformanceResourceTiming</span>[];
  <span class="hljs-attr">paintTiming</span>: <span class="hljs-title class_">PerformanceEntry</span>[];
  <span class="hljs-attr">webVitals</span>: {
    <span class="hljs-attr">lcp</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">fid</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">cls</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">fcp</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">ttfb</span>: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceTestSuite</span> {
  <span class="hljs-keyword">private</span> browser!: <span class="hljs-title class_">Browser</span>;

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">browser</span> = <span class="hljs-keyword">await</span> chromium.<span class="hljs-title function_">launch</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">teardown</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">browser</span>.<span class="hljs-title function_">close</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">runPerformanceTest</span>(
    <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">options</span>?: {
      <span class="hljs-attr">device</span>?: <span class="hljs-string">&#x27;mobile&#x27;</span> | <span class="hljs-string">&#x27;desktop&#x27;</span>;
      <span class="hljs-attr">network</span>?: <span class="hljs-string">&#x27;fast3G&#x27;</span> | <span class="hljs-string">&#x27;slow3G&#x27;</span> | <span class="hljs-string">&#x27;offline&#x27;</span>;
      <span class="hljs-attr">iterations</span>?: <span class="hljs-built_in">number</span>;
    },
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>[]&gt; {
    <span class="hljs-keyword">const</span> iterations = options?.<span class="hljs-property">iterations</span> || <span class="hljs-number">3</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-attr">results</span>: <span class="hljs-title class_">PerformanceMetrics</span>[] = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
      <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">browser</span>.<span class="hljs-title function_">newContext</span>({
        <span class="hljs-comment">// Device simulation</span>
        ...(options?.<span class="hljs-property">device</span> === <span class="hljs-string">&#x27;mobile&#x27;</span> &amp;&amp; {
          <span class="hljs-attr">viewport</span>: { <span class="hljs-attr">width</span>: <span class="hljs-number">375</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">667</span> },
          <span class="hljs-attr">userAgent</span>: <span class="hljs-string">&#x27;Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)&#x27;</span>,
        }),
      });

      <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();

      <span class="hljs-comment">// Network throttling</span>
      <span class="hljs-keyword">if</span> (options?.<span class="hljs-property">network</span>) {
        <span class="hljs-keyword">const</span> networkProfiles = {
          <span class="hljs-attr">fast3G</span>: { <span class="hljs-attr">download</span>: <span class="hljs-number">1600</span>, <span class="hljs-attr">upload</span>: <span class="hljs-number">750</span>, <span class="hljs-attr">latency</span>: <span class="hljs-number">150</span> },
          <span class="hljs-attr">slow3G</span>: { <span class="hljs-attr">download</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">upload</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">latency</span>: <span class="hljs-number">300</span> },
        };

        <span class="hljs-keyword">const</span> profile = networkProfiles[options.<span class="hljs-property">network</span>];
        <span class="hljs-keyword">if</span> (profile) {
          <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">setOffline</span>(<span class="hljs-literal">false</span>);
          <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">setNetworkConditions</span>(profile);
        }
      }

      <span class="hljs-comment">// Navigate and collect metrics</span>
      <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(url, { <span class="hljs-attr">waitUntil</span>: <span class="hljs-string">&#x27;networkidle&#x27;</span> });

      <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt;(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> <span class="hljs-attr">webVitals</span>: <span class="hljs-built_in">any</span> = {};
          <span class="hljs-keyword">let</span> observersCompleted = <span class="hljs-number">0</span>;
          <span class="hljs-keyword">const</span> totalObservers = <span class="hljs-number">4</span>;

          <span class="hljs-keyword">function</span> <span class="hljs-title function_">checkCompletion</span>(<span class="hljs-params"></span>) {
            observersCompleted++;
            <span class="hljs-keyword">if</span> (observersCompleted === totalObservers) {
              <span class="hljs-title function_">resolve</span>({
                <span class="hljs-attr">navigationTiming</span>: performance.<span class="hljs-title function_">getEntriesByType</span>(
                  <span class="hljs-string">&#x27;navigation&#x27;</span>,
                )[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceNavigationTiming</span>,
                <span class="hljs-attr">resourceTiming</span>: performance.<span class="hljs-title function_">getEntriesByType</span>(
                  <span class="hljs-string">&#x27;resource&#x27;</span>,
                ) <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceResourceTiming</span>[],
                <span class="hljs-attr">paintTiming</span>: performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;paint&#x27;</span>),
                webVitals,
              });
            }
          }

          <span class="hljs-comment">// Largest Contentful Paint</span>
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
            webVitals.<span class="hljs-property">lcp</span> = entries[entries.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>]?.<span class="hljs-property">startTime</span> || <span class="hljs-number">0</span>;
            <span class="hljs-title function_">checkCompletion</span>();
          }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>] });

          <span class="hljs-comment">// First Input Delay</span>
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
            <span class="hljs-keyword">if</span> (entries.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
              webVitals.<span class="hljs-property">fid</span> = entries[<span class="hljs-number">0</span>].<span class="hljs-property">processingStart</span> - entries[<span class="hljs-number">0</span>].<span class="hljs-property">startTime</span>;
            }
            <span class="hljs-title function_">checkCompletion</span>();
          }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;first-input&#x27;</span>] });

          <span class="hljs-comment">// Cumulative Layout Shift</span>
          <span class="hljs-keyword">let</span> clsValue = <span class="hljs-number">0</span>;
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
              <span class="hljs-keyword">if</span> (!(entry <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">hadRecentInput</span>) {
                clsValue += (entry <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">value</span>;
              }
            }
            webVitals.<span class="hljs-property">cls</span> = clsValue;
            <span class="hljs-title function_">checkCompletion</span>();
          }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;layout-shift&#x27;</span>] });

          <span class="hljs-comment">// Paint timing</span>
          <span class="hljs-keyword">const</span> paintEntries = performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;paint&#x27;</span>);
          webVitals.<span class="hljs-property">fcp</span> =
            paintEntries.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> entry.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>)?.<span class="hljs-property">startTime</span> || <span class="hljs-number">0</span>;
          webVitals.<span class="hljs-property">ttfb</span> =
            (performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;navigation&#x27;</span>)[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceNavigationTiming</span>)
              ?.<span class="hljs-property">responseStart</span> || <span class="hljs-number">0</span>;
          <span class="hljs-title function_">checkCompletion</span>();

          <span class="hljs-comment">// Timeout after 10 seconds</span>
          <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
            <span class="hljs-keyword">if</span> (observersCompleted &lt; totalObservers) {
              <span class="hljs-title function_">checkCompletion</span>();
            }
          }, <span class="hljs-number">10000</span>);
        });
      });

      results.<span class="hljs-title function_">push</span>(metrics);
      <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">close</span>();

      <span class="hljs-comment">// Wait between iterations</span>
      <span class="hljs-keyword">if</span> (i &lt; iterations - <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">1000</span>));
      }
    }

    <span class="hljs-keyword">return</span> results;
  }

  <span class="hljs-title function_">analyzeResults</span>(<span class="hljs-params"><span class="hljs-attr">results</span>: <span class="hljs-title class_">PerformanceMetrics</span>[]</span>) {
    <span class="hljs-keyword">const</span> metrics = results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">webVitals</span>);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">lcp</span>: {
        <span class="hljs-attr">median</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMedian</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">lcp</span>)),
        <span class="hljs-attr">p95</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentile</span>(
          metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">lcp</span>),
          <span class="hljs-number">95</span>,
        ),
        <span class="hljs-attr">average</span>: metrics.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">lcp</span>, <span class="hljs-number">0</span>) / metrics.<span class="hljs-property">length</span>,
      },
      <span class="hljs-attr">cls</span>: {
        <span class="hljs-attr">median</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMedian</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">cls</span>)),
        <span class="hljs-attr">p95</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentile</span>(
          metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">cls</span>),
          <span class="hljs-number">95</span>,
        ),
        <span class="hljs-attr">average</span>: metrics.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">cls</span>, <span class="hljs-number">0</span>) / metrics.<span class="hljs-property">length</span>,
      },
      <span class="hljs-attr">fcp</span>: {
        <span class="hljs-attr">median</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMedian</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">fcp</span>)),
        <span class="hljs-attr">p95</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentile</span>(
          metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">fcp</span>),
          <span class="hljs-number">95</span>,
        ),
        <span class="hljs-attr">average</span>: metrics.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">fcp</span>, <span class="hljs-number">0</span>) / metrics.<span class="hljs-property">length</span>,
      },
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculateMedian</span>(<span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[]): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = values.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> mid = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>);

    <span class="hljs-keyword">return</span> sorted.<span class="hljs-property">length</span> % <span class="hljs-number">2</span> !== <span class="hljs-number">0</span> ? sorted[mid] : (sorted[mid - <span class="hljs-number">1</span>] + sorted[mid]) / <span class="hljs-number">2</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculatePercentile</span>(<span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">percentile</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = values.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>((percentile / <span class="hljs-number">100</span>) * sorted.<span class="hljs-property">length</span>) - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> sorted[index];
  }
}

<span class="hljs-comment">// Usage in tests</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;E2E Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">testSuite</span>: <span class="hljs-title class_">PerformanceTestSuite</span>;

  <span class="hljs-title function_">beforeAll</span>(<span class="hljs-title function_">async</span> () =&gt; {
    testSuite = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceTestSuite</span>();
    <span class="hljs-keyword">await</span> testSuite.<span class="hljs-title function_">setup</span>();
  });

  <span class="hljs-title function_">afterAll</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> testSuite.<span class="hljs-title function_">teardown</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should meet performance targets on mobile 3G&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> testSuite.<span class="hljs-title function_">runPerformanceTest</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>, {
      <span class="hljs-attr">device</span>: <span class="hljs-string">&#x27;mobile&#x27;</span>,
      <span class="hljs-attr">network</span>: <span class="hljs-string">&#x27;fast3G&#x27;</span>,
      <span class="hljs-attr">iterations</span>: <span class="hljs-number">5</span>,
    });

    <span class="hljs-keyword">const</span> analysis = testSuite.<span class="hljs-title function_">analyzeResults</span>(results);

    <span class="hljs-title function_">expect</span>(analysis.<span class="hljs-property">lcp</span>.<span class="hljs-property">median</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">2500</span>);
    <span class="hljs-title function_">expect</span>(analysis.<span class="hljs-property">cls</span>.<span class="hljs-property">p95</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">0.1</span>);
    <span class="hljs-title function_">expect</span>(analysis.<span class="hljs-property">fcp</span>.<span class="hljs-property">median</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">1800</span>);
  });
});
</code></pre>
<h2 id="المراقبة-المستمرة-للأداء">المراقبة المستمرة للأداء</h2>
<h3 id="كشف-انحدارات-الأداء">كشف انحدارات الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// scripts/performance-regression-check.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceBaseline</span> {
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">commit</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">metrics</span>: {
    <span class="hljs-attr">lcp</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">cls</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">fcp</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">bundleSize</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceRegressionDetector</span> {
  <span class="hljs-keyword">private</span> baselinePath = <span class="hljs-string">&#x27;./performance-baseline.json&#x27;</span>;

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">checkForRegressions</span>(<span class="hljs-attr">currentMetrics</span>: <span class="hljs-title class_">PerformanceBaseline</span>[<span class="hljs-string">&#x27;metrics&#x27;</span>]): <span class="hljs-title class_">Promise</span>&lt;{
    <span class="hljs-attr">hasRegressions</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">regressions</span>: <span class="hljs-title class_">Array</span>&lt;{
      <span class="hljs-attr">metric</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">current</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">baseline</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">regression</span>: <span class="hljs-built_in">number</span>;
    }&gt;;
  }&gt; {
    <span class="hljs-keyword">const</span> baseline = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getBaseline</span>();
    <span class="hljs-keyword">if</span> (!baseline) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;No baseline found - establishing new baseline&#x27;</span>);
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">saveBaseline</span>(currentMetrics);
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">hasRegressions</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">regressions</span>: [] };
    }

    <span class="hljs-keyword">const</span> regressions = [];
    <span class="hljs-keyword">const</span> thresholds = {
      <span class="hljs-attr">lcp</span>: <span class="hljs-number">0.1</span>, <span class="hljs-comment">// 10% regression threshold</span>
      <span class="hljs-attr">cls</span>: <span class="hljs-number">0.05</span>, <span class="hljs-comment">// 5% regression threshold</span>
      <span class="hljs-attr">fcp</span>: <span class="hljs-number">0.1</span>, <span class="hljs-comment">// 10% regression threshold</span>
      <span class="hljs-attr">bundleSize</span>: <span class="hljs-number">0.05</span>, <span class="hljs-comment">// 5% regression threshold</span>
      <span class="hljs-attr">renderTime</span>: <span class="hljs-number">0.2</span>, <span class="hljs-comment">// 20% regression threshold</span>
    };

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [metric, threshold] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(thresholds)) {
      <span class="hljs-keyword">const</span> current = currentMetrics[metric <span class="hljs-keyword">as</span> keyof <span class="hljs-keyword">typeof</span> currentMetrics];
      <span class="hljs-keyword">const</span> baselineValue = baseline.<span class="hljs-property">metrics</span>[metric <span class="hljs-keyword">as</span> keyof <span class="hljs-keyword">typeof</span> baseline.<span class="hljs-property">metrics</span>];

      <span class="hljs-keyword">const</span> regression = (current - baselineValue) / baselineValue;

      <span class="hljs-keyword">if</span> (regression &gt; threshold) {
        regressions.<span class="hljs-title function_">push</span>({
          metric,
          current,
          <span class="hljs-attr">baseline</span>: baselineValue,
          regression,
        });
      }
    }

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hasRegressions</span>: regressions.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>,
      regressions,
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">saveBaseline</span>(<span class="hljs-params"><span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceBaseline</span>[<span class="hljs-string">&#x27;metrics&#x27;</span>]</span>) {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">baseline</span>: <span class="hljs-title class_">PerformanceBaseline</span> = {
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      <span class="hljs-attr">commit</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GITHUB_SHA</span> || <span class="hljs-string">&#x27;local&#x27;</span>,
      metrics,
    };

    <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">writeFile</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">baselinePath</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(baseline, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">getBaseline</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">PerformanceBaseline</span> | <span class="hljs-literal">null</span>&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">readFile</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">baselinePath</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(data);
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
  }
}
</code></pre>
<h2 id="أفضل-ممارسات-اختبار-الأداء">أفضل ممارسات اختبار الأداء</h2>
<h3 id="إدارة-بيانات-الاختبار">إدارة بيانات الاختبار</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/performance-test-data.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceTestDataGenerator</span> {
  <span class="hljs-keyword">static</span> <span class="hljs-title function_">generateUsers</span>(<span class="hljs-params"><span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: count }, <span class="hljs-function">(<span class="hljs-params">_, i</span>) =&gt;</span> ({
      <span class="hljs-attr">id</span>: i.<span class="hljs-title function_">toString</span>(),
      <span class="hljs-attr">name</span>: <span class="hljs-string">\`User <span class="hljs-subst">\${i}</span>\`</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">\`user<span class="hljs-subst">\${i}</span>@example.com\`</span>,
      <span class="hljs-attr">avatar</span>: <span class="hljs-string">\`https://api.dicebear.com/6.x/personas/svg?seed=<span class="hljs-subst">\${i}</span>\`</span>,
      <span class="hljs-attr">role</span>: [<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-string">&#x27;moderator&#x27;</span>][i % <span class="hljs-number">3</span>],
      <span class="hljs-attr">lastSeen</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">30</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>),
      <span class="hljs-attr">posts</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>),
      <span class="hljs-attr">followers</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">1000</span>),
    }));
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">generateLargeDataset</span>(<span class="hljs-params"><span class="hljs-attr">rows</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">columns</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: rows }, <span class="hljs-function">(<span class="hljs-params">_, rowIndex</span>) =&gt;</span>
      <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: columns }, <span class="hljs-function">(<span class="hljs-params">_, colIndex</span>) =&gt;</span> ({
        <span class="hljs-attr">id</span>: <span class="hljs-string">\`<span class="hljs-subst">\${rowIndex}</span>-<span class="hljs-subst">\${colIndex}</span>\`</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">1000</span>,
        <span class="hljs-attr">category</span>: <span class="hljs-string">\`Category <span class="hljs-subst">\${colIndex}</span>\`</span>,
        <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">365</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>),
      })),
    );
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">generateDeepNestedData</span>(<span class="hljs-attr">depth</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">breadth</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">if</span> (depth === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">id</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(<span class="hljs-number">36</span>),
        <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">\`Item <span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1000</span>)}</span>\`</span>,
      };
    }

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(<span class="hljs-number">36</span>),
      <span class="hljs-attr">children</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: breadth }, <span class="hljs-function">() =&gt;</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateDeepNestedData</span>(depth - <span class="hljs-number">1</span>, breadth),
      ),
    };
  }
}
</code></pre>
<h3 id="أدوات-مساعدة-لاختبار-الأداء">أدوات مساعدة لاختبار الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/performance-assertions.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">expectPerformanceWithin</span>(<span class="hljs-params"><span class="hljs-attr">actual</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">expected</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">tolerance</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0.1</span></span>) {
  <span class="hljs-keyword">const</span> lowerBound = expected * (<span class="hljs-number">1</span> - tolerance);
  <span class="hljs-keyword">const</span> upperBound = expected * (<span class="hljs-number">1</span> + tolerance);

  <span class="hljs-title function_">expect</span>(actual).<span class="hljs-title function_">toBeGreaterThanOrEqual</span>(lowerBound);
  <span class="hljs-title function_">expect</span>(actual).<span class="hljs-title function_">toBeLessThanOrEqual</span>(upperBound);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">expectNoMemoryLeak</span>(<span class="hljs-params">
  <span class="hljs-attr">initialMemory</span>: <span class="hljs-built_in">number</span>,
  <span class="hljs-attr">finalMemory</span>: <span class="hljs-built_in">number</span>,
  <span class="hljs-attr">threshold</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">10</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment">// 10MB</span>
</span>) {
  <span class="hljs-keyword">const</span> memoryGrowth = finalMemory - initialMemory;
  <span class="hljs-title function_">expect</span>(memoryGrowth).<span class="hljs-title function_">toBeLessThan</span>(threshold);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">expectBundleSizeWithinBudget</span>(<span class="hljs-params"><span class="hljs-attr">actualSize</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">budget</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-title function_">expect</span>(actualSize).<span class="hljs-title function_">toBeLessThan</span>(budget);
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
