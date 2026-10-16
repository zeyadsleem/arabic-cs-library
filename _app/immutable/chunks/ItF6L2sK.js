const s="mooc",n="part-5",a="الجزء 5: هياكل البيانات",p="1-more-lists",l="المزيد عن القوائم",e=[{depth:2,id:"قوائم-بأنواع-بيانات-مختلفة",text:"قوائم بأنواع بيانات مختلفة"},{depth:2,id:"تذكير-استخدام-المتغيرات-العامة-داخل-الدوال",text:"تذكير: استخدام المتغيّرات العامة داخل الدوال"},{depth:2,id:"تحذير-الكتابة-فوق-معامل-والعودة-مبكرا",text:"تحذير: الكتابة فوق معامل والعودة مبكرًا"},{depth:2,id:"القوائم-داخل-القوائم",text:"القوائم داخل القوائم"},{depth:2,id:"المصفوفات",text:"المصفوفات"},{depth:2,id:"تصوير-شيفرة-تحتوي-على-قوائم-داخل-قوائم",text:"تصوير شيفرة تحتوي على قوائم داخل قوائم"},{depth:2,id:"الوصول-إلى-عناصر-المصفوفة",text:"الوصول إلى عناصر المصفوفة"},{depth:2,id:"مصفوفة-ثنائية-الأبعاد-كهيكلة-بيانات-في-لعبة",text:"مصفوفة ثنائية الأبعاد كهيكلة بيانات في لعبة"}],r=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على إنشاء قوائم من أنواع مختلفة من العناصر</li>
<li>ستعرف كيف تستخدم القوائم لتنظيم البيانات</li>
<li>ستكون قادرًا على تخزين مصفوفة كقائمة ثنائية الأبعاد</li>
</ul>
</blockquote>
<!--النص نفسه وارد في الأقسام 3-1 و5-1 و6-1، فتحقّق منها جميعًا إن عدّلته-->
<blockquote>
<p><strong>عن تمارين هذه الدورة</strong></p>
<p>يتطلب أن تصير مبرمجًا ماهرًا الكثير من التدريب، بل أحيانًا تدريبًا ميكانيائيًّا في جوهره. كما أنه ينطوي على تنمية مهارات حلّ المشكلات وتطبيق الحدس. ولهذا تحتوي هذه الدورة على الكثير من التمارين بأنواع مختلفة. فبعضها يطلب منك تطبيق ما تعلّمته في المادة تطبيقًا مباشرًا إلى حدٍّ كبير، لكن بعضها الآخر متعمَّد أكثر ويتّسم بأنه مفتوح النهاية.</p>
<p>قد يبدو بعض التمارين مربكًا في البداية، لكن لا داعي للقلق. فليس أيٌّ من التمارين إلزاميًّا بشكل قاطع، وفي الحقيقة <em>لا تحتاج سوى إلى 25 % من نقاط كل جزء لاجتياز الدورة.</em> ويمكنك العثور على مزيد من التفاصيل حول اجتياز الدورة في <a href="/arabic-cs-library/book/mooc/auxiliary/grading-and-exams">صفحة الدرجات</a>.</p>
<p><strong>التمارين ليست مرتّبة بأي ترتيب معيّن من حيث الصعوبة.</strong> فكل قسم يقدّم عادةً بعض المفاهيم الجديدة في البرمجة، ثم تُمارَس هذه المفاهيم بتمارين أبسط وآخر أعقد. <strong>وإذا صادفتك تمرين يبدو صعبًا أكثر من اللازم، فانتقل إلى التمرين التالي.</strong> ويمكنك دائمًا العودة إلى التمارين الأصعب لاحقًا إن كان لديك الوقت.</p>
<p>وحين يصبح الأمر صعبًا حتمًا، فعليك بكلمة عزاء: فالمهمة التي تبدو صعبة إلى حدٍّ مستحيل هذا الأسبوع من المرجح أن تبدو سهلة إلى حدٍّ كبير بعد نحو أربعة أسابيع.</p>
</blockquote>
<h2 id="قوائم-بأنواع-بيانات-مختلفة">قوائم بأنواع بيانات مختلفة</h2>
<p>في الجزء السابق تعاملنا في الغالب مع قوائم تحتوي على أعداد صحيحة، لكن يمكن تخزين أي أنواع من القيم في القوائم. ويمكن أن تبدو قائمة من السلاسل النصية هكذا:</p>
<pre><code class="language-python">names = [<span class="hljs-string">&quot;Marlyn&quot;</span>, <span class="hljs-string">&quot;Ruth&quot;</span>, <span class="hljs-string">&quot;Paul&quot;</span>]
<span class="hljs-built_in">print</span>(names)
names.append(<span class="hljs-string">&quot;David&quot;</span>)
<span class="hljs-built_in">print</span>(names)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of names on the list:&quot;</span>, <span class="hljs-built_in">len</span>(names))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Names in alphabetical order:&quot;</span>)
names.sort()
<span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> names:
  <span class="hljs-built_in">print</span>(name)
