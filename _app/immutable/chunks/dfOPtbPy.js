const n="mooc",s="part-1",p="الجزء 1: البدء",a="3-more-about-variables",e="المزيد عن المتغيّرات",l=[{depth:2,id:"تغيير-قيمة-متغير",text:"تغيير قيمة متغيّر"},{depth:2,id:"الأعداد-الصحيحة",text:"الأعداد الصحيحة"},{depth:2,id:"دمج-القيم-عند-الطباعة",text:"دمج القيم عند الطباعة"},{depth:2,id:"الطباعة-باستخدام-السلاسل-النصية-ذات-البادئة-f",text:"الطباعة باستخدام السلاسل النصية ذات البادئة f"},{depth:2,id:"الأعداد-العشرية",text:"الأعداد العشرية"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على استخدام المتغيّرات في سياقات مختلفة</li>
<li>ستعرف أي نوع من البيانات يمكن تخزينه في المتغيّرات</li>
<li>ستفهم الفرق بين السلاسل النصية والأعداد الصحيحة والأعداد العشرية</li>
</ul>
</blockquote>
<p>يُرجى ملء هذا الاستبيان قبل أن تبدأ في هذا القسم. ستحصل على نقطة تمرين مقابل الإجابة.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 87834513-84c8-5714-90b1-404e2943ad90)</p>
</blockquote>
<p>تُستخدم المتغيّرات لأغراض مختلفة في البرمجة. ويمكنك استخدام المتغيّرات لتخزين أي معلومة ستحتاج إليها لاحقًا أثناء تنفيذ البرنامج.</p>
<p>في برمجة Python تُنشأ المتغيّرات هكذا:</p>
<p><code>variable_name = ...</code></p>
<p>هنا تعني <code>...</code> القيمةَ المخزّنة في المتغيّر.</p>
<p>مثلًا، حين استخدمتَ الأمر <code>input</code> لقراءة سلسلة نصية من المستخدم، خزّنتَ السلسلة النصية في متغيّر ثم استخدمتَ هذا المتغيّر لاحقًا في برنامجك:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi, &quot;</span> + name)
</code></pre>
<pre><code>What is your name? **Ghosty**
Hi, Ghosty
</code></pre>
<p>يمكن أيضًا تعريف القيمة المخزّنة في متغيّر باستخدام متغيّرات أخرى:</p>
<pre><code class="language-python">given_name = <span class="hljs-string">&quot;Paul&quot;</span>
family_name = <span class="hljs-string">&quot;Python&quot;</span>

name = given_name + <span class="hljs-string">&quot; &quot;</span> + family_name

<span class="hljs-built_in">print</span>(name)
</code></pre>
<pre><code>Paul Python
</code></pre>
<p>هنا القيم المخزّنة في المتغيّرات الثلاثة لا تأتي من مُدخَل المستخدم. فهي تبقى كما هي في كل مرة يُنفَّذ فيها البرنامج. ويشار إلى هذا بـ_الترميز الثابت_ (hard-coding) للبيانات في البرنامج.</p>
<h2 id="تغيير-قيمة-متغير">تغيير قيمة متغيّر</h2>
<p>وكما يوحي اسم <em>متغيّر</em> (<em>variable</em>)، فإن القيمة المخزّنة في المتغيّر يمكن أن تتغيّر. وفي القسم السابق لاحظنا أن القيمة الجديدة تحلّ محلّ القديمة.</p>
<p>أثناء تنفيذ البرنامج التالي، سيأخذ المتغيّر <code>word</code> ثلاث قيم مختلفة:</p>
<pre><code class="language-python">word = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a word: &quot;</span>)
<span class="hljs-built_in">print</span>(word)

word = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;And another word: &quot;</span>)
<span class="hljs-built_in">print</span>(word)

word = <span class="hljs-string">&quot;third&quot;</span>
<span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>Please type in a word: **first**
first
And another word: **second**
second
third
</code></pre>
<p>تتغيّر القيمة المخزّنة في المتغيّر في كل مرة يُسنَد فيها إلى المتغيّر قيمة جديدة.</p>
<p>يمكن اشتقاق القيمة الجديدة لمتغيّر من قيمته القديمة. وفي المثال التالي يُسنَد إلى المتغيّر <code>word</code> أولًا قيمة مبنية على مُدخَل المستخدم. ثم يُسنَد إليه قيمة جديدة، وهي القيمة القديمة مع ثلاث علامات تعجّب مضافة إلى نهايتها.</p>
<pre><code class="language-python">word = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a word: &quot;</span>)
<span class="hljs-built_in">print</span>(word)

