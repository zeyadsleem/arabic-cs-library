const s="kinney",a="react-performance",n="أداء React",l="micro-frontend-performance",p="أداء الواجهات الأمامية المصغّرة (Micro-Frontend)",t=[{depth:2,id:"فهم-تحديات-الأداء-في-الواجهات-الأمامية-المصغرة",text:"فهم تحدّيات الأداء في الواجهات الأمامية المصغّرة"},{depth:2,id:"إعداد-اتحاد-الوحدات-module-federation",text:"إعداد اتحاد الوحدات (Module Federation)"},{depth:2,id:"التحميل-الديناميكي-للوحدات-البعيدة",text:"التحميل الديناميكي للوحدات البعيدة"},{depth:2,id:"تحسين-الاعتمادات-المشتركة",text:"تحسين الاعتمادات المشتركة"},{depth:2,id:"التواصل-بين-الواجهات-الأمامية-المصغرة",text:"التواصل بين الواجهات الأمامية المصغّرة"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"التحسين-وقت-البناء",text:"التحسين وقت البناء"},{depth:2,id:"استراتيجيات-النشر",text:"استراتيجيات النشر"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>تعد الواجهات الأمامية المصغّرة (micro-frontends) بتحكّم الفرق ونشرًا مستقلًا، لكنك إن نفّذتها بإهمال فستصنع كابوسًا في الأداء. فعدة إصدارات من React تُحمَّل في الوقت نفسه، وحزم مورّدين مكرّرة، وكلفة تنسيق وقت التشغيل، وإخفاقات متتالية بين الفرق — المعمارية نفسها التي وُضعت لحلّ مشكلات تنظيمية قد تصنع مشكلات تقنية تُغرق أداء تطبيقك.</p>
<p>لكن إن أحسنت تنفيذ الواجهات الأمامية المصغّرة، فستفتح نطاقًا تنظيميًا وأداءً تقنيًا معًا. تستطيع الفرق تحسين شرائحها باستقلال، وتقلّل الاعتمادات المشتركة حجم الحزمة الإجمالي، ويصبح التحميل المتأخّر طبيعيًا. والمفتاح هو فهم آثار كل نمط من أنماط الواجهات الأمامية المصغّرة على الأداء وتنفيذ التحسينات الصحيحة منذ اليوم الأول. يوضّح لك هذا الدليل كيف تبني واجهات أمامية مصغّرة تكون مستقلة وفعّالة في الأداء في الوقت نفسه.</p>
<h2 id="فهم-تحديات-الأداء-في-الواجهات-الأمامية-المصغرة">فهم تحدّيات الأداء في الواجهات الأمامية المصغّرة</h2>
<p>الخصائص الفريدة لأداء الواجهات الأمامية المصغّرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Micro-frontend performance model</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MicroFrontendPerformance</span> {
  <span class="hljs-comment">// Performance challenges</span>
  <span class="hljs-attr">challenges</span>: {
    <span class="hljs-attr">bundleSize</span>: <span class="hljs-string">&#x27;Multiple framework instances and duplicated code&#x27;</span>;
    <span class="hljs-attr">initialization</span>: <span class="hljs-string">&#x27;Sequential or parallel loading of micro-apps&#x27;</span>;
    <span class="hljs-attr">runtime</span>: <span class="hljs-string">&#x27;Cross-boundary communication overhead&#x27;</span>;
    <span class="hljs-attr">caching</span>: <span class="hljs-string">&#x27;Cache invalidation across independent deployments&#x27;</span>;
    <span class="hljs-attr">coordination</span>: <span class="hljs-string">&#x27;State synchronization between micro-apps&#x27;</span>;
  };

  <span class="hljs-comment">// Performance opportunities</span>
  <span class="hljs-attr">opportunities</span>: {
    <span class="hljs-attr">isolation</span>: <span class="hljs-string">&#x27;Failures contained to single micro-app&#x27;</span>;
    <span class="hljs-attr">caching</span>: <span class="hljs-string">&#x27;Independent cache strategies per micro-app&#x27;</span>;
    <span class="hljs-attr">optimization</span>: <span class="hljs-string">&#x27;Teams can optimize independently&#x27;</span>;
    <span class="hljs-attr">lazyLoading</span>: <span class="hljs-string">&#x27;Load micro-apps on demand&#x27;</span>;
  };

  <span class="hljs-comment">// Key metrics</span>
  <span class="hljs-attr">metrics</span>: {
    <span class="hljs-attr">totalBundleSize</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Combined size of all micro-apps</span>
    <span class="hljs-attr">sharedDependencyRatio</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// % of code that&#x27;s shared</span>
    <span class="hljs-attr">initializationTime</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Time to first interactive micro-app</span>
    <span class="hljs-attr">communicationLatency</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Cross-boundary message time</span>
  };
}

<span class="hljs-comment">// Architecture patterns and their performance impact</span>
<span class="hljs-keyword">const</span> architecturePatterns = {
  <span class="hljs-attr">buildTime</span>: {
    <span class="hljs-attr">performance</span>: <span class="hljs-string">&#x27;Best - single optimized bundle&#x27;</span>,
    <span class="hljs-attr">flexibility</span>: <span class="hljs-string">&#x27;Worst - requires coordinated deploys&#x27;</span>,
    <span class="hljs-attr">useCase</span>: <span class="hljs-string">&#x27;Small teams, infrequent updates&#x27;</span>,
  },
  <span class="hljs-attr">runtime</span>: {
    <span class="hljs-attr">performance</span>: <span class="hljs-string">&#x27;Good - with proper optimization&#x27;</span>,
    <span class="hljs-attr">flexibility</span>: <span class="hljs-string">&#x27;Best - independent deployments&#x27;</span>,
    <span class="hljs-attr">useCase</span>: <span class="hljs-string">&#x27;Large teams, frequent updates&#x27;</span>,
  },
  <span class="hljs-attr">hybrid</span>: {
    <span class="hljs-attr">performance</span>: <span class="hljs-string">&#x27;Very Good - shared vendor, independent apps&#x27;</span>,
    <span class="hljs-attr">flexibility</span>: <span class="hljs-string">&#x27;Good - some coordination needed&#x27;</span>,
    <span class="hljs-attr">useCase</span>: <span class="hljs-string">&#x27;Medium teams, balanced needs&#x27;</span>,
  },
};
</code></pre>
<h2 id="إعداد-اتحاد-الوحدات-module-federation">إعداد اتحاد الوحدات (Module Federation)</h2>
<p>اتحاد وحدات Webpack للتكامل وقت التشغيل:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js - Host application</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ModuleFederationPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;webpack/lib/container/ModuleFederationPlugin&#x27;</span>);
<span class="hljs-keyword">const</span> deps = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;./package.json&#x27;</span>).<span class="hljs-property">dependencies</span>;

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ModuleFederationPlugin</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;host&#x27;</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&#x27;remoteEntry.js&#x27;</span>,
      <span class="hljs-attr">remotes</span>: {
        <span class="hljs-attr">header</span>: <span class="hljs-string">&#x27;header@http://localhost:3001/remoteEntry.js&#x27;</span>,
        <span class="hljs-attr">products</span>: <span class="hljs-string">&#x27;products@http://localhost:3002/remoteEntry.js&#x27;</span>,
        <span class="hljs-attr">checkout</span>: <span class="hljs-string">&#x27;checkout@http://localhost:3003/remoteEntry.js&#x27;</span>,
      },
      <span class="hljs-attr">shared</span>: {
        <span class="hljs-attr">react</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: deps.<span class="hljs-property">react</span>,
          <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-string">&#x27;react-dom&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: deps[<span class="hljs-string">&#x27;react-dom&#x27;</span>],
          <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-string">&#x27;react-router-dom&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: deps[<span class="hljs-string">&#x27;react-router-dom&#x27;</span>],
        },
      },
    }),
  ],
};

