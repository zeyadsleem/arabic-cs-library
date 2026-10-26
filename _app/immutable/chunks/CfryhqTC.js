const s="kinney",a="react-performance",n="أداء React",l="bundle-analysis-deep-dive",p="تحليل الحزم بعمق",t=[{depth:2,id:"فهم-بنية-حزمتك",text:"فهم بنية حزمتك"},{depth:2,id:"webpack-bundle-analyzer-رؤيتك-بالأشعة-السينية",text:"Webpack Bundle Analyzer: رؤيتك بالأشعة السينية"},{depth:3,id:"الإعداد-والتهيئة",text:"الإعداد والتهيئة"},{depth:3,id:"قراءة-مخرجات-المحلل",text:"قراءة مخرجات المحلّل"},{depth:3,id:"تقنيات-تحليل-متقدمة",text:"تقنيات تحليل متقدّمة"},{depth:2,id:"تحليل-خرائط-المصدر",text:"تحليل خرائط المصدر"},{depth:2,id:"تدقيق-الاعتمادات",text:"تدقيق الاعتمادات"},{depth:3,id:"تحليل-الاعتمادات-الآلي",text:"تحليل الاعتمادات الآلي"},{depth:2,id:"استراتيجيات-تحسين-الحزمة",text:"استراتيجيات تحسين الحزمة"},{depth:3,id:"تعزيز-اهتزاز-الشجرة",text:"تعزيز اهتزاز الشجرة"},{depth:3,id:"تحسين-تقسيم-الشيفرة",text:"تحسين تقسيم الشيفرة"},{depth:2,id:"دمج-اختبارات-الأداء",text:"دمج اختبارات الأداء"},{depth:2,id:"المراقبة-المستمرة",text:"المراقبة المستمرة"}],e=`<p>حزمتك من React صندوق مغلق حتى تفتحه. فملف JavaScript بحجم 2MB ذاك قد يحتوي اعتمادات مكرّرة، أو شيفرة غير مستخدمة، أو مكتبة واحدة سيئة الاختيار أكبر عشر مرات من بدائلها. يحوّل تحليل الحزمة التخمين إلى تحسين مبني على البيانات — فيُريك بالضبط ما يُرسَل، ولماذا هو هناك، وأين يمكنك تقليص الحجم الزائد دون كسر الوظائف.</p>
<p>الفرق بين تطبيق React سريع وآخر بطيء يعود غالبًا إلى ما داخل الحزمة. فكل كيلوبايت مهم، خصوصًا على شبكات الهاتف حيث قد يستغرق 200KB ثلاث ثوانٍ للتنزيل. أتقن تحليل الحزمة، وستلتقط تراجع الأداء قبل المستخدمين، وتحدّد فرص تحسين لا يكشفها حدسك أبدًا، وتتخذ قرارات مدروسة بشأن كل اعتماد تضيفه.</p>
<h2 id="فهم-بنية-حزمتك">فهم بنية حزمتك</h2>
<p>تُنتج تطبيقات React الحديثة عادةً ملفات حزمة متعددة عبر تقسيم الشيفرة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Typical webpack output structure</span>
dist/
├── main.[hash].<span class="hljs-property">js</span>          <span class="hljs-comment">// App entry point + dependencies</span>
├── vendor.[hash].<span class="hljs-property">js</span>        <span class="hljs-comment">// Third-party libraries (React, etc.)</span>
├── runtime.[hash].<span class="hljs-property">js</span>       <span class="hljs-comment">// Webpack module loading logic</span>
├── components.[hash].<span class="hljs-property">js</span>    <span class="hljs-comment">// Lazy-loaded component chunks</span>
└── pages.[hash].<span class="hljs-property">js</span>         <span class="hljs-comment">// Route-based chunks</span>

<span class="hljs-comment">// Bundle composition example</span>
<span class="hljs-keyword">const</span> bundleBreakdown = {
  <span class="hljs-attr">main</span>: {
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;250KB&#x27;</span>,
    <span class="hljs-attr">contains</span>: [<span class="hljs-string">&#x27;App component&#x27;</span>, <span class="hljs-string">&#x27;Router setup&#x27;</span>, <span class="hljs-string">&#x27;Core utilities&#x27;</span>],
  },
  <span class="hljs-attr">vendor</span>: {
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;180KB&#x27;</span>,
    <span class="hljs-attr">contains</span>: [<span class="hljs-string">&#x27;React&#x27;</span>, <span class="hljs-string">&#x27;React-DOM&#x27;</span>, <span class="hljs-string">&#x27;Core libraries&#x27;</span>],
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;120KB&#x27;</span>,
    <span class="hljs-attr">contains</span>: [<span class="hljs-string">&#x27;UI components&#x27;</span>, <span class="hljs-string">&#x27;Form libraries&#x27;</span>, <span class="hljs-string">&#x27;Charts&#x27;</span>],
  },
};
</code></pre>
<p>تخدم كل حزمة استراتيجية تخزين مؤقت مختلفة — فحزم المورّدين نادرًا ما تتغيّر، وحزم التطبيق الأساسية تتغيّر مع تحديثات التطبيق، وحزم المكوّنات تتغيّر عند تعديل الميزات.</p>
<h2 id="webpack-bundle-analyzer-رؤيتك-بالأشعة-السينية">Webpack Bundle Analyzer: رؤيتك بالأشعة السينية</h2>
<p>يُعدّ webpack-bundle-analyzer المعيار الذهبي لتصوّر محتوى الحزمة:</p>
<h3 id="الإعداد-والتهيئة">الإعداد والتهيئة</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;webpack-bundle-analyzer&#x27;</span>).<span class="hljs-property">BundleAnalyzerPlugin</span>;

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-comment">// ... other config</span>
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// Conditional analyzer - only run when needed</span>
    process.<span class="hljs-property">env</span>.<span class="hljs-property">ANALYZE</span> &amp;&amp; <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span>({
      <span class="hljs-attr">analyzerMode</span>: <span class="hljs-string">&#x27;server&#x27;</span>,
      <span class="hljs-attr">openAnalyzer</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">analyzerPort</span>: <span class="hljs-number">8888</span>,
    }),

    <span class="hljs-comment">// Generate static report for CI</span>
    process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span> &amp;&amp; <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span>({
      <span class="hljs-attr">analyzerMode</span>: <span class="hljs-string">&#x27;static&#x27;</span>,
      <span class="hljs-attr">openAnalyzer</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">reportFilename</span>: <span class="hljs-string">&#x27;../reports/bundle-report.html&#x27;</span>,
    }),
  ].<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>),

  <span class="hljs-comment">// Enhanced stats for better analysis</span>
  <span class="hljs-attr">stats</span>: {
    <span class="hljs-attr">assets</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">chunks</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">reasons</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Shows why modules are included</span>
    <span class="hljs-attr">usedExports</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Shows which exports are used</span>
    <span class="hljs-attr">providedExports</span>: <span class="hljs-literal">true</span>,
  },
};

<span class="hljs-comment">// package.json scripts</span>
{
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;analyze&quot;</span>: <span class="hljs-string">&quot;ANALYZE=true npm run build&quot;</span>,
    <span class="hljs-string">&quot;analyze:ci&quot;</span>: <span class="hljs-string">&quot;CI=true npm run build &amp;&amp; open reports/bundle-report.html&quot;</span>
  }
}
</code></pre>
<h3 id="قراءة-مخرجات-المحلل">قراءة مخرجات المحلّل</h3>
<p>يعرض محلّل الحزمة ثلاثة مقاييس رئيسية لكل وحدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModuleAnalysis</span> {
  <span class="hljs-comment">// Raw size from webpack stats</span>
  <span class="hljs-attr">statSize</span>: <span class="hljs-built_in">number</span>;

  <span class="hljs-comment">// Size after minification but before compression</span>
  <span class="hljs-attr">parsedSize</span>: <span class="hljs-built_in">number</span>;

  <span class="hljs-comment">// Size after gzip compression (closest to network transfer)</span>
  <span class="hljs-attr">gzipSize</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Example analysis findings</span>
<span class="hljs-keyword">const</span> analysisFindings = {
  <span class="hljs-comment">// Large modules that might need optimization</span>
  <span class="hljs-attr">suspects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;lodash&#x27;</span>,
      <span class="hljs-attr">parsedSize</span>: <span class="hljs-string">&#x27;70KB&#x27;</span>,
      <span class="hljs-attr">issue</span>: <span class="hljs-string">&#x27;Importing entire library for 3 functions&#x27;</span>,
      <span class="hljs-attr">solution</span>: <span class="hljs-string">&#x27;Use lodash-es or individual imports&#x27;</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;moment.js + locales&#x27;</span>,
      <span class="hljs-attr">parsedSize</span>: <span class="hljs-string">&#x27;280KB&#x27;</span>,
      <span class="hljs-attr">issue</span>: <span class="hljs-string">&#x27;All locales included by default&#x27;</span>,
      <span class="hljs-attr">solution</span>: <span class="hljs-string">&#x27;Use date-fns or exclude unused locales&#x27;</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;react-icons (all icons)&#x27;</span>,
      <span class="hljs-attr">parsedSize</span>: <span class="hljs-string">&#x27;150KB&#x27;</span>,
      <span class="hljs-attr">issue</span>: <span class="hljs-string">&#x27;Bundling all icons when using only 5&#x27;</span>,
      <span class="hljs-attr">solution</span>: <span class="hljs-string">&#x27;Use individual icon imports&#x27;</span>,
    },
  ],

  <span class="hljs-comment">// Unexpected duplicates</span>
  <span class="hljs-attr">duplicates</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;React&#x27;</span>,
      <span class="hljs-attr">instances</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">totalSize</span>: <span class="hljs-string">&#x27;180KB&#x27;</span>,
      <span class="hljs-attr">cause</span>: <span class="hljs-string">&#x27;Different versions in dependency tree&#x27;</span>,
      <span class="hljs-attr">solution</span>: <span class="hljs-string">&#x27;Use webpack resolve.alias or peerDependencies&#x27;</span>,
    },
  ],
};
</code></pre>
<h3 id="تقنيات-تحليل-متقدمة">تقنيات تحليل متقدّمة</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// Custom webpack plugin to analyze bundle composition</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">BundleCompositionAnalyzer</span> {
  <span class="hljs-title function_">apply</span>(<span class="hljs-params">compiler</span>) {
    compiler.<span class="hljs-property">hooks</span>.<span class="hljs-property">emit</span>.<span class="hljs-title function_">tapAsync</span>(<span class="hljs-string">&#x27;BundleCompositionAnalyzer&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">compilation, callback</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> stats = compilation.<span class="hljs-title function_">getStats</span>().<span class="hljs-title function_">toJson</span>();

      <span class="hljs-comment">// Analyze chunk relationships</span>
      <span class="hljs-keyword">const</span> chunkAnalysis = stats.<span class="hljs-property">chunks</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> ({
        <span class="hljs-attr">name</span>: chunk.<span class="hljs-property">names</span>[<span class="hljs-number">0</span>],
        <span class="hljs-attr">size</span>: chunk.<span class="hljs-property">size</span>,
        <span class="hljs-attr">modules</span>: chunk.<span class="hljs-property">modules</span>?.<span class="hljs-property">length</span> || <span class="hljs-number">0</span>,
        <span class="hljs-attr">parents</span>: chunk.<span class="hljs-property">parents</span>,
        <span class="hljs-attr">children</span>: chunk.<span class="hljs-property">children</span>,
        <span class="hljs-comment">// Calculate module overlap between chunks</span>
        <span class="hljs-attr">sharedModules</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findSharedModules</span>(chunk, stats.<span class="hljs-property">chunks</span>),
      }));

      <span class="hljs-comment">// Find optimization opportunities</span>
      <span class="hljs-keyword">const</span> optimizationOpportunities = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findOptimizations</span>(chunkAnalysis);

      <span class="hljs-comment">// Generate detailed report</span>
      <span class="hljs-keyword">const</span> report = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateReport</span>(chunkAnalysis, optimizationOpportunities);

      <span class="hljs-comment">// Write to file</span>
      compilation.<span class="hljs-property">assets</span>[<span class="hljs-string">&#x27;bundle-composition.json&#x27;</span>] = {
        <span class="hljs-attr">source</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(report, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>),
        <span class="hljs-attr">size</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(report).<span class="hljs-property">length</span>,
      };

      <span class="hljs-title function_">callback</span>();
    });
  }

  <span class="hljs-title function_">findSharedModules</span>(<span class="hljs-params">targetChunk, allChunks</span>) {
    <span class="hljs-keyword">const</span> targetModules = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(targetChunk.<span class="hljs-property">modules</span>?.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">name</span>) || []);

    <span class="hljs-keyword">return</span> allChunks
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> chunk.<span class="hljs-property">names</span>[<span class="hljs-number">0</span>] !== targetChunk.<span class="hljs-property">names</span>[<span class="hljs-number">0</span>])
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> ({
        <span class="hljs-attr">chunkName</span>: chunk.<span class="hljs-property">names</span>[<span class="hljs-number">0</span>],
        <span class="hljs-attr">sharedCount</span>: chunk.<span class="hljs-property">modules</span>?.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> targetModules.<span class="hljs-title function_">has</span>(m.<span class="hljs-property">name</span>)).<span class="hljs-property">length</span> || <span class="hljs-number">0</span>,
      }))
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> result.<span class="hljs-property">sharedCount</span> &gt; <span class="hljs-number">0</span>);
  }

  <span class="hljs-title function_">findOptimizations</span>(<span class="hljs-params">chunkAnalysis</span>) {
    <span class="hljs-keyword">const</span> opportunities = [];

    <span class="hljs-comment">// Find chunks that could be merged</span>
    chunkAnalysis.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (chunk.<span class="hljs-property">size</span> &lt; <span class="hljs-number">20000</span>) {
        <span class="hljs-comment">// Less than 20KB</span>
        opportunities.<span class="hljs-title function_">push</span>({
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;merge&#x27;</span>,
          <span class="hljs-attr">target</span>: chunk.<span class="hljs-property">name</span>,
          <span class="hljs-attr">reason</span>: <span class="hljs-string">&#x27;Small chunk could be merged to reduce HTTP requests&#x27;</span>,
          <span class="hljs-attr">recommendation</span>: <span class="hljs-string">\`Consider merging <span class="hljs-subst">\${chunk.name}</span> with parent chunk\`</span>,
        });
      }

      <span class="hljs-comment">// Find excessive module overlap</span>
      chunk.<span class="hljs-property">sharedModules</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">shared</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (shared.<span class="hljs-property">sharedCount</span> &gt; <span class="hljs-number">10</span>) {
          opportunities.<span class="hljs-title function_">push</span>({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;extract-common&#x27;</span>,
            <span class="hljs-attr">target</span>: <span class="hljs-string">\`<span class="hljs-subst">\${chunk.name}</span> &amp; <span class="hljs-subst">\${shared.chunkName}</span>\`</span>,
            <span class="hljs-attr">reason</span>: <span class="hljs-string">\`<span class="hljs-subst">\${shared.sharedCount}</span> shared modules\`</span>,
            <span class="hljs-attr">recommendation</span>: <span class="hljs-string">&#x27;Extract shared modules into common chunk&#x27;</span>,
          });
        }
      });
    });

    <span class="hljs-keyword">return</span> opportunities;
  }
}
</code></pre>
<h2 id="تحليل-خرائط-المصدر">تحليل خرائط المصدر</h2>
<p>تكشف خرائط المصدر التركيب الحقيقي لحزمك المصغَّرة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Analyze source maps to find unused code</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;fs&#x27;</span>);
<span class="hljs-keyword">const</span> sourceMap = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;source-map&#x27;</span>);

<span class="hljs-keyword">class</span> <span class="hljs-title class_">SourceMapAnalyzer</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">analyzeBundle</span>(<span class="hljs-params">bundlePath, mapPath</span>) {
    <span class="hljs-keyword">const</span> bundleContent = fs.<span class="hljs-title function_">readFileSync</span>(bundlePath, <span class="hljs-string">&#x27;utf8&#x27;</span>);
    <span class="hljs-keyword">const</span> mapContent = fs.<span class="hljs-title function_">readFileSync</span>(mapPath, <span class="hljs-string">&#x27;utf8&#x27;</span>);

    <span class="hljs-keyword">const</span> consumer = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> sourceMap.<span class="hljs-title class_">SourceMapConsumer</span>(mapContent);

    <span class="hljs-keyword">const</span> analysis = {
      <span class="hljs-attr">totalSize</span>: bundleContent.<span class="hljs-property">length</span>,
      <span class="hljs-attr">sourceFiles</span>: [],
      <span class="hljs-attr">unusedSources</span>: [],
      <span class="hljs-attr">largeSources</span>: [],
    };

    <span class="hljs-comment">// Analyze each source file contribution</span>
    consumer.<span class="hljs-property">sources</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">source</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> sourceContent = consumer.<span class="hljs-title function_">sourceContentFor</span>(source);
      <span class="hljs-keyword">if</span> (!sourceContent) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">const</span> sizeInBundle = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateSourceSizeInBundle</span>(source, consumer);

      <span class="hljs-keyword">const</span> sourceInfo = {
        <span class="hljs-attr">path</span>: source,
        <span class="hljs-attr">originalSize</span>: sourceContent.<span class="hljs-property">length</span>,
        <span class="hljs-attr">bundleSize</span>: sizeInBundle,
        <span class="hljs-attr">ratio</span>: sizeInBundle / sourceContent.<span class="hljs-property">length</span>,
      };

      analysis.<span class="hljs-property">sourceFiles</span>.<span class="hljs-title function_">push</span>(sourceInfo);

      <span class="hljs-comment">// Flag potential issues</span>
      <span class="hljs-keyword">if</span> (sizeInBundle === <span class="hljs-number">0</span>) {
        analysis.<span class="hljs-property">unusedSources</span>.<span class="hljs-title function_">push</span>(source);
      }

      <span class="hljs-keyword">if</span> (sizeInBundle &gt; <span class="hljs-number">50000</span>) {
        <span class="hljs-comment">// &gt; 50KB</span>
        analysis.<span class="hljs-property">largeSources</span>.<span class="hljs-title function_">push</span>(sourceInfo);
      }
    });

    <span class="hljs-keyword">return</span> analysis;
  }

  <span class="hljs-title function_">calculateSourceSizeInBundle</span>(<span class="hljs-params">sourcePath, consumer</span>) {
    <span class="hljs-keyword">let</span> bundleSize = <span class="hljs-number">0</span>;

    <span class="hljs-comment">// This is simplified - real implementation would need to</span>
    <span class="hljs-comment">// traverse all mappings and calculate actual bundle contribution</span>
    consumer.<span class="hljs-title function_">eachMapping</span>(<span class="hljs-function">(<span class="hljs-params">mapping</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (mapping.<span class="hljs-property">source</span> === sourcePath) {
        bundleSize += <span class="hljs-number">1</span>; <span class="hljs-comment">// Rough approximation</span>
      }
    });

    <span class="hljs-keyword">return</span> bundleSize;
  }
}

<span class="hljs-comment">// Usage in build process</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">analyzeSourceMaps</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> analyzer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SourceMapAnalyzer</span>();

  <span class="hljs-keyword">const</span> analysis = <span class="hljs-keyword">await</span> analyzer.<span class="hljs-title function_">analyzeBundle</span>(<span class="hljs-string">&#x27;dist/main.js&#x27;</span>, <span class="hljs-string">&#x27;dist/main.js.map&#x27;</span>);

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Large sources (&gt;50KB):&#x27;</span>);
  analysis.<span class="hljs-property">largeSources</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">source</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${source.path}</span>: <span class="hljs-subst">\${(source.bundleSize / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>KB\`</span>);
  });

  <span class="hljs-keyword">if</span> (analysis.<span class="hljs-property">unusedSources</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Potentially unused sources:&#x27;</span>);
    analysis.<span class="hljs-property">unusedSources</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">source</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`- <span class="hljs-subst">\${source}</span>\`</span>));
  }
}
</code></pre>
<h2 id="تدقيق-الاعتمادات">تدقيق الاعتمادات</h2>
<h3 id="تحليل-الاعتمادات-الآلي">تحليل الاعتمادات الآلي</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// package.json analyzer</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;fs&#x27;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;path&#x27;</span>);

<span class="hljs-keyword">class</span> <span class="hljs-title class_">DependencyAnalyzer</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">projectRoot</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">projectRoot</span> = projectRoot;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">packageJson</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(fs.<span class="hljs-title function_">readFileSync</span>(path.<span class="hljs-title function_">join</span>(projectRoot, <span class="hljs-string">&#x27;package.json&#x27;</span>), <span class="hljs-string">&#x27;utf8&#x27;</span>));
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">analyzeDependencies</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> dependencies = {
      ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">packageJson</span>.<span class="hljs-property">dependencies</span>,
      ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">packageJson</span>.<span class="hljs-property">devDependencies</span>,
    };

    <span class="hljs-keyword">const</span> analysis = {
      <span class="hljs-attr">total</span>: <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(dependencies).<span class="hljs-property">length</span>,
      <span class="hljs-attr">bundleImpact</span>: {},
      <span class="hljs-attr">alternatives</span>: {},
      <span class="hljs-attr">unused</span>: [],
    };

    <span class="hljs-comment">// Analyze each dependency</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [name, version] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(dependencies)) {
      <span class="hljs-keyword">const</span> depAnalysis = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyzeDependency</span>(name);

      analysis.<span class="hljs-property">bundleImpact</span>[name] = depAnalysis.<span class="hljs-property">bundleSize</span>;

      <span class="hljs-keyword">if</span> (depAnalysis.<span class="hljs-property">alternatives</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
        analysis.<span class="hljs-property">alternatives</span>[name] = depAnalysis.<span class="hljs-property">alternatives</span>;
      }

      <span class="hljs-keyword">if</span> (!depAnalysis.<span class="hljs-property">isUsed</span>) {
        analysis.<span class="hljs-property">unused</span>.<span class="hljs-title function_">push</span>(name);
      }
    }

    <span class="hljs-keyword">return</span> analysis;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">analyzeDependency</span>(<span class="hljs-params">name</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Get package info</span>
      <span class="hljs-keyword">const</span> packagePath = path.<span class="hljs-title function_">join</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">projectRoot</span>, <span class="hljs-string">&#x27;node_modules&#x27;</span>, name, <span class="hljs-string">&#x27;package.json&#x27;</span>);
      <span class="hljs-keyword">const</span> packageInfo = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(fs.<span class="hljs-title function_">readFileSync</span>(packagePath, <span class="hljs-string">&#x27;utf8&#x27;</span>));

      <span class="hljs-comment">// Check if dependency is actually imported</span>
      <span class="hljs-keyword">const</span> isUsed = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkUsage</span>(name);

      <span class="hljs-comment">// Estimate bundle size impact</span>
      <span class="hljs-keyword">const</span> bundleSize = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">estimateBundleSize</span>(name, packageInfo);

      <span class="hljs-comment">// Find alternatives</span>
      <span class="hljs-keyword">const</span> alternatives = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findAlternatives</span>(name, bundleSize);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">version</span>: packageInfo.<span class="hljs-property">version</span>,
        bundleSize,
        isUsed,
        alternatives,
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;unknown&#x27;</span>,
        <span class="hljs-attr">bundleSize</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">isUsed</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">alternatives</span>: [],
        <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span>,
      };
    }
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">checkUsage</span>(<span class="hljs-params">dependencyName</span>) {
    <span class="hljs-keyword">const</span> { execSync } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;child_process&#x27;</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Search for imports in source files</span>
      <span class="hljs-keyword">const</span> grepResult = <span class="hljs-title function_">execSync</span>(
        <span class="hljs-string">\`grep -r &quot;import.*<span class="hljs-subst">\${dependencyName}</span>&quot; src/ --include=&quot;*.ts&quot; --include=&quot;*.tsx&quot; --include=&quot;*.js&quot; --include=&quot;*.jsx&quot;\`</span>,
        { <span class="hljs-attr">encoding</span>: <span class="hljs-string">&#x27;utf8&#x27;</span>, <span class="hljs-attr">cwd</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">projectRoot</span> },
      );

      <span class="hljs-keyword">return</span> grepResult.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// No matches found</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">estimateBundleSize</span>(<span class="hljs-params">name, packageInfo</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> mainFile = packageInfo.<span class="hljs-property">main</span> || <span class="hljs-string">&#x27;index.js&#x27;</span>;
      <span class="hljs-keyword">const</span> mainPath = path.<span class="hljs-title function_">join</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">projectRoot</span>, <span class="hljs-string">&#x27;node_modules&#x27;</span>, name, mainFile);

      <span class="hljs-keyword">if</span> (fs.<span class="hljs-title function_">existsSync</span>(mainPath)) {
        <span class="hljs-keyword">const</span> stats = fs.<span class="hljs-title function_">statSync</span>(mainPath);
        <span class="hljs-keyword">return</span> stats.<span class="hljs-property">size</span>;
      }

      <span class="hljs-comment">// Fallback: estimate from package directory size</span>
      <span class="hljs-keyword">const</span> packageDir = path.<span class="hljs-title function_">join</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">projectRoot</span>, <span class="hljs-string">&#x27;node_modules&#x27;</span>, name);
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getDirectorySize</span>(packageDir);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }
  }

  <span class="hljs-title function_">getDirectorySize</span>(<span class="hljs-params">dirPath</span>) {
    <span class="hljs-keyword">let</span> totalSize = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> files = fs.<span class="hljs-title function_">readdirSync</span>(dirPath);

      files.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> filePath = path.<span class="hljs-title function_">join</span>(dirPath, file);
        <span class="hljs-keyword">const</span> stats = fs.<span class="hljs-title function_">statSync</span>(filePath);

        <span class="hljs-keyword">if</span> (stats.<span class="hljs-title function_">isFile</span>()) {
          totalSize += stats.<span class="hljs-property">size</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (stats.<span class="hljs-title function_">isDirectory</span>() &amp;&amp; file !== <span class="hljs-string">&#x27;node_modules&#x27;</span>) {
          totalSize += <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getDirectorySize</span>(filePath);
        }
      });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Directory doesn&#x27;t exist or can&#x27;t be read</span>
    }

    <span class="hljs-keyword">return</span> totalSize;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">findAlternatives</span>(<span class="hljs-params">name, currentSize</span>) {
    <span class="hljs-comment">// Database of known alternatives with size comparisons</span>
    <span class="hljs-keyword">const</span> alternatives = {
      <span class="hljs-attr">moment</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;date-fns&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.7</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;70% smaller, tree-shakable&#x27;</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;dayjs&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.9</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;90% smaller, similar API&#x27;</span> },
      ],
      <span class="hljs-attr">lodash</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;lodash-es&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.0</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;Tree-shakable version&#x27;</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;ramda&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.2</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;Functional alternative&#x27;</span> },
      ],
      <span class="hljs-attr">axios</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;fetch (native)&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">1.0</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;No bundle impact&#x27;</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;ky&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.8</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;80% smaller&#x27;</span> },
      ],
      <span class="hljs-string">&#x27;react-router&#x27;</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;@reach/router&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.3</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;Smaller, now merged back&#x27;</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;wouter&#x27;</span>, <span class="hljs-attr">sizeReduction</span>: <span class="hljs-number">0.9</span>, <span class="hljs-attr">note</span>: <span class="hljs-string">&#x27;90% smaller for simple routing&#x27;</span> },
      ],
    };

    <span class="hljs-keyword">return</span> alternatives[name] || [];
  }
}

<span class="hljs-comment">// Generate dependency report</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateDependencyReport</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> analyzer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">DependencyAnalyzer</span>(process.<span class="hljs-title function_">cwd</span>());
  <span class="hljs-keyword">const</span> analysis = <span class="hljs-keyword">await</span> analyzer.<span class="hljs-title function_">analyzeDependencies</span>();

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;📦 Dependency Analysis Report\\n&#x27;</span>);

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Total dependencies: <span class="hljs-subst">\${analysis.total}</span>\`</span>);

  <span class="hljs-keyword">if</span> (analysis.<span class="hljs-property">unused</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n🚫 Unused dependencies:&#x27;</span>);
    analysis.<span class="hljs-property">unused</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">dep</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`- <span class="hljs-subst">\${dep}</span>\`</span>));
  }

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n📊 Bundle impact (largest first):&#x27;</span>);
  <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(analysis.<span class="hljs-property">bundleImpact</span>)
    .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">[, a], [, b]</span>) =&gt;</span> b - a)
    .<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>)
    .<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[name, size]</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`- <span class="hljs-subst">\${name}</span>: <span class="hljs-subst">\${(size / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>KB\`</span>);
    });

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n🔄 Alternatives available:&#x27;</span>);
  <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(analysis.<span class="hljs-property">alternatives</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[name, alternatives]</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`\\n<span class="hljs-subst">\${name}</span>:\`</span>);
    alternatives.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">alt</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`  → <span class="hljs-subst">\${alt.name}</span>: <span class="hljs-subst">\${alt.note}</span>\`</span>);
    });
  });
}
</code></pre>
<h2 id="استراتيجيات-تحسين-الحزمة">استراتيجيات تحسين الحزمة</h2>
<h3 id="تعزيز-اهتزاز-الشجرة">تعزيز اهتزاز الشجرة</h3>
<p>يزيل اهتزاز الشجرة الشيفرة غير المستخدمة من حزمتك. وعند تحليل الحزم، ابحث عن:</p>
<ul>
<li>الوحدات التي تستورد مكتبات كاملة وهي لا تستخدم إلا دوال قليلة</li>
<li>التصديرات الكبيرة غير المستخدمة التي لم تُحذف</li>
<li>وحدات CommonJS التي لا يمكن اهتزاز شجرتها</li>
</ul>
<p>لتفاصيل تهيئة اهتزاز الشجرة وتحسينه، انظر <a href="https://stevekinney.com/courses/react-performance/tree-shaking-optimization">تحسين اهتزاز الشجرة</a>.</p>
<h3 id="تحسين-تقسيم-الشيفرة">تحسين تقسيم الشيفرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// React component with optimized code splitting</span>
<span class="hljs-keyword">import</span> { lazy, <span class="hljs-title class_">Suspense</span>, <span class="hljs-title class_">ComponentType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Lazy loading with error boundaries</span>
<span class="hljs-keyword">function</span> lazyWithRetry&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;(
  <span class="hljs-attr">componentImport</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;{ <span class="hljs-attr">default</span>: T }&gt;,
): <span class="hljs-title class_">React</span>.<span class="hljs-property">LazyExoticComponent</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">lazy</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> pageHasAlreadyBeenForceRefreshed = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">sessionStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;page-has-been-force-refreshed&#x27;</span>) || <span class="hljs-string">&#x27;false&#x27;</span>,
    );

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> component = <span class="hljs-keyword">await</span> <span class="hljs-title function_">componentImport</span>();
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">sessionStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;page-has-been-force-refreshed&#x27;</span>, <span class="hljs-string">&#x27;false&#x27;</span>);
      <span class="hljs-keyword">return</span> component;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">if</span> (!pageHasAlreadyBeenForceRefreshed) {
        <span class="hljs-variable language_">window</span>.<span class="hljs-property">sessionStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;page-has-been-force-refreshed&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-title function_">reload</span>();
      }
      <span class="hljs-keyword">throw</span> error;
    }
  });
}

<span class="hljs-comment">// Preload components based on user behavior</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePreloadRoute</span>(<span class="hljs-params"><span class="hljs-attr">routePath</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> preloadRoute = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> routeComponent = routeMap[routePath];
    <span class="hljs-keyword">if</span> (routeComponent) {
      <span class="hljs-comment">// Preload the component</span>
      <span class="hljs-title function_">routeComponent</span>();
    }
  }, [routePath]);

  <span class="hljs-comment">// Preload on hover with delay</span>
  <span class="hljs-keyword">const</span> handleMouseEnter = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">setTimeout</span>(preloadRoute, <span class="hljs-number">100</span>);
  }, [preloadRoute]);

  <span class="hljs-keyword">return</span> { preloadRoute, handleMouseEnter };
}

<span class="hljs-comment">// Route map for preloading</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">routeMap</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = {
  <span class="hljs-string">&#x27;/dashboard&#x27;</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./pages/Dashboard&#x27;</span>),
  <span class="hljs-string">&#x27;/profile&#x27;</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./pages/Profile&#x27;</span>),
  <span class="hljs-string">&#x27;/settings&#x27;</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./pages/Settings&#x27;</span>),
};

<span class="hljs-comment">// Smart navigation with preloading</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">NavigationLink</span>(<span class="hljs-params">{ to, children }: { to: <span class="hljs-built_in">string</span>; children: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> { handleMouseEnter } = <span class="hljs-title function_">usePreloadRoute</span>(to);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{to}</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{handleMouseEnter}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="دمج-اختبارات-الأداء">دمج اختبارات الأداء</h2>
<pre><code class="language-javascript"><span class="hljs-comment">// Bundle size regression testing</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;fs&#x27;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;path&#x27;</span>);

<span class="hljs-keyword">class</span> <span class="hljs-title class_">BundleRegressionTest</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">distPath, thresholds</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">distPath</span> = distPath;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">thresholds</span> = thresholds;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">runTests</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> currentSizes = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getCurrentBundleSizes</span>();
    <span class="hljs-keyword">const</span> previousSizes = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getPreviousBundleSizes</span>();

    <span class="hljs-keyword">const</span> results = {
      <span class="hljs-attr">passed</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">tests</span>: [],
      <span class="hljs-attr">summary</span>: {},
    };

    <span class="hljs-comment">// Test against absolute thresholds</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [bundle, size] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(currentSizes)) {
      <span class="hljs-keyword">const</span> threshold = <span class="hljs-variable language_">this</span>.<span class="hljs-property">thresholds</span>[bundle];
      <span class="hljs-keyword">const</span> passed = !threshold || size &lt;= threshold;

      results.<span class="hljs-property">tests</span>.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">name</span>: <span class="hljs-string">\`<span class="hljs-subst">\${bundle}</span> size limit\`</span>,
        passed,
        <span class="hljs-attr">current</span>: size,
        threshold,
        <span class="hljs-attr">message</span>: passed
          ? <span class="hljs-string">\`✅ <span class="hljs-subst">\${bundle}</span>: <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.formatSize(size)}</span>\`</span>
          : <span class="hljs-string">\`❌ <span class="hljs-subst">\${bundle}</span>: <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.formatSize(size)}</span> &gt; <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.formatSize(threshold)}</span>\`</span>,
      });

      <span class="hljs-keyword">if</span> (!passed) results.<span class="hljs-property">passed</span> = <span class="hljs-literal">false</span>;
    }

    <span class="hljs-comment">// Test against regression thresholds</span>
    <span class="hljs-keyword">if</span> (previousSizes) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [bundle, currentSize] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(currentSizes)) {
        <span class="hljs-keyword">const</span> previousSize = previousSizes[bundle];
        <span class="hljs-keyword">if</span> (!previousSize) <span class="hljs-keyword">continue</span>;

        <span class="hljs-keyword">const</span> increase = currentSize - previousSize;
        <span class="hljs-keyword">const</span> percentIncrease = (increase / previousSize) * <span class="hljs-number">100</span>;
        <span class="hljs-keyword">const</span> regressionThreshold = <span class="hljs-number">0.05</span>; <span class="hljs-comment">// 5% increase allowed</span>

        <span class="hljs-keyword">const</span> passed = percentIncrease &lt;= regressionThreshold * <span class="hljs-number">100</span>;

        results.<span class="hljs-property">tests</span>.<span class="hljs-title function_">push</span>({
          <span class="hljs-attr">name</span>: <span class="hljs-string">\`<span class="hljs-subst">\${bundle}</span> regression check\`</span>,
          passed,
          <span class="hljs-attr">current</span>: currentSize,
          <span class="hljs-attr">previous</span>: previousSize,
          increase,
          percentIncrease,
          <span class="hljs-attr">message</span>: passed
            ? <span class="hljs-string">\`✅ <span class="hljs-subst">\${bundle}</span>: <span class="hljs-subst">\${percentIncrease.toFixed(<span class="hljs-number">1</span>)}</span>% change\`</span>
            : <span class="hljs-string">\`❌ <span class="hljs-subst">\${bundle}</span>: +<span class="hljs-subst">\${percentIncrease.toFixed(<span class="hljs-number">1</span>)}</span>% (<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.formatSize(increase)}</span>)\`</span>,
        });

        <span class="hljs-keyword">if</span> (!passed) results.<span class="hljs-property">passed</span> = <span class="hljs-literal">false</span>;
      }
    }

    <span class="hljs-comment">// Save current sizes for next comparison</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">saveBundleSizes</span>(currentSizes);

    <span class="hljs-keyword">return</span> results;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">getCurrentBundleSizes</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> sizes = {};

    <span class="hljs-keyword">const</span> files = fs.<span class="hljs-title function_">readdirSync</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">distPath</span>);

    files.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (file.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.js&#x27;</span>) &amp;&amp; !file.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.map&#x27;</span>)) {
        <span class="hljs-keyword">const</span> filePath = path.<span class="hljs-title function_">join</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">distPath</span>, file);
        <span class="hljs-keyword">const</span> stats = fs.<span class="hljs-title function_">statSync</span>(filePath);

        <span class="hljs-comment">// Extract bundle name (remove hash)</span>
        <span class="hljs-keyword">const</span> bundleName = file.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/\\.[a-f0-9]{8,}\\.js$/</span>, <span class="hljs-string">&#x27;.js&#x27;</span>);
        sizes[bundleName] = stats.<span class="hljs-property">size</span>;
      }
    });

    <span class="hljs-keyword">return</span> sizes;
  }

  <span class="hljs-title function_">getPreviousBundleSizes</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(fs.<span class="hljs-title function_">readFileSync</span>(<span class="hljs-string">&#x27;.bundle-sizes.json&#x27;</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>));
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
  }

  <span class="hljs-title function_">saveBundleSizes</span>(<span class="hljs-params">sizes</span>) {
    fs.<span class="hljs-title function_">writeFileSync</span>(<span class="hljs-string">&#x27;.bundle-sizes.json&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(sizes, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
  }

  <span class="hljs-title function_">formatSize</span>(<span class="hljs-params">bytes</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${(bytes / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>KB\`</span>;
  }
}

<span class="hljs-comment">// CI integration</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">runBundleTests</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> tester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleRegressionTest</span>(<span class="hljs-string">&#x27;dist&#x27;</span>, {
    <span class="hljs-string">&#x27;main.js&#x27;</span>: <span class="hljs-number">300</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment">// 300KB max</span>
    <span class="hljs-string">&#x27;vendor.js&#x27;</span>: <span class="hljs-number">200</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment">// 200KB max</span>
    <span class="hljs-string">&#x27;components.js&#x27;</span>: <span class="hljs-number">150</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment">// 150KB max</span>
  });

  <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> tester.<span class="hljs-title function_">runTests</span>();

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Bundle Size Test Results:\\n&#x27;</span>);
  results.<span class="hljs-property">tests</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">test</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(test.<span class="hljs-property">message</span>));

  <span class="hljs-keyword">if</span> (!results.<span class="hljs-property">passed</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n❌ Bundle size tests failed!&#x27;</span>);
    process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">1</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\\n✅ All bundle size tests passed!&#x27;</span>);
  }
}
</code></pre>
<h2 id="المراقبة-المستمرة">المراقبة المستمرة</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Bundle monitoring dashboard data</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BundleMetrics</span> {
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">branch</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">commit</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">bundles</span>: <span class="hljs-title class_">Record</span>&lt;
    <span class="hljs-built_in">string</span>,
    {
      <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">gzipSize</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">modules</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">chunks</span>: <span class="hljs-built_in">number</span>;
    }
  &gt;;
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">buildTime</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">firstLoad</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">treeShakingEfficiency</span>: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">BundleMetricsCollector</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">collectMetrics</span>(<span class="hljs-attr">buildPath</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">BundleMetrics</span>&gt; {
    <span class="hljs-keyword">const</span> stats = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getWebpackStats</span>(buildPath);
    <span class="hljs-keyword">const</span> bundles = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyzeBundles</span>(stats);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      <span class="hljs-attr">branch</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GITHUB_REF_NAME</span> || <span class="hljs-string">&#x27;local&#x27;</span>,
      <span class="hljs-attr">commit</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">GITHUB_SHA</span> || <span class="hljs-string">&#x27;local&#x27;</span>,
      bundles,
      <span class="hljs-attr">performance</span>: {
        <span class="hljs-attr">buildTime</span>: stats.<span class="hljs-property">time</span>,
        <span class="hljs-attr">firstLoad</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateFirstLoad</span>(bundles),
        <span class="hljs-attr">treeShakingEfficiency</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateTreeShakingEfficiency</span>(stats),
      },
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">sendMetrics</span>(<span class="hljs-params"><span class="hljs-attr">metrics</span>: <span class="hljs-title class_">BundleMetrics</span></span>) {
    <span class="hljs-comment">// Send to monitoring service</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://your-monitoring-service.com/api/metrics&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(metrics),
    });
  }

  <span class="hljs-title function_">calculateFirstLoad</span>(<span class="hljs-params"><span class="hljs-attr">bundles</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Calculate size of bundles loaded on first page view</span>
    <span class="hljs-keyword">const</span> criticalBundles = [<span class="hljs-string">&#x27;main.js&#x27;</span>, <span class="hljs-string">&#x27;vendor.js&#x27;</span>, <span class="hljs-string">&#x27;runtime.js&#x27;</span>];
    <span class="hljs-keyword">return</span> criticalBundles.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">total, name</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> bundle = bundles[name];
      <span class="hljs-keyword">return</span> total + (bundle ? bundle.<span class="hljs-property">gzipSize</span> : <span class="hljs-number">0</span>);
    }, <span class="hljs-number">0</span>);
  }

  <span class="hljs-title function_">calculateTreeShakingEfficiency</span>(<span class="hljs-params"><span class="hljs-attr">stats</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Measure how much code was eliminated</span>
    <span class="hljs-keyword">const</span> totalImported = stats.<span class="hljs-property">modules</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">module</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> total + (<span class="hljs-variable language_">module</span>.<span class="hljs-property">size</span> || <span class="hljs-number">0</span>);
    }, <span class="hljs-number">0</span>);

    <span class="hljs-keyword">const</span> totalBundled = stats.<span class="hljs-property">assets</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">asset</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> total + (asset.<span class="hljs-property">size</span> || <span class="hljs-number">0</span>);
    }, <span class="hljs-number">0</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> - totalBundled / totalImported;
  }
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
