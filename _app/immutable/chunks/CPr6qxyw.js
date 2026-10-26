const s="kinney",a="react-typescript",n="React مع TypeScript",l="concurrent-features-typing-patterns",t="أنماط تحديد الأنواع للخصائص التزامنية",p=[{depth:2,id:"فهم-التصيير-التزامني",text:"فهم التصيير التزامني"},{depth:3,id:"النموذج-الذهني-التزامني",text:"النموذج الذهني التزامني"},{depth:2,id:"usetransition-انتقالات-آمنة-الأنواع",text:"useTransition: انتقالات آمنة الأنواع"},{depth:3,id:"أنماط-الانتقال-الأساسية",text:"أنماط الانتقال الأساسية"},{depth:3,id:"أنماط-انتقال-متقدمة",text:"أنماط انتقال متقدّمة"},{depth:3,id:"انتقالات-منسقة",text:"انتقالات منسّقة"},{depth:2,id:"usedeferredvalue-التحديثات-المؤجلة-مع-الأنواع",text:"useDeferredValue: التحديثات المؤجَّلة مع الأنواع"},{depth:3,id:"القيم-المؤجلة-الأساسية",text:"القيم المؤجَّلة الأساسية"},{depth:3,id:"أنماط-تأجيل-متقدمة",text:"أنماط تأجيل متقدّمة"},{depth:3,id:"جمع-القيم-المؤجلة-مع-suspense",text:"جمع القيم المؤجَّلة مع Suspense"},{depth:2,id:"أنماط-التصيير-التزامني",text:"أنماط التصيير التزامني"},{depth:3,id:"نمط-تقطيع-الوقت",text:"نمط تقطيع الوقت"},{depth:3,id:"الفرز-القابل-للمقاطعة",text:"الفرز القابل للمقاطعة"},{depth:3,id:"التحسين-التدريجي-مع-الخصائص-التزامنية",text:"التحسين التدريجي مع الخصائص التزامنية"},{depth:2,id:"قوائم-suspense-وحدود-suspense-التزامنية",text:"قوائم Suspense وحدود Suspense التزامنيّة"},{depth:3,id:"أنماط-suspenselist",text:"أنماط SuspenseList"},{depth:3,id:"الحدود-التزامنية-المتداخلة",text:"الحدود التزامنية المتداخلة"},{depth:2,id:"إدارة-الأنشطة-والأولويات",text:"إدارة الأنشطة والأولويات"},{depth:3,id:"مدير-الأنشطة",text:"مدير الأنشطة"},{depth:2,id:"رصد-الأداء-للخصائص-التزامنية",text:"رصد الأداء للخصائص التزامنية"},{depth:3,id:"المقاييس-التزامنية",text:"المقاييس التزامنية"},{depth:2,id:"أفضل-الممارسات-والأنماط",text:"أفضل الممارسات والأنماط"},{depth:3,id:"ما-تفعله-وما-تتجنبه",text:"ما تفعله وما تتجنّبه"},{depth:3,id:"اختبار-الخصائص-التزامنية",text:"اختبار الخصائص التزامنية"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>تُشبه الخصائص التزامنية (concurrent features) في React وجود مراقب تدفّق لتحديثات واجهتك. فبدلًا من أن يسدّ كل تحديث ما سواه، يستطيع React الآن مقاطعة العمل وترتيب أولوياته وتأجيله لإبقاء تطبيقك متجاوبًا. لكنّ القوة العظيمة تجلب التعقيد العظيم—وهنا يصبح TypeScript شبكة أمانك. لنستكشف كيف نستفيد من التصيير التزامني (concurrent rendering) وتنظيم الانتقالات والقيم المؤجَّلة بأمانٍ كامل في الأنواع.</p>
<p>فكّر في الخصائص التزامنية على أنها تمنح React قدرةً على تعدّد المهام. تمامًا كما قد تتوقّف عن كتابة بريد إلكتروني لتجيب عن اتصال عاجل، يستطيع React أن يوقف تصيير قائمة كبيرة ليعالج نقرة زرٍّ من المستخدم. ويحرص TypeScript على صحّة استخدامك لهذه الخصائص القوية.</p>
<h2 id="فهم-التصيير-التزامني">فهم التصيير التزامني</h2>
<p>قبل الغوص في الشيفرة، لنفهم ماذا يعني التصيير التزامني فعلًا، ولماذا يهمّ مطوّري TypeScript.</p>
<h3 id="النموذج-الذهني-التزامني">النموذج الذهني التزامني</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Traditional rendering: All or nothing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TraditionalComponent</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-comment">// This blocks the main thread until all 10,000 items render</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {items.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{item}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Concurrent rendering: Interruptible and prioritized</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConcurrentComponent</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">const</span> [filter, setFilter] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// High priority: User input</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleFilterChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">const</span> value = e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>;
    <span class="hljs-title function_">setFilter</span>(value); <span class="hljs-comment">// Updates immediately</span>

    <span class="hljs-comment">// Low priority: Filtering results</span>
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// This can be interrupted if user types again</span>
      <span class="hljs-title function_">updateFilteredItems</span>(value);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{filter}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleFilterChange}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Filter items...&quot;</span> /&gt;</span>
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Updating list...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">ItemList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{filteredItems}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="usetransition-انتقالات-آمنة-الأنواع"><code>useTransition</code>: انتقالات آمنة الأنواع</h2>
<p>يتيح لك الخُطّاف (hook) <code>useTransition</code> وسمَ تحديثاتك بأنها غير عاجلة. ويساعدك TypeScript على ضمان صحّة استخدامك له.</p>
<h3 id="أنماط-الانتقال-الأساسية">أنماط الانتقال الأساسية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useTransition, useState, <span class="hljs-title class_">TransitionStartFunction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Type-safe transition wrapper</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TransitionState</span> {
  <span class="hljs-attr">isPending</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">startTransition</span>: <span class="hljs-title class_">TransitionStartFunction</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useTypedTransition</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">TransitionState</span> {
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">return</span> { isPending, startTransition };
}

<span class="hljs-comment">// Complex state transitions</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppState</span> {
  <span class="hljs-attr">view</span>: <span class="hljs-string">&#x27;list&#x27;</span> | <span class="hljs-string">&#x27;grid&#x27;</span> | <span class="hljs-string">&#x27;chart&#x27;</span>;
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">DataItem</span>[];
  <span class="hljs-attr">filter</span>: <span class="hljs-title class_">FilterOptions</span>;
  <span class="hljs-attr">sort</span>: <span class="hljs-title class_">SortOptions</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataExplorer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">AppState</span>&gt;({
    <span class="hljs-attr">view</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
    <span class="hljs-attr">data</span>: [],
    <span class="hljs-attr">filter</span>: defaultFilter,
    <span class="hljs-attr">sort</span>: defaultSort,
  });

  <span class="hljs-keyword">const</span> { isPending, startTransition } = <span class="hljs-title function_">useTypedTransition</span>();

  <span class="hljs-comment">// Immediate update for view toggle</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">changeView</span> = (<span class="hljs-params"><span class="hljs-attr">view</span>: <span class="hljs-title class_">AppState</span>[<span class="hljs-string">&#x27;view&#x27;</span>]</span>) =&gt; {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, view }));
  };

  <span class="hljs-comment">// Deferred update for expensive operations</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">applyFilter</span> = (<span class="hljs-params"><span class="hljs-attr">filter</span>: <span class="hljs-title class_">FilterOptions</span></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
        ...prev,
        filter,
        <span class="hljs-attr">data</span>: <span class="hljs-title function_">filterData</span>(prev.<span class="hljs-property">data</span>, filter),
      }));
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{isPending</span> ? &#x27;<span class="hljs-attr">updating</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ViewToggle</span> <span class="hljs-attr">current</span>=<span class="hljs-string">{state.view}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{changeView}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">FilterPanel</span> <span class="hljs-attr">onApply</span>=<span class="hljs-string">{applyFilter}</span> /&gt;</span>
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">LoadingOverlay</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">DataView</span> <span class="hljs-attr">view</span>=<span class="hljs-string">{state.view}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{state.data}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="أنماط-انتقال-متقدمة">أنماط انتقال متقدّمة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Transition with error handling</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TransitionWithError</span>&lt;T&gt; {
  <span class="hljs-attr">isPending</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">startTransition</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">callback</span>: () =&gt; <span class="hljs-title class_">Promise</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T | <span class="hljs-literal">undefined</span>&gt;;
}

<span class="hljs-keyword">function</span> useTransitionWithError&lt;T&gt;(): <span class="hljs-title class_">TransitionWithError</span>&lt;T&gt; {
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> safeStartTransition = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">callback</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;T | <span class="hljs-literal">undefined</span>&gt; =&gt; {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-title function_">startTransition</span>(<span class="hljs-title function_">async</span> () =&gt; {
          <span class="hljs-keyword">try</span> {
            <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);
            <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">callback</span>();
            <span class="hljs-title function_">resolve</span>(result);
          } <span class="hljs-keyword">catch</span> (err) {
            <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>);
            <span class="hljs-title function_">resolve</span>(<span class="hljs-literal">undefined</span>);
          }
        });
      });
    },
    [startTransition],
  );

  <span class="hljs-keyword">return</span> { isPending, error, <span class="hljs-attr">startTransition</span>: safeStartTransition };
}

