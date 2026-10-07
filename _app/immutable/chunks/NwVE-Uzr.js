const s="mit-6100l",a="lecture-23",n="المحاضرة 23: أمثلة على أصناف التعقيد (Complexity Classes)",t="notes",m="المحاضرة 23: أمثلة على أصناف التعقيد (Complexity Classes)",e=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-أصناف-التعقيد-أمثلة",text:"الشريحة 1: أصناف التعقيد — أمثلة"},{depth:2,id:"الشريحة-2-ثيتا-θ",text:"الشريحة 2: ثيتا (Θ)"},{depth:2,id:"الشريحة-3-من-أين-تأتي-الدالة",text:"الشريحة 3: من أين تأتي الدالة؟"},{depth:2,id:"الشريحة-4-من-أين-تأتي-الدالة-طريقة-أسرع",text:"الشريحة 4: من أين تأتي الدالة؟ (طريقة أسرع)"},{depth:2,id:"الشريحة-5-أصناف-التعقيد",text:"الشريحة 5: أصناف التعقيد"},{depth:2,id:"الشريحة-6-التعقيد-الثابت",text:"الشريحة 6: التعقيد الثابت"},{depth:2,id:"الشريحة-7-التعقيد-الثابت",text:"الشريحة 7: التعقيد الثابت"},{depth:2,id:"الشريحة-8-التعقيد-الثابت-مثال-١",text:"الشريحة 8: التعقيد الثابت: مثال ١"},{depth:2,id:"الشريحة-9-التعقيد-الثابت-مثال-٢",text:"الشريحة 9: التعقيد الثابت: مثال ٢"},{depth:2,id:"الشريحة-10-التعقيد-الثابت-مثال-٣",text:"الشريحة 10: التعقيد الثابت: مثال ٣"},{depth:2,id:"الشريحة-11-التعقيد-الخطي",text:"الشريحة 11: التعقيد الخطّي"},{depth:2,id:"الشريحة-12-التعقيد-الخطي",text:"الشريحة 12: التعقيد الخطّي"},{depth:2,id:"الشريحة-13-مثال-تعقيد-صفر-بمفاجأة",text:"الشريحة 13: مثال تعقيد صفر (بمفاجأة)"},{depth:2,id:"الشريحة-14-الفكرة-الكبرى",text:"الشريحة 14: الفكرة الكبرى"},{depth:2,id:"الشريحة-15-التعقيد-الخطي-مثال-١",text:"الشريحة 15: التعقيد الخطّي: مثال ١"},{depth:2,id:"الشريحة-16-التعقيد-الخطي-مثال-٢",text:"الشريحة 16: التعقيد الخطّي: مثال ٢"},{depth:2,id:"الشريحة-17-مسألة-طريفة-حول-المضروب-وpython",text:"الشريحة 17: مسألة طريفة حول المضروب وPython"},{depth:2,id:"الشريحة-18-التعقيد-الخطي-مثال-٣",text:"الشريحة 18: التعقيد الخطّي: مثال ٣"},{depth:2,id:"الشريحة-19-التعقيد-الخطي-مثال-٤",text:"الشريحة 19: التعقيد الخطّي: مثال ٤"},{depth:2,id:"الشريحة-20-تعقيد-فيبوناتشي-التكراري",text:"الشريحة 20: تعقيد فيبوناتشي التكراري"},{depth:2,id:"الشريحة-21-التعقيد-متعدد-الحدود-polynomial",text:"الشريحة 21: التعقيد متعدّد الحدود (Polynomial)"},{depth:2,id:"الشريحة-22-التعقيد-متعدد-الحدود-غالبا-تربيعي",text:"الشريحة 22: التعقيد متعدّد الحدود (غالبًا تربيعي)"},{depth:2,id:"الشريحة-23-التعقيد-التربيعي-مثال-١",text:"الشريحة 23: التعقيد التربيعي: مثال ١"},{depth:2,id:"الشريحة-24-التعقيد-التربيعي-مثال-٢",text:"الشريحة 24: التعقيد التربيعي: مثال ٢"},{depth:2,id:"الشريحة-25-التعقيد-التربيعي-مثال-٢-التحليل",text:"الشريحة 25: التعقيد التربيعي: مثال ٢ (التحليل)"},{depth:2,id:"الشريحة-26-التعقيد-التربيعي-مثال-٣",text:"الشريحة 26: التعقيد التربيعي: مثال ٣"},{depth:2,id:"الشريحة-27-التعقيد-التربيعي-مثال-٣-التحليل",text:"الشريحة 27: التعقيد التربيعي: مثال ٣ (التحليل)"},{depth:2,id:"الشريحة-28-تعقيد-القطر-diameter",text:"الشريحة 28: تعقيد القطر (diameter)"},{depth:2,id:"الشريحة-29-جرب-بنفسك-you-try-it",text:"الشريحة 29: جرّب بنفسك (YOU TRY IT!)"},{depth:2,id:"الشريحة-30-جرب-بنفسك-you-try-it",text:"الشريحة 30: جرّب بنفسك (YOU TRY IT!)"},{depth:2,id:"الشريحة-31-التعقيد-الأسي-exponential",text:"الشريحة 31: التعقيد الأُسّي (Exponential)"},{depth:2,id:"الشريحة-32-التعقيد-الأسي",text:"الشريحة 32: التعقيد الأُسّي"},{depth:2,id:"الشريحة-33-تعقيد-فيبوناتشي-الذاتي",text:"الشريحة 33: تعقيد فيبوناتشي الذاتي"},{depth:2,id:"الشريحة-34-تعقيد-فيبوناتشي-الذاتي-شجرة-الاستدعاء",text:"الشريحة 34: تعقيد فيبوناتشي الذاتي (شجرة الاستدعاء)"},{depth:2,id:"الشريحة-35-التعقيد-الأسي-توليد-المجموعات-الفرعية",text:"الشريحة 35: التعقيد الأُسّي: توليد المجموعات الفرعية"},{depth:2,id:"الشريحة-36-تمثيل-الخوارزمية-الخطوة-الأولى",text:"الشريحة 36: تمثيل الخوارزمية — الخطوة الأولى"},{depth:2,id:"الشريحة-37-تمثيل-الخوارزمية-ما-بعد-الحالة-الأساسية",text:"الشريحة 37: تمثيل الخوارزمية — ما بعد الحالة الأساسية"},{depth:2,id:"الشريحة-38-تمثيل-الخوارزمية-بعد-أول-استدعاء-ذاتي-مكتمل",text:"الشريحة 38: تمثيل الخوارزمية — بعد أول استدعاء ذاتي مكتمل"},{depth:2,id:"الشريحة-39-تمثيل-الخوارزمية-الجانب-الأيسر-مكتمل",text:"الشريحة 39: تمثيل الخوارزمية — الجانب الأيسر مكتمل"},{depth:2,id:"الشريحة-40-تمثيل-الخوارزمية-اكتمال-الشجرة",text:"الشريحة 40: تمثيل الخوارزمية — اكتمال الشجرة"},{depth:2,id:"الشريحة-41-تمثيل-الخوارزمية-الشكل-النهائي-للشجرة",text:"الشريحة 41: تمثيل الخوارزمية — الشكل النهائي للشجرة"},{depth:2,id:"الشريحة-42-التعقيد-الأسي-توليد-المجموعات-الفرعية",text:"الشريحة 42: التعقيد الأُسّي — توليد المجموعات الفرعية"},{depth:2,id:"الشريحة-43-التعقيد-الأسي-توليد-المجموعات-الفرعية-الحساب",text:"الشريحة 43: التعقيد الأُسّي — توليد المجموعات الفرعية (الحساب)"},{depth:2,id:"الشريحة-44-التعقيد-اللوغاريتمي",text:"الشريحة 44: التعقيد اللوغاريتمي"},{depth:2,id:"الشريحة-45-تعقيد-صعب",text:"الشريحة 45: تعقيد صعب"},{depth:2,id:"الشريحة-46-تعقيد-صعب",text:"الشريحة 46: تعقيد صعب"},{depth:2,id:"الشريحة-47-تعقيد-صعب",text:"الشريحة 47: تعقيد صعب"},{depth:2,id:"الشريحة-48-تعقيد-صعب",text:"الشريحة 48: تعقيد صعب"},{depth:2,id:"الشريحة-49-تعقيد-صعب-الحل",text:"الشريحة 49: تعقيد صعب (الحل)"},{depth:2,id:"الشريحة-50-التعقيد-اللوغاريتمي",text:"الشريحة 50: التعقيد اللوغاريتمي"},{depth:2,id:"الشريحة-51-القوائم-والقواميس",text:"الشريحة 51: القوائم والقواميس"},{depth:2,id:"الشريحة-52-خوارزميات-البحث",text:"الشريحة 52: خوارزميات البحث"},{depth:2,id:"الشريحة-53-خوارزميات-البحث",text:"الشريحة 53: خوارزميات البحث"},{depth:2,id:"الشريحة-54-البحث-الخطي-على-قائمة-غير-مرتبة",text:"الشريحة 54: البحث الخطّي على قائمة غير مرتّبة"},{depth:2,id:"الشريحة-55-البحث-الخطي-على-قائمة-غير-مرتبة-نسخة-ثانية",text:"الشريحة 55: البحث الخطّي على قائمة غير مرتّبة (نسخة ثانية)"},{depth:2,id:"الشريحة-56-البحث-الخطي-على-قائمة-مرتبة",text:"الشريحة 56: البحث الخطّي على قائمة مرتّبة"},{depth:2,id:"الشريحة-57-البحث-بالتنصيف-عن-عنصر-في-قائمة-مرتبة",text:"الشريحة 57: البحث بالتنصيف عن عنصر في قائمة مرتّبة"},{depth:2,id:"الشريحة-58-تحليل-تعقيد-البحث-بالتنصيف",text:"الشريحة 58: تحليل تعقيد البحث بالتنصيف"},{depth:2,id:"الشريحة-59-الفكرة-الكبرى",text:"الشريحة 59: الفكرة الكبرى"},{depth:2,id:"الشريحة-60-البحث-بالتنصيف-التنفيذ-١",text:"الشريحة 60: البحث بالتنصيف — التنفيذ ١"},{depth:2,id:"الشريحة-61-تعقيد-bisectsearch1-حيث-n-هو-lenl",text:"الشريحة 61: تعقيد bisect_search1 (حيث n هو len(L))"},{depth:2,id:"الشريحة-62-تنفيذ-بديل-للبحث-بالتنصيف",text:"الشريحة 62: تنفيذ بديل للبحث بالتنصيف"},{depth:2,id:"الشريحة-63-البحث-بالتنصيف-التنفيذ-٢",text:"الشريحة 63: البحث بالتنصيف — التنفيذ ٢"},{depth:2,id:"الشريحة-64-تعقيد-bisectsearch2-ودالة-المساعد-حيث-n-هو-lenl",text:"الشريحة 64: تعقيد bisect_search2 ودالة المساعِد (حيث n هو len(L))"},{depth:2,id:"الشريحة-65-متى-نرتب-أولا-ثم-نبحث",text:"الشريحة 65: متى نرتب أولًا ثم نبحث؟"},{depth:2,id:"الشريحة-66-البحث-في-قائمة-مرتبة-حيث-n-هو-lenl",text:"الشريحة 66: البحث في قائمة مرتّبة — حيث n هو len(L)"},{depth:2,id:"الشريحة-67-التكلفة-المطفرة-amortized-cost-حيث-n-هو-lenl",text:"الشريحة 67: التكلفة المُطفَّرة (Amortized Cost) — حيث n هو len(L)"},{depth:2,id:"الشريحة-68-خلاصة-أصناف-التعقيد",text:"الشريحة 68: خلاصة أصناف التعقيد"},{depth:2,id:"الشريحة-69-mit-opencourseware",text:"الشريحة 69: MIT OpenCourseWare"}],p=`<h1>المحاضرة 23: أمثلة على أصناف التعقيد (Complexity Classes)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة على MIT OpenCourseWare: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-23-complexity-classes-examples/</li>
<li>ملف الشرائح (صفحة الوصف): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec23_pdf/</li>
<li>ملف الشرائح (PDF مباشر): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec23.pdf</li>
<li>ملف الشيفرة: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec23_code_py/</li>
<li>تفريغ المحاضرة على MIT OpenCourseWare (بالإنجليزية): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec23/</li>
<li>الترخيص: CC BY-NC-SA 4.0 — https://creativecommons.org/licenses/by-nc-sa/4.0/</li>
<li>شروط الاستخدام في MIT OpenCourseWare: https://ocw.mit.edu/terms/</li>
</ul>
<p><strong>منهج الترجمة:</strong> نُقلت هذه المحاضرة ترجمةً عربية كاملة أمينة لمحتوى ملف الشرائح الأصلي في MIT OpenCourseWare، تحت رخصة CC BY-NC-SA 4.0 التي تسمح بإعادة التوزيع مع الإبقاء على الإسناد والتأهيل والإشارة إلى التغيير، وبشرط أن يكون الاستخدام غير تجاري وأن تُوزَّع كل ترجمة مشتقّة تحت الرخصة نفسها. أُبقيت الشيفرة الخوارزمية والشيفرة الكاذبة (pseudocode) كما هي بالإنجليزية، ولم تُترجَم الأسماء والمكتبة ولا الكلمات المفتاحية في Python. حُوِّلت الأعمدة المتجاورة في الشرائح إلى جداول لأن نصّ الملف المستخرَج لا يحفظ مواضعها، ولكل شريحة من الشرائح التسع والستين عنوانها الخاص. لم تُضمَّن أيّ صور أو رسوم من الملف الأصلي لأن ترخيص بعض صورها مستقلّ عن رخصة MIT ولم يُتحقَّق منه.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> تحمل تذييل شرائح هذه المحاضرة سطرًا متبقّيًا من عرض أقدم (<code>6.0001 LECTURE 8</code> / <code>6.0001 LECTURE 9</code>) استُخدمت الشرائح فيه كقالب. هذا أثر موجود في ملف MIT الأصلي، وليس إشارة إلى مقرر آخر، وقد أُبقي على ذكره هنا للتوضيح.</p>
</blockquote>
<h2 id="الشريحة-1-أصناف-التعقيد-أمثلة">الشريحة 1: أصناف التعقيد — أمثلة</h2>
<p>هذه المحاضرة أمثلة على أصناف التعقيد (Complexity Classes). يُرفق ملف الشرائح وملفات <code>.py</code> للمتابعة الجانبيًا.</p>
<h2 id="الشريحة-2-ثيتا-θ">الشريحة 2: ثيتا (Θ)</h2>
<ul>
<li>نرمز إلى التعقيد الحتمي (asymptotic complexity) بالحرف ثيتا Θ.</li>
<li>ننظر إلى حدّ المدخل الذي يهيمن على الدالة.</li>
<li>نُسقط الأجزاء الأخرى التي لا تنمو بسرعة، ونُسقط الثوابت الجمعية، ونُسقط الثوابت الضربية.</li>
<li>ينتهي الأمر إلى عدد قليل من أصناف الخوارزميات.</li>
<li>سننظر اليوم إلى شيفرة تقع في كل واحد من هذه الأصناف.</li>
</ul>
<h2 id="الشريحة-3-من-أين-تأتي-الدالة">الشريحة 3: من أين تأتي الدالة؟</h2>
<p>بالنظر إلى الشيفرة، ابدأ بمعاملات الإدخال: ما هي؟ ثم صُغ المعادلة التي تربط الإدخال بعدد العمليات.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">f</span>(<span class="hljs-params">L, L1, L2</span>):
    inL1 = <span class="hljs-literal">False</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L1)):
        <span class="hljs-keyword">if</span> L[i] == L1[i]:
            inL1 = <span class="hljs-literal">True</span>
    inL2 = <span class="hljs-literal">False</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L2)):
        <span class="hljs-keyword">if</span> L[i] == L2[i]:
            inL2 = <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> inL1 <span class="hljs-keyword">and</span> inL2
