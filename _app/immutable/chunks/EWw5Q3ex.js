const s="db-design",a="chapter-3",n="Characteristics and Benefits of a Database",e="index",t="خصائص قاعدة البيانات وفوائدها",p=[{depth:2,id:"خصائص-قاعدة-البيانات-وفوائدها",text:"خصائص قاعدة البيانات وفوائدها"},{depth:3,id:"الطبيعة-الواصفة-لنظام-قاعدة-البيانات",text:"الطبيعة الواصفة لنظام قاعدة البيانات"},{depth:3,id:"العزل-بين-البرنامج-والبيانات",text:"العزل بين البرنامج والبيانات"},{depth:3,id:"دعم-وجهات-متعددة-لعرض-البيانات",text:"دعم وجهات متعددة لعرض البيانات"},{depth:3,id:"مشاركة-البيانات-والنظام-متعدد-المستخدمين",text:"مشاركة البيانات والنظام متعدد المستخدمين"},{depth:3,id:"التحكم-في-تكرار-البيانات",text:"التحكم في تكرار البيانات"},{depth:3,id:"مشاركة-البيانات",text:"مشاركة البيانات"},{depth:3,id:"فرض-قيود-السلامة-integrity",text:"فرض قيود السلامة (integrity)"},{depth:3,id:"تقييد-الوصول-غير-المصرح-به",text:"تقييد الوصول غير المصرّح به"},{depth:3,id:"استقلالية-البيانات-data-independence",text:"استقلالية البيانات (data independence)"},{depth:3,id:"معالجة-المعاملات-transaction-processing",text:"معالجة المعاملات (transaction processing)"},{depth:3,id:"توفير-وجهات-متعددة-لعرض-البيانات",text:"توفير وجهات متعددة لعرض البيانات"},{depth:3,id:"مرافق-النسخ-الاحتياطي-backup-والاسترجاع-recovery",text:"مرافق النسخ الاحتياطي (backup) والاسترجاع (recovery)"},{depth:2,id:"نسب-العمل",text:"نسب العمل"}],l=`<p>النص الرئيسي</p>
<pre><code class="language-sql">Key Terms

concurrency control strategies: features <span class="hljs-keyword">of</span> a database that allow several users access <span class="hljs-keyword">to</span> the same data item <span class="hljs-keyword">at</span> the same <span class="hljs-type">time</span>

data type: determines the sort <span class="hljs-keyword">of</span> data permitted <span class="hljs-keyword">in</span> a field, <span class="hljs-keyword">for</span> example numbers <span class="hljs-keyword">only</span>

data uniqueness: ensures that <span class="hljs-keyword">no</span> duplicates <span class="hljs-keyword">are</span> entered

database <span class="hljs-keyword">constraint</span>: a restriction that determines what <span class="hljs-keyword">is</span> allowed <span class="hljs-keyword">to</span> be entered <span class="hljs-keyword">or</span> edited <span class="hljs-keyword">in</span> a <span class="hljs-keyword">table</span>

metadata: defines <span class="hljs-keyword">and</span> describes the data <span class="hljs-keyword">and</span> relationshipsbetween tables <span class="hljs-keyword">in</span> the database

read <span class="hljs-keyword">and</span> write privileges: the ability <span class="hljs-keyword">to</span> <span class="hljs-keyword">both</span> read <span class="hljs-keyword">and</span> modify a file

read<span class="hljs-operator">-</span><span class="hljs-keyword">only</span> access: the ability <span class="hljs-keyword">to</span> read a file but <span class="hljs-keyword">not</span> make changes

self<span class="hljs-operator">-</span>describing: a database <span class="hljs-keyword">system</span> <span class="hljs-keyword">is</span> referred <span class="hljs-keyword">to</span> <span class="hljs-keyword">as</span> self<span class="hljs-operator">-</span>describing because it <span class="hljs-keyword">not</span> <span class="hljs-keyword">only</span> <span class="hljs-keyword">contains</span> the database itself, but also metadatawhich defines <span class="hljs-keyword">and</span> describes the data <span class="hljs-keyword">and</span> relationships <span class="hljs-keyword">between</span> tables <span class="hljs-keyword">in</span> the database

<span class="hljs-keyword">view</span>: a <span class="hljs-keyword">subset</span> <span class="hljs-keyword">of</span> the database
</code></pre>
<p>تعني إدارة المعلومات العناية بها بحيث تعمل لصالحنا وتكون مفيدة للمهام التي نؤديها. ومن خلال استخدام نظام إدارة قواعد البيانات (DBMS)، لم تعد المعلومات التي نجمعها ونضيفها إلى قاعدة بياناته عرضة للفوضى العرضية. بل تصبح أكثر إتاحةً ومندمجةً مع بقية أعمالنا. وإدارة المعلومات باستخدام قاعدة البيانات (database) تتيح لنا أن نصبح مستخدمين استراتيجيين للبيانات (data) التي لدينا.</p>
<pre><code class="language-sql">Exercises

How <span class="hljs-keyword">is</span> a DBMS distinguished <span class="hljs-keyword">from</span> a file<span class="hljs-operator">-</span>based <span class="hljs-keyword">system</span>?
What <span class="hljs-keyword">is</span> data independence <span class="hljs-keyword">and</span> why <span class="hljs-keyword">is</span> it important?
What <span class="hljs-keyword">is</span> the purpose <span class="hljs-keyword">of</span> managing information?
Discuss the uses <span class="hljs-keyword">of</span> databases <span class="hljs-keyword">in</span> a business environment.
What <span class="hljs-keyword">is</span> metadata?
</code></pre>
<p>غالبًا ما نحتاج إلى الوصول إلى البيانات وإعادة فرزها لمختلف الاستخدامات. وقد تشمل ذلك:</p>
<ul>
<li>إنشاء قوائم البريد</li>
<li>كتابة تقارير الإدارة</li>
<li>توليد قوائم بأخبار مختارة</li>
<li>تحديد احتياجات العملاء المختلفة</li>
</ul>
<p>تتيح القدرة المعالجةية لقاعدة البيانات معالجة البيانات التي تضمّها، ولذلك يمكن لها أن:</p>
<ul>
<li>تفرز</li>
<li>تطابق</li>
<li>تربط</li>
<li>تدمج (تجميع)</li>
<li>تتخطى حقولًا</li>
<li>تحسب</li>
<li>ترتّب</li>
</ul>
<p>ولفضل التنوع في قواعد البيانات، نجدها تعمل على تشغيل مختلف المشاريع. ويمكن ربط قاعدة البيانات بـ:</p>
<ul>
<li>موقع ويب يسجّل المستخدمين المسجلين</li>
<li>تطبيق لتتبّع العملاء لمنظمات الخدمات الاجتماعية</li>
<li>نظام سجلات طبية لمنشأة رعاية صحية</li>
<li>دفتر عناوينك الشخصي في برنامج بريدك الإلكتروني</li>
<li>مجموعة من المستندات المعالَجة المنشورة</li>
<li>نظام يُصدر الحجوزات الجوية</li>
</ul>
<h2 id="خصائص-قاعدة-البيانات-وفوائدها">خصائص قاعدة البيانات وفوائدها</h2>
<p>هناك عدد من الخصائص التي تميّز نهج قاعدة البيانات عن نظام الملفات أو نهجه. ويصف هذا الفصل فوائد (وميزات) نظام قاعدة البيانات.</p>
<h3 id="الطبيعة-الواصفة-لنظام-قاعدة-البيانات">الطبيعة الواصفة لنظام قاعدة البيانات</h3>
<p>يُشار إلى نظام قاعدة البيانات بأنه ذاتي الوصف (self-describing) لأنه لا يحتوي على قاعدة البيانات نفسها فحسب، بل يحتوي أيضًا على البيانات الوصفية (metadata) التي تعرّف البيانات وتصفها وتصف العلاقات (relationships) بين الجداول (tables) في قاعدة البيانات. وتُستخدم هذه المعلومات من قبل برنامج نظام إدارة قواعد البيانات (DBMS) أو من قبل مستخدمي قاعدة البيانات عند الحاجة. وهذا الفصل بين البيانات والمعلومات الخاصة بالبيانات يجعل نظام قاعدة البيانات مختلفًا تمامًا عن نظام الملفات التقليدي، الذي يكون فيه تعريف البيانات جزءًا من برامج التطبيقات.</p>
<h3 id="العزل-بين-البرنامج-والبيانات">العزل بين البرنامج والبيانات</h3>
<p>في نظام الملفات، تُعرَّف بنية ملفات البيانات داخل برامج التطبيقات، ولذلك إذا أراد مستخدم تغيير بنية ملف، فقد يحتاج إلى تغيير جميع البرامج التي تصل إلى ذلك الملف أيضًا.</p>
<p>وفي المقابل، في نهج قاعدة البيانات، تُخزَّن بنية البيانات في كتالوج النظام (system catalogue) وليس في البرامج. ولذلك فإن تغييرًا واحدًا هو كل ما يلزم لتغيير بنية الملف. 그리고 هذا العزل بين البرامج والبيانات يُسمى أيضًا استقلالية البرنامج عن البيانات (program-data independence).</p>
<h3 id="دعم-وجهات-متعددة-لعرض-البيانات">دعم وجهات متعددة لعرض البيانات</h3>
<p>تدعم قاعدة البيانات وجهات (views) متعددة لعرض البيانات. ووجهة العرض هي مجموعة جزئية من قاعدة البيانات، تُعرَّف وتُخصَّص لمستخدمين بعينهم من مستخدمي النظام. وقد يكون لدى المستخدمين المختلفين في النظام وجهات عرض مختلفة. وقد تحتوي كل وجهة عرض على البيانات التي تهم مستخدمًا أو مجموعة مستخدمين فحسب.</p>
<h3 id="مشاركة-البيانات-والنظام-متعدد-المستخدمين">مشاركة البيانات والنظام متعدد المستخدمين</h3>
<p>صُمِّمت أنظمة قواعد البيانات الحالية لتخدم مستخدمين متعددين. أي أنها تتيح للعديد من المستخدمين الوصول إلى قاعدة البيانات نفسها في الوقت نفسه. ويُتحقق هذا الوصول من خلال ميزات تُسمى استراتيجيات التحكم في التزامن (concurrency control strategies). وتضمن هذه الاستراتيجيات أن تكون البيانات التي يتم الوصول إليها صحيحة دائمًا وأن تُحفظ سلامة البيانات (data integrity).</p>
<p>ويُعدّ تصميم أنظمة قواعد البيانات الحديثة متعددة المستخدمين تحسينًا كبيرًا مقارنةً بتلك التي كانت في الماضي تقصر الاستخدام على شخص واحد في كل مرة.</p>
<h3 id="التحكم-في-تكرار-البيانات">التحكم في تكرار البيانات</h3>
<p>في نهج قاعدة البيانات، يُفضَّل أن يُخزَّن كل عنصر بيانات في مكان واحد فقط داخل قاعدة البيانات. وفي بعض الحالات، لا يزال تكرار البيانات (data redundancy) موجودًا لتحسين أداء النظام، غير أن هذا التكرار تخضعه لرقابة البرمجة التطبيقية، ويُحفظ عند الحد الأدنى له من خلال إدخال أقل قدر ممكن من التكرار عند تصميم قاعدة البيانات.</p>
<h3 id="مشاركة-البيانات">مشاركة البيانات</h3>
<p>إن دمج جميع بيانات المؤسسة داخل نظام قاعدة البيانات واحد له مزايا كثيرة. أولًا، إنه يتيح مشاركة البيانات بين الموظفين وسائر من يملكون صلاحية الوصول إلى النظام. ثانيًا، إنه يمنح المستخدمين القدرة على توليد معلومات أكثر من كمية بيانات معينة مقارنةً بما كان ممكنًا بدون هذا الدمج.</p>
<h3 id="فرض-قيود-السلامة-integrity">فرض قيود السلامة (integrity)</h3>
<p>يجب أن توفر أنظمة إدارة قواعد البيانات القدرة على تعريف قيود (constraints) معينة وفرضها، وذلك لضمان أن يدخل المستخدمون معلومات صحيحة وأن تُحفظ سلامة البيانات. وقيد قاعدة البيانات (database constraint) هو تقييد أو قاعدة تحدد ما يمكن إدخاله أو تحريره في جدول، مثل الرمز البريدي بتنسيق معين، أو إدخال مدينة صحيحة في حقل المدينة.</p>
<p>هناك أنواع كثيرة من قيود قاعدة البيانات. فنوع البيانات (data type) مثلًا يحدد نوع البيانات المسموح بها في حقل، مثل الأرقام فقط. وتضمن فريدة البيانات (data uniqueness)، مثل المفتاح الأساسي (primary key)، عدم إدخال أي تكرارات. وقد تكون القيود بسيطة (قائمة على الحقول) أو معقدة (قائمة على البرمجة).</p>
<h3 id="تقييد-الوصول-غير-المصرح-به">تقييد الوصول غير المصرّح به</h3>
<p>لن يكون لجميع مستخدمي نظام قاعدة البيانات نفسها صلاحيات الوصول. فعلى سبيل المثال، قد يملك أحد المستخدمين صلاحية قراءة فقط (أي القدرة على قراءة ملف دون إجراء تغييرات)، بينما قد يملك آخر صلاحيات القراءة والكتابة، وهي القدرة على قراءة ملف وتعديله معًا. ولهذا السبب، ينبغي أن يوفر نظام إدارة قواعد البيانات نظامًا فرعيًا للأمان لإنشاء أنواع مختلفة من حسابات المستخدمين والتحكم فيها وتقييد الوصول غير المصرّح به.</p>
<h3 id="استقلالية-البيانات-data-independence">استقلالية البيانات (data independence)</h3>
<p>تكمن إحدى مزايا نظام إدارة قواعد البيانات في الطريقة التي يتيح بها استقلالية البيانات. وبعبارة أخرى، فإن أوصاف بيانات النظام، أي البيانات التي تصف البيانات (metadata)، تكون مفصولة عن برامج التطبيقات. وهذا ممكن لأن التغييرات في بنية البيانات تتولاها نظام إدارة قواعد البيانات ولا تكون مضمَّنة في البرنامج نفسه.</p>
<h3 id="معالجة-المعاملات-transaction-processing">معالجة المعاملات (transaction processing)</h3>
<p>يجب أن يتضمن نظام إدارة قواعد البيانات أنظمة فرعية للتحكم في التزامن. وتضمن هذه الميزة أن تبقى البيانات متسقة وصالحة أثناء معالجة المعاملات، حتى لو قام عدة مستخدمين بتحديث المعلومات نفسها.</p>
<h3 id="توفير-وجهات-متعددة-لعرض-البيانات">توفير وجهات متعددة لعرض البيانات</h3>
<p>بطبيعته الخاصة، يتيح نظام إدارة قواعد البيانات (DBMS) للعديد من المستخدمين الوصول إلى قاعدة بيانته، سواء بصورة فردية أو في الوقت نفسه. وليس من المهم للمستخدمين أن يكونوا على علم بكيفية تخزين البيانات التي يصلون إليها وأين تُخزَّن</p>
<h3 id="مرافق-النسخ-الاحتياطي-backup-والاسترجاع-recovery">مرافق النسخ الاحتياطي (backup) والاسترجاع (recovery)</h3>
<p>النسخ الاحتياطي والاسترجاع هما طريقتان تتيحان لك حماية بياناتك من الفقدان. ويوفر نظام قاعدة البيانات عملية منفصلة عن عملية نسخ الشبكة الاحتياطية، لنسخ البيانات واسترجاعها. فإذا تعطّل قرص صلب ولم تعد قاعدة البيانات المخزَّنة على القرص الصلب قابلة للوصول، فإن الطريقة الوحيدة لاسترجاع قاعدة البيانات هي الاعتماد على نسخة احتياطية. وإذا تعطّل نظام حاسوب في أثناء عملية تحديث معقّدة، فإن النظام الفرعي للاسترجاع مسؤول عن التأكد من إعادة قاعدة البيانات إلى حالتها الأصلية. وهذه ميزتان إضافيتان من مزايا نظام إدارة قواعد البيانات.</p>
<p>استراتيجيات التحكم في التزامن (concurrency control strategies): ميزات لقاعدة البيانات تتيح لعدة مستخدمين الوصول إلى عنصر البيانات نفسه في الوقت نفسه</p>
<p>نوع البيانات (data type): يحدد نوع البيانات المسموح بها في حقل، مثل الأرقام فقط</p>
<p>فريدة البيانات (data uniqueness): تضمن عدم إدخال أي تكرارات</p>
<p>قيد قاعدة البيانات (database constraint): تقييد يحدد ما يُسمح بإدخاله أو تحريره في جدول</p>
<p>البيانات الوصفية (metadata): تعرّف البيانات وتصفها وتصف العلاقات بين الجداول في قاعدة البيانات</p>
<p>صلاحيات القراءة والكتابة (read and write privileges): القدرة على قراءة ملف وتعديله معًا</p>
<p>صلاحية القراءة فقط (read-only access): القدرة على قراءة ملف دون إجراء تغييرات</p>
<p>ذاتي الوصف (self-describing): يُشار إلى نظام قاعدة البيانات بأنه ذاتي الوصف لأنه لا يحتوي على قاعدة البيانات نفسها فحسب، بل يحتوي أيضًا على البيانات الوصفية التي تعرّف البيانات وتصفها وتصف العلاقات بين الجداول في قاعدة البيانات</p>
<p>وجهة العرض (view): مجموعة جزئية من قاعدة البيانات</p>
<ul>
<li>كيف يتميز نظام إدارة قواعد البيانات (DBMS) عن نظام الملفات؟</li>
<li>ما هي استقلالية البيانات (data independence) ولماذا هي مهمة؟</li>
<li>ما الغرض من إدارة المعلومات؟</li>
<li>ناقش استخدامات قواعد البيانات في بيئة الأعمال.</li>
<li>ما هي البيانات الوصفية (metadata)؟</li>
</ul>
<h2 id="نسب-العمل">نسب العمل</h2>
<p>هذا الفصل من كتاب Database Design هو نسخة مشتقة من <a href="http://cnx.org/contents/b57b8760-6898-469d-a0f7-06e0537f6817@1">Database System Concepts</a> من تأليف Nguyen Kim Anh، بترخيص <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution License 3.0 license</a></p>
<p>كُتبت المواد التالية من إعداد Adrienne Watt:</p>
<ul>
<li>مقدمة</li>
<li>المصطلحات الأساسية</li>
<li>تمارين</li>
</ul>
`,i={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:p,html:l};export{s as book,a as chapter,n as chapterTitle,i as default,p as headings,l as html,e as slug,t as title};
