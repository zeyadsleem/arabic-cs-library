const s="mooc",n="part-5",a="الجزء 5: هياكل البيانات",p="2-references",l="المراجع",e=[{depth:2,id:"مراجع-متعددة-إلى-القائمة-نفسها",text:"مراجع متعدّدة إلى القائمة نفسها"},{depth:2,id:"نسخ-قائمة",text:"نسخ قائمة"},{depth:2,id:"استخدام-القوائم-كمعاملات-في-الدوال",text:"استخدام القوائم كمعاملات في الدوال"},{depth:2,id:"تعديل-قائمة-معطاة-كوسيط",text:"تعديل قائمة مُعطاة كوسيط"},{depth:2,id:"الآثار-الجانبية-للدوال",text:"الآثار الجانبية للدوال"}],c=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف المقصود بالمرجع إلى متغيّر</li>
<li>ستفهم أنه يمكن أن تتعدّد المراجع إلى الكائن نفسه</li>
<li>ستكون قادرًا على استخدام القوائم كمعاملات في الدوال</li>
<li>ستعرف المقصود بالأثر الجانبي للدالة</li>
</ul>
</blockquote>
<p>إلى الآن كنا نتخيّل المتغيّر نوعًا من «الصندوق» الذي يحتوي قيمة المتغيّر. وتقنيًّا هذا غير صحيح في Python. فما يُخزَّن في المتغيّر ليس القيمة بحد ذاتها، بل <em>مرجع</em> إلى <em>الكائن</em> الذي يمثّل القيمة الفعلية للمتغيّر. ويمكن أن يكون الكائن رقمًا أو سلسلة نصية أو قائمة مثلًا.</p>
<p>وفي الممارسة العملية يعني هذا أن قيمة المتغيّر <em>لا تُخزَّن</em> في المتغيّر نفسه. بل توجد معلومات عن الموضع في ذاكرة الحاسوب الذي يمكن العثور فيه على القيمة.</p>
<p>ويُمثَّل المرجع غالبًا بسهم يمتدّ من المتغيّر إلى القيمة الفعلية في الذاكرة:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_1.png" alt="5_2_1.png"></p>
<p>إذًا، يخبرنا المرجع أين يمكن العثور على القيمة. ويمكن استخدام الدالة <code>id</code> لمعرفة الموضع الدقيق الذي يشير إليه المتغيّر:</p>
<pre><code class="language-python">a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">id</span>(a))
b = <span class="hljs-string">&quot;This is a reference, too&quot;</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">id</span>(b))
</code></pre>
<pre><code>4538357072
4537788912
</code></pre>
<p>المرجع، أو معرّف المتغيّر (ID)، هو عدد صحيح يمكن التخيّل أنه العنوان في ذاكرة الحاسوب حيث تُخزَّن قيمة المتغيّر. وإذا نفّذت الشيفرة أعلاه على حاسوبك، فغالبًا ستكون النتيجة مختلفة، لأن متغيّراتك ستشير إلى مواضع مختلفة - أي أن المراجع ستكون مختلفة.</p>
<p>وكما رأينا في <a href="/arabic-cs-library/book/mooc/part-5/1-more-lists#visualising-code-containing-lists-within-lists">القسم السابق</a>، تُظهر أداة التصوير المرئي في Python Tutor المراجع أيضًا كسهم من المتغيّر إلى المحتوى الفعلي. غير أن الأداة «تغشّ» قليلًا حين يتعلق الأمر بالسلاسل النصية، فتعرض السلاسل النصية وكأنها مخزّنة في المتغيّرات نفسها:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_2.png" alt="5_2_2.png"></p>
<p>في الواقع، تُعالَج السلاسل النصية في Python معالجة شبه مماثلة للقوائم، مع مراجع إلى مواضع في الذاكرة.</p>
<p>كثير من الأنواع المدمجة في Python، مثل <code>str</code>، <em>غير قابلة للتغيير</em> (immutable). أي أن قيمة الكائن، أو أي جزء منها، لا يمكن أن تتغيّر. غير أنه يمكن استبدال القيمة بقيمة جديدة:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_3.png" alt="5_2_3.png"></p>
<p>وبعض أنواع Python <em>قابلة للتغيير</em> (mutable). فمثلًا، يمكن أن تتغيّر محتويات قائمة دون الحاجة إلى إنشاء قائمة جديدة بأكملها:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_4.png" alt="5_2_4.png"></p>
<p>قد يُدهشك أن أنواع البيانات الأساسية <code>int</code> و<code>float</code> و<code>bool</code> غير قابلة للتغيير في Python أيضًا. فلننظر إلى الشيفرة التالية:</p>
<pre><code class="language-python">number = <span class="hljs-number">1</span>
number = <span class="hljs-number">2</span>
number += <span class="hljs-number">10</span>
</code></pre>
<p>يبدو أن الأوامر أعلاه لا تغيّر سوى القيمة المخزّنة في المتغيّر، لكنها في الحقيقة تنشئ عددًا جديدًا كليًّا في ذاكرة الحاسوب في كل مرة.</p>
<p>وتوضّح مخرجات البرنامج التالي هذا الوضع:</p>
<pre><code class="language-python">number = <span class="hljs-number">1</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">id</span>(number))
number += <span class="hljs-number">10</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">id</span>(number))
a = <span class="hljs-number">1</span>
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">id</span>(a))
</code></pre>
<pre><code>4535856912
4535856944
4535856912
</code></pre>
<p>في البداية، يشير المتغيّر <code>number</code> إلى موضع الذاكرة 4535856912. وحين تُسنَد إلى <code>number</code> قيمة جديدة، يشير إلى الموضع 4535856944. والآن، حين تُسنَد إلى المتغيّر <code>a</code> القيمة 1، يشير <code>a</code> إلى الموضع نفسه تمامًا الذي كان يشير إليه <code>number</code> حين أُسندت إليه القيمة 1 أيضًا.</p>
<p>يبدو أن Python قد خزّنت القيمة 1 في موضع الذاكرة 4535856912. فكلما أُسندت إلى متغيّر القيمة 1، فإن المتغيّر <em>يشير</em> إلى ذلك الموضع في ذاكرة الحاسوب.</p>
<p>ومن الجيد أن نضع في اعتبارنا أن <em>كل شيء تقريبًا مرجع</em> في Python، لكن كل هذا نادرًا ما يكون ذا صلة بمهام البرمجة اليومية. فلنعد إلى أمثلة أكثر عملية.</p>
<h2 id="مراجع-متعددة-إلى-القائمة-نفسها">مراجع متعدّدة إلى القائمة نفسها</h2>
<p>ما الذي يحدث فعلًا حين تُسنِد متغيّر قائمة إلى متغيّر جديد - هل تُنسخ القائمة؟</p>
<pre><code class="language-python">a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
b = a
b[<span class="hljs-number">0</span>] = <span class="hljs-number">10</span>
</code></pre>
<p>ينسخ الإسناد <code>b = a</code> القيمة المخزّنة في المتغيّر <code>a</code> إلى المتغيّر <code>b</code>. غير أن القيمة المخزّنة في <code>a</code> ليست القائمة <em>بنفسها</em>، بل <em>مرجعًا</em> إلى القائمة.</p>
<p>إذًا، ينسخ الإسناد <code>b = a</code> المرجع. ونتيجة لذلك يوجد الآن مرجعان إلى موضع الذاكرة نفسه الذي يحتوي القائمة.</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_5.png" alt="5_2_5.png"></p>
<p>يمكن الوصول إلى القائمة عبر أيٍّ من المرجعين الاثنين:</p>
<pre><code class="language-python">list1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
list2 = list1

