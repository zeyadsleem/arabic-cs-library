const s="kinney",a="react-performance",n="أداء React",l="performance-testing-implementation",p="دليل تنفيذ اختبارات الأداء",t=[{depth:2,id:"اختبار-الأداء-من-طرف-إلى-طرف",text:"اختبار الأداء من طرف إلى طرف"},{depth:3,id:"تكامل-lighthouse-ci",text:"تكامل Lighthouse CI"},{depth:3,id:"مجموعة-اختبارات-أداء-مخصصة",text:"مجموعة اختبارات أداء مخصّصة"},{depth:2,id:"المراقبة-المستمرة-للأداء",text:"المراقبة المستمرة للأداء"},{depth:3,id:"كشف-انحدارات-الأداء",text:"كشف انحدارات الأداء"},{depth:2,id:"أفضل-ممارسات-اختبار-الأداء",text:"أفضل ممارسات اختبار الأداء"},{depth:3,id:"إدارة-بيانات-الاختبار",text:"إدارة بيانات الاختبار"}],e=`<p>يغطّي دليل التنفيذ هذا تقنيات متقدّمة لاختبار الأداء، من بينها اختبار الأداء من طرف إلى طرف، وتكامل Lighthouse CI، والمراقبة المستمرة، والكشف الآلي عن انحدارات الأداء في تطبيقات React الإنتاجية.</p>
<h2 id="اختبار-الأداء-من-طرف-إلى-طرف">اختبار الأداء من طرف إلى طرف</h2>
<h3 id="تكامل-lighthouse-ci">تكامل Lighthouse CI</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// lighthouse-ci.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">ci</span>: {
    <span class="hljs-attr">collect</span>: {
      <span class="hljs-attr">url</span>: [
        <span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>,
        <span class="hljs-string">&#x27;http://localhost:3000/products&#x27;</span>,
        <span class="hljs-string">&#x27;http://localhost:3000/checkout&#x27;</span>,
      ],
      <span class="hljs-attr">startServerCommand</span>: <span class="hljs-string">&#x27;npm run start&#x27;</span>,
      <span class="hljs-attr">numberOfRuns</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attr">settings</span>: {
        <span class="hljs-attr">preset</span>: <span class="hljs-string">&#x27;perf&#x27;</span>,
        <span class="hljs-attr">chromeFlags</span>: <span class="hljs-string">&#x27;--no-sandbox --headless&#x27;</span>,
      },
    },
    <span class="hljs-attr">assert</span>: {
      <span class="hljs-attr">assertions</span>: {
        <span class="hljs-string">&#x27;categories:performance&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.9</span> }],
        <span class="hljs-string">&#x27;categories:accessibility&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.9</span> }],
        <span class="hljs-string">&#x27;categories:best-practices&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.9</span> }],
        <span class="hljs-string">&#x27;categories:seo&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">minScore</span>: <span class="hljs-number">0.9</span> }],

        <span class="hljs-comment">// Core Web Vitals</span>
        <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">2000</span> }],
        <span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">2500</span> }],
        <span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">0.1</span> }],

        <span class="hljs-comment">// Custom metrics</span>
        <span class="hljs-string">&#x27;speed-index&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">3000</span> }],
        <span class="hljs-attr">interactive</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">3000</span> }],
        <span class="hljs-string">&#x27;total-blocking-time&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxNumericValue</span>: <span class="hljs-number">300</span> }],

        <span class="hljs-comment">// Resource optimization</span>
        <span class="hljs-string">&#x27;unused-javascript&#x27;</span>: [<span class="hljs-string">&#x27;error&#x27;</span>, { <span class="hljs-attr">maxLength</span>: <span class="hljs-number">0</span> }],
        <span class="hljs-string">&#x27;unused-css-rules&#x27;</span>: [<span class="hljs-string">&#x27;warn&#x27;</span>, { <span class="hljs-attr">maxLength</span>: <span class="hljs-number">1</span> }],
        <span class="hljs-string">&#x27;uses-optimized-images&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-string">&#x27;uses-webp-images&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-string">&#x27;uses-text-compression&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      },
    },
    <span class="hljs-attr">upload</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;temporary-public-storage&#x27;</span>,
    },
    <span class="hljs-attr">server</span>: {
      <span class="hljs-attr">port</span>: <span class="hljs-number">9001</span>,
      <span class="hljs-attr">storage</span>: <span class="hljs-string">&#x27;./lighthouse-reports&#x27;</span>,
    },
  },
};

<span class="hljs-comment">// Custom Lighthouse audit</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;fs&#x27;</span>);
<span class="hljs-keyword">const</span> lighthouse = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;lighthouse&#x27;</span>);
<span class="hljs-keyword">const</span> chromeLauncher = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;chrome-launcher&#x27;</span>);

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceTestSuite</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">runLighthouseAudit</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, options = {}</span>) {
    <span class="hljs-keyword">const</span> chrome = <span class="hljs-keyword">await</span> chromeLauncher.<span class="hljs-title function_">launch</span>({
      <span class="hljs-attr">chromeFlags</span>: [<span class="hljs-string">&#x27;--headless&#x27;</span>, <span class="hljs-string">&#x27;--no-sandbox&#x27;</span>],
    });

    <span class="hljs-keyword">const</span> lighthouseOptions = {
      <span class="hljs-attr">logLevel</span>: <span class="hljs-string">&#x27;info&#x27;</span>,
      <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;json&#x27;</span>,
      <span class="hljs-attr">onlyCategories</span>: [<span class="hljs-string">&#x27;performance&#x27;</span>],
      <span class="hljs-attr">port</span>: chrome.<span class="hljs-property">port</span>,
      ...options,
    };

    <span class="hljs-keyword">const</span> runnerResult = <span class="hljs-keyword">await</span> <span class="hljs-title function_">lighthouse</span>(url, lighthouseOptions);
    <span class="hljs-keyword">await</span> chrome.<span class="hljs-title function_">kill</span>();

    <span class="hljs-keyword">return</span> runnerResult;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">validatePerformanceBudget</span>(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">budget</span>: <span class="hljs-title class_">PerformanceBudget</span></span>) {
    <span class="hljs-keyword">const</span> { lhr } = result;
    <span class="hljs-keyword">const</span> violations = [];

    <span class="hljs-comment">// Check Core Web Vitals</span>
    <span class="hljs-keyword">const</span> fcp = lhr.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>].<span class="hljs-property">numericValue</span>;
    <span class="hljs-keyword">const</span> lcp = lhr.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>].<span class="hljs-property">numericValue</span>;
    <span class="hljs-keyword">const</span> cls = lhr.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>].<span class="hljs-property">numericValue</span>;
    <span class="hljs-keyword">const</span> tbt = lhr.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;total-blocking-time&#x27;</span>].<span class="hljs-property">numericValue</span>;

    <span class="hljs-keyword">if</span> (fcp &gt; budget.<span class="hljs-property">fcp</span>) {
      violations.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`FCP: <span class="hljs-subst">\${fcp}</span>ms exceeds budget of <span class="hljs-subst">\${budget.fcp}</span>ms\`</span>);
    }

    <span class="hljs-keyword">if</span> (lcp &gt; budget.<span class="hljs-property">lcp</span>) {
      violations.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`LCP: <span class="hljs-subst">\${lcp}</span>ms exceeds budget of <span class="hljs-subst">\${budget.lcp}</span>ms\`</span>);
    }

    <span class="hljs-keyword">if</span> (cls &gt; budget.<span class="hljs-property">cls</span>) {
      violations.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`CLS: <span class="hljs-subst">\${cls}</span> exceeds budget of <span class="hljs-subst">\${budget.cls}</span>\`</span>);
    }

    <span class="hljs-keyword">if</span> (tbt &gt; budget.<span class="hljs-property">tbt</span>) {
      violations.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`TBT: <span class="hljs-subst">\${tbt}</span>ms exceeds budget of <span class="hljs-subst">\${budget.tbt}</span>ms\`</span>);
    }

    <span class="hljs-keyword">return</span> violations;
  }

  <span class="hljs-title function_">generatePerformanceReport</span>(<span class="hljs-params"><span class="hljs-attr">results</span>: <span class="hljs-built_in">any</span>[]</span>) {
    <span class="hljs-keyword">const</span> report = {
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      <span class="hljs-attr">summary</span>: {
        <span class="hljs-attr">totalRuns</span>: results.<span class="hljs-property">length</span>,
        <span class="hljs-attr">averageScore</span>:
          results.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, r</span>) =&gt;</span> sum + r.<span class="hljs-property">lhr</span>.<span class="hljs-property">categories</span>.<span class="hljs-property">performance</span>.<span class="hljs-property">score</span>, <span class="hljs-number">0</span>) / results.<span class="hljs-property">length</span>,
        <span class="hljs-attr">violations</span>: [],
      },
      <span class="hljs-attr">metrics</span>: {
        <span class="hljs-attr">fcp</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMetricStats</span>(results, <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>),
        <span class="hljs-attr">lcp</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMetricStats</span>(results, <span class="hljs-string">&#x27;largest-contentful-paint&#x27;</span>),
        <span class="hljs-attr">cls</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMetricStats</span>(results, <span class="hljs-string">&#x27;cumulative-layout-shift&#x27;</span>),
        <span class="hljs-attr">tbt</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateMetricStats</span>(results, <span class="hljs-string">&#x27;total-blocking-time&#x27;</span>),
      },
      <span class="hljs-attr">recommendations</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateRecommendations</span>(results),
    };

    <span class="hljs-keyword">return</span> report;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculateMetricStats</span>(<span class="hljs-params"><span class="hljs-attr">results</span>: <span class="hljs-built_in">any</span>[], <span class="hljs-attr">metricName</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> values = results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">lhr</span>.<span class="hljs-property">audits</span>[metricName].<span class="hljs-property">numericValue</span>);
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">min</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(...values),
      <span class="hljs-attr">max</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...values),
      <span class="hljs-attr">avg</span>: values.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, val</span>) =&gt;</span> sum + val, <span class="hljs-number">0</span>) / values.<span class="hljs-property">length</span>,
      <span class="hljs-attr">p95</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">percentile</span>(values, <span class="hljs-number">95</span>),
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">percentile</span>(<span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">p</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = values.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> index = (p / <span class="hljs-number">100</span>) * (sorted.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">const</span> lower = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(index);
    <span class="hljs-keyword">const</span> upper = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(index);

    <span class="hljs-keyword">if</span> (lower === upper) <span class="hljs-keyword">return</span> sorted[lower];

    <span class="hljs-keyword">const</span> weight = index - lower;
    <span class="hljs-keyword">return</span> sorted[lower] * (<span class="hljs-number">1</span> - weight) + sorted[upper] * weight;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateRecommendations</span>(<span class="hljs-attr">results</span>: <span class="hljs-built_in">any</span>[]): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> recommendations = [];
    <span class="hljs-keyword">const</span> avgResult = results[<span class="hljs-number">0</span>]; <span class="hljs-comment">// Use first result for audit analysis</span>

    <span class="hljs-comment">// Analyze common issues</span>
    <span class="hljs-keyword">if</span> (avgResult.<span class="hljs-property">lhr</span>.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;unused-javascript&#x27;</span>].<span class="hljs-property">score</span> &lt; <span class="hljs-number">0.9</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Remove unused JavaScript to reduce bundle size&#x27;</span>);
    }

    <span class="hljs-keyword">if</span> (avgResult.<span class="hljs-property">lhr</span>.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;uses-optimized-images&#x27;</span>].<span class="hljs-property">score</span> &lt; <span class="hljs-number">1</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Optimize images using modern formats (WebP, AVIF)&#x27;</span>);
    }

    <span class="hljs-keyword">if</span> (avgResult.<span class="hljs-property">lhr</span>.<span class="hljs-property">audits</span>[<span class="hljs-string">&#x27;uses-text-compression&#x27;</span>].<span class="hljs-property">score</span> &lt; <span class="hljs-number">1</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Enable gzip/brotli compression for text resources&#x27;</span>);
    }

    <span class="hljs-keyword">return</span> recommendations;
  }
}
</code></pre>
<h3 id="مجموعة-اختبارات-أداء-مخصصة">مجموعة اختبارات أداء مخصّصة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Custom E2E performance testing with Playwright</span>
<span class="hljs-keyword">import</span> { test, expect, <span class="hljs-title class_">Page</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-attr">fcp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">lcp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">cls</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">tbt</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">loadTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">domContentLoaded</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">resourceCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">transferSize</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PlaywrightPerformanceTester</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">measurePagePerformance</span>(<span class="hljs-attr">page</span>: <span class="hljs-title class_">Page</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt; {
    <span class="hljs-comment">// Start performance monitoring</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">addInitScript</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">performanceMetrics</span> = {
        <span class="hljs-attr">navigationStart</span>: performance.<span class="hljs-property">timeOrigin</span>,
        <span class="hljs-attr">measurements</span>: [],
      };

      <span class="hljs-comment">// Observe Web Vitals</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
          <span class="hljs-variable language_">window</span>.<span class="hljs-property">performanceMetrics</span>.<span class="hljs-property">measurements</span>.<span class="hljs-title function_">push</span>({
            <span class="hljs-attr">name</span>: entry.<span class="hljs-property">name</span>,
            <span class="hljs-attr">value</span>: entry.<span class="hljs-property">value</span>,
            <span class="hljs-attr">startTime</span>: entry.<span class="hljs-property">startTime</span>,
          });
        }
      }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;measure&#x27;</span>, <span class="hljs-string">&#x27;navigation&#x27;</span>, <span class="hljs-string">&#x27;paint&#x27;</span>] });
    });

    <span class="hljs-comment">// Navigate and wait for load</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(page.<span class="hljs-title function_">url</span>());
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForLoadState</span>(<span class="hljs-string">&#x27;networkidle&#x27;</span>);

    <span class="hljs-comment">// Calculate metrics</span>
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> navigation = performance.<span class="hljs-title function_">getEntriesByType</span>(
        <span class="hljs-string">&#x27;navigation&#x27;</span>,
      )[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceNavigationTiming</span>;
      <span class="hljs-keyword">const</span> paintEntries = performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;paint&#x27;</span>);

      <span class="hljs-keyword">const</span> fcp =
        paintEntries.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> entry.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;first-contentful-paint&#x27;</span>)?.<span class="hljs-property">startTime</span> || <span class="hljs-number">0</span>;

      <span class="hljs-keyword">return</span> {
        fcp,
        <span class="hljs-attr">lcp</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// Will be measured via Web Vitals library</span>
        <span class="hljs-attr">cls</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// Will be measured via Web Vitals library</span>
        <span class="hljs-attr">tbt</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// Calculated from long tasks</span>
        <span class="hljs-attr">loadTime</span>: navigation.<span class="hljs-property">loadEventEnd</span> - navigation.<span class="hljs-property">navigationStart</span>,
        <span class="hljs-attr">domContentLoaded</span>: navigation.<span class="hljs-property">domContentLoadedEventEnd</span> - navigation.<span class="hljs-property">navigationStart</span>,
        <span class="hljs-attr">resourceCount</span>: performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;resource&#x27;</span>).<span class="hljs-property">length</span>,
        <span class="hljs-attr">transferSize</span>: navigation.<span class="hljs-property">transferSize</span> || <span class="hljs-number">0</span>,
      };
    });

    <span class="hljs-keyword">return</span> metrics;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">runPerformanceTest</span>(<span class="hljs-params">
    <span class="hljs-attr">page</span>: <span class="hljs-title class_">Page</span>,
    <span class="hljs-attr">testName</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">budget</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt;,
    <span class="hljs-attr">runs</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">3</span>,
  </span>) {
    <span class="hljs-keyword">const</span> results = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; runs; i++) {
      <span class="hljs-comment">// Clear cache between runs for consistency</span>
      <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">clearCookies</span>();

      <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measurePagePerformance</span>(page);
      results.<span class="hljs-title function_">push</span>(metrics);

      <span class="hljs-comment">// Small delay between runs</span>
      <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">1000</span>);
    }

    <span class="hljs-comment">// Calculate averages</span>
    <span class="hljs-keyword">const</span> avgMetrics = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateAverages</span>(results);

    <span class="hljs-comment">// Validate against budget</span>
    <span class="hljs-keyword">const</span> violations = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">validateBudget</span>(avgMetrics, budget);

    <span class="hljs-comment">// Report results</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Performance Test: <span class="hljs-subst">\${testName}</span>\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Average Metrics:&#x27;</span>, avgMetrics);

    <span class="hljs-keyword">if</span> (violations.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Budget Violations:&#x27;</span>, violations);
    }

    <span class="hljs-keyword">return</span> {
      testName,
      <span class="hljs-attr">metrics</span>: avgMetrics,
      violations,
      <span class="hljs-attr">passed</span>: violations.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>,
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculateAverages</span>(<span class="hljs-attr">results</span>: <span class="hljs-title class_">PerformanceMetrics</span>[]): <span class="hljs-title class_">PerformanceMetrics</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">avg</span> = (<span class="hljs-params"><span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[]</span>) =&gt; values.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, val</span>) =&gt;</span> sum + val, <span class="hljs-number">0</span>) / values.<span class="hljs-property">length</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">fcp</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">fcp</span>)),
      <span class="hljs-attr">lcp</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">lcp</span>)),
      <span class="hljs-attr">cls</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">cls</span>)),
      <span class="hljs-attr">tbt</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">tbt</span>)),
      <span class="hljs-attr">loadTime</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">loadTime</span>)),
      <span class="hljs-attr">domContentLoaded</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">domContentLoaded</span>)),
      <span class="hljs-attr">resourceCount</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">resourceCount</span>)),
      <span class="hljs-attr">transferSize</span>: <span class="hljs-title function_">avg</span>(results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">transferSize</span>)),
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">validateBudget</span>(
    <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetrics</span>,
    <span class="hljs-attr">budget</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt;,
  ): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> violations = [];

    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(budget).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[key, limit]</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> value = metrics[key <span class="hljs-keyword">as</span> keyof <span class="hljs-title class_">PerformanceMetrics</span>];
      <span class="hljs-keyword">if</span> (value &gt; limit!) {
        violations.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`<span class="hljs-subst">\${key}</span>: <span class="hljs-subst">\${value}</span> exceeds budget of <span class="hljs-subst">\${limit}</span>\`</span>);
      }
    });

    <span class="hljs-keyword">return</span> violations;
  }
}

<span class="hljs-comment">// Playwright test implementation</span>
test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Performance Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">perfTester</span>: <span class="hljs-title class_">PlaywrightPerformanceTester</span>;

  test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    perfTester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PlaywrightPerformanceTester</span>();
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Homepage performance&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">const</span> budget = {
      <span class="hljs-attr">fcp</span>: <span class="hljs-number">2000</span>,
      <span class="hljs-attr">lcp</span>: <span class="hljs-number">2500</span>,
      <span class="hljs-attr">cls</span>: <span class="hljs-number">0.1</span>,
      <span class="hljs-attr">loadTime</span>: <span class="hljs-number">3000</span>,
    };

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> perfTester.<span class="hljs-title function_">runPerformanceTest</span>(page, <span class="hljs-string">&#x27;Homepage Load&#x27;</span>, budget, <span class="hljs-number">5</span>);

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">passed</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Product page performance&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/products/example&#x27;</span>);

    <span class="hljs-keyword">const</span> budget = {
      <span class="hljs-attr">fcp</span>: <span class="hljs-number">2500</span>,
      <span class="hljs-attr">lcp</span>: <span class="hljs-number">3000</span>,
      <span class="hljs-attr">cls</span>: <span class="hljs-number">0.15</span>,
      <span class="hljs-attr">loadTime</span>: <span class="hljs-number">4000</span>,
    };

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> perfTester.<span class="hljs-title function_">runPerformanceTest</span>(page, <span class="hljs-string">&#x27;Product Page Load&#x27;</span>, budget, <span class="hljs-number">3</span>);

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">passed</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });
});
</code></pre>
<h2 id="المراقبة-المستمرة-للأداء">المراقبة المستمرة للأداء</h2>
<h3 id="كشف-انحدارات-الأداء">كشف انحدارات الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Automated performance regression detection</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceBaseline</span> {
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetrics</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">commitHash</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceRegressionDetector</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">baselines</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">PerformanceBaseline</span>[]&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">recordBaseline</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetrics</span>, <span class="hljs-attr">commitHash</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">baseline</span>: <span class="hljs-title class_">PerformanceBaseline</span> = {
      url,
      metrics,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      commitHash,
    };

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span>.<span class="hljs-title function_">has</span>(url)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span>.<span class="hljs-title function_">set</span>(url, []);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span>.<span class="hljs-title function_">get</span>(url)!.<span class="hljs-title function_">push</span>(baseline);

    <span class="hljs-comment">// Keep only last 50 baselines</span>
    <span class="hljs-keyword">const</span> urlBaselines = <span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span>.<span class="hljs-title function_">get</span>(url)!;
    <span class="hljs-keyword">if</span> (urlBaselines.<span class="hljs-property">length</span> &gt; <span class="hljs-number">50</span>) {
      urlBaselines.<span class="hljs-title function_">splice</span>(<span class="hljs-number">0</span>, urlBaselines.<span class="hljs-property">length</span> - <span class="hljs-number">50</span>);
    }

    <span class="hljs-comment">// Store in database/file</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">persistBaselines</span>();
  }

  <span class="hljs-title function_">detectRegressions</span>(
    <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">currentMetrics</span>: <span class="hljs-title class_">PerformanceMetrics</span>,
    <span class="hljs-attr">thresholds</span>: { [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">number</span> },
  ): <span class="hljs-title class_">RegressionReport</span> {
    <span class="hljs-keyword">const</span> baselines = <span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span>.<span class="hljs-title function_">get</span>(url) || [];
    <span class="hljs-keyword">if</span> (baselines.<span class="hljs-property">length</span> &lt; <span class="hljs-number">3</span>) {
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">hasRegression</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Insufficient baseline data&#x27;</span> };
    }

    <span class="hljs-comment">// Calculate moving average of last 10 measurements</span>
    <span class="hljs-keyword">const</span> recentBaselines = baselines.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">10</span>);
    <span class="hljs-keyword">const</span> avgMetrics = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateAverageMetrics</span>(recentBaselines.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">b</span>) =&gt;</span> b.<span class="hljs-property">metrics</span>));

    <span class="hljs-keyword">const</span> regressions = [];

    <span class="hljs-comment">// Check each metric against threshold</span>
    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(thresholds).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[metric, threshold]</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> current = currentMetrics[metric <span class="hljs-keyword">as</span> keyof <span class="hljs-title class_">PerformanceMetrics</span>];
      <span class="hljs-keyword">const</span> baseline = avgMetrics[metric <span class="hljs-keyword">as</span> keyof <span class="hljs-title class_">PerformanceMetrics</span>];
      <span class="hljs-keyword">const</span> increase = ((current - baseline) / baseline) * <span class="hljs-number">100</span>;

      <span class="hljs-keyword">if</span> (increase &gt; threshold) {
        regressions.<span class="hljs-title function_">push</span>({
          metric,
          current,
          baseline,
          <span class="hljs-attr">increase</span>: <span class="hljs-string">\`<span class="hljs-subst">\${increase.toFixed(<span class="hljs-number">1</span>)}</span>%\`</span>,
          <span class="hljs-attr">threshold</span>: <span class="hljs-string">\`<span class="hljs-subst">\${threshold}</span>%\`</span>,
        });
      }
    });

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hasRegression</span>: regressions.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>,
      regressions,
      currentMetrics,
      <span class="hljs-attr">baselineMetrics</span>: avgMetrics,
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculateAverageMetrics</span>(<span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetrics</span>[]): <span class="hljs-title class_">PerformanceMetrics</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">avg</span> = (<span class="hljs-params"><span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[]</span>) =&gt; values.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, val</span>) =&gt;</span> sum + val, <span class="hljs-number">0</span>) / values.<span class="hljs-property">length</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">fcp</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">fcp</span>)),
      <span class="hljs-attr">lcp</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">lcp</span>)),
      <span class="hljs-attr">cls</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">cls</span>)),
      <span class="hljs-attr">tbt</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">tbt</span>)),
      <span class="hljs-attr">loadTime</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">loadTime</span>)),
      <span class="hljs-attr">domContentLoaded</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">domContentLoaded</span>)),
      <span class="hljs-attr">resourceCount</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">resourceCount</span>)),
      <span class="hljs-attr">transferSize</span>: <span class="hljs-title function_">avg</span>(metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">transferSize</span>)),
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">persistBaselines</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Save to file or database</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span>);
    <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">writeFile</span>(<span class="hljs-string">&#x27;performance-baselines.json&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadBaselines</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> fs.<span class="hljs-title function_">readFile</span>(<span class="hljs-string">&#x27;performance-baselines.json&#x27;</span>, <span class="hljs-string">&#x27;utf-8&#x27;</span>);
      <span class="hljs-keyword">const</span> parsed = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(data);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">baselines</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(parsed));
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;No existing baselines found&#x27;</span>);
    }
  }
}

<span class="hljs-comment">// GitHub Actions integration</span>
<span class="hljs-comment">// .github/workflows/performance.yml</span>
<span class="hljs-keyword">const</span> githubWorkflow = <span class="hljs-string">\`
name: Performance Testing

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  performance:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: &#x27;18&#x27;
          cache: &#x27;npm&#x27;

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: \\\${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Run custom performance tests
        run: npm run test:performance

      - name: Upload performance results
        uses: actions/upload-artifact@v3
        with:
          name: performance-results
          path: |
            lighthouse-reports/
            performance-results.json
\`</span>;
</code></pre>
<h2 id="أفضل-ممارسات-اختبار-الأداء">أفضل ممارسات اختبار الأداء</h2>
<h3 id="إدارة-بيانات-الاختبار">إدارة بيانات الاختبار</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Performance test data management</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceTestDataManager</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">setupTestData</span>(<span class="hljs-params"><span class="hljs-attr">scenario</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;heavy&#x27;</span> | <span class="hljs-string">&#x27;realistic&#x27;</span></span>) {
    <span class="hljs-keyword">const</span> testData = {
      <span class="hljs-attr">light</span>: {
        <span class="hljs-attr">products</span>: <span class="hljs-number">10</span>,
        <span class="hljs-attr">users</span>: <span class="hljs-number">5</span>,
        <span class="hljs-attr">images</span>: <span class="hljs-string">&#x27;optimized&#x27;</span>,
        <span class="hljs-attr">cacheState</span>: <span class="hljs-string">&#x27;warm&#x27;</span>,
      },
      <span class="hljs-attr">heavy</span>: {
        <span class="hljs-attr">products</span>: <span class="hljs-number">1000</span>,
        <span class="hljs-attr">users</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">images</span>: <span class="hljs-string">&#x27;unoptimized&#x27;</span>,
        <span class="hljs-attr">cacheState</span>: <span class="hljs-string">&#x27;cold&#x27;</span>,
      },
      <span class="hljs-attr">realistic</span>: {
        <span class="hljs-attr">products</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">users</span>: <span class="hljs-number">20</span>,
        <span class="hljs-attr">images</span>: <span class="hljs-string">&#x27;mixed&#x27;</span>,
        <span class="hljs-attr">cacheState</span>: <span class="hljs-string">&#x27;mixed&#x27;</span>,
      },
    };

    <span class="hljs-keyword">return</span> testData[scenario];
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">seedDatabase</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Seed test database with specific data</span>
    <span class="hljs-comment">// Implementation depends on your backend</span>
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">setupCacheState</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-string">&#x27;warm&#x27;</span> | <span class="hljs-string">&#x27;cold&#x27;</span> | <span class="hljs-string">&#x27;mixed&#x27;</span></span>) {
    <span class="hljs-keyword">switch</span> (state) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;warm&#x27;</span>:
        <span class="hljs-comment">// Pre-populate caches</span>
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;cold&#x27;</span>:
        <span class="hljs-comment">// Clear all caches</span>
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;mixed&#x27;</span>:
        <span class="hljs-comment">// Partially populate caches</span>
        <span class="hljs-keyword">break</span>;
    }
  }
}

<span class="hljs-comment">// Performance test utilities</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">PerformanceTestUtils</span> {
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">waitForPageToStabilize</span>(<span class="hljs-params"><span class="hljs-attr">page</span>: <span class="hljs-title class_">Page</span></span>) {
    <span class="hljs-comment">// Wait for network to be idle</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForLoadState</span>(<span class="hljs-string">&#x27;networkidle&#x27;</span>);

    <span class="hljs-comment">// Wait for any animations to complete</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">500</span>);

    <span class="hljs-comment">// Wait for layout shifts to settle</span>
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> lastLayoutShift = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
            <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">entryType</span> === <span class="hljs-string">&#x27;layout-shift&#x27;</span>) {
              lastLayoutShift = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
            }
          }
        }).<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;layout-shift&#x27;</span>] });

        <span class="hljs-keyword">const</span> <span class="hljs-title function_">checkStability</span> = (<span class="hljs-params"></span>) =&gt; {
          <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - lastLayoutShift &gt; <span class="hljs-number">100</span>) {
            <span class="hljs-title function_">resolve</span>(<span class="hljs-literal">undefined</span>);
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">setTimeout</span>(checkStability, <span class="hljs-number">50</span>);
          }
        };

        <span class="hljs-built_in">setTimeout</span>(checkStability, <span class="hljs-number">50</span>);
      });
    });
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">calculatePerformanceScore</span>(<span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetrics</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// Simplified scoring based on Core Web Vitals</span>
    <span class="hljs-keyword">const</span> fcpScore = metrics.<span class="hljs-property">fcp</span> &lt;= <span class="hljs-number">1800</span> ? <span class="hljs-number">100</span> : <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">100</span> - (metrics.<span class="hljs-property">fcp</span> - <span class="hljs-number">1800</span>) / <span class="hljs-number">10</span>);
    <span class="hljs-keyword">const</span> lcpScore = metrics.<span class="hljs-property">lcp</span> &lt;= <span class="hljs-number">2500</span> ? <span class="hljs-number">100</span> : <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">100</span> - (metrics.<span class="hljs-property">lcp</span> - <span class="hljs-number">2500</span>) / <span class="hljs-number">20</span>);
    <span class="hljs-keyword">const</span> clsScore = metrics.<span class="hljs-property">cls</span> &lt;= <span class="hljs-number">0.1</span> ? <span class="hljs-number">100</span> : <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">100</span> - (metrics.<span class="hljs-property">cls</span> - <span class="hljs-number">0.1</span>) * <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> (fcpScore + lcpScore + clsScore) / <span class="hljs-number">3</span>;
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">generatePerformanceReport</span>(<span class="hljs-attr">results</span>: <span class="hljs-title class_">PerformanceTestResult</span>[]): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> report = <span class="hljs-string">\`
# Performance Test Report

Generated: <span class="hljs-subst">\${<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toISOString()}</span>

## Summary
- Total Tests: <span class="hljs-subst">\${results.length}</span>
- Passed: <span class="hljs-subst">\${results.filter((r) =&gt; r.passed).length}</span>
- Failed: <span class="hljs-subst">\${results.filter((r) =&gt; !r.passed).length}</span>

## Results
<span class="hljs-subst">\${results
  .map(
    (result) =&gt; <span class="hljs-string">\`
### <span class="hljs-subst">\${result.testName}</span>
- Status: <span class="hljs-subst">\${result.passed ? <span class="hljs-string">&#x27;✅ PASSED&#x27;</span> : <span class="hljs-string">&#x27;❌ FAILED&#x27;</span>}</span>
- Performance Score: <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.calculatePerformanceScore(result.metrics).toFixed(<span class="hljs-number">1</span>)}</span>/100
- FCP: <span class="hljs-subst">\${result.metrics.fcp.toFixed(<span class="hljs-number">0</span>)}</span>ms
- LCP: <span class="hljs-subst">\${result.metrics.lcp.toFixed(<span class="hljs-number">0</span>)}</span>ms
- CLS: <span class="hljs-subst">\${result.metrics.cls.toFixed(<span class="hljs-number">3</span>)}</span>

<span class="hljs-subst">\${result.violations.length &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">\`**Violations:**\\n<span class="hljs-subst">\${result.violations.map((v) =&gt; <span class="hljs-string">\`- <span class="hljs-subst">\${v}</span>\`</span>).join(<span class="hljs-string">&#x27;\\n&#x27;</span>)}</span>\`</span> : <span class="hljs-string">&#x27;&#x27;</span>}</span>
\`</span>,
  )
  .join(<span class="hljs-string">&#x27;&#x27;</span>)}</span>
    \`</span>;

    <span class="hljs-keyword">return</span> report.<span class="hljs-title function_">trim</span>();
  }
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
