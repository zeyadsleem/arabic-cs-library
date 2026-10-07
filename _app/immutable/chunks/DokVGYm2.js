const n="mit-6100l",e="lecture-17",l="المحاضرة 17: الأصناف في بايثون (Python Classes)",s="notes",t="المحاضرة 17: الأصناف في Python (Python Classes)",o=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-عنوان-المحاضرة",text:"الشريحة 1: عنوان المحاضرة"},{depth:2,id:"الشريحة-2-الكائنات-objects",text:"الشريحة 2: الكائنات (OBJECTS)"},{depth:2,id:"الشريحة-3-البرمجة-الكينونية-object-oriented-programming-oop",text:"الشريحة 3: البرمجة الكينونية (OBJECT ORIENTED PROGRAMMING — OOP)"},{depth:2,id:"الشريحة-4-ما-هي-الكائنات-what-are-objects",text:"الشريحة 4: ما هي الكائنات؟ (WHAT ARE OBJECTS?)"},{depth:2,id:"الشريحة-5-مثال-list-من-نوع-1234",text:"الشريحة 5: مثال: list من نوع [1,2,3,4]"},{depth:2,id:"الشريحة-6-أمثلة-من-الحياة-الواقعية-real-life-examples",text:"الشريحة 6: أمثلة من الحياة الواقعية (REAL-LIFE EXAMPLES)"},{depth:2,id:"الشريحة-7-مزايا-البرمجة-الكينونية-advantages-of-oop",text:"الشريحة 7: مزايا البرمجة الكينونية (ADVANTAGES OF OOP)"},{depth:2,id:"الشريحة-8-الفكرة-الكبرى-big-idea",text:"الشريحة 8: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-9-إنشاء-أنواعك-الخاصة-واستخدامها-بالأصناف-creating-and-using-your-own-types-with-classes",text:"الشريحة 9: إنشاء أنواعك الخاصة واستخدامها بالأصناف (CREATING AND USING YOUR OWN TYPES WITH CLASSES)"},{depth:2,id:"الشريحة-10-تناظر-مع-الدوال-a-parallel-with-functions",text:"الشريحة 10: تناظر مع الدوال (A PARALLEL with FUNCTIONS)"},{depth:2,id:"الشريحة-11-قرارات-تصميم-نوع-الإحداثيات-coordinate-type-design-decisions",text:"الشريحة 11: قرارات تصميم نوع الإحداثيات (COORDINATE TYPE DESIGN DECISIONS)"},{depth:2,id:"الشريحة-12-عرف-أنواعك-الخاصة-define-your-own-types",text:"الشريحة 12: عرّف أنواعك الخاصة (DEFINE YOUR OWN TYPES)"},{depth:2,id:"الشريحة-13-ما-هي-السمات-what-are-attributes",text:"الشريحة 13: ما هي السمات؟ (WHAT ARE ATTRIBUTES?)"},{depth:2,id:"الشريحة-14-تعريف-كيفية-إنشاء-نسخة-من-صنف-defining-how-to-create-an-instance-of-a-class",text:"الشريحة 14: تعريف كيفية إنشاء نسخة من صنف (DEFINING HOW TO CREATE AN INSTANCE OF A CLASS)"},{depth:2,id:"الشريحة-15-ما-هي-self-مثال-الغرفة-what-is-self-room-example",text:"الشريحة 15: ما هي self؟ مثال الغرفة (WHAT is self? ROOM EXAMPLE)"},{depth:2,id:"الشريحة-16-الفكرة-الكبرى-big-idea",text:"الشريحة 16: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-17-إنشاء-نسخة-من-صنف-فعليا-actually-creating-an-instance-of-a-class",text:"الشريحة 17: إنشاء نسخة من صنف فعليًا (ACTUALLY CREATING AN INSTANCE OF A CLASS)"},{depth:2,id:"الشريحة-18-تمثيل-النسخ-visualizing-instances",text:"الشريحة 18: تمثيل النسخ (VISUALIZING INSTANCES)"},{depth:2,id:"الشريحة-19-تمثيل-النسخ-في-الذاكرة-visualizing-instances-in-memory",text:"الشريحة 19: تمثيل النسخ: في الذاكرة (VISUALIZING INSTANCES: in memory)"},{depth:2,id:"الشريحة-20-تمثيل-النسخ-ارسمها-visualizing-instances-draw-it",text:"الشريحة 20: تمثيل النسخ: ارسمها (VISUALIZING INSTANCES: draw it)"},{depth:2,id:"الشريحة-21-ما-هي-الدالة-method-what-is-a-method",text:"الشريحة 21: ما هي الدالة (method)؟ (WHAT IS A METHOD?)"},{depth:2,id:"الشريحة-22-عرف-دالة-method-لصنف-coordinate-define-a-method-for-the-coordinate-class",text:"الشريحة 22: عرّف دالة (method) لصنف Coordinate (DEFINE A METHOD FOR THE Coordinate CLASS)"},{depth:2,id:"الشريحة-23-كيف-تستدعى-الدالة-how-to-call-a-method",text:"الشريحة 23: كيف تُستدعى الدالة؟ (HOW TO CALL A METHOD?)"},{depth:2,id:"الشريحة-24-كيف-تستخدم-دالة-how-to-use-a-method",text:"الشريحة 24: كيف تستخدم دالة (HOW TO USE A METHOD)"},{depth:2,id:"الشريحة-25-تمثيل-الاستدعاء-visualizing-invocation",text:"الشريحة 25: تمثيل الاستدعاء (VISUALIZING INVOCATION)"},{depth:2,id:"الشريحة-26-تمثيل-الاستدعاء-visualizing-invocation",text:"الشريحة 26: تمثيل الاستدعاء (VISUALIZING INVOCATION)"},{depth:2,id:"الشريحة-27-طريقة-استخدام-الدالة-how-to-use-a-method",text:"الشريحة 27: طريقة استخدام الدالة (HOW TO USE A METHOD)"},{depth:2,id:"الشريحة-28-الفكرة-الكبرى-big-idea",text:"الشريحة 28: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-29-قوة-البرمجة-الكينونية-the-power-of-oop",text:"الشريحة 29: قوة البرمجة الكينونية (THE POWER OF OOP)"},{depth:2,id:"الشريحة-30-mit-opencourseware",text:"الشريحة 30: MIT OpenCourseWare"}],i=`<h1>المحاضرة 17: الأصناف في Python (Python Classes)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:</p>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة الرسمية على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-17-python-classes/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-17-python-classes/</a></li>
<li>الشرائح (ملف PDF): <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17_pdf/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17_pdf/</a> — والملف المباشر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec17.pdf">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec17.pdf</a></li>
<li>ملفات الشيفرة للتمرين: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17_code_py/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17_code_py/</a></li>
<li>النص الكامل (Transcript) للمحاضرة على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17/</a></li>
<li>رخصة CC BY-NC-SA 4.0: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">https://creativecommons.org/licenses/by-nc-sa/4.0/</a></li>
<li>شروط الاستخدام في MIT OCW: <a href="https://ocw.mit.edu/terms/">https://ocw.mit.edu/terms/</a></li>
</ul>
<p><strong>منهج الترجمة:</strong> عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (30 شريحة). المواضع التي يعرض فيها النص المستخرَج قائمة بيانات على يسار الشريحة نُقلت إلى جداول أو إلى صيغة <code>code</code>، والرسوم التخطيطية للذاكرة نُقلت إلى جداول. الشيفرة تُركت بالإنجليزية كما هي. الأشكال لم تُضمَّن، وحيث توجد صورة غير مشمولة بالرخصة أُشير إلى ذلك صراحةً.</p>
<h2 id="الشريحة-1-عنوان-المحاضرة">الشريحة 1: عنوان المحاضرة</h2>
<ul>
<li>PYTHON CLASSES</li>
<li>(download slides and .py files to follow along)</li>
<li>6.100L Lecture 17 — Ana Bell</li>
</ul>
<h2 id="الشريحة-2-الكائنات-objects">الشريحة 2: الكائنات (OBJECTS)</h2>
<p>يدعم Python أنواعًا كثيرة مختلفة من البيانات:</p>
<pre><code class="language-text">1234
3.14159
&quot;Hello&quot;
[1, 5, 7, 11, 13]
{&quot;CA&quot;: &quot;California&quot;, &quot;MA&quot;: &quot;Massachusetts&quot;}
</code></pre>
<ul>
<li>كل واحد منها <strong>كائن (object)</strong>، وكل كائن له:
<ul>
<li><strong>تمثيل داخلي للبيانات</strong> (internal data representation) — أولي (primitive) أو مركّب (composite)</li>
<li>مجموعة من الإجراءات (procedures) للتفاعل مع الكائن</li>
</ul>
</li>
<li>الكائن هو <strong>نسخة (instance)</strong> من <strong>نوع (type)</strong>
<ul>
<li><code>1234</code> نسخة من <code>int</code></li>
<li><code>&quot;hello&quot;</code> نسخة من <code>str</code></li>
</ul>
</li>
</ul>
<h2 id="الشريحة-3-البرمجة-الكينونية-object-oriented-programming-oop">الشريحة 3: البرمجة الكينونية (OBJECT ORIENTED PROGRAMMING — OOP)</h2>
<ul>
<li><strong>كل شيء في Python كائن</strong> (وله نوع)</li>
<li>يمكن إنشاء كائنات جديدة من نوع ما</li>
<li>يمكن التعامل مع الكائنات</li>
<li>يمكن إتلاف الكائنات
<ul>
<li>إمّا صراحةً باستخدام <code>del</code> أو بمجرد «نسيانها»</li>
</ul>
</li>
<li>سيستعيد نظام Python الكائنات المدمَّرة أو التي لا يمكن الوصول إليها — ويُسمّى ذلك <strong>جمع القمامة (garbage collection)</strong></li>
</ul>
<h2 id="الشريحة-4-ما-هي-الكائنات-what-are-objects">الشريحة 4: ما هي الكائنات؟ (WHAT ARE OBJECTS?)</h2>
<ul>
<li>الكائنات هي <strong>تجريد للبيانات (data abstraction)</strong> يلتقط:
<ol>
<li><strong>تمثيلًا داخليًا</strong> — عبر <strong>سمات بيانات (data attributes)</strong></li>
<li><strong>واجهة (interface)</strong> للتفاعل مع الكائن — عبر <strong>الدوال (methods)</strong> (أي procedures/functions)</li>
</ol>
</li>
<li>يعرّف السلوك (behaviors) لكن يُخفي التنفيذ (implementation)</li>
</ul>
<h2 id="الشريحة-5-مثال-list-من-نوع-1234">الشريحة 5: مثال: <code>list</code> من نوع <code>[1,2,3,4]</code></h2>
<ul>
<li>
<p>(1) كيف تُمثَّل القوائم داخليًا؟</p>
<ul>
<li>لا يهمّنا الأمر كثيرًا بصفتنا مستخدمين (تمثيل خاص (private representation))</li>
</ul>
</li>
<li>
<p>التمثيل الداخلي ينبغي أن يكون خاصًا</p>
</li>
<li>
<p>قد يُفسِد السلوك الصحيح إذا تعاملتَ مع التمثيل الداخلي مباشرةً</p>
</li>
<li>
<p>(2) كيف تتعامل مع القوائم وتُعِدّها؟</p>
<ul>
<li><code>L[i]</code>، <code>L[i:j]</code>، <code>+</code></li>
<li><code>len()</code>، <code>min()</code>، <code>max()</code>، <code>del(L[i])</code></li>
<li><code>L.append()</code>، <code>L.extend()</code>، <code>L.count()</code>، <code>L.index()</code>، <code>L.insert()</code>، <code>L.pop()</code>، <code>L.remove()</code>، <code>L.reverse()</code>، <code>L.sort()</code></li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> رُسم في الشريحة الأصلية تمثيلان محتملان للقائمة نفسها (<code>L = 1 -&gt; 2 -&gt; 3</code> و<code>L = 1 -&gt; 2 -&gt; 3 -&gt;</code>)، بغرض الإشارة إلى أنّ الشكل الداخلي لا يهمّ المستخدم. الأشكال غير قابلة للاسترجاع من طبقة النص، لذلك نُصَّ على المعنى ولم يُرسم شيء.</p>
</blockquote>
<h2 id="الشريحة-6-أمثلة-من-الحياة-الواقعية-real-life-examples">الشريحة 6: أمثلة من الحياة الواقعية (REAL-LIFE EXAMPLES)</h2>
<ul>
<li>
<p><strong>المصعد (Elevator)</strong>: صندوق يمكنه تغيير الطوابق</p>
<ul>
<li>يمثَّل بـ <code>length</code>، <code>width</code>، <code>height</code>، <code>max_capacity</code>، <code>current_floor</code></li>
<li>ينقل موقعه إلى طابق مختلف، ويضيف أشخاصًا، ويزيل أشخاصًا</li>
</ul>
</li>
<li>
<p><strong>الموظف (Employee)</strong>: شخص يعمل في شركة</p>
<ul>
<li>يمثَّل بـ <code>name</code>، <code>birth_date</code>، <code>salary</code></li>
<li>يمكنه تغيير اسمه أو راتبه</li>
</ul>
</li>
<li>
<p><strong>طابور في متجر (Queue at a store)</strong>: أوّل زبون يصل هو أوّل من يُخدَم</p>
<ul>
<li>يمثَّل الزبائن كقائمة أسماء نصّية (<code>str</code>)</li>
<li>تُضاف الأسماء إلى النهاية وتُزال الأسماء من البداية</li>
</ul>
</li>
<li>
<p><strong>كعكة الفطور (Stack of pancakes)</strong>: أوّل فطيرة تُصنع هي آخر فطيرة تُؤكل</p>
<ul>
<li>يمثَّل المكدّس كقائمة <code>str</code></li>
<li>تُضاف الفطيرة إلى النهاية وتُزال من النهاية</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-7-مزايا-البرمجة-الكينونية-advantages-of-oop">الشريحة 7: مزايا البرمجة الكينونية (ADVANTAGES OF OOP)</h2>
<ul>
<li>تجميع البيانات في حزم مع الإجراءات التي تعمل عليها عبر واجهات محدّدة بوضوح</li>
<li>تطوير على مبدأ «قسِّم وغلب» (divide-and-conquer)
<ul>
<li>ننفّذ ونختبر سلوك كل صنف على حدة</li>
<li>زيادة الوحدات النمطية (modularity) تُقلّل التعقيد</li>
</ul>
</li>
<li>الأصناف تجعل إعادة استخدام الشيفرة سهلة
<ul>
<li>كثير من وحدات Python (modules) تُعرِّف أصنافًا جديدة</li>
<li>لكل صنف بيئة منفصلة (لا تعارض في أسماء الدوال)</li>
<li>الوراثة (inheritance) تتيح للأصناف الفرعية (subclasses) أن تُعيد تعريف سلوك محدّد من صنف أب أو توسّعه</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-8-الفكرة-الكبرى-big-idea">الشريحة 8: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>أنت تكتب الصنف، وأنت من يتّخذ القرارات التصميمية.</li>
<li>أنت تقرّر أي بيانات تمثّل الصنف.</li>
<li>أنت تقرّر ما العمليات التي يستطيع المستخدم إجراؤها على الصنف.</li>
</ul>
<h2 id="الشريحة-9-إنشاء-أنواعك-الخاصة-واستخدامها-بالأصناف-creating-and-using-your-own-types-with-classes">الشريحة 9: إنشاء أنواعك الخاصة واستخدامها بالأصناف (CREATING AND USING YOUR OWN TYPES WITH CLASSES)</h2>
<p>نميّز بين <strong>إنشاء صنف (class)</strong> و<strong>استخدام نسخة (instance)</strong> من ذلك الصنف.</p>
<ul>
<li>إنشاء الصنف ينطوي على:
<ul>
<li>تعريف اسم الصنف</li>
<li>تعريف سمات الصنف (class attributes)</li>
<li>مثال: كتب شخصٌ شيفرةً لتنفيذ صنف قائمة (list class)</li>
</ul>
</li>
<li>استخدام الصنف ينطوي على:
<ul>
<li>إنشاء نسخ جديدة من الصنف</li>
<li>إجراء عمليات على تلك النسخ</li>
<li>مثال: <code>L=[1,2]</code> و <code>len(L)</code></li>
</ul>
</li>
</ul>
<h2 id="الشريحة-10-تناظر-مع-الدوال-a-parallel-with-functions">الشريحة 10: تناظر مع الدوال (A PARALLEL with FUNCTIONS)</h2>
<ul>
<li>تعريف صنف يشبه تعريف دالة (defining a class is like defining a function)
<ul>
<li>مع الدوال، نخبر Python أنّ هذا الإجراء موجود</li>
<li>مع الأصناف، نخبر Python عن مخطّط (blueprint) لهذا النوع الجديد من البيانات
<ul>
<li>سمات البيانات الخاصة به (data attributes)</li>
<li>سماته الإجرائية (procedural attributes)</li>
</ul>
</li>
</ul>
</li>
<li>إنشاء نسخ من الكائنات يشبه استدعاء الدالة (calling the function)
<ul>
<li>مع الدوال نُجري استدعاءات بمُدخَلات فعلية (actual parameters) مختلفة</li>
<li>مع الأصناف، نُنشئ كائنات جديدة من هذا النوع في الذاكرة</li>
<li><code>L1 = [1,2,3]</code> / <code>L2 = [5,6,7]</code></li>
</ul>
</li>
</ul>
<h2 id="الشريحة-11-قرارات-تصميم-نوع-الإحداثيات-coordinate-type-design-decisions">الشريحة 11: قرارات تصميم نوع الإحداثيات (COORDINATE TYPE DESIGN DECISIONS)</h2>
<ul>
<li>نقرّر ما عناصر البيانات التي تُكوِّن كائنًا
<ul>
<li>في مستوٍى ثنائي الأبعاد (2D plane)</li>
<li>الإحداثيّ يُعرَّف بقيمة <code>x</code> وقيمة <code>y</code></li>
</ul>
</li>
</ul>
<pre><code class="language-text">(1 , 1)
</code></pre>
<ul>
<li>نقرّر ماذا نفعل بالإحداثيّات
<ul>
<li>تخبرنا بمدى بُعد الإحداثيّ على المحور <code>x</code> أو على المحور <code>y</code></li>
<li>نقيس المسافة بين إحداثيّين، بفيثاغورس (Pythagoras)</li>
</ul>
</li>
</ul>
<pre><code class="language-text">(3 , 4)
</code></pre>
<p>يمكن إنشاء نسخ من كائن <code>Coordinate</code>.</p>
<h2 id="الشريحة-12-عرف-أنواعك-الخاصة-define-your-own-types">الشريحة 12: عرّف أنواعك الخاصة (DEFINE YOUR OWN TYPES)</h2>
<ul>
<li>استخدم الكلمة المفتاحية <code>class</code> لتعريف نوع جديد</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-comment">#define attributes here</span>
</code></pre>
<ul>
<li>مشابهة لـ <code>def</code>: شفّر الكود (indentation) لتبيّن أيّ الجمل تنتمي إلى تعريف الصنف</li>
<li>كلمة <code>object</code> تعني أنّ <code>Coordinate</code> هو كائن في Python وأنّه يرث كل سماته (سنرى ذلك في محاضرات لاحقة)</li>
</ul>
<h2 id="الشريحة-13-ما-هي-السمات-what-are-attributes">الشريحة 13: ما هي السمات؟ (WHAT ARE ATTRIBUTES?)</h2>
<ul>
<li>
<p>بيانات وإجراءات «تنتمي» إلى الصنف</p>
</li>
<li>
<p><strong>سمات البيانات (data attributes)</strong></p>
<ul>
<li>تخيّل البيانات ككائنات/متغيّرات أخرى تُكوِّن الصنف</li>
<li>مثال: الإحداثيّ يتكوّن من عددين</li>
</ul>
</li>
<li>
<p><strong>الدوال (Methods — سمات إجرائية procedural attributes)</strong></p>
<ul>
<li>تخيّل الدوال كدوال تعمل مع هذا الصنف وحده</li>
<li>كيف تتفاعل مع الكائن</li>
<li>مثال: يمكنك تعريف مسافة بين كائنَي إحداثيّ، لكن لا معنى لمسافة بين كائنَي قائمة</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-14-تعريف-كيفية-إنشاء-نسخة-من-صنف-defining-how-to-create-an-instance-of-a-class">الشريحة 14: تعريف كيفية إنشاء نسخة من صنف (DEFINING HOW TO CREATE AN INSTANCE OF A CLASS)</h2>
<ul>
<li>أوّلًا يجب أن نعرّف كيفية إنشاء نسخة من الصنف</li>
<li>استخدم دالة خاصة اسمها <code>__init__</code> لتهيئة بعض سمات البيانات أو لتنفيذ عمليات تهيئة</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, xval, yval</span>):
        <span class="hljs-variable language_">self</span>.x = xval
        <span class="hljs-variable language_">self</span>.y = yval
