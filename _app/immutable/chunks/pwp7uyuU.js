const n="mit-6100l",e="lecture-03",s="المحاضرة 3: التكرار (Iteration)",l="notes",o="المحاضرة 3: شرائح التكرار كاملة",t=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-التكرار",text:"الشريحة 1: التكرار"},{depth:2,id:"الشريحة-2-مراجعة-المحاضرة-السابقة",text:"الشريحة 2: مراجعة المحاضرة السابقة"},{depth:2,id:"الشريحة-3-مراجعة-التفريع",text:"الشريحة 3: مراجعة التفريع"},{depth:2,id:"الشريحة-4-الغابة-الضائعة-والتفريع-المتداخل",text:"الشريحة 4: الغابة الضائعة والتفريع المتداخل"},{depth:2,id:"الشريحة-5-الغابة-الضائعة-باستخدام-حلقة",text:"الشريحة 5: الغابة الضائعة باستخدام حلقة"},{depth:2,id:"الشريحة-6-حلقات-while",text:"الشريحة 6: حلقات while"},{depth:2,id:"الشريحة-7-مشاهدة-كل-حلقات-مسلسل-واحد-دفعة-واحدة",text:"الشريحة 7: مشاهدة كل حلقات مسلسل واحد دفعة واحدة"},{depth:2,id:"الشريحة-8-تدفق-التحكم-حلقات-while",text:"الشريحة 8: تدفق التحكم — حلقات while"},{depth:2,id:"الشريحة-9-مثال-لحلقة-while",text:"الشريحة 9: مثال لحلقة while"},{depth:2,id:"الشريحة-10-جرب-بنفسك",text:"الشريحة 10: جرّب بنفسك!"},{depth:2,id:"الشريحة-11-مثال-لحلقة-while",text:"الشريحة 11: مثال لحلقة while"},{depth:2,id:"الشريحة-12-مثال-لحلقة-while",text:"الشريحة 12: مثال لحلقة while"},{depth:2,id:"الشريحة-13-جرب-بنفسك",text:"الشريحة 13: جرّب بنفسك!"},{depth:2,id:"الشريحة-14-الفكرة-الكبرى",text:"الشريحة 14: الفكرة الكبرى"},{depth:2,id:"الشريحة-15-جرب-بنفسك",text:"الشريحة 15: جرّب بنفسك!"},{depth:2,id:"الشريحة-16-تدفق-التحكم-حلقات-while",text:"الشريحة 16: تدفق التحكم — حلقات while"},{depth:2,id:"الشريحة-17-نمط-شائع",text:"الشريحة 17: نمط شائع"},{depth:2,id:"الشريحة-18-حلقات-for",text:"الشريحة 18: حلقات for"},{depth:2,id:"الشريحة-19-هل-ما-زلت-تشاهد",text:"الشريحة 19: هل ما زلت تشاهد؟"},{depth:2,id:"الشريحة-20-تدفق-التحكم-حلقات-while-وfor",text:"الشريحة 20: تدفق التحكم — حلقات while وfor"},{depth:2,id:"الشريحة-21-بنية-حلقات-for",text:"الشريحة 21: بنية حلقات for"},{depth:2,id:"الشريحة-22-تسلسل-شائع-من-القيم",text:"الشريحة 22: تسلسل شائع من القيم"},{depth:2,id:"الشريحة-23-تسلسل-شائع-من-القيم",text:"الشريحة 23: تسلسل شائع من القيم"},{depth:2,id:"الشريحة-24-range",text:"الشريحة 24: range"},{depth:2,id:"الشريحة-25-جرب-بنفسك",text:"الشريحة 25: جرّب بنفسك!"},{depth:2,id:"الشريحة-26-المجموع-التراكمي",text:"الشريحة 26: المجموع التراكمي"},{depth:2,id:"الشريحة-27-المجموع-التراكمي",text:"الشريحة 27: المجموع التراكمي"},{depth:2,id:"الشريحة-28-المجموع-التراكمي",text:"الشريحة 28: المجموع التراكمي"},{depth:2,id:"الشريحة-29-المجموع-التراكمي",text:"الشريحة 29: المجموع التراكمي"},{depth:2,id:"الشريحة-30-المجموع-التراكمي",text:"الشريحة 30: المجموع التراكمي"},{depth:2,id:"الشريحة-31-جرب-بنفسك",text:"الشريحة 31: جرّب بنفسك!"},{depth:2,id:"الشريحة-32-حلقات-for-وrange",text:"الشريحة 32: حلقات for وrange"},{depth:2,id:"الشريحة-33-الفكرة-الكبرى",text:"الشريحة 33: الفكرة الكبرى"},{depth:2,id:"الشريحة-34-ملخص",text:"الشريحة 34: ملخص"},{depth:2,id:"الشريحة-35-بيانات-mit-opencourseware",text:"الشريحة 35: بيانات MIT OpenCourseWare"}],a=`<h1>المحاضرة 3: شرائح التكرار (Iteration)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-3-iteration/">صفحة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec03_pdf/">صفحة الشرائح الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec03.pdf">ملف الشرائح الأصلي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec03_code.py">ملف شيفرة المحاضرة الأصلي</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق، بما في ذلك شرائح البناء التدريجي المتكررة. نُقلت المخططات إلى نصوص وجداول تحافظ على تسلسلها وقيمها، ونُقلت التعليقات التوضيحية المرئية في PDF حتى حين لا تظهر في النص المستخرج. الشيفرة وشبه الشيفرة (Pseudocode) محفوظتان بالإنجليزية. لم تُضمَّن صور أو صفحات PDF. صور Nintendo المستثناة من رخصة المصدر محذوفة صراحة في موضعيها.</p>
<h2 id="الشريحة-1-التكرار">الشريحة 1: التكرار</h2>
<p>التكرار (Iteration).</p>
<p>نزّل الشرائح وملفات <code>.py</code> للمتابعة.</p>
<p>6.100L، المحاضرة 3 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-مراجعة-المحاضرة-السابقة">الشريحة 2: مراجعة المحاضرة السابقة</h2>
<ul>
<li>السلاسل النصية (Strings) تقدم نوع بيانات (Data Type) جديدًا.
<ul>
<li>هي تسلسلات من المحارف (Characters)، وأول محرف يقع عند الفهرس (Index) <code>0</code>.</li>
<li>يمكن فهرستها واقتطاع شرائح (Slices) منها.</li>
</ul>
</li>
<li>الإدخال (Input):
<ul>
<li>يتم باستخدام الأمر <code>input</code>.</li>
<li>كل ما يدخله المستخدم يُقرأ بوصفه كائن سلسلة نصية!</li>
</ul>
</li>
<li>الإخراج (Output):
<ul>
<li>يتم باستخدام الأمر <code>print</code>.</li>
<li>لا تظهر في الصدفة (Shell) إلا الكائنات التي تُطبع في ملف شيفرة <code>.py</code>.</li>
</ul>
</li>
<li>التفريع (Branching):
<ul>
<li>تنفذ البرامج كتل الشيفرة (Code Blocks) عندما تكون الشروط صحيحة.</li>
<li>في بنية <code>if-elif-elif…</code>، يُنفَّذ الفرع الخاص بأول شرط قيمته <code>True</code>.</li>
<li>المسافة البادئة (Indentation) مهمة في Python!</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-3-مراجعة-التفريع">الشريحة 3: مراجعة التفريع</h2>
<p>الأشكال الأربعة المعروضة:</p>
<pre><code class="language-text">if &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
</code></pre>
<pre><code class="language-text">if &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
else:
    &lt; code &gt;
    &lt; code &gt;
    ...