</code></pre>
<pre><code>['Marlyn', 'Ruth', 'Paul']
['Marlyn', 'Ruth', 'Paul', 'David']
Number of names on the list: 4
Names in alphabetical order:
David
Marlyn
Paul
Ruth
</code></pre>
<p>الأعداد العشرية عناصر صالحة في القوائم أيضًا:</p>
<pre><code class="language-python">measurements = [-<span class="hljs-number">2.5</span>, <span class="hljs-number">1.1</span>, <span class="hljs-number">7.5</span>, <span class="hljs-number">14.6</span>, <span class="hljs-number">21.0</span>, <span class="hljs-number">19.2</span>]

<span class="hljs-keyword">for</span> measure <span class="hljs-keyword">in</span> measurements:
    <span class="hljs-built_in">print</span>(measure)

mean = <span class="hljs-built_in">sum</span>(measurements) / <span class="hljs-built_in">len</span>(measurements)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The mean is:&quot;</span>, mean)
</code></pre>
<pre><code>-2.5
1.1
7.5
14.6
21.0
19.2
The mean is: 10.15
</code></pre>
<!--هناك تحذير مشابه في الأقسام 3-4 و4-6 و5-1، فتحقّق منها جميعًا إن عدّلته-->
<h2 id="تذكير-استخدام-المتغيرات-العامة-داخل-الدوال">تذكير: استخدام المتغيّرات العامة داخل الدوال</h2>
<p>نعرف أنه من الممكن إسناد متغيّرات جديدة داخل تعريفات الدوال، لكن الدالة ترى أيضًا المتغيّرات المسنَدة خارجها، في الدالة الرئيسية. وتُسمّى هذه المتغيّرات متغيّرات <em>عامة</em> (<em>global</em>).</p>
<p>عادةً ما يكون استخدام المتغيّرات العامة من داخل الدوال فكرة سيّئة. فإلى جانب مشكلات أخرى، قد يسبّب ذلك أخطاءً يصعب تتبّعها.</p>
<p>فيما يلي مثال على دالة تستخدم متغيّرًا عامًا «عن طريق الخطأ»:</p>
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
<p>رغم أن كلا استدعاءَي الدالة يتضمّن الوسيط من النوع الصحيح، فإن الدالة تطبع دائمًا ما هو مخزّن في المتغيّر العام <code>name_list</code>.</p>
<p>ولزيادة الأمور تعقيدًا، تذكّر أن جميع شيفرة اختبار دوالك ينبغي أن توضع في كتلة <code>if __name__ == &quot;__main__&quot;:</code> الخاصة بالاختبارات الآلية. وينبغي تعديل المثال السابق ليصبح:</p>
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
<p>تُنفَّذ الاختبارات الآلية في نظام TMC دون تشغيل أيٍّ من الشيفرة الموجودة في كتلة <code>if</code>. لذلك، فإن الدالة في هذا المثال الأخير لن تعمل نظريًّا أصلًا، لأنها تشير إلى المتغيّر <code>name_list</code> الذي لا يوجد إطلاقًا وقت تنفيذ الاختبارات.</p>
<h2 id="تحذير-الكتابة-فوق-معامل-والعودة-مبكرا">تحذير: الكتابة فوق معامل والعودة مبكرًا</h2>
<p>هناك بضعة مصادر جديدة للأخطاء ينبغي أن نطّلع عليها قبل أن ننتقل إلى تمارين هذا الجزء. ولنعُد إلى دالة تخبرنا ما إذا كان عدد صحيح موجودًا في قائمة. وكلاهما معرَّف كمعامل للدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">number_in_list</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span>, number: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-keyword">if</span> number == number:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<p>تبدو هذه الدالة وكأنها تُرجع <code>True</code> دائمًا. والسبب أن حلقة <code>for</code> تكتب فوق القيمة المخزّنة في المعامل <code>number</code>. وبذلك يكون الشرط في جملة <code>if</code> صحيحًا دائمًا.</p>
<p>وإعادة تسمية المعامل تحلّ المشكلة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">number_in_list</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span>, searched_number: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-keyword">if</span> number == searched_number:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<p>يبدو الشرط في جملة <code>if</code> الآن أفضل. لكن هناك مشكلة جديدة، إذ لا تزال الدالة تبدو غير عاملة بشكل صحيح. وتُظهر تجربة ما يلي وجود خلل:</p>
<pre><code class="language-python">found = number_in_list([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(found)  <span class="hljs-comment"># prints out False</span>
</code></pre>
<p>المشكلة هنا أن الدالة تعود مبكرًا، دون فحص جميع الأعداد في القائمة. فالواقع أن الدالة تأخذ العنصر الأول في القائمة فقط، وتُرجع <code>True</code> أو <code>False</code> بحسب قيمته. ولا يمكننا معرفة ما إذا كان عدد ما <em>غير موجود</em> في القائمة قبل أن نفحص جميع عناصر القائمة. وينبغي أن يوضع الأمر <code>return False</code> خارج حلقة <code>for</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">number_in_list</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span>, searched_number: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-keyword">if</span> number == searched_number:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<p>ولنُعُد إلى دالة معطوبة أخرى:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">unique_numbers</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-comment"># a helper variable to store all the numbers we&#x27;ve already checked</span>
    numbers = []
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-comment"># have we seen this number already?</span>
        <span class="hljs-keyword">if</span> number <span class="hljs-keyword">in</span> numbers:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
        numbers.append(number)

    <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

unique = unique_numbers([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(unique)  <span class="hljs-comment"># prints out True</span>
</code></pre>
<p>ينبغي أن تفحص هذه الدالة ما إذا كانت جميع الأعداد في القائمة مختلفة عن بعضها بعض، لكنها تُرجع <code>True</code> دائمًا.</p>
<p>هنا أيضًا تكتب الدالة عن طريق الخطأ فوق القيمة المخزّنة في معاملها. فتحاول الدالة استخدام المتغيّر <code>numbers</code> لتخزين جميع الأعداد التي فحصتها بالفعل، لكن هذا يكتب فوق قائمة الوسائط الأصلية. وإعادة تسمية المتغيّر المساعد حلٌّ سهل:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">unique_numbers</span>(<span class="hljs-params">numbers: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-comment"># a helper variable to store all the numbers we&#x27;ve already checked</span>
    numbers_checked = []
    <span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> numbers:
        <span class="hljs-comment"># have we seen this number already?</span>
        <span class="hljs-keyword">if</span> number <span class="hljs-keyword">in</span> numbers_checked:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
        numbers_checked.append(number)

    <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

unique = unique_numbers([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(unique)  <span class="hljs-comment"># prints out False</span>
</code></pre>
<p>يمكن تحديد مشكلات كهذه، وكثير غيرها، وإصلاحها بمساعدة أداة التنقيح أو <a href="http://www.pythontutor.com/visualize.html#mode=edit">أداة التصوير المرئي</a>. ولا يمكن الإفراط في التأكيد على أهمية تعلّم استخدام هاتين الأداتين بكفاءة.</p>
<blockquote>
<p><strong>تمرين برمجي: السلسلة النصية الأطول</strong></p>
<p>اكتب دالة اسمها <code>longest(strings: list)</code>، تأخذ قائمة من السلاسل النصية كوسيط لها. وتجد الدالة أطول سلسلة نصية في القائمة وتُرجعها. ويمكنك أن تفترض أن أطول سلسلة نصية في القائمة فريدة تمامًا.</p>
</blockquote>
<p>مثال على السلوك المتوقّع:</p>
<pre><code class="language-python">
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    strings = [<span class="hljs-string">&quot;hi&quot;</span>, <span class="hljs-string">&quot;hiya&quot;</span>, <span class="hljs-string">&quot;hello&quot;</span>, <span class="hljs-string">&quot;howdydoody&quot;</span>, <span class="hljs-string">&quot;hi there&quot;</span>]
    <span class="hljs-built_in">print</span>(longest(strings))

</code></pre>
<pre><code>howdydoody
</code></pre>
<h2 id="القوائم-داخل-القوائم">القوائم داخل القوائم</h2>
<p>يمكن لعناصر القائمة أن تكون قوائم في ذاتها:</p>
<pre><code class="language-python">my_list = [[<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>]]
<span class="hljs-built_in">print</span>(my_list)
<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>])
</code></pre>
<pre><code>[[5, 2, 3], [4, 1], [2, 2, 5, 1]]
[4, 1]
4
</code></pre>
<p>لماذا تكون القوائم داخل القوائم مفيدة؟</p>
<p>تذكّر أن القوائم يمكن أن تحتوي على عناصر من أنواع مختلفة. ويمكنك تخزين معلومات عن شخص ما في قائمة. فمثلًا يمكنك أن تجعل اسمه العنصر الأول، وعمره العنصر الثاني، وطوله بالأمتار العنصر الثالث:</p>
<pre><code class="language-python">[<span class="hljs-string">&quot;Anne&quot;</span>, <span class="hljs-number">12</span>, <span class="hljs-number">1.45</span>]
</code></pre>
<p>ومن ثمّ يمكن أن تكون قاعدة بيانات الأشخاص قائمة، تكون عناصرها قوائم تحتوي على معلومات عن شخص واحد:</p>
<pre><code class="language-python">persons = [[<span class="hljs-string">&quot;Betty&quot;</span>, <span class="hljs-number">10</span>, <span class="hljs-number">1.37</span>], [<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1.25</span>], [<span class="hljs-string">&quot;Emily&quot;</span>, <span class="hljs-number">32</span>, <span class="hljs-number">1.64</span>], [<span class="hljs-string">&quot;Alan&quot;</span>, <span class="hljs-number">39</span>, <span class="hljs-number">1.78</span>]]

<span class="hljs-keyword">for</span> person <span class="hljs-keyword">in</span> persons:
  name = person[<span class="hljs-number">0</span>]
  age = person[<span class="hljs-number">1</span>]
  height = person[<span class="hljs-number">2</span>]
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{name}</span>: age <span class="hljs-subst">{age}</span> years, height <span class="hljs-subst">{height}</span> meters&quot;</span>)
</code></pre>
<pre><code>Betty: age 10 years, height 1.37 meters
Peter: age 7 years, height 1.25 meters
Emily: age 32 years, height 1.64 meters
Alan: age 39 years, height 1.78 meters
</code></pre>
<p>تمرّ حلقة <code>for</code> على عناصر القائمة الخارجية واحدًا تلو الآخر. أي أن كل قائمة تحتوي على معلومات عن شخص واحد تُسنَد بالتبادل إلى المتغيّر <code>person</code>.</p>
<p>ليست القوائم دائمًا أفضل طريقة لعرض البيانات، مثل معلومات عن شخص. وسنصادف قريبًا <em>قاموسات</em> Python (<em>dictionaries</em>)، وهي أنسب كثيرًا لهذه الحالات.</p>
<h2 id="المصفوفات">المصفوفات</h2>
<p>المصفوفة ثنائية الأبعاد، أو ما يُسمّى <em>مصفوفة</em> (<em>matrix</em>)، تطبيق طبيعي آخر لقائمة داخل قائمة.</p>
<p>فمثلًا، المصفوفة التالية</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_1_1.png" alt="5_1_1.png"></p>
<p>يمكن عرضها في Python كقائمة ثنائية الأبعاد هكذا:</p>
<pre><code class="language-python">my_matrix = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]]
</code></pre>
<p>ولأن المصفوفة قائمة تحتوي على قوائم، يمكن الوصول إلى العناصر الفردية داخل المصفوفة باستخدام أقواس مربّعة متتالية. فيُشير الفهرس الأول إلى الصف، ويشير الثاني إلى العمود. ويبدأ الترقيم من الصفر، فمثلًا يشير <code>my_matrix[0][1]</code> إلى العنصر الثاني في الصف الأول.</p>
<pre><code class="language-python">my_matrix = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]]

