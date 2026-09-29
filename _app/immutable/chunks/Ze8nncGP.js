const e="use-the-index-luke",a="sql-preface",n="Developers Need to Index",s="index",p="المطوّرون بحاجة إلى الفهرسة",r=[],o=`<p>مشكلات أداء SQL قديمة قِدَم لغة SQL نفسها—بل قد يقول بعضهم إن SQL بطيء بطبيعته. ورغم أن ذلك ربما كان صحيحاً في الأيام الأولى لـSQL، فإنه ليس صحيحاً على الإطلاق اليوم. ومع ذلك، لا تزال مشكلات أداء SQL شائعة. فكيف يحدث ذلك؟</p>
<p>لغة SQL هي ربما أنجح لغة برمجة من الجيل الرابع (fourth-generation programming language — 4GL). وميزتها الأساسية هي القدرة على الفصل بين <em>«ماذا»</em> و*«كيف»*. فعبارة SQL وصف مباشر لما هو مطلوب دون تعليمات حول كيفية إنجازه. تأمّل المثال التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> date_of_birth
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> last_name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;WINAND&#x27;</span>
</code></pre>
<p>تُقرأ استعلامات SQL كجملة إنجليزية تشرح البيانات المطلوبة. وكتابة عبارات SQL لا تتطلب عموماً أي معرفة بالعمل الداخلي لقاعدة بيانات (database) أو نظام التخزين (مثل الأقراص والملفات وغيرها). فلا حاجة لإخبار قاعدة البيانات بالملفات التي يجب فتحها أو بكيفية العثور على الصفوف المطلوبة. وكثير من المطوّرين لديهم سنوات من الخبرة في SQL، ومع ذلك يعرفون القليل جداً عمّا يجري من معالجة داخل قاعدة البيانات.</p>
<p>فصل الاهتمامات—ما هو مطلوب مقابل كيفية الحصول عليه—يعمل ببراعة ملحوظة في SQL، لكنه لا يزال غير مثالي. فتصل عملية التجريد إلى حدودها عندما يتعلق الأمر بالأداء: فمؤلف عبارة SQL، بحكم التعريف، لا يهمه <em>كيف</em> تنفّذ قاعدة البيانات العبارة. وبالتالي فهو غير مسؤول عن التنفيذ البطيء. غير أن التجربة تثبت العكس؛ أي أن المؤلف يجب أن يعرف قليلاً عن قاعدة البيانات لمنع مشكلات الأداء.</p>
<p>ويتّضح أن الشيء الوحيد الذي يحتاج <em>المطوّرون</em> إلى تعلّمه هو الفهرسة. فالفهرسة في قاعدة البيانات مهمة تطويرية في واقع الأمر؛ لأن أهم معلومة للفهرسة السليمة ليست إعدادات نظام التخزين ولا تجهيز العتاد، بل كيفية استعلام التطبيق للبيانات. وهذه المعرفة—بمسار الوصول—ليست متاحة بسهولة لمديري قواعد البيانات (database administrators — DBAs) ولا للمستشارين الخارجيين. إذ يلزم وقت طويل لجمع هذه المعلومات عبر الهندسة العكسية للتطبيق؛ أما التطوير فيملك هذه المعلومات أصلاً.</p>
<p>يغطي هذا الكتاب كل ما يحتاج المطوّرون معرفته عن الفهارس—ولا شيء أكثر. وبعبارة أدق، يغطي الكتاب النوع الأهم من الفهارس فقط: <em>فهرس شجرة B</em> (B-tree index).</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ch-preface&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>يعمل فهرس شجرة B بالطريقة نفسها تقريباً في قواعد بيانات كثيرة. ويستخدم الكتاب أساساً مصطلحات قاعدة بيانات Oracle®، لكنه يشير إلى المصطلحات المقابلة في قواعد البيانات الأخرى حيث يكون ذلك مناسباً. كما تقدّم الملاحظات الجانبية مزيداً من المعلومات عن MySQL وPostgreSQL وSQL Server®.</p>
<p>بُنيت بنية الكتاب خصيصاً للمطوّرين؛ فمعظم الفصول تقابل جزءاً معيناً من عبارة SQL.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">الفصل الأول - تشريح الفهرس</a></p>
<p>الفصل الأول هو الوحيد الذي لا يغطي SQL تحديداً؛ فهو يتناول البنية الأساسية للفهرس. وفهم بنية الفهرس ضروري لمتابعة الفصول اللاحقة—لا تتجاوز هذا الفصل!</p>
<p>ورغم أن الفصل قصير نسبياً—نحو ثماني صفحات فقط—فإنك بعد إتمامه ستكون قد فهمت بالفعل ظاهرة الفهارس البطيئة.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause/index">الفصل الثاني - عبارة where</a></p>
<p>هنا نستفرغ كل جهدنا. يشرح هذا الفصل جميع جوانب عبارة <code>where</code>، من عمليات البحث البسيطة جداً بعمود واحد إلى العبارات المعقدة للنطاقات والحالات الخاصة مثل <code>LIKE</code>.</p>
<p>ويشكّل هذا الفصل متن الكتاب الرئيسي. فحين تتعلم استخدام هذه التقنيات، ستكتب SQL أسرع بكثير.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل الثالث - الأداء وقابلية التوسع</a></p>
<p>هذا الفصل استطراد قصير حول قياسات الأداء وقابلية توسع قاعدة البيانات. اعرف لماذا ليست إضافة العتاد أفضل حل للاستعلامات البطيئة.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-join/index">الفصل الرابع - عملية الضمّ</a></p>
<p>عودة إلى SQL: ستجد هنا شرحاً لكيفية استخدام الفهارس لإجراء ضمّ (join) سريع للجداول.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering/index">الفصل الخامس - تجميع البيانات</a></p>
<p>هل تساءلت يوماً إن كان هناك أي فرق بين اختيار عمود واحد أو جميع الأعمدة؟ إليك الإجابة—مع حيلة تحقق أداءً أفضل.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل السادس - الترتيب والتجميع</a></p>
<p>حتى <code>order by</code> و<code>group by</code> يمكن أن يستخدما الفهارس.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل السابع - النتائج الجزئية</a></p>
<p>يشرح هذا الفصل كيفية الاستفادة من التنفيذ «المتدفق» (pipelined) إذا لم تكن بحاجة إلى مجموعة النتائج كاملة.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-dml/index">الفصل الثامن - الإدراج والحذف والتحديث</a></p>
<p>كيف تؤثر الفهارس في أداء الكتابة؟ الفهارس ليست مجانية—استخدمها بحكمة!</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan/index">الملحق أ - خطط التنفيذ</a></p>
<p>سؤال قاعدة البيانات عن كيفية تنفيذها لعبارة ما.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory/index">الملحق ب - دليل الخرافات</a></p>
<p>يسرد بعض الخرافات الشائعة ويشرح الحقيقة. وسيُوسَّع مع نمو الكتاب.</p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema/index">الملحق ج - المخطط المثال</a></p>
<p>جميع عبارات <code>create</code> و<code>insert</code> لجداول الكتاب.</p>
<h4>نصيحة</h4>
<p>شرائح محاضرتي «<a href="https://www.slideshare.net/slideshow/indexes-neglectedperformanceallrounder/24103160">الفهارس: المنقذ المهجور للأداء</a>»</p>
`,i={book:e,chapter:a,chapterTitle:n,slug:s,title:p,headings:r,html:o};export{e as book,a as chapter,n as chapterTitle,i as default,r as headings,o as html,s as slug,p as title};
