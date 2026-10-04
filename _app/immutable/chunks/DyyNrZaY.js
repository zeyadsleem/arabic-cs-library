const s="mit-6100l",n="lecture-13",a="المحاضرة 13: الاستثناءات (Exceptions) والتأكيدات (Assertions)",l="notes",e="المحاضرة 13: الاستثناءات والتأكيدات",t=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-عنوان-المحاضرة",text:"الشريحة 1: عنوان المحاضرة"},{depth:2,id:"الشريحة-2-عنوان-القسم-الاستثناءات-exceptions",text:"الشريحة 2: عنوان القسم — الاستثناءات (EXCEPTIONS)"},{depth:2,id:"الشريحة-3-الحالات-غير-المتوقعة-unexpected-conditions",text:"الشريحة 3: الحالات غير المتوقّعة (UNEXPECTED CONDITIONS)"},{depth:2,id:"الشريحة-4-معالجة-الاستثناءات-handling-exceptions",text:"الشريحة 4: معالجة الاستثناءات (HANDLING EXCEPTIONS)"},{depth:2,id:"الشريحة-5-مثال-على-شيفرة-رأيتها-من-قبل-example-with-code-you-might-have-already-seen",text:"الشريحة 5: مثال على شيفرة رأيتها من قبل (EXAMPLE with CODE YOU MIGHT HAVE ALREADY SEEN)"},{depth:2,id:"الشريحة-6-مدخلات-المستخدم-قد-تؤدي-إلى-استثناءات-user-input-can-lead-to-exceptions",text:"الشريحة 6: مدخلات المستخدم قد تؤدّي إلى استثناءات (USER INPUT CAN LEAD TO EXCEPTIONS)"},{depth:2,id:"الشريحة-7-معالجة-استثناءات-محددة-handling-specific-exceptions",text:"الشريحة 7: معالجة استثناءات محدّدة (HANDLING SPECIFIC EXCEPTIONS)"},{depth:2,id:"الشريحة-8-كتل-أخرى-مرتبطة-بكتلة-try-other-blocks-associated-with-a-try-block",text:"الشريحة 8: كتل أخرى مرتبطة بكتلة try (OTHER BLOCKS ASSOCIATED WITH A TRY BLOCK)"},{depth:2,id:"الشريحة-9-ماذا-نفعل-بالاستثناءات-what-to-do-with-exceptions",text:"الشريحة 9: ماذا نفعل بالاستثناءات؟ (WHAT TO DO WITH EXCEPTIONS?)"},{depth:2,id:"الشريحة-10-مثال-على-شيفرة-رأيتها-من-قبل-example-with-something-youve-already-seen",text:"الشريحة 10: مثال على شيفرة رأيتها من قبل (EXAMPLE with SOMETHING YOU’VE ALREADY SEEN)"},{depth:2,id:"الشريحة-11-جربها-بنفسك-you-try-it",text:"الشريحة 11: جربها بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-12-عنوان-القسم-التأكيدات-assertions",text:"الشريحة 12: عنوان القسم — التأكيدات (ASSERTIONS)"},{depth:2,id:"الشريحة-13-التأكيدات-أداة-برمجة-دفاعية-assertions-defensive-programming-tool",text:"الشريحة 13: التأكيدات: أداة برمجة دفاعية (ASSERTIONS: DEFENSIVE PROGRAMMING TOOL)"},{depth:2,id:"الشريحة-14-مثال-على-شيفرة-رأيتها-من-قبل-example-with-something-youve-already-seen",text:"الشريحة 14: مثال على شيفرة رأيتها من قبل (EXAMPLE with SOMETHING YOU’VE ALREADY SEEN)"},{depth:2,id:"الشريحة-15-جربها-بنفسك-you-try-it",text:"الشريحة 15: جربها بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-16-مثال-آخر-another-example",text:"الشريحة 16: مثال آخر (ANOTHER EXAMPLE)"},{depth:2,id:"الشريحة-17-مثال-أطول-على-الاستثناءات-والتأكيدات-longer-example-of-exceptions-and-assertions",text:"الشريحة 17: مثال أطول على الاستثناءات والتأكيدات (LONGER EXAMPLE OF EXCEPTIONS and ASSERTIONS)"},{depth:2,id:"الشريحة-18-الشيفرة-example-code",text:"الشريحة 18: الشيفرة (EXAMPLE CODE)"},{depth:2,id:"الشريحة-19-خطأ-إذا-لم-تكن-هناك-درجات-لطالبة-أو-طالب-error-if-no-grade-for-a-student",text:"الشريحة 19: خطأ إذا لم تكن هناك درجات لطالبة أو طالب (ERROR IF NO GRADE FOR A STUDENT)"},{depth:2,id:"الشريحة-20-الخيار-1-وسم-الخطأ-بطباعة-رسالة-option-1-flag-the-error-by-printing-a-message",text:"الشريحة 20: الخيار 1: وسم الخطأ بطباعة رسالة (OPTION 1: FLAG THE ERROR BY PRINTING A MESSAGE)"},{depth:2,id:"الشريحة-21-الخيار-2-تغيير-السياسة-option-2-change-the-policy",text:"الشريحة 21: الخيار 2: تغيير السياسة (OPTION 2: CHANGE THE POLICY)"},{depth:2,id:"الشريحة-22-الخيار-3-إيقاف-التنفيذ-إذا-لم-تتحقق-التأكيد-option-3-halt-execution-if-assert-is-not-met",text:"الشريحة 22: الخيار 3: إيقاف التنفيذ إذا لم تتحقّق التأكيد (OPTION 3: HALT EXECUTION IF ASSERT IS NOT MET)"},{depth:2,id:"الشريحة-23-التأكيدات-مقابل-الاستثناءات-assertions-vs-exceptions",text:"الشريحة 23: التأكيدات مقابل الاستثناءات (ASSERTIONS vs. EXCEPTIONS)"},{depth:2,id:"الشريحة-24-mit-opencourseware",text:"الشريحة 24: MIT OpenCourseWare"}],p=`<h1>المحاضرة 13: الاستثناءات (Exceptions) والتأكيدات (Assertions)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:</p>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة الرسمية على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-13-exceptions-assertions/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-13-exceptions-assertions/</a></li>
<li>الشرائح (ملف PDF): <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13_pdf/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13_pdf/</a> — والملف المباشر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13.pdf">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13.pdf</a></li>
<li>ملفات الشيفرة للتمرين: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13_code_py/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13_code_py/</a></li>
<li>النص الكامل (Transcript) للمحاضرة على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13/</a></li>
<li>رخصة CC BY-NC-SA 4.0: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">https://creativecommons.org/licenses/by-nc-sa/4.0/</a></li>
<li>شروط الاستخدام في MIT OCW: <a href="https://ocw.mit.edu/terms/">https://ocw.mit.edu/terms/</a></li>
</ul>
<p><strong>منهج الترجمة:</strong> عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (24 شريحة)، مع إبقاء الشيفرة والتوثيق (docstrings) كما هي بالإنجليزية. المواضع التي يعرض فيها النص المستخرَج عمودين متجاورين (الشيفرة «قبل» والشيفرة «بعد») نُقلت إلى كتلتين منفصلتين. الأشكال والمخططات لم تُضمَّن.</p>
<h2 id="الشريحة-1-عنوان-المحاضرة">الشريحة 1: عنوان المحاضرة</h2>
<ul>
<li>EXCEPTIONS, ASSERTIONS</li>
<li>(download slides and .py files to follow along)</li>
<li>6.100L Lecture 13 — Ana Bell</li>
</ul>
<h2 id="الشريحة-2-عنوان-القسم-الاستثناءات-exceptions">الشريحة 2: عنوان القسم — الاستثناءات (EXCEPTIONS)</h2>
<p>شريحة عنوان للقسم الأول.</p>
<h2 id="الشريحة-3-الحالات-غير-المتوقعة-unexpected-conditions">الشريحة 3: الحالات غير المتوقّعة (UNEXPECTED CONDITIONS)</h2>
<ul>
<li>ماذا يحدث عندما يصطدم تنفيذ إجراء (procedure) بحالة غير متوقّعة؟</li>
<li>تحصل على <strong>استثناء (exception)</strong>… أي حالة لم تكن متوقّعة:</li>
</ul>
<pre><code class="language-python">test = [<span class="hljs-number">1</span>,<span class="hljs-number">7</span>,<span class="hljs-number">4</span>]
test[<span class="hljs-number">4</span>]
</code></pre>
<p>← <code>IndexError</code></p>
<pre><code class="language-python"><span class="hljs-built_in">int</span>(test)
</code></pre>
<p>← <code>TypeError</code></p>
<pre><code class="language-python">a
</code></pre>
<p>← <code>NameError</code></p>
<pre><code class="language-python"><span class="hljs-string">&#x27;a&#x27;</span>/<span class="hljs-number">4</span>
</code></pre>
<p>← <code>TypeError</code></p>
<ul>
<li>الحالات الأربع ناتجة عن:
<ul>
<li>محاولة الوصول إلى ما وراء حدود القائمة.</li>
<li>محاولة تحويل نوع غير مناسب.</li>
<li>الإشارة إلى متغيّر غير موجود.</li>
<li>الخلط بين أنواع البيانات دون تحويل (coercion).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-4-معالجة-الاستثناءات-handling-exceptions">الشريحة 4: معالجة الاستثناءات (HANDLING EXCEPTIONS)</h2>
<ul>
<li>عادةً ما يؤدّي الاستثناء إلى حدوث خطأ وتوقّف التنفيذ.</li>
<li>يمكن لشيفرة Python أن توفّر <strong>معالجات (handlers)</strong> للاستثناءات:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    <span class="hljs-comment"># do some potentially</span>
    <span class="hljs-comment"># problematic code</span>
