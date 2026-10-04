const n="mit-6100l",t="lecture-08",d="المحاضرة 8: الدوال ككائنات",e="notes",s="المحاضرة 8: الدوال ككائنات (Functions as Objects)",o=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-الدوال-ككائنات-functions-as-objects",text:"الشريحة 1: الدوال ككائنات (Functions as Objects)"},{depth:2,id:"الشريحة-2-الدالة-من-المحاضرة-السابقة-function-from-last-lecture",text:"الشريحة 2: الدالة من المحاضرة السابقة (Function from last lecture)"},{depth:2,id:"الشريحة-3-ماذا-لو-لم-تكن-هناك-الكلمة-المفتاحية-return-what-if-there-is-no-return-keyword",text:"الشريحة 3: ماذا لو لم تكن هناك الكلمة المفتاحية return؟ (What if there is no return keyword)"},{depth:2,id:"الشريحة-4-إضافة-return-none-صراحة",text:"الشريحة 4: إضافة return None صراحةً"},{depth:2,id:"الشريحة-5-جرب-بنفسك-you-try-it",text:"الشريحة 5: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-6-print-مقابل-return",text:"الشريحة 6: print مقابل return"},{depth:2,id:"الشريحة-7-جرب-بنفسك-أصلح-الدالة-you-try-it",text:"الشريحة 7: جرّب بنفسك! — أصلح الدالة (YOU TRY IT!)"},{depth:2,id:"الشريحة-8-الدوال-تدعم-التعدد-الوحداتي-modularity",text:"الشريحة 8: الدوال تدعم التعدُّد الوحداتي (Modularity)"},{depth:2,id:"الشريحة-9-استدعها-بقيم-مختلفة",text:"الشريحة 9: استدعِها بقيم مختلفة"},{depth:2,id:"الشريحة-10-جرب-بنفسك-you-try-it",text:"الشريحة 10: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-11-التكبير-zooming-out-هذا-صندوقي-الأسود",text:"الشريحة 11: التكبير (ZOOMING OUT) — هذا صندوقي الأسود"},{depth:2,id:"الشريحة-12-التكبير-zooming-out",text:"الشريحة 12: التكبير (ZOOMING OUT)"},{depth:2,id:"الشريحة-13-التكبير-zooming-out",text:"الشريحة 13: التكبير (ZOOMING OUT)"},{depth:2,id:"الشريحة-14-نطاق-الدالة-function-scope",text:"الشريحة 14: نطاق الدالة (Function Scope)"},{depth:2,id:"الشريحة-15-فهم-استدعاءات-الدوال-understanding-function-calls",text:"الشريحة 15: فهم استدعاءات الدوال (Understanding Function Calls)"},{depth:2,id:"الشريحة-16-البيئات-environments",text:"الشريحة 16: البيئات (Environments)"},{depth:2,id:"الشريحة-17-نطاق-المتغيرات-variable-scope",text:"الشريحة 17: نطاق المتغيّرات (Variable Scope)"},{depth:2,id:"الشريحة-18-نطاق-المتغيرات-بعد-تقييم-def",text:"الشريحة 18: نطاق المتغيّرات — بعد تقييم def"},{depth:2,id:"الشريحة-19-نطاق-المتغيرات-بعد-تنفيذ-أول-إسناد",text:"الشريحة 19: نطاق المتغيّرات — بعد تنفيذ أول إسناد"},{depth:2,id:"الشريحة-20-نطاق-المتغيرات-بعد-استدعاء-f",text:"الشريحة 20: نطاق المتغيّرات — بعد استدعاء f"},{depth:2,id:"الشريحة-21-نطاق-المتغيرات-بعد-استدعاء-f-مع-المتغير-y",text:"الشريحة 21: نطاق المتغيّرات — بعد استدعاء f مع المتغيّر y"},{depth:2,id:"الشريحة-22-نطاق-المتغيرات-تقييم-جسم-f-في-نطاق-f",text:"الشريحة 22: نطاق المتغيّرات — تقييم جسم f في نطاق f"},{depth:2,id:"الشريحة-23-نطاق-المتغيرات-أثناء-return",text:"الشريحة 23: نطاق المتغيّرات — أثناء return"},{depth:2,id:"الشريحة-24-نطاق-المتغيرات-بعد-تنفيذ-الإسناد-الثاني",text:"الشريحة 24: نطاق المتغيّرات — بعد تنفيذ الإسناد الثاني"},{depth:2,id:"الشريحة-25-الفكرة-الكبرى-big-idea",text:"الشريحة 25: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-26-مثال-آخر-على-النطاق-another-scope-example",text:"الشريحة 26: مثال آخر على النطاق (Another Scope Example)"},{depth:2,id:"الشريحة-27-الدوال-كوسائط-functions-as-arguments",text:"الشريحة 27: الدوال كوسائط (Functions as Arguments)"},{depth:2,id:"الشريحة-28-الإجراءات-من-الرتبة-العليا-higher-order-procedures",text:"الشريحة 28: الإجراءات من الرتبة العليا (Higher Order Procedures)"},{depth:2,id:"الشريحة-29-الكائنات-في-البرنامج-objects-in-a-program",text:"الشريحة 29: الكائنات في البرنامج (Objects in a Program)"},{depth:2,id:"الشريحة-30-الفكرة-الكبرى-big-idea",text:"الشريحة 30: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-31-دالة-كمعامل-function-as-a-parameter",text:"الشريحة 31: دالة كمعامل (Function as a Parameter)"},{depth:2,id:"الشريحة-32-نفذ-الشيفرة-خطوة-بخطوة-step-through-the-code",text:"الشريحة 32: نفّذ الشيفرة خطوة بخطوة (Step through the code)"},{depth:2,id:"الشريحة-33-أنشئ-نطاق-calc-create-calc-scope",text:"الشريحة 33: أنشئ نطاق calc (Create calc scope)"},{depth:2,id:"الشريحة-34-طابق-المعاملات-الصورية-في-calc-match-formal-params-in-calc",text:"الشريحة 34: طابِق المعاملات الصورية في calc (Match formal params in calc)"},{depth:2,id:"الشريحة-35-السطر-الأول-والوحيد-في-calc",text:"الشريحة 35: السطر الأول والوحيد في calc"},{depth:2,id:"الشريحة-36-أنشئ-نطاق-add-create-scope-of-add",text:"الشريحة 36: أنشئ نطاق add (Create scope of add)"},{depth:2,id:"الشريحة-37-طابق-المعاملات-الصورية-في-add-match-formal-params-in-add",text:"الشريحة 37: طابِق المعاملات الصورية في add (Match formal params in add)"},{depth:2,id:"الشريحة-38-نفذ-سطر-add",text:"الشريحة 38: نفّذ سطر add"},{depth:2,id:"الشريحة-39-استبدل-استدعاء-الدالة-بقيمة-return-replace-func-call-with-return",text:"الشريحة 39: استبدل استدعاء الدالة بقيمة return (Replace func call with return)"},{depth:2,id:"الشريحة-40-نفذ-سطر-calc",text:"الشريحة 40: نفّذ سطر calc"},{depth:2,id:"الشريحة-41-استبدل-استدعاء-الدالة-بقيمة-return",text:"الشريحة 41: استبدل استدعاء الدالة بقيمة return"},{depth:2,id:"الشريحة-42-جرب-بنفسك-you-try-it",text:"الشريحة 42: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-43-مثال-آخر-الدوال-كمعاملات-another-example-functions-as-params",text:"الشريحة 43: مثال آخر — الدوال كمعاملات (Another Example: Functions as Params)"},{depth:2,id:"الشريحة-44-الدوال-كمعاملات-النطاق-العام-functions-as-parameters",text:"الشريحة 44: الدوال كمعاملات — النطاق العام (Functions as Parameters)"},{depth:2,id:"الشريحة-45-الدوال-كمعاملات-نطاق-funca",text:"الشريحة 45: الدوال كمعاملات — نطاق func_a"},{depth:2,id:"الشريحة-46-الدوال-كمعاملات-إكمال-تنفيذ-printfunca",text:"الشريحة 46: الدوال كمعاملات — إكمال تنفيذ print(func_a())"},{depth:2,id:"الشريحة-47-الدوال-كمعاملات-نطاق-funcb",text:"الشريحة 47: الدوال كمعاملات — نطاق func_b"},{depth:2,id:"الشريحة-48-الدوال-كمعاملات-تنفيذ-جسم-funcb",text:"الشريحة 48: الدوال كمعاملات — تنفيذ جسم func_b"},{depth:2,id:"الشريحة-49-الدوال-كمعاملات-funcb-ترجع",text:"الشريحة 49: الدوال كمعاملات — func_b تُرجِع"},{depth:2,id:"الشريحة-50-الدوال-كمعاملات-إكمال-السطر",text:"الشريحة 50: الدوال كمعاملات — إكمال السطر"},{depth:2,id:"الشريحة-51-الدوال-كمعاملات-نطاق-funcc",text:"الشريحة 51: الدوال كمعاملات — نطاق func_c"},{depth:2,id:"الشريحة-52-الدوال-كمعاملات-مطابقة-المعاملات-في-funcc",text:"الشريحة 52: الدوال كمعاملات — مطابقة المعاملات في func_c"},{depth:2,id:"الشريحة-53-الدوال-كمعاملات-تنفيذ-جسم-funcc",text:"الشريحة 53: الدوال كمعاملات — تنفيذ جسم func_c"},{depth:2,id:"الشريحة-54-جرب-بنفسك-you-try-it",text:"الشريحة 54: جرّب بنفسك! (YOU TRY IT!)"},{depth:2,id:"الشريحة-55-الخلاصة-summary",text:"الشريحة 55: الخلاصة (SUMMARY)"},{depth:2,id:"الشريحة-56-mitopencourseware",text:"الشريحة 56: MITOpenCourseWare"}],c=`<h1>المحاضرة 8: الدوال ككائنات (Functions as Objects)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-8-functions-as-objects/">صفحة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec08_pdf/">صفحة الشرائح الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec08.pdf">ملف الشرائح الأصلي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec08_code.py">ملف شيفرة المحاضرة الأصلي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec08/">تفريغ المحاضرة على OCW</a> (النسخة الإنجليزية الرسمية).</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. شرائح «التكبير» (ZOOMING OUT) وشرائح تتبّع النطاق (Scope) تتكرّر فيها الشيفرة نفسها مع جدول جديد من أسماء الكائنات وقيمها؛ نُقلت كل شريحة على حدة مع جدولها، لأن معنى الشريحة هو الجدول لا الشيفرة. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. ولم تُضمَّن صور أو صفحات من ملف PDF.</p>
<h2 id="الشريحة-1-الدوال-ككائنات-functions-as-objects">الشريحة 1: الدوال ككائنات (Functions as Objects)</h2>
<p>نزّل الشرائح وملفات <code>.py</code> لمتابعة الشرح.</p>
<p>6.100L، المحاضرة 8 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-الدالة-من-المحاضرة-السابقة-function-from-last-lecture">الشريحة 2: الدالة من المحاضرة السابقة (Function from last lecture)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int

    Returns True if i is even and False otherwise
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>
</code></pre>
<ul>
<li>الدالة تُرجِع دائمًا قيمة.</li>
</ul>
<h2 id="الشريحة-3-ماذا-لو-لم-تكن-هناك-الكلمة-المفتاحية-return-what-if-there-is-no-return-keyword">الشريحة 3: ماذا لو لم تكن هناك الكلمة المفتاحية <code>return</code>؟ (What if there is no <code>return</code> keyword)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int

    Does not return anything
    &quot;&quot;&quot;</span>
    i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>
