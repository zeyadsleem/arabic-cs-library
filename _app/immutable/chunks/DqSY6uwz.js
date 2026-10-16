const s="mooc",n="part-4",a="الجزء 4: الدوال والقوائم",e="6-strings-and-lists",p="المزيد من السلاسل النصية والقوائم",t=[{depth:2,id:"مزيد-من-التقطيعات",text:"مزيد من التقطيعات"},{depth:2,id:"تحذير-استخدام-المتغيرات-العامة-داخل-الدوال",text:"تحذير: استخدام المتغيّرات العامة داخل الدوال"},{depth:2,id:"السلاسل-النصية-غير-قابلة-للتغيير",text:"السلاسل النصية غير قابلة للتغيير"},{depth:2,id:"مزيد-من-التوابع-للقوائم-والسلاسل-النصية",text:"مزيد من التوابع للقوائم والسلاسل النصية"},{depth:2,id:"تطوير-مشروع-برمجي-أكبر",text:"تطوير مشروع برمجي أكبر"},{depth:2,id:"تمرير-البيانات-من-دالة-إلى-أخرى",text:"تمرير البيانات من دالة إلى أخرى"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستصبح على دراية بمزيد من طرق تقطيع السلاسل النصية والقوائم</li>
<li>ستفهم ما يعنيه عدم قابلية السلاسل النصية للتغيير</li>
<li>ستكون قادرًا على استخدام التابعين <code>count</code> و<code>replace</code></li>
</ul>
</blockquote>
<p>لقد تعوّدت من قبل على صيغة <code>[]</code> للوصول إلى جزء من سلسلة نصية:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;exemplary&quot;</span>
<span class="hljs-built_in">print</span>(my_string[<span class="hljs-number">3</span>:<span class="hljs-number">7</span>])
</code></pre>
<pre><code>mpla
</code></pre>
<p>وتعمل الصيغة نفسها مع القوائم، إذ يمكن تقطيع القوائم تمامًا كما تُقطَّع السلاسل النصية:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>]
<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">3</span>:<span class="hljs-number">7</span>])
</code></pre>
<pre><code>[4, 6, 1, 2]
</code></pre>
<h2 id="مزيد-من-التقطيعات">مزيد من التقطيعات</h2>
<p>في الواقع، تعمل صيغة <code>[]</code> بطريقة مشابهة جدًا للدالة <code>range</code>، ما يعني أننا يمكننا أيضًا أن نمنحها خطوة:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;exemplary&quot;</span>
<span class="hljs-built_in">print</span>(my_string[<span class="hljs-number">0</span>:<span class="hljs-number">7</span>:<span class="hljs-number">2</span>])
my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>]
<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">6</span>:<span class="hljs-number">2</span>:-<span class="hljs-number">1</span>])
</code></pre>
<pre><code>eepa
[7, 6, 5, 4]
</code></pre>
<p>وإذا أسقطنا أحد الفهرسين، فإن المشغّل يضمّ كل شيء افتراضيًا. وإلى جانب أمور أخرى، يتيح هذا كتابة برنامج قصير جدًا يعكس سلسلة نصية:</p>
<pre><code class="language-python">my_string = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a string: &quot;</span>)
<span class="hljs-built_in">print</span>(my_string[::-<span class="hljs-number">1</span>])
</code></pre>
<pre><code>Please type in a string: **exemplary**
yralpmexe
</code></pre>
<!--يوجد تحذير مشابه في الأقسام 3-4 و4-6 و5-1، فراجعها جميعًا إن كنت تُعدّل هذا-->
<h2 id="تحذير-استخدام-المتغيرات-العامة-داخل-الدوال">تحذير: استخدام المتغيّرات العامة داخل الدوال</h2>
<p>نعلم أنه من الممكن إسناد متغيّرات جديدة داخل تعريفات الدوال، لكن الدالة تستطيع أيضًا أن ترى متغيّرات أُسندت خارجها، في الدالة الرئيسية. وتُسمّى هذه المتغيّرات متغيّرات <em>عامة</em> (global).</p>
<p>استخدام المتغيّرات العامة من داخل الدوال عادةً فكرة سيئة. وإلى جانب المشكلات الأخرى، قد يسبّب ذلك أخطاءً يصعب تتبّعها.</p>
<p>فيما يلي مثال على دالة تستخدم متغيّرًا عامًا «من باب الخطأ»:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">print_reversed</span>(<span class="hljs-params">names: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-comment"># using the global variable instead of the parameter by accident</span>
    i = <span class="hljs-built_in">len</span>(name_list) - <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> i &gt;= <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(name_list[i])
        i -= <span class="hljs-number">1</span>

