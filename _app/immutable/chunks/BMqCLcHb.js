const e="kinney",s="tailwind",n="Tailwind CSS",a="tailwind-transition",o="الانتقالات",t=[{depth:2,id:"تطبيق-انتقالات-css",text:"تطبيق انتقالات CSS"},{depth:2,id:"التحكم-في-خصائص-الانتقال",text:"التحكّم في خصائص الانتقال"},{depth:2,id:"المدة-والتوقيت-والتأخير",text:"المدة والتوقيت والتأخير"},{depth:3,id:"المدة",text:"المدة"},{depth:3,id:"دالة-التوقيت-التسارع",text:"دالة التوقيت (التسارع)"},{depth:3,id:"التأخير",text:"التأخير"},{depth:2,id:"خصائص-وميزات-محددة",text:"خصائص وميزات محدّدة"},{depth:2,id:"تنسيق-العناصر-الخاملة-inert",text:"تنسيق العناصر الخاملة (inert)"},{depth:2,id:"الانتقالات-مع-مبدلات-أخرى",text:"الانتقالات مع مُبدّلات أخرى"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"تخصيص-قيم-الانتقال",text:"تخصيص قيم الانتقال"}],c=`<p>تُحرّك انتقالات CSS تغيّرات خصائص CSS بمرور الوقت، فتُنتج تأثيرات سلسة مثل تلاشي العناصر أو تغيّر الألوان أو تغيّر التخطيط. ويوفّر Tailwind أصنافًا مساعِدة لتطبيق الانتقالات مباشرةً داخل HTML.</p>
<h2 id="تطبيق-انتقالات-css">تطبيق انتقالات CSS</h2>
<p>طَبِّق الانتقالات باستخدام الصنف المساعد <code>transition</code>. هذا يطلب من المتصفح تحريك تغيّرات الخصائص بدلًا من إجرائها فورًا.</p>
<p>الصنف المساعد <code>transition</code> الأساسي يفعّل الانتقالات للخصائص الشائعة: اللون، ولون الخلفية، ولون الحدّ، ولون زخرفة النص، والتعبئة (fill)، والخطّ (stroke)، ومحطّات التدرّج، والعتامة، وظلّ الصندوق، والتحويل (transform)، والإزاحة (translate)، والتحجيم (scale)، والدوران (rotate)، والفلتر (filter). وهو يضبط دالة توقيت افتراضية (<code>cubic-bezier(0.4, 0, 0.2, 1)</code>) ومدةً افتراضية (<code>150ms</code>).</p>
<p>يوفّر Tailwind أصنافًا مساعِدة لمجموعات خصائص محدّدة:</p>
<ul>
<li><code>transition-all</code>: ينتقل بكل الخصائص القابلة للتحريك</li>
<li><code>transition-colors</code>: ينتقل بالخصائص المتعلقة بالألوان (<code>color</code>، <code>background-color</code>، <code>border-color</code>، إلخ)</li>
<li><code>transition-opacity</code>: ينتقل بـ<code>opacity</code> وحدها</li>
<li><code>transition-shadow</code>: ينتقل بـ<code>box-shadow</code> وحدها</li>
<li><code>transition-transform</code>: ينتقل بخصائص التحويل (<code>transform</code>، <code>translate</code>، <code>scale</code>، <code>rotate</code>)</li>
<li><code>transition-none</code>: يمنع أي انتقالات</li>
</ul>
<p>مثال:</p>
<p><em>تطبيق انتقالات CSS — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/db42a4e0a57cc4e7cc5718eba87df9530a1751e6adfa8536512f98ab9825f306.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-500 transition hover:bg-red-500&quot;</span>&gt;</span>Hover over me<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>هنا، يُحرّك <code>transition</code> تغيّرات الخصائص، ويحدّد <code>hover:bg-red-500</code> لون الخلفية الهدف عند التحويم (hover).</p>
<h2 id="التحكم-في-خصائص-الانتقال">التحكّم في خصائص الانتقال</h2>
<p>للتحكّم الدقيق، استخدم الأصناف <code>transition-*</code> مثل <code>transition-colors</code> أو <code>transition-transform</code> لاستهداف مجموعات خصائص محدّدة.</p>
<p>أمّا الخصائص غير الموجودة في المجموعات المحدّدة مسبقًا، فاستخدم القيم التعسّفية بصيغة <code>transition-[&lt;value&gt;]</code>:</p>
<p><em>التحكّم في خصائص الانتقال — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/db0dd92eaa3a1fda4cd80ae9ea619172baab49112ebe80603022339854725362.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;h-10 w-10 transition-[width,height] hover:h-20 hover:w-20&quot;</span>&gt;</span>Resize me<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>ويمكنك الإشارة إلى متغيّرات CSS المرجعية بصيغة <code>transition-(&lt;custom-property&gt;)</code>.</p>
<h2 id="المدة-والتوقيت-والتأخير">المدة والتوقيت والتأخير</h2>
<p>تحكّم في طول الانتقال، وفي كيف يحدث، وفي متى يحدث.</p>
<h3 id="المدة">المدة</h3>
<p>تحدّد المدة طول الحركة:</p>
<ul>
<li><code>duration-&lt;number&gt;</code>: تضبط المدة بالمللي ثانية (<code>duration-150</code>، <code>duration-700</code>)</li>
<li><code>duration-initial</code>: تضبط القيمة الأولية</li>
<li><code>duration-(&lt;custom-property&gt;)</code>: تستخدم متغيّر CSS</li>
<li><code>duration-[&lt;value&gt;]</code>: تستخدم قيمة CSS تعسّفية</li>
</ul>
<p><em>المدة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/d5f85d3c312db16e0d47e3285f57e2b2064939284ced8f00d0ac9ee8864b05fd.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-500 transition duration-500 hover:bg-red-500&quot;</span>&gt;</span>
  Hover over me (500ms transition)
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="دالة-التوقيت-التسارع">دالة التوقيت (التسارع)</h3>
<p>تتحكّم في منحنى التسارع:</p>
<ul>
<li><code>ease-linear</code>: سرعة ثابتة</li>
<li><code>ease-in</code>: يبدأ ببطء ثم يتسارع (<code>cubic-bezier(0.4, 0, 1, 1)</code>)</li>
<li><code>ease-out</code>: يبدأ بسرعة ثم يتباطأ (<code>cubic-bezier(0, 0, 0.2, 1)</code>)</li>
<li><code>ease-in-out</code>: يبدأ ببطء، ويتسارع، وينتهي ببطء (<code>cubic-bezier(0.4, 0, 0.2, 1)</code>) - وهو الافتراضي لـ<code>transition</code></li>
<li><code>ease-initial</code>: تضبط القيمة الأولية</li>
<li><code>ease-(&lt;custom-property&gt;)</code>: تستخدم متغيّر CSS</li>
<li><code>ease-[&lt;value&gt;]</code>: تستخدم قيمة تعسّفية لدوال <code>cubic-bezier</code> المخصّصة</li>
</ul>
<p><em>دالة التوقيت (التسارع) — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/5c01fe22540acf2564c485a7d62dfbb38385b9e12187c362331c1ab4955ea1b4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-green-500 transition duration-300 ease-in-out hover:bg-yellow-500&quot;</span>&gt;</span>
  Hover over me (ease-in-out)
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="التأخير">التأخير</h3>
<p>يحدّد مدّة الانتظار قبل بدء الانتقال:</p>
<ul>
<li><code>delay-&lt;number&gt;</code>: يضبط التأخير بالمللي ثانية (<code>delay-150</code>، <code>delay-700</code>)</li>
<li><code>delay-(&lt;custom-property&gt;)</code>: يستخدم متغيّر CSS</li>
<li><code>delay-[&lt;value&gt;]</code>: يستخدم قيمة CSS تعسّفية</li>
</ul>
<p><em>التأخير — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/1e7693c5cae7fb6797c7593bced57d8fba9a6d72e1164e8e167d122416072f8d.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-purple-500 transition delay-150 duration-300 hover:bg-orange-500&quot;</span>&gt;</span>
  Hover over me (150ms delay)
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="خصائص-وميزات-محددة">خصائص وميزات محدّدة</h2>
<p>يوفّر Tailwind أصنافًا مساعِدة للانتقال بين خصائص CSS بعينها:</p>
<ul>
<li><strong>التحويلات (transforms)</strong>: استخدم <code>transition-transform</code> مع <code>rotate-*</code> و<code>scale-*</code> و<code>translate-*</code> و<code>skew-*</code>. واستخدم <code>transform-gpu</code> لإجبار التسريع العتادي أو <code>transform-cpu</code> للرجوع عنه. واضبط <code>transform-origin</code> و<code>transform-style</code> للتحويلات ثلاثية الأبعاد.</li>
<li><strong>الفلاتر (filters)</strong>: انتقل بالفلاتر مثل <code>blur-*</code> و<code>brightness-*</code> و<code>contrast-*</code> و<code>drop-shadow-*</code>، إلخ. ويشمل <code>transition</code> الأساسي خصائص الفلتر. وأزِله بـ<code>filter-none</code>.</li>
<li><strong>ظلال الصندوق</strong>: تُعالَج بواسطة <code>transition-shadow</code> أو <code>transition</code> الأساسي.</li>
<li><strong>التدرّجات</strong>: مدعومة في <code>transition</code> الأساسي وفي <code>transition-colors</code>. وفي Tailwind 4، تستيفى التدرّجات في فضاء الألوان <code>oklab</code> افتراضيًا.</li>
<li><strong>الخصائص المتقطّعة (discrete)</strong>: استخدم <code>transition-discrete</code> للخصائص التي تتغيّر فورًا عادةً (<code>display</code>، <code>visibility</code>).</li>
</ul>
<h2 id="تنسيق-العناصر-الخاملة-inert">تنسيق العناصر الخاملة (inert)</h2>
<p>تضع السمة <code>inert</code> في HTML علامةً على العناصر على أنها غير تفاعلية. واستخدم مُبدّل <code>inert</code> لتنسيق هذه العناصر وتحريك تغيّرات حالتها.</p>
<p><em>تنسيق العناصر الخاملة — المثال 6 — <a href="https://stevekinney.com/generated/playgrounds/2a268adbcd5a58282bc5ef3d98fdce3a06da76a175a6f5a6995eff804f60ee91.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;opacity-100 transition-opacity duration-300 inert:opacity-50&quot;</span> <span class="hljs-attr">inert</span>&gt;</span>
  Content that fades when inert
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يُحرّك الانتقال تغيّرات العتامة بسلاسة عند تبديل السمة <code>inert</code>.</p>
<p><em>تنسيق العناصر الخاملة — المثال 7 — <a href="https://stevekinney.com/generated/playgrounds/165e61978bff924a5a35ae2ebe03b7ef3be7ebb3b9f20f7cf1d5ef62efc0aaa5.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer transition-all duration-200 inert:cursor-not-allowed&quot;</span> <span class="hljs-attr">inert</span>&gt;</span>
  Inert Button
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<h2 id="الانتقالات-مع-مبدلات-أخرى">الانتقالات مع مُبدّلات أخرى</h2>
<p>اجمع أصناف الانتقال مع مُبدّلات الحالة (<code>hover</code>، <code>focus</code>، <code>active</code>، <code>disabled</code>، <code>checked</code>، <code>group-hover</code>، <code>peer-focus</code>) ومع مُبدّلات الاستجابة (<code>sm:</code>، <code>md:</code>، <code>@container</code>).</p>
<p>طَبِّق الانتقال عند التحويم فقط:</p>
<p><em>الانتقالات مع مُبدّلات أخرى — المثال 8 — <a href="https://stevekinney.com/generated/playgrounds/593bb2c21a204257321d8fb3373b5b8244b1118067b878e1c907af409546655b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-500 hover:bg-red-500 hover:transition-colors hover:duration-300&quot;</span>&gt;</span>
  Transitions only on hover
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>والأكثر شيوعًا، طَبِّق <code>transition</code> في الحالة الافتراضية لحركتي الدخول والخروج:</p>
<p><em>الانتقالات مع مُبدّلات أخرى — المثال 9 — <a href="https://stevekinney.com/generated/playgrounds/b940969372352290865afcbc8c28e7447f1b7f17b340b07f5b23b109073b90f7.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-blue-500 transition-colors duration-300 hover:bg-red-500&quot;</span>&gt;</span>
  Transitions on hover in and out
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>واجمع المُبدّلات معًا للحصول على انتقالات شرطية:</p>
<p><em>الانتقالات مع مُبدّلات أخرى — المثال 10 — <a href="https://stevekinney.com/generated/playgrounds/f582139e47d24c64c36149085e9ef0bf82fa14bcfa6c05eacd685184d6bf44e7.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;transition-colors duration-300 md:hover:bg-red-500&quot;</span>&gt;</span>
  Background changes on hover from medium screens up
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>تخبر خاصية CSS <code>will-change</code> المتصفحات بأنّ عنصرًا ما سيتغيّر، فتسمح بالتحسين. ويوفّر Tailwind أصنافًا مساعِدة:</p>
<ul>
<li><code>will-change-auto</code></li>
<li><code>will-change-scroll</code></li>
<li><code>will-change-contents</code></li>
<li><code>will-change-transform</code></li>
<li><code>will-change-(&lt;custom-property&gt;)</code></li>
<li><code>will-change-[&lt;value&gt;]</code></li>
</ul>
<p>طَبِّقها قبل بدء الحركة مباشرةً وأزِلها بعد انتهائها. والإفراط في استخدامها قد يضرّ بالأداء.</p>
<p>وبالنسبة للتحويلات والعتامة، يمكن للتسريع العتادي أن يحسّن الأداء. فاستخدم <code>transform-gpu</code> لإجبار التسريع العتادي أو <code>transform-cpu</code> للرجوع عنه.</p>
<h2 id="تخصيص-قيم-الانتقال">تخصيص قيم الانتقال</h2>
<p>خصّص قيم الانتقال باستخدام متغيّرات CSS داخل التوجيه <code>@theme</code>:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--duration-long</span>: <span class="hljs-number">1000ms</span>;
  <span class="hljs-attr">--ease-custom</span>: <span class="hljs-built_in">cubic-bezier</span>(<span class="hljs-number">0.25</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">1</span>);
}
</code></pre>
<p>يتيح هذا أصنافًا مثل <code>duration-long</code> و<code>ease-custom</code>. وتُتجاوز القيم الافتراضية بإعادة تعريف المتغيّرات بالاسم نفسه.</p>
<p>ويجعل هذا الأسلوب في الإعداد، الذي يبدأ من CSS، رموز التصميم (design tokens) متّسقة مع موضع استخدامها، فيبدو Tailwind أكثر ألفةً بـCSS.</p>
`,l={book:e,chapter:s,chapterTitle:n,slug:a,title:o,headings:t,html:c};export{e as book,s as chapter,n as chapterTitle,l as default,t as headings,c as html,a as slug,o as title};