</code></pre>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>f</mi><mo>=</mo><mn>1</mn><mo>+</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mn>5</mn><mo>+</mo><mn>1</mn><mo>+</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo>∗</mo><mn>5</mn><mo>+</mo><mn>2</mn><mo>=</mo><mn>5</mn><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mn>5</mn><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo>+</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">f = 1 + len(L1)*5 + 1 + len(L2)*5 + 2 = 5*len(L1) + 5*len(L2) + 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></span>
<p>إذا كان الطولان متساويين، فإن:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>f</mi><mo>=</mo><mn>10</mn><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo>+</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">f = 10*len(L) + 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">10</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></span>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>f</mi><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>10</mn><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo>+</mo><mn>3</mn><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(f) = \\Theta(10*len(L) + 3) = \\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">10</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">3</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span></span>
<h2 id="الشريحة-4-من-أين-تأتي-الدالة-طريقة-أسرع">الشريحة 4: من أين تأتي الدالة؟ (طريقة أسرع)</h2>
<p>لا حاجة لصياغة المعادلة الدقيقة. ابحث عن الحلقات وعن كل ما يتكرّر بدلالة معاملات الإدخال. وكل ما عداه ثابت.</p>
<p>نفس الدالة <code>f(L, L1, L2)</code> السابقة، والحلقتان <code>for i in range(len(L1))</code> و <code>for i in range(len(L2))</code> هما كل ما يتكرّر بدلالة الإدخال.</p>
<h2 id="الشريحة-5-أصناف-التعقيد">الشريحة 5: أصناف التعقيد</h2>
<p><code>n</code> هو المدخل. نريد تصميم خوارزميات تكون أقرب ما يمكن إلى قمة هذا التسلسل قدر الإمكان.</p>
<table>
<thead>
<tr>
<th>الرمز</th>
<th>الدلالة</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
<td>زمن تشغيل ثابت (constant running time)</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td>زمن تشغيل لوغاريتمي (logarithmic)</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td>زمن تشغيل خطّي (linear)</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n \\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td>زمن تشغيل خطّي لوغاريتمي (log-linear)</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><msup><mi>n</mi><mi>c</mi></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n^c)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">c</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></td>
<td>زمن تشغيل متعدّد الحدود (polynomial)، حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>c</mi></mrow><annotation encoding="application/x-tex">c</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">c</span></span></span></span> ثابت</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><msup><mi>c</mi><mi>n</mi></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(c^n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></td>
<td>زمن تشغيل أُسّي (exponential)، حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>c</mi></mrow><annotation encoding="application/x-tex">c</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">c</span></span></span></span> ثابت مرفوع إلى قوّة تعتمد على حجم الإدخال</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشرائح الأصلية تكتب الحدّين الأخيرين بالإحراف مطبوعًا على هيئة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi>c</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(nc)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord mathnormal">c</span><span class="mclose">)</span></span></span></span> و <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>c</mi><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(cn)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">c</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، لكن المقصود هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>n</mi><mi>c</mi></msup></mrow><annotation encoding="application/x-tex">n^c</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">c</span></span></span></span></span></span></span></span></span></span></span> و <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>c</mi><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">c^n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span>، وقد ضبطتُهما هنا على الصورة الصحيحة لأن بقية الشرائح تستخدمهما بذلك.</p>
</blockquote>
<h2 id="الشريحة-6-التعقيد-الثابت">الشريحة 6: التعقيد الثابت</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-7-التعقيد-الثابت">الشريحة 7: التعقيد الثابت</h2>
<ul>
<li>تعقيد مستقل عن المدخلات.</li>
<li>الخوارزميات المثيرة للاهتمام في هذا الصنف قليلة، لكن كثيرًا من الخوارزميات يمكن أن تحتوي أجزاءً تقع في هذا الصنف.</li>
<li>يمكن أن توجد حلقات أو استدعاءات ذاتية، لكن عدد التكرارات أو الاستدعاءات لا يعتمد على حجم المدخل.</li>
<li>بعض العمليات المدمجة في اللغة ثابتة الزمن:
<ul>
<li>الفهرسة في قائمة في Python: <code>L[i]</code></li>
<li>الإلحاق في قائمة: <code>L.append()</code></li>
<li>البحث في قاموس: <code>d[key]</code></li>
</ul>
</li>
</ul>
<h2 id="الشريحة-8-التعقيد-الثابت-مثال-١">الشريحة 8: التعقيد الثابت: مثال ١</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">x, y</span>):
    <span class="hljs-keyword">return</span> x+y