</code></pre>
<pre><code class="language-text">if &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
elif &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
elif &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
</code></pre>
<pre><code class="language-text">if &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
elif &lt;condition&gt;:
    &lt; code &gt;
    &lt; code &gt;
    ...
else:
    &lt; code &gt;
    &lt; code &gt;
    ...
</code></pre>
<ul>
<li>قيمة <code>&lt;condition&gt;</code> إما <code>True</code> أو <code>False</code>.</li>
<li>قيّم أول كتلة شرطها المقابل <code>&lt;condition&gt;</code> يساوي <code>True</code>.
<ul>
<li>تبدأ الكتلة بتعليمة <code>if</code>.</li>
</ul>
</li>
<li><strong>المسافة البادئة مهمة في Python!</strong> تُبرز الشريحة الكلمات المفتاحية والنقطتين <code>:</code> اللتين تبدآن الكتلة.</li>
</ul>
<h2 id="الشريحة-4-الغابة-الضائعة-والتفريع-المتداخل">الشريحة 4: الغابة الضائعة والتفريع المتداخل</h2>
<ul>
<li>تخدعك الغابة الضائعة (Lost Woods) في Zelda.</li>
<li>إذا واصلت الذهاب يمينًا، تبقى عالقًا في الموضع نفسه إلى الأبد.</li>
<li>للخروج، جازف واذهب في الاتجاه المعاكس.</li>
</ul>
<p><strong>حذف صريح لمادة طرف ثالث:</strong> حُذفت صورة اللعبة المملوكة لـ Nintendo. يذكر المصدر: «© Nintendo. جميع الحقوق محفوظة. هذا المحتوى مستثنى من رخصة المشاع الإبداعي الخاصة بنا». <a href="https://ocw.mit.edu/help/faq-fair-use/">معلومات الاستخدام العادل في MIT OCW</a>.</p>
<p><strong>نص توضيحي مكافئ من المترجم:</strong> تخيّل شخصية في ممر بين أشجار. يؤدي اختيار اليمين إلى عرض الممر نفسه مجددًا، بينما يؤدي اختيار اليسار إلى الخروج. تُمثّل الكتل المتداخلة محاولات متتالية، لكن كتابة عدد ثابت منها لا تغطي عددًا غير معلوم من المحاولات.</p>
<pre><code class="language-text">if &lt;exit right&gt;:
    &lt;set background to woods_background&gt;
    if &lt;exit right&gt;:
        &lt;set background to woods_background&gt;
        if &lt;exit right&gt;:
            &lt;set background to woods_background&gt;
            and so on and on and on...
        else:
            &lt;set background to exit_background&gt;
    else:
        &lt;set background to exit_background&gt;
