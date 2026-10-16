const n="mooc",s="part-3",e="الجزء 3: الحلقات",p="1-loops-with-conditions",a="الحلقات مع الشروط",o=[{depth:2,id:"التهيئة-والشرط-والتحديث",text:"التهيئة والشرط والتحديث"},{depth:2,id:"كتابة-الشروط",text:"كتابة الشروط"},{depth:2,id:"نصائح-للتنقيح",text:"نصائح للتنقيح"},{depth:2,id:"بناء-السلاسل-النصية",text:"بناء السلاسل النصية"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تنشئ حلقة <code>while</code> مع شرط</li>
<li>ستعرف ما الأدوار التي تؤدّيها التهيئة وصياغة الشرط وتحديث المتغيّرات في الحلقة</li>
<li>ستتمكّن من إنشاء حلقات بأنواع مختلفة من الشروط</li>
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
<p>في القسم السابق تعلّمنا استخدام حلقة <code>while True</code> لتكرار أجزاء من الشيفرة. وفي هذه الصيغة يكون شرط الحلقة هو <code>True</code>، أي أن الشرط يتحقّق في كل مرة. وكنا نحتاج إلى الخروج من الحلقة صراحةً في كل مرة تفاديًا لحلقة لا نهائية. فمثلًا:</p>
<pre><code class="language-python"><span class="hljs-comment"># Print numbers until the variable a equals 5</span>
a = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-built_in">print</span>(a)
    a += <span class="hljs-number">1</span>
    <span class="hljs-keyword">if</span> a == <span class="hljs-number">5</span>:
        <span class="hljs-keyword">break</span>
</code></pre>
<pre><code>1
2
3
4
</code></pre>
<p>بالطبع، لا يجب أن يكون الشرط هو <code>True</code> دائمًا، بل يمكن استخدام أي تعبير منطقي (Boolean) كشرط. والهيكل العام لجملة <code>while</code> هو كما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> &lt;condition&gt;:
    &lt;block&gt;
</code></pre>
<p>الفكرة هنا أن التنفيذ يمضي ذهابًا وإيابًا، متحقّقًا في كل مرة مما إذا كان الشرط صحيحًا، ومنفِّذًا الشيفرة داخل الكتلة مرارًا وتكرارًا. وإذا كان الشرط خاطئًا في أي لحظة، فإن تنفيذ البرنامج يتابع من السطر الذي يلي كتلة <code>while</code>.</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_1_1.png" alt="3_1_1.png"></p>
<p>في الحلقة التالية يكون الشرط هو <code>number &lt; 10</code>. ولا تُنفَّذ الكتلة داخل الحلقة إلا إذا كان المتغيّر <code>number</code> أقل من 10.</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">while</span> number &lt; <span class="hljs-number">10</span>:
    <span class="hljs-built_in">print</span>(number)
    number += <span class="hljs-number">1</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Execution finished.&quot;</span>)
</code></pre>
<p>قد يطبع هذا ما يلي:</p>
<pre><code>Please type in a number: **4**
4
5
6
7
8
9
Execution finished.
</code></pre>
<p>في هذه البنية يُفحص الشرط دائمًا قبل تنفيذ الكتلة داخل الحلقة. وقد يحدث ألّا تُنفَّذ الكتلة أبدًا، مثل الآتي:</p>
<pre><code>Please type in a number: **12**
Execution finished.
</code></pre>
<p>12 ليس أقل من 10، ولذلك لا يطبع البرنامج أي عدد على الإطلاق.</p>
<h2 id="التهيئة-والشرط-والتحديث">التهيئة والشرط والتحديث</h2>
<p>لإنشاء حلقة ستحتاج غالبًا إلى تضمين ثلاث خطوات متمايزة: التهيئة، والشرط، وتحديث متغيّرات التكرار.</p>
<p>يقصد بـ_التهيئة_ (<em>initialisation</em>) ضبط القيمة أو القيم الأولى للمتغيّر أو المتغيّرات المستخدَمة في شرط الحلقة. وكثيرًا ما تُسمَّى هذه بتغيّرات التكرار (iteration) أو بالمُتكرِّرات (iterator). وتُنفَّذ هذه الخطوة قبل دخول الحلقة لأول مرة. أما <em>الشرط</em> (<em>condition</em>) فيحدّد المدة التي يُنفَّذ فيها الحلقة، إذ يُكتب في البدايات تمامًا من الحلقة. وأخيرًا، في كل تكرار من تكرارات الحلقة تُحَدَّث المتغيّراتُ المشاركة في الشرط، بحيث يقرب كل تكرار الحلقة خطوة واحدة من نهايتها. وتوضّح الصورة التالية هذه الخطوات:</p>
<!--- هذا موجود هنا احتياطًا في حال احتاجت الصورة التالية إلى تحديث
\`\`\`python
# Ask the user for a number
number = int(input("Please type in a number: "))

# Repeat while the number is less than 10
while number < 10:

    # Print out and increment
    print(number)
    number += 1

print("Execution finished.")
\`\`\`
-->
<p><img src="/arabic-cs-library/images/mooc/part-3/3_1_2.png" alt="3_1_2.png"></p>
<p>إذا غاب أيٌّ من هذه المكونات الثلاثة، فلن تعمل الحلقة على الأرجح على نحو صحيح. ومن الأخطاء النموذجية إغفال خطوة التحديث:</p>
<pre><code class="language-python">number = <span class="hljs-number">1</span>

<span class="hljs-keyword">while</span> number &lt; <span class="hljs-number">10</span>:
    <span class="hljs-built_in">print</span>(number)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Execution finished.&quot;</span>)
</code></pre>
<p>هنا لا تتغيّر قيمة المتغيّر <code>number</code> أبدًا. فالبرنامج عالق في حلقة لا نهائية، وتتكرّر القطعة نفسها من الشيفرة بالضبط مرارًا وتكرارًا حتى يوقف المستخدم التنفيذ، مثلًا بالضغط على <code>Control</code> + <code>C</code>:</p>
<pre><code>1
1
1
1
1
(continued ad infinitum...)
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: طباعة الأعداد</strong></p>
<p>يُرجى كتابة برنامج يطبع جميع الأعداد الزوجية بين اثنين وثلاثين باستخدام حلقة. واطبع كل عدد في سطر منفصل.</p>
</blockquote>
<p>ينبغي أن تبدو مخرجاتك كما يلي:</p>
<pre><code>2
4
6
8
etc...
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الشيفرة: العدّ التنازلي</strong></p>
<p>في البرنامج التالي بعض المشكلات النحوية:</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Are you ready?&quot;</span>)
number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))
<span class="hljs-keyword">while</span> number = <span class="hljs-number">0</span>:
<span class="hljs-built_in">print</span>(number)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Now!&quot;</span>)
</code></pre>
<p>يُرجى إصلاحه بحيث يطبع ما يلي:</p>
<pre><code>Are you ready?
Please type in a number: **5**
5
4
3
2
1
Now!
</code></pre>
<p>هذا التمرين مشابه لتمرين العدّ التنازلي في القسم الأخير، لكن يُرجى ألّا تستخدم حلقة <code>while True</code> في هذه المرة!</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="كتابة-الشروط">كتابة الشروط</h2>
<p>أي تعبير منطقي (Boolean)، أو أي دمج thereof، هو شرط صالح في الحلقة. فمثلًا، يطبع البرنامج التالي كل ثالث عدد، لكن فقط ما دام العدد أقل من 100 وغير قابل للقسمة على 5:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">while</span> number &lt; <span class="hljs-number">100</span> <span class="hljs-keyword">and</span> number % <span class="hljs-number">5</span> != <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(number)
    number += <span class="hljs-number">3</span>
</code></pre>
<p>مثالان لتنفيذ البرنامج بمُدخَلات مختلفة:</p>
<pre><code>Please type in a number: **28**
28
31
34
37
</code></pre>
<pre><code>Please type in a number: **96**
96
99
</code></pre>
<p>حين يكون المُدخَل هو 28 تنتهي الحلقة عند العدد 37، لأن العدد التالي هو 40، وهو قابل للقسمة على 5. وحين يكون المُدخَل هو 96 تنتهي الحلقة عند العدد 99، لأن العدد التالي هو 102، وهو ليس أقل من 100.</p>
<p>متى ما كتبت حلقة، ينبغي أن تتأكّد من أن تنفيذ الحلقة سينتهي دائمًا عند نقطة ما. والبرنامج التالي إما أن ينتهي أو لا ينتهي، حسب المُدخَل:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">while</span> number != <span class="hljs-number">10</span>:
    <span class="hljs-built_in">print</span>(number)
    number += <span class="hljs-number">2</span>
</code></pre>
<p>إذا كان المُدخَل عددًا زوجيًا ويساوي 10 أو أقل، فإن الحلقة ستتوقّف:</p>
<pre><code>Please type in a number: **4**
4
6
8
</code></pre>
<p>في أي حالة أخرى تُنفَّذ الحلقة بلا نهاية، إذ لا سبيل أبدًا لأن يساوي المتغيّر 10. فمثلًا، المُدخَلات 3 أو 12 مُدخَلات تنتهي في حلقة لا نهائية.</p>
<blockquote>
<p><strong>تمرين تفاعلي: الأعداد</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم عددًا. ثم يطبع البرنامج جميع الأعداد الصحيحة الأكبر من الصفر والأصغر من المُدخَل.</p>
</blockquote>
<pre><code>Upper limit: **5**
1
2
3
4
</code></pre>
<p>يُرجى ألّا تستخدم القيمة <code>True</code> كشرط لحلقة <code>while</code> في هذا التمرين!</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="نصائح-للتنقيح">نصائح للتنقيح</h2>
<p>تخيّل أنك تكتب برنامجًا أعقد قليلًا، مثل البرنامج في التمرين التالي، <em>قوى العدد 2</em>. قد تبدو المحاولات الأولى كالتالي:</p>
<pre><code class="language-python">limit = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Upper limit:&quot;</span>))
number = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> number == limit:
   <span class="hljs-comment"># more code</span>
</code></pre>
<p>هنا يبدأ البرنامج بقراءة المُدخَل، ثم يتابع الهيكل العام للحلقة مع محاولة أوّلية لكتابة شرط.</p>
<p>من المرجح ألا تعمل الشيفرة كما هو مرغوب في المحاولة الأولى. وقد يلزم اختبارها عشرات المرات بل مئات المرات قبل أن تعمل على نحو صحيح.</p>
<p>إن هذه القطعة من الشيفرة تطلب مُدخَلًا من المستخدم في كل مرة، ما يجعل اختبارها بطيئًا ومرهقًا. فمع كل اختبار للبرنامج يجب كتابة المُدخَل.</p>
<p>وإحدى طرق تفادي ذلك هي «الترميز الثابت» (<em>hard-coding</em>) للمُدخَل أثناء الاختبار:</p>
<pre><code class="language-python"><span class="hljs-comment"># let&#x27;s hard-code the input value for testing</span>
limit = <span class="hljs-number">8</span> <span class="hljs-comment"># int(input(&quot;Upper limit&quot;))</span>
number = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> number == limit:
   <span class="hljs-comment"># more code </span>
</code></pre>
<p>وحين يعمل البرنامج مع المُدخَل المرمَّز ثابتًا الواحد، يسهل اختباره بمُدخَلات أخرى مرمَّزة ثابتًا كذلك. وحين يبدو أنه يعمل على نحو صحيح في كل الأحوال، يمكن اختباره بمُدخَل من المستخدم.</p>
<p>تنفع هذه الحيلة مع كثير من الاختبارات التي تُقيَّم بها تمارين هذه الدورة. فإذا أخبرك الاختبار بأن البرنامج يعمل على نحو خاطئ عندما يكون المُدخَل هو، مثلًا، 42، فيمكن ترميز ذلك المُدخَل ثابتًا في البرنامج وأنت تبحث عن مصدر الخطأ:</p>
<pre><code class="language-python"><span class="hljs-comment"># the test said the program works incorrectly when the input is 42</span>
limit = <span class="hljs-number">42</span> <span class="hljs-comment"># int(input(&quot;Upper limit&quot;))</span>
number = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> number == limit:
   <span class="hljs-comment"># more code</span>
</code></pre>
<p>سبق أن ذُكر التنقيح بعبارات الطباعة عدة مرات في <a href="/arabic-cs-library/book/mooc/part-2/index">الجزء السابق</a> من الدورة. وستصبح البرامج التي يُطلب منك كتابتها أكثر تعقيدًا كلما تقدّمت الدورة. ومن المرجح أن يزيد مقدار التنقيح الذي ستحتاج إليه تبعًا لذلك. والأسباب الشائعة للأخطاء تكمن في الشروط التي تنهي الحلقات؛ فقد تعمل على نحو صحيح مع بعض المُدخَلات وتفشل مع غيرها، وليس سبب ذلك ظاهرًا دائمًا.</p>
<p>ولهذا فقد حان وقت أن تُدرج التنقيح بعبارات الطباعة ضمن ممارساتك البرمجية، إن لم تكن قد فعلت ذلك من قبل. ويمكنك العثور على تعليمات التنقيح في القسم <a href="/arabic-cs-library/book/mooc/part-2/1-programming_terminology">الأول</a> والقسم <a href="/arabic-cs-library/book/mooc/part-2/4-simple-loops">الرابع</a> من الجزء السابق.</p>
<p>إلى جانب عبارات الطباعة، توجد أدوات كثيرة أخرى يمكن استخدامها في التنقيح. ومن بينها <a href="http://www.pythontutor.com/visualize.html#mode=edit">أداة التمثيل المرئي</a> على موقع <a href="http://www.pythontutor.com/">Python Tutor</a>. وتتيح لك الأداة تنفيذ شيفرتك سطرًا بسطر، كما تُريك القيمَ المخزّنة في المتغيّرات عند كل خطوة.</p>
<p>في الصورة التالية نرى الشيفرة المعطوبة قليلًا من مثال التنقيح في <a href="/arabic-cs-library/book/mooc/part-2/4-simple-loops">القسم السابق</a> ممثَّلةً بواسطة Python Tutor:</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_1_3.png" alt="3_1_3.png"></p>
<p>يشير السهم الأحمر إلى الموضع الذي بلغه تنفيذ البرنامج في هذه اللحظة. وتعرض الأداة ما طُبع حتى الآن، كما تُريك القيمة التي يملكها كل متغيّر عند كل خطوة. ويتقدّم التنفيذ سطرًا بسطر عند الضغط على <em>Next</em>.</p>
<p>كل ما عليك فعله لاستخدام أداة التمثيل المرئي هو نسخ شيفرتك ولصقها في <a href="http://www.pythontutor.com/visualize.html#mode=edit">نافذة الشيفرة</a> في الأداة. وللأداة بعض القيود مقارنةً بإصدار Python المستخدَم في هذه الدورة. فإذا صادفتك رسائل أخطاء غامضة، فقد يكون من الأفضل تجربة طريقة تنقيح أخرى.</p>
<p>نادرًا ما يكون المبرمجون ذوو الخبرة من المستخدمين المكثّفين لأداة التمثيل المرئي، لكنها قد تكون عونًا ثمينًا للمبتدئ. والبرمجة بوصفها تخصّصًا لا تترك مكانًا يذكر للحظ أو للصدفة. ومن الضروري أن يفهم المبرمج القيمَ التي تُنشئها شيفرته في أي لحظة من لحظة التنفيذ. فإذا لم تكن القيم المخزّنة في المتغيّرات كما هو متوقّع، فعلى الأرجح يوجد خطأ في البرنامج.</p>
<p>أداة التمثيل المرئي وعبارات الطباعة المستخدَمة في التنقيح كلتاهما وسيلتان ممتازتان لييري المبرمج بعينيه أن برنامجًا ما يفعل تمامًا ما هو متوقَّع منه.</p>
<blockquote>
<p><strong>تمرين تفاعلي: قوى العدد 2</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال حدّ أعلى. ثم يطبع البرنامج أعدادًا بحيث يكون كل عدد بعده مزدوجَ العدد الذي يسبقه، انطلاقًا من العدد 1. أي أن البرنامج يطبع قوى العدد 2 بالترتيب.</p>
</blockquote>
<p>ينتهي تنفيذ البرنامج حين يصبح العدد التالي الذي ستُطبعه أكبر من الحدّ الذي ضبطه المستخدم. ولا ينبغي طباعة أي أعداد أكبر من الحدّ.</p>
<pre><code>Upper limit: **8**
1
2
4
8
</code></pre>
<pre><code>Upper limit: **20**
1
2
4
8
16
</code></pre>
<pre><code>Upper limit: **100**
1
2
4
8
16
32
64
</code></pre>
<p>يُرجى ألّا تستخدم القيمة <code>True</code> كشرط لحلقة <code>while</code> في هذا التمرين!</p>
<p><strong>ما هي قوى العدد 2؟</strong> القوة الأولى للعدد 2 هي العدد 1. والتي تليها هي 1 في 2، أي 2. والتي تليها هي 2 في 2، أي 4. والتي تليها هي 4 في 2، أي 8، وهكذا. فكل قوة في المتتالية تُضرب في اثنين لإنتاج القوة التالية.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: قوى الأساس n</strong></p>
<p>يُرجى تغيير البرنامج في التمرين السابق بحيث يقوم المستخدم أيضًا بإدخال الأساس الذي يُضرب فيه (في البرنامج السابق كان الأساس دائمًا 2).</p>
</blockquote>
<pre><code>Upper limit: **27**
Base: **3**
1
3
9
27
</code></pre>
<pre><code>Upper limit: **1234567**
Base: **10**
1
10
100
1000
10000
100000
1000000
</code></pre>
<p>يُرجى ألّا تستخدم القيمة <code>True</code> كشرط لحلقة <code>while</code> في هذا التمرين!</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: مجموع الأعداد المتتالية، النسخة 1</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم إدخال حدّ. ثم يحسب البرنامج مجموع الأعداد المتتالية (1 + 2 + 3 + ...) حتى يصبح المجموع مساويًا على الأقل للحدّ الذي ضبطه المستخدم. وينبغي أن يعمل البرنامج كالتالي:</p>
</blockquote>
<pre><code>Limit: **2**
3
</code></pre>
<pre><code>Limit: **10**
10
</code></pre>
<pre><code>Limit: **18**
21
</code></pre>
<p>إذا واجهت صعوبة في فهم كيفية حساب المخرجات المطلوبة، فقد تساعدك المخرجات النموذجية في التمرين التالي. ويمكنك افتراض أن العدد الذي يكتبه المستخدم يساوي دائمًا 2 أو أكثر.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="بناء-السلاسل-النصية">بناء السلاسل النصية</h2>
<p>في <a href="/arabic-cs-library/book/mooc/part-1/2-information-from-the-user">الأسبوع الأول من الدورة</a> تعلّمنا أنه من الممكن «بناء» السلاسل النصية من سلاسل نصية أقصر باستخدام المشغّل <code>+</code>. فمثلًا، هذه شيفرة Python صحيحة:</p>
<pre><code class="language-python">words = <span class="hljs-string">&quot;pride&quot;</span>
words = words + <span class="hljs-string">&quot;, prejudice&quot;</span>
words = words + <span class="hljs-string">&quot; and python&quot;</span>

<span class="hljs-built_in">print</span>(words)
</code></pre>
<pre><code>pride, prejudice and python
</code></pre>
<p>يتيح لنا المشغّل <code>+=</code> كتابة هذا بأسلوب أكثر اختصارًا قليلًا:</p>
<pre><code class="language-python">words = <span class="hljs-string">&quot;pride&quot;</span>
words += <span class="hljs-string">&quot;, prejudice&quot;</span>
words += <span class="hljs-string">&quot; and python&quot;</span>

<span class="hljs-built_in">print</span>(words)
</code></pre>
<p>ينطبق هذا أيضًا على السلاسل النصية ذات البادئة f، وقد تفيد إن احتجنا إلى القيم المخزّنة في المتغيّرات كأجزاء من السلسلة النصية الناتجة. فمثلًا، سيعمل هذا:</p>
<pre><code class="language-python">course = <span class="hljs-string">&quot;Introduction to Programming&quot;</span>
grade = <span class="hljs-number">4</span>

verdict = <span class="hljs-string">&quot;You have received &quot;</span>
verdict += <span class="hljs-string">f&quot;the grade <span class="hljs-subst">{grade}</span> &quot;</span>
verdict += <span class="hljs-string">f&quot;from the course <span class="hljs-subst">{course}</span>&quot;</span>

<span class="hljs-built_in">print</span>(verdict)
</code></pre>
<pre><code>You have received the grade 4 from the course Introduction to Programming
</code></pre>
<p>في التمرين السابق حسبتَ مجموعَ الأعداد المتتالية عبر إضافة قيمة جديدة داخل حلقة في كل مرة.</p>
<p>تنطبق الفكرة نفسها بالضبط على السلاسل النصية أيضًا: يمكنك إضافة أجزاء جديدة إلى سلسلة نصية داخل حلقة. وستكون هذه التقنية مفيدة في التمرين التالي.</p>
<blockquote>
<p><strong>تمرين تفاعلي: مجموع الأعداد المتتالية، النسخة 2</strong></p>
<p>يُرجى كتابة نسخة جديدة من البرنامج في التمرين السابق. وبالإضافة إلى النتيجة، ينبغي له أيضًا أن يطبع العملية الحسابية التي أُجريت:</p>
</blockquote>
<pre><code>Limit: **2**
The consecutive sum: 1 + 2 = 3
</code></pre>
<pre><code>Limit: **10**
The consecutive sum: 1 + 2 + 3 + 4 = 10
</code></pre>
<pre><code>Limit: **18**
The consecutive sum: 1 + 2 + 3 + 4 + 5 + 6 = 21
</code></pre>
<p>ويمكنك افتراض أن العدد الذي يكتبه المستخدم يساوي دائمًا 2 أو أكثر.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!---

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 900c0293-b14c-5736-b1a3-68d4fa01ac43)

-->
`,r={book:n,chapter:s,chapterTitle:e,slug:p,title:a,headings:o,html:t};export{n as book,s as chapter,e as chapterTitle,r as default,o as headings,t as html,p as slug,a as title};
