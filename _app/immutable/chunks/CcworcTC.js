const s="db-design",a="chapter-7",n="The Relational Data Model",e="index",l="نموذج البيانات العلائقي",p=[{depth:2,id:"المفاهيم-الأساسية-في-نموذج-البيانات-العلائقي",text:"المفاهيم الأساسية في نموذج البيانات العلائقي"},{depth:3,id:"العلاقة-relation",text:"العلاقة (Relation)"},{depth:3,id:"الجدول-table",text:"الجدول (Table)"},{depth:3,id:"العمود-column",text:"العمود (Column)"},{depth:3,id:"النطاق-domain",text:"النطاق (Domain)"},{depth:3,id:"السجلات-records",text:"السجلات (Records)"},{depth:3,id:"الدرجة-degree",text:"الدرجة (Degree)"},{depth:2,id:"خصائص-الجدول",text:"خصائص الجدول"},{depth:2,id:"الإسناد-attribution",text:"الإسناد (Attribution)"}],t=`<p>المتن الرئيسي</p>
<pre><code class="language-sql">Key Terms

<span class="hljs-keyword">atomic</span> <span class="hljs-keyword">value</span>: <span class="hljs-keyword">each</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">in</span> the domain <span class="hljs-keyword">is</span> indivisible <span class="hljs-keyword">as</span> far <span class="hljs-keyword">as</span> the relational model <span class="hljs-keyword">is</span> concernedattribute: principle storage unit <span class="hljs-keyword">in</span> a database

<span class="hljs-keyword">column</span>: see attribute

degree: number <span class="hljs-keyword">of</span> attributes <span class="hljs-keyword">in</span> a <span class="hljs-keyword">table</span>

domain: the original sets <span class="hljs-keyword">of</span> <span class="hljs-keyword">atomic</span> <span class="hljs-keyword">values</span> used <span class="hljs-keyword">to</span> model data; a <span class="hljs-keyword">set</span> <span class="hljs-keyword">of</span> acceptable <span class="hljs-keyword">values</span> that a <span class="hljs-keyword">column</span> <span class="hljs-keyword">is</span> allowed <span class="hljs-keyword">to</span> contain

field: see attribute

file:see relation

record: <span class="hljs-keyword">contains</span> fields that <span class="hljs-keyword">are</span> related; see tuple

relation: a <span class="hljs-keyword">subset</span> <span class="hljs-keyword">of</span> the Cartesian product <span class="hljs-keyword">of</span> a list <span class="hljs-keyword">of</span> domains characterized <span class="hljs-keyword">by</span> a name; the technical term <span class="hljs-keyword">for</span> <span class="hljs-keyword">table</span> <span class="hljs-keyword">or</span> file

<span class="hljs-type">row</span>: see tuple

structured query <span class="hljs-keyword">language</span> (<span class="hljs-keyword">SQL</span>): the standard database access <span class="hljs-keyword">language</span>

<span class="hljs-keyword">table</span>:see relation

tuple: a technical term <span class="hljs-keyword">for</span> <span class="hljs-type">row</span> <span class="hljs-keyword">or</span> record

Terminology Key
Several <span class="hljs-keyword">of</span> the terms used <span class="hljs-keyword">in</span> this chapter <span class="hljs-keyword">are</span> synonymous. <span class="hljs-keyword">In</span> addition <span class="hljs-keyword">to</span> the Key Terms above, please refer <span class="hljs-keyword">to</span> <span class="hljs-keyword">Table</span> <span class="hljs-number">7.1</span> below. The terms <span class="hljs-keyword">in</span> the Alternative <span class="hljs-number">1</span> <span class="hljs-keyword">column</span> <span class="hljs-keyword">are</span> most commonly used.

 IMAGE3END <span class="hljs-keyword">Table</span> <span class="hljs-number">7.1</span>. Terms <span class="hljs-keyword">and</span> their synonyms <span class="hljs-keyword">by</span> A. Watt.
</code></pre>
<p>قدَّم E. F. Codd نموذج البيانات العلائقي (relational data model) عام 1970. وهو في الوقت الحالي أكثر نماذج البيانات (data models) استخدامًا على نطاق واسع.</p>
<pre><code class="language-sql">Exercises

 Use <span class="hljs-keyword">Table</span> <span class="hljs-number">7.2</span> <span class="hljs-keyword">to</span> answer questions <span class="hljs-number">1</span><span class="hljs-number">-4.</span>

<span class="hljs-keyword">Using</span> correct terminology, identify <span class="hljs-keyword">and</span> <span class="hljs-keyword">describe</span> <span class="hljs-keyword">all</span> the components  <span class="hljs-keyword">in</span> <span class="hljs-keyword">Table</span> <span class="hljs-number">7.2</span>.
What <span class="hljs-keyword">is</span> the possible domain <span class="hljs-keyword">for</span> field EmpJobCode?
How many records <span class="hljs-keyword">are</span> shown?
How many attributes <span class="hljs-keyword">are</span> shown?
List the properties <span class="hljs-keyword">of</span> a table.

 IMAGE4END <span class="hljs-keyword">Table</span> <span class="hljs-number">7.2</span>. <span class="hljs-keyword">Table</span> <span class="hljs-keyword">for</span> exercise questions, <span class="hljs-keyword">by</span> A. Watt.
</code></pre>
<p>وفَّر النموذج العلائقي (relational model) الأساس لما يلي:</p>
<ul>
<li>البحث في نظرية البيانات والعلاقات (relationship) والقيود (constraint)</li>
<li>منهجيات متعددة لتصميم قواعد البيانات</li>
<li>لغة الوصول القياسية إلى قواعد البيانات والمسماة بلغة الاستعلام البنيوية (structured query language - SQL)</li>
<li>كل أنظمة إدارة قواعد البيانات التجارية الحديثة تقريبًا</li>
</ul>
<p>يصف نموذج البيانات العلائقي العالم بأنه «مجموعة من العلاقات المترابطة (أو الجداول)».</p>
<h2 id="المفاهيم-الأساسية-في-نموذج-البيانات-العلائقي">المفاهيم الأساسية في نموذج البيانات العلائقي</h2>
<h3 id="العلاقة-relation">العلاقة (Relation)</h3>
<p>العلاقة (relation)، المعروفة أيضًا باسم الجدول أو الملف، هي مجموعة جزئية من حاصل ضرب ديكارتية لقائمة من النطاقات (domains) تتميّز باسم. وداخل الجدول، يمثّل كل صف مجموعة من قيم البيانات المترابطة. ويُشار إلى الصف أيضًا بأنه سجل (record) أو زوج (tuple). أما أعمدة الجدول فهي حقول (field) ويُشار إليها أيضًا بأنها سمات (attributes). ويمكنك التفكير في الأمر هكذا: تُستخدم السمة (attribute) لتعريف السجل، ويحتوي السجل على مجموعة من السمات.</p>
<p>توضّح الخطوات التالية المنطق الكامن وراء العلاقة ونطاقاتها.</p>
<ul>
<li>لنفترض أن النطاقات n تُرمز إليها بـ D1 وD2 و… وDn</li>
<li>وأن r هي علاقة معرَّفة على هذه النطاقات</li>
<li>عندئذٍ r ⊆ D1×D2×…×Dn</li>
</ul>
<h3 id="الجدول-table">الجدول (Table)</h3>
<p>تتألف قاعدة البيانات من عدة جداول، ويحتفظ كل جدول بالبيانات. ويوضح الشكل 7.1 قاعدة بيانات تحتوي على ثلاثة جداول.</p>
<p><img src="/images/db-design/chapter-7-0-School_Database_Fig_1_300x221.webp" alt="صورة توضيحية من الكتاب: Blue cylinder with three white rectangles each with a list of words."></p>
<h3 id="العمود-column">العمود (Column)</h3>
<p>تخزّن قاعدة البيانات قطعًا من المعلومات أو وقائع بطريقة منظَّمة. ويتطلب فهم كيفية استخدام قواعد البيانات والحصول على أقصى استفادة منها أن نفهم طريقة التنظيم تلك.</p>
<p>تُسمَّى وحدات التخزين الرئيسة الأعمدة (columns) أو الحقول (fields) أو السمات (attributes). وهي تضم المكوّنات الأساسية للبيانات التي يمكن تفكيك محتواك إليها. وعندما تقرّر أي الحقول ستنشئها، عليك التفكير بصورة عامة في معلوماتك، أي استخراج المكوّنات المشتركة من المعلومات التي ستخزّنها في قاعدة البيانات، وتجنّب التفاصيل التي تميّز عنصرًا عن آخر.</p>
<p>انظر إلى مثال بطاقة تعريف في الشكل 7.2 لترى العلاقة بين الحقول وبياناتها.</p>
<p><img src="/images/db-design/chapter-7-1-Record_300x177.webp" alt="صورة توضيحية من الكتاب: Record-300x177"></p>
<h3 id="النطاق-domain">النطاق (Domain)</h3>
<p>النطاق (domain) هو مجموعة القيم الذرّية (atomic values) الأصلية المستخدمة لنمذجة البيانات. وبقصد القيمة الذرّية، نعني أن كل قيمة في النطاق غير قابلة للتجزئة insofar ما يتعلق الأمر بالنموذج العلائقي. فمثلًا:</p>
<ul>
<li>نطاق الحالة الاجتماعية (Marital Status) لديه مجموعة من الاحتمالات: متزوج، أعزب، مطلق.</li>
<li>نطاق الوردية (Shift) لديه مجموعة كل الأيام الممكنة: {Mon, Tue, Wed…}.</li>
<li>نطاق الراتب (Salary) هو مجموعة كل الأعداد العشرية (floating-point) الأكبر من 0 والأصغر من 200,000.</li>
<li>نطاق الاسم الأول (First Name) هو مجموعة سلاسل الأحرف التي تمثّل أسماء الأشخاص.</li>
</ul>
<p>باختصار، النطاق هو مجموعة القيم المقبولة التي يُسمح للعمود أن يحتويها. وهذا يستند إلى خصائص مختلفة وإلى نوع البيانات (data type) الخاص بالعمود. وسنناقش أنواع البيانات في فصل آخر.</p>
<h3 id="السجلات-records">السجلات (Records)</h3>
<p>تمامًا كما يحتاج محتوى أي مستند أو عنصر إلى تفكيكه إلى أجزاء البيانات المكوّنة له ليُخزَّن في الحقول، فإن الروابط بينها تحتاج أيضًا إلى أن تكون متاحة حتى يمكن إعادة تركيبها إلى صيغتها الكاملة. تتيح لنا السجلات (records) القيام بذلك تحتوي السجلات على حقول مترابطة، مثل عميل أو موظف. وكما ذُكر سابقًا، فإن «الزوج» (tuple) مصطلح آخر يُستخدم للإشارة إلى السجل.</p>
<p>تشكّل السجلات والحقول أساس جميع قواعد البيانات. ويعطينا الجدول البسيط أوضح صورة لكيفية عمل السجلات والحقول معًا في مشروع تخزين قاعدة بيانات.</p>
<p><img src="/images/db-design/chapter-7-2-Table_Description_300x146.webp" alt="صورة توضيحية من الكتاب: image"></p>
<p>يبيّن لنا مثال الجدول البسيط في الشكل 7.3 كيف يمكن للحقول أن تضم مجموعة من البيانات المختلفة الأنواع. ويحتوي هذا الجدول على:</p>
<ul>
<li>حقل معرّف السجل (Record ID): هذا رقم ترتيبي؛ ونوع بياناته عدد صحيح.</li>
<li>حقل تاريخ النشر (PubDate): يُعرض بصيغة يوم/شهر/سنة؛ ونوع بياناته تاريخ.</li>
<li>حقل المؤلف (Author): يُعرض بالأحرف الأولى واللقب؛ ونوع بياناته نص.</li>
<li>حقل نصي للعنوان (Title): يمكن إدخال نص حر هنا.</li>
</ul>
<p>يمكنك أن تأمر قاعدة البيانات بأن تنقّب في بياناتها وتنظّمها بطريقة معينة. فمثلًا، يمكنك أن تطلب حصر مجموعة مختارة من السجلات حسب التاريخ: 1. كل ما يسبق تاريخًا معيّنًا، أو 2. كل ما يلي تاريخًا معيّنًا، أو 3. كل ما يقع بين تاريخين معيّنين. وبالمثل، يمكنك اختيار أن تُرتَّب السجلات حسب التاريخ. ولأن الحقل، أي السجل، الذي يحتوي على البيانات معدّ كحقل تاريخ (Date field)، فإن قاعدة البيانات تقرأ المعلومات الموجودة في حقل التاريخ لا بوصفها أرقامًا مفصولة بشرطات مائلة فحسب، بل بوصفها تواريخ يجب ترتيبها وفق نظام تقويم.</p>
<h3 id="الدرجة-degree">الدرجة (Degree)</h3>
<p>الدرجة (degree) هي عدد السمات (attributes) في الجدول. وفي مثالنا في الشكل 7.3، الدرجة هي 4.</p>
<h2 id="خصائص-الجدول">خصائص الجدول</h2>
<ul>
<li>للجدول اسم يميّزه عن جميع الجداول الأخرى في قاعدة البيانات.</li>
<li>لا توجد صفوف مكرّرة؛ كل صف مميّز.</li>
<li>القيم في الأعمدة ذرّية (atomic). لا يحتوي الجدول على مجموعات متكررة ولا على سمات متعدّدة القيم.</li>
<li>القيم في الأعمدة تنتمي إلى النطاق نفسه بناءً على نوع بياناتها، بما في ذلك: number (numeric, integer, float, smallint,…)</li>
<li>character (string)</li>
<li>date</li>
<li>logical (true or false)</li>
</ul>
<p>لا يُسمح بالعمليات التي تجمع بين أنواع بيانات مختلفة. لكل سمة اسم مميّز. وتسلسل الأعمدة غير مهم. وتسلسل الصفوف غير مهم.</p>
<p>القيمة الذرّية (atomic value): كل قيمة في النطاق غير قابلة للتجزئة insofar ما يتعلق الأمر بالنموذج العلائقي</p>
<p>السمة (attribute): وحدة التخزين الرئيسة في قاعدة البيانات</p>
<p>العمود (column): انظر السمة</p>
<p>الدرجة (degree): عدد السمات في الجدول</p>
<p>النطاق (domain): مجموعة القيم الذرّية الأصلية المستخدمة لنمذجة البيانات؛ مجموعة القيم المقبولة التي يُسمح للعمود أن يحتويها</p>
<p>الحقل (field): انظر السمة</p>
<p>الملف (file): انظر العلاقة</p>
<p>السجل (record): يحتوي على حقول مترابطة؛ انظر الزوج (tuple)</p>
<p>العلاقة (relation): مجموعة جزئية من حاصل ضرب ديكارتية لقائمة من النطاقات تتميّز باسم؛ المصطلح التقني للجدول أو الملف</p>
<p>الصف (row): انظر الزوج (tuple)</p>
<p>لغة الاستعلام البنيوية (structured query language - SQL): لغة الوصول القياسية إلى قواعد البيانات</p>
<p>الجدول (table): انظر العلاقة</p>
<p>الزوج (tuple): مصطلح تقني للصف أو السجل</p>
<h4>مفتاح المصطلحات (Terminology Key)</h4>
<p>عدة من المصطلحات المستخدمة في هذا الفصل مترادفة. وبالإضافة إلى المصطلحات المفتاحية أعلاه، يُرجى الرجوع إلى الجدول 7.1 أدناه. والمصطلحات الواردة في عمود «البديل 1» (Alternative 1) هي الأكثر شيوعًا في الاستخدام.</p>
<p><img src="/images/db-design/chapter-7-3-Terms.webp" alt="صورة توضيحية من الكتاب: A database table with words."></p>
<p>استخدم الجدول 7.2 للإجابة عن الأسئلة من 1 إلى 4.</p>
<ul>
<li>باستخدام المصطلحات الصحيحة، حدّد ووصف جميع المكوّنات في الجدول 7.2.</li>
<li>ما النطاق المحتمل للحقل EmpJobCode؟</li>
<li>كم عدد السجلات المعروضة؟</li>
<li>كم عدد السمات المعروضة؟</li>
<li>اذكر خصائص الجدول.</li>
</ul>
<p><img src="/images/db-design/chapter-7-4-Ch7_Exercises_Fig7_1_e1409190387554.webp" alt="صورة توضيحية من الكتاب: Table with 5 columns and 5 rows."></p>
<h2 id="الإسناد-attribution">الإسناد (Attribution)</h2>
<p>هذا الفصل من كتاب تصميم قواعد البيانات (Database Design)، بما في ذلك الصور باستثناء ما أُشير إليه خلاف ذلك، هو نسخة مشتقة من <a href="http://cnx.org/contents/e5ac0441-0e54-4895-9112-fb3a4ee9bce1@1">Relational Design Theory</a> بقلم Nguyen Kim Anh، وهو مرخَّص بموجب <a href="http://creativecommons.org/licenses/by/3.0/">رخصة المشاع الإبداعي: نسب العمل 3.0</a></p>
<p>كتبت المادة التالية Adrienne Watt:</p>
<ul>
<li>كل الأقسام أو بعضها المتعلقة بالعلاقات والجداول والأعمدة والدرجة</li>
<li>المصطلحات المفتاحية</li>
<li>التمارين</li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,r as default,p as headings,t as html,e as slug,l as title};