<span class="hljs-built_in">print</span>(my_matrix[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>])
my_matrix[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>] = <span class="hljs-number">10</span>
<span class="hljs-built_in">print</span>(my_matrix)
</code></pre>
<pre><code>2
[[1, 2, 3], [10, 2, 1], [4, 5, 6]]
</code></pre>
<p>كما في أي قائمة أخرى، يمكن المرور على صفوف المصفوفة بحلقة <code>for</code>. وتطبع الشيفرة التالية كل صف من المصفوفة في سطر منفصل:</p>
<pre><code class="language-python">my_matrix = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>], [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>]]

<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> my_matrix:
    <span class="hljs-built_in">print</span>(row)
</code></pre>
<pre><code>[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
</code></pre>
<p>وبالمثل، يمكن استخدام الحلقات المتداخلة للوصول إلى العناصر الفردية. وتطبع الشيفرة التالية كل عنصر في المصفوفة في سطر منفصل بمساعدة حلقتي <code>for</code>:</p>
<pre><code class="language-python">my_matrix = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>], [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>]]

<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> my_matrix:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a new row&quot;</span>)
    <span class="hljs-keyword">for</span> element <span class="hljs-keyword">in</span> row:
        <span class="hljs-built_in">print</span>(element)
</code></pre>
<pre><code>a new row
1
2
3
a new row
4
5
6
a new row
7
8
9
</code></pre>
<h2 id="تصوير-شيفرة-تحتوي-على-قوائم-داخل-قوائم">تصوير شيفرة تحتوي على قوائم داخل قوائم <span class="content-anchor" id="visualising-code-containing-lists-within-lists"></span></h2>
<p>قد تبدو البرامج التي تحتوي على قوائم داخل قوائم صعبة الفهم في البداية. وتساعدك <a href="http://www.pythontutor.com/visualize.html">أداة التصوير المرئي</a> من Python Tutor كثيرًا في فهم كيفية عملها. وفيما يلي تصوير مرئي للمثال أعلاه:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_1_2.png" alt="5_1_2.png"></p>
<p>تكشف الصورة أعلاه أن مصفوفة 3 في 3 تتكون تقنيًا من أربع قوائم. ويمثّل أول هذه القوائم المصفوفة بأكملها. أما القوائم الثلاث المتبقية فهي عناصر في القائمة الأولى، وتمثّل الصفوف.</p>
<p>ولأن القوائم متعددة الأبعاد يمكن المرور عليها بحلقات متداخلة، من الطبيعي أن نفكر في القوائم نفسها على أنها متداخلة، لكن الصورة أعلاه تبيّن لنا أن الأمر ليس كذلك في الواقع. وبدلًا من ذلك، فإن القائمة التي تمثّل المصفوفة كاملة «تشير» إلى كل قائمة منفردة تمثّل صفًّا في المصفوفة. ويُسمّى هذا <em>مرجعًا</em> (<em>reference</em>)، وسيُبحث في الفكرة بمزيد من التفصيل في <a href="/arabic-cs-library/book/mooc/part-5/2-references">القسم التالي</a>.</p>
<p>في الصورة أعلاه يكون التنفيذ قد تقدّم إلى الصف الثاني من المصفوفة، وهذه القائمة هي ما يشير إليه المتغيّر <code>row</code> حاليًا. أما المتغيّر <code>element</code> فيحتوي على العنصر الذي يقف عنده التنفيذ حاليًا. والقيمة المخزّنة في <code>element</code> هي العنصر الأوسط في القائمة، أي 5.</p>
<h2 id="الوصول-إلى-عناصر-المصفوفة">الوصول إلى عناصر المصفوفة</h2>
<p>الوصول إلى صف واحد داخل المصفوفة بسيط - يكفي اختيار الصف المطلوب. وتحسب الدالة التالية مجموع عناصر الصف المختار:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_of_row</span>(<span class="hljs-params">my_matrix, row_no: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># choose the desired row from within the matrix</span>
    row = my_matrix[row_no]
    row_sum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> row:
        row_sum += item

    <span class="hljs-keyword">return</span> row_sum

m = [[<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">9</span>, <span class="hljs-number">1</span>, <span class="hljs-number">12</span>, <span class="hljs-number">11</span>], [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">1</span>]]

my_sum = sum_of_row(m, <span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(my_sum) <span class="hljs-comment"># prints out 33 (which equals 9 + 1 + 12 + 11)</span>
</code></pre>
<p>العمل بالأعمدة داخل المصفوفة أعقد قليلًا، لأن المصفوفة مخزّنة صفوفًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_of_column</span>(<span class="hljs-params">my_matrix, column_no: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># go through each row and select the item at the chosen position</span>
    column_sum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> my_matrix:
        column_sum += row[column_no]

    <span class="hljs-keyword">return</span> column_sum

m = [[<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">9</span>, <span class="hljs-number">1</span>, <span class="hljs-number">12</span>, <span class="hljs-number">11</span>], [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">1</span>]]

my_sum = sum_of_column(m, <span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(my_sum) <span class="hljs-comment"># prints out 39 (which equals 3 + 12 + 9 + 15)</span>
</code></pre>
<p>يتكوّن العمود المعالَج هنا من العناصر الموجودة عند الفهرس 2 في <em>كل صف</em>.</p>
<p>يُنصح بشدة باستخدام <a href="http://www.pythontutor.com/visualize.html">أداة التصوير المرئي</a> لفهم كيفية عمل هذه الدوال.</p>
<p>تغيير قيمة عنصر واحد داخل المصفوفة بسيط: اختر صفًّا داخل المصفوفة، ثم اختر عمودًا داخل الصف:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">change_value</span>(<span class="hljs-params">my_matrix, row_no: <span class="hljs-built_in">int</span>, column_no: <span class="hljs-built_in">int</span>, new_value: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># choose the desired row</span>
    row = my_matrix[row_no]
    <span class="hljs-comment"># select the correct item within the row</span>
    row[column_no] = new_value

m = [[<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">9</span>, <span class="hljs-number">1</span>, <span class="hljs-number">12</span>, <span class="hljs-number">11</span>], [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">1</span>]]

<span class="hljs-built_in">print</span>(m)
change_value(m, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1000</span>)
<span class="hljs-built_in">print</span>(m)
</code></pre>
<pre><code>[[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 5], [2, 9, 15, 1]]
[[4, 2, 3, 2], [9, 1, 12, 11], [7, 8, 9, 1000], [2, 9, 15, 1]]
</code></pre>
<p>لاحظ كيف استخدمنا في الأعلى فهرسي الصف والعمود للوصول إلى عنصر مختار. وإذا أردنا تغيير محتويات المصفوفة، فعلينا الوصول إلى العناصر بفهارسها. وهذا يعني أننا لا نستطيع استخدام حلقة <code>for item in list</code> بسيطة للمرور على المصفوفة إذا أردنا تغيير محتوياتها.</p>
<p>وبدلًا من ذلك، علينا تتبّع فهارس العناصر، مثلًا بحلقة <code>while</code> أو حلقة <code>for</code> تستخدم الدالة <code>range</code>. وتزيد الشيفرة التالية قيمة كل عنصر في المصفوفة بمقدار واحد:</p>
<pre><code class="language-python">m = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>], [<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]]

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(m)): <span class="hljs-comment"># using the number of rows in the matrix</span>
    <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(m[i])): <span class="hljs-comment"># using the number of items on each row </span>
        m[i][j] += <span class="hljs-number">1</span>

