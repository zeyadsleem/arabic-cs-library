const s="kinney",a="tailwind",n="Tailwind CSS",l="styling-form-state",t="المزيد من تحسينات تنسيق حالة النماذج",e=[{depth:3,id:"المتغيرات-المتاحة",text:"المتغيّرات المتاحة"},{depth:2,id:"تنسيق-عناصر-النماذج",text:"تنسيق عناصر النماذج"},{depth:3,id:"النص-النائب",text:"النص النائب"},{depth:3,id:"حقول-الملفات",text:"حقول الملفات"},{depth:3,id:"مؤشر-النص",text:"مؤشر النص"},{depth:2,id:"أدوات-النماذج",text:"أدوات النماذج"},{depth:3,id:"إعادة-ضبط-أنماط-المتصفح",text:"إعادة ضبط أنماط المتصفح"},{depth:3,id:"التحكم-في-تحديد-النص",text:"التحكم في تحديد النص"},{depth:3,id:"سلوك-تغيير-الحجم",text:"سلوك تغيير الحجم"},{depth:2,id:"تحديثات-tailwind-4",text:"تحديثات Tailwind 4"}],p=`<p>يمكنك تنسيق عناصر النماذج بناءً على حالتها دون منطق شرطي.</p>
<p><em>المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/0f944cb323b9cbbdac875e608f147183c87e9e6bafe0b7e49b3fcc2417619c3f.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-400 invalid:outline-red-500 disabled:cursor-not-allowed disabled:bg-gray-100&quot;</span>
/&gt;</span>
</code></pre>
<h3 id="المتغيرات-المتاحة">المتغيّرات المتاحة</h3>
<ul>
<li><code>required:</code></li>
<li><code>invalid:</code> / <code>valid:</code>: حالة التحقق من الإدخال.</li>
<li><code>user-invalid:</code> و<code>user-valid:</code>: يفحص الصحة <em>بعد</em> تفاعل المستخدم مع الحقل.</li>
<li><code>in-range:</code> و<code>out-of-range:</code>: للاستخدام مع حقول الأرقام</li>
<li><code>disabled:</code> و<code>enabled:</code></li>
<li><code>read-only:</code>: الحقول التي تكون… للقراءة فقط.</li>
<li><code>checked:</code>: مربعات الاختيار/أزرار الاختيار</li>
<li><code>indeterminate:</code>: اختيار جزئي مع مربعات الاختيار.</li>
<li><code>optional:</code>: الحقول غير المطلوبة.</li>
<li><code>placeholder-shown:</code>: أنماط عندما يكون النص النائب مرئيًا.</li>
<li><code>autofill:</code>: الحقول التي ملأها المتصفح تلقائيًا.</li>
<li><code>focus:</code> / <code>focus-visible:</code> / <code>focus-within:</code>: <a href="https://stevekinney.com/courses/tailwind/focus-states">حالات التركيز</a></li>
</ul>
<h2 id="تنسيق-عناصر-النماذج">تنسيق عناصر النماذج</h2>
<h3 id="النص-النائب">النص النائب</h3>
<p><em>النص النائب — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/38798eaa0e52d336bc1fdca80c75f2c4b65c87b885055ccafc761cf4364a6ac7.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-400 placeholder:italic&quot;</span>
/&gt;</span>
</code></pre>
<h3 id="حقول-الملفات">حقول الملفات</h3>
<p><em>حقول الملفات — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/8c004bb37631e0b89251744317062fb731a4997b0887625bf92fa40ba3e79967.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-600 dark:file:text-indigo-100 dark:hover:file:bg-indigo-500&quot;</span>
/&gt;</span>
</code></pre>
<h3 id="مؤشر-النص">مؤشر النص</h3>
<p><em>مؤشر النص — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/d570037265e2c7e6bcebd2268f2afe7aa6f76a1b3044cb7fdb25091acda902b3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-md bg-white px-3 py-1.5 caret-pink-500 outline-2 outline-slate-400&quot;</span> /&gt;</span>
</code></pre>
<h2 id="أدوات-النماذج">أدوات النماذج</h2>
<h3 id="إعادة-ضبط-أنماط-المتصفح">إعادة ضبط أنماط المتصفح</h3>
<p><em>إعادة ضبط أنماط المتصفح — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/bc42508d7caaf3b69c83459c077888ea695f91c7569beec063a390017853ac25.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;b w-fullg-white block appearance-none rounded-md px-3 py-2 pr-8 outline-2 outline-slate-400 focus:border-blue-500 focus:outline-pink-400&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;&quot;</span>&gt;</span>Choose an option<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;option1&quot;</span>&gt;</span>Option 1<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;option2&quot;</span>&gt;</span>Option 2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;option3&quot;</span>&gt;</span>Option 3<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
</code></pre>
<h3 id="التحكم-في-تحديد-النص">التحكم في تحديد النص</h3>
<p><em>التحكم في تحديد النص — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/71fd9217266eb04012e39416eb54582070b292c24c443f4c1bbf95963e95f1b2.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;b w-fullg-white block rounded-md px-3 py-2 outline-2 outline-slate-400 select-all focus:outline-pink-400&quot;</span>
  &gt;</span>
    This text will be selected when clicked
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;b w-fullg-white block rounded-md px-3 py-2 outline-2 outline-slate-400 select-none focus:outline-pink-400&quot;</span>
  &gt;</span>
    This text cannot be selected
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;b w-fullg-white block rounded-md px-3 py-2 outline-2 outline-slate-400 select-text focus:outline-pink-400&quot;</span>
  &gt;</span>
    This text can be selected normally
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="سلوك-تغيير-الحجم">سلوك تغيير الحجم</h3>
<p><em>سلوك تغيير الحجم — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/c6c6943f01ced5830d6b5cf4e54c8a607a347f0e17ce9180fdc2c4e8a007b0fc.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full resize-none rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Cannot be resized&quot;</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full resize-y rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Resize vertically only&quot;</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full resize-x rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Resize horizontally only&quot;</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
    <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;block w-full resize rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400&quot;</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Resize in both directions&quot;</span>
  &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="تحديثات-tailwind-4">تحديثات Tailwind 4</h2>
<ul>
<li><strong>تحجيم الحقول:</strong> <code>field-sizing-content</code> (نمو تلقائي) أو <code>field-sizing-fixed</code></li>
<li><strong>لون النص النائب:</strong> الآن بعتامة 50% من لون النص (كان gray-400)</li>
<li><strong>مؤشر الأزرار:</strong> الافتراضي <code>cursor-default</code> (كان pointer)</li>
<li><strong>المحيط:</strong> <code>outline-hidden</code> يحافظ على المحيط في وضع الألوان الإجبارية</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
