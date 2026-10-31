const s="kinney",a="react-performance",n="أداء React",l="inp-optimization-long-tasks",p="تحسين INP والمهام الطويلة",t=[{depth:2,id:"فهم-inp-والمهام-الطويلة",text:"فهم INP والمهام الطويلة"},{depth:2,id:"تفكيك-المهام-الطويلة",text:"تفكيك المهام الطويلة"},{depth:3,id:"المشكلة-معالجات-أحداث-مكتلة",text:"المشكلة: معالجات أحداث مكتلة"},{depth:3,id:"الحل-الأول-إعادة-التحكم-إلى-الخيط-الرئيسي",text:"الحل الأول: إعادة التحكم إلى الخيط الرئيسي"},{depth:3,id:"الحل-الثاني-استخدام-requestidlecallback",text:"الحل الثاني: استخدام requestIdleCallback"},{depth:2,id:"استخدام-واجهة-scheduler-api",text:"استخدام واجهة Scheduler API"},{depth:3,id:"واجهة-posttask-للجدولة-حسب-الأولوية",text:"واجهة PostTask للجدولة حسب الأولوية"},{depth:2,id:"تحسين-تصيير-react-من-أجل-inp",text:"تحسين تصيير React من أجل INP"},{depth:3,id:"الميزات-المتزامنة-لتحسين-inp",text:"الميزات المتزامنة لتحسين INP"},{depth:3,id:"تفويض-الأحداث-لأداء-أفضل",text:"تفويض الأحداث لأداء أفضل"},{depth:2,id:"تجنب-إرباك-التخطيط",text:"تجنّب إرباك التخطيط"},{depth:3,id:"جمع-عمليات-قراءة-dom-وكتابته-في-دفعات",text:"جمع عمليات قراءة DOM وكتابته في دفعات"},{depth:2,id:"تحسين-استجابة-الإدخال",text:"تحسين استجابة الإدخال"},{depth:3,id:"التهدئة-مقابل-التقييد-في-الإدخالات",text:"التهدئة مقابل التقييد في الإدخالات"},{depth:3,id:"تحسين-التحقق-من-صحة-النماذج",text:"تحسين التحقق من صحة النماذج"},{depth:2,id:"مراقبة-inp-في-الإنتاج",text:"مراقبة INP في الإنتاج"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"},{depth:3,id:"فكك-المهام-الطويلة",text:"فكّك المهام الطويلة"},{depth:3,id:"حسن-معالجات-الأحداث",text:"حسّن معالجات الأحداث"},{depth:3,id:"تجنب-إرباك-التخطيط-1",text:"تجنّب إرباك التخطيط"},{depth:3,id:"استخدم-ميزات-react-المتزامنة",text:"استخدم ميزات React المتزامنة"},{depth:3,id:"راقب-inp",text:"راقب INP"}],e=`<p>يبدو تطبيق React لديك <em>سريعًا</em>. تُحمَّل الصفحة بسرعة، ويظهر المحتوى في الحال. ثم ينقر المستخدم زرًّا و… لا شيء. تبقى الواجهة مجمّدة مدة 200 مللي ثانية. يُعالَج النقر في النهاية، لكن ذلك التأخير — تلك اللحظة من عدم اليقين — كلّفك للتوّ ثقة أحد المستخدمين. أهلًا بك في عالم <strong>INP</strong> (التفاعل إلى الرسم التالي - Interaction to Next Paint)، حيث كل مللي ثانية تأخير وعدٌ مكسور.</p>
<p>يقيس INP مدى سرعة استجابة تطبيقك لتفاعلات المستخدم طوال دورة حياته كاملة. ليس النقرة الأولى وحدها، بل كل نقرة ولمسة وضغطة مفتاح. وهذه هي الحقيقة القاسية: معظم تطبيقات React تفشل في INP لا لأنها بطيئة، بل لأنها تؤدي عملًا أكثر من اللازم على الخيط الرئيسي في الوقت الخطأ.</p>
<p>لنصلح ذلك. لنفكّك تلك المهام الطويلة، ونستفيد من واجهات الجدولة الحديثة، ونبنِ تطبيقات React تستجيب فورًا لكل تفاعل.</p>
<h2 id="فهم-inp-والمهام-الطويلة">فهم INP والمهام الطويلة</h2>
<p>يقيس INP زمن الاستجابة لكل التفاعلات أثناء زيارة الصفحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">INPBreakdown</span> {
  <span class="hljs-attr">inputDelay</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Time until event handler starts</span>
  <span class="hljs-attr">processingTime</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Time to run event handlers</span>
  <span class="hljs-attr">presentationDelay</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Time to paint next frame</span>
  <span class="hljs-attr">totalINP</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Sum of all three</span>
}

<span class="hljs-comment">// Good INP: &lt; 200ms</span>
<span class="hljs-comment">// Needs improvement: 200-500ms</span>
<span class="hljs-comment">// Poor INP: &gt; 500ms</span>

<span class="hljs-comment">// Long task = any script execution &gt; 50ms</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LongTask</span> {
  <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">attribution</span>: <span class="hljs-title class_">TaskAttribution</span>[];
}
</code></pre>
<h2 id="تفكيك-المهام-الطويلة">تفكيك المهام الطويلة</h2>
<h3 id="المشكلة-معالجات-أحداث-مكتلة">المشكلة: معالجات أحداث مكتلة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Long task - blocks the main thread</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BadSearchComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// This blocks the main thread for 200ms+</span>
    <span class="hljs-keyword">const</span> filtered = hugeDataset.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
      <span class="hljs-comment">// Complex filtering logic</span>
      <span class="hljs-keyword">return</span> item.<span class="hljs-property">title</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(query) &amp;&amp;
             item.<span class="hljs-property">description</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(query) &amp;&amp;
             <span class="hljs-title function_">calculateRelevance</span>(item, query) &gt; <span class="hljs-number">0.5</span>;
    });

    <span class="hljs-keyword">const</span> sorted = filtered.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">calculateScore</span>(b, query) - <span class="hljs-title function_">calculateScore</span>(a, query);
    });

    <span class="hljs-keyword">const</span> highlighted = sorted.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> ({
      ...item,
      <span class="hljs-attr">highlightedTitle</span>: <span class="hljs-title function_">highlightText</span>(item.<span class="hljs-property">title</span>, query),
      <span class="hljs-attr">highlightedDesc</span>: <span class="hljs-title function_">highlightText</span>(item.<span class="hljs-property">description</span>, query)
    }));

    <span class="hljs-title function_">setResults</span>(highlighted);
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SearchInput</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleSearch}</span> /&gt;</span></span>;
};
</code></pre>
<h3 id="الحل-الأول-إعادة-التحكم-إلى-الخيط-الرئيسي">الحل الأول: إعادة التحكم إلى الخيط الرئيسي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Yield control back to the browser</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GoodSearchComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isSearching, setIsSearching] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setIsSearching</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Break work into chunks</span>
    <span class="hljs-keyword">const</span> chunkSize = <span class="hljs-number">100</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-attr">filtered</span>: <span class="hljs-title class_">Item</span>[] = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; hugeDataset.<span class="hljs-property">length</span>; i += chunkSize) {
      <span class="hljs-keyword">const</span> chunk = hugeDataset.<span class="hljs-title function_">slice</span>(i, i + chunkSize);

      <span class="hljs-comment">// Process chunk</span>
      <span class="hljs-keyword">const</span> chunkFiltered = chunk.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> item.<span class="hljs-property">title</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(query) &amp;&amp;
               item.<span class="hljs-property">description</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(query);
      });

      filtered.<span class="hljs-title function_">push</span>(...chunkFiltered);

      <span class="hljs-comment">// Yield to main thread</span>
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">yieldToMain</span>();
    }

    <span class="hljs-comment">// Sort in chunks</span>
    <span class="hljs-keyword">const</span> sorted = <span class="hljs-keyword">await</span> <span class="hljs-title function_">chunkSort</span>(filtered, <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">calculateScore</span>(b, query) - <span class="hljs-title function_">calculateScore</span>(a, query);
    });

    <span class="hljs-title function_">setResults</span>(sorted);
    <span class="hljs-title function_">setIsSearching</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchInput</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleSearch}</span> /&gt;</span>
      {isSearching &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">SearchingIndicator</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
};

