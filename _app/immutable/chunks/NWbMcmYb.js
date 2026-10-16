const s="mooc",n="part-4",a="الجزء 4: الدوال والقوائم",e="3-lists",p="القوائم",l=[{depth:2,id:"الوصول-إلى-عناصر-القائمة",text:"الوصول إلى عناصر القائمة"},{depth:2,id:"إضافة-العناصر-إلى-القائمة",text:"إضافة العناصر إلى القائمة"},{depth:2,id:"الإضافة-إلى-موضع-محدد",text:"الإضافة إلى موضع محدَّد"},{depth:2,id:"إزالة-العناصر-من-القائمة",text:"إزالة العناصر من القائمة"},{depth:2,id:"ترتيب-القوائم",text:"ترتيب القوائم"},{depth:2,id:"الأقصى-والأصغر-والمجموع",text:"الأقصى والأصغر والمجموع"},{depth:2,id:"التابعون-مقابل-الدوال",text:"التابعون مقابل الدوال"},{depth:2,id:"قائمة-كوسيط-أو-كقيمة-معادة",text:"قائمة كوسيط أو كقيمة معادة"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف ما هي القوائم في Python</li>
<li>ستكون قادرًا على الوصول إلى عنصر محدَّد داخل قائمة</li>
<li>ستعرف كيف تُضاف العناصر إلى قائمة، وكيف تُزال منها</li>
<li>ستكون على دراية بالدوال والتابعين المدمجين في القوائم</li>
</ul>
</blockquote>
<p>في برامجنا حتى الآن كنّا نخزّن البيانات بالمتغيّرات، وكان لكل قطعة من البيانات عادةً متغيّر خاص بها يحمل اسمًا. ويرتب على ذلك بطبيعة الحال بعض القيود، إذ قد يصبح تعريف متغيّرات منفصلة لكل شيء عبئًا حين تتراكم البيانات المراد معالجتها.</p>
<p>القائمة (list) في Python تجمُّع من القيم يمكن الوصول إليه عبر اسم متغيّر واحد. وتُكتب محتويات القائمة بين قوسين مربّعين. وتُسمّى القيم الموجودة في القائمة <em>عناصر</em> (items)، وأحيانًا <em>مكوّنات</em> (elements).</p>
<p>الأمر التالي ينشئ قائمة جديدة فارغة</p>
<pre><code class="language-python">my_list = []
</code></pre>
<p>بينما الأمر التالي ينشئ قائمة تحتوي على خمسة عناصر:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]
</code></pre>
<h2 id="الوصول-إلى-عناصر-القائمة">الوصول إلى عناصر القائمة</h2>
<p>تُرقَّم عناصر القائمة بالطريقة تمامًا نفسها التي تُرقَّم بها محارف السلسلة النصية. ويبدأ الترقيم من الصفر، ويكون آخر فهرس هو طول القائمة ناقص واحدًا:</p>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_3_1.png" alt="تُرقَّم القوائم بدءًا من 0"></p>
<p>ويمكن الوصول إلى عنصر واحد في القائمة بالطريقة نفسها التي تصل بها إلى محرف واحد في السلسلة النصية، باستخدام الأقواس المربّعة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]