list1[<span class="hljs-number">0</span>] = <span class="hljs-number">10</span>
list2[<span class="hljs-number">1</span>] = <span class="hljs-number">20</span>

<span class="hljs-built_in">print</span>(list1)
<span class="hljs-built_in">print</span>(list2)
</code></pre>
<pre><code>[10, 20, 3, 4]
[10, 20, 3, 4]
</code></pre>
<p>إذا وُجد أكثر من مرجع إلى القائمة نفسها، فقد يُستخدم أيٌّ منها للوصول إلى القائمة. وفي المقابل، يؤثّر التغيير المُجرى عبر أيّ من المراجع في المراجع الأخرى أيضًا، لأن وجهتها واحدة.</p>
<p>وأداة التصوير المرئي مفيدة جدًا مرة أخرى في معرفة ما يحدث:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_6.png" alt="5_2_6.png"></p>
<h2 id="نسخ-قائمة">نسخ قائمة</h2>
<p>إن أردت إنشاء نسخة منفصلة فعلًا من قائمة، فيمكنك إنشاء قائمة جديدة وإضافة كل عنصر من القائمة الأصلية إليها بالتناوب:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>]

new_list = []
<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
    new_list.append(item)

new_list[<span class="hljs-number">0</span>] = <span class="hljs-number">10</span>
new_list.append(<span class="hljs-number">6</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;the original:&quot;</span>, my_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;the copy:&quot;</span>, new_list)
</code></pre>
<pre><code>my_list [1, 2, 3, 3, 5]
new_list [10, 2, 3, 3, 5, 6]
</code></pre>
<p>لقطة من عملية النسخ في أداة التصوير المرئي:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_7.png" alt="5_2_7.png"></p>
<p>يشير المتغيّر <code>new_list</code> إلى قائمة مختلفة عن تلك التي يشير إليها المتغيّر <code>my_list</code>.</p>
<p>وطريقة أسهل لنسخ قائمة هي مشغّل الأقواس <code>[]</code> الذي استخدمناه سابقًا في التقطيعات. وتُحدّد الصيغة <code>[:]</code> جميع عناصر التجمُّع. وكأثر جانبي، تنشئ الصيغة نسخة من القائمة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
new_list = my_list[:]