<span class="hljs-comment">// Utility to yield control</span>
<span class="hljs-keyword">const</span> yieldToMain = (): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">0</span>);
  });
};

<span class="hljs-comment">// Sort in chunks</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> chunkSort&lt;T&gt;(
  <span class="hljs-attr">array</span>: T[],
  <span class="hljs-attr">compareFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: T, <span class="hljs-attr">b</span>: T</span>) =&gt;</span> <span class="hljs-built_in">number</span>
): <span class="hljs-title class_">Promise</span>&lt;T[]&gt; {
  <span class="hljs-comment">// Use merge sort with yielding</span>
  <span class="hljs-keyword">if</span> (array.<span class="hljs-property">length</span> &lt;= <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> array;

  <span class="hljs-keyword">const</span> middle = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(array.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>);
  <span class="hljs-keyword">const</span> left = array.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, middle);
  <span class="hljs-keyword">const</span> right = array.<span class="hljs-title function_">slice</span>(middle);

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">yieldToMain</span>();

  <span class="hljs-keyword">const</span> sortedLeft = <span class="hljs-keyword">await</span> <span class="hljs-title function_">chunkSort</span>(left, compareFn);
  <span class="hljs-keyword">const</span> sortedRight = <span class="hljs-keyword">await</span> <span class="hljs-title function_">chunkSort</span>(right, compareFn);

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">merge</span>(sortedLeft, sortedRight, compareFn);
}
</code></pre>
<h3 id="الحل-الثاني-استخدام-requestidlecallback">الحل الثاني: استخدام <code>requestIdleCallback</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> useIdleProcessor = &lt;T, R&gt;<span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">processor</span>: (items: T[]) =&gt; R[],
  <span class="hljs-attr">options</span>?: <span class="hljs-title class_">IdleRequestOptions</span>
