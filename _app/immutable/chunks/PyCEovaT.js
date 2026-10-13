const s="hono",n="getting-started",e="مقدمات",a="cloudbase",o="Tencent CloudBase",p=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-bootstrap",text:"4. Bootstrap"},{depth:2,id:"5-النشر",text:"5. النشر"}],t=`<p><a href="https://docs.cloudbase.net/en/">Tencent CloudBase</a> منصّة الخدمات الخلفية بلا خادم (serverless) من Tencent Cloud. <a href="https://docs.cloudbase.net/en/cloud-function/develop/how-to-writing-functions-code">دوال HTTP السحابية</a> يعمل كعملية Node.js عادية (plain process). يستمع تطبيقك على المنفذ <code>9000</code>، ويشغّلها CloudBase عبر <a href="https://docs.cloudbase.net/en/cloud-function/develop/scf-bootstrap"><code>scf_bootstrap</code></a>. <a href="https://github.com/honojs/node-server"><code>@hono/node-server</code></a> يعمل كما هو. لا حاجة لمحوّل (adapter) Hono إضافي.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>ابدأ مشروعك بالأمر &quot;create-hono&quot;. اختر <code>nodejs</code>.</p>
<pre><code class="language-sh">npm create hono@latest my-app
<span class="hljs-built_in">cd</span> my-app
npm i
</code></pre>
<pre><code class="language-sh">yarn create hono my-app
<span class="hljs-built_in">cd</span> my-app
yarn
</code></pre>
<pre><code class="language-sh">pnpm create hono my-app
<span class="hljs-built_in">cd</span> my-app
pnpm i
</code></pre>
<pre><code class="language-sh">bun create hono@latest my-app
<span class="hljs-built_in">cd</span> my-app
bun i
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>src/index.ts</code>. تتطلّب CloudBase HTTP Cloud Functions المنفذ <code>9000</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serve } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello CloudBase!&#x27;</span>))

<span class="hljs-title function_">serve</span>({
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-number">9000</span>,
})
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<pre><code class="language-sh">npm run dev
</code></pre>
<p>ثم الوصول إلى <code>http://localhost:9000</code>.</p>
<h2 id="4-bootstrap">4. Bootstrap</h2>
<p>إنشاء <code>scf_bootstrap</code> في جذر المشروع (بدون امتداد ملف) واجعله قابلاً للتنفيذ:</p>
<pre><code class="language-sh"><span class="hljs-meta">#!/bin/bash</span>
/var/lang/node20/bin/node dist/index.js
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">chmod</span> +x scf_bootstrap
</code></pre>
<p>استخدم نهايات الأسطر بنمط LF. يجب أن يطابق مسار Node بيئة تشغيل الدالة؛ <code>/var/lang/node20/bin/node</code> مخصص لـ Node.js 20.19.</p>
<h2 id="5-النشر">5. النشر</h2>
<p>ابنِ التطبيق، ثم انشر دالة HTTP (Node.js 20.19) باستخدام <a href="https://docs.cloudbase.net/en/cli-v1/functions/deploy"><code>CloudBase CLI</code></a>:</p>
<pre><code class="language-sh">npm run build
tcb fn deploy &lt;function-name&gt; --httpFn
</code></pre>
<p>لرفع ملف zip عبر وحدة التحكم، انظر <a href="https://docs.cloudbase.net/en/cloud-function/quickstart/httpfunc/nodejs">البدء السريع لدالة HTTP في Node.js</a>.</p>
`,c={book:s,chapter:n,chapterTitle:e,slug:a,title:o,headings:p,html:t};export{s as book,n as chapter,e as chapterTitle,c as default,p as headings,t as html,a as slug,o as title};
