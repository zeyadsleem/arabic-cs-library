const s="mit-6100l",n="lecture-16",l="المحاضرة 16: الاستدعاء الذاتي على غير الأعداد",a="notes",e="المحاضرة 16: الاستدعاء الذاتي (Recursion) على غير الأعداد",p=JSON.parse('[{"depth":2,"id":"المصادر-والنسبة-والترخيص","text":"المصادر والنسبة والترخيص"},{"depth":2,"id":"الشريحة-1-عنوان-المحاضرة","text":"الشريحة 1: عنوان المحاضرة"},{"depth":2,"id":"الشريحة-2-مراجعة-الاستدعاء-الذاتي-recursion-من-المحاضرة-السابقة-مع-مثال-review-of-recursion-from-last-lecture-with-an-example","text":"الشريحة 2: مراجعة الاستدعاء الذاتي (Recursion) من المحاضرة السابقة، مع مثال (REVIEW OF RECURSION FROM LAST LECTURE, WITH AN EXAMPLE)"},{"depth":2,"id":"الشريحة-3-فيبوناتشي-fibonacci","text":"الشريحة 3: فيبوناتشي (FIBONACCI)"},{"depth":2,"id":"الشريحة-4-شيفرة-فيبوناتشي-العودية-حالات-أساس-متعددة-fibonacci-recursive-code-multiple-base-cases","text":"الشريحة 4: شيفرة فيبوناتشي العودية (حالات أساس متعدّدة) — FIBONACCI RECURSIVE CODE (MULTIPLE BASE CASES)"},{"depth":2,"id":"الشريحة-5-رؤية-عالية-المستوى-high-level-view-لفيبوناتشي-مع-الاستدعاء-الذاتي-رابط-python-tutor","text":"الشريحة 5: رؤية عالية المستوى (HIGH-LEVEL VIEW) لفيبوناتشي مع الاستدعاء الذاتي — رابط PYTHON TUTOR"},{"depth":2,"id":"الشريحة-6-فيبوناتشي-غير-الكفؤ-inefficient-fibonacci","text":"الشريحة 6: فيبوناتشي غير الكفؤ (INEFFICIENT FIBONACCI)"},{"depth":2,"id":"الشريحة-7-فيبوناتشي-مع-الحفظ-المؤقت-memoization-رابط-python-tutor","text":"الشريحة 7: فيبوناتشي مع الحفظ المؤقّت (MEMOIZATION) — رابط PYTHON TUTOR"},{"depth":2,"id":"الشريحة-8-فيبوناتشي-الكفؤ-يتحقق-من-القاموس-أولا-efficient-fibonacci-checks-the-dict-first","text":"الشريحة 8: فيبوناتشي الكفؤ يتحقّق من القاموس أولًا (EFFICIENT FIBONACCI CHECKS the DICT FIRST)"},{"depth":2,"id":"الشريحة-9-مكاسب-الكفاءة-efficiency-gains","text":"الشريحة 9: مكاسب الكفاءة (EFFICIENCY GAINS)"},{"depth":2,"id":"الشريحة-10-مثال-أكثر-عملية-a-more-practical-example","text":"الشريحة 10: مثال أكثر عملية (A MORE PRACTICAL EXAMPLE)"},{"depth":2,"id":"الشريحة-11-مثال-أكثر-عملية-رابط-python-tutor","text":"الشريحة 11: مثال أكثر عملية: رابط PYTHON TUTOR"},{"depth":2,"id":"الشريحة-12-رؤية-عالية-المستوى-high-level-view-لـ-scorecount","text":"الشريحة 12: رؤية عالية المستوى (HIGH-LEVEL VIEW) لـ score_count"},{"depth":2,"id":"الشريحة-13-مجموع-عناصر-القائمة-sum-of-list-elements","text":"الشريحة 13: مجموع عناصر القائمة (SUM of LIST ELEMENTS)"},{"depth":2,"id":"الشريحة-14-القوائم-عودية-بطبيعتها-lists-are-naturally-recursive","text":"الشريحة 14: القوائم عودية بطبيعتها (LISTS ARE NATURALLY RECURSIVE)"},{"depth":2,"id":"الشريحة-15-تمثيل-القوائم-على-أنها-عودية-visualizing-lists-as-recursive-ابدأ","text":"الشريحة 15: تمثيل القوائم على أنها عودية (VISUALIZING LISTS as RECURSIVE) — ابدأ"},{"depth":2,"id":"الشريحة-16-تمثيل-القوائم-على-أنها-عودية-القيمة-الأولى","text":"الشريحة 16: تمثيل القوائم على أنها عودية — القيمة الأولى"},{"depth":2,"id":"الشريحة-17-تمثيل-القوائم-على-أنها-عودية-المسألة-نفسها-بشكل-أصغر","text":"الشريحة 17: تمثيل القوائم على أنها عودية — المسألة نفسها بشكل أصغر"},{"depth":2,"id":"الشريحة-18-تمثيل-القوائم-على-أنها-عودية-القيمة-الأولى","text":"الشريحة 18: تمثيل القوائم على أنها عودية — القيمة الأولى"},{"depth":2,"id":"الشريحة-19-تمثيل-القوائم-على-أنها-عودية-المسألة-نفسها-مرة-أخرى","text":"الشريحة 19: تمثيل القوائم على أنها عودية — المسألة نفسها مرة أخرى"},{"depth":2,"id":"الشريحة-20-تمثيل-القوائم-على-أنها-عودية-القيمة-الأولى","text":"الشريحة 20: تمثيل القوائم على أنها عودية — القيمة الأولى"},{"depth":2,"id":"الشريحة-21-تمثيل-القوائم-على-أنها-عودية-أيضا","text":"الشريحة 21: تمثيل القوائم على أنها عودية — أيضًا"},{"depth":2,"id":"الشريحة-22-تمثيل-القوائم-على-أنها-عودية-أيضا","text":"الشريحة 22: تمثيل القوائم على أنها عودية — أيضًا"},{"depth":2,"id":"الشريحة-23-تمثيل-القوائم-على-أنها-عودية-حالة-الأساس","text":"الشريحة 23: تمثيل القوائم على أنها عودية — حالة الأساس"},{"depth":2,"id":"الشريحة-24-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع","text":"الشريحة 24: تمثيل القوائم على أنها عودية — إرجاع المجموع"},{"depth":2,"id":"الشريحة-25-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع","text":"الشريحة 25: تمثيل القوائم على أنها عودية — إرجاع المجموع"},{"depth":2,"id":"الشريحة-26-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع","text":"الشريحة 26: تمثيل القوائم على أنها عودية — إرجاع المجموع"},{"depth":2,"id":"الشريحة-27-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع","text":"الشريحة 27: تمثيل القوائم على أنها عودية — إرجاع المجموع"},{"depth":2,"id":"الشريحة-28-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع","text":"الشريحة 28: تمثيل القوائم على أنها عودية — إرجاع المجموع"},{"depth":2,"id":"الشريحة-29-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع","text":"الشريحة 29: تمثيل القوائم على أنها عودية — إرجاع المجموع"},{"depth":2,"id":"الشريحة-30-مجموع-عناصر-القائمة-القطع-sum-of-list-elements-the-pieces","text":"الشريحة 30: مجموع عناصر القائمة: القطع (SUM of LIST ELEMENTS: the PIECES)"},{"depth":2,"id":"الشريحة-31-مجموع-عناصر-القائمة-حالة-الأساس-خيار-واحد","text":"الشريحة 31: مجموع عناصر القائمة: حالة الأساس (خيار واحد)"},{"depth":2,"id":"الشريحة-32-مجموع-عناصر-القائمة-حالة-الأساس-خيار-آخر","text":"الشريحة 32: مجموع عناصر القائمة: حالة الأساس (خيار آخر)"},{"depth":2,"id":"الشريحة-33-مجموع-عناصر-القائمة-الخطوة-العودية","text":"الشريحة 33: مجموع عناصر القائمة: الخطوة العودية"},{"depth":2,"id":"الشريحة-34-مجموع-عناصر-القائمة-الخطوة-العودية-ستنتهي-في-النهاية","text":"الشريحة 34: مجموع عناصر القائمة: الخطوة العودية ستنتهي في النهاية"},{"depth":2,"id":"الشريحة-35-مجموع-عناصر-القائمة-الخلاصات-رابط-python-tutor","text":"الشريحة 35: مجموع عناصر القائمة: الخلاصات — رابط PYTHON TUTOR"},{"depth":2,"id":"الشريحة-36-جرب-بنفسك-you-try-it","text":"الشريحة 36: جرّب بنفسك (YOU TRY IT!)"},{"depth":2,"id":"الشريحة-37-البحث-عن-عنصر-في-قائمة-looking-for-an-element-in-a-list","text":"الشريحة 37: البحث عن عنصر في قائمة (LOOKING for an ELEMENT in a LIST)"},{"depth":2,"id":"الشريحة-38-مثال-آخر-هل-العنصر-موجود-في-القائمة-انتبه-لهذه-النسخة","text":"الشريحة 38: مثال آخر: هل العنصر موجود في القائمة؟ (انتبه لهذه النسخة)"},{"depth":2,"id":"الشريحة-39-مثال-آخر-هل-العنصر-موجود-في-القائمة-جربها-python-tutor","text":"الشريحة 39: مثال آخر: هل العنصر موجود في القائمة؟ (جرّبها) — PYTHON TUTOR"},{"depth":2,"id":"الشريحة-40-مثال-آخر-هل-العنصر-موجود-في-القائمة-أصلح-النسخة","text":"الشريحة 40: مثال آخر: هل العنصر موجود في القائمة؟ (أصلح النسخة)"},{"depth":2,"id":"الشريحة-41-مثال-آخر-هل-العنصر-موجود-في-القائمة-أصلح-النسخة","text":"الشريحة 41: مثال آخر: هل العنصر موجود في القائمة؟ (أصلح النسخة)"},{"depth":2,"id":"الشريحة-42-مثال-آخر-هل-العنصر-موجود-في-القائمة-اختبر-النسخة-python-tutor","text":"الشريحة 42: مثال آخر: هل العنصر موجود في القائمة؟ (اختبر النسخة) — PYTHON TUTOR"},{"depth":2,"id":"الشريحة-43-مثال-آخر-هل-العنصر-موجود-في-القائمة-حسن-النسخة","text":"الشريحة 43: مثال آخر: هل العنصر موجود في القائمة؟ (حسِّن النسخة)"},{"depth":2,"id":"الشريحة-44-الفكرة-الكبرى-big-idea","text":"الشريحة 44: الفكرة الكبرى (BIG IDEA)"},{"depth":2,"id":"الشريحة-45-تسطيح-flatten-قائمة-تحتوي-مستوى-واحدا-فقط-من-عناصر-القوائم","text":"الشريحة 45: تسطيح (FLATTEN) قائمة تحتوي مستوى واحدًا فقط من عناصر القوائم"},{"depth":2,"id":"الشريحة-46-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة","text":"الشريحة 46: تسطيح قائمة تحتوي قوائم من أعداد صحيحة"},{"depth":2,"id":"الشريحة-47-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة","text":"الشريحة 47: تسطيح قائمة تحتوي قوائم من أعداد صحيحة"},{"depth":2,"id":"الشريحة-48-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة","text":"الشريحة 48: تسطيح قائمة تحتوي قوائم من أعداد صحيحة"},{"depth":2,"id":"الشريحة-49-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة-رابط-python-tutor","text":"الشريحة 49: تسطيح قائمة تحتوي قوائم من أعداد صحيحة — رابط PYTHON TUTOR"},{"depth":2,"id":"الشريحة-50-جرب-بنفسك-you-try-it","text":"الشريحة 50: جرّب بنفسك (YOU TRY IT!)"},{"depth":2,"id":"الشريحة-51-متى-نستخدم-الاستدعاء-الذاتي-when-to-use-recursion","text":"الشريحة 51: متى نستخدم الاستدعاء الذاتي (WHEN to USE RECURSION)"},{"depth":2,"id":"الشريحة-52-حدس-متى-نستخدم-الاستدعاء-الذاتي-intuition-for-when-to-use-recursion","text":"الشريحة 52: حدس متى نستخدم الاستدعاء الذاتي (INTUITION for WHEN to use RECURSION)"},{"depth":2,"id":"الشريحة-53-حدس-متى-نستخدم-الاستدعاء-الذاتي-مثال-آخر","text":"الشريحة 53: حدس متى نستخدم الاستدعاء الذاتي (مثال آخر)"},{"depth":2,"id":"الشريحة-54-مسائل-عودية-بطبيعتها-problems-that-are-naturally-recursive","text":"الشريحة 54: مسائل عودية بطبيعتها (PROBLEMS that are NATURALLY RECURSIVE)"},{"depth":2,"id":"الشريحة-55-لنر-كيف-ننتقل-من-مستوى-واحد-إلى-مستويات-كثيرة-بشكل-عودي","text":"الشريحة 55: لنرَ كيف ننتقل من مستوى واحد إلى مستويات كثيرة (بشكل عودي)"},{"depth":2,"id":"الشريحة-56-نفس-السؤال-القائمة-بعد-الإزالة-الأولى","text":"الشريحة 56: نفس السؤال — القائمة بعد الإزالة الأولى"},{"depth":2,"id":"الشريحة-57-نفس-السؤال","text":"الشريحة 57: نفس السؤال"},{"depth":2,"id":"الشريحة-58-نفس-السؤال","text":"الشريحة 58: نفس السؤال"},{"depth":2,"id":"الشريحة-59-نفس-السؤال","text":"الشريحة 59: نفس السؤال"},{"depth":2,"id":"الشريحة-60-نفس-السؤال","text":"الشريحة 60: نفس السؤال"},{"depth":2,"id":"الشريحة-61-نفس-السؤال","text":"الشريحة 61: نفس السؤال"},{"depth":2,"id":"الشريحة-62-عكس-قائمة-عناصر-المستوى-الأعلى-فقط-top-level-only","text":"الشريحة 62: عكس قائمة عناصر: المستوى الأعلى فقط (TOP-LEVEL ONLY)"},{"depth":2,"id":"الشريحة-63-عكس-قائمة-عناصر-المستوى-الأعلى-فقط","text":"الشريحة 63: عكس قائمة عناصر: المستوى الأعلى فقط"},{"depth":2,"id":"الشريحة-64-عكس-قائمة-عناصر-المستوى-الأعلى-فقط","text":"الشريحة 64: عكس قائمة عناصر: المستوى الأعلى فقط"},{"depth":2,"id":"الشريحة-65-عكس-قائمة-عناصر-المستوى-الأعلى-فقط","text":"الشريحة 65: عكس قائمة عناصر: المستوى الأعلى فقط"},{"depth":2,"id":"الشريحة-66-عكس-قائمة-عناصر-المستوى-الأعلى-فقط-رابط-python-tutor","text":"الشريحة 66: عكس قائمة عناصر: المستوى الأعلى فقط — رابط PYTHON TUTOR"},{"depth":2,"id":"الشريحة-67-كل-العناصر-تعكس-all-elements-get-reversed","text":"الشريحة 67: كل العناصر تُعكس (ALL ELEMENTS GET REVERSED)"},{"depth":2,"id":"الشريحة-68-كل-العناصر-تعكس","text":"الشريحة 68: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-69-كل-العناصر-تعكس","text":"الشريحة 69: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-70-كل-العناصر-تعكس","text":"الشريحة 70: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-71-كل-العناصر-تعكس","text":"الشريحة 71: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-72-كل-العناصر-تعكس","text":"الشريحة 72: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-73-كل-العناصر-تعكس","text":"الشريحة 73: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-74-كل-العناصر-تعكس","text":"الشريحة 74: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-75-عكس-قائمة-عناصر-كل-العناصر-تعكس","text":"الشريحة 75: عكس قائمة عناصر: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-76-عكس-قائمة-عناصر-كل-العناصر-تعكس","text":"الشريحة 76: عكس قائمة عناصر: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-77-عكس-قائمة-عناصر-كل-العناصر-تعكس","text":"الشريحة 77: عكس قائمة عناصر: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-78-عكس-قائمة-عناصر-كل-العناصر-تعكس","text":"الشريحة 78: عكس قائمة عناصر: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-79-عكس-قائمة-عناصر-كل-العناصر-تعكس","text":"الشريحة 79: عكس قائمة عناصر: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-80-عكس-قائمة-عناصر-كل-العناصر-تعكس","text":"الشريحة 80: عكس قائمة عناصر: كل العناصر تُعكس"},{"depth":2,"id":"الشريحة-81-عكس-قائمة-عناصر-كل-العناصر-تعكس-الشيفرة-المنظفة-cleaned-up-code","text":"الشريحة 81: عكس قائمة عناصر: كل العناصر تُعكس — الشيفرة المنظّفة (CLEANED UP CODE)"},{"depth":2,"id":"الشريحة-82-الفكرة-الكبرى-big-idea","text":"الشريحة 82: الفكرة الكبرى (BIG IDEA)"},{"depth":2,"id":"الشريحة-83-أهم-الخلاصات-حول-الاستدعاء-الذاتي-major-recursion-takeaways","text":"الشريحة 83: أهم الخلاصات حول الاستدعاء الذاتي (MAJOR RECURSION TAKEAWAYS)"},{"depth":2,"id":"الشريحة-84-جرب-بنفسك-you-try-it","text":"الشريحة 84: جرّب بنفسك (YOU TRY IT!)"},{"depth":2,"id":"الشريحة-85-mit-opencourseware","text":"الشريحة 85: MIT OpenCourseWare"}]'),t=`<h1>المحاضرة 16: الاستدعاء الذاتي (Recursion) على غير الأعداد</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:</p>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة الرسمية على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/</a></li>
<li>الشرائح (ملف PDF): <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16_pdf/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16_pdf/</a> — والملف المباشر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec16.pdf">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec16.pdf</a></li>
<li>ملفات الشيفرة للتمرين: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16_code_py/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16_code_py/</a></li>
<li>النص الكامل (Transcript) للمحاضرة على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16/</a></li>
<li>رخصة CC BY-NC-SA 4.0: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">https://creativecommons.org/licenses/by-nc-sa/4.0/</a></li>
<li>شروط الاستخدام في MIT OCW: <a href="https://ocw.mit.edu/terms/">https://ocw.mit.edu/terms/</a></li>
</ul>
<p><strong>منهج الترجمة:</strong> عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (85 شريحة)، مع الحفاظ على ترتيب الشرائح كلّها بما فيها شرائح البناء التدريجي المتكرّرة. الشيفرة والشفرة الوهمية (pseudocode) تُركت بالإنجليزية كما هي. الأشكال لم تُضمَّن. وحيث لا يسمح نصّ الملف المستخرَج بإعادة بناء تفصيلة بعينها (أسهم الرسم، وأرقام <code>id</code> في الذاكرة، ووسوم <code>id</code> unlabeled في أمثلة الدوال) نُصَّ على ذلك صراحةً في «ملاحظة المترجم» بدل التخمين.</p>
<h2 id="الشريحة-1-عنوان-المحاضرة">الشريحة 1: عنوان المحاضرة</h2>
<ul>
<li>RECURSION ON NONNUMERICS</li>
<li>(download slides and .py files to follow along)</li>
<li>6.100L Lecture 16 — Ana Bell</li>
</ul>
<h2 id="الشريحة-2-مراجعة-الاستدعاء-الذاتي-recursion-من-المحاضرة-السابقة-مع-مثال-review-of-recursion-from-last-lecture-with-an-example">الشريحة 2: مراجعة الاستدعاء الذاتي (Recursion) من المحاضرة السابقة، مع مثال (REVIEW OF RECURSION FROM LAST LECTURE, WITH AN EXAMPLE)</h2>
<ul>
<li>أعداد فيبوناتشي (Fibonacci numbers) (حوالي عام 1202)</li>
<li>ليوناردو بيزا (aka Fibonacci) صوّر تكاثر الأرانب (تحت افتراضات معيّنة) على هيئة متسلسلة فيبوناتشي</li>
<li>زوجٌ من الأرانب حديثي الولادة (أنثى وذكر) يوضع في حظيرة</li>
<li>تتزاوج الأرانب في عمر شهر واحد</li>
<li>مدة الحمل شهر واحد</li>
<li>نفترض أن الأرانب لا تموت، وأن الأنثى تُنتج دائمًا زوجًا جديدًا (ذكر وأنثى) كل شهر ابتداءً من شهرها الثاني</li>
</ul>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>f</mi><mi>e</mi><mi>m</mi><mi>a</mi><mi>l</mi><mi>e</mi><mi>s</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo><mo>=</mo><mi>f</mi><mi>e</mi><mi>m</mi><mi>a</mi><mi>l</mi><mi>e</mi><mi>s</mi><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mi>f</mi><mi>e</mi><mi>m</mi><mi>a</mi><mi>l</mi><mi>e</mi><mi>s</mi><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">females(n) = females(n-1) + females(n-2)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">e</span><span class="mord mathnormal">ma</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">es</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">e</span><span class="mord mathnormal">ma</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">es</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">e</span><span class="mord mathnormal">ma</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">es</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">2</span><span class="mclose">)</span></span></span></span></span>
<ul>
<li><code>females(n-1)</code>: الإناث الحيّات في الشهر n-1</li>
<li>كل أنثى حية في الشهر n-2 ستُنتج أنثى واحدة في الشهر n</li>
</ul>
<table>
<thead>
<tr>
<th>الشهر</th>
<th>الإناث</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>4</td>
<td>3</td>
</tr>
<tr>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>6</td>
<td>8</td>
</tr>
<tr>
<td>7</td>
<td>13</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-3-فيبوناتشي-fibonacci">الشريحة 3: فيبوناتشي (FIBONACCI)</h2>
<ul>
<li>الحالات الأساس (Base cases):
<ul>
<li><code>Females(1) = 1</code></li>
<li><code>Females(2) = 1</code></li>
</ul>
</li>
<li>الحالة العودية (Recursive case)
<ul>
<li><code>Females(n) = Females(n-1) + Females(n-2)</code></li>
</ul>
</li>
</ul>
<h2 id="الشريحة-4-شيفرة-فيبوناتشي-العودية-حالات-أساس-متعددة-fibonacci-recursive-code-multiple-base-cases">الشريحة 4: شيفرة فيبوناتشي العودية (حالات أساس متعدّدة) — FIBONACCI RECURSIVE CODE (MULTIPLE BASE CASES)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fib</span>(<span class="hljs-params">x</span>):
    <span class="hljs-keyword">if</span> x == <span class="hljs-number">1</span> <span class="hljs-keyword">or</span> x == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> fib(x-<span class="hljs-number">1</span>) + fib(x-<span class="hljs-number">2</span>)
</code></pre>
<ul>
<li>حالتا أساس (Two base cases)</li>
<li>تنادي نفسها مرّتين (Calls itself twice)</li>
<li>لكن! عليها أن تصل إلى حالة الأساس في الاستدعاء الأول لـ <code>fib</code> قبل أن يُكمل الاستدعاء الثاني لـ <code>fib</code></li>
</ul>
<h2 id="الشريحة-5-رؤية-عالية-المستوى-high-level-view-لفيبوناتشي-مع-الاستدعاء-الذاتي-رابط-python-tutor">الشريحة 5: رؤية عالية المستوى (HIGH-LEVEL VIEW) لفيبوناتشي مع الاستدعاء الذاتي — رابط PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fib</span>(<span class="hljs-params">x</span>):
    <span class="hljs-keyword">if</span> x == <span class="hljs-number">1</span> <span class="hljs-keyword">or</span> x == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> fib(x-<span class="hljs-number">1</span>) + fib(x-<span class="hljs-number">2</span>)
</code></pre>
<p>شجرة الاستدعاءات عند <code>Fib(6)</code>:</p>
<ul>
<li><code>Fib(6)</code>
<ul>
<li><code>Fib(5)</code>
<ul>
<li><code>Fib(4)</code>
<ul>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
</ul>
</li>
<li><code>Fib(4)</code>
<ul>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><code>Fib(5)</code>
<ul>
<li><code>Fib(4)</code>
<ul>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
</ul>
</li>
<li><code>Fib(4)</code>
<ul>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
<li><code>Fib(3)</code>
<ul>
<li><code>Fib(2)</code></li>
<li><code>Fib(1)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-6-فيبوناتشي-غير-الكفؤ-inefficient-fibonacci">الشريحة 6: فيبوناتشي غير الكفؤ (INEFFICIENT FIBONACCI)</h2>
<p>نفس الشجرة السابقة تمامًا، لكنّ مؤشّر الشريحة في الأصل يشير إلى إعادة الحساب:</p>
<ul>
<li>نُعيد حساب القيم نفسها مرّات كثيرة! (Recalculating the same values many times!)</li>
<li>يمكننا تتبّع القيم التي حُسبت بالفعل</li>
</ul>
<h2 id="الشريحة-7-فيبوناتشي-مع-الحفظ-المؤقت-memoization-رابط-python-tutor">الشريحة 7: فيبوناتشي مع الحفظ المؤقّت (MEMOIZATION) — رابط PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fib_efficient</span>(<span class="hljs-params">n, d</span>):
    <span class="hljs-keyword">if</span> n <span class="hljs-keyword">in</span> d:
        <span class="hljs-keyword">return</span> d[n]
    <span class="hljs-keyword">else</span>:
        ans = fib_efficient(n-<span class="hljs-number">1</span>, d) + fib_efficient(n-<span class="hljs-number">2</span>, d)
        d[n] = ans
        <span class="hljs-keyword">return</span> ans

d = {<span class="hljs-number">1</span>:<span class="hljs-number">1</span>, <span class="hljs-number">2</span>:<span class="hljs-number">1</span>}
<span class="hljs-built_in">print</span>(fib_efficient(<span class="hljs-number">6</span>, d))
</code></pre>
<ul>
<li>نُجري بحثًا أولًا (lookup) تحسّبًا لأن تكون القيمة قد حُسبت بالفعل</li>
<li>نُعدّل القاموس أثناء تقدّمنا في استدعاءات الدالة</li>
</ul>
<h2 id="الشريحة-8-فيبوناتشي-الكفؤ-يتحقق-من-القاموس-أولا-efficient-fibonacci-checks-the-dict-first">الشريحة 8: فيبوناتشي الكفؤ يتحقّق من القاموس أولًا (EFFICIENT FIBONACCI CHECKS the DICT FIRST)</h2>
<table>
<thead>
<tr>
<th>n</th>
<th>fib(n)</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>4</td>
<td>3</td>
</tr>
<tr>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>6</td>
<td>8</td>
</tr>
</tbody>
</table>
<ul>
<li>لم نَعُد نُعيد الحساب، بل نتحقّق من القاموس قبل الحساب!</li>
<li>نضيف إلى القاموس كي نتمكّن من البحث عنه في المرة القادمة التي نراه فيها</li>
</ul>
<h2 id="الشريحة-9-مكاسب-الكفاءة-efficiency-gains">الشريحة 9: مكاسب الكفاءة (EFFICIENCY GAINS)</h2>
<ul>
<li>استدعاء <code>fib(34)</code> يُنتج 11,405,773 استدعاءً عوديًا للإجراء</li>
<li>استدعاء <code>fib_efficient(34)</code> يُنتج 65 استدعاءً عوديًا للإجراء</li>
<li>استخدام القواميس لالتقاط النتائج الوسيطة قد يكون كفؤًا جدًا</li>
<li>لكن لاحظ أن هذا لا ينفع إلا مع الإجراءات الخالية من الآثار الجانبية (side effects)، أي أن الإجراء يُنتج دائمًا النتيجة نفسها في مُدخَل معيّن، مستقلًا عن أي عمليات حسابية أخرى تقع بين الاستدعاءات</li>
</ul>
<h2 id="الشريحة-10-مثال-أكثر-عملية-a-more-practical-example">الشريحة 10: مثال أكثر عملية (A MORE PRACTICAL EXAMPLE)</h2>
<p>ما كل الطرق التي يمكن بها تسجيل score بقيمة x في كرة السلة؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">score_count</span>(<span class="hljs-params">x</span>):
    <span class="hljs-string">&quot;&quot;&quot; Returns all the ways to make a score of x by adding
    1, 2, and/or 3 together. Order doesn&#x27;t matter. &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> x == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">elif</span> x == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>
    <span class="hljs-keyword">elif</span> x == <span class="hljs-number">3</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> score_count(x-<span class="hljs-number">1</span>)+score_count(x-<span class="hljs-number">2</span>)+score_count(x-<span class="hljs-number">3</span>)
</code></pre>
<ul>
<li>في كرة السلة يمكنك تسجيل سلة (basket) بقيمة 1 أو 2 أو 3 نقاط</li>
<li>ثلاث حالات أساس! (Base cases: 3 of them!)</li>
<li>يمكنك تسجيل 1 بـ 1+0 (تلك طريقة واحدة)</li>
<li>يمكنك تسجيل 2 بـ 1+1 أو 2+0 (تلك طرقتان)</li>
<li>يمكنك تسجيل 3 بـ 1+1+1 أو 2+1 أو 3+0 (تلك ثلاث طرق)</li>
</ul>
<h2 id="الشريحة-11-مثال-أكثر-عملية-رابط-python-tutor">الشريحة 11: مثال أكثر عملية: رابط PYTHON TUTOR</h2>
<p>ما كل الطرق التي يمكن بها تسجيل score بقيمة x في كرة السلة؟</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">score_count</span>(<span class="hljs-params">x</span>):
    <span class="hljs-string">&quot;&quot;&quot; Returns all the ways to make a score of x by adding
    1, 2, and/or 3 together. Order doesn&#x27;t matter. &quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> x == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">elif</span> x == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>
    <span class="hljs-keyword">elif</span> x == <span class="hljs-number">3</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> score_count(x-<span class="hljs-number">1</span>)+score_count(x-<span class="hljs-number">2</span>)+score_count(x-<span class="hljs-number">3</span>)
</code></pre>
<ul>
<li>الخطوة العودية: اترك استدعاءات الدوال المستقبلية تؤدّي العمل حتى الحالات الأساس</li>
<li>«طرق تسجيل score بقيمة x» تعني أنك كان بإمكانك أن تسجّل:
<ul>
<li>score بقيمة (x-1)</li>
<li>أو</li>
<li>score بقيمة (x-2)</li>
<li>أو</li>
<li>score بقيمة (x-3)</li>
</ul>
</li>
<li>إن سجّلتَ score بقيمة x-1 يمكنك ببساطة إضافة 1 إليه لتصنع score بقيمة x.</li>
<li>إن سجّلتَ score بقيمة x-2 يمكنك ببساطة إضافة 2 إليه لتصنع score بقيمة x.</li>
<li>إن سجّلتَ score بقيمة x-3 يمكنك ببساطة إضافة 3 إليه لتصنع score بقيمة x.</li>
</ul>
<h2 id="الشريحة-12-رؤية-عالية-المستوى-high-level-view-لـ-scorecount">الشريحة 12: رؤية عالية المستوى (HIGH-LEVEL VIEW) لـ score_count</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">score_count</span>(<span class="hljs-params">x</span>):
    <span class="hljs-keyword">if</span> x == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">elif</span> x == <span class="hljs-number">2</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>
    <span class="hljs-keyword">elif</span> x == <span class="hljs-number">3</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> score_count(x-<span class="hljs-number">1</span>)+score_count(x-<span class="hljs-number">2</span>)+score_count(x-<span class="hljs-number">3</span>)
</code></pre>
<p>شجرة الاستدعاءات عند <code>score(6)</code>:</p>
<ul>
<li><code>score(6)</code>
<ul>
<li><code>score(5)</code>
<ul>
<li><code>score(4)</code>
<ul>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><code>score(4)</code>
<ul>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><code>score(5)</code>
<ul>
<li><code>score(4)</code>
<ul>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><code>score(4)</code>
<ul>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
<li><code>score(3)</code>
<ul>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
<li><code>score(2)</code>
<ul>
<li><code>score(1)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-13-مجموع-عناصر-القائمة-sum-of-list-elements">الشريحة 13: مجموع عناصر القائمة (SUM of LIST ELEMENTS)</h2>
<p>فاصل: ننتقل الآن من الأعداد إلى القوائم.</p>
<h2 id="الشريحة-14-القوائم-عودية-بطبيعتها-lists-are-naturally-recursive">الشريحة 14: القوائم عودية بطبيعتها (LISTS ARE NATURALLY RECURSIVE)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_iter</span>(<span class="hljs-params">L</span>):
    result = <span class="hljs-number">0</span>

    <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> L:
        result += e
    <span class="hljs-keyword">return</span> result

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_iter(test))
</code></pre>
<h2 id="الشريحة-15-تمثيل-القوائم-على-أنها-عودية-visualizing-lists-as-recursive-ابدأ">الشريحة 15: تمثيل القوائم على أنها عودية (VISUALIZING LISTS as RECURSIVE) — ابدأ</h2>
<p>القائمة الأصلية:</p>
<pre><code class="language-text">[10, 20, 30, 40, 50, 60]
</code></pre>
<ul>
<li>اُعثر على مجموع هذه القائمة الأصلية (Find sum of this original list)</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشرائح من 15 إلى 29 تبني الفكرة نفسها خطوةً خطوة: تُزال القيمة الأولى من القائمة في كل شريحة، ثم يُكتب «الحلّ هو <code>L[0]</code> + مجموع القائمة الجديدة». الأسهم والأقواس في الرسم الأصلي لا يمكن استرجاعها من طبقة النص، لذا نُصّ على ما تعنيه كل شريحة بصياغتنا، ولم يُخمَّن شيء.</p>
</blockquote>
<h2 id="الشريحة-16-تمثيل-القوائم-على-أنها-عودية-القيمة-الأولى">الشريحة 16: تمثيل القوائم على أنها عودية — القيمة الأولى</h2>
<p>القائمة بعد إزالة أول عنصر: <code>[20, 30, 40, 50, 60]</code></p>
<ul>
<li><code>L[0]</code> + مجموع القائمة الجديدة</li>
</ul>
<h2 id="الشريحة-17-تمثيل-القوائم-على-أنها-عودية-المسألة-نفسها-بشكل-أصغر">الشريحة 17: تمثيل القوائم على أنها عودية — المسألة نفسها بشكل أصغر</h2>
<p>القائمة: <code>[20, 30, 40, 50, 60]</code></p>
<ul>
<li>حُلَّت المسألة نفسها، بشكل مختلف قليلًا (طولها أصغر) (Solve the same problem, slightly changed (its length is smaller))</li>
</ul>
<h2 id="الشريحة-18-تمثيل-القوائم-على-أنها-عودية-القيمة-الأولى">الشريحة 18: تمثيل القوائم على أنها عودية — القيمة الأولى</h2>
<p>القائمة بعد إزالة أول عنصر: <code>[30, 40, 50, 60]</code></p>
<ul>
<li><code>L[0]</code> + مجموع القائمة الجديدة</li>
</ul>
<h2 id="الشريحة-19-تمثيل-القوائم-على-أنها-عودية-المسألة-نفسها-مرة-أخرى">الشريحة 19: تمثيل القوائم على أنها عودية — المسألة نفسها مرة أخرى</h2>
<p>القائمة: <code>[30, 40, 50, 60]</code></p>
<ul>
<li>حُلَّت المسألة نفسها مرة أخرى، بشكل مختلف قليلًا (Solve the same problem again, slightly changed)</li>
</ul>
<h2 id="الشريحة-20-تمثيل-القوائم-على-أنها-عودية-القيمة-الأولى">الشريحة 20: تمثيل القوائم على أنها عودية — القيمة الأولى</h2>
<p>القائمة بعد إزالة أول عنصر: <code>[40, 50, 60]</code></p>
<ul>
<li><code>L[0]</code> + مجموع القائمة الجديدة</li>
</ul>
<h2 id="الشريحة-21-تمثيل-القوائم-على-أنها-عودية-أيضا">الشريحة 21: تمثيل القوائم على أنها عودية — أيضًا</h2>
<p>القائمة: <code>[40, 50, 60]</code></p>
<ul>
<li>نواصل التكرار، متناقصين حتى حالة الأساس (Keep repeating, decreasing until a base case)</li>
</ul>
<h2 id="الشريحة-22-تمثيل-القوائم-على-أنها-عودية-أيضا">الشريحة 22: تمثيل القوائم على أنها عودية — أيضًا</h2>
<p>القائمة: <code>[50, 60]</code></p>
<ul>
<li>نواصل التكرار، متناقصين حتى حالة الأساس (Keep repeating, decreasing until a base case)</li>
</ul>
<h2 id="الشريحة-23-تمثيل-القوائم-على-أنها-عودية-حالة-الأساس">الشريحة 23: تمثيل القوائم على أنها عودية — حالة الأساس</h2>
<p>القائمة: <code>[60]</code></p>
<ul>
<li>حالة الأساس (The base case)</li>
</ul>
<h2 id="الشريحة-24-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع">الشريحة 24: تمثيل القوائم على أنها عودية — إرجاع المجموع</h2>
<ul>
<li>نُمرِّر المجموع عائدًا إلى أعلى السلسلة (Pass the sum back up the chain)</li>
</ul>
<h2 id="الشريحة-25-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع">الشريحة 25: تمثيل القوائم على أنها عودية — إرجاع المجموع</h2>
<ul>
<li>نُمرِّر المجموع عائدًا إلى أعلى السلسلة</li>
</ul>
<h2 id="الشريحة-26-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع">الشريحة 26: تمثيل القوائم على أنها عودية — إرجاع المجموع</h2>
<ul>
<li>نُمرِّر المجموع عائدًا إلى أعلى السلسلة</li>
</ul>
<h2 id="الشريحة-27-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع">الشريحة 27: تمثيل القوائم على أنها عودية — إرجاع المجموع</h2>
<ul>
<li>نُمرِّر المجموع عائدًا إلى أعلى السلسلة</li>
</ul>
<h2 id="الشريحة-28-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع">الشريحة 28: تمثيل القوائم على أنها عودية — إرجاع المجموع</h2>
<ul>
<li>نُمرِّر المجموع عائدًا إلى أعلى السلسلة</li>
</ul>
<h2 id="الشريحة-29-تمثيل-القوائم-على-أنها-عودية-إرجاع-المجموع">الشريحة 29: تمثيل القوائم على أنها عودية — إرجاع المجموع</h2>
<ul>
<li>نُمرِّر المجموع عائدًا إلى أعلى السلسلة</li>
</ul>
<h2 id="الشريحة-30-مجموع-عناصر-القائمة-القطع-sum-of-list-elements-the-pieces">الشريحة 30: مجموع عناصر القائمة: القطع (SUM of LIST ELEMENTS: the PIECES)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case</span>
    <span class="hljs-keyword">if</span>
    <span class="hljs-keyword">else</span>:
    <span class="hljs-comment"># Recursive step</span>

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_recur(test))
</code></pre>
<ul>
<li>حالة الأساس (Base case)</li>
<li>الخطوة العودية (Recursive step)</li>
</ul>
<h2 id="الشريحة-31-مجموع-عناصر-القائمة-حالة-الأساس-خيار-واحد">الشريحة 31: مجموع عناصر القائمة: حالة الأساس (خيار واحد)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case</span>
    <span class="hljs-comment"># What is the base case?</span>
    <span class="hljs-keyword">if</span> L == []:
        <span class="hljs-comment"># One option:</span>
        <span class="hljs-comment"># An empty list has sum 0</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Recursive step</span>

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_recur(test))
</code></pre>
<ul>
<li>ما هي حالة الأساس؟ (What is the base case?)</li>
<li>خيار واحد: قائمة فارغة مجموعها 0</li>
</ul>
<h2 id="الشريحة-32-مجموع-عناصر-القائمة-حالة-الأساس-خيار-آخر">الشريحة 32: مجموع عناصر القائمة: حالة الأساس (خيار آخر)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case</span>
    <span class="hljs-comment"># What is the base case?</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-comment"># Another option:</span>
        <span class="hljs-comment"># A list with one element has a sum of that one element</span>
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Recursive step</span>

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_recur(test))
</code></pre>
<ul>
<li>ما هي حالة الأساس؟</li>
<li>خيار آخر: القائمة ذات العنصر الواحد مجموعها هو ذلك العنصر وحده</li>
<li>مثال: <code>L = [50]</code></li>
<li>تُعيد: <code>50</code></li>
</ul>
<h2 id="الشريحة-33-مجموع-عناصر-القائمة-الخطوة-العودية">الشريحة 33: مجموع عناصر القائمة: الخطوة العودية</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># What is the recursive step?</span>
    <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-comment"># Need to get to the base case somehow</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] + <span class="hljs-comment"># something</span>
    <span class="hljs-comment"># Let&#x27;s look at elements one at a time</span>
    <span class="hljs-comment"># Extract the first one and grab its value</span>
    <span class="hljs-comment"># For example:</span>
    <span class="hljs-comment"># L = [30,40,50]</span>
    <span class="hljs-comment"># Returns: 30 + &lt;something&gt;</span>

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_recur(test))
</code></pre>
<ul>
<li>ما هي الخطوة العودية؟</li>
<li>يجب أن نصل إلى حالة الأساس بطريقة ما</li>
<li>لننظر إلى العناصر واحدًا تلو الآخر</li>
<li>استخرج الأول وخذ قيمته</li>
<li>مثال: <code>L = [30, 40, 50]</code></li>
<li>تُعيد: <code>30 + &lt;something&gt;</code></li>
</ul>
<h2 id="الشريحة-34-مجموع-عناصر-القائمة-الخطوة-العودية-ستنتهي-في-النهاية">الشريحة 34: مجموع عناصر القائمة: الخطوة العودية ستنتهي في النهاية</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># What is the recursive step?</span>
    <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-comment"># The function call finds the sum of the remaining list elements</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] + total_recur(L[<span class="hljs-number">1</span>:])
    <span class="hljs-comment"># For example:</span>
    <span class="hljs-comment"># L = [30,40,50]</span>
    <span class="hljs-comment"># Returns: 30 + total_recur([40,50])</span>

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_recur(test))
</code></pre>
<ul>
<li>استدعاء الدالة يجد مجموع عناصر القائمة المتبقّية</li>
</ul>
<h2 id="الشريحة-35-مجموع-عناصر-القائمة-الخلاصات-رابط-python-tutor">الشريحة 35: مجموع عناصر القائمة: الخلاصات — رابط PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Notice:</span>
    <span class="hljs-comment"># Every case in the function returns something that is the same type</span>
    <span class="hljs-comment"># Base case returns an int</span>
    <span class="hljs-comment"># Recursive step returns an int</span>
    <span class="hljs-comment"># We need to trust that the recursive calls eventually do the right thing</span>
    <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] + total_recur(L[<span class="hljs-number">1</span>:])

test = [<span class="hljs-number">30</span>, <span class="hljs-number">40</span>, <span class="hljs-number">50</span>]
<span class="hljs-built_in">print</span>(total_recur(test))
</code></pre>
<ul>
<li>لاحظ:
<ul>
<li>كل حالة في الدالة تُعيد شيئًا من النوع نفسه</li>
<li>حالة الأساس تُعيد <code>int</code></li>
<li>الخطوة العودية تُعيد <code>int</code></li>
</ul>
</li>
<li>يجب أن نثق بأن الاستدعاءات العودية ستؤدّي في النهاية العمل الصحيح</li>
</ul>
<h2 id="الشريحة-36-جرب-بنفسك-you-try-it">الشريحة 36: جرّب بنفسك (YOU TRY IT!)</h2>
<ul>
<li>عدّل الشيفرة التي كتبناها لتُعيد الطول الكلي لكل السلاسل النصّية (strings) داخل <code>L</code>:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">total_len_recur</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> _______
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> __________________

test = [<span class="hljs-string">&quot;ab&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>, <span class="hljs-string">&quot;defgh&quot;</span>]
<span class="hljs-built_in">print</span>(total_recur(test))

<span class="hljs-comment"># prints 8</span>
</code></pre>
<h2 id="الشريحة-37-البحث-عن-عنصر-في-قائمة-looking-for-an-element-in-a-list">الشريحة 37: البحث عن عنصر في قائمة (LOOKING for an ELEMENT in a LIST)</h2>
<p>فاصل: ننتقل الآن من «المجموع» إلى «البحث».</p>
<h2 id="الشريحة-38-مثال-آخر-هل-العنصر-موجود-في-القائمة-انتبه-لهذه-النسخة">الشريحة 38: مثال آخر: هل العنصر موجود في القائمة؟ (انتبه لهذه النسخة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">in_list</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-comment"># Base case is when we have one element</span>
    <span class="hljs-comment"># Check if it&#x27;s the one we are looking for</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] == e
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Recursive step looks at the remaining elements</span>
        <span class="hljs-comment"># Grab the list from index 1 onward and look for e in it</span>
        <span class="hljs-keyword">return</span> in_list(L[<span class="hljs-number">1</span>:], e)
</code></pre>
<ul>
<li>لنبدأ باتباع النمط نفسه كما في المثال السابق</li>
<li>حالة الأساس هي عندما يكون لدينا عنصر واحد</li>
<li>تحقّق ممّا إذا كان هو العنصر الذي نبحث عنه</li>
<li>الخطوة العودية تنظر إلى العناصر المتبقّية</li>
<li>خذ القائمة من المؤشر 1 فما بعد وابحث عن <code>e</code> فيها</li>
</ul>
<h2 id="الشريحة-39-مثال-آخر-هل-العنصر-موجود-في-القائمة-جربها-python-tutor">الشريحة 39: مثال آخر: هل العنصر موجود في القائمة؟ (جرّبها) — PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">in_list</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] == e
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> in_list(L[<span class="hljs-number">1</span>:], e)

test = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">8</span>,<span class="hljs-number">1</span>]
<span class="hljs-built_in">print</span>(in_list(test, <span class="hljs-number">1</span>))
</code></pre>
<ul>
<li>جرّبها</li>
<li><code>test = [2,5,8,1]</code> و <code>e=1</code> تعطي <code>True</code> — حسنًا</li>
<li><code>test = [2,1,5,8]</code> و <code>e=1</code> تعطي <code>False</code> — ليست صحيحة!</li>
<li>هي تتحقّق فقط ممّا إذا كان العنصر الأخير هو العنصر الذي نبحث عنه!</li>
</ul>
<h2 id="الشريحة-40-مثال-آخر-هل-العنصر-موجود-في-القائمة-أصلح-النسخة">الشريحة 40: مثال آخر: هل العنصر موجود في القائمة؟ (أصلح النسخة)</h2>
<p>ملاحظتان على النسخة السابقة:</p>
<ul>
<li>ما زلنا نريد النظر إلى العناصر واحدًا تلو الآخر</li>
<li>يجب أن نتحقّق عند كل استدعاء للدالة ممّا إذا كان العنصر الذي استخرجناه هو العنصر الذي نبحث عنه</li>
</ul>
<h2 id="الشريحة-41-مثال-آخر-هل-العنصر-موجود-في-القائمة-أصلح-النسخة">الشريحة 41: مثال آخر: هل العنصر موجود في القائمة؟ (أصلح النسخة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">in_list</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] == e
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Check the first element before looking in the rest</span>
        <span class="hljs-keyword">if</span> L[<span class="hljs-number">0</span>] == e:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> in_list(L[<span class="hljs-number">1</span>:], e)
</code></pre>
<ul>
<li>ما زلنا نريد النظر إلى العناصر واحدًا تلو الآخر</li>
<li>أضِف التحقّق في الخطوة العودية، قبل النظر في بقيّة القائمة</li>
</ul>
<h2 id="الشريحة-42-مثال-آخر-هل-العنصر-موجود-في-القائمة-اختبر-النسخة-python-tutor">الشريحة 42: مثال آخر: هل العنصر موجود في القائمة؟ (اختبر النسخة) — PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">in_list</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-comment"># Test it now</span>
    <span class="hljs-comment"># test = [2,5,8,1] and e=1 gives True -- ok</span>
    <span class="hljs-comment"># test = [2,1,5,8] and e=1 gives True -- ok</span>
    <span class="hljs-comment"># test = [2,5,8] and e=1 gives False -- ok</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] == e
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">if</span> L[<span class="hljs-number">0</span>] == e:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> in_list(L[<span class="hljs-number">1</span>:], e)
</code></pre>
<ul>
<li>اختبرها الآن</li>
<li><code>test = [2,5,8,1]</code> و <code>e=1</code> تعطي <code>True</code> — حسنًا</li>
<li><code>test = [2,1,5,8]</code> و <code>e=1</code> تعطي <code>True</code> — حسنًا</li>
<li><code>test = [2,5,8]</code> و <code>e=1</code> تعطي <code>False</code> — حسنًا</li>
</ul>
<h2 id="الشريحة-43-مثال-آخر-هل-العنصر-موجود-في-القائمة-حسن-النسخة">الشريحة 43: مثال آخر: هل العنصر موجود في القائمة؟ (حسِّن النسخة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">in_list</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-comment"># Add case when L is empty</span>
    <span class="hljs-comment"># Simplify the code to check the first element as another base case</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
    <span class="hljs-keyword">elif</span> L[<span class="hljs-number">0</span>] == e:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> in_list(L[<span class="hljs-number">1</span>:], e)
</code></pre>
<ul>
<li>حالتان تُعيدان <code>L[0]</code> (Two cases that return L[0])</li>
<li>أضِف حالة عندما تكون <code>L</code> فارغة</li>
<li>بسِّط الشيفرة لتفحص العنصر الأول كحالة أساس أخرى</li>
</ul>
<h2 id="الشريحة-44-الفكرة-الكبرى-big-idea">الشريحة 44: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>كل حالة (حالات الأساس، الخطوة العودية) يجب أن تُعيد <strong>النوع نفسه</strong> من الكائن.</li>
<li>تذكّر أن قيم <code>return</code> للدوال تُبنى فوق بعضها!</li>
<li>إذا أعادت حالة الأساس قيمة <code>bool</code> وأعادت الخطوة العودية قيمة <code>int</code>، فإن هذا يُنتج <strong>خطأ عدم تطابق في النوع</strong> (type mismatch error) وقت التشغيل.</li>
</ul>
<h2 id="الشريحة-45-تسطيح-flatten-قائمة-تحتوي-مستوى-واحدا-فقط-من-عناصر-القوائم">الشريحة 45: تسطيح (FLATTEN) قائمة تحتوي مستوى واحدًا فقط من عناصر القوائم</h2>
<p>فاصل: ننتقل الآن إلى القوائم التي عناصرها قوائم.</p>
<h2 id="الشريحة-46-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة">الشريحة 46: تسطيح قائمة تحتوي قوائم من أعداد صحيحة</h2>
<p>مثال: <code>[[1, 2],[3, 4],[9, 8, 7]]</code> تعطي <code>[1, 2, 3, 4, 9, 8, 7]</code></p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">flatten</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case</span>
    <span class="hljs-comment"># There is only one element in L</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">else</span>:
    <span class="hljs-comment"># For example: [[2,3,4]]</span>
</code></pre>
<ul>
<li>حالة الأساس</li>
<li>لا يوجد سوى عنصر واحد في <code>L</code></li>
<li>مثال: <code>[[2,3,4]]</code></li>
</ul>
<h2 id="الشريحة-47-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة">الشريحة 47: تسطيح قائمة تحتوي قوائم من أعداد صحيحة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">flatten</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-comment"># Return that element</span>
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">else</span>:

<span class="hljs-comment"># For example: [[2,3,4]]</span>
<span class="hljs-comment"># Returns: [2,3,4]</span>
</code></pre>
<ul>
<li>حالة الأساس</li>
<li>تُعيد ذلك العنصر</li>
<li>تُعيد: <code>[2,3,4]</code></li>
</ul>
<h2 id="الشريحة-48-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة">الشريحة 48: تسطيح قائمة تحتوي قوائم من أعداد صحيحة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">flatten</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] + <span class="hljs-comment">#something</span>
</code></pre>
<ul>
<li>الخطوة العودية</li>
<li>تذكّر أن <code>+</code> بين قائمتين يُلحق عناصرهما في قائمة جديدة</li>
<li>اصنع قائمة جديدة تحتوي العنصر الأول و…</li>
</ul>
<h2 id="الشريحة-49-تسطيح-قائمة-تحتوي-قوائم-من-أعداد-صحيحة-رابط-python-tutor">الشريحة 49: تسطيح قائمة تحتوي قوائم من أعداد صحيحة — رابط PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">flatten</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> L[<span class="hljs-number">0</span>] + flatten(L[<span class="hljs-number">1</span>:])
</code></pre>
<ul>
<li>الخطوة العودية</li>
<li>… تُسطّح بقيّة القائمة المتبقّية</li>
<li>مثال: <code>[[1,2],[3,4],[9,8,7]]</code></li>
<li>تُعيد: <code>[1,2] + flatten([[3,4], [9,8,7]])</code></li>
</ul>
<h2 id="الشريحة-50-جرب-بنفسك-you-try-it">الشريحة 50: جرّب بنفسك (YOU TRY IT!)</h2>
<ul>
<li>اكتب دالة عودية وفق المواصفات التالية.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">in_list_of_lists</span>(<span class="hljs-params">L, e</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L is a list whose elements are lists containing ints.
    Returns True if e is an element within the lists of L
    and False otherwise.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># your code here</span>

test = [[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>], [<span class="hljs-number">3</span>,<span class="hljs-number">4</span>], [<span class="hljs-number">5</span>,<span class="hljs-number">6</span>,<span class="hljs-number">7</span>]]

<span class="hljs-built_in">print</span>(in_list_of_lists(test, <span class="hljs-number">0</span>))

<span class="hljs-comment"># prints False</span>

<span class="hljs-built_in">print</span>(in_list_of_lists(test, <span class="hljs-number">3</span>))

<span class="hljs-comment"># prints True</span>
</code></pre>
<h2 id="الشريحة-51-متى-نستخدم-الاستدعاء-الذاتي-when-to-use-recursion">الشريحة 51: متى نستخدم الاستدعاء الذاتي (WHEN to USE RECURSION)</h2>
<ul>
<li>إلى الآن ينبغي أن تكون لديك حدس ما عن كيفية كتابة دوال عودية</li>
<li>المشكلة أنّك إلى الآن كنت تكتب النسخة العودية من دوال عادةً ما يكون تنفيذها <strong>أسهل بدون استدعاء ذاتي</strong> :(</li>
<li>إذًا لماذا نتعلّم الاستدعاء الذاتي؟</li>
<li>بعض المسائل صعبة جدًّا في الحل بالتكرار (iteration)</li>
</ul>
<h2 id="الشريحة-52-حدس-متى-نستخدم-الاستدعاء-الذاتي-intuition-for-when-to-use-recursion">الشريحة 52: حدس متى نستخدم الاستدعاء الذاتي (INTUITION for WHEN to use RECURSION)</h2>
<ul>
<li>تذكّر حين تعلّمنا حلقات <code>while</code>؟</li>
<li>تذكّر حين حاولنا كتابة برنامج يواصل سؤال المستخدم عن أي طريق يختار في «الغابات المفقودة» (the Lost Woods of Zelda)؟</li>
<li>لم نكن نعرف مسبقًا كم مرّة نحتاج أن نكرّر الحلقة! (أي كم مستوى من <code>if/else</code> نحتاج)</li>
<li>حلقات <code>while</code> كانت تكرّر ما دام شرط ما يبقى صادقًا.</li>
</ul>
<pre><code class="language-text">if &lt;exit right&gt;:
    &lt;set background to woods_background&gt;
    if &lt;exit right&gt;:
        &lt;set background to woods_background&gt;
        if &lt;exit right&gt;:
            &lt;set background to woods_background&gt;
            ...
        else:
            &lt;set background to exit_background&gt;
    else:
        &lt;set background to exit_background&gt;
else:
    &lt;set background to exit_background&gt;
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> في أسفل هذه الشريحة في الأصل إشعار حقوق: «© Nintendo. All rights reserved. This content is excluded from our Creative Commons license. For more information, see https://ocw.mit.edu/help/faq-fair-use/». هذه المادة من طرف ثالث غير مشمولة برخصة CC، لذلك حُذف الرسم المرتبط بها ولم يُنشر، واقتصرت الترجمة على النص أعلاه.</p>
</blockquote>
<h2 id="الشريحة-53-حدس-متى-نستخدم-الاستدعاء-الذاتي-مثال-آخر">الشريحة 53: حدس متى نستخدم الاستدعاء الذاتي (مثال آخر)</h2>
<ul>
<li>في أمثلة الاستدعاء الذاتي على القوائم حتى الآن، كنّا نعرف كم مستوى نحتاج أن نكرّر فيه.
<ul>
<li>إمّا النظر إلى العناصر مباشرةً أو النظر إليها في مستوى واحد أعمق</li>
</ul>
</li>
<li>لكنّ القوائم قد تحتوي عناصر هي قوائم، والتي قد تحتوي بدورها عناصر هي قوائم، والتي قد تحتوي بدورها عناصر هي قوائم، وهكذا.</li>
<li>كيف يمكننا استخدام التكرار (iteration) لإجراء هذه الفحوص؟ هذا صعب.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(i) == <span class="hljs-built_in">list</span>:
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> i:
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(j) == <span class="hljs-built_in">list</span>:
                <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> j:
                    <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(k) == <span class="hljs-built_in">list</span>:
                        <span class="hljs-comment"># and so on and on</span>
                        ...
                    <span class="hljs-keyword">else</span>:
                        <span class="hljs-comment"># do what you need to do</span>
            <span class="hljs-keyword">else</span>:
                <span class="hljs-comment"># do what you need to do</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># do what you need to do</span>
<span class="hljs-comment"># done with the loop over L and all its elements</span>
</code></pre>
<h2 id="الشريحة-54-مسائل-عودية-بطبيعتها-problems-that-are-naturally-recursive">الشريحة 54: مسائل عودية بطبيعتها (PROBLEMS that are NATURALLY RECURSIVE)</h2>
<ul>
<li>نظام الملفات (A file system)</li>
<li>ترتيب العمليات في آلة حاسبة (Order of operations in a calculator)</li>
<li>طاقم سكوبي-doo يبحث في قلعة مسكونة (Scooby Doo gang searching a haunted castle)</li>
<li>البيروقراطية (Bureaucracy)</li>
</ul>
<h2 id="الشريحة-55-لنر-كيف-ننتقل-من-مستوى-واحد-إلى-مستويات-كثيرة-بشكل-عودي">الشريحة 55: لنرَ كيف ننتقل من مستوى واحد إلى مستويات كثيرة (بشكل عودي)</h2>
<ul>
<li>مثال: عكس عناصر قائمة (reverse a list's elements)</li>
<li>كيف نقسّم المسألة إلى نسخة أصغر من المسألة نفسها؟</li>
</ul>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[1, 2, 3, 4]
</code></pre>
<h2 id="الشريحة-56-نفس-السؤال-القائمة-بعد-الإزالة-الأولى">الشريحة 56: نفس السؤال — القائمة بعد الإزالة الأولى</h2>
<pre><code class="language-text">[2, 3, 4, 1]
</code></pre>
<ul>
<li>مثال: عكس عناصر قائمة</li>
<li>كيف نقسّم المسألة إلى نسخة أصغر من المسألة نفسها؟</li>
</ul>
<h2 id="الشريحة-57-نفس-السؤال">الشريحة 57: نفس السؤال</h2>
<pre><code class="language-text">[2, 3, 4, 1]
</code></pre>
<h2 id="الشريحة-58-نفس-السؤال">الشريحة 58: نفس السؤال</h2>
<pre><code class="language-text">[3, 4, 2, 1]
</code></pre>
<h2 id="الشريحة-59-نفس-السؤال">الشريحة 59: نفس السؤال</h2>
<pre><code class="language-text">[3, 4, 2, 1]
</code></pre>
<h2 id="الشريحة-60-نفس-السؤال">الشريحة 60: نفس السؤال</h2>
<pre><code class="language-text">[4, 3, 2, 1]
</code></pre>
<h2 id="الشريحة-61-نفس-السؤال">الشريحة 61: نفس السؤال</h2>
<pre><code class="language-text">[4, 3, 2, 1]
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشرائح من 55 إلى 61 تكرّر السؤال نفسه («كيف نقسّم المسألة إلى نسخة أصغر؟») بينما تُظهر القائمة في حالة مختلفة، ولا يمكن استرجاع الأسهم أو الأرقام الترتيبية من طبقة النص؛ لذلك نُصّ على محتواها النصّي فقط.</p>
</blockquote>
<h2 id="الشريحة-62-عكس-قائمة-عناصر-المستوى-الأعلى-فقط-top-level-only">الشريحة 62: عكس قائمة عناصر: المستوى الأعلى فقط (TOP-LEVEL ONLY)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
    <span class="hljs-keyword">else</span>:
</code></pre>
<ul>
<li>حالة الأساس (Base case)</li>
</ul>
<h2 id="الشريحة-63-عكس-قائمة-عناصر-المستوى-الأعلى-فقط">الشريحة 63: عكس قائمة عناصر: المستوى الأعلى فقط</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case</span>
    <span class="hljs-comment"># Reversing a list with one element is just that list.</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L
    <span class="hljs-keyword">else</span>:
</code></pre>
<ul>
<li>حالة الأساس</li>
<li>عكس قائمة ذات عنصر واحد هو تلك القائمة نفسها.</li>
</ul>
<h2 id="الشريحة-64-عكس-قائمة-عناصر-المستوى-الأعلى-فقط">الشريحة 64: عكس قائمة عناصر: المستوى الأعلى فقط</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> &lt;something&gt; + [L[<span class="hljs-number">0</span>]]
</code></pre>
<ul>
<li>الخطوة العودية (Recursive step)</li>
<li>انقل العنصر عند المؤشر 0 إلى النهاية.</li>
<li>هذا يُكافئ إلحاق ذلك العنصر بشيء ما</li>
<li>مثال: <code>[10,20,30,40]</code></li>
<li>تُعيد: <code>&lt;something&gt; + [10]</code></li>
</ul>
<h2 id="الشريحة-65-عكس-قائمة-عناصر-المستوى-الأعلى-فقط">الشريحة 65: عكس قائمة عناصر: المستوى الأعلى فقط</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> my_rev(L[<span class="hljs-number">1</span>:]) + [L[<span class="hljs-number">0</span>]]
</code></pre>
<ul>
<li>الخطوة العودية</li>
<li>حُلَّت المسألة نفسها، لكن على القائمة التي تحتوي كل العناصر ما عدا الأول</li>
<li>مثال: <code>[10,20,30,40]</code></li>
<li>تُعيد: <code>my_rev([20,30,40]) + [10]</code></li>
</ul>
<h2 id="الشريحة-66-عكس-قائمة-عناصر-المستوى-الأعلى-فقط-رابط-python-tutor">الشريحة 66: عكس قائمة عناصر: المستوى الأعلى فقط — رابط PYTHON TUTOR</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">my_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> L
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> my_rev(L[<span class="hljs-number">1</span>:]) + [L[<span class="hljs-number">0</span>]]

test = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-string">&quot;abc&quot;</span>]
<span class="hljs-built_in">print</span>(my_rev(test))
<span class="hljs-comment"># prints [&#x27;abc&#x27;, 2, 1]</span>

test = [<span class="hljs-number">1</span>,[<span class="hljs-string">&#x27;d&#x27;</span>],[<span class="hljs-string">&#x27;e&#x27;</span>,[<span class="hljs-string">&#x27;f&#x27;</span>, <span class="hljs-string">&#x27;g&#x27;</span>]]]
<span class="hljs-built_in">print</span>(my_rev(test))
<span class="hljs-comment"># prints this, notice it just reverses top-level elems</span>
<span class="hljs-comment"># [[&#x27;e&#x27;, [&#x27;f&#x27;, &#x27;g&#x27;]], [&#x27;d&#x27;], 1]</span>
</code></pre>
<ul>
<li>اختبرها</li>
</ul>
<h2 id="الشريحة-67-كل-العناصر-تعكس-all-elements-get-reversed">الشريحة 67: كل العناصر تُعكس (ALL ELEMENTS GET REVERSED)</h2>
<ul>
<li>مثال: عكس كل العناصر في كل القوائم الفرعية</li>
<li>يجب أن نعرف ممّا إذا كان لدينا عنصر أم قائمة</li>
</ul>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[1, 2], [3, 4], [[5,6], [7,8]]]
</code></pre>
<ul>
<li>العناصر (غير القوائم) تُوضع في النهاية، والقوائم تُعكس بذاتها</li>
</ul>
<h2 id="الشريحة-68-كل-العناصر-تعكس">الشريحة 68: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[1,2], [3, 4], [[5,6], [7,8]]]
</code></pre>
<ul>
<li>إن كانت قائمة، …</li>
</ul>
<h2 id="الشريحة-69-كل-العناصر-تعكس">الشريحة 69: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[2,1], [3, 4], [[5,6], [7,8]]]
</code></pre>
<ul>
<li>إن كانت قائمة، …</li>
</ul>
<h2 id="الشريحة-70-كل-العناصر-تعكس">الشريحة 70: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[2,1], 3, 4, [[5,6], [7,8]]]
</code></pre>
<ul>
<li>إن لم تكن قائمة …</li>
</ul>
<h2 id="الشريحة-71-كل-العناصر-تعكس">الشريحة 71: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[2,1], 3, 4, [[5,6], [7,8]]]
</code></pre>
<ul>
<li>وهكذا.</li>
</ul>
<h2 id="الشريحة-72-كل-العناصر-تعكس">الشريحة 72: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[2,1], 3, 4, [[7,8], [5,6]]]
</code></pre>
<ul>
<li>القوائم داخل القوائم تُعكس كل واحدة منها</li>
</ul>
<h2 id="الشريحة-73-كل-العناصر-تعكس">الشريحة 73: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[2,1], 3, 4, [[7,8], [6,5]]]
</code></pre>
<ul>
<li>القوائم داخل القوائم تُعكس كل واحدة منها</li>
</ul>
<h2 id="الشريحة-74-كل-العناصر-تعكس">الشريحة 74: كل العناصر تُعكس</h2>
<p>القائمة في هذه الشريحة:</p>
<pre><code class="language-text">[[2,1], 3, 4, [[8,7], [6,5]]]
</code></pre>
<ul>
<li>القوائم داخل القوائم تُعكس كل واحدة منها</li>
</ul>
<h2 id="الشريحة-75-عكس-قائمة-عناصر-كل-العناصر-تعكس">الشريحة 75: عكس قائمة عناصر: كل العناصر تُعكس</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Base case is NOT the same</span>
    <span class="hljs-comment"># A single element can either be a</span>
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
    <span class="hljs-comment"># Non-list:</span>
    <span class="hljs-comment"># do something</span>
    <span class="hljs-keyword">else</span>:
    <span class="hljs-comment"># List:</span>
    <span class="hljs-comment"># do something</span>
</code></pre>
<ul>
<li>حالة الأساس <strong>ليست</strong> نفسها</li>
<li>العنصر الواحد قد يكون إمّا</li>
</ul>
<h2 id="الشريحة-76-عكس-قائمة-عناصر-كل-العناصر-تعكس">الشريحة 76: عكس قائمة عناصر: كل العناصر تُعكس</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-comment"># Non-list: it&#x27;s just the list itself, like before</span>
            <span class="hljs-keyword">return</span> L
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># List:</span>
            <span class="hljs-keyword">return</span> L
</code></pre>
<ul>
<li>حالة الأساس ليست نفسها</li>
<li>العنصر الواحد قد يكون إمّا</li>
<li>غير قائمة: إنها القائمة نفسها، كما في السابق</li>
<li>قائمة: لا بدّ من عكسها!</li>
</ul>
<h2 id="الشريحة-77-عكس-قائمة-عناصر-كل-العناصر-تعكس">الشريحة 77: عكس قائمة عناصر: كل العناصر تُعكس</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">return</span> L
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> [deep_rev(L[<span class="hljs-number">0</span>])]
</code></pre>
<ul>
<li>حالة الأساس ليست نفسها</li>
<li>العنصر الواحد قد يكون إمّا</li>
<li>غير قائمة: إنها القائمة نفسها، كما في السابق</li>
<li>قائمة: لا بدّ من عكسها!</li>
</ul>
<h2 id="الشريحة-78-عكس-قائمة-عناصر-كل-العناصر-تعكس">الشريحة 78: عكس قائمة عناصر: كل العناصر تُعكس</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">return</span> L
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> [deep_rev(L[<span class="hljs-number">0</span>])]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Recursive step</span>
        <span class="hljs-comment"># Extract the first element. It can either be a</span>
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-comment"># do something</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># do something</span>
</code></pre>
<ul>
<li>الخطوة العودية</li>
<li>استخرج العنصر الأول. قد يكون إمّا</li>
</ul>
<h2 id="الشريحة-79-عكس-قائمة-عناصر-كل-العناصر-تعكس">الشريحة 79: عكس قائمة عناصر: كل العناصر تُعكس</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">return</span> L
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> [deep_rev(L[<span class="hljs-number">0</span>])]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Non-list: reverse the remaining elements and</span>
        <span class="hljs-comment"># concatenate the result with the first element</span>
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">return</span> deep_rev(L[<span class="hljs-number">1</span>:]) + [L[<span class="hljs-number">0</span>]]
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># do something</span>
</code></pre>
<ul>
<li>الخطوة العودية</li>
<li>استخرج العنصر الأول. قد يكون إمّا</li>
<li>غير قائمة: اعكس العناصر المتبقّية وألحق الناتج بالعنصر الأول</li>
<li>قائمة:</li>
</ul>
<h2 id="الشريحة-80-عكس-قائمة-عناصر-كل-العناصر-تعكس">الشريحة 80: عكس قائمة عناصر: كل العناصر تُعكس</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(L) == <span class="hljs-number">1</span>:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">return</span> L
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> [deep_rev(L[<span class="hljs-number">0</span>])]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-comment"># Non-list: reverse the remaining elements and</span>
        <span class="hljs-comment"># concatenate the result with the first element</span>
        <span class="hljs-comment"># List: reverse the remaining elements and concatenate</span>
        <span class="hljs-comment"># the result with the first element reversed (it&#x27;s a list! too)</span>
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">return</span> deep_rev(L[<span class="hljs-number">1</span>:]) + [L[<span class="hljs-number">0</span>]]
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> deep_rev(L[<span class="hljs-number">1</span>:]) + [deep_rev(L[<span class="hljs-number">0</span>])]
</code></pre>
<ul>
<li>الخطوة العودية</li>
<li>استخرج العنصر الأول. قد يكون إمّا</li>
<li>غير قائمة: اعكس العناصر المتبقّية وألحق الناتج بالعنصر الأول</li>
<li>قائمة: اعكس العناصر المتبقّية وألحق الناتج بالعنصر الأول <strong>معكوسًا</strong> (إنه قائمة أيضًا!)</li>
</ul>
<h2 id="الشريحة-81-عكس-قائمة-عناصر-كل-العناصر-تعكس-الشيفرة-المنظفة-cleaned-up-code">الشريحة 81: عكس قائمة عناصر: كل العناصر تُعكس — الشيفرة المنظّفة (CLEANED UP CODE)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deep_rev</span>(<span class="hljs-params">L</span>):
    <span class="hljs-comment"># Extract out the empty list</span>
    <span class="hljs-keyword">if</span> L == []:
        <span class="hljs-keyword">return</span> []
    <span class="hljs-keyword">elif</span> <span class="hljs-built_in">type</span>(L[<span class="hljs-number">0</span>]) != <span class="hljs-built_in">list</span>:
        <span class="hljs-keyword">return</span> deep_rev(L[<span class="hljs-number">1</span>:]) + [L[<span class="hljs-number">0</span>]]
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> deep_rev(L[<span class="hljs-number">1</span>:]) + [deep_rev(L[<span class="hljs-number">0</span>])]
</code></pre>
<ul>
<li>استخرج حالة القائمة الفارغة</li>
<li>استخرج <code>L[0]</code></li>
</ul>
<h2 id="الشريحة-82-الفكرة-الكبرى-big-idea">الشريحة 82: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>إجراء الاستدعاء الذاتي في هذه المحاضرة يمكن تطبيقه على <strong>أي تسلسل مرتَّب قابل للفهرسة</strong> (any indexable ordered sequence).</li>
<li>الفكرة نفسها ستنجح في مسائل تتضمّن سلاسل نصّية (strings).</li>
<li>الفكرة نفسها ستنجح في مسائل تتضمّن صفوفًا (tuples).</li>
</ul>
<h2 id="الشريحة-83-أهم-الخلاصات-حول-الاستدعاء-الذاتي-major-recursion-takeaways">الشريحة 83: أهم الخلاصات حول الاستدعاء الذاتي (MAJOR RECURSION TAKEAWAYS)</h2>
<ul>
<li>معظم المسائل تُحلّ بشكل حدسيّ أكثر بالتكرار (iteration)</li>
<li>نُظهر الاستدعاء الذاتي على هذه المسائل من أجل:
<ul>
<li>أن نُريك طريقة تفكير أخرى في المسألة نفسها (الخوارزمية (Algorithm))</li>
<li>أن نُريك كيف تكتب دالة عودية (البرمجة (Programming))</li>
</ul>
</li>
<li>بعض المسائل لها حلول أجمل بالاستدعاء الذاتي</li>
<li>إن تعرّفت على حلّ المسألة نفسها مرارًا، فاستخدم الاستدعاء الذاتي (Recursion)</li>
</ul>
<p><strong>نصائح (Tips)</strong></p>
<ul>
<li>كل حالة في دالتك العودية يجب أن تُعيد <strong>النوع نفسه</strong> من الشيء؛ مثلًا: لا تجعل حالة الأساس تُعيد <code>[]</code> بينما الخطوة العودية تُعيد <code>len(L[0])+recur(L[1:])</code></li>
<li>لا يلزم أن تكون دالتك كفؤة من المحاولة الأولى (Your function doesn't have to be efficient on the first pass)</li>
<li>من المقبول أن يكون لديك أكثر من حالة أساس واحدة (It's ok to have more than 1 base case)</li>
<li>من المقبول أن تقسّم المسألة إلى كثير من <code>if</code>/<code>elif</code> (It's ok to break down the problem into many if/elifs)</li>
<li>ما دام أنك تتقدّم عوديًا نحو حالة أساس</li>
</ul>
<h2 id="الشريحة-84-جرب-بنفسك-you-try-it">الشريحة 84: جرّب بنفسك (YOU TRY IT!)</h2>
<ul>
<li>أضفتُ أسئلة تدريب كثيرة على الاستدعاء الذاتي في ملف <code>.py</code> المرتبط بهذه المحاضرة، للتحضير للاختبار القصير (quiz).</li>
<li>
<ol>
<li>تمرين لتنفيذ دالة عودية (من غير قوائم داخل قوائم إلخ)</li>
</ol>
</li>
<li>
<ol start="2">
<li>تمرين لتنفيذ دالة عودية (بقوائم داخل قوائم داخل قوائم إلخ)</li>
</ol>
</li>
<li>
<ol start="3">
<li>ثلاثة تطبيقات عودية فيها أخطاء لإصلاحها (Three buggy recursion implementations to fix).</li>
</ol>
</li>
</ul>
<h2 id="الشريحة-85-mit-opencourseware">الشريحة 85: MIT OpenCourseWare</h2>
<ul>
<li><a href="https://ocw.mit.edu">https://ocw.mit.edu</a></li>
<li>6.100L Introduction to Computer Science and Programming Using Python — Fall 2022</li>
<li>للاستعلام عن كيفية الاستشهاد بهذه المواد أو شروط الاستخدام، راجع: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a></li>
</ul>
`,i={book:s,chapter:n,chapterTitle:l,slug:a,title:e,headings:p,html:t};export{s as book,n as chapter,l as chapterTitle,i as default,p as headings,t as html,a as slug,e as title};
