const s="hono",a="guides",n="الأدلة",c="rpc",p="`RPC`",l=[{depth:2,id:"الخادم",text:"الخادم"},{depth:2,id:"العميل",text:"العميل"},{depth:3,id:"ملفات-تعريف-الارتباط",text:"ملفات تعريف الارتباط"},{depth:2,id:"رمز-الحالة",text:"رمز الحالة"},{depth:2,id:"استجابة-عامة",text:"استجابة عامة"},{depth:2,id:"غير-موجود",text:"غير موجود"},{depth:2,id:"معاملات-المسار",text:"معاملات المسار"},{depth:3,id:"معاملات-متعددة",text:"معاملات متعددة"},{depth:3,id:"تضمين-الشرطات-المائلة",text:"تضمين الشرطات المائلة"},{depth:2,id:"الترويسات",text:"الترويسات"},{depth:2,id:"init-خيار",text:"init خيار"},{depth:2,id:"url",text:"$url()"},{depth:3,id:"عنوان-url-منمط",text:"عنوان URL مُنمّط"},{depth:2,id:"path",text:"$path()"},{depth:2,id:"رفع-الملفات",text:"رفع الملفات"},{depth:2,id:"مخصص-fetch-الطريقة",text:"مخصص fetch الطريقة"},{depth:2,id:"مسلسل-استعلام-مخصص",text:"مُسلسل استعلام مخصص"},{depth:2,id:"infer",text:"Infer"},{depth:2,id:"تحليل-استجابة-باستخدام-مساعد-ضمان-الأنواع",text:"تحليل استجابة باستخدام مساعد ضمان الأنواع"},{depth:2,id:"استخدام-swr",text:"استخدام SWR"},{depth:2,id:"استخدام-rpc-مع-تطبيقات-أكبر",text:"استخدام RPC مع تطبيقات أكبر"},{depth:2,id:"المشكلات-المعروفة",text:"المشكلات المعروفة"},{depth:3,id:"أداء-ide",text:"أداء IDE"},{depth:3,id:"المعالجات-التي-ترجع-سلسلة-وعود",text:"المعالجات التي تُرجع سلسلة وعود"}],t=`<p>تتيح ميزة RPC مشاركة مواصفات API بين الخادم والعميل.</p>
<p>أولاً، صدِّر <code>typeof</code> تطبيق Hono الخاص بك (يُسمى عادةً <code>AppType</code>)—أو فقط المسارات التي تريد إتاحتها للعميل—من كود الخادم الخاص بك.</p>
<p>بقبول <code>AppType</code> كمعامل عام (generic parameter)، يمكن لعميل Hono (Hono Client) استنتاج كل من نوع (أنواع) الإدخال المحددة بواسطة أداة التحقق (Validator) ونوع (أنواع) الإخراج الصادرة عن معالجات تُرجع <code>c.json()</code>.</p>
<blockquote>
<p>[!NOTE]
لكي تعمل أنواع RPC بشكل صحيح في مستودع متعدد الحزم (monorepo)، في ملفي tsconfig.json لكل من العميل والخادم، اضبط <code>&quot;strict&quot;: true</code> في <code>compilerOptions</code>. <a href="https://github.com/honojs/hono/issues/2270#issuecomment-2143745118">اقرأ المزيد.</a></p>
</blockquote>
<h2 id="الخادم">الخادم</h2>
<p>كل ما عليك فعله على جانب الخادم هو كتابة مدقق (validator) وإنشاء متغير <code>route</code>. المثال التالي يستخدم <a href="https://github.com/honojs/middleware/tree/main/packages/zod-validator">مدقّق <code>Zod</code></a>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;form&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>(),
      <span class="hljs-attr">body</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(
      {
        <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created!&#x27;</span>,
      },
      <span class="hljs-number">201</span>
    )
  }
)
</code></pre>
</div>
<blockquote>
<p>[!TIP]
ال <a href="https://github.com/honojs/middleware/tree/main/packages/standard-validator">مدقّق Standard Schema</a> يعمل أيضًا، لذا يمكنك استخدام أي مكتبة مخطط قياسي (Standard Schema) مثل Valibot.</p>
</blockquote>
<p>ثم، صدِّر النوع (type) لمشاركة مواصفة API مع العميل.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> route
</code></pre>
<h2 id="العميل">العميل</h2>
<p>على جانب العميل (Client)، استورد <code>hc</code> و <code>AppType</code> أولاً.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;.&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>
</code></pre>
<p><code>hc</code> دالة لإنشاء عميل. مرّر <code>AppType</code> كأنواع عامة (Generics) وحدِّد عنوان URL للخادم كوسيط.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)
</code></pre>
<p>استدعِ <code>client.{path}.{method}</code> ومرر البيانات التي ترغب في إرسالها إلى الخادم كوسيطة (argument).</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>.$post({
  <span class="hljs-attr">form</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Hello&#x27;</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Hono is a cool project&#x27;</span>,
  },
})
</code></pre>
<p>الـ <code>res</code> متوافق مع استجابة &quot;fetch&quot;. يمكنك استرداد البيانات من الخادم باستخدام <code>res.json()</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">if</span> (res.<span class="hljs-property">ok</span>) {
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data.<span class="hljs-property">message</span>)
}
</code></pre>
<h3 id="ملفات-تعريف-الارتباط">ملفات تعريف الارتباط</h3>
<p>لجعل العميل يرسل ملفات تعريف الارتباط (cookies) مع كل طلب، أضِف <code>{ 'init': { 'credentials&quot;: 'include' } }</code> إلى الخيارات عند إنشاء العميل.</p>
<pre><code class="language-ts"><span class="hljs-comment">// client.ts</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>, {
  <span class="hljs-attr">init</span>: {
    <span class="hljs-attr">credentials</span>: <span class="hljs-string">&#x27;include&#x27;</span>,
  },
})

<span class="hljs-comment">// This request will now include any cookies you might have set</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>.$get({
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  },
})
</code></pre>
<h2 id="رمز-الحالة">رمز الحالة</h2>
<p>إذا حدّدت رمز الحالة صراحةً، مثل <code>200</code> أو <code>404</code>، في <code>c.json()</code>، فسيُضاف كنوع لتمريره إلى العميل.</p>
<pre><code class="language-ts"><span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-keyword">const</span> { id } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;query&#x27;</span>)
    <span class="hljs-keyword">const</span> <span class="hljs-attr">post</span>: <span class="hljs-title class_">Post</span> | <span class="hljs-literal">undefined</span> = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(id)

    <span class="hljs-keyword">if</span> (post === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;not found&#x27;</span> }, <span class="hljs-number">404</span>) <span class="hljs-comment">// Specify 404</span>
    }

    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ post }, <span class="hljs-number">200</span>) <span class="hljs-comment">// Specify 200</span>
  }
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> app
</code></pre>
<p>يمكنك الحصول على البيانات عبر رمز الحالة.</p>
<pre><code class="language-ts"><span class="hljs-comment">// client.ts</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>.$get({
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  },
})

<span class="hljs-keyword">if</span> (res.<span class="hljs-property">status</span> === <span class="hljs-number">404</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: { <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> } = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data.<span class="hljs-property">error</span>)
}

<span class="hljs-keyword">if</span> (res.<span class="hljs-property">ok</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: { <span class="hljs-attr">post</span>: <span class="hljs-title class_">Post</span> } = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data.<span class="hljs-property">post</span>)
}

<span class="hljs-comment">// { post: Post } | { error: string }</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ResponseType</span> = <span class="hljs-title class_">InferResponseType</span>&lt;<span class="hljs-keyword">typeof</span> client.<span class="hljs-property">posts</span>.<span class="hljs-property">$get</span>&gt;

<span class="hljs-comment">// { post: Post }</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ResponseType200</span> = <span class="hljs-title class_">InferResponseType</span>&lt;
  <span class="hljs-keyword">typeof</span> client.<span class="hljs-property">posts</span>.<span class="hljs-property">$get</span>,
  <span class="hljs-number">200</span>
&gt;
</code></pre>
<h2 id="استجابة-عامة">استجابة عامة</h2>
<p>لا يستنتج عميل RPC الخاص بـ Hono أنواع الاستجابات تلقائيًا من معالجات الأخطاء العامة مثل <code>app.onError()</code> أو برمجية وسيطة عامة. يمكنك استخدام <code>ApplyGlobalResponse</code> أداة مساعدة للأنواع (type helper) لدمج أنواع استجابات الأخطاء العامة في جميع المسارات (routes).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ApplyGlobalResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">users</span>: [<span class="hljs-string">&#x27;alice&#x27;</span>, <span class="hljs-string">&#x27;bob&#x27;</span>] }, <span class="hljs-number">200</span>))
  .<span class="hljs-title function_">onError</span>(<span class="hljs-function">(<span class="hljs-params">err, c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: err.<span class="hljs-property">message</span> }, <span class="hljs-number">500</span>))

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AppWithErrors</span> = <span class="hljs-title class_">ApplyGlobalResponse</span>&lt;
  <span class="hljs-keyword">typeof</span> app,
  {
    <span class="hljs-number">500</span>: { <span class="hljs-attr">json</span>: { <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> } }
  }
&gt;

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppWithErrors</span>&gt;(<span class="hljs-string">&#x27;http://localhost&#x27;</span>)
</code></pre>
<p>الآن يعرف العميل كلاً من استجابات النجاح والخطأ:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">api</span>.<span class="hljs-property">users</span>.$get()

<span class="hljs-keyword">if</span> (res.<span class="hljs-property">ok</span>) {
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>() <span class="hljs-comment">// { users: string[] }</span>
}

<span class="hljs-comment">// InferResponseType includes the global error type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ResType</span> = <span class="hljs-title class_">InferResponseType</span>&lt;<span class="hljs-keyword">typeof</span> client.<span class="hljs-property">api</span>.<span class="hljs-property">users</span>.<span class="hljs-property">$get</span>&gt;
<span class="hljs-comment">// { users: string[] } | { error: string }</span>
</code></pre>
<p>يمكنك أيضًا تعريف عدة رموز حالة خطأ عامة (global error status codes) دفعة واحدة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">AppWithErrors</span> = <span class="hljs-title class_">ApplyGlobalResponse</span>&lt;
  <span class="hljs-keyword">typeof</span> app,
  {
    <span class="hljs-number">401</span>: { <span class="hljs-attr">json</span>: { <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> } }
    <span class="hljs-number">500</span>: { <span class="hljs-attr">json</span>: { <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> } }
  }
&gt;
</code></pre>
<h2 id="غير-موجود">غير موجود</h2>
<p>إذا أردت استخدام عميل، فلا ينبغي أن تستخدم <code>c.notFound()</code> لاستجابة &quot;غير موجود&quot; (Not Found). لا يمكن استنتاج البيانات التي يحصل عليها العميل من الخادم بشكل صحيح.</p>
<pre><code class="language-ts"><span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> routes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-keyword">const</span> { id } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;query&#x27;</span>)
    <span class="hljs-keyword">const</span> <span class="hljs-attr">post</span>: <span class="hljs-title class_">Post</span> | <span class="hljs-literal">undefined</span> = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(id)

    <span class="hljs-keyword">if</span> (post === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">notFound</span>() <span class="hljs-comment">// ❌️</span>
    }

    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ post })
  }
)

<span class="hljs-comment">// client.ts</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> routes&gt;(<span class="hljs-string">&#x27;/&#x27;</span>)

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>[<span class="hljs-string">&#x27;:id&#x27;</span>].$get({
  <span class="hljs-attr">param</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  },
})

<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>() <span class="hljs-comment">// 🙁 data is unknown</span>
</code></pre>
<p>يُرجى استخدام <code>c.json()</code> وحدِّد رمز الحالة (status code) لاستجابة Not Found.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> routes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-keyword">const</span> { id } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;query&#x27;</span>)
    <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(id)

    <span class="hljs-keyword">if</span> (!post) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;not found&#x27;</span> }, <span class="hljs-number">404</span>) <span class="hljs-comment">// Specify 404</span>
    }

    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ post }, <span class="hljs-number">200</span>) <span class="hljs-comment">// Specify 200</span>
  }
)
</code></pre>
<p>بدلاً من ذلك، يمكنك استخدام توسيع الوحدة (module augmentation) لتوسيع <code>NotFoundResponse</code> الواجهة. هذا يسمح <code>c.notFound()</code> لإرجاع استجابة مُنمّطة (typed):</p>
<pre><code class="language-ts"><span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span>, <span class="hljs-title class_">TypedResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">NotFoundResponse</span>
    <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Response</span>,
      <span class="hljs-title class_">TypedResponse</span>&lt;{ <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> }, <span class="hljs-number">404</span>, <span class="hljs-string">&#x27;json&#x27;</span>&gt; {}
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts/:id&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>))
    <span class="hljs-keyword">if</span> (!post) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">notFound</span>()
    }
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ post }, <span class="hljs-number">200</span>)
  })
  .<span class="hljs-title function_">notFound</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;not found&#x27;</span> }, <span class="hljs-number">404</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> app
</code></pre>
<p>الآن يمكن للعميل استنتاج نوع استجابة 404 بشكل صحيح.</p>
<h2 id="معاملات-المسار">معاملات المسار</h2>
<p>يمكنك أيضًا التعامل مع المسارات التي تتضمن معاملات مسار (path parameters) أو قيم استعلام (query).</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/posts/:id&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">page</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">optional</span>(), <span class="hljs-comment">// coerce to convert to number</span>
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Night&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Time to sleep&#x27;</span>,
    })
  }
)
</code></pre>
<p>كلا معاملات المسار (path parameters) وقيم الاستعلام (query values) <strong>يجب</strong> تمريرهما كـ <code>string</code>، حتى إذا كانت القيمة الأساسية من نوع مختلف.</p>
<p>حدِّد النص الذي تريد تضمينه في المسار باستخدام <code>param</code>، وأي قيم استعلام باستخدام <code>query</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>[<span class="hljs-string">&#x27;:id&#x27;</span>].$get({
  <span class="hljs-attr">param</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  },
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">page</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-comment">// \`string\`, converted by the validator to \`number\`</span>
  },
})
</code></pre>
<h3 id="معاملات-متعددة">معاملات متعددة</h3>
<p>تعامل مع المسارات ذات معاملات متعددة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/posts/:postId/:authorId&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;query&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">page</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Night&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Time to sleep&#x27;</span>,
    })
  }
)
</code></pre>
<p>إضافة عدة <code>['']</code> لتحديد المعاملات (params) في المسار.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>[<span class="hljs-string">&#x27;:postId&#x27;</span>][<span class="hljs-string">&#x27;:authorId&#x27;</span>].$get({
  <span class="hljs-attr">param</span>: {
    <span class="hljs-attr">postId</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
    <span class="hljs-attr">authorId</span>: <span class="hljs-string">&#x27;456&#x27;</span>,
  },
  <span class="hljs-attr">query</span>: {},
})
</code></pre>
<h3 id="تضمين-الشرطات-المائلة">تضمين الشرطات المائلة</h3>
<p><code>hc</code> لا تُرمّز الدالة قيم ... بترميز URL <code>param</code>. لتضمين شرطات مائلة في المعاملات، استخدم <a href="https://hono.dev/docs/api/routing#regexp">التعابير النمطية (regular expressions)</a>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// client.ts</span>

<span class="hljs-comment">// Requests /posts/123/456</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>[<span class="hljs-string">&#x27;:id&#x27;</span>].$get({
  <span class="hljs-attr">param</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123/456&#x27;</span>,
  },
})

<span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/posts/:id{.+}&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;param&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
    })
  ),
  <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">// id: 123/456</span>
    <span class="hljs-keyword">const</span> { id } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;param&#x27;</span>)
    <span class="hljs-comment">// ...</span>
  }
)
</code></pre>
<blockquote>
<p>[!NOTE]
معاملات المسار الأساسية بدون تعبيرات نمطية (regular expressions) لا تطابق الشرط المائلة. إذا مررت <code>param</code> تحتوي على شرط مائلة باستخدام دالة hc، فقد لا يوجّه الخادم الطلب كما هو مقصود. إن ترميز المعاملات باستخدام <code>encodeURIComponent</code> هو الأسلوب الموصى به لضمان التوجيه الصحيح.</p>
</blockquote>
<h2 id="الترويسات">الترويسات</h2>
<p>يمكنك إلحاق الترويسات بالطلب.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">search</span>.$get(
  {
    <span class="hljs-comment">//...</span>
  },
  {
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;X-Custom-Header&#x27;</span>: <span class="hljs-string">&#x27;Here is Hono Client&#x27;</span>,
      <span class="hljs-string">&#x27;X-User-Agent&#x27;</span>: <span class="hljs-string">&#x27;hc&#x27;</span>,
    },
  }
)
</code></pre>
<p>لإضافة رأس (header) مشترك إلى جميع الطلبات، حدده كوسيطة لـ <code>hc</code> الدالة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;/api&#x27;</span>, {
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">&#x27;Bearer TOKEN&#x27;</span>,
  },
})
</code></pre>
<h2 id="init-خيار"><code>init</code> خيار</h2>
<p>يمكنك تمرير الخاصية الخاصة بـ <code>fetch</code> <code>RequestInit</code> الكائن إلى الطلب كـ <code>init</code> الخيار. أدناه مثال على إلغاء طلب (Request).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)

<span class="hljs-keyword">const</span> abortController = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AbortController</span>()
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>.$post(
  {
    <span class="hljs-attr">json</span>: {
      <span class="hljs-comment">// Request body</span>
    },
  },
  {
    <span class="hljs-comment">// RequestInit object</span>
    <span class="hljs-attr">init</span>: {
      <span class="hljs-attr">signal</span>: abortController.<span class="hljs-property">signal</span>,
    },
  }
)

<span class="hljs-comment">// ...</span>

abortController.<span class="hljs-title function_">abort</span>()
</code></pre>
<p>A <code>RequestInit</code> الكائن المُعرَّف بواسطة <code>init</code> يحظى بأعلى أولوية. يمكن استخدامه لتجاوز الأشياء المحددة بواسطة خيارات أخرى مثل <code>body | method | headers</code>.</p>
<h2 id="url"><code>$url()</code></h2>
<p>يمكنك الحصول على <code>URL</code> كائن للوصول إلى نقطة النهاية باستخدام <code>$url()</code>.</p>
<p>يجب تمرير عنوان URL مطلق (absolute) لكي يعمل هذا. تمرير عنوان URL نسبي <code>/</code> سينتج عنه الخطأ التالي.</p>
<p><code>Uncaught TypeError: Failed to construct 'URL': Invalid URL</code></p>
<pre><code class="language-ts"><span class="hljs-comment">// ❌ Will throw error</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;/&#x27;</span>)
client.<span class="hljs-property">api</span>.<span class="hljs-property">post</span>.$url()

<span class="hljs-comment">// ✅ Will work as expected</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)
client.<span class="hljs-property">api</span>.<span class="hljs-property">post</span>.$url()
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ posts }))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/posts/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ post }))

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> route&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)

<span class="hljs-keyword">let</span> url = client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>.$url()
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(url.<span class="hljs-property">pathname</span>) <span class="hljs-comment">// \`/api/posts\`</span>

url = client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>[<span class="hljs-string">&#x27;:id&#x27;</span>].$url({
  <span class="hljs-attr">param</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  },
})
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(url.<span class="hljs-property">pathname</span>) <span class="hljs-comment">// \`/api/posts/123\`</span>
</code></pre>
<h3 id="عنوان-url-منمط">عنوان URL مُنمّط</h3>
<p>يمكنك تمرير عنوان URL الأساسي (base URL) كمعامل النوع (type parameter) الثاني لـ <code>hc</code> للحصول على أنواع URL أكثر دقة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> route, <span class="hljs-string">&#x27;http://localhost:8787&#x27;</span>&gt;(
  <span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>
)

<span class="hljs-keyword">const</span> url = client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>.$url()
<span class="hljs-comment">// url is TypedURL with precise type information</span>
<span class="hljs-comment">// including protocol, host, and path</span>
</code></pre>
<p>هذا مفيد عندما تريد استخدام عنوان URL كمفتاح آمن من ناحية الأنواع (type-safe) للمكتبات مثل SWR.</p>
<h2 id="path"><code>$path()</code></h2>
<p><code>$path()</code> مشابه لـ <code>$url()</code>، لكنه يُعيد سلسلة مسار بدلًا من <code>URL</code> الكائن. على عكس <code>$url()</code>، ولا يتضمن أصل (origin) عنوان URL الأساسي، لذا فهو يعمل بغض النظر عن عنوان URL الأساسي الذي تمرره إلى <code>hc</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> route = app
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ posts }))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/posts/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ post }))

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> route&gt;(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)

<span class="hljs-keyword">let</span> path = client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>.$path()
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(path) <span class="hljs-comment">// \`/api/posts\`</span>

path = client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>[<span class="hljs-string">&#x27;:id&#x27;</span>].$path({
  <span class="hljs-attr">param</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  },
})
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(path) <span class="hljs-comment">// \`/api/posts/123\`</span>
</code></pre>
<p>يمكنك أيضًا تمرير معاملات الاستعلام (query parameters):</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> path = client.<span class="hljs-property">api</span>.<span class="hljs-property">posts</span>.$path({
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">page</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-string">&#x27;10&#x27;</span>,
  },
})
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(path) <span class="hljs-comment">// \`/api/posts?page=1&amp;limit=10\`</span>
</code></pre>
<h2 id="رفع-الملفات">رفع الملفات</h2>
<p>يمكنك رفع الملفات باستخدام جسم نموذج (form body):</p>
<pre><code class="language-ts"><span class="hljs-comment">// client</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">user</span>.<span class="hljs-property">picture</span>.$put({
  <span class="hljs-attr">form</span>: {
    <span class="hljs-attr">file</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">File</span>([fileToUpload], filename, {
      <span class="hljs-attr">type</span>: fileToUpload.<span class="hljs-property">type</span>,
    }),
  },
})
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// server</span>
<span class="hljs-keyword">const</span> route = app.<span class="hljs-title function_">put</span>(
  <span class="hljs-string">&#x27;/user/picture&#x27;</span>,
  <span class="hljs-title function_">zValidator</span>(
    <span class="hljs-string">&#x27;form&#x27;</span>,
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">file</span>: z.<span class="hljs-title function_">instanceof</span>(<span class="hljs-title class_">File</span>),
    })
  )
  <span class="hljs-comment">// ...</span>
)
</code></pre>
<h2 id="مخصص-fetch-الطريقة">مخصص <code>fetch</code> الطريقة</h2>
<p>يمكنك ضبط المخصص <code>fetch</code> الطريقة.</p>
<p>في سكربت المثال التالي لـ Cloudflare Worker، فإن روابط الخدمة (Service Bindings') <code>fetch</code> تُستخدم الطريقة بدلاً من الافتراضية <code>fetch</code>.</p>
<pre><code class="language-toml"><span class="hljs-comment"># wrangler.toml</span>
<span class="hljs-attr">services</span> = [
  { binding = <span class="hljs-string">&quot;AUTH&quot;</span>, service = <span class="hljs-string">&quot;auth-service&quot;</span> },
]
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// src/client.ts</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">CreateProfileType</span>&gt;(<span class="hljs-string">&#x27;http://localhost&#x27;</span>, {
  <span class="hljs-attr">fetch</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">AUTH</span>.<span class="hljs-property">fetch</span>.<span class="hljs-title function_">bind</span>(c.<span class="hljs-property">env</span>.<span class="hljs-property">AUTH</span>),
})
</code></pre>
<h2 id="مسلسل-استعلام-مخصص">مُسلسل استعلام مخصص</h2>
<p>يمكنك تخصيص طريقة تسلسل (serialize) معاملات الاستعلام (query parameters) باستخدام <code>buildSearchParams</code> خيار. هذا مفيد عندما تحتاج إلى تدوين الأقواس (bracket notation) للمصفوفات أو تنسيقات مخصصة أخرى:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost&#x27;</span>, {
  <span class="hljs-attr">buildSearchParams</span>: <span class="hljs-function">(<span class="hljs-params">query</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [k, v] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(query)) {
      <span class="hljs-keyword">if</span> (v === <span class="hljs-literal">undefined</span>) {
        <span class="hljs-keyword">continue</span>
      }
      <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(v)) {
        v.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> searchParams.<span class="hljs-title function_">append</span>(<span class="hljs-string">\`<span class="hljs-subst">\${k}</span>[]\`</span>, item))
      } <span class="hljs-keyword">else</span> {
        searchParams.<span class="hljs-title function_">set</span>(k, v)
      }
    }
    <span class="hljs-keyword">return</span> searchParams
  },
})
</code></pre>
<h2 id="infer">Infer</h2>
<p>استخدم <code>InferRequestType</code> و <code>InferResponseType</code> لمعرفة نوع الكائن المطلوب ونوع الكائن الذي سيتم إرجاعه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">InferRequestType</span>, <span class="hljs-title class_">InferResponseType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-comment">// InferRequestType</span>
<span class="hljs-keyword">const</span> $post = client.<span class="hljs-property">todo</span>.<span class="hljs-property">$post</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReqType</span> = <span class="hljs-title class_">InferRequestType</span>&lt;<span class="hljs-keyword">typeof</span> $post&gt;[<span class="hljs-string">&#x27;form&#x27;</span>]

<span class="hljs-comment">// InferResponseType</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ResType</span> = <span class="hljs-title class_">InferResponseType</span>&lt;<span class="hljs-keyword">typeof</span> $post&gt;
</code></pre>
<h2 id="تحليل-استجابة-باستخدام-مساعد-ضمان-الأنواع">تحليل استجابة باستخدام مساعد ضمان الأنواع</h2>
<p>يمكنك استخدام <code>parseResponse()</code> مساعد لتحليل Response بسهولة من <code>hc</code> مع أمان الأنواع.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { parseResponse, <span class="hljs-title class_">DetailedError</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-comment">// result contains the parsed response body (automatically parsed based on Content-Type)</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">parseResponse</span>(client.<span class="hljs-property">hello</span>.$get()).<span class="hljs-title function_">catch</span>(
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">DetailedError</span></span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(e)
  }
)
<span class="hljs-comment">// parseResponse automatically throws an error if response is not ok</span>
</code></pre>
<h2 id="استخدام-swr">استخدام SWR</h2>
<p>يمكنك أيضًا استخدام مكتبة React Hook مثل <a href="https://swr.vercel.app"><code>SWR</code></a>.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> useSWR <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;swr&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">InferRequestType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../functions/api/[[route]]&#x27;</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;/api&#x27;</span>)
  <span class="hljs-keyword">const</span> $get = client.<span class="hljs-property">hello</span>.<span class="hljs-property">$get</span>

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetcher</span> =
    (<span class="hljs-params"><span class="hljs-attr">arg</span>: <span class="hljs-title class_">InferRequestType</span>&lt;<span class="hljs-keyword">typeof</span> $get&gt;</span>) =&gt; <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> $get(arg)
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()
    }

  <span class="hljs-keyword">const</span> { data, error, isLoading } = <span class="hljs-title function_">useSWR</span>(
    <span class="hljs-string">&#x27;api-hello&#x27;</span>,
    <span class="hljs-title function_">fetcher</span>({
      <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;SWR&#x27;</span>,
      },
    })
  )

  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>failed to load<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{data?.message}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">App</span>
</code></pre>
<h2 id="استخدام-rpc-مع-تطبيقات-أكبر">استخدام RPC مع تطبيقات أكبر</h2>
<p>في حالة تطبيق أكبر، مثل المثال المذكور في <a href="https://hono.dev/docs/guides/best-practices#building-a-larger-application">بناء تطبيق أكبر</a>، عليك الحذر بشأن نوع الاستنتاج (inference).
طريقة بسيطة للقيام بذلك هي ربط المعالجات بحيث يتم دائمًا استنتاج الأنواع.</p>
<pre><code class="language-ts"><span class="hljs-comment">// authors.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;list authors&#x27;</span>))
  .<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;create an author&#x27;</span>, <span class="hljs-number">201</span>))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;id&#x27;</span>)}</span>\`</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// books.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;list books&#x27;</span>))
  .<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;create a book&#x27;</span>, <span class="hljs-number">201</span>))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;id&#x27;</span>)}</span>\`</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>يمكنك بعد ذلك استيراد الموجهات الفرعية (sub-routers) كما تفعل عادةً، وتأكد من تسلسل معالجاتها أيضًا، نظرًا لأن هذا هو المستوى الأعلى للتطبيق في هذه الحالة، فهذا هو النوع الذي سنريد تصديره.</p>
<pre><code class="language-ts"><span class="hljs-comment">// index.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> authors <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./authors&#x27;</span>
<span class="hljs-keyword">import</span> books <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./books&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> routes = app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/authors&#x27;</span>, authors).<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/books&#x27;</span>, books)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> routes
</code></pre>
<p>يمكنك الآن إنشاء عميل جديد باستخدام AppType المسجل واستخدامه كما تفعل عادةً.</p>
<h2 id="المشكلات-المعروفة">المشكلات المعروفة</h2>
<h3 id="أداء-ide">أداء IDE</h3>
<p>عند استخدام RPC، كلما زاد عدد المسارات لديك، أصبحت بيئة التطوير المتكاملة (IDE) خاصتك أبطأ. أحد الأسباب الرئيسية لذلك هو تنفيذ كميات هائلة من إنشاءات مثيلات الأنواع (type instantiations) لاستنتاج نوع تطبيقك.</p>
<p>على سبيل المثال، افترض أن تطبيقك يحتوي على مسار كهذا:</p>
<pre><code class="language-ts"><span class="hljs-comment">// app.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;foo/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span> }, <span class="hljs-number">200</span>)
)
</code></pre>
<p>سيستنتج Hono النوع على النحو التالي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> app = <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">BlankEnv</span>, <span class="hljs-title class_">BlankSchema</span>, <span class="hljs-string">&#x27;/&#x27;</span>&gt;().<span class="hljs-property">get</span>&lt;
  <span class="hljs-string">&#x27;foo/:id&#x27;</span>,
  <span class="hljs-string">&#x27;foo/:id&#x27;</span>,
  <span class="hljs-title class_">JSON</span>RespondReturn&lt;{ <span class="hljs-attr">ok</span>: <span class="hljs-built_in">boolean</span> }, <span class="hljs-number">200</span>&gt;,
  <span class="hljs-title class_">BlankInput</span>,
  <span class="hljs-title class_">BlankEnv</span>
&gt;(<span class="hljs-string">&#x27;foo/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span> }, <span class="hljs-number">200</span>))
</code></pre>
<p>هذا هو إنشاء مثيل نوع (type instantiation) لمسار واحد. بينما لا يحتاج المستخدم إلى كتابة وسائط الأنواع هذه يدويًا، وهو أمر جيد، فمن المعروف أن إنشاء مثيلات الأنواع يستغرق وقتًا طويلًا. <code>tsserver</code> المستخدم في بيئة التطوير المتكاملة (IDE) خاصتك يؤدي هذه المهمة المستهلكة للوقت في كل مرة تستخدم فيها التطبيق. إذا كان لديك الكثير من المسارات، فقد يؤدي هذا إلى إبطاء بيئة التطوير لديك بشكل ملحوظ.</p>
<p>ومع ذلك، لدينا بعض النصائح للتخفيف من هذه المشكلة.</p>
<h4>عدم تطابق إصدار Hono</h4>
<p>إذا كانت الواجهة الخلفية (backend) منفصلة عن الواجهة الأمامية (frontend) وتعيش في دليل مختلف، فأنت بحاجة إلى التأكد من تطابق إصدارات Hono. إذا استخدمت إصدار Hono على الواجهة الخلفية وإصدارًا آخر على الواجهة الأمامية، فستواجه مشكلات مثل &quot;<em>Type instantiation is excessively deep and possibly infinite</em>&quot;.</p>
<p><img src="/arabic-cs-library/images/hono/rpc-architecture.png" alt=""></p>
<h4>مراجع مشاريع TypeScript</h4>
<p>كما في حالة <a href="#hono-version-mismatch">عدم تطابق إصدار Hono</a>&quot;، ستواجه مشكلات إذا كانت الواجهة الخلفية (backend) والواجهة الأمامية (frontend) منفصلتين. إذا كنت تريد الوصول إلى الكود من الواجهة الخلفية (<code>AppType</code>، على سبيل المثال) في الواجهة الأمامية، تحتاج إلى استخدام <a href="https://www.typescriptlang.org/docs/handbook/project-references.html">مراجع المشروع</a>. تسمح مراجع المشاريع (project references) في TypeScript لقاعدة كود TypeScript واحدة بالوصول إلى كود من قاعدة كود TypeScript أخرى واستخدامه. <em>(المصدر: <a href="https://catalins.tech/hono-rpc-in-monorepos/">Hono RPC ومراجع مشروع TypeScript</a>)</em>.</p>
<h4>ترجم الكود قبل استخدامه (مُوصى به)</h4>
<p><code>tsc</code> يمكنه القيام بمهام ثقيلة مثل إنشاء الأنواع (type instantiation) في وقت الترجمة! ثم، <code>tsserver</code> لا تحتاج إلى إنشاء نسخ من جميع وسائط الأنواع في كل مرة تستخدمها. سيجعل ذلك بيئة التطوير (IDE) الخاصة بك أسرع بكثير!</p>
<p>تجميع عميلك بما في ذلك تطبيق الخادم يمنحك أفضل أداء. ضع الكود التالي في مشروعك:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { app } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./app&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-comment">// this is a trick to calculate the type when compiling</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> app&gt;(<span class="hljs-string">&#x27;&#x27;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Client</span> = <span class="hljs-keyword">typeof</span> client

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> hcWithType = (...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Parameters</span>&lt;<span class="hljs-keyword">typeof</span> hc&gt;): <span class="hljs-function"><span class="hljs-params">Client</span> =&gt;</span>
  hc&lt;<span class="hljs-keyword">typeof</span> app&gt;(...args)
</code></pre>
<p>بعد التصريف (compiling)، يمكنك استخدام <code>hcWithType</code> بدلاً من <code>hc</code> للحصول على العميل بالنوع المحسوب مسبقًا.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> client = <span class="hljs-title function_">hcWithType</span>(<span class="hljs-string">&#x27;http://localhost:8787/&#x27;</span>)
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">posts</span>.$post({
  <span class="hljs-attr">form</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Hello&#x27;</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Hono is a cool project&#x27;</span>,
  },
})
</code></pre>
<p>إذا كان مشروعك مستودعًا أحاديًا (monorepo)، فإن هذا الحل مناسب تمامًا. باستخدام أداة مثل <a href="https://turbo.build/repo/docs"><code>turborepo</code></a>، يمكنك بسهولة فصل مشروع الخادم عن مشروع العميل والحصول على تكامل أفضل في إدارة التبعيات بينهما. إليك <a href="https://github.com/m-shaka/hono-rpc-perf-tips-example">مثال عملي</a>.</p>
<p>يمكنك أيضًا تنسيق عملية البناء (build) يدويًا باستخدام أدوات مثل <code>concurrently</code> أو <code>npm-run-all</code>.</p>
<h4>تحديد وسائط النوع يدويًا</h4>
<p>هذا مرهق بعض الشيء، لكن يمكنك تحديد وسائط الأنواع يدويًا لتجنب إنشاء نسخ من الأنواع (type instantiation).</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-property">get</span>&lt;<span class="hljs-string">&#x27;foo/:id&#x27;</span>&gt;(<span class="hljs-string">&#x27;foo/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span> }, <span class="hljs-number">200</span>)
)
</code></pre>
<p>تحديد وسيطة نوع واحدة فقط يُحدث فرقًا في الأداء، بينما قد يستغرق منك الكثير من الوقت والجهد إذا كان لديك الكثير من المسارات.</p>
<h4>قسّم تطبيقك والعميل إلى ملفات متعددة</h4>
<p>كما هو موضح في <a href="#using-rpc-with-larger-applications">استخدام RPC مع التطبيقات الأكبر</a>، يمكنك تقسيم تطبيقك إلى تطبيقات متعددة. يمكنك أيضًا إنشاء عميل لكل تطبيق:</p>
<pre><code class="language-ts"><span class="hljs-comment">// authors-cli.ts</span>
<span class="hljs-keyword">import</span> { app <span class="hljs-keyword">as</span> authorsApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./authors&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> authorsClient = hc&lt;<span class="hljs-keyword">typeof</span> authorsApp&gt;(<span class="hljs-string">&#x27;/authors&#x27;</span>)

<span class="hljs-comment">// books-cli.ts</span>
<span class="hljs-keyword">import</span> { app <span class="hljs-keyword">as</span> booksApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./books&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-keyword">const</span> booksClient = hc&lt;<span class="hljs-keyword">typeof</span> booksApp&gt;(<span class="hljs-string">&#x27;/books&#x27;</span>)
</code></pre>
<p>بهذه الطريقة، <code>tsserver</code> لا يحتاج إلى إنشاء نسخ من الأنواع (types) لجميع المسارات دفعة واحدة.</p>
<h3 id="المعالجات-التي-ترجع-سلسلة-وعود">المعالجات التي تُرجع سلسلة وعود</h3>
<p>معالج يُعيد <code>.then()</code> السلسلة (chain) مباشرةً تفقد نوع استجابتها، لذا يستنتج العميل <code>unknown</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">hello</span>: <span class="hljs-string">&#x27;world&#x27;</span> }).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(d))
)

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> app&gt;(<span class="hljs-string">&#x27;&#x27;</span>)
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">index</span>.$get()
<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>() <span class="hljs-comment">// unknown</span>
</code></pre>
<p>هذا قيد في استنتاج الأنواع في TypeScript — لا يمكن استنتاج نوع الاستجابة من خلال <code>.then()</code> السلسلة. استخدم <code>async</code>/<code>await</code> بدلاً من ذلك:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> d = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">hello</span>: <span class="hljs-string">&#x27;world&#x27;</span> })
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(d)
})

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> app&gt;(<span class="hljs-string">&#x27;&#x27;</span>)
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">index</span>.$get()
<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>() <span class="hljs-comment">// { hello: string }</span>
</code></pre>
<p>إذا تعذّر عليك تجنّب السلسلة، فإن إضافة تعليق <code>then()</code> يعمل أيضًا:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">TypedResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/types&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">hello</span>: <span class="hljs-string">&#x27;world&#x27;</span> }).<span class="hljs-property">then</span>&lt;
    <span class="hljs-title class_">TypedResponse</span>&lt;{ <span class="hljs-attr">hello</span>: <span class="hljs-built_in">string</span> }, <span class="hljs-number">200</span>, <span class="hljs-string">&#x27;json&#x27;</span>&gt;
  &gt;(<span class="hljs-function">(<span class="hljs-params">d</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(d, <span class="hljs-number">200</span>))
)
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:"rpc",title:p,headings:l,html:t};export{s as book,a as chapter,n as chapterTitle,e as default,l as headings,t as html,c as slug,p as title};