<span class="hljs-comment">// Usage with async operations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchableList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">SearchResult</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> { isPending, error, startTransition } = useTransitionWithError&lt;<span class="hljs-title class_">SearchResult</span>[]&gt;();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">startTransition</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">searchAPI</span>(query);
      <span class="hljs-keyword">return</span> response.<span class="hljs-property">results</span>;
    });

    <span class="hljs-keyword">if</span> (data) {
      <span class="hljs-title function_">setResults</span>(data);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchInput</span> <span class="hljs-attr">onSearch</span>=<span class="hljs-string">{handleSearch}</span> /&gt;</span>
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span> /&gt;</span>}
      {isPending ? <span class="hljs-tag">&lt;<span class="hljs-name">SearchingSkeleton</span> /&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">ResultsList</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="انتقالات-منسقة">انتقالات منسّقة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Multiple transitions with priority</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PriorityTransition</span> {
  <span class="hljs-attr">high</span>: <span class="hljs-title class_">TransitionStartFunction</span>;
  <span class="hljs-attr">medium</span>: <span class="hljs-title class_">TransitionStartFunction</span>;
  <span class="hljs-attr">low</span>: <span class="hljs-title class_">TransitionStartFunction</span>;
  <span class="hljs-attr">isPending</span>: {
    <span class="hljs-attr">high</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">medium</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">low</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">any</span>: <span class="hljs-built_in">boolean</span>;
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePriorityTransitions</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">PriorityTransition</span> {
  <span class="hljs-keyword">const</span> [isHighPending, startHighTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">const</span> [isMediumPending, startMediumTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">const</span> [isLowPending, startLowTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">high</span>: startHighTransition,
    <span class="hljs-attr">medium</span>: startMediumTransition,
    <span class="hljs-attr">low</span>: startLowTransition,
    <span class="hljs-attr">isPending</span>: {
      <span class="hljs-attr">high</span>: isHighPending,
      <span class="hljs-attr">medium</span>: isMediumPending,
      <span class="hljs-attr">low</span>: isLowPending,
      <span class="hljs-attr">any</span>: isHighPending || isMediumPending || isLowPending,
    },
  };
}

<span class="hljs-comment">// Dashboard with prioritized updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> transitions = <span class="hljs-title function_">usePriorityTransitions</span>();
  <span class="hljs-keyword">const</span> [dashboardData, setDashboardData] = useState&lt;<span class="hljs-title class_">DashboardData</span>&gt;();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// High priority: User info</span>
    transitions.<span class="hljs-title function_">high</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">fetchUserInfo</span>(userId).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">info</span>) =&gt;</span> {
        <span class="hljs-title function_">setDashboardData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">user</span>: info }));
      });
    });

    <span class="hljs-comment">// Medium priority: Recent activity</span>
    transitions.<span class="hljs-title function_">medium</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">fetchRecentActivity</span>(userId).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">activity</span>) =&gt;</span> {
        <span class="hljs-title function_">setDashboardData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, activity }));
      });
    });

    <span class="hljs-comment">// Low priority: Analytics</span>
    transitions.<span class="hljs-title function_">low</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">fetchAnalytics</span>(userId).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">analytics</span>) =&gt;</span> {
        <span class="hljs-title function_">setDashboardData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, analytics }));
      });
    });
  }, [userId]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {transitions.isPending.high &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user info...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {dashboardData?.user &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{dashboardData.user}</span> /&gt;</span>}

      {transitions.isPending.medium &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading activity...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {dashboardData?.activity &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ActivityFeed</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{dashboardData.activity}</span> /&gt;</span>}

      {transitions.isPending.low &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading analytics...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {dashboardData?.analytics &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">AnalyticsChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{dashboardData.analytics}</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="usedeferredvalue-التحديثات-المؤجلة-مع-الأنواع"><code>useDeferredValue</code>: التحديثات المؤجَّلة مع الأنواع</h2>
<p>يتيح لك <code>useDeferredValue</code> تأجيل تحديث جزءٍ من الواجهة. ويضمن TypeScript أنّ القيمة المؤجَّلة تطابق النوع الأصلي.</p>
<h3 id="القيم-المؤجلة-الأساسية">القيم المؤجَّلة الأساسية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useDeferredValue, useState, memo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SearchProps</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">Item</span>[];
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchableTable</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">SearchProps</span></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// Deferred value maintains the same type</span>
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-comment">// Query updates immediately, filtering is deferred</span>
  <span class="hljs-keyword">const</span> filteredData = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(deferredQuery.<span class="hljs-title function_">toLowerCase</span>())),
    [data, deferredQuery],
  );

  <span class="hljs-keyword">const</span> isStale = query !== deferredQuery;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} placeholder=&quot;Search...&quot; /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isStale</span> ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span> }}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Table</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{filteredData}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="أنماط-تأجيل-متقدمة">أنماط تأجيل متقدّمة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Deferred value with custom comparison</span>