<span class="hljs-comment"># here the global variable is assigned</span>
name_list = [<span class="hljs-string">&quot;Steve&quot;</span>, <span class="hljs-string">&quot;Jean&quot;</span>, <span class="hljs-string">&quot;Katherine&quot;</span>, <span class="hljs-string">&quot;Paul&quot;</span>]
print_reversed(name_list)
<span class="hljs-built_in">print</span>()
print_reversed([<span class="hljs-string">&quot;Huey&quot;</span>, <span class="hljs-string">&quot;Dewey&quot;</span>, <span class="hljs-string">&quot;Louie&quot;</span>])
</code></pre>
<pre><code>Paul
Katherine
Jean
Steve

Paul
Katherine
Jean
Steve
</code></pre>
<p>رغم أن استدعاءَي الدالة يمرّران الوسيط من النوع المناسب، فإن الدالة تطبع دائمًا ما هو مخزَّن في المتغيّر العام <code>name_list</code>.</p>
<p>ولزيادة الأمر تعقيدًا، تذكّر أن كل شيفرة لاختبار دوالك ينبغي أن توضع داخل كتلة <code>if __name__ == &quot;__main__&quot;:</code> من أجل الاختبارات الآلية. وينبغي تعديل المثال السابق:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">print_reversed</span>(<span class="hljs-params">names: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-comment"># using the global variable instead of the parameter by accident</span>
    i = <span class="hljs-built_in">len</span>(name_list) - <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> i&gt;=<span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(name_list[i])
        i -= <span class="hljs-number">1</span>

<span class="hljs-comment"># All the code for testing the function should be within this block</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># here the global variable is assigned</span>
    name_list = [<span class="hljs-string">&quot;Steve&quot;</span>, <span class="hljs-string">&quot;Jean&quot;</span>, <span class="hljs-string">&quot;Katherine&quot;</span>, <span class="hljs-string">&quot;Paul&quot;</span>]
    print_reversed(name_list)
    <span class="hljs-built_in">print</span>()
    print_reversed([<span class="hljs-string">&quot;Huey&quot;</span>, <span class="hljs-string">&quot;Dewey&quot;</span>, <span class="hljs-string">&quot;Louie&quot;</span>])
