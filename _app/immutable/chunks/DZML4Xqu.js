const n="mit-6100l",s="recitations",l="الجلسات التطبيقية",t="rec2",a="الجلسة التطبيقية 2: النصوص، والتكرار",e=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"مراجعة-المحاضرة-2-النصوص-والإدخالالإخراج-والتفريع",text:"مراجعة المحاضرة 2: النصوص، والإدخال/الإخراج، والتفريع"},{depth:3,id:"النصوص-strings",text:"النصوص (Strings)"},{depth:3,id:"الإدخال-input",text:"الإدخال (Input)"},{depth:3,id:"الإخراج-output",text:"الإخراج (Output)"},{depth:3,id:"التفريع-branching",text:"التفريع (Branching)"},{depth:2,id:"مراجعة-المحاضرة-3-الحلقات-وطرق-التكرار",text:"مراجعة المحاضرة 3: الحلقات وطرق التكرار"},{depth:3,id:"آليات-التكرار-looping-mechanisms",text:"آليات التكرار (Looping Mechanisms)"},{depth:3,id:"حلقات-for",text:"حلقات for"},{depth:3,id:"حلقات-while",text:"حلقات while"}],i=`<h1>الجلسة التطبيقية 2 (Recitation 2)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec02_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والشيفرة والتذكيرات كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف Word. فقد استخراج النصّ بعض المسافات البادئة، وفصل سهمَي الشرح اللذين كانا داخل سطر واحد إلى نصّ مستقل. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » وشرطة الطرح « – » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-3-iteration/">المحاضرة 3: التكرار (Iteration)</a>. ويعرض ملخّصها مراجعةً لما في المحاضرتين 2 و3: النصوص (Strings) والإدخال/الإخراج (Input/Output) والتفريع (Branching)، ثم آليات التكرار (Looping Mechanisms).</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 2 — 16 سبتمبر 2022.</p>
<ul>
<li>مسابقة MQ 2 الأربعاء المقبل.</li>
<li>التسليم المرحلي في منتصف مجموعة المسائل PS1 مستحقّ الأربعاء المقبل.</li>
<li>تمارين الإصبع قبل كلّ محاضرة.</li>
</ul>
<h2 id="مراجعة-المحاضرة-2-النصوص-والإدخالالإخراج-والتفريع">مراجعة المحاضرة 2: النصوص، والإدخال/الإخراج، والتفريع</h2>
<h3 id="النصوص-strings">النصوص (Strings)</h3>
<ul>
<li>نوع بيانات جديد — وهو تسلسل من المحارف.</li>
</ul>
<pre><code class="language-python">my_string = <span class="hljs-string">&quot;Hello world!&quot;</span>
</code></pre>
<ul>
<li>يمكن فهرستها وتقطيعها:</li>
</ul>
<pre><code class="language-python">my_string[<span class="hljs-number">0</span>]  <span class="hljs-comment"># outputs &quot;H&quot;</span>
my_string[<span class="hljs-number">2</span>]  <span class="hljs-comment"># outputs &quot;l&quot;</span>
my_string[-<span class="hljs-number">1</span>]  <span class="hljs-comment"># outputs &quot;!&quot;</span>
my_string[-<span class="hljs-number">2</span>]  <span class="hljs-comment"># outputs &quot;d&quot;</span>
my_string[<span class="hljs-number">1</span>:<span class="hljs-number">3</span>]  <span class="hljs-comment"># outputs &quot;el&quot;</span>
</code></pre>
<ul>
<li>ويمكننا دمج النصوص:</li>
</ul>
<pre><code class="language-python">my_new_string = my_string + <span class="hljs-string">&#x27; &#x27;</span> + my_string
</code></pre>
<h3 id="الإدخال-input">الإدخال (Input)</h3>
<ul>
<li>انتهينا من الأمر <code>input</code>.</li>
<li>أيّ شيء يدخله المستخدم يُقرأ ككائن سلسلة نصية (string object)!</li>
</ul>
<pre><code class="language-python">x = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter a string:  &quot;</span>)  <span class="hljs-comment"># what the user inputs is assigned to x as a string</span>
</code></pre>
<ul>
<li>ويمكن تحويل مُدخل المستخدم إلى عدد صحيح:</li>
</ul>
<pre><code class="language-python">x_as_int = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;enter and int: &quot;</span>))  <span class="hljs-comment"># here x will be an integer</span>
</code></pre>
<h3 id="الإخراج-output">الإخراج (Output)</h3>
<ul>
<li>انتهينا من الأمر <code>print</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(x)
</code></pre>
<ul>
<li>الفاصلة تُدمج مع مسافة بينها:</li>
</ul>
<pre><code class="language-python"><span class="hljs-built_in">print</span>((<span class="hljs-string">&quot;x = &quot;</span>, x)
</code></pre>
<ul>
<li>عبارات <code>print</code> مفيدة جدًّا في تنقيح الأخطاء (debugging)! وخصوصًا لرؤية ما يحدث داخل الحلقات.</li>
</ul>
<h3 id="التفريع-branching">التفريع (Branching)</h3>
<ul>
<li>الفكرة أنّنا نريد تنفيذ كتل معيّنة فقط إذا تحقّقت شروط محدّدة.</li>
<li>ننشئ بنية شيفرة تتحقّق من حاجتنا.</li>
</ul>
<p><strong>مثال على التفريع (Example branching):</strong></p>
<pre><code class="language-python">x = <span class="hljs-number">2</span>
<span class="hljs-keyword">if</span> x == <span class="hljs-number">3</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;x is 3!&quot;</span>)
<span class="hljs-keyword">elif</span> x == <span class="hljs-number">2</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;x is 2!&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;x is neither 2 or 3&quot;</span>)
</code></pre>
<h2 id="مراجعة-المحاضرة-3-الحلقات-وطرق-التكرار">مراجعة المحاضرة 3: الحلقات وطرق التكرار</h2>
<h3 id="آليات-التكرار-looping-mechanisms">آليات التكرار (Looping Mechanisms)</h3>
<ul>
<li>المرور على مجالات من الأعداد.</li>
<li>المرور على عناصر سلسلة نصية.</li>
<li>الفكرة الرئيسة — نريد تكرار الأشياء عدّة مرّات، أي إعادة استخدام الشيفرة.</li>
</ul>
<h3 id="حلقات-for">حلقات <code>for</code></h3>
<ul>
<li>لحلقات <code>for</code> مجال محدَّد مسبقًا تعمل ضمنه.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(x):
</code></pre>
<ul>
<li>حيث <code>i</code> يمرّ من 0 إلى <code>x-1</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">for</span> char <span class="hljs-keyword">in</span> s:
</code></pre>
<ul>
<li>حيث <code>char</code> سلسلة نصية تأخذ قيمة كلّ محرف في <code>s</code> على التوالي.</li>
</ul>
<h3 id="حلقات-while">حلقات <code>while</code></h3>
<ul>
<li>لحلقات <code>while</code> شرط تفحصه لتقرّر هل تواصل العمل؛ فهي تعمل إلى أن لم يعد ذلك الشرط محقَّقًا.</li>
</ul>
<pre><code class="language-python">counter = <span class="hljs-number">0</span>
<span class="hljs-keyword">while</span> counter &lt; <span class="hljs-number">3</span>:
<span class="hljs-built_in">print</span>(counter)
counter += <span class="hljs-number">1</span>
</code></pre>
`,p={book:n,chapter:s,chapterTitle:l,slug:t,title:a,headings:e,html:i};export{n as book,s as chapter,l as chapterTitle,p as default,e as headings,i as html,t as slug,a as title};
