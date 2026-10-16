const e="mooc",n="part-7",s="الجزء 7: الوحدات",t="3-times-and-dates",a="الأوقات والتواريخ",l=[{depth:2,id:"كائن-datetime",text:"كائن datetime"},{depth:2,id:"مقارنة-الأوقات-وحساب-الفروق-بينها",text:"مقارنة الأوقات وحساب الفروق بينها"},{depth:2,id:"تنسيق-الأوقات-والتواريخ",text:"تنسيق الأوقات والتواريخ"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تتعامل مع التواريخ والأوقات في شيفرة Python</li>
<li>ستكون قادرًا على إنشاء كائنات <code>datetime</code> واستخدامها</li>
<li>ستعرف كيف تقارن بين تاريخين أو وقتين وتحسب الفروق بينهما</li>
</ul>
</blockquote>
<h2 id="كائن-datetime">كائن datetime</h2>
<p>تتضمّن وحدة <a href="https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime">datetime</a> في Python الدالة <a href="https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now">now</a>، التي تُعيد كائن datetime يحتوي على التاريخ والوقت الحاليين. ويبدو الطبع الافتراضي لكائن datetime هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

my_time = datetime.now()
<span class="hljs-built_in">print</span>(my_time)
</code></pre>
<pre><code>2021-10-19 08:46:49.311393
</code></pre>
<p>ويمكنك أيضًا تعريف الكائن بنفسك:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

my_time = datetime(<span class="hljs-number">1952</span>, <span class="hljs-number">12</span>, <span class="hljs-number">24</span>)
<span class="hljs-built_in">print</span>(my_time)
</code></pre>
<pre><code>1952-12-24 00:00:00
</code></pre>
<p>وبشكل افتراضي، يُضبط الوقت على منتصف الليل، لأننا لم نُعطِ وقتًا من اليوم في المثال أعلاه.</p>
<p>ويمكن الوصول إلى العناصر المختلفة لكائن datetime على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

my_time = datetime(<span class="hljs-number">1952</span>, <span class="hljs-number">12</span>, <span class="hljs-number">24</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Day:&quot;</span>, my_time.day)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Month:&quot;</span>, my_time.month)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Year:&quot;</span>, my_time.year)
</code></pre>
<pre><code>Day: 24
Month: 12
Year: 1952
</code></pre>
<p>ويمكن أيضًا تحديد وقت من اليوم. وقد تتفاوت الدقة، كما ترى أدناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

pv1 = datetime(<span class="hljs-number">2021</span>, <span class="hljs-number">6</span>, <span class="hljs-number">30</span>, <span class="hljs-number">13</span>)     <span class="hljs-comment"># 30.6.2021 at 1PM</span>
pv2 = datetime(<span class="hljs-number">2021</span>, <span class="hljs-number">6</span>, <span class="hljs-number">30</span>, <span class="hljs-number">18</span>, <span class="hljs-number">45</span>) <span class="hljs-comment"># 30.6.2021 at 6.45PM</span>
</code></pre>
<h2 id="مقارنة-الأوقات-وحساب-الفروق-بينها">مقارنة الأوقات وحساب الفروق بينها</h2>
<p>تعمل مشغّلات المقارنة المألوفة أيضًا على كائنات datetime:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

time_now = datetime.now()
midsummer = datetime(<span class="hljs-number">2021</span>, <span class="hljs-number">6</span>, <span class="hljs-number">26</span>)

<span class="hljs-keyword">if</span> time_now &lt; midsummer:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;It is not yet Midsummer&quot;</span>)
<span class="hljs-keyword">elif</span> time_now == midsummer:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Happy Midsummer!&quot;</span>)
<span class="hljs-keyword">elif</span> time_now &gt; midsummer:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;It is past Midsummer&quot;</span>)
</code></pre>
<pre><code>It is past Midsummer
</code></pre>
<p>ويمكن حساب الفرق بين كائني datetime ببساطة بمشغّل الطرح:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

time_now = datetime.now()
midsummer = datetime(<span class="hljs-number">2021</span>, <span class="hljs-number">6</span>, <span class="hljs-number">26</span>)

difference = midsummer - time_now
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Midsummer is&quot;</span>, difference.days, <span class="hljs-string">&quot;days away&quot;</span>)
</code></pre>
<pre><code>Midsummer is -116 days away
</code></pre>
<p>ملاحظة: نتيجة طرح كائنات datetime هي كائن <a href="https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects">timedelta</a>. وهو أقل مرونة من كائن <code>datetime</code>. فمثلًا، يمكنك الوصول إلى عدد الأيام في كائن <code>timedelta</code>، لكن ليس عدد السنوات، لأن طول السنة يتفاوت. ويحتوي كائن <code>timedelta</code> على الخصائص <code>days</code> و<code>seconds</code> و<code>microseconds</code>. ويمكن تمرير مقاييس أخرى كوسائط، لكنها ستُحوَّل داخليًّا.</p>
<p>وبالمثل، يتوفّر الجمع بين كائنَي <code>datetime</code> و<code>timedelta</code>. وستكون النتيجة كائن <code>datetime</code> الناتج عند إضافة عدد الأيام المحدّد (أو الأسابيع أو الثواني، إلخ) إلى كائن <code>datetime</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime, timedelta
midsummer = datetime(<span class="hljs-number">2021</span>, <span class="hljs-number">6</span>, <span class="hljs-number">26</span>)

