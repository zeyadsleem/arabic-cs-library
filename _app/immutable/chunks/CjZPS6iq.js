const s="hono",n="getting-started",a="مقدمات",e="fastly",p="`Fastly Compute`",t=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"الارتباطات",text:"الارتباطات"}],c=`<p><a href="https://www.fastly.com/products/edge-compute"><code>Fastly Compute</code></a> هو نظام حوسبة حافة (edge computing) متقدم يشغّل كودك، بلغتك المفضلة، على شبكة الحافة العالمية لـ Fastly. يعمل Hono أيضًا على Fastly Compute.</p>
<p>يمكنك تطوير التطبيق محليًا ونشره بأوامر قليلة باستخدام <a href="https://www.fastly.com/documentation/reference/tools/cli/">Fastly CLI</a>، والذي يُثبَّت محليًا تلقائيًا كجزء من القالب (template).</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Fastly Compute.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>fastly</code> قالب لهذا المثال.</p>
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
<p>تعديل <code>src/index.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-comment">// src/index.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { fire } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@fastly/hono-fastly-compute&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Fastly!&#x27;</span>))

<span class="hljs-title function_">fire</span>(app)
</code></pre>
<blockquote>
<p>[!NOTE]
عند استخدام <code>fire</code> (أو <code>buildFire()</code>) من <code>@fastly/hono-fastly-compute'</code> على المستوى الأعلى (top level) لتطبيقك، من المناسب استخدام <code>Hono</code> من <code>'hono'</code> بدلاً من <code>'hono/quick'</code>، لأن <code>fire</code> يجعل الموجّه الخاص به يبني بياناته الداخلية أثناء مرحلة تهيئة التطبيق.</p>
</blockquote>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:7676</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run start
</code></pre>
<pre><code class="language-sh">yarn start
</code></pre>
<pre><code class="language-sh">pnpm run start
</code></pre>
<pre><code class="language-sh">bun run start
</code></pre>
<h2 id="4-النشر">4. النشر</h2>
<p>لإنشاء تطبيقك ونشره إلى حساب Fastly الخاص بك، اكتب الأمر التالي. في المرة الأولى التي تنشر فيها التطبيق، سيُطلب منك إنشاء خدمة جديدة في حسابك.</p>
<p>إذا لم يكن لديك حساب بعد، فيجب عليك <a href="https://www.fastly.com/signup/">أنشئ حسابك على Fastly</a>.</p>
<pre><code class="language-sh">npm run deploy
</code></pre>
<pre><code class="language-sh">yarn deploy
</code></pre>
<pre><code class="language-sh">pnpm run deploy
</code></pre>
<pre><code class="language-sh">bun run deploy
</code></pre>
<h2 id="الارتباطات">الارتباطات</h2>
<p>في Fastly Compute، يمكنك ربط موارد منصة Fastly، مثل KV Stores و Config Stores و Secret Stores و Backends وقوائم التحكم في الوصول (Access Control Lists) وتدفقات السجلات المسماة (Named Log Streams) ومتغيرات البيئة. يمكنك الوصول إليها من خلال <code>c.env</code>، وستكون لها أنواع SDK الخاصة بها.</p>
<p>لاستخدام هذه الارتباطات (bindings)، استورد <code>buildFire</code> بدلاً من <code>fire</code> من <code>@fastly/hono-fastly-compute</code>. عرّف <a href="https://github.com/fastly/compute-js-context?tab=readme-ov-file#typed-bindings-with-buildcontextproxy">الارتباطات</a> ومرِّرها إلى <a href="https://github.com/fastly/hono-fastly-compute?tab=readme-ov-file#basic-example"><code>buildFire()</code></a> للحصول على <code>fire</code>. ثم استخدم <code>fire.Bindings</code> لتعريف <code>Env</code> النوع عند إنشاء <code>Hono</code>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// src/index.ts</span>
<span class="hljs-keyword">import</span> { buildFire } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@fastly/hono-fastly-compute&#x27;</span>

<span class="hljs-keyword">const</span> fire = <span class="hljs-title function_">buildFire</span>({
  <span class="hljs-attr">siteData</span>: <span class="hljs-string">&#x27;KVStore:site-data&#x27;</span>, <span class="hljs-comment">// I have a KV Store named &quot;site-data&quot;</span>
})

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-keyword">typeof</span> fire.<span class="hljs-property">Bindings</span> }&gt;()

app.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/upload/:key&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-comment">// e.g., Access the KV Store</span>
  <span class="hljs-keyword">const</span> key = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;key&#x27;</span>)
  <span class="hljs-keyword">await</span> c.<span class="hljs-property">env</span>.<span class="hljs-property">siteData</span>.<span class="hljs-title function_">put</span>(key, c.<span class="hljs-property">req</span>.<span class="hljs-property">body</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Put <span class="hljs-subst">\${key}</span> successfully!\`</span>)
})

<span class="hljs-title function_">fire</span>(app)
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,c as html,e as slug,p as title};
