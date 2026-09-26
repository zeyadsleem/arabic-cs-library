const n="500-lines",s="contingent",a="Contingent: A Fully Dynamic Build System",e="index",t="Contingent: نظام بناء ديناميكي بالكامل",p=[{depth:2,id:"مقدمة",text:"مقدمة"},{depth:2,id:"المشكلة-بناء-أنظمة-المستندات",text:"المشكلة: بناء أنظمة المستندات"},{depth:2,id:"أنظمة-البناء-والاتساق",text:"أنظمة البناء والاتساق"},{depth:2,id:"ربط-المهام-لبناء-رسم-بياني",text:"ربط المهام لبناء رسم بياني"},{depth:2,id:"الاستخدام-الصحيح-للأصناف",text:"الاستخدام الصحيح للأصناف"},{depth:2,id:"تعلم-الاتصالات",text:"تعلّم الاتصالات"},{depth:2,id:"ملاحقة-العواقب",text:"ملاحقة العواقب"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],l=`<p><em>بدأ براندون رودز يستخدم Python في أواخر تسعينيات القرن الماضي، وقد أداب على
صيانة مكتبة PyEphem للفلكيين الهواة على مدى 17 عاماً. يعمل في Dropbox،
وقد درّس دورات برمجة Python لعملاء الشركات، وشاور في مشاريع مثل موقع
«Go Botany» المبني على Django تابعاً لجمعية نيو إنجلاند للزهور البرية،
وسيترأس مؤتمر PyCon في 2016 و2017. يرى براندون أن الشيفرة المكتوبة
بإتقان صورة من صور الأدب، وأن الشيفرة المنسَّق تنسيقاً جميلاً عمل من
أعمال التصميم الجرافيكي، وأن الشيفرة الصحيحة إحدى أكثر صور الفكر
شفافية.</em></p>
<p><em>يحب دانيال روكو Python والقهوة والحرفة والـ stout وتصميم الكائنات والأنظمة،
وbourbon والتعليم والأشجار والغيتار اللاتيني. وبما أنه
مبهور بأنه يكتب Python لكسب رزقه، فإنه يبحث دائماً عن فرص للتعلم
من الآخرين في المجتمع، وأن يسهم عبر مشاركة المعرفة. وهو
متحدث متكرر في PyAtl حول المواضيع التمهيدية والاختبار والتصميم والأشياء
اللامعة؛ يحب رؤية بريق الدهشة والبهجة في عيون الناس حين
يشارك أحدهم فكرة مبتكرة أو مفاجئة أو جميلة. يعيش دانيال في أتلانتا
مع أحياء مجهرية وأربعة صواريخ طموحين.</em></p>
<h2 id="مقدمة">مقدمة</h2>
<p>ظلت أنظمة البناء أداة قياسية
في البرمجة الحاسوبية لوقت طويل.</p>
<p>طُوِّر نظام البناء القياسي <code>make</code>،
الذي فاز مؤلفه بجائزة ACM لنظام برمجي،
لأول مرة عام 1976.
وهو لا يتيح لك فحسب التصريح
بأن ملف مخرج يعتمد على مُدخل واحد (أو أكثر)،
بل يتيح لك فعل ذلك على نحو تكراري.
فبرنامج ما قد يعتمد مثلاً على ملف كائن
يعتمد بدوره على الشيفرة المصدرية المقابلة:</p>
<pre><code>    prog: main.o
            cc -o prog main.o

    main.o: main.c
            cc -C -o main.o main.c
</code></pre>
<p>إذا اكتشف <code>make</code> عند استدعائه التالي
أن ملف الشيفرة المصدرية <code>main.c</code>
لم يعد طابع زمن التعديل الخاص به أحدث من <code>main.o</code>،
فإنه لن يعيد بناء ملف الكائن <code>main.o</code> فحسب
بل سيعيد بناء <code>prog</code> نفسه أيضاً.</p>
<p>أنظمة البناء مشروع فصلي شائع
يُكلَّف به طلاب علوم الحاسوب في مرحلة البكالوريوس —
ليس فقط لأن أنظمة البناء تُستخدم في كل مشاريع البرمجيات تقريباً،
بل لأن بنائها يتضمّن بنى بيانات وخوارزميات أساسية
على الرسوم البيانية الموجّهة
(وسنناقشها في هذا الفصل لاحقاً بمزيد من التفصيل).</p>
<p>وبعقود من الاستخدام والممارسة وراء أنظمة البناء،
قد يُنتظر أن تكون قد صارت صالحة لكل الغايات
وجاهزة حتى لأغنى المطالب. لكن في الواقع إن نوعاً من التفاعلات
الشائعة بين مخرجات البناء —
مشكلة الإحالات المتقاطعة الديناميكية —
تعالجه معظم أنظمة البناء معالجة سيّئة
لدرجة ألّهمتني في هذا الفصل
ألّا أعيد تقديم الحل الكلاسيكي
والبنى البيانات المستعملة لحل مشكلة <code>make</code> فحسب،
بل أن أوسّع ذلك الحل توسيعاً بالغاً، نحو مجال أكثر تطلّباً بكثير.</p>
<p>المشكلة، مرة أخرى، هي الإحالات المتقاطعة.
أين تميل الإحالات المتقاطعة إلى الظهور؟
في المستندات النصية والتوثيق والكتب المطبوعة! \\newpage</p>
<h2 id="المشكلة-بناء-أنظمة-المستندات">المشكلة: بناء أنظمة المستندات</h2>
<p>أنظمة إعادة بناء المستندات المنسَّقة من المصدر
تبدو دائماً وكأنها تعمل أكثر مما ينبغي، أو أقل مما ينبغي.</p>
<p>فهي تعمل أكثر مما ينبغي
حين تستجيب لتعديل طفيف
بأن تجعلك تنتظر إعادة تحليل الفصول غير ذات الصلة
وإعادة تنسيقها.
لكنها قد تعيد بناء أقل مما ينبغي أيضاً،
فتترك لك منتجاً نهائياً غير متسق.</p>
<p>لنأخذ <a href="http://sphinx-doc.org/">Sphinx</a> — باني المستندات
الذي يُستخدم في توثيق لغة Python الرسمي
وفي مشاريع كثيرة أخرى داخل مجتمع Python.
عادةً ما يتضمّن ملف <code>index.rst</code>
في مشروع Sphinx جدول محتويات:</p>
<pre><code>   Table of Contents
   =================

   .. toctree::

      install.rst
      tutorial.rst
      api.rst
</code></pre>
<p>تخبر هذه القائمة بأسماء ملفات الفصول
Sphinx بأن يدرج رابطاً لكل فصل من الفصول الثلاثة المذكورة
حين يبني ملف المخرجات <code>index.html</code>.
كما أنه سيدرج روابط إلى أي أقسام داخل كل فصل.
مجرّدة من ترميزها،
قد يبدو النص الناتج من العنوان
أمر <code>toctree</code> أعلاه كالتالي:</p>
<pre><code>  Table of Contents

  • Installation

  • Newcomers Tutorial
      • Hello, World
      • Adding Logging

  • API Reference
      • Handy Functions
      • Obscure Classes
</code></pre>
<p>جدول المحتويات هذا، كما ترى، مزيج
من معلومات واردة من أربعة ملفات مختلفة.
فترتيبه وبنيته الأساسيان يأتيان من <code>index.rst</code>،
بينما تُسحب عناوين كل فصل وقسم فعلياً
من ملفات الفصول المصدرية الثلاثة نفسها.</p>
<p>إن أعدت النظر لاحقاً في عنوان فصل الدليل —
فكلمة «الوافد» تبدو قديمة الطراز،
وكأن مستخدميك مستوطون وصلوا لتوّهم إلى وايومنغ الطامري —
فأنت عندئذٍ ستحرّر السطر الأول من <code>tutorial.rst</code>
وتكتب شيئاً أفضل:</p>
<pre><code>  -Newcomers Tutorial
  +Beginners Tutorial
   ==================

   Welcome to the tutorial!
   This text will take you through the basics of...
</code></pre>
<p>وحين تكون مستعداً لإعادة البناء،
سيفعل Sphinx الشيء الصحيح تماماً!
فهو سيعيد بناء فصل الدليل نفسه،
وكذلك الفهرس.
(وإخراج النتيجة عبر <code>cat</code> يجعل Sphinx
يذكر كل ملف أُعيد بناؤه في سطر مستقل،
بدلاً من استخدام محارف الرجوع (carriage returns)
لإعادة كتابة سطر واحد مراراً بتلك تحديثات التقدم.)</p>
<pre><code>   $ make html | cat
   writing output... [ 50%] index
   writing output... [100%] tutorial
</code></pre>
<p>ولأن Sphinx اختار إعادة بناء المستندين معاً،
لن يكتفي <code>tutorial.html</code> الآن بعرض عنوانه الجديد في الأعلى،
بل سيعرض ملف المخرجات <code>index.html</code> عنوان الفصل المحدَّث
في جدول المحتويات.
فقد أعاد Sphinx بناء كل شيء بحيث يكون المخرجات متسقة.</p>
<p>وماذا لو كان تعديلك على <code>tutorial.rst</code> أكثر تفصيلاً؟</p>
<pre><code>   Beginners Tutorial
   ==================

  -Welcome to the tutorial!
  +Welcome to our project tutorial!
   This text will take you through the basics of...
</code></pre>
<p>في هذه الحالة لا حاجة إلى إعادة بناء <code>index.html</code>
لأن هذا التعديل الطفيف داخل فقرة
لا يغيّر أياً من المعلومات الموجودة في جدول المحتويات.
لكن اتضح أن Sphinx ليس ذكياً إلى هذا الحد
كما قد يبدو للوهلة الأولى!
فهو سينطلق ويؤدي العمل الزائد بإعادة بناء
<code>index.html</code> رغم أن المحتوى الناتج
سيكون مطابقاً تماماً لما كان عليه.</p>
<pre><code>   writing output... [ 50%] index
   writing output... [100%] tutorial
</code></pre>
<p>يمكنك تشغيل <code>diff</code>
على نسختَي <code>index.html</code> «قبل» و«بعد»
لتتأكد من أن تعديلك الصغير
لم يكن له أي أثر على الصفحة الأولى —
مع أن Sphinx جعلك تنتظر أثناء إعادة بنائها على أي حال.</p>
<p>قد لا تلاحظ حتى الجهد الإضافي لإعادة البناء
في المستندات الصغيرة سهلة التصريف. لكن التأخير في سير عملك
قد يصبح كبيراً
حين تجري تعديلات وتغييرات متكررة
على مستندات طويلة ومعقدة، أو تنطوي على توليد
محتوى متعدد الوسائط مثل الرسوم البيانية أو الحركات.
ولأن Sphinx على الأقل يحاول
ألا يعيد بناء كل فصل حين تجري تغييراً واحداً —
فهو مثلاً لم يُعد بناء <code>install.html</code> أو <code>api.html</code>
استجابةً لتعديلك على <code>tutorial.rst</code> —
فهو يفعل أكثر مما ينبغي.</p>
<p>لكن اتضح أن Sphinx يفعل شيئاً أسوأ:
فهو أحياناً يفعل أقل مما ينبغي،
فيترك لك مخرجات غير متسقة قد يلاحظها المستخدمون.</p>
<p>لترى أحد أبسط إخفاقاته،
أضف أولاً إحالة متقاطعة في أعلى توثيق الـ API الخاص بك:</p>
<pre><code>   API Reference
   =============

  +Before reading this, try reading our :doc:\`tutorial\`!
  +
   The sections below list every function
   and every single class and method offered...
</code></pre>
<p>ومع حذره المعتاد بشأن جدول المحتويات،
سيُعيد Sphinx بناء كل من مستند مرجع الـ API هذا
وكذلك الصفحة الرئيسية <code>index.html</code> لمشروعك:</p>
<pre><code>   writing output... [ 50%] api
   writing output... [100%] index
</code></pre>
<p>في ملف المخرجات <code>api.html</code> يمكنك التأكد
من أن Sphinx قد أدرج العنوان الجذاب المقروء من قبل الإنسان
لفصل الدليل داخل وسم الإرساء الخاص بالإحالة المتقاطعة:</p>
<pre><code class="language-html">   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Before reading this, try reading our
   <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reference internal&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;tutorial.html&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">em</span>&gt;</span>Beginners Tutorial<span class="hljs-tag">&lt;/<span class="hljs-name">em</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>وماذا لو أجريت الآن تعديلاً آخر
على العنوان في أعلى ملف <code>tutorial.rst</code>؟
فقد أبطلت صلاحية <em>ثلاثة</em> ملفات مخرجات:</p>
<ol>
<li>
<p>العنوان في أعلى <code>tutorial.html</code> لم يعد محدَّثاً،
لذا يحتاج الملف إلى إعادة البناء.</p>
</li>
<li>
<p>جدول المحتويات في <code>index.html</code> ما زال يحمل العنوان القديم،
لذا يحتاج ذلك المستند إلى إعادة البناء.</p>
</li>
<li>
<p>الإحالة المتقاطعة المضمّنة في الفقرة الأولى من <code>api.html</code>
ما زالت تحمل عنوان الفصل القديم،
وتحتاج أيضاً إلى إعادة البناء.</p>
</li>
</ol>
<p>وماذا يفعل Sphinx؟</p>
<pre><code>   writing output... [ 50%] index
   writing output... [100%] tutorial
</code></pre>
<p>أوه لا.</p>
<p>أُعيد بناء ملفَّين فقط، لا ثلاثة.
فشل Sphinx في إعادة بناء توثيقك على نحو صحيح.</p>
<p>إن دفعت الآن صفحة HTML الخاصة بك إلى الويب،
سيرى المستخدمون العنوان القديم في الإحالة المتقاطعة
في أعلى <code>api.html</code>
لكنهم سيرون بعد ذلك عنواناً مختلفاً — العنوان الجديد —
ما إن ينقلهم الرابط إلى <code>tutorial.html</code> نفسها.
وهذا يمكن أن يحدث لكثير من أنواع الإحالات المتقاطعة التي يدعمها Sphinx:
عناوين الفصول، وعناوين الأقسام، والفقرات،
والأصناف، والتوابع، والدوال.</p>
<h2 id="أنظمة-البناء-والاتساق">أنظمة البناء والاتساق</h2>
<p>المشكلة المبيَّنة أعلاه ليست خاصة بـ Sphinx.
فهي لا تطارد أنظمة المستندات الأخرى مثل LaTeX فحسب،
بل قد تصيب حتى المشاريع
التي تحاول ببساطة توجيه خطوات التصريف
باستخدام الأداة venerable <code>make</code>،
إذا كانت أصولها تتقاطع بالإحالات بطرق مثيرة للاهتمام.</p>
<p>ولأن المشكلة قديمة وعامة،
فحلها ينحدر من نسب Equally طويلة:</p>
<pre><code class="language-bash">   $ <span class="hljs-built_in">rm</span> -r _build/
   $ make html
</code></pre>
<p>إن حذفت كل المخرجات،
فأنت مضمون إعادة بناء كاملة!
بل إن بعض المشاريع تعيّن <code>rm</code> <code>-r</code> هدفاً باسم <code>clean</code>
بحيث لا يكفي سوى <code>make</code> <code>clean</code> سريع لمحو اللوح.</p>
<p>وبإزالة كل نسخة من كل أصل وسيط أو مُخرَج،
يستطيع <code>rm</code> <code>-r</code> كبير أن يفرض على البناء البدء من جديد
دون أي شيء مخزَّن مؤقتاً — دون أي ذاكرة لحالته السابقة
قد تؤدي بالضرورة إلى نتاج مهمَل.</p>
<p>لكن هل يمكننا تطوير منهج أفضل؟</p>
<p>ماذا لو كان نظام البناء لديك عملية دائمة
تلاحظ كل عنوان فصل، وكل عنوان قسم،
وكل عبارة مشار إليها بإحالة متقاطعة
وهي تنتقل من الشيفرة المصدرية لمستند
إلى نص مستند آخر؟
ستكون قراراته بشأن إعادة بناء مستندات أخرى
بعد تغيير في ملف مصدر واحد دقيقة،
لا مجرد تخمينات،
وصحيحة،
بدل أن تترك المخرجات في حالة غير متسقة.</p>
<p>لكن النتيجة ستكون نظاماً مثل أداة <code>make</code> الساكنة القديمة،
غير أنه يتعلّم التبعيات بين الملفات أثناء بنائها —
يضيف التبعيات ويزيلها ديناميكياً
مع إضافة الإحالات المتقاطعة وتحديثها وحذفها.</p>
<p>في الأقسام التالية سنبني أداة كهذه،
نسمّيها Contingent،
بـ Python.
تضمن Contingent الصحة عند وجود تبعيات ديناميكية
بينما تُنفّذ أقل عدد ممكن من خطوات إعادة البناء.
ولأنها قابلة للتطبيق على أي مجال مشكل،
سنطبّقها على نسخة مصغّرة من المشكلة المبيَّنة أعلاه.</p>
<h2 id="ربط-المهام-لبناء-رسم-بياني">ربط المهام لبناء رسم بياني</h2>
<p>يحتاج أي نظام بناء إلى وسيلة لربط المُدخلات بالمخرجات.
فالنصوص الثلاثة الموسومة في نقاشنا أعلاه،
مثلاً،
ينتج كل منها ملف مخرجات HTML مقابلاً.
وإن أكثر الطرق طبيعية للتعبير عن هذه العلاقات
هي مجموعة من الصناديق والأسهم —
أو، بالمصطلح الرياضي، <em>عقد</em> و<em>حافات</em> —
لتكوّن <em>رسماً بيانياً</em> (\\aosafigref{500l.contingent.graph}).</p>
<p>\\aosafigure[180pt]/images/500-lines/contingent-0-figure1.webp{ثلاثة ملفات مُنشأة بتحليل ثلاثة نصوص مُدخلة.}{500l.contingent.graph}</p>
<p>ستوفّر كل لغة قد يلجأ إليها مبرمج
لبناء نظام بناء
بنى بيانات متنوّعة
يمكن بها تمثيل مثل هذا الرسم البياني من العقد والحافات.</p>
<p>فكيف يمكننا تمثيل مثل هذا الرسم البياني في Python؟</p>
<p>تمنح لغة Python الأولوية لأربع بنى بيانات عامة
بمنحها دعماً مباشراً في صياغة اللغة.
يمكنك إنشاء نسخ جديدة من بنى البيانات الأربع العظمى هذه
بمجرد كتابة تمثيلها الحرفي في شيفرتك المصدرية،
بينما تتوفر كائنات أنواعها الأربعة كرموز مدمجة
يمكن استخدامها دون استيراد.</p>
<p>الـ <strong>tuple</strong> تسلسل للقراءة فقط
يُستخدم للاحتفاظ ببيانات غير متجانسة —
فكل خانة في الـ tuple تعني عادةً شيئاً مختلفاً.
هنا يحتفظ الـ tuple باسم مضيف ورقم منفذ معاً،
وسيفقد معناه إن أُعيد ترتيب عناصره:</p>
<pre><code class="language-python">(<span class="hljs-string">&#x27;dropbox.com&#x27;</span>, <span class="hljs-number">443</span>)
</code></pre>
<p>الـ <strong>list</strong> تسلسل قابل للتغيير
يُستخدم للاحتفاظ ببيانات متجانسة —
فكل عنصر له عادةً البنية والمعنى نفسيهما قياساً بنظرائه.
يمكن استخدام القوائم إمّا للحفاظ على ترتيب مُدخل البيانات الأصلي،
وإمّا لإعادة ترتيبها أو فرزها
لترتيب جديد وأكثر فائدة.</p>
<pre><code class="language-python">[<span class="hljs-string">&#x27;C&#x27;</span>, <span class="hljs-string">&#x27;Awk&#x27;</span>, <span class="hljs-string">&#x27;TCL&#x27;</span>, <span class="hljs-string">&#x27;Python&#x27;</span>, <span class="hljs-string">&#x27;JavaScript&#x27;</span>]
</code></pre>
<p>أما الـ <strong>set</strong> فلا يحافظ على الترتيب.
فهو يتذكّر فقط ما إذا أُضيفت قيمة معيّنة،
لا عدد المرات،
لذلك فهو بنية البيانات المفضّلة
لإزالة التكرارات من تدفّق بيانات.
مثلاً، سيكون لكل من المجموعتين التاليتين ثلاثة عناصر:</p>
<pre><code class="language-python">{<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>}
{<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>}
</code></pre>
<p>أما الـ <strong>dict</strong> فهو بنية بيانات ترابطية لتخزين قيم
يمكن الوصول إليها عبر مفتاح.
تتيح القواميس للمبرمج أن يختار المفتاح
الذي يُفهرَس به كل قيمة،
بدلاً من استخدام الفهرسة العددية التلقائية كما يفعل الـ tuple والـ list.
ويستند البحث إلى جدول تجزئة،
ما يعني أن البحث عن مفتاح في الـ dict يجري بالسرعة نفسها
سواء كان الـ dict يملك اثني عشر مفتاحاً أو مليون مفتاح.</p>
<pre><code class="language-python">{<span class="hljs-string">&#x27;ssh&#x27;</span>: <span class="hljs-number">22</span>, <span class="hljs-string">&#x27;telnet&#x27;</span>: <span class="hljs-number">23</span>, <span class="hljs-string">&#x27;domain&#x27;</span>: <span class="hljs-number">53</span>, <span class="hljs-string">&#x27;http&#x27;</span>: <span class="hljs-number">80</span>}
</code></pre>
<p>مفتاح مرونة Python
هو أن بنى البيانات الأربع هذه قابلة للتركيب.
فيمكن للمبرمج أن يتداخل بينها عشوائياً
لينتج مخازن بيانات أكثر تعقيداً
تبقى قواعدها وصياغتها القواعد والصياغة البسيطة
للـ tuples والقوائم والمجموعات والقواميس الأساسية.</p>
<p>ولأن كل حافة من حواف رسمنا البياني تحتاج
أن تعرف على الأقل عقدة أصلها وعقدة وجهتها،
فأبسط تمثيل ممكن سيكون tuple.
قد تبدو الحافة العليا في \\aosafigref{500l.contingent.graph} كالتالي:</p>
<pre><code class="language-python">    (<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial.html&#x27;</span>)
</code></pre>
<p>فكيف يمكننا تخزين عدة حواف؟
ورغم أن دافعنا الأول قد يكون
أن نرمى كل tuples حوافنا في قائمة،
فذلك له عيوب.
فالقائمة تحرص على الحفاظ على الترتيب،
لكن من غير المعقول الحديث عن ترتيب مطلق
لحواف رسم بياني.
ولن ترفض القائمة أن تحمل عدة نسخ
من الحافة نفسها تماماً،
رغم أننا نريد أن يكفي
سهم واحد بين <code>tutorial.rst</code> و<code>tutorial.html</code>.
الخيار الصحيح هو إذن المجموعة،
التي تجعلنا نمثّل \\aosafigref{500l.contingent.graph} كالتالي:</p>
<pre><code class="language-python">    {(<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial.html&#x27;</span>),
     (<span class="hljs-string">&#x27;index.rst&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>),
     (<span class="hljs-string">&#x27;api.rst&#x27;</span>, <span class="hljs-string">&#x27;api.html&#x27;</span>)}
</code></pre>
<p>وهذا يتيح تكراراً سريعاً على كل حوافنا،
وعمليات إدراج وحذف سريعة لحافة واحدة،
وطريقاً سريعاً للتحقق مما إذا كانت حافة بعينها موجودة.</p>
<p>للأسف، تلك ليست العمليات الوحيدة التي نحتاجها.</p>
<p>فنظام بناء مثل Contingent
يحتاج إلى فهم العلاقة بين عقدة معيّنة
وبين كل العقد المتصلة بها.
مثلاً، حين يتغير <code>api.rst</code>،
يحتاج Contingent أن يعرف ما هي الأصول المتأثرة، إن وُجدت،
بتغيير ما،
لتقليل العمل المنفَّذ
مع ضمان اكتمال البناء في الوقت نفسه.
وللإجابة عن هذا السؤال —
«ما العُقد الواردة في تيار <code>api.rst</code>؟» —
نحتاج إلى فحص الحواف <em>الخارجة</em> من <code>api.rst</code>.</p>
<p>لكن بناء رسم التبعيات البياني يتطلب أن
يهتم Contingent بـ <em>مُدخلات</em> العقدة أيضاً.
ما المُدخلات التي استُخدمت، مثلاً،
حين جمع نظام البناء مستند المخرجات <code>tutorial.html</code>؟
إنه بمراقبته مُدخل كل عقدة
يستطيع Contingent أن يعرف أن <code>api.html</code> تعتمد على <code>api.rst</code> لكن
<code>tutorial.html</code> لا تعتمد عليها.
ومع تغيّر المصادر وحدوث عمليات إعادة البناء،
يعيد Contingent بناء الحواف الداخلة لكل عقدة متغيّرة
لإزالة الحواف التي قد تكون مهملة
ليتعلّم من جديد الموارد التي تستخدمها المهمة هذه المرة.</p>
<p>أما مجموعة الـ tuples الخاصة بنا فتجعل الإجابة
عن أيٍّ من هذين السؤالين غير سهلة.
لو احتجنا أن نعرف العلاقة بين <code>api.html</code>
وبقية الرسم البياني،
لضروري سنضطر إلى اجتياز المجموعة كلها
بحثاً عن حواف تبدأ أو تنتهي عند عقدة <code>api.html</code>.</p>
<p>فبنية بيانات ترابطية مثل dict في Python
ستجعل هذه الأعمال أسهل
بإتاحتها البحث المباشر عن كل الحواف الخاصة بعقدة بعينها:</p>
<pre><code class="language-python">    {<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>: {(<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial.html&#x27;</span>)},
     <span class="hljs-string">&#x27;tutorial.html&#x27;</span>: {(<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial.html&#x27;</span>)},
     <span class="hljs-string">&#x27;index.rst&#x27;</span>: {(<span class="hljs-string">&#x27;index.rst&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>)},
     <span class="hljs-string">&#x27;index.html&#x27;</span>: {(<span class="hljs-string">&#x27;index.rst&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>)},
     <span class="hljs-string">&#x27;api.rst&#x27;</span>: {(<span class="hljs-string">&#x27;api.rst&#x27;</span>, <span class="hljs-string">&#x27;api.html&#x27;</span>)},
     <span class="hljs-string">&#x27;api.html&#x27;</span>: {(<span class="hljs-string">&#x27;api.rst&#x27;</span>, <span class="hljs-string">&#x27;api.html&#x27;</span>)}}
</code></pre>
<p>أصبح البحث عن حواف عقدة بعينها سريعاً جداً الآن،
على حساب اضطرارنا لتخزين كل حافة مرتين:
مرة في مجموعة الحواف الداخلة،
ومرة في مجموعة الحواف الخارجة.
لكن الحواف في كل مجموعة سيتعين فحصها يدوياً
لرؤية أيها داخلة وأيها خارجة.
كما أن تكرار تسمية العقدة
في مجموعة حوافها مرة بعد مرة أمر زائد بعض الشيء.</p>
<p>والحل لهذين الاعتراضين معاً
هو وضع الحواف الداخلة والخارجة
في بنيتي بيانات منفصلتين خاصتهما،
وهذا سيعفينا أيضاً
من الحاجة إلى ذكر العقدة مرة بعد مرة
لكل حافة من الحواف التي تشارك فيها.</p>
<pre><code class="language-python">    incoming = {
        <span class="hljs-string">&#x27;tutorial.html&#x27;</span>: {<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>},
        <span class="hljs-string">&#x27;index.html&#x27;</span>: {<span class="hljs-string">&#x27;index.rst&#x27;</span>},
        <span class="hljs-string">&#x27;api.html&#x27;</span>: {<span class="hljs-string">&#x27;api.rst&#x27;</span>},
        }

    outgoing = {
        <span class="hljs-string">&#x27;tutorial.rst&#x27;</span>: {<span class="hljs-string">&#x27;tutorial.html&#x27;</span>},
        <span class="hljs-string">&#x27;index.rst&#x27;</span>: {<span class="hljs-string">&#x27;index.html&#x27;</span>},
        <span class="hljs-string">&#x27;api.rst&#x27;</span>: {<span class="hljs-string">&#x27;api.html&#x27;</span>},
        }
</code></pre>
<p>لاحظ أن <code>outgoing</code> يمثّل، مباشرةً في صياغة Python،
تماماً ما رسمناه في \\aosafigref{500l.contingent.graph} سابقاً:
فالمستندات المصدرية على اليسار
سيحوّلها نظام البناء إلى
مستندات المخرجات على اليمين.
وفي هذا المثال البسيط يشير كل مصدر إلى مُخرج واحد فقط —
فكل مجموعات المخرجات تحتوي عنصراً واحداً فقط —
لكننا سنرى بعد قليل أمثلة يكون فيها عقدة مُدخل واحدة
عواقب نزولية متعددة.</p>
<p>كل حافة في بنية بيانات القاموس-من-المجموعات هذه
تُمثَّل مرتين فعلاً،
مرة كحافة خارجة من عقدة
(<code>tutorial.rst</code> → <code>tutorial.html</code>)
ومرة أخرى كحافة داخلة إلى الأخرى
(<code>tutorial.html</code> ← <code>tutorial.rst</code>).
وهذان التمثيلان يلتقطان العلاقة نفسها تماماً،
بل من منظورَي العقدتين المتقابلتين
على طرفي الحافة.
لكن مقابل هذه التكرارية،
تدعم بنية البيانات البحث السريع الذي يحتاجه Contingent.</p>
<h2 id="الاستخدام-الصحيح-للأصناف">الاستخدام الصحيح للأصناف</h2>
<p>ربما فاجأك
غياب الأصناف في نقاش
بنى بيانات Python أعلاه.
فالأصناف، بعد كل شيء، آلية متكررة لتنظيم التطبيقات
وموضوع لا يقل تكراراً عن جدل محتدم
بين أنصارها ومانعيها.
وقد ظُنّ وقتاً ما أن الأصناف مهمة بالقدر الذي
صُممت حوله مناهج تعليمية كاملة،
وتضمّ معظم لغات البرمجة الشائعة
صياغة مخصّصة لتعريفها واستخدامها.</p>
<p>لكن اتضح أن الأصناف غالباً ما تكون
متعامدة مع مسألة تصميم بنى البيانات.
فهي لا تقدّم لنا نموذجاً بديلاً تماماً لنمذجة البيانات،
بل تكتفي بتكرار بنى البيانات التي رأيناها بالفعل:</p>
<ul>
<li>نسخة الصنف <em>مُنفَّذة</em> على هيئة dict.</li>
<li>نسخة الصنف <em>تُستخدم</em> مثل tuple قابل للتغيير.</li>
</ul>
<p>يقدّم الصنف البحث بالمفتاح عبر صياغة أجمل،
حيث يمكنك أن تكتب <code>graph.incoming</code>
بدلاً من <code>graph[&quot;incoming&quot;]</code>.
لكن في الواقع، نادراً ما تُستخدم نسخ الأصناف
كمخازن مفاتيح-قيم عامة.
بدلاً من ذلك، تُستخدم لتنظيم بيانات مترابطة لكنها غير متجانسة
حسب اسم الخاصية،
مع تفاصيل التنفيذ مغلّفة خلف
واجهة متسقة يسهل تذكّرها.</p>
<p>فبدلاً من ضم اسم مضيف ورقم منفذ معاً في tuple
والاضطرار إلى تذكّر أيهما جاء أولاً وأيهما جاء ثانياً،
تنشئ صنف <code>Address</code>
تملك نسخه كل منها سمتي <code>host</code> و<code>port</code>.
بعدها تستطيع تمرير كائنات <code>Address</code> هنا وهناك
حيث كان عليك وإلا أن تستعمل tuples مجهولة الهوية.
تصير الشيفرة أسهل في القراءة وأسهل في الكتابة.
لكن استخدام نسخة صنف لا يغيّر حقاً
أياً من الأسئلة التي واجهناها أعلاه عند تصميم البيانات،
بل يوفّر حاوية أجمل وأقل جهالة.</p>
<p>فالقيمة الحقيقية للأصناف إذن
ليست في أنها تغيّر علم تصميم البيانات.
بل قيمة الأصناف
في أنها تتيح لك <em>إخفاء</em> تصميم بياناتك عن بقية البرنامج!</p>
<p>فنجاح تصميم التطبيقات
يقوم على قدرتنا على الاستفادة
من بنى البيانات المدمجة القوية التي توفّرها لنا Python
مع تقليل حجم التفاصيل التي يُشترط علينا
الاحتفاظ بها في أذهاننا في كل لحظة.
تقدّم الأصناف آلية لحل هذه المعضلة الظاهرية:
فالصنف المستخدم بفاعلية يوفّر واجهة
حول مجموعة فرعية صغيرة من تصميم النظام الإجمالي.
وحين نعمل داخل مجموعة فرعية واحدة — كـ <code>Graph</code> مثلاً —
يستطيع المرء أن ينسى تفاصيل التنفيذ للمجموعات الفرعية الأخرى
طالما استطاع تذكّر واجهاتها.
وهكذا يجد المبرمجون أنفسهم غالباً يتنقّلون
بين عدة مستويات من التجريد
أثناء كتابة نظام،
فتارة يعملون بنموذج البيانات وتفاصيل التنفيذ
لنظام فرعي بعينه،
وتارة يربطون المفاهيم الأعلى عبر واجهاتها.</p>
<p>فمثلاً، من الخارج،
يمكن للشيفرة أن تطلب نسخة <code>Graph</code> جديدة ببساطة:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> contingent <span class="hljs-keyword">import</span> graphlib
<span class="hljs-meta">&gt;&gt;&gt; </span>g = graphlib.Graph()
</code></pre>
<p>دون الحاجة إلى فهم تفاصيل كيفية عمل <code>Graph</code>.
والشيفرة التي تستخدم الرسم البياني فحسب
ترى أفعال الواجهة — استدعاءات التوابع —
عند التعامل مع رسم بياني،
كما حين تُضاف حافة أو تُنفَّذ عملية أخرى:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;index.rst&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial.html&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;api.rst&#x27;</span>, <span class="hljs-string">&#x27;api.html&#x27;</span>)
</code></pre>
<p>ولعلّ القراء الدقيقين لاحظوا أننا أضفنا حواف إلى رسمنا البياني
دون أن ننشئ صراحةً كائنات «عقدة» و«حافة»،
وأن العقد في هذه الأمثلة المبكرة
ليست سوى سلاسل نصية.
المنحدر من لغات وتقاليد أخرى،
قد كان المرء يتوقع أن يرى
أصنافاً وواجهات معرّفة من المستخدم لكل شيء في النظام:</p>
<pre><code class="language-java">    <span class="hljs-type">Graph</span> <span class="hljs-variable">g</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ConcreteGraph</span>();
    <span class="hljs-type">Node</span> <span class="hljs-variable">indexRstNode</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringNode</span>(<span class="hljs-string">&quot;index.rst&quot;</span>);
    <span class="hljs-type">Node</span> <span class="hljs-variable">indexHtmlNode</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringNode</span>(<span class="hljs-string">&quot;index.html&quot;</span>);
    <span class="hljs-type">Edge</span> <span class="hljs-variable">indexEdge</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">DirectedEdge</span>(indexRstNode, indexHtmlNode);
    g.addEdge(indexEdge);
</code></pre>
<p>تُشدّد لغة Python ومجتمعها صراحةً وبقصد
على استخدام بنى بيانات بسيطة وعامة لحل المشكلات،
بدلاً من إنشاء أصناف مخصّصة لكل تفصيل دقيق
في المشكلة التي نريد معالجتها.
وهذه إحدى وجوه مفهوم الحلول «البايثونية»:
فالحلول البايثونية تحاول
تقليل العبء الصياغي
والاستفادة من أدوات Python المدمجة القوية
ومكتبتها القياسية الواسعة.</p>
<p>ولهذه الاعتبارات في الاعتبار،
لنعد إلى صنف <code>Graph</code>،
نفحص تصميمه وتنفيذه لنرى
التفاعل بين بنى البيانات وواجهات الأصناف.
حين تُبنى نسخة <code>Graph</code> جديدة،
فقد سبق أن بُني زوج من القواميس
لتخزين الحواف بالمنطق الذي خطّطناه في القسم السابق:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Graph</span>:
    <span class="hljs-string">&quot;&quot;&quot;A directed graph of the relationships among build tasks.&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>._inputs_of = defaultdict(<span class="hljs-built_in">set</span>)
        <span class="hljs-variable language_">self</span>._consequences_of = defaultdict(<span class="hljs-built_in">set</span>)
</code></pre>
<p>الشرطة السفلية السابعة
أمام أسماء السمتين <code>_inputs_of</code> و<code>_consequences_of</code>
هي عُرف شائع في مجتمع Python
للإشارة إلى أن السمة خاصة.
وهذا العرف إحدى الطرق التي يقترح بها المجتمع
أن يتبادل المبرمجون الرسائل والتحذيرات
بين بعضهم عبر المكان والزمن.
ولما ادركوا الحاجة إلى الإشارة إلى الفرق بين
سمات الكائن العامة والداخلية،
اعتمد المجتمع الشرطة السفلية السابعة المفرغة
مؤشراً موجزاً ومتّسقاً إلى حدّ كبير
للمبرمجين الآخرين،
بما في ذلك أنفسنا في المستقبل،
على أن تُعامَل هذه السمة باعتبارها
جزءاً من الآلية الداخلية غير المرئية للصنف.</p>
<p>ولماذا نستخدم <code>defaultdict</code> بدل dict عادية؟
فالمشكلة الشائعة عند تركيب القواميس
مع بنى بيانات أخرى هي معالجة المفاتيح المفقودة.
ومع dict عادية،
يجلب مفتاح غير موجود خطأً من نوع <code>KeyError</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>consequences_of = {}
<span class="hljs-meta">&gt;&gt;&gt; </span>consequences_of[<span class="hljs-string">&#x27;index.rst&#x27;</span>].add(<span class="hljs-string">&#x27;index.html&#x27;</span>)
Traceback (most recent call last):
     ...
KeyError: <span class="hljs-string">&#x27;index.rst&#x27;</span>
</code></pre>
<p>وتتطلب استخدام dict عادية فحوصاً خاصة في أنحاء الشيفرة
لمعالجة هذه الحالة تحديداً، مثلاً عند إضافة حافة جديدة:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Special case to handle “we have not seen this task yet”:</span>

    <span class="hljs-keyword">if</span> input_task <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>._consequences_of:
        <span class="hljs-variable language_">self</span>._consequences_of[input_task] = <span class="hljs-built_in">set</span>()

    <span class="hljs-variable language_">self</span>._consequences_of[input_task].add(consequence_task)
</code></pre>
<p>وهذه الحاجة شائعة لدرجة أن تتضم Python أداة خاصة
هي <code>defaultdict</code>، التي تتيح لك تقديم دالة
تُعيد قيمة للمفاتيح الغائبة.
وحين نسأل عن حافة لم يرها <code>Graph</code> بعد،
سنحصل على <code>set</code> فارغ بدلاً من استثناء:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> defaultdict
<span class="hljs-meta">&gt;&gt;&gt; </span>consequences_of = defaultdict(<span class="hljs-built_in">set</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>consequences_of[<span class="hljs-string">&#x27;api.rst&#x27;</span>]
<span class="hljs-built_in">set</span>()
</code></pre>
<p>وتعني صياغة تنفيذنا بهذه الطريقة أن
أول استخدام لكل مفتاح يمكن أن يبدو مطابقاً
تماماً لاستخدامه الثاني وما بعده:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>consequences_of[<span class="hljs-string">&#x27;index.rst&#x27;</span>].add(<span class="hljs-string">&#x27;index.html&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-string">&#x27;index.html&#x27;</span> <span class="hljs-keyword">in</span> consequences_of[<span class="hljs-string">&#x27;index.rst&#x27;</span>]
<span class="hljs-literal">True</span>
</code></pre>
<p>وبهذه التقنيات، لنفحص تنفيذ
<code>add_edge</code>، التي استخدمناها سابقاً
لبناء الرسم البياني لـ \\aosafigref{500l.contingent.graph}.</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_edge</span>(<span class="hljs-params">self, input_task, consequence_task</span>):
        <span class="hljs-string">&quot;&quot;&quot;Add an edge: \`consequence_task\` uses the output of \`input_task\`.&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._consequences_of[input_task].add(consequence_task)
        <span class="hljs-variable language_">self</span>._inputs_of[consequence_task].add(input_task)
</code></pre>
<p>تُخفي هذه الطريقة الحقيقة أن خطوتي تخزين، لا خطوة واحدة،
مطلوبتان لكل حافة جديدة
كي نعرف عنها في الاتجاهين معاً.
ولاحظ كيف لا يعرف <code>add_edge()</code> ولا يهمّه
ما إذا كانت أي من العقدتين قد ظهرت من قبل.
ولأن بنى المُدخلات والعواقب
كلاً منهما <code>defaultdict(set)</code>،
يبقى تابع <code>add_edge()</code> غافلاً تماماً
بشأن كون العقدة جديدة —
فـ <code>defaultdict</code> يتولى الفرق
بإنشاء كائن <code>set</code> جديد على الطيار.
وكما رأينا أعلاه، كان <code>add_edge()</code> سيطول
ثلاثة أضعاف لو لم نستخدم <code>defaultdict</code>.
والأهم من ذلك، سيكون من الأصعب
فهم الشيفرة الناتجة واستنتاج سلوكها.
يُظهر هذا التنفيذ منهجاً بايثونياً
في معالجة المشكلات: بسيط ومباشر وموجز.</p>
<p>كما ينبغي أن يُمنح المستدعون طريقة بسيطة لزيارة كل حافة
دون أن يضطروا لتعلّم كيفية اجتياز بنية بياناتنا:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">edges</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Return all edges as \`\`(input_task, consequence_task)\`\` tuples.&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> [(a, b) <span class="hljs-keyword">for</span> a <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">sorted</span>(<span class="hljs-variable language_">self</span>._consequences_of)
                       <span class="hljs-keyword">for</span> b <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">sorted</span>(<span class="hljs-variable language_">self</span>._consequences_of[a])]
</code></pre>
<p>ويحاول تابع <code>Graph.sorted()</code>
فرز العقد
بترتيب فرز طبيعي
(مثل الأبجدية)
يمكن أن يوفّر ترتيب مخرجات مستقراً للمستخدم.</p>
<p>وباستخدامنا طريقة الاجتياز هذه نرى أن،
في ضوء استدعاءات «add» الثلاثة السابقة،
يمثّل <code>g</code> الآن الرسم البياني نفسه الذي رأيناه في \\aosafigref{500l.contingent.graph}.</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> pprint <span class="hljs-keyword">import</span> pprint
<span class="hljs-meta">&gt;&gt;&gt; </span>pprint(g.edges())
[(<span class="hljs-string">&#x27;api.rst&#x27;</span>, <span class="hljs-string">&#x27;api.html&#x27;</span>),
 (<span class="hljs-string">&#x27;index.rst&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>),
 (<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial.html&#x27;</span>)]
</code></pre>
<p>ولأننا نملك الآن كائن Python حياً حقيقياً،
لا مجرد رسم تخطيطي،
بوسعنا أن نطرح عليه أسئلة ممتعة!
فمثلاً، حين يبني Contingent مدونة من ملفات مصدرية،
سيحتاج إلى معرفة أمور مثل «ماذا يعتمد على <code>api.rst</code>؟» حين
يتغير محتوى <code>api.rst</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>g.immediate_consequences_of(<span class="hljs-string">&#x27;api.rst&#x27;</span>)
[<span class="hljs-string">&#x27;api.html&#x27;</span>]
</code></pre>
<p>يُخبر هذا <code>Graph</code> لـ Contingent أن،
حين يتغير <code>api.rst</code>،
فقد أصبح <code>api.html</code> مهملاً ويجب إعادة بنائه.</p>
<p>وماذا عن <code>index.html</code>؟</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>g.immediate_consequences_of(<span class="hljs-string">&#x27;index.html&#x27;</span>)
[]
</code></pre>
<p>لقد أُعيدت قائمة فارغة،
في إشارة إلى أن <code>index.html</code> يقع على الحافة اليمنى من الرسم البياني
وبالتالي لا يلزم إعادة بناء أي شيء آخر إن تغيّر.
ويمكن التعبير عن هذا الاستعلام ببساطة تامة
بفضل العمل الذي أُنجز بالفعل في تخطيط بياناتنا:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">immediate_consequences_of</span>(<span class="hljs-params">self, task</span>):
        <span class="hljs-string">&quot;&quot;&quot;Return the tasks that use \`task\` as an input.&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">sorted</span>(<span class="hljs-variable language_">self</span>._consequences_of[task])
</code></pre>
<pre><code class="language-python"> &gt;&gt;&gt; <span class="hljs-keyword">from</span> contingent.rendering <span class="hljs-keyword">import</span> as_graphviz
 &gt;&gt;&gt; <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;figure1.dot&#x27;</span>, <span class="hljs-string">&#x27;w&#x27;</span>).write(as_graphviz(g)) <span class="hljs-keyword">and</span> <span class="hljs-literal">None</span>
</code></pre>
<p>تجاهل \\aosafigref{500l.contingent.graph} إحدى أهم العلاقات
التي اكتشفناها في القسم الافتتاحي من فصلنا:
طريقة ظهور عناوين المستندات في جدول المحتويات.
لنملأ هذه التفصيلة.
سننشئ عقدة لكل سلسلة عنوان
يجب أن تُولَّد بتحليل ملف مُدخل
ثم تُمرَّر إلى أحد إجراءاتنا الأخرى:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;api.rst&#x27;</span>, <span class="hljs-string">&#x27;api-title&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;api-title&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;tutorial.rst&#x27;</span>, <span class="hljs-string">&#x27;tutorial-title&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>g.add_edge(<span class="hljs-string">&#x27;tutorial-title&#x27;</span>, <span class="hljs-string">&#x27;index.html&#x27;</span>)
</code></pre>
<p>والنتيجة رسم بياني (\\aosafigref{500l.contingent.graph2}) يستطيع على نحو صحيح التعامل مع
إعادة بناء جدول المحتويات الذي ناقشناه
في افتتاح هذا الفصل.</p>
<p>\\aosafigure[240pt]/images/500-lines/contingent-1-figure2.webp{يجري الاستعداد لإعادة بناء <code>index.html</code> كلما تغيّر أي عنوان يذكره.}{500l.contingent.graph2}</p>
<p>ويوضّح هذا المسح اليدوي ما سيفعله
Contingent في النهاية نيابةً عنا:
فالرسم البياني <code>g</code> يلتقط المُدخلات والعواقب
للمخرجات المختلفة في توثيق مشروعنا.</p>
<h2 id="تعلم-الاتصالات">تعلّم الاتصالات</h2>
<p>لدينا الآن طريقة تمكّن Contingent
من تتبّع المهام والعلاقات بينها.
لكن إذا أمعنا النظر في \\aosafigref{500l.contingent.graph2}،
لرينا أنه في الواقع قليل الافتراض والتغموض:
<em>كيف</em> يُنتَج <code>api.html</code> من <code>api.rst</code>؟
وكيف نعرف أن <code>index.html</code> يحتاج عنوان الدليل؟
وكيف تُحَلّ هذه التبعية؟</p>
<p>وقد خدمتنا الحدس الأوّلي بهذه الأفكار
حين كنا نبني رسوم العواقب يدوياً،
لكن الحاسوب للأسف ليس بديهياً إلى حدّ بعيد،
لذلك سنحتاج إلى أن نكون أدقّ فيما نريده.</p>
<p>ما الخطوات اللازمة لإنتاج المخرجات من المصادر؟
وكيف تُعرَّف هذه وتُنفَّذ؟
وكيف يمكن لـ Contingent أن يعرف الاتصالات بينها؟</p>
<p>في Contingent، تُنمذَج مهام البناء كتوابع مع وسائط.
وتعرّف التوابع إجراءاتً يفهم مشروعٌ بعينه
كيفية أدائها.
وتقدّم الوسائط
التفاصيل: <em>أي</em> مستند مصدر ينبغي قراءته،
و<em>أي</em> عنوان مدونة هو المطلوب.
وأثناء تشغيلها،
قد تستدعي هذه التوابع بدورها توابع مهام <em>أخرى</em>،
مع تمرير ما تحتاجه من وسائط لتُجيب عنها.</p>
<p>ولكي نرى كيف يعمل هذا، سننفّذ فعلاً الآن
باني التوثيق الموصوف في مطلع الفصل.
ولمنع أنفسنا من الغرق في مستنقع من التفاصيل،
سنتعامل في هذا المثال التوضيحي مع
تنسيقات مستندات مُدخل ومُخرج مبسّطة.
ستتألف مستندات مُدخلنا من عنوان في السطر الأول،
مع تكوّن بقية النص جسمَ المستند.
أما الإحالات المتقاطعة فستكون مجرد أسماء ملفات مصدرية
مليوفة بعلامة ارتدة،
تُستبدل عند المخرجات بعنوان
المستند المقابل في المخرجات.</p>
<p>وهذا هو محتوى مثالنا
<code>index.txt</code> و<code>api.txt</code> و<code>tutorial.txt</code>،
يوضّح العناوين وجسوم المستندات والإحالات المتقاطعة
من تنسيق مستنداتنا الصغير:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>index = <span class="hljs-string">&quot;&quot;&quot;
<span class="hljs-meta">... </span>Table of Contents
<span class="hljs-meta">... </span>-----------------
<span class="hljs-meta">... </span>* \`tutorial.txt\`
<span class="hljs-meta">... </span>* \`api.txt\`
<span class="hljs-meta">... </span>&quot;&quot;&quot;</span>

<span class="hljs-meta">&gt;&gt;&gt; </span>tutorial = <span class="hljs-string">&quot;&quot;&quot;
<span class="hljs-meta">... </span>Beginners Tutorial
<span class="hljs-meta">... </span>------------------
<span class="hljs-meta">... </span>Welcome to the tutorial!
<span class="hljs-meta">... </span>We hope you enjoy it.
<span class="hljs-meta">... </span>&quot;&quot;&quot;</span>

<span class="hljs-meta">&gt;&gt;&gt; </span>api = <span class="hljs-string">&quot;&quot;&quot;
<span class="hljs-meta">... </span>API Reference
<span class="hljs-meta">... </span>-------------
<span class="hljs-meta">... </span>You might want to read
<span class="hljs-meta">... </span>the \`tutorial.txt\` first.
<span class="hljs-meta">... </span>&quot;&quot;&quot;</span>
</code></pre>
<p>الآن وبعد أن توفّرت لدينا بعض المواد المصدرية للعمل عليها،
ما التوابع التي سيحتاجها
باني المدونات المبني على Contingent؟</p>
<p>في الأمثلة البسيطة أعلاه،
تنتقل ملفات مخرجات HTML مباشرةً من المصدر،
لكن في نظام واقعي،
يتطلب تحويل المصدر إلى ترميز عدة خطوات:
قراءة النص الخام من القرص،
وتحليل النص إلى تمثيل داخلي مريح،
ومعالجة أي توجيهات يكون المؤلف قد حدّدها،
وحلّ الإحالات المتقاطعة أو غيرها من التبعيات الخارجية
(مثل ملفات التضمين)،
ثم تطبيق تحويل عرض واحد أو أكثر
لتحويل التمثيل الداخلي إلى صيغة مخرجه.</p>
<p>يدير Contingent المهام عبر تجميعها في <code>Project</code>،
وهو نوع من الشخصيات المتسلّطة في أنظمة البناء
يحقن نفسه في منتصف عملية البناء،
مُدوِّناً كل مرة تتحدث فيها مهمة إلى أخرى
ليكوّن رسماً بيانياً للعلاقات بين جميع المهام.</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> contingent.projectlib <span class="hljs-keyword">import</span> Project, Task
<span class="hljs-meta">&gt;&gt;&gt; </span>project = Project()
<span class="hljs-meta">&gt;&gt;&gt; </span>task = project.task
</code></pre>
<p>قد ينطوي نظام البناء للمثال المذكور في مطلع الفصل
على بضع مهام.</p>
<p>وستتظاهر مهمة <code>read()</code> لدينا بأنها تقرأ الملفات من القرص.
ولأننا عرّفنا النص المصدر فعلياً في متغيّرات،
فكل ما عليها فعله هو التحويل من اسم ملف
إلى النص المقابل.</p>
<pre><code class="language-python">  &gt;&gt;&gt; filesystem = {<span class="hljs-string">&#x27;index.txt&#x27;</span>: index,
  ...               <span class="hljs-string">&#x27;tutorial.txt&#x27;</span>: tutorial,
  ...               <span class="hljs-string">&#x27;api.txt&#x27;</span>: api}
  ...
  &gt;&gt;&gt; @task
  ... <span class="hljs-keyword">def</span> <span class="hljs-title function_">read</span>(<span class="hljs-params">filename</span>):
  ...     <span class="hljs-keyword">return</span> filesystem[filename]
</code></pre>
<p>وتفسّر مهمة <code>parse()</code> النص الخام لمحتويات الملف
وفقاً لمواصفة تنسيق مستنداتنا.
وتنسيقنا بسيط جداً:
يظهر عنوان المستند في السطر الأول،
وتُعتبر بقية المحتوى جسم المستند.</p>
<pre><code class="language-python">  &gt;&gt;&gt; @task
  ... <span class="hljs-keyword">def</span> <span class="hljs-title function_">parse</span>(<span class="hljs-params">filename</span>):
  ...     lines = read(filename).strip().splitlines()
  ...     title = lines[<span class="hljs-number">0</span>]
  ...     body = <span class="hljs-string">&#x27;\\n&#x27;</span>.join(lines[<span class="hljs-number">2</span>:])
  ...     <span class="hljs-keyword">return</span> title, body
</code></pre>
<p>ولأن التنسيق بسيط إلى هذا الحد،
فالمحلّل ساذج بعض الشيء،
لكنه يوضّح مسؤوليات التفسير
التي مُلزَم المحلّلات بالاضطلاع بها.
(التحليل بصفة عامة موضوع مثير للاهتمام جداً
وقد كُتبت عنه كتب كثيرة
إما جزئياً أو كلياً.)
ففي نظام مثل Sphinx،
يجب أن يفهم المحلّل رموز الترميز العديدة،
والتوجيهات والأوامر التي يعرّفها النظام،
محوّلاً نص المُدخل إلى شيء
تستطيع بقية النظام العمل معه.</p>
<p>ولاحظ نقطة الاتصال بين
<code>parse()</code> و<code>read()</code> —
فالخطوة الأولى في التحليل هي تمرير اسم الملف المُعطى
إلى <code>read()</code>، التي تجد محتوى ذلك الملف وتعيده.</p>
<p>مهمة <code>title_of()</code>، عند إعطائها اسم ملف مصدر،
تُعيد عنوان المستند:</p>
<pre><code class="language-python">  &gt;&gt;&gt; @task
  ... <span class="hljs-keyword">def</span> <span class="hljs-title function_">title_of</span>(<span class="hljs-params">filename</span>):
  ...     title, body = parse(filename)
  ...     <span class="hljs-keyword">return</span> title
</code></pre>
<p>توضّح هذه المهمة بسهولة
الفصل بين المسؤوليات بين
أجزاء نظام معالجة المستندات.
فالدالة <code>title_of()</code> تعمل مباشرةً
من تمثيل في الذاكرة لمستند —
في هذه الحالة، tuple —
بدلاً من أن تتولى بنفسها إعادة تحليل
المستند بأكمله مرة أخرى لمجرد إيجاد العنوان.
فالدالة <code>parse()</code> وحدها هي التي تنتج التمثيل في الذاكرة،
وفقاً لعقد مواصفة النظام،
بينما تستخدم بقية دوال معالجة باني المدونات
مثل <code>title_of()</code> مخرجات هذه الدالة كمرجع وحيدة لها.</p>
<p>وإن كنت قادماً من تقليد كائني متّفق عليه في التوجّه الكائني،
فقد يبدو هذا التصميم المعتمد على الدوال غريباً بعض الشيء.
في حل كائني تقليدي،
سيقوم <code>parse()</code> بإعادة كائن من نوع <code>Document</code>
يحتوي <code>title_of()</code> كتابع أو خاصية.
وفي الواقع، يعمل Sphinx بهذه الطريقة تماماً:
فنظامه الفرعي <code>Parser</code> ينتج كائن «شجرة مستندات Docutils» (Docutils document tree)
تستخدمه بقية أجزاء النظام.</p>
<p>Contingent ليس مت حازمّاً
بشأن أنماط التصميم هذه المختلفة،
وهو يدعم أيّ من النهجين على قدم المساواة.
وسنُبقي الأمور بسيطة في هذا الفصل.</p>
<p>أما المهمة الأخيرة،
<code>render()</code>،
فتحوّل التمثيل في الذاكرة لمستند
إلى صيغة مخرَج.
هي، بعبارة أخرى، عكس <code>parse()</code>.
فبينما تأخذ <code>parse()</code> مستند مُدخل
مطابقاً لمواصفة
وتحوّله إلى تمثيل في الذاكرة،
تأخذ <code>render()</code> تمثيلاً في الذاكرة
وتنتج مستند مخرجات
مطابقاً لمواصفة ما.</p>
<pre><code class="language-python">  &gt;&gt;&gt; <span class="hljs-keyword">import</span> re
  &gt;&gt;&gt;
  &gt;&gt;&gt; LINK = <span class="hljs-string">&#x27;&lt;a href=&quot;{}&quot;&gt;{}&lt;/a&gt;&#x27;</span>
  &gt;&gt;&gt; PAGE = <span class="hljs-string">&#x27;&lt;h1&gt;{}&lt;/h1&gt;\\n&lt;p&gt;\\n{}\\n&lt;p&gt;&#x27;</span>
  &gt;&gt;&gt;
  &gt;&gt;&gt; <span class="hljs-keyword">def</span> <span class="hljs-title function_">make_link</span>(<span class="hljs-params"><span class="hljs-keyword">match</span></span>):
  ...     filename = <span class="hljs-keyword">match</span>.group(<span class="hljs-number">1</span>)
  ...     <span class="hljs-keyword">return</span> LINK.<span class="hljs-built_in">format</span>(filename, title_of(filename))
  ...
  &gt;&gt;&gt; @task
  ... <span class="hljs-keyword">def</span> <span class="hljs-title function_">render</span>(<span class="hljs-params">filename</span>):
  ...     title, body = parse(filename)
  ...     body = re.sub(<span class="hljs-string">r&#x27;\`([^\`]+)\`&#x27;</span>, make_link, body)
  ...     <span class="hljs-keyword">return</span> PAGE.<span class="hljs-built_in">format</span>(title, body)
</code></pre>
<p>وهذا مثال على تشغيل
يستدعي كل مرحلة من المنطق أعلاه —
أي يصيّر <code>tutorial.txt</code> لينتج مخرجه:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">print</span>(render(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>))
&lt;h1&gt;Beginners Tutorial&lt;/h1&gt;
&lt;p&gt;
Welcome to the tutorial!
We hope you enjoy it.
&lt;p&gt;
</code></pre>
<p>يوضّح \\aosafigref{500l.contingent.graph3} رسم المهام
الذي يصل عبر الوساطة جميع المهام
المطلوبة لإنتاج المخرجات،
من قراءة ملف المُدخل،
إلى تحليل المستند وتحويله،
ثم صياغته:</p>
<p>\\aosafigure[240pt]/images/500-lines/contingent-2-figure3.webp{رسم بياني للمهام.}{500l.contingent.graph3}</p>
<p>واتضح أن \\aosafigref{500l.contingent.graph3} لم يُرسم يدوياً لهذا الفصل،
بل أُنشئ مباشرةً من Contingent!
فبناء هذا الرسم ممكن لكائن <code>Project</code>
لأنه يحتفظ بمكدس استدعاء خاص به،
شبيهاً بمكدس إطارات التنفيذ الحيّة
الذي يحتفظ به Python ليتذكّر أي تابع يواصل التشغيل
حين يعود الحالي منها.</p>
<p>وفي كل مرة تُستدعى فيها مهمة جديدة،
يستطيع Contingent أن يفترض أنها استُدعيت —
وأن مخرجاتها ستُستخدم —
من المهمة الموجودة حالياً في قمة المكدس.
والحفاظ على المكدس يتطلب خطوات إضافية عديدة
تحيط باستدعاء المهمة <em>T</em>:</p>
<ol>
<li>ادفع <em>T</em> إلى المكدس.</li>
<li>نفّذ <em>T</em>، ودعها تستدعي أي مهام أخرى تحتاجها.</li>
<li>اسحب <em>T</em> من المكدس.</li>
<li>أعِد نتيجتها.</li>
</ol>
<p>ولاعتراض استدعاءات المهام،
يستفيد <code>Project</code> من خاصية رئيسية في Python: <em>مزخرفات الدوال</em> (function decorators).
ويُسمح للمزخرف بأن يعالج دالةً أو يحوّلها
لحظة تعريفها.
ويستغل مزخرف <code>Project.task</code> هذه الفرصة
ليغلّف كل مهمة داخل دالة أخرى، وهي <em>غلاف</em> (wrapper)،
يتيح فصلاً نظيفاً للمسؤوليات
بين الغلاف —
الذي سيقلق بشأن إدارة الرسم البياني والمكدس
نيابةً عن المشروع —
وبين توابع المهام التي تركز على معالجة المستندات.
وهكذا يبدو هيكل مزخرف <code>task</code>:</p>
<pre><code class="language-python">        <span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> wraps

        <span class="hljs-keyword">def</span> <span class="hljs-title function_">task</span>(<span class="hljs-params">function</span>):
<span class="hljs-meta">            @wraps(<span class="hljs-params">function</span>)</span>
            <span class="hljs-keyword">def</span> <span class="hljs-title function_">wrapper</span>(<span class="hljs-params">*args</span>):
                <span class="hljs-comment"># wrapper body, that will call function()</span>
            <span class="hljs-keyword">return</span> wrapper
</code></pre>
<p>وهذا تصريح نمطي تماماً لمزخرف في Python.
ثم يمكن تطبيقه على دالة
بذكر اسمها بعد محرف <code>@</code> فوق <code>def</code>
الذي ينشئ تلك الدالة:</p>
<pre><code class="language-python"><span class="hljs-meta">    @task</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">title_of</span>(<span class="hljs-params">filename</span>):
        title, body = parse(filename)
        <span class="hljs-keyword">return</span> title
</code></pre>
<p>وحين يكتمل هذا التعريف،
يشير الاسم <code>title_of</code> إلى
النسخة المغلَّفة من الدالة.
ويمكن للغلاف الوصول إلى النسخة الأصلية من الدالة
عبر الاسم <code>function</code>،
فتستدعيها في الوقت المناسب.
ويجري جسم غلاف Contingent
شيئاً على النحو التالي:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">task</span>(<span class="hljs-params">function</span>):
<span class="hljs-meta">        @wraps(<span class="hljs-params">function</span>)</span>
        <span class="hljs-keyword">def</span> <span class="hljs-title function_">wrapper</span>(<span class="hljs-params">*args</span>):
            task = Task(wrapper, args)
            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.task_stack:
                <span class="hljs-variable language_">self</span>._graph.add_edge(task, <span class="hljs-variable language_">self</span>.task_stack[-<span class="hljs-number">1</span>])
            <span class="hljs-variable language_">self</span>._graph.clear_inputs_of(task)
            <span class="hljs-variable language_">self</span>._task_stack.append(task)
            <span class="hljs-keyword">try</span>:
                value = function(*args)
            <span class="hljs-keyword">finally</span>:
                <span class="hljs-variable language_">self</span>._task_stack.pop()

            <span class="hljs-keyword">return</span> value
        <span class="hljs-keyword">return</span> wrapper
</code></pre>
<p>ويؤدي هذا الغلاف عدة خطوات صيانة جوهرية:</p>
<ol>
<li>
<p>يغلّف المهمة —
دالة مع وسائطها —
في كائن صغير لأغراض الراحة.
واسم <code>wrapper</code> هنا يشير إلى النسخة المغلَّفة من دالة المهمة.</p>
</li>
<li>
<p>إذا استُدعيت هذه المهمة
من مهمة جارية بالفعل،
فإضافة حافة تسجّل أن
هذه المهمة مُدخل للمهمة الجارية.</p>
</li>
<li>
<p>أنسَ كل ما قد تعلّمناه في المرة السابقة عن المهمة،
لأنها قد تتخذ قرارات مختلفة هذه المرة —
فإذا لم يعد النص المصدري لدليل الـ API يذكر الدليل، مثلاً،
فلن يطلب <code>render()</code> منه
<code>title_of()</code> لمستند الدليل.</p>
</li>
<li>
<p>ادفع هذه المهمة إلى قمة مكدس المهام
تحسباً لأن تقرّر بدورها استدعاء مزيد من المهام
في أثناء تنفيذ عملها.</p>
</li>
<li>
<p>استدعِ المهمة
داخل كتلة <code>try...finally</code>
تضمن لنا إزالة المهمة المنتهية من المكدس على نحو صحيح،
حتى لو ماتت بإثارة استثناء.</p>
</li>
<li>
<p>أعِد قيمة إرجاع المهمة،
كي لا يستطيع المستدعون لهذا الغلاف
أن يتيقنوا أنهم لم يستدعوا
دالة المهمة المجرّدة نفسها.</p>
</li>
</ol>
<p>وتحافظ الخطوتان 4 و5 على مكدس المهام ذاته،
ثم تستخدمه الخطوة 2 في إجراء تتبّع العواقب
الذي هو سببنا كله لبناء مكدس المهام في المقام الأول.</p>
<p>ولأن كل مهمة تُحاط بنسختها الخاصة من دالة الغلاف،
فإن مجرد استدعاء مكدس المهام العادي وتنفيذه
سينتج رسماً بيانياً للعلاقات كأثر جانبي غير مرئي.
ولهذا على استخدام الغلاف
حول كل خطوة معالجة عرّفناها:</p>
<pre><code class="language-python"><span class="hljs-meta">    @task</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">read</span>(<span class="hljs-params">filename</span>):
        <span class="hljs-comment"># body of read</span>

<span class="hljs-meta">    @task</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">parse</span>(<span class="hljs-params">filename</span>):
        <span class="hljs-comment"># body of parse</span>

<span class="hljs-meta">    @task</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">title_of</span>(<span class="hljs-params">filename</span>):
        <span class="hljs-comment"># body of title_of</span>

<span class="hljs-meta">    @task</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render</span>(<span class="hljs-params">filename</span>):
        <span class="hljs-comment"># body of render</span>
</code></pre>
<p>وبفضل هذه الأغلفة،
حين استدعينا <code>parse('tutorial.txt')</code>
تعلّم المزخرف
الاتصال بين <code>parse</code> و<code>read</code>.
ويمكننا السؤال عن العلاقة ببناء tuple <code>Task</code> آخر
والسؤال عن العواقب التي ستكون
لو تغيّرت قيمة مخرجه:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>task = Task(read, (<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>,))
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">print</span>(task)
read(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>project._graph.immediate_consequences_of(task)
[parse(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)]
</code></pre>
<p>ونتيجة إعادة قراءة ملف <code>tutorial.txt</code>
والاكتشاف بأن محتوياته قد تغيّرت
هي أننا بحاجة إلى إعادة تنفيذ الإجراء <code>parse()</code> لذلك المستند.
وماذا يحدث إذا صوّرنا مجموعة المستندات بأكملها؟
هل سيكون Contingent قادراً على تعلّم عملية البناء كلها؟</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">for</span> filename <span class="hljs-keyword">in</span> <span class="hljs-string">&#x27;index.txt&#x27;</span>, <span class="hljs-string">&#x27;tutorial.txt&#x27;</span>, <span class="hljs-string">&#x27;api.txt&#x27;</span>:
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(render(filename))
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;=&#x27;</span> * <span class="hljs-number">30</span>)
...
&lt;h1&gt;Table of Contents&lt;/h1&gt;
&lt;p&gt;
* &lt;a href=<span class="hljs-string">&quot;tutorial.txt&quot;</span>&gt;Beginners Tutorial&lt;/a&gt;
* &lt;a href=<span class="hljs-string">&quot;api.txt&quot;</span>&gt;API Reference&lt;/a&gt;
&lt;p&gt;
==============================
&lt;h1&gt;Beginners Tutorial&lt;/h1&gt;
&lt;p&gt;
Welcome to the tutorial!
We hope you enjoy it.
&lt;p&gt;
==============================
&lt;h1&gt;API Reference&lt;/h1&gt;
&lt;p&gt;
You might want to read
the &lt;a href=<span class="hljs-string">&quot;tutorial.txt&quot;</span>&gt;Beginners Tutorial&lt;/a&gt; first.
&lt;p&gt;
==============================
</code></pre>
<p>نجح!
ومن المخرجات نرى أن
تحويلنا قد استبدل بعناوين المستندات
التوجيهات في مستنداتنا المصدرية،
مما يدل على أن Contingent استطاع
اكتشاف الاتصالات بين المهام المختلفة
اللازمة لبناء مستنداتنا.</p>
<p>\\aosafigure[240pt]/images/500-lines/contingent-3-figure4.webp{المجموعة الكاملة من العلاقات بين ملفات مُدخلنا ومخرجاتنا بصيغة HTML.}{500l.contingent.graph4}</p>
<p>وبمراقبة مهمة تستدعي مهمة أخرى
عبر آليات غلاف <code>task</code>،
تعلّم <code>Project</code> تلقائياً
رسم المُدخلات والعواقب.
ولأنه يمتلك رسماً كاملاً للعواقب
في متناوله،
يعرف Contingent كل ما يلزم إعادة بنائه
لو تغيّرت مُدخلات أي مهمة.</p>
<h2 id="ملاحقة-العواقب">ملاحقة العواقب</h2>
<p>ما إن تكتمل البناء الأولي،
يحتاج Contingent إلى مراقبة ملفات المُدخل بحثاً عن تغييرات.
وحين ينهي المستخدم تعديلاً جديداً ويضغط «حفظ»،
يلزم استدعاء كل من تابع <code>read()</code> وعواقبه.</p>
<p>وسيتطلب ذلك أن نُسير في الرسم البياني بالاتجاه المعاكس
للاتجاه الذي أُنشئ به.
فقد بُني، كما تتذكّر، باستدعاء
<code>render()</code> لمرجع الـ API وجعل ذلك الاستدعاء ينادي <code>parse()</code>
الذي استدعى بدوره مهمة <code>read()</code>.
والآن نذهب في الاتجاه الآخر:
نعلم أن <code>read()</code> ستُعيد الآن محتوى جديداً،
ونحتاج إلى تحديد ما إذا كانت هناك عواقب في مجرى النهرالأولى..</p>
<p>وتجميع العواقب عملية تكرارية،
إذ يمكن لكل عاقبة أن تكون لها هي الأخرى مهام تعتمد عليها.
ويمكننا تنفيذ هذا التكرار يدوياً
عبر استدعاءات متكررة للرسم البياني.
(ولاحظ أننا نستفيد هنا
من أن موجّه Python يحفظ آخر قيمة معروضة
باسم <code>_</code> لاستخدامها في التعبير التالي.)</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>task = Task(read, (<span class="hljs-string">&#x27;api.txt&#x27;</span>,))
<span class="hljs-meta">&gt;&gt;&gt; </span>project._graph.immediate_consequences_of(task)
[parse(<span class="hljs-string">&#x27;api.txt&#x27;</span>)]
<span class="hljs-meta">&gt;&gt;&gt; </span>t1, = _
<span class="hljs-meta">&gt;&gt;&gt; </span>project._graph.immediate_consequences_of(t1)
[render(<span class="hljs-string">&#x27;api.txt&#x27;</span>), title_of(<span class="hljs-string">&#x27;api.txt&#x27;</span>)]
<span class="hljs-meta">&gt;&gt;&gt; </span>t2, t3 = _
<span class="hljs-meta">&gt;&gt;&gt; </span>project._graph.immediate_consequences_of(t2)
[]
<span class="hljs-meta">&gt;&gt;&gt; </span>project._graph.immediate_consequences_of(t3)
[render(<span class="hljs-string">&#x27;index.txt&#x27;</span>)]
<span class="hljs-meta">&gt;&gt;&gt; </span>t4, = _
<span class="hljs-meta">&gt;&gt;&gt; </span>project._graph.immediate_consequences_of(t4)
[]
</code></pre>
<p>وهذه المهمة التكرارية التي تبحث مراراً عن العواقب الفورية
ولا تتوقف إلا عند بلوغنا مهام لا عواقب لها فحسب،
هي عملية رسم بيانية بالقدر الكافي من البساطة
فتُدعم مباشرةً بطريقة على صنف <code>Graph</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># Secretly adjust pprint to a narrower-than-usual width:</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>_pprint = pprint
<span class="hljs-meta">&gt;&gt;&gt; </span>pprint = <span class="hljs-keyword">lambda</span> x: _pprint(x, width=<span class="hljs-number">40</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>pprint(project._graph.recursive_consequences_of([task]))
[parse(<span class="hljs-string">&#x27;api.txt&#x27;</span>),
 render(<span class="hljs-string">&#x27;api.txt&#x27;</span>),
 title_of(<span class="hljs-string">&#x27;api.txt&#x27;</span>),
 render(<span class="hljs-string">&#x27;index.txt&#x27;</span>)]
</code></pre>
<p>وفي الحقيقة، تحاول <code>recursive_consequences_of()</code> أن تكون ذكية بعض الشيء.
فإذا ظهرت مهمة بعينها مراراً كعاقبة لاحقة
لمهام أخرى عديدة،
فإنها حريصة على ذكرها مرة واحدة فقط في قائمة المخرجات،
وعلى نقلها قرب النهاية
بحيث لا تظهر إلا بعد المهام التي تمثّل مُدخلاتها.
وتستمد هذه الذكاء من التنفيذ الكلاسيكي بالعمق أولاً
للفرز الطوبولوجي،
وهي خوارزمية (algorithm) يتهيّر كتابتها في Python بسهولة تامة
عبر تابع مساعد تكراري خفي.
تفحّص شيفرة <code>graphlib.py</code> للتفاصيل.</p>
<p>وإذا، عند اكتشاف تغيير،
حرصنا على إعادة تشغيل كل مهمة في العواقب التكرارية،
فسيتمكّن Contingent من تجنّب إعادة بناء أقل مما ينبغي.
أما تحدّينا الثاني،
فكان تجنّب إعادة البناء أكثر مما ينبغي.
ارجع مرة أخرى إلى \\aosafigref{500l.contingent.graph4}.
نريد تجنّب إعادة بناء المستندات الثلاثة كلها
في كل مرة يُغيَّر فيها <code>tutorial.txt</code>،
إذ لن يؤثر معظم التعديلات على العنوان بل على الجسم فحسب.
فكيف يمكن إنجاز ذلك؟</p>
<p>الحل هو جعل إعادة حساب الرسم البياني معتمدة على التخزين المؤقت.
فحين نتقدّم إلى الأمام في العواقب التكرارية للتغيير،
لن نستدعي إلا المهام التي تختلف مُدخلاتها عن المرة السابقة.</p>
<p>وسيطوي هذا التحسين على بنية بيانات أخيرة.
سنمنح <code>Project</code> مجموعة <code>_todo</code>
نتذكّر بها كل مهمة
تغيّر فيها قيمة مُدخل واحد على الأقل،
وبالتالي تتطلب إعادة التنفيذ.
ولأن المهام الواردة في <code>_todo</code> وحدها هي المهملة،
فقد يستطيع عملية البناء تخطّي تشغيل أي مهمة
إلا إذا ظهرت هناك.</p>
<p>مرة أخرى، يجعل تصميم Python المريح والموحّد
هذه الميزات سهلة الترميز جداً.
ولأن كائنات المهام قابلة للتجزئة،
يمكن أن تكون <code>_todo</code> مجرد مجموعة
تتذكّر عناصر المهمة بالهوية —
مما يضمن ألّا تظهر المهمة أبداً مرتين —
ويمكن أن يكون <code>_cache</code> لقيم الإرجاع من التشغيلات السابقة
قاموساً تكون المهام فيه هي المفاتيح.</p>
<p>وبدقّة أكبر، يجب أن تستمر خطوة إعادة البناء في التكرار
ما دامت <code>_todo</code> غير فارغة.
وفي كل دورة، ينبغي أن:</p>
<ul>
<li>
<p>تنادي <code>recursive_consequences_of()</code>
وتمرّر إليها كل مهمة مذكورة في <code>_todo</code>.
وستكون القيمة المُرجَعة قائمة
لا على المهام في <code>_todo</code> نفسها فحسب،
بل على كل مهمة تنحدر منها —
أي بكل مهمة، بمعنى آخر، قد تحتاج إلى إعادة تنفيذ
لو خرجت المخرجات مختلفة هذه المرة.</p>
</li>
<li>
<p>لكل مهمة في القائمة،
تتحقق مما إذا كانت مذكورة في <code>_todo</code>.
فإن لم تكن، فيمكننا تخطي تشغيلها،
لأن أيا من المهام التي أعِدنا استدعاؤها في مجرى النهر الأعلى منها
لم يُنتج قيمة إرجاع جديدة
تستوجب إعادة حساب تلك المهمة.</p>
</li>
<li>
<p>أما أي مهمة مذكورة فعلاً في <code>_todo</code>
حين نصل إليها،
فعلينا أن نطلب منها أن تعيد التشغيل وتعيد حساب قيمة إرجاعها.
فإذا اكتشفت دالة غلاف المهمة أن قيمة الإرجاع هذه
لا تطابق القيمة القديمة المخزَّنة مؤقتاً،
فستُضاف مهامها اللاحقة تلقائياً إلى <code>_todo</code>
قبل أن نصل إليها في قائمة العواقب التكرارية.</p>
</li>
</ul>
<p>وحين نصل إلى نهاية القائمة،
ينبغي أن تكون كل مهمة قد تحتاج إلى إعادة التشغيل
أُعيد تشغيلها فعلاً.
لكن احتياطاً، سنفحص <code>_todo</code>
ونحاول مرة أخرى إن لم تكن فارغة بعد.
حتى مع أشجار تبعيات شديدة التغيّر،
ينبغي أن يستقر هذا سريعاً.
ولا يمكن أن يبقي الباني في حلقة لا نهائية
سوى وجود دورة —
حيث تحتاج مهمة <em>A</em> مثلاً إلى مخرج المهمة <em>B</em>
التي تحتاج بدورها إلى مخرج المهمة <em>A</em> —
وذلك فقط إن لم تستقر قيم إرجاعها أبداً.
ولحسن الحظ، مهام البناء في العالم الحقيقي خالية عادةً من الدورات.</p>
<p>ولنتتبّع سلوك هذا النظام عبر مثال.</p>
<p>فلنفترض أنك حرّرت <code>tutorial.txt</code>
وغيّرت العنوان ومحتوى الجسم معاً.
ويمكننا محاكاة ذلك بتعديل القيمة
في قاموس <code>filesystem</code> لدينا:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>filesystem[<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>] = <span class="hljs-string">&quot;&quot;&quot;
<span class="hljs-meta">... </span>The Coder Tutorial
<span class="hljs-meta">... </span>------------------
<span class="hljs-meta">... </span>This is a new and improved
<span class="hljs-meta">... </span>introductory paragraph.
<span class="hljs-meta">... </span>&quot;&quot;&quot;</span>
</code></pre>
<p>والآن وقد تغيّرت المحتويات،
يستطيع Project إعادة تشغيل مهمة <code>read()</code>
باستخدام مدير السياق <code>cache_off()</code> الخاص به
الذي يعطّل مؤقتاً استعداده
لإعادة نتيجة قديمة مخزَّنة مؤقتاً لمهمة ووسائط معيّنة:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">with</span> project.cache_off():
<span class="hljs-meta">... </span>    text = read(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
</code></pre>
<p>لقد قُرئ الآن نص الدليل الجديد إلى المخزن المؤقت.
كم عدد المهام النازلة التي ستحتاج إلى إعادة التنفيذ؟</p>
<p>ولتساعدنا في الإجابة عن هذا السؤال،
يدعم صنف <code>Project</code> آلية تتبّع بسيطة
تخبرنا بالمهام التي نُفِّذت في أثناء
عملية إعادة بناء.
ولأن التغيير السابق في <code>tutorial.txt</code>
يؤثر في جسمه وعنوانه معاً،
فإن كل ما ينحدر منه سيحتاج إلى إعادة الحساب:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>project.start_tracing()
<span class="hljs-meta">&gt;&gt;&gt; </span>project.rebuild()
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">print</span>(project.stop_tracing())
calling parse(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
calling render(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
calling title_of(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
calling render(<span class="hljs-string">&#x27;api.txt&#x27;</span>)
calling render(<span class="hljs-string">&#x27;index.txt&#x27;</span>)
</code></pre>
<p>وبالنظر إلى الوراء في \\aosafigref{500l.contingent.graph4}،
سترى أن، كما هو متوقّع،
هذه هي كل مهمة عاقبة فورية أو نازلة
لـ <code>read('tutorial.txt')</code>.</p>
<p>لكن ماذا لو حرّرناه مرة أخرى،
لكن مع ترك العنوان كما هو هذه المرة؟</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>filesystem[<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>] = <span class="hljs-string">&quot;&quot;&quot;
<span class="hljs-meta">... </span>The Coder Tutorial
<span class="hljs-meta">... </span>------------------
<span class="hljs-meta">... </span>Welcome to the coder tutorial!
<span class="hljs-meta">... </span>It should be read top to bottom.
<span class="hljs-meta">... </span>&quot;&quot;&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">with</span> project.cache_off():
<span class="hljs-meta">... </span>    text = read(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
</code></pre>
<p>هذا التغيير الصغير والمحدود
لا ينبغي أن يكون له أي أثر على المستندات الأخرى.</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>project.start_tracing()
<span class="hljs-meta">&gt;&gt;&gt; </span>project.rebuild()
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">print</span>(project.stop_tracing())
calling parse(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
calling render(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
calling title_of(<span class="hljs-string">&#x27;tutorial.txt&#x27;</span>)
</code></pre>
<p>نجح!
أُعيد بناء مستند واحد فقط.
وحقيقة أن <code>title_of()</code>، وقد أُعطيت مستند مُدخل جديداً،
أعادت القيمة نفسها في كل الأحوال، تعني أن كل المهام
النازلة الأبعد قد اعتُزلت عن التغيير
ولم تُستدعَ من جديد.</p>
<h2 id="الخاتمة">الخاتمة</h2>
<p>هناك لغات ومنهجيات برمجية
تحت ظلالها يكون فيها Contingent غابةً خانقة من أصناف صغيرة ضئيلة،
تُعطى فيها أسماء مطوّلة لكل مفهوم في مجال المشكلة.</p>
<p>غير أن برمجتنا لـ Contingent بـ Python،
تجاوزنا إنشاء بضع عشرات من الأصناف الممكنة مثل
<code>TaskArgument</code> و<code>CachedResult</code> و<code>ConsequenceList</code>.
واعتمدنا بدلاً من ذلك على تقليد Python القوي
في حل المشكلات العامة ببنى بيانات عامة،
فأنتج ذلك شيفرة تستخدم مراراً مجموعة صغيرة من الأفكار
المأخوذة من بنى البيانات الأساسية: tuple وlist وset وdict.</p>
<p>لكن ألّا يسبب هذا مشكلة؟</p>
<p>فبنى البيانات العامة، بطبيعتها، مجهولة الهوية.
مشروع <code>project._cache</code> هو set.
وكذلك كل مجموعة من العقد الداخلة والنازلة
داخل <code>Graph</code>.
هل نحن معرَّضون لرؤية رسائل خطأ عامة من نوع <code>set</code>
مع عدم معرفة إن كان علينا البحث في تنفيذ المشروع أم الرسم البياني؟
أجل، أقلعنا ذلك.</p>
<p>ولحسن الحظ، لا نحن في خطر!</p>
<p>فبفضل انضباط التغليف الدقيق —
بالسماح لشيفرة <code>Graph</code> وحدها بلمس مجموعات الرسم البياني،
ولشيفرة <code>Project</code> وحدها بلمس مجموعة المشروع —
لن يقع أي التباس أبداً إذا أرجعت عملية على مجموعة
خطأ في مرحلة لاحقة من المشروع.
فاسم أعمق تابع قيد التنفيذ لحظة وقوع الخطأ
سيوجّهنا بالضبط إلى الصنف والمجموعة
المتورّطين في الخطأ.
ولا حاجة إلى إنشاء صنف فرعي من <code>set</code>
لكل تطبيق ممكن لنوع البيانات،
ما دمنا نضع تلك الشرطة السفلية الاصطلاحية أمام سمات بنى
البيانات ثم نحرص على عدم لمسها
من شيفرة خارج الصنف.</p>
<p>من كتاب <em>أنماط التصميم</em> (Design Patterns) الأجيالي،
يُظهر Contingent مدى أهمية نمط الواجهة (Facade)،
لبرنامج Python المصمَّم بعناية.
فليست كل بنية بيانات وكل جزء من البيانات في برنامج Python
يستحق أن يكون صنفه الخاص.
بدلاً من ذلك، تُستخدم الأصناف باعتدال،
عند المفاصل المفاهيمية في الشيفرة حيث يمكن لفكرة كبرى —
كفكرة رسم التبعيات البياني —
أن تُغلَّف في واجهة (Facade)
تخفي تفاصيل بنى البيانات العامة البسيطة
التي تقع تحتها.</p>
<p>والشيفرة خارج الواجهة
تسمّي المفاهيم الكبرى التي تحتاجها
والعمليات التي ترغب في تنفيذها.
وداخل الواجهة،
يتعامل المبرمج مع القطع المتحركة الصغيرة والمريحة
في لغة برمجة Python لإنجاز تلك العمليات.</p>
`,o={book:n,chapter:s,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{n as book,s as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