</code></pre>
<p>لاحظ أن المتغيّر العام صار يُسنَد داخل كتلة <code>if</code> الآن.</p>
<p>تُنفَّذ الاختبارات الآلية في نظام TMC دون تشغيل أيٍّ من الشيفرة الموجودة في كتلة <code>if</code>. لذا، في هذا المثال الأخير لا تعمل الدالة حتى نظريًا، لأنها تشير إلى المتغيّر <code>name_list</code> الذي لا وجود له إطلاقًا عند تنفيذ الاختبارات.</p>
<blockquote>
<p><strong>تمرين برمجي: كل شيء معكوس</strong></p>
<p>اكتب دالة اسمها <code>everything_reversed</code>، تأخذ قائمة من السلاسل النصية كوسيط لها. وتُعيد الدالة قائمة جديدة تحوي جميع عناصر القائمة الأصلية معكوسة. كما ينبغي أن يكون ترتيب العناصر معكوسًا في القائمة الجديدة.</p>
</blockquote>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;Hi&quot;</span>, <span class="hljs-string">&quot;there&quot;</span>, <span class="hljs-string">&quot;example&quot;</span>, <span class="hljs-string">&quot;one more&quot;</span>]
new_list = everything_reversed(my_list)
<span class="hljs-built_in">print</span>(new_list)
</code></pre>
<pre><code>['erom eno', 'elpmaxe', 'ereht', 'iH']
</code></pre>
<h2 id="السلاسل-النصية-غير-قابلة-للتغيير">السلاسل النصية غير قابلة للتغيير</h2>
<p>تشترك السلاسل النصية والقوائم في الكثير، ولا سيما في طريقة سلوكها مع المشغّلات المختلفة. والفرق الرئيسي هو أن السلاسل النصية <em>غير قابلة للتغيير</em> (immutable). أي أنها لا يمكن تعديلها.</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;exemplary&quot;</span>
my_string[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;a&quot;</span>
</code></pre>
<p>لا يمكن تغيير السلاسل النصية، لذا يسبّب تنفيذ هذا البرنامج خطأً:</p>
<pre><code>TypeError: 'str' object does not support item assignment
</code></pre>
<p>ويتبعك خطأ مشابه إن حاولت ترتيب سلسلة نصية باستخدام تابع <code>sort</code>.</p>
<p>السلاسل النصية نفسها غير قابلة للتغيير، لكن المتغيّرات التي تحملها قابلة للتغيير. ويمكن استبدال سلسلة نصية بسلسلة نصية أخرى.</p>
<p>لذلك، يختلف المثالان التاليان جوهريًا:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
my_list[<span class="hljs-number">0</span>] = <span class="hljs-number">10</span>
</code></pre>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_6_1.png" alt="4_6_1.png"></p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;Hey&quot;</span>
my_string = my_string + <span class="hljs-string">&quot;!&quot;</span>
</code></pre>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_6_2.png" alt="4_6_2.png"></p>
<p>يغيّر المثال الأول محتوى القائمة المُشار إليها. أما المثال الثاني فيستبدل المرجع إلى السلسلة النصية الأصلية بمرجع إلى سلسلة نصية أخرى. وما زالت السلسلة النصية الأصلية في مكان ما من ذاكرة الحاسوب، لكن لا يوجد أي مرجع إليها، ولم يعد من الممكن استخدامها في البرنامج.</p>
<p>سنعود إلى هذا الموضوع في الجزء التالي، حيث تُناقش المراجع إلى القوائم بمزيد من التفصيل.</p>
<h2 id="مزيد-من-التوابع-للقوائم-والسلاسل-النصية">مزيد من التوابع للقوائم والسلاسل النصية</h2>
<p>يعدّ تابع <code>count</code> عدد مرات ورود العنصر أو السلسلة الفرعية المحدَّدة في الهدف. ويعمل هذا التابع بطريقة مماثلة مع السلاسل النصية والقوائم على حد سواء:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;How much wood would a woodchuck chuck if a woodchuck could chuck wood&quot;</span>
<span class="hljs-built_in">print</span>(my_string.count(<span class="hljs-string">&quot;ch&quot;</span>))

my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">6</span>]
<span class="hljs-built_in">print</span>(my_list.count(<span class="hljs-number">1</span>))
</code></pre>
<pre><code>5
3
</code></pre>
<p>لن يعدّ هذا التابع الورودات المتداخلة. فمثلًا، في السلسلة النصية <code>aaaa</code> يعدّ هذا التابع ورودين فقط من السلسلة الفرعية <code>aa</code>، مع أنه سيكون هناك ثلاثة حقًا لو سُمِح بالورودات المتداخلة.</p>
<p>يستبدل تابع <code>replace</code> سلسلة نصية جديدة، تُستبدل فيها سلسلة فرعية محدَّدة بسلسلة نصية أخرى:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;Hi there&quot;</span>
new_string = my_string.replace(<span class="hljs-string">&quot;Hi&quot;</span>, <span class="hljs-string">&quot;Hey&quot;</span>)
<span class="hljs-built_in">print</span>(new_string)
</code></pre>
<pre><code>Hey there
</code></pre>
<p>وسيستبدل هذا التابع جميع ورودات السلسلة الفرعية:</p>
<pre><code class="language-python">sentence = <span class="hljs-string">&quot;sheila sells seashells on the seashore&quot;</span>
<span class="hljs-built_in">print</span>(sentence.replace(<span class="hljs-string">&quot;she&quot;</span>, <span class="hljs-string">&quot;SHE&quot;</span>))
</code></pre>
<pre><code>SHEila sells seaSHElls on the seashore
</code></pre>
<p>وعند استخدام تابع <code>replace</code>، يكون الخطأ الشائع هو نسيان أن السلاسل النصية غير قابلة للتغيير:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;Python is fun&quot;</span>

<span class="hljs-comment"># Replaces the substring but doesn&#x27;t store the result...</span>
my_string.replace(<span class="hljs-string">&quot;Python&quot;</span>, <span class="hljs-string">&quot;Java&quot;</span>)
<span class="hljs-built_in">print</span>(my_string)
</code></pre>
<pre><code>Python is fun
</code></pre>
<p>وإذا لم تعد السلسلة النصية القديمة ضرورية، فيمكن إسناد السلسلة النصية الجديدة إلى المتغيّر نفسه:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;Python is fun&quot;</span>

<span class="hljs-comment"># Replaces the substring and stores the result in the same variable</span>
my_string = my_string.replace(<span class="hljs-string">&quot;Python&quot;</span>, <span class="hljs-string">&quot;Java&quot;</span>)
<span class="hljs-built_in">print</span>(my_string)
</code></pre>
<pre><code>Java is fun
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المحرف الأكثر شيوعًا</strong></p>
<p>اكتب دالة اسمها <code>most_common_character</code>، تأخذ سلسلة نصية كوسيط لها. وتُعيد الدالة المحرف الأكثر ورودًا داخل السلسلة النصية. وإذا كان هناك عدّة محارف متساوية في عدد الورودات، فينبغي إعادة المحرف الذي يظهر أولًا في السلسلة النصية.</p>
</blockquote>
<p>مثال على السلوك المتوقع:</p>
<pre><code class="language-python">first_string = <span class="hljs-string">&quot;abcdbde&quot;</span>
<span class="hljs-built_in">print</span>(most_common_character(first_string))

second_string = <span class="hljs-string">&quot;exemplaryelementary&quot;</span>
<span class="hljs-built_in">print</span>(most_common_character(second_string))
</code></pre>
<pre><code>b
e
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: ممنوع حروف العلة</strong></p>
<p>اكتب دالة اسمها <code>no_vowels</code>، تأخذ سلسلة نصية كوسيط لها. وتُعيد الدالة سلسلة نصية جديدة، ينبغي أن تكون مطابقةً للأصلية مع حذف جميع حروف العلة منها.</p>
</blockquote>
<p>يمكنك أن تفترض أن السلسلة النصية ستحتوي على محارف من الأبجدية الإنجليزية الصغيرة a...z فقط.</p>
<p>مثال على السلوك المتوقع:</p>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;this is an example&quot;</span>
<span class="hljs-built_in">print</span>(no_vowels(my_string))
</code></pre>
<pre><code>ths s n xmpl
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: ممنوع الصراخ</strong></p>
<p>يُعيد تابع السلسلة النصية <code>isupper()</code> في Python القيمة <code>True</code> إذا كانت السلسلة النصية تتكون من محارف <em>كبيرة</em> فقط.</p>
</blockquote>
<p>بعض الأمثلة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;XYZ&quot;</span>.isupper())