<span class="hljs-keyword">except</span>:
    <span class="hljs-comment"># do something to</span>
    <span class="hljs-comment"># handle the problem</span>
</code></pre>
<p>وهو مقابل بنية <code>if/else</code> المعتادة:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> &lt;<span class="hljs-built_in">all</span> potentially problematic code succeeds&gt;:
    <span class="hljs-comment"># great, all that code</span>
    <span class="hljs-comment"># just ran fine!</span>
<span class="hljs-keyword">else</span>:
    <span class="hljs-comment"># do something to</span>
    <span class="hljs-comment"># handle the problem</span>
</code></pre>
<ul>
<li>إذا نجحت كل التعابير داخل كتلة <code>try</code>:
<ul>
<li>يستمرّ التقييم بالشيفرة التي تأتي <strong>بعد</strong> كتلة <code>except</code>.</li>
</ul>
</li>
<li>الاستثناءات التي ترفعها أي عبارة (statement) في جسم <code>try</code> تتولّاها عبارة <code>except</code>:
<ul>
<li>يستمرّ التنفيذ بجسم عبارة <code>except</code>،</li>
<li>ثم تُنفَّذ التعابير الأخرى بعد تلك الكتلة من الشيفرة.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-5-مثال-على-شيفرة-رأيتها-من-قبل-example-with-code-you-might-have-already-seen">الشريحة 5: مثال على شيفرة رأيتها من قبل (EXAMPLE with CODE YOU MIGHT HAVE ALREADY SEEN)</h2>
<ul>
<li>دالة تجمع أرقام (digits) في سلسلة (string).</li>
<li>تُعرض الشيفرة مرّتين: أولًا كما رأيناها من قبل، ثم بعد إضافة الاستثناءات.</li>
</ul>
<p><strong>أولًا: الشيفرة كما رأيناها من قبل:</strong></p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_digits</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a non-empty string
        containing digits.
        Returns sum of all chars that
        are digits &quot;&quot;&quot;</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> char <span class="hljs-keyword">in</span> s:
        <span class="hljs-keyword">if</span> char <span class="hljs-keyword">in</span> <span class="hljs-string">&#x27;0123456789&#x27;</span>:
            val = <span class="hljs-built_in">int</span>(char)
            total += val
    <span class="hljs-keyword">return</span> total