<span class="hljs-comment">// webpack.config.js - Remote application</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ModuleFederationPlugin</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;products&#x27;</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&#x27;remoteEntry.js&#x27;</span>,
      <span class="hljs-attr">exposes</span>: {
        <span class="hljs-string">&#x27;./ProductList&#x27;</span>: <span class="hljs-string">&#x27;./src/components/ProductList&#x27;</span>,
        <span class="hljs-string">&#x27;./ProductDetail&#x27;</span>: <span class="hljs-string">&#x27;./src/components/ProductDetail&#x27;</span>,
        <span class="hljs-string">&#x27;./ProductStore&#x27;</span>: <span class="hljs-string">&#x27;./src/store/productStore&#x27;</span>,
      },
      <span class="hljs-attr">shared</span>: {
        <span class="hljs-attr">react</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: deps.<span class="hljs-property">react</span>,
        },
        <span class="hljs-string">&#x27;react-dom&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: deps[<span class="hljs-string">&#x27;react-dom&#x27;</span>],
        },
        <span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: deps[<span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>],
        },
      },
    }),
  ],
};
</code></pre>
<h2 id="التحميل-الديناميكي-للوحدات-البعيدة">التحميل الديناميكي للوحدات البعيدة</h2>
<p>حمّل الواجهات الأمامية المصغّرة ديناميكيًا لأداء أفضل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Dynamic module federation loader</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RemoteConfig</span> {
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">scope</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">module</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ModuleFederationLoader</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">loadedRemotes</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">loadingPromises</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadRemote</span>(<span class="hljs-attr">config</span>: <span class="hljs-title class_">RemoteConfig</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; {
    <span class="hljs-keyword">const</span> key = <span class="hljs-string">\`<span class="hljs-subst">\${config.scope}</span>/<span class="hljs-subst">\${config.<span class="hljs-variable language_">module</span>}</span>\`</span>;

    <span class="hljs-comment">// Return cached module</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedRemotes</span>.<span class="hljs-title function_">has</span>(key)) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedRemotes</span>.<span class="hljs-title function_">get</span>(key);
    }

    <span class="hljs-comment">// Return in-progress loading</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">has</span>(key)) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">get</span>(key);
    }

    <span class="hljs-comment">// Start loading</span>
    <span class="hljs-keyword">const</span> loadingPromise = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadRemoteModule</span>(config);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">set</span>(key, loadingPromise);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> = <span class="hljs-keyword">await</span> loadingPromise;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedRemotes</span>.<span class="hljs-title function_">set</span>(key, <span class="hljs-variable language_">module</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">delete</span>(key);
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">module</span>;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingPromises</span>.<span class="hljs-title function_">delete</span>(key);
      <span class="hljs-keyword">throw</span> error;
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadRemoteModule</span>(<span class="hljs-attr">config</span>: <span class="hljs-title class_">RemoteConfig</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; {
    <span class="hljs-comment">// Load the remote entry</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadScript</span>(config.<span class="hljs-property">url</span>);

    <span class="hljs-comment">// Initialize the container</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">initContainer</span>(config.<span class="hljs-property">scope</span>);

    <span class="hljs-comment">// Get the module</span>
    <span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">window</span>[config.<span class="hljs-property">scope</span>];
    <span class="hljs-keyword">const</span> factory = <span class="hljs-keyword">await</span> container.<span class="hljs-title function_">get</span>(config.<span class="hljs-property">module</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">factory</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">loadScript</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> existingScript = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`script[src=&quot;<span class="hljs-subst">\${url}</span>&quot;]\`</span>);

      <span class="hljs-keyword">if</span> (existingScript) {
        <span class="hljs-keyword">if</span> (existingScript.<span class="hljs-title function_">getAttribute</span>(<span class="hljs-string">&#x27;data-loaded&#x27;</span>) === <span class="hljs-string">&#x27;true&#x27;</span>) {
          <span class="hljs-title function_">resolve</span>();
        } <span class="hljs-keyword">else</span> {
          existingScript.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;load&#x27;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>());
          existingScript.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;error&#x27;</span>, reject);
        }
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">src</span> = url;
      script.<span class="hljs-property">async</span> = <span class="hljs-literal">true</span>;

      script.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;load&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        script.<span class="hljs-title function_">setAttribute</span>(<span class="hljs-string">&#x27;data-loaded&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>);
        <span class="hljs-title function_">resolve</span>();
      });

      script.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        script.<span class="hljs-title function_">remove</span>();
        <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to load script: <span class="hljs-subst">\${url}</span>\`</span>));
      });

      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">initContainer</span>(<span class="hljs-attr">scope</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">window</span>[scope]) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Container <span class="hljs-subst">\${scope}</span> not found\`</span>);
    }

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">window</span>[scope].<span class="hljs-property">__initialized</span>) {
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">window</span>[scope].<span class="hljs-title function_">init</span>(__webpack_share_scopes__.<span class="hljs-property">default</span>);
      <span class="hljs-variable language_">window</span>[scope].<span class="hljs-property">__initialized</span> = <span class="hljs-literal">true</span>;
    }
  }
}

<span class="hljs-comment">// React component for dynamic remotes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DynamicRemote</span>(<span class="hljs-params">{
  config,
  fallback = &lt;div&gt;Loading...&lt;/div&gt;,
  errorFallback = &lt;div&gt;Failed to load&lt;/div&gt;,
}: {
  config: RemoteConfig;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}</span>) {
  <span class="hljs-keyword">const</span> [<span class="hljs-title class_">Component</span>, setComponent] = useState&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> loader = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ModuleFederationLoader</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    loader.<span class="hljs-property">current</span>
      .<span class="hljs-title function_">loadRemote</span>(config)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-variable language_">module</span></span>) =&gt;</span> <span class="hljs-title function_">setComponent</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">module</span>.<span class="hljs-property">default</span> || <span class="hljs-variable language_">module</span>))
      .<span class="hljs-title function_">catch</span>(setError);
  }, [config]);

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{errorFallback}<span class="hljs-tag">&lt;/&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">Component</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{fallback}<span class="hljs-tag">&lt;/&gt;</span></span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="تحسين-الاعتمادات-المشتركة">تحسين الاعتمادات المشتركة</h2>
<p>حسّن الاعتمادات المشتركة بين الواجهات الأمامية المصغّرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Shared dependency manager</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">SharedDependencyManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">versions</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">loaded</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">boolean</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">registerDependency</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">version</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">versions</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">versions</span>.<span class="hljs-title function_">set</span>(name, []);
    }

    <span class="hljs-keyword">const</span> versions = <span class="hljs-variable language_">this</span>.<span class="hljs-property">versions</span>.<span class="hljs-title function_">get</span>(name)!;
    <span class="hljs-keyword">if</span> (!versions.<span class="hljs-title function_">includes</span>(version)) {
      versions.<span class="hljs-title function_">push</span>(version);

      <span class="hljs-comment">// Warn about version conflicts</span>
      <span class="hljs-keyword">if</span> (versions.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Multiple versions of <span class="hljs-subst">\${name}</span> detected:\`</span>, versions.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>));
      }
    }
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadSharedDependency</span>(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fallbackUrl</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">loaded</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>[name];
    }

    <span class="hljs-comment">// Check if already available</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>?.[name]) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loaded</span>.<span class="hljs-title function_">set</span>(name, <span class="hljs-literal">true</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>[name];
    }

    <span class="hljs-comment">// Load from CDN or fallback</span>
    <span class="hljs-keyword">if</span> (fallbackUrl) {
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadFromCDN</span>(name, fallbackUrl);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loaded</span>.<span class="hljs-title function_">set</span>(name, <span class="hljs-literal">true</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>[name];
    }

    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Shared dependency <span class="hljs-subst">\${name}</span> not found\`</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadFromCDN</span>(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">src</span> = url;
      script.<span class="hljs-property">async</span> = <span class="hljs-literal">true</span>;

      script.<span class="hljs-property">onload</span> = <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>) {
          <span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span> = {};
        }

        <span class="hljs-comment">// Map common CDN globals to shared namespace</span>
        <span class="hljs-keyword">switch</span> (name) {
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;react&#x27;</span>:
            <span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>.<span class="hljs-property">react</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-property">React</span>;
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>:
            <span class="hljs-variable language_">window</span>.<span class="hljs-property">__shared__</span>[<span class="hljs-string">&#x27;react-dom&#x27;</span>] = <span class="hljs-variable language_">window</span>.<span class="hljs-property">ReactDOM</span>;
            <span class="hljs-keyword">break</span>;
          <span class="hljs-comment">// Add more mappings</span>
        }

        <span class="hljs-title function_">resolve</span>();
      };

      script.<span class="hljs-property">onerror</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to load <span class="hljs-subst">\${name}</span> from <span class="hljs-subst">\${url}</span>\`</span>));

      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);
    });
  }

  <span class="hljs-title function_">getVersionReport</span>(): <span class="hljs-title class_">VersionReport</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">report</span>: <span class="hljs-title class_">VersionReport</span> = {
      <span class="hljs-attr">conflicts</span>: [],
      <span class="hljs-attr">unique</span>: [],
      <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">versions</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">versions, name</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (versions.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1</span>) {
        report.<span class="hljs-property">conflicts</span>.<span class="hljs-title function_">push</span>({ name, versions });
      } <span class="hljs-keyword">else</span> {
        report.<span class="hljs-property">unique</span>.<span class="hljs-title function_">push</span>({ name, <span class="hljs-attr">version</span>: versions[<span class="hljs-number">0</span>] });
      }
      report.<span class="hljs-property">total</span>++;
    });

    <span class="hljs-keyword">return</span> report;
  }
}

<span class="hljs-comment">// Webpack configuration for optimal sharing</span>
<span class="hljs-keyword">const</span> sharedDependencies = {
  <span class="hljs-attr">react</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
    <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Load immediately for host</span>
  },
  <span class="hljs-string">&#x27;react-dom&#x27;</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
    <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-comment">// Share large libraries</span>
  <span class="hljs-attr">lodash</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^4.17.0&#x27;</span>,
  },
  <span class="hljs-attr">moment</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^2.29.0&#x27;</span>,
  },
  <span class="hljs-comment">// Share UI libraries</span>
  <span class="hljs-string">&#x27;@mui/material&#x27;</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^5.0.0&#x27;</span>,
  },
};
</code></pre>
<h2 id="التواصل-بين-الواجهات-الأمامية-المصغرة">التواصل بين الواجهات الأمامية المصغّرة</h2>
<p>تواصل فعّال بين الواجهات الأمامية المصغّرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Event bus for micro-frontend communication</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MicroFrontendEventBus</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">events</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-title class_">EventHandler</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">messageQueue</span>: <span class="hljs-title class_">QueuedMessage</span>[] = [];
  <span class="hljs-keyword">private</span> isReady = <span class="hljs-literal">false</span>;

  <span class="hljs-title function_">emit</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>?: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Queue messages if not ready</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">isReady</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-title function_">push</span>({ event, data, <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() });
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">events</span>.<span class="hljs-title function_">get</span>(event);
    <span class="hljs-keyword">if</span> (handlers) {
      handlers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">handler</span>) =&gt;</span> {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-title function_">handler</span>(data);
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error in event handler for <span class="hljs-subst">\${event}</span>:\`</span>, error);
        }
      });
    }

    <span class="hljs-comment">// Also emit as custom event for cross-boundary communication</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">dispatchEvent</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CustomEvent</span>(<span class="hljs-string">\`mfe:<span class="hljs-subst">\${event}</span>\`</span>, { <span class="hljs-attr">detail</span>: data }));
  }

  <span class="hljs-title function_">on</span>(<span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">handler</span>: <span class="hljs-title class_">EventHandler</span>): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">events</span>.<span class="hljs-title function_">has</span>(event)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">events</span>.<span class="hljs-title function_">set</span>(event, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">events</span>.<span class="hljs-title function_">get</span>(event)!.<span class="hljs-title function_">add</span>(handler);

    <span class="hljs-comment">// Return unsubscribe function</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">events</span>.<span class="hljs-title function_">get</span>(event);
      <span class="hljs-keyword">if</span> (handlers) {
        handlers.<span class="hljs-title function_">delete</span>(handler);
        <span class="hljs-keyword">if</span> (handlers.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">events</span>.<span class="hljs-title function_">delete</span>(event);
        }
      }
    };
  }

  <span class="hljs-title function_">ready</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isReady</span> = <span class="hljs-literal">true</span>;

    <span class="hljs-comment">// Process queued messages</span>
    <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> message = <span class="hljs-variable language_">this</span>.<span class="hljs-property">messageQueue</span>.<span class="hljs-title function_">shift</span>()!;
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>(message.<span class="hljs-property">event</span>, message.<span class="hljs-property">data</span>);
    }
  }
}

<span class="hljs-comment">// Shared state management across micro-frontends</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MicroFrontendStateManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">subscribers</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-title class_">StateSubscriber</span>&gt;&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">setState</span>(<span class="hljs-params"><span class="hljs-attr">namespace</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> fullKey = <span class="hljs-string">\`<span class="hljs-subst">\${namespace}</span>:<span class="hljs-subst">\${key}</span>\`</span>;
    <span class="hljs-keyword">const</span> oldValue = <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-title function_">get</span>(fullKey);

    <span class="hljs-keyword">if</span> (oldValue !== value) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-title function_">set</span>(fullKey, value);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">notifySubscribers</span>(fullKey, value, oldValue);
    }
  }

  <span class="hljs-title function_">getState</span>(<span class="hljs-attr">namespace</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">\`<span class="hljs-subst">\${namespace}</span>:<span class="hljs-subst">\${key}</span>\`</span>);
  }

  <span class="hljs-title function_">subscribe</span>(<span class="hljs-attr">namespace</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">callback</span>: <span class="hljs-title class_">StateSubscriber</span>): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> fullKey = <span class="hljs-string">\`<span class="hljs-subst">\${namespace}</span>:<span class="hljs-subst">\${key}</span>\`</span>;

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">has</span>(fullKey)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">set</span>(fullKey, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(fullKey)!.<span class="hljs-title function_">add</span>(callback);

    <span class="hljs-comment">// Return unsubscribe</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> subs = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(fullKey);
      <span class="hljs-keyword">if</span> (subs) {
        subs.<span class="hljs-title function_">delete</span>(callback);
        <span class="hljs-keyword">if</span> (subs.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">delete</span>(fullKey);
        }
      }
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">notifySubscribers</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">oldValue</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> subs = <span class="hljs-variable language_">this</span>.<span class="hljs-property">subscribers</span>.<span class="hljs-title function_">get</span>(key);
    <span class="hljs-keyword">if</span> (subs) {
      subs.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-title function_">callback</span>(value, oldValue);
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error in state subscriber for <span class="hljs-subst">\${key}</span>:\`</span>, error);
        }
      });
    }
  }
}

<span class="hljs-comment">// React hooks for micro-frontend communication</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useMicroFrontendEvent</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">handler</span>: (data: <span class="hljs-built_in">any</span>) =&gt; <span class="hljs-built_in">void</span></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> eventBus = <span class="hljs-variable language_">window</span>.<span class="hljs-property">__mfeEventBus</span> || <span class="hljs-keyword">new</span> <span class="hljs-title class_">MicroFrontendEventBus</span>();
    <span class="hljs-keyword">return</span> eventBus.<span class="hljs-title function_">on</span>(event, handler);
  }, [event, handler]);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useMicroFrontendState&lt;T&gt;(
  <span class="hljs-attr">namespace</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">initialValue</span>: T,
): [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>] {
  <span class="hljs-keyword">const</span> stateManager = <span class="hljs-title function_">useRef</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">__mfeStateManager</span> || <span class="hljs-keyword">new</span> <span class="hljs-title class_">MicroFrontendStateManager</span>());

  <span class="hljs-keyword">const</span> [value, setValue] = useState&lt;T&gt;(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> existing = stateManager.<span class="hljs-property">current</span>.<span class="hljs-title function_">getState</span>(namespace, key);
    <span class="hljs-keyword">return</span> existing !== <span class="hljs-literal">undefined</span> ? existing : initialValue;
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> stateManager.<span class="hljs-property">current</span>.<span class="hljs-title function_">subscribe</span>(namespace, key, <span class="hljs-function">(<span class="hljs-params">newValue</span>) =&gt;</span> {
      <span class="hljs-title function_">setValue</span>(newValue);
    });
  }, [namespace, key]);

  <span class="hljs-keyword">const</span> updateValue = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">newValue</span>: T</span>) =&gt;</span> {
      stateManager.<span class="hljs-property">current</span>.<span class="hljs-title function_">setState</span>(namespace, key, newValue);
    },
    [namespace, key],
  );

  <span class="hljs-keyword">return</span> [value, updateValue];
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>راقب أداء الواجهات الأمامية المصغّرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Micro-frontend performance tracker</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MicroFrontendPerformanceTracker</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">MicroFrontendMetrics</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">trackMicroFrontendLoad</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> loadTime = performance.<span class="hljs-title function_">now</span>() - startTime;

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(name, {
        name,
        <span class="hljs-attr">loadTime</span>: [],
        <span class="hljs-attr">renderTime</span>: [],
        <span class="hljs-attr">errorCount</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">bundleSize</span>: <span class="hljs-number">0</span>,
      });
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name)!.<span class="hljs-property">loadTime</span>.<span class="hljs-title function_">push</span>(loadTime);

    <span class="hljs-comment">// Report to analytics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportMetric</span>(<span class="hljs-string">&#x27;mfe_load&#x27;</span>, {
      name,
      loadTime,
    });
  }

  <span class="hljs-title function_">trackMicroFrontendRender</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(name, {
        name,
        <span class="hljs-attr">loadTime</span>: [],
        <span class="hljs-attr">renderTime</span>: [],
        <span class="hljs-attr">errorCount</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">bundleSize</span>: <span class="hljs-number">0</span>,
      });
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name)!.<span class="hljs-property">renderTime</span>.<span class="hljs-title function_">push</span>(renderTime);

    <span class="hljs-comment">// Report to analytics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportMetric</span>(<span class="hljs-string">&#x27;mfe_render&#x27;</span>, {
      name,
      renderTime,
    });
  }

  <span class="hljs-title function_">trackMicroFrontendError</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(name, {
        name,
        <span class="hljs-attr">loadTime</span>: [],
        <span class="hljs-attr">renderTime</span>: [],
        <span class="hljs-attr">errorCount</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">bundleSize</span>: <span class="hljs-number">0</span>,
      });
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name)!.<span class="hljs-property">errorCount</span>++;

    <span class="hljs-comment">// Report to error tracking</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportError</span>(<span class="hljs-string">&#x27;mfe_error&#x27;</span>, {
      name,
      <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span>,
      <span class="hljs-attr">stack</span>: error.<span class="hljs-property">stack</span>,
    });
  }

  <span class="hljs-title function_">getPerformanceReport</span>(): <span class="hljs-title class_">MicroFrontendPerformanceReport</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">report</span>: <span class="hljs-title class_">MicroFrontendPerformanceReport</span> = {
      <span class="hljs-attr">microFrontends</span>: [],
      <span class="hljs-attr">totalLoadTime</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">totalBundleSize</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">errorRate</span>: <span class="hljs-number">0</span>,
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">metrics</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> avgLoadTime =
        metrics.<span class="hljs-property">loadTime</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>
          ? metrics.<span class="hljs-property">loadTime</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / metrics.<span class="hljs-property">loadTime</span>.<span class="hljs-property">length</span>
          : <span class="hljs-number">0</span>;

      <span class="hljs-keyword">const</span> avgRenderTime =
        metrics.<span class="hljs-property">renderTime</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>
          ? metrics.<span class="hljs-property">renderTime</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / metrics.<span class="hljs-property">renderTime</span>.<span class="hljs-property">length</span>
          : <span class="hljs-number">0</span>;

      report.<span class="hljs-property">microFrontends</span>.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">name</span>: metrics.<span class="hljs-property">name</span>,
        avgLoadTime,
        avgRenderTime,
        <span class="hljs-attr">errorCount</span>: metrics.<span class="hljs-property">errorCount</span>,
        <span class="hljs-attr">bundleSize</span>: metrics.<span class="hljs-property">bundleSize</span>,
      });

      report.<span class="hljs-property">totalLoadTime</span> += avgLoadTime;
      report.<span class="hljs-property">totalBundleSize</span> += metrics.<span class="hljs-property">bundleSize</span>;
    });

    <span class="hljs-keyword">const</span> totalRequests = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">values</span>()).<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">loadTime</span>.<span class="hljs-property">length</span>,
      <span class="hljs-number">0</span>,
    );

    <span class="hljs-keyword">const</span> totalErrors = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">values</span>()).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">errorCount</span>, <span class="hljs-number">0</span>);

    report.<span class="hljs-property">errorRate</span> = totalRequests &gt; <span class="hljs-number">0</span> ? totalErrors / totalRequests : <span class="hljs-number">0</span>;

    <span class="hljs-keyword">return</span> report;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportMetric</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Send to analytics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gtag</span>) {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, event, data);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportError</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Send to error tracking</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">Sentry</span>) {
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">Sentry</span>.<span class="hljs-title function_">captureException</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(data.<span class="hljs-property">error</span>), {
        <span class="hljs-attr">tags</span>: {
          <span class="hljs-attr">microFrontend</span>: data.<span class="hljs-property">name</span>,
        },
        <span class="hljs-attr">extra</span>: data,
      });
    }
  }
}

<span class="hljs-comment">// React component for tracking</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MicroFrontendTracker</span>(<span class="hljs-params">{ name, children }: { name: <span class="hljs-built_in">string</span>; children: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> tracker = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">MicroFrontendPerformanceTracker</span>());
  <span class="hljs-keyword">const</span> startTime = <span class="hljs-title function_">useRef</span>(performance.<span class="hljs-title function_">now</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    tracker.<span class="hljs-property">current</span>.<span class="hljs-title function_">trackMicroFrontendLoad</span>(name, startTime.<span class="hljs-property">current</span>);

    <span class="hljs-comment">// Track render time</span>
    <span class="hljs-keyword">const</span> renderTime = performance.<span class="hljs-title function_">now</span>() - startTime.<span class="hljs-property">current</span>;
    tracker.<span class="hljs-property">current</span>.<span class="hljs-title function_">trackMicroFrontendRender</span>(name, renderTime);
  }, [name]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">onError</span>=<span class="hljs-string">{(error)</span> =&gt;</span> tracker.current.trackMicroFrontendError(name, error)}&gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التحسين-وقت-البناء">التحسين وقت البناء</h2>
<p>حسّن الواجهات الأمامية المصغّرة وقت البناء:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js - Optimization configuration</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TerserPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;terser-webpack-plugin&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CompressionPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;compression-webpack-plugin&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">moduleIds</span>: <span class="hljs-string">&#x27;deterministic&#x27;</span>,
    <span class="hljs-attr">runtimeChunk</span>: <span class="hljs-string">&#x27;single&#x27;</span>,
    <span class="hljs-attr">splitChunks</span>: {
      <span class="hljs-attr">chunks</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
      <span class="hljs-attr">cacheGroups</span>: {
        <span class="hljs-attr">vendor</span>: {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\\\/]node_modules[\\\\/]/</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vendors&#x27;</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">10</span>,
          <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-attr">common</span>: {
          <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">5</span>,
          <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-attr">shared</span>: {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\\\/]src[\\\\/]shared[\\\\/]/</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shared&#x27;</span>,
          <span class="hljs-attr">priority</span>: <span class="hljs-number">15</span>,
          <span class="hljs-attr">reuseExistingChunk</span>: <span class="hljs-literal">true</span>,
        },
      },
    },
    <span class="hljs-attr">minimizer</span>: [
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">TerserPlugin</span>({
        <span class="hljs-attr">terserOptions</span>: {
          <span class="hljs-attr">compress</span>: {
            <span class="hljs-attr">drop_console</span>: <span class="hljs-literal">true</span>,
          },
        },
      }),
    ],
  },

  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">CompressionPlugin</span>({
      <span class="hljs-attr">algorithm</span>: <span class="hljs-string">&#x27;gzip&#x27;</span>,
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(js|css|html|svg)$/</span>,
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">8192</span>,
      <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.8</span>,
    }),
  ],
};

<span class="hljs-comment">// Bundle analysis script</span>
<span class="hljs-keyword">const</span> { <span class="hljs-title class_">BundleAnalyzerPlugin</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;webpack-bundle-analyzer&#x27;</span>);

<span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">ANALYZE</span>) {
  config.<span class="hljs-property">plugins</span>.<span class="hljs-title function_">push</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">BundleAnalyzerPlugin</span>({
      <span class="hljs-attr">analyzerMode</span>: <span class="hljs-string">&#x27;static&#x27;</span>,
      <span class="hljs-attr">reportFilename</span>: <span class="hljs-string">\`bundle-report-<span class="hljs-subst">\${process.env.MFE_NAME}</span>.html\`</span>,
    }),
  );
}
</code></pre>
<h2 id="استراتيجيات-النشر">استراتيجيات النشر</h2>
<p>انشر الواجهات الأمامية المصغّرة لأداء أمثل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Deployment orchestrator</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MicroFrontendDeploymentOrchestrator</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">deployMicroFrontend</span>(
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">version</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">config</span>: <span class="hljs-title class_">DeploymentConfig</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">DeploymentResult</span>&gt; {
    <span class="hljs-comment">// 1. Build and optimize</span>
    <span class="hljs-keyword">const</span> buildResult = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">build</span>(name, version);

    <span class="hljs-comment">// 2. Upload to CDN</span>
    <span class="hljs-keyword">const</span> cdnUrls = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">uploadToCDN</span>(buildResult.<span class="hljs-property">files</span>, config.<span class="hljs-property">cdn</span>);

    <span class="hljs-comment">// 3. Update manifest</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateManifest</span>(name, version, cdnUrls);

    <span class="hljs-comment">// 4. Warm up cache</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">warmUpCache</span>(cdnUrls);

    <span class="hljs-comment">// 5. Health check</span>
    <span class="hljs-keyword">const</span> health = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">healthCheck</span>(name, version);

    <span class="hljs-comment">// 6. Update routing</span>
    <span class="hljs-keyword">if</span> (health.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;healthy&#x27;</span>) {
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateRouting</span>(name, version, config.<span class="hljs-property">canary</span>);
    }

    <span class="hljs-keyword">return</span> {
      name,
      version,
      cdnUrls,
      health,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">warmUpCache</span>(<span class="hljs-attr">urls</span>: <span class="hljs-built_in">string</span>[]): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-comment">// Pre-fetch from multiple regions</span>
    <span class="hljs-keyword">const</span> regions = [<span class="hljs-string">&#x27;us-east-1&#x27;</span>, <span class="hljs-string">&#x27;eu-west-1&#x27;</span>, <span class="hljs-string">&#x27;ap-southeast-1&#x27;</span>];

    <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
      regions.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function">(<span class="hljs-params">region</span>) =&gt;</span> urls.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">fetchFromRegion</span>(url, region))),
    );
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">updateManifest</span>(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">version</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">urls</span>: <span class="hljs-built_in">string</span>[]): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">const</span> manifest = {
      name,
      version,
      urls,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">integrity</span>: <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateIntegrity</span>(urls),
    };

    <span class="hljs-comment">// Update central manifest</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/manifest&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(manifest),
    });
  }
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">MicroFrontendBestPractices</span> {
  <span class="hljs-comment">// Architecture</span>
  <span class="hljs-attr">architecture</span>: {
    <span class="hljs-attr">clearBoundaries</span>: <span class="hljs-string">&#x27;Define clear micro-frontend boundaries&#x27;</span>;
    <span class="hljs-attr">sharedNothing</span>: <span class="hljs-string">&#x27;Minimize shared state between micro-frontends&#x27;</span>;
    <span class="hljs-attr">versionStrategy</span>: <span class="hljs-string">&#x27;Have clear versioning and compatibility strategy&#x27;</span>;
    <span class="hljs-attr">fallbackStrategy</span>: <span class="hljs-string">&#x27;Implement fallbacks for micro-frontend failures&#x27;</span>;
  };

  <span class="hljs-comment">// Performance</span>
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">lazyLoad</span>: <span class="hljs-string">&#x27;Load micro-frontends on demand&#x27;</span>;
    <span class="hljs-attr">shareVendors</span>: <span class="hljs-string">&#x27;Share common dependencies effectively&#x27;</span>;
    <span class="hljs-attr">cacheStrategy</span>: <span class="hljs-string">&#x27;Implement proper caching strategies&#x27;</span>;
    <span class="hljs-attr">bundleOptimization</span>: <span class="hljs-string">&#x27;Optimize bundles independently&#x27;</span>;
  };

  <span class="hljs-comment">// Communication</span>
  <span class="hljs-attr">communication</span>: {
    <span class="hljs-attr">eventBus</span>: <span class="hljs-string">&#x27;Use event bus for loose coupling&#x27;</span>;
    <span class="hljs-attr">contractTesting</span>: <span class="hljs-string">&#x27;Test interfaces between micro-frontends&#x27;</span>;
    <span class="hljs-attr">versionNegotiation</span>: <span class="hljs-string">&#x27;Handle version mismatches gracefully&#x27;</span>;
    <span class="hljs-attr">errorBoundaries</span>: <span class="hljs-string">&#x27;Isolate failures to single micro-frontend&#x27;</span>;
  };

  <span class="hljs-comment">// Deployment</span>
  <span class="hljs-attr">deployment</span>: {
    <span class="hljs-attr">independentDeploy</span>: <span class="hljs-string">&#x27;Enable independent deployments&#x27;</span>;
    <span class="hljs-attr">canaryReleases</span>: <span class="hljs-string">&#x27;Use canary deployments for safety&#x27;</span>;
    <span class="hljs-attr">rollbackStrategy</span>: <span class="hljs-string">&#x27;Have quick rollback mechanism&#x27;</span>;
    <span class="hljs-attr">monitoring</span>: <span class="hljs-string">&#x27;Monitor each micro-frontend independently&#x27;</span>;
  };
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