is_it_upper = <span class="hljs-string">&quot;Abc&quot;</span>.isupper()
<span class="hljs-built_in">print</span>(is_it_upper)
</code></pre>
<pre><code>True
False
</code></pre>
<p>يُرجى استخدام تابع <code>isupper</code> لكتابة دالة اسمها <code>no_shouting</code>، تأخذ قائمة من السلاسل النصية كوسيط لها. وتُعيد الدالة قائمة جديدة لا تحوي سوى تلك العناصر من القائمة الأصلية التي لا تتكون محارفها بالكامل من أحرف كبيرة.</p>
<p>مثال على السلوك المتوقع:</p>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;ABC&quot;</span>, <span class="hljs-string">&quot;def&quot;</span>, <span class="hljs-string">&quot;UPPER&quot;</span>, <span class="hljs-string">&quot;ANOTHERUPPER&quot;</span>, <span class="hljs-string">&quot;lower&quot;</span>, <span class="hljs-string">&quot;another lower&quot;</span>, <span class="hljs-string">&quot;Capitalized&quot;</span>]
pruned_list = no_shouting(my_list)
<span class="hljs-built_in">print</span>(pruned_list)
</code></pre>
<pre><code>['def', 'lower', 'another lower', 'Capitalized']
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المتجاورون في القائمة</strong></p>
<p>لمعطى قائمة من الأعداد الصحيحة، لنقرّر أن العنصرين المتتاليين في القائمة يكونان متجاورين إذا كان الفرق بينهما 1. إذن يكون العنصران 1 و2 متجاورين، وكذلك العنصران 56 و55.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>longest_series_of_neighbours</code>، تبحث عن أطول سلسلة متجاورين داخل القائمة، وتُعيد طولها.</p>
<p>فمثلًا، في القائمة <code>[1, 2, 5, 4, 3, 4]</code> تكون أطول قائمة متجاورين هي <code>[5, 4, 3, 4]</code>، وطولها 4.</p>
<p>مثال على استدعاء الدالة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>]
<span class="hljs-built_in">print</span>(longest_series_of_neighbours(my_list))
</code></pre>
<pre><code>4
</code></pre>
<h2 id="تطوير-مشروع-برمجي-أكبر">تطوير مشروع برمجي أكبر</h2>
<p>يختتم هذا الجزء الرابع بمشروع برمجي أكبر قليلًا، حيث تطبّق كثيرًا من التقنيات التي تعلّمتها حتى الآن.</p>
<p>القاعدة الأولى في معالجة أي مشروع برمجي هي ألّا تحاول حلّ كل شيء دفعة واحدة. فبينبغي أن يُبنى البرنامج من أجزاء أصغر، مثل دوال مساعدة. وينبغي أن تتحقق من عمل كل جزء قبل الانتقال إلى الجزء الذي يليه. وإذا حاولت معالجة الكثير دفعة واحدة، فلا يُحسن أن يؤول الأمر إلا إلى الفوضى.</p>
<p>ولتحقيق ذلك ستحتاج إلى وسيلة لاختبار دوالك خارج الدالة الرئيسية. ويمكنك تحقيق ذلك بتعريف دالة رئيسية صراحةً، واستدعاء هذه الدالة من خارج أي دالة أخرى في البرنامج. عندئذٍ يصبح من السهل تعليق استدعاء الدالة الواحدة أثناء الاختبار. ويمكن أن تبدو الخطوات الأولى في بناء مشروع البرمجة التالي هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    points = []
    <span class="hljs-comment"># your program code goes here</span>

