const s="hono",n="getting-started",a="مقدمات",l="bun",p="`Bun`",t=[{depth:2,id:"1-تثبيت-bun",text:"1. تثبيت Bun"},{depth:2,id:"2-الإعداد",text:"2. الإعداد"},{depth:3,id:"21-إعداد-مشروع-جديد",text:"2.1. إعداد مشروع جديد"},{depth:3,id:"22-إعداد-مشروع-موجود",text:"2.2. إعداد مشروع موجود"},{depth:2,id:"3-مرحبا-بالعالم",text:"3. مرحبًا بالعالم"},{depth:2,id:"4-تشغيل",text:"4. تشغيل"},{depth:2,id:"تغيير-رقم-المنفذ",text:"تغيير رقم المنفذ"},{depth:2,id:"تقديم-الملفات-الثابتة",text:"تقديم الملفات الثابتة"},{depth:3,id:"rewriterequestpath",text:"rewriteRequestPath"},{depth:3,id:"mimes",text:"mimes"},{depth:3,id:"onfound",text:"onFound"},{depth:3,id:"onnotfound",text:"onNotFound"},{depth:3,id:"precompressed",text:"precompressed"},{depth:2,id:"الاختبار",text:"الاختبار"}],e=`<p><a href="https://bun.com"><code>Bun</code></a> هو وقت تشغيل JavaScript آخر. إنه ليس Node.js أو Deno. يتضمن Bun مترجمًا (transcompiler)، لذا يمكننا كتابة الكود بلغة TypeScript أو JavaScript عادية.
يعمل Hono أيضًا على Bun.</p>
<h2 id="1-تثبيت-bun">1. تثبيت Bun</h2>
<p>لتثبيت <code>bun</code> الأمر، اتبع التعليمات في <a href="https://bun.com">الموقع الرسمي</a>.</p>
<h2 id="2-الإعداد">2. الإعداد</h2>
<h3 id="21-إعداد-مشروع-جديد">2.1. إعداد مشروع جديد</h3>
<p>يتوفر مشروع بداية (starter) لـ Bun. ابدأ مشروعك بأمر &quot;bun create&quot;.
اختر <code>bun</code> قالب لهذا المثال.</p>
<pre><code class="language-sh">bun create hono@latest my-app
</code></pre>
<p>انتقل إلى my-app وثبّت الاعتماديات.</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
bun install
</code></pre>
<h3 id="22-إعداد-مشروع-موجود">2.2. إعداد مشروع موجود</h3>
<p>في مشروع Bun موجود، نحتاج فقط إلى تثبيت <code>hono</code> الاعتماديات على الدليل الجذر للمشروع عبر</p>
<pre><code class="language-sh">bun add hono
</code></pre>
<p>ثم أضف <code>dev</code> الأمر إلى مشروعك الحالي <code>package.json</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;bun run --hot src/index.ts&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>انظر <a href="https://github.com/honojs/starter/tree/main/templates/bun">قالب بدء سريع لـ Bun</a> لإعداد مثال بسيط (minimal). هذا هو ناتج تشغيل <code>bun create hono@latest</code>.</p>
<h2 id="3-مرحبا-بالعالم">3. مرحبًا بالعالم</h2>
<p>سكربت &quot;Hello World&quot; موضح أدناه. وهو مطابق تقريبًا للكتابة على المنصات الأخرى.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Bun!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>إذا كنت تُعِدّ Hono على مشروع موجود، فإن <code>bun run dev</code> يتوقّع الأمر وضع سكربت &quot;Hello World&quot; في <code>src/index.ts</code></p>
<h2 id="4-تشغيل">4. تشغيل</h2>
<p>شغِّل الأمر.</p>
<pre><code class="language-sh">bun run dev
</code></pre>
<p>ثم، الوصول إلى <code>http://localhost:3000</code> في متصفحك.</p>
<h2 id="تغيير-رقم-المنفذ">تغيير رقم المنفذ</h2>
<p>يمكنك تحديد رقم المنفذ بتصدير <code>port</code>.</p>
<!-- prettier-ignore -->
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Bun!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app <span class="hljs-comment">// [!code --]</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> { <span class="hljs-comment">// [!code ++]</span>
  <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>, <span class="hljs-comment">// [!code ++]</span>
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>, <span class="hljs-comment">// [!code ++]</span>
} <span class="hljs-comment">// [!code ++]</span>
</code></pre>
<h2 id="تقديم-الملفات-الثابتة">تقديم الملفات الثابتة</h2>
<p>لخدمة الملفات الثابتة، استخدم <code>serveStatic</code> من <code>@hono/bun</code> الحزمة.</p>
<pre><code class="language-sh">bun add @hono/bun
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serveStatic } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/bun&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/static/*&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">root</span>: <span class="hljs-string">&#x27;./&#x27;</span> }))
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/favicon.ico&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./favicon.ico&#x27;</span> }))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;You can access: /static/hello.txt&#x27;</span>))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./static/fallback.txt&#x27;</span> }))
</code></pre>
<p>بالنسبة للكود أعلاه، سيعمل بشكل جيد مع بنية الدليل (directory structure) التالية.</p>
<pre><code>./
├── favicon.ico
├── src
└── static
    ├── demo
    │   └── index.html
    ├── fallback.txt
    ├── hello.txt
    └── images
        └── dinotocat.png
</code></pre>
<h3 id="rewriterequestpath"><code>rewriteRequestPath</code></h3>
<p>إذا كنت تريد تعيين <code>http://localhost:3000/static/*</code> إلى <code>./statics</code>، يمكنك استخدام <code>rewriteRequestPath</code> option:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({
    <span class="hljs-attr">root</span>: <span class="hljs-string">&#x27;./&#x27;</span>,
    <span class="hljs-attr">rewriteRequestPath</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span>
      path.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/^\\/static/</span>, <span class="hljs-string">&#x27;/statics&#x27;</span>),
  })
)
</code></pre>
<h3 id="mimes"><code>mimes</code></h3>
<p>يمكنك إضافة أنواع MIME باستخدام <code>mimes</code>:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({
    <span class="hljs-attr">mimes</span>: {
      <span class="hljs-attr">m3u8</span>: <span class="hljs-string">&#x27;application/vnd.apple.mpegurl&#x27;</span>,
      <span class="hljs-attr">ts</span>: <span class="hljs-string">&#x27;video/mp2t&#x27;</span>,
    },
  })
)
</code></pre>
<h3 id="onfound"><code>onFound</code></h3>
<p>يمكنك تحديد المعالجة عند العثور على الملف المطلوب باستخدام <code>onFound</code>:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({
    <span class="hljs-comment">// ...</span>
    <span class="hljs-attr">onFound</span>: <span class="hljs-function">(<span class="hljs-params">_path, c</span>) =&gt;</span> {
      c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">\`public, immutable, max-age=31536000\`</span>)
    },
  })
)
</code></pre>
<h3 id="onnotfound"><code>onNotFound</code></h3>
<p>يمكنك تحديد المعالجة عندما لا يتم العثور على الملف المطلوب باستخدام <code>onNotFound</code>:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({
    <span class="hljs-attr">onNotFound</span>: <span class="hljs-function">(<span class="hljs-params">path, c</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${path}</span> is not found, you access <span class="hljs-subst">\${c.req.path}</span>\`</span>)
    },
  })
)
</code></pre>
<h3 id="precompressed"><code>precompressed</code></h3>
<p>الـ <code>precompressed</code> يتحقّق الخيار مما إذا كانت الملفات ذات امتدادات مثل <code>.br</code> أو <code>.gz</code> متاحة ويقدّمها بناءً على <code>Accept-Encoding</code> ترويسة. يعطي الأولوية لـ Brotli، ثم Zstd، ثم Gzip. إذا لم يتوفر أي منها، فإنه يقدم الملف الأصلي.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({
    <span class="hljs-attr">precompressed</span>: <span class="hljs-literal">true</span>,
  })
)
</code></pre>
<h2 id="الاختبار">الاختبار</h2>
<p>يمكنك استخدام <code>bun:test</code> للاختبار على Bun.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { describe, expect, it } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;bun:test&#x27;</span>
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;.&#x27;</span>

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;My first test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;Should return 200 Response&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Request</span>(<span class="hljs-string">&#x27;http://localhost/&#x27;</span>)
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">fetch</span>(req)
    <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>)
  })
})
</code></pre>
<p>بعد ذلك، شغّل الأمر.</p>
<pre><code class="language-sh">bun <span class="hljs-built_in">test</span> index.test.ts
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:"bun",title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
