const e="ocaml-manual",n="ch19",o="مولّد التوثيق (ocamldoc)",s="index",c="مولّد التوثيق (ocamldoc)",t=[{depth:2,id:"191-الاستعمال",text:"19.1 الاستعمال"},{depth:3,id:"1911-الاستدعاء",text:"19.1.1 الاستدعاء"},{depth:3,id:"1912-دمج-معلومات-الوحدة",text:"19.1.2 دمج معلومات الوحدة"},{depth:3,id:"1913-قواعد-كتابة-الشيفرة",text:"19.1.3 قواعد كتابة الشيفرة"},{depth:2,id:"192-صيغة-تعليقات-التوثيق",text:"19.2 صيغة تعليقات التوثيق"},{depth:3,id:"1921-موضع-تعليقات-التوثيق",text:"19.2.1 موضع تعليقات التوثيق"},{depth:3,id:"1922-التعليق-الخاص-stop",text:"19.2.2 التعليق الخاص Stop"},{depth:3,id:"1923-صيغة-تعليقات-التوثيق",text:"19.2.3 صيغة تعليقات التوثيق"},{depth:3,id:"1924-تنسيق-النص",text:"19.2.4 تنسيق النص"},{depth:3,id:"1925-وسوم-التوثيق-وسوم",text:"19.2.5 وسوم التوثيق (وسوم @)"},{depth:2,id:"193-المولدات-المخصصة",text:"19.3 المولّدات المخصّصة"},{depth:3,id:"1931-وحدات-المولد",text:"19.3.1 وحدات المولّد"},{depth:3,id:"1932-معالجة-الوسوم-المخصصة",text:"19.3.2 معالجة الوسوم المخصّصة"},{depth:2,id:"194-إضافة-خيارات-سطر-الأوامر",text:"19.4 إضافة خيارات سطر الأوامر"},{depth:3,id:"1941-الترجمة-والاستعمال",text:"19.4.1 الترجمة والاستعمال"}],d=`<h1>الفصل 19: مولّد التوثيق (ocamldoc)</h1>
<p>يصف هذا الفصل OCamldoc، وهو أداة تولّد التوثيق من تعليقات خاصة تُدرَج في ملفات المصدر. التعليقات التي يستعملها OCamldoc من الشكل <code>(**</code>…<code>*)</code> وتتبع الصيغة الموصوفة في القسم 19.2.</p>
<p>يستطيع OCamldoc إنتاج التوثيق بصيغ متعدّدة: HTML، وLATEX، وTeXinfo، وصفحات <code>man</code> في Unix، ومخطّطات التبعيات بصيغة <code>dot</code>. ويمكن للمستخدمين، فوق ذلك، إضافة مولّدات مخصّصة خاصة بهم، كما يوضّح القسم 19.3.</p>
<p>نستعمل في هذا الفصل كلمة <em>عنصر</em> للإشارة إلى أيٍّ من الأجزاء التالية في ملف مصدر OCaml: تعريف نوع، أو قيمة، أو وحدة، أو استثناء، أو نوع وحدة، أو باني نوع، أو حقل سجل، أو صنف، أو نوع صنف، أو دالة صنف، أو قيمة صنف، أو شرط وراثة صنف.</p>
<h2 id="191-الاستعمال">19.1 الاستعمال</h2>
<h3 id="1911-الاستدعاء">19.1.1 الاستدعاء</h3>
<p>يُستدعى OCamldoc بالأمر <code>ocamldoc</code> على النحو التالي:</p>
<pre><code class="language-text">        ocamldoc options sourcefiles
</code></pre>
<h4>خيارات اختيار صيغة الخَرْج</h4>
<p>تحدّد الخيارات التالية صيغة التوثيق المولَّد.</p>
<p><strong><code>-html</code></strong></p>
<p>توليد التوثيق بصيغة HTML الافتراضية. تُخزَّن صفحات HTML المولَّدة في المجلد الحالي، أو في المجلد المحدَّد بالخيار <strong><code>-d</code></strong>. ويمكنك تخصيص نمط الصفحات المولَّدة بتحرير ملف <code>style.css</code> المولَّد، أو بتقديم ورقة أنماط خاصة بك بالخيار <code>-css-style</code>. ولا يُولَّد الملف <code>style.css</code> إن كان موجودًا مسبقًا أو إن استُعمل <code>-css-style</code>.</p>
<p><strong><code>-latex</code></strong></p>
<p>توليد التوثيق بصيغة LATEX الافتراضية. تُحفظ وثيقة LATEX المولَّدة في الملف <code>ocamldoc.out</code>، أو في الملف المحدَّد بالخيار <strong><code>-o</code></strong>. وتستعمل الوثيقة ملف الأنماط <code>ocamldoc.sty</code>؛ ويُولَّد هذا الملف عند استعمال الخيار <code>-latex</code> إن لم يكن موجودًا مسبقًا. ويمكنك تعديل هذا الملف لتخصيص نمط توثيق LATEX.</p>
<p><strong><code>-texi</code></strong></p>
<p>توليد التوثيق بصيغة TeXinfo الافتراضية. تُحفظ الوثيقة المولَّدة في الملف <code>ocamldoc.out</code>، أو في الملف المحدَّد بالخيار <strong><code>-o</code></strong>.</p>
<p><strong><code>-man</code></strong></p>
<p>توليد التوثيق في هيئة مجموعة من صفحات <code>man</code> في Unix. تُخزَّن الصفحات المولَّدة في المجلد الحالي، أو في المجلد المحدَّد بالخيار <strong><code>-d</code></strong>.</p>
<p><strong><code>-dot</code></strong></p>
<p>توليد مخطّط تبعيات للوحدات العليا، بصيغة مناسبة للعرض والمعالجة بأداة <code>dot</code>. وأداة <code>dot</code> متاحة من <a href="https://graphviz.org/"><code>https://graphviz.org/</code></a>. ويُكتب التمثيل النصي للمخطّط في الملف <code>ocamldoc.out</code>، أو في الملف المحدَّد بالخيار <strong><code>-o</code></strong>. استعمل <code>dot ocamldoc.out</code> لعرضه.</p>
<p><strong><code>-g</code> <em>file.cm[o,a,xs]</em></strong></p>
<p>تحميل الملف المعطى ديناميًا، وهو ملف يعرّف مولّد توثيق مخصّصًا. انظر القسم 19.4.1. يدعم هذا الخيار الأمر <code>ocamldoc</code> (لتحميل ملفات <code>.cmo</code> و<code>.cma</code>) ونسخته بالشيفرة الأصلية <code>ocamldoc.opt</code> (لتحميل ملفات <code>.cmxs</code>). وإن كان الملف المعطى بسيطًا وغير موجود في المجلد الحالي، بحث عنه ocamldoc في المجلد الافتراضي للمولّدات المخصّصة، وفي المجلدات المحدَّدة بخيارات <code>-i</code> الاختيارية.</p>
<p><strong><code>-customdir</code></strong></p>
<p>عرض المجلد الافتراضي للمولّدات المخصّصة.</p>
<p><strong><code>-i</code> <em>directory</em></strong></p>
<p>إضافة المجلد المعطى إلى المسار الذي يُبحث فيه عن المولّدات المخصّصة.</p>
<h4>خيارات عامة</h4>
<p><strong><code>-d</code> <em>dir</em></strong></p>
<p>توليد الملفات في المجلد <em>dir</em> بدلًا من المجلد الحالي.</p>
<p><strong><code>-dump</code> <em>file</em></strong></p>
<p>إلقاء المعلومات المجمَّعة في الملف <em>file</em>. ويمكن قراءة هذه المعلومات بالخيار <code>-load</code> في استدعاء لاحق لـ ocamldoc.</p>
<p><strong><code>-hide</code> <em>modules</em></strong></p>
<p>إخفاء أسماء الوحدات الكاملة المعطاة في التوثيق المولَّد. و<em>modules</em> قائمة أسماء وحدات كاملة تفصل بينها فواصل <code>,</code> بلا فراغات، مثلًا: <code>Stdlib,M2.M3</code>.</p>
<p><strong><code>-inv-merge-ml-mli</code></strong></p>
<p>عكس أسبقية ملفات التنفيذ على ملفات الواجهة عند الدمج. تُحتفظ بجميع العناصر في ملفات التنفيذ، ويشير الخيار <strong><code>-m</code></strong> إلى أجزاء التعليقات في ملفات الواجهة التي تُدمج مع التعليقات في ملفات التنفيذ.</p>
<p><strong><code>-keep-code</code></strong></p>
<p>الاحتفاظ دائمًا بالشيفرة المصدرية للقيم والدوال ومتغيّرات النسخة، متى توفّرت.</p>
<p><strong><code>-load</code> <em>file</em></strong></p>
<p>تحميل المعلومات من الملف <em>file</em>، الذي أنتجه <code>ocamldoc -dump</code>. ويمكن إعطاء عدّة خيارات <code>-load</code>.</p>
<p><strong><code>-m</code> <em>flags</em></strong></p>
<p>تحديد خيارات الدمج بين الواجهات والتنفيذات (انظر القسم 19.1.2 للتفاصيل). ويمكن أن تكون <em>flags</em> محرفًا واحدًا أو أكثر من المحارف التالية:</p>
<ul>
<li><strong><code>d</code></strong>: دمج الوصف؛</li>
<li><strong><code>a</code></strong>: دمج <code>@author</code>؛</li>
<li><strong><code>v</code></strong>: دمج <code>@version</code>؛</li>
<li><strong><code>l</code></strong>: دمج <code>@see</code>؛</li>
<li><strong><code>s</code></strong>: دمج <code>@since</code>؛</li>
<li><strong><code>b</code></strong>: دمج <code>@before</code>؛</li>
<li><strong><code>o</code></strong>: دمج <code>@deprecated</code>؛</li>
<li><strong><code>p</code></strong>: دمج <code>@param</code>؛</li>
<li><strong><code>e</code></strong>: دمج <code>@raise</code>؛</li>
<li><strong><code>r</code></strong>: دمج <code>@return</code>؛</li>
<li><strong><code>A</code></strong>: دمج كل شيء.</li>
</ul>
<p><strong><code>-no-custom-tags</code></strong></p>
<p>عدم السماح بوسوم <code>@</code> المخصّصة (انظر القسم 19.2.5).</p>
<p><strong><code>-no-stop</code></strong></p>
<p>الاحتفاظ بالعناصر الموضوعة بعد التعليق الخاص <code>(**/**)</code> أو بين تعليقين منه (انظر القسم 19.2).</p>
<p><strong><code>-o</code> <em>file</em></strong></p>
<p>إخراج التوثيق المولَّد إلى الملف <em>file</em> بدلًا من <code>ocamldoc.out</code>. وهذا الخيار ذو معنى مقترنًا بالخيارات <strong><code>-latex</code></strong> أو <strong><code>-texi</code></strong> أو <strong><code>-dot</code></strong> فقط.</p>
<p><strong><code>-pp</code> <em>command</em></strong></p>
<p>تمرير المصادر عبر المعالج المسبق <em>command</em>.</p>
<p><strong><code>-impl</code> <em>filename</em></strong></p>
<p>معالجة الملف <em>filename</em> كملف تنفيذ، حتى إن لم يكن امتداده <code>.ml</code>.</p>
<p><strong><code>-intf</code> <em>filename</em></strong></p>
<p>معالجة الملف <em>filename</em> كملف واجهة، حتى إن لم يكن امتداده <code>.mli</code>.</p>
<p><strong><code>-text</code> <em>filename</em></strong></p>
<p>معالجة الملف <em>filename</em> كملف نصّي، حتى إن لم يكن امتداده <code>.txt</code>.</p>
<p><strong><code>-sort</code></strong></p>
<p>ترتيب قائمة الوحدات العليا قبل توليد التوثيق.</p>
<p><strong><code>-stars</code></strong></p>
<p>إزالة المحارف الفارغة حتى أول نجمة (<code>*</code>) في كل سطر من التعليقات.</p>
<p><strong><code>-t</code> <em>title</em></strong></p>
<p>استعمال <em>title</em> عنوانًا للتوثيق المولَّد.</p>
<p><strong><code>-intro</code> <em>file</em></strong></p>
<p>استعمال محتوى الملف <em>file</em> نصًّا لـ ocamldoc يُستعمل مقدّمة (في HTML وLATEX وTeXinfo فقط). وفي HTML يُستعمل الملف لإنشاء الملف <code>index.html</code> بكامله.</p>
<p><strong><code>-v</code></strong></p>
<p>النمط المطوَّل. عرض معلومات التقدّم.</p>
<p><strong><code>-version</code></strong></p>
<p>طباعة سلسلة الإصدار والخروج.</p>
<p><strong><code>-vnum</code></strong></p>
<p>طباعة رقم الإصدار القصير والخروج.</p>
<p><strong><code>-warn-error</code></strong></p>
<p>معاملة تحذيرات OCamldoc كأخطاء.</p>
<p><strong><code>-hide-warnings</code></strong></p>
<p>عدم طباعة تحذيرات OCamldoc.</p>
<p><strong><code>-help</code> أو <code>--help</code></strong></p>
<p>عرض ملخّص استعمال قصير والخروج.</p>
<h4>خيارات فحص الأنواع</h4>
<p>يستدعي OCamldoc مدقّق أنواع OCaml ليحصل على معلومات الأنواع. وتؤثّر الخيارات التالية في مرحلة فحص الأنواع، ولها المعنى نفسه في الأمرين <code>ocamlc</code> و<code>ocamlopt</code>.</p>
<p><strong><code>-I</code> <em>directory</em></strong></p>
<p>إضافة <em>directory</em> إلى قائمة المجلدات التي يُبحث فيها عن ملفات الواجهة المترجمة (ملفات <code>.cmi</code>).</p>
<p><strong><code>-H</code> <em>directory</em></strong></p>
<p>مثل <code>-I</code>، لكن المجلدات المعطاة بـ <code>-H</code> يُبحث فيها أخيرًا، وقد لا يشير البرنامج مباشرةً إلى الوحدات المضافة إلى مسار البحث بهذه الطريقة.</p>
<p><strong><code>-nolabels</code></strong></p>
<p>تجاهل الوسوم غير الاختيارية في الأنواع.</p>
<p><strong><code>-rectypes</code></strong></p>
<p>السماح بالأنواع العودية العشوائية (انظر الخيار <code>-rectypes</code> في <code>ocamlc</code>).</p>
<h4>خيارات توليد صفحات HTML</h4>
<p>تنطبق الخيارات التالية مقترنةً بالخيار <code>-html</code>:</p>
<p><strong><code>-all-params</code></strong></p>
<p>عرض القائمة الكاملة لمعاملات الدوال والدوال الأعضاء.</p>
<p><strong><code>-charset</code> <em>charset</em></strong></p>
<p>إضافة معلومات عن ترميز المحارف بوصفه <em>charset</em> (الافتراضي هو iso-8859-1).</p>
<p><strong><code>-colorize-code</code></strong></p>
<p>تلوين شيفرة OCaml الموضوعة بين <code>[ ]</code> و<code>{[ ]}</code> بألوان تُبرز الكلمات المحجوزة وغيرها. وإن لم تكن شيفرة الشظايا صحيحة نحويًا لم يُضَف أي لون.</p>
<p><strong><code>-css-style</code> <em>filename</em></strong></p>
<p>استعمال <em>filename</em> ملفًّا لورقة الأنماط المتتالية.</p>
<p><strong><code>-index-only</code></strong></p>
<p>توليد ملفات الفهارس فقط.</p>
<p><strong><code>-short-functors</code></strong></p>
<p>استعمال صيغة قصيرة لعرض الموصِّلات: تُعرض الوحدة <code>module M : functor (A:Module) -&gt; functor (B:Module2) -&gt; sig .. end</code> على النحو <code>module M (A:Module) (B:Module2) : sig .. end</code>.</p>
<h4>خيارات توليد ملفات LATEX</h4>
<p>تنطبق الخيارات التالية مقترنةً بالخيار <code>-latex</code>:</p>
<p><strong><code>-latex-value-prefix</code> <em>prefix</em></strong></p>
<p>إعطاء بادئة تُستعمل لوسوم القيم في وثيقة LATEX المولَّدة. البادئة الافتراضية سلسلة فارغة. ويمكنك أيضًا استعمال الخيارات <code>-latex-type-prefix</code> و<code>-latex-exception-prefix</code> و<code>-latex-module-prefix</code> و<code>-latex-module-type-prefix</code> و<code>-latex-class-prefix</code> و<code>-latex-class-type-prefix</code> و<code>-latex-attribute-prefix</code> و<code>-latex-method-prefix</code>. وهذه الخيارات مفيدة حين يكون لديك مثلًا نوع وقيمة بالاسم نفسه؛ فإن لم تحدّد بادئات، شكا LATEX من وسوم معرَّفة أكثر من مرة.</p>
<p><strong><code>-latextitle</code> <em>n,style</em></strong></p>
<p>ربط رقم النمط <em>n</em> بأمر تقسيم الأقسام في LATEX <em>style</em>، مثل <code>section</code> أو <code>subsection</code> (في LATEX فقط). وهذا مفيد عند إدراج الوثيقة المولَّدة في وثيقة LATEX أخرى عند مستوى تقسيم معيّن. والربط الافتراضي هو 1 لـ <code>section</code>، و2 لـ <code>subsection</code>، و3 لـ <code>subsubsection</code>، و4 لـ <code>paragraph</code>، و5 لـ <code>subparagraph</code>.</p>
<p><strong><code>-noheader</code></strong></p>
<p>حذف الترويسة من التوثيق المولَّد.</p>
<p><strong><code>-notoc</code></strong></p>
<p>عدم توليد جدول محتويات.</p>
<p><strong><code>-notrailer</code></strong></p>
<p>حذف الذيل من التوثيق المولَّد.</p>
<p><strong><code>-sepfiles</code></strong></p>
<p>توليد ملف <code>.tex</code> واحد لكل وحدة عليا، بدلًا من الملف العام <code>ocamldoc.out</code>.</p>
<h4>خيارات توليد ملفات TeXinfo</h4>
<p>تنطبق الخيارات التالية مقترنةً بالخيار <code>-texi</code>:</p>
<p><strong><code>-esc8</code></strong></p>
<p>هروب المحارف المنقَّطة في ملفات Info.</p>
<p><strong><code>-info-entry</code></strong></p>
<p>تحديد مدخل دليل Info.</p>
<p><strong><code>-info-section</code></strong></p>
<p>تحديد قسم دليل Info.</p>
<p><strong><code>-noheader</code></strong></p>
<p>حذف الترويسة من التوثيق المولَّد.</p>
<p><strong><code>-noindex</code></strong></p>
<p>عدم بناء فهرس لملفات Info.</p>
<p><strong><code>-notrailer</code></strong></p>
<p>حذف الذيل من التوثيق المولَّد.</p>
<h4>خيارات توليد مخطّطات dot</h4>
<p>تنطبق الخيارات التالية مقترنةً بالخيار <code>-dot</code>:</p>
<p><strong><code>-dot-colors</code> <em>colors</em></strong></p>
<p>تحديد الألوان المستعملة في شيفرة <code>dot</code> المولَّدة. فعند توليد تبعيات الوحدات يستعمل <code>ocamldoc</code> ألوانًا مختلفة للوحدات بحسب المجلدات التي تقيم فيها، وعند توليد تبعيات الأنواع يستعمل ألوانًا مختلفة للأنواع بحسب الوحدات التي تُعرَّف فيها. و<em>colors</em> قائمة أسماء ألوان تفصل بينها فواصل <code>,</code>، كما في <code>Red,Blue,Green</code>. والألوان المتاحة هي التي تدعمها أداة <code>dot</code>.</p>
<p><strong><code>-dot-include-all</code></strong></p>
<p>إدراج جميع الوحدات في خَرْج <code>dot</code>، لا الوحدات المعطاة في سطر الأوامر أو المحمَّلة بالخيار <strong><code>-load</code></strong> فقط.</p>
<p><strong><code>-dot-reduce</code></strong></p>
<p>إجراء اختزال متعدٍّ لمخطّط التبعيات قبل إخراج شيفرة <code>dot</code>. وهذا مفيد حين تكثر التبعيات المتعدية فتُشوّش المخطّط.</p>
<p><strong><code>-dot-types</code></strong></p>
<p>إخراج شيفرة <code>dot</code> التي تصف مخطّط تبعيات الأنواع بدلًا من مخطّط تبعيات الوحدات.</p>
<h4>خيارات توليد ملفات man</h4>
<p>تنطبق الخيارات التالية مقترنةً بالخيار <code>-man</code>:</p>
<p><strong><code>-man-mini</code></strong></p>
<p>توليد صفحات man للوحدات وأنواع الوحدات والأصناف وأنواع الأصناف فقط، بدلًا من صفحات لكل العناصر.</p>
<p><strong><code>-man-suffix</code> <em>suffix</em></strong></p>
<p>ضبط اللاحقة المستعملة لأسماء ملفات man المولَّدة. الافتراضي <code>3o</code>، كما في <code>List.3o</code>.</p>
<p><strong><code>-man-section</code> <em>section</em></strong></p>
<p>ضبط رقم القسم المستعمل لأسماء ملفات man المولَّدة. الافتراضي <code>3</code>.</p>
<h3 id="1912-دمج-معلومات-الوحدة">19.1.2 دمج معلومات الوحدة</h3>
<p>يمكن استخراج المعلومات عن وحدة من الملف <code>.mli</code> أو من الملف <code>.ml</code> أو منهما معًا، بحسب الملفات المعطاة في سطر الأوامر. وعند إعطاء الملفين <code>.mli</code> و<code>.ml</code> للوحدة نفسها، تُدمج المعلومات المستخرجة منهما وفق القواعد التالية:</p>
<ul>
<li>
<p>لا تُحتفظ إلا بالعناصر (القيم والأنواع والأصناف وغيرها) المصرَّح بها في الملف <code>.mli</code>. بعبارة أخرى، لا تُوثَّق التعريفات في الملف <code>.ml</code> التي لم تُصدَّر في الملف <code>.mli</code>.</p>
</li>
<li>
<p>تُعالج أوصاف العناصر والأوصاف في وسوم <code>@</code> على النحو التالي: إن وُجد وصف للعنصر نفسه أو للوسم نفسه من العنصر نفسه في الملفين، وُصل وصف الملف <code>.ml</code> بوصف الملف <code>.mli</code> إن أُعطي علم <code>-m</code> الموافق في سطر الأوامر. وإن وُجد وصف في الملف <code>.ml</code> ولم يوجد في الملف <code>.mli</code>، حُفظ وصف <code>.ml</code>. وفي الحالتين تُحفظ كل المعلومات المعطاة في الملف <code>.mli</code>.</p>
</li>
</ul>
<h3 id="1913-قواعد-كتابة-الشيفرة">19.1.3 قواعد كتابة الشيفرة</h3>
<p>يجب احترام القواعد التالية لتجنّب تعارضات الأسماء التي تؤدي إلى أخطاء في الإحالات المرجعية:</p>
<ul>
<li>
<p>لا يجوز أن توجد في الوحدة وحدتان، أو نوعا وحدتين، أو وحدة ونوع وحدة، بالاسم نفسه. وفي المولّد الافتراضي لـ HTML تُطبع الوحدتان <code>ab</code> و<code>AB</code> في الملف نفسه على أنظمة الملفات غير الحسّاسة لحالة الأحرف.</p>
</li>
<li>
<p>لا يجوز أن يوجد في الوحدة صنفان، أو نوعا صنفين، أو صنف ونوع صنف، بالاسم نفسه.</p>
</li>
<li>
<p>لا يجوز أن توجد في الوحدة قيمتان، أو نوعان، أو استثناءان، بالاسم نفسه.</p>
</li>
<li>
<p>لا يحتفظ OCamldoc بالقيم المعرَّفة داخل صفّ، كما في <code>let (x,y,z) = (1,2,3)</code>.</p>
</li>
<li>
<p>تجنّب التركيب التالي؛ ففي هذه الحالة يربط OCamldoc <code>Bar.x</code> بالمتغيّر <code>x</code> في الوحدة <code>Foo</code> المعرَّفة أعلاه مباشرةً، لا بـ <code>Bar.x</code> المعرَّف في الوحدة <code>Foo</code> المفتوحة.</p>
</li>
</ul>
<pre><code class="language-ocaml"><span class="hljs-keyword">open</span> <span class="hljs-type">Foo</span> <span class="hljs-comment">(* which has a module Bar with a value x *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">Foo</span> =
  <span class="hljs-keyword">struct</span>
    <span class="hljs-keyword">module</span> <span class="hljs-type">Bar</span> =
      <span class="hljs-keyword">struct</span>
        <span class="hljs-keyword">let</span> x = <span class="hljs-number">1</span>
      <span class="hljs-keyword">end</span>
  <span class="hljs-keyword">end</span>
  <span class="hljs-keyword">let</span> dummy = <span class="hljs-type">Bar</span>.x
</code></pre>
<h2 id="192-صيغة-تعليقات-التوثيق">19.2 صيغة تعليقات التوثيق</h2>
<p>تُسمّى التعليقات التي تحمل مادّة توثيقية <em>تعليقات خاصة</em>، وتُكتب بين <code>(**</code> و<code>*)</code>. ويجب أن تبدأ التعليقات الخاصة بـ <code>(**</code> بالضبط؛ أما التعليقات التي تبدأ بـ <code>(</code> ثم بأكثر من نجمتين فتُهمَل.</p>
<h3 id="1921-موضع-تعليقات-التوثيق">19.2.1 موضع تعليقات التوثيق</h3>
<p>يستطيع OCamldoc ربط التعليقات ببعض عناصر اللغة التي يلقاها في ملفات المصدر، ويُجرى الربط وفق مواضع التعليقات إزاء عناصر اللغة. ومواضع التعليقات في ملفات <code>.mli</code> تختلف عن مواضعها في ملفات <code>.ml</code>.</p>
<h4>التعليقات في ملفات .mli</h4>
<p>يُربط التعليق الخاص بعنصر إن وُضع قبله أو بعده. ويُربط التعليق الخاص السابق للعنصر بهذا العنصر إذا:</p>
<ul>
<li>
<p>لم يوجد سطر فارغ أو تعليق خاص آخر بين التعليق الخاص والعنصر، ويجوز أن يقع تعليق عادي بين التعليق الخاص والعنصر؛</p>
</li>
<li>
<p>لم يكن التعليق الخاص مربوطًا سابقًا بالعنصر السابق؛</p>
</li>
<li>
<p>لم يكن التعليق الخاص أول تعليق في وحدة عليا.</p>
</li>
</ul>
<p>أما التعليق الخاص التالي للعنصر فيُربط به إن لم يوجد سطر فارغ أو تعليق بين التعليق الخاص والعنصر.</p>
<p>وثمّة استثناءان: في حالة البواني وحقول السجلات داخل تعريفات الأنواع لا يمكن وضع التعليق المرتبط إلا بعد تعريف الباني أو الحقل، بلا أسطر فارغة أو تعليقات أخرى بينهما. والتعليق الخاص بباني يتبعه باني آخر يجب أن يوضع قبل المحرف <code>|</code> الذي يفصل بين البانيين.</p>
<p>يوضّح ملف الواجهة النموذجي التالي <code>foo.mli</code> قواعد وضع التعليقات في ملفات <code>.mli</code>.</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(** The first special comment of the file is the comment associated
    with the whole module.*)</span>

<span class="hljs-comment">(** Special comments can be placed between elements and are kept
    by the OCamldoc tool, but are not associated to any element.
    @-tags in these comments are ignored.*)</span>

<span class="hljs-comment">(*******************************************************************)</span>
<span class="hljs-comment">(** Comments like the one above, with more than two asterisks,
    are ignored. *)</span>

<span class="hljs-comment">(** The comment for function f. *)</span>
<span class="hljs-keyword">val</span> f : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>
<span class="hljs-comment">(** The continuation of the comment for function f. *)</span>

<span class="hljs-comment">(** Comment for exception My_exception, even with a simple comment
    between the special comment and the exception.*)</span>
<span class="hljs-comment">(* Hello, I&#x27;m a simple comment :-) *)</span>
<span class="hljs-keyword">exception</span> <span class="hljs-type">My_exception</span> <span class="hljs-keyword">of</span> (<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>) * <span class="hljs-built_in">int</span>

<span class="hljs-comment">(** Comment for type weather  *)</span>
<span class="hljs-keyword">type</span> weather =
| <span class="hljs-type">Rain</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> <span class="hljs-comment">(** The comment for constructor Rain *)</span>
| <span class="hljs-type">Sun</span> <span class="hljs-comment">(** The comment for constructor Sun *)</span>

<span class="hljs-comment">(** Comment for type weather2  *)</span>
<span class="hljs-keyword">type</span> weather2 =
| <span class="hljs-type">Rain</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> <span class="hljs-comment">(** The comment for constructor Rain *)</span>
| <span class="hljs-type">Sun</span> <span class="hljs-comment">(** The comment for constructor Sun *)</span>
<span class="hljs-comment">(** I can continue the comment for type weather2 here
  because there is already a comment associated to the last constructor.*)</span>

<span class="hljs-comment">(** The comment for type my_record *)</span>
<span class="hljs-keyword">type</span> my_record = {
    foo : <span class="hljs-built_in">int</span> ;    <span class="hljs-comment">(** Comment for field foo *)</span>
    bar : <span class="hljs-built_in">string</span> ; <span class="hljs-comment">(** Comment for field bar *)</span>
  }
  <span class="hljs-comment">(** Continuation of comment for type my_record *)</span>

<span class="hljs-comment">(** Comment for foo *)</span>
<span class="hljs-keyword">val</span> foo : <span class="hljs-built_in">string</span>
<span class="hljs-comment">(** This comment is associated to foo and not to bar. *)</span>
<span class="hljs-keyword">val</span> bar : <span class="hljs-built_in">string</span>
<span class="hljs-comment">(** This comment is associated to bar. *)</span>

<span class="hljs-comment">(** The comment for class my_class *)</span>
<span class="hljs-keyword">class</span> my_class :
  <span class="hljs-keyword">object</span>
    <span class="hljs-comment">(** A comment to describe inheritance from cl *)</span>
    <span class="hljs-keyword">inherit</span> cl

    <span class="hljs-comment">(** The comment for attribute tutu *)</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> tutu : <span class="hljs-built_in">string</span>

    <span class="hljs-comment">(** The comment for attribute toto. *)</span>
    <span class="hljs-keyword">val</span> toto : <span class="hljs-built_in">int</span>

    <span class="hljs-comment">(** This comment is not attached to titi since
        there is a blank line before titi, but is kept
        as a comment in the class. *)</span>

    <span class="hljs-keyword">val</span> titi : <span class="hljs-built_in">string</span>

    <span class="hljs-comment">(** Comment for method toto *)</span>
    <span class="hljs-keyword">method</span> toto : <span class="hljs-built_in">string</span>

    <span class="hljs-comment">(** Comment for method m *)</span>
    <span class="hljs-keyword">method</span> m : <span class="hljs-built_in">float</span> -&gt; <span class="hljs-built_in">int</span>
  <span class="hljs-keyword">end</span>

<span class="hljs-comment">(** The comment for the class type my_class_type *)</span>
<span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> my_class_type =
  <span class="hljs-keyword">object</span>
    <span class="hljs-comment">(** The comment for variable x. *)</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> x : <span class="hljs-built_in">int</span>

    <span class="hljs-comment">(** The comment for method m. *)</span>
    <span class="hljs-keyword">method</span> m : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>
<span class="hljs-keyword">end</span>

<span class="hljs-comment">(** The comment for module Foo *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">Foo</span> :
  <span class="hljs-keyword">sig</span>
    <span class="hljs-comment">(** The comment for x *)</span>
    <span class="hljs-keyword">val</span> x : <span class="hljs-built_in">int</span>

    <span class="hljs-comment">(** A special comment that is kept but not associated to any element *)</span>
  <span class="hljs-keyword">end</span>

<span class="hljs-comment">(** The comment for module type my_module_type. *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> my_module_type =
  <span class="hljs-keyword">sig</span>
    <span class="hljs-comment">(** The comment for value x. *)</span>
    <span class="hljs-keyword">val</span> x : <span class="hljs-built_in">int</span>

    <span class="hljs-comment">(** The comment for module M. *)</span>
    <span class="hljs-keyword">module</span> <span class="hljs-type">M</span> :
      <span class="hljs-keyword">sig</span>
        <span class="hljs-comment">(** The comment for value y. *)</span>
        <span class="hljs-keyword">val</span> y : <span class="hljs-built_in">int</span>

        <span class="hljs-comment">(* ... *)</span>
      <span class="hljs-keyword">end</span>

  <span class="hljs-keyword">end</span>
</code></pre>
<h4>التعليقات في ملفات .ml</h4>
<p>يُربط التعليق الخاص بعنصر إن وُضع قبله ولم يوجد سطر فارغ بين التعليق والعنصر، ويجوز أن يقع تعليق بسيط بين التعليق الخاص والعنصر. وثمّة استثناءان في حالة البواني وحقول السجلات داخل تعريفات الأنواع، إذ يجب وضع التعليق المرتبط بعد تعريف الباني أو الحقل بلا سطر فارغ بينهما. والتعليق الخاص بباني يتبعه باني آخر يجب أن يوضع قبل المحرف <code>|</code> الفاصل بينهما.</p>
<p>يوضّح المثال التالي للملف <code>toto.ml</code> أين توضع التعليقات في ملف <code>.ml</code>.</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(** The first special comment of the file is the comment associated
    to the whole module. *)</span>

<span class="hljs-comment">(** The comment for function f *)</span>
<span class="hljs-keyword">let</span> f x y = x + y

<span class="hljs-comment">(** This comment is not attached to any element since there is another
    special comment just before the next element. *)</span>

<span class="hljs-comment">(** Comment for exception My_exception, even with a simple comment
    between the special comment and the exception.*)</span>
<span class="hljs-comment">(* A simple comment. *)</span>
<span class="hljs-keyword">exception</span> <span class="hljs-type">My_exception</span> <span class="hljs-keyword">of</span> (<span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>) * <span class="hljs-built_in">int</span>

<span class="hljs-comment">(** Comment for type weather  *)</span>
<span class="hljs-keyword">type</span> weather =
| <span class="hljs-type">Rain</span> <span class="hljs-keyword">of</span> <span class="hljs-built_in">int</span> <span class="hljs-comment">(** The comment for constructor Rain *)</span>
| <span class="hljs-type">Sun</span> <span class="hljs-comment">(** The comment for constructor Sun *)</span>

<span class="hljs-comment">(** The comment for type my_record *)</span>
<span class="hljs-keyword">type</span> my_record = {
    foo : <span class="hljs-built_in">int</span> ;    <span class="hljs-comment">(** Comment for field foo *)</span>
    bar : <span class="hljs-built_in">string</span> ; <span class="hljs-comment">(** Comment for field bar *)</span>
  }

<span class="hljs-comment">(** The comment for class my_class *)</span>
<span class="hljs-keyword">class</span> my_class =
    <span class="hljs-keyword">object</span>
      <span class="hljs-comment">(** A comment to describe inheritance from cl *)</span>
      <span class="hljs-keyword">inherit</span> cl

      <span class="hljs-comment">(** The comment for the instance variable tutu *)</span>
      <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> tutu = <span class="hljs-string">&quot;tutu&quot;</span>
      <span class="hljs-comment">(** The comment for toto *)</span>
      <span class="hljs-keyword">val</span> toto = <span class="hljs-number">1</span>
      <span class="hljs-keyword">val</span> titi = <span class="hljs-string">&quot;titi&quot;</span>
      <span class="hljs-comment">(** Comment for method toto *)</span>
      <span class="hljs-keyword">method</span> toto = tutu ^ <span class="hljs-string">&quot;!&quot;</span>
      <span class="hljs-comment">(** Comment for method m *)</span>
      <span class="hljs-keyword">method</span> m (f : <span class="hljs-built_in">float</span>) = <span class="hljs-number">1</span>
    <span class="hljs-keyword">end</span>

<span class="hljs-comment">(** The comment for class type my_class_type *)</span>
<span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> my_class_type =
  <span class="hljs-keyword">object</span>
    <span class="hljs-comment">(** The comment for the instance variable x. *)</span>
    <span class="hljs-keyword">val</span> <span class="hljs-keyword">mutable</span> x : <span class="hljs-built_in">int</span>
    <span class="hljs-comment">(** The comment for method m. *)</span>
    <span class="hljs-keyword">method</span> m : <span class="hljs-built_in">int</span> -&gt; <span class="hljs-built_in">int</span>
  <span class="hljs-keyword">end</span>

<span class="hljs-comment">(** The comment for module Foo *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">Foo</span> =
  <span class="hljs-keyword">struct</span>
    <span class="hljs-comment">(** The comment for x *)</span>
    <span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>
    <span class="hljs-comment">(** A special comment in the class, but not associated to any element. *)</span>
  <span class="hljs-keyword">end</span>

<span class="hljs-comment">(** The comment for module type my_module_type. *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-keyword">type</span> my_module_type =
  <span class="hljs-keyword">sig</span>
    <span class="hljs-comment">(* Comment for value x. *)</span>
    <span class="hljs-keyword">val</span> x : <span class="hljs-built_in">int</span>
    <span class="hljs-comment">(* ... *)</span>
  <span class="hljs-keyword">end</span>
</code></pre>
<h3 id="1922-التعليق-الخاص-stop">19.2.2 التعليق الخاص Stop</h3>
<p>يخبر التعليق الخاص <code>(**/**)</code> أداة OCamldoc بأن تُهمل العناصر الموضوعة بعده، حتى نهاية الصنف أو نوع الصنف أو الوحدة أو نوع الوحدة الحالي، أو حتى تعليق الإيقاف التالي. مثلًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">class</span> <span class="hljs-keyword">type</span> foo =
  <span class="hljs-keyword">object</span>
    <span class="hljs-comment">(** comment for method m *)</span>
    <span class="hljs-keyword">method</span> m : <span class="hljs-built_in">string</span>

    <span class="hljs-comment">(**/**)</span>

    <span class="hljs-comment">(** This method won&#x27;t appear in the documentation *)</span>
    <span class="hljs-keyword">method</span> bar : <span class="hljs-built_in">int</span>
  <span class="hljs-keyword">end</span>

<span class="hljs-comment">(** This value appears in the documentation, since the Stop special comment
    in the class does not affect the parent module of the class.*)</span>
<span class="hljs-keyword">val</span> foo : <span class="hljs-built_in">string</span>

<span class="hljs-comment">(**/**)</span>
<span class="hljs-comment">(** The value bar does not appear in the documentation.*)</span>
<span class="hljs-keyword">val</span> bar : <span class="hljs-built_in">string</span>
<span class="hljs-comment">(**/**)</span>

<span class="hljs-comment">(** The type t appears since in the documentation since the previous stop comment
toggled off the &quot;no documentation mode&quot;. *)</span>
<span class="hljs-keyword">type</span> t = <span class="hljs-built_in">string</span>
</code></pre>
<p>ويؤدي الخيار <strong><code>-no-stop</code></strong> في <code>ocamldoc</code> إلى تجاهل تعليقات الإيقاف الخاصة.</p>
<h3 id="1923-صيغة-تعليقات-التوثيق">19.2.3 صيغة تعليقات التوثيق</h3>
<p>يتكوّن داخل تعليقات التوثيق <code>(**</code>…<code>*)</code> من نص حرّ مع تعليقات تنسيق اختيارية، يتبعها <em>وسوم</em> اختيارية تعطي معلومات أدقّ عن المعاملات والإصدار والمؤلفين وغيرها. وتُتميَّز الوسوم بمحرف <code>@</code> في مقدمتها. وبذلك يكون لتعليق التوثيق الشكل التالي:</p>
<pre><code class="language-text">(** The comment begins with a description, which is text formatted
   according to the rules described in the next section.
   The description continues until the first non-escaped &#x27;@&#x27; character.
   @author Mr Smith
   @param x description for parameter x
*)
</code></pre>
<p>وبعض العناصر لا تدعم إلا مجموعة جزئية من وسوم <code>@</code> كلها؛ فالوسوم غير ذات الصلة بالعنصر الموثَّق تُهمَل ببساطة. مثلًا تُهمَل كل الوسوم عند توثيق بواني الأنواع وحقول السجلات وشروط وراثة الأصناف، وبالمثل يُهمَل وسم <code>@param</code> على متغيّر نسخة في صنف.</p>
<p>وأخيرًا، <code>(**)</code> هو تعليق التوثيق الفارغ.</p>
<h3 id="1924-تنسيق-النص">19.2.4 تنسيق النص</h3>
<p>فيما يلي قواعد BNF للغة الترميز البسيطة المستعملة لتنسيق أوصاف النص.</p>
<pre><code class="language-text">text::= {text-element}⁺
</code></pre>
<pre><code class="language-text">inline-text::= {inline-text-element}⁺
</code></pre>
<pre><code class="language-text">text-element ::=
</code></pre>
<table>
<thead>
<tr>
<th>∣</th>
<th><em>inline-text-element</em></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>∣</td>
<td><em>blank-line</em></td>
<td>إجبار سطر جديد.</td>
</tr>
</tbody>
</table>
<pre><code class="language-text">inline-text-element ::=
</code></pre>
<table>
<thead>
<tr>
<th>∣</th>
<th><code>{</code> { <code>0</code> … <code>9</code> }⁺ <em>inline-text</em> <code>}</code></th>
<th>تنسيق <em>text</em> ترويسةَ قسم؛ والعدد الصحيح التالي لـ <code>{</code> يدلّ على مستوى التقسيم.</th>
</tr>
</thead>
<tbody>
<tr>
<td>∣</td>
<td><code>{</code> { <code>0</code> … <code>9</code> }⁺ <code>:</code> <em>label</em> <em>inline-text</em> <code>}</code></td>
<td>الأمر نفسه، لكن مع ربط الاسم <em>label</em> بالنقطة الحالية. ويمكن الإحالة إلى هذه النقطة بوسمها المؤهَّل كاملًا في أمر <code>{!</code>، كما في أي عنصر آخر.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{b</code> <em>inline-text</em> <code>}</code></td>
<td>ضبط <em>text</em> بخط عريض.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{i</code> <em>inline-text</em> <code>}</code></td>
<td>ضبط <em>text</em> بخط مائل.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{e</code> <em>inline-text</em> <code>}</code></td>
<td>إبراز <em>text</em>.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{C</code> <em>inline-text</em> <code>}</code></td>
<td>توسيط <em>text</em>.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{L</code> <em>inline-text</em> <code>}</code></td>
<td>محاذاة <em>text</em> إلى اليسار.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{R</code> <em>inline-text</em> <code>}</code></td>
<td>محاذاة <em>text</em> إلى اليمين.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{ul</code> <em>list</em> <code>}</code></td>
<td>بناء قائمة.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{ol</code> <em>list</em> <code>}</code></td>
<td>بناء قائمة معدودة.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{{:</code> <em>string</em> <code>}</code> <em>inline-text</em> <code>}</code></td>
<td>وضع رابط إلى العنوان المعطى (بالسلسلة <em>string</em>) على <em>text</em> المعطى.</td>
</tr>
<tr>
<td>∣</td>
<td><code>[</code> <em>string</em> <code>]</code></td>
<td>ضبط السلسلة <em>string</em> المعطاة بنمط الشيفرة المصدرية.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{[</code> <em>string</em> <code>]}</code></td>
<td>ضبط السلسلة <em>string</em> المعطاة بنمط الشيفرة المصدرية المنسَّقة مسبقًا.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{v</code> <em>string</em> <code>v}</code></td>
<td>ضبط السلسلة <em>string</em> المعطاة بنمط حرفي.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{%</code> <em>string</em> <code>%}</code></td>
<td>محتوى خاص بهدف معيّن (شيفرة LATEX افتراضيًا، وانظر التفاصيل في 19.2.4.4).</td>
</tr>
<tr>
<td>∣</td>
<td><code>{!</code> <em>string</em> <code>}</code></td>
<td>إدراج إحالة مرجعية إلى عنصر (انظر القسم 19.2.4.2 لصيغة الإحالات المرجعية).</td>
</tr>
<tr>
<td>∣</td>
<td><code>{{!</code> <em>string</em> <code>}</code> <em>inline-text</em> <code>}</code></td>
<td>إدراج إحالة مرجعية بالنص المعطى.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{!modules:</code> <em>string</em> <em>string</em> ... <code>}</code></td>
<td>إدراج جدول فهرس لأسماء الوحدات المعطاة (في HTML فقط).</td>
</tr>
<tr>
<td>∣</td>
<td><code>{!indexlist}</code></td>
<td>إدراج جدول روابط إلى الفهارس المختلفة (الأنواع والقيم والوحدات وغيرها)، في HTML فقط.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{^</code> <em>inline-text</em> <code>}</code></td>
<td>ضبط النص في موضع علوي.</td>
</tr>
<tr>
<td>∣</td>
<td><code>{_</code> <em>inline-text</em> <code>}</code></td>
<td>ضبط النص في موضع سفلي.</td>
</tr>
<tr>
<td>∣</td>
<td><em>escaped-string</em></td>
<td>صفّ السلسلة المعطاة كما هي؛ ويجب هروب المحارف الخاصة (<code>{</code> و<code>}</code> و<code>[</code> و<code>]</code> و<code>@</code>) بمحرف <code>\\</code>.</td>
</tr>
</tbody>
</table>
<h4>19.2.4.1 تنسيق القوائم</h4>
<pre><code class="language-text">list::= ∣ { {- inline-text } }⁺ ∣ { {li inline-text } }⁺
</code></pre>
<p>وثمّة صيغة مختصرة للقوائم والقوائم المعدودة:</p>
<pre><code class="language-text">(** Here is a {b list}
- item 1
- item 2
- item 3

The list is ended by the blank line.*)
</code></pre>
<p>تكافئ:</p>
<pre><code class="language-text">(** Here is a {b list}
{ul {- item 1}
{- item 2}
{- item 3}}
The list is ended by the blank line.*)
</code></pre>
<p>والصيغة المختصرة نفسها متاحة للقوائم المعدودة باستعمال <code>+</code> بدلًا من <code>-</code>. ولاحظ أنه لا يمكن تعريف إلا قائمة واحدة بهذه الصيغة المختصرة في القوائم المتداخلة.</p>
<h4>19.2.4.2 تنسيق الإحالات المرجعية</h4>
<p>الإحالات المرجعية أسماء عناصر مؤهَّلة كاملة، كما في المثال <code>{!Foo.Bar.t}</code>. وهذه إحالة ملتبسة، إذ قد تدلّ على اسم نوع أو اسم قيمة أو اسم صنف وغيرها. ويمكن إزالة الالتباس بتحديد الصنف النحوي المقصود، باستعمال <code>{!type:Foo.Bar.t}</code> للدلالة على نوع، و<code>{!val:Foo.Bar.t}</code> للدلالة على قيمة بالاسم نفسه.</p>
<p>وقائمة الأصناف النحوية الممكنة كما يلي:</p>
<table>
<thead>
<tr>
<th><strong>الوسم</strong></th>
<th><strong>الصنف النحوي</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td><code>module:</code></td>
<td>وحدة</td>
</tr>
<tr>
<td><code>modtype:</code></td>
<td>نوع وحدة</td>
</tr>
<tr>
<td><code>class:</code></td>
<td>صنف</td>
</tr>
<tr>
<td><code>classtype:</code></td>
<td>نوع صنف</td>
</tr>
<tr>
<td><code>val:</code></td>
<td>قيمة</td>
</tr>
<tr>
<td><code>type:</code></td>
<td>نوع</td>
</tr>
<tr>
<td><code>exception:</code></td>
<td>استثناء</td>
</tr>
<tr>
<td><code>attribute:</code></td>
<td>سمة</td>
</tr>
<tr>
<td><code>method:</code></td>
<td>دالة صنف</td>
</tr>
<tr>
<td><code>section:</code></td>
<td>قسم ocamldoc</td>
</tr>
<tr>
<td><code>const:</code></td>
<td>باني متغيّر</td>
</tr>
<tr>
<td><code>recfield:</code></td>
<td>حقل سجل</td>
</tr>
</tbody>
</table>
<p>وفي حالة بواني المتغيّرات أو حقول السجلات ينبغي أن يسبق اسم الباني أو الحقل اسم النوع الموافق، لتجنّب التباس الأنواع التي تتشارك أسماء بوانيها. فمثلًا، يُحال إلى الباني <code>Node</code> من النوع <code>tree</code> بالصيغة <code>{!tree.Node}</code> أو <code>{!const:tree.Node}</code>، أو ربما <code>{!Mod1.Mod2.tree.Node}</code> من خارج الوحدة.</p>
<h4>19.2.4.3 الجملة الأولى</h4>
<p>في وصف قيمة أو نوع أو استثناء أو وحدة أو نوع وحدة أو صنف أو نوع صنف، تُستعمل <em>الجملة الأولى</em> أحيانًا في الفهارس، أو حين لا يُحتاج إلا إلى جزء من الوصف. وتتكوّن الجملة الأولى من أوائل محارف الوصف، حتى:</p>
<ul>
<li>
<p>أول نقطة يتبعها فراغ، أو</p>
</li>
<li>
<p>أول سطر فارغ</p>
</li>
</ul>
<p>خارج تنسيق النص التالي: <code>{ul</code> <em>list</em> <code>}</code> و<code>{ol</code> <em>list</em> <code>}</code> و<code>[</code> <em>string</em> <code>]</code> و<code>{[</code> <em>string</em> <code>]}</code> و<code>{v</code> <em>string</em> <code>v}</code> و<code>{%</code> <em>string</em> <code>%}</code> و<code>{!</code> <em>string</em> <code>}</code> و<code>{^</code> <em>text</em> <code>}</code> و<code>{_</code> <em>text</em> <code>}</code>.</p>
<h4>19.2.4.4 التنسيق الخاص بهدف معيّن</h4>
<p>المحتوى داخل <code>{%foo: ... %}</code> خاص بهدف معيّن، فلا يفسّره إلا الخلف <code>foo</code> ويُهمله غيره من الخلفيات. والخلفيات في التوزيعة هي <code>latex</code> و<code>html</code> و<code>texi</code> و<code>man</code>. وإن لم يُحدَّد هدف (الصيغة <code>{% ... %}</code>) اختير <code>latex</code> افتراضيًا. وقد تدعم المولّدات المخصّصة بادئة هدف خاصة بها.</p>
<h4>19.2.4.5 وسوم HTML المعروفة</h4>
<p>يمكن استعمال وسوم HTML <code>b</code> و<code>code</code> و<code>i</code> و<code>ul</code> و<code>ol</code> و<code>li</code> و<code>center</code> و<code>h0</code>…<code>h9</code> (مكتوبة في المصدر بين علامة أصغر وعلامة أكبر) بدلًا من <code>{b ..}</code> و<code>[..]</code> و<code>{i ..}</code> و<code>{ul ..}</code> و<code>{ol ..}</code> و<code>{li ..}</code> و<code>{C ..}</code> و<code>{[0-9] ..}</code> على الترتيب.</p>
<h3 id="1925-وسوم-التوثيق-وسوم">19.2.5 وسوم التوثيق (وسوم @)</h3>
<h4>الوسوم المعرَّفة مسبقًا</h4>
<p>يعطي الجدول التالي قائمة وسوم <code>@</code> المعرَّفة مسبقًا، مع صيغتها ومعناها.</p>
<table>
<thead>
<tr>
<th><code>@author</code> <em>string</em></th>
<th>مؤلف العنصر. مؤلف واحد لكل وسم <code>@author</code>، وقد تكون لعنصر واحد عدّة وسوم <code>@author</code>.</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>@deprecated</code> <em>text</em></td>
<td>ينبغي أن يصف <em>text</em> متى هُجر العنصر، وما يُستعمل بدلًا منه، وربما سبب الهجر.</td>
</tr>
<tr>
<td><code>@param</code> <em>id</em> <em>text</em></td>
<td>ربط الوصف المعطى (<em>text</em>) باسم المعامل المعطى <em>id</em>. يُستعمل هذا الوسم للدوال والدوال الأعضاء والأصناف والموصِّلات.</td>
</tr>
<tr>
<td><code>@raise</code> <em>Exc</em> <em>text</em></td>
<td>بيان أن العنصر قد يرفع الاستثناء <em>Exc</em>.</td>
</tr>
<tr>
<td><code>@return</code> <em>text</em></td>
<td>وصف القيمة المعادة وقيمها الممكنة. يُستعمل هذا الوسم للدوال والدوال الأعضاء.</td>
</tr>
<tr>
<td><code>@see</code> <code>&lt;</code> <em>URL</em> <code>&gt;</code> <em>text</em></td>
<td>إضافة إحالة إلى <em>URL</em> بالنص المعطى تعليقًا.</td>
</tr>
<tr>
<td><code>@see</code> <code>'</code><em>filename</em><code>'</code> <em>text</em></td>
<td>إضافة إحالة إلى اسم الملف المعطى (مكتوبًا بين علامتي اقتباس مفردتين) بالنص المعطى تعليقًا.</td>
</tr>
<tr>
<td><code>@see</code> <code>&quot;</code><em>document-name</em><code>&quot;</code> <em>text</em></td>
<td>إضافة إحالة إلى اسم الوثيقة المعطى (مكتوبًا بين علامتي اقتباس مزدوجتين) بالنص المعطى تعليقًا.</td>
</tr>
<tr>
<td><code>@since</code> <em>string</em></td>
<td>بيان متى أُدخل العنصر.</td>
</tr>
<tr>
<td><code>@before</code> <em>version</em> <em>text</em></td>
<td>ربط الوصف المعطى (<em>text</em>) بالإصدار المعطى <em>version</em> لتوثيق مسائل التوافق.</td>
</tr>
<tr>
<td><code>@version</code> <em>string</em></td>
<td>رقم إصدار العنصر.</td>
</tr>
</tbody>
</table>
<h4>الوسوم المخصّصة</h4>
<p>يمكنك استعمال وسوم مخصّصة في تعليقات التوثيق، لكنها لن تؤثّر إن لم يكن المولّد المستعمل يعالجها. ولاستعمال وسم مخصّص، مثل <code>foo</code>، ضع <code>@foo</code> مع نص في تعليقك، كما في:</p>
<pre><code class="language-text">(** My comment to show you a custom tag.
@foo this is the text argument to the [foo] custom tag.
*)
</code></pre>
<p>ولمعالجة الوسوم المخصّصة تحتاج إلى تعريف مولّد مخصّص، كما يوضّح القسم 19.3.2.</p>
<h2 id="193-المولدات-المخصصة">19.3 المولّدات المخصّصة</h2>
<p>يعمل OCamldoc على مرحلتين:</p>
<ol>
<li>
<p>تحليل ملفات المصدر؛</p>
</li>
<li>
<p>توليد التوثيق عبر مولّد توثيق، وهو كائن من الصنف <code>Odoc_args.class_generator</code>.</p>
</li>
</ol>
<p>ويمكن للمستخدمين تقديم مولّد توثيق خاص بهم يُستعمل في المرحلة الثانية بدلًا من المولّدات الافتراضية. وكل المعلومات المستخرجة في مرحلة التحليل متاحة عبر الوحدة <code>Odoc_info</code>، التي تتيح الوصول إلى جميع الأنواع والدوال التي تمثّل العناصر الموجودة في الوحدات المعطاة مع أوصافها المرتبطة بها.</p>
<p>أما الملفات التي يمكنك استعمالها لتعريف مولّدات مخصّصة فمثبَّتة في المجلد الفرعي <code>ocamldoc</code> من المكتبة القياسية لـ OCaml.</p>
<h3 id="1931-وحدات-المولد">19.3.1 وحدات المولّد</h3>
<p>يعتمد نوع وحدة المولّد على نوع التوثيق المولَّد. وفيما يلي قائمة أنواع وحدات المولّدات، مع اسم صنف المولّد في الوحدة:</p>
<ul>
<li>
<p>في HTML: <code>Odoc_html.Html_generator</code> (الصنف <code>html</code>)؛</p>
</li>
<li>
<p>في LATEX: <code>Odoc_latex.Latex_generator</code> (الصنف <code>latex</code>)؛</p>
</li>
<li>
<p>في TeXinfo: <code>Odoc_texi.Texi_generator</code> (الصنف <code>texi</code>)؛</p>
</li>
<li>
<p>في صفحات man: <code>Odoc_man.Man_generator</code> (الصنف <code>man</code>)؛</p>
</li>
<li>
<p>في graphviz (dot): <code>Odoc_dot.Dot_generator</code> (الصنف <code>dot</code>)؛</p>
</li>
<li>
<p>في الأنواع الأخرى: <code>Odoc_gen.Base</code> (الصنف <code>generator</code>).</p>
</li>
</ul>
<p>أي أن تعريف مولّد جديد يقتضي تنفيذ وحدة بالتوقيع المتوقَّع وبصنف المولّد المعطى، مع توفير الدالة <code>generate</code> نقطةَ دخول تجعل المولّد يولّد التوثيق لقائمة وحدات معطاة:</p>
<pre><code class="language-text">        method generate : Odoc_info.Module.t_module list -&gt; unit
</code></pre>
<p>تُستدعى هذه الدالة بقائمة بنى <code>Odoc_info.t_module</code> المحلَّلة والمدموجة ربما.</p>
<p>ويُستحسن أن ترث من المولّد الحالي من النوع نفسه الذي تريد تعريفه، فبذلك يمكن تحميل مولّدات مخصّصة متنوّعة لدمج التحسينات التي يأتي بها كل منها.</p>
<p>ويُفعل ذلك باستعمال الوحدات من المرتبة الأولى (انظر الفصل 12.5).</p>
<p>وأسهل طريقة لتعريف مولّد مخصّص هي المثال التالي، الذي يمدّ المولّد الحالي لـ HTML. ولا حاجة لنا إلى معرفة إن كان هذا هو مولّد HTML الأصلي المعرَّف في ocamldoc أم أنه مُدَّد سابقًا بمولّد مخصّص حُمِّل قبله:</p>
<pre><code class="language-text">module Generator (G : Odoc_html.Html_generator) =
struct
  class html =
    object(self)
      inherit G.html as html
      (* ... *)

      method generate module_list =
        (* ... *)
        ()

      (* ... *)
  end
end;;

let _ = Odoc_args.extend_html_generator (module Generator : Odoc_gen.Html_functor);;
</code></pre>
<p>ولمعرفة الدوال التي ينبغي تجاوزها أو الدوال المتاحة، ألقِ نظرة على التنفيذات الأساسية المختلفة بحسب نوع المولّد الذي تمدّه:</p>
<ul>
<li>
<p>في HTML: <a href="https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_html.ml"><code>odoc_html.ml</code></a>؛</p>
</li>
<li>
<p>في LATEX: <a href="https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_latex.ml"><code>odoc_latex.ml</code></a>؛</p>
</li>
<li>
<p>في TeXinfo: <a href="https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_texi.ml"><code>odoc_texi.ml</code></a>؛</p>
</li>
<li>
<p>في صفحات man: <a href="https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_man.ml"><code>odoc_man.ml</code></a>؛</p>
</li>
<li>
<p>في graphviz (dot): <a href="https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_dot.ml"><code>odoc_dot.ml</code></a>.</p>
</li>
</ul>
<h3 id="1932-معالجة-الوسوم-المخصصة">19.3.2 معالجة الوسوم المخصّصة</h3>
<p>جعل مولّد مخصّص يعالج وسومًا مخصّصة (انظر 19.2.5) أمر بسيط جدًا.</p>
<h4>في HTML</h4>
<p>إليك كيف تطوّر مولّد HTML يعالج وسومك المخصّصة.</p>
<p>يرث الصنف <code>Odoc_html.Generator.html</code> من الصنف <code>Odoc_html.info</code>، الذي يحوي حقلًا <code>tag_functions</code> هو قائمة أزواج تتكوّن من وسم مخصّص (مثل <code>&quot;foo&quot;</code>) ودالة تأخذ <code>text</code> وتعيد شيفرة HTML (من النوع <code>string</code>). ولمعالجة وسم جديد <code>bar</code>، مدّ المولّد الحالي لـ HTML وأكمل الحقل <code>tag_functions</code>:</p>
<pre><code class="language-text">module Generator (G : Odoc_html.Html_generator) =
struct
  class html =
    object(self)
      inherit G.html

      (** Return HTML code for the given text of a bar tag. *)
      method html_of_bar t = (* your code here *)

      initializer
        tag_functions &lt;- (&quot;bar&quot;, self#html_of_bar) :: tag_functions
  end
end
let _ = Odoc_args.extend_html_generator (module Generator : Odoc_gen.Html_functor);;
</code></pre>
<p>وثمّة دالة أخرى في الصنف <code>Odoc_html.info</code> تبحث عن الدالة المرتبطة بوسم مخصّص وتطبّقها على النص المعطى للوسم. وإن لم تكن ثمّة دالة مرتبطة بوسم مخصّص، طبعت الدالة رسالة تحذير على <code>stderr</code>.</p>
<h4>في المولّدات الأخرى</h4>
<p>يمكنك أن تفعل الشيء نفسه في الأنواع الأخرى من المولّدات.</p>
<h2 id="194-إضافة-خيارات-سطر-الأوامر">19.4 إضافة خيارات سطر الأوامر</h2>
<p>يُجرى تحليل سطر الأوامر بعد تحميل الوحدة التي تحوي مولّد التوثيق، ما يتيح إضافة خيارات إلى قائمة الخيارات الموجودة. وتُضاف الإضافة بالدالة:</p>
<pre><code class="language-text">        Odoc_args.add_option : string * Arg.spec * string -&gt; unit
</code></pre>
<p>ملاحظة: يمكن إعادة تعريف خيارات سطر الأوامر الموجودة باستعمال هذه الدالة.</p>
<h3 id="1941-الترجمة-والاستعمال">19.4.1 الترجمة والاستعمال</h3>
<h4>تعريف صنف مولّد مخصّص في ملف واحد</h4>
<p>ليكن <code>custom.ml</code> الملف الذي يعرّف صنف مولّد جديدًا. وتُجرى ترجمة <code>custom.ml</code> بالأمر التالي:</p>
<pre><code class="language-text">        ocamlc -I +ocamldoc -c custom.ml
</code></pre>
<p>ويُنشأ الملف <code>custom.cmo</code>، ويمكن استعماله هكذا:</p>
<pre><code class="language-text">        ocamldoc -g custom.cmo other-options source-files
</code></pre>
<p>أما الخيارات التي تختار مولّدًا مدمجًا لـ <code>ocamldoc</code>، مثل <code>-html</code>، فلا تؤثّر إن قُدِّم مولّد مخصّص من النوع نفسه بالخيار <code>-g</code>. وإن اختلف النوعان استُعمل المولّد المدمج المختار وأُهمل المخصّص.</p>
<h4>تعريف صنف مولّد مخصّص في عدّة ملفات</h4>
<p>يمكن تعريف صنف مولّد في عدّة وحدات معرَّفة في عدّة ملفات <em>file</em>₁<code>.ml</code>[<code>i</code>]، و<em>file</em>₂<code>.ml</code>[<code>i</code>]، …، و<em>file</em>ₙ<code>.ml</code>[<code>i</code>]. ويجب إنشاء ملف مكتبة <code>.cma</code> يضمّ كل هذه الملفات.</p>
<p>وتنشئ الأوامر التالية الملف <code>custom.cma</code> من الملفات <em>file</em>₁<code>.ml</code>[<code>i</code>]، …، و<em>file</em>ₙ<code>.ml</code>[<code>i</code>]:</p>
<pre><code class="language-text">ocamlc -I +ocamldoc -c file₁.ml[i]
ocamlc -I +ocamldoc -c file₂.ml[i]
...
ocamlc -I +ocamldoc -c fileₙ.ml[i]
ocamlc -o custom.cma -a file₁.cmo file₂.cmo ... fileₙ.cmo
</code></pre>
<p>ثم يستعمل الأمر التالي <code>custom.cma</code> مولّدًا مخصّصًا:</p>
<pre><code class="language-text">        ocamldoc -g custom.cma other-options source-files
</code></pre>
`,a={book:e,chapter:n,chapterTitle:o,slug:s,title:c,headings:t,html:d};export{e as book,n as chapter,o as chapterTitle,a as default,t as headings,d as html,s as slug,c as title};
