const s="kinney",n="react-performance",a="أداء React",l="priority-hints-resource-loading",p="تلميحات الأولوية وتحميل الموارد",t=[{depth:2,id:"فهم-تحميل-المتصفح-للموارد",text:"فهم تحميل المتصفح للموارد"},{depth:2,id:"تلميحات-الأولوية-عبر-fetchpriority",text:"تلميحات الأولوية عبر fetchpriority"},{depth:3,id:"إدارة-الأولويات-ديناميكيا",text:"إدارة الأولويات ديناميكيًا"},{depth:2,id:"التحميل-المسبق-للموارد-الحرجة",text:"التحميل المسبق للموارد الحرجة"},{depth:3,id:"تحميل-مسبق-ذكي-وفق-المسارات",text:"تحميل مسبق ذكي وفق المسارات"},{depth:2,id:"الجلب-المسبق-لـ-dns-والاتصال-المسبق",text:"الجلب المسبق لـ DNS والاتصال المسبق"},{depth:3,id:"إدارة-ذكية-للاتصالات",text:"إدارة ذكية للاتصالات"},{depth:2,id:"الجلب-المسبق-للتنقل-المستقبلي",text:"الجلب المسبق للتنقّل المستقبلي"},{depth:3,id:"الجلب-المسبق-عبر-intersection-observer",text:"الجلب المسبق عبر Intersection Observer"},{depth:2,id:"التصيير-المسبق-لتنقل-فوري",text:"التصيير المسبق لتنقّل فوري"},{depth:2,id:"التحميل-المسبق-للوحدات-مع-تقسيم-الشيفرة",text:"التحميل المسبق للوحدات مع تقسيم الشيفرة"},{depth:2,id:"التكامل-مع-resource-timing-api",text:"التكامل مع Resource Timing API"},{depth:2,id:"استراتيجية-التحميل-التكيفي",text:"استراتيجية التحميل التكيّفي"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يُحمَّل تطبيق React لديك. في النهاية. أولًا HTML، ثم CSS، ثم JavaScript، ثم الخطوط، ثم الصور، ثم مزيد من JavaScript، ثم استدعاءات API… وبحلول الوقت الذي يرى فيه مستخدمك أي شيء مفيد، يكون قد كتب في ذهنه رسالة استقالته من تطبيقك. يبذل المتصفح قصارى جهده، لكنه يخمّن ما هو مهم. فماذا لو استطعت إخباره بما يجب أن يعطيه الأولوية بالضبط؟</p>
<p>ادخل إلى عالم تلميحات الموارد (resource hints) والتحميل بالأولوية — أسلحتك السرّية لتنسيق سيمفونية تحميل مثالية. فهي ليست مجرّد وسوم <code>&lt;link&gt;</code> تنثرها هنا وهناك آملًا في أفضل النتائج، بل أدوات دقيقة يمكنها، عند استخدامها على نحو صحيح، أن تخفض زمن الوصول إلى التفاعل (Time to Interactive) إلى النصف.</p>
<p>لنتعمّق في كيفية تحميل المتصفحات الحديثة للموارد، وكيف يمكنك التحكّم في تلك العملية لتقديم تطبيقات React فائقة السرعة.</p>
<h2 id="فهم-تحميل-المتصفح-للموارد">فهم تحميل المتصفح للموارد</h2>
<p>قبل أن نحسّن، لنفهم كيف يحدّد المتصفح أولويات الموارد:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">BrowserPrioritySystem</span> {
  <span class="hljs-attr">critical</span>: [<span class="hljs-string">&#x27;HTML&#x27;</span>, <span class="hljs-string">&#x27;CSS in &lt;head&gt;&#x27;</span>, <span class="hljs-string">&#x27;Fonts in use&#x27;</span>];
  <span class="hljs-attr">high</span>: [<span class="hljs-string">&#x27;Scripts in &lt;head&gt;&#x27;</span>, <span class="hljs-string">&#x27;Preload resources&#x27;</span>, <span class="hljs-string">&#x27;XHR/Fetch&#x27;</span>];
  <span class="hljs-attr">medium</span>: [<span class="hljs-string">&#x27;Scripts in &lt;body&gt;&#x27;</span>, <span class="hljs-string">&#x27;Images in viewport&#x27;</span>];
  <span class="hljs-attr">low</span>: [<span class="hljs-string">&#x27;Images below fold&#x27;</span>, <span class="hljs-string">&#x27;Async scripts&#x27;</span>, <span class="hljs-string">&#x27;Prefetch&#x27;</span>];
  <span class="hljs-attr">idle</span>: [<span class="hljs-string">&#x27;Prerender&#x27;</span>, <span class="hljs-string">&#x27;Speculative loads&#x27;</span>];
}

<span class="hljs-comment">// Browser&#x27;s default loading waterfall</span>
<span class="hljs-comment">// 1. Parse HTML</span>
<span class="hljs-comment">// 2. Discover resources</span>
<span class="hljs-comment">// 3. Assign priorities</span>
<span class="hljs-comment">// 4. Fetch based on priority and connection limits</span>
<span class="hljs-comment">// 5. Execute/render as resources arrive</span>
</code></pre>
<h2 id="تلميحات-الأولوية-عبر-fetchpriority">تلميحات الأولوية عبر fetchpriority</h2>
<p>تتيح لك خاصية <code>fetchpriority</code> تجاوز الأولويات الافتراضية للمتصفح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Browser guesses importance</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UnoptimizedHero</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/hero.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Hero&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/thumbnail1.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Thumb 1&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/thumbnail2.jpg&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Thumb 2&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// ✅ Explicit priority hints</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">OptimizedHero</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/hero.jpg&quot;</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Hero&quot;</span>
        <span class="hljs-attr">fetchpriority</span>=<span class="hljs-string">&quot;high&quot;</span>  // <span class="hljs-attr">Load</span> <span class="hljs-attr">this</span> <span class="hljs-attr">first</span>!
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/thumbnail1.jpg&quot;</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Thumb 1&quot;</span>
        <span class="hljs-attr">fetchpriority</span>=<span class="hljs-string">&quot;low&quot;</span>   // <span class="hljs-attr">Load</span> <span class="hljs-attr">after</span> <span class="hljs-attr">critical</span> <span class="hljs-attr">content</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/thumbnail2.jpg&quot;</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Thumb 2&quot;</span>
        <span class="hljs-attr">fetchpriority</span>=<span class="hljs-string">&quot;low&quot;</span>
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="إدارة-الأولويات-ديناميكيا">إدارة الأولويات ديناميكيًا</h3>
<p>اضبط الأولويات بناءً على سلوك المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useDynamicPriority</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [priority, setPriority] = useState&lt;<span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;auto&#x27;</span>&gt;(<span class="hljs-string">&#x27;auto&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Detect slow connection</span>
    <span class="hljs-keyword">const</span> connection = (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>;
    <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">effectiveType</span> === <span class="hljs-string">&#x27;2g&#x27;</span> || connection?.<span class="hljs-property">saveData</span>) {
      <span class="hljs-title function_">setPriority</span>(<span class="hljs-string">&#x27;low&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// High priority for fast connections</span>
    <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">effectiveType</span> === <span class="hljs-string">&#x27;4g&#x27;</span>) {
      <span class="hljs-title function_">setPriority</span>(<span class="hljs-string">&#x27;high&#x27;</span>);
    }
  }, []);

  <span class="hljs-keyword">return</span> priority;
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AdaptiveImage</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">critical</span>?: <span class="hljs-built_in">boolean</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{
  src,
  critical = <span class="hljs-literal">false</span>
}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> priority = <span class="hljs-title function_">useDynamicPriority</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">{src}</span>
      <span class="hljs-attr">fetchpriority</span>=<span class="hljs-string">{critical</span> ? &#x27;<span class="hljs-attr">high</span>&#x27; <span class="hljs-attr">:</span> <span class="hljs-attr">priority</span>}
      <span class="hljs-attr">loading</span>=<span class="hljs-string">{critical</span> ? &#x27;<span class="hljs-attr">eager</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">lazy</span>&#x27;}
    /&gt;</span></span>
  );
};
</code></pre>
<h2 id="التحميل-المسبق-للموارد-الحرجة">التحميل المسبق للموارد الحرجة</h2>
<p>أخبر المتصفح بالموارد الحرجة قبل أن يكتشفها تلقائيًا. وللاطلاع على واجهات التحميل المسبق الجديدة للموارد في React 19 (<code>preload</code> و<code>preinit</code> و<code>prefetchDNS</code>)، راجع <a href="https://stevekinney.com/courses/react-performance/resource-preloading-apis">resource-preloading-apis.md</a>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// React component for managing preloads</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ResourcePreloader</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preload critical font</span>
    <span class="hljs-keyword">const</span> fontLink = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
    fontLink.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;preload&#x27;</span>;
    fontLink.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;font&#x27;</span>;
    fontLink.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;font/woff2&#x27;</span>;
    fontLink.<span class="hljs-property">href</span> = <span class="hljs-string">&#x27;/fonts/main.woff2&#x27;</span>;
    fontLink.<span class="hljs-property">crossOrigin</span> = <span class="hljs-string">&#x27;anonymous&#x27;</span>;
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(fontLink);

    <span class="hljs-comment">// Preload critical CSS</span>
    <span class="hljs-keyword">const</span> cssLink = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
    cssLink.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;preload&#x27;</span>;
    cssLink.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;style&#x27;</span>;
    cssLink.<span class="hljs-property">href</span> = <span class="hljs-string">&#x27;/critical.css&#x27;</span>;
    cssLink.<span class="hljs-property">onload</span> = <span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;stylesheet&#x27;</span>;
    };
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(cssLink);

    <span class="hljs-comment">// Preload hero image</span>
    <span class="hljs-keyword">const</span> imgLink = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
    imgLink.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;preload&#x27;</span>;
    imgLink.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;image&#x27;</span>;
    imgLink.<span class="hljs-property">href</span> = <span class="hljs-string">&#x27;/hero.webp&#x27;</span>;
    imgLink.<span class="hljs-property">fetchpriority</span> = <span class="hljs-string">&#x27;high&#x27;</span>;
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(imgLink);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Cleanup if needed</span>
    };
  }, []);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
};
</code></pre>
<h3 id="تحميل-مسبق-ذكي-وفق-المسارات">تحميل مسبق ذكي وفق المسارات</h3>
<p>حمّل الموارد مسبقًا للتنقّل التالي المحتمل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useRoutePreloader</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> location = <span class="hljs-title function_">useLocation</span>();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preload resources for likely next routes</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">preloadMap</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = {
      <span class="hljs-string">&#x27;/&#x27;</span>: [<span class="hljs-string">&#x27;/api/featured&#x27;</span>, <span class="hljs-string">&#x27;/images/hero.webp&#x27;</span>],
      <span class="hljs-string">&#x27;/products&#x27;</span>: [<span class="hljs-string">&#x27;/api/products&#x27;</span>, <span class="hljs-string">&#x27;/js/product-gallery.js&#x27;</span>],
      <span class="hljs-string">&#x27;/checkout&#x27;</span>: [<span class="hljs-string">&#x27;/api/cart&#x27;</span>, <span class="hljs-string">&#x27;/js/payment-processor.js&#x27;</span>],
    };

    <span class="hljs-keyword">const</span> currentPath = location.<span class="hljs-property">pathname</span>;
    <span class="hljs-keyword">const</span> resourcesToPreload = preloadMap[currentPath] || [];

    resourcesToPreload.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">resource</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
      link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;prefetch&#x27;</span>;
      link.<span class="hljs-property">href</span> = resource;

      <span class="hljs-comment">// Determine resource type</span>
      <span class="hljs-keyword">if</span> (resource.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.js&#x27;</span>)) {
        link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;script&#x27;</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (resource.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;/api/&#x27;</span>)) {
        link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;fetch&#x27;</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (resource.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/\\.(webp|jpg|png)$/</span>)) {
        link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;image&#x27;</span>;
      }

      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);
    });
  }, [location]);
};
</code></pre>
<h2 id="الجلب-المسبق-لـ-dns-والاتصال-المسبق">الجلب المسبق لـ DNS والاتصال المسبق</h2>
<p>أنشئ الاتصالات مبكرًا لتقليل زمن الاستجابة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">ConnectionOptimizer</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> connections = [
      { <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://api.example.com&#x27;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;preconnect&#x27;</span> },
      { <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://cdn.example.com&#x27;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;preconnect&#x27;</span> },
      { <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://analytics.example.com&#x27;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;dns-prefetch&#x27;</span> },
      { <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;https://fonts.googleapis.com&#x27;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;preconnect&#x27;</span> },
    ];

    connections.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ href, <span class="hljs-keyword">type</span> }</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
      link.<span class="hljs-property">rel</span> = <span class="hljs-keyword">type</span>;
      link.<span class="hljs-property">href</span> = href;

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;preconnect&#x27;</span>) {
        link.<span class="hljs-property">crossOrigin</span> = <span class="hljs-string">&#x27;anonymous&#x27;</span>;
      }

      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);
    });
  }, []);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
};
</code></pre>
<h3 id="إدارة-ذكية-للاتصالات">إدارة ذكية للاتصالات</h3>
<p>لا تسبق الاتصال إلا بالنطاقات التي ستستخدمها فعلًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ConnectionManager</span> {
  <span class="hljs-keyword">private</span> connected = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;();
  <span class="hljs-keyword">private</span> pending = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;();
  <span class="hljs-keyword">private</span> maxConnections = <span class="hljs-number">6</span>; <span class="hljs-comment">// Browser limit</span>

  <span class="hljs-title function_">preconnect</span>(<span class="hljs-params"><span class="hljs-attr">origin</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">connected</span>.<span class="hljs-title function_">has</span>(origin)) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pending</span>.<span class="hljs-title function_">set</span>(origin, priority);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processPending</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processPending</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">connected</span>.<span class="hljs-property">size</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxConnections</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Sort by priority</span>
    <span class="hljs-keyword">const</span> sorted = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">pending</span>.<span class="hljs-title function_">entries</span>()).<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b[<span class="hljs-number">1</span>] - a[<span class="hljs-number">1</span>]);

    <span class="hljs-keyword">const</span> [origin] = sorted[<span class="hljs-number">0</span>] || [];
    <span class="hljs-keyword">if</span> (!origin) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pending</span>.<span class="hljs-title function_">delete</span>(origin);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">connected</span>.<span class="hljs-title function_">add</span>(origin);

    <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
    link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;preconnect&#x27;</span>;
    link.<span class="hljs-property">href</span> = origin;
    link.<span class="hljs-property">crossOrigin</span> = <span class="hljs-string">&#x27;anonymous&#x27;</span>;
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);

    <span class="hljs-comment">// Track connection lifecycle</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">connected</span>.<span class="hljs-title function_">delete</span>(origin);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processPending</span>();
    }, <span class="hljs-number">10000</span>); <span class="hljs-comment">// Connections typically timeout after 10s</span>
  }
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">useConnectionManager</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> managerRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ConnectionManager</span>());

  <span class="hljs-keyword">const</span> preconnect = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>?: <span class="hljs-built_in">number</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> origin = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(url).<span class="hljs-property">origin</span>;
    managerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">preconnect</span>(origin, priority);
  }, []);

  <span class="hljs-keyword">return</span> { preconnect };
};
</code></pre>
<h2 id="الجلب-المسبق-للتنقل-المستقبلي">الجلب المسبق للتنقّل المستقبلي</h2>
<p>حمّل الموارد للتنقّل المستقبلي المحتمل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ No prefetching</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BasicLink</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ href, children }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{href}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Smart prefetching on hover/focus</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SmartLink</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ href, children }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [prefetched, setPrefetched] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> prefetch = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (prefetched) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Prefetch the route&#x27;s bundle</span>
    <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
    link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;prefetch&#x27;</span>;
    link.<span class="hljs-property">href</span> = <span class="hljs-string">\`/js/<span class="hljs-subst">\${href.slice(<span class="hljs-number">1</span>)}</span>.bundle.js\`</span>;
    link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;script&#x27;</span>;
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);

    <span class="hljs-comment">// Prefetch route data</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/preload<span class="hljs-subst">\${href}</span>\`</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;HEAD&#x27;</span>,
      <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;low&#x27;</span>
    });

    <span class="hljs-title function_">setPrefetched</span>(<span class="hljs-literal">true</span>);
  }, [href, prefetched]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span>
      <span class="hljs-attr">to</span>=<span class="hljs-string">{href}</span>
      <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{prefetch}</span>
      <span class="hljs-attr">onFocus</span>=<span class="hljs-string">{prefetch}</span>
      <span class="hljs-attr">onTouchStart</span>=<span class="hljs-string">{prefetch}</span>
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="الجلب-المسبق-عبر-intersection-observer">الجلب المسبق عبر Intersection Observer</h3>
<p>اجلب الموارد مسبقًا حين تصبح الروابط مرئية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">usePrefetchOnVisible</span> = (<span class="hljs-params"><span class="hljs-attr">enabled</span>: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">true</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> observerRef = useRef&lt;<span class="hljs-title class_">IntersectionObserver</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> prefetchedUrls = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!enabled) <span class="hljs-keyword">return</span>;

    observerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
        entries.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {
            <span class="hljs-keyword">const</span> link = entry.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLAnchorElement</span>;
            <span class="hljs-keyword">const</span> href = link.<span class="hljs-property">href</span>;

            <span class="hljs-keyword">if</span> (!prefetchedUrls.<span class="hljs-property">current</span>.<span class="hljs-title function_">has</span>(href)) {
              prefetchedUrls.<span class="hljs-property">current</span>.<span class="hljs-title function_">add</span>(href);

              <span class="hljs-comment">// Prefetch the page</span>
              <span class="hljs-keyword">const</span> prefetchLink = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
              prefetchLink.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;prefetch&#x27;</span>;
              prefetchLink.<span class="hljs-property">href</span> = href;
              prefetchLink.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;document&#x27;</span>;
              <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(prefetchLink);

              <span class="hljs-comment">// Stop observing</span>
              observerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">unobserve</span>(link);
            }
          }
        });
      },
      { <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;50px&#x27;</span> },
    );

    <span class="hljs-comment">// Observe all links</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;a[href^=&quot;/&quot;]&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">link</span>) =&gt;</span> {
      observerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">observe</span>(link);
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      observerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">disconnect</span>();
    };
  }, [enabled]);
};
</code></pre>
<h2 id="التصيير-المسبق-لتنقل-فوري">التصيير المسبق لتنقّل فوري</h2>
<p>صيّر صفحات كاملة مسبقًا لتنقّل فوري:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">usePrerenderPrediction</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [prerendering, setPrerendering] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> predictNextPage = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Use analytics or ML to predict next page</span>
    <span class="hljs-keyword">const</span> predictions = <span class="hljs-title function_">analyzeUserBehavior</span>();
    <span class="hljs-keyword">const</span> mostLikely = predictions[<span class="hljs-number">0</span>];

    <span class="hljs-keyword">if</span> (mostLikely &amp;&amp; mostLikely.<span class="hljs-property">probability</span> &gt; <span class="hljs-number">0.7</span>) {
      <span class="hljs-title function_">prerenderPage</span>(mostLikely.<span class="hljs-property">url</span>);
      <span class="hljs-title function_">setPrerendering</span>(mostLikely.<span class="hljs-property">url</span>);
    }
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">prerenderPage</span> = (<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// Check if Speculation Rules API is supported</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">HTMLScriptElement</span>.<span class="hljs-property">supports</span>?.(<span class="hljs-string">&#x27;speculationrules&#x27;</span>)) {
      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;speculationrules&#x27;</span>;
      script.<span class="hljs-property">textContent</span> = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
        <span class="hljs-attr">prerender</span>: [
          {
            <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;list&#x27;</span>,
            <span class="hljs-attr">urls</span>: [url],
          },
        ],
      });
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Fallback to prefetch</span>
      <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
      link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;prefetch&#x27;</span>;
      link.<span class="hljs-property">href</span> = url;
      link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;document&#x27;</span>;
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);
    }
  };

  <span class="hljs-keyword">return</span> { predictNextPage, prerendering };
};
</code></pre>
<h2 id="التحميل-المسبق-للوحدات-مع-تقسيم-الشيفرة">التحميل المسبق للوحدات مع تقسيم الشيفرة</h2>
<p>حسّن الحزم المقسّمة بالاعتماد على modulepreload:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">ModulePreloader</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preload critical modules</span>
    <span class="hljs-keyword">const</span> modules = [<span class="hljs-string">&#x27;/js/vendor.chunk.js&#x27;</span>, <span class="hljs-string">&#x27;/js/framework.chunk.js&#x27;</span>, <span class="hljs-string">&#x27;/js/main.chunk.js&#x27;</span>];

    modules.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-variable language_">module</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
      link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;modulepreload&#x27;</span>;
      link.<span class="hljs-property">href</span> = <span class="hljs-variable language_">module</span>;
      link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;script&#x27;</span>;
      link.<span class="hljs-property">crossOrigin</span> = <span class="hljs-string">&#x27;anonymous&#x27;</span>;
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);
    });
  }, []);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
};

<span class="hljs-comment">// Webpack configuration for modulepreload</span>
<span class="hljs-keyword">const</span> webpackConfig = {
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">crossOriginLoading</span>: <span class="hljs-string">&#x27;anonymous&#x27;</span>,
  },
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">splitChunks</span>: {
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
      <span class="hljs-attr">cacheGroups</span>: {
        <span class="hljs-attr">vendor</span>: {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\\\/]node_modules[\\\\/]/</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vendor&#x27;</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">10</span>,
        },
        <span class="hljs-attr">framework</span>: {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\\\/]node_modules[\\\\/](react|react-dom)[\\\\/]/</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;framework&#x27;</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">20</span>,
        },
      },
    },
  },
};
</code></pre>
<h2 id="التكامل-مع-resource-timing-api">التكامل مع Resource Timing API</h2>
<p>راقب أثر تلميحات الموارد لديك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ResourceTimingMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">PerformanceResourceTiming</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">startMonitoring</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">entryType</span> === <span class="hljs-string">&#x27;resource&#x27;</span>) {
          <span class="hljs-keyword">const</span> resource = entry <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceResourceTiming</span>;
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(resource.<span class="hljs-property">name</span>, resource);
          <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyzeResource</span>(resource);
        }
      }
    });

    observer.<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;resource&#x27;</span>] });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">analyzeResource</span>(<span class="hljs-params"><span class="hljs-attr">resource</span>: <span class="hljs-title class_">PerformanceResourceTiming</span></span>) {
    <span class="hljs-keyword">const</span> metrics = {
      <span class="hljs-attr">dns</span>: resource.<span class="hljs-property">domainLookupEnd</span> - resource.<span class="hljs-property">domainLookupStart</span>,
      <span class="hljs-attr">tcp</span>: resource.<span class="hljs-property">connectEnd</span> - resource.<span class="hljs-property">connectStart</span>,
      <span class="hljs-attr">ttfb</span>: resource.<span class="hljs-property">responseStart</span> - resource.<span class="hljs-property">fetchStart</span>,
      <span class="hljs-attr">download</span>: resource.<span class="hljs-property">responseEnd</span> - resource.<span class="hljs-property">responseStart</span>,
      <span class="hljs-attr">total</span>: resource.<span class="hljs-property">responseEnd</span> - resource.<span class="hljs-property">fetchStart</span>,
    };

    <span class="hljs-comment">// Check if preconnect helped</span>
    <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">dns</span> === <span class="hljs-number">0</span> &amp;&amp; metrics.<span class="hljs-property">tcp</span> === <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`✅ Preconnect worked for <span class="hljs-subst">\${<span class="hljs-keyword">new</span> URL(resource.name).origin}</span>\`</span>);
    }

    <span class="hljs-comment">// Check if resource was cached</span>
    <span class="hljs-keyword">if</span> (resource.<span class="hljs-property">transferSize</span> === <span class="hljs-number">0</span> &amp;&amp; resource.<span class="hljs-property">decodedBodySize</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`✅ Resource cached: <span class="hljs-subst">\${resource.name}</span>\`</span>);
    }

    <span class="hljs-comment">// Alert on slow resources</span>
    <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">total</span> &gt; <span class="hljs-number">1000</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`⚠️ Slow resource: <span class="hljs-subst">\${resource.name}</span> took <span class="hljs-subst">\${metrics.total}</span>ms\`</span>);
    }
  }

  <span class="hljs-title function_">getMetrics</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">values</span>()).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> ({
      <span class="hljs-attr">name</span>: r.<span class="hljs-property">name</span>,
      <span class="hljs-attr">duration</span>: r.<span class="hljs-property">duration</span>,
      <span class="hljs-attr">size</span>: r.<span class="hljs-property">transferSize</span>,
      <span class="hljs-attr">cached</span>: r.<span class="hljs-property">transferSize</span> === <span class="hljs-number">0</span> &amp;&amp; r.<span class="hljs-property">decodedBodySize</span> &gt; <span class="hljs-number">0</span>,
      <span class="hljs-attr">protocol</span>: r.<span class="hljs-property">nextHopProtocol</span>,
    }));
  }
}
</code></pre>
<h2 id="استراتيجية-التحميل-التكيفي">استراتيجية التحميل التكيّفي</h2>
<p>اضبط استراتيجية التحميل بناءً على الجهاز والشبكة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useAdaptiveLoading</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [strategy, setStrategy] = useState&lt;<span class="hljs-string">&#x27;aggressive&#x27;</span> | <span class="hljs-string">&#x27;balanced&#x27;</span> | <span class="hljs-string">&#x27;conservative&#x27;</span>&gt;(<span class="hljs-string">&#x27;balanced&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> connection = (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>;
    <span class="hljs-keyword">const</span> memory = (performance <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">memory</span>;

    <span class="hljs-comment">// Determine strategy based on conditions</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">determineStrategy</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-comment">// Check network</span>
      <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">saveData</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;conservative&#x27;</span>;
      }

      <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">effectiveType</span> === <span class="hljs-string">&#x27;4g&#x27;</span> &amp;&amp; connection?.<span class="hljs-property">rtt</span> &lt; <span class="hljs-number">50</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;aggressive&#x27;</span>;
      }

      <span class="hljs-comment">// Check memory</span>
      <span class="hljs-keyword">if</span> (memory?.<span class="hljs-property">usedJSHeapSize</span> / memory?.<span class="hljs-property">jsHeapSizeLimit</span> &gt; <span class="hljs-number">0.9</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;conservative&#x27;</span>;
      }

      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;balanced&#x27;</span>;
    };

    <span class="hljs-title function_">setStrategy</span>(<span class="hljs-title function_">determineStrategy</span>());

    <span class="hljs-comment">// Listen for changes</span>
    connection?.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setStrategy</span>(<span class="hljs-title function_">determineStrategy</span>());
    });
  }, []);

  <span class="hljs-keyword">return</span> strategy;
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AdaptiveResourceLoader</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> strategy = <span class="hljs-title function_">useAdaptiveLoading</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">getResourceHints</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">switch</span> (strategy) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;aggressive&#x27;</span>:
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">preconnect</span>: [<span class="hljs-string">&#x27;api&#x27;</span>, <span class="hljs-string">&#x27;cdn&#x27;</span>, <span class="hljs-string">&#x27;analytics&#x27;</span>, <span class="hljs-string">&#x27;fonts&#x27;</span>],
          <span class="hljs-attr">preload</span>: [<span class="hljs-string">&#x27;critical.css&#x27;</span>, <span class="hljs-string">&#x27;main.js&#x27;</span>, <span class="hljs-string">&#x27;hero.webp&#x27;</span>],
          <span class="hljs-attr">prefetch</span>: [<span class="hljs-string">&#x27;next-page.html&#x27;</span>, <span class="hljs-string">&#x27;next-bundle.js&#x27;</span>],
          <span class="hljs-attr">modulepreload</span>: <span class="hljs-literal">true</span>
        };

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;conservative&#x27;</span>:
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">preconnect</span>: [<span class="hljs-string">&#x27;api&#x27;</span>],
          <span class="hljs-attr">preload</span>: [<span class="hljs-string">&#x27;critical.css&#x27;</span>],
          <span class="hljs-attr">prefetch</span>: [],
          <span class="hljs-attr">modulepreload</span>: <span class="hljs-literal">false</span>
        };

      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">preconnect</span>: [<span class="hljs-string">&#x27;api&#x27;</span>, <span class="hljs-string">&#x27;cdn&#x27;</span>],
          <span class="hljs-attr">preload</span>: [<span class="hljs-string">&#x27;critical.css&#x27;</span>, <span class="hljs-string">&#x27;main.js&#x27;</span>],
          <span class="hljs-attr">prefetch</span>: [<span class="hljs-string">&#x27;next-page.html&#x27;</span>],
          <span class="hljs-attr">modulepreload</span>: <span class="hljs-literal">true</span>
        };
    }
  };

  <span class="hljs-keyword">const</span> hints = <span class="hljs-title function_">getResourceHints</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {hints.preconnect.map(domain =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{domain}</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;preconnect&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">https:</span>//\${<span class="hljs-attr">domain</span>}<span class="hljs-attr">.example.com</span>\`} /&gt;</span>
      ))}
      {hints.preload.map(resource =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{resource}</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;preload&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>\`/\${<span class="hljs-attr">resource</span>}\`} <span class="hljs-attr">as</span>=<span class="hljs-string">{getResourceType(resource)}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
};
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>استخدم fetchpriority بحكمة:</strong></p>
<ul>
<li>أولوية عالية لصور LCP والموارد الحرجة</li>
<li>أولوية منخفضة للمحتوى أسفل الطية</li>
<li>أولوية تلقائية لكل ما عدا ذلك</li>
</ul>
<p>✅ <strong>حمّل الموارد الحرجة مسبقًا:</strong></p>
<ul>
<li>الخطوط المستخدمة أعلى الطية</li>
<li>CSS الحرج</li>
<li>صور الغلاف الرئيسية</li>
<li>استدعاءات API المهمة</li>
</ul>
<p>✅ <strong>سبق الاتصال بالأصول (origins):</strong></p>
<ul>
<li>خوادم API</li>
<li>نطاقات CDN</li>
<li>خدمات الطرف الثالث الحرجة</li>
<li>اقتصر على نطاقين أو ثلاثة</li>
</ul>
<p>✅ <strong>اجلب مسبقًا بذكاء:</strong></p>
<ul>
<li>التنقّل التالي المحتمل</li>
<li>الموارد الظاهرة في منطقة العرض</li>
<li>بناءً على أنماط سلوك المستخدم</li>
</ul>
<p>✅ <strong>راقب الأثر:</strong></p>
<ul>
<li>استخدم Resource Timing API</li>
<li>تتبّع Core Web Vitals</li>
<li>قِس التحسّن الفعلي مقابل المتوقّع</li>
</ul>
<p>✅ <strong>تكيّف مع الظروف:</strong></p>
<ul>
<li>احترم ترويسة Save-Data</li>
<li>اضبط الإعداد للاتصالات البطيئة</li>
<li>راعِ ذاكرة الجهاز</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
