const n="mit-6100l",t="lecture-07",e="المحاضرة 7: التفكيك والتجريد والدوال",d="notes",s="المحاضرة 7: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)",o=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-التفكيك-والتجريد-والدوال-decomposition-abstraction-functions",text:"الشريحة 1: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)"},{depth:2,id:"الشريحة-2-مثال-الهاتف-الذكي-the-smartphone",text:"الشريحة 2: مثال: الهاتف الذكي (The Smartphone)"},{depth:2,id:"الشريحة-3-مثال-الهاتف-الذكي-التجريد-abstraction",text:"الشريحة 3: مثال: الهاتف الذكي — التجريد (Abstraction)"},{depth:2,id:"الشريحة-4-التجريد-يتيح-التفكيك-abstraction-enables-decomposition",text:"الشريحة 4: التجريد يتيح التفكيك (Abstraction Enables Decomposition)"},{depth:2,id:"الشريحة-5-الفكرة-الكبرى-big-idea",text:"الشريحة 5: الفكرة الكبرى (Big Idea)"},{depth:2,id:"الشريحة-6-أخف-التفاصيل-بالتجريد-suppress-details-with-abstraction",text:"الشريحة 6: أخفِ التفاصيل بالتجريد (Suppress Details with Abstraction)"},{depth:2,id:"الشريحة-7-أخف-التفاصيل-بالتجريد",text:"الشريحة 7: أخفِ التفاصيل بالتجريد"},{depth:2,id:"الشريحة-8-أخف-التفاصيل-بالتجريد",text:"الشريحة 8: أخفِ التفاصيل بالتجريد"},{depth:2,id:"الشريحة-9-أنشئ-البنية-بالتفكيك-create-structure-with-decomposition",text:"الشريحة 9: أنشئ البنية بالتفكيك (Create Structure with Decomposition)"},{depth:2,id:"الشريحة-10-الدوال-functions",text:"الشريحة 10: الدوال (Functions)"},{depth:2,id:"الشريحة-11-الدوال",text:"الشريحة 11: الدوال"},{depth:2,id:"الشريحة-12-خصائص-الدالة-function-characteristics",text:"الشريحة 12: خصائص الدالة (Function Characteristics)"},{depth:2,id:"الشريحة-13-كيف-تكتب-دالة-how-to-write-a-function",text:"الشريحة 13: كيف تكتب دالة (How to Write a Function)"},{depth:2,id:"الشريحة-14-كيف-تفكر-في-كتابة-دالة",text:"الشريحة 14: كيف تفكّر في كتابة دالة"},{depth:2,id:"الشريحة-15-كيف-تفكر-في-كتابة-دالة",text:"الشريحة 15: كيف تفكّر في كتابة دالة"},{depth:2,id:"الشريحة-16-كيف-تفكر-في-كتابة-دالة",text:"الشريحة 16: كيف تفكّر في كتابة دالة"},{depth:2,id:"الشريحة-17-الفكرة-الكبرى-big-idea",text:"الشريحة 17: الفكرة الكبرى (Big Idea)"},{depth:2,id:"الشريحة-18-كيف-تستدعي-دالة-how-to-call-invoke-a-function",text:"الشريحة 18: كيف تستدعي دالة (How to Call (Invoke) a Function)"},{depth:2,id:"الشريحة-19-كيف-تستدعي-دالة",text:"الشريحة 19: كيف تستدعي دالة"},{depth:2,id:"الشريحة-20-كل-ذلك-في-ملف-واحد",text:"الشريحة 20: كلّ ذلك في ملف واحد"},{depth:2,id:"الشريحة-21-ماذا-يحدث-حين-تستدعي-دالة",text:"الشريحة 21: ماذا يحدث حين تستدعي دالة؟"},{depth:2,id:"الشريحة-22-ماذا-يحدث-حين-تستدعي-دالة",text:"الشريحة 22: ماذا يحدث حين تستدعي دالة؟"},{depth:2,id:"الشريحة-23-ماذا-يحدث-حين-تستدعي-دالة",text:"الشريحة 23: ماذا يحدث حين تستدعي دالة؟"},{depth:2,id:"الشريحة-24-الفكرة-الكبرى-big-idea",text:"الشريحة 24: الفكرة الكبرى (Big Idea)"},{depth:2,id:"الشريحة-25-جرب-بنفسك",text:"الشريحة 25: جرّب بنفسك!"},{depth:2,id:"الشريحة-26-نبتعد-خطوة-للخلف-zooming-out-بلا-دوال",text:"الشريحة 26: نبتعد خطوة للخلف (Zooming Out) — بلا دوال"},{depth:2,id:"الشريحة-27-نبتعد-خطوة-للخلف-هذا-الصندوق-الأسود-لي",text:"الشريحة 27: نبتعد خطوة للخلف — هذا «الصندوق الأسود» لي"},{depth:2,id:"الشريحة-28-نبتعد-خطوة-للخلف",text:"الشريحة 28: نبتعد خطوة للخلف"},{depth:2,id:"الشريحة-29-نبتعد-خطوة-للخلف",text:"الشريحة 29: نبتعد خطوة للخلف"},{depth:2,id:"الشريحة-30-نبتعد-خطوة-للخلف",text:"الشريحة 30: نبتعد خطوة للخلف"},{depth:2,id:"الشريحة-31-إدراج-الدوال-في-الشيفرة",text:"الشريحة 31: إدراج الدوال في الشيفرة"},{depth:2,id:"الشريحة-32-مثال-آخر",text:"الشريحة 32: مثال آخر"},{depth:2,id:"الشريحة-33-الفكرة-الكبرى-big-idea",text:"الشريحة 33: الفكرة الكبرى (Big Idea)"},{depth:2,id:"الشريحة-34-الورق-أولا-paper-first",text:"الشريحة 34: الورق أولًا (Paper First)"},{depth:2,id:"الشريحة-35-حالة-اختبار-بسيطة-simple-test-case",text:"الشريحة 35: حالة اختبار بسيطة (Simple Test Case)"},{depth:2,id:"الشريحة-36-حالة-اختبار-أعقد-more-complex-test-case",text:"الشريحة 36: حالة اختبار أعقد (More Complex Test Case)"},{depth:2,id:"الشريحة-37-حل-مسألة-مشابهة-solve-similar-problem",text:"الشريحة 37: حلّ مسألة مشابهة (Solve Similar Problem)"},{depth:2,id:"الشريحة-38-اختر-بنية-الصورة-الكبرى-choose-big-picture-structure",text:"الشريحة 38: اختر بنية الصورة الكبرى (Choose Big-Picture Structure)"},{depth:2,id:"الشريحة-39-اكتب-حلقة-التكرار-write-the-loop-لجمع-كل-الأعداد",text:"الشريحة 39: اكتب حلقة التكرار (Write the Loop) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-40-نفذ-الجمع-do-the-summing-لجمع-كل-الأعداد",text:"الشريحة 40: نفّذ الجمع (Do the Summing) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-41-هيئ-المجموع-initialize-the-sum-لجمع-كل-الأعداد",text:"الشريحة 41: هيّئ المجموع (Initialize the Sum) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-42-اختبر-test-لجمع-كل-الأعداد",text:"الشريحة 42: اختبر! (Test!) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-43-نتائج-غريبة-weird-results-لجمع-كل-الأعداد",text:"الشريحة 43: نتائج غريبة… (Weird Results…) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-44-صحح-أي-أضف-تعليمات-طباعة-debug-aka-add-print-statements-لجمع-كل-الأعداد",text:"الشريحة 44: صحّح! أي أضف تعليمات طباعة (Debug! aka Add Print Statements) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-45-أصلح-فهرس-نهاية-حلقة-for-fix-for-loop-end-index-لجمع-كل-الأعداد",text:"الشريحة 45: أصلح فهرس نهاية حلقة for (Fix for Loop End Index) — لجمع كلّ الأعداد"},{depth:2,id:"الشريحة-46-أضف-الجزء-الخاص-بالأعداد-الفردية-add-in-the-odd-part",text:"الشريحة 46: أضف الجزء الخاص بالأعداد الفردية! (Add in the Odd Part!)"},{depth:2,id:"الشريحة-47-الفكرة-الكبرى-big-idea",text:"الشريحة 47: الفكرة الكبرى (Big Idea)"},{depth:2,id:"الشريحة-48-جربها-على-مثال-آخر-try-it-on-another-example",text:"الشريحة 48: جرّبها على مثال آخر (Try It on Another Example)"},{depth:2,id:"الشريحة-49-python-tutor",text:"الشريحة 49: Python Tutor"},{depth:2,id:"الشريحة-50-الفكرة-الكبرى-big-idea",text:"الشريحة 50: الفكرة الكبرى (Big Idea)"},{depth:2,id:"الشريحة-51-جرب-بنفسك",text:"الشريحة 51: جرّب بنفسك!"},{depth:2,id:"الشريحة-52-الخلاصة-summary",text:"الشريحة 52: الخلاصة (Summary)"},{depth:2,id:"الشريحة-53-mit-opencourseware",text:"الشريحة 53: MIT OpenCourseWare"}],a=`<h1>المحاضرة 7: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-7-decomposition-abstraction-functions/">صفحة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec07_pdf/">صفحة الشرائح الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec07.pdf">ملف الشرائح الأصلي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec07_code.py">ملف شيفرة المحاضرة الأصلي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec07/">تفريغ المحاضرة على OCW</a> (النسخة الإنجليزية الرسمية).</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. الشرائح التي تبني الشيفرة تدريجيًّا نُقلت إلى جداول تحافظ على تسلسلها. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية. لم تُضمَّن صور أو صفحات PDF.</p>
<h2 id="الشريحة-1-التفكيك-والتجريد-والدوال-decomposition-abstraction-functions">الشريحة 1: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)</h2>
<p>(نزّل الشرائح وملفات <code>.py</code> لمتابعة الشرح).</p>
<p>6.100L، المحاضرة 7 — آنا بيل (Ana Bell).</p>
<h2 id="الشريحة-2-مثال-الهاتف-الذكي-the-smartphone">الشريحة 2: مثال: الهاتف الذكي (The Smartphone)</h2>
<ul>
<li>صندوق أسود (black box)، ويمكن النظر إليه في termes:
<ul>
<li>مدخلاته (its inputs).</li>
<li>مخرجاته (its outputs).</li>
<li>كيف relate المخرجات بالمدخلات، دون أيّ معرفة بتفاصيله الداخلية.</li>
</ul>
</li>
<li>التنفيذ (implementation) «معتم» (opaque) أو أسود.</li>
</ul>
<h2 id="الشريحة-3-مثال-الهاتف-الذكي-التجريد-abstraction">الشريحة 3: مثال: الهاتف الذكي — التجريد (Abstraction)</h2>
<ul>
<li>المستخدم لا يعرف تفاصيل كيفية عمله.</li>
<li>لسنا بحاجة إلى معرفة كيفية عمل شيء كي نعرف كيف نستخدمه.</li>
<li>لكن المستخدم يعرف الواجهة (the interface).</li>
<li>الجهاز يحوّل سلسلة من اللمسات والأصوات على الشاشة إلى وظائف مفيدة متوقّعة.</li>
<li>نعرف العلاقة بين المدخل والمخرج.</li>
</ul>
<h2 id="الشريحة-4-التجريد-يتيح-التفكيك-abstraction-enables-decomposition">الشريحة 4: التجريد يتيح التفكيك (Abstraction Enables Decomposition)</h2>
<ul>
<li>
<p>مئات الأجزاء المتمايزة.</p>
</li>
<li>
<p>صُمّمت وصُنعت من شركات مختلفة.</p>
</li>
<li>
<p>لا تتواصل فيما بينها إلاّ عبر مواصفات الأجزاء (specifications for components).</p>
</li>
<li>
<p>قد تستخدم أجزاء فرعية مشتركة مع غيرها.</p>
</li>
<li>
<p>على كلّ صانع جزء أن يعرف كيف يتواصل جزؤه مع بقية الأجزاء.</p>
</li>
<li>
<p>يستطيع كلّ صانع جزء حلّ المسائل الجزئية بمعزل عن بقية الأجزاء، ما دام يقدّم المدخلات الموصوفة.</p>
</li>
<li>
<p>هذا صحيح في العتاد وفي البرمجيات معًا.</p>
</li>
</ul>
<h2 id="الشريحة-5-الفكرة-الكبرى-big-idea">الشريحة 5: الفكرة الكبرى (Big Idea)</h2>
<p>طبّق <strong>التجريد</strong> (الصندوق الأسود) و<strong>التفكيك</strong> (القسمة إلى أجزاء مكتفية ذاتيًا) على البرمجة!</p>
<h2 id="الشريحة-6-أخف-التفاصيل-بالتجريد-suppress-details-with-abstraction">الشريحة 6: أخفِ التفاصيل بالتجريد (Suppress Details with Abstraction)</h2>
<ul>
<li>
<p>في البرمجة نريد أن نفكّر في قطعة شيفرة كأنّها صندوق أسود.</p>
<ul>
<li>أخفِ تفاصيل الكتابة المملّة عن المستخدم.</li>
<li>أعد استخدام الصندوق الأسود في مواضع مختلفة من الشيفرة (بلا نسخ ولصق!).</li>
</ul>
</li>
<li>
<p>المبرمج ينشئ التفاصيل، ويصمّم الواجهة.</p>
</li>
<li>
<p>المستخدم لا يحتاج إلى رؤية التفاصيل ولا يريد ذلك.</p>
</li>
</ul>
<h2 id="الشريحة-7-أخف-التفاصيل-بالتجريد">الشريحة 7: أخفِ التفاصيل بالتجريد</h2>
<ul>
<li>المبرمج يحقّق التجريد بواسطة الدالة (function) أو الإجراء (procedure).</li>
<li>لقد استخدمت الدوال من قبل!</li>
<li>تتيح لك الدالة التقاط شيفرة داخل صندوق أسود.</li>
<li>بمجرّد أن ننشئ دالة، فإنّها تُنتج مخرجًا من مدخلات، بينما تخفي تفاصيل كيفية إجراء الحساب.</li>
</ul>
<p>أمثلة:</p>
<pre><code class="language-python"><span class="hljs-built_in">max</span>(<span class="hljs-number">1</span>,<span class="hljs-number">4</span>)
<span class="hljs-built_in">abs</span>(-<span class="hljs-number">3</span>)
<span class="hljs-built_in">len</span>(<span class="hljs-string">&quot;mom&#x27;s spaghetti&quot;</span>)
</code></pre>
<h2 id="الشريحة-8-أخف-التفاصيل-بالتجريد">الشريحة 8: أخفِ التفاصيل بالتجريد</h2>
<ul>
<li>للدالة مواصفات (specifications) تُلتقط في سلاسل التوثيق (docstrings).</li>
<li>فكّر في الـ docstring كـ«عقد» (contract) بين المبرمج والمستخدم:
<ul>
<li>إذا قدّم المستخدم مدخلًا يحقّق الشروط المذكورة، فإنّ الدالة ستُنتج مخرجًا وفق المواصفات، بما في ذلك الآثار الجانبية (side effects) المذكورة.</li>
</ul>
</li>
<li>لا يُتحقَّق من ذلك عادةً في Python (سنرى التحقّقات (assertions) لاحقًا)، لكن المستخدم يعتمد على التزام المبرمج بالعقد.</li>
</ul>
<p>مثال:</p>
<pre><code class="language-python"><span class="hljs-built_in">abs</span>(-<span class="hljs-number">3</span>)
</code></pre>
<h2 id="الشريحة-9-أنشئ-البنية-بالتفكيك-create-structure-with-decomposition">الشريحة 9: أنشئ البنية بالتفكيك (Create Structure with Decomposition)</h2>
<ul>
<li>
<p>بعد فهم فكرة التجريد كصندوق أسود، نستخدمها لتقسيم الشيفرة إلى وحدات (modules) تكون:</p>
<ul>
<li>مكتفية ذاتيًا.</li>
<li>مصمّمة لإعادة الاستخدام.</li>
</ul>
</li>
<li>
<p>تُستخدم الوحدات من أجل:</p>
<ul>
<li>تفكيك الشيفرة إلى قطع منطقية.</li>
<li>إبقاء الشيفرة منظّمة.</li>
<li>إبقاء الشيفرة متّسقة (مقروءة ومفهومة).</li>
</ul>
</li>
<li>
<p>في هذه المحاضرة نحقّق التفكيك بالدوال.</p>
</li>
<li>
<p>وبعد محاضرات قليلة نحقّق التفكيك بالأصناف (classes).</p>
</li>
<li>
<p>يعتمد التفكيك على التجريد ليتيح بناء وحدات معقّدة من وحدات أبسط.</p>
</li>
</ul>
<h2 id="الشريحة-10-الدوال-functions">الشريحة 10: الدوال (Functions)</h2>
<ul>
<li>قطع شيفرة قابلة لإعادة الاستخدام، تُسمّى دوالًّا (functions) أو إجراءات (procedures).</li>
<li>تلتقط خطوات حسابٍ ما كي نتمكن من استخدامها مع أيّ مدخل.</li>
<li>الدالة ليست سوى شيفرة مكتوبة بطريقة خاصة قابلة لإعادة الاستخدام.</li>
</ul>
<h2 id="الشريحة-11-الدوال">الشريحة 11: الدوال</h2>
<ul>
<li>تعريف دالة يُخبر Python بأنّ شيفرة ما صارت موجودة الآن في الذاكرة.</li>
<li>الدوال لا تكون نافعة إلاّ حين تُنفَّذ («تُستدعى» أو «تُنادى»).</li>
<li>تكتب الدالة مرّة واحدة ويمكنك تشغيلها مرّات كثيرة!</li>
<li>قارن ذلك بالشيفرة في ملف:
<ul>
<li>لا تعمل الشيفرة حين تحمّل الملف.</li>
<li>تعمل حين تضغط زر التشغيل.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-12-خصائص-الدالة-function-characteristics">الشريحة 12: خصائص الدالة (Function Characteristics)</h2>
<ul>
<li>لها اسم.
<ul>
<li>(فكّر: متغيّر مربوط بكائن دالة).</li>
</ul>
</li>
<li>لها معاملات (formal parameters) صفر أو أكثر.
<ul>
<li>هذه هي المدخلات.</li>
</ul>
</li>
<li>لها سلسلة توثيق (docstring) (اختيارية لكن يُنصح بها).
<ul>
<li>تعليق محدَّد بعلامة <code>&quot;&quot;&quot;</code> (ثلاث علامات تنصيص) يقدّم مواصفة للدالة — عقد يربط المخرج بالمدخل.</li>
</ul>
</li>
<li>لها جسم (body)، وهو مجموعة تعليمات تُنفَّذ عند استدعاء الدالة.</li>
<li>تُعيد شيئًا (returns something).
<ul>
<li>الكلمة المفتاحية <code>return</code>.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-13-كيف-تكتب-دالة-how-to-write-a-function">الشريحة 13: كيف تكتب دالة (How to Write a Function)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int
    Returns True if i is even, otherwise False
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<h2 id="الشريحة-14-كيف-تفكر-في-كتابة-دالة">الشريحة 14: كيف تفكّر في كتابة دالة</h2>
<ul>
<li>ما المسألة؟</li>
</ul>
<p>-Given an int, call it i, نريد أن نعرف إن كان زوجيًّا.</p>
<ul>
<li>نستخدم ذلك لكتابة اسم الدالة ومواصفاتها.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int
    Returns True if i is even, otherwise False
    &quot;&quot;&quot;</span>
</code></pre>
<h2 id="الشريحة-15-كيف-تفكر-في-كتابة-دالة">الشريحة 15: كيف تفكّر في كتابة دالة</h2>
<ul>
<li>كيف نحلّ المسألة؟
<ul>
<li>يمكننا أن نتحقّق أنّ الباقي عند القسمة على 2 يساوي 0.</li>
<li>فكّر في القيمة التي عليك إعادتها.</li>
</ul>
</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int
    Returns True if i is even, otherwise False
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<h2 id="الشريحة-16-كيف-تفكر-في-كتابة-دالة">الشريحة 16: كيف تفكّر في كتابة دالة</h2>
<ul>
<li>هل تستطيع أن تجعل الشيفرة أنظف؟
<ul>
<li><code>i%2</code> قيمة منطقية (Boolean) تُقيَّم إلى <code>True</code>/<code>False</code> أصلًا.</li>
</ul>
</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Input: i, a positive int
    Returns True if i is even, otherwise False
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>
</code></pre>
<h2 id="الشريحة-17-الفكرة-الكبرى-big-idea">الشريحة 17: الفكرة الكبرى (Big Idea)</h2>
<p>حتى هذه اللحظة، كلّ ما فعلناه هو إنشاء <strong>كائن دالة</strong> (function object).</p>
<h2 id="الشريحة-18-كيف-تستدعي-دالة-how-to-call-invoke-a-function">الشريحة 18: كيف تستدعي دالة (How to Call (Invoke) a Function)</h2>
<pre><code class="language-python">is_even(<span class="hljs-number">3</span>)
is_even(<span class="hljs-number">8</span>)
</code></pre>
<ul>
<li>هذا كلّ شيء!</li>
</ul>
<h2 id="الشريحة-19-كيف-تستدعي-دالة">الشريحة 19: كيف تستدعي دالة</h2>
<pre><code class="language-python">is_even(<span class="hljs-number">3</span>)
is_even(<span class="hljs-number">8</span>)
</code></pre>
<ul>
<li>هذا كلّ شيء!</li>
</ul>
<h2 id="الشريحة-20-كل-ذلك-في-ملف-واحد">الشريحة 20: كلّ ذلك في ملف واحد</h2>
<ul>
<li>قد تكون هذه الشيفرة في ملف واحد.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

is_even(<span class="hljs-number">3</span>)
</code></pre>
<h2 id="الشريحة-21-ماذا-يحدث-حين-تستدعي-دالة">الشريحة 21: ماذا يحدث حين تستدعي دالة؟</h2>
<ul>
<li>يستبدل Python المعاملات الرسمية (formal parameters) في تعريف الدالة بقيم من استدعاء الدالة.</li>
</ul>
<p><code>i</code> ← يُستبدل بـ <code>3</code></p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

is_even(<span class="hljs-number">3</span>)
</code></pre>
<h2 id="الشريحة-22-ماذا-يحدث-حين-تستدعي-دالة">الشريحة 22: ماذا يحدث حين تستدعي دالة؟</h2>
<ul>
<li>يستبدل Python المعاملات الرسمية في تعريف الدالة بقيم من استدعاء الدالة: <code>i</code> ← <code>3</code>.</li>
<li>ينفّذ Python التعبيرات في جسم الدالة:</li>
</ul>
<p><code>return 3%2 == 0</code></p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

is_even(<span class="hljs-number">3</span>)
</code></pre>
<h2 id="الشريحة-23-ماذا-يحدث-حين-تستدعي-دالة">الشريحة 23: ماذا يحدث حين تستدعي دالة؟</h2>
<ul>
<li>يستبدل Python المعاملات الرسمية في تعريف الدالة بقيم من استدعاء الدالة: <code>i</code> ← <code>3</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

is_even(<span class="hljs-number">3</span>)

<span class="hljs-built_in">print</span>(is_even(<span class="hljs-number">3</span>))
</code></pre>
<h2 id="الشريحة-24-الفكرة-الكبرى-big-idea">الشريحة 24: الفكرة الكبرى (Big Idea)</h2>
<p>شيفرة الدالة <strong>لا تعمل إلاّ حين تستدعي الدالة</strong> (وتُسمّى أيضًا استدعاءً أو نداءً).</p>
<h2 id="الشريحة-25-جرب-بنفسك">الشريحة 25: جرّب بنفسك!</h2>
<ul>
<li>اكتب شيفرة تحقّق المواصفات التالية:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">div_by</span>(<span class="hljs-params">n, d</span>):
    <span class="hljs-string">&quot;&quot;&quot; n and d are ints &gt; 0
    Returns True if d divides n evenly and False otherwise &quot;&quot;&quot;</span>
</code></pre>
<p>اختبر شيفرتك مع:</p>
<ul>
<li><code>n = 10</code> و <code>d = 3</code></li>
<li><code>n = 195</code> و <code>d = 13</code></li>
</ul>
<h2 id="الشريحة-26-نبتعد-خطوة-للخلف-zooming-out-بلا-دوال">الشريحة 26: نبتعد خطوة للخلف (Zooming Out) — بلا دوال</h2>
<p><strong>نطاق البرنامج (Program Scope):</strong></p>
<pre><code class="language-python">a = <span class="hljs-number">3</span>
b = <span class="hljs-number">4</span>
c = a+b
</code></pre>
<h2 id="الشريحة-27-نبتعد-خطوة-للخلف-هذا-الصندوق-الأسود-لي">الشريحة 27: نبتعد خطوة للخلف — هذا «الصندوق الأسود» لي</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inside is_even&quot;</span>)
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>
</code></pre>
<p><strong>نطاق البرنامج (Program Scope):</strong></p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>الربط</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>is_even</code></td>
<td>دالة (function object) تحوي شيفرة</td>
</tr>
</tbody>
</table>
<p>وهذا ما أقوله لصندوقي الأسود أن يفعل شيئًا:</p>
<pre><code class="language-python">a = is_even(<span class="hljs-number">3</span>)
b = is_even(<span class="hljs-number">10</span>)
c = is_even(<span class="hljs-number">123456</span>)
</code></pre>
<h2 id="الشريحة-28-نبتعد-خطوة-للخلف">الشريحة 28: نبتعد خطوة للخلف</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inside is_even&quot;</span>)
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