<span class="hljs-keyword">function</span> useDeferredValueWithComparison&lt;T&gt;(<span class="hljs-attr">value</span>: T, <span class="hljs-attr">compare</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: T, <span class="hljs-attr">b</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>): T {
  <span class="hljs-keyword">const</span> deferred = <span class="hljs-title function_">useDeferredValue</span>(value);

  <span class="hljs-comment">// Custom comparison logic</span>
  <span class="hljs-keyword">const</span> isEqual = compare ? <span class="hljs-title function_">compare</span>(value, deferred) : value === deferred;

  <span class="hljs-keyword">return</span> isEqual ? value : deferred;
}

<span class="hljs-comment">// Complex object deferral</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FilterState</span> {
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">categories</span>: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">dateRange</span>: { <span class="hljs-attr">start</span>: <span class="hljs-title class_">Date</span>; <span class="hljs-attr">end</span>: <span class="hljs-title class_">Date</span> };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ComplexFilter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [filter, setFilter] = useState&lt;<span class="hljs-title class_">FilterState</span>&gt;({
    <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">categories</span>: [],
    <span class="hljs-attr">dateRange</span>: { <span class="hljs-attr">start</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(), <span class="hljs-attr">end</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() },
  });

  <span class="hljs-comment">// Defer the entire filter object</span>
  <span class="hljs-keyword">const</span> deferredFilter = <span class="hljs-title function_">useDeferredValue</span>(filter);

  <span class="hljs-comment">// Check if any part is stale</span>
  <span class="hljs-keyword">const</span> isStale = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(filter) !== <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(deferredFilter);
  }, [filter, deferredFilter]);

  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">useFilteredResults</span>(deferredFilter);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">FilterControls</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{filter}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setFilter}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ResultsDisplay</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> <span class="hljs-attr">isStale</span>=<span class="hljs-string">{isStale}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="جمع-القيم-المؤجلة-مع-suspense">جمع القيم المؤجَّلة مع <code>Suspense</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-safe deferred suspense pattern</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DeferredSuspenseProps</span>&lt;T&gt; {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T, <span class="hljs-attr">isStale</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">DeferredSuspense</span>&lt;T&gt;({
  value,
  children,
  fallback = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
}: <span class="hljs-title class_">DeferredSuspenseProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> deferredValue = <span class="hljs-title function_">useDeferredValue</span>(value);
  <span class="hljs-keyword">const</span> isStale = value !== deferredValue;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{fallback}</span>&gt;</span>{children(deferredValue, isStale)}<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>;
}