<span class="hljs-built_in">print</span>(m)
</code></pre>
<pre><code>[[2, 3, 4], [5, 6, 7], [8, 9, 10]]
</code></pre>
<p>تمرّ الحلقة الخارجية على الفهارس من الصفر إلى طول المصفوفة، أي عدد صفوف المصفوفة. أما الحلقة الداخلية فتتمرّ على الفهارس من الصفر إلى طول كل صف داخل المصفوفة.</p>
<blockquote>
<p><strong>تمرين برمجي: عدد العناصر المتطابقة</strong></p>
<p>اكتب دالة اسمها <code>count_matching_elements(my_matrix: list, element: int)</code>، تأخذ مصفوفة ثنائية الأبعاد من الأعداد الصحيحة وقيمة عدد صحيح واحد كوسيطين لها. ثم تعدّ الدالة كم عنصرًا داخل المصفوفة يطابق قيمة الوسيط.</p>
</blockquote>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python">m = [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>], [<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>]]
<span class="hljs-built_in">print</span>(count_matching_elements(m, <span class="hljs-number">1</span>))
</code></pre>
<pre><code>3
</code></pre>
<h2 id="مصفوفة-ثنائية-الأبعاد-كهيكلة-بيانات-في-لعبة">مصفوفة ثنائية الأبعاد كهيكلة بيانات في لعبة</h2>
<p>يمكن أن تكون المصفوفة بنية بيانات مفيدة جدًا في ألعاب مختلفة كثيرة. فمثلًا، شبكة لعبة سودوكو في الصورة أدناه</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_1_3.png" alt="5_1_3.png"></p>
<p>يمكن تمثيلها بصيغة مصفوفة هكذا:</p>
<pre><code class="language-python">sudoku = [
  [<span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>]
]
</code></pre>
<p>هنا تمثّل القيمة صفر مربعًا فارغًا، لأن الصفر ليست قيمة مقبولة في لغز سودوكو مكتمل.</p>
<p>وفيما يلي دالة بسيطة لطبع شبكة سودوكو أعلاه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">print_grid</span>(<span class="hljs-params">sudoku</span>):
    <span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> sudoku:
        <span class="hljs-keyword">for</span> square <span class="hljs-keyword">in</span> row:
            <span class="hljs-keyword">if</span> square &gt; <span class="hljs-number">0</span>:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot; <span class="hljs-subst">{square}</span>&quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
            <span class="hljs-keyword">else</span>:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; _&quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
        <span class="hljs-built_in">print</span>()