</code></pre>
<p><strong>ثانيًا: الشيفرة مع الاستثناءات:</strong></p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_digits</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a non-empty string
        containing digits.
        Returns sum of all chars that
        are digits &quot;&quot;&quot;</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> char <span class="hljs-keyword">in</span> s:
        <span class="hljs-keyword">try</span>:
            val = <span class="hljs-built_in">int</span>(char)
            total += val
        <span class="hljs-keyword">except</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;can&#x27;t convert&quot;</span>, char)
    <span class="hljs-keyword">return</span> total
</code></pre>
<h2 id="الشريحة-6-مدخلات-المستخدم-قد-تؤدي-إلى-استثناءات-user-input-can-lead-to-exceptions">الشريحة 6: مدخلات المستخدم قد تؤدّي إلى استثناءات (USER INPUT CAN LEAD TO EXCEPTIONS)</h2>
<ul>
<li>قد يُدخل المستخدم حرفًا <code>:(</code> — أو قد يجعل <code>b</code> يساوي صفرًا <code>:(</code>:</li>
</ul>
<pre><code class="language-python">a = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Tell me one number:&quot;</span>))
b = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Tell me another number:&quot;</span>))
<span class="hljs-built_in">print</span>(a/b)
</code></pre>
<ul>
<li>الحل: استخدم <code>try/except</code> حول الشيفرة المُعطِّلة:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    a = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Tell me one number:&quot;</span>))
    b = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Tell me another number:&quot;</span>))
    <span class="hljs-built_in">print</span>(a/b)
