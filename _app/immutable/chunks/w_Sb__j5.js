const n="mit-6100l",s="recitations",e="الجلسات التطبيقية",i="rec8",t="الجلسة التطبيقية 8: الاستدعاء الذاتي (Recursion)",r=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"المحاضرتان-15-و16-الاستدعاء-الذاتي-recursion",text:"المحاضرتان 15 و16: الاستدعاء الذاتي (Recursion)"},{depth:3,id:"ما-هو-الاستدعاء-الذاتي-what-is-recursion",text:"ما هو الاستدعاء الذاتي (What is Recursion)؟"},{depth:3,id:"علامات-تدلنا-على-استعمال-الاستدعاء-الذاتي",text:"علامات تدلّنا على استعمال الاستدعاء الذاتي"},{depth:3,id:"أمثلة-على-مهام-يمكن-أن-تستعمل-الاستدعاء-الذاتي",text:"أمثلة على مهام يمكن أن تستعمل الاستدعاء الذاتي"},{depth:3,id:"البنية-العامة-للاستدعاء-الذاتي-general-recursive-structure",text:"البنية العامة للاستدعاء الذاتي (General Recursive Structure)"}],l=`<h1>الجلسة التطبيقية 8 (Recitation 8)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec08_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف PDF. كان سطر التعليق في المثال الأخير مكتوبًا على سطرين بسبب التفاف النصّ، فُجمعا في تعليق واحد، وعوّضت علامات التنصيص المنحنية « “ ” » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/">المحاضرة 16: الاستدعاء الذاتي على غير الأعداد (Recursion on Non-Numerics)</a>. ويعرض ملخّصها الاستدعاء الذاتي (Recursion) كما في المحاضرتين 15 و16.</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 8 — 4 نوفمبر 2022.</p>
<ul>
<li>مسابقة MQ8 يوم الاثنين 11/7.</li>
<li>التسليم المرحلي في منتصف مجموعة المسائل PSET 4 مستحقّ الساعة 9 مساءً يوم الأربعاء 11/9.</li>
</ul>
<h2 id="المحاضرتان-15-و16-الاستدعاء-الذاتي-recursion">المحاضرتان 15 و16: الاستدعاء الذاتي (Recursion)</h2>
<h3 id="ما-هو-الاستدعاء-الذاتي-what-is-recursion">ما هو الاستدعاء الذاتي (What is Recursion)؟</h3>
<ul>
<li>طريقة برمجية تُستعمل غالبًا بدلًا من التكرار (iteration).</li>
<li>من الناحية الخوارزمية، طريقة لتصميم الحلول بمبدأ «اقسم وغلب» (divide-and-conquer) — أي تحويل المسألة إلى نسخة أبسط من المسألة نفسها.</li>
<li>من الناحية الدلالية، تقنية برمجية تستدعي فيها الدالة نفسها (لكن إلى أجل غير مميّد).</li>
<li>إن لاحظت أنّك تحلّ المسألة نفسها مرارًا، فقد يكون استعمال الاستدعاء الذاتي أسهل.</li>
</ul>
<h3 id="علامات-تدلنا-على-استعمال-الاستدعاء-الذاتي">علامات تدلّنا على استعمال الاستدعاء الذاتي</h3>
<ul>
<li>ندرك أنّ أمامنا مسألة نحلّها عدّة مرّات.</li>
<li>عدد التكرارات المطلوبة غير معروف.</li>
<li>نريد حلًّا يبدو «أجمل» من الحل التكراري.</li>
</ul>
<h3 id="أمثلة-على-مهام-يمكن-أن-تستعمل-الاستدعاء-الذاتي">أمثلة على مهام يمكن أن تستعمل الاستدعاء الذاتي</h3>
<ul>
<li>فيبوناتشي (Fibonacci).</li>
<li>أبراج هانوي (Towers of Hanoi).</li>
<li>المتتاليات (مثل الهندسية والحسابية إلخ…).</li>
<li>ضرب أو جمع أو طرح متتاليات.</li>
</ul>
<h3 id="البنية-العامة-للاستدعاء-الذاتي-general-recursive-structure">البنية العامة للاستدعاء الذاتي (General Recursive Structure)</h3>
<p><strong>الهدف:</strong> أن نواصل التقليص إلى مسألة أبسط حتى نعرف كيف نحلّ المسألة الأبسط.</p>
<p>يتكوّن برنامج استدعاء ذاتي عامّ من جزأين:</p>
<h4>1. الحالة الأساس (Base Case)</h4>
<ul>
<li>حين تصل إلى حالة بسيطة يمكن حلّها.</li>
<li>يجب أن تصل إلى هذه الحالة دائمًا، وإلا فقد حصلت على استدعاء ذاتي لا نهائي.</li>
</ul>
<p>مثلًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> a == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
<span class="hljs-keyword">elif</span> a == <span class="hljs-number">0</span>:
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
</code></pre>
<h4>2. الحالة الاستدعائية (Recursive Case)</h4>
<ul>
<li>فكّر: كيف يمكنني تقليل المسألة في هذه الخطوة؟</li>
<li>عادةً نستدعي دالتنا بمدخلات تجعل مسألتنا بسيطة أو أصغر.</li>
</ul>
<p>مثلًا:</p>
<pre><code class="language-python">recurse(a-<span class="hljs-number">1</span>) <span class="hljs-comment"># -2 is our modification to &quot;simplify&quot; the problem.</span>
</code></pre>
`,o={book:n,chapter:s,chapterTitle:e,slug:i,title:t,headings:r,html:l};export{n as book,s as chapter,e as chapterTitle,o as default,r as headings,l as html,i as slug,t as title};