word = word + <span class="hljs-string">&quot;!!!&quot;</span>
<span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>Please type in a word: **test**
test
test!!!
</code></pre>
<blockquote>
<p><strong>اختيار اسم جيد للمتغيّر</strong></p>
<ul>
<li>
<p>من المفيد في كثير من الأحيان تسمية المتغيّرات بحسب ما تُستخدم له. فمثلًا، إذا كان المتغيّر يحتوي على كلمة، فإن الاسم <code>word</code> خيار أفضل من الاسم <code>a</code> مثلًا.</p>
</li>
<li>
<p>لا يوجد حدّ ثابت لطول اسم المتغيّر في Python، لكن هناك قيود أخرى. ينبغي أن يبدأ اسم المتغيّر بحرف، ولا يمكن أن يحتوي إلا على حروف وأرقام وشرطات سفلية _.</p>
</li>
<li>
<p>الأحرف الصغيرة والحرف الكبيرة محارف مختلفة. المتغيّرات <code>name</code> و<code>Name</code> و<code>NAME</code> كلها متغيّرات مختلفة. ومع أن لهذه القاعدة بعض الاستثناءات، فإننا سنتجاهلها الآن.</p>
</li>
<li>
<p>من الممارسات الشائعة في برمجة Python استخدام أحرف صغيرة فقط في أسماء المتغيّرات. فإذا كان اسم المتغيّر يتكوّن من عدّة كلمات، فاستخدم الشرطة السفلية بين الكلمات. ومع أن لهذه القاعدة أيضًا بعض الاستثناءات، فإننا سنتجاهلها الآن.</p>
</li>
</ul>
</blockquote>
<h2 id="الأعداد-الصحيحة">الأعداد الصحيحة</h2>
<p>حتى الآن، لم نخزّن سوى السلاسل النصية في المتغيّرات، لكن هناك أيضًا أنواع كثيرة أخرى من المعلومات نرغب في تخزينها والوصول إليها لاحقًا. لننظر أولًا إلى الأعداد الصحيحة (integers). الأعداد الصحيحة هي أعداد لا تملك جزءًا عشريًا أو كسريًا، مثل <code>-15</code> و<code>0</code> و<code>1</code>.</p>
<p>ينشئ البرنامج التالي المتغيّر <code>age</code>، الذي يحتوي على قيمة عدد صحيح.</p>
<pre><code class="language-python">age = <span class="hljs-number">24</span>
<span class="hljs-built_in">print</span>(age)
</code></pre>
<p>لا يطبع البرنامج سوى ما يلي:</p>
<pre><code>24
</code></pre>
<p>لاحظ غياب علامات التنصيص هنا. فعليًا، إذا أضفنا علامات تنصيص حول العدد، فإن ذلك سيعني أن متغيّرنا لم يعد عددًا صحيحًا بل سلسلة نصية. ويمكن أن تحتوي السلسلة النصية على أرقام، لكن معالجتها تكون مختلفة.</p>
<p>إذًا، فلماذا يهمّ أن يكون للمتغيّرات نوع، مع أن البرنامج التالي لا يزال يطبع الشيء نفسه مرتين؟</p>
<pre><code class="language-python">number1 = <span class="hljs-number">100</span>
number2 = <span class="hljs-string">&quot;100&quot;</span>

<span class="hljs-built_in">print</span>(number1)
<span class="hljs-built_in">print</span>(number2)
</code></pre>
<pre><code>100
100
</code></pre>
<p>تهمّ أنواع المتغيّرات لأن العمليات المختلفة تؤثر في أنواع المتغيّرات المختلفة بطرق مختلفة. لننظر إلى مثال:</p>
<pre><code class="language-python">number1 = <span class="hljs-number">100</span>
number2 = <span class="hljs-string">&quot;100&quot;</span>