<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(my_list[<span class="hljs-number">3</span>])

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The sum of the first two items:&quot;</span>, my_list[<span class="hljs-number">0</span>] + my_list[<span class="hljs-number">1</span>])
</code></pre>
<pre><code>7
2
5
The sum of the first two items: 9
</code></pre>
<p>يمكن أيضًا طباعة محتويات القائمة كاملة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>[7, 2, 2, 5, 2]
</code></pre>
<p>على عكس السلاسل النصية، فالقوائم قابلة للتغيير (mutable)، أي أن محتوياتها يمكن أن تتغيّر. ويمكنك إسناد قيمة جديدة إلى عنصر داخل القائمة، تمامًا كما تسند قيمة جديدة إلى متغيّر:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]
<span class="hljs-built_in">print</span>(my_list)
my_list[<span class="hljs-number">1</span>] = <span class="hljs-number">3</span>
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>[7, 2, 2, 5, 2]
[7, 3, 2, 5, 2]
</code></pre>
<p>تُعطيك الدالة <code>len</code> عدد العناصر في القائمة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">len</span>(my_list))
</code></pre>
<pre><code>5
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: تغيير قيمة عنصر</strong></p>
<p>يُرجى كتابة برنامج يُهيّئ قائمة بالقيم <code>[1, 2, 3, 4, 5]</code>. ثم يسأل البرنامج المستخدم عن فهرس وعن قيمة جديدة، ويستبدل القيمة الموجودة عند الفهرس المحدَّد، ثم يطبع القائمة مرة أخرى. ويُكرَّر ذلك في حلقة حتى يُدخل المستخدم -1 بدلًا من الفهرس. ويمكنك افتراض أن جميع قيم الفهارس المُدخلة ستقع داخل نطاق قائمتك.</p>
</blockquote>
<p>مثال على تنفيذ البرنامج:</p>
<pre><code>Index: **0**
New value: **10**
[10, 2, 3, 4, 5]
Index: **2**
New value: **250**
[10, 2, 250, 4, 5]
Index: **4**
New value: **-45**
[10, 2, 250, 4, -45]
Index: **-1**
</code></pre>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="إضافة-العناصر-إلى-القائمة">إضافة العناصر إلى القائمة</h2>
<p>يضيف التابع <code>append</code> العناصر إلى نهاية القائمة. ويعمل هكذا:</p>
<pre><code class="language-python">numbers = []
numbers.append(<span class="hljs-number">5</span>)
numbers.append(<span class="hljs-number">10</span>)
numbers.append(<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>[5, 10, 3]
</code></pre>
<p>المثال التالي يستخدم قائمتين منفصلتين:</p>
<pre><code class="language-python">numbers = []
shoe_sizes = []

numbers.append(<span class="hljs-number">5</span>)
numbers.append(<span class="hljs-number">10</span>)
numbers.append(<span class="hljs-number">3</span>)

shoe_sizes.append(<span class="hljs-number">37</span>)
shoe_sizes.append(<span class="hljs-number">44</span>)
shoe_sizes.append(<span class="hljs-number">40</span>)
shoe_sizes.append(<span class="hljs-number">28</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Numbers:&quot;</span>)
<span class="hljs-built_in">print</span>(numbers)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Shoe sizes:&quot;</span>)
<span class="hljs-built_in">print</span>(shoe_sizes)
</code></pre>
<p>يُضاف العنصر إلى القائمة التي استُدعي عليها التابع:</p>
<pre><code>Numbers:
[5, 10, 3]
Shoe sizes:
[37, 44, 40, 28]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: إضافة عناصر إلى قائمة</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم أولًا عن عدد العناصر المطلوب إضافتها. ثم يسأل البرنامج عن العدد المحدَّد من القيم، واحدًا تلو الآخر، ويضيفها إلى قائمة بالترتيب الذي أُدخلت به. وأخيرًا تُطبع القائمة.</p>
</blockquote>
<p>مثال على السلوك المتوقّع:</p>
<pre><code>How many items: **3**
Item 1: **10**
Item 2: **250**
Item 3: **34**
[10, 250, 34]
</code></pre>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="الإضافة-إلى-موضع-محدد">الإضافة إلى موضع محدَّد</h2>
<p>إن أردت تحديد موضع في القائمة يُضاف إليه عنصر، فيمكنك استخدام التابع <code>insert</code>. يضيف التابع عنصرًا عند الفهرس المحدَّد. وتُزاح فهرسًا واحدًا إلى الخلف، أي «إلى اليمين»، جميع العناصر الموجودة أصلًا في القائمة التي يساوي فهرسها الفهرس المحدَّد أو يزيد عنه:</p>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_3_2.png" alt="إضافة عنصر إلى قائمة"></p>
<p>فقد، مثلًا، هذا البرنامج</p>
<pre><code class="language-python">numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]
numbers.insert(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(numbers)
numbers.insert(<span class="hljs-number">2</span>, <span class="hljs-number">20</span>)
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<p>يطبع ما يلي:</p>
<pre><code>[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]
</code></pre>
<h2 id="إزالة-العناصر-من-القائمة">إزالة العناصر من القائمة <span class="content-anchor" id="removing-items-from-a-list"></span></h2>
<p>هناك نهجان مختلفان لإزالة عنصر من قائمة:</p>
<ul>
<li>إذا كان <em>فهرس</em> العنصر معروفًا، فيمكنك استخدام التابع <code>pop</code>.</li>
<li>إذا كان <em>محتوى</em> العنصر معروفًا، فيمكنك استخدام التابع <code>remove</code>.</li>
</ul>
<p>إذًا، يأخذ التابع <code>pop</code> فهرس العنصر الذي تريد إزالته كوسيط له. ويزيل البرنامج التالي العنصرين الموجودين عند الفهرس 2 والفهرس 3 من القائمة. ولاحظ كيف تتغيّر فهارس العناصر المتبقية حين يُزال أحدها.</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]

