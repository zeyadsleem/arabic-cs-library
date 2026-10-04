const s="mit-6100l",n="recitations",l="الجلسات التطبيقية",e="rec5",t="الجلسة التطبيقية 5: القوائم وقابلية التغيير",a=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"مراجعة-المحاضرتين-9-و10-القوائم-والصفوف-وقابلية-التغيير",text:"مراجعة المحاضرتين 9 و10: القوائم، والصفوف، وقابلية التغيير"},{depth:3,id:"الصفوف-tuples",text:"الصفوف (Tuples)"},{depth:3,id:"القوائم-lists",text:"القوائم (Lists)"},{depth:3,id:"طرائق-مفيدة-useful-methods",text:"طرائق مفيدة (Useful Methods)"},{depth:3,id:"بنى-البيانات-غير-القابلة-للتغيير-مقابل-القابلة-للتغيير",text:"بنى البيانات غير القابلة للتغيير مقابل القابلة للتغيير"}],i=`<h1>الجلسة التطبيقية 5 (Recitation 5)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec05_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف Word. فقد استخراج النصّ المسافات البادئة التي تدلّ على القوائم، فحُذفت. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » وشرطة الطرح « – » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-10-lists-mutability/">المحاضرة 10: القوائم وقابلية التغيير (Lists, Mutability)</a>. ويعرض ملخّصها مراجعةً مشتركة للمحاضرتين 9 و10 في القوائم (Lists) والصفوف (Tuples) وقابلية التغيير (Mutability).</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 5 — 14 أكتوبر 2022.</p>
<ul>
<li>مسابقة MQ5 يوم الاثنين 10/17.</li>
<li>مجموعة المسائل PS2 مستحقّة الأربعاء 10/19.</li>
<li>تذكّر بإكمال مناقشة الكود (checkoff).</li>
</ul>
<h2 id="مراجعة-المحاضرتين-9-و10-القوائم-والصفوف-وقابلية-التغيير">مراجعة المحاضرتين 9 و10: القوائم، والصفوف، وقابلية التغيير</h2>
<h3 id="الصفوف-tuples">الصفوف (Tuples)</h3>
<ul>
<li>هذه تسلسلات مرتّبة من الكائنات، ويمكن أن تكون هذه الكائنات من أي نوع.</li>
<li>غير قابلة للتغيير (immutable)، أي لا يمكن تغييرها بعد إنشائها.</li>
<li>يمكن فهرستها.</li>
<li>قابلة للتكرار (Iterable) — أي يمكن المرور عليها في حلقة.</li>
<li>يمكن تقطيع صفّ فتُعطيك مجموعة جزئية من الصفّ الأصلي.</li>
</ul>
<pre><code class="language-python">tuple1 = (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>)
<span class="hljs-built_in">len</span>(tuple1)  <span class="hljs-comment"># gives you the length of the tuple</span>
tuple1[<span class="hljs-number">0</span>:<span class="hljs-number">2</span>] <span class="hljs-comment"># gives (1,2)</span>
</code></pre>
<ul>
<li>كثيرًا ما تُعيد الدوال صفوفًا طريقةً لإعادة عدّة قيم دفعة واحدة.</li>
<li><code>Return a, b</code> — آخر سطر في الدالة، حيث <code>a, b</code> هو الصفّ <code>(a, b)</code>.</li>
</ul>
<h3 id="القوائم-lists">القوائم (Lists)</h3>
<ul>
<li>تسلسل مرتّب من الكائنات.</li>
<li>يمكن فهرستها وتقطيعها على نحو مشابه للصفوف.</li>
<li>قابلة للتكرار (Iterable) — أي يمكن المرور عليها في حلقة.</li>
<li>قابلة للتغيير (mutable)، أي يمكن تغييرها أو تعديلها بعد إنشائها.</li>
<li>على سبيل المثال، خذ القائمتين التاليتين:</li>
</ul>
<pre><code class="language-python">list1 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>, <span class="hljs-string">&quot;MIT&quot;</span>]
list2 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
</code></pre>
<ul>
<li>يمكنك تغيير العنصر عند الفهرس 0 بـ:</li>
</ul>
<pre><code class="language-python">list1[<span class="hljs-number">0</span>] = <span class="hljs-number">5</span>
</code></pre>
<ul>
<li>إضافة عنصر إلى النهاية:</li>
</ul>
<pre><code class="language-python">list1.append(<span class="hljs-number">5</span>)
</code></pre>
<ul>
<li>إضافة كلّ عناصر <code>list2</code> إلى نهاية <code>list1</code> بـ:</li>
</ul>
<pre><code class="language-python">list1.extend(list2)
</code></pre>
<ul>
<li>إزالة عنصر عند فهرس معيّن بـ:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">del</span> list1[index]
</code></pre>
<ul>
<li>إزالة العنصر في النهاية:</li>
</ul>
<pre><code class="language-python">list1.pop()
</code></pre>
<ul>
<li>إزالة عنصر معيّن بـ:</li>
</ul>
<pre><code class="language-python">list1.remove(<span class="hljs-string">&quot;MIT&quot;</span>)
</code></pre>
<ul>
<li>لاحظ أنّه إذا ظهر عنصر عدّة مرّات، فإنّ هذه الطريقة تزيل أول ظهور لذلك العنصر فقط.</li>
<li>وإذا لم يكن العنصر موجودًا، فإنّها ترمي خطأً.</li>
</ul>
<h3 id="طرائق-مفيدة-useful-methods">طرائق مفيدة (Useful Methods)</h3>
<pre><code class="language-python">my_list.copy()  <span class="hljs-comment"># no mutation - returns copy</span>
my_list.reverse()  <span class="hljs-comment"># mutation</span>
<span class="hljs-built_in">sorted</span>(my_list)  <span class="hljs-comment"># no mutation - returns sorted list</span>
my_list.sort()  <span class="hljs-comment"># mutation</span>
my_list.extend([x,y])  <span class="hljs-comment"># mutation</span>
my_list[:]  <span class="hljs-comment"># makes clone</span>
my_list.remove(<span class="hljs-number">2</span>) <span class="hljs-comment"># removes the first occurance of 2 in the list</span>
my_list.pop()  <span class="hljs-comment"># pops last element - mutation</span>
my_list.pop(<span class="hljs-number">2</span>)  <span class="hljs-comment"># pops 3rd element</span>
my_list.insert(<span class="hljs-number">1</span>, <span class="hljs-number">7</span>)  <span class="hljs-comment"># inserts 7 in the 2nd position - mutation</span>
</code></pre>
<h3 id="بنى-البيانات-غير-القابلة-للتغيير-مقابل-القابلة-للتغيير">بنى البيانات غير القابلة للتغيير مقابل القابلة للتغيير</h3>
<p><strong>أنواع البيانات غير القابلة للتغيير:</strong> لا يمكن تغيير قيمة العنصر بعد الإسناد.</p>
<p>أمثلة على أنواع البيانات غير القابلة للتغيير التي رأيناها:</p>
<ul>
<li><code>int</code></li>
<li><code>float</code></li>
<li><code>bool</code></li>
<li><code>string</code></li>
<li><code>tuple</code></li>
</ul>
<p><strong>أنواع البيانات القابلة للتغيير:</strong> يمكن تغيير العنصر بعد الإسناد.</p>
<ul>
<li>يمكننا التفكير في الكائنات القابلة للتغيير على أنّها مُسنَدة إلى موضع معيّن في الذاكرة. في هذه الحالة، إسناد متغيّر إلى كائن قابل للتغيير يعني مجرّدًا أنّه يشير إلى ذلك الكائن في الذاكرة.</li>
<li>يمكن لعدّة متغيّرات أن تشير إلى الكائن نفسه في الذاكرة. وقد يكون هذا مُربكًا لأنّ تغيير متغيّر سيؤثّر في المتغيّرات الأخرى التي تشير إليه. يسمّى هذا التشارك بالاسم (aliasing).</li>
</ul>
<p>أمثلة على أنواع البيانات القابلة للتغيير التي رأيناها:</p>
<ul>
<li>lists</li>
<li>Dictionaries (have not seen)</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:l,slug:e,title:t,headings:a,html:i};export{s as book,n as chapter,l as chapterTitle,p as default,a as headings,i as html,e as slug,t as title};
