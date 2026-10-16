const n="mooc",s="part-1",a="الجزء 1: البدء",e="4-arithmetic-operations",t="العمليات الحسابية",p=[{depth:2,id:"المعاملات-والمشغلات-وأنواع-البيانات",text:"المُعاملات والمشغّلات وأنواع البيانات"},{depth:2,id:"الأعداد-كمدخل",text:"الأعداد كمُدخَل"},{depth:2,id:"استخدام-المتغيرات",text:"استخدام المتغيّرات"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على استخدام المتغيّرات في عمليات حسابية متنوّعة</li>
<li>ستعرف كيف تتعامل مع الأعداد في مُدخَل المستخدم</li>
<li>ستعرف كيف تحوّل القيم إلى أنواع بيانات أساسية أخرى</li>
</ul>
</blockquote>
<p>لقد رأيت في الأقسام السابقة أمثلة على العمليات الحسابية الأساسية. وفي الجدول التالي ترى أكثر مشغّلات الحساب شيوعًا في Python، مع أمثلة:</p>
<table>
<thead>
<tr>
<th style="text-align:center">المشغّل</th>
<th>الغرض</th>
<th>المثال</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>+</code></td>
<td>الجمع</td>
<td><code>2 + 4</code></td>
<td><code>6</code></td>
</tr>
<tr>
<td style="text-align:center"><code>-</code></td>
<td>الطرح</td>
<td><code>10 - 2.5</code></td>
<td><code>7.5</code></td>
</tr>
<tr>
<td style="text-align:center"><code>*</code></td>
<td>الضرب</td>
<td><code>-2 * 123</code></td>
<td><code>-246</code></td>
</tr>
<tr>
<td style="text-align:center"><code>/</code></td>
<td>القسمة (نتيجة عشرية)</td>
<td><code>9 / 2</code></td>
<td><code>4.5</code></td>
</tr>
<tr>
<td style="text-align:center"><code>//</code></td>
<td>القسمة (نتيجة صحيحة)</td>
<td><code>9 // 2</code></td>
<td><code>4</code></td>
</tr>
<tr>
<td style="text-align:center"><code>%</code></td>
<td>باقي القسمة</td>
<td><code>9 % 2</code></td>
<td><code>1</code></td>
</tr>
<tr>
<td style="text-align:center"><code>**</code></td>
<td>الأس</td>
<td><code>2 ** 3</code></td>
<td><code>8</code></td>
</tr>
</tbody>
</table>
<p>ترتيب العمليات مألوف من الرياضيات: أولًا تُحسب الأسس، ثمّ الضرب والقسمة، وأخيرًا الجمع والطرح. ويمكن تغيير هذا الترتيب بالأقواس.</p>
<p>فمثلًا هذه الشيفرة</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-number">2</span> + <span class="hljs-number">3</span> * <span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>((<span class="hljs-number">2</span> + <span class="hljs-number">3</span>) * <span class="hljs-number">3</span>)
</code></pre>
<p>تطبع</p>
<pre><code>11
15
</code></pre>
<h2 id="المعاملات-والمشغلات-وأنواع-البيانات">المُعاملات والمشغّلات وأنواع البيانات</h2>
<p>تتكوّن العملية الحسابية عادةً من <em>مُعاملات</em> (operands) و<em>مشغّلات</em> (operators):</p>
<p><img src="/arabic-cs-library/images/mooc/part-1/1_4_1.png" alt="1_4_1.png"></p>
<p>نوع بيانات المُعامل هو ما يحدّد عادةً نوع بيانات النتيجة: فإذا جُمِع عددان صحيحان، تكون النتيجة عددًا صحيحًا أيضًا. وإذا طرح عدد عشري من عدد عشري آخر، تكون النتيجة عددًا عشريًا. وفي الواقع، إذا كان أحد المُعاملات في تعبير ما عددًا عشريًا، تكون النتيجة عددًا عشريًا أيضًا، بغضّ النظر عن المُعاملات الأخرى.</p>
<p>القسمة <code>/</code> استثناء لهذه القاعدة. فناتجها عدد عشري، حتى لو كان المُعاملان عددين صحيحين. فمثلًا <code>1 / 5</code> ينتج العدد العشري <code>0.2</code>.</p>
<p>مثال:</p>
<pre><code class="language-python">height = <span class="hljs-number">172.5</span>
weight = <span class="hljs-number">68.55</span>

<span class="hljs-comment"># the Body Mass Index, or BMI, is calculated by dividing body mass with the square of height</span>
<span class="hljs-comment"># height is converted into metres in the formula</span>
bmi = weight / (height / <span class="hljs-number">100</span>) ** <span class="hljs-number">2</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The BMI is <span class="hljs-subst">{bmi}</span>&quot;</span>)
</code></pre>
<p>يطبع هذا البرنامج ما يلي:</p>
<pre><code>The BMI is 23.037177063642087
</code></pre>
<p>لاحظ أن لدى Python أيضًا مشغّل قسمة الأعداد الصحيحة وهو <code>//</code>. فإذا كان المُعاملان عددين صحيحين، فسينتج عدد صحيح. وتُقرَّب النتيجة إلى أسفل إلى أقرب عدد صحيح. فمثلًا هذا البرنامج</p>
<pre><code class="language-python">x = <span class="hljs-number">3</span>
y = <span class="hljs-number">2</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;/ operator <span class="hljs-subst">{x/y}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;// operator <span class="hljs-subst">{x//y}</span>&quot;</span>)
</code></pre>
<p>يطبع</p>
<pre><code>/ operator 1.5
// operator 1
</code></pre>
<h2 id="الأعداد-كمدخل">الأعداد كمُدخَل</h2>
<p>لقد استخدمنا الأمر <code>input</code> من قبل لقراءة سلاسل نصية من المستخدم. ويمكن استخدام الدالة نفسها لقراءة الأعداد، لكن يجب عندئذٍ أن تُحوَّل السلسلة النصية التي تنتجها الدالة إلى نوع بيانات رقمي في شيفرة البرنامج. وفي القسم السابق حوّلنا الأعداد الصحيحة إلى سلاسل نصية بدالة <code>str</code>. والمبدأ الأساسي نفسه ينطبق هنا، لكن اسم دالة التحويل سيكون مختلفًا.</p>
<p>يمكن تحويل سلسلة نصية إلى عدد صحيح بالدالة <code>int</code>. يسأل البرنامج التالي المستخدم عن سنة ميلاده ويخزّنها في المتغيّر <code>input_str</code>. ثم ينشئ البرنامج متغيّرًا آخر هو <code>year</code>، ويحتوي على السنة محوَّلة إلى عدد صحيح. وبعد ذلك تصبح العملية الحسابية <code>2021-year</code> ممكنة باستخدام القيمة التي قدّمها المستخدم.</p>
<pre><code class="language-python">input_str = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Which year were you born? &quot;</span>)
year = <span class="hljs-built_in">int</span>(input_str)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Your age at the end of the year 2021: <span class="hljs-subst">{<span class="hljs-number">2021</span> - year}</span>&quot;</span> )
</code></pre>
<pre><code>Which year were you born? **1995**
Your age at the end of the year 2021: 26
</code></pre>
<p>عادةً لا تحتاج إلى إنشاء متغيّرَين منفصلَين (مثل <code>input_str</code> و<code>year</code> أعلاه) لقراءة قيمة عددية من المستخدم. بل يمكن بدلًا من ذلك قراءة المُدخَل بالدالة <code>input</code> وتحويله بالدالة <code>int</code> في خطوة واحدة:</p>
<pre><code class="language-python">year = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Which year were you born? &quot;</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Your age at the end of the year 2021: <span class="hljs-subst">{<span class="hljs-number">2021</span> - year}</span>&quot;</span> )
</code></pre>
<p>وبالمثل، يمكن تحويل سلسلة نصية إلى عدد عشري بالدالة <code>float</code>. يسأل هذا البرنامج المستخدم عن طوله ووزنه، ويستخدمهما لحساب مؤشر كتلة الجسم:</p>
<pre><code class="language-python">height = <span class="hljs-built_in">float</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your height? &quot;</span>))
weight = <span class="hljs-built_in">float</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your weight? &quot;</span>))

