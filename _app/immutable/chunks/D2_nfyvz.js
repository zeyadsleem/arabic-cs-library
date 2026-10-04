const n="mit-6100l",s="lecture-11",t="المحاضرة 11: الأسماء المستعارة (Aliasing) والاستنساخ (Cloning)",e="notes",l="المحاضرة 11: الأسماء المستعارة (Aliasing) والاستنساخ (Cloning)",o=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-الأسماء-المستعارة-والاستنساخ-aliasing-cloning",text:"الشريحة 1: الأسماء المستعارة والاستنساخ (Aliasing, Cloning)"},{depth:2,id:"الشريحة-2-إنشاء-نسخة-من-القائمة-making-a-copy-of-the-list",text:"الشريحة 2: إنشاء نسخة من القائمة (Making a Copy of the List)"},{depth:2,id:"الشريحة-3-جرب-بنفسك-you-try-it",text:"الشريحة 3: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-4-العمليات-على-القوائم-الإزالة-remove",text:"الشريحة 4: العمليات على القوائم — الإزالة (remove)"},{depth:2,id:"الشريحة-5-تمرين-باستخدام-remove-بدل-النسخ-والإفراغ-exercise-with-remove-instead-of-copy-and-clear",text:"الشريحة 5: تمرين باستخدام remove بدل النسخ والإفراغ (Exercise with Remove instead of Copy and Clear)"},{depth:2,id:"الشريحة-6-تمرين-باستخدام-remove-ماذا-لو-كانت-الشيفرة-كالتالي",text:"الشريحة 6: تمرين باستخدام remove — ماذا لو كانت الشيفرة كالتالي؟"},{depth:2,id:"الشريحة-7-تمرين-باستخدام-remove-إضافة-اسم-elem",text:"الشريحة 7: تمرين باستخدام remove — إضافة اسم elem"},{depth:2,id:"الشريحة-8-تمرين-باستخدام-remove-الخطوة-التالية",text:"الشريحة 8: تمرين باستخدام remove — الخطوة التالية"},{depth:2,id:"الشريحة-9-تمرين-باستخدام-remove-الخطوة-التالية",text:"الشريحة 9: تمرين باستخدام remove — الخطوة التالية"},{depth:2,id:"الشريحة-10-تمرين-باستخدام-remove-الخطوة-التالية",text:"الشريحة 10: تمرين باستخدام remove — الخطوة التالية"},{depth:2,id:"الشريحة-11-تمرين-باستخدام-remove-النتيجة",text:"الشريحة 11: تمرين باستخدام remove — النتيجة"},{depth:2,id:"الشريحة-12-لمحة-عامة-عن-الأمثلة-الصعبة-tricky-examples-overview",text:"الشريحة 12: لمحة عامة عن الأمثلة الصعبة (Tricky Examples Overview)"},{depth:2,id:"الشريحة-13-المثال-الصعب-4",text:"الشريحة 13: المثال الصعب 4"},{depth:2,id:"الشريحة-14-التغيير-والتكرار-بدون-نسخة-mutation-and-iteration-without-clone",text:"الشريحة 14: التغيير والتكرار بدون نسخة (Mutation and Iteration without Clone)"},{depth:2,id:"الشريحة-15-التغيير-والتكرار-بدون-نسخة-بعد-التنفيذ",text:"الشريحة 15: التغيير والتكرار بدون نسخة — بعد التنفيذ"},{depth:2,id:"الشريحة-16-التغيير-والتكرار-بدون-نسخة-القيم-نفسها",text:"الشريحة 16: التغيير والتكرار بدون نسخة — القيم نفسها"},{depth:2,id:"الشريحة-17-التغيير-والتكرار-بدون-نسخة-القيم-نفسها",text:"الشريحة 17: التغيير والتكرار بدون نسخة — القيم نفسها"},{depth:2,id:"الشريحة-18-التغيير-والتكرار-مع-نسخة-mutation-and-iteration-with-clone",text:"الشريحة 18: التغيير والتكرار مع نسخة (Mutation and Iteration with Clone)"},{depth:2,id:"الشريحة-19-التغيير-والتكرار-مع-نسخة-قبل-التنفيذ",text:"الشريحة 19: التغيير والتكرار مع نسخة — قبل التنفيذ"},{depth:2,id:"الشريحة-20-التغيير-والتكرار-مع-نسخة-الخطوة-الأولى",text:"الشريحة 20: التغيير والتكرار مع نسخة — الخطوة الأولى"},{depth:2,id:"الشريحة-21-التغيير-والتكرار-مع-نسخة-الخطوة-نفسها",text:"الشريحة 21: التغيير والتكرار مع نسخة — الخطوة نفسها"},{depth:2,id:"الشريحة-22-التغيير-والتكرار-مع-نسخة-الخطوة-الثانية",text:"الشريحة 22: التغيير والتكرار مع نسخة — الخطوة الثانية"},{depth:2,id:"الشريحة-23-التغيير-والتكرار-مع-نسخة-الخطوة-نفسها",text:"الشريحة 23: التغيير والتكرار مع نسخة — الخطوة نفسها"},{depth:2,id:"الشريحة-24-التغيير-والتكرار-مع-نسخة-بعد-الانتهاء",text:"الشريحة 24: التغيير والتكرار مع نسخة — بعد الانتهاء"},{depth:2,id:"الشريحة-25-الأسماء-المستعارة-aliasing",text:"الشريحة 25: الأسماء المستعارة (Aliasing)"},{depth:2,id:"الشريحة-26-التغيير-والتكرار-مع-اسم-مستعار-mutation-and-iteration-with-alias",text:"الشريحة 26: التغيير والتكرار مع اسم مستعار (Mutation and Iteration with Alias)"},{depth:2,id:"الشريحة-27-التغيير-والتكرار-مع-اسم-مستعار-القيم",text:"الشريحة 27: التغيير والتكرار مع اسم مستعار — القيم"},{depth:2,id:"الشريحة-28-الفكرة-الكبرى-big-idea",text:"الشريحة 28: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-29-الأسماء-المستعارة-في-نداء-الدالة",text:"الشريحة 29: الأسماء المستعارة — في نداء الدالة"},{depth:2,id:"الشريحة-30-الأسماء-المستعارة-والنسخ-السطحية-والنسخ-العميقة-مع-عناصر-قابلة-للتغيير-aliases-shallow-copies-and-deep-copies-with-mutable-elements",text:"الشريحة 30: الأسماء المستعارة والنسخ السطحية والنسخ العميقة مع عناصر قابلة للتغيير (Aliases, Shallow Copies, and Deep Copies with Mutable Elements)"},{depth:2,id:"الشريحة-31-التحكم-في-النسخ-control-copying",text:"الشريحة 31: التحكّم في النسخ (Control Copying)"},{depth:2,id:"الشريحة-32-التحكم-في-النسخ-النسخ-السطحي-shallow-copying",text:"الشريحة 32: التحكّم في النسخ — النسخ السطحي (Shallow Copying)"},{depth:2,id:"الشريحة-33-التحكم-في-النسخ-شيفرة-النسخ-السطحي",text:"الشريحة 33: التحكّم في النسخ — شيفرة النسخ السطحي"},{depth:2,id:"الشريحة-34-التحكم-في-النسخ-تغيير-البنية-الأعلى",text:"الشريحة 34: التحكّم في النسخ — تغيير البنية الأعلى"},{depth:2,id:"الشريحة-35-التحكم-في-النسخ-النتيجة",text:"الشريحة 35: التحكّم في النسخ — النتيجة"},{depth:2,id:"الشريحة-36-التحكم-في-النسخ-تغيير-عنصر-في-بنية-فرعية",text:"الشريحة 36: التحكّم في النسخ — تغيير عنصر في بنية فرعية"},{depth:2,id:"الشريحة-37-التحكم-في-النسخ-النتيجة",text:"الشريحة 37: التحكّم في النسخ — النتيجة"},{depth:2,id:"الشريحة-38-التحكم-في-النسخ-النسخة-العميقة-deep-copy",text:"الشريحة 38: التحكّم في النسخ — النسخة العميقة (Deep Copy)"},{depth:2,id:"الشريحة-39-التحكم-في-النسخ-نتيجة-النسخة-العميقة",text:"الشريحة 39: التحكّم في النسخ — نتيجة النسخة العميقة"},{depth:2,id:"الشريحة-40-القوائم-في-الذاكرة-lists-in-memory",text:"الشريحة 40: القوائم في الذاكرة (Lists in Memory)"},{depth:2,id:"الشريحة-41-لماذا-القوائم-والصفوف-why-lists-and-tuples",text:"الشريحة 41: لماذا القوائم والصفوف؟ (Why Lists and Tuples?)"},{depth:2,id:"الشريحة-42-تمارين-تتبع-في-المنزل-at-home-tracing-examples",text:"الشريحة 42: تمارين تتبّع في المنزل (At Home Tracing Examples)"},{depth:2,id:"الشريحة-43-الأسماء-المستعارة-aliases",text:"الشريحة 43: الأسماء المستعارة (Aliases)"},{depth:2,id:"الشريحة-44-الأسماء-المستعارة-aliases",text:"الشريحة 44: الأسماء المستعارة (Aliases)"},{depth:2,id:"الشريحة-45-استنساخ-قائمة-cloning-a-list",text:"الشريحة 45: استنساخ قائمة (Cloning a List)"},{depth:2,id:"الشريحة-46-استنساخ-قائمة-cloning-a-list",text:"الشريحة 46: استنساخ قائمة (Cloning a List)"},{depth:2,id:"الشريحة-47-استنساخ-قائمة-cloning-a-list",text:"الشريحة 47: استنساخ قائمة (Cloning a List)"},{depth:2,id:"الشريحة-48-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of",text:"الشريحة 48: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)"},{depth:2,id:"الشريحة-49-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of",text:"الشريحة 49: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)"},{depth:2,id:"الشريحة-50-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of",text:"الشريحة 50: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)"},{depth:2,id:"الشريحة-51-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of",text:"الشريحة 51: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)"},{depth:2,id:"الشريحة-52-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of",text:"الشريحة 52: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)"},{depth:2,id:"الشريحة-53-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of",text:"الشريحة 53: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)"},{depth:2,id:"الشريحة-54-mitopencourseware",text:"الشريحة 54: MITOpenCourseWare"}],d=`<h1>المحاضرة 11: الأسماء المستعارة (Aliasing) والاستنساخ (Cloning)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-11-aliasing-cloning/">صفحة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec11_pdf/">صفحة الشرائح الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec11.pdf">ملف الشرائح الأصلي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec11_code.py">ملف شيفرة المحاضرة الأصلي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec11/">تفريغ المحاضرة على OCW</a> (النسخة الإنجليزية الرسمية).</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. شرائح التتبّع (التي تتكرّر فيها الشيفرة نفسها مع رسم بياني متغيّر) نُقلت كلّها مع جدول القيم. شرائح «تمارين التتبّع في المنزل» (At Home Tracing Examples) في الأصل قائمة على لقطات شاشة من Python Tutor، وقد نُقل نصّها وحده؛ ولم يُخمَّن محتوى اللقطات. النصّ المستخرَج من ملف PDF يحتوي في الشرائح 33 و35 و37 و39 على عبارة <code>6.0001 LECTURE 5</code> متبقّية من عرض قديم أعاد MIT استعماله؛ وقد أُشير إليها في موضعها ولم يُنسب المحتوى إلى مقرر آخر.</p>
<h2 id="الشريحة-1-الأسماء-المستعارة-والاستنساخ-aliasing-cloning">الشريحة 1: الأسماء المستعارة والاستنساخ (Aliasing, Cloning)</h2>
<p>نزّل الشرائح وملفات <code>.py</code> لمتابعة الشرح.</p>
<p>6.100L، المحاضرة 11 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-إنشاء-نسخة-من-القائمة-making-a-copy-of-the-list">الشريحة 2: إنشاء نسخة من القائمة (Making a Copy of the List)</h2>
<ul>
<li>يمكنك إنشاء نسخة من كائن قائمة بمضاعفة كل عناصره (على المستوى الأعلى — Top Level) في كائن قائمة جديد.</li>
<li><code>Lcopy = L[:]</code></li>
<li>هذا يكافئ المرور على <code>L</code> وإلحاق كل عنصر في <code>Lcopy</code>.</li>
<li>هذا <strong>لا ينشئ</strong> نسخة من العناصر التي هي قوائم (سنرى كيف نفعل ذلك في نهاية المحاضرة).</li>
</ul>
<pre><code class="language-python">Loriginal = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
Lnew = Loriginal[:]
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
<td><code>Loriginal</code></td>
<td><code>[4,5,6]</code></td>
</tr>
<tr>
<td><code>Lnew</code></td>
<td><code>[4,5,6]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-3-جرب-بنفسك-you-try-it">الشريحة 3: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات.</p>
<p>تلميح: اصنع نسخةً لحفظ العناصر، ثم استعمل <code>L.clear()</code> لإفراغ القائمة وإعادة ملئها بالعناصر التي تقرّر الاحتفاظ بها.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_all</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L is a list
    Mutates L to remove all elements in L that are equal to e
    Returns None
    &quot;&quot;&quot;</span>
L = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>]

remove_all(L, <span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(L)

<span class="hljs-comment"># prints [1]</span>
</code></pre>
<h2 id="الشريحة-4-العمليات-على-القوائم-الإزالة-remove">الشريحة 4: العمليات على القوائم — الإزالة (remove)</h2>
<ul>
<li>احذف عنصرًا عند فهرس محدّد بـ <code>del(L[index])</code>.</li>
<li>أزل عنصرًا من نهاية القائمة بـ <code>L.pop()</code>، وتُرجِع العنصر المُزال (ويمكن استدعاؤها بفهرس محدّد: <code>L.pop(3)</code>).</li>
<li>أزل عنصرًا محدّدًا بـ <code>L.remove(element)</code>:
<ul>
<li>تبحث عن العنصر وتزيله (فهي تُغيّر القائمة).</li>
<li>إذا تكرّر العنصر أكثر من مرة، تُزيل أول تكرار.</li>
<li>إذا لم يكن العنصر في القائمة، تعطي خطأ.</li>
</ul>
</li>
</ul>
<p>نفّذ الأسطر التالية بالترتيب:</p>
<pre><code class="language-python">L = [<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">3</span>,<span class="hljs-number">7</span>,<span class="hljs-number">0</span>] <span class="hljs-comment"># do below in order</span>
L.remove(<span class="hljs-number">2</span>)   <span class="hljs-comment"># mutates L = [1,3,6,3,7,0]</span>
L.remove(<span class="hljs-number">3</span>)   <span class="hljs-comment"># mutates L = [1,6,3,7,0]</span>
<span class="hljs-keyword">del</span>(L[<span class="hljs-number">1</span>])     <span class="hljs-comment"># mutates L = [1,3,7,0]</span>
a = L.pop()   <span class="hljs-comment"># returns 0 and mutates L = [1,3,7]</span>
</code></pre>
<h2 id="الشريحة-5-تمرين-باستخدام-remove-بدل-النسخ-والإفراغ-exercise-with-remove-instead-of-copy-and-clear">الشريحة 5: تمرين باستخدام <code>remove</code> بدل النسخ والإفراغ (Exercise with Remove instead of Copy and Clear)</h2>
<ul>
<li>أعد كتابة الشيفرة لتزيل <code>e</code> طالما كان لا يزال في القائمة.</li>
<li>تعمل جيدًا!</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_all</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L is a list
    Mutates L to remove all elements in L that are equal to e
    Returns None.
    &quot;&quot;&quot;</span>
<span class="hljs-keyword">while</span> e <span class="hljs-keyword">in</span> L:
    L.remove(e)
</code></pre>
<h2 id="الشريحة-6-تمرين-باستخدام-remove-ماذا-لو-كانت-الشيفرة-كالتالي">الشريحة 6: تمرين باستخدام <code>remove</code> — ماذا لو كانت الشيفرة كالتالي؟</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_all</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L is a list
    Mutates L to remove all elements in L that are equal to e
    Returns None.
    &quot;&quot;&quot;</span>
<span class="hljs-keyword">for</span> elem <span class="hljs-keyword">in</span> L:
    <span class="hljs-keyword">if</span> elem == e:
        L.remove(e)

L = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>]
remove_all(L, <span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(L)
<span class="hljs-comment"># should print [1]</span>
</code></pre>
<h2 id="الشريحة-7-تمرين-باستخدام-remove-إضافة-اسم-elem">الشريحة 7: تمرين باستخدام <code>remove</code> — إضافة اسم <code>elem</code></h2>
<p>الشريحة نفسها، والمخطط يُظهر اسم <code>elem</code> مربوطًا بالقيمة <code>2</code> (وهي أول قيمة في <code>L</code>):</p>
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
<td><code>[1,2,2,2]</code></td>
</tr>
<tr>
<td><code>elem</code></td>
<td><code>2</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-8-تمرين-باستخدام-remove-الخطوة-التالية">الشريحة 8: تمرين باستخدام <code>remove</code> — الخطوة التالية</h2>
<p>الشريحة نفسها، والقيم بعد أول تكرار:</p>
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
<td><code>[1,2,2]</code></td>
</tr>
<tr>
<td><code>elem</code></td>
<td><code>2</code></td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> الشرائح 7 إلى 10 تعرض القيم على جانبي السطر في المستخرَج؛ نُقلت الجداول أعلاه موحّدة، والقيم نفسها هي ما تظهر في الأصل.</p>
<h2 id="الشريحة-9-تمرين-باستخدام-remove-الخطوة-التالية">الشريحة 9: تمرين باستخدام <code>remove</code> — الخطوة التالية</h2>
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
<td><code>[1,2]</code></td>
</tr>
<tr>
<td><code>elem</code></td>
<td><code>2</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-10-تمرين-باستخدام-remove-الخطوة-التالية">الشريحة 10: تمرين باستخدام <code>remove</code> — الخطوة التالية</h2>
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
<td><code>[1,2]</code></td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> في المستخرَج لقيم <code>L</code> المتكرّرة (<code>[1,2,2,2]</code> ثم <code>[1,2,2]</code> ثم <code>[1,2]</code>) تظهر موزّعة على الشرائح 7 إلى 11 بحسب موضع كل رسم بياني.</p>
<h2 id="الشريحة-11-تمرين-باستخدام-remove-النتيجة">الشريحة 11: تمرين باستخدام <code>remove</code> — النتيجة</h2>
<ul>
<li>ليس صحيحًا! لقد أزلنا عناصر أثناء ما كنّا نمرّ على القائمة!</li>
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
<td><code>L</code></td>
<td><code>[1,2]</code></td>
</tr>
</tbody>
</table>
<p>المتوقّع <code>[1]</code>، والمطبوع <code>[1,2]</code>.</p>
<h2 id="الشريحة-12-لمحة-عامة-عن-الأمثلة-الصعبة-tricky-examples-overview">الشريحة 12: لمحة عامة عن الأمثلة الصعبة (Tricky Examples Overview)</h2>
<ul>
<li><strong>المثال الصعب 1:</strong> حلقة تمرّ على فهارس <code>L</code> وتُغيّر <code>L</code> في كل مرة (تضيف عناصر أكثر).</li>
<li><strong>المثال الصعب 2:</strong> حلقة تمرّ على عناصر <code>L</code> مباشرة وتُغيّر <code>L</code> في كل مرة (تضيف عناصر أكثر).</li>
<li><strong>المثال الصعب 3:</strong> حلقة تمرّ على عناصر <code>L</code> مباشرة لكنها تُعيد إسناد <code>L</code> إلى كائن جديد في كل مرة.</li>
<li><strong>المثال الصعب 4:</strong> حلقة تمرّ على عناصر <code>L</code> مباشرة وتُغيّر <code>L</code> بإزالة عناصر.</li>
</ul>
<h2 id="الشريحة-13-المثال-الصعب-4">الشريحة 13: المثال الصعب 4</h2>
<ul>
<li>رابط Python Tutor لمشاهدة التنفيذ خطوة بخطوة: https://www.pythontutor.com/</li>
<li>نريد تغيير <code>L1</code> لإزالة أي عناصر موجودة أيضًا في <code>L2</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_dups</span>(<span class="hljs-params">L1, L2</span>):
    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L1:
        <span class="hljs-keyword">if</span> e <span class="hljs-keyword">in</span> L2:
            L1.remove(e)

L1 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>]
L2 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">60</span>]
remove_dups(L1, L2)
</code></pre>
<ul>
<li><code>L1</code> هي <code>[20,30,40]</code> لا <code>[30,40]</code>. لماذا؟
<ul>
<li>أنت تُغيّر قائمة وأنت تمرّ عليها.</li>
<li>بايثون تستعمل عدّادًا داخليًّا يتتبّع الفهرس في الحلقة على القائمة <code>L1</code>.</li>
<li>التغيير يُغيّر القائمة لكن بايثون لا تُحدّث العدّاد.</li>
<li>الحلقة لا ترى العنصر <code>20</code> أبدًا.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-14-التغيير-والتكرار-بدون-نسخة-mutation-and-iteration-without-clone">الشريحة 14: التغيير والتكرار بدون نسخة (Mutation and Iteration without Clone)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_dups</span>(<span class="hljs-params">L1, L2</span>):
    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L1:
        <span class="hljs-keyword">if</span> e <span class="hljs-keyword">in</span> L2:
            L1.remove(e)

L1 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>]
L2 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">60</span>]
remove_dups(L1, L2)
</code></pre>
<p>القيم قبل التنفيذ:</p>
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
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td>—</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-15-التغيير-والتكرار-بدون-نسخة-بعد-التنفيذ">الشريحة 15: التغيير والتكرار بدون نسخة — بعد التنفيذ</h2>
<p>نفس الشيفرة، والقيم بعد التنفيذ:</p>
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
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>40</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-16-التغيير-والتكرار-بدون-نسخة-القيم-نفسها">الشريحة 16: التغيير والتكرار بدون نسخة — القيم نفسها</h2>
<p>نفس الشيفرة، ونفس القيم:</p>
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
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>40</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-17-التغيير-والتكرار-بدون-نسخة-القيم-نفسها">الشريحة 17: التغيير والتكرار بدون نسخة — القيم نفسها</h2>
<p>نفس الشيفرة، ونفس القيم:</p>
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
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>40</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-18-التغيير-والتكرار-مع-نسخة-mutation-and-iteration-with-clone">الشريحة 18: التغيير والتكرار مع نسخة (Mutation and Iteration with Clone)</h2>
<ul>
<li>اصنع نسخة (Clone) بـ <code>[:]</code>.</li>
</ul>
<table>
<thead>
<tr>
<th>النسخة الصحيحة</th>
<th>النسخة الخاطئة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def remove_dups(L1, L2):</code></td>
<td><code>def remove_dups(L1, L2):</code></td>
</tr>
<tr>
<td><code>L1_copy = L1[:]</code></td>
<td><code>for e in L1:</code></td>
</tr>
<tr>
<td><code>for e in L1_copy:</code></td>
<td><code>if e in L2:</code></td>
</tr>
<tr>
<td><code>if e in L2:</code></td>
<td><code>L1.remove(e)</code></td>
</tr>
<tr>
<td><code>L1.remove(e)</code></td>
<td></td>
</tr>
</tbody>
</table>
<ul>
<li>النسخة الجديدة تعمل!
<ul>
<li>مرّ على نسخة.</li>
<li>غيّر القائمة الأصلية، لا النسخة.</li>
<li>الفهرسة صارت متّسقة.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-19-التغيير-والتكرار-مع-نسخة-قبل-التنفيذ">الشريحة 19: التغيير والتكرار مع نسخة — قبل التنفيذ</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_dups</span>(<span class="hljs-params">L1, L2</span>):
    L1_copy = L1[:]
    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L1_copy:
        <span class="hljs-keyword">if</span> e <span class="hljs-keyword">in</span> L2:
            L1.remove(e)