my_list[<span class="hljs-number">0</span>] = <span class="hljs-number">10</span>
new_list[<span class="hljs-number">1</span>] = <span class="hljs-number">20</span>

<span class="hljs-built_in">print</span>(my_list)
<span class="hljs-built_in">print</span>(new_list)
</code></pre>
<pre><code>[10, 2, 3, 4]
[1, 20, 3, 4]
</code></pre>
<h2 id="استخدام-القوائم-كمعاملات-في-الدوال">استخدام القوائم كمعاملات في الدوال <span class="content-anchor" id="using-lists-as-parameters-in-functions"></span></h2>
<p>حين تمرّر قائمة كوسيط إلى دالة، فأنت تمرّر مرجعًا إلى تلك القائمة. وهذا يعني أن الدالة يمكنها تعديل القائمة مباشرة.</p>
<p>تأخذ الدالة التالية قائمة كوسيط لها، وتضيف عنصرًا جديدًا إلى نهاية القائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">add_item</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    new_item = <span class="hljs-number">10</span>
    my_list.append(new_item)

a_list = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-built_in">print</span>(a_list)
add_item(a_list)
<span class="hljs-built_in">print</span>(a_list)
</code></pre>
<pre><code>[1, 2, 3]
[1, 2, 3, 10]
</code></pre>
<p>لاحظ أن الدالة <code>add_item</code> ليس لها قيمة معادة. إنها تغيّر القائمة التي تأخذها كوسيط فقط.</p>
<p>قد تساعدك أداة التصوير المرئي على فهم ما يحدث هنا:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_8.png" alt="5_2_8.png"></p>
<p>يُشير <em>الإطار العام</em> (Global frame) إلى المتغيّرات المعرَّفة في الدالة الرئيسية، بينما يمثّل <em>الإطار add_item</em> ذو الخلفية الزرقاء المعاملات والمتغيّرات داخل تلك الدالة. وكما يبيّن التصوير المرئي، تشير الدالة <code>add_item</code> إلى القائمة نفسها تمامًا التي تشير إليها الدالة الرئيسية. والتغييرات المُجراة داخل الدالة <code>add_item</code> تؤثّر في الدالة الرئيسية أيضًا.</p>
<p>طريقة أخرى لتنفيذ هذه الوظيفة هي إنشاء قائمة جديدة داخل الدالة، ثم إعادتها:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">add_item</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    new_item = <span class="hljs-number">10</span>
    my_list_copy = my_list[:]
    my_list_copy.append(new_item)
    <span class="hljs-keyword">return</span> my_list_copy

numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
numbers2 = add_item(numbers)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;original list:&quot;</span>, numbers)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;new list:&quot;</span>, numbers2)
</code></pre>
<pre><code>original list: [1, 2, 3]
new list: [1, 2, 3, 10]
</code></pre>
<p>إن لم تكن متأكّدًا تمامًا من أنك تفهم ما يحدث في الشيفرة أعلاه، فيُرجى تتبّعها في أداة التصوير المرئي.</p>
<h2 id="تعديل-قائمة-معطاة-كوسيط">تعديل قائمة مُعطاة كوسيط</h2>
<p>فيما يلي محاولة لدالة يُفترض أن تزيد كل عنصر في قائمة بمقدار عشرة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">augment_all</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    new_list = []
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
        new_list.append(item + <span class="hljs-number">10</span>)
    my_list = new_list

numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;in the beginning:&quot;</span>, numbers)
augment_all(numbers)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;after the function is executed:&quot;</span>, numbers)
</code></pre>
<pre><code>in the beginning: [1, 2, 3]
after the function is executed: [1, 2, 3]
</code></pre>
<p>لسبب ما لا تعمل الدالة، فما الذي يحدث؟</p>
<p>تأخذ الدالة <em>مرجعًا</em> إلى قائمة كوسيط، ويُخزَّن هذا المرجع في المتغيّر <code>my_list</code>. وينسب الإسناد <code>my_list = new_list</code> قيمة جديدة إلى ذلك المتغيّر نفسه. ويصبح المتغيّر <code>my_list</code> الآن مشيرًا إلى القائمة الجديدة التي أُنشئت داخل الدالة، ولم يعد المرجع إلى القائمة الأصلية متاحًا داخل الدالة. غير أن هذا الإسناد لا تأثير له خارج الدالة.</p>
<!---

تُوضّح سلسلة الصور التالية حالات المتغيّرات في مراحل مختلفة أثناء تنفيذ الدالة:

<img src="/arabic-cs-library/images/mooc/part-5/5_2_9.png" width="400">

-->
<p>وإضافةً إلى ذلك، لا يمكن الوصول من خارج الدالة إلى المتغيّر <code>new_list</code> الذي يحتوي القيم الجديدة المزيدة. فهو «يضيع» حين ينتهي تنفيذ الدالة ويعود التركيز إلى الدالة الرئيسية. بينما يشير المتغيّر <code>numbers</code> في الدالة الرئيسية دائمًا إلى القائمة الأصلية.</p>
<p>وأداة التصوير المرئي هي صديقك هنا أيضًا. فيُرجى تتبّع المراحل بعناية، ومشاهدة كيف لا تتأثر القائمة الأصلية بتنفيذ الدالة إطلاقًا:</p>
<p><img src="/arabic-cs-library/images/mooc/part-5/5_2_10.png" alt="5_2_10.png"></p>
<p>إحدى طرق إصلاح ذلك هي نسخ جميع العناصر من القائمة الجديدة إلى القائمة القديمة واحدًا واحدًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">augment_all</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    new_list = []
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
        new_list.append(item + <span class="hljs-number">10</span>)

    <span class="hljs-comment"># copy items from the new list into the old list</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(my_list)):
        my_list[i] = new_list[i]