height = height / <span class="hljs-number">100</span>
bmi = weight / height ** <span class="hljs-number">2</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The BMI is <span class="hljs-subst">{bmi}</span>&quot;</span>)
</code></pre>
<p>مثال على مخرجات البرنامج:</p>
<pre><code>What is your height? **163**
What is your weight? **74.45**
The BMI is 28.02137829801649
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: الخمسة أضعاف</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عدد. ثم يطبع البرنامج العدد مضروبًا في خمسة.</p>
</blockquote>
<p>ينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>Please type in a number: **3**
3 times 5 is 15
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الاسم والعمر</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن اسمه وسنة ميلاده. ثم يطبع البرنامج رسالة على النحو التالي:</p>
</blockquote>
<pre><code>What is your name? **Frances Fictitious**
Which year were you born? **1990**
Hi Frances Fictitious, you will be 31 years old at the end of the year 2021
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="استخدام-المتغيرات">استخدام المتغيّرات</h2>
<p>لننظر إلى برنامج يحسب مجموع ثلاثة أعداد يعطيها المستخدم:</p>
<pre><code class="language-python">number1 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;First number: &quot;</span>))
number2 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Second number: &quot;</span>))
number3 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Third number: &quot;</span>))

<span class="hljs-built_in">sum</span> = number1 + number2 + number3
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The sum of the numbers: <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<p>مثال على تنفيذ البرنامج:</p>
<pre><code>First number: **5**
Second number: **21**
Third number: **7**
The sum of the numbers: 33
</code></pre>
<p>يستخدم البرنامج أربعة متغيّرات مختلفة، لكن متغيّرَين يكفيان في هذه الحالة بسهولة:</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;First number: &quot;</span>))
<span class="hljs-built_in">sum</span> = <span class="hljs-built_in">sum</span> + number

