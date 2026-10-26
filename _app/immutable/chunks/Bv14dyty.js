const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="type-safe-middleware-with-express",t="وسيط آمن الأنواع مع Express",p=[{depth:3,id:"سلاسل-وسيط-آمنة-الأنواع",text:"سلاسل وسيط آمنة الأنواع"}],e=`<h3 id="سلاسل-وسيط-آمنة-الأنواع">سلاسل وسيط آمنة الأنواع</h3>
<p>قد يكون تحديد أنواع وسيط Express تحديدًا صحيحًا أمرًا صعبًا، خصوصًا عندما يضيف الوسيط خصائص إلى الطلب:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define middleware that adds user to request</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RequestWithUser</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Request</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-title class_">UserId</span>;
    <span class="hljs-attr">roles</span>: <span class="hljs-built_in">string</span>[];
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">attachUser</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// Authenticate and attach user</span>
  (req <span class="hljs-keyword">as</span> <span class="hljs-title class_">RequestWithUser</span>).<span class="hljs-property">user</span> = {
    <span class="hljs-attr">id</span>: <span class="hljs-title function_">createUserId</span>(<span class="hljs-string">&#x27;123&#x27;</span>),
    <span class="hljs-attr">roles</span>: [<span class="hljs-string">&#x27;user&#x27;</span>],
  };
  <span class="hljs-title function_">next</span>();
}

<span class="hljs-comment">// Type guard middleware</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isAuthenticated</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">if</span> (!(<span class="hljs-string">&#x27;user&#x27;</span> <span class="hljs-keyword">in</span> req)) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">401</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Unauthorized&#x27;</span>);
  }
  <span class="hljs-title function_">next</span>();
}

<span class="hljs-comment">// Create a type-safe middleware chain builder</span>
<span class="hljs-keyword">function</span> createProtectedRoute&lt;
  P = <span class="hljs-title class_">ParamsDictionary</span>,
  <span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>,
  <span class="hljs-title class_">ReqBody</span> = <span class="hljs-built_in">any</span>,
  <span class="hljs-title class_">ReqQuery</span> = <span class="hljs-title class_">ParsedQs</span>,
&gt;(
  <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">RequestWithUser</span> &amp; <span class="hljs-title class_">Request</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">ResBody</span>&gt;,
    <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span>,
  </span>) =&gt;</span> <span class="hljs-built_in">void</span>,
) {
  <span class="hljs-keyword">return</span> [attachUser, isAuthenticated, handler <span class="hljs-keyword">as</span> <span class="hljs-title class_">RequestHandler</span>];
}

<span class="hljs-comment">// Use it to define protected routes</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/admin&#x27;</span>,
  ...createProtectedRoute&lt;{}, { <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-comment">// req.user is properly typed and guaranteed to exist</span>
    <span class="hljs-keyword">if</span> (!req.<span class="hljs-property">user</span>.<span class="hljs-property">roles</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;admin&#x27;</span>)) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">403</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Forbidden&#x27;</span> });
    }

    res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Welcome to admin area&#x27;</span> });
  }),
);
</code></pre>
<p>يضمن هذا النمط وجود <code>req.user</code> وتحديد نوعه تحديدًا سليمًا في معالج مسارك، بفحوصات وقت التصريف ووقت التشغيل معًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
