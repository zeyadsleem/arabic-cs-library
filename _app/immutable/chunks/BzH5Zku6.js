const s="mit-6100l",n="recitations",t="الجلسات التطبيقية",l="rec6",a="الجلسة التطبيقية 6: التشارك بالاسم والاستنساخ، وقوائم الفهم",e=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"المحاضرة-11-التشارك-بالاسم-والاستنساخ",text:"المحاضرة 11: التشارك بالاسم والاستنساخ"},{depth:3,id:"التشارك-بالاسم-aliasing-والاستنساخ-cloning",text:"التشارك بالاسم (Aliasing) والاستنساخ (Cloning)"},{depth:3,id:"في-الأنواع-غير-القابلة-للتغيير-مقابل-القابلة-للتغيير",text:"= في الأنواع غير القابلة للتغيير مقابل القابلة للتغيير"},{depth:3,id:"لماذا-تهم-قابلية-التغيير",text:"لماذا تهمّ قابلية التغيير؟"},{depth:3,id:"كيف-أتفادى-مشكلات-قابلية-التغيير",text:"كيف أتفادى مشكلات قابلية التغيير؟"},{depth:3,id:"النسخ-السطحي-مقابل-النسخ-العميق",text:"النسخ السطحي مقابل النسخ العميق"},{depth:3,id:"sort-مقابل-sorted",text:"sort مقابل sorted"},{depth:3,id:"طرائق-القوائم-المفيدة-useful-list-methods",text:"طرائق القوائم المفيدة (Useful List Methods)"},{depth:2,id:"المحاضرة-12",text:"المحاضرة 12"},{depth:3,id:"إنشاء-القوائم-list-comprehension",text:"إنشاء القوائم (List Comprehension)"},{depth:3,id:"المعاملات-الافتراضية-في-الدوال-default-parameters-in-functions",text:"المعاملات الافتراضية في الدوال (Default Parameters in Functions)"},{depth:3,id:"الاختبار-testing",text:"الاختبار (Testing)"},{depth:3,id:"تنقيح-الأخطاء-debugging",text:"تنقيح الأخطاء (Debugging)"},{depth:3,id:"رسائل-الخطأ-الشائعة",text:"رسائل الخطأ الشائعة"}],i=`<h1>الجلسة التطبيقية 6 (Recitation 6)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec06_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف Word. فقد استخراج النصّ المسافات البادئة التي تدلّ على القوائم، فحُذفت، بينما حُفظت المسافات البادئة داخل الشيفرة. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » وشرطة الطرح « – » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-12-list-comprehension-functions-as-objects-testing-debugging/">المحاضرة 12: إنشاء القوائم، والدوال ككائنات، والاختبار، وتنقيح الأخطاء (List Comprehension, Functions as Objects, Testing, Debugging)</a>. ويعرض ملخّصها التشارك بالاسم (Aliasing) والاستنساخ (Cloning) في المحاضرة 11، ثم إنشاء القوائم (List Comprehension) والمعاملات الافتراضية (Default Parameters) والاختبار (Testing) وتنقيح الأخطاء (Debugging) في المحاضرة 12.</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 6 — 21 أكتوبر 2022.</p>
<ul>
<li>مسابقة MQ6 الاثنين المقبل 10/24.</li>
<li>التسليم المرحلي في منتصف مجموعة المسائل PS3 مستحقّ الأربعاء المقبل 10/26.</li>
</ul>
<h2 id="المحاضرة-11-التشارك-بالاسم-والاستنساخ">المحاضرة 11: التشارك بالاسم والاستنساخ</h2>
<h3 id="التشارك-بالاسم-aliasing-والاستنساخ-cloning">التشارك بالاسم (Aliasing) والاستنساخ (Cloning)</h3>
<ul>
<li>يمكن تغيير الكائنات القابلة للتغيير بعد إنشائها.</li>
<li>ما أنواع البيانات القابلة للتغيير التي نعرفها حتى الآن؟ القوائم.</li>
<li>التشارك بالاسم (Aliasing): عندما يشير اسما متغيّرين إلى الكائن نفسه.</li>
<li>الاستنساخ (Cloning): إنشاء نسخة من كائن (وهو عادةً الخيار الآمن).</li>
</ul>
<p><strong>المثال 1:</strong> هنا لا نغيّر فعليًا نسخةَ <code>word</code>. لماذا؟ لأنّ السلاسل النصية غير قابلة للتغيير.</p>
<pre><code class="language-python">word = <span class="hljs-string">&quot;the&quot;</span>
word_copy = word
word += <span class="hljs-string">&quot; bird&quot;</span>
<span class="hljs-built_in">print</span>(word) <span class="hljs-comment"># &quot;the bird&quot;</span>
<span class="hljs-built_in">print</span>(word_copy) <span class="hljs-comment"># &quot;the&quot;</span>
</code></pre>
<p><strong>المثال 2:</strong></p>
<pre><code class="language-python">a = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]
b = a
b += [<span class="hljs-number">5</span>]
<span class="hljs-built_in">print</span>(b)  <span class="hljs-comment"># [1,2,3,4,5]</span>
<span class="hljs-built_in">print</span>(a)  <span class="hljs-comment"># [1,2,3,4,5]</span>
</code></pre>
<ul>
<li>الآن يشير <code>b</code> إلى <code>a</code>. ولأنّ القائمة قابلة للتغيير، فإنّك إذا أجريت تغييرات على <code>b</code> فستغيّر <code>a</code>.</li>
</ul>
<h3 id="في-الأنواع-غير-القابلة-للتغيير-مقابل-القابلة-للتغيير"><code>=</code> في الأنواع غير القابلة للتغيير مقابل القابلة للتغيير</h3>
<ul>
<li>في الأنواع غير القابلة للتغيير، ينشئ <code>=</code> كائنًا جديدًا.</li>
<li>في الأنواع القابلة للتغيير، يُسند <code>=</code> المتغيّر الجديد إلى الكائن نفسه.</li>
</ul>
<h3 id="لماذا-تهم-قابلية-التغيير">لماذا تهمّ قابلية التغيير؟</h3>
<ul>
<li>تجعل شيفرتك تفعل أمورًا غير متوقّعة. مثلًا، قد تغيّر متغيّرًا لم تقصد تغييره.</li>
</ul>
<h3 id="كيف-أتفادى-مشكلات-قابلية-التغيير">كيف أتفادى مشكلات قابلية التغيير؟</h3>
<ul>
<li>اصنع نسخًا (clones).</li>
</ul>
<pre><code class="language-python">List_copy = <span class="hljs-built_in">list</span>[:]
List_copy = <span class="hljs-built_in">list</span>.copy()
List_copy = copy.copy(<span class="hljs-built_in">list</span>)
</code></pre>
<h3 id="النسخ-السطحي-مقابل-النسخ-العميق">النسخ السطحي مقابل النسخ العميق</h3>
<ul>
<li>النسخ السطحي (shallow copy) ينشئ بنية بيانات جديدة لكنّ العناصر الفعلية مشتركة — أي نسخ من المستوى الأوّل فقط.</li>
</ul>
<pre><code class="language-python">copy.copy(example_list)  <span class="hljs-comment"># this is a shallow copy</span>
copy.deepcopy(example_list)  <span class="hljs-comment"># this is a deepcopy</span>
</code></pre>
<ul>
<li>تذكير مفيد: لا تغيّر القوائم وأنت تمرّ عليها في حلقة.</li>
</ul>
<h3 id="sort-مقابل-sorted"><code>sort</code> مقابل <code>sorted</code></h3>
<ul>
<li><code>sort</code>: يغيّر القائمة، ولا يُعيد شيئًا.</li>
<li><code>sorted</code>: لا يغيّر القائمة، ويُعيد قائمة جديدة مرتّبة.</li>
</ul>
<h3 id="طرائق-القوائم-المفيدة-useful-list-methods">طرائق القوائم المفيدة (Useful List Methods)</h3>
<pre><code class="language-python">my_list.copy()  <span class="hljs-comment"># no mutation - returns copy</span>
my_list.reverse()  <span class="hljs-comment"># mutation</span>
<span class="hljs-built_in">sorted</span>(my_list)  <span class="hljs-comment"># no mutation - returns sorted list</span>
my_list.sort()  <span class="hljs-comment"># mutation</span>
my_list.extend([x,y])  <span class="hljs-comment"># mutation</span>
my_list[:]  <span class="hljs-comment"># makes clone</span>
my_list.remove(<span class="hljs-number">2</span>) <span class="hljs-comment"># mutation</span>
my_list.pop()  <span class="hljs-comment"># pops last element - mutation</span>
my_list.pop(<span class="hljs-number">2</span>)  <span class="hljs-comment"># pops 3rd element</span>
my_list.insert(<span class="hljs-number">1</span>, <span class="hljs-number">7</span>)  <span class="hljs-comment"># inserts 7 in the 2nd position - mutation</span>
</code></pre>
<h2 id="المحاضرة-12">المحاضرة 12</h2>
<h3 id="إنشاء-القوائم-list-comprehension">إنشاء القوائم (List Comprehension)</h3>
<ul>
<li>هذه طريقة أقصر لإنشاء قائمة جديدة انطلاقًا من قيم بنية بيانات موجودة.</li>
</ul>
<pre><code class="language-python"><span class="hljs-comment"># standard method</span>
fruits = [<span class="hljs-string">&quot;apple&quot;</span>, <span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-string">&quot;cherry&quot;</span>, <span class="hljs-string">&quot;kiwi&quot;</span>, <span class="hljs-string">&quot;mango&quot;</span>]
new_list = []

<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> fruits: <span class="hljs-comment"># standard for loop</span>
  <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;a&quot;</span> <span class="hljs-keyword">in</span> x:
    newlist.append(x)

<span class="hljs-comment"># using list comprehension</span>
newlist = [x <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> fruits <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;a&quot;</span> <span class="hljs-keyword">in</span> x]
</code></pre>
<h3 id="المعاملات-الافتراضية-في-الدوال-default-parameters-in-functions">المعاملات الافتراضية في الدوال (Default Parameters in Functions)</h3>
<p><strong>مثال:</strong> هنا <code>y</code> معامل افتراضي.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">multiply</span>(<span class="hljs-params">x, y=<span class="hljs-number">2</span></span>):
    output = x * y
    <span class="hljs-keyword">return</span> output

<span class="hljs-built_in">print</span>(multiply(<span class="hljs-number">3</span>))  <span class="hljs-comment"># outputs 6</span>
<span class="hljs-built_in">print</span>(multiply(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>))  <span class="hljs-comment"># outputs 12</span>
</code></pre>
<h3 id="الاختبار-testing">الاختبار (Testing)</h3>
<ul>
<li>اكتب شيفرة يمكن تفكيكها إلى أجزاء ويمكن اختبارها بسهولة (بما في ذلك التعليقات والافتراضات).</li>
</ul>
<p><strong>ثلاث فئات من الاختبارات:</strong></p>
<ul>
<li>اختبار الوحدة (Unit testing): اختبر كلّ دالة على حدة.</li>
<li>اختبار الانحدار (Regression testing): أضف اختبارات للأخطاء كلّما عثرت عليها.</li>
<li>اختبار التكامل (Integration testing): على المستوى الأعلى — هل يفعل البرنامج ما تريده؟</li>
</ul>
<p><strong>منهجيتا الاختبار الرئيسيتان:</strong></p>
<ul>
<li>الاختبار الصندوق الأسود (Black box testing): يُصمَّم دون النظر في الشيفرة، ويتجنّب تحيّز المنفّذ، ويمكن إعادة استخدامه إذا تغيّر التنفيذ.</li>
<li>الاختبار الصندوق الزجاجي (Glass box testing): استخدم الشيفرة لتوجيه تصميم حالات الاختبار.</li>
<li>تذكّر باختبار الحالات الحديّة (edge cases).</li>
</ul>
<h3 id="تنقيح-الأخطاء-debugging">تنقيح الأخطاء (Debugging)</h3>
<p><strong>نصائح عامّة:</strong></p>
<ul>
<li>اطبع قيم متغيّراتك.</li>
<li>محرّك البحث في الويب صديقك إذا صادفت خطأً لا تفهمه.</li>
<li>يُظهر أثر المكدّس (stack trace) أيّ سطر (أو أسطر) سبّب الخطأ — فاستفد منه.</li>
</ul>
<h3 id="رسائل-الخطأ-الشائعة">رسائل الخطأ الشائعة</h3>
<pre><code class="language-python">test = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]

test[<span class="hljs-number">4</span>]  <span class="hljs-comment"># will throw an IndexError since there doesn&#x27;t exist an element at index 4</span>
<span class="hljs-built_in">int</span>(test)  <span class="hljs-comment"># will throw a TypeError since lists cannot be converted into integer</span>

<span class="hljs-comment"># Any error in Python syntax will throw a SyntaxError</span>
</code></pre>
`,o={book:s,chapter:n,chapterTitle:t,slug:l,title:a,headings:e,html:i};export{s as book,n as chapter,t as chapterTitle,o as default,e as headings,i as html,l as slug,a as title};