</code></pre>
<ul>
<li>بايثون تُرجِع القيمة <code>None</code> إذا لم يُعطَ أي <code>return</code>.</li>
<li>تمثّل <code>None</code> غياب القيمة (Absence of a Value).</li>
<li>إذا استدعيتَها في صدفة (Shell) فلا يُطبع شيء.</li>
<li>لا يُولِّد ذلك خطأً دلاليًّا ساكنًا (Static Semantic Error).</li>
</ul>
<h2 id="الشريحة-4-إضافة-return-none-صراحة">الشريحة 4: إضافة <code>return None</code> صراحةً</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int

    Does not return anything
    &quot;&quot;&quot;</span>
    i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
</code></pre>
<h2 id="الشريحة-5-جرب-بنفسك-you-try-it">الشريحة 5: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>ما الذي يُطبع إذا شغّلتَ هذه الشيفرة كملف؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">x,y</span>):
    <span class="hljs-keyword">return</span> x+y

<span class="hljs-keyword">def</span> <span class="hljs-title function_">mult</span>(<span class="hljs-params">x,y</span>):
    <span class="hljs-built_in">print</span>(x*y)

add(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(add(<span class="hljs-number">2</span>,<span class="hljs-number">3</span>))
mult(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
<span class="hljs-built_in">print</span>(mult(<span class="hljs-number">4</span>,<span class="hljs-number">5</span>))
</code></pre>
<h2 id="الشريحة-6-print-مقابل-return">الشريحة 6: <code>print</code> مقابل <code>return</code></h2>
<table>
<thead>
<tr>
<th><code>print</code></th>
<th><code>return</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>يمكن استعماله خارج الدوال.</td>
<td>لا معنى له إلا داخل دالة.</td>
</tr>
<tr>
<td>يمكن تنفيذ عبارات <code>print</code> كثيرة داخل الدالة.</td>
<td>يُنفَّذ واحد فقط من <code>return</code> داخل الدالة.</td>
</tr>
<tr>
<td>يمكن تنفيذ الشيفرة داخل الدالة بعد عبارة <code>print</code>.</td>
<td>الشيفرة داخل الدالة بعد عبارة <code>return</code> لا تُنفَّذ.</td>
</tr>
<tr>
<td>له قيمة مرتبطة به، تُخرَج إلى الطرفية (Console).</td>
<td>له قيمة مرتبطة به، تُسلَّم إلى الدالة المستدعِيَة (Calling Function).</td>
</tr>
<tr>
<td>تعبير <code>print</code> نفسه يُرجِع القيمة <code>None</code>.</td>
<td>—</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-7-جرب-بنفسك-أصلح-الدالة-you-try-it">الشريحة 7: جرّب بنفسك! — أصلح الدالة (YOU TRY IT!)</h2>
<p>أصلح الشيفرة التي تحاول كتابة هذه الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_triangular</span>(<span class="hljs-params">n</span>):
    <span class="hljs-string">&quot;&quot;&quot; n is an int &gt; 0
    Returns True if n is triangular, i.e. equals a continued
    summation of natural numbers (1+2+3+...+k), False otherwise &quot;&quot;&quot;</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        total += i
    <span class="hljs-keyword">if</span> total == n:
        <span class="hljs-built_in">print</span>(<span class="hljs-literal">True</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-literal">False</span>)
</code></pre>
<h2 id="الشريحة-8-الدوال-تدعم-التعدد-الوحداتي-modularity">الشريحة 8: الدوال تدعم التعدُّد الوحداتي (Modularity)</h2>
<p>إليك طريقة الجذر التربيعي بالتنصيف (Bisection Square Root Method) بوصفها دالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">bisection_root</span>(<span class="hljs-params">x</span>):
    <span class="hljs-comment"># Initialize variables</span>
    epsilon = <span class="hljs-number">0.01</span>
    low = <span class="hljs-number">0</span>
    high = x
    ans = (high + low)/<span class="hljs-number">2.0</span>
    <span class="hljs-keyword">while</span> <span class="hljs-built_in">abs</span>(ans**<span class="hljs-number">2</span> - x) &gt;= epsilon:
        <span class="hljs-comment"># iterate</span>
        <span class="hljs-keyword">if</span> ans**<span class="hljs-number">2</span> &lt; x:
            low = ans
        <span class="hljs-keyword">else</span>:
            high = ans
        ans = (high + low)/<span class="hljs-number">2.0</span>
    <span class="hljs-comment"># print(ans, &#x27;is close to the root of&#x27;, x)</span>
    <span class="hljs-keyword">return</span> ans
</code></pre>
<h2 id="الشريحة-9-استدعها-بقيم-مختلفة">الشريحة 9: استدعِها بقيم مختلفة</h2>
<p>ملاحظات الشريحة مربوطة بأسطر الشيفرة في الشريحة السابقة:</p>
<table>
<thead>
<tr>
<th>الملاحظة في الشريحة</th>
<th>موضعها في الشيفرة</th>
</tr>
</thead>
<tbody>
<tr>
<td>guess not close enough — التخمين ليس قريبًا كفاية</td>
<td>شرط <code>while abs(ans**2 - x) &gt;= epsilon:</code></td>
</tr>
<tr>
<td>update low or high, depends on guess too small or too large — حدّث <code>low</code> أو <code>high</code> حسب هل التخمين صغير جدًا أم كبير جدًا</td>
<td>الفرع <code>if ans**2 &lt; x: low = ans</code> و<code>else: high = ans</code></td>
</tr>
<tr>
<td>new value for guess — القيمة الجديدة للتخمين</td>
<td><code>ans = (high + low)/2.0</code> داخل الحلقة</td>
</tr>
<tr>
<td>return result — إرجاع النتيجة</td>
<td><code>return ans</code></td>
</tr>
</tbody>
</table>
<p>نادِها بقيم مختلفة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(bisection_root(<span class="hljs-number">4</span>))

<span class="hljs-built_in">print</span>(bisection_root(<span class="hljs-number">123</span>))
</code></pre>
<p>اكتب دالة تستدعي هذه الدالة!</p>
<h2 id="الشريحة-10-جرب-بنفسك-you-try-it">الشريحة 10: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق المواصفات التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">count_nums_with_sqrt_close_to</span> (n, epsilon):
    <span class="hljs-string">&quot;&quot;&quot; n is an int &gt; 2
    epsilon is a positive number &lt; 1
    Returns how many integers have a square root within epsilon of n &quot;&quot;&quot;</span>
</code></pre>
<p>استعمل <code>bisection_root</code> التي كتبناها للحصول على تقريب (Approximation) للجذر التربيعي لعدد صحيح.</p>
<p>مثلًا: <code>print(count_nums_with_sqrt_close_to(10, 0.1))</code> يطبع <code>4</code> لأن جذر كل هذه الأعداد الصحيحة على مسافة أقل من <code>0.1</code>:</p>
<ul>
<li>جذر <code>99</code> هو <code>9.949699401855469</code></li>
<li>جذر <code>100</code> هو <code>9.999847412109375</code></li>
<li>جذر <code>101</code> هو <code>10.049758911132812</code></li>
<li>جذر <code>102</code> هو <code>10.099456787109375</code></li>
</ul>
<h2 id="الشريحة-11-التكبير-zooming-out-هذا-صندوقي-الأسود">الشريحة 11: التكبير (ZOOMING OUT) — هذا صندوقي الأسود</h2>
<p>البرنامج:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
    sum_of_odds = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(a, b+<span class="hljs-number">1</span>):
        <span class="hljs-keyword">if</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">1</span>:
            sum_of_odds += i
    <span class="hljs-keyword">return</span> sum_of_odds

low = <span class="hljs-number">2</span>
high = <span class="hljs-number">7</span>
my_sum = sum_odd(low, high)
</code></pre>
<p>جدول نطاق البرنامج (Program Scope):</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sum_odd</code></td>
<td>Some function code object — كائن دالة فيه شيفرة</td>
<td>مُعرَّفة بـ<code>def</code></td>
</tr>
<tr>
<td><code>low</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td><code>high</code></td>
<td><code>7</code></td>
<td></td>
</tr>
<tr>
<td><code>my_sum</code></td>
<td>—</td>
<td>بعد استدعاء دالة واحدة (One function call)</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-12-التكبير-zooming-out">الشريحة 12: التكبير (ZOOMING OUT)</h2>
<p>الشريحة نفسها، وجدول نطاق البرنامج فيه الآن اسمًا إضافيًّا بعد تنفيذ جسم الدالة:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sum_odd</code></td>
<td>Some function code object</td>
<td></td>
</tr>
<tr>
<td><code>low</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td><code>high</code></td>
<td><code>7</code></td>
<td></td>
</tr>
<tr>
<td><code>my_sum</code></td>
<td>—</td>
<td>لم يُنفَّذ استدعاء بعد</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-13-التكبير-zooming-out">الشريحة 13: التكبير (ZOOMING OUT)</h2>
<p>الشريحة نفسها، وجدول نطاق البرنامج بعد اكتمال الاستدعاء:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sum_odd</code></td>
<td>Some function code object</td>
<td>الصندوق الأسود</td>
</tr>
<tr>
<td><code>low</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td><code>high</code></td>
<td><code>7</code></td>
<td></td>
</tr>
<tr>
<td><code>my_sum</code></td>
<td><code>15</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-14-نطاق-الدالة-function-scope">الشريحة 14: نطاق الدالة (Function Scope)</h2>
<p>شريحة فاصلة: ترقيم الشرائح من 11 إلى 13 يتبع ترتيب الصفحات في ملف PDF، وهذه الشريحة تعلن انتقال المحاضرة إلى فهم استدعاءات الدوال.</p>
<h2 id="الشريحة-15-فهم-استدعاءات-الدوال-understanding-function-calls">الشريحة 15: فهم استدعاءات الدوال (Understanding Function Calls)</h2>
<ul>
<li>كيف ينفّذ بايثون استدعاء دالة؟</li>
<li>كيف يعرف بايثون أي قيمة مرتبطة باسم متغيّر؟</li>
<li>ينشئ بيئة جديدة (New Environment) مع كل استدعاء دالة!</li>
<li>مثل برنامج مصغّر (Mini Program) عليه أن يُنجزه.</li>
<li>يعمل هذا البرنامج المصغّر بعد إسناد معاملاته (Parameters) إلى بعض المدخلات (Inputs).</li>
<li>يؤدّي العمل، أي جسم الدالة (Body of the Function).</li>
<li>يُرجِع قيمة.</li>
<li>تختفي البيئة بعد أن يُرجِع القيمة.</li>
</ul>
<h2 id="الشريحة-16-البيئات-environments">الشريحة 16: البيئات (Environments)</h2>
<ul>
<li>البيئة العامة (Global Environment):
<ul>
<li>حيث يتفاعل المستخدم مع مفسّر بايثون (Python Interpreter).</li>
<li>حيث يبدأ البرنامج.</li>
</ul>
</li>
<li>استدعاء دالة يُنشئ بيئة جديدة (Frame / Scope).</li>
</ul>
<h2 id="الشريحة-17-نطاق-المتغيرات-variable-scope">الشريحة 17: نطاق المتغيّرات (Variable Scope)</h2>
<ul>
<li>المعاملات الصورية (Formal Parameters) تُربط بقيمة معاملات المدخلات (Input Parameters).</li>
<li>النطاق (Scope) هو خريطة (Mapping) من الأسماء إلى الكائنات (Objects):
<ul>
<li>يعرّف السياق (Context) الذي يُقيَّم فيه جسم الدالة.</li>
<li>قيم المتغيّرات تُعطى بارتباطات الأسماء (Bindings of Names).</li>
</ul>
</li>
<li>تعبيرات جسم الدالة تُقيَّم بالنسبة إلى هذا النطاق الجديد.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">f</span>(<span class="hljs-params"> x </span>):
    x = x + <span class="hljs-number">1</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;in f(x): x =&#x27;</span>, x)
    <span class="hljs-keyword">return</span> x

x = <span class="hljs-number">3</span>
y = f( x )
</code></pre>
<p><strong>ملاحظة المترجم:</strong> في النصّ المستخرَج ظهر سطران متباعدان هما <code>xy = 3</code> و<code>z = f( y</code> <code>x )</code> بسبب انتقال الأعمدة في ملف PDF؛ والمقصود <code>x = 3</code> ثم <code>y = f( x )</code> كما هو واضح من الشرائح 18 إلى 24. اعتُمد التصحيح الظاهر من بقية الشرائح.</p>
<h2 id="الشريحة-18-نطاق-المتغيرات-بعد-تقييم-def">الشريحة 18: نطاق المتغيّرات — بعد تقييم <code>def</code></h2>
<p>جدول النطاق العام (Global Scope):</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>x</code></td>
<td>—</td>
<td>لم يُسنَد بعد</td>
</tr>
<tr>
<td><code>f</code></td>
<td>Some function code object</td>
<td>كائن الدالة</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-19-نطاق-المتغيرات-بعد-تنفيذ-أول-إسناد">الشريحة 19: نطاق المتغيّرات — بعد تنفيذ أول إسناد</h2>
<p>جدول النطاق العام:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>x</code></td>
<td><code>3</code></td>
<td></td>
</tr>
<tr>
<td><code>f</code></td>
<td>Some function code object</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-20-نطاق-المتغيرات-بعد-استدعاء-f">الشريحة 20: نطاق المتغيّرات — بعد استدعاء <code>f</code></h2>
<p>الجداول صارت ثلاثة: النطاق العام، ونطاق جديد باسم <code>f scope</code>.</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global scope</td>
<td><code>x</code></td>
<td><code>3</code></td>
<td></td>
</tr>
<tr>
<td>Global scope</td>
<td><code>f</code></td>
<td>Some function code object</td>
<td></td>
</tr>
<tr>
<td>f scope</td>
<td><code>x</code></td>
<td><code>3</code></td>
<td>المعامل الصوري مربوط بالمُدخل <code>3</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-21-نطاق-المتغيرات-بعد-استدعاء-f-مع-المتغير-y">الشريحة 21: نطاق المتغيّرات — بعد استدعاء <code>f</code> مع المتغيّر <code>y</code></h2>
<p>النطاق العام فيه <code>y = 3</code> بدلًا من <code>x = 3</code>، ونطاق <code>f</code> كما هو.</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global scope</td>
<td><code>y</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td>Global scope</td>
<td><code>f</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>f scope</td>
<td><code>x</code></td>
<td><code>3</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-22-نطاق-المتغيرات-تقييم-جسم-f-في-نطاق-f">الشريحة 22: نطاق المتغيّرات — تقييم جسم <code>f</code> في نطاق <code>f</code></h2>
<p>يُطبع <code>in f(x): x = 4</code>، واسم <code>x</code> في النطاق العام ما زال <code>3</code>.</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global scope</td>
<td><code>x</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td>Global scope</td>
<td><code>f</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>f scope</td>
<td><code>x</code></td>
<td><code>4</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-23-نطاق-المتغيرات-أثناء-return">الشريحة 23: نطاق المتغيّرات — أثناء <code>return</code></h2>
<p>نفس جداول الشريحة 22، مع عبارة <code>returns 4</code> بجوار نطاق <code>f</code>.</p>
<h2 id="الشريحة-24-نطاق-المتغيرات-بعد-تنفيذ-الإسناد-الثاني">الشريحة 24: نطاق المتغيّرات — بعد تنفيذ الإسناد الثاني</h2>
<p>نطاق <code>f</code> اختفى، وظهر اسم جديد في النطاق العام.</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>Global scope</td>
<td><code>x</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td>Global scope</td>
<td><code>f</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>Global scope</td>
<td><code>z</code></td>
<td><code>4</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-25-الفكرة-الكبرى-big-idea">الشريحة 25: الفكرة الكبرى (BIG IDEA)</h2>
<p>عليك أن تعرف أي تعبيرٍ تنفّذه لتعرف في أي نطاقٍ أنت.</p>
<h2 id="الشريحة-26-مثال-آخر-على-النطاق-another-scope-example">الشريحة 26: مثال آخر على النطاق (Another Scope Example)</h2>
<ul>
<li>داخل الدالة، يمكنك الوصول إلى متغيّر مُعرَّف في الخارج.</li>
<li>داخل الدالة، لا يمكنك تعديل متغيّر مُعرَّف في الخارج. يمكن ذلك باستعمال المتغيّرات العامة <code>global</code>، لكن هذا غير مُستحسن.</li>
<li>استعمل Python Tutor لتنفّذ هذه الأمثلة خطوة بخطوة!</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">f</span>(<span class="hljs-params">y</span>):
    x = <span class="hljs-number">1</span>
    x += <span class="hljs-number">1</span>
    <span class="hljs-built_in">print</span>(x)

x = <span class="hljs-number">5</span>
f(x)
<span class="hljs-built_in">print</span>(x)
</code></pre>
<p>المُخرَج: <code>2</code> ثم <code>5</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">g</span>(<span class="hljs-params">y</span>):
    <span class="hljs-built_in">print</span>(x)
    <span class="hljs-built_in">print</span>(x + <span class="hljs-number">1</span>)

x = <span class="hljs-number">5</span>
g(x)
<span class="hljs-built_in">print</span>(x)
</code></pre>
<p>المُخرَج: <code>5</code> ثم <code>6</code> ثم <code>5</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">h</span>(<span class="hljs-params">y</span>):
    x += <span class="hljs-number">1</span>

x = <span class="hljs-number">5</span>
h(x)
<span class="hljs-built_in">print</span>(x)
</code></pre>
<p>المُخرَج: خطأ (Error).</p>
<h2 id="الشريحة-27-الدوال-كوسائط-functions-as-arguments">الشريحة 27: الدوال كوسائط (Functions as Arguments)</h2>
<p>شريحة فاصلة تعلن موضوعًا جديدًا.</p>
<h2 id="الشريحة-28-الإجراءات-من-الرتبة-العليا-higher-order-procedures">الشريحة 28: الإجراءات من الرتبة العليا (Higher Order Procedures)</h2>
<ul>
<li>الكائنات (Objects) في بايثون لها نوع (Type): <code>int</code> و<code>float</code> و<code>str</code> و<code>Boolean</code> و<code>NoneType</code> و<code>function</code>.</li>
<li>الكائنات يمكن أن تظهر في الطرف الأيمن (RHS) من عبارة إسناد (Assignment): تربط اسمًا بكائن.</li>
<li>الكائنات يمكن استعمالها كوسيط (Argument) لإجراء (Procedure)، ويمكن إرجاعها كقيمة من إجراء.</li>
<li>الدوال كائنات من الفئة الأولى أيضًا (First Class Objects):
<ul>
<li>تعامل الدوال معاملة الأنواع الأخرى بالضبط.</li>
<li>يمكن أن تكون الدوال وسائط لدالة أخرى.</li>
<li>يمكن أن تُرجِع دالة أخرى دوالًا كقيم.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-29-الكائنات-في-البرنامج-objects-in-a-program">الشريحة 29: الكائنات في البرنامج (Objects in a Program)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params">i</span>):
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

r = <span class="hljs-number">2</span>
pi = <span class="hljs-number">22</span>/<span class="hljs-number">7</span>
my_func = is_even
a = is_even(<span class="hljs-number">3</span>)
b = my_func(<span class="hljs-number">4</span>)
</code></pre>
<p>جدول الكائنات في النطاق العام:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>ملاحظات</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>is_even</code></td>
<td>Some function code object — كائن دالة فيه شيفرة</td>
<td></td>
</tr>
<tr>
<td><code>my_func</code></td>
<td>Some function code object — مرتبط بالكائن نفسه</td>
<td></td>
</tr>
<tr>
<td><code>r</code></td>
<td>int object</td>
<td><code>2</code></td>
</tr>
<tr>
<td><code>pi</code></td>
<td>float object</td>
<td><code>3.14285714</code></td>
</tr>
<tr>
<td><code>a</code></td>
<td></td>
<td><code>False</code></td>
</tr>
<tr>
<td><code>b</code></td>
<td></td>
<td><code>True</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-30-الفكرة-الكبرى-big-idea">الشريحة 30: الفكرة الكبرى (BIG IDEA)</h2>
<p>كل شيء في بايثون كائن (an object).</p>
<h2 id="الشريحة-31-دالة-كمعامل-function-as-a-parameter">الشريحة 31: دالة كمعامل (Function as a Parameter)</h2>
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
<h2 id="الشريحة-32-نفذ-الشيفرة-خطوة-بخطوة-step-through-the-code">الشريحة 32: نفّذ الشيفرة خطوة بخطوة (Step through the code)</h2>
<p>الشيفرة نفسها، ومعها جدول نطاق البرنامج:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>calc</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td><code>add</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td><code>div</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td><code>res</code></td>
<td>—</td>
</tr>
</tbody>
</table>
<p>السطر المطلوب تنفيذه هو <code>res = calc(add, 2, 3)</code>.</p>
<h2 id="الشريحة-33-أنشئ-نطاق-calc-create-calc-scope">الشريحة 33: أنشئ نطاق <code>calc</code> (Create calc scope)</h2>
<p>الشريحة نفسها، وجدول نطاق البرنامج كما هو، وقد ظهر نطاق جديد فارغ باسم <code>calc scope</code>.</p>
<h2 id="الشريحة-34-طابق-المعاملات-الصورية-في-calc-match-formal-params-in-calc">الشريحة 34: طابِق المعاملات الصورية في <code>calc</code> (Match formal params in calc)</h2>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td>Program Scope</td>
<td><code>calc</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>add</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>div</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>res</code></td>
<td>—</td>
<td></td>
</tr>
<tr>
<td>calc scope</td>
<td><code>op</code></td>
<td><code>add</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>calc scope</td>
<td><code>x</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td>calc scope</td>
<td><code>y</code></td>
<td><code>3</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-35-السطر-الأول-والوحيد-في-calc">الشريحة 35: السطر الأول والوحيد في <code>calc</code></h2>
<p>الشريحة نفسها، بنفس جداول الشريحة 34، والموجَّه الآن على تنفيذ <code>return op(x,y)</code>.</p>
<h2 id="الشريحة-36-أنشئ-نطاق-add-create-scope-of-add">الشريحة 36: أنشئ نطاق <code>add</code> (Create scope of add)</h2>
<p>الشريحة نفسها، بنفس جداول الشريحة 34، وقد ظهر نطاق ثالث باسم <code>add scope</code>.</p>
<h2 id="الشريحة-37-طابق-المعاملات-الصورية-في-add-match-formal-params-in-add">الشريحة 37: طابِق المعاملات الصورية في <code>add</code> (Match formal params in add)</h2>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td>Program Scope</td>
<td><code>calc</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>add</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>div</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>res</code></td>
<td>—</td>
<td></td>
</tr>
<tr>
<td>calc scope</td>
<td><code>op</code></td>
<td><code>add</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>calc scope</td>
<td><code>x</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td>calc scope</td>
<td><code>y</code></td>
<td><code>3</code></td>
<td></td>
</tr>
<tr>
<td>add scope</td>
<td><code>a</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td>add scope</td>
<td><code>b</code></td>
<td><code>3</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-38-نفذ-سطر-add">الشريحة 38: نفّذ سطر <code>add</code></h2>
<p>الشريحة نفسها، بنفس جداول الشريحة 37، مع عبارة <code>returns 5</code> بجوار نطاق <code>add</code>.</p>
<h2 id="الشريحة-39-استبدل-استدعاء-الدالة-بقيمة-return-replace-func-call-with-return">الشريحة 39: استبدل استدعاء الدالة بقيمة <code>return</code> (Replace func call with return)</h2>
<p>الشريحة نفسها، ونطاق <code>add</code> اختفى من الجداول بعد انتهاء الدالة:</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td>Program Scope</td>
<td><code>calc</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>add</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>div</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>res</code></td>
<td>—</td>
<td></td>
</tr>
<tr>
<td>calc scope</td>
<td><code>op</code></td>
<td><code>add</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>calc scope</td>
<td><code>x</code></td>
<td><code>2</code></td>
<td></td>
</tr>
<tr>
<td>calc scope</td>
<td><code>y</code></td>
<td><code>3</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-40-نفذ-سطر-calc">الشريحة 40: نفّذ سطر <code>calc</code></h2>
<p>الشريحة نفسها، بنفس جداول الشريحة 39، مع عبارة <code>returns 5</code> بجوار نطاق <code>calc</code>.</p>
<h2 id="الشريحة-41-استبدل-استدعاء-الدالة-بقيمة-return">الشريحة 41: استبدل استدعاء الدالة بقيمة <code>return</code></h2>
<p>الشريحة نفسها، وبقي جدول النطاق العام فقط:</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td>Program Scope</td>
<td><code>calc</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>add</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>div</code></td>
<td>—</td>
<td>Some function code object</td>
</tr>
<tr>
<td>Program Scope</td>
<td><code>res</code></td>
<td><code>5</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-42-جرب-بنفسك-you-try-it">الشريحة 42: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>نفّذ تتبّعًا مشابهًا (Similar Trace) لاستدعاء الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">calc</span>(<span class="hljs-params">op, x, y</span>):
    <span class="hljs-keyword">return</span> op(x,y)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">div</span>(<span class="hljs-params">a,b</span>):
    <span class="hljs-keyword">if</span> b != <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> a/b
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Denom was 0.&quot;</span>)

res = calc(div,<span class="hljs-number">2</span>,<span class="hljs-number">0</span>)
</code></pre>
<p>ما قيمة <code>res</code>؟ وما الذي يُطبع؟</p>
<h2 id="الشريحة-43-مثال-آخر-الدوال-كمعاملات-another-example-functions-as-params">الشريحة 43: مثال آخر — الدوال كمعاملات (Another Example: Functions as Params)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">func_a</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;inside func_a&#x27;</span>)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">func_b</span>(<span class="hljs-params">y</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;inside func_b&#x27;</span>)
    <span class="hljs-keyword">return</span> y

<span class="hljs-keyword">def</span> <span class="hljs-title function_">func_c</span>(<span class="hljs-params">f, z</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;inside func_c&#x27;</span>)
    <span class="hljs-keyword">return</span> f(z)

<span class="hljs-built_in">print</span>(func_a())

<span class="hljs-built_in">print</span>(<span class="hljs-number">5</span> + func_b(<span class="hljs-number">2</span>))

<span class="hljs-built_in">print</span>(func_c(func_b, <span class="hljs-number">3</span>))
</code></pre>
<h2 id="الشريحة-44-الدوال-كمعاملات-النطاق-العام-functions-as-parameters">الشريحة 44: الدوال كمعاملات — النطاق العام (Functions as Parameters)</h2>
<p>جدول النطاق العام:</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>func_a</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td><code>func_b</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td><code>func_c</code></td>
<td>Some function code object</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-45-الدوال-كمعاملات-نطاق-funca">الشريحة 45: الدوال كمعاملات — نطاق <code>func_a</code></h2>
<p>نفس جدول النطاق العام، وقد ظهر <code>func_a scope</code>، وأصبح في النطاق العام اسم جديد قيمته <code>None</code>.</p>
<p><strong>ملاحظة المترجم:</strong> يبيّن النصّ أن تنفيذ <code>print(func_a())</code> ينشئ اسمًا في النطاق العام قيمته <code>None</code>؛ وهذا يوافق كون <code>func_a</code> لا تُرجِع شيئًا، فتُرجِع <code>None</code> ضمنًا.</p>
<h2 id="الشريحة-46-الدوال-كمعاملات-إكمال-تنفيذ-printfunca">الشريحة 46: الدوال كمعاملات — إكمال تنفيذ <code>print(func_a())</code></h2>
<p>الشريحة نفسها، بنفس جداول الشريحة 45.</p>
<h2 id="الشريحة-47-الدوال-كمعاملات-نطاق-funcb">الشريحة 47: الدوال كمعاملات — نطاق <code>func_b</code></h2>
<p>ظهر <code>func_b scope</code> بالمحتوى:</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>func_b scope</td>
<td><code>y</code></td>
<td><code>2</code></td>
</tr>
</tbody>
</table>
<p>وبقي جدول النطاق العام كما في الشريحة 44 مع اسم إضافي قيمته <code>None</code>.</p>
<h2 id="الشريحة-48-الدوال-كمعاملات-تنفيذ-جسم-funcb">الشريحة 48: الدوال كمعاملات — تنفيذ جسم <code>func_b</code></h2>
<p>الشريحة نفسها، والاسم في النطاق العام صارت قيمته <code>7</code>، لأن <code>5 + func_b(2)</code> تُنتج <code>7</code>.</p>
<h2 id="الشريحة-49-الدوال-كمعاملات-funcb-ترجع">الشريحة 49: الدوال كمعاملات — <code>func_b</code> تُرجِع</h2>
<p>عبارة <code>returns 2</code> بجوار نطاق <code>func_b</code> الذي صار:</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>func_b scope</td>
<td><code>y</code></td>
<td><code>2</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-50-الدوال-كمعاملات-إكمال-السطر">الشريحة 50: الدوال كمعاملات — إكمال السطر</h2>
<p>الشريحة نفسها، وجدول النطاق العام فيه <code>7</code>، وبقي <code>func_b scope</code> بقيمة <code>y = 2</code>.</p>
<h2 id="الشريحة-51-الدوال-كمعاملات-نطاق-funcc">الشريحة 51: الدوال كمعاملات — نطاق <code>func_c</code></h2>
<p>ظهر <code>func_c scope</code>:</p>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td>func_c scope</td>
<td><code>f</code></td>
<td><code>func_b</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>func_c scope</td>
<td><code>z</code></td>
<td>—</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-52-الدوال-كمعاملات-مطابقة-المعاملات-في-funcc">الشريحة 52: الدوال كمعاملات — مطابقة المعاملات في <code>func_c</code></h2>
<table>
<thead>
<tr>
<th>النطاق</th>
<th>الاسم</th>
<th>القيمة</th>
<th>ملاحظات</th>
</tr>
</thead>
<tbody>
<tr>
<td>func_c scope</td>
<td><code>f</code></td>
<td><code>func_b</code></td>
<td>Some function code object</td>
</tr>
<tr>
<td>func_c scope</td>
<td><code>z</code></td>
<td><code>3</code></td>
<td></td>
</tr>
<tr>
<td>func_b scope</td>
<td><code>y</code></td>
<td><code>3</code></td>
<td></td>
</tr>
</tbody>
</table>
<p>مع عبارة <code>returns 3</code> بجوار نطاق <code>func_b</code>.</p>
<h2 id="الشريحة-53-الدوال-كمعاملات-تنفيذ-جسم-funcc">الشريحة 53: الدوال كمعاملات — تنفيذ جسم <code>func_c</code></h2>
<p>جدول النطاق العام فيه <code>7</code> و<code>3</code>، ويظهر نطاقا <code>func_c</code> و<code>func_b</code>، مع عبارة <code>returns 3</code> بجوار نطاق <code>func_c</code>.</p>
<h2 id="الشريحة-54-جرب-بنفسك-you-try-it">الشريحة 54: جرّب بنفسك! (YOU TRY IT!)</h2>
<p>اكتب دالة تحقّق هذه المواصفات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">apply</span>(<span class="hljs-params">criteria,n</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    * criteria is a func that takes in a number and returns a bool
    * n is an int
    Returns how many ints from 0 to n (inclusive) match
    the criteria (i.e. return True when run with criteria)
    &quot;&quot;&quot;</span>
</code></pre>
<h2 id="الشريحة-55-الخلاصة-summary">الشريحة 55: الخلاصة (SUMMARY)</h2>
<ul>
<li>الدوال كائنات من الفئة الأولى (First Class Objects):
<ul>
<li>لها نوع.</li>
<li>يمكن إسنادها قيمة تُربط باسم.</li>
<li>يمكن استعمالها كوسيط لإجراء آخر.</li>
<li>يمكن إرجاعها كقيمة من إجراء آخر.</li>
</ul>
</li>
<li>يجب الحذر من البيئات (Environments):
<ul>
<li>البرنامج الرئيسي يعمل في البيئة العامة (Global Environment).</li>
<li>كل استدعاء دالة يحصل على بيئة مؤقتة جديدة.</li>
</ul>
</li>
<li>هذا يتيح إنشاء شيفرة موجزة وسهلة القراءة.</li>
</ul>
<h2 id="الشريحة-56-mitopencourseware">الشريحة 56: MITOpenCourseWare</h2>
<p>https://ocw.mit.edu</p>
<p>مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.</p>
<p>للاطّلاع على كيفية الاستشهاد بهذه المواد أو على شروط الاستخدام: https://ocw.mit.edu/terms.</p>
`,a={book:n,chapter:t,chapterTitle:d,slug:e,title:s,headings:o,html:c};export{n as book,t as chapter,d as chapterTitle,a as default,o as headings,c as html,e as slug,s as title};
