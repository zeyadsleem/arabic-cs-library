const n="mooc",s="part-3",a="الجزء 3: الحلقات",e="4-defining-functions",p="تعريف الدوال",o=[{depth:2,id:"معمل-شيفرة-بارسونز",text:"معمل شيفرة بارسونز"},{depth:2,id:"تعريف-الدالة",text:"تعريف الدالة"},{depth:2,id:"وسائط-الدالة",text:"وسائط الدالة"},{depth:2,id:"مزيد-من-الأمثلة",text:"مزيد من الأمثلة"},{depth:2,id:"تحذير-استخدام-المتغيرات-العامة-داخل-الدوال",text:"تحذير: استخدام المتغيّرات العامة داخل الدوال"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تكتب دوالك الخاصة وتستدعيها</li>
<li>ستفهم ما يُقصد بالوسيط وبالمعامل في الدالة</li>
<li>ستتمكّن من تعريف المعاملات في دوالك الخاصة</li>
</ul>
</blockquote>
<h2 id="معمل-شيفرة-بارسونز">معمل شيفرة بارسونز</h2>
<p>ضمن أبحاث جارية في تعليم علوم الحاسوب في جامعة هلسنكي، يجري تطوير برمجية جديدة للتدريب على البرمجة اسمها معمل شيفرة بارسونز (Parsons Code Lab). وفي هذه البرمجية تحلّ تمارين برمجية على هيئة <a href="https://en.wikipedia.org/wiki/Parsons_problem">مسائل بارسونز</a>، عبر ترتيب كتل الشيفرة وملئها.</p>
<p>بالضغط على الرابط أدناه ستحصل على مجموعة من التمارين تتيح لك مراجعة كثير من المفاهيم البرمجية الأساسية التي تعلّمتها حتى الآن: الحلقات، والجمل الشرطية، وعمليات السلاسل النصية، وما شابه. وهذه التمارين مادة اختيارية داعمة ولن تؤثر على التقييم بأي شكل. غير أن معلم الدورة يستطيع الاطلاع على إحصاءات محاولات التمارين عبر لوحة تحكم المعلم في البرمجية.</p>
<p><a href="https://parsonscodelab.web.helsinki.fi/laurasini/set/introduction-to-programming-halfway-review">إلى التمارين</a></p>
<p>يُرجى ملاحظة أن البرمجية قيد التطوير النشط، وقد تكون هناك بعض المشكلات.
يُرجى المساعدة في تطويرها عبر مشاركة أي مشكلات وملاحظات ممكنة من خلال استبيان ملاحظات مجهول الهوية! سيستغرق ملؤه نحو دقيقة واحدة، لكنه سيساعد في تطويرها مستقبلًا بما لا يُقدَّر.</p>
<p><a href="https://elomake.helsinki.fi/lomakkeet/IYqXp/lomake.html">شارك ملاحظاتك</a></p>
<p>قد تُستخدم نشاطات التمارين والملاحظات في الأبحاث بصيغة مجهولة الهوية تمامًا.
شكرًا على مساهمتك!</p>
<h2 id="تعريف-الدالة">تعريف الدالة</h2>
<p>لقد استخدمنا دوال مثل <code>len</code> و<code>print</code> و<code>input</code> في برامجنا من قبل. وهذه دوال مدمجة في Python، لذا فهي دائمًا جاهزة بين يديك مهما كانت البيئة التي تبرمج فيها. لكن من الممكن أيضًا أن تُعرّف دوالك الخاصة.</p>
<p>قبل أن يمكن استخدام دالة، يجب أن تُعرَّف أولًا. ويبدأ أي تعريف للدالة بالكلمة المفتاحية <code>def</code>، وهي اختصار لكلمة <em>تعريف</em> (<em>define</em>). ثم يأتي <em>اسم</em> الدالة، تليه قوسان وشرطة نقطتان. وتُسمَّى هذه <em>ترويسة</em> (<em>header</em>) الدالة. وبعدها يأتي <em>جسم</em> (<em>body</em>) الدالة مُزاحًا إلى الداخل تمامًا ككتلتَي <code>while</code> و<code>if</code>.</p>
<p>فمثالًا، تُعرِّف الشيفرة التالية الدالة <code>message</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">message</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This is my very own function!&quot;</span>)
</code></pre>
<p>إذا نُفِّذ البرنامج أعلاه فلا يبدو أن شيئًا يحدث. والسبب في ذلك أن الشيفرة الموجودة في جسم الدالة لا تُنفَّذ إلا عندما تُستدعى الدالة.</p>
<p>استدعاء الدالة لا يحتاج سوى إلى ذكر اسمها في شيفرتك. فإضافة استدعاء للدالة إلى نهاية البرنامج أعلاه، هكذا</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">message</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This is my very own function!&quot;</span>)

message()
</code></pre>
<p>ينتج عن ذلك أمرٌ مطبوع:</p>
<pre><code>This is my very own function!
</code></pre>
<p>وحين تكون الدالة معرَّفة يمكن استدعاؤها عدة مرات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">message</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This is my very own function!&quot;</span>)

message()
message()
message()
</code></pre>
<pre><code>This is my very own function!
This is my very own function!
This is my very own function!
</code></pre>
<blockquote>
<p><strong>اختبار دوالك الخاصة</strong></p>
<p>ملاحظة: اعتبارًا من الآن، ستطلبك معظم تمارين هذه الدورة كتابة دوالك الخاصة.</p>
<p>حين يتكوّن برنامج من دوال فقط، لا يبدو لتنفيذه أي أثر. والشيفرة التالية لا تطبع شيئًا، رغم أنها تحتوي على أمر طباعة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">greet</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)
</code></pre>
<p>سبب عدم طباعة أي شيء هو أن الشيفرة الموجودة في جسم الدالة <code>greet</code> لا تُنفَّذ إلا عند استدعاء الدالة.</p>
<p>ينبغي أن يحتوي برنامج «main» الواقع أسفل الدالة على استدعاءات دوال مناسبة، كي يمكن اختبار البرنامج. وفي الواقع، تتعامل Python مع كل شيفرة لا تقع داخل تعريفات الدوال باعتبارها جزءًا من <em>الدالة الرئيسية</em> (<em>main function</em>)، وهي التي تُنفَّذ عند تقييم الملف نفسه أو تنفيذه. فلنضف استدعاء دالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">greet</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)

<span class="hljs-comment"># All code not within function definitions is part of</span>
<span class="hljs-comment"># the main function of the program</span>
<span class="hljs-comment"># Calling our function:</span>

greet()
</code></pre>
<p><strong>مهم</strong>: في هذه الدورة تتطلب الاختبارات الأوتوماتيكية التي تُشغَّل على ملفات التمارين أن تكون الدالة الرئيسية فارغة. فلا ينبغي ترك أي أمر في الدالة الرئيسية ضمن حلّك. أي أن أي شيفرة تستخدمها أنت في الاختبار يجب أن تكون داخل كتلة <code>if</code> معرَّفة خصيصًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">greet</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)

<span class="hljs-comment"># Write your main function within a block like this:</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    greet()
</code></pre>
<p>وأي شيفرة تُترك خارج الكتلة أعلاه تسبّب خطأ:</p>
<p><img src="/arabic-cs-library/images/mooc/part-3/3_4_1.png" alt="3_4_1.png"></p>
<p>والهدف من ذلك هو التأكّد من اختبار حلّك على أرضية نظيفة، لأن الاختبارات تفحص غالبًا ما تطبعه دوالك. ومن المفيد ملاحظة أن الاختبارات لا تنفّذ أي شيفرة من داخل الكتلة <code>if __name__ == &quot;__main__&quot;</code>، لذا ينبغي ألّا تضع داخل الكتلة أي شيفرة لازمة لاستيفاء متطلّبات التمرين.</p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الإخوة السبعة</strong></p>
<p>يُرجى كتابة دالة اسمها <code>seven_brothers</code>. وحين تُستدعى الدالة فينبغي أن تطبع أسماء الإخوة السبعة بالترتيب الأبجدي، كما في المثال أدناه. راجع <a href="/arabic-cs-library/book/mooc/part-1/1-getting-started#programming-exercise-fix-the-code-seven-brothers">التمرين الذي يحمل الاسم نفسه في الجزء 1</a> لمزيد من التفاصيل عن الإخوة.</p>
</blockquote>
<pre><code>Aapo
Eero
Juhani
Lauri
Simeoni
Timo
Tuomas
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="وسائط-الدالة">وسائط الدالة</h2>
<p>غالبًا ما تأخذ الدالة واحدًا أو أكثر من <em>الوسائط</em> (<em>arguments</em>)، وقد تؤثر في ما تفعله الدالة. فمثلًا، تأخذ الدالتان المدمجتان <code>print</code> و<code>input</code> في Python النص المطلوب عرضه كوسيط:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi!&quot;</span>)                           <span class="hljs-comment"># argument is the string &quot;Hi!&quot;</span>
name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)    <span class="hljs-comment"># argument is the string &quot;What is your name? &quot;</span>
<span class="hljs-built_in">print</span>(name)                            <span class="hljs-comment"># argument is the value of the variable name</span>
</code></pre>
<p>سبق أن ذكرنا أن مصططلحي <em>الوسيط</em> (<em>argument</em>) و_المعامل_ (<em>parameter</em>) يُستعملان في الغالب للإشارة إلى الشيء نفسه. والفرق أن <em>الوسيط</em> يُستعمل للبيانات المُمرَّرة إلى الدالة عند استدعائها، أما <em>داخل</em> الدالة فتُسنَد الوسائط إلى متغيّرات تُسمّى <em>معاملات</em>. أي، بتقريبٍ تام، حين نستدعي الدالة نسمّي قطع البيانات المُمرَّرة وسائط، وحين نعرّف الدالة نسمّيها معاملات.</p>
<p>قد يبدو هذا تمييزًا دلاليًا غير مجدٍ، ولمّا كانت الأمور أغمق قليلًا، فإن ليس جميع المصادر تتبنّى هذا التعريف. لكننا في هذه الدورة نحاول إبقاء هذا التمييز واضحًا، إذ إن معرفة المصطلح الصحيح ستساعدك على فهم مصادر أخرى إلى جانب مادة هذه الدورة.</p>
<p>لنعرّف بعض الدوال التي تأخذ وسائط. وفي تعريف الدالة، تُعرَّف المعاملات بين القوسين الواقعين بعد اسم الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>(<span class="hljs-params">target</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>, target)
</code></pre>
<p>استدعاء هذه الدالة مرتين، هكذا</p>
<pre><code class="language-python">hello(<span class="hljs-string">&quot;Emily&quot;</span>)
hello(<span class="hljs-string">&quot;world!&quot;</span>)
</code></pre>
<p>يطبع تحيّةين مختلفتين:</p>
<pre><code>Hello Emily
Hello world!
</code></pre>
<p>فلننظر عن قرب إلى تعريف الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>(<span class="hljs-params">target</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>, target)
</code></pre>
<p>في السطر الأول، أي في ترويسة الدالة، صرّحنا بأن هذه الدالة تأخذ وسيطًا وتُسنِده إلى معامل اسمُه <code>target</code>. وفي جسم الدالة يستخدم الأمر <code>print</code> القيمة المخزّنة في <code>target</code>.</p>
<p>وحين تُستدعى الدالة يحمل المعامل <code>target</code> القيمة المُعطاة كوسيط في استدعاء الدالة. فمثلًا، استدعاء الدالة التالي</p>
<pre><code class="language-python">name = <span class="hljs-string">&quot;Alan&quot;</span>
hello(name)
</code></pre>
<p>يجعل المعامل <code>target</code> يُضبط على القيمة <code>&quot;Alan&quot;</code>.</p>
<p>تتبع أسماء الدوال ومعاملاتها المبادئ نفسها التي تتبعها أسماء المتغيّرات. فينبغي أن تكون وصفية، وأن تتكوّن أساسًا من أحرف صغيرة ومحارف شرطة سفلية. ومرة أخرى، هناك بعض الاستثناءات لهذه الإرشادات، لكننا سنتجاهلها الآن.</p>
<blockquote>
<p><strong>تمرين تفاعلي: المحرف الأول</strong></p>
<p>يحتوي التمرين على الهيكل العظمي للدالة <code>first_character</code>. يُرجى إكماله بحيث يطبع المحرف الأول من السلسلة النصية التي تأخذها كوسيط.</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">first_character</span>(<span class="hljs-params">text</span>):
     <span class="hljs-comment"># write your code here</span>

