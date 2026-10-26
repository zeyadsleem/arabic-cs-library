const s="kinney",a="react-performance",n="أداء React",l="performance-budgets-and-automation",p="ميزانيات الأداء والأتمتة",t=[{depth:2,id:"فهم-ميزانيات-الأداء",text:"فهم ميزانيات الأداء"},{depth:2,id:"وضع-ميزانيات-واقعية",text:"وضع ميزانيات واقعية"},{depth:3,id:"قياس-خط-الأساس",text:"قياس خط الأساس"},{depth:2,id:"تحليل-الحزم-والميزانيات-في-webpack",text:"تحليل الحزم والميزانيات في Webpack"},{depth:3,id:"تهيئة-webpack",text:"تهيئة Webpack"},{depth:3,id:"إضافة-مخصصة-لفرض-الميزانيات",text:"إضافة مخصّصة لفرض الميزانيات"},{depth:2,id:"التكامل-مع-cicd",text:"التكامل مع CI/CD"},{depth:3,id:"سير-عمل-github-actions",text:"سير عمل GitHub Actions"},{depth:3,id:"تهيئة-lighthouse-ci",text:"تهيئة Lighthouse CI"},{depth:2,id:"مراقبة-الأداء-أثناء-التشغيل",text:"مراقبة الأداء أثناء التشغيل"},{depth:2,id:"اختبار-الأداء-الآلي",text:"اختبار الأداء الآلي"},{depth:3,id:"اختبارات-الأداء-باستخدام-jest",text:"اختبارات الأداء باستخدام Jest"},{depth:3,id:"اختبارات-الأداء-من-طرف-إلى-طرف-باستخدام-playwright",text:"اختبارات الأداء من طرف إلى طرف باستخدام Playwright"},{depth:2,id:"تتبع-حجم-الحزمة",text:"تتبّع حجم الحزمة"},{depth:3,id:"تهيئة-حد-الحجم",text:"تهيئة حدّ الحجم"},{depth:3,id:"سكربتات-npm",text:"سكربتات NPM"},{depth:2,id:"دمج-لوحة-معلومات-الأداء",text:"دمج لوحة معلومات الأداء"}],e=`<p>تحسين الأداء بلا ميزانيات أشبه بحمية غذائية بلا ميزان — قد تشعر بأنك تحرز تقدمًا، لكنك لا تعرف على وجه اليقين إن كنت تنجح فعلًا. تحوّل ميزانيات الأداء أهدافًا غامضة مثل «اجعله أسرع» إلى أهداف ملموسة قابلة للقياس مثل «أبقِ الحزمة تحت 200KB» و«تأكّد من بقاء LCP دون 2.5 ثانية». لكن الميزانيات وحدها لا تكفي — فأنت تحتاج إلى أتمتة تفرضها، فتلقط انحدارات الأداء قبل وصولها إلى الإنتاج.</p>
<p>يوضّح لك هذا الدليل كيف تضع ميزانيات أداء واقعية لتطبيقات React، وكيف تنفّذ اختبارات آلية تفرض هذه الميزانيات في خط CI/CD لديك، وكيف تنشئ ثقافة يكون فيها الأداء ميزة، لا فكرة متأخّرة. وستتعلّم كيف تلتقط إضافة مكتبة بحجم 50KB في مراجعة طلب السحب، وكيف تمنع خوارزمية بترتيب O(n²) من الوصول إلى الفرع main، وكيف تنام مطمئنًا لأن تطبيقك لن يصير بطيئًا فجأة.</p>
<h2 id="فهم-ميزانيات-الأداء">فهم ميزانيات الأداء</h2>
<p>ميزانيات الأداء قيود تفرضها على مقاييس متنوّعة تؤثّر في تجربة المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Types of performance budgets</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceBudgets</span> {
  <span class="hljs-comment">// Bundle size budgets</span>
  <span class="hljs-attr">bundle</span>: {
    <span class="hljs-attr">mainJS</span>: <span class="hljs-string">&#x27;200KB&#x27;</span>; <span class="hljs-comment">// Main bundle size</span>
    <span class="hljs-attr">mainCSS</span>: <span class="hljs-string">&#x27;50KB&#x27;</span>; <span class="hljs-comment">// CSS bundle size</span>
    <span class="hljs-attr">totalInitial</span>: <span class="hljs-string">&#x27;300KB&#x27;</span>; <span class="hljs-comment">// Total initial load</span>
    <span class="hljs-attr">chunkSize</span>: <span class="hljs-string">&#x27;50KB&#x27;</span>; <span class="hljs-comment">// Max lazy-loaded chunk</span>
    <span class="hljs-attr">increase</span>: <span class="hljs-string">&#x27;5%&#x27;</span>; <span class="hljs-comment">// Max increase per PR</span>
  };

  <span class="hljs-comment">// Loading performance budgets</span>
  <span class="hljs-attr">loading</span>: {
    <span class="hljs-attr">fcp</span>: <span class="hljs-number">1800</span>; <span class="hljs-comment">// First Contentful Paint (ms)</span>
    <span class="hljs-attr">lcp</span>: <span class="hljs-number">2500</span>; <span class="hljs-comment">// Largest Contentful Paint (ms)</span>
    <span class="hljs-attr">tti</span>: <span class="hljs-number">3800</span>; <span class="hljs-comment">// Time to Interactive (ms)</span>
    <span class="hljs-attr">fid</span>: <span class="hljs-number">100</span>; <span class="hljs-comment">// First Input Delay (ms)</span>
    <span class="hljs-attr">cls</span>: <span class="hljs-number">0.1</span>; <span class="hljs-comment">// Cumulative Layout Shift</span>
  };

  <span class="hljs-comment">// Runtime performance budgets</span>
  <span class="hljs-attr">runtime</span>: {
    <span class="hljs-attr">componentRender</span>: <span class="hljs-number">16</span>; <span class="hljs-comment">// Max render time (ms)</span>
    <span class="hljs-attr">stateUpdate</span>: <span class="hljs-number">100</span>; <span class="hljs-comment">// Max state update (ms)</span>
    <span class="hljs-attr">animation</span>: <span class="hljs-number">16</span>; <span class="hljs-comment">// Animation frame budget (ms)</span>
    <span class="hljs-attr">memoryIncrease</span>: <span class="hljs-string">&#x27;10MB&#x27;</span>; <span class="hljs-comment">// Max memory growth per session</span>
  };

  <span class="hljs-comment">// Network budgets</span>
  <span class="hljs-attr">network</span>: {
    <span class="hljs-attr">requests</span>: <span class="hljs-number">50</span>; <span class="hljs-comment">// Max parallel requests</span>
    <span class="hljs-attr">apiResponse</span>: <span class="hljs-number">1000</span>; <span class="hljs-comment">// Max API response time (ms)</span>
    <span class="hljs-attr">totalTransfer</span>: <span class="hljs-string">&#x27;1MB&#x27;</span>; <span class="hljs-comment">// Total network transfer</span>
    <span class="hljs-attr">cacheRatio</span>: <span class="hljs-number">0.8</span>; <span class="hljs-comment">// Min cache hit ratio</span>
  };
}
</code></pre>
<h2 id="وضع-ميزانيات-واقعية">وضع ميزانيات واقعية</h2>
<h3 id="قياس-خط-الأساس">قياس خط الأساس</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/performanceBaseline.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceBaseliner</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>[]&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">measureBaseline</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">iterations</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">5</span></span>) {
    <span class="hljs-keyword">const</span> results = {
      <span class="hljs-attr">bundle</span>: <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureBundle</span>(),
      <span class="hljs-attr">loading</span>: <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureLoading</span>(url, iterations),
      <span class="hljs-attr">runtime</span>: <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureRuntime</span>(url),
      <span class="hljs-attr">recommendations</span>: {} <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>,
    };

    <span class="hljs-comment">// Generate budget recommendations</span>
    results.<span class="hljs-property">recommendations</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateRecommendations</span>(results);

    <span class="hljs-keyword">return</span> results;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">measureBundle</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">BundleMetrics</span>&gt; {
    <span class="hljs-comment">// Use webpack-bundle-analyzer output</span>
    <span class="hljs-keyword">const</span> statsFile = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/bundle-stats.json&#x27;</span>);
    <span class="hljs-keyword">const</span> stats = <span class="hljs-keyword">await</span> statsFile.<span class="hljs-title function_">json</span>();

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">mainJS</span>: stats.<span class="hljs-property">assets</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;main&#x27;</span>)).<span class="hljs-property">size</span>,
      <span class="hljs-attr">mainCSS</span>: stats.<span class="hljs-property">assets</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;css&#x27;</span>)).<span class="hljs-property">size</span>,
      <span class="hljs-attr">totalInitial</span>: stats.<span class="hljs-property">assets</span>
        .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> a.<span class="hljs-property">isInitial</span>)
        .<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">sum</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">a</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> sum + a.<span class="hljs-property">size</span>, <span class="hljs-number">0</span>),
      <span class="hljs-attr">chunks</span>: stats.<span class="hljs-property">chunks</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">c</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> ({
        <span class="hljs-attr">name</span>: c.<span class="hljs-property">names</span>[<span class="hljs-number">0</span>],
        <span class="hljs-attr">size</span>: c.<span class="hljs-property">size</span>,
      })),
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">measureLoading</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">iterations</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> measurements = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">runLighthouse</span>(url);
      measurements.<span class="hljs-title function_">push</span>(result);
    }

    <span class="hljs-comment">// Calculate percentiles</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">fcp</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(
        measurements.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">fcp</span>),
        <span class="hljs-number">75</span>,
      ),
      <span class="hljs-attr">lcp</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(
        measurements.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">lcp</span>),
        <span class="hljs-number">75</span>,
      ),
      <span class="hljs-attr">tti</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(
        measurements.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">tti</span>),
        <span class="hljs-number">75</span>,
      ),
      <span class="hljs-attr">fid</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(
        measurements.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">fid</span>),
        <span class="hljs-number">75</span>,
      ),
      <span class="hljs-attr">cls</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(
        measurements.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">cls</span>),
        <span class="hljs-number">75</span>,
      ),
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">runLighthouse</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-comment">// Run Lighthouse programmatically</span>
    <span class="hljs-keyword">const</span> lighthouse = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;lighthouse&#x27;</span>);
    <span class="hljs-keyword">const</span> chrome = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;chrome-launcher&#x27;</span>);

    <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> chrome.<span class="hljs-title function_">launch</span>({ <span class="hljs-attr">chromeFlags</span>: [<span class="hljs-string">&#x27;--headless&#x27;</span>] });
    <span class="hljs-keyword">const</span> options = {
      <span class="hljs-attr">logLevel</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;json&#x27;</span>,
      <span class="hljs-attr">port</span>: browser.<span class="hljs-property">port</span>,
    };

    <span class="hljs-keyword">const</span> runnerResult = <span class="hljs-keyword">await</span> lighthouse.<span class="hljs-title function_">default</span>(url, options);
    <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">kill</span>();

    <span class="hljs-keyword">const</span> { audits } = runnerResult.<span class="hljs-property">lhr</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">fcp</span>: audits[<span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>].<span class="hljs-property">numericValue</span>,
      <span class="hljs-attr">lcp</span>: audits[<span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>].<span class="hljs-property">numericValue</span>,
      <span class="hljs-attr">tti</span>: audits[<span class="hljs-string">&#x27;interactive&#x27;</span>].<span class="hljs-property">numericValue</span>,
      <span class="hljs-attr">fid</span>: audits[<span class="hljs-string">&#x27;max-potential-fid&#x27;</span>].<span class="hljs-property">numericValue</span>,
      <span class="hljs-attr">cls</span>: audits[<span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>].<span class="hljs-property">numericValue</span>,
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateRecommendations</span>(<span class="hljs-params"><span class="hljs-attr">results</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> recommendations = {
      <span class="hljs-attr">bundle</span>: {},
      <span class="hljs-attr">loading</span>: {},
    };

    <span class="hljs-comment">// Bundle recommendations (add 20% buffer)</span>
    recommendations.<span class="hljs-property">bundle</span> = {
      <span class="hljs-attr">mainJS</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">bundle</span>.<span class="hljs-property">mainJS</span> * <span class="hljs-number">1.2</span>),
      <span class="hljs-attr">mainCSS</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">bundle</span>.<span class="hljs-property">mainCSS</span> * <span class="hljs-number">1.2</span>),
      <span class="hljs-attr">totalInitial</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">bundle</span>.<span class="hljs-property">totalInitial</span> * <span class="hljs-number">1.2</span>),
    };

    <span class="hljs-comment">// Loading recommendations (use 75th percentile)</span>
    recommendations.<span class="hljs-property">loading</span> = {
      <span class="hljs-attr">fcp</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">loading</span>.<span class="hljs-property">fcp</span> * <span class="hljs-number">1.1</span>),
      <span class="hljs-attr">lcp</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">loading</span>.<span class="hljs-property">lcp</span> * <span class="hljs-number">1.1</span>),
      <span class="hljs-attr">tti</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">loading</span>.<span class="hljs-property">tti</span> * <span class="hljs-number">1.1</span>),
      <span class="hljs-attr">fid</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">100</span>, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(results.<span class="hljs-property">loading</span>.<span class="hljs-property">fid</span> * <span class="hljs-number">1.1</span>)),
      <span class="hljs-attr">cls</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(<span class="hljs-number">0.1</span>, results.<span class="hljs-property">loading</span>.<span class="hljs-property">cls</span> * <span class="hljs-number">1.1</span>),
    };

    <span class="hljs-keyword">return</span> recommendations;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">percentile</span>(<span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">p</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = [...values].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>((p / <span class="hljs-number">100</span>) * sorted.<span class="hljs-property">length</span>) - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> sorted[index];
  }
}

<span class="hljs-comment">// Generate baseline for your app</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateBaseline</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> baseliner = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceBaseliner</span>();
  <span class="hljs-keyword">const</span> baseline = <span class="hljs-keyword">await</span> baseliner.<span class="hljs-title function_">measureBaseline</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>);

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Current Performance Baseline:&#x27;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>(baseline);

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\nRecommended Budgets:&#x27;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>(baseline.<span class="hljs-property">recommendations</span>);

  <span class="hljs-comment">// Save to config file</span>
  fs.<span class="hljs-title function_">writeFileSync</span>(<span class="hljs-string">&#x27;performance-budget.json&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(baseline.<span class="hljs-property">recommendations</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
}
</code></pre>
<h2 id="تحليل-الحزم-والميزانيات-في-webpack">تحليل الحزم والميزانيات في Webpack</h2>
<h3 id="تهيئة-webpack">تهيئة Webpack</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;webpack-bundle-analyzer&#x27;</span>).<span class="hljs-property">BundleAnalyzerPlugin</span>;
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CompressionPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;compression-webpack-plugin&#x27;</span>);
<span class="hljs-keyword">const</span> { <span class="hljs-title class_">BundleBudgetPlugin</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;./webpack/bundleBudgetPlugin&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// Analyze bundle composition</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span>({
      <span class="hljs-attr">analyzerMode</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">ANALYZE</span> ? <span class="hljs-string">&#x27;server&#x27;</span> : <span class="hljs-string">&#x27;disabled&#x27;</span>,
      <span class="hljs-attr">generateStatsFile</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">statsFilename</span>: <span class="hljs-string">&#x27;bundle-stats.json&#x27;</span>,
    }),

    <span class="hljs-comment">// Custom budget enforcement</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleBudgetPlugin</span>({
      <span class="hljs-attr">bundles</span>: [
        {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;main&#x27;</span>,
          <span class="hljs-attr">maxSize</span>: <span class="hljs-string">&#x27;200KB&#x27;</span>,
        },
        {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vendor&#x27;</span>,
          <span class="hljs-attr">maxSize</span>: <span class="hljs-string">&#x27;150KB&#x27;</span>,
        },
      ],
      <span class="hljs-attr">chunks</span>: {
        <span class="hljs-attr">maxSize</span>: <span class="hljs-string">&#x27;50KB&#x27;</span>,
      },
    }),

    <span class="hljs-comment">// Compression for production</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">CompressionPlugin</span>({
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(js|css|html|svg)$/</span>,
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">8192</span>,
      <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.8</span>,
    }),
  ],

  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">maxEntrypointSize</span>: <span class="hljs-number">300000</span>, <span class="hljs-comment">// 300KB</span>
    <span class="hljs-attr">maxAssetSize</span>: <span class="hljs-number">250000</span>, <span class="hljs-comment">// 250KB</span>
    <span class="hljs-attr">hints</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span> ? <span class="hljs-string">&#x27;error&#x27;</span> : <span class="hljs-string">&#x27;warning&#x27;</span>,
  },
};
</code></pre>
<h3 id="إضافة-مخصصة-لفرض-الميزانيات">إضافة مخصّصة لفرض الميزانيات</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack/bundleBudgetPlugin.js</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;chalk&#x27;</span>);
<span class="hljs-keyword">const</span> filesize = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;filesize&#x27;</span>);

<span class="hljs-keyword">class</span> <span class="hljs-title class_">BundleBudgetPlugin</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">options</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">budgets</span> = options.<span class="hljs-property">bundles</span> || [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">chunkBudget</span> = options.<span class="hljs-property">chunks</span> || {};
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">failOnError</span> = options.<span class="hljs-property">failOnError</span> !== <span class="hljs-literal">false</span>;
  }

  <span class="hljs-title function_">apply</span>(<span class="hljs-params">compiler</span>) {
    compiler.<span class="hljs-property">hooks</span>.<span class="hljs-property">done</span>.<span class="hljs-title function_">tap</span>(<span class="hljs-string">&#x27;BundleBudgetPlugin&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">stats</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> compilation = stats.<span class="hljs-property">compilation</span>;
      <span class="hljs-keyword">const</span> assets = compilation.<span class="hljs-property">assets</span>;
      <span class="hljs-keyword">const</span> errors = [];
      <span class="hljs-keyword">const</span> warnings = [];

      <span class="hljs-comment">// Check bundle budgets</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">budgets</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">budget</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> asset = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(assets).<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> name.<span class="hljs-title function_">includes</span>(budget.<span class="hljs-property">name</span>));

        <span class="hljs-keyword">if</span> (asset) {
          <span class="hljs-keyword">const</span> size = assets[asset].<span class="hljs-title function_">size</span>();
          <span class="hljs-keyword">const</span> maxSize = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">parseSize</span>(budget.<span class="hljs-property">maxSize</span>);

          <span class="hljs-keyword">if</span> (size &gt; maxSize) {
            <span class="hljs-keyword">const</span> message = <span class="hljs-string">\`Bundle &quot;<span class="hljs-subst">\${budget.name}</span>&quot; exceeds budget: <span class="hljs-subst">\${filesize(size)}</span> &gt; <span class="hljs-subst">\${budget.maxSize}</span>\`</span>;

            <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">failOnError</span>) {
              errors.<span class="hljs-title function_">push</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(chalk.<span class="hljs-title function_">red</span>(message)));
            } <span class="hljs-keyword">else</span> {
              warnings.<span class="hljs-title function_">push</span>(chalk.<span class="hljs-title function_">yellow</span>(message));
            }
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
              chalk.<span class="hljs-title function_">green</span>(<span class="hljs-string">\`✓ Bundle &quot;<span class="hljs-subst">\${budget.name}</span>&quot;: <span class="hljs-subst">\${filesize(size)}</span> &lt; <span class="hljs-subst">\${budget.maxSize}</span>\`</span>),
            );
          }
        }
      });

      <span class="hljs-comment">// Check chunk budgets</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">chunkBudget</span>.<span class="hljs-property">maxSize</span>) {
        <span class="hljs-keyword">const</span> maxChunkSize = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">parseSize</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">chunkBudget</span>.<span class="hljs-property">maxSize</span>);

        compilation.<span class="hljs-property">chunks</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (!chunk.<span class="hljs-title function_">canBeInitial</span>()) {
            <span class="hljs-keyword">const</span> size = chunk.<span class="hljs-title function_">size</span>();

            <span class="hljs-keyword">if</span> (size &gt; maxChunkSize) {
              <span class="hljs-keyword">const</span> message = <span class="hljs-string">\`Chunk &quot;<span class="hljs-subst">\${chunk.name || chunk.id}</span>&quot; exceeds budget: <span class="hljs-subst">\${filesize(size)}</span> &gt; <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.chunkBudget.maxSize}</span>\`</span>;

              <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">failOnError</span>) {
                errors.<span class="hljs-title function_">push</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(chalk.<span class="hljs-title function_">red</span>(message)));
              } <span class="hljs-keyword">else</span> {
                warnings.<span class="hljs-title function_">push</span>(chalk.<span class="hljs-title function_">yellow</span>(message));
              }
            }
          }
        });
      }

      <span class="hljs-comment">// Add errors and warnings to compilation</span>
      compilation.<span class="hljs-property">errors</span>.<span class="hljs-title function_">push</span>(...errors);
      compilation.<span class="hljs-property">warnings</span>.<span class="hljs-title function_">push</span>(...warnings);

      <span class="hljs-comment">// Generate report</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateReport</span>(stats);
    });
  }

  <span class="hljs-title function_">parseSize</span>(<span class="hljs-params">size</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> size === <span class="hljs-string">&#x27;number&#x27;</span>) <span class="hljs-keyword">return</span> size;

    <span class="hljs-keyword">const</span> units = {
      <span class="hljs-attr">KB</span>: <span class="hljs-number">1024</span>,
      <span class="hljs-attr">MB</span>: <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>,
      <span class="hljs-attr">GB</span>: <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>,
    };

    <span class="hljs-keyword">const</span> match = size.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^(\\d+(?:\\.\\d+)?)\\s*(KB|MB|GB)$/i</span>);
    <span class="hljs-keyword">if</span> (!match) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Invalid size format: <span class="hljs-subst">\${size}</span>\`</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseFloat</span>(match[<span class="hljs-number">1</span>]) * units[match[<span class="hljs-number">2</span>].<span class="hljs-title function_">toUpperCase</span>()];
  }

  <span class="hljs-title function_">generateReport</span>(<span class="hljs-params">stats</span>) {
    <span class="hljs-keyword">const</span> report = {
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      <span class="hljs-attr">bundles</span>: {},
      <span class="hljs-attr">chunks</span>: {},
      <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
    };

    <span class="hljs-keyword">const</span> assets = stats.<span class="hljs-property">compilation</span>.<span class="hljs-property">assets</span>;

    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(assets).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> size = assets[name].<span class="hljs-title function_">size</span>();
      report.<span class="hljs-property">bundles</span>[name] = size;
      report.<span class="hljs-property">total</span> += size;
    });

    <span class="hljs-comment">// Save report for tracking</span>
    fs.<span class="hljs-title function_">writeFileSync</span>(<span class="hljs-string">&#x27;performance-report.json&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(report, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
  }
}

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = { <span class="hljs-title class_">BundleBudgetPlugin</span> };
</code></pre>
<h2 id="التكامل-مع-cicd">التكامل مع CI/CD</h2>
<h3 id="سير-عمل-github-actions">سير عمل GitHub Actions</h3>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/performance.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">Performance</span> <span class="hljs-string">Budget</span> <span class="hljs-string">Check</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">performance:</span>
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

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Check</span> <span class="hljs-string">bundle</span> <span class="hljs-string">size</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">budget:check</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">Lighthouse</span> <span class="hljs-string">CI</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">treosh/lighthouse-ci-action@v10</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">urls:</span> <span class="hljs-string">|
            http://localhost:3000
            http://localhost:3000/dashboard
</span>          <span class="hljs-attr">budgetPath:</span> <span class="hljs-string">&#x27;./budget.json&#x27;</span>
          <span class="hljs-attr">temporaryPublicStorage:</span> <span class="hljs-literal">true</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">performance</span> <span class="hljs-string">artifacts</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v3</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">name:</span> <span class="hljs-string">performance-results</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">|
            .lighthouseci/
            performance-report.json
            bundle-stats.json
</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Comment</span> <span class="hljs-string">PR</span> <span class="hljs-string">with</span> <span class="hljs-string">results</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/github-script@v6</span>
        <span class="hljs-attr">if:</span> <span class="hljs-string">github.event_name</span> <span class="hljs-string">==</span> <span class="hljs-string">&#x27;pull_request&#x27;</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">script:</span> <span class="hljs-string">|
            const fs = require(&#x27;fs&#x27;);
            const report = JSON.parse(fs.readFileSync(&#x27;performance-report.json&#x27;));
</span>
            <span class="hljs-string">const</span> <span class="hljs-string">comment</span> <span class="hljs-string">=</span> <span class="hljs-string">\`##</span> <span class="hljs-string">Performance</span> <span class="hljs-string">Report</span>

            <span class="hljs-comment">### Bundle Sizes</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">Main:</span> <span class="hljs-string">\${filesize(report.bundles.main)}</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">Vendor:</span> <span class="hljs-string">\${filesize(report.bundles.vendor)}</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">Total:</span> <span class="hljs-string">\${filesize(report.total)}</span>

            <span class="hljs-comment">### Lighthouse Scores</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">Performance:</span> <span class="hljs-string">\${report.lighthouse.performance}</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">FCP:</span> <span class="hljs-string">\${report.lighthouse.fcp}ms</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">LCP:</span> <span class="hljs-string">\${report.lighthouse.lcp}ms</span>
            <span class="hljs-bullet">-</span> <span class="hljs-attr">TTI:</span> <span class="hljs-string">\${report.lighthouse.tti}ms</span>
            <span class="hljs-string">\`;</span>

            <span class="hljs-string">github.rest.issues.createComment({</span>
              <span class="hljs-attr">issue_number:</span> <span class="hljs-string">context.issue.number,</span>
              <span class="hljs-attr">owner:</span> <span class="hljs-string">context.repo.owner,</span>
              <span class="hljs-attr">repo:</span> <span class="hljs-string">context.repo.repo,</span>
              <span class="hljs-attr">body:</span> <span class="hljs-string">comment</span>
            <span class="hljs-string">});</span>
</code></pre>
<h3 id="تهيئة-lighthouse-ci">تهيئة Lighthouse CI</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// lighthouserc.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">ci</span>: {
    <span class="hljs-attr">collect</span>: {
      <span class="hljs-attr">staticDistDir</span>: <span class="hljs-string">&#x27;./build&#x27;</span>,
      <span class="hljs-attr">numberOfRuns</span>: <span class="hljs-number">3</span>,
      <span class="hljs-attr">settings</span>: {
        <span class="hljs-attr">preset</span>: <span class="hljs-string">&#x27;desktop&#x27;</span>,
        <span class="hljs-attr">throttling</span>: {
          <span class="hljs-attr">cpuSlowdownMultiplier</span>: <span class="hljs-number">1</span>,
        },
      },
    },
    <span class="hljs-attr">assert</span>: {
      <span class="hljs-attr">preset</span>: <span class="hljs-string">&#x27;lighthouse:recommended&#x27;</span>,
      <span class="hljs-attr">assertions</span>: {
        <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">1800</span> }],
        <span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">2500</span> }],
        <span class="hljs-attr">interactive</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">3800</span> }],
        <span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">0.1</span> }],
        <span class="hljs-string">&#x27;max-potential-fid&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">100</span> }],
        <span class="hljs-string">&#x27;uses-responsive-images&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>,
        <span class="hljs-string">&#x27;uses-optimized-images&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>,
        <span class="hljs-string">&#x27;uses-text-compression&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-string">&#x27;uses-rel-preconnect&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>,
        <span class="hljs-string">&#x27;unused-javascript&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">50000</span> }],
      },
    },
    <span class="hljs-attr">upload</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;temporary-public-storage&#x27;</span>,
    },
  },
};
</code></pre>
<h2 id="مراقبة-الأداء-أثناء-التشغيل">مراقبة الأداء أثناء التشغيل</h2>
<p>تندمج مراقبة الأداء أثناء التشغيل مع أتمتة CI لفرض الميزانيات أثناء التطوير. ولتفاصيل تنفيذ مراقبة الإنتاج، راجع <a href="https://stevekinney.com/courses/react-performance/production-performance-monitoring">production-performance-monitoring.md</a>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Basic budget violation detection for development</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">setupBudgetWatcher</span>(<span class="hljs-params"><span class="hljs-attr">budgets</span>: <span class="hljs-title class_">RuntimeBudgets</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> === <span class="hljs-string">&#x27;undefined&#x27;</span>) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
      <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">entryType</span> === <span class="hljs-string">&#x27;measure&#x27;</span> &amp;&amp; entry.<span class="hljs-property">name</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;react-render-&#x27;</span>)) {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">duration</span> &gt; budgets.<span class="hljs-property">componentRender</span>) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(
            <span class="hljs-string">\`Budget violation: <span class="hljs-subst">\${entry.name}</span> took <span class="hljs-subst">\${entry.duration.toFixed(<span class="hljs-number">2</span>)}</span>ms, budget: <span class="hljs-subst">\${budgets.componentRender}</span>ms\`</span>,
          );
        }
      }
    }
  });

  observer.<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;measure&#x27;</span>] });
  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();
}
</code></pre>
<h2 id="اختبار-الأداء-الآلي">اختبار الأداء الآلي</h2>
<p>ينبغي دمج اختبارات الأداء في خط فرض الميزانيات لديك. ولاستراتيجيات الاختبار وأنماطه الشاملة، راجع <a href="https://stevekinney.com/courses/react-performance/performance-testing-strategy">performance-testing-strategy.md</a>.</p>
<h3 id="اختبارات-الأداء-باستخدام-jest">اختبارات الأداء باستخدام Jest</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// __tests__/performance.test.ts</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { measureRender } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../utils/performanceTest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Performance Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Component Render Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should render ProductList within budget&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> products = <span class="hljs-title function_">generateMockProducts</span>(<span class="hljs-number">100</span>);

      <span class="hljs-keyword">const</span> { duration, rerenders } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">measureRender</span>(
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductList</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{products}</span> /&gt;</span></span>
      );

      <span class="hljs-title function_">expect</span>(duration).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">50</span>); <span class="hljs-comment">// 50ms budget</span>
      <span class="hljs-title function_">expect</span>(rerenders).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// No unnecessary rerenders</span>
    });

    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle large datasets efficiently&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> items = <span class="hljs-title function_">generateLargeDataset</span>(<span class="hljs-number">10000</span>);

      <span class="hljs-keyword">const</span> { duration, memoryUsed } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">measureRender</span>(
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">VirtualizedList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{items}</span> /&gt;</span></span>
      );

      <span class="hljs-title function_">expect</span>(duration).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// 100ms for large dataset</span>
      <span class="hljs-title function_">expect</span>(memoryUsed).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">50</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>); <span class="hljs-comment">// 50MB memory budget</span>
    });
  });

  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;State Update Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should update state within budget&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> { result } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">useComplexState</span>());

      <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
      <span class="hljs-title function_">act</span>(<span class="hljs-function">() =&gt;</span> {
        result.<span class="hljs-property">current</span>.<span class="hljs-title function_">updateMultipleFields</span>({
          <span class="hljs-attr">field1</span>: <span class="hljs-string">&#x27;value1&#x27;</span>,
          <span class="hljs-attr">field2</span>: <span class="hljs-string">&#x27;value2&#x27;</span>,
          <span class="hljs-attr">field3</span>: <span class="hljs-string">&#x27;value3&#x27;</span>,
        });
      });
      <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;

      <span class="hljs-title function_">expect</span>(duration).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">16</span>); <span class="hljs-comment">// One frame</span>
    });
  });
});

<span class="hljs-comment">// Performance test utilities</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">measureRender</span>(<span class="hljs-params"><span class="hljs-attr">component</span>: <span class="hljs-title class_">ReactElement</span></span>) {
  <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
  <span class="hljs-keyword">const</span> startMemory = performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;

  <span class="hljs-keyword">let</span> rerenders = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> { rerender } = <span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Profiler</span>
      <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test&quot;</span>
      <span class="hljs-attr">onRender</span>=<span class="hljs-string">{()</span> =&gt;</span> {
        rerenders++;
      }}
    &gt;
      {component}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Profiler</span>&gt;</span></span>
  );

  <span class="hljs-comment">// Wait for effects</span>
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">act</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">0</span>));
  });

  <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;
  <span class="hljs-keyword">const</span> memoryUsed = (performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>) - startMemory;

  <span class="hljs-keyword">return</span> {
    duration,
    <span class="hljs-attr">rerenders</span>: rerenders - <span class="hljs-number">1</span>, <span class="hljs-comment">// Subtract initial render</span>
    memoryUsed,
  };
}
</code></pre>
<h3 id="اختبارات-الأداء-من-طرف-إلى-طرف-باستخدام-playwright">اختبارات الأداء من طرف إلى طرف باستخدام Playwright</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// e2e/performance.spec.ts</span>
<span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Performance E2E Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should load homepage within performance budget&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-comment">// Start performance measurement</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Collect performance metrics</span>
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> navigation = performance.<span class="hljs-title function_">getEntriesByType</span>(
        <span class="hljs-string">&#x27;navigation&#x27;</span>,
      )[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceNavigationTiming</span>;
      <span class="hljs-keyword">const</span> paint = performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;paint&#x27;</span>);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">domContentLoaded</span>:
          navigation.<span class="hljs-property">domContentLoadedEventEnd</span> - navigation.<span class="hljs-property">domContentLoadedEventStart</span>,
        <span class="hljs-attr">loadComplete</span>: navigation.<span class="hljs-property">loadEventEnd</span> - navigation.<span class="hljs-property">loadEventStart</span>,
        <span class="hljs-attr">fcp</span>: paint.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> p.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>)?.<span class="hljs-property">startTime</span>,
        <span class="hljs-attr">lcp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> entries = list.<span class="hljs-title function_">getEntries</span>();
            <span class="hljs-keyword">const</span> lastEntry = entries[entries.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];
            <span class="hljs-title function_">resolve</span>(lastEntry.<span class="hljs-property">startTime</span>);
          }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>] });
        }),
      };
    });

    <span class="hljs-comment">// Assert against budgets</span>
    <span class="hljs-title function_">expect</span>(metrics.<span class="hljs-property">domContentLoaded</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">1000</span>);
    <span class="hljs-title function_">expect</span>(metrics.<span class="hljs-property">loadComplete</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">3000</span>);
    <span class="hljs-title function_">expect</span>(metrics.<span class="hljs-property">fcp</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">1800</span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> metrics.<span class="hljs-property">lcp</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">2500</span>);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should handle interactions within budget&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);

    <span class="hljs-comment">// Measure interaction performance</span>
    <span class="hljs-keyword">const</span> interactionTime = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> button = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;[data-testid=&quot;filter-button&quot;]&#x27;</span>);
      <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

      button?.<span class="hljs-title function_">click</span>();

      <span class="hljs-comment">// Wait for UI update</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-title function_">requestAnimationFrame</span>(resolve));

      <span class="hljs-keyword">return</span> performance.<span class="hljs-title function_">now</span>() - startTime;
    });

    <span class="hljs-title function_">expect</span>(interactionTime).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// 100ms interaction budget</span>
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should not leak memory during navigation&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-keyword">const</span> initialMemory = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
    });

    <span class="hljs-comment">// Navigate through the app</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
      <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/products&#x27;</span>);
      <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);
      <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/settings&#x27;</span>);
    }

    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-comment">// Force garbage collection if available</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gc</span>) <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gc</span>();
    });

    <span class="hljs-keyword">const</span> finalMemory = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
    });

    <span class="hljs-keyword">const</span> memoryIncrease = finalMemory - initialMemory;
    <span class="hljs-title function_">expect</span>(memoryIncrease).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">10</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>); <span class="hljs-comment">// 10MB tolerance</span>
  });
});
</code></pre>
<h2 id="تتبع-حجم-الحزمة">تتبّع حجم الحزمة</h2>
<h3 id="تهيئة-حد-الحجم">تهيئة حدّ الحجم</h3>
<pre><code class="language-json"><span class="hljs-comment">// .size-limit.json</span>
<span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Main Bundle&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build/static/js/main.*.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;200 KB&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;webpack&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;gzip&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;CSS Bundle&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build/static/css/main.*.css&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;50 KB&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;webpack&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;gzip&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Total App&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build/static/**/*.{js,css}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;300 KB&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;webpack&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;gzip&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<h3 id="سكربتات-npm">سكربتات NPM</h3>
<pre><code class="language-json"><span class="hljs-comment">// package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-scripts build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build:analyze&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ANALYZE=true npm run build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;budget:check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;size-limit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;budget:why&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;size-limit --why&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;performance:test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;jest --testMatch=&#x27;**/*.perf.test.{ts,tsx}&#x27;&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lighthouse&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lighthouse http://localhost:3000 --budget-path=./budget.json --output=json --output-path=./lighthouse-report.json&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;performance:baseline&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node scripts/generateBaseline.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;performance:report&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node scripts/performanceReport.js&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;size-limit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build/static/js/*.js&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;limit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;200 KB&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;husky&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pre-push&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run budget:check&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="دمج-لوحة-معلومات-الأداء">دمج لوحة معلومات الأداء</h2>
<p>ينبغي دمج لوحات معلومات الأداء وأنظمة التنبيه مع خط الأتمتة لديك لتوفير رؤية واضحة لمدى الالتزام بالميزانيات عبر الزمن. ولتنفيذ لوحة معلومات شاملة وتنبيهات في الإنتاج، راجع <a href="https://stevekinney.com/courses/react-performance/production-performance-monitoring">production-performance-monitoring.md</a>.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