</code></pre>
<p>لدى Python أيضًا اختصار أنيق لإسناد عدة عناصر في تجمُّع دفعة واحدة:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>my_list[<span class="hljs-number">1</span>:<span class="hljs-number">3</span>] = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>my_list
[<span class="hljs-number">1</span>, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">4</span>]
</code></pre>
<p>في المثال أعلاه تُسنَد قيم من تجمُّع آخر إلى شريحة من القائمة.</p>
<p>وكما نعلم، يمكن أن تشمل الشريحة التجمُّع كله:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>my_list[:] = [<span class="hljs-number">100</span>, <span class="hljs-number">99</span>, <span class="hljs-number">98</span>, <span class="hljs-number">97</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>my_list
[<span class="hljs-number">100</span>, <span class="hljs-number">99</span>, <span class="hljs-number">98</span>, <span class="hljs-number">97</span>]
</code></pre>
<p>تُستبدل محتويات القائمة القديمة بأكملها. واستنادًا إلى ذلك، قد تبدو نسخة عاملة من دالة الزيادة هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">augment_all</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    new_list = []
    <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
        new_list.append(item + <span class="hljs-number">10</span>)

    my_list[:] = new_list
</code></pre>
<p>في الواقع، لا حاجة على الإطلاق إلى إنشاء قائمة جديدة داخل الدالة. يمكننا أن نُسنِد القيم الجديدة مباشرةً إلى القائمة الأصلية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">augment_all</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(my_list)):
        my_list[i] += <span class="hljs-number">10</span>

</code></pre>
<blockquote>
<p><strong>تمرين برمجي: العناصر مضروبة في اثنين</strong></p>
<p>يُرجى كتابة دالة اسمها <code>double_items(numbers: list)</code>، تأخذ قائمة من الأعداد الصحيحة كوسيط لها.</p>
</blockquote>
<p>ينبغي أن تُرجع الدالة قائمة جديدة تحوي جميع قيم القائمة الأصلية مضاعفة. ولا ينبغي للدالة أن <em>تغيّر</em> القائمة الأصلية.</p>
<p>مثال على عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">11</span>, -<span class="hljs-number">4</span>]
    numbers_doubled = double_items(numbers)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;original:&quot;</span>, numbers)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;doubled:&quot;</span>, numbers_doubled)
</code></pre>
<pre><code>original: [2, 4, 5, 3, 11, -4]
doubled: [4, 8, 10, 6, 22, -8]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: إزالة الأصغر</strong></p>
<p>يُرجى كتابة دالة اسمها <code>remove_smallest(numbers: list)</code>، تأخذ قائمة من الأعداد الصحيحة كوسيط لها.</p>
</blockquote>
<p>ينبغي للدالة أن تجد أصغر عنصر في القائمة وتزيله. ويمكنك افتراض أن في القائمة عنصرًا واحدًا هو الأصغر.</p>
<p>لا ينبغي أن تكون للدالة قيمة معادة - بل ينبغي أن تُعدّل القائمة مباشرةً التي تتلقّاها كمعامل.</p>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    numbers = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>]
    remove_smallest(numbers)
    <span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>[2, 4, 6, 3, 5]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: سودوكو: طبع الشبكة وإضافة رقم</strong></p>
<p>في هذا التمرين سنُكمل دالتين أخريين لمشروع سودوكو من القسم السابق: <code>print_sudoku</code> و<code>add_number</code>.</p>
</blockquote>
<p>تأخذ الدالة <code>print_sudoku(sudoku: list)</code> مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو كوسيط لها. وينبغي أن تطبع الدالة الشبكة بالصيغة المحدَّدة في الأمثلة أدناه.</p>
<p>تأخذ الدالة <code>add_number(sudoku: list, row_no: int, column_no: int, number:int)</code> كوسيطات لها مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو، وعدين صحيحين يشيران إلى فهرسي الصف والعمود لمربع واحد، ورقمًا واحدًا بين 1 و9. وينبغي أن تضيف الدالة الرقم إلى الموضع المحدَّد في الشبكة.</p>
<pre><code class="language-python">sudoku  = [
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>]
]