</code></pre>
<p>التعقيد بدلالة <code>x</code> أو بدلالة <code>y</code>: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<h2 id="الشريحة-9-التعقيد-الثابت-مثال-٢">الشريحة 9: التعقيد الثابت: مثال ٢</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_to_km</span>(<span class="hljs-params">m</span>):
    <span class="hljs-keyword">return</span> m*<span class="hljs-number">1.609</span>
</code></pre>
<p>التعقيد بدلالة <code>m</code>: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<h2 id="الشريحة-10-التعقيد-الثابت-مثال-٣">الشريحة 10: التعقيد الثابت: مثال ٣</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">loop</span>(<span class="hljs-params">x</span>):
    y = <span class="hljs-number">100</span>
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(y):
        total += x
    <span class="hljs-keyword">return</span> total
</code></pre>
<p>التعقيد بدلالة <code>x</code> (معامل الإدخال): <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>، لأن الحدّ الأقصى للتكرارات هو 100 أي عدد ثابت لا علاقة له بـ <code>x</code>.</p>
<h2 id="الشريحة-11-التعقيد-الخطي">الشريحة 11: التعقيد الخطّي</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-12-التعقيد-الخطي">الشريحة 12: التعقيد الخطّي</h2>
<ul>
<li>خوارزميات حلقية تكرارية بسيطة (simple iterative loop algorithms).</li>
<li>يجب أن تكون الحلقات دالةً في المدخل.</li>
<li>البحث الخطّي عن عنصر في قائمة (linear search): هل العنصر موجود أم لا.</li>
<li>دوال ذاتية (recursive functions) فيها استدعاء ذاتي واحد فقط وتكلفة ثابتة للاستدعاء نفسه.</li>
<li>بعض العمليات المدمجة خطّية:
<ul>
<li><code>e in L</code></li>
<li>شريحة من قائمة، مثل <code>L[:len(L)//2]</code></li>
<li><code>L1 == L2</code></li>
<li><code>del(L[5])</code></li>
</ul>
</li>
</ul>
<h2 id="الشريحة-13-مثال-تعقيد-صفر-بمفاجأة">الشريحة 13: مثال تعقيد صفر (بمفاجأة)</h2>
<p>اضرب <code>x</code> في <code>y</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">mul</span>(<span class="hljs-params">x, y</span>):
    tot = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(y):
        tot += x
    <span class="hljs-keyword">return</span> tot
</code></pre>
<ul>
<li>التعقيد بدلالة <code>y</code>: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>y</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(y)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span></span></span></span>.</li>
<li>التعقيد بدلالة <code>x</code>: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<h2 id="الشريحة-14-الفكرة-الكبرى">الشريحة 14: الفكرة الكبرى</h2>
<p>انتبه جيدًا إلى ما هي المدخلات.</p>
<h2 id="الشريحة-15-التعقيد-الخطي-مثال-١">الشريحة 15: التعقيد الخطّي: مثال ١</h2>
<p>اجمع خانات نصّ، على افتراض أنه مكوَّن من خانات عشرية.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">add_digits</span>(<span class="hljs-params">s</span>):
    val = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> s:
        val += <span class="hljs-built_in">int</span>(c)
    <span class="hljs-keyword">return</span> val
</code></pre>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(s))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mclose">))</span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(s)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mclose">)</span></span></span></span></li>
</ul>
<h2 id="الشريحة-16-التعقيد-الخطي-مثال-٢">الشريحة 16: التعقيد الخطّي: مثال ٢</h2>
<p>حلقة لإيجاد مضروب عدد <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≥</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">\\ge 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> (factorial).</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fact_iter</span>(<span class="hljs-params">n</span>):
    prod = <span class="hljs-number">1</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>, n+<span class="hljs-number">1</span>):
        prod *= i
    <span class="hljs-keyword">return</span> prod
</code></pre>
<ul>
<li>عدد مرات الدوران حول الحلقة هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n-1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>.</li>
<li>عدد العمليات داخل الحلقة ثابت، ومستقل عن <code>n</code>.</li>
<li>الإجمالي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> فقط.</li>
</ul>
<h2 id="الشريحة-17-مسألة-طريفة-حول-المضروب-وpython">الشريحة 17: مسألة طريفة حول المضروب وPython</h2>
<ul>
<li>المضروب ينمو في النهاية أسرع من النمو الخطّي.</li>
<li>السبب أن Python يزيد حجم الأعداد الصحيحة، مما يجعل العمليات أكثر كلفة.</li>
<li>في هذا الصف نُهمل هذه التأثيرات.</li>
</ul>
<h2 id="الشريحة-18-التعقيد-الخطي-مثال-٣">الشريحة 18: التعقيد الخطّي: مثال ٣</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fact_recur</span>(<span class="hljs-params">n</span>):
    <span class="hljs-string">&quot;&quot;&quot; assume n &gt;= 0 &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> n &lt;= <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> n*fact_recur(n – <span class="hljs-number">1</span>)