<span class="hljs-keyword">except</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Bug in user input.&quot;</span>)
</code></pre>
<h2 id="الشريحة-7-معالجة-استثناءات-محددة-handling-specific-exceptions">الشريحة 7: معالجة استثناءات محدّدة (HANDLING SPECIFIC EXCEPTIONS)</h2>
<ul>
<li>اجعل لكل نوع من الاستثناءات عبارة <code>except</code> منفصلة:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    a = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Tell me one number: &quot;</span>))
    b = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Tell me another number: &quot;</span>))
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a/b = &quot;</span>, a/b)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a+b = &quot;</span>, a+b)
<span class="hljs-keyword">except</span> ValueError:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Could not convert to a number.&quot;</span>)
<span class="hljs-keyword">except</span> ZeroDivisionError:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Can&#x27;t divide by zero&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a/b = infinity&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a+b =&quot;</span>, a+b)
<span class="hljs-keyword">except</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went very wrong.&quot;</span>)
</code></pre>
<p>انتبه إلى أن <code>print(&quot;a+b =&quot;, a+b)</code> مكرّر مرّتين: مرّة داخل جسم معالج <code>ValueError</code> (لأن جمع <code>a+b</code> هو ما يمكن أن يفشل في التحويل)، ومرّة داخل جسم معالج <code>ZeroDivisionError</code> (لأن القسمة وحدها هي التي تفشل عند القسمة على صفر، بينما يظل الجمع صحيحًا).</p>
<h2 id="الشريحة-8-كتل-أخرى-مرتبطة-بكتلة-try-other-blocks-associated-with-a-try-block">الشريحة 8: كتل أخرى مرتبطة بكتلة <code>try</code> (OTHER BLOCKS ASSOCIATED WITH A TRY BLOCK)</h2>
<ul>
<li><code>else</code>:
<ul>
<li>يُنفَّذ جسمها عندما يكتمل تنفيذ جسم <code>try</code> المرتبط بها <strong>دون أي استثناء</strong>.</li>
</ul>
</li>
<li><code>finally</code>:
<ul>
<li>يُنفَّذ جسمها <strong>دائمًا</strong> بعد عبارات <code>try</code> و<code>else</code> و<code>except</code>، حتى لو رفعت هي نفسها خطأً آخر أو نفّذت <code>break</code> أو <code>continue</code> أو <code>return</code>.</li>
<li>مفيدة لشيفرة التنظيف (clean-up) التي يجب أن تعمل مهما حدث شيء آخر (مثل إغلاق ملف).</li>
</ul>
</li>
<li>من المفيد أن تعرف أنها موجودة، لكننا لا نستخدمها فعليًا في هذه المادة.</li>
</ul>
<h2 id="الشريحة-9-ماذا-نفعل-بالاستثناءات-what-to-do-with-exceptions">الشريحة 9: ماذا نفعل بالاستثناءات؟ (WHAT TO DO WITH EXCEPTIONS?)</h2>
<ul>
<li>ماذا نفعل عندما نواجه خطأً؟</li>
<li><strong>الفشل صامتًا (Fail silently)</strong>:
<ul>
<li>استبدل بقيم افتراضية أو تابع فقط.</li>
<li>فكرة سيّئة! المستخدم لا يحصل على أي تحذير.</li>
</ul>
</li>
<li><strong>إعادة قيمة «خطأ» (Return an &quot;error&quot; value)</strong>:
<ul>
<li>أي قيمة نختار؟</li>
<li>يُعقّب الشيفرة لأنها يجب أن تتحقّق من قيمة خاصة.</li>
</ul>
</li>
<li><strong>إيقاف التنفيذ، والإشارة إلى حالة الخطأ (Stop execution, signal error condition)</strong>:
<ul>
<li>في Python: ارفع استثناءً (raise an exception).</li>
</ul>
</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;something is wrong&quot;</span>)
</code></pre>
<h2 id="الشريحة-10-مثال-على-شيفرة-رأيتها-من-قبل-example-with-something-youve-already-seen">الشريحة 10: مثال على شيفرة رأيتها من قبل (EXAMPLE with SOMETHING YOU’VE ALREADY SEEN)</h2>
<ul>
<li>دالة تجمع أرقامًا (digits) في سلسلة (string).</li>
<li>إيقاف التنفيذ يعني أن النتيجة السيّئة لا تنتشر (are not propagated).</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_digits</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a non-empty string containing digits.
    Returns sum of all chars that are digits &quot;&quot;&quot;</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> char <span class="hljs-keyword">in</span> s:
        <span class="hljs-keyword">try</span>:
            val = <span class="hljs-built_in">int</span>(char)
            total += val
        <span class="hljs-keyword">except</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;string contained a character&quot;</span>)
    <span class="hljs-keyword">return</span> total