</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [result, setResult] = useState&lt;R[]&gt;([]);
  <span class="hljs-keyword">const</span> [isProcessing, setIsProcessing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> taskQueueRef = useRef&lt;T[]&gt;([]);

  <span class="hljs-keyword">const</span> process = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">items</span>: T[]</span>) =&gt;</span> {
    taskQueueRef.<span class="hljs-property">current</span> = [...items];
    <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">processQueue</span> = (<span class="hljs-params"><span class="hljs-attr">deadline</span>: <span class="hljs-title class_">IdleDeadline</span></span>) =&gt; {
      <span class="hljs-keyword">const</span> <span class="hljs-attr">results</span>: R[] = [];

      <span class="hljs-comment">// Process while we have time</span>
      <span class="hljs-keyword">while</span> (
        taskQueueRef.<span class="hljs-property">current</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> &amp;&amp;
        (deadline.<span class="hljs-title function_">timeRemaining</span>() &gt; <span class="hljs-number">0</span> || deadline.<span class="hljs-property">didTimeout</span>)
      ) {
        <span class="hljs-keyword">const</span> batch = taskQueueRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">splice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>);
        results.<span class="hljs-title function_">push</span>(...<span class="hljs-title function_">processor</span>(batch));
      }

      <span class="hljs-title function_">setResult</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> [...prev, ...results]);

      <span class="hljs-comment">// Continue if more work</span>
      <span class="hljs-keyword">if</span> (taskQueueRef.<span class="hljs-property">current</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-title function_">requestIdleCallback</span>(processQueue, options);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">requestIdleCallback</span>(processQueue, options);
  }, [processor, options]);

  <span class="hljs-keyword">return</span> { process, result, isProcessing };
};

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">DataProcessor</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> { process, result, isProcessing } = <span class="hljs-title function_">useIdleProcessor</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">items</span>: <span class="hljs-title class_">Data</span>[]</span>) =&gt;</span> items.<span class="hljs-title function_">map</span>(transform),
    { <span class="hljs-attr">timeout</span>: <span class="hljs-number">2000</span> }
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> process(largeDataset)}&gt;
        Process Data
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {isProcessing &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ProcessingIndicator</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">Results</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{result}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="استخدام-واجهة-scheduler-api">استخدام واجهة Scheduler API</h2>
<h3 id="واجهة-posttask-للجدولة-حسب-الأولوية">واجهة PostTask للجدولة حسب الأولوية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Modern scheduler.postTask API</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">TaskScheduler</span> {
  <span class="hljs-keyword">private</span> tasks = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">AbortController</span>&gt;();

  <span class="hljs-keyword">async</span> scheduleTask&lt;T&gt;(
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">task</span>: <span class="hljs-function">() =&gt;</span> T | <span class="hljs-title class_">Promise</span>&lt;T&gt;,
    <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;user-blocking&#x27;</span> | <span class="hljs-string">&#x27;user-visible&#x27;</span> | <span class="hljs-string">&#x27;background&#x27;</span> = <span class="hljs-string">&#x27;user-visible&#x27;</span>
  ): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-comment">// Cancel previous task with same ID</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">cancelTask</span>(id);

    <span class="hljs-keyword">const</span> controller = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">tasks</span>.<span class="hljs-title function_">set</span>(id, controller);

    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;scheduler&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">window</span> &amp;&amp; <span class="hljs-string">&#x27;postTask&#x27;</span> <span class="hljs-keyword">in</span> scheduler) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> scheduler.<span class="hljs-title function_">postTask</span>(task, {
          priority,
          <span class="hljs-attr">signal</span>: controller.<span class="hljs-property">signal</span>
        });
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">if</span> (error.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;AbortError&#x27;</span>) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Task <span class="hljs-subst">\${id}</span> was cancelled\`</span>);
        }
        <span class="hljs-keyword">throw</span> error;
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Fallback for browsers without postTask</span>
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">fallbackSchedule</span>(task, priority);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> fallbackSchedule&lt;T&gt;(
    <span class="hljs-attr">task</span>: <span class="hljs-function">() =&gt;</span> T | <span class="hljs-title class_">Promise</span>&lt;T&gt;,
    <span class="hljs-attr">priority</span>: <span class="hljs-built_in">string</span>
  ): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-keyword">const</span> delay = priority === <span class="hljs-string">&#x27;user-blocking&#x27;</span> ? <span class="hljs-number">0</span> :
                  priority === <span class="hljs-string">&#x27;user-visible&#x27;</span> ? <span class="hljs-number">50</span> : <span class="hljs-number">100</span>;

    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, delay));
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">task</span>();
  }

  <span class="hljs-title function_">cancelTask</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> controller = <span class="hljs-variable language_">this</span>.<span class="hljs-property">tasks</span>.<span class="hljs-title function_">get</span>(id);
    <span class="hljs-keyword">if</span> (controller) {
      controller.<span class="hljs-title function_">abort</span>();
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">tasks</span>.<span class="hljs-title function_">delete</span>(id);
    }
  }

  <span class="hljs-title function_">cancelAll</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">tasks</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">controller</span> =&gt;</span> controller.<span class="hljs-title function_">abort</span>());
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">tasks</span>.<span class="hljs-title function_">clear</span>();
  }
}