</code></pre>
<ul>
<li>يحسب المضروب بطريقة ذاتية.</li>
<li>إن قِست الزمن، ستلاحظ أنه أبطأ قليلًا من النسخة التكرارية بسبب استدعاءات الدوال.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> لأن عدد استدعاءات الدوال خطّي في <code>n</code>.</li>
<li>تنفيذا المضروب، التكراري والذاتي، لهما ترتيب النمو نفسه.</li>
</ul>
<h2 id="الشريحة-19-التعقيد-الخطي-مثال-٤">الشريحة 19: التعقيد الخطّي: مثال ٤</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">compound</span>(<span class="hljs-params">invest, interest, n_months</span>):
    total=<span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n_months):
        total = total * interest + invest Θ(<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> total
</code></pre>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi mathvariant="normal">_</mi><mi>m</mi><mi>o</mi><mi>n</mi><mi>t</mi><mi>h</mi><mi>s</mi><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi mathvariant="normal">_</mi><mi>m</mi><mi>o</mi><mi>n</mi><mi>t</mi><mi>h</mi><mi>s</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1) * \\Theta(n\\_months) = \\Theta(n\\_months)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.06em;vertical-align:-0.31em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord" style="margin-right:0.0278em;">_</span><span class="mord mathnormal">m</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mord mathnormal">s</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.06em;vertical-align:-0.31em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord" style="margin-right:0.0278em;">_</span><span class="mord mathnormal">m</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mord mathnormal">s</span><span class="mclose">)</span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>n</mi><mi mathvariant="normal">_</mi><mi>m</mi><mi>o</mi><mi>n</mi><mi>t</mi><mi>h</mi><mi>s</mi></mrow><annotation encoding="application/x-tex">n = n\\_months</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord mathnormal">n</span><span class="mord" style="margin-right:0.0278em;">_</span><span class="mord mathnormal">m</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mord mathnormal">s</span></span></span></span></li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi mathvariant="normal">_</mi><mi>m</mi><mi>o</mi><mi>n</mi><mi>t</mi><mi>h</mi><mi>s</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n\\_months)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.06em;vertical-align:-0.31em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord" style="margin-right:0.0278em;">_</span><span class="mord mathnormal">m</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mord mathnormal">s</span><span class="mclose">)</span></span></span></span></li>
<li>إن كنت دقيقًا إلى حدّ كبير، فلا بد من احتساب جملتي الإسناد والإرجاع:
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mn>4</mn><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>+</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mn>4</mn><mo>∗</mo><mi>n</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1) + 4*\\Theta(n) + \\Theta(1) = \\Theta(1 + 4*n + 1) = \\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">4</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">4</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>n</mi><mi mathvariant="normal">_</mi><mi>m</mi><mi>o</mi><mi>n</mi><mi>t</mi><mi>h</mi><mi>s</mi></mrow><annotation encoding="application/x-tex">n = n\\_months</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord mathnormal">n</span><span class="mord" style="margin-right:0.0278em;">_</span><span class="mord mathnormal">m</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mord mathnormal">s</span></span></span></span>.</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> وسم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span> الظاهر في سطر جسم الحلقة هو تعليق تربوي كتبه MIT الأصلي على حاشية السطر نفسه؛ أُبقي كما هو لأنه جزء من الشريحة.</p>
</blockquote>
<h2 id="الشريحة-20-تعقيد-فيبوناتشي-التكراري">الشريحة 20: تعقيد فيبوناتشي التكراري</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fib_iter</span>(<span class="hljs-params">n</span>):
    <span class="hljs-keyword">if</span> n == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">elif</span> n == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        fib_i = <span class="hljs-number">0</span>
        fib_ii = <span class="hljs-number">1</span>
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n-<span class="hljs-number">1</span>):
            tmp = fib_i
            fib_i = fib_ii
            fib_ii = tmp + fib_ii
        <span class="hljs-keyword">return</span> fib_ii
</code></pre>
<p>الحساب: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1) + \\Theta(1) + \\Theta(n) * \\Theta(1) + \\Theta(1) = \\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></p>
<h2 id="الشريحة-21-التعقيد-متعدد-الحدود-polynomial">الشريحة 21: التعقيد متعدّد الحدود (Polynomial)</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-22-التعقيد-متعدد-الحدود-غالبا-تربيعي">الشريحة 22: التعقيد متعدّد الحدود (غالبًا تربيعي)</h2>
<ul>
<li>أكثر خوارزميات متعدّدة الحدود شيوعًا هي التربيعية، أي أن التعقيد ينمو مع مربّع حجم المدخل.</li>
<li>يظهر عادةً عندما تكون لدينا حلقات متداخلة (nested loops) أو استدعاءات ذاتية لدوال.</li>
</ul>
<h2 id="الشريحة-23-التعقيد-التربيعي-مثال-١">الشريحة 23: التعقيد التربيعي: مثال ١</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">g</span>(<span class="hljs-params">n</span>):
    <span class="hljs-string">&quot;&quot;&quot; assume n &gt;= 0 &quot;&quot;&quot;</span>
    x = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
            x += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> x
</code></pre>
<ul>
<li>يحسب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>n</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">n^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span> بطريقة غير فعّالة جدًّا.</li>
<li>انظر إلى الحلقات: هل هي بدلالة المُدخل؟</li>
<li>حلقات متداخلة.</li>
<li>انظر إلى المدى: <code>range(n)</code> لكل منهما.</li>
<li>كل حلقة تتكرّر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> مرّات.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><msup><mi>n</mi><mn>2</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n) * \\Theta(n) * \\Theta(1) = \\Theta(n^2)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></li>
</ul>
<h2 id="الشريحة-24-التعقيد-التربيعي-مثال-٢">الشريحة 24: التعقيد التربيعي: مثال ٢</h2>
<p>هل <code>L1</code> مجموعة جزئية (subset) من <code>L2</code>؟ أي: هل كل عناصر <code>L1</code> موجودة في <code>L2</code>؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_subset</span>(<span class="hljs-params">L1, L2</span>):
    <span class="hljs-keyword">for</span> e1 <span class="hljs-keyword">in</span> L1:
        matched = <span class="hljs-literal">False</span>
        <span class="hljs-keyword">for</span> e2 <span class="hljs-keyword">in</span> L2:
            <span class="hljs-keyword">if</span> e1 == e2:
                matched = <span class="hljs-literal">True</span>
                <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> matched:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
</code></pre>
<table>
<thead>
<tr>
<th>الحالة</th>
<th><code>L1</code></th>
<th><code>L2</code></th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td>نعم</td>
<td><code>[3, 5, 2]</code></td>
<td><code>[2, 3, 5, 9]</code></td>
<td>كل عناصر <code>L1</code> في <code>L2</code></td>
</tr>
<tr>
<td>لا</td>
<td><code>[3, 5, 2]</code></td>
<td><code>[2, 5, 9]</code></td>
<td>العنصر <code>3</code> غير موجود في <code>L2</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-25-التعقيد-التربيعي-مثال-٢-التحليل">الشريحة 25: التعقيد التربيعي: مثال ٢ (التحليل)</h2>
<p>نفس الدالة <code>is_subset</code>، مع الشرح:</p>
<ul>
<li>الحلقة الخارجية تُنفَّذ <code>len(L1)</code> مرّة.</li>
<li>كل تكرار لها يُنفّذ الحلقة الداخلية حتى <code>len(L2)</code> مرّة.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1) * len(L2))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">))</span></span></span></span></li>
<li>إذا كان <code>L1</code> و <code>L2</code> بالطول نفسه، ولم يكن أيّ عنصر من <code>L1</code> في <code>L2</code>: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1)^2)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></li>
</ul>
<h2 id="الشريحة-26-التعقيد-التربيعي-مثال-٣">الشريحة 26: التعقيد التربيعي: مثال ٣</h2>
<p>ابحث عن تقاطع قائمتين، وأعِد قائمة فيها كل عنصر يظهر مرّة واحدة فقط.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">intersect</span>(<span class="hljs-params">L1, L2</span>):
    tmp = []
    <span class="hljs-keyword">for</span> e1 <span class="hljs-keyword">in</span> L1:
        <span class="hljs-keyword">for</span> e2 <span class="hljs-keyword">in</span> L2:
            <span class="hljs-keyword">if</span> e1 == e2:
                tmp.append(e1)
    unique = []
    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> tmp:
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span>(e <span class="hljs-keyword">in</span> unique):
            unique.append(e)
    <span class="hljs-keyword">return</span> unique
</code></pre>
<table>
<thead>
<tr>
<th><code>L1</code></th>
<th><code>L2</code></th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>[3, 5, 2]</code></td>
<td><code>[2, 3, 5, 9]</code></td>
<td><code>[2, 3, 5]</code></td>
</tr>
<tr>
<td><code>[7, 7, 7]</code></td>
<td><code>[7, 7, 7]</code></td>
<td><code>[7]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-27-التعقيد-التربيعي-مثال-٣-التحليل">الشريحة 27: التعقيد التربيعي: مثال ٣ (التحليل)</h2>
<ul>
<li>الحلقة المتداخلة الأولى تأخذ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1) * len(L2))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">))</span></span></span></span> خطوة.</li>
<li>الحلقة الثانية تأخذ على الأكثر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1) * len(L2))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">))</span></span></span></span> خطوة. وهي عادةً ليست بالسوءة هذه.
<ul>
<li>مثال: <code>[7,7,7]</code> و <code>[7,7,7]</code> ينتج <code>tmp=[7,7,7,7,7,7,7,7,7]</code>.</li>
</ul>
</li>
<li>الإجمالي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1) * len(L2))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">))</span></span></span></span></li>
</ul>
<h2 id="الشريحة-28-تعقيد-القطر-diameter">الشريحة 28: تعقيد القطر (diameter)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">diameter</span>(<span class="hljs-params">L</span>):
    farthest_dist = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L)):
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(i+<span class="hljs-number">1</span>, <span class="hljs-built_in">len</span>(L)):
            p1 = L[i]
            p2 = L[j]
            dist = math.sqrt( (p1[<span class="hljs-number">0</span>]-p2[<span class="hljs-number">0</span>])**<span class="hljs-number">2</span> + (p1[<span class="hljs-number">1</span>]-p2[<span class="hljs-number">1</span>])**<span class="hljs-number">2</span> )
            <span class="hljs-keyword">if</span> dist &gt; farthest_dist:
                farthest_dist = dist
    <span class="hljs-keyword">return</span> farthest_dist
