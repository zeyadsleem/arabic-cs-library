const s="mooc",n="part-4",a="الجزء 4: الدوال والقوائم",e="4-definite-iteration",p="التكرار المحدَّد",l=[{depth:2,id:"حلقة-for",text:"حلقة for"},{depth:2,id:"الدالة-range",text:"الدالة range"},{depth:2,id:"من-مدى-إلى-قائمة",text:"من مدى إلى قائمة"},{depth:2,id:"تذكير-بمتطلبات-الاختبارات-الآلية",text:"تذكير بمتطلّبات الاختبارات الآلية"},{depth:2,id:"إيجاد-أفضل-عنصر-أو-أسوأ-عنصر-في-قائمة",text:"إيجاد أفضل عنصر أو أسوأ عنصر في قائمة"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف الفرق بين التكرار المحدَّد والتكرار غير المحدَّد</li>
<li>ستعرف كيف تعمل حلقة <code>for</code> في Python</li>
<li>ستكون قادرًا على استخدام حلقة <code>for</code> للتكرار على القوائم والسلاسل النصية</li>
</ul>
</blockquote>
<p>يمكنك استخدام حلقة <code>while</code> للمرور على عناصر قائمة، تمامًا كما استخدمنا حلقات <code>while</code> للمرور على السلاسل النصية. ويطبع البرنامج التالي عناصر القائمة، كل عنصر في سطر منفصل:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]

index = <span class="hljs-number">0</span>
<span class="hljs-keyword">while</span> index &lt; <span class="hljs-built_in">len</span>(my_list):
    <span class="hljs-built_in">print</span>(my_list[index])
    index += <span class="hljs-number">1</span>
</code></pre>
<pre><code>3
2
4
5
2
</code></pre>
<p>هذا يعمل بطبيعة الحال، لكنه طريقة معقّدة بعض الشيء للمرور على قائمة، إذ عليك استخدام متغيّر مساعد <code>index</code> لتتذكّر العنصر الذي وصلت إليه في القائمة. ولحسن الحظ، توفّر Python طريقة أكثر حدسية للمرور على القوائم والسلاسل النصية والهياكل المشابهة الأخرى.</p>
<h2 id="حلقة-for">حلقة <code>for</code></h2>
<p>حين تريد المرور على مجموعة جاهزة من العناصر، تتكفّل بك حلقة <code>for</code> في Python بذلك. فمثلًا يمكن للحلقة أن تمرّ على جميع عناصر قائمة من الأول إلى الأخير.</p>
<p>عند استخدام حلقة <code>while</code> لا «يعرف» البرنامج مسبقًا كم تكرارًا ستؤديه الحلقة. فهي تتكرر حتى يصبح الشرط خاطئًا، أو حتى يتم الخروج من الحلقة بطريقة أخرى. ولهذا فإنها تندرج تحت <em>التكرار غير المحدَّد</em>. أما مع حلقة <code>for</code> فيُحدَّد عدد التكرارات عند إعداد الحلقة، ولهذا فإنها تندرج تحت <em>التكرار المحدَّد</em>.</p>
<p>والفكرة أن حلقة <code>for</code> تأخذ عناصر المجموعة واحدًا تلو الآخر، وتنفّذ الإجراءات نفسها على كل عنصر. فلا يحتاج المبرمج إلى التفكير في أي عنصر يجري معالجته في كل مرة. وصيغة حلقة <code>for</code> هي كما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> &lt;variable&gt; <span class="hljs-keyword">in</span> &lt;collection&gt;:
    &lt;block&gt;
</code></pre>
<p>تأخذ حلقة <code>for</code> عنصرًا من المجموعة، وتُسنده إلى المتغيّر، وتنفّذ كتلة الشيفرة، ثم تنتقل إلى العنصر التالي. وبعد أن تتم معالجة جميع عناصر المجموعة، يستمر تنفيذ البرنامج من السطر التالي للحلقة.</p>
<p><img src="/arabic-cs-library/images/mooc/part-4/4_4_1.png" alt="التكرار على قائمة"></p>
<p>يطبع البرنامج التالي جميع عناصر قائمة باستخدام حلقة <code>for</code>:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]

<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
    <span class="hljs-built_in">print</span>(item)
</code></pre>
<pre><code>3
2
4
5
2
</code></pre>
<p>بالمقارنة مع المثال في بداية هذا القسم، يصبح الهيكل أسهل في الفهم بكثير. فحلقة <code>for</code> تجعل المرور المباشر على مجموعة عناصر أمرًا بسيطًا جدًا.</p>
<p>المبدأ نفسه ينطبق على محارف السلسلة النصية:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your name: &quot;</span>)

