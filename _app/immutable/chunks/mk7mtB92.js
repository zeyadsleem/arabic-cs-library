const s="kinney",a="tailwind",n="Tailwind CSS",l="flexbox-alignment",t="المحاذاة",e=[{depth:2,id:"محاذاة-المحور-الرئيسي",text:"محاذاة المحور الرئيسي"},{depth:2,id:"محاذاة-المحور-المتقاطع",text:"محاذاة المحور المتقاطع"},{depth:2,id:"المحاذاة-الفردية",text:"المحاذاة الفردية"},{depth:2,id:"محاذاة-متعددة-الأسطر",text:"محاذاة متعددة الأسطر"}],p=`<p>يوفّر Flexbox خيارات محاذاة قوية على المحورين الرئيسي والمتقاطع.</p>
<h2 id="محاذاة-المحور-الرئيسي">محاذاة المحور الرئيسي</h2>
<p>تحكّم في التوزيع على المحور الرئيسي بأدوات <code>justify-*</code>:</p>
<ul>
<li><code>justify-start</code> - تحزيم العناصر في البداية (افتراضي)</li>
<li><code>justify-end</code> - تحزيم العناصر في النهاية</li>
<li><code>justify-center</code> - توسيط العناصر</li>
<li><code>justify-between</code> - مسافة متساوية بين العناصر</li>
<li><code>justify-around</code> - مسافة متساوية حول العناصر</li>
<li><code>justify-evenly</code> - مسافة متساوية بين العناصر والحواف</li>
</ul>
<p><em>محاذاة المحور الرئيسي — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/f36a0f6b28818f4f69ffb94f6e5680d462948522bc7d02437e15617b740371a3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Center navigation items --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex justify-center gap-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600&quot;</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600&quot;</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Space between items --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex justify-between rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600&quot;</span>&gt;</span>Previous<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-center font-medium text-gray-700&quot;</span>&gt;</span>Page 1 of 10<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600&quot;</span>&gt;</span>Next<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="محاذاة-المحور-المتقاطع">محاذاة المحور المتقاطع</h2>
<p>حاذِ العناصر عموديًا على المحور الرئيسي:</p>
<ul>
<li><code>items-start</code> - محاذاة إلى بداية المحور المتقاطع</li>
<li><code>items-end</code> - محاذاة إلى نهاية المحور المتقاطع</li>
<li><code>items-center</code> - توسيط على المحور المتقاطع</li>
<li><code>items-baseline</code> - محاذاة خطوط أساس النص</li>
<li><code>items-stretch</code> - تمدّد للملء (افتراضي)</li>
</ul>
<p><em>محاذاة المحور المتقاطع — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/2c5a1069aa947db4bd498c6fd6297cc03ff59bf8997b13edbd48a0f610aa0014.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Vertically center items --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-20 items-center gap-3 rounded-lg bg-gray-100 px-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-8 w-8 flex-shrink-0 rounded-full bg-blue-500&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;font-medium text-gray-700&quot;</span>&gt;</span>Centered content<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="المحاذاة-الفردية">المحاذاة الفردية</h2>
<p>تجاوز محاذاة الحاوية لعناصر محددة:</p>
<ul>
<li><code>self-auto</code> - استخدام محاذاة الحاوية</li>
<li><code>self-start</code> - محاذاة العنصر إلى البداية</li>
<li><code>self-end</code> - محاذاة العنصر إلى النهاية</li>
<li><code>self-center</code> - توسيط العنصر</li>
<li><code>self-stretch</code> - تمديد العنصر</li>
</ul>
<p><em>المحاذاة الفردية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/1fd4665b46d42e404e5e48bd7f1566bedfdc62b055472d26f21e6f126ca68542.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-32 items-start gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-500 p-3 text-white&quot;</span>&gt;</span>Top aligned<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-center rounded bg-green-500 p-3 text-white&quot;</span>&gt;</span>Centered<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;self-end rounded bg-blue-500 p-3 text-white&quot;</span>&gt;</span>Bottom aligned<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="محاذاة-متعددة-الأسطر">محاذاة متعددة الأسطر</h2>
<p>لعناصر flex الملتفة، حاذِ الأسطر كاملة:</p>
<ul>
<li><code>content-start</code> - حزم الأسطر في البداية</li>
<li><code>content-end</code> - حزم الأسطر في النهاية</li>
<li><code>content-center</code> - توسيط الأسطر</li>
<li><code>content-between</code> - مسافة بين الأسطر</li>
<li><code>content-around</code> - مسافة حول الأسطر</li>
<li><code>content-evenly</code> - تباعد متساوٍ</li>
</ul>
<p><em>محاذاة متعددة الأسطر — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/134b2ae712f7c4bd0790cb7dbc3d51e3b4a45dd404f5b6829227f04c057e87e2.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;flex h-64 flex-wrap content-center gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-20 w-32 rounded bg-purple-500 p-4 text-white&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-20 w-32 rounded bg-pink-500 p-4 text-white&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-20 w-32 rounded bg-indigo-500 p-4 text-white&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-20 w-32 rounded bg-blue-500 p-4 text-white&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-20 w-32 rounded bg-green-500 p-4 text-white&quot;</span>&gt;</span>Item 5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
