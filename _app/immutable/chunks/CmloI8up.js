const s="kinney",a="react-typescript",n="React مع TypeScript",l="resource-preloading-apis-types",p="التحميل المسبق للمصادر بأنواع API",t=[{depth:2,id:"فهم-واجهات-التحميل-المسبق",text:"فهم واجهات التحميل المسبق"},{depth:2,id:"إنشاء-تعريفات-مصادر-آمنة-الأنواع",text:"إنشاء تعريفات مصادر آمنة الأنواع"},{depth:2,id:"بناء-مدير-مزالة-الازدواج",text:"بناء مدير مزالة الازدواج"},{depth:2,id:"إنشاء-خطافات-react-لتحميل-المصادر",text:"إنشاء خُطّافات React لتحميل المصادر"},{depth:2,id:"أنماط-استعمال-من-الواقع",text:"أنماط استعمال من الواقع"},{depth:2,id:"استراتيجيات-متقدمة-لتحميل-المصادر",text:"استراتيجيات متقدمة لتحميل المصادر"},{depth:2,id:"التصحيح-والاندماج-في-أدوات-المطور",text:"التصحيح والاندماج في أدوات المطوّر"},{depth:2,id:"اعتبارات-الأداء-وأفضل-الممارسات",text:"اعتبارات الأداء وأفضل الممارسات"},{depth:3,id:"أثر-الذاكرة-وعرض-النطاق",text:"أثر الذاكرة وعرض النطاق"},{depth:3,id:"ترتيب-أولوية-المصادر-الحرجة",text:"ترتيب أولوية المصادر الحرجة"},{depth:2,id:"اختبار-تحميل-المصادر",text:"اختبار تحميل المصادر"}],e=`<p>أداء الويب لا يخص الخوادم السريعة والحزم المُحسَّنة وحده — بل تحميل المصادر الصحيحة في الوقت الصحيح. تتيح لك واجهات التحميل المسبق للمصادر في React (<code>preload</code> و<code>preinit</code> و<code>prefetch</code>) ضبطَ متى وكيف تُجلب الكتلة الحرجة من الموجودات، لكن من دون تهيئة TypeScript سليمة قد يجدك الأمر تحمّل ورقة الأنماط نفسها مرتين أو تحميلًا مسبقًا لسكربت بأولوية خاطئة. لنبنِ مساعدات آمنة الأنواع تجعل التحميلَ المسبق مصادرَ موثوقًا وأريحًا للمطوّر.</p>
<p>التحميل المسبق للمصادر في جوهره إرشادات للنطاري (browser): «سأعرف أنك ستحتاج هذا الخط بعد مللي ثوانٍ قليلة، فابدأَ جلبَه الآن» أو «ستُستخدم وحدةُ JavaScript هذه على الصفحة التالية قطعًا، فالتطُتها في لحظة فراغ». والتحدي هو تنسيق هذه الإرشادات عبر تطبيقك دون خلق طلبات مكررة أو أولويات متعارضة.</p>
<h2 id="فهم-واجهات-التحميل-المسبق">فهم واجهات التحميل المسبق</h2>
<p>قدّم React 19 ثلاث واجهات متكاملة لإدارة المصادر:</p>
<ul>
<li><strong><code>preload</code></strong>: اجلب المصادر التي ستحتاجها قريبًا (أوراق الأنماط، والخطوط، والصور)</li>
<li><strong><code>preinit</code></strong>: حمّل وابدأ المصادر فورًا (السكربتات الحرجة، أوراق الأنماط)</li>
<li><strong><code>prefetch</code></strong>: خزّن المصادر مؤقتًا حين تيسر استعدادًا للتصفح القادم</li>
</ul>
<p>لكل منها استراتيجية أداء مختلفة، لكنها كلها تشترك في حاجة إلى تمييز متّسق للمصادر وأن يُزال الازدواج عنها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload, preinit, prefetch } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-comment">// Preload a stylesheet we&#x27;ll need shortly</span>
<span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/styles/article.css&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;style&#x27;</span> });

<span class="hljs-comment">// Initialize critical JavaScript immediately</span>
<span class="hljs-title function_">preinit</span>(<span class="hljs-string">&#x27;/js/analytics.js&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;script&#x27;</span> });

<span class="hljs-comment">// Prefetch resources for the next page</span>
<span class="hljs-title function_">prefetch</span>(<span class="hljs-string">&#x27;/api/user/preferences&#x27;</span>);
</code></pre>
<p>الجزء الشاق ليس نداءات الواجهات بحد ذاتها — بل إدارتها بانتظام عبر تطبيقك دون تعارض أو طلبات زائدة.</p>
<h2 id="إنشاء-تعريفات-مصادر-آمنة-الأنواع">إنشاء تعريفات مصادر آمنة الأنواع</h2>
<p>لنبدأ بتعريف أنواع المصادر عندنا. نريد أمانًا عند وقت التصريف لعناوين URL للمصادر واستراتيجيات التحميل والأولويات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Resource types with specific constraints</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ResourceType</span> = <span class="hljs-string">&#x27;script&#x27;</span> | <span class="hljs-string">&#x27;style&#x27;</span> | <span class="hljs-string">&#x27;font&#x27;</span> | <span class="hljs-string">&#x27;image&#x27;</span> | <span class="hljs-string">&#x27;fetch&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoadingStrategy</span> = <span class="hljs-string">&#x27;preload&#x27;</span> | <span class="hljs-string">&#x27;preinit&#x27;</span> | <span class="hljs-string">&#x27;prefetch&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ResourceDefinition</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">type</span>: <span class="hljs-title class_">ResourceType</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">strategy</span>: <span class="hljs-title class_">LoadingStrategy</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">priority</span>?: <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;auto&#x27;</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">crossOrigin</span>?: <span class="hljs-string">&#x27;anonymous&#x27;</span> | <span class="hljs-string">&#x27;use-credentials&#x27;</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">integrity</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Type-safe resource catalog</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">RESOURCES</span> = {
  <span class="hljs-comment">// Critical CSS that should initialize immediately</span>
  <span class="hljs-attr">criticalStyles</span>: {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;/css/critical.css&#x27;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;style&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;preinit&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  },
  <span class="hljs-comment">// Fonts we&#x27;ll need for above-the-fold content</span>
  <span class="hljs-attr">primaryFont</span>: {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;/fonts/inter-var.woff2&#x27;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;font&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;preload&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">crossOrigin</span>: <span class="hljs-string">&#x27;anonymous&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  },
  <span class="hljs-comment">// Analytics script for initialization</span>
  <span class="hljs-attr">analytics</span>: {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;/js/analytics.bundle.js&#x27;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;script&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">strategy</span>: <span class="hljs-string">&#x27;preinit&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">integrity</span>: <span class="hljs-string">&#x27;sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC&#x27;</span>,
  },
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span> <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">ResourceDefinition</span>&gt;;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ResourceKey</span> = keyof <span class="hljs-keyword">typeof</span> <span class="hljs-variable constant_">RESOURCES</span>;
</code></pre>
<p>يجلب لنا هذا النهج مزايا عدّة: فمفهرس المصادر هو مصدر الحق الوحيد، ويمنع TypeScript الأخطاءَ المطبعية في مفاتيح المصادر، ويمكننا إلزام الاتساق في استراتيجيات التحميل.</p>
<h2 id="بناء-مدير-مزالة-الازدواج">بناء مدير مزالة الازدواج</h2>
<p>أكبر فخّ في واجهات التحميل المسبق هو تحميل المصدر نفسه مراتٍ عدّة. لنتكشف مديرًا يتتبّع ما حُمِّل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ResourceManager</span> {
  <span class="hljs-keyword">private</span> loadedResources = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;();
  <span class="hljs-keyword">private</span> loadingPromises = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;&gt;();

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">getResourceKey</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">strategy</span>: <span class="hljs-title class_">LoadingStrategy</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${strategy}</span>:<span class="hljs-subst">\${url}</span>\`</span>;
  }

  <span class="hljs-keyword">async</span> loadResource&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ResourceKey</span>&gt;(<span class="hljs-attr">key</span>: T, <span class="hljs-attr">options</span>?: { <span class="hljs-attr">force</span>?: <span class="hljs-built_in">boolean</span> }): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">const</span> resource = <span class="hljs-variable constant_">RESOURCES</span>[key];
    <span class="hljs-keyword">const</span> resourceKey = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getResourceKey</span>(resource.<span class="hljs-property">url</span>, resource.<span class="hljs-property">strategy</span>);

    <span class="hljs-comment">// Skip if already loaded (unless forced)</span>
    <span class="hljs-keyword">if</span> (!options?.<span class="hljs-property">force</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedResources</span>.<span class="hljs-title function_">has</span>(resourceKey)) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Return existing promise if loading is in progress</span>
    <span class="hljs-keyword">const</span> existingPromise = <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">get</span>(resourceKey);
    <span class="hljs-keyword">if</span> (existingPromise) {
      <span class="hljs-keyword">return</span> existingPromise;
    }

    <span class="hljs-comment">// Create new loading promise</span>
    <span class="hljs-keyword">const</span> loadingPromise = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">executeLoad</span>(resource);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">set</span>(resourceKey, loadingPromise);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> loadingPromise;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedResources</span>.<span class="hljs-title function_">add</span>(resourceKey);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">delete</span>(resourceKey);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">executeLoad</span>(<span class="hljs-attr">resource</span>: <span class="hljs-title class_">ResourceDefinition</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">const</span> { url, <span class="hljs-keyword">type</span>, strategy, priority, crossOrigin, integrity } = resource;

    <span class="hljs-keyword">switch</span> (strategy) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;preload&#x27;</span>:
        <span class="hljs-title function_">preload</span>(url, {
          <span class="hljs-attr">as</span>: <span class="hljs-keyword">type</span>,
          ...(priority &amp;&amp; { <span class="hljs-attr">fetchPriority</span>: priority }),
          ...(crossOrigin &amp;&amp; { crossOrigin }),
          ...(integrity &amp;&amp; { integrity }),
        });
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;preinit&#x27;</span>:
        <span class="hljs-title function_">preinit</span>(url, {
          <span class="hljs-attr">as</span>: <span class="hljs-keyword">type</span>,
          ...(priority &amp;&amp; { <span class="hljs-attr">fetchPriority</span>: priority }),
          ...(crossOrigin &amp;&amp; { crossOrigin }),
          ...(integrity &amp;&amp; { integrity }),
        });
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;prefetch&#x27;</span>:
        <span class="hljs-title function_">prefetch</span>(url);
        <span class="hljs-keyword">break</span>;
    }
  }

  <span class="hljs-comment">// Check loading state</span>
  <span class="hljs-title function_">isLoaded</span>(<span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">const</span> resource = <span class="hljs-variable constant_">RESOURCES</span>[key];
    <span class="hljs-keyword">const</span> resourceKey = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getResourceKey</span>(resource.<span class="hljs-property">url</span>, resource.<span class="hljs-property">strategy</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedResources</span>.<span class="hljs-title function_">has</span>(resourceKey);
  }

  <span class="hljs-title function_">isLoading</span>(<span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">const</span> resource = <span class="hljs-variable constant_">RESOURCES</span>[key];
    <span class="hljs-keyword">const</span> resourceKey = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getResourceKey</span>(resource.<span class="hljs-property">url</span>, resource.<span class="hljs-property">strategy</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">has</span>(resourceKey);
  }
}

<span class="hljs-comment">// Singleton instance</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> resourceManager = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ResourceManager</span>();
</code></pre>
<h2 id="إنشاء-خطافات-react-لتحميل-المصادر">إنشاء خُطّافات React لتحميل المصادر</h2>
<p>الآن لفها في خُطّافات React تبدو طبيعية الاستعمال في المكوّنات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useResourceLoader</span>(<span class="hljs-params"><span class="hljs-attr">resources</span>: <span class="hljs-title class_">ResourceKey</span>[], <span class="hljs-attr">options</span>?: { eager?: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">const</span> [loadingStates, setLoadingStates] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span>
    resources.<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">acc, key</span>) =&gt;</span> ({
        ...acc,
        [key]: resourceManager.<span class="hljs-title function_">isLoaded</span>(key) ? <span class="hljs-string">&#x27;loaded&#x27;</span> : <span class="hljs-string">&#x27;pending&#x27;</span>,
      }),
      {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">ResourceKey</span>, <span class="hljs-string">&#x27;pending&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;loaded&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>&gt;,
    ),
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!options?.<span class="hljs-property">eager</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadResources</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> loadPromises = resources.<span class="hljs-title function_">map</span>(<span class="hljs-title function_">async</span> (key) =&gt; {
        <span class="hljs-keyword">if</span> (resourceManager.<span class="hljs-title function_">isLoaded</span>(key)) <span class="hljs-keyword">return</span>;

        <span class="hljs-title function_">setLoadingStates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: <span class="hljs-string">&#x27;loading&#x27;</span> }));

        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">await</span> resourceManager.<span class="hljs-title function_">loadResource</span>(key);
          <span class="hljs-title function_">setLoadingStates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: <span class="hljs-string">&#x27;loaded&#x27;</span> }));
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Failed to load resource: <span class="hljs-subst">\${key}</span>\`</span>, error);
          <span class="hljs-title function_">setLoadingStates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: <span class="hljs-string">&#x27;error&#x27;</span> }));
        }
      });

      <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(loadPromises);
    };

    <span class="hljs-title function_">loadResources</span>();
  }, [resources, options?.<span class="hljs-property">eager</span>]);

  <span class="hljs-keyword">return</span> {
    loadingStates,
    <span class="hljs-attr">isLoading</span>: <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(loadingStates).<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state === <span class="hljs-string">&#x27;loading&#x27;</span>),
    <span class="hljs-attr">isLoaded</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span></span>) =&gt;</span> loadingStates[key] === <span class="hljs-string">&#x27;loaded&#x27;</span>,
    <span class="hljs-attr">loadResource</span>: <span class="hljs-title function_">async</span> (<span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>) =&gt; {
      <span class="hljs-keyword">if</span> (resourceManager.<span class="hljs-title function_">isLoaded</span>(key)) <span class="hljs-keyword">return</span>;

      <span class="hljs-title function_">setLoadingStates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: <span class="hljs-string">&#x27;loading&#x27;</span> }));

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> resourceManager.<span class="hljs-title function_">loadResource</span>(key);
        <span class="hljs-title function_">setLoadingStates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: <span class="hljs-string">&#x27;loaded&#x27;</span> }));
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-title function_">setLoadingStates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [key]: <span class="hljs-string">&#x27;error&#x27;</span> }));
        <span class="hljs-keyword">throw</span> error;
      }
    },
  };
}

<span class="hljs-comment">// Hook for conditional resource loading</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useConditionalResources</span>(<span class="hljs-params"><span class="hljs-attr">condition</span>: <span class="hljs-built_in">boolean</span>, <span class="hljs-attr">resources</span>: <span class="hljs-title class_">ResourceKey</span>[]</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useResourceLoader</span>(condition ? resources : [], { <span class="hljs-attr">eager</span>: condition });
}
</code></pre>
<h2 id="أنماط-استعمال-من-الواقع">أنماط استعمال من الواقع</h2>
<p>هكذا تعمل هذه الخُطّافات عمليًا عبر سيناريوهات مكوّنة مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Layout component that preloads critical resources</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppLayout</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-comment">// Eagerly load critical resources</span>
  <span class="hljs-keyword">const</span> { isLoading } = <span class="hljs-title function_">useResourceLoader</span>([<span class="hljs-string">&#x27;criticalStyles&#x27;</span>, <span class="hljs-string">&#x27;primaryFont&#x27;</span>, <span class="hljs-string">&#x27;analytics&#x27;</span>], {
    <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;app-layout&quot;</span>&gt;</span>
      {isLoading &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-indicator&quot;</span> /&gt;</span>}
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Article page that conditionally loads fonts</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ArticlePage</span>(<span class="hljs-params">{ hasCustomFont }: { hasCustomFont: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">const</span> { loadResource, isLoaded } = <span class="hljs-title function_">useConditionalResources</span>(hasCustomFont, [<span class="hljs-string">&#x27;primaryFont&#x27;</span>]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Load additional resources based on user interaction</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUserScroll</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">scrollY</span> &gt; <span class="hljs-number">100</span>) {
        <span class="hljs-title function_">loadResource</span>(<span class="hljs-string">&#x27;analytics&#x27;</span>);
      }
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleUserScroll);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleUserScroll);
  }, [loadResource]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{hasCustomFont</span> &amp;&amp; <span class="hljs-attr">isLoaded</span>(&#x27;<span class="hljs-attr">primaryFont</span>&#x27;) ? &#x27;<span class="hljs-attr">custom-font</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>
      {/* Article content */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Navigation component that prefetches next pages</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Navigation</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { loadResource } = <span class="hljs-title function_">useResourceLoader</span>([]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleLinkHover</span> = (<span class="hljs-params"><span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// Prefetch resources for likely next navigation</span>
    <span class="hljs-keyword">if</span> (href.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>)) {
      <span class="hljs-title function_">loadResource</span>(<span class="hljs-string">&#x27;dashboardStyles&#x27;</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/dashboard&quot;</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{()</span> =&gt;</span> handleLinkHover(&#x27;/dashboard&#x27;)}&gt;
        Dashboard
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استراتيجيات-متقدمة-لتحميل-المصادر">استراتيجيات متقدمة لتحميل المصادر</h2>
<p>أحيانًا تحتاج منطق تحميل أكثر تعقيدًا. هذه بعض الأنماط للتعامل مع السيناريوهات المركّبة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Priority-based loading manager</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">PriorityResourceManager</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">ResourceManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">priorityQueue</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>; <span class="hljs-attr">priority</span>: <span class="hljs-built_in">number</span> }&gt; = [];

  <span class="hljs-title function_">queueResource</span>(<span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>, <span class="hljs-attr">priority</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isLoaded</span>(key) || <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isLoading</span>(key)) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">priorityQueue</span>.<span class="hljs-title function_">push</span>({ key, priority });
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">priorityQueue</span>.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">priority</span> - a.<span class="hljs-property">priority</span>);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">processQueue</span>(<span class="hljs-attr">maxConcurrent</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">3</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">const</span> batch = <span class="hljs-variable language_">this</span>.<span class="hljs-property">priorityQueue</span>.<span class="hljs-title function_">splice</span>(<span class="hljs-number">0</span>, maxConcurrent);

    <span class="hljs-keyword">const</span> loadPromises = batch.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">{ key }</span>) =&gt;</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadResource</span>(key).<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span>
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Priority loading failed for <span class="hljs-subst">\${key}</span>:\`</span>, error),
      ),
    );

    <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(loadPromises);

    <span class="hljs-comment">// Process next batch if queue has items</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">priorityQueue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>(maxConcurrent);
    }
  }
}

<span class="hljs-comment">// Connection-aware loading</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useConnectionAwareLoading</span>(<span class="hljs-params"><span class="hljs-attr">resources</span>: <span class="hljs-title class_">ResourceKey</span>[]</span>) {
  <span class="hljs-keyword">const</span> [connectionInfo, setConnectionInfo] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-string">&#x27;connection&#x27;</span> <span class="hljs-keyword">in</span> navigator
      ? {
          <span class="hljs-attr">effectiveType</span>: (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>?.<span class="hljs-property">effectiveType</span>,
          <span class="hljs-attr">saveData</span>: (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>?.<span class="hljs-property">saveData</span>,
        }
      : <span class="hljs-literal">null</span>,
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateConnection</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;connection&#x27;</span> <span class="hljs-keyword">in</span> navigator) {
        <span class="hljs-title function_">setConnectionInfo</span>({
          <span class="hljs-attr">effectiveType</span>: (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>?.<span class="hljs-property">effectiveType</span>,
          <span class="hljs-attr">saveData</span>: (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>?.<span class="hljs-property">saveData</span>,
        });
      }
    };

    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;connection&#x27;</span> <span class="hljs-keyword">in</span> navigator) {
      (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, updateConnection);
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, updateConnection);
    }
  }, []);

  <span class="hljs-keyword">const</span> shouldPreload =
    !connectionInfo?.<span class="hljs-property">saveData</span> &amp;&amp; [<span class="hljs-string">&#x27;4g&#x27;</span>, <span class="hljs-string">&#x27;3g&#x27;</span>].<span class="hljs-title function_">includes</span>(connectionInfo?.<span class="hljs-property">effectiveType</span>);

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useResourceLoader</span>(shouldPreload ? resources : [], { <span class="hljs-attr">eager</span>: shouldPreload });
}
</code></pre>
<h2 id="التصحيح-والاندماج-في-أدوات-المطور">التصحيح والاندماج في أدوات المطوّر</h2>
<p>قد يكون تصحيح التحميل المسبق للمصادر عسيرًا. لنضف بعض التحسينات لتجربة المطوّر:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Development-only resource monitor</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ResourceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-attr">instance</span>: <span class="hljs-title class_">ResourceMonitor</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">logs</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
    <span class="hljs-attr">action</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">resource</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">details</span>?: <span class="hljs-built_in">any</span>;
  }&gt; = [];

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getInstance</span>(): <span class="hljs-title class_">ResourceMonitor</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">ResourceMonitor</span>.<span class="hljs-property">instance</span>) {
      <span class="hljs-title class_">ResourceMonitor</span>.<span class="hljs-property">instance</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ResourceMonitor</span>();
    }
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">ResourceMonitor</span>.<span class="hljs-property">instance</span>;
  }

  <span class="hljs-title function_">log</span>(<span class="hljs-attr">action</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">resource</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;development&#x27;</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">logs</span>.<span class="hljs-title function_">push</span>({
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      action,
      resource,
      details,
    });

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">\`🚀 Resource <span class="hljs-subst">\${action}</span>: <span class="hljs-subst">\${resource}</span>\`</span>);
    <span class="hljs-keyword">if</span> (details) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Details:&#x27;</span>, details);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Time:&#x27;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>());
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();
  }

  <span class="hljs-title function_">getDuplicateLoads</span>(): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> loadCounts = <span class="hljs-variable language_">this</span>.<span class="hljs-property">logs</span>.<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">acc, log</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (log.<span class="hljs-property">action</span> === <span class="hljs-string">&#x27;load&#x27;</span>) {
          acc[log.<span class="hljs-property">resource</span>] = (acc[log.<span class="hljs-property">resource</span>] || <span class="hljs-number">0</span>) + <span class="hljs-number">1</span>;
        }
        <span class="hljs-keyword">return</span> acc;
      },
      {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;,
    );

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(loadCounts)
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">[, count]</span>) =&gt;</span> count &gt; <span class="hljs-number">1</span>)
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[resource]</span>) =&gt;</span> resource);
  }

  <span class="hljs-title function_">getLoadingStats</span>(): <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">logs</span>.<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">acc, log</span>) =&gt;</span> {
        acc[log.<span class="hljs-property">action</span>] = (acc[log.<span class="hljs-property">action</span>] || <span class="hljs-number">0</span>) + <span class="hljs-number">1</span>;
        <span class="hljs-keyword">return</span> acc;
      },
      {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;,
    );
  }
}

<span class="hljs-comment">// Enhanced resource manager with monitoring</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MonitoredResourceManager</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">ResourceManager</span> {
  <span class="hljs-keyword">private</span> monitor = <span class="hljs-title class_">ResourceMonitor</span>.<span class="hljs-title function_">getInstance</span>();

  <span class="hljs-keyword">async</span> loadResource&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ResourceKey</span>&gt;(<span class="hljs-attr">key</span>: T, <span class="hljs-attr">options</span>?: { <span class="hljs-attr">force</span>?: <span class="hljs-built_in">boolean</span> }): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">monitor</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;requested&#x27;</span>, key, { <span class="hljs-attr">force</span>: options?.<span class="hljs-property">force</span> });

    <span class="hljs-keyword">if</span> (!options?.<span class="hljs-property">force</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isLoaded</span>(key)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">monitor</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;skipped&#x27;</span>, key, { <span class="hljs-attr">reason</span>: <span class="hljs-string">&#x27;already loaded&#x27;</span> });
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">monitor</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;loading&#x27;</span>, key);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">super</span>.<span class="hljs-title function_">loadResource</span>(key, options);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">monitor</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;loaded&#x27;</span>, key);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">monitor</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;failed&#x27;</span>, key, { <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> });
      <span class="hljs-keyword">throw</span> error;
    }
  }
}
</code></pre>
<h2 id="اعتبارات-الأداء-وأفضل-الممارسات">اعتبارات الأداء وأفضل الممارسات</h2>
<p>التحميل المسبق للمصادر قوي، لكنه يأتي بمفاضلاتٍ ينبغي أن تفهمها:</p>
<h3 id="أثر-الذاكرة-وعرض-النطاق">أثر الذاكرة وعرض النطاق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Aggressive preloading can hurt performance</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">BAD_PRELOAD_STRATEGY</span> = [
  <span class="hljs-string">&#x27;heavyImage1&#x27;</span>,
  <span class="hljs-string">&#x27;heavyImage2&#x27;</span>,
  <span class="hljs-string">&#x27;heavyImage3&#x27;</span>, <span class="hljs-comment">// 5MB each</span>
  <span class="hljs-string">&#x27;unusedScript1&#x27;</span>,
  <span class="hljs-string">&#x27;unusedScript2&#x27;</span>, <span class="hljs-comment">// User may never see these</span>
  <span class="hljs-string">&#x27;allFonts&#x27;</span>, <span class="hljs-comment">// Loading all font weights when you need one</span>
];

<span class="hljs-comment">// ✅ Strategic preloading based on user behavior</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useSmartPreloading</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { loadResource } = <span class="hljs-title function_">useResourceLoader</span>([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preload based on user intent signals</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMouseMove</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-comment">// User is actively browsing, preload likely next resources</span>
      <span class="hljs-title function_">loadResource</span>(<span class="hljs-string">&#x27;nextPageStyles&#x27;</span>);
    };

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleIdle</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-comment">// Browser is idle, safe to prefetch lower-priority resources</span>
      <span class="hljs-title function_">loadResource</span>(<span class="hljs-string">&#x27;backgroundImage&#x27;</span>);
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;mousemove&#x27;</span>, handleMouseMove);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;requestIdleCallback&#x27;</span>, handleIdle);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;mousemove&#x27;</span>, handleMouseMove);
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;requestIdleCallback&#x27;</span>, handleIdle);
    };
  }, [loadResource]);
}
</code></pre>
<h3 id="ترتيب-أولوية-المصادر-الحرجة">ترتيب أولوية المصادر الحرجة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Resource loading phases</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">LOADING_PHASES</span> = {
  <span class="hljs-attr">critical</span>: [<span class="hljs-string">&#x27;criticalStyles&#x27;</span>, <span class="hljs-string">&#x27;primaryFont&#x27;</span>], <span class="hljs-comment">// Block render</span>
  <span class="hljs-attr">important</span>: [<span class="hljs-string">&#x27;analytics&#x27;</span>, <span class="hljs-string">&#x27;errorTracking&#x27;</span>], <span class="hljs-comment">// Load early</span>
  <span class="hljs-attr">optional</span>: [<span class="hljs-string">&#x27;backgroundImage&#x27;</span>, <span class="hljs-string">&#x27;socialWidgets&#x27;</span>], <span class="hljs-comment">// Load when idle</span>
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePhaseBasedLoading</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [currentPhase, setCurrentPhase] = useState&lt;keyof <span class="hljs-keyword">typeof</span> <span class="hljs-variable constant_">LOADING_PHASES</span>&gt;(<span class="hljs-string">&#x27;critical&#x27;</span>);

  <span class="hljs-comment">// Load critical resources immediately</span>
  <span class="hljs-title function_">useResourceLoader</span>(<span class="hljs-variable constant_">LOADING_PHASES</span>.<span class="hljs-property">critical</span>, { <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> });

  <span class="hljs-comment">// Load important resources after critical ones</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">isLoading</span>: criticalLoading } = <span class="hljs-title function_">useResourceLoader</span>(<span class="hljs-variable constant_">LOADING_PHASES</span>.<span class="hljs-property">critical</span>);
  <span class="hljs-title function_">useResourceLoader</span>(<span class="hljs-variable constant_">LOADING_PHASES</span>.<span class="hljs-property">important</span>, { <span class="hljs-attr">eager</span>: !criticalLoading });

  <span class="hljs-comment">// Load optional resources when idle</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (criticalLoading) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">idleCallback</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setCurrentPhase</span>(<span class="hljs-string">&#x27;optional&#x27;</span>);
    };

    <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(idleCallback, <span class="hljs-number">1000</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timeoutId);
  }, [criticalLoading]);

  <span class="hljs-title function_">useResourceLoader</span>(<span class="hljs-variable constant_">LOADING_PHASES</span>.<span class="hljs-property">optional</span>, { <span class="hljs-attr">eager</span>: currentPhase === <span class="hljs-string">&#x27;optional&#x27;</span> });
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>قد يضر تحميل موارد كثيرة مسبقًا بالأداء فعلًا، إذ تتنافس على عرض النطاق مع المصادر الحرجة. قِس التأثير في مؤشرات الويب الحيوية (Core Web Vitals) دائمًا.</p>
</blockquote>
<h2 id="اختبار-تحميل-المصادر">اختبار تحميل المصادر</h2>
<p>منطق التحميل المسبق للمصادر يحتاج اختبارًا، لكن محاكاة واجهات النطاري قد تكون دقيقة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Test utilities for resource loading</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MockResourceManager</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">ResourceManager</span> {
  <span class="hljs-keyword">public</span> mockLoadPromises = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;&gt;();
  <span class="hljs-keyword">public</span> <span class="hljs-attr">mockLoadCalls</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>; <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span> }&gt; = [];

  <span class="hljs-keyword">async</span> loadResource&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ResourceKey</span>&gt;(<span class="hljs-attr">key</span>: T, <span class="hljs-attr">options</span>?: { <span class="hljs-attr">force</span>?: <span class="hljs-built_in">boolean</span> }): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">mockLoadCalls</span>.<span class="hljs-title function_">push</span>({ key, <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() });

    <span class="hljs-comment">// Simulate loading delay</span>
    <span class="hljs-keyword">const</span> loadPromise = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
      <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">100</span>);
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">mockLoadPromises</span>.<span class="hljs-title function_">set</span>(key, loadPromise);
    <span class="hljs-keyword">return</span> loadPromise;
  }

  <span class="hljs-comment">// Test helpers</span>
  <span class="hljs-title function_">getLoadCallCount</span>(<span class="hljs-attr">key</span>: <span class="hljs-title class_">ResourceKey</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">mockLoadCalls</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">call</span>) =&gt;</span> call.<span class="hljs-property">key</span> === key).<span class="hljs-property">length</span>;
  }

  <span class="hljs-title function_">reset</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">mockLoadCalls</span> = [];
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">mockLoadPromises</span>.<span class="hljs-title function_">clear</span>();
  }
}

<span class="hljs-comment">// Example test</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;useResourceLoader&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">mockManager</span>: <span class="hljs-title class_">MockResourceManager</span>;

  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    mockManager = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MockResourceManager</span>();
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should not load resources multiple times&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> { result } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">useResourceLoader</span>([<span class="hljs-string">&#x27;criticalStyles&#x27;</span>], { <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> }));

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">current</span>.<span class="hljs-title function_">isLoaded</span>(<span class="hljs-string">&#x27;criticalStyles&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
    });

    <span class="hljs-title function_">expect</span>(mockManager.<span class="hljs-title function_">getLoadCallCount</span>(<span class="hljs-string">&#x27;criticalStyles&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">1</span>);
  });
});
</code></pre>
<p>لا يتعين أن يكون التحميل المسبق للمصادر مع TypeScript منبعًا للعلل ومفاجآت الأداء. فبتجريد آمن الأنواع حول واجهات التحميل المسبق في React تحصل على مزايا أداء التحميل الذكي للمصادر مع تلك الثقة التي يمنحها التحقق وقت التصريف ومزالة الازدواج وقت التشغيل.</p>
<p>القواعد الأساسية: عرِّف مصادرك في مفهرس مركزي، واجعل TypeScript يمنع الأخطاء، وامحُ الازدواج بشدة، وقِس أثر الأداء دائمًا. وسيشكر مستخدموك على أزمنة التحميل الأسرع، وستشكرك نفسك المستقبلية على شيفرة يسيرة الصيانة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