<span class="hljs-built_in">print</span>(number1 + number1)
<span class="hljs-built_in">print</span>(number2 + number2)
</code></pre>
<p>يطبع هذا ما يلي:</p>
<pre><code>200
100100
</code></pre>
<p>بالنسبة إلى القيم الصحيحة، تعني المشغّل <code>+</code> الجمع، أما بالنسبة إلى قيم السلاسل النصية فيعني الدمج، أي &quot;الالتحام في سلسلة واحدة&quot;.</p>
<p>ليست كل المشغّلات متاحة لكل أنواع المتغيّرات. فبينما يمكن قسمة الأعداد باستخدام مشغّل القسمة <code>/</code>، فإن محاولة قسمة سلسلة نصية على عدد تُسبّب خطأ:</p>
<pre><code class="language-python">number = <span class="hljs-string">&quot;100&quot;</span>
<span class="hljs-built_in">print</span>(number / <span class="hljs-number">2</span>)
</code></pre>
<pre><code>TypeError: unsupported operand type(s) for /: 'str' and 'int'
</code></pre>
<h2 id="دمج-القيم-عند-الطباعة">دمج القيم عند الطباعة</h2>
<p>وبالمثل، لن يعمل البرنامج التالي، لأن <code>&quot;The result is &quot;</code> و<code>result</code> من نوعين مختلفين:</p>
<pre><code class="language-python">result = <span class="hljs-number">10</span> * <span class="hljs-number">25</span>
<span class="hljs-comment"># the following line produces an error</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result is &quot;</span> + result)
</code></pre>
<p>لا يطبع البرنامج أي شيء، بل يطلق خطأً:</p>
<pre><code>TypeError: unsupported operand type(s) for +: 'str' and 'int'
</code></pre>
<p>هنا تخبرك Python أن دمج نوعين مختلفين من القيم لن ينجح بهذه البساطة. في هذه الحالة، <code>&quot;The result is &quot;</code> من نوع السلسلة النصية، بينما القيمة المخزّنة في <code>result</code> من النوع الصحيح.</p>
<p>وإذا أردنا فعلًا طباعة سلسلة نصية وعدد صحيح في أمر واحد، فيمكن تحويل العدد الصحيح إلى سلسلة نصية بدالة <code>str</code>، ثم دمج السلسلتين النصيتين كالمعتاد. فمثلًا، سيعمل هذا:</p>
<pre><code class="language-python">result = <span class="hljs-number">10</span> * <span class="hljs-number">25</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result is &quot;</span> + <span class="hljs-built_in">str</span>(result))
</code></pre>
<pre><code>The result is 250
</code></pre>
<p>وللأمر <code>print</code> كذلك إمكانيات مدمجة تدعم دمج أنواع مختلفة من القيم. وأبسط طريقة هي وضع فاصلة بين القيم. وستُطبع كل القيم بغضّ النظر عن نوعها:</p>
<pre><code class="language-python">result = <span class="hljs-number">10</span> * <span class="hljs-number">25</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result is&quot;</span>, result)
</code></pre>
<pre><code>The result is 250
</code></pre>
<p>لاحظ أنه أُضيف هنا تلقائيًا محرف مسافة بين القيم التي تفصلها فاصلة.</p>
<h2 id="الطباعة-باستخدام-السلاسل-النصية-ذات-البادئة-f">الطباعة باستخدام السلاسل النصية ذات البادئة f</h2>
<p>ماذا لو أردنا مرونة وتحكّمًا أكبر فيما نطبعه؟ إن ما يُسمى <em>السلاسل النصية ذات البادئة f</em> (<em>f-strings</em>) طريقة أخرى لتنسيق المخرجات في Python. قد يبدو بناء الجملة في البداية مربكًا بعض الشيء، لكن في النهاية تكون هذه السلاسل غالبًا أبسط طريقة لتنسيق النص.</p>
<p>مع السلاسل النصية ذات البادئة f سيبدو المثال السابق هكذا:</p>
<pre><code class="language-python">result = <span class="hljs-number">10</span> * <span class="hljs-number">25</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The result is <span class="hljs-subst">{result}</span>&quot;</span>)
</code></pre>
<p>لنقسّم هذا. في بداية السلسلة النصية التي نطبعها تمامًا يوجد المحرف <em>f</em>. وهذا يخبر Python أن ما يلي هو سلسلة نصية ذات البادئة f. وداخل السلسلة النصية، محاطًا بأقواس معقوفة، يوجد اسم المتغيّر <code>result</code>. وتصبح القيمة التي يحتوي عليها جزءًا من السلسلة النصية المطبوعة. والمخرجات مطابقة تمامًا لما في الأمثلة السابقة:</p>
<pre><code>The result is 250
</code></pre>
<p>يمكن أن تحتوي سلسلة نصية ذات بادئة f واحدة على عدّة متغيّرات. فمثلًا هذه الشيفرة</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Mark&quot;</span>
age = <span class="hljs-number">37</span>
city = <span class="hljs-string">&quot;Palo Alto&quot;</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Hi <span class="hljs-subst">{name}</span>, you are <span class="hljs-subst">{age}</span> years old. You live in <span class="hljs-subst">{city}</span>.&quot;</span>)
</code></pre>
<p>تطبع ما يلي:</p>
<pre><code>Hi Mark, you are 37 years old. You live in Palo Alto.
</code></pre>
<p>من الصعب إنشاء مخرجات مطابقة تمامًا لهذه باستخدام صيغة الفاصلة في الأمر <code>print</code>. فمثلًا، هذا البرنامج</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Mark&quot;</span>
age = <span class="hljs-number">37</span>
city = <span class="hljs-string">&quot;Palo Alto&quot;</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi&quot;</span>, name, <span class="hljs-string">&quot;, you are&quot;</span>, age, <span class="hljs-string">&quot;years old. You live in&quot;</span>, city, <span class="hljs-string">&quot;.&quot;</span>)
</code></pre>
<p>يطبع ما يلي:</p>
<pre><code>Hi Mark , you are 37 years old. You live in Palo Alto .
</code></pre>
<p>لاحظ المسافة التي أُدرجت تلقائيًا بين كل جزء مفصول بفاصلة في المخرجات. ومن الممكن تقنيًا منع <code>print</code> من إضافة المسافات الزائدة، لكنه لا يستحق العناء بما يمكننا بدلًا من ذلك استخدام السلاسل النصية ذات البادئة f.</p>
<p>في بساطتها، تكون صيغة الفاصلة في الأمر <code>print</code> مفيدة في كثير من الأحيان، لكنها أحيانًا تسبب متاعب أكثر مما تستحق. والسلاسل النصية ذات البادئة f عادةً خيار أكثر موثوقية. وفي الجزء 4 ستتعلّم المزيد عن الميزات المفيدة للسلاسل النصية ذات البادئة f فيما يتعلق بتنسيق المخرجات.</p>
<blockquote>
<p><strong>السلاسل النصية ذات البادئة f وإصدارات Python</strong></p>
<p>إذا كنت تستخدم إصدارًا أقدم من Python، فقد لا تعمل السلاسل النصية ذات البادئة f. فقد أُضيفت في الإصدار 3.6 من Python. وفي وقت لاحق من الدورة ستُنصّب Python على حاسوبك. وللأسف، لا تكون الإصدارات الأحدث من Python متاحة دائمًا لأنظمة التشغيل الأقدم. وإذا كان الأمر كذلك بالنسبة إلى حاسوبك، فيمكنك في الأجزاء الأولى من هذه الدورة تجربة هذه السلاسل في قوالب التمارين الموجودة داخل المتصفّح عندما تتطلب بعض التمارين استخدام السلاسل النصية ذات البادئة f.</p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: المسافة الزائدة</strong></p>
<p>صديقتك تعمل على تطبيق للباحثين عن عمل. وترسل لك هذه الشيفرة:</p>
</blockquote>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Tim Tester&quot;</span>
age = <span class="hljs-number">20</span>
skill1 = <span class="hljs-string">&quot;python&quot;</span>
level1 = <span class="hljs-string">&quot;beginner&quot;</span>
skill2 = <span class="hljs-string">&quot;java&quot;</span>
level2 = <span class="hljs-string">&quot;veteran&quot;</span>
skill3 = <span class="hljs-string">&quot;programming&quot;</span>
level3 = <span class="hljs-string">&quot;semiprofessional&quot;</span>
lower = <span class="hljs-number">2000</span>
upper = <span class="hljs-number">3000</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;my name is &quot;</span>, name, <span class="hljs-string">&quot; , I am &quot;</span>, age, <span class="hljs-string">&quot;years old&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;my skills are&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;- &quot;</span>, skill1, <span class="hljs-string">&quot; (&quot;</span>, level1, <span class="hljs-string">&quot;)&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;- &quot;</span>, skill2, <span class="hljs-string">&quot; (&quot;</span>, level2, <span class="hljs-string">&quot;)&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;- &quot;</span>, skill3, <span class="hljs-string">&quot; (&quot;</span>, level3, <span class="hljs-string">&quot; )&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;I am looking for a job with a salary of&quot;</span>, lower, <span class="hljs-string">&quot;-&quot;</span>, upper, <span class="hljs-string">&quot;euros per month&quot;</span>)
</code></pre>
<p>ينبغي للبرنامج أن يطبع <em>تمامًا</em> ما يلي:</p>
<pre><code>my name is Tim Tester, I am 20 years old

