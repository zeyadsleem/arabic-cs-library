const e="kinney",n="tailwind",l="Tailwind CSS",i="tailwind-best-practices",o="أفضل الممارسات",c=[{depth:2,id:"اعتمد-على-مكدس-الطبقات",text:"اعتمد على مكدّس الطبقات"},{depth:2,id:"هيئ-في-css-لا-في-javascript",text:"هيّئ في CSS، لا في JavaScript"},{depth:2,id:"المتغيرات-المتجاوبة-والحالية-والحاويات",text:"المتغيّرات المتجاوبة والحالية والحاويات"},{depth:2,id:"افتراضات-إمكانية-الوصول",text:"افتراضات إمكانية الوصول"},{depth:2,id:"نظافة-الأداء",text:"نظافة الأداء"},{depth:2,id:"راقب-المستقبل",text:"راقب المستقبل"}],t=`<p>اعتبارًا من Tailwind 4 وما بعده، تتبنّى Tailwind بالكامل CSS الحديث — طبقات التسلسل، وألوان OKLCH، واستعلامات الحاويات، ومتغيّرات CSS الأصلية. يبقى الإطار بعيدًا عن طريقك إن حافظت على عقلية الأولوية للأدوات واعتمدت على التهيئة بدلًا من CSS المخصص.</p>
<h2 id="اعتمد-على-مكدس-الطبقات">اعتمد على مكدّس الطبقات</h2>
<pre><code>flowchart TD
  A[theme] --&gt; B[base]
  B --&gt; C[components]
  C --&gt; D[utilities]

  style A fill:#e1f5fe
  style B fill:#f3e5f5
  style C fill:#e8f5e8
  style D fill:#fff3e0
</code></pre>
<p>يحقن <code>@import &quot;tailwindcss&quot;;</code> الطبقات الأربع بهذا الترتيب. اكتب الشيفرة المخصصة حيث تنتمي:</p>
<ul>
<li><code>@layer theme</code> — متغيّرات رموز التصميم</li>
<li><code>@layer base</code> — إعادة ضبط العناصر والخطوط</li>
<li><code>@layer components</code> — أنماط قابلة لإعادة الاستخدام وقابلة للتجاوز</li>
<li><code>@utility</code> — مساعدات لمرة واحدة تتصرف كالأدوات الأساسية</li>
</ul>
<blockquote>
<p><strong>الأمر ليس بهذه الأهمية.</strong></p>
<p>لا تستخدم <code>!important</code> على الأدوات أبدًا — أعد النظر في موضع الطبقة.</p>
</blockquote>
<h2 id="هيئ-في-css-لا-في-javascript">هيّئ في CSS، لا في JavaScript</h2>
<p>صرّح برموز التصميم في كتل <code>@theme</code>:</p>
<ul>
<li>عرّف الرموز (<code>--color-primary</code>، <code>--spacing-4</code>، <code>--font-brand</code>) داخل <code>@theme</code> باستخدام خصائص CSS المخصصة الأصلية.</li>
<li>أعد استخدامها عبر جميع الطبقات لتنسيق من مصدر واحد للحقيقة</li>
<li>أبقِ التوثيق قريبًا من الشيفرة المستهلِكة؛ لا حاجة إلى تهيئة JavaScript.</li>
</ul>
<h2 id="المتغيرات-المتجاوبة-والحالية-والحاويات">المتغيّرات المتجاوبة والحالية والحاويات</h2>
<ul>
<li>الجوال أولًا: القاعدة الافتراضية، ثم بادئات <code>md:</code> و<code>lg:</code></li>
<li>اجمع الحالة والوسائط: <code>md:hover:bg-primary-600</code></li>
</ul>
<h2 id="افتراضات-إمكانية-الوصول">افتراضات إمكانية الوصول</h2>
<ul>
<li>استخدم <code>focus-visible:outline-none</code> بدلًا من <code>outline-none</code> لإمكانية الوصول بلوحة المفاتيح</li>
<li>مساعدات مدمجة: <code>sr-only</code>، <code>not-sr-only</code>، <code>motion-safe:*</code>، <code>selection:*</code></li>
<li>فضّل HTML الدلالي على بهلوانيات ARIA؛ فـ Tailwind ينسّق العناصر، ولا يصلح الدلالات.</li>
</ul>
<h2 id="نظافة-الأداء">نظافة الأداء</h2>
<ul>
<li>اسرد جميع مسارات القوالب في <code>content</code> لأجل tree-shaking</li>
<li>استخدم <code>safelist</code> للأصناف الديناميكية (ألوان يولّدها المستخدم)</li>
<li>فعّل <code>future: { hoverOnlyWhenSupported: true }</code> لـ CSS الحديث</li>
</ul>
<blockquote>
<p><strong>المتصفحات القديمة</strong></p>
<p>تعتمد Tailwind 4 على طبقات التسلسل. إن كان عليك دعم أي شيء أقدم من Safari 15.4 أو Chrome 99 أو Firefox 97، فابقَ على Tailwind v3.x.</p>
</blockquote>
<h2 id="راقب-المستقبل">راقب المستقبل</h2>
<p>جرّب CSS الجديد خلف استعلامات الميزات:</p>
<pre><code class="language-css"><span class="hljs-keyword">@supports</span> (<span class="hljs-attribute">background</span>: color-mix(in oklab, red <span class="hljs-number">30%</span>, white)) {
  <span class="hljs-selector-class">.link</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">color-mix</span>(in oklab, <span class="hljs-built_in">var</span>(--color-primary-<span class="hljs-number">500</span>) <span class="hljs-number">90%</span>, white);
  }
}
</code></pre>
<ul>
<li>أزل البادئات الخاصة (grid، flexbox): أهداف البناء الحديثة لا تحتاج إليها.</li>
<li>انقل الميزات المستقرة (OKLCH) إلى كتلة <code>@theme</code>.</li>
</ul>
`,s={book:e,chapter:n,chapterTitle:l,slug:i,title:o,headings:c,html:t};export{e as book,n as chapter,l as chapterTitle,s as default,c as headings,t as html,i as slug,o as title};