<span class="hljs-comment"># testing the function:</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    first_character(<span class="hljs-string">&#x27;python&#x27;</span>)
    first_character(<span class="hljs-string">&#x27;yellow&#x27;</span>)
    first_character(<span class="hljs-string">&#x27;tomorrow&#x27;</span>)
    first_character(<span class="hljs-string">&#x27;heliotrope&#x27;</span>)
    first_character(<span class="hljs-string">&#x27;open&#x27;</span>)
    first_character(<span class="hljs-string">&#x27;night&#x27;</span>)
</code></pre>
<pre><code>p
y
t
h
o
n
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>اختبار دوالك ذات الوسائط</strong></p>
<p>كلما كانت دالتك تأخذ واحدًا أو أكثر من الوسائط، فيُستحسن أن تختبرها بوسائط مختلفة متنوعة.</p>
<p>وانتبه خصوصًا إلى «الحالات الخاصة» الخاصة بنوع الوسيط الذي تستخدمه. كيف تتصرّف دالتك إذا كان الوسيط صفرًا أو عددًا سالبًا، أو عددًا عشريًا بدل عدد صحيح؟ وماذا يحدث إذا كان الوسيط سلسلة نصية فارغة؟</p>
<p>فإذا لم تطلب منك المهمة صراحةً تضمين استدعاءات للدوال، فيجوز لك أن تضمّن استدعاءاتك الخاصة داخل كتلة <code>if</code> الخاصة بالدالة الرئيسية كما شُرح أعلاه. وستتجاهل الاختبارات كل ما يقع داخل كتلة if.</p>
</blockquote>
<h2 id="مزيد-من-الأمثلة">مزيد من الأمثلة</h2>
<p>فلننظر إلى مزيد من أمثلة الدوال التي تأخذ وسائط. وفي تعريف الدالة التالي يكون المعامل عددًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">squared</span>(<span class="hljs-params">x</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The square of the number <span class="hljs-subst">{x}</span> is <span class="hljs-subst">{x * x}</span>&quot;</span>)

squared(<span class="hljs-number">2</span>)
squared(<span class="hljs-number">5</span>)
</code></pre>
<pre><code>The square of the number 2 is 4
The square of the number 5 is 25
</code></pre>
<p>وفي المقابل، يحتوي تعريف الدالة هذا على جملة <code>if</code> داخل جسم الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>(<span class="hljs-params">name</span>):
    <span class="hljs-keyword">if</span> name == <span class="hljs-string">&quot;Emily&quot;</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>, name)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi&quot;</span>, name)

hello(<span class="hljs-string">&quot;Emily&quot;</span>)
hello(<span class="hljs-string">&quot;Mark&quot;</span>)
</code></pre>
<pre><code>Hello Emily
Hi Mark
</code></pre>
<p>تأخذ هذه الدالة وسيطين:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum</span>(<span class="hljs-params">x, y</span>):
    result = x + y
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The sum of the arguments <span class="hljs-subst">{x}</span> and <span class="hljs-subst">{y}</span> is <span class="hljs-subst">{result}</span>&quot;</span>)

<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
<span class="hljs-built_in">sum</span>(<span class="hljs-number">5</span>, <span class="hljs-number">24</span>)
</code></pre>
<pre><code>The sum of the arguments 1 and 2 is 3
The sum of the arguments 5 and 24 is 29
</code></pre>
<p>وتتضمّن الدالة أيضًا المتغيّر المساعد <code>result</code>، الذي تستخدمه لتخزين مجموع وسائطها.</p>
<p>لاحظ كيف أن أسماء المعاملات في تعريف الدالة لا علاقة لها بأي متغيّرات خارجها. فلنا نستدعي الدالة أعلاه هكذا تمامًا:</p>
<pre><code class="language-python">x = <span class="hljs-number">100</span>
y = <span class="hljs-number">30</span>
<span class="hljs-built_in">sum</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
<span class="hljs-built_in">sum</span>(x + y, <span class="hljs-number">10</span>)
</code></pre>
<p>وهذا ينبغي أن يطبع</p>
<pre><code>The sum of the arguments 1 and 2 is 3
The sum of the arguments 130 and 10 is 140
</code></pre>
<p>في استدعاء الدالة الأول تُسنَد إلى المعاملين القيمتان <code>x = 1</code> و<code>y = 2</code>. وفي استدعاء الدالة الثاني تُسنَد إليهما القيمتان <code>x = 130</code> و<code>y = 10</code>، بغضّ النظر عن المتغيّرات المسمّاة بالأسماء نفسها المستخدَمة في استدعاء الدالة.</p>
<p>وسنعود إلى تعريفات الدوال في بداية الجزء التالي من الدورة.</p>
<!--يوجد تحذير مشابه في الأقسام 3-4 و4-6 و5-1، فتحقّق منها جميعًا إن عدّلته-->
<h2 id="تحذير-استخدام-المتغيرات-العامة-داخل-الدوال">تحذير: استخدام المتغيّرات العامة داخل الدوال</h2>
<p>في الأمثلة أعلاه رأينا أنه من الممكن إسناد متغيّرات جديدة داخل تعريفات الدوال. ويمكن للدالة أيضًا أن ترى متغيّرات مُسنَدة خارجها، في الدالة الرئيسية. وتُسمَّى هذه المتغيّرات متغيّرات <em>عامة</em> (<em>global</em>).</p>
<p>استخدام المتغيّرات العامة من داخل الدوال عادةً فكرة سيّئة. فإلى جانب مشكلات أخرى، قد يسبّب ذلك أخطاء يصعب تتبّعها.</p>
<p>فيما يلي مثال على دالة تستخدم متغيّرًا عامًّا «من باب الخطأ»:</p>
<pre><code class="language-python"><span class="hljs-comment"># this is a global variable</span>
name = <span class="hljs-string">&quot;Betty&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>(<span class="hljs-params">given_name</span>):
    <span class="hljs-comment"># using the global variable instead of the parameter by mistake</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello&quot;</span>, name)

hello(<span class="hljs-string">&quot;Steve&quot;</span>)
hello(<span class="hljs-string">&quot;Betty&quot;</span>)
</code></pre>
<pre><code>Hello Betty
Hello Betty
</code></pre>
<p>مهما استدعيتَ الدالة بعدد من الوسائط المختلفة، فستطبع دائمًا القيمة <code>&quot;Betty&quot;</code> المخزّنة في المتغيّر العام.</p>
<blockquote>
<p><strong>تمرين تفاعلي: المتوسط</strong></p>
<p>يُرجى كتابة دالة اسمها <code>mean</code>، تأخذ ثلاثة وسائط صحيحة. وينبغي أن تطبع الدالة المتوسط الحسابي للوسائط الثلاثة.</p>
</blockquote>
<pre><code class="language-python">mean(<span class="hljs-number">5</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>)
mean(<span class="hljs-number">10</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>)
</code></pre>
<pre><code>3.0
4.0
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: اطبع عدّة مرّات</strong></p>
<p>يُرجى كتابة دالة اسمها <code>print_many_times(text, times)</code>، تأخذ سلسلة نصية وعددًا صحيحًا كوسائط. ويحدد الوسيط الصحيح عدد مرّات طباعة الوسيط النصي:</p>
</blockquote>
<pre><code class="language-python">print_many_times(<span class="hljs-string">&quot;hi&quot;</span>, <span class="hljs-number">5</span>)

<span class="hljs-built_in">print</span>()

text = <span class="hljs-string">&quot;All Pythons, except one, grow up&quot;</span>
times = <span class="hljs-number">3</span>
print_many_times(text, times)
</code></pre>
<pre><code>hi
hi
hi
hi
hi

All Pythons, except one, grow up.
All Pythons, except one, grow up.
All Pythons, except one, grow up.
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: مربع من محارف الشباك</strong></p>
<p>يُرجى كتابة دالة اسمها <code>hash_square(length)</code>، تأخذ وسيطًا صحيحًا. وتطبع الدالة مربعًا من محارف الشباك، ويحدد الوسيط طول ضلع المربع.</p>
</blockquote>
<pre><code class="language-python">hash_square(<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>()
hash_square(<span class="hljs-number">5</span>)
</code></pre>
<pre><code>###
###
###

#####
#####
#####
#####
#####
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: رقعة شطرنج</strong></p>
<p>يُرجى كتابة دالة اسمها <code>chessboard</code>، تطبع رقعة شطرنج مكوّنة من الآحاد والأصفار. وتأخذ الدالة وسيطًا صحيحًا يحدد طول ضلع الرقعة. راجع الأمثلة أدناه للتفاصيل:</p>
</blockquote>
<pre><code class="language-python">chessboard(<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>()
chessboard(<span class="hljs-number">6</span>)
</code></pre>
<pre><code>101
010
101

101010
010101
101010
010101
101010
010101
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: كلمة مربَّعة</strong></p>
<p>يُرجى كتابة دالة اسمها <code>squared</code>، تأخذ وسيطًا من نوع سلسلة نصية ووسيطًا صحيحًا، وتطبع مربعًا من المحارف كما هو محدَّد في الأمثلة أدناه.</p>
</blockquote>
<pre><code class="language-python">squared(<span class="hljs-string">&quot;ab&quot;</span>, <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>()
squared(<span class="hljs-string">&quot;aybabtu&quot;</span>, <span class="hljs-number">5</span>)
</code></pre>
<pre><code>aba
bab
aba

aybab
tuayb
abtua
ybabt
uayba
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: b04f1d8b-d207-5a8c-abbd-e42a3af7c12d)

-->
<p>يُرجى الإجابة على استبيان سريع حول مادة هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 4420ccdc-8422-598a-9057-89b32e8f282a)</p>
</blockquote>
`,t={book:n,chapter:s,chapterTitle:a,slug:e,title:p,headings:o,html:l};export{n as book,s as chapter,a as chapterTitle,t as default,o as headings,l as html,e as slug,p as title};
