const n="mooc",s="part-1",p="الجزء 1: البدء",e="1-getting-started",t="البدء",a=[{depth:2,id:"برنامج-بأوامر-متعددة",text:"برنامج بأوامر متعددة"},{depth:2,id:"العمليات-الحسابية",text:"العمليات الحسابية"},{depth:2,id:"التعليقات",text:"التعليقات"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستصبح قد كتبت ونفّذت برنامجك الأول بلغة Python</li>
<li>ستكون على معرفة بكيفية استخدام الأمر print</li>
<li>ستكون قادرًا على استخدام البرمجة لإجراء عمليات حسابية</li>
</ul>
</blockquote>
<p>تتكون برامج الحاسوب من <em>أوامر</em> (commands)، كل أمر يوجّه الحاسوب للقيام بإجراء ما. وينفّذ الحاسوب هذه الأوامر واحدًا تلو الآخر. ويمكن استخدام الأوامر، من بين أمور أخرى، لإجراء حسابات، ولمقارنة أشياء في ذاكرة الحاسوب، ولإحداث تغييرات في طريقة عمل البرنامج، ولنقل رسائل، أو لطلب معلومات من مستخدم البرنامج.</p>
<p>لنبدأ البرمجة بالتعرّف على الأمر <code>print</code>، الذي <em>يطبع</em> النص. وفي هذا السياق، يعني الطبع أساسًا أن البرنامج سيُظهر نصًا ما على الشاشة.</p>
<p>سيطبع البرنامج التالي السطر &quot;Hi there!&quot;:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi there!&quot;</span>)
</code></pre>
<p>وعند تشغيل البرنامج، يُنتج هذا:</p>
<pre><code>Hi there!
</code></pre>
<p>لن يعمل البرنامج إلا إذا كُتبت الشيفرة تمامًا كما هي أعلاه. فمثلًا، محاولة تشغيل الأمر print دون علامات التنصيص، على النحو التالي</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(Hi there!)
</code></pre>
<p>لن تطبع الرسالة، بل تتسبب بدلًا من ذلك في خطأ:</p>
<pre><code>File &quot;&lt;stdin&gt;&quot;, line 1
  print(Hi there!)
                   ^
SyntaxError: invalid syntax
</code></pre>
<p>وباختصار، إذا أردت طباعة نص، فيجب أن يكون النص كله محاطًا بعلامات تنصيص، وإلا فلن تفسّره Python تفسيرًا صحيحًا.</p>
<blockquote>
<p><strong>تمرين تفاعلي: الوجه المبتسم</strong></p>
<p>اكتب برنامجًا يطبع وجهًا مبتسمًا: :-)</p>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="برنامج-بأوامر-متعددة">برنامج بأوامر متعددة</h2>
<p>الأوامر المتعددة المكتوبة تباعًا ستُنفَّذ بالترتيب من الأول إلى الأخير.
فمثلًا هذا البرنامج</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Welcome to Introduction to Programming!&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;First we will practice using the print command.&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This program prints three lines of text on the screen.&quot;</span>)
</code></pre>
<p>يطبع الأسطر التالية على الشاشة:</p>
<pre><code>Welcome to Introduction to Programming!
First we will practice using the print command.
This program prints three lines of text on the screen.
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الشيفرة: الإخوة السبعة</strong> <span class="content-anchor" id="programming-exercise-fix-the-code-seven-brothers"></span></p>
<p>&quot;Seitsemän veljestä&quot; هي واحدة من أوائل الروايات التي كُتبت في الفنلندية على الإطلاق. وهي قصة سبعة إخوة يتامى يتعلمون كيف يجدون طريقهم في العالم (<a href="https://en.wikipedia.org/wiki/Seitsem%C3%A4n_veljest%C3%A4">اقرأ المزيد على ويكيبيديا</a>).</p>
</blockquote>
<p>من المفترض أن يطبع هذا البرنامج أسماء الإخوة بالترتيب الأبجدي، لكنه لا يعمل بالشكل الصحيح بعد. أصلح البرنامج لكي تُطبع الأسماء بالترتيب الصحيح.</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Simeoni&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Juhani&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Eero&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Lauri&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Aapo&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Tuomas&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Timo&quot;</span>)
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: صف، صف، صف قاربك</strong></p>
<p>اكتب برنامجًا يطبع الأسطر التالية تمامًا كما هي مكتوبة هنا، بما في ذلك علامات الترقيم:</p>
</blockquote>
<pre><code>Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="العمليات-الحسابية">العمليات الحسابية</h2>
<p>يمكنك أيضًا وضع عمليات حسابية داخل الأمر <code>print</code>. وعند تشغيله سيُطبع نتيجة العملية. فمثلًا، البرنامج التالي</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-number">2</span> + <span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-number">3</span> * <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-number">2</span> + <span class="hljs-number">2</span> * <span class="hljs-number">10</span>)
</code></pre>
<p>يطبع هذه الأسطر:</p>
<pre><code>7
9
22
</code></pre>
<p>لاحظ غياب علامات التنصيص حول العمليات الحسابية أعلاه. تُستخدم علامات التنصيص للدلالة على <em>السلاسل النصية</em> (strings). وفي سياق البرمجة، السلاسل النصية هي تتابعات من المحارف. ويمكن أن تتكون من حروف وأرقام وأي أنواع أخرى من المحارف، مثل علامات الترقيم. والسلاسل النصية ليست مجرد كلمات كما نفهمها عادةً، بل يمكن لسلسلة نصية واحدة أن تطول بمقدار جمل كاملة متعددة.
وعادةً ما تُطبع السلاسل النصية تمامًا كما هي مكتوبة. وبذلك، فإن الأمرين التاليين ينتجان نتيجتين مختلفتين تمامًا:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-number">2</span> + <span class="hljs-number">2</span> * <span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;2 + 2 * 10&quot;</span>)
</code></pre>
<p>يطبع هذا البرنامج:</p>
<pre><code>22
2 + 2 * 10
</code></pre>
<p>وفي السطر الثاني من الشيفرة، لا تحسب Python نتيجة العملية، بل تطبع العملية نفسها كسلسلة نصية.
إذاً، تُطبع السلاسل النصية كما هي مكتوبة تمامًا، دون أي إشارة إلى محتواها.</p>
<h2 id="التعليقات">التعليقات</h2>
<p>أي سطر يبدأ بعلامة الرقم <code>#</code>، المعروفة أيضًا بالهاش أو بعلامة العدد، هو تعليق. وهذا يعني أن أي نص على ذلك السطر بعد الرمز <code>#</code> لن يؤثر بأي شكل على طريقة عمل البرنامج. ستتجاهله Python ببساطة.</p>
<p>تُستخدم التعليقات لشرح طريقة عمل البرنامج، للمبرمج نفسه وللآخرين الذين يقرأون شيفرة البرنامج. ففي هذا البرنامج يشرح تعليق الحساب الذي تُجريه الشيفرة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hours in a year:&quot;</span>)
<span class="hljs-comment"># there are 365 days in a year and 24 hours in each day</span>
<span class="hljs-built_in">print</span>(<span class="hljs-number">365</span>*<span class="hljs-number">24</span>)
</code></pre>
<p>وعند تشغيل البرنامج، لن يكون التعليق مرئيًا للمستخدم:</p>
<pre><code>Hours in a year:
8760
</code></pre>
<p>ويمكن أيضًا إضافة تعليقات قصيرة في نهاية السطر:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hours in a year:&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-number">365</span>*<span class="hljs-number">24</span>) <span class="hljs-comment"># 365 days, 24 hours in each day</span>
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: الدقائق في السنة</strong></p>
<p>اكتب برنامجًا يطبع عدد الدقائق في السنة. استخدم شيفرة Python لإجراء الحساب، كما في مثال الشيفرة السابق.</p>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: اطبع بعض الشيفرة</strong></p>
<p>حتى الآن، على الأرجح كنت تستخدم علامات التنصيص المزدوجة <code>&quot;</code> لطباعة السلاسل النصية. وبالإضافة إلى علامات التنصيص المزدوجة، تقبل Python أيضًا علامات التنصيص المفردة <code>'</code>.</p>
</blockquote>
<p>وهذا يفيدك إن أردت يومًا طباعة علامات التنصيص نفسها:</p>
<pre><code class="language-python">
<span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;&quot;Come right back!&quot;, shouted the police officer.&#x27;</span>)

</code></pre>
<pre><code>&quot;Come right back!&quot;, shouted the police officer.
</code></pre>
<p>اكتب برنامجًا يطبع ما يلي:</p>
<pre><code>print(&quot;Hello there!&quot;)
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: f1d6d205-dfd6-5c6f-b148-b332dfd64289)


-->
`,l={book:n,chapter:s,chapterTitle:p,slug:e,title:t,headings:a,html:o};export{n as book,s as chapter,p as chapterTitle,l as default,a as headings,o as html,e as slug,t as title};