L1 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>]
L2 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">60</span>]
remove_dups(L1, L2)
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
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td>—</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-20-التغيير-والتكرار-مع-نسخة-الخطوة-الأولى">الشريحة 20: التغيير والتكرار مع نسخة — الخطوة الأولى</h2>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>10</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-21-التغيير-والتكرار-مع-نسخة-الخطوة-نفسها">الشريحة 21: التغيير والتكرار مع نسخة — الخطوة نفسها</h2>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>20</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-22-التغيير-والتكرار-مع-نسخة-الخطوة-الثانية">الشريحة 22: التغيير والتكرار مع نسخة — الخطوة الثانية</h2>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>30</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-23-التغيير-والتكرار-مع-نسخة-الخطوة-نفسها">الشريحة 23: التغيير والتكرار مع نسخة — الخطوة نفسها</h2>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>40</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-24-التغيير-والتكرار-مع-نسخة-بعد-الانتهاء">الشريحة 24: التغيير والتكرار مع نسخة — بعد الانتهاء</h2>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-25-الأسماء-المستعارة-aliasing">الشريحة 25: الأسماء المستعارة (Aliasing)</h2>
<ul>
<li>قد تكون المدينة معروفة بأسماء كثيرة (Many Names).</li>
<li>صفات مدينة: صغيرة (Small)، متقنة التقنية (Tech-Savvy).</li>
<li>كل الألقاب تشير إلى المدينة نفسها.</li>
</ul>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>الصفات قبل</th>
<th>الصفات بعد</th>
</tr>
</thead>
<tbody>
<tr>
<td>Boston</td>
<td><code>small</code> و<code>tech-savvy</code></td>
<td><code>small</code> و<code>tech-savvy</code> و<code>snowy</code></td>
</tr>
<tr>
<td>The Hub</td>
<td><code>small</code> و<code>tech-savvy</code></td>
<td><code>small</code> و<code>tech-savvy</code> و<code>snowy</code></td>
</tr>
<tr>
<td>Beantown</td>
<td><code>small</code> و<code>tech-savvy</code></td>
<td><code>small</code> و<code>tech-savvy</code> و<code>snowy</code></td>
</tr>
<tr>
<td>Athens of America</td>
<td><code>small</code> و<code>tech-savvy</code></td>
<td><code>small</code> و<code>tech-savvy</code> و<code>snowy</code></td>
</tr>
</tbody>
</table>
<ul>
<li>أضف صفة جديدة إلى لقب واحد… ثمفكل الأسماء المستعارة تشير جميعًا إلى الصفة الجديدة.</li>
</ul>
<h2 id="الشريحة-26-التغيير-والتكرار-مع-اسم-مستعار-mutation-and-iteration-with-alias">الشريحة 26: التغيير والتكرار مع اسم مستعار (Mutation and Iteration with Alias)</h2>
<p><code>L1_copy = L1</code></p>
<ul>
<li>علامة الإسناد <code>=</code> على كائن قابل للتغيير تنشئ <strong>اسمًا مستعارًا</strong> (Alias)، لا نسخة (Clone).</li>
</ul>
<table>
<thead>
<tr>
<th>النسخة بالاسم المستعار</th>
<th>النسخة الصحيحة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def remove_dups(L1, L2):</code></td>
<td><code>def remove_dups(L1, L2):</code></td>
</tr>
<tr>
<td><code>L1_copy = L1</code></td>
<td><code>L1_copy = L1[:]</code></td>
</tr>
<tr>
<td><code>for e in L1_copy:</code></td>
<td><code>for e in L1_copy:</code></td>
</tr>
<tr>
<td><code>if e in L2:</code></td>
<td><code>if e in L2:</code></td>
</tr>
<tr>
<td><code>L1.remove(e)</code></td>
<td><code>L1.remove(e)</code></td>
</tr>
</tbody>
</table>
<ul>
<li>استعمال إسناد بسيط دون إنشاء نسخة:
<ul>
<li>ينشئ اسمًا مستعارًا للقائمة (الكائن نفسه مُشارًا إليه باسم آخر).</li>
<li>هذا مثل المرور على <code>L</code> نفسها، فهو لا يعمل!</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-27-التغيير-والتكرار-مع-اسم-مستعار-القيم">الشريحة 27: التغيير والتكرار مع اسم مستعار — القيم</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_dups</span>(<span class="hljs-params">L1, L2</span>):
    L1_copy = L1
    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L1_copy:
        <span class="hljs-keyword">if</span> e <span class="hljs-keyword">in</span> L2:
            L1.remove(e)

