const n="mooc",s="part-12",a="الجزء 12: البرمجة الدالية",e="4-regular-expressions",o="التعبيرات النمطية",p=[{depth:2,id:"ما-هي-التعبيرات-النمطية",text:"ما هي التعبيرات النمطية؟"},{depth:2,id:"صياغة-التعبيرات-النمطية",text:"صياغة التعبيرات النمطية"},{depth:3,id:"السلاسل-الفرعية-البديلة",text:"السلاسل الفرعية البديلة"},{depth:3,id:"مجموعات-الأحرف",text:"مجموعات الأحرف"},{depth:3,id:"المطابقات-المتكررة",text:"المطابقات المتكرّرة"},{depth:3,id:"أحرف-خاصة-أخرى",text:"أحرف خاصة أخرى"},{depth:2,id:"أيام-الأسبوع",text:"أيام الأسبوع"},{depth:2,id:"التحقق-من-حروف-العلة",text:"التحقق من حروف العلة"},{depth:2,id:"الوقت-من-اليوم",text:"الوقت من اليوم"},{depth:2,id:"الختام-الكبير",text:"الختام الكبير"},{depth:2,id:"البحث-والقائمة",text:"البحث والقائمة"},{depth:2,id:"سرد-اللاعبين-حسب-النقاط",text:"سرد اللاعبين حسب النقاط"},{depth:2,id:"اللاعبون-الأكثر-نجاحا",text:"اللاعبون الأكثر نجاحًا"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف ما هي التعبيرات النمطية</li>
<li>ستكون قادرًا على استخدام التعبيرات النمطية في برامجك الخاصة</li>
</ul>
</blockquote>
<p>أثبتنا بالفعل أن بايثون بيئة ممتازة لمعالجة النصوص. ومن الأدوات الإضافية القوية لمعالجة النصوص <em>التعبيرات النمطية</em> (regular expressions)، التي يُختصر اسمها غالبًا بـ <em>regex</em> أو <em>regexp</em>. وهي طريقة لاختيار السلاسل النصية التي تتبع نمطًا معيّنًا والبحث عنها. يقدّم لك هذا القسم أساسيات التعبير النمطي، لكنك ستجد معلومات أكثر بكثير على الإنترنت، بما في ذلك في <a href="https://docs.python.org/3/howto/regex.html">دليل</a> بايثون.</p>
<h2 id="ما-هي-التعبيرات-النمطية">ما هي التعبيرات النمطية؟</h2>
<p>التعبيرات النمطية ليست ميزة خاصة ببايثون فقط. فهي تمثّل، على نحو ما، لغة برمجة داخل لغة برمجة. وهي متوافقة إلى حدٍّ ما عبر العديد من لغات البرمجة المختلفة. وللتعبيرات النمطية صياغتها الخاصة. والفكرة هي تحديد مجموعة من السلاسل النصية التي تتبع قواعد معيّنة.</p>
<p>لنبدأ بمثال بسيط قبل أن نتعمّق أكثر في الصياغة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> re

words = [<span class="hljs-string">&quot;Python&quot;</span>, <span class="hljs-string">&quot;Pantone&quot;</span>, <span class="hljs-string">&quot;Pontoon&quot;</span>, <span class="hljs-string">&quot;Pollute&quot;</span>, <span class="hljs-string">&quot;Pantheon&quot;</span>]

<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> words:
    <span class="hljs-comment"># the string should begin with &quot;P&quot; and end with &quot;on&quot;</span>
    <span class="hljs-keyword">if</span> re.search(<span class="hljs-string">&quot;^P.*on$&quot;</span>, word):
        <span class="hljs-built_in">print</span>(word, <span class="hljs-string">&quot;found!&quot;</span>)
</code></pre>
<pre><code>Python found!
Pontoon found!
Pantheon found!
</code></pre>
<p>نحتاج إلى <code>import</code> الوحدة <code>re</code> لكي نستخدم التعبيرات النمطية في بايثون. وتحتوي الوحدة <code>re</code> على دوال عديدة للعمل مع التعبيرات النمطية. وفي المثال أعلاه تأخذ الدالة <code>search</code> وسيطين من نوع سلسلة نصية: سلسلة النمط، والسلسلة الهدف التي يُبحث فيها عن النمط.</p>
<p>يبحث هذا المثال الثاني عن أي أعداد في سلسلة نصية. وتعيد الدالة <code>findall</code> قائمة بجميع المواضع التي تطابق النمط:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> re

sentence = <span class="hljs-string">&quot;First, 2 !#third 44 five 678xyz962&quot;</span>

numbers = re.findall(<span class="hljs-string">&quot;\\d+&quot;</span>, sentence)

<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>2
44
678
962
</code></pre>
<h2 id="صياغة-التعبيرات-النمطية">صياغة التعبيرات النمطية</h2>
<p>لنتعرّف على الصياغة الأساسية للتعبيرات النمطية. وتستخدم معظم الأمثلة التالية برنامج الاختبار هذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> re

expression = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in an expression: &quot;</span>)

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    input_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
    <span class="hljs-keyword">if</span> input_string == <span class="hljs-string">&quot;&quot;</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">if</span> re.search(expression, input_string):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Found!&quot;</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Not found.&quot;</span>)
</code></pre>
<h3 id="السلاسل-الفرعية-البديلة">السلاسل الفرعية البديلة</h3>
<p>يتيح لك الشريط العمودي <code>|</code>، المسمى أيضًا حرف الأنبوب، مطابقة سلاسل فرعية بديلة. ومعناه إذن <em>أو</em>. على سبيل المثال، يطابق التعبير <code>911|112</code> السلاسل النصية التي تتضمن إما السلسلة الفرعية <code>911</code> أو السلسلة الفرعية <code>112</code>.</p>
<p>مثال باستخدام برنامج الاختبار:</p>
<pre><code>Please type in an expression: **aa|ee|ii**
Please type in a string: **aardvark**
Found!
Please type in a string: **feelings**
Found!
Please type in a string: **radii**
Found!
Please type in a string: **smooch**
Not found.
Please type in a string: **continuum**
Not found.
</code></pre>
<h3 id="مجموعات-الأحرف">مجموعات الأحرف</h3>
<p>تُستخدم الأقواس المربعة للدلالة على مجموعات الأحرف المقبولة. على سبيل المثال، يطابق التعبير <code>[aeio]</code> جميع السلاسل النصية التي تحتوي على أيٍّ من الأحرف a أو e أو i أو o.</p>
<p>يُسمح أيضًا بالشَرطة لمطابقة نطاقات من الأحرف. على سبيل المثال، يطابق التعبير <code>[0-68a-d]</code> جميع السلاسل النصية التي تحتوي على رقم بين 0 و6، أو على الرقم ثمانية، أو على حرف بين a وd. وفي هذه الصياغة تكون جميع النطاقات <em>شاملة للطرفين</em>.</p>
<p>ويتيح لك الجمع بين مجموعتين من الأقواس مطابقة حرفين متتاليين. على سبيل المثال، يطابق التعبير <code>[1-3][0-9]</code> أي عدد مكوّن من رقمين بين 10 و39، شاملًا الطرفين.</p>
<p>مثال باستخدام برنامج الاختبار:</p>
<pre><code>Please type in an expression: **[C-FRSO]**
Please type in a string: **C**
Found!
Please type in a string: **E**
Found!
Please type in a string: **G**
Not found.
Please type in a string: **R**
Found!
Please type in a string: **O**
Found!
Please type in a string: **T**
Not found.
</code></pre>
<h3 id="المطابقات-المتكررة">المطابقات المتكرّرة</h3>
<p>يمكن تكرار أي جزء من التعبير باستخدام المعاملات التالية:</p>
<ul>
<li><code>*</code> يتكرّر لأي عدد من المرات، بما في ذلك الصفر</li>
<li><code>+</code> يتكرّر لأي عدد من المرات، ولكن مرة واحدة على الأقل</li>
<li><code>{m}</code> يتكرّر لعدد <code>m</code> من المرات بالضبط</li>
</ul>
<p>تعمل هذه المعاملات على الجزء من التعبير الذي يسبق المعامل مباشرةً. على سبيل المثال، يطابق التعبير <code>ba+b</code> السلاسل الفرعية <code>bab</code> و<code>baab</code> و<code>baaaaaaaaaaab</code>، من بين غيرها. ويطابق التعبير <code>A[BCDE]*Z</code> السلاسل الفرعية <code>AZ</code> و<code>ADZ</code> و<code>ABCDEBCDEBCDEZ</code>، من بين غيرها.</p>
<p>مثال باستخدام برنامج الاختبار:</p>
<pre><code>Please type in an expression: **1[234]\\*5**
Please type in a string: **15**
Found!
Please type in a string: **125**
Found!
Please type in a string: **145**
Found!
Please type in a string: **12342345**
Found!
Please type in a string: **126**
Not found.
Please type in a string: **165**
Not found.
</code></pre>
<h3 id="أحرف-خاصة-أخرى">أحرف خاصة أخرى</h3>
<p>النقطة حرف بديل يمكنه مطابقة أي حرف واحد. على سبيل المثال، يطابق التعبير <code>c...o</code> أي سلسلة فرعية من خمسة أحرف تبدأ بـ <code>c</code> وتنتهي بـ <code>o</code>، مثل <code>c-3po</code> أو <code>cello</code>.</p>
<p>يحدّد الحرف <code>^</code> أنّ المطابقة يجب أن تكون في بداية السلسلة النصية، ويحدّد <code>$</code> أنّ المطابقة يجب أن تكون في نهاية السلسلة النصية. ويمكن أيضًا استخدامهما لاستبعاد أي أحرف أخرى غير المحدّدة من المطابقات:</p>
<pre><code>Please type in an expression: **\\^[123]\\*$**
Please type in a string: **4**
Not found.
Please type in a string: **1221**
Found!
Please type in a string: **333333333**
Found!
</code></pre>
<p>تحتاج أحيانًا إلى مطابقة الأحرف الخاصة المحجوزة لصياغة التعبيرات النمطية. ويمكن استخدام الشرطة المائلة العكسية <code>\\</code> لـ <em>تخطّي</em> (escape) الأحرف الخاصة. وهكذا، يطابق التعبير <code>1+</code> الرقم <code>1</code> مرة أو أكثر، لكن التعبير <code>1\\+</code> يطابق السلسلة النصية <code>1+</code>.</p>
<pre><code>Please type in an expression: **^\\\\\\***
Please type in a string: **moi\\***
Not found.
Please type in a string: **m\\*o\\*i**
Not found.
Please type in a string: **\\*moi**
Found!
</code></pre>
<p>يمكن استخدام الأقواس الدائرية لتجميع أجزاء مختلفة من التعبير معًا. على سبيل المثال، يطابق التعبير <code>(ab)+c</code> السلاسل الفرعية <code>abc</code> و<code>ababc</code> و<code>ababababababc</code>، لكنه لا يطابق السلسلتين <code>ac</code> أو <code>bc</code>، لأن السلسلة الفرعية <code>ab</code> كاملة يجب أن تظهر مرة واحدة على الأقل.</p>
<pre><code>Please type in an expression: **^(jabba).\\*(hut)$**
Please type in a string: **jabba the hut**
Found!
Please type in a string: **jabba a hut**
Found!
Please type in a string: **jarjar the hut**
Not found.
Please type in a string: **jabba the smut**
Not found.
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: التعبيرات النمطية</strong></p>
<p>إليك بعض التمارين للتعوّد على صياغة التعبيرات النمطية.</p>
</blockquote>
<h2 id="أيام-الأسبوع">أيام الأسبوع</h2>
<p>باستخدام تعبير نمطي، اكتب دالة باسم <code>is_dotw(my_string: str)</code>. وينبغي أن تعيد الدالة <code>True</code> إذا كانت السلسلة النصية الممرَّرة وسيطًا تحتوي على اختصار لأحد أيام الأسبوع (Mon، Tue، Wed، Thu، Fri، Sat، Sun).</p>
<p>بعض الأمثلة على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(is_dotw(<span class="hljs-string">&quot;Mon&quot;</span>))
<span class="hljs-built_in">print</span>(is_dotw(<span class="hljs-string">&quot;Fri&quot;</span>))
<span class="hljs-built_in">print</span>(is_dotw(<span class="hljs-string">&quot;Tui&quot;</span>))
</code></pre>
<pre><code>True
True
False
</code></pre>
<h2 id="التحقق-من-حروف-العلة">التحقق من حروف العلة</h2>
<p>اكتب دالة باسم <code>all_vowels(my_string: str)</code> تستخدم تعبيرًا نمطيًا للتحقق مما إذا كانت جميع الأحرف في السلسلة النصية المعطاة حروف علة.</p>
<p>بعض الأمثلة على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(all_vowels(<span class="hljs-string">&quot;eioueioieoieou&quot;</span>))
<span class="hljs-built_in">print</span>(all_vowels(<span class="hljs-string">&quot;autoooo&quot;</span>))
</code></pre>
<pre><code>True
False
</code></pre>
<h2 id="الوقت-من-اليوم">الوقت من اليوم</h2>
<p>اكتب دالة باسم <code>time_of_day(my_string: str)</code> تستخدم تعبيرًا نمطيًا للتحقق مما إذا كانت سلسلة نصية بالصيغة <code>XX:YY:ZZ</code> وقتًا صالحًا في نظام الـ24 ساعة، برقمين لكل من الساعات والدقائق والثواني.</p>
<p>بعض الأمثلة على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(time_of_day(<span class="hljs-string">&quot;12:43:01&quot;</span>))
<span class="hljs-built_in">print</span>(time_of_day(<span class="hljs-string">&quot;AB:01:CD&quot;</span>))
<span class="hljs-built_in">print</span>(time_of_day(<span class="hljs-string">&quot;17:59:59&quot;</span>))
<span class="hljs-built_in">print</span>(time_of_day(<span class="hljs-string">&quot;33:66:77&quot;</span>))
</code></pre>
<pre><code>True
False
True
False
</code></pre>
<h2 id="الختام-الكبير">الختام الكبير</h2>
<p>لإنهاء هذا الجزء من المادة، لنعمل أكثر على الكائنات والأصناف من خلال بناء برنامج أكثر توسّعًا قليلًا. لا يتضمن هذا التمرين بالضرورة تعبيرات نمطية، لكن قسمي <a href="/arabic-cs-library/book/mooc/part-12/1-functions-as-arguments">الدوال كوسائط</a> و<a href="/arabic-cs-library/book/mooc/part-11/1-list-comprehensions">إدراكات القوائم</a> سيكونان مفيدين على الأرجح.</p>
<p>وقد تجد أيضًا مجموعة الأمثلة في <a href="/arabic-cs-library/book/mooc/part-10/4-application-development">الجزء 10</a> مفيدة.</p>
<blockquote>
<p><strong>تمرين برمجي: إحصاءات الهوكي</strong></p>
<p>في هذا التمرين ستبني تطبيقًا لفحص إحصاءات دوري الهوكي NHL بضع طرق مختلفة.</p>
</blockquote>
<p>يحتوي قالب التمرين على ملفَّي JSON: <code>partial.json</code> و<code>all.json</code>. الملف الأول مخصّص في معظمه للاختبار. أما الثاني فيحتوي على قدر كبير من البيانات، إذ تتضمنه إحصاءات جميع لاعبي NHL لموسم 2019-20.</p>
<p>يكون مدخل اللاعب الواحد بالصيغة التالية:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Patrik Laine&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;nationality&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;FIN&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;assists&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">35</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;goals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">28</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;penalties&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">22</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;team&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;WPG&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;games&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">68</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يحتوي الملفان على قائمة من المدخلات بالصيغة أعلاه.</p>
<p>إذا كنت بحاجة إلى تذكير بطريقة التعامل مع ملفات JSON، فانظر إلى <a href="/arabic-cs-library/book/mooc/part-7/4-data-processing#reading-json-files">الجزء 7 من مادة هذا المقرر</a>.</p>
<h2 id="البحث-والقائمة">البحث والقائمة</h2>
<p>اكتب تطبيقًا تفاعليًا يسأل أولًا عن اسم الملف، ثم يقدّم الوظائف التالية:</p>
<ul>
<li>البحث بالاسم عن إحصاءات لاعب واحد</li>
<li>سرد جميع اختصارات أسماء الفِرَق بالترتيب الأبجدي</li>
<li>سرد جميع اختصارات البلدان بالترتيب الأبجدي</li>
</ul>
<p>تمنحك هذه الوظائف نقطة تمرين واحدة. وينبغي أن يعمل تطبيقك الآن على النحو التالي:</p>
<pre><code>Travis Zajac         NJD   9 + 16 =  25
</code></pre>
<p>ملاحظة: يجب أن تكون صيغة طباعة اللاعب كما يلي بالضبط:</p>
<pre><code>Leon Draisaitl       EDM  43 + 67 = 110
Connor McDavid       EDM  34 + 63 =  97
Travis Zajac         NJD   9 + 16 =  25
Mike Green           EDM   3 +  8 =  11
Markus Granlund      EDM   3 +  1 =   4
123456789012345678901234567890123456789
</code></pre>
<p>السطر الأخير في المثال أعلاه موجود لمساعدتك على حساب عروض الحقول المختلفة في المخرجات؛ وينبغي ألا تطبع سطر الأرقام هذا بنفسك في الحل النهائي.</p>
<p>يُطبع اختصار الفريق بدءًا من الحرف الثاني والعشرين. وعلامة <code>+</code> هي الحرف الثلاثين، وعلامة <code>=</code> هي الحرف الخامس والثلاثين. وينبغي أن تكون جميع الحقول محاذاة إلى الحافة اليمنى. وجميع المسافات البيضاء هي أحرف مسافة.</p>
<p>من المحتمل أن تكون السلاسل المنسّقة (f-strings) أسهل طريقة لتحقيق المخرجات المطلوبة. وتشبه العملية <a href="/arabic-cs-library/book/mooc/part-6/1-reading-files#programming-exercise-course-grading-part-3">هذا التمرين</a> من الجزء 6.</p>
<h2 id="سرد-اللاعبين-حسب-النقاط">سرد اللاعبين حسب النقاط</h2>
<p>ستمنحك هاتان الوظيفتان نقطة التمرين الثانية:</p>
<ul>
<li>سرد اللاعبين في فريق محدّد بترتيب النقاط المسجَّلة، من الأعلى إلى الأدنى. والنقاط تساوي <em>الأهداف</em> + <em>التمريرات الحاسمة</em></li>
<li>سرد اللاعبين من بلد محدّد بترتيب النقاط المسجَّلة، من الأعلى إلى الأدنى</li>
</ul>
<p>وينبغي أن يعمل تطبيقك الآن على النحو التالي:</p>
<pre><code>Drake Batherson      OTT   3 +  7 =  10
Jonathan Davidsson   OTT   0 +  1 =   1
</code></pre>
<h2 id="اللاعبون-الأكثر-نجاحا">اللاعبون الأكثر نجاحًا</h2>
<p>ستمنحك هاتان الوظيفتان نقطة التمرين الثالثة:</p>
<ul>
<li>قائمة بـ <code>n</code> من اللاعبين الذين سجّلوا أكبر عدد من النقاط
<ul>
<li>إذا تساوى لاعبان في النقاط، يتقدّم من سجّل عددًا أكبر من الأهداف</li>
</ul>
</li>
<li>قائمة بـ <code>n</code> من اللاعبين الذين سجّلوا أكبر عدد من الأهداف
<ul>
<li>إذا تساوى لاعبان في عدد الأهداف، يتقدّم من لعب عددًا أقل من المباريات</li>
</ul>
</li>
</ul>
<p>وينبغي أن يعمل تطبيقك الآن على النحو التالي:</p>
<pre><code>Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
</code></pre>
<p>يرجى الإجابة عن استبيان سريع حول هذا الجزء من المقرر.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: a03c9f5a-33a9-5aff-8d93-a89625034903)</p>
</blockquote>
`,l={book:n,chapter:s,chapterTitle:a,slug:e,title:o,headings:p,html:t};export{n as book,s as chapter,a as chapterTitle,l as default,p as headings,t as html,e as slug,o as title};
