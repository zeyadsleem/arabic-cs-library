const s="hono",n="getting-started",a="مقدمات",p="deno",t="Deno",o=[{depth:2,id:"1-تثبيت-deno",text:"1. تثبيت Deno"},{depth:2,id:"2-الإعداد",text:"2. الإعداد"},{depth:2,id:"3-مرحبا-بالعالم",text:"3. مرحبًا بالعالم"},{depth:2,id:"4-تشغيل",text:"4. تشغيل"},{depth:2,id:"تغيير-رقم-المنفذ",text:"تغيير رقم المنفذ"},{depth:2,id:"تقديم-الملفات-الثابتة",text:"تقديم الملفات الثابتة"},{depth:3,id:"rewriterequestpath",text:"rewriteRequestPath"},{depth:3,id:"mimes",text:"mimes"},{depth:3,id:"onfound",text:"onFound"},{depth:3,id:"onnotfound",text:"onNotFound"},{depth:3,id:"precompressed",text:"precompressed"},{depth:2,id:"deno-deploy",text:"Deno Deploy"},{depth:2,id:"الاختبار",text:"الاختبار"},{depth:2,id:"npm-و-jsr",text:"npm و JSR"}],l=`<p><a href="https://deno.com/">Deno</a> هو بيئة تشغيل JavaScript مبنية على V8. إنها ليست Node.js.
يعمل Hono أيضًا على Deno.</p>
<p>يمكنك استخدام Hono، وكتابة الكود بلغة TypeScript، وتشغيل التطبيق باستخدام <code>deno</code> الأمر، ثم انشره إلى &quot;Deno Deploy&quot;.</p>
<h2 id="1-تثبيت-deno">1. تثبيت Deno</h2>
<p>أولاً، ثبّت <code>deno</code> الأمر.
يرجى الرجوع إلى <a href="https://docs.deno.com/runtime/getting_started/installation/">الوثيقة الرسمية</a>.</p>
<h2 id="2-الإعداد">2. الإعداد</h2>
<p>يتوفر قالب بداية لـ Deno.
ابدأ مشروعك باستخدام <a href="https://docs.deno.com/runtime/reference/cli/init/"><code>deno init</code></a> الأمر.</p>
<pre><code class="language-sh">deno init --npm hono --template=deno my-app
</code></pre>
<p>انتقل إلى <code>my-app</code>. بالنسبة إلى Deno، لست بحاجة إلى تثبيت Hono صراحةً.</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
</code></pre>
<h2 id="3-مرحبا-بالعالم">3. مرحبًا بالعالم</h2>
<p>تعديل <code>main.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Deno!&#x27;</span>))

<span class="hljs-title class_">Deno</span>.<span class="hljs-title function_">serve</span>(app.<span class="hljs-property">fetch</span>)
</code></pre>
<h2 id="4-تشغيل">4. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:8000</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">deno task start
</code></pre>
<h2 id="تغيير-رقم-المنفذ">تغيير رقم المنفذ</h2>
<p>يمكنك تحديد رقم المنفذ (port) عبر تحديث وسائط (arguments) <code>Deno.serve</code> في <code>main.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-title class_">Deno</span>.<span class="hljs-title function_">serve</span>(app.<span class="hljs-property">fetch</span>) <span class="hljs-comment">// [!code --]</span>
<span class="hljs-title class_">Deno</span>.<span class="hljs-title function_">serve</span>({ <span class="hljs-attr">port</span>: <span class="hljs-number">8787</span> }, app.<span class="hljs-property">fetch</span>) <span class="hljs-comment">// [!code ++]</span>
</code></pre>
<h2 id="تقديم-الملفات-الثابتة">تقديم الملفات الثابتة</h2>
<p>لخدمة الملفات الثابتة، استخدم <code>serveStatic</code> من <code>@hono/deno</code> الحزمة.</p>
<pre><code class="language-sh">deno add jsr:@hono/deno
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { serveStatic } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/deno&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/static/*&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">root</span>: <span class="hljs-string">&#x27;./&#x27;</span> }))
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/favicon.ico&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./favicon.ico&#x27;</span> }))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;You can access: /static/hello.txt&#x27;</span>))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./static/fallback.txt&#x27;</span> }))

<span class="hljs-title class_">Deno</span>.<span class="hljs-title function_">serve</span>(app.<span class="hljs-property">fetch</span>)
</code></pre>
<p>بالنسبة للكود أعلاه، سيعمل بشكل جيد مع بنية الدليل (directory structure) التالية.</p>
<pre><code>./
├── favicon.ico
├── index.ts
└── static
    ├── demo
    │   └── index.html
    ├── fallback.txt
    ├── hello.txt
    └── images
        └── dinotocat.png
</code></pre>
<h3 id="rewriterequestpath"><code>rewriteRequestPath</code></h3>
<p>إذا كنت تريد تعيين <code>http://localhost:8000/static/*</code> إلى <code>./statics</code>، يمكنك استخدام <code>rewriteRequestPath</code> option:</p>
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
<h2 id="deno-deploy">Deno Deploy</h2>
<p>Deno Deploy هي منصة serverless لتشغيل تطبيقات JavaScript و TypeScript في السحابة.
يوفر مستوى إدارة (management plane) لنشر وتشغيل التطبيقات عبر عمليات التكامل مثل النشر عبر GitHub.</p>
<p>يعمل Hono أيضًا على Deno Deploy. يُرجى الرجوع إلى <a href="https://docs.deno.com/deploy/manual/">الوثيقة الرسمية</a>.</p>
<h2 id="الاختبار">الاختبار</h2>
<p>اختبار التطبيق على Deno أمر سهل.
يمكنك الكتابة باستخدام <code>Deno.test</code> واستخدم <code>assert</code> أو <code>assertEquals</code> من <a href="https://jsr.io/@std/assert"><code>@std/assert</code></a>.</p>
<pre><code class="language-sh">deno add jsr:@std/assert
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { assertEquals } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@std/assert&#x27;</span>

<span class="hljs-title class_">Deno</span>.<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;Hello World&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Please test me&#x27;</span>))

  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;http://localhost/&#x27;</span>)
  <span class="hljs-title function_">assertEquals</span>(res.<span class="hljs-property">status</span>, <span class="hljs-number">200</span>)
})
</code></pre>
<p>ثم شغّل الأمر:</p>
<pre><code class="language-sh">deno <span class="hljs-built_in">test</span> hello.ts
</code></pre>
<h2 id="npm-و-jsr">npm و JSR</h2>
<p>Hono متاح على كلٍّ من <a href="https://www.npmjs.com/package/hono"><code>npm</code></a> و <a href="https://jsr.io/@hono/hono"><code>JSR</code></a> (سجل JavaScript). يمكنك استخدام أيٍّ من <code>npm:hono</code> أو <code>jsr:@hono/hono</code> في <code>deno.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;imports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;hono&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;jsr:@hono/hono&quot;</span> <span class="hljs-comment">// [!code --]</span>
    <span class="hljs-attr">&quot;hono&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm:hono&quot;</span> <span class="hljs-comment">// [!code ++]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لاستخدام البرمجيات الوسيطة تحتاج إلى استخدام <a href="https://docs.deno.com/runtime/fundamentals/configuration/#custom-path-mappings">دليل <code>Deno</code></a> الصياغة في الاستيراد.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;imports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;hono/&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm:/hono/&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>عند استخدام وسائط الطرف الثالث، قد تحتاج إلى استخدام Hono من نفس السجل (registry) الذي تستخدمه الوسيطة لاستنتاج أنواع TypeScript بشكل صحيح. على سبيل المثال، إذا كنت تستخدم الوسيطة من npm، يجب عليك أيضًا استخدام Hono من npm:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;imports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;hono&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm:hono&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;zod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm:zod&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@hono/zod-validator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm:@hono/zod-validator&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>نوفّر أيضاً العديد من حزم الوسيطات (middleware) التابعة لجهات خارجية على <a href="https://jsr.io/@hono"><code>JSR</code></a>. عند استخدام الوسيطة (middleware) على JSR، استخدم Hono من JSR:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;imports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;hono&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;jsr:@hono/hono&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;zod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm:zod&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@hono/zod-validator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;jsr:@hono/zod-validator&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:o,html:l};export{s as book,n as chapter,a as chapterTitle,e as default,o as headings,l as html,p as slug,t as title};
