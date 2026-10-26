const s="kinney",n="react-performance",a="أداء React",l="concurrent-react-scheduling",t="جدولة React المتزامنة (Concurrent Scheduling)",p=[{depth:2,id:"كيف-يعمل-مجدول-react",text:"كيف يعمل مُجدوِل React"},{depth:2,id:"فهم-الانتقالات-transitions",text:"فهم الانتقالات (Transitions)"},{depth:2,id:"القيم-المؤجلة-للحسابات-المكلفة",text:"القيم المؤجَّلة للحسابات المكلفة"},{depth:2,id:"تجنب-مزالق-الجدولة-الشائعة",text:"تجنّب مزالق الجدولة الشائعة"},{depth:3,id:"لا-تغلف-كل-شيء-بالانتقالات",text:"لا تُغلّف كل شيء بالانتقالات"},{depth:3,id:"انتبه-لحدود-الانتقال",text:"انتبه لحدود الانتقال"},{depth:2,id:"أنماط-جدولة-واقعية",text:"أنماط جدولة واقعية"},{depth:3,id:"نمط-التحسين-التدريجي",text:"نمط التحسين التدريجي"},{depth:3,id:"التحديثات-التفاؤلية-مع-بديل-مؤقت",text:"التحديثات التفاؤلية مع بديل مؤقّت"},{depth:2,id:"التعامل-مع-المكتبات-الخارجية",text:"التعامل مع المكتبات الخارجية"},{depth:2,id:"مراقبة-الأداء-والتنقيح",text:"مراقبة الأداء والتنقيح"},{depth:2,id:"متى-لا-تستخدم-الميزات-المتزامنة",text:"متى لا تستخدم الميزات المتزامنة"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>قدّم React 18 ميزات متزامنة تغيّر جذريًا طريقة معالجة React للتحديثات. فبدلًا من حجب الخيط الرئيسي حتى يُصيّر كل مكوّن، يستطيع React الآن إيقاف العمل مؤقتًا واستئنافه — فيبقى تطبيقك مستجيبًا حتى أثناء العمليات المكلفة. والأمر لا يتعلق فقط بجعل الأمور أسرع؛ بل بجعل <em>الأمور الصحيحة</em> سريعة وبضمان ألا تبدو تفاعلات المستخدم بطيئة أبدًا.</p>
<p>يساعدك فهم مُجدوِل React (scheduler) على كتابة مكوّنات تتعاون مع النظام بدل مصارعته. وستتعلّم التمييز بين العمل العاجل وغير العاجل، والاستفادة من ترتيب الأولويات المدمج، وتصميم واجهات تبدو سلسة مهما كان التعقيد الجاري تحتها.</p>
<h2 id="كيف-يعمل-مجدول-react">كيف يعمل مُجدوِل React</h2>
<p>قبل الميزات المتزامنة، كان تصيير React أشبه بطريق بمسار واحد — فبمجرد أن يبدأ React التصيير، لا يستطيع التوقّف حتى تكتمل شجرة المكوّنات بأكملها. وإن كان لديك مكوّن ثقيل يستغرق تصييره 200 مللي ثانية، تجمّدت واجهتك بأكملها طوال هذه المدة.</p>
<p>يقدّم مُجدوِل React المتزامن <strong>تقسيم الزمن</strong> (time-slicing) و<strong>الجدولة القائمة على الأولوية</strong>. تخيّل الأمر كترقية من طريق بمسار واحد إلى نظام مرور ذكي متعدد المسارات، له قواعد أولوية، وقدرة على إيقاف حركة الأولوية الأدنى عند حاجة مركبات الطوارئ إلى المرور.</p>
<p>وإليك الرؤية الجوهرية: ليست كل التحديثات سواء. فالمستخدم الذي ينقر زرًّا يتوقّع استجابة فورية، بينما يمكن أن ينتظر تحديث تصوّر بياني بضع مللي ثانية. ويستخدم المُجدوِل هذا التراتب من الأولويات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// From React&#x27;s internal priority levels (simplified)</span>
<span class="hljs-keyword">enum</span> <span class="hljs-title class_">Priority</span> {
  <span class="hljs-title class_">ImmediatePriority</span> = <span class="hljs-number">1</span>, <span class="hljs-comment">// User input, focus events</span>
  <span class="hljs-title class_">UserBlockingPriority</span> = <span class="hljs-number">2</span>, <span class="hljs-comment">// Click handlers, form inputs</span>
  <span class="hljs-title class_">NormalPriority</span> = <span class="hljs-number">3</span>, <span class="hljs-comment">// Data fetching, network requests</span>
  <span class="hljs-title class_">LowPriority</span> = <span class="hljs-number">4</span>, <span class="hljs-comment">// Analytics, logging</span>
  <span class="hljs-title class_">IdlePriority</span> = <span class="hljs-number">5</span>, <span class="hljs-comment">// Background cleanup tasks</span>
}
</code></pre>
<p>يستطيع المُجدوِل مقاطعة العمل ذي الأولوية الأدنى عند وصول عمل ذي أولوية أعلى، فيبقى تطبيقك مستجيبًا لتفاعلات المستخدم.</p>
<h2 id="فهم-الانتقالات-transitions">فهم الانتقالات (Transitions)</h2>
<p>الطريقة العملية الأكثر نفعًا للاستفادة من مُجدوِل React هي <strong>الانتقالات</strong>. فالانتقال يعلّم تحديثًا بأنه غير عاجل، ما يتيح لـ React مقاطعته لأجل عمل أهم.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useTransition, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">searchQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(searchQuery); <span class="hljs-comment">// Urgent: update input immediately</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Non-urgent: expensive filtering can be interrupted</span>
      <span class="hljs-keyword">const</span> filtered = <span class="hljs-title function_">expensiveSearch</span>(searchQuery);
      <span class="hljs-title function_">setResults</span>(filtered);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{e</span> =&gt;</span> handleSearch(e.target.value)}
        placeholder=&quot;Search...&quot;
      /&gt;
      {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Searching...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">ResultsList</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يبقي هذا النمط حقل الإدخال مستجيبًا — فيرى المستخدمون ما يكتبونه فورًا — بينما تجري عملية البحث المكلفة في الخلفية، ويمكن مقاطعتها إن واصلوا الكتابة.</p>
<h2 id="القيم-المؤجلة-للحسابات-المكلفة">القيم المؤجَّلة للحسابات المكلفة</h2>
<p>أحيانًا لا تتحكّم في تحديث الحالة (فلعله يأتي من مكوّن أب)، لكنك ما زلت تريد تأجيل العمل المكلف. يتيح لك <code>useDeferredValue</code> إنشاء نسخة «متأخّرة» من قيمة تتخلّف عن الركب أثناء التحديثات السريعة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useDeferredValue, useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveChart</span>(<span class="hljs-params">{ data }: { data: <span class="hljs-built_in">number</span>[] }</span>) {
  <span class="hljs-keyword">const</span> deferredData = <span class="hljs-title function_">useDeferredValue</span>(data);

  <span class="hljs-keyword">const</span> chartElements = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This expensive computation uses the deferred value</span>
    <span class="hljs-keyword">return</span> deferredData.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChartBar</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> /&gt;</span></span>
    ));
  }, [deferredData]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* Show a hint that data is updating */}
      {data !== deferredData &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;opacity-50&quot;</span>&gt;</span>Updating chart...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;chart&quot;</span>&gt;</span>{chartElements}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>عندما تتغيّر <code>data</code> بسرعة، يتخلّف <code>deferredData</code> عنها، فلا تُعاد حسابات الرسم البياني المكلفة مع كل ضغطة مفتاح. ويجمع React التحديثات في دفعة واحدة ويعالجها عندما يتوفّر لديه وقت فائض.</p>
<h2 id="تجنب-مزالق-الجدولة-الشائعة">تجنّب مزالق الجدولة الشائعة</h2>
<h3 id="لا-تغلف-كل-شيء-بالانتقالات">لا تُغلّف كل شيء بالانتقالات</h3>
<p>الانتقالات مخصّصة للتحديثات غير العاجلة التي يمكن مقاطعتها. لا تُغلّف تفاعلات عاجلة مثل نقرات الأزرار أو إرسال النماذج:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Makes button feel unresponsive</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ onClick }: { onClick: () =&gt; <span class="hljs-built_in">void</span> }</span>) {
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> startTransition(onClick)}
    &gt;
      Submit
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Good: Button responds immediately</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ onClick }: { onClick: () =&gt; <span class="hljs-built_in">void</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>
      Submit
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="انتبه-لحدود-الانتقال">انتبه لحدود الانتقال</h3>
<p>لا تؤثر الانتقالات إلا في التحديثات الواقعة داخل دالة الاستدعاء الممرّرة إلى <code>startTransition</code>. أما التحديثات خارجها فتبقى عاجلة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This won&#x27;t work as expected</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">newQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(newQuery); <span class="hljs-comment">// Still urgent!</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> filtered = <span class="hljs-title function_">expensiveFilter</span>(newQuery);
      <span class="hljs-title function_">setResults</span>(filtered); <span class="hljs-comment">// Only this is in the transition</span>
    });
  };
}
</code></pre>
<p>إن أردت أن يكون التحديثان معًا جزءًا من الانتقال، فأدرجهما كليهما:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Both updates are now non-urgent</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">newQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setQuery</span>(newQuery);
    <span class="hljs-keyword">const</span> filtered = <span class="hljs-title function_">expensiveFilter</span>(newQuery);
    <span class="hljs-title function_">setResults</span>(filtered);
  });
};
</code></pre>
<h2 id="أنماط-جدولة-واقعية">أنماط جدولة واقعية</h2>
<h3 id="نمط-التحسين-التدريجي">نمط التحسين التدريجي</h3>
<p>أظهر استجابة فورية للتحديثات العاجلة مع تأجيل العمل الثانوي المكلف:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [recommendations, setRecommendations] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Urgent: Load user data immediately</span>
    <span class="hljs-title function_">fetchUser</span>(userId).<span class="hljs-title function_">then</span>(setUser);

    <span class="hljs-comment">// Non-urgent: Recommendations can wait</span>
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">fetchRecommendations</span>(userId).<span class="hljs-title function_">then</span>(setRecommendations);
    });
  }, [userId]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {user ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">UserCardSkeleton</span> /&gt;</span>
      )}

      {recommendations.length &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">RecommendationsList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{recommendations}</span> /&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="التحديثات-التفاؤلية-مع-بديل-مؤقت">التحديثات التفاؤلية مع بديل مؤقّت</h3>
<p>اجمع الانتقالات مع التحديثات التفاؤلية للحصول على تفاعلات سلسة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params">{ todo, onToggle }: { todo: Todo; onToggle: (id: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span> }</span>) {
  <span class="hljs-keyword">const</span> [isOptimistic, setIsOptimistic] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleToggle</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setIsOptimistic</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// Immediate visual feedback</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">onToggle</span>(todo.<span class="hljs-property">id</span>); <span class="hljs-comment">// The actual update can be deferred</span>
      <span class="hljs-title function_">setIsOptimistic</span>(<span class="hljs-literal">false</span>);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">todo-item</span> \${<span class="hljs-attr">isOptimistic</span> ? &#x27;<span class="hljs-attr">updating</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleToggle}</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Checkbox</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التعامل-مع-المكتبات-الخارجية">التعامل مع المكتبات الخارجية</h2>
<p>ليست كل المكتبات مهيّأة للتزامن. فبعضها ينفّذ عمليات تزامنية لا يمكن مقاطعتها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problematic: Heavy synchronous work</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataGrid</span>(<span class="hljs-params">{ data }: { data: <span class="hljs-built_in">any</span>[] }</span>) {
  <span class="hljs-keyword">const</span> deferredData = <span class="hljs-title function_">useDeferredValue</span>(data);

  <span class="hljs-comment">// This heavy calculation still blocks the main thread</span>
  <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">heavySyncProcessing</span>(deferredData);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Grid</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{processedData}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Better: Break work into chunks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataGrid</span>(<span class="hljs-params">{ data }: { data: <span class="hljs-built_in">any</span>[] }</span>) {
  <span class="hljs-keyword">const</span> deferredData = <span class="hljs-title function_">useDeferredValue</span>(data);
  <span class="hljs-keyword">const</span> [processedData, setProcessedData] = <span class="hljs-title function_">useState</span>([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Process data in chunks with yielding</span>
    <span class="hljs-title function_">processDataInChunks</span>(deferredData, setProcessedData);
  }, [deferredData]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Grid</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{processedData}</span> /&gt;</span></span>;
}

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">processDataInChunks</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>[], <span class="hljs-attr">setResult</span>: (data: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">void</span></span>) {
  <span class="hljs-keyword">const</span> chunks = <span class="hljs-title function_">chunkArray</span>(data, <span class="hljs-number">100</span>);
  <span class="hljs-keyword">const</span> results = [];

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> chunk <span class="hljs-keyword">of</span> chunks) {
    <span class="hljs-keyword">const</span> processed = <span class="hljs-title function_">processChunk</span>(chunk);
    results.<span class="hljs-title function_">push</span>(...processed);

    <span class="hljs-comment">// Yield control back to the browser</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">0</span>));
    <span class="hljs-title function_">setResult</span>([...results]);
  }
}
</code></pre>
<h2 id="مراقبة-الأداء-والتنقيح">مراقبة الأداء والتنقيح</h2>
<p>يساعدك مُنمّق React DevTools على فهم سلوك انتقالاتك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Add labels to make transitions easier to identify in DevTools</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// This label appears in React DevTools</span>
      <span class="hljs-title class_">React</span>.<span class="hljs-title function_">unstable_trace</span>(<span class="hljs-string">&#x27;search-filtering&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">expensiveSearch</span>(query);
        <span class="hljs-title function_">setResults</span>(results);
      });
    });
  };
}
</code></pre>
<p>ويمكنك أيضًا قياس أداء الانتقالات في الإنتاج:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { unstable_trace } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">trackTransitionPerformance</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fn</span>: () =&gt; <span class="hljs-built_in">void</span></span>) {
  <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();

  <span class="hljs-title function_">unstable_trace</span>(name, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fn</span>();

    <span class="hljs-comment">// Log timing data to your analytics</span>
    <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - start;
    analytics.<span class="hljs-title function_">track</span>(<span class="hljs-string">&#x27;transition-performance&#x27;</span>, { name, duration });
  });
}
</code></pre>
<h2 id="متى-لا-تستخدم-الميزات-المتزامنة">متى لا تستخدم الميزات المتزامنة</h2>
<p>ليست الميزات المتزامنة هي الجواب دائمًا. تجنّبها عندما:</p>
<ul>
<li><strong>منطق عمل حرج</strong>: لا تؤجّل التحقق من الصحة أو الفحوص الأمنية</li>
<li><strong>تحديثات بسيطة وسريعة</strong>: لا تستحق الكلفة الإضافية عمليات تافهة</li>
<li><strong>متطلبات توقيت خارجية</strong>: بعض العمليات تحتاج تحكّمًا دقيقًا في التوقيت</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t defer critical validation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PaymentForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">PaymentData</span></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">validatePayment</span>(data); <span class="hljs-comment">// This should be immediate!</span>
      <span class="hljs-title function_">submitPayment</span>(data);
    });
  };
}

