const n="db-design",s="chapter-10",a="ER Modelling",e="index",l="النمذجة باستخدام نموذج الكيانات والعلاقات",p=[{depth:2,id:"التصميم-العلائقي-والتكرار",text:"التصميم العلائقي والتكرار"},{depth:2,id:"شواهد-الإدراج",text:"شواهد الإدراج"},{depth:2,id:"شواهد-التحديث",text:"شواهد التحديث"},{depth:2,id:"شواهد-الحذف",text:"شواهد الحذف"},{depth:3,id:"مثال-جدول-مشاريع-الموظفين-وشواهده",text:"مثال: جدول مشاريع الموظفين وشواهده"},{depth:2,id:"كيف-تتجنب-الشواهد",text:"كيف تتجنّب الشواهد"},{depth:3,id:"مثال-فصل-جدولي-المشاريع-والموظفين",text:"مثال: فصل جدولي المشاريع والموظفين"},{depth:2,id:"الإسناد",text:"الإسناد"}],i=`<p>المتن الرئيسي</p>
<pre><code class="language-sql">Key Terms

deletion anomaly: occurs <span class="hljs-keyword">when</span> you <span class="hljs-keyword">delete</span> a record that may contain attributes that shouldn’t be deleted

functional dependency (FD): describes how individual attributes <span class="hljs-keyword">are</span> related

insertion anomaly: occurs <span class="hljs-keyword">when</span> you <span class="hljs-keyword">are</span> inserting inconsistent information <span class="hljs-keyword">into</span> a <span class="hljs-keyword">table</span>

<span class="hljs-keyword">join</span>: used <span class="hljs-keyword">when</span> you need <span class="hljs-keyword">to</span> obtain information based <span class="hljs-keyword">on</span> two related tables

<span class="hljs-keyword">update</span> anomaly: changing existing information incorrectly
</code></pre>
<p>تتمحور إحدى أهم النظريات المطوَّرة لنموذج الكيانات والعلاقات (entity relational model) حول مفهوم الاعتمادية الوظيفية (functional dependency, FD). والهدف من دراسة هذا المفهوم هو تعميق فهمك للعلاقات بين البيانات، واكتساب القدر الكافي من الصرامة المنطقية لمساعدتك في التصميم العملي لقواعد البيانات.</p>
<pre><code class="language-sql">Exercises

<span class="hljs-keyword">Normalize</span> Figure <span class="hljs-number">10.9</span>.

 IMAGE8END Figure <span class="hljs-number">10.9</span>. <span class="hljs-keyword">Table</span> <span class="hljs-keyword">for</span> question <span class="hljs-number">1</span>, <span class="hljs-keyword">by</span> A. Watt.

<span class="hljs-keyword">Create</span> a logical ERD <span class="hljs-keyword">for</span> an online movie rental service (<span class="hljs-keyword">no</span> many <span class="hljs-keyword">to</span> many relationships). Use the following description <span class="hljs-keyword">of</span> operations <span class="hljs-keyword">on</span> which your business rules must be based:The online movie rental service classifies movie titles according <span class="hljs-keyword">to</span> their type: comedy, western, classical, science fiction, cartoon, action, musical, <span class="hljs-keyword">and</span> <span class="hljs-keyword">new</span> release. <span class="hljs-keyword">Each</span> type <span class="hljs-keyword">contains</span> many possible titles, <span class="hljs-keyword">and</span> most titles <span class="hljs-keyword">within</span> a type <span class="hljs-keyword">are</span> available <span class="hljs-keyword">in</span> multiple copies. <span class="hljs-keyword">For</span> example, note the following summary:TYPE TITLE

Musical My Fair Lady (<span class="hljs-keyword">Copy</span> <span class="hljs-number">1</span>)

My Fair Lady (<span class="hljs-keyword">Copy</span> <span class="hljs-number">2</span>)

Oklahoma (<span class="hljs-keyword">Copy</span> <span class="hljs-number">1</span>)

Oklahoma (<span class="hljs-keyword">Copy</span> <span class="hljs-number">2</span>)

Oklahoma (<span class="hljs-keyword">Copy</span> <span class="hljs-number">3</span>)

etc. 
What three data anomalies <span class="hljs-keyword">are</span> likely <span class="hljs-keyword">to</span> be the <span class="hljs-keyword">result</span> <span class="hljs-keyword">of</span> data redundancy? How can such anomalies be eliminated?

Also see  Appendix B: Sample ERD Exercises
</code></pre>
<p>كما هي الحال مع القيود (constraints)، فإن الاعتماديات الوظيفية مستمدّة من دلالات مجال التطبيق. وبصفة جوهرية، تصف الاعتمادية الوظيفية كيفية ترابط الخصائص (attributes) الفردية. وهي نوع من القيود بين الخصائص داخل علاقة (relation)، وتسهم في إنتاج تصميم مخطط علائقي جيد. وفي هذا الفصل سننظر إلى:</p>
<ul>
<li>النظرية الأساسية وتعريف الاعتمادية الوظيفية</li>
<li>منهجية تحسين تصاميم المخططات، وتُعرف أيضًا بـ: التطبيع (normalization)</li>
</ul>
<h2 id="التصميم-العلائقي-والتكرار">التصميم العلائقي والتكرار</h2>
<p>بصفة عامة، يجب أن يلتقط التصميم الجيد لقاعدة بيانات علائقية جميع الخصائص والارتباطات الضرورية. وينبغي أن يتحقق ذلك بأقل قدر ممكن من المعلومات المخزَّنة ودون وجود بيانات مكرَّرة.</p>
<p>في تصميم قواعد البيانات، يكون التكرار (redundancy) غير مرغوب فيه بصفة عامة، لأنه يسبّب مشكلات في الحفاظ على الاتساق بعد التحديثات. غير أنه في بعض الأحيان يمكن للتكرار أن يؤدي إلى تحسين في الأداء؛ فمثلًا، عندما يمكن استخدام التكرار بدلًا من الدمج (join) لربط البيانات. ويُستخدم الدمج عندما تحتاج إلى الحصول على معلومات تعتمد على جدولين مترابطين.</p>
<p>تأمّل الشكل 10.1: يظهر العميل 1313131 مرتين، مرة مع الحساب رقم A-101 ومرة أخرى مع الحساب A-102. في هذه الحالة لا يكون رقم العميل مكرَّرًا، مع وجود شواهد حذف (deletion anomalies) في الجدول. ووجود جدول مستقل للعميل من شواهد حل هذه المشكلة. غير أنه إذا تغيّر عنوان أحد الفروع، فيتعين تحديثه في مواضع متعددة. وإذا تُرك رقم العميل في الجدول كما هو، فلن تحتاج إلى جدول للفروع ولن يلزم أي دمج (join)، ويتحسّن الأداء عندها.</p>
<p><img src="/images/db-design/chapter-10-0-Bank_Accounts_1_300x197.webp" alt="صورة توضيحية من الكتاب: Bank-Accounts-1-300x197"></p>
<h2 id="شواهد-الإدراج">شواهد الإدراج</h2>
<p>يحدث شاهد الإدراج (insertion anomaly) عندما تُدرِج معلومات غير متسقة في جدول. وعندما نُدرِج سجلًا جديدًا، مثل الحساب رقم A-306 في الشكل 10.2، نحتاج إلى التحقق من أن بيانات الفرع متسقة مع الصفوف الموجودة.</p>
<p><img src="/images/db-design/chapter-10-1-Insertion_Anomaly_Banking_Accounts_300x222.webp" alt="صورة توضيحية من الكتاب: Insertion-Anomaly-Banking-Accounts-300x222"></p>
<h2 id="شواهد-التحديث">شواهد التحديث</h2>
<p>إذا غيّر أحد الفروع عنوانه، مثل فرع Round Hill في الشكل 10.3، نحتاج إلى تحديث جميع الصفوف التي تشير إلى ذلك الفرع. وتُسمَّى التغييرات الخاطئة للمعلومات الموجودة شواهد تحديث (update anomaly).</p>
<p><img src="/images/db-design/chapter-10-2-Update_Anomaly_Bank_Accounts_300x198.webp" alt="صورة توضيحية من الكتاب: Update-Anomaly-Bank-Accounts-300x198"></p>
<h2 id="شواهد-الحذف">شواهد الحذف</h2>
<p>يحدث شاهد الحذف (deletion anomaly) عندما تحذف سجلًا قد يحتوي على خصائص لا ينبغي حذفها. فمثلًا، إذا أزلنا معلومات عن آخر حساب في أحد الفروع، مثل الحساب A-101 في فرع Downtown في الشكل 10.4، فإن جميع معلومات الفرع تختفي.</p>
<p><img src="/images/db-design/chapter-10-3-Deletion_anomaly_Bank_Account_300x195.webp" alt="صورة توضيحية من الكتاب: Deletion-anomaly-Bank-Account-300x195"></p>
<p>المشكلة في حذف الصف A-101 أننا لا نعرف أين يقع فرع Downtown، ونفقد جميع المعلومات المتعلقة بالعميل 1313131. ولتجنّب هذه الأنواع من مشكلات التحديث أو الحذف، نحتاج إلى تفكيك الجدول الأصلي (decompose) إلى عدة جداول أصغر يكون تداخل كل جدول فيها مع بقية الجداول أدنى حد ممكن.</p>
<p>يجب أن يحتوي كل جدول لحسابات البنك على معلومات كيان واحد (entity) فقط، مثل الفرع أو العميل، كما هو معروض في الشكل 10.5.</p>
<p><img src="/images/db-design/chapter-10-4-Ch_10_Branch_to_Customer_ERD_300x117.webp" alt="صورة توضيحية من الكتاب: Ch-10-Branch-to-Customer-ERD-300x117"></p>
<p>سواء اتّباع هذا الممارسة يضمن أنه عند إضافة معلومات الفرع أو تحديثها لن يؤثر ذلك إلا في سجل واحد. لذلك، عند إضافة معلومات العميل أو حذفها، لن تتغير معلومات الفرع عرضًا أو تُسجَّل بشكل خاطئ.</p>
<h3 id="مثال-جدول-مشاريع-الموظفين-وشواهده">مثال: جدول مشاريع الموظفين وشواهده</h3>
<p>يعرض الشكل 10.6 مثالًا على جدول مشاريع الموظفين. ومن هذا الجدول يمكننا أن نفترض ما يلي:</p>
<ul>
<li>يشكّل EmpID و ProjectID مفتاحًا مركّبًا (composite key) هو المفتاح الأساسي.</li>
<li>يحدّد ProjectID الميزانية Budget (أي أن المشروع P1 له ميزانية قدرها 32 ساعة).</li>
</ul>
<p><img src="/images/db-design/chapter-10-5-Ch_10_ProjectEmp_table.webp" alt="صورة توضيحية من الكتاب: Ch-10-ProjectEmp-table"></p>
<p>بعد ذلك، دعنا ننظر إلى بعض الشواهد المحتملة التي قد تحدث مع هذا الجدول خلال الخطوات التالية.</p>
<ul>
<li>الإجراء: إضافة الصف {S85,35,P1,9}</li>
<li>المشكلة: وجود ثنائيتين (tuple) بميزانيتين متعارضتين</li>
<li>الإجراء: حذف الثنائية {S79, 27, P3, 1}</li>
<li>المشكلة: الخطوة رقم 3 تحذف ميزانية المشروع P3</li>
<li>الإجراء: تحديث الثنائية {S75, 32, P1, 7} إلى {S75, 35, P1, 7}</li>
<li>المشكلة: الخطوة رقم 5 تنشئ ثنائيتين مختلفتين في قيمة ميزانية المشروع P1</li>
<li>الحل: إنشاء جدول مستقل لكلٍّ من المشاريع (Projects) والموظفين (Employees)، كما هو معروض في الشكل 10.7.</li>
</ul>
<p><img src="/images/db-design/chapter-10-6-Ch_10_Project_to_Emp_ERD_300x114.webp" alt="صورة توضيحية من الكتاب: Ch-10-Project-to-Emp-ERD-300x114"></p>
<h2 id="كيف-تتجنب-الشواهد">كيف تتجنّب الشواهد</h2>
<p>أفضل طريقة لإنشاء جداول خالية من الشواهد هي التأكد من أن الجداول مُطبَّعة (normalized)، ويتم ذلك بفهم الاعتماديات الوظيفية. فكل اعتمادية وظيفية تضمن انتماء جميع خصائص الجدول إليه. وبعبارة أخرى، فإنها تُزيل التكرار والشواهد.</p>
<h3 id="مثال-فصل-جدولي-المشاريع-والموظفين">مثال: فصل جدولي المشاريع والموظفين</h3>
<p><img src="/images/db-design/chapter-10-7-Ch_10_Project_and_Emp_tables_300x89.webp" alt="صورة توضيحية من الكتاب: Ch-10-Project-and-Emp-tables-300x89"></p>
<p>بالحفاظ على فصل البيانات باستخدام جدولي المشاريع (Project) والموظفين (Employee) المنفصلين:</p>
<ul>
<li>لن تنشأ أي شواهد إذا تغيّرت الميزانية.</li>
<li>لن تكون هناك حاجة إلى قيم وهمية للمشاريع التي لا يوجد موظفون مكلَّفون بها.</li>
<li>إذا حُذف إسهام موظف فلا تضيع أي بيانات مهمة.</li>
<li>لن تنشأ أي شواهد إذا أُضيف إسهام موظف.</li>
</ul>
<p>شاهد الحذف (deletion anomaly): يحدث عندما تحذف سجلًا قد يحتوي على خصائص لا ينبغي حذفها.</p>
<p>الاعتمادية الوظيفية (functional dependency, FD): تصف كيفية ترابط الخصائص الفردية</p>
<p>شاهد الإدراج (insertion anomaly): يحدث عندما تُدرِج معلومات غير متسقة في جدول</p>
<p>الدمج (join): يُستخدم عندما تحتاج إلى الحصول على معلومات تعتمد على جدولين مترابطين</p>
<p>شاهد التحديث (update anomaly): تغيير المعلومات الموجودة بشكل خاطئ</p>
<ul>
<li>طبِّع الجدول في الشكل 10.9. <img src="/images/db-design/chapter-10-8-Ch10_Exercises_Fig10_1_e1409190793977.webp" alt="صورة توضيحية من الكتاب: Ch10-Exercises -Fig10-1"> الشكل 10.9. جدول السؤال 1، عن A. Watt.</li>
<li>صمّم مخطط كيانات وعلاقات (ERD) منطقيًا لخدمة تأجير أفلام عبر الإنترنت (من دون علاقات متعدد إلى متعدد). واستخدم وصف العمليات التالي، الذي يجب أن تستند قواعد عملك (business rules) إليه: تصنّف خدمة تأجير الأفلام عبر الإنترنت عناوين الأفلام حسب نوعها: كوميدي، غربي، كلاسيكي، خيال علمي، كرتوني، حركة، موسيقي، وإصدار جديد. ويحتوي كل نوع على عناوين كثيرة محتملة، ومعظم العناوين داخل النوع الواحد متاحة بنسخ متعددة. فمثالًا، لاحظ الملخص التالي:TYPE TITLE Musical My Fair Lady (Copy 1) My Fair Lady (Copy 2) Oklahoma (Copy 1) Oklahoma (Copy 2) Oklahoma (Copy 3) etc.</li>
<li>ما الشواهد الثلاثة للبيانات التي يُرجَّح أن تنتج عن تكرار البيانات؟ وكيف يمكن إزالة هذه الشواهد؟</li>
</ul>
<p>انظر أيضًا الملحق B: تمارين ERD نموذجية</p>
<h2 id="الإسناد">الإسناد</h2>
<p>هذا الفصل من كتاب تصميم قواعد البيانات (database design)، بما في ذلك الصور ما لم يُنصّ على خلاف ذلك، هو نسخة مشتقة من <a href="http://cnx.org/contents/e5ac0441-0e54-4895-9112-fb3a4ee9bce1@1">نظرية التصميم العلائقي (Relational Design Theory)</a> لـ Nguyen Kim Anh بترخيص <a href="http://creativecommons.org/licenses/by/3.0/">رخصة المشاع الإبداعي: نسب المصنف 3.0</a></p>
<p>كتبت المادة التالية Adrienne Watt:</p>
<ul>
<li>مثال: جدول مشاريع الموظفين وشواهده</li>
<li>كيف تتجنّب الشواهد</li>
<li>المصطلحات المفتاحية</li>
<li>تمارين</li>
</ul>
`,o={book:n,chapter:s,chapterTitle:a,slug:e,title:l,headings:p,html:i};export{n as book,s as chapter,a as chapterTitle,o as default,p as headings,i as html,e as slug,l as title};
