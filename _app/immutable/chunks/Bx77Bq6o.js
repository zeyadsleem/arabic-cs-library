const n="mit-6100l",e="lecture-15",l="المحاضرة 15: الاستدعاء الذاتي (Recursion)",s="notes",o="شرائح المحاضرة 15: الاستدعاء الذاتي",a=[{depth:2,id:"الشريحة-1-الاستدعاء-الذاتي",text:"الشريحة 1 — الاستدعاء الذاتي"},{depth:2,id:"الشريحة-2-الخوارزميات-التكرارية-حتى-الآن",text:"الشريحة 2 — الخوارزميات التكرارية حتى الآن"},{depth:2,id:"الشريحة-3-الضرب",text:"الشريحة 3 — الضرب"},{depth:2,id:"الشريحة-4-الضرب-فكر-باستخدام-التكرار",text:"الشريحة 4 — الضرب: فكّر باستخدام التكرار"},{depth:2,id:"الشريحة-5-الضرب-حل-تكراري-آخر",text:"الشريحة 5 — الضرب: حل تكراري آخر"},{depth:2,id:"الشريحة-6-الضرب-لاحظ-الأنماط-العودية",text:"الشريحة 6 — الضرب: لاحظ الأنماط العودية"},{depth:2,id:"الشريحة-7-الضرب-ابحث-عن-نسخ-أصغر-من-المسألة",text:"الشريحة 7 — الضرب: ابحث عن نسخ أصغر من المسألة"},{depth:2,id:"الشريحة-8-الضرب-ابحث-عن-نسخ-أصغر-من-المسألة",text:"الشريحة 8 — الضرب: ابحث عن نسخ أصغر من المسألة"},{depth:2,id:"الشريحة-9-الضرب-ابحث-عن-نسخ-أصغر-من-المسألة",text:"الشريحة 9 — الضرب: ابحث عن نسخ أصغر من المسألة"},{depth:2,id:"الشريحة-10-الضرب-وصلنا-إلى-النهاية",text:"الشريحة 10 — الضرب: وصلنا إلى النهاية"},{depth:2,id:"الشريحة-11-الضرب-أعد-بناء-النتيجة-صعودا",text:"الشريحة 11 — الضرب: أعد بناء النتيجة صعودًا"},{depth:2,id:"الشريحة-12-الضرب-أعد-بناء-النتيجة-صعودا",text:"الشريحة 12 — الضرب: أعد بناء النتيجة صعودًا"},{depth:2,id:"الشريحة-13-الضرب-أعد-بناء-النتيجة-صعودا",text:"الشريحة 13 — الضرب: أعد بناء النتيجة صعودًا"},{depth:2,id:"الشريحة-14-الضرب-الخطوة-العودية-والحالة-الأساسية",text:"الشريحة 14 — الضرب: الخطوة العودية والحالة الأساسية"},{depth:2,id:"الشريحة-15-الضرب-الخطوة-العودية-والحالة-الأساسية",text:"الشريحة 15 — الضرب: الخطوة العودية والحالة الأساسية"},{depth:2,id:"الشريحة-16-الضرب-الكود-العودي",text:"الشريحة 16 — الضرب: الكود العودي"},{depth:2,id:"الشريحة-17-مثال-واقعي-استدعاء-دالة-واحد-فقط",text:"الشريحة 17 — مثال واقعي: استدعاء دالة واحد فقط"},{depth:2,id:"الشريحة-18-مثال-واقعي-استدعاءات-دوال-كثيرة",text:"الشريحة 18 — مثال واقعي: استدعاءات دوال كثيرة"},{depth:2,id:"الشريحة-19-الفكرة-الكبرى",text:"الشريحة 19 — الفكرة الكبرى"},{depth:2,id:"الشريحة-20-ما-الاستدعاء-الذاتي",text:"الشريحة 20 — ما الاستدعاء الذاتي؟"},{depth:2,id:"الشريحة-21-جرب-بنفسك",text:"الشريحة 21 — جرّب بنفسك!"},{depth:2,id:"الشريحة-22-المضروب-factorial",text:"الشريحة 22 — المضروب (Factorial)"},{depth:2,id:"الشريحة-23-مثال-نطاق-الدالة-العودية-scope",text:"الشريحة 23 — مثال نطاق الدالة العودية (Scope)"},{depth:2,id:"الشريحة-24-الفكرة-الكبرى",text:"الشريحة 24 — الفكرة الكبرى"},{depth:2,id:"الشريحة-25-بعض-الملاحظات",text:"الشريحة 25 — بعض الملاحظات"},{depth:2,id:"الشريحة-26-التكرار-مقابل-الاستدعاء-الذاتي",text:"الشريحة 26 — التكرار مقابل الاستدعاء الذاتي"},{depth:2,id:"الشريحة-27-متى-تستخدم-الاستدعاء-الذاتي",text:"الشريحة 27 — متى تستخدم الاستدعاء الذاتي؟"},{depth:2,id:"الشريحة-28-خلاصة-الشريحة-الأصلية",text:"الشريحة 28 — خلاصة الشريحة الأصلية"},{depth:2,id:"الشريحة-29-إشعار-المصدر",text:"الشريحة 29 — إشعار المصدر"}],c=`<h1>شرائح المحاضرة 15: الاستدعاء الذاتي (Recursion)</h1>
<p>المصدر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec15.pdf">الشرائح الأصلية، PDF</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec15_code.py">كود المحاضرة</a>.</p>
<p>إعداد الأصل: <strong>Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>، مقرر 6.100L، خريف 2022. هذه ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، باستثناء مواد الأطراف الثالثة المحددة في الأصل. أرقام الأقسام هي أرقام الشرائح، بما فيها الشرائح المتكررة التي توضّح خطوات العرض.</p>
<h2 id="الشريحة-1-الاستدعاء-الذاتي">الشريحة 1 — الاستدعاء الذاتي</h2>
<p>نزّل الشرائح وملفات <code>.py</code> للمتابعة. المحاضرة 15 من 6.100L — Ana Bell.</p>
<h2 id="الشريحة-2-الخوارزميات-التكرارية-حتى-الآن">الشريحة 2 — الخوارزميات التكرارية حتى الآن</h2>
<ul>
<li>تؤدي بُنى الحلقات، أي حلقات <code>while</code> و<code>for</code>، إلى خوارزميات تكرارية (Iterative algorithms).</li>
<li>يمكن تمثيل الحساب بمجموعة من متغيرات الحالة (State variables)، تتحدث وفق قواعد في كل دورة من الحلقة:
<ul>
<li>ما الذي يتغير كل مرة، وكيف؟</li>
<li>كيف أتتبع عدد مرات المرور بالحلقة؟</li>
<li>متى يمكنني التوقف؟</li>
<li>أين تكون النتيجة عندما أتوقف؟</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-3-الضرب">الشريحة 3 — الضرب</h2>
<ul>
<li>ينفّذ المعامل <code>*</code> ذلك لنا.</li>
<li>أنشئ دالة:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mult</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a*b
</code></pre>
<h2 id="الشريحة-4-الضرب-فكر-باستخدام-التكرار">الشريحة 4 — الضرب: فكّر باستخدام التكرار</h2>
<ul>
<li>هل تستطيع جعل هذه العملية تكرارية؟</li>
<li>عرّف <code>a*b</code> بوصفه <code>a+a+a+a...</code>، عدد <code>b</code> من المرات.</li>
<li>اكتب دالة:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mult</span>(<span class="hljs-params">a, b</span>):
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(b):
        total += a
    <span class="hljs-keyword">return</span> total
</code></pre>
<h2 id="الشريحة-5-الضرب-حل-تكراري-آخر">الشريحة 5 — الضرب: حل تكراري آخر</h2>
<ul>
<li>«اضرب <code>a * b</code>» يكافئ «اجمع <code>b</code> نسخ من <code>a</code>».</li>
<li>مثّل الحالة باستخدام:
<ul>
<li>رقم دورة <code>i</code> يبدأ من <code>b</code>: حدّثه وفق <code>i ← i-1</code> وتوقف عند الصفر.</li>
<li>القيمة الحالية للحساب <code>result</code> التي تبدأ من الصفر: حدّثها وفق <code>result ← result + a</code>.</li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>وصف المترجم للمخطط:</strong> على امتداد <code>a + a + a + a + … + a</code>، تشير الأسهم إلى تقدم الحساب. تكون قيم <code>result</code> بالتتابع <code>0</code> ثم <code>a</code> ثم <code>2a</code> ثم <code>3a</code> ثم <code>4a</code>، مع الانتقال إلى الحد التالي في كل دورة.</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mult_iter</span>(<span class="hljs-params">a, b</span>):
    result = <span class="hljs-number">0</span>
    <span class="hljs-keyword">while</span> b &gt; <span class="hljs-number">0</span>:
        result += a
        b -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> result
</code></pre>
<h2 id="الشريحة-6-الضرب-لاحظ-الأنماط-العودية">الشريحة 6 — الضرب: لاحظ الأنماط العودية</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:
<ul>
<li><code>5*4</code> هي <code>5+5*3</code>.</li>
<li>لكن هذا يساوي <code>5+5+5*2</code>.</li>
<li>وهذا يساوي <code>5+5+5+5*1</code>.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-7-الضرب-ابحث-عن-نسخ-أصغر-من-المسألة">الشريحة 7 — الضرب: ابحث عن نسخ أصغر من المسألة</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    5*3    )
= 5+(5+( 5*2 ))
= 5+(5+(5+(5*1)))
</code></pre>
<h2 id="الشريحة-8-الضرب-ابحث-عن-نسخ-أصغر-من-المسألة">الشريحة 8 — الضرب: ابحث عن نسخ أصغر من المسألة</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    5*3    )
= 5+(5+( 5*2 ))
= 5+(5+(5+(5*1)))
</code></pre>
<h2 id="الشريحة-9-الضرب-ابحث-عن-نسخ-أصغر-من-المسألة">الشريحة 9 — الضرب: ابحث عن نسخ أصغر من المسألة</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    5*3    )
= 5+(5+( 5*2 ))
= 5+(5+(5+(5*1)))
</code></pre>
<h2 id="الشريحة-10-الضرب-وصلنا-إلى-النهاية">الشريحة 10 — الضرب: وصلنا إلى النهاية</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    5*3    )
= 5+(5+( 5*2 ))
= 5+(5+(5+(5*1)))
</code></pre>
<h2 id="الشريحة-11-الضرب-أعد-بناء-النتيجة-صعودا">الشريحة 11 — الضرب: أعد بناء النتيجة صعودًا</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    5*3    )
= 5+(5+( 5*2 ))
= 5+(5+(5+( 5 )))
</code></pre>
<h2 id="الشريحة-12-الضرب-أعد-بناء-النتيجة-صعودا">الشريحة 12 — الضرب: أعد بناء النتيجة صعودًا</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    5*3    )
= 5+(5+( 10    ))
= 5+(5+(5+( 5 )))
</code></pre>
<h2 id="الشريحة-13-الضرب-أعد-بناء-النتيجة-صعودا">الشريحة 13 — الضرب: أعد بناء النتيجة صعودًا</h2>
<ul>
<li>لاحظ أن لدينا مسألة نحلها مرات كثيرة.</li>
<li>إذا كان <code>a = 5</code> و<code>b = 4</code>، فإن <code>5*4</code> هي <code>5+5+5+5</code>.</li>
<li>فكّك المسألة الأصلية إلى شيء تعرفه وإلى المسألة نفسها مجددًا.</li>
<li>المسألة الأصلية تستخدم <code>*</code> بين عددين:</li>
</ul>
<pre><code class="language-text">5*4
= 5+(    15     )
= 5+(5+( 10    ))
= 5+(5+(5+( 5 )))
</code></pre>
<h2 id="الشريحة-14-الضرب-الخطوة-العودية-والحالة-الأساسية">الشريحة 14 — الضرب: الخطوة العودية والحالة الأساسية</h2>
<ul>
<li>الخطوة العودية (Recursive step): قرر كيف تختزل المسألة إلى نسخة أبسط أو أصغر من المسألة نفسها، مع عمليات بسيطة إضافية.</li>
</ul>
<pre><code class="language-text">a*b = a + a + a + a + … + a
    = a + (a + a + a + … + a)
    = a + a * (b-1)
</code></pre>
<blockquote>
<p><strong>وصف المترجم للمخطط:</strong> القوس الأول يحدد <code>b</code> مرات من <code>a</code>، ثم يُفصل أول <code>a</code>، ليصبح تحت القوس الآخر <code>b-1</code> مرات. السهم الموسوم «الاختزال العودي» يصل هذا الجزء بالتعبير <code>a * (b-1)</code>.</p>
</blockquote>
<h2 id="الشريحة-15-الضرب-الخطوة-العودية-والحالة-الأساسية">الشريحة 15 — الضرب: الخطوة العودية والحالة الأساسية</h2>
<ul>
<li>الخطوة العودية: قرر كيف تختزل المسألة إلى نسخة أبسط أو أصغر من المسألة نفسها، مع عمليات بسيطة إضافية.</li>
</ul>
<pre><code class="language-text">a*b = a + a + a + a + … + a
    = a + (a + a + a + … + a)
    = a + a * (b-1)
</code></pre>
<ul>
<li>الحالة الأساسية (Base case): استمر في اختزال المسألة حتى تصل إلى حالة بسيطة يمكن حلها مباشرة.</li>
<li>عندما <code>b=1</code>، يكون <code>a*b=a</code>.</li>
</ul>
<blockquote>
<p><strong>وصف المترجم للمخطط:</strong> يتكرر اختزال عدد الحدود من <code>b</code> إلى <code>b-1</code> الموضح في الشريحة السابقة، وتُضاف هنا قاعدة التوقف عند <code>b=1</code>.</p>
</blockquote>
<h2 id="الشريحة-16-الضرب-الكود-العودي">الشريحة 16 — الضرب: الكود العودي</h2>
<p>إحالة الشريحة: Python Tutor.</p>
<ul>
<li>الخطوة العودية: إذا كان <code>b != 1</code>، فإن <code>a*b = a + a*(b-1)</code>.</li>
<li>الحالة الأساسية: إذا كان <code>b = 1</code>، فإن <code>a*b = a</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mult_recur</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">if</span> b == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> a
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> a + mult_recur(a, b-<span class="hljs-number">1</span>)
</code></pre>
<h2 id="الشريحة-17-مثال-واقعي-استدعاء-دالة-واحد-فقط">الشريحة 17 — مثال واقعي: استدعاء دالة واحد فقط</h2>
<p>طالب يطلب إعادة التصحيح.</p>
<p>الطريقة التكرارية:</p>
<ul>
<li>يسأل الطالب الأستاذ، ثم مساعد التدريس (TA)، ثم مساعد التعلّم (LA)، ثم المصحّح، واحدًا تلو الآخر، حتى يعيد واحد أو أكثر تصحيح الامتحان أو أجزاء منه.</li>
<li>يمر الطالب على الجميع ويتتبع الدرجة الجديدة.</li>
</ul>
<blockquote>
<p><strong>وصف المترجم بدل الصور المستثناة:</strong> يظهر الطالب متصلًا بكل شخص على حدة؛ يرسل إلى كل منهم «إعادة التصحيح، من فضلك؟» ويستقبل «تفضل النتيجة». الطالب نفسه يدير التتابع ويجمع النتيجة، ولا يطلب هؤلاء الأشخاص من بعضهم تنفيذ المهمة.</p>
</blockquote>
<p>إشعار حقوق الصور في الأصل: صورة فتاة الميم © مصدر غير معروف؛ صورة المرأة © 2007 NBC Universal؛ Willy Wonka © 1971 Warner Bros. Entertainment Inc.؛ لقطة Bridesmaids © 2011 Universal Studios؛ لقطة Cocoon © 2011 Universal Studios. جميع الحقوق محفوظة. هذا المحتوى مستثنى من ترخيص المشاع الإبداعي؛ <a href="https://ocw.mit.edu/help/faq-fair-use/">معلومات الاستخدام العادل لدى OCW</a>. لم تُنقل أي من هذه الصور إلى الترجمة.</p>
<h2 id="الشريحة-18-مثال-واقعي-استدعاءات-دوال-كثيرة">الشريحة 18 — مثال واقعي: استدعاءات دوال كثيرة</h2>
<p>طالب يطلب إعادة التصحيح.</p>
<p>الطريقة العودية:</p>
<ol>
<li>طلب الطالب، أي استدعاء دالة لإعادة التصحيح:
<ul>
<li>يطلب من الأستاذ إعادة التصحيح.</li>
<li>يطلب الأستاذ من مساعد التدريس إعادة التصحيح.</li>
<li>يطلب مساعد التدريس من مساعد التعلّم إعادة التصحيح.</li>
<li>يطلب مساعد التعلّم من المصحّح إعادة التصحيح.</li>
</ul>
</li>
<li>تمرير النتائج، أي إن الدوال تُرجع النتائج إلى من استدعاها:
<ul>
<li>يخبر المصحّح مساعد التعلّم بالدرجة.</li>
<li>يخبر مساعد التعلّم مساعد التدريس بالدرجة.</li>
<li>يخبر مساعد التدريس الأستاذ بالدرجة.</li>
<li>يخبر الأستاذ الطالب بالدرجة.</li>
</ul>
</li>
</ol>
<blockquote>
<p><strong>وصف المترجم بدل الصور المستثناة:</strong> سلسلة الطلبات هي الطالب ← الأستاذ ← مساعد التدريس ← مساعد التعلّم ← المصحّح، ومعنى كل وصلة إلى المستوى التالي «إعادة التصحيح، من فضلك؟». تعود الإجابة «تفضل النتيجة» على الوصلات بالترتيب العكسي، حتى الطالب. الاتجاه المقصود للطلب هو من الطالب إلى المصحّح، وللنتيجة من المصحّح إلى الطالب.</p>
</blockquote>
<p>إشعار حقوق الصور في الأصل هو نفسه في الشريحة 17: فتاة الميم، وصورة المرأة © 2007 NBC Universal، وWilly Wonka © 1971 Warner Bros. Entertainment Inc.، ولقطتا Bridesmaids وCocoon © 2011 Universal Studios. جميع الحقوق محفوظة؛ الصور مستثناة من ترخيص المشاع الإبداعي ولم تُعَد هنا. <a href="https://ocw.mit.edu/help/faq-fair-use/">معلومات OCW</a>.</p>
<h2 id="الشريحة-19-الفكرة-الكبرى">الشريحة 19 — الفكرة الكبرى</h2>
<p>تنتظر استدعاءات الدوال «الأسبق» النتائج قبل أن تكتمل.</p>
<h2 id="الشريحة-20-ما-الاستدعاء-الذاتي">الشريحة 20 — ما الاستدعاء الذاتي؟</h2>
<ul>
<li>خوارزميًا: طريقة لتصميم حلول للمسائل بأسلوب «قسّم وتغلّب» (Divide-and-conquer) أو «قلّص وتغلّب» (Decrease-and-conquer).
<ul>
<li>اختزل المسألة إلى نسخ أبسط من نفسها، أو إلى مسألة يمكن حلها مباشرة.</li>
</ul>
</li>
<li>من ناحية الدلالة البرمجية: تقنية تستدعي فيها الدالة نفسها.
<ul>
<li>في البرمجة، الهدف <strong>ألّا يكون الاستدعاء الذاتي لا نهائيًا</strong>.</li>
<li>لا بد من حالة أساسية أو أكثر يسهل حلها مباشرة.</li>
<li>لا بد من حل المسألة نفسها على مدخل آخر، بغرض تبسيط المسألة ذات المدخل الأكبر، وانتهاءً بالحالة الأساسية.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-21-جرب-بنفسك">الشريحة 21 — جرّب بنفسك!</h2>
<p>أكمل الدالة التي تحسب <code>n</code> مرفوعًا إلى القوة <code>p</code>، أي <code>nᵖ</code>، للمتغيرين <code>n</code> و<code>p</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">power_recur</span>(<span class="hljs-params">n, p</span>):
    <span class="hljs-keyword">if</span> _______:
        <span class="hljs-keyword">return</span> ______
    <span class="hljs-keyword">elif</span> _______:
        <span class="hljs-keyword">return</span> ______
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> _________________
</code></pre>
<h2 id="الشريحة-22-المضروب-factorial">الشريحة 22 — المضروب (Factorial)</h2>
<pre><code class="language-text">n! = n*(n-1)*(n-2)*(n-3)* … * 1
</code></pre>
<ul>
<li>لأي <code>n</code> نعرف المضروب؟ عند <code>n=1</code>:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">if</span> n == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
</code></pre>
<ul>
<li>كيف نختزل المسألة؟ أعد كتابتها باستخدام شيء أبسط للوصول إلى الحالة الأساسية: <code>n*(n-1)!</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">return</span> n*fact(n-<span class="hljs-number">1</span>)
</code></pre>
<h2 id="الشريحة-23-مثال-نطاق-الدالة-العودية-scope">الشريحة 23 — مثال نطاق الدالة العودية (Scope)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fact</span>(<span class="hljs-params">n</span>):
    <span class="hljs-keyword">if</span> n == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> n*fact(n-<span class="hljs-number">1</span>)

<span class="hljs-built_in">print</span>(fact(<span class="hljs-number">4</span>))
</code></pre>
<blockquote>
<p><strong>وصف المترجم للمخطط:</strong> في النطاق العام (Global scope)، يرتبط الاسم <code>fact</code> بالكود. تُنشأ نطاقات مستقلة: نطاق <code>fact</code> باستدعاء <code>n=4</code>، ثم <code>n=3</code>، ثم <code>n=2</code>، ثم <code>n=1</code>. لكل نطاق اسم <code>n</code> الخاص به وقيمته. يُرجع الأخير <code>1</code>، وهي الحالة الأساسية؛ ينتظر السابق <code>2*fact(1)</code> ثم يُرجع <code>2*1</code>، ويليه <code>3*fact(2)</code> ثم <code>3*2</code>، ويليه <code>4*fact(3)</code> ثم <code>4*6</code>. يعود التنفيذ إلى <code>print(fact(4))</code> فيصبح <code>print(24)</code>.</p>
</blockquote>
<h2 id="الشريحة-24-الفكرة-الكبرى">الشريحة 24 — الفكرة الكبرى</h2>
<p>في الاستدعاء الذاتي، يكون كل استدعاء دالة منفصلًا تمامًا.</p>
<p>نطاقات وبيئات منفصلة، وأسماء متغيرات منفصلة. استقلال تام.</p>
<h2 id="الشريحة-25-بعض-الملاحظات">الشريحة 25 — بعض الملاحظات</h2>
<p>إحالة الشريحة: Python Tutor للمضروب.</p>
<ul>
<li>يُنشئ كل استدعاء عودي للدالة نطاقه وبيئته الخاصة.</li>
<li>لا تتغير ارتباطات المتغيرات (Bindings) في نطاق بسبب الاستدعاء العودي للدالة نفسها.</li>
<li>تحجب قيم ارتباطات المتغيرات ارتباطاتها في الإطارات الأخرى (Frames).</li>
<li>يعود تدفق التحكم (Control flow) إلى النطاق السابق بمجرد أن يُرجع استدعاء الدالة قيمة.</li>
</ul>
<h2 id="الشريحة-26-التكرار-مقابل-الاستدعاء-الذاتي">الشريحة 26 — التكرار مقابل الاستدعاء الذاتي</h2>
<p>التكرار:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial_iter</span>(<span class="hljs-params">n</span>):
    prod = <span class="hljs-number">1</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>,n+<span class="hljs-number">1</span>):
        prod *= i
    <span class="hljs-keyword">return</span> prod
</code></pre>
<p>الاستدعاء الذاتي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fact_recur</span>(<span class="hljs-params">n</span>):
    <span class="hljs-keyword">if</span> n == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> n*fact_recur(n-<span class="hljs-number">1</span>)
</code></pre>
<p>تعليق الشريحة على النسخة العودية: «هذه النسخة أقرب كثيرًا إلى أسلوب Python (Pythonic)!»</p>
<ul>
<li>قد يكون الاستدعاء الذاتي كفؤًا من منظور المبرمج.</li>
<li>قد لا يكون كفؤًا من منظور الحاسوب.</li>
</ul>
<h2 id="الشريحة-27-متى-تستخدم-الاستدعاء-الذاتي">الشريحة 27 — متى تستخدم الاستدعاء الذاتي؟</h2>
<p>رأينا حتى الآن كودًا بسيطًا جدًا.</p>
<ul>
<li>لم يحتج ضرب عددين إلى دالة عودية، ولم يحتج حتى إلى دالة تكرارية!</li>
<li>كان تنفيذ المضروب بالاستدعاء الذاتي أكثر بداهة بعض الشيء.
<ul>
<li>ترجمنا معادلة رياضية أخبرتنا بالبنية المطلوبة.</li>
</ul>
</li>
<li><strong>معظم</strong> المسائل لا تحتاج إلى الاستدعاء الذاتي لحلها.
<ul>
<li>إذا كان التكرار أكثر بداهة لك، فحلّها باستخدام الحلقات!</li>
</ul>
</li>
<li>تؤدي <strong>بعض</strong> المسائل إلى كود أبسط كثيرًا باستخدام الاستدعاء الذاتي:
<ul>
<li>البحث في نظام ملفات عن ملف محدد.</li>
<li>تقييم تعبيرات رياضية تستخدم الأقواس لتحديد ترتيب العمليات.</li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>وصف المترجم للمخطط:</strong> مجلد <code>Tom</code> يتفرع إلى <code>Data</code> و<code>Thesis</code> و<code>Notes.txt</code> و<code>Tools</code>. يحتوي <code>Data</code> على <code>One.txt</code> و<code>Two.txt</code>، ويحتوي <code>Tools</code> على <code>Format</code> و<code>Stats</code> و<code>Old</code>. يمكن تطبيق البحث نفسه على كل مجلد فرعي. ويوضح مخطط ترتيب العمليات الاختصار <code>PEMDAS</code>: الأقواس (Parentheses)، الأسس (Exponents)، الضرب والقسمة (Multiplication/Division)، ثم الجمع والطرح (Addition/Subtraction).</p>
</blockquote>
<h2 id="الشريحة-28-خلاصة-الشريحة-الأصلية">الشريحة 28 — خلاصة الشريحة الأصلية</h2>
<ul>
<li>الاستدعاء الذاتي:
<ul>
<li>أسلوب برمجة.</li>
<li>طريقة للتقسيم والتغلّب.</li>
</ul>
</li>
<li>تستدعي الدالة نفسها.</li>
<li>تُفكك المسألة إلى حالة أساسية وخطوة عودية.</li>
<li>الحالة الأساسية:
<ul>
<li>شيء تعرفه.</li>
<li>ستصل إلى هذه الحالة في النهاية؛ وإلا فلديك استدعاء ذاتي لا نهائي.</li>
</ul>
</li>
<li>الخطوة العودية:
<ul>
<li>المسألة نفسها.</li>
<li>مختلفة قليلًا على نحو يؤدي في النهاية إلى الحالة الأساسية.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-29-إشعار-المصدر">الشريحة 29 — إشعار المصدر</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
`,d={book:n,chapter:e,chapterTitle:l,slug:s,title:o,headings:a,html:c};export{n as book,e as chapter,l as chapterTitle,d as default,a as headings,c as html,s as slug,o as title};
