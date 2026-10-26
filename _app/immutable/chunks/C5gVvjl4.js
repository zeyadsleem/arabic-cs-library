const s="kinney",a="react-performance",n="أداء React",l="memory-leak-detection",p="كشف تسرّبات الذاكرة في تطبيقات React",e=[{depth:2,id:"فهم-تسربات-الذاكرة-في-react",text:"فهم تسرّبات الذاكرة في React"},{depth:2,id:"تنميط-الذاكرة-في-chrome-devtools",text:"تنميط الذاكرة في Chrome DevTools"},{depth:3,id:"أخذ-لقطات-للذاكرة",text:"أخذ لقطات للذاكرة"},{depth:3,id:"الكشف-الآلي-عن-تسربات-الذاكرة",text:"الكشف الآلي عن تسرّبات الذاكرة"},{depth:2,id:"أنماط-تسربات-الذاكرة-الشائعة-وكشفها",text:"أنماط تسرّبات الذاكرة الشائعة وكشفها"},{depth:3,id:"كشف-تسربات-مستمعات-الأحداث",text:"كشف تسرّبات مستمعات الأحداث"},{depth:3,id:"كشف-تسربات-المؤقتات",text:"كشف تسرّبات المؤقّتات"},{depth:3,id:"كشف-تسربات-الإغلاقات",text:"كشف تسرّبات الإغلاقات"},{depth:3,id:"كشف-تسربات-الاشتراكات",text:"كشف تسرّبات الاشتراكات"},{depth:2,id:"أدوات-متقدمة-لكشف-تسربات-الذاكرة",text:"أدوات متقدّمة لكشف تسرّبات الذاكرة"},{depth:3,id:"مكون-تنميط-ذاكرة-مخصص",text:"مكوّن تنميط ذاكرة مخصّص"},{depth:2,id:"اختبار-تسربات-الذاكرة",text:"اختبار تسرّبات الذاكرة"},{depth:2,id:"استراتيجيات-الوقاية",text:"استراتيجيات الوقاية"},{depth:3,id:"قواعد-eslint-لسلامة-الذاكرة",text:"قواعد ESLint لسلامة الذاكرة"},{depth:3,id:"أنماط-مكونات-آمنة-للذاكرة",text:"أنماط مكوّنات آمنة للذاكرة"}],t=`<p>تسرّبات الذاكرة في تطبيقات React قتلة صامتة. يبدأ تطبيقك بسلاسة، لكنه بعد ساعة من الاستخدام يستهلك 500 ميغابايت من الذاكرة العشوائية ويصبح بطيئًا ثقيلًا. يتنقّل المستخدمون بين الصفحات، وتُركَّب المكوّنات وتُفكَّك، لكن شيئًا ما يتشبّث بذاكرة كان ينبغي تحريرها. يعمل جامع المهملات (garbage collector)، لكن استهلاك الذاكرة يواصل الارتفاع. وفي النهاية ينهار التبويب أو يقتل متصفّح الجوال تطبيقك.</p>
<p>وتلك الطبيعة الخبيثة لتسرّبات الذاكرة تجعلها خطيرة بشكل خاص — فهي غير مرئية أثناء التطوير لكنها كارثية في الإنتاج. فمستمع حدث واحد لا يُزال أبدًا، أو إغلاق (closure) يحتفظ بكائن كبير، أو مؤقّت لا يُلغى قط، قد يحوّل تطبيق React خفيفًا إلى وحش نهم للذاكرة. والمفتاح هو الكشف المنهجي، وفهم الأنماط الشائعة، وبناء ممارسات برمجة دفاعية.</p>
<h2 id="فهم-تسربات-الذاكرة-في-react">فهم تسرّبات الذاكرة في React</h2>
<p>تحدث تسرّبات الذاكرة عندما تحتفظ شيفرة JavaScript لديك بمراجع إلى كائنات كان ينبغي أن يجمعها جامع المهملات. ولمعرفة تفصيلية بكيفية عمل إدارة ذاكرة JavaScript وجمع المهملات، راجع <a href="https://stevekinney.com/courses/react-performance/memory-management-deep-dive">إدارة الذاكرة بعمق</a>.</p>
<p>وفي تطبيقات React، تتبع تسرّبات الذاكرة عادةً هذه الأنماط:</p>
<ul>
<li><strong>مستمعات الأحداث</strong> التي لا تُزال عند فكّ تركيب المكوّن</li>
<li><strong>المؤقّتات والفترات</strong> التي تستمر في العمل بعد تنظيف المكوّن</li>
<li><strong>الإغلاقات (closures)</strong> التي تحتفظ بكائنات كبيرة بلا داعٍ</li>
<li><strong>المراجع العامة</strong> إلى دوال استدعاء المكوّن أو حالته</li>
<li><strong>الاشتراكات</strong> في خدمات خارجية بلا تنظيف سليم</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Quick examples of leak-prone patterns</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProblematicComponent</span>(<span class="hljs-params">{ data }: { data: LargeData[] }</span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// ❌ Event listener leak</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleScroll);
    <span class="hljs-comment">// Missing cleanup</span>

    <span class="hljs-comment">// ❌ Timer leak</span>
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(updateData, <span class="hljs-number">1000</span>);
    <span class="hljs-comment">// Missing clearInterval</span>

    <span class="hljs-comment">// ❌ Subscription leak</span>
    <span class="hljs-keyword">const</span> subscription = dataService.<span class="hljs-title function_">subscribe</span>(handleUpdate);
    <span class="hljs-comment">// Missing unsubscribe</span>
  }, []);

  <span class="hljs-comment">// ❌ Closure leak - captures entire data array</span>
  <span class="hljs-keyword">const</span> processItem = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span> === id);
    },
    [data],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Component content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>ومفتاح الوقاية هو التنظيف المنهجي وفهم أي الأنماط تُنشئ مراجع دائمة.</p>
<h2 id="تنميط-الذاكرة-في-chrome-devtools">تنميط الذاكرة في Chrome DevTools</h2>
<p>يوفّر Chrome DevTools أدوات قوية لكشف تسرّبات الذاكرة:</p>
<h3 id="أخذ-لقطات-للذاكرة">أخذ لقطات للذاكرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Memory profiling utility for development</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MemoryProfiler</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">snapshots</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">heapSize</span>: <span class="hljs-built_in">number</span>;
  }&gt; = [];

  <span class="hljs-title function_">takeSnapshot</span>(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;development&#x27;</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Force garbage collection if available</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gc</span>) {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gc</span>();
    }

    <span class="hljs-keyword">const</span> heapSize = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">snapshots</span>.<span class="hljs-title function_">push</span>({
      name,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      heapSize,
    });

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`📸 Memory snapshot &quot;<span class="hljs-subst">\${name}</span>&quot;: <span class="hljs-subst">\${(heapSize / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
  }

  <span class="hljs-title function_">compareSnapshots</span>(<span class="hljs-attr">before</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">after</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> beforeSnapshot = <span class="hljs-variable language_">this</span>.<span class="hljs-property">snapshots</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">s</span>) =&gt;</span> s.<span class="hljs-property">name</span> === before);
    <span class="hljs-keyword">const</span> afterSnapshot = <span class="hljs-variable language_">this</span>.<span class="hljs-property">snapshots</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">s</span>) =&gt;</span> s.<span class="hljs-property">name</span> === after);

    <span class="hljs-keyword">if</span> (!beforeSnapshot || !afterSnapshot) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Snapshots not found&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> diff = afterSnapshot.<span class="hljs-property">heapSize</span> - beforeSnapshot.<span class="hljs-property">heapSize</span>;
    <span class="hljs-keyword">const</span> diffMB = diff / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>;

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`🔍 Memory comparison &quot;<span class="hljs-subst">\${before}</span>&quot; → &quot;<span class="hljs-subst">\${after}</span>&quot;: <span class="hljs-subst">\${diffMB.toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);

    <span class="hljs-keyword">if</span> (diffMB &gt; <span class="hljs-number">5</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`⚠️ Potential memory leak detected: <span class="hljs-subst">\${diffMB.toFixed(<span class="hljs-number">2</span>)}</span>MB increase\`</span>);
    }
  }

  <span class="hljs-title function_">generateReport</span>(): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">snapshots</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;No snapshots available&#x27;</span>;

    <span class="hljs-keyword">let</span> report = <span class="hljs-string">&#x27;# Memory Usage Report\\n\\n&#x27;</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">snapshots</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">snapshot, index</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> sizeMB = (snapshot.<span class="hljs-property">heapSize</span> / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>);
      report += <span class="hljs-string">\`<span class="hljs-subst">\${index + <span class="hljs-number">1</span>}</span>. **<span class="hljs-subst">\${snapshot.name}</span>**: <span class="hljs-subst">\${sizeMB}</span>MB\\n\`</span>;

      <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">const</span> prev = <span class="hljs-variable language_">this</span>.<span class="hljs-property">snapshots</span>[index - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">const</span> diff = ((snapshot.<span class="hljs-property">heapSize</span> - prev.<span class="hljs-property">heapSize</span>) / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>);
        report += <span class="hljs-string">\`   *Change from previous: <span class="hljs-subst">\${diff}</span>MB*\\n\`</span>;
      }
    });

    <span class="hljs-keyword">return</span> report;
  }
}

<span class="hljs-comment">// Global profiler instance for development</span>
<span class="hljs-keyword">const</span> memoryProfiler = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MemoryProfiler</span>();

<span class="hljs-comment">// React hook for memory profiling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useMemoryProfiler</span>(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    memoryProfiler.<span class="hljs-title function_">takeSnapshot</span>(<span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span> mounted\`</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      memoryProfiler.<span class="hljs-title function_">takeSnapshot</span>(<span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span> unmounted\`</span>);
    };
  }, [componentName]);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">takeSnapshot</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      memoryProfiler.<span class="hljs-title function_">takeSnapshot</span>(<span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span> <span class="hljs-subst">\${name}</span>\`</span>);
    },
    <span class="hljs-attr">compareSnapshots</span>: memoryProfiler.<span class="hljs-property">compareSnapshots</span>.<span class="hljs-title function_">bind</span>(memoryProfiler),
  };
}

<span class="hljs-comment">// Usage in components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfiledComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { takeSnapshot } = <span class="hljs-title function_">useMemoryProfiler</span>(<span class="hljs-string">&#x27;ProfiledComponent&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleLoadData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">takeSnapshot</span>(<span class="hljs-string">&#x27;before data load&#x27;</span>);

    <span class="hljs-comment">// Load large dataset</span>
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchLargeDataset</span>();

    <span class="hljs-title function_">takeSnapshot</span>(<span class="hljs-string">&#x27;after data load&#x27;</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleLoadData}</span>&gt;</span>Load Data<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الكشف-الآلي-عن-تسربات-الذاكرة">الكشف الآلي عن تسرّبات الذاكرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Automated memory leak detector</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MemoryLeakDetector</span> {
  <span class="hljs-keyword">private</span> isMonitoring = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">baseline</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">samples</span>: <span class="hljs-built_in">number</span>[] = [];
  <span class="hljs-keyword">private</span> alertThreshold = <span class="hljs-number">50</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>; <span class="hljs-comment">// 50MB</span>
  <span class="hljs-keyword">private</span> <span class="hljs-attr">callbacks</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">leak</span>: <span class="hljs-title class_">MemoryLeakInfo</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>&gt; = [];

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">MemoryLeakInfo</span> {
    <span class="hljs-attr">currentUsage</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">baseline</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">leakSize</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">samples</span>: <span class="hljs-built_in">number</span>[];
    <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  }

  <span class="hljs-title function_">startMonitoring</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span> || process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;development&#x27;</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getCurrentMemoryUsage</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span> = [<span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>];

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;🔍 Starting memory leak detection...&#x27;</span>);

    <span class="hljs-comment">// Monitor memory every 5 seconds</span>
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkForLeaks</span>();
    }, <span class="hljs-number">5000</span>);

    <span class="hljs-comment">// Stop monitoring after 30 minutes</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearInterval</span>(interval);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">stopMonitoring</span>();
    }, <span class="hljs-number">30</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>);
  }

  <span class="hljs-title function_">stopMonitoring</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span> = <span class="hljs-literal">false</span>;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;🛑 Stopped memory leak detection&#x27;</span>);

    <span class="hljs-comment">// Generate final report</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateLeakReport</span>();
  }

  <span class="hljs-title function_">onLeakDetected</span>(<span class="hljs-attr">callback</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">leak</span>: <span class="hljs-title class_">MemoryLeakInfo</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">callbacks</span>.<span class="hljs-title function_">push</span>(callback);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">checkForLeaks</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> currentUsage = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getCurrentMemoryUsage</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-title function_">push</span>(currentUsage);

    <span class="hljs-comment">// Keep only last 20 samples</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">20</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">20</span>);
    }

    <span class="hljs-keyword">const</span> leakSize = currentUsage - <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>;

    <span class="hljs-comment">// Check for memory leak</span>
    <span class="hljs-keyword">if</span> (leakSize &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">alertThreshold</span>) {
      <span class="hljs-keyword">const</span> <span class="hljs-attr">leakInfo</span>: <span class="hljs-title class_">MemoryLeakInfo</span> = {
        currentUsage,
        <span class="hljs-attr">baseline</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>,
        leakSize,
        <span class="hljs-attr">samples</span>: [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>],
        <span class="hljs-attr">duration</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-property">length</span> * <span class="hljs-number">5000</span>, <span class="hljs-comment">// 5 seconds per sample</span>
      };

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`🚨 Memory leak detected: <span class="hljs-subst">\${(leakSize / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);

      <span class="hljs-comment">// Notify callbacks</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">callbacks</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> <span class="hljs-title function_">callback</span>(leakInfo));
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">getCurrentMemoryUsage</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">if</span> (!(performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateLeakReport</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-property">length</span> &lt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> finalUsage = <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>[<span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];
    <span class="hljs-keyword">const</span> totalLeak = finalUsage - <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>;
    <span class="hljs-keyword">const</span> avgGrowth = totalLeak / <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-property">length</span>;

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">&#x27;📊 Memory Leak Detection Report&#x27;</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Initial memory: <span class="hljs-subst">\${(<span class="hljs-variable language_">this</span>.baseline / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Final memory: <span class="hljs-subst">\${(finalUsage / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Total growth: <span class="hljs-subst">\${(totalLeak / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Average growth per check: <span class="hljs-subst">\${(avgGrowth / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>KB\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Samples taken: <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.samples.length}</span>\`</span>);

    <span class="hljs-comment">// Detect trend</span>
    <span class="hljs-keyword">const</span> recentSamples = <span class="hljs-variable language_">this</span>.<span class="hljs-property">samples</span>.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">10</span>);
    <span class="hljs-keyword">const</span> isIncreasing = recentSamples.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">sample, i</span>) =&gt;</span>
      i === <span class="hljs-number">0</span> || sample &gt;= recentSamples[i - <span class="hljs-number">1</span>]
    );

    <span class="hljs-keyword">if</span> (isIncreasing &amp;&amp; totalLeak &gt; <span class="hljs-number">10</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>) { <span class="hljs-comment">// &gt; 10MB</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;⚠️ Consistent memory growth detected - likely memory leak&#x27;</span>);
    }

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();
  }
}

