const s="database-foundations",a="sql-groupby-having",n="The GROUP BY and HAVING clauses in detail",e="index",p="جملتا GROUP BY وHAVING بالتفصيل",o=[{depth:2,id:"تجميع-الصفوف",text:"تجميع الصفوف"},{depth:2,id:"دوال-التجميع",text:"دوال التجميع"},{depth:3,id:"عد-عدد-الصفوف",text:"عدّ عدد الصفوف"},{depth:3,id:"مجموع-بيانات-معينة-في-مجموعة",text:"مجموع بيانات معينة في مجموعة"},{depth:3,id:"الحد-الأدنى-والحد-الأعلى-والمتوسط",text:"الحد الأدنى والحد الأعلى والمتوسط"},{depth:2,id:"التجميع-حسب-تعبير",text:"التجميع حسب تعبير"},{depth:2,id:"التجميع-حسب-عدة-أعمدة",text:"التجميع حسب عدة أعمدة"},{depth:2,id:"having",text:"HAVING"},{depth:2,id:"تمارين",text:"تمارين"},{depth:2,id:"تمارين-sqlzoo",text:"تمارين SQLzoo"}],l=`<blockquote>
<p>الالتباس جزء من البرمجة. —Felienne Hermans، The Programmer's Brain</p>
</blockquote>
<h2 id="تجميع-الصفوف">تجميع الصفوف</h2>
<p>في <a href="/arabic-cs-library/book/database-foundations/sql-csv/index#Grouping-data-with-GROUP-BY">فصل استيراد ملف CSV</a> تعرّفت لأول مرة على تجميع الصفوف. وكثيرًا ما يتضمن ذلك سؤالًا يحتوي الكلمتين &quot;لكل&quot;. مثال: &quot;أدخل <em>لكل محاضر</em> عدد المقررات التي يكون هذا المحاضر منسّقًا لها&quot;. &quot;يرجى تقديم **العدد الإجمالي للنقاط لجميع المقررات التي تُدرَّس الآن أو دُرِّست سابقًا بتلك اللغة&quot;. حسنًا، هذه الجملة الأخيرة لا تحتوي الكلمتين &quot;لكل&quot;، لكن يمكنك إعادة صياغتها هكذا: &quot;قدّم <em>لكل لغة</em> العدد الإجمالي لنقاط جميع المقررات التي تُدرَّس أو دُرِّست بتلك اللغة.&quot;.&quot;</p>
<p>والصورة التي نستخدمها هي: <em>جمّع الصفوف التي لها القيمة نفسها لحقل معين (أو حقول معينة) في صندوق</em>. ومن ذلك الصندوق، لم تعد تستطيع عرض الصفوف الفردية (فلا يُسمح لك بفتح الصندوق). وعليك أن تقتصر <em>على معلومات ملخّصة</em>.</p>
<p>وكمثال، لنأخذ السؤال أعلاه: &quot;لكل محاضر، يرجى تقديم عدد المقررات التي يكون هذا المحاضر (أو كان) منسّقًا لها.&quot;.</p>
<p>يمكنك اختبار أمثلة الشيفرة في جدول &quot;course&quot; في المخطط &quot;ucllcatalogue&quot; (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).</p>
<p>في خطوة أولى، كتمرين، اكتب الاستعلام الذي يولّد الشكل التالي، أي قائمة بجميع المنسّقين مع الرمز والاسم والفصل الدراسي، مرتبة حسب رمز المحاضر (رقم u، تصاعديًا):</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-groupby-having-0-sortbycoord.webp" alt=""></p>
<p>ليس استعلامًا صعبًا إلى هذا الحد، أليس كذلك؟</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator, code, name, semester
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> coordinator;
</code></pre>
<p>يمكنك أن تقرأ في هذا الشكل أن المحاضر 'u0012047' (هو أو كان) منسّقًا لـ 'Probleemoplossend denken' و'Web Development 1' و'Front-end Development'. والآن إذا جمّعت حسب المحاضر فستوضع جميع الصفوف ذات القيمة نفسها للعمود 'coordinator' معًا في صندوق واحد. وبذلك يحتوي الصندوق الأول على ثلاثة صفوف. وعلى الصندوق اسم الحقل المشترك بين جميع هذه الصفوف، أي 'u0012047'.</p>
<p>ويحتوي الصندوق الثاني المسمّى 'u0015529' على صفين. أما الصندوق الثالث ('u0032987') فيحتوي على صف واحد فقط، وهكذا.</p>
<p>وبما أن هذه الصفوف معًا في صندوق (ولا يُسمح لك بفتح الصناديق للنظر في صفوف محددة)، لم تعد تستطيع استرجاع بيانات فردية في جملة <code>SELECT</code>. وإذا حاولت فعل ذلك فستحصل على رسالة خطأ نمطية، كما توضح قطعة الشيفرة التالية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator, code, name, semester
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> coordinator;

<span class="hljs-comment">-- the result of this query is this error:</span>
ERROR: <span class="hljs-keyword">column</span> &quot;course.code&quot; must appear <span class="hljs-keyword">in</span> the <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> clause
  <span class="hljs-keyword">or</span> be used <span class="hljs-keyword">in</span> an aggregate <span class="hljs-keyword">function</span>
LINE <span class="hljs-number">2</span>: <span class="hljs-keyword">select</span> coordinator, code, name, semester
                            <span class="hljs-operator">^</span>
<span class="hljs-keyword">SQL</span> state: <span class="hljs-number">42803</span>
<span class="hljs-type">Character</span>: <span class="hljs-number">50</span>
</code></pre>
<p>أما هذا الاستعلام فيعرض فقط ملخصًا لجميع &quot;تسميات&quot; الصناديق ويُنفَّذ دون أي مشكلات:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> coordinator;
</code></pre>
<p>ولا يجوز لك النظر داخل الصندوق وتقديم سوى معلومات ملخّصة معينة في <code>SELECT</code>، مثل عدد الصفوف، ومجموع جميع الصفوف بالنسبة إلى عمود معين. <em>ونسمي دوال الملخّص هذه &quot;دوال التجميع&quot; ونتحدث عن &quot;تجميع&quot; البيانات</em>. وفي القسم التالي سننظر في عدة من هذه الدوال.</p>
<h2 id="دوال-التجميع">دوال التجميع</h2>
<h3 id="عد-عدد-الصفوف">عدّ عدد الصفوف</h3>
<p>السؤال الذي لا نزال نحاول الإجابة عنه هو &quot;لكل محاضر، يرجى تقديم عدد المقررات التي يكون هذا المحاضر (أو كان) منسّقًا لها.&quot;. وأنت تعرف الآن في هذه الجملة أن جزء &quot;لكل محاضر&quot; يعني أنه عليك تجميع الصفوف التي لها القيمة نفسها للمنسّق. <em>ويتم عدّ عدد الصفوف الموجودة في صندوق واحد</em> بالدالة <code>COUNT()</code> (<a href="https://www.postgresql.org/docs/current/functions-aggregate.html">التوثيق</a>). وإذا أردت عدّ الصفوف كاملة، فاستخدم <code>COUNT(*)</code>.</p>
<p>والاستعلام النهائي الذي يعيد إجابة السؤال هو:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> coordinator
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> coordinator;
</code></pre>
<h3 id="مجموع-بيانات-معينة-في-مجموعة">مجموع بيانات معينة في مجموعة</h3>
<p>دالة التجميع الثانية هي <code>SUM()</code>. <em>وتستخدمها لجمع القيم في عمود معين</em>. تنبيه: نرى بانتظام طلابًا يخلطون بين <code>COUNT()</code> و<code>SUM()</code>! أنجز الآن التمرين التالي.</p>
<p>اكتب استعلام SQL يولّد ملخصًا لمجموع عدد النقاط التي يكون محاضر ما منسّقًا لها. ونظّم النتيجة حسب مجموع عدد النقاط المتناقص. وينبغي أن تحصل على الشكل أدناه. وكالعادة: انتبه أيضًا إلى الترويسة الصحيحة لكل عمود.</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-groupby-having-1-sumSP.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator, <span class="hljs-built_in">SUM</span>(credits) <span class="hljs-keyword">AS</span> &quot;total number of credits&quot;
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> coordinator
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">2</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<h3 id="الحد-الأدنى-والحد-الأعلى-والمتوسط">الحد الأدنى والحد الأعلى والمتوسط</h3>
<p>ودوال التجميع الثلاث الأخيرة هي <code>MIN()</code> و<code>MAX()</code> و<code>AVG()</code>، على التوالي للحد الأدنى والحد الأعلى أو المتوسط الحسابي <em>للقيم في عمود معين</em>. أنجز التمارين التالية.</p>
<p>أنشئ قائمة تعرض متوسط عدد النقاط لكل فصل دراسي. ورتّب صفوف الإجابة حسب الفصل من الصغير إلى الكبير. وينبغي أن تحصل على الشكل أدناه. وهل يمكنك إدراج اسم المقرر أيضًا؟</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-groupby-having-2-groupavgsemester.webp" alt="Grouped on semester"></p>
<h4>الحل</h4>
<p>لن تحتوي كل مهمة على الكلمتين &quot;لكل&quot;. فاللغة فيها بدائل كثيرة لطلب الشيء نفسه. لذا هنا سيتعيّن عليك التجميع حسب الفصل الدراسي وسيتعيّن عليك استخدام دالة التجميع <code>AVG()</code>. ومن الواضح أنك لا تستطيع استرجاع معلومات من مقررات فردية (مثل الاسم) لأنها &quot;معلومات داخل الصندوق&quot;. والاستعلام التالي حل ممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> semester, <span class="hljs-built_in">AVG</span>(credits) <span class="hljs-keyword">AS</span> &quot;average number of credits&quot;
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> semester
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<p>أصعب قليلًا... اسرد حسب اللغة عدد المقررات ذات 4 نقاط على الأقل المدرَّسة بتلك اللغة. ولا يلزمك الترتيب.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">language</span>, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">AS</span> number
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&gt;=</span> <span class="hljs-number">4</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> <span class="hljs-keyword">language</span>;
</code></pre>
<h2 id="التجميع-حسب-تعبير">التجميع حسب تعبير</h2>
<p>تجمع عادةً حسب عمود معين، لكن من الممكن أيضًا التجميع حسب &quot;عمود محسوب&quot; (تعبير). ولكل مقرر تاريخ بداية. ومن تاريخ البداية هذا يمكنك استخراج السنة بسهولة بواسطة <a href="https://df.webontwerp.ucll.be/NL/SQL_select/index.html#Extract-%E2%80%A6-from"><code>EXTRACT</code></a>. وكمثال، نقدّم الاستعلام الذي يجيب عن السؤال التالي: &quot;اسرد لكل سنة عدد المقررات التي دخلت المنهج في تلك السنة.&quot;.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">EXTRACT</span>(<span class="hljs-keyword">year</span> <span class="hljs-keyword">FROM</span> start_date), <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">AS</span> &quot;number of courses&quot;
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> <span class="hljs-built_in">EXTRACT</span>(<span class="hljs-keyword">year</span> <span class="hljs-keyword">FROM</span> start_date)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<h2 id="التجميع-حسب-عدة-أعمدة">التجميع حسب عدة أعمدة</h2>
<p>يجمع الاستعلام التالي حسب عمودين: الفصل الدراسي والنقاط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> semester, credits, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> semester, credits
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>, <span class="hljs-number">2</span>;
</code></pre>
<p>ينشئ هذا الاستعلام 15 صندوقًا (انظر الشكل). ويظهر الصندوق الأول (بإطار برتقالي) على التسمية &quot;الفصل الأول، مقررات ذات 3 نقاط&quot;. ويوجد أربعة صفوف في هذا الصندوق. أما الصندوق الثاني (بإطار أزرق) فهو &quot;الفصل الأول، مقررات ذات 4 نقاط&quot;. وفي هذا الصندوق مقرر واحد فقط. وهكذا.</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-groupby-having-3-grouptweekol.webp" alt="Grouping can be on multiple columns"></p>
<h2 id="having">HAVING</h2>
<p>سبق أن غُطّيت جملة <code>HAVING</code> <a href="/arabic-cs-library/book/database-foundations/sql-csv/index#HAVING">في فصل ملفات CSV</a>. ويجد الطلاب غالبًا صعوبة في تمييزها عن جملة <code>WHERE</code>، وهو أمر مفهوم لأنها تفعل شيئًا مشابهًا. فـ <code>WHERE</code> تأتي مباشرة بعد تنفيذ المكوّن <code>FROM</code> وتختار <em>أي الصفوف يجوز أن تبقى وأيّها سيختفي</em>.</p>
<p>أما المكوّن <code>HAVING</code> فلا يُنفَّذ إلا بعد إنشاء &quot;الصناديق&quot; عند التجميع. <em>ويقرر هذا الشرط أي الصناديق يجوز أن تبقى وأيّها سيختفي من النتيجة</em>.</p>
<div class="exercises"><h2 id="تمارين">تمارين</h2>
<p>أنجز الآن التمارين التالية.</p>
<p>بالنسبة إلى الفصول الفردية (أي 1 و3 و5...)، اسرد عدد النقاط وعدد المقررات في ذلك الفصل. ورتّب حسب عدد النقاط المتناقص. وينبغي أن تحصل على الشكل التالي.</p>
<p>ونصيحة لإيجاد الفصول الفردية: انظر لهذا الغرض في إمكانات <em>باقي القسمة الصحيحة</em> (عملية &quot;المودولو&quot;)، وابحث عن &quot;Modulo&quot; في صفحة <a href="https://www.postgresql.org/docs/current/functions-math.html">https://www.postgresql.org/docs/current/functions-math.html</a>.</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-groupby-having-4-grouponevensem.webp" alt="group on odd semesters"></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> semester, <span class="hljs-built_in">SUM</span>(credits) <span class="hljs-keyword">AS</span> &quot;total number of credits&quot;, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">AS</span> &quot;number of courses&quot;
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> semester <span class="hljs-operator">%</span><span class="hljs-number">2</span> <span class="hljs-operator">!=</span> <span class="hljs-number">0</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> semester
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">2</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>كم عدد المنسّقين المختلفين في كل فصل دراسي؟</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> SEMESTER, <span class="hljs-built_in">COUNT</span>(<span class="hljs-keyword">DISTINCT</span>(coordinator)) <span class="hljs-keyword">AS</span> number_of_different_coordinators
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> semester;
</code></pre>
<p>أعطِ جميع الفصول الدراسية التي فيها مقرران &quot;لاحقان&quot; أو أكثر (مقررات تنتهي بـ '2') في كل فصل.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> semester, <span class="hljs-built_in">COUNT</span>(name) <span class="hljs-keyword">AS</span> number_of_follow_up_courses
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> name <span class="hljs-keyword">LIKE</span><span class="hljs-string">&#x27;%2&#x27;</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> semester
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">COUNT</span>(name) <span class="hljs-operator">&gt;=</span> <span class="hljs-number">2</span>;
</code></pre>
<p>يعطي هذا نتيجة &quot;خاطئة&quot; لأن مقرر 'Communication in French 2 (sem 2)' لا يتبع الاصطلاح (غير المكتوب؟) في التسمية. وقد تعطي هذه النسخة نتيجة أفضل:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> semester, <span class="hljs-built_in">COUNT</span>(name) <span class="hljs-keyword">AS</span> number_of_follow_up_courses
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> name <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%2&#x27;</span> <span class="hljs-keyword">OR</span> name <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%2 (%&#x27;</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> semester
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">COUNT</span>(name) <span class="hljs-operator">&gt;=</span> <span class="hljs-number">2</span>;
</code></pre>
<h2 id="تمارين-sqlzoo">تمارين SQLzoo</h2>
<p>أنجز <a href="https://sqlzoo.net/wiki/SUM_and_COUNT">سلسلة التمارين 5 على دوال التجميع</a> (جدول 'world').</p>
</div>`,r={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:o,html:l};export{s as book,a as chapter,n as chapterTitle,r as default,o as headings,l as html,e as slug,p as title};