</code></pre>
<ul>
<li>تتيح لك <code>self</code> إنشاء متغيّرات تنتمي إلى هذا الكائن</li>
<li>بدون <code>self</code>، أنت لا تنشئ سوى متغيّرات عادية!</li>
</ul>
<h2 id="الشريحة-15-ما-هي-self-مثال-الغرفة-what-is-self-room-example">الشريحة 15: ما هي <code>self</code>؟ مثال الغرفة (WHAT is self? ROOM EXAMPLE)</h2>
<ul>
<li>الآن عندما تنشئ نسخة واحدة (سمِّها <code>living_room</code>)، تصبح <code>self</code> هي هذا الكائن الفعلي</li>
<li>تخيّل تعريف الصنف كمخطّط (blueprint) فيه أماكن فارغة لعناصر فعلية
<ul>
<li>لدى <code>self</code> كرسيّ</li>
<li>لدى <code>self</code> طاولة قهوة</li>
<li>لدى <code>self</code> أريكة</li>
</ul>
</li>
<li>لدى <code>living_room</code> كرسيّ أزرق</li>
<li>لدى <code>living_room</code> طاولة سوداء</li>
<li>لدى <code>living_room</code> أريكة بيضاء</li>
<li>يمكن إنشاء نسخ كثيرة باستخدام المخطّط نفسه</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> في أسفل هذه الشريحة في الأصل إشعار حقوق: «Image © source unknown. All rights reserved. This content is excluded from our Creative Commons license. For more information, see https://ocw.mit.edu/help/faq-fair-use/». الصورة من طرف ثالث مصدرها مجهول وغير مشمولة برخصة CC، لذلك حُذفت ولم تُنشر، واقتصرت الترجمة على النص أعلاه.</p>
</blockquote>
<h2 id="الشريحة-16-الفكرة-الكبرى-big-idea">الشريحة 16: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>عند تعريف صنف، لا يوجد هنا كائن ملموس فعلي.</li>
<li>هذا تعريف فقط.</li>
</ul>
<h2 id="الشريحة-17-إنشاء-نسخة-من-صنف-فعليا-actually-creating-an-instance-of-a-class">الشريحة 17: إنشاء نسخة من صنف فعليًا (ACTUALLY CREATING AN INSTANCE OF A CLASS)</h2>
<p>تذكّر دالة <code>__init__</code> في تعريف الصنف:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, xval, yval</span>):
    <span class="hljs-variable language_">self</span>.x = xval
    <span class="hljs-variable language_">self</span>.y = yval