one_week = timedelta(days=<span class="hljs-number">7</span>)
week_from_date = midsummer + one_week

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;A week after Midsummer it will be&quot;</span>, week_from_date)

long_time = timedelta(weeks=<span class="hljs-number">32</span>, days=<span class="hljs-number">15</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;32 weeks and 15 days after Midsummer it will be&quot;</span>, midsummer + long_time)
</code></pre>
<pre><code>A week after Midsummer it will be 2021-07-03 00:00:00
32 weeks and 15 days after Midsummer it will be 2022-02-20 00:00:00
</code></pre>
<p>ولنرَ كيف تعمل دقة أعلى:</p>
<pre><code class="language-python">time_now = datetime.now()
midnight = datetime(<span class="hljs-number">2021</span>, <span class="hljs-number">6</span>, <span class="hljs-number">30</span>)
difference = midnight - time_now
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Midnight is still <span class="hljs-subst">{difference.seconds}</span> seconds away&quot;</span>)
</code></pre>
<pre><code>Midnight is still 8188 seconds away
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: كم العمر</strong></p>
<p>يُرجى كتابة برنامج يسأل المستخدم عن تاريخ ميلاده، ثم يطبع كم كان عمره في ليلة الألفية الجديدة. وينبغي أن يسأل البرنامج عن اليوم والشهر والسنة كلًّا على حدة، ويطبع العمر بالأيام. يُرجى الاطلاع على الأمثلة أدناه:</p>
</blockquote>
<pre><code>Day: **10**
Month: **9**
Year: **1979**
You were 7417 days old on the eve of the new millennium.
</code></pre>
<pre><code>Day: **28**
Month: **3**
Year: **2005**
You weren't born yet on the eve of the new millennium.
</code></pre>
<p>ويمكنك أن تفترض أن جميع تركيبات اليوم والشهر والسنة المعطاة كوسيط ستكون تواريخ صحيحة. أي أنه لن يكون هناك تاريخ مثل 31 فبراير.</p>
<blockquote>
<p><strong>تمرين برمجي: هل PIC صالح؟</strong></p>
<p>في هذا التمرين ستتحقّق من صحة رموز الهوية الشخصية الفنلندية (PIC).</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>is_it_valid(pic: str)</code>، تُعيد <code>True</code> أو <code>False</code> بحسب ما إذا كان رمز الهوية المعطى كوسيط صحيحًا أم لا. تتبع رموز الهوية الفنلندية الصيغة <code>ddmmyyXyyyz</code>، حيث يحتوي <code>ddmmyy</code> على تاريخ الميلاد، و<code>X</code> علامة القرن، و<code>yyy</code> المعرّف الشخصي، و<code>z</code> محرف التحقّق.</p>
<p>وينبغي أن يتحقّق البرنامج من الصحة بثلاثة معايير:</p>
<ul>
<li>النصف الأول من الرمز تاريخ صحيح وموجود بالصيغة <code>ddmmyy</code>.</li>
<li>علامة القرن إما <code>+</code> (القرن التاسع عشر) أو <code>-</code> (القرن العشرون) أو <code>A</code> (القرن الحادي والعشرون).</li>
<li>محرف التحقّق صحيح.</li>
</ul>
<p>ويُحسب محرف التحقّق بأخذ العدد المكوّن من تسعة أرقام من تاريخ الميلاد والمعرّف الشخصي، وقسمته على 31، واختيار المحرف عند الفهرس الذي يحدّده الباقي من السلسلة النصية <code>0123456789ABCDEFHJKLMNPRSTUVWXY</code>. فمثلًا، إذا كان الباقي 12، فسيكون محرف التحقّق <code>C</code>.</p>
<p>وتتوفر أمثلة وشروح إضافية عن استخدامات رموز الهوية الشخصية على موقع <a href="https://dvv.fi/en/personal-identity-code">وكالة الخدمات الرقمية والسكانية</a>.</p>
<p><strong>ملاحظة مهمة!</strong> يُرجى الحرص على عدم مشاركة رمز هويتك الشخصية، مثلًا في الشيفرة التي تستخدمها للاختبار أو عبر قنوات دعم الدورة.</p>
<p>وفيما يلي بعض رموز الهوية الصحيحة التي يمكنك استخدامها للاختبار:</p>
<ul>
<li>230827-906F</li>
<li>120488+246L</li>
<li>310823A9877</li>
</ul>
<h2 id="تنسيق-الأوقات-والتواريخ">تنسيق الأوقات والتواريخ</h2>
<p>تحتوي وحدة <code>datetime</code> على تابع مفيد هو <a href="https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime">strftime</a> لتنسيق التمثيل النصي لكائن datetime. فمثلًا، ستطبع الشيفرة التالية التاريخ الحالي بالصيغة <code>dd.mm.yyyy</code>، ثم التاريخ والوقت بصيغة مختلفة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