</code></pre>
<h2 id="الشريحة-11-جربها-بنفسك-you-try-it">الشريحة 11: جربها بنفسك! (YOU TRY IT!)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">pairwise_div</span>(<span class="hljs-params">Lnum, Ldenom</span>):
    <span class="hljs-string">&quot;&quot;&quot; Lnum and Ldenom are non-empty lists of equal lengths containing numbers
    Returns a new list whose elements are the pairwise
    division of an element in Lnum by an element in Ldenom.
    Raise a ValueError if Ldenom contains 0. &quot;&quot;&quot;</span>
    <span class="hljs-comment"># your code here</span>

<span class="hljs-comment"># For example:</span>
L1 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
L2 = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="hljs-comment"># print(pairwise_div(L1, L2))</span>

<span class="hljs-comment"># prints [4.0,2.5,2.0]</span>

L1 = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]
L2 = [<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">3</span>]
<span class="hljs-comment"># print(pairwise_div(L1, L2))</span>

<span class="hljs-comment"># raises a ValueError</span>
</code></pre>
<h2 id="الشريحة-12-عنوان-القسم-التأكيدات-assertions">الشريحة 12: عنوان القسم — التأكيدات (ASSERTIONS)</h2>
<p>شريحة عنوان للقسم الثاني.</p>
<h2 id="الشريحة-13-التأكيدات-أداة-برمجة-دفاعية-assertions-defensive-programming-tool">الشريحة 13: التأكيدات: أداة برمجة دفاعية (ASSERTIONS: DEFENSIVE PROGRAMMING TOOL)</h2>
<ul>
<li>نريد التأكّد من أن الافتراضات حول حالة الحساب (state of computation) كما هو متوقّع.</li>
<li>استخدم عبارة <code>assert</code> لترفع استثناء <code>AssertionError</code> إذا لم تتحقّق الافتراضات:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">assert</span> &lt;statement that should be true&gt;, <span class="hljs-string">&quot;message if not true&quot;</span>
</code></pre>
<ul>
<li>هذا مثال على برمجة دفاعية جيدة.</li>
<li>التأكيدات لا تسمح للمبرمج بالتحكّم في الاستجابة للحالات غير المتوقّعة.</li>
<li>تأكّد من أن التنفيذ يتوقّف كلما لم تتحقّق حالة متوقّعة.</li>
<li>تُستخدم عادةً للتحقّق من مداخل الدوال، لكن يمكن استخدامها في أي مكان.</li>
<li>يمكن استخدامها للتحقّق من مخرجات الدالة تفاديًا لانتشار قيم سيّئة.</li>
<li>يمكن أن تجعل تحديد مصدر الخطأ (bug) أسهل.</li>
</ul>
<h2 id="الشريحة-14-مثال-على-شيفرة-رأيتها-من-قبل-example-with-something-youve-already-seen">الشريحة 14: مثال على شيفرة رأيتها من قبل (EXAMPLE with SOMETHING YOU’VE ALREADY SEEN)</h2>
<ul>
<li>دالة تجمع أرقامًا في سلسلة <strong>غير فارغة</strong> (NON-EMPTY).</li>
<li>إيقاف التنفيذ يعني أن النتيجة السيّئة لا تنتشر.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_digits</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a non-empty string containing digits.
    Returns sum of all chars that are digits &quot;&quot;&quot;</span>
    <span class="hljs-keyword">assert</span> <span class="hljs-built_in">len</span>(s) != <span class="hljs-number">0</span>, <span class="hljs-string">&quot;s is empty&quot;</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> char <span class="hljs-keyword">in</span> s:
        <span class="hljs-keyword">try</span>:
            val = <span class="hljs-built_in">int</span>(char)
            total += val
        <span class="hljs-keyword">except</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;string contained a character&quot;</span>)