my skills are
 - python (beginner)
 - java (veteran)
 - programming (semiprofessional)

I am looking for a job with a salary of 2000-3000 euros per month
</code></pre>
<p>تعمل الشيفرة بشكل صحيح تقريبًا لكن ليس تمامًا. ويمرّن هذا التمرين بفحوص صارمة جدًّا تتحقّق من المخرجات في كل قطعة مسافة على حدة.</p>
<p>يُرجى إصلاح الشيفرة بحيث تبدو المخرجات صحيحة. ولاحظ بصيغة خاصة كيف تُدرج صيغة الفاصلة في الأمر <code>print</code> مسافة تلقائيًا حول الأجزاء المختلفة المفصولة بفواصل.</p>
<p>أسهل طريقة لتحويل الشيفرة بحيث تستوفي المتطلّبات هي استخدام السلاسل النصية ذات البادئة f.</p>
<p>تلميح: يمكنك طباعة سطر فارغ بإضافة أمر <code>print</code> فارغ، أو بإضافة محرف السطر الجديد <code>\\n</code> إلى سلسلتك النصية.</p>
<p>ولا تنسَ أن تكون شديد الدقة في تنسيق المخرجات أيضًا في المستقبل في هذه الدورة. فبعض التمارين فيها فحوص تتطلّب أن تكون مخرجاتك مطابقة تمامًا لما هو محدّد في الأمثلة المعطاة. فمثلًا، يُرجى استخدام محارف مسافة فعلية في شيفرتك بدلًا من رموز ASCII لمحارف المسافة، أو ما شابه.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="الأعداد-العشرية">الأعداد العشرية</h2>
<p>كلمة <code>Floating point number</code> أو <em>float</em> (عدد عشري) مصطلح ستصادفه كثيرًا في البرمجة. وهو يشير إلى الأعداد التي تحتوي على نقطة عشرية. ويمكن استخدامها إلى حد كبير بالطريقة نفسها التي تُستخدم بها القيم الصحيحة.</p>
<p>يحسب هذا البرنامج متوسط ثلاثة أعداد عشرية:</p>
<pre><code class="language-python">number1 = <span class="hljs-number">2.5</span>
number2 = -<span class="hljs-number">1.25</span>
number3 = <span class="hljs-number">3.62</span>

