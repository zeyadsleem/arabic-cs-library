const s="kinney",a="full-stack-typescript",p="TypeScript للويب الكامل",n="validating-your-api-openapi",e="التحقق من واجهتك (API) باستخدام OpenAPI",t=[],l=`<p>مرة أخرى، نريد فرض التزام خادمك بالمواصفة. لحسن الحظ، لدينا وسيط (middleware) أنيق سيضمن تطابق طلباتنا واستجاباتنا مع المواصفة. لِنستخدم <a href="https://www.npmjs.com/package/express-openapi-validator"><code>express-openapi-validator</code></a>.</p>
<p>يمكننا استخدامه كوسطاء للتأكد من أن استجاباتنا مطابقة للمتطلبات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenApiValidator</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express-openapi-validator&#x27;</span>;

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title class_">OpenApiValidator</span>.<span class="hljs-title function_">middleware</span>({
    <span class="hljs-attr">apiSpec</span>: <span class="hljs-string">&#x27;./openapi.json&#x27;</span>,
    <span class="hljs-attr">validateRequests</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">validateResponses</span>: <span class="hljs-literal">true</span>,
  }),
);
</code></pre>
`,i={book:s,chapter:a,chapterTitle:p,slug:n,title:e,headings:t,html:l};export{s as book,a as chapter,p as chapterTitle,i as default,t as headings,l as html,n as slug,e as title};