<span class="hljs-keyword">for</span> character <span class="hljs-keyword">in</span> name:
    <span class="hljs-built_in">print</span>(character)
</code></pre>
<pre><code>Please type in your name: **Grace**
G
r
a
c
e
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مرصّع بالنجوم</strong></p>
<p>اكتب برنامجًا يطلب من المستخدم كتابة سلسلة نصية. ثم يطبع البرنامج كل محرف من المُدخَل في سطر منفصل. وبعد كل محرف ينبغي أن تُطبع نجمة (*) في سطر خاص بها.</p>
</blockquote>
<p>وهكذا ينبغي أن يعمل:</p>
<pre><code>Please type in a string: **Python**
P
*
y
*
t
*
h
*
o
*
n
*
</code></pre>
<p><strong>ملاحظة:</strong> هذا التمرين لا يطلب منك كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="الدالة-range">الدالة <code>range</code></h2>
<p>كثيرًا ما تعرف عدد المرات التي تريد تكرار جزء معيّن من الشيفرة. فقد ترغب مثلًا في المرور على جميع الأعداد بين 1 و100. وتقوم الدالة <code>range</code> الموصولة بحلقة <code>for</code> بذلك نيابةً عنك.</p>
<p>هناك بضع طرق مختلفة لاستدعاء دالة <code>range</code>. وأبسطها هي إعطاء الدالة وسيطًا واحدًا فقط، يدلّ على نقطة نهاية المدى. أما نقطة النهاية نفسها فمستثناة، تمامًا كما في تقطيع السلاسل النصية. وبعبارة أخرى، يوفّر الاستدعاء <code>range(n)</code> حلقة بمدى من 0 إلى <code>n-1</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
    <span class="hljs-built_in">print</span>(i)
</code></pre>
<pre><code>0
1
2
3
4
</code></pre>
<p>مع وسيطين، تُرجع الدالة مدى بين العددَين. وتوفّر الدالة <code>range(a,b)</code> مدى يبدأ من <code>a</code> وينتهي عند <code>b-1</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>, <span class="hljs-number">7</span>):
    <span class="hljs-built_in">print</span>(i)
</code></pre>
<pre><code>3
4
5
6
</code></pre>
<p>وأخيرًا، بوسيط ثالث يمكنك أيضًا تحديد حجم <em>الخطوة</em> التي يتخذها المدى بين كل قيمة. ويوفّر الاستدعاء <code>range(a, b, c)</code> مدى يبدأ من <code>a</code> وينتهي عند <code>b-1</code> ويتغيّر بمقدار <code>c</code> في كل خطوة:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">9</span>, <span class="hljs-number">2</span>):
    <span class="hljs-built_in">print</span>(i)
</code></pre>
<pre><code>1
3
5
7
</code></pre>
<p>ويمكن أن تكون الخطوة سالبة. عندئذٍ يكون المدى بترتيب معكوس. ولاحظ أن الوسيطَين الأوّليَين معكوكان هنا أيضًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">6</span>, <span class="hljs-number">2</span>, -<span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(i)
</code></pre>
<pre><code>6
5
4
3
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: من السالب إلى الموجب</strong></p>
<p>اكتب برنامجًا يطلب من المستخدم عددًا صحيحًا موجبًا N. ثم يطبع البرنامج جميع الأعداد بين -N وN شاملًا الطرفين، لكن <em>مع استثناء العدد 0</em>. وينبغي أن يُطبع كل عدد في سطر منفصل.</p>
</blockquote>
<p>مثال على السلوك المتوقع:</p>
<pre><code>Please type in a positive integer: **4**
-4
-3
-2
-1
1
2
3
4
</code></pre>
<p><strong>ملاحظة:</strong> هذا التمرين لا يطلب منك كتابة أي دوال، لذا يجب أن <strong>لا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="من-مدى-إلى-قائمة">من مدى إلى قائمة</h2>
<p>تُرجع الدالة <code>range</code> كائنَ مدى، يتصرّف في جوانب كثيرة كأنه قائمة، لكنه ليس قائمة في الواقع. فإذا حاولت طباعة القيمة التي تُرجعها الدالة، فلن ترى سوى وصف لكائن المدى:</p>
<pre><code class="language-python">numbers = <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>, <span class="hljs-number">7</span>)
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>range(2, 7)
</code></pre>
<p>تحوّل الدالة <code>list</code> المدى إلى قائمة. وستحتوي القائمة على جميع القيم الموجودة في المدى. أما دورة البرمجة المتقدمة، التي تأتي بعد هذه الدورة، فستُلقي مزيدًا من الضوء على هذا الموضوع.</p>
<pre><code class="language-python">numbers = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>, <span class="hljs-number">7</span>))
<span class="hljs-built_in">print</span>(numbers)
</code></pre>
<pre><code>[2, 3, 4, 5, 6]
</code></pre>
<h2 id="تذكير-بمتطلبات-الاختبارات-الآلية">تذكير بمتطلّبات الاختبارات الآلية</h2>
<p>حتى الآن، حين كان يُطلب منك في التمارين كتابة دوال، كانت القوالب تبدو هكذا:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your solution here</span>
<span class="hljs-comment"># You can test your function by calling it within the following block</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    sentence = <span class="hljs-string">&quot;it was a dark and stormy python&quot;</span>
    <span class="hljs-built_in">print</span>(first_word(sentence))
    <span class="hljs-built_in">print</span>(second_word(sentence))
    <span class="hljs-built_in">print</span>(last_word(sentence))
