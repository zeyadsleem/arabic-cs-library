const s="mit-6100l",a="recitations",n="الجلسات التطبيقية",t="rec3",p="الجلسة التطبيقية 3: الأعداد الثنائية، والتقريب، والدوال",e=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"مراجعة-المحاضرة-4-برامج-بسيطة-ومقدمة-إلى-الأعداد-الثنائية",text:"مراجعة المحاضرة 4: برامج بسيطة، ومقدّمة إلى الأعداد الثنائية"},{depth:3,id:"1-البرامج-البسيطة-simple-programs",text:"1. البرامج البسيطة (Simple Programs)"},{depth:3,id:"2-مقدمة-إلى-الأعداد-الثنائية-intro-to-binary-numbers",text:"2. مقدّمة إلى الأعداد الثنائية (Intro to Binary Numbers)"},{depth:2,id:"مراجعة-المحاضرة-5-الأعداد-العشرية-والكسر-وخوارزميات-التقريب",text:"مراجعة المحاضرة 5: الأعداد العشرية، والكسر، وخوارزميات التقريب"},{depth:3,id:"1-الأعداد-العشرية-floats",text:"1. الأعداد العشرية (Floats)"},{depth:3,id:"2-الكسور-والتقريب-fractions-amp-approximation",text:"2. الكسور والتقريب (Fractions &amp; Approximation)"},{depth:3,id:"3-خوارزميات-التقريب-approximation-algorithms",text:"3. خوارزميات التقريب (Approximation Algorithms)"},{depth:2,id:"مراجعة-المحاضرة-6-البحث-بالتنصيف-ونيوتنرافسون",text:"مراجعة المحاضرة 6: البحث بالتنصيف، ونيوتن–رافسون"},{depth:3,id:"1-البحث-بالتنصيف-bisection-search",text:"1. البحث بالتنصيف (Bisection Search)"},{depth:3,id:"2-نيوتنرافسون-newton-raphson",text:"2. نيوتن–رافسون (Newton-Raphson)"},{depth:2,id:"المحاضرة-7-الدوال-والنطاق-functions-and-scope",text:"المحاضرة 7: الدوال والنطاق (Functions and Scope)"},{depth:3,id:"الدوال-functions",text:"الدوال (Functions)"},{depth:3,id:"النطاق-scope",text:"النطاق (Scope)"}],l=`<h1>الجلسة التطبيقية 3 (Recitation 3)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec03_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات كما في الأصل. الشيفرة محفوظة بالإنجليزية، والمعادلات والرموز باقية كما هي. لم تُضمَّن صور.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-7-decomposition-abstraction-functions/">المحاضرة 7: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)</a>. ويعرض ملخّصها مراجعةً لما في المحاضرات 4 و5 و6، ثم مقدّمةً إلى الدوال (Functions) والنطاق (Scope).</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 3 — 30 سبتمبر 2022.</p>
<ul>
<li>مسابقة MQ4 الأربعاء المقبل 10/5.</li>
<li>مجموعة المسائل PS1 مستحقّة الأربعاء المقبل.</li>
</ul>
<h2 id="مراجعة-المحاضرة-4-برامج-بسيطة-ومقدمة-إلى-الأعداد-الثنائية">مراجعة المحاضرة 4: برامج بسيطة، ومقدّمة إلى الأعداد الثنائية</h2>
<h3 id="1-البرامج-البسيطة-simple-programs">1. البرامج البسيطة (Simple Programs)</h3>
<ul>
<li>خوارزميات التحقّق والتخمين (guess-and-check) إحدى طرق إيجاد حلّ لمشكلة عبر التعداد الشامل (exhaustive enumeration).</li>
<li>خمّن الحلّ، ثم قيّم التخمين، ثم عدّل التخمين تعديلًا مبنيًّا على فهم، وكرّر…</li>
<li>كرّر هذه الخطوات حتى تجد حلًّا، أو حتى تستنفد مجموعة الحلول الممكنة لديك.</li>
<li>برامج مثال: تخمين الجذر التربيعي أو الجذر التكعيبي.</li>
</ul>
<h3 id="2-مقدمة-إلى-الأعداد-الثنائية-intro-to-binary-numbers">2. مقدّمة إلى الأعداد الثنائية (Intro to Binary Numbers)</h3>
<ul>
<li>تستخدم الحاسبات الأعداد الثنائية.</li>
<li>كلّ شيء يُخزَّن في إحدى حالتين — إمّا 0 وإمّا 1.</li>
<li>الأعداد الثنائية كفؤة، وسهلة إجراء العمليات عليها.</li>
<li>تُسمّى تسلسل من الأعداد الثنائية، مثل 00110011، تسلسل بتات (sequence of bits).</li>
<li>يمكن تحويل الأعداد في الأساس 10 إلى أعداد ثنائية والعكس.</li>
</ul>
<p>بّتات الأولى الثماني هي قوى الاثنين:</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>128</mn><mo separator="true">,</mo><mn>64</mn><mo separator="true">,</mo><mn>32</mn><mo separator="true">,</mo><mn>16</mn><mo separator="true">,</mo><mn>8</mn><mo separator="true">,</mo><mn>4</mn><mo separator="true">,</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">128, 64, 32, 16, 8, 4, 2, 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">128</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">64</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">32</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">16</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">8</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1</span></span></span></span></span>
<p>ففي البتّات الثماني الأولى يمكننا تخزين أرقام حتى 256 (من دون شمولها).</p>
<p><strong>مثال:</strong> حوّل العدد 56 في الأساس 10 إلى تمثيله الثنائي.</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>56</mn><mo>=</mo><mn>00111000</mn></mrow><annotation encoding="application/x-tex">56 = 00111000</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">56</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">00111000</span></span></span></span></span>
<p><strong>مثال 2:</strong> حوّل 00011001 إلى الأساس 10.</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>00011001</mn><mo>=</mo><mn>1</mn><mo>∗</mo><mn>1</mn><mo>+</mo><mn>1</mn><mo>∗</mo><mn>8</mn><mo>+</mo><mn>1</mn><mo>∗</mo><mn>16</mn><mo>=</mo><mn>25</mn></mrow><annotation encoding="application/x-tex">00011001 = 1*1 + 1*8 + 1*16 = 25</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">00011001</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">8</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">16</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">25</span></span></span></span></span>
<h2 id="مراجعة-المحاضرة-5-الأعداد-العشرية-والكسر-وخوارزميات-التقريب">مراجعة المحاضرة 5: الأعداد العشرية، والكسر، وخوارزميات التقريب</h2>
<h3 id="1-الأعداد-العشرية-floats">1. الأعداد العشرية (Floats)</h3>
<ul>
<li>تستخدم بايثون «الفاصلة العائمة» (floating point) لتقريب الأعداد الحقيقية.</li>
<li>العمليات على الأعداد العشرية تُدخل خطأ صغيرًا جدًّا.</li>
<li>أخطاء صغيرة كثيرة تتحوّل إلى خطأ أكبر.</li>
</ul>
<h3 id="2-الكسور-والتقريب-fractions-amp-approximation">2. الكسور والتقريب (Fractions &amp; Approximation)</h3>
<ul>
<li>نستخدم الفكرة نفسها لتخزين الكسور في النظام الثنائي، برفع 2 إلى أُسّ عدد سالب.</li>
</ul>
<p>في النهاية، يمثّل الحاسوب كلّ شيء في بتات. ولذلك تُقرَّب الأعداد التي فيها خانات كثيرة بعد الفاصلة العشرية غالبًا.</p>
<p>ونتيجة لذلك، كن حذرًا عند المقارنة بين الأعداد العشرية وعند العمل بها.</p>
<h3 id="3-خوارزميات-التقريب-approximation-algorithms">3. خوارزميات التقريب (Approximation Algorithms)</h3>
<ul>
<li>مثل التحقّق والتخمين، لكنّ الهدف إيجاد إجابة تُعدّ «جيدة كفاية»، وليست بالضرورة دقيقة.</li>
<li>خمّن إجابة، ثم افحص إن كانت «جيدة كفاية»، فإن لم تكن عدّل تخمينك تعديلًا مبنيًّا على فهم، وكرّر حتى يصير تخمينك «جيدًا كفاية».</li>
<li>المعاملات الرئيسة: مقدار الزيادة (increment)، وإيبسيلون (epsilon)، وعدد التخمينات، إلخ…</li>
<li>تذكّر أن تضع في حسابك ما يحدث إن تجاوزت شرط التوقّف «قريب كفاية» — لا نريد حلقة لا نهائية.</li>
</ul>
<h2 id="مراجعة-المحاضرة-6-البحث-بالتنصيف-ونيوتنرافسون">مراجعة المحاضرة 6: البحث بالتنصيف، ونيوتن–رافسون</h2>
<h3 id="1-البحث-بالتنصيف-bisection-search">1. البحث بالتنصيف (Bisection Search)</h3>
<ul>
<li>خوارزمية بحث تُطبَّق على المسائل التي فيها ترتيب طبيعي (inherent) لمجال الإجابات الممكنة (مثل قائمة أعداد مرتّبة).</li>
<li>خطوات خوارزمية بحث ثنائي مبسّطة:
<ul>
<li>خمّن نقطة منتصف المجال.</li>
<li>إن لم تكن الإجابة، افحص إن كانت الإجابة أكبر أم أصغر من نقطة المنتصف.</li>
<li>غيّر المجال.</li>
<li>كرّر.</li>
</ul>
</li>
<li>تقطع هذه الطريقة مجموعة الإجابات الممكنة المراد فحصها إلى النصف في كل مرحلة، ومن ثمّ لها خاصية النموّ اللوغاريتمي، ومن ثمّ فهي خوارزمية أكثر كفاءة.</li>
</ul>
<h3 id="2-نيوتنرافسون-newton-raphson">2. نيوتن–رافسون (Newton-Raphson)</h3>
<ul>
<li>خوارزمية تقريب عامّة لإيجاد جذور كثير الحدود (polynomial) في متغيّر واحد.</li>
<li>لدينا دالة كثير حدود <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>p</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">p(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>، والهدف حلّ المعادلة من أجل <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>r</mi></mrow><annotation encoding="application/x-tex">r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span> بحيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>p</mi><mo stretchy="false">(</mo><mi>r</mi><mo stretchy="false">)</mo><mo>=</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">p(r) = 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>.</li>
<li>بيّن نيوتن–رافسون أنّه:
<ul>
<li>
<p>إن كان <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>g</mi></mrow><annotation encoding="application/x-tex">g</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span></span></span></span> تقريبًا للجذر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>r</mi></mrow><annotation encoding="application/x-tex">r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span></span></span></span>، فإنّ</p>
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>g</mi><mo>−</mo><mfrac><mrow><mi>p</mi><mo stretchy="false">(</mo><mi>g</mi><mo stretchy="false">)</mo></mrow><mrow><msup><mi>p</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo stretchy="false">(</mo><mi>g</mi><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">g - \\frac{p(g)}{p&#x27;(g)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6779em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mclose">)</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span>
<p>تقريب أفضل، حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>p</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup></mrow><annotation encoding="application/x-tex">p&#x27;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9463em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span></span></span></span> هي مشتقّة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>p</mi></mrow><annotation encoding="application/x-tex">p</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span></span></span></span>.</p>
</li>
</ul>
</li>
</ul>
<h2 id="المحاضرة-7-الدوال-والنطاق-functions-and-scope">المحاضرة 7: الدوال والنطاق (Functions and Scope)</h2>
<h3 id="الدوال-functions">الدوال (Functions)</h3>
<ul>
<li>تلتقط الدوال العمل الحسابي داخل صندوق أسود.</li>
<li>تتيح لنا إعادة استخدام الشيفرة وكتابة برامج بصياغة أكثر إيجازًا.</li>
<li>تأخذ الدوال مدخلات وتُعيد مخرجات.</li>
<li>تُسمّى المدخلات معاملات (parameters) للدالة، وتُعاد المخرجات عبر عبارة <code>return</code>.</li>
<li>استدعاء دالة:</li>
</ul>
<pre><code class="language-python">My_output = function_name(arg1, arg2, …, argN)
</code></pre>
<ul>
<li>وعند الاستدعاء، تُستبدل الدالة كاملةً بقيمة الإعادة (return value).</li>
<li><code>print</code> مقابل <code>return</code>:
<ul>
<li><code>print</code>: للمستخدم، يعرض قيمة فحسب.</li>
<li><code>return</code>: للحاسوب، ويتيح لك إرسال قيم من الدالة إلى أجزاء أخرى من شيفرتك.
<ul>
<li>لا يُنفَّذ أيّ شيء في الدالة بعد تنفيذ عبارة <code>return</code>.</li>
<li>القيمة المُعادة الافتراضية في بايثون هي <code>None</code>.</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="النطاق-scope">النطاق (Scope)</h3>
<ul>
<li>تُتابَع إسنادات المتغيّرات في جدول رموز (symbol table) أو إطار مكدّس (stack frame) يربط أسماء المتغيّرات بقيمها.</li>
<li>عند استدعاء دالة، يُنشأ إطار مكدّس جديد.</li>
<li>عند إعادة الدالة، يُزال إطار المكدّس أو يُتلف.</li>
<li>يقدّم Python Tutor تصورًا جيّدًا لذلك: https://pythontutor.com/.</li>
</ul>
`,m={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,m as default,e as headings,l as html,t as slug,p as title};