else:
    &lt;set background to exit_background&gt;
</code></pre>
<h2 id="الشريحة-5-الغابة-الضائعة-باستخدام-حلقة">الشريحة 5: الغابة الضائعة باستخدام حلقة</h2>
<ul>
<li>تخدعك الغابة الضائعة (Lost Woods) في Zelda.</li>
<li>إذا واصلت الذهاب يمينًا، تبقى عالقًا في الموضع نفسه إلى الأبد.</li>
<li>للخروج، جازف واذهب في الاتجاه المعاكس.</li>
</ul>
<p><strong>حذف صريح لمادة طرف ثالث:</strong> حُذفت صورة Nintendo المتكررة. © Nintendo، جميع الحقوق محفوظة؛ الصورة مستثناة من رخصة المشاع الإبداعي للمصدر. <a href="https://ocw.mit.edu/help/faq-fair-use/">معلومات الاستخدام العادل</a>.</p>
<p><strong>نص توضيحي مكافئ من المترجم:</strong> يظهر الممر نفسه ما دام المستخدم يختار اليمين. تسأل الحلقة عن الاتجاه من جديد في كل مرة، ثم تعرض مشهد الخروج حين لا يعود الاختيار يمينًا. بخلاف التفريع المتداخل في الشريحة السابقة، لا تتطلب هذه البنية كتابة كل محاولة منفردة.</p>
<pre><code class="language-text">while &lt;exit_right&gt;:
    &lt;set background to woods_background&gt;
    &lt;ask user which way to go&gt;
&lt;set background to exit_background&gt;
</code></pre>
<h2 id="الشريحة-6-حلقات-while">الشريحة 6: حلقات while</h2>
<p>حلقات <code>while</code> (While Loops).</p>
<h2 id="الشريحة-7-مشاهدة-كل-حلقات-مسلسل-واحد-دفعة-واحدة">الشريحة 7: مشاهدة كل حلقات مسلسل واحد دفعة واحدة</h2>
<p>مخطط التدفق (Flowchart):</p>
<ol>
<li>Netflix: ابدأ مشاهدة مسلسل جديد.</li>
<li>هل توجد حلقات أخرى لمشاهدتها؟
<ul>
<li><strong>نعم:</strong> شغّل الحلقة التالية، ثم ارجع إلى السؤال نفسه.</li>
<li><strong>لا:</strong> اقترح 3 مسلسلات أخرى مشابهة لهذا المسلسل.</li>
</ul>
</li>
</ol>
<h2 id="الشريحة-8-تدفق-التحكم-حلقات-while">الشريحة 8: تدفق التحكم — حلقات while</h2>
<pre><code class="language-text">while &lt;condition&gt;:
    &lt;code&gt;
    &lt;code&gt;
    ...
