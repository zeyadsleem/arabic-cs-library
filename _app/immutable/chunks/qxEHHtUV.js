const s="mooc",n="part-4",a="الجزء 4: الدوال والقوائم",e="2-more-functions",p="المزيد من الدوال",l=[{depth:2,id:"معاملات-الدالة-ووسائطها",text:"معاملات الدالة ووسائطها"},{depth:2,id:"رسائل-الخطأ-عند-تشغيل-الاختبارات",text:"رسائل الخطأ عند تشغيل الاختبارات"},{depth:2,id:"استدعاء-الدوال-داخل-الدوال",text:"استدعاء الدوال داخل الدوال"},{depth:2,id:"القيمة-المعادة-من-الدالة",text:"القيمة المعادة من الدالة"},{depth:2,id:"عبارة-return",text:"عبارة return"},{depth:2,id:"استخدام-القيم-المعادة-من-الدوال",text:"استخدام القيم المعادة من الدوال"},{depth:2,id:"الفرق-بين-return-وprint",text:"الفرق بين return وprint"},{depth:2,id:"نوع-الوسيط",text:"نوع الوسيط"}],t=`<blockquote>
<p><strong>أهداف التعلم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستكون على معرفة أكثر بوسائط الدوال ومعاملاتها</li>
<li>ستكون قادرًا على إعادة القيم من الدوال، وعلى استخدام القيم في شيفرتك</li>
<li>ستكون قادرًا على إضافة تلميحات نوع لمعاملات الدوال وقيم إعادتها</li>
</ul>
</blockquote>
<p>لنستعرض باختصار دوال Python (functions). تُعرَّف الدوال بالكلمة المفتاحية <code>def</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">message</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This message was brought to you by a function&quot;</span>)
</code></pre>
<p>ويمكن استدعاء هذه الدالة في شيفرة برنامجك هكذا:</p>
<pre><code class="language-python">message()
</code></pre>
<p>وسيطبع برنامجك عندئذٍ</p>
<pre><code>This message was brought to you by a function
</code></pre>
<h2 id="معاملات-الدالة-ووسائطها">معاملات الدالة ووسائطها</h2>
<p>يمكن أن تأخذ الدالة وسيطًا واحدًا أو أكثر. وعند استدعاء الدالة، تُسنَد الوسائط إلى متغيّرات تُعرَّف في تعريف الدالة. تُسمّى هذه المتغيّرات المعاملات (parameters)، وتُسرد بين القوسين الواقعين بعد اسم الدالة.</p>
<p>في الشيفرة التالية عُرِّف معامل واحد للدالة <code>greet</code>، بينما عُرِّف معاملان للدالة <code>sum</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">name</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello there,&quot;</span>, name)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The sum of the arguments is&quot;</span>, a + b)
</code></pre>
<pre><code class="language-python">greet(<span class="hljs-string">&quot;Emily&quot;</span>)
<span class="hljs-built_in">sum</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
</code></pre>
<pre><code>Hello there, Emily
The sum of the arguments is 5
</code></pre>
<blockquote>
<p><strong>الشكلي مقابل الفعلي، المعامل مقابل الوسيط</strong></p>
<p>قد تبدو المصطلحات المستخدمة للبيانات المُمرَّرة إلى الدوال مربكة. وزادةً على ذلك، تشير بعض المصادر إلى ما سمّيناه هنا معاملات ووسائط بمصطلحَي المعامل الشكلي (formal parameter) والمعامل الفعلي (actual parameter). وتطلق عليها مصادر أخرى مصطلحَي الوسيط الشكلي (formal argument) والوسيط الفعلي (actual argument). أما <a href="https://docs.python.org/3/glossary.html#term-argument">توثيق Python</a> فيحدد مصطلحَي الوسيط (argument) والمعامل (parameter) وحدهما، وذلك ما سنستخدمه نحن أيضًا.</p>
<p>ماذا يحدث فعلًا عند تنفيذ استدعاء الدالة <code>greet(&quot;Emily&quot;)</code>؟</p>
<p>في تعريف الدالة <code>greet(name)</code> يتصرّف المعامل <code>name</code> من كل النواحي تمامًا كمتغيّر عادي. فيمكننا استخدامه داخل الدالة تمامًا كما استخدمنا المتغيّرات في الدوال الرئيسية المتعددة في برامجنا حتى الآن.</p>
<p>وفي استدعاء الدالة <code>greet(&quot;Emily&quot;)</code> يكون الوسيط <code>&quot;Emily&quot;</code> كأي سلسلة نصية أخرى صادفناها من قبل. فيمكن مثلًا إسناده إلى متغيّر.</p>
<p>إذن، عند تنفيذ استدعاء الدالة، تُسنَد قيمة الوسيط <code>&quot;Emily&quot;</code> إلى متغيّر المعامل <code>name</code>. وخلال <em>هذا التنفيذ</em> للدالة تكون <code>name = &quot;Emily&quot;</code>. وعند استدعاء الدالة بوسيط مختلف، تكون قيمة <code>name</code> مختلفة.</p>
<p>قد تبدو هذه المصطلحات كلها زائدة بعض الشيء، لكن علم الحاسوب بصفته تخصصًا يسعى فعلًا إلى أن يكون علمًا دقيقًا قدر الإمكان. واستخدام مصطلحات محدَّدة تحديدًا جيدًا أمر مفيد.</p>
</blockquote>
<h2 id="رسائل-الخطأ-عند-تشغيل-الاختبارات">رسائل الخطأ عند تشغيل الاختبارات</h2>
<p>معظم تمارين هذه الدورة مصحوبة باختبارات أوتوماتيكية. إذا لم يعمل برنامجك كما هو محدَّد في المهمة، فستُظهر الاختبارات رسالة خطأ، وقد تكون مفيدة أو لا. ومن الجدير عادةً أن تُقرأ رسالة الخطأ بتمعّن.</p>
<p>في بعض الحالات قد لا تقول رسالة الخطأ شيئًا يُذكر على الإطلاق. في التمرين التالي أدناه قد تصادف هذه الرسالة:</p>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_2_1.png" alt="4_2_1.png"></p>
<p>تقول الرسالة فقط إنه يجب أن تكون قادرًا على استدعاء الدالة <code>line</code> بالوسائط المحدَّدة:</p>
<pre><code class="language-python">line(<span class="hljs-number">5</span>, <span class="hljs-string">&quot;&quot;</span>)
</code></pre>
<p>وتتكشّف المشكلة الحقيقية عندما نحاول تنفيذ استدعاء الدالة المحدَّد في رسالة الخطأ. ويمكنك فعل ذلك بنسخ استدعاء الدالة إلى برنامجك والنقر على المثلث:</p>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_2_2.png" alt="4_2_2.png"></p>
<p>وتُخبرنا الأسطر الأخيرة الناتجة عن التنفيذ، والمُبرَزة في الصورة أعلاه، أن السطر 4 من شيفرتك يسبّب الخطأ <em>IndexError: string index out of range</em>. وفي <a href="/arabic-cs-library/book/mooc/part-3/2-working-with-strings">الجزء السابق</a> كان هناك مثال مشابه، حيث حاولنا استخدام فهرس يقع خارج نطاق السلسلة النصية. وهذه المرة يظهر الخطأ لأننا نحاول الوصول إلى المحرف الأول من سلسلة نصية فارغة، أي سلسلة طولها 0.</p>
<blockquote>
<p><strong>تمرين برمجي: الخط</strong></p>
<p>اكتب دالة اسمها <code>line</code>، تأخذ وسيطين: عددًا صحيحًا وسلسلة نصية. تطبع الدالة سطرًا من النص، طوله محدَّد بالوسيط الأول. والمحرف المستخدم في رسم السطر يجب أن يكون أول محرف في الوسيط الثاني. إذا كان الوسيط الثاني سلسلة نصية فارغة، فيجب أن يتكون السطر من نجوم.</p>
</blockquote>
<p>ومثال على السلوك المتوقع:</p>
<pre><code class="language-python">line(<span class="hljs-number">7</span>, <span class="hljs-string">&quot;%&quot;</span>)
line(<span class="hljs-number">10</span>, <span class="hljs-string">&quot;LOL&quot;</span>)
line(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;&quot;</span>)
</code></pre>
<pre><code>%%%%%%%
LLLLLLLLLL
***
</code></pre>
<h2 id="استدعاء-الدوال-داخل-الدوال">استدعاء الدوال داخل الدوال</h2>
<p>يمكنك استدعاء دالة من داخل دالة أخرى. وقد فعلنا ذلك مرات كثيرة فعلًا، حين استدعينا الدالة <code>print</code> داخل دوالنا الخاصة في الجزء السابق. ودوالنا الخاصة لا تختلف عنها من الناحية الوظيفية. في المثال التالي تستدعي الدالة <code>greet_many_times</code> الدالة <code>greet</code> بعدد المرات المحدَّد بالوسيط <code>times</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">name</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello there,&quot;</span>, name)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">greet_many_times</span>(<span class="hljs-params">name, times</span>):
    <span class="hljs-keyword">while</span> times &gt; <span class="hljs-number">0</span>:
        greet(name)
        times -= <span class="hljs-number">1</span>

greet_many_times(<span class="hljs-string">&quot;Emily&quot;</span>, <span class="hljs-number">3</span>)
</code></pre>
<pre><code>Hello there, Emily
Hello there, Emily
Hello there, Emily
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: صندوق من محارف الشباك</strong></p>
<p>اكتب دالة اسمها <code>box_of_hashes</code>، تطبع مستطيلًا من محارف الشباك. تأخذ الدالة وسيطًا واحدًا يحدد ارتفاع المستطيل. ويجب أن يكون عرض المستطيل عشرة محارف.</p>
</blockquote>
<p>ويجب أن تستدعي الدالة الدالة <code>line</code> من التمرين أعلاه للطباعة الفعلية. انسخ حلّك لذلك التمرين فوق شيفرة هذا التمرين. يُرجى ألا تُغيّر أي شيء في دالتك <code>line</code>.</p>
<p>وبعض الأمثلة على كيفية عمل الدالة:</p>
<pre><code class="language-python">box_of_hashes(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>()
box_of_hashes(<span class="hljs-number">2</span>)
</code></pre>
<pre><code>##########
##########
##########
##########
##########

##########
##########
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مربع من محارف الشباك</strong></p>
<p>اكتب دالة اسمها <code>square_of_hashes</code>، ترسم مربعًا من محارف الشباك. تأخذ الدالة وسيطًا واحدًا يحدد طول ضلع المربع.</p>
</blockquote>
<p>ويجب أن تستدعي الدالة الدالة <code>line</code> من التمرين أعلاه للطباعة الفعلية. انسخ حلّك لذلك التمرين فوق شيفرة هذا التمرين. يُرجى ألا تُغيّر أي شيء في دالة <code>line</code>.</p>
<p>وبعض الأمثلة:</p>
<pre><code class="language-python">square_of_hashes(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>()
square_of_hashes(<span class="hljs-number">3</span>)
</code></pre>
<pre><code>#####
#####
#####
#####
#####

###
###
###
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مربع</strong></p>
<p>اكتب دالة اسمها <code>square</code>، تطبع مربعًا من المحارف، وتأخذ وسيطين. يحدد المعامل الأول طول ضلع المربع. ويحدد المعامل الثاني المحرف المستخدم في رسم المربع.</p>
</blockquote>
<p>ويجب أن تستدعي الدالة الدالة <code>line</code> من التمرين أعلاه للطباعة الفعلية. انسخ حلّك لذلك التمرين فوق شيفرة هذا التمرين. يُرجى ألا تُغيّر أي شيء في دالة <code>line</code>.</p>
<p>وبعض الأمثلة:</p>
<pre><code class="language-python">square(<span class="hljs-number">5</span>, <span class="hljs-string">&quot;*&quot;</span>)
<span class="hljs-built_in">print</span>()
square(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;o&quot;</span>)
</code></pre>
<pre><code>*****
*****
*****
*****
*****

ooo
ooo
ooo
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مثلث</strong></p>
<p>اكتب دالة اسمها <code>triangle</code>، ترسم مثلثًا من محارف الشباك، وتأخذ وسيطًا واحدًا. يجب أن يكون ارتفاع المثلث وعرضه مساويين لقيمة الوسيط.</p>
</blockquote>
<p>ويجب أن تستدعي الدالة الدالة <code>line</code> من التمرين أعلاه للطباعة الفعلية. انسخ حلّك لذلك التمرين فوق شيفرة هذا التمرين. يُرجى ألا تُغيّر أي شيء في دالة <code>line</code>.</p>
<p>وبعض الأمثلة:</p>
<pre><code class="language-python">triangle(<span class="hljs-number">6</span>)
<span class="hljs-built_in">print</span>()
triangle(<span class="hljs-number">3</span>)
</code></pre>
<pre><code>#
##
###
####
#####
######

#
##
###
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: شكل</strong></p>
<p>اكتب دالة اسمها <code>shape</code>، تأخذ أربعة وسائط. يحدد المعاملان الأولان مثلثًا كما فوق، والمحرف المستخدم في رسمه. ويحدد المعامل الأول أيضًا عرض مستطيل، بينما يحدد المعامل الثالث ارتفاعه. ويحدد المعامل الرابع محرف حشو المستطيل. تطبع الدالة المثلث أولًا، ثم المستطيل أسفله.</p>
</blockquote>
<p>ويجب أن تستدعي الدالة الدالة <code>line</code> من التمرين أعلاه للطباعة الفعلية. انسخ حلّك لذلك التمرين فوق شيفرة هذا التمرين. يُرجى ألا تُغيّر أي شيء في دالة <code>line</code>.</p>
<p>وبعض الأمثلة:</p>
<pre><code class="language-python">shape(<span class="hljs-number">5</span>, <span class="hljs-string">&quot;X&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-string">&quot;*&quot;</span>)
<span class="hljs-built_in">print</span>()
shape(<span class="hljs-number">2</span>, <span class="hljs-string">&quot;o&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-string">&quot;+&quot;</span>)
<span class="hljs-built_in">print</span>()
shape(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;.&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&quot;,&quot;</span>)
</code></pre>
<pre><code>X
XX
XXX
XXXX
XXXXX
*****
*****
*****

o
oo
++
++
++
++

.
..
...
</code></pre>
<p><strong>تلميح</strong></p>
<p>لا تحاول حل هذا التمرين &quot;دفعة واحدة&quot;. فقد تكون الخطوة الأولى الجيدة هي التأكد من قدرتك على طباعة المثلث بشكل موثوق. ثم يمكنك محاولة إضافة المستطيل.</p>
<p>وهذه من أهم مهارات المبرمج: <strong>التركيز على أجزاء صغيرة وملموسة من المشكلة في كل مرة</strong>. حل الحلول الجزئية وتحقق منها، ثم استخدمها للتوصل إلى حل كامل.</p>
<blockquote>
<p><strong>تمرين برمجي: شجرة التنوب</strong></p>
<p>اكتب دالة اسمها <code>spruce</code>، تأخذ وسيطًا واحدًا. تطبع الدالة النص <code>a spruce!</code>، ثم شجرة التنوب بحجم تحدده قيمة الوسيط.</p>
</blockquote>
<p>ويجب أن يؤدي استدعاء <code>spruce(3)</code> إلى طباعة</p>
<pre><code>a spruce!
  *
 ***
*****
  *
</code></pre>
<p>ويجب أن يؤدي استدعاء <code>spruce(5)</code> إلى طباعة</p>
<pre><code>a spruce!
    *
   ***
  *****
 *******
*********
    *
</code></pre>
<p><strong>ملاحظة مهمة: يجب أن تكون المسافات البيضاء على يسار شجرة التنوب بالمقدار الصحيح تمامًا</strong>. فإذا بدا شكل شجرة التنوب صحيحًا، لكن الحافة اليسرى للشجرة لا تلامس الحافة اليسرى لمنطقة النص في الطرفية، فلن تقبل الاختبارات الحل.</p>
<h2 id="القيمة-المعادة-من-الدالة">القيمة المعادة من الدالة</h2>
<p>يمكن للدوال أيضًا أن تُعيد قيمًا. فمثلًا، الدالة المدمجة <code>input</code> في Python <em>تُعيد</em> سلسلة نصية يُدخلها المستخدم. ويمكن تخزين القيمة التي تُعيدها دالة في متغيّر:</p>
<pre><code class="language-python">word = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a word: &quot;</span>)
</code></pre>
<p>وعندما تريد قيمة صحيحة من المستخدم، يجب تحويل إدخال المستخدم إلى عدد صحيح. والدالة التي استخدمناها لهذا الغرض هي <code>int</code>، وهي تُعيد قيمة أيضًا:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in an integer: &quot;</span>))
</code></pre>
<p>تأخذ الدالة <code>int</code> السلسلة النصية التي تُعيدها <code>input</code> كوسيط لها، وتُعيد قيمة من النوع الصحيح، إذا كان يمكن استخلاص عدد صحيح من السلسلة النصية.</p>
<h2 id="عبارة-return">عبارة return</h2>
<p>يمكن للدوال التي تُعرّفها بنفسك أيضًا أن تُعيد قيمًا. ولتفعل ذلك تحتاج إلى عبارة <code>return</code>. فمثلًا، تُعيد الدالة <code>my_sum</code> التالية مجموع معامليها:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a + b

result = my_sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sum:&quot;</span>, result)
</code></pre>
<pre><code>Sum: 5
</code></pre>
<p>وهناك مثال آخر على القيمة المعادة. تسأل هذه الدالة عن اسم المستخدم وتُعيد السلسلة النصية التي يكتبها:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_for_name</span>():
    name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)
    <span class="hljs-keyword">return</span> name

name = ask_for_name()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello there,&quot;</span>, name)
</code></pre>
<pre><code>What is your name? **Anna**
Hello there, Anna
</code></pre>
<p>وتُنهي عبارة <code>return</code> تنفيذ الدالة فورًا. وهذه طريقة أنيقة لإنشاء دالة مقارنة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">smallest</span>(<span class="hljs-params">a,b</span>):
    <span class="hljs-keyword">if</span> a &lt; b:
        <span class="hljs-keyword">return</span> a
    <span class="hljs-keyword">return</span> b

<span class="hljs-built_in">print</span>(smallest(<span class="hljs-number">3</span>, <span class="hljs-number">7</span>))
<span class="hljs-built_in">print</span>(smallest(<span class="hljs-number">5</span>, <span class="hljs-number">2</span>))
</code></pre>
<p>والفكرة هنا هي أنه إذا كانت <code>a</code> أصغر من <code>b</code>، فإن الدالة تُعيد <code>a</code> وتخرج فورًا. وإلا، يستمر التنفيذ إلى السطر التالي، حيث تُعاد القيمة <code>b</code>. ولا يمكن للدالة أبدًا أن تنفّذ عبارتَي <code>return</code> منفصلتين في استدعاء دالة واحد.</p>
<pre><code>3
2
</code></pre>
<p>ويمكنك الاستفادة من عبارة <code>return</code> حتى لو لم تُعِد الدالة قيمة. ويكون هدفها عندئذٍ إنهاء تنفيذ الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">name</span>):
    <span class="hljs-keyword">if</span> name == <span class="hljs-string">&quot;&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;???&quot;</span>)
        <span class="hljs-keyword">return</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello there,&quot;</span>, name)

greet(<span class="hljs-string">&quot;Emily&quot;</span>)
greet(<span class="hljs-string">&quot;&quot;</span>)
greet(<span class="hljs-string">&quot;Mark&quot;</span>)
</code></pre>
<p>إذا كان الوسيط (الذي يُخزَّن في المتغيّر <code>name</code>) سلسلة نصية فارغة، فإن الدالة تطبع <code>???</code> وتخرج.</p>
<pre><code>Hello there, Emily
???
Hello there, Mark
</code></pre>
<h2 id="استخدام-القيم-المعادة-من-الدوال">استخدام القيم المعادة من الدوال</h2>
<p>نعلم بالفعل أنه يمكن تخزين القيم المعادة من الدوال في متغيّرات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a + b

result = my_sum(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The sum is&quot;</span>, result)
</code></pre>
<pre><code>The sum is 10
</code></pre>
<p>والقيمة المعادة من دالة هي قيمة كأي قيمة أخرى. فليس من الضروري تخزينها في متغيّر لكي تُمرَّر كوسيط إلى الأمر <code>print</code>:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The sum is&quot;</span>, my_sum(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>))
</code></pre>
<p>ويمكن أن تصبح القيمة المعادة من دالة وسيطًا لدالة أخرى:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_sum</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a+b

<span class="hljs-keyword">def</span> <span class="hljs-title function_">difference</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a-b

result = difference(my_sum(<span class="hljs-number">5</span>, <span class="hljs-number">2</span>), my_sum(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result is&quot;</span>, result)
</code></pre>
<pre><code>The result is 2
</code></pre>
<p>وفي هذه الحالة يُنفَّذ استدعاءا الدالة الداخليان <code>my_sum(5, 2)</code> و<code>my_sum(2, 3)</code> أولًا. والقيم التي تُعيدها (7 و5) تُستخدم كوسائط لاستدعاء الدالة الخارجية.</p>
<p>ويُعيد استدعاء الدالة الخارجية <code>difference(7, 5)</code> القيمة 2، التي تُخزَّن في المتغيّر <code>result</code> وتُطبع.</p>
<p>وباختصار، تعمل القيم التي تُعيدها الدوال تمامًا كأي قيمة أخرى في Python. فيمكن طباعتها، وتخزينها في متغيّرات، واستخدامها في التعابير، واستخدامها كوسائط في استدعاءات دوال أخرى.</p>
<h2 id="الفرق-بين-return-وprint">الفرق بين return وprint</h2>
<p>قد يكون الفرق بين أن <em>تُعيد</em> الدالة قيمة وأن تحتوي على <em>عبارة طباعة</em> أمرًا محيّرًا أحيانًا. فلنلقِ نظرة على طريقتين مختلفتين لتنفيذ دالة تُحدد أي القيمتين أكبر:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">max1</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">if</span> a &gt; b:
        <span class="hljs-keyword">return</span> a
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> b

<span class="hljs-keyword">def</span> <span class="hljs-title function_">max2</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">if</span> a &gt; b:
        <span class="hljs-built_in">print</span>(a)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(b)

result = max1(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(result)

max2(<span class="hljs-number">7</span>, <span class="hljs-number">2</span>)
</code></pre>
<pre><code>5
7
</code></pre>
<p>وتبدو كلتا النسختين تعملان جيدًا، إذ تُطبع القيمة الأكبر طباعةً صحيحة. لكن هناك فرقًا جوهريًا بينهما. فالدالة الأولى من الدالتين، <code>max1</code>، لا تطبع شيئًا من تلقاء نفسها، بل <em>تُعيد</em> القيمة الأكبر. فإذا نفّذنا السطر التالي</p>
<pre><code class="language-python">max1(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)
</code></pre>
<p>لا يبدو أن شيئًا يحدث. فلا بد من <em>استخدام</em> القيمة المعادة من الدالة بطريقة ما في الشيفرة التي استدعت الدالة. فيمكن مثلًا تخزينها في متغيّر وطباعتها:</p>
<pre><code class="language-python">result = max1(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<p>أما النسخة الثانية، <code>max2</code>، فتستخدم الأمر <code>print</code> <em>داخل الدالة</em> لطباعة القيمة الأكبر. فإذا أردنا رؤية القيمة، فيكفي استدعاء الدالة</p>
<pre><code class="language-python">max2(<span class="hljs-number">7</span>, <span class="hljs-number">5</span>)
</code></pre>
<p>فتُطبَع القيمة الأكبر. والجانب السلبي في هذه الدالة العملية هو أن القيمة التي تحسبها الدالة غير متاحة للاستخدام في البرنامج الذي استدعاها. ولهذا السبب تكون الدوال التي تُعيد قيمًا هي الخيار الأفضل في الغالب.</p>
<blockquote>
<p><strong>تمرين برمجي: أكبر عدد</strong></p>
<p>اكتب دالة اسمها  <code>greatest_number</code>، تأخذ ثلاثة وسائط. وتُعيد الدالة أكبر القيم الثلاث قيمةً.</p>
</blockquote>
<p>ومثال على كيفية استخدام الدالة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(greatest_number(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>)) <span class="hljs-comment"># 4</span>
<span class="hljs-built_in">print</span>(greatest_number(<span class="hljs-number">99</span>, -<span class="hljs-number">4</span>, <span class="hljs-number">7</span>)) <span class="hljs-comment"># 99</span>
<span class="hljs-built_in">print</span>(greatest_number(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)) <span class="hljs-comment"># 0</span>
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: نفس المحارف</strong></p>
<p>اكتب دالة اسمها <code>same_chars</code>، تأخذ سلسلة نصية وعددين صحيحين كوسائط. ويشير العددان الصحيحان إلى فهرسين داخل السلسلة النصية. يجب أن تُعيد الدالة <code>True</code> إذا كان المحرفان الموجودان في الفهرسين المحدَّدين متماثلين. وإلا، وخاصة إذا كان أي من الفهرسين يقع خارج نطاق السلسلة النصية، فتُعيد الدالة <code>False</code>.</p>
</blockquote>
<p>وبعض الأمثلة على كيفية استخدام الدالة:</p>
<pre><code class="language-python"><span class="hljs-comment"># same characters m and m</span>
<span class="hljs-built_in">print</span>(same_chars(<span class="hljs-string">&quot;programmer&quot;</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>)) <span class="hljs-comment"># True</span>

<span class="hljs-comment"># different characters p and r</span>
<span class="hljs-built_in">print</span>(same_chars(<span class="hljs-string">&quot;programmer&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>)) <span class="hljs-comment"># False</span>

<span class="hljs-comment"># the second index is not within the string</span>
<span class="hljs-built_in">print</span>(same_chars(<span class="hljs-string">&quot;programmer&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">12</span>)) <span class="hljs-comment"># False</span>
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الكلمات الأولى والثانية والأخيرة</strong></p>
<p>اكتب ثلاث دوال: <code>first_word</code> و<code>second_word</code> و<code>last_word</code>. تأخذ كل دالة سلسلة نصية كوسيط.</p>
</blockquote>
<p>وكما تشير أسماؤها، تُعيد الدوال إما الكلمة الأولى أو الكلمة الثانية أو الكلمة الأخيرة في الجملة التي تتلقاها كوسيط سلسلة نصية.</p>
<p>وفي كل حالة يمكنك أن تفترض أن سلسلة الوسيط تحتوي على كلمتين منفصلتين على الأقل، وأن كل الكلمات مفصولة بمحرف مسافة واحدًا بالضبط. ولن تكون هناك مسافات في بداية السلاسل الوسيطة أو في نهايتها.</p>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;it was a dark and stormy python&quot;</span>

<span class="hljs-built_in">print</span>(first_word(sentence)) <span class="hljs-comment"># it</span>
<span class="hljs-built_in">print</span>(second_word(sentence)) <span class="hljs-comment"># was</span>
<span class="hljs-built_in">print</span>(last_word(sentence)) <span class="hljs-comment"># python</span>
</code></pre>
<pre><code>it
was
python
</code></pre>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;it was&quot;</span>

<span class="hljs-built_in">print</span>(second_word(sentence)) <span class="hljs-comment"># was</span>
<span class="hljs-built_in">print</span>(last_word(sentence)) <span class="hljs-comment"># was</span>
</code></pre>
<h2 id="نوع-الوسيط">نوع الوسيط</h2>
<p>واسترجاع سريع لأنواع البيانات التي صادفناها حتى الآن:</p>
<table>
<thead>
<tr>
<th style="text-align:left">النوع</th>
<th style="text-align:center">نوع البيانات في Python</th>
<th>مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">عدد صحيح</td>
<td style="text-align:center"><code>int</code></td>
<td><code>23</code></td>
</tr>
<tr>
<td style="text-align:left">عدد عشري عائم</td>
<td style="text-align:center"><code>float</code></td>
<td><code>-0.45</code></td>
</tr>
<tr>
<td style="text-align:left">سلسلة نصية</td>
<td style="text-align:center"><code>str</code></td>
<td><code>&quot;Peter Python&quot;</code></td>
</tr>
<tr>
<td style="text-align:left">قيمة منطقية</td>
<td style="text-align:center"><code>bool</code></td>
<td><code>True</code></td>
</tr>
</tbody>
</table>
<p>وعندما تستدعي دالة، فلن تعمل عملًا صحيحًا إلا إذا كانت الوسائط التي تُمرّرها لها من النوع الصحيح. فلنلقِ نظرة على مثال:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">print_many_times</span>(<span class="hljs-params">message, times</span>):
    <span class="hljs-keyword">while</span> times &gt; <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(message)
        times -= <span class="hljs-number">1</span>
</code></pre>
<p>وتعمل الدالة كما هو متوقع إذا استدعيناها هكذا:</p>
<pre><code class="language-python">print_many_times(<span class="hljs-string">&quot;Hello there&quot;</span>, <span class="hljs-number">5</span>)
</code></pre>
<pre><code>Hello there
Hello there
Hello there
Hello there
Hello there
</code></pre>
<p>لكن إذا مرّرنا للدالة وسيطًا من النوع الخطأ، فلن تعمل:</p>
<pre><code class="language-python">print_many_times(<span class="hljs-string">&quot;Hello there&quot;</span>, <span class="hljs-string">&quot;Emily&quot;</span>)
</code></pre>
<pre><code>TypeError: '&gt;' not supported between instances of 'str' and 'int'
</code></pre>
<p>والمشكلة هنا هي أن المعامل الثاني <code>times</code> يُقارَن بعدد صحيح، هو <code>0</code>، في السطر 2 من تعريف الدالة. والوسيط المُمرَّر كان <code>&quot;Emily&quot;</code>، وهو سلسلة نصية وليس عددًا صحيحًا. ولا يمكن مقارنة السلاسل النصية والأعداد الصحيحة بمثل هذه السهولة، فيحدث خطأ.</p>
<p>ولتجنب مشكلات مثل هذه يمكنك إدراج <em>تلميحات النوع</em> في تعريفات دوالك. ويحدد تلميح النوع نوع الوسيط المخصص للدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">print_many_times</span>(<span class="hljs-params">message : <span class="hljs-built_in">str</span>, times : <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">while</span> times &gt; <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(message)
        times -= <span class="hljs-number">1</span>
</code></pre>
<p>وهذا يُخبر أي شخص يستخدم الدالة بأن الوسيط المخزَّن في <code>message</code> من المفترض أن يكون سلسلة نصية، والوسيط المخزَّن في <code>times</code> من المفترض أن يكون عددًا صحيحًا.</p>
<p>وبالمثل، يمكن الإشارة إلى القيمة المعادة من دالة في تعريف الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_for_name</span>() -&gt; <span class="hljs-built_in">str</span>:
    name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Mikä on nimesi? &quot;</span>)
    <span class="hljs-keyword">return</span> name
</code></pre>
<p>وهذا يُخبر مستخدم الدالة بأنه من المفترض أن تُعيد الدالة سلسلة نصية.</p>
<p><strong>ملاحظة مهمة:</strong> تلميح النوع هو مجرد تلميح بشأن نوع الوسيط أو القيمة المعادة، حرفيًا لا أكثر. فهو ليس ضمانًا للنوع، وبالتأكيد ليس حماية ضد أخطاء النوع. فإذا تلقّت دالة وسيطًا من النوع الخطأ أو أعادت قيمة من النوع الخطأ، فإن الدالة تُنفَّذ مع ذلك، لكنها قد لا تعمل عملًا صحيحًا.</p>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: fb289a3b-288a-5a9f-b3d2-07ceae5866ea)

-->
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,t as html,e as slug,p as title};
