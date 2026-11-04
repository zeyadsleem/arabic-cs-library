const n="ocaml-manual",e="ch30",o="المكتبة القياسية",c="index",d="المكتبة القياسية",l=[],i=`<h1>الفصل 30: المكتبة القياسية</h1>
<p>يصف هذا الفصل الدوال التي توفّرها المكتبة القياسية في OCaml. تُربط وحدات المكتبة القياسية تلقائيًا بملفات الشيفرة الهدف للمستخدم باستعمال الأمر <code>ocamlc</code>. وبالتالي يمكن استعمال هذه الوحدات في البرامج المستقلة من دون الحاجة إلى إضافة أي ملف <code>.cmo</code> على سطر الأوامر في مرحلة الربط. وبالمثل، في الاستعمال التفاعلي، يمكن استعمال هذه الأسماء العامة في عبارات النظام التفاعلي من دون الحاجة إلى تحميل أي ملف <code>.cmo</code> في الذاكرة.</p>
<p>وعلى خلاف الوحدة الأساسية <code>Stdlib</code>، لا تُفتح الوحدات الفرعية تلقائيًا عند بدء الترجمة أو عند إطلاق النظام التفاعلي. لذلك يلزم استعمال معرّفات مؤهَّلة للإشارة إلى الدوال التي توفّرها هذه الوحدات، أو إضافة التوجيهات <code>open</code>.</p>
<ul>
<li>
<p>الوحدة <code>Arg</code>: تحليل وسائط سطر الأوامر</p>
</li>
<li>
<p>الوحدة <code>Array</code>: عمليات على المصفوفات</p>
</li>
<li>
<p>الوحدة <code>ArrayLabels</code>: عمليات على المصفوفات (مع وسوم)</p>
</li>
<li>
<p>الوحدة <code>Atomic</code>: مراجع ذرّية</p>
</li>
<li>
<p>الوحدة <code>Bigarray</code>: مصفوفات عددية كبيرة متعدّدة الأبعاد</p>
</li>
<li>
<p>الوحدة <code>Bool</code>: قيم منطقية</p>
</li>
<li>
<p>الوحدة <code>Buffer</code>: مخازن مؤقتة قابلة للتمديد</p>
</li>
<li>
<p>الوحدة <code>Bytes</code>: متتاليات بايتات</p>
</li>
<li>
<p>الوحدة <code>BytesLabels</code>: متتاليات بايتات (مع وسوم)</p>
</li>
<li>
<p>الوحدة <code>Callback</code>: تسجيل قيم OCaml في زمن التشغيل المكتوب بلغة C</p>
</li>
<li>
<p>الوحدة <code>Char</code>: عمليات على المحارف</p>
</li>
<li>
<p>الوحدة <code>Complex</code>: أعداد مركّبة</p>
</li>
<li>
<p>الوحدة <code>Condition</code>: متغيّرات شرطية للمزامنة بين الخيوط</p>
</li>
<li>
<p>الوحدة <code>Domain</code>: توليد النطاقات وضمّها، والمتغيّرات المحلية للنطاق</p>
</li>
<li>
<p>الوحدة <code>Digest</code>: خلاصة رسائل MD5</p>
</li>
<li>
<p>الوحدة <code>Dynarray</code>: مصفوفات دينامية</p>
</li>
<li>
<p>الوحدة <code>Iarray</code>: مصفوفات غير قابلة للتغيير</p>
</li>
<li>
<p>الوحدة <code>Effect</code>: معالجات آثار عميقة وسطحية</p>
</li>
<li>
<p>الوحدة <code>Either</code>: قيم «إمّا»</p>
</li>
<li>
<p>الوحدة <code>Ephemeron</code>: الإفيميرونات وجداول التجزئة الضعيفة</p>
</li>
<li>
<p>الوحدة <code>Filename</code>: عمليات على أسماء الملفات</p>
</li>
<li>
<p>الوحدة <code>Float</code>: أعداد الفاصلة العائمة</p>
</li>
<li>
<p>الوحدة <code>Format</code>: الطباعة الجميلة</p>
</li>
<li>
<p>الوحدة <code>Fun</code>: قيم الدوال</p>
</li>
<li>
<p>الوحدة <code>Gc</code>: التحكّم في إدارة الذاكرة وإحصاءاتها؛ القيم المنهَّاة</p>
</li>
<li>
<p>الوحدة <code>Hashtbl</code>: جداول التجزئة ودوال التجزئة</p>
</li>
<li>
<p>الوحدة <code>In_channel</code>: قنوات الإدخال</p>
</li>
<li>
<p>الوحدة <code>Int</code>: أعداد صحيحة</p>
</li>
<li>
<p>الوحدة <code>Int32</code>: أعداد صحيحة ذات 32 بت</p>
</li>
<li>
<p>الوحدة <code>Int64</code>: أعداد صحيحة ذات 64 بت</p>
</li>
<li>
<p>الوحدة <code>Lazy</code>: حسابات مؤجَّلة</p>
</li>
<li>
<p>الوحدة <code>Lexing</code>: مكتبة زمن التشغيل للمحلّلات المعجمية المولَّدة بـ <code>ocamllex</code></p>
</li>
<li>
<p>الوحدة <code>List</code>: عمليات على القوائم</p>
</li>
<li>
<p>الوحدة <code>ListLabels</code>: عمليات على القوائم (مع وسوم)</p>
</li>
<li>
<p>الوحدة <code>Map</code>: جداول اقتران على أنواع مرتَّبة</p>
</li>
<li>
<p>الوحدة <code>Marshal</code>: تصريف بنى البيانات</p>
</li>
<li>
<p>الوحدة <code>MoreLabels</code>: تضمّ الوحدات <code>Hashtbl</code> و<code>Map</code> و<code>Set</code> مع وسوم</p>
</li>
<li>
<p>الوحدة <code>Mutex</code>: أقفال الاستبعاد المتبادل</p>
</li>
<li>
<p>الوحدة <code>Nativeint</code>: أعداد صحيحة أصلية للمعالج</p>
</li>
<li>
<p>الوحدة <code>Oo</code>: الامتداد الكائني</p>
</li>
<li>
<p>الوحدة <code>Option</code>: القيم الاختيارية</p>
</li>
<li>
<p>الوحدة <code>Out_channel</code>: قنوات الإخراج</p>
</li>
<li>
<p>الوحدة <code>Pair</code>: أزواج القيم</p>
</li>
<li>
<p>الوحدة <code>Parsing</code>: مكتبة زمن التشغيل للمحلّلات النحوية المولَّدة بـ <code>ocamlyacc</code></p>
</li>
<li>
<p>الوحدة <code>Pqueue</code>: قوائم انتظار الأولوية</p>
</li>
<li>
<p>الوحدة <code>Printexc</code>: أدوات لطباعة الاستثناءات</p>
</li>
<li>
<p>الوحدة <code>Printf</code>: دوال الطباعة المنسَّقة</p>
</li>
<li>
<p>الوحدة <code>Queue</code>: قوائم انتظار «أولًا يدخل أولًا يخرج»</p>
</li>
<li>
<p>الوحدة <code>Random</code>: مولّد أعداد عشوائية شبه عشوائية (PRNG)</p>
</li>
<li>
<p>الوحدة <code>Repr</code>: دوال معرَّفة على التمثيل منخفض المستوى للقيم</p>
</li>
<li>
<p>الوحدة <code>Result</code>: قيم النتيجة</p>
</li>
<li>
<p>الوحدة <code>Scanf</code>: دوال إدخال منسَّقة</p>
</li>
<li>
<p>الوحدة <code>Seq</code>: مكرِّرات دالية</p>
</li>
<li>
<p>الوحدة <code>Set</code>: مجموعات على أنواع مرتَّبة</p>
</li>
<li>
<p>الوحدة <code>Semaphore</code>: السَّيْمَافورات، وهي آلية أخرى لمزامنة الخيوط</p>
</li>
<li>
<p>الوحدة <code>Stack</code>: مكدّسات «آخرًا يدخل أولًا يخرج»</p>
</li>
<li>
<p>الوحدة <code>StdLabels</code>: تضمّ الوحدات <code>Array</code> و<code>List</code> و<code>String</code> و<code>Iarray</code> مع وسوم</p>
</li>
<li>
<p>الوحدة <code>String</code>: عمليات على السلاسل</p>
</li>
<li>
<p>الوحدة <code>StringLabels</code>: عمليات على السلاسل (مع وسوم)</p>
</li>
<li>
<p>الوحدة <code>Sys</code>: واجهة النظام</p>
</li>
<li>
<p>الوحدة <code>Type</code>: استبطان الأنواع</p>
</li>
<li>
<p>الوحدة <code>Uchar</code>: محارف يونيكود</p>
</li>
<li>
<p>الوحدة <code>Unit</code>: قيم الوحدة</p>
</li>
<li>
<p>الوحدة <code>Weak</code>: مصفوفات مؤشرات ضعيفة</p>
</li>
</ul>
`,p={book:n,chapter:e,chapterTitle:o,slug:c,title:d,headings:l,html:i};export{n as book,e as chapter,o as chapterTitle,p as default,l as headings,i as html,c as slug,d as title};
