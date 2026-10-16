const n="mooc",e="part-1",s="الجزء 1: البدء",o="5-conditional-statements",t="الجمل الشرطية",a=[{depth:2,id:"مشغلات-المقارنة",text:"مشغّلات المقارنة"},{depth:2,id:"المسافات-البادئة",text:"المسافات البادئة"},{depth:2,id:"القيم-المنطقية-والتعبيرات-المنطقية",text:"القيم المنطقية والتعبيرات المنطقية"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على استخدام جملة شرطية بسيطة في البرمجة</li>
<li>ستعرف ما هي قيمة منطقية (Boolean value)</li>
<li>ستكون قادرًا على التعبير عن الشروط بمشغّلات المقارنة</li>
</ul>
</blockquote>
<p>حتى الآن، نُفِّذ كل برنامج كتبناه سطرًا بسطر بالترتيب. وبدلًا من تنفيذ كل سطر من الشيفرة في كل مرة يُشغَّل فيها البرنامج، من المفيد غالبًا إنشاء أجزاء من البرنامج لا تُنفَّذ إلا في ظروف معيّنة.</p>
<p>فمثلًا، تتحقّق الشيفرة التالية ممّا إذا كان المستخدم في سن الرشد:</p>
<pre><code class="language-python">age = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;How old are you? &quot;</span>))

<span class="hljs-keyword">if</span> age &gt; <span class="hljs-number">17</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You are of age!&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Here&#x27;s a copy of GTA6 for you.&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Next customer, please!&quot;</span>)
</code></pre>
<p>وحين يتجاوز المستخدم سنّ 17، ينبغي أن يبدو تنفيذ البرنامج على النحو التالي:</p>
<pre><code>How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!
</code></pre>
<p>وإذا كان عمر المستخدم 17 أو أقل، فلا يُطبع سوى ما يلي:</p>
<pre><code>How old are you? **16**
Next customer, please!
</code></pre>
<p>تبيّن لنا هذه الأمثلة أن القيمة المعطاة كمُدخَل تؤثر في أجزاء البرنامج التي تُنفَّذ. فعلى البرنامج أن يحتوي على <em>جملة شرطية</em> (conditional statement) مع كتلة شيفرة لا تُنفَّذ إلا إذا كان الشرط في الجملة صحيحًا.</p>
<p><img src="/arabic-cs-library/images/mooc/part-1/1_5_1.png" alt="1_5_1.png"></p>
<p>في الجملة الشرطية يأتي الكلمة المفتاحية <code>if</code> متبوعةً بـ_شرط_ (condition)، مثل مقارنة بين قيمتين. وكتلة الشيفرة التالية لهذا السطر الترويسي لا تُنفَّذ إلا إذا كان الشرط صحيحًا.</p>
<p>لاحظ محرف النقطتين بعد ترويسة <code>if</code>. في الشيفرة التالية لا توجد نقطتان:</p>
<pre><code class="language-python">age = <span class="hljs-number">10</span>

<span class="hljs-comment"># no colon at the end of the following line</span>
<span class="hljs-keyword">if</span> age &gt; <span class="hljs-number">17</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You are of age.&quot;</span>)
</code></pre>
<p>وعند التنفيذ يسبّب هذا خطأً:</p>
<pre><code>File &quot;program.py&quot;, line 3
  if age &gt; 17
            ^
SyntaxError: invalid syntax
</code></pre>
<h2 id="مشغلات-المقارنة">مشغّلات المقارنة</h2>
<p>عادةً ما تتكوّن الشروط من مقارنة بين قيمتين. وفيما يلي جدول بأكثر مشغّلات المقارنة شيوعًا المستخدمة في Python:</p>
<table>
<thead>
<tr>
<th style="text-align:center">المشغّل</th>
<th>الغرض</th>
<th>المثال</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>==</code></td>
<td>يساوي</td>
<td><code>a == b</code></td>
</tr>
<tr>
<td style="text-align:center"><code>!=</code></td>
<td>لا يساوي</td>
<td><code>a != b</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&gt;</code></td>
<td>أكبر من</td>
<td><code>a &gt; b</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&gt;=</code></td>
<td>أكبر من أو يساوي</td>
<td><code>a &gt;= b</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&lt;</code></td>
<td>أصغر من</td>
<td><code>a &lt; b</code></td>
</tr>
<tr>
<td style="text-align:center"><code>&lt;=</code></td>
<td>أصغر من أو يساوي</td>
<td><code>a &lt;= b</code></td>
</tr>
</tbody>
</table>
<p>لننظر إلى برنامج يطبع أشياء مختلفة بناءً على ما إذا كان العدد الذي يُدخله المستخدم سالبًا أو موجبًا أو يساوي صفرًا:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>))

