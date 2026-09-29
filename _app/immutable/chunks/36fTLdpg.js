const s="database-foundations",a="sql-subquery",n="Subqueries",p="index",l="الاستعلامات الفرعية",e=[{depth:2,id:"مخطط-studentscampus",text:"مخطط students_campus"},{depth:2,id:"من-يسكن-أبعد-عن-الحرم-من-متوسط-المسافة",text:"من يسكن أبعد عن الحرم من متوسط المسافة؟"},{depth:2,id:"متوسط-المسافة-لطلاب-proximus",text:"متوسط المسافة لطلاب Proximus"},{depth:3,id:"نسختان-للتمرين-نفسه",text:"نسختان للتمرين نفسه"},{depth:3,id:"الاختيار-بين-join-والاستعلام-الفرعي",text:"الاختيار بين JOIN والاستعلام الفرعي"},{depth:2,id:"استعلام-فرعي-مع-المعامل-in",text:"استعلام فرعي مع المعامل IN"},{depth:2,id:"استعلام-فرعي-مع-المعامل-all",text:"استعلام فرعي مع المعامل ALL"},{depth:2,id:"استعلام-فرعي-مع-المعامل-any",text:"استعلام فرعي مع المعامل ANY"}],c=`<blockquote>
<p>البرمجة، كما يتضح، صعبة. فالقواعد الأساسية عادةً بسيطة وواضحة. لكن البرامج المبنية فوق هذه القواعد تميل إلى أن تصبح معقدة بما يكفي لتُدخل قواعدها وتعقيدها الخاص. أنت تبني متاهتك الخاصة، بمعنى ما، وقد تضيع فيها. —Marijn Haverbeke</p>
</blockquote>
<h2 id="مخطط-studentscampus">مخطط students_campus</h2>
<p>ألقِ نظرة سريعة على مخطط الكيانات والعلاقات (ERD) في الشكل. ويمكنك إيجاد المخطط &quot;students_campus&quot; في قاعدة البيانات &quot;df&quot; عبر اتصال التجميع (أو اتصال 5...). ونفّذ <code>SELECT *</code> على الجدولين للحصول على فكرة عن المعلومات الواردة في المخطط.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-subquery-0-ERD_student_campus.webp" alt=""></p>
<p>وبشكل محدد، يتعلق الأمر بقائمة بجميع حرم UCLL الثمانية، وجدول فيه 1000 طالب مع بعض المعلومات الشخصية لكل طالب، وأي حرم يرتاده (لا يمكن للطالب الانتماء إلا إلى حرم واحد)، وكم يبعد سكنه عن هذا الحرم. والحقل الأخير غير إلزامي. وبالمناسبة، أنشأنا هذا المخطط كمثال للتوليد التلقائي للبيانات في DBSchema أو باستخدام موقع مثل <a href="https://mockaroo.com">https://mockaroo.com</a>.</p>
<h2 id="من-يسكن-أبعد-عن-الحرم-من-متوسط-المسافة">من يسكن أبعد عن الحرم من متوسط المسافة؟</h2>
<p>هناك عدة أنواع من استعلامات SQL. فنوع يسأل عن الإجابة فقط. وقد تكون الإجابة عددًا أو اسمًا أو أكثر أو تاريخًا... ولهذا النوع من الاستعلامات، لا يلزمك تقديم الاستعلام أو الاستعلامات المستخدمة. ويكفي الجواب وحده. ومن أمثلة هذا النوع من الأسئلة التمرين التالي. أنجزه وتحقق من إجابتك.</p>
<p>كم طالبًا يسكن أبعد عن حرمه من متوسط المسافة؟ طُلبت الإجابة فقط، لا الاستعلامات التي استخدمتها. وهل يمكنك إيجاد الإجابة الصحيحة: 401 طالب؟</p>
<h4>الحل</h4>
<p>هذا سؤال يمكنك عادةً حله بسرعة باستعلامين بسيطين. يبحث الاستعلام الأول عن متوسط جميع المسافات:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">AVG</span>(distance_to_campus)
<span class="hljs-keyword">FROM</span> student;
</code></pre>
<p>ونتيجة هذا الاستعلام 52.01658. ولاحظ أن القيم الفارغة لا تُحتسب عند حساب المتوسط، كما <a href="https://www.postgresql.org/docs/15/functions-aggregate.html">تذكر التوثيق بإيجاز عن الدالة 'avg'</a>. ويمكنك الآن استخدام هذا العدد في استعلام لاحق:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>) <span class="hljs-comment">-- or simply use * and read the number of lines in the query tool</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> distance_to_campus <span class="hljs-operator">&gt;</span> <span class="hljs-number">52.01658</span>;
</code></pre>
<p>إذن، لهذا النوع من استعلامات SQL، أجب فقط بـ '401'. حسنًا، نلت نقطة!</p>
<p>لكن بالنسبة إلى نوع آخر من أسئلة الامتحان، يلزمك <em>تقديم الاستعلام</em>. وإضافة إلى ذلك يجوز لك تقديم <em>استعلام واحد</em> فقط، يجب أن يستطيع محاضرك نسخه وتنفيذه في pgAdmin. ولا يُقبل حل باستعلامين منفصلين، حيث عليك بعد ذلك نسخ إجابة الاستعلام الأول إلى الثاني.</p>
<p>وللتمرين أعلاه حل أنيق: استخدم <em>استعلامًا فرعيًا</em> (ويُسمّى أيضًا <em>استعلامًا متداخلًا</em>). ويقدّم الاستعلام التالي حل التمرين (401) في استعلام واحد:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> distance_to_campus <span class="hljs-operator">&gt;</span> (
  <span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">AVG</span>(distance_to_campus)
  <span class="hljs-keyword">FROM</span> student
);
</code></pre>
<p>في جملة <code>WHERE</code> يبدأ <code>SELECT</code> جديد. ونسمي هذا الاستعلام <em>الاستعلام الداخلي</em>. أما الاستعلام المحيط به فيُسمّى <em>الاستعلام الخارجي</em>. ويمكنك تعريف مستويات مختلفة من التداخل. ويمكن للاستعلام الفرعي أن يعيد صفًا واحدًا أو أكثر إلى الاستعلام الذي يستدعيه. وما سبق مثال على استعلام فرعي <em>قياسي (scalar)</em>: لأن الاستعلام الفرعي يعيد <em>عددًا واحدًا</em> فقط. ويمكنك تداخل استعلام فرعي في جملة <code>SELECT</code> أو <code>FROM</code> أو <code>WHERE</code> أو <code>HAVING</code>.</p>
<h2 id="متوسط-المسافة-لطلاب-proximus">متوسط المسافة لطلاب Proximus</h2>
<h3 id="نسختان-للتمرين-نفسه">نسختان للتمرين نفسه</h3>
<p>حلّ الآن التمرين التالي باستعلام فرعي:</p>
<p>أعطِ متوسط المسافة إلى الحرم لجميع الطلاب الذين يرتادون حرم Proximus. واستخدم استعلامًا واحدًا مع استعلام فرعي. والجواب: 49.0319</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">avg</span>(distance_to_campus)
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> campus_id <span class="hljs-operator">=</span> (
  <span class="hljs-keyword">SELECT</span> id
  <span class="hljs-keyword">FROM</span> campus
  <span class="hljs-keyword">WHERE</span> name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Campus Proximus&#x27;</span>
);
</code></pre>
<p>ربما فكرت عند قراءة العبارة أعلاه: 'أستطيع فعل ذلك بـ <code>JOIN</code> بالقدر نفسه؟' وهذا صحيح! حلّ الآن التمرين نفسه دون استعلام فرعي باستخدام <code>JOIN</code> فقط:</p>
<p>أعطِ متوسط المسافة إلى الحرم لجميع الطلاب الذين يرتادون حرم Proximus باستخدام <code>JOIN</code>.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">avg</span>(distance_to_campus)
<span class="hljs-keyword">FROM</span> student S <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> campus C <span class="hljs-keyword">on</span> S.campus_id <span class="hljs-operator">=</span> C.id
<span class="hljs-keyword">WHERE</span> C.name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Campus Proximus&#x27;</span>;
</code></pre>
<h3 id="الاختيار-بين-join-والاستعلام-الفرعي">الاختيار بين JOIN والاستعلام الفرعي</h3>
<p>أحيانًا لا يكون لديك خيار وعليك استخدام استعلام فرعي، كما في التمرين الأول. فلا يمكنك حل ذلك بـ <code>JOIN</code>. وبالعكس، تحتاج بعض الاستعلامات إلى <code>JOIN</code>. لكن أحيانًا يكون لديك خيار بين استعلام فرعي و<code>JOIN</code>. ويصعب تحديد الأفضل بشكل قاطع. وبالنسبة إلى الاستعلامات المعقدة، كثيرًا ما يكون <code>JOIN</code> <em>أكثر</em> كفاءة. أما الاستعلام الفرعي فقراءته أسهل عادةً.</p>
<p>وفي كل الأحوال، ينبغي أن تكون قادرًا على استخدام نوعي الاستعلام. ومن الممكن أنه في استعلام معين في الامتحان سيتعيّن عليك استخدام أحدهما صراحةً.</p>
<h2 id="استعلام-فرعي-مع-المعامل-in">استعلام فرعي مع المعامل IN</h2>
<p>نظرنا في المعامل <code>IN</code> بالفعل <a href="/arabic-cs-library/book/database-foundations/sql-where/index#IN">في قسم جملة <code>WHERE</code></a>. ويمكن استخدام نتيجة استعلام فرعي بعد <code>IN</code>. جرّب التمرين التالي.</p>
<p>اعرض أقدم خمسة طلاب يرتادون حرمًا في Heverlee. واعمل باستعلام فرعي.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-subquery-1-oudste5Heverlee.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> last_name <span class="hljs-keyword">AS</span> name, birth_date
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> campus_id <span class="hljs-keyword">IN</span> (
  <span class="hljs-keyword">SELECT</span> id
  <span class="hljs-keyword">FROM</span> campus
  <span class="hljs-keyword">WHERE</span> location <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Heverlee&#x27;</span>
)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birth_date
LIMIT <span class="hljs-number">5</span>;
</code></pre>
<p>ويمكن حل هذا التمرين حلًا ممتازًا بـ <code>JOIN</code> أيضًا. جرّب التمرين مرة أخرى بـ <code>JOIN</code>.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> last_name <span class="hljs-keyword">AS</span> name, birth_date
<span class="hljs-keyword">FROM</span> student S <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> campus C <span class="hljs-keyword">ON</span> S.campus_id <span class="hljs-operator">=</span> C.id
<span class="hljs-keyword">WHERE</span> location <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Heverlee&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birth_date
LIMIT <span class="hljs-number">5</span>;
</code></pre>
<h2 id="استعلام-فرعي-مع-المعامل-all">استعلام فرعي مع المعامل ALL</h2>
<p>يقارن المعامل <code>ALL</code> قيمةً بـ<em>كل</em> قيمة في جدول النتيجة. ونوضّح ذلك بالمثال التالي.</p>
<p>اسرد جميع الطلاب الأصغر من جميع الطلاب الذين يبدأ اسمهم الأول بـ 'Al'. ومرة أخرى، يمكنك حل ذلك باستعلامين. أولًا، استعلم عن تواريخ ميلاد جميع الطلاب بالاسم الأول المطلوب:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> birth_date
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> (first_name <span class="hljs-keyword">like</span> <span class="hljs-string">&#x27;Al%&#x27;</span>)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birth_date <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>وتبيّن أن أصغر هؤلاء الطلاب وُلد في 27 فبراير 2004. ويمكنك الآن الاستعلام في استعلام ثانٍ عن جميع الطلاب الذين تاريخ ميلادهم أكبر من (لأنهم يجب أن يكونوا أصغر!) هذا التاريخ:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> birth_date <span class="hljs-operator">&gt;</span> <span class="hljs-string">&#x27;2004-02-27&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birth_date <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>وستجد في النهاية قائمة بـ 22 طالبًا.</p>
<p>ويمكنك دمج هذين الاستعلامين المتتاليين في استعلام واحد باستخدام استعلام فرعي. وستجد الطلاب الـ 22 أنفسهم:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> birth_date <span class="hljs-operator">&gt;</span> <span class="hljs-keyword">ALL</span> (
  <span class="hljs-keyword">SELECT</span> birth_date
  <span class="hljs-keyword">FROM</span> student
  <span class="hljs-keyword">WHERE</span> first_name <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;Al%&#x27;</span>
)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birth_date <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>لا يبدو التمرين التالي صعبًا إلى هذا الحد من النظرة الأولى، لكن هناك مشكلة غير متوقعة قد تعاني منها. وتجد النصائح والحل في المكان المعتاد، لكن جرّب هذا التمرين بنفسك أولًا!</p>
<p>اسرد جميع الطلاب الذين يسكنون أقرب إلى حرمهم من جميع الطلاب الذين يرتادون حرمًا في Diest ويحتوي اسمهم الأخير على حرف 'a' مرتين (ويُسمح بالحروف الكبيرة أيضًا). ويجوز لك استخدام استعلام واحد فقط (قد يحتوي بالطبع على استعلامات فرعية). ورتّب حسب campus_id المتزايد والمسافة المتناقصة.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-subquery-2-afstandDiest.webp" alt=""></p>
<h4>الحل</h4>
<p>من الجيد حل تمرين كهذا على أجزاء. السؤال الفرعي 1: ما campus_id الخاص بالحرم (أو الحرمات) في Diest؟</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> id
<span class="hljs-keyword">FROM</span> campus
<span class="hljs-keyword">WHERE</span> location <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Diest&#x27;</span>;
</code></pre>
<p>يبدو أنه لا يوجد سوى حرم واحد في Diest، وهو الحرم ذو id = 2. وبهذا يمكننا الآن الإجابة عن الجزء الثاني من السؤال: أعطِ جميع الطلاب من هذا الحرم الذين اسم عائلتهم فيه 'a' مرتان (لا تهم حالة الأحرف).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">lower</span>(last_name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%a%a%&#x27;</span> <span class="hljs-keyword">AND</span> campus_id <span class="hljs-operator">=</span> <span class="hljs-number">2</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> distance_to_campus <span class="hljs-keyword">ASC</span>;
</code></pre>
<p>تحقق من أن النتيجة لا تشمل فعلًا سوى الطلاب الذين يرتادون الحرم 2 ولقبهم فيه حرف 'a' مرتين على الأقل. وتبيّن أن أصغر مسافة 15 كم. وأخيرًا، يمكننا الإجابة عن الجزء الأخير من السؤال: جميع الطلاب من جدول الطلاب الذين يسكنون على مسافة أقل من 15 كم من حرمهم:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> distance_to_campus <span class="hljs-operator">&lt;</span> <span class="hljs-number">15</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> campus_id <span class="hljs-keyword">ASC</span>, distance_to_campus <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>وتبيّن أن هذه قائمة بـ 106 طلاب. وتجميع كل شيء في استعلام واحد كبير فيه استعلامان فرعيان ليس صعبًا الآن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">from</span> student
<span class="hljs-keyword">WHERE</span> distance_to_campus <span class="hljs-operator">&lt;</span> <span class="hljs-keyword">ALL</span> (
  <span class="hljs-keyword">SELECT</span> distance_to_campus
  <span class="hljs-keyword">FROM</span> student
  <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">lower</span>(last_name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%a%a%&#x27;</span> <span class="hljs-keyword">AND</span> campus_id <span class="hljs-keyword">IN</span> (
    <span class="hljs-keyword">SELECT</span> id
    <span class="hljs-keyword">FROM</span> campus
    <span class="hljs-keyword">WHERE</span> location <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Diest&#x27;</span>
  )
)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> campus_id <span class="hljs-keyword">ASC</span>, distance_to_campus <span class="hljs-keyword">DESC</span>;
</code></pre>
<p><em>غير أن هذا الاستعلام لا يبدو أنه يعطي النتيجة الصحيحة. فالنتيجة لا تحتوي أي صفوف على الإطلاق! فما الذي يجري؟</em></p>
<p>المشكلة في السؤال الفرعي 2. فقائمة جميع الطلاب من الحرم 4 الذين في لقبهم 'a' مرتان تحتوي على عدد من القيم الفارغة في المسافة. وأي مقارنة بين عدد وقيمة فارغة تعطي دائمًا قيمة فارغة، كما يوضح هذا الاستعلام:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">null</span> <span class="hljs-operator">&gt;</span> <span class="hljs-number">999</span> <span class="hljs-comment">-- result is not true or false but null</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">null</span> <span class="hljs-operator">&lt;=</span> <span class="hljs-number">999</span> <span class="hljs-comment">-- result is not true or false but null;</span>
</code></pre>
<p>ونتيجة لذلك، سيفشل كل اختبار <code>WHERE distance_to_campus &lt; ALL ...</code> دائمًا، فلا يبقى أي صف في النتيجة. ولحسن الحظ، الحل ليس بهذه الصعوبة: <em>في السؤال الفرعي 2، تجنّب القيم الفارغة في النتيجة</em>. لذا نضيف شرطًا واحدًا في الاستعلام الفرعي الأول:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">from</span> student
<span class="hljs-keyword">WHERE</span> distance_to_campus <span class="hljs-operator">&lt;</span> <span class="hljs-keyword">ALL</span> (
  <span class="hljs-keyword">SELECT</span> distance_to_campus
  <span class="hljs-keyword">FROM</span> student
  <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">lower</span>(last_name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%a%a%&#x27;</span>
    <span class="hljs-keyword">AND</span> distance_to_campus <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT null</span> <span class="hljs-comment">--Avoid null in the result</span>
    <span class="hljs-keyword">AND</span> campus_id <span class="hljs-keyword">IN</span> (
      <span class="hljs-keyword">SELECT</span> id
      <span class="hljs-keyword">FROM</span> campus
      <span class="hljs-keyword">WHERE</span> location <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Diest&#x27;</span>
    )
)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> campus_id <span class="hljs-keyword">ASC</span>, distance_to_campus <span class="hljs-keyword">DESC</span>;
</code></pre>
<h2 id="استعلام-فرعي-مع-المعامل-any">استعلام فرعي مع المعامل ANY</h2>
<p>يقارن المعامل <code>ANY</code> قيمةً بأي قيمة في جدول، ويكون محققًا <em>إذا انطبقت المقارنة على قيمة واحدة على الأقل في الجدول</em>. ويجب أن يحتوي الجدول المقارن به على قيمة واحدة على الأقل. ويشرح المثال التالي المبدأ.</p>
<p>نريد قائمة بجميع الطلاب من الحرم 7 الأكبر من طالب واحد على الأقل من الحرم 4. وتعطي الشيفرة التالية قائمة بـ 135 طالبًا يحققون الشرط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> campus_id <span class="hljs-operator">=</span> <span class="hljs-number">7</span> <span class="hljs-keyword">AND</span> birth_date <span class="hljs-operator">&lt;</span> <span class="hljs-keyword">ANY</span>(
  <span class="hljs-keyword">SELECT</span> birth_date
  <span class="hljs-keyword">FROM</span> student
  <span class="hljs-keyword">WHERE</span> campus_id <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
);
</code></pre>
<p>وكالعادة، من الجيد تحليل الاستعلام تحليلًا سليمًا لفهم كيفية عمل كل شيء. لنستعلم عن قائمة جميع الطلاب من الحرم 7:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> campus_id <span class="hljs-operator">=</span> <span class="hljs-number">7</span>;
</code></pre>
<p>وتحتوي تلك القائمة 136 طالبًا، أي واحدًا أكثر من الاستعلام الأول! ولنفحص بسرعة أين يكمن الفرق.</p>
<p>نبحث أولًا عن أصغر طالب من الحرم 4:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> student
<span class="hljs-keyword">WHERE</span> campus_id <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">4</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>وتبيّن أنه Lisa Vargas، المولودة في 30 سبتمبر 2004. غير أن في الحرم 7 طالبًا أصغر حتى من Lisa Vargas، وهو Kate Gonzales، المولودة في 12 أكتوبر 2004. وبالتالي فهي لا تحقق شرط <code>ANY</code> وبالتالي لا تظهر في النتيجة.</p>
`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,c as html,p as slug,l as title};
