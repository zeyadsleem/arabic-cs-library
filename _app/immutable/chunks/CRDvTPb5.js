const s="hono",n="getting-started",a="مقدمات",e="supabase-functions",p="Supabase Edge Functions",t=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:3,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:3,id:"إنشاء-مشروع-جديد",text:"إنشاء مشروع جديد"},{depth:3,id:"إضافة-دالة-edge",text:"إضافة دالة Edge"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"}],l=`<p><a href="https://supabase.com/">Supabase</a> هو بديل مفتوح المصدر لـ Firebase، يقدم مجموعة أدوات مشابهة لقدرات Firebase، بما في ذلك قاعدة البيانات والمصادقة والتخزين والآن الدوال بدون خادم (serverless functions).</p>
<p>دوال Supabase للحافة (Edge Functions) هي دوال TypeScript من جانب الخادم موزعة عالميًا، وتعمل بالقرب من مستخدميك لتحسين الأداء. تُطوَّر هذه الدوال باستخدام <a href="https://deno.com/">Deno</a>، مما يجلب العديد من الفوائد، بما في ذلك تحسين الأمان وبيئة تشغيل حديثة لـ JavaScript/TypeScript.</p>
<p>إليك كيف يمكنك البدء مع Supabase Edge Functions:</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<h3 id="المتطلبات-المسبقة">المتطلبات المسبقة</h3>
<p>قبل أن تبدأ، تأكد من تثبيت Supabase CLI. إذا لم تكن قد ثبّتته بعد، فاتبع التعليمات الواردة في <a href="https://supabase.com/docs/guides/cli/getting-started">الوثائق الرسمية</a>.</p>
<h3 id="إنشاء-مشروع-جديد">إنشاء مشروع جديد</h3>
<ol>
<li>
<p>افتح الطرفية أو موجه الأوامر.</p>
</li>
<li>
<p>أنشئ مشروع Supabase جديدًا في دليل على جهازك المحلي عن طريق تشغيل:</p>
</li>
</ol>
<pre><code class="language-bash">supabase init

</code></pre>
<p>يقوم هذا الأمر بتهيئة مشروع Supabase جديد في الدليل الحالي.</p>
<h3 id="إضافة-دالة-edge">إضافة دالة Edge</h3>
<ol start="3">
<li>داخل مشروع Supabase الخاص بك، أنشئ دالة Edge جديدة باسم <code>hello-world</code>:</li>
</ol>
<pre><code class="language-bash">supabase <span class="hljs-built_in">functions</span> new hello-world

</code></pre>
<p>ينشئ هذا الأمر دالة حافة (Edge Function) جديدة بالاسم المحدد في مشروعك.</p>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>حرِّر <code>hello-world</code> الدالة عن طريق تعديل الملف <code>supabase/functions/hello-world/index.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/hono&#x27;</span>

<span class="hljs-comment">// change this to your function name</span>
<span class="hljs-keyword">const</span> functionName = <span class="hljs-string">&#x27;hello-world&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">\`/<span class="hljs-subst">\${functionName}</span>\`</span>)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello from hono-server!&#x27;</span>))

<span class="hljs-title class_">Deno</span>.<span class="hljs-title function_">serve</span>(app.<span class="hljs-property">fetch</span>)
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>لتشغيل الدالة محلياً، استخدم الأمر التالي:</p>
<ol>
<li>استخدم الأمر التالي لتشغيل الدالة:</li>
</ol>
<pre><code class="language-bash">supabase start <span class="hljs-comment"># start the supabase stack</span>
supabase <span class="hljs-built_in">functions</span> serve --no-verify-jwt <span class="hljs-comment"># start the Functions watcher</span>
</code></pre>
<p>الـ <code>--no-verify-jwt</code> يسمح لك هذا العَلَم (flag) بتجاوز التحقق من JWT أثناء التطوير المحلي.</p>
<ol start="2">
<li>أرسل طلب GET باستخدام cURL أو Postman إلى <code>http://127.0.0.1:54321/functions/v1/hello-world/hello</code>:</li>
</ol>
<pre><code class="language-bash">curl  --location  <span class="hljs-string">&#x27;http://127.0.0.1:54321/functions/v1/hello-world/hello&#x27;</span>
</code></pre>
<p>يجب أن يُعيد هذا الطلب النص &quot;Hello from hono-server!&quot;.</p>
<h2 id="4-النشر">4. النشر</h2>
<p>يمكنك نشر جميع دوال Edge الخاصة بك في Supabase بأمر واحد:</p>
<pre><code class="language-bash">supabase <span class="hljs-built_in">functions</span> deploy
</code></pre>
<p>بدلًا من ذلك، يمكنك نشر دوال الحافة (Edge Functions) الفردية بتحديد اسم الدالة في أمر النشر:</p>
<pre><code class="language-bash">supabase <span class="hljs-built_in">functions</span> deploy hello-world

</code></pre>
<p>لمزيد من طرق النشر، تفضل بزيارة توثيق Supabase حول <a href="https://supabase.com/docs/guides/functions/deploy">النشر إلى الإنتاج</a>.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,e as slug,p as title};
