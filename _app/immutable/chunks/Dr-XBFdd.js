const s="hono",n="concepts",a="المفاهيم",p="middleware",e="الوسيط",t=[],o=`<p>نسمّي العنصر الأساسي (primitive) الذي يُرجع <code>Response</code> باسم &quot;Handler&quot;.
يتم تنفيذ &quot;الوسيط&quot; (Middleware) قبل المعالج (Handler) وبعده، ويتولى معالجة <code>Request</code> و <code>Response</code>.
إنه أشبه ببنية البصلة.</p>
<p><img src="/arabic-cs-library/images/hono/onion.png" alt=""></p>
<p>على سبيل المثال، يمكننا كتابة الوسيطة لإضافة الترويسة &quot;X-Response-Time&quot; على النحو التالي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>()
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  <span class="hljs-keyword">const</span> end = performance.<span class="hljs-title function_">now</span>()
  c.<span class="hljs-property">res</span>.<span class="hljs-property">headers</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;X-Response-Time&#x27;</span>, <span class="hljs-string">\`<span class="hljs-subst">\${end - start}</span>\`</span>)
})
</code></pre>
<p>بهذه الطريقة البسيطة، يمكننا كتابة وسيط مخصص خاص بنا ويمكننا استخدام الوسائط المدمجة أو الوسائط الخارجية.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:t,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,t as headings,o as html,p as slug,e as title};
