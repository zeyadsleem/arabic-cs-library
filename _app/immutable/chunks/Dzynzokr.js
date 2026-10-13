const s="hono",n="middleware-builtin",a="الوسائط المدمجة",t="csrf",e="حماية CSRF",c=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"origin-string-string-function",text:"origin: string | string[] | Function"},{depth:3,id:"secfetchsite-string-string-function",text:"secFetchSite: string | string[] | Function"}],o=`<p>يحمي هذا الوسيط (middleware) من هجمات CSRF عبر التحقق من كلٍ من <code>Origin</code> الترويسة و <code>Sec-Fetch-Site</code> الترويسة (header). يُسمح بالطلب إذا مرّ أيٌّ من التحققين.</p>
<p>يتحقّق الوسيط فقط من الطلبات التي:</p>
<ul>
<li>استخدام طرق HTTP غير الآمنة (ليس GET أو HEAD أو OPTIONS)</li>
<li>لها أنواع محتوى يمكن إرسالها عبر نماذج HTML (<code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>، أو <code>text/plain</code>)</li>
</ul>
<p>المتصفحات القديمة التي لا تُرسل <code>Origin</code> الترويسات، أو البيئات التي تستخدم خوادم وكيلة عكسية (reverse proxies) لإزالة هذه الترويسات، قد لا تعمل جيدًا. في مثل هذه البيئات، استخدم طرق رموز CSRF أخرى.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { csrf } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/csrf&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// Default: both origin and sec-fetch-site validation</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">csrf</span>())

<span class="hljs-comment">// Allow specific origins</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">csrf</span>({ <span class="hljs-attr">origin</span>: <span class="hljs-string">&#x27;https://myapp.example.com&#x27;</span> }))

<span class="hljs-comment">// Allow multiple origins</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">csrf</span>({
    <span class="hljs-attr">origin</span>: [
      <span class="hljs-string">&#x27;https://myapp.example.com&#x27;</span>,
      <span class="hljs-string">&#x27;https://development.myapp.example.com&#x27;</span>,
    ],
  })
)

<span class="hljs-comment">// Allow specific sec-fetch-site values</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">csrf</span>({ <span class="hljs-attr">secFetchSite</span>: <span class="hljs-string">&#x27;same-origin&#x27;</span> }))
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">csrf</span>({ <span class="hljs-attr">secFetchSite</span>: [<span class="hljs-string">&#x27;same-origin&#x27;</span>, <span class="hljs-string">&#x27;none&#x27;</span>] }))

<span class="hljs-comment">// Dynamic origin validation</span>
<span class="hljs-comment">// It is strongly recommended that the protocol be verified to ensure a match to \`$\`.</span>
<span class="hljs-comment">// You should *never* do a forward match.</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">csrf</span>({
    <span class="hljs-attr">origin</span>: <span class="hljs-function">(<span class="hljs-params">origin</span>) =&gt;</span>
      <span class="hljs-regexp">/https:\\/\\/(\\w+\\.)?myapp\\.example\\.com$/</span>.<span class="hljs-title function_">test</span>(origin),
  })
)

<span class="hljs-comment">// Dynamic sec-fetch-site validation</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">csrf</span>({
    <span class="hljs-attr">secFetchSite</span>: <span class="hljs-function">(<span class="hljs-params">secFetchSite, c</span>) =&gt;</span> {
      <span class="hljs-comment">// Always allow same-origin</span>
      <span class="hljs-keyword">if</span> (secFetchSite === <span class="hljs-string">&#x27;same-origin&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment">// Allow cross-site for webhook endpoints</span>
      <span class="hljs-keyword">if</span> (
        secFetchSite === <span class="hljs-string">&#x27;cross-site&#x27;</span> &amp;&amp;
        c.<span class="hljs-property">req</span>.<span class="hljs-property">path</span>.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;/webhook/&#x27;</span>)
      ) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    },
  })
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="origin-string-string-function"><Badge type="info" text="optional" /> origin: <code>string</code> | <code>string[]</code> | <code>Function</code></h3>
<p>حدّد الأصول المسموح بها لحماية CSRF.</p>
<ul>
<li><strong><code>string</code></strong>: أصل واحد مسموح به (مثل، <code>'https://example.com'</code>)</li>
<li><strong><code>string[]</code></strong>: مصفوفة الأصول المسموح بها</li>
<li><strong><code>Function</code></strong>: معالج مخصص <code>(origin: string, context: Context) =&gt; boolean</code> للتحقّق المرن من الأصل ومنطق التجاوز</li>
</ul>
<p><strong>الافتراضي</strong>: أصل الطلب نفسه فقط</p>
<p>يستقبل معالج الدالة <code>Origin</code> قيمة الترويسة وسياق الطلب، مما يسمح بالتحقق الديناميكي بناءً على خصائص الطلب مثل المسار أو الترويسات أو بيانات سياق أخرى.</p>
<h3 id="secfetchsite-string-string-function"><Badge type="info" text="optional" /> <code>secFetchSite</code>: <code>string</code> | <code>string[]</code> | <code>Function</code></h3>
<p>حدد قيم رأس Sec-Fetch-Site المسموح بها للحماية من CSRF باستخدام <a href="https://web.dev/articles/fetch-metadata"><code>Fetch Metadata</code></a>.</p>
<ul>
<li><strong><code>string</code></strong>: قيمة واحدة مسموح بها (مثل، <code>'same-origin'</code>)</li>
<li><strong><code>string[]</code></strong>: مصفوفة القيم المسموح بها (مثل، <code>['same-origin', 'none']</code>)</li>
<li><strong><code>Function</code></strong>: معالج مخصص <code>(secFetchSite: string, context: Context) =&gt; boolean</code> للتحقق المرن</li>
</ul>
<p><strong>افتراضي</strong>: يسمح فقط بـ <code>'same-origin'</code></p>
<p>قيم Sec-Fetch-Site القياسية:</p>
<ul>
<li><code>same-origin</code>: طلب من نفس الأصل (origin)</li>
<li><code>same-site</code>: طلب من نفس الموقع (نطاق فرعي مختلف)</li>
<li><code>cross-site</code>: طلب من موقع مختلف</li>
<li><code>none</code>: طلب غير قادم من صفحة ويب (على سبيل المثال، شريط عنوان المتصفح، الإشارة المرجعية)</li>
</ul>
<p>يستقبل معالج الدالة <code>Sec-Fetch-Site</code> قيمة الترويسة وسياق الطلب، مما يتيح التحقق الديناميكي بناءً على خصائص الطلب.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:c,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,c as headings,o as html,t as slug,e as title};
