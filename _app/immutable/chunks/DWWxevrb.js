const s="hono",a="middleware-builtin",n="الوسائط المدمجة",l="trailing-slash",p="وسيط الشرطة المائلة اللاحقة",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"alwaysredirect-boolean",text:"alwaysRedirect: boolean"},{depth:3,id:"skip-path-string-gt-boolean",text:"skip: (path: string) =&gt; boolean"},{depth:2,id:"ملاحظة",text:"ملاحظة"}],e=`<p>يعالج هذا الوسيط (middleware) الشرطة المائلة الزائدة (Trailing Slash) في عنوان URL عند طلب GET.</p>
<p><code>appendTrailingSlash</code> يعيد توجيه عنوان URL الذي أضاف إليه الشرطة المائلة اللاحقة (Trailing Slash) إذا لم يتم العثور على المحتوى. أيضًا، <code>trimTrailingSlash</code> سيزيل الشرطة المائلة الزائدة (Trailing Slash).</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> {
  appendTrailingSlash,
  trimTrailingSlash,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/trailing-slash&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>مثال على إعادة توجيه طلب GET لـ <code>/about/me</code> إلى <code>/about/me/</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { appendTrailingSlash } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/trailing-slash&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>({ <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span> })

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">appendTrailingSlash</span>())
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about/me/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;With Trailing Slash&#x27;</span>))
</code></pre>
<p>مثال على إعادة توجيه طلب GET لـ <code>/about/me/</code> إلى <code>/about/me</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { trimTrailingSlash } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/trailing-slash&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>({ <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span> })

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">trimTrailingSlash</span>())
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about/me&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Without Trailing Slash&#x27;</span>))
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="alwaysredirect-boolean"><Badge type="info" text="optional" /> alwaysRedirect: <code>boolean</code></h3>
<p>افتراضيًا، لا يعيد وسيط الشرطة المائلة الزائدة (trailing slash) التوجيه إلا عندما تكون حالة الاستجابة <code>404</code>. عندما <code>alwaysRedirect</code> مضبوط على <code>true</code>، تقوم الوسيطة بإعادة التوجيه قبل تنفيذ المعالجات. هذا مفيد للمسارات الجامعة (wildcard routes) (<code>*</code>) حيث لا يعمل السلوك الافتراضي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">trimTrailingSlash</span>({ <span class="hljs-attr">alwaysRedirect</span>: <span class="hljs-literal">true</span> }))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/my-path/*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Wildcard route&#x27;</span>))
</code></pre>
<p>هذا الخيار متاح لكلٍّ من <code>trimTrailingSlash</code> و <code>appendTrailingSlash</code>.</p>
<h3 id="skip-path-string-gt-boolean"><Badge type="info" text="optional" /> skip: <code>(path: string) =&gt; boolean</code></h3>
<p>دالة تحدد ما إذا كان يجب تخطي إعادة التوجيه (redirect) بناءً على مسار الطلب. إذا أرجعت الدالة <code>true</code>، سيتم تخطي إعادة التوجيه. هذا مفيد عندما تريد استبعاد مسارات معينة، مثل تلك التي تحتوي على امتدادات ملفات، من إعادة التوجيه.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">appendTrailingSlash</span>({
    <span class="hljs-attr">skip</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> <span class="hljs-regexp">/\\.\\w+$/</span>.<span class="hljs-title function_">test</span>(path),
  })
)
</code></pre>
<p>هذا الخيار متاح لكلٍّ من <code>trimTrailingSlash</code> و <code>appendTrailingSlash</code>.</p>
<h2 id="ملاحظة">ملاحظة</h2>
<p>سيُفعّل عندما تكون طريقة الطلب <code>GET</code> وحالة الاستجابة هي <code>404</code>.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
