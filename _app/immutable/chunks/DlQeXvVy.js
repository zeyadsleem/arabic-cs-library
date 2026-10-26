const s="kinney",a="react-performance",n="أداء React",l="react-server-components-rsc",p="مكوّنات الخادم في React (React Server Components)",t=[{depth:2,id:"ما-مكونات-الخادم-في-react",text:"ما مكوّنات الخادم في React؟"},{depth:2,id:"مكونات-الخادم-مقابل-مكونات-العميل-عمليا",text:"مكوّنات الخادم مقابل مكوّنات العميل عمليًا"},{depth:3,id:"الأسلوب-التقليدي-كل-شيء-على-جهة-العميل",text:"الأسلوب التقليدي (كل شيء على جهة العميل)"},{depth:3,id:"أسلوب-مكونات-الخادم",text:"أسلوب مكوّنات الخادم"},{depth:2,id:"توجيه-use-client",text:"توجيه «use client»"},{depth:2,id:"أنماط-شائعة-وأفضل-الممارسات",text:"أنماط شائعة وأفضل الممارسات"},{depth:3,id:"النمط-1-غلاف-مكون-خادم-مع-جزر-عميل",text:"النمط 1: غلاف مكوّن خادم مع جزر عميل"},{depth:3,id:"النمط-2-البث-باستخدام-suspense",text:"النمط 2: البثّ باستخدام Suspense"},{depth:3,id:"النمط-3-التحسين-التدريجي",text:"النمط 3: التحسين التدريجي"},{depth:2,id:"فوائد-الأداء-والمقايضات",text:"فوائد الأداء والمقايضات"},{depth:3,id:"الجانب-الجيد",text:"الجانب الجيّد"},{depth:3,id:"المقايضات",text:"المقايضات"},{depth:2,id:"استراتيجية-الانتقال-في-العالم-الحقيقي",text:"استراتيجية الانتقال في العالم الحقيقي"},{depth:3,id:"المرحلة-1-تحديد-المرشحين-لمكونات-الخادم",text:"المرحلة 1: تحديد المرشّحين لمكوّنات الخادم"},{depth:3,id:"المرحلة-2-استخراج-جزر-العميل",text:"المرحلة 2: استخراج جزر العميل"},{depth:3,id:"المرحلة-3-توسيع-مكونات-الخادم-تدريجيا",text:"المرحلة 3: توسيع مكوّنات الخادم تدريجيًا"},{depth:2,id:"مزالق-شائعة-وكيف-تتجنبها",text:"مزالق شائعة وكيف تتجنّبها"},{depth:3,id:"المزلق-1-حدود-تسلسل-الخصائص",text:"المزلق 1: حدود تسلسل الخصائص"},{depth:3,id:"المزلق-2-الإفراط-في-مكونات-العميل",text:"المزلق 2: الإفراط في مكوّنات العميل"},{depth:3,id:"المزلق-3-خلط-الاستيرادات",text:"المزلق 3: خلط الاستيرادات"},{depth:2,id:"متى-تستخدم-مكونات-الخادم",text:"متى تستخدم مكوّنات الخادم"}],e=`<p>تغيّر مكوّنات الخادم في React (React Server Components، وتُختصر RSC) جذريًا نظرتنا إلى تطبيقات React، إذ تنقل الحساب إلى الخادم وتبثّ الأجزاء التفاعلية إلى العميل. فبدلًا من إرسال حزم JavaScript ضخمة وجعل كل مكوّن على جهة العميل افتراضيًا، تتيح لك RSC تصيير المكوّنات على الخادم، فتبقي جلب البيانات الثقيل ومكتبات الطرف الثالث ومنطق العمل بعيدًا عن جهاز مستخدمك، ولا تُرطّب إلا الأجزاء التي تحتاج إلى تفاعل.</p>
<p>إذا كنت تصارع أحجام الحزم، أو بطء التحميل الأولي، أو تعقيد إدارة حالة الخادم، فإن RSC تقدّم لك طريقًا واعدًا. سنستكشف ما هي مكوّنات الخادم، وكيف تختلف عن الأساليب التقليدية، والأهم من ذلك: متى وكيف تستخدمها بفعالية في تطبيقاتك على React 19.</p>
<h2 id="ما-مكونات-الخادم-في-react">ما مكوّنات الخادم في React؟</h2>
<p>تعمل مكوّنات الخادم في React على الخادم حصريًا ولا تُرطَّب على العميل أبدًا. وتستطيع الوصول مباشرةً إلى قاعدة بياناتك، أو نظام الملفات، أو أي واجهات API خاصة بالخادم، من دون المخاوف الأمنية أو تضخّم الحزمة الذي يأتي مع شيفرة جهة العميل. وعندما يُصيّر مكوّن الخادم، يُسلسل React خرجه ويبثّه إلى العميل بصيغة خاصة يمكن دمجها بسلاسة مع مكوّنات العميل لديك.</p>
<p>فكّر في مكوّنات الخادم كهدف تصيير جديد، شبيه بتصيير React إلى نص باستخدام <code>renderToString()</code>، لكنك بدلًا من HTML ساكن تحصل على شجرة غنية وتفاعلية يمكن أن تجمع بين محتوى مصيّر على الخادم ومكوّنات على جهة العميل.</p>
<p>وإليك ما يميّزها عن التصيير التقليدي على الخادم (SSR):</p>
<ul>
<li><strong>ترطيب انتقائي</strong>: لا تُرطَّب على العميل إلا مكوّنات العميل</li>
<li><strong>البثّ</strong>: تُبثّ مكوّنات الخادم فور اكتمالها، ما يحسّن الأداء الملموس</li>
<li><strong>وصول مباشر إلى الخادم</strong>: لا حاجة إلى طبقة API للبيانات الخاصة بالخادم</li>
<li><strong>إلغاء الحزمة</strong>: الاعتمادات الخاصة بالخادم لا تصل إلى العميل أبدًا</li>
</ul>
<h2 id="مكونات-الخادم-مقابل-مكونات-العميل-عمليا">مكوّنات الخادم مقابل مكوّنات العميل عمليًا</h2>
<p>لنبدأ بمثال عملي. تخيّل أنك تبني صفحة منتج تحتاج إلى جلب بيانات من قاعدة بياناتك وعرض سلة تسوّق تفاعلية.</p>
<h3 id="الأسلوب-التقليدي-كل-شيء-على-جهة-العميل">الأسلوب التقليدي (كل شيء على جهة العميل)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Everything runs on the client</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [product, setProduct] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/products/<span class="hljs-subst">\${productId}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-title function_">setProduct</span>(data);
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
      });
  }, [productId]);

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!product) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Product not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">AddToCartButton</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{product.id}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>مشكلات هذا الأسلوب:</p>
<ul>
<li>حالات التحميل ومعالجة الأخطاء تُثقل مكوّنك</li>
<li>شلال الشبكة: يُحمَّل HTML، ثم تُحمَّل JavaScript، ثم يحدث نداء API</li>
<li>بنى بيانات مكررة بين الخادم والعميل</li>
<li>نقطة نهاية API تُحتاج فقط للجسر بين بيانات الخادم والعميل</li>
</ul>
<h3 id="أسلوب-مكونات-الخادم">أسلوب مكوّنات الخادم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Server Component - runs only on the server</span>
<span class="hljs-keyword">import</span> { getProduct } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/db&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Direct database access - no API layer needed</span>
  <span class="hljs-keyword">const</span> product = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProduct</span>(productId);

  <span class="hljs-keyword">if</span> (!product) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Product not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>
      {/* Only this component needs client-side interactivity */}
      <span class="hljs-tag">&lt;<span class="hljs-name">AddToCartButton</span> <span class="hljs-attr">productId</span>=<span class="hljs-string">{product.id}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Server Component - no interactivity needed</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductDetails</span>(<span class="hljs-params">{ product }: { product: Product }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{product.description}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.imageUrl}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Client Component - needs onClick handler</span>
(<span class="hljs-string">&#x27;use client&#x27;</span>);
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AddToCartButton</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [isAdding, setIsAdding] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleAddToCart</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setIsAdding</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">addToCart</span>(productId);
    <span class="hljs-title function_">setIsAdding</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleAddToCart}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isAdding}</span>&gt;</span>
      {isAdding ? &#x27;Adding...&#x27; : &#x27;Add to Cart&#x27;}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>مع مكوّنات الخادم:</p>
<ul>
<li>لا حاجة إلى حالات تحميل، فالبيانات متاحة فورًا</li>
<li>استعلامات قاعدة بيانات مباشرة بلا نقاط نهاية API</li>
<li>حزمة عميل أصغر، فلا يُرسَل إلى العميل إلا <code>AddToCartButton</code></li>
<li>تحسين محركات البحث وأداء الرسم الأولي</li>
</ul>
<h2 id="توجيه-use-client">توجيه «use client»</h2>
<p>توجيه <code>'use client'</code> هو اختيارك الصريح للتصيير على جهة العميل. فافتراضيًا تكون المكوّنات مكوّنات خادم في الأطر التي تدعم RSC مثل موجّه التطبيقات في Next.js (Next.js App Router).</p>
<p>وإليك كيف تفكّر في الحدّ الفاصل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server Component (default)</span>
<span class="hljs-keyword">import</span> { getUser } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/auth&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUser</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome, {user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      {/* Server Component */}
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      {/* Client Component boundary starts here */}
      <span class="hljs-tag">&lt;<span class="hljs-name">InteractiveChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{user.analytics}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Still a Server Component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{user.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.bio}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Client Component - needs interactivity</span>
(<span class="hljs-string">&#x27;use client&#x27;</span>);
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">InteractiveChart</span>(<span class="hljs-params">{ data }: { data: AnalyticsData }</span>) {
  <span class="hljs-keyword">const</span> [timeRange, setTimeRange] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;7d&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{timeRange}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setTimeRange(e.target.value)}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;7d&quot;</span>&gt;</span>Last 7 days<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;30d&quot;</span>&gt;</span>Last 30 days<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">timeRange</span>=<span class="hljs-string">{timeRange}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>بمجرد إضافة <code>'use client'</code> إلى مكوّن، يصبح كل أبنائه مكوّنات عميل أيضًا. فصمّم حدود مكوّناتك بعناية لتقليل ما يحتاج إلى العمل على العميل.</p>
</blockquote>
<h2 id="أنماط-شائعة-وأفضل-الممارسات">أنماط شائعة وأفضل الممارسات</h2>
<h3 id="النمط-1-غلاف-مكون-خادم-مع-جزر-عميل">النمط 1: غلاف مكوّن خادم مع جزر عميل</h3>
<p>أبقِ مكوّنات الخادم في المستوى الأعلى، وأضف مكوّنات العميل فقط حيث تدعو الحاجة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server Component - fetches data</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">PostPage</span>(<span class="hljs-params">{ slug }: { slug: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(slug);
  <span class="hljs-keyword">const</span> comments = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getComments</span>(post.<span class="hljs-property">id</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
      {/* Server-rendered content */}
      <span class="hljs-tag">&lt;<span class="hljs-name">PostContent</span> <span class="hljs-attr">post</span>=<span class="hljs-string">{post}</span> /&gt;</span>

      {/* Client islands for interactivity */}
      <span class="hljs-tag">&lt;<span class="hljs-name">LikeButton</span> <span class="hljs-attr">postId</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">initialLikes</span>=<span class="hljs-string">{post.likes}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ShareDialog</span> <span class="hljs-attr">url</span>=<span class="hljs-string">{post.url}</span> <span class="hljs-attr">title</span>=<span class="hljs-string">{post.title}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">CommentSection</span> <span class="hljs-attr">initialComments</span>=<span class="hljs-string">{comments}</span> <span class="hljs-attr">postId</span>=<span class="hljs-string">{post.id}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="النمط-2-البث-باستخدام-suspense">النمط 2: البثّ باستخدام <code>Suspense</code></h3>
<p>تعمل مكوّنات الخادم بانسجام تام مع Suspense في React لبثّ المحتوى فور توفّره:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Dashboard<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

      {/* Fast content renders immediately */}
      <span class="hljs-tag">&lt;<span class="hljs-name">QuickStats</span> /&gt;</span>

      {/* Slow content streams in when ready */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading analytics...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">AnalyticsChart</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading recent activity...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">RecentActivity</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// This might be slow due to complex queries</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AnalyticsChart</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAnalyticsData</span>(); <span class="hljs-comment">// Slow database query</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="النمط-3-التحسين-التدريجي">النمط 3: التحسين التدريجي</h3>
<p>تتفوّق مكوّنات الخادم في التحسين التدريجي، أي بناء تجارب تعمل بلا JavaScript ثم تتحسّن به:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server Component renders the initial state</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params">{ category }: { category: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> products = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProducts</span>(category);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* Works without JavaScript */}
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{products}</span> /&gt;</span>

      {/* Enhanced with JavaScript */}
      <span class="hljs-tag">&lt;<span class="hljs-name">FilterControls</span> <span class="hljs-attr">category</span>=<span class="hljs-string">{category}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">LoadMoreButton</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Client Component adds filtering without page reloads</span>
(<span class="hljs-string">&#x27;use client&#x27;</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">FilterControls</span>(<span class="hljs-params">{ category }: { category: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [filters, setFilters] = <span class="hljs-title function_">useState</span>({});
  <span class="hljs-keyword">const</span> router = <span class="hljs-title function_">useRouter</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleFilterChange</span> = (<span class="hljs-params"><span class="hljs-attr">newFilters</span>: <span class="hljs-built_in">any</span></span>) =&gt; {
    <span class="hljs-title function_">setFilters</span>(newFilters);
    <span class="hljs-comment">// Update URL without page reload</span>
    router.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`/products/<span class="hljs-subst">\${category}</span>?<span class="hljs-subst">\${<span class="hljs-keyword">new</span> URLSearchParams(newFilters)}</span>\`</span>);
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Filter controls */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="فوائد-الأداء-والمقايضات">فوائد الأداء والمقايضات</h2>
<h3 id="الجانب-الجيد">الجانب الجيّد</h3>
<p><strong>حزم JavaScript أصغر</strong>: لا يُرسَل إلى العميل إلا المكوّنات التفاعلية. في مثال صفحة المنتج لدينا، بدلًا من إرسال React وكامل شيفرة تطبيقك ومنطق جلب البيانات، لا ترسل إلا مكوّن <code>AddToCartButton</code>.</p>
<p><strong>تحميل أولي أسرع للصفحة</strong>: تُصيّر مكوّنات الخادم فورًا على الخادم، فلا حاجة إلى طلبات شبكة للبيانات الأولية.</p>
<p><strong>مؤشرات Core Web Vitals أفضل</strong>: JavaScript أقل يعني زمنًا أقصر حتى التفاعل (TTI) ونتائج أفضل في إزاحة التخطيط التراكمية (CLS).</p>
<p><strong>وصول مباشر إلى الخادم</strong>: لا حاجة إلى إنشاء نقاط نهاية API لمجرد جلب البيانات للتصيير الأولي.</p>
<h3 id="المقايضات">المقايضات</h3>
<p><strong>تعقيد الإطار</strong>: تتطلب RSC إطارًا مثل Next.js أو Remix مع أدوات بناء مناسبة. فلا تستطيع إسقاط مكوّنات الخادم في أي تطبيق React كما تشاء.</p>
<p><strong>تغيّر في النموذج الذهني</strong>: عليك التفكير في الحدود بين الخادم والعميل وفهم قيود التسلسل.</p>
<p><strong>تحديات في التنقيح</strong>: قد تمتد آثار المكدّس بين الخادم والعميل، ما يجعل التنقيح أكثر تعقيدًا.</p>
<p><strong>دعم محدود من المنظومة</strong>: ليست كل مكتبات React تعمل مع مكوّنات الخادم بعد.</p>
<h2 id="استراتيجية-الانتقال-في-العالم-الحقيقي">استراتيجية الانتقال في العالم الحقيقي</h2>
<p>إذا كنت تفكّر في تبنّي RSC لتطبيق قائم، فإليك مقاربة عملية:</p>
<h3 id="المرحلة-1-تحديد-المرشحين-لمكونات-الخادم">المرحلة 1: تحديد المرشّحين لمكوّنات الخادم</h3>
<p>ابحث عن المكوّنات التي:</p>
<ul>
<li>تجلب البيانات عند التثبيت باستخدام <code>useEffect</code></li>
<li>لا تحتاج تفاعل المستخدم (نقرات، حقول نماذج، وما شابه)</li>
<li>تصيّر المحتوى نفسه لجميع المستخدمين (أو يمكن تخصيصها على الخادم)</li>
<li>تستورد مكتبات ثقيلة يمكن أن تبقى على الخادم</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Great Server Component candidate</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BlogPost</span>(<span class="hljs-params">{ slug }: { slug: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [post, setPost] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchPost</span>(slug).<span class="hljs-title function_">then</span>(setPost);
  }, [slug]);

  <span class="hljs-keyword">if</span> (!post) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">post.content</span> }} /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="المرحلة-2-استخراج-جزر-العميل">المرحلة 2: استخراج جزر العميل</h3>
<p>حدّد الأجزاء التفاعلية وافصلها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server Component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">BlogPost</span>(<span class="hljs-params">{ slug }: { slug: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(slug);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">post.content</span> }} /&gt;</span>

      {/* Client island */}
      <span class="hljs-tag">&lt;<span class="hljs-name">LikeButton</span> <span class="hljs-attr">postId</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">initialLikes</span>=<span class="hljs-string">{post.likes}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Client Component - only ships interactive code</span>
(<span class="hljs-string">&#x27;use client&#x27;</span>);
<span class="hljs-keyword">function</span> <span class="hljs-title function_">LikeButton</span>(<span class="hljs-params">{ postId, initialLikes }: { postId: <span class="hljs-built_in">string</span>; initialLikes: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [likes, setLikes] = <span class="hljs-title function_">useState</span>(initialLikes);
  <span class="hljs-keyword">const</span> [isLiking, setIsLiking] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-comment">// Interactive logic here...</span>
}
</code></pre>
<h3 id="المرحلة-3-توسيع-مكونات-الخادم-تدريجيا">المرحلة 3: توسيع مكوّنات الخادم تدريجيًا</h3>
<p>بعد أن تألف هذه الأنماط، انقل مزيدًا من المكوّنات إلى الخادم تدريجيًا:</p>
<ul>
<li>مكوّنات المحتوى الساكن (الترويسات، والتذييلات، والتنقّل)</li>
<li>المكوّنات كثيفة البيانات (لوحات المعلومات، والتقارير، وقوائم المنتجات)</li>
<li>الصفحات الحسّاسة لتحسين محركات البحث (صفحات الهبوط، ومنشورات المدوّنات، وصفحات المنتجات)</li>
</ul>
<h2 id="مزالق-شائعة-وكيف-تتجنبها">مزالق شائعة وكيف تتجنّبها</h2>
<h3 id="المزلق-1-حدود-تسلسل-الخصائص">المزلق 1: حدود تسلسل الخصائص</h3>
<p>لا تستطيع مكوّنات الخادم تمرير إلا بيانات قابلة للتسلسل إلى مكوّنات العميل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This won&#x27;t work</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ServerComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;clicked&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ClientComponent</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span> /&gt;</span></span>; <span class="hljs-comment">// Functions aren&#x27;t serializable</span>
}

<span class="hljs-comment">// ✅ Instead, handle events in Client Components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ClientComponent</span>(<span class="hljs-params">{ data }: { data: SerializableData }</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;clicked&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h3 id="المزلق-2-الإفراط-في-مكونات-العميل">المزلق 2: الإفراط في مكوّنات العميل</h3>
<p>لا تضع <code>'use client'</code> على كل شيء احتياطًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary client boundary</span>
<span class="hljs-string">&#x27;use client&#x27;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Page</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StaticHeader</span> /&gt;</span> {/* Could be Server Component */}
      <span class="hljs-tag">&lt;<span class="hljs-name">UserDashboard</span> /&gt;</span> {/* Could be Server Component */}
      <span class="hljs-tag">&lt;<span class="hljs-name">InteractiveWidget</span> /&gt;</span> {/* Actually needs client */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Only client components need the directive</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Page</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Server Component</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StaticHeader</span> /&gt;</span> {/* Server Component */}
      <span class="hljs-tag">&lt;<span class="hljs-name">UserDashboard</span> /&gt;</span> {/* Server Component */}
      <span class="hljs-tag">&lt;<span class="hljs-name">InteractiveWidget</span> /&gt;</span> {/* Client Component */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="المزلق-3-خلط-الاستيرادات">المزلق 3: خلط الاستيرادات</h3>
<p>احترس من استيراد شيفرة خاصة بالخادم داخل مكوّنات العميل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will cause build errors</span>
<span class="hljs-string">&#x27;use client&#x27;</span>;
<span class="hljs-keyword">import</span> { db } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/database&#x27;</span>; <span class="hljs-comment">// Server-only import</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ClientComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// This won&#x27;t work - db access is server-only</span>
}

<span class="hljs-comment">// ✅ Pass data from Server Component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ServerWrapper</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> db.<span class="hljs-title function_">getUser</span>(); <span class="hljs-comment">// Server-only</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ClientComponent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>;
}

(<span class="hljs-string">&#x27;use client&#x27;</span>);
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ClientComponent</span>(<span class="hljs-params">{ data }: { data: User }</span>) {
  <span class="hljs-comment">// Use the pre-fetched data</span>
}
</code></pre>
<h2 id="متى-تستخدم-مكونات-الخادم">متى تستخدم مكوّنات الخادم</h2>
<p>تتألّق مكوّنات الخادم حين:</p>
<ul>
<li><strong>الواجهات كثيفة البيانات</strong>: لوحات المعلومات، ولوحات الإدارة، وأدوات التقارير</li>
<li><strong>الصفحات كثيفة المحتوى</strong>: المدوّنات، والتوثيق، والصفحات التسويقية</li>
<li><strong>صفحات منتجات التجارة الإلكترونية</strong>: حيث تكون سرعة التحميل الأولي حرجة</li>
<li><strong>تطبيقات الويب التقدّمية</strong>: حيث تريد تحميلًا أوليًا سريعًا مع تفاعلية معزّزة</li>
</ul>
<p>وهي أقل ملاءمةً لـ:</p>
<ul>
<li><strong>التطبيقات شديدة التفاعلية</strong>: الألعاب الزمنية الحقيقية، وتطبيقات الرسم، ومحرّرات النصوص الغنية</li>
<li><strong>التطبيقات كثيفة التوجيه على جهة العميل</strong>: حيث تحتاج تنقّلًا فوريًا</li>
<li><strong>التطبيقات المليئة بالمحتوى الديناميكي المخصّص</strong>: الذي لا يمكن حسابه على الخادم</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