</code></pre>
<p>من الآن فصاعدًا لن تتكرر التذكيرات في القوالب باستخدام كتلة <code>if __name__ == &quot;__main__&quot;</code>. لكن الاختبارات الآلية ستظل تتطلّب استخدامها، لذا عليك إضافة الكتلة بنفسك حين تختبر دالتك داخل الدالة الرئيسية لبرنامجك.</p>
<p><strong>ملاحظة:</strong> بعض التمارين، مثل تمرين <em>المتناظرات</em> (palindromes) الذي سيأتي لاحقًا في هذا القسم، تتطلّب منك أيضًا كتابة شيفرة تستدعي الدالة التي كتبتها. ولا ينبغي أن توضع هذه الشيفرة <em>داخل</em> كتلة <code>if __name__ == &quot;__main__&quot;</code>. ولن تنفّذ الاختبارات الآلية أي شيفرة داخل تلك الكتلة، لذا لن يكون حلّك مكتملًا إن وضعت استدعاءات دوالك هناك.</p>
<blockquote>
<p><strong>تمرين برمجي: قائمة نجوم</strong></p>
<p>اكتب دالة اسمها <code>list_of_stars</code>، تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وينبغي أن تطبع الدالة أسطرًا من محارف النجمة. وتحدّد الأعداد في القائمة عدد النجوم التي ينبغي أن يحتوي عليها كل سطر.</p>
</blockquote>
<p>فمثلًا، مع استدعاء الدالة <code>list_of_stars([3, 7, 1, 1, 2])</code> ينبغي أن يُطبع ما يلي:</p>
<pre><code>***
*******
*
*
**
</code></pre>
<!-- **لاحظ** أن نظام Windows يعاني في الوقت الحالي من مشكلات في تشغيل اختبارات بعض التمارين. فإن صادفت رسالة الخطأ التالية

<img src="/arabic-cs-library/images/mooc/part-4/4_3_2.png" alt="التكرار على قائمة">

فيمكنك تشغيل الاختبارات بإرسالها إلى الخادم، باختيار _Submit solutions_ من قائمة TMC التي تُفتح من الرمز الموجود على يمين زر تشغيل الاختبارات.

يمكن حل المشكلة بالانتقال إلى قائمة تثبيت الإضافة وتغيير موضع التمارين في "TMC Data" إلى موضع آخر له مسار ملفات أقصر، عبر زر _change path_ الظاهر في الصورة أدناه. وقد يستغرق هذا بعض الوقت، لذا انتظر انتهاء العملية.

