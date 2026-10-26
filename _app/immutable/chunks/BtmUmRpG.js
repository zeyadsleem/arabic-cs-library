const s="kinney",a="react-typescript",n="React مع TypeScript",l="routing-and-parameters-typing",p="التوجيه والمعاملات المُنوَّعة النوع",t=[{depth:2,id:"مشكلة-التوجيه-القائم-على-السلاسل-النصية",text:"مشكلة التوجيه القائم على السلاسل النصية"},{depth:2,id:"تهيئة-مسارات-منوعة-الأنواع-بواسطة-react-router",text:"تهيئة مسارات مُنوَّعة الأنواع بواسطة React Router"},{depth:2,id:"التعامل-مع-معاملات-البحث",text:"التعامل مع معاملات البحث"},{depth:2,id:"تعريفات-مسارات-منوعة-الأنواع",text:"تعريفات مسارات مُنوَّعة الأنواع"},{depth:2,id:"محملات-بيانات-منوعة-النوع",text:"محمّلات بيانات مُنوَّعة النوع"},{depth:2,id:"الأمان-النوعي-الكامل-بواسطة-tanstack-router",text:"الأمان النوعي الكامل بواسطة TanStack Router"},{depth:2,id:"اعتبارات-من-الواقع-العملي",text:"اعتبارات من الواقع العملي"},{depth:3,id:"أثر-الأداء",text:"أثر الأداء"},{depth:3,id:"حدود-الأخطاء-error-boundaries",text:"حدود الأخطاء (Error Boundaries)"},{depth:3,id:"التوافق-مع-الإصدارات-السابقة",text:"التوافق مع الإصدارات السابقة"},{depth:2,id:"اختبار-المسارات-المنوعة",text:"اختبار المسارات المُنوَّعة"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>عناوين URL هي واجهة برمجة الويب (API) للويب — تحمل البيانات والحالة والنوايا. لكنها افتراضيًا مجرد سلاسل نصية، ما يعني أن معامل <code>userId</code> عندك قد يكون <code>&quot;definitely-not-a-number&quot;</code> بينما يسمح لك TypeScript مرتاحًا أن تمرّره إلى دالة تتوقع عددًا. وهنا يأتي التوجيه المُنوَّع النوع (typed routing): طريقة تجعل عناوين URL آمنة الأنواع مثل بقية تطبيق React عندك، فيلتقط المعاملات غير المتطابقة عند وقت التصريف بدلًا من أن يتعثّر المستخدمون في صفحات مكسورة.</p>
<p>تدعم مكتبات التوجيه الحديثة في React كلٌّ من <a href="https://reactrouter.com/">React Router v6.4+</a> و<a href="https://tanstack.com/router">TanStack Router</a> و<a href="https://nextjs.org/docs/app">Next.js 13+ App Router</a> شكلًا ما من التوجيه الآمن الأنواع. سنتكشف كيف تقيّد معاملات المسار، وتتحقق من معاملات البحث (search parameters)، وتضمن ألا تتلقى محمّلات بياناتك (data loaders) أنواعًا غير متوقعة أبدًا — لأن أحدًا لا يريد في الثانية فجرًا تصحيح سبب إرجاع <code>parseInt(&quot;banana&quot;)</code> قيمة <code>NaN</code>.</p>
<h2 id="مشكلة-التوجيه-القائم-على-السلاسل-النصية">مشكلة التوجيه القائم على السلاسل النصية</h2>
<p>يتعامل التوجيه التقليدي مع كل شيء بوصفه سلاسل نصية. تأمّل هذه التهيئة النمطية من React Router:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ No type safety here</span>
<span class="hljs-keyword">import</span> { useParams } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { userId } = <span class="hljs-title function_">useParams</span>(); <span class="hljs-comment">// userId is string | undefined</span>

  <span class="hljs-comment">// This could blow up if userId is &quot;not-a-number&quot;</span>
  <span class="hljs-keyword">const</span> id = <span class="hljs-built_in">parseInt</span>(userId!); <span class="hljs-comment">// Non-null assertion = danger</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User {id}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>المشاكل واضحة:</p>
<ul>
<li>قد يكون <code>userId</code> قيمة <code>undefined</code> أو سلسلة نصية مشوّهة</li>
<li>تُخفي التأكيدات النوعية (<code>!</code>) أخطاء وقت التشغيل المحتملة</li>
<li>لا ضمانًا عند وقت التصريف بوجود معامل المسار</li>
<li>ومعاملات البحث فهي «غرب بريّ»™ بمعنى الحرف</li>
</ul>
<h2 id="تهيئة-مسارات-منوعة-الأنواع-بواسطة-react-router">تهيئة مسارات مُنوَّعة الأنواع بواسطة React Router</h2>
<p>لنبدأ بـ React Router لأنه الأوسع استخدامًا. سنستخدم <a href="https://zod.dev/">Zod</a> للتحقّق وقت التشغيل والاستنتاج النوعي (type inference) — اتحاد مثالي بين أمان التصريف وأمان التشغيل.</p>
<pre><code class="language-bash">npm install react-router-dom zod
npm install -D @types/react-router-dom
</code></pre>
<p>لننشئ أولًا مخططًا لمعاملات مساراتنا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Define schemas for different route parameter patterns</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> userParamsSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">userId</span>: z
    .<span class="hljs-title function_">string</span>()
    .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-built_in">parseInt</span>(val))
    .<span class="hljs-title function_">pipe</span>(z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>()),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> postParamsSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">userId</span>: z
    .<span class="hljs-title function_">string</span>()
    .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> <span class="hljs-built_in">parseInt</span>(val))
    .<span class="hljs-title function_">pipe</span>(z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>()),
  <span class="hljs-attr">postId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
});

