const s="kinney",a="react-performance",n="أداء React",l="service-worker-strategies",p="استراتيجيات Service Worker في تطبيقات React",t=[{depth:2,id:"فهم-service-workers-في-سياق-react",text:"فهم Service Workers في سياق React"},{depth:2,id:"استراتيجيات-التخزين-المؤقت",text:"استراتيجيات التخزين المؤقت"},{depth:2,id:"التخزين-المؤقت-المتقدم-باستخدام-workbox",text:"التخزين المؤقت المتقدم باستخدام Workbox"},{depth:2,id:"تنفيذ-المزامنة-في-الخلفية",text:"تنفيذ المزامنة في الخلفية"},{depth:2,id:"إشعارات-الدفع",text:"إشعارات الدفع"},{depth:2,id:"مكونات-react-العاملة-دون-اتصال",text:"مكوّنات React العاملة دون اتصال"},{depth:2,id:"استراتيجيات-إدارة-ذاكرة-التخزين-المؤقت",text:"استراتيجيات إدارة ذاكرة التخزين المؤقت"},{depth:2,id:"تحديثات-service-worker",text:"تحديثات Service Worker"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يُحمَّل تطبيق React لديك فورًا — إلى أن يفقد المستخدم اتصاله بالإنترنت. عندها تصبح الشاشة فارغة، والعجلات تدور، والمستخدمون محبطون. تغيّر Service Workers هذه اللعبة تمامًا. فهي خادمك الوسيط الشخصي لتطبيقك، يقف بين شيفرة React لديك والشبكة، يعترض الطلبات، ويقدّم استجابات مخزّنة مؤقتًا، ويعمل حتى دون اتصال. لكن إن نفّذتها على نحو خاطئ، فستخزّن بيانات قديمة إلى الأبد، أو تكسر تحديثات تطبيقك، أو الأسوأ، تقدّم المحتوى الخطأ للمستخدمين الخطأ.</p>
<p>تمتد قوة Service Workers إلى ما هو أبعد بكثير من دعم العمل دون اتصال. فهي تتيح التحميل الفوري باستراتيجيات التخزين المؤقت أولًا، ومزامنة البيانات في الخلفية عند عودة الاتصال، وإشعارات الدفع لإعادة جذب المستخدمين، وحتى تحديثات دورية في الخلفية. يوضح هذا الدليل كيفية تنفيذ Service Workers على نحو صحيح في تطبيقات React، من استراتيجيات التخزين المؤقت الأساسية إلى الأنماط المتقدمة التي تجعل تطبيقك يبدو أصيلًا كالتطبيقات الأصلية.</p>
<h2 id="فهم-service-workers-في-سياق-react">فهم Service Workers في سياق React</h2>
<p>Service Workers عبارة عن عمّال JavaScript يعملون في خيط منفصل عن تطبيق React:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Service Worker lifecycle and capabilities</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ServiceWorkerCapabilities</span> {
  <span class="hljs-comment">// What Service Workers CAN do</span>
  <span class="hljs-attr">capabilities</span>: {
    <span class="hljs-attr">networkInterception</span>: <span class="hljs-string">&#x27;Intercept all network requests&#x27;</span>;
    <span class="hljs-attr">cacheManagement</span>: <span class="hljs-string">&#x27;Store and serve cached responses&#x27;</span>;
    <span class="hljs-attr">backgroundSync</span>: <span class="hljs-string">&#x27;Sync data when online&#x27;</span>;
    <span class="hljs-attr">pushNotifications</span>: <span class="hljs-string">&#x27;Receive push messages&#x27;</span>;
    <span class="hljs-attr">offlineSupport</span>: <span class="hljs-string">&#x27;Work without internet&#x27;</span>;
  };

  <span class="hljs-comment">// What Service Workers CANNOT do</span>
  <span class="hljs-attr">limitations</span>: {
    <span class="hljs-attr">domAccess</span>: <span class="hljs-string">&#x27;Cannot access DOM directly&#x27;</span>;
    <span class="hljs-attr">synchronousXHR</span>: <span class="hljs-string">&#x27;No synchronous requests&#x27;</span>;
    <span class="hljs-attr">localStorage</span>: <span class="hljs-string">&#x27;No access to localStorage&#x27;</span>;
    <span class="hljs-attr">parentScope</span>: <span class="hljs-string">&#x27;Cannot access parent page scope&#x27;</span>;
  };

  <span class="hljs-comment">// Lifecycle phases</span>
  <span class="hljs-attr">lifecycle</span>: {
    <span class="hljs-attr">install</span>: <span class="hljs-string">&#x27;Download and cache assets&#x27;</span>;
    <span class="hljs-attr">activate</span>: <span class="hljs-string">&#x27;Clean up old caches&#x27;</span>;
    <span class="hljs-attr">fetch</span>: <span class="hljs-string">&#x27;Intercept network requests&#x27;</span>;
    <span class="hljs-attr">sync</span>: <span class="hljs-string">&#x27;Background synchronization&#x27;</span>;
    <span class="hljs-attr">push</span>: <span class="hljs-string">&#x27;Handle push messages&#x27;</span>;
  };
}

<span class="hljs-comment">// Basic Service Worker registration in React</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ServiceWorkerProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [swStatus, setSwStatus] = useState&lt;<span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;installing&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>&gt;(<span class="hljs-string">&#x27;idle&#x27;</span>);
  <span class="hljs-keyword">const</span> [updateAvailable, setUpdateAvailable] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;serviceWorker&#x27;</span> <span class="hljs-keyword">in</span> navigator &amp;&amp; process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span>) {
      <span class="hljs-title function_">registerServiceWorker</span>();
    }
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">registerServiceWorker</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> registration = <span class="hljs-keyword">await</span> navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-title function_">register</span>(<span class="hljs-string">&#x27;/sw.js&#x27;</span>, {
        <span class="hljs-attr">scope</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
      });

      <span class="hljs-title function_">setSwStatus</span>(<span class="hljs-string">&#x27;installing&#x27;</span>);

      registration.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;updatefound&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> newWorker = registration.<span class="hljs-property">installing</span>;

        newWorker?.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;statechange&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
          <span class="hljs-keyword">if</span> (newWorker.<span class="hljs-property">state</span> === <span class="hljs-string">&#x27;activated&#x27;</span>) {
            <span class="hljs-title function_">setSwStatus</span>(<span class="hljs-string">&#x27;active&#x27;</span>);

            <span class="hljs-comment">// Check if this is an update</span>
            <span class="hljs-keyword">if</span> (navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-property">controller</span>) {
              <span class="hljs-title function_">setUpdateAvailable</span>(<span class="hljs-literal">true</span>);
            }
          }
        });
      });

      <span class="hljs-comment">// Check for updates periodically</span>
      <span class="hljs-built_in">setInterval</span>(
        <span class="hljs-function">() =&gt;</span> {
          registration.<span class="hljs-title function_">update</span>();
        },
        <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>,
      ); <span class="hljs-comment">// Every hour</span>
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Service Worker registration failed:&#x27;</span>, error);
      <span class="hljs-title function_">setSwStatus</span>(<span class="hljs-string">&#x27;error&#x27;</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">skipWaiting</span> = (<span class="hljs-params"></span>) =&gt; {
    navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-property">controller</span>?.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SKIP_WAITING&#x27;</span> });
    <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-title function_">reload</span>();
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ServiceWorkerContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">swStatus</span>, <span class="hljs-attr">updateAvailable</span>, <span class="hljs-attr">skipWaiting</span> }}&gt;</span>
      {children}
      {updateAvailable &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">UpdateNotification</span> <span class="hljs-attr">onUpdate</span>=<span class="hljs-string">{skipWaiting}</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ServiceWorkerContext.Provider</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استراتيجيات-التخزين-المؤقت">استراتيجيات التخزين المؤقت</h2>
<p>يتطلب كل نوع من المحتوى استراتيجية تخزين مؤقت مختلفة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// sw.js - Service Worker implementation</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CACHE_VERSION</span> = <span class="hljs-string">&#x27;v1&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CACHE_NAMES</span> = {
  <span class="hljs-attr">static</span>: <span class="hljs-string">\`static-<span class="hljs-subst">\${CACHE_VERSION}</span>\`</span>,
  <span class="hljs-attr">dynamic</span>: <span class="hljs-string">\`dynamic-<span class="hljs-subst">\${CACHE_VERSION}</span>\`</span>,
  <span class="hljs-attr">images</span>: <span class="hljs-string">\`images-<span class="hljs-subst">\${CACHE_VERSION}</span>\`</span>,
  <span class="hljs-attr">api</span>: <span class="hljs-string">\`api-<span class="hljs-subst">\${CACHE_VERSION}</span>\`</span>,
};

<span class="hljs-comment">// Assets to cache immediately</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">STATIC_ASSETS</span> = [
  <span class="hljs-string">&#x27;/&#x27;</span>,
  <span class="hljs-string">&#x27;/index.html&#x27;</span>,
  <span class="hljs-string">&#x27;/static/css/main.css&#x27;</span>,
  <span class="hljs-string">&#x27;/static/js/bundle.js&#x27;</span>,
  <span class="hljs-string">&#x27;/manifest.json&#x27;</span>,
  <span class="hljs-string">&#x27;/offline.html&#x27;</span>,
];

<span class="hljs-comment">// Install event - cache static assets</span>
<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;install&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  event.<span class="hljs-title function_">waitUntil</span>(
    caches.<span class="hljs-title function_">open</span>(<span class="hljs-variable constant_">CACHE_NAMES</span>.<span class="hljs-property">static</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">cache</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> cache.<span class="hljs-title function_">addAll</span>(<span class="hljs-variable constant_">STATIC_ASSETS</span>);
    }),
  );

  <span class="hljs-comment">// Force waiting SW to become active</span>
  <span class="hljs-variable language_">self</span>.<span class="hljs-title function_">skipWaiting</span>();
});

<span class="hljs-comment">// Activate event - clean up old caches</span>
<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;activate&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  event.<span class="hljs-title function_">waitUntil</span>(
    caches.<span class="hljs-title function_">keys</span>().<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">cacheNames</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
        cacheNames.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">cacheName</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(<span class="hljs-variable constant_">CACHE_NAMES</span>).<span class="hljs-title function_">includes</span>(cacheName)) {
            <span class="hljs-keyword">return</span> caches.<span class="hljs-title function_">delete</span>(cacheName);
          }
        }),
      );
    }),
  );

  <span class="hljs-comment">// Take control of all pages immediately</span>
  <span class="hljs-variable language_">self</span>.<span class="hljs-property">clients</span>.<span class="hljs-title function_">claim</span>();
});

<span class="hljs-comment">// Fetch strategies</span>
<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;fetch&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { request } = event;
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(request.<span class="hljs-property">url</span>);

  <span class="hljs-comment">// Strategy selector</span>
  <span class="hljs-keyword">if</span> (request.<span class="hljs-property">method</span> !== <span class="hljs-string">&#x27;GET&#x27;</span>) {
    <span class="hljs-comment">// Only cache GET requests</span>
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-keyword">if</span> (url.<span class="hljs-property">pathname</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;/api/&#x27;</span>)) {
    <span class="hljs-comment">// Network first for API calls</span>
    event.<span class="hljs-title function_">respondWith</span>(<span class="hljs-title function_">networkFirst</span>(request, <span class="hljs-variable constant_">CACHE_NAMES</span>.<span class="hljs-property">api</span>));
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (request.<span class="hljs-property">destination</span> === <span class="hljs-string">&#x27;image&#x27;</span>) {
    <span class="hljs-comment">// Cache first for images</span>
    event.<span class="hljs-title function_">respondWith</span>(<span class="hljs-title function_">cacheFirst</span>(request, <span class="hljs-variable constant_">CACHE_NAMES</span>.<span class="hljs-property">images</span>));
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (url.<span class="hljs-property">pathname</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;/static/&#x27;</span>)) {
    <span class="hljs-comment">// Cache only for static assets</span>
    event.<span class="hljs-title function_">respondWith</span>(<span class="hljs-title function_">cacheOnly</span>(request, <span class="hljs-variable constant_">CACHE_NAMES</span>.<span class="hljs-property">static</span>));
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// Stale while revalidate for HTML</span>
    event.<span class="hljs-title function_">respondWith</span>(<span class="hljs-title function_">staleWhileRevalidate</span>(request, <span class="hljs-variable constant_">CACHE_NAMES</span>.<span class="hljs-property">dynamic</span>));
  }
});

<span class="hljs-comment">// Cache-first strategy</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">cacheFirst</span>(<span class="hljs-params">request, cacheName</span>) {
  <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">open</span>(cacheName);
  <span class="hljs-keyword">const</span> cached = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">match</span>(request);

  <span class="hljs-keyword">if</span> (cached) {
    <span class="hljs-keyword">return</span> cached;
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(request);

    <span class="hljs-keyword">if</span> (response.<span class="hljs-property">ok</span>) {
      cache.<span class="hljs-title function_">put</span>(request, response.<span class="hljs-title function_">clone</span>());
    }

    <span class="hljs-keyword">return</span> response;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> caches.<span class="hljs-title function_">match</span>(<span class="hljs-string">&#x27;/offline.html&#x27;</span>);
  }
}

<span class="hljs-comment">// Network-first strategy</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">networkFirst</span>(<span class="hljs-params">request, cacheName</span>) {
  <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">open</span>(cacheName);

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(request);

    <span class="hljs-keyword">if</span> (response.<span class="hljs-property">ok</span>) {
      cache.<span class="hljs-title function_">put</span>(request, response.<span class="hljs-title function_">clone</span>());
    }

    <span class="hljs-keyword">return</span> response;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">const</span> cached = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">match</span>(request);
    <span class="hljs-keyword">return</span> cached || caches.<span class="hljs-title function_">match</span>(<span class="hljs-string">&#x27;/offline.html&#x27;</span>);
  }
}

<span class="hljs-comment">// Stale-while-revalidate strategy</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">staleWhileRevalidate</span>(<span class="hljs-params">request, cacheName</span>) {
  <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">open</span>(cacheName);
  <span class="hljs-keyword">const</span> cached = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">match</span>(request);

  <span class="hljs-keyword">const</span> fetchPromise = <span class="hljs-title function_">fetch</span>(request).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (response.<span class="hljs-property">ok</span>) {
      cache.<span class="hljs-title function_">put</span>(request, response.<span class="hljs-title function_">clone</span>());
    }
    <span class="hljs-keyword">return</span> response;
  });

  <span class="hljs-keyword">return</span> cached || fetchPromise;
}

<span class="hljs-comment">// Cache-only strategy</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">cacheOnly</span>(<span class="hljs-params">request, cacheName</span>) {
  <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">open</span>(cacheName);
  <span class="hljs-keyword">const</span> cached = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">match</span>(request);

  <span class="hljs-keyword">return</span> cached || <span class="hljs-title function_">fetch</span>(request);
}
</code></pre>
<h2 id="التخزين-المؤقت-المتقدم-باستخدام-workbox">التخزين المؤقت المتقدم باستخدام Workbox</h2>
<p>يبسّط Workbox تنفيذ Service Worker:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// sw.js with Workbox</span>
<span class="hljs-keyword">import</span> { precacheAndRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-precaching&#x27;</span>;
<span class="hljs-keyword">import</span> { registerRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-routing&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CacheFirst</span>, <span class="hljs-title class_">NetworkFirst</span>, <span class="hljs-title class_">StaleWhileRevalidate</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-strategies&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ExpirationPlugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-expiration&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CacheableResponsePlugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-cacheable-response&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">BackgroundSyncPlugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-background-sync&#x27;</span>;

<span class="hljs-comment">// Precache manifest (injected by build tool)</span>
<span class="hljs-title function_">precacheAndRoute</span>(<span class="hljs-variable language_">self</span>.<span class="hljs-property">__WB_MANIFEST</span>);

<span class="hljs-comment">// Cache images with size/age limits</span>
<span class="hljs-title function_">registerRoute</span>(
  <span class="hljs-function">(<span class="hljs-params">{ request }</span>) =&gt;</span> request.<span class="hljs-property">destination</span> === <span class="hljs-string">&#x27;image&#x27;</span>,
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CacheFirst</span>({
    <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;images&#x27;</span>,
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">ExpirationPlugin</span>({
        <span class="hljs-attr">maxEntries</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">maxAgeSeconds</span>: <span class="hljs-number">30</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>, <span class="hljs-comment">// 30 days</span>
        <span class="hljs-attr">purgeOnQuotaError</span>: <span class="hljs-literal">true</span>,
      }),
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">CacheableResponsePlugin</span>({
        <span class="hljs-attr">statuses</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">200</span>],
      }),
    ],
  }),
);

<span class="hljs-comment">// API routes with background sync</span>
<span class="hljs-keyword">const</span> bgSyncPlugin = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BackgroundSyncPlugin</span>(<span class="hljs-string">&#x27;api-queue&#x27;</span>, {
  <span class="hljs-attr">maxRetentionTime</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span>, <span class="hljs-comment">// Retry for up to 24 hours</span>
});

<span class="hljs-title function_">registerRoute</span>(
  <span class="hljs-function">(<span class="hljs-params">{ url }</span>) =&gt;</span> url.<span class="hljs-property">pathname</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;/api/&#x27;</span>),
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">NetworkFirst</span>({
    <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;api-cache&#x27;</span>,
    <span class="hljs-attr">networkTimeoutSeconds</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">ExpirationPlugin</span>({
        <span class="hljs-attr">maxEntries</span>: <span class="hljs-number">50</span>,
        <span class="hljs-attr">maxAgeSeconds</span>: <span class="hljs-number">5</span> * <span class="hljs-number">60</span>, <span class="hljs-comment">// 5 minutes</span>
      }),
      bgSyncPlugin,
    ],
  }),
);

<span class="hljs-comment">// Handle offline page</span>
<span class="hljs-keyword">import</span> { offlineFallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;workbox-recipes&#x27;</span>;

<span class="hljs-title function_">offlineFallback</span>({
  <span class="hljs-attr">pageFallback</span>: <span class="hljs-string">&#x27;/offline.html&#x27;</span>,
});

<span class="hljs-comment">// Runtime caching for Google Fonts</span>
<span class="hljs-title function_">registerRoute</span>(
  <span class="hljs-function">(<span class="hljs-params">{ url }</span>) =&gt;</span> url.<span class="hljs-property">origin</span> === <span class="hljs-string">&#x27;https://fonts.googleapis.com&#x27;</span>,
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">StaleWhileRevalidate</span>({
    <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;google-fonts-stylesheets&#x27;</span>,
  }),
);

<span class="hljs-title function_">registerRoute</span>(
  <span class="hljs-function">(<span class="hljs-params">{ url }</span>) =&gt;</span> url.<span class="hljs-property">origin</span> === <span class="hljs-string">&#x27;https://fonts.gstatic.com&#x27;</span>,
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CacheFirst</span>({
    <span class="hljs-attr">cacheName</span>: <span class="hljs-string">&#x27;google-fonts-webfonts&#x27;</span>,
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">CacheableResponsePlugin</span>({
        <span class="hljs-attr">statuses</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">200</span>],
      }),
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">ExpirationPlugin</span>({
        <span class="hljs-attr">maxAgeSeconds</span>: <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span> * <span class="hljs-number">365</span>, <span class="hljs-comment">// 1 year</span>
        <span class="hljs-attr">maxEntries</span>: <span class="hljs-number">30</span>,
      }),
    ],
  }),
);
</code></pre>
<h2 id="تنفيذ-المزامنة-في-الخلفية">تنفيذ المزامنة في الخلفية</h2>
<p>زامن البيانات عند عودة الاتصال:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// React hook for background sync</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useBackgroundSync</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [syncQueue, setSyncQueue] = useState&lt;<span class="hljs-title class_">SyncItem</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isSyncing, setIsSyncing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> queueSync = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">action</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>) =&gt; {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">syncItem</span>: <span class="hljs-title class_">SyncItem</span> = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>-<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.random()}</span>\`</span>,
      action,
      data,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">attempts</span>: <span class="hljs-number">0</span>,
    };

    <span class="hljs-comment">// Store in IndexedDB for persistence</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">storeSyncItem</span>(syncItem);

    <span class="hljs-comment">// Add to queue</span>
    <span class="hljs-title function_">setSyncQueue</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, syncItem]);

    <span class="hljs-comment">// Register sync event</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;serviceWorker&#x27;</span> <span class="hljs-keyword">in</span> navigator &amp;&amp; <span class="hljs-string">&#x27;SyncManager&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">window</span>) {
      <span class="hljs-keyword">const</span> registration = <span class="hljs-keyword">await</span> navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-property">ready</span>;
      <span class="hljs-keyword">await</span> (registration <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">sync</span>.<span class="hljs-title function_">register</span>(<span class="hljs-string">&#x27;data-sync&#x27;</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Fallback to online event</span>
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;online&#x27;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">processSyncQueue</span>(), { <span class="hljs-attr">once</span>: <span class="hljs-literal">true</span> });
    }
  }, []);

  <span class="hljs-keyword">const</span> processSyncQueue = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">setIsSyncing</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAllSyncItems</span>();

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> items) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">processSyncItem</span>(item);
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">removeSyncItem</span>(item.<span class="hljs-property">id</span>);
        <span class="hljs-title function_">setSyncQueue</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> !== item.<span class="hljs-property">id</span>));
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Sync failed for item:&#x27;</span>, item.<span class="hljs-property">id</span>, error);

        <span class="hljs-comment">// Increment attempts</span>
        item.<span class="hljs-property">attempts</span>++;

        <span class="hljs-keyword">if</span> (item.<span class="hljs-property">attempts</span> &gt;= <span class="hljs-number">3</span>) {
          <span class="hljs-comment">// Max retries reached</span>
          <span class="hljs-keyword">await</span> <span class="hljs-title function_">removeSyncItem</span>(item.<span class="hljs-property">id</span>);
          <span class="hljs-title function_">setSyncQueue</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> !== item.<span class="hljs-property">id</span>));
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">await</span> <span class="hljs-title function_">updateSyncItem</span>(item);
        }
      }
    }

    <span class="hljs-title function_">setIsSyncing</span>(<span class="hljs-literal">false</span>);
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Listen for sync complete messages</span>
    navigator.<span class="hljs-property">serviceWorker</span>?.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;SYNC_COMPLETE&#x27;</span>) {
        <span class="hljs-title function_">setSyncQueue</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> !== event.<span class="hljs-property">data</span>.<span class="hljs-property">id</span>));
      }
    });

    <span class="hljs-comment">// Load existing queue</span>
    <span class="hljs-title function_">getAllSyncItems</span>().<span class="hljs-title function_">then</span>(setSyncQueue);
  }, []);

  <span class="hljs-keyword">return</span> {
    queueSync,
    syncQueue,
    isSyncing,
    processSyncQueue,
  };
}

<span class="hljs-comment">// Service Worker sync handler</span>
<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;sync&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">tag</span> === <span class="hljs-string">&#x27;data-sync&#x27;</span>) {
    event.<span class="hljs-title function_">waitUntil</span>(<span class="hljs-title function_">syncData</span>());
  }
});

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">syncData</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> db = <span class="hljs-keyword">await</span> <span class="hljs-title function_">openDB</span>(<span class="hljs-string">&#x27;sync-store&#x27;</span>, <span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> tx = db.<span class="hljs-title function_">transaction</span>(<span class="hljs-string">&#x27;sync-items&#x27;</span>, <span class="hljs-string">&#x27;readonly&#x27;</span>);
  <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> tx.<span class="hljs-title function_">objectStore</span>(<span class="hljs-string">&#x27;sync-items&#x27;</span>).<span class="hljs-title function_">getAll</span>();

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> items) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/sync&#x27;</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(item),
      });

      <span class="hljs-keyword">if</span> (response.<span class="hljs-property">ok</span>) {
        <span class="hljs-comment">// Remove from store</span>
        <span class="hljs-keyword">const</span> deleteTx = db.<span class="hljs-title function_">transaction</span>(<span class="hljs-string">&#x27;sync-items&#x27;</span>, <span class="hljs-string">&#x27;readwrite&#x27;</span>);
        <span class="hljs-keyword">await</span> deleteTx.<span class="hljs-title function_">objectStore</span>(<span class="hljs-string">&#x27;sync-items&#x27;</span>).<span class="hljs-title function_">delete</span>(item.<span class="hljs-property">id</span>);

        <span class="hljs-comment">// Notify client</span>
        <span class="hljs-keyword">const</span> clients = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">self</span>.<span class="hljs-property">clients</span>.<span class="hljs-title function_">matchAll</span>();
        clients.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">client</span>) =&gt;</span> {
          client.<span class="hljs-title function_">postMessage</span>({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SYNC_COMPLETE&#x27;</span>,
            <span class="hljs-attr">id</span>: item.<span class="hljs-property">id</span>,
          });
        });
      }
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Sync failed:&#x27;</span>, error);
    }
  }
}
</code></pre>
<h2 id="إشعارات-الدفع">إشعارات الدفع</h2>
<p>نفّذ إشعارات الدفع لتعزيز التفاعل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Push notification setup</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePushNotifications</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [permission, setPermission] = useState&lt;<span class="hljs-title class_">NotificationPermission</span>&gt;(<span class="hljs-string">&#x27;default&#x27;</span>);
  <span class="hljs-keyword">const</span> [subscription, setSubscription] = useState&lt;<span class="hljs-title class_">PushSubscription</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setPermission</span>(<span class="hljs-title class_">Notification</span>.<span class="hljs-property">permission</span>);
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">requestPermission</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> permission = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Notification</span>.<span class="hljs-title function_">requestPermission</span>();
    <span class="hljs-title function_">setPermission</span>(permission);

    <span class="hljs-keyword">if</span> (permission === <span class="hljs-string">&#x27;granted&#x27;</span>) {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">subscribeUser</span>();
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">subscribeUser</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> registration = <span class="hljs-keyword">await</span> navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-property">ready</span>;

    <span class="hljs-keyword">const</span> subscription = <span class="hljs-keyword">await</span> registration.<span class="hljs-property">pushManager</span>.<span class="hljs-title function_">subscribe</span>({
      <span class="hljs-attr">userVisibleOnly</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">applicationServerKey</span>: <span class="hljs-title function_">urlBase64ToUint8Array</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">REACT_APP_VAPID_PUBLIC_KEY</span>!),
    });

    <span class="hljs-title function_">setSubscription</span>(subscription);

    <span class="hljs-comment">// Send subscription to server</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/push/subscribe&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(subscription),
    });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">unsubscribe</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (subscription) {
      <span class="hljs-keyword">await</span> subscription.<span class="hljs-title function_">unsubscribe</span>();
      <span class="hljs-title function_">setSubscription</span>(<span class="hljs-literal">null</span>);

      <span class="hljs-comment">// Remove from server</span>
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/push/unsubscribe&#x27;</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">endpoint</span>: subscription.<span class="hljs-property">endpoint</span> }),
      });
    }
  };

  <span class="hljs-keyword">return</span> {
    permission,
    subscription,
    requestPermission,
    unsubscribe,
  };
}

<span class="hljs-comment">// Service Worker push handler</span>
<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;push&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> data = event.<span class="hljs-property">data</span>?.<span class="hljs-title function_">json</span>() || {};

  <span class="hljs-keyword">const</span> options = {
    <span class="hljs-attr">body</span>: data.<span class="hljs-property">body</span> || <span class="hljs-string">&#x27;New notification&#x27;</span>,
    <span class="hljs-attr">icon</span>: data.<span class="hljs-property">icon</span> || <span class="hljs-string">&#x27;/icon-192.png&#x27;</span>,
    <span class="hljs-attr">badge</span>: data.<span class="hljs-property">badge</span> || <span class="hljs-string">&#x27;/badge-72.png&#x27;</span>,
    <span class="hljs-attr">vibrate</span>: data.<span class="hljs-property">vibrate</span> || [<span class="hljs-number">100</span>, <span class="hljs-number">50</span>, <span class="hljs-number">100</span>],
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">dateOfArrival</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">primaryKey</span>: data.<span class="hljs-property">id</span>,
      <span class="hljs-attr">url</span>: data.<span class="hljs-property">url</span> || <span class="hljs-string">&#x27;/&#x27;</span>,
    },
    <span class="hljs-attr">actions</span>: data.<span class="hljs-property">actions</span> || [
      { <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;view&#x27;</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;View&#x27;</span> },
      { <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;dismiss&#x27;</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Dismiss&#x27;</span> },
    ],
  };

  event.<span class="hljs-title function_">waitUntil</span>(<span class="hljs-variable language_">self</span>.<span class="hljs-property">registration</span>.<span class="hljs-title function_">showNotification</span>(data.<span class="hljs-property">title</span> || <span class="hljs-string">&#x27;Notification&#x27;</span>, options));
});

<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;notificationclick&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  event.<span class="hljs-property">notification</span>.<span class="hljs-title function_">close</span>();

  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">action</span> === <span class="hljs-string">&#x27;view&#x27;</span> || !event.<span class="hljs-property">action</span>) {
    event.<span class="hljs-title function_">waitUntil</span>(clients.<span class="hljs-title function_">openWindow</span>(event.<span class="hljs-property">notification</span>.<span class="hljs-property">data</span>.<span class="hljs-property">url</span>));
  }
});
</code></pre>
<h2 id="مكونات-react-العاملة-دون-اتصال">مكوّنات React العاملة دون اتصال</h2>
<p>ابنِ مكوّنات تعمل دون اتصال:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Offline-aware data fetching</span>
<span class="hljs-keyword">function</span> useOfflineData&lt;T&gt;(
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">fetcher</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;,
  <span class="hljs-attr">options</span>?: {
    <span class="hljs-attr">ttl</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">fallback</span>?: T;
  },
) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;T | <span class="hljs-literal">undefined</span>&gt;(options?.<span class="hljs-property">fallback</span>);
  <span class="hljs-keyword">const</span> [isOnline, setIsOnline] = <span class="hljs-title function_">useState</span>(navigator.<span class="hljs-property">onLine</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleOnline</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setIsOnline</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleOffline</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setIsOnline</span>(<span class="hljs-literal">false</span>);

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;online&#x27;</span>, handleOnline);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;offline&#x27;</span>, handleOffline);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;online&#x27;</span>, handleOnline);
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;offline&#x27;</span>, handleOffline);
    };
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">loadData</span>();
  }, [key, isOnline]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-comment">// Try cache first</span>
    <span class="hljs-keyword">const</span> cached = <span class="hljs-keyword">await</span> getCachedData&lt;T&gt;(key);

    <span class="hljs-keyword">if</span> (cached &amp;&amp; <span class="hljs-title function_">isDataFresh</span>(cached, options?.<span class="hljs-property">ttl</span>)) {
      <span class="hljs-title function_">setData</span>(cached.<span class="hljs-property">data</span>);
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);

      <span class="hljs-comment">// Revalidate in background if online</span>
      <span class="hljs-keyword">if</span> (isOnline) {
        <span class="hljs-title function_">revalidateData</span>();
      }
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// No fresh cache, fetch if online</span>
    <span class="hljs-keyword">if</span> (isOnline) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> fresh = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetcher</span>();
        <span class="hljs-title function_">setData</span>(fresh);
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">cacheData</span>(key, fresh);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>);

        <span class="hljs-comment">// Fall back to stale cache if available</span>
        <span class="hljs-keyword">if</span> (cached) {
          <span class="hljs-title function_">setData</span>(cached.<span class="hljs-property">data</span>);
        }
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (cached) {
      <span class="hljs-comment">// Offline: use stale cache</span>
      <span class="hljs-title function_">setData</span>(cached.<span class="hljs-property">data</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Offline with no cache</span>
      <span class="hljs-title function_">setError</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;No cached data available offline&#x27;</span>));
    }

    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">revalidateData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> fresh = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetcher</span>();

      <span class="hljs-comment">// Update if data changed</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(fresh) !== <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data)) {
        <span class="hljs-title function_">setData</span>(fresh);
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">cacheData</span>(key, fresh);
      }
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Background revalidation failed:&#x27;</span>, err);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">mutate</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">updater</span>: (prev: T) =&gt; T</span>) =&gt; {
    <span class="hljs-keyword">const</span> updated = <span class="hljs-title function_">updater</span>(data!);
    <span class="hljs-title function_">setData</span>(updated);

    <span class="hljs-comment">// Optimistically update cache</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">cacheData</span>(key, updated);

    <span class="hljs-comment">// Queue sync if offline</span>
    <span class="hljs-keyword">if</span> (!isOnline) {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">queueSync</span>(<span class="hljs-string">&#x27;update&#x27;</span>, { key, <span class="hljs-attr">data</span>: updated });
    }
  };

  <span class="hljs-keyword">return</span> {
    data,
    isLoading,
    error,
    isOnline,
    mutate,
    <span class="hljs-attr">revalidate</span>: loadData,
  };
}

<span class="hljs-comment">// Offline status indicator</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">OfflineIndicator</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isOnline, setIsOnline] = <span class="hljs-title function_">useState</span>(navigator.<span class="hljs-property">onLine</span>);
  <span class="hljs-keyword">const</span> [showBanner, setShowBanner] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleOnline</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsOnline</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setShowBanner</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setShowBanner</span>(<span class="hljs-literal">false</span>), <span class="hljs-number">3000</span>);
    };

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleOffline</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setIsOnline</span>(<span class="hljs-literal">false</span>);
      <span class="hljs-title function_">setShowBanner</span>(<span class="hljs-literal">true</span>);
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;online&#x27;</span>, handleOnline);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;offline&#x27;</span>, handleOffline);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;online&#x27;</span>, handleOnline);
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;offline&#x27;</span>, handleOffline);
    };
  }, []);

  <span class="hljs-keyword">if</span> (!showBanner) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">offline-banner</span> \${<span class="hljs-attr">isOnline</span> ? &#x27;<span class="hljs-attr">online</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">offline</span>&#x27;}\`}
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;status&quot;</span>
      <span class="hljs-attr">aria-live</span>=<span class="hljs-string">&quot;polite&quot;</span>
    &gt;</span>
      {isOnline ? (
        <span class="hljs-tag">&lt;&gt;</span>✅ Back online<span class="hljs-tag">&lt;/&gt;</span></span>
      ) : (
        <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>⚠️ You&#x27;re offline - changes will sync when connection returns<span class="hljs-tag">&lt;/&gt;</span></span>
      )}
    &lt;/div&gt;
  );
}
</code></pre>
<h2 id="استراتيجيات-إدارة-ذاكرة-التخزين-المؤقت">استراتيجيات إدارة ذاكرة التخزين المؤقت</h2>
<p>إدارة ذكية لذاكرة التخزين المؤقت لأداء أمثل:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Advanced cache management</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">CacheManager</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cacheNames</span> = {
      <span class="hljs-attr">static</span>: <span class="hljs-string">&#x27;static-v1&#x27;</span>,
      <span class="hljs-attr">dynamic</span>: <span class="hljs-string">&#x27;dynamic-v1&#x27;</span>,
      <span class="hljs-attr">api</span>: <span class="hljs-string">&#x27;api-v1&#x27;</span>,
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">limits</span> = {
      <span class="hljs-attr">dynamic</span>: <span class="hljs-number">50</span>,
      <span class="hljs-attr">api</span>: <span class="hljs-number">100</span>,
      <span class="hljs-attr">maxAge</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// 7 days</span>
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">pruneCache</span>(<span class="hljs-params">cacheName, maxItems</span>) {
    <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">open</span>(cacheName);
    <span class="hljs-keyword">const</span> requests = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">keys</span>();

    <span class="hljs-keyword">if</span> (requests.<span class="hljs-property">length</span> &lt;= maxItems) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Sort by last accessed (approximation)</span>
    <span class="hljs-keyword">const</span> sortedRequests = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
      requests.<span class="hljs-title function_">map</span>(<span class="hljs-title function_">async</span> (request) =&gt; {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">match</span>(request);
        <span class="hljs-keyword">const</span> date = response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;date&#x27;</span>);
        <span class="hljs-keyword">return</span> {
          request,
          <span class="hljs-attr">timestamp</span>: date ? <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(date).<span class="hljs-title function_">getTime</span>() : <span class="hljs-number">0</span>,
        };
      }),
    );

    sortedRequests.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">timestamp</span> - b.<span class="hljs-property">timestamp</span>);

    <span class="hljs-comment">// Delete oldest entries</span>
    <span class="hljs-keyword">const</span> toDelete = sortedRequests.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, requests.<span class="hljs-property">length</span> - maxItems);

    <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(toDelete.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">{ request }</span>) =&gt;</span> cache.<span class="hljs-title function_">delete</span>(request)));
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">clearExpiredEntries</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> cacheNames = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">keys</span>();

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> cacheName <span class="hljs-keyword">of</span> cacheNames) {
      <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">open</span>(cacheName);
      <span class="hljs-keyword">const</span> requests = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">keys</span>();

      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> request <span class="hljs-keyword">of</span> requests) {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">match</span>(request);

        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isExpired</span>(response)) {
          <span class="hljs-keyword">await</span> cache.<span class="hljs-title function_">delete</span>(request);
        }
      }
    }
  }

  <span class="hljs-title function_">isExpired</span>(<span class="hljs-params">response</span>) {
    <span class="hljs-keyword">const</span> date = response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;date&#x27;</span>);
    <span class="hljs-keyword">if</span> (!date) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">const</span> age = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(date).<span class="hljs-title function_">getTime</span>();
    <span class="hljs-keyword">return</span> age &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">limits</span>.<span class="hljs-property">maxAge</span>;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">getCacheSize</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;storage&#x27;</span> <span class="hljs-keyword">in</span> navigator &amp;&amp; <span class="hljs-string">&#x27;estimate&#x27;</span> <span class="hljs-keyword">in</span> navigator.<span class="hljs-property">storage</span>) {
      <span class="hljs-keyword">const</span> estimate = <span class="hljs-keyword">await</span> navigator.<span class="hljs-property">storage</span>.<span class="hljs-title function_">estimate</span>();
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">usage</span>: estimate.<span class="hljs-property">usage</span>,
        <span class="hljs-attr">quota</span>: estimate.<span class="hljs-property">quota</span>,
        <span class="hljs-attr">percentage</span>: (estimate.<span class="hljs-property">usage</span> / estimate.<span class="hljs-property">quota</span>) * <span class="hljs-number">100</span>,
      };
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">clearAllCaches</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> cacheNames = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">keys</span>();
    <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(cacheNames.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> caches.<span class="hljs-title function_">delete</span>(name)));
  }
}

<span class="hljs-comment">// Periodic cache cleanup</span>
<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;CLEAN_CACHE&#x27;</span>) {
    <span class="hljs-keyword">const</span> manager = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CacheManager</span>();
    manager.<span class="hljs-title function_">pruneCache</span>(manager.<span class="hljs-property">cacheNames</span>.<span class="hljs-property">dynamic</span>, <span class="hljs-number">50</span>);
    manager.<span class="hljs-title function_">pruneCache</span>(manager.<span class="hljs-property">cacheNames</span>.<span class="hljs-property">api</span>, <span class="hljs-number">100</span>);
    manager.<span class="hljs-title function_">clearExpiredEntries</span>();
  }
});
</code></pre>
<h2 id="تحديثات-service-worker">تحديثات Service Worker</h2>
<p>تعامل مع التحديثات بلطف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Update prompt component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ServiceWorkerUpdatePrompt</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [showPrompt, setShowPrompt] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [waitingWorker, setWaitingWorker] = useState&lt;<span class="hljs-title class_">ServiceWorker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">onServiceWorkerUpdate</span> = (<span class="hljs-params"><span class="hljs-attr">registration</span>: <span class="hljs-title class_">ServiceWorkerRegistration</span></span>) =&gt; {
      <span class="hljs-title function_">setShowPrompt</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-title function_">setWaitingWorker</span>(registration.<span class="hljs-property">waiting</span>);
    };

    <span class="hljs-comment">// Check for waiting worker</span>
    navigator.<span class="hljs-property">serviceWorker</span>?.<span class="hljs-property">ready</span>.<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">registration</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (registration.<span class="hljs-property">waiting</span>) {
        <span class="hljs-title function_">onServiceWorkerUpdate</span>(registration);
      }

      <span class="hljs-comment">// Listen for new waiting workers</span>
      registration.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;updatefound&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> newWorker = registration.<span class="hljs-property">installing</span>;

        newWorker?.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;statechange&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
          <span class="hljs-keyword">if</span> (newWorker.<span class="hljs-property">state</span> === <span class="hljs-string">&#x27;installed&#x27;</span> &amp;&amp; registration.<span class="hljs-property">waiting</span>) {
            <span class="hljs-title function_">onServiceWorkerUpdate</span>(registration);
          }
        });
      });
    });
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!waitingWorker) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Tell waiting worker to skip waiting</span>
    waitingWorker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SKIP_WAITING&#x27;</span> });

    <span class="hljs-comment">// Listen for controlling service worker to change</span>
    navigator.<span class="hljs-property">serviceWorker</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;controllerchange&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-title function_">reload</span>();
    });
  };

  <span class="hljs-keyword">if</span> (!showPrompt) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;update-prompt&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>A new version is available!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleUpdate}</span>&gt;</span>Update Now<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setShowPrompt(false)}&gt;Later<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>تتبّع أداء Service Worker:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Service Worker performance metrics</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ServiceWorkerMetrics</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> = {
      <span class="hljs-attr">cacheHits</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">cacheMisses</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">networkRequests</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">avgResponseTime</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">totalResponseTime</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">requestCount</span>: <span class="hljs-number">0</span>,
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">trackFetch</span>(<span class="hljs-params">event</span>) {
    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">request</span>;

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.<span class="hljs-title function_">match</span>(request);

      <span class="hljs-keyword">if</span> (cache) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">cacheHits</span>++;
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordResponseTime</span>(performance.<span class="hljs-title function_">now</span>() - startTime);
        <span class="hljs-keyword">return</span> cache;
      }

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">cacheMisses</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">networkRequests</span>++;

      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(request);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordResponseTime</span>(performance.<span class="hljs-title function_">now</span>() - startTime);

      <span class="hljs-keyword">return</span> response;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordResponseTime</span>(performance.<span class="hljs-title function_">now</span>() - startTime);
      <span class="hljs-keyword">throw</span> error;
    }
  }

  <span class="hljs-title function_">recordResponseTime</span>(<span class="hljs-params">time</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">totalResponseTime</span> += time;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">requestCount</span>++;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">avgResponseTime</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">totalResponseTime</span> / <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">requestCount</span>;
  }

  <span class="hljs-title function_">getReport</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>,
      <span class="hljs-attr">cacheHitRate</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">cacheHits</span> / (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">cacheHits</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">cacheMisses</span>),
    };
  }
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ServiceWorkerBestPractices</span> {
  <span class="hljs-comment">// Registration</span>
  <span class="hljs-attr">registration</span>: {
    <span class="hljs-attr">checkSupport</span>: <span class="hljs-string">&#x27;Verify browser support before registering&#x27;</span>;
    <span class="hljs-attr">productionOnly</span>: <span class="hljs-string">&#x27;Only register in production builds&#x27;</span>;
    <span class="hljs-attr">updateRegularly</span>: <span class="hljs-string">&#x27;Check for updates periodically&#x27;</span>;
    <span class="hljs-attr">handleErrors</span>: <span class="hljs-string">&#x27;Gracefully handle registration failures&#x27;</span>;
  };

  <span class="hljs-comment">// Caching</span>
  <span class="hljs-attr">caching</span>: {
    <span class="hljs-attr">strategicCaching</span>: <span class="hljs-string">&#x27;Use appropriate strategy per resource type&#x27;</span>;
    <span class="hljs-attr">versionCaches</span>: <span class="hljs-string">&#x27;Version cache names for easy updates&#x27;</span>;
    <span class="hljs-attr">limitCacheSize</span>: <span class="hljs-string">&#x27;Implement cache size limits&#x27;</span>;
    <span class="hljs-attr">expireOldEntries</span>: <span class="hljs-string">&#x27;Remove stale cache entries&#x27;</span>;
  };

  <span class="hljs-comment">// Updates</span>
  <span class="hljs-attr">updates</span>: {
    <span class="hljs-attr">skipWaiting</span>: <span class="hljs-string">&#x27;Allow users to skip waiting for updates&#x27;</span>;
    <span class="hljs-attr">notifyUsers</span>: <span class="hljs-string">&#x27;Inform users about available updates&#x27;</span>;
    <span class="hljs-attr">gracefulMigration</span>: <span class="hljs-string">&#x27;Migrate data between versions&#x27;</span>;
    <span class="hljs-attr">testUpdates</span>: <span class="hljs-string">&#x27;Test update flow thoroughly&#x27;</span>;
  };

  <span class="hljs-comment">// Performance</span>
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">lazyRegistration</span>: <span class="hljs-string">&#x27;Register after page load&#x27;</span>;
    <span class="hljs-attr">selectiveCache</span>: <span class="hljs-string">&#x27;Cache critical resources only&#x27;</span>;
    <span class="hljs-attr">networkTimeout</span>: <span class="hljs-string">&#x27;Set reasonable network timeouts&#x27;</span>;
    <span class="hljs-attr">monitorMetrics</span>: <span class="hljs-string">&#x27;Track cache hit rates and performance&#x27;</span>;
  };
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
