const s="mooc",n="part-6",e="الجزء 6: الملفات والأخطاء",a="2-writing-files",p="كتابة الملفات",o=[{depth:2,id:"إنشاء-ملف-جديد",text:"إنشاء ملف جديد"},{depth:2,id:"إلحاق-بيانات-بملف-موجود",text:"إلحاق بيانات بملف موجود"},{depth:2,id:"كتابة-ملفات-csv",text:"كتابة ملفات CSV"},{depth:2,id:"مسح-محتوى-الملفات-وحذفها",text:"مسح محتوى الملفات وحذفها"},{depth:2,id:"معالجة-البيانات-بصيغة-csv",text:"معالجة البيانات بصيغة CSV"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تنشئ ملفات بشيفرة Python</li>
<li>ستكون قادرًا على كتابة بيانات نصية داخل ملف</li>
<li>ستعرف كيف تنشئ ملف CSV</li>
</ul>
</blockquote>
<p>حتى الآن قرأنا البيانات من الملفات، ومن الطبيعي أيضًا أن يكون من الممكن كتابة البيانات في الملفات. وعادةً يعالج البرنامج البيانات ويخزّن النتائج في ملف، لتُستخدم لاحقًا أو تُعالَج مزيدًا من خلال برنامج آخر.</p>
<p>يمكننا إنشاء ملف جديد في كل مرة نريد فيها كتابة البيانات في ملف، لكن يمكننا أيضًا إلحاق بيانات جديدة بنهاية ملف موجود. وفي الحالتين نستخدم الدالة <code>open</code> من القسم السابق. أما للكتابة في الملفات فتتطلب الدالة وسيطًا ثانيًا.</p>
<h2 id="إنشاء-ملف-جديد">إنشاء ملف جديد</h2>
<p>إذا أردت إنشاء ملف جديد، فستستدعي الدالة <code>open</code> بالوسيط الإضافي <code>w</code>، ليشير إلى أن الملف ينبغي فتحه في وضع الكتابة. وعندها قد يبدو استدعاء الدالة هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;new_file.txt&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    <span class="hljs-comment"># code to write something to the file</span>
</code></pre>
<p><strong>ملاحظة: إذا كان الملف موجودًا أصلًا فسيُستبدل كل محتواه بالكامل</strong>. ينبغي أن تكون شديد الحذر عند إنشاء ملفات جديدة.</p>
<p>وبفتح الملف يمكنك كتابة البيانات فيه. ويمكنك استخدام التابع <code>write</code>، الذي يأخذ السلسلة النصية المراد كتابتها كوسيط له.</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;new_file.txt&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    my_file.write(<span class="hljs-string">&quot;Hello there!&quot;</span>)
</code></pre>
<p>وعند تنفيذ البرنامج يظهر ملف جديد اسمه <code>new_file.txt</code> في الدليل. ويبدو المحتوى هكذا:</p>
<pre><code>Hello there!
</code></pre>
<p>وإذا أردت فواصل أسطر في الملف فستضيفها يدويًا — الدالة <code>write</code> لا تعمل تمامًا مثل الدالة <code>print</code> الأكثر إلفة، مع أنهما متشابهتان. إذًا، فإن البرنامج التالي</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;new_file.txt&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    my_file.write(<span class="hljs-string">&quot;Hello there!&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;This is the second line&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;This is the last line&quot;</span>)
</code></pre>
<p>ينتج عنه ملف بهذا المحتوى:</p>
<pre><code>Hello there!This is the second lineThis is the last line
</code></pre>
<p>وتُحقَّق فواصل الأسطر بإضافة محارف السطر الجديد <code>\\n</code> إلى السلاسل النصية الخاصة بالوسيط:</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;new_file.txt&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    my_file.write(<span class="hljs-string">&quot;Hello there!\\n&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;This is the second line\\n&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;This is the last line\\n&quot;</span>)
</code></pre>
<p>الآن يبدو محتوى <code>new_file.txt</code> هكذا:</p>
<pre><code>Hello there!
This is the second line
This is the last line
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: النقش</strong></p>
<p>يُرجى كتابة برنامج يسأل عن اسم المستخدم ثم ينشئ «نقشًا» في ملف يحدّده المستخدم. يُرجى الاطلاع على المثال أدناه.</p>
</blockquote>
<pre><code>Whom should I sign this to: **Ada**
Where shall I save it: **inscribed.txt**
</code></pre>
<p>ويكون محتوى الملف <code>inscribed.txt</code> هو</p>
<pre><code>Hi Ada, we hope you enjoy learning Python with us! Best, Mooc.fi Team
</code></pre>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="إلحاق-بيانات-بملف-موجود">إلحاق بيانات بملف موجود</h2>
<p>إذا أردت إلحاق بيانات بنهاية الملف بدل استبدال الملف كله، فتحتاج إلى فتح الملف في وضع الإلحاق بالوسيط <code>a</code>.</p>
<p>وإذا لم يكن الملف موجودًا بعد، فإن وضع الإلحاق يعمل تمامًا مثل وضع الكتابة.</p>
<p>يفتح البرنامج التالي الملف <code>new_file.txt</code> ويُلحق بضع أسطر نصية بالنهاية:</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;new_file.txt&quot;</span>, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    my_file.write(<span class="hljs-string">&quot;This is the 4th line\\n&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;And yet another line.\\n&quot;</span>)
</code></pre>
<p>وبعد تنفيذ هذا البرنامج يبدو محتوى الملف هكذا:</p>
<pre><code>Hello there!
This is the second line
This is the last line
This is the 4th line
And yet another line.
</code></pre>
<p>وفي ممارسة البرمجة، ليست إلحاق البيانات بالملفات من المهام الشائعة جدًّا.</p>
<p>وغالبًا ما يُقرأ الملف ويُعالَج ويُستبدل بالكامل. فمثلًا، حين ينبغي تغيير المحتوى في <em>وسط</em> الملف، يكون الأسهل عادةً استبدال الملف كله.</p>
<blockquote>
<p><strong>تمرين برمجي: المذكرة اليومية</strong></p>
<p>يُرجى كتابة برنامج يعمل كدفتر يوميات بسيط. وتُحفظ قيود اليوميات في الملف <code>diary.txt</code>. وعند تنفيذ البرنامج ينبغي أن يقرأ أولًا أي قيود موجودة في الملف أصلًا.</p>
</blockquote>
<p>ملاحظة: ستغيّر الاختبارات الآلية لهذا التمرين محتوى الملف. إذا أردت الاحتفاظ بمحتواه، فانسخ الملف أولًا باسم مختلف.</p>
<p>ويجب أن يعمل البرنامج على النحو التالي:</p>
<pre><code>1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **Today I ate porridge**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **I went to the sauna in the evening**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!
</code></pre>
<p>وعند تنفيذ البرنامج للمرة الثانية، ينبغي أن يحدث ما يلي:</p>
<pre><code>1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!
</code></pre>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<h2 id="كتابة-ملفات-csv">كتابة ملفات CSV</h2>
<p>يمكن كتابة ملفات CSV سطرًا بسطر بالتابع <code>write</code> تمامًا كما يُكتب أي ملف آخر. ينشئ المثال التالي الملف <code>coders.csv</code>، حيث يحوي كل سطر على اسم وبيئة عمل ولغة مفضّلة وسنوات خبرة لمبرمج واحد. وتفصل الحقول عن بعضها فاصلة منقوطة.</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;coders.csv&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    my_file.write(<span class="hljs-string">&quot;Eric;Windows;Pascal;10\\n&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;Matt;Linux;PHP;2\\n&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;Alan;Linux;Java;17\\n&quot;</span>)
    my_file.write(<span class="hljs-string">&quot;Emily;Mac;Cobol;9\\n&quot;</span>)
</code></pre>
<p>ينتج عن تنفيذ هذا البرنامج الملف التالي:</p>
<pre><code>Eric;Windows;Pascal;10
Matt;Linux;PHP;2
Alan;Linux;Java;17
Emily;Mac;Cobol;9
</code></pre>
<p>وماذا لو كانت البيانات المراد كتابتها مخزّنة في ذاكرة الحاسوب داخل قائمة (list)؟</p>
<pre><code class="language-python">coders = []
coders.append([<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-string">&quot;Windows&quot;</span>, <span class="hljs-string">&quot;Pascal&quot;</span>, <span class="hljs-number">10</span>])
coders.append([<span class="hljs-string">&quot;Matt&quot;</span>, <span class="hljs-string">&quot;Linux&quot;</span>, <span class="hljs-string">&quot;PHP&quot;</span>, <span class="hljs-number">2</span>])
coders.append([<span class="hljs-string">&quot;Alan&quot;</span>, <span class="hljs-string">&quot;Linux&quot;</span>, <span class="hljs-string">&quot;Java&quot;</span>, <span class="hljs-number">17</span>])
coders.append([<span class="hljs-string">&quot;Emily&quot;</span>, <span class="hljs-string">&quot;Mac&quot;</span>, <span class="hljs-string">&quot;Cobol&quot;</span>, <span class="hljs-number">9</span>])
</code></pre>
<p>يمكننا بناء السلسلة النصية التي نريد كتابتها كسلسلة نصية ذات بادئة f، ثم كتابة السطر الجاهز في الملف هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;coders.csv&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    <span class="hljs-keyword">for</span> coder <span class="hljs-keyword">in</span> coders:
        line = <span class="hljs-string">f&quot;<span class="hljs-subst">{coder[<span class="hljs-number">0</span>]}</span>;<span class="hljs-subst">{coder[<span class="hljs-number">1</span>]}</span>;<span class="hljs-subst">{coder[<span class="hljs-number">2</span>]}</span>;<span class="hljs-subst">{coder[<span class="hljs-number">3</span>]}</span>&quot;</span>
        my_file.write(line+<span class="hljs-string">&quot;\\n&quot;</span>)
</code></pre>
<p>ولو كانت كل قائمة بيانات مبرمج طويلة جدًّا وتحوي عناصر أكثر بكثير، لكان بناء السلسلة النصية يدويًا أمرًا مُرهقًا. ويمكننا استخدام حلقة <code>for</code> لبناء السلسلة النصية بدلًا من ذلك:</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;coders.csv&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    <span class="hljs-keyword">for</span> coder <span class="hljs-keyword">in</span> coders:
        line = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-keyword">for</span> value <span class="hljs-keyword">in</span> coder:
            line += <span class="hljs-string">f&quot;<span class="hljs-subst">{value}</span>;&quot;</span>
        line = line[:-<span class="hljs-number">1</span>]
        my_file.write(line+<span class="hljs-string">&quot;\\n&quot;</span>)
</code></pre>
<h2 id="مسح-محتوى-الملفات-وحذفها">مسح محتوى الملفات وحذفها</h2>
<p>قد يلزم أحيانًا مسح محتوى ملف موجود. ففتح الملف في وضع الكتابة وإغلاقه فورًا يُحدث هذا بالضبط:</p>
<pre><code class="language-python"><span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;file_to_be_cleared.txt&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    <span class="hljs-keyword">pass</span>
</code></pre>
<p>والآن لا يحتوي كتلة <code>with</code> سوى الأمر <code>pass</code>، الذي لا يفعل شيئًا في الواقع. ولا تسمح Python بالكتل الفارغة، لذا يكون الأمر هنا ضروريًا.</p>
<p>ومن الممكن أيضًا تجاوز كتلة <code>with</code> باستخدام أمر من سطر واحد كما يلي:</p>
<pre><code class="language-python"><span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;file_to_be_cleared.txt&#x27;</span>, <span class="hljs-string">&#x27;w&#x27;</span>).close()
</code></pre>
<blockquote>
<p><strong>حذف الملفات</strong></p>
<p>يمكنك أيضًا حذف ملف بالكامل. وسنحتاج إلى طلب المساعدة من نظام التشغيل لتحقيق ذلك:</p>
<pre><code class="language-python"><span class="hljs-comment"># the command to delete files is in the os module</span>
<span class="hljs-keyword">import</span> os

os.remove(<span class="hljs-string">&quot;unnecessary_file.csv&quot;</span>)
</code></pre>
<p>ملاحظة: لن يعمل هذا عند تشغيل الاختبارات الآلية على خوادم الدورة بسبب قيود تقنية في بيئة الاختبار. وإذا طُلب منك مسح محتوى ملف، فاستخدم الطرق الموصوفة أعلاه.</p>
</blockquote>
<blockquote>
<p><strong>تمرين برمجي: تصفية محتويات ملف</strong></p>
<p>يحتوي الملف <code>solutions.csv</code> على بعض حلول مسائل رياضية:</p>
</blockquote>
<pre><code class="language-csv">Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
</code></pre>
<p>وكما ترى أعلاه، فالصيغة في كل سطر هي <code>name_of_student;problem;result</code>. وكل العمليات إمّا جمع وإمّا طرح، ولكل واحدة وسيطان بالضبط.</p>
<p>يُرجى كتابة دالة اسمها <code>filter_solutions()</code> والتي:</p>
<ul>
<li>تقرأ محتوى الملف <code>solutions.csv</code></li>
<li>تكتب السطور التي نتيجتها <em>صحيحة</em> في الملف <code>correct.csv</code></li>
<li>تكتب السطور التي نتيجتها <em>خاطئة</em> في الملف <code>incorrect.csv</code></li>
</ul>
<p>وباستخدام المثال أعلاه، يحوي الملف <code>correct.csv</code> على السطور التالية</p>
<pre><code class="language-sh">Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
</code></pre>
<p>أما السطورتان الأخريان فتكونان في الملف <code>incorrect.csv</code>.</p>
<p>يُرجى كتابة السطور بنفس الترتيب الذي تظهر به في الملف الأصلي. ولا تغيّر الملف الأصلي.</p>
<p>ملاحظة: ينبغي أن تُعطي الدالة النتيجة ذاتها بالضبط، مهما كان عدد مرات استدعائها. أي أنه لا يهم إن استُدعيت الدالة مرة واحدة</p>
<pre><code class="language-python">filter_solutions()
</code></pre>
<p>أو عدة مرات متتالية</p>
<pre><code class="language-python">filter_solutions()
filter_solutions()
filter_solutions()
filter_solutions()
</code></pre>
<p>وبعد التنفيذ، ينبغي أن يكون محتوى الملفين <code>correct.csv</code> و<code>incorrect.csv</code> متطابقًا بالضبط في الحالتين.</p>
<blockquote>
<p><strong>تمرين برمجي: تخزين البيانات الشخصية</strong></p>
<p>يُرجى كتابة دالة اسمها <code>store_personal_data(person: tuple)</code>، تأخذ صفًّا (tuple) يحوي بعض المعلومات التعريفية كوسيط لها.</p>
</blockquote>
<p>ويحوي الصف العناصر التالية:</p>
<ul>
<li>الاسم (سلسلة نصية)</li>
<li>العمر (عدد صحيح)</li>
<li>الطول (عدد عشري)</li>
</ul>
<p>تُعالَج هذه البيانات وتُكتب في الملف <code>people.csv</code>. وقد يحوي الملف بعض البيانات أصلًا؛ ويذهب السطر الجديد إلى نهاية الملف. وينبغي كتابة البيانات بالصيغة</p>
<p>name;age;height</p>
<p>ويجب أن يكون كل سطر في سطر مستقل. وإذا استدعينا الدالة بالوسيط <code>(&quot;Paul Paulson&quot;, 37, 175.5)</code>، فكتبت الدالة هذا السطر في نهاية الملف:</p>
<p><code>Paul Paulson;37;175.5</code></p>
<h2 id="معالجة-البيانات-بصيغة-csv">معالجة البيانات بصيغة CSV</h2>
<p>لنكتب برنامجًا يقيّم أداء الطلاب في مقرر. يقرأ البرنامج ملف CSV يحوي نقاط التمارين الأسبوعية التي حصل عليها الطلاب. ثم يحسب البرنامج مجموع النقاط ويحدّد الدرجة التي حصل عليها كل طالب. وأخيرًا، ينشئ البرنامج ملف CSV يحوي مجموع النقاط والدرجة لكل طالب.</p>
<p>ويبدو ملف CSV المُعطى مُدخَلًا للبرنامج هكذا:</p>
<pre><code>Peter;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Susan;3;4;3;5;3;4;4
Emily;6;6;5;5;0;4;8
</code></pre>
<p>ينقسم منطق البرنامج إلى ثلاث دوال: قراءة الملف ومعالجة محتواه إلى صيغة يمكن التعامل معها، وتحديد الدرجة، وكتابة الملف.</p>
<p>ويُقرأ الملف وفق المبادئ المذكورة في القسم السابق. وتُخزَّن البيانات في قاموس (dictionary)، حيث يكون المفتاح اسم الطالب، والقيمة قائمة بالنقاط التي حصل عليها الطالب، بصيغة عدد صحيح:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">read_weekly_points</span>(<span class="hljs-params">filename</span>):
    weekly_points = {}
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename) <span class="hljs-keyword">as</span> my_file:
        <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> my_file:
            parts = line.split(<span class="hljs-string">&quot;;&quot;</span>)
            point_list = []
            <span class="hljs-keyword">for</span> points <span class="hljs-keyword">in</span> parts[<span class="hljs-number">1</span>:]:
                point_list.append(<span class="hljs-built_in">int</span>(points))
            weekly_points[parts[<span class="hljs-number">0</span>]] = point_list

    <span class="hljs-keyword">return</span> weekly_points
</code></pre>
<p>والدالة الثانية لتحديد الدرجة بناءً على النقاط المُستلَمة. وتُستخدم هذه الدالة بدورها من قبل الدالة الثالثة، التي تكتب النتائج في الملف.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">grade</span>(<span class="hljs-params">points</span>):
    <span class="hljs-keyword">if</span> points &lt; <span class="hljs-number">20</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">elif</span> points &lt; <span class="hljs-number">25</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">elif</span> points &lt; <span class="hljs-number">30</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>
    <span class="hljs-keyword">elif</span> points &lt; <span class="hljs-number">35</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>
    <span class="hljs-keyword">elif</span> points &lt; <span class="hljs-number">40</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">4</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">5</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">save_results</span>(<span class="hljs-params">filename, weekly_points</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename, <span class="hljs-string">&quot;w&quot;</span>) <span class="hljs-keyword">as</span> my_file:
        <span class="hljs-keyword">for</span> name, point_list <span class="hljs-keyword">in</span> weekly_points.items():
            point_sum = <span class="hljs-built_in">sum</span>(point_list)
            my_file.write(<span class="hljs-string">f&quot;<span class="hljs-subst">{name}</span>;<span class="hljs-subst">{point_sum}</span>;<span class="hljs-subst">{grade(point_sum)}</span>\\n&quot;</span>)
</code></pre>
<p>يتيح لنا هذا البناء كتابة دالة رئيسية بسيطة للغاية. لاحظ كيف تُعطى أسماء الملفات التي تُقرأ وتُكتب ضمن وسائط الدالة الرئيسية:</p>
<pre><code class="language-python">weekly_points = read_weekly_points(<span class="hljs-string">&quot;weekly_points.csv&quot;</span>)
save_results(<span class="hljs-string">&quot;results.csv&quot;</span>, weekly_points)
</code></pre>
<p>وعند تنفيذ الدالة الرئيسية يبدو محتوى الملف <code>results.csv</code> الناتج هكذا:</p>
<pre><code>Peter;18;0
Paula;34;3
Susan;26;2
Emily;41;5
</code></pre>
<p>لاحظ أن كل دالة معرّفة أعلاه بسيطة نسبيًّا، ولكل منها مسؤولية واحدة. وهذا منهج شائع ومُوصى به عند برمجة مجموعات أكبر. ويجعل مبدأ المسؤولية الواحدة التحقق من الوظائف أسهل، كما أنه يسهّل إجراء تعديلات على البرنامج لاحقًا وإضافة ميزات جديدة.</p>
<p>فلنقول إن أردنا إضافة دالة لطباعة درجة طالب بعينه. فلدينا بالفعل دالة تحدّد درجة الطالب، لذا يمكننا استخدامها في دالتنا الجديدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">get_grade</span>(<span class="hljs-params">student_name, weekly_points</span>):
    <span class="hljs-keyword">for</span> name, point_list <span class="hljs-keyword">in</span> weekly_points.items():
        <span class="hljs-keyword">if</span> name == student_name:
            <span class="hljs-keyword">return</span> grade(<span class="hljs-built_in">sum</span>(point_list))


weekly_points = read_weekly_points(<span class="hljs-string">&quot;weekly_points.csv&quot;</span>)
<span class="hljs-built_in">print</span>(get_grade(<span class="hljs-string">&quot;Paula&quot;</span>, weekly_points))

</code></pre>
<pre><code>3
</code></pre>
<p>وإذا قررنا أن وظيفة معينة في البرنامج بحاجة إلى إصلاح، فإن التغيير في البرنامج المُصمَّم جيدًا لا يمسّ إلا أقسامًا محدَّدة من الشيفرة، وسيكون تحديد مواضع التغيير أسهل. فمثلًا، لو أردنا تغيير حدود الدرجات، لكفانا بتطبيق التغيير في الدالة المخصّصة لتحديد الدرجة، وسينجح ذلك أيضًا في جميع الدوال الأخرى التي تستخدم هذه الدالة. ولو كانت شيفرة هذه الوظيفة الواحدة مُطبَّقة في مواضع متعددة، لكان هناك خطر محدَّد بأن ننسى تغيير جميع مواضعها عند تغيير الوظيفة.</p>
<blockquote>
<p><strong>تمرين برمجي: تقييم الدورة، الجزء 4</strong></p>
<p>لنعد إلى مشروع درجة المقرر من القسم السابق.</p>
</blockquote>
<p>وكما توقفنا عند ذلك في المرة الماضية، كان البرنامج يقرأ ملفات تحتوي على معلومات الطلاب والتمارين المنجزة ونتائج الاختبارات ويعالجها. وسنضيف ملفًا يحوي معلومات عن المقرر. ومثال على صيغة الملف:</p>
<pre><code>&lt;pre&gt;

name: Introduction to Programming
study credits: 5
&lt;/pre&gt;
</code></pre>
<p>ثم ينبغي للبرنامج إنشاء ملفين. ينبغي أن يكون هناك ملف اسمه <code>results.txt</code> بالمحتوى التالي:</p>
<pre><code>&lt;pre&gt;
Introduction to Programming, 5 credits
======================================
name                          exec_nbr  exec_pts. exm_pts.  tot_pts.  grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
&lt;/pre&gt;
</code></pre>
<p>قسم الإحصاءات مطابق للنتائج المطبوعة في الجزء الثالث من المشروع. والإضافة الوحيدة هنا هي قسم الترويسة.</p>
<p>بالإضافة إلى ذلك، ينبغي أن يكون هناك ملف اسمه <code>results.csv</code> بالصيغة التالية:</p>
<pre><code>&lt;pre&gt;
12345678;pekka peloton;0
12345687;jaana javanainen;1
12345699;liisa virtanen;3
&lt;/pre&gt;
</code></pre>
<p>وعند تنفيذ البرنامج، ينبغي أن يبدو هكذا:</p>
<pre><code>Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
Course information: **course1.txt**
Results written to files results.txt and results.csv
</code></pre>
<p>أي أن البرنامج لا يسأل إلا عن أسماء ملفات الإدخال. وينبغي كتابة كل المخرجات في الملفات. ولن يرى المستخدم سوى رسالة تؤكّد ذلك.</p>
<p><strong>ملاحظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<blockquote>
<p><strong>تمرين برمجي: البحث عن الكلمات</strong></p>
<p>يضمّ قالب التمرين الملف <code>words.txt</code>، الذي يحوي كلمات بالإنجليزية.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>find_words(search_term: str)</code>. تُعيد الدالة قائمة تحوي جميع كلمات الملف التي تطابق مصطلح البحث.</p>
<p>وقد يحوي مصطلح البحث أحرفًا صغيرة ومحارف البدل التالية:</p>
<ul>
<li>يعني المحور <code>.</code> أنه يُقبَل أي محرف واحد مكانه. فمثلًا، يُرجع <code>ca.</code> كلمات مثل <em>cat</em> و_car_، ويرجع <code>p.ng</code> كلمات مثل <em>ping</em> و_pong_، ويرجع <code>.a.e</code> كلمات مثل <em>sane</em> و_care_ و_late_.</li>
<li>تعني النجمة <code>*</code> في <em>نهاية</em> مصطلح البحث أنه يُقبَل أي كلمة <em>تبدأ</em> بمصطلح البحث. وتعني النجمة في <em>بداية</em> مصطلح البحث أنه يُقبَل أي كلمة <em>تنتهي</em> بمصطلح البحث. فمثلًا، يُرجع <code>ca*</code> كلمات مثل <em>california</em> و_cat_ و_caring_ و_catapult_، بينما يُرجع <code>*ane</code> كلمات مثل <em>crane</em> و_insane_ و_aeroplane_. ولا يمكن أن تكون هناك أكثر من نجمة واحدة في مصطلح البحث.</li>
<li>وإذا لم تكن هناك محارف بدل في مصطلح البحث، تُعاد الكلمات التي تطابق مصطلح البحث تمامًا فقط.</li>
</ul>
<p>يمكنك أن تفترض أن كلا البدلتين لا تُستخدمان معًا في مصطلح البحث الواحد.</p>
<p>وكلمات الملف مكتوبة بأحرف صغيرة. ويمكنك أيضًا أن تفترض أن وسيط الدالة سيكون بأحرف صغيرة بالكامل.</p>
<p>وإذا لم تُعثر على كلمات مطابقة، ينبغي أن تُعيد الدالة قائمة فارغة.</p>
<p>تلميح: قد يكون تابعا السلسلة النصية في Python وهما <code>startswith()</code> و<code>endswith()</code> مفيدين هنا. ويمكنك البحث عن مزيد من المعلومات عنهما عبر الإنترنت.</p>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(find_words(<span class="hljs-string">&quot;*vokes&quot;</span>))
</code></pre>
<pre><code>['convokes', 'equivokes', 'evokes', 'invokes', 'provokes', 'reinvokes', 'revokes']
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: قاموس مخزَّن في ملف</strong></p>
<p>يُرجى كتابة برنامج يعمل كقاموس. يمكن للمستخدم كتابة سطور جديدة أو البحث عن سطور موجودة.</p>
</blockquote>
<p>ويجب أن يعمل البرنامج على النحو التالي:</p>
<pre><code>1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **auto**
The word in English: **car**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **roska**
The word in English: **garbage**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **laukku**
The word in English: **bag**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **bag**
roska - garbage
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **car**
auto - car
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **laukku**
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **3**
Bye!
</code></pre>
<p>وتُكتب سطور القاموس في ملف اسمه <code>dictionary.txt</code>. وينبغي للبرنامج قراءة محتوى الملف أولًا. وتُكتب السطور الجديدة في نهاية الملف كلما أُضيفت إلى القاموس.</p>
<p>وتبقى صيغة البيانات المخزّنة في القاموس اختيارًا منك.</p>
<p><strong>ملاحظة:</strong> قد تغيّر الاختبارات الآلية لهذا التمرين محتوى الملف. إذا أردت الاحتفاظ بمحتواه، فانسخ الملف أولًا باسم مختلف.</p>
<p><strong>ملاحظة 2:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 69694e01-4c47-5b9d-8a00-b0d96a477dc7)

-->
`,l={book:s,chapter:n,chapterTitle:e,slug:a,title:p,headings:o,html:t};export{s as book,n as chapter,e as chapterTitle,l as default,o as headings,t as html,a as slug,p as title};