<span class="hljs-comment">// Generate TypeScript types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UserParams</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userParamsSchema&gt;;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">PostParams</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> postParamsSchema&gt;;
</code></pre>
<p>يمكننا الآن إنشاء خُطّاف مُنوَّع يتحقق من المعاملات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useParams } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">function</span> useTypedParams&lt;T&gt;(<span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;): T {
  <span class="hljs-keyword">const</span> params = <span class="hljs-title function_">useParams</span>();

  <span class="hljs-keyword">const</span> result = schema.<span class="hljs-title function_">safeParse</span>(params);

  <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
    <span class="hljs-comment">// In a real app, you might want to redirect to a 404 page</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Invalid route parameters: <span class="hljs-subst">\${result.error.message}</span>\`</span>);
  }

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">data</span>;
}

<span class="hljs-comment">// Usage in components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { userId } = <span class="hljs-title function_">useTypedParams</span>(userParamsSchema); <span class="hljs-comment">// userId is number!</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User {userId}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PostDetail</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { userId, postId } = <span class="hljs-title function_">useTypedParams</span>(postParamsSchema);
  <span class="hljs-comment">// userId is number, postId is string (valid UUID)</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Post {postId} by User {userId}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التعامل-مع-معاملات-البحث">التعامل مع معاملات البحث</h2>
