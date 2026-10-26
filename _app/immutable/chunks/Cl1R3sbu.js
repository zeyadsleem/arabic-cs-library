const s="kinney",a="react-performance",n="أداء React",l="optimizing-server-side-rendering",p="تحسين التصيير على الخادم (SSR)",t=[{depth:2,id:"تحدي-أداء-ssr",text:"تحدّي أداء SSR"},{depth:2,id:"نظرة-عامة-على-ssr-المتدفق",text:"نظرة عامة على SSR المتدفق"},{depth:3,id:"حدود-suspense-الاستراتيجية",text:"حدود Suspense الاستراتيجية"},{depth:2,id:"أنماط-جلب-البيانات-الذكية",text:"أنماط جلب البيانات الذكية"},{depth:3,id:"التحميل-المسبق-للبيانات-الحرجة",text:"التحميل المسبق للبيانات الحرجة"},{depth:3,id:"استخدم-خطاف-use-في-react-لفك-الوعود",text:"استخدم خُطّاف use() في React لفكّ الوعود"},{depth:3,id:"جلب-البيانات-على-التوازي-مع-حدود-الأخطاء",text:"جلب البيانات على التوازي مع حدود الأخطاء"},{depth:2,id:"استراتيجيات-تخزين-مؤقت-تنجح-فعلا",text:"استراتيجيات تخزين مؤقت تنجح فعلًا"},{depth:3,id:"تخزين-الاستجابات-مؤقتا-على-مستوى-http",text:"تخزين الاستجابات مؤقتًا على مستوى HTTP"},{depth:3,id:"التخزين-المؤقت-على-مستوى-المكون",text:"التخزين المؤقت على مستوى المكوّن"},{depth:3,id:"جلب-البيانات-مع-إزالة-التكرار",text:"جلب البيانات مع إزالة التكرار"},{depth:2,id:"تحسين-أداء-الترطيب",text:"تحسين أداء الترطيب"},{depth:3,id:"الترطيب-الانتقائي-مع-suspense",text:"الترطيب الانتقائي مع Suspense"},{depth:3,id:"تصغير-حجم-حزمة-javascript",text:"تصغير حجم حزمة JavaScript"},{depth:3,id:"تجنب-عدم-تطابق-الترطيب",text:"تجنّب عدم تطابق الترطيب"},{depth:2,id:"استراتيجية-التنفيذ-الواقعية",text:"استراتيجية التنفيذ الواقعية"},{depth:3,id:"قس-أولا-ثم-حسن",text:"قِس أولًا، ثم حسّن"},{depth:3,id:"مقاربة-التحسين-التدريجي",text:"مقاربة التحسين التدريجي"},{depth:3,id:"راقب-وكرر",text:"راقب وكرّر"},{depth:2,id:"المزالق-الشائعة-وكيفية-تجنبها",text:"المزالق الشائعة وكيفية تجنّبها"},{depth:3,id:"جلب-بيانات-مفرط-في-الحماس",text:"جلب بيانات مفرط في الحماس"},{depth:3,id:"تعقيد-إبطال-الذاكرة-المؤقتة",text:"تعقيد إبطال الذاكرة المؤقتة"}],e=`<p>يستطيع التصيير على الخادم (SSR) أن يحسّن الأداء الملموس لتطبيقك تحسينًا هائلًا عبر إيصال محتوى ذي معنى قبل تحميل JavaScript — لكن SSR ضعيف التحسين قد يضرّ أكثر مما ينفع. فبين أزمنة التصيير الطويلة على الخادم، وجلب البيانات على شكل شلال، والترطيب المكلف، توجد طرق كثيرة لإيذاء نفسك. لنستكشف تقنيات عملية لبناء SSR سريع حقًا: استجابات متدفقة، واستراتيجيات تخزين مؤقت ذكية، وأنماط محسّنة لجلب البيانات، وترطيب لا يحجب الخيط الرئيسي.</p>
<h2 id="تحدي-أداء-ssr">تحدّي أداء SSR</h2>
<p>يضيف SSR خطوة حاسمة إلى خط التصيير لديك: إذ يحتاج خادمك إلى توليد HTML <em>قبل</em> إرسال أي شيء إلى العميل. وهذا يُدخل اختناقات أداء جديدة لا وجود لها في التطبيقات التي تعمل على العميل وحده:</p>
<ul>
<li><strong>تأخيرات زمن الوصول إلى البايت الأول (TTFB)</strong> بينما يجلب خادمك البيانات ويصيّر</li>
<li><strong>جلب البيانات على شكل شلال</strong> الذي يحجب توليد HTML</li>
<li><strong>الترطيب الثقيل</strong> الذي يجمّد الصفحة بمجرد تحميل JavaScript</li>
<li>تعقيد <strong>إبطال الذاكرة المؤقتة</strong> بين الخادم والعميل</li>
</ul>
<p>والخبر السار؟ أن React 19 والأطر الحديثة تمنحنا أدوات قوية لحلّ هذه المشكلات بصورة منهجية.</p>
<h2 id="نظرة-عامة-على-ssr-المتدفق">نظرة عامة على SSR المتدفق</h2>
<p>يتيح SSR المتدفق إرسال HTML أثناء توليده بدل انتظار اكتمال الصفحة. وهذا يقلّل زمن الوصول إلى البايت الأول (TTFB) تقليلًا هائلًا ويحسّن الأداء الملموس.</p>
<p>أهم مزايا التدفق:</p>
<ul>
<li><strong>TTFB أسرع</strong> - أرسل HTML الأولي فورًا</li>
<li><strong>تحميل تدريجي</strong> - بثّ المحتوى فور توفّر البيانات</li>
<li><strong>تجربة مستخدم أفضل</strong> - يرى المستخدمون المحتوى بينما تُحمَّل الأقسام الأبطأ</li>
<li><strong>Core Web Vitals أفضل</strong> - نتائج LCP وFID أحسن</li>
</ul>
<p>لأنماط تنفيذ التدفق المفصّلة، راجع <a href="https://stevekinney.com/courses/react-performance/streaming-ssr-optimization">تحسين SSR المتدفق</a>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Quick streaming example</span>
<span class="hljs-keyword">const</span> stream = <span class="hljs-keyword">await</span> <span class="hljs-title function_">renderToReadableStream</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>, {
  <span class="hljs-attr">bootstrapScripts</span>: [<span class="hljs-string">&#x27;/client.js&#x27;</span>],
    <span class="hljs-title function_">onError</span>(<span class="hljs-params">error</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;SSR Error:&#x27;</span>, error);
    },
  });

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(stream, {
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html&#x27;</span> },
  });
}
</code></pre>
<h3 id="حدود-suspense-الاستراتيجية">حدود <code>Suspense</code> الاستراتيجية</h3>
<p>ضع حدود <code>Suspense</code> حول المكوّنات التي قد تؤخّر التصيير الأولي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* ✅ Static content streams immediately */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchBar</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>

      {/* ✅ Product details stream when data arrives */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ProductDetailsSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{productId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      {/* ✅ Reviews stream independently */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ReviewsSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductReviews</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{productId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductDetails</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// This data fetch doesn&#x27;t block the header/nav from streaming</span>
  <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProduct</span>(productId);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.imageUrl}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{product.description}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ضع حدود Suspense عند مستوى التفصيل الذي كنت ستُظهر عنده حالات التحميل بصورة طبيعية. فكثرة الحدود تخلق تعقيدًا، وقلّتها تفقدك مزايا التدفق.</p>
</blockquote>
<h2 id="أنماط-جلب-البيانات-الذكية">أنماط جلب البيانات الذكية</h2>
<p>أكبر قاتل لأداء SSR هو جلب البيانات المتسلسل. فلا ينبغي لمكوّناتك أن تنشئ شلالات بيانات — اجلب ما تحتاجه على التوازي، وخزّن مؤقتًا بلا تردّد.</p>
<h3 id="التحميل-المسبق-للبيانات-الحرجة">التحميل المسبق للبيانات الحرجة</h3>
<p>ابدأ جلب البيانات مبكرًا في معالج الطلب، قبل أن يبدأ React التصيير حتى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">handleRequest</span>(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) {
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(request.<span class="hljs-property">url</span>);
  <span class="hljs-keyword">const</span> productId = url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;productId&#x27;</span>);

  <span class="hljs-comment">// ✅ Start critical data fetching immediately</span>
  <span class="hljs-keyword">const</span> dataPromises = {
    <span class="hljs-attr">product</span>: productId ? <span class="hljs-title function_">getProduct</span>(productId) : <span class="hljs-literal">null</span>,
    <span class="hljs-attr">user</span>: <span class="hljs-title function_">getUserFromSession</span>(request),
    <span class="hljs-attr">categories</span>: <span class="hljs-title function_">getCategories</span>(), <span class="hljs-comment">// Usually static/cached</span>
  };

  <span class="hljs-comment">// Start rendering while data fetches continue</span>
  <span class="hljs-keyword">const</span> stream = <span class="hljs-keyword">await</span> <span class="hljs-title function_">renderToReadableStream</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span>
      <span class="hljs-attr">productPromise</span>=<span class="hljs-string">{dataPromises.product}</span>
      <span class="hljs-attr">userPromise</span>=<span class="hljs-string">{dataPromises.user}</span>
      <span class="hljs-attr">categoriesPromise</span>=<span class="hljs-string">{dataPromises.categories}</span>
    /&gt;</span></span>,
    { <span class="hljs-attr">bootstrapScripts</span>: [<span class="hljs-string">&#x27;/client.js&#x27;</span>] },
  );

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(stream, {
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html&#x27;</span> },
  });
}
</code></pre>
<h3 id="استخدم-خطاف-use-في-react-لفك-الوعود">استخدم خُطّاف <code>use()</code> في React لفكّ الوعود</h3>
<p>يتيح خُطّاف <code>use()</code> في React 19 للمكوّنات استهلاك الوعود (promises) مباشرة، فيُغني عن إدارة حالة معقّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductDetails</span>(<span class="hljs-params">{ productPromise }: { productPromise: <span class="hljs-built_in">Promise</span>&lt;Product&gt; }</span>) {
  <span class="hljs-comment">// ✅ Suspends until promise resolves</span>
  <span class="hljs-keyword">const</span> product = <span class="hljs-title function_">use</span>(productPromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.imageUrl}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> <span class="hljs-attr">loading</span>=<span class="hljs-string">&quot;lazy&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{product.description}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params">{ productPromise }: { productPromise: <span class="hljs-built_in">Promise</span>&lt;Product&gt; }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ProductSkeleton</span> /&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">productPromise</span>=<span class="hljs-string">{productPromise}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="جلب-البيانات-على-التوازي-مع-حدود-الأخطاء">جلب البيانات على التوازي مع حدود الأخطاء</h3>
<p>اجلب البيانات المستقلة على التوازي وتعامل مع الإخفاقات بلباقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPageData</span>(<span class="hljs-params"><span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-comment">// ✅ Fetch everything in parallel</span>
  <span class="hljs-keyword">const</span> [productResult, reviewsResult, recommendationsResult] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">allSettled</span>([
    <span class="hljs-title function_">getProduct</span>(productId),
    <span class="hljs-title function_">getProductReviews</span>(productId),
    <span class="hljs-title function_">getRecommendations</span>(productId),
  ]);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">product</span>: productResult.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span> ? productResult.<span class="hljs-property">value</span> : <span class="hljs-literal">null</span>,
    <span class="hljs-attr">reviews</span>: reviewsResult.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span> ? reviewsResult.<span class="hljs-property">value</span> : [],
    <span class="hljs-attr">recommendations</span>:
      recommendationsResult.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span> ? recommendationsResult.<span class="hljs-property">value</span> : [],
    <span class="hljs-attr">errors</span>: [productResult, reviewsResult, recommendationsResult]
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;rejected&#x27;</span>)
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> result.<span class="hljs-property">reason</span>),
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params">{ data }: { data: Awaited&lt;ReturnType&lt;<span class="hljs-keyword">typeof</span> getPageData&gt;&gt; }</span>) {
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">product</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Product not found&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{data.product}</span> /&gt;</span>

      {data.reviews.length &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ProductReviews</span> <span class="hljs-attr">reviews</span>=<span class="hljs-string">{data.reviews}</span> /&gt;</span>}

      {data.recommendations.length &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">Recommendations</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{data.recommendations}</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استراتيجيات-تخزين-مؤقت-تنجح-فعلا">استراتيجيات تخزين مؤقت تنجح فعلًا</h2>
<p>يعمل التخزين المؤقت الفعّال لـ SSR على مستويات متعددة: استجابات HTTP، والمكوّنات المصيّرة، وعمليات جلب البيانات. والمفتاح هو إبطال كل مستوى بالطريقة المناسبة.</p>
<h3 id="تخزين-الاستجابات-مؤقتا-على-مستوى-http">تخزين الاستجابات مؤقتًا على مستوى HTTP</h3>
<p>خزّن استجابات HTML الكاملة مؤقتًا للصفحات التي لا تتغيّر كثيرًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">html</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span> }&gt;();

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">renderWithCache</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, ttl = <span class="hljs-number">300000</span></span>) {
  <span class="hljs-comment">// 5 minutes</span>
  <span class="hljs-keyword">const</span> cacheKey = url;
  <span class="hljs-keyword">const</span> cached = cache.<span class="hljs-title function_">get</span>(cacheKey);

  <span class="hljs-comment">// ✅ Serve from cache if still fresh</span>
  <span class="hljs-keyword">if</span> (cached &amp;&amp; <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - cached.<span class="hljs-property">timestamp</span> &lt; ttl) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(cached.<span class="hljs-property">html</span>, {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html&#x27;</span>,
        <span class="hljs-string">&#x27;X-Cache&#x27;</span>: <span class="hljs-string">&#x27;HIT&#x27;</span>,
      },
    });
  }

  <span class="hljs-comment">// Render fresh HTML</span>
  <span class="hljs-keyword">const</span> stream = <span class="hljs-keyword">await</span> <span class="hljs-title function_">renderToReadableStream</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">url</span>=<span class="hljs-string">{url}</span> /&gt;</span></span>);
  <span class="hljs-keyword">const</span> html = <span class="hljs-keyword">await</span> <span class="hljs-title function_">streamToString</span>(stream);

  <span class="hljs-comment">// Cache the complete HTML</span>
  cache.<span class="hljs-title function_">set</span>(cacheKey, { html, <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() });

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(html, {
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html&#x27;</span>,
      <span class="hljs-string">&#x27;X-Cache&#x27;</span>: <span class="hljs-string">&#x27;MISS&#x27;</span>,
    },
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">streamToString</span>(<span class="hljs-params"><span class="hljs-attr">stream</span>: <span class="hljs-title class_">ReadableStream</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; {
  <span class="hljs-keyword">const</span> reader = stream.<span class="hljs-title function_">getReader</span>();
  <span class="hljs-keyword">const</span> decoder = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TextDecoder</span>();
  <span class="hljs-keyword">let</span> html = <span class="hljs-string">&#x27;&#x27;</span>;

  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> { done, value } = <span class="hljs-keyword">await</span> reader.<span class="hljs-title function_">read</span>();
    <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">break</span>;
    html += decoder.<span class="hljs-title function_">decode</span>(value, { <span class="hljs-attr">stream</span>: <span class="hljs-literal">true</span> });
  }

  <span class="hljs-keyword">return</span> html;
}
</code></pre>
<h3 id="التخزين-المؤقت-على-مستوى-المكون">التخزين المؤقت على مستوى المكوّن</h3>
<p>خزّن تصييرات المكوّنات المكلفة مؤقتًا بمعزل عن الصفحة الكاملة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> componentCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span>&gt;();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CachedExpensiveComponent</span>(<span class="hljs-params">{ data, ttl = <span class="hljs-number">60000</span> }: { data: ComplexData; ttl?: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> cacheKey = <span class="hljs-string">\`expensive-<span class="hljs-subst">\${data.id}</span>-<span class="hljs-subst">\${data.version}</span>\`</span>;

  <span class="hljs-comment">// Check for cached component</span>
  <span class="hljs-keyword">if</span> (componentCache.<span class="hljs-title function_">has</span>(cacheKey)) {
    <span class="hljs-keyword">return</span> componentCache.<span class="hljs-title function_">get</span>(cacheKey)!;
  }

  <span class="hljs-comment">// Render expensive component</span>
  <span class="hljs-keyword">const</span> rendered = (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* Expensive calculations/rendering here */}
      <span class="hljs-tag">&lt;<span class="hljs-name">ComplexChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data.chartData}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataVisualization</span> <span class="hljs-attr">metrics</span>=<span class="hljs-string">{data.metrics}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );

  <span class="hljs-comment">// Cache with TTL cleanup</span>
  componentCache.<span class="hljs-title function_">set</span>(cacheKey, rendered);
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> componentCache.<span class="hljs-title function_">delete</span>(cacheKey), ttl);

  <span class="hljs-keyword">return</span> rendered;
}
</code></pre>
<h3 id="جلب-البيانات-مع-إزالة-التكرار">جلب البيانات مع إزالة التكرار</h3>
<p>امنع استدعاءات API المكرّرة عندما تحتاج مكوّنات متعددة إلى البيانات نفسها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> dataCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;();

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> cachedFetch&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>: <span class="hljs-title class_">RequestInit</span> = {}, ttl = <span class="hljs-number">300000</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
  <span class="hljs-keyword">const</span> cacheKey = <span class="hljs-string">\`<span class="hljs-subst">\${url}</span>-<span class="hljs-subst">\${<span class="hljs-built_in">JSON</span>.stringify(options)}</span>\`</span>;

  <span class="hljs-comment">// Return existing promise if already fetching</span>
  <span class="hljs-keyword">if</span> (dataCache.<span class="hljs-title function_">has</span>(cacheKey)) {
    <span class="hljs-keyword">return</span> dataCache.<span class="hljs-title function_">get</span>(cacheKey)!;
  }

  <span class="hljs-comment">// Create new fetch promise</span>
  <span class="hljs-keyword">const</span> promise = <span class="hljs-title function_">fetch</span>(url, options)
    .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP <span class="hljs-subst">\${response.status}</span>: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
      }
      <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
    })
    .<span class="hljs-title function_">finally</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Remove from cache after TTL</span>
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> dataCache.<span class="hljs-title function_">delete</span>(cacheKey), ttl);
    });

  dataCache.<span class="hljs-title function_">set</span>(cacheKey, promise);
  <span class="hljs-keyword">return</span> promise;
}

<span class="hljs-comment">// Usage in components</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductDetails</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// ✅ Multiple components can call this safely - only one actual fetch occurs</span>
  <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> cachedFetch&lt;<span class="hljs-title class_">Product</span>&gt;(<span class="hljs-string">\`/api/products/<span class="hljs-subst">\${productId}</span>\`</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="تحسين-أداء-الترطيب">تحسين أداء الترطيب</h2>
<p>عند الترطيب غالبًا ما تتعثّر تطبيقات SSR — إذ يصبح HTML المصيّر على الخادم تفاعليًا، لكن هذه العملية قد تحجب الخيط الرئيسي مئات الملّيثانية.</p>
<h3 id="الترطيب-الانتقائي-مع-suspense">الترطيب الانتقائي مع <code>Suspense</code></h3>
<p>لا تُرطّب كل شيء دفعة واحدة. استخدم حدود Suspense لترطيب المكوّنات تدريجيًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* ✅ Critical interactive elements hydrate first */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchForm</span> /&gt;</span>

      {/* ✅ Less critical components hydrate when ready */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{null}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">CommentSection</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{null}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">RecommendedProducts</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      {/* ✅ Heavy components can hydrate last */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{null}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">InteractiveMap</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="تصغير-حجم-حزمة-javascript">تصغير حجم حزمة JavaScript</h3>
<p>JavaScript أقل يعني ترطيبًا أسرع. قسّم الشيفرة بلا تردّد وحمّل المكوّنات غير الحرجة عند الحاجة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Load heavy components only when needed</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">InteractiveChart</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./InteractiveChart&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">VideoPlayer</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./VideoPlayer&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CommentEditor</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./CommentEditor&#x27;</span>));

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [showChart, setShowChart] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [showComments, setShowComments] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductInfo</span> /&gt;</span>

      {showChart &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ChartSkeleton</span> /&gt;</span>}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">InteractiveChart</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
      )}

      {showComments &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">CommentsSkeleton</span> /&gt;</span>}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">CommentEditor</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setShowChart(true)}&gt;Show Analytics<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setShowComments(true)}&gt;Add Comment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="تجنب-عدم-تطابق-الترطيب">تجنّب عدم تطابق الترطيب</h3>
<p>يجبر عدم التطابق بين الخادم والعميل React على إعادة تصيير كل شيء من الصفر. ومن الأسباب الشائعة الطوابع الزمنية، والمعرّفات العشوائية، وواجهات API الخاصة بالمتصفح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Will cause hydration mismatch</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CurrentTime</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Current time: {new Date().toLocaleString()}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Consistent between server and client</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CurrentTime</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [time, setTime] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setTime</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toLocaleString</span>());
  }, []);

  <span class="hljs-comment">// Show static content during hydration</span>
  <span class="hljs-keyword">if</span> (time === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading current time...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Current time: {time}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ❌ Random IDs cause mismatches</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">generateId</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(<span class="hljs-number">36</span>);
}

<span class="hljs-comment">// ✅ Stable IDs using useId hook</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">StableComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> id = <span class="hljs-title function_">useId</span>(); <span class="hljs-comment">// Same on server and client</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">{id}</span>&gt;</span>Username:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{id}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استراتيجية-التنفيذ-الواقعية">استراتيجية التنفيذ الواقعية</h2>
<p>إليك مقاربة عملية لتنفيذ SSR محسّن في تطبيقك:</p>
<h3 id="قس-أولا-ثم-حسن">قِس أولًا، ثم حسّن</h3>
<p>أنشئ خطوط أساس للأداء قبل إجراء أي تغييرات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Add performance timing to your SSR handler</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">handleSSRRequest</span>(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) {
  <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">renderPageWithStreaming</span>(request);

    <span class="hljs-keyword">const</span> renderTime = performance.<span class="hljs-title function_">now</span>() - start;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`SSR render time: <span class="hljs-subst">\${renderTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>);

    <span class="hljs-comment">// Add timing header for monitoring</span>
    response.<span class="hljs-property">headers</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;X-Render-Time&#x27;</span>, renderTime.<span class="hljs-title function_">toString</span>());

    <span class="hljs-keyword">return</span> response;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">const</span> errorTime = performance.<span class="hljs-title function_">now</span>() - start;
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`SSR error after <span class="hljs-subst">\${errorTime.toFixed(<span class="hljs-number">2</span>)}</span>ms:\`</span>, error);
    <span class="hljs-keyword">throw</span> error;
  }
}
</code></pre>
<h3 id="مقاربة-التحسين-التدريجي">مقاربة التحسين التدريجي</h3>
<p>ابدأ بأساس SSR متين، ثم أضف التحسينات طبقة فوق طبقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SSROptimizer</span> {
  <span class="hljs-keyword">private</span> cacheEnabled = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> streamingEnabled = <span class="hljs-literal">false</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">options</span>: {
      enableCache?: <span class="hljs-built_in">boolean</span>;
      enableStreaming?: <span class="hljs-built_in">boolean</span>;
      cacheMaxAge?: <span class="hljs-built_in">number</span>;
    } = {},
  </span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cacheEnabled</span> = options.<span class="hljs-property">enableCache</span> ?? <span class="hljs-literal">false</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">streamingEnabled</span> = options.<span class="hljs-property">enableStreaming</span> ?? <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">render</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt; {
    <span class="hljs-comment">// Start with basic SSR</span>
    <span class="hljs-keyword">let</span> renderFunction = <span class="hljs-variable language_">this</span>.<span class="hljs-property">basicSSR</span>;

    <span class="hljs-comment">// Add streaming if enabled</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">streamingEnabled</span>) {
      renderFunction = <span class="hljs-variable language_">this</span>.<span class="hljs-property">streamingSSR</span>;
    }

    <span class="hljs-comment">// Add caching if enabled</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">cacheEnabled</span>) {
      renderFunction = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cachedSSR</span>;
    }

    <span class="hljs-keyword">return</span> <span class="hljs-title function_">renderFunction</span>(url);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">basicSSR</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt; {
    <span class="hljs-keyword">const</span> html = <span class="hljs-keyword">await</span> <span class="hljs-title function_">renderToString</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">url</span>=<span class="hljs-string">{url}</span> /&gt;</span></span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(html, {
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html&#x27;</span> },
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">streamingSSR</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt; {
    <span class="hljs-keyword">const</span> stream = <span class="hljs-keyword">await</span> <span class="hljs-title function_">renderToReadableStream</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">url</span>=<span class="hljs-string">{url}</span> /&gt;</span></span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(stream, {
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/html&#x27;</span> },
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">cachedSSR</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt; {
    <span class="hljs-comment">// Implementation with caching layer</span>
    <span class="hljs-comment">// ...</span>
  }
}
</code></pre>
<h3 id="راقب-وكرر">راقب وكرّر</h3>
<p>أعدّ المراقبة لتتبّع المقاييس المهمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SSRMetrics</span> {
  <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">dataFetchTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">cacheHitRate</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">hydrationTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">timeToFirstByte</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">trackSSRMetrics</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">SSRMetrics</span> {
  <span class="hljs-keyword">const</span> metrics = {
    <span class="hljs-attr">renderTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">dataFetchTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">cacheHitRate</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">hydrationTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">timeToFirstByte</span>: <span class="hljs-number">0</span>,
  };

  <span class="hljs-comment">// Measure server-side rendering time</span>
  <span class="hljs-keyword">const</span> renderStart = performance.<span class="hljs-title function_">now</span>();
  <span class="hljs-comment">// ... render logic</span>
  metrics.<span class="hljs-property">renderTime</span> = performance.<span class="hljs-title function_">now</span>() - renderStart;

  <span class="hljs-comment">// Track cache performance</span>
  metrics.<span class="hljs-property">cacheHitRate</span> = (cacheHits / totalRequests) * <span class="hljs-number">100</span>;

  <span class="hljs-comment">// Client-side hydration timing</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span>) {
    <span class="hljs-keyword">const</span> hydrationStart = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-comment">// ... hydration logic</span>
    metrics.<span class="hljs-property">hydrationTime</span> = performance.<span class="hljs-title function_">now</span>() - hydrationStart;
  }

  <span class="hljs-keyword">return</span> metrics;
}
</code></pre>
<h2 id="المزالق-الشائعة-وكيفية-تجنبها">المزالق الشائعة وكيفية تجنّبها</h2>
<h3 id="جلب-بيانات-مفرط-في-الحماس">جلب بيانات مفرط في الحماس</h3>
<p>لا تجلب بيانات لن تستخدمها. استخدم جلبًا مشروطًا للبيانات بناءً على أذونات المستخدم، أو أعلام الميزات (feature flags)، أو معاملات URL:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Always fetches all data</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPageData</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> [user, posts, comments, analytics] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
    <span class="hljs-title function_">getUser</span>(userId),
    <span class="hljs-title function_">getPosts</span>(userId),
    <span class="hljs-title function_">getComments</span>(userId),
    <span class="hljs-title function_">getAnalytics</span>(userId), <span class="hljs-comment">// Only needed for admin users</span>
  ]);

  <span class="hljs-keyword">return</span> { user, posts, comments, analytics };
}

<span class="hljs-comment">// ✅ Conditional data fetching</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPageData</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">currentUser</span>?: <span class="hljs-title class_">User</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">promises</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;[] = [<span class="hljs-title function_">getUser</span>(userId), <span class="hljs-title function_">getPosts</span>(userId)];

  <span class="hljs-comment">// Only fetch comments if user has permission</span>
  <span class="hljs-keyword">if</span> (currentUser?.<span class="hljs-property">canViewComments</span>) {
    promises.<span class="hljs-title function_">push</span>(<span class="hljs-title function_">getComments</span>(userId));
  }

  <span class="hljs-comment">// Only fetch analytics for admin users</span>
  <span class="hljs-keyword">if</span> (currentUser?.<span class="hljs-property">isAdmin</span>) {
    promises.<span class="hljs-title function_">push</span>(<span class="hljs-title function_">getAnalytics</span>(userId));
  }

  <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(promises);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">user</span>: results[<span class="hljs-number">0</span>],
    <span class="hljs-attr">posts</span>: results[<span class="hljs-number">1</span>],
    <span class="hljs-attr">comments</span>: currentUser?.<span class="hljs-property">canViewComments</span> ? results[<span class="hljs-number">2</span>] : <span class="hljs-literal">null</span>,
    <span class="hljs-attr">analytics</span>: currentUser?.<span class="hljs-property">isAdmin</span> ? results[results.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>] : <span class="hljs-literal">null</span>,
  };
}
</code></pre>
<h3 id="تعقيد-إبطال-الذاكرة-المؤقتة">تعقيد إبطال الذاكرة المؤقتة</h3>
<p>أبقِ إبطال الذاكرة المؤقتة بسيطًا بأنماط متسقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CacheManager</span> {
  <span class="hljs-keyword">private</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;();
  <span class="hljs-keyword">private</span> tags = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;(); <span class="hljs-comment">// tag -&gt; cache keys</span>

  <span class="hljs-title function_">set</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">tags</span>: <span class="hljs-built_in">string</span>[] = []</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">set</span>(key, value);

    <span class="hljs-comment">// Associate cache entry with tags</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> tag <span class="hljs-keyword">of</span> tags) {
      <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">tags</span>.<span class="hljs-title function_">has</span>(tag)) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">tags</span>.<span class="hljs-title function_">set</span>(tag, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
      }
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">tags</span>.<span class="hljs-title function_">get</span>(tag)!.<span class="hljs-title function_">add</span>(key);
    }
  }

  <span class="hljs-comment">// Invalidate all cache entries with specific tags</span>
  <span class="hljs-title function_">invalidateByTags</span>(<span class="hljs-params"><span class="hljs-attr">tags</span>: <span class="hljs-built_in">string</span>[]</span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> tag <span class="hljs-keyword">of</span> tags) {
      <span class="hljs-keyword">const</span> keys = <span class="hljs-variable language_">this</span>.<span class="hljs-property">tags</span>.<span class="hljs-title function_">get</span>(tag);
      <span class="hljs-keyword">if</span> (keys) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">of</span> keys) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">tags</span>.<span class="hljs-title function_">delete</span>(tag);
      }
    }
  }

  <span class="hljs-title function_">get</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(key);
  }
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> cacheManager = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CacheManager</span>();

<span class="hljs-comment">// Cache with relevant tags</span>
cacheManager.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;user-123&#x27;</span>, userData, [<span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-string">&#x27;user-123&#x27;</span>]);
cacheManager.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;posts-user-123&#x27;</span>, userPosts, [<span class="hljs-string">&#x27;posts&#x27;</span>, <span class="hljs-string">&#x27;user-123&#x27;</span>]);

<span class="hljs-comment">// Invalidate all user-related cache when user updates</span>
cacheManager.<span class="hljs-title function_">invalidateByTags</span>([<span class="hljs-string">&#x27;user-123&#x27;</span>]);
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
