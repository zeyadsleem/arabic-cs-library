const s="mit-6100l",n="recitations",e="الجلسات التطبيقية",t="rec7",a="الجلسة التطبيقية 7: الاستثناءات والتأكيدات، والقواميس",i=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"المحاضرة-13-الاستثناءات-والتأكيدات-exceptions-amp-assertions",text:"المحاضرة 13: الاستثناءات والتأكيدات (Exceptions &amp; Assertions)"},{depth:3,id:"معالجة-الاستثناءات-exception-handling",text:"معالجة الاستثناءات (Exception Handling)"},{depth:2,id:"المحاضرة-14-القواميس-dictionaries",text:"المحاضرة 14: القواميس (Dictionaries)"}],l=`<h1>الجلسة التطبيقية 7 (Recitation 7)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec07_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف PDF. الأجزاء التي يعرضها المصدر صورًا لشيفرة مطبوع بنصوص تعليمية داخل الصورة، فنُقلت الشيفرة نفسها نصًّا في مواضعها، وذُكرت تعليقات الصورة عند كلّ موضع. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-14-dictionaries/">المحاضرة 14: القواميس (Dictionaries)</a>. ويعرض ملخّصها معالجة الاستثناءات (Exception Handling) والتأكيدات (Assertions) في المحاضرة 13، ثم القواميس (Dictionaries) في المحاضرة 14.</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 7 — 28 أكتوبر 2022.</p>
<ul>
<li>مسابقة MQ7 الاثنين المقبل 10/31.</li>
<li>مجموعة المسائل PS3 مستحقّة الأربعاء المقبل 11/2.</li>
</ul>
<h2 id="المحاضرة-13-الاستثناءات-والتأكيدات-exceptions-amp-assertions">المحاضرة 13: الاستثناءات والتأكيدات (Exceptions &amp; Assertions)</h2>
<h3 id="معالجة-الاستثناءات-exception-handling">معالجة الاستثناءات (Exception Handling)</h3>
<p>تحدث الاستثناءات (exceptions) عندما تكون الصياغة (syntax) صحيحة، لكنّ الشيفرة تؤدّي عملية غير مسموح بها. ويمكننا معالجتها بطرق عدّة، وفيما يلي بضع خيارات.</p>
<h4>1. <code>try</code>/<code>except</code></h4>
<ul>
<li>استعمل هذا لمعالجة استثناء، أي لمنع البرنامج من الانهيار.</li>
<li>إن لم تحدّد استثناءً بعينه، فإنّه يتعامل مع <strong>جميع</strong> الاستثناءات التي تقع في كتلة <code>try</code>.</li>
<li>إن حدّدت استثناءً بعينه، فإنّ بند <code>except</code> لا يتعامل إلا مع أخطاء ذلك النوع.</li>
<li>هذا اختياري، لكنّه يمكن أن يتضمّن رسالة بعد رمي الخطأ:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">except</span> ZeroDivisionError(<span class="hljs-string">&quot;Cannot divide by zero&quot;</span>)
</code></pre>
<p><strong>ملاحظة المترجم:</strong> في المصدر مثال على <code>try</code>/<code>except</code> مطبوع صورةً، وهذه شيفرته منقولًا نصًّا. وكانت على الصورة تعليقات بالأحمر: على بندي <code>except ValueError</code> و<code>except ZeroDivisionError</code> التعليق أنّهما «يُنفَّذان فقط إذا ظهر هذان الخطآن»، وعلى بند <code>except</code> المجرّد التعليق أنّه «لبقيّة الأخطاء».</p>
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
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;a+b = &quot;</span>, a+b)
<span class="hljs-keyword">except</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went very wrong.&quot;</span>)
</code></pre>
<h4>2. <code>raise</code></h4>
<ul>
<li>يُستعمل عندما تريد حدوث استثناء.</li>
<li>مثلًا:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;string contained a character&quot;</span>)
</code></pre>
<p><strong>ملاحظة المترجم:</strong> في المصدر مثال على <code>raise</code> داخل دالة مطبوع صورةً، وهذه شيفرته منقولًا نصًّا. وكان على سطر <code>raise</code> تعليق بالأحمر يقول: «أوقف التنفيذ حالما تصادف محرفًا ليس رقمًا، برسالتنا التوضيحية الخاصة».</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_digits</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a non-empty string containing digits.
    Returns sum of all chars that are digits  &quot;&quot;&quot;</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> char <span class="hljs-keyword">in</span> s:
        <span class="hljs-keyword">try</span>:
            val = <span class="hljs-built_in">int</span>(char)
            total += val
        <span class="hljs-keyword">except</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;string contained a character&quot;</span>)
    <span class="hljs-keyword">return</span> total
</code></pre>
<h4>3. <code>assert</code></h4>
<ul>
<li>تقنية برمجية دفاعية جيّدة، إذ يتوقّف التنفيذ عند عدم تحقّق الشرط المتوقَّع.</li>
<li>صيغتها:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">assert</span> &lt;Boolean condition&gt;
<span class="hljs-keyword">assert</span> &lt;Boolean condition&gt;, &lt;assertion message&gt;
</code></pre>
<h2 id="المحاضرة-14-القواميس-dictionaries">المحاضرة 14: القواميس (Dictionaries)</h2>
<ul>
<li>مثال على قاموس: <code>my_dict = {'key1': 'value1', 'key2': 2}</code></li>
<li>القاموس (dictionary) بنية بيانات أخرى تربط المفاتيح (keys) بالقيم (values).</li>
<li>المفاتيح (Keys):
<ul>
<li>يجب أن تكون غير قابلة للتغيير (immutable).</li>
<li>يجب أن تكون فريدة.</li>
<li>الترتيب غير مضمون.</li>
<li><code>my_dict.keys()</code> — يُعيد كلّ مفاتيح القاموس.</li>
</ul>
</li>
<li>القيم (Values):
<ul>
<li>لا يلزم أن تكون غير قابلة للتغيير ولا فريدة.</li>
<li><code>my_dict['key1']</code> — يُعيد <code>'value1'</code>.</li>
<li><code>my_dict['key2']</code> — يُعيد 2.</li>
<li><code>my_dict.values()</code> — يُعيد كلّ قيم القاموس.</li>
</ul>
</li>
<li>المرور على قاموس يعني المرور على مفاتيحه.</li>
<li>استعمال الكلمة المفتاحية <code>in</code> لاختبار الانتماء بين المفاتيح.</li>
<li>افحص دائمًا بـ <code>in my_dict</code>، لا بـ <code>in my_dict.keys()</code>، لأسباب الكفاءة.</li>
<li><code>dict.items()</code> — يُعيد أزواج المفاتيح والقيم في القاموس.</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:i,html:l};export{s as book,n as chapter,e as chapterTitle,o as default,i as headings,l as html,t as slug,a as title};