<span class="hljs-comment">// Usage with async data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AsyncDataView</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DeferredSuspense</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>&gt;</span>
      {(deferredQuery, isStale) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isStale</span> ? <span class="hljs-attr">0.6</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span> }}&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">AsyncResults</span> <span class="hljs-attr">query</span>=<span class="hljs-string">{deferredQuery}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">DeferredSuspense</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-التصيير-التزامني">أنماط التصيير التزامني</h2>
<p>لنستكشف أنماطًا تستفيد من التصيير التزامني لتجربة مستخدمٍ أفضل.</p>
<h3 id="نمط-تقطيع-الوقت">نمط تقطيع الوقت</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Break large renders into chunks</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TimeSlicedListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">chunkSize</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">delay</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">TimeSlicedList</span>&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;({
  items,
  renderItem,
  chunkSize = <span class="hljs-number">10</span>,
  delay = <span class="hljs-number">0</span>,
}: <span class="hljs-title class_">TimeSlicedListProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [renderedCount, setRenderedCount] = <span class="hljs-title function_">useState</span>(chunkSize);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (renderedCount &lt; items.<span class="hljs-property">length</span>) {
      <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
          <span class="hljs-title function_">setRenderedCount</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(prev + chunkSize, items.<span class="hljs-property">length</span>));
        }, delay);
      });
    }
  }, [renderedCount, items.<span class="hljs-property">length</span>, chunkSize, delay]);

  <span class="hljs-keyword">const</span> visibleItems = items.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, renderedCount);
  <span class="hljs-keyword">const</span> hasMore = renderedCount &lt; items.<span class="hljs-property">length</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {visibleItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{renderItem(item)}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
      {hasMore &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-more&quot;</span>&gt;</span>Loading {items.length - renderedCount} more items...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الفرز-القابل-للمقاطعة">الفرز القابل للمقاطعة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-safe interruptible sorting</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SortDirection</span> = <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SortField</span>&lt;T&gt; = keyof T;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SortConfig</span>&lt;T&gt; {
  <span class="hljs-attr">field</span>: <span class="hljs-title class_">SortField</span>&lt;T&gt;;
  <span class="hljs-attr">direction</span>: <span class="hljs-title class_">SortDirection</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InterruptibleSortResult</span>&lt;T&gt; {
  <span class="hljs-attr">sortedData</span>: T[];
  <span class="hljs-attr">issorting</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">sort</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">SortConfig</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">cancel</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> useInterruptibleSort&lt;T&gt;(
  <span class="hljs-attr">data</span>: T[],
  <span class="hljs-attr">initialConfig</span>?: <span class="hljs-title class_">SortConfig</span>&lt;T&gt;,
): <span class="hljs-title class_">InterruptibleSortResult</span>&lt;T&gt; {
  <span class="hljs-keyword">const</span> [sortedData, setSortedData] = <span class="hljs-title function_">useState</span>(data);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
  <span class="hljs-keyword">const</span> abortControllerRef = useRef&lt;<span class="hljs-title class_">AbortController</span>&gt;();

  <span class="hljs-keyword">const</span> sort = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">SortConfig</span>&lt;T&gt;</span>) =&gt;</span> {
      <span class="hljs-comment">// Cancel previous sort</span>
      abortControllerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">abort</span>();
      abortControllerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>();

      <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Simulate expensive sort that can be interrupted</span>
        <span class="hljs-keyword">const</span> sorted = [...data].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (abortControllerRef.<span class="hljs-property">current</span>?.<span class="hljs-property">signal</span>.<span class="hljs-property">aborted</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
          }

          <span class="hljs-keyword">const</span> aVal = a[config.<span class="hljs-property">field</span>];
          <span class="hljs-keyword">const</span> bVal = b[config.<span class="hljs-property">field</span>];

          <span class="hljs-keyword">if</span> (config.<span class="hljs-property">direction</span> === <span class="hljs-string">&#x27;asc&#x27;</span>) {
            <span class="hljs-keyword">return</span> aVal &gt; bVal ? <span class="hljs-number">1</span> : -<span class="hljs-number">1</span>;
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> aVal &lt; bVal ? <span class="hljs-number">1</span> : -<span class="hljs-number">1</span>;
          }
        });

        <span class="hljs-keyword">if</span> (!abortControllerRef.<span class="hljs-property">current</span>?.<span class="hljs-property">signal</span>.<span class="hljs-property">aborted</span>) {
          <span class="hljs-title function_">setSortedData</span>(sorted);
        }
      });
    },
    [data, startTransition],
  );

  <span class="hljs-keyword">const</span> cancel = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    abortControllerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">abort</span>();
  }, []);

  <span class="hljs-keyword">return</span> {
    sortedData,
    <span class="hljs-attr">isSorting</span>: isPending,
    sort,
    cancel,
  };
}
</code></pre>
<h3 id="التحسين-التدريجي-مع-الخصائص-التزامنية">التحسين التدريجي مع الخصائص التزامنية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Gradually enhance UI based on interaction</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProgressiveListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderBasic</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">renderEnhanced</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">ProgressiveList</span>&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;({
  items,
  renderBasic,
  renderEnhanced,
}: <span class="hljs-title class_">ProgressiveListProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [enhancedIds, setEnhancedIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">enhanceItem</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setEnhancedIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(id));
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {items.map((item) =&gt; {
        const isEnhanced = enhancedIds.has(item.id);

        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{()</span> =&gt;</span> !isEnhanced &amp;&amp; enhanceItem(item.id)}&gt;
            {isEnhanced ? renderEnhanced(item) : renderBasic(item)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="قوائم-suspense-وحدود-suspense-التزامنية">قوائم <code>Suspense</code> وحدود <code>Suspense</code> التزامنيّة</h2>
<p>أنماط TypeScript لتنسيق حدود <code>Suspense</code> المتعددة.</p>
<h3 id="أنماط-suspenselist">أنماط <code>SuspenseList</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SuspenseList</span>, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">RevealOrder</span> = <span class="hljs-string">&#x27;forwards&#x27;</span> | <span class="hljs-string">&#x27;backwards&#x27;</span> | <span class="hljs-string">&#x27;together&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SuspenseListConfig</span> {
  <span class="hljs-attr">revealOrder</span>: <span class="hljs-title class_">RevealOrder</span>;
  <span class="hljs-attr">tail</span>?: <span class="hljs-string">&#x27;collapsed&#x27;</span> | <span class="hljs-string">&#x27;hidden&#x27;</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TypedSuspenseListProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">config</span>: <span class="hljs-title class_">SuspenseListConfig</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TypedSuspenseList</span>(<span class="hljs-params">{ children, config }: <span class="hljs-title class_">TypedSuspenseListProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SuspenseList</span> <span class="hljs-attr">revealOrder</span>=<span class="hljs-string">{config.revealOrder}</span> <span class="hljs-attr">tail</span>=<span class="hljs-string">{config.tail}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">SuspenseList</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Orchestrated loading sequence</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfilePage</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TypedSuspenseList</span>
      <span class="hljs-attr">config</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">revealOrder:</span> &#x27;<span class="hljs-attr">forwards</span>&#x27;,
        <span class="hljs-attr">tail:</span> &#x27;<span class="hljs-attr">collapsed</span>&#x27;,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">HeaderSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ProfileHeader</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">{userId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">BioSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ProfileBio</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">{userId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">PostsSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ProfilePosts</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">{userId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TypedSuspenseList</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الحدود-التزامنية-المتداخلة">الحدود التزامنية المتداخلة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-safe nested suspense configuration</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SuspenseNode</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;;
  <span class="hljs-attr">props</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
  <span class="hljs-attr">fallback</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">SuspenseNode</span>[];
  <span class="hljs-attr">priority</span>?: <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">renderSuspenseTree</span>(<span class="hljs-params"><span class="hljs-attr">node</span>: <span class="hljs-title class_">SuspenseNode</span></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span> = node.<span class="hljs-property">component</span>;

  <span class="hljs-keyword">const</span> content = (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...</span>(<span class="hljs-attr">node.props</span> || {})} /&gt;</span>
      {node.children?.map((child) =&gt; renderSuspenseTree(child))}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );

  <span class="hljs-keyword">if</span> (node.<span class="hljs-property">priority</span> === <span class="hljs-string">&#x27;high&#x27;</span>) {
    <span class="hljs-comment">// High priority: No suspense boundary</span>
    <span class="hljs-keyword">return</span> content;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{node.id}</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{node.fallback}</span>&gt;</span>
      {content}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">pageStructure</span>: <span class="hljs-title class_">SuspenseNode</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Layout</span>,
  <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LayoutSkeleton</span> /&gt;</span></span>,
  <span class="hljs-attr">children</span>: [
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;header&#x27;</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-title class_">Header</span>,
      <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">HeaderSkeleton</span> /&gt;</span></span>,
      <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span>,
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;content&#x27;</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-title class_">Content</span>,
      <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ContentSkeleton</span> /&gt;</span></span>,
      <span class="hljs-attr">children</span>: [
        {
          <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;sidebar&#x27;</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-title class_">Sidebar</span>,
          <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SidebarSkeleton</span> /&gt;</span></span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;low&#x27;</span>,
        },
        {
          <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;main&#x27;</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-title class_">MainContent</span>,
          <span class="hljs-attr">fallback</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MainSkeleton</span> /&gt;</span></span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
        },
      ],
    },
  ],
};
</code></pre>
<h2 id="إدارة-الأنشطة-والأولويات">إدارة الأنشطة والأولويات</h2>
<p>إدارة أولويات الواجهة بواسطة TypeScript لتصييرٍ تزامنيّ مثالي.</p>
<h3 id="مدير-الأنشطة">مدير الأنشطة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Track and prioritize UI activities</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Activity</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;user-input&#x27;</span> | <span class="hljs-string">&#x27;data-fetch&#x27;</span> | <span class="hljs-string">&#x27;animation&#x27;</span> | <span class="hljs-string">&#x27;background&#x27;</span>;
  <span class="hljs-attr">priority</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// 0-100, higher is more important</span>
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ActivityManager</span> {
  <span class="hljs-keyword">private</span> activities = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Activity</span>&gt;();
  <span class="hljs-keyword">private</span> listeners = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">activities</span>: <span class="hljs-title class_">Activity</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>&gt;();

  <span class="hljs-title function_">register</span>(<span class="hljs-attr">activity</span>: <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">Activity</span>, <span class="hljs-string">&#x27;timestamp&#x27;</span>&gt;): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">activities</span>.<span class="hljs-title function_">set</span>(activity.<span class="hljs-property">id</span>, {
      ...activity,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    });
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">notifyListeners</span>();
  }

  <span class="hljs-title function_">unregister</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">activities</span>.<span class="hljs-title function_">delete</span>(id);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">notifyListeners</span>();
  }

  <span class="hljs-title function_">getHighestPriority</span>(): <span class="hljs-title class_">Activity</span> | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">activities</span>.<span class="hljs-title function_">values</span>()).<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">priority</span> - a.<span class="hljs-property">priority</span>)[<span class="hljs-number">0</span>];
  }

  <span class="hljs-title function_">subscribe</span>(<span class="hljs-attr">listener</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">activities</span>: <span class="hljs-title class_">Activity</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>.<span class="hljs-title function_">add</span>(listener);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>.<span class="hljs-title function_">delete</span>(listener);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">notifyListeners</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> activities = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">activities</span>.<span class="hljs-title function_">values</span>());
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">listener</span>) =&gt;</span> <span class="hljs-title function_">listener</span>(activities));
  }
}

<span class="hljs-comment">// Hook for activity-aware rendering</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useActivityPriority</span>(<span class="hljs-params"><span class="hljs-attr">activityType</span>: <span class="hljs-title class_">Activity</span>[<span class="hljs-string">&#x27;type&#x27;</span>]</span>): {
  <span class="hljs-attr">isPriority</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">startActivity</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">endActivity</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
} {
  <span class="hljs-keyword">const</span> [isPriority, setIsPriority] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> manager = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ActivityManager</span>(), []);
  <span class="hljs-keyword">const</span> activityId = <span class="hljs-title function_">useId</span>();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> manager.<span class="hljs-title function_">subscribe</span>(<span class="hljs-function">(<span class="hljs-params">activities</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> highest = activities[<span class="hljs-number">0</span>];
      <span class="hljs-title function_">setIsPriority</span>(highest?.<span class="hljs-property">id</span> === activityId);
    });
  }, [manager, activityId]);

  <span class="hljs-keyword">const</span> startActivity = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    manager.<span class="hljs-title function_">register</span>({
      <span class="hljs-attr">id</span>: activityId,
      <span class="hljs-attr">type</span>: activityType,
      <span class="hljs-attr">priority</span>: <span class="hljs-title function_">getPriorityForType</span>(activityType),
    });
  }, [manager, activityId, activityType]);

  <span class="hljs-keyword">const</span> endActivity = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    manager.<span class="hljs-title function_">unregister</span>(activityId);
  }, [manager, activityId]);

  <span class="hljs-keyword">return</span> { isPriority, startActivity, endActivity };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getPriorityForType</span>(<span class="hljs-params"><span class="hljs-attr">type</span>: <span class="hljs-title class_">Activity</span>[<span class="hljs-string">&#x27;type&#x27;</span>]</span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;user-input&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">100</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;animation&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">75</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;data-fetch&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">50</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;background&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">25</span>;
  }
}
</code></pre>
<h2 id="رصد-الأداء-للخصائص-التزامنية">رصد الأداء للخصائص التزامنية</h2>
<p>تتبّع أثر الخصائص التزامنية بواسطة TypeScript.</p>
<h3 id="المقاييس-التزامنية">المقاييس التزامنية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ConcurrentMetrics</span> {
  <span class="hljs-attr">transitionCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">deferredUpdateCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">interruptionCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">averageTransitionTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">priorities</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ConcurrentMetricsCollector</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">ConcurrentMetrics</span> = {
    <span class="hljs-attr">transitionCount</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">deferredUpdateCount</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">interruptionCount</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">averageTransitionTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">priorities</span>: {},
  };

  <span class="hljs-keyword">private</span> <span class="hljs-attr">transitionTimes</span>: <span class="hljs-built_in">number</span>[] = [];

  <span class="hljs-title function_">recordTransition</span>(<span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">wasInterrupted</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">transitionCount</span>++;
    <span class="hljs-keyword">if</span> (wasInterrupted) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">interruptionCount</span>++;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">transitionTimes</span>.<span class="hljs-title function_">push</span>(duration);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">averageTransitionTime</span> =
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">transitionTimes</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / <span class="hljs-variable language_">this</span>.<span class="hljs-property">transitionTimes</span>.<span class="hljs-property">length</span>;
  }

  <span class="hljs-title function_">recordDeferredUpdate</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">deferredUpdateCount</span>++;
  }

  <span class="hljs-title function_">recordPriority</span>(<span class="hljs-attr">priority</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">priorities</span>[priority] = (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">priorities</span>[priority] || <span class="hljs-number">0</span>) + <span class="hljs-number">1</span>;
  }

  <span class="hljs-title function_">getMetrics</span>(): <span class="hljs-title class_">ConcurrentMetrics</span> {
    <span class="hljs-keyword">return</span> { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> };
  }

  <span class="hljs-title function_">reset</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> = {
      <span class="hljs-attr">transitionCount</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">deferredUpdateCount</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">interruptionCount</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">averageTransitionTime</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">priorities</span>: {},
    };
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">transitionTimes</span> = [];
  }
}

