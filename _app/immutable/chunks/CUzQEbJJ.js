const a="hello-algo",s="chapter_heap",n="الأكوام (Heaps)",t="exercises",e="تمارين",p=[{depth:2,id:"مراجعة-المفاهيم",text:"مراجعة المفاهيم"},{depth:3,id:"كيف-تتغير-الكومة-بعد-إدراج-العدد-10",text:"كيف تتغير الكومة بعد إدراج العدد 10؟"},{depth:3,id:"التحقق-من-علاقات-الأب-والابن-في-كومة-صغرى",text:"التحقق من علاقات الأب والابن في كومة صغرى"},{depth:3,id:"الاحتفاظ-بأكبر-ثلاثة-أعداد-باستخدام-كومة-صغرى",text:"الاحتفاظ بأكبر ثلاثة أعداد باستخدام كومة صغرى"},{depth:2,id:"تمارين-برمجية",text:"تمارين برمجية"},{depth:3,id:"إيجاد-العنصر-الأكبر-بالمرتبة-k-في-مصفوفة",text:"إيجاد العنصر الأكبر بالمرتبة k في مصفوفة"}],l=`<h2 id="مراجعة-المفاهيم">مراجعة المفاهيم</h2>
<h3 id="كيف-تتغير-الكومة-بعد-إدراج-العدد-10">كيف تتغير الكومة بعد إدراج العدد 10؟</h3>
<p>تمثّل المصفوفة <code>[9, 7, 8, 3, 5]</code> كومة عظمى. والآن أدخل العدد 10.</p>
<!-- numbered-subquestions -->
<ol>
<li>أضف 10 أولاً إلى نهاية المصفوفة. فما قيمة عقدة أبيه؟</li>
<li>بدءاً من العقدة الجديدة، نفّذ تعديل الكومة من الأسفل إلى الأعلى، واكتب المصفوفة بعد كل تبديل.</li>
<li>ما العنصر العلوي النهائي للكومة؟ وكم عدد التبديلات الإجمالي؟</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>
<p>بعد إضافة 10 يصبح فهرسه 5، ومن ثمّ فهرس أبيه
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⌊</mo><mo stretchy="false">(</mo><mn>5</mn><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi mathvariant="normal">/</mi><mn>2</mn><mo stretchy="false">⌋</mo><mo>=</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">\\lfloor(5-1)/2\\rfloor=2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⌊(</span><span class="mord">5</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mord">/2</span><span class="mclose">⌋</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span>. وقيمة عقدة الأب تساوي 8.</p>
</li>
<li>
<p>بما أن 10 أكبر من 8، تصبح المصفوفة بعد التبديل الأول <code>[9, 7, 10, 3, 5, 8]</code>.
وبما أن 10 أكبر أيضاً من أبيه 9، تصبح المصفوفة بعد التبديل الثاني <code>[10, 7, 9, 3, 5, 8]</code>.
وقد وصلت القيمة 10 الآن إلى العقدة الجذرية، فاكتمل تعديل الكومة.</p>
</li>
<li>
<p>العنصر العلوي النهائي هو 10، ويحدث تبديلان إجمالاً.</p>
</li>
</ol>
</div>
<h3 id="التحقق-من-علاقات-الأب-والابن-في-كومة-صغرى">التحقق من علاقات الأب والابن في كومة صغرى</h3>
<p>تمثّل المصفوفة <code>[1, 4, 3, 7, 6, 2]</code> شجرة ثنائية كاملة. وفي الكومة الصغرى، يجب ألا تكون أي عقدة أب أكبر من أبنائها.
وبالنسبة إلى الفهرس <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>، يكون فهرسا الابن الأيسر والأيمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mi>i</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">2i+1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mi>i</mi><mo>+</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">2i+2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> على الترتيب.</p>
<!-- numbered-subquestions -->
<ol>
<li>ما فهرستا وقيمتا ابني الفهرس 2؟</li>
<li>قيمة العقدة عند الفهرس 2 هي 3. فهل تخالف قاعدة الكومة الصغرى مع ابنها؟ وإن كان الأمر كذلك، فما العنصران الواجب تبديلهما؟</li>
<li>بناءً على إجابتك عن السؤال 2، اكتب المصفوفة بعد التبديل إن كانت القاعدة قد خُولفت؛ وإلا فاشرح سبب عدم الحاجة إلى تبديل. وأخيراً، تحقق من علاقات الأب والابن المتبقية.</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>
<p>الابن الأيسر للفهرس 2 يقع عند الفهرس 5 وقيمته 2. أما فهرس الابن الأيمن فهو 6، لكن طول المصفوفة 6، لذا لا وجود للابن الأيمن.</p>
</li>
<li>
<p>قيمة الأب 3 أكبر من قيمة الابن 2، وهذا يخالف قاعدة الكومة الصغرى. وينبغي تبديل العنصرين عند الفهرسین 2 و5.</p>
</li>
<li>
<p>بعد التبديل تصبح المصفوفة <code>[1, 4, 2, 7, 6, 3]</code>. ولنتحقق من كل علاقة:
<code>1 ≤ 4</code>، <code>1 ≤ 2</code>؛ <code>4 ≤ 7</code>، <code>4 ≤ 6</code>؛ و<code>2 ≤ 3</code>.
ولم يعد أي أب أكبر من أبنائه، فتحققت قاعدة الكومة الصغرى.</p>
</li>
</ol>
</div>
<h3 id="الاحتفاظ-بأكبر-ثلاثة-أعداد-باستخدام-كومة-صغرى">الاحتفاظ بأكبر ثلاثة أعداد باستخدام كومة صغرى</h3>
<p>للاحتفاظ بأكبر 3 أعداد من تدفّق البيانات <code>[4, 1, 7, 3, 8]</code>، حافظ على كومة صغرى لا تحتوي على أكثر من 3 عناصر.</p>
<p>أدرِج الأعداد الثلاثة الأولى أولاً في الكومة الصغرى بالترتيب. وبعد أن تمتلئ الكومة، لكل عدد جديد:
إن كان أكبر من العنصر العلوي، فاحذف العنصر العلوي وأدرج العدد الجديد؛ وإلا فاترك الكومة دون تغيير.</p>
<p>بعد قراءة كل عدد، اكتب الأعداد المحتفظ بها في الكومة والعنصر العلوي.
واكتب الأعداد المحتفظ بها على هيئة مجموعة؛ ولا حاجة إلى ذكر ترتيبها في مصفوفة الكومة.</p>
<div class="note">
<p class="note__title">الإجابة</p>
<p>تكون النتيجة بعد قراءة كل عدد كما يلي:</p>
<table>
<thead>
<tr>
<th>العدد المقروء</th>
<th>الأعداد المحتفظ بها</th>
<th>العنصر العلوي</th>
</tr>
</thead>
<tbody>
<tr>
<td>4</td>
<td><code>{4}</code></td>
<td>4</td>
</tr>
<tr>
<td>1</td>
<td><code>{1, 4}</code></td>
<td>1</td>
</tr>
<tr>
<td>7</td>
<td><code>{1, 4, 7}</code></td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td><code>{3, 4, 7}</code></td>
<td>3</td>
</tr>
<tr>
<td>8</td>
<td><code>{4, 7, 8}</code></td>
<td>4</td>
</tr>
</tbody>
</table>
<p>بعد امتلاء الكومة، يكون عنصرها العلوي أصغر الأعداد المحتفظ بها حالياً. ولا يستبدل العدد الجديد العنصر العلوي إلا إذا كان أكبر منه.
والمجموعة النهائية <code>{4, 7, 8}</code> تحتوي بالضبط على أكبر 3 أعداد.</p>
</div>
<div class="exercises"><h2 id="تمارين-برمجية">تمارين برمجية</h2>
<h3 id="إيجاد-العنصر-الأكبر-بالمرتبة-k-في-مصفوفة">إيجاد العنصر الأكبر بالمرتبة k في مصفوفة</h3>
<p>بمعطى مصفوفة أعداد صحيحة <code>nums</code> وعدد صحيح <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span>، حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn><mo>≤</mo><mi>k</mi><mo>≤</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">1 \\le k \\le n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7804em;vertical-align:-0.136em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8304em;vertical-align:-0.136em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> و <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> هو طول المصفوفة، أعد العنصر الذي سيظهر في الموضع <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> لو رُتّبت المصفوفة من الأكبر إلى الأصغر.</p>
<p>احسب العناصر المكررة بصورة منفصلة. على سبيل المثال، ثاني أكبر عنصر في <code>[5, 5, 2]</code> يبقى 5. واستخدم كومة صغرى لا تحتوي على أكثر من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> عنصر.</p>
<div class="note">
<p class="note__title">تلميحات</p>
<ol>
<li>العنصر الأكبر بالمرتبة k هو أصغر الأعداد بين أكبر k عدداً</li>
<li>أدرِج كل عدد في الكومة الصغرى، واحذف أصغر قيمة كلما تجاوز حجم الكومة k</li>
<li>بعد انتهاء الاجتياز، تحتوي الكومة على أكبر k عدداً، ويكون عنصرها العلوي هو الجواب</li>
</ol>
</div>
<p><a href="https://leetcode.com/problems/kth-largest-element-in-an-array/">LeetCode</a>{ .rounded-button .exercise-button target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot; }</p>
</div>`,m={book:a,chapter:s,chapterTitle:n,slug:t,title:e,headings:p,html:l};export{a as book,s as chapter,n as chapterTitle,m as default,p as headings,l as html,t as slug,e as title};
