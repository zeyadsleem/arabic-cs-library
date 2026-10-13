const s="hono",n="middleware-builtin",a="الوسائط المدمجة",p="ip-restriction",l="وسيط تقييد IP",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"القواعد",text:"القواعد"},{depth:3,id:"ipv4",text:"IPv4"},{depth:3,id:"ipv6",text:"IPv6"},{depth:2,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"}],o=`<p>وسيطة تقييد IP (IP Restriction Middleware) هي وسيطة تحد من الوصول إلى الموارد بناءً على عنوان IP الخاص بالمستخدم.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { ipRestriction } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ip-restriction&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>لتطبيقك الذي يعمل على Bun، إذا كنت تريد السماح بالوصول من المحلي (localhost) فقط، يمكنك كتابته كما يلي. حدد القواعد التي تريد رفضها في <code>denyList</code> والقواعد التي تريد السماح بها في <code>allowList</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/bun&#x27;</span>
<span class="hljs-keyword">import</span> { ipRestriction } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ip-restriction&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">ipRestriction</span>(getConnInfo, {
    <span class="hljs-attr">denyList</span>: [],
    <span class="hljs-attr">allowList</span>: [<span class="hljs-string">&#x27;127.0.0.1&#x27;</span>, <span class="hljs-string">&#x27;::1&#x27;</span>],
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>))
</code></pre>
<p>مرِّر <code>getConninfo</code> من <a href="https://hono.dev/docs/helpers/conninfo">مُساعد ConnInfo</a> المناسب لبيئتك كوسيط أول لـ <code>ipRestriction</code>. على سبيل المثال، لـ Deno، سيبدو هكذا:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/deno&#x27;</span>
<span class="hljs-keyword">import</span> { ipRestriction } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ip-restriction&#x27;</span>

<span class="hljs-comment">//...</span>

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">ipRestriction</span>(getConnInfo, {
    <span class="hljs-comment">// ...</span>
  })
)
</code></pre>
<h2 id="القواعد">القواعد</h2>
<p>اتّبع التعليمات أدناه لكتابة القواعد.</p>
<h3 id="ipv4">IPv4</h3>
<ul>
<li><code>192.168.2.0</code> - عنوان IP ثابت</li>
<li><code>192.168.2.0/24</code> - تدوين CIDR</li>
<li><code>*</code> - جميع العناوين</li>
</ul>
<h3 id="ipv6">IPv6</h3>
<ul>
<li><code>::1</code> - عنوان IP ثابت</li>
<li><code>::1/10</code> - تدوين CIDR</li>
<li><code>*</code> - جميع العناوين</li>
</ul>
<h2 id="معالجة-الأخطاء">معالجة الأخطاء</h2>
<p>لتخصيص الخطأ، أرجِع <code>Response</code> في الوسيط الثالث.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">ipRestriction</span>(
    getConnInfo,
    {
      <span class="hljs-attr">denyList</span>: [<span class="hljs-string">&#x27;192.168.2.0/24&#x27;</span>],
    },
    <span class="hljs-title function_">async</span> (remote, c) =&gt; {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Blocking access from <span class="hljs-subst">\${remote.addr}</span>\`</span>, <span class="hljs-number">403</span>)
    }
  )
)
</code></pre>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:t,html:o};export{s as book,n as chapter,a as chapterTitle,e as default,t as headings,o as html,p as slug,l as title};