<span class="hljs-comment">// Hook for monitoring concurrent features</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useConcurrentMetrics</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> collector = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ConcurrentMetricsCollector</span>(), []);
  <span class="hljs-keyword">const</span> [metrics, setMetrics] = <span class="hljs-title function_">useState</span>(collector.<span class="hljs-title function_">getMetrics</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setMetrics</span>(collector.<span class="hljs-title function_">getMetrics</span>());
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, [collector]);

  <span class="hljs-keyword">const</span> trackTransition = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">fn</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();
      <span class="hljs-keyword">let</span> wasInterrupted = <span class="hljs-literal">false</span>;

      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">fn</span>();
      } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-keyword">if</span> (e === <span class="hljs-string">&#x27;Interrupted&#x27;</span>) {
          wasInterrupted = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">throw</span> e;
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - start;
        collector.<span class="hljs-title function_">recordTransition</span>(duration, wasInterrupted);
      }
    },
    [collector],
  );

  <span class="hljs-keyword">return</span> { metrics, trackTransition };
}
</code></pre>
<h2 id="أفضل-الممارسات-والأنماط">أفضل الممارسات والأنماط</h2>
<h3 id="ما-تفعله-وما-تتجنبه">ما تفعله وما تتجنّبه</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ DO: Use transitions for non-urgent updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodPattern</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">Result</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(value); <span class="hljs-comment">// Urgent: Update input immediately</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Non-urgent: Update results can be interrupted</span>
      <span class="hljs-keyword">const</span> filtered = <span class="hljs-title function_">performExpensiveSearch</span>(value);
      <span class="hljs-title function_">setResults</span>(filtered);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleSearch(e.target.value)} /&gt;
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">ResultsList</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}

