const s="kinney",a="react-typescript",n="React مع TypeScript",p="react-query-trpc",l="React Query مع tRPC",t=[{depth:2,id:"ما-الذي-يجعل-trpc-مع-react-query-مميزا",text:"ما الذي يجعل tRPC مع React Query مميّزًا"},{depth:2,id:"وضع-الأساس",text:"وضع الأساس"},{depth:2,id:"إعداد-العميل-مع-التكامل-مع-react-query",text:"إعداد العميل مع التكامل مع React Query"},{depth:2,id:"استخدام-استعلامات-trpc-في-المكونات",text:"استخدام استعلامات tRPC في المكوّنات"},{depth:2,id:"الطفرات-مع-التحديثات-المتفائلة",text:"الطفرات مع التحديثات المتفائلة"},{depth:2,id:"أنماط-الاستعلام-المتقدمة",text:"أنماط الاستعلام المتقدمة"},{depth:3,id:"استعلامات-الاعتمادية",text:"استعلامات الاعتمادية"},{depth:3,id:"الاستعلامات-اللانهائية",text:"الاستعلامات اللانهائية"},{depth:2,id:"إدارة-الذاكرة-المؤقتة-والإبطال",text:"إدارة الذاكرة المؤقتة والإبطال"},{depth:2,id:"التحسين-عبر-الجلب-المسبق",text:"التحسين عبر الجلب المسبق"},{depth:2,id:"استراتيجيات-معالجة-الأخطاء",text:"استراتيجيات معالجة الأخطاء"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"تجميع-الاستعلامات",text:"تجميع الاستعلامات"},{depth:3,id:"الإبطال-الانتقائي",text:"الإبطال الانتقائي"},{depth:3,id:"أنماط-الاشتراك",text:"أنماط الاشتراك"},{depth:2,id:"أنماط-البنية-المعمارية-في-العالم-الحقيقي",text:"أنماط البنية المعمارية في العالم الحقيقي"},{depth:3,id:"تنظيم-الاستعلامات",text:"تنظيم الاستعلامات"},{depth:3,id:"خطافات-مخصصة-لمنطق-العمل",text:"خُطّافات مخصّصة لمنطق العمل"},{depth:2,id:"الأخطاء-الشائعة-والحلول",text:"الأخطاء الشائعة والحلول"},{depth:3,id:"الالتباس-في-مفاتيح-الذاكرة-المؤقتة",text:"الالتباس في مفاتيح الذاكرة المؤقتة"},{depth:3,id:"الإبطال-المفرط",text:"الإبطال المفرط"},{depth:3,id:"تسرب-الذاكرة-مع-الاشتراكات",text:"تسرّب الذاكرة مع الاشتراكات"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>بناء طبقة بيانات آمنة النوع بالكامل بين واجهة React الأمامية وخادمك الخلفي هو من تلك الأشياء التي تبدو معقّدة، لكنها تصبح مدهشة في البساطة بمجرد أن تضع القطع في مواضعها. حين تجمع بين التخزين المؤقت القوي وإدارة الحالة في React Query وبين الأمان النوعي من الطرف إلى الطرف في tRPC، تحصل على شيء سحري: استنتاجًا كاملًا من TypeScript من دوال الخادم وصولًا إلى مكوّنات React، دون أي تعريفات أنواع يدوية.</p>
<p>إليك ما نحن بصدد حله: واجهات REST التقليدية تُلزمك بالحفاظ يدويًا على تزامن أنواع الواجهة الأمامية مع الأنواع الخلفية، ومفاتيح التخزين المؤقت في React Query مجرد نصوص (فمن السهل أن يخطئ فيها أحد)، وأنت تكتب باستمرار شيفرة متكرّرة لأنماط جلب البيانات. يزيل tRPC الانحراف النوعي بين العميل والخادم، بينما يتولى React Query كل فوضى إدارة الحالة غير المتزامنة — وحين يعملان معًا تصير طبقة بياناتك قويّة وآمنة النوع بالكامل في آن واحد.</p>
<h2 id="ما-الذي-يجعل-trpc-مع-react-query-مميزا">ما الذي يجعل tRPC مع React Query مميّزًا</h2>
<p>قبل أن نغوص في التنفيذ، لنفهم لماذا هذا المزيج مقنع إلى هذا الحد:</p>
<p><strong>يمنحك tRPC</strong>:</p>
<ul>
<li>أمانًا نوعيًا من الطرف إلى الطرف من الخادم إلى العميل</li>
<li>شيفرة عميل مولَّدة تلقائيًا من موجّه الخادم (server router)</li>
<li>لا مزيد من أنواع API يدوية ولا من الحاجة إلى مزامنة المخططات (schemas)</li>
<li>أخطاء وقت ترجمة (compile-time) حين تتغير واجهات الخادم</li>
</ul>
<p><strong>يضيف React Query</strong>:</p>
<ul>
<li>تخزينًا مؤقتًا ذكيًا مع تحديثات خلفية تلقائية</li>
<li>إلغاء تكرار الطلبات (request deduplication) وحالات تحميل صحيحة</li>
<li>تحديثات متفائلة (optimistic updates) وإبطال الذاكرة المؤقتة</li>
<li>معالجة أخطاء سليمة ومنطق إعادة المحاولة</li>
</ul>
<p>معًا، يخلقان طبقة بيانات يستطيع محرّرك أن يكمل فيها أسماء دوال الخادم ومعاملاتها وأنواع إرجاعها تلقائيًا — بينما يتولى React Query كل التعقيد غير المتزامن في الخلفية.</p>
<h2 id="وضع-الأساس">وضع الأساس</h2>
<p>لنبدأ بإعداد tRPC بسيط. أولًا، ثبّت الاعتماديات:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Server packages</span>
npm install @trpc/server @trpc/client @trpc/react-query
npm install @tanstack/react-query zod

<span class="hljs-comment"># If using Next.js</span>
npm install @trpc/next
</code></pre>
<p>وهذا إعداد خادم tRPC أدنى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// server/trpc.ts</span>
<span class="hljs-keyword">import</span> { initTRPC } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/server&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> t = initTRPC.<span class="hljs-title function_">create</span>();

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> router = t.<span class="hljs-property">router</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> publicProcedure = t.<span class="hljs-property">procedure</span>;

<span class="hljs-comment">// Example router with some procedures</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> appRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">getUser</span>: publicProcedure.<span class="hljs-title function_">input</span>(z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>() })).<span class="hljs-title function_">query</span>(<span class="hljs-title function_">async</span> ({ input }) =&gt; {
    <span class="hljs-comment">// Your database call here</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: input.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
      <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
    };
  }),

  <span class="hljs-attr">getUsers</span>: publicProcedure.<span class="hljs-title function_">query</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Return array of users</span>
    <span class="hljs-keyword">return</span> [
      { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span> },
      { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Jane Smith&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;jane@example.com&#x27;</span> },
    ];
  }),

  <span class="hljs-attr">createUser</span>: publicProcedure
    .<span class="hljs-title function_">input</span>(
      z.<span class="hljs-title function_">object</span>({
        <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
        <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
      }),
    )
    .<span class="hljs-title function_">mutation</span>(<span class="hljs-title function_">async</span> ({ input }) =&gt; {
      <span class="hljs-comment">// Create user in database</span>
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">id</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(),
        ...input,
        <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      };
    }),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppRouter</span> = <span class="hljs-keyword">typeof</span> appRouter;
