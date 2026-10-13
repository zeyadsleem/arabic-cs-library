const s="hono",e="guides",o="الأدلة",n="helpers",a="المساعدات",l=[{depth:2,id:"المساعدات-المتاحة",text:"المساعدات المتاحة"}],t=`<p>تتوفر أدوات مساعدة (Helpers) للمساعدة في تطوير تطبيقك. على عكس الوسائط (middleware)، فهي لا تعمل كمعالجات، بل توفر دوالًا مفيدة.</p>
<p>على سبيل المثال، إليك كيفية استخدام <a href="https://hono.dev/docs/helpers/cookie">مساعد <code>Cookie</code></a>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { getCookie, setCookie } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cookie&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/cookie&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> yummyCookie = <span class="hljs-title function_">getCookie</span>(c, <span class="hljs-string">&#x27;yummy_cookie&#x27;</span>)
  <span class="hljs-comment">// ...</span>
  <span class="hljs-title function_">setCookie</span>(c, <span class="hljs-string">&#x27;delicious_cookie&#x27;</span>, <span class="hljs-string">&#x27;macha&#x27;</span>)
  <span class="hljs-comment">//</span>
})
</code></pre>
<h2 id="المساعدات-المتاحة">المساعدات المتاحة</h2>
<ul>
<li><a href="https://hono.dev/docs/helpers/accepts">يقبل</a></li>
<li><a href="https://hono.dev/docs/helpers/adapter">المهايئ</a></li>
<li><a href="https://hono.dev/docs/helpers/cookie">Cookie</a></li>
<li><a href="https://hono.dev/docs/helpers/css"><code>css</code></a></li>
<li><a href="https://hono.dev/docs/helpers/dev"><code>Dev</code></a></li>
<li><a href="https://hono.dev/docs/helpers/factory">المصنع</a></li>
<li><a href="https://hono.dev/docs/helpers/html">html</a></li>
<li><a href="https://hono.dev/docs/helpers/jwt"><code>JWT</code></a></li>
<li><a href="https://hono.dev/docs/helpers/ssg"><code>SSG</code></a></li>
<li><a href="https://hono.dev/docs/helpers/streaming">البث</a></li>
<li><a href="https://hono.dev/docs/helpers/testing">الاختبار</a></li>
<li><a href="https://hono.dev/docs/helpers/websocket">WebSocket</a></li>
</ul>
`,h={book:s,chapter:e,chapterTitle:o,slug:n,title:a,headings:l,html:t};export{s as book,e as chapter,o as chapterTitle,h as default,l as headings,t as html,n as slug,a as title};