print_grid(sudoku)
</code></pre>
<p>ينبغي أن يبدو المخرج كالتالي::</p>
<pre><code class="language-x">
 9 _ _ _ 8 _ 3 _ _
 _ _ _ 2 5 _ 7 _ _
 _ 2 _ 3 _ _ _ _ 4
 _ 9 4 _ _ _ _ _ _
 _ _ _ 7 3 _ 5 6 _
 7 _ 5 _ 6 _ 4 _ _
 _ _ 7 8 _ 3 9 _ _
 _ _ 1 _ _ _ _ _ 3
 3 _ _ _ _ _ _ _ 2

</code></pre>
<p>يمكن نمذجة أي لعبة شائعة ذات لوحة لعب بالأسلوب نفسه. فمن بين غيرها، تُبنى لعبة الشطرنج (chess)، ولعبة Minesweeper، ولعبة Battleship، ولعبة Mastermind جميعًا على شبكة ثنائية الأبعاد. أما في سودوكو فمن الطبيعي استخدام الأعداد لتمثيل حالة اللعبة، لكن في غيرها من الألعاب قد تكون الأساليب الأخرى أفضل.</p>
<blockquote>
<p><strong>تمرين برمجي: Go</strong></p>
<p>في لعبة Go يتناوب لاعبان على وضع حجرين أسود وأبيض على لوحة اللعب. والفائز هو اللاعب الذي يتمكّن من تطويق مساحة أكبر على اللوحة بقطعه اللعبية الخاصة.</p>
</blockquote>
<p>اكتب دالة اسمها <code>who_won(game_board: list)</code>، تأخذ مصفوفة ثنائية الأبعاد كوسيط لها. وتتكون المصفوفة من قيم عددية تمثّل الحالات التالية:</p>
<ul>
<li>0: مربع فارغ</li>
<li>1: قطعة اللاعب 1</li>
<li>2: قطعة اللاعب 2</li>
</ul>
<p>قد تكون قواعد حساب النقاط في لعبة Go معقّدة إلى حدٍّ ما، لكن في هذا التمرين يكفي مقارنة عدد القطع التي يملكها كل لاعب على لوحة اللعب. كما أن حجم لوحة اللعب غير محدود.</p>
<p>ينبغي أن تُرجع الدالة القيمة 1 إذا فاز اللاعب 1، والقيمة 2 إذا فاز اللاعب 2. وإذا تملك كلا اللاعبين العدد نفسه من القطع على اللوحة، فينبغي أن تُرجع الدالة القيمة 0.</p>
<blockquote>
<p><strong>تمرين برمجي: سودوكو: فحص الصف</strong></p>
<p>اكتب دالة اسمها <code>row_correct(sudoku: list, row_no: int)</code>، تأخذ مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو، وعددًا صحيحًا يشير إلى صف واحد، كوسيطين لها. وتُفهرَس الصفوف من 0.</p>
</blockquote>
<p>ينبغي أن تُرجع الدالة <code>True</code> أو <code>False</code>، بحسب ما إذا كان الصف معبَّأ بشكل صحيح، أي ما إذا كان يحتوي على كل الأعداد من 1 إلى 9 مرة واحدة على الأكثر.</p>
<pre><code class="language-python">sudoku = [
  [<span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>]
]

