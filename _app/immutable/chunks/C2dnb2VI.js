const s="hono",n="getting-started",e="مقدمات",a="vercel",p="Vercel",c=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],o=`<p>Vercel هي سحابة الذكاء الاصطناعي (AI cloud)، حيث توفر أدوات المطورين والبنية التحتية السحابية لبناء ويب أسرع وأكثر تخصيصًا وتوسيعه وتأمينه.</p>
<p>يمكن نشر Hono على Vercel دون أي تهيئة (zero-configuration).</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Vercel.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>vercel</code> قالب لهذا المثال.</p>
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
<p>سنستخدم Vercel CLI للعمل على التطبيق محليًا في الخطوة التالية. إذا لم تكن قد ثبّتته بالفعل، ثبّته عالميًا باتباع <a href="https://vercel.com/docs/cli">توثيق Vercel CLI</a>.</p>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>في <code>index.ts</code> أو <code>src/index.ts</code> من مشروعك، صدّر تطبيق Hono كتصدير افتراضي (default export).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> welcomeStrings = [
  <span class="hljs-string">&#x27;Hello Hono!&#x27;</span>,
  <span class="hljs-string">&#x27;To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono&#x27;</span>,
]

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(welcomeStrings.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n\\n&#x27;</span>))
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>إذا بدأت بـ <code>vercel</code> القَالَب، فهذا مُهيّأ لك بالفعل.</p>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>لتشغيل خادم التطوير محليًا:</p>
<pre><code class="language-sh">vercel dev
</code></pre>
<p>زيارة <code>localhost:3000</code> سيستجيب باستجابة نصية.</p>
<h2 id="4-النشر">4. النشر</h2>
<p>النشر إلى Vercel باستخدام <code>vc deploy</code>.</p>
<pre><code class="language-sh">vercel deploy
</code></pre>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<p><a href="https://vercel.com/docs/frameworks/backend/hono">تعرّف على المزيد حول Hono في توثيق Vercel</a>.</p>
`,l={book:s,chapter:n,chapterTitle:e,slug:a,title:p,headings:c,html:o};export{s as book,n as chapter,e as chapterTitle,l as default,c as headings,o as html,a as slug,p as title};