L1 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>]
L2 = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">60</span>]
remove_dups(L1, L2)
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
<td><code>L1_copy</code></td>
<td><code>10,20,30,40</code></td>
</tr>
<tr>
<td><code>L1</code></td>
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td><code>e</code></td>
<td><code>40</code></td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> <code>L1_copy</code> و<code>L1</code> اسمان لكائن واحد، ولذلك لا تظهر لقيمة <code>L1_copy</code> قوسان مربّعان منفصلة في الأصل.</p>
<h2 id="الشريحة-28-الفكرة-الكبرى-big-idea">الشريحة 28: الفكرة الكبرى (BIG IDEA)</h2>
<blockquote>
<p>عندما تمرّر قائمة كمعامل (Parameter) إلى دالة، فأنت تصنع اسمًا مستعارًا. المعامل الفعلي (Actual Parameter، من استدعاء الدالة) هو اسم مستعار للمعامل الصوري (Formal Parameter، من تعريف الدالة).</p>
</blockquote>
<h2 id="الشريحة-29-الأسماء-المستعارة-في-نداء-الدالة">الشريحة 29: الأسماء المستعارة — في نداء الدالة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_dups</span>(<span class="hljs-params">L1, L2</span>):
    L1_copy = L1
    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L1_copy:
        <span class="hljs-keyword">if</span> e <span class="hljs-keyword">in</span> L2:
            L1.remove(e)

La = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>]
Lb = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>, <span class="hljs-number">60</span>]
remove_dups(La, Lb)
<span class="hljs-built_in">print</span>(La)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم في النطاق العام</th>
<th>الاسم في نطاق الدالة</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>La</code></td>
<td><code>L1</code></td>
<td><code>[20,30,40]</code></td>
</tr>
<tr>
<td><code>Lb</code></td>
<td><code>L2</code></td>
<td><code>[10,20,50,60]</code></td>
</tr>
<tr>
<td>—</td>
<td><code>L1_copy</code></td>
<td><code>[10,20,30,40]</code></td>
</tr>
<tr>
<td>—</td>
<td><code>e</code></td>
<td><code>40</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-30-الأسماء-المستعارة-والنسخ-السطحية-والنسخ-العميقة-مع-عناصر-قابلة-للتغيير-aliases-shallow-copies-and-deep-copies-with-mutable-elements">الشريحة 30: الأسماء المستعارة والنسخ السطحية والنسخ العميقة مع عناصر قابلة للتغيير (Aliases, Shallow Copies, and Deep Copies with Mutable Elements)</h2>
<p>شريحة عنوان تعلن موضوعًا جديدًا.</p>
<h2 id="الشريحة-31-التحكم-في-النسخ-control-copying">الشريحة 31: التحكّم في النسخ (Control Copying)</h2>
<ul>
<li>الإسناد (Assignment) ينشئ فقط مؤشّرًا جديدًا (New Pointer) إلى الكائن نفسه.</li>
</ul>
<pre><code class="language-python">old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-string">&#x27;foo&#x27;</span>]]
new_list = old_list
new_list[<span class="hljs-number">2</span>][<span class="hljs-number">1</span>] = <span class="hljs-number">6</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)  <span class="hljs-comment"># New list: [[1,2],[3,4],[5,6]]</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)  <span class="hljs-comment"># Old list: [[1,2],[3,4],[5,6]]</span>
</code></pre>
<ul>
<li>فالتغيير في كائن واحد يغيّر الآخر.</li>
<li>الرسم البياني: كلا الاسمين <code>old_list</code> و<code>new_list</code> يشيران إلى الكائن نفسه، وفيه <code>[1,2]</code> و<code>[3,4]</code> و<code>[5,6]</code> بعد التغيير.</li>
</ul>
<h2 id="الشريحة-32-التحكم-في-النسخ-النسخ-السطحي-shallow-copying">الشريحة 32: التحكّم في النسخ — النسخ السطحي (Shallow Copying)</h2>
<ul>
<li>لنفترض أننا نريد إنشاء نسخة من قائمة، لا مجرّد مؤشّر مشترك.</li>
<li>النسخ السطحي (Shallow Copying) يفعل هذا على المستوى الأعلى من القائمة.</li>
<li>وهو مكافئ للصيغة <code>[:]</code>.</li>
<li><strong>أي عناصر قابلة للتغيير لا تُنسخ.</strong></li>
<li>استعمل هذا عندما تحتوي قائمتك على كائنات غير قابلة للتغيير فقط.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> copy