<span class="hljs-comment">// ✅ Keep validation urgent, defer non-critical work</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PaymentForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">PaymentData</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> isValid = <span class="hljs-keyword">await</span> <span class="hljs-title function_">validatePayment</span>(data); <span class="hljs-comment">// Urgent</span>
    <span class="hljs-keyword">if</span> (!isValid) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">submitPayment</span>(data); <span class="hljs-comment">// Also urgent</span>

    <span class="hljs-comment">// Non-urgent: Analytics and cleanup can wait</span>
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">trackPaymentSuccess</span>(data);
      <span class="hljs-title function_">clearFormCache</span>();
    });
  };
}
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>تمنحك ميزات React المتزامنة تحكّمًا دقيقًا في توقيت تنفيذ العمل، لكنها أدوات تتطلّب تطبيقًا مدروسًا. ابدأ بتحديد العمليات المكلفة في تطبيقك — معالجة البيانات، أو عمليات التصيير المعقّدة، أو الحسابات الثقيلة — وجرّب تغليفها بالانتقالات.</p>
<p>الهدف ليس جعل كل شيء متزامنًا، بل ضمان أن تبدو تفاعلات المستخدم مستجيبة دائمًا بينما يجري العمل غير الحرج في الخلفية. وسيلاحظ مستخدموك الفرق، حتى إن لم يستطيعوا تحديد السبب الذي يجعل تطبيقك يبدو أكثر صقلًا من المنافسين.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
