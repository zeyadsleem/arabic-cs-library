const s="kinney",n="full-stack-typescript",t="TypeScript للويب الكامل",a="subscriptions-with-trpc",e="الاشتراكات (Subscriptions) في tRPC",p=[],c=`<p>إذا كنت بحاجة إلى تحديثات فورية (مثل الدردشة أو الإشعارات)، فإن tRPC يدعم الاشتراكات (عبر SSE أو WebSockets). ستُعدّ رابطًا خاصًا على العميل وتُعرّف إجراءات <code>.subscription()</code> على الخادم. راجع توثيق tRPC للنهج الدقيق (بما أنّه قد يختلف بين SSE و WS). مثال مقتطف على الخادم:</p>
<pre><code class="language-typescript"><span class="hljs-attr">onNewUser</span>: publicProcedure.<span class="hljs-title function_">subscription</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Return a subscription that emits whenever a new user is created</span>
});
</code></pre>
<p>ثم على العميل:</p>
<pre><code class="language-typescript">client.<span class="hljs-property">user</span>.<span class="hljs-property">onNewUser</span>.<span class="hljs-title function_">subscribe</span>(<span class="hljs-literal">undefined</span>, {
  <span class="hljs-title function_">next</span>(<span class="hljs-params">data</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;New user:&#x27;</span>, data);
  },
});
</code></pre>
`,l={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:c};export{s as book,n as chapter,t as chapterTitle,l as default,p as headings,c as html,a as slug,e as title};