</code></pre>
<ul>
<li>يُقيَّم <code>&lt;condition&gt;</code> إلى قيمة منطقية (Boolean).</li>
<li>إذا كان <code>&lt;condition&gt;</code> يساوي <code>True</code>، نفّذ جميع الخطوات داخل كتلة شيفرة <code>while</code>.</li>
<li>افحص <code>&lt;condition&gt;</code> مرة أخرى.</li>
<li>كرر حتى يصبح <code>&lt;condition&gt;</code> مساويًا لـ <code>False</code>.</li>
<li>إذا لم يصبح <code>&lt;condition&gt;</code> مساويًا لـ <code>False</code> أبدًا، تستمر الحلقة إلى الأبد!!</li>
</ul>
<h2 id="الشريحة-9-مثال-لحلقة-while">الشريحة 9: مثال لحلقة while</h2>
<p>أنت في الغابة الضائعة. هل تذهب يسارًا أم يمينًا؟ العرض النصي:</p>
<pre><code class="language-text">You are in the Lost Forest.
************
************
  ☺
************
************
Go left or right?
</code></pre>
<p>مخطط الذاكرة: كان <code>where</code> مرتبطًا بـ <code>&quot;right&quot;</code>، ثم قُطع هذا الارتباط وأصبح مرتبطًا بـ <code>&quot;left&quot;</code>.</p>
<p>البرنامج:</p>
<pre><code class="language-python">where = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;You&#x27;re in the Lost Forest. Go left or right? &quot;</span>)
<span class="hljs-keyword">while</span> where == <span class="hljs-string">&quot;right&quot;</span>:
    where = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;You&#x27;re in the Lost Forest. Go left or right? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You got out of the Lost Forest!&quot;</span>)
</code></pre>
<h2 id="الشريحة-10-جرب-بنفسك">الشريحة 10: جرّب بنفسك!</h2>
<p>ما الذي يُطبع عندما تكتب <code>&quot;RIGHT&quot;</code>؟</p>
<pre><code class="language-python">where = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Go left or right? &quot;</span>)
<span class="hljs-keyword">while</span> where == <span class="hljs-string">&quot;right&quot;</span>:
    where = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Go left or right? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You got out!&quot;</span>)
</code></pre>
<h2 id="الشريحة-11-مثال-لحلقة-while">الشريحة 11: مثال لحلقة while</h2>
<pre><code class="language-python">n = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter a non-negative integer: &quot;</span>))
<span class="hljs-keyword">while</span> n &gt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;x&#x27;</span>)
    n = n-<span class="hljs-number">1</span>
</code></pre>
<p>مخطط الذاكرة: يُزال ارتباط <code>n</code> بالقيمة <code>4</code>، ويُعاد ربطه بالتتابع بالقيم <code>3</code>، ثم <code>2</code>، ثم <code>1</code>، ثم <code>0</code>.</p>
<h2 id="الشريحة-12-مثال-لحلقة-while">الشريحة 12: مثال لحلقة while</h2>
<pre><code class="language-python">n = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Enter a non-negative integer: &quot;</span>))
<span class="hljs-keyword">while</span> n &gt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;x&#x27;</span>)
    n = n-<span class="hljs-number">1</span>
</code></pre>
<p>التعليق المرئي في الشريحة يشطب السطر الأخير <code>n = n-1</code> ويسأل: <strong>ماذا يحدث من دون هذا السطر الأخير؟ جرّب ذلك!</strong></p>
<p>للإنهاء:</p>
<ul>
<li>اضغط <code>CTRL-c</code> أو <code>CMD-c</code> في الصدفة (Shell).</li>
<li>انقر المربع الأحمر في الصدفة.</li>
</ul>
<h2 id="الشريحة-13-جرب-بنفسك">الشريحة 13: جرّب بنفسك!</h2>
<p>شغّل هذه الشيفرة وأوقف الحلقة اللانهائية (Infinite Loop) في بيئة التطوير المتكاملة (IDE) لديك.</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
     <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;noooooo&quot;</span>)
</code></pre>
<h2 id="الشريحة-14-الفكرة-الكبرى">الشريحة 14: الفكرة الكبرى</h2>
<p><strong>يمكن لحلقات <code>while</code> تكرار الشيفرة داخلها إلى أجل غير مسمّى!</strong></p>
<p>تحتاج أحيانًا إلى تدخلك لإنهاء البرنامج.</p>
<h2 id="الشريحة-15-جرب-بنفسك">الشريحة 15: جرّب بنفسك!</h2>
<ul>
<li>وسّع هذه الشيفرة لتعرض وجهًا حزينًا عندما يدخل المستخدم حلقة <code>while</code> أكثر من مرتين.</li>
<li>تلميح: استخدم متغيرًا بوصفه عدّادًا (Counter).</li>
</ul>
<pre><code class="language-python">where = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Go left or right? &quot;</span>)
<span class="hljs-keyword">while</span> where == <span class="hljs-string">&quot;right&quot;</span>:
      where = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Go left or right? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You got out!&quot;</span>)