mean = (number1 + number2 + number3) / <span class="hljs-number">3</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Mean: <span class="hljs-subst">{mean}</span>&quot;</span>)
</code></pre>
<pre><code>Mean: 1.6233333333333333
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: الحسابات</strong></p>
<p>يحتوي هذا البرنامج أصلًا على متغيّرَي عدد صحيح، وهما <code>x</code> و<code>y</code>:</p>
</blockquote>
<pre><code class="language-python">x = <span class="hljs-number">27</span>
y = <span class="hljs-number">15</span>
</code></pre>
<p>يُرجى إكمال البرنامج بحيث يطبع أيضًا ما يلي:</p>
<pre><code>27 + 15 = 42
27 - 15 = 12
27 * 15 = 405
27 / 15 = 1.8
</code></pre>
<p>وينبغي أن يعمل البرنامج بشكل صحيح حتى لو تغيّرت قيمتا المتغيّرات. أي إذا استُبدل السطران الأولان بهذا</p>
<pre><code class="language-python">x = <span class="hljs-number">4</span>
y = <span class="hljs-number">9</span>
</code></pre>
<p>فينبغي أن يطبع البرنامج ما يلي:</p>
<pre><code>4 + 9 = 13
4 - 9 = -5
4 * 9 = 36
4 / 9 = 0.4444444444444444
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الشيفرة: اطبع سطرًا واحدًا</strong></p>
<p>يطبع كل أمر <code>print</code> عادةً سطرًا خاصًا به، منتهيًا بفاصل سطر. لكن إذا مُنح الأمر <code>print</code> وسيطًا إضافيًا هو <code>end = &quot;&quot;</code>، فلن يطبع فاصل سطر.</p>
</blockquote>
<p>فمثلًا:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;there!&quot;</span>)
</code></pre>
<pre><code>Hi there!
</code></pre>
<p>يُرجى إصلاح هذا البرنامج بحيث تُطبع العملية الحسابية كاملة، بما في ذلك نتيجتها، في سطر واحد. لا تغيّر عدد أوامر <code>print</code> المستخدَمة.</p>
<pre><code class="language-python">
<span class="hljs-built_in">print</span>(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; + &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-number">8</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; - &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot; = &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-number">5</span> + <span class="hljs-number">8</span> - <span class="hljs-number">4</span>)
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 49bf296e-41d1-5982-89a9-c784b630eaee)


-->
`,t={book:n,chapter:s,chapterTitle:p,slug:a,title:e,headings:l,html:o};export{n as book,s as chapter,p as chapterTitle,t as default,l as headings,o as html,a as slug,e as title};