</code></pre>
<p>السحر هنا في نوع <code>AppRouter</code> — إذ سيستخدمه tRPC لتوليد شيفرة عميل مُنمَّطة بالكامل.</p>
<h2 id="إعداد-العميل-مع-التكامل-مع-react-query">إعداد العميل مع التكامل مع React Query</h2>
<p>الآن لنجهّز جانب العميل. تكامل tRPC مع React Query يمنحك خُطّافات (hooks) تعمل تمامًا مثل React Query العادي، لكن مع أمان نوعي كامل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/trpc.ts</span>
<span class="hljs-keyword">import</span> { createTRPCReact } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/react-query&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppRouter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../server/trpc&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> trpc = createTRPCReact&lt;<span class="hljs-title class_">AppRouter</span>&gt;();
</code></pre>
<p>اضبط المزوّدات (providers) — يبدو هذا مثل إعداد React Query العادي إلى حد بعيد:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// app.tsx</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">QueryClient</span>, <span class="hljs-title class_">QueryClientProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>;
<span class="hljs-keyword">import</span> { httpBatchLink } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/client&#x27;</span>;
<span class="hljs-keyword">import</span> { trpc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./utils/trpc&#x27;</span>;
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [queryClient] = <span class="hljs-title function_">useState</span>(
    <span class="hljs-function">() =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryClient</span>({
        <span class="hljs-attr">defaultOptions</span>: {
          <span class="hljs-attr">queries</span>: {
            <span class="hljs-attr">staleTime</span>: <span class="hljs-number">5</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// 5 minutes</span>
            <span class="hljs-attr">cacheTime</span>: <span class="hljs-number">10</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// 10 minutes</span>
          },
        },
      }),
  );

  <span class="hljs-keyword">const</span> [trpcClient] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span>
    trpc.<span class="hljs-title function_">createClient</span>({
      <span class="hljs-attr">links</span>: [
        <span class="hljs-title function_">httpBatchLink</span>({
          <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;/api/trpc&#x27;</span>, <span class="hljs-comment">// Your tRPC endpoint</span>
        }),
      ],
    }),
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">trpc.Provider</span> <span class="hljs-attr">client</span>=<span class="hljs-string">{trpcClient}</span> <span class="hljs-attr">queryClient</span>=<span class="hljs-string">{queryClient}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">QueryClientProvider</span> <span class="hljs-attr">client</span>=<span class="hljs-string">{queryClient}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">UserDashboard</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">QueryClientProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">trpc.Provider</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استخدام-استعلامات-trpc-في-المكونات">استخدام استعلامات tRPC في المكوّنات</h2>
<p>هنا يحدث السحر. يحصل مكوّناتك على خُطّافات مُنمَّطة بالكامل تعرف دوال الخادم لديك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// components/UserDashboard.tsx</span>
<span class="hljs-keyword">import</span> { trpc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../utils/trpc&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ✅ Fully typed query - IDE knows return type and loading states</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: users, isLoading, error } = trpc.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">useQuery</span>();

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading users...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Users<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      {users?.map((user) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserCard</span>(<span class="hljs-params">{ user }: { user: { id: <span class="hljs-built_in">string</span>; name: <span class="hljs-built_in">string</span>; email: <span class="hljs-built_in">string</span> } }</span>) {
  <span class="hljs-comment">// Query with parameters - also fully typed</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: userData, isLoading } = trpc.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({
    <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>,
  });

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading {user.name}...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-card&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{userData?.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{userData?.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">small</span>&gt;</span>Created: {userData?.createdAt.toLocaleDateString()}<span class="hljs-tag">&lt;/<span class="hljs-name">small</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ أنه لا حاجة إلى أي كتابة يدوية للأنواع — فقد استنتج tRPC أنواع الإرجاع من موجّه الخادم لديك، ويقدّم React Query كل حالات التحميل ومعالجة الأخطاء.</p>
<h2 id="الطفرات-مع-التحديثات-المتفائلة">الطفرات مع التحديثات المتفائلة</h2>
<p>تعمل طفرات tRPC بسلاسة تامّة مع أنماط التحديث المتفائلة في React Query:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CreateUserForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> utils = trpc.<span class="hljs-title function_">useUtils</span>();

  <span class="hljs-keyword">const</span> createUser = trpc.<span class="hljs-property">createUser</span>.<span class="hljs-title function_">useMutation</span>({
    <span class="hljs-comment">// Optimistically update the cache</span>
    <span class="hljs-attr">onMutate</span>: <span class="hljs-title function_">async</span> (newUser) =&gt; {
      <span class="hljs-keyword">await</span> utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">cancel</span>();

      <span class="hljs-keyword">const</span> previousUsers = utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">getData</span>();

      <span class="hljs-comment">// Optimistically add the new user</span>
      utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">setData</span>(<span class="hljs-literal">undefined</span>, <span class="hljs-function">(<span class="hljs-params">old = []</span>) =&gt;</span> [
        ...old,
        {
          <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;temp-&#x27;</span> + <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
          ...newUser,
        },
      ]);

      <span class="hljs-keyword">return</span> { previousUsers };
    },

    <span class="hljs-comment">// If mutation fails, rollback</span>
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">err, newUser, context</span>) =&gt;</span> {
      utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">setData</span>(<span class="hljs-literal">undefined</span>, context?.<span class="hljs-property">previousUsers</span>);
    },

    <span class="hljs-comment">// Always refetch after error or success</span>
    <span class="hljs-attr">onSettled</span>: <span class="hljs-function">() =&gt;</span> {
      utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">invalidate</span>();
    },
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span>&lt;<span class="hljs-title class_">HTMLFormElement</span>&gt;</span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>(e.<span class="hljs-property">currentTarget</span>);

    createUser.<span class="hljs-title function_">mutate</span>({
      <span class="hljs-attr">name</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;name&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
      <span class="hljs-attr">email</span>: formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;email&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>,
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Name&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{createUser.isLoading}</span>&gt;</span>
        {createUser.isLoading ? &#x27;Creating...&#x27; : &#x27;Create User&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}

## <span class="hljs-title class_">Vanilla</span> <span class="hljs-title class_">React</span> <span class="hljs-title class_">Query</span>: <span class="hljs-title class_">Typed</span> <span class="hljs-title class_">Patterns</span>

<span class="hljs-title class_">Even</span> without tRPC, you can get strong typing <span class="hljs-keyword">with</span> plain <span class="hljs-title class_">React</span> <span class="hljs-title class_">Query</span> by typing your fetchers, query keys, and error types.

<span class="hljs-string">\`\`</span><span class="hljs-string">\`ts
import { useQuery, UseQueryResult } from &#x27;@tanstack/react-query&#x27;;

// 1) Typed fetchers + inferred data
async function fetchUser(id: string) {
  const res = await fetch(\`</span>/api/users/\${id}<span class="hljs-string">\`);
  if (!res.ok) throw new Error(\`</span><span class="hljs-variable constant_">HTTP</span> \${res.<span class="hljs-property">status</span>}<span class="hljs-string">\`);
  return (await res.json()) as { id: string; name: string };
}

type InferPromise&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : never;
type UserData = InferPromise&lt;ReturnType&lt;typeof fetchUser&gt;&gt;; // { id: string; name: string }

// 2) Tuple query keys with const assertions for safety
const userKey = (id: string) =&gt; [&#x27;user&#x27;, id] as const;

// 3) Typed error channel (e.g., Error)
function useUser(id: string): UseQueryResult&lt;UserData, Error&gt; {
  return useQuery&lt;UserData, Error&gt;({
    queryKey: userKey(id),
    queryFn: () =&gt; fetchUser(id),
    // Select can further transform types
    select: (u) =&gt; ({ ...u, display: u.name.toUpperCase() }),
    staleTime: 60_000,
  });
}

// Usage
const { data, error } = useUser(&#x27;123&#x27;);
</span></code></pre>
<ul>
<li>استخدم <code>as const</code> في مفاتيح الاستعلامات (query keys) لتبقيها حرفية ومستقرة.</li>
<li>فضّل إعادة بيانات مُنمَّطة من دوال الجلب (fetchers) والاستنتاج عبر <code>ReturnType</code> أو مُساعد صغير اسمه <code>InferPromise</code>.</li>
<li>حدّد معامل نوع الخطأ (error type parameter) afin تتّسق معالجة <code>error</code> في واجهة المستخدم.</li>
</ul>
<h2 id="أنماط-الاستعلام-المتقدمة">أنماط الاستعلام المتقدمة</h2>
<h3 id="استعلامات-الاعتمادية">استعلامات الاعتمادية</h3>
<p>أحيانًا تحتاج إلى سلسلة استعلامات — تجلب مستخدمًا ثم تجلب مقالاته:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserWithPosts</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: user } = trpc.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">id</span>: userId });

  <span class="hljs-comment">// Only fetch posts if we have a user</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: posts, <span class="hljs-attr">isLoading</span>: postsLoading } = trpc.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">useQuery</span>(
    { userId },
    {
      <span class="hljs-attr">enabled</span>: !!user, <span class="hljs-comment">// Dependent query pattern</span>
    },
  );

  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      {postsLoading ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading posts...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        posts?.map((post) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">PostCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">post</span>=<span class="hljs-string">{post}</span> /&gt;</span>)
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="الاستعلامات-اللانهائية">الاستعلامات اللانهائية</h3>
<p>للترقيم الصفحي، ينسجم tRPC مع الاستعلامات اللانهائية في React Query:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server procedure with cursor-based pagination</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> appRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">getPostsPaginated</span>: publicProcedure
    .<span class="hljs-title function_">input</span>(
      z.<span class="hljs-title function_">object</span>({
        <span class="hljs-attr">cursor</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
        <span class="hljs-attr">limit</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">100</span>).<span class="hljs-title function_">default</span>(<span class="hljs-number">20</span>),
      }),
    )
    .<span class="hljs-title function_">query</span>(<span class="hljs-title function_">async</span> ({ input }) =&gt; {
      <span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPosts</span>({
        <span class="hljs-attr">cursor</span>: input.<span class="hljs-property">cursor</span>,
        <span class="hljs-attr">limit</span>: input.<span class="hljs-property">limit</span> + <span class="hljs-number">1</span>, <span class="hljs-comment">// Get one extra to determine if there&#x27;s more</span>
      });

      <span class="hljs-keyword">const</span> hasNextPage = posts.<span class="hljs-property">length</span> &gt; input.<span class="hljs-property">limit</span>;
      <span class="hljs-keyword">const</span> items = hasNextPage ? posts.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, -<span class="hljs-number">1</span>) : posts;

      <span class="hljs-keyword">return</span> {
        items,
        <span class="hljs-attr">nextCursor</span>: hasNextPage ? items[items.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>].<span class="hljs-property">id</span> : <span class="hljs-literal">null</span>,
      };
    }),
});
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// Client component with infinite scroll</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">InfinitePostList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.<span class="hljs-property">getPostsPaginated</span>.<span class="hljs-title function_">useInfiniteQuery</span>(
      { <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span> },
      {
        <span class="hljs-attr">getNextPageParam</span>: <span class="hljs-function">(<span class="hljs-params">lastPage</span>) =&gt;</span> lastPage.<span class="hljs-property">nextCursor</span>,
      },
    );

  <span class="hljs-keyword">const</span> posts = data?.<span class="hljs-property">pages</span>.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function">(<span class="hljs-params">page</span>) =&gt;</span> page.<span class="hljs-property">items</span>) ?? [];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {posts.map((post) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">PostCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">post</span>=<span class="hljs-string">{post}</span> /&gt;</span>
      ))}

      {hasNextPage &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> fetchNextPage()} disabled={isFetchingNextPage}&gt;
          {isFetchingNextPage ? &#x27;Loading more...&#x27; : &#x27;Load More&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="إدارة-الذاكرة-المؤقتة-والإبطال">إدارة الذاكرة المؤقتة والإبطال</h2>
<p>إحدى أقوى قدرات React Query هي الإدارة الذكية للذاكرة المؤقتة. ومع tRPC تحصل على أدوات مُنمَّطة لإدارة الذاكرة المؤقتة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useUserActions</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> utils = trpc.<span class="hljs-title function_">useUtils</span>();

  <span class="hljs-keyword">const</span> updateUser = trpc.<span class="hljs-property">updateUser</span>.<span class="hljs-title function_">useMutation</span>({
    <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">(<span class="hljs-params">updatedUser</span>) =&gt;</span> {
      <span class="hljs-comment">// Invalidate and refetch specific user</span>
      utils.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">invalidate</span>({ <span class="hljs-attr">id</span>: userId });

      <span class="hljs-comment">// Update user in the users list cache</span>
      utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">setData</span>(<span class="hljs-literal">undefined</span>, <span class="hljs-function">(<span class="hljs-params">oldUsers = []</span>) =&gt;</span>
        oldUsers.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> (user.<span class="hljs-property">id</span> === userId ? { ...user, ...updatedUser } : user)),
      );

      <span class="hljs-comment">// Invalidate any related queries</span>
      utils.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">invalidate</span>({ userId });
    },
  });

  <span class="hljs-keyword">const</span> deleteUser = trpc.<span class="hljs-property">deleteUser</span>.<span class="hljs-title function_">useMutation</span>({
    <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Remove from all relevant caches</span>
      utils.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">invalidate</span>({ <span class="hljs-attr">id</span>: userId });
      utils.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">invalidate</span>();
      utils.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">invalidate</span>({ userId });
    },
  });

  <span class="hljs-keyword">return</span> {
    updateUser,
    deleteUser,
  };
}
</code></pre>
<h2 id="التحسين-عبر-الجلب-المسبق">التحسين عبر الجلب المسبق</h2>
<p>يمكنك جلب البيانات مسبقًا قبل أن تلزم — وهو أمر ممتاز لحالات التمرير المؤشر (hover states) أو التنقّل المتوقّع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserListItem</span>(<span class="hljs-params">{ user }: { user: { id: <span class="hljs-built_in">string</span>; name: <span class="hljs-built_in">string</span> } }</span>) {
  <span class="hljs-keyword">const</span> utils = trpc.<span class="hljs-title function_">useUtils</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">prefetchUserDetails</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// Prefetch user details on hover</span>
    utils.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">prefetch</span>({ <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span> });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{prefetchUserDetails}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-item&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>\`/<span class="hljs-attr">users</span>/\${<span class="hljs-attr">user.id</span>}\`}&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وللتصيير على الخادم (server-side rendering) أو التوليد الساكن (static generation)، يمكنك جلب الاستعلامات مسبقًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In Next.js, prefetch during SSG/SSR</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getStaticProps</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> ssg = <span class="hljs-title function_">createProxySSGHelpers</span>({
    <span class="hljs-attr">router</span>: appRouter,
    <span class="hljs-attr">ctx</span>: {},
  });

  <span class="hljs-keyword">await</span> ssg.<span class="hljs-property">getUsers</span>.<span class="hljs-title function_">prefetch</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">trpcState</span>: ssg.<span class="hljs-title function_">dehydrate</span>(),
    },
  };
}
</code></pre>
<h2 id="استراتيجيات-معالجة-الأخطاء">استراتيجيات معالجة الأخطاء</h2>
<p>يتكامل tRPC مع معالجة الأخطاء في React Query، لكن يمكنك تخصيص سلوك الأخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Global error handling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [queryClient] = <span class="hljs-title function_">useState</span>(
    <span class="hljs-function">() =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryClient</span>({
        <span class="hljs-attr">defaultOptions</span>: {
          <span class="hljs-attr">queries</span>: {
            <span class="hljs-attr">retry</span>: <span class="hljs-function">(<span class="hljs-params">failureCount, error</span>) =&gt;</span> {
              <span class="hljs-comment">// Don&#x27;t retry 4xx errors, but retry 5xx</span>
              <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">TRPCError</span> &amp;&amp; error.<span class="hljs-property">data</span>?.<span class="hljs-property">httpStatus</span> &lt; <span class="hljs-number">500</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
              }
              <span class="hljs-keyword">return</span> failureCount &lt; <span class="hljs-number">3</span>;
            },
            <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
              <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Query error:&#x27;</span>, error);
              <span class="hljs-comment">// Could show toast notification here</span>
            },
          },
          <span class="hljs-attr">mutations</span>: {
            <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
              <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Mutation error:&#x27;</span>, error);
              <span class="hljs-comment">// Handle mutation errors globally</span>
            },
          },
        },
      }),
  );

  <span class="hljs-comment">// ... rest of setup</span>
}
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// Component-level error handling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> {
    <span class="hljs-attr">data</span>: user,
    error,
    isError,
    refetch,
  } = trpc.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>(
    { <span class="hljs-attr">id</span>: userId },
    {
      <span class="hljs-attr">retry</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// Override global retry for this query</span>
      <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (error.<span class="hljs-property">data</span>?.<span class="hljs-property">code</span> === <span class="hljs-string">&#x27;NOT_FOUND&#x27;</span>) {
          <span class="hljs-comment">// Handle user not found specifically</span>
          <span class="hljs-title function_">navigate</span>(<span class="hljs-string">&#x27;/users&#x27;</span>);
        }
      },
    },
  );

  <span class="hljs-keyword">if</span> (isError) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-state&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Something went wrong<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> refetch()}&gt;Try Again<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-comment">// ... rest of component</span>
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="تجميع-الاستعلامات">تجميع الاستعلامات</h3>
<p>يجمع tRPC تلقائيًا عدة استعلامات أُنشئت في نبضة زمنية واحدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// These will be batched into a single request</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: user } = trpc.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span> });
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: posts } = trpc.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;1&#x27;</span> });
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: notifications } = trpc.<span class="hljs-property">getNotifications</span>.<span class="hljs-title function_">useQuery</span>();

  <span class="hljs-comment">// All three queries sent in one HTTP request!</span>
}
</code></pre>
<h3 id="الإبطال-الانتقائي">الإبطال الانتقائي</h3>
<p>كن دقيقًا في إبطال الذاكرة المؤقتة لتتجنّب إعادة الجلب غير الضرورية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> createPost = trpc.<span class="hljs-property">createPost</span>.<span class="hljs-title function_">useMutation</span>({
  <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">(<span class="hljs-params">newPost</span>) =&gt;</span> {
    <span class="hljs-comment">// ✅ Good: Only invalidate queries that actually changed</span>
    utils.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">invalidate</span>({ <span class="hljs-attr">userId</span>: newPost.<span class="hljs-property">authorId</span> });

    <span class="hljs-comment">// ❌ Avoid: Don&#x27;t invalidate everything</span>
    <span class="hljs-comment">// utils.invalidate();</span>
  },
});
</code></pre>
<h3 id="أنماط-الاشتراك">أنماط الاشتراك</h3>
<p>للميزات الفورية (real-time)، يدعم tRPC الاشتراكات (subscriptions)، وإن كان ذلك يتطلب إعداد WebSocket:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> appRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">onPostAdded</span>: publicProcedure.<span class="hljs-title function_">subscription</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> observable&lt;<span class="hljs-title class_">Post</span>&gt;(<span class="hljs-function">(<span class="hljs-params">emit</span>) =&gt;</span> {
      <span class="hljs-comment">// Set up WebSocket or SSE listener</span>
      <span class="hljs-keyword">const</span> unsubscribe = <span class="hljs-title function_">onNewPost</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> {
        emit.<span class="hljs-title function_">next</span>(post);
      });

      <span class="hljs-keyword">return</span> unsubscribe;
    });
  }),
});
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// Client</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PostFeed</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: posts } = trpc.<span class="hljs-property">getPosts</span>.<span class="hljs-title function_">useQuery</span>();

  <span class="hljs-comment">// Subscribe to new posts</span>
  trpc.<span class="hljs-property">onPostAdded</span>.<span class="hljs-title function_">useSubscription</span>(<span class="hljs-literal">undefined</span>, {
    <span class="hljs-attr">onData</span>: <span class="hljs-function">(<span class="hljs-params">newPost</span>) =&gt;</span> {
      utils.<span class="hljs-property">getPosts</span>.<span class="hljs-title function_">setData</span>(<span class="hljs-literal">undefined</span>, <span class="hljs-function">(<span class="hljs-params">oldPosts = []</span>) =&gt;</span> [newPost, ...oldPosts]);
    },
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {posts?.map((post) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">PostCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">post</span>=<span class="hljs-string">{post}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-البنية-المعمارية-في-العالم-الحقيقي">أنماط البنية المعمارية في العالم الحقيقي</h2>
<h3 id="تنظيم-الاستعلامات">تنظيم الاستعلامات</h3>
<p>مع نمو تطبيقك، نظّم الاستعلامات ترتيبًا منطقيًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// routers/users.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> usersRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">getUser</span>: publicProcedure.<span class="hljs-title function_">input</span>(z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>() })).<span class="hljs-title function_">query</span>(<span class="hljs-comment">/* ... */</span>),

  <span class="hljs-attr">getUserPosts</span>: publicProcedure.<span class="hljs-title function_">input</span>(z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">userId</span>: z.<span class="hljs-title function_">string</span>() })).<span class="hljs-title function_">query</span>(<span class="hljs-comment">/* ... */</span>),

  <span class="hljs-attr">updateUser</span>: publicProcedure.<span class="hljs-title function_">input</span>(<span class="hljs-title class_">UserUpdateSchema</span>).<span class="hljs-title function_">mutation</span>(<span class="hljs-comment">/* ... */</span>),
});

<span class="hljs-comment">// routers/posts.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> postsRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">getPosts</span>: publicProcedure.<span class="hljs-title function_">query</span>(<span class="hljs-comment">/* ... */</span>),
  <span class="hljs-attr">createPost</span>: publicProcedure.<span class="hljs-title function_">mutation</span>(<span class="hljs-comment">/* ... */</span>),
});

<span class="hljs-comment">// Main router</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> appRouter = <span class="hljs-title function_">router</span>({
  <span class="hljs-attr">users</span>: usersRouter,
  <span class="hljs-attr">posts</span>: postsRouter,
});
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// Usage with nested routers</span>
<span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: user } = trpc.<span class="hljs-property">users</span>.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span> });
<span class="hljs-keyword">const</span> createPost = trpc.<span class="hljs-property">posts</span>.<span class="hljs-property">createPost</span>.<span class="hljs-title function_">useMutation</span>();
</code></pre>
<h3 id="خطافات-مخصصة-لمنطق-العمل">خُطّافات مخصّصة لمنطق العمل</h3>
<p>غلّف أنماط الاستعلامات المعقّدة في خُطّافات مخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useUserWithPosts</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> userQuery = trpc.<span class="hljs-property">users</span>.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">id</span>: userId });
  <span class="hljs-keyword">const</span> postsQuery = trpc.<span class="hljs-property">users</span>.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">useQuery</span>({ userId }, { <span class="hljs-attr">enabled</span>: !!userQuery.<span class="hljs-property">data</span> });

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">user</span>: userQuery.<span class="hljs-property">data</span>,
    <span class="hljs-attr">posts</span>: postsQuery.<span class="hljs-property">data</span>,
    <span class="hljs-attr">isLoading</span>: userQuery.<span class="hljs-property">isLoading</span> || postsQuery.<span class="hljs-property">isLoading</span>,
    <span class="hljs-attr">error</span>: userQuery.<span class="hljs-property">error</span> || postsQuery.<span class="hljs-property">error</span>,
    <span class="hljs-attr">refetch</span>: <span class="hljs-function">() =&gt;</span> {
      userQuery.<span class="hljs-title function_">refetch</span>();
      postsQuery.<span class="hljs-title function_">refetch</span>();
    },
  };
}
</code></pre>
<h2 id="الأخطاء-الشائعة-والحلول">الأخطاء الشائعة والحلول</h2>
<h3 id="الالتباس-في-مفاتيح-الذاكرة-المؤقتة">الالتباس في مفاتيح الذاكرة المؤقتة</h3>
<p>تذكّر أن tRPC يولّد مفاتيح الذاكرة المؤقتة بناءً على أسماء الإجراءات (procedure names) ومدخلاتها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ These create separate cache entries</span>
trpc.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span> });
trpc.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">useQuery</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">includeProfile</span>: <span class="hljs-literal">true</span> });

<span class="hljs-comment">// ✅ Use consistent input shapes</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserQueryInput</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">includeProfile</span>: z.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">default</span>(<span class="hljs-literal">false</span>),
});
</code></pre>
<h3 id="الإبطال-المفرط">الإبطال المفرط</h3>
<p>تجنّب الإبطال الواسع جدًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> updateUser = trpc.<span class="hljs-property">updateUser</span>.<span class="hljs-title function_">useMutation</span>({
  <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// ❌ Bad: Invalidates all queries</span>
    utils.<span class="hljs-title function_">invalidate</span>();

    <span class="hljs-comment">// ✅ Good: Surgical invalidation</span>
    utils.<span class="hljs-property">users</span>.<span class="hljs-property">getUser</span>.<span class="hljs-title function_">invalidate</span>({ <span class="hljs-attr">id</span>: userId });
    utils.<span class="hljs-property">users</span>.<span class="hljs-property">getUserPosts</span>.<span class="hljs-title function_">invalidate</span>({ userId });
  },
});
</code></pre>
<h3 id="تسرب-الذاكرة-مع-الاشتراكات">تسرّب الذاكرة مع الاشتراكات</h3>
<p>نظّف الاشتراكات دائمًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useRealtimeData</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> subscription = trpc.<span class="hljs-property">onUserUpdate</span>.<span class="hljs-title function_">useSubscription</span>(
      { userId },
      {
        <span class="hljs-attr">onData</span>: <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
          <span class="hljs-comment">// Handle update</span>
        },
      },
    );

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      subscription?.<span class="hljs-title function_">unsubscribe</span>();
    };
  }, [userId]);
}
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>يولّد المزيج بين tRPC و React Query تجربة تطوير مذهلة وإنتاجية إلى حد بعيد — تحصل على أمان نوعي من الطرف إلى الطرف، وتخزينًا مؤقتًا ذكيًا، وكل أنماط إدارة الحالة غير المتزامنة التي تحتاجها. وحين تتقن الأساسيات، فكّر في استكشاف:</p>
<ul>
<li><strong>أنماط المصادقة</strong> مع وسيط tRPC (tRPC middleware) للإجراءات المحميّة</li>
<li><strong>رفع الملفات</strong> ومعالجة البيانات غير بصيغة JSON عبر tRPC</li>
<li><strong>مراقبة الأخطاء</strong> لتتبّع فشل الاستعلامات في بيئة الإنتاج</li>
<li><strong>أنماط ذاكرة مؤقتة متقدّمة</strong> مثل تسخين الذاكرة المؤقتة (cache warming) والتحديثات الخلفية</li>
<li><strong>استراتيجيات الاختبار</strong> للمكوّنات التي تستخدم استعلامات tRPC</li>
</ul>
<p>الفكرة المحورية هي أن جلب البيانات الآمن نوعيًا في العصر الحديث ليس مجرد منع للأخطاء (وإن كان يفعل ذلك بامتياز) — بل هو صنع تجربة تطوير تفهم فيها أدواتك تدفّق بياناتك، فتتمكن من بناء الميزات أسرع وبثقة أكبر.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
