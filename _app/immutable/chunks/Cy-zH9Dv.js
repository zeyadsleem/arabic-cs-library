const n="mooc",s="part-2",e="الجزء 2: الجمل الشرطية",a="2-else-elif",p="المزيد عن الجمل الشرطية",o=[{depth:2,id:"فروع-بديلة-باستخدام-جملة-elif",text:"فروع بديلة باستخدام جملة elif"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تنشئ فروعًا متعدّدة داخل الجمل الشرطية</li>
<li>ستفهم الغرض من جمل <code>if</code> و<code>elif</code> و<code>else</code> داخل الجملة الشرطية</li>
<li>ستتمكّن من استخدام عملية معامل الباقي <code>%</code> في التعبيرات المنطقية</li>
</ul>
</blockquote>
<p>لننظر إلى برنامج يطلب من المستخدم إدخال عدد، ثم يطبع رسائل مختلفة اعتمادًا على ما إذا كان العدد سالبًا أم موجبًا أم يساوي صفرًا:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">if</span> number &lt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is negative&quot;</span>)

<span class="hljs-keyword">if</span> number &gt;= <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is positive or zero&quot;</span>)
</code></pre>
<p>يبدو هذا شيئًا ثقيلًا بعض الشيء ومتكرِّرًا. فنحن لا نريد سوى تنفيذ إحدى كتلتَي <code>if</code>، لأن المُدخَل سيكون دائمًا إمّا أقل من صفر، أو يساوي صفرًا أو أكبر منه. أي أن <code>number &lt; 0</code> أو <code>number &gt;= 0</code> صحيح، لكن ليس كلاهما صحيحًا في الوقت نفسه. لذا فالجملة الشرطية الأولى تحتوي في الواقع على كل ما نحتاجه هنا. فإذا كانت صحيحة، فالعدد سالب. وإذا كانت خاطئة، فالعدد يساوي صفرًا أو يكون موجبًا.</p>
<p>وبدلًا من إنشاء جملة شرطية أخرى بالكامل، كما في المثال أعلاه، يمكن إنشاء فرع آخر من الجملة الشرطية نفسها لتغطية جميع الحالات <em>التي يكون فيها الشرط خاطئًا</em>. وتُسمّى هذه بجملة <code>else</code>.</p>
<p>المثال السابق بعد إعادة كتابته:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">if</span> number &lt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is negative&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is positive or zero&quot;</span>)
</code></pre>
<p>وعند استخدام بنية if-else، سيُنفَّذ دائمًا واحد من الفروع على وجه اليقين، ولا يُنفَّذ في الوقت نفسه سوى فرع واحد. ويوضّح الشكل التالي بنية هذه البنية:</p>
<p><img src="/arabic-cs-library/images/mooc/part-2/2_2_1.png" alt="2_2_1.png"></p>
<p>ملاحظة: لا يمكن أبدًا أن يوجد فرع else دون أن يسبقه فرع if. وتُشكّل بنية if-else ككلها <em>جملة شرطية</em> واحدة.</p>
<p>يتحقّق المثال التالي مما إذا كان العدد الذي يعطيه المستخدم زوجيًا أم لا. ويمكن التحقّق من الزوجية باستخدام معامل الباقي <code>%</code>، الذي ينتج الباقي من عملية قسمة أعداد صحيحة. فإذا كان الباقي عند القسمة على اثنين صفرًا، فإن العدد زوجي. وإلا فإن العدد فردي.</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">if</span> number % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is even&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is odd&quot;</span>)
</code></pre>
<pre><code>Please type in a number: **5**
The number is odd
</code></pre>
<p>ومثال آخر باستخدام مقارنة السلاسل النصية:</p>
<pre><code class="language-python">correct = <span class="hljs-string">&quot;kittycat&quot;</span>
password = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in the password: &quot;</span>)

<span class="hljs-keyword">if</span> password == correct:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Welcome&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;No admittance&quot;</span>)
</code></pre>
<p>ومع مُدخَلين مختلفين، ينبغي أن يطبع ما يلي:</p>
<pre><code>Please type in the password: **kittycat**
Welcome
</code></pre>
<pre><code>Please type in the password: **monkey**
No admittance
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: سن الرشد</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم عمره. وينبغي للبرنامج أن يطبع بعد ذلك رسالة اعتمادًا على ما إذا كان المستخدم بلغ سن الرشد أم لا، باستخدام 18 كسنٍّ للرشد.</p>
</blockquote>
<p>أمثلة على السلوك المتوقَّع:</p>
<pre><code>How old are you? **12**
You are not of age!
</code></pre>
<pre><code>How old are you? **32**
You are of age!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="فروع-بديلة-باستخدام-جملة-elif">فروع بديلة باستخدام جملة elif</h2>
<p>كثيرًا ما يكون أمام البرنامج أكثر من خيارين ينبغي أن يراعيها. فمثلًا، قد تكون نتيجة مباراة كرة قدم على ثلاث حالات: فوز الفريق المضيف، أو فوز الفريق الضيف، أو التعادل.</p>
<p>يمكن إضافة فرع <code>elif</code> إلى الجملة الشرطية. وهو اختصار لعبارتي &quot;else if&quot;، أي أن الفرع سيحتوي على بديل للشرط الأصلي. ومن المهم أن جملة <code>elif</code> لا تُنفَّذ إلا إذا لم يُنفَّذ أي فرع من الفروع السابقة.</p>
<p><img src="/arabic-cs-library/images/mooc/part-2/2_2_2.png" alt="2_2_2.png"></p>
<p>لننظر إلى برنامج يحدّد الفائز بمباراة:</p>
<pre><code class="language-python">goals_home = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Home goals scored: &quot;</span>))
goals_away = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Away goals scored: &quot;</span>))

