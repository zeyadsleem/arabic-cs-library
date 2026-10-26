const s="kinney",a="react-typescript",n="React مع TypeScript",l="rsc-server-actions",p="مكوّنات الخادم وإجراءات الخادم",t=[{depth:2,id:"فهم-مكونات-الخادم-وإجراءات-الخادم",text:"فهم مكوّنات الخادم وإجراءات الخادم"},{depth:2,id:"تنويع-مكونات-الخادم-الخاملة",text:"تنويع مكوّنات الخادم الخاملة"},{depth:2,id:"أمان-الأنواع-لإجراءات-الخادم",text:"أمان الأنواع لإجراءات الخادم"},{depth:2,id:"أنماط-الدمج-مع-النماذج",text:"أنماط الدمج مع النماذج"},{depth:2,id:"التعامل-مع-تدفقات-البيانات-المركبة",text:"التعامل مع تدفقات البيانات المركّبة"},{depth:2,id:"تحديثات-متفائلة-بواسطة-إجراءات-الخادم",text:"تحديثات متفائلة بواسطة إجراءات الخادم"},{depth:2,id:"حدود-الأخطاء-وإخفاقات-إجراءات-الخادم",text:"حدود الأخطاء وإخفاقات إجراءات الخادم"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"التدفق-وsuspense",text:"التدفق وSuspense"},{depth:3,id:"تخزين-نتائج-إجراءات-الخادم-مؤقتا",text:"تخزين نتائج إجراءات الخادم مؤقتًا"},{depth:3,id:"المعالجة-في-الخلفية",text:"المعالجة في الخلفية"},{depth:2,id:"أنماط-من-الواقع-وأفضل-الممارسات",text:"أنماط من الواقع وأفضل الممارسات"},{depth:3,id:"نماذج-متعددة-الخطوات-مع-إجراءات-الخادم",text:"نماذج متعددة الخطوات مع إجراءات الخادم"},{depth:3,id:"التحديثات-في-الزمن-الحقيقي",text:"التحديثات في الزمن الحقيقي"},{depth:2,id:"اختبار-مكونات-الخادم-وإجراءاتها",text:"اختبار مكوّنات الخادم وإجراءاتها"},{depth:2,id:"الخطوات-التالية-واعتبارات-الإنتاج",text:"الخطوات التالية واعتبارات الإنتاج"}],c=`<p>تُمثّل مكوّنات الخادم (Server Components) وإجراءات الخادم (Server Actions) تحوّلًا جوهريًا في طريقة بنائنا تطبيقات React. فبدلًا من النمط التقليدي الذي يجلب البيانات على العميل ويدير مزامنة حالة معقدة، تعمل مكوّنات الخادم على الخادم أثناء التصيير، فيما تتيح لك إجراءات الخادم أن تنفّذ منطق جانب الخادم مباشرةً من مكوّناتك. والنتيجة؟ جافاسكربت أقل تُشحن إلى المتصفح، وأحمال أولية أسرع للصفحات، وتدفقات بيانات مبسّطة اختزالًا كبيرًا.</p>
<p>لكن هنا الحكمة: أن مع هذه القوة مسؤولية التعامل الصحيح مع حدّ الخادم/العميل. فالبيانات يجب أن تكون قابلة للتسلسل، والمكوّنات الخاملة تحتاج تنويعًا سليمًا، وتتطلب الإجراءات نمذجةً عناية تجنّبًا لمفاجآت وقت التشغيل. في هذا المرشد سنتكشف كيف نستثمر TypeScript لجعل تلك الأنماط الجديدة آمنةً ومثمرة معًا.</p>
<h2 id="فهم-مكونات-الخادم-وإجراءات-الخادم">فهم مكوّنات الخادم وإجراءات الخادم</h2>
<p>لنبدأ بتوضيح ما نتعامل معه:</p>
<p><strong>مكوّنات الخادم</strong> تُصيَّر على الخادم وتستطيع النفاذ إلى مصادر خاصة بالخادم مثل قواعد البيانات وأنظمة الملفات ومتغيّرات البيئة. وهي خاملة افتراضيًا ويُبثّ مخرجها إلى العميل.</p>
<p><strong>إجراءات الخادم</strong> دوال تعمل على الخادم لكن يمكن استدعاؤها من مكوّنات خادم ومن مكوّنات عميل. اعتبرها نداءات RPC آمنة الأنواع مع اندماج جاهزٍ للنماذج.</p>
<p>وهذا مثال بسيط يوضّح النمط:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// app/products/page.tsx - Server Component</span>
<span class="hljs-keyword">import</span> { getProducts, addToCart } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductsPage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ✅ Direct database access in Server Component</span>
  <span class="hljs-keyword">const</span> products = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProducts</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Products<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      {products.map((product) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductCard</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span>
          <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span>
          <span class="hljs-attr">addToCart</span>=<span class="hljs-string">{addToCart}</span> // ✅ <span class="hljs-attr">Pass</span> <span class="hljs-attr">Server</span> <span class="hljs-attr">Action</span> <span class="hljs-attr">as</span> <span class="hljs-attr">prop</span>
        /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// actions.ts - Server Actions</span>
<span class="hljs-string">&#x27;use server&#x27;</span>;

<span class="hljs-keyword">import</span> { db } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/database&#x27;</span>;
<span class="hljs-keyword">import</span> { revalidatePath } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/cache&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getProducts</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> db.<span class="hljs-property">product</span>.<span class="hljs-title function_">findMany</span>({
    <span class="hljs-attr">where</span>: { <span class="hljs-attr">available</span>: <span class="hljs-literal">true</span> },
    <span class="hljs-attr">select</span>: {
      <span class="hljs-attr">id</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">price</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-literal">true</span>,
    },
  });
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">addToCart</span>(<span class="hljs-params"><span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">quantity</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-comment">// Server-side logic with database access</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> db.<span class="hljs-property">cartItem</span>.<span class="hljs-title function_">create</span>({
    <span class="hljs-attr">data</span>: { productId, quantity },
  });

  <span class="hljs-comment">// Revalidate to update UI</span>
  <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">&#x27;/products&#x27;</span>);

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">itemId</span>: result.<span class="hljs-property">id</span> };
}
</code></pre>
<p>والسحر هنا أن TypeScript يعلم أن <code>getProducts()</code> تُعيد وعدًا، وأن <code>addToCart</code> إجراء خادم يمكن استدعاؤه من النماذج أو معالجات الأحداث، وأن كل البيانات المتدفقة بين الخادم والعميل تُسلسَل تلقائيًا.</p>
<h2 id="تنويع-مكونات-الخادم-الخاملة">تنويع مكوّنات الخادم الخاملة</h2>
<p>مكوّنات الخادم خاملة افتراضيًا، ما يعني حاجتك إلى معالجة أنواع Promise على الوجه الصحيح. لننظر إلى الأنماط:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Basic async Server Component typing</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(userId); <span class="hljs-comment">// TypeScript infers Promise&lt;User&gt;</span>

  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ TypeScript knows this component returns Promise&lt;JSX.Element&gt;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserProfileComponent</span> = <span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserProfile</span>;
<span class="hljs-comment">// Result: (props: { userId: string }) =&gt; Promise&lt;JSX.Element&gt;</span>
</code></pre>
<p>من أجل جلب بيانات أكثر تعقيدًا مع حدود أخطاء سليمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">profile</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">bio</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
    <span class="hljs-attr">avatarUrl</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>().<span class="hljs-title function_">optional</span>(),
  }),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserSchema</span>&gt;;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${process.env.API_URL}</span>/users/<span class="hljs-subst">\${id}</span>\`</span>);

    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
      <span class="hljs-keyword">if</span> (response.<span class="hljs-property">status</span> === <span class="hljs-number">404</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to fetch user: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
    }

    <span class="hljs-keyword">const</span> rawUser = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

    <span class="hljs-comment">// ✅ Runtime validation with Zod</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">safeParse</span>(rawUser);

    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Invalid user data:&#x27;</span>, result.<span class="hljs-property">error</span>);
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid user data received&#x27;</span>);
    }

    <span class="hljs-keyword">return</span> result.<span class="hljs-property">data</span>;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error fetching user:&#x27;</span>, error);
    <span class="hljs-keyword">throw</span> error; <span class="hljs-comment">// Let error boundary handle it</span>
  }
}

<span class="hljs-comment">// Server Component with proper error handling</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserPage</span>(<span class="hljs-params">{ params }: { params: { userId: <span class="hljs-built_in">string</span> } }</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(params.<span class="hljs-property">userId</span>);

    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The user you&#x27;re looking for doesn&#x27;t exist.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-comment">// This will be caught by the nearest error boundary</span>
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(
      <span class="hljs-string">\`Failed to load user <span class="hljs-subst">\${params.userId}</span>: <span class="hljs-subst">\${error <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Error</span> ? error.message : <span class="hljs-string">&#x27;Unknown error&#x27;</span>}</span>\`</span>,
    );
  }
}

<span class="hljs-comment">// Separate component for cleaner separation of concerns</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      {user.profile.bio &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.profile.bio}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
      {user.profile.avatarUrl &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.profile.avatarUrl}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">user.name</span>}&#x27;<span class="hljs-attr">s</span> <span class="hljs-attr">avatar</span>\`} /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>افصل منطق جلب بياناتك عن منطق تصييرك. فهذا يجعل المكوّنات أيسر اختبارًا وفهمًا.</p>
</blockquote>
<h2 id="أمان-الأنواع-لإجراءات-الخادم">أمان الأنواع لإجراءات الخادم</h2>
<p>تطلب إجراءات الخادم تنويعًا متأنيًا ليضمن أن تدفّق البيانات بين الخادم والعميل آمن. وإليك كيف تبني إجراءات محصّنة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define your input/output schemas first</span>
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">CreatePostSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;Title is required&#x27;</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">100</span>, <span class="hljs-string">&#x27;Title too long&#x27;</span>),
  <span class="hljs-attr">content</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;Content is required&#x27;</span>),
  <span class="hljs-attr">categoryId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(<span class="hljs-string">&#x27;Invalid category ID&#x27;</span>),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UpdatePostSchema</span> = <span class="hljs-title class_">CreatePostSchema</span>.<span class="hljs-title function_">partial</span>().<span class="hljs-title function_">extend</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(<span class="hljs-string">&#x27;Invalid post ID&#x27;</span>),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CreatePostInput</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">CreatePostSchema</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UpdatePostInput</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UpdatePostSchema</span>&gt;;

<span class="hljs-comment">// Standardized action result type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ActionResult</span>&lt;T = <span class="hljs-built_in">unknown</span>&gt; = {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">fieldErrors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
};

<span class="hljs-comment">// Helper function for consistent action handling</span>
<span class="hljs-keyword">function</span> createAction&lt;<span class="hljs-title class_">TInput</span>, <span class="hljs-title class_">TOutput</span> = <span class="hljs-built_in">unknown</span>&gt;(
  <span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;<span class="hljs-title class_">TInput</span>&gt;,
  <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-title class_">TInput</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">TOutput</span>&gt;,
) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">action</span>(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ActionResult</span>&lt;<span class="hljs-title class_">TOutput</span>&gt;&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Validate input</span>
      <span class="hljs-keyword">const</span> result = schema.<span class="hljs-title function_">safeParse</span>(input);

      <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">fieldErrors</span>: result.<span class="hljs-property">error</span>.<span class="hljs-title function_">flatten</span>().<span class="hljs-property">fieldErrors</span>,
        };
      }

      <span class="hljs-comment">// Execute handler</span>
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">handler</span>(result.<span class="hljs-property">data</span>);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>,
        data,
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Action error:&#x27;</span>, error);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>,
      };
    }
  };
}
</code></pre>
<p>الآن نستطيع إنشاء إجراءات خادم آمنة الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-string">&#x27;use server&#x27;</span>;

<span class="hljs-keyword">import</span> { revalidatePath, redirect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/cache&#x27;</span>;
<span class="hljs-keyword">import</span> { db } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/database&#x27;</span>;

<span class="hljs-comment">// Create post action with full type safety</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createPost = <span class="hljs-title function_">createAction</span>(<span class="hljs-title class_">CreatePostSchema</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">input</span>: <span class="hljs-title class_">CreatePostInput</span>) =&gt; {
  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">create</span>({
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">title</span>: input.<span class="hljs-property">title</span>,
      <span class="hljs-attr">content</span>: input.<span class="hljs-property">content</span>,
      <span class="hljs-attr">categoryId</span>: input.<span class="hljs-property">categoryId</span>,
      <span class="hljs-attr">authorId</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">getCurrentUserId</span>(), <span class="hljs-comment">// Assume this helper exists</span>
    },
  });

  <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">postId</span>: post.<span class="hljs-property">id</span>,
    <span class="hljs-attr">slug</span>: post.<span class="hljs-property">slug</span>,
  };
});

<span class="hljs-comment">// Update post action</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updatePost = <span class="hljs-title function_">createAction</span>(<span class="hljs-title class_">UpdatePostSchema</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">input</span>: <span class="hljs-title class_">UpdatePostInput</span>) =&gt; {
  <span class="hljs-keyword">const</span> { id, ...updateData } = input;

  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">update</span>({
    <span class="hljs-attr">where</span>: { id },
    <span class="hljs-attr">data</span>: updateData,
  });

  <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">\`/posts/<span class="hljs-subst">\${post.slug}</span>\`</span>);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">postId</span>: post.<span class="hljs-property">id</span>,
    <span class="hljs-attr">updatedAt</span>: post.<span class="hljs-property">updatedAt</span>,
  };
});

<span class="hljs-comment">// Delete action with confirmation</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">deletePost</span>(<span class="hljs-params"><span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ActionResult</span>&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">delete</span>({
      <span class="hljs-attr">where</span>: { <span class="hljs-attr">id</span>: postId },
    });

    <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>);
    <span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>);

    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to delete post&#x27;</span>,
    };
  }
}
</code></pre>
<h2 id="أنماط-الدمج-مع-النماذج">أنماط الدمج مع النماذج</h2>
<p>تتكامل إجراءات الخادم مع النماذج تكاملًا جميلًا. وإليك كيفية معالجة أنماط النماذج المختلفة بتنويع سليم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Client Component for interactive form</span>
<span class="hljs-string">&#x27;use client&#x27;</span>;

<span class="hljs-keyword">import</span> { useActionState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { createPost } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">CreatePostForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, formAction, isPending] = <span class="hljs-title function_">useActionState</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">prevState</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>) =&gt; {
      <span class="hljs-keyword">const</span> rawData = {
        <span class="hljs-attr">title</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;title&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
        <span class="hljs-attr">content</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;content&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
        <span class="hljs-attr">categoryId</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;categoryId&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
      };

      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">createPost</span>(rawData);
    },
    { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span> },
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;title&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;title&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.fieldErrors?.title</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        /&gt;</span>
        {state.fieldErrors?.title &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.fieldErrors.title[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;content&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;content&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.fieldErrors?.content</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        /&gt;</span>
        {state.fieldErrors?.content &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.fieldErrors.content[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;categoryId&quot;</span>&gt;</span>Category<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;categoryId&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;categoryId&quot;</span>
          <span class="hljs-attr">required</span>
          <span class="hljs-attr">aria-invalid</span>=<span class="hljs-string">{state.fieldErrors?.categoryId</span> ? &#x27;<span class="hljs-attr">true</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">false</span>&#x27;}
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>Select a category<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;tech&quot;</span>&gt;</span>Technology<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;design&quot;</span>&gt;</span>Design<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
        {state.fieldErrors?.categoryId &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.fieldErrors.categoryId[0]}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>&gt;</span>
        {isPending ? &#x27;Creating...&#x27; : &#x27;Create Post&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {state.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}

      {state.success &amp;&amp; state.data &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;success&quot;</span>&gt;</span>Post created! ID: {state.data.postId}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>أما النماذج الأبسط فيمكنك استدعاء إجراءات الخادم مباشرةً:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server Component with inline form</span>
<span class="hljs-keyword">import</span> { createPost } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">QuickPostForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{createPost}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;title&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Post title&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;content&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Post content&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;categoryId&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;general&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Create Post<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>حين تستدعي إجراء خادم مباشرةً من خاصية action للنموذج، يحصل تلقائيًا على FormData كوسيط. ولهذا يعالج مساعد <code>createAction</code> عندنا أنواع الإدخال غير المعروفة.</p>
</blockquote>
<h2 id="التعامل-مع-تدفقات-البيانات-المركبة">التعامل مع تدفقات البيانات المركّبة</h2>
<p>في التطبيقات الأكثر تقدّمًا ستحتاج إلى أنماط تعالج علاقات البيانات المركّبة ومزامنة الحالة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Complex action with related data</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> createPostWithTags = <span class="hljs-title function_">createAction</span>(
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
    <span class="hljs-attr">content</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
    <span class="hljs-attr">categoryId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
    <span class="hljs-attr">tagNames</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()).<span class="hljs-title function_">optional</span>(),
    <span class="hljs-attr">draft</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">optional</span>(),
  }),
  <span class="hljs-title function_">async</span> (input) =&gt; {
    <span class="hljs-comment">// Start a database transaction</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> db.$transaction(<span class="hljs-title function_">async</span> (tx) =&gt; {
      <span class="hljs-comment">// Create the post</span>
      <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> tx.<span class="hljs-property">post</span>.<span class="hljs-title function_">create</span>({
        <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">title</span>: input.<span class="hljs-property">title</span>,
          <span class="hljs-attr">content</span>: input.<span class="hljs-property">content</span>,
          <span class="hljs-attr">categoryId</span>: input.<span class="hljs-property">categoryId</span>,
          <span class="hljs-attr">authorId</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">getCurrentUserId</span>(),
          <span class="hljs-attr">published</span>: !input.<span class="hljs-property">draft</span>,
        },
      });

      <span class="hljs-comment">// Handle tags</span>
      <span class="hljs-keyword">if</span> (input.<span class="hljs-property">tagNames</span> &amp;&amp; input.<span class="hljs-property">tagNames</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-comment">// Find existing tags or create new ones</span>
        <span class="hljs-keyword">const</span> tags = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
          input.<span class="hljs-property">tagNames</span>.<span class="hljs-title function_">map</span>(<span class="hljs-title function_">async</span> (name) =&gt; {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> tx.<span class="hljs-property">tag</span>.<span class="hljs-title function_">upsert</span>({
              <span class="hljs-attr">where</span>: { name },
              <span class="hljs-attr">create</span>: { name },
              <span class="hljs-attr">update</span>: {},
            });
          }),
        );

        <span class="hljs-comment">// Connect tags to post</span>
        <span class="hljs-keyword">await</span> tx.<span class="hljs-property">postTag</span>.<span class="hljs-title function_">createMany</span>({
          <span class="hljs-attr">data</span>: tags.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">tag</span>) =&gt;</span> ({
            <span class="hljs-attr">postId</span>: post.<span class="hljs-property">id</span>,
            <span class="hljs-attr">tagId</span>: tag.<span class="hljs-property">id</span>,
          })),
        });
      }

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">postId</span>: post.<span class="hljs-property">id</span>,
        <span class="hljs-attr">tagCount</span>: input.<span class="hljs-property">tagNames</span>?.<span class="hljs-property">length</span> || <span class="hljs-number">0</span>,
      };
    });
  },
);

<span class="hljs-comment">// Action for bulk operations</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> bulkUpdatePosts = <span class="hljs-title function_">createAction</span>(
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">postIds</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>()).<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
    <span class="hljs-attr">updates</span>: z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">published</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">optional</span>(),
      <span class="hljs-attr">categoryId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>().<span class="hljs-title function_">optional</span>(),
    }),
  }),
  <span class="hljs-title function_">async</span> (input) =&gt; {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">updateMany</span>({
      <span class="hljs-attr">where</span>: {
        <span class="hljs-attr">id</span>: { <span class="hljs-attr">in</span>: input.<span class="hljs-property">postIds</span> },
      },
      <span class="hljs-attr">data</span>: input.<span class="hljs-property">updates</span>,
    });

    <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">&#x27;/admin/posts&#x27;</span>);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">updatedCount</span>: result.<span class="hljs-property">count</span>,
    };
  },
);
</code></pre>
<h2 id="تحديثات-متفائلة-بواسطة-إجراءات-الخادم">تحديثات متفائلة بواسطة إجراءات الخادم</h2>
<p>أحيانًا تريد تغذيةً راجعة فورية لواجهة المستخدم في أثناء تنفيذ إجراء الخادم. وإليك كيف تطبّق التحديثات المتفائلة بأمان:</p>
<pre><code class="language-typescript"><span class="hljs-string">&#x27;use client&#x27;</span>;

<span class="hljs-keyword">import</span> { useActionState, useOptimistic } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { togglePostPublished } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Post</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">published</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">PostList</span>(<span class="hljs-params">{ initialPosts }: { initialPosts: Post[] }</span>) {
  <span class="hljs-keyword">const</span> [optimisticPosts, setOptimisticPosts] = <span class="hljs-title function_">useOptimistic</span>(
    initialPosts,
    <span class="hljs-function">(<span class="hljs-params">currentPosts, { postId, published }: { postId: <span class="hljs-built_in">string</span>; published: <span class="hljs-built_in">boolean</span> }</span>) =&gt;</span>
      currentPosts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> (post.<span class="hljs-property">id</span> === postId ? { ...post, published } : post)),
  );

  <span class="hljs-keyword">const</span> [state, formAction] = <span class="hljs-title function_">useActionState</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">prevState</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>) =&gt; {
      <span class="hljs-keyword">const</span> postId = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;postId&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;
      <span class="hljs-keyword">const</span> currentPost = initialPosts.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> p.<span class="hljs-property">id</span> === postId);

      <span class="hljs-keyword">if</span> (!currentPost) <span class="hljs-keyword">return</span> prevState;

      <span class="hljs-comment">// Optimistic update</span>
      <span class="hljs-title function_">setOptimisticPosts</span>({
        postId,
        <span class="hljs-attr">published</span>: !currentPost.<span class="hljs-property">published</span>,
      });

      <span class="hljs-comment">// Execute Server Action</span>
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">togglePostPublished</span>(postId);

      <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
        <span class="hljs-comment">// Revert optimistic update on error</span>
        <span class="hljs-title function_">setOptimisticPosts</span>({
          postId,
          <span class="hljs-attr">published</span>: currentPost.<span class="hljs-property">published</span>,
        });
      }

      <span class="hljs-keyword">return</span> result;
    },
    { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> },
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {optimisticPosts.map((post) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;post-item&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;postId&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{post.id}</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{post.published</span> ? &#x27;<span class="hljs-attr">published</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">draft</span>&#x27;}&gt;</span>
              {post.published ? &#x27;✓ Published&#x27; : &#x27;○ Draft&#x27;}
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}

      {state.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>Error: {state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وهو إجراء الخادم المقابل:</p>
<pre><code class="language-typescript"><span class="hljs-string">&#x27;use server&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> togglePostPublished = <span class="hljs-title function_">createAction</span>(z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(), <span class="hljs-title function_">async</span> (<span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span>) =&gt; {
  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">findUnique</span>({
    <span class="hljs-attr">where</span>: { <span class="hljs-attr">id</span>: postId },
    <span class="hljs-attr">select</span>: { <span class="hljs-attr">published</span>: <span class="hljs-literal">true</span> },
  });

  <span class="hljs-keyword">if</span> (!post) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Post not found&#x27;</span>);
  }

  <span class="hljs-keyword">const</span> updated = <span class="hljs-keyword">await</span> db.<span class="hljs-property">post</span>.<span class="hljs-title function_">update</span>({
    <span class="hljs-attr">where</span>: { <span class="hljs-attr">id</span>: postId },
    <span class="hljs-attr">data</span>: { <span class="hljs-attr">published</span>: !post.<span class="hljs-property">published</span> },
  });

  <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>);

  <span class="hljs-keyword">return</span> {
    postId,
    <span class="hljs-attr">published</span>: updated.<span class="hljs-property">published</span>,
  };
});
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تمهّل مع التحديثات المتفائلة في العمليات التي قد تفشل. واطمئن أن لديك استراتيجية تراجع ورسائل أخطاء واضحة للمستخدمين.</p>
</blockquote>
<h2 id="حدود-الأخطاء-وإخفاقات-إجراءات-الخادم">حدود الأخطاء وإخفاقات إجراءات الخادم</h2>
<p>قد تفشل إجراءات الخادم في صور شتى — مشكلات الشبكة، وأخطاء التحقق، وقيود قاعدة البيانات، أو مخالفات منطق العمل. وإليك كيف تعالجها برفق:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Error boundary specifically for Server Action errors</span>
<span class="hljs-string">&#x27;use client&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Component</span>, <span class="hljs-title class_">ErrorInfo</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ServerActionErrorBoundaryState</span> {
  <span class="hljs-attr">hasError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
  <span class="hljs-attr">errorId</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ServerActionErrorBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;
  { <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>; <span class="hljs-attr">fallback</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">ReactNode</span> },
  <span class="hljs-title class_">ServerActionErrorBoundaryState</span>
&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-variable language_">super</span>(props);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span> };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getDerivedStateFromError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">ServerActionErrorBoundaryState</span> {
    <span class="hljs-keyword">const</span> errorId = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(<span class="hljs-number">36</span>).<span class="hljs-title function_">substr</span>(<span class="hljs-number">2</span>, <span class="hljs-number">9</span>);

    <span class="hljs-comment">// Log to monitoring service</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Server Action Error:&#x27;</span>, { error, errorId });

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span>,
      error,
      errorId,
    };
  }

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-comment">// Send to error reporting service</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Server Action Error Details:&#x27;</span>, { error, errorInfo });
  }

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">hasError</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">error</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">errorId</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">fallback</span> ? (
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-title function_">fallback</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">error</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">errorId</span>)
      ) : (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-boundary&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Something went wrong<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>We&#x27;re sorry, but something unexpected happened.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">whiteSpace:</span> &#x27;<span class="hljs-attr">pre-wrap</span>&#x27; }}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>Error details (ID: {this.state.errorId})<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
            {this.state.error.message}
          <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.setState({ hasError: false })}&gt;Try again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">children</span>;
  }
}
</code></pre>
<p>استخدمه لتغليف المكوّنات التي تستدعي إجراءات الخادم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">PostManagement</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ServerActionErrorBoundary</span>
      <span class="hljs-attr">fallback</span>=<span class="hljs-string">{(error,</span> <span class="hljs-attr">errorId</span>) =&gt;</span> (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;server-error&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Server Action Failed<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Unable to complete the operation.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Error ID: {errorId}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> window.location.reload()}&gt;Reload Page<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">CreatePostForm</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PostList</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ServerActionErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>تفتح مكوّنات الخادم وإجراءاتُه فرصَ تحسينٍ جديدة، لكنها تُدخل اعتبارات جديدة كذلك:</p>
<h3 id="التدفق-وsuspense">التدفق و<code>Suspense</code></h3>
<p>اجمع بين مكوّنات الخادم وSuspense لأداءٍ مدركٍ أفضل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Fast component that renders immediately</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PostHeader</span>(<span class="hljs-params">{ title }: { title: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-comment">// Slow component that fetches data</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">PostComments</span>(<span class="hljs-params">{ postId }: { postId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// This might take a while...</span>
  <span class="hljs-keyword">const</span> comments = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchComments</span>(postId);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {comments.map((comment) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{comment.id}</span>&gt;</span>{comment.content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">PostPage</span>(<span class="hljs-params">{ params }: { params: { postId: <span class="hljs-built_in">string</span> } }</span>) {
  <span class="hljs-comment">// This loads quickly</span>
  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchPost</span>(params.<span class="hljs-property">postId</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PostHeader</span> <span class="hljs-attr">title</span>=<span class="hljs-string">{post.title}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{post.content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {/* Comments load independently */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading comments...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">PostComments</span> <span class="hljs-attr">postId</span>=<span class="hljs-string">{params.postId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="تخزين-نتائج-إجراءات-الخادم-مؤقتا">تخزين نتائج إجراءات الخادم مؤقتًا</h3>
<p>من أجل إجراءات الخادم المكلفة، طبّق التخزين المؤقت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { unstable_cache <span class="hljs-keyword">as</span> cache } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/cache&#x27;</span>;

<span class="hljs-comment">// Cache expensive computations</span>
<span class="hljs-keyword">const</span> getCachedAnalytics = <span class="hljs-title function_">cache</span>(
  <span class="hljs-title function_">async</span> (<span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">dateRange</span>: <span class="hljs-built_in">string</span>) =&gt; {
    <span class="hljs-comment">// Expensive analytics computation</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">computeUserAnalytics</span>(userId, dateRange);
  },
  [<span class="hljs-string">&#x27;user-analytics&#x27;</span>],
  {
    <span class="hljs-attr">revalidate</span>: <span class="hljs-number">3600</span>, <span class="hljs-comment">// 1 hour</span>
    <span class="hljs-attr">tags</span>: [<span class="hljs-string">&#x27;analytics&#x27;</span>],
  },
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> generateReport = <span class="hljs-title function_">createAction</span>(
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">userId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
    <span class="hljs-attr">dateRange</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;week&#x27;</span>, <span class="hljs-string">&#x27;month&#x27;</span>, <span class="hljs-string">&#x27;year&#x27;</span>]),
  }),
  <span class="hljs-title function_">async</span> (input) =&gt; {
    <span class="hljs-keyword">const</span> analytics = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getCachedAnalytics</span>(input.<span class="hljs-property">userId</span>, input.<span class="hljs-property">dateRange</span>);

    <span class="hljs-comment">// Generate report from cached data</span>
    <span class="hljs-keyword">const</span> report = <span class="hljs-keyword">await</span> <span class="hljs-title function_">generateReportFromAnalytics</span>(analytics);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">reportId</span>: report.<span class="hljs-property">id</span>,
      <span class="hljs-attr">downloadUrl</span>: report.<span class="hljs-property">url</span>,
    };
  },
);
</code></pre>
<h3 id="المعالجة-في-الخلفية">المعالجة في الخلفية</h3>
<p>من أجل إجراءات الخادم طويلة التنفيذ، فكّر في المعالجة بالخلفية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Queue system integration</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Queue</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/queue&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> processLargeDataset = <span class="hljs-title function_">createAction</span>(
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">datasetId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
    <span class="hljs-attr">options</span>: z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">format</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;csv&#x27;</span>, <span class="hljs-string">&#x27;json&#x27;</span>]),
      <span class="hljs-attr">includeMetadata</span>: z.<span class="hljs-title function_">boolean</span>(),
    }),
  }),
  <span class="hljs-title function_">async</span> (input) =&gt; {
    <span class="hljs-comment">// Start background job</span>
    <span class="hljs-keyword">const</span> job = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Queue</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;process-dataset&#x27;</span>, {
      <span class="hljs-attr">datasetId</span>: input.<span class="hljs-property">datasetId</span>,
      <span class="hljs-attr">options</span>: input.<span class="hljs-property">options</span>,
      <span class="hljs-attr">userId</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">getCurrentUserId</span>(),
    });

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">jobId</span>: job.<span class="hljs-property">id</span>,
      <span class="hljs-attr">estimatedDuration</span>: <span class="hljs-string">&#x27;5-10 minutes&#x27;</span>,
    };
  },
);

<span class="hljs-comment">// Check job status action</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> checkJobStatus = <span class="hljs-title function_">createAction</span>(z.<span class="hljs-title function_">string</span>(), <span class="hljs-title function_">async</span> (<span class="hljs-attr">jobId</span>: <span class="hljs-built_in">string</span>) =&gt; {
  <span class="hljs-keyword">const</span> job = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Queue</span>.<span class="hljs-title function_">getJob</span>(jobId);

  <span class="hljs-keyword">if</span> (!job) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Job not found&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">status</span>: job.<span class="hljs-property">progress</span>,
    <span class="hljs-attr">result</span>: job.<span class="hljs-property">returnvalue</span>,
    <span class="hljs-attr">error</span>: job.<span class="hljs-property">failedReason</span>,
  };
});
</code></pre>
<h2 id="أنماط-من-الواقع-وأفضل-الممارسات">أنماط من الواقع وأفضل الممارسات</h2>
<p>إليك بعض الأنماط الجاهزة للإنتاج في حالات الاستخدام الشائعة:</p>
<h3 id="نماذج-متعددة-الخطوات-مع-إجراءات-الخادم">نماذج متعددة الخطوات مع إجراءات الخادم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Multi-step form state management</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormStep</span> = <span class="hljs-string">&#x27;personal&#x27;</span> | <span class="hljs-string">&#x27;payment&#x27;</span> | <span class="hljs-string">&#x27;confirmation&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormState</span> {
  <span class="hljs-attr">currentStep</span>: <span class="hljs-title class_">FormStep</span>;
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">personal</span>?: <span class="hljs-title class_">PersonalInfo</span>;
    <span class="hljs-attr">payment</span>?: <span class="hljs-title class_">PaymentInfo</span>;
  };
  <span class="hljs-attr">errors</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
  <span class="hljs-attr">submitting</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> processFormStep = <span class="hljs-title function_">createAction</span>(
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">step</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;personal&#x27;</span>, <span class="hljs-string">&#x27;payment&#x27;</span>, <span class="hljs-string">&#x27;submit&#x27;</span>]),
    <span class="hljs-attr">data</span>: z.<span class="hljs-title function_">record</span>(z.<span class="hljs-title function_">any</span>()),
    <span class="hljs-attr">currentData</span>: z.<span class="hljs-title function_">record</span>(z.<span class="hljs-title function_">any</span>()).<span class="hljs-title function_">optional</span>(),
  }),
  <span class="hljs-title function_">async</span> (input) =&gt; {
    <span class="hljs-keyword">switch</span> (input.<span class="hljs-property">step</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;personal&#x27;</span>: {
        <span class="hljs-keyword">const</span> personalData = <span class="hljs-title class_">PersonalInfoSchema</span>.<span class="hljs-title function_">parse</span>(input.<span class="hljs-property">data</span>);
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;payment&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
          <span class="hljs-attr">data</span>: { <span class="hljs-attr">personal</span>: personalData },
        };
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;payment&#x27;</span>: {
        <span class="hljs-keyword">const</span> paymentData = <span class="hljs-title class_">PaymentInfoSchema</span>.<span class="hljs-title function_">parse</span>(input.<span class="hljs-property">data</span>);
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;confirmation&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
          <span class="hljs-attr">data</span>: {
            ...input.<span class="hljs-property">currentData</span>,
            <span class="hljs-attr">payment</span>: paymentData,
          },
        };
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;submit&#x27;</span>: {
        <span class="hljs-comment">// Process final submission</span>
        <span class="hljs-keyword">const</span> orderId = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createOrder</span>(input.<span class="hljs-property">currentData</span>);
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;confirmation&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
          orderId,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>,
        };
      }
    }
  },
);
</code></pre>
<h3 id="التحديثات-في-الزمن-الحقيقي">التحديثات في الزمن الحقيقي</h3>
<pre><code class="language-typescript"><span class="hljs-string">&#x27;use client&#x27;</span>;

<span class="hljs-keyword">import</span> { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { refreshData } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LiveDataComponent</span>(<span class="hljs-params">{ initialData }: { initialData: <span class="hljs-built_in">any</span>[] }</span>) {
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(initialData);
  <span class="hljs-keyword">const</span> [lastUpdate, setLastUpdate] = <span class="hljs-title function_">useState</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">refreshData</span>(lastUpdate);

        <span class="hljs-keyword">if</span> (result.<span class="hljs-property">success</span> &amp;&amp; result.<span class="hljs-property">data</span>) {
          <span class="hljs-title function_">setData</span>(result.<span class="hljs-property">data</span>);
          <span class="hljs-title function_">setLastUpdate</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());
        }
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to refresh data:&#x27;</span>, error);
      }
    }, <span class="hljs-number">5000</span>); <span class="hljs-comment">// Refresh every 5 seconds</span>

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, [lastUpdate]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {data.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Last updated: {new Date(lastUpdate).toLocaleTimeString()}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اختبار-مكونات-الخادم-وإجراءاتها">اختبار مكوّنات الخادم وإجراءاتها</h2>
<p>اختبار هذه الأنماط الجديدة يستلزم بعض المقاربات الخاصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Testing Server Components</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { jest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@jest/globals&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">UserProfile</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./UserProfile&#x27;</span>;

<span class="hljs-comment">// Mock the database</span>
jest.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;@/lib/database&#x27;</span>, <span class="hljs-function">() =&gt;</span> ({
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">findUnique</span>: jest.<span class="hljs-title function_">fn</span>(),
  },
}));

<span class="hljs-keyword">import</span> { db } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/lib/database&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;UserProfile Server Component&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    jest.<span class="hljs-title function_">clearAllMocks</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;renders user data correctly&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> mockUser = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
    };

    (db.<span class="hljs-property">user</span>.<span class="hljs-property">findUnique</span> <span class="hljs-keyword">as</span> jest.<span class="hljs-property">Mock</span>).<span class="hljs-title function_">mockResolvedValue</span>(mockUser);

    <span class="hljs-comment">// Server Components return promises, so we await them</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title class_">ProfileComponent</span> = <span class="hljs-keyword">await</span> <span class="hljs-title class_">UserProfile</span>({ <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;1&#x27;</span> });
    <span class="hljs-keyword">const</span> { getByText } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{ProfileComponent}<span class="hljs-tag">&lt;/&gt;</span></span>);

    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;John Doe&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;john@example.com&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;handles user not found&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    (db.<span class="hljs-property">user</span>.<span class="hljs-property">findUnique</span> <span class="hljs-keyword">as</span> jest.<span class="hljs-property">Mock</span>).<span class="hljs-title function_">mockResolvedValue</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">const</span> <span class="hljs-title class_">ProfileComponent</span> = <span class="hljs-keyword">await</span> <span class="hljs-title class_">UserProfile</span>({ <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;nonexistent&#x27;</span> });
    <span class="hljs-keyword">const</span> { getByText } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{ProfileComponent}<span class="hljs-tag">&lt;/&gt;</span></span>);

    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});

<span class="hljs-comment">// Testing Server Actions</span>
<span class="hljs-keyword">import</span> { createPost } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./actions&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;createPost Server Action&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;creates post with valid data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> validData = {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Test Post&#x27;</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">&#x27;This is a test post&#x27;</span>,
      <span class="hljs-attr">categoryId</span>: <span class="hljs-string">&#x27;123e4567-e89b-12d3-a456-426614174000&#x27;</span>,
    };

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createPost</span>(validData);

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">success</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">data</span>).<span class="hljs-title function_">toHaveProperty</span>(<span class="hljs-string">&#x27;postId&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns validation errors for invalid data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> invalidData = {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-comment">// Empty title should fail</span>
      <span class="hljs-attr">content</span>: <span class="hljs-string">&#x27;Content&#x27;</span>,
      <span class="hljs-attr">categoryId</span>: <span class="hljs-string">&#x27;invalid-uuid&#x27;</span>,
    };

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createPost</span>(invalidData);

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">success</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">fieldErrors</span>).<span class="hljs-title function_">toHaveProperty</span>(<span class="hljs-string">&#x27;title&#x27;</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">fieldErrors</span>).<span class="hljs-title function_">toHaveProperty</span>(<span class="hljs-string">&#x27;categoryId&#x27;</span>);
  });
});
</code></pre>
<h2 id="الخطوات-التالية-واعتبارات-الإنتاج">الخطوات التالية واعتبارات الإنتاج</h2>
<p>تُمثّل مكوّنات خادم React وإجراءاتُ الخادم تحوّلًا هامًّا في تطوير React. وإليك ما ينبغي أن تركّز عليه أثناء تبنّي هذه الأنماط:</p>
<ol>
<li><strong>ابدأ بمكوّنات الخادم</strong>: ابدأ بنقل منطق جلب البيانات من مكوّنات العميل إلى مكوّنات الخادم</li>
<li><strong>التحسين التدريجي</strong>: اضبط أن تعمل إجراءات الخادم لديك دون جافاسكربت لمرونة أكبر</li>
<li><strong>المراقبة وقابلية الملاحظة</strong>: هيّئ التسجيل المناسب وتتبع الأخطاء لعمليات جانب الخادم</li>
<li><strong>اختبار الأداء</strong>: قِس التأثير في موارد الخادم وفي أحجام حزم العميل معًا</li>
</ol>
<p>تتوسع الأنماط التي غطيناها من النماذج البسيطة إلى سير العمل متعدد الخطوات. والمفتاح هو الإبقاء على حدود صارمة بين شيفرة الخادم وشيفرة العميل مع الاستفادة من TypeScript لالتقاط مشكلات التسلسل قبل أن تصل إلى الإنتاج.</p>
<p>بتقبّلك المكوّنات الخاملة، والإجراءات الآمنة الأنواع، وحدود الأخطاء المناسبة، ستبني تطبيقات أكثر أداءً وأيسر صيانة. ويصير حد الخادم/العميل ميزةً لا قيدًا — فتجمع خير الأمرين مع شبكة أمان TypeScript تضمن أن كل شيء يعمل على الوجه الصحيح.</p>
<p>مكوّنات الخادم وإجراءات الخادم لا تخص الأداء وحده؛ بل بناء معماريات أفضل هي أسهل تأمّلًا واختبارًا وصيانة. أهلًا بك في مستقبل تطوير React.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