number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Second number: &quot;</span>))
<span class="hljs-built_in">sum</span> = <span class="hljs-built_in">sum</span> + number

number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Third number: &quot;</span>))
<span class="hljs-built_in">sum</span> = <span class="hljs-built_in">sum</span> + number

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The sum of the numbers: <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<p>الآن تُقرأ كل المُدخَلات من المستخدم في المتغيّر نفسه <code>number</code>. وتُزاد قيمةُ المتغيّر <code>sum</code> بمقدار قيمة المتغيّر <code>number</code> في كل مرة يُدخل فيها المستخدم عددًا جديدًا.</p>
<p>لننظر عن كثب إلى هذا الأمر:</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-built_in">sum</span> + number
</code></pre>
<p>هنا تُجمع قيمة المتغيّر <code>sum</code> مع قيمة المتغيّر <code>number</code>، وتُخزَّن النتيجة من جديد في المتغيّر <code>sum</code>. فمثلًا، إذا كانت قيمة <code>sum</code> قبل الأمر هي 3 وقيمة <code>number</code> هي 2، فإن قيمة <code>sum</code> بعد تنفيذ الأمر تصبح 5.</p>
<p>زيادة قيمة متغيّر عملية شائعة جدًّا. ولهذا فهناك صيغة اختصار مستخدمة على نطاق واسع تُحقّق النتيجة نفسها التي يحقّقها الجمع الصريح أعلاه:</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> += number
</code></pre>
<p>وهذا يسمح لنا بكتابة البرنامج أعلاه بصورة أدقّ قليلًا:</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;First number: &quot;</span>))
<span class="hljs-built_in">sum</span> += number

number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Second number: &quot;</span>))
<span class="hljs-built_in">sum</span> += number

number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Third number: &quot;</span>))
<span class="hljs-built_in">sum</span> += number

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The sum of the numbers: <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<p>وفي الواقع، لا نحتاج بالضرورة إلى المتغيّر <code>number</code> على الإطلاق. إذ يمكن أيضًا معالجة مُدخَلات المستخدم على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-built_in">sum</span> = <span class="hljs-number">0</span>

<span class="hljs-built_in">sum</span> += <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;First number: &quot;</span>))
<span class="hljs-built_in">sum</span> += <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Second number: &quot;</span>))
<span class="hljs-built_in">sum</span> += <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Third number: &quot;</span>))

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The sum of the numbers: <span class="hljs-subst">{<span class="hljs-built_in">sum</span>}</span>&quot;</span>)
</code></pre>
<p>وبالطبع، يعتمد عدد المتغيّرات المطلوبة على السياق. فإذا كان مطلوبًا تذكّر كل قيمة يُدخلها المستخدم، فلن يكون من الممكن &quot;إعادة استخدام&quot; المتغيّر نفسه لقراءة قيم مختلفة من المستخدم. تأمّل ما يلي:</p>
<pre><code class="language-python">number1 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;First number: &quot;</span>))
number2 = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Second number: &quot;</span>))

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{number1}</span> + <span class="hljs-subst">{number2}</span> = <span class="hljs-subst">{number1+number2}</span>&quot;</span>)
</code></pre>
<pre><code>First number: **2**
Second number: **3**
2 + 3 = 5
</code></pre>
<p>ومن جهة أخرى، لا يملك البرنامج أعلاه متغيّرًا مسمًّى لتخزين مجموع القيمتين.</p>
<p>لا معنى لـ&quot;إعادة استخدام&quot; متغيّر إلا عندما تكون هناك حاجة لتخزين أشياء مؤقتًا متقاربة في النوع والغرض، مثلًا عند جمع الأعداد.</p>
<p>في المثال التالي يُستخدم المتغيّر <code>data</code> أولًا لتخزين اسم المستخدم، ثم عمره. وهذا غير منطقي على الإطلاق.</p>
<pre><code class="language-python">data = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi &quot;</span> + data + <span class="hljs-string">&quot;!&quot;</span>)

data = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your age? &quot;</span>))
<span class="hljs-comment"># program continues...</span>
</code></pre>
<p>وفكرة أفضل هي استخدام متغيّرات منفصلة بأسماء <em>وصفية</em>:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi &quot;</span> + name + <span class="hljs-string">&quot;!&quot;</span>)

age = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your age? &quot;</span>))
<span class="hljs-comment"># program continues...</span>
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: الثواني في اليوم</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عدد من الأيام. ثم يطبع البرنامج عدد الثواني في مقدار الأيام المُعطى.</p>
</blockquote>
<p>ينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>How many days? **1**
Seconds in that many days: 86400
</code></pre>
<p>مثال آخر:</p>
<pre><code>How many days? **7**
Seconds in that many days: 604800
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الشيفرة: الضرب</strong></p>
<p>يسأل هذا البرنامج المستخدم عن ثلاثة أعداد. ثم يطبع البرنامج حاصل ضربها، أي الأعداد مضروبة في بعضها. لكن هناك خلل ما في البرنامج - فهو لا يعمل بشكل صحيح تمامًا، كما سترى إذا شغّلته. يُرجى إصلاحه.</p>
</blockquote>
<p>مثال على التنفيذ المتوقّع للبرنامج:</p>
<pre><code>Please type in the first number: **2**
Please type in the second number: **3**
Please type in the third number: **5**
The product is 30
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: المجموع والمنتج</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن عددين. ثم يطبع البرنامج مجموع العددين وحاصل ضربهما.</p>
</blockquote>
<p>ينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>Number 1: **3**
Number 2: **7**
The sum of the numbers: 10
The product of the numbers: 21
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: المجموع والمتوسط</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن أربعة أعداد. ثم يطبع البرنامج مجموع الأعداد ومتوسطها.</p>
</blockquote>
<p>ينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>Number 1: **2**
Number 2: **1**
Number 3: **6**
Number 4: **7**
The sum of the numbers is 16 and the mean is 4.0
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: المصروف على الطعام</strong></p>
<p>يُرجى كتابة برنامج يقدّر المصروف المعتاد لمستخدم على الطعام.</p>
</blockquote>
<p>يسأل البرنامج المستخدم كم مرة في الأسبوع يتناول الطعام في مطعم الطلبة. ثم يسأل عن سعر وجبة غداء طلابية معتادة، وعن المال المُنفَق على المواد الغذائية خلال الأسبوع.</p>
<p>وبناءً على هذه المعلومات يحسب البرنامج مصروف المستخدم المعتاد على الطعام أسبوعيًّا ويوميًّا.</p>
<p>ينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>How many times a week do you eat at the student cafeteria? **4**
The price of a typical student lunch? **2.5**
How much money do you spend on groceries in a week? **28.5**

Average food expenditure:
Daily: 5.5 euros
Weekly: 38.5 euros
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الطلاب في مجموعات</strong></p>
<p>يُرجى كتابة برنامج يسأل عن عدد الطلاب في دورة ما وعن حجم المجموعة المطلوب. ثم يطبع البرنامج عدد المجموعات المتكوّنة من طلاب الدورة. وإذا لم تكن القسمة تامّة، فقد يكون إحدى المجموعات عدد أعضائها أقل من المُحدَّد.</p>
</blockquote>
<p>إذا لم تستطع تشغيل شيفرتك على النحو المتوقّع، فالأمر مقبول تمامًا أن تتابع وتعود إلى هذا التمرين لاحقًا. وموضوع القسم التالي هو <a href="/arabic-cs-library/book/mooc/part-1/5-conditional-statements">الجمل الشرطية</a>. ويمكن أيضًا حلّ هذا التمرين باستخدام صيغة شرطية.</p>
<pre><code>How many students on the course? **8**
Desired group size? **4**
Number of groups formed: 2
</code></pre>
<pre><code>How many students on the course? **11**
Desired group size? **3**
Number of groups formed: 4
</code></pre>
<p>تلميح: قد يكون مشغّل قسمة الأعداد الصحيحة <code>//</code> مفيدًا هنا.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: d781d54e-9792-5a79-a018-168940390580)


-->
`,o={book:n,chapter:s,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{n as book,s as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
