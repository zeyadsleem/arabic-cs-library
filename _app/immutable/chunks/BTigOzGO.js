const s="hono",n="getting-started",a="مقدمات",p="azure-functions",e="Azure Functions",o=[{depth:2,id:"1-تثبيت-cli",text:"1. تثبيت CLI"},{depth:2,id:"2-الإعداد",text:"2. الإعداد"},{depth:2,id:"3-مرحبا-بالعالم",text:"3. مرحبًا بالعالم"},{depth:2,id:"4-تشغيل",text:"4. تشغيل"},{depth:2,id:"5-النشر",text:"5. النشر"}],t=`<p><a href="https://azure.microsoft.com/en-us/products/functions">Azure Functions</a> هي منصة بدون خادم (serverless) من Microsoft Azure. يمكنك تشغيل كودك استجابةً للأحداث، وهي تدير تلقائيًا موارد الحوسبة الأساسية نيابة عنك.</p>
<p>لم يُصمَّم Hono لـ Azure Functions في البداية، ولكن مع <a href="https://github.com/Marplex/hono-azurefunc-adapter">مُهايئ Azure Functions</a>، يمكنه العمل عليه أيضًا.</p>
<p>يعمل مع Azure Functions <strong>V4</strong> التي تعمل على Node.js 18 أو أحدث.</p>
<h2 id="1-تثبيت-cli">1. تثبيت CLI</h2>
<p>لإنشاء Azure Function، يجب أولًا تثبيت <a href="https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?pivots=nodejs-model-v4#install-the-azure-functions-core-tools">Azure Functions Core Tools</a>.</p>
<p>على macOS</p>
<pre><code class="language-sh">brew tap azure/functions
brew install azure-functions-core-tools@4
</code></pre>
<p>اتبع هذا الرابط لأنظمة التشغيل الأخرى:</p>
<ul>
<li><a href="https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?pivots=nodejs-model-v4#install-the-azure-functions-core-tools">ثبِّت Azure Functions Core Tools | Microsoft Learn</a></li>
</ul>
<h2 id="2-الإعداد">2. الإعداد</h2>
<p>أنشئ مشروع TypeScript Node.js V4 في المجلد الحالي.</p>
<pre><code class="language-sh">func init --typescript
</code></pre>
<p>غيّر بادئة المسار الافتراضية للمضيف (host). أضف هذه الخاصية إلى كائن json الجذري الخاص بـ <code>host.json</code>:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;extensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;routePrefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بادئة مسار Azure Functions الافتراضية هي <code>/api</code>. إذا لم تغيّره كما هو موضح أعلاه، فتأكد من بدء جميع مسارات Hono الخاصة بك بـ <code>/api</code></p>
<p>أنت الآن مستعد لتثبيت Hono ومحوّل (adapter) Azure Functions باستخدام:</p>
<pre><code class="language-sh">npm i @marplex/hono-azurefunc-adapter hono
</code></pre>
<pre><code class="language-sh">yarn add @marplex/hono-azurefunc-adapter hono
</code></pre>
<pre><code class="language-sh">pnpm add @marplex/hono-azurefunc-adapter hono
</code></pre>
<pre><code class="language-sh">bun add @marplex/hono-azurefunc-adapter hono
</code></pre>
<h2 id="3-مرحبا-بالعالم">3. مرحبًا بالعالم</h2>
<p>إنشاء <code>src/app.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-comment">// src/app.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Azure Functions!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>إنشاء <code>src/functions/httpTrigger.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-comment">// src/functions/httpTrigger.ts</span>
<span class="hljs-keyword">import</span> { app } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@azure/functions&#x27;</span>
<span class="hljs-keyword">import</span> { azureHonoHandler } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@marplex/hono-azurefunc-adapter&#x27;</span>
<span class="hljs-keyword">import</span> honoApp <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../app&#x27;</span>

app.<span class="hljs-title function_">http</span>(<span class="hljs-string">&#x27;httpTrigger&#x27;</span>, {
  <span class="hljs-attr">methods</span>: [
    <span class="hljs-comment">//Add all your supported HTTP methods here</span>
    <span class="hljs-string">&#x27;GET&#x27;</span>,
    <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-string">&#x27;DELETE&#x27;</span>,
    <span class="hljs-string">&#x27;PUT&#x27;</span>,
  ],
  <span class="hljs-attr">authLevel</span>: <span class="hljs-string">&#x27;anonymous&#x27;</span>,
  <span class="hljs-attr">route</span>: <span class="hljs-string">&#x27;{*proxy}&#x27;</span>,
  <span class="hljs-attr">handler</span>: <span class="hljs-title function_">azureHonoHandler</span>(honoApp.<span class="hljs-property">fetch</span>),
})
</code></pre>
<h2 id="4-تشغيل">4. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:7071</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run start
</code></pre>
<pre><code class="language-sh">yarn start
</code></pre>
<pre><code class="language-sh">pnpm start
</code></pre>
<pre><code class="language-sh">bun run start
</code></pre>
<h2 id="5-النشر">5. النشر</h2>
<p>قبل أن تتمكن من النشر إلى Azure، تحتاج إلى إنشاء بعض الموارد في بنيتك التحتية السحابية. يرجى زيارة وثائق Microsoft حول <a href="https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?pivots=nodejs-model-v4&amp;tabs=windows%2Cazure-cli%2Cbrowser#create-supporting-azure-resources-for-your-function">أنشئ موارد Azure الداعمة لدالتك</a></p>
<p>ابنِ المشروع للنشر:</p>
<pre><code class="language-sh">npm run build
</code></pre>
<pre><code class="language-sh">yarn build
</code></pre>
<pre><code class="language-sh">pnpm build
</code></pre>
<pre><code class="language-sh">bun run build
</code></pre>
<p>انشر مشروعك إلى تطبيق الدوال (function app) في Azure Cloud. استبدل <code>&lt;YourFunctionAppName&gt;</code> باسم تطبيقك.</p>
<pre><code class="language-sh">func azure functionapp publish &lt;YourFunctionAppName&gt;
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:o,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,o as headings,t as html,p as slug,e as title};
