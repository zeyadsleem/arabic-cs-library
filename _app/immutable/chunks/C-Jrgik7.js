const s="hono",n="getting-started",a="مقدمات",p="basic",e="البدء",l=[{depth:2,id:"قوالب-البدء",text:"قوالب البدء"},{depth:2,id:"مرحبا-بالعالم",text:"مرحبًا بالعالم"},{depth:2,id:"إرجاع-json",text:"إرجاع JSON"},{depth:2,id:"الطلب-والاستجابة",text:"الطلب والاستجابة"},{depth:2,id:"إرجاع-html",text:"إرجاع HTML"},{depth:2,id:"إرجاع-response-خام",text:"إرجاع Response خام"},{depth:2,id:"استخدام-البرمجيات-الوسيطة",text:"استخدام البرمجيات الوسيطة"},{depth:2,id:"المكيف",text:"المُكيّف"},{depth:2,id:"الخطوة-التالية",text:"الخطوة التالية"}],c=`<p>استخدام Hono سهل للغاية. يمكننا إعداد المشروع وكتابة الكود والتطوير باستخدام خادم محلي والنشر بسرعة. سيعمل نفس الكود على أي وقت تشغيل، فقط بنقاط دخول مختلفة. دعنا نلقي نظرة على الاستخدام الأساسي لـ Hono.</p>
<h2 id="قوالب-البدء">قوالب البدء</h2>
<p>تتوفر قوالب بداية (starter templates) لكل منصة. استخدم أمر &quot;create-hono&quot; التالي.</p>
<pre><code class="language-sh">npm create hono@latest my-app
</code></pre>
<pre><code class="language-sh">yarn create hono my-app
</code></pre>
<pre><code class="language-sh">pnpm create hono@latest my-app
</code></pre>
<pre><code class="language-sh">bun create hono@latest my-app
</code></pre>
<pre><code class="language-sh">deno init --npm hono@latest my-app
</code></pre>
<p>ثم سيُسألك عن القالب (template) الذي تريد استخدامه.
لنختر Cloudflare Workers لهذا المثال.</p>
<pre><code>? Which template do you want to use?
    aws-lambda
    bun
    cloudflare-pages
❯   cloudflare-workers
    deno
    fastly
    nextjs
    nodejs
    vercel
</code></pre>
<p>سيُسحَب القالب إلى <code>my-app</code>، فانتقل إليه وثبّت الاعتماديات.</p>
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
<p>بمجرد اكتمال تثبيت الحزمة، شغّل الأمر التالي لبدء تشغيل خادم محلي.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm dev
</code></pre>
<pre><code class="language-sh">bun run dev
</code></pre>
<h2 id="مرحبا-بالعالم">مرحبًا بالعالم</h2>
<p>يمكنك كتابة كود بلغة TypeScript باستخدام أداة تطوير Cloudflare Workers &quot;Wrangler&quot; أو Deno أو Bun أو غيرها دون أن تدرك أي ترجمة (transpiling).</p>
<p>اكتب تطبيقك الأول باستخدام Hono في <code>src/index.ts</code>. المثال أدناه تطبيق Hono ابتدائي.</p>
<p>الـ <code>import</code> والنهائي <code>export default</code> قد تختلف الأجزاء من بيئة تشغيل إلى أخرى،
لكن كل كود التطبيق سيعمل بنفس الكود في كل مكان.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>ابدأ خادم التطوير وادخل إلى <code>http://localhost:8787</code> باستخدام متصفحك.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm dev
</code></pre>
<pre><code class="language-sh">bun run dev
</code></pre>
<h2 id="إرجاع-json">إرجاع JSON</h2>
<p>إرجاع JSON سهل أيضًا. فيما يلي مثال على معالجة طلب GET إلى <code>/api/hello</code> وإرجاع <code>application/json</code> الاستجابة.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hello Hono!&#x27;</span>,
  })
})
</code></pre>
<h2 id="الطلب-والاستجابة">الطلب والاستجابة</h2>
<p>يتم الحصول على معامل مسار وقيمة استعلام في عنوان URL وإلحاق ترويسة استجابة كما يلي.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> page = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">query</span>(<span class="hljs-string">&#x27;page&#x27;</span>)
  <span class="hljs-keyword">const</span> id = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>)
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-Message&#x27;</span>, <span class="hljs-string">&#x27;Hi!&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`You want to see <span class="hljs-subst">\${page}</span> of <span class="hljs-subst">\${id}</span>\`</span>)
})
</code></pre>
<p>يمكننا التعامل بسهولة مع POST وPUT وDELETE وليس GET فقط.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Created!&#x27;</span>, <span class="hljs-number">201</span>))
app.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;/posts/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`<span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;id&#x27;</span>)}</span> is deleted!\`</span>)
)
</code></pre>
<h2 id="إرجاع-html">إرجاع HTML</h2>
<p>يمكنك كتابة HTML باستخدام <a href="https://hono.dev/docs/helpers/html">مُساعد html</a> أو باستخدام <a href="https://hono.dev/docs/guides/jsx"><code>JSX</code></a> الصيغة. إذا أردت استخدام JSX، فأعد تسمية الملف إلى <code>src/index.tsx</code> وقم بتهيئته (تحقق مع كل بيئة تشغيل لأنها تختلف). فيما يلي مثال باستخدام JSX.</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> <span class="hljs-title function_">View</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello Hono!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> /&gt;</span></span>)
})
</code></pre>
<h2 id="إرجاع-response-خام">إرجاع Response خام</h2>
<p>يمكنك أيضًا إرجاع المحتوى الخام <a href="https://developer.mozilla.org/en-US/docs/Web/API/Response">الاستجابة</a>.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;Good morning!&#x27;</span>)
})
</code></pre>
<h2 id="استخدام-البرمجيات-الوسيطة">استخدام البرمجيات الوسيطة</h2>
<p>يمكن للبرمجية الوسيطة أن تقوم بالعمل الشاق نيابة عنك.
على سبيل المثال، أضف المصادقة الأساسية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { basicAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/basic-auth&#x27;</span>

<span class="hljs-comment">// ...</span>

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/admin/*&#x27;</span>,
  <span class="hljs-title function_">basicAuth</span>({
    <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;admin&#x27;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;secret&#x27;</span>,
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/admin&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;You are authorized!&#x27;</span>)
})
</code></pre>
<p>توجد وسائط مدمجة مفيدة تشمل مصادقة Bearer ومصادقة JWT و CORS و ETag.
يوفر Hono أيضًا وسائط من طرف ثالث تستخدم مكتبات خارجية مثل GraphQL Server و Firebase Auth.
كما يمكنك إنشاء برمجيتك الوسيطة الخاصة.</p>
<h2 id="المكيف">المُكيّف</h2>
<p>توجد محولات (Adapters) للدوال المعتمدة على المنصة، على سبيل المثال، معالجة الملفات الثابتة أو WebSocket.
تُنشر كحزم منفصلة. على سبيل المثال، للتعامل مع WebSocket في Cloudflare Workers، ثبّت واستورد <code>@hono/cloudflare-workers</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/cloudflare-workers&#x27;</span>

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">// ...</span>
  })
)
</code></pre>
<h2 id="الخطوة-التالية">الخطوة التالية</h2>
<p>معظم الكود سيعمل على أي منصة، لكن توجد أدلة (guides) لكل منها.
على سبيل المثال، كيفية إعداد المشاريع أو كيفية النشر.
يُرجى الاطلاع على الصفحة الخاصة بالمنصة المحددة التي تريد استخدامها لإنشاء تطبيقك!</p>
`,t={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,l as headings,c as html,p as slug,e as title};