</code></pre>
<h2 id="الشريحة-16-تدفق-التحكم-حلقات-while">الشريحة 16: تدفق التحكم — حلقات while</h2>
<p>مرّ بالتكرار على الأعداد في تسلسل (Sequence).</p>
<pre><code class="language-python">n = <span class="hljs-number">0</span>
<span class="hljs-keyword">while</span> n &lt; <span class="hljs-number">5</span>:
    <span class="hljs-built_in">print</span>(n)
    n = n+<span class="hljs-number">1</span>
</code></pre>
<p>التعليقات التوضيحية في الشريحة:</p>
<ul>
<li>اضبط متغير الحلقة (Loop Variable) خارج حلقة <code>while</code>: <code>n = 0</code>.</li>
<li>اختبر متغير الحلقة في الشرط: <code>n &lt; 5</code>.</li>
<li>زِد متغير الحلقة داخل حلقة <code>while</code>: <code>n = n+1</code>.</li>
<li><code>n = n+1</code> مكافئة لـ <code>n += 1</code>.</li>
</ul>
<h2 id="الشريحة-17-نمط-شائع">الشريحة 17: نمط شائع</h2>
<ul>
<li>احسب <code>4!</code>، أي مضروب (Factorial) العدد 4.</li>
<li><code>i</code> هو متغير الحلقة لدينا.</li>
<li>يتتبع <code>factorial</code> حاصل الضرب.</li>
</ul>
<pre><code class="language-python">x = <span class="hljs-number">4</span>
i = <span class="hljs-number">1</span>
factorial = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> i &lt;= x:
    factorial *= i
    i += <span class="hljs-number">1</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;<span class="hljs-subst">{x}</span> factorial is <span class="hljs-subst">{factorial}</span>&#x27;</span>)
</code></pre>
<p>التعليقات التوضيحية في الشريحة:</p>
<ul>
<li>اضبط متغير الحلقة خارج حلقة <code>while</code>.</li>
<li>هيّئ حاصل ضرب المضروب بالقيمة <code>1</code>.</li>
<li>اختبر متغير الحلقة في الشرط.</li>
<li>احتفظ بحاصل ضرب تراكمي (Running Product): <code>factorial *= i</code> مكافئة لـ <code>factorial = factorial*i</code>.</li>
<li>زِد متغير الحلقة داخل حلقة <code>while</code>: <code>i += 1</code> مكافئة لـ <code>i = i+1</code>.</li>
<li>رابط Python Tutor (Python Tutor LINK) في الشريحة الأصلية.</li>
</ul>
<h2 id="الشريحة-18-حلقات-for">الشريحة 18: حلقات for</h2>
<p>حلقات <code>for</code> (For Loops).</p>
<h2 id="الشريحة-19-هل-ما-زلت-تشاهد">الشريحة 19: هل ما زلت تشاهد؟</h2>
<p>Netflix حين يغلبك النعاس: لا يشغّل سوى 4 حلقات إذا لم تكن منتبهًا.</p>
<p>مخطط التدفق:</p>
<ol>
<li>توجد 4 حلقات في التسلسل.</li>
<li>إذا <strong>بقيت حلقات أخرى في التسلسل</strong>: شغّل الحلقة التالية، ثم ارجع لفحص التسلسل.</li>
<li>إذا <strong>مررت بجميع الحلقات في التسلسل</strong>: يوقف المشاهدة.</li>
</ol>
<h2 id="الشريحة-20-تدفق-التحكم-حلقات-while-وfor">الشريحة 20: تدفق التحكم — حلقات while وfor</h2>
<p>مرّ بالتكرار على الأعداد في تسلسل.</p>
<pre><code class="language-python"><span class="hljs-comment"># very verbose with while loop</span>
n = <span class="hljs-number">0</span>
<span class="hljs-keyword">while</span> n &lt; <span class="hljs-number">5</span>:
    <span class="hljs-built_in">print</span>(n)
    n = n+<span class="hljs-number">1</span>