</code></pre>
<h2 id="الشريحة-15-جربها-بنفسك-you-try-it">الشريحة 15: جربها بنفسك! (YOU TRY IT!)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">pairwise_div</span>(<span class="hljs-params">Lnum, Ldenom</span>):
    <span class="hljs-string">&quot;&quot;&quot; Lnum and Ldenom are non-empty lists of equal lengths
    containing numbers
    Returns a new list whose elements are the pairwise
    division of an element in Lnum by an element in Ldenom.
    Raise a ValueError if Ldenom contains 0. &quot;&quot;&quot;</span>
    <span class="hljs-comment"># add an assert line here</span>
</code></pre>
<h2 id="الشريحة-16-مثال-آخر-another-example">الشريحة 16: مثال آخر (ANOTHER EXAMPLE)</h2>
<p>شريحة عنوان قصيرة تمهّد للمثال الطويل التالي. لم تُضمَّن صورتها.</p>
<h2 id="الشريحة-17-مثال-أطول-على-الاستثناءات-والتأكيدات-longer-example-of-exceptions-and-assertions">الشريحة 17: مثال أطول على الاستثناءات والتأكيدات (LONGER EXAMPLE OF EXCEPTIONS and ASSERTIONS)</h2>
<ul>
<li>نفترض أننا أعطينا <strong>قائمة فصل</strong> (class list) لمادة دراسية: كل مُدخَل فيها قائمة من جزأين:
<ul>
<li>قائمة من الاسم الأول واسم العائلة لطالبة أو طالب.</li>
<li>قائمة من درجات الواجبات.</li>
</ul>
</li>
<li>سننشئ قائمة فصل جديدة، يُضاف فيها <strong>المتوسّط (average)</strong> في النهاية.</li>
</ul>
<p>الشيفرة التي ستُعالَج:</p>
<pre><code class="language-python">test_grades = [[[<span class="hljs-string">&#x27;peter&#x27;</span>, <span class="hljs-string">&#x27;parker&#x27;</span>], [<span class="hljs-number">80.0</span>, <span class="hljs-number">70.0</span>, <span class="hljs-number">85.0</span>]],
               [[<span class="hljs-string">&#x27;bruce&#x27;</span>, <span class="hljs-string">&#x27;wayne&#x27;</span>], [<span class="hljs-number">100.0</span>, <span class="hljs-number">80.0</span>, <span class="hljs-number">74.0</span>]]]
</code></pre>
<p>والنتيجة المطلوبة:</p>
<pre><code class="language-python">[[<span class="hljs-string">&#x27;peter&#x27;</span>, <span class="hljs-string">&#x27;parker&#x27;</span>], [<span class="hljs-number">80.0</span>, <span class="hljs-number">70.0</span>, <span class="hljs-number">85.0</span>], <span class="hljs-number">78.33333</span>],
[[<span class="hljs-string">&#x27;bruce&#x27;</span>, <span class="hljs-string">&#x27;wayne&#x27;</span>], [<span class="hljs-number">100.0</span>, <span class="hljs-number">80.0</span>, <span class="hljs-number">74.0</span>], <span class="hljs-number">84.666667</span>]
</code></pre>
<h2 id="الشريحة-18-الشيفرة-example-code">الشريحة 18: الشيفرة (EXAMPLE CODE)</h2>
<pre><code class="language-python">test_grades = [[[<span class="hljs-string">&#x27;peter&#x27;</span>, <span class="hljs-string">&#x27;parker&#x27;</span>], [<span class="hljs-number">80.0</span>, <span class="hljs-number">70.0</span>, <span class="hljs-number">85.0</span>]],
               [[<span class="hljs-string">&#x27;bruce&#x27;</span>, <span class="hljs-string">&#x27;wayne&#x27;</span>], [<span class="hljs-number">100.0</span>, <span class="hljs-number">80.0</span>, <span class="hljs-number">74.0</span>]]]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_stats</span>(<span class="hljs-params">class_list</span>):
    new_stats = []
    <span class="hljs-keyword">for</span> stu <span class="hljs-keyword">in</span> class_list:
        new_stats.append([stu[<span class="hljs-number">0</span>], stu[<span class="hljs-number">1</span>], avg(stu[<span class="hljs-number">1</span>])])
    <span class="hljs-keyword">return</span> new_stats

<span class="hljs-keyword">def</span> <span class="hljs-title function_">avg</span>(<span class="hljs-params">grades</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>(grades)/<span class="hljs-built_in">len</span>(grades)
</code></pre>
<h2 id="الشريحة-19-خطأ-إذا-لم-تكن-هناك-درجات-لطالبة-أو-طالب-error-if-no-grade-for-a-student">الشريحة 19: خطأ إذا لم تكن هناك درجات لطالبة أو طالب (ERROR IF NO GRADE FOR A STUDENT)</h2>
<ul>
<li>إذا كان أحد الطلبة (أو أكثر) لا يملك أي درجات، نحصل على خطأ:</li>
</ul>
<pre><code class="language-python">test_grades = [[[<span class="hljs-string">&#x27;peter&#x27;</span>, <span class="hljs-string">&#x27;parker&#x27;</span>], [<span class="hljs-number">10.0</span>,<span class="hljs-number">55.0</span>,<span class="hljs-number">85.0</span>]],
               [[<span class="hljs-string">&#x27;bruce&#x27;</span>, <span class="hljs-string">&#x27;wayne&#x27;</span>], [<span class="hljs-number">10.0</span>,<span class="hljs-number">80.0</span>,<span class="hljs-number">75.0</span>]],
               [[<span class="hljs-string">&#x27;captain&#x27;</span>, <span class="hljs-string">&#x27;america&#x27;</span>], [<span class="hljs-number">80.0</span>,<span class="hljs-number">10.0</span>,<span class="hljs-number">96.0</span>]],
               [[<span class="hljs-string">&#x27;deadpool&#x27;</span>], []]]
</code></pre>
<ul>
<li>نحصل على <code>ZeroDivisionError: float division by zero</code>، لأننا نحاول تنفيذ <code>return sum(grades)/len(grades)</code> والمقام يساوي صفرًا.</li>
</ul>
<h2 id="الشريحة-20-الخيار-1-وسم-الخطأ-بطباعة-رسالة-option-1-flag-the-error-by-printing-a-message">الشريحة 20: الخيار 1: وسم الخطأ بطباعة رسالة (OPTION 1: FLAG THE ERROR BY PRINTING A MESSAGE)</h2>
<ul>
<li>نقرّر أن نُشعر بأن شيئًا ما حدث خطأ برسالة (msg):</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">avg</span>(<span class="hljs-params">grades</span>):
    <span class="hljs-keyword">try</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>(grades)/<span class="hljs-built_in">len</span>(grades)
    <span class="hljs-keyword">except</span> ZeroDivisionError:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;warning: no grades data&#x27;</span>)
</code></pre>
<ul>
<li>التشغيل على بيانات الاختبار نفسها يُعطي:</li>
</ul>
<pre><code class="language-text">warning: no grades data
[[&#x27;peter&#x27;, &#x27;parker&#x27;], [10.0, 55.0, 85.0], 50.0],
[[&#x27;bruce&#x27;, &#x27;wayne&#x27;], [10.0, 80.0, 75.0], 55.0],
[[&#x27;captain&#x27;, &#x27;america&#x27;], [80.0, 10.0, 96.0], 62.0],
[[&#x27;deadpool&#x27;], [], None]]
</code></pre>
<p>لاحظ أن الخانة الأخيرة صارت <code>None</code>: لأن الدالة <code>avg</code> لا تحتوي على <code>return</code> في حالة الاستثناء، وإلا فإنها تعيد <code>None</code> تلقائيًا.</p>
<h2 id="الشريحة-21-الخيار-2-تغيير-السياسة-option-2-change-the-policy">الشريحة 21: الخيار 2: تغيير السياسة (OPTION 2: CHANGE THE POLICY)</h2>
<ul>
<li>نقرّر أن من لا توجد له درجات يحصل على صفر:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">avg</span>(<span class="hljs-params">grades</span>):
    <span class="hljs-keyword">try</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>(grades)/<span class="hljs-built_in">len</span>(grades)
    <span class="hljs-keyword">except</span> ZeroDivisionError:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;warning: no grades data&#x27;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-number">0.0</span>
</code></pre>
<ul>
<li>التشغيل على بيانات الاختبار نفسها يُعطي:</li>
</ul>
<pre><code class="language-text">warning: no grades data
[[&#x27;peter&#x27;, &#x27;parker&#x27;], [10.0, 55.0, 85.0], 50.0],
[[&#x27;bruce&#x27;, &#x27;wayne&#x27;], [10.0, 80.0, 75.0], 55.0],
[[&#x27;captain&#x27;, &#x27;america&#x27;], [80.0, 10.0, 96.0], 62],
[[&#x27;deadpool&#x27;], [], 0.0]]
</code></pre>
<p><strong>ملاحظة المترجم:</strong> في النص الأصلي للشرائح ظهر <code>62</code> في العمود الثالث بينما ظهر <code>62.0</code> في الشريحة السابقة؛ والقيمتان متساويتان عدديًا، والفرق في طريقة العرض لا في المعنى.</p>
<h2 id="الشريحة-22-الخيار-3-إيقاف-التنفيذ-إذا-لم-تتحقق-التأكيد-option-3-halt-execution-if-assert-is-not-met">الشريحة 22: الخيار 3: إيقاف التنفيذ إذا لم تتحقّق التأكيد (OPTION 3: HALT EXECUTION IF ASSERT IS NOT MET)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">avg</span>(<span class="hljs-params">grades</span>):
    <span class="hljs-keyword">assert</span> <span class="hljs-built_in">len</span>(grades) != <span class="hljs-number">0</span>, <span class="hljs-string">&#x27;no grades data&#x27;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>(grades)/<span class="hljs-built_in">len</span>(grades)
</code></pre>
<ul>
<li>يرفع <code>AssertionError</code> إذا أعطي قائمة فارغة، ويطبع نص الرسالة، ويوقف التنفيذ.</li>
<li>وفي غير هذه الحالة يعمل كالمعتاد.</li>
</ul>
<h2 id="الشريحة-23-التأكيدات-مقابل-الاستثناءات-assertions-vs-exceptions">الشريحة 23: التأكيدات مقابل الاستثناءات (ASSERTIONS vs. EXCEPTIONS)</h2>
<ul>
<li>الهدف هو اكتشاف الأخطاء (bugs) بمجرّد ظهورها، وجعل موضع حدوثها واضحًا.</li>
<li><strong>الاستثناءات (Exceptions)</strong> توفّر وسيلة لمعالجة المدخلات غير المتوقّعة:
<ul>
<li>استخدمها حين لا تحتاج إلى إيقاف تنفيذ البرنامج.</li>
<li>ارفع استثناءً إذا زوّد المستخدم ببيانات إدخال سيّئة.</li>
</ul>
</li>
<li><strong>التأكيدات (Assertions)</strong>:
<ul>
<li>تفرض شروطًا على «عقد» (contract) بين المبرمج والمستخدم.</li>
<li>مُكمّل للاختبار (testing).</li>
<li>للتحقّق من أنواع الوسائط أو القيم.</li>
<li>للتحقّق من تحقّق ثوابت (invariants) بنى البيانات.</li>
<li>للتحقّق من قيود قيم الإرجاع.</li>
<li>للتحقّق من مخالفة قيود الإجراء (مثل: لا تكرارات في قائمة).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-24-mit-opencourseware">الشريحة 24: MIT OpenCourseWare</h2>
<p>شريحة الختام: شعار MIT OpenCourseWare مع الروابط الرسمية:</p>
<ul>
<li><a href="https://ocw.mit.edu">https://ocw.mit.edu</a></li>
<li>6.100L Introduction to Computer Science and Programming Using Python — Fall 2022</li>
<li>للاستفسار عن كيفية الاستشهاد بهذه المواد أو عن شروط الاستخدام، زر <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,p as html,l as slug,e as title};