</code></pre>
<ul>
<li>لا تُمرِّر مُدخَلًا لـ <code>self</code>، فـ Python تفعل ذلك تلقائيًا</li>
</ul>
<pre><code class="language-python">c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
origin = Coordinate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(c.x)
<span class="hljs-built_in">print</span>(origin.x)
</code></pre>
<ul>
<li>سمات البيانات الخاصة بنسخة ما تُسمّى <strong>متغيّرات النسخة (instance variables)</strong></li>
<li>عُرِّفت سمات البيانات بـ <code>self.XXX</code> وهي قابلة للوصول عبر <strong>ترميز النقطة (dot notation)</strong> طوال عمر الكائن</li>
<li>كل النسخ لها سمات البيانات هذه، لكن بقيم مختلفة!</li>
</ul>
<h2 id="الشريحة-18-تمثيل-النسخ-visualizing-instances">الشريحة 18: تمثيل النسخ (VISUALIZING INSTANCES)</h2>
<ul>
<li>لنفترض أنّنا أنشأنا نسخة من إحداثيّ</li>
</ul>
<pre><code class="language-python">c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
</code></pre>
<table>
<thead>
<tr>
<th>الكائن</th>
<th>النوع</th>
<th><code>x</code></th>
<th><code>y</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>c</code></td>
<td><code>Coordinate</code></td>
<td>3</td>
<td>4</td>
</tr>
</tbody>
</table>
<ul>
<li>تخيّل هذا كأنّنا ننشئ بنية (structure) في الذاكرة</li>
<li>ثم إن قِسْنا <code>c.x</code> فإننا نبحث عن البنية التي يشير إليها <code>c</code>، ثم نبحث عن الربط (binding) لـ <code>x</code> داخل تلك البنية</li>
</ul>
<h2 id="الشريحة-19-تمثيل-النسخ-في-الذاكرة-visualizing-instances-in-memory">الشريحة 19: تمثيل النسخ: في الذاكرة (VISUALIZING INSTANCES: in memory)</h2>
<ul>
<li>اصنع نسخة أخرى باستخدام متغيّر</li>
</ul>
<pre><code class="language-python">a = <span class="hljs-number">0</span>
orig = Coordinate(a,a)
</code></pre>
<table>
<thead>
<tr>
<th>الكائن</th>
<th>النوع</th>
<th><code>x</code></th>
<th><code>y</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>c</code></td>
<td><code>Coordinate</code></td>
<td>3</td>
<td>4</td>
</tr>
<tr>
<td><code>orig</code></td>
<td><code>Coordinate</code></td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td><code>a</code></td>
<td><code>int</code></td>
<td>0</td>
<td>—</td>
</tr>
</tbody>
</table>
<ul>
<li>كل هذه مجرّد كائنات في الذاكرة!</li>
<li>نحن لا نتعامل سوى مع سمات هذه الكائنات</li>
</ul>
<h2 id="الشريحة-20-تمثيل-النسخ-ارسمها-visualizing-instances-draw-it">الشريحة 20: تمثيل النسخ: ارسمها (VISUALIZING INSTANCES: draw it)</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, xval, yval</span>):
        <span class="hljs-variable language_">self</span>.x = xval
        <span class="hljs-variable language_">self</span>.y = yval