a = is_even(<span class="hljs-number">3</span>)
b = is_even(<span class="hljs-number">10</span>)
c = is_even(<span class="hljs-number">123456</span>)
</code></pre>
<p>استدعاء دالة واحدة (one function call).</p>
<p><strong>نطاق البرنامج (Program Scope):</strong></p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>a</code></td>
<td><code>False</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-29-نبتعد-خطوة-للخلف">الشريحة 29: نبتعد خطوة للخلف</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inside is_even&quot;</span>)
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

a = is_even(<span class="hljs-number">3</span>)
b = is_even(<span class="hljs-number">10</span>)
c = is_even(<span class="hljs-number">123456</span>)
</code></pre>
<p>استدعاء دالة واحدة.</p>
<p><strong>نطاق البرنامج (Program Scope):</strong></p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>a</code></td>
<td><code>False</code></td>
</tr>
<tr>
<td><code>b</code></td>
<td><code>True</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-30-نبتعد-خطوة-للخلف">الشريحة 30: نبتعد خطوة للخلف</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_even</span>(<span class="hljs-params"> i </span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inside is_even&quot;</span>)
    <span class="hljs-keyword">return</span> i%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>

a = is_even(<span class="hljs-number">3</span>)
b = is_even(<span class="hljs-number">10</span>)
c = is_even(<span class="hljs-number">123456</span>)
</code></pre>
<p>استدعاء دالة واحدة.</p>
<p><strong>نطاق البرنامج (Program Scope):</strong></p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>a</code></td>
<td><code>False</code></td>
</tr>
<tr>
<td><code>b</code></td>
<td><code>True</code></td>
</tr>
<tr>
<td><code>c</code></td>
<td><code>True</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-31-إدراج-الدوال-في-الشيفرة">الشريحة 31: إدراج الدوال في الشيفرة</h2>
<ul>
<li>تذكّر كيف كان التعبير (expression) يُستبدل بقيمته؟</li>
<li>استدعاء الدالة يُستبدل بقيمة <code>return</code>!</li>
</ul>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Numbers between 1 and 10: even or odd&quot;</span>)
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>,<span class="hljs-number">10</span>):
    <span class="hljs-keyword">if</span> is_even(i):
        <span class="hljs-built_in">print</span>(i, <span class="hljs-string">&quot;even&quot;</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(i, <span class="hljs-string">&quot;odd&quot;</span>)
</code></pre>
<h2 id="الشريحة-32-مثال-آخر">الشريحة 32: مثال آخر</h2>
<ul>
<li>لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
</code></pre>
<ul>
<li>ما المدخل؟</li>
</ul>
<pre><code class="language-python">    <span class="hljs-comment"># your code here</span>
</code></pre>
<ul>
<li>قيمتا a و b</li>
</ul>
<pre><code class="language-python">    <span class="hljs-keyword">return</span> sum_of_odds
</code></pre>
<ul>
<li>ما المخرج؟</li>
<li>المجموع <code>sum_of_odds</code>.</li>
</ul>
<h2 id="الشريحة-33-الفكرة-الكبرى-big-idea">الشريحة 33: الفكرة الكبرى (Big Idea)</h2>
<p>لا تكتب الشيفرة فورًا!</p>
<h2 id="الشريحة-34-الورق-أولا-paper-first">الشريحة 34: الورق أولًا (Paper First)</h2>
<ul>
<li>لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
</code></pre>
<ul>
<li>ابدأ بمثال بسيط على الورق.</li>
<li>حلّ المثال بشكل منهجي.</li>
</ul>
<pre><code class="language-python">    <span class="hljs-comment"># your code here</span>
    <span class="hljs-keyword">return</span> sum_of_odds
</code></pre>
<h2 id="الشريحة-35-حالة-اختبار-بسيطة-simple-test-case">الشريحة 35: حالة اختبار بسيطة (Simple Test Case)</h2>
<ul>
<li>لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
</code></pre>
<ul>
<li>ابدأ بمثال بسيط على الورق.</li>
<li><code>a = 2</code> و <code>b = 4</code></li>
</ul>
<pre><code class="language-python">    <span class="hljs-comment"># your code here</span>
    <span class="hljs-keyword">return</span> sum_of_odds
</code></pre>
<ul>
<li>ينبغي أن تكون <code>sum_of_odds</code> يساوي 3.</li>
</ul>
<p>على خطّ الأعداد: من <code>a = 2</code> إلى <code>b = 4</code>، والأعداد 2 و 3 و 4.</p>
<h2 id="الشريحة-36-حالة-اختبار-أعقد-more-complex-test-case">الشريحة 36: حالة اختبار أعقد (More Complex Test Case)</h2>
<ul>
<li>لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
</code></pre>
<ul>
<li>ابدأ بمثال بسيط على الورق.</li>
<li><code>a = 2</code> و <code>b = 7</code></li>
</ul>
<pre><code class="language-python">    <span class="hljs-comment"># your code here</span>
    <span class="hljs-keyword">return</span> sum_of_odds
</code></pre>
<ul>
<li>ينبغي أن تكون <code>sum_of_odds</code> يساوي 15.</li>
</ul>
<p>على خطّ الأعداد: من <code>a = 2</code> إلى <code>b = 7</code>، والأعداد 2 و 3 و 4 و 5 و 6 و 7.</p>
<h2 id="الشريحة-37-حل-مسألة-مشابهة-solve-similar-problem">الشريحة 37: حلّ مسألة مشابهة (Solve Similar Problem)</h2>
<p>على خطّ الأعداد: <code>a = 2</code>، ثم 3، ثم 4، ثم <code>b</code>.</p>
<ul>
<li>ابدأ بالنظر في كلّ عدد بين a و b (شاملةً الطرفين).</li>
<li>مسألة مشابهة أسهل تعرف كيف تحلّها؟</li>
<li>اجمع <strong>كلّ</strong> الأعداد بين a و b (شاملةً الطرفين).</li>
<li>ابدأ بهذه.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">return</span> sum_of_odds
</code></pre>
<h2 id="الشريحة-38-اختر-بنية-الصورة-الكبرى-choose-big-picture-structure">الشريحة 38: اختر بنية الصورة الكبرى (Choose Big-Picture Structure)</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<ul>
<li>اجمع <strong>كلّ</strong> الأعداد بين a و b (شاملةً الطرفين).</li>
<li>هي بنية تكرار (loop).</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_odd</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">return</span> sum_of_odds
</code></pre>
<ul>
<li><code>while</code> أم <code>for</code>؟ — خيارك.</li>
</ul>
<h2 id="الشريحة-39-اكتب-حلقة-التكرار-write-the-loop-لجمع-كل-الأعداد">الشريحة 39: اكتب حلقة التكرار (Write the Loop) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b):</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>        # do something</code></td>
<td><code>        # do something</code></td>
</tr>
<tr>
<td></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>    return sum_of_odds</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-40-نفذ-الجمع-do-the-summing-لجمع-كل-الأعداد">الشريحة 40: نفّذ الجمع (Do the Summing) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        sum_of_odds += i</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>        sum_of_odds += i</code></td>
</tr>
<tr>
<td></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-41-هيئ-المجموع-initialize-the-sum-لجمع-كل-الأعداد">الشريحة 41: هيّئ المجموع (Initialize the Sum) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        sum_of_odds += i</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>        sum_of_odds += i</code></td>
</tr>
<tr>
<td></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-42-اختبر-test-لجمع-كل-الأعداد">الشريحة 42: اختبر! (Test!) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        sum_of_odds += i</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>        sum_of_odds += i</code></td>
</tr>
<tr>
<td><code>    print(sum_odd(2,4))</code></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
<tr>
<td></td>
<td><code>    print(sum_odd(2,4))</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-43-نتائج-غريبة-weird-results-لجمع-كل-الأعداد">الشريحة 43: نتائج غريبة… (Weird Results…) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        sum_of_odds += i</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>        sum_of_odds += i</code></td>
</tr>
<tr>
<td><code>    print(sum_odd(2,4))</code></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
<tr>
<td></td>
<td><code>    print(sum_odd(2,4))</code></td>
</tr>
<tr>
<td>الناتج</td>
<td><code>5</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-44-صحح-أي-أضف-تعليمات-طباعة-debug-aka-add-print-statements-لجمع-كل-الأعداد">الشريحة 44: صحّح! أي أضف تعليمات طباعة (Debug! aka Add Print Statements) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        sum_of_odds += i</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>        print(i, sum_of_odds)</code></td>
<td><code>        print(i, sum_of_odds)</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>        sum_of_odds += i</code></td>
</tr>
<tr>
<td><code>    print(sum_odd(2,4))</code></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
</tbody>
</table>
<p>القيم التي طُبعتاها بالترتيب:</p>
<table>
<thead>
<tr>
<th>الدورة</th>
<th><code>i</code></th>
<th><code>sum_of_odds</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>الأولى</td>
<td><code>2</code></td>
<td><code>22</code></td>
</tr>
<tr>
<td>الثانية</td>
<td><code>3</code></td>
<td><code>35</code></td>
</tr>
<tr>
<td>الثالثة</td>
<td><code>4</code></td>
<td><code>9</code></td>
</tr>
</tbody>
</table>
<p><strong>ملاحظة المترجم:</strong> الشريحة تُظهر القيمَين اللتين طُبعتا عند كلّ دورة (<code>i</code> والمجموع التراكمي) للتأكّد من مسار التنفيذ، وتكشف أنّ حلقة <code>for</code> في <code>range(a, b)</code> لا تشمل <code>b</code>.</p>
<h2 id="الشريحة-45-أصلح-فهرس-نهاية-حلقة-for-fix-for-loop-end-index-لجمع-كل-الأعداد">الشريحة 45: أصلح فهرس نهاية حلقة <code>for</code> (Fix for Loop End Index) — لجمع كلّ الأعداد</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b+1):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        sum_of_odds += i</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>        print(i, sum_of_odds)</code></td>
</tr>
<tr>
<td><code>    print(sum_odd(2,4))</code></td>
<td><code>        sum_of_odds += i</code></td>
</tr>
<tr>
<td>الناتج: <code>9</code></td>
<td><code>        print(i, sum_of_odds)</code></td>
</tr>
<tr>
<td></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
<tr>
<td></td>
<td><code>    print(sum_odd(2,4))</code></td>
</tr>
<tr>
<td></td>
<td>الناتج: <code>9</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-46-أضف-الجزء-الخاص-بالأعداد-الفردية-add-in-the-odd-part">الشريحة 46: أضف الجزء الخاص بالأعداد الفردية! (Add in the Odd Part!)</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم <code>b</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b+1):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        if i%2 == 1:</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>            sum_of_odds += i</code></td>
<td><code>        if i%2 == 1:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>            sum_of_odds += i</code></td>
</tr>
<tr>
<td><code>    print(sum_odd(2,4))</code></td>
<td><code>        print(i, sum_of_odds)</code></td>
</tr>
<tr>
<td>الناتج</td>
<td><code>3</code></td>
</tr>
<tr>
<td></td>
<td><code>    return sum_of_odds</code></td>
</tr>
<tr>
<td></td>
<td><code>    print(sum_odd(2,4))</code></td>
</tr>
<tr>
<td></td>
<td>الناتج <code>3</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-47-الفكرة-الكبرى-big-idea">الشريحة 47: الفكرة الكبرى (Big Idea)</h2>
<p>حلّ مسألة أبسط أولًا. أضِف الوظيفة الجديدة إلى الشيفرة لاحقًا.</p>
<h2 id="الشريحة-48-جربها-على-مثال-آخر-try-it-on-another-example">الشريحة 48: جرّبها على مثال آخر (Try It on Another Example)</h2>
<p>على خطّ الأعداد: <code>a = 2</code> ثم 3 ثم 4 ثم 5 ثم 6 ثم <code>b = 7</code>.</p>
<table>
<thead>
<tr>
<th>حلقة <code>for</code></th>
<th>حلقة <code>while</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>def sum_odd(a, b):</code></td>
<td><code>def sum_odd(a, b):</code></td>
</tr>
<tr>
<td><code>    sum_of_odds = 0</code></td>
<td><code>    sum_of_odds = 0</code></td>
</tr>
<tr>
<td><code>    for i in range(a, b+1):</code></td>
<td><code>    i = a</code></td>
</tr>
<tr>
<td><code>        if i%2 == 1:</code></td>
<td><code>    while i &lt;= b:</code></td>
</tr>
<tr>
<td><code>            sum_of_odds += i</code></td>
<td><code>        if i%2 == 1:</code></td>
</tr>
<tr>
<td><code>    return sum_of_odds</code></td>
<td><code>            sum_of_odds += i</code></td>
</tr>
<tr>
<td><code>    print(sum_odd(2,7))</code></td>
<td><code>        i += 1</code></td>
</tr>
<tr>
<td>الناتج</td>
<td><code>15</code></td>
</tr>
<tr>
<td></td>
<td><code>    print(sum_odd(2,7))</code></td>
</tr>
<tr>
<td></td>
<td>الناتج <code>15</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-49-python-tutor">الشريحة 49: Python Tutor</h2>
<ul>
<li>أيضًا أداة ممتازة لتنقيح الأخطاء (debugging).</li>
</ul>
<h2 id="الشريحة-50-الفكرة-الكبرى-big-idea">الشريحة 50: الفكرة الكبرى (Big Idea)</h2>
<p>اختبر الشيفرة كثيرًا. استخدم تعليمات الطباعة لتنقيح الأخطاء.</p>
<h2 id="الشريحة-51-جرب-بنفسك">الشريحة 51: جرّب بنفسك!</h2>
<ul>
<li>اكتب شيفرة تحقّق المواصفات التالية:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_palindrome</span>(<span class="hljs-params">s</span>):
    <span class="hljs-string">&quot;&quot;&quot; s is a string
    Returns True if s is a palindrome and False otherwise
    &quot;&quot;&quot;</span>
