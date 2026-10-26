const e="kinney",d="tailwind",o="Tailwind CSS",t="tailwind-transform",c="التحويلات",n=[{depth:2,id:"خصائص-التحويل-الأساسية",text:"خصائص التحويل الأساسية"},{depth:3,id:"الخاصية-transform",text:"الخاصية transform"},{depth:3,id:"الخاصية-transform-origin",text:"الخاصية transform-origin"},{depth:3,id:"الخاصية-transform-style",text:"الخاصية transform-style"},{depth:3,id:"الخاصية-perspective",text:"الخاصية perspective"},{depth:3,id:"الخاصية-perspective-origin",text:"الخاصية perspective-origin"},{depth:2,id:"أصناف-tailwind-المساعدة-للتحويل",text:"أصناف Tailwind المساعِدة للتحويل"},{depth:3,id:"إزاحة-العناصر",text:"إزاحة العناصر"},{depth:3,id:"تدوير-العناصر",text:"تدوير العناصر"},{depth:3,id:"تحجيم-العناصر",text:"تحجيم العناصر"},{depth:3,id:"إمال-العناصر",text:"إمال العناصر"},{depth:2,id:"دمج-التحويلات",text:"دمج التحويلات"},{depth:2,id:"العمل-مع-التحويلات-ثلاثية-الأبعاد",text:"العمل مع التحويلات ثلاثية الأبعاد"},{depth:2,id:"تطبيق-التحويلات-بشكل-شرطي",text:"تطبيق التحويلات بشكل شرطي"},{depth:3,id:"مبدلات-الاستجابة",text:"مُبدّلات الاستجابة"},{depth:3,id:"مبدلات-الحالة",text:"مُبدّلات الحالة"},{depth:3,id:"مبدلات-أخرى",text:"مُبدّلات أخرى"},{depth:2,id:"تخصيص-التحويلات",text:"تخصيص التحويلات"},{depth:3,id:"تخصيص-قيم-السمة",text:"تخصيص قيم السمة"},{depth:3,id:"استخدام-القيم-التعسفية",text:"استخدام القيم التعسّفية"},{depth:3,id:"استخدام-متغيرات-السمة-في-css-المخصص",text:"استخدام متغيّرات السمة في CSS المخصّص"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"إزالة-التحويلات",text:"إزالة التحويلات"}],i=`<p>تتيح تحويلات CSS لك تدوير العناصر وتحجيمها وإمالتها وإزاحتها في الفضاء ثنائي الأبعاد أو ثلاثي الأبعاد. ويوفّر Tailwind أصنافًا مساعِدة تقابل هذه الخصائص مباشرةً، فيصبح تطبيق التأثيرات البصرية المعقّدة داخل ترميز HTML سريعًا وبديهيًا.</p>
<h2 id="خصائص-التحويل-الأساسية">خصائص التحويل الأساسية</h2>
<h3 id="الخاصية-transform">الخاصية <code>transform</code></h3>
<p>تطبّق الخاصية <code>transform</code> دالة تحويل واحدة أو أكثر (<code>rotate()</code>، <code>scale()</code>، <code>translate()</code>، <code>skew()</code>، ونظائرها ثلاثية الأبعاد). ويستخدم Tailwind متغيّرات CSS في الخلفية للسماح بتطبيق عدة تأثيرات تحويل على عنصر واحد.</p>
<h3 id="الخاصية-transform-origin">الخاصية <code>transform-origin</code></h3>
<p>افتراضيًا، تُطبَّق التحويلات من مركز العنصر. والخاصية <code>transform-origin</code> تغيّر هذه النقطة. ويوفّر Tailwind أصنافًا مساعِدة للتحكّم في نقطة الأصل هذه.</p>
<h3 id="الخاصية-transform-style">الخاصية <code>transform-style</code></h3>
<p>في التحويلات ثلاثية الأبعاد، تحدّد <code>transform-style</code> ما إذا كانت العناصر الفرعية تُموضَع في فضاء ثلاثي الأبعاد (<code>preserve-3d</code>) أم تُسطَّح إلى ثنائي الأبعاد (<code>flat</code>).</p>
<h3 id="الخاصية-perspective">الخاصية <code>perspective</code></h3>
<p>للتأثيرات ثلاثية الأبعاد، تؤسّس <code>perspective</code> منظورًا لعناصر العناصر الفرعية. وعند تطبيقها على عنصر أب، فإنها تحدّد بُعد مستوى z عن الناظر.</p>
<h3 id="الخاصية-perspective-origin">الخاصية <code>perspective-origin</code></h3>
<p>مثل <code>transform-origin</code>، تضبط <code>perspective-origin</code> نقطة التلاشي لتأثير <code>perspective</code>. وهي في الوسط افتراضيًا.</p>
<h2 id="أصناف-tailwind-المساعدة-للتحويل">أصناف Tailwind المساعِدة للتحويل</h2>
<p>يوفّر Tailwind أصنافًا مساعِدة لمختلف عمليات التحويل. وتعمل هذه الأصناف معًا على عنصر واحد باستخدام متغيّرات CSS.</p>
<h3 id="إزاحة-العناصر">إزاحة العناصر</h3>
<p>الإزاحة تنقل عنصرًا على محور X أو Y أو Z.</p>
<h4>الإزاحة ثنائية الأبعاد</h4>
<ul>
<li><code>translate-x-&lt;number&gt;</code>: تحرّك عنصرًا أفقيًا.</li>
<li><code>translate-y-&lt;number&gt;</code>: تحرّك عنصرًا رأسيًا.</li>
<li><code>translate-&lt;number&gt;</code>: تحرّك عنصرًا أفقيًا ورأسيًا بالمقدار نفسه.</li>
</ul>
<p>استخدم قيمًا من مقياس المسافات (<code>translate-4</code>) أو نسبًا مئوية (<code>translate-1/2</code>). والقيم السالبة مدعومة (<code>-translate-x-2</code>). أمّا القيم المخصّصة فتستخدم الأقواس المربّعة (<code>translate-x-[10px]</code>).</p>
<h4>الإزاحة ثلاثية الأبعاد</h4>
<ul>
<li><code>translate-z-&lt;number&gt;</code>: تحرّك عنصرًا على محور Z. وهي تتطلّب عادةً <code>transform-3d</code> على العنصر الأب.</li>
</ul>
<h3 id="تدوير-العناصر">تدوير العناصر</h3>
<p>الدوران يُدير عنصرًا حول محور X أو Y أو Z.</p>
<h4>الدوران ثنائي الأبعاد</h4>
<ul>
<li><code>rotate-&lt;number&gt;</code>: يدوّر عنصرًا بدرجات محدّدة. والقيم السالبة تدوّر عكس عقارب الساعة (<code>-rotate-45</code>). والقيم المخصّصة تستخدم الأقواس المربّعة (<code>rotate-[10deg]</code>).</li>
</ul>
<h4>الدوران ثلاثي الأبعاد</h4>
<ul>
<li><code>rotate-x-&lt;number&gt;</code>: يدور حول محور X.</li>
<li><code>rotate-y-&lt;number&gt;</code>: يدور حول محور Y.</li>
<li><code>rotate-z-&lt;number&gt;</code>: يدور حول محور Z.</li>
</ul>
<p>يمكن دمج هذه الأصناف من أجل دورات ثلاثية الأبعاد معقّدة. والقيم المخصّصة مدعومة (<code>rotate-x-[20deg]</code>).</p>
<h3 id="تحجيم-العناصر">تحجيم العناصر</h3>
<p>التحجيم يغيّر حجم العنصر.</p>
<h4>التحجيم ثنائي الأبعاد</h4>
<ul>
<li><code>scale-x-&lt;number&gt;</code>: يحجّم أفقيًا.</li>
<li><code>scale-y-&lt;number&gt;</code>: يحجّم رأسيًا.</li>
<li><code>scale-&lt;number&gt;</code>: يحجّم بالتساوي على المحورين.</li>
</ul>
<p>تمثّل القيم نسبةً مئوية من الحجم الأصلي (<code>scale-75</code> لـ 75%، و<code>scale-150</code> لـ 150%). والقيم السالبة تعكس العنصر (<code>-scale-x-100</code>). والقيم المخصّصة تستخدم الأقواس المربّعة (<code>scale-[1.5]</code>).</p>
<h4>التحجيم ثلاثي الأبعاد</h4>
<ul>
<li><code>scale-z-&lt;number&gt;</code>: يحجّم على محور Z.</li>
</ul>
<h3 id="إمال-العناصر">إمال العناصر</h3>
<p>الإمالة تُميل عنصرًا.</p>
<ul>
<li><code>skew-x-&lt;number&gt;</code>: يميل أفقيًا.</li>
<li><code>skew-y-&lt;number&gt;</code>: يميل رأسيًا.</li>
<li><code>skew-&lt;number&gt;</code>: يميل على المحورين بالمقدار نفسه.</li>
</ul>
<p>تمثّل القيم درجات الإمالة (<code>skew-6</code>). والقيم السالبة مدعومة (<code>-skew-y-3</code>). والقيم المخصّصة تستخدم الأقواس المربّعة (<code>skew-x-[10deg]</code>).</p>
<h2 id="دمج-التحويلات">دمج التحويلات</h2>
<p>يتيح Tailwind دمج تأثيرات التحويل بسهولة على عنصر واحد. فلا تُفرِغ أصناف التحويل المتعدّدة الخاصية <code>transform</code>. بل تدير متغيّرات CSS (<code>--tw-translate-x</code>، <code>--tw-rotate</code>) كل تحويل على حدة. ثم تجمع الخاصية <code>transform</code> النهائية هذه المتغيّرات.</p>
<p>على سبيل المثال، <code>translate-x-4 rotate-45 scale-110</code> يطبّق التأثيرات الثلاثة في الوقت نفسه.</p>
<h2 id="العمل-مع-التحويلات-ثلاثية-الأبعاد">العمل مع التحويلات ثلاثية الأبعاد</h2>
<p>يوفّر Tailwind دعمًا مُعزَّزًا للتحويلات ثلاثية الأبعاد مع أصناف مخصّصة لخصائص CSS مثل <code>transform-style</code> و<code>perspective</code> و<code>perspective-origin</code>.</p>
<ul>
<li><code>transform-3d</code>: يضبط <code>transform-style: preserve-3d;</code> على العنصر الأب.</li>
<li><code>transform-flat</code>: يضبط <code>transform-style: flat;</code>.</li>
<li><code>perspective-&lt;value&gt;</code>: يضبط الخاصية <code>perspective</code> على عنصر أب. ويوفّر قيمًا جاهزة (<code>perspective-normal</code>، <code>perspective-distant</code>) أو يسمح بقيم مخصّصة.</li>
<li><code>perspective-origin-&lt;position&gt;</code>: يضبط الخاصية <code>perspective-origin</code>. ويغطّي المواضع الشائعة (<code>perspective-origin-top</code>، <code>perspective-origin-bottom-left</code>) أو يسمح بقيم مخصّصة.</li>
<li><code>translate-z-&lt;number&gt;</code>، <code>rotate-x-&lt;number&gt;</code>، <code>rotate-y-&lt;number&gt;</code>، <code>rotate-z-&lt;number&gt;</code>، <code>scale-z-&lt;number&gt;</code>: تفعّل تحويلات ثلاثية الأبعاد بعينها.</li>
</ul>
<h2 id="تطبيق-التحويلات-بشكل-شرطي">تطبيق التحويلات بشكل شرطي</h2>
<p>يمكن تطبيق أصناف التحويل بشكل شرطي باستخدام المُبدّلات.</p>
<h3 id="مبدلات-الاستجابة">مُبدّلات الاستجابة</h3>
<p>اجمع أصناف التحويل مع بادئات الاستجابة (<code>md:</code>، <code>lg:</code>) لتطبيق التحويلات عند نقاط توقّف (breakpoints) محدّدة. على سبيل المثال، <code>md:rotate-90</code> يدوّر عنصرًا 90 درجة على الشاشات المتوسطة فأكبر. أمّا مُبدّلات استعلامات الحاوية (<code>@md:</code>) فتطبّق التحويلات بحسب حجم الحاوية الأم.</p>
<h3 id="مبدلات-الحالة">مُبدّلات الحالة</h3>
<p>استخدم مُبدّلات الحالة (<code>hover:</code>، <code>focus:</code>، <code>active:</code>) لتطبيق التحويلات بحسب تفاعل المستخدم. فمثلًا، <code>hover:scale-110</code> يجعل العنصر أكبر عند التحويم.</p>
<h3 id="مبدلات-أخرى">مُبدّلات أخرى</h3>
<p>يمكن تطبيق التحويلات بحسب الوضع الداكن (<code>dark:</code>)، أو بحسب تفضيل تقليل الحركة (<code>motion-reduce:</code>، <code>motion-safe:</code>)، أو بحسب سمات بيانات محدّدة (<code>data-[state=active]:</code>).</p>
<h2 id="تخصيص-التحويلات">تخصيص التحويلات</h2>
<h3 id="تخصيص-قيم-السمة">تخصيص قيم السمة</h3>
<p>خصّص القيم الافتراضية للخصائص المتعلقة بالتحويل باستخدام التوجيه <code>@theme</code>.</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--perspective-custom</span>: <span class="hljs-number">2000px</span>; <span class="hljs-comment">/* [!code highlight] */</span>
  <span class="hljs-attr">--transform-origin-fancy</span>: top left; <span class="hljs-comment">/* [!code highlight] */</span>
}
</code></pre>
<p>يسمح هذا بأصناف مثل <code>perspective-custom</code> و<code>origin-fancy</code>.</p>
<p>وعند تخصيص قيم تشير إلى متغيّرات أخرى، استخدم <code>@theme inline</code>.</p>
<h3 id="استخدام-القيم-التعسفية">استخدام القيم التعسّفية</h3>
<p>لقيم التحويل أحادية الاستخدام، استخدم صيغة القيم التعسّفية في Tailwind مع الأقواس المربّعة.</p>
<ul>
<li><code>rotate-[30deg]</code></li>
<li><code>scale-[1.7]</code></li>
<li><code>skew-x-[15deg]</code></li>
<li><code>translate-y-[50px]</code></li>
<li><code>perspective-[100px]</code></li>
<li><code>origin-[25%_75%]</code></li>
</ul>
<h3 id="استخدام-متغيرات-السمة-في-css-المخصص">استخدام متغيّرات السمة في CSS المخصّص</h3>
<p>تُتاح قيم سمة التحويل المخصّصة كمتغيّرات CSS في CSS المُجمَّع (<code>--perspective-custom</code>، <code>--transform-origin-fancy</code>). أشِر إليها في CSS المخصّص أو في قيم تعسّفية أخرى، ولا سيّما مع <code>calc()</code>.</p>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>تُحسَّن تحويلات CSS عادةً جيدًا من المتصفحات. وعند وجود مشكلات أداء محدّدة، يمكنك إجبار التسريع العتادي.</p>
<ul>
<li><code>transform-gpu</code>: يُجبر التسريع العتادي (باستخدام <code>translateZ(0)</code>).</li>
<li><code>transform-cpu</code>: يرجع إلى التصيير على المعالج.</li>
</ul>
<p>استخدم هذه الأصناف بحذر، وفيما إذا حدّدت مشكلات أداء بعينها فقط.</p>
<h2 id="إزالة-التحويلات">إزالة التحويلات</h2>
<p>أزِل التحويلات المطبَّقة سابقًا باستخدام الصنف المساعد <code>transform-none</code>. وهذا مفيد حين تطبّق تحويلًا عند نقطة توقّف أصغر وتريد إزالته عند نقطة توقّف أكبر.</p>
`,l={book:e,chapter:d,chapterTitle:o,slug:t,title:c,headings:n,html:i};export{e as book,d as chapter,o as chapterTitle,l as default,n as headings,i as html,t as slug,c as title};
