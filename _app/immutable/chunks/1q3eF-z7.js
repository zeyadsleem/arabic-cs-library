const s="hono",n="guides",a="الأدلة",t="testing",p="الاختبار",l=[{depth:2,id:"الطلب-والاستجابة",text:"الطلب والاستجابة"},{depth:2,id:"env",text:"Env"}],e=`<p>الاختبار مهم.
في الواقع، من السهل اختبار تطبيقات Hono.
تختلف طريقة إنشاء بيئة الاختبار من بيئة تشغيل إلى أخرى، لكن الخطوات الأساسية هي نفسها.
في هذا القسم، لنختبر باستخدام Cloudflare Workers و <a href="https://vitest.dev/">Vitest</a>.</p>
<p>توصي Cloudflare باستخدام <a href="https://vitest.dev/">Vitest</a> مع <a href="https://www.npmjs.com/package/@cloudflare/vitest-pool-workers">@cloudflare/vitest-pool-workers</a>. لمزيد من التفاصيل، يُرجى الرجوع إلى <a href="https://developers.cloudflare.com/workers/testing/vitest-integration/">تكامل Vitest</a> في وثائق Cloudflare Workers.</p>
<h2 id="الطلب-والاستجابة">الطلب والاستجابة</h2>
<p>كل ما عليك فعله هو إنشاء كائن Request وتمريره إلى تطبيق Hono للتحقق من Response. يمكنك بعد ذلك استخدام <code>app.request</code> الطريقة.</p>
<p>للحصول على عميل اختبار مُنمّط (typed) انظر <a href="https://hono.dev/docs/helpers/testing">مساعد الاختبار</a>.</p>
<p>على سبيل المثال، فكر في تطبيق يوفر واجهة REST API التالية.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Many posts&#x27;</span>)
})

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(
    {
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created&#x27;</span>,
    },
    <span class="hljs-number">201</span>,
    {
      <span class="hljs-string">&#x27;X-Custom&#x27;</span>: <span class="hljs-string">&#x27;Thank you&#x27;</span>,
    }
  )
})
</code></pre>
<p>أرسل طلبًا إلى <code>GET /posts</code> واختبر الاستجابة.</p>
<pre><code class="language-ts"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Example&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;GET /posts&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>)
    <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>)
    <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">text</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Many posts&#x27;</span>)
  })
})
</code></pre>
<p>لإرسال طلب إلى <code>POST /posts</code>، قم بما يلي.</p>
<pre><code class="language-ts"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;POST /posts&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
  })
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Custom&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Thank you&#x27;</span>)
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()).<span class="hljs-title function_">toEqual</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created&#x27;</span>,
  })
})
</code></pre>
<p>لإرسال طلب إلى <code>POST /posts</code> مع <code>JSON</code> البيانات، قم بما يلي.</p>
<pre><code class="language-ts"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;POST /posts&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;hello hono&#x27;</span> }),
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Headers</span>({ <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> }),
  })
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Custom&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Thank you&#x27;</span>)
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()).<span class="hljs-title function_">toEqual</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created&#x27;</span>,
  })
})
</code></pre>
<p>لإرسال طلب إلى <code>POST /posts</code> مع <code>multipart/form-data</code> البيانات، قم بما يلي.</p>
<pre><code class="language-ts"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;POST /posts&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>()
  formData.<span class="hljs-title function_">append</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;hello&#x27;</span>)
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">body</span>: formData,
  })
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Custom&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Thank you&#x27;</span>)
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()).<span class="hljs-title function_">toEqual</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created&#x27;</span>,
  })
})
</code></pre>
<p>يمكنك أيضًا تمرير نسخة من صنف Request.</p>
<pre><code class="language-ts"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;POST /posts&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Request</span>(<span class="hljs-string">&#x27;http://localhost/posts&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
  })
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(req)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Custom&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Thank you&#x27;</span>)
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">json</span>()).<span class="hljs-title function_">toEqual</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created&#x27;</span>,
  })
})
</code></pre>
<p>بهذه الطريقة، يمكنك اختباره كاختبار شامل (End-to-End).</p>
<h2 id="env">Env</h2>
<p>لتعيين <code>c.env</code> للاختبار، يمكنك تمريره كمعامل ثالث إلى <code>app.request</code>. هذا مفيد لمحاكاة قيم مثل <a href="https://hono.dev/getting-started/cloudflare-workers#bindings">Cloudflare Workers Bindings</a>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">MOCK_ENV</span> = {
  <span class="hljs-attr">API_HOST</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
  <span class="hljs-attr">DB</span>: {
    <span class="hljs-attr">prepare</span>: <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">/* mocked D1 */</span>
    },
  },
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;GET /posts&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, {}, <span class="hljs-variable constant_">MOCK_ENV</span>)
})
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
