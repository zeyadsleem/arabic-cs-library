const s="hono",n="middleware-builtin",t="الوسائط المدمجة",a="pretty-json",o="البرمجية الوسيطة Pretty JSON",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"space-number",text:"space: number"},{depth:3,id:"query-string",text:"query: string"},{depth:3,id:"force-boolean",text:"force: boolean"}],p=`<p>يتيح وسيط Pretty JSON ميزة &quot;<em>طباعة JSON المنسقة</em>&quot; (JSON pretty print) لنص استجابة JSON.
إضافة <code>?pretty</code> إلى وسيط استعلام url، تُنسَّق سلاسل JSON بشكل جميل.</p>
<pre><code class="language-js"><span class="hljs-comment">// GET /</span>
{<span class="hljs-string">&quot;project&quot;</span>:{<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;Hono&quot;</span>,<span class="hljs-string">&quot;repository&quot;</span>:<span class="hljs-string">&quot;https://github.com/honojs/hono&quot;</span>}}
</code></pre>
<p>سيكون:</p>
<pre><code class="language-js"><span class="hljs-comment">// GET /?pretty</span>
{
  <span class="hljs-string">&quot;project&quot;</span>: {
    <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Hono&quot;</span>,
    <span class="hljs-string">&quot;repository&quot;</span>: <span class="hljs-string">&quot;https://github.com/honojs/hono&quot;</span>
  }
}
</code></pre>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { prettyJSON } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/pretty-json&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">prettyJSON</span>()) <span class="hljs-comment">// With options: prettyJSON({ space: 4 })</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hono!&#x27;</span> })
})
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="space-number"><Badge type="info" text="optional" /> space: <code>number</code></h3>
<p>عدد المسافات للإزاحة. الافتراضي هو <code>2</code>.</p>
<h3 id="query-string"><Badge type="info" text="optional" /> query: <code>string</code></h3>
<p>اسم سلسلة الاستعلام (query string) للتطبيق. الافتراضي هو <code>pretty</code>.</p>
<h3 id="force-boolean"><Badge type="info" text="optional" /> force: <code>boolean</code></h3>
<p>عند الضبط على <code>true</code>، يتم دائمًا تنسيق استجابات JSON بغض النظر عن معامل الاستعلام. القيمة الافتراضية هي <code>false</code>.</p>
`,l={book:s,chapter:n,chapterTitle:t,slug:a,title:o,headings:e,html:p};export{s as book,n as chapter,t as chapterTitle,l as default,e as headings,p as html,a as slug,o as title};
