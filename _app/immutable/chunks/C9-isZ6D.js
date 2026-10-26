const s="kinney",a="tailwind",n="Tailwind CSS",t="current-color",l="لون currentColor",e=[{depth:2,id:"الأدوات-المتاحة",text:"الأدوات المتاحة"},{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:2,id:"تغييرات-الافتراضيات-في-tailwind-4",text:"تغييرات الافتراضيات في Tailwind 4"},{depth:3,id:"لون-الحد",text:"لون الحد"},{depth:3,id:"لون-الحلقة",text:"لون الحلقة"},{depth:3,id:"نص-العنصر-النائب",text:"نص العنصر النائب"},{depth:2,id:"أنماط-عملية",text:"أنماط عملية"},{depth:3,id:"مكونات-تكيفية",text:"مكوّنات تكيفية"},{depth:3,id:"مكتبات-الأيقونات",text:"مكتبات الأيقونات"},{depth:3,id:"حالات-التركيز",text:"حالات التركيز"},{depth:2,id:"مع-العتامة",text:"مع العتامة"},{depth:2,id:"في-css-المخصص",text:"في CSS المخصص"},{depth:2,id:"قيم-عشوائية",text:"قيم عشوائية"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],c=`<p><code>currentColor</code> كلمة مفتاحية في CSS تعني ببساطة «استخدم لون نص العنصر». ويوفّر Tailwind أدوات لتطبيق هذا التلوين التكيفي على خصائص متعددة.</p>
<h2 id="الأدوات-المتاحة">الأدوات المتاحة</h2>
<p>تستخدم كل أدوات <code>currentColor</code> اللاحقة <code>-current</code>:</p>
<ul>
<li><code>bg-current</code> - لون الخلفية</li>
<li><code>border-current</code> - لون الحد (كل الجهات)</li>
<li><code>border-{side}-current</code> - جهات الحد الفردية</li>
<li><code>divide-current</code> - الفاصل بين الأبناء</li>
<li><code>outline-current</code> - لون المخطط</li>
<li><code>decoration-current</code> - لون زخرفة النص</li>
<li><code>fill-current</code> - لون تعبئة SVG</li>
<li><code>stroke-current</code> - لون حد SVG</li>
<li><code>caret-current</code> - لون مؤشر الإدخال</li>
<li><code>shadow-current</code> - لون ظل الصندوق</li>
<li><code>ring-current</code> - لون الحلقة (التركيز)</li>
<li><code>text-shadow-current</code> - لون ظل النص</li>
<li><code>accent-current</code> - لون تمييز عناصر النموذج</li>
</ul>
<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي <span class="content-anchor" id="basic-usage"></span></h2>
<p><em>الاستخدام الأساسي — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/750d58cf81ac992e08be1b529468d2e0c485a7c1bbe11db0092b0ed98100b34b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Border inherits text color --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-current text-blue-500&quot;</span>&gt;</span>Blue text with blue border<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- SVG icon matches text --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-green-600&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-4 w-4 fill-current&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  Green text with green icon
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h2 id="تغييرات-الافتراضيات-في-tailwind-4">تغييرات الافتراضيات في Tailwind 4</h2>
<p>يتبنّى Tailwind 4 <code>currentColor</code> في عدة افتراضيات:</p>
<h3 id="لون-الحد">لون الحد</h3>
<p><em>لون الحد — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/cdaefe9e64a8126a718878417f3f97858b19a5b601e5dc0efff45828e6af88d2.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- v3: gray-200 by default --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--Tailwind 4: currentColor by default --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border border-gray-200&quot;</span>&gt;</span>Explicit color needed<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="لون-الحلقة">لون الحلقة</h3>
<p><em>لون الحلقة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/e52d60af97eb935579a16befcb589fc8c35923003f0ccc256d37f1b69ce84538.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- v3: 3px blue ring --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ring&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--Tailwind 4: 1px currentColor --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ring-3 ring-blue-500&quot;</span>&gt;</span>Explicit width/color<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="نص-العنصر-النائب">نص العنصر النائب</h3>
<pre><code class="language-css"><span class="hljs-comment">/* v3: gray-400 */</span>
<span class="hljs-comment">/*Tailwind 4: currentColor at 50% opacity */</span>
</code></pre>
<h2 id="أنماط-عملية">أنماط عملية</h2>
<h3 id="مكونات-تكيفية">مكوّنات تكيفية</h3>
<p><em>مكوّنات تكيفية — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/58c4c601264f5734ed830187e3ce32e02a8b36e78028e7330a0b4c67679203ee.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Button adapts to parent context --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-indigo-600&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-current px-4 py-2&quot;</span>&gt;</span>Indigo bordered button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-red-600&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-current px-4 py-2&quot;</span>&gt;</span>Red bordered button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="مكتبات-الأيقونات">مكتبات الأيقونات</h3>
<p><em>مكتبات الأيقونات — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/0cab9e848fde02e6c995811def9de04e13a5cc8f844fcc8d0fdcc5e6d2f79f78.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Icons automatically match text color --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-gray-600&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inline h-5 w-5 fill-current&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  Gray icon matches text
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre>
<h3 id="حالات-التركيز">حالات التركيز</h3>
<p><em>حالات التركيز — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/cb92b86b974eecefd8e49564cf2d43035adffa3df8bce6f5a8d736ecb1ababe4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;text-blue-600 focus:ring-2 focus:ring-current focus:outline-current&quot;</span> /&gt;</span>
</code></pre>
<h2 id="مع-العتامة">مع العتامة</h2>
<p>ادمجها مع معدِّلات العتامة:</p>
<p><em>مع العتامة — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/ef4a3b2a3dae19b50bdba0a33a4d9d99333037ad6652db26e47e99fe6a6cdf5c.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;border-2 border-current/50 text-purple-600&quot;</span>&gt;</span>50% opacity purple border<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="في-css-المخصص">في CSS المخصص</h2>
<p>استخدمها في أنماطك:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.custom-quote</span> {
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">4px</span> solid currentColor;
  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--color-gray-<span class="hljs-number">700</span>);
}
</code></pre>
<h2 id="قيم-عشوائية">قيم عشوائية</h2>
<p>استخدم <code>currentColor</code> في صيغة القيم العشوائية:</p>
<p><em>قيم عشوائية — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/ca006e03274208788d4ddb9f8f5ab3e4f945cd4bed1e0a99147b4f681a8fc87e.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;shadow-[0_2px_8px_currentColor/20]&quot;</span>&gt;</span>Shadow using text color at 20% opacity<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>استخدمها للتكيّف السياقي</strong> - دع المكوّنات ترث اللون من السياق</li>
<li><strong>ممتازة للأيقونات</strong> - ملفات SVG التي ينبغي أن تطابق النص المحيط</li>
<li><strong>قلّل التكرار</strong> - اضبط لون النص مرة واحدة وطبّقه في كل مكان</li>
<li><strong>انتبه إلى الافتراضيات</strong> - يستخدم Tailwind 4 لون currentColor على نطاق أوسع</li>
<li><strong>اختبر الوراثة</strong> - تأكد من تتابع اللون كما هو متوقع</li>
</ol>
`,p={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,p as default,e as headings,c as html,t as slug,l as title};