my_list.pop(<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(my_list)
my_list.pop(<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>[1, 2, 4, 5, 6]
[1, 2, 4, 6]
</code></pre>
<p>من المفيد تذكّر أن التابع <code>pop</code> يُعيد أيضًا العنصر المُزال:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">7</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>]

number = my_list.pop(<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(number)
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>7
[4, 2, 2, 5]
</code></pre>
<p>أما التابع <code>remove</code> فيأخذ قيمة العنصر المراد إزالته كوسيط له. فقد، مثلًا، هذا البرنامج</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>]

my_list.remove(<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(my_list)
my_list.remove(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<p>يطبع ما يلي:</p>
<pre><code>[1, 3, 4, 5, 6]
[1, 3, 4, 6]
</code></pre>
<p>يزيل التابع <em>أول</em> ورود للقيمة في القائمة، تمامًا كما تُعيد دالة السلسلة النصية <code>find</code> أول ورود لسلسلة فرعية:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]

my_list.remove(<span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(my_list)
my_list.remove(<span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>[2, 1, 2]
[2, 2]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الإضافة والإزالة</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم الاختيار بين الإضافة والإزالة. وبحسب الاختيار، <em>يضيف البرنامج عنصرًا إلى</em> نهاية القائمة أو <em>يزيل عنصرًا منها</em>. ويجب أن يكون العنصر المضاف دائمًا أكبر بواحد من آخر عنصر في القائمة. ويجب أن يكون أول عنصر يُضاف هو 1.</p>
</blockquote>
<p>تُطبع القائمة في البداية وبعد كل عملية. وانظر إلى مثال التنفيذ أدناه:</p>
<pre><code>The list is now []
a(d)d, (r)emove or e(x)it: **d**
The list is now [1]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **r**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **x**
Bye!
</code></pre>
<p>يمكنك افتراض أنه إذا كانت القائمة فارغة فلن تتم محاولة إزالة عناصر.</p>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<p>وإذا لم يكن العنصر المحدَّد موجودًا في القائمة، فإن الدالة <code>remove</code> تُسبّب خطأً. وتمامًا كما في السلاسل النصية، يمكننا التحقق من وجود عنصر باستخدام المشغّل <code>in</code>:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>]

<span class="hljs-keyword">if</span> <span class="hljs-number">1</span> <span class="hljs-keyword">in</span> my_list:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The list contains item 1&quot;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-number">2</span> <span class="hljs-keyword">in</span> my_list:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The list contains item 2&quot;</span>)
</code></pre>
<pre><code>The list contains item 1
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الكلمة نفسها مرتين</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم كلمات. وإذا أدخل المستخدم كلمة للمرة الثانية، ينبغي للبرنامج أن يطبع عدد الكلمات المختلفة التي أُدخلت، ثم ينتهي.</p>
</blockquote>
<pre><code>Word: **once**
Word: **upon**
Word: **a**
Word: **time**
Word: **upon**
You typed in 4 different words
</code></pre>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="ترتيب-القوائم">ترتيب القوائم</h2>
<p>يمكن <em>ترتيب</em> عناصر القائمة من الأصغر إلى الأكبر باستخدام التابع <code>sort</code>.</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>]
my_list.sort()
<span class="hljs-built_in">print</span>(my_list)
</code></pre>
<pre><code>[1, 2, 2, 4, 5]
</code></pre>
<p>لاحظ كيف يُعدّل التابع القائمة نفسها. وفي بعض الأحيان لا نريد تغيير القائمة الأصلية، لذا نستخدم الدالة <code>sorted</code> بدلًا منه. وهي تُعيد قائمة مرتّبة:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-built_in">sorted</span>(my_list)))
</code></pre>
<pre><code>[1, 2, 2, 4, 5]
</code></pre>
<p>تذكّر الفرق بين الاثنين: يُغيّر <code>sort</code> ترتيب القائمة الأصلية في مكانها، بينما تنشئ <code>sorted</code> نسخة جديدة مرتّبة من القائمة. وباستخدام <code>sorted</code> يمكننا الحفاظ على الترتيب الأصلي للقائمة:</p>
<pre><code class="language-python">original = [<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>]
in_order = <span class="hljs-built_in">sorted</span>(original)
<span class="hljs-built_in">print</span>(original)
<span class="hljs-built_in">print</span>(in_order)
</code></pre>
<pre><code>[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: القائمة مرتين</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال قيم ويضيفها إلى قائمة. وبعد كل إضافة، تُطبع القائمة بطرقتين مختلفتين:</p>
</blockquote>
<ul>
<li>بالترتيب الذي أُضيفت به العناصر</li>
<li>مرتّبة من الأصغر إلى الأكبر</li>
</ul>
<p>ينتهي البرنامج حين يُدخل المستخدم 0.</p>
<p>مثال على السلوك المتوقّع:</p>
<pre><code>New item: **3**
The list now: [3]
The list in order: [3]
New item: **1**
The list now: [3, 1]
The list in order: [1, 3]
New item: **9**
The list now: [3, 1, 9]
The list in order: [1, 3, 9]
New item: **5**
The list now: [3, 1, 9, 5]
The list in order: [1, 3, 5, 9]
New item: **0**
Bye!
</code></pre>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="الأقصى-والأصغر-والمجموع">الأقصى والأصغر والمجموع</h2>
<p>تُعيد الدالتان <code>max</code> و<code>min</code>، وهما اختصار كلمتَي «الأقصى» و«الأدنى»، أكبر عنصر وأصغر عنصر في القائمة على الترتيب. أما الدالة <code>sum</code> فتُعيد مجموع جميع عناصر القائمة.</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>]

greatest = <span class="hljs-built_in">max</span>(my_list)
smallest = <span class="hljs-built_in">min</span>(my_list)
list_sum = <span class="hljs-built_in">sum</span>(my_list)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Smallest:&quot;</span>, smallest)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Greatest:&quot;</span>, greatest)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sum:&quot;</span>, list_sum)
</code></pre>
<pre><code>Smallest: 1
Greatest: 5
Sum: 15
</code></pre>
<h2 id="التابعون-مقابل-الدوال">التابعون مقابل الدوال</h2>
<p>هناك طريقتان مختلفتان لمعالجة القوائم في Python، وقد يُثير ذلك اللبس. وفي الغالب ستستخدم <em>تابعين</em> للقائمة، مثل <code>append</code> و<code>sort</code>. وتُستخدم مع مشغّل النقطة <code>.</code> على متغيّر القائمة:</p>
<pre><code class="language-python">my_list = []