main()
</code></pre>
<p>والآن يمكن اختبار دوال المساعدة دون تشغيل الدالة الرئيسية:</p>
<pre><code class="language-python"><span class="hljs-comment"># helper function for determining the grade based on the amount of points</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">grade</span>(<span class="hljs-params">points</span>):
    <span class="hljs-comment"># more code</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    all_points = []
    <span class="hljs-comment"># your program code goes here</span>

<span class="hljs-comment"># comment out the main function</span>
<span class="hljs-comment">#main()</span>

<span class="hljs-comment"># test the helper function</span>
student_points = <span class="hljs-number">35</span>
result = grade(student_points)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<h2 id="تمرير-البيانات-من-دالة-إلى-أخرى">تمرير البيانات من دالة إلى أخرى <span class="content-anchor" id="passing-data-from-one-function-to-another"></span></h2>
<!--- راجع أيضًا القسم 6-4، فهناك ترابط كبير-->
<p>عندما يحتوي البرنامج على عدّة دوال، يطرح السؤال نفسه: كيف تمرّر البيانات من دالة إلى أخرى؟</p>
<p>يسأل المثال التالي المستخدم عن بعض قيم الأعداد الصحيحة. ثم يطبع البرنامج هذه القيم ويُجري عليها «تحليلًا». وينقسم البرنامج إلى ثلاث دوال منفصلة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">input_from_user</span>(<span class="hljs-params">how_many: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Please type in <span class="hljs-subst">{how_many}</span> numbers:&quot;</span>)
    numbers = []

    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(how_many):
        number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">f&quot;Number <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>: &quot;</span>))
        numbers.append(number)

    <span class="hljs-keyword">return</span> numbers

<span class="hljs-keyword">def</span> <span class="hljs-title function_">print_result</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The numbers are: &quot;</span>)
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-built_in">print</span>(number)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">analyze</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    mean = <span class="hljs-built_in">sum</span>(numbers) / <span class="hljs-built_in">len</span>(numbers)
    <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;There are altogether <span class="hljs-subst">{<span class="hljs-built_in">len</span>(numbers)}</span> numbers, the mean is <span class="hljs-subst">{mean}</span>, the smallest is <span class="hljs-subst">{<span class="hljs-built_in">min</span>(numbers)}</span> and the greatest is <span class="hljs-subst">{<span class="hljs-built_in">max</span>(numbers)}</span>&quot;</span>