c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
origin = Coordinate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(c.x)
<span class="hljs-built_in">print</span>(origin.x)
</code></pre>
<table>
<thead>
<tr>
<th>الكائن</th>
<th>النوع</th>
<th><code>x</code></th>
<th><code>y</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>c</code></td>
<td><code>Coordinate</code></td>
<td>3</td>
<td>4</td>
</tr>
<tr>
<td><code>origin</code></td>
<td><code>Coordinate</code></td>
<td>0</td>
<td>0</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-21-ما-هي-الدالة-method-what-is-a-method">الشريحة 21: ما هي الدالة (method)؟ (WHAT IS A METHOD?)</h2>
<ul>
<li>سمة إجرائية (procedural attribute)</li>
<li>تخيّلها كدالة تعمل مع هذا الصنف وحده</li>
<li>يمرّر Python دائمًا الكائن كالمُدخَل (argument) الأول</li>
<li>العُرف أن نستخدم <code>self</code> كاسم المُدخَل الأول لكل الدوال</li>
</ul>
<h2 id="الشريحة-22-عرف-دالة-method-لصنف-coordinate-define-a-method-for-the-coordinate-class">الشريحة 22: عرّف دالة (method) لصنف <code>Coordinate</code> (DEFINE A METHOD FOR THE Coordinate CLASS)</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, xval, yval</span>):
        <span class="hljs-variable language_">self</span>.x = xval
        <span class="hljs-variable language_">self</span>.y = yval

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">distance</span>(<span class="hljs-params">self, other</span>):
        x_diff_sq = (<span class="hljs-variable language_">self</span>.x-other.x)**<span class="hljs-number">2</span>
        y_diff_sq = (<span class="hljs-variable language_">self</span>.y-other.y)**<span class="hljs-number">2</span>
        <span class="hljs-keyword">return</span> (x_diff_sq + y_diff_sq)**<span class="hljs-number">0.5</span>