</code></pre>
<p>عدد التكرارات: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mi mathvariant="normal">/</mi><mn>2</mn><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mi mathvariant="normal">/</mi><mn>2</mn></mrow><annotation encoding="application/x-tex">len(L) * len(L)/2 = len(L)^2 / 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span><span class="mord">/2</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mord">/2</span></span></span></span>، أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L)^2)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>.</p>
<h2 id="الشريحة-29-جرب-بنفسك-you-try-it">الشريحة 29: جرّب بنفسك (YOU TRY IT!)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">all_digits</span>(<span class="hljs-params">nums</span>):
    <span class="hljs-string">&quot;&quot;&quot; nums is a list of numbers &quot;&quot;&quot;</span>
    digits = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>,<span class="hljs-number">8</span>,<span class="hljs-number">9</span>]
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> nums:
        isin = <span class="hljs-literal">False</span>
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> digits:
            <span class="hljs-keyword">if</span> i == j:
                isin = <span class="hljs-literal">True</span>
                <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> isin:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
</code></pre>
<p><strong>الإجابة:</strong> ما المدخل؟ الحلقة الخارجية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi>u</mi><mi>m</mi><mi>s</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(nums)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal">m</span><span class="mord mathnormal">s</span><span class="mclose">)</span></span></span></span>، والحلقة الداخلية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span> لأن <code>digits</code> دائمًا عشرة خانات. الإجمالي: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>n</mi><mi>u</mi><mi>m</mi><mi>s</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(nums))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal">m</span><span class="mord mathnormal">s</span><span class="mclose">))</span></span></span></span></p>
<h2 id="الشريحة-30-جرب-بنفسك-you-try-it">الشريحة 30: جرّب بنفسك (YOU TRY IT!)</h2>
<p>ما التعقيد الحتمي (asymptotic complexity) للدالة <code>f</code> التالية؟ وماذا لو كانت <code>L1</code> و <code>L2</code> و <code>L3</code> بالطول نفسه؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">f</span>(<span class="hljs-params">L1, L2, L3</span>):
    <span class="hljs-keyword">for</span> e1 <span class="hljs-keyword">in</span> L1:
        <span class="hljs-keyword">for</span> e2 <span class="hljs-keyword">in</span> L2:
            <span class="hljs-keyword">if</span> e1 <span class="hljs-keyword">in</span> L3 <span class="hljs-keyword">and</span> e2 <span class="hljs-keyword">in</span> L3 :
                <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<p><strong>الإجابة:</strong>
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>3</mn><mo stretchy="false">)</mo><mo>+</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>3</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1)) * \\Theta(len(L2)) * \\Theta(len(L3) + len(L3))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">))</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">))</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">3</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">3</span><span class="mclose">))</span></span></span></span>
الإجمالي: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>2</mn><mo stretchy="false">)</mo><mo>∗</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>3</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1) * len(L2) * len(L3))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">2</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">3</span><span class="mclose">))</span></span></span></span>
والإجمالي إذا كانت القوائم متساوية الطول: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mn>1</mn><msup><mo stretchy="false">)</mo><mn>3</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L1)^3)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></p>
<h2 id="الشريحة-31-التعقيد-الأسي-exponential">الشريحة 31: التعقيد الأُسّي (Exponential)</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-32-التعقيد-الأسي">الشريحة 32: التعقيد الأُسّي</h2>
<ul>
<li>دوال ذاتية فيها أكثر من استدعاء ذاتي واحد لكل حجم من أحجام المسألة.
<ul>
<li>فيبوناتشي.</li>
</ul>
</li>
<li>كثير من المسائل المهمة هي في جوهرها أُسّية.</li>
<li>هذا أمر محزن، لأن الكلفة قد تكون عالية.</li>
<li>سيقودنا هذا إلى التفكير في الحلول التقريبية (approximate solutions) بسرعة أكبر.</li>
</ul>
<table>
<thead>
<tr>
<th>التعبير</th>
<th>القراءة</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>30</mn></msup></mrow><annotation encoding="application/x-tex">2^{30}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">30</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≈</mo></mrow><annotation encoding="application/x-tex">\\approx</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4831em;"></span><span class="mrel">≈</span></span></span></span> مليون</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>100</mn></msup></mrow><annotation encoding="application/x-tex">2^{100}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">100</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td>أكثر عدد دورات في حاسب than كل الحواسيب في العالم، تعمل طوال التاريخ المسجَّل، يمكن أن تُنجزه</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-33-تعقيد-فيبوناتشي-الذاتي">الشريحة 33: تعقيد فيبوناتشي الذاتي</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fib_recur</span>(<span class="hljs-params">n</span>):
    <span class="hljs-string">&quot;&quot;&quot; assumes n an int &gt;= 0 &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> n == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">elif</span> n == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> fib_recur(n-<span class="hljs-number">1</span>) + fib_recur(n-<span class="hljs-number">2</span>)