يجري العمل على إيجاد حل أفضل للمشكلة في الأيام القريبة. -->
<blockquote>
<p><strong>تمرين برمجي: الأناغرام</strong></p>
<p>اكتب دالة اسمها <code>anagrams</code>، تأخذ سلسلتين نصيتين كوسيطين. وتُرجع الدالة <code>True</code> إذا كانت السلسلتان النصيتان تباديل حرفية (anagrams) لإحداهما الأخرى. وتعدّ كلمتان تباديل حرفية لإحداهما الأخرى إذا احتوتا على المحارف نفسها تمامًا.</p>
</blockquote>
<p>وبعض الأمثلة على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(anagrams(<span class="hljs-string">&quot;tame&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>)) <span class="hljs-comment"># True</span>
<span class="hljs-built_in">print</span>(anagrams(<span class="hljs-string">&quot;tame&quot;</span>, <span class="hljs-string">&quot;mate&quot;</span>)) <span class="hljs-comment"># True</span>
<span class="hljs-built_in">print</span>(anagrams(<span class="hljs-string">&quot;tame&quot;</span>, <span class="hljs-string">&quot;team&quot;</span>)) <span class="hljs-comment"># True</span>
<span class="hljs-built_in">print</span>(anagrams(<span class="hljs-string">&quot;tabby&quot;</span>, <span class="hljs-string">&quot;batty&quot;</span>)) <span class="hljs-comment"># False</span>
<span class="hljs-built_in">print</span>(anagrams(<span class="hljs-string">&quot;python&quot;</span>, <span class="hljs-string">&quot;java&quot;</span>)) <span class="hljs-comment"># False</span>
</code></pre>
<p>تلميح: يمكن استخدام الدالة <code>sorted</code> على السلاسل النصية أيضًا.</p>
<blockquote>
<p><strong>تمرين برمجي: المتناظرات</strong></p>
<p>اكتب دالة اسمها <code>palindromes</code>، تأخذ وسيطًا من نوع سلسلة نصية وتُرجع <code>True</code> إذا كانت السلسلة النصية متناظرة (palindrome). والمتناظرات كلمات تُكتب بنفس الطريقة تمامًا إلى الأمام وإلى الخلف.</p>
</blockquote>
<p>يُرجى أيضًا كتابة برنامج رئيسي يطلب من المستخدم كتابة كلمات حتى يكتب كلمة متناظرة:</p>
<pre><code>Please type in a palindrome: **python**
that wasn't a palindrome
Please type in a palindrome: **java**
that wasn't a palindrome
Please type in a palindrome: **oddoreven**
that wasn't a palindrome
Please type in a palindrome: **neveroddoreven**
neveroddoreven is a palindrome!
</code></pre>
<p><strong>ملاحظة:</strong> يجب <strong>ألا</strong> يكون البرنامج الرئيسي داخل كتلة <code>if __name__ == &quot;__main__&quot;:</code></p>
<blockquote>
<p><strong>تمرين برمجي: مجموع الأعداد الموجبة</strong></p>
<p>اكتب دالة اسمها <code>sum_of_positives</code>، تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وتُرجع الدالة مجموع القيم الموجبة في القائمة.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, -<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, -<span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
result = sum_of_positives(my_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result is&quot;</span>, result)
</code></pre>
<pre><code>The result is 9
</code></pre>
<p>في هذه التمارين سنستخدم القوائم كوسائط وقيم إعادَة. وقد تناول ذلك <a href="/arabic-cs-library/book/mooc/part-4/3-lists#a-list-as-an-argument-or-a-return-value">القسم السابق</a>، إن احتجت إلى مراجعة.</p>
<blockquote>
<p><strong>تمرين برمجي: الأعداد الزوجية</strong></p>
<p>اكتب دالة اسمها <code>even_numbers</code>، تأخذ قائمة من الأعداد الصحيحة كوسيط. وتُرجع الدالة قائمة جديدة تحتوي على الأعداد الزوجية من القائمة الأصلية.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
new_list = even_numbers(my_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;original&quot;</span>, my_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;new&quot;</span>, new_list)
</code></pre>
<pre><code>original [1, 2, 3, 4, 5]
new [2, 4]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مجموع القوائم</strong></p>
<p>اكتب دالة اسمها <code>list_sum</code> تأخذ قائمتين من الأعداد الصحيحة كوسيطين. وتُرجع الدالة قائمة جديدة تحتوي على مجاميع العناصر عند كل فهرس في القائمتين الأصليتين. ويمكنك أن تفترض أن للقائمتين العدد نفسه من العناصر.</p>
</blockquote>
<p>مثال على عمل الدالة:</p>
<pre><code class="language-python">a = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
b = [<span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>]
<span class="hljs-built_in">print</span>(list_sum(a, b)) <span class="hljs-comment"># [8, 10, 12]</span>
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الأعداد المختلفة</strong></p>
<p>اكتب دالة اسمها <code>distinct_numbers</code>، تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وتُرجع الدالة قائمة جديدة تحتوي على أعداد القائمة الأصلية مرتَّبة حسب القيمة، بحيث لا يظهر كل عدد مميَّز إلا مرة واحدة فقط.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>]
<span class="hljs-built_in">print</span>(distinct_numbers(my_list)) <span class="hljs-comment"># [1, 2, 3]</span>
</code></pre>
<h2 id="إيجاد-أفضل-عنصر-أو-أسوأ-عنصر-في-قائمة">إيجاد أفضل عنصر أو أسوأ عنصر في قائمة</h2>
<p>من المهام البرمجية الشائعة جدًا إيجاد أفضل عنصر أو أسوأ عنصر في قائمة وفق معايير ما. والحل البسيط هو استخدام متغيّر مساعد «يتذكّر» أيّ العناصر التي عولجت حتى الآن هو الأنسب. ثم يُقارَن هذا الاختيار المؤقّت الأفضل بكل عنصر على حدة، وفي نهاية التكرار يحتوي المتغيّر على الأفضل من بين العناصر كلها.</p>
<p>مسوّدة تقريبية لا تعمل كما ينبغي بعد:</p>
<pre><code class="language-python">best = initial_value <span class="hljs-comment"># The initial value depends on the situation</span>
<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> my_list:
    <span class="hljs-keyword">if</span> item <span class="hljs-keyword">is</span> better than best:
        best = item