</code></pre>
<pre><code class="language-python"><span class="hljs-comment"># shortcut with for loop</span>
<span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
    <span class="hljs-built_in">print</span>(n)
</code></pre>
<p>معنى التعليقين: الصياغة مطوّلة جدًا بحلقة <code>while</code>، ومختصرة بحلقة <code>for</code>.</p>
<h2 id="الشريحة-21-بنية-حلقات-for">الشريحة 21: بنية حلقات for</h2>
<pre><code class="language-text">for &lt;variable&gt; in &lt;sequence of values&gt;:
    &lt;code&gt;
    ...
</code></pre>
<ul>
<li>في كل مرور في الحلقة، يأخذ <code>&lt;variable&gt;</code> قيمة.</li>
<li>في المرة الأولى، يكون <code>&lt;variable&gt;</code> هو أول قيمة في التسلسل.</li>
<li>في المرة التالية، يحصل <code>&lt;variable&gt;</code> على القيمة الثانية.</li>
<li>وهكذا، حتى تنفد القيم التي يأخذها <code>&lt;variable&gt;</code>.</li>
</ul>
<h2 id="الشريحة-22-تسلسل-شائع-من-القيم">الشريحة 22: تسلسل شائع من القيم</h2>
<pre><code class="language-text">for &lt;variable&gt; in range(&lt;some_num&gt;):
    &lt;code&gt;
    &lt;code&gt;
    ...
</code></pre>
<pre><code class="language-python"><span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
    <span class="hljs-built_in">print</span>(n)
</code></pre>
<p>التعليق التوضيحي في الشريحة: التسلسل هو <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم <code>3</code>، ثم <code>4</code>.</p>
<ul>
<li>في كل مرور في الحلقة، يأخذ <code>&lt;variable&gt;</code> قيمة.</li>
<li>في المرة الأولى، يبدأ <code>&lt;variable&gt;</code> عند <code>0</code>.</li>
<li>في المرة التالية، يحصل <code>&lt;variable&gt;</code> على القيمة <code>1</code>.</li>
<li>بعد ذلك، يحصل <code>&lt;variable&gt;</code> على القيمة <code>2</code>.</li>
<li>…</li>
<li>وهكذا، حتى يحصل <code>&lt;variable&gt;</code> على <code>some_num -1</code>.</li>
</ul>
<h2 id="الشريحة-23-تسلسل-شائع-من-القيم">الشريحة 23: تسلسل شائع من القيم</h2>
<pre><code class="language-text">for &lt;variable&gt; in range(&lt;some_num&gt;):
    &lt;code&gt;
    &lt;code&gt;
    ...
</code></pre>
<pre><code class="language-python"><span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
    <span class="hljs-built_in">print</span>(n)
</code></pre>
<p>مخطط الذاكرة الإضافي: يُقطع ارتباط <code>n</code> بالقيمة السابقة ويُعاد ربطه بالقيم بالترتيب <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم <code>3</code>، ثم <code>4</code>.</p>
<ul>
<li>في كل مرور في الحلقة، يأخذ <code>&lt;variable&gt;</code> قيمة.</li>
<li>في المرة الأولى، يبدأ <code>&lt;variable&gt;</code> عند <code>0</code>.</li>
<li>في المرة التالية، يحصل <code>&lt;variable&gt;</code> على القيمة <code>1</code>.</li>
<li>بعد ذلك، يحصل <code>&lt;variable&gt;</code> على القيمة <code>2</code>.</li>
<li>…</li>
<li>وهكذا، حتى يحصل <code>&lt;variable&gt;</code> على <code>some_num -1</code>.</li>
</ul>
<h2 id="الشريحة-24-range">الشريحة 24: range</h2>
<ul>
<li>تولّد تسلسلًا من الأعداد الصحيحة (Ints) وفق نمط.</li>
<li><code>range(start, stop, step)</code>:
<ul>
<li><code>start</code>: أول عدد صحيح يُولَّد.</li>
<li><code>stop</code>: يتحكم في آخر عدد صحيح يُولَّد؛ نصل إلى هذا العدد <strong>دون تضمينه</strong>.</li>
<li><code>step</code>: تُستخدم لتوليد العدد الصحيح التالي في التسلسل.</li>
</ul>
</li>
<li>تشبه كثيرًا ما رأيناه في اقتطاع الشرائح (Slicing).</li>
<li>غالبًا ما نحذف <code>start</code> و<code>step</code>.
<ul>
<li>مثلًا، <code>for i in range(4):</code>:
<ul>
<li>القيمة الافتراضية لـ <code>start</code> هي <code>0</code>.</li>
<li>القيمة الافتراضية لـ <code>step</code> هي <code>1</code>.</li>
</ul>
</li>
<li>مثلًا، <code>for i in range(3,5):</code>:
<ul>
<li>القيمة الافتراضية لـ <code>step</code> هي <code>1</code>.</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-25-جرب-بنفسك">الشريحة 25: جرّب بنفسك!</h2>
<p>ماذا تطبع هذه المقاطع؟</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>):
       <span class="hljs-built_in">print</span>(i)
