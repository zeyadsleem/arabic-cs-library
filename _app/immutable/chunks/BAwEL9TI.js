const s="kinney",a="tailwind",n="Tailwind CSS",t="spacing-and-dividing-utilities",l="أدوات التباعد والفصل",p=[{depth:2,id:"المسافة",text:"المسافة"},{depth:3,id:"التباعد-الرأسي",text:"التباعد الرأسي"},{depth:3,id:"التباعد-الأفقي",text:"التباعد الأفقي"},{depth:2,id:"الفصل",text:"الفصل"},{depth:2,id:"المقارنة-والتباين",text:"المقارنة والتباين"},{depth:3,id:"كل-من-space-و-divide",text:"كل من space و divide"},{depth:3,id:"space",text:"space"},{depth:3,id:"divide",text:"divide"}],e=`<h2 id="المسافة">المسافة</h2>
<p>تضيف أداة <code>space-</code> هوامش ثابتة بين العناصر التابعة.</p>
<blockquote>
<p><strong>إنها مجرد اختصار</strong></p>
<p>يضيف <code>space</code> هوامش إلى كل العناصر التابعة عدا الأخير.</p>
</blockquote>
<ul>
<li><strong>الاتجاه</strong>: <code>space-x-{n}</code> (أفقي)، <code>space-y-{n}</code> (رأسي)</li>
<li><strong>بلا حواف خارجية</strong>: لا تؤثر على هوامش العنصر الأول أو الأخير</li>
</ul>
<h3 id="التباعد-الرأسي">التباعد الرأسي</h3>
<p><em>التباعد الرأسي — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/7e0f2e5e6889514a9d1a2b1fa8748eab558f05c6840d7f0ebf7865a87e8fcbc3.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-y-4 bg-sky-100 px-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-fuchsia-600 bg-fuchsia-500 text-center&quot;</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-fuchsia-600 bg-fuchsia-500 text-center&quot;</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-fuchsia-600 bg-fuchsia-500 text-center&quot;</span>&gt;</span>Third<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-fuchsia-600 bg-fuchsia-500 text-center&quot;</span>&gt;</span>Fourth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="التباعد-الأفقي">التباعد الأفقي</h3>
<p><em>التباعد الأفقي — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/a94c30cee9d37fbb10d7bc364d9c499482f9a53727a290c017e62fffaef2821b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-x-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md&quot;</span>&gt;</span>
    Button
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md&quot;</span>&gt;</span>
    Button
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md&quot;</span>&gt;</span>
    Button
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هذا ما تفعله <em>حقًا</em> تحت الغطاء:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.space-y-4</span> &gt; * + * {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1rem</span>;
}
</code></pre>
<ul>
<li><strong>استخدمها من أجل:</strong> القوائم وتخطيطات الصفوف والأعمدة ذات التباعد المتساوي.</li>
<li><strong>القيود:</strong> تباعد ثابت فقط، بلا هوامش خارجية.</li>
</ul>
<blockquote>
<p><strong>لماذا لا تستخدم flexbox ببساطة؟</strong></p>
<p>يحافظ <code>space-y-*</code> على تدفق المستند الطبيعي بينما ينشئ flexbox سياق تنسيق مرنًا. مع Flexbox يصبح كل شيء عنصرًا مرنًا، ما قد يؤثر على كيفية تدفق النص وسلوك القوائم وغير ذلك.</p>
<p>لكن بصراحة، على الأرجح أن الأمر لا يهم.</p>
</blockquote>
<h2 id="الفصل">الفصل</h2>
<p>تضيف أداة <code>divide</code> حدودًا بين العناصر التابعة بوصفها فواصل.</p>
<p><em>الفصل — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/acd410a0819dd82c39fd2cad8281f39da157d6fbdf047047eae9412509b0b77c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;divide-y-4 bg-sky-100 px-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>Third<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>Fourth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>خصّص السماكة واللون:</p>
<p><em>الفصل — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/c73cc306f1ab150e0a9911ce9888b1ad77fb29e430c7fb374559441939bbed8b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;divide-y-4 divide-cyan-400 bg-sky-100 px-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>First<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>Second<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>Third<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-fuchsia-500 text-center&quot;</span>&gt;</span>Fourth<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="المقارنة-والتباين">المقارنة والتباين</h2>
<h3 id="كل-من-space-و-divide">كل من space <em>و</em> divide</h3>
<ul>
<li>تدير التباعد بين العناصر التابعة</li>
<li>تدعم المتغيّرات المتجاوبة</li>
<li>تمتلك اتجاهي <code>-x</code> و<code>-y</code></li>
<li>قابلة للتخصيص عبر <code>@theme</code></li>
</ul>
<h3 id="space">space</h3>
<ul>
<li>تضيف <strong>هوامش</strong> بين العناصر</li>
<li>تؤثر على كل العناصر التابعة (بما فيها الأول والأخير)</li>
<li>مثال: <code>space-x-4</code></li>
</ul>
<h3 id="divide">divide</h3>
<ul>
<li>تضيف <strong>حدودًا</strong> بوصفها فواصل</li>
<li>تتخطى الحافتين الأولى والأخيرة تلقائيًا</li>
<li>لونها ونمطها قابلان للتخصيص</li>
<li>مثال: <code>divide-x-2 divide-gray-300</code></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
