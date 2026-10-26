const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="express-zod-params",l="إضافة مخططات Zod إلى معاملات المسار",t=[{depth:2,id:"معاملات-البحث",text:"معاملات البحث"}],c=`<p>معاملات البحث ومعاملات المسار سلاسل نصية من الناحية التقنية. لكنني أعلم أنها ينبغي أن تكون أرقامًا. لا بأس. لنتأكد فقط من أنها تُحوَّل قسريًا إلى أرقام.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>(),
  <span class="hljs-attr">title</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">description</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">completed</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">boolean</span>(),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskParamsSchema</span> = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">pick</span>({ <span class="hljs-attr">id</span>: <span class="hljs-literal">true</span> });
</code></pre>
<p>يمكننا استخدامه هكذا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { id } = <span class="hljs-title class_">TaskParamsSchema</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">params</span>);
</code></pre>
<h2 id="معاملات-البحث">معاملات البحث</h2>
<p>تعمل الفكرة الأساسية نفسها مع معاملات البحث.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskQuerySchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">completed</span>: z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">boolean</span>().<span class="hljs-title function_">optional</span>(),
});
</code></pre>
<p>أو قد أفعل شيئًا مثل هذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskQuerySchema</span> = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">pick</span>({ <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> }).<span class="hljs-title function_">partial</span>();
</code></pre>
<p>والآن يمكننا التأكد من أن استعلاماتنا منطقية.</p>
<p><strong>التالي</strong>: <a href="https://stevekinney.com/courses/full-stack-typescript/validating-schema-with-middleware">استخدام وسيط للتحقق من المخطط</a></p>
`,e={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,p as slug,l as title};