</code></pre>
<p>مثلًا:</p>
<ul>
<li>إذا كان <code>s = &quot;222&quot;</code> يُعيد <code>True</code></li>
<li>إذا كان <code>s = &quot;2222&quot;</code> يُعيد <code>True</code></li>
<li>إذا كان <code>s = &quot;abc&quot;</code> يُعيد <code>False</code></li>
</ul>
<h2 id="الشريحة-52-الخلاصة-summary">الشريحة 52: الخلاصة (Summary)</h2>
<ul>
<li>
<p>تتيح لنا الدوال إخفاء التفاصيل عن المستخدم.</p>
</li>
<li>
<p>تلتقط الدوال حسابًا داخل صندوق أسود.</p>
</li>
<li>
<p>يكتب المبرمج الدوال بـ:</p>
<ul>
<li>صفر أو أكثر من المدخلات.</li>
<li>شيء يُعاد.</li>
</ul>
</li>
<li>
<p>الدالة لا تعمل إلاّ عند استدعائها.</p>
</li>
<li>
<p>يُستبدل استدعاء الدالة كاملًا بقيمة <code>return</code>.</p>
</li>
<li>
<p>فكّر في التعبيرات! وكيف تستبدل تعبيرًا كاملًا بالقيمة التي يُقيَّم إليها.</p>
</li>
</ul>
<h2 id="الشريحة-53-mit-opencourseware">الشريحة 53: MIT OpenCourseWare</h2>
<ul>
<li><a href="https://ocw.mit.edu">MIT OpenCourseWare</a></li>
<li>6.100L Introduction to Computer Science and Programming Using Python — Fall 2022.</li>
<li>للاستعلام عن كيفية الاستشهاد بهذه المواد أو عن <a href="https://ocw.mit.edu/terms">شروط الاستخدام</a>، زيارة: https://ocw.mit.edu/terms.</li>
</ul>
`,l={book:n,chapter:t,chapterTitle:e,slug:d,title:s,headings:o,html:a};export{n as book,t as chapter,e as chapterTitle,l as default,o as headings,a as html,d as slug,s as title};