<span class="hljs-comment"># the &quot;main function&quot; using these functions</span>
inputs = input_from_user(<span class="hljs-number">5</span>)
print_result(inputs)
analysis_result = analyze(inputs)
<span class="hljs-built_in">print</span>(analysis_result)
</code></pre>
<p>وعند تنفيذ البرنامج، يمكن أن يسير الأمر هكذا:</p>
<pre><code>Please type in 5 numbers:
Number 1: **10**
Number 2: **34**
Number 3: **-32**
Number 4: **99**
Number 5: **-53**
The numbers are:
10
34
-32
99
-53
There are altogether 5 numbers, the mean is 11.6, the smallest is -53 and the greatest is 99
</code></pre>
<p>والفكرة هنا أن الدالة الرئيسية «تحفظ» كل البيانات التي يعالجها البرنامج. وفي هذه الحالة لا نحتاج سوى إلى مُدخَل المستخدم في المتغيّر <code>inputs</code>.</p>
<p>وإذا كانت المُدخَلات مطلوبة داخل دالة، فإنها تُمرَّر كوسيط. وهذا ما يحدث مع الدالتين <code>print_result</code> و<code>analyze</code>. وإذا أنتجت الدالة بيانات يحتاجها البرنامج في مواضع أخرى، فإنها تُعيدها بالأمر <code>return</code>، فتُخزَّن في متغيّر داخل الدالة الرئيسية. وهذا ما يحدث مع الدالتين <code>input_from_user</code> و<code>analyze</code>.</p>
<p>يمكنك استخدام المتغيّر العام <code>inputs</code> من الدالة الرئيسية مباشرةً داخل دوال المساعدة. وقد سبق أن شرحنا لماذا هي فكرة سيئة، لكن <a href="https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil">إليك شرحًا آخر</a>. فإذا استطاعت الدوال تغيير متغيّر عام، فقد تبدأ أمور غير متوقعة بالحدوث في البرنامج، ولا سيما حين يصير عدد الدوال كبيرًا.</p>
<p>وأفضل طريقة للتعامل مع تمرير البيانات إلى الدوال وإعادتها منها هي الوسائط والقيم المعادة.</p>
<p>ويمكنك أيضًا فصل الدالة الرئيسية الضمنية في المثال أعلاه في دالة خاصة بها. عندئذٍ لا يعود المتغيّر <code>inputs</code> متغيّرًا عامًا، بل يصير متغيّرًا محليًا داخل دالة <code>main</code>:</p>
<pre><code class="language-python"><span class="hljs-comment"># your main function goes here</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    inputs = input_from_user(<span class="hljs-number">5</span>)
    print_result(inputs)
    analysis_result = analyze(inputs)

    <span class="hljs-built_in">print</span>(analysis_result)

<span class="hljs-comment"># run the main function</span>
main()
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: إحصاءات الدرجات</strong></p>
<p>في هذا التمرين ستكتب برنامجًا يطبع إحصاءات الدرجات لمقرر جامعي.</p>
</blockquote>
<p>يسأل البرنامج المستخدم عن نتائج طلاب مختلفين في المقرر. وتشمل نقاط الاختبار وأعداد التمارين المنجزة. ثم يطبع البرنامج إحصاءات مبنية على هذه النتائج.</p>
<p>نقاط الاختبار أعداد صحيحة بين 0 و20. أما عدد التمارين المنجزة فهو عدد صحيح بين 0 و100.</p>
<p>يواصل البرنامج طلب المُدخَل حتى يكتب المستخدم سطرًا فارغًا. ويمكنك أن تفترض أن جميع الأسطر تحتوي على مُدخَل صحيح، ما يعني أنه يوجد عددان صحيحان في كل سطر، أو أن السطر فارغ.</p>
<p>ومثال على كيفية كتابة البيانات:</p>
<pre><code>Exam points and exercises completed: **15 87**
Exam points and exercises completed: **10 55**
Exam points and exercises completed: **11 40**
Exam points and exercises completed: **4 17**
Exam points and exercises completed:
Statistics:
</code></pre>
<p>وحين يكتب المستخدم سطرًا فارغًا، يطبع البرنامج إحصاءات، تُصاغ على النحو التالي:</p>
<p>تُحوَّل التمارين المنجزة إلى <em>نقاط تمارين</em>، بحيث إن أنجزت 10% على الأقل من التمارين منحت نقطة واحدة، و20% منحت نقطتين، وهكذا. وإنجاز كل التمارين الـ100 يمنح 10 نقاط تمارين. وعدد نقاط التمارين الممنوحة قيمة صحيحة، مقرَّبة إلى الأسفل.</p>
<p>وتُحدَّد درجة المقرر بناءً على الجدول التالي:</p>
<table>
<thead>
<tr>
<th style="text-align:center">نقاط الاختبار + نقاط التمارين</th>
<th style="text-align:center">الدرجة</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0–14</td>
<td style="text-align:center">0 (أي رسوب)</td>
</tr>
<tr>
<td style="text-align:center">15–17</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">18–20</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">21–23</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">24–27</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">28–30</td>
<td style="text-align:center">5</td>
</tr>
</tbody>
</table>
<p>وهناك أيضًا حدّ أدنى لدرجات الاختبار. فإذا حصل الطالب على أقل من 10 نقاط في الاختبار، فإنه يرسب في المقرر تلقائيًا، مهما كان مجموع نقاطه الكلي.</p>
<p>وبالمُدخَلات المثال أعلاه، يطبع البرنامج الإحصاءات التالية:</p>
<pre><code>Statistics:
Points average: 14.5
Pass percentage: 75.0
Grade distribution:
  5:
  4:
  3: *
  2:
  1: **
  0: *