</code></pre>
<p>الحالة الأسوأ: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><msup><mn>2</mn><mi>n</mi></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(2^n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></p>
<h2 id="الشريحة-34-تعقيد-فيبوناتشي-الذاتي-شجرة-الاستدعاء">الشريحة 34: تعقيد فيبوناتشي الذاتي (شجرة الاستدعاء)</h2>
<p>استدعاء <code>Fib(6)</code> يولّد الشجرة التالية (تُقرأ من الجذر إلى الأور):</p>
<pre><code class="language-text">Fib(6)
├── Fib(5)
│   ├── Fib(4)
│   │   ├── Fib(3)
│   │   │   ├── Fib(2)
│   │   │   └── Fib(1)
│   │   └── Fib(2)
│   └── Fib(3)
│       ├── Fib(2)
│       └── Fib(1)
└── Fib(4)
    ├── Fib(3)
    │   ├── Fib(2)
    │   └── Fib(1)
    └── Fib(2)
</code></pre>
<ul>
<li>يمكننا أن نفعل أفضل قليلًا من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2^n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span> لأن الشجرة تخفّ باتجاه اليمين.</li>
<li>لكن التعقيد يبقى من الرتبة الأُسّية.</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> رُسمت الشجرة هنا في نصّي بصيغة شجرة نصّية؛ بينما الأصل يرسمها بخطوط متّصلة لا يمكن لطبقة النصّ المستخرَجة أن تحفظ مواضعها.</p>
</blockquote>
<h2 id="الشريحة-35-التعقيد-الأسي-توليد-المجموعات-الفرعية">الشريحة 35: التعقيد الأُسّي: توليد المجموعات الفرعية</h2>
<p>المُدخل هو <code>[1, 2, 3]</code>، والمُخرج هو كل توليفات العناصر بكل الأطوال:</p>
<pre><code class="language-text">[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
</code></pre>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_subsets</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> [[]]
    extra = L[-<span class="hljs-number">1</span>:]
    smaller = gen_subsets(L[:-<span class="hljs-number">1</span>])
    new = []
    <span class="hljs-keyword">for</span> small <span class="hljs-keyword">in</span> smaller:
        new.append(small+extra)
    <span class="hljs-keyword">return</span> smaller+new
</code></pre>
<h2 id="الشريحة-36-تمثيل-الخوارزمية-الخطوة-الأولى">الشريحة 36: تمثيل الخوارزمية — الخطوة الأولى</h2>
<p>نفس الدالة <code>gen_subsets</code>، ومعها بداية تمثيل الشجرة:</p>
<table>
<thead>
<tr>
<th>المستوى</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الجذر</td>
<td><code>[1,2,3]</code></td>
</tr>
<tr>
<td>ما بعده</td>
<td><code>[1,2]</code>، ثم <code>[1]</code>، ثم <code>[]</code></td>
</tr>
</tbody>
</table>
<p>الحالة الأساسية: عندما تكون <code>L</code> فارغة، الدالة تُعيد <code>[[]]</code> — أي القائمة الفارغة هي المجموعة الفرعية الوحيدة.</p>
<h2 id="الشريحة-37-تمثيل-الخوارزمية-ما-بعد-الحالة-الأساسية">الشريحة 37: تمثيل الخوارزمية — ما بعد الحالة الأساسية</h2>
<table>
<thead>
<tr>
<th>المستوى</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الجذر</td>
<td><code>[1,2,3]</code></td>
</tr>
<tr>
<td></td>
<td><code>[1,2]</code>، <code>[1]</code>، <code>[]</code></td>
</tr>
<tr>
<td>ابن <code>[]</code></td>
<td><code>[[]]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-38-تمثيل-الخوارزمية-بعد-أول-استدعاء-ذاتي-مكتمل">الشريحة 38: تمثيل الخوارزمية — بعد أول استدعاء ذاتي مكتمل</h2>
<table>
<thead>
<tr>
<th>المستوى</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الجذر</td>
<td><code>[1,2,3]</code></td>
</tr>
<tr>
<td>ابن <code>[1,2]</code></td>
<td><code>[[],[1]]</code></td>
</tr>
<tr>
<td>ابن <code>[1]</code></td>
<td><code>[1]</code></td>
</tr>
<tr>
<td>ابن <code>[]</code></td>
<td><code>[[]]</code></td>
</tr>
<tr>
<td>الحفيد</td>
<td><code>[]</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> التقسيم إلى &quot;أبناء&quot; و&quot;أحقاد&quot; استعملتُ فيه التسلسل الرقمي <code>2</code> و<code>3</code> تمييزًا بين المستويات في الرسم الأصلي؛ الأرقام نفسها ليست في نصّ MIT المكتوب، والمقصود هو عمق الشجرة.</p>
</blockquote>
<h2 id="الشريحة-39-تمثيل-الخوارزمية-الجانب-الأيسر-مكتمل">الشريحة 39: تمثيل الخوارزمية — الجانب الأيسر مكتمل</h2>
<table>
<thead>
<tr>
<th>المستوى</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الجذر</td>
<td><code>[1,2,3]</code></td>
</tr>
<tr>
<td>ابن <code>[1,2]</code></td>
<td><code>[[],[1],[2],[1,2]]</code></td>
</tr>
<tr>
<td>ابن <code>[1]</code></td>
<td><code>[[],[1]]</code></td>
</tr>
<tr>
<td>ابن <code>[]</code></td>
<td><code>[[]]</code></td>
</tr>
<tr>
<td>الحفيد</td>
<td><code>[]</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-40-تمثيل-الخوارزمية-اكتمال-الشجرة">الشريحة 40: تمثيل الخوارزمية — اكتمال الشجرة</h2>
<table>
<thead>
<tr>
<th>المستوى</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الجذر</td>
<td><code>[1,2,3]</code></td>
</tr>
<tr>
<td>ابن <code>[1,2]</code></td>
<td><code>[[],[1],[2],[1,2]</code>، ثم <code>[3]</code>، ثم <code>[1,3]</code>، <code>[2,3]</code>، <code>[1,2,3]</code>]</td>
</tr>
<tr>
<td>ابن <code>[1]</code></td>
<td><code>[[],[1]]</code></td>
</tr>
<tr>
<td>ابن <code>[]</code></td>
<td><code>[[]]</code></td>
</tr>
</tbody>
</table>
<p>المصفوفة الكاملة الناتجة في الأعلى هي:</p>
<pre><code class="language-text">[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
</code></pre>
<h2 id="الشريحة-41-تمثيل-الخوارزمية-الشكل-النهائي-للشجرة">الشريحة 41: تمثيل الخوارزمية — الشكل النهائي للشجرة</h2>
<p>نفس الشجرة كما في الشريحة السابقة، بعد إعادة ترتيب فروعها في الرسم:</p>
<table>
<thead>
<tr>
<th>المستوى</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>الجذر</td>
<td><code>[1,2,3]</code></td>
</tr>
<tr>
<td></td>
<td><code>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</code></td>
</tr>
<tr>
<td>ابن <code>[1,2]</code></td>
<td><code>[[],[1]]</code></td>
</tr>
<tr>
<td>ابن <code>[1]</code></td>
<td><code>[[]]</code></td>
</tr>
<tr>
<td>ابن <code>[]</code></td>
<td><code>[]</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الأرقام التسلسلية الظاهرة في الرسم الأصلي بين الشريحتين لا يغطّيها النصّ المستخرَج، لذلك لم أنسبها إلى أيّ فرع بعينه.</p>
</blockquote>
<h2 id="الشريحة-42-التعقيد-الأسي-توليد-المجموعات-الفرعية">الشريحة 42: التعقيد الأُسّي — توليد المجموعات الفرعية</h2>
<p>نفس الدالة <code>gen_subsets</code>، مع الملاحظتين:</p>
<ul>
<li>نفترض أن <code>append</code> ثابتة الزمن.</li>
<li>الزمن اللازم لصنع القوائم الفرعية يشمل الزمن اللازم لحل المسألة الأصغر، والزمن اللازم لصنع نسخة من كل عناصر المسألة الأصغر.</li>
</ul>
<h2 id="الشريحة-43-التعقيد-الأسي-توليد-المجموعات-الفرعية-الحساب">الشريحة 43: التعقيد الأُسّي — توليد المجموعات الفرعية (الحساب)</h2>
<ul>
<li>فكّر في حجم <code>smaller</code>.</li>
<li>لمجموعة حجمها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> هناك <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>k</mi></msup></mrow><annotation encoding="application/x-tex">2^k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8491em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span></span></span></span></span></span></span></span> حالة، أي أن الحجم يتضاعف عند كل استدعاء.</li>
<li>إذن للحل نحتاج <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></msup><mo>+</mo><msup><mn>2</mn><mrow><mi>n</mi><mo>−</mo><mn>2</mn></mrow></msup><mo>+</mo><mo>⋯</mo><mo>+</mo><msup><mn>2</mn><mn>0</mn></msup></mrow><annotation encoding="application/x-tex">2^{n-1} + 2^{n-2} + \\dots + 2^0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span></span></span></span></span></span></span></span> خطوة، أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><msup><mn>2</mn><mi>n</mi></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(2^n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>.</li>
<li>الزمن اللازم لصنع نسخة من <code>smaller</code>: الدمج (concatenation) ليس ثابتًا، بل <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
<li>التعقيد الإجمالي هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo>∗</mo><msup><mn>2</mn><mi>n</mi></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n * 2^n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(L)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<h2 id="الشريحة-44-التعقيد-اللوغاريتمي">الشريحة 44: التعقيد اللوغاريتمي</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-45-تعقيد-صعب">الشريحة 45: تعقيد صعب</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">digit_add</span>(<span class="hljs-params">n</span>):
    <span class="hljs-string">&quot;&quot;&quot; assume n an int &gt;= 0 &quot;&quot;&quot;</span>
    answer = <span class="hljs-number">0</span>
    s = <span class="hljs-built_in">str</span>(n)
    <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> s[::-<span class="hljs-number">1</span>]:
        answer += <span class="hljs-built_in">int</span>(c)
    <span class="hljs-keyword">return</span> answer
</code></pre>
<ul>
<li>يجمع خانات العدد معًا.</li>
<li><code>n = 83</code> لكن الحلقة تتكرّر مرّتين فقط. ما العلاقة؟</li>
<li><code>n = 4271</code> لكن الحلقة تتكرّر أربع مرّات فقط! ما العلاقة؟؟</li>
</ul>
<p>في الشريحة الأولى ظهرت خانة <code>1</code> (آخر خانة في <code>4271</code>) بعد أن حُلَّت <code>427</code>:</p>
<pre><code class="language-text">4271
</code></pre>
<h2 id="الشريحة-46-تعقيد-صعب">الشريحة 46: تعقيد صعب</h2>
<p>نفس الدالة ونفس السؤالين. ظهرت الخانة <code>7</code> بعد أن حُلَّ <code>427</code> بـ <code>21</code> المتبقّي:</p>
<pre><code class="language-text">42 7 1
</code></pre>
<h2 id="الشريحة-47-تعقيد-صعب">الشريحة 47: تعقيد صعب</h2>
<p>ظهرت الخانة <code>2</code> بعد أن حُلَّ <code>42</code> بـ <code>1</code> المتبقّي:</p>
<pre><code class="language-text">4 2 7 1
</code></pre>
<h2 id="الشريحة-48-تعقيد-صعب">الشريحة 48: تعقيد صعب</h2>
<p>ظهرت الخانة <code>4</code> أخيرًا، فاكتمل العدد:</p>
<pre><code class="language-text">4 2 7 1
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشرائح 45–48 ترسم إزالة خانة من يسار <code>4271</code> خطوةً خطوة مع الحلقة (<code>1</code>، ثم <code>7</code>، ثم <code>2</code>، ثم <code>4</code>). أرقام الصفوف في النصّ المستخرَج هي بقايا الرسم لا عناصر مستقلّة، ولهذا رُبطت هنا بترتيب إزالة الخانات الذي يوضّحه الرسم.</p>
</blockquote>
<h2 id="الشريحة-49-تعقيد-صعب-الحل">الشريحة 49: تعقيد صعب (الحل)</h2>
<p>نفس الدالة <code>digit_add</code>.</p>
<ul>
<li>الجزء الصعب: التكرار يتم على <strong>طول النصّ</strong>، لا على مقدار <code>n</code> نفسه.
<ul>
<li>فكّر فيه كأنك تقسم <code>n</code> على 10 في كل تكرار.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mi mathvariant="normal">/</mi><msup><mn>10</mn><mrow><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo></mrow></msup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n/10^{len(s)} = 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.138em;vertical-align:-0.25em;"></span><span class="mord mathnormal">n</span><span class="mord">/1</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.888em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.0197em;">l</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight">n</span><span class="mopen mtight">(</span><span class="mord mathnormal mtight">s</span><span class="mclose mtight">)</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، أي: نقسم على 10 حتى يبقى عنصر واحد يُضاف.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo><mo>=</mo><mi>log</mi><mo>⁡</mo><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">len(s) = \\log(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></li>
</ul>
</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> — الأساس لا يهمّ.</li>
</ul>
<h2 id="الشريحة-50-التعقيد-اللوغاريتمي">الشريحة 50: التعقيد اللوغاريتمي</h2>
<ul>
<li>التعقيد ينمو بمقدار لوغاريتم حجم أحد مُدخلاته.</li>
<li>مثال خوارزمية: البحث الثنائي (binary search) في قائمة.</li>
<li>مثال سنراه بعد عدّة شرائح: إحدى تنفيذات البحث بالتنصيف (bisection search).</li>
</ul>
<h2 id="الشريحة-51-القوائم-والقواميس">الشريحة 51: القوائم والقواميس</h2>
<p>يجب أن نكون حذرين عند استخدام الدوال المدمجة!</p>
<p><strong>القوائم — حيث <code>n</code> هو <code>len(L)</code>:</strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td>الفهرسة <code>L[i]</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>التخزين</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>الطول <code>len(L)</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>append</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>==</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>remove</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>copy</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>reverse</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>التكرار</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>e in L</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p><strong>القواميس — حيث <code>n</code> هو <code>len(d)</code>:</strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td>الفهرسة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>التخزين</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>الطول <code>len(d)</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>الحذف</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>.keys</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>.values</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>التكرار</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-52-خوارزميات-البحث">الشريحة 52: خوارزميات البحث</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-53-خوارزميات-البحث">الشريحة 53: خوارزميات البحث</h2>
<p><strong>البحث الخطّي (linear search):</strong></p>
<ul>
<li>بحث بالقوة الغاشمة (brute force).</li>
<li>لا يلزم أن تكون القائمة مرتّبة.</li>
</ul>
<p><strong>البحث بالتنصيف (bisection search):</strong></p>
<ul>
<li>يجب أن تكون القائمة مرتّبة (MUST) حتى تعطي إجابة صحيحة.</li>
<li>سنرى تنفيذين مختلفين للخوارزمية.</li>
</ul>
<h2 id="الشريحة-54-البحث-الخطي-على-قائمة-غير-مرتبة">الشريحة 54: البحث الخطّي على قائمة غير مرتّبة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">linear_search</span>(<span class="hljs-params">L, e</span>):
    found = <span class="hljs-literal">False</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(L)):
        <span class="hljs-keyword">if</span> e == L[i]:
            found = <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> found
</code></pre>
<ul>
<li>يجب أن ننظر في كل العناصر لنقرّر أنه غير موجود.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span> للحلقة، مضروبة في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span> لاختبار <code>e == L[i]</code>.</li>
<li>التعقيد الإجمالي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(L)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span></span></span></span>، أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span>.</li>
</ul>
<h2 id="الشريحة-55-البحث-الخطي-على-قائمة-غير-مرتبة-نسخة-ثانية">الشريحة 55: البحث الخطّي على قائمة غير مرتّبة (نسخة ثانية)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">linear_search</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> e == L[i]:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<ul>
<li>نفس التحليل السابق.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span> للحلقة، مضروبة في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span> لاختبار <code>e == L[i]</code>.</li>
<li>التعقيد الإجمالي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(L)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span></span></span></span>، أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span>.</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشريحة تحمل النصّ الدقيق للدالة <code>linear_search</code> وعلى يسارها نسختان متتاليتان منها (تُقرأان على أنها <code>found = False</code> ثم <code>for i in L:</code> مع <code>return True</code>/<code>return False</code>). النسخة الأولى تُعيد <code>found</code> بعد الحلقة، والثانية تُعيد <code>True</code>/<code>False</code> مباشرة. تُركت الاثنتان كما تظهران في الشريحة.</p>
</blockquote>
<h2 id="الشريحة-56-البحث-الخطي-على-قائمة-مرتبة">الشريحة 56: البحث الخطّي على قائمة مرتّبة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> i == e:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">if</span> i &gt; e:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<ul>
<li>يجب أن ننظر فقط حتى نصل إلى عدد أكبر من <code>e</code>.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span> للحلقة، مضروبة في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span> لاختبار <code>i == e</code> أو <code>i &gt; e</code>.</li>
<li>التعقيد الإجمالي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(len(L))</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">))</span></span></span></span>، أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(L)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<h2 id="الشريحة-57-البحث-بالتنصيف-عن-عنصر-في-قائمة-مرتبة">الشريحة 57: البحث بالتنصيف عن عنصر في قائمة مرتّبة</h2>
<ol>
<li>اختر فهرسًا <code>i</code> يقسم القائمة إلى نصفين.</li>
<li>اسأل: هل <code>L[i] == e</code>؟</li>
<li>إن لم يكن كذلك، اسأل: هل <code>L[i]</code> أكبر أم أصغر من <code>e</code>؟</li>
<li>حسب الإجابة، ابحث في النصف الأيسر أو الأيمن من <code>L</code> عن <code>e</code>.</li>
</ol>
<ul>
<li>هذه نسخة جديدة من «اقسم وانتصر» (divide-and-conquer): إذًا الاستدعاء الذاتي (recursion)!</li>
<li>نقسم المشكلة إلى نسخ أصغر منها (قائمة أصغر)،إضافةً إلى عمليات بسيطة.</li>
<li>الإجابة عن النسخة الأصغر هي الإجابة عن النسخة الأصلية.</li>
</ul>
<h2 id="الشريحة-58-تحليل-تعقيد-البحث-بالتنصيف">الشريحة 58: تحليل تعقيد البحث بالتنصيف</h2>
<ul>
<li>ننتهي من النظر في القائمة عندما:</li>
</ul>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>=</mo><mi>n</mi><mi mathvariant="normal">/</mi><msup><mn>2</mn><mi>i</mi></msup></mrow><annotation encoding="application/x-tex">1 = n/2^i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1247em;vertical-align:-0.25em;"></span><span class="mord mathnormal">n</span><span class="mord">/</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8747em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span></span></span></span></span></span></span></span>
<ul>
<li>إذن ما العلاقة بين الطول الأصلي للقائمة وعدد مرّات تقسيمها؟</li>
</ul>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>i</mi><mo>=</mo><mi>log</mi><mo>⁡</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">i = \\log n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span></span></span></span></span>
<ul>
<li>التعقيد هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> هو <code>len(L)</code>.</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشريحة الأصلية تمثّل المساواة <code>1 = n/2^i</code> بخطّ مستقيم على محور لوغاريتمي بحوارَين «…»، وهذه الأشكال لا تنجو من طبقة النصّ؛ أُعيدت المعادلة بصيغتها الرياضية الصحيحة.</p>
</blockquote>
<h2 id="الشريحة-59-الفكرة-الكبرى">الشريحة 59: الفكرة الكبرى</h2>
<p>تنفيذان مختلفان لهما قيمتا <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi></mrow><annotation encoding="application/x-tex">\\Theta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord">Θ</span></span></span></span> مختلفتان.</p>
<h2 id="الشريحة-60-البحث-بالتنصيف-التنفيذ-١">الشريحة 60: البحث بالتنصيف — التنفيذ ١</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">bisect_search1</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-keyword">if</span> L == []:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
    <span class="hljs-keyword">elif</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] == e
    <span class="hljs-keyword">else</span>:
        half = <span class="hljs-built_in">len</span>(L)//<span class="hljs-number">2</span>
        <span class="hljs-keyword">if</span> L[half] &gt; e:
            <span class="hljs-keyword">return</span> bisect_search1( L[:half], e)
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> bisect_search1( L[half:], e)
</code></pre>
<h2 id="الشريحة-61-تعقيد-bisectsearch1-حيث-n-هو-lenl">الشريحة 61: تعقيد bisect_search1 (حيث <code>n</code> هو <code>len(L)</code>)</h2>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> استدعاءات بحث بالتنصيف.</li>
<li>كل استدعاء ذاتي يقتطع المدى المطلوب البحث فيه إلى النصف. أسوأ حالة للوصول إلى مدى حجمه 1 من <code>n</code> هي عندما <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mi mathvariant="normal">/</mi><msup><mn>2</mn><mi>k</mi></msup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n/2^k = 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord mathnormal">n</span><span class="mord">/</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، أي عندما <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi><mo>=</mo><mi>log</mi><mo>⁡</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">k = \\log n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span></span></span></span>، وبهذا نحصل على تعبير يربط <code>k</code> بـ <code>n</code>.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> لكل استدعاء بحث للتنصيف بسبب نسخ القائمة.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n) * \\Theta(n) = \\Theta(n \\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(L)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span></span></span></span>.
<ul>
<li>هذه هي الإجابة في هذا الصف.</li>
</ul>
</li>
<li>إن كنت دقيقًا، ستلاحظ أن القائمة أيضًا تُنصَّف عند كل استدعاء ذاتي، فتصير هنالك سلسلة لا نهائية (لا داعي للقلق بشأنها في هذا الصف).</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> هي حدّ أدقّ (tighter bound) لأن نسخ القائمة يهيمن على <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>log</mi><mo>⁡</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">\\log n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span></span></span></span>.</li>
</ul>
<h2 id="الشريحة-62-تنفيذ-بديل-للبحث-بالتنصيف">الشريحة 62: تنفيذ بديل للبحث بالتنصيف</h2>
<ul>
<li>صغّر حجم المسألة بمعامل 2 في كل خطوة.</li>
<li>احتفظ بفهرسي <code>low</code> و <code>high</code> للبحث في القائمة.</li>
<li>تجنّب نسخ القائمة.</li>
<li>تعقيد الاستدعاء الذاتي هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> هو <code>len(L)</code>.</li>
</ul>
<h2 id="الشريحة-63-البحث-بالتنصيف-التنفيذ-٢">الشريحة 63: البحث بالتنصيف — التنفيذ ٢</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">bisect_search2</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">bisect_search_helper</span>(<span class="hljs-params">L, e, low, high</span>):
        <span class="hljs-keyword">if</span> high == low:
            <span class="hljs-keyword">return</span> L[low] == e
        mid = (low + high)//<span class="hljs-number">2</span>
        <span class="hljs-keyword">if</span> L[mid] == e:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">elif</span> L[mid] &gt; e:
            <span class="hljs-keyword">if</span> low == mid: <span class="hljs-comment">#nothing left to search</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
            <span class="hljs-keyword">else</span>:
                <span class="hljs-keyword">return</span> bisect_search_helper(L, e, low, mid - <span class="hljs-number">1</span>)
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> bisect_search_helper(L, e, mid + <span class="hljs-number">1</span>, high)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> bisect_search_helper(L, e, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(L) - <span class="hljs-number">1</span>)
</code></pre>
<h2 id="الشريحة-64-تعقيد-bisectsearch2-ودالة-المساعد-حيث-n-هو-lenl">الشريحة 64: تعقيد bisect_search2 ودالة المساعِد (حيث <code>n</code> هو <code>len(L)</code>)</h2>
<ul>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> استدعاءات بحث بالتنصيف.</li>
<li>كل استدعاء ذاتي يقتطع المدى المطلوب البحث فيه إلى النصف. أسوأ حالة للوصول إلى مدى حجمه 1 من <code>n</code> هي عندما <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mi mathvariant="normal">/</mi><msup><mn>2</mn><mi>k</mi></msup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n/2^k = 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0991em;vertical-align:-0.25em;"></span><span class="mord mathnormal">n</span><span class="mord">/</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، أي عندما <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi><mo>=</mo><mi>log</mi><mo>⁡</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">k = \\log n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span></span></span></span>.</li>
<li>نمرّر القائمة والفهارس كمعاملات. القائمة لا تُنسخ أبدًا، بل تُمرَّر فقط: <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span> عند كل استدعاء ذاتي.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n) * \\Theta(1) = \\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mi>l</mi><mi>e</mi><mi>n</mi><mo stretchy="false">(</mo><mi>L</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">n = len(L)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mopen">(</span><span class="mord mathnormal">L</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<h2 id="الشريحة-65-متى-نرتب-أولا-ثم-نبحث">الشريحة 65: متى نرتب أولًا ثم نبحث؟</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-66-البحث-في-قائمة-مرتبة-حيث-n-هو-lenl">الشريحة 66: البحث في قائمة مرتّبة — حيث <code>n</code> هو <code>len(L)</code></h2>
<ul>
<li>باستخدام البحث الخطّي، البحث عن عنصر هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
<li>باستخدام البحث الثنائي، يمكننا البحث عن عنصر في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> — بافتراض أن القائمة مرتّبة!</li>
<li>متى يكون من المعقول أن نرتب أولًا ثم نبحث؟</li>
</ul>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mi>O</mi><mi>R</mi><mi>T</mi><mo>+</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo><mo>&lt;</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>⇒</mo><mi>S</mi><mi>O</mi><mi>R</mi><mi>T</mi><mo>&lt;</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>−</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">SORT + \\Theta(\\log n) &lt; \\Theta(n) \\Rightarrow SORT &lt; \\Theta(n) - \\Theta(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">⇒</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7224em;vertical-align:-0.0391em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></span>
<ul>
<li>متى يكون الترتيب أصغر من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>؟!
<ul>
<li>أبدًا ما دام أنك على الأقل ستحتاج إلى النظر في كل عنصر!</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-67-التكلفة-المطفرة-amortized-cost-حيث-n-هو-lenl">الشريحة 67: التكلفة المُطفَّرة (Amortized Cost) — حيث <code>n</code> هو <code>len(L)</code></h2>
<ul>
<li>لماذا نرتّب أولًا إذن؟</li>
<li>رتّب القائمة مرّة واحدة ثم أجرِ عمليات بحث كثيرة.</li>
<li>نُطفئ (amortize) كلفة الترتيب على عمليات البحث الكثيرة.</li>
<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mi>O</mi><mi>R</mi><mi>T</mi><mo>+</mo><mi>K</mi><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo><mo>&lt;</mo><mi>K</mi><mo>∗</mo><mi mathvariant="normal">Θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">SORT + K * \\Theta(\\log n) &lt; K * \\Theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">K</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">K</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، أي إن كان <code>K</code> كبيرًا فإن زمن الترتيب يصبح غير ذي أثر.</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> ظهرت حروف دخيلة عند استخراج جملة «رتّب القائمة مرّة واحدة ثم …» من ملف PDF الأصلي، وأصلحتها هنا إلى «كثير من المرّات».</p>
</blockquote>
<h2 id="الشريحة-68-خلاصة-أصناف-التعقيد">الشريحة 68: خلاصة أصناف التعقيد</h2>
<ul>
<li>قارن كفاءة الخوارزميات.</li>
<li>رتّب حسب رتبة النمو.</li>
<li>استخدم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Θ</mi></mrow><annotation encoding="application/x-tex">\\Theta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord">Θ</span></span></span></span> لحدّ أعلى وحدّ أدنى، أي حدّ «مضبوط» (tight).</li>
<li>الخيارات المعطاة لدالة <code>f</code>:</li>
</ul>
<p><strong>انظر إلى ما يتكرّر:</strong></p>
<ul>
<li>انظر إلى الحلقات:
<ul>
<li>هل هي بدلالة مُدخل <code>f</code>؟</li>
<li>هل هناك حلقات متداخلة؟</li>
</ul>
</li>
<li>انظر إلى الاستدعاءات الذاتية:
<ul>
<li>إلى أي عمق يصل مكدّس استدعاءات الدوال؟</li>
</ul>
</li>
<li>انظر إلى الدوال المدمجة:
<ul>
<li>هل أيّ منها يعتمد على المدخل؟</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-69-mit-opencourseware">الشريحة 69: MIT OpenCourseWare</h2>
<pre><code>MITOpenCourseWare
https://ocw.mit.edu

6.100L Introduction to Computer Science and Programming Using Python
Fall 2022

For information about citing these materials or our Terms of Use, visit: https://ocw.mit.edu/terms.
</code></pre>
`,l={book:s,chapter:a,chapterTitle:n,slug:t,title:m,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,l as default,e as headings,p as html,t as slug,m as title};