print_sudoku(sudoku)
add_number(sudoku, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
add_number(sudoku, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">7</span>)
add_number(sudoku, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Three numbers added:&quot;</span>)
<span class="hljs-built_in">print</span>()
print_sudoku(sudoku)
</code></pre>
<pre><code>_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

Three numbers added:

2 _ _  _ _ _  _ _ _
_ _ 7  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ 3 _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
</code></pre>
<p><strong>تلميح</strong></p>
<p>تذكّر أنه من الممكن استدعاء الدالة <code>print</code> دون إحداث تغيير في السطر:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;characters &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;without carriage returns&quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
</code></pre>
<pre><code>characters without carriage returns
</code></pre>
<p>في بعض الأحيان تحتاج سطرًا جديدًا فقط، وهو ما تُحققه جملة <code>print</code> الخالية من أي وسيط:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>()
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: سودوكو: إضافة رقم إلى نسخة من الشبكة</strong></p>
<p>هذه هي مهمة سودوكو الأخيرة تمامًا. وهذه المرة سننشئ نسخة مختلفة قليلًا من دالة إضافة أرقام جديدة إلى الشبكة.</p>
</blockquote>
<p>تأخذ الدالة <code>copy_and_add(sudoku: list, row_no: int, column_no: int, number: int)</code> كوسيطات لها مصفوفة ثنائية الأبعاد تمثّل شبكة سودوكو، وعدين صحيحين يشيران إلى فهرسي الصف والعمود لمربع واحد، ورقمًا واحدًا بين 1 و9. وينبغي أن تُعيد الدالة نسخة من الشبكة الأصلية أُضيف إليها الرقم الجديد في الموضع الصحيح. ولا ينبغي للدالة أن <em>تغيّر</em> الشبكة الأصلية المُستلمة كمعامل.</p>
<p>قد تكون الدالة <code>print_sudoku</code> من التمرين السابق مفيدة للاختبار، وهي مستخدَمة في المثال أدناه:</p>
<pre><code class="language-python">sudoku  = [
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
    [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>]
]

grid_copy = copy_and_add(sudoku, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Original:&quot;</span>)
print_sudoku(sudoku)
<span class="hljs-built_in">print</span>()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Copy:&quot;</span>)
print_sudoku(grid_copy)
</code></pre>
<pre><code>Original:
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

Copy:
2 _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _

_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
_ _ _  _ _ _  _ _ _
</code></pre>
<p><strong>تلميح</strong>
حين تتعامل مع قوائم متداخلة، كُن حريصًا للغاية عند النسخ. فما الذي يجب نسخه صراحةً، وأين يكون للتغييرات تأثير فعلي؟ و<a href="http://www.pythontutor.com/visualize.html#mode=edit">أداة التصوير المرئي</a> مساعدة كبيرة هنا أيضًا، وإن كان حجم شبكة سودوكو يجعل العرض أقلّ انتظامًا من المعتاد.</p>
<blockquote>
<p><strong>تمرين برمجي: تيك تاك تو</strong></p>
<p>تُلعب لعبة إكس-أو على شبكة 3 في 3، بلاعبين يتناوبان على إدخال الأصفار وعلامات X. فإذا تمكّن أيّ من اللاعبين من وضع ثلاثة من رموزه في أي صف أو عمود أو قطر، فقد فاز. وإذا لم يتمكّن أيّ منهما من ذلك، كانت النتيجة تعادلًا.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>play_turn(game_board: list, x: int, y: int, piece: str)</code>، تضع الرمز المحدَّد عند الإحداثيات المحدَّدة على اللوحة. وقيم الإحداثيات على اللوحة بين 0 و2.</p>
<p><strong>ملاحظة:</strong> عند مقارنة هذا بما تقدّم من تمارين سودوكو، فإن الوسائط التي تأخذها الدالة معكوسة هنا. فالعمود <code>x</code> يأتي أولًا، والصف <code>y</code> ثانيًا.</p>
<p>تتكوّن اللوحة من السلاسل النصية التالية:</p>
<ul>
<li><code>&quot;&quot;</code>: مربع فارغ</li>
<li><code>&quot;X&quot;</code>: رمز اللاعب 1</li>
<li><code>&quot;O&quot;</code>: رمز اللاعب 2</li>
</ul>
<p>ينبغي أن تُرجع الدالة <code>True</code> إذا كان المربع فارغًا ووُضِع الرمز على لوحة اللعب بنجاح. وينبغي أن تُرجع الدالة <code>False</code> إذا كان المربع محتلًّا، أو إذا لم تكن الإحداثيات صالحة.</p>
<p>مثال على تنفيذ الدالة:</p>
<pre><code class="language-python">game_board = [[<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>], [<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>], [<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>]]
<span class="hljs-built_in">print</span>(play_turn(game_board, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-string">&quot;X&quot;</span>))
<span class="hljs-built_in">print</span>(game_board)
</code></pre>
<pre><code>True
[['', '', 'X'], ['', '', ''], ['', '', '']]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: نقل المصفوفة</strong></p>
<p>يُرجى كتابة دالة اسمها <code>transpose(matrix: list)</code>، تأخذ مصفوفة ثنائية الأبعاد من الأعداد الصحيحة، أي ما يُسمّى مصفوفة، كوسيط لها. وينبغي أن تُجري الدالة <em>النقل</em> على المصفوفة. والنقل يعني في جوهره قلب المصفوفة على قطرها: تصبح الأعمدة صفوفًا، وتصبح الصفوف أعمدة.</p>
</blockquote>
<p>يمكنك افتراض أن المصفوفة مصفوفة مربعة، لذا سيكون عدد صفوفها مساويًا لعدد أعمدتها.</p>
<p>المصفوفة التالية</p>
<pre><code class="language-python"><span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span>
<span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span>
<span class="hljs-number">7</span> <span class="hljs-number">8</span> <span class="hljs-number">9</span>
</code></pre>
<p>تبدو بعد نقلها هكذا:</p>
<pre><code class="language-python"><span class="hljs-number">1</span> <span class="hljs-number">4</span> <span class="hljs-number">7</span>
<span class="hljs-number">2</span> <span class="hljs-number">5</span> <span class="hljs-number">8</span>
<span class="hljs-number">3</span> <span class="hljs-number">6</span> <span class="hljs-number">9</span>
</code></pre>
<p>لا ينبغي أن تكون للدالة قيمة معادة. بل يجب تعديل المصفوفة مباشرةً عبر المرجع.</p>
<h2 id="الآثار-الجانبية-للدوال">الآثار الجانبية للدوال</h2>
<p>إذا أخذت دالة مرجعًا إلى قائمة كوسيط، فقد تستطيع تعديل تلك القائمة. وإذا لم يكن المبرمج يقصد التعديلات المباشرة، فقد يسبّب تعديل القائمة المُستلمة كمعامل عن طريق الخطأ مشكلات في مواضع أخرى من البرنامج.</p>
<p>لننظر إلى دالة يُفترض أنها تجد ثاني أصغر عنصر في قائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">second_smallest</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">int</span>:
    <span class="hljs-comment"># in an ordered list, the second smallest item is at index 1</span>
    my_list.sort()
    <span class="hljs-keyword">return</span> my_list[<span class="hljs-number">1</span>]

numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>]
<span class="hljs-built_in">print</span>(second_smallest(numbers))
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>2
[1, 2, 3, 4, 4, 5, 6, 7]
</code></pre>
<p>تجد الدالة ثاني أصغر عنصر بشكل موثوق، لكنها إضافةً إلى ذلك تُرتّب القائمة في مكانها، فتُغيّر ترتيب العناصر. وإذا كان الترتيب ذا أهمية في مواضع أخرى من البرنامج، فقد يسبّب استدعاء الدالة أخطاء. وتُسمّى التعديلات غير المقصودة على كائن يُوصَل إليه عبر مرجع <em>أثرًا جانبيًا</em> (side effect) للدالة.</p>
<p>يمكننا تجنّب الأثر الجانبي بإجراء تغيير صغير في الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">second_smallest</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">int</span>:
    list_copy = <span class="hljs-built_in">sorted</span>(my_list)
    <span class="hljs-keyword">return</span> list_copy[<span class="hljs-number">1</span>]

numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>]
<span class="hljs-built_in">print</span>(second_smallest(numbers))
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>2
[1, 4, 2, 5, 3, 6, 4, 7]
</code></pre>
<p>تُعيد الدالة <code>sorted</code> نسخة جديدة مرتّبة من القائمة، لذا لم يعد البحث عن ثاني أصغر عنصر يعبث بترتيب القائمة الأصلية.</p>
<p>ويُعتبر تجنّب إحداث آثار جانبية بالدوال ممارسة برمجية جيدة على نحو عام. فالآثار الجانبية قد تجعل التحقق من أن البرنامج يعمل كما هو مقصود في جميع الظروف أصعب.</p>
<p>وتُسمّى الدوال الخالية من الآثار الجانبية أيضًا <em>دوال نقية</em> (pure functions). ولا سيّما عند الالتزام بأسلوب البرمجة الدالية، فهذا مَثَل أعلى شائع يُستحسن اتّباعه. وسنستعرض هذا الموضوع بمزيد من التفصيل في <em>الدورة المتقدمة في البرمجة</em>، وهي الدورة التي تلي هذه.</p>
<!---

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: b254a4f9-09bb-55c8-87c0-538f91e51ace)

-->
`,r={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:c};export{s as book,n as chapter,a as chapterTitle,r as default,e as headings,c as html,p as slug,l as title};
