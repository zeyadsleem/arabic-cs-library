const s="kinney",a="react-performance",n="أداء React",l="suspense-for-data-fetching",p="Suspense لجلب البيانات",e=[{depth:2,id:"تهيئة-حدود-suspense",text:"تهيئة حدود Suspense"},{depth:2,id:"أنماط-جلب-البيانات-مع-suspense",text:"أنماط جلب البيانات مع Suspense"},{depth:2,id:"حدود-الأخطاء-مع-suspense",text:"حدود الأخطاء مع Suspense"},{depth:2,id:"نمط-من-الواقع-العملي-تدفق-البيانات",text:"نمط من الواقع العملي: تدفّق البيانات"},{depth:3,id:"بدء-الطلبات-مبكرا",text:"بدء الطلبات مبكرًا"},{depth:2,id:"متقدم-الميزات-المتزامنة",text:"متقدّم: الميزات المتزامنة"},{depth:2,id:"مزالق-شائعة-وحلولها",text:"مزالق شائعة وحلولها"},{depth:3,id:"المشكلة-إبطال-الذاكرة-المؤقتة",text:"المشكلة: إبطال الذاكرة المؤقتة"},{depth:3,id:"المشكلة-وميض-حالات-التحميل",text:"المشكلة: وميض حالات التحميل"},{depth:3,id:"المشكلة-التعليق-عند-التنقل",text:"المشكلة: التعليق عند التنقّل"},{depth:2,id:"متى-تستخدم-suspense",text:"متى تستخدم Suspense"}],t=`<p>يغيّر React Suspense جذريًا طريقة تفكيرنا في حالات التحميل وجلب البيانات. فبدلًا من توصيل مؤشرات التحميل وحدود الأخطاء يدويًا في أنحاء شجرة مكوّناتك، يتيح لك Suspense تعريف حدود تحميل تصريحية تتولّى العمليات غير المتزامنة بسلاسة. وتُركّب هذه الحدود بذكاء لإبقاء أجزاء من واجهتك تفاعلية بينما تُحمَّل أجزاء أخرى — فتحوّل نمط «الكل ينتظر الكل» التقليدي إلى ما يشبه التحسين التدريجي.</p>
<p>القوة الحقيقية تأتي من تعاون حدود Suspense مع أنماط جلب البيانات الحديثة لإنشاء واجهات متدفقة تكشف المحتوى بمجرد جهوزه، بدل حجب الصفحة كلها انتظارًا لأبطأ اعتماد بيانات.</p>
<blockquote>
<p>انظر أيضًا: <a href="https://stevekinney.com/courses/react-performance/the-use-hook">خُطّاف use</a> للأنماط الخاصة بـ <code>use()</code>، وتركيب Suspense الأساسي، ومعالجة الأخطاء. وتركّز هذه الصفحة على أنماط جلب البيانات المتمركزة حول Suspense، وميكانيكا التخزين المؤقت (رمي الوعود)، والمزالق الشائعة.</p>
</blockquote>
<h2 id="تهيئة-حدود-suspense">تهيئة حدود <code>Suspense</code></h2>
<p>يفترض هذا الدليل إلمامًا بتركيب الحدود الأساسي. ولمقدّمة وأمثلة على التحسين التدريجي، انظر <a href="https://stevekinney.com/courses/react-performance/the-use-hook">خُطّاف use</a>.</p>
<h2 id="أنماط-جلب-البيانات-مع-suspense">أنماط جلب البيانات مع <code>Suspense</code></h2>
<p>لكي يعمل مع Suspense، يحتاج جلب بياناتك إلى اتّباع نمط «التصيير أثناء الجلب». وإليك كيفية تنفيذ خُطّاف جلب بيانات متوافق مع Suspense:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple cache to store promises and results</span>
<span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; | <span class="hljs-built_in">any</span>&gt;();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  });
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">const</span> cacheKey = <span class="hljs-string">\`user-<span class="hljs-subst">\${userId}</span>\`</span>;

  <span class="hljs-keyword">if</span> (cache.<span class="hljs-title function_">has</span>(cacheKey)) {
    <span class="hljs-keyword">const</span> cached = cache.<span class="hljs-title function_">get</span>(cacheKey);

    <span class="hljs-comment">// If it&#x27;s a promise, the request is in flight - throw it for Suspense</span>
    <span class="hljs-keyword">if</span> (cached <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Promise</span>) {
      <span class="hljs-keyword">throw</span> cached;
    }

    <span class="hljs-comment">// If it&#x27;s data, return it</span>
    <span class="hljs-keyword">return</span> cached;
  }

  <span class="hljs-comment">// No cache entry - start the request</span>
  <span class="hljs-keyword">const</span> promise = <span class="hljs-title function_">fetchUser</span>(userId).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
    <span class="hljs-comment">// Replace promise with actual data in cache</span>
    cache.<span class="hljs-title function_">set</span>(cacheKey, user);
    <span class="hljs-keyword">return</span> user;
  });

  <span class="hljs-comment">// Cache the promise and throw it</span>
  cache.<span class="hljs-title function_">set</span>(cacheKey, promise);
  <span class="hljs-keyword">throw</span> promise;
}
</code></pre>
<p>يضمن هذا النمط ما يلي:</p>
<ol>
<li>أول تصيير يرمي وعدًا ← يعرض Suspense البديل</li>
<li>عند تحلّل الوعد ← يُعيد المكوّن التصيير مع البيانات</li>
<li>التصييرات اللاحقة تستخدم البيانات المخزّنة مؤقتًا فورًا</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>في الإنتاج، استخدم مكتبات مثل <a href="https://swr.vercel.app/">SWR</a> أو <a href="https://tanstack.com/query">TanStack Query</a> أو <a href="https://relay.dev/">Relay</a> التي تدعم Suspense مدمجًا، بدل بناء ذاكرتك المؤقتة بنفسك.</p>
</blockquote>
<h2 id="حدود-الأخطاء-مع-suspense">حدود الأخطاء مع <code>Suspense</code></h2>
<p>ارجع إلى <a href="https://stevekinney.com/courses/react-performance/the-use-hook">خُطّاف use</a> لأنماط حدود الأخطاء التأسيسية مع Suspense و<code>use()</code>. وتركّز هذه الصفحة على التخزين المؤقت والتدفّق والمزالق لا على معالجة الأخطاء عمومًا.</p>
<h2 id="نمط-من-الواقع-العملي-تدفق-البيانات">نمط من الواقع العملي: تدفّق البيانات</h2>
<p>انظر أمثلة التركيب التدريجي في <a href="https://stevekinney.com/courses/react-performance/the-use-hook">خُطّاف use</a>. ونركّز فيما يلي على بدء الطلبات مبكرًا لتجنّب الشلالات.</p>
<h3 id="بدء-الطلبات-مبكرا">بدء الطلبات مبكرًا</h3>
<p>مفتاح تجربة المستخدم الجيدة مع Suspense هو بدء طلبات البيانات قبل تصيير المكوّنات التي تحتاجها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t start fetch inside component render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useUser</span>(userId); <span class="hljs-comment">// Starts fetch on first render</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Start fetch before rendering</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [userId, setUserId] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;123&#x27;</span>);

  <span class="hljs-comment">// Warm the cache before rendering UserProfile</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">warmCache</span>(userId);
  }, [userId]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Skeleton</span> /&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">{userId}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">warmCache</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-comment">// This puts the promise in cache before component renders</span>
  <span class="hljs-keyword">if</span> (!cache.<span class="hljs-title function_">has</span>(<span class="hljs-string">\`user-<span class="hljs-subst">\${userId}</span>\`</span>)) {
    cache.<span class="hljs-title function_">set</span>(<span class="hljs-string">\`user-<span class="hljs-subst">\${userId}</span>\`</span>, <span class="hljs-title function_">fetchUser</span>(userId));
  }
}
</code></pre>
<h2 id="متقدم-الميزات-المتزامنة">متقدّم: الميزات المتزامنة</h2>
<p>تعمل الميزات المتزامنة في React 18 بشكل جيد خصوصًا مع Suspense. ويتيح لك <code>startTransition</code> تعليم تحديثات بأنها غير عاجلة، فتمنعها من حجب واجهة المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { startTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [deferredQuery, setDeferredQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">newQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(newQuery); <span class="hljs-comment">// Update immediately for input responsiveness</span>

    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDeferredQuery</span>(newQuery); <span class="hljs-comment">// This won&#x27;t block the UI</span>
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleSearch(e.target.value)} placeholder=&quot;Search...&quot; /&gt;

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">SearchSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchResultsList</span> <span class="hljs-attr">query</span>=<span class="hljs-string">{deferredQuery}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يبقى حقل الإدخال مستجيبًا بينما تُحمَّل نتائج البحث في الخلفية.</p>
<h2 id="مزالق-شائعة-وحلولها">مزالق شائعة وحلولها</h2>
<h3 id="المشكلة-إبطال-الذاكرة-المؤقتة">المشكلة: إبطال الذاكرة المؤقتة</h3>
<p>بلا إدارة سليمة للذاكرة المؤقتة، قد تعرض بيانات قديمة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Add cache invalidation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">invalidateUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  cache.<span class="hljs-title function_">delete</span>(<span class="hljs-string">\`user-<span class="hljs-subst">\${userId}</span>\`</span>);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">updateUserMutation</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(updates),
  }).<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">invalidateUser</span>(userId); <span class="hljs-comment">// Clear cache to force refetch</span>
  });
}
</code></pre>
<h3 id="المشكلة-وميض-حالات-التحميل">المشكلة: وميض حالات التحميل</h3>
<p>إذا حُمّلت البيانات سريعًا جدًا، فقد تومض مؤشرات التحميل بشكل مزعج:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useDeferredValue } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> deferredQuery = <span class="hljs-title function_">useDeferredValue</span>(query);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span>
      <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>
        &lt;<span class="hljs-attr">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">minHeight:</span> &#x27;<span class="hljs-attr">200px</span>&#x27; }}&gt;</span>
          {/* Use a delayed skeleton to avoid flashing */}
          <span class="hljs-tag">&lt;<span class="hljs-name">DelayedSkeleton</span> <span class="hljs-attr">delay</span>=<span class="hljs-string">{100}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      }
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">ResultsList</span> <span class="hljs-attr">query</span>=<span class="hljs-string">{deferredQuery}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="المشكلة-التعليق-عند-التنقل">المشكلة: التعليق عند التنقّل</h3>
<p>احترس من تغليف تطبيقك كله بـ Suspense — إذ قد يُعلّق الواجهة كلها أثناء التنقّل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This suspends everything during route changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">AppSkeleton</span> /&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Routes</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">HomePage</span> /&gt;</span>} /&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/profile&quot;</span> <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ProfilePage</span> /&gt;</span>} /&gt;
        <span class="hljs-tag">&lt;/<span class="hljs-name">Routes</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Keep navigation responsive with page-level boundaries</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Routes</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
          <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span>
          <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>
            &lt;<span class="hljs-attr">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">HomeSkeleton</span> /&gt;</span>}&gt;
              <span class="hljs-tag">&lt;<span class="hljs-name">HomePage</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
          }
        /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
          <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/profile&quot;</span>
          <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>
            &lt;<span class="hljs-attr">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ProfileSkeleton</span> /&gt;</span>}&gt;
              <span class="hljs-tag">&lt;<span class="hljs-name">ProfilePage</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
          }
        /&gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">Routes</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متى-تستخدم-suspense">متى تستخدم <code>Suspense</code></h2>
<p>يتألق Suspense في هذه السيناريوهات:</p>
<ul>
<li><strong>واجهات على نمط لوحات المعلومات</strong> بمصادر بيانات مستقلة متعددة</li>
<li><strong>الصفحات الغنية بالمحتوى</strong> حيث تريد تدفّق الأقسام تدريجيًا</li>
<li><strong>واجهات البحث</strong> حيث تريد إبقاء حقول الإدخال مستجيبة أثناء البحث</li>
<li><strong>الأخبار الاجتماعية</strong> حيث يمكن للمحتوى الجديد أن يظهر دون حجب المحتوى الموجود</li>
</ul>
<p>وهو أقل فائدة في:</p>
<ul>
<li>النماذج البسيطة ذات العمليات غير المتزامنة المحدودة</li>
<li>التطبيقات التي معظم محتواها ثابت</li>
<li>الحالات التي تحتاج فيها إلى تحكم دقيق في التحميل لكل حقل على حدة</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