</code></pre>
<ul>
<li>بخلاف <code>self</code> وترميز النقطة، تتصرّف الدوال تمامًا كالدوال العادية (تأخذ مُدخَلات، وتنفّذ عمليات، وتُعيد قيمة)</li>
</ul>
<h2 id="الشريحة-23-كيف-تستدعى-الدالة-how-to-call-a-method">الشريحة 23: كيف تُستدعى الدالة؟ (HOW TO CALL A METHOD?)</h2>
<ul>
<li>يُستخدم معامل <code>.</code> للوصول إلى أي سمة
<ul>
<li>سمة بيانات لكائن (رأينا <code>c.x</code>)</li>
<li>دالة لكائن</li>
</ul>
</li>
<li>ترميز النقطة:</li>
</ul>
<pre><code class="language-text">&lt;object_variable&gt;.&lt;method&gt;(&lt;parameters&gt;)
</code></pre>
<ul>
<li>مألوف؟</li>
</ul>
<pre><code class="language-python">my_list.append(<span class="hljs-number">4</span>)
my_list.sort()
</code></pre>
<h2 id="الشريحة-24-كيف-تستخدم-دالة-how-to-use-a-method">الشريحة 24: كيف تستخدم دالة (HOW TO USE A METHOD)</h2>
<p>تذكّر تعريف دالة <code>distance</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">distance</span>(<span class="hljs-params">self, other</span>):
    x_diff_sq = (<span class="hljs-variable language_">self</span>.x-other.x)**<span class="hljs-number">2</span>
    y_diff_sq = (<span class="hljs-variable language_">self</span>.y-other.y)**<span class="hljs-number">2</span>
    <span class="hljs-keyword">return</span> (x_diff_sq + y_diff_sq)**<span class="hljs-number">0.5</span>
