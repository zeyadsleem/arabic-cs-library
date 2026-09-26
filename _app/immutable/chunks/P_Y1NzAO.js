const a="db-design",s="chapter-1",n="Before the Advent of Database Systems",e="index",l="قبل ظهور أنظمة قواعد البيانات",t=[{depth:2,id:"نظام-الملفات-file-based-system",text:"نظام الملفات (file-based system)"},{depth:3,id:"عيوب-نهج-الملفات-file-based-approach",text:"عيوب نهج الملفات (file-based approach)"},{depth:2,id:"نهج-قاعدة-البيانات-database-approach",text:"نهج قاعدة البيانات (database approach)"},{depth:3,id:"دور-قواعد-البيانات-في-الأعمال",text:"دور قواعد البيانات في الأعمال"},{depth:3,id:"معنى-البيانات-data",text:"معنى البيانات (data)"}],p=`<p>النص الرئيسي</p>
<pre><code class="language-sql">Key Terms

concurrency: the ability <span class="hljs-keyword">of</span> the database <span class="hljs-keyword">to</span> allow multiple users access <span class="hljs-keyword">to</span> the same record <span class="hljs-keyword">without</span> adversely affecting transaction processing

data element: a single fact <span class="hljs-keyword">or</span> piece <span class="hljs-keyword">of</span> information

data inconsistency: a situation <span class="hljs-keyword">where</span> various copies <span class="hljs-keyword">of</span> the same data <span class="hljs-keyword">are</span> conflicting

data isolation: a property that determines <span class="hljs-keyword">when</span> <span class="hljs-keyword">and</span> how changes made <span class="hljs-keyword">by</span> <span class="hljs-keyword">one</span> operation become visible <span class="hljs-keyword">to</span> other concurrent users <span class="hljs-keyword">and</span> systems

data integrity: refers <span class="hljs-keyword">to</span> the maintenance <span class="hljs-keyword">and</span> assurance that the data <span class="hljs-keyword">in</span> a database <span class="hljs-keyword">are</span> correct <span class="hljs-keyword">and</span> consistent

data redundancy: a situation that occurs <span class="hljs-keyword">in</span> a database <span class="hljs-keyword">when</span> a field needs <span class="hljs-keyword">to</span> be updated <span class="hljs-keyword">in</span> more than <span class="hljs-keyword">one</span> <span class="hljs-keyword">table</span>

database approach: allows the management <span class="hljs-keyword">of</span> <span class="hljs-keyword">large</span> amounts <span class="hljs-keyword">of</span> organizational information

database management software: a powerful software tool that allows you <span class="hljs-keyword">to</span> store, manipulate <span class="hljs-keyword">and</span> retrieve data <span class="hljs-keyword">in</span> a variety <span class="hljs-keyword">of</span> ways

file<span class="hljs-operator">-</span>based <span class="hljs-keyword">system</span>: an application program designed <span class="hljs-keyword">to</span> manipulate data files
</code></pre>
<p>لقد قطع الطريق الذي تُدار به الحواسيب البيانات (data) مسافة طويلة خلال العقود القليلة الماضية. يعتبر مستخدمو اليوم المزاياَ العديدة لنظام قاعدة البيانات (database system) أمرًا مفروغًا منه. غير أنه لم يمض وقت طويل حتى اعتمدت الحواسيب على نهج أقل أناقة وأكثر تكلفة بكثير في إدارة البيانات، يُسمى نظام الملفات (file-based system).</p>
<pre><code class="language-sql">Exercises

Discuss <span class="hljs-keyword">each</span> <span class="hljs-keyword">of</span> the following terms:

data
field
record
file

What <span class="hljs-keyword">is</span> data redundancy?
Discuss the disadvantages <span class="hljs-keyword">of</span> file<span class="hljs-operator">-</span>based systems.
Explain the difference <span class="hljs-keyword">between</span> data <span class="hljs-keyword">and</span> information.
Use Figure <span class="hljs-number">1.2</span> (below) <span class="hljs-keyword">to</span> answer the following questions.

<span class="hljs-keyword">In</span> the <span class="hljs-keyword">table</span>, how many records does the file contain?
How many fields <span class="hljs-keyword">are</span> there <span class="hljs-keyword">per</span> record?
What problem would you encounter if you wanted <span class="hljs-keyword">to</span> produce a listing <span class="hljs-keyword">by</span> city?
How would you solve this problem <span class="hljs-keyword">by</span> altering the file structure?

 IMAGE1END Figure <span class="hljs-number">1.2</span>. <span class="hljs-keyword">Table</span> <span class="hljs-keyword">for</span> exercise #<span class="hljs-number">5</span>, <span class="hljs-keyword">by</span> A. Watt.
</code></pre>
<h2 id="نظام-الملفات-file-based-system">نظام الملفات (file-based system)</h2>
<p>تتمثل إحدى طرق الاحتفاظ بالمعلومات على حاسوب في تخزينها في ملفات دائمة. لدى نظام الشركة عدد من برامج التطبيقات؛ صُمِّم كل منها لمعالجة ملفات البيانات. وقد كُتبت برامج التطبيقات هذه بطلب من المستخدمين في المؤسسة. وتُضاف التطبيقات الجديدة إلى النظام عند الحاجة إليها. ويُطلق على النظام الموصوف للتو اسم نظام الملفات (file-based system).</p>
<p>لنأخذ نظامًا مصرفيًا تقليديًا يستخدم نظام الملفات لإدارة بيانات المؤسسة المبيّنة في الشكل 1.1. وكما نرى، يوجد في المصرف أقسام مختلفة. ولكل قسم تطبيقات خاصة به تُدير ملفات البيانات المختلفة وتُعالجها. أما في الأنظمة المصرفية، فقد تُستخدم هذه البرامج لخصم مبلغ من حساب أو إيداع مبلغ فيه، أو للعثور على رصيد حساب، أو لإضافة قرض رهن عقاري جديد، أو لإصدار كشوف حساب شهرية.</p>
<p><img src="/images/db-design/chapter-1-0-FileBased_300x1701.webp" alt="صورة توضيحية من الكتاب: Diagram with three coloured drawings: one of a woman and two men sitting and talking; the second shows a man shaking hands with a woman, both are standing and holding briefcases; the third is of a woman sitting. There are also drawings of labelled files, such as Employees, Checking Accounts and Mortgage Loans."></p>
<h3 id="عيوب-نهج-الملفات-file-based-approach">عيوب نهج الملفات (file-based approach)</h3>
<p>استخدام نظام الملفات للاحتفاظ بمعلومات المؤسسة ينطوي على عدد من العيوب. وفيما يلي خمسة أمثلة على ذلك.</p>
<h4>تكرار البيانات (data redundancy)</h4>
<p>غالبًا ما تُنشأ الملفات والتطبيقات داخل المؤسسة على يد مبرمجين مختلفين من أقسام مختلفة خلال فترات زمنية طويلة. وقد يؤدي ذلك إلى تكرار البيانات (data redundancy)، وهي حالة تحدث في قاعدة البيانات (database) عندما يحتاج حقل (field) إلى تحديث في أكثر من جدول (table) واحد. وقد تؤدي هذه الممارسة إلى عدة مشكلات، منها:</p>
<ul>
<li>عدم اتساق في تنسيق البيانات</li>
<li>الاحتفاظ بالمعلومات نفسها في أماكن مختلفة متعددة (ملفات)</li>
<li>عدم اتساق البيانات، وهي حالة تتعارض فيها النسخ المختلفة من البيانات نفسها، مما يُهدِّر مساحة التخزين ويكرِّر الجهد</li>
</ul>
<h4>عزل البيانات (data isolation)</h4>
<p>عزل البيانات (data isolation) خاصية تحدد متى وكيف تصبح التغييرات التي تُجريها عملية ما مرئية للمستخدمين والأنظمة الأخرى المتزامنة. وتظهر هذه المشكلة في حالة تزامن (concurrency). وهذا يمثل مشكلةً لأن:</p>
<ul>
<li>يصعب على التطبيقات الجديدة استرجاع البيانات المناسبة، والتي قد تكون مخزَّنة في ملفات مختلفة.</li>
</ul>
<h4>مشكلات السلامة (integrity)</h4>
<p>مشكلات سلامة البيانات (data integrity) عيب آخر لاستخدام نظام الملفات. وهي تشير إلى صيانة البيانات في قاعدة البيانات والتأكد من صحتها واتساقها. والعوامل الواجب مراعاتها عند معالجة هذه المسألة هي:</p>
<ul>
<li>يجب أن تفي قيم البيانات بقيود اتساق معينة محددة في برامج التطبيقات.</li>
<li>يصعب إجراء تغييرات على برامج التطبيقات من أجل فرض قيود جديدة.</li>
</ul>
<h4>مشكلات الأمان (security)</h4>
<p>قد يمثل الأمان مشكلة في نهج الملفات، وذلك للأسباب التالية:</p>
<ul>
<li>هناك قيود تتعلق بصلاحيات الوصول.</li>
<li>تُضاف متطلبات التطبيقات إلى النظام على نحو ظرفي (ad-hoc)، مما يجعل من الصعب فرض القيود.</li>
</ul>
<h4>الوصول المتزامن (concurrency)</h4>
<p>التزامن (concurrency) هو قدرة قاعدة البيانات على السماح لمستخدمين متعددين بالوصول إلى السجل (record) نفسه دون الإضرار بمعالجة المعاملات (transaction). ويجب أن يدير نظام الملفات التزامن — أو يمنع حدوثه — من خلال برامج التطبيقات. فعادةً، في نظام الملفات، عندما يفتح تطبيق ملفًا فإن ذلك الملف يُقفل (locked). وهذا يعني أنه لا يمكن لأحد غيره الوصول إلى الملف في الوقت نفسه.</p>
<p>أما في أنظمة قواعد البيانات، فيُدار التزامن بما يسمح لمستخدمين متعددين بالوصول إلى السجل نفسه. وهذا فرق مهم بين أنظمة قواعد البيانات وأنظمة الملفات.</p>
<h2 id="نهج-قاعدة-البيانات-database-approach">نهج قاعدة البيانات (database approach)</h2>
<p>لقد أدت الصعوبات الناشئة عن استخدام نظام الملفات إلى تطوير منهج جديد في إدارة كميات كبيرة من معلومات المؤسسة، يسمى نهج قاعدة البيانات (database approach).</p>
<p>وتلعب قواعد البيانات وتقنياتها دورًا مهمًا في معظم المجالات التي تُستخدم فيها الحواسيب، بما في ذلك الأعمال والتعليم والطب. لفهم الأسس الأساسية لأنظمة قواعد البيانات، سنبدأ بتقديم بعض المفاهيم الأساسية في هذا المجال.</p>
<h3 id="دور-قواعد-البيانات-في-الأعمال">دور قواعد البيانات في الأعمال</h3>
<p>يستخدم الجميع قاعدة بيانات (database) بطريقة ما، حتى لو كان ذلك مجرد تخزين معلومات عن أصدقائهم وعائلاتهم. وقد تُكتب هذه البيانات (data) على الورق أو تُخزَّن في حاسوب باستخدام برنامج معالجة نصوص، أو قد تُحفظ في جدول بيانات (spreadsheet). غير أن أفضل طريقة لتخزين البيانات هي استخدام برنامج إدارة قواعد البيانات (DBMS). وهذه أداة برمجية قوية تتيح لك تخزين البيانات ومعالجتها واسترجاعها بطرق متنوعة مختلفة.</p>
<p>تحتفظ معظم الشركات ببيانات العملاء عن طريق تخزينها في قاعدة بيانات. وقد تشمل هذه البيانات العملاء أو الموظفين أو المنتجات أو الطلبات أو أي شيء آخر يساعد الشركة في عملياتها.</p>
<h3 id="معنى-البيانات-data">معنى البيانات (data)</h3>
<p>البيانات (data) هي معلومات وقعية مثل القياسات أو الإحصاءات الخاصة بالأشياء والمفاهيم. ونستخدم البيانات للمناقشة أو كجزء من عملية حسابية. وقد تكون البيانات شخصًا أو مكانًا أو حدثًا أو فعلًا أو أي واحد من عددٍ من الأمور. والحقيقة المفردة هي عنصر من عناصر البيانات، أو عنصر بيانات (data element).</p>
<p>إذا كانت البيانات معلومات، والمعلومات هي ما نتعامل مهنيًا معه، فيمكنك أن تبدأ في رؤية أين قد تكون مخزَّنة. ويمكن تخزين البيانات في:</p>
<ul>
<li>خزائن الملفات</li>
<li>جداول البيانات (spreadsheets)</li>
<li>المجلدات</li>
<li>الدفاتر المحاسبية (ledgers)</li>
<li>القوائم</li>
<li>أكوام من الأوراق على مكتبك</li>
</ul>
<p>تخزّن جميع هذه العناصر معلومات، وكذلك تفعل قاعدة البيانات. وبفضل الطبيعة الميكانيكية لقواعد البيانات، فإنها تملك قوة هائلة في إدارة المعلومات التي تحتفظ بها ومعالجتها. وهذا قد يجعل المعلومات التي تضمّها أكثر فائدة بكثير لعملك.</p>
<p>وبناءً على هذا الفهم للبيانات، يمكننا أن نبدأ في رؤية كيف قد تُحدث أداةٌ ذات القدرة على تخزين مجموعة من البيانات وتنظيمها، وإجراء بحث سريع عليها، واسترجاعها ومعالجتها، فرقًا في طريقة استخدامنا للبيانات. وكل ما يتناوله هذا الكتاب والفصول التي تليه يتعلق بإدارة المعلومات.</p>
<p>التزامن (concurrency): قدرة قاعدة البيانات على السماح لمستخدمين متعددين بالوصول إلى السجل نفسه دون الإضرار بمعالجة المعاملات</p>
<p>عنصر البيانات (data element): حقيقة مفردة أو جزء من المعلومات</p>
<p>عدم اتساق البيانات (data inconsistency): حالة تتعارض فيها النسخ المختلفة من البيانات نفسها</p>
<p>عزل البيانات (data isolation): خاصية تحدد متى وكيف تصبح التغييرات التي تُجريها عملية ما مرئية للمستخدمين والأنظمة الأخرى المتزامنة</p>
<p>سلامة البيانات (data integrity): تشير إلى صيانة البيانات في قاعدة بيانات والتأكد من صحتها واتساقها</p>
<p>تكرار البيانات (data redundancy): حالة تحدث في قاعدة بيانات عندما يحتاج حقل إلى تحديث في أكثر من جدول واحد</p>
<p>نهج قاعدة البيانات (database approach): يتيح إدارة كميات كبيرة من معلومات المؤسسة</p>
<p>برنامج إدارة قواعد البيانات (database management software): أداة برمجية قوية تتيح لك تخزين البيانات ومعالجتها واسترجاعها بطرق متنوعة</p>
<p>نظام الملفات (file-based system): برنامج تطبيق مصمم لمعالجة ملفات البيانات. ناقش كل مصطلح من المصطلحات التالية: البيانات، الحقل، السجل، الملف. ما هو تكرار البيانات؟ ناقش عيوب أنظمة الملفات. اشرح الفرق بين البيانات والمعلومات. استخدم الشكل 1.2 (أدناه) للإجابة عن الأسئلة التالية. في الجدول، كم عدد السجلات (records) التي يحتوي عليها الملف؟ وكم عدد الحقول (fields) لكل سجل؟ وما المشكلة التي ستواجهها إذا أردت إنتاج قائمة حسب المدينة؟ وكيف تحل هذه المشكلة بتعديل بنية الملف؟ <img src="/images/db-design/chapter-1-1-Ch1_Exercises_Figure1_1_e1409149351851.webp" alt="صورة توضيحية من الكتاب: A table listing project codes, names of project managers, phone numbers, addresses and bid prices."> الشكل 1.2. جدول التمرين رقم 5، من إعداد A. Watt. نسب العمل. هذا الفصل من كتاب Database Design (بما في ذلك صوره، ما لم يُنص على خلاف ذلك) هو نسخة مشتقة من <a href="http://cnx.org/contents/b57b8760-6898-469d-a0f7-06e0537f6817@1">Database System Concepts</a> من تأليف Nguyen Kim Anh، بترخيص <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution License 3.0 license</a></p>
<p>كُتبت المواد التالية من إعداد Adrienne Watt:</p>
<ul>
<li>مقدمة</li>
<li>المصطلحات الأساسية</li>
<li>تمارين</li>
</ul>
`,o={book:a,chapter:s,chapterTitle:n,slug:e,title:l,headings:t,html:p};export{a as book,s as chapter,n as chapterTitle,o as default,t as headings,p as html,e as slug,l as title};
