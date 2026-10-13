const s="hono",n="helpers",a="المساعدات",e="ssg",l="مساعد SSG",p=[{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:3,id:"يدوي",text:"يدوي"},{depth:3,id:"إضافة-vite",text:"إضافة Vite"},{depth:2,id:"tossg",text:"toSSG"},{depth:3,id:"المدخلات",text:"المدخلات"},{depth:3,id:"استخدام-المحولات-لـ-deno-و-bun",text:"استخدام المحوّلات لـ Deno و Bun"},{depth:3,id:"الخيارات",text:"الخيارات"},{depth:3,id:"المخرجات",text:"المخرجات"},{depth:2,id:"إنشاء-ملف",text:"إنشاء ملف"},{depth:3,id:"المسار-واسم-الملف",text:"المسار واسم الملف"},{depth:3,id:"امتداد-الملف",text:"امتداد الملف"},{depth:2,id:"البرمجيات-الوسيطة",text:"البرمجيات الوسيطة"},{depth:3,id:"ssgparams",text:"ssgParams"},{depth:3,id:"isssgcontext",text:"isSSGContext"},{depth:3,id:"disablessg",text:"disableSSG"},{depth:3,id:"onlyssg",text:"onlySSG"},{depth:2,id:"الإضافات",text:"الإضافات"},{depth:3,id:"الإضافة-الافتراضية",text:"الإضافة الافتراضية"},{depth:3,id:"إضافة-إعادة-التوجيه",text:"إضافة إعادة التوجيه"},{depth:3,id:"أنواع-الخطافات",text:"أنواع الخطافات"},{depth:3,id:"واجهة-الإضافة",text:"واجهة الإضافة"},{depth:3,id:"أمثلة-أساسية-للإضافات",text:"أمثلة أساسية للإضافات"},{depth:3,id:"مثال-على-إضافة-متقدمة",text:"مثال على إضافة متقدمة"}],t=`<p>ينشئ SSG Helper موقعًا ثابتًا من تطبيق Hono الخاص بك. سيسترجع محتويات المسارات المسجلة ويحفظها كملفات ثابتة.</p>
<h2 id="الاستخدام">الاستخدام</h2>
<h3 id="يدوي">يدوي</h3>
<p>إذا كان لديك تطبيق Hono بسيط كما يلي:</p>
<pre><code class="language-tsx"><span class="hljs-comment">// index.tsx</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">html</span>(<span class="hljs-string">&#x27;Hello, World!&#x27;</span>))

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/about&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">setRenderer</span>(<span class="hljs-function">(<span class="hljs-params">content</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span> /&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hono SSG Page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>Hello!
    <span class="hljs-tag">&lt;/&gt;</span></span>
  )
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>بالنسبة لـ Node.js، أنشئ سكربت بناء كهذا:</p>
<pre><code class="language-ts"><span class="hljs-comment">// build.ts</span>
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./index&#x27;</span>
<span class="hljs-keyword">import</span> { toSSG } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs/promises&#x27;</span>

<span class="hljs-title function_">toSSG</span>(app, fs)
</code></pre>
<p>بتنفيذ السكربت، ستُخرَج الملفات كما يلي:</p>
<pre><code class="language-bash"><span class="hljs-built_in">ls</span> ./static
about.html  index.html
</code></pre>
<h3 id="إضافة-vite">إضافة Vite</h3>
<p>باستخدام <code>@hono/vite-ssg</code> Vite Plugin، يمكنك التعامل مع العملية بسهولة.</p>
<p>لمزيد من التفاصيل، انظر هنا:</p>
<p>https://github.com/honojs/vite-plugins/tree/main/packages/ssg</p>
<h2 id="tossg">toSSG</h2>
<p><code>toSSG</code> هي الدالة الرئيسية لتوليد المواقع الثابتة، حيث تأخذ تطبيقًا ووحدة نظام ملفات (filesystem) كمعاملات. وهي مبنية على ما يلي:</p>
<h3 id="المدخلات">المدخلات</h3>
<p>تُحدَّد وسائط (arguments) toSSG في ToSSGInterface.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ToSSGInterface</span> {
  (
    <span class="hljs-attr">app</span>: <span class="hljs-title class_">Hono</span>,
    <span class="hljs-attr">fsModule</span>: <span class="hljs-title class_">FileSystemModule</span>,
    <span class="hljs-attr">options</span>?: <span class="hljs-title class_">ToSSGOptions</span>
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ToSSGResult</span>&gt;
}
</code></pre>
<ul>
<li><code>app</code> يحدِّد <code>new Hono()</code> مع المسارات المسجلة.</li>
<li><code>fs</code> يحدد الكائن التالي، بافتراض <code>node:fs/promise</code>.</li>
</ul>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">FileSystemModule</span> {
  <span class="hljs-title function_">writeFile</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Uint8Array</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
  <span class="hljs-title function_">mkdir</span>(
    <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">options</span>: { <span class="hljs-attr">recursive</span>: <span class="hljs-built_in">boolean</span> }
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span> | <span class="hljs-built_in">string</span>&gt;
}
</code></pre>
<h3 id="استخدام-المحولات-لـ-deno-و-bun">استخدام المحوّلات لـ Deno و Bun</h3>
<p>إذا كنت تريد استخدام SSG على Deno أو Bun، فإن <code>toSSG</code> الدالة مُوفّرة من قِبل <code>@hono/deno</code> و <code>@hono/bun</code> الحزم.</p>
<p>لـ Deno:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { toSSG } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/deno&#x27;</span>

<span class="hljs-title function_">toSSG</span>(app) <span class="hljs-comment">// The second argument is an option typed \`ToSSGOptions\`.</span>
</code></pre>
<p>لـ Bun:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { toSSG } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/bun&#x27;</span>

<span class="hljs-title function_">toSSG</span>(app) <span class="hljs-comment">// The second argument is an option typed \`ToSSGOptions\`.</span>
</code></pre>
<h3 id="الخيارات">الخيارات</h3>
<p>تُحدَّد الخيارات في واجهة ToSSGOptions.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ToSSGOptions</span> {
  <span class="hljs-attr">dir</span>?: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">concurrency</span>?: <span class="hljs-built_in">number</span>
  <span class="hljs-attr">extensionMap</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;
  <span class="hljs-attr">plugins</span>?: <span class="hljs-title class_">SSGPlugin</span>[]
}
</code></pre>
<ul>
<li><code>dir</code> هي وجهة الإخراج للملفات الثابتة (Static files). القيمة الافتراضية هي <code>./static</code>.</li>
<li><code>concurrency</code> هو عدد الملفات المتزامنة التي سيتم توليدها في الوقت نفسه. القيمة الافتراضية هي <code>2</code>.</li>
<li><code>extensionMap</code> خريطة تحتوي على <code>Content-Type</code> كمفتاح وسلسلة الامتداد كقيمة. يُستخدم هذا لتحديد امتداد ملف الإخراج.</li>
<li><code>plugins</code> هي مصفوفة من إضافات SSG التي توسع وظائف عملية توليد المواقع الثابتة.</li>
</ul>
<h3 id="المخرجات">المخرجات</h3>
<p><code>toSSG</code> يُعيد النتيجة في نوع Result التالي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ToSSGResult</span> {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-attr">files</span>: <span class="hljs-built_in">string</span>[]
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>
}
</code></pre>
<h2 id="إنشاء-ملف">إنشاء ملف</h2>
<h3 id="المسار-واسم-الملف">المسار واسم الملف</h3>
<p>تنطبق القواعد التالية على معلومات المسار المسجلة واسم الملف المُنشأ. الافتراضي <code>./static</code> يتصرف كما يلي:</p>
<ul>
<li><code>/</code> -&gt; <code>./static/index.html</code></li>
<li><code>/path</code> -&gt; <code>./static/path.html</code></li>
<li><code>/path/</code> -&gt; <code>./static/path/index.html</code></li>
</ul>
<h3 id="امتداد-الملف">امتداد الملف</h3>
<p>يعتمد امتداد الملف على <code>Content-Type</code> التي يُعيدها كل مسار. على سبيل المثال، الاستجابات من <code>c.html</code> يتم حفظها كـ <code>.html</code>.</p>
<p>إذا أردت تخصيص امتدادات الملفات، فاضبط <code>extensionMap</code> خيار.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { toSSG, defaultExtensionMap } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>

<span class="hljs-comment">// Save \`application/x-html\` content with \`.html\`</span>
<span class="hljs-title function_">toSSG</span>(app, fs, {
  <span class="hljs-attr">extensionMap</span>: {
    <span class="hljs-string">&#x27;application/x-html&#x27;</span>: <span class="hljs-string">&#x27;html&#x27;</span>,
    ...defaultExtensionMap,
  },
})
</code></pre>
<p>لاحظ أن المسارات التي تنتهي بشرطة مائلة يتم حفظها باسم index.ext بغض النظر عن الامتداد.</p>
<pre><code class="language-ts"><span class="hljs-comment">// save to ./static/html/index.html</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/html/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">html</span>(<span class="hljs-string">&#x27;html&#x27;</span>))

<span class="hljs-comment">// save to ./static/text/index.txt</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/text/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;text&#x27;</span>))
</code></pre>
<h2 id="البرمجيات-الوسيطة">البرمجيات الوسيطة</h2>
<p>تقديم وسيط مدمج يدعم SSG.</p>
<h3 id="ssgparams">ssgParams</h3>
<p>يمكنك استخدام واجهة API مثل <code>generateStaticParams</code> الخاص بـ <code>Next.js</code>.</p>
<p>مثال:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/shops/:id&#x27;</span>,
  <span class="hljs-title function_">ssgParams</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> shops = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getShops</span>()
    <span class="hljs-keyword">return</span> shops.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">shop</span>) =&gt;</span> ({ <span class="hljs-attr">id</span>: shop.<span class="hljs-property">id</span> }))
  }),
  <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-keyword">const</span> shop = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getShop</span>(c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>))
    <span class="hljs-keyword">if</span> (!shop) {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">notFound</span>()
    }
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{shop.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
)
</code></pre>
<h3 id="isssgcontext">isSSGContext</h3>
<p><code>isSSGContext</code> دالة مساعدة تُرجع <code>true</code> إذا كان التطبيق الحالي يعمل ضمن سياق SSG المُفعَّل بواسطة <code>toSSG</code>.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isSSGContext</span>(c)) {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;This is generated by SSG&#x27;</span>)
  }
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;This is served dynamically&#x27;</span>)
})
</code></pre>
<h3 id="disablessg">disableSSG</h3>
<p>المسارات ذات <code>disableSSG</code> مجموعة الوسيطات (middleware) مُستثناة من توليد الملفات الثابتة بواسطة <code>toSSG</code>.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, <span class="hljs-title function_">disableSSG</span>(), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;an-api&#x27;</span>))
</code></pre>
<h3 id="onlyssg">onlySSG</h3>
<p>المسارات ذات <code>onlySSG</code> سيُتجاوَز طقم البرمجيات الوسيطة المضبوط بواسطة <code>c.notFound()</code> بعد <code>toSSG</code> التنفيذ.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/static-page&#x27;</span>, <span class="hljs-title function_">onlySSG</span>(), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">html</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome to my site<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>))
</code></pre>
<h2 id="الإضافات">الإضافات</h2>
<p>تسمح لك الإضافات (Plugins) بتوسيع وظائف عملية توليد المواقع الثابتة. تستخدم خطافات (hooks) لتخصيص عملية التوليد في مراحل مختلفة.</p>
<h3 id="الإضافة-الافتراضية">الإضافة الافتراضية</h3>
<p>بشكل افتراضي، <code>toSSG</code> يستخدم <code>defaultPlugin</code> الذي يتخطى استجابات الحالة غير 200 (مثل عمليات إعادة التوجيه أو الأخطاء أو 404). يمنع هذا إنشاء ملفات للاستجابات غير الناجحة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { toSSG, defaultPlugin } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>

<span class="hljs-comment">// defaultPlugin is automatically applied when no plugins specified</span>
<span class="hljs-title function_">toSSG</span>(app, fs)

<span class="hljs-comment">// Equivalent to:</span>
<span class="hljs-title function_">toSSG</span>(app, fs, { <span class="hljs-attr">plugins</span>: [defaultPlugin] })
</code></pre>
<p>إذا حدّدت إضافات (plugins) مخصصة، <code>defaultPlugin</code> <strong>لا</strong> يتم تضمينه تلقائيًا. للاحتفاظ بالسلوك الافتراضي مع إضافة إضافات (plugins) مخصصة، قم بتضمينه صراحةً:</p>
<pre><code class="language-ts"><span class="hljs-title function_">toSSG</span>(app, fs, {
  <span class="hljs-attr">plugins</span>: [defaultPlugin, myCustomPlugin],
})
</code></pre>
<h3 id="إضافة-إعادة-التوجيه">إضافة إعادة التوجيه</h3>
<p>الـ <code>redirectPlugin</code> ينشئ صفحات إعادة توجيه HTML للمسارات التي تُرجع استجابات إعادة توجيه HTTP (301، 302، 303، 307، 308). يتضمن HTML الناتج <code>&lt;meta http-equiv=&quot;refresh&quot;&gt;</code> وسم ورابط canonical.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { toSSG, redirectPlugin, defaultPlugin } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>

<span class="hljs-title function_">toSSG</span>(app, fs, {
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">redirectPlugin</span>(), <span class="hljs-title function_">defaultPlugin</span>()],
})
</code></pre>
<p>على سبيل المثال، إذا كان تطبيقك يمتلك:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/old&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;/new&#x27;</span>))
</code></pre>
<p>الـ <code>redirectPlugin</code> سيُنشئ ملف HTML في <code>/old.html</code> مع إعادة توجيه meta refresh إلى <code>/new</code>.</p>
<blockquote>
<p>[!NOTE]
عند استخدامه مع <code>defaultPlugin</code>، ضع <code>redirectPlugin</code> <strong>before</strong> <code>defaultPlugin</code>. منذ <code>defaultPlugin</code> يتخطى الاستجابات غير 200، فإن وضعه أولاً سيمنع <code>redirectPlugin</code> من معالجة استجابات إعادة التوجيه.</p>
</blockquote>
<h3 id="أنواع-الخطافات">أنواع الخطافات</h3>
<p>يمكن للإضافات استخدام الخطّافات (hooks) التالية لتخصيص <code>toSSG</code> process:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">BeforeRequestHook</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span></span>) =&gt;</span> <span class="hljs-title class_">Request</span> | <span class="hljs-literal">false</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AfterResponseHook</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> <span class="hljs-title class_">Response</span> | <span class="hljs-literal">false</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AfterGenerateHook</span> = <span class="hljs-function">(<span class="hljs-params">
  <span class="hljs-attr">result</span>: <span class="hljs-title class_">ToSSGResult</span>
</span>) =&gt;</span> <span class="hljs-built_in">void</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
</code></pre>
<ul>
<li><strong>BeforeRequestHook</strong>: يُستدعى قبل معالجة كل طلب. أعد <code>false</code> لتخطّي المسار.</li>
<li><strong>AfterResponseHook</strong>: يُستدعى بعد استلام كل استجابة. أعد <code>false</code> لتخطي إنشاء الملف.</li>
<li><strong>AfterGenerateHook</strong>: يُستدعى بعد اكتمال عملية التوليد (generation) بأكملها.</li>
</ul>
<h3 id="واجهة-الإضافة">واجهة الإضافة</h3>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SSGPlugin</span> {
  <span class="hljs-attr">beforeRequestHook</span>?: <span class="hljs-title class_">BeforeRequestHook</span> | <span class="hljs-title class_">BeforeRequestHook</span>[]
  <span class="hljs-attr">afterResponseHook</span>?: <span class="hljs-title class_">AfterResponseHook</span> | <span class="hljs-title class_">AfterResponseHook</span>[]
  <span class="hljs-attr">afterGenerateHook</span>?: <span class="hljs-title class_">AfterGenerateHook</span> | <span class="hljs-title class_">AfterGenerateHook</span>[]
}
</code></pre>
<h3 id="أمثلة-أساسية-للإضافات">أمثلة أساسية للإضافات</h3>
<p>تصفية طلبات GET فقط:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> <span class="hljs-attr">getOnlyPlugin</span>: <span class="hljs-title class_">SSGPlugin</span> = {
  <span class="hljs-attr">beforeRequestHook</span>: <span class="hljs-function">(<span class="hljs-params">req</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (req.<span class="hljs-property">method</span> === <span class="hljs-string">&#x27;GET&#x27;</span>) {
      <span class="hljs-keyword">return</span> req
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  },
}
</code></pre>
<p>التصفية حسب رمز الحالة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> <span class="hljs-attr">statusFilterPlugin</span>: <span class="hljs-title class_">SSGPlugin</span> = {
  <span class="hljs-attr">afterResponseHook</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (res.<span class="hljs-property">status</span> === <span class="hljs-number">200</span> || res.<span class="hljs-property">status</span> === <span class="hljs-number">500</span>) {
      <span class="hljs-keyword">return</span> res
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  },
}
</code></pre>
<p>تسجيل الملفات المُنشأة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> <span class="hljs-attr">logFilesPlugin</span>: <span class="hljs-title class_">SSGPlugin</span> = {
  <span class="hljs-attr">afterGenerateHook</span>: <span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (result.<span class="hljs-property">files</span>) {
      result.<span class="hljs-property">files</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(file))
    }
  },
}
</code></pre>
<h3 id="مثال-على-إضافة-متقدمة">مثال على إضافة متقدمة</h3>
<p>فيما يلي مثال على إنشاء إضافة (plugin) لخريطة الموقع (sitemap) تُنشئ ملف <code>sitemap.xml</code> file:</p>
<pre><code class="language-ts"><span class="hljs-comment">// plugins.ts</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs/promises&#x27;</span>
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">SSGPlugin</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-variable constant_">DEFAULT_OUTPUT_DIR</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> sitemapPlugin = (<span class="hljs-attr">baseURL</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">SSGPlugin</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">afterGenerateHook</span>: <span class="hljs-function">(<span class="hljs-params">result, fsModule, options</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> outputDir = options?.<span class="hljs-property">dir</span> ?? <span class="hljs-variable constant_">DEFAULT_OUTPUT_DIR</span>
      <span class="hljs-keyword">const</span> filePath = path.<span class="hljs-title function_">join</span>(outputDir, <span class="hljs-string">&#x27;sitemap.xml&#x27;</span>)
      <span class="hljs-keyword">const</span> urls = result.<span class="hljs-property">files</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span>
        <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(file, baseURL).<span class="hljs-title function_">toString</span>()
      )
      <span class="hljs-keyword">const</span> siteMapText = <span class="hljs-string">\`&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;urlset xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;&gt;
<span class="hljs-subst">\${urls.map((url) =&gt; <span class="hljs-string">\`&lt;url&gt;&lt;loc&gt;<span class="hljs-subst">\${url}</span>&lt;/loc&gt;&lt;/url&gt;\`</span>).join(<span class="hljs-string">&#x27;\\n&#x27;</span>)}</span>
&lt;/urlset&gt;\`</span>
      fsModule.<span class="hljs-title function_">writeFile</span>(filePath, siteMapText)
    },
  }
}
</code></pre>
<p>تطبيق الإضافات:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./index&#x27;</span>
<span class="hljs-keyword">import</span> { toSSG } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ssg&#x27;</span>
<span class="hljs-keyword">import</span> { sitemapPlugin } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./plugins&#x27;</span>

<span class="hljs-title function_">toSSG</span>(app, fs, {
  <span class="hljs-attr">plugins</span>: [
    getOnlyPlugin,
    statusFilterPlugin,
    logFilesPlugin,
    <span class="hljs-title function_">sitemapPlugin</span>(<span class="hljs-string">&#x27;https://example.com&#x27;</span>),
  ],
})
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:"ssg",title:l,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,e as slug,l as title};
