const s="hono",n="helpers",a="المساعدات",t="testing",p="مساعد الاختبار",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"testclient",text:"testClient()"}],l=`<p>توفر أداة الاختبار المساعدة (Testing Helper) دوالًا لتسهيل اختبار تطبيقات Hono.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { testClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/testing&#x27;</span>
</code></pre>
<h2 id="testclient"><code>testClient()</code></h2>
<p>الـ <code>testClient()</code> تأخذ الدالة مثيلًا من Hono كمعاملها الأول وتُرجع كائنًا مكتوبًا (typed) وفقًا لمسارات تطبيق Hono الخاص بك، على غرار <a href="https://hono.dev/docs/guides/rpc#client">عميل <code>Hono</code></a>. يتيح لك هذا استدعاء مساراتك المعرّفة بطريقة آمنة من حيث الأنواع (type-safe) مع الإكمال التلقائي في المحرر داخل اختباراتك.</p>
<p><strong>ملاحظة مهمة حول استنتاج الأنواع:</strong></p>
<p>من أجل <code>testClient</code> لاستنتاج أنواع مساراتك بشكل صحيح وتوفير الإكمال التلقائي، <strong>يجب عليك تعريف مساراتك باستخدام طرق متسلسلة (chained methods) مباشرة على <code>Hono</code> instance</strong>.</p>
<p>يعتمد استنتاج الأنواع (type inference) على النوع المتدفق عبر الوسائط المتسلسلة (chained) <code>.get()</code>, <code>.post()</code>، وما إلى ذلك، الاستدعاءات. إذا قمت بتعريف المسارات بشكل منفصل بعد إنشاء مثيل Hono (مثل النمط الشائع الموضح في مثال &quot;Hello World&quot;: <code>const app = new Hono(); app.get(...)</code>)، الـ <code>testClient</code> لن تمتلك معلومات الأنواع اللازمة للمسارات المحددة، ولن تحصل على ميزات العميل الآمنة من حيث الأنواع (type-safe).</p>
<p><strong>مثال:</strong></p>
<p>يعمل هذا المثال لأن <code>.get()</code> الطريقة مربوطة مباشرةً على <code>new Hono()</code> call:</p>
<pre><code class="language-ts"><span class="hljs-comment">// index.ts</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/search&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> query = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">query</span>(<span class="hljs-string">&#x27;q&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">query</span>: query, <span class="hljs-attr">results</span>: [<span class="hljs-string">&#x27;result1&#x27;</span>, <span class="hljs-string">&#x27;result2&#x27;</span>] })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// index.test.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { testClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/testing&#x27;</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span> <span class="hljs-comment">// Or your preferred test runner</span>
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./app&#x27;</span>

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Search Endpoint&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Create the test client from the app instance</span>
  <span class="hljs-keyword">const</span> client = <span class="hljs-title function_">testClient</span>(app)

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return search results&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Call the endpoint using the typed client</span>
    <span class="hljs-comment">// Notice the type safety for query parameters (if defined in the route)</span>
    <span class="hljs-comment">// and the direct access via .$get()</span>
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">search</span>.$get({
      <span class="hljs-attr">query</span>: { <span class="hljs-attr">q</span>: <span class="hljs-string">&#x27;hono&#x27;</span> },
    })

    <span class="hljs-comment">// Assertions</span>
    <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>)
    <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()).<span class="hljs-title function_">toEqual</span>({
      <span class="hljs-attr">query</span>: <span class="hljs-string">&#x27;hono&#x27;</span>,
      <span class="hljs-attr">results</span>: [<span class="hljs-string">&#x27;result1&#x27;</span>, <span class="hljs-string">&#x27;result2&#x27;</span>],
    })
  })
})
</code></pre>
<p>لتضمين الترويسات في اختبارك، مررها كمعامل ثانٍ في الاستدعاء. يمكن للمعامل الثاني أيضًا أن يأخذ <code>init</code> خاصية كـ <code>RequestInit</code> كائن، مما يتيح لك تعيين الرؤوس (headers) والطريقة (method) والنص (body) وغيرها. تعرف على المزيد حول <code>init</code> خاصية <a href="https://hono.dev/docs/guides/rpc#init-option">هنا</a>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// index.test.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { testClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/testing&#x27;</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span> <span class="hljs-comment">// Or your preferred test runner</span>
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./app&#x27;</span>

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Search Endpoint&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Create the test client from the app instance</span>
  <span class="hljs-keyword">const</span> client = <span class="hljs-title function_">testClient</span>(app)

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return search results&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Include the token in the headers and set the content type</span>
    <span class="hljs-keyword">const</span> token = <span class="hljs-string">&#x27;this-is-a-very-clean-token&#x27;</span>
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-property">search</span>.$get(
      {
        <span class="hljs-attr">query</span>: { <span class="hljs-attr">q</span>: <span class="hljs-string">&#x27;hono&#x27;</span> },
      },
      {
        <span class="hljs-attr">headers</span>: {
          <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">\`Bearer <span class="hljs-subst">\${token}</span>\`</span>,
          <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">\`application/json\`</span>,
        },
      }
    )

    <span class="hljs-comment">// Assertions</span>
    <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>)
    <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()).<span class="hljs-title function_">toEqual</span>({
      <span class="hljs-attr">query</span>: <span class="hljs-string">&#x27;hono&#x27;</span>,
      <span class="hljs-attr">results</span>: [<span class="hljs-string">&#x27;result1&#x27;</span>, <span class="hljs-string">&#x27;result2&#x27;</span>],
    })
  })
})
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