<span class="hljs-comment">// Global detector instance</span>
<span class="hljs-keyword">const</span> leakDetector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MemoryLeakDetector</span>();

<span class="hljs-comment">// React hook for component-level leak detection</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useMemoryLeakDetection</span>(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;development&#x27;</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">let</span> mounted = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">let</span> initialMemory = <span class="hljs-number">0</span>;

    <span class="hljs-comment">// Measure initial memory</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (mounted) {
        initialMemory = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
      }
    }, <span class="hljs-number">100</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      mounted = <span class="hljs-literal">false</span>;

      <span class="hljs-comment">// Check memory after component unmounts</span>
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">if</span> ((performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>) {
          <span class="hljs-keyword">const</span> finalMemory = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
          <span class="hljs-keyword">const</span> diff = finalMemory - initialMemory;

          <span class="hljs-keyword">if</span> (diff &gt; <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>) { <span class="hljs-comment">// &gt; 1MB retained</span>
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(
              <span class="hljs-string">\`🔍 <span class="hljs-subst">\${componentName}</span> may have memory leak: <span class="hljs-subst">\${(diff / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB retained after unmount\`</span>
            );
          }
        }
      }, <span class="hljs-number">1000</span>);
    };
  }, [componentName]);
}
</code></pre>
<h2 id="أنماط-تسربات-الذاكرة-الشائعة-وكشفها">أنماط تسرّبات الذاكرة الشائعة وكشفها</h2>
<p>للاطلاع على أنماط مفصّلة وتقنيات تحسين متقدّمة، راجع <a href="https://stevekinney.com/courses/react-performance/memory-management-deep-dive">إدارة الذاكرة بعمق</a>. وهذه هي الأنماط الرئيسية التي ينبغي مراقبتها:</p>
<h3 id="كشف-تسربات-مستمعات-الأحداث">كشف تسرّبات مستمعات الأحداث</h3>
<p><strong>الأعراض</strong>: نمو الذاكرة أثناء تفاعلات المستخدم، وخصوصًا التمرير أو النقر <strong>الكشف</strong>: افحص التنظيف المفقود في <code>useEffect</code></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Missing cleanup - red flag during review</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleScroll);
  <span class="hljs-comment">// No return statement = potential leak</span>
}, []);

<span class="hljs-comment">// ✅ Proper cleanup pattern</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleScroll);
  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleScroll);
}, []);
</code></pre>
<h3 id="كشف-تسربات-المؤقتات">كشف تسرّبات المؤقّتات</h3>
<p><strong>الأعراض</strong>: مكوّنات تُحدَّث بعد فكّ التركيب، وأخطاء في وحدة التحكّم <strong>الكشف</strong>: افحص كل نداءات <code>setInterval</code> و<code>setTimeout</code></p>
<pre><code class="language-typescript"><span class="hljs-comment">// Detection technique: Add component name to timers</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Timer in ComponentName still running&#x27;</span>); <span class="hljs-comment">// This shouldn&#x27;t appear after unmount</span>
    <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-number">1</span>);
  }, <span class="hljs-number">1000</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
}, []);
</code></pre>
<h3 id="كشف-تسربات-الإغلاقات">كشف تسرّبات الإغلاقات</h3>
<p><strong>الأعراض</strong>: نمو الذاكرة بما يتناسب مع حجم البيانات، وأداء بطيء <strong>الكشف</strong>: افحص مصفوفات الاعتماد في <code>useCallback</code> و<code>useMemo</code></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Red flag - large object in dependency array</span>
<span class="hljs-keyword">const</span> processData = <span class="hljs-title function_">useCallback</span>(
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> largeDataset.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span> === id);
  },
  [largeDataset],
); <span class="hljs-comment">// Captures entire dataset</span>

<span class="hljs-comment">// ✅ Extract only what&#x27;s needed</span>
<span class="hljs-keyword">const</span> itemMap = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(largeDataset.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> [item.<span class="hljs-property">id</span>, item])), [largeDataset]);
<span class="hljs-keyword">const</span> processData = <span class="hljs-title function_">useCallback</span>(
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> itemMap.<span class="hljs-title function_">get</span>(id);
  },
  [itemMap],
);
</code></pre>
<h3 id="كشف-تسربات-الاشتراكات">كشف تسرّبات الاشتراكات</h3>
<p><strong>الأعراض</strong>: تشغيل عدة معالجات أحداث، وتحديثات حالة غير متوقّعة <strong>الكشف</strong>: استخدم أدوات تطوير المتصفّح لفحص مستمعات الأحداث العامة</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Detection helper for development</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> cleanup = <span class="hljs-title function_">subscribeToService</span>(handleData);

  <span class="hljs-comment">// Add detection in development</span>
  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
    <span class="hljs-variable language_">window</span>.<span class="hljs-property">__subscriptions</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">__subscriptions</span> || <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>();
    <span class="hljs-variable language_">window</span>.<span class="hljs-property">__subscriptions</span>.<span class="hljs-title function_">add</span>(cleanup);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">cleanup</span>();
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">__subscriptions</span>.<span class="hljs-title function_">delete</span>(cleanup);
    };
  }

  <span class="hljs-keyword">return</span> cleanup;
}, []);
</code></pre>
<h2 id="أدوات-متقدمة-لكشف-تسربات-الذاكرة">أدوات متقدّمة لكشف تسرّبات الذاكرة</h2>
<h3 id="مكون-تنميط-ذاكرة-مخصص">مكوّن تنميط ذاكرة مخصّص</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Production-safe memory monitoring</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ProductionMemoryMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">isEnabled</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">heapUsed</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">component</span>?: <span class="hljs-built_in">string</span>;
  }&gt; = [];

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Only enable in development or with explicit flag</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isEnabled</span> =
      process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span> ||
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">search</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;memoryProfile=true&#x27;</span>);
  }

  <span class="hljs-title function_">recordMetric</span>(<span class="hljs-attr">component</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">isEnabled</span> || !(performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">push</span>({
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">heapUsed</span>: (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>,
      component,
    });

    <span class="hljs-comment">// Keep only last 1000 metrics to prevent memory leak in profiler</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1000</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">1000</span>);
    }
  }

  <span class="hljs-title function_">analyzeLeaks</span>(): {
    <span class="hljs-attr">suspiciousComponents</span>: <span class="hljs-built_in">string</span>[];
    <span class="hljs-attr">overallTrend</span>: <span class="hljs-string">&#x27;increasing&#x27;</span> | <span class="hljs-string">&#x27;stable&#x27;</span> | <span class="hljs-string">&#x27;decreasing&#x27;</span>;
    <span class="hljs-attr">recommendations</span>: <span class="hljs-built_in">string</span>[];
  } {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span> &lt; <span class="hljs-number">10</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">suspiciousComponents</span>: [],
        <span class="hljs-attr">overallTrend</span>: <span class="hljs-string">&#x27;stable&#x27;</span>,
        <span class="hljs-attr">recommendations</span>: [<span class="hljs-string">&#x27;Need more data points to analyze&#x27;</span>],
      };
    }

    <span class="hljs-comment">// Analyze overall memory trend</span>
    <span class="hljs-keyword">const</span> recentMetrics = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">50</span>);
    <span class="hljs-keyword">const</span> oldAverage = recentMetrics.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">25</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">heapUsed</span>, <span class="hljs-number">0</span>) / <span class="hljs-number">25</span>;
    <span class="hljs-keyword">const</span> newAverage = recentMetrics.<span class="hljs-title function_">slice</span>(<span class="hljs-number">25</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">heapUsed</span>, <span class="hljs-number">0</span>) / <span class="hljs-number">25</span>;

    <span class="hljs-keyword">const</span> trend =
      newAverage &gt; oldAverage * <span class="hljs-number">1.1</span>
        ? <span class="hljs-string">&#x27;increasing&#x27;</span>
        : newAverage &lt; oldAverage * <span class="hljs-number">0.9</span>
          ? <span class="hljs-string">&#x27;decreasing&#x27;</span>
          : <span class="hljs-string">&#x27;stable&#x27;</span>;

    <span class="hljs-comment">// Analyze component-specific patterns</span>
    <span class="hljs-keyword">const</span> componentMetrics = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">groupMetricsByComponent</span>();
    <span class="hljs-keyword">const</span> suspiciousComponents = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findSuspiciousComponents</span>(componentMetrics);

    <span class="hljs-keyword">const</span> recommendations = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateRecommendations</span>(trend, suspiciousComponents);

    <span class="hljs-keyword">return</span> {
      suspiciousComponents,
      <span class="hljs-attr">overallTrend</span>: trend,
      recommendations,
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">groupMetricsByComponent</span>(): <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">heapUsed</span>: <span class="hljs-built_in">number</span> }&gt;&gt; {
    <span class="hljs-keyword">const</span> grouped = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!metric.<span class="hljs-property">component</span>) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">if</span> (!grouped.<span class="hljs-title function_">has</span>(metric.<span class="hljs-property">component</span>)) {
        grouped.<span class="hljs-title function_">set</span>(metric.<span class="hljs-property">component</span>, []);
      }

      grouped.<span class="hljs-title function_">get</span>(metric.<span class="hljs-property">component</span>).<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">timestamp</span>: metric.<span class="hljs-property">timestamp</span>,
        <span class="hljs-attr">heapUsed</span>: metric.<span class="hljs-property">heapUsed</span>,
      });
    });

    <span class="hljs-keyword">return</span> grouped;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">findSuspiciousComponents</span>(
    <span class="hljs-attr">componentMetrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">heapUsed</span>: <span class="hljs-built_in">number</span> }&gt;&gt;,
  ): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">suspicious</span>: <span class="hljs-built_in">string</span>[] = [];

    componentMetrics.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">metrics, component</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">length</span> &lt; <span class="hljs-number">5</span>) <span class="hljs-keyword">return</span>;

      <span class="hljs-comment">// Check for consistent memory growth after component usage</span>
      <span class="hljs-keyword">const</span> sorted = metrics.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">timestamp</span> - b.<span class="hljs-property">timestamp</span>);
      <span class="hljs-keyword">const</span> first = sorted[<span class="hljs-number">0</span>].<span class="hljs-property">heapUsed</span>;
      <span class="hljs-keyword">const</span> last = sorted[sorted.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>].<span class="hljs-property">heapUsed</span>;

      <span class="hljs-keyword">const</span> growth = (last - first) / first;

      <span class="hljs-comment">// If memory grew by more than 20% during component&#x27;s lifetime</span>
      <span class="hljs-keyword">if</span> (growth &gt; <span class="hljs-number">0.2</span>) {
        suspicious.<span class="hljs-title function_">push</span>(component);
      }
    });

    <span class="hljs-keyword">return</span> suspicious;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateRecommendations</span>(<span class="hljs-attr">trend</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">suspiciousComponents</span>: <span class="hljs-built_in">string</span>[]): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">recommendations</span>: <span class="hljs-built_in">string</span>[] = [];

    <span class="hljs-keyword">if</span> (trend === <span class="hljs-string">&#x27;increasing&#x27;</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Overall memory usage is increasing - investigate for memory leaks&#x27;</span>);
    }

    <span class="hljs-keyword">if</span> (suspiciousComponents.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      recommendations.<span class="hljs-title function_">push</span>(
        <span class="hljs-string">\`Check these components for memory leaks: <span class="hljs-subst">\${suspiciousComponents.join(<span class="hljs-string">&#x27;, &#x27;</span>)}</span>\`</span>,
      );
    }

    recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Review event listeners, timers, and subscriptions for proper cleanup&#x27;</span>);
    recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Use Chrome DevTools Memory tab for detailed heap analysis&#x27;</span>);

    <span class="hljs-keyword">return</span> recommendations;
  }

  <span class="hljs-title function_">exportData</span>(): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(
      {
        <span class="hljs-attr">metrics</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>,
        <span class="hljs-attr">analysis</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyzeLeaks</span>(),
        <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      },
      <span class="hljs-literal">null</span>,
      <span class="hljs-number">2</span>,
    );
  }
}

<span class="hljs-comment">// React hook for memory monitoring</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useMemoryMonitoring</span>(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span>, enabled = <span class="hljs-literal">false</span></span>) {
  <span class="hljs-keyword">const</span> monitor = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ProductionMemoryMonitor</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (enabled) {
      monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordMetric</span>(<span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span>:mount\`</span>);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (enabled) {
        monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordMetric</span>(<span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span>:unmount\`</span>);
      }
    };
  }, [componentName, enabled]);

  <span class="hljs-keyword">const</span> recordEvent = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">eventName</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (enabled) {
        monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordMetric</span>(<span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span>:<span class="hljs-subst">\${eventName}</span>\`</span>);
      }
    },
    [componentName, enabled],
  );

  <span class="hljs-keyword">return</span> {
    recordEvent,
    <span class="hljs-attr">analyzeLeaks</span>: <span class="hljs-function">() =&gt;</span> monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">analyzeLeaks</span>(),
    <span class="hljs-attr">exportData</span>: <span class="hljs-function">() =&gt;</span> monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">exportData</span>(),
  };
}

<span class="hljs-comment">// Development tool component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MemoryProfilerPanel</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [analysis, setAnalysis] = useState&lt;<span class="hljs-built_in">any</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> monitor = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ProductionMemoryMonitor</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">runAnalysis</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> results = monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">analyzeLeaks</span>();
    <span class="hljs-title function_">setAnalysis</span>(results);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">exportData</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> data = monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">exportData</span>();
    <span class="hljs-keyword">const</span> blob = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Blob</span>([data], { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> });
    <span class="hljs-keyword">const</span> url = <span class="hljs-variable constant_">URL</span>.<span class="hljs-title function_">createObjectURL</span>(blob);

    <span class="hljs-keyword">const</span> a = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;a&#x27;</span>);
    a.<span class="hljs-property">href</span> = url;
    a.<span class="hljs-property">download</span> = <span class="hljs-string">\`memory-profile-<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>.json\`</span>;
    a.<span class="hljs-title function_">click</span>();

    <span class="hljs-variable constant_">URL</span>.<span class="hljs-title function_">revokeObjectURL</span>(url);
  };

  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;development&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">fixed</span>&#x27;,
        <span class="hljs-attr">top:</span> <span class="hljs-attr">10</span>,
        <span class="hljs-attr">right:</span> <span class="hljs-attr">10</span>,
        <span class="hljs-attr">background:</span> &#x27;#<span class="hljs-attr">000</span>&#x27;,
        <span class="hljs-attr">color:</span> &#x27;#<span class="hljs-attr">fff</span>&#x27;,
        <span class="hljs-attr">padding:</span> <span class="hljs-attr">15</span>,
        <span class="hljs-attr">borderRadius:</span> <span class="hljs-attr">5</span>,
        <span class="hljs-attr">fontSize:</span> <span class="hljs-attr">12</span>,
        <span class="hljs-attr">zIndex:</span> <span class="hljs-attr">9999</span>,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Memory Profiler<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{runAnalysis}</span>&gt;</span>Analyze Memory<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{exportData}</span>&gt;</span>Export Data<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {analysis &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Trend: {analysis.overallTrend}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          {analysis.suspiciousComponents.length &gt; 0 &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Suspicious: {analysis.suspiciousComponents.join(&#x27;, &#x27;)}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اختبار-تسربات-الذاكرة">اختبار تسرّبات الذاكرة</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Automated memory leak testing</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MemoryLeakTester</span> {
  <span class="hljs-keyword">async</span> testComponentForLeaks&lt;T&gt;(
    <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;T&gt;,
    <span class="hljs-attr">props</span>: T,
    <span class="hljs-attr">iterations</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">100</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;{
    <span class="hljs-attr">hasLeak</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">initialMemory</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">finalMemory</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">leakSize</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">averageGrowth</span>: <span class="hljs-built_in">number</span>;
  }&gt; {
    <span class="hljs-comment">// Force garbage collection before test</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gc</span>) <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gc</span>();

    <span class="hljs-keyword">const</span> initialMemory = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-attr">memorySnapshots</span>: <span class="hljs-built_in">number</span>[] = [];

    <span class="hljs-comment">// Mount and unmount component multiple times</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
      <span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>);
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(container);

      <span class="hljs-keyword">const</span> root = <span class="hljs-title class_">ReactDOM</span>.<span class="hljs-title function_">createRoot</span>(container);
      root.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>);

      <span class="hljs-comment">// Let component render</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">10</span>));

      root.<span class="hljs-title function_">unmount</span>();
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">removeChild</span>(container);

      <span class="hljs-comment">// Force garbage collection every 10 iterations</span>
      <span class="hljs-keyword">if</span> (i % <span class="hljs-number">10</span> === <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-variable language_">window</span>.<span class="hljs-property">gc</span>) {
        <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gc</span>();

        <span class="hljs-comment">// Take memory snapshot</span>
        <span class="hljs-keyword">const</span> currentMemory = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
        memorySnapshots.<span class="hljs-title function_">push</span>(currentMemory);
      }
    }

    <span class="hljs-comment">// Final garbage collection and measurement</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gc</span>) <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gc</span>();
    <span class="hljs-keyword">const</span> finalMemory = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;

    <span class="hljs-keyword">const</span> leakSize = finalMemory - initialMemory;
    <span class="hljs-keyword">const</span> averageGrowth =
      memorySnapshots.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1</span>
        ? (memorySnapshots[memorySnapshots.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>] - memorySnapshots[<span class="hljs-number">0</span>]) /
          memorySnapshots.<span class="hljs-property">length</span>
        : <span class="hljs-number">0</span>;

    <span class="hljs-comment">// Consider it a leak if memory grew by more than 1MB</span>
    <span class="hljs-keyword">const</span> hasLeak = leakSize &gt; <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>;

    <span class="hljs-keyword">return</span> {
      hasLeak,
      initialMemory,
      finalMemory,
      leakSize,
      averageGrowth,
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">runLeakTestSuite</span>(
    <span class="hljs-attr">components</span>: <span class="hljs-title class_">Array</span>&lt;{
      <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;;
      <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>;
    }&gt;,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;🔍 Running memory leak test suite...&#x27;</span>);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> { name, <span class="hljs-title class_">Component</span>, props } <span class="hljs-keyword">of</span> components) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">testComponentForLeaks</span>(<span class="hljs-title class_">Component</span>, props, <span class="hljs-number">50</span>);

        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">\`📊 <span class="hljs-subst">\${name}</span> Memory Test Results\`</span>);
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Initial memory: <span class="hljs-subst">\${(results.initialMemory / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Final memory: <span class="hljs-subst">\${(results.finalMemory / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Memory growth: <span class="hljs-subst">\${(results.leakSize / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Average growth: <span class="hljs-subst">\${(results.averageGrowth / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>KB per iteration\`</span>);

        <span class="hljs-keyword">if</span> (results.<span class="hljs-property">hasLeak</span>) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`❌ MEMORY LEAK DETECTED in <span class="hljs-subst">\${name}</span>\`</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`✅ No memory leak detected in <span class="hljs-subst">\${name}</span>\`</span>);
        }

        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Failed to test <span class="hljs-subst">\${name}</span>:\`</span>, error);
      }
    }
  }
}

<span class="hljs-comment">// Jest integration</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Memory Leak Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> tester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MemoryLeakTester</span>();

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not leak memory in UserProfile component&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> tester.<span class="hljs-title function_">testComponentForLeaks</span>(<span class="hljs-title class_">UserProfile</span>, { <span class="hljs-attr">user</span>: mockUser }, <span class="hljs-number">100</span>);

    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">hasLeak</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">leakSize</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>); <span class="hljs-comment">// &lt; 1MB growth</span>
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should detect memory leaks in problematic components&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> tester.<span class="hljs-title function_">testComponentForLeaks</span>(<span class="hljs-title class_">LeakyComponent</span>, { <span class="hljs-attr">data</span>: mockData }, <span class="hljs-number">50</span>);

    <span class="hljs-comment">// This test expects a leak to verify our detection works</span>
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">hasLeak</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });
});
</code></pre>
<h2 id="استراتيجيات-الوقاية">استراتيجيات الوقاية</h2>
<h3 id="قواعد-eslint-لسلامة-الذاكرة">قواعد ESLint لسلامة الذاكرة</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// .eslintrc.js - Custom rules for memory leak prevention</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">rules</span>: {
    <span class="hljs-comment">// Warn about missing effect cleanup</span>
    <span class="hljs-string">&#x27;react-hooks/exhaustive-deps&#x27;</span>: <span class="hljs-string">&#x27;warn&#x27;</span>,

    <span class="hljs-comment">// Custom rule to detect potential timer leaks</span>
    <span class="hljs-string">&#x27;custom/timer-cleanup&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,

    <span class="hljs-comment">// Custom rule to detect event listener patterns</span>
    <span class="hljs-string">&#x27;custom/event-listener-cleanup&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
  },

  <span class="hljs-attr">overrides</span>: [
    {
      <span class="hljs-attr">files</span>: [<span class="hljs-string">&#x27;*.ts&#x27;</span>, <span class="hljs-string">&#x27;*.tsx&#x27;</span>],
      <span class="hljs-attr">rules</span>: {
        <span class="hljs-comment">// TypeScript-specific memory safety rules</span>
        <span class="hljs-string">&#x27;@typescript-eslint/no-unused-vars&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      },
    },
  ],
};

<span class="hljs-comment">// Custom ESLint rule for timer cleanup</span>
<span class="hljs-keyword">const</span> timerCleanupRule = {
  <span class="hljs-title function_">create</span>(<span class="hljs-params">context</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-title class_">CallExpression</span>(node) {
        <span class="hljs-comment">// Check for setInterval/setTimeout without cleanup</span>
        <span class="hljs-keyword">if</span> (node.<span class="hljs-property">callee</span>.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;setInterval&#x27;</span> || node.<span class="hljs-property">callee</span>.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;setTimeout&#x27;</span>) {
          <span class="hljs-comment">// Look for cleanup in return statement</span>
          <span class="hljs-keyword">const</span> useEffectNode = <span class="hljs-title function_">findParentUseEffect</span>(node);
          <span class="hljs-keyword">if</span> (useEffectNode &amp;&amp; !<span class="hljs-title function_">hasCleanupReturn</span>(useEffectNode)) {
            context.<span class="hljs-title function_">report</span>({
              node,
              <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Timer should be cleared in useEffect cleanup function&#x27;</span>,
            });
          }
        }
      },
    };
  },
};
</code></pre>
<h3 id="أنماط-مكونات-آمنة-للذاكرة">أنماط مكوّنات آمنة للذاكرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Template for memory-safe React components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MemorySafeComponent</span>(<span class="hljs-params">{ data, onUpdate }: { data: <span class="hljs-built_in">any</span>[]; onUpdate: (data: <span class="hljs-built_in">any</span>) =&gt; <span class="hljs-built_in">void</span> }</span>) {
  <span class="hljs-comment">// 1. Use refs for stable references to avoid closure captures</span>
  <span class="hljs-keyword">const</span> dataRef = <span class="hljs-title function_">useRef</span>(data);
  <span class="hljs-keyword">const</span> onUpdateRef = <span class="hljs-title function_">useRef</span>(onUpdate);

  <span class="hljs-comment">// Update refs when props change</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    dataRef.<span class="hljs-property">current</span> = data;
    onUpdateRef.<span class="hljs-property">current</span> = onUpdate;
  });

  <span class="hljs-comment">// 2. Memoize expensive computations</span>
  <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> ({
      <span class="hljs-attr">id</span>: item.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: item.<span class="hljs-property">name</span>,
      <span class="hljs-comment">// Only include fields you actually need</span>
    }));
  }, [data]);

  <span class="hljs-comment">// 3. Use custom hooks for subscriptions/timers</span>
  <span class="hljs-title function_">useInterval</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Periodic updates using refs to avoid closure capture</span>
    <span class="hljs-keyword">const</span> currentData = dataRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">const</span> currentOnUpdate = onUpdateRef.<span class="hljs-property">current</span>;

    <span class="hljs-comment">// Process and update</span>
    <span class="hljs-title function_">currentOnUpdate</span>(<span class="hljs-title function_">processData</span>(currentData));
  }, <span class="hljs-number">30000</span>);

  <span class="hljs-comment">// 4. Clean up all subscriptions</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> subscription = dataService.<span class="hljs-title function_">subscribe</span>(<span class="hljs-function">(<span class="hljs-params">newData</span>) =&gt;</span> {
      onUpdateRef.<span class="hljs-title function_">current</span>(newData);
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      subscription.<span class="hljs-title function_">unsubscribe</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {processedData.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ItemComponent</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