<p>معاملات البحث (سلاسل الاستعلام) أصعب تصرّفًا لأنها اختيارية وقد تحمل قيمًا عدّة. لنبنِ حلًّا مُنوَّع النوع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useSearchParams } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Schema for search parameters with sensible defaults</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> searchParamsSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">page</span>: z
    .<span class="hljs-title function_">string</span>()
    .<span class="hljs-title function_">optional</span>()
    .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> (val ? <span class="hljs-built_in">parseInt</span>(val) : <span class="hljs-number">1</span>))
    .<span class="hljs-title function_">pipe</span>(z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">default</span>(<span class="hljs-number">1</span>)),
  <span class="hljs-attr">limit</span>: z
    .<span class="hljs-title function_">string</span>()
    .<span class="hljs-title function_">optional</span>()
    .<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> (val ? <span class="hljs-built_in">parseInt</span>(val) : <span class="hljs-number">10</span>))
    .<span class="hljs-title function_">pipe</span>(z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">100</span>).<span class="hljs-title function_">default</span>(<span class="hljs-number">10</span>)),
  <span class="hljs-attr">sort</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;date&#x27;</span>, <span class="hljs-string">&#x27;title&#x27;</span>, <span class="hljs-string">&#x27;author&#x27;</span>]).<span class="hljs-title function_">optional</span>().<span class="hljs-title function_">default</span>(<span class="hljs-string">&#x27;date&#x27;</span>),
  <span class="hljs-attr">search</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">SearchParams</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> searchParamsSchema&gt;;

<span class="hljs-keyword">function</span> useTypedSearchParams&lt;T&gt;(<span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;): [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>] {
  <span class="hljs-keyword">const</span> [searchParams, setSearchParams] = <span class="hljs-title function_">useSearchParams</span>();

  <span class="hljs-comment">// Convert URLSearchParams to plain object</span>
  <span class="hljs-keyword">const</span> paramsObject = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">fromEntries</span>(searchParams.<span class="hljs-title function_">entries</span>());

  <span class="hljs-keyword">const</span> result = schema.<span class="hljs-title function_">safeParse</span>(paramsObject);

  <span class="hljs-keyword">const</span> validatedParams = result.<span class="hljs-property">success</span> ? result.<span class="hljs-property">data</span> : schema.<span class="hljs-title function_">parse</span>({}); <span class="hljs-comment">// Use defaults if validation fails</span>

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateParams</span> = (<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt;</span>) =&gt; {
    <span class="hljs-keyword">const</span> newParams = { ...validatedParams, ...updates };

    <span class="hljs-comment">// Convert back to URLSearchParams, filtering out undefined values</span>
    <span class="hljs-keyword">const</span> urlParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();
    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(newParams).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (value !== <span class="hljs-literal">undefined</span> &amp;&amp; value !== <span class="hljs-literal">null</span> &amp;&amp; value !== <span class="hljs-string">&#x27;&#x27;</span>) {
        urlParams.<span class="hljs-title function_">set</span>(key, <span class="hljs-title class_">String</span>(value));
      }
    });

    <span class="hljs-title function_">setSearchParams</span>(urlParams);
  };

  <span class="hljs-keyword">return</span> [validatedParams, updateParams];
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PostsList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [searchParams, setSearchParams] = <span class="hljs-title function_">useTypedSearchParams</span>(searchParamsSchema);

  <span class="hljs-comment">// All parameters are properly typed with defaults applied</span>
  <span class="hljs-keyword">const</span> { page, limit, sort, search } = searchParams;

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePageChange</span> = (<span class="hljs-params"><span class="hljs-attr">newPage</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setSearchParams</span>({ <span class="hljs-attr">page</span>: newPage });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{search</span> || &#x27;&#x27;}
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setSearchParams({ search: e.target.value })}
        placeholder=&quot;Search posts...&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{sort}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setSearchParams({ sort: e.target.value as SearchParams[&#x27;sort&#x27;] })}
      &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;date&quot;</span>&gt;</span>Date<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;author&quot;</span>&gt;</span>Author<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      {/* Your posts list here */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تعريفات-مسارات-منوعة-الأنواع">تعريفات مسارات مُنوَّعة الأنواع</h2>
<p>لمزيد من أمان الأنواع، لنبنِ نظامًا تضم فيه تعريفاتُ المسارات مخططات معاملاتها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Route definition with embedded schemas</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> routes = {
  <span class="hljs-attr">home</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
    <span class="hljs-attr">params</span>: z.<span class="hljs-title function_">object</span>({}),
    <span class="hljs-attr">search</span>: z.<span class="hljs-title function_">object</span>({}),
  },
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
    <span class="hljs-attr">params</span>: userParamsSchema,
    <span class="hljs-attr">search</span>: z.<span class="hljs-title function_">object</span>({}),
  },
  <span class="hljs-attr">post</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users/:userId/posts/:postId&#x27;</span>,
    <span class="hljs-attr">params</span>: postParamsSchema,
    <span class="hljs-attr">search</span>: searchParamsSchema,
  },
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// Type-safe navigation helper</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createTypedNavigate</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> navigate = <span class="hljs-title function_">useNavigate</span>();

  <span class="hljs-keyword">return</span> &lt;K <span class="hljs-keyword">extends</span> keyof <span class="hljs-keyword">typeof</span> routes&gt;<span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">route</span>: K,
    <span class="hljs-attr">params</span>: z.infer&lt;(<span class="hljs-keyword">typeof</span> routes)[K][<span class="hljs-string">&#x27;params&#x27;</span>]&gt;,
    <span class="hljs-attr">search</span>?: z.infer&lt;(<span class="hljs-keyword">typeof</span> routes)[K][<span class="hljs-string">&#x27;search&#x27;</span>]&gt;,
  </span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> path = routes[route].<span class="hljs-property">path</span>;

    <span class="hljs-comment">// Replace path parameters</span>
    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(params).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
      path = path.<span class="hljs-title function_">replace</span>(<span class="hljs-string">\`:<span class="hljs-subst">\${key}</span>\`</span>, <span class="hljs-title class_">String</span>(value));
    });

    <span class="hljs-comment">// Add search parameters</span>
    <span class="hljs-keyword">if</span> (search &amp;&amp; <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(search).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();
      <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(search).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (value !== <span class="hljs-literal">undefined</span> &amp;&amp; value !== <span class="hljs-literal">null</span> &amp;&amp; value !== <span class="hljs-string">&#x27;&#x27;</span>) {
          searchParams.<span class="hljs-title function_">set</span>(key, <span class="hljs-title class_">String</span>(value));
        }
      });
      path += <span class="hljs-string">\`?<span class="hljs-subst">\${searchParams.toString()}</span>\`</span>;
    }

    <span class="hljs-title function_">navigate</span>(path);
  };
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SomeComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> typedNavigate = <span class="hljs-title function_">createTypedNavigate</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">goToUserPost</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">typedNavigate</span>(
      <span class="hljs-string">&#x27;post&#x27;</span>,
      { <span class="hljs-attr">userId</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">postId</span>: <span class="hljs-string">&#x27;uuid-here&#x27;</span> }, <span class="hljs-comment">// ✅ Typed parameters</span>
      { <span class="hljs-attr">page</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">sort</span>: <span class="hljs-string">&#x27;title&#x27;</span> }, <span class="hljs-comment">// ✅ Typed search params</span>
    );
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{goToUserPost}</span>&gt;</span>View Post<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h2 id="محملات-بيانات-منوعة-النوع">محمّلات بيانات مُنوَّعة النوع</h2>
<p>إن كنت تستخدم ميزات تحميل البيانات في React Router، فيمكنك أن تُنوّع محمّلاتك أيضًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">LoaderFunctionArgs</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span>;

<span class="hljs-comment">// Typed loader function</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">userLoader</span>(<span class="hljs-params">{ params }: <span class="hljs-title class_">LoaderFunctionArgs</span></span>) {
  <span class="hljs-comment">// Validate parameters at the loader level</span>
  <span class="hljs-keyword">const</span> { userId } = userParamsSchema.<span class="hljs-title function_">parse</span>(params);

  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(userId); <span class="hljs-comment">// userId is guaranteed to be a number</span>

  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>, { <span class="hljs-attr">status</span>: <span class="hljs-number">404</span> });
  }

  <span class="hljs-keyword">return</span> user;
}

<span class="hljs-comment">// Type-safe data access in components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useLoaderData</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Awaited</span>&lt;<span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> userLoader&gt;&gt;;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لمزيد من الاستنتاج النوعي مع المحمّلات، خُذ في الحسبان مكتبات مثل <a href="https://remix.run/">Remix</a> أو <a href="https://tanstack.com/router">TanStack Router</a>، فهي تقدّم دعمًا من الطبقة الأولى لـ TypeScript في تحميل البيانات.</p>
</blockquote>
<h2 id="الأمان-النوعي-الكامل-بواسطة-tanstack-router">الأمان النوعي الكامل بواسطة TanStack Router</h2>
<p>إن أردت ذروة أمان الأنواع في التوجيه، فإن TanStack Router يقدّم أمانًا نوعيًا من الطرف إلى الطرف (end-to-end) جاهزًا مباشرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createRoute, createRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-router&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Define route with built-in validation</span>
<span class="hljs-keyword">const</span> userRoute = <span class="hljs-title function_">createRoute</span>({
  <span class="hljs-attr">getParentRoute</span>: <span class="hljs-function">() =&gt;</span> rootRoute,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users/$userId&#x27;</span>,
  <span class="hljs-attr">validateSearch</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">tab</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;posts&#x27;</span>, <span class="hljs-string">&#x27;followers&#x27;</span>, <span class="hljs-string">&#x27;following&#x27;</span>]).<span class="hljs-title function_">optional</span>(),
  }),
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">UserProfile</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { userId } = userRoute.<span class="hljs-title function_">useParams</span>(); <span class="hljs-comment">// Fully typed!</span>
  <span class="hljs-keyword">const</span> { tab } = userRoute.<span class="hljs-title function_">useSearch</span>(); <span class="hljs-comment">// Also typed!</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      User {userId} - Tab: {tab || &#x27;posts&#x27;}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يولّد TanStack Router الأنواع تلقائيًا ويلتقط أخطاء التوجيه عند وقت التصريف. وهو أقوى ما يكون في التطبيقات المركّبة التي يكون أمان الأنواع فيها جوهريًا.</p>
<h2 id="اعتبارات-من-الواقع-العملي">اعتبارات من الواقع العملي</h2>
<h3 id="أثر-الأداء">أثر الأداء</h3>
<p>يطرأ التحقق من المعاملات عند كل تغييرٍ للمسار، فأبقِ المخططات خفيفة الوزن:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Simple transformations</span>
<span class="hljs-keyword">const</span> simpleSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">transform</span>(<span class="hljs-title class_">Number</span>),
});

<span class="hljs-comment">// ❌ Avoid: Complex async validations in route parameters</span>
<span class="hljs-keyword">const</span> heavySchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">refine</span>(<span class="hljs-title function_">async</span> (id) =&gt; <span class="hljs-keyword">await</span> <span class="hljs-title function_">validateInDatabase</span>(id)),
});
</code></pre>
<h3 id="حدود-الأخطاء-error-boundaries">حدود الأخطاء (Error Boundaries)</h3>
<p>غلّف مكوّنات توجيهك بحدود أخطاء لتتعامل مع إخفاقات التحقق برفق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteErrorBoundary</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>
      <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Invalid route parameters<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      onError={(error) =&gt; {
        console.error(&#x27;Route validation error:&#x27;, error);
        // Log to your error tracking service
      }}
    &gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="التوافق-مع-الإصدارات-السابقة">التوافق مع الإصدارات السابقة</h3>
<p>إن كنت تضيف أمان الأنواع إلى تطبيق قائم، فاستخدم التحسين التدريجي (progressive enhancement):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useTypedParamsWithFallback&lt;T&gt;(<span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> params = <span class="hljs-title function_">useParams</span>();

  <span class="hljs-keyword">const</span> result = schema.<span class="hljs-title function_">safeParse</span>(params);

  <span class="hljs-keyword">if</span> (result.<span class="hljs-property">success</span>) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">data</span>: result.<span class="hljs-property">data</span>, <span class="hljs-attr">isValid</span>: <span class="hljs-literal">true</span> };
  }

  <span class="hljs-comment">// Fall back to raw params for backward compatibility</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Route params validation failed, using raw params:&#x27;</span>, result.<span class="hljs-property">error</span>);
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">data</span>: params <span class="hljs-keyword">as</span> T, <span class="hljs-attr">isValid</span>: <span class="hljs-literal">false</span> };
}
</code></pre>
<h2 id="اختبار-المسارات-المنوعة">اختبار المسارات المُنوَّعة</h2>
<p>المسارات الآمنة الأنواع أسهل اختبارًا لأنك تعرف تمامًا شكل البيانات الذي تتوقعه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { createMemoryRouter, <span class="hljs-title class_">RouterProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders user profile with valid params&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> router = <span class="hljs-title function_">createMemoryRouter</span>(
    [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
        <span class="hljs-attr">element</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> /&gt;</span></span>,
      },
    ],
    {
      <span class="hljs-attr">initialEntries</span>: [<span class="hljs-string">&#x27;/users/123&#x27;</span>],
    },
  );

  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RouterProvider</span> <span class="hljs-attr">router</span>=<span class="hljs-string">{router}</span> /&gt;</span></span>);

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;User 123&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;handles invalid user ID&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> router = <span class="hljs-title function_">createMemoryRouter</span>(
    [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
        <span class="hljs-attr">element</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> /&gt;</span></span>,
        <span class="hljs-attr">errorElement</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Invalid user ID<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
      },
    ],
    {
      <span class="hljs-attr">initialEntries</span>: [<span class="hljs-string">&#x27;/users/not-a-number&#x27;</span>],
    },
  );

  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RouterProvider</span> <span class="hljs-attr">router</span>=<span class="hljs-string">{router}</span> /&gt;</span></span>);

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Invalid user ID&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>يحوّل التوجيه المُنوَّع عناوين URL من سلاسل نصية كثير الغلط إلى عقود بيانات موثوقة مُتحقَّقة. ابدأ بالصغير — أضف التحقق من المعاملات أولًا إلى مساراتك الأكثر جوهرية، ثم وسّع النظام كلما رأيت المنافع.</p>
<p>فكّر في هذه التحسينات كلما نما توجيهك:</p>
<ul>
<li><strong>تقسيم الشيفرة حسب المسار</strong> مع تحميل خامل (lazy loading) مُنوَّع</li>
<li><strong>عناوين URL صديقة لمحركات البحث</strong> مع التحقق من الـ slug وتحويله</li>
<li><strong>توجيه متعدّد اللغات</strong> مع مخططات معاملات واعية ببيئة اللغة (locale)</li>
<li><strong>اندماج في التحليلات (analytics)</strong> يتتبّع انتقالات المسارات المُنوَّعة</li>
</ul>
<p>الغاية ليست الكمال في اليوم الأول، بل بناء نظام يلتقط المزيد من الأخطاء عند وقت التصريف ويجعل منطق توجيهك أكثر قابلية للتنبّؤ. وستشكرك نفسُك المستقبليّة (ومستخدموك معها) حين لا يروا بعد اليوم خطأً آخر من جنس «Cannot read property of undefined» نتيجة معاملاتٍ مُشوَّهة لعنوان URL.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