<span class="hljs-comment"># We now have the best one figured out!</span>
</code></pre>
<p>تعتمد تفاصيل شيفرة البرنامج النهائية على نوع العناصر الموجودة في القائمة، وكذلك على معايير اختيار أفضل عنصر (أو أسوأه). وقد تحتاج أحيانًا إلى أكثر من متغيّر مساعد.</p>
<p>لنتمرّن قليلًا على هذه الطريقة.</p>
<blockquote>
<p><strong>تمرين برمجي: طول الأطول في القائمة</strong></p>
<p>اكتب دالة اسمها <code>length_of_longest</code>، تأخذ قائمة من السلاسل النصية كوسيط لها. وتُرجع الدالة طول أطول سلسلة نصية.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>, <span class="hljs-string">&quot;eleventh&quot;</span>]

result = length_of_longest(my_list)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;adele&quot;</span>, <span class="hljs-string">&quot;mark&quot;</span>, <span class="hljs-string">&quot;dorothy&quot;</span>, <span class="hljs-string">&quot;tim&quot;</span>, <span class="hljs-string">&quot;hedy&quot;</span>, <span class="hljs-string">&quot;richard&quot;</span>]

result = length_of_longest(my_list)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>8
7
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الأقصر في القائمة</strong></p>
<p>اكتب دالة اسمها <code>shortest</code>، تأخذ قائمة من السلاسل النصية كوسيط لها. وتُرجع الدالة أيّ السلاسل النصية كانت الأقصر. وإذا كان هناك أكثر من سلسلة متساوية في القصر، فيمكن للدالة أن تُرجع أيّ من تلك السلاسل الأقصر (ولن تحدث هذه الحالة في الاختبارات). ويمكنك أن تفترض أنه لا توجد سلاسل نصية فارغة في القائمة.</p>
</blockquote>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>, <span class="hljs-string">&quot;eleventh&quot;</span>]

result = shortest(my_list)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;adele&quot;</span>, <span class="hljs-string">&quot;mark&quot;</span>, <span class="hljs-string">&quot;dorothy&quot;</span>, <span class="hljs-string">&quot;tim&quot;</span>, <span class="hljs-string">&quot;hedy&quot;</span>, <span class="hljs-string">&quot;richard&quot;</span>]

result = shortest(my_list)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>first
tim
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: كل الأطول في القائمة</strong></p>
<p>اكتب دالة اسمها <code>all_the_longest</code>، تأخذ قائمة من السلاسل النصية كوسيط لها. وينبغي أن تُرجع الدالة قائمة جديدة تحتوي على أطول سلسلة نصية في القائمة الأصلية. وإذا كان هناك أكثر من سلسلة متساوية في الطول، فينبغي أن تُرجع الدالة جميع تلك السلاسل الأطول.</p>
</blockquote>
<p>وينبغي أن يكون ترتيب السلاسل النصية في القائمة المُرجَعة هو نفسه الترتيب في القائمة الأصلية.</p>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>, <span class="hljs-string">&quot;eleventh&quot;</span>]

result = all_the_longest(my_list)
<span class="hljs-built_in">print</span>(result) <span class="hljs-comment"># [&#x27;eleventh&#x27;]</span>
</code></pre>
<pre><code class="language-python">my_list = [<span class="hljs-string">&quot;adele&quot;</span>, <span class="hljs-string">&quot;mark&quot;</span>, <span class="hljs-string">&quot;dorothy&quot;</span>, <span class="hljs-string">&quot;tim&quot;</span>, <span class="hljs-string">&quot;hedy&quot;</span>, <span class="hljs-string">&quot;richard&quot;</span>]

result = all_the_longest(my_list)
<span class="hljs-built_in">print</span>(result) <span class="hljs-comment"># [&#x27;dorothy&#x27;, &#x27;richard&#x27;]</span>
</code></pre>
<!---

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: b1a91143-3137-5833-a771-6801f541a43b)

-->
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,t as default,l as headings,o as html,e as slug,p as title};
