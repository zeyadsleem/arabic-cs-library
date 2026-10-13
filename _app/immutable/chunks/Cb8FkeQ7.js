const s="hono",n="getting-started",a="مقدمات",e="cloudflare-workers",p="Cloudflare Workers",l=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:3,id:"تغيير-رقم-المنفذ",text:"تغيير رقم المنفذ"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"استخدام-hono-مع-معالجات-أحداث-أخرى",text:"استخدام Hono مع معالجات أحداث أخرى"},{depth:2,id:"تقديم-الملفات-الثابتة",text:"تقديم الملفات الثابتة"},{depth:2,id:"الأنواع",text:"الأنواع"},{depth:2,id:"الاختبار",text:"الاختبار"},{depth:2,id:"الارتباطات",text:"الارتباطات"},{depth:3,id:"توليد-أنواع-الارتباطات-bindings-تلقائيا",text:"توليد أنواع الارتباطات (Bindings) تلقائيًا"},{depth:2,id:"استخدام-المتغيرات-في-البرمجيات-الوسيطة",text:"استخدام المتغيرات في البرمجيات الوسيطة"},{depth:2,id:"النشر-من-github-actions",text:"النشر من GitHub Actions"},{depth:2,id:"تحميل-متغيرات-البيئة-أثناء-التطوير-المحلي",text:"تحميل متغيرات البيئة أثناء التطوير المحلي"}],c=`<p><a href="https://workers.cloudflare.com">Cloudflare Workers</a> بيئة تشغيل JavaScript على الحافة (edge) في Cloudflare CDN.</p>
<p>يمكنك تطوير التطبيق محليًا ونشره بأوامر قليلة باستخدام <a href="https://developers.cloudflare.com/workers/wrangler/">Wrangler</a>.
يتضمن Wrangler محوّل شفرة (transcompiler)، لذا يمكننا كتابة الكود بلغة TypeScript.</p>
<p>لننشئ تطبيقك الأول لـ Cloudflare Workers باستخدام Hono.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Cloudflare Workers.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>cloudflare-workers</code> قالب لهذا المثال.</p>
<pre><code class="language-sh">npm create hono@latest my-app
</code></pre>
<pre><code class="language-sh">yarn create hono my-app
</code></pre>
<pre><code class="language-sh">pnpm create hono my-app
</code></pre>
<pre><code class="language-sh">bun create hono@latest my-app
</code></pre>
<pre><code class="language-sh">deno init --npm hono my-app
</code></pre>
<p>انتقل إلى <code>my-app</code> وثبّت التبعيات.</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
npm i
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
yarn
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
pnpm i
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
bun i
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>src/index.ts</code> كما هو موضح أدناه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Cloudflare Workers!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:8787</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm dev
</code></pre>
<pre><code class="language-sh">bun run dev
</code></pre>
<h3 id="تغيير-رقم-المنفذ">تغيير رقم المنفذ</h3>
<p>إذا كنت بحاجة إلى تغيير رقم المنفذ، يمكنك اتباع التعليمات هنا لتحديث <code>wrangler.toml</code> / <code>wrangler.json</code> / <code>wrangler.jsonc</code> files:
<a href="https://developers.cloudflare.com/workers/wrangler/configuration/#local-development-settings">إعداد Wrangler</a></p>
<p>أو، يمكنك اتباع التعليمات هنا لضبط خيارات CLI:
<a href="https://developers.cloudflare.com/workers/wrangler/commands/#dev"><code>Wrangler CLI</code></a></p>
<h2 id="4-النشر">4. النشر</h2>
<p>إذا كان لديك حساب Cloudflare، يمكنك النشر على Cloudflare. في <code>package.json</code>, <code>$npm_execpath</code> يجب تغييره إلى مدير الحزم (package manager) الذي تختاره.</p>
<pre><code class="language-sh">npm run deploy
</code></pre>
<pre><code class="language-sh">yarn deploy
</code></pre>
<pre><code class="language-sh">pnpm run deploy
</code></pre>
<pre><code class="language-sh">bun run deploy
</code></pre>
<p>هذا كل شيء!</p>
<h2 id="استخدام-hono-مع-معالجات-أحداث-أخرى">استخدام Hono مع معالجات أحداث أخرى</h2>
<p>يمكنك دمج Hono مع معالجات أحداث (event handlers) أخرى (مثل <code>scheduled</code>) في <em>وضع Module Worker</em>.</p>
<p>لفعل ذلك، صدّر <code>app.fetch</code> كخاصية للوحدة <code>fetch</code> المعالج، ثم نفّذ المعالجات الأخرى حسب الحاجة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">scheduled</span>: <span class="hljs-title function_">async</span> (batch, env) =&gt; {},
}
</code></pre>
<h2 id="تقديم-الملفات-الثابتة">تقديم الملفات الثابتة</h2>
<p>إذا أردت تقديم ملفات ثابتة، يمكنك استخدام <a href="https://developers.cloudflare.com/workers/static-assets/">ميزة الأصول الثابتة (Static Assets)</a> الخاصة بـ Cloudflare Workers. حدِّد دليل الملفات في <code>wrangler.jsonc</code>:</p>
<pre><code class="language-jsonc"><span class="hljs-attr">&quot;assets&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;directory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;public&quot;</span> <span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم أنشئ <code>public</code> الدليل وضع الملفات هناك. على سبيل المثال، <code>./public/static/hello.txt</code> سيُقدَّم كـ <code>/static/hello.txt</code>.</p>
<pre><code>.
├── package.json
├── public
│   ├── favicon.ico
│   └── static
│       └── hello.txt
├── src
│   └── index.ts
└── wrangler.jsonc
</code></pre>
<h2 id="الأنواع">الأنواع</h2>
<p>يجب عليك تثبيت <code>@cloudflare/workers-types</code> إذا كنت تريد الحصول على أنواع workers.</p>
<pre><code class="language-sh">npm i --save-dev @cloudflare/workers-types
</code></pre>
<pre><code class="language-sh">yarn add -D @cloudflare/workers-types
</code></pre>
<pre><code class="language-sh">pnpm add -D @cloudflare/workers-types
</code></pre>
<pre><code class="language-sh">bun add --dev @cloudflare/workers-types
</code></pre>
<h2 id="الاختبار">الاختبار</h2>
<p>للاختبار، نوصي باستخدام <code>@cloudflare/vitest-pool-workers</code>.
راجع <a href="https://github.com/honojs/examples">أمثلة</a> لإعداده.</p>
<p>إذا كان هناك التطبيق أدناه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Please test me!&#x27;</span>))
</code></pre>
<p>يمكننا اختبار ما إذا كانت تُعيد استجابة &quot;<em>200 OK</em>&quot; بهذا الكود.</p>
<pre><code class="language-ts"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Test the application&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;Should return 200 response&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;http://localhost/&#x27;</span>)
    <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>)
  })
})
</code></pre>
<h2 id="الارتباطات">الارتباطات</h2>
<p>في Cloudflare Workers، يمكننا ربط قيم البيئة، أو مساحة أسماء KV namespace، أو حاوية R2 bucket، أو كائن Durable Object. يمكنك الوصول إليها في <code>c.env</code>. ستمتلك الأنواع (types) إذا مررت &quot;<em>تعريف النوع</em>&quot; للارتباطات (bindings) إلى <code>Hono</code> كأنواع عامة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">MY_BUCKET</span>: R2Bucket
  <span class="hljs-attr">USERNAME</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">PASSWORD</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

<span class="hljs-comment">// Access to environment values</span>
app.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/upload/:key&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> key = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;key&#x27;</span>)
  <span class="hljs-keyword">await</span> c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_BUCKET</span>.<span class="hljs-title function_">put</span>(key, c.<span class="hljs-property">req</span>.<span class="hljs-property">body</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Put <span class="hljs-subst">\${key}</span> successfully!\`</span>)
})
</code></pre>
<h3 id="توليد-أنواع-الارتباطات-bindings-تلقائيا">توليد أنواع الارتباطات (Bindings) تلقائيًا</h3>
<p>بدلًا من تعريف أنواع الروابط (bindings) يدويًا، يمكنك توليدها تلقائيًا من <code>wrangler.toml</code> باستخدام <code>wrangler types</code> الأمر. استخدم <code>--env-interface</code> العلم لتجنب تعارض في التسمية مع المدمج في Hono <code>Env</code> type:</p>
<pre><code class="language-sh">wrangler types --env-interface CloudflareBindings
</code></pre>
<p>يولِّد هذا <code>worker-configuration.d.ts</code> ملف باسم الواجهة (interface) الذي تحدِّده. ثم مرِّره إلى Hono:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">CloudflareBindings</span> }&gt;()

app.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/upload/:key&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> key = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;key&#x27;</span>)
  <span class="hljs-keyword">await</span> c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_BUCKET</span>.<span class="hljs-title function_">put</span>(key, c.<span class="hljs-property">req</span>.<span class="hljs-property">body</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Put <span class="hljs-subst">\${key}</span> successfully!\`</span>)
})
</code></pre>
<h2 id="استخدام-المتغيرات-في-البرمجيات-الوسيطة">استخدام المتغيرات في البرمجيات الوسيطة</h2>
<p>هذه هي الحالة الوحيدة لوضع Module Worker.
إذا كنت تريد استخدام المتغيرات (Variables) أو المتغيرات السرية (Secret Variables) في الوسائط، على سبيل المثال، &quot;username&quot; أو &quot;password&quot; في وسيط المصادقة الأساسية (Basic Authentication Middleware)، فأنت بحاجة إلى الكتابة كما يلي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { basicAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/basic-auth&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">USERNAME</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">PASSWORD</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

<span class="hljs-comment">//...</span>

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/auth/*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">basicAuth</span>({
    <span class="hljs-attr">username</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">USERNAME</span>,
    <span class="hljs-attr">password</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">PASSWORD</span>,
  })
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">auth</span>(c, next)
})
</code></pre>
<p>ينطبق الأمر نفسه على وسيطة مصادقة Bearer ووسيطة مصادقة JWT، أو غيرها.</p>
<h2 id="النشر-من-github-actions">النشر من GitHub Actions</h2>
<p>قبل نشر الكود إلى Cloudflare عبر CI، تحتاج إلى رمز مميز خاص بـ Cloudflare. يمكنك إدارته من <a href="https://dash.cloudflare.com/profile/api-tokens">رموز API للمستخدم</a>.</p>
<p>إذا كان رمزًا (token) تم إنشاؤه حديثًا، فحدد قالب <strong>Edit Cloudflare Workers</strong>. إذا كان لديك بالفعل رمز آخر، تأكد من أن الرمز لديه الأذونات المقابلة.</p>
<p>ثم انتقل إلى لوحة إعدادات مستودعك على GitHub: <code>Settings-&gt;Secrets and variables-&gt;Actions-&gt;Repository secrets</code>، وأضف سرًّا جديدًا بالاسم <code>CLOUDFLARE_API_TOKEN</code>.</p>
<p>ثم أنشئ <code>.github/workflows/deploy.yml</code> في مجلد جذر مشروع Hono الخاص بك، الصق الكود التالي:</p>
<pre><code class="language-yml"><span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">main</span>

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">cloudflare/wrangler-action@v3</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">apiToken:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.CLOUDFLARE_API_TOKEN</span> <span class="hljs-string">}}</span>
</code></pre>
<p>ثم حرِّر <code>wrangler.jsonc</code>، وأضف هذا الرمز بعد <code>compatibility_date</code> سطر.</p>
<pre><code class="language-jsonc"><span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;src/index.ts&quot;</span><span class="hljs-punctuation">,</span>
<span class="hljs-attr">&quot;minify&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
</code></pre>
<p>كل شيء جاهز! الآن ادفع الشفرة واستمتع بها.</p>
<h2 id="تحميل-متغيرات-البيئة-أثناء-التطوير-المحلي">تحميل متغيرات البيئة أثناء التطوير المحلي</h2>
<p>لتكوين متغيرات البيئة (environment variables) للتطوير المحلي، أنشئ ملف <code>.dev.vars</code> ملف أو <code>.env</code> ملف في الدليل الجذر للمشروع.
يجب تنسيق هذه الملفات باستخدام <a href="https://hexdocs.pm/dotenvy/dotenv-file-format.html">dotenv</a> الصياغة. على سبيل المثال:</p>
<pre><code>SECRET_KEY=value
API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
</code></pre>
<blockquote>
<p>لمزيد من المعلومات حول هذا القسم، يمكنك مراجعة توثيق Cloudflare:
https://developers.cloudflare.com/workers/wrangler/configuration/#secrets</p>
</blockquote>
<p>ثم نستخدم <code>c.env.*</code> للحصول على متغيّرات البيئة في شفرتنا.</p>
<p>بشكل افتراضي، <code>process.env</code> غير متاح في Cloudflare Workers، لذا يُنصح بالحصول على متغيرات البيئة من <code>c.env</code>. إذا أردت استخدامه، فيجب عليك تمكين <a href="https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-auto-populating-processenv"><code>nodejs_compat_populate_process_env</code></a> العلم. يمكنك أيضًا استيراد <code>env</code> من <code>cloudflare:workers</code>. لمزيد من التفاصيل، يُرجى الاطلاع على <a href="https://developers.cloudflare.com/workers/runtime-apis/bindings/#how-to-access-env">كيفية الوصول إلى <code>env</code> في وثائق Cloudflare</a></p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">SECRET_KEY</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/env&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SECRET_KEY</span> = c.<span class="hljs-property">env</span>.<span class="hljs-property">SECRET_KEY</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-variable constant_">SECRET_KEY</span>)
})
</code></pre>
<p>قبل نشر مشروعك إلى Cloudflare، تذكر تعيين متغيرات البيئة/الأسرار (secrets) في إعداد مشروع Cloudflare Workers.</p>
<blockquote>
<p>لمزيد من المعلومات حول هذا القسم، يمكنك مراجعة توثيق Cloudflare:
https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard</p>
</blockquote>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,l as headings,c as html,e as slug,p as title};
