const n="mit-6100l",s="recitations",t="الجلسات التطبيقية",a="rec4",l="الجلسة التطبيقية 4: الدوال والنطاق، ودوال Lambda",e=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"المحاضرة-8-الدوال-والنطاق-functions-and-scope",text:"المحاضرة 8: الدوال والنطاق (Functions and Scope)"},{depth:3,id:"الدوال-functions",text:"الدوال (Functions)"},{depth:3,id:"تعريف-دالة-defining-a-function",text:"تعريف دالة (Defining a function)"},{depth:3,id:"استدعاء-دالة-calling-a-function",text:"استدعاء دالة (Calling a function)"},{depth:3,id:"print-مقابل-return",text:"print مقابل return"},{depth:3,id:"النطاق-scope",text:"النطاق (Scope)"},{depth:3,id:"الدالة-معاملا-functions-as-a-parameter",text:"الدالة معاملًا (Functions as a Parameter)"},{depth:2,id:"المحاضرة-9-دوال-لامدا-ومقدمة-إلى-الصفوف-والقوائم",text:"المحاضرة 9: دوال لامدا، ومقدّمة إلى الصفوف والقوائم"},{depth:3,id:"ملاحظات-إضافية-على-الدوال",text:"ملاحظات إضافية على الدوال"},{depth:3,id:"دوال-لامدا-lambda-functions",text:"دوال لامدا (Lambda Functions)"},{depth:3,id:"الصفوف-tuples",text:"الصفوف (Tuples)"},{depth:3,id:"القوائم-lists",text:"القوائم (Lists)"},{depth:3,id:"عمليات-شائعة-على-القوائم-والصفوف",text:"عمليات شائعة على القوائم والصفوف"}],i=`<h1>الجلسة التطبيقية 4 (Recitation 4)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec04_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف Word. فقد استخراج النصّ المسافات البادئة التي تدلّ على القوائم، فحُذفت. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » وشرطة الطرح « – » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/">المحاضرة 9: دوال لامدا، والصفوف، والقوائم (Lambda Functions, Tuples, and Lists)</a>. ويعرض ملخّصها مراجعةً للدوال والنطاق في المحاضرة 8، ثم مقدّمةً إلى دوال لامدا وإلى الصفوف (Tuples) والقوائم (Lists).</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<ul>
<li>لا محاضرة يوم الاثنين.</li>
<li>لا مسابقة MQ الأسبوع المقبل.</li>
<li>التسليم المرحلي في منتصف مجموعة المسائل PS2 مستحقّ الأربعاء المقبل.</li>
</ul>
<h2 id="المحاضرة-8-الدوال-والنطاق-functions-and-scope">المحاضرة 8: الدوال والنطاق (Functions and Scope)</h2>
<h3 id="الدوال-functions">الدوال (Functions)</h3>
<ul>
<li>تلتقط الدوال العمل الحسابي داخل صندوق أسود.</li>
<li>نستخدمها لإعادة استخدام الشيفرة وكتابة برامج بصياغة أكثر إيجازًا.</li>
<li>تأخذ مدخلات وتُعيد مخرجات.</li>
<li>نسمّي المدخلات معاملات (parameters).</li>
<li>تُخرَج المخرجات بعبارة <code>return</code>.</li>
</ul>
<h3 id="تعريف-دالة-defining-a-function">تعريف دالة (Defining a function)</h3>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">count_letter_e</span>(<span class="hljs-params">my_word</span>):
    count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> letter <span class="hljs-keyword">in</span> my_word:
        <span class="hljs-keyword">if</span> letter == <span class="hljs-string">&quot;e&quot;</span>:
            count += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> count
</code></pre>
<h3 id="استدعاء-دالة-calling-a-function">استدعاء دالة (Calling a function)</h3>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(count_letter_e(<span class="hljs-string">&quot;hello, this is a test&quot;</span>)
</code></pre>
<h3 id="print-مقابل-return"><code>print</code> مقابل <code>return</code></h3>
<ul>
<li><code>print</code>: للمستخدم، ويعرض قيمة فحسب.</li>
<li><code>return</code>: للحاسوب، ويتيح لك إرسال قيم من الدالة إلى أجزاء أخرى من شيفرتك. القيمة المُعادة الافتراضية في بايثون هي <code>None</code>، ولا يُنفَّذ شيء بعد عبارة <code>return</code>.</li>
</ul>
<h3 id="النطاق-scope">النطاق (Scope)</h3>
<ul>
<li>تُتابَع إسنادات المتغيّرات في جدول رموز (symbol table) أو إطار مكدّس (stack frame) يربط أسماء المتغيّرات بقيمها.</li>
<li>عند استدعاء دالة، يُنشأ إطار مكدّس جديد.</li>
<li>عند إعادة الدالة، يُزال إطار المكدّس أو يُتلف.</li>
<li>يقدّم Python Tutor تصورًا جيّدًا لذلك: https://pythontutor.com/.</li>
</ul>
<h3 id="الدالة-معاملا-functions-as-a-parameter">الدالة معاملًا (Functions as a Parameter)</h3>
<p><strong>مثال:</strong></p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">calc</span>(<span class="hljs-params">op, x, y</span>):
    <span class="hljs-keyword">return</span> op(x,y)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">a,b</span>):
    <span class="hljs-keyword">return</span> a+b

<span class="hljs-keyword">def</span> <span class="hljs-title function_">div</span>(<span class="hljs-params">a,b</span>):
    <span class="hljs-keyword">if</span> b != <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> a/b
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Denominator was 0.&quot;</span>)

<span class="hljs-built_in">print</span>(calc(add, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>))
</code></pre>
<h2 id="المحاضرة-9-دوال-لامدا-ومقدمة-إلى-الصفوف-والقوائم">المحاضرة 9: دوال لامدا، ومقدّمة إلى الصفوف والقوائم</h2>
<h3 id="ملاحظات-إضافية-على-الدوال">ملاحظات إضافية على الدوال</h3>
<ul>
<li>للدوال نوع خاص بها.</li>
<li>يمكن تمريرها كوسائط (arguments) إلى دوال أخرى.</li>
<li>يمكن إرجاعها قيمةً من إجراء آخر.</li>
</ul>
<h3 id="دوال-لامدا-lambda-functions">دوال لامدا (Lambda Functions)</h3>
<ul>
<li>طريقة مجهولة (anonymous) لكتابة دوال لا تكون مربوطة باسم محدّد.</li>
</ul>
<p><strong>مثلًا:</strong></p>
<pre><code class="language-python">y = <span class="hljs-keyword">lambda</span> x: x + <span class="hljs-number">5</span>
<span class="hljs-built_in">print</span>(y(<span class="hljs-number">4</span>))  <span class="hljs-comment"># this prints 9 to the console</span>
</code></pre>
<h3 id="الصفوف-tuples">الصفوف (Tuples)</h3>
<ul>
<li>تسلسلات مرتّبة من الكائنات.</li>
<li>الصيغة: <code>my_tuple = (1, 2, &quot;test&quot;, 4, &quot;hello&quot;)</code></li>
<li>يمكن أن تكون الكائنات من أي نوع.</li>
<li>وهي غير قابلة للتغيير (immutable) — أي لا يمكن تغييرها بعد إنشائها.</li>
</ul>
<h3 id="القوائم-lists">القوائم (Lists)</h3>
<ul>
<li>تسلسل مرتّب من الكائنات.</li>
<li>الصيغة: <code>my_list = [1, 2, &quot;test&quot;, 4, &quot;hello&quot;]</code></li>
<li>يمكن أن تكون الكائنات من أي نوع.</li>
<li>وهي قابلة للتغيير (mutable) — أي يمكن تغييرها بعد إنشائها.</li>
</ul>
<h3 id="عمليات-شائعة-على-القوائم-والصفوف">عمليات شائعة على القوائم والصفوف</h3>
<p><strong>الفهرسة (Indexing):</strong></p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-string">&quot;hello]
print(my_list[0])  # this prints 1

# similarly
my_tuple = (1, 2, &quot;</span>tes<span class="hljs-string">t&quot;, 4)
print(my_tuple[2])  # this prints test
</span></code></pre>
<p><strong>التقطيع (Slicing):</strong></p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-string">&quot;hello]
print(my_list[0:2])  # this prints [1,2]

my_tuple = (1, 2, &quot;</span>tes<span class="hljs-string">t&quot;, 4)
print(my_tuple[2:]). # this prints (&quot;</span>tes<span class="hljs-string">t&quot;, 4)
</span></code></pre>
<p><strong>المرور على العناصر (Looping over elements):</strong> يمكن كتابة شيفرة مشابهة للصفوف والقوائم معًا.</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&quot;test&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-string">&quot;hello]

# this for loop loops through each element of my_list and outputs to console
for elem in my_list:
    print(elem)
</span></code></pre>
`,p={book:n,chapter:s,chapterTitle:t,slug:a,title:l,headings:e,html:i};export{n as book,s as chapter,t as chapterTitle,p as default,e as headings,i as html,a as slug,l as title};
