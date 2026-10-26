const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="middleware-auth-logging-for-trpc",p="الوسيط والمصادقة والتسجيل في tRPC",t=[{depth:3,id:"وسيط-للمصادقة-والتسجيل",text:"وسيط للمصادقة والتسجيل"}],e=`<h3 id="وسيط-للمصادقة-والتسجيل">وسيط للمصادقة والتسجيل</h3>
<p>يمكنك إنشاء وسيطات مخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// server/src/trpc.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TRPCError</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@trpc/server&#x27;</span>;

<span class="hljs-keyword">const</span> isAuthed = t.<span class="hljs-title function_">middleware</span>(<span class="hljs-function">(<span class="hljs-params">{ ctx, next }</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!ctx.<span class="hljs-property">user</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TRPCError</span>({ <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;UNAUTHORIZED&#x27;</span> });
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">next</span>({ <span class="hljs-attr">ctx</span>: { <span class="hljs-attr">user</span>: ctx.<span class="hljs-property">user</span> } }); <span class="hljs-comment">// now user is non-null</span>
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> protectedProcedure = t.<span class="hljs-property">procedure</span>.<span class="hljs-title function_">use</span>(isAuthed);
</code></pre>
<p>استخدم <code>protectedProcedure</code> عندما تريد مسارات محمية بفحوصات مصادقة. وللتسجيل، بالمثل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> logMiddleware = t.<span class="hljs-title function_">middleware</span>(<span class="hljs-title function_">async</span> ({ path, <span class="hljs-keyword">type</span>, next }) =&gt; {
  <span class="hljs-keyword">const</span> start = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>();
  <span class="hljs-keyword">const</span> ms = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - start;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-keyword">type</span>}</span> call to <span class="hljs-subst">\${path}</span> took <span class="hljs-subst">\${ms}</span>ms\`</span>);
  <span class="hljs-keyword">return</span> result;
});
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> loggedProcedure = t.<span class="hljs-property">procedure</span>.<span class="hljs-title function_">use</span>(logMiddleware);
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
