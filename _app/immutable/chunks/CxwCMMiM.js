const s="hono",a="concepts",n="المفاهيم",l="stacks",p="Hono Stacks",t=[{depth:2,id:"rpc",text:"RPC"},{depth:2,id:"كتابة-api",text:"كتابة API"},{depth:2,id:"التحقق-باستخدام-zod",text:"التحقق باستخدام Zod"},{depth:2,id:"مشاركة-الأنواع",text:"مشاركة الأنواع"},{depth:2,id:"العميل",text:"العميل"},{depth:2,id:"مع-react",text:"مع React"}],c=`<p>يجعل Hono الأمور السهلة سهلة والصعبة سهلة.
إنه مناسب ليس فقط لإرجاع JSON، بل إنه رائع أيضًا لبناء تطبيق كامل المكدس (full-stack) بما في ذلك خوادم REST API والعميل.</p>
<h2 id="rpc">RPC</h2>
<p>تتيح لك ميزة RPC في Hono مشاركة مواصفات API مع تغيير بسيط في الكود الخاص بك.
العميل الناتج عن <code>hc</code> سيقرأ المواصفة (spec) ويصل إلى نقطة النهاية بأمان الأنواع (type-safety).</p>
<p>المكتبات التالية تجعل ذلك ممكنًا.</p>
<ul>
<li>Hono - خادم API</li>
<li><a href="https://zod.dev"><code>Zod</code></a> - المدقق</li>
<li><a href="https://github.com/honojs/middleware/tree/main/packages/zod-validator">وسيط التحقق Zod</a></li>
<li><code>hc</code> - عميل <code>HTTP</code></li>
</ul>
<p>يمكننا تسمية مجموعة هذه المكوّنات بـ <strong>Hono Stack</strong>.
الآن لننشئ خادم API وعميلًا باستخدامه.</p>
<h2 id="كتابة-api">كتابة API</h2>
<p>أولًا، اكتب نقطة نهاية (endpoint) تستقبل طلب GET وتُعيد JSON.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">\`Hello!\`</span>,
  })
})
</code></pre>
<h2 id="التحقق-باستخدام-zod">التحقق باستخدام Zod</h2>
<p>تحقّق باستخدام Zod لتلقّي قيمة معامل الاستعلام (query parameter).</p>
<p><img src="/arabic-cs-library/images/hono/sc01.gif" alt=""></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { zValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/zod-validator&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/hello&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { name } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;query&#x27;</span>)
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">message</span>: <span class="hljs-string">\`Hello! <span class="hljs-subst">\${name}</span>\`</span>,
    })
  }
)
</code></pre>
<h2 id="مشاركة-الأنواع">مشاركة الأنواع</h2>
<p>لإصدار مواصفة نقطة النهاية، صدّر نوعها.</p>
<p>لكي يستنتج RPC المسارات بشكل صحيح، يجب أن تكون جميع الطرق المضمنة متسلسلة (chained)، ويجب استنتاج نوع نقطة النهاية أو التطبيق من متغير معلن. لمزيد من التفاصيل، راجع <a href="https://hono.dev/docs/guides/best-practices#if-you-want-to-use-rpc-features">أفضل الممارسات لـ RPC</a>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/hello&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { name } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;query&#x27;</span>)
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">message</span>: <span class="hljs-string">\`Hello! <span class="hljs-subst">\${name}</span>\`</span>,
    })
  }
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> route
</code></pre>
</div>
<h2 id="العميل">العميل</h2>
<p>التالي، التنفيذ من جانب العميل.
أنشئ كائن عميل بتمرير <code>AppType</code> اكتب إلى <code>hc</code> كأنواع عامة.
بعد ذلك، وبشكل سحري، يعمل الإكمال التلقائي ويتم اقتراح مسار نقطة النهاية (endpoint) ونوع الطلب.</p>
<p><img src="/arabic-cs-library/images/hono/sc03.gif" alt=""></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./server&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;/api&#x27;</span>)
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">hello</span>.$get({
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Hono&#x27;</span>,
  },
})
</code></pre>
<p>الـ <code>Response</code> متوافق مع واجهة fetch (fetch API)، لكن البيانات التي يمكن استرجاعها باستخدام <code>json()</code> له نوع.</p>
<p><img src="/arabic-cs-library/images/hono/sc04.gif" alt=""></p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${data.message}</span>\`</span>)
</code></pre>
<p>مشاركة مواصفات API تعني أنك تستطيع الاطلاع على التغييرات من جانب الخادم.</p>
<p><img src="/arabic-cs-library/images/hono/ss03.png" alt=""></p>
<h2 id="مع-react">مع React</h2>
<p>يمكنك إنشاء تطبيقات على Cloudflare Workers باستخدام React.</p>
<p>خادم API.</p>
<pre><code class="language-ts"><span class="hljs-comment">// src/index.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> z <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>
<span class="hljs-keyword">import</span> { zValidator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/zod-validator&#x27;</span>

<span class="hljs-keyword">const</span> schema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>(),
})

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Todo</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> schema&gt;

<span class="hljs-keyword">const</span> <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[] = []

<span class="hljs-keyword">const</span> api = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/todo&#x27;</span>, <span class="hljs-title function_">zValidator</span>(<span class="hljs-string">&#x27;form&#x27;</span>, schema), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> todo = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;form&#x27;</span>)
    todos.<span class="hljs-title function_">push</span>(todo)
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;created!&#x27;</span>,
    })
  })
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/todo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
      todos,
    })
  })

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> api

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, api)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>العميل مع React وReact Query.</p>
<pre><code class="language-tsx"><span class="hljs-comment">// src/App.tsx</span>
<span class="hljs-keyword">import</span> {
  useQuery,
  useMutation,
  <span class="hljs-title class_">QueryClient</span>,
  <span class="hljs-title class_">QueryClientProvider</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../functions/api/[[route]]&#x27;</span>
<span class="hljs-keyword">import</span> { hc, <span class="hljs-title class_">InferResponseType</span>, <span class="hljs-title class_">InferRequestType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> queryClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryClient</span>()
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;/api&#x27;</span>)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">QueryClientProvider</span> <span class="hljs-attr">client</span>=<span class="hljs-string">{queryClient}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Todos</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">QueryClientProvider</span>&gt;</span></span>
  )
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Todos</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> query = <span class="hljs-title function_">useQuery</span>({
    <span class="hljs-attr">queryKey</span>: [<span class="hljs-string">&#x27;todos&#x27;</span>],
    <span class="hljs-attr">queryFn</span>: <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">todo</span>.$get()
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
    },
  })

  <span class="hljs-keyword">const</span> $post = client.<span class="hljs-property">todo</span>.<span class="hljs-property">$post</span>

  <span class="hljs-keyword">const</span> mutation = useMutation&lt;
    <span class="hljs-title class_">InferResponseType</span>&lt;<span class="hljs-keyword">typeof</span> $post&gt;,
    <span class="hljs-title class_">Error</span>,
    <span class="hljs-title class_">InferRequestType</span>&lt;<span class="hljs-keyword">typeof</span> $post&gt;[<span class="hljs-string">&#x27;form&#x27;</span>]
  &gt;({
    <span class="hljs-attr">mutationFn</span>: <span class="hljs-title function_">async</span> (todo) =&gt; {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> $post({
        <span class="hljs-attr">form</span>: todo,
      })
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
    },
    <span class="hljs-attr">onSuccess</span>: <span class="hljs-title function_">async</span> () =&gt; {
      queryClient.<span class="hljs-title function_">invalidateQueries</span>({ <span class="hljs-attr">queryKey</span>: [<span class="hljs-string">&#x27;todos&#x27;</span>] })
    },
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(error)
    },
  })

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
          mutation.mutate({
            id: Date.now().toString(),
            title: &#x27;Write code&#x27;,
          })
        }}
      &gt;
        Add Todo
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {query.data?.todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