<span class="hljs-built_in">print</span>(row_correct(sudoku, <span class="hljs-number">0</span>))
<span class="hljs-built_in">print</span>(row_correct(sudoku, <span class="hljs-number">1</span>))
</code></pre>
<pre><code>True
False
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: سودوكو: فحص العمود</strong></p>
<p>اكتب دالة اسمها <code>column_correct(sudoku: list, column_no: int)</code>، تأخذ مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو، وعددًا صحيحًا يشير إلى عمود واحد، كوسيطين لها. وتُفهرَس الأعمدة من 0.</p>
</blockquote>
<p>ينبغي أن تُرجع الدالة <code>True</code> أو <code>False</code>، بحسب ما إذا كان العمود معبَّأ بشكل صحيح، أي ما إذا كان يحتوي على كل الأعداد من 1 إلى 9 مرة واحدة على الأكثر.</p>
<pre><code class="language-python">sudoku = [
  [<span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>]
]

<span class="hljs-built_in">print</span>(column_correct(sudoku, <span class="hljs-number">0</span>))
<span class="hljs-built_in">print</span>(column_correct(sudoku, <span class="hljs-number">1</span>))
</code></pre>
<pre><code>False
True
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: سودوكو: فحص الكتلة</strong></p>
<p>اكتب دالة اسمها <code>block_correct(sudoku: list, row_no: int, column_no: int)</code>، تأخذ مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو، وعددين صحيحين يشيران إلى فهرسي الصف والعمود لمربع واحد، كوسيطين لها. وتُفهرَس الصفوف والأعمدة من 0.</p>
</blockquote>
<p>ينبغي أن تُرجع الدالة <code>True</code> أو <code>False</code> بحسب ما إذا كانت الكتلة 3 في 3 الواقعة إلى اليمين وإلى أسفل الفهارس المعطاة معبَّأة بشكل صحيح. أي ما إذا كانت الكتلة تحتوي على كل الأعداد من 1 إلى 9 مرة واحدة على الأكثر.</p>
<p>لاحظ أن هذه الدالة لا تتبع قواعد سودوكو بدقة. ففي لعبة سودوكو الحقيقية توجد فقط 9 كتل لفحصها، وتقع عند الفهارس (0, 0) و(0, 3) و(0, 6) و(3, 0) و(3, 3) و(3, 6) و(6, 0) و(6, 3) و(6, 6). ولا ينبغي تنفيذ قيود من هذا النوع على الفهارس هنا.</p>
<pre><code class="language-python">sudoku = [
  [<span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>]
]