<span class="hljs-keyword">if</span> number &lt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is negative.&quot;</span>)

<span class="hljs-keyword">if</span> number &gt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is positive.&quot;</span>)

<span class="hljs-keyword">if</span> number == <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The number is zero.&quot;</span>)
</code></pre>
<p>أمثلة على كيفية عمل البرنامج مع ثلاثة مُدخَلات مختلفة:</p>
<pre><code>Please type in a number: **15**
The number is positive.
</code></pre>
<pre><code>Please type in a number: **-18**
The number is negative.
</code></pre>
<pre><code>Please type in a number: **0**
The number is zero.
</code></pre>
<h2 id="المسافات-البادئة">المسافات البادئة</h2>
<p>تعرف Python أن كتلة شيفرة هي جزء من جملة شرطية إذا كان كل سطر شيفرة في الكتلة <em>مزاحًا</em> (indented) بالقدر نفسه. أي أنه ينبغي أن تتوفّر المسافات البادئة نفسها في أول كل سطر شيفرة داخل كتلة الشيفرة.</p>
<p>فمثلًا:</p>
<pre><code class="language-python">password = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a password: &quot;</span>)

<span class="hljs-keyword">if</span> password == <span class="hljs-string">&quot;kittycat&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You knew the password!&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You must be either the intended user...&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;...or quite an accomplished hacker.&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The program has finished its execution. Thanks and bye!&quot;</span>)
</code></pre>
<p>يمكنك استخدام مفتاح Tab، وهو اختصار عن مفتاح <em>الجدولة</em> (<em>tabulator</em>)، لإدراج كمية محدّدة من المسافات.</p>
<p><img src="/arabic-cs-library/images/mooc/part-1/1_5_keyboard.png" alt="1_5_keyboard.png"></p>
<p>تُزاح الكثير من محرّرات النصوص للسطر التالي تلقائيًا عند ضغط مفتاح Enter بعد محرف النقطتين. وحين تريد إنهاء كتلة شيفرة مزاحة يمكنك استخدام مفتاح <code>Backspace</code> للعودة إلى بداية السطر.</p>
<p><img src="/arabic-cs-library/images/mooc/part-1/1_5_keyboard2.png" alt="1_5_keyboard2.png">
<small><center>
مصدر صور لوحة المفاتيح:
<a href="https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Clker-Free-Vector-Images</a> من <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Pixabay</a></p>
</center></small>
<blockquote>
<p><strong>تمرين تفاعلي: أورويل</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عدد صحيح. ينبغي للبرنامج أن يطبع &quot;Orwell&quot; إذا كان العدد يساوي 1984 بالضبط، وأن لا يفعل شيئًا آخر.</p>
</blockquote>
<pre><code>Please type in a number: **2020**
</code></pre>
<pre><code>Please type in a number: **1984**
Orwell
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: القيمة المطلقة</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عدد صحيح. فإذا كان العدد أقل من صفر، فينبغي للبرنامج أن يطبع العدد مضروبًا في -1. وإلا يطبع البرنامج العدد كما هو. يُرجى الاطّلاع على أمثلة السلوك المتوقّع أدناه.</p>
</blockquote>
<pre><code>Please type in a number: **-7**
The absolute value of this number is 7
</code></pre>
<pre><code>Please type in a number: **1**
The absolute value of this number is 1
</code></pre>
<pre><code>Please type in a number: **-99**
The absolute value of this number is 99
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: حساء أم لا حساء</strong></p>
<p>يُرجى كتابة برنامج يسأل عن اسم المستخدم. فإذا كان الاسم أي شيء سوى &quot;Jerry&quot;، سأل البرنامج بعد ذلك عن عدد الحصص وطبع التكلفة الإجمالية. سعر الحصة الواحدة هو 5.90.</p>
</blockquote>
<p>مثالان على تنفيذ البرنامج:</p>
<pre><code>Please tell me your name: **Kramer**
How many portions of soup? **2**
The total cost is 11.8
Next please!
</code></pre>
<pre><code>Please tell me your name: **Jerry**
Next please!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: رتبة المقدار</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عدد صحيح. ثم ينبغي للبرنامج أن يطبع رتبة العدد وفقًا للأمثلة التالية.</p>
</blockquote>
<pre><code>Please type in a number: **950**
This number is smaller than 1000
Thank you!
</code></pre>
<pre><code>Please type in a number: **59**
This number is smaller than 1000
This number is smaller than 100
Thank you!
</code></pre>
<pre><code>Please type in a number: **2**
This number is smaller than 1000
This number is smaller than 100
This number is smaller than 10
Thank you!
</code></pre>
<pre><code>Please type in a number: **1123**
Thank you!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="القيم-المنطقية-والتعبيرات-المنطقية">القيم المنطقية والتعبيرات المنطقية</h2>
<p>أي شرط يُستخدم في جملة شرطية ينتج قيمة حقيقة، أي إمّا صحيح أو خاطئ. فمثلًا، الشرط <code>a &lt; 5</code> صحيح إذا كان <code>a</code> أقل من 5، وخاطئ إذا كان <code>a</code> يساوي 5 أو أكبر منها.</p>
<p>تُسمّى هذه الأنواع من القيم غالبًا القيم <em>المنطقية</em> (<em>Boolean</em>)، سمّيت على اسم الرياضي الإنجليزي جورج بول. وفي Python تُعالَج هذه القيم بواسطة نوع البيانات <code>bool</code>. ولا يمكن لمتغيّرات من نوع <code>bool</code> أن تأخذ سوى قيمتين: <code>True</code> أو <code>False</code>.</p>
<p>يُسمّى أي مقطع شيفرة ينتج قيمة منطقية <em>تعبيرًا منطقيًا</em> (<em>Boolean expression</em>). فمثلًا، الشرط في الجملة الشرطية هو دائمًا تعبير منطقي، وكثيرًا ما يمكن أن يُستخدَم مصطلحا <em>الشرط</em> و_التعبير المنطقي_ بالتبادل.</p>
<p>يمكن تخزين نتيجة تعبير منطقي في متغيّر تمامًا كتخزين نتيجة أي عملية حسابية:</p>
<pre><code class="language-python">a = <span class="hljs-number">3</span>
condition = a &lt; <span class="hljs-number">5</span>
<span class="hljs-built_in">print</span>(condition)
<span class="hljs-keyword">if</span> condition:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a is less than 5&quot;</span>)
</code></pre>
<pre><code>True
a is less than 5
</code></pre>
<p>ويمكن أيضًا استخدام الكلمتين المفتاحيتين <code>True</code> و<code>False</code> في Python مباشرةً. وفي المثال التالي يُنفَّذ أمر <code>print</code> في كل مرة، لأن قيمة الشرط هي <code>True</code>:</p>
<pre><code class="language-python">condition = <span class="hljs-literal">True</span>
<span class="hljs-keyword">if</span> condition:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This is printed every time.&quot;</span>)
</code></pre>
<pre><code>This is printed every time.
</code></pre>
<p>برنامج كهذا ليس مفيدًا جدًّا، لكنك سترى لاحقًا في الدورة أمثلة على متغيّرات منطقية تكون مفيدة جدًّا.</p>
<blockquote>
<p><strong>تمرين تفاعلي: الآلة الحاسبة</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عددين وعن عملية. فإذا كانت العملية هي <em>الجمع</em> (<em>add</em>) أو <em>الضرب</em> (<em>multiply</em>) أو <em>الطرح</em> (<em>subtract</em>)، فينبغي للبرنامج أن يحسب ويطبع نتيجة العملية بالعددَين المُعطَيين. وإذا كتب المستخدم أي شيء آخر، فينبغي للبرنامج ألا يطبع شيئًا.</p>
</blockquote>
<p>بعض أمثلة السلوك المتوقّع:</p>
<pre><code>Number 1: **10**
Number 2: **17**
Operation: **add**