</code></pre>
<pre><code class="language-python"><span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>):
       <span class="hljs-built_in">print</span>(j*<span class="hljs-number">2</span>)
</code></pre>
<pre><code class="language-python"><span class="hljs-keyword">for</span> me <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>,<span class="hljs-number">0</span>,-<span class="hljs-number">1</span>):
       <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;$&quot;</span>*me)
</code></pre>
<h2 id="الشريحة-26-المجموع-التراكمي">الشريحة 26: المجموع التراكمي</h2>
<ul>
<li><code>mysum</code> متغير لتخزين المجموع التراكمي (Running Sum).</li>
<li>تجعل <code>range(10)</code> قيمة <code>i</code> تساوي <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم … ثم <code>9</code>.</li>
</ul>
<pre><code class="language-python">mysum = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    mysum += i
<span class="hljs-built_in">print</span>(mysum)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم في مخطط الذاكرة</th>
<th>القيمة المرتبط بها</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>mysum</code></td>
<td><code>0</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-27-المجموع-التراكمي">الشريحة 27: المجموع التراكمي</h2>
<ul>
<li><code>mysum</code> متغير لتخزين المجموع التراكمي (Running Sum).</li>
<li>تجعل <code>range(10)</code> قيمة <code>i</code> تساوي <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم … ثم <code>9</code>.</li>
</ul>
<pre><code class="language-python">mysum = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    mysum += i
<span class="hljs-built_in">print</span>(mysum)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم في مخطط الذاكرة</th>
<th>القيم المعروضة</th>
<th>الارتباط الحالي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td><code>0</code>، <code>1</code></td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>mysum</code></td>
<td><code>0</code>، <code>1</code></td>
<td><code>1</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-28-المجموع-التراكمي">الشريحة 28: المجموع التراكمي</h2>
<ul>
<li><code>mysum</code> متغير لتخزين المجموع التراكمي (Running Sum).</li>
<li>تجعل <code>range(10)</code> قيمة <code>i</code> تساوي <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم … ثم <code>9</code>.</li>
</ul>
<pre><code class="language-python">mysum = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    mysum += i
<span class="hljs-built_in">print</span>(mysum)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم في مخطط الذاكرة</th>
<th>القيم المعروضة</th>
<th>الارتباط الحالي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td><code>0</code>، <code>1</code>، <code>2</code></td>
<td><code>2</code></td>
</tr>
<tr>
<td><code>mysum</code></td>
<td><code>1</code>، <code>3</code></td>
<td><code>3</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-29-المجموع-التراكمي">الشريحة 29: المجموع التراكمي</h2>
<ul>
<li><code>mysum</code> متغير لتخزين المجموع التراكمي (Running Sum).</li>
<li>تجعل <code>range(10)</code> قيمة <code>i</code> تساوي <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم … ثم <code>9</code>.</li>
</ul>
<pre><code class="language-python">mysum = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    mysum += i
<span class="hljs-built_in">print</span>(mysum)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم في مخطط الذاكرة</th>
<th>القيم المعروضة</th>
<th>الارتباط الحالي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td><code>0</code>، <code>1</code>، <code>2</code>، <code>3</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>mysum</code></td>
<td><code>3</code>، <code>6</code></td>
<td><code>6</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-30-المجموع-التراكمي">الشريحة 30: المجموع التراكمي</h2>
<ul>
<li><code>mysum</code> متغير لتخزين المجموع التراكمي (Running Sum).</li>
<li>تجعل <code>range(10)</code> قيمة <code>i</code> تساوي <code>0</code>، ثم <code>1</code>، ثم <code>2</code>، ثم … ثم <code>9</code>.</li>
</ul>
<pre><code class="language-python">mysum = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    mysum += i
<span class="hljs-built_in">print</span>(mysum)
</code></pre>
<table>
<thead>
<tr>
<th>الاسم في مخطط الذاكرة</th>
<th>القيم المعروضة</th>
<th>الارتباط الحالي</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td><code>0</code>، <code>1</code>، <code>2</code>، <code>3</code>، …، <code>9</code></td>
<td><code>9</code></td>
</tr>
<tr>
<td><code>mysum</code></td>
<td><code>36</code>، <code>45</code></td>
<td><code>45</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-31-جرب-بنفسك">الشريحة 31: جرّب بنفسك!</h2>
<ul>
<li>أصلح هذه الشيفرة لتستخدم المتغيرين <code>start</code> و<code>end</code> في النطاق، وتحصل على مجموع القيم بينهما بما يشمل الطرفين.</li>
<li>مثلًا، إذا كان <code>start=3</code> و<code>end=5</code>، فينبغي أن يكون المجموع <code>12</code>.</li>
</ul>
<pre><code class="language-python">mysum = <span class="hljs-number">0</span>
start = ??
end = ??
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(start, end):
       mysum += i
