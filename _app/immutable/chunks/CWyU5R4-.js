const s="mit-6100l",n="lecture-25",a="المحاضرة 25: الرسم البياني (Plotting)",l="notes",p="المحاضرة 25: الرسم البياني (Plotting)",e=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-الرسم-البياني-plotting",text:"الشريحة 1: الرسم البياني (Plotting)"},{depth:2,id:"الشريحة-2-لماذا-نرسم",text:"الشريحة 2: لماذا نرسم؟"},{depth:2,id:"الشريحة-3-مكتبة-matplotlib",text:"الشريحة 3: مكتبة Matplotlib"},{depth:2,id:"الشريحة-4-مثال-بسيط",text:"الشريحة 4: مثال بسيط"},{depth:2,id:"الشريحة-5-رسم-البيانات",text:"الشريحة 5: رسم البيانات"},{depth:2,id:"الشريحة-6-مثال",text:"الشريحة 6: مثال"},{depth:2,id:"الشريحة-7-ترتيب-النقاط-مهم",text:"الشريحة 7: ترتيب النقاط مهم"},{depth:2,id:"الشريحة-8-مثال-غير-مرتب",text:"الشريحة 8: مثال غير مرتّب"},{depth:2,id:"الشريحة-9-الرسم-المبعثر-scatter-plot-لا-يوصل-نقاط-البيانات",text:"الشريحة 9: الرسم المبعثر (Scatter Plot) لا يوصّل نقاط البيانات"},{depth:2,id:"الشريحة-10-إظهار-كل-البيانات-على-رسم-واحد",text:"الشريحة 10: إظهار كل البيانات على رسم واحد"},{depth:2,id:"الشريحة-11-إنتاج-عدة-رسوم-بيانية",text:"الشريحة 11: إنتاج عدّة رسوم بيانية"},{depth:2,id:"الشريحة-12-شيفرة-المثال",text:"الشريحة 12: شيفرة المثال"},{depth:2,id:"الشريحة-13-عرض-quad",text:"الشريحة 13: عرض quad"},{depth:2,id:"الشريحة-14-عرض-cube",text:"الشريحة 14: عرض cube"},{depth:2,id:"الشريحة-15-عرض-lin",text:"الشريحة 15: عرض lin"},{depth:2,id:"الشريحة-16-عرض-expo",text:"الشريحة 16: عرض expo"},{depth:2,id:"الشريحة-17-مثال-واقعي",text:"الشريحة 17: مثال «واقعي»"},{depth:2,id:"الشريحة-18-مثال-واقعي",text:"الشريحة 18: مثال «واقعي»"},{depth:2,id:"الشريحة-19-مثال-واقعي",text:"الشريحة 19: مثال «واقعي»"},{depth:2,id:"الشريحة-20-مثال-واقعي",text:"الشريحة 20: مثال «واقعي»"},{depth:2,id:"الشريحة-21-مثال-واقعي",text:"الشريحة 21: مثال «واقعي»"},{depth:2,id:"الشريحة-22-إضافة-خطوط-الشبكة",text:"الشريحة 22: إضافة خطوط الشبكة"},{depth:2,id:"الشريحة-23-لنضف-مدينة-أخرى",text:"الشريحة 23: لنضف مدينة أخرى"},{depth:2,id:"الشريحة-24-لكن-أين-أنا",text:"الشريحة 24: لكن أين أنا؟"},{depth:2,id:"الشريحة-25-لنضف-مدينة-أخرى",text:"الشريحة 25: لنضف مدينة أخرى"},{depth:2,id:"الشريحة-26-رسم-بمنحنيين",text:"الشريحة 26: رسم بمنحنيين"},{depth:2,id:"الشريحة-27-التحكم-في-المعاملات",text:"الشريحة 27: التحكّم في المعاملات"},{depth:2,id:"الشريحة-28-التحكم-في-اللون-والنمط",text:"الشريحة 28: التحكّم في اللون والنمط"},{depth:2,id:"الشريحة-29-التحكم-في-اللون-والنمط",text:"الشريحة 29: التحكّم في اللون والنمط"},{depth:2,id:"الشريحة-30-استخدام-الكلمات-المفتاحية",text:"الشريحة 30: استخدام الكلمات المفتاحية"},{depth:2,id:"الشريحة-31-التحكم-في-اللون-والنمط",text:"الشريحة 31: التحكّم في اللون والنمط"},{depth:2,id:"الشريحة-32-خيارات-الخط-واللون-والعلامة",text:"الشريحة 32: خيارات الخط واللون والعلامة"},{depth:2,id:"الشريحة-33-التحكم-في-اللون-والنمط",text:"الشريحة 33: التحكّم في اللون والنمط"},{depth:2,id:"الشريحة-34-مع-العلامات",text:"الشريحة 34: مع العلامات"},{depth:2,id:"الشريحة-35-التحكم-في-عرض-الخط",text:"الشريحة 35: التحكّم في عرض الخط"},{depth:2,id:"الشريحة-36-خيارات-أخرى-كثيرة",text:"الشريحة 36: خيارات أخرى كثيرة"},{depth:2,id:"الشريحة-37-رسوم-داخل-رسوم",text:"الشريحة 37: رسوم داخل رسوم"},{depth:2,id:"الشريحة-38-ويتسع-الرسم",text:"الشريحة 38: ويتّسع الرسم"},{depth:2,id:"الشريحة-39-رسوم-داخل-رسوم",text:"الشريحة 39: رسوم داخل رسوم"},{depth:2,id:"الشريحة-40-ويتسع-الرسم",text:"الشريحة 40: ويتّسع الرسم"},{depth:2,id:"الشريحة-41-كثير-من-الأجزاء-الفرعية",text:"الشريحة 41: كثير من الأجزاء الفرعية"},{depth:2,id:"الشريحة-42-ويتسع-الرسم",text:"الشريحة 42: ويتّسع الرسم"},{depth:2,id:"الشريحة-43-سكان-الولايات-المتحدة-مثال",text:"الشريحة 43: سكان الولايات المتحدة — مثال"},{depth:2,id:"الشريحة-44-مثال-أكثر-إثارة-للاهتمام",text:"الشريحة 44: مثال أكثر إثارة للاهتمام"},{depth:2,id:"الشريحة-45-ملف-الإدخال",text:"الشريحة 45: ملف الإدخال"},{depth:2,id:"الشريحة-46-رسم-البيانات",text:"الشريحة 46: رسم البيانات"},{depth:2,id:"الشريحة-47-نمو-السكان",text:"الشريحة 47: نمو السكان"},{depth:2,id:"الشريحة-48-تغيير-المقياس",text:"الشريحة 48: تغيير المقياس"},{depth:2,id:"الشريحة-49-نمو-السكان",text:"الشريحة 49: نمو السكان"},{depth:2,id:"الشريحة-50-أيهما-وجدته-أكثر-إفادة",text:"الشريحة 50: أيّهما وجدته أكثر إفادة؟"},{depth:2,id:"الشريحة-51-سكان-الدول-مثال",text:"الشريحة 51: سكان الدول — مثال"},{depth:2,id:"الشريحة-52-ملف-البيانات",text:"الشريحة 52: ملف البيانات"},{depth:2,id:"الشريحة-53-تحميل-البيانات-ورسمها",text:"الشريحة 53: تحميل البيانات ورسمها"},{depth:2,id:"الشريحة-54-أحجام-السكان",text:"الشريحة 54: أحجام السكان"},{depth:2,id:"الشريحة-55-تحقيق-غريب-الخانات-الأولى",text:"الشريحة 55: تحقيق غريب: الخانات الأولى"},{depth:2,id:"الشريحة-56-تكرار-كل-خانة",text:"الشريحة 56: تكرار كل خانة"},{depth:2,id:"الشريحة-57-مقارنة-المدن-مثال",text:"الشريحة 57: مقارنة المدن — مثال"},{depth:2,id:"الشريحة-58-مثال-موسع",text:"الشريحة 58: مثال موسّع"},{depth:2,id:"الشريحة-59-ملف-البيانات",text:"الشريحة 59: ملف البيانات"},{depth:2,id:"الشريحة-60-temperaturescsv-استخراج-البيانات",text:"الشريحة 60: temperatures.csv — استخراج البيانات"},{depth:2,id:"الشريحة-61-متوسطات-الحرارة",text:"الشريحة 61: متوسطات الحرارة"},{depth:2,id:"الشريحة-62-ودرجة-الحرارة-هي",text:"الشريحة 62: ودرجة الحرارة هي …"},{depth:2,id:"الشريحة-63-لكن-الأكثر-إثارة-هو-النظر-في-التغير-عبر-الزمن",text:"الشريحة 63: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن"},{depth:2,id:"الشريحة-64-لكن-الأكثر-إثارة-هو-النظر-في-التغير-عبر-الزمن",text:"الشريحة 64: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن"},{depth:2,id:"الشريحة-65-الطفل-بارد-في-الخارج",text:"الشريحة 65: «الطفل بارد في الخارج!»"},{depth:2,id:"الشريحة-66-لكن-ما-معنى-التباين-variation",text:"الشريحة 66: لكن ما معنى التباين (Variation)؟"},{depth:2,id:"الشريحة-67-لكن-ما-معنى-التباين",text:"الشريحة 67: لكن ما معنى التباين؟"},{depth:2,id:"الشريحة-68-أمثلة-على-بعض-المدن",text:"الشريحة 68: أمثلة على بعض المدن"},{depth:2,id:"الشريحة-69-استخدم-المدى-نفسه-على-المحور-الرأسي-لكل-الرسوم",text:"الشريحة 69: استخدم المدى نفسه على المحور الرأسي لكل الرسوم"},{depth:2,id:"الشريحة-70-مقارنة-أفضل-بين-المدن",text:"الشريحة 70: مقارنة أفضل بين المدن"},{depth:2,id:"الشريحة-71-كم-يوما-كانت-حرارته-في-1961",text:"الشريحة 71: كم يومًا كانت حرارته…؟ في 1961؟"},{depth:2,id:"الشريحة-72-كم-يوما-كانت-حرارته-في-1961",text:"الشريحة 72: كم يومًا كانت حرارته…؟ في 1961؟"},{depth:2,id:"الشريحة-73-هل-san-diego-مملة",text:"الشريحة 73: هل San Diego مملّة؟"},{depth:2,id:"الشريحة-74-التغير-عبر-الزمن",text:"الشريحة 74: التغيّر عبر الزمن؟"},{depth:2,id:"الشريحة-75-تراكب-الأعمدة-overlay-bar-charts",text:"الشريحة 75: تراكب الأعمدة (Overlay Bar Charts)"},{depth:2,id:"الشريحة-76-أو-يمكن-الرسم-على-حدة",text:"الشريحة 76: أو يمكن الرسم على حدة"},{depth:2,id:"الشريحة-77-يمكن-التحكم-في-أشياء-كثيرة-أخرى",text:"الشريحة 77: يمكن التحكّم في أشياء كثيرة أخرى"},{depth:2,id:"الشريحة-78-mit-opencourseware",text:"الشريحة 78: MIT OpenCourseWare"},{depth:2,id:"ملف-الشيفرة-الكامل-lec25py",text:"ملف الشيفرة الكامل (lec25.py)"}],t=`<h1>المحاضرة 25: الرسم البياني (Plotting)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة على MIT OpenCourseWare: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-25-plotting/</li>
<li>ملف الشرائح (صفحة الوصف): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec25_pdf/</li>
<li>ملف الشرائح (PDF مباشر): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec25.pdf</li>
<li>ملف الشيفرة: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec25_code_zip/</li>
<li>تفريغ المحاضرة على MIT OpenCourseWare (بالإنجليزية): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec25/</li>
<li>الترخيص: CC BY-NC-SA 4.0 — https://creativecommons.org/licenses/by-nc-sa/4.0/</li>
<li>شروط الاستخدام في MIT OpenCourseWare: https://ocw.mit.edu/terms/</li>
</ul>
<p><strong>منهج الترجمة:</strong> نُقلت هذه المحاضرة ترجمةً عربية كاملة أمينة لشرائح MIT الأصلية تحت رخصة CC BY-NC-SA 4.0، التي تسمح بإعادة التوزيع مع الإسناد وذكر التغييرات وبشرط الاستخدام غير التجاري وأن تُوزَّع كل ترجمة مشتقّة تحت الرخصة نفسها. ملف هذه المحاضرة لا يحمل أي إشعار حقوق طرف ثالث؛ لذلك تُعرض أسفل كل عنوان صورة الشريحة الأصلية كاملةً كما وردت في ملف MIT، ويليها النصّ العربي لمحتواها. أُبقيت الشيفرة وأسماء دوال matplotlib بالإنجليزية كما هي، وأُلحق في نهاية الصفحة ملف الشيفرة الكامل <code>lec25.py</code> كما نشرته MIT؛ إذ إن الشيفرة المعروضة داخل الشرائح جزءٌ من صورها لا نصًّا مستخرَجًا. أسماء ملفات البيانات في الشرائح (<code>USPopulation.txt</code> و<code>countryPops.txt</code> و<code>temperatures.csv</code>) تظهر داخل حزمة الشيفرة بالأسماء <code>lec25_USPopulation.txt</code> و<code>lec25_countryPops.txt</code> و<code>lec25_temperatures.csv</code>.</p>
<h2 id="الشريحة-1-الرسم-البياني-plotting">الشريحة 1: الرسم البياني (Plotting)</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-01.webp" alt="الشريحة 1: الرسم البياني (Plotting)"></p>
<p>هذه المحاضرة عن الرسم البياني. يُرفق ملف الشرائح وملفات <code>.py</code> للمتابعة جنبًا إلى جنب.</p>
<h2 id="الشريحة-2-لماذا-نرسم">الشريحة 2: لماذا نرسم؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-02.webp" alt="الشريحة 2: لماذا نرسم؟"></p>
<ul>
<li>عاجلًا أم آجلًا، سيحتاج الجميع إلى إنتاج رسوم بيانية.</li>
<li>تساعدنا على تصوّر البيانات (visualize data) لرؤية الاتجاهات، وطرح أسئلة حاسوبية نختبرها.</li>
<li>إن التحقت بمقرر 6.100B فستستخدمها على نطاق واسع.</li>
<li>أمّا من يغادرنا بعد الأسبوع المقبل فهذه طريقة قيّمة لتصوّر البيانات.</li>
<li>هذا مثال على الاستفادة من مكتبة موجودة بدل كتابة الإجراءات (procedures) من الصفر.</li>
<li>تقدّم Python مكتبات من أجل:
<ul>
<li>الرسم البياني (Plotting)</li>
<li>الحساب العددي (Numerical computation)</li>
<li>الحساب العشوائي (Stochastic computation)</li>
<li>وغيرها كثير.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-3-مكتبة-matplotlib">الشريحة 3: مكتبة Matplotlib</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-03.webp" alt="الشريحة 3: مكتبة Matplotlib"></p>
<ul>
<li>يمكن استيراد المكتبة إلى بيئة الحساب:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
</code></pre>
<ul>
<li>يتيح هذا للشيفرة الإشارة إلى إجراءات المكتبة بالشكل <code>plt.&lt;processName&gt;</code>.</li>
<li>يوفّر الوصول إلى مجموعة موجودة من إجراءات الرسوم البيانية.</li>
<li>سنعرض اليوم بعض الأمثلة البسيطة فقط، ومعلومات إضافية كثيرة متاحة في التوثيق المرتبط بـ matplotlib.</li>
<li>سترى أمثلة وتفاصيل أخرى كثيرة لهذه الأفكار إن أخذت مقرر 6.100B.</li>
</ul>
<h2 id="الشريحة-4-مثال-بسيط">الشريحة 4: مثال بسيط</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-04.webp" alt="الشريحة 4: مثال بسيط"></p>
<p>الفكرة: أنشئ دوالًا مختلفة لمتغيّر <code>n</code>، ثم صوّر الفروق بينها.</p>
<h2 id="الشريحة-5-رسم-البيانات">الشريحة 5: رسم البيانات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-05.webp" alt="الشريحة 5: رسم البيانات"></p>
<ul>
<li>لتوليد رسم بياني:</li>
</ul>
<pre><code class="language-python">plt.plot(&lt;x values&gt;, &lt;y values&gt;)
</code></pre>
<ul>
<li>الوسائط قوائم (أو تسلسلات) من الأعداد.</li>
<li>يجب أن تكون القائمتان بالطول نفسه.</li>
<li>يولّد سلسلة قيم <code>&lt;x, y&gt;</code> على شبكة إحداثيات كارتزية (Cartesian grid).</li>
<li>تُرسم بالترتيب ثم تُوصَل بخطوط.</li>
<li>يمكن تغيير سطر أوامر iPython ليولّد الرسوم في نافذة جديدة، عبر Preferences:
<ul>
<li>مضمّنة داخل السطر (Inline in the console).</li>
<li>في نافذة جديدة (In a new window).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-6-مثال">الشريحة 6: مثال</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-06.webp" alt="الشريحة 6: مثال"></p>
<p>لاحظ كيف يملأ <code>matplotlib</code> الرسمَ الإطارَ (frame) تلقائيًا.</p>
<h2 id="الشريحة-7-ترتيب-النقاط-مهم">الشريحة 7: ترتيب النقاط مهم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-07.webp" alt="الشريحة 7: ترتيب النقاط مهم"></p>
<ul>
<li>لنفرض أنني أنشأت مجموعة قيم لـ <code>n</code> و لـ <code>n2</code>، لكن بترتيب عشوائي.</li>
<li>ترسم Python باستخدام ترتيب النقاط وتوصيل النقاط المتتالية.</li>
</ul>
<h2 id="الشريحة-8-مثال-غير-مرتب">الشريحة 8: مثال غير مرتّب</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-08.webp" alt="الشريحة 8: مثال غير مرتّب"></p>
<p>صورة تُظهر كيف يبدو الرسم حين تكون نقاط <code>n</code> غير مرتّبة.</p>
<h2 id="الشريحة-9-الرسم-المبعثر-scatter-plot-لا-يوصل-نقاط-البيانات">الشريحة 9: الرسم المبعثر (Scatter Plot) لا يوصّل نقاط البيانات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-09.webp" alt="الشريحة 9: الرسم المبعثر (Scatter Plot) لا يوصّل نقاط البيانات"></p>
<p>صورة توضّح الفرق: <code>plt.scatter</code> يرسم النقاط فقط بلا خطوط وصل.</p>
<h2 id="الشريحة-10-إظهار-كل-البيانات-على-رسم-واحد">الشريحة 10: إظهار كل البيانات على رسم واحد</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-10.webp" alt="الشريحة 10: إظهار كل البيانات على رسم واحد"></p>
<p>صورة تُظهر ما يحدث عند جمع كل البيانات في رسم بياني واحد.</p>
<h2 id="الشريحة-11-إنتاج-عدة-رسوم-بيانية">الشريحة 11: إنتاج عدّة رسوم بيانية</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-11.webp" alt="الشريحة 11: إنتاج عدّة رسوم بيانية"></p>
<ul>
<li>لنرسم كلًّا منها في إطار/نافذة منفصلة. نستدعي:</li>
</ul>
<pre><code class="language-python">plt.figure(&lt;arg&gt;)
</code></pre>
<ul>
<li>ينشئ عرضًا جديدًا بهذا الاسم إن لم يكن موجودًا.</li>
<li>وإذا كان هناك عرض بهذا الاسم، فإعادة فتحه لمعالجة إضافية.</li>
</ul>
<h2 id="الشريحة-12-شيفرة-المثال">الشريحة 12: شيفرة المثال</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-12.webp" alt="الشريحة 12: شيفرة المثال"></p>
<p>تعرض الشريحة شيفرة المثال الكاملة التي تُنتج الرسوم الأربعة التالية، وهي ضمن ملف <code>lec25.py</code> الملحق في نهاية الصفحة.</p>
<h2 id="الشريحة-13-عرض-quad">الشريحة 13: عرض <code>quad</code></h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-13.webp" alt="الشريحة 13: عرض "></p>
<p>صورة الرسم البياني للدالة التربيعية.</p>
<h2 id="الشريحة-14-عرض-cube">الشريحة 14: عرض <code>cube</code></h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-14.webp" alt="الشريحة 14: عرض "></p>
<p>صورة الرسم البياني للدالة التكعيبية.</p>
<h2 id="الشريحة-15-عرض-lin">الشريحة 15: عرض <code>lin</code></h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-15.webp" alt="الشريحة 15: عرض "></p>
<p>صورة الرسم البياني للدالة الخطّية.</p>
<h2 id="الشريحة-16-عرض-expo">الشريحة 16: عرض <code>expo</code></h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-16.webp" alt="الشريحة 16: عرض "></p>
<p>لاحظ كيف يوسّع <code>matplotlib</code> المقياس تلقائيًا ليلائم الرسمين داخل الإطار.</p>
<h2 id="الشريحة-17-مثال-واقعي">الشريحة 17: مثال «واقعي»</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-17.webp" alt="الشريحة 17: مثال «واقعي»"></p>
<p>اختارت <code>matplotlib</code> تلقائيًا مقياسَي <code>x</code> و <code>y</code> الأنسب للبيانات.</p>
<h2 id="الشريحة-18-مثال-واقعي">الشريحة 18: مثال «واقعي»</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-18.webp" alt="الشريحة 18: مثال «واقعي»"></p>
<p>صورة تالية من تسلسل المثال الواقعي.</p>
<h2 id="الشريحة-19-مثال-واقعي">الشريحة 19: مثال «واقعي»</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-19.webp" alt="الشريحة 19: مثال «واقعي»"></p>
<p>صورة تالية من تسلسل المثال الواقعي.</p>
<h2 id="الشريحة-20-مثال-واقعي">الشريحة 20: مثال «واقعي»</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-20.webp" alt="الشريحة 20: مثال «واقعي»"></p>
<p>صورة تالية من تسلسل المثال الواقعي.</p>
<h2 id="الشريحة-21-مثال-واقعي">الشريحة 21: مثال «واقعي»</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-21.webp" alt="الشريحة 21: مثال «واقعي»"></p>
<p>صورة تالية من تسلسل المثال الواقعي.</p>
<h2 id="الشريحة-22-إضافة-خطوط-الشبكة">الشريحة 22: إضافة خطوط الشبكة</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-22.webp" alt="الشريحة 22: إضافة خطوط الشبكة"></p>
<p>يمكن التبديل بخطوط الشبكة (grid lines) تشغيلًا وإيقافًا عبر:</p>
<pre><code class="language-python">plt.grid()
</code></pre>
<h2 id="الشريحة-23-لنضف-مدينة-أخرى">الشريحة 23: لنضف مدينة أخرى</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-23.webp" alt="الشريحة 23: لنضف مدينة أخرى"></p>
<p>تعرض الشريحة شيفرة إضافة مدينة ثانية إلى الرسم بوسم (<code>label</code>) خاص بها.</p>
<h2 id="الشريحة-24-لكن-أين-أنا">الشريحة 24: لكن أين أنا؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-24.webp" alt="الشريحة 24: لكن أين أنا؟"></p>
<p>صورة الرسم بعد إضافة المدينة الثانية، مع إبراز السؤال: أين الأشهر على المحور الأفقي، وأين درجات الحرارة على المحور الرأسي؟</p>
<h2 id="الشريحة-25-لنضف-مدينة-أخرى">الشريحة 25: لنضف مدينة أخرى</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-25.webp" alt="الشريحة 25: لنضف مدينة أخرى"></p>
<p>تعرض الشريحة شيفرة إضافة مدينة ثالثة ثم تحديد موضع مفتاح الرسم (<code>legend</code>).</p>
<h2 id="الشريحة-26-رسم-بمنحنيين">الشريحة 26: رسم بمنحنيين</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-26.webp" alt="الشريحة 26: رسم بمنحنيين"></p>
<p>لاحظ: اختارت Python ألوانًا مختلفة لكل رسم؛ يمكننا تحديدها إن أردنا.</p>
<h2 id="الشريحة-27-التحكم-في-المعاملات">الشريحة 27: التحكّم في المعاملات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-27.webp" alt="الشريحة 27: التحكّم في المعاملات"></p>
<ul>
<li>لنفرض أننا نريد التحكّم في تفاصيل العروض. أمثلة:
<ul>
<li>تغيير لون مجموعة بيانات أو نمطها.</li>
<li>تغيير عرض الخطوط أو أبعاد العروض.</li>
<li>استخدام الأجزاء الفرعية (subplots).</li>
</ul>
</li>
<li>يمكن تمرير وسيط «صيغة» (format) إلى <code>plot</code>:
<ul>
<li><code>marker</code>، <code>line</code>، <code>color</code>.</li>
</ul>
</li>
<li>يمكن تخطّي أيّ من هذه الاختيارات، فيأخذ <code>plot</code> القيمة الافتراضية.</li>
<li>الترتيب لا يهمّ، إذ لا التباس بين الرموز.</li>
</ul>
<h2 id="الشريحة-28-التحكم-في-اللون-والنمط">الشريحة 28: التحكّم في اللون والنمط</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-28.webp" alt="الشريحة 28: التحكّم في اللون والنمط"></p>
<p>تعرض الشريحة شيفرة تغيير اللون والنمط بمعاملات موضعية مختصرة (<code>'b-'</code> و<code>'r--'</code> و<code>'g-.'</code>).</p>
<h2 id="الشريحة-29-التحكم-في-اللون-والنمط">الشريحة 29: التحكّم في اللون والنمط</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-29.webp" alt="الشريحة 29: التحكّم في اللون والنمط"></p>
<p>صورة أخرى للتحكّم في اللون والأسلوب.</p>
<h2 id="الشريحة-30-استخدام-الكلمات-المفتاحية">الشريحة 30: استخدام الكلمات المفتاحية</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-30.webp" alt="الشريحة 30: استخدام الكلمات المفتاحية"></p>
<p>تعرض الشريحة الشيفرة نفسها بوسائط مسمّاة بالكلمات المفتاحية (<code>color</code> و<code>linestyle</code> و<code>label</code>).</p>
<h2 id="الشريحة-31-التحكم-في-اللون-والنمط">الشريحة 31: التحكّم في اللون والنمط</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-31.webp" alt="الشريحة 31: التحكّم في اللون والنمط"></p>
<p>صورة أخرى للتحكّم في اللون والنمط.</p>
<h2 id="الشريحة-32-خيارات-الخط-واللون-والعلامة">الشريحة 32: خيارات الخط واللون والعلامة</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-32.webp" alt="الشريحة 32: خيارات الخط واللون والعلامة"></p>
<p><strong>نمط الخط (Line Style):</strong></p>
<table>
<thead>
<tr>
<th>الرمز</th>
<th>المعنى</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-</code></td>
<td>خط متصل (solid line)</td>
</tr>
<tr>
<td><code>--</code></td>
<td>خط متقطّع (dashed line)</td>
</tr>
<tr>
<td><code>-.</code></td>
<td>خط منقّط مع شرطة (dash dot line)</td>
</tr>
<tr>
<td><code>:</code></td>
<td>خط منقّط (dotted line)</td>
</tr>
</tbody>
</table>
<p><strong>خيارات اللون (Color Options) — وهناك المزيد:</strong></p>
<table>
<thead>
<tr>
<th>الرمز</th>
<th>اللون</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>b</code></td>
<td>أزرق (blue)</td>
</tr>
<tr>
<td><code>g</code></td>
<td>أخضر (green)</td>
</tr>
<tr>
<td><code>r</code></td>
<td>أحمر (red)</td>
</tr>
<tr>
<td><code>c</code></td>
<td>سماوي (cyan)</td>
</tr>
<tr>
<td><code>m</code></td>
<td>أرجواني (magenta)</td>
</tr>
<tr>
<td><code>y</code></td>
<td>أصفر (yellow)</td>
</tr>
<tr>
<td><code>k</code></td>
<td>أسود (black)</td>
</tr>
<tr>
<td><code>w</code></td>
<td>أبيض (white)</td>
</tr>
</tbody>
</table>
<p><strong>خيارات العلامة (Marker Options) — وهناك المزيد:</strong></p>
<table>
<thead>
<tr>
<th>الرمز</th>
<th>العلامة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>.</code></td>
<td>نقطة (point)</td>
</tr>
<tr>
<td><code>o</code></td>
<td>دائرة (circle)</td>
</tr>
<tr>
<td><code>v</code></td>
<td>مثلث متجه لأسفل (triangle down)</td>
</tr>
<tr>
<td><code>^</code></td>
<td>مثلث متجه لأعلى (triangle up)</td>
</tr>
<tr>
<td><code>*</code></td>
<td>نجمة (star)</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-33-التحكم-في-اللون-والنمط">الشريحة 33: التحكّم في اللون والنمط</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-33.webp" alt="الشريحة 33: التحكّم في اللون والنمط"></p>
<p>تعرض الشريحة الشيفرة نفسها بمعاملات موضعية مختصرة مع العلامات (<code>'.b-'</code> و<code>'or--'</code> و<code>'*g-.'</code>).</p>
<h2 id="الشريحة-34-مع-العلامات">الشريحة 34: مع العلامات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-34.webp" alt="الشريحة 34: مع العلامات"></p>
<p>لاحظ كيف صارت النقاط الفعلية المرسومة مُعلَّمة الآن.</p>
<h2 id="الشريحة-35-التحكم-في-عرض-الخط">الشريحة 35: التحكّم في عرض الخط</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-35.webp" alt="الشريحة 35: التحكّم في عرض الخط"></p>
<p>تعرض الشريحة شيفرة تغيير عرض الخط بكلمة <code>linewidth</code> المفتاحية (2 و10 و20).</p>
<h2 id="الشريحة-36-خيارات-أخرى-كثيرة">الشريحة 36: خيارات أخرى كثيرة</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-36.webp" alt="الشريحة 36: خيارات أخرى كثيرة"></p>
<p>تُظهر الشريحة الرسم بعد تغيير عرض الخطوط.</p>
<h2 id="الشريحة-37-رسوم-داخل-رسوم">الشريحة 37: رسوم داخل رسوم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-37.webp" alt="الشريحة 37: رسوم داخل رسوم"></p>
<p>تعرض الشريحة شيفرة رسمين فوق بعضهما في نافذة واحدة، بدءًا بالجزء الأول <code>plt.subplot(2,1,1)</code>.</p>
<h2 id="الشريحة-38-ويتسع-الرسم">الشريحة 38: ويتّسع الرسم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-38.webp" alt="الشريحة 38: ويتّسع الرسم"></p>
<p>لكن هل يمكن أن يكون هذا مضلِّلًا؟ مقاييس <code>Y</code> مختلفة!</p>
<h2 id="الشريحة-39-رسوم-داخل-رسوم">الشريحة 39: رسوم داخل رسوم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-39.webp" alt="الشريحة 39: رسوم داخل رسوم"></p>
<p>تعرض الشريحة الجزء الثاني من الشيفرة نفسها (<code>plt.subplot(2,1,2)</code>).</p>
<h2 id="الشريحة-40-ويتسع-الرسم">الشريحة 40: ويتّسع الرسم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-40.webp" alt="الشريحة 40: ويتّسع الرسم"></p>
<p>تُظهر الشريحة الرسم البياني بعد تقسيم النافذة إلى جزأين فوق بعضهما.</p>
<h2 id="الشريحة-41-كثير-من-الأجزاء-الفرعية">الشريحة 41: كثير من الأجزاء الفرعية</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-41.webp" alt="الشريحة 41: كثير من الأجزاء الفرعية"></p>
<p>تعرض الشريحة شيفرة شبكة من الأجزاء الفرعية بأربع نوافذ، من <code>plt.subplot(2,2,1)</code> إلى <code>plt.subplot(2,2,3)</code>.</p>
<h2 id="الشريحة-42-ويتسع-الرسم">الشريحة 42: ويتّسع الرسم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-42.webp" alt="الشريحة 42: ويتّسع الرسم"></p>
<p>تُظهر الشريحة الشبكة النهائية بأربعة أجزاء فرعية في نافذة واحدة.</p>
<h2 id="الشريحة-43-سكان-الولايات-المتحدة-مثال">الشريحة 43: سكان الولايات المتحدة — مثال</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-43.webp" alt="الشريحة 43: سكان الولايات المتحدة — مثال"></p>
<p>شريحة فاصلة تعلن مثالًا جديدًا.</p>
<h2 id="الشريحة-44-مثال-أكثر-إثارة-للاهتمام">الشريحة 44: مثال أكثر إثارة للاهتمام</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-44.webp" alt="الشريحة 44: مثال أكثر إثارة للاهتمام"></p>
<ul>
<li>لنجرّب رسم بيانات أكثر تعقيدًا.</li>
<li>زوّدنا ملفًا فيه عدد سكان الولايات المتحدة مسجَّلًا كل 10 أعوام على مدى أربعة قرون.</li>
<li>نودّ استخدام الرسم لفحص تلك البيانات.</li>
<li>نستخدم الرسم للمساعدة على تصوّر الاتجاهات فيها.</li>
<li>نستخدم الرسم لطرح أسئلة يمكن اختبارها حسابيًا (وسترى المزيد من هذا إن أخذت مقرر 6.100B).</li>
</ul>
<h2 id="الشريحة-45-ملف-الإدخال">الشريحة 45: ملف الإدخال</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-45.webp" alt="الشريحة 45: ملف الإدخال"></p>
<p>اسم الملف <code>USPopulation.txt</code>، ويحتوي على قائمة بأرقام السكان.</p>
<h2 id="الشريحة-46-رسم-البيانات">الشريحة 46: رسم البيانات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-46.webp" alt="الشريحة 46: رسم البيانات"></p>
<p>تعرض الشريحة شيفرة قراءة الملف ورسم بياناته.</p>
<h2 id="الشريحة-47-نمو-السكان">الشريحة 47: نمو السكان</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-47.webp" alt="الشريحة 47: نمو السكان"></p>
<ul>
<li>تصوّر البيانات قد يكشف أمورًا لا تُرى بسهولة في البيانات الخام.</li>
<li>«ماذا يحدث في السنوات المبكّرة؟»</li>
<li>«هل يمكنني تصوّر هذا بطريقة مختلفة؟»</li>
<li>أثر الحرب العالمية الثانية.</li>
<li>أثر الحرب الأهلية.</li>
</ul>
<h2 id="الشريحة-48-تغيير-المقياس">الشريحة 48: تغيير المقياس</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-48.webp" alt="الشريحة 48: تغيير المقياس"></p>
<p>المقياس اللوغاريتمي (log scale) يعني أن كل زيادة على المحور تقابل زيادة أُسّية في الحجم، بينما في المقياس العادي كل زيادة تقابل زيادة خطّية في الحجم.</p>
<h2 id="الشريحة-49-نمو-السكان">الشريحة 49: نمو السكان</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-49.webp" alt="الشريحة 49: نمو السكان"></p>
<ul>
<li>«ماذا يعني النمو الخطّي على مقياس لوغاريتمي؟»</li>
<li>«يمكننا الآن أن نرى أن نموًّا حدث في وقت مبكّر، وسرعته كانت في الواقع أسرع من السنوات اللاحقة.»</li>
</ul>
<h2 id="الشريحة-50-أيهما-وجدته-أكثر-إفادة">الشريحة 50: أيّهما وجدته أكثر إفادة؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-50.webp" alt="الشريحة 50: أيّهما وجدته أكثر إفادة؟"></p>
<ul>
<li>تغيير طريقة التصوّر (visualization) قد يكشف اتجاهات في البيانات لا تُرى بالرسم القياسي.</li>
<li>التصوّر يطرح أسئلة، مثل: بالنظر إلى العين، يبدو أن هناك ثلاث فترات نمو أُسّية مختلفة.</li>
</ul>
<h2 id="الشريحة-51-سكان-الدول-مثال">الشريحة 51: سكان الدول — مثال</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-51.webp" alt="الشريحة 51: سكان الدول — مثال"></p>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-52-ملف-البيانات">الشريحة 52: ملف البيانات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-52.webp" alt="الشريحة 52: ملف البيانات"></p>
<p>اسم الملف <code>countryPops.txt</code>. مهتمّون بتحليل أرقام السكان، ولا نهتمّ بالترتيب أو الدولة أو السنة.</p>
<h2 id="الشريحة-53-تحميل-البيانات-ورسمها">الشريحة 53: تحميل البيانات ورسمها</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-53.webp" alt="الشريحة 53: تحميل البيانات ورسمها"></p>
<p>تعرض الشريحة شيفرة قراءة الملف ثم رسمه.</p>
<h2 id="الشريحة-54-أحجام-السكان">الشريحة 54: أحجام السكان</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-54.webp" alt="الشريحة 54: أحجام السكان"></p>
<p>صورة رسم بياني لأحجام سكان الدول.</p>
<h2 id="الشريحة-55-تحقيق-غريب-الخانات-الأولى">الشريحة 55: تحقيق غريب: الخانات الأولى</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-55.webp" alt="الشريحة 55: تحقيق غريب: الخانات الأولى"></p>
<p>صورة تُظهر توزيع الخانات الأولى لأرقام السكان.</p>
<h2 id="الشريحة-56-تكرار-كل-خانة">الشريحة 56: تكرار كل خانة</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-56.webp" alt="الشريحة 56: تكرار كل خانة"></p>
<p><strong>قانون بنفورد (Benford's Law):</strong></p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>P</mi><mi>d</mi></msub><mo>=</mo><msub><mrow><mi>log</mi><mo>⁡</mo></mrow><mn>10</mn></msub><mrow><mo fence="true">(</mo><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mi>d</mi></mfrac><mo fence="true">)</mo></mrow></mrow><annotation encoding="application/x-tex">P_d = \\log_{10}\\left(1 + \\frac{1}{d}\\right)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1389em;">P</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">d</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">10</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></span>
<p>كثير من مجموعات البيانات تتبع هذا:</p>
<ul>
<li>متابعو وسائل التواصل الاجتماعي</li>
<li>قيم الأسهم</li>
<li>أسعار المواد الغذائية (groceries)</li>
<li>إحصاءات الرياضة</li>
<li>ارتفاعات المباني</li>
<li>الضرائب المدفوعة</li>
</ul>
<h2 id="الشريحة-57-مقارنة-المدن-مثال">الشريحة 57: مقارنة المدن — مثال</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-57.webp" alt="الشريحة 57: مقارنة المدن — مثال"></p>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-58-مثال-موسع">الشريحة 58: مثال موسّع</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-58.webp" alt="الشريحة 58: مثال موسّع"></p>
<ul>
<li>لنستخدم مثالًا آخر لنفحص كيف يسمح الرسم باستكشاف البيانات بطرق مختلفة، وكيف يوفّر طريقة قيّمة لتصويرها.</li>
<li>لن ننظر في الشيفرة بالتفصيل.</li>
<li>مثال على مجموعة بيانات:
<ul>
<li>متوسط درجة الحرارة اليومية لكل يوم على مدى 55 سنة لـ 21 مدينة أمريكية مختلفة.</li>
</ul>
</li>
<li>نودّ استكشاف التغيّرات عبر السنين، وعبر المدن.</li>
</ul>
<h2 id="الشريحة-59-ملف-البيانات">الشريحة 59: ملف البيانات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-59.webp" alt="الشريحة 59: ملف البيانات"></p>
<p>اسم الملف <code>temperatures.csv</code>.</p>
<h2 id="الشريحة-60-temperaturescsv-استخراج-البيانات">الشريحة 60: <code>temperatures.csv</code> — استخراج البيانات</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-60.webp" alt="الشريحة 60:  — استخراج البيانات"></p>
<p>سيُعيد هذا قائمة بدرجات الحرارة (بالفهرنهايت) وقائمة موافقة بالتواريخ لمدينة معيّنة.</p>
<p>أول أربعة أسطر في الملف:</p>
<pre><code class="language-text">CITY,TEMP,DATE
SEATTLE,3.1,19610101
SEATTLE,0.55,19610102
SEATTLE,0,19610103
SEATTLE,4.45,19610104
</code></pre>
<p>ملاحظتان على الشريحة:</p>
<ul>
<li>نريد حرارة <strong>مدينة معيّنة فقط</strong>، فنرشّح على <code>CITY</code>.</li>
<li>الملف يخزّن البيانات كنصّ (str)، فنحتاج إلى التحويل.</li>
</ul>
<h2 id="الشريحة-61-متوسطات-الحرارة">الشريحة 61: متوسطات الحرارة</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-61.webp" alt="الشريحة 61: متوسطات الحرارة"></p>
<ul>
<li>يحسب هذا متوسط الحرارة على كل يوم من السنين الخمس والخمسين، لكل مدينة.</li>
<li>احصل على قائمة المدن.</li>
<li>احسب متوسط الحرارة.</li>
<li>باستخدام أول حرفين كوسم (label).</li>
<li>ارسم النقاط فقط كـ scatter plot (بلا خطوط وصل).</li>
</ul>
<h2 id="الشريحة-62-ودرجة-الحرارة-هي">الشريحة 62: ودرجة الحرارة هي …</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-62.webp" alt="الشريحة 62: ودرجة الحرارة هي …"></p>
<p>صورة تُظهر أسماء المدن على المحور الرأسي، ومنها: San Juan، Miami، Phoenix ثم Detroit، Chicago، Boston.</p>
<h2 id="الشريحة-63-لكن-الأكثر-إثارة-هو-النظر-في-التغير-عبر-الزمن">الشريحة 63: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-63.webp" alt="الشريحة 63: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن"></p>
<ul>
<li>لمدينة واحدة، احسب متوسط الحرارة في كل سنة.</li>
<li>تحقّق أن المدخل يخصّ السنة الصحيحة.</li>
<li>استعمل الشيفرة السابقة.</li>
<li>احصل على بيانات الحرارة لتلك السنة.</li>
</ul>
<h2 id="الشريحة-64-لكن-الأكثر-إثارة-هو-النظر-في-التغير-عبر-الزمن">الشريحة 64: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-64.webp" alt="الشريحة 64: لكن الأكثر إثارة هو النظر في التغيّر عبر الزمن"></p>
<p>اختر بعض المدن لترسم 55 حرارة (المتوسط السنوي لكل سنة).</p>
<h2 id="الشريحة-65-الطفل-بارد-في-الخارج">الشريحة 65: «الطفل بارد في الخارج!»</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-65.webp" alt="الشريحة 65: «الطفل بارد في الخارج!»"></p>
<p>صورة تُظهر عدد الأيام التي كانت فيها الحرارة اليومية أقلّ من 30 درجة فهرنهايت عبر الزمن لكل مدينة.</p>
<h2 id="الشريحة-66-لكن-ما-معنى-التباين-variation">الشريحة 66: لكن ما معنى التباين (Variation)؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-66.webp" alt="الشريحة 66: لكن ما معنى التباين (Variation)؟"></p>
<p>الصورة تُظهر أعلى وأدنى ومتوسط الحرارة حسب السنة.</p>
<h2 id="الشريحة-67-لكن-ما-معنى-التباين">الشريحة 67: لكن ما معنى التباين؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-67.webp" alt="الشريحة 67: لكن ما معنى التباين؟"></p>
<p>الصورة نفسها مع توضيح مدرّجات أعلى/أدنى/متوسط.</p>
<h2 id="الشريحة-68-أمثلة-على-بعض-المدن">الشريحة 68: أمثلة على بعض المدن</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-68.webp" alt="الشريحة 68: أمثلة على بعض المدن"></p>
<ul>
<li>يمكن رؤية المدى (range) لكل مدينة.</li>
<li>لكنه غير مفيد للمقارنة بين المدن:
<ul>
<li>المحور الرأسي في Boston من 0 إلى 80.</li>
<li>المحور الرأسي في Miami من 40 إلى 90.</li>
<li>المحور الرأسي في San Diego من 50 إلى 90.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-69-استخدم-المدى-نفسه-على-المحور-الرأسي-لكل-الرسوم">الشريحة 69: استخدم المدى نفسه على المحور الرأسي لكل الرسوم</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-69.webp" alt="الشريحة 69: استخدم المدى نفسه على المحور الرأسي لكل الرسوم"></p>
<p>ثبِّت مدى العرض للمحور الرأسي (<code>ylim</code>).</p>
<h2 id="الشريحة-70-مقارنة-أفضل-بين-المدن">الشريحة 70: مقارنة أفضل بين المدن</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-70.webp" alt="الشريحة 70: مقارنة أفضل بين المدن"></p>
<ul>
<li>أحد أسباب الرسم البياني هو تصوّر البيانات.</li>
<li>يمكن رؤية أن مدى التباين مختلف جدًّا في Boston مقارنةً بـ Miami أو San Diego.</li>
<li>ويمكن أيضًا رؤية أن المتوسط في Miami أقرب بكثير إلى الحدّ الأقصى منه إلى الحدّ الأدنى، بخلاف Boston و San Diego.</li>
</ul>
<h2 id="الشريحة-71-كم-يوما-كانت-حرارته-في-1961">الشريحة 71: كم يومًا كانت حرارته…؟ في 1961؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-71.webp" alt="الشريحة 71: كم يومًا كانت حرارته…؟ في 1961؟"></p>
<ul>
<li>جهّز قائمة من 100 عنصر، لتبني بنية تشبه المدرّج التكراري (histogram-like).
<ul>
<li>العنصر رقم 0 يخزّن عدد الأيام التي كانت حرارتها 0.</li>
<li>العنصر رقم 1 يخزّن عدد الأيام التي كانت حرارتها 1.</li>
<li>…</li>
<li>العنصر رقم 99 يخزّن عدد الأيام التي كانت حرارتها 99.</li>
</ul>
</li>
<li>أنشئ قائمة بدرجات الحرارة لسنة معيّنة.</li>
<li>عُدّ عدد أيام سنة معيّنة التي كانت فيها حرارة معيّنة هي المتوسط اليومي.</li>
</ul>
<h2 id="الشريحة-72-كم-يوما-كانت-حرارته-في-1961">الشريحة 72: كم يومًا كانت حرارته…؟ في 1961؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-72.webp" alt="الشريحة 72: كم يومًا كانت حرارته…؟ في 1961؟"></p>
<p>صورة تُظهر المدرّج التكراري لدرجة الحرارة في سنة 1961.</p>
<h2 id="الشريحة-73-هل-san-diego-مملة">الشريحة 73: هل San Diego مملّة؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-73.webp" alt="الشريحة 73: هل San Diego مملّة؟"></p>
<p>صورة تُظهر توزيع الحرارة لـ San Diego.</p>
<p>سؤال على الشريحة: هل يمكننا ملاءمة منحنى (curve) لأجزاء من هذه البيانات؟ هل التوزيع منتظم؟ أم هل هو غاوسيّ (aka bell)؟</p>
<h2 id="الشريحة-74-التغير-عبر-الزمن">الشريحة 74: التغيّر عبر الزمن؟</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-74.webp" alt="الشريحة 74: التغيّر عبر الزمن؟"></p>
<p>ارسم توزيعين، أحدهما لسنة 1961 والآخر لسنة 2015.</p>
<h2 id="الشريحة-75-تراكب-الأعمدة-overlay-bar-charts">الشريحة 75: تراكب الأعمدة (Overlay Bar Charts)</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-75.webp" alt="الشريحة 75: تراكب الأعمدة (Overlay Bar Charts)"></p>
<p>صورة تُظهر الأعمدة فوق بعضها.</p>
<h2 id="الشريحة-76-أو-يمكن-الرسم-على-حدة">الشريحة 76: أو يمكن الرسم على حدة</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-76.webp" alt="الشريحة 76: أو يمكن الرسم على حدة"></p>
<p>صورة تُظهر الرسم المنفصل للتوزيعين.</p>
<h2 id="الشريحة-77-يمكن-التحكم-في-أشياء-كثيرة-أخرى">الشريحة 77: يمكن التحكّم في أشياء كثيرة أخرى</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-77.webp" alt="الشريحة 77: يمكن التحكّم في أشياء كثيرة أخرى"></p>
<ul>
<li>الحجم (Size of)</li>
<li>العلامات (Markers)</li>
<li>الخطوط (Lines)</li>
<li>العنوان (Title)</li>
<li>التسميات (Labels)</li>
<li>تدريجات <code>x</code> و <code>y</code> (ticks)</li>
<li>مقياسا المحورين (Scales of both axes)</li>
<li>الأجزاء الفرعية (Subplots)</li>
<li>مربّعات النصّ (Text boxes)</li>
<li>نوع الرسم (Kind of plot):
<ul>
<li>الرسوم المبعثرة (Scatter plots)</li>
<li>الرسوم الشريطية (Bar plots)</li>
<li>المدرّجات التكرارية (Histograms)</li>
<li>…</li>
</ul>
</li>
</ul>
<p>«لقد كشطنا سطح الموضوع اليوم!»</p>
<h2 id="الشريحة-78-mit-opencourseware">الشريحة 78: MIT OpenCourseWare</h2>
<p><img src="/arabic-cs-library/images/mit-6100l/lecture-25-slide-78.webp" alt="الشريحة 78: MIT OpenCourseWare"></p>
<pre><code>MITOpenCourseWare
https://ocw.mit.edu

6.100L Introduction to Computer Science and Programming Using Python
Fall 2022

For information about citing these materials or our Terms of Use, visit: https://ocw.mit.edu/terms.
</code></pre>
<h2 id="ملف-الشيفرة-الكامل-lec25py">ملف الشيفرة الكامل (lec25.py)</h2>
<p>هذا ملف الشيفرة الكامل كما نشرته MIT ضمن حزمة المحاضرة، منقولًا حرفيًا دون تغيير.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt

<span class="hljs-comment">#set line width</span>
plt.rcParams[<span class="hljs-string">&#x27;lines.linewidth&#x27;</span>] = <span class="hljs-number">2</span>
<span class="hljs-comment">#set font size for titles</span>
plt.rcParams[<span class="hljs-string">&#x27;axes.titlesize&#x27;</span>] = <span class="hljs-number">16</span>
<span class="hljs-comment">#set font size for labels on axes</span>
plt.rcParams[<span class="hljs-string">&#x27;axes.labelsize&#x27;</span>] = <span class="hljs-number">16</span>
<span class="hljs-comment">#set size of numbers on x-axis</span>
plt.rcParams[<span class="hljs-string">&#x27;xtick.labelsize&#x27;</span>] = <span class="hljs-number">10</span>
<span class="hljs-comment">#set size of numbers on y-axis</span>
plt.rcParams[<span class="hljs-string">&#x27;ytick.labelsize&#x27;</span>] = <span class="hljs-number">10</span>
<span class="hljs-comment">#set size of ticks on x-axis</span>
plt.rcParams[<span class="hljs-string">&#x27;xtick.major.size&#x27;</span>] = <span class="hljs-number">5</span>
<span class="hljs-comment">#set size of ticks on y-axis</span>
plt.rcParams[<span class="hljs-string">&#x27;ytick.major.size&#x27;</span>] = <span class="hljs-number">5</span>
<span class="hljs-comment">#set size of markers</span>
plt.rcParams[<span class="hljs-string">&#x27;lines.markersize&#x27;</span>] = <span class="hljs-number">10</span>
<span class="hljs-comment">#set number of examples shown in legends</span>
plt.rcParams[<span class="hljs-string">&#x27;legend.numpoints&#x27;</span>] = <span class="hljs-number">1</span>
<span class="hljs-comment">#set the font size globally</span>
plt.rcParams[<span class="hljs-string">&#x27;xtick.labelsize&#x27;</span>]=<span class="hljs-number">20</span>
plt.rcParams[<span class="hljs-string">&#x27;ytick.labelsize&#x27;</span>]=<span class="hljs-number">20</span>
plt.rcParams[<span class="hljs-string">&#x27;axes.labelsize&#x27;</span>] = <span class="hljs-number">26</span> 
plt.rcParams[<span class="hljs-string">&#x27;axes.titlesize&#x27;</span>] = <span class="hljs-number">26</span> 
plt.rcParams[<span class="hljs-string">&quot;figure.figsize&quot;</span>] = (<span class="hljs-number">15</span>,<span class="hljs-number">10</span>)

<span class="hljs-comment">########################</span>
<span class="hljs-comment">## Plotting many lines </span>
<span class="hljs-comment">########################</span>
nVals = []
linear = []
quadratic = []
cubic = []
exponential = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-number">30</span>):
    nVals.append(i)
    linear.append(i)
    quadratic.append(i**<span class="hljs-number">2</span>)
    cubic.append(i**<span class="hljs-number">3</span>)
    exponential.append(<span class="hljs-number">1.5</span>**i)

<span class="hljs-comment"># #### Plotting one line</span>
<span class="hljs-comment"># plt.plot(nVals, linear)</span>


<span class="hljs-comment"># ##### order of data points matters</span>
testSamples = [<span class="hljs-number">0</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">6</span>,<span class="hljs-number">15</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">25</span>,<span class="hljs-number">20</span>,<span class="hljs-number">7</span>,<span class="hljs-number">21</span>,<span class="hljs-number">22</span>,<span class="hljs-number">23</span>,<span class="hljs-number">9</span>,<span class="hljs-number">8</span>,<span class="hljs-number">24</span>,<span class="hljs-number">10</span>,<span class="hljs-number">12</span>,<span class="hljs-number">11</span>]
testValues =  [<span class="hljs-number">0</span>,<span class="hljs-number">25</span>,<span class="hljs-number">9</span>,<span class="hljs-number">36</span>,<span class="hljs-number">225</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1</span>,<span class="hljs-number">16</span>,<span class="hljs-number">625</span>,<span class="hljs-number">400</span>,<span class="hljs-number">49</span>,<span class="hljs-number">441</span>,<span class="hljs-number">484</span>,<span class="hljs-number">529</span>,<span class="hljs-number">81</span>,<span class="hljs-number">64</span>,<span class="hljs-number">576</span>,<span class="hljs-number">100</span>,<span class="hljs-number">144</span>,<span class="hljs-number">121</span>]
<span class="hljs-comment">## plot connects the points</span>
<span class="hljs-comment"># plt.plot(testSamples, testValues)</span>
<span class="hljs-comment">## scatter plot does not connect the points</span>
<span class="hljs-comment"># plt.scatter(testSamples, testValues)</span>

<span class="hljs-comment"># ##### Plotting many lines</span>
<span class="hljs-comment"># plt.plot(nVals, linear)</span>
<span class="hljs-comment"># plt.plot(nVals, quadratic)</span>
<span class="hljs-comment"># plt.plot(nVals, cubic)</span>
<span class="hljs-comment"># plt.plot(nVals, exponential)</span>


<span class="hljs-comment"># ###### Plotting two lines on one plot</span>
<span class="hljs-comment"># plt.figure(&#x27;expo&#x27;)</span>
<span class="hljs-comment"># plt.plot(nVals, exponential)</span>
<span class="hljs-comment"># plt.figure(&#x27;lin&#x27;)</span>
<span class="hljs-comment"># plt.plot(nVals, linear)</span>
<span class="hljs-comment"># plt.figure(&#x27;quad&#x27;)</span>
<span class="hljs-comment"># plt.plot(nVals, quadratic)</span>
<span class="hljs-comment"># plt.figure(&#x27;cube&#x27;)</span>
<span class="hljs-comment"># plt.plot(nVals, cubic)</span>
<span class="hljs-comment"># newExpo = []</span>
<span class="hljs-comment"># for i in range(30):</span>
<span class="hljs-comment">#     newExpo.append(1.6**i)</span>
<span class="hljs-comment"># plt.figure(&#x27;expo&#x27;)</span>
<span class="hljs-comment"># plt.plot(nVals, newExpo)</span>


<span class="hljs-comment">################</span>
<span class="hljs-comment">## Temperature with axes options</span>
<span class="hljs-comment">################</span>
<span class="hljs-comment">###### Plotting temperatures and changing xaxis</span>
months = <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">13</span>, <span class="hljs-number">1</span>)
temps = [<span class="hljs-number">28</span>,<span class="hljs-number">32</span>,<span class="hljs-number">39</span>,<span class="hljs-number">48</span>,<span class="hljs-number">59</span>,<span class="hljs-number">68</span>,<span class="hljs-number">75</span>,<span class="hljs-number">73</span>,<span class="hljs-number">66</span>,<span class="hljs-number">54</span>,<span class="hljs-number">45</span>,<span class="hljs-number">34</span>]
<span class="hljs-comment"># plt.plot(months, temps)</span>

<span class="hljs-comment"># # ## Add axes, labels, and a title</span>
<span class="hljs-comment"># plt.title(&#x27;Ave. Temperature in Boston&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Month&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>

<span class="hljs-comment"># # #### Start axis at 1 to 12</span>
<span class="hljs-comment"># plt.xlim(1, 12)</span>
<span class="hljs-comment"># # ### Change x axes labels</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12))</span>
<span class="hljs-comment"># # #### Change x axes labels to custom labels</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#             (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment"># # #### add/remove grid lines</span>
<span class="hljs-comment"># plt.grid()</span>


<span class="hljs-comment">###################################</span>
<span class="hljs-comment">## Temperatures for many cities </span>
<span class="hljs-comment">###################################</span>

<span class="hljs-comment">###### Plotting multiple lines with labels</span>
<span class="hljs-comment"># months = range(1, 13, 1)</span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.plot(months, boston, label = &#x27;Boston&#x27;)</span>
<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.plot(months, phoenix, label = &#x27;Phoenix&#x27;)</span>
<span class="hljs-comment"># # Add labels and title</span>
<span class="hljs-comment"># plt.title(&#x27;Ave. Temperatures&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Month&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>
<span class="hljs-comment"># # Change x axis labels to custom labels</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment"># plt.legend(loc = &#x27;best&#x27;, fontsize=20) # position it automatically</span>

<span class="hljs-comment">###### Plotting multiple lines and changing their line style</span>
<span class="hljs-comment"># months = range(1, 13, 1)           </span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.plot(months, boston, &#x27;b-&#x27;, label = &#x27;Boston&#x27;)</span>
<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.plot(months, phoenix, &#x27;r--&#x27;, label = &#x27;Phoenix&#x27;)</span>
<span class="hljs-comment"># msp = [16,19,34,48,59,70,75,73,64,60,37,21]</span>
<span class="hljs-comment"># plt.plot(months, msp, &#x27;g-.&#x27;, label = &#x27;Minneapolis&#x27;)</span>
<span class="hljs-comment"># plt.legend(loc = &#x27;best&#x27;, fontsize=20)</span>
<span class="hljs-comment"># plt.title(&#x27;Ave. Temperatures&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Month&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment"># # ###### Plotting with keywords (same plot as below)</span>
<span class="hljs-comment"># months = range(1, 13, 1)           </span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.plot(months, boston, label = &#x27;Boston&#x27;,\\</span>
<span class="hljs-comment">#           color = &#x27;b&#x27;, linestyle = &#x27;-&#x27;)</span>
<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.plot(months, phoenix, label = &#x27;Phoenix&#x27;,\\</span>
<span class="hljs-comment">#           color = &#x27;r&#x27;, linestyle = &#x27;--&#x27;)</span>
<span class="hljs-comment"># msp = [16,19,34,48,59,70,75,73,64,60,37,21]</span>
<span class="hljs-comment"># plt.plot(months, msp, label = &#x27;Minneapolis&#x27;,\\</span>
<span class="hljs-comment">#           color = &#x27;g&#x27;, linestyle = &#x27;-.&#x27;)</span>
<span class="hljs-comment"># plt.legend(loc = &#x27;best&#x27;, fontsize=20)</span>
<span class="hljs-comment"># plt.title(&#x27;Ave. Temperatures&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Month&#x27;)</span>
<span class="hljs-comment"># plt.ylabel((&#x27;Degrees F&#x27;))</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment">###### Plotting with styled markers (same plot as above)</span>
<span class="hljs-comment"># months = range(1, 13, 1)           </span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.plot(months, boston, &#x27;.b-&#x27;, label = &#x27;Boston&#x27;)</span>
<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.plot(months, phoenix, &#x27;or--&#x27;, label = &#x27;Phoenix&#x27;)</span>
<span class="hljs-comment"># msp = [16,19,34,48,59,70,75,73,64,60,37,21]</span>
<span class="hljs-comment"># plt.plot(months, msp, &#x27;*g-.&#x27;, label = &#x27;Minneapolis&#x27;)</span>
<span class="hljs-comment"># plt.legend(loc = &#x27;best&#x27;, fontsize=20)</span>
<span class="hljs-comment"># plt.title(&#x27;Ave. Temperatures&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Month&#x27;)</span>
<span class="hljs-comment"># plt.ylabel((&#x27;Degrees F&#x27;))</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment">###### Plotting with keywords, change width</span>
<span class="hljs-comment"># months = range(1, 13, 1)           </span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.plot(months, boston, label = &#x27;Boston&#x27;,\\</span>
<span class="hljs-comment">#           color = &#x27;b&#x27;, linestyle = &#x27;-&#x27;, linewidth = 2)</span>
<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.plot(months, phoenix, label = &#x27;Phoenix&#x27;,\\</span>
<span class="hljs-comment">#           color = &#x27;r&#x27;, linestyle = &#x27;--&#x27;, linewidth = 10)</span>
<span class="hljs-comment"># msp = [16,19,34,48,59,70,75,73,64,60,37,21]</span>
<span class="hljs-comment"># plt.plot(months, msp, label = &#x27;Minneapolis&#x27;,\\</span>
<span class="hljs-comment">#           color = &#x27;g&#x27;, linestyle = &#x27;-.&#x27;, linewidth = 20)</span>
<span class="hljs-comment"># plt.legend(loc = &#x27;best&#x27;, fontsize=20)</span>
<span class="hljs-comment"># plt.title(&#x27;Ave. Temperatures&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Month&#x27;)</span>
<span class="hljs-comment"># plt.ylabel((&#x27;Degrees F&#x27;))</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment">###### Using subplots</span>
<span class="hljs-comment"># months = range(1, 13, 1)           </span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.subplot(2,1,1)</span>
<span class="hljs-comment"># # plt.ylim(0, 100)</span>
<span class="hljs-comment"># plt.plot(months, boston, &#x27;b-&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>
<span class="hljs-comment"># plt.title(&#x27;Boston vs. Phoenix&#x27;)</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>
<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.subplot(2,1,2)</span>
<span class="hljs-comment"># # plt.ylim(0, 100)</span>
<span class="hljs-comment"># plt.plot(months, phoenix, &#x27;r--&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>
<span class="hljs-comment"># plt.xticks((1,2,3,4,5,6,7,8,9,10,11,12),</span>
<span class="hljs-comment">#           (&#x27;Jan&#x27;,&#x27;Feb&#x27;,&#x27;Mar&#x27;,&#x27;Apr&#x27;,&#x27;May&#x27;,&#x27;Jun&#x27;,&#x27;Jul&#x27;,&#x27;Aug&#x27;,&#x27;Sep&#x27;,&#x27;Oct&#x27;,&#x27;Nov&#x27;,&#x27;Dec&#x27;))</span>

<span class="hljs-comment">###### Using subplots</span>
<span class="hljs-comment"># months = range(1, 13, 1)           </span>
<span class="hljs-comment"># boston = [28,32,39,48,59,68,75,73,66,54,45,34]</span>
<span class="hljs-comment"># plt.subplot(2,2,1)</span>
<span class="hljs-comment"># plt.ylim(0, 100)</span>
<span class="hljs-comment"># plt.plot(months, boston, &#x27;b-&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>
<span class="hljs-comment"># plt.title(&#x27;Boston&#x27;)</span>
<span class="hljs-comment"># plt.xticks((1,3,5,7,9,11),(&#x27;Jan&#x27;,&#x27;Mar&#x27;,&#x27;May&#x27;,&#x27;Jul&#x27;,&#x27;Sep&#x27;,&#x27;Nov&#x27;))</span>

<span class="hljs-comment"># phoenix = [54,57,61,68,77,86,91,90,84,73,61,54]</span>
<span class="hljs-comment"># plt.subplot(2,2,2)</span>
<span class="hljs-comment"># plt.ylim(0, 100)</span>
<span class="hljs-comment"># plt.plot(months, phoenix, &#x27;r--&#x27;)</span>
<span class="hljs-comment"># plt.title(&#x27;Phoenix&#x27;)</span>
<span class="hljs-comment"># plt.xticks((1,3,5,7,9,11),(&#x27;Jan&#x27;,&#x27;Mar&#x27;,&#x27;May&#x27;,&#x27;Jul&#x27;,&#x27;Sep&#x27;,&#x27;Nov&#x27;))</span>

<span class="hljs-comment"># msp = [16,19,34,48,59,70,75,73,64,60,37,21]</span>
<span class="hljs-comment"># plt.subplot(2,2,3)</span>
<span class="hljs-comment"># plt.ylim(0, 100)</span>
<span class="hljs-comment"># plt.plot(months, msp, &#x27;g-.&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Degrees F&#x27;)</span>
<span class="hljs-comment"># plt.title(&#x27;Minneapolis&#x27;)</span>
<span class="hljs-comment"># plt.xticks((1,3,5,7,9,11),(&#x27;Jan&#x27;,&#x27;Mar&#x27;,&#x27;May&#x27;,&#x27;Jul&#x27;,&#x27;Sep&#x27;,&#x27;Nov&#x27;))</span>

<span class="hljs-comment">####################################</span>
<span class="hljs-comment">## US Population Example </span>
<span class="hljs-comment">####################################</span>

<span class="hljs-comment">###### Read file data and plot it</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">getUSPop</span>(<span class="hljs-params">fileName</span>):
    inFile = <span class="hljs-built_in">open</span>(fileName, <span class="hljs-string">&#x27;r&#x27;</span>)
    dates, pops = [], []
    <span class="hljs-keyword">for</span> l <span class="hljs-keyword">in</span> inFile:
        line = <span class="hljs-string">&#x27;&#x27;</span>
        <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> l:
            <span class="hljs-keyword">if</span> c <span class="hljs-keyword">in</span> <span class="hljs-string">&#x27;0123456789 &#x27;</span>:
                line += c
        line = line.split(<span class="hljs-string">&#x27; &#x27;</span>)
        dates.append(<span class="hljs-built_in">int</span>(line[<span class="hljs-number">0</span>]))
        pops.append(<span class="hljs-built_in">int</span>(line[<span class="hljs-number">1</span>]))
    <span class="hljs-keyword">return</span> dates, pops

<span class="hljs-comment"># dates, pops = getUSPop(&#x27;lec25_USPopulation.txt&#x27;)</span>
<span class="hljs-comment"># plt.plot(dates, pops)</span>
<span class="hljs-comment"># plt.title(&#x27;Population in What Is Now U.S.\\n&#x27; +\\</span>
<span class="hljs-comment">#           &#x27;(Native Am. Excluded Before 1860)&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Year&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Population&#x27;)</span>

<span class="hljs-comment">####### Change the scale to semilog</span>
<span class="hljs-comment"># plt.semilogy()   </span>


<span class="hljs-comment">####################################</span>
<span class="hljs-comment">## Country Population Example </span>
<span class="hljs-comment">####################################</span>

<span class="hljs-comment">###### Read file data from many countries and plot it</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">getCountryPops</span>(<span class="hljs-params">fileName</span>):
    inFile = <span class="hljs-built_in">open</span>(fileName, <span class="hljs-string">&#x27;r&#x27;</span>)
    pops = []
    <span class="hljs-keyword">for</span> l <span class="hljs-keyword">in</span> inFile:
        line = l.split(<span class="hljs-string">&#x27;\\t&#x27;</span>)
        l = line[<span class="hljs-number">2</span>]
        pop = <span class="hljs-string">&#x27;&#x27;</span>
        <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> l:
            <span class="hljs-keyword">if</span> c <span class="hljs-keyword">in</span> <span class="hljs-string">&#x27;0123456789&#x27;</span>:
                pop += c
        pops.append(<span class="hljs-built_in">int</span>(pop))
    <span class="hljs-keyword">return</span> pops

pops = getCountryPops(<span class="hljs-string">&#x27;lec25_countryPops.txt&#x27;</span>)


<span class="hljs-comment"># ## Plot populations </span>
<span class="hljs-comment"># plt.plot(pops)</span>
<span class="hljs-comment"># plt.title(&#x27;Population Size of Countries July 2017&#x27;)</span>
<span class="hljs-comment"># plt.ylabel(&#x27;Population&#x27;)</span>
<span class="hljs-comment"># plt.xlabel(&#x27;Country Rank Based on Size&#x27;)</span>
<span class="hljs-comment"># plt.semilogy()</span>

<span class="hljs-comment"># ## Investigate the first digits</span>
pops = getCountryPops(<span class="hljs-string">&#x27;lec25_countryPops.txt&#x27;</span>)
firstDigits = []
<span class="hljs-keyword">for</span> p <span class="hljs-keyword">in</span> pops:
    firstDigits.append(<span class="hljs-built_in">int</span>(<span class="hljs-built_in">str</span>(p)[<span class="hljs-number">0</span>]))
<span class="hljs-comment"># print(firstDigits)    </span>

<span class="hljs-comment">### Plot the fist digits, as found in order in the file</span>
<span class="hljs-comment"># plt.plot(firstDigits)</span>

<span class="hljs-comment">### Plot the histogram to show Benford&#x27;s law</span>
<span class="hljs-comment"># plt.hist(firstDigits, bins = 9)</span>


<span class="hljs-comment">####################################</span>
<span class="hljs-comment">## Comparing Cities Example </span>
<span class="hljs-comment">####################################</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">getCities</span>():
    inFile = <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;lec25_temperatures.csv&#x27;</span>)
    cities = []
    <span class="hljs-keyword">for</span> l <span class="hljs-keyword">in</span> inFile:
        c = l.split(<span class="hljs-string">&#x27;,&#x27;</span>)[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> c <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> cities:
            cities.append(c)
    <span class="hljs-keyword">return</span> cities

<span class="hljs-keyword">def</span> <span class="hljs-title function_">CtoF</span>(<span class="hljs-params">c</span>):
    <span class="hljs-keyword">return</span> (c * <span class="hljs-number">9</span>/<span class="hljs-number">5</span>) + <span class="hljs-number">32</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">getTempsForCity</span>(<span class="hljs-params">city</span>):
    inFile = <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;lec25_temperatures.csv&#x27;</span>)
    temps = []
    dates = []
    <span class="hljs-keyword">for</span> l <span class="hljs-keyword">in</span> inFile:
        data = l.strip().split(<span class="hljs-string">&#x27;,&#x27;</span>)
        c = data[<span class="hljs-number">0</span>]
        tem = data[<span class="hljs-number">1</span>]
        date = data[<span class="hljs-number">2</span>]
        <span class="hljs-keyword">if</span> c == city:
            temps.append(CtoF(<span class="hljs-built_in">float</span>(tem)))
            dates.append(date)
    <span class="hljs-keyword">return</span> temps, dates

<span class="hljs-keyword">def</span> <span class="hljs-title function_">getAverageTemps</span>():
    cities = getCities()[<span class="hljs-number">1</span>:]
    xPts = <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(cities))
    aveTemp = []
    cityLabels = []
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> cities:
        temps, dates = getTempsForCity(c)
        aveTemp.append(<span class="hljs-built_in">sum</span>(temps)/<span class="hljs-built_in">len</span>(temps))
        cityLabels.append(c[<span class="hljs-number">0</span>:<span class="hljs-number">2</span>])
        <span class="hljs-built_in">print</span>(c[<span class="hljs-number">0</span>:<span class="hljs-number">2</span>], <span class="hljs-built_in">sum</span>(temps)/<span class="hljs-built_in">len</span>(temps))
        
    plt.figure(<span class="hljs-string">&#x27;Temps&#x27;</span>)
    plt.scatter(xPts, aveTemp)
    plt.title(<span class="hljs-string">&#x27;Ave. Temperatures&#x27;</span>)
    plt.xlabel(<span class="hljs-string">&#x27;City&#x27;</span>)
    plt.ylabel((<span class="hljs-string">&#x27;Degrees F&#x27;</span>))
    plt.xticks(xPts, cityLabels)

<span class="hljs-comment">## print average temperatures for all cities (and plot them)</span>
<span class="hljs-comment"># getAverageTemps()</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">getAvgTempForYear</span>(<span class="hljs-params">tem, dat, y</span>):
    yearlyTemps = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(tem)):
        <span class="hljs-keyword">if</span> y == dat[i][:<span class="hljs-number">4</span>]:
            yearlyTemps.append(tem[i])
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>(yearlyTemps)/<span class="hljs-built_in">len</span>(yearlyTemps), y

<span class="hljs-comment">## List of temps and a corresponding list of dates for a specific city</span>
temps,dates = getTempsForCity(<span class="hljs-string">&#x27;SEATTLE&#x27;</span>)
<span class="hljs-comment">## zip makes tuples of (0th elem from temps and 0th from dates)</span>
<span class="hljs-comment">##                     (1st from temps and 1st from dates)</span>
<span class="hljs-comment">##                     (ith from temps and ith from dates), etc.</span>
<span class="hljs-comment"># print(list(zip(temps, dates)))</span>

<span class="hljs-comment">## average temperatures for one year</span>
<span class="hljs-comment"># print(getAvgTempForYear(temps, dates, &#x27;1961&#x27;))</span>

            
<span class="hljs-comment">##### plot average temperatures for a few different cities</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">getTempsByYearForCity</span>(<span class="hljs-params">city</span>):
    temps, dates = getTempsForCity(city)
    averages = []
    years = []
    <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1961</span>,<span class="hljs-number">2016</span>):
        tem = getAvgTempForYear(temps, dates, <span class="hljs-built_in">str</span>(y))[<span class="hljs-number">0</span>]
        averages.append(tem)
        years.append(<span class="hljs-built_in">str</span>(y))
    <span class="hljs-keyword">return</span> averages, years

<span class="hljs-keyword">if</span> <span class="hljs-literal">False</span>:
    plt.close()
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;BOSTON&#x27;</span>,<span class="hljs-string">&#x27;PHOENIX&#x27;</span>, <span class="hljs-string">&#x27;MIAMI&#x27;</span>, <span class="hljs-string">&#x27;SAN DIEGO&#x27;</span>):
        
        av, yr = getTempsByYearForCity(c)
        xPts = <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(yr))
        plt.figure(<span class="hljs-string">&#x27;Temps by City&#x27;</span>)
        plt.plot(xPts, av, label = c)
        plt.title(<span class="hljs-string">&#x27;Ave. Temperatures&#x27;</span>)
        plt.xlabel(<span class="hljs-string">&#x27;Years since 1961&#x27;</span>)
        plt.ylabel((<span class="hljs-string">&#x27;Degrees F&#x27;</span>))
        plt.legend(loc = <span class="hljs-string">&#x27;best&#x27;</span>)
        
        
<span class="hljs-comment">##### plot yearly average temperature for a city, including range</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">getTempsForYearRange</span>(<span class="hljs-params">tem, dat, y</span>):
    yearly = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(tem)):
        <span class="hljs-keyword">if</span> y == dat[i][:<span class="hljs-number">4</span>]:
            yearly.append(tem[i])
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">sum</span>(yearly)/<span class="hljs-built_in">len</span>(yearly), <span class="hljs-built_in">max</span>(yearly), <span class="hljs-built_in">min</span>(yearly), y
            
<span class="hljs-keyword">def</span> <span class="hljs-title function_">getTempsByYearForCityRange</span>(<span class="hljs-params">city</span>):
    temps, dates = getTempsForCity(city)
    averages = []
    maxes = []
    mins = []
    years = []
    <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1961</span>,<span class="hljs-number">2000</span>):
        tem, mx, mn, y = getTempsForYearRange(temps, dates, <span class="hljs-built_in">str</span>(y))
        averages.append(tem)
        maxes.append(mx)
        mins.append(mn)
        years.append(<span class="hljs-built_in">str</span>(y))
    <span class="hljs-keyword">return</span> averages, maxes, mins, years

<span class="hljs-keyword">if</span> <span class="hljs-literal">False</span>:
    plt.close()
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;BOSTON&#x27;</span>,<span class="hljs-string">&#x27;SAN DIEGO&#x27;</span>, <span class="hljs-string">&#x27;MIAMI&#x27;</span>):  <span class="hljs-comment"># try for BOSTON, SAN DIEGO, MIAMI</span>
        av, mx, mn, yr = getTempsByYearForCityRange(c)
        xPts = <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(yr))
        plt.figure(<span class="hljs-string">&#x27;Temps by City: &#x27;</span>+c)
        plt.ylim(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>)
        plt.plot(xPts, av, label = <span class="hljs-string">&#x27;mean&#x27;</span>)
        plt.plot(xPts, mx, label = <span class="hljs-string">&#x27;max&#x27;</span>)
        plt.plot(xPts, mn, label = <span class="hljs-string">&#x27;min&#x27;</span>)        
        plt.title(<span class="hljs-string">&#x27;Temperature Range: &#x27;</span> + c)
        plt.xlabel(<span class="hljs-string">&#x27;Years since 1961&#x27;</span>)
        plt.ylabel((<span class="hljs-string">&#x27;Degrees F&#x27;</span>))
        plt.legend(loc = <span class="hljs-string">&#x27;best&#x27;</span>)
        
        
<span class="hljs-comment">## look at number of days with a particular temperature by city</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">getDayDistributionForCity</span>(<span class="hljs-params">city, year</span>):
    <span class="hljs-comment"># assume a range of temperatures from 0 to 100</span>
    temps, dates = getTempsForCity(city)
    newTemps = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(dates)):
        <span class="hljs-keyword">if</span> year == dates[i][:<span class="hljs-number">4</span>]:
            newTemps.append(temps[i])
    <span class="hljs-comment">## want to map temperature to number of occurences</span>
    d = [<span class="hljs-number">0</span>]*<span class="hljs-number">100</span>
    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> newTemps:
        tRound = <span class="hljs-built_in">round</span>(t)
        d[tRound] += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> d

<span class="hljs-keyword">if</span> <span class="hljs-literal">False</span>:
    plt.close()
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;BOSTON&#x27;</span>,<span class="hljs-string">&#x27;SAN DIEGO&#x27;</span>, <span class="hljs-string">&#x27;MIAMI&#x27;</span>):  <span class="hljs-comment"># try for BOSTON, SAN DIEGO, MIAMI</span>
        ans = getDayDistributionForCity(c, <span class="hljs-string">&#x27;1961&#x27;</span>)
        temps = []
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">100</span>):
            temps.append(i)
        plt.figure(<span class="hljs-string">&#x27;Distribution of Temps by City: &#x27;</span>+c)
        plt.bar(temps, ans)
       
        plt.title(<span class="hljs-string">&#x27;Temperature Distribution: &#x27;</span> + c)
        plt.xlabel(<span class="hljs-string">&#x27;Temperature&#x27;</span>)
        plt.ylabel((<span class="hljs-string">&#x27;Number of days&#x27;</span>))


<span class="hljs-keyword">if</span> <span class="hljs-literal">False</span>:
    plt.close()
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;SAN DIEGO&#x27;</span>,):  <span class="hljs-comment"># try for BOSTON, SAN DIEGO</span>
        plt.figure(<span class="hljs-string">&#x27;Distribution of Temps by City&#x27;</span>)
        <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;1961&#x27;</span>,<span class="hljs-string">&#x27;2015&#x27;</span>): <span class="hljs-comment"># also check (&#x27;1961&#x27;,&#x27;2015&#x27;)</span>
            ans = getDayDistributionForCity(c, y)
            temps = []
            <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">100</span>):
                temps.append(i)
            <span class="hljs-keyword">if</span> y == <span class="hljs-string">&#x27;1961&#x27;</span>:
                plt.bar(temps, ans, color = <span class="hljs-string">&#x27;blue&#x27;</span>, label = y, alpha=<span class="hljs-number">0.5</span>)
            <span class="hljs-keyword">else</span>:
                plt.bar(temps, ans, color = <span class="hljs-string">&#x27;red&#x27;</span>, label = y, alpha=<span class="hljs-number">0.5</span>)
       
        plt.title(<span class="hljs-string">&#x27;Temperature Distribution: &#x27;</span> + c)
        plt.xlabel(<span class="hljs-string">&#x27;Temperature&#x27;</span>)
        plt.ylabel((<span class="hljs-string">&#x27;Number of days&#x27;</span>))
        plt.legend(loc = <span class="hljs-string">&#x27;best&#x27;</span>)

<span class="hljs-keyword">if</span> <span class="hljs-literal">False</span>:
    plt.close()
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;BOSTON&#x27;</span>,):  <span class="hljs-comment"># try for BOSTON, SAN DIEGO</span>
        plt.figure(<span class="hljs-string">&#x27;Distribution of Temps by City&#x27;</span>)
        <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;1961&#x27;</span>, <span class="hljs-string">&#x27;2015&#x27;</span>):
            ans = getDayDistributionForCity(c, y)
            temps = []
            <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">100</span>):
                temps.append(i)
            <span class="hljs-keyword">if</span> y == <span class="hljs-string">&#x27;1961&#x27;</span>:
                plt.subplot(<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)
                plt.ylim(<span class="hljs-number">0</span>,<span class="hljs-number">20</span>)
                plt.xlabel(<span class="hljs-string">&#x27;Temperature&#x27;</span>)
                plt.ylabel((<span class="hljs-string">&#x27;Number of days&#x27;</span>))
                plt.bar(temps, ans, color = <span class="hljs-string">&#x27;blue&#x27;</span>, label = y)
            <span class="hljs-keyword">else</span>:
                plt.subplot(<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)
                plt.ylim(<span class="hljs-number">0</span>,<span class="hljs-number">20</span>)
                plt.xlabel(<span class="hljs-string">&#x27;Temperature&#x27;</span>)
                plt.ylabel((<span class="hljs-string">&#x27;Number of days&#x27;</span>))
                plt.bar(temps, ans, color = <span class="hljs-string">&#x27;red&#x27;</span>, label = y)
       
        <span class="hljs-comment">#plt.title(&#x27;Temperature Distribution: &#x27; + c)</span>
        plt.legend(loc = <span class="hljs-string">&#x27;best&#x27;</span>)
</code></pre>
`,i={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,i as default,e as headings,t as html,l as slug,p as title};