<span class="hljs-built_in">print</span>(block_correct(sudoku, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
<span class="hljs-built_in">print</span>(block_correct(sudoku, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>))
</code></pre>
<pre><code>False
True
</code></pre>
<p>ينبغي أن يفحص استدعاء الدالة الأول الكتلة 3 في 3 التي تبدأ بالمربع ذي الفهرسين <code>0, 0</code>:</p>
<pre>
9 0 0
2 0 0
0 2 0
</pre>
<p>ينبغي أن يفحص استدعاء الدالة الثاني الكتلة 3 في 3 التي تبدأ بالمربع في الصف 1 والعمود 2:</p>
<pre>
0 2 5
0 3 0
4 0 0
</pre>
<p>لن تكون هذه الكتلة الثانية مفحوصة في لعبة سودوكو حقيقية، لكن دالتك ينبغي أن تسمح بفحصها.</p>
<blockquote>
<p><strong>تمرين برمجي: سودوكو: فحص الشبكة</strong></p>
<p>اكتب دالة اسمها <code>sudoku_grid_correct(sudoku: list)</code>، تأخذ مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو كوسيط لها. وينبغي أن تستخدم الدالة دوال التمارين الثلاثة السابقة لتحديد ما إذا كانت شبكة سودوكو كاملة معبَّأة بشكل صحيح. وانسخ دوال التمارين أعلاه إلى ملف شيفرة Python الخاص بهذا التمرين.</p>
</blockquote>
<p>ينبغي أن تفحص الدالة كلًّا من الصفوف التسعة والأعمدة التسعة والكتل 3 في 3 في الشبكة. فإذا كانت جميعها تحتوي على كل الأعداد من 1 إلى 9 مرة واحدة على الأكثر، تُرجع الدالة <code>True</code>. وإذا كانت واحدة منها معبَّأة بشكل خاطئ، تُرجع الدالة <code>False</code>.</p>
<p>في صورة شبكة سودوكو الموجودة أعلى هذه التمارين، تظهر الكتل التسع داخل الشبكة بحدود أكثر سماكة. وهذه هي الكتل التي ينبغي أن تفحصها الدالة، وتبدأ عند الفهارس (0, 0) و(0, 3) و(0, 6) و(3, 0) و(3, 3) و(3, 6) و(6, 0) و(6, 3) و(6, 6).</p>
<pre><code class="language-python">sudoku1 = [
  [<span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">2</span>, <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>]
]

<span class="hljs-built_in">print</span>(sudoku_grid_correct(sudoku1))

sudoku2 = [
  [<span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>],
  [<span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>],
  [<span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">8</span>],
  [<span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>],
  [<span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>],
  [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>],
  [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>],
  [<span class="hljs-number">7</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>]
]

<span class="hljs-built_in">print</span>(sudoku_grid_correct(sudoku2))
</code></pre>
<pre><code>False
True
</code></pre>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: ccb6dcbf-1065-513f-9294-15f42a318300)

-->
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:r};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,r as html,p as slug,l as title};
