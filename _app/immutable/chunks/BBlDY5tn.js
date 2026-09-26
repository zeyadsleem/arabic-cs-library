const s="500-lines",e="spreadsheet",a="Web Spreadsheet",n="index",o="ورقة حساب على الويب",c=[{depth:2,id:"مقدمة",text:"مقدّمة"},{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:3,id:"المفاهيم-الأساسية",text:"المفاهيم الأساسية"},{depth:3,id:"التحسين-التدريجي",text:"التحسين التدريجي"},{depth:2,id:"استعراض-الشيفرة",text:"استعراض الشيفرة"},{depth:3,id:"html",text:"HTML"},{depth:3,id:"js-المتحكم-الرئيسي",text:"JS: المتحكّم الرئيسي"},{depth:3,id:"js-العامل-الخلفي",text:"JS: العامل الخلفي"},{depth:3,id:"css",text:"CSS"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:3,id:"ملاحظة-حول-إصدارات-js",text:"ملاحظة حول إصدارات JS"}],l=`<p><em>مُبرمجة ومترجمة تعلَّمت نفسها بنفسها، تعمل مع Apple كعاقدة مستقلّة في توطين خدمات السحابة وتقنيات اللغة الطبيعية. صمَّمت أودري سابقًا أوّل تنفيذ عامل للغة Perl 6 وقدته، وخدمت في لجان تصميم لغات الحاسوب الخاصّة بـ Haskell وPerl 5 وPerl 6. وتعمل أودري حاليًّا بدوام كامل كمساهِمة في مشروع g0v، وتقود مشروع التشريع الإلكتروني الأول في تايوان.</em></p>
<p>يقدّم هذا فصلًا عن ورقة حساب على الويب (spreadsheet) مكتوبة في 99 سطرًا من اللغات الثلاث التي تدعمها المتصفّحات أصلًا: HTML وJavaScript وCSS.</p>
<p>والإصدار ES5 من هذا المشروع متاح على <a href="http://jsfiddle.net/audreyt/LtDyP/">jsFiddle</a>.</p>
<p><em>(هذا الفصل متاح أيضًا <a href="https://github.com/aosabook/500lines/blob/master/spreadsheet/spreadsheet.zh-tw.markdown">بالصينية التقليدية</a>).</em></p>
<h2 id="مقدمة">مقدّمة</h2>
<p>حين اخترع تيم بيرنز لي الويب عام 1990، كانت <em>صفحات الويب</em> تُكتب بـ HTML عبر وضع وسوم بين قوسين زاويّين على النصّ، ومنح المحتوى بنيةً منطقية. وأصبح النصّ الموسوم داخل <code>&lt;a&gt;…&lt;/a&gt;</code> <em>روابط تشعبية</em> تُحيل المستخدم إلى صفحات أخرى على الويب.</p>
<p>وفي تسعينيات القرن الماضي، أضافت المتصفّحات وسومًا عرضيّة متنوّعة إلى مفردات HTML، ومنها وسوم غير قياسية شهيرة مثل <code>&lt;blink&gt;…&lt;/blink&gt;</code> من Netscape Navigator و<code>&lt;marquee&gt;…&lt;/marquee&gt;</code> من Internet Explorer، ممّا سبّب مشكلات واسعة في قابلية الاستخدام وتوافق المتصفّحات.</p>
<p>ومن أجل تقييد HTML بغايتها الأصلية—وصف البنية المنطقية للمستند—اتفق صانعو المتصفّحات في النهاية على دعم لغتين إضافيّتين: CSS لوصف أنماط العرض (<em>style</em>) للصفحة، وJavaScript (JS) لوصف تفاعلاتها الديناميكية.</p>
<p>ومنذ ذلك الحين، أصبحت اللغات الثلاث أكثر إيجازًا وقدرةً عبر عشرين عامًا من التطوّر المتبادل. وتحديدًا، جعلت التحسينات في محرّكات JS عمليًّا نشر أُطر عمل JS واسعة النطاق مثل <a href="http://angularjs.org/">AngularJS</a>.</p>
<p>اليوم، صارت <em>تطبيقات الويب</em> (<em>web applications</em>) العابرة للمنصّات (مثل أوراق حساب الويب) شائعةً ومنتشرةً بقدر التطبيقات الخاصة بمنصّة بعينها (مثل VisiCalc وLotus 1-2-3 وExcel) من القرن الماضي.</p>
<p>كم ميزة يمكن لتطبيق ويب أن يقدّمها في 99 سطرًا مع AngularJS؟ لنرَها أثناء عملها!</p>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>يحتوي دليل <a href="https://github.com/audreyt/500lines/tree/master/spreadsheet/code">ورقة الحساب</a> على عرضنا لإصدارات أواخر عام 2014 من لغات الويب الثلاث: <a href="http://www.w3.org/TR/html5/">HTML5</a> للبنية، و<a href="http://www.w3.org/TR/css3-ui/">CSS3</a> للعرض، ومعيار JS <a href="http://git.io/es6features">ES6 «Harmony»</a> للتفاعل. كما يستخدم <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/webstorage.html">تخزين الويب</a> لاستمرارية البيانات، و<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/workers.html">عمال الويب</a> لتشغيل شيفرة JS في الخلفية. وحتى وقت كتابة هذا الفصل، تدعم هذه المعايير ويب Firefox وChrome وInternet Explorer 11+، فضلًا عن متصفّحات الجوّال على iOS 5+ وAndroid 4+.</p>
<p>الآن لنفتح <a href="http://audreyt.github.io/500lines/spreadsheet/">ورقة حسابنا</a> في متصفّح (\\aosafigref{500l.spreadsheet.initial}):</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-0-01_initial.webp{Initial Screen}{500l.spreadsheet.initial}</p>
<h3 id="المفاهيم-الأساسية">المفاهيم الأساسية</h3>
<p>تمتدّ ورقة الحساب على بُعدين، تبدأ <em>الأعمدة</em> (<em>columns</em>) من <strong>A</strong>، وتبدأ <em>الصفوف</em> (<em>rows</em>) من <strong>1</strong>. ولكل <em>خلية</em> (<em>cell</em>) إحداثيّ (<em>coordinate</em>) فريد (مثل <strong>A1</strong>) ومحتوى (<em>content</em>) (مثل &quot;1874&quot;)، ينتمي إلى أحد أربعة <em>أنواع</em>:</p>
<ul>
<li>نصّ (<em>text</em>): &quot;+&quot; في <strong>B1</strong> و&quot;-&gt;&quot; في <strong>D1</strong>، محاذًى إلى اليسار.</li>
<li>رقم: &quot;1874&quot; في <strong>A1</strong> و&quot;2046&quot; في <strong>C1</strong>، محاذًى إلى اليمين.</li>
<li>صيغة (<em>formula</em>): ‏<code>=A1+C1</code> في <strong>E1</strong>، وهي <em>تُحسب</em> (<em>calculates</em>) إلى <em>قيمة</em> (<em>value</em>) &quot;3920&quot;، تُعرض بخلفية زرقاء فاتحة.</li>
<li>فارغ: جميع خلايا الصف <strong>2</strong> فارغة حاليًّا.</li>
</ul>
<p>انقر على &quot;3920&quot; لوضع <em>التركيز</em> (<em>focus</em>) على <strong>E1</strong>، ما يكشف صيغتها في <em>مربّع إدخال</em> (<em>input box</em>) (\\aosafigref{500l.spreadsheet.inputbox}).</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-1-02_input.webp{Input Box}{500l.spreadsheet.inputbox}</p>
<p>الآن لنضع التركيز على <strong>A1</strong> و_نغيّر_ (<em>change</em>) محتواها إلى &quot;1&quot;، ممّا يجعل <strong>E1</strong> تُعيد الحساب (<em>recalculate</em>) لقيمتها فتصير &quot;2047&quot; (\\aosafigref{500l.spreadsheet.changed}).</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-2-03_changed.webp{Changed Content}{500l.spreadsheet.changed}</p>
<p>اضغط <strong>ENTER</strong> لوضع التركيز على <strong>A2</strong> وتغيير محتواها إلى <code>=Date()</code>، ثم اضغط <strong>TAB</strong>، وغيّر محتوى <strong>B2</strong> إلى <code>=alert()</code>، ثم اضغط <strong>TAB</strong> مرّة أخرى لوضع التركيز على <code>C2</code> (\\aosafigref{500l.spreadsheet.error}).</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-3-04_error.webp{Formula Error}{500l.spreadsheet.error}</p>
<p>وهذا يُظهر أن الصيغة قد تحسب إلى رقم (&quot;2047&quot; في <strong>E1</strong>)، أو إلى نصّ (الوقت الحالي في <strong>A2</strong>، محاذًى إلى اليسار)، أو إلى <em>خطأ</em> (<em>error</em>) (حروف حمراء في <strong>B2</strong>، محاذاةً إلى الوسط).</p>
<p>بعد ذلك، لنجرّب إدخال <code>=for(;;){}</code>، وهي شيفرة JS لحلقة لا نهائية لا تنتهي أبدًا. وستمنع ورقة الحساب ذلك عبر <em>استعادة</em> (<em>restore</em>) محتوى <strong>C2</strong> تلقائيًا بعد محاولة التغيير.</p>
<p>الآن أعِد تحميل الصفحة في المتصفّح عبر <strong>Ctrl-R</strong> أو <strong>Cmd-R</strong> للتحقّق من أنّ محتوى ورقة الحساب <em>دائم</em> (<em>persistent</em>)، أي يبقى نفسه بين جلسات المتصفّح. ولإعادة <em>تعيين</em> (<em>reset</em>) ورقة الحساب إلى محتواها الأصلي، اضغط زر «السهم المنحني» في الزاوية العليا اليسرى.</p>
<h3 id="التحسين-التدريجي">التحسين التدريجي</h3>
<p>قبل أن نغوص في أسطر الشيفرة التسعة والتسعين، يجدر بنا تعطيل JS في المتصفّح، وإعادة تحميل الصفحة، وتدوين الفروق (\\aosafigref{500l.spreadsheet.nojs}).</p>
<ul>
<li>بدلًا من الشبكة الكبيرة، لا يبقى على الشاشة سوى جدول 2×2، وفيه خلية محتوى واحدة.</li>
<li>تُستبدل تسميات الصفوف والأعمدة بـ <code>{{ row }}</code> و<code>{{ col }}</code>.</li>
<li>الضغط على زر إعادة التعيين لا يُحدث أيّ أثر.</li>
<li>الضغط على <strong>TAB</strong> أو النقر في سطر المحتوى الأوّل ما زال يكشف مربّع إدخال قابلًا للتحرير.</li>
</ul>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-4-05_nojs.webp{With JavaScript Disabled}{500l.spreadsheet.nojs}</p>
<p>حين نعطّل التفاعلات الديناميكية (JS)، تبقى بنية المحتوى (HTML) وأنماط العرض (<em>style</em>) الخاصّة بـ CSS سارية. فإذا كان موقع ما مفيدًا مع تعطيل JS وCSS معًا، نقول إنّه يلتزم بمبدأ <em>التحسين التدريجي</em> (<em>progressive enhancement</em>)، ممّا يجعل محتواه في متناول أوسع جمهور ممكن.</p>
<p>ولأنّ ورقة حسابنا تطبيق ويب بلا شيفرة من جهة الخادم، فلا بدّ من الاعتماد على JS لتوفير المنطق المطلوب. لكنّه يعمل فعلًا حين لا يكون CSS مدعومًا بالكامل، كما في قارئات الشاشة والمتصفّحات في وضع النصّ.</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-5-06_nocss.webp{With CSS Disabled}{500l.spreadsheet.nocss}</p>
<p>وكما يبيّن \\aosafigref{500l.spreadsheet.nocss}، فإنّنا إن فعّلنا JS في المتصفّح وعطّلنا CSS بدلًا منه، تكون الآثار كالتالي:</p>
<ul>
<li>تختفي كلّ ألوان الخلفية والمقدّمة.</li>
<li>يظهر مربّع الإدخال وقيمة الخلية معًا، بدلًا من ظهور أحدهما فقط في كلّ مرّة.</li>
<li>وإلّا فإنّ التطبيق ما زال يعمل كما في النسخة الكاملة.</li>
</ul>
<h2 id="استعراض-الشيفرة">استعراض الشيفرة</h2>
<p>يبيّن \\aosafigref{500l.spreadsheet.architecture} الروابط بين مكوّنات HTML وJS. وكي نفهم المخطّط، سنمرّ على ملفات الشيفرة المصدرية الأربعة، بالترتيب نفسه الذي يحمّل بها المتصفّح.</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-6-00_architecture.webp{Architecture Diagram}{500l.spreadsheet.architecture}</p>
<ul>
<li><strong>index.html</strong>: 19 سطرًا</li>
<li><strong>main.js</strong>: 38 سطرًا (باستثناء التعليقات والأسطر الفارغة)</li>
<li><strong>worker.js</strong>: 30 سطرًا (باستثناء التعليقات والأسطر الفارغة)</li>
<li><strong>styles.css</strong>: 12 سطرًا</li>
</ul>
<h3 id="html">HTML</h3>
<p>يصرّح السطر الأوّل في <code>index.html</code> بأنّه مكتوب بـ HTML5 بترميز UTF-8:</p>
<pre><code class="language-html"><span class="hljs-meta">&lt;!DOCTYPE <span class="hljs-keyword">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
</code></pre>
<p>من دون تصريح <code>charset</code>، قد يعرض المتصفّح رمز يونيكود الخاص بزر إعادة التعيين بوصفه <code>â†»</code>، وهو مثال على <em>التشويش النصّي</em> (<em>mojibake</em>): نصّ مشوّه ناتج عن مشكلات في فكّ الترميز.</p>
<p>الأسطر الثلاثة التالية هي تعليمات JS، موضوعة في قسم <code>head</code> كالمعتاد:</p>
<pre><code class="language-html">  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;lib/angular.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;main.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
      <span class="hljs-keyword">try</span> { angular.<span class="hljs-title function_">module</span>(<span class="hljs-string">&#x27;500lines&#x27;</span>) }
      <span class="hljs-keyword">catch</span>(e){ location=<span class="hljs-string">&quot;es5/index.html&quot;</span> }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>تحمّل وسوم <code>&lt;script src=&quot;…&quot;&gt;</code> موارد JS من المسار نفسه الذي توجد فيه صفحة HTML. فمثلًا، إذا كان عنوان URL الحالي هو <code>http://abc.com/x/index.html</code>، فإنّ <code>lib/angular.js</code> تشير إلى <code>http://abc.com/x/lib/angular.js</code>.</p>
<p>يختبر السطر <code>try{ angular.module('500lines') }</code> ما إذا كان <code>main.js</code> محمّلًا على الوجه الصحيح، وإن لم يكن فأمره أن يتنقّل المتصفّح إلى <code>es5/index.html</code> بدلًا من ذلك. وتضمن هذه تقنية <em>التدهور السلمي عبر إعادة التوجيه</em> (<em>redirect-based graceful degradation</em>) أن نتمكّن، مع المتصفّحات ما قبل 2015 التي لا تدعم ES6، من استخدام نسخ برامج JS المترجَمة إلى ES5 كخيار احتياطي.</p>
<p>يحمّل السطران التاليان مورد CSS، ويغلقان قسم <code>head</code>، ويبدآن قسم <code>body</code> الذي يحتوي الجزء المرئي للمستخدم:</p>
<pre><code class="language-html">  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;styles.css&quot;</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">&quot;500lines&quot;</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">&quot;Spreadsheet&quot;</span> <span class="hljs-attr">ng-cloak</span>&gt;</span>
</code></pre>
<p>تخبر سمتا <code>ng-app</code> و<code>ng-controller</code> أعلاه <a href="http://angularjs.org/">AngularJS</a> بأن تستدعي دالة <code>Spreadsheet</code> في وحدة <code>500lines</code>، وهي دالة تُعيد <em>نموذجًا</em> (<em>model</em>): كائنًا يوفّر <em>ارتباطات</em> (<em>bindings</em>) على <em>عرض المستند</em> (<em>view</em>). (وتخفي سمة <code>ng-cloak</code> المستند عن العرض حتى تصبح الارتباطات في مواضعها.)</p>
<p>ولتكن مثالًا ملموسًا: حين ينقر المستخدم على <code>&lt;button&gt;</code> المعرَّف في السطر التالي، تُطلق سمة <code>ng-click</code> وتستدعي <code>reset()</code> و<code>calc()</code>، وهما دالتان مسمّاتان يوفّرهما نموذج JS:</p>
<pre><code class="language-html">  <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">ng-click</span>=<span class="hljs-string">&quot;reset(); calc()&quot;</span>&gt;</span>↻<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
</code></pre>
<p>يستخدم السطر التالي <code>ng-repeat</code> لعرض قائمة تسميات الأعمدة في الصف العلوي:</p>
<pre><code class="language-html">    <span class="hljs-tag">&lt;<span class="hljs-name">th</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">&quot;col in Cols&quot;</span>&gt;</span>{{ col }}<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
</code></pre>
<p>فمثلًا، إذا عرّف نموذج JS <code>Cols</code> بأنّها <code>[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;]</code>، فستكون هناك ثلاث خلايا ترويسة (<code>th</code>) موسومة بالمقابل. وتخبر صيغة <code>{{ col }}</code> AngularJS بأن <em>تستبدل</em> (<em>interpolate</em>) التعبير، فتملأ محتوى كل <code>th</code> بالقيمة الحالية لـ <code>col</code>.</p>
<p>وبالمثل، يمرّ السطران التاليان على القيم في <code>Rows</code> — <code>[1,2,3]</code> وهكذا — فيُنشئان صفًّا لكل قيمة ويوسمان خلية <code>th</code> الأكثَر على اليمين برقمها:</p>
<pre><code class="language-html">  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">&quot;row in Rows&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>{{ row }}<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
</code></pre>
<p>ولأنّ الوسم <code>&lt;tr ng-repeat&gt;</code> لم يُغلق بعد بـ <code>&lt;/tr&gt;</code>، فإنّ المتغيّر <code>row</code> ما زال متاحًا للتعبيرات. ويُنشئ السطر التالي خلية بيانات (<code>td</code>) في الصف الحالي، ويستخدم المتغيّرَين <code>col</code> و<code>row</code> معًا في سمة <code>ng-class</code> عليهما:</p>
<pre><code class="language-html">    <span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">&quot;col in Cols&quot;</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">&quot;{ formula: (&#x27;=&#x27; === sheet[col+row][0]) }&quot;</span>&gt;</span>
</code></pre>
<p>وهناك عدّة أمور تجري هنا. في HTML، تصف سمة <code>class</code> <em>مجموعة أسماء أصناف</em> (<em>set of class names</em>) تسمح لـ CSS بتنسيقها على طرق مختلفة. ويقيّم <code>ng-class</code> هنا التعبير <code>('=' === sheet[col+row][0])</code>، فإن كانت النتيجة صحيحة أُضيف الصنف <code>formula</code> إلى <code>&lt;td&gt;</code>، ما يمنح الخلية خلفية زرقاء فاتحة كما هو معرّف في السطر 8 من <strong>styles.css</strong> بواسطة <em>مُحدِّد الصنف</em> (<em>class selector</em>) ‏<code>.formula</code>.</p>
<p>ويتحقّق التعبير أعلاه ما إذا كانت الخلية الحالية صيغةً عبر اختبار ما إذا كان <code>=</code> هو الحرف الأوّل (<code>[0]</code>) في السلسلة <code>sheet[col+row]</code>، حيث إنّ <code>sheet</code> كائن في نموذج JS خصائصُه إحداثيّات (مثل <code>&quot;E1&quot;</code>)، وقيمُه محتويات الخلايا (مثل <code>&quot;=A1+C1&quot;</code>). ولاحظ أنّ <code>col</code> سلسلة نصّية لا رقم، فإنّ <code>+</code> في <code>col+row</code> تعني الدم (<em>concatenation</em>) لا الجمع.</p>
<p>وداخل <code>&lt;td&gt;</code>، نمنح المستخدم مربّع إدخال لتحرير محتوى الخلية المخزَّن في <code>sheet[col+row]</code>‏:</p>
<pre><code class="language-html">       <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;{{ col+row }}&quot;</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">&quot;sheet[col+row]&quot;</span> <span class="hljs-attr">ng-change</span>=<span class="hljs-string">&quot;calc()&quot;</span>
        <span class="hljs-attr">ng-model-options</span>=<span class="hljs-string">&quot;{ debounce: 200 }&quot;</span> <span class="hljs-attr">ng-keydown</span>=<span class="hljs-string">&quot;keydown( $event, col, row )&quot;</span>&gt;</span>
</code></pre>
<p>السمة المفتاحية هنا هي <code>ng-model</code>، وهي تتيح <em>ارتباطًا ثنائي الاتجاه</em> (<em>two-way binding</em>) بين نموذج JS والمحتوى القابل للتحرير في مربّع الإدخال. وعمليًا، يعني هذا أنّ كلّما أجرى المستخدم تغييرًا في مربّع الإدخال، حدّث نموذج JS قيمة <code>sheet[col+row]</code> لتطابق المحتوى، وأطلق دالته <code>calc()</code> لإعادة حساب (<em>recalculation</em>) قيم جميع خلايا الصيغ.</p>
<p>ولتجنّب الاستدعاءات المتكرّرة لـ <code>calc()</code> حين يضغط المستخدم مفتاحًا ويستمرّ في الضغط، تحدّ <code>ng-model-options</code> معدّل التحديث بمعدّل مرّة واحدة كل 200 جزء من الثانية.</p>
<p>السمة <code>id</code> هنا مُستبدَلة بالإحداثيّ <code>col+row</code>. ويجب أن تكون سمة <code>id</code> في عنصر HTML مختلفة عن <code>id</code> في سائر عناصر المستند نفسه. وهذا يضمن أنّ <em>مُحدِّد المعرّف</em> (<em>ID selector</em>) ‏<code>#A1</code> يشير إلى عنصر واحد، لا إلى مجموعة عناصر كما يفعل مُحدِّد الصنف <code>.formula</code>. وحين يضغط المستخدم مفاتيح <strong>UP</strong> أو <strong>DOWN</strong> أو <strong>ENTER</strong>، يستخدم منطق التنقّل بلوحة المفاتيح في <code>keydown()</code> محدّدات المعرّفات لتحديد مربّع الإدخال الذي ينبغي أن يوضع التركيز عليه.</p>
<p>وبعد مربّع الإدخال، نضع <code>&lt;div&gt;</code> لعرض القيمة المحسوبة للخلية الحالية، وهي ممثَّلة في نموذج JS بالكائنَين <code>errs</code> و<code>vals</code>‏:</p>
<pre><code class="language-html">      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-class</span>=<span class="hljs-string">&quot;{ error: errs[col+row], text: vals[col+row][0] }&quot;</span>&gt;</span>
        {{ errs[col+row] || vals[col+row] }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>وإن حدث خطأ عند حساب صيغة، يستخدم استبدال النصّ رسالة الخطأ الواردة في <code>errs[col+row]</code>، ويطبّق <code>ng-class</code> الصنف <code>error</code> على العنصر، فيسمح لـ CSS بتنسيقه على نحو مختلف (بالحروف الحمراء، محاذاةً إلى الوسط، إلخ).</p>
<p>وحين لا يكون هناك خطأ، تُستبدل <code>vals[col+row]</code> الموجودة على يمين <code>||</code> بدلًا من ذلك. فإن كانت سلسلة نصّية غير فارغة، سيُقيَّم الحرف الأوّل (<code>[0]</code>) على أنّه صحيح، فيُطبَّق الصنف <code>text</code> على العنصر، وهو ما يُحاذي النصّ إلى اليسار.</p>
<p>ولأنّ السلاسل الفارغة والقيم الرقمية لا تملك حرفًا أوّلًا، فإنّ <code>ng-class</code> لا يمنحها أيّ أصناف، فيستطيع CSS تنسيقها بمحاذاة إلى اليمين بوصفها الحالة الافتراضية.</p>
<p>وأخيرًا، نغلق حلقة <code>ng-repeat</code> على مستوى العمود بـ <code>&lt;/td&gt;</code>، ونغلق حلقة مستوى الصف بـ <code>&lt;/tr&gt;</code>، وننهي مستند HTML بما يلي:</p>
<pre><code class="language-html">    <span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="js-المتحكم-الرئيسي">JS: المتحكّم الرئيسي</h3>
<p>يعرّف الملف <code>main.js</code> وحدة <code>500lines</code> ودالة المتحكّم <code>Spreadsheet</code> فيها، كما يتطلّب العنصر <code>&lt;body&gt;</code> في <code>index.html</code>.</p>
<p>وبصفته جسرًا بين عرض HTML والعامل الخلفيّ، فإنّه يتولّى أربع مهام:</p>
<ul>
<li>تعريف أبعاد الأعمدة والصفوف وتسمياتها.</li>
<li>توفير معالِجات أحداث للتنقّل بلوحة المفاتيح ولبزر إعادة التعيين.</li>
<li>عند تغيير المستخدم لورقة الحساب، إرسال محتواها الجديد إلى العامل.</li>
<li>عند وصول النتائج المحسوبة من العامل، تحديث العرض وحفظ الحالة الحالية.</li>
</ul>
<p>ويبيّن المخطّط الانسيابي في \\aosafigref{500l.spreadsheet.flowchart} التفاعل بين المتحكّم والعامل بمزيد من التفصيل:</p>
<p>\\aosafigure[240pt]/images/500-lines/spreadsheet-7-00_flowchart.webp{Controller-Worker Flowchart}{500l.spreadsheet.flowchart}</p>
<p>الآن لنمرّ على الشيفرة. في السطر الأوّل، نطلب <code>$scope</code> من AngularJS‏:</p>
<pre><code class="language-javascript">angular.<span class="hljs-title function_">module</span>(<span class="hljs-string">&#x27;500lines&#x27;</span>, []).<span class="hljs-title function_">controller</span>(<span class="hljs-string">&#x27;Spreadsheet&#x27;</span>, <span class="hljs-keyword">function</span> (<span class="hljs-params">$scope, $timeout</span>) {
</code></pre>
<p>إنّ <code>$</code> في <code>$scope</code> جزء من اسم المتغيّر. ونطلب هنا أيضًا دالة الخدمة <a href="https://docs.angularjs.org/api/ng/service/$timeout"><code>$timeout</code></a> من AngularJS، وسنستخدمها لاحقًا لمنع الصيغ التي تدور إلى ما لا نهاية.</p>
<p>ولوضع <code>Cols</code> و<code>Rows</code> في النموذج، يكفي تعريفهما كسمات لـ <code>$scope</code>‏:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// Begin of $scope properties; start with the column/row labels</span>
  $scope.<span class="hljs-property">Cols</span> = [], $scope.<span class="hljs-property">Rows</span> = [];
  <span class="hljs-keyword">for</span> (col <span class="hljs-keyword">of</span> <span class="hljs-title function_">range</span>( <span class="hljs-string">&#x27;A&#x27;</span>, <span class="hljs-string">&#x27;H&#x27;</span> )) { $scope.<span class="hljs-property">Cols</span>.<span class="hljs-title function_">push</span>(col); }
  <span class="hljs-keyword">for</span> (row <span class="hljs-keyword">of</span> <span class="hljs-title function_">range</span>( <span class="hljs-number">1</span>, <span class="hljs-number">20</span> )) { $scope.<span class="hljs-property">Rows</span>.<span class="hljs-title function_">push</span>(row); }
</code></pre>
<p>تجعل صيغة <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of">for...of</a> في ES6 من السهل المرور على النطاقات (<em>ranges</em>) ذات نقطة بداية ونقطة نهاية، مع تعريف الدالة المساعدة <code>range</code> بوصفها <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*">مولِّدًا</a> (generator)‏:</p>
<pre><code class="language-javascript">  <span class="hljs-keyword">function</span>* <span class="hljs-title function_">range</span>(<span class="hljs-params">cur, end</span>) { <span class="hljs-keyword">while</span> (cur &lt;= end) { <span class="hljs-keyword">yield</span> cur;
</code></pre>
<p>وتعني <code>function*</code> أعلاه أنّ <code>range</code> تُعيد <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol">مُتكرِّرًا</a> (iterator)، مع حلقة <code>while</code> تُسلِّم عبر <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield"><code>yield</code></a> قيمة واحدة في كلّ مرّة. وحين تطلب حلقة <code>for</code> القيمة التالية، تستأنف التنفيذ بعد سطر <code>yield</code> مباشرةً:</p>
<pre><code>    // If it’s a number, increase it by one; otherwise move to next letter
    cur = (isNaN( cur ) ? String.fromCodePoint( cur.codePointAt()+1 ) : cur+1);
  } }
</code></pre>
<p>ولتوليد القيمة التالية، نستخدم <code>isNaN</code> لمعرفة ما إذا كان المقصود بـ <code>cur</code> حرفًا (<code>NaN</code> اختصار لعبارة «ليس رقمًا»). فإن كان كذلك، نأخذ <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt">قيمة نقطة الترميز</a> للحرف، ونزيدها بزيادة (<em>increment</em>) مقدارًا واحدًا، ثم <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint">نحوّل نقطة الترميز</a> مجدّدًا للحصول على حرفه التالي. وإلّا فإنّنا نزيد الرقم بمقدار واحد فحسب.</p>
<p>وبعد ذلك، نعرّف الدالة <code>keydown()</code> التي تتعامل مع التنقّل بلوحة المفاتيح عبر الصفوف:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// UP(38) and DOWN(40)/ENTER(13) move focus to the row above (-1) and below (+1).</span>
  $scope.<span class="hljs-property">keydown</span> = <span class="hljs-function">(<span class="hljs-params">{which}, col, row</span>)=&gt;</span>{ <span class="hljs-keyword">switch</span> (which) {
</code></pre>
<p>تتلقّى <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions">الدالة السهمية</a> (arrow function) الوسائط <code>($event, col, row)</code> من <code>&lt;input ng-keydown&gt;</code>، وتستخدم <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7#Pulling_fields_from_objects_passed_as_function_parameter">الإسناد الهدَّام</a> (destructuring assignment) لإسناد <code>$event.which</code> إلى الوسيط <code>which</code>، ثم تفحص ما إذا كان أحد رموز المفاتيح الثلاثة الخاصّة بالتنقّل:</p>
<pre><code class="language-javascript">    <span class="hljs-keyword">case</span> <span class="hljs-number">38</span>: <span class="hljs-keyword">case</span> <span class="hljs-number">40</span>: <span class="hljs-keyword">case</span> <span class="hljs-number">13</span>: $timeout( <span class="hljs-function">()=&gt;</span>{
</code></pre>
<p>وإن كان كذلك، نستخدم <code>$timeout</code> لجدولة تغيير التركيز بعد معالِج <code>ng-keydown</code> و<code>ng-change</code> الحالي. ولأنّ <code>$timeout</code> يتطلّب دالةً وسيطًا، فإنّ صيغة <code>()=&gt;{…}</code> تبني دالةً تمثّل منطق تغيير التركيز، وهي تبدأ بفحص اتجاه الحركة:</p>
<pre><code class="language-javascript">      <span class="hljs-keyword">const</span> direction = (which === <span class="hljs-number">38</span>) ? -<span class="hljs-number">1</span> : +<span class="hljs-number">1</span>;
</code></pre>
<p>يعني المُصرِّح <code>const</code> أنّ <code>direction</code> لن يتغيّر أثناء تنفيذ الدالة. واتجاه الحركة إمّا إلى أعلى (<code>-1</code>، من <strong>A2</strong> إلى <strong>A1</strong>) إذا كان رمز المفتاح 38‏ (<strong>UP</strong>)، وإمّا إلى أسفل (<code>+1</code>، من <strong>A2</strong> إلى <strong>A3</strong>) في غير ذلك.</p>
<p>وبعد ذلك، نسترجع العنصر الهدف باستخدام صيغة محدّد المعرّف (مثل ‏<code>&quot;#A3&quot;</code>)، وهي مبنيّة بـ<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings">سلسلة قالب</a> (template string) مكتوبة بين علامتَي backtick، بدمج <code>#</code> الأولى مع <code>col</code> الحالية مع <code>row + direction</code> الهدف:</p>
<pre><code class="language-javascript">      <span class="hljs-keyword">const</span> cell = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>( <span class="hljs-string">\`#<span class="hljs-subst">\${ col }</span><span class="hljs-subst">\${ row + direction }</span>\`</span> );
      <span class="hljs-keyword">if</span> (cell) { cell.<span class="hljs-title function_">focus</span>(); }
    } );
  } };
</code></pre>
<p>ونضع فحصًا إضافيًّا على نتيجة <code>querySelector</code>، لأنّ التحرّك لأعلى من <strong>A1</strong> ينتج المحدّد <code>#A0</code>، وهو محدّد لا يطابق أيّ عنصر، ولن يُطلق تغيّر تركيز بالتالي — وينطبق الأمر نفسه على الضغط على <strong>DOWN</strong> في الصف الأخير.</p>
<p>وبعد ذلك، نعرّف الدالة <code>reset()</code> ليتمكّن زر إعادة التعيين من استعادة محتوى <code>sheet</code>‏:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// Default sheet content, with some data cells and one formula cell.</span>
  $scope.<span class="hljs-property">reset</span> = <span class="hljs-function">()=&gt;</span>{ 
    $scope.<span class="hljs-property">sheet</span> = { <span class="hljs-attr">A1</span>: <span class="hljs-number">1874</span>, <span class="hljs-attr">B1</span>: <span class="hljs-string">&#x27;+&#x27;</span>, <span class="hljs-attr">C1</span>: <span class="hljs-number">2046</span>, <span class="hljs-attr">D1</span>: <span class="hljs-string">&#x27;-&gt;&#x27;</span>, <span class="hljs-attr">E1</span>: <span class="hljs-string">&#x27;=A1+C1&#x27;</span> }; }
</code></pre>
<p>تحاول الدالة <code>init()</code> استعادة محتوى <code>sheet</code> من حالته السابقة في <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage">localStorage</a>، وترجع إلى المحتوى الابتدائي إن كان هذا أوّل تشغيل للتطبيق:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// Define the initializer, and immediately call it</span>
  ($scope.<span class="hljs-property">init</span> = <span class="hljs-function">()=&gt;</span>{
    <span class="hljs-comment">// Restore the previous .sheet; reset to default if it’s the first run</span>
    $scope.<span class="hljs-property">sheet</span> = angular.<span class="hljs-title function_">fromJson</span>( <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>( <span class="hljs-string">&#x27;&#x27;</span> ) );
    <span class="hljs-keyword">if</span> (!$scope.<span class="hljs-property">sheet</span>) { $scope.<span class="hljs-title function_">reset</span>(); }
    $scope.<span class="hljs-property">worker</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>( <span class="hljs-string">&#x27;worker.js&#x27;</span> );
  }).<span class="hljs-title function_">call</span>();
</code></pre>
<p>وهناك عدّة أمور تستحقّ الانتباه في الدالة <code>init()</code> أعلاه:</p>
<ul>
<li>نستخدم صيغة <code>($scope.init = ()=&gt;{…}).call()</code> لتعريف الدالة واستدعائها فورًا.</li>
<li>ولأنّ localStorage يخزّن السلاسل النصّية وحدها، فإنّنا <em>نحلّل</em> (<em>parse</em>) بنية <code>sheet</code> من تمثيلها بصيغة <a href="https://developer.mozilla.org/en-US/docs/Glossary/JSON">JSON</a> باستخدام <code>angular.fromJson()</code>.</li>
<li>وفي الخطوة الأخيرة من <code>init()</code>، ننشئ خيط <a href="https://developer.mozilla.org/en-US/docs/Web/API/Worker">عامل ويب</a> جديدًا ونُسنده إلى سمة <code>worker</code> في النطاق. فرغم أنّ العامل لا يُستخدم مباشرةً في العرض، فإنّ العُرف هو استخدام <code>$scope</code> لمشاركة الكائنات المستخدَمة عبر دوال النموذج، وهنا بين <code>init()</code> هنا و<code>calc()</code> أدناه.</li>
</ul>
<p>بينما يحمل <code>sheet</code> محتوى الخلايا القابل للتحرير من المستخدم، يحتوي <code>errs</code> و<code>vals</code> على نتائج الحسابات — الأخطاء والقيم — وهي للقراءة فقط بالنسبة إلى المستخدم:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// Formula cells may produce errors in .errs; normal cell contents are in .vals</span>
  [$scope.<span class="hljs-property">errs</span>, $scope.<span class="hljs-property">vals</span>] = [ {}, {} ];
</code></pre>
<p>وبمجرد توفّر هذه السمات، يمكننا تعريف الدالة <code>calc()</code> التي تُطلق كلّما أجرى المستخدم تغييرًا على <code>sheet</code>‏:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// Define the calculation handler; not calling it yet</span>
  $scope.<span class="hljs-property">calc</span> = <span class="hljs-function">()=&gt;</span>{
    <span class="hljs-keyword">const</span> json = angular.<span class="hljs-title function_">toJson</span>( $scope.<span class="hljs-property">sheet</span> );
</code></pre>
<p>هنا نأخذ لقطة (<em>snapshot</em>) من حالة <code>sheet</code> ونخزّنها في الثابت <code>json</code>، وهو سلسلة نصّية بصيغة JSON. ثم نبني <code>promise</code> من <a href="https://docs.angularjs.org/api/ng/service/$timeout">$timeout</a> يُلغي الحساب القادم إن استغرق أكثر من 99 جزءًا من الثانية:</p>
<pre><code class="language-javascript">    <span class="hljs-keyword">const</span> promise = $timeout( <span class="hljs-function">()=&gt;</span>{
      <span class="hljs-comment">// If the worker has not returned in 99 milliseconds, terminate it</span>
      $scope.<span class="hljs-property">worker</span>.<span class="hljs-title function_">terminate</span>();
      <span class="hljs-comment">// Back up to the previous state and make a new worker</span>
      $scope.<span class="hljs-title function_">init</span>();
      <span class="hljs-comment">// Redo the calculation using the last-known state</span>
      $scope.<span class="hljs-title function_">calc</span>();
    }, <span class="hljs-number">99</span> );
</code></pre>
<p>ولأنّنا تأكّدنا من أنّ <code>calc()</code> لا تُستدعى أكثر من مرّة كل 200 جزء من الثانية بفضل السمة <code>&lt;input ng-model-options&gt;</code> في HTML، فإنّ هذا الترتيب يترك 101 جزءًا من الثانية كي تستعيد <code>init()</code> قيمة <code>sheet</code> إلى آخر حالة سليمة معروفة، وتنشئ عاملًا جديدًا.</p>
<p>ومهمّة العامل هي حساب <code>errs</code> و<code>vals</code> من محتوى <code>sheet</code>. ولأنّ <strong>main.js</strong> و<strong>worker.js</strong> يتواصلان عبر تمرير الرسائل، نحتاج إلى معالِج <code>onmessage</code> لاستلام النتائج فور جهوزيّتها:</p>
<pre><code class="language-javascript">    <span class="hljs-comment">// When the worker returns, apply its effect on the scope</span>
    $scope.<span class="hljs-property">worker</span>.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">{data}</span>)=&gt;</span>{
      $timeout.<span class="hljs-title function_">cancel</span>( promise );
      <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>( <span class="hljs-string">&#x27;&#x27;</span>, json );
      $timeout( <span class="hljs-function">()=&gt;</span>{ [$scope.<span class="hljs-property">errs</span>, $scope.<span class="hljs-property">vals</span>] = data; } );
    };
</code></pre>
<p>وإن استُدعي <code>onmessage</code>، فإنّنا نعلم أنّ لقطة <code>sheet</code> الموجودة في <code>json</code> مستقرّة (أي لا تحوي صيغًا تدور إلى ما لا نهاية)، فنلغي مهلة التسعين جزءًا من الثانية، ونكتب اللقطة في localStorage، ونجدول تحديثًا للواجهة عبر دالة <code>$timeout</code> تحدّث <code>errs</code> و<code>vals</code> في العرض المرئي للمستخدم.</p>
<p>وبمجرد وضع المعالِج في موضعه، يمكننا إرسال حالة <code>sheet</code> إلى العامل، فتبدأ عمليّة الحساب في الخلفية:</p>
<pre><code class="language-javascript">    <span class="hljs-comment">// Post the current sheet content for the worker to process</span>
    $scope.<span class="hljs-property">worker</span>.<span class="hljs-title function_">postMessage</span>( $scope.<span class="hljs-property">sheet</span> );
  };

  <span class="hljs-comment">// Start calculation when worker is ready</span>
  $scope.<span class="hljs-property">worker</span>.<span class="hljs-property">onmessage</span> = $scope.<span class="hljs-property">calc</span>;
  $scope.<span class="hljs-property">worker</span>.<span class="hljs-title function_">postMessage</span>( <span class="hljs-literal">null</span> );
});
</code></pre>
<h3 id="js-العامل-الخلفي">JS: العامل الخلفي</h3>
<p>هناك ثلاثة أسباب لاستخدام عامل ويب لحساب الصيغ، بدلًا من استخدام خيط JS الرئيسي في هذه المهمّة:</p>
<ul>
<li>بينما يعمل العامل في الخلفية، يبقى المستخدم حرًّا في مواصلة التفاعل مع ورقة الحساب دون أن يحجبه حسابٌ في الخيط الرئيسي.</li>
<li>ولأنّنا نقبل أيّ تعبير JS في الصيغة، يوفّر العامل <em>بيئة معزولة</em> (<em>sandbox</em>) تمنع الصيغ من التشويش على الصفحة التي تحتويها، مثلًا بإظهار مربّع حوار <code>alert()</code>.</li>
<li>ويمكن أن تشير الصيغة إلى أيّ إحداثيّات بوصفها متغيّرات. وقد تحتوي الإحداثيّات الأخرى على صيغة أخرى قد تنتهي بمرجع دوري (<em>cyclic reference</em>). ولمعالجة هذه المشكلة، نستخدم كائن <em>النطاق العام</em> (<em>global scope</em>) للعامل، وهو <code>self</code>، ونعرّف هذه المتغيّرات بوصفها <em>دوال جالب</em> (<em>getter functions</em>) على <code>self</code> لتطبيق منطق منع الدورات (<em>cycle</em>).</li>
</ul>
<p>ومعيّنة هذه الاعتبارات، لننظر إلى شيفرة العامل.</p>
<p>الغرض الوحيد للعامل هو تعريف معالِج <code>onmessage</code> فيه. يأخذ المعالِج <code>sheet</code>، ويحسب <code>errs</code> و<code>vals</code>، ثم يعيد إرسالهما إلى خيط JS الرئيسي. ونبدأ بإعادة تهيئة المتغيّرات الثلاثة عند تلقّينا رسالة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">let</span> sheet, errs, vals;
<span class="hljs-variable language_">self</span>.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">{data}</span>)=&gt;</span>{
  [sheet, errs, vals] = [ data, {}, {} ];
</code></pre>
<p>ولتحويل الإحداثيّات إلى متغيّرات عامّة، نمرّ أوّلًا على كلّ خاصية في <code>sheet</code> باستخدام حلقة <code>for…in</code>‏:</p>
<pre><code class="language-javascript">  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> coord <span class="hljs-keyword">in</span> sheet) {
</code></pre>
<p>تقدّم ES6 التصريحين <code>const</code> و<code>let</code> للإعلان عن ثوابت ومتغيّرات <em>محصورة بنطاق الكتلة</em> (<em>block scoped</em>)‏؛ أمّا <code>const coord</code> أعلاه فيعني أنّ الدوال المعرَّفة داخل الحلقة تلتقط قيمة <code>coord</code> في كلّ دورة.</p>
<p>وفي المقابل، فإنّ <code>var coord</code> في إصدارات JS الأقدم يُعلن متغيّرًا <em>محصورًا بنطاق الدالة</em> (<em>function scoped</em>)، والدوال المعرَّفة في كلّ دورة من دورات الحلقة تنتهي جميعها إلى الإشارة إلى المتغيّر <code>coord</code> نفسه.</p>
<p>واعتادةً، تكون متغيّرات الصيغ غير حسّاسة لحالة الأحرف، وقد تسبقها اختياريًّا علامة <code>$</code>. ولأنّ متغيّرات JS حسّاسة لحالة الأحرف، نستخدم <code>map</code> للمرور على أسماء المتغيّرات الأربعة الخاصّة بالإحداثيّ نفسه:</p>
<pre><code class="language-javascript">    <span class="hljs-comment">// Four variable names pointing to the same coordinate: A1, a1, $A1, $a1</span>
    [ <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;$&#x27;</span> ].<span class="hljs-title function_">map</span>( <span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> [ coord, coord.<span class="hljs-title function_">toLowerCase</span>() ].<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> name = p+c;
</code></pre>
<p>ولاحظ صيغة الدالة السهمية المختصرة أعلاه: <code>p =&gt; ...</code> هي نفسها <code>(p) =&gt; { ... }</code>.</p>
<p>ولكلّ اسم متغيّر، مثل <code>A1</code> و<code>$a1</code>، نعرّف <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">خاصية وصول</a> (<em>accessor property</em>) على <code>self</code> تحسب <code>vals[&quot;A1&quot;]</code> كلّما قيِّمت في تعبير:</p>
<pre><code class="language-javascript">      <span class="hljs-comment">// Worker is reused across calculations, so only define each variable once</span>
      <span class="hljs-keyword">if</span> ((<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">getOwnPropertyDescriptor</span>( <span class="hljs-variable language_">self</span>, name ) || {}).<span class="hljs-property">get</span>) { <span class="hljs-keyword">return</span>; }

      <span class="hljs-comment">// Define self[&#x27;A1&#x27;], which is the same thing as the global variable A1</span>
      <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>( <span class="hljs-variable language_">self</span>, name, { <span class="hljs-title function_">get</span>(<span class="hljs-params"></span>) {
</code></pre>
<p>وتُعدّ صيغة <code>{ get() { … } }</code> أعلاه اختصارًا للصيغة <code>{ get: ()=&gt;{ … } }</code>. ولأنّنا نعرّف <code>get</code> وحده ولا نعرّف <code>set</code>، تصبح المتغيّرات <em>للقراءة وحدها</em> (<em>read-only</em>) ولا يمكن تعديلها من صيغ يقدّمها المستخدم.</p>
<p>ويبدأ <em>جالب</em> (<em>accessor</em>) <code>get</code> بفحص <code>vals[coord]</code>، ويعيده ببساطة إن كان محسوبًا بالفعل:</p>
<pre><code class="language-javascript">        <span class="hljs-keyword">if</span> (coord <span class="hljs-keyword">in</span> vals) { <span class="hljs-keyword">return</span> vals[coord]; }
</code></pre>
<p>وإن لم يكن، فعلينا حساب <code>vals[coord]</code> من <code>sheet[coord]</code>.</p>
<p>نضعه أوّلًا على <code>NaN</code>، حتى تنتهي المراجع الذاتية مثل تعيين <strong>A1</strong> إلى <code>=A1</code> بالقيمة <code>NaN</code> بدلًا من حلقة لا نهائية:</p>
<pre><code class="language-javascript">        vals[coord] = <span class="hljs-title class_">NaN</span>;
</code></pre>
<p>وبعد ذلك نفحص ما إذا كان <code>sheet[coord]</code> رقمًا عبر تحويله إلى صيغة عددية بالسابقة <code>+</code>، وإسناد الرقم إلى <code>x</code>، ثم مقارنة تمثيله النصّي مع السلسلة الأصلية. فإن اختلفا، ضبطنا <code>x</code> على السلسلة الأصلية:</p>
<pre><code class="language-javascript">        <span class="hljs-comment">// Turn numeric strings into numbers, so =A1+C1 works when both are numbers</span>
        <span class="hljs-keyword">let</span> x = +sheet[coord];
        <span class="hljs-keyword">if</span> (sheet[coord] !== x.<span class="hljs-title function_">toString</span>()) { x = sheet[coord]; }
</code></pre>
<p>وإن كان الحرف الأوّل من <code>x</code> هو <code>=</code>، فإنّها خلية صيغة. نقيّم الجزء التالي لـ <code>=</code> عبر <code>eval.call()</code>، مستخدمين الوسيط الأوّل <code>null</code> لأمر <code>eval</code> بأن يعمل في <em>النطاق العام</em> (<em>global scope</em>)، مُخفيًا عن التقييم متغيّرات <em>النطاق المعجمي</em> (<em>lexical scope</em>) مثل <code>x</code> و<code>sheet</code>:</p>
<pre><code class="language-javascript">        <span class="hljs-comment">// Evaluate formula cells that begin with =</span>
        <span class="hljs-keyword">try</span> { vals[coord] = ((<span class="hljs-string">&#x27;=&#x27;</span> === x[<span class="hljs-number">0</span>]) ? <span class="hljs-built_in">eval</span>.<span class="hljs-title function_">call</span>( <span class="hljs-literal">null</span>, x.<span class="hljs-title function_">slice</span>( <span class="hljs-number">1</span> ) ) : x);
</code></pre>
<p>وإن نجح التقييم، تُخزَّن النتيجة في <code>vals[coord]</code>. أمّا في الخلايا غير الصيغية فتكون قيمة <code>vals[coord]</code> هي <code>x</code> ببساطة، وقد تكون رقمًا أو سلسلة نصّية.</p>
<p>وإن أسفر <code>eval</code> عن خطأ، تفحص كتلة <code>catch</code> ما إذا كان سببُه أنّ الصيغة تشير إلى خلية فارغة لم تُعرَّف بعد في <code>self</code>‏:</p>
<pre><code class="language-javascript">        } <span class="hljs-keyword">catch</span> (e) {
          <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/\\$?[A-Za-z]+[1-9][0-9]*\\b/</span>.<span class="hljs-title function_">exec</span>( e );
          <span class="hljs-keyword">if</span> (match &amp;&amp; !( match[<span class="hljs-number">0</span>] <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span> )) {
</code></pre>
<p>وفي تلك الحالة، نضبط القيمة الافتراضية للخلية المفقودة على &quot;0&quot;، ونمسح <code>vals[coord]</code>، ونعيد تشغيل الحساب الحالي باستخدام <code>self[coord]</code>‏:</p>
<pre><code class="language-javascript">            <span class="hljs-comment">// The formula refers to a uninitialized cell; set it to 0 and retry</span>
            <span class="hljs-variable language_">self</span>[match[<span class="hljs-number">0</span>]] = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">delete</span> vals[coord];
            <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>[coord];
          }
</code></pre>
<p>وإن أعطى المستخدم الخلية المفقودة محتوى لاحقًا في <code>sheet[coord]</code>، فإنّ القيمة المؤقتة ستُستبدَل بواسطة <code>Object.defineProperty</code>.</p>
<p>وتُخزَّن أنواع الأخطاء الأخرى في <code>errs[coord]</code>‏:</p>
<pre><code class="language-javascript">          <span class="hljs-comment">// Otherwise, stringify the caught exception in the errs object</span>
          errs[coord] = e.<span class="hljs-title function_">toString</span>();
        }
</code></pre>
<p>وعند حدوث أخطاء، ستبقى قيمة <code>vals[coord]</code> هي <code>NaN</code>، لأنّ الإسناد لم يكتمل تنفيذه.</p>
<p>وأخيرًا، يعيد جالب <code>get</code> القيمة المحسوبة المخزَّنة في <code>vals[coord]</code>، ويجب أن تكون رقمًا أو قيمةً منطقية أو سلسلةً نصّية:</p>
<pre><code class="language-javascript">        <span class="hljs-comment">// Turn vals[coord] into a string if it&#x27;s not a number or Boolean</span>
        <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">typeof</span> vals[coord]) { 
            <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;function&#x27;</span>: <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;object&#x27;</span>: vals[coord]+=<span class="hljs-string">&#x27;&#x27;</span>; 
        }
        <span class="hljs-keyword">return</span> vals[coord];
      } } );
    }));
  }
</code></pre>
<p>وبمجرد تعريف خصائص الوصول لكلّ الإحداثيّات، يمرّ العامل على الإحداثيّات مرّة أخرى، مستدعيًا كلّ خاصية وصول بـ <code>self[coord]</code>، ثم يعيد إرسال <code>errs</code> و<code>vals</code> الناتجين إلى خيط JS الرئيسي:</p>
<pre><code class="language-javascript">  <span class="hljs-comment">// For each coordinate in the sheet, call the property getter defined above</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> coord <span class="hljs-keyword">in</span> sheet) { <span class="hljs-variable language_">self</span>[coord]; }
  <span class="hljs-keyword">return</span> [ errs, vals ];
}
</code></pre>
<h3 id="css">CSS</h3>
<p>يحتوي الملف <strong>styles.css</strong> على بضعة محدّدات (<em>selectors</em>) وأنماط عرضها فحسب. أوّلًا، ننسّق الجدول (<em>style</em>) لدمج كلّ حدود الخلايا معًا، فلا تبقَ فراغات بين الخلايا المتجاورة:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">table</span> { <span class="hljs-attribute">border-collapse</span>: collapse; }
</code></pre>
<p>وتتشارك خلايا الترويسة وخلايا البيانات نمطَ الحدّ نفسه، لكن يمكن تمييزهما بألوان خلفيتيهما: خلايا الترويسة رماديّة فاتحة، وخلايا البيانات بيضاء افتراضيًّا، أمّا خلايا الصيغ فتحصل على خلفية زرقاء فاتحة:</p>
<pre><code>th, td { border: 1px solid #ccc; }
th { background: #ddd; }
td.formula { background: #eef; }
</code></pre>
<p>والعرض المعروض ثابت لكلّ قيمة محسوبة في الخلية. فتحصل الخلايا الفارغة على ارتفاع أدنى، وتُقتطع الأسطر الطويلة بعلامة ثلاث نقاط في نهايتها:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">td</span> <span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">text-align</span>: right; <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>; <span class="hljs-attribute">min-height</span>: <span class="hljs-number">1.2em</span>;
         <span class="hljs-attribute">overflow</span>: hidden; <span class="hljs-attribute">text-overflow</span>: ellipsis; }
</code></pre>
<p>ويحدّد محاذاة النصّ وزخارفه نوع كلّ قيمة، كما ينعكس ذلك في محدَّدي الأصناف <code>text</code> و<code>error</code>‏:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.text</span> { <span class="hljs-attribute">text-align</span>: left; }
<span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.error</span> { <span class="hljs-attribute">text-align</span>: center; <span class="hljs-attribute">color</span>: <span class="hljs-number">#800</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">90%</span>; <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> <span class="hljs-number">#800</span> }
</code></pre>
<p>أمّا مربّع <code>input</code> القابل للتحرير من المستخدم، فنستخدم فيه <em>الموضع المطلق</em> (<em>absolute positioning</em>) لمتراكبه فوق خلبيته، ونجعله شفافًا ليظهر من خلاله <code>div</code> الأساسي الذي يحمل قيمة الخلية:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">input</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1.3em</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">color</span>: transparent; <span class="hljs-attribute">background</span>: transparent; }
</code></pre>
<p>وحين يضع المستخدم التركيز على مربّع الإدخال، فإنّه ينبثق إلى المقدّمة:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:focus</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#111</span>; <span class="hljs-attribute">background</span>: <span class="hljs-number">#efe</span>; }
</code></pre>
<p>وفضلا عن ذلك، يُطوى <code>div</code> الأساسي في سطر واحد، فيغطّيه مربّع الإدخال بالكامل:</p>
<pre><code class="language-css"><span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:focus</span> + <span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">white-space</span>: nowrap; }
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>ولأنّ هذا الكتاب هو <em>500 سطرًا أو أقل</em>، فإنّ ورقة حساب ويب في 99 سطرًا هي مثال مصغّر—لا تتردّد في التجريب بها وتوسيعها في أيّ اتجاه تشاء.</p>
<p>وهذه بعض الأفكار، وكلّها سهلة المنال في المساحة المتبقّية من 401 سطر:</p>
<ul>
<li>محرّر تعاوني على الإنترنت باستخدام <a href="http://sharejs.org/">ShareJS</a> أو <a href="http://angularfire.com">AngularFire</a> أو <a href="http://goangular.org/">GoAngular</a>‏.</li>
<li>دعم صيغة Markdown لخلايا النصّ، باستخدام <a href="http://ngmodules.org/modules/angular-marked">angular-marked</a>.</li>
<li>دوال الصيغ الشائعة (<code>SUM</code> و<code>TRIM</code> وغيرها) من <a href="https://en.wikipedia.org/wiki/OpenFormula">معيار OpenFormula</a>.</li>
<li>التوافق مع تنسيقات أوراق الحساب الرائجة، مثل CSV وSpreadsheetML عبر <a href="http://sheetjs.com/">SheetJS</a>‏.</li>
<li>الاستيراد من خدمات أوراق الحساب على الإنترنت وتصدير إليها، مثل Google Spreadsheet و<a href="http://ethercalc.net/">EtherCalc</a>‏.</li>
</ul>
<h3 id="ملاحظة-حول-إصدارات-js">ملاحظة حول إصدارات JS</h3>
<p>يهدف هذا الفصل إلى استعراض مفاهيم جديدة في ES6، لذلك نستخدم <a href="https://github.com/google/traceur-compiler">مُصرِّف Traceur</a> لترجمة الشيفرة المصدرية إلى ES5 كي تعمل على المتصفّحات ما قبل 2015.</p>
<p>وإن كنت تفضّل العمل مباشرةً مع إصدار JS لعام 2010، فإنّ دليل <a href="https://audreyt.github.io/500lines/spreadsheet/as-javascript-1.8.5/">as-javascript-1.8.5</a> يحتوي على <strong>main.js</strong> و<strong>worker.js</strong> مكتوبين بأسلوب ES5؛ و<a href="https://github.com/audreyt/500lines/tree/master/spreadsheet/as-javascript-1.8.5">الشيفرة المصدرية</a> له قابلة للمقارنة سطرًا بسطر مع إصدار ES6، وبعددّ الأسطر نفسه.</p>
<p>ولمن يفضّل صياغةً أنظف، يستخدم دليل <a href="https://audreyt.github.io/500lines/spreadsheet/as-livescript-1.3.0/">as-livescript-1.3.0</a> لغة <a href="http://livescript.net/">LiveScript</a> بدلًا من ES6 لكتابة <strong>main.ls</strong> و<strong>worker.ls</strong>؛ وهو <a href="https://github.com/audreyt/500lines/tree/master/spreadsheet/as-livescript-1.3.0">أقصر بـ 20 سطرًا</a> من نسخة JS.</p>
<p>وبناءً على لغة LiveScript، يستخدم دليل <a href="https://audreyt.github.io/500lines/spreadsheet/as-react-livescript/">as-react-livescript</a> إطار العمل <a href="https://facebook.github.io/react/">ReactJS</a>‏؛ <a href="https://github.com/audreyt/500lines/tree/master/spreadsheet/as-react-livescript">وهو أطول بعشرة أسطر</a> من نظيره بـ AngularJS، لكنّه يعمل بسرعة أكبر بكثير.</p>
<p>وإن كنت مهتمًّا بترجمة هذا المثال إلى لغات JS أخرى، فأرسل <a href="https://github.com/audreyt/500lines/pulls">طلب سحب</a>—وسأكون سعيدًا بسماعه منك!</p>
`,t={book:s,chapter:e,chapterTitle:a,slug:n,title:o,headings:c,html:l};export{s as book,e as chapter,a as chapterTitle,t as default,c as headings,l as html,n as slug,o as title};