10 + 17 = 27
</code></pre>
<pre><code>Number 1: **4**
Number 2: **6**
Operation: **multiply**

4 * 6 = 24
</code></pre>
<pre><code>Number 1: **4**
Number 2: **6**
Operation: **subtract**

4 - 6 = -2
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: درجات الحرارة</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن درجة حرارة بوحدة درجة فهرنهايت، ثم يطبع الدرجة نفسها بوحدة درجة مئوية. فإذا كانت الحرارة المحوَّلة أقل من صفر درجة مئوية، فينبغي للبرنامج أيضًا أن يطبع &quot;Brr! It's cold in here!&quot;.</p>
</blockquote>
<p>يمكن العثور بسهولة على معادلة تحويل درجات فهرنهايت إلى درجات مئوية بأي محرك بحث تختاره.</p>
<p>مثالان على السلوك المتوقّع:</p>
<pre><code>Please type in a temperature (F): **101**
101 degrees Fahrenheit equals 38.333333333333336 degrees Celsius

Please type in a temperature (F): **21**
21 degrees Fahrenheit equals -6.111111111111111 degrees Celsius
Brr! It's cold in here!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الأجر اليومي</strong></p>
<p>يُرجى كتابة برنامج يسأل عن أجر الساعة، وعن عدد ساعات العمل، وعن يوم الأسبوع. ثم ينبغي للبرنامج أن يطبع الأجر اليومي، وهو حاصل ضرب أجر الساعة في عدد ساعات العمل، إلا في أيام الأحد التي يُضاعَف فيها أجر الساعة.</p>
</blockquote>
<pre><code>Hourly wage: **8.5**
Hours worked: **3**
Day of the week: **Monday**
Daily wages: 25.5 euros
</code></pre>
<pre><code>Hourly wage: **12.5**
Hours worked: **10**
Day of the week: **Sunday**
Daily wages: 250.0 euros
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: مكافأة الولاء</strong></p>
<p>يحسب هذا البرنامج مكافأة نهاية العام التي يحصل عليها العميل على بطاقة ولائه. وتُحسب المكافأة بالمعادلة التالية:</p>
</blockquote>
<ul>
<li>إذا كان على البطاقة أقل من مئة نقطة، تكون المكافأة 10 %</li>
<li>في أي حالة أخرى تكون المكافأة 15 %</li>
</ul>
<p>ينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>How many points are on your card? **55**
Your bonus is 10 %
You now have 60.5 points
</code></pre>
<p>لكن هناك مشكلة في البرنامج، لذا فهو لا يعمل بشكل صحيح تمامًا مع بعض المُدخَلات:</p>
<pre><code>How many points are on your card? **95**
Your bonus is 10 %
Your bonus is 15 %
You now have 120.175 points
</code></pre>
<p>يُرجى إصلاح البرنامج بحيث تكون المكافأة دائمًا إمّا 10 % أو 15 %، لكن ليس كلاهما أبدًا.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: ماذا ترتدي غدًا</strong></p>
<p>يُرجى كتابة برنامج يسأل عن نشرة الطقس لليوم الغد ثم يقترح ملابس مناسبة للطقس.</p>
</blockquote>
<p>وينبغي أن يتغيّر الاقتراح إذا كانت الحرارة (بقياس درجات مئوية) أعلى من 20 أو 10 أو 5 درجات، وكذلك إذا كان هناك مطر على الرادار.</p>
<p>بعض أمثلة السلوك المتوقّع:</p>
<pre><code>What is the weather forecast for tomorrow?
Temperature: **21**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
</code></pre>
<pre><code>What is the weather forecast for tomorrow?
Temperature: **11**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
</code></pre>
<pre><code>What is the weather forecast for tomorrow?
Temperature: **7**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
</code></pre>
<pre><code>What is the weather forecast for tomorrow?
Temperature: **3**
Will it rain (yes/no): **yes**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
Make it a warm coat, actually
I think gloves are in order
Don't forget your umbrella!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: حلّ المعادلة التربيعية</strong></p>
<p>في وحدة <code>math</code> في Python توجد الدالة <code>sqrt</code>، التي تحسب الجذر التربيعي لعدد. ويمكنك استخدامها على النحو التالي:</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">from</span> math <span class="hljs-keyword">import</span> sqrt

