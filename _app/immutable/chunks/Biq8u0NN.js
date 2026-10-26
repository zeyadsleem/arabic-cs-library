const s="kinney",a="react-performance",n="أداء React",l="streaming-ssr-optimization",p="تحسين التدفق في التصيير على الخادم (SSR)",t=[{depth:2,id:"فهم-التدفق-في-التصيير-على-الخادم",text:"فهم التدفق في التصيير على الخادم"},{depth:2,id:"تنفيذ-التدفق-في-التصيير-على-الخادم",text:"تنفيذ التدفق في التصيير على الخادم"},{depth:3,id:"إعداد-التدفق-الأساسي",text:"إعداد التدفق الأساسي"},{depth:3,id:"حدود-suspense-من-أجل-التدفق",text:"حدود Suspense من أجل التدفق"},{depth:3,id:"جلب-البيانات-من-أجل-التدفق",text:"جلب البيانات من أجل التدفق"},{depth:2,id:"أنماط-تدفق-متقدمة",text:"أنماط تدفق متقدمة"},{depth:3,id:"التدفق-القائم-على-الأولوية",text:"التدفق القائم على الأولوية"},{depth:3,id:"التدفق-مع-تحديثات-الزمن-الحقيقي",text:"التدفق مع تحديثات الزمن الحقيقي"},{depth:2,id:"الترطيب-التدريجي",text:"الترطيب التدريجي"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"مراقبة-أداء-التدفق",text:"مراقبة أداء التدفق"},{depth:3,id:"تدفق-صديق-لذاكرة-التخزين-المؤقت",text:"تدفق صديق لذاكرة التخزين المؤقت"},{depth:2,id:"الحالات-الطرفية-ومعالجة-الأخطاء",text:"الحالات الطرفية ومعالجة الأخطاء"},{depth:3,id:"استرداد-أخطاء-التدفق",text:"استرداد أخطاء التدفق"},{depth:2,id:"اختبار-التدفق-في-التصيير-على-الخادم",text:"اختبار التدفق في التصيير على الخادم"}],e=`<p>يجبر التصيير التقليدي على جانب الخادم المستخدمين على انتظار توليد الصفحة كاملة قبل تلقّي أي HTML. فمع 10,000 منتج للتصيير، يحدّق المستخدمون في شاشة فارغة بينما يطحن خادمك البيانات. يغيّر التدفق في التصيير على الخادم (Streaming SSR) هذا: فهو يرسل HTML فور جهوزه، قطعةً قطعة، فيخلق إحساسًا بالتحميل الفوري حتى عندما يستغرق توليد الصفحة كاملة وقتًا.</p>
<p>تحوّل قدرات التدفق في React 18 التصيير البطيء على الخادم من عبء إلى ميزة تنافسية. يرى المستخدمون محتوى أعلى الشاشة فورًا بينما تتدفق الأقسام الأسفل تدريجيًا. والنتيجة؟ تحسّن جذري في زمن الوصول إلى البايت الأول (TTFB)، ونتائج أفضل لمؤشرات الويب الأساسية، ومستخدمون يبقون متفاعلين بدلًا من الهروب إلى منافسين أسرع.</p>
<h2 id="فهم-التدفق-في-التصيير-على-الخادم">فهم التدفق في التصيير على الخادم</h2>
<p>التصيير التقليدي على الخادم متزامن — يجب على الخادم إكمال الصفحة كاملة قبل إرسال أي HTML:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Traditional SSR - All or nothing approach</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (req, res) =&gt; {
  <span class="hljs-comment">// Server waits for ALL data before rendering</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>();
  <span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchPosts</span>(); <span class="hljs-comment">// Slow database query</span>
  <span class="hljs-keyword">const</span> comments = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchComments</span>(); <span class="hljs-comment">// Even slower</span>
  <span class="hljs-keyword">const</span> recommendations = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchRecommendations</span>(); <span class="hljs-comment">// Slowest</span>

  <span class="hljs-comment">// Only now can we render and send HTML</span>
  <span class="hljs-keyword">const</span> html = <span class="hljs-title function_">renderToString</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> <span class="hljs-attr">comments</span>=<span class="hljs-string">{comments}</span> <span class="hljs-attr">recommendations</span>=<span class="hljs-string">{recommendations}</span> /&gt;</span></span>,
  );

  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">\`
    &lt;!DOCTYPE html&gt;
    
      &lt;head&gt;...&lt;/head&gt;
      &lt;body&gt;
        &lt;div id=&quot;root&quot;&gt;<span class="hljs-subst">\${html}</span>&lt;/div&gt;
      &lt;/body&gt;
    
  \`</span>);
});

<span class="hljs-comment">// Result: 3+ second wait for TTFB, blank screen for users</span>
</code></pre>
<p>يكسر التدفق في التصيير على الخادم هذا الاختناق بإرسال HTML على نحو تدريجي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Streaming SSR - Progressive HTML delivery</span>
<span class="hljs-keyword">import</span> { renderToPipeableStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom/server&#x27;</span>;

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-comment">// Start streaming immediately</span>
  <span class="hljs-keyword">const</span> { pipe } = <span class="hljs-title function_">renderToPipeableStream</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>, {
    <span class="hljs-attr">bootstrapScripts</span>: [<span class="hljs-string">&#x27;/client.js&#x27;</span>],
    <span class="hljs-title function_">onShellReady</span>(<span class="hljs-params"></span>) {
      <span class="hljs-comment">// Send initial HTML shell immediately</span>
      res.<span class="hljs-property">statusCode</span> = <span class="hljs-number">200</span>;
      res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;text/html&#x27;</span>);
      <span class="hljs-title function_">pipe</span>(res);
    },
    <span class="hljs-title function_">onError</span>(<span class="hljs-params">error</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Streaming error:&#x27;</span>, error);
      res.<span class="hljs-property">statusCode</span> = <span class="hljs-number">500</span>;
      res.<span class="hljs-title function_">end</span>(<span class="hljs-string">&#x27;Server Error&#x27;</span>);
    },
  });
});

<span class="hljs-comment">// Result: Sub-100ms TTFB, immediate visual feedback</span>
</code></pre>
<h2 id="تنفيذ-التدفق-في-التصيير-على-الخادم">تنفيذ التدفق في التصيير على الخادم</h2>
<h3 id="إعداد-التدفق-الأساسي">إعداد التدفق الأساسي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// server/streaming-ssr.ts</span>
<span class="hljs-keyword">import</span> { createReadableStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;stream/web&#x27;</span>;
<span class="hljs-keyword">import</span> { renderToPipeableStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom/server&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">StreamingSSRConfig</span> {
  <span class="hljs-attr">bootstrapScripts</span>?: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">bootstrapModules</span>?: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">onShellReady</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onAllReady</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">StreamingSSRRenderer</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">StreamingSSRConfig</span> = {}</span>) {}

  <span class="hljs-title function_">renderToStream</span>(<span class="hljs-attr">element</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span>): <span class="hljs-title class_">ReadableStream</span>&lt;<span class="hljs-title class_">Uint8Array</span>&gt; {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">controller</span>: <span class="hljs-title class_">ReadableStreamDefaultController</span>&lt;<span class="hljs-title class_">Uint8Array</span>&gt;;

    <span class="hljs-keyword">const</span> stream = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ReadableStream</span>&lt;<span class="hljs-title class_">Uint8Array</span>&gt;({
      <span class="hljs-title function_">start</span>(<span class="hljs-params">c</span>) {
        controller = c;
      },
    });

    <span class="hljs-keyword">const</span> { pipe } = <span class="hljs-title function_">renderToPipeableStream</span>(element, {
      <span class="hljs-attr">bootstrapScripts</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">bootstrapScripts</span> || [<span class="hljs-string">&#x27;/build/client.js&#x27;</span>],
      <span class="hljs-attr">bootstrapModules</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">bootstrapModules</span>,

      <span class="hljs-attr">onShellReady</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Send initial shell - above-the-fold content</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">onShellReady</span>?.();
      },

      <span class="hljs-attr">onAllReady</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// All Suspense boundaries resolved</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">onAllReady</span>?.();
      },

      <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Streaming SSR error:&#x27;</span>, error);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">onError</span>?.(error);

        <span class="hljs-comment">// Send error fallback</span>
        <span class="hljs-keyword">const</span> errorHTML = <span class="hljs-string">\`
          &lt;div style=&quot;padding: 20px; border: 1px solid red; background: #ffebee;&quot;&gt;
            &lt;h3&gt;Something went wrong&lt;/h3&gt;
            &lt;p&gt;Please try refreshing the page.&lt;/p&gt;
          &lt;/div&gt;
        \`</span>;

        controller.<span class="hljs-title function_">enqueue</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TextEncoder</span>().<span class="hljs-title function_">encode</span>(errorHTML));
        controller.<span class="hljs-title function_">close</span>();
      },

      <span class="hljs-attr">onShellError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) =&gt;</span> {
        <span class="hljs-comment">// Critical shell error - fall back to client rendering</span>
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Shell error:&#x27;</span>, error);
        controller.<span class="hljs-title function_">close</span>();
      },
    });

    <span class="hljs-comment">// Pipe React&#x27;s stream to our ReadableStream</span>
    <span class="hljs-title function_">pipe</span>({
      <span class="hljs-attr">write</span>: <span class="hljs-function">(<span class="hljs-params">chunk</span>) =&gt;</span> {
        controller.<span class="hljs-title function_">enqueue</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">TextEncoder</span>().<span class="hljs-title function_">encode</span>(chunk));
      },
      <span class="hljs-attr">end</span>: <span class="hljs-function">() =&gt;</span> {
        controller.<span class="hljs-title function_">close</span>();
      },
    });

    <span class="hljs-keyword">return</span> stream;
  }
}

<span class="hljs-comment">// Express.js integration</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> renderer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">StreamingSSRRenderer</span>({
    <span class="hljs-attr">bootstrapScripts</span>: [<span class="hljs-string">&#x27;/build/client.js&#x27;</span>],

    <span class="hljs-attr">onShellReady</span>: <span class="hljs-function">() =&gt;</span> {
      res.<span class="hljs-property">statusCode</span> = <span class="hljs-number">200</span>;
      res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;text/html; charset=utf-8&#x27;</span>);
      res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Transfer-Encoding&#x27;</span>, <span class="hljs-string">&#x27;chunked&#x27;</span>);
    },

    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      res.<span class="hljs-property">statusCode</span> = <span class="hljs-number">500</span>;
    },
  });

  <span class="hljs-keyword">const</span> stream = renderer.<span class="hljs-title function_">renderToStream</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Streaming SSR App<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Head</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">url</span>=<span class="hljs-string">{req.url}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Body</span>&gt;</span></span>
    ,
  );

  <span class="hljs-comment">// Convert web stream to Node stream for Express</span>
  <span class="hljs-keyword">const</span> nodeStream = <span class="hljs-title class_">Readable</span>.<span class="hljs-title function_">fromWeb</span>(stream);
  nodeStream.<span class="hljs-title function_">pipe</span>(res);
});
</code></pre>
<h3 id="حدود-suspense-من-أجل-التدفق">حدود <code>Suspense</code> من أجل التدفق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/StreamingApp.tsx</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span>, lazy } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Lazy load components that depend on slow data</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserProfile</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./UserProfile&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductRecommendations</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./ProductRecommendations&#x27;</span>));
<span class="hljs-keyword">const</span> <span class="hljs-title class_">RecentActivity</span> = <span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./RecentActivity&#x27;</span>));

<span class="hljs-comment">// Skeleton components for loading states</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfileSkeleton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-profile-skeleton&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton avatar&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">80</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">80</span>, <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">50</span>%&#x27; }} /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton-content&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton name&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">160</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">24</span>, <span class="hljs-attr">marginBottom:</span> <span class="hljs-attr">8</span> }} /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton email&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">200</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">16</span>, <span class="hljs-attr">marginBottom:</span> <span class="hljs-attr">4</span> }} /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton role&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">120</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">16</span> }} /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductRecommendationsSkeleton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;recommendations-skeleton&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Recommended for you<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-grid&quot;</span>&gt;</span>
        {Array.from({ length: 4 }, (_, i) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-skeleton&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton product-image&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> &#x27;<span class="hljs-attr">100</span>%&#x27;, <span class="hljs-attr">height:</span> <span class="hljs-attr">200</span> }} /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton product-title&quot;</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> &#x27;<span class="hljs-attr">80</span>%&#x27;, <span class="hljs-attr">height:</span> <span class="hljs-attr">16</span>, <span class="hljs-attr">margin:</span> &#x27;<span class="hljs-attr">8px</span> <span class="hljs-attr">0</span>&#x27; }}
            /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;skeleton product-price&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> &#x27;<span class="hljs-attr">40</span>%&#x27;, <span class="hljs-attr">height:</span> <span class="hljs-attr">20</span> }} /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">StreamingApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      {/* Immediate content - no Suspense needed */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span>

      {/* Above-the-fold content that&#x27;s fast to load */}
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;main-content&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;hero&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome to Our Store<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Discover amazing products<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>

        {/* First streaming boundary - user-specific data */}
        <span class="hljs-tag">&lt;<span class="hljs-name">aside</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;sidebar&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">UserProfileSkeleton</span> /&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>

        {/* Second streaming boundary - slow product recommendations */}
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;recommendations&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ProductRecommendationsSkeleton</span> /&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">ProductRecommendations</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>

        {/* Third streaming boundary - non-critical activity feed */}
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;activity-feed&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-spinner&quot;</span>&gt;</span>Loading recent activity...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">RecentActivity</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="جلب-البيانات-من-أجل-التدفق">جلب البيانات من أجل التدفق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/streaming-data.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Create a cache for streaming data promises</span>
<span class="hljs-keyword">const</span> streamingCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;();

<span class="hljs-comment">/**
 * Suspend component rendering until data is available
 * Integrates with React&#x27;s streaming SSR
 */</span>
<span class="hljs-keyword">function</span> suspendUntilData&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fetcher</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;): T {
  <span class="hljs-keyword">if</span> (!streamingCache.<span class="hljs-title function_">has</span>(key)) {
    <span class="hljs-keyword">const</span> promise = <span class="hljs-title function_">fetcher</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-comment">// Remove failed promise from cache so it can be retried</span>
      streamingCache.<span class="hljs-title function_">delete</span>(key);
      <span class="hljs-keyword">throw</span> error;
    });

    streamingCache.<span class="hljs-title function_">set</span>(key, promise);
  }

  <span class="hljs-keyword">const</span> promise = streamingCache.<span class="hljs-title function_">get</span>(key)!;

  <span class="hljs-comment">// Check if promise is resolved</span>
  <span class="hljs-keyword">if</span> (promise.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span>) {
    <span class="hljs-keyword">return</span> promise.<span class="hljs-property">value</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (promise.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;rejected&#x27;</span>) {
    <span class="hljs-keyword">throw</span> promise.<span class="hljs-property">reason</span>;
  }

  <span class="hljs-comment">// Promise is still pending - suspend the component</span>
  <span class="hljs-keyword">throw</span> promise;
}

<span class="hljs-comment">// React components that use streaming data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// This will suspend until user data is available</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">suspendUntilData</span>(<span class="hljs-string">&#x27;current-user&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/user/current&#x27;</span>);
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-profile&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">user.name</span>} <span class="hljs-attr">avatar</span>\`} /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;role&quot;</span>&gt;</span>{user.role}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductRecommendations</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Suspend until recommendations are loaded</span>
  <span class="hljs-keyword">const</span> recommendations = <span class="hljs-title function_">suspendUntilData</span>(<span class="hljs-string">&#x27;product-recommendations&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Simulate slow recommendation algorithm</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">2000</span>));

    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/recommendations&#x27;</span>);
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch recommendations&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;recommendations&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Recommended for you<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-grid&quot;</span>&gt;</span>
        {recommendations.map((product: Product) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">ProductCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Advanced: Streaming with error boundaries</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">StreamingErrorBoundary</span>(<span class="hljs-params">{
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ComponentType&lt;{ error: <span class="hljs-built_in">Error</span> }&gt;;
}</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>
      <span class="hljs-attr">fallback</span>=<span class="hljs-string">{({</span> <span class="hljs-attr">error</span> }) =&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">fallback</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{error}</span> /&gt;</span>}
      onError={(error, errorInfo) =&gt; {
        // Log streaming errors for monitoring
        console.error(&#x27;Streaming boundary error:&#x27;, error, errorInfo);

        // Send to error tracking service
        if (typeof window !== &#x27;undefined&#x27;) {
          // Client-side error tracking
          window.errorTracker?.captureException(error, {
            context: &#x27;streaming-ssr&#x27;,
            errorInfo,
          });
        }
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-تدفق-متقدمة">أنماط تدفق متقدمة</h2>
<h3 id="التدفق-القائم-على-الأولوية">التدفق القائم على الأولوية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Priority-based streaming for optimal user experience</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">StreamingPriority</span> {
  <span class="hljs-attr">critical</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>[]; <span class="hljs-comment">// Above-the-fold content</span>
  <span class="hljs-attr">important</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>[]; <span class="hljs-comment">// User-specific data</span>
  <span class="hljs-attr">nice</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>[]; <span class="hljs-comment">// Recommendations, ads</span>
  <span class="hljs-attr">background</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>[]; <span class="hljs-comment">// Analytics, tracking</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PriorityStreamingApp</span>(<span class="hljs-params">{ content }: { content: StreamingPriority }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      {/* Priority 1: Critical path - no Suspense */}
      {content.critical}

      {/* Priority 2: Important content - fast timeout */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ImportantContentSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">StreamingBoundary</span> <span class="hljs-attr">timeout</span>=<span class="hljs-string">{500}</span>&gt;</span>{content.important}<span class="hljs-tag">&lt;/<span class="hljs-name">StreamingBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      {/* Priority 3: Nice-to-have - longer timeout */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">NiceContentSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">StreamingBoundary</span> <span class="hljs-attr">timeout</span>=<span class="hljs-string">{2000}</span>&gt;</span>{content.nice}<span class="hljs-tag">&lt;/<span class="hljs-name">StreamingBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      {/* Priority 4: Background - no timeout, fail silently */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{null}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">StreamingBoundary</span> <span class="hljs-attr">timeout</span>=<span class="hljs-string">{Infinity}</span>&gt;</span>{content.background}<span class="hljs-tag">&lt;/<span class="hljs-name">StreamingBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Custom boundary with timeout and error handling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">StreamingBoundary</span>(<span class="hljs-params">{
  children,
  timeout,
  fallback = <span class="hljs-literal">null</span>,
}: {
  children: React.ReactNode;
  timeout: <span class="hljs-built_in">number</span>;
  fallback?: React.ReactNode;
}</span>) {
  <span class="hljs-keyword">const</span> [timedOut, setTimedOut] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (timeout === <span class="hljs-title class_">Infinity</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setTimedOut</span>(<span class="hljs-literal">true</span>);
    }, timeout);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timer);
  }, [timeout]);

  <span class="hljs-keyword">if</span> (timedOut) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{fallback}<span class="hljs-tag">&lt;/&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children}<span class="hljs-tag">&lt;/&gt;</span></span>;
}
</code></pre>
<h3 id="التدفق-مع-تحديثات-الزمن-الحقيقي">التدفق مع تحديثات الزمن الحقيقي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Combine streaming SSR with real-time updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">LiveStreamingApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      {/* Static content streams normally */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span>

      {/* Real-time content that updates after hydration */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LiveDataSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">LiveDataStream</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      {/* Chat component that works during streaming */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ChatSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">LiveChat</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LiveDataStream</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> initialData = <span class="hljs-title function_">suspendUntilData</span>(<span class="hljs-string">&#x27;live-data&#x27;</span>, fetchLiveData);
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(initialData);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Set up real-time updates after component mounts</span>
    <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(<span class="hljs-string">&#x27;/ws/live-data&#x27;</span>);

    ws.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> update = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">data</span>);
      <span class="hljs-title function_">setData</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> ({ ...current, ...update }));
    };

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> ws.<span class="hljs-title function_">close</span>();
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;live-data&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Live Metrics<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;metrics&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Metric</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Active Users&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{data.activeUsers}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Metric</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Revenue&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{</span>\`$\${<span class="hljs-attr">data.revenue.toLocaleString</span>()}\`} /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Metric</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Orders&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{data.orders}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الترطيب-التدريجي">الترطيب التدريجي</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Progressive hydration for streaming SSR</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ProgressiveHydrator</span> {
  <span class="hljs-keyword">private</span> hydrated = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;();
  <span class="hljs-keyword">private</span> observers = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">IntersectionObserver</span>&gt;();

  <span class="hljs-comment">/**
   * Hydrate component when it becomes visible
   */</span>
  <span class="hljs-title function_">hydrateOnVisible</span>(<span class="hljs-params"><span class="hljs-attr">componentId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;, <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">hydrated</span>.<span class="hljs-title function_">has</span>(componentId)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-component-id=&quot;<span class="hljs-subst">\${componentId}</span>&quot;]\`</span>);
    <span class="hljs-keyword">if</span> (!element) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
        entries.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">performHydration</span>(componentId, <span class="hljs-title class_">Component</span>, props, element <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>);
            observer.<span class="hljs-title function_">disconnect</span>();
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">observers</span>.<span class="hljs-title function_">delete</span>(componentId);
          }
        });
      },
      { <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;50px&#x27;</span> }, <span class="hljs-comment">// Start hydrating 50px before visible</span>
    );

    observer.<span class="hljs-title function_">observe</span>(element);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observers</span>.<span class="hljs-title function_">set</span>(componentId, observer);
  }

  <span class="hljs-comment">/**
   * Hydrate component on user interaction
   */</span>
  <span class="hljs-title function_">hydrateOnInteraction</span>(<span class="hljs-params">
    <span class="hljs-attr">componentId</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
    <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
    events = [<span class="hljs-string">&#x27;mouseenter&#x27;</span>, <span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-string">&#x27;focus&#x27;</span>, <span class="hljs-string">&#x27;touchstart&#x27;</span>],
  </span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">hydrated</span>.<span class="hljs-title function_">has</span>(componentId)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-component-id=&quot;<span class="hljs-subst">\${componentId}</span>&quot;]\`</span>);
    <span class="hljs-keyword">if</span> (!element) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">hydrate</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">performHydration</span>(componentId, <span class="hljs-title class_">Component</span>, props, element <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>);

      <span class="hljs-comment">// Remove event listeners</span>
      events.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        element.<span class="hljs-title function_">removeEventListener</span>(event, hydrate);
      });
    };

    <span class="hljs-comment">// Add event listeners</span>
    events.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      element.<span class="hljs-title function_">addEventListener</span>(event, hydrate, { <span class="hljs-attr">once</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> });
    });
  }

  <span class="hljs-comment">/**
   * Hydrate component immediately (high priority)
   */</span>
  <span class="hljs-title function_">hydrateImmediately</span>(<span class="hljs-params"><span class="hljs-attr">componentId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;, <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">hydrated</span>.<span class="hljs-title function_">has</span>(componentId)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-component-id=&quot;<span class="hljs-subst">\${componentId}</span>&quot;]\`</span>);
    <span class="hljs-keyword">if</span> (!element) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Use requestIdleCallback for non-blocking hydration</span>
    <span class="hljs-title function_">requestIdleCallback</span>(
      <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">performHydration</span>(componentId, <span class="hljs-title class_">Component</span>, props, element <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>);
      },
      { <span class="hljs-attr">timeout</span>: <span class="hljs-number">1000</span> }, <span class="hljs-comment">// Fallback after 1 second</span>
    );
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">performHydration</span>(<span class="hljs-params">
    <span class="hljs-attr">componentId</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
    <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
    <span class="hljs-attr">element</span>: <span class="hljs-title class_">HTMLElement</span>,
  </span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">hydrated</span>.<span class="hljs-title function_">has</span>(componentId)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

      <span class="hljs-comment">// Hydrate the component</span>
      <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">createRoot</span>(element);
      root.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>);

      <span class="hljs-keyword">const</span> endTime = performance.<span class="hljs-title function_">now</span>();

      <span class="hljs-comment">// Track hydration performance</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">trackHydrationMetrics</span>(componentId, endTime - startTime);

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">hydrated</span>.<span class="hljs-title function_">add</span>(componentId);

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`✅ Hydrated <span class="hljs-subst">\${componentId}</span> in <span class="hljs-subst">\${(endTime - startTime).toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`❌ Failed to hydrate <span class="hljs-subst">\${componentId}</span>:\`</span>, error);

      <span class="hljs-comment">// Send error to monitoring service</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportHydrationError</span>(componentId, error);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">trackHydrationMetrics</span>(<span class="hljs-params"><span class="hljs-attr">componentId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-comment">// Send to analytics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> gtag !== <span class="hljs-string">&#x27;undefined&#x27;</span>) {
      <span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-string">&#x27;progressive_hydration&#x27;</span>, {
        <span class="hljs-attr">event_category</span>: <span class="hljs-string">&#x27;Performance&#x27;</span>,
        <span class="hljs-attr">event_label</span>: componentId,
        <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(duration),
      });
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportHydrationError</span>(<span class="hljs-params"><span class="hljs-attr">componentId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">error</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Send to error tracking service</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span> &amp;&amp; <span class="hljs-variable language_">window</span>.<span class="hljs-property">errorTracker</span>) {
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">errorTracker</span>.<span class="hljs-title function_">captureException</span>(error, {
        <span class="hljs-attr">context</span>: <span class="hljs-string">&#x27;progressive-hydration&#x27;</span>,
        componentId,
      });
    }
  }
}

<span class="hljs-comment">// Usage in client-side entry point</span>
<span class="hljs-keyword">const</span> hydrator = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ProgressiveHydrator</span>();

<span class="hljs-comment">// Critical components hydrate immediately</span>
hydrator.<span class="hljs-title function_">hydrateImmediately</span>(<span class="hljs-string">&#x27;header&#x27;</span>, <span class="hljs-title class_">Header</span>, headerProps);
hydrator.<span class="hljs-title function_">hydrateImmediately</span>(<span class="hljs-string">&#x27;navigation&#x27;</span>, <span class="hljs-title class_">Navigation</span>, navProps);

<span class="hljs-comment">// Above-the-fold components hydrate on visibility</span>
hydrator.<span class="hljs-title function_">hydrateOnVisible</span>(<span class="hljs-string">&#x27;hero&#x27;</span>, <span class="hljs-title class_">Hero</span>, heroProps);
hydrator.<span class="hljs-title function_">hydrateOnVisible</span>(<span class="hljs-string">&#x27;product-list&#x27;</span>, <span class="hljs-title class_">ProductList</span>, productListProps);

<span class="hljs-comment">// Interactive components hydrate on interaction</span>
hydrator.<span class="hljs-title function_">hydrateOnInteraction</span>(<span class="hljs-string">&#x27;search&#x27;</span>, <span class="hljs-title class_">SearchComponent</span>, searchProps);
hydrator.<span class="hljs-title function_">hydrateOnInteraction</span>(<span class="hljs-string">&#x27;cart&#x27;</span>, <span class="hljs-title class_">ShoppingCart</span>, cartProps);

<span class="hljs-comment">// Below-the-fold components hydrate on visibility</span>
hydrator.<span class="hljs-title function_">hydrateOnVisible</span>(<span class="hljs-string">&#x27;recommendations&#x27;</span>, <span class="hljs-title class_">Recommendations</span>, recommendationsProps);
hydrator.<span class="hljs-title function_">hydrateOnVisible</span>(<span class="hljs-string">&#x27;footer&#x27;</span>, <span class="hljs-title class_">Footer</span>, footerProps);
</code></pre>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<h3 id="مراقبة-أداء-التدفق">مراقبة أداء التدفق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Monitor streaming SSR performance</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">StreamingPerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> metrics = {
    <span class="hljs-attr">ttfb</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">firstChunkTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">shellReadyTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">fullPageTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">hydrationTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">chunkCount</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">errors</span>: <span class="hljs-number">0</span>,
  };

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setupPerformanceObservers</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">setupPerformanceObservers</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Monitor navigation timing for TTFB</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;load&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> navigation = performance.<span class="hljs-title function_">getEntriesByType</span>(
        <span class="hljs-string">&#x27;navigation&#x27;</span>,
      )[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceNavigationTiming</span>;

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">ttfb</span> = navigation.<span class="hljs-property">responseStart</span> - navigation.<span class="hljs-property">requestStart</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">fullPageTime</span> = navigation.<span class="hljs-property">loadEventEnd</span> - navigation.<span class="hljs-property">requestStart</span>;

      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportMetrics</span>();
    });

    <span class="hljs-comment">// Monitor streaming-specific events</span>
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;streaming-shell-ready&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">CustomEvent</span></span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">shellReadyTime</span> = event.<span class="hljs-property">detail</span>.<span class="hljs-property">timestamp</span> - performance.<span class="hljs-property">timeOrigin</span>;
    });

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;streaming-chunk-received&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">chunkCount</span>++;

      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">chunkCount</span> === <span class="hljs-number">1</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">firstChunkTime</span> = performance.<span class="hljs-title function_">now</span>();
      }
    });

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;streaming-hydration-complete&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">CustomEvent</span></span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">hydrationTime</span> = event.<span class="hljs-property">detail</span>.<span class="hljs-property">duration</span>;
    });

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;streaming-error&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">errors</span>++;
    });
  }

  <span class="hljs-title function_">reportMetrics</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>({
      <span class="hljs-attr">TTFB</span>: <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.metrics.ttfb.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
      <span class="hljs-string">&#x27;First Chunk&#x27;</span>: <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.metrics.firstChunkTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
      <span class="hljs-string">&#x27;Shell Ready&#x27;</span>: <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.metrics.shellReadyTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
      <span class="hljs-string">&#x27;Full Page&#x27;</span>: <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.metrics.fullPageTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
      <span class="hljs-title class_">Hydration</span>: <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.metrics.hydrationTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
      <span class="hljs-title class_">Chunks</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">chunkCount</span>,
      <span class="hljs-title class_">Errors</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">errors</span>,
    });

    <span class="hljs-comment">// Send to analytics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendToAnalytics</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendToAnalytics</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> gtag !== <span class="hljs-string">&#x27;undefined&#x27;</span>) {
      <span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-string">&#x27;streaming_ssr_performance&#x27;</span>, {
        <span class="hljs-attr">event_category</span>: <span class="hljs-string">&#x27;Performance&#x27;</span>,
        <span class="hljs-attr">custom_map</span>: {
          <span class="hljs-attr">dimension1</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">ttfb</span>,
          <span class="hljs-attr">dimension2</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">shellReadyTime</span>,
          <span class="hljs-attr">dimension3</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">hydrationTime</span>,
          <span class="hljs-attr">metric1</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">chunkCount</span>,
        },
      });
    }
  }
}

<span class="hljs-comment">// Server-side performance tracking</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ServerStreamingMonitor</span> {
  <span class="hljs-title function_">trackRequest</span>(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>,
    <span class="hljs-attr">streamStats</span>: {
      shellTime: <span class="hljs-built_in">number</span>;
      totalChunks: <span class="hljs-built_in">number</span>;
      errors: <span class="hljs-built_in">number</span>;
    },
  </span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`📊 Streaming SSR Stats for <span class="hljs-subst">\${req.url}</span>:\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`  Shell rendered in: <span class="hljs-subst">\${streamStats.shellTime}</span>ms\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`  Total chunks: <span class="hljs-subst">\${streamStats.totalChunks}</span>\`</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`  Errors: <span class="hljs-subst">\${streamStats.errors}</span>\`</span>);

    <span class="hljs-comment">// Log to monitoring service</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendServerMetrics</span>(req.<span class="hljs-property">url</span>, streamStats);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendServerMetrics</span>(<span class="hljs-params"><span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">stats</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-comment">// Send to application monitoring (e.g., New Relic, DataDog)</span>
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span>) {
      <span class="hljs-comment">// Example: New Relic custom metrics</span>
      <span class="hljs-comment">// newrelic.recordMetric(&#x27;Custom/Streaming/ShellTime&#x27;, stats.shellTime);</span>
      <span class="hljs-comment">// newrelic.recordMetric(&#x27;Custom/Streaming/ChunkCount&#x27;, stats.totalChunks);</span>
    }
  }
}
</code></pre>
<h3 id="تدفق-صديق-لذاكرة-التخزين-المؤقت">تدفق صديق لذاكرة التخزين المؤقت</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Implement caching for streaming components</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">StreamingCache</span> {
  <span class="hljs-keyword">private</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;
    <span class="hljs-built_in">string</span>,
    {
      <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>;
      <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">ttl</span>: <span class="hljs-built_in">number</span>;
    }
  &gt;();

  <span class="hljs-comment">/**
   * Cache component data with TTL
   */</span>
  <span class="hljs-title function_">set</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">ttlMs</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">300000</span></span>) {
    <span class="hljs-comment">// 5 minutes default</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">set</span>(key, {
      data,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">ttl</span>: ttlMs,
    });
  }

  <span class="hljs-comment">/**
   * Get cached data if still valid
   */</span>
  <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">any</span> | <span class="hljs-literal">null</span> {
    <span class="hljs-keyword">const</span> entry = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(key);
    <span class="hljs-keyword">if</span> (!entry) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> isExpired = now - entry.<span class="hljs-property">timestamp</span> &gt; entry.<span class="hljs-property">ttl</span>;

    <span class="hljs-keyword">if</span> (isExpired) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">return</span> entry.<span class="hljs-property">data</span>;
  }

  <span class="hljs-comment">/**
   * Invalidate cache entries by pattern
   */</span>
  <span class="hljs-title function_">invalidatePattern</span>(<span class="hljs-params"><span class="hljs-attr">pattern</span>: <span class="hljs-title class_">RegExp</span></span>) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [key] <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>) {
      <span class="hljs-keyword">if</span> (pattern.<span class="hljs-title function_">test</span>(key)) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
      }
    }
  }

  <span class="hljs-comment">/**
   * Clear expired entries
   */</span>
  <span class="hljs-title function_">cleanup</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [key, entry] <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>) {
      <span class="hljs-keyword">const</span> isExpired = now - entry.<span class="hljs-property">timestamp</span> &gt; entry.<span class="hljs-property">ttl</span>;
      <span class="hljs-keyword">if</span> (isExpired) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(key);
      }
    }
  }
}

<span class="hljs-keyword">const</span> streamingCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">StreamingCache</span>();

<span class="hljs-comment">// Enhanced data fetching with caching</span>
<span class="hljs-keyword">function</span> suspendUntilCachedData&lt;T&gt;(
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">fetcher</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;,
  <span class="hljs-attr">ttlMs</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">300000</span>,
): T {
  <span class="hljs-comment">// Check cache first</span>
  <span class="hljs-keyword">const</span> cached = streamingCache.<span class="hljs-title function_">get</span>(key);
  <span class="hljs-keyword">if</span> (cached) {
    <span class="hljs-keyword">return</span> cached;
  }

  <span class="hljs-comment">// Check if promise is already in flight</span>
  <span class="hljs-keyword">if</span> (!streamingCache.<span class="hljs-title function_">has</span>(<span class="hljs-string">\`<span class="hljs-subst">\${key}</span>:promise\`</span>)) {
    <span class="hljs-keyword">const</span> promise = <span class="hljs-title function_">fetcher</span>()
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-comment">// Cache the result</span>
        streamingCache.<span class="hljs-title function_">set</span>(key, data, ttlMs);
        streamingCache.<span class="hljs-title function_">set</span>(<span class="hljs-string">\`<span class="hljs-subst">\${key}</span>:promise\`</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">0</span>); <span class="hljs-comment">// Clear promise</span>
        <span class="hljs-keyword">return</span> data;
      })
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        streamingCache.<span class="hljs-title function_">set</span>(<span class="hljs-string">\`<span class="hljs-subst">\${key}</span>:promise\`</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">0</span>); <span class="hljs-comment">// Clear promise on error</span>
        <span class="hljs-keyword">throw</span> error;
      });

    streamingCache.<span class="hljs-title function_">set</span>(<span class="hljs-string">\`<span class="hljs-subst">\${key}</span>:promise\`</span>, promise, <span class="hljs-number">60000</span>); <span class="hljs-comment">// Cache promise for 1 minute</span>
  }

  <span class="hljs-keyword">const</span> promise = streamingCache.<span class="hljs-title function_">get</span>(<span class="hljs-string">\`<span class="hljs-subst">\${key}</span>:promise\`</span>);
  <span class="hljs-keyword">if</span> (promise) {
    <span class="hljs-keyword">throw</span> promise; <span class="hljs-comment">// Suspend until promise resolves</span>
  }

  <span class="hljs-comment">// This shouldn&#x27;t happen, but fallback to fetching</span>
  <span class="hljs-keyword">throw</span> <span class="hljs-title function_">fetcher</span>();
}

<span class="hljs-comment">// Cleanup cache periodically</span>
<span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
  streamingCache.<span class="hljs-title function_">cleanup</span>();
}, <span class="hljs-number">60000</span>); <span class="hljs-comment">// Every minute</span>
</code></pre>
<h2 id="الحالات-الطرفية-ومعالجة-الأخطاء">الحالات الطرفية ومعالجة الأخطاء</h2>
<h3 id="استرداد-أخطاء-التدفق">استرداد أخطاء التدفق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Robust error handling for streaming SSR</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">StreamingErrorHandler</span> {
  <span class="hljs-keyword">private</span> errorCount = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> maxErrors = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">private</span> fallbackHTML = <span class="hljs-string">\`
    &lt;div class=&quot;streaming-error-fallback&quot;&gt;
      &lt;h2&gt;Content temporarily unavailable&lt;/h2&gt;
      &lt;p&gt;Please refresh the page to try again.&lt;/p&gt;
      &lt;button onclick=&quot;window.location.reload()&quot;&gt;Refresh&lt;/button&gt;
    &lt;/div&gt;
  \`</span>;

  <span class="hljs-title function_">handleStreamingError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">errorCount</span>++;

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Streaming error in <span class="hljs-subst">\${componentName}</span>:\`</span>, error);

    <span class="hljs-comment">// Log error for monitoring</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">logError</span>(error, componentName);

    <span class="hljs-comment">// If too many errors, fall back to client rendering</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">errorCount</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxErrors</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendFallbackResponse</span>(res);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-comment">// Send error boundary HTML</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendErrorBoundary</span>(res, componentName, error);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendErrorBoundary</span>(<span class="hljs-params"><span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) {
    <span class="hljs-keyword">const</span> errorHTML = <span class="hljs-string">\`
      &lt;div class=&quot;streaming-error-boundary&quot; data-component=&quot;<span class="hljs-subst">\${componentName}</span>&quot;&gt;
        <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.fallbackHTML}</span>
        &lt;!-- Error details for debugging --&gt;
        <span class="hljs-subst">\${
          process.env.NODE_ENV === <span class="hljs-string">&#x27;development&#x27;</span>
            ? <span class="hljs-string">\`
          &lt;details&gt;
            &lt;summary&gt;Error Details (Development Only)&lt;/summary&gt;
            &lt;pre&gt;<span class="hljs-subst">\${error.stack}</span>&lt;/pre&gt;
          &lt;/details&gt;
        \`</span>
            : <span class="hljs-string">&#x27;&#x27;</span>
        }</span>
      &lt;/div&gt;
    \`</span>;

    res.<span class="hljs-title function_">write</span>(errorHTML);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendFallbackResponse</span>(<span class="hljs-params"><span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) {
    <span class="hljs-keyword">const</span> fallbackPage = <span class="hljs-string">\`
      &lt;!DOCTYPE html&gt;
      
        &lt;head&gt;
          &lt;title&gt;Loading...&lt;/title&gt;
          &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
        &lt;/head&gt;
        &lt;body&gt;
          &lt;div id=&quot;root&quot;&gt;Loading...&lt;/div&gt;
          &lt;script&gt;
            // Force client-side rendering
            window.__FORCE_CLIENT_RENDER__ = true;
          &lt;/script&gt;
          &lt;script src=&quot;/build/client.js&quot;&gt;&lt;/script&gt;
        &lt;/body&gt;
      
    \`</span>;

    res.<span class="hljs-title function_">end</span>(fallbackPage);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">logError</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-comment">// Send to error tracking service</span>
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span>) {
      <span class="hljs-comment">// Example: Sentry error tracking</span>
      <span class="hljs-comment">// Sentry.captureException(error, {</span>
      <span class="hljs-comment">//   context: &#x27;streaming-ssr&#x27;,</span>
      <span class="hljs-comment">//   component: componentName,</span>
      <span class="hljs-comment">// });</span>
    }
  }
}
</code></pre>
<h2 id="اختبار-التدفق-في-التصيير-على-الخادم">اختبار التدفق في التصيير على الخادم</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Testing utilities for streaming SSR</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">StreamingSSRTester</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">testStreamingResponse</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;{
    <span class="hljs-attr">ttfb</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">firstChunk</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">totalTime</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">chunkCount</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">errors</span>: <span class="hljs-built_in">string</span>[];
  }&gt; {
    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">let</span> firstChunkTime = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> chunkCount = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-attr">errors</span>: <span class="hljs-built_in">string</span>[] = [];

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-title function_">fetch</span>(url)
        .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> ttfb = performance.<span class="hljs-title function_">now</span>() - startTime;

          <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">body</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;No response body&#x27;</span>);
          }

          <span class="hljs-keyword">const</span> reader = response.<span class="hljs-property">body</span>.<span class="hljs-title function_">getReader</span>();
          <span class="hljs-keyword">const</span> decoder = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TextDecoder</span>();

          <span class="hljs-keyword">function</span> <span class="hljs-title function_">readChunk</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
            <span class="hljs-keyword">return</span> reader.<span class="hljs-title function_">read</span>().<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">{ done, value }</span>) =&gt;</span> {
              <span class="hljs-keyword">if</span> (done) {
                <span class="hljs-keyword">const</span> totalTime = performance.<span class="hljs-title function_">now</span>() - startTime;

                <span class="hljs-title function_">resolve</span>({
                  ttfb,
                  <span class="hljs-attr">firstChunk</span>: firstChunkTime,
                  totalTime,
                  chunkCount,
                  errors,
                });

                <span class="hljs-keyword">return</span>;
              }

              chunkCount++;

              <span class="hljs-keyword">if</span> (chunkCount === <span class="hljs-number">1</span>) {
                firstChunkTime = performance.<span class="hljs-title function_">now</span>() - startTime;
              }

              <span class="hljs-comment">// Check for error indicators in the chunk</span>
              <span class="hljs-keyword">const</span> chunkText = decoder.<span class="hljs-title function_">decode</span>(value, { <span class="hljs-attr">stream</span>: <span class="hljs-literal">true</span> });
              <span class="hljs-keyword">if</span> (chunkText.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;streaming-error-boundary&#x27;</span>)) {
                errors.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Error boundary detected in chunk&#x27;</span>);
              }

              <span class="hljs-keyword">return</span> <span class="hljs-title function_">readChunk</span>();
            });
          }

          <span class="hljs-keyword">return</span> <span class="hljs-title function_">readChunk</span>();
        })
        .<span class="hljs-title function_">catch</span>(reject);
    });
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">runStreamingTests</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> testUrls = [<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-string">&#x27;/dashboard&#x27;</span>, <span class="hljs-string">&#x27;/profile&#x27;</span>, <span class="hljs-string">&#x27;/products&#x27;</span>];

    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
      testUrls.<span class="hljs-title function_">map</span>(<span class="hljs-title function_">async</span> (url) =&gt; {
        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">testStreamingResponse</span>(url);
        <span class="hljs-keyword">return</span> { url, ...result };
      }),
    );

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;🔬 Streaming SSR Test Results:&#x27;</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>(
      results.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> ({
        <span class="hljs-attr">URL</span>: r.<span class="hljs-property">url</span>,
        <span class="hljs-attr">TTFB</span>: <span class="hljs-string">\`<span class="hljs-subst">\${r.ttfb.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
        <span class="hljs-string">&#x27;First Chunk&#x27;</span>: <span class="hljs-string">\`<span class="hljs-subst">\${r.firstChunk.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
        <span class="hljs-string">&#x27;Total Time&#x27;</span>: <span class="hljs-string">\`<span class="hljs-subst">\${r.totalTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>,
        <span class="hljs-title class_">Chunks</span>: r.<span class="hljs-property">chunkCount</span>,
        <span class="hljs-title class_">Errors</span>: r.<span class="hljs-property">errors</span>.<span class="hljs-property">length</span>,
      })),
    );

    <span class="hljs-keyword">return</span> results;
  }
}

<span class="hljs-comment">// Integration with testing framework</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Streaming SSR&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> tester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">StreamingSSRTester</span>();

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should achieve good TTFB performance&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> tester.<span class="hljs-title function_">testStreamingResponse</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">ttfb</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">200</span>); <span class="hljs-comment">// Under 200ms TTFB</span>
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">firstChunk</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">500</span>); <span class="hljs-comment">// First chunk within 500ms</span>
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">errors</span>).<span class="hljs-title function_">toHaveLength</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// No errors</span>
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should stream content progressively&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> tester.<span class="hljs-title function_">testStreamingResponse</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);

    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">chunkCount</span>).<span class="hljs-title function_">toBeGreaterThan</span>(<span class="hljs-number">1</span>); <span class="hljs-comment">// Multiple chunks</span>
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">firstChunk</span>).<span class="hljs-title function_">toBeLessThan</span>(results.<span class="hljs-property">totalTime</span>); <span class="hljs-comment">// Progressive loading</span>
  });
});
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