</code></pre>
<p>ينبغي طباعة الأعداد العشرية بدقة خانة عشرية واحدة.</p>
<p><strong>ملاحظة مهمة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال بعينها، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>. فإذا كانت أي وظيفة في برنامجك موجودة مثلًا في دالة <code>main</code>، فينبغي أن تُدرج الشيفرة التي تستدعي هذه الدالة بشكل عادي، وألّا تضعها داخل كتلة <code>if</code> كما في التمارين التي تحدّد دوال بعينها.</p>
<p><strong>تلميح:</strong></p>
<p>يتكوّن مُدخَل المستخدم في هذا البرنامج من أسطر تحتوي على قيمتين عدديتين صحيحتين:</p>
<pre><code>Exam points and exercises completed: **15 87**
</code></pre>
<p>عليك أولًا أن تقسم سطر المُدخَل إلى قسمين، ثم أن تحوّل الأجزاء إلى أعداد صحيحة بالدالة <code>int</code>. ويمكن تقسيم المُدخَل بالطريقة نفسها المستخدمة في تمرين <a href="/arabic-cs-library/book/mooc/part-4/2-more-functions#programming-exercise-first-second-and-last-words">الكلمة الأولى والثانية والأخيرة</a>، لكن هناك طريقة أبسط أيضًا. فالتابع <code>split</code> الخاص بالسلاسل النصية سيقسم المُدخَل تقسيمًا جيدًا. وستجد المزيد من المعلومات بالبحث عن <em>python string split</em> عبر الإنترنت.</p>
<!-- **لاحظ** أن نظام Windows يعاني في الوقت الحالي من مشكلات في تشغيل اختبارات بعض التمارين. فإن صادفت رسالة الخطأ التالية

<img src="/arabic-cs-library/images/mooc/part-4/4_3_2.png" alt="التكرار على قائمة">

فيمكنك تشغيل الاختبارات بإرسالها إلى الخادم، باختيار _Submit solutions_ من قائمة TMC التي تُفتح من الرمز الموجود على يمين زر تشغيل الاختبارات.

يمكن حل المشكلة بالانتقال إلى قائمة تثبيت الإضافة وتغيير موضع التمارين في "TMC Data" إلى موضع آخر له مسار ملفات أقصر، عبر زر _change path_ الظاهر في الصورة أدناه. وقد يستغرق هذا بعض الوقت، لذا انتظر انتهاء العملية.

يجري العمل على إيجاد حل أفضل للمشكلة في الأيام القريبة. -->
<p>&lt;!-</p>
<p>اختبار لمراجعة محتويات هذا القسم:</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 925f1715-d762-5e44-a812-be13bff1aa44)</p>
</blockquote>
<p>--&gt;</p>
<p>يُرجى الإجابة على استبيان سريع حول مواد هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 1658e788-b6ce-50b0-93ee-151e9cb6a495)</p>
</blockquote>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,e as slug,p as title};