<span class="hljs-built_in">print</span>(sqrt(<span class="hljs-number">9</span>))
</code></pre>
<p>ومن المفترض أن يطبع هذا</p>
<pre><code>3.0
</code></pre>
<p>وسنعود لاحقًا إلى مفهوم <em>الوحدة</em> (<em>module</em>) إلى عبارة <code>import</code>. أما الآن فكفاك أن تفهم أن السطر <code>from math import sqrt</code> يتيح لنا استخدام الدالة <code>sqrt</code> في برنامجنا.</p>
<p>يُرجى كتابة برنامج لحلّ معادلة تربيعية من الشكل ax²+bx+c. يسأل البرنامج عن قيم a وb وc. ثم ينبغي له أن يستخدم المعادلة التربيعية لحلّ المعادلة. وإليك المعادلة التربيعية معبَّرةً بالدالة <code>sqrt</code> في Python:</p>
<p>x = (-b ± sqrt(b²-4ac))/(2a).</p>
<p>يمكنك أن تفترض أن المعادلة ستحتوي دائمًا على جذرين حقيقيَّين، لذا فسيكون ما سبق صالحًا دائمًا.</p>
<p>مثال على السلوك المتوقّع:</p>
<pre><code>Value of a: **1**
Value of b: **2**
Value of c: **-8**

The roots are 2.0 and -4.0
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: bc7e500f-a91e-5709-8ae6-34637ff01737)


-->
<p>يُرجى الإجابة على استبيان سريع حول مواد هذا الأسبوع. الاستبيان يستحق نقطة تمرين واحدة.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 9d55d599-eaf4-58c9-933f-7fc1b1f6962b)</p>
</blockquote>
`,r={book:n,chapter:e,chapterTitle:s,slug:o,title:t,headings:a,html:p};export{n as book,e as chapter,s as chapterTitle,r as default,a as headings,p as html,o as slug,t as title};