<span class="hljs-comment">// ❌ DON&#x27;T: Use transitions for urgent updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadPattern</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Don&#x27;t defer user feedback!</span>
      <span class="hljs-title function_">alert</span>(<span class="hljs-string">&#x27;Button clicked!&#x27;</span>);
    });
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ DO: Combine multiple concurrent features</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CombinedPattern</span>(<span class="hljs-params">{ data }: { data: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [filter, setFilter] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> deferredFilter = <span class="hljs-title function_">useDeferredValue</span>(filter);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> filteredData = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(deferredFilter)),
    [data, deferredFilter],
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSort</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Expensive sort operation</span>
      <span class="hljs-title function_">sortData</span>(filteredData);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{filter}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setFilter(e.target.value)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSort}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>&gt;</span>
        Sort
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataTable</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{filteredData}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="اختبار-الخصائص-التزامنية">اختبار الخصائص التزامنية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Test utilities for concurrent features</span>
<span class="hljs-keyword">import</span> { act, renderHook } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">waitForTransition</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">act</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">0</span>));
  });
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Concurrent Features&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should defer updates with useTransition&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> { result } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();
      <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

      <span class="hljs-keyword">return</span> {
        isPending,
        value,
        <span class="hljs-attr">update</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setValue</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-number">1</span>)),
      };
    });

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">current</span>.<span class="hljs-property">isPending</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);

    <span class="hljs-title function_">act</span>(<span class="hljs-function">() =&gt;</span> {
      result.<span class="hljs-property">current</span>.<span class="hljs-title function_">update</span>();
    });

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">current</span>.<span class="hljs-property">isPending</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitForTransition</span>();

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">current</span>.<span class="hljs-property">isPending</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">current</span>.<span class="hljs-property">value</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">1</span>);
  });
});
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تمنحك الخصائص التزامنية في React 19 مع TypeScript تحكّمًا دقيقًا في أولويات التصيير وفي تجربة المستخدم. وبفهمك الانتقالات، والقيم المؤجَّلة، والأنماط التزامنية، تستطيع بناء تطبيقات تبقى متجاوبة حتى تحت ضغطٍ ثقيل.</p>
<p>تذكّر: ليست الخصائص التزامنية غايتها جعل الأشياء أسرع—إنّما جعلها تبدو أسرع، بإعطاء الأولوية لما يهمّ المستخدمين أكثر. استخدم TypeScript ليتأكّد أنّك تطبّق هذه الخصائص القوية على نحوٍ صحيح، وسيدرك مستخدموك الفرق في كل تفاعل.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