<span class="hljs-comment"># method calls</span>
my_list.append(<span class="hljs-number">3</span>)
my_list.append(<span class="hljs-number">1</span>)
my_list.append(<span class="hljs-number">7</span>)
my_list.append(<span class="hljs-number">2</span>)

<span class="hljs-comment"># another method call</span>
my_list.sort()
</code></pre>
<p>بعض <em>الدوال</em> تقبل أخذ قائمة كوسيط. ورأينا في الأعلى أن الدوال <code>max</code> و<code>min</code> و<code>len</code> و<code>sorted</code> تفعل ذلك بالضبط:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1</span>]

<span class="hljs-comment"># function calls take the list as an argument</span>
greatest = <span class="hljs-built_in">max</span>(my_list)
smallest = <span class="hljs-built_in">min</span>(my_list)
length = <span class="hljs-built_in">len</span>(my_list)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Smallest:&quot;</span>, smallest)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Greatest:&quot;</span>, greatest)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Length of the list:&quot;</span>, length)

<span class="hljs-comment"># another function call </span>
<span class="hljs-comment"># the list itself is an argument, the function returns a sorted copy</span>
in_order = <span class="hljs-built_in">sorted</span>(my_list)
<span class="hljs-built_in">print</span>(in_order)
</code></pre>
<pre><code>Smallest: 1
Greatest: 7
Length of the list: 4
[1, 2, 3, 7]
</code></pre>
<h2 id="قائمة-كوسيط-أو-كقيمة-معادة">قائمة كوسيط أو كقيمة معادة <span class="content-anchor" id="a-list-as-an-argument-or-a-return-value"></span></h2>
<p>تمامًا كالدوال المدمجة أعلاه، يمكن لدوالنا الخاصة أيضًا أن تأخذ قائمة كوسيط، وأن تُنتج قائمة كقيمة معادة. وتحسب الدالة التالية القيمة المركزية في قائمة مرتّبة، وتُعرف أيضًا بقيمة <em>الوسيط</em> (median):</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">median</span>(<span class="hljs-params">my_list: <span class="hljs-built_in">list</span></span>):
    ordered = <span class="hljs-built_in">sorted</span>(my_list)
    list_centre = <span class="hljs-built_in">len</span>(ordered) // <span class="hljs-number">2</span>
    <span class="hljs-keyword">return</span> ordered[list_centre]