old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]
new_list = copy.copy(old_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)
</code></pre>
<p><strong>ملاحظة المترجم:</strong> الشريحة تحمل في أصلها عبارة <code>6.0001 LECTURE 5</code> متبقّية من عرض قديم في الملف؛ وهي ليست إشارة إلى مقرر آخر، بل أثر باقٍ في ملف MIT نفسه، وقد أُشير إليها هنا للشفافية.</p>
<h2 id="الشريحة-33-التحكم-في-النسخ-شيفرة-النسخ-السطحي">الشريحة 33: التحكّم في النسخ — شيفرة النسخ السطحي</h2>
<pre><code class="language-python">old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]
new_list = copy.copy(old_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)  <span class="hljs-comment"># New list: [[1,2],[3,4],[5,6]]</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)  <span class="hljs-comment"># Old list: [[1,2],[3,4],[5,6]]</span>
</code></pre>
<p>الرسم البياني: <code>old_list</code> و<code>new_list</code> كائنان مختلفان في المستوى الأعلى، وفي كلٍّ منهما القوائم الفرعية نفسها <code>[1,2]</code> و<code>[3,4]</code> و<code>[5,6]</code> مشتركة.</p>
<p><strong>ملاحظة المترجم:</strong> في هذه الشريحة أيضًا تتبقّى في الملف الأصلي عبارة <code>6.0001 LECTURE 5</code> من عرض قديم.</p>
<h2 id="الشريحة-34-التحكم-في-النسخ-تغيير-البنية-الأعلى">الشريحة 34: التحكّم في النسخ — تغيير البنية الأعلى</h2>
<ul>
<li>الآن نغيّر البنية في المستوى الأعلى.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> copy

