const n="mooc",s="part-7",a="الجزء 7: الوحدات",p="1-modules",e="الوحدات",o=[{depth:2,id:"العودة-إلى-تصحيح-الأخطاء",text:"العودة إلى تصحيح الأخطاء"},{depth:2,id:"استخدام-الوحدات",text:"استخدام الوحدات"},{depth:2,id:"تحديد-أقسام-معينة-من-وحدة",text:"تحديد أقسام معيّنة من وحدة"},{depth:2,id:"محتويات-الوحدة",text:"محتويات الوحدة"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما هي وحدة Python</li>
<li>ستكون قادرًا على تضمين وحدة في برنامجك باستخدام الأمر <code>import</code></li>
<li>ستعرف كيف تبحث عن مزيد من المعلومات عن محتويات الوحدات</li>
</ul>
</blockquote>
<h2 id="العودة-إلى-تصحيح-الأخطاء">العودة إلى تصحيح الأخطاء</h2>
<p>لقد صادفنا بالفعل عددًا لا بأس به من طرق تصحيح الأخطاء في هذه الدورة. ينبغي أن تكون <a href="http://www.pythontutor.com/visualize.html#mode=edit">أداة التصوير المرئي</a> مألوفة لك الآن، كما أصبحت <a href="/arabic-cs-library/book/mooc/part-2/1-programming_terminology#debugging">أوامر الطباعة التشخيصية</a> عادة قديمة راسخة. وربما جرّبت أيضًا <a href="/arabic-cs-library/book/mooc/part-4/1-vscode#the-built-in-debugger">مصحّح الأخطاء المدمج</a> في Visual Studio Code. وإذا واجهت مشكلات تتعلق بعدم عثور مصحّح الأخطاء على ملفاتك، فقد كانت هناك بعض النصائح للتعامل مع هذه الحالات في <a href="/arabic-cs-library/book/mooc/part-6/1-reading-files#debugging-code-which-handles-files">الجزء السابق</a>.</p>
<p>جاء الإصدار 3.7 من Python بأداة أخرى سهلة ومفيدة لتصحيح أخطاء البرامج: الأمر <a href="https://docs.python.org/3/library/functions.html?highlight=breakpoint#breakpoint">breakpoint()</a>.</p>
<p>يمكنك إضافة هذا الأمر إلى أي موضع في شيفرتك (ضمن القواعد النحوية المعتادة، بطبيعة الحال). وعند تشغيل البرنامج يتوقف التنفيذ عند الموضع الذي أدخلت فيه الأمر <code>breakpoint</code>. وفيما يلي مثال على جهود تصحيح الأخطاء عند إكمال أحد تمارين الجزء السابق (يُرجى تجاهل أسماء المتغيّرات الفنلندية في الصور، والتركيز على الوظيفة):</p>
<p><img src="/arabic-cs-library/images/mooc/part-7/7_1_1.png" alt="7_1_1.png"></p>
<p>عندما يتوقف التنفيذ عند الأمر <code>breakpoint</code>، تُفتح نافذة طرفية تفاعلية. وهنا يمكنك كتابة أي شيفرة كما تفعل في طرفية Python عادية، ورؤية كيف تعمل الشيفرة عند ذلك الموضع بالتحديد في البرنامج.</p>
<p>الأمر <code>breakpoint</code> مفيد بشكل خاص عندما تعرف أن سطرًا ما من الشيفرة يُسبّب خطأً، لكنك لا تعرف تمامًا سببه. أضف نقطة توقف قبل سطر الشيفرة المشكِل مباشرة وشغّل برنامجك. الآن يمكنك تجربة خيارات مختلفة في نافذة الطرفية التفاعلية، ومعرفة الأوامر الصحيحة التي ينبغي تضمينها في برنامجك.</p>
<p>ومن الممكن أيضًا متابعة التنفيذ من الموضع الذي توقف عنده. فالأمر <code>continue</code>، أو اختصاره <code>c</code>، المكتوب في طرفية تصحيح الأخطاء يستأنف التنفيذ حتى بلوغ نقطة التوقف التالية. وتُصوّر الصورة التالية حالة نُفّذت فيها الحلقة بالفعل بضع مرات:</p>
<p><img src="/arabic-cs-library/images/mooc/part-7/7_1_2.png" alt="7_1_2.png"></p>
<p>وهناك أيضًا بعض الأوامر الأخرى المتاحة في طرفية تصحيح الأخطاء. وقد تجدها <a href="https://docs.python.org/3/library/pdb.html#debugger-commands">هنا</a>، أو يمكنك كتابة <em>help</em> في طرفية تصحيح الأخطاء:</p>
<p><img src="/arabic-cs-library/images/mooc/part-7/7_1_3.png" alt="7_1_3.png"></p>
<p>الأمر <em>exit</em> يُنهي تنفيذ البرنامج.</p>
<p>عندما تنتهي من تصحيح الأخطاء، تذكّر إزالة أوامر <code>breakpoint</code> من شيفرتك!</p>
<h2 id="استخدام-الوحدات">استخدام الوحدات</h2>
<p>يحتوي تعريف لغة Python أصلًا على بعض الدوال المفيدة، مثل الدالة <code>len</code> التي تُعيد طول سلسلة نصية أو قائمة، أو الدالة <code>sum</code> التي تُعيد مجموع العناصر في بنية بيانات، لكن ذلك لن يكفي المبرمج إلا إلى حدّ معيّن. و_المكتبة القياسية_ (standard library) في Python مجموعة من الدوال والكائنات الموحّدة، يمكن استخدامها لتوسيع القدرة التعبيرية لـ Python بطرق كثيرة. وقد استخدمنا بالفعل بعض الدوال المعرّفة في المكتبة القياسية في تمارين سابقة، مثلًا عند حساب الجذور التربيعية.</p>
<p>وتتكوّن المكتبة القياسية من <em>وحدات</em> (modules) تحتوي على دوال وأصناف مجمّعة حول موضوعات ووظائف مختلفة. وفي هذا الجزء من الدورة سنتعرّف على بعض وحدات Python المفيدة. وسنتعلّم أيضًا كتابة وحداتنا الخاصة.</p>
<p>الأمر <code>import</code> يجعل محتويات الوحدة المعطاة متاحة في البرنامج الحالي. ولننظر عن قرب إلى العمل مع وحدة <code>math</code>. فهي تحتوي على تعريفات بعض الدوال الرياضية، مثل <code>sqrt</code> للجذر التربيعي و<code>log</code> للوغاريتم.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> math

<span class="hljs-comment"># The square root of the number 5</span>
<span class="hljs-built_in">print</span>(math.sqrt(<span class="hljs-number">5</span>))
<span class="hljs-comment"># the base 2 logarithm of the number 8</span>
<span class="hljs-built_in">print</span>(math.log(<span class="hljs-number">8</span>, <span class="hljs-number">2</span>))
</code></pre>
<pre><code>2.23606797749979
3.0
</code></pre>
<p>الدوال معرّفة في وحدة <code>math</code>، لذا يجب الإشارة إليها بالصيغة <code>math.sqrt</code> و<code>math.log</code> في شيفرة البرنامج.</p>
<h2 id="تحديد-أقسام-معينة-من-وحدة">تحديد أقسام معيّنة من وحدة</h2>
<p>وهناك طريقة أخرى لاستخدام الوحدات، وهي تحديد كيان معيّن من الوحدة بالأمر <code>from</code>. وإذا أردنا استخدام الدالتين <code>sqrt</code> و<code>log</code> فقط من وحدة <code>math</code>، فيمكننا فعل ما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> math <span class="hljs-keyword">import</span> sqrt, log

<span class="hljs-built_in">print</span>(sqrt(<span class="hljs-number">5</span>))
<span class="hljs-built_in">print</span>(log(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>))
</code></pre>
<p>وكما ترى أعلاه، لا نحتاج إلى بادئة <code>math</code> عند استخدام الدوال المستورَدة بهذه الطريقة.</p>
<p>وأحيانًا يكون من المفيد الاستيراد السريع لـ_جميع_ محتويات وحدة بترميز النجمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> math <span class="hljs-keyword">import</span> *

<span class="hljs-built_in">print</span>(sqrt(<span class="hljs-number">5</span>))
<span class="hljs-built_in">print</span>(log(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>))
</code></pre>
<p>ويمكن أن يكون استيراد الوحدات بترميز النجمة مفيدًا عند الاختبار وفي بعض المشاريع الأصغر، لكنه قد يطرح بعض المشكلات الجديدة أيضًا. وسنصادف هذه المشكلات لاحقًا.</p>
<blockquote>
<p><strong>تمرين برمجي: الوتر</strong></p>
<p>يُرجى كتابة دالة اسمها <code>hypotenuse(leg1: float, leg2: float)</code>، تأخذ طولَي الضلعين المجاورين للزاوية القائمة في مثلث قائم. وينبغي أن تُعيد الدالة طول الوتر، أي الضلع المقابل للزاوية القائمة.</p>
</blockquote>
<p>ويمكنك استخدام <a href="https://en.wikipedia.org/wiki/Pythagorean_theorem">مبرهنة فيثاغورس</a> لحساب النتيجة. وستحتاج إلى الدالة <code>sqrt</code> من وحدة <code>math</code>.</p>
<p>بعض الأمثلة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(hypotenuse(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)) <span class="hljs-comment"># 5.0</span>
<span class="hljs-built_in">print</span>(hypotenuse(<span class="hljs-number">5</span>,<span class="hljs-number">12</span>)) <span class="hljs-comment"># 13.0</span>
<span class="hljs-built_in">print</span>(hypotenuse(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)) <span class="hljs-comment"># 1.4142135623730951</span>
</code></pre>
<h2 id="محتويات-الوحدة">محتويات الوحدة</h2>
<p>تحتوي وثائق Python على موارد واسعة عن كل وحدة في مكتبة Python القياسية. وتضمّ الوثائق معلومات عن الدوال والتوابع المعرّفة في الوحدة، وكيف يمكن استخدام الوحدة. فمثلًا، هذا هو الرابط إلى وثائق وحدة <code>math</code>:</p>
<ul>
<li>https://docs.python.org/3/library/math.html</li>
</ul>
<p>ويمكننا أيضًا إلقاء نظرة على محتويات الوحدة بالدالة <code>dir</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> math

<span class="hljs-built_in">print</span>(<span class="hljs-built_in">dir</span>(math))
</code></pre>
<p>تُعيد الدالة قائمة بالأسماء التي تعرّفها الوحدة. وقد تكون هذه الأسماء، مثلًا، أسماء أصناف أو قيمًا ثابتة أو دوالًّا:</p>
<pre><code>['\\_\\_doc\\_\\_', '\\_\\_name\\_\\_', '\\_\\_package\\_\\_', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'hypot', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc']
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المحارف الخاصة</strong></p>
<p>تحتوي وحدة Python المسماة <a href="https://docs.python.org/3/library/string.html">string</a> على بعض الثوابت النصية، التي تعرّف مجموعات معيّنة من المحارف. ومنها مثلًا الأحرف الصغيرة ومحارف الترقيم. يُرجى التعرّف على هذه الثوابت، ثم كتابة دالة اسمها <code>separate_characters(my_string: str)</code>. تأخذ الدالة سلسلة نصية كوسيط لها، وينبغي أن تفصل محارف السلسلة النصية إلى ثلاث سلاسل نصية أخرى، وتُعيدها في صف (tuple):</p>
</blockquote>
<ul>
<li>ينبغي أن تحتوي السلسلة النصية الأولى على الأحرف اللاتينية الصغيرة والكبيرة (الثابت النصي <code>ascii_letters</code>)</li>
<li>ينبغي أن تحتوي السلسلة النصية الثانية على جميع محارف الترقيم التي يعرّفها الثابت النصي <code>punctuation</code></li>
<li>ينبغي أن تحتوي السلسلة النصية الثالثة على جميع المحارف الأخرى (بما في ذلك المسافات البيضاء)</li>
</ul>
<p>وينبغي أن تظهر المحارف في السلاسل النصية الثلاث بالترتيب نفسه الذي ظهرت به في السلسلة النصية الأصلية.</p>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python">parts = separate_characters(<span class="hljs-string">&quot;Olé!!! Hey, are ümläüts wörking?&quot;</span>)
<span class="hljs-built_in">print</span>(parts[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(parts[<span class="hljs-number">1</span>])
<span class="hljs-built_in">print</span>(parts[<span class="hljs-number">2</span>])
</code></pre>
<pre><code>OlHeyaremltswrking
!!!,?
é  üäü ö
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الكسور</strong></p>
<p>يُرجى التعرّف على وحدة Python المسماة <code>fractions</code>. واستخدمها لكتابة دالة اسمها <code>fractionate(amount: int)</code>، تأخذ عدد الأجزاء كوسيط لها. وينبغي أن تقسّم الدالة العدد 1 إلى عدد من الكسور المتساوية في الحجم يساوي ما يحدّده الوسيط، وتُعيدها في قائمة.</p>
</blockquote>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> p <span class="hljs-keyword">in</span> fractionate(<span class="hljs-number">3</span>):
    <span class="hljs-built_in">print</span>(p)

<span class="hljs-built_in">print</span>()

<span class="hljs-built_in">print</span>(fractionate(<span class="hljs-number">5</span>))
</code></pre>
<pre><code>1/3
1/3
1/3

[Fraction(1, 5), Fraction(1, 5), Fraction(1, 5), Fraction(1, 5), Fraction(1, 5)]
</code></pre>
<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 94c034a1-3183-5682-acb0-7f126d26ba07)

-->
`,c={book:n,chapter:s,chapterTitle:a,slug:p,title:e,headings:o,html:t};export{n as book,s as chapter,a as chapterTitle,c as default,o as headings,t as html,p as slug,e as title};