<span class="hljs-keyword">if</span> goals_home &gt; goals_away:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The home team won!&quot;</span>)
<span class="hljs-keyword">elif</span> goals_away &gt; goals_home:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The away team won!&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;It&#x27;s a tie!&quot;</span>)
</code></pre>
<p>ويمكن لهذا البرنامج أن يطبع ثلاث جمل مختلفة مع مُدخَلات مختلفة:</p>
<pre><code>Home goals scored: **4**
Away goals scored: **2**
The home team won!
</code></pre>
<pre><code>Home goals scored: **0**
Away goals scored: **6**
The away team won!
</code></pre>
<pre><code>Home goals scored: **3**
Away goals scored: **3**
It's a tie!
</code></pre>
<p>في المثال أعلاه ثلاثة فروع بديلة، يُنفَّذ منها دائمًا واحد على وجه اليقين. غير أنه لا يوجد حدّ لعدد فروع <code>elif</code> التي يمكن أن تحتويها الجملة الشرطية، وفرع <code>else</code> ليس إلزاميًا.</p>
<p>وهذه أيضًا جملة شرطية صحيحة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Holiday calendar&quot;</span>)
date = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is the date today? &quot;</span>)

<span class="hljs-keyword">if</span> date == <span class="hljs-string">&quot;Dec 26&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;It&#x27;s Boxing Day&quot;</span>)
<span class="hljs-keyword">elif</span> date == <span class="hljs-string">&quot;Dec 31&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;It&#x27;s Hogmanay&quot;</span>)
<span class="hljs-keyword">elif</span> date == <span class="hljs-string">&quot;Jan 1&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;It&#x27;s New Year&#x27;s Day&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Thanks and bye.&quot;</span>)
</code></pre>
<pre><code>Holiday calendar
What is the date today? **Dec 31**
It's Hogmanay
Thanks and bye.
</code></pre>
<p>لاحظ أن المثال السابق لا يحتوي على فرع <code>else</code>. فإذا أدخل المستخدم تاريخًا لم يُذكر في أي من فرعي <code>if</code> أو <code>elif</code>، أو أدخل تاريخًا بصيغة مختلفة، فلا يُنفَّذ أيٌّ من الفروع الثلاثة للجملة الشرطية.</p>
<pre><code>Holiday calendar
What is the date today? **Dec 25**
Thanks and bye.
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: أكبر من أو يساوي</strong></p>
<p>يُرجى كتابة برنامج يطلب عددين صحيحين. وينبغي للبرنامج أن يطبع بعد ذلك أيًّا منهما كان أكبر. وإذا كان العددان متساويين، فينبغي للبرنامج أن يطبع رسالة مختلفة.</p>
</blockquote>
<p>أمثلة على السلوك المتوقَّع:</p>
<pre><code>Please type in the first number: **5**
Please type in another number: **3**
The greater number was: 5
</code></pre>
<pre><code>Please type in the first number: **5**
Please type in another number: **8**
The greater number was: 8
</code></pre>
<pre><code>Please type in the first number: **5**
Please type in another number: **5**
The numbers are equal!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الأكبر سنًّا</strong></p>
<p>يُرجى كتابة برنامج يطلب اسمَي شخصين وعمرَيهما. وينبغي للبرنامج أن يطبع بعد ذلك اسم الأكبر سنًّا.</p>
</blockquote>
<p>أمثلة على السلوك المتوقَّع:</p>
<pre><code>Person 1:
Name: **Alan**
Age: **26**
Person 2:
Name: **Ada**
Age: **27**
The elder is Ada
</code></pre>
<pre><code>Person 1:
Name: **Bill**
Age: **1**
Person 2:
Name: **Jean**
Age: **1**
Bill and Jean are the same age
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الأخير أبجديًّا</strong></p>
<p>يمكن استخدام مشغّلات المقارنة في Python أيضًا مع السلاسل النصية. فالسلسلة النصية <code>a</code> أصغر من السلسلة النصية <code>b</code> إذا سبقت <code>b</code> أبجديًّا. ولاحظ مع ذلك أن المقارنة موثوقة فقط إذا</p>
</blockquote>
<ul>
<li>كانت المحارف المُقارَنة من الحالة نفسها، أي كلاهما بأحرف كبيرة أو كلاهما بأحرف صغيرة</li>
<li>كان يُستخدم فقط الأبجدية الإنجليزية المعيارية من a إلى z، أو من A إلى Z.</li>
</ul>
<p>يُرجى كتابة برنامج يطلب من المستخدم كلمتين. وينبغي للبرنامج أن يطبع بعد ذلك الكلمة التي تأتي أخيرًا أبجديًّا من الكلمتين.</p>
<p>يمكنك افتراض أن جميع الكلمات ستُكتب بأحرف صغيرة بالكامل.</p>
<p>أمثلة على السلوك المتوقَّع:</p>
<pre><code>Please type in the 1st word: **car**
Please type in the 2nd word: **scooter**
scooter comes alphabetically last.
</code></pre>
<pre><code>Please type in the 1st word: **zorro**
Please type in the 2nd word: **batman**
zorro comes alphabetically last.
</code></pre>
<pre><code>Please type in the 1st word: **python**
Please type in the 2nd word: **python**
You gave the same word twice.
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 82f644fe-5d89-5153-842a-11d5d11bc059)


-->
`,t={book:n,chapter:s,chapterTitle:e,slug:a,title:p,headings:o,html:l};export{n as book,s as chapter,e as chapterTitle,t as default,o as headings,l as html,a as slug,p as title};
