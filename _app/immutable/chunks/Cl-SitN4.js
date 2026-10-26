const s="kinney",a="react-performance",n="أداء React",l="speculation-rules-bfcache",p="قواعد التخمين وتحسين ذاكرة bfcache",t=[{depth:2,id:"فهم-واجهة-قواعد-التخمين-speculation-rules-api",text:"فهم واجهة قواعد التخمين (Speculation Rules API)"},{depth:2,id:"تنفيذ-تخمين-ذكي",text:"تنفيذ تخمين ذكي"},{depth:3,id:"قواعد-التخمين-الثابتة",text:"قواعد التخمين الثابتة"},{depth:3,id:"تخمين-ديناميكي-بناء-على-سلوك-المستخدم",text:"تخمين ديناميكي بناءً على سلوك المستخدم"},{depth:2,id:"تحسين-ذاكرة-الرجوعالتقدم-bfcache",text:"تحسين ذاكرة الرجوع/التقدم (bfcache)"},{depth:3,id:"فهم-العوامل-المانعة-لـ-bfcache",text:"فهم العوامل المانعة لـ bfcache"},{depth:3,id:"إدارة-اتصالات-websocket",text:"إدارة اتصالات WebSocket"},{depth:3,id:"التعامل-مع-المؤقتات-والفترات",text:"التعامل مع المؤقتات والفترات"},{depth:2,id:"اختبار-أهلية-bfcache",text:"اختبار أهلية bfcache"},{depth:2,id:"مراقبة-نجاح-التخمين",text:"مراقبة نجاح التخمين"},{depth:2,id:"أنماط-تخمين-متقدمة",text:"أنماط تخمين متقدمة"},{depth:3,id:"التخمين-بناء-على-إطار-العرض",text:"التخمين بناءً على إطار العرض"},{depth:3,id:"التخمين-الزمني",text:"التخمين الزمني"},{depth:2,id:"التكامل-مع-react-router",text:"التكامل مع React Router"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>تنقر رابطًا. تُحمَّل الصفحة فورًا. تضغط زر الرجوع. تظهر الصفحة السابقة على الفور، تمامًا كما تركتها. لا مؤشرات تحميل، ولا إعادة تصيير، ولا انتظار. هذا ليس سحرًا — بل ما يحدث عندما تستفيد على نحو صحيح من واجهة قواعد التخمين (Speculation Rules API) ومن ذاكرة الرجوع/التقدم (bfcache).</p>
<p>تكسر معظم تطبيقات React هذه الميزات القوية للمتصفح دون أن تدري. فهي تمنع bfcache بمستمعات أحداث غير مبالية. وتتجاهل قواعد تخمين كان يمكنها تصيير صفحات كاملة مسبقًا. وتتعامل مع التنقل كأننا في 2010، فتجعل المستخدمين ينتظرون كل انتقال بين الصفحات.</p>
<p>لنصلح ذلك. لنبنِ تطبيقات React تتنقل بسرعة تجعل المستخدمين يظنون أنهم يستخدمون تطبيقًا أصليًا.</p>
<h2 id="فهم-واجهة-قواعد-التخمين-speculation-rules-api">فهم واجهة قواعد التخمين (Speculation Rules API)</h2>
<p>تتيح لك واجهة قواعد التخمين إخبار المتصفح بالصفحات التي يجب تصييرها مسبقًا أو جلبها مسبقًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SpeculationRules</span> {
  <span class="hljs-attr">prerender</span>?: <span class="hljs-title class_">Rule</span>[];
  <span class="hljs-attr">prefetch</span>?: <span class="hljs-title class_">Rule</span>[];
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Rule</span> {
  <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span> | <span class="hljs-string">&#x27;document&#x27;</span>;
  <span class="hljs-attr">urls</span>?: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">where</span>?: <span class="hljs-title class_">DocumentRule</span>;
  <span class="hljs-attr">eagerness</span>?: <span class="hljs-string">&#x27;immediate&#x27;</span> | <span class="hljs-string">&#x27;eager&#x27;</span> | <span class="hljs-string">&#x27;moderate&#x27;</span> | <span class="hljs-string">&#x27;conservative&#x27;</span>;
  <span class="hljs-attr">requires</span>?: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-comment">// Basic implementation</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">addSpeculationRules</span> = (<span class="hljs-params"><span class="hljs-attr">rules</span>: <span class="hljs-title class_">SpeculationRules</span></span>) =&gt; {
  <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Speculation Rules API not supported&#x27;</span>);
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
  script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
  script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(rules);
  <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);
};
</code></pre>
<h2 id="تنفيذ-تخمين-ذكي">تنفيذ تخمين ذكي</h2>
<h3 id="قواعد-التخمين-الثابتة">قواعد التخمين الثابتة</h3>
<p>عرّف قواعد لأنماط التنقل الشائعة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">StaticSpeculation</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Only add rules if API is supported</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> rules = {
      <span class="hljs-attr">prerender</span>: [
        {
          <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
          <span class="hljs-attr">urls</span>: [<span class="hljs-string">&#x27;/dashboard&#x27;</span>, <span class="hljs-string">&#x27;/profile&#x27;</span>],
          <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;moderate&#x27;</span>,
        },
      ],
      <span class="hljs-attr">prefetch</span>: [
        {
          <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;document&#x27;</span>,
          <span class="hljs-attr">where</span>: {
            <span class="hljs-attr">and</span>: [
              { <span class="hljs-attr">href_matches</span>: <span class="hljs-string">&#x27;/*&#x27;</span> },
              { <span class="hljs-attr">not</span>: { <span class="hljs-attr">href_matches</span>: <span class="hljs-string">&#x27;/logout&#x27;</span> } },
              { <span class="hljs-attr">not</span>: { <span class="hljs-attr">href_matches</span>: <span class="hljs-string">&#x27;/api/*&#x27;</span> } },
            ],
          },
          <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;conservative&#x27;</span>,
        },
      ],
    };

    <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
    script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
    script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(rules);
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      script.<span class="hljs-title function_">remove</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
};
</code></pre>
<h3 id="تخمين-ديناميكي-بناء-على-سلوك-المستخدم">تخمين ديناميكي بناءً على سلوك المستخدم</h3>
<p>تنبّأ واصيّر مسبقًا بناءً على أنماط المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">NavigationPredictor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">history</span>: <span class="hljs-built_in">string</span>[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">patterns</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">recordNavigation</span>(<span class="hljs-params"><span class="hljs-attr">from</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">to</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">history</span>.<span class="hljs-title function_">push</span>(to);
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">history</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">100</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">history</span>.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-comment">// Update patterns</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">patterns</span>.<span class="hljs-title function_">has</span>(<span class="hljs-keyword">from</span>)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">patterns</span>.<span class="hljs-title function_">set</span>(<span class="hljs-keyword">from</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());
    }

    <span class="hljs-keyword">const</span> destinations = <span class="hljs-variable language_">this</span>.<span class="hljs-property">patterns</span>.<span class="hljs-title function_">get</span>(<span class="hljs-keyword">from</span>)!;
    destinations.<span class="hljs-title function_">set</span>(to, (destinations.<span class="hljs-title function_">get</span>(to) || <span class="hljs-number">0</span>) + <span class="hljs-number">1</span>);
  }

  <span class="hljs-title function_">predictNext</span>(<span class="hljs-attr">currentPage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">threshold</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0.3</span>): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> destinations = <span class="hljs-variable language_">this</span>.<span class="hljs-property">patterns</span>.<span class="hljs-title function_">get</span>(currentPage);
    <span class="hljs-keyword">if</span> (!destinations) <span class="hljs-keyword">return</span> [];

    <span class="hljs-keyword">const</span> total = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(destinations.<span class="hljs-title function_">values</span>()).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);
    <span class="hljs-keyword">const</span> <span class="hljs-attr">predictions</span>: <span class="hljs-title class_">Array</span>&lt;[<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>]&gt; = [];

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [url, count] <span class="hljs-keyword">of</span> destinations) {
      <span class="hljs-keyword">const</span> probability = count / total;
      <span class="hljs-keyword">if</span> (probability &gt;= threshold) {
        predictions.<span class="hljs-title function_">push</span>([url, probability]);
      }
    }

    <span class="hljs-keyword">return</span> predictions.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b[<span class="hljs-number">1</span>] - a[<span class="hljs-number">1</span>]).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[url]</span>) =&gt;</span> url);
  }
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">usePredictiveSpeculation</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> location = <span class="hljs-title function_">useLocation</span>();
  <span class="hljs-keyword">const</span> predictorRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">NavigationPredictor</span>());
  <span class="hljs-keyword">const</span> [speculating, setSpeculating] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> predictor = predictorRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">const</span> currentPath = location.<span class="hljs-property">pathname</span>;

    <span class="hljs-comment">// Record navigation</span>
    <span class="hljs-keyword">const</span> previousPath = <span class="hljs-variable language_">sessionStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;previousPath&#x27;</span>);
    <span class="hljs-keyword">if</span> (previousPath) {
      predictor.<span class="hljs-title function_">recordNavigation</span>(previousPath, currentPath);
    }
    <span class="hljs-variable language_">sessionStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;previousPath&#x27;</span>, currentPath);

    <span class="hljs-comment">// Predict next pages</span>
    <span class="hljs-keyword">const</span> predictions = predictor.<span class="hljs-title function_">predictNext</span>(currentPath);

    <span class="hljs-keyword">if</span> (predictions.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) {
      <span class="hljs-comment">// Remove old speculation rules</span>
      <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;script[type=&quot;speculationrules&quot;]&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">s</span>) =&gt;</span> s.<span class="hljs-title function_">remove</span>());

      <span class="hljs-comment">// Add new rules</span>
      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
      script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
        <span class="hljs-attr">prerender</span>: [
          {
            <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
            <span class="hljs-attr">urls</span>: predictions.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>), <span class="hljs-comment">// Prerender top 2 predictions</span>
            <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;moderate&#x27;</span>,
          },
        ],
        <span class="hljs-attr">prefetch</span>: [
          {
            <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
            <span class="hljs-attr">urls</span>: predictions.<span class="hljs-title function_">slice</span>(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>), <span class="hljs-comment">// Prefetch next 3</span>
            <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;conservative&#x27;</span>,
          },
        ],
      });
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);

      <span class="hljs-title function_">setSpeculating</span>(predictions);
    }
  }, [location]);

  <span class="hljs-keyword">return</span> { speculating };
};
</code></pre>
<h2 id="تحسين-ذاكرة-الرجوعالتقدم-bfcache">تحسين ذاكرة الرجوع/التقدم (bfcache)</h2>
<p>تخزّن bfcache لقطات كاملة للصفحات لتنقّل فوري بالرجوع/التقدم:</p>
<h3 id="فهم-العوامل-المانعة-لـ-bfcache">فهم العوامل المانعة لـ bfcache</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Common bfcache blockers</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BfcacheBlocker</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Unload event blocks bfcache</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;unload&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Page unloading&#x27;</span>);
    });

    <span class="hljs-comment">// Open connections block bfcache</span>
    <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(<span class="hljs-string">&#x27;wss://example.com&#x27;</span>);

    <span class="hljs-comment">// IndexedDB transactions can block</span>
    <span class="hljs-keyword">const</span> request = indexedDB.<span class="hljs-title function_">open</span>(<span class="hljs-string">&#x27;mydb&#x27;</span>);
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>This component blocks bfcache!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ bfcache-friendly implementation</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BfcacheFriendly</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Use pagehide instead of unload</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageHide</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">PageTransitionEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (e.<span class="hljs-property">persisted</span>) {
        <span class="hljs-comment">// Page is being cached</span>
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Page entering bfcache&#x27;</span>);
      }
    };

    <span class="hljs-comment">// Use pageshow to detect restoration</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageShow</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">PageTransitionEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (e.<span class="hljs-property">persisted</span>) {
        <span class="hljs-comment">// Page restored from bfcache</span>
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Page restored from bfcache&#x27;</span>);
        <span class="hljs-comment">// Refresh any stale data</span>
        <span class="hljs-title function_">refreshData</span>();
      }
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;pagehide&#x27;</span>, handlePageHide);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;pageshow&#x27;</span>, handlePageShow);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;pagehide&#x27;</span>, handlePageHide);
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;pageshow&#x27;</span>, handlePageShow);
    };
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>bfcache optimized!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h3 id="إدارة-اتصالات-websocket">إدارة اتصالات WebSocket</h3>
<p>أغلق الاتصالات على نحو صحيح من أجل bfcache:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useBfcacheWebSocket</span> = (<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> wsRef = useRef&lt;<span class="hljs-title class_">WebSocket</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [connected, setConnected] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> connect = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (wsRef.<span class="hljs-property">current</span>?.<span class="hljs-property">readyState</span> === <span class="hljs-title class_">WebSocket</span>.<span class="hljs-property">OPEN</span>) <span class="hljs-keyword">return</span>;

    wsRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(url);
    wsRef.<span class="hljs-property">current</span>.<span class="hljs-property">onopen</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setConnected</span>(<span class="hljs-literal">true</span>);
    wsRef.<span class="hljs-property">current</span>.<span class="hljs-property">onclose</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setConnected</span>(<span class="hljs-literal">false</span>);
  }, [url]);

  <span class="hljs-keyword">const</span> disconnect = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    wsRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">close</span>();
    wsRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
    <span class="hljs-title function_">setConnected</span>(<span class="hljs-literal">false</span>);
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">connect</span>();

    <span class="hljs-comment">// Handle bfcache events</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageHide</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">PageTransitionEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (e.<span class="hljs-property">persisted</span>) {
        <span class="hljs-comment">// Entering bfcache - close connection</span>
        <span class="hljs-title function_">disconnect</span>();
      }
    };

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageShow</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">PageTransitionEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (e.<span class="hljs-property">persisted</span>) {
        <span class="hljs-comment">// Restored from bfcache - reconnect</span>
        <span class="hljs-title function_">connect</span>();
      }
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;pagehide&#x27;</span>, handlePageHide);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;pageshow&#x27;</span>, handlePageShow);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">disconnect</span>();
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;pagehide&#x27;</span>, handlePageHide);
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;pageshow&#x27;</span>, handlePageShow);
    };
  }, [connect, disconnect]);

  <span class="hljs-keyword">return</span> { connected, <span class="hljs-attr">reconnect</span>: connect };
};
</code></pre>
<h3 id="التعامل-مع-المؤقتات-والفترات">التعامل مع المؤقتات والفترات</h3>
<p>أوقف المؤقتات واستأنفها من أجل bfcache:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useBfcacheTimer</span> = (<span class="hljs-params"><span class="hljs-attr">callback</span>: () =&gt; <span class="hljs-built_in">void</span>, <span class="hljs-attr">delay</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> savedCallback = <span class="hljs-title function_">useRef</span>(callback);
  <span class="hljs-keyword">const</span> intervalRef = useRef&lt;<span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isPaused, setIsPaused] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    savedCallback.<span class="hljs-property">current</span> = callback;
  }, [callback]);

  <span class="hljs-keyword">const</span> start = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (intervalRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    intervalRef.<span class="hljs-property">current</span> = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      savedCallback.<span class="hljs-title function_">current</span>();
    }, delay);
    <span class="hljs-title function_">setIsPaused</span>(<span class="hljs-literal">false</span>);
  }, [delay]);

  <span class="hljs-keyword">const</span> stop = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (intervalRef.<span class="hljs-property">current</span>) {
      <span class="hljs-built_in">clearInterval</span>(intervalRef.<span class="hljs-property">current</span>);
      intervalRef.<span class="hljs-property">current</span> = <span class="hljs-literal">null</span>;
      <span class="hljs-title function_">setIsPaused</span>(<span class="hljs-literal">true</span>);
    }
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">start</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageHide</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">PageTransitionEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (e.<span class="hljs-property">persisted</span>) {
        <span class="hljs-title function_">stop</span>(); <span class="hljs-comment">// Pause timer when entering bfcache</span>
      }
    };

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageShow</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">PageTransitionEvent</span></span>) =&gt; {
      <span class="hljs-keyword">if</span> (e.<span class="hljs-property">persisted</span>) {
        <span class="hljs-title function_">start</span>(); <span class="hljs-comment">// Resume timer when restored</span>
      }
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;pagehide&#x27;</span>, handlePageHide);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;pageshow&#x27;</span>, handlePageShow);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">stop</span>();
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;pagehide&#x27;</span>, handlePageHide);
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;pageshow&#x27;</span>, handlePageShow);
    };
  }, [start, stop]);

  <span class="hljs-keyword">return</span> { isPaused, start, stop };
};
</code></pre>
<h2 id="اختبار-أهلية-bfcache">اختبار أهلية bfcache</h2>
<p>ابنِ أدوات لاختبار bfcache ومراقبتها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BfcacheAnalyzer</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">blockers</span>: <span class="hljs-built_in">string</span>[] = [];

  <span class="hljs-title function_">analyze</span>(): { <span class="hljs-attr">eligible</span>: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">blockers</span>: <span class="hljs-built_in">string</span>[] } {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span> = [];

    <span class="hljs-comment">// Check for unload handlers</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">onunload</span> !== <span class="hljs-literal">null</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;unload event handler&#x27;</span>);
    }

    <span class="hljs-comment">// Check for beforeunload handlers</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">onbeforeunload</span> !== <span class="hljs-literal">null</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;beforeunload event handler&#x27;</span>);
    }

    <span class="hljs-comment">// Check for open IndexedDB connections</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkIndexedDB</span>();

    <span class="hljs-comment">// Check for active WebSockets</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkWebSockets</span>();

    <span class="hljs-comment">// Check for pending network requests</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkPendingRequests</span>();

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">eligible</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>,
      <span class="hljs-attr">blockers</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">checkIndexedDB</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Check if any IndexedDB databases are open</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;databases&#x27;</span> <span class="hljs-keyword">in</span> indexedDB) {
      indexedDB.<span class="hljs-title function_">databases</span>().<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">databases</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (databases.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`Open IndexedDB: <span class="hljs-subst">\${databases.map(db =&gt; db.name).join(<span class="hljs-string">&#x27;, &#x27;</span>)}</span>\`</span>);
        }
      });
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">checkWebSockets</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Monitor WebSocket constructor</span>
    <span class="hljs-keyword">const</span> originalWebSocket = <span class="hljs-variable language_">window</span>.<span class="hljs-property">WebSocket</span>;
    <span class="hljs-keyword">let</span> activeConnections = <span class="hljs-number">0</span>;

    <span class="hljs-variable language_">window</span>.<span class="hljs-property">WebSocket</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(originalWebSocket, {
      <span class="hljs-title function_">construct</span>(<span class="hljs-params">target, args</span>) {
        activeConnections++;
        <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-title function_">target</span>(...args);

        <span class="hljs-keyword">const</span> originalClose = ws.<span class="hljs-property">close</span>;
        ws.<span class="hljs-property">close</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">...args</span>) {
          activeConnections--;
          <span class="hljs-keyword">return</span> originalClose.<span class="hljs-title function_">apply</span>(<span class="hljs-variable language_">this</span>, args);
        };

        <span class="hljs-keyword">return</span> ws;
      }
    });

    <span class="hljs-keyword">if</span> (activeConnections &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`<span class="hljs-subst">\${activeConnections}</span> active WebSocket connections\`</span>);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">checkPendingRequests</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Check for pending fetch requests</span>
    <span class="hljs-keyword">const</span> resources = performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;resource&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceResourceTiming</span>[];
    <span class="hljs-keyword">const</span> pending = resources.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> r.<span class="hljs-property">responseEnd</span> === <span class="hljs-number">0</span>);

    <span class="hljs-keyword">if</span> (pending.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">blockers</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`<span class="hljs-subst">\${pending.length}</span> pending network requests\`</span>);
    }
  }
}

<span class="hljs-comment">// React component for monitoring</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BfcacheMonitor</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [analysis, setAnalysis] = useState&lt;{ <span class="hljs-attr">eligible</span>: <span class="hljs-built_in">boolean</span>; <span class="hljs-attr">blockers</span>: <span class="hljs-built_in">string</span>[] } | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> analyzer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BfcacheAnalyzer</span>();

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">check</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> result = analyzer.<span class="hljs-title function_">analyze</span>();
      <span class="hljs-title function_">setAnalysis</span>(result);
    };

    <span class="hljs-title function_">check</span>();
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(check, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, []);

  <span class="hljs-keyword">if</span> (!analysis) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">bfcache-monitor</span> \${<span class="hljs-attr">analysis.eligible</span> ? &#x27;<span class="hljs-attr">eligible</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">blocked</span>&#x27;}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>bfcache Status: {analysis.eligible ? &#x27;✅ Eligible&#x27; : &#x27;❌ Blocked&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      {analysis.blockers.length &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {analysis.blockers.map((blocker, i) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span>&gt;</span>{blocker}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="مراقبة-نجاح-التخمين">مراقبة نجاح التخمين</h2>
<p>تتبّع ما إذا كان التخمين يعمل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">SpeculationMonitor</span> {
  <span class="hljs-keyword">private</span> speculatedUrls = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;();
  <span class="hljs-keyword">private</span> hits = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> misses = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">recordSpeculation</span>(<span class="hljs-params"><span class="hljs-attr">urls</span>: <span class="hljs-built_in">string</span>[]</span>) {
    urls.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">speculatedUrls</span>.<span class="hljs-title function_">add</span>(url));
  }

  <span class="hljs-title function_">recordNavigation</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">speculatedUrls</span>.<span class="hljs-title function_">has</span>(url)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">hits</span>++;
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`✅ Speculation hit: <span class="hljs-subst">\${url}</span>\`</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">misses</span>++;
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`❌ Speculation miss: <span class="hljs-subst">\${url}</span>\`</span>);
    }
  }

  <span class="hljs-title function_">getMetrics</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> total = <span class="hljs-variable language_">this</span>.<span class="hljs-property">hits</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">misses</span>;
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hits</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">hits</span>,
      <span class="hljs-attr">misses</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">misses</span>,
      <span class="hljs-attr">hitRate</span>: total &gt; <span class="hljs-number">0</span> ? <span class="hljs-variable language_">this</span>.<span class="hljs-property">hits</span> / total : <span class="hljs-number">0</span>,
      <span class="hljs-attr">speculatedCount</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">speculatedUrls</span>.<span class="hljs-property">size</span>,
    };
  }
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">useSpeculationMonitor</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> monitorRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">SpeculationMonitor</span>());
  <span class="hljs-keyword">const</span> location = <span class="hljs-title function_">useLocation</span>();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Record navigation</span>
    monitorRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">recordNavigation</span>(location.<span class="hljs-property">pathname</span>);

    <span class="hljs-comment">// Report metrics</span>
    <span class="hljs-keyword">const</span> metrics = monitorRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getMetrics</span>();
    <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">hits</span> + metrics.<span class="hljs-property">misses</span> &gt; <span class="hljs-number">10</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Speculation metrics:&#x27;</span>, metrics);

      <span class="hljs-comment">// Send to analytics</span>
      <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">hitRate</span> &lt; <span class="hljs-number">0.5</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Low speculation hit rate - consider adjusting strategy&#x27;</span>);
      }
    }
  }, [location]);

  <span class="hljs-keyword">return</span> monitorRef.<span class="hljs-property">current</span>;
};
</code></pre>
<h2 id="أنماط-تخمين-متقدمة">أنماط تخمين متقدمة</h2>
<h3 id="التخمين-بناء-على-إطار-العرض">التخمين بناءً على إطار العرض</h3>
<p>خمّن الروابط الظاهرة في إطار العرض:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useViewportSpeculation</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [visibleLinks, setVisibleLinks] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> visible = entries
          .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> e.<span class="hljs-property">isIntersecting</span>)
          .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> (e.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLAnchorElement</span>).<span class="hljs-property">href</span>)
          .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">href</span>) =&gt;</span> href.<span class="hljs-title function_">startsWith</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">origin</span>));

        <span class="hljs-title function_">setVisibleLinks</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>([...prev, ...visible])]);
      },
      { <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;50px&#x27;</span> },
    );

    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;a[href]&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">link</span>) =&gt;</span> {
      observer.<span class="hljs-title function_">observe</span>(link);
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (visibleLinks.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
    script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
    script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">prefetch</span>: [
        {
          <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
          <span class="hljs-attr">urls</span>: visibleLinks.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>), <span class="hljs-comment">// Limit to 10</span>
          <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;conservative&#x27;</span>,
        },
      ],
    });

    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> script.<span class="hljs-title function_">remove</span>();
  }, [visibleLinks]);
};
</code></pre>
<h3 id="التخمين-الزمني">التخمين الزمني</h3>
<p>زد حِدّة التخمين بمرور الوقت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useProgressiveSpeculation</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [timeOnPage, setTimeOnPage] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> location = <span class="hljs-title function_">useLocation</span>();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> startTime = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setTimeOnPage</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - startTime);
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, [location]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">let</span> <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;conservative&#x27;</span> | <span class="hljs-string">&#x27;moderate&#x27;</span> | <span class="hljs-string">&#x27;eager&#x27;</span>;

    <span class="hljs-keyword">if</span> (timeOnPage &lt; <span class="hljs-number">3000</span>) {
      eagerness = <span class="hljs-string">&#x27;conservative&#x27;</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (timeOnPage &lt; <span class="hljs-number">10000</span>) {
      eagerness = <span class="hljs-string">&#x27;moderate&#x27;</span>;
    } <span class="hljs-keyword">else</span> {
      eagerness = <span class="hljs-string">&#x27;eager&#x27;</span>;
    }

    <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
    script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
    script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">prefetch</span>: [
        {
          <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;document&#x27;</span>,
          <span class="hljs-attr">where</span>: { <span class="hljs-attr">href_matches</span>: <span class="hljs-string">&#x27;/*&#x27;</span> },
          eagerness,
        },
      ],
    });

    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> script.<span class="hljs-title function_">remove</span>();
  }, [timeOnPage]);
};
</code></pre>
<h2 id="التكامل-مع-react-router">التكامل مع React Router</h2>
<p>ادمج التخمين مع React Router:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">SpeculativeRouter</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [routes, setRoutes] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Extract all routes from React Router</span>
    <span class="hljs-keyword">const</span> extractRoutes = (<span class="hljs-attr">element</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span>): <span class="hljs-built_in">string</span>[] =&gt; {
      <span class="hljs-keyword">const</span> <span class="hljs-attr">paths</span>: <span class="hljs-built_in">string</span>[] = [];

      <span class="hljs-title class_">React</span>.<span class="hljs-property">Children</span>.<span class="hljs-title function_">forEach</span>(element.<span class="hljs-property">props</span>.<span class="hljs-property">children</span>, <span class="hljs-function">(<span class="hljs-params">child</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-title class_">React</span>.<span class="hljs-title function_">isValidElement</span>(child) &amp;&amp; child.<span class="hljs-property">props</span>.<span class="hljs-property">path</span>) {
          paths.<span class="hljs-title function_">push</span>(child.<span class="hljs-property">props</span>.<span class="hljs-property">path</span>);
        }
      });

      <span class="hljs-keyword">return</span> paths;
    };

    <span class="hljs-comment">// Add speculation rules for all routes</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) {
      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
      script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
        <span class="hljs-attr">prefetch</span>: [{
          <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
          <span class="hljs-attr">urls</span>: routes,
          <span class="hljs-attr">eagerness</span>: <span class="hljs-string">&#x27;moderate&#x27;</span>
        }]
      });
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);
    }
  }, [routes]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children}<span class="hljs-tag">&lt;/&gt;</span></span>;
};
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>فعّل bfcache:</strong></p>
<ul>
<li>استخدم pagehide/pageshow بدلًا من unload</li>
<li>أغلق الاتصالات قبل التخزين المؤقت</li>
<li>أوقف المؤقتات والفترات</li>
<li>امسح البيانات الحساسة</li>
</ul>
<p>✅ <strong>نفّذ تخمينًا ذكيًا:</strong></p>
<ul>
<li>ابدأ محافظًا ثم زد الحِدّة</li>
<li>استند إلى أنماط سلوك المستخدم</li>
<li>راعِ قدرات الجهاز</li>
<li>راقب معدلات الإصابة</li>
</ul>
<p>✅ <strong>اختبر بدقّة:</strong></p>
<ul>
<li>تحقق من أهلية bfcache</li>
<li>راقب نجاح التخمين</li>
<li>اختبر على أجهزة حقيقية</li>
<li>قس الأثر الفعلي</li>
</ul>
<p>✅ <strong>تعامل مع الحالات الطرفية:</strong></p>
<ul>
<li>أعد الاتصال بـ WebSockets عند الاستعادة</li>
<li>حدّث البيانات القديمة</li>
<li>حدّث الطوابع الزمنية</li>
<li>نظّف التخمين القديم</li>
</ul>
<p>✅ <strong>احترم الموارد:</strong></p>
<ul>
<li>حدّد عدد التصييرات المسبقة المتزامنة</li>
<li>راعِ وضع موفّر البيانات</li>
<li>تكيّف مع ظروف الشبكة</li>
<li>نظّف التخمين غير المستخدم</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
