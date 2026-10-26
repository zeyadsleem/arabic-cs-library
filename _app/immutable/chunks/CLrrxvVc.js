const e="kinney",o="tailwind",d="Tailwind CSS",t="built-in-animations",c="الحركات المدمجة",n=[{depth:2,id:"خصائص-التحويل-الأساسية",text:"خصائص التحويل الأساسية"},{depth:3,id:"الخاصية-transform",text:"الخاصية transform"},{depth:3,id:"الخاصية-transform-origin",text:"الخاصية transform-origin"},{depth:3,id:"الخاصية-transform-style",text:"الخاصية transform-style"},{depth:3,id:"الخاصية-perspective",text:"الخاصية perspective"},{depth:3,id:"الخاصية-perspective-origin",text:"الخاصية perspective-origin"},{depth:2,id:"أصناف-tailwind-المساعدة-للتحويل",text:"أصناف Tailwind المساعِدة للتحويل"},{depth:3,id:"تفعيل-التحويلات",text:"تفعيل التحويلات"},{depth:3,id:"إزاحة-العناصر",text:"إزاحة العناصر"},{depth:3,id:"تدوير-العناصر",text:"تدوير العناصر"},{depth:3,id:"تحجيم-العناصر",text:"تحجيم العناصر"},{depth:3,id:"إمال-العناصر",text:"إمال العناصر"},{depth:2,id:"ضبط-نقطة-أصل-التحويل",text:"ضبط نقطة أصل التحويل"},{depth:2,id:"العمل-مع-التحويلات-ثلاثية-الأبعاد",text:"العمل مع التحويلات ثلاثية الأبعاد"},{depth:2,id:"دمج-التحويلات",text:"دمج التحويلات"},{depth:2,id:"التحويلات-الشرطية",text:"التحويلات الشرطية"},{depth:3,id:"مبدلات-الاستجابة",text:"مُبدّلات الاستجابة"},{depth:3,id:"مبدلات-الحالة",text:"مُبدّلات الحالة"},{depth:3,id:"مبدلات-أخرى",text:"مُبدّلات أخرى"},{depth:2,id:"تخصيص-التحويلات",text:"تخصيص التحويلات"},{depth:3,id:"تخصيص-قيم-السمة",text:"تخصيص قيم السمة"},{depth:3,id:"استخدام-القيم-التعسفية",text:"استخدام القيم التعسّفية"},{depth:3,id:"استخدام-متغيرات-السمة-في-css-المخصص",text:"استخدام متغيّرات السمة في CSS المخصّص"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:2,id:"إزالة-التحويلات",text:"إزالة التحويلات"}],i=`<p>تضيف تحويلات CSS (الدوران، والتحجيم، والإمالة، والإزاحة) حضورًا بصريًا لواجهات المستخدم. ويوفّر Tailwind CSS أصنافًا مساعِدة لهذه الخصائص، فتسمح لك بتطبيقها مباشرةً داخل HTML.</p>
<h2 id="خصائص-التحويل-الأساسية">خصائص التحويل الأساسية</h2>
<p>فهم خصائص CSS هذه هو مفتاح استخدام التحويلات:</p>
<h3 id="الخاصية-transform">الخاصية <code>transform</code></h3>
<p>تطبّق هذه الخاصية دوال التحويل (مثل <code>rotate()</code>، <code>scale()</code>). وتضبطها أصناف Tailwind، وغالبًا باستخدام متغيّرات CSS لدمج عدة تأثيرات.</p>
<h3 id="الخاصية-transform-origin">الخاصية <code>transform-origin</code></h3>
<p>تنشأ التحويلات من مركز العنصر افتراضيًا. وتغيّر <code>transform-origin</code> هذه النقطة. ويوفّر Tailwind أصنافًا مساعِدة للتحكّم فيها.</p>
<h3 id="الخاصية-transform-style">الخاصية <code>transform-style</code></h3>
<p>في التحويلات ثلاثية الأبعاد، تحدّد <code>transform-style</code> على عنصر أب ما إذا كانت العناصر الفرعية في فضاء ثلاثي الأبعاد (<code>preserve-3d</code>) أم مسطّحة (<code>flat</code>). ويوفّر Tailwind أصنافًا مساعِدة لذلك.</p>
<h3 id="الخاصية-perspective">الخاصية <code>perspective</code></h3>
<p>للتأثيرات ثلاثية الأبعاد، تضبط <code>perspective</code> على عنصر أب منظورًا لعناصره الفرعية، فتؤثّر في العمق المُدرَك. ويملك Tailwind أصنافًا مساعِدة لذلك.</p>
<h3 id="الخاصية-perspective-origin">الخاصية <code>perspective-origin</code></h3>
<p>تضبط <code>perspective-origin</code> نقطة التلاشي لتأثير <code>perspective</code>، وتكون في الوسط افتراضيًا. وتضبطها أصناف Tailwind المساعِدة.</p>
<h2 id="أصناف-tailwind-المساعدة-للتحويل">أصناف Tailwind المساعِدة للتحويل</h2>
<p>يوفّر Tailwind أصنافًا مساعِدة لمختلف عمليات التحويل، تُدمج كثيرًا باستخدام متغيّرات CSS.</p>
<h3 id="تفعيل-التحويلات">تفعيل التحويلات</h3>
<p>تطبيق أي صنف تحويل (مثل <code>translate-x-*</code>، <code>rotate-*</code>) يضبط تلقائيًا متغيّرات CSS الضرورية والخاصية <code>transform</code>.</p>
<h3 id="إزاحة-العناصر">إزاحة العناصر</h3>
<p>الإزاحة تنقل عنصرًا على محور ما.</p>
<h4>الإزاحة ثنائية الأبعاد</h4>
<ul>
<li><code>translate-x-&lt;number&gt;</code>: حركة أفقية.</li>
<li><code>translate-y-&lt;number&gt;</code>: حركة رأسية.</li>
<li><code>translate-&lt;number&gt;</code>: حركة أفقية ورأسية متساوية.</li>
</ul>
<p>استخدم قيم مقياس المسافات (مثل <code>translate-4</code>)، أو نسبًا مئوية (مثل <code>translate-1/2</code>)، أو قيمًا سالبة (مثل <code>-translate-x-2</code>)، أو قيمًا مخصّصة (<code>translate-x-[10px]</code>).</p>
<h4>الإزاحة ثلاثية الأبعاد</h4>
<ul>
<li><code>translate-z-&lt;number&gt;</code>: تتحرّك على محور Z. وتحتاج عادةً إلى <code>transform-3d</code> على العنصر الأب.</li>
</ul>
<h3 id="تدوير-العناصر">تدوير العناصر</h3>
<p>الدوران يُدير عنصرًا.</p>
<h4>الدوران ثنائي الأبعاد</h4>
<ul>
<li><code>rotate-&lt;number&gt;</code>: يدوّر في المستوى ثنائي الأبعاد (بالدرجات). والقيم السالبة تدوّر عكس عقارب الساعة (مثل <code>-rotate-45</code>). والقيم المخصّصة: <code>rotate-[10deg]</code>.</li>
</ul>
<h4>الدوران ثلاثي الأبعاد</h4>
<ul>
<li><code>rotate-x-&lt;number&gt;</code>: يدور حول محور X.</li>
<li><code>rotate-y-&lt;number&gt;</code>: يدور حول محور Y.</li>
<li><code>rotate-z-&lt;number&gt;</code>: يدور حول محور Z.</li>
</ul>
<p>اجمعها لدورات ثلاثية الأبعاد معقّدة. والقيم المخصّصة: <code>rotate-x-[20deg]</code>.</p>
<h3 id="تحجيم-العناصر">تحجيم العناصر</h3>
<p>التحجيم يغيّر حجم العنصر.</p>
<h4>التحجيم ثنائي الأبعاد</h4>
<ul>
<li><code>scale-x-&lt;number&gt;</code>: يحجّم أفقيًا.</li>
<li><code>scale-y-&lt;number&gt;</code>: يحجّم رأسيًا.</li>
<li><code>scale-&lt;number&gt;</code>: يحجّم بالتساوي.</li>
</ul>
<p>القيم نسب مئوية (مثل <code>scale-75</code> لـ 75%). والقيم السالبة تعكس (مثل <code>-scale-x-100</code>). والقيم المخصّصة: <code>scale-[1.5]</code>.</p>
<h4>التحجيم ثلاثي الأبعاد</h4>
<ul>
<li><code>scale-z-&lt;number&gt;</code>: يحجّم على محور Z.</li>
</ul>
<h3 id="إمال-العناصر">إمال العناصر</h3>
<p>الإمالة تُميل عنصرًا.</p>
<ul>
<li><code>skew-x-&lt;number&gt;</code>: يميل أفقيًا.</li>
<li><code>skew-y-&lt;number&gt;</code>: يميل رأسيًا.</li>
<li><code>skew-&lt;number&gt;</code>: يميل على المحورين.</li>
</ul>
<p>القيم درجات (مثل <code>skew-6</code>). والقيم السالبة: <code>-skew-y-3</code>. والقيم المخصّصة: <code>skew-x-[10deg]</code>.</p>
<h2 id="ضبط-نقطة-أصل-التحويل">ضبط نقطة أصل التحويل</h2>
<p>غيّر نقطة الأصل الافتراضية في الوسط باستخدام أصناف <code>origin-*</code>:</p>
<ul>
<li><code>origin-center</code>، <code>origin-top</code>، <code>origin-top-right</code>، <code>origin-right</code>، <code>origin-bottom-right</code>، <code>origin-bottom</code>، <code>origin-bottom-left</code>، <code>origin-left</code>، <code>origin-top-left</code>.</li>
</ul>
<p>القيم المخصّصة: <code>origin-[25%_75%]</code>.</p>
<h2 id="العمل-مع-التحويلات-ثلاثية-الأبعاد">العمل مع التحويلات ثلاثية الأبعاد</h2>
<p>يدعم Tailwind التحويلات ثلاثية الأبعاد عبر أصناف <code>transform-style</code> و<code>perspective</code> و<code>perspective-origin</code>، إضافةً إلى دوال التحويل ثلاثية الأبعاد.</p>
<ul>
<li><code>transform-3d</code>: يضبط <code>transform-style: preserve-3d;</code> على الأب من أجل العناصر الفرعية ثلاثية الأبعاد.</li>
<li><code>transform-flat</code>: يضبط <code>transform-style: flat;</code>.</li>
<li><code>perspective-&lt;value&gt;</code>: يضبط <code>perspective</code> على الأب (مثل <code>perspective-normal</code>، أو قيمة مخصّصة).</li>
<li><code>perspective-origin-&lt;position&gt;</code>: يضبط <code>perspective-origin</code> (مثل <code>perspective-origin-top</code>، أو قيمة مخصّصة).</li>
<li><code>translate-z-&lt;number&gt;</code>، <code>rotate-x-&lt;number&gt;</code>، <code>rotate-y-&lt;number&gt;</code>، <code>rotate-z-&lt;number&gt;</code>، <code>scale-z-&lt;number&gt;</code>: تحويلات ثلاثية الأبعاد بعينها.</li>
</ul>
<h2 id="دمج-التحويلات">دمج التحويلات</h2>
<p>اجمع أصناف التحويل بسهولة (مثل <code>translate-x-4 rotate-45 scale-110</code>). ويستخدم Tailwind متغيّرات CSS (<code>--tw-translate-x</code>، <code>--tw-rotate</code>) بحيث تُطبَّق عدة تحويلات في الوقت نفسه.</p>
<h2 id="التحويلات-الشرطية">التحويلات الشرطية</h2>
<p>طَبِّق التحويلات بشكل شرطي عبر المُبدّلات.</p>
<h3 id="مبدلات-الاستجابة">مُبدّلات الاستجابة</h3>
<p>استخدم بادئات الاستجابة (<code>md:</code>، <code>lg:</code>) أو مُبدّلات استعلامات الحاوية (<code>@md:</code>) للتحويلات الخاصة بنقاط توقّف بعينها (مثل <code>md:rotate-90</code>).</p>
<h3 id="مبدلات-الحالة">مُبدّلات الحالة</h3>
<p>استخدم مُبدّلات الحالة (<code>hover:</code>، <code>focus:</code>، <code>group-hover:</code>) للتحويلات المبنية على التفاعل (مثل <code>hover:scale-110</code>).</p>
<h3 id="مبدلات-أخرى">مُبدّلات أخرى</h3>
<p>طَبِّق التحويلات بحسب الوضع الداكن (<code>dark:</code>)، أو تفضيل الحركة (<code>motion-reduce:</code>)، أو سمات البيانات (<code>data-[state=active]:</code>).</p>
<h2 id="تخصيص-التحويلات">تخصيص التحويلات</h2>
<p>خصّص أصناف التحويل في Tailwind 4 باستخدام التوجيه <code>@theme</code> داخل CSS.</p>
<h3 id="تخصيص-قيم-السمة">تخصيص قيم السمة</h3>
<p>عرّف قيمًا مخصّصة للدوران والتحجيم وغيرها في <code>@theme</code>.</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--perspective-custom</span>: <span class="hljs-number">2000px</span>;
  <span class="hljs-attr">--transform-origin-fancy</span>: top left;
}
</code></pre>
<p>يتيح هذا أصنافًا مثل <code>perspective-custom</code> و<code>origin-fancy</code>.
استخدم <code>@theme inline</code> للقيم التي تشير إلى متغيّرات أخرى.</p>
<h3 id="استخدام-القيم-التعسفية">استخدام القيم التعسّفية</h3>
<p>للقيم أحادية الاستخدام، استخدم الأقواس المربّعة: <code>rotate-[30deg]</code>، <code>scale-[1.7]</code>، <code>translate-y-[50px]</code>، <code>perspective-[100px]</code>، <code>origin-[25%_75%]</code>. وفي Tailwind 4، أشِر إلى متغيّرات CSS مثل <code>w-(--sidebar-width)</code>.</p>
<h3 id="استخدام-متغيرات-السمة-في-css-المخصص">استخدام متغيّرات السمة في CSS المخصّص</h3>
<p>تُتاح قيم السمة المخصّصة كمتغيّرات CSS (مثل <code>--perspective-custom</code>) لاستخدامها في CSS الخاص بك.</p>
<pre><code class="language-css"><span class="hljs-selector-class">.custom-element</span> {
  <span class="hljs-attribute">transform-origin</span>: <span class="hljs-built_in">var</span>(--transform-origin-fancy);
}
</code></pre>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<p>أداء تحويلات CSS جيد عادةً. أمّا في المشكلات المحدّدة:</p>
<ul>
<li><code>transform-gpu</code>: قد يُجبر التسريع العتادي (<code>translateZ(0)</code>).</li>
<li><code>transform-cpu</code>: يرجع إلى التصيير على المعالج.</li>
</ul>
<p>استخدم هذه بحذر. ويمكن لـ<code>will-change-transform</code> أن يلتفت انتباه المتصفحات إلى التغييرات القادمة.</p>
<h2 id="إزالة-التحويلات">إزالة التحويلات</h2>
<p>استخدم <code>transform-none</code> لإزالة التحويلات، وهو أمر مفيد للتغييرات الاستجابة.</p>
<p>وإتقانك لأصناف Tailwind المساعِدة للتحويل يتيح لك تأثيرات بصرية ديناميكية مباشرةً داخل HTML.</p>
`,r={book:e,chapter:o,chapterTitle:d,slug:t,title:c,headings:n,html:i};export{e as book,o as chapter,d as chapterTitle,r as default,n as headings,i as html,t as slug,c as title};