</code></pre>
<p>تنشئ الدالة نسخة مرتّبة من القائمة المُعطاة كوسيط، وتُرجع العنصر الموجود في وسطها تمامًا. ولاحظ استخدام مشغّل القسمة الصحيحة <code>//</code> هنا. فيجب أن يكون فهرس القائمة دائمًا عددًا صحيحًا.</p>
<p>تعمل الدالة هكذا:</p>
<pre><code class="language-python">shoe_sizes = [<span class="hljs-number">45</span>, <span class="hljs-number">44</span>, <span class="hljs-number">36</span>, <span class="hljs-number">39</span>, <span class="hljs-number">40</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The median of the shoe sizes is&quot;</span>, median(shoe_sizes))

ages = [<span class="hljs-number">1</span>, <span class="hljs-number">56</span>, <span class="hljs-number">34</span>, <span class="hljs-number">22</span>, <span class="hljs-number">5</span>, <span class="hljs-number">77</span>, <span class="hljs-number">5</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The median of the ages is&quot;</span>, median(ages))
</code></pre>
<pre><code>The median of the shoe sizes is 40
The median of the ages is 22
</code></pre>
<p>يمكن للدالة أيضًا أن تُرجع قائمة. وتسأل الدالة التالية المستخدم إدخال أعداد صحيحة، وتُرجع المُدخل كقائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">input_numbers</span>():
    numbers = []
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        user_input = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in an integer, leave empty to exit: &quot;</span>)
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(user_input) == <span class="hljs-number">0</span>:
            <span class="hljs-keyword">break</span>
        numbers.append(<span class="hljs-built_in">int</span>(user_input))
    <span class="hljs-keyword">return</span> numbers
