const s="kinney",n="tailwind",a="Tailwind CSS",l="how-tailwind-detects-classes",e="كيف يكتشف Tailwind الأصناف",c=[{depth:2,id:"التسجيل-الصريح-للمصادر",text:"التسجيل الصريح للمصادر"},{depth:2,id:"القائمة-الآمنة-المضمنة",text:"القائمة الآمنة المضمّنة"}],p=`<p>يفحص Tailwind مشروعك بحثًا عن أصناف الأدوات المساعدة ليولّد CSS بالحد الأدنى. وهو يحاول في الأساس إزالة كل ما لا تستخدمه وإدراج ما تستخدمه <em>فعلًا</em> فقط.</p>
<ul>
<li>يتعامل مع الملفات كنص عادي (دون تحليل شيفرة)</li>
<li>يبحث عن رموز تشبه أسماء الأصناف</li>
<li>يولّد CSS للأدوات المعروفة</li>
</ul>
<p>يفحص Tailwind كل الملفات باستثناء المعتاد:</p>
<ul>
<li>مدخلات <code>.gitignore</code></li>
<li>الملفات الثنائية (الصور، والفيديو، وملفات zip)</li>
<li>ملفات CSS</li>
<li>ملفات قفل مدير الحزم</li>
</ul>
<blockquote>
<p><strong>أسماء الأصناف الديناميكية لا تُكتشف</strong></p>
<ul>
<li><code>text-\${color}-600</code> لن يعمل</li>
<li>استخدم أسماء أصناف ثابتة كاملة</li>
<li>اربط الخصائص بأسماء أصناف كاملة، ولا تبنِها ديناميكيًا</li>
</ul>
</blockquote>
<h2 id="التسجيل-الصريح-للمصادر">التسجيل الصريح للمصادر</h2>
<p>للملفات التي يفوتها الاكتشاف التلقائي (مثل المكتبات الخارجية)، استخدم <code>@source</code> لتسجيل المسارات:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> <span class="hljs-string">&#x27;../node_modules/my-library/src/components&#x27;</span>;
</code></pre>
<p>اضبط المسار الأساسي باستخدام <code>source()</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span> source(<span class="hljs-string">&#x27;./src&#x27;</span>);
</code></pre>
<p>تجاهل المسارات باستخدام <code>@source not</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> <span class="hljs-keyword">not</span> <span class="hljs-string">&#x27;../legacy&#x27;</span>;
</code></pre>
<p>عطّل الاكتشاف التلقائي: <code>source(none)</code>.</p>
<h2 id="القائمة-الآمنة-المضمنة">القائمة الآمنة المضمّنة</h2>
<p>اجبر توليد أصناف محدّدة باستخدام <code>@source inline()</code> (يحلّ محل مصفوفة <code>safelist</code> في Tailwind 3):</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> inline(<span class="hljs-string">&#x27;inline-block&#x27;</span>);
</code></pre>
<p>ضمّن المتغيّرات:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> inline(<span class="hljs-string">&#x27;underline&#x27;</span>, <span class="hljs-string">&#x27;hover:underline&#x27;</span>, <span class="hljs-string">&#x27;focus:underline&#x27;</span>);
</code></pre>
<p>أو استخدم توسيع الأقواس:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> inline(<span class="hljs-string">&#x27;{hover:,focus:,}underline&#x27;</span>);
</code></pre>
<p>ولّد نطاقات:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> inline(<span class="hljs-string">&#x27;{hover:,}bg-red-{100..900 by 100,50,950}&#x27;</span>);
</code></pre>
<p>استثنِ الأصناف باستخدام <code>@source not inline()</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">@source</span> <span class="hljs-keyword">not</span> inline(<span class="hljs-string">&#x27;{hover:,focus:,}bg-red-{100..900,50,950}&#x27;</span>);
</code></pre>
`,i={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:c,html:p};export{s as book,n as chapter,a as chapterTitle,i as default,c as headings,p as html,l as slug,e as title};
