const n="mit-6100l",t="lecture-10",e="المحاضرة 10: القوائم وقابلية التغيير (Mutability)",s="notes",d="المحاضرة 10: القوائم وقابلية التغيير (Lists, Mutability)",a=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-القوائم-وقابلية-التغيير-lists-mutability",text:"الشريحة 1: القوائم وقابلية التغيير (Lists, Mutability)"},{depth:2,id:"الشريحة-2-الفهرسة-والترتيب-في-القوائم-indices-and-ordering-in-lists",text:"الشريحة 2: الفهرسة والترتيب في القوائم (Indices and Ordering in Lists)"},{depth:2,id:"الشريحة-3-قابلية-التغيير-mutability",text:"الشريحة 3: قابلية التغيير (Mutability)"},{depth:2,id:"الشريحة-4-قابلية-التغيير-مقارنة",text:"الشريحة 4: قابلية التغيير — مقارنة"},{depth:2,id:"الشريحة-5-العمليات-على-القوائم-الإلحاق-operation-on-lists-append",text:"الشريحة 5: العمليات على القوائم — الإلحاق (Operation on Lists — append)"},{depth:2,id:"الشريحة-6-عملية-الإلحاق-خطوة-ثانية",text:"الشريحة 6: عملية الإلحاق — خطوة ثانية"},{depth:2,id:"الشريحة-7-عملية-الإلحاق-ما-الذي-حدث-للقائمة",text:"الشريحة 7: عملية الإلحاق — ما الذي حدث للقائمة؟"},{depth:2,id:"الشريحة-8-عملية-الإلحاق-القيمة-none",text:"الشريحة 8: عملية الإلحاق — القيمة None"},{depth:2,id:"الشريحة-9-عملية-الإلحاق-بإلحاقين-منفصلين",text:"الشريحة 9: عملية الإلحاق — بإلحاقين منفصلين"},{depth:2,id:"الشريحة-10-جرب-بنفسك-you-try-it",text:"الشريحة 10: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-11-الفكرة-الكبرى-big-idea",text:"الشريحة 11: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-12-عملية-الإلحاق-ما-هي-النقطة-what-is-the-dot",text:"الشريحة 12: عملية الإلحاق — ما هي النقطة؟ (What is the dot?)"},{depth:2,id:"الشريحة-13-جرب-بنفسك-you-try-it",text:"الشريحة 13: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-14-جرب-بنفسك-you-try-it",text:"الشريحة 14: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-15-من-النصوص-إلى-القوائم-strings-to-lists",text:"الشريحة 15: من النصوص إلى القوائم (Strings to Lists)"},{depth:2,id:"الشريحة-16-من-القوائم-إلى-النصوص-lists-to-strings",text:"الشريحة 16: من القوائم إلى النصوص (Lists to Strings)"},{depth:2,id:"الشريحة-17-جرب-بنفسك-you-try-it",text:"الشريحة 17: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-18-بعض-عمليات-القوائم-المهمة-a-few-interesting-list-operations",text:"الشريحة 18: بعض عمليات القوائم المهمة (A Few Interesting List Operations)"},{depth:2,id:"الشريحة-19-قابلية-التغيير-المثال-الأول-mutability",text:"الشريحة 19: قابلية التغيير — المثال الأول (Mutability)"},{depth:2,id:"الشريحة-20-قابلية-التغيير-تنفيذ-sort",text:"الشريحة 20: قابلية التغيير — تنفيذ sort()"},{depth:2,id:"الشريحة-21-قابلية-التغيير-تنفيذ-lreverse",text:"الشريحة 21: قابلية التغيير — تنفيذ L.reverse()"},{depth:2,id:"الشريحة-22-قابلية-التغيير-تنفيذ-a-sortedl",text:"الشريحة 22: قابلية التغيير — تنفيذ a = sorted(L)"},{depth:2,id:"الشريحة-23-جرب-بنفسك-you-try-it",text:"الشريحة 23: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-24-الفكرة-الكبرى-big-idea",text:"الشريحة 24: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-25-القوائم-تدعم-التكرار-lists-support-iteration",text:"الشريحة 25: القوائم تدعم التكرار (Lists Support Iteration)"},{depth:2,id:"الشريحة-26-القوائم-تدعم-التكرار-الحل",text:"الشريحة 26: القوائم تدعم التكرار — الحل"},{depth:2,id:"الشريحة-27-تتبع-الشيفرة-بمثال-trace-the-code-with-an-example",text:"الشريحة 27: تتبّع الشيفرة بمثال (Trace the Code with an Example)"},{depth:2,id:"الشريحة-28-تتبع-الشيفرة-طباعة-القبل-والبعد",text:"الشريحة 28: تتبّع الشيفرة — طباعة القبل والبعد"},{depth:2,id:"الشريحة-29-الفكرة-الكبرى-big-idea",text:"الشريحة 29: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-30-التغيير-mutation",text:"الشريحة 30: التغيير (Mutation)"},{depth:2,id:"الشريحة-31-لمحة-عامة-عن-الأمثلة-الصعبة-tricky-examples-overview",text:"الشريحة 31: لمحة عامة عن الأمثلة الصعبة (Tricky Examples Overview)"},{depth:2,id:"الشريحة-32-المثال-الصعب-1-الإلحاق-append",text:"الشريحة 32: المثال الصعب 1 — الإلحاق (append)"},{depth:2,id:"الشريحة-33-المثال-الصعب-1-الرسم-البياني",text:"الشريحة 33: المثال الصعب 1 — الرسم البياني"},{depth:2,id:"الشريحة-34-المثال-الصعب-2-الإلحاق-append",text:"الشريحة 34: المثال الصعب 2 — الإلحاق (append)"},{depth:2,id:"الشريحة-35-دمج-القوائم-combining-lists",text:"الشريحة 35: دمج القوائم (Combining Lists)"},{depth:2,id:"الشريحة-36-دمج-القوائم-استعمال-extend",text:"الشريحة 36: دمج القوائم — استعمال extend"},{depth:2,id:"الشريحة-37-دمج-القوائم-قائمة-داخل-قائمة",text:"الشريحة 37: دمج القوائم — قائمة داخل قائمة"},{depth:2,id:"الشريحة-38-المثال-الصعب-3-الدمج-combining",text:"الشريحة 38: المثال الصعب 3 — الدمج (combining)"},{depth:2,id:"الشريحة-39-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الأول",text:"الشريحة 39: المثال الصعب 3 — الرسم البياني بعد التكرار الأول"},{depth:2,id:"الشريحة-40-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الثاني",text:"الشريحة 40: المثال الصعب 3 — الرسم البياني بعد التكرار الثاني"},{depth:2,id:"الشريحة-41-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الثالث",text:"الشريحة 41: المثال الصعب 3 — الرسم البياني بعد التكرار الثالث"},{depth:2,id:"الشريحة-42-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الرابع",text:"الشريحة 42: المثال الصعب 3 — الرسم البياني بعد التكرار الرابع"},{depth:2,id:"الشريحة-43-إفراغ-قائمة-والتأكد-من-أنها-الكائن-نفسه-empty-out-a-list-and-checking-that-its-the-same-object",text:"الشريحة 43: إفراغ قائمة والتأكّد من أنها الكائن نفسه (Empty Out a List and Checking That It's the Same Object)"},{depth:2,id:"الشريحة-44-الخلاصة-summary",text:"الشريحة 44: الخلاصة (SUMMARY)"},{depth:2,id:"الشريحة-45-mitopencourseware",text:"الشريحة 45: MITOpenCourseWare"}],o=`<h1>المحاضرة 10: القوائم وقابلية التغيير (Lists, Mutability)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-10-lists-mutability/">صفحة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec10_pdf/">صفحة الشرائح الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec10.pdf">ملف الشرائح الأصلي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec10_code.py">ملف شيفرة المحاضرة الأصلي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec10/">تفريغ المحاضرة على OCW</a> (النسخة الإنجليزية الرسمية).</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. الشرائح المتشابهة التي تتكرّر فيها الشيفرة نفسها مع رسم بياني متغيّر نُقلت كلّها، لأن تغيّر الرسم هو معنى الشريحة. المواضع التي رسم فيها MIT القوائم على شكل صناديق نُقلت إلى جداول تربط كل اسم بقيمته. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات.</p>
<h2 id="الشريحة-1-القوائم-وقابلية-التغيير-lists-mutability">الشريحة 1: القوائم وقابلية التغيير (Lists, Mutability)</h2>
<p>نزّل الشرائح وملفات <code>.py</code> لمتابعة الشرح.</p>
<p>6.100L، المحاضرة 10 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-الفهرسة-والترتيب-في-القوائم-indices-and-ordering-in-lists">الشريحة 2: الفهرسة والترتيب في القوائم (Indices and Ordering in Lists)</h2>
<pre><code class="language-python">a_list = []
L = [<span class="hljs-number">2</span>, <span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-number">4</span>, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>]]
</code></pre>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>len(L)</code></td>
<td>يُقيَّم إلى <code>4</code></td>
</tr>
<tr>
<td><code>L[0]</code></td>
<td>يُقيَّم إلى <code>2</code></td>
</tr>
<tr>
<td><code>L[3]</code></td>
<td>يُقيَّم إلى <code>[1,2]</code> — أي قائمة أخرى!</td>
</tr>
<tr>
<td><code>[2,'a'] + [5,6]</code></td>
<td>يُقيَّم إلى <code>[2,'a',5,6]</code></td>
</tr>
<tr>
<td><code>max([3,5,0])</code></td>
<td>يُقيَّم إلى <code>5</code></td>
</tr>
<tr>
<td><code>L[1:3]</code></td>
<td>يُقيَّم إلى <code>['a', 4]</code></td>
</tr>
<tr>
<td><code>for e in L</code></td>
<td>متغيّر الحلقة يأخذ كل عنصر في <code>L</code> بالترتيب</td>
</tr>
<tr>
<td><code>L[3] = 10</code></td>
<td>يُغيِّر (Mutates) <code>L</code> لتصبح <code>[2,'a',4,10]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-3-قابلية-التغيير-mutability">الشريحة 3: قابلية التغيير (Mutability)</h2>
<ul>
<li>القوائم قابلة للتغيير (Mutable)!</li>
<li>الإسناد إلى عنصر عند فهرس يغيّر القيمة:</li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>]
L[<span class="hljs-number">1</span>] = <span class="hljs-number">5</span>
</code></pre>
<ul>
<li>صارت <code>L</code> الآن <code>[2, 5, 3]</code>؛ ولاحظ أن هذه هي الكائن نفسه <code>L</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة قبل</th>
<th>القيمة بعد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[2,4,3]</code></td>
<td><code>[2,5,3]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-4-قابلية-التغيير-مقارنة">الشريحة 4: قابلية التغيير — مقارنة</h2>
<ul>
<li>قارن بين:
<ul>
<li>إنشاء <code>L</code> بتغيير عنصر (Mutating an Element)، و</li>
<li>إنشاء <code>t</code> بإنشاء كائن جديد (Creating a New Object).</li>
</ul>
</li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>]
L[<span class="hljs-number">1</span>] = <span class="hljs-number">5</span>