<span class="hljs-built_in">print</span>(mysum)
</code></pre>
<h2 id="الشريحة-32-حلقات-for-وrange">الشريحة 32: حلقات for وrange</h2>
<p>حساب المضروب باستخدام حلقة <code>while</code>، وقد رأيناه بالفعل، وباستخدام حلقة <code>for</code>.</p>
<pre><code class="language-python">x = <span class="hljs-number">4</span>
i = <span class="hljs-number">1</span>
factorial = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> i &lt;= x:
    factorial *= i
    i += <span class="hljs-number">1</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;<span class="hljs-subst">{x}</span> factorial is <span class="hljs-subst">{factorial}</span>’)
</span></code></pre>
<pre><code class="language-python">x = <span class="hljs-number">4</span>
factorial = <span class="hljs-number">1</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, x+<span class="hljs-number">1</span>, <span class="hljs-number">1</span>):
    factorial *= i
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;<span class="hljs-subst">{x}</span> factorial is <span class="hljs-subst">{factorial}</span>&#x27;</span>)
</code></pre>
<p><strong>ملاحظة المترجم:</strong> حُفظت علامة الاقتباس المنحنية <code>’</code> في نهاية سلسلة المثال الأول كما تظهر في الشريحة الأصلية؛ ليست علامة إغلاق صحيحة في Python. يستخدم ملف الشيفرة الأصلي علامة اقتباس مستقيمة، كما في النسخة الحرفية المرفقة بصفحة التمارين.</p>
<h2 id="الشريحة-33-الفكرة-الكبرى">الشريحة 33: الفكرة الكبرى</h2>
<p><strong>لا تتكرر حلقات <code>for</code> إلا بقدر طول التسلسل.</strong></p>
<p>يأخذ متغير الحلقة هذه القيم بالترتيب.</p>
<h2 id="الشريحة-34-ملخص">الشريحة 34: ملخص</h2>
<ul>
<li>آليات التكرار (Looping Mechanisms):
<ul>
<li>حلقات <code>while</code> و<code>for</code>.</li>
<li>تناولنا الكثير من قواعد الصياغة (Syntax) اليوم؛ احرص على الكثير من التدريب!</li>
</ul>
</li>
<li>حلقات <code>while</code>:
<ul>
<li>تتكرر ما دام الشرط صحيحًا.</li>
<li>يجب التأكد من عدم الدخول في حلقة لانهائية.</li>
</ul>
</li>
<li>حلقات <code>for</code>:
<ul>
<li>يمكنها المرور على نطاقات من الأعداد.</li>
<li>يمكنها المرور على عناصر سلسلة نصية.</li>
<li>سنرى قريبًا أشياء أخرى كثيرة يسهل المرور عليها بالتكرار.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-35-بيانات-mit-opencourseware">الشريحة 35: بيانات MIT OpenCourseWare</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python.</p>
<p>خريف 2022.</p>
<p>للحصول على معلومات عن الاستشهاد بهذه المواد أو شروط استخدامها، تفضل بزيارة https://ocw.mit.edu/terms.</p>
`,c={book:n,chapter:e,chapterTitle:s,slug:l,title:o,headings:t,html:a};export{n as book,e as chapter,s as chapterTitle,c as default,t as headings,a as html,l as slug,o as title};
