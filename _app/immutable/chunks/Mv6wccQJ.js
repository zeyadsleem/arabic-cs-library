const s="mit-6100l",a="lecture-26",n="المحاضرة 26: الوصول إلى عناصر القائمة، والتجزئة، والمحاكاة، والختام",t="notes",e="المحاضرة 26: الوصول إلى عناصر القائمة، والتجزئة (Hashing)، والمحاكاة، والختام",l=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-الوصول-إلى-عناصر-القائمة-والتجزئة-والمحاكاة-والختام",text:"الشريحة 1: الوصول إلى عناصر القائمة، والتجزئة، والمحاكاة، والختام!"},{depth:2,id:"الشريحة-2-اليوم",text:"الشريحة 2: اليوم"},{depth:2,id:"الشريحة-3-القوائم",text:"الشريحة 3: القوائم"},{depth:2,id:"الشريحة-4-تعقيد-بعض-عمليات-python",text:"الشريحة 4: تعقيد بعض عمليات Python"},{depth:2,id:"الشريحة-5-الوصول-إلى-عنصر-القائمة-في-زمن-ثابت",text:"الشريحة 5: الوصول إلى عنصر القائمة في زمن ثابت"},{depth:2,id:"الشريحة-6-الوصول-إلى-عنصر-القائمة-في-زمن-ثابت-قائمة-غير-متجانسة",text:"الشريحة 6: الوصول إلى عنصر القائمة في زمن ثابت (قائمة غير متجانسة)"},{depth:2,id:"الشريحة-7-تنفيذ-ساذج-naive-للقاموس",text:"الشريحة 7: تنفيذ ساذج (naive) للقاموس"},{depth:2,id:"الشريحة-8-تعقيد-بعض-عمليات-python-القوائم-والقواميس",text:"الشريحة 8: تعقيد بعض عمليات Python (القوائم والقواميس)"},{depth:2,id:"الشريحة-9-التجزئة-hashing",text:"الشريحة 9: التجزئة (Hashing)"},{depth:2,id:"الشريحة-10-تنفيذ-القواميس",text:"الشريحة 10: تنفيذ القواميس"},{depth:2,id:"الشريحة-11-الاستعلام-عن-دالة-التجزئة",text:"الشريحة 11: الاستعلام عن دالة التجزئة"},{depth:2,id:"الشريحة-12-جدول-التجزئة",text:"الشريحة 12: جدول التجزئة"},{depth:2,id:"الشريحة-13-الأسماء-إلى-الفهارس",text:"الشريحة 13: الأسماء إلى الفهارس"},{depth:2,id:"الشريحة-14-فكرة-أفضل-نسمح-بالتصادم-collisions",text:"الشريحة 14: فكرة أفضل: نسمح بالتصادم (Collisions)"},{depth:2,id:"الشريحة-15-دالة-التجزئة",text:"الشريحة 15: دالة التجزئة"},{depth:2,id:"الشريحة-16-خصائص-دالة-التجزئة-الجيدة",text:"الشريحة 16: خصائص دالة التجزئة الجيّدة"},{depth:2,id:"الشريحة-17-دالة-التجزئة-مع-اسم-إضافي",text:"الشريحة 17: دالة التجزئة (مع اسم إضافي)"},{depth:2,id:"الشريحة-18-دالة-التجزئة-تغير-الاسم",text:"الشريحة 18: دالة التجزئة (تغيّر الاسم)"},{depth:2,id:"الشريحة-19-تعقيد-بعض-عمليات-python-القواميس",text:"الشريحة 19: تعقيد بعض عمليات Python (القواميس)"},{depth:2,id:"الشريحة-20-المحاكاة-simulations",text:"الشريحة 20: المحاكاة (Simulations)"},{depth:2,id:"الشريحة-21-موضوع-مفيد-للميادين-الكثيرة",text:"الشريحة 21: موضوع مفيد للميادين الكثيرة"},{depth:2,id:"الشريحة-22-رمي-حجر-النرد",text:"الشريحة 22: رمي حجر النرد"},{depth:2,id:"الشريحة-23-شيفرة-المحاكاة",text:"الشريحة 23: شيفرة المحاكاة"},{depth:2,id:"الشريحة-24-تلك-محاكاة-سهلة",text:"الشريحة 24: تلك محاكاة سهلة"},{depth:2,id:"الشريحة-25-سؤال-جديد-ليس-سهلا-حسابيا",text:"الشريحة 25: سؤال جديد ليس سهلًا حسابيًا"},{depth:2,id:"الشريحة-26-تعديل-سهل-على-شيفرة-موجودة",text:"الشريحة 26: تعديل سهل على شيفرة موجودة"},{depth:2,id:"الشريحة-27-سؤال-من-العالم-الحقيقي",text:"الشريحة 27: سؤال من العالم الحقيقي"},{depth:2,id:"الشريحة-28-شيفرة-ملء-الحوض",text:"الشريحة 28: شيفرة ملء الحوض"},{depth:2,id:"الشريحة-29-رسم-معدلات-الملء-العشوائية-والزمن-المقابل-لملء-الحوض",text:"الشريحة 29: رسم معدلات الملء العشوائية والزمن المقابل لملء الحوض"},{depth:2,id:"الشريحة-30-رسم-معدلات-الملء-العشوائية-والزمن-المقابل-لملء-الحوض-مرتبة",text:"الشريحة 30: رسم معدلات الملء العشوائية والزمن المقابل لملء الحوض (مرتّبة)"},{depth:2,id:"الشريحة-31-النتائج",text:"الشريحة 31: النتائج"},{depth:2,id:"الشريحة-32-ختام-6100l",text:"الشريحة 32: ختام 6.100L"},{depth:2,id:"الشريحة-33-ماذا-تعلمت",text:"الشريحة 33: ماذا تعلّمت؟"},{depth:2,id:"الشريحة-34-تجربتك",text:"الشريحة 34: تجربتك"},{depth:2,id:"الشريحة-35-ما-التالي",text:"الشريحة 35: ما التالي"},{depth:2,id:"الشريحة-36-ما-التالي",text:"الشريحة 36: ما التالي"},{depth:2,id:"الشريحة-37-ما-التالي",text:"الشريحة 37: ما التالي"},{depth:2,id:"الشريحة-38-ما-التالي",text:"الشريحة 38: ما التالي"},{depth:2,id:"الشريحة-39-من-السهل-أن-تنسى-دون-ممارسة",text:"الشريحة 39: من السهل أن تنسى دون ممارسة!"},{depth:2,id:"الشريحة-40-mit-opencourseware",text:"الشريحة 40: MIT OpenCourseWare"}],p=`<h1>المحاضرة 26: الوصول إلى عناصر القائمة، والتجزئة (Hashing)، والمحاكاة، والختام</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة على MIT OpenCourseWare: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-26-list-access-hashing-simulations-and-wrap-up/</li>
<li>ملف الشرائح (صفحة الوصف): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec26_pdf/</li>
<li>ملف الشرائح (PDF مباشر): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec26.pdf</li>
<li>ملف الشيفرة: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec26_code_zip/</li>
<li>تفريغ المحاضرة على MIT OpenCourseWare (بالإنجليزية): https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec26/</li>
<li>الترخيص: CC BY-NC-SA 4.0 — https://creativecommons.org/licenses/by-nc-sa/4.0/</li>
<li>شروط الاستخدام في MIT OpenCourseWare: https://ocw.mit.edu/terms/</li>
</ul>
<p><strong>منهج الترجمة:</strong> نُقلت هذه المحاضرة ترجمةً عربية كاملة أمينة لمحتوى ملف الشرائح الأصلي في MIT OpenCourseWare، تحت رخصة CC BY-NC-SA 4.0 التي تسمح بإعادة التوزيع مع الإبقاء على الإسناد والتأهيل والإشارة إلى التغيير، وبشرط أن يكون الاستخدام غير تجاري وأن تُوزَّع كل ترجمة مشتقّة تحت الرخصة نفسها. أُبقيت الشيفرة وأسماء دوال <code>random</code> و <code>plt</code> كما هي بالإنجليزية. ولكل شريحة من الشرائح الأربعين عنوانها الخاص. في الشرائح 13 و15 و17 و18 رسم مخطّطات الذاكرة، ونُقلت أرقام الحسابات كما هي في النصّ المستخرَج مع جداول توضّح مواقع كل مفتاح.</p>
<h2 id="الشريحة-1-الوصول-إلى-عناصر-القائمة-والتجزئة-والمحاكاة-والختام">الشريحة 1: الوصول إلى عناصر القائمة، والتجزئة، والمحاكاة، والختام!</h2>
<p>يُرفق ملف الشرائح وملفات <code>.py</code> للمتابعة الجانبيًا.</p>
<h2 id="الشريحة-2-اليوم">الشريحة 2: اليوم</h2>
<ul>
<li>القوائم (Lists) بعض الشيء.</li>
<li>التجزئة (Hashing).</li>
<li>المحاكاة (Simulations).</li>
</ul>
<h2 id="الشريحة-3-القوائم">الشريحة 3: القوائم</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-4-تعقيد-بعض-عمليات-python">الشريحة 4: تعقيد بعض عمليات Python</h2>
<p><strong>القوائم: حيث <code>n</code> هو <code>len(L)</code></strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>access</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>store</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>length</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>append</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>==</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>delete</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>copy</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>reverse</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>iteration</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>in list</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-5-الوصول-إلى-عنصر-القائمة-في-زمن-ثابت">الشريحة 5: الوصول إلى عنصر القائمة في زمن ثابت</h2>
<p>رسم يوضّح قائمة <code>[1234, …, 5295]</code> في الذاكرة: مواقع ذاكرة متتالية، واسم القائمة يشير إلى موقع الذاكرة الأول، والقيمة الفعلية (<code>actual value</code>) هي <code>5295</code> في الموقع الأخير.</p>
<ul>
<li>إذا كانت القائمة كلها أعداد صحيحة، وطولها <code>len(L)</code>:
<ul>
<li>خصّص <code>4*len(L)</code> بايت.</li>
<li>خزّن القيم مباشرة.</li>
<li>مجموعة متتالية من مواقع الذاكرة.</li>
</ul>
</li>
<li>يشير اسم القائمة إلى موقع الذاكرة الأول.</li>
<li>للوصول إلى العنصر رقم <code>i</code>:
<ul>
<li>أضف <code>32*i</code> إلى الموقع الأول.</li>
<li>استدعِ ذلك الموقع في الذاكرة.</li>
</ul>
</li>
<li>تعقيد زمن ثابت (constant time complexity).</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الرسم في الشريحة يبيّن القيمة <code>5295</code> في آخر موقع والمربّعات المتتالية قبلها؛ وخطوط الربط بين المواقع لا تنجو من طبقة النصّ المستخرَجة.</p>
</blockquote>
<h2 id="الشريحة-6-الوصول-إلى-عنصر-القائمة-في-زمن-ثابت-قائمة-غير-متجانسة">الشريحة 6: الوصول إلى عنصر القائمة في زمن ثابت (قائمة غير متجانسة)</h2>
<ul>
<li>إذا كانت القائمة غير متجانسة (heterogeneous):
<ul>
<li>لا يمكن تخزين القيم مباشرة (فلا تتّسع كلها في 32 بت).</li>
<li>استخدمالإشارة غير المباشرة (indirection) للإشارة إلى كائنات أخرى.</li>
<li>خزّن مؤشرات (pointers) إلى القيم (لا القيمة نفسها).</li>
<li>ما زلنا نستخدم مجموعة متتالية من مواقع الذاكرة.</li>
<li>ما زلنا نخصّص <code>4*len(L)</code> بايت.</li>
<li>ما زلنا نضيف <code>32*i</code> إلى الموقع الأول، و <code>+1</code> للوصول إلى ذلك الموقع في الذاكرة.</li>
<li>وما زال التعقيد ثابت الزمن.</li>
</ul>
</li>
</ul>
<p>الرسم يوضّح: <strong>مؤشر إلى قائمة</strong> (pointer to a list)، والقيمة المخزَّنة هي <strong>مؤشر إلى الكائن الفعلي في الذاكرة</strong> (value stored is pointer to actual object in memory)، والقيمة <code>5295</code>.</p>
<h2 id="الشريحة-7-تنفيذ-ساذج-naive-للقاموس">الشريحة 7: تنفيذ ساذج (naive) للقاموس</h2>
<ul>
<li>استخدم قائمة من الأزواج: مفتاح، قيمة:</li>
</ul>
<pre><code class="language-python">[[<span class="hljs-string">&#x27;Ana&#x27;</span>, <span class="hljs-literal">True</span>], [<span class="hljs-string">&#x27;John&#x27;</span>, <span class="hljs-literal">False</span>], [<span class="hljs-string">&#x27;Eric&#x27;</span>, <span class="hljs-literal">False</span>], [<span class="hljs-string">&#x27;Sam&#x27;</span>, <span class="hljs-literal">False</span>]]
</code></pre>
<ul>
<li>ما التعقيد الزمني للفهرسة في هذا القاموس الساذج؟
<ul>
<li>لا نعرف ترتيب المدخلات.</li>
<li>علينا إجراء بحث خطّي للعثور على المدخل.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-8-تعقيد-بعض-عمليات-python-القوائم-والقواميس">الشريحة 8: تعقيد بعض عمليات Python (القوائم والقواميس)</h2>
<p><strong>القوائم: حيث <code>n</code> هو <code>len(L)</code></strong></p>
<table>
<thead>
<tr>
<th>العملية</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>access</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>store</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>length</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>append</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>==</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>delete</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>copy</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>reverse</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>iteration</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>in list</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p><strong>القواميس: حيث <code>n</code> هو <code>len(d)</code></strong></p>
<table>
<thead>
<tr>
<th>الحالة</th>
<th>العملية</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td>أسوأ حالة (نادرة جدًّا)</td>
<td><code>length</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>access</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>store</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>delete</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>iteration</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>الحالة المتوسطة</td>
<td><code>access</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>store</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>delete</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>in</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>iteration</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-9-التجزئة-hashing">الشريحة 9: التجزئة (Hashing)</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-10-تنفيذ-القواميس">الشريحة 10: تنفيذ القواميس</h2>
<ul>
<li>يستخدم جدول تجزئة (hash table).</li>
<li>كيف يفعل ذلك:
<ul>
<li><strong>تحويل المفتاح إلى عدد صحيح</strong>، باستخدام دالة تجزئة (hash function).</li>
<li><strong>استخدام ذلك العدد الصحيح كفهرس</strong> في قائمة.</li>
<li>هذا يتم في زمن ثابت.</li>
<li><strong>العثور على القيمة المرتبطة بالمفتاح</strong> يتم في زمن ثابت.</li>
</ul>
</li>
<li>البحث في القاموس له تعقيد زمن ثابت، إذا:
<ul>
<li>كانت دالة التجزئة سريعة بما يكفي.</li>
<li>وكان الفهرسة في القائمة ثابتة الزمن.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-11-الاستعلام-عن-دالة-التجزئة">الشريحة 11: الاستعلام عن دالة التجزئة</h2>
<p>لمجرد كشف ما يجري تحت الكبوت، إليك الدالة <code>hash()</code>.</p>
<h2 id="الشريحة-12-جدول-التجزئة">الشريحة 12: جدول التجزئة</h2>
<ul>
<li>ما الحجم المناسب لجدول التجزئة؟</li>
<li>لتفادي أن تتجزأ مفاتيح كثيرة إلى القيمة نفسها، اجعل كل مفتاح يتجزأ إلى قيمة منفصلة.</li>
<li>إذا كنّا نجزّئ نصوصًا (strings):
<ul>
<li>مثّل كل محرف بشيفرة ثنائية (binary code).</li>
<li>ألصق البتات معًا، وحوّلها إلى عدد صحيح.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-13-الأسماء-إلى-الفهارس">الشريحة 13: الأسماء إلى الفهارس</h2>
<p>مثال: <code>'Ana Bell'</code></p>
<pre><code class="language-text">= 01000001 01101110 01100001 00100000 01000010 01100101 01101100 01101100
= 4,714,812,651,084,278,892
</code></pre>
<ul>
<li><strong>الميزة:</strong> أسماء فريدة تُقابل فهارس فريدة.</li>
<li><strong>العيب:</strong> غير كفّئ للمساحة إلى حدّ بعيد (VERY space inefficient).</li>
<li>فكّر في جدول يحتوي على نحو 4000 طالب جامعي في MIT:
<ul>
<li>نفترض أن أطول اسم 20 محرفًا.</li>
<li>كل محرف 8 بتات، أي 160 بت لكل اسم.</li>
<li>كم مدخلًا سيحتويه الجدول؟</li>
</ul>
</li>
</ul>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mn>2</mn><mn>160</mn></msup><mo>=</mo><mn>1</mn><mo separator="true">,</mo><mn>461</mn><mo separator="true">,</mo><mn>501</mn><mo separator="true">,</mo><mn>637</mn><mo separator="true">,</mo><mn>330</mn><mo separator="true">,</mo><mn>902</mn><mo separator="true">,</mo><mn>918</mn><mo separator="true">,</mo><mn>203</mn><mo separator="true">,</mo><mn>684</mn><mo separator="true">,</mo><mn>832</mn><mo separator="true">,</mo><mn>716</mn><mo separator="true">,</mo><mn>283</mn><mo separator="true">,</mo><mn>019</mn><mo separator="true">,</mo><mn>655</mn><mo separator="true">,</mo><mn>932</mn><mo separator="true">,</mo><mn>542</mn><mo separator="true">,</mo><mn>976</mn></mrow><annotation encoding="application/x-tex">2^{160} = 1,461,501,637,330,902,918,203,684,832,716,283,019,655,932,542,976</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8641em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">160</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">461</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">501</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">637</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">330</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">902</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">918</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">203</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">684</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">832</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">716</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">283</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">019</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">655</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">932</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">542</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">976</span></span></span></span></span>
<h2 id="الشريحة-14-فكرة-أفضل-نسمح-بالتصادم-collisions">الشريحة 14: فكرة أفضل: نسمح بالتصادم (Collisions)</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-15-دالة-التجزئة">الشريحة 15: دالة التجزئة</h2>
<p>دالة التجزئة:</p>
<ol>
<li>اجمع قيم الحروف.</li>
<li>خذ الباقي عند القسمة على 16 (لتملأ جدول تجزئة بـ 16 مدخلًا).</li>
</ol>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>جمع قيم الحروف</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Ana</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn><mo>+</mo><mn>14</mn><mo>+</mo><mn>1</mn><mo>=</mo><mn>16</mn></mrow><annotation encoding="application/x-tex">1 + 14 + 1 = 16</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">14</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">16</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>16</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">16 \\% 16 = 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">16%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td><code>Eric</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>5</mn><mo>+</mo><mn>18</mn><mo>+</mo><mn>9</mn><mo>+</mo><mn>3</mn><mo>=</mo><mn>35</mn></mrow><annotation encoding="application/x-tex">5 + 18 + 9 + 3 = 35</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">18</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">9</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">35</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>35</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">35 \\% 16 = 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">35%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></td>
</tr>
<tr>
<td><code>John</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>10</mn><mo>+</mo><mn>15</mn><mo>+</mo><mn>8</mn><mo>+</mo><mn>14</mn><mo>=</mo><mn>47</mn></mrow><annotation encoding="application/x-tex">10 + 15 + 8 + 14 = 47</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">10</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">15</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">8</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">14</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">47</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>47</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>15</mn></mrow><annotation encoding="application/x-tex">47 \\% 16 = 15</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">47%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">15</span></span></span></span></td>
</tr>
<tr>
<td><code>Eve</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>5</mn><mo>+</mo><mn>22</mn><mo>+</mo><mn>5</mn><mo>=</mo><mn>32</mn></mrow><annotation encoding="application/x-tex">5 + 22 + 5 = 32</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">22</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">32</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>32</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">32 \\% 16 = 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">32%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
</tbody>
</table>
<p><strong>جدول التجزئة (مثل القائمة):</strong></p>
<table>
<thead>
<tr>
<th>الفهرس</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td><code>C</code></td>
</tr>
<tr>
<td>1</td>
<td></td>
</tr>
<tr>
<td>2</td>
<td></td>
</tr>
<tr>
<td>3</td>
<td><code>A</code></td>
</tr>
<tr>
<td>4</td>
<td></td>
</tr>
<tr>
<td>5</td>
<td></td>
</tr>
<tr>
<td>6</td>
<td></td>
</tr>
<tr>
<td>7</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td></td>
</tr>
<tr>
<td>10</td>
<td></td>
</tr>
<tr>
<td>11</td>
<td></td>
</tr>
<tr>
<td>12</td>
<td></td>
</tr>
<tr>
<td>13</td>
<td></td>
</tr>
<tr>
<td>14</td>
<td></td>
</tr>
<tr>
<td>15</td>
<td><code>B</code></td>
</tr>
</tbody>
</table>
<p>أماكن المفاتيح: <code>Ana: C</code>، <code>Eric: A</code>، <code>John: B</code>، <code>Eve: B</code></p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> القيمة الأولى في العمود الأيسر من جدول الشريحة تُلخّص بالحرف <code>C</code> في الموقع صفر، والجدول أعلاه مبنيّ على الأرقام المحسوبة (0، 3، 15، 0) وهو مطابق لما يظهر في الشريحة.</p>
</blockquote>
<h2 id="الشريحة-16-خصائص-دالة-التجزئة-الجيدة">الشريحة 16: خصائص دالة التجزئة الجيّدة</h2>
<ul>
<li>تُسقط مجال اهتمامك (domain of interest) على أعداد صحيحة بين 0 وحجم جدول التجزئة.</li>
<li>قيمة التجزئة تحدّدها القيمة المُجزَّأة تمامًا (لا شيء عشوائي).</li>
<li>دالة التجزئة تستخدم كامل المدخل المُجزَّأ.</li>
<li><strong>تصادمات أقلّ</strong> (Fewer collisions).</li>
<li>توزيع القيم منتظم (uniform)، أي احتمال landing على أيّ مدخل في جدول التجزئة متساوٍ.</li>
<li><strong>تذكير جانبي:</strong> يجب أن تكون مفاتيح القاموس قابلة للتجزئة (hashable)، أي <strong>غير قابلة للتغيير</strong> (immutable)، وأن تتجزّأ دائمًا إلى القيمة نفسها.</li>
<li>ماذا يحدث إن لم تكن قابلة للتجزئة؟</li>
</ul>
<h2 id="الشريحة-17-دالة-التجزئة-مع-اسم-إضافي">الشريحة 17: دالة التجزئة (مع اسم إضافي)</h2>
<p>دالة التجزئة:</p>
<ol>
<li>اجمع قيم الحروف.</li>
<li>خذ الباقي عند القسمة على 16 (لتملأ كتلة ذاكرة بـ 16 مدخلًا).</li>
</ol>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>جمع قيم الحروف</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Ana</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn><mo>+</mo><mn>14</mn><mo>+</mo><mn>1</mn><mo>=</mo><mn>16</mn></mrow><annotation encoding="application/x-tex">1 + 14 + 1 = 16</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">14</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">16</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>16</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">16 \\% 16 = 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">16%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td><code>Eric</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>5</mn><mo>+</mo><mn>18</mn><mo>+</mo><mn>9</mn><mo>+</mo><mn>3</mn><mo>=</mo><mn>35</mn></mrow><annotation encoding="application/x-tex">5 + 18 + 9 + 3 = 35</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">18</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">9</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">35</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>35</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">35 \\% 16 = 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">35%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></td>
</tr>
<tr>
<td><code>John</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>10</mn><mo>+</mo><mn>15</mn><mo>+</mo><mn>8</mn><mo>+</mo><mn>14</mn><mo>=</mo><mn>47</mn></mrow><annotation encoding="application/x-tex">10 + 15 + 8 + 14 = 47</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">10</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">15</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">8</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">14</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">47</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>47</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>15</mn></mrow><annotation encoding="application/x-tex">47 \\% 16 = 15</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">47%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">15</span></span></span></span></td>
</tr>
<tr>
<td><code>Eve</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>5</mn><mo>+</mo><mn>22</mn><mo>+</mo><mn>5</mn><mo>=</mo><mn>32</mn></mrow><annotation encoding="application/x-tex">5 + 22 + 5 = 32</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">22</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">32</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>32</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">32 \\% 16 = 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">32%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td><code>[K, a, t, e]</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>11</mn><mo>+</mo><mn>1</mn><mo>+</mo><mn>20</mn><mo>+</mo><mn>5</mn><mo>=</mo><mn>37</mn></mrow><annotation encoding="application/x-tex">11 + 1 + 20 + 5 = 37</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">11</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">20</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">37</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>37</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>5</mn></mrow><annotation encoding="application/x-tex">37 \\% 16 = 5</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">37%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span></span></span></span></td>
</tr>
</tbody>
</table>
<p><strong>جدول التجزئة:</strong></p>
<table>
<thead>
<tr>
<th>الفهرس</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td><code>C</code></td>
</tr>
<tr>
<td>1</td>
<td></td>
</tr>
<tr>
<td>2</td>
<td></td>
</tr>
<tr>
<td>3</td>
<td><code>A</code></td>
</tr>
<tr>
<td>4</td>
<td></td>
</tr>
<tr>
<td>5</td>
<td><code>B</code></td>
</tr>
<tr>
<td>6</td>
<td></td>
</tr>
<tr>
<td>7</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td></td>
</tr>
<tr>
<td>10</td>
<td></td>
</tr>
<tr>
<td>11</td>
<td></td>
</tr>
<tr>
<td>12</td>
<td></td>
</tr>
<tr>
<td>13</td>
<td></td>
</tr>
<tr>
<td>14</td>
<td></td>
</tr>
<tr>
<td>15</td>
<td><code>B</code></td>
</tr>
</tbody>
</table>
<p>أماكن المفاتيح: <code>Ana: C</code>، <code>Eric: A</code>، <code>[K,a,t,e]: B</code>، <code>John: B</code>، <code>Eve: B</code></p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> أرقام الجدول أعلاه مشتقّة من عمود «النتيجة» أعلاه (0، 3، 15، 0، 5)، وهي مطابقة لمواقع الحروف كما في الشريحة.</p>
</blockquote>
<h2 id="الشريحة-18-دالة-التجزئة-تغير-الاسم">الشريحة 18: دالة التجزئة (تغيّر الاسم)</h2>
<p>تغيّرت Kate اسمها إلى Cate. الشخص نفسه، والاسم مختلف. هل تبحث عن درجتها؟</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>جمع قيم الحروف</th>
<th>النتيجة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>[C, a, t, e]</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>3</mn><mo>+</mo><mn>1</mn><mo>+</mo><mn>20</mn><mo>+</mo><mn>5</mn><mo>=</mo><mn>29</mn></mrow><annotation encoding="application/x-tex">3 + 1 + 20 + 5 = 29</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">3</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">20</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">5</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">29</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>29</mn><mi mathvariant="normal">%</mi><mn>16</mn><mo>=</mo><mn>13</mn></mrow><annotation encoding="application/x-tex">29 \\% 16 = 13</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8056em;vertical-align:-0.0556em;"></span><span class="mord">29%16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">13</span></span></span></span></td>
</tr>
</tbody>
</table>
<p><strong>جدول التجزئة:</strong></p>
<table>
<thead>
<tr>
<th>الفهرس</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td><code>C</code></td>
</tr>
<tr>
<td>1</td>
<td></td>
</tr>
<tr>
<td>2</td>
<td></td>
</tr>
<tr>
<td>3</td>
<td><code>A</code></td>
</tr>
<tr>
<td>4</td>
<td></td>
</tr>
<tr>
<td>5</td>
<td><code>B</code></td>
</tr>
<tr>
<td>6</td>
<td></td>
</tr>
<tr>
<td>7</td>
<td></td>
</tr>
<tr>
<td>8</td>
<td></td>
</tr>
<tr>
<td>9</td>
<td></td>
</tr>
<tr>
<td>10</td>
<td></td>
</tr>
<tr>
<td>11</td>
<td></td>
</tr>
<tr>
<td>12</td>
<td></td>
</tr>
<tr>
<td>13</td>
<td></td>
</tr>
<tr>
<td>14</td>
<td></td>
</tr>
<tr>
<td>15</td>
<td><code>B</code></td>
</tr>
</tbody>
</table>
<p>أماكن المفاتيح: <code>Ana: C</code>، <code>Eric: A</code>، <code>[K,a,t,e]: B</code>، ثم سهم يشير إلى <strong>«؟؟؟ ليس هنا!»</strong> عند <code>[C,a,t,e]</code> لأن الفهرس 13 فارغ، و <code>John: B</code>، <code>Eve: B</code>.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> هذا هو مثال «التصادم» في الخاتمة: شخص واحد له اسمان مختلفان، في situación-site مختلفين في الجدول. لم يُضَف أيّ استنتاج من عندي خارج ما صُرّح به في الشريحة.</p>
</blockquote>
<h2 id="الشريحة-19-تعقيد-بعض-عمليات-python-القواميس">الشريحة 19: تعقيد بعض عمليات Python (القواميس)</h2>
<p><strong>القواميس: حيث <code>n</code> هو <code>len(d)</code></strong></p>
<table>
<thead>
<tr>
<th>الحالة</th>
<th>العملية</th>
<th>التعقيد</th>
</tr>
</thead>
<tbody>
<tr>
<td>أسوأ حالة (نادرة جدًّا)</td>
<td><code>length</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>access</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>store</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>delete</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>iteration</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>الحالة المتوسطة</td>
<td><code>access</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>store</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>delete</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>in</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>iteration</code></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\theta(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-20-المحاكاة-simulations">الشريحة 20: المحاكاة (Simulations)</h2>
<p>شريحة فاصلة.</p>
<h2 id="الشريحة-21-موضوع-مفيد-للميادين-الكثيرة">الشريحة 21: موضوع مفيد للميادين الكثيرة</h2>
<ul>
<li>صف العالم حسابيًا باستخدام العشوائية.</li>
<li>موضوع مهمّ جدًّا يتّصل بالميادين الدراسية الكثيرة:
<ul>
<li>نمذجة المخاطر وتحليلها (risk modeling and analysis).</li>
<li>تبسيط النماذج المعقّدة.</li>
</ul>
</li>
<li><strong>الفكرة:</strong>
<ul>
<li>لاحظ حدثًا وتريد حساب شيء عنه.</li>
<li>باستخدام الحوسبة، صمِّم تجربة (experiment) لذلك الحدث.</li>
<li>كرِّر التجربة <code>K</code> مرّات كثيرة (أوْجِد محاكاة = simulation).</li>
<li>تتبَّع نتيجة الحدث.</li>
<li>بعد <code>K</code> تكرار، اذكر القيمة محلّ الاهتمام.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-22-رمي-حجر-النرد">الشريحة 22: رمي حجر النرد</h2>
<ul>
<li>لاحظ حدثًا وتريد حساب شيء عنه: ارمِ نردًا، فما احتمال الحصول على <code>::</code>؟ وكيف على <code>.</code>؟</li>
<li>باستخدام الحوسبة، صمِّم تجربة لذلك الحدث:
<ul>
<li>أنشئ قائمة تمثّل أوجه النرد واختر واحدة عشوائيًا:</li>
</ul>
</li>
</ul>
<pre><code class="language-python">random.choice([<span class="hljs-string">&#x27;.&#x27;</span>,<span class="hljs-string">&#x27;:&#x27;</span>,<span class="hljs-string">&#x27;:.&#x27;</span>,<span class="hljs-string">&#x27;::&#x27;</span>,<span class="hljs-string">&#x27;::.&#x27;</span>,<span class="hljs-string">&#x27;:::&#x27;</span>])
</code></pre>
<ul>
<li>كرِّر التجربة <code>K</code> مرّات كثيرة (حاكِمها!):
<ul>
<li>اختر وجه نرد عشوائيًا من قائمة، تكرارًا 10000 مرّة.</li>
<li>كيف؟ لفّ المحاكاة في حلقة!</li>
</ul>
</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>):
    roll=random.choice([<span class="hljs-string">&#x27;.&#x27;</span>,<span class="hljs-string">&#x27;:&#x27;</span>,<span class="hljs-string">&#x27;:.&#x27;</span>,<span class="hljs-string">&#x27;::&#x27;</span>,<span class="hljs-string">&#x27;::.&#x27;</span>,<span class="hljs-string">&#x27;:::&#x27;</span>])
</code></pre>
<ul>
<li>تتبَّع نتيجة الحدث:
<ul>
<li>عُدّ كم مرّة من أصل 10000 كانت الرمية يساوي <code>::</code>.</li>
</ul>
</li>
<li>بعد <code>K</code> تكرار، اذكر القيمة محلّ الاهتمام: اقسم العدد على 10000.</li>
</ul>
<h2 id="الشريحة-23-شيفرة-المحاكاة">الشريحة 23: شيفرة المحاكاة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">prob_dice</span>(<span class="hljs-params">side</span>):
    dice = [<span class="hljs-string">&#x27;.&#x27;</span>,<span class="hljs-string">&#x27;:&#x27;</span>,<span class="hljs-string">&#x27;:.&#x27;</span>,<span class="hljs-string">&#x27;::&#x27;</span>,<span class="hljs-string">&#x27;::.&#x27;</span>,<span class="hljs-string">&#x27;:::&#x27;</span>]
    Nsims = <span class="hljs-number">10000</span>
    count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(Nsims):
        roll = random.choice(dice)
        <span class="hljs-keyword">if</span> roll == side:
            count += <span class="hljs-number">1</span>
    <span class="hljs-built_in">print</span>(count/Nsims)

prob_dice(<span class="hljs-string">&#x27;.&#x27;</span>)
prob_dice(<span class="hljs-string">&#x27;::&#x27;</span>)
</code></pre>
<h2 id="الشريحة-24-تلك-محاكاة-سهلة">الشريحة 24: تلك محاكاة سهلة</h2>
<ul>
<li>يمكننا حساب احتمال رمية النرد حسابيًا (mathematically).</li>
<li>فلمَ نكتب الشيفرة؟ لأننا نستطيع الإجابة عن تنويعات السؤال الأصلي، وطرح أسئلة أصعب!</li>
<li>تعديلات صغيرة في الشيفرة.</li>
<li>سهل تغيير الشيفرة.</li>
<li>سريع في التشغيل.</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> جملة «فلمَ… الشيفرة؟» كانت تالفة في نصّ الاستخراج (ظهرت كـ«fلمَ…ida»)، وأصلحتُها إلى: «فلمَ نكتب الشيفرة؟». المعنى واضح من السياق.</p>
</blockquote>
<h2 id="الشريحة-25-سؤال-جديد-ليس-سهلا-حسابيا">الشريحة 25: سؤال جديد ليس سهلًا حسابيًا</h2>
<ul>
<li>لاحظ حدثًا وتريد حساب شيء عنه: ارمِ نردًا 7 مرّات، فما احتمال الحصول على <code>::</code> ثلاث مرّات على الأقل من أصل 7 رميات؟</li>
<li>باستخدام الحوسبة، صمِّم تجربة لذلك الحدث:
<ul>
<li>أنشئ قائمة تمثّل أوجه النرد واختر واحدة عشوائيًا 7 مرّات متتالية.</li>
<li>عدّاد الأوجه يزداد عندما تختار <code>::</code> (تتبَّع هذا العدد).</li>
</ul>
</li>
<li>كرِّر التجربة <code>K</code> مرّات كثيرة:
<ul>
<li>كرِّر الخطوة السابقة 10000 مرّة. كيف؟ لفّ المحاكاة في حلقة!</li>
</ul>
</li>
<li>تتبَّع نتيجة الحدث: عُدّ كم مرّة من أصل 10000 كان عدّاد <code>::</code> يساوي 3 أو أكثر.</li>
<li>بعد <code>K</code> تكرار، اذكر القيمة محلّ الاهتمام: اقسم عدد النتائج على 10000.</li>
</ul>
<h2 id="الشريحة-26-تعديل-سهل-على-شيفرة-موجودة">الشريحة 26: تعديل سهل على شيفرة موجودة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">prob_dice_atleast</span>(<span class="hljs-params">Nrolls, n_at_least</span>):
    dice = [<span class="hljs-string">&#x27;.&#x27;</span>,<span class="hljs-string">&#x27;:&#x27;</span>,<span class="hljs-string">&#x27;:.&#x27;</span>,<span class="hljs-string">&#x27;::&#x27;</span>,<span class="hljs-string">&#x27;::.&#x27;</span>,<span class="hljs-string">&#x27;:::&#x27;</span>]
    Nsims = <span class="hljs-number">10000</span>
    how_many_matched = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(Nsims):
        matched = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(Nrolls):
            roll = random.choice(dice)
            <span class="hljs-keyword">if</span> roll == <span class="hljs-string">&#x27;::&#x27;</span>:
                matched += <span class="hljs-number">1</span>
        how_many_matched.append(matched)
    count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> how_many_matched:
        <span class="hljs-keyword">if</span> i &gt;= n_at_least:
            count += <span class="hljs-number">1</span>
    <span class="hljs-built_in">print</span>(count/<span class="hljs-built_in">len</span>(how_many_matched))

prob_dice_atleast(<span class="hljs-number">7</span>, <span class="hljs-number">3</span>)
prob_dice_atleast(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>)
</code></pre>
<h2 id="الشريحة-27-سؤال-من-العالم-الحقيقي">الشريحة 27: سؤال من العالم الحقيقي</h2>
<p>مثال شائع جدًّا على مدى نفع المحاكاة:</p>
<ul>
<li>الماء يجري عبر حنفية بمعدل يتراوح بين 1 غالون في الدقيقة و3 غالونات في الدقيقة.</li>
<li>كم من الوقت يلزم لملء حوض سعة 600 غالون؟</li>
<li><strong>حدسك؟</strong>
<ul>
<li>ليس 300 دقيقة (600/2).</li>
<li>وليس 400 دقيقة ((600/1 + 600/3)/2).</li>
</ul>
</li>
<li><strong>في الشيفرة:</strong>
<ul>
<li>خُذ حزمة من القيم العشوائية بين 1 و3.</li>
<li>حاكِ الزمن اللازم لملء حوض 600 غالون، مستخدمًا كل قيمة عشوائية مختارة.</li>
<li>اطبع الزمن المتوسّط اللازم لملء الحوض عبر كل هذه القيم العشوائية.</li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> جملة «بمعدل… بين …» كانت تالفة في نصّ الاستخراج (ظهرت فيها كلمة إنجليزية زائدة)، وأصلحتُها إلى: «بمعدل يتراوح بين 1 غالون في الدقيقة و3 غالونات في الدقيقة». المعنى واضح من السياق.</p>
</blockquote>
<h2 id="الشريحة-28-شيفرة-ملء-الحوض">الشريحة 28: شيفرة ملء الحوض</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fill_pool</span>(<span class="hljs-params">size</span>):
    flow_rate = []
    fill_time = []
    Npoints = <span class="hljs-number">10000</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(Npoints):
        r = <span class="hljs-number">1</span>+<span class="hljs-number">2</span>*random.random()
        flow_rate.append(r)
        fill_time.append(size/r)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;avg flow_rate:&#x27;</span>, <span class="hljs-built_in">sum</span>(flow_rate)/<span class="hljs-built_in">len</span>(flow_rate))
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;avg fill_time&#x27;</span>, <span class="hljs-built_in">sum</span>(fill_time)/<span class="hljs-built_in">len</span>(fill_time))

plt.figure()
plt.scatter(<span class="hljs-built_in">range</span>(Npoints),flow_rate,s=<span class="hljs-number">1</span>)
plt.figure()
plt.scatter(<span class="hljs-built_in">range</span>(Npoints),fill_time,s=<span class="hljs-number">1</span>)

fill_pool(<span class="hljs-number">600</span>)
</code></pre>
<h2 id="الشريحة-29-رسم-معدلات-الملء-العشوائية-والزمن-المقابل-لملء-الحوض">الشريحة 29: رسم معدلات الملء العشوائية والزمن المقابل لملء الحوض</h2>
<ul>
<li>قيم عشوائية لمعدل الجريان.</li>
<li>الزمن اللازم للملء بالمعادلة <code>pool_size/rate</code>.</li>
</ul>
<h2 id="الشريحة-30-رسم-معدلات-الملء-العشوائية-والزمن-المقابل-لملء-الحوض-مرتبة">الشريحة 30: رسم معدلات الملء العشوائية والزمن المقابل لملء الحوض (مرتّبة)</h2>
<ul>
<li>قيم عشوائية لمعدل الجريان (مرتّبة sort).</li>
<li>زمن الملء (مرتّب) بالمعادلة <code>pool_size/rate</code>.</li>
</ul>
<h2 id="الشريحة-31-النتائج">الشريحة 31: النتائج</h2>
<ul>
<li>
<p><code>avg flow_rate:</code> ‎= ‎1.992586945871106 ≈ 2 غالون/دقيقة (المتوسّط للقيم العشوائية بين 1 و3).</p>
</li>
<li>
<p><code>avg fill_time</code> ‎= ‎330.6879477596955 ≈ 331 دقيقة (ليس ما توقّعناه!).</p>
</li>
<li>
<p>ليس 300 وليس 400.</p>
</li>
<li>
<p>هناك علاقة عكسية (inverse relationship) بين زمن الملء ومعدل الجريان.</p>
</li>
<li>
<p>حسابيًا كان عليك أن تعمل تكاملًا (integral).</p>
</li>
<li>
<p>حاسوبيًا تكتب بضعة أسطر من الشيفرة فقط!</p>
</li>
</ul>
<h2 id="الشريحة-32-ختام-6100l">الشريحة 32: ختام 6.100L</h2>
<p><strong>شكرًا لأنكم كنتم في هذا الصف!</strong></p>
<h2 id="الشريحة-33-ماذا-تعلمت">الشريحة 33: ماذا تعلّمت؟</h2>
<table>
<thead>
<tr>
<th>المحور</th>
<th>الموضوعات</th>
</tr>
</thead>
<tbody>
<tr>
<td>صياغة Python (Python syntax)</td>
<td></td>
</tr>
<tr>
<td>سير التنفيذ (Flow of control)</td>
<td>الحلقات، التفريع (branching)، الاستثناءات</td>
</tr>
<tr>
<td>هياكل البيانات (Data structures)</td>
<td>الصفوف (Tuples)، القوائم (Lists)، القواميس (Dictionaries)</td>
</tr>
<tr>
<td>التنظيم والتفكيك والتجريد</td>
<td>الدوال (Functions)، الأصناف (Classes)</td>
</tr>
<tr>
<td>الخوارزميات (Algorithms)</td>
<td>الثنائي / البحث بالتنصيف، التعقيد الحاسوبي، رمز ثيتا الكبير (Big Theta notation)، البحث والترتيب</td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-34-تجربتك">الشريحة 34: تجربتك</h2>
<ul>
<li>هل كنت «طبيعيًا الموهبة» (a &quot;natural&quot;)؟</li>
<li>هل انضممت إلى الصف متأخّرًا؟</li>
<li>هل اجتهدت؟</li>
</ul>
<p>انظر إلى أول مجموعة تمارين (pset) — ستبدو سهلة جدًّا الآن! لقد تعلّمت الكثير في كل الأحوال!</p>
<h2 id="الشريحة-35-ما-التالي">الشريحة 35: ما التالي</h2>
<ul>
<li><strong>6.100B</strong> — لمحة عامة عن مواضيع مثيرة في علوم الحاسوب وعلوم البيانات (Python):
<ul>
<li>مسائل التحسين (optimization problems).</li>
<li>المحاكاة (simulations).</li>
<li>البيانات التجريبية (experimental data).</li>
<li>تعلّم الآلة (machine learning).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-36-ما-التالي">الشريحة 36: ما التالي</h2>
<ul>
<li><strong>6.101</strong> — أساسيات البرمجة (Python):
<ul>
<li>تنفيذ خوارزميات فعّالة.</li>
<li>تصحيح الأخطاء (debugging).</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-37-ما-التالي">الشريحة 37: ما التالي</h2>
<ul>
<li><strong>6.102</strong> — هندسة البرمجيات (TypeScript):
<ul>
<li>كتابة شيفرة آمنة من الأخطاء، سهلة الفهم، جاهزة للتغيير.</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-38-ما-التالي">الشريحة 38: ما التالي</h2>
<ul>
<li>مقرّرات أخرى (تعلّم الآلة، الخوارزميات، إلخ).</li>
</ul>
<h2 id="الشريحة-39-من-السهل-أن-تنسى-دون-ممارسة">الشريحة 39: من السهل أن تنسى دون ممارسة!</h2>
<p><strong>برمجة سعيدة!</strong></p>
<h2 id="الشريحة-40-mit-opencourseware">الشريحة 40: MIT OpenCourseWare</h2>
<pre><code>MITOpenCourseWare
https://ocw.mit.edu

6.100L Introduction to Computer Science and Programming Using Python
Fall 2022

For information about citing these materials or our Terms of Use, visit: https://ocw.mit.edu/terms.
</code></pre>
`,m={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,m as default,l as headings,p as html,t as slug,e as title};