t = (<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>)
t = (<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[2,4,3]</code> ثم <code>[2,5,3]</code> — الكائن نفسه تغيّر</td>
</tr>
<tr>
<td><code>t</code></td>
<td><code>(2,4,3)</code> ثم <code>(2,5,3)</code> — كائن جديد، فالكائن الأول لم يتغيّر</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-5-العمليات-على-القوائم-الإلحاق-operation-on-lists-append">الشريحة 5: العمليات على القوائم — الإلحاق (Operation on Lists — append)</h2>
<ul>
<li>أضف عنصرًا إلى نهاية القائمة بـ <code>L.append(element)</code>.</li>
<li>هذا <strong>يغيّر</strong> القائمة (Mutates the list)!</li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
L.append(<span class="hljs-number">5</span>)
</code></pre>
<ul>
<li>صارت <code>L</code> الآن <code>[2,1,3,5]</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة قبل</th>
<th>القيمة بعد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[2,1,3]</code></td>
<td><code>[2,1,3,5]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-6-عملية-الإلحاق-خطوة-ثانية">الشريحة 6: عملية الإلحاق — خطوة ثانية</h2>
<p>نفس الشرح، مع إضافة السطر:</p>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
L.append(<span class="hljs-number">5</span>)
L = L.append(<span class="hljs-number">5</span>)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[2,1,3,5]</code></td>
</tr>
</tbody>
</table>
<p><strong>تنبيه:</strong> الأسطر في الشرائح 5 و6 معروضة كمثال على خطأ شائع، والمقصود إظهار أن <code>append</code> تُرجِع <code>None</code>، فالسطر الثالث لا يضيف شيئًا ويكسر الربط.</p>
<h2 id="الشريحة-7-عملية-الإلحاق-ما-الذي-حدث-للقائمة">الشريحة 7: عملية الإلحاق — ما الذي حدث للقائمة؟</h2>
<p>نفس الشيفرة. القائمة الفعلية في الذاكرة صارت:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة في الذاكرة</th>
<th>القيمة المربوطة بالاسم</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[2,1,3,5,5]</code></td>
<td>ما زالت تشير إلى <code>[2,1,3,5]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-8-عملية-الإلحاق-القيمة-none">الشريحة 8: عملية الإلحاق — القيمة <code>None</code></h2>
<p>نفس الشيفرة. صار الاسم <code>L</code> مربوطًا بالقيمة <code>None</code>، بينما الكائن في الذاكرة هو <code>[2,1,3,5,5]</code>.</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>None</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-9-عملية-الإلحاق-بإلحاقين-منفصلين">الشريحة 9: عملية الإلحاق — بإلحاقين منفصلين</h2>
<p>نفس الشرح مع الشيفرة الصحيحة التي يوضّحها MIT:</p>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
L.append(<span class="hljs-number">5</span>)
L.append(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(L)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة قبل</th>
<th>القيمة بعد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[2,1,3]</code></td>
<td><code>[2,1,3,5,5]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-10-جرب-بنفسك-you-try-it">الشريحة 10: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>ما قيم <code>L1</code> و<code>L2</code> و<code>L3</code> و<code>L</code> في النهاية؟</p>
<pre><code class="language-python">L1 = [<span class="hljs-string">&#x27;re&#x27;</span>]
L2 = [<span class="hljs-string">&#x27;mi&#x27;</span>]
L3 = [<span class="hljs-string">&#x27;do&#x27;</span>]
L4 = L1 + L2
L3.append(L4)
L = L1.append(L3)
</code></pre>
<h2 id="الشريحة-11-الفكرة-الكبرى-big-idea">الشريحة 11: الفكرة الكبرى (BIG IDEA)</h2>
<blockquote>
<p>بعض الدوال تُغيّر القائمة ولا تُرجِع شيئًا. نستعمل هذه الدوال لأثرها الجانبي (Side Effect).</p>
</blockquote>
<h2 id="الشريحة-12-عملية-الإلحاق-ما-هي-النقطة-what-is-the-dot">الشريحة 12: عملية الإلحاق — ما هي النقطة؟ (What is the dot?)</h2>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
L.append(<span class="hljs-number">5</span>)
</code></pre>
<ul>
<li>القوائم كائنات في بايثون، وكل شيء في بايثون كائن.</li>
<li>الكائنات لها بيانات (Data).</li>
<li>لأنواع الكائنات عمليات مرتبطة بها (Associated Operations).</li>
<li>الوصول إلى هذه المعلومة بالصيغة <code>object_name.do_something()</code>.</li>
<li>هذا يكافئ استدعاء <code>append</code> بالوسيطين <code>L</code> و<code>5</code>.</li>
</ul>
<h2 id="الشريحة-13-جرب-بنفسك-you-try-it">الشريحة 13: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">make_ordered_list</span>(<span class="hljs-params">n</span>):
    <span class="hljs-string">&quot;&quot;&quot; n is a positive int
    Returns a list containing all ints in order
    from 0 to n (inclusive)
    &quot;&quot;&quot;</span>
</code></pre>
<h2 id="الشريحة-14-جرب-بنفسك-you-try-it">الشريحة 14: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_elem</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L is a list
    Returns a new list with elements in the same order as L
    but without any elements equal to e.
    &quot;&quot;&quot;</span>
L = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>]
<span class="hljs-built_in">print</span>(remove_elem(L, <span class="hljs-number">2</span>))

<span class="hljs-comment"># prints [1]</span>
</code></pre>
<h2 id="الشريحة-15-من-النصوص-إلى-القوائم-strings-to-lists">الشريحة 15: من النصوص إلى القوائم (Strings to Lists)</h2>
<ul>
<li>حوّل نصًّا إلى قائمة بـ <code>list(s)</code>.</li>
<li>كل محرف في <code>s</code> يصبح عنصرًا في القائمة.</li>
<li>استعمل <code>s.split()</code> لتقسيم نص على محرف مُمرَّر كمعامل، ويُقسَّم على المسافات إذا استُدعيت دون معامل.</li>
</ul>
<pre><code class="language-python">s = <span class="hljs-string">&quot;I&lt;3 cs &amp;u?&quot;</span>
L = <span class="hljs-built_in">list</span>(s)
L1 = s.split(<span class="hljs-string">&#x27; &#x27;</span>)
L2 = s.split(<span class="hljs-string">&#x27;&lt;&#x27;</span>)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>s</code></td>
<td>نص</td>
</tr>
<tr>
<td><code>L</code></td>
<td><code>['I','&lt;','3',' ','c','s',' ','&amp;','u','?']</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>['I&lt;3','cs','&amp;u?']</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>['I', '3 cs &amp;u?']</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-16-من-القوائم-إلى-النصوص-lists-to-strings">الشريحة 16: من القوائم إلى النصوص (Lists to Strings)</h2>
<ul>
<li>حوّل قائمة نصوص إلى نص.</li>
<li>استعمل <code>''.join(L)</code> لتحويل قائمة نصوص إلى نص أكبر.</li>
<li>يمكن تمرير محرف بين علامتَي تنصيص ليُضاف بين كل عنصرين.</li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-string">&#x27;a&#x27;</span>,<span class="hljs-string">&#x27;b&#x27;</span>,<span class="hljs-string">&#x27;c&#x27;</span>]
A = <span class="hljs-string">&#x27;&#x27;</span>.join(L)
B = <span class="hljs-string">&#x27;_&#x27;</span>.join(L)
C = <span class="hljs-string">&#x27;&#x27;</span>.join([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])
C = <span class="hljs-string">&#x27;&#x27;</span>.join([<span class="hljs-string">&#x27;1&#x27;</span>,<span class="hljs-string">&#x27;2&#x27;</span>,<span class="hljs-string">&#x27;3&#x27;</span>])
</code></pre>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td>قائمة</td>
</tr>
<tr>
<td><code>A</code></td>
<td><code>&quot;abc&quot;</code></td>
</tr>
<tr>
<td><code>B</code></td>
<td><code>&quot;a_b_c&quot;</code></td>
</tr>
<tr>
<td><code>''.join([1,2,3])</code></td>
<td>خطأ (Error)</td>
</tr>
<tr>
<td><code>C</code></td>
<td><code>&quot;123&quot;</code> — نص!</td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> السطر الرابع في النصّ المستخرَج ناقص قوسًا إغلاقًا؛ اعتُمدت صياغته الصحيحة <code>''.join(['1','2','3'])</code> لأن الشرح يصف الناتج <code>&quot;123&quot;</code> نصًّا.</p>
<h2 id="الشريحة-17-جرب-بنفسك-you-try-it">الشريحة 17: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">count_words</span>(<span class="hljs-params">sen</span>):
    <span class="hljs-string">&quot;&quot;&quot; sen is a string representing a sentence
    Returns how many words are in s (i.e. a word is a
    a sequence of characters between spaces. &quot;&quot;&quot;</span>
<span class="hljs-built_in">print</span>(count_words(<span class="hljs-string">&quot;Hello it&#x27;s me&quot;</span>))
</code></pre>
<h2 id="الشريحة-18-بعض-عمليات-القوائم-المهمة-a-few-interesting-list-operations">الشريحة 18: بعض عمليات القوائم المهمة (A Few Interesting List Operations)</h2>
<ul>
<li>
<p><strong>إضافة عنصر إلى نهاية القائمة</strong> بـ <code>L.append(element)</code> — تُغيّر القائمة (Mutates the list).</p>
</li>
<li>
<p><strong><code>sort()</code></strong></p>
</li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">7</span>]
L.sort()
</code></pre>
<p>تُغيّر <code>L</code>.</p>
<ul>
<li><strong><code>reverse()</code></strong></li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">7</span>]
L.reverse()
</code></pre>
<p>تُغيّر <code>L</code>.</p>
<ul>
<li><strong><code>sorted()</code></strong></li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">7</span>]
L_new = <span class="hljs-built_in">sorted</span>(L)
</code></pre>
<p>تُرجِع نسخة مرتّبة من <code>L</code> (بلا تغيير في <code>L</code>!).</p>
<h2 id="الشريحة-19-قابلية-التغيير-المثال-الأول-mutability">الشريحة 19: قابلية التغيير — المثال الأول (Mutability)</h2>
<pre><code class="language-python">L=[<span class="hljs-number">9</span>,<span class="hljs-number">6</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>]
L.append(<span class="hljs-number">5</span>)

a = <span class="hljs-built_in">sorted</span>(L) <span class="hljs-comment"># returns a new sorted list, does not mutate L</span>

b = L.sort() <span class="hljs-comment"># mutates L to be [0,3,5,6,9] and returns None</span>

L.reverse()  <span class="hljs-comment"># mutates L to be [9,6,5,3,0] and returns None</span>
</code></pre>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة قبل</th>
<th>القيمة بعد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[9,6,0,3]</code></td>
<td><code>[9,6,0,3,5]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-20-قابلية-التغيير-تنفيذ-sort">الشريحة 20: قابلية التغيير — تنفيذ <code>sort()</code></h2>
<p>نفس الشيفرة، وبعد تنفيذ <code>b = L.sort()</code>:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code></td>
<td><code>[0,3,5,6,9]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-21-قابلية-التغيير-تنفيذ-lreverse">الشريحة 21: قابلية التغيير — تنفيذ <code>L.reverse()</code></h2>
<p>نفس الشيفرة. اسم جديد في النطاق العام قيمته <code>None</code>، و<code>L</code> ما زالت <code>[0,3,5,6,9]</code> قبل تنفيذ <code>reverse</code>:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>b</code></td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>L</code></td>
<td><code>[0,3,5,6,9]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-22-قابلية-التغيير-تنفيذ-a-sortedl">الشريحة 22: قابلية التغيير — تنفيذ <code>a = sorted(L)</code></h2>
<p>نفس الشيفرة. ظهر اسم جديد <code>a</code> في النطاق العام، و<code>L</code> صارت <code>[9,6,5,3,0]</code> بعد <code>reverse</code>:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>a</code></td>
<td><code>[0,3,5,6,9]</code> — القائمة الجديدة المرتّبة</td>
</tr>
<tr>
<td><code>b</code></td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>L</code></td>
<td><code>[9,6,5,3,0]</code></td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> يبيّن النصّ المستخرَج أن <code>a</code> تحتفظ بنسخة <code>[0,3,5,6,9]</code> من حين استُدعيت <code>sorted</code>، بينما <code>L</code> نفسها صارت <code>[9,6,5,3,0]</code> بعد <code>L.reverse()</code>. هذا هو الفرق الجوهري بين <code>sorted</code> و<code>sort</code> و<code>reverse</code>.</p>
<h2 id="الشريحة-23-جرب-بنفسك-you-try-it">الشريحة 23: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sort_words</span>(<span class="hljs-params">sen</span>):
    <span class="hljs-string">&quot;&quot;&quot; sen is a string representing a sentence
    Returns a list containing all the words in sen but
    sorted in alphabetical order. &quot;&quot;&quot;</span>
<span class="hljs-built_in">print</span>(sort_words(<span class="hljs-string">&quot;look at this photograph&quot;</span>))
</code></pre>
<h2 id="الشريحة-24-الفكرة-الكبرى-big-idea">الشريحة 24: الفكرة الكبرى (BIG IDEA)</h2>
<blockquote>
<p>الدوال ذات الآثار الجانبية (Side Effects) تُغيّر مُدخلاتها. ويمكنك أن تكتب مثلها بنفسك!</p>
</blockquote>
<h2 id="الشريحة-25-القوائم-تدعم-التكرار-lists-support-iteration">الشريحة 25: القوائم تدعم التكرار (Lists Support Iteration)</h2>
<ul>
<li>لنكتب دالة تُغيّر مُدخلها.</li>
<li>مثال: تربيع كل عنصر في قائمة، مع تغيير القائمة الأصلية.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">square_list</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">for</span> elem <span class="hljs-keyword">in</span> L:
        <span class="hljs-comment"># ?? How to do L[index] = the square ??</span>
        <span class="hljs-comment"># ?? elem is an element in L, not the index :(</span>
</code></pre>
<ul>
<li>الحلول (سنتناول الخيار الثاني، جرّب البقية بنفسك):
<ul>
<li><strong>الخيار 1:</strong> أنشئ متغيّرًا جديدًا يمثّل الفهرس، يتهيّأ إلى <code>0</code> قبل الحلقة ويزداد بمقدار <code>1</code> داخل الحلقة.</li>
<li><strong>الخيار 2:</strong> مرّ على الفهرس لا على العنصر، واستعمل <code>L[index]</code> للحصول على العنصر.</li>
<li><strong>الخيار 3:</strong> استعمل <code>enumerate</code> في حلقة <code>for</code> (أترك لك البحث عن هذا الخيار)، أي <code>for i,e in enumerate(L)</code>.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-26-القوائم-تدعم-التكرار-الحل">الشريحة 26: القوائم تدعم التكرار — الحل</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">square_list</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L)):
        L[i] = L[i]**<span class="hljs-number">2</span>
</code></pre>
<ul>
<li>لاحظ: لا يوجد <code>return</code>!</li>
</ul>
<h2 id="الشريحة-27-تتبع-الشيفرة-بمثال-trace-the-code-with-an-example">الشريحة 27: تتبّع الشيفرة بمثال (Trace the Code with an Example)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">square_list</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L)):
        L[i] = L[i]**<span class="hljs-number">2</span>
</code></pre>
<p>نفترض أن <code>L</code> هي <code>[2,3,4]</code>:</p>
<table>
<thead>
<tr>
<th>الخطوة</th>
<th><code>i</code></th>
<th><code>L</code> بعد التغيير</th>
</tr>
</thead>
<tbody>
<tr>
<td>الأولى</td>
<td><code>0</code></td>
<td><code>[4, 3, 4]</code></td>
</tr>
<tr>
<td>الثانية</td>
<td><code>1</code></td>
<td><code>[4, 9, 4]</code></td>
</tr>
<tr>
<td>الثالثة</td>
<td><code>2</code></td>
<td><code>[4, 9, 16]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-28-تتبع-الشيفرة-طباعة-القبل-والبعد">الشريحة 28: تتبّع الشيفرة — طباعة القبل والبعد</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">square_list</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L)):
        L[i] = L[i]**<span class="hljs-number">2</span>

Lin = [<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;before fcn call:&quot;</span>,Lin)  <span class="hljs-comment"># prints [2,3,4]</span>

square_list(Lin)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;after fcn call:&quot;</span>,Lin)   <span class="hljs-comment"># prints [4,9,16]</span>
</code></pre>
<h2 id="الشريحة-29-الفكرة-الكبرى-big-idea">الشريحة 29: الفكرة الكبرى (BIG IDEA)</h2>
<blockquote>
<p>الدوال التي تُغيّر مُدخلها على الأرجح… مرّ على <code>len(L)</code> لا على <code>L</code>. وتُرجِع <code>None</code>، فلا حاجة لحفظ نتيجة استدعاء الدالة.</p>
</blockquote>
<h2 id="الشريحة-30-التغيير-mutation">الشريحة 30: التغيير (Mutation)</h2>
<ul>
<li>القوائم بنى قابلة للتغيير (Mutable Structures).</li>
<li>ولها مزايا كثيرة:
<ul>
<li>لنفترض أن لدي قائمة طويلة جدًا (مثلًا سجلات موظفين) وأريد تحديث عنصر واحد. بدون التغيير (Mutation) لما كنت مضطرًّا إلى نسخ القائمة كاملة، مع نسخة جديدة من ذلك السجل في الموضع الصحيح. البنية القابلة للتغيير تتيح لي تغيير ذلك العنصر وحده.</li>
</ul>
</li>
<li>لكن هذه القدرة قد تضيف تحدّيات غير متوقّعة.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> نُقل المعنى كاملًا، وسُبِقت كلمة «مزايا» بما يقابل <code>advantages</code> في الأصل.</p>
<h2 id="الشريحة-31-لمحة-عامة-عن-الأمثلة-الصعبة-tricky-examples-overview">الشريحة 31: لمحة عامة عن الأمثلة الصعبة (Tricky Examples Overview)</h2>
<ul>
<li><strong>المثال الصعب 1:</strong> حلقة تمرّ على فهارس <code>L</code> وتُغيّر <code>L</code> في كل مرة (تضيف عناصر أكثر).</li>
<li><strong>المثال الصعب 2:</strong> حلقة تمرّ على عناصر <code>L</code> مباشرة وتُغيّر <code>L</code> في كل مرة (تضيف عناصر أكثر).</li>
<li><strong>المثال الصعب 3:</strong> حلقة تمرّ على عناصر <code>L</code> مباشرة لكنها تُعيد إسناد <code>L</code> إلى كائن جديد في كل مرة.</li>
<li><strong>المثال الصعب 4 (في المحاضرة القادمة):</strong> حلقة تمرّ على عناصر <code>L</code> مباشرة وتُغيّر <code>L</code> بإزالة عناصر.</li>
</ul>
<h2 id="الشريحة-32-المثال-الصعب-1-الإلحاق-append">الشريحة 32: المثال الصعب 1 — الإلحاق (append)</h2>
<ul>
<li><code>range</code> تُرجِع شيئًا يتصرّف مثل الصف (لكنه ليس صفًّا؛ فهي تُرجِع قيمة قابلة للتكرار — Iterable).</li>
<li>تُرجِع العنصر الأول، وطريقة تكرار (Iteration Method) تُولِّد بها العناصر التالية عند الحاجة.</li>
</ul>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>المقابل التقريبي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>range(4)</code></td>
<td>مثل الصف <code>(0,1,2,3)</code></td>
</tr>
<tr>
<td><code>range(2,9,2)</code></td>
<td>مثل الصف <code>(2,4,6,8)</code></td>
</tr>
</tbody>
</table>
<pre><code class="language-python">L = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L)):
    L.append(i)

<span class="hljs-built_in">print</span>(L)
</code></pre>
<p>لأن <code>len(L)</code> تُقيَّم مرة واحدة عند إنشاء كائن <code>range</code> القابل للتكرار، تتوقف الحلقة عند أربع تكرارات:</p>
<table>
<thead>
<tr>
<th>التكرار</th>
<th>حالة <code>L</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>الأولى</td>
<td><code>[1, 2, 3, 4, 0]</code></td>
</tr>
<tr>
<td>الثانية</td>
<td><code>[1, 2, 3, 4, 0, 1]</code></td>
</tr>
<tr>
<td>الثالثة</td>
<td><code>[1, 2, 3, 4, 0, 1, 2]</code></td>
</tr>
<tr>
<td>الرابعة</td>
<td><code>[1, 2, 3, 4, 0, 1, 2, 3]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-33-المثال-الصعب-1-الرسم-البياني">الشريحة 33: المثال الصعب 1 — الرسم البياني</h2>
<p>نفس الشيفرة، ومعها رسمة الكائنات:</p>
<table>
<thead>
<tr>
<th>الكائن/الاسم</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>(0,1,2,3)</code></td>
<td>كائن <code>range</code> الذي أنشأته <code>range(len(L))</code></td>
</tr>
<tr>
<td><code>i</code></td>
<td>متغيّر الحلقة، قيمته <code>3</code> في التكرار الأخير</td>
</tr>
<tr>
<td><code>L</code></td>
<td><code>[1,2,3,4,0,1,2,3]</code></td>
</tr>
<tr>
<td>الكائن الفعلي في الذاكرة</td>
<td><code>[1,2,3,4,0,1,2,3]</code></td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> الشرائح تعرض القيم على جانبي السطر: قائمة في الذاكرة وقيمة الاسم الذي يشير إليها. نُقلت الجداول أعلاه، وسطرا القائمة المبدئية <code>[1,2,3,4]</code> والقائمة النهائية <code>[1,2,3,4,0,1,2,3]</code> كلاهما حاضران في النصّ المستخرَج.</p>
<h2 id="الشريحة-34-المثال-الصعب-2-الإلحاق-append">الشريحة 34: المثال الصعب 2 — الإلحاق (append)</h2>
<ul>
<li>يبدو مشابهًا لكن…</li>
</ul>
<pre><code class="language-python">L = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
i = <span class="hljs-number">0</span>

<span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L:
    L.append(i)
    i += <span class="hljs-number">1</span>

<span class="hljs-built_in">print</span>(L)
</code></pre>
<ul>
<li>في المثال السابق، كان <code>L</code> يُستعمَل عند البداية لإنشاء <code>range</code> قابل للتكرار؛ وفي هذا المثال، الحلقة تصل مباشرة إلى فهارس <code>L</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>التكرار</th>
<th><code>e</code></th>
<th>حالة <code>L</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>الأولى</td>
<td><code>1</code></td>
<td><code>[1, 2, 3, 4, 0]</code></td>
</tr>
<tr>
<td>الثانية</td>
<td><code>2</code></td>
<td><code>[1, 2, 3, 4, 0, 1]</code></td>
</tr>
<tr>
<td>الثالثة</td>
<td><code>3</code></td>
<td><code>[1, 2, 3, 4, 0, 1, 2]</code></td>
</tr>
<tr>
<td>الرابعة</td>
<td><code>4</code></td>
<td><code>[1, 2, 3, 4, 0, 1, 2, 3]</code></td>
</tr>
</tbody>
</table>
<p><strong>لا تتوقّف أبدًا! (NEVER STOPS!)</strong></p>
<p><strong>ملاحظة المترجم:</strong> جدول القيم لـ<code>e</code> أعلاه مستخرج من الأرقام الظاهرة في شريحة الرسم البياني لهذه الشريحة. والنتيجة النهائية للحلقة لا تنتهي لأن <code>len</code> القائمة تتزايد في كل دورة؛ وهذا هو سبب تسميتها «المثال الصعب 2» في الشريحة 31.</p>
<h2 id="الشريحة-35-دمج-القوائم-combining-lists">الشريحة 35: دمج القوائم (Combining Lists)</h2>
<ul>
<li>الدم (Concatenation) عبر المشغّل <code>+</code> ينشئ قائمة جديدة <strong>بنسخ</strong> (With Copies).</li>
<li>لتغيير القائمة استعمل <code>L.extend(some_list)</code> (نسخة من <code>some_list</code>).</li>
</ul>
<pre><code class="language-python">L1 = [<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
L2 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
L3 = L1 + L2
</code></pre>
<ul>
<li><code>L3</code> هي <code>[2,1,3,4,5,6]</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1</code></td>
<td><code>[2,1,3]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[4,5,6]</code></td>
</tr>
<tr>
<td><code>L3</code></td>
<td><code>[2,1,3,4,5,6]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-36-دمج-القوائم-استعمال-extend">الشريحة 36: دمج القوائم — استعمال <code>extend</code></h2>
<p>نفس الشيفرة، مع:</p>
<pre><code class="language-python">L1.extend([<span class="hljs-number">0</span>,<span class="hljs-number">6</span>])
</code></pre>
<ul>
<li><code>L3</code> ما زالت <code>[2,1,3,4,5,6]</code>.</li>
<li>صارت <code>L1</code> هي <code>[2,1,3,0,6]</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1</code></td>
<td><code>[2,1,3,0,6]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[4,5,6]</code></td>
</tr>
<tr>
<td><code>L3</code></td>
<td><code>[2,1,3,4,5,6]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-37-دمج-القوائم-قائمة-داخل-قائمة">الشريحة 37: دمج القوائم — قائمة داخل قائمة</h2>
<p>نفس الشيفرة، مع:</p>
<pre><code class="language-python">L1.extend([<span class="hljs-number">0</span>,<span class="hljs-number">6</span>])
L2.extend([[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]])
</code></pre>
<ul>
<li>صارت <code>L2</code> هي <code>[4,5,6,[1,2],[3,4]]</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1</code></td>
<td><code>[2,1,3,0,6]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[4,5,6,[1,2],[3,4]]</code></td>
</tr>
<tr>
<td><code>L3</code></td>
<td><code>[2,1,3,4,5,6]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-38-المثال-الصعب-3-الدمج-combining">الشريحة 38: المثال الصعب 3 — الدمج (combining)</h2>
<pre><code class="language-python">L = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]

<span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L:
    L = L + L

<span class="hljs-built_in">print</span>(L)
</code></pre>
<table>
<thead>
<tr>
<th>التكرار</th>
<th><code>L</code> الجديدة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الأولى</td>
<td><code>[1, 2, 3, 4, 1, 2, 3, 4]</code></td>
</tr>
<tr>
<td>الثانية</td>
<td><code>[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]</code></td>
</tr>
<tr>
<td>الثالثة</td>
<td>32 عنصرًا: تكرار <code>1, 2, 3, 4</code> ثماني مرات</td>
</tr>
<tr>
<td>الرابعة</td>
<td>64 عنصرًا: تكرار <code>1, 2, 3, 4</code> ستَّ عشرة مرة</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-39-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الأول">الشريحة 39: المثال الصعب 3 — الرسم البياني بعد التكرار الأول</h2>
<p>نفس الشيفرة. القيم بعد التكرار الأول:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>e</code></td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>L</code> (القائمة القديمة في الذاكرة)</td>
<td><code>[1,2,3,4]</code></td>
</tr>
<tr>
<td><code>L</code> (القيمة الجديدة)</td>
<td><code>[1,2,3,4,1,2,3,4]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-40-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الثاني">الشريحة 40: المثال الصعب 3 — الرسم البياني بعد التكرار الثاني</h2>
<p>نفس الشيفرة. القيم بعد التكرار الثاني:</p>
<table>
<thead>
<tr>
<th>الاسم / الكائن</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>e</code></td>
<td><code>1</code></td>
</tr>
<tr>
<td>القائمة القديمة في الذاكرة</td>
<td><code>[1,2,3,4]</code></td>
</tr>
<tr>
<td><code>L</code> الحالية</td>
<td><code>[1,2,3,4,1,2,3,4]</code></td>
</tr>
<tr>
<td><code>L</code> الجديدة</td>
<td>16 عنصرًا: تكرار <code>1,2,3,4</code> أربع مرات</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-41-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الثالث">الشريحة 41: المثال الصعب 3 — الرسم البياني بعد التكرار الثالث</h2>
<p>نفس الشيفرة. القيم بعد التكرار الثالث:</p>
<table>
<thead>
<tr>
<th>الاسم / الكائن</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>e</code></td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>L</code> الحالية</td>
<td>16 عنصرًا: تكرار <code>1,2,3,4</code> أربع مرات</td>
</tr>
<tr>
<td><code>L</code> الجديدة</td>
<td>32 عنصرًا: تكرار <code>1,2,3,4</code> ثماني مرات</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-42-المثال-الصعب-3-الرسم-البياني-بعد-التكرار-الرابع">الشريحة 42: المثال الصعب 3 — الرسم البياني بعد التكرار الرابع</h2>
<p>نفس الشيفرة. القيم بعد التكرار الرابع:</p>
<table>
<thead>
<tr>
<th>الاسم / الكائن</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L</code> الحالية</td>
<td>32 عنصرًا: تكرار <code>1,2,3,4</code> ثماني مرات</td>
</tr>
<tr>
<td><code>L</code> الجديدة</td>
<td>64 عنصرًا: تكرار <code>1,2,3,4</code> ستَّ عشرة مرة</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-43-إفراغ-قائمة-والتأكد-من-أنها-الكائن-نفسه-empty-out-a-list-and-checking-that-its-the-same-object">الشريحة 43: إفراغ قائمة والتأكّد من أنها الكائن نفسه (Empty Out a List and Checking That It's the Same Object)</h2>
<ul>
<li>يمكنك تغيير قائمة لإزالة كل عناصرها.</li>
<li>هذا <strong>لا ينشئ</strong> قائمة فارغة جديدة!</li>
</ul>
<p>استعمل <code>L.clear()</code>.</p>
<p>كيف تتحقّق من أنها الكائن نفسه في الذاكرة؟ استعمل الدالة <code>id()</code>.</p>
<p>جرّب هذا في الطرفية (Console):</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>L = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
<span class="hljs-meta">&gt;&gt;&gt; </span>L.append(<span class="hljs-number">8</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">id</span>(L)
<span class="hljs-meta">&gt;&gt;&gt; </span>L.clear()
<span class="hljs-meta">&gt;&gt;&gt; </span>L = []
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">id</span>(L)
</code></pre>
<p><strong>ملاحظة المترجم:</strong> الشريحة تعرض <code>id(L)</code> بعد كل خطوة من هذه السلسلة؛ والأرقام المعروضة لقيم <code>id</code> في الأصل لم يحفظها النصّ المستخرَج، ولذلك لم تُنقل هنا ولم يُخمَّن شيء عنها. الفكرة التي يعلّمها المثال أن <code>L.clear()</code> يُبقي <code>id(L)</code> كما هو، بينما <code>L = []</code> يعطي <code>id</code> مختلفًا.</p>
<h2 id="الشريحة-44-الخلاصة-summary">الشريحة 44: الخلاصة (SUMMARY)</h2>
<ul>
<li>القوائم والصفوف توفّر طريقة لتنظيم البيانات تدعم طبيعيًّا الدوال التكرارية (Iterative Functions).</li>
<li>الصفوف غير قابلة للتغيير (Immutable) مثل النصوص:
<ul>
<li>الصفوف مفيدة حين تكون لديك بيانات لا تحتاج إلى تغيير، مثل <code>(خط العرض، خط الطول)</code> أو <code>(رقم الصفحة، رقم السطر)</code>.</li>
</ul>
</li>
<li>القوائم قابلة للتغيير (Mutable):
<ul>
<li>يمكنك تعديل الكائن بتغيير عنصر عند فهرس.</li>
<li>يمكنك تعديل الكائن بإضافة عناصر إلى النهاية.</li>
<li>سنرى عمليات كثيرة أخرى على القوائم في المحاضرة القادمة.</li>
<li>القوائم مفيدة في الحالات الديناميكية، مثل قائمة أفضل 40 أغنية يوميًا أو قائمة الأفلام التي شُوهدت مؤخّرًا.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-45-mitopencourseware">الشريحة 45: MITOpenCourseWare</h2>
<p>https://ocw.mit.edu</p>
<p>مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.</p>
<p>للاطّلاع على كيفية الاستشهاد بهذه المواد أو على شروط الاستخدام: https://ocw.mit.edu/terms.</p>
`,c={book:n,chapter:t,chapterTitle:e,slug:s,title:d,headings:a,html:o};export{n as book,t as chapter,e as chapterTitle,c as default,a as headings,o as html,s as slug,d as title};