</code></pre>
<p>استخدام الصنف:</p>
<pre><code class="language-python">c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
orig = Coordinate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(c.distance(orig))
</code></pre>
<ul>
<li>لاحظ أنّ <code>self</code> تصبح الكائن الذي تستدعي عليه الدالة (الشيء الذي قبل النقطة!)</li>
</ul>
<h2 id="الشريحة-25-تمثيل-الاستدعاء-visualizing-invocation">الشريحة 25: تمثيل الاستدعاء (VISUALIZING INVOCATION)</h2>
<ul>
<li>صنف <code>Coordinate</code> كائن في الذاكرة، قادمٌ من تعريف الصنف</li>
</ul>
<table>
<thead>
<tr>
<th>العنصر</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>self.x</code></td>
<td>some code</td>
</tr>
<tr>
<td><code>self.y</code></td>
<td>some code</td>
</tr>
<tr>
<td><code>__init__</code></td>
<td>some code</td>
</tr>
<tr>
<td><code>distance</code></td>
<td>some code</td>
</tr>
</tbody>
</table>
<ul>
<li>أنشئ كائنَي <code>Coordinate</code></li>
</ul>
<pre><code class="language-python">c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
orig = Coordinate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
</code></pre>
<table>
<thead>
<tr>
<th>الكائن</th>
<th>النوع</th>
<th><code>x</code></th>
<th><code>y</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>c</code></td>
<td><code>Coordinate</code></td>
<td>3</td>
<td>4</td>
</tr>
<tr>
<td><code>orig</code></td>
<td><code>Coordinate</code></td>
<td>0</td>
<td>0</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-26-تمثيل-الاستدعاء-visualizing-invocation">الشريحة 26: تمثيل الاستدعاء (VISUALIZING INVOCATION)</h2>
<ul>
<li>قِسْ استدعاء الدالة <code>c.distance(orig)</code>
<ol>
<li>الكائن هو ما قبل النقطة</li>
<li>نبحث عن نوع <code>c</code></li>
<li>الدالة التي ستُستدعى هي ما بعد النقطة.</li>
<li>نبحث عن الربط (binding) لـ <code>distance</code> في صنف الكائن ذلك</li>
<li>نُنادي تلك الدالة بحيث <code>c</code> هي <code>self</code> و <code>orig</code> هي <code>other</code></li>
</ol>
</li>
</ul>
<h2 id="الشريحة-27-طريقة-استخدام-الدالة-how-to-use-a-method">الشريحة 27: طريقة استخدام الدالة (HOW TO USE A METHOD)</h2>
<ul>
<li>الطريقة المعتادة</li>
</ul>
<pre><code class="language-python">c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
zero = Coordinate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
c.distance(zero)
</code></pre>
<ul>
<li>تُكافئ تمامًا</li>
</ul>
<pre><code class="language-python">c = Coordinate(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>)
zero = Coordinate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
Coordinate.distance(c, zero)
</code></pre>
<h2 id="الشريحة-28-الفكرة-الكبرى-big-idea">الشريحة 28: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>معامل <code>.</code> يصل إمّا إلى سمات بيانات وإمّا إلى دوال.</li>
<li>سمات البيانات تُعرَّف بـ <code>self.something</code></li>
<li>الدوال هي دوال مُعرَّفة داخل الصنف مع <code>self</code> كأول مُدخَل.</li>
</ul>
<h2 id="الشريحة-29-قوة-البرمجة-الكينونية-the-power-of-oop">الشريحة 29: قوة البرمجة الكينونية (THE POWER OF OOP)</h2>
<ul>
<li>نجمع معًا كائنات تتشارك:
<ul>
<li>سمات مشتركة</li>
<li>إجراءات تعمل على تلك السمات</li>
</ul>
</li>
<li>نستخدم التجريد (abstraction) للتمييز بين كيفية تنفيذ كائن وكيفية استخدامه</li>
<li>نبني طبقات من تجريدات الكائنات ترث سلوكًا من أصناف كائنات أخرى</li>
<li>ننشئ أصنافنا الخاصة من الكائنات فوق الأصناف الأساسية في Python</li>
</ul>
<h2 id="الشريحة-30-mit-opencourseware">الشريحة 30: MIT OpenCourseWare</h2>
<ul>
<li><a href="https://ocw.mit.edu">https://ocw.mit.edu</a></li>
<li>6.100L Introduction to Computer Science and Programming Using Python — Fall 2022</li>
<li>للاستعلام عن كيفية الاستشهاد بهذه المواد أو شروط الاستخدام، راجع: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a></li>
</ul>
`,a={book:n,chapter:e,chapterTitle:l,slug:s,title:t,headings:o,html:i};export{n as book,e as chapter,l as chapterTitle,a as default,o as headings,i as html,s as slug,t as title};
