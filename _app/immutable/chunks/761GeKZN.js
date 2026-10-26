const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="type-safe-asynchronous-route-handlers-with-express",t="معالجات المسارات غير المتزامنة الآمنة الأنواع",p=[],e=`<p>لا يتعامل Express أصلًا مع الوعود (promises)، ما قد يؤدي إلى رفضات غير معالَجة. ويساعد غلاف آمن الأنواع في ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a wrapper for async route handlers</span>
<span class="hljs-keyword">function</span> asyncHandler&lt;P = <span class="hljs-title class_">ParamsDictionary</span>, <span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>, <span class="hljs-title class_">ReqBody</span> = <span class="hljs-built_in">any</span>, <span class="hljs-title class_">ReqQuery</span> = <span class="hljs-title class_">ParsedQs</span>&gt;(
  <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ResBody</span>&gt;,
    <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span>,
  </span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;,
): <span class="hljs-title class_">RequestHandler</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
    <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-title function_">handler</span>(req, res, next)).<span class="hljs-title function_">catch</span>(next);
  };
}

<span class="hljs-comment">// Use it with async routes</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  asyncHandler&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }, <span class="hljs-title class_">UserResponse</span>&gt;(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserById</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">404</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;User not found&#x27;</span> } <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>);
    }

    res.<span class="hljs-title function_">json</span>(user);
  }),
);
</code></pre>
<p>يضمن هذا النمط تمرير أي أخطاء في المعالجات غير المتزامنة تمريرًا سليمًا إلى وسيط معالجة الأخطاء في Express.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