</code></pre>
<p>تستخدم الدالة متغيّرًا مساعدًا اسمه <code>numbers</code> وهو قائمة. وتُضاف جميع الأعداد التي أدخلها المستخدم إلى القائمة. وعند الخروج من الحلقة، تُعيد الدالة القائمة بالجملة <code>return numbers</code>.</p>
<p>استدعاء الدالة هكذا</p>
<pre><code class="language-python">numbers = input_numbers()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The greatest number is&quot;</span>, <span class="hljs-built_in">max</span>(numbers))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The median of the numbers is&quot;</span>, median(numbers))
</code></pre>
<p>قد يطبع هذا، مثلًا:</p>
<pre><code>Please type in an integer, leave empty to exit: **5**
Please type in an integer, leave empty to exit: **-22**
Please type in an integer, leave empty to exit: **4**
Please type in an integer, leave empty to exit: **35**
Please type in an integer, leave empty to exit: **1**
Please type in an integer, leave empty to exit:
The greatest number is 35
The median of the numbers is 4
</code></pre>
<p>يُظهر هذا المثال الصغير أحد أهم استخدامات الدوال: إذ تساعدك على تقسيم شيفرتك إلى كتل أصغر يسهل فهمها وذات معنى منطقي.</p>
<p>بالطبع يمكن تحقيق الوظيفة نفسها دون كتابة أي من دوالنا الخاصة:</p>
<pre><code class="language-python">numbers = []
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    user_input = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in an integer, leave empty to exit: &quot;</span>)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(user_input) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">break</span>
    numbers.append(<span class="hljs-built_in">int</span>(user_input))

ordered = <span class="hljs-built_in">sorted</span>(numbers)
list_centre = <span class="hljs-built_in">len</span>(ordered) // <span class="hljs-number">2</span>
median = ordered[list_centre]

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The greatest number is&quot;</span>, <span class="hljs-built_in">max</span>(numbers))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The median of the numbers is&quot;</span>, median)
</code></pre>
<p>في هذه النسخة يكون تتبع المنطق البرمجي أصعب، إذ لم يعد واضحًا أي الأوامر تنتمي إلى أي وظيفة. فالشيفرة تحقق الأغراض نفسها - قراءة المُدخل، وحساب قيمة الوسيط، وما إلى ذلك - لكن بنية أقلّ وضوحًا.</p>
<p>تنظيم شيفرتك في دوال منفصلة سيحسّن وضوح قراءة برنامجك، كما سيجعل التعامل مع الكتل المنطقية أسهل. وهذا بدوره يساعدك على التحقق من أن البرنامج يعمل كما هو مقصود، إذ يمكن اختبار كل دالة على حدة.</p>
<p>ومن الاستخدامات المهمة الأخرى للدوال جعل الشيفرة <em>قابلة لإعادة الاستخدام</em>. فإذا احتجت تحقيق وظيفة ما عدة مرات في برنامجك، فمن الجيد إنشاء دالة خاصتك ومنحها اسمًا مناسبًا:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Shoe sizes:&quot;</span>)
shoe_sizes = input_numbers()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Weights:&quot;</span>)
weights = input_numbers()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Heights:&quot;</span>)
heights = input_numbers()
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: طول القائمة</strong></p>
<p>يُرجى كتابة دالة اسمها <code>length</code> تأخذ قائمة كوسيط لها، وتُرجع طول القائمة.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
result = length(my_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The length is&quot;</span>, result)

<span class="hljs-comment"># the list given as an argument doesn&#x27;t need to be stored in any variable</span>
result = length([<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The length is&quot;</span>, result)
</code></pre>
<pre><code>The length is 5
The length is 4
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المتوسط الحسابي</strong></p>
<p>يُرجى كتابة دالة اسمها <code>mean</code> تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وتُعيد الدالة المتوسط الحسابي للقيم في القائمة.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
result = mean(my_list))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;mean value is&quot;</span>, result)
</code></pre>
<pre><code>mean value is 3.0
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مدى القائمة</strong></p>
<p>يُرجى كتابة دالة اسمها <code>range_of_list</code> تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وتُعيد الدالة الفرق بين القيمة الصغرى والعظمى في القائمة.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
result = range_of_list(my_list))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The range of the list is&quot;</span>, result)
</code></pre>
<pre><code>The range of the list is 4
</code></pre>
<p>هناك طرق كثيرة أخرى لاستخدام القوائم في Python. و<a href="https://docs.python.org/3/tutorial/datastructures.html">توثيق</a> Python مكان جيد للبدء إن أردت معرفة المزيد.</p>
<!---

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 4849cd69-1938-5f4f-8805-8445f0f5c015)

-->
`,r={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,r as default,l as headings,t as html,e as slug,p as title};