<span class="hljs-comment">// React hook for task scheduling</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useTaskScheduler</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> schedulerRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TaskScheduler</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      schedulerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">cancelAll</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> schedulerRef.<span class="hljs-property">current</span>;
};

<span class="hljs-comment">// Usage in component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">InteractiveComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> scheduler = <span class="hljs-title function_">useTaskScheduler</span>();
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">ProcessedData</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// High priority - user initiated</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> scheduler.<span class="hljs-title function_">scheduleTask</span>(
      <span class="hljs-string">&#x27;process-click&#x27;</span>,
      <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">processUserInput</span>(),
      <span class="hljs-string">&#x27;user-blocking&#x27;</span>
    );

    <span class="hljs-title function_">setData</span>(result);

    <span class="hljs-comment">// Low priority - analytics</span>
    scheduler.<span class="hljs-title function_">scheduleTask</span>(
      <span class="hljs-string">&#x27;analytics&#x27;</span>,
      <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">sendAnalytics</span>(result),
      <span class="hljs-string">&#x27;background&#x27;</span>
    );
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Process<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};
</code></pre>
<h2 id="تحسين-تصيير-react-من-أجل-inp">تحسين تصيير React من أجل INP</h2>
<h3 id="الميزات-المتزامنة-لتحسين-inp">الميزات المتزامنة لتحسين INP</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Use transitions for non-urgent updates</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SearchWithTransition</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// Urgent - update input immediately</span>
    <span class="hljs-title function_">setQuery</span>(value);

    <span class="hljs-comment">// Non-urgent - search can be interrupted</span>
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> filtered = <span class="hljs-title function_">performExpensiveSearch</span>(value);
      <span class="hljs-title function_">setResults</span>(filtered);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleSearch(e.target.value)}
        className={isPending ? &#x27;searching&#x27; : &#x27;&#x27;}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchResults</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
};