old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]
new_list = copy.copy(old_list)
old_list.append([<span class="hljs-number">7</span>,<span class="hljs-number">8</span>])

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)
</code></pre>
<h2 id="الشريحة-35-التحكم-في-النسخ-النتيجة">الشريحة 35: التحكّم في النسخ — النتيجة</h2>
<pre><code class="language-python">old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]
new_list = copy.copy(old_list)
old_list.append([<span class="hljs-number">7</span>,<span class="hljs-number">8</span>])

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)  <span class="hljs-comment"># New list: [[1,2],[3,4],[5,6]]</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)  <span class="hljs-comment"># Old list: [[1,2],[3,4],[5,6],[7,8]]</span>
</code></pre>
<p>الرسم البياني: <code>old_list</code> صار <code>[1,2]</code> و<code>[3,4]</code> و<code>[5,6]</code> و<code>[7,8]</code>، بينما <code>new_list</code> بقي <code>[1,2]</code> و<code>[3,4]</code> و<code>[5,6]</code>.</p>
<p><strong>ملاحظة المترجم:</strong> في هذه الشريحة أيضًا تتبقّى في الملف الأصلي عبارة <code>6.0001 LECTURE 5</code> من عرض قديم.</p>
<h2 id="الشريحة-36-التحكم-في-النسخ-تغيير-عنصر-في-بنية-فرعية">الشريحة 36: التحكّم في النسخ — تغيير عنصر في بنية فرعية</h2>
<ul>
<li>لكن إذا غيّرنا عنصرًا في إحدى البنى الفرعية، فهما مشتركة (Shared)!</li>
<li>إذا لم تكن عناصرك قابلة للتغيير فليست هذه مشكلة.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> copy

old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]
new_list = copy.copy(old_list)
old_list.append([<span class="hljs-number">7</span>,<span class="hljs-number">8</span>])
old_list[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>] = <span class="hljs-number">9</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)
</code></pre>
<h2 id="الشريحة-37-التحكم-في-النسخ-النتيجة">الشريحة 37: التحكّم في النسخ — النتيجة</h2>
<pre><code class="language-python">old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]
new_list = copy.copy(old_list)
old_list.append([<span class="hljs-number">7</span>,<span class="hljs-number">8</span>])
old_list[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>] = <span class="hljs-number">9</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)  <span class="hljs-comment"># New list: [[1,2],[3,9],[5,6]]</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)  <span class="hljs-comment"># Old list: [[1,2],[3,9],[5,6],[7,8]]</span>
</code></pre>
<p>الرسم البياني: البنية الفرعية <code>[3,4]</code> صارت <code>[3,9]</code> في الكائنين معًا، لأنها مشتركة.</p>
<p><strong>ملاحظة المترجم:</strong> في هذه الشريحة أيضًا تتبقّى في الملف الأصلي عبارة <code>6.0001 LECTURE 5</code> من عرض قديم.</p>
<h2 id="الشريحة-38-التحكم-في-النسخ-النسخة-العميقة-deep-copy">الشريحة 38: التحكّم في النسخ — النسخة العميقة (Deep Copy)</h2>
<ul>
<li>إذا أردنا أن تكون كل البنى نسخًا جديدة، نحتاج إلى نسخة عميقة (Deep Copy).</li>
<li>استعمل النسخة العميقة عندما قد تحتوي قائمتك على عناصر قابلة للتغيير، لضمان نسخ كل بنية في كل مستوى.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> copy

old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]

new_list = copy.deepcopy(old_list)
old_list.append([<span class="hljs-number">7</span>,<span class="hljs-number">8</span>])
old_list[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>] = <span class="hljs-number">9</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)
</code></pre>
<h2 id="الشريحة-39-التحكم-في-النسخ-نتيجة-النسخة-العميقة">الشريحة 39: التحكّم في النسخ — نتيجة النسخة العميقة</h2>
<pre><code class="language-python">old_list = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],[<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]]

