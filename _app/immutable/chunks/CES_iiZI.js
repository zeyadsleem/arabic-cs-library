const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",t="type-safe-route-registration-with-express",l="تسجيل المسارات الآمنة الأنواع",p=[],e=`<p>من قيود Express أن مسارات الطرق ليست سوى نصوص، ولا تُفحص مقابل أنواع المعاملات. ويمكننا بناء موجّه آمن الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a type-safe route builder</span>
<span class="hljs-keyword">function</span> route&lt;
	P <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt; = {},
	<span class="hljs-title class_">ResBody</span> = <span class="hljs-built_in">any</span>,
	<span class="hljs-title class_">ReqBody</span> = <span class="hljs-built_in">any</span>,
	<span class="hljs-title class_">ReqQuery</span> = qs.<span class="hljs-property">ParsedQs</span>,
&gt;(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, …<span class="hljs-attr">handlers</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-title class_">RequestHandler</span>&lt;P, <span class="hljs-title class_">ResBody</span>, <span class="hljs-title class_">ReqBody</span>, <span class="hljs-title class_">ReqQuery</span>&gt;&gt;) {
	<span class="hljs-keyword">return</span> { path, handlers };
}

<span class="hljs-comment">// Use it to define routes</span>
<span class="hljs-keyword">const</span> userRoutes = [
	route&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }, <span class="hljs-title class_">UserResponse</span>&gt;(<span class="hljs-string">&#x27;/users/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
		<span class="hljs-keyword">const</span> userId = req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>;
		<span class="hljs-comment">// …</span>
	}),
	route&lt;{}, <span class="hljs-title class_">UserResponse</span>[], {}, { <span class="hljs-attr">query</span>?: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
		<span class="hljs-keyword">const</span> searchQuery = req.<span class="hljs-property">query</span>.<span class="hljs-property">query</span>;
		<span class="hljs-comment">// …</span>
	}),
];

<span class="hljs-comment">// Register routes</span>
userRoutes.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ path, handlers }</span>) =&gt;</span> {
	app.<span class="hljs-title function_">get</span>(path, …handlers);
});
</code></pre>
<p>ومع أن هذا لا يتحقق من أن <code>:id</code> في المسار يقابل <code>id</code> في نوع معاملاتك، فإنه يضمن أن تستقبل المعالجات طلبات محدّدة الأنواع تحديدًا سليمًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