my_time = datetime.now()
<span class="hljs-built_in">print</span>(my_time.strftime(<span class="hljs-string">&quot;%d.%m.%Y&quot;</span>))
<span class="hljs-built_in">print</span>(my_time.strftime(<span class="hljs-string">&quot;%d/%m/%Y %H:%M&quot;</span>))
</code></pre>
<pre><code>19.10.2021
19/10/2021 09:31
</code></pre>
<p>ويستخدم تنسيق الوقت محارف معيّنة للدلالة على صيغ محدّدة. وفيما يلي قائمة ببعضها (يُرجى الاطلاع على <a href="https://docs.python.org/3/library/time.html#time.strftime">وثائق</a> Python للحصول على القائمة الكاملة):</p>
<table>
<thead>
<tr>
<th style="text-align:left">الترميز</th>
<th style="text-align:left">الدلالة</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>%d</code></td>
<td style="text-align:left">اليوم (01–31)</td>
</tr>
<tr>
<td style="text-align:left"><code>%m</code></td>
<td style="text-align:left">الشهر (01–12)</td>
</tr>
<tr>
<td style="text-align:left"><code>%Y</code></td>
<td style="text-align:left">السنة بصيغة أربعة أرقام</td>
</tr>
<tr>
<td style="text-align:left"><code>%H</code></td>
<td style="text-align:left">الساعات بصيغة 24 ساعة</td>
</tr>
<tr>
<td style="text-align:left"><code>%M</code></td>
<td style="text-align:left">الدقائق (00–59)</td>
</tr>
<tr>
<td style="text-align:left"><code>%S</code></td>
<td style="text-align:left">الثواني (00–59)</td>
</tr>
</tbody>
</table>
<p>ويمكنك أيضًا تحديد الفاصل بين العناصر المختلفة، كما ترى في الأمثلة أعلاه.</p>
<p>ويعمل تنسيق datetime في الاتجاه المعاكس أيضًا، في حال احتجت إلى تحليل كائن datetime من سلسلة نصية يوفّرها المستخدم. والتابع <a href="https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime">strptime</a> يفعل ذلك بالضبط:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

birthday = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your birthday in the format dd.mm.yyyy: &quot;</span>)
my_time = datetime.strptime(birthday, <span class="hljs-string">&quot;%d.%m.%Y&quot;</span>)

<span class="hljs-keyword">if</span> my_time &lt; datetime(<span class="hljs-number">2000</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You were born in the previous millennium&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You were born during this millennium&quot;</span>)
</code></pre>
<pre><code>Please type in your birthday in the format dd.mm.yyyy: **5.11.1986**
You were born in the previous millennium
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: وقت الشاشة</strong></p>
<p>يُرجى كتابة برنامج لتسجيل مقدار الوقت الذي أمضاه المستخدم أمام شاشة تلفاز أو حاسوب أو جهاز محمول خلال مدة زمنية محدّدة.</p>
</blockquote>
<p>وينبغي أن يعمل البرنامج على النحو التالي:</p>
<pre><code>Filename: **late_june.txt**
Starting date: **24.6.2020**
How many days: **5**
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: **60 120 0**
Screen time 25.06.2020: **0 0 0**
Screen time 26.06.2020: **180 0 0**
Screen time 27.06.2020: **25 240 15**
Screen time 28.06.2020: **45 90 5**
Data stored in file late_june.txt
</code></pre>
<p>وسيُدخل المستخدم كل يوم في سطر مستقل، وستحتوي المُدخلات على ثلاثة أعداد تفصلها مسافات، تمثّل الدقائق.</p>
<p>ومع المُدخل أعلاه، ينبغي أن يخزّن البرنامج البيانات في ملف اسمه <code>late_june.txt</code>. وينبغي أن يبدو المحتوى هكذا:</p>
<pre><code>Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5
</code></pre>
<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 6fff0633-2f18-5e2b-9eab-6c8950c8378b)

-->
`,i={book:e,chapter:n,chapterTitle:s,slug:t,title:a,headings:l,html:p};export{e as book,n as chapter,s as chapterTitle,i as default,l as headings,p as html,t as slug,a as title};