new_list = copy.deepcopy(old_list)
old_list.append([<span class="hljs-number">7</span>,<span class="hljs-number">8</span>])
old_list[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>] = <span class="hljs-number">9</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;New list:&quot;</span>, new_list)  <span class="hljs-comment"># New list: [[1,2],[3,4],[5,6]]</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Old list:&quot;</span>, old_list)  <span class="hljs-comment"># Old list: [[1,2],[3,9],[5,6],[7,8]]</span>
</code></pre>
<p>الرسم البياني: في <code>old_list</code> البنية الفرعية <code>[3,9]</code>، وفي <code>new_list</code> البنية الفرعية <code>[3,4]</code> — أي نسختان مستقلّتان تمامًا.</p>
<p><strong>ملاحظة المترجم:</strong> في هذه الشريحة أيضًا تتبقّى في الملف الأصلي عبارة <code>6.0001 LECTURE 5</code> من عرض قديم.</p>
<h2 id="الشريحة-40-القوائم-في-الذاكرة-lists-in-memory">الشريحة 40: القوائم في الذاكرة (Lists in Memory)</h2>
<ul>
<li>افصل بين فكرة الكائن (Object) والاسم الذي نمنحه لهذا الكائن.
<ul>
<li>القائمة كائن في الذاكرة.</li>
<li>اسم المتغيّر يشير إلى الكائن.</li>
</ul>
</li>
<li>القوائم قابلة للتغيير وتتصرّف بشكل مختلف عن الأنواع غير القابلة للتغيير.</li>
<li>استعمال علامة المساواة بين كائنات قابلة للتغيير ينشئ أسماء مستعارة (Aliases).
<ul>
<li>المتغيّران يشيران إلى الكائن نفسه في الذاكرة.</li>
<li>أي متغيّر يشير إلى ذلك الكائن يتأثّر بتغيير الكائن، حتى لو كان التغيير بالإشارة إلى اسم آخر.</li>
</ul>
</li>
<li>إذا أردت نسخة، فأنت تطلب من بايثون صراحةً أن يصنع نسخة.</li>
<li>العبارة المفتاحية التي ينبغي أن تحفظها عند العمل مع القوائم هي <strong>الآثار الجانبية</strong> (Side Effects)، وبخاصة عند التعامل مع الأسماء المستعارة — اسمان يشيران إلى البنية نفسها في الذاكرة.</li>
<li>Python Tutor هو أعزّ صديق يساعدك على ترتيب هذا الأمر: http://www.pythontutor.com/</li>
</ul>
<h2 id="الشريحة-41-لماذا-القوائم-والصفوف-why-lists-and-tuples">الشريحة 41: لماذا القوائم والصفوف؟ (Why Lists and Tuples?)</h2>
<ul>
<li>إذا كان التغيير (Mutation) يسبب كل هذه المشاكل، فلماذا نريد القوائم أصلًا؟ أليست الصفوف تكفي؟
<ul>
<li><strong>الكفاءة (Efficiency):</strong> إذا كنّا نجرّسل تسلسلات كبيرة جدًا، فلا نريد نسخَها كاملة في كل مرة نغيّر فيها عنصرًا.</li>
</ul>
</li>
<li>إذا كانت القوائم تفعل كل ما تفعله الصفوف تقريبًا، فلماذا نريد القوائم أصلًا؟
<ul>
<li>البنى غير القابلة للتغيير (Immutable Structures) قد تكون ذات قيمة كبيرة في سياق أنواع الكائنات الأخرى.</li>
<li>لا نريد أن تغيّر شيفرة أخرى بالخطأ بيانات مهمة؛ الصفوف تحمي من ذلك.</li>
<li>وقد تكون أسرع قليلًا.</li>
</ul>
</li>
</ul>
<div class="exercises"><h2 id="الشريحة-42-تمارين-تتبع-في-المنزل-at-home-tracing-examples">الشريحة 42: تمارين تتبّع في المنزل (At Home Tracing Examples)</h2>
<p>أمثلة تتبّع في المنزل تعرض الأسماء المستعارة (Aliasing) والاستنساخ (Cloning).</p>
<p><strong>ملاحظة المترجم:</strong> نصّ هذه الشريحة فقير، وقد اعتمد في الأصل على لقطات شاشة من Python Tutor والرسوم البيانية المميّزة. لم تُضمَّن اللقطات هنا لأن ترخيصها غير واضح داخل مادة OCW، ولم يُخمَّن محتواها.</p>
<h2 id="الشريحة-43-الأسماء-المستعارة-aliases">الشريحة 43: الأسماء المستعارة (Aliases)</h2>
<ul>
<li><code>hot</code> اسم مستعار لـ<code>warm</code> — تغيير أحدهما يغيّر الآخر!</li>
<li>الدالة <code>append()</code> لها أثر جانبي.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-44-الأسماء-المستعارة-aliases">الشريحة 44: الأسماء المستعارة (Aliases)</h2>
<ul>
<li><code>hot</code> اسم مستعار لـ<code>warm</code> — تغيير أحدهما يغيّر الآخر!</li>
<li>الدالة <code>append()</code> لها أثر جانبي.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-45-استنساخ-قائمة-cloning-a-list">الشريحة 45: استنساخ قائمة (Cloning a List)</h2>
<ul>
<li>أنشئ قائمة جديدة وانسخ كل عنصر فيها باستخدام نسخة (Clone).</li>
</ul>
<pre><code class="language-python">chill = cool[:]
</code></pre>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-46-استنساخ-قائمة-cloning-a-list">الشريحة 46: استنساخ قائمة (Cloning a List)</h2>
<ul>
<li>أنشئ قائمة جديدة وانسخ كل عنصر فيها باستخدام نسخة (Clone).</li>
</ul>
<pre><code class="language-python">chill = cool[:]
</code></pre>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-47-استنساخ-قائمة-cloning-a-list">الشريحة 47: استنساخ قائمة (Cloning a List)</h2>
<ul>
<li>أنشئ قائمة جديدة وانسخ كل عنصر فيها باستخدام نسخة (Clone).</li>
</ul>
<pre><code class="language-python">chill = cool[:]
</code></pre>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-48-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of">الشريحة 48: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)</h2>
<ul>
<li>يمكن أن تكون القوائم متداخلة (Nested Lists).</li>
<li>الآثار الجانبية (Side Effects) ما زالت ممكنة بعد التغيير.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-49-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of">الشريحة 49: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)</h2>
<ul>
<li>يمكن أن تكون القوائم متداخلة (Nested Lists).</li>
<li>الآثار الجانبية (Side Effects) ما زالت ممكنة بعد التغيير.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-50-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of">الشريحة 50: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)</h2>
<ul>
<li>يمكن أن تكون القوائم متداخلة (Nested Lists).</li>
<li>الآثار الجانبية (Side Effects) ما زالت ممكنة بعد التغيير.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-51-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of">الشريحة 51: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)</h2>
<ul>
<li>يمكن أن تكون القوائم متداخلة (Nested Lists).</li>
<li>الآثار الجانبية (Side Effects) ما زالت ممكنة بعد التغيير.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-52-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of">الشريحة 52: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)</h2>
<ul>
<li>يمكن أن تكون القوائم متداخلة (Nested Lists).</li>
<li>الآثار الجانبية (Side Effects) ما زالت ممكنة بعد التغيير.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-53-قوائم-من-قوائم-من-قوائم-lists-of-lists-of-lists-of">الشريحة 53: قوائم من قوائم من قوائم… (Lists of Lists of Lists of…)</h2>
<ul>
<li>يمكن أن تكون القوائم متداخلة (Nested Lists).</li>
<li>الآثار الجانبية (Side Effects) ما زالت ممكنة بعد التغيير.</li>
</ul>
<p><strong>ملاحظة المترجم:</strong> بقية الشريحة لقطات شاشة من Python Tutor لا يمكن نقلها بترخيص واضح، ولذلك لم تُنقل.</p>
<h2 id="الشريحة-54-mitopencourseware">الشريحة 54: MITOpenCourseWare</h2>
<p>https://ocw.mit.edu</p>
<p>مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.</p>
<p>للاطّلاع على كيفية الاستشهاد بهذه المواد أو على شروط الاستخدام: https://ocw.mit.edu/terms.</p>
</div>`,a={book:n,chapter:s,chapterTitle:t,slug:e,title:l,headings:o,html:d};export{n as book,s as chapter,t as chapterTitle,a as default,o as headings,d as html,e as slug,l as title};
