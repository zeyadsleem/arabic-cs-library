const s="dive-into-systems",n="c2-depth",a="2. A Deeper Dive into C Programming",e="index",p="2. غوص أعمق في البرمجة بلغة C",l=[{depth:3,id:"221-متغيرات-المؤشرات",text:"2.2.1. متغيّرات المؤشّرات"},{depth:3,id:"241-ذاكرة-الكومة",text:"2.4.1. ذاكرة الكومة"},{depth:3,id:"242-malloc-وfree",text:"2.4.2. malloc وfree"},{depth:3,id:"243-المصفوفات-والسلاسل-النصية-المخصصة-ديناميكيا",text:"2.4.3. المصفوفات والسلاسل النصية المخصَّصة ديناميكياً"},{depth:3,id:"244-المؤشرات-إلى-ذاكرة-الكومة-والدوال",text:"2.4.4. المؤشّرات إلى ذاكرة الكومة والدوال"},{depth:3,id:"251-المصفوفات-أحادية-البعد",text:"2.5.1. المصفوفات أحادية البعد"},{depth:3,id:"252-المصفوفات-ثنائية-الأبعاد",text:"2.5.2. المصفوفات ثنائية الأبعاد"},{depth:3,id:"261-دعم-c-للسلاسل-النصية-المخصصة-ساكنة-مصفوفات-char",text:"2.6.1. دعم C للسلاسل النصية المخصَّصة ساكنةً (مصفوفات char)"},{depth:3,id:"262-تخصيص-السلاسل-النصية-ديناميكيا",text:"2.6.2. تخصيص السلاسل النصية ديناميكياً"},{depth:3,id:"263-مكتبات-التلاعب-بسلاسل-c-والمحارف",text:"2.6.3. مكتبات التلاعب بسلاسل C والمحارف"},{depth:3,id:"271-مراجعة-نوع-البنية-struct-في-c",text:"2.7.1. مراجعة نوع البنية struct في C"},{depth:3,id:"272-المؤشرات-والبنى",text:"2.7.2. المؤشّرات والبنى"},{depth:3,id:"273-حقول-المؤشرات-في-البنى",text:"2.7.3. حقول المؤشّرات في البنى"},{depth:3,id:"274-مصفوفات-البنى",text:"2.7.4. مصفوفات البنى"},{depth:3,id:"275-البنى-ذاتية-الإشارة",text:"2.7.5. البنى ذاتية الإشارة"},{depth:3,id:"281-الإدخالالإخراج-القياسي",text:"2.8.1. الإدخال/الإخراج القياسي"},{depth:3,id:"282-إدخالإخراج-الملفات",text:"2.8.2. إدخال/إخراج الملفات"},{depth:3,id:"283-استخدام-الملفات-النصية-في-c",text:"2.8.3. استخدام الملفات النصية في C"},{depth:3,id:"284-دوال-الإدخالالإخراج-القياسية-وللملفات-في-stdioh",text:"2.8.4. دوال الإدخال/الإخراج القياسية وللملفات في stdio.h"}],c=`<p>بعد أن غطّينا كثيراً من أساسيات البرمجة بلغة C في الفصل السابق، نغوص الآن أعمق في تفاصيل C. نعود في هذا الفصل إلى كثير من موضوعات الفصل السابق، مثل المصفوفات والسلاسل النصية والبنى، ونناقشها بمزيد من التفصيل. كما نقدّم متغيّرات المؤشّرات في C والتخصيص الديناميكي للذاكرة. وتوفّر <strong>المؤشّرات</strong> (pointers) مستوى من الإحالة غير المباشرة إلى حالة البرنامج، ويتيح <strong>التخصيص الديناميكي للذاكرة</strong> (dynamic memory allocation) للبرنامج التكيّف مع تغيّرات الحجم واحتياجات المساحة أثناء تشغيله، فيخصّص مساحة أكبر عند الحاجة ويحرّر المساحة التي لم يعد يحتاجها. وبفهم مبرمج C كيفية استخدام متغيّرات المؤشّرات والتخصيص الديناميكي للذاكرة ومتى يفعل ذلك، يستطيع تصميم برامج قوية وفعّالة معاً.</p>
<p>نبدأ بمناقشة أجزاء ذاكرة البرنامج، فهذا سيساعد في فهم كثير من الموضوعات المعروضة لاحقاً. ومع تقدّم الفصل، نغطي إدخال/إخراج الملفات في C وبعض الموضوعات المتقدمة في C، ومنها ربط المكتبات والتصريف إلى لغة التجميع.</p>
<p>يعرض برنامج C التالي أمثلة على الدوال والوسائط والمتغيّرات المحلية والعامة (حُذفت تعليقات الدوال لاختصار قائمة الشيفرة هذه):</p>
<pre><code class="language-c"><span class="hljs-comment">/* An example C program with local and global variables */</span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">max</span><span class="hljs-params">(<span class="hljs-type">int</span> n1, <span class="hljs-type">int</span> n2)</span>; <span class="hljs-comment">/* function prototypes */</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">change</span><span class="hljs-params">(<span class="hljs-type">int</span> amt)</span>;

<span class="hljs-type">int</span> g_x;  <span class="hljs-comment">/* global variable: declared outside function bodies */</span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> x, result;   <span class="hljs-comment">/* local variables: declared inside function bodies */</span>

    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Enter a value: &quot;</span>);
    <span class="hljs-built_in">scanf</span>(<span class="hljs-string">&quot;%d&quot;</span>, &amp;x);
    g_x = <span class="hljs-number">10</span>;       <span class="hljs-comment">/* global variables can be accessed in any function */</span>

    result = max(g_x, x);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%d is the largest of %d and %d\\n&quot;</span>, result, g_x, x);

    result = change(<span class="hljs-number">10</span>);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;g_x&#x27;s value was %d and now is %d\\n&quot;</span>, result, g_x);

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}

<span class="hljs-type">int</span> <span class="hljs-title function_">max</span><span class="hljs-params">(<span class="hljs-type">int</span> n1, <span class="hljs-type">int</span> n2)</span> {  <span class="hljs-comment">/* function with two parameters */</span>
    <span class="hljs-type">int</span> val;    <span class="hljs-comment">/* local variable */</span>

    val = n1;
    <span class="hljs-keyword">if</span> ( n2 &gt; n1 ) {
        val = n2;
    }
    <span class="hljs-keyword">return</span> val;
}

<span class="hljs-type">int</span> <span class="hljs-title function_">change</span><span class="hljs-params">(<span class="hljs-type">int</span> amt)</span> {
    <span class="hljs-type">int</span> val;

    val = g_x;  <span class="hljs-comment">/* global variables can be accessed in any function */</span>
    g_x += amt;
    <span class="hljs-keyword">return</span> val;
}
</code></pre>
<p>يعرض هذا المثال متغيّرات برنامج بنطاقات مختلفة. ويحدد <strong>نطاق</strong> (scope) المتغيّر متى يكون لاسمه معنى. وبعبارة أخرى، يحدد النطاق مجموعة كتل شيفرة البرنامج التي يكون فيها المتغيّر مرتبطاً بموقع ذاكرة برنامج ويمكن لشيفرة البرنامج استخدامه.</p>
<p>يؤدي الإعلان عن متغيّر خارج أي جسم دالة إلى إنشاء <strong>متغيّر عام</strong> (global variable). وتبقى المتغيّرات العامة في النطاق دائماً ويمكن لأي شيفرة في البرنامج استخدامها لأنها مرتبطة دائماً بموقع ذاكرة محدد واحد. ويجب أن يكون لكل متغيّر عام اسم فريد — إذ يحدد اسمه بشكل فريد موقع تخزين محدداً في ذاكرة البرنامج طوال مدة البرنامج.</p>
<p>تكون <strong>المتغيّرات المحلية والوسائط</strong> في النطاق فقط داخل الدالة المعرَّفة فيها. فمثلاً، يكون الوسيط <code>amt</code> في النطاق فقط داخل الدالة <code>change</code>. وهذا يعني أن العبارات داخل جسم الدالة <code>change</code> وحدها يمكنها الوصول إلى الوسيط <code>amt</code>، وأن نسخة من الوسيط <code>amt</code> ترتبط بموقع تخزين ذاكرة محدد فقط داخل تنفيذ نشط محدد للدالة. وتُخصَّص المساحة لتخزين قيمة الوسيط على المكدّس عند استدعاء الدالة، وتُحرَّر من المكدّس عند عودة الدالة. وتحصل كل عملية تنشيط للدالة على ارتباطاتها الخاصة لوسائطها ومتغيّراتها المحلية. وهكذا، في استدعاءات الدوال التعاودية، يحصل كل استدعاء (أو تنشيط) على إطار مكدّس منفصل يحتوي على مساحة لوسائطه ومتغيّراته المحلية.</p>
<p>ولأن الوسائط والمتغيّرات المحلية في النطاق فقط داخل الدالة المعرَّفة فيها، يمكن لدوال مختلفة استخدام الأسماء نفسها للمتغيّرات المحلية والوسائط. فمثلاً، تحتوي كل من الدالتين <code>change</code> و<code>max</code> على متغيّر محلي باسم <code>val</code>. وعندما تشير شيفرة في الدالة <code>max</code> إلى <code>val</code> فإنها تشير إلى متغيّرها المحلي <code>val</code> لا إلى المتغيّر المحلي <code>val</code> الخاص بالدالة <code>change</code> (وهو ليس في النطاق داخل الدالة <code>max</code>).</p>
<p>ورغم أن هناك أوقاتاً قد يلزم فيها أحياناً استخدام متغيّرات عامة في برامج C، فإننا نوصي بشدة بأن <em>تتجنّب البرمجة بالمتغيّرات العامة كلما أمكن</em>. فاستخدام المتغيّرات المحلية والوسائط فقط ينتج شيفرة أكثر وحدات وأكثر عمومية وأسهل في التنقيح. كما أن وسائط الدالة ومتغيّراتها المحلية، لأنها لا تُخصَّص في ذاكرة البرنامج إلا عندما تكون الدالة نشطة، قد تؤدي إلى برامج أكثر كفاءة في استخدام المساحة.</p>
<p>عند إطلاق برنامج جديد، يخصّص نظام التشغيل فضاء عناوين البرنامج الجديد. ويمثّل <strong>فضاء العناوين</strong> (address space) في البرنامج (أو فضاء الذاكرة) مواقع التخزين لكل ما يحتاجه في تنفيذه، أي تخزين تعليماته وبياناته. ويمكن تصوّر فضاء عناوين البرنامج كمصفوفة من البايتات القابلة للعنونة؛ ويخزّن كل عنوان مستخدم في فضاء عناوين البرنامج كل تعليمة برنامج أو قيمة بيانات أو جزءاً منها (أو بعض الحالة الإضافية اللازمة لتنفيذ البرنامج).</p>
<p>يُقسَّم فضاء ذاكرة البرنامج إلى عدة أجزاء، يُستخدم كل منها لتخزين نوع مختلف من الكيانات في فضاء عناوين العملية. ويوضّح <a href="#FigMemParts">الشكل 1</a> أجزاء فضاء ذاكرة البرنامج.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-memparts.webp" alt="The parts of program memory arranged into a program’s address space. At the top (addresses closer to 0), we have regions for the OS, code (instructions), data (globals), and the heap (dynamically allocated memory). At the other end of the address space (maximum address), the stack stores local variables and function parameters."> الشكل 1. أجزاء فضاء عناوين البرنامج.</p>
<p>يُحجز أعلى ذاكرة البرنامج لاستخدام نظام التشغيل، أما الأجزاء المتبقية فهي قابلة للاستخدام من البرنامج قيد التشغيل. وتُخزَّن تعليمات البرنامج في قسم <em>الشيفرة</em> (code) من الذاكرة. فمثلاً، يخزّن البرنامج المذكور أعلاه تعليمات الدوال <code>main</code> و<code>max</code> و<code>change</code> في هذه المنطقة من الذاكرة.</p>
<p>تقع المتغيّرات المحلية والوسائط في الجزء المخصص للمكدّس (<em>stack</em>). ولأن مقدار مساحة المكدّس ينمو ويتقلص على مدار تنفيذ البرنامج مع استدعاء الدوال والعودة منها، يُخصَّص جزء المكدّس من الذاكرة عادةً قرب أسفل الذاكرة (عند أعلى عناوين الذاكرة) لإتاحة مساحة له للتغير. ولا توجد مساحة تخزين المكدّس للمتغيّرات المحلية والوسائط إلا عندما تكون الدالة نشطة (ضمن إطار المكدّس الخاص بتنشيط الدالة على المكدّس).</p>
<p>تُخزَّن المتغيّرات العامة في قسم <em>البيانات</em> (data). وخلافاً للمكدّس، لا تنمو منطقة البيانات ولا تتقلص — إذ تبقى مساحة تخزين المتغيّرات العامة طوال تشغيل البرنامج.</p>
<p>وأخيراً، يمثّل جزء <em>الكومة</em> (heap) من الذاكرة الجزء المرتبط بالتخصيص الديناميكي للذاكرة في فضاء عناوين البرنامج. وتقع الكومة عادةً بعيداً عن ذاكرة المكدّس، وتنمو نحو عناوين أعلى كلما خصّص البرنامج قيد التشغيل مساحة أكبر ديناميكياً.</p>
<p>توفّر متغيّرات المؤشّرات في C مستوى من الإحالة غير المباشرة إلى الوصول إلى ذاكرة البرنامج. وبفهم كيفية استخدام متغيّرات المؤشّرات، يستطيع المبرمج كتابة برامج C قوية وفعّالة معاً. فمثلاً، يستطيع مبرمج C من خلال متغيّرات المؤشّرات أن:</p>
<ul>
<li>ينفّذ دوال يمكن لوسائطها تعديل قيم في إطار مكدّس المستدعي</li>
<li>يخصّص (ويحرّر) ذاكرة البرنامج ديناميكياً وقت التشغيل عندما يحتاجها البرنامج</li>
<li>يمرّر بنى بيانات كبيرة إلى الدوال بكفاءة</li>
<li>ينشئ بنى بيانات ديناميكية مترابطة</li>
<li>يفسّر بايتات ذاكرة البرنامج بطرق مختلفة.</li>
</ul>
<p>نقدّم في هذا القسم صياغة ودلالات متغيّرات المؤشّرات في C، ونقدّم أمثلة شائعة على كيفية استخدامها في برامج C.</p>
<h3 id="221-متغيرات-المؤشرات"><a href="#_pointer_variables"></a>2.2.1. متغيّرات المؤشّرات</h3>
<p>يخزّن <strong>متغيّر المؤشّر</strong> (pointer variable) عنوان موقع ذاكرة يمكن تخزين قيمة من نوع محدد فيه. فمثلاً، يمكن لمتغيّر مؤشّر تخزين قيمة عنوان <code>int</code> تُخزَّن فيه القيمة الصحيحة 12. و<em>يشير</em> متغيّر المؤشّر إلى القيمة (يرتبط بها). ويوفّر المؤشّر <em>مستوى من الإحالة غير المباشرة</em> للوصول إلى القيم المخزّنة في الذاكرة. ويوضّح <a href="#FigPointerMem">الشكل 1</a> مثالاً على ما قد يبدو عليه متغيّر مؤشّر في الذاكرة:</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-ptr.webp" alt="A pointer named &quot;ptr&quot; points to a memory location that stores the integer value 12."> الشكل 1. يخزّن متغيّر المؤشّر عنوان موقع في الذاكرة. وهنا يخزّن المؤشّر عنوان متغيّر صحيح يحمل العدد 12.</p>
<p>من خلال متغيّر المؤشّر <code>ptr</code>، يمكن الوصول بشكل غير مباشر إلى القيمة (<code>12</code>) المخزّنة في موقع الذاكرة الذي يشير إليه. وأكثر ما تستخدم برامج C متغيّرات المؤشّرات فيه:</p>
<ol>
<li><strong>وسائط «التمرير بالمؤشّر»</strong> (pass by pointer)، لكتابة دوال تستطيع تعديل قيمة وسيطتها عبر وسيط مؤشّر</li>
<li><strong>التخصيص الديناميكي للذاكرة</strong>، لكتابة برامج تخصّص (وتحرّر) مساحة أثناء تشغيل البرنامج. ويُستخدم التخصيص الديناميكي للذاكرة عادةً لتخصيص المصفوفات ديناميكياً. وهو مفيد عندما لا يعرف المبرمج حجم بنية البيانات وقت التصريف (مثلاً، يعتمد حجم المصفوفة على إدخال المستخدم وقت التشغيل). كما يتيح تغيير حجم بنى البيانات أثناء تشغيل البرنامج.</li>
</ol>
<h4><a href="#_rules_for_using_pointer_variables"></a>قواعد استخدام متغيّرات المؤشّرات</h4>
<p>تشبه قواعد استخدام متغيّرات المؤشّرات قواعد المتغيّرات العادية، إلا أنك تحتاج إلى التفكير في نوعين: نوع متغيّر المؤشّر، والنوع المخزّن في عنوان الذاكرة الذي يشير إليه متغيّر المؤشّر.</p>
<p>أولاً، <strong>أعلن عن متغيّر مؤشّر</strong> باستخدام <code>type_name *var_name</code>:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> *ptr;   <span class="hljs-comment">// stores the memory address of an int (ptr &quot;points to&quot; an int)</span>
<span class="hljs-type">char</span> *cptr; <span class="hljs-comment">// stores the memory address of a char (cptr &quot;points to&quot; a char)</span>
</code></pre>
<p><strong>ملاحظة — أنواع المؤشّرات</strong></p>
<blockquote>
<p>لاحظ أنه رغم أن <code>ptr</code> و<code>cptr</code> كلاهما مؤشّران، فإنهما يشيران إلى نوعين مختلفين:</p>
<ul>
<li>نوع <code>ptr</code> هو <em>«مؤشّر إلى int»</em> (<code>int *</code>). ويمكنه الإشارة إلى موقع ذاكرة يخزّن قيمة <code>int</code>.</li>
<li>نوع <code>cptr</code> هو <em>«مؤشّر إلى char»</em> (<code>char *</code>). ويمكنه الإشارة إلى موقع ذاكرة يخزّن قيمة <code>char</code>.</li>
</ul>
</blockquote>
<p>بعد ذلك، <strong>هيّئ متغيّر المؤشّر</strong> (اجعله يشير إلى شيء ما). وتخزّن متغيّرات المؤشّرات <em>قيم عناوين</em>. وينبغي تهيئة المؤشّر ليخزّن عنوان موقع ذاكرة يطابق نوعه النوعَ الذي يشير إليه متغيّر المؤشّر. وإحدى طرق تهيئة المؤشّر استخدام <strong>معامل العنوان</strong> (address operator) (<code>&amp;</code>) مع متغيّر للحصول على قيمة عنوان المتغيّر:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x;
<span class="hljs-type">char</span> ch;

ptr = &amp;x;    <span class="hljs-comment">// ptr gets the address of x, pointer &quot;points to&quot; x</span>
cptr = &amp;ch;  <span class="hljs-comment">// cptr gets the address of ch, pointer &quot;points to&quot; ch</span>
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-1-ptrinit.webp" alt="Initialize ptr to the address of x and cptr to the address of ch (to point to x and ch, respectively)."> الشكل 2. يمكن للبرنامج تهيئة مؤشّر بإسناد عنوان متغيّر موجود من النوع المناسب إليه.</p>
<p>وفيما يلي مثال على تهيئة مؤشّر غير صالحة بسبب عدم تطابق الأنواع:</p>
<pre><code class="language-c">cptr = &amp;x;   <span class="hljs-comment">// ERROR: cptr can hold a char memory location</span>
             <span class="hljs-comment">// (&amp;x is the address of an int)</span>
</code></pre>
<p>ورغم أن مصرّف C قد يسمح بهذا النوع من الإسناد (مع تحذير بشأن أنواع غير متوافقة)، فإن سلوك الوصول إلى <code>x</code> وتعديله عبر <code>cptr</code> لن يكون على الأرجح كما يتوقع المبرمج. وبدلاً من ذلك، ينبغي للمبرمج استخدام متغيّر <code>int *</code> للإشارة إلى موقع تخزين <code>int</code>.</p>
<p>ويمكن أيضاً إسناد قيمة خاصة، هي <strong>NULL</strong>، إلى جميع متغيّرات المؤشّرات، وهي تمثّل عنواناً غير صالح. ورغم أنه لا ينبغي استخدام <strong>المؤشّر الفارغ</strong> (null pointer) (أي الذي قيمته <code>NULL</code>) أبداً للوصول إلى الذاكرة، فإن القيمة <code>NULL</code> مفيدة لاختبار متغيّر مؤشّر لمعرفة ما إذا كان يشير إلى عنوان ذاكرة صالح. أي أن مبرمجي C كثيراً ما يفحصون مؤشّراً للتأكد من أن قيمته ليست <code>NULL</code> قبل محاولة الوصول إلى موقع الذاكرة الذي يشير إليه. ولضبط مؤشّر على <code>NULL</code>:</p>
<pre><code class="language-c">ptr = <span class="hljs-literal">NULL</span>;
cptr = <span class="hljs-literal">NULL</span>;
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-2-ptrnull.webp" alt="Initialize ptr and cptr to NULL."> الشكل 3. يمكن إعطاء أي مؤشّر القيمة الخاصة NULL، التي تشير إلى أنه لا يشير إلى أي عنوان بعينه. ولا ينبغي أبداً إلغاء الإشارة إلى المؤشّرات الفارغة.</p>
<p>وأخيراً، <strong>استخدم متغيّر المؤشّر</strong>: يتبع <strong>معامل إلغاء الإشارة</strong> (dereference operator) (<code>*</code>) متغيّر مؤشّر إلى موقع الذاكرة الذي يشير إليه ويصل إلى القيمة في ذلك الموقع:</p>
<pre><code class="language-c"><span class="hljs-comment">/* Assuming an integer named x has already been declared, this code sets the
   value of x to 8. */</span>

ptr = &amp;x;   <span class="hljs-comment">/* initialize ptr to the address of x (ptr points to variable x) */</span>
*ptr = <span class="hljs-number">8</span>;   <span class="hljs-comment">/* the memory location ptr points to is assigned 8 */</span>
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-3-ptrderef.webp" alt="Dereference ptr to access the memory it points to (x, whose value is 8)."> الشكل 4. يؤدي إلغاء الإشارة إلى مؤشّر إلى الوصول إلى القيمة التي يشير إليها المؤشّر.</p>
<h4><a href="#_pointer_examples"></a>أمثلة على المؤشّرات</h4>
<p>وفيما يلي تسلسل مثالي من عبارات C يستخدم متغيّري مؤشّر:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> *ptr1, *ptr2, x, y;

x = <span class="hljs-number">8</span>;
ptr2 = &amp;x;     <span class="hljs-comment">// ptr2 is assigned the address of x</span>
ptr1 = <span class="hljs-literal">NULL</span>;
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-4-ptrs1.webp" alt="We initialize x to 8, ptr2 to the address of x, and ptr1 gets NULL."></p>
<pre><code class="language-c">*ptr2 = <span class="hljs-number">10</span>;     <span class="hljs-comment">// the memory location ptr2 points to is assigned 10</span>
y = *ptr2 + <span class="hljs-number">3</span>;  <span class="hljs-comment">// y is assigned what ptr2 points to plus 3</span>
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-5-ptrs2.webp" alt="Dereference ptr2 to change x to 10 and assign y 13."></p>
<pre><code class="language-c">ptr1 = ptr2;   <span class="hljs-comment">// ptr1 gets the address value stored in ptr2 (both point to x)</span>
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-6-ptrs3.webp" alt="Assign ptr1 the value of ptr2 (they now both point to same location)."></p>
<pre><code class="language-c">*ptr1 = <span class="hljs-number">100</span>;
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-7-ptrs4.webp" alt="Dereference ptr1 and assign 100 to the value it points to. Note: this assignment changes value pointed to by both ptr1 and ptr2, since they both refer to the same location."></p>
<pre><code class="language-c">ptr1 = &amp;y;     <span class="hljs-comment">// change ptr1&#x27;s value (change what it points to)</span>
*ptr1 = <span class="hljs-number">80</span>;
</code></pre>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-8-ptrs5.webp" alt="Reassign ptr1 to point to the address of y and dereference it to change y’s value to 80."></p>
<p>عند استخدام متغيّرات المؤشّرات، تأمّل بعناية أنواع المتغيّرات ذات الصلة. ويمكن أن يساعد رسم صور للذاكرة (مثل المعروضة أعلاه) في فهم ما تفعله شيفرة المؤشّرات. وتشمل بعض الأخطاء الشائعة إساءة استخدام معامل إلغاء الإشارة (<code>*</code>) أو معامل العنوان (<code>&amp;</code>). فمثلاً:</p>
<pre><code class="language-c">ptr = <span class="hljs-number">20</span>;       <span class="hljs-comment">// ERROR?:  this assigns ptr to point to address 20</span>
ptr = &amp;x;
*ptr = <span class="hljs-number">20</span>;      <span class="hljs-comment">// CORRECT: this assigns 20 to the memory pointed to by ptr</span>
</code></pre>
<p>وإذا ألغى برنامجك الإشارة إلى متغيّر مؤشّر لا يحتوي عنواناً صالحاً، فسينهار البرنامج:</p>
<pre><code class="language-c">ptr = <span class="hljs-literal">NULL</span>;
*ptr = <span class="hljs-number">6</span>;    <span class="hljs-comment">// CRASH! program crashes with a segfault (a memory fault)</span>

ptr = <span class="hljs-number">20</span>;
*ptr = <span class="hljs-number">6</span>;    <span class="hljs-comment">// CRASH! segfault (20 is not a valid address)</span>

ptr = x;
*ptr = <span class="hljs-number">6</span>;   <span class="hljs-comment">// likely CRASH or may set some memory location with 6</span>
            <span class="hljs-comment">// (depends on the value of x which is used as an address value)</span>

ptr = &amp;x;   <span class="hljs-comment">// This is probably what the programmer intended</span>
*ptr = <span class="hljs-number">6</span>;
</code></pre>
<p>وتوضح هذه الأنواع من الأخطاء أحد أسباب تهيئة متغيّرات المؤشّرات على <code>NULL</code>؛ إذ يمكن للبرنامج حينها اختبار قيمة المؤشّر لمعرفة ما إذا كانت <code>NULL</code> قبل إلغاء الإشارة إليه:</p>
<pre><code class="language-c"><span class="hljs-keyword">if</span> (ptr != <span class="hljs-literal">NULL</span>) {
    *ptr = <span class="hljs-number">6</span>;
}
</code></pre>
<p>توفّر وسائط المؤشّرات آلية يمكن للدوال من خلالها تعديل قيم الوسائط. ويستخدم نمط <strong>التمرير بالمؤشّر</strong> الشائع وسيط دالة مؤشّراً <em>يحصل على قيمة عنوان موقع تخزين ما</em> مرَّره المستدعي إليه. فمثلاً، يمكن للمستدعي تمرير عنوان أحد متغيّراته المحلية. ويلغي إلغاء الإشارة إلى وسيط المؤشّر داخل الدالة إشارته، فتستطيع الدالة تعديل القيمة في موقع التخزين الذي يشير إليه.</p>
<p>رأينا بالفعل وظائف مشابهة مع وسائط المصفوفات، حيث يحصل وسيط دالة مصفوفة على قيمة عنوان أساس المصفوفة الممرَّرة (فيشير الوسيط إلى مجموعة عناصر المصفوفة نفسها التي تشير إليها وسيطته)، وتستطيع الدالة تعديل القيم المخزّنة في المصفوفة. وبشكل عام، يمكن تطبيق الفكرة نفسها بتمرير وسائط مؤشّرات إلى دوال تشير إلى مواقع الذاكرة في نطاق المستدعي.</p>
<p><strong>ملاحظة — التمرير بالقيمة</strong></p>
<blockquote>
<p>تُمرَّر جميع الوسائط في C بالقيمة وتتبع دلالات التمرير بالقيمة: يحصل الوسيط على نسخة من قيمة وسيطته، ولا يؤدي تعديل قيمة الوسيط إلى تغيير قيمة وسيطته. وعند تمرير قيم الأنواع الأساسية، مثل قيمة متغيّر <code>int</code>، يحصل وسيط الدالة على نسخة من قيمة وسيطته (قيمة <code>int</code> المحددة)، ولا يمكن لتغيير القيمة المخزّنة في الوسيط أن يغيّر القيمة المخزّنة في وسيطته.</p>
<p>وفي نمط التمرير بالمؤشّر، لا يزال الوسيط يحصل على قيمة وسيطته، لكن <em>قيمة عنوان</em> هي التي تُمرَّر. وكما في تمرير الأنواع الأساسية، لن يؤدي تغيير قيمة وسيط المؤشّر إلى تغيير قيمة وسيطته (أي أن إسناد الوسيط ليشير إلى عنوان مختلف لن يغيّر قيمة عنوان وسيطته). غير أن الدالة، بإلغاء الإشارة إلى وسيط المؤشّر، تستطيع تغيير محتوى الذاكرة الذي يشير إليه الوسيط ووسيطته معاً؛ فمن خلال وسيط مؤشّر، تستطيع الدالة تعديل متغيّر مرئي للمستدعي بعد عودة الدالة.</p>
</blockquote>
<p>وفيما يلي خطوات تنفيذ دالة ذات وسيط تمرير بالمؤشّر واستدعائها، مع مقتطفات شيفرة مثالية توضح كل خطوة:</p>
<p>أعلن عن وسيط الدالة كمؤشّر إلى نوع المتغيّر:</p>
<pre><code class="language-c"><span class="hljs-comment">/* input: an int pointer that stores the address of a memory
 *        location that can store an int value (it points to an int)
 */</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">change_value</span><span class="hljs-params">(<span class="hljs-type">int</span> *input)</span> {
</code></pre>
<p>عند استدعاء الدالة، مرّر عنوان متغيّر كوسيط:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x;
change_value(&amp;x);
</code></pre>
<p>في المثال السابق، بما أن نوع الوسيط هو <code>int *</code>، يجب أن يكون العنوان الممرَّر عنوان متغيّر <code>int</code>.</p>
<p>وفي جسم الدالة، ألغِ الإشارة إلى وسيط المؤشّر لتغيير قيمة الوسيطة:</p>
<pre><code class="language-c">*input = <span class="hljs-number">100</span>;  <span class="hljs-comment">// the location input points to (x&#x27;s memory) is assigned 100</span>
</code></pre>
<p>بعد ذلك، لنفحص <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/passbypointer.c">برنامجاً مثالياً أكبر</a>:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">change_value</span><span class="hljs-params">(<span class="hljs-type">int</span> *input)</span>;

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> x;
    <span class="hljs-type">int</span> y;

    x = <span class="hljs-number">30</span>;
    y = change_value(&amp;x);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;x: %d y: %d\\n&quot;</span>, x, y);  <span class="hljs-comment">// prints x: 100 y: 30</span>

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}

<span class="hljs-comment">/*
 * changes the value of the argument
 *     input: a pointer to the value to change
 *     returns: the original value of the argument
 */</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">change_value</span><span class="hljs-params">(<span class="hljs-type">int</span> *input)</span> {
    <span class="hljs-type">int</span> val;

    val = *input; <span class="hljs-comment">/* val gets the value input points to */</span>

    <span class="hljs-keyword">if</span> (val &lt; <span class="hljs-number">100</span>) {
        *input = <span class="hljs-number">100</span>;  <span class="hljs-comment">/* the value input points to gets 100 */</span>
    } <span class="hljs-keyword">else</span> {
        *input =  val * <span class="hljs-number">2</span>;
    }

    <span class="hljs-keyword">return</span> val;
}
</code></pre>
<p>وعند التشغيل يكون الناتج:</p>
<pre><code>x: 100 y: 30
</code></pre>
<p>يعرض <a href="#FigPassPointer">الشكل 1</a> كيف يبدو مكدّس الاستدعاء قبل تنفيذ الإرجاع في <code>change_value</code>.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-passbypointer.webp" alt="The input parameter to change_value stores the address of main’s 'x' variable."> الشكل 1. لقطة لمكدّس الاستدعاء قبل العودة من change_value.</p>
<p>يحصل وسيط الإدخال على نسخة من قيمة وسيطته (عنوان <code>x</code>). وقيمة <code>x</code> هي 30 عند إجراء استدعاء الدالة. وداخل الدالة <code>change_value</code>، يُلغى الإشارة إلى الوسيط لإسناد القيمة 100 إلى موقع الذاكرة الذي يشير إليه الوسيط (<code>*input = 100;</code>، أي «الموقع الذي يشير إليه <code>input</code> يحصل على القيمة 100»). ولأن الوسيط يخزّن عنوان متغيّر محلي في إطار مكدّس الدالة <code>main</code>، يمكن تغيير القيمة المخزّنة في المتغيّر المحلي للمستدعي من خلال إلغاء الإشارة إلى الوسيط. وعند عودة الدالة، تعكس قيمة الوسيطة التغيير الذي أُجري عليها عبر وسيط المؤشّر (تغيّرت قيمة <code>x</code> في <code>main</code> إلى 100 بفعل الدالة <code>change_value</code> عبر وسيطها <code>input</code>).</p>
<p>وبالإضافة إلى وسائط التمرير بالمؤشّر، تستخدم البرامج عادةً متغيّرات المؤشّرات لتخصيص الذاكرة ديناميكياً. ويتيح <strong>التخصيص الديناميكي للذاكرة</strong> لبرنامج C طلب مزيد من الذاكرة أثناء تشغيله، ويخزّن متغيّر مؤشّر عنوان المساحة المخصَّصة ديناميكياً. وكثيراً ما تخصّص البرامج الذاكرة ديناميكياً لملاءمة حجم مصفوفة لتشغيل معيّن.</p>
<p>يمنح التخصيص الديناميكي للذاكرة مرونة للبرامج التي:</p>
<ul>
<li>لا تعرف حجم المصفوفات أو بنى البيانات الأخرى حتى وقت التشغيل (مثلاً، يعتمد الحجم على إدخال المستخدم)</li>
<li>تحتاج إلى إتاحة مجموعة متنوعة من أحجام الإدخال (لا مجرد حجم حتى سعة ثابتة)</li>
<li>تريد تخصيص الحجم اللازم بالضبط لبنى البيانات في تنفيذ بعينه (دون إهدار السعة)</li>
<li>تنمو أو تتقلص أحجام الذاكرة المخصَّصة مع تشغيل البرنامج، فتخصّص مساحة أكبر عند الحاجة وتحرّر المساحة عندما لا تعود مطلوبة.</li>
</ul>
<h3 id="241-ذاكرة-الكومة"><a href="#_heap_memory"></a>2.4.1. ذاكرة الكومة</h3>
<p>لكل بايت من الذاكرة في فضاء ذاكرة البرنامج عنوان مرتبط به. وكل ما يحتاجه البرنامج ليعمل موجود في فضاء ذاكرته، وتقيم أنواع مختلفة من الكيانات في أجزاء مختلفة من فضاء ذاكرة البرنامج. فمثلاً، تحتوي منطقة <em>الشيفرة</em> على تعليمات البرنامج، وتقيم المتغيّرات العامة في منطقة <em>البيانات</em>، وتشغل المتغيّرات المحلية والوسائط <em>المكدّس</em>، وتأتي الذاكرة المخصَّصة ديناميكياً من <em>الكومة</em>. ولأن المكدّس والكومة ينموان وقت التشغيل (مع استدعاء الدوال وعودتها ومع تخصيص الذاكرة الديناميكية وتحريرها)، فإنهما يكونان عادةً متباعدين في فضاء عناوين البرنامج لإتاحة مقدار كبير من المساحة لكل منهما لينمو فيه مع تشغيل البرنامج.</p>
<p>تشغل الذاكرة المخصَّصة ديناميكياً <a href="https://diveintosystems.org/book/C2-C_depth/scope_memory.html#_memoryparts">منطقة ذاكرة <strong>الكومة</strong></a> من فضاء عناوين البرنامج. وعندما يطلب برنامج ذاكرة ديناميكياً وقت التشغيل، توفّر الكومة قطعة ذاكرة يجب إسناد عنوانها إلى متغيّر مؤشّر.</p>
<p>يوضّح <a href="#FigProgramMemory">الشكل 1</a> أجزاء ذاكرة برنامج قيد التشغيل مع مثال على متغيّر مؤشّر (<code>ptr</code>) على المكدّس يخزّن عنوان ذاكرة كومة مخصَّصة ديناميكياً (أي يشير إلى ذاكرة الكومة).</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-program_memory.webp" alt="The parts of program memory showing a stack variable pointing to dynamically allocated heap memory."> الشكل 1. مؤشّر على المكدّس يشير إلى كتلة ذاكرة خُصِّصت من الكومة.</p>
<p>من المهم تذكّر أن ذاكرة الكومة ذاكرة مجهولة، حيث تعني «مجهولة» أن العناوين في الكومة ليست مرتبطة بأسماء متغيّرات. فالإعلان عن متغيّر برنامج مسمّى يخصّصه على المكدّس أو في جزء البيانات من ذاكرة البرنامج. ويمكن لمتغيّر مؤشّر محلي أو عام تخزين عنوان موقع ذاكرة كومة مجهول (مثلاً، يمكن لمتغيّر مؤشّر محلي على المكدّس أن يشير إلى ذاكرة الكومة)، ويمكّن إلغاء الإشارة إلى مؤشّر كهذا البرنامج من تخزين بيانات في الكومة.</p>
<h3 id="242-malloc-وfree"><a href="#_malloc_and_free"></a>2.4.2. malloc وfree</h3>
<p><strong>malloc</strong> و<strong>free</strong> دالتان في مكتبة C القياسية (<code>stdlib</code>) يمكن للبرنامج استدعاؤهما لتخصيص الذاكرة في <strong>الكومة</strong> وتحريرها. ويجب على برنامج C تخصيص ذاكرة الكومة صراحةً (بـ malloc) وتحريرها (بـ free).</p>
<p>لتخصيص ذاكرة كومة، استدعِ <code>malloc</code> ومرّر العدد الكلي لبايتات ذاكرة الكومة المتجاورة المطلوب تخصيصها. واستخدم <strong>معامل <code>sizeof</code></strong> لحساب عدد البايتات المطلوب طلبه. فمثلاً، لتخصيص مساحة على الكومة لتخزين عدد صحيح واحد، يمكن للبرنامج استدعاء:</p>
<pre><code class="language-c"><span class="hljs-comment">// Determine the size of an integer and allocate that much heap space.</span>
<span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>));
</code></pre>
<p>تُرجع الدالة <code>malloc</code> عنوان أساس ذاكرة الكومة المخصَّصة إلى المستدعي (أو <code>NULL</code> إذا حدث خطأ). وفيما يلي برنامج مثال كامل يتضمن استدعاءً لـ <code>malloc</code> لتخصيص مساحة كومة لتخزين قيمة <code>int</code> واحدة:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> *p;

    p = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>));  <span class="hljs-comment">// allocate heap memory for storing an int</span>

    <span class="hljs-keyword">if</span> (p != <span class="hljs-literal">NULL</span>) {
        *p = <span class="hljs-number">6</span>;   <span class="hljs-comment">// the heap memory p points to gets the value 6</span>
    }
}
</code></pre>
<p>تُرجع الدالة <code>malloc</code> نوعاً هو <code>void *</code>، ويمثّل مؤشّراً عاماً إلى نوع غير محدد (أو إلى أي نوع). وعندما يستدعي برنامج <code>malloc</code> ويسند الناتج إلى متغيّر مؤشّر، يربط البرنامج الذاكرة المخصَّصة بنوع متغيّر المؤشّر.</p>
<p>قد ترى أحياناً استدعاءات لـ <code>malloc</code> تعيد صراحةً تحويل نوعها المرجَع من <code>void *</code> ليطابق نوع متغيّر المؤشّر. فمثلاً:</p>
<pre><code class="language-c">p = (<span class="hljs-type">int</span> *) <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>));
</code></pre>
<p>تخبر <code>(int *)</code> قبل <code>malloc</code> المصرّفَ بأن نوع <code>void *</code> الذي ترجعه <code>malloc</code> سيُستخدم كـ <code>int *</code> في هذا الاستدعاء (أي تعيد تحويل نوع إرجاع <code>malloc</code> إلى <code>int *</code>). ونناقش <a href="https://diveintosystems.org/book/C2-C_depth/advanced_voidstar.html#_c_voidstar_recasting_">إعادة تحويل الأنواع ونوع <code>void *</code></a> بمزيد من التفصيل لاحقاً في هذا الفصل.</p>
<p>يفشل الاستدعاء <code>malloc</code> إذا لم توجد ذاكرة كومة حرة كافية لتلبية عدد البايتات المطلوب تخصيصها. وعادةً ما يشير فشل <code>malloc</code> إلى خطأ في البرنامج مثل تمرير طلب كبير جداً إلى <code>malloc</code>، أو تمرير عدد بايتات سالب، أو استدعاء <code>malloc</code> في حلقة لا نهائية ونفاد ذاكرة الكومة. ولأن أي استدعاء لـ <code>malloc</code> قد يفشل، ينبغي أن <em>تختبر دائماً قيمته المرجَعة بحثاً عن NULL</em> (ما يشير إلى فشل <code>malloc</code>) قبل إلغاء الإشارة إلى قيمة المؤشّر. فإلغاء الإشارة إلى مؤشّر NULL سيجعل برنامجك ينهار! فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> *p;

p = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>));
<span class="hljs-keyword">if</span> (p == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Bad malloc error\\n&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);   <span class="hljs-comment">// exit the program and indicate error</span>
}
*p = <span class="hljs-number">6</span>;
</code></pre>
<p>عندما لا يعود البرنامج بحاجة إلى ذاكرة الكومة التي خصّصها ديناميكياً بـ <code>malloc</code> ينبغي أن يحرّر الذاكرة صراحةً باستدعاء الدالة <code>free</code>. ومن الأفضل أيضاً ضبط قيمة المؤشّر على <code>NULL</code> بعد استدعاء <code>free</code>، حتى إذا تسبب خطأ في البرنامج في إلغاء الإشارة إليه عن غير قصد بعد استدعاء <code>free</code>، ينهار البرنامج بدلاً من تعديل أجزاء من ذاكرة الكومة أعادت استدعاءات لاحقة لـ <code>malloc</code> تخصيصها. وقد تؤدي مراجع الذاكرة غير المقصودة هذه إلى سلوك غير معرّف للبرنامج يصعب تنقيحه جداً في الغالب، بينما يفشل إلغاء الإشارة إلى مؤشّر فارغ فوراً، ما يجعله خطأً سهل الاكتشاف والإصلاح نسبياً.</p>
<pre><code class="language-c"><span class="hljs-built_in">free</span>(p);
p = <span class="hljs-literal">NULL</span>;
</code></pre>
<h3 id="243-المصفوفات-والسلاسل-النصية-المخصصة-ديناميكيا"><a href="#_dynamically_allocated_arrays_and_strings"></a>2.4.3. المصفوفات والسلاسل النصية المخصَّصة ديناميكياً</h3>
<p>كثيراً ما يخصّص مبرمجو C الذاكرة ديناميكياً لتخزين المصفوفات. ويخصّص الاستدعاء الناجح لـ <code>malloc</code> قطعة واحدة متجاورة من ذاكرة الكومة بالحجم المطلوب. ويرجع عنوان بداية قطعة الذاكرة هذه إلى المستدعي، ما يجعل قيمة العنوان المرجَعة مناسبة كعنوان أساس لمصفوفة مخصَّصة ديناميكياً في ذاكرة الكومة.</p>
<p>لتخصيص مساحة ديناميكياً لمصفوفة من العناصر، مرّر إلى <code>malloc</code> العدد الكلي للبايتات في المصفوفة المطلوبة. أي ينبغي للبرنامج أن يطلب من <code>malloc</code> العدد الكلي للبايتات في كل عنصر مصفوفة مضروباً في عدد عناصر المصفوفة. ومرّر إلى <code>malloc</code> تعبيراً عن العدد الكلي للبايتات بالصيغة <code>sizeof() * </code>. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> *arr;
<span class="hljs-type">char</span> *c_arr;

<span class="hljs-comment">// allocate an array of 20 ints on the heap:</span>
arr = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * <span class="hljs-number">20</span>);

<span class="hljs-comment">// allocate an array of 10 chars on the heap:</span>
c_arr = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>) * <span class="hljs-number">10</span>);
</code></pre>
<p>بعد الاستدعاءين <code>malloc</code> في هذا المثال، يخزّن متغيّر المؤشّر <code>int</code> <code>arr</code> عنوان أساس مصفوفة من 20 موقع تخزين صحيح متجاورة في ذاكرة الكومة، ويخزّن متغيّر مؤشّر المحارف <code>c_arr</code> عنوان أساس مصفوفة من 10 مواقع تخزين محارف متجاورة في ذاكرة الكومة. ويصوّر <a href="#FigHeapArray">الشكل 2</a> كيف قد يبدو ذلك.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-1-heaparray.webp" alt="Main’s stack holds two pointer variables. The first, arr, contains the address of a block of memory on the heap with enough space for 20 integers. The second, c_arr, contains the address of a different block of memory on the heap with enough space for 10 characters."> الشكل 2. مصفوفة صحيحة من 20 عنصراً ومصفوفة محارف من 10 عناصر مخصَّصتان على الكومة.</p>
<p>لاحظ أنه رغم أن <code>malloc</code> ترجع مؤشّراً إلى مساحة مخصَّصة ديناميكياً في ذاكرة الكومة، فإن برامج C تخزّن المؤشّر إلى مواقع الكومة على المكدّس. وتحتوي متغيّرات المؤشّرات على <em>عنوان الأساس فقط</em> (عنوان البداية) لمساحة تخزين المصفوفة في الكومة. وكما في المصفوفات المعلَنة ساكنةً، تكون مواقع الذاكرة للمصفوفات المخصَّصة ديناميكياً في مواقع ذاكرة متجاورة. ورغم أن استدعاءً واحداً لـ <code>malloc</code> يؤدي إلى تخصيص قطعة ذاكرة بعدد البايتات المطلوب، فإن استدعاءات متعددة لـ <code>malloc</code> <em>لن</em> تؤدي إلى عناوين كومة متجاورة (على معظم الأنظمة). وفي المثال أعلاه، قد تكون عناصر مصفوفة <code>char</code> وعناصر مصفوفة <code>int</code> عند عناوين متباعدة في الكومة.</p>
<p>بعد تخصيص مساحة الكومة ديناميكياً لمصفوفة، يمكن للبرنامج الوصول إلى المصفوفة عبر متغيّر المؤشّر. ولأن قيمة متغيّر المؤشّر تمثّل عنوان أساس المصفوفة في الكومة، يمكننا استخدام الصياغة نفسها للوصول إلى عناصر المصفوفات المخصَّصة ديناميكياً كما نستخدمها للوصول إلى عناصر <a href="https://diveintosystems.org/book/C1-C_intro/arrays_strings.html#_arrays_and_strings">المصفوفات المعلَنة ساكنةً</a>. وفيما يلي مثال:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> i;
<span class="hljs-type">int</span> s_array[<span class="hljs-number">20</span>];
<span class="hljs-type">int</span> *d_array;

d_array = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * <span class="hljs-number">20</span>);
<span class="hljs-keyword">if</span> (d_array == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: malloc failed\\n&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
}

<span class="hljs-keyword">for</span> (i=<span class="hljs-number">0</span>; i &lt; <span class="hljs-number">20</span>; i++) {
    s_array[i] = i;
    d_array[i] = i;
}

<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%d %d \\n&quot;</span>, s_array[<span class="hljs-number">3</span>], d_array[<span class="hljs-number">3</span>]);  <span class="hljs-comment">// prints 3 3</span>
</code></pre>
<p>قد لا يكون واضحاً سبب إمكانية استخدام الصياغة نفسها للوصول إلى عناصر المصفوفات المخصَّصة ديناميكياً كما تُستخدم للوصول إلى عناصر المصفوفات المعلَنة ساكنةً. غير أنه رغم اختلاف نوعيهما، تُقيَّم قيمتا <code>s_array</code> و<code>d_array</code> كلتاهما إلى عنوان أساس المصفوفة في الذاكرة.</p>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>القيمة</th>
<th>النوع</th>
</tr>
</thead>
<tbody>
<tr>
<td>s_array</td>
<td>عنوان أساس المصفوفة في الذاكرة</td>
<td>مصفوفة (ساكنة) من int</td>
</tr>
<tr>
<td>d_array</td>
<td>عنوان أساس المصفوفة في الذاكرة</td>
<td>مؤشّر int (int *)</td>
</tr>
</tbody>
</table>
<p>ولأن اسمي المتغيّرين يُقيَّمان إلى عنوان أساس المصفوفة في الذاكرة (عنوان ذاكرة العنصر الأول)، تبقى دلالات صياغة <code>[i]</code> بعد اسم المتغيّر نفسها لكليهما: فـ <code>[i]</code> <em>تلغي الإشارة إلى موقع تخزين العدد الصحيح عند الإزاحة i من عنوان أساس المصفوفة في الذاكرة</em> — أي أنها تصل إلى العنصر رقم <em>i</em>.
في معظم الأغراض، نوصي باستخدام صياغة <code>[i]</code> للوصول إلى عناصر مصفوفة مخصَّصة ديناميكياً. غير أن البرامج يمكنها أيضاً استخدام صياغة إلغاء الإشارة إلى المؤشّر (المعامل <code>*</code>) للوصول إلى عناصر المصفوفة. فمثلاً، وضع <code>*</code> قبل مؤشّر يشير إلى مصفوفة مخصَّصة ديناميكياً سيُلغي الإشارة إلى المؤشّر للوصول إلى العنصر 0 في المصفوفة:</p>
<pre><code class="language-c"><span class="hljs-comment">/* these two statements are identical: both put 8 in index 0 */</span>
d_array[<span class="hljs-number">0</span>] = <span class="hljs-number">8</span>; <span class="hljs-comment">// put 8 in index 0 of the d_array</span>
*d_array = <span class="hljs-number">8</span>;   <span class="hljs-comment">// in the location pointed to by d_array store 8</span>
</code></pre>
<p>يصف <a href="https://diveintosystems.org/book/C2-C_depth/arrays.html#_arrays_in_c">قسم المصفوفات</a> المصفوفات بمزيد من التفصيل، ويناقش <a href="https://diveintosystems.org/book/C2-C_depth/advanced_pointer_arithmetic.html#_c_ptr_arith_">قسم حساب المؤشّرات</a> الوصول إلى عناصر المصفوفة عبر متغيّرات المؤشّرات.</p>
<p>عندما ينتهي البرنامج من استخدام مصفوفة مخصَّصة ديناميكياً، ينبغي أن يستدعي <code>free</code> لتحرير مساحة الكومة. وكما ذكرنا سابقاً، نوصي بضبط المؤشّر على <code>NULL</code> بعد تحريره:</p>
<pre><code class="language-c"><span class="hljs-built_in">free</span>(arr);
arr = <span class="hljs-literal">NULL</span>;

<span class="hljs-built_in">free</span>(c_arr);
c_arr = <span class="hljs-literal">NULL</span>;

<span class="hljs-built_in">free</span>(d_array);
d_array = <span class="hljs-literal">NULL</span>;
</code></pre>
<p>إدارة ذاكرة الكومة، malloc وfree</p>
<p>تنفّذ مكتبة C القياسية الدالتين <code>malloc</code> و<code>free</code>، اللتين تمثّلان الواجهة البرمجية لمدير ذاكرة الكومة فيها. وعند استدعائها، تحتاج <code>malloc</code> إلى إيجاد قطعة متجاورة من مساحة ذاكرة الكومة غير المخصَّصة يمكنها تلبية حجم الطلب. ويحتفظ مدير ذاكرة الكومة بـ <strong>قائمة حرة</strong> (free list) من <strong>امتدادات</strong> (extents) ذاكرة الكومة غير المخصَّصة، حيث يحدد كل امتداد عنوان البداية وحجم قطعة متجاورة غير مخصَّصة من مساحة الكومة.</p>
<p>تكون ذاكرة الكومة كلها في البداية فارغة، أي أن القائمة الحرة تحتوي على امتداد واحد يتألف من منطقة الكومة بأكملها. وبعد أن يُجري البرنامج بعض الاستدعاءات لـ <code>malloc</code> و<code>free</code> قد تصبح ذاكرة الكومة <strong>مفتّتة</strong> (fragmented)، أي توجد قطع من مساحة كومة حرة متخللة بين قطع من مساحة كومة مخصَّصة. ويحتفظ مدير ذاكرة الكومة عادةً بقوائم لمجالات مختلفة من أحجام مساحة الكومة لتمكين البحث السريع عن امتداد حر بحجم معيّن. وبالإضافة إلى ذلك، ينفّذ سياسة أو أكثر للاختيار من بين امتدادات حرة متعددة يمكن استخدامها لتلبية طلب.</p>
<p>قد تبدو الدالة <code>free</code> غريبة لأنها لا تتوقع استلام إلا عنوان مساحة الكومة المطلوب تحريرها دون الحاجة إلى حجم مساحة الكومة المطلوب تحريرها عند ذلك العنوان. والسبب أن <code>malloc</code> لا تخصّص بايتات الذاكرة المطلوبة فحسب، بل تخصّص أيضاً بضع بايتات إضافية قبل القطعة المخصَّصة لتخزين بنية ترويسة (header). وتخزّن الترويسة بيانات وصفية عن قطعة مساحة الكومة المخصَّصة، مثل الحجم. ونتيجةً لذلك، لا يحتاج استدعاء <code>free</code> إلى تمرير إلا عنوان ذاكرة الكومة المطلوب تحريرها. ويستطيع تنفيذ <code>free</code> الحصول على حجم الذاكرة المطلوب تحريرها من معلومات الترويسة الموجودة في الذاكرة قبل العنوان الممرَّر إلى <code>free</code> مباشرة.</p>
<p>لمزيد من المعلومات عن إدارة ذاكرة الكومة، انظر كتاباً عن أنظمة التشغيل (فمثلاً، الفصل 17 «إدارة المساحة الحرة» في <a href="http://pages.cs.wisc.edu/~remzi/OSTEP/#book-chapters">OS in Three Easy Pieces</a> يغطي هذه التفاصيل).</p>
<h3 id="244-المؤشرات-إلى-ذاكرة-الكومة-والدوال"><a href="#_pointers_to_heap_memory_and_functions"></a>2.4.4. المؤشّرات إلى ذاكرة الكومة والدوال</h3>
<p>عند تمرير مصفوفة مخصَّصة ديناميكياً إلى دالة، تُمرَّر <em>قيمة</em> وسيطة متغيّر المؤشّر إلى الدالة (أي يُمرَّر عنوان أساس المصفوفة في الكومة إلى الدالة). وهكذا، عند تمرير مصفوفات معلَنة ساكنةً أو مخصَّصة ديناميكياً إلى الدوال، يحصل الوسيط على القيمة نفسها بالضبط — عنوان أساس المصفوفة في الذاكرة. ونتيجةً لذلك، يمكن استخدام الدالة نفسها للمصفوفات المعلَنة ساكنةً والمخصَّصة ديناميكياً من النوع نفسه، ويمكن استخدام الصياغة نفسها داخل الدالة للوصول إلى عناصر المصفوفة. وتعريفتا الوسيط <code>int *arr</code> و<code>int arr[]</code> متكافئتان. غير أنه بالاصطلاح، تُستخدم صياغة المؤشّر عادةً للدوال التي قد تُستدعى بمصفوفات مخصَّصة ديناميكياً:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> *arr1;

    arr1 = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * <span class="hljs-number">10</span>);
    <span class="hljs-keyword">if</span> (arr1 == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;malloc error\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }

    <span class="hljs-comment">/* pass the value of arr1 (base address of array in heap) */</span>
    init_array(arr1, <span class="hljs-number">10</span>);
    ...
}

<span class="hljs-type">void</span> <span class="hljs-title function_">init_array</span><span class="hljs-params">(<span class="hljs-type">int</span> *arr, <span class="hljs-type">int</span> size)</span> {
    <span class="hljs-type">int</span> i;
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; size; i++) {
        arr[i] = i;
    }
}
</code></pre>
<p>عند النقطة قبل العودة من الدالة <code>init_array</code> مباشرة، سيبدو محتوى الذاكرة كما في <a href="#FigHeapArrayParam">الشكل 3</a>. لاحظ أنه عندما يمرّر <code>main</code> <code>arr1</code> إلى <code>init_array</code> فإنه يمرّر عنوان أساس المصفوفة فقط. وتبقى الكتلة الكبيرة المتجاورة لذاكرة المصفوفة على الكومة، ويمكن للدالة الوصول إليها بإلغاء الإشارة إلى وسيط المؤشّر <code>arr</code>. كما يمرّر حجم المصفوفة حتى تعرف <code>init_array</code> عدد العناصر المطلوب الوصول إليها.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-2-heaparrayparam.webp" alt="Main’s arr1 and init_array’s arr variable both store the same base address of a block of heap memory."> الشكل 3. محتويات الذاكرة قبل العودة من init_array. يشير كل من arr1 في main والمتغيّر arr في init_array إلى كتلة ذاكرة الكومة نفسها.</p>
<p>قدّمنا في <a href="https://diveintosystems.org/book/C1-C_intro/arrays_strings.html#_introduction_to_arrays">الفصل السابق</a> المصفوفات أحادية البعد المعلَنة ساكنةً في C وناقشنا دلالات تمرير المصفوفات إلى الدوال. وفي <a href="https://diveintosystems.org/book/C2-C_depth/pointers.html#_dynamic_memory_allocation">قسم التخصيص الديناميكي للذاكرة</a> في هذا الفصل، قدّمنا المصفوفات أحادية البعد المخصَّصة ديناميكياً وناقشنا دلالات تمريرها إلى الدوال.</p>
<p>نأخذ في هذا القسم نظرة أعمق على المصفوفات في C. فنصف المصفوفات المعلَنة ساكنةً والمخصَّصة ديناميكياً بمزيد من التفصيل، ونناقش المصفوفات ثنائية الأبعاد.</p>
<h3 id="251-المصفوفات-أحادية-البعد"><a href="#_single_dimensional_arrays"></a>2.5.1. المصفوفات أحادية البعد</h3>
<h4><a href="#_statically_allocated"></a>المخصَّصة ساكنةً</h4>
<p>قبل الخوض في محتوى جديد، نلخّص المصفوفات الساكنة بإيجاز مع مثال. انظر <a href="https://diveintosystems.org/book/C1-C_intro/arrays_strings.html#_introduction_to_arrays">الفصل السابق</a> لمزيد من التفصيل عن المصفوفات أحادية البعد المعلَنة ساكنةً.</p>
<p>تُخصَّص المصفوفات المعلَنة ساكنةً إما على المكدّس (للمتغيّرات المحلية) أو في منطقة البيانات من الذاكرة (للمتغيّرات العامة). ويستطيع المبرمج الإعلان عن متغيّر مصفوفة بتحديد نوعه (النوع المخزّن عند كل فهرس) وسعته الكلية (عدد العناصر).</p>
<p>عند تمرير مصفوفة إلى دالة، تنسخ C قيمة عنوان الأساس إلى الوسيط. أي أن الوسيط والوسيطة يشيران إلى مواقع الذاكرة نفسها — فمؤشّر الوسيط يشير إلى عناصر مصفوفة الوسيطة في الذاكرة. ونتيجةً لذلك، يؤدي تعديل القيم المخزّنة في المصفوفة عبر وسيط مصفوفة إلى تعديل القيم المخزّنة في مصفوفة الوسيطة.</p>
<p>وفيما يلي بعض الأمثلة على إعلان المصفوفات الساكنة واستخدامها:</p>
<pre><code class="language-c"><span class="hljs-comment">// declare arrays specifying their type and total capacity</span>
<span class="hljs-type">float</span> averages[<span class="hljs-number">30</span>];   <span class="hljs-comment">// array of float, 30 elements</span>
<span class="hljs-type">char</span>  name[<span class="hljs-number">20</span>];       <span class="hljs-comment">// array of char, 20 elements</span>
<span class="hljs-type">int</span> i;

<span class="hljs-comment">// access array elements</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    averages[i] = <span class="hljs-number">0.0</span> + i;
    name[i] = <span class="hljs-string">&#x27;a&#x27;</span> + i;
}
name[<span class="hljs-number">10</span>] = <span class="hljs-string">&#x27;\\0&#x27;</span>;    <span class="hljs-comment">// name is being used for storing a C-style string</span>

<span class="hljs-comment">// prints: 3 d abcdefghij</span>
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%g %c %s\\n&quot;</span>, averages[<span class="hljs-number">3</span>], name[<span class="hljs-number">3</span>], name);

<span class="hljs-built_in">strcpy</span>(name, <span class="hljs-string">&quot;Hello&quot;</span>);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, name);  <span class="hljs-comment">// prints: Hello</span>
</code></pre>
<h4><a href="#_dynamically_allocated"></a>المخصَّصة ديناميكياً</h4>
<p>قدّمنا في <a href="https://diveintosystems.org/book/C2-C_depth/pointers.html#_dynamic_memory_allocation">قسم التخصيص الديناميكي للذاكرة</a> في هذا الفصل المصفوفات أحادية البعد المخصَّصة ديناميكياً، بما في ذلك صياغة الوصول إليها وصياغة ودلالات تمرير المصفوفات المخصَّصة ديناميكياً إلى الدوال. ونعرض هنا تذكيراً موجزاً بتلك المعلومات مع مثال.</p>
<p>يخصّص استدعاء الدالة <code>malloc</code> مصفوفة على الكومة ديناميكياً وقت التشغيل. ويمكن إسناد عنوان مساحة الكومة المخصَّصة إلى متغيّر مؤشّر عام أو محلي، فيشير حينها إلى العنصر الأول في المصفوفة. ولتخصيص المساحة ديناميكياً، مرّر إلى <code>malloc</code> العدد الكلي للبايتات المطلوب تخصيصها للمصفوفة (باستخدام المعامل <code>sizeof</code> للحصول على حجم نوع معيّن). ويخصّص الاستدعاء الواحد لـ <code>malloc</code> قطعة متجاورة من مساحة الكومة بالحجم المطلوب. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-comment">// declare a pointer variable to point to allocated heap space</span>
<span class="hljs-type">int</span>    *p_array;
<span class="hljs-type">double</span> *d_array;

<span class="hljs-comment">// call malloc to allocate the appropriate number of bytes for the array</span>

p_array = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * <span class="hljs-number">50</span>);      <span class="hljs-comment">// allocate 50 ints</span>
d_array = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">double</span>) * <span class="hljs-number">100</span>);  <span class="hljs-comment">// allocate 100 doubles</span>

<span class="hljs-comment">// always CHECK RETURN VALUE of functions and HANDLE ERROR return values</span>
<span class="hljs-keyword">if</span> ( (p_array == <span class="hljs-literal">NULL</span>) || (d_array == <span class="hljs-literal">NULL</span>) ) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;ERROR: malloc failed!\\n&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
}

<span class="hljs-comment">// use [] notation to access array elements</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">50</span>; i++) {
    p_array[i] = <span class="hljs-number">0</span>;
    d_array[i] = <span class="hljs-number">0.0</span>;
}

<span class="hljs-comment">// free heap space when done using it</span>
<span class="hljs-built_in">free</span>(p_array);
p_array = <span class="hljs-literal">NULL</span>;

<span class="hljs-built_in">free</span>(d_array);
d_array = <span class="hljs-literal">NULL</span>;
</code></pre>
<h4><a href="#_array_memory_layout"></a>تخطيط ذاكرة المصفوفة</h4>
<p>سواء أُعلنت المصفوفة ساكنةً أم خُصِّصت ديناميكياً باستدعاء واحد لـ <code>malloc</code>، فإن عناصر المصفوفة تمثّل مواقع ذاكرة متجاورة (عناوين):</p>
<pre><code> array [0]:  base address
 array [1]:  next address
 array [2]:  next address
   ...            ...
 array [99]: last address
</code></pre>
<p>يقع موقع العنصر <code>i</code> عند إزاحة <code>i</code> من عنوان أساس المصفوفة. ويعتمد العنوان الدقيق للعنصر رقم i على عدد بايتات النوع المخزّن في المصفوفة. فمثلاً، تأمّل إعلانات المصفوفات التالية:</p>
<pre><code class="language-c"><span class="hljs-type">int</span>  iarray[<span class="hljs-number">6</span>];  <span class="hljs-comment">// an array of six ints, each of which is four bytes</span>
<span class="hljs-type">char</span> carray[<span class="hljs-number">4</span>];  <span class="hljs-comment">// an array of four chars, each of which is one byte</span>
</code></pre>
<p>قد تبدو عناوين عناصر كل مصفوفة شيئاً كهذا:</p>
<pre><code> addr   element
 ----   -------
 1230:  iarray[0]
 1234:  iarray[1]
 1238:  iarray[2]
 1242:  iarray[3]
 1246:  iarray[4]
 1250:  iarray[5]
     ...
 1280:  carray[0]
 1281:  carray[1]
 1282:  carray[2]
 1283:  carray[3]
</code></pre>
<p>في هذا المثال، <code>1230</code> هو عنوان أساس <code>iarray</code>، و<code>1280</code> عنوان أساس <code>carray</code>. لاحظ أن العناصر الفردية لكل مصفوفة تُخصَّص على عناوين ذاكرة متجاورة: فكل عنصر في <code>iarray</code> يخزّن قيمة <code>int</code> من 4 بايتات، لذا تختلف عناوين عناصره بمقدار 4، وكل عنصر في <code>carray</code> يخزّن قيمة <code>char</code> من بايت واحد، لذا تختلف عناوينه بمقدار 1. ولا يوجد ضمان بأن تُخصَّص مجموعة المتغيّرات المحلية على مواقع ذاكرة متجاورة على المكدّس (لذا قد توجد فجوة في العناوين بين نهاية <code>iarray</code> وبداية <code>carray</code>، كما هو موضح في هذا المثال.)</p>
<h3 id="252-المصفوفات-ثنائية-الأبعاد"><a href="#_two_dimensional_arrays"></a>2.5.2. المصفوفات ثنائية الأبعاد</h3>
<p>تدعم C المصفوفات متعددة الأبعاد، لكننا نحصر مناقشتنا للمصفوفات متعددة الأبعاد في المصفوفات ثنائية الأبعاد (2D)، لأن المصفوفات أحادية البعد وثنائية الأبعاد هي الأكثر استخداماً لدى مبرمجي C.</p>
<h4><a href="#_statically_allocated_2d_arrays"></a>المصفوفات ثنائية الأبعاد المعلَنة ساكنةً</h4>
<p>للإعلان الساكن عن متغيّر مصفوفة متعددة الأبعاد، حدد حجم كل بُعد. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-type">int</span>   matrix[<span class="hljs-number">50</span>][<span class="hljs-number">100</span>];
<span class="hljs-type">short</span> little[<span class="hljs-number">10</span>][<span class="hljs-number">10</span>];
</code></pre>
<p>هنا <code>matrix</code> مصفوفة ثنائية الأبعاد من قيم <code>int</code> بـ 50 صفاً و100 عمود، و<code>little</code> مصفوفة ثنائية الأبعاد من قيم <code>short</code> بـ 10 صفوف و10 أعمدة.</p>
<p>للوصول إلى عنصر فردي، حدد كلاً من فهرس الصف وفهرس العمود:</p>
<pre><code class="language-c"><span class="hljs-type">int</span>   val;
<span class="hljs-type">short</span> num;

val = matrix[<span class="hljs-number">3</span>][<span class="hljs-number">7</span>];  <span class="hljs-comment">// get int value in row 3, column 7 of matrix</span>
num = little[<span class="hljs-number">8</span>][<span class="hljs-number">4</span>];  <span class="hljs-comment">// get short value in row 8, column 4 of little</span>
</code></pre>
<p>يوضّح <a href="#FigAccessingMatrix">الشكل 1</a> المصفوفة ثنائية الأبعاد كمصفوفة (matrix) من القيم الصحيحة، حيث يُفهرَس عنصر محدد في المصفوفة ثنائية الأبعاد بقيمتي فهرس الصف والعمود.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-matrix.webp" alt="Accessing matrix[2][3] is like indexing into a grid at row 2 and column 3."> الشكل 1. مصفوفة ثنائية الأبعاد ممثَّلة كمصفوفة. الوصول إلى matrix[2][3] يشبه الفهرسة في شبكة عند الصف 2 والعمود 3.</p>
<p>كثيراً ما تصل البرامج إلى عناصر مصفوفة ثنائية الأبعاد بالتكرار عبر حلقات متداخلة. فمثلاً، تهيّئ الحلقة المتداخلة التالية جميع العناصر في <code>matrix</code> إلى 0:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> i, j;

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">50</span>; i++) {  <span class="hljs-comment">// for each row i</span>
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">100</span>; j++) { <span class="hljs-comment">// iterate over each column element in row i</span>
        matrix[i][j] = <span class="hljs-number">0</span>;
    }
}
</code></pre>
<h4><a href="#_two_dimensional_array_parameters"></a>وسائط المصفوفات ثنائية الأبعاد</h4>
<p>تنطبق القواعد نفسها لتمرير وسائط المصفوفات أحادية البعد إلى الدوال على تمرير وسائط المصفوفات ثنائية الأبعاد: يحصل الوسيط على قيمة عنوان أساس المصفوفة ثنائية الأبعاد (<code>&amp;arr[0][0]</code>). وبعبارة أخرى، يشير الوسيط إلى عناصر مصفوفة الوسيطة، وبالتالي يمكن للدالة تغيير القيم المخزّنة في المصفوفة الممرَّرة.</p>
<p>بالنسبة لوسائط المصفوفات متعددة الأبعاد، يجب أن تشير إلى أن الوسيط مصفوفة متعددة الأبعاد، لكن يمكنك ترك حجم البُعد الأول دون تحديد (من أجل تصميم عام جيد). ويجب تحديد أحجام الأبعاد الأخرى بالكامل ليتمكن المصرّف من توليد الإزاحات الصحيحة داخل المصفوفة. وفيما يلي مثال ثنائي الأبعاد:</p>
<pre><code class="language-c"><span class="hljs-comment">// a C constant definition: COLS is defined to be the value 100</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> COLS  (100)</span>

<span class="hljs-comment">/*
 * init_matrix: initializes the passed matrix elements to the
 *              product of their index values
 *   m: a 2D array (the column dimension must be 100)
 *   rows: the number of rows in the matrix
 *   return: does not return a value
 */</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">init_matrix</span><span class="hljs-params">(<span class="hljs-type">int</span> m[][COLS], <span class="hljs-type">int</span> rows)</span> {
    <span class="hljs-type">int</span> i, j;
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; rows; i++) {
        <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; COLS; j++) {
            m[i][j] = i*j;
        }
    }
}

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> matrix[<span class="hljs-number">50</span>][COLS];
    <span class="hljs-type">int</span> bigger[<span class="hljs-number">90</span>][COLS];

    init_matrix(matrix, <span class="hljs-number">50</span>);
    init_matrix(bigger, <span class="hljs-number">90</span>);
    ...
</code></pre>
<p>يمكن تمرير كل من مصفوفتي <code>matrix</code> و<code>bigger</code> كوسيطتين إلى الدالة <code>init_matrix</code> لأنهما تمتلكان بُعد الأعمدة نفسه الموجود في تعريف الوسيط.</p>
<p><strong>ملاحظة</strong></p>
<blockquote>
<p>يجب تحديد بُعد الأعمدة في تعريف وسيط المصفوفة ثنائية الأبعاد ليتمكن المصرّف من حساب الإزاحة من عنوان أساس المصفوفة ثنائية الأبعاد إلى بداية صف معيّن من العناصر. ويتبع حساب الإزاحة من تخطيط المصفوفات ثنائية الأبعاد في الذاكرة.</p>
</blockquote>
<h4><a href="#_two_dimensional_array_memory_layout"></a>تخطيط ذاكرة المصفوفة ثنائية الأبعاد</h4>
<p>تُرتَّب المصفوفات ثنائية الأبعاد المخصَّصة ساكنةً في الذاكرة <strong>بترتيب الصفوف</strong> (row-major order)، أي أن جميع عناصر الصف 0 تأتي أولاً، ثم جميع عناصر الصف 1، وهكذا. فمثلاً، بالنظر إلى الإعلان التالي لمصفوفة ثنائية الأبعاد من الأعداد الصحيحة:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> arr[<span class="hljs-number">3</span>][<span class="hljs-number">4</span>];  <span class="hljs-comment">// int array with 3 rows and 4 columns</span>
</code></pre>
<p>قد يبدو تخطيطها في الذاكرة كما في <a href="#Fig2DMem">الشكل 2</a>.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-1-2Dmem.webp" alt="Declaring an array as &quot;int arr[3][4]&quot; yields three rows, each of which has four elements. Row 0 consists of arr[0][0], arr[0][1], arr[0][2], and arr[0][3]. Row 1 consists of arr[1][0], arr[1][1], etc."> الشكل 2. تخطيط مصفوفة ثنائية الأبعاد بترتيب الصفوف.</p>
<p>لاحظ أن جميع عناصر المصفوفة تُخصَّص على عناوين ذاكرة متجاورة. أي أن عنوان أساس المصفوفة ثنائية الأبعاد هو عنوان ذاكرة العنصر <code>[0][0]</code> (<code>&amp;arr[0][0]</code>)، وتُخزَّن العناصر التالية بشكل متجاور بترتيب الصفوف (مثلاً، يأتي الصف 1 بأكمله مباشرة بعد الصف 0 بأكمله، وهكذا).</p>
<h4><a href="#_dynamically_allocated_2d_arrays"></a>المصفوفات ثنائية الأبعاد المخصَّصة ديناميكياً</h4>
<p>يمكن تخصيص المصفوفات ثنائية الأبعاد ديناميكياً بطريقتين. فلمصفوفة ثنائية الأبعاد بحجم <em>N</em>x<em>M</em>، إما:</p>
<ol>
<li>أن تُجري استدعاءً واحداً لـ <code>malloc</code>، فتخصّص كتلة كبيرة واحدة من مساحة الكومة لتخزين جميع عناصر المصفوفة البالغ عددها <em>N</em>x<em>M</em>.</li>
<li>أن تُجري استدعاءات متعددة لـ <code>malloc</code>، فتخصّص مصفوفة من مصفوفات. أولاً، خصّص مصفوفة أحادية البعد من <em>N</em> مؤشّراً إلى نوع العنصر، بمصفوفة أحادية البعد من المؤشّرات لكل صف في المصفوفة ثنائية الأبعاد. ثم خصّص <em>N</em> مصفوفات أحادية البعد بحجم <em>M</em> لتخزين مجموعة قيم الأعمدة لكل صف في المصفوفة ثنائية الأبعاد. وأسند عناوين كل من هذه المصفوفات الـ <em>N</em> إلى عناصر المصفوفة الأولى المكوّنة من <em>N</em> مؤشّراً.</li>
</ol>
<p>تختلف إعلانات المتغيّرات وشيفرة التخصيص وصياغة الوصول إلى عناصر المصفوفة بحسب الطريقة التي يختار المبرمج استخدامها من هاتين الطريقتين.</p>
<h4><a href="#_method_1_memory_efficient_allocation"></a>الطريقة 1: تخصيص موفّر للذاكرة</h4>
<p>في هذه الطريقة، يخصّص استدعاء واحد لـ <code>malloc</code> العدد الكلي للبايتات اللازمة لتخزين مصفوفة القيم <em>N</em>x<em>M</em>. ولهذه الطريقة ميزة كونها أكثر كفاءة في استخدام الذاكرة لأن المساحة كلها لجميع عناصر <em>N</em>x<em>M</em> ستُخصَّص دفعة واحدة، في مواقع ذاكرة متجاورة.</p>
<p>يرجع الاستدعاء <code>malloc</code> عنوان البداية للمساحة المخصَّصة (عنوان أساس المصفوفة)، والذي ينبغي تخزينه (كما في مصفوفة أحادية البعد) في متغيّر مؤشّر. بل لا يوجد في الواقع فرق دلالي بين تخصيص مصفوفة أحادية أو ثنائية الأبعاد بهذه الطريقة: إذ يرجع الاستدعاء <code>malloc</code> عنوان البداية لقطعة متجاورة من ذاكرة الكومة بعدد البايتات المطلوب. ولأن تخصيص مصفوفة ثنائية الأبعاد بهذه الطريقة يبدو تماماً كتخصيص مصفوفة أحادية البعد، فعلى المبرمج أن يُسقط صراحةً فهرسة الصفوف والأعمدة ثنائية الأبعاد على هذه القطعة الواحدة من مساحة ذاكرة الكومة (فليس للمصرّف أي تصور ضمني للصفوف أو الأعمدة، وبالتالي لا يستطيع تفسير صياغة الفهرسة المزدوجة في هذه المساحة المخصَّصة بـ malloc).</p>
<p>وفيما يلي مقتطف شيفرة C يخصّص مصفوفة ثنائية الأبعاد ديناميكياً بالطريقة 1:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> N 3</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> M 4</span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> *two_d_array;    <span class="hljs-comment">// the type is a pointer to an int (the element type)</span>

    <span class="hljs-comment">// allocate in a single malloc of N x M int-sized elements:</span>
    two_d_array = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * N * M);

    <span class="hljs-keyword">if</span> (two_d_array == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;ERROR: malloc failed!\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }

    ...
</code></pre>
<p>يعرض <a href="#Fig2DOneMalloc">الشكل 3</a> مثالاً على تخصيص مصفوفة ثنائية الأبعاد بهذه الطريقة ويوضح كيف قد تبدو الذاكرة بعد الاستدعاء <code>malloc</code>.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-2-2Donemalloc.webp" alt="We can allocate an array with malloc(sizeof(int) * (3*4)) and store the base address in a stack pointer variable. Because malloc returns a contiguous chunk of memory, we can treat the memory as a collection of rows and columns in row-major order like a statically allocated array."> الشكل 3. نتائج تخصيص مصفوفة ثنائية الأبعاد باستدعاء واحد لـ malloc.</p>
<p>وكما في المصفوفات أحادية البعد المخصَّصة ديناميكياً، يُخصَّص متغيّر المؤشّر الخاص بالمصفوفة ثنائية الأبعاد على المكدّس. ثم يُسنَد إلى ذلك المؤشّر القيمة التي يرجعها الاستدعاء <code>malloc</code>، وهي تمثّل عنوان أساس القطعة المتجاورة من مواقع تخزين <em>N</em>x<em>M</em> من النوع <code>int</code> في ذاكرة الكومة.</p>
<p>ولأن هذه الطريقة تستخدم قطعة واحدة من المساحة المخصَّصة بـ malloc للمصفوفة ثنائية الأبعاد، فإن تخصيص الذاكرة يكون بأكبر كفاءة ممكنة (فهو يحتاج استدعاءً واحداً فقط لـ <code>malloc</code> للمصفوفة ثنائية الأبعاد بأكملها). وهي الطريقة الأكثر كفاءة للوصول إلى الذاكرة لأن جميع العناصر تقع متقاربة في ذاكرة متجاورة، وكل وصول يحتاج مستوى واحداً فقط من الإحالة غير المباشرة من متغيّر المؤشّر.</p>
<p>غير أن مصرّف C لا يعرف الفرق بين تخصيص مصفوفة ثنائية أو أحادية الأبعاد بهذه الطريقة. ونتيجةً لذلك، <em>لا يمكن</em> استخدام صياغة الفهرسة المزدوجة (<code>[i][j]</code>) الخاصة بالمصفوفات ثنائية الأبعاد المعلَنة ساكنةً عند تخصيص مصفوفة ثنائية الأبعاد بهذه الطريقة. وبدلاً من ذلك، يجب على المبرمج أن يحسب صراحةً الإزاحة في القطعة المتجاورة من ذاكرة الكومة باستخدام دالة في قيمتي فهرس الصف والعمود (<code>[i*M + j]</code>، حيث <code>M</code> هو بُعد الأعمدة).</p>
<p>وفيما يلي مثال على كيفية تنظيم المبرمج للشيفرة لتهيئة جميع عناصر مصفوفة ثنائية الأبعاد:</p>
<pre><code class="language-c"><span class="hljs-comment">// access using [] notation:</span>
<span class="hljs-comment">//   cannot use [i][j] syntax because the compiler has no idea where the</span>
<span class="hljs-comment">//   next row starts within this chunk of heap space, so the programmer</span>
<span class="hljs-comment">//   must explicitly add a function of row and column index values</span>
<span class="hljs-comment">//   (i*M+j) to map their 2D view of the space into the 1D chunk of memory</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; M; j++) {
        two_d_array[i*M + j] = <span class="hljs-number">0</span>;
    }
}
</code></pre>
<h4><a href="#_method_1_single_malloc_and_function_parameters"></a>الطريقة 1 (malloc واحد) ووسائط الدوال</h4>
<p>عنوان أساس مصفوفة من نوع <code>int</code> مخصَّصة باستدعاء <code>malloc</code> واحد هو مؤشّر إلى <code>int</code>، لذا يمكن تمريره إلى دالة بوسيط (<code>int *</code>). وبالإضافة إلى ذلك، يجب تمرير بُعدي الصفوف والأعمدة إلى الدالة لتستطيع حساب الإزاحات في المصفوفة ثنائية الأبعاد حساباً صحيحاً. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-comment">/*
 * initialize all elements in a 2D array to 0
 *  arr: the array
 *  rows: number of rows
 *  cols: number of columns
 */</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">init2D</span><span class="hljs-params">(<span class="hljs-type">int</span> *arr, <span class="hljs-type">int</span> rows, <span class="hljs-type">int</span> cols)</span> {
    <span class="hljs-type">int</span> i, j;
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; rows; i++) {
        <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; cols; j++) {
            arr[i*cols + j] = <span class="hljs-number">0</span>;
        }
    }
}

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> *<span class="hljs-built_in">array</span>;
    <span class="hljs-built_in">array</span> = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * N * M);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">array</span> != <span class="hljs-literal">NULL</span>) {
        init2D(<span class="hljs-built_in">array</span>, N, M);
    }
    ...
</code></pre>
<h4><a href="#_method_2_the_programmer_friendly_way"></a>الطريقة 2: الطريقة الملائمة للمبرمج</h4>
<p>تخزّن الطريقة الثانية لتخصيص مصفوفة ثنائية الأبعاد ديناميكياً المصفوفة كمصفوفة من <em>N</em> مصفوفات أحادية البعد (مصفوفة أحادية البعد لكل صف). وتحتاج إلى <em>N+1</em> استدعاءً لـ <code>malloc</code>: استدعاء <code>malloc</code> واحد لمصفوفة مصفوفات الصفوف، واستدعاء <code>malloc</code> واحد لكل مصفوفة أعمدة من مصفوفات الصفوف الـ <em>N</em>. ونتيجةً لذلك، تكون مواقع العناصر <em>داخل الصف الواحد</em> متجاورة، لكن العناصر غير متجاورة عبر صفوف المصفوفة ثنائية الأبعاد. ولا يكون التخصيص والوصول إلى العناصر بكفاءة الطريقة 1، وقد تكون تعريفات أنواع المتغيّرات أكثر إرباكاً بعض الشيء. غير أنه باستخدام هذه الطريقة، يستطيع المبرمج استخدام صياغة الفهرسة المزدوجة للوصول إلى العناصر الفردية في المصفوفة ثنائية الأبعاد (الفهرس الأول فهرس في مصفوفة الصفوف، والفهرس الثاني فهرس في مصفوفة عناصر الأعمدة داخل ذلك الصف).</p>
<p>وفيما يلي مثال على تخصيص مصفوفة ثنائية الأبعاد بالطريقة 2 (مع حذف شيفرة كشف الأخطاء ومعالجتها للوضوح):</p>
<pre><code class="language-c"><span class="hljs-comment">// the 2D array variable is declared to be \`int **\` (a pointer to an int *)</span>
<span class="hljs-comment">// a dynamically allocated array of dynamically allocated int arrays</span>
<span class="hljs-comment">// (a pointer to pointers to ints)</span>
<span class="hljs-type">int</span> **two_d_array;
<span class="hljs-type">int</span> i;

<span class="hljs-comment">// allocate an array of N pointers to ints</span>
<span class="hljs-comment">// malloc returns the address of this array (a pointer to (int *)&#x27;s)</span>
two_d_array = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span> *) * N);

<span class="hljs-comment">// for each row, malloc space for its column elements and add it to</span>
<span class="hljs-comment">// the array of arrays</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
<span class="hljs-comment">// malloc space for row i&#x27;s M column elements</span>
    two_d_array[i] = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * M);
}
</code></pre>
<p>في هذا المثال، لاحظ أنواع المتغيّرات والأحجام الممرَّرة إلى الاستدعاءات <code>malloc</code>. وللإشارة إلى المصفوفة ثنائية الأبعاد المخصَّصة ديناميكياً، يعلن المبرمج متغيّراً (<code>two_d_array</code>) من النوع <code>int **</code> سيخزّن عنوان مصفوفة مخصَّصة ديناميكياً من قيم العناصر <code>int *</code>. ويخزّن كل عنصر في <code>two_d_array</code> عنوان مصفوفة مخصَّصة ديناميكياً من قيم <code>int</code> (ونوع <code>two_d_array[i]</code> هو <code>int *</code>).</p>
<p>يعرض <a href="#Fig2DNMallocs">الشكل 4</a> كيف قد تبدو الذاكرة بعد استدعاءات <em>N+1</em> لـ <code>malloc</code> في المثال أعلاه.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-3-2Dnmallocs.webp" alt="two_d_array is a stack variable that points to a dynamically allocated array of pointers. Each of those pointers points to a 1D array of integers."> الشكل 4. ترتيب الذاكرة بعد تخصيص مصفوفة ثنائية الأبعاد بـ N+1 استدعاءً لـ malloc.</p>
<p>لاحظ أنه عند استخدام هذه الطريقة، لا تكون متجاورة في الذاكرة إلا العناصر المخصَّصة كجزء من استدعاء واحد لـ <code>malloc</code>. أي أن العناصر داخل كل صف متجاورة، لكن العناصر من صفوف مختلفة (حتى الصفوف المتجاورة) ليست كذلك.</p>
<p>بعد التخصيص، يمكن الوصول إلى العناصر الفردية في المصفوفة ثنائية الأبعاد باستخدام صياغة الفهرسة المزدوجة. ويحدد الفهرس الأول عنصراً في المصفوفة الخارجية من مؤشّرات <code>int *</code> (أي صف)، ويحدد الفهرس الثاني عنصراً في مصفوفة <code>int</code> الداخلية (أي عمود داخل الصف).</p>
<pre><code class="language-c"><span class="hljs-type">int</span> i, j;

<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; M; j++) {
        two_d_array[i][j] = <span class="hljs-number">0</span>;
    }
}
</code></pre>
<p>لفهم كيفية تقييم الفهرسة المزدوجة، تأمّل نوع وقيمة الأجزاء التالية من التعبير:</p>
<pre><code>       two_d_array: an array of int pointers, it stores the base address of an
                 array of (int *) values. Its type is int** (a pointer to int *).

    two_d_array[i]: the ith index into the array of arrays, it stores an (int *)
                 value that represents the base address of an array of (int)
                 values.  Its type is int*.

 two_d_array[i][j]: the jth element pointed to by the ith element of the array of
                 arrays, it stores an int value (the value in row i, column j
                 of the 2D array).  Its type is int.
</code></pre>
<h4><a href="#_method_2_an_array_of_arrays_and_function_parameters"></a>الطريقة 2 (مصفوفة من مصفوفات) ووسائط الدوال</h4>
<p>نوع وسيطة المصفوفة هو <code>int **</code> (مؤشّر إلى مؤشّر إلى <code>int</code>)، ويطابق وسيط الدالة نوع وسيطته. وبالإضافة إلى ذلك، ينبغي تمرير أحجام الصفوف والأعمدة إلى الدالة. ولأن هذا نوع مختلف عن نوع الطريقة 1، لا يمكن للمصفوفتين استخدام دالة مشتركة (فهما ليستا نوع C نفسه).</p>
<p>وفيما يلي دالة مثال تأخذ مصفوفة ثنائية الأبعاد من نوع الطريقة 2 (مصفوفة من مصفوفات) كوسيط:</p>
<pre><code class="language-c"><span class="hljs-comment">/*
 * initialize a 2D array
 * arr: the array
 * rows: number of rows
 * cols: number of columns
 */</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">init2D_Method2</span><span class="hljs-params">(<span class="hljs-type">int</span> **arr, <span class="hljs-type">int</span> rows, <span class="hljs-type">int</span> cols)</span> {
    <span class="hljs-type">int</span> i,j;

    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; rows; i++) {
        <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; cols; j++) {
            arr[i][j] = <span class="hljs-number">0</span>;
        }
    }
}

<span class="hljs-comment">/*
 * main: example of calling init2D_Method2
 */</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> **two_d_array;

    <span class="hljs-comment">// some code to allocate the row array and multiple col arrays</span>
    <span class="hljs-comment">// ...</span>

    init2D_Method2(two_d_array, N, M);
    ...
</code></pre>
<p>هنا يمكن لتنفيذ الدالة استخدام صياغة الفهرسة المزدوجة. وخلافاً للمصفوفات ثنائية الأبعاد المعلَنة ساكنةً، يجب تمرير بُعدي الصفوف والأعمدة كوسيطين: يحدد الوسيط <code>rows</code> الحدود على المصفوفة الخارجية (مصفوفة مصفوفات الصفوف)، ويحدد الوسيط <code>cols</code> الحدود على المصفوفات الداخلية (قيم أعمدة كل صف).</p>
<p>قدّمنا في الفصل السابق <a href="https://diveintosystems.org/book/C1-C_intro/arrays_strings.html#_arrays_and_strings">المصفوفات والسلاسل النصية في C</a>. ونناقش في هذا الفصل سلاسل C المخصَّصة ديناميكياً واستخدامها مع مكتبة سلاسل C. ونقدّم أولاً نظرة موجزة على السلاسل النصية المعلَنة ساكنةً.</p>
<h3 id="261-دعم-c-للسلاسل-النصية-المخصصة-ساكنة-مصفوفات-char"><a href="#_cs_support_for_statically_allocated_strings_arrays_of_char"></a>2.6.1. دعم C للسلاسل النصية المخصَّصة ساكنةً (مصفوفات char)</h3>
<p>لا تدعم C نوعاً منفصلاً للسلاسل النصية، لكن يمكن تنفيذ سلسلة نصية في برامج C باستخدام مصفوفة من قيم <code>char</code> تنتهي بقيمة محرف فارغ خاصة <code>'\\0'</code>. ويحدد المحرف الفارغ في النهاية نهاية تسلسل قيم المحارف التي تتكوّن منها السلسلة النصية. وليست كل مصفوفة محارف سلسلة C، لكن كل سلسلة C مصفوفة من قيم <code>char</code>.</p>
<p>ولأن السلاسل النصية تظهر كثيراً في البرامج، توفّر C مكتبات بها دوال للتلاعب بالسلاسل. ويجب على البرامج التي تستخدم مكتبة سلاسل C تضمين <code>string.h</code>. وتتطلب معظم دوال مكتبة السلاسل أن يخصّص المبرمج مساحة لمصفوفة المحارف التي تتلاعب بها الدوال. وعند طباعة قيمة سلسلة نصية، استخدم العنصر النائب <code>%s</code>.</p>
<p>وفيما يلي برنامج مثال يستخدم السلاسل النصية وبعض دوال مكتبة السلاسل:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string.h&gt;</span>   <span class="hljs-comment">// include the C string library</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">char</span> str1[<span class="hljs-number">10</span>];
    <span class="hljs-type">char</span> str2[<span class="hljs-number">10</span>];

    str1[<span class="hljs-number">0</span>] = <span class="hljs-string">&#x27;h&#x27;</span>;
    str1[<span class="hljs-number">1</span>] = <span class="hljs-string">&#x27;i&#x27;</span>;
    str1[<span class="hljs-number">2</span>] = <span class="hljs-string">&#x27;\\0&#x27;</span>;   <span class="hljs-comment">// explicitly add null terminating character to end</span>

    <span class="hljs-comment">// strcpy copies the bytes from the source parameter (str1) to the</span>
    <span class="hljs-comment">// destination parameter (str2) and null terminates the copy.</span>
    <span class="hljs-built_in">strcpy</span>(str2, str1);
    str2[<span class="hljs-number">1</span>] = <span class="hljs-string">&#x27;o&#x27;</span>;
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s %s\\n&quot;</span>, str1, str2);  <span class="hljs-comment">// prints: hi ho</span>

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<h3 id="262-تخصيص-السلاسل-النصية-ديناميكيا"><a href="#_dynamically_allocating_strings"></a>2.6.2. تخصيص السلاسل النصية ديناميكياً</h3>
<p>يمكن تخصيص مصفوفات المحارف ديناميكياً (كما نوقش في قسمي <a href="https://diveintosystems.org/book/C2-C_depth/pointers.html#_cs_pointer_variables">المؤشّرات</a> و<a href="https://diveintosystems.org/book/C2-C_depth/arrays.html#_arrays_in_c">المصفوفات</a>). وعند تخصيص مساحة ديناميكياً لتخزين سلسلة نصية، من المهم تذكّر تخصيص مساحة في المصفوفة للمحرف <code>'\\0'</code> الذي تنتهي به السلسلة.</p>
<p>يوضح برنامج المثال التالي سلاسل نصية معلَنة ساكنةً ومخصَّصة ديناميكياً (لاحظ القيمة الممرَّرة إلى <code>malloc</code>):</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> size;
    <span class="hljs-type">char</span> str[<span class="hljs-number">64</span>];         <span class="hljs-comment">// statically allocated</span>
    <span class="hljs-type">char</span> *new_str = <span class="hljs-literal">NULL</span>; <span class="hljs-comment">// for dynamically allocated</span>

    <span class="hljs-built_in">strcpy</span>(str, <span class="hljs-string">&quot;Hello&quot;</span>);
    size = <span class="hljs-built_in">strlen</span>(str);   <span class="hljs-comment">// returns 5</span>

    new_str = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>) * (size+<span class="hljs-number">1</span>)); <span class="hljs-comment">// need space for &#x27;\\0&#x27;</span>
    <span class="hljs-keyword">if</span>(new_str == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: malloc failed!  exiting.\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }
    <span class="hljs-built_in">strcpy</span>(new_str, str);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s %s\\n&quot;</span>, str, new_str);    <span class="hljs-comment">// prints &quot;Hello Hello&quot;</span>

    <span class="hljs-built_in">strcat</span>(str, <span class="hljs-string">&quot; There&quot;</span>);  <span class="hljs-comment">// concatenate &quot; There&quot; to the end of str</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, str);    <span class="hljs-comment">// prints &quot;Hello There&quot;</span>

    <span class="hljs-built_in">free</span>(new_str);  <span class="hljs-comment">// free malloc&#x27;ed space when done</span>
    new_str = <span class="hljs-literal">NULL</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p><strong>تحذير — دوال سلاسل C وذاكرة الوجهة</strong></p>
<blockquote>
<p>كثير من دوال سلاسل C (وأبرزها <code>strcpy</code> و<code>strcat</code>) تخزّن نتائجها بتتبع وسيط مؤشّر سلسلة <em>وجهة</em> (<code>char *</code>) والكتابة إلى الموقع الذي يشير إليه. وتفترض هذه الدوال أن الوجهة تحتوي ذاكرة كافية لتخزين النتيجة. لذا، بصفتك مبرمجاً، يجب أن تضمن توفر ذاكرة كافية في الوجهة قبل استدعاء هذه الدوال.</p>
<p>وسيؤدي الفشل في تخصيص ذاكرة كافية إلى نتائج غير معرّفة تتراوح بين انهيار البرنامج و<a href="https://diveintosystems.org/book/C8-IA32/buffer_overflow.html#_real_world_buffer_overflow">ثغرات أمنية كبيرة</a>. فمثلاً، توضح الاستدعاءات التالية لـ <code>strcpy</code> و<code>strcat</code> أخطاء يرتكبها كثيراً مبرمجو C المبتدئون:</p>
<pre><code class="language-c"><span class="hljs-comment">// Attempt to write a 12-byte string into a 5-character array.</span>
<span class="hljs-type">char</span> mystr[<span class="hljs-number">5</span>];
<span class="hljs-built_in">strcpy</span>(mystr, <span class="hljs-string">&quot;hello world&quot;</span>);

<span class="hljs-comment">// Attempt to write to a string with a NULL destination.</span>
<span class="hljs-type">char</span> *mystr = <span class="hljs-literal">NULL</span>;
<span class="hljs-built_in">strcpy</span>(mystr, <span class="hljs-string">&quot;try again&quot;</span>);

<span class="hljs-comment">// Attempt to modify a read-only string literal.</span>
<span class="hljs-type">char</span> *mystr = <span class="hljs-string">&quot;string literal value&quot;</span>;
<span class="hljs-built_in">strcat</span>(mystr, <span class="hljs-string">&quot;string literals aren&#x27;t writable&quot;</span>);
</code></pre>
</blockquote>
<h3 id="263-مكتبات-التلاعب-بسلاسل-c-والمحارف"><a href="#_libraries_for_manipulating_c_strings_and_characters"></a>2.6.3. مكتبات التلاعب بسلاسل C والمحارف</h3>
<p>توفّر C عدة مكتبات بها دوال للتلاعب بالسلاسل النصية والمحارف. وتُعدّ مكتبة السلاسل (<code>string.h</code>) مفيدة بوجه خاص عند كتابة برامج تستخدم سلاسل C. وتحتوي مكتبتا <code>stdlib.h</code> و<code>stdio.h</code> أيضاً على دوال للتلاعب بالسلاسل، وتحتوي مكتبة <code>ctype.h</code> على دوال للتلاعب بقيم المحارف الفردية.</p>
<p>عند استخدام دوال مكتبة سلاسل C، من المهم تذكّر أن معظمها لا يخصّص مساحة للسلاسل التي يتلاعب بها، ولا يتحقق من أنك تمرّر سلاسل صالحة؛ فيجب على برنامجك تخصيص مساحة للسلاسل التي ستستخدمها مكتبة سلاسل C. وزيادةً على ذلك، إذا عدّلت دالة المكتبة السلسلة الممرَّرة، فعلى المستدعي ضمان أن تكون السلسلة منسّقة بشكل صحيح (أي أن يكون لها محرف <code>\\0</code> في نهايتها). وكثيراً ما يؤدي استدعاء دوال مكتبة السلاسل بقيم وسائط مصفوفات سيئة إلى انهيار البرنامج. وتحدد وثائق دوال المكتبات المختلفة (مثل صفحات الدليل) ما إذا كانت دالة المكتبة تخصّص مساحة أم أن المستدعي مسؤول عن تمرير مساحة مخصَّصة إلى دالة المكتبة.</p>
<p><strong>ملاحظة — وسائط <code>char[]</code> و<code>char *</code> ونوع الإرجاع <code>char *</code></strong></p>
<blockquote>
<p>يمكن تمرير مصفوفات المحارف المعلَنة ساكنةً والمخصَّصة ديناميكياً معاً إلى وسيط <code>char *</code> لأن اسم أي من نوعي المتغيّرين يُقيَّم إلى عنوان أساس المصفوفة في الذاكرة. وسيعمل الإعلان عن الوسيط بالنوع <code>char []</code> أيضاً مع قيم الوسائط المعلَنة ساكنةً والمخصَّصة ديناميكياً، لكن <code>char *</code> أكثر استخداماً لتحديد نوع وسائط السلاسل النصية (مصفوفة <code>char</code>).</p>
<p>وإذا أرجع دالة سلسلة نصية (أي كان نوع إرجاعها <code>char *</code>)، فلا يمكن إسناد قيمتها المرجَعة إلا إلى متغيّر نوعه هو أيضاً <code>char *</code>؛ ولا يمكن إسنادها إلى متغيّر مصفوفة معلَن ساكنةً. ويوجد هذا القيد لأن اسم متغيّر مصفوفة معلَن ساكنةً ليس <a href="https://diveintosystems.org/book/C1-C_intro/structs.html#_lvalues">قيمة يسارية</a> صالحة (لا يمكن تغيير عنوان أساسه في الذاكرة)، لذا لا يمكن إسناد قيمة مرجَعة <code>char *</code> إليه.</p>
</blockquote>
<h4><a href="#_strlen_strcpy_strncpy"></a>strlen وstrcpy وstrncpy</h4>
<p>توفّر مكتبة السلاسل دوالاً لنسخ السلاسل النصية وإيجاد طول السلسلة:</p>
<pre><code class="language-c"><span class="hljs-comment">// returns the number of characters in the string (not including the null character)</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">strlen</span><span class="hljs-params">(<span class="hljs-type">char</span> *s)</span>;

<span class="hljs-comment">// copies string src to string dst up until the first &#x27;\\0&#x27; character in src</span>
<span class="hljs-comment">// (the caller needs to make sure src is initialized correctly and</span>
<span class="hljs-comment">// dst has enough space to store a copy of the src string)</span>
<span class="hljs-comment">// returns the address of the dst string</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strcpy</span><span class="hljs-params">(<span class="hljs-type">char</span> *dst, <span class="hljs-type">char</span> *src)</span>;

<span class="hljs-comment">// like strcpy but copies up to the first &#x27;\\0&#x27; or size characters</span>
<span class="hljs-comment">// (this provides some safety to not copy beyond the bounds of the dst</span>
<span class="hljs-comment">// array if the src string is not well formed or is longer than the</span>
<span class="hljs-comment">// space available in the dst array); size_t is an unsigned integer type</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strncpy</span><span class="hljs-params">(<span class="hljs-type">char</span> *dst, <span class="hljs-type">char</span> *src, <span class="hljs-type">size_t</span> size)</span>;
</code></pre>
<p>استخدام الدالة <code>strcpy</code> غير آمن في الحالات التي قد تكون فيها سلسلة المصدر أطول من السعة الكلية لسلسلة الوجهة. وفي هذه الحالة، ينبغي استخدام <code>strncpy</code>. ويوقف الوسيط <code>size</code> الدالة <code>strncpy</code> عن نسخ أكثر من <code>size</code> محرفاً من سلسلة <code>src</code> إلى سلسلة <code>dst</code>. وعندما يكون طول سلسلة <code>src</code> أكبر من أو يساوي <code>size</code>، تنسخ <code>strncpy</code> المحارف <code>size</code> الأولى من <code>src</code> إلى <code>dst</code> ولا تضيف محرفاً فارغاً إلى نهاية <code>dst</code>. ونتيجةً لذلك، ينبغي للمبرمج إضافة محرف فارغ صراحةً إلى نهاية <code>dst</code> بعد استدعاء <code>strncpy</code>.</p>
<p>وفيما يلي بعض الاستخدامات المثالية لهذه الدوال في برنامج:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string.h&gt;</span>   <span class="hljs-comment">// include the string library</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-comment">// variable declarations that will be used in examples</span>
    <span class="hljs-type">int</span> len, i, ret;
    <span class="hljs-type">char</span> str[<span class="hljs-number">32</span>];
    <span class="hljs-type">char</span> *d_str, *ptr;

    <span class="hljs-built_in">strcpy</span>(str, <span class="hljs-string">&quot;Hello There&quot;</span>);
    len = <span class="hljs-built_in">strlen</span>(str);  <span class="hljs-comment">// len is 11</span>

    d_str = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>) * (len+<span class="hljs-number">1</span>));
    <span class="hljs-keyword">if</span> (d_str == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: malloc failed\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }

    <span class="hljs-built_in">strncpy</span>(d_str, str, <span class="hljs-number">5</span>);
    d_str[<span class="hljs-number">5</span>] = <span class="hljs-string">&#x27;\\0&#x27;</span>;   <span class="hljs-comment">// explicitly add null terminating character to end</span>

    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%d:%s\\n&quot;</span>, <span class="hljs-built_in">strlen</span>(str), str);      <span class="hljs-comment">// prints 11:Hello There</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%d:%s\\n&quot;</span>, <span class="hljs-built_in">strlen</span>(d_str), d_str);  <span class="hljs-comment">// prints 5:Hello</span>

    <span class="hljs-built_in">free</span>(d_str);

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p><strong>ملاحظة — <code>strlcpy</code></strong></p>
<blockquote>
<p>تشبه الدالة <code>strlcpy</code> الدالة <code>strncpy</code>، إلا أنها تضيف دائماً المحرف <code>'\\0'</code> إلى نهاية سلسلة الوجهة. وجعل السلسلة منتهية دائماً يجعلها بديلاً أكثر أماناً من strncpy لأنه لا يتطلب من المبرمج تذكر إنهاء السلسلة صراحةً بمحرف فارغ.</p>
<pre><code>// like strncpy but copies up to the first '\\0' or size-1 characters
// and null terminates the dest string (if size &gt; 0).
char *strlcpy(char *dest, char *src, size_t size);
</code></pre>
<p>أضافت مكتبة GNU C في Linux الدالة <code>strlcpy</code> في إصدار حديث (2.38). وهي متاحة حالياً على بعض الأنظمة فقط، لكن توافرها سيزداد مع انتشار إصدارات أحدث من مكتبة C. ونوصي باستخدام <code>strlcpy</code> متى كان متاحاً.</p>
<p>وعلى الأنظمة التي تتوفر فيها <code>strlcpy</code> يمكن استبدال الاستدعاء التالي لـ <code>strncpy</code> من المثال أعلاه:</p>
<pre><code class="language-python">  // copy up to <span class="hljs-number">5</span> chars <span class="hljs-keyword">from</span> <span class="hljs-built_in">str</span> to d_str
  strncpy(d_str, <span class="hljs-built_in">str</span>, <span class="hljs-number">5</span>);
  d_str[<span class="hljs-number">5</span>] = <span class="hljs-string">&#x27;\\0&#x27;</span>;   // explicitly add null terminating character to end
</code></pre>
<p>بالاستدعاء التالي لـ <code>strlcpy</code>:</p>
<pre><code class="language-python">  // copy up to <span class="hljs-number">5</span> chars <span class="hljs-keyword">from</span> <span class="hljs-built_in">str</span> to d_str
  strlcpy(d_str, <span class="hljs-built_in">str</span>, <span class="hljs-number">6</span>);  // strlcpy always adds <span class="hljs-string">&#x27;\\0&#x27;</span> to the end
</code></pre>
</blockquote>
<h4><a href="#_strcmp_strncmp"></a>strcmp وstrncmp</h4>
<p>توفّر مكتبة السلاسل أيضاً دالة لمقارنة سلسلتين نصيتين. ومقارنة متغيّري سلسلة باستخدام المعامل <code>==</code> <em>لا</em> تقارن المحارف في السلسلتين — بل تقارن عنواني الأساس للسلسلتين فقط. فمثلاً، التعبير:</p>
<pre><code class="language-c"><span class="hljs-keyword">if</span> (d_str == str) { ...
</code></pre>
<p>يقارن عنوان أساس مصفوفة <code>char</code> في الكومة الذي يشير إليه <code>d_str</code> بعنوان أساس مصفوفة <code>str</code> <code>char</code> المخصَّصة على المكدّس.</p>
<p>لمقارنة قيم السلسلتين، يحتاج المبرمج إما إلى كتابة شيفرة يدوياً لمقارنة قيم العناصر المتناظرة، أو إلى استخدام الدالتين <code>strcmp</code> أو <code>strncmp</code> من مكتبة السلاسل:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> <span class="hljs-title function_">strcmp</span><span class="hljs-params">(<span class="hljs-type">char</span> *s1, <span class="hljs-type">char</span> *s2)</span>;
<span class="hljs-comment">// returns 0 if s1 and s2 are the same strings</span>
<span class="hljs-comment">// a value &lt; 0 if s1 is less than s2</span>
<span class="hljs-comment">// a value &gt; 0 if s1 is greater than s2</span>

<span class="hljs-type">int</span> <span class="hljs-title function_">strncmp</span><span class="hljs-params">(<span class="hljs-type">char</span> *s1, <span class="hljs-type">char</span> *s2, <span class="hljs-type">size_t</span> n)</span>;
<span class="hljs-comment">// compare s1 and s2 up to at most n characters</span>
</code></pre>
<p>تقارن الدالة <code>strcmp</code> السلاسل محرفاً محرفاً استناداً إلى <a href="https://diveintosystems.org/book/C4-Binary/index.html#_binary_and_data_representation">تمثيلها ASCII</a>. وبعبارة أخرى، تقارن قيم <code>char</code> في المواضع المتناظرة من مصفوفتي الوسيطين لإنتاج نتيجة مقارنة السلسلتين، وهو ما يعطي أحياناً نتائج غير بديهية. فمثلاً، ترميز ASCII لقيمة <code>char</code> <code>'a'</code> <em>أكبر</em> من الترميز لقيمة <code>char</code> <code>'Z'</code>. ونتيجةً لذلك، ترجع <code>strcmp(&quot;aaa&quot;, &quot;Zoo&quot;)</code> قيمة موجبة تشير إلى أن <code>&quot;aaa&quot;</code> أكبر من <code>&quot;Zoo&quot;</code> ويرجع الاستدعاء <code>strcmp(&quot;aaa&quot;, &quot;zoo&quot;)</code> قيمة سالبة تشير إلى أن <code>&quot;aaa&quot;</code> أقل من <code>&quot;zoo&quot;</code>.</p>
<p>وفيما يلي بعض أمثلة مقارنة السلاسل:</p>
<pre><code class="language-c"><span class="hljs-built_in">strcpy</span>(str, <span class="hljs-string">&quot;alligator&quot;</span>);
<span class="hljs-built_in">strcpy</span>(d_str, <span class="hljs-string">&quot;Zebra&quot;</span>);

ret =  <span class="hljs-built_in">strcmp</span>(str,d_str);
<span class="hljs-keyword">if</span> (ret == <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s is equal to %s\\n&quot;</span>, str, d_str);
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ret &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s is less than %s\\n&quot;</span>, str, d_str);
} <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s is greater than %s\\n&quot;</span>, str, d_str);  <span class="hljs-comment">// true for these strings</span>
}

ret = <span class="hljs-built_in">strncmp</span>(str, <span class="hljs-string">&quot;all&quot;</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">// returns 0: they are equal up to first 3 chars</span>
</code></pre>
<h4><a href="#_strcat_strstr_strchr"></a>strcat وstrstr وstrchr</h4>
<p>يمكن لدوال مكتبة السلاسل ربط السلاسل النصية (لاحظ أن على المستدعي ضمان أن سلسلة الوجهة تمتلك مساحة كافية لتخزين النتيجة):</p>
<pre><code class="language-c"><span class="hljs-comment">// append chars from src to end of dst</span>
<span class="hljs-comment">// returns ptr to dst and adds &#x27;\\0&#x27; to end</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strcat</span><span class="hljs-params">(<span class="hljs-type">char</span> *dst, <span class="hljs-type">char</span> *src)</span>

<span class="hljs-comment">// append the first chars from src to end of dst, up to a maximum of size</span>
<span class="hljs-comment">// returns ptr to dst and adds &#x27;\\0&#x27; to end</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strncat</span><span class="hljs-params">(<span class="hljs-type">char</span> *dst, <span class="hljs-type">char</span> *src, <span class="hljs-type">size_t</span> size)</span>;
</code></pre>
<p>كما توفّر دوالاً لإيجاد السلاسل الفرعية أو قيم المحارف في السلاسل:</p>
<pre><code class="language-c"><span class="hljs-comment">// locate a substring inside a string</span>
<span class="hljs-comment">// (const means that the function doesn&#x27;t modify string)</span>
<span class="hljs-comment">// returns a pointer to the beginning of substr in string</span>
<span class="hljs-comment">// returns NULL if substr not in string</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strstr</span><span class="hljs-params">(<span class="hljs-type">const</span> <span class="hljs-type">char</span> *<span class="hljs-built_in">string</span>, <span class="hljs-type">const</span> <span class="hljs-type">char</span> *substr)</span>;

<span class="hljs-comment">// locate a character (c) in the passed string (s)</span>
<span class="hljs-comment">// (const means that the function doesn&#x27;t modify s)</span>
<span class="hljs-comment">// returns a pointer to the first occurrence of the char c in string</span>
<span class="hljs-comment">// or NULL if c is not in the string</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strchr</span><span class="hljs-params">(<span class="hljs-type">const</span> <span class="hljs-type">char</span> *s, <span class="hljs-type">int</span> c)</span>;
</code></pre>
<p>وفيما يلي بعض الأمثلة على استخدام هذه الدوال (نحذف بعض معالجة الأخطاء للوضوح):</p>
<pre><code class="language-c"><span class="hljs-type">char</span> str[<span class="hljs-number">32</span>];
<span class="hljs-type">char</span> *ptr;

<span class="hljs-built_in">strcpy</span>(str, <span class="hljs-string">&quot;Zebra fish&quot;</span>);
<span class="hljs-built_in">strcat</span>(str, <span class="hljs-string">&quot; stripes&quot;</span>);  <span class="hljs-comment">// str gets &quot;Zebra fish stripes&quot;</span>
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, str);     <span class="hljs-comment">// prints: Zebra fish stripes</span>

<span class="hljs-built_in">strncat</span>(str, <span class="hljs-string">&quot; are black.&quot;</span>, <span class="hljs-number">8</span>);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, str);     <span class="hljs-comment">// prints: Zebra fish stripes are bla  (spaces count)</span>

ptr = <span class="hljs-built_in">strstr</span>(str, <span class="hljs-string">&quot;trip&quot;</span>);
<span class="hljs-keyword">if</span> (ptr != <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, ptr);   <span class="hljs-comment">// prints: tripes are bla</span>
}

ptr = <span class="hljs-built_in">strchr</span>(str, <span class="hljs-string">&#x27;e&#x27;</span>);
<span class="hljs-keyword">if</span> (ptr != <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, ptr);   <span class="hljs-comment">// prints: ebra fish stripes are bla</span>
}
</code></pre>
<p>تُرجع الاستدعاءات <code>strchr</code> و<code>strstr</code> عنوان العنصر الأول في مصفوفة الوسيط بقيمة محرف مطابقة أو بقيمة سلسلة فرعية مطابقة على الترتيب. وعنوان هذا العنصر هو بداية مصفوفة من قيم <code>char</code> تنتهي بمحرف <code>\\0</code>. وبعبارة أخرى، يشير <code>ptr</code> إلى بداية سلسلة فرعية داخل سلسلة أخرى. وعند طباعة قيمة <code>ptr</code> كسلسلة نصية بـ <code>printf</code>، تُطبع قيم المحارف بدءاً من الفهرس الذي يشير إليه <code>ptr</code>، ما يعطي النتائج المذكورة أعلاه.</p>
<h4><a href="#_strtok_strtok_r"></a>strtok وstrtok_r</h4>
<p>توفّر مكتبة السلاسل أيضاً دوالاً تقسّم سلسلة نصية إلى رموز (tokens). ويشير <strong>الرمز</strong> (token) إلى متتالية فرعية من المحارف في سلسلة تفصل بينها أي عدد من محارف الفصل التي يختارها المبرمج.</p>
<pre><code class="language-c"><span class="hljs-type">char</span> *<span class="hljs-title function_">strtok</span><span class="hljs-params">(<span class="hljs-type">char</span> *str, <span class="hljs-type">const</span> <span class="hljs-type">char</span> *delim)</span>;

<span class="hljs-comment">// a reentrant version of strtok (reentrant is defined in later chapters):</span>
<span class="hljs-type">char</span> *<span class="hljs-title function_">strtok_r</span><span class="hljs-params">(<span class="hljs-type">char</span> *str, <span class="hljs-type">const</span> <span class="hljs-type">char</span> *delim, <span class="hljs-type">char</span> **saveptr)</span>;
</code></pre>
<p>تبحث الدالتان <code>strtok</code> (أو <code>strtok_r</code>) عن رموز فردية داخل سلسلة أكبر. فمثلاً، ضبط محارف فصل <code>strtok</code> على مجموعة محارف المسافات البيضاء يعطي الكلمات في سلسلة تحتوي أصلاً على جملة إنجليزية. أي أن كل كلمة في الجملة رمز في السلسلة.</p>
<p>فيما يلي برنامج مثال يستخدم <code>strtok</code> لإيجاد الكلمات الفردية كرموز في سلسلة إدخال. (ويمكن نسخه أيضاً من هنا: <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/strtokexample.c">strtokexample.c</a>).</p>
<pre><code class="language-c"><span class="hljs-comment">/*
 * Extract whitespace-delimited tokens from a line of input
 * and print them one per line.
 *
 * to compile:
 *   gcc -g -Wall strtokexample.c
 *
 * example run:
 *   Enter a line of text:        aaaaa             bbbbbbbbb          cccccc
 *
 *   The input line is:
 *         aaaaa             bbbbbbbbb          cccccc
 *   Next token is aaaaa
 *   Next token is bbbbbbbbb
 *   Next token is cccccc
 */</span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
     <span class="hljs-comment">/* whitespace stores the delim string passed to strtok.  The delim
      * string  is initialized to the set of characters that delimit tokens
      * We initialize the delim string to the following set of chars:
      *   &#x27; &#x27;: space  &#x27;\\t&#x27;: tab  &#x27;\\f&#x27;: form feed  &#x27;\\r&#x27;: carriage return
      *   &#x27;\\v&#x27;: vertical tab  &#x27;\\n&#x27;: new line
      * (run &quot;man ascii&quot; to list all ASCII characters)
      *
      * This line shows one way to statically initialize a string variable
      * (using this method the string contents are constant, meaning that they
      *  cannot be modified, which is fine for the way we are using the
      *  whitespace string in this program).
      */</span>
    <span class="hljs-type">char</span> *whitespace = <span class="hljs-string">&quot; \\t\\f\\r\\v\\n&quot;</span>;  <span class="hljs-comment">/* Note the space char at beginning */</span>

    <span class="hljs-type">char</span> *token;  <span class="hljs-comment">/* The next token in the line. */</span>
    <span class="hljs-type">char</span> *line;   <span class="hljs-comment">/* The line of text read in that we will tokenize. */</span>

    <span class="hljs-comment">/* Allocate some space for the user&#x27;s string on the heap. */</span>
    line = <span class="hljs-built_in">malloc</span>(<span class="hljs-number">200</span> * <span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>));
    <span class="hljs-keyword">if</span> (line == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: malloc failed\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }

    <span class="hljs-comment">/* Read in a line entered by the user from &quot;standard in&quot;. */</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Enter a line of text:\\n&quot;</span>);
    line = fgets(line, <span class="hljs-number">200</span> * <span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>), <span class="hljs-built_in">stdin</span>);
    <span class="hljs-keyword">if</span> (line == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: reading input failed, exiting...\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;The input line is:\\n%s\\n&quot;</span>, line);

    <span class="hljs-comment">/* Divide the string into tokens. */</span>
    token = strtok(line, whitespace);       <span class="hljs-comment">/* get the first token */</span>
    <span class="hljs-keyword">while</span> (token != <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Next token is %s\\n&quot;</span>, token);
        token = strtok(<span class="hljs-literal">NULL</span>, whitespace);     <span class="hljs-comment">/* get the next token */</span>
    }

    <span class="hljs-built_in">free</span>(line);

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<h4><a href="#_sprintf"></a>sprintf</h4>
<p>توفّر مكتبة <code>stdio</code> في C أيضاً دوالاً تتلاعب بسلاسل C. وربما يكون أكثرها فائدة الدالة <code>sprintf</code>، التي «تطبع» إلى سلسلة نصية بدلاً من طباعة الإخراج إلى طرفية:</p>
<pre><code class="language-c"><span class="hljs-comment">// like printf(), the format string allows for placeholders like %d, %f, etc.</span>
<span class="hljs-comment">// pass parameters after the format string to fill them in</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">sprintf</span><span class="hljs-params">(<span class="hljs-type">char</span> *s, <span class="hljs-type">const</span> <span class="hljs-type">char</span> *format, ...)</span>;
</code></pre>
<p>تهيّئ <code>sprintf</code> محتويات سلسلة نصية من قيم أنواع مختلفة. ويشبه وسيطها <code>format</code> وسائط <code>printf</code> و<code>scanf</code>. وفيما يلي بعض الأمثلة:</p>
<pre><code class="language-c"><span class="hljs-type">char</span> str[<span class="hljs-number">64</span>];
<span class="hljs-type">float</span> ave = <span class="hljs-number">76.8</span>;
<span class="hljs-type">int</span> num = <span class="hljs-number">2</span>;

<span class="hljs-comment">// initialize str to format string, filling in each placeholder with</span>
<span class="hljs-comment">// a char representation of its arguments&#x27; values</span>
<span class="hljs-built_in">sprintf</span>(str, <span class="hljs-string">&quot;%s is %d years old and in grade %d&quot;</span>, <span class="hljs-string">&quot;Henry&quot;</span>, <span class="hljs-number">12</span>, <span class="hljs-number">7</span>);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, str);  <span class="hljs-comment">// prints: Henry is 12 years old and in grade 7</span>

<span class="hljs-built_in">sprintf</span>(str, <span class="hljs-string">&quot;The average grade on exam %d is %g&quot;</span>, num, ave);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, str);  <span class="hljs-comment">// prints: The average grade on exam 2 is 76.8</span>
</code></pre>
<h4><a href="#_functions_for_individual_character_values"></a>دوال قيم المحارف الفردية</h4>
<p>تحتوي مكتبة C القياسية (<code>stdlib.h</code>) على مجموعة دوال للتلاعب بقيم <code>char</code> الفردية واختبارها، منها:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span>   <span class="hljs-comment">// include stdlib and ctypes to use these</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;ctype.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">islower</span><span class="hljs-params">(ch)</span>;
<span class="hljs-type">int</span> <span class="hljs-title function_">isupper</span><span class="hljs-params">(ch)</span>;       <span class="hljs-comment">// these functions return a non-zero value if the</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">isalpha</span><span class="hljs-params">(ch)</span>;       <span class="hljs-comment">// test is TRUE, otherwise they return 0 (FALSE)</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">isdigit</span><span class="hljs-params">(ch)</span>;
<span class="hljs-type">int</span> <span class="hljs-title function_">isalnum</span><span class="hljs-params">(ch)</span>;
<span class="hljs-type">int</span> <span class="hljs-title function_">ispunct</span><span class="hljs-params">(ch)</span>;
<span class="hljs-type">int</span> <span class="hljs-title function_">isspace</span><span class="hljs-params">(ch)</span>;
<span class="hljs-type">char</span> <span class="hljs-title function_">tolower</span><span class="hljs-params">(ch)</span>;     <span class="hljs-comment">// returns ASCII value of lower-case of argument</span>
<span class="hljs-type">char</span> <span class="hljs-title function_">toupper</span><span class="hljs-params">(ch)</span>;
</code></pre>
<p>وفيما يلي بعض الأمثلة على استخدامها:</p>
<pre><code class="language-c"><span class="hljs-type">char</span> str[<span class="hljs-number">64</span>];
<span class="hljs-type">int</span> len, i;

<span class="hljs-built_in">strcpy</span>(str, <span class="hljs-string">&quot;I see 20 ZEBRAS, GOATS, and COWS&quot;</span>);

<span class="hljs-keyword">if</span> ( <span class="hljs-built_in">islower</span>(str[<span class="hljs-number">2</span>]) ){
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%c is lower case\\n&quot;</span>, str[<span class="hljs-number">2</span>]);   <span class="hljs-comment">// prints: s is lower case</span>
}

len = <span class="hljs-built_in">strlen</span>(str);
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">isupper</span>(str[i]) ) {
        str[i] = <span class="hljs-built_in">tolower</span>(str[i]);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( <span class="hljs-built_in">isdigit</span>(str[i]) ) {
        str[i] = <span class="hljs-string">&#x27;X&#x27;</span>;
    }
}
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s\\n&quot;</span>, str);  <span class="hljs-comment">// prints: i see XX zebras, goats, and cows</span>
</code></pre>
<h4><a href="#_functions_to_convert_strings_to_other_types"></a>دوال تحويل السلاسل إلى أنواع أخرى</h4>
<p>تحتوي <code>stdlib.h</code> أيضاً على دوال للتحويل بين السلاسل النصية وأنواع C الأخرى. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">atoi</span><span class="hljs-params">(<span class="hljs-type">const</span> <span class="hljs-type">char</span> *nptr)</span>;     <span class="hljs-comment">// convert a string to an integer</span>
<span class="hljs-type">double</span> <span class="hljs-title function_">atof</span><span class="hljs-params">(<span class="hljs-type">const</span> <span class="hljs-type">char</span> *nptr)</span>;  <span class="hljs-comment">// convert a string to a float</span>
</code></pre>
<p>وفيما يلي مثال:</p>
<pre><code class="language-c"><span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%d %g\\n&quot;</span>, atoi(<span class="hljs-string">&quot;1234&quot;</span>), atof(<span class="hljs-string">&quot;4.56&quot;</span>));
</code></pre>
<p>لمزيد من المعلومات عن هذه الدوال وغيرها من دوال مكتبة C (بما في ذلك ما تفعله، وصيغة وسائطها، وما ترجعه، والترويسات التي يجب تضمينها لاستخدامها)، انظر <a href="http://www.cs.swarthmore.edu/~newhall/unixhelp/man.html">صفحات الدليل man</a>. فمثلاً، لعرض صفحة دليل <code>strcpy</code>، شغّل:</p>
<pre><code class="language-bash">$ man strcpy
</code></pre>
<p>قدّمنا في الفصل السابق <a href="https://diveintosystems.org/book/C1-C_intro/structs.html#_structs">أنواع بنى C</a>. ونغوص في هذا الفصل أعمق في بنى C، ونفحص البنى المخصَّصة ساكنةً وديناميكياً، ونجمع البنى والمؤشّرات لإنشاء أنواع وبنى بيانات أكثر تعقيداً.</p>
<p>نبدأ بنظرة سريعة على البنى المعلَنة ساكنةً. انظر الفصل السابق لمزيد من التفاصيل.</p>
<h3 id="271-مراجعة-نوع-البنية-struct-في-c"><a href="#_review_of_the_c_struct_type"></a>2.7.1. مراجعة نوع البنية struct في C</h3>
<p>يمثّل نوع <strong>البنية</strong> (struct) مجموعة غير متجانسة من البيانات؛ وهو آلية لمعالجة مجموعة من الأنواع المختلفة كوحدة واحدة متماسكة.</p>
<p>ويتضمّن تعريف أنواع <code>struct</code> واستخدامها في برامج C ثلاث خطوات:</p>
<ol>
<li>عرّف نوع <code>struct</code> يحدد قيم الحقول وأنواعها.</li>
<li>أعلن متغيّرات من النوع <code>struct</code>.</li>
<li>استخدم <em>صيغة النقطة</em> للوصول إلى قيم الحقول الفردية في المتغيّر.</li>
</ol>
<p>في C، البنى <a href="https://diveintosystems.org/book/C1-C_intro/structs.html#_lvalues">قيم يسارية</a> (يمكن أن تظهر في الجانب الأيسر من عبارة إسناد). وقيمة متغيّر <code>struct</code> هي محتوى ذاكرته (كل البايتات المكوّنة لقيم حقوله). وعند استدعاء دوال بوسائط <code>struct</code>، تُنسخ قيمة وسيطة <code>struct</code> (نسخة من كل بايتات جميع حقولها) إلى وسيط الدالة <code>struct</code>.</p>
<p>عند البرمجة بالبنى، وخصوصاً عند الجمع بين البنى والمصفوفات، من الجوهري التفكير بعناية في نوع كل تعبير. فكل حقل في <code>struct</code> يمثّل نوعاً محدداً، وتتبع صياغة الوصول إلى قيم الحقول ودلالات تمرير قيم الحقول الفردية إلى الدوال النوع المحدد لتلك الحقول.</p>
<p>يوضح <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/struct_review.c">برنامج المثال الكامل</a> التالي تعريف نوع <code>struct</code>، والإعلان عن متغيّرات من ذلك النوع، والوصول إلى قيم الحقول، وتمرير البنى وقيم الحقول الفردية إلى الدوال. (نحذف بعض معالجة الأخطاء والتعليقات للوضوح).</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string.h&gt;</span></span>

<span class="hljs-comment">/* define a new struct type (outside function bodies) */</span>
<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> {</span>
    <span class="hljs-type">char</span>  name[<span class="hljs-number">64</span>];
    <span class="hljs-type">int</span>   age;
    <span class="hljs-type">float</span> gpa;
    <span class="hljs-type">int</span>   grad_yr;
};

<span class="hljs-comment">/* function prototypes */</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">checkID</span><span class="hljs-params">(<span class="hljs-keyword">struct</span> studentT s1, <span class="hljs-type">int</span> min_age)</span>;
<span class="hljs-type">void</span> <span class="hljs-title function_">changeName</span><span class="hljs-params">(<span class="hljs-type">char</span> *old, <span class="hljs-type">char</span> *new)</span>;

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> can_vote;
    <span class="hljs-comment">// declare variables of struct type:</span>
    <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> <span class="hljs-title">student1</span>, <span class="hljs-title">student2</span>;</span>

    <span class="hljs-comment">// access field values using .</span>
    <span class="hljs-built_in">strcpy</span>(student1.name, <span class="hljs-string">&quot;Ruth&quot;</span>);
    student1.age = <span class="hljs-number">17</span>;
    student1.gpa = <span class="hljs-number">3.5</span>;
    student1.grad_yr = <span class="hljs-number">2021</span>;

    <span class="hljs-comment">// structs are lvalues</span>
    student2 = student1;
    <span class="hljs-built_in">strcpy</span>(student2.name, <span class="hljs-string">&quot;Frances&quot;</span>);
    student2.age = student1.age + <span class="hljs-number">4</span>;

    <span class="hljs-comment">// passing a struct</span>
    can_vote = checkID(student1, <span class="hljs-number">18</span>);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s %d\\n&quot;</span>, student1.name, can_vote);

    can_vote = checkID(student2, <span class="hljs-number">18</span>);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%s %d\\n&quot;</span>, student2.name, can_vote);

    <span class="hljs-comment">// passing a struct field value</span>
    changeName(student2.name, <span class="hljs-string">&quot;Kwame&quot;</span>);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;student 2&#x27;s name is now %s\\n&quot;</span>, student2.name);

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}

<span class="hljs-type">int</span> <span class="hljs-title function_">checkID</span><span class="hljs-params">(<span class="hljs-keyword">struct</span> studentT s, <span class="hljs-type">int</span> min_age)</span> {
    <span class="hljs-type">int</span> ret = <span class="hljs-number">1</span>;

    <span class="hljs-keyword">if</span> (s.age &lt; min_age) {
        ret = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// changes age field IN PARAMETER COPY ONLY</span>
        s.age = min_age + <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">return</span> ret;
}

<span class="hljs-type">void</span> <span class="hljs-title function_">changeName</span><span class="hljs-params">(<span class="hljs-type">char</span> *old, <span class="hljs-type">char</span> *new)</span> {
    <span class="hljs-keyword">if</span> ((old == <span class="hljs-literal">NULL</span>) || (new == <span class="hljs-literal">NULL</span>)) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">strcpy</span>(old,new);
}
</code></pre>
<p>وعند التشغيل، ينتج البرنامج:</p>
<pre><code>Ruth 0
Frances 1
student 2's name is now Kwame
</code></pre>
<p>عند التعامل مع البنى، من المهم بشكل خاص التفكير في أنواع <code>struct</code> وحقولها. فمثلاً، عند تمرير <code>struct</code> إلى دالة، يحصل الوسيط على نسخة من قيمة البنية (نسخة من كل بايتات الوسيطة). وبالتالي، فإن التغييرات في قيم حقول الوسيط <em>لا</em> تغيّر قيمة الوسيطة. ويوضح البرنامج السابق هذا السلوك في الاستدعاء <code>checkID</code> الذي يعدّل حقل العمر في الوسيط. ولا أثر للتغييرات في <code>checkID</code> في قيمة حقل العمر المقابل في الوسيطة.</p>
<p>وعند تمرير حقل من <code>struct</code> إلى دالة، تطابق الدلالات نوع الحقل (نوع وسيط الدالة). فمثلاً، في الاستدعاء <code>changeName</code>، تُنسخ قيمة حقل <code>name</code> (عنوان أساس مصفوفة <code>name</code> داخل بنية <code>student2</code>) إلى الوسيط <code>old</code>، أي أن الوسيط يشير إلى مجموعة عناصر المصفوفة نفسها في الذاكرة التي تشير إليها وسيطته. وهكذا، يؤدي تغيير عنصر من المصفوفة في الدالة إلى تغيير قيمة العنصر في الوسيطة أيضاً؛ فتطابق دلالات تمرير حقل <code>name</code> نوع حقل <code>name</code>.</p>
<h3 id="272-المؤشرات-والبنى"><a href="#_pointers_and_structs"></a>2.7.2. المؤشّرات والبنى</h3>
<p>كما في أنواع C الأخرى، يمكن للمبرمجين الإعلان عن متغيّر كمؤشّر إلى نوع <code>struct</code> معرَّف من المستخدم. وتشبه دلالات استخدام متغيّر مؤشّر <code>struct</code> دلالات أنواع المؤشّرات الأخرى مثل <code>int *</code>.</p>
<p>تأمّل نوع <code>struct studentT</code> المقدَّم في مثال البرنامج السابق:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> {</span>
    <span class="hljs-type">char</span>  name[<span class="hljs-number">64</span>];
    <span class="hljs-type">int</span>   age;
    <span class="hljs-type">float</span> gpa;
    <span class="hljs-type">int</span>   grad_yr;
};
</code></pre>
<p>يستطيع المبرمج الإعلان عن متغيّرات من النوع <code>struct studentT</code> أو <code>struct studentT *</code> (مؤشّر إلى <code>struct studentT</code>):</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> <span class="hljs-title">s</span>;</span>
<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> *<span class="hljs-title">sptr</span>;</span>

<span class="hljs-comment">// think very carefully about the type of each field when</span>
<span class="hljs-comment">// accessing it (name is an array of char, age is an int ...)</span>
<span class="hljs-built_in">strcpy</span>(s.name, <span class="hljs-string">&quot;Freya&quot;</span>);
s.age = <span class="hljs-number">18</span>;
s.gpa = <span class="hljs-number">4.0</span>;
s.grad_yr = <span class="hljs-number">2020</span>;

<span class="hljs-comment">// malloc space for a struct studentT for sptr to point to:</span>
sptr = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">struct</span> studentT));
<span class="hljs-keyword">if</span> (sptr == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: malloc failed\\n&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
}
</code></pre>
<p>لاحظ أن الاستدعاء <code>malloc</code> يهيّئ <code>sptr</code> ليشير إلى بنية مخصَّصة ديناميكياً في ذاكرة الكومة. واستخدام المعامل <code>sizeof</code> لحساب حجم الطلب الذي تطلبه <code>malloc</code> (مثل <code>sizeof(struct studentT)</code>) يضمن أن <code>malloc</code> تخصّص مساحة <em>لكل</em> قيم الحقول في البنية.</p>
<p>للوصول إلى الحقول الفردية في مؤشّر إلى <code>struct</code>، يجب أولاً <strong>إلغاء الإشارة</strong> إلى متغيّر المؤشّر. وبناءً على قواعد <a href="https://diveintosystems.org/book/C2-C_depth/pointers.html#_pointer_variables">إلغاء الإشارة إلى المؤشّرات</a>، قد تُغريك نفسك بالوصول إلى حقول <code>struct</code> هكذا:</p>
<pre><code class="language-c"><span class="hljs-comment">// the grad_yr field of what sptr points to gets 2021:</span>
(*sptr).grad_yr = <span class="hljs-number">2021</span>;

<span class="hljs-comment">// the age field of what sptr points to gets s.age plus 1:</span>
(*sptr).age = s.age + <span class="hljs-number">1</span>;
</code></pre>
<p>غير أنه لأن المؤشّرات إلى البنى شائعة الاستخدام جداً، توفّر C معاملاً خاصاً (<code>→</code>) يلغي الإشارة إلى <code>struct</code> ويصل إلى إحدى قيم حقوله معاً. فمثلاً، <code>sptr→year</code> يكافئ <code>(*sptr).year</code>. وفيما يلي بعض الأمثلة على الوصول إلى قيم الحقول باستخدام هذه الصياغة:</p>
<pre><code class="language-c"><span class="hljs-comment">// the gpa field of what sptr points to gets 3.5:</span>
sptr-&gt;gpa = <span class="hljs-number">3.5</span>;

<span class="hljs-comment">// the name field of what sptr points to is a char *</span>
<span class="hljs-comment">// (can use strcpy to init its value):</span>
<span class="hljs-built_in">strcpy</span>(sptr-&gt;name, <span class="hljs-string">&quot;Lars&quot;</span>);
</code></pre>
<p>يرسم <a href="#FigStructPointer">الشكل 1</a> تصوراً لما قد يبدو عليه المتغيّران <code>s</code> و<code>sptr</code> في الذاكرة بعد تنفيذ الشيفرة أعلاه. تذكّر أن <code>malloc</code> تخصّص ذاكرة من الكومة، وتُخصَّص المتغيّرات المحلية على المكدّس.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-structptr.webp" alt="All the fields of struct s (Freya) are stored on the stack. The sptr pointer on the stack stores the heap address of another student struct (Lars)."> الشكل 1. الفروق في تخطيط الذاكرة بين بنية مخصَّصة ساكنةً (بيانات على المكدّس) وبنية مخصَّصة ديناميكياً (بيانات على الكومة).</p>
<h3 id="273-حقول-المؤشرات-في-البنى"><a href="#_pointer_fields_in_structs"></a>2.7.3. حقول المؤشّرات في البنى</h3>
<p>يمكن أيضاً تعريف البنى بحيث تكون لها أنواع مؤشّرات كقيم حقول. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">personT</span> {</span>
    <span class="hljs-type">char</span> *name;     <span class="hljs-comment">// for a dynamically allocated string field</span>
    <span class="hljs-type">int</span>  age;
};

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">personT</span> <span class="hljs-title">p1</span>, *<span class="hljs-title">p2</span>;</span>

    <span class="hljs-comment">// need to malloc space for the name field:</span>
    p1.name = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>) * <span class="hljs-number">8</span>);
    <span class="hljs-built_in">strcpy</span>(p1.name, <span class="hljs-string">&quot;Zhichen&quot;</span>);
    p1.age = <span class="hljs-number">22</span>;

    <span class="hljs-comment">// first malloc space for the struct:</span>
    p2 = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">struct</span> personT));

    <span class="hljs-comment">// then malloc space for the name field:</span>
    p2-&gt;name = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>) * <span class="hljs-number">4</span>);
    <span class="hljs-built_in">strcpy</span>(p2-&gt;name, <span class="hljs-string">&quot;Vic&quot;</span>);
    p2-&gt;age = <span class="hljs-number">19</span>;
    ...

    <span class="hljs-comment">// Note: for strings, we must allocate one extra byte to hold the</span>
    <span class="hljs-comment">// terminating null character that marks the end of the string.</span>
}
</code></pre>
<p>في الذاكرة، ستبدو هذه المتغيّرات كما في <a href="#FigStructPointerField">الشكل 2</a> (لاحظ أي الأجزاء مخصَّص على المكدّس وأيها على الكومة).</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-1-structptrfield.webp" alt="Example struct with a pointer field type"> الشكل 2. تخطيط بنية ذات حقل مؤشّر في الذاكرة.</p>
<p>مع ازدياد تعقيد البنى وأنواع حقولها، كن حذراً في صياغتها. وللوصول إلى قيم الحقول على النحو المناسب، ابدأ من نوع المتغيّر الخارجي واستخدم صياغة نوعه للوصول إلى الأجزاء الفردية. فمثلاً، تحكم أنواع متغيّرات <code>struct</code> المعروضة في <a href="#TabStructFields">الجدول 1</a> كيفية وصول المبرمج إلى حقولها.</p>
<p><strong>الجدول 1. أمثلة على الوصول إلى حقول البنية</strong></p>
<p><strong>التعبير</strong></p>
<pre><code> p1
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> struct personT
</code></pre>
<p><strong>صياغة الوصول إلى الحقل</strong></p>
<pre><code> p1.age, p1.name
</code></pre>
<p><strong>التعبير</strong></p>
<pre><code> p2
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> struct personT *
</code></pre>
<p><strong>صياغة الوصول إلى الحقل</strong></p>
<pre><code> p2-&gt;age, p2-&gt;name
</code></pre>
<p>وعلاوةً على ذلك، تتيح معرفة أنواع قيم الحقول للبرنامج استخدام الصياغة الصحيحة في الوصول إليها، كما توضح الأمثلة في <a href="#TabStructFieldAccess">الجدول 2</a>.</p>
<p><strong>الجدول 2. الوصول إلى أنواع حقول بنية مختلفة</strong></p>
<p><strong>التعبير</strong></p>
<pre><code> p1.age
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> int
</code></pre>
<p><strong>صياغة الوصول المثالية</strong></p>
<pre><code> p1.age = 18;
</code></pre>
<p><strong>التعبير</strong></p>
<pre><code> p2-&gt;age
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> int
</code></pre>
<p><strong>صياغة الوصول المثالية</strong></p>
<pre><code> p2-&gt;age = 18;
</code></pre>
<p><strong>التعبير</strong></p>
<pre><code> p1.name
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> char *
</code></pre>
<p><strong>صياغة الوصول المثالية</strong></p>
<pre><code> printf(&quot;%s&quot;, p1.name);
</code></pre>
<p><strong>التعبير</strong></p>
<pre><code> p2-&gt;name
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> char *
</code></pre>
<p><strong>صياغة الوصول المثالية</strong></p>
<pre><code> printf(&quot;%s&quot;, p2-&gt;name);
</code></pre>
<p><strong>التعبير</strong></p>
<pre><code> p1.name[2]
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> char
</code></pre>
<p><strong>صياغة الوصول المثالية</strong></p>
<pre><code> p1.name[2] = 'a';
</code></pre>
<p><strong>التعبير</strong></p>
<pre><code> p2-&gt;name[2]
</code></pre>
<p><strong>النوع</strong></p>
<pre><code> char
</code></pre>
<p><strong>صياغة الوصول المثالية</strong></p>
<pre><code> p2-&gt;name[2] = 'a';
</code></pre>
<p>في فحص المثال الأخير، ابدأ بالتفكير في نوع المتغيّر الخارجي (<code>p2</code> مؤشّر إلى <code>struct personT</code>). لذا، للوصول إلى قيمة حقل في البنية، يحتاج المبرمج إلى استخدام صياغة <code>→</code> (<code>p2→name</code>). ثم تأمّل نوع الحقل <code>name</code>، وهو <code>char *</code> يستخدم في هذا البرنامج للإشارة إلى مصفوفة من قيم <code>char</code>. وللوصول إلى موقع تخزين <code>char</code> محدد عبر الحقل <code>name</code>، استخدم صياغة فهرسة المصفوفة: <code>p2→name[2] = 'a'</code>.</p>
<h3 id="274-مصفوفات-البنى"><a href="#_arrays_of_structs"></a>2.7.4. مصفوفات البنى</h3>
<p>يمكن دمج المصفوفات والمؤشّرات والبنى لإنشاء بنى بيانات أكثر تعقيداً. وفيما يلي بعض الأمثلة على الإعلان عن متغيّرات من أنواع مختلفة من مصفوفات البنى:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> <span class="hljs-title">classroom1</span>[40];</span>   <span class="hljs-comment">// an array of 40 struct studentT</span>

<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> *<span class="hljs-title">classroom2</span>;</span>      <span class="hljs-comment">// a pointer to a struct studentT</span>
                                  <span class="hljs-comment">// (for a dynamically allocated array)</span>

<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> *<span class="hljs-title">classroom3</span>[40];</span>  <span class="hljs-comment">// an array of 40 struct studentT *</span>
                                  <span class="hljs-comment">// (each element stores a (struct studentT *))</span>
</code></pre>
<p>ومرة أخرى، التفكير الدقيق جداً في أنواع المتغيّرات والحقول ضروري لفهم صياغة ودلالات استخدام هذه المتغيّرات في البرنامج. وفيما يلي بعض الأمثلة على الصياغة الصحيحة للوصول إلى هذه المتغيّرات:</p>
<pre><code class="language-c"><span class="hljs-comment">// classroom1 is an array:</span>
<span class="hljs-comment">//    use indexing to access a particular element</span>
<span class="hljs-comment">//    each element in classroom1 stores a struct studentT:</span>
<span class="hljs-comment">//    use dot notation to access fields</span>
classroom1[<span class="hljs-number">3</span>].age = <span class="hljs-number">21</span>;

<span class="hljs-comment">// classroom2 is a pointer to a struct studentT</span>
<span class="hljs-comment">//    call malloc to dynamically allocate an array</span>
<span class="hljs-comment">//    of 15 studentT structs for it to point to:</span>
classroom2 = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">struct</span> studentT) * <span class="hljs-number">15</span>);

<span class="hljs-comment">// each element in array pointed to by classroom2 is a studentT struct</span>
<span class="hljs-comment">//    use [] notation to access an element of the array, and dot notation</span>
<span class="hljs-comment">//    to access a particular field value of the struct at that index:</span>
classroom2[<span class="hljs-number">3</span>].year = <span class="hljs-number">2013</span>;

<span class="hljs-comment">// classroom3 is an array of struct studentT *</span>
<span class="hljs-comment">//    use [] notation to access a particular element</span>
<span class="hljs-comment">//    call malloc to dynamically allocate a struct for it to point to</span>
classroom3[<span class="hljs-number">5</span>] = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">struct</span> studentT));

<span class="hljs-comment">// access fields of the struct using -&gt; notation</span>
<span class="hljs-comment">// set the age field pointed to in element 5 of the classroom3 array to 21</span>
classroom3[<span class="hljs-number">5</span>]-&gt;age = <span class="hljs-number">21</span>;
</code></pre>
<p>قد تبدو دالة تأخذ مصفوفة من النوع <code>struct studentT</code> كوسيط هكذا:</p>
<pre><code class="language-c"><span class="hljs-type">void</span> <span class="hljs-title function_">updateAges</span><span class="hljs-params">(<span class="hljs-keyword">struct</span> studentT *classroom, <span class="hljs-type">int</span> size)</span> {
    <span class="hljs-type">int</span> i;

    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; size; i++) {
        classroom[i].age += <span class="hljs-number">1</span>;
    }
}
</code></pre>
<p>ويمكن لبرنامج تمرير مصفوفة من <code>struct studentT</code> معلَنة ساكنةً أو مخصَّصة ديناميكياً إلى هذه الدالة:</p>
<pre><code class="language-c">updateAges(classroom1, <span class="hljs-number">40</span>);
updateAges(classroom2, <span class="hljs-number">15</span>);
</code></pre>
<p>تطابق دلالات تمرير <code>classroom1</code> (أو <code>classroom2</code>) إلى <code>updateAges</code> دلالات تمرير مصفوفة معلَنة ساكنةً (أو مخصَّصة ديناميكياً) إلى دالة: إذ يشير الوسيط إلى مجموعة العناصر نفسها التي تشير إليها الوسيطة، وبالتالي تؤثر التغييرات في قيم المصفوفة داخل الدالة في عناصر الوسيطة.</p>
<p>يعرض <a href="#FigArrayStructFuncs">الشكل 3</a> كيف قد يبدو المكدّس في الاستدعاء الثاني للدالة <code>updateAges</code> (مع إظهار مصفوفة <code>classroom2</code> الممرَّرة بقيم حقول مثالية للبنية في كل عنصر من عناصرها).</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-2-arraystructfuncs.webp" alt="Main’s classroom2 variable points to an array of studentT structs on the heap. When classroom2 gets passed to updateAges, it makes a copy of the pointer, yielding another pointer that points to the same heap array."> الشكل 3. تخطيط الذاكرة لمصفوفة من بنى studentT مُرِّرت إلى دالة.</p>
<p>وكما هو الحال دائماً، يحصل الوسيط على نسخة من قيمة وسيطته (عنوان ذاكرة المصفوفة في ذاكرة الكومة). وبالتالي، فإن تعديل عناصر المصفوفة في الدالة يبقى في قيم وسيطته (فالوسيط والوسيطة يشيران إلى المصفوفة نفسها في الذاكرة).</p>
<p>لا يمكن تمرير مصفوفة <code>classroom3</code> إلى الدالة <code>updateAges</code> لأن نوعها ليس نوع وسيط الدالة نفسه: فـ <code>classroom3</code> مصفوفة من <code>struct studentT *</code> لا مصفوفة من <code>struct studentT</code>.</p>
<h3 id="275-البنى-ذاتية-الإشارة"><a href="#_self_referential_structs"></a>2.7.5. البنى ذاتية الإشارة</h3>
<p>يمكن تعريف بنية بحقول نوعها مؤشّر إلى نوع <code>struct</code> نفسه. ويمكن استخدام أنواع <code>struct</code> ذاتية الإشارة هذه لبناء تنفيذات مترابطة لبنى البيانات، مثل القوائم المترابطة والأشجار والرسوم البيانية.</p>
<p>تفاصيل أنواع البيانات هذه وتنفيذاتها المترابطة خارج نطاق هذا الكتاب. غير أننا نعرض بإيجاز مثالاً واحداً على كيفية تعريف نوع <code>struct</code> ذاتي الإشارة واستخدامه لإنشاء قائمة مترابطة في C. راجع كتاباً عن بنى البيانات والخوارزميات لمزيد من المعلومات عن القوائم المترابطة.</p>
<p><strong>القائمة المترابطة</strong> (linked list) إحدى طرق تنفيذ <strong>نوع البيانات المجرّد «قائمة»</strong>. وتمثّل القائمة تسلسلاً من العناصر مرتبةً بموضعها في القائمة. وفي C، يمكن تنفيذ بنية بيانات القائمة كمصفوفة أو كقائمة مترابطة باستخدام نوع <code>struct</code> ذاتي الإشارة لتخزين العقد الفردية في القائمة.</p>
<p>ولبناء الأخيرة، يعرّف المبرمج بنية <code>node</code> تحتوي عنصر قائمة واحداً ورابطاً إلى العقدة التالية في القائمة. وفيما يلي مثال يمكنه تخزين قائمة مترابطة من القيم الصحيحة:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">node</span> {</span>
    <span class="hljs-type">int</span> data;           <span class="hljs-comment">// used to store a list element&#x27;s data value</span>
    <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">node</span> *<span class="hljs-title">next</span>;</span>  <span class="hljs-comment">// used to point to the next node in the list</span>
};
</code></pre>
<p>يمكن ربط نسخ هذا النوع <code>struct</code> معاً عبر الحقل <code>next</code> لإنشاء قائمة مترابطة.</p>
<p>ينشئ مقتطف الشيفرة المثال هذا قائمة مترابطة تحتوي ثلاثة عناصر (ويُشار إلى القائمة نفسها بالمتغيّر <code>head</code> الذي يشير إلى العقدة الأولى في القائمة):</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">node</span> *<span class="hljs-title">head</span>, *<span class="hljs-title">temp</span>;</span>
<span class="hljs-type">int</span> i;

head = <span class="hljs-literal">NULL</span>;  <span class="hljs-comment">// an empty linked list</span>

head = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">struct</span> node));  <span class="hljs-comment">// allocate a node</span>
<span class="hljs-keyword">if</span> (head == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error malloc\\n&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
}
head-&gt;data = <span class="hljs-number">10</span>;    <span class="hljs-comment">// set the data field</span>
head-&gt;next = <span class="hljs-literal">NULL</span>;  <span class="hljs-comment">// set next to NULL (there is no next element)</span>

<span class="hljs-comment">// add 2 more nodes to the head of the list:</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2</span>; i++) {
    temp = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-keyword">struct</span> node));  <span class="hljs-comment">// allocate a node</span>
    <span class="hljs-keyword">if</span> (temp == <span class="hljs-literal">NULL</span>) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error malloc\\n&quot;</span>);
        <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
    }
    temp-&gt;data = i;     <span class="hljs-comment">// set data field</span>
    temp-&gt;next = head;  <span class="hljs-comment">// set next to point to current first node</span>
    head = temp;        <span class="hljs-comment">// change head to point to newly added node</span>
}
</code></pre>
<p>لاحظ أن المتغيّر <code>temp</code> يشير مؤقتاً إلى <code>node</code> مخصَّصة بـ malloc تُهيَّأ ثم تُضاف إلى بداية القائمة بضبط حقلها <code>next</code> ليشير إلى العقدة التي يشير إليها حالياً <code>head</code>، ثم بتغيير <code>head</code> ليشير إلى هذه العقدة الجديدة.</p>
<p>ستبدو نتيجة تنفيذ هذه الشيفرة في الذاكرة كما في <a href="#FigLinkedList">الشكل 4</a>.</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-3-linkedlist.webp" alt="Two stack variables, head and temp, contain the address of the first node on the heap. The first node’s next field points to the second node, whose next field points to the third. The third node’s next pointer is null, indicating the end of the list."> الشكل 4. تخطيط ثلاث عقد مثال لقائمة مترابطة في الذاكرة.</p>
<p>تدعم C دوالاً كثيرة لتنفيذ الإدخال/الإخراج القياسي وإدخال/إخراج الملفات. ونناقش في هذا القسم بعض الواجهات الأكثر استخداماً للإدخال/الإخراج في C.</p>
<h3 id="281-الإدخالالإخراج-القياسي"><a href="#_standard_inputoutput"></a>2.8.1. الإدخال/الإخراج القياسي</h3>
<p>يبدأ كل برنامج قيد التشغيل بثلاثة تدفقات إدخال/إخراج افتراضية: المخرج القياسي (<code>stdout</code>)، والدخل القياسي (<code>stdin</code>)، والخطأ القياسي (<code>stderr</code>). ويمكن للبرنامج كتابة (طباعة) الإخراج إلى <code>stdout</code> و<code>stderr</code>، ويمكنه قراءة قيم الإدخال من <code>stdin</code>. ويُعرَّف <code>stdin</code> عادةً لقراءة الإدخال من لوحة المفاتيح، بينما يُخرج <code>stdout</code> و<code>stderr</code> إلى الطرفية.</p>
<p>توفّر مكتبة <code>stdio.h</code> في C الدالة <code>printf</code> المستخدمة للطباعة إلى المخرج القياسي والدالة <code>scanf</code> التي يمكن استخدامها لقراءة القيم من الدخل القياسي. وتمتلك C أيضاً دوالاً لقراءة وكتابة محرف واحد في كل مرة (<code>getchar</code> و<code>putchar</code>)، إضافة إلى دوال ومكتبات أخرى لقراءة وكتابة المحارف إلى تدفقات الإدخال/الإخراج القياسية. ويجب على برنامج C تضمين <code>stdio.h</code> صراحةً لاستدعاء هذه الدوال.</p>
<p>يمكنك تغيير الموقع الذي يقرأ منه <code>stdin</code> و<code>stdout</code> و/أو <code>stderr</code> في برنامج قيد التشغيل أو يكتب إليه. وإحدى طرق فعل ذلك إعادة توجيه واحد منها أو كلها للقراءة من ملف أو الكتابة إليه. وفيما يلي بعض أوامر الصدفة المثالية لإعادة توجيه <code>stdin</code> أو <code>stdout</code> أو <code>stderr</code> في برنامج إلى ملف (حيث <code>$</code> هو موجّه الصدفة):</p>
<pre><code class="language-bash"><span class="hljs-comment">#  redirect a.out&#x27;s stdin to read from file infile.txt:</span>
$ ./a.out &lt; infile.txt

<span class="hljs-comment">#  redirect a.out&#x27;s stdout to print to file outfile.txt:</span>
$ ./a.out &gt; outfile.txt

<span class="hljs-comment"># redirect a.out&#x27;s stdout and stderr to a file out.txt</span>
$ ./a.out &amp;&gt; outfile.txt

<span class="hljs-comment"># redirect all three to different files:</span>
<span class="hljs-comment">#   (&lt; redirects stdin, 1&gt; stdout, and 2&gt; stderr):</span>
$ ./a.out &lt; infile.txt 1&gt; outfile.txt 2&gt; errorfile.txt
</code></pre>
<h4><a href="#_printf"></a>printf</h4>
<p>تشبه دالة <code>printf</code> في C استدعاءات <code>print</code> المنسّقة في Python، حيث يحدد المستدعي سلسلة تنسيق للطباعة. وغالباً ما تحتوي سلسلة التنسيق على محددات تنسيق خاصة، منها محارف خاصة تطبع علامات جدولة (<code>\\t</code>) أو أسطراً جديدة (<code>\\n</code>)، أو تحدد عناصر نائبة للقيم في الإخراج (<code>%</code> متبوعاً بمحدد نوع). وعند إضافة عناصر نائبة في سلسلة تنسيق تُمرَّر إلى <code>printf</code>، مرّر قيمها المقابلة كوسائط إضافية بعد سلسلة التنسيق. وفيما يلي بعض الاستدعاءات المثالية لـ <code>printf</code>:</p>
<p>printf.c</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x = <span class="hljs-number">5</span>, y = <span class="hljs-number">10</span>;
<span class="hljs-type">float</span> pi = <span class="hljs-number">3.14</span>;

<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;x is %d and y is %d\\n&quot;</span>, x, y);

<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%g \\t %s \\t %d\\n&quot;</span>, pi, <span class="hljs-string">&quot;hello&quot;</span>, y);
</code></pre>
<p>وعند التشغيل، تُخرج عبارات <code>printf</code> هذه:</p>
<pre><code>x is 5 and y is 10
3.14 	 hello 	 10
</code></pre>
<p>لاحظ كيف تُطبع محارف الجدولة (<code>\\t</code>) في الاستدعاء الثاني، واختلاف العناصر النائبة للتنسيق باختلاف أنواع القيم (<code>%g</code> و<code>%s</code> و<code>%d</code>).</p>
<p>وفيما يلي مجموعة من العناصر النائبة للتنسيق لأنواع C الشائعة. لاحظ أن العناصر النائبة لقيم <code>long</code> و<code>long long</code> تتضمن بادئة <code>l</code> أو <code>ll</code>.</p>
<pre><code class="language-c">%f, %g: placeholders <span class="hljs-keyword">for</span> a <span class="hljs-type">float</span> or <span class="hljs-type">double</span> value
%d:     placeholder <span class="hljs-keyword">for</span> a decimal <span class="hljs-title function_">value</span> <span class="hljs-params">(<span class="hljs-type">char</span>, <span class="hljs-type">short</span>, <span class="hljs-type">int</span>)</span>
%u:     placeholder <span class="hljs-keyword">for</span> an <span class="hljs-type">unsigned</span> decimal
%c:     placeholder <span class="hljs-keyword">for</span> a single character
%s:     placeholder <span class="hljs-keyword">for</span> a <span class="hljs-built_in">string</span> value
%p:     placeholder to print an address value

%ld:    placeholder <span class="hljs-keyword">for</span> a <span class="hljs-type">long</span> value
%lu:    placeholder <span class="hljs-keyword">for</span> an <span class="hljs-type">unsigned</span> <span class="hljs-type">long</span> value
%lld:   placeholder <span class="hljs-keyword">for</span> a <span class="hljs-type">long</span> <span class="hljs-type">long</span> value
%llu:   placeholder <span class="hljs-keyword">for</span> an <span class="hljs-type">unsigned</span> <span class="hljs-type">long</span> <span class="hljs-type">long</span>  value
</code></pre>
<p>وفيما يلي بعض الأمثلة على استخدامها:</p>
<pre><code class="language-c"><span class="hljs-type">float</span> <span class="hljs-built_in">labs</span>;
<span class="hljs-type">int</span> midterm;

<span class="hljs-built_in">labs</span> = <span class="hljs-number">93.8</span>;
midterm = <span class="hljs-number">87</span>;

<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Hello %s, here are your grades so far:\\n&quot;</span>, <span class="hljs-string">&quot;Tanya&quot;</span>);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\t midterm: %d (out of %d)\\n&quot;</span>, midterm, <span class="hljs-number">100</span>);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\t lab ave: %f\\n&quot;</span>, <span class="hljs-built_in">labs</span>);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\t final report: %c\\n&quot;</span>, <span class="hljs-string">&#x27;A&#x27;</span>);
</code></pre>
<p>وعند التشغيل، سيبدو الناتج هكذا:</p>
<pre><code>Hello Tanya, here are your grades so far:
	 midterm: 87 (out of 100)
	 lab ave: 93.800003
	 final report: A
</code></pre>
<p>تتيح لك C أيضاً تحديد عرض الحقل مع العناصر النائبة للتنسيق. وفيما يلي بعض الأمثلة:</p>
<pre><code class="language-c">%<span class="hljs-number">5.3f</span>: print <span class="hljs-type">float</span> value in space <span class="hljs-number">5</span> chars wide, with <span class="hljs-number">3</span> places beyond decimal
%<span class="hljs-number">20</span>s:  print the <span class="hljs-built_in">string</span> value in a field of <span class="hljs-number">20</span> chars wide, right justified
%<span class="hljs-number">-20</span>s: print the <span class="hljs-built_in">string</span> value in a field of <span class="hljs-number">20</span> chars wide, left justified
%<span class="hljs-number">8</span>d:   print the <span class="hljs-type">int</span> value in a field of <span class="hljs-number">8</span> chars wide, right justified
%<span class="hljs-number">-8</span>d:  print the <span class="hljs-type">int</span> value in a field of <span class="hljs-number">8</span> chars wide, left justified
</code></pre>
<p>وفيما يلي مثال أكبر يستخدم محددات عرض الحقل مع العناصر النائبة في سلسلة التنسيق:</p>
<p>printf_format.c</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span> <span class="hljs-comment">// library needed for printf</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">float</span> x, y;
    <span class="hljs-type">char</span> ch;

    x = <span class="hljs-number">4.50001</span>;
    y = <span class="hljs-number">5.199999</span>;
    ch = <span class="hljs-string">&#x27;a&#x27;</span>;      <span class="hljs-comment">// ch stores ASCII value of &#x27;a&#x27; (the value 97)</span>

    <span class="hljs-comment">// .1: print x and y with single precision</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%.1f %.1f\\n&quot;</span>, x, y);

    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%6.1f \\t %6.1f \\t %c\\n&quot;</span>, x, y, ch);

    <span class="hljs-comment">// ch+1 is 98, the ASCII value of &#x27;b&#x27;</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%6.1f \\t %6.1f \\t %c\\n&quot;</span>, x+<span class="hljs-number">1</span>, y+<span class="hljs-number">1</span>, ch+<span class="hljs-number">1</span>);

    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%6.1f \\t %6.1f \\t %c\\n&quot;</span>, x*<span class="hljs-number">20</span>, y*<span class="hljs-number">20</span>, ch+<span class="hljs-number">2</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>وعند التشغيل، يبدو ناتج البرنامج هكذا:</p>
<pre><code>4.5 5.2
   4.5 	    5.2 	 a
   5.5 	    6.2 	 b
  90.0 	  104.0 	 c
</code></pre>
<p>لاحظ كيف يؤدي استخدام علامات الجدولة وعرض الحقل في عبارات <code>printf</code> الثلاث الأخيرة إلى إخراج جدولي.</p>
<p>وأخيراً، تعرّف C عناصر نائبة لعرض القيم بتمثيلات مختلفة:</p>
<pre><code class="language-c">%x:     print value in <span class="hljs-title function_">hexadecimal</span> <span class="hljs-params">(base <span class="hljs-number">16</span>)</span>
%o:     print value in <span class="hljs-title function_">octal</span> <span class="hljs-params">(base <span class="hljs-number">8</span>)</span>
%d:     print value in <span class="hljs-type">signed</span> <span class="hljs-title function_">decimal</span>  <span class="hljs-params">(base <span class="hljs-number">10</span>)</span>
%u:     print value in <span class="hljs-type">unsigned</span> <span class="hljs-title function_">decimal</span> <span class="hljs-params">(<span class="hljs-type">unsigned</span> base <span class="hljs-number">10</span>)</span>
%e:     print <span class="hljs-type">float</span> or <span class="hljs-type">double</span> in scientific <span class="hljs-title function_">notation</span>
<span class="hljs-params">(there is no formatting option to display a value in binary)</span>
</code></pre>
<p>وفيما يلي مثال يستخدم عناصر نائبة لطباعة القيم بتمثيلات مختلفة:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x;
<span class="hljs-type">char</span> ch;

x = <span class="hljs-number">26</span>;
ch = <span class="hljs-string">&#x27;A&#x27;</span>;

<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;x is %d in decimal, %x in hexadecimal and %o in octal\\n&quot;</span>, x, x, x);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;ch value is %d which is the ASCII value of  %c\\n&quot;</span>, ch, ch);
</code></pre>
<p>وعند التشغيل، يبدو ناتج البرنامج هكذا:</p>
<pre><code>x is 26 in decimal, 1a in hexadecimal and 32 in octal
ch value is 65 which is the ASCII value of  A
</code></pre>
<h4><a href="#_scanf"></a>scanf</h4>
<p>توفّر الدالة <code>scanf</code> طريقة لقراءة القيم من <code>stdin</code> (عادةً من المستخدم الذي يدخلها عبر لوحة المفاتيح) وتخزينها في متغيّرات البرنامج. والدالة <code>scanf</code> صارمة بعض الشيء بشأن الصيغة الدقيقة التي يدخل بها المستخدم البيانات، ما قد يجعلها حساسة لإدخال المستخدم السيئ التكوين.</p>
<p>تشبه وسائط الدالة <code>scanf</code> وسائط <code>printf</code>: تأخذ <code>scanf</code> سلسلة تنسيق تحدد عدد قيم الإدخال المراد قراءتها ونوعها، تتبعها <em>مواقع</em> متغيّرات البرنامج التي ينبغي تخزين القيم فيها. وكثيراً ما تجمع البرامج بين معامل <em>عنوان</em> (<code>&amp;</code>) واسم متغيّر لإنتاج موقع المتغيّر في ذاكرة البرنامج — أي عنوان الذاكرة الخاص بالمتغيّر. وفيما يلي استدعاء مثال لـ <code>scanf</code> يقرأ قيمتين (<code>int</code> و<code>float</code>):</p>
<p>scanf_ex.c</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x;
<span class="hljs-type">float</span> pi;

<span class="hljs-comment">// read in an int value followed by a float value (&quot;%d%g&quot;)</span>
<span class="hljs-comment">// store the int value at the memory location of x (&amp;x)</span>
<span class="hljs-comment">// store the float value at the memory location of pi (&amp;pi)</span>
<span class="hljs-built_in">scanf</span>(<span class="hljs-string">&quot;%d%g&quot;</span>, &amp;x, &amp;pi);
</code></pre>
<p>يجب فصل قيم الإدخال الفردية بمحرف مسافة بيضاء واحد على الأقل (مثل المسافات وعلامات الجدولة والأسطر الجديدة). غير أن <code>scanf</code> تتجاوز محارف المسافات البيضاء البادئة واللاحقة أثناء إيجادها بداية كل قيمة حرفية عددية ونهايتها. ونتيجةً لذلك، يمكن للمستخدم إدخال القيمتين 8 و3.14 بأي مقدار من المسافات البيضاء قبلهما أو بعدهما (ومحرف مسافة بيضاء واحد أو أكثر بينهما)، وستقرأ <code>scanf</code> دائماً 8 وتسنِدها إلى <code>x</code>، وتقرأ 3.14 وتسنِدها إلى <code>pi</code>. فمثلاً، هذا الإدخال بمسافات كثيرة بين القيمتين سيؤدي إلى قراءة 8 وتخزينها في <code>x</code>، و3.14 وتخزينها في <code>pi</code>:</p>
<pre><code>           8                   3.14
</code></pre>
<p>كثيراً ما يكتب المبرمجون سلاسل تنسيق لـ <code>scanf</code> تتألف فقط من محددات العناصر النائبة دون أي محارف أخرى بينها. ولقراءة العددين أعلاه، قد تبدو سلسلة التنسيق هكذا:</p>
<pre><code class="language-c"><span class="hljs-comment">// read in an int and a float separated by at least one white space character</span>
<span class="hljs-built_in">scanf</span>(<span class="hljs-string">&quot;%d%g&quot;</span>,&amp;x, &amp;pi);
</code></pre>
<h4><a href="#_getchar_and_putchar"></a>getchar وputchar</h4>
<p>تقرأ الدالتان <code>getchar</code> و<code>putchar</code> في C وتكتبان على التوالي قيمة محرف واحد من <code>stdin</code> وإلى <code>stdout</code>. وتُفيد <code>getchar</code> بوجه خاص في برامج C التي تحتاج إلى دعم كشف الأخطاء ومعالجة إدخال المستخدم السيئ التكوين بعناية (فـ <code>scanf</code> ليست متينة بهذه الطريقة).</p>
<pre><code class="language-c">ch = getchar();  <span class="hljs-comment">// read in the next char value from stdin</span>
<span class="hljs-built_in">putchar</span>(ch);     <span class="hljs-comment">// write the value of ch to stdout</span>
</code></pre>
<h3 id="282-إدخالإخراج-الملفات"><a href="#_file_inputoutput"></a>2.8.2. إدخال/إخراج الملفات</h3>
<p>تتضمن مكتبة الإدخال/الإخراج القياسية في C (<code>stdio.h</code>) واجهة تدفق (stream) لإدخال/إخراج الملفات. ويخزّن <strong>الملف</strong> (file) بيانات دائمة: أي بيانات تبقى بعد تنفيذ البرنامج الذي أنشأها. ويمثّل الملف النصي تدفقاً من المحارف، ويتتبع كل ملف مفتوح موضعه الحالي في تدفق المحارف. وعند فتح ملف، يبدأ الموضع الحالي من أول محرف في الملف، ويتحرك نتيجة كل محرف يُقرأ (أو يُكتب) في الملف. ولقراءة المحرف العاشر في ملف، يجب أولاً قراءة المحارف التسعة الأولى (أو نقل الموضع الحالي صراحةً إلى المحرف العاشر باستخدام الدالة <code>fseek</code>).</p>
<p>ترى واجهة ملفات C الملف كتدفق إدخال أو إخراج، وتقرأ دوال المكتبة من الموضع التالي في تدفق الملف أو تكتب إليه. وتقوم الدالتان <code>fprintf</code> و<code>fscanf</code> مقام نظيرَي إدخال/إخراج الملفات للدالتين <code>printf</code> و<code>scanf</code>. وهما تستخدمان سلسلة تنسيق لتحديد ما يُكتب أو يُقرأ، وتتضمنان وسائط توفّر قيماً أو مساحة تخزين للبيانات التي تُكتب أو تُقرأ. وبالمثل، توفّر المكتبة الدوال <code>fputc</code> و<code>fgetc</code> و<code>fputs</code> و<code>fgets</code> لقراءة وكتابة محارف أو سلاسل نصية فردية إلى تدفقات الملفات. ورغم وجود مكتبات كثيرة تدعم إدخال/إخراج الملفات في C، فإننا نعرض بالتفصيل واجهة تدفق مكتبة <code>stdio.h</code> للملفات النصية فقط.</p>
<p>قد تحتوي الملفات النصية على محارف خاصة مثل تدفقي <code>stdin</code> و<code>stdout</code>: أسطر جديدة (<code>'\\n'</code>) وعلامات جدولة (<code>'\\t'</code>) وغيرها. وإضافةً إلى ذلك، عند الوصول إلى نهاية بيانات ملف، تولّد مكتبة الإدخال/الإخراج في C محرف نهاية ملف خاصاً (<code>EOF</code>)، يمثّل نهاية الملف. ويمكن للدوال التي تقرأ من ملف اختبار <code>EOF</code> لتحديد متى وصلت إلى نهاية تدفق الملف.</p>
<h3 id="283-استخدام-الملفات-النصية-في-c"><a href="#_using_text_files_in_c"></a>2.8.3. استخدام الملفات النصية في C</h3>
<p>لقراءة ملف في C أو الكتابة إليه، اتبع هذه الخطوات:</p>
<p><em>أعلن</em> عن متغيّر <code>FILE *</code>:</p>
<pre><code class="language-c">FILE *infile;
FILE *outfile;
</code></pre>
<p>تنشئ هذه الإعلانات متغيّرات مؤشّرات إلى نوع <code>FILE *</code> معرَّف في المكتبة. ولا يمكن إلغاء الإشارة إلى هذه المؤشّرات في برنامج تطبيقي. وبدلاً من ذلك، تشير إلى تدفق ملف محدد عند تمريرها إلى دوال مكتبة الإدخال/الإخراج.</p>
<p><em>افتح</em> الملف: اربط المتغيّر بتدفق ملف فعلي باستدعاء <code>fopen</code>. وعند فتح ملف، يحدد وسيط <em>الوضع</em> ما إذا كان البرنامج يفتحه للقراءة (<code>&quot;r&quot;</code>) أو الكتابة (<code>&quot;w&quot;</code>) أو الإلحاق (<code>&quot;a&quot;</code>):</p>
<pre><code class="language-c">infile = fopen(<span class="hljs-string">&quot;input.txt&quot;</span>, <span class="hljs-string">&quot;r&quot;</span>);  <span class="hljs-comment">// relative path name of file, read mode</span>
<span class="hljs-keyword">if</span> (infile == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: unable to open file %s\\n&quot;</span>, <span class="hljs-string">&quot;input.txt&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
}

<span class="hljs-comment">// fopen with absolute path name of file, write mode</span>
outfile = fopen(<span class="hljs-string">&quot;/home/me/output.txt&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>);
<span class="hljs-keyword">if</span> (outfile == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: unable to open outfile\\n&quot;</span>);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
}
</code></pre>
<p>ترجع الدالة <code>fopen</code> القيمة <code>NULL</code> للإبلاغ عن الأخطاء، وقد تحدث الأخطاء إذا أُعطي اسم ملف غير صالح أو لم يكن للمستخدم إذن بفتح الملف المحدد (مثلاً، عدم امتلاك أذونات كتابة لملف <code>output.txt</code>).</p>
<p><em>استخدم</em> عمليات الإدخال/الإخراج للقراءة أو الكتابة أو نقل الموضع الحالي في الملف:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> ch;  <span class="hljs-comment">// EOF is not a char value, but is an int.</span>
         <span class="hljs-comment">// since all char values can be stored in int, use int for ch</span>

ch = getc(infile);      <span class="hljs-comment">// read next char from the infile stream</span>
<span class="hljs-keyword">if</span> (ch != EOF) {
    putc(ch, outfile);  <span class="hljs-comment">// write char value to the outfile stream</span>
}
</code></pre>
<p><em>أغلق</em> الملف: استخدم <code>fclose</code> لإغلاق الملف عندما لا يعود البرنامج بحاجة إليه:</p>
<pre><code class="language-c">fclose(infile);
fclose(outfile);
</code></pre>
<p>توفّر مكتبة <code>stdio</code> أيضاً دوالاً لتغيير الموضع الحالي في ملف:</p>
<pre><code class="language-c"><span class="hljs-comment">// to reset current position to beginning of file</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">rewind</span><span class="hljs-params">(FILE *f)</span>;

rewind(infile);

<span class="hljs-comment">// to move to a specific location in the file:</span>
fseek(FILE *f, <span class="hljs-type">long</span> offset, <span class="hljs-type">int</span> whence);

fseek(f, <span class="hljs-number">0</span>, SEEK_SET);    <span class="hljs-comment">// seek to the beginning of the file</span>
fseek(f, <span class="hljs-number">3</span>, SEEK_CUR);    <span class="hljs-comment">// seek 3 chars forward from the current position</span>
fseek(f, <span class="hljs-number">-3</span>, SEEK_END);   <span class="hljs-comment">// seek 3 chars back from the end of the file</span>
</code></pre>
<h3 id="284-دوال-الإدخالالإخراج-القياسية-وللملفات-في-stdioh"><a href="#_standard_and_file_io_functions_in_stdio_h"></a>2.8.4. دوال الإدخال/الإخراج القياسية وللملفات في <code>stdio.h</code></h3>
<p>تحتوي مكتبة <code>stdio.h</code> في C على دوال كثيرة للقراءة والكتابة في الملفات وإلى التدفقات القياسية الشبيهة بالملفات (<code>stdin</code> و<code>stdout</code> و<code>stderr</code>). ويمكن تصنيف هذه الدوال إلى دوال إدخال/إخراج محرفية وسلسلية ومنسّقة. وباختصار، فيما يلي بعض التفاصيل الإضافية عن مجموعة فرعية من هذه الدوال:</p>
<pre><code class="language-python">// ---------------
// Character Based
// ---------------

// returns the <span class="hljs-built_in">next</span> character <span class="hljs-keyword">in</span> the file stream (EOF <span class="hljs-keyword">is</span> an <span class="hljs-built_in">int</span> value)
<span class="hljs-built_in">int</span> fgetc(FILE *f);

// writes the char value c to the file stream f
// returns the char value written
<span class="hljs-built_in">int</span> fputc(<span class="hljs-built_in">int</span> c, FILE *f);

// pushes the character c back onto the file stream
// at most one char (<span class="hljs-keyword">and</span> <span class="hljs-keyword">not</span> EOF) can be pushed back
<span class="hljs-built_in">int</span> ungetc(<span class="hljs-built_in">int</span> c, FILE *f);

// like fgetc <span class="hljs-keyword">and</span> fputc but <span class="hljs-keyword">for</span> stdin <span class="hljs-keyword">and</span> stdout
<span class="hljs-built_in">int</span> getchar();
<span class="hljs-built_in">int</span> putchar(<span class="hljs-built_in">int</span> c);

// -------------
// String  Based
// -------------

// reads at most n-<span class="hljs-number">1</span> characters into the array s stopping <span class="hljs-keyword">if</span> a newline <span class="hljs-keyword">is</span>
// encountered, newline <span class="hljs-keyword">is</span> included <span class="hljs-keyword">in</span> the array which <span class="hljs-keyword">is</span> <span class="hljs-string">&#x27;\\0&#x27;</span> terminated
char *fgets(char *s, <span class="hljs-built_in">int</span> n, FILE *f);

// writes the string s (make sure <span class="hljs-string">&#x27;\\0&#x27;</span> terminated) to the file stream f
<span class="hljs-built_in">int</span> fputs(char *s, FILE *f);

// ---------
// Formatted
// ---------

// writes the contents of the <span class="hljs-built_in">format</span> string to file stream f
//   (<span class="hljs-keyword">with</span> placeholders filled <span class="hljs-keyword">in</span> <span class="hljs-keyword">with</span> subsequent argument values)
// returns the number of characters printed
<span class="hljs-built_in">int</span> fprintf(FILE *f, char *<span class="hljs-built_in">format</span>, ...);

// like fprintf but to stdout
<span class="hljs-built_in">int</span> printf(char *<span class="hljs-built_in">format</span>, ...);

// use fprintf to <span class="hljs-built_in">print</span> stderr:
fprintf(stderr, <span class="hljs-string">&quot;Error return value: %d\\n&quot;</span>, ret);

// read values specified <span class="hljs-keyword">in</span> the <span class="hljs-built_in">format</span> string <span class="hljs-keyword">from</span> file stream f
//   store the read-<span class="hljs-keyword">in</span> values to program storage locations of types
//   matching the <span class="hljs-built_in">format</span> string
// returns number of <span class="hljs-built_in">input</span> items converted <span class="hljs-keyword">and</span> assigned
//   <span class="hljs-keyword">or</span> EOF on error <span class="hljs-keyword">or</span> <span class="hljs-keyword">if</span> EOF was reached
<span class="hljs-built_in">int</span> fscanf(FILE *f, char *<span class="hljs-built_in">format</span>, ...);

// like fscanf but reads <span class="hljs-keyword">from</span> stdin
<span class="hljs-built_in">int</span> scanf(char *<span class="hljs-built_in">format</span>, ...);
</code></pre>
<p>بشكل عام، تكون <code>scanf</code> و<code>fscanf</code> حساسة للإدخال السيئ التكوين. غير أنه في إدخال/إخراج الملفات، كثيراً ما يستطيع المبرمج افتراض أن ملف الإدخال منسّق جيداً، لذا قد تكون <code>fscanf</code> متينة بما يكفي في مثل هذه الحالات. أما مع <code>scanf</code>، فسيؤدي إدخال المستخدم السيئ التكوين في الغالب إلى انهيار البرنامج. وقراءة محرف واحد في كل مرة مع تضمين شيفرة لاختبار القيم قبل تحويلها إلى أنواع مختلفة أكثر متانة، لكنها تتطلب من المبرمج تنفيذ وظائف إدخال/إخراج أكثر تعقيداً.</p>
<p>يمكن أن تتضمن سلسلة تنسيق <code>fscanf</code> الصياغة التالية التي تحدد أنواعاً مختلفة من القيم وطرقاً مختلفة للقراءة من تدفق الملف:</p>
<pre><code class="language-c">%d integer
%f <span class="hljs-type">float</span>
%lf <span class="hljs-type">double</span>
%c character
%s <span class="hljs-built_in">string</span>, up to first white space

%[...] <span class="hljs-built_in">string</span>, up to first character not in brackets
%[<span class="hljs-number">0123456789</span>] would read in digits
%[^...] <span class="hljs-built_in">string</span>, up to first character in brackets
%[^\\n] would read everything up to a newline
</code></pre>
<p>قد يكون من الصعب ضبط سلسلة تنسيق <code>fscanf</code> بشكل صحيح، خصوصاً عند قراءة مزيج من الأنواع العددية والسلسلية أو المحرفية من ملف.</p>
<p>وفيما يلي بضعة استدعاءات مثالية لـ <code>fscanf</code> (وواحد لـ <code>fprintf</code>) بسلاسل تنسيق مختلفة (لنفترض أن استدعاءات <code>fopen</code> أعلاه نُفِّذت بنجاح):</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x;
<span class="hljs-type">double</span> d;
<span class="hljs-type">char</span> c, <span class="hljs-built_in">array</span>[MAX];

<span class="hljs-comment">// write int &amp; char values to file separated by colon with newline at the end</span>
<span class="hljs-built_in">fprintf</span>(outfile, <span class="hljs-string">&quot;%d:%c\\n&quot;</span>, x, c);

<span class="hljs-comment">// read an int &amp; char from file where int and char are separated by a comma</span>
<span class="hljs-built_in">fscanf</span>(infile, <span class="hljs-string">&quot;%d,%c&quot;</span>, &amp;x, &amp;c);

<span class="hljs-comment">// read a string from a file into array (stops reading at whitespace char)</span>
<span class="hljs-built_in">fscanf</span>(infile,<span class="hljs-string">&quot;%s&quot;</span>, <span class="hljs-built_in">array</span>);

<span class="hljs-comment">// read a double and a string up to 24 chars from infile</span>
<span class="hljs-built_in">fscanf</span>(infile, <span class="hljs-string">&quot;%lf %24s&quot;</span>, &amp;d, <span class="hljs-built_in">array</span>);

<span class="hljs-comment">// read in a string consisting of only char values in the specified set (0-5)</span>
<span class="hljs-comment">// stops reading when...</span>
<span class="hljs-comment">//   20 chars have been read OR</span>
<span class="hljs-comment">//   a character not in the set is reached OR</span>
<span class="hljs-comment">//   the file stream reaches end-of-file (EOF)</span>
<span class="hljs-built_in">fscanf</span>(infile, <span class="hljs-string">&quot;%20[012345]&quot;</span>, <span class="hljs-built_in">array</span>);

<span class="hljs-comment">// read in a string; stop when reaching a punctuation mark from the set</span>
<span class="hljs-built_in">fscanf</span>(infile, <span class="hljs-string">&quot;%[^.,:!;]&quot;</span>, <span class="hljs-built_in">array</span>);

<span class="hljs-comment">// read in two integer values: store first in long, second in int</span>
<span class="hljs-comment">// then read in a char value following the int value</span>
<span class="hljs-built_in">fscanf</span>(infile, <span class="hljs-string">&quot;%ld %d%c&quot;</span>, &amp;x, &amp;b, &amp;c);
</code></pre>
<p>في المثال الأخير أعلاه، تقرأ سلسلة التنسيق صراحةً قيمة محرف بعد عدد لضمان تقدّم الموضع الحالي لتدفق الملف تقدماً صحيحاً لأي استدعاءات لاحقة لـ <code>fscanf</code>. فمثلاً، كثيراً ما يُستخدم هذا النمط لقراءة محرف مسافة بيضاء (مثل '\\n') صراحةً (والتخلص منه)، لضمان أن يبدأ الاستدعاء التالي لـ <code>fscanf</code> من السطر التالي في الملف. وتكون قراءة محرف إضافي ضرورية إذا حاول الاستدعاء <em>التالي</em> لـ <code>fscanf</code> قراءة قيمة محرف. وإلا، فبعدم استهلاك محرف السطر الجديد، سيقرأ الاستدعاء التالي لـ <code>fscanf</code> محرف السطر الجديد بدلاً من المحرف المقصود. أما إذا قرأ الاستدعاء التالي قيمة عددية، فسيُتخلص تلقائياً من محارف المسافات البيضاء البادئة بواسطة <code>fscanf</code>، ولا يحتاج المبرمج إلى قراءة المحرف <code>\\n</code> صراحةً من تدفق الملف.</p>
<p>عُرضت تقريباً كل لغة البرمجة C في الأقسام السابقة. ونغطي في هذا القسم بعض ميزات لغة C المتقدمة المتبقية وبعض موضوعات البرمجة والتصريف المتقدمة في C:</p>
<ul>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_switch.html#_c_switch_stmt_">ثوابت C وعبارة <code>switch</code> والأنواع المعدودة typedef</a></li>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_cmd_line_args.html#_c_cmd_line_args_">وسائط سطر الأوامر</a></li>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_voidstar.html#_c_voidstar_recasting_">نوع <code>void *</code> وإعادة تحويل الأنواع</a></li>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_pointer_arithmetic.html#_c_ptr_arith_">حساب المؤشّرات</a></li>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_c_link_load_">مكتبات C: الاستخدام والتصريف والربط</a></li>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_writing_libraries.html#_c_libraries_">كتابة مكتباتك الخاصة في C واستخدامها</a> (وتقسيم برنامجك إلى وحدات متعددة (ملفات <code>.c</code> و<code>.h</code>))</li>
<li><a href="https://diveintosystems.org/book/C2-C_depth/advanced_assembly.html#_c_compiling_to_assemb_">تصريف شيفرة C المصدرية إلى لغة التجميع</a>.</li>
</ul>
<p>الثوابت وعبارات switch والأنواع المعدودة وtypedef ميزات من لغة C مفيدة لإنشاء شيفرة أكثر قابلية للقراءة وأكثر قابلية للصيانة. وتُستخدم الثوابت والأنواع المعدودة وtypedef لتعريف أسماء بديلة للقيم الحرفية والأنواع في البرامج. ويمكن استخدام عبارات switch بدلاً من بعض سلاسل عبارات <code>if-else if</code> المتتابعة.</p>
<h4><a href="#_c_constants_"></a>ثوابت C</h4>
<p><strong>الثابت</strong> (constant) اسم بديل لقيمة حرفية في C. وتُستخدم الثوابت بدلاً من القيمة الحرفية لجعل الشيفرة أكثر قابلية للقراءة وأسهل في التعديل. وفي C، تُعرَّف الثوابت خارج جسم دالة بالصياغة التالية:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> const_name (literal_value)</span>
</code></pre>
<p>وفيما يلي مثال على برنامج جزئي يعرّف ثلاثة ثوابت (<code>N</code> و<code>PI</code> و<code>NAME</code>) ويستخدمها:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">define</span> N    (20)        <span class="hljs-comment">// N:  alias for the literal value 20</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> PI   (3.14)      <span class="hljs-comment">// PI: alias for the literal value 3.14</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> NAME (<span class="hljs-string">&quot;Sarita&quot;</span>)  <span class="hljs-comment">// NAME: alias for the string literal &quot;Sarita&quot;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
  <span class="hljs-type">int</span> <span class="hljs-built_in">array</span>[N];   <span class="hljs-comment">// an array of 20 ints</span>
  <span class="hljs-type">int</span> *d_arr, i;
  <span class="hljs-type">double</span> area, circ, radius;

  radius = <span class="hljs-number">12.3</span>;
  area = PI*radius*radius;
  circ = <span class="hljs-number">2</span>*PI*radius;

  d_arr = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>)*N);
  <span class="hljs-keyword">if</span>(d_arr == <span class="hljs-literal">NULL</span>) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Sorry, %s, malloc failed!\\n&quot;</span>, NAME);
    <span class="hljs-built_in">exit</span>(<span class="hljs-number">1</span>);
  }
  <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-built_in">array</span>[i] = i;
    d_arr[i] = i*<span class="hljs-number">2</span>;
  }
  ...
</code></pre>
<p>استخدام الثوابت يجعل الشيفرة أكثر قابلية للقراءة (ففي تعبير ما، لـ <code>PI</code> معنى أكبر من <code>3.14</code>). كما يجعل استخدام الثوابت الشيفرة أسهل في التعديل. فمثلاً، لتغيير حدود المصفوفات ودقة قيمة pi في البرنامج أعلاه، لا يحتاج المبرمج إلا إلى تغيير تعريفات ثوابتها وإعادة التصريف؛ وستستخدم كل الشيفرة التي تستعمل الثابت قيمه الجديدة. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> N    (50)        <span class="hljs-comment">// redefine N from 20 to 50</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> PI   (3.14159)   <span class="hljs-comment">// redefine PI to higher precision</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
  <span class="hljs-type">int</span> <span class="hljs-built_in">array</span>[N];  <span class="hljs-comment">// now allocates an array of size 50</span>
  ...
  area = PI*radius*radius;        <span class="hljs-comment">// now uses 3.14159 for PI</span>
  d_arr = <span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>)*N);  <span class="hljs-comment">// now mallocs array of 50 ints</span>
  ...
  <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>; i &lt; N; i++) {    <span class="hljs-comment">// now iterates over 50 elements</span>
  ...
</code></pre>
<p>من المهم تذكّر أن الثوابت ليست قيماً يسارية — فهي أسماء بديلة لقيم حرفية من أنواع C. ونتيجةً لذلك، لا يمكن تغيير قيمها وقت التشغيل كما يُفعل بقيم المتغيّرات. فالشيفرة التالية مثلاً تسبب خطأ تصريف:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> N  20</span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
  ...
  N = <span class="hljs-number">50</span>;  <span class="hljs-comment">// compilation error: \`20 = 50\` is not valid C</span>
</code></pre>
<h4><a href="#_c_switch_"></a>عبارات switch</h4>
<p>يمكن استخدام عبارة <code>switch</code> في C بدلاً من بعض تسلسلات شيفرة <code>if</code>-<code>else if</code> المتسلسلة، لا كلها. ورغم أن <code>switch</code> لا توفّر قدرة تعبيرية إضافية للغة البرمجة C، فإنها كثيراً ما تعطي تسلسلات تفرّع شيفرة أكثر إيجازاً. وقد تتيح أيضاً للمصرّف إنتاج شيفرة تفرّع تنفَّذ بكفاءة أعلى من شيفرة <code>if</code>-<code>else if</code> المتسلسلة المكافئة.</p>
<p>تبدو صياغة عبارة <code>switch</code> في C هكذا:</p>
<pre><code class="language-c"><span class="hljs-keyword">switch</span> (&lt;expression&gt;) {

   <span class="hljs-keyword">case</span> &lt;literal value <span class="hljs-number">1</span>&gt;:
        &lt;statements&gt;;
        <span class="hljs-keyword">break</span>;         <span class="hljs-comment">// breaks out of switch statement body</span>
   <span class="hljs-keyword">case</span> &lt;literal value <span class="hljs-number">2</span>&gt;:
        &lt;statements&gt;;
        <span class="hljs-keyword">break</span>;         <span class="hljs-comment">// breaks out of switch statement body</span>
   ...
   <span class="hljs-keyword">default</span>:            <span class="hljs-comment">// default label is optional</span>
        &lt;statements&gt;;
}
</code></pre>
<p>وتُنفَّذ عبارة switch كما يلي:</p>
<ol>
<li>تُقيَّم <code>expression</code> أولاً.</li>
<li>بعد ذلك، يبحث <code>switch</code> عن قيمة حرفية <code>case</code> تطابق قيمة التعبير.</li>
<li>عند إيجاد قيمة حرفية <code>case</code> مطابقة، يبدأ تنفيذ العبارات التي تليها مباشرة.</li>
<li>وإذا لم توجد <code>case</code> مطابقة، يبدأ تنفيذ العبارات في التسمية <code>default</code> إن وُجدت.</li>
<li>وإلا فلا تُنفَّذ أي عبارات في جسم عبارة <code>switch</code>.</li>
</ol>
<p>وبعض القواعد المتعلقة بعبارات <code>switch</code>:</p>
<ul>
<li>يجب أن تكون القيمة المرتبطة بكل <code>case</code> قيمة حرفية — إذ <em>لا يمكن</em> أن تكون تعبيراً. ويُطابق التعبير الأصلي في <em>التساوي</em> فقط مع القيم الحرفية المرتبطة بكل <code>case</code>.</li>
<li>يوقف الوصول إلى عبارة <code>break</code> تنفيذ جميع العبارات المتبقية داخل جسم عبارة <code>switch</code>. أي أن <code>break</code> يخرج من جسم عبارة <code>switch</code> ويواصل التنفيذ بالعبارة التالية بعد كتلة <code>switch</code> بأكملها.</li>
<li>تحدد عبارة <code>case</code> ذات القيمة المطابقة نقطة البداية في تسلسل عبارات C التي ستُنفَّذ — إذ ينقل التنفيذ إلى موضع داخل جسم <code>switch</code> لبدء تنفيذ الشيفرة. وهكذا، إذا لم توجد عبارة <code>break</code> في نهاية <code>case</code> معيّن، تُنفَّذ العبارات الواقعة تحت عبارات <code>case</code> التالية بالترتيب حتى تُنفَّذ عبارة <code>break</code> أو يُبلَغ نهاية جسم عبارة <code>switch</code>.</li>
<li>التسمية <code>default</code> اختيارية. وإذا وُجدت، فيجب أن تكون في النهاية.</li>
</ul>
<p>وفيما يلي برنامج مثال يحتوي عبارة <code>switch</code>:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> num, new_num = <span class="hljs-number">0</span>;

    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;enter a number between 6 and 9: &quot;</span>);
    <span class="hljs-built_in">scanf</span>(<span class="hljs-string">&quot;%d&quot;</span>, &amp;num);

    <span class="hljs-keyword">switch</span>(num) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>:
            new_num = num + <span class="hljs-number">1</span>;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:
            new_num = num;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:
            new_num = num - <span class="hljs-number">1</span>;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">9</span>:
            new_num = num + <span class="hljs-number">2</span>;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>:
            <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Hey, %d is not between 6 and 9\\n&quot;</span>, num);
    }
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;num %d  new_num %d\\n&quot;</span>, num, new_num);
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>وفيما يلي بعض تشغيلات هذا المثال:</p>
<pre><code>./a.out
enter a number between 6 and 9: 9
num 9  new_num 11

./a.out
enter a number between 6 and 9: 6
num 6  new_num 7

./a.out
enter a number between 6 and 9: 12
Hey, 12 is not between 6 and 9
num 12  new_num 0
</code></pre>
<h4><a href="#_enumerated_types"></a>الأنواع المعدودة</h4>
<p><strong>النوع المعدود</strong> (enumerated type) (<code>enum</code>) طريقة لتعريف مجموعة من ثوابت الأعداد الصحيحة المترابطة. وكثيراً ما تُستخدم عبارات switch والأنواع المعدودة معاً.</p>
<p>وينبغي تعريف النوع المعدود خارج جسم دالة، بالصياغة التالية (<code>enum</code> كلمة مفتاحية في C):</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">type_name</span> {</span>
   CONST_1_NAME,
   CONST_2_NAME,
   ...
   CONST_N_NAME
};
</code></pre>
<p>لاحظ أن حقول الثوابت تُحدَّد بقائمة أسماء مفصولة بفواصل ولا تُعطى قيماً صراحةً. وبشكل افتراضي، يُسنَد إلى الثابت الأول في القائمة القيمة 0، وإلى الثاني القيمة 1، وهكذا.</p>
<p>وفيما يلي مثال على تعريف نوع معدود لأيام الأسبوع:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">days_of_week</span> {</span>
   MON,
   TUES,
   WED,
   THURS,
   FRI
};
</code></pre>
<p>يُعلَن متغيّر من قيمة نوع معدود باستخدام اسم النوع <code>enum type_name</code>، ويمكن استخدام قيم الثوابت التي يعرّفها في التعبيرات. فمثلاً:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">days_of_week</span> <span class="hljs-title">day</span>;</span>

day = THURS;

<span class="hljs-keyword">if</span> (day &gt; WED) {
  <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;The weekend is arriving soon!\\n&quot;</span>);
}
</code></pre>
<p>يشبه النوع المعدود تعريف مجموعة ثوابت باستخدام <code>#define</code> هكذا:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> MON    0</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> TUES   1</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> WED    2</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> THURS  3</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> FRI    4</span>
</code></pre>
<p>يمكن استخدام قيم الثوابت في النوع المعدود بطريقة مشابهة لاستخدام الثوابت لجعل البرنامج أسهل قراءة والشيفرة أسهل تحديثاً. غير أن للنوع المعدود ميزة تجميع مجموعة ثوابت أعداد صحيحة مترابطة معاً. وهو أيضاً تعريف نوع، لذا يمكن الإعلان عن متغيّرات ووسائط من نوع معدود، بينما الثوابت أسماء بديلة لقيم حرفية. وإضافةً إلى ذلك، في الأنواع المعدودة تُسنَد القيم المحددة لكل ثابت ضمنياً بالتسلسل بدءاً من <code>0</code> فلا يحتاج المبرمج إلى تحديد قيمة كل ثابت.</p>
<p>ومن الميزات الجميلة الأخرى للأنواع المعدودة سهولة إضافة ثوابت إلى المجموعة أو حذفها دون الحاجة إلى تغيير قيمها كلها. فمثلاً، إذا أراد المستخدم إضافة السبت والأحد إلى مجموعة الأيام والحفاظ على الترتيب النسبي للأيام، فيمكنه إضافتهما إلى تعريف النوع المعدود دون الحاجة إلى إعادة تعريف قيم الأيام الأخرى صراحةً كما قد يحتاج مع تعريفات ثوابت <code>#define</code>:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">days_of_week</span> {</span>
   SUN,        <span class="hljs-comment">// SUN will now be 0</span>
   MON,        <span class="hljs-comment">// MON will now be 1, and so on</span>
   TUES,
   WED,
   THURS,
   FRI,
   SAT
};
</code></pre>
<p>ورغم إسناد القيم ضمنياً إلى ثوابت النوع المعدود، يمكن للمبرمج أيضاً إسناد قيم محددة إليها باستخدام صياغة <code>= val</code>. فمثلاً، إذا أراد المبرمج أن تبدأ قيم أيام الأسبوع من 1 بدلاً من 0، فيمكنه فعل ما يلي:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">days_of_week</span> {</span>
   SUN = <span class="hljs-number">1</span>,  <span class="hljs-comment">// start the sequence at 1</span>
   MON,      <span class="hljs-comment">// this is 2 (next value after 1)</span>
   TUES,     <span class="hljs-comment">// this is 3, and so on</span>
   WED,
   THURS,
   FRI,
   SAT
};
</code></pre>
<p>ولأن النوع المعدود يعرّف أسماء بديلة لمجموعة قيم حرفية <code>int</code>، تُطبع قيمة النوع المعدود بقيمته <code>int</code> لا باسم الاسم البديل. فمثلاً، بالنظر إلى التعريف أعلاه لـ <code>enum days_of_week</code>، يطبع ما يلي <code>3</code> لا السلسلة <code>&quot;TUES&quot;</code>:</p>
<pre><code class="language-c"><span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">days_of_week</span> <span class="hljs-title">day</span>;</span>

day = TUES;
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Today is %d\\n&quot;</span>, day);
</code></pre>
<p>كثيراً ما تُستخدم الأنواع المعدودة مع عبارات switch كما في الشيفرة المثالية أدناه. ويوضح المثال أيضاً عبارة switch بعدة حالات مرتبطة بمجموعة العبارات نفسها، وعبارة case لا تحتوي <code>break</code> قبل عبارة case التالية (عندما يكون <code>val</code> هو <code>FRI</code>، تُنفَّذ عبارتا <code>printf</code> قبل مصادفة <code>break</code>؛ وعندما يكون <code>val</code> هو <code>MON</code> أو <code>WED</code>، تُنفَّذ عبارة واحدة فقط من عبارات <code>printf</code> قبل <code>break</code>):</p>
<pre><code class="language-c"><span class="hljs-comment">// an int because we are using scanf to assign its value</span>
<span class="hljs-type">int</span> val;

<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;enter a value between %d and %d: &quot;</span>, SUN, SAT);
<span class="hljs-built_in">scanf</span>(<span class="hljs-string">&quot;%d&quot;</span>, &amp;val);

<span class="hljs-keyword">switch</span> (val) {
  <span class="hljs-keyword">case</span> FRI:
     <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Orchestra practice today\\n&quot;</span>);
  <span class="hljs-keyword">case</span> MON:
  <span class="hljs-keyword">case</span> WED:
     <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;PSYCH 101 and CS 231 today\\n&quot;</span>);
     <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> TUES:
  <span class="hljs-keyword">case</span> THURS:
     <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Math 311 and HIST 140 today\\n&quot;</span>);
     <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> SAT:
     <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Day off!\\n&quot;</span>);
     <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> SUN:
     <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Do weekly pre-readings\\n&quot;</span>);
     <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">default</span>:
     <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Error: %d is not a valid day\\n&quot;</span>, val);
};
</code></pre>
<h4><a href="#_typedef"></a>typedef</h4>
<p>توفّر C طريقة لتعريف نوع جديد يكون اسماً بديلاً لنوع موجود باستخدام الكلمة المفتاحية <code>typedef</code>. وبعد التعريف، يمكن الإعلان عن متغيّرات باستخدام هذا الاسم البديل الجديد للنوع. وتُستخدم هذه الميزة عادةً لجعل البرنامج أكثر قابلية للقراءة واستخدام أسماء أنواع أقصر، غالباً للبنى والأنواع المعدودة. وفيما يلي صيغة تعريف نوع جديد بـ <code>typedef</code>:</p>
<pre><code class="language-c"><span class="hljs-keyword">typedef</span> existing_type_name new_type_alias_name;
</code></pre>
<p>وفيما يلي برنامج جزئي مثال يستخدم typedef:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> MAXNAME  (30)</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> MAXCLASS (40)</span>

<span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">class_year</span> {</span>
  FIRST = <span class="hljs-number">1</span>,
  SECOND,
  JUNIOR,
  SENIOR,
  POSTGRAD
};

<span class="hljs-comment">// classYr is an alias for enum class_year</span>
<span class="hljs-keyword">typedef</span> <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">class_year</span> <span class="hljs-title">classYr</span>;</span>

<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> {</span>
  <span class="hljs-type">char</span> name[MAXNAME];
  classYr year;     <span class="hljs-comment">// use classYr type alias for field type</span>
  <span class="hljs-type">float</span> gpa;
};

<span class="hljs-comment">// studentT is an alias for struct studentT</span>
<span class="hljs-keyword">typedef</span> <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span>  <span class="hljs-title">studentT</span>;</span>

<span class="hljs-comment">// ull is an alias for unsigned long long</span>
<span class="hljs-keyword">typedef</span> <span class="hljs-type">unsigned</span> <span class="hljs-type">long</span> <span class="hljs-type">long</span> ull;

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {

  <span class="hljs-comment">// declare variables using typedef type names</span>
  studentT <span class="hljs-class"><span class="hljs-keyword">class</span>[<span class="hljs-title">MAXCLASS</span>];</span>
  classYr yr;
  ull num;

  num = <span class="hljs-number">123456789</span>;
  yr = JUNIOR;
  <span class="hljs-built_in">strcpy</span>(class[<span class="hljs-number">0</span>].name, <span class="hljs-string">&quot;Sarita&quot;</span>);
  <span class="hljs-class"><span class="hljs-keyword">class</span>[0].<span class="hljs-title">year</span> =</span> SENIOR;
  <span class="hljs-class"><span class="hljs-keyword">class</span>[0].<span class="hljs-title">gpa</span> =</span> <span class="hljs-number">3.75</span>;

  ...
</code></pre>
<p>ولأن typedef يُستخدم كثيراً مع البنى، توفّر C صياغة لدمج typedef وتعريف بنية معاً بوضع <code>typedef</code> قبل تعريف البنية وسرد اسم الاسم البديل للنوع بعد <code>}</code> المغلقة في تعريف البنية. فمثلاً، يعرّف ما يلي نوع بنية <code>struct studentT</code> واسماً بديلاً للنوع باسم <code>studentT</code> معاً:</p>
<pre><code class="language-c"><span class="hljs-keyword">typedef</span> <span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">studentT</span> {</span>
  <span class="hljs-type">char</span> name[MAXNAME];
  classYr year;     <span class="hljs-comment">// use classYr type alias for field type</span>
  <span class="hljs-type">float</span> gpa;
} studentT;
</code></pre>
<p>ويعادل هذا التعريف كتابة typedef منفصلاً بعد تعريف البنية كما في المثال السابق.</p>
<p>يمكن جعل البرنامج أكثر عمومية بقراءة وسائط سطر الأوامر، وهي تُضمَّن كجزء من الأمر الذي يدخله المستخدم لتشغيل برنامج تنفيذي ثنائي. وتحدد قيم إدخال أو خيارات تغيّر سلوك البرنامج وقت التشغيل. وبعبارة أخرى، يؤدي تشغيل البرنامج بقيم وسائط سطر أوامر مختلفة إلى تغيّر سلوك البرنامج من تشغيل لآخر دون الحاجة إلى تعديل شيفرة البرنامج وإعادة تصريفه. فمثلاً، إذا أخذ برنامج اسم ملف إدخال كوسيط سطر أوامر، فيمكن للمستخدم تشغيله بأي اسم ملف إدخال، خلافاً لبرنامج يشير إلى اسم ملف إدخال محدد في الشيفرة.</p>
<p>تُمرَّر أي وسائط سطر أوامر يقدمها المستخدم إلى الدالة <code>main</code> كقيم وسائط. ولكتابة برنامج يأخذ وسائط سطر أوامر، يجب أن يتضمن تعريف الدالة <code>main</code> وسيطين، هما <code>argc</code> و<code>argv</code>:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">int</span> argc, <span class="hljs-type">char</span> *argv[])</span> { ...
</code></pre>
<p>لاحظ أنه يمكن أيضاً تمثيل نوع الوسيط الثاني بـ <code>char **argv</code>.</p>
<p>يخزّن الوسيط الأول <strong>argc</strong> عدد الوسائط. وتمثّل قيمته عدد وسائط سطر الأوامر الممرَّرة إلى الدالة main (بما فيها اسم البرنامج). فمثلاً، إذا أدخل المستخدم</p>
<pre><code class="language-bash">./a.out 10 11 200
</code></pre>
<p>فسيحمل <code>argc</code> القيمة 4 (يُحتسب <code>a.out</code> كوسيط سطر الأوامر الأول، و<code>10</code> و<code>11</code> و<code>200</code> كالوسائط الثلاثة الأخرى).</p>
<p>ويخزّن الوسيط الثاني <strong>argv</strong> متجه الوسائط. وهو يحتوي قيمة كل وسيط من وسائط سطر الأوامر. ويُمرَّر كل وسيط سطر أوامر كقيمة سلسلة نصية، لذا فإن نوع <code>argv</code> مصفوفة سلاسل نصية (أو مصفوفة من مصفوفات <code>char</code>). وتحتوي مصفوفة <code>argv</code> العناصر <code>argc + 1</code>. وتخزّن العناصر <code>argc</code> الأولى سلاسل وسائط سطر الأوامر، ويخزّن العنصر الأخير <code>NULL</code> دلالةً على نهاية قائمة وسائط سطر الأوامر. فمثلاً، في سطر الأوامر المدخل أعلاه، ستبدو مصفوفة <code>argv</code> كما في <a href="#Figargv">الشكل 1</a>:</p>
<p><img src="/arabic-cs-library/images/dive-into-systems/c2-depth-0-argv.webp" alt="an example argv list with 5 elements, one for the 3 input values (10, 11, 200) plus the executable as the first element, and NULL as the last."> الشكل 1. الوسيط argv الممرَّر إلى main مصفوفة سلاسل نصية. ويُمرَّر كل وسيط سطر أوامر كعنصر سلسلة منفصل في المصفوفة. وقيمة العنصر الأخير NULL، دلالةً على نهاية قائمة وسائط سطر الأوامر.</p>
<p>كثيراً ما يريد البرنامج تفسير وسيط سطر أوامر ممرَّر إلى <code>main</code> كنوع غير السلسلة النصية. وفي المثال أعلاه، قد يريد البرنامج استخراج القيمة الصحيحة <code>10</code> من قيمة السلسلة <code>&quot;10&quot;</code> في وسيط سطر أوامره الأول. وتوفّر مكتبة C القياسية دوالاً لتحويل السلاسل إلى أنواع أخرى. فمثلاً، الدالة <code>atoi</code> («a to i»، أي «ASCII to integer») تحوّل سلسلة من محارف الأرقام إلى قيمتها الصحيحة المقابلة:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> x;
x = atoi(argv[<span class="hljs-number">1</span>]);  <span class="hljs-comment">// x gets the int value 10</span>
</code></pre>
<p>انظر <a href="https://diveintosystems.org/book/C2-C_depth/strings.html#_functions_to_convert_strings_to_other_types">قسم السلاسل النصية ومكتبة السلاسل</a> لمزيد من المعلومات عن هذه الدوال. وبرنامج <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/commandlineargs.c">commandlineargs.c</a> لمثال آخر على وسائط سطر الأوامر في C.</p>
<p>يمثّل نوع <code>void *</code> في C مؤشّراً عاماً — مؤشّراً إلى أي نوع، أو مؤشّراً إلى نوع غير محدد. وتسمح C بنوع مؤشّر عام لأن عناوين الذاكرة على النظام تُخزَّن دائماً بالعدد نفسه من البايتات (مثلاً، العناوين أربعة بايتات على أنظمة 32 بت وثمانية بايتات على أنظمة 64 بت). ونتيجةً لذلك، يحتاج كل متغيّر مؤشّر إلى عدد بايتات التخزين نفسه، ولأنها كلها بالحجم نفسه، يستطيع المصرّف تخصيص مساحة لمتغيّر <code>void *</code> دون معرفة النوع الذي يشير إليه. وفيما يلي مثال:</p>
<pre><code class="language-c"><span class="hljs-type">void</span> *gen_ptr;
<span class="hljs-type">int</span> x;
<span class="hljs-type">char</span> ch;

gen_ptr = &amp;x;  <span class="hljs-comment">// gen_ptr can be assigned the address of an int</span>
gen_ptr = &amp;ch; <span class="hljs-comment">// or the address of a char (or the address of any type)</span>
</code></pre>
<p>عادةً لا يعلن المبرمجون متغيّرات من النوع <code>void *</code> كما في المثال السابق. وبدلاً من ذلك، يُستخدم عادةً لتحديد أنواع إرجاع عامة من الدوال أو وسائط عامة للدوال. وكثيراً ما يُستخدم نوع <code>void *</code> كنوع إرجاع لدوال ترجع ذاكرة مخصَّصة حديثاً يمكن استخدامها لتخزين أي نوع (مثل <code>malloc</code>). ويُستخدم أيضاً كوسيط دالة لدوال يمكنها أخذ أي نوع من القيم. وفي هذه الحالة، تمرّر الاستدعاءات الفردية للدالة مؤشّراً إلى نوع محدد، ويمكن تمريره إلى وسيط الدالة <code>void *</code> لأنه يستطيع تخزين عنوان أي نوع.</p>
<p>ولأن <code>void *</code> نوع مؤشّر عام، لا يمكن إلغاء الإشارة إليه مباشرةً — إذ لا يعرف المصرّف حجم الذاكرة التي يشير إليها العنوان. فمثلاً، قد يشير العنوان إلى موقع تخزين <code>int</code> من أربعة بايتات أو إلى موقع تخزين <code>char</code> من بايت واحد في الذاكرة. لذا يجب على المبرمج <strong>إعادة تحويل</strong> مؤشّر <code>void *</code> صراحةً إلى مؤشّر من نوع محدد قبل إلغاء الإشارة إليه. وتخبر إعادة التحويل المصرّف بنوع متغيّر المؤشّر المحدد، ما يتيح له توليد شيفرة الوصول الصحيحة إلى الذاكرة لإلغاء الإشارة.</p>
<p>وفيما يلي مثالان على استخدام <code>void *</code>:</p>
<p>يعيد الاستدعاء <code>malloc</code> تحويل نوع إرجاعه <code>void *</code> إلى نوع المؤشّر المحدد للمتغيّر المستخدم لتخزين عنوان ذاكرة الكومة المرجَع:</p>
<pre><code class="language-c"><span class="hljs-type">int</span> *<span class="hljs-built_in">array</span>;
<span class="hljs-type">char</span> *str;

<span class="hljs-built_in">array</span> = (<span class="hljs-type">int</span> *)<span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">int</span>) * <span class="hljs-number">10</span>); <span class="hljs-comment">// recast void * return value</span>
str = (<span class="hljs-type">char</span> *)<span class="hljs-built_in">malloc</span>(<span class="hljs-keyword">sizeof</span>(<span class="hljs-type">char</span>) * <span class="hljs-number">20</span>);

*<span class="hljs-built_in">array</span> = <span class="hljs-number">10</span>;
str[<span class="hljs-number">0</span>] = <span class="hljs-string">&#x27;a&#x27;</span>;
</code></pre>
<p>كثيراً ما يصادف الطلاب <code>void *</code> عند <a href="https://diveintosystems.org/book/C14-SharedMemory/posix.html#_hello_threading_writing_your_first_multithreaded_program">إنشاء الخيوط</a>. ويسمح استخدام نوع وسيط <code>void *</code> في دالة خيط للخيط بأخذ أي نوع من المؤشّرات الخاص بالتطبيق. وتمتلك الدالة <code>pthread_create</code> وسيطاً لدالة الخيط الرئيسية ووسيطاً <code>void *</code> لقيمة الوسيطة التي تمرّرها إلى دالة الخيط الرئيسية التي سينفّذها الخيط المنشأ حديثاً. ويجعل استخدام الوسيط <code>void *</code> الدالة <code>pthread_create</code> دالة إنشاء خيوط عامة؛ إذ يمكن استخدامها للإشارة إلى أي نوع من مواقع الذاكرة. وبالنسبة لبرنامج محدد يستدعي <code>pthread_create</code>، يعرف المبرمج نوع الوسيطة الممرَّرة إلى الوسيط <code>void *</code>، لذا يجب عليه إعادة تحويلها إلى نوعها المعروف قبل إلغاء الإشارة إليها. وفي هذا المثال، افترض أن العنوان الممرَّر إلى الوسيط <code>args</code> يحتوي عنوان متغيّر صحيح:</p>
<pre><code class="language-c"><span class="hljs-comment">/*
 * an application-specific pthread main function
 * must have this function prototype: int func_name(void *args)
 *
 * any given implementation knows what type is really passed in
 *  args: pointer to an int value
 */</span>
<span class="hljs-type">int</span> <span class="hljs-title function_">my_thr_main</span><span class="hljs-params">(<span class="hljs-type">void</span> *args)</span> {
    <span class="hljs-type">int</span> num;

    <span class="hljs-comment">// first recast args to an int *, then dereference to get int value</span>
    num = *((<span class="hljs-type">int</span> *)args);  <span class="hljs-comment">// num gets 6</span>
    ...
}

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> ret, x;
    <span class="hljs-type">pthread_t</span> tid;

    x = <span class="hljs-number">6</span>;
    <span class="hljs-comment">// pass the address of int variable (x) to pthread_create&#x27;s void * param</span>
    <span class="hljs-comment">// (we recast &amp;x as a (void *) to match the type of pthread_create&#x27;s param)</span>
    ret = pthread_create(&amp;tid, <span class="hljs-literal">NULL</span>,
                         my_thr_main,    <span class="hljs-comment">// a thread main function</span>
                         (<span class="hljs-type">void</span> *)(&amp;x));  <span class="hljs-comment">// &amp;x will be passed to my_thr_main</span>
    <span class="hljs-comment">// ...</span>
</code></pre>
<p>إذا أشار متغيّر مؤشّر إلى مصفوفة، فيمكن للبرنامج إجراء عمليات حسابية على المؤشّر للوصول إلى أي من عناصر المصفوفة. وفي معظم الحالات، نوصي بعدم استخدام حساب المؤشّرات للوصول إلى عناصر المصفوفة: إذ يسهل الخطأ فيه ويصعب تنقيحه عند وقوعه. غير أنه قد يكون من الملائم أحياناً زيادة مؤشّر تباعاً للتكرار على مصفوفة من العناصر.</p>
<p>عند زيادته، يشير المؤشّر إلى موقع التخزين التالي <em>من النوع الذي يشير إليه</em>. فمثلاً، زيادة مؤشّر صحيح (<code>int *</code>) تجعله يشير إلى عنوان تخزين <code>int</code> التالي (أي العنوان الذي يبعد أربعة بايتات عن قيمته الحالية)، وزيادة مؤشّر محارف تجعله يشير إلى عنوان تخزين <code>char</code> التالي (أي العنوان الذي يبعد بايتاً واحداً عن قيمته الحالية).</p>
<p>في <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/pointerarith.c">برنامج المثال التالي</a>، نوضح كيفية استخدام حساب المؤشّرات للتلاعب بمصفوفة. أولاً أعلن متغيّرات مؤشّرات يطابق نوعها نوع عناصر المصفوفة:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> N 10</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> M 20</span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-comment">// array declarations:</span>
    <span class="hljs-type">char</span> letters[N];
    <span class="hljs-type">int</span> numbers[N], i, j;
    <span class="hljs-type">int</span> matrix[N][M];

    <span class="hljs-comment">// declare pointer variables that will access int or char array elements</span>
    <span class="hljs-comment">// using pointer arithmetic (the pointer type must match array element type)</span>
    <span class="hljs-type">char</span> *cptr = <span class="hljs-literal">NULL</span>;
    <span class="hljs-type">int</span> *iptr = <span class="hljs-literal">NULL</span>;
    ...
</code></pre>
<p>بعد ذلك، هيّئ متغيّرات المؤشّرات على عنوان أساس المصفوفات التي ستتكرر عليها:</p>
<pre><code class="language-c"><span class="hljs-comment">// make the pointer point to the first element in the array</span>
cptr = &amp;(letters[<span class="hljs-number">0</span>]); <span class="hljs-comment">//  &amp;(letters[0])  is the address of element 0</span>
iptr = numbers;       <span class="hljs-comment">// the address of element 0 (numbers is &amp;(numbers[0]))</span>
</code></pre>
<p>ثم، باستخدام إلغاء الإشارة إلى المؤشّر، يستطيع برنامجنا الوصول إلى عناصر المصفوفة. وهنا نلغي الإشارة لإسناد قيمة إلى عنصر مصفوفة ثم نزيد متغيّر المؤشّر بمقدار واحد لتقديمه ليشير إلى العنصر التالي:</p>
<pre><code class="language-c"><span class="hljs-comment">// initialized letters and numbers arrays through pointer variables</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-comment">// dereference each pointer and update the element it currently points to</span>
    *cptr = <span class="hljs-string">&#x27;a&#x27;</span> + i;
    *iptr = i * <span class="hljs-number">3</span>;

    <span class="hljs-comment">// use pointer arithmetic to set each pointer to point to the next element</span>
    cptr++;  <span class="hljs-comment">// cptr points to the next char address (next element of letters)</span>
    iptr++;  <span class="hljs-comment">// iptr points to the next int address  (next element of numbers)</span>
}
</code></pre>
<p>لاحظ أن قيم المؤشّرات تُزاد داخل الحلقة في هذا المثال. وبذلك تجعل زيادة قيمتها تشير إلى العنصر التالي في المصفوفة. وهذا النمط يسير فعلياً عبر كل عنصر من عناصر المصفوفة بالطريقة نفسها التي يفعلها الوصول إلى <code>cptr[i]</code> أو <code>iptr[i]</code> في كل تكرار.</p>
<p><strong>ملاحظة — دلالات حساب المؤشّرات ودالة الحساب الأساسية</strong></p>
<blockquote>
<p>دلالات حساب المؤشّرات مستقلة عن النوع: فتغيير قيمة أي نوع من المؤشّرات بمقدار <code>N</code> (أو <code>ptr = ptr + N</code>) يجعل المؤشّر يشير إلى مواقع تخزين <code>N</code> بعد قيمته الحالية (أو يجعله يشير إلى عناصر <code>N</code> بعد العنصر الحالي الذي يشير إليه). ونتيجةً لذلك، تؤدي زيادة مؤشّر من أي نوع إلى جعله يشير إلى موقع الذاكرة التالي مباشرةً من النوع الذي يشير إليه.</p>
<p>غير أن دالة الحساب الفعلية التي يولّدها المصرّف لتعبير حساب مؤشّر تختلف بحسب نوع متغيّر المؤشّر (وبحسب عدد البايتات التي يستخدمها النظام لتخزين النوع الذي يشير إليه). فمثلاً، زيادة مؤشّر <code>char</code> ستزيد قيمته بمقدار واحد لأن عنوان <code>char</code> الصالح التالي يبعد بايتاً واحداً عن الموقع الحالي. أما زيادة مؤشّر <code>int</code> فستزيد قيمته بأربعة لأن عنوان العدد الصحيح الصالح التالي يبعد أربعة بايتات عن الموقع الحالي.</p>
<p>يمكن للمبرمج ببساطة أن يكتب <code>ptr++</code> لجعل مؤشّر يشير إلى قيمة العنصر التالي. ويولّد المصرّف شيفرة تضيف العدد المناسب من البايتات للنوع المقابل الذي يشير إليه. وتضبط عملية الجمع فعلياً قيمته على العنوان الصالح التالي في الذاكرة من ذلك النوع.</p>
</blockquote>
<p>يمكنك رؤية كيف عدّلت الشيفرة أعلاه عناصر المصفوفة بطباعة قيمها (نعرض ذلك أولاً باستخدام فهرسة المصفوفة ثم باستخدام حساب المؤشّرات للوصول إلى قيمة كل عنصر مصفوفة):</p>
<pre><code class="language-c"><span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\n array values using indexing to access: \\n&quot;</span>);
<span class="hljs-comment">// see what the code above did:</span>
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;letters[%d] = %c, numbers[%d] = %d\\n&quot;</span>,
           i, letters[i], i, numbers[i]);
}

<span class="hljs-comment">// we could also use pointer arith to print these out:</span>
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\n array values using pointer arith to access: \\n&quot;</span>);
<span class="hljs-comment">// first: initialize pointers to base address of arrays:</span>
cptr = letters;  <span class="hljs-comment">// letters == &amp;letters[0]</span>
iptr = numbers;
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-comment">// dereference pointers to access array element values</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;letters[%d] = %c, numbers[%d] = %d\\n&quot;</span>,
            i, *cptr, i, *iptr);

    <span class="hljs-comment">// increment pointers to point to the next element</span>
    cptr++;
    iptr++;
}
</code></pre>
<p>وهذا ما يبدو عليه الناتج:</p>
<pre><code> array values using indexing to access:
letters[0] = a, numbers[0] = 0
letters[1] = b, numbers[1] = 3
letters[2] = c, numbers[2] = 6
letters[3] = d, numbers[3] = 9
letters[4] = e, numbers[4] = 12
letters[5] = f, numbers[5] = 15
letters[6] = g, numbers[6] = 18
letters[7] = h, numbers[7] = 21
letters[8] = i, numbers[8] = 24
letters[9] = j, numbers[9] = 27

 array values using pointer arith to access:
letters[0] = a, numbers[0] = 0
letters[1] = b, numbers[1] = 3
letters[2] = c, numbers[2] = 6
letters[3] = d, numbers[3] = 9
letters[4] = e, numbers[4] = 12
letters[5] = f, numbers[5] = 15
letters[6] = g, numbers[6] = 18
letters[7] = h, numbers[7] = 21
letters[8] = i, numbers[8] = 24
letters[9] = j, numbers[9] = 27
</code></pre>
<p>يمكن استخدام حساب المؤشّرات للتكرار على أي قطعة متجاورة من الذاكرة. وفيما يلي مثال يستخدم حساب المؤشّرات لتهيئة مصفوفة ثنائية الأبعاد معلَنة ساكنةً:</p>
<pre><code class="language-c"><span class="hljs-comment">// sets matrix to:</span>
<span class="hljs-comment">// row 0:   0,   1,   2, ...,  99</span>
<span class="hljs-comment">// row 1: 100, 110, 120, ..., 199</span>
<span class="hljs-comment">//        ...</span>
iptr = &amp;(matrix[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]);
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N*M; i++) {
    *iptr = i;
    iptr++;
}

<span class="hljs-comment">// see what the code above did:</span>
<span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\n 2D array values inited using pointer arith: \\n&quot;</span>);
<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; N; i++) {
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; M; j++) {
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%3d &quot;</span>, matrix[i][j]);
    }
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;\\n&quot;</span>);
}

<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>وسيبدو الناتج هكذا:</p>
<pre><code> 2D array values initialized using pointer arith:
  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19
 20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36  37  38  39
 40  41  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56  57  58  59
 60  61  62  63  64  65  66  67  68  69  70  71  72  73  74  75  76  77  78  79
 80  81  82  83  84  85  86  87  88  89  90  91  92  93  94  95  96  97  98  99
100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119
120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139
140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159
160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179
180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199
</code></pre>
<p>يستطيع حساب المؤشّرات الوصول إلى مواقع ذاكرة متجاورة بأي نمط، بدءاً وانتهاءً في أي مكان من قطعة ذاكرة متجاورة. فمثلاً، بعد تهيئة مؤشّر على عنوان عنصر مصفوفة، يمكن تغيير قيمته بأكثر من واحد. فمثلاً:</p>
<pre><code class="language-c">iptr = &amp;numbers[<span class="hljs-number">2</span>];
*iptr = <span class="hljs-number">-13</span>;
iptr += <span class="hljs-number">4</span>;
*iptr = <span class="hljs-number">9999</span>;
</code></pre>
<p>بعد تنفيذ الشيفرة السابقة، ستبدو طباعة قيم مصفوفة <code>numbers</code> هكذا (لاحظ أن القيمتين عند الفهرس 2 والفهرس 6 تغيّرتا):</p>
<pre><code>numbers[0] = 0
numbers[1] = 3
numbers[2] = -13
numbers[3] = 9
numbers[4] = 12
numbers[5] = 15
numbers[6] = 9999
numbers[7] = 21
numbers[8] = 24
numbers[9] = 27
</code></pre>
<p>يعمل حساب المؤشّرات على المصفوفات المخصَّصة ديناميكياً أيضاً. غير أنه يجب على المبرمجين الحذر عند التعامل مع المصفوفات متعددة الأبعاد المخصَّصة ديناميكياً. فإذا استخدم برنامج مثلاً استدعاءات <code>malloc</code> متعددة لتخصيص صفوف فردية من مصفوفة ثنائية الأبعاد (<a href="https://diveintosystems.org/book/C2-C_depth/arrays.html#_method_2_the_programmer_friendly_way">الطريقة 2، مصفوفة من مصفوفات</a>)، فيجب إعادة ضبط المؤشّر ليشير إلى عنوان العنصر الأول في كل صف. وإعادة ضبط المؤشّر ضرورية لأن عناصر الصف الواحد فقط تقع في عناوين ذاكرة متجاورة. ومن ناحية أخرى، إذا خُصِّصت المصفوفة ثنائية الأبعاد باستدعاء <code>malloc</code> واحد لمساحة تساوي عدد الصفوف مضروباً في عدد الأعمدة (<a href="https://diveintosystems.org/book/C2-C_depth/arrays.html#_method_1_memory_efficient_allocation">الطريقة 1</a>)، فكل الصفوف في ذاكرة متجاورة (كما في المصفوفة ثنائية الأبعاد المعلَنة ساكنةً من المثال أعلاه). وفي الحالة الأخيرة، لا يحتاج المؤشّر إلا إلى التهيئة على عنوان الأساس، ثم سيصل حساب المؤشّرات بشكل صحيح إلى أي عنصر في المصفوفة ثنائية الأبعاد.</p>
<p>تطبّق <strong>المكتبة</strong> (library) مجموعة من الدوال والتعريفات التي يمكن لبرامج أخرى استخدامها. وتتألف مكتبة C من جزأين:</p>
<ol>
<li><em>واجهة برمجة التطبيقات</em> (API) للمكتبة، وهي تُعرَّف في ملف ترويسة واحد أو أكثر (ملفات <code>.h</code>) يجب تضمينها في ملفات شيفرة C المصدرية التي تخطط لاستخدام المكتبة. وتعرّف الترويسات ما تصدّره المكتبة لمستخدميها. وتشمل هذه التعريفات عادةً نماذج دوال المكتبة، وقد تشمل أيضاً إعلانات أنواع أو ثوابت أو متغيّرات عامة.</li>
<li><em>تنفيذ</em> وظائف المكتبة، ويُتاح للبرامج غالباً بصيغة ثنائية مصرَّفة مسبقاً تُ<strong>ربط</strong> (تضاف) إلى الملف التنفيذي الثنائي الذي ينشئه <code>gcc</code>. وقد تكون شيفرة المكتبة المصرَّفة مسبقاً في ملف أرشيف (<code>libsomelib.a</code>) يحتوي عدة ملفات <code>.o</code> يمكن ربطها ربطاً ساكناً في الملف التنفيذي وقت التصريف. أو قد تتألف بدلاً من ذلك من ملف كائن مشترك (<code>libsomelib.so</code>) يمكن ربطه ربطاً ديناميكياً وقت التشغيل في برنامج قيد التشغيل.</li>
</ol>
<p>فمثلاً، تطبّق مكتبة سلاسل C مجموعة من الدوال للتلاعب بسلاسل C. ويعرّف ملف الترويسة <code>string.h</code> واجهتها، لذا يجب على أي برنامج يريد استخدام دوال مكتبة السلاسل أن يضمّن <code>#include </code>. وتنفيذ مكتبة سلاسل C جزء من مكتبة C القياسية الأكبر (<code>libc</code>) التي يربطها مصرّف <code>gcc</code> تلقائياً في كل ملف تنفيذي ينشئه.</p>
<p>يتألف تنفيذ المكتبة من وحدة أو أكثر (ملفات <code>.c</code>)، وقد يتضمن إضافةً إلى ذلك ملفات ترويسة داخلية لتنفيذ المكتبة؛ وملفات الترويسة الداخلية ليست جزءاً من واجهة برمجة تطبيقات المكتبة بل من شيفرة مكتبة جيدة التصميم ومعيارية. وكثيراً ما لا يُصدَّر التنفيذ المصدري بلغة C للمكتبة إلى مستخدمها. وبدلاً من ذلك، تُتاح المكتبة بصيغة ثنائية مصرَّفة مسبقاً. وهذه الصيغ الثنائية ليست برامج تنفيذية (لا يمكن تشغيلها وحدها)، لكنها توفّر شيفرة تنفيذية يمكن <strong>ربطها</strong> (إضافتها) في ملف تنفيذي بواسطة <code>gcc</code> وقت التصريف.</p>
<p>هناك مكتبات عديدة متاحة لمبرمجي C لاستخدامها. فمثلاً، مكتبة خيوط POSIX (التي نناقشها في <a href="https://diveintosystems.org/book/C14-SharedMemory/index.html#_leveraging_shared_memory_in_the_multicore_era">الفصل 10</a>) تمكّن برامج C متعددة الخيوط. ويمكن لمبرمجي C أيضاً تنفيذ مكتباتهم الخاصة واستخدامها (وهو ما نناقشه في <a href="https://diveintosystems.org/book/C2-C_depth/advanced_writing_libraries.html#_c_libraries_">القسم التالي</a>). وتميل برامج C الكبيرة إلى استخدام مكتبات C كثيرة، بعضها يربطه <code>gcc</code> ضمنياً، بينما يحتاج بعضها الآخر إلى ربط صريح بخيار سطر الأوامر <code>-l</code> لـ <code>gcc</code>.</p>
<p>لا تحتاج مكتبات C القياسية عادةً إلى ربط صريح بخيار <code>-l</code> أما المكتبات الأخرى فتحتاج. وكثيراً ما تحدد وثائق دالة مكتبة ما إذا كانت المكتبة تحتاج إلى ربط صريح عند التصريف. فمثلاً، مكتبة خيوط POSIX (<code>pthread</code>) ومكتبة <code>readline</code> تحتاجان إلى ربط صريح في سطر أوامر <code>gcc</code>:</p>
<pre><code class="language-bash">$ gcc -o myprog myprog.c -pthread -lreadline
</code></pre>
<p>لاحظ أن ربط مكتبة خيوط POSIX حالة خاصة لا تتضمن البادئة <code>-l</code>. غير أن معظم المكتبات تُربط صراحةً في الملف التنفيذي باستخدام صياغة <code>-l</code> في سطر أوامر <code>gcc</code>. ولاحظ أيضاً أنه لا ينبغي تضمين الاسم الكامل لملف المكتبة في وسيطة <code>-l</code> لـ <code>gcc</code>؛ فملفات المكتبات تُسمّى شيئاً مثل <code>libreadline.so</code> أو <code>libreadline.a</code>، لكن البادئة <code>lib</code> واللاحقة <code>.so</code> أو <code>.a</code> في أسماء الملفات لا تُضمَّن. وقد يحتوي اسم ملف المكتبة الفعلي على أرقام إصدار (مثل <code>libreadline.so.8.0</code>) لا تُضمَّن أيضاً في خيار سطر الأوامر <code>-l</code> (<code>-lreadline</code>). وبعدم إجبار المستخدم على تحديد (أو حتى معرفة) الاسم الدقيق لملفات المكتبة المطلوب ربطها وموقعها، يكون <code>gcc</code> حراً في إيجاد أحدث إصدار من مكتبة في مسار مكتبات المستخدم. ويتيح ذلك أيضاً للمصرّف اختيار الربط الديناميكي عندما يتوفر كل من ملف كائن مشترك (<code>.so</code>) وملف أرشيف (<code>.a</code>) لمكتبة ما. وإذا أراد المستخدمون ربط المكتبات ربطاً ساكناً، فيمكنهم تحديد الربط الساكن صراحةً في سطر أوامر <code>gcc</code>. ويوفّر خيار <code>--static</code> طريقة لطلب الربط الساكن:</p>
<pre><code class="language-bash">$ gcc -o myprog myprog.c --static -pthread -lreadline
</code></pre>
<h4><a href="#_compilation_steps_"></a>خطوات التصريف</h4>
<p>سيساعد توصيف خطوات تصريف برنامج C في توضيح كيفية ربط شيفرة المكتبات في ملف تنفيذي ثنائي. نعرض أولاً خطوات التصريف ثم نناقش (مع أمثلة) أنواع الأخطاء المختلفة التي قد تحدث عند تصريف برامج تستخدم مكتبات.</p>
<p>يحوّل مصرّف C ملف شيفرة C مصدرية (مثل <code>myprog.c</code>) إلى ملف تنفيذي ثنائي (مثل <code>a.out</code>) في أربع خطوات متميزة (إضافة إلى خطوة خامسة تحدث وقت التشغيل).</p>
<p>تعمل <strong>خطوة ما قبل التصريف</strong> أولاً وتوسّع <strong>توجيهات المعالج الأولي</strong> (preprocessor directives): أي توجيهات <code>#</code> التي تظهر في برنامج C، مثل <code>#define</code> و<code>#include</code>. وتشمل أخطاء التصريف في هذه الخطوة أخطاء صياغة في توجيهات المعالج الأولي أو عدم إيجاد <code>gcc</code> لملفات الترويسة المرتبطة بتوجيهات <code>#include</code>. ولعرض النتائج الوسيطة لخطوة ما قبل التصريف، مرّر العلامة <code>-E</code> إلى <code>gcc</code> (يمكن إعادة توجيه الناتج إلى ملف يمكن عرضه بمحرّر نصوص):</p>
<pre><code class="language-bash">$ gcc -E  myprog.c
$ gcc -E  myprog.c  &gt; out
$ vim out
</code></pre>
<p>تعمل <strong>خطوة التصريف</strong> بعد ذلك وتقوم بمعظم مهمة التصريف. فهي تحوّل شيفرة برنامج C المصدرية (<code>myprog.c</code>) إلى شيفرة تجميع خاصة بالآلة (<code>myprog.s</code>). ولغة التجميع صورة مقروءة بشرياً من تعليمات شيفرة الآلة الثنائية التي يستطيع الحاسوب تنفيذها. وتشمل أخطاء التصريف في هذه الخطوة أخطاء صياغة لغة C، وتحذيرات الرموز غير المعرَّفة، والأخطاء الناتجة عن التعريفات والنماذج الأولية للدوال المفقودة. ولعرض النتائج الوسيطة لخطوة التصريف، مرّر العلامة <code>-S</code> إلى <code>gcc</code> (ينشئ هذا الخيار ملفاً نصياً باسم <code>myprog.s</code> يحتوي ترجمة لغة التجميع لـ <code>myprog.c</code>، ويمكن عرضه في محرّر نصوص):</p>
<pre><code class="language-bash">$ gcc -S  myprog.c
$ vim myprog.s
</code></pre>
<p>تحوّل <strong>خطوة التجميع</strong> شيفرة لغة التجميع إلى شيفرة كائن ثنائية قابلة لإعادة التوطين (<code>myprog.o</code>). ويحتوي ملف الكائن الناتج تعليمات شيفرة الآلة، لكنه ليس برنامجاً تنفيذياً كاملاً يمكن تشغيله وحده. وينتج مصرّف <code>gcc</code> على أنظمة Unix وLinux ملفات ثنائية بصيغة محددة تسمى <a href="https://wikipedia.org/wiki/Executable_and_Linkable_Format">ELF</a> (صيغة قابلة للتنفيذ والربط Executable and Linkable Format). ولإيقاف التصريف بعد هذه الخطوة، مرّر العلامة <code>-c</code> إلى <code>gcc</code> (وهذا ينتج ملفاً باسم <code>myprog.o</code>). ويمكن عرض الملفات الثنائية (مثل ملفات <code>a.out</code> و<code>.o</code>) باستخدام <code>objdump</code> أو أدوات مشابهة لعرض الملفات الثنائية:</p>
<pre><code class="language-bash">$ gcc -c  myprog.c

<span class="hljs-comment"># disassemble functions in myprog.o with objdump:</span>
$ objdump -d myprog.o
</code></pre>
<p>تعمل <strong>خطوة تحرير الربط</strong> أخيراً وتنشئ ملفاً تنفيذياً واحداً (<code>a.out</code>) من الثنائيات القابلة لإعادة التوطين (<code>.o</code>) والمكتبات (<code>.a</code> أو <code>.so</code>). وفي هذه الخطوة، يتحقق الرابط من أن أي مراجع إلى أسماء (رموز) في ملف <code>.o</code> موجودة في ملفات <code>.o</code> أو <code>.a</code> أو <code>.so</code> أخرى. فمثلاً، سيجد الرابط الدالة <code>printf</code> في مكتبة C القياسية (<code>libc.so</code>). وإذا لم يستطع الرابط إيجاد تعريف رمز ما، تفشل هذه الخطوة بخطأ يفيد بأن الرمز غير معرَّف. وتشغيل <code>gcc</code> دون علامات للتصريف الجزئي ينفّذ خطوات التصريف الأربع كلها لملف شيفرة C مصدرية (<code>myprog.c</code>) إلى ملف تنفيذي ثنائي (<code>a.out</code>) يمكن تشغيله:</p>
<pre><code class="language-bash">$ gcc myprog.c
$ ./a.out

<span class="hljs-comment"># disassemble functions in a.out with objdump:</span>
$ objdump -d a.out
</code></pre>
<p>إذا ربط الملف التنفيذي الثنائي (<code>a.out</code>) شيفرة مكتبة ربطاً ساكناً (من ملفات مكتبة <code>.a</code>)، فإن <code>gcc</code> يضمّن نسخاً من دوال المكتبة من ملف <code>.a</code> في ملف <code>a.out</code> الناتج. وتُ<strong>ربط</strong> (bound) جميع الاستدعاءات لدوال المكتبة من التطبيق بالمواقع في ملف <code>a.out</code> التي نُسخت إليها دالة المكتبة. ويربط الربط اسماً بموقع في ذاكرة البرنامج. فمثلاً، ربط استدعاء لدالة مكتبة باسم <code>gofish</code> يعني استبدال استخدام اسم الدالة بعنوان الدالة في الذاكرة (نناقش <a href="https://diveintosystems.org/book/C13-OS/vm.html#_memory_addresses">عناوين الذاكرة</a> بمزيد من التفصيل في فصول لاحقة).</p>
<p>أما إذا أُنشئ <code>a.out</code> بربط مكتبة ربطاً ديناميكياً (من ملفات كائن مشترك للمكتبة <code>.so</code>)، فلا يحتوي <code>a.out</code> نسخة من شيفرة دوال المكتبة من هذه المكتبات. وبدلاً من ذلك، يحتوي معلومات عن المكتبات المربوطة ديناميكياً التي يحتاجها ملف <code>a.out</code> لتشغيله. وتتطلب هذه الملفات التنفيذية خطوة ربط إضافية وقت التشغيل.</p>
<p>تُحتاج <strong>خطوة الربط وقت التشغيل</strong> إذا رُبط <code>a.out</code> بملفات كائن مشتركة أثناء تحرير الربط (الخطوة 4). وفي مثل هذه الحالات، يجب تحميل شيفرة المكتبة الديناميكية (في ملفات <code>.so</code>) وقت التشغيل وربطها بالبرنامج قيد التشغيل. ويسمى هذا التحميل والربط وقت التشغيل لمكتبات الكائن المشترك <strong>الربط الديناميكي</strong> (dynamic linking). وعندما يشغّل المستخدم ملفاً تنفيذياً <code>a.out</code> بتبعيات كائن مشترك، ينفّذ النظام الربط الديناميكي قبل أن يبدأ البرنامج تنفيذ دالته <code>main</code>.</p>
<p>يضيف المصرّف معلومات عن تبعيات الكائن المشترك إلى ملف <code>a.out</code> أثناء خطوة تصريف تحرير الربط (الخطوة 4). وعندما يبدأ البرنامج التنفيذ، يفحص الرابط الديناميكي قائمة تبعيات الكائن المشترك ويجد ملفات الكائن المشترك ويحمّلها في البرنامج قيد التشغيل. ثم يحدّث مدخلات جدول إعادة التوطين في ملف <code>a.out</code> رابطاً استخدام البرنامج للرموز في الكائنات المشتركة (مثل استدعاءات دوال المكتبة) بمواقعها في ملف <code>.so</code> المحمَّل وقت التشغيل. ويبلّغ الربط وقت التشغيل عن أخطاء إذا لم يستطع الرابط الديناميكي إيجاد ملف كائن مشترك (<code>.so</code>) يحتاجه الملف التنفيذي.</p>
<p>تسرد أداة <code>ldd</code> تبعيات الكائن المشترك لملف تنفيذي:</p>
<pre><code class="language-bash">$ ldd a.out
</code></pre>
<p>يستطيع <strong>منقّح GNU (GDB)</strong> فحص برنامج قيد التشغيل وإظهار شيفرة الكائن المشترك المحمَّلة والمربوطة وقت التشغيل. نغطي GDB في <a href="https://diveintosystems.org/book/C3-C_debug/index.html#_c_debugging_tools">الفصل 3</a>. غير أن تفاصيل فحص جدول البحث عن الإجراءات (PLT)، المستخدم للربط وقت التشغيل لاستدعاءات دوال المكتبات المربوطة ديناميكياً، خارج نطاق هذا الكتاب.</p>
<p>لمزيد من التفاصيل عن مراحل التصريف وعن أدوات فحص المراحل المختلفة، انظر: <a href="http://www.cs.swarthmore.edu/~newhall/unixhelp/compilecycle.html">مراحل التصريف</a>.</p>
<h4><a href="#_common_compilation_errors_related_to_compiling_and_linking_libraries"></a>أخطاء التصريف الشائعة المتعلقة بتصريف المكتبات وربطها</h4>
<p>قد تحدث عدة أخطاء تصريف وربط لأن المبرمج نسي تضمين ملفات ترويسة المكتبة أو نسي ربط شيفرة المكتبة صراحةً. وسيساعد تحديد خطأ أو تحذير مصرّف <code>gcc</code> المرتبط بكل من هذه الأخطاء في تنقيح الأخطاء المتعلقة باستخدام مكتبات C.</p>
<p>تأمّل برنامج C التالي الذي يستدعي دالة <code>libraryfunc</code> من مكتبة <code>examplelib</code> المتاحة كملف كائن مشترك، <code>libexamplelib.so</code>:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;examplelib.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">int</span> argc, <span class="hljs-type">char</span> *argv[])</span> {
    <span class="hljs-type">int</span> result;
    result = libraryfunc(<span class="hljs-number">6</span>, MAX);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;result is %d\\n&quot;</span>, result);
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>افترض أن ملف الترويسة <code>examplelib.h</code> يحتوي التعريفات في المثال التالي:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">define</span> MAX 10   <span class="hljs-comment">// a constant exported by the library</span></span>

<span class="hljs-comment">// a function exported by the library</span>
<span class="hljs-keyword">extern</span> <span class="hljs-type">int</span> <span class="hljs-title function_">libraryfunc</span><span class="hljs-params">(<span class="hljs-type">int</span> x, <span class="hljs-type">int</span> y)</span>;
</code></pre>
<p>تعني البادئة <code>extern</code> قبل نموذج الدالة أن تعريف الدالة يأتي من ملف آخر — فهو ليس في ملف <code>examplelib.h</code>، بل توفّره إحدى ملفات <code>.c</code> في تنفيذ المكتبة.</p>
<h4><a href="#_forgetting_to_include_a_header_file"></a>نسيان تضمين ملف ترويسة</h4>
<p>إذا نسي المبرمج تضمين <code>examplelib.h</code> في برنامجه، أنتج المصرّف تحذيرات وأخطاء بشأن استخدام البرنامج دوال وثوابت مكتبة لا يعرفها. فمثلاً، إذا صرّف المستخدم برنامجه دون <code>#include </code> سينتج <code>gcc</code> الناتج التالي:</p>
<pre><code class="language-javascript"># <span class="hljs-string">&#x27;-g&#x27;</span>: add debug information, <span class="hljs-string">&#x27;-c&#x27;</span>: compile to .<span class="hljs-property">o</span>
gcc -g -c myprog.<span class="hljs-property">c</span>

myprog.<span class="hljs-property">c</span>: <span class="hljs-title class_">In</span> <span class="hljs-keyword">function</span> <span class="hljs-attr">main</span>:
myprog.<span class="hljs-property">c</span>:<span class="hljs-number">8</span>:<span class="hljs-number">12</span>: <span class="hljs-attr">warning</span>: implicit declaration <span class="hljs-keyword">of</span> <span class="hljs-keyword">function</span> libraryfunc
   result = <span class="hljs-title function_">libraryfunc</span>(<span class="hljs-number">6</span>, <span class="hljs-variable constant_">MAX</span>);
            ^~~~~~~~~~~

myprog.<span class="hljs-property">c</span>:<span class="hljs-number">8</span>:<span class="hljs-number">27</span>: <span class="hljs-attr">error</span>: <span class="hljs-variable constant_">MAX</span> <span class="hljs-title function_">undeclared</span> (first use <span class="hljs-keyword">in</span> <span class="hljs-variable language_">this</span> <span class="hljs-keyword">function</span>)
   result = <span class="hljs-title function_">libraryfunc</span>(<span class="hljs-number">6</span>, <span class="hljs-variable constant_">MAX</span>);
                           ^~~
</code></pre>
<p>يخبر تحذير المصرّف الأول (<code>implicit declaration of function libraryfunc</code>) المبرمج بأن المصرّف لا يستطيع إيجاد نموذج دالة للدالة <code>libraryfunc</code>. وهذا مجرد تحذير من المصرّف لأن <code>gcc</code> سيفترض أن نوع إرجاع الدالة عدد صحيح وسيواصل تصريف البرنامج. غير أنه لا ينبغي للمبرمجين <em>إغفال</em> تحذيرات كهذه! فهي تشير إلى أن البرنامج لا يضمّن نموذج دالة قبل استخدامها في ملف <code>myprog.c</code>، وهو غالباً بسبب عدم تضمين ملف ترويسة يحتوي نموذج الدالة.</p>
<p>وينتج خطأ المصرّف الثاني (<code>MAX undeclared (first use in this function)</code>) عن تعريف ثابت مفقود. ولا يستطيع المصرّف تخمين قيمة الثابت المفقود، لذا يفشل هذا التعريف المفقود بخطأ. وكثيراً ما تشير رسالة «غير معلَن» هذه إلى أن ملف ترويسة يعرّف ثابتاً أو متغيّراً عاماً مفقود أو لم يُضمَّن على النحو الصحيح.</p>
<h4><a href="#_forgetting_to_link_a_library"></a>نسيان ربط مكتبة</h4>
<p>إذا ضمّن المبرمج ملف ترويسة المكتبة (كما في القائمة السابقة)، لكنه نسي ربط المكتبة صراحةً في خطوة تحرير الربط (الخطوة 4) من التصريف، فسيشير <code>gcc</code> إلى ذلك بخطأ <code>undefined reference</code>:</p>
<pre><code class="language-bash">$ gcc -g myprog.c

In <span class="hljs-keyword">function</span> main:
myprog.c:9: undefined reference to libraryfunc
collect2: error: ld returned 1 <span class="hljs-built_in">exit</span> status
</code></pre>
<p>ينشأ هذا الخطأ من <code>ld</code>، وهو مكوّن الرابط في المصرّف. ويشير إلى أن الرابط لا يستطيع إيجاد تنفيذ دالة المكتبة <code>libraryfunc</code> التي تُستدعى في السطر 9 في <code>myprog.c</code>. ويشير خطأ <code>undefined reference</code> إلى أن مكتبة تحتاج إلى ربط صريح في الملف التنفيذي. وفي هذا المثال، سيصلح تحديد <code>-lexamplelib</code> في سطر أوامر <code>gcc</code> الخطأ:</p>
<pre><code class="language-bash">$ gcc -g myprog.c  -lexamplelib
</code></pre>
<h4><a href="#_gcc_cant_find_header_or_library_files"></a>تعذّر على gcc إيجاد ملفات ترويسة أو مكتبة</h4>
<p>سيفشل التصريف أيضاً بأخطاء إذا لم تكن ملفات ترويسة مكتبة أو تنفيذها موجودة في المجلدات التي يبحث فيها <code>gcc</code> افتراضياً. فمثلاً، إذا لم يستطع <code>gcc</code> إيجاد ملف <code>examplelib.h</code>، فسينتج رسالة خطأ كهذه:</p>
<pre><code class="language-bash">$ gcc -c myprog.c -lexamplelib
myprog.c:1:10: fatal error: examplelib.h: No such file or directory
 <span class="hljs-comment">#include &lt;examplelib.h&gt;</span>
          ^~~~~~~
compilation terminated.
</code></pre>
<p>وإذا لم يستطع الرابط إيجاد نسخة <code>.a</code> أو <code>.so</code> من المكتبة لربطها في خطوة تحرير الربط من التصريف، فسيخرج <code>gcc</code> بخطأ كالتالي:</p>
<pre><code class="language-bash">$ gcc -c myprog.c -lexamplelib
/usr/bin/ld: cannot find -lexamplelib
collect2: error: ld returned 1 <span class="hljs-built_in">exit</span> status
</code></pre>
<p>وبالمثل، إذا لم يستطع ملف تنفيذي مربوط ديناميكياً تحديد موقع ملف كائن مشترك (مثل <code>libexamplelib.so</code>)، فسيفشل في التنفيذ وقت التشغيل بخطأ كالتالي:</p>
<pre><code class="language-bash">$ ./a.out
./a.out: error <span class="hljs-keyword">while</span> loading shared libraries:
        libexamplelib.so: cannot open shared object file: No such file or directory
</code></pre>
<p>لحل هذه الأنواع من الأخطاء، يجب على المبرمجين تحديد خيارات إضافية لـ <code>gcc</code> للإشارة إلى مكان إيجاد ملفات المكتبة. وقد يحتاجون أيضاً إلى تعديل متغيّر البيئة <code>LD_LIBRARY_PATH</code> ليجد الرابط وقت التشغيل ملف <code>.so</code> لمكتبة.</p>
<h4><a href="#_library_and_include_paths"></a>مسارات المكتبات والتضمين</h4>
<p>يبحث المصرّف تلقائياً في مواقع المجلدات القياسية عن ملفات الترويسة والمكتبات. فمثلاً، تخزّن الأنظمة عادةً ملفات الترويسة القياسية في <code>/usr/include</code> وملفات المكتبات في <code>/usr/lib</code> ويبحث <code>gcc</code> تلقائياً عن الترويسات والمكتبات في هذه المجلدات؛ كما يبحث <code>gcc</code> تلقائياً عن ملفات الترويسة في مجلد العمل الحالي.</p>
<p>وإذا لم يستطع <code>gcc</code> إيجاد ملف ترويسة أو مكتبة، فيجب على المستخدم توفير المسارات صراحةً في سطر الأوامر باستخدام <code>-I</code> و<code>-L</code>. فمثلاً، لنفترض وجود مكتبة باسم <code>libexamplelib.so</code> في <code>/home/me/lib</code>، وملف ترويستها <code>examplelib.h</code> في <code>/home/me/include</code>. ولأن <code>gcc</code> لا يعرف شيئاً عن هذين المسارين افتراضياً، يجب إخباره صراحةً بتضمين الملفات هناك لتصريف برنامج يستخدم هذه المكتبة بنجاح:</p>
<pre><code class="language-bash">$ gcc  -I/home/me/include -o myprog myprog.c -L/home/me/lib -lexamplelib
</code></pre>
<p>لتحديد موقع مكتبة ديناميكية (مثل <code>libexamplelib.so</code>) عند إطلاق ملف تنفيذي مربوط ديناميكياً، اضبط متغيّر البيئة <code>LD_LIBRARY_PATH</code> ليتضمن المسار إلى المكتبة. وفيما يلي أمر bash مثال يمكن تشغيله في موجّه الصدفة أو إضافته إلى ملف <code>.bashrc</code>:</p>
<pre><code>export LD_LIBRARY_PATH=/home/me/lib:$LD_LIBRARY_PATH
</code></pre>
<p>عندما تطول أسطر أوامر <code>gcc</code> أو عندما يحتاج ملف تنفيذي إلى ملفات مصدرية وترويسة كثيرة، يساعد تبسيط التصريف باستخدام <code>make</code> و<code>Makefile</code>. وفيما يلي مزيد من المعلومات عن <a href="https://diveintosystems.org/book/Appendix2/makefiles.html#_make_and_makefiles">make وملفات Makefile</a>.</p>
<p>عادةً يقسّم المبرمجون برامج C الكبيرة إلى <strong>وحدات</strong> منفصلة (أي ملفات <code>.c</code> منفصلة) ذات وظائف مترابطة. وتُوضع التعريفات المشتركة بين أكثر من وحدة في ملفات ترويسة (ملفات <code>.h</code>) تضمّنها الوحدات التي تحتاجها. وبالمثل، تُنفَّذ شيفرة مكتبة C أيضاً في وحدة أو أكثر (ملفات <code>.c</code>) وملف ترويسة أو أكثر (ملفات <code>.h</code>). وكثيراً ما ينفّذ مبرمجو C مكتباتهم الخاصة من الوظائف الشائعة الاستخدام. وبكتابة مكتبة، ينفّذ المبرمج الوظيفة مرة واحدة في المكتبة، ثم يستطيع استخدامها في أي برنامج C لاحق يكتبه.</p>
<p>في قسم <a href="https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_c_link_load_">استخدام المكتبات وتصريفها وربطها</a>، نصف كيفية استخدام شيفرة مكتبة C وتصريفها وربطها في برامج C. وفي هذا القسم، نناقش كيفية كتابة مكتباتك الخاصة في C واستخدامها. وينطبق ما نعرضه هنا أيضاً على هيكلة برامج C الأكبر المكوَّنة من ملفات مصدرية وترويسة متعددة وتصريفها.</p>
<p>لإنشاء مكتبة في C:</p>
<ol>
<li>عرّف واجهة للمكتبة في ملف ترويسة (<code>.h</code>). ويجب أن يضمّن هذا الملف أي برنامج يريد استخدام المكتبة.</li>
<li>أنشئ تنفيذاً للمكتبة في ملف <code>.c</code> واحد أو أكثر. وتنفّذ مجموعة تعريفات الدوال هذه وظائف المكتبة. وقد تكون بعض الدوال دوال واجهة سيستدعيها مستخدمو المكتبة، وقد تكون أخرى دوال داخلية لا يمكن لمستخدمي المكتبة استدعاؤها (والدوال الداخلية جزء من التصميم المعياري الجيد لتنفيذ المكتبة).</li>
<li>صرّف صيغة ثنائية من المكتبة يمكن ربطها في البرامج التي تستخدم المكتبة.</li>
</ol>
<p>يمكن بناء الصيغة الثنائية للمكتبة مباشرةً من ملفها أو ملفاتها المصدرية كجزء من تصريف شيفرة التطبيق الذي يستخدم المكتبة. وتصرّف هذه الطريقة ملفات المكتبة إلى ملفات <code>.o</code> وتربطها ربطاً ساكناً في الملف التنفيذي الثنائي. وغالباً ما ينطبق تضمين المكتبات بهذه الطريقة على شيفرة مكتبة تكتبها لاستخدامك الخاص (لأنك تملك ملفاتها المصدرية <code>.c</code>)، وهي أيضاً الطريقة لبناء ملف تنفيذي من وحدات <code>.c</code> متعددة.</p>
<p>بدلاً من ذلك، يمكن تصريف مكتبة إلى ملف أرشيف ثنائي (<code>.a</code>) أو ملف كائن مشترك (<code>.so</code>) للبرامج التي تريد استخدام المكتبة. وفي هذه الحالات، غالباً لا يملك مستخدمو المكتبة حق الوصول إلى ملفات شيفرة C المصدرية للمكتبة، وبالتالي لا يستطيعون تصريف شيفرة المكتبة مباشرةً مع شيفرة التطبيق الذي يستخدمها. وعندما يستخدم برنامج مكتبة مصرَّفة مسبقاً كهذه (مثل <code>.a</code> أو <code>.so</code>)، يجب ربط شيفرة المكتبة صراحةً في الملف التنفيذي باستخدام خيار سطر الأوامر <code>-l</code> لـ <code>gcc</code>.</p>
<p>نركّز مناقشتنا التفصيلية لكتابة شيفرة المكتبات وتصريفها وربطها على الحالة التي يملك فيها المبرمج وحدات المكتبة الفردية (سواء ملفات <code>.c</code> أو <code>.o</code>). وينطبق هذا التركيز أيضاً على تصميم برامج C الكبيرة المقسَّمة إلى ملفات <code>.c</code> و<code>.h</code> متعددة وتصريفها. ونعرض بإيجاز أوامر بناء صيغ الأرشيف والكائن المشترك للمكتبات. وتتوفر معلومات إضافية عن بناء هذه الأنواع من ملفات المكتبات في وثائق <code>gcc</code>، بما في ذلك صفحات الدليل لـ <code>gcc</code> و<code>ar</code>.</p>
<h4><a href="#_library_details_by_example"></a>تفاصيل المكتبات بالأمثلة</h4>
<p>فيما يلي نعرض بعض الأمثلة على إنشاء مكتباتك الخاصة واستخدامها.</p>
<p><strong>عرّف واجهة المكتبة:</strong></p>
<p>ملفات الترويسة (ملف <code>.h</code>) ملفات نصية تحتوي نماذج دوال C وتعريفات أخرى — وتمثّل واجهة المكتبة. ويجب تضمين ملف ترويسة في أي تطبيق ينوي استخدام المكتبة. فمثلاً، تُخزَّن ملفات ترويسة مكتبة C القياسية عادةً في <code>/usr/include/</code> ويمكن عرضها بمحرّر:</p>
<pre><code class="language-bash">$ vi /usr/include/stdio.h
</code></pre>
<p>وفيما يلي <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/mylib.h">ملف ترويسة مثال (<code>mylib.h</code>)</a> من مكتبة يحتوي بعض التعريفات لمستخدمي المكتبة.</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">ifndef</span> _MYLIB_H_</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> _MYLIB_H_</span>

<span class="hljs-comment">// a constant definition exported by library:</span>
<span class="hljs-meta">#<span class="hljs-keyword">define</span> MAX_FOO  20</span>

<span class="hljs-comment">// a type definition exported by library:</span>
<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">foo_struct</span> {</span>
    <span class="hljs-type">int</span> x;
    <span class="hljs-type">float</span> y;
};

<span class="hljs-comment">// a global variable exported by library</span>
<span class="hljs-comment">// &quot;extern&quot; means that this is not a variable declaration,</span>
<span class="hljs-comment">// but it defines that a variable named total_times of type</span>
<span class="hljs-comment">// int exists in the library implementation and is available</span>
<span class="hljs-comment">// for use by programs using the library.</span>
<span class="hljs-comment">// It is unusual for a library to export global variables</span>
<span class="hljs-comment">// to its users, but if it does, it is important that</span>
<span class="hljs-comment">// extern appears in the definition in the .h file</span>
<span class="hljs-keyword">extern</span> <span class="hljs-type">int</span> total_times;

<span class="hljs-comment">// a function prototype for a function exported by library:</span>
<span class="hljs-comment">// extern means that this function definition exists</span>
<span class="hljs-comment">// somewhere else.</span>
<span class="hljs-comment">/*
 * This function returns the larger of two float values
 *  y, z: the two values
 *  returns the value of the larger one
 */</span>
<span class="hljs-keyword">extern</span> <span class="hljs-type">float</span> <span class="hljs-title function_">bigger</span><span class="hljs-params">(<span class="hljs-type">float</span> y, <span class="hljs-type">float</span> z)</span>;

<span class="hljs-meta">#<span class="hljs-keyword">endif</span></span>
</code></pre>
<p>عادةً ما تحتوي ملفات الترويسة شيفرة «قالبية» خاصة حول محتوياتها:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">ifndef</span></span>

<span class="hljs-comment">// header file contents</span>

<span class="hljs-meta">#<span class="hljs-keyword">endif</span></span>
</code></pre>
<p>تضمن هذه الشيفرة القالبية أن المعالج الأولي للمصرّف يضمّن محتويات <code>mylib.h</code> مرة واحدة بالضبط في أي ملف C يضمّنها. ومن المهم تضمين محتويات ملف <code>.h</code> مرة واحدة فقط لتجنّب أخطاء التعريف المكرر وقت التصريف. وبالمثل، إذا نسيت تضمين ملف <code>.h</code> في برنامج C يستخدم المكتبة، فسيولّد المصرّف تحذير <code>undefined symbol</code>.</p>
<p>التعليقات في ملف <code>.h</code> جزء من واجهة المكتبة، مكتوبة لمستخدميها. وينبغي أن تكون هذه التعليقات مستفيضة، تشرح التعريفات وتصف ما تفعله كل دالة مكتبة وما قيم الوسائط التي تأخذها وما ترجعه. وأحياناً يحتوي ملف <code>.h</code> أيضاً تعليقاً في المستوى الأعلى يصف كيفية استخدام المكتبة.</p>
<p>تعني الكلمة المفتاحية <strong>extern</strong> قبل تعريف المتغيّر العام ونموذج الدالة أن هذين الاسمين معرَّفان في مكان آخر. ومن المهم بشكل خاص تضمين <code>extern</code> قبل أي متغيّرات عامة تصدّرها المكتبة، لأنه يميّز تعريف الاسم والنوع (في ملف <code>.h</code>) عن إعلان المتغيّر في تنفيذ المكتبة. وفي المثال السابق، يُعلَن المتغيّر العام مرة واحدة بالضبط داخل المكتبة، لكنه يُصدَّر إلى مستخدميها عبر تعريفه <code>extern</code> في ملف <code>.h</code> الخاص بالمكتبة.</p>
<p><strong>نفّذ وظائف المكتبة:</strong></p>
<p>ينفّذ المبرمجون المكتبات في ملف <code>.c</code> واحد أو أكثر (وأحياناً ملفات <code>.h</code> داخلية). ويتضمن التنفيذ تعريفات جميع نماذج الدوال في ملف <code>.h</code> إضافة إلى دوال أخرى داخلية في تنفيذه. وكثيراً ما تُعرَّف هذه الدوال الداخلية بالكلمة المفتاحية <code>static</code> التي تحصر إتاحتها في الوحدة (ملف <code>.c</code>) المعرَّفة فيها. وينبغي أن يتضمن تنفيذ المكتبة أيضاً تعريفات متغيّرات لأي إعلانات متغيّرات عامة <code>extern</code> في ملف <code>.h</code>. وفيما يلي <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/mylib.c">مثال على تنفيذ مكتبة (<code>mylib.c</code>)</a>:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdlib.h&gt;</span></span>

<span class="hljs-comment">// Include the library header file if the implementation needs</span>
<span class="hljs-comment">// any of its definitions (types or constants, for example.)</span>
<span class="hljs-comment">// Use &quot; &quot; instead of &lt; &gt; if the mylib.h file is not in a</span>
<span class="hljs-comment">// default  library path with other standard library header</span>
<span class="hljs-comment">// files (the usual case for library code you write and use.)</span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;mylib.h&quot;</span></span>

<span class="hljs-comment">// declare the global variable exported by the library</span>
<span class="hljs-type">int</span> total_times = <span class="hljs-number">0</span>;

<span class="hljs-comment">// include function definitions for each library function:</span>
<span class="hljs-type">float</span> <span class="hljs-title function_">bigger</span><span class="hljs-params">(<span class="hljs-type">float</span> y, <span class="hljs-type">float</span> z)</span> {
    total_times++;
    <span class="hljs-keyword">if</span> (y &gt; z) {
        <span class="hljs-keyword">return</span> y;
    }
    <span class="hljs-keyword">return</span> z;
}
</code></pre>
<p><strong>أنشئ صيغة ثنائية للمكتبة:</strong></p>
<p>لإنشاء صيغة ثنائية للمكتبة (ملف <code>.o</code>)، صرّف مع الخيار <code>-c</code>:</p>
<pre><code class="language-bash">$ gcc -o mylib.o -c mylib.c
</code></pre>
<p>يمكن لملف <code>.o</code> واحد أو أكثر بناء نسخة أرشيف (<code>.a</code>) أو كائن مشترك (<code>.so</code>) من المكتبة.</p>
<ul>
<li>لبناء مكتبة ساكنة استخدم أداة الأرشيف (<code>ar</code>):</li>
</ul>
<pre><code class="language-bash">ar -rcs libmylib.a mylib.o
</code></pre>
<ul>
<li>ولبناء مكتبة مربوطة ديناميكياً، يجب بناء ملف/ملفات كائن <code>mylib.o</code> في المكتبة باستخدام <strong>شيفرة مستقلة عن الموقع</strong> (position independent code) (باستخدام <code>-fPIC</code>). ويمكن إنشاء ملف كائن مشترك <code>libmylib.so</code> من <code>mylib.o</code> بتحديد العلامة <code>-shared</code> إلى <code>gcc</code>:</li>
</ul>
<pre><code class="language-bash">gcc -fPIC -o mylib.o -c mylib.c
gcc -shared -o libmylib.so mylib.o
</code></pre>
<ul>
<li>غالباً ما تُبنى مكتبات الكائن المشترك والأرشيف من ملفات <code>.o</code> متعددة، فمثلاً (تذكّر أن <code>.o</code> للمكتبات المربوطة ديناميكياً تحتاج إلى بناء باستخدام العلامة <code>-fPIC</code>):</li>
</ul>
<pre><code class="language-bash">gcc -shared -o libbiglib.so file1.o file2.o file3.o file4.o
ar -rcs libbiglib.a file1.o file2.o file3.o file4.o
</code></pre>
<p><strong>استخدم المكتبة واربطها:</strong></p>
<p>في ملفات <code>.c</code> أخرى تستخدم هذه المكتبة:</p>
<ol>
<li>ضمّن ملف ترويستها (<code>#include</code>)، و</li>
<li>اربط التنفيذ صراحةً (ملف <code>.o</code>) أثناء التصريف.</li>
</ol>
<p>بعد تضمين ملف ترويسة المكتبة، يمكن لشيفرتك حينها استدعاء دوال المكتبة (مثل <a href="https://diveintosystems.org/book/C2-C_depth/_attachments/myprog.c"><code>myprog.c</code></a>):</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;mylib.h&quot;</span>   <span class="hljs-comment">// include library header file</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">float</span> val1, val2, ret;
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;Enter two float values: &quot;</span>);
    <span class="hljs-built_in">scanf</span>(<span class="hljs-string">&quot;%f%f&quot;</span>, &amp;val1, &amp;val2);
    ret = bigger(val1, val2);   <span class="hljs-comment">// use a library function</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;%f is the biggest\\n&quot;</span>, ret);

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p><strong>ملاحظة — صياغة <code>#include</code> والمعالج الأولي</strong></p>
<blockquote>
<p>لاحظ أن صياغة <code>#include</code> لتضمين <code>mylib.h</code> تختلف عن صياغة تضمين <code>stdio.h</code>. والسبب أن <code>mylib.h</code> ليس موجوداً مع ملفات الترويسة الخاصة بالمكتبات القياسية. وللمعالج الأولي أماكن افتراضية يبحث فيها عن ملفات الترويسة القياسية. وعند تضمين ملف بصياغة \`\` syntax instead of the <code>&quot;file.h&quot;</code>، يبحث المعالج الأولي عن ملف الترويسة في تلك الأماكن القياسية.</p>
<p>وعند تضمين <code>mylib.h</code> بين علامتي اقتباس مزدوجتين، يبحث المعالج الأولي أولاً في المجلد الحالي عن ملف <code>mylib.h</code>، ثم في أماكن أخرى تحتاج إلى إخباره صراحةً بالبحث فيها، بتحديد مسار تضمين (<code>-I</code>) لـ <code>gcc</code>. فمثلاً، إذا كان ملف الترويسة في مجلد <code>/home/me/myincludes</code> (وليس في المجلد نفسه الذي فيه ملف <code>myprog.c</code>)، فيجب تحديد المسار إلى هذا المجلد في سطر أوامر <code>gcc</code> ليجد المعالج الأولي ملف <code>mylib.h</code>:</p>
<pre><code class="language-bash">$ gcc -I/home/me/myincludes -c myprog.c
</code></pre>
</blockquote>
<p>لتصريف برنامج (<code>myprog.c</code>) يستخدم المكتبة (<code>mylib.o</code>) إلى ملف تنفيذي ثنائي:</p>
<pre><code class="language-bash">$ gcc -o myprog myprog.c mylib.o
</code></pre>
<p>أو، إذا كانت ملفات تنفيذ المكتبة متاحة وقت التصريف، فيمكن بناء البرنامج مباشرةً من ملفات <code>.c</code> الخاصة بالبرنامج والمكتبة:</p>
<pre><code class="language-bash">$ gcc -o myprog myprog.c mylib.c
</code></pre>
<p>أو، إذا كانت المكتبة متاحة كملف أرشيف أو كائن مشترك، فيمكن ربطها باستخدام <code>-l</code> (<code>-lmylib</code>: لاحظ أن اسم المكتبة <code>libmylib.[a,so]</code>، ولكن يُضمَّن فقط الجزء <code>mylib</code> في سطر أوامر <code>gcc</code>):</p>
<pre><code class="language-bash">$ gcc -o myprog myprog.c -L. -lmylib
</code></pre>
<p>يحدد الخيار <code>-L.</code> المسار إلى ملفات <code>libmylib.[so,a]</code> (و<code>.</code> بعد <code>-L</code> يشير إلى أنه ينبغي البحث في المجلد الحالي). وبشكل افتراضي، سيربط <code>gcc</code> مكتبة ربطاً ديناميكياً إذا استطاع إيجاد نسخة <code>.so</code>. انظر <a href="https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_c_link_load_">قسم استخدام مكتبات C</a> لمزيد من المعلومات عن الربط ومسارات الربط.</p>
<p>ويمكن بعد ذلك تشغيل البرنامج:</p>
<pre><code class="language-bash">$ ./myprog
</code></pre>
<p>إذا شغّلت النسخة المربوطة ديناميكياً من <code>myprog</code>، فقد تصادف خطأً كهذا:</p>
<pre><code>/usr/bin/ld: cannot find -lmylib
collect2: error: ld returned 1 exit status
</code></pre>
<p>يعني هذا الخطأ أن الرابط وقت التشغيل لا يستطيع إيجاد <code>libmylib.so</code> وقت التشغيل. ولحل هذه المشكلة، اضبط متغيّر البيئة <code>LD_LIBRARY_PATH</code> ليتضمن المسار إلى ملف <code>libmylib.so</code>. وتستخدم تشغيلات <code>myprog</code> اللاحقة المسار الذي تضيفه إلى <code>LD_LIBRARY_PATH</code> لإيجاد ملف <code>libmylib.so</code> وتحميله وقت التشغيل. فمثلاً، إذا كان <code>libmylib.so</code> في المجلد الفرعي <code>/home/me/mylibs/</code>، شغّل هذا (مرة واحدة فقط) في موجّه صدفة bash لضبط متغيّر البيئة <code>LD_LIBRARY_PATH</code>:</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">export</span> LD_LIBRARY_PATH=/home/me/mylibs:<span class="hljs-variable">$LD_LIBRARY_PATH</span>
</code></pre>
<p>يمكن للمصرّف تصريف شيفرة C إلى شيفرة لغة تجميع، ويمكنه تصريف شيفرة لغة التجميع إلى صيغة ثنائية تُربط في برنامج تنفيذي ثنائي. نستخدم لغة تجميع IA32 و<code>gcc</code> كمثالينا على لغة التجميع والمصرّف، لكن أي مصرّف C يدعم هذه الوظيفة، ومعظم المصرّفات تدعم التصريف إلى عدد من لغات التجميع المختلفة. انظر <a href="https://diveintosystems.org/book/C8-IA32/index.html#_assembly_chapter">الفصل 8</a> لتفاصيل عن شيفرة لغة التجميع والبرمجة بلغة التجميع.</p>
<p>تأمّل برنامج C البسيط جداً هذا:</p>
<p>simpleops.c</p>
<pre><code class="language-c"><span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> x, y;
    x = <span class="hljs-number">1</span>;
    x = x + <span class="hljs-number">2</span>;
    x = x - <span class="hljs-number">14</span>;
    y = x*<span class="hljs-number">100</span>;
    x = x + y * <span class="hljs-number">6</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>سيصرّفه مصرّف <code>gcc</code> إلى ملف نصي بلغة تجميع IA32 (<code>.s</code>) باستخدام خيار سطر الأوامر <code>-S</code> لتحديد التصريف إلى لغة التجميع وخيار سطر الأوامر <code>-m32</code> لتحديد توليد تجميع IA32:</p>
<pre><code class="language-bash">$ gcc -m32 -S simpleops.c   <span class="hljs-comment"># runs the assembler to create a .s text file</span>
</code></pre>
<p>ينشئ هذا الأمر ملفاً باسم <code>simpleops.s</code> يحتوي ترجمة المصرّف للشيفرة C إلى تجميع IA32. ولأن ملف <code>.s</code> ملف نصي، يمكن للمستخدم عرضه (وتحريره) بأي محرّر نصوص. فمثلاً:</p>
<pre><code class="language-bash">$ vim simpleops.s
</code></pre>
<p>تمرير علامات مصرّف إضافية يوفّر توجيهات إلى <code>gcc</code> باستخدامه ميزات أو تحسينات معينة في ترجمته للشيفرة من C إلى تجميع IA32.</p>
<p>يمكن لمصرّف <code>gcc</code> تصريف ملف شيفرة لغة تجميع، سواء أُنشئ من <code>gcc</code> أم كتبه المبرمج يدوياً، إلى صيغة شيفرة آلة ثنائية باستخدام الخيار <code>-c</code>:</p>
<pre><code class="language-bash">$ gcc -m32 -c simpleops.s   <span class="hljs-comment"># compiles to a relocatable object binary file (.o)</span>
</code></pre>
<p>ويمكن بعد ذلك ربط ملف <code>simpleops.o</code> الناتج في ملف تنفيذي ثنائي (ملاحظة: يتطلب هذا تثبيت النسخة 32 بت من مكتبات النظام على نظامك):</p>
<pre><code class="language-bash">$ gcc -m32 -o simpleops simpleops.o  <span class="hljs-comment"># creates a 32-bit executable file</span>
</code></pre>
<p>ينشئ هذا الأمر ملفاً تنفيذياً ثنائياً، <code>simpleops</code>، لمعماريات IA32 (وx86-64).</p>
<p>يمكن أن يتضمن سطر أوامر <code>gcc</code> لبناء ملف تنفيذي ملفات <code>.o</code> و<code>.c</code> التي ستُصرَّف وتُربط معاً لإنشاء الملف التنفيذي الثنائي الواحد.</p>
<p>توفّر الأنظمة أدوات تتيح للمستخدمين عرض الملفات الثنائية. فمثلاً، يعرض <code>objdump</code> خرائط شيفرة الآلة وشيفرة لغة التجميع في ملفات <code>.o</code>:</p>
<pre><code class="language-bash">$ objdump -d simpleops.o
</code></pre>
<p>يمكن مقارنة هذا الناتج بملف لغة التجميع:</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">cat</span> simpleops.s
</code></pre>
<p>ينبغي أن ترى شيئاً كهذا (أضفنا تعليقات إلى بعض شيفرة لغة التجميع بمقابلها من البرنامج بلغة C):</p>
<pre><code>        .file   &quot;simpleops.c&quot;
        .text
        .globl main
        .type   main, @function
main:
        pushl   %ebp
        movl    %esp, %ebp
        subl    $16, %esp
        movl    $1, -8(%ebp)      # x = 1
        addl    $2, -8(%ebp)      # x = x + 2
        subl    $14, -8(%ebp)     # x = x - 14
        movl    -8(%ebp), %eax    # load x into R[%eax]
        imull   $100, %eax, %eax  # into R[%eax] store result of x*100
        movl    %eax, -4(%ebp)    # y = x*100
        movl    -4(%ebp), %edx
        movl    %edx, %eax
        addl    %eax, %eax
        addl    %edx, %eax
        addl    %eax, %eax
        addl    %eax, -8(%ebp)
        movl    $0, %eax
        leave
        ret
        .size   main, .-main
        .ident	&quot;GCC: (Ubuntu 7.4.0-1ubuntu1~18.04.1) 7.4.0&quot;
        .section	.note.GNU-stack,&quot;&quot;,@progbits
</code></pre>
<h4><a href="#_writing_and_compiling_assembly_code"></a>كتابة شيفرة لغة التجميع وتصريفها</h4>
<p>يمكن للمبرمجين كتابة شيفرة لغة التجميع الخاصة بهم يدوياً وتصريفها بـ <code>gcc</code> إلى برنامج تنفيذي ثنائي. فمثلاً، لتنفيذ دالة بلغة التجميع، أضف شيفرة إلى ملف <code>.s</code> واستخدم <code>gcc</code> لتصريفها. ويوضح المثال التالي البنية الأساسية لدالة بلغة تجميع IA32. وستُكتب شيفرة كهذه في ملف (مثلاً <code>myfunc.s</code>) لدالة بنموذج <code>int myfunc(int param);</code>. وقد تختلف الدوال ذات الوسائط الأكثر أو التي تحتاج مساحة أكبر للمتغيّرات المحلية قليلاً في شيفرة مقدمتها.</p>
<pre><code class="language-javascript">        .<span class="hljs-property">text</span>                   # <span class="hljs-variable language_">this</span> file contains instruction code
.<span class="hljs-property">globl</span> myfunc                   # myfunc is the name <span class="hljs-keyword">of</span> a <span class="hljs-keyword">function</span>
        .<span class="hljs-property">type</span>   myfunc, @<span class="hljs-keyword">function</span>
<span class="hljs-attr">myfunc</span>:                         # the start <span class="hljs-keyword">of</span> the <span class="hljs-keyword">function</span>
        pushl   %ebp            # <span class="hljs-keyword">function</span> <span class="hljs-attr">preamble</span>:
        movl    %esp, %ebp      #  the 1st three instrs set up the stack
        subl    $16, %esp

        # A programmer adds specific <span class="hljs-title class_">IA32</span> instructions
        # here that allocate stack space <span class="hljs-keyword">for</span> any local variables
        # and then implements code <span class="hljs-keyword">using</span> parameters and locals to
        # perform the functionality <span class="hljs-keyword">of</span> the myfunc <span class="hljs-keyword">function</span>
        #
        # the <span class="hljs-keyword">return</span> value should be stored <span class="hljs-keyword">in</span> %eax before returning

        leave    # <span class="hljs-keyword">function</span> <span class="hljs-keyword">return</span> code
        ret
</code></pre>
<p>سيحتاج برنامج C يريد استدعاء هذه الدالة إلى تضمين نموذج دالتها:</p>
<pre><code class="language-c"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;stdio.h&gt;</span></span>

<span class="hljs-type">int</span> <span class="hljs-title function_">myfunc</span><span class="hljs-params">(<span class="hljs-type">int</span> param)</span>;

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">(<span class="hljs-type">void</span>)</span> {
    <span class="hljs-type">int</span> ret;

    ret = myfunc(<span class="hljs-number">32</span>);
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">&quot;myfunc(32) is %d\\n&quot;</span>, ret);

    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>تبني أوامر <code>gcc</code> التالية ملفاً تنفيذياً (<code>myprog</code>) من ملفي الشيفرة المصدرية <code>myfunc.s</code> و<code>main.c</code>:</p>
<pre><code class="language-bash">$ gcc -m32 -c myfunc.s
$ gcc -m32 -o myprog myfunc.o main.c
</code></pre>
<p>شيفرة لغة تجميع مكتوبة يدوياً</p>
<p>خلافاً لـ C، وهي لغة عالية المستوى يمكن تصريفها وتشغيلها على مجموعة واسعة ومتنوعة من الأنظمة، فإن شيفرة لغة التجميع منخفضة المستوى جداً وخاصة بمعمارية عتاد بعينها. وقد يكتب المبرمجون شيفرة لغة تجميع يدوياً لدوال منخفضة المستوى أو لتسلسلات شيفرة حاسمة في أداء برمجياتهم. ويستطيع المبرمج أحياناً كتابة شيفرة تجميع تعمل أسرع من ترجمة المصرّف المحسَّنة للشيفرة C، وأحياناً يريد مبرمج C الوصول إلى أجزاء منخفضة المستوى من المعمارية الأساسية (مثل سجلات محددة) في شيفرته. ولهذه الأسباب كثيراً ما تُنفَّذ أجزاء صغيرة من شيفرة نظام التشغيل بلغة التجميع. غير أنه لأن C لغة محمولة وأعلى مستوى بكثير من لغات التجميع، فإن الغالبية العظمى من شيفرة نظام التشغيل مكتوبة بلغة C، اعتماداً على مصرّفات محسِّنة جيدة لإنتاج شيفرة آلة جيدة الأداء.</p>
<p>ورغم أن معظم مبرمجي الأنظمة نادراً ما يكتبون شيفرة لغة تجميع، فإن القدرة على قراءة شيفرة لغة تجميع البرنامج وفهمها مهارة مهمة للحصول على فهم أعمق لما يفعله البرنامج وكيف يُنفَّذ. وقد تساعد أيضاً في فهم أداء البرنامج وفي اكتشاف الثغرات الأمنية في البرامج وفهمها.</p>
<p>غطّينا في هذا الفصل لغة البرمجة C بعمق وناقشنا أيضاً بعض موضوعات البرمجة المتقدمة في C. وفي الفصل التالي، نقدّم أداتين مفيدتين جداً لتنقيح C: منقّح GNU GDB لتنقيح برامج C على وجه العموم، ومنقّح الذاكرة Valgrind لإيجاد أخطاء الوصول إلى الذاكرة في برامج C. وبهذه الأدوات البرمجية ومعرفة لغة البرمجة C الجوهرية المعروضة في هذا الفصل، يستطيع مبرمج C تصميم برمجيات قوية وفعّالة ومتينة.</p>
<ul>
<li><a href="https://diveintosystems.org/exercises/dive-into-systems-exercises-5.html">جميع تمارين الفصل 2</a></li>
</ul>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,l as headings,c as html,e as slug,p as title};
