const n="mit-6100l",a="problem-sets",e="مجموعات المسائل",i="ps1",s="مجموعة المسائل 1 — الفائدة المركبة",t=[{depth:2,id:"1-المقدمة-introduction",text:"1) المقدمة (Introduction)"},{depth:3,id:"11-الأهداف-objectives",text:"1.1) الأهداف (Objectives)"},{depth:3,id:"12-نظرة-عامة-overview",text:"1.2) نظرة عامة (Overview)"},{depth:3,id:"13-التعاون-collaboration",text:"1.3) التعاون (Collaboration)"},{depth:3,id:"14-ملاحظات-مهمة",text:"1.4) ملاحظات مهمة"},{depth:2,id:"2-الجزء-a-الادخار-لشراء-منزل-saving-for-a-house",text:"2) الجزء A: الادخار لشراء منزل (Saving for a House)"},{depth:3,id:"21-الاختبار-testing",text:"2.1) الاختبار (Testing)"},{depth:2,id:"3-الجزء-b-الادخار-مع-زيادة-راتب-saving-with-a-raise",text:"3) الجزء B: الادخار مع زيادة راتب (Saving with a Raise)"},{depth:3,id:"31-الاختبار",text:"3.1) الاختبار"},{depth:2,id:"4-الجزء-c-اختيار-معدل-فائدة-choosing-an-interest-rate",text:"4) الجزء C: اختيار معدل فائدة (Choosing an Interest Rate)"},{depth:3,id:"41-الاختبار",text:"4.1) الاختبار"},{depth:2,id:"5-إجراءات-التسليم-hand-in-procedure",text:"5) إجراءات التسليم (Hand-in Procedure)"},{depth:3,id:"51-معلومات-الوقت-والتعاون",text:"5.1) معلومات الوقت والتعاون"},{depth:3,id:"52-التسليم-المرحلي-half-way-submission",text:"5.2) التسليم المرحلي (Half-way Submission)"},{depth:3,id:"53-التسليم-النهائي-final-submit",text:"5.3) التسليم النهائي (Final Submit)"},{depth:2,id:"المصدر-والنسب-والترخيص",text:"المصدر والنَّسب والترخيص"}],o=`<h1>مجموعة المسائل 1: الفائدة المركبة (Compound Interest)</h1>
<p><strong>زميل مجموعة المسائل (Pset Buddy):</strong> لم يُعيَّن لك زميل لهذه المجموعة في النسخة المنشورة.</p>
<p><strong>لا تحذف أيًا من تعليقات القالب المقدم، واستخدم أسماء المتغيرات المحددة أدناه لتحصل على الدرجة كاملة!</strong></p>
<h2 id="1-المقدمة-introduction">1) المقدمة (Introduction)</h2>
<h3 id="11-الأهداف-objectives">1.1) الأهداف (Objectives)</h3>
<ul>
<li>التعرف إلى تدفق التحكم (Control Flow) في بايثون.</li>
<li>صياغة حل حاسوبي لمشكلة.</li>
<li>استكشاف البحث بالتنصيف (Bisection Search).</li>
</ul>
<h3 id="12-نظرة-عامة-overview">1.2) نظرة عامة (Overview)</h3>
<ul>
<li>أكمل المسائل الثلاث في ملفات بايثون المقابلة: <code>ps1a.py</code> و<code>ps1b.py</code> و<code>ps1c.py</code>.</li>
<li>أضف تعليقات تساعدنا على فهم كودك؛ اقرأ دليل الأسلوب (Style Guide) لتعليمات أدق.</li>
<li><code>ps1_tester.py</code> ملف اختبار يمكنك تشغيله لاختبار كودك. تأكد من وجوده في المجلد نفسه مع <code>ps1a.py</code> و<code>ps1b.py</code> و<code>ps1c.py</code> و<code>put_in_function.py</code>.</li>
</ul>
<h3 id="13-التعاون-collaboration">1.3) التعاون (Collaboration)</h3>
<ul>
<li>يمكن للطلاب العمل معًا، لكن يجب أن يكتب كل طالب تكليفه ويسلّمه منفصلًا. لا يجوز للطلاب تسليم الكود نفسه تمامًا.</li>
<li>يمكن للزملاء المعينين (Buddies) العمل معًا وتسليم الكود نفسه.</li>
<li>لا يُسمح للطلاب بالنظر إلى كود بعضهم أو بنية كود بعضهم أو نسخها.</li>
<li>أدرج أسماء من تعاونت معهم في تعليق في بداية كل ملف.</li>
<li>راجع سياسة التعاون في معلومات المقرر لمزيد من التفاصيل.</li>
</ul>
<h3 id="14-ملاحظات-مهمة">1.4) ملاحظات مهمة</h3>
<ul>
<li>اقرأ الأقسام 1 و2 و3 و4 من دليل الأسلوب.</li>
<li>إذا ظهر خطأ مثل <code>ModuleNotFoundError: No module named 'ps1b_in_function'</code> في أي وقت، فأعد تشغيل نواة Spyder.</li>
<li>احصل على إدخال المستخدم وعرّف المتغيرات تحت عناوين التعليقات الصحيحة في <code>ps1a.py</code> و<code>ps1b.py</code> و<code>ps1c.py</code>. عدم الالتزام، مثل استخدام أسماء مختلفة حيث حُددت الأسماء أو تعريف المتغيرات تحت عناوين خاطئة، يؤدي إلى منح المصحح درجة صفر.</li>
<li>لا تحذف أو تغير أي تعليق مقدم في الملفات الأصلية الثلاثة.</li>
<li>قد تشير التعليقات في أعلى الملفات المحملة إلى 6.100A، لأننا نستخدم الملفات نفسها تمامًا في 6.100A و6.100L.</li>
</ul>
<h2 id="2-الجزء-a-الادخار-لشراء-منزل-saving-for-a-house">2) الجزء A: الادخار لشراء منزل (Saving for a House)</h2>
<p>تخرجت للتو من MIT وحصلت على وظيفة! تنتقل إلى منطقة خليج سان فرانسيسكو (Bay Area)، وتقرر بدء الادخار لشراء منزل. المنازل مرتفعة الثمن نسبيًا، فتبدأ الادخار لتوفير الدفعة المقدمة لمنزل أحلامك.</p>
<p>هدفك معرفة عدد الأشهر اللازمة لتوفير الدفعة المقدمة. تُحسب تكلفتها بضرب التكلفة الكلية لمنزل أحلامك في نسبة الدفعة المقدمة.</p>
<p><strong>مدخلات المستخدم:</strong> اطلب المتغيرات التالية، وحوّلها إلى <code>float</code>. يجب تهيئتها بهذا الترتيب في بداية البرنامج، قبل تعريف متغيرات أخرى:</p>
<ol>
<li>الراتب السنوي الابتدائي: <code>yearly_salary</code>.</li>
<li>نسبة الراتب المراد ادخارها: <code>portion_saved</code>، بصيغة عشرية، مثل <code>0.1</code> مقابل 10%.</li>
<li>تكلفة منزل أحلامك: <code>cost_of_dream_home</code>.</li>
</ol>
<p><strong>كتابة البرنامج:</strong> حدد عدد الأشهر اللازمة بناء على المعلومات التالية:</p>
<ol>
<li><code>yearly_salary</code>، كما سبق.</li>
<li><code>portion_saved</code>، كما سبق.</li>
<li><code>cost_of_dream_home</code>، كما سبق.</li>
<li><code>portion_down_payment</code>، نسبة التكلفة الكلية المطلوبة للدفعة المقدمة. افترض <code>portion_down_payment = 0.25</code>، أي 25%.</li>
<li>المبلغ المدخر حتى الآن هو <code>amount_saved</code>، ويبدأ من صفر دولار.</li>
<li>تحصل على معدل عائد سنوي <code>r</code>. أي أنك تتلقى في نهاية كل شهر مبلغًا إضافيًا قدره <code>amount_saved * (r/12)</code> على مدخراتك؛ القسمة على 12 لأن <code>r</code> سنوي. افترض <code>r = 0.05</code>، أي 5%.</li>
<li>في نهاية كل شهر تزيد مدخراتك بمقدار: (1) نسبة من راتبك الشهري، و(2) العائد الشهري للاستثمار. <strong>مبلغ الاستثمار المستخدم لحساب العائد الشهري هو المبلغ المدخر عند بداية ذلك الشهر.</strong></li>
</ol>
<p><strong>المخرج:</strong> خزّن عدد الأشهر المطلوبة لتوفير الدفعة المقدمة في متغير اسمه <code>months</code>.</p>
<p><strong>ملاحظات:</strong></p>
<ul>
<li>انتبه للقيم السنوية مقابل الشهرية.</li>
<li>إذا كان عدد الأشهر خاطئًا بفارق شهر واحد، فأعد قراءة النص البارز أعلاه.</li>
<li>افترض أن المستخدمين يدخلون قيمًا صحيحة؛ مثلًا لن يدخلوا نصًا عندما يُتوقع <code>float</code>.</li>
<li>اطبع بالصيغة نفسها في حالات الاختبار التالية. قد ترى في Spyder أسطرًا إضافية بين المخرجات؛ لا تقلق بشأنها.</li>
</ul>
<h3 id="21-الاختبار-testing">2.1) الاختبار (Testing)</h3>
<h4>2.1.1) حالات اختبار يدوية</h4>
<p>الحالة 1:</p>
<pre><code class="language-text">Enter your yearly salary: 112000
Enter the percent of your salary to save, as a decimal: .17
Enter the cost of your dream home: 750000
Number of months: 97
</code></pre>
<p>الحالة 2:</p>
<pre><code class="language-text">Enter your yearly salary: 65000
Enter the percent of your salary to save, as a decimal: .20
Enter the cost of your dream home: 400000
Number of months: 79
</code></pre>
<p>الحالة 3:</p>
<pre><code class="language-text">Enter your yearly salary: 350000
Enter the percent of your salary to save, as a decimal: .3
Enter the cost of your dream home: 10000000
Number of months: 189
</code></pre>
<p><strong>ملاحظة المترجم:</strong> نصوص الإدخال والإخراج النموذجية محفوظة بالإنجليزية لأنها جزء من مواصفات مطابقة الاختبارات: الراتب السنوي، نسبة الادخار العشرية، تكلفة المنزل، وعدد الأشهر.</p>
<h4>2.1.2) أداة اختبار الطالب (Student Tester)</h4>
<p>شغّل <code>ps1_tester.py</code> في المجلد نفسه مع <code>ps1a.py</code> و<code>put_in_function.py</code>. ينبغي أن تجتاز أول 3 حالات اختبار.</p>
<h2 id="3-الجزء-b-الادخار-مع-زيادة-راتب-saving-with-a-raise">3) الجزء B: الادخار مع زيادة راتب (Saving with a Raise)</h2>
<p>افترضنا في الجزء A أن راتبك لا يتغير مع الزمن. لكنك خريج MIT، ومن الواضح أن قيمتك للشركة ستزيد بمرور الوقت! سنبني هنا على حل الجزء A بإضافة زيادة راتب كل ستة أشهر. انسخ حلك من الجزء A إلى الأقسام المقابلة في <code>ps1b.py</code>.</p>
<p><strong>مدخلات المستخدم:</strong> يوجد مدخل إضافي واحد. حوّل المدخلات إلى <code>float</code>، بهذا الترتيب، قبل تعريف متغيرات أخرى:</p>
<ol>
<li>الراتب السنوي الابتدائي <code>yearly_salary</code>.</li>
<li>نسبة الراتب المدخرة <code>portion_saved</code>.</li>
<li>تكلفة المنزل <code>cost_of_dream_home</code>.</li>
<li>الزيادة نصف السنوية <code>semi_annual_raise</code>، بنسبة عشرية، مثل <code>0.1</code> مقابل 10%.</li>
</ol>
<p><strong>كتابة البرنامج:</strong> احسب الأشهر اللازمة لتوفير الدفعة المقدمة. يمكنك إعادة استخدام قدر كبير من كود الجزء A. كالسابق، افترض عائدًا سنويًا <code>r = 0.05</code>، أي 5%، و<code>portion_down_payment = 0.25</code>، أي 25%. في هذه النسخة، يزيد <code>yearly_salary</code> بنسبة <code>semi_annual_raise</code> <strong>في نهاية كل ستة أشهر</strong>.</p>
<p><strong>المخرج:</strong> كما في A، خزّن عدد الأشهر في <code>months</code>.</p>
<p><strong>ملاحظات:</strong></p>
<ul>
<li>كما في A، يُحسب العائد الشهري من المبلغ المدخر عند بداية كل شهر.</li>
<li>انتبه للقيم السنوية مقابل الشهرية.</li>
<li>تحدث الزيادات فقط في نهاية الشهر السادس، والثاني عشر، والثامن عشر، وهكذا.</li>
<li>إذا اختلف عدد الأشهر بشهر واحد، فأعد قراءة النص البارز.</li>
<li>افترض إدخالات صحيحة، دون نصوص مكان <code>float</code>.</li>
<li>طابق صيغة المخرجات التالية، ولا تقلق من أسطر Spyder الإضافية.</li>
</ul>
<h3 id="31-الاختبار">3.1) الاختبار</h3>
<h4>3.1.1) حالات اختبار يدوية</h4>
<p>الحالة 1:</p>
<pre><code class="language-text">Enter your starting yearly salary: 110000
Enter the percent of your salary to save, as a decimal: .15
Enter the cost of your dream home: 750000
Enter the semi-annual raise, as a decimal: .03
Number of months: 92
</code></pre>
<p>الحالة 2:</p>
<pre><code class="language-text">Enter your starting yearly salary: 350000
Enter the percent of your salary to save, as a decimal: .3
Enter the cost of your dream home: 10000000
Enter the semi-annual raise, as a decimal: .05
Number of months: 131
</code></pre>
<p>تعني الرسالة الإضافية طلب نسبة زيادة الراتب نصف السنوية بالصيغة العشرية.</p>
<h4>3.1.2) أداة اختبار الطالب</h4>
<p>شغّل <code>ps1_tester.py</code> في المجلد نفسه مع <code>ps1b.py</code> و<code>put_in_function.py</code>. ينبغي أن تجتاز الآن أول 5 حالات.</p>
<h2 id="4-الجزء-c-اختيار-معدل-فائدة-choosing-an-interest-rate">4) الجزء C: اختيار معدل فائدة (Choosing an Interest Rate)</h2>
<p>استكشفت في A وB أثر (1) نسبة الراتب المدخرة كل شهر، و(2) الزيادة نصف السنوية، في مدة توفير الدفعة المقدمة، عند ثبات معدل العائد <code>r</code>.</p>
<p>في C، لدينا مبلغ ابتدائي ثابت وإمكانية اختيار معدل العائد <code>r</code>. هدفنا، انطلاقًا من إيداع ابتدائي، إيجاد أدنى معدل عائد يتيح توفير الدفعة المقدمة خلال 3 سنوات.</p>
<p><strong>مدخل المستخدم:</strong> حوّله إلى <code>float</code> في بداية البرنامج: المبلغ الابتدائي في حساب الادخار <code>initial_deposit</code>.</p>
<p><strong>كتابة البرنامج:</strong> احسب أدنى معدل <code>r</code> يحقق الدفعة المقدمة خلال 3 سنوات، بناء على <code>initial_deposit</code>. للتبسيط افترض:</p>
<ol>
<li>تكلفة المنزل 800,000 دولار.</li>
<li>الدفعة المقدمة 25% من تكلفة المنزل.</li>
</ol>
<p>استخدم صيغة الفائدة المركبة (Compound Interest) التالية لحساب المدخرات المتوقعة من <code>r</code> و<code>initial_deposit</code> و<code>months</code>:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mrow><mi mathvariant="normal">a</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">u</mi><mi mathvariant="normal">n</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">_</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">v</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">d</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">i</mi><mi mathvariant="normal">n</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">l</mi><mi mathvariant="normal">_</mi><mi mathvariant="normal">d</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">p</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">t</mi></mrow><mo>×</mo><msup><mrow><mo fence="true">(</mo><mn>1</mn><mo>+</mo><mfrac><mi>r</mi><mn>12</mn></mfrac><mo fence="true">)</mo></mrow><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">n</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">h</mi><mi mathvariant="normal">s</mi></mrow></msup></mrow><annotation encoding="application/x-tex">
\\mathrm{amount\\_saved}=\\mathrm{initial\\_deposit}\\times\\left(1+\\frac{r}{12}\\right)^{\\mathrm{months}}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord"><span class="mord mathrm">amount_saved</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord"><span class="mord mathrm">initial_deposit</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.075em;vertical-align:-0.686em;"></span><span class="minner"><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size2">(</span></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1076em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">12</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size2">)</span></span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:1.389em;"><span style="top:-3.6029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">months</span></span></span></span></span></span></span></span></span></span></span></span></span></span>
<p>استخدم البحث بالتنصيف لتحديد أدنى معدل عائد يلزم لتحقيق دفعة مقدمة لمنزل ثمنه 800,000 دولار خلال 36 شهرًا. إصابة المبلغ تمامًا صعبة قليلًا، لذلك نطلب فقط أن يكون الفرق بين المدخرات والدفعة المطلوبة أقل من 100 دولار. مثلًا، إذا كانت الدفعة 1000 دولار، فينبغي أن يكون الإجمالي بين 900 و1100، دون الطرفين.</p>
<p>يجب أن يحدّث البحث قيمة <code>r</code> حتى تمثل أدنى معدل يتيح توفير الدفعة خلال 3 سنوات. ينبغي أن تكون <code>r</code> من نوع <code>float</code>، مثل <code>0.0704</code> مقابل 7.04%. افترض أنها بين 0% و100%، شاملًا الطرفين.</p>
<p><strong>المخرجات:</strong></p>
<ol>
<li>يعكس <code>steps</code> عدد خطوات البحث للحصول على أفضل <code>r</code>؛ أي عدد مرات تنصيف مجال الاختبار.</li>
<li>تكون <code>r</code> أدنى معدل يتيح توفير الدفعة خلال 3 سنوات.</li>
</ol>
<p><strong>ملاحظات:</strong></p>
<ul>
<li>قد توجد معدلات متعددة تعطي مبلغًا يختلف بأقل من 100 دولار عن الدفعة المطلوبة. يقبل المصحح أيًا منها.</li>
<li>إذا كان الإيداع الابتدائي أكبر من الدفعة المطلوبة ناقص 100 دولار أو مساويًا لها، فأفضل معدل هو <code>0.0</code>.</li>
<li>إذا تعذر توفير مبلغ ضمن هامش 100 دولار خلال 3 سنوات بمعدل بين 0% و100%، فأسند <code>None</code> إلى <code>r</code>.
<ul>
<li><code>None</code> تختلف عن <code>&quot;None&quot;</code>: الأولى قيمة بايثون الخالية (Null Value)، والثانية سلسلة نصية.</li>
</ul>
</li>
<li>قد يختلف عدد الخطوات قليلًا بحسب شرط التوقف وطريقة حساب المدخرات. تعطي أداة الاختبار مؤشرًا جيدًا إلى قرب العدد من الحل المتوقع.</li>
<li>إذا استغرق اختبار وقتًا طويلًا، فقد تكون لديك حلقة لا نهائية! تحقق من شرط التوقف.</li>
<li>طابق الصيغة التالية، ولا تقلق من الأسطر الإضافية في Spyder.</li>
</ul>
<h3 id="41-الاختبار">4.1) الاختبار</h3>
<h4>4.1.1) حالات اختبار يدوية</h4>
<p>الحالة 1:</p>
<pre><code class="language-text">Enter the initial deposit: 65000
Best savings rate: 0.380615234375
Steps in bisection search: 12
</code></pre>
<p>المعدل وعدد الخطوات قد يكونان قريبين جدًا من هذين العددين بدلًا من مطابقتهما.</p>
<p>الحالة 2:</p>
<pre><code class="language-text">Enter the initial deposit: 150000
Best savings rate: 0.09619140625
Steps in bisection search: 11
</code></pre>
<p>قد يكون المعدل قريبًا جدًا من القيمة المعروضة، وقد يختلف عدد الخطوات بحسب تنفيذ البحث.</p>
<p>الحالة 3:</p>
<pre><code class="language-text">Enter the initial deposit: 1000
Best savings rate: None
Steps in bisection search: 0
</code></pre>
<p>قد يختلف عدد الخطوات بحسب التنفيذ. تعني الرسائل: الإيداع الابتدائي، أفضل معدل ادخار، وخطوات البحث بالتنصيف.</p>
<h4>4.1.2) أداة اختبار الطالب</h4>
<p>شغّل <code>ps1_tester.py</code> في المجلد نفسه مع <code>ps1c.py</code> و<code>put_in_function.py</code>. ينبغي اجتياز الحالات الثماني كلها.</p>
<h2 id="5-إجراءات-التسليم-hand-in-procedure">5) إجراءات التسليم (Hand-in Procedure)</h2>
<h3 id="51-معلومات-الوقت-والتعاون">5.1) معلومات الوقت والتعاون</h3>
<p>في بداية كل ملف اكتب أسماء من تعاونت معهم في تعليق، مثل:</p>
<pre><code class="language-python"><span class="hljs-comment"># Problem Set 1A</span>
<span class="hljs-comment"># Name: Jane Lee</span>
<span class="hljs-comment"># Collaborators: John Doe</span>
</code></pre>
<p>قدّر عدد الساعات التي قضيتها في المجموعة في صندوق السؤال المخصص.</p>
<h3 id="52-التسليم-المرحلي-half-way-submission">5.2) التسليم المرحلي (Half-way Submission)</h3>
<p>يجب على جميع الطلاب تسليم تقدمهم بحلول الموعد المرحلي، قبل النهائي بأسبوع. يساوي التسليم نقطة واحدة من درجة المجموعة، ولا يُقيَّم من حيث صحة الحل. الهدف أن تتقدم بثبات بدلًا من العمل في الأيام الأخيرة فقط.</p>
<p>يمكنك رفع إصدارات جديدة من ملفات المجموعة، اختر أي ملف واحد، حتى <strong>21 سبتمبر، الساعة 09:00 مساءً</strong>. لا يمكنك استخدام تمديدات أو أيام تأخير لهذا التسليم.</p>
<p>واجهة المصدر: اختيار ملف؛ لم يُختَر ملف؛ إرسال. عدد التسليمات المتبقية غير محدود.</p>
<h3 id="53-التسليم-النهائي-final-submit">5.3) التسليم النهائي (Final Submit)</h3>
<p>قبل تسليم الملفات، احذف جميع عبارات الطباعة الإضافية المستخدمة لتصحيح الأخطاء. وافتح نافذة أوامر جديدة في Spyder وأعد تشغيل البرامج.</p>
<p>شغّل أداة اختبار الطالب وتأكد من اجتياز جميع الاختبارات. لكن الأداة تحتوي على مجموعة فرعية فقط من اختبارات تحديد الدرجة؛ اجتيازها كلها لا يضمن الدرجة الكاملة.</p>
<p>يمكنك رفع إصدارات جديدة من كل ملف حتى <strong>5 أكتوبر، الساعة 09:00 مساءً</strong>. يُحتسب أي رفع بعد الموعد من رصيد أيام التأخير، إن بقي رصيد. دون رصيد لا تُمنح درجة للتسليم المتأخر. لاحظ أننا نقيم <strong>آخر تسليم</strong>.</p>
<p>لتسليم مجموعة متعددة الملفات، يمكنك تسليم كل ملف على حدة في صفحة التسليم. اضغط «إرسال» عندما تكون جاهزًا لتسليم كودك.</p>
<p>وهذا كل شيء! تهانينا على إنهاء أول مجموعة مسائل لك في 6.100L :)</p>
<h4>5.3.1) الجزء A</h4>
<p>اختيار ملف؛ لم يُختَر ملف؛ إرسال. عدد التسليمات المتبقية غير محدود.</p>
<h4>5.3.2) الجزء B</h4>
<p>اختيار ملف؛ لم يُختَر ملف؛ إرسال. عدد التسليمات المتبقية غير محدود.</p>
<h4>5.3.3) الجزء C</h4>
<p>اختيار ملف؛ لم يُختَر ملف؛ إرسال. عدد التسليمات المتبقية غير محدود.</p>
<h2 id="المصدر-والنسب-والترخيص">المصدر والنَّسب والترخيص</h2>
<p>ترجمة عربية كاملة لتعليمات <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps1_pdf/">PS 1 الرسمية</a>، من <code>extracted/mit6_100l_f22_ps1.layout.txt</code>. <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps1_code_zip/">حزمة الكود الرسمية</a>. بقيت أمثلة الإدخال والإخراج وأسماء الملفات والمتغيرات كما في المصدر، مع شرح عربي. المواعيد تاريخية، ولم تُنسخ الحزمة إلى الملفات العامة.</p>
<p>النَّسب: <strong>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare.</strong> <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/">المقرر الأصلي</a>. المواد المملوكة لـ MIT وهذه الترجمة بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>: النَّسب، غير تجاري، المشاركة بالمثل. ترجمة غير رسمية لا تعني اعتماد MIT. مواد الأطراف الثالثة ليست مرخصة تلقائيًا؛ <a href="https://ocw.mit.edu/pages/privacy-and-terms-of-use/">شروط الاستخدام</a>.</p>
`,l={book:n,chapter:a,chapterTitle:e,slug:"ps1",title:s,headings:t,html:o};export{n as book,a as chapter,e as chapterTitle,l as default,t as headings,o as html,i as slug,s as title};