<span class="hljs-comment">// ✅ Use deferred values for expensive renders</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ items }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> deferredItems = <span class="hljs-title function_">useDeferredValue</span>(items);
  <span class="hljs-keyword">const</span> isStale = items !== deferredItems;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isStale</span> ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span> }}&gt;</span>
      {deferredItems.map(item =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{item}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="تفويض-الأحداث-لأداء-أفضل">تفويض الأحداث لأداء أفضل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Many event listeners</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BadList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ items }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {items.map(item =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleClick(item)}&gt;
          {item.name}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// ✅ Single delegated listener</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GoodList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ items }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleListClick</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> target = e.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>;
    <span class="hljs-keyword">const</span> li = target.<span class="hljs-title function_">closest</span>(<span class="hljs-string">&#x27;li&#x27;</span>);

    <span class="hljs-keyword">if</span> (li) {
      <span class="hljs-keyword">const</span> id = li.<span class="hljs-property">dataset</span>.<span class="hljs-property">itemId</span>;
      <span class="hljs-keyword">const</span> item = items.<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> i.<span class="hljs-property">id</span> === id);
      <span class="hljs-keyword">if</span> (item) <span class="hljs-title function_">handleClick</span>(item);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleListClick}</span>&gt;</span>
      {items.map(item =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">data-item-id</span>=<span class="hljs-string">{item.id}</span>&gt;</span>
          {item.name}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="تجنب-إرباك-التخطيط">تجنّب إرباك التخطيط</h2>
<h3 id="جمع-عمليات-قراءة-dom-وكتابته-في-دفعات">جمع عمليات قراءة DOM وكتابته في دفعات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Layout thrashing - forces multiple reflows</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BadMeasurement</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">measureElements</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> elements = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.item&#x27;</span>);

    elements.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> height = el.<span class="hljs-property">clientHeight</span>; <span class="hljs-comment">// Read</span>
      el.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">\`<span class="hljs-subst">\${height * <span class="hljs-number">2</span>}</span>px\`</span>; <span class="hljs-comment">// Write - forces reflow</span>
      <span class="hljs-keyword">const</span> width = el.<span class="hljs-property">clientWidth</span>; <span class="hljs-comment">// Read - forces reflow again</span>
      el.<span class="hljs-property">style</span>.<span class="hljs-property">width</span> = <span class="hljs-string">\`<span class="hljs-subst">\${width * <span class="hljs-number">2</span>}</span>px\`</span>; <span class="hljs-comment">// Write</span>
    });
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{measureElements}</span>&gt;</span>Measure<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Batched reads and writes</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GoodMeasurement</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">measureElements</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> elements = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.item&#x27;</span>);
    <span class="hljs-keyword">const</span> <span class="hljs-attr">measurements</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">el</span>: <span class="hljs-title class_">Element</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span> }&gt; = [];

    <span class="hljs-comment">// Batch all reads</span>
    elements.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
      measurements.<span class="hljs-title function_">push</span>({
        el,
        <span class="hljs-attr">height</span>: el.<span class="hljs-property">clientHeight</span>,
        <span class="hljs-attr">width</span>: el.<span class="hljs-property">clientWidth</span>
      });
    });

    <span class="hljs-comment">// Batch all writes</span>
    measurements.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ el, height, width }</span>) =&gt;</span> {
      (el <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>).<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">\`<span class="hljs-subst">\${height * <span class="hljs-number">2</span>}</span>px\`</span>;
      (el <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>).<span class="hljs-property">style</span>.<span class="hljs-property">width</span> = <span class="hljs-string">\`<span class="hljs-subst">\${width * <span class="hljs-number">2</span>}</span>px\`</span>;
    });
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{measureElements}</span>&gt;</span>Measure<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};

<span class="hljs-comment">// Using requestAnimationFrame for DOM updates</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AnimatedComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updatePositions</span> = (<span class="hljs-params"><span class="hljs-attr">elements</span>: <span class="hljs-title class_">HTMLElement</span>[]</span>) =&gt; {
    <span class="hljs-comment">// Read phase</span>
    <span class="hljs-keyword">const</span> positions = elements.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> ({
      el,
      <span class="hljs-attr">current</span>: el.<span class="hljs-title function_">getBoundingClientRect</span>()
    }));

    <span class="hljs-comment">// Write phase in next frame</span>
    <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
      positions.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ el, current }</span>) =&gt;</span> {
        el.<span class="hljs-property">style</span>.<span class="hljs-property">transform</span> = <span class="hljs-string">\`translateY(<span class="hljs-subst">\${current.top + <span class="hljs-number">100</span>}</span>px)\`</span>;
      });
    });
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Animated content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="تحسين-استجابة-الإدخال">تحسين استجابة الإدخال</h2>
<h3 id="التهدئة-مقابل-التقييد-في-الإدخالات">التهدئة مقابل التقييد في الإدخالات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Custom hook for optimized input handling</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useOptimizedInput</span> = (<span class="hljs-params">
  <span class="hljs-attr">callback</span>: (value: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span>,
  <span class="hljs-attr">delay</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">300</span>
</span>) =&gt; {
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [isPending, setIsPending] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> callbackRef = <span class="hljs-title function_">useRef</span>(callback);
  <span class="hljs-keyword">const</span> timeoutRef = useRef&lt;<span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span>&gt;();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    callbackRef.<span class="hljs-property">current</span> = callback;
  }, [callback]);

  <span class="hljs-keyword">const</span> handleChange = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> newValue = e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>;

    <span class="hljs-comment">// Update input immediately (good INP)</span>
    <span class="hljs-title function_">setValue</span>(newValue);
    <span class="hljs-title function_">setIsPending</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Clear previous timeout</span>
    <span class="hljs-keyword">if</span> (timeoutRef.<span class="hljs-property">current</span>) {
      <span class="hljs-built_in">clearTimeout</span>(timeoutRef.<span class="hljs-property">current</span>);
    }

    <span class="hljs-comment">// Debounce the expensive operation</span>
    timeoutRef.<span class="hljs-property">current</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Use scheduler for non-blocking execution</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;scheduler&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">window</span> &amp;&amp; <span class="hljs-string">&#x27;postTask&#x27;</span> <span class="hljs-keyword">in</span> scheduler) {
        scheduler.<span class="hljs-title function_">postTask</span>(<span class="hljs-function">() =&gt;</span> {
          callbackRef.<span class="hljs-title function_">current</span>(newValue);
          <span class="hljs-title function_">setIsPending</span>(<span class="hljs-literal">false</span>);
        }, { <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;user-visible&#x27;</span> });
      } <span class="hljs-keyword">else</span> {
        callbackRef.<span class="hljs-title function_">current</span>(newValue);
        <span class="hljs-title function_">setIsPending</span>(<span class="hljs-literal">false</span>);
      }
    }, delay);
  }, [delay]);

  <span class="hljs-keyword">return</span> { value, handleChange, isPending };
};

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SearchInput</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> { value, handleChange, isPending } = <span class="hljs-title function_">useOptimizedInput</span>(
    <span class="hljs-function">(<span class="hljs-params">query</span>) =&gt;</span> <span class="hljs-title function_">performSearch</span>(query),
    <span class="hljs-number">300</span>
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Search...&quot;</span>
      /&gt;</span>
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="تحسين-التحقق-من-صحة-النماذج">تحسين التحقق من صحة النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationScheduler</span> {
  <span class="hljs-keyword">private</span> validationQueue = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ValidationResult</span>&gt;&gt;();
  <span class="hljs-keyword">private</span> results = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">ValidationResult</span>&gt;();

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">scheduleValidation</span>(<span class="hljs-params"><span class="hljs-attr">fieldName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">validator</span>: () =&gt; <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ValidationResult</span>&gt;</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">validationQueue</span>.<span class="hljs-title function_">set</span>(fieldName, validator);

    <span class="hljs-comment">// Use idle time for validation</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ValidationResult</span>&gt;(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
      <span class="hljs-title function_">requestIdleCallback</span>(<span class="hljs-title function_">async</span> (deadline) =&gt; {
        <span class="hljs-keyword">if</span> (deadline.<span class="hljs-title function_">timeRemaining</span>() &gt; <span class="hljs-number">10</span>) {
          <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">validator</span>();
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">results</span>.<span class="hljs-title function_">set</span>(fieldName, result);
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">validationQueue</span>.<span class="hljs-title function_">delete</span>(fieldName);
          <span class="hljs-title function_">resolve</span>(result);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// Reschedule if not enough time</span>
          <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">scheduleValidation</span>(fieldName, validator).<span class="hljs-title function_">then</span>(resolve);
        }
      });
    });
  }

  <span class="hljs-title function_">getResult</span>(<span class="hljs-attr">fieldName</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">ValidationResult</span> | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">results</span>.<span class="hljs-title function_">get</span>(fieldName);
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ValidationResult</span> {
  <span class="hljs-attr">valid</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">errors</span>?: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">useFormValidation</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> schedulerRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ValidationScheduler</span>());
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;&gt;({});

  <span class="hljs-keyword">const</span> validateField = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">rules</span>: <span class="hljs-title class_">ValidationRule</span>[]) =&gt; {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> schedulerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">scheduleValidation</span>(name, <span class="hljs-title function_">async</span> () =&gt; {
        <span class="hljs-comment">// Run validation rules</span>
        <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-built_in">string</span>[] = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> rule <span class="hljs-keyword">of</span> rules) {
          <span class="hljs-keyword">if</span> (!rule.<span class="hljs-title function_">test</span>(value)) {
            errors.<span class="hljs-title function_">push</span>(rule.<span class="hljs-property">message</span>);
          }
        }
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: errors.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>, errors };
      });

      <span class="hljs-title function_">setErrors</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
        ...prev,
        [name]: result.<span class="hljs-property">errors</span> || [],
      }));
    },
    [],
  );

  <span class="hljs-keyword">return</span> { validateField, errors };
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ValidationRule</span> {
  <span class="hljs-attr">test</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
}
</code></pre>
<h2 id="مراقبة-inp-في-الإنتاج">مراقبة INP في الإنتاج</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">INPMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">observer</span>: <span class="hljs-title class_">PerformanceObserver</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">interactions</span>: <span class="hljs-title class_">InteractionEntry</span>[] = [];
  <span class="hljs-keyword">private</span> inp = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">startMonitoring</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!(<span class="hljs-string">&#x27;PerformanceObserver&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">window</span>)) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">entryType</span> === <span class="hljs-string">&#x27;event&#x27;</span> || entry.<span class="hljs-property">entryType</span> === <span class="hljs-string">&#x27;first-input&#x27;</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processInteraction</span>(entry <span class="hljs-keyword">as</span> <span class="hljs-title class_">InteractionEntry</span>);
        }
      }
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span>.<span class="hljs-title function_">observe</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;event&#x27;</span>,
      <span class="hljs-attr">buffered</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">durationThreshold</span>: <span class="hljs-number">0</span>,
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processInteraction</span>(<span class="hljs-params"><span class="hljs-attr">entry</span>: <span class="hljs-title class_">InteractionEntry</span></span>) {
    <span class="hljs-comment">// Only consider interactions with duration</span>
    <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">duration</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>.<span class="hljs-title function_">push</span>(entry);

    <span class="hljs-comment">// Calculate INP (98th percentile of interactions)</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateINP</span>();

    <span class="hljs-comment">// Report slow interactions</span>
    <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">duration</span> &gt; <span class="hljs-number">200</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportSlowInteraction</span>(entry);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculateINP</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> sorted = [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">duration</span> - a.<span class="hljs-property">duration</span>);
    <span class="hljs-keyword">const</span> index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> * <span class="hljs-number">0.98</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">inp</span> = sorted[index].<span class="hljs-property">duration</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportSlowInteraction</span>(<span class="hljs-params"><span class="hljs-attr">entry</span>: <span class="hljs-title class_">InteractionEntry</span></span>) {
    <span class="hljs-keyword">const</span> report = {
      <span class="hljs-attr">type</span>: entry.<span class="hljs-property">name</span>,
      <span class="hljs-attr">duration</span>: entry.<span class="hljs-property">duration</span>,
      <span class="hljs-attr">startTime</span>: entry.<span class="hljs-property">startTime</span>,
      <span class="hljs-attr">target</span>: entry.<span class="hljs-property">target</span>,
      <span class="hljs-attr">inp</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">inp</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    };

    <span class="hljs-comment">// Send to analytics</span>
    navigator.<span class="hljs-title function_">sendBeacon</span>(<span class="hljs-string">&#x27;/api/metrics/inp&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(report));
  }

  <span class="hljs-title function_">getINP</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">inp</span>;
  }

  <span class="hljs-title function_">getInteractions</span>(): <span class="hljs-title class_">InteractionEntry</span>[] {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>;
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InteractionEntry</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">PerformanceEntry</span> {
  <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">interactionId</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">target</span>?: <span class="hljs-title class_">Node</span>;
}

<span class="hljs-comment">// React hook for INP monitoring</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useINPMonitoring</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> monitorRef = useRef&lt;<span class="hljs-title class_">INPMonitor</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [inp, setINP] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    monitorRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">INPMonitor</span>();
    monitorRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">startMonitoring</span>();

    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (monitorRef.<span class="hljs-property">current</span>) {
        <span class="hljs-title function_">setINP</span>(monitorRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getINP</span>());
      }
    }, <span class="hljs-number">5000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearInterval</span>(interval);
    };
  }, []);

  <span class="hljs-keyword">return</span> { inp };
};
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<h3 id="فكك-المهام-الطويلة">فكّك المهام الطويلة</h3>
<ul>
<li>أعد التحكم إلى الخيط الرئيسي كل 50 مللي ثانية</li>
<li>استخدم requestIdleCallback للعمل غير العاجل</li>
<li>نفّذ جدولة المهام مع الأولويات</li>
</ul>
<h3 id="حسن-معالجات-الأحداث">حسّن معالجات الأحداث</h3>
<ul>
<li>هدّئ العمليات المكلفة</li>
<li>استخدم تفويض الأحداث</li>
<li>عالج البيانات في قطع مع إعادة التحكم</li>
</ul>
<h3 id="تجنب-إرباك-التخطيط-1">تجنّب إرباك التخطيط</h3>
<ul>
<li>اجمع عمليات قراءة DOM وكتابته في دفعات</li>
<li>استخدم requestAnimationFrame للتحديثات</li>
<li>خزّن قياسات التخطيط مؤقتًا</li>
</ul>
<h3 id="استخدم-ميزات-react-المتزامنة">استخدم ميزات React المتزامنة</h3>
<ul>
<li>ضع علامة على التحديثات غير العاجلة بالانتقالات</li>
<li>أخّر التصييرات المكلفة</li>
<li>استخدم Suspense لجلب البيانات</li>
</ul>
<h3 id="راقب-inp">راقب INP</h3>
<ul>
<li>تتبّع كل تفاعلات المستخدم</li>
<li>حدّد التفاعلات البطيئة</li>
<li>أبلغ عن المقاييس إلى التحليلات</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
