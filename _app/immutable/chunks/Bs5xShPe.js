const e="introtcs",n="lec_04_code_and_data",$="Code and Data",t="index",o="الشيفرة بيانات والبيانات شيفرة { #codeanddatachap }",a=[{depth:3,id:"objectives",text:"{ .objectives }"},{depth:2,id:"تمثيل-البرامج-كسلاسل-representprogramsec",text:"تمثيل البرامج كسلاسل {#representprogramsec }"},{depth:2,id:"عد-البرامج-وحدود-دنيا-لحجم-برامج-nand-circ-countingcircuitsec",text:"عدِّ البرامج، وحدودٌ دنيا لحجم برامج NAND-CIRC {#countingcircuitsec }"},{depth:3,id:"theorem-titlequotعد-البرامجquot-program-count",text:"{.theorem title=&quot;عدِّ البرامج&quot; #program-count}"},{depth:3,id:"theorem-titlequotحد-أدنى-من-عد-الدوالquot-counting-lb",text:"{.theorem title=&quot;حدٌّ أدنى من عدِّ الدوال&quot; #counting-lb}"},{depth:3,id:"remark-titlequotتمثيل-أكفأ-متقدم-اختياريquot-efficientrepresentation",text:"{.remark title=&quot;تمثيل أكفأ (متقدّم، اختياري)&quot; #efficientrepresentation}"},{depth:3,id:"مبرهنة-تدرج-الحجم-اختياري",text:"مبرهنة تدرّج الحجم (اختياري)"},{depth:3,id:"theorem-titlequotمبرهنة-تدرج-الحجمquot-sizehiearchythm",text:"{.theorem title=&quot;مبرهنة تدرّج الحجم&quot; #sizehiearchythm}"},{depth:3,id:"proofidea-data-refquotsizehiearchythmquot",text:"{.proofidea data-ref=&quot;sizehiearchythm&quot;}"},{depth:2,id:"تمثيل-القوالب-tuples-listoftuplesrepsec",text:"تمثيل القوالب (tuples) { #listoftuplesrepsec }"},{depth:3,id:"من-القوالب-إلى-السلاسل-stringrepresentationrpgoramsec",text:"من القوالب إلى السلاسل  {#stringrepresentationrpgoramsec }"},{depth:2,id:"مفسر-nand-circ-بلغة-nand-circ",text:"مُفسِّر NAND-CIRC بلغة NAND-CIRC"},{depth:3,id:"pause",text:"{ .pause }"},{depth:3,id:"برامج-كونية-أكفأ",text:"برامج كونية أكفأ"},{depth:3,id:"theorem-titlequotالكونية-المقيدة-الأكفأ-لبرامج-nand-circquot-eff-bounded-univ",text:"{.theorem title=&quot;الكونية المقيّدة الأكفأ لبرامج NAND-CIRC&quot; #eff-bounded-univ}"},{depth:3,id:"مفسر-nand-circ-بـquotالشيفرة-الزائفةquot",text:"مُفسِّر NAND-CIRC بـ&quot;الشيفرة الزائفة&quot;"},{depth:3,id:"pause",text:"{ .pause }"},{depth:3,id:"مفسر-nand-بلغة-python-nandevalpythonsec",text:"مُفسِّر NAND بلغة Python { #nandevalpythonsec }"},{depth:3,id:"بناء-مفسر-nand-circ-بلغة-nand-circ",text:"بناء مُفسِّر NAND-CIRC بلغة NAND-CIRC"},{depth:3,id:"pause",text:"{ .pause }"},{depth:3,id:"pause",text:"{ .pause }"},{depth:2,id:"مفسر-python-بلغة-nand-circ-نقاش",text:"مُفسِّر Python بلغة NAND-CIRC (نقاش)"},{depth:2,id:"أطروحة-كيرش-تورينغ-الفيزيائية-الموسعة-نقاش-pecttsec",text:"أطروحة كيرش-تورينغ الفيزيائية الموسّعة (نقاش) { #PECTTsec }"},{depth:3,id:"محاولات-إبطال-pectt",text:"محاولات إبطال PECTT"},{depth:3,id:"recap",text:"{ .recap }"},{depth:2,id:"خلاصة-الجزء-الأول-الحوسبة-المنتهية",text:"خلاصة الجزء الأول: الحوسبة المنتهية"},{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"exercise-titlequotدالة-المساواةquot-equals",text:"{.exercise title=&quot;دالة المساواة&quot; #equals}"},{depth:3,id:"exercise-titlequotالدالة-المساوية-لدالة-ثابتةquot-equalstwo",text:"{.exercise title=&quot;الدالة المساوية لدالة ثابتة&quot; #equalstwo}"},{depth:3,id:"exercise-titlequotالدوال-العشوائية-صعبةquot-rand-lb-id",text:"{.exercise title=&quot;الدوال العشوائية صعبة&quot; #rand-lb-id}"},{depth:2,id:"ملاحظات-مرجعية-bibnotescodeasdata",text:"ملاحظات مرجعية {#bibnotescodeasdata }"}],i=`<h1>الشيفرة بيانات والبيانات شيفرة { #codeanddatachap }</h1>
<blockquote>
<h3 id="objectives">{ .objectives }</h3>
</blockquote>
<ul>
<li>التعرّف على واحد من أهم المفاهيم في الحوسبة: ثنائية الشيفرة والبيانات. \\</li>
<li>بناء الثقة في التنقّل بين تمثيلات مختلفة للبرامج. \\</li>
<li>متابعة بناء &quot;مُقيِّم دوائر كونية&quot; (universal circuit evaluator) الذي يقيّم دوائر أخرى، إذ يتسلّم تمثيلها. \\</li>
<li>رؤية النتيجة الكبرى التي تكمل نتيجة الفصل السابق: بعض الدوال تتطلّب عدداً <em>أسّياً</em> من البوابات (gates) لحسابها.</li>
<li>مناقشة <em>أطروحة كيرش-تورينغ الفيزيائية الموسّعة</em> (Physical extended Church-Turing thesis) التي تدّعي أن الدوائر المنطقية (Boolean circuits) تلتقط <em>كلَّ</em> حسابٍ ممكنٍ في العالم الفيزيائي، وآثارها الفيزيائية والفلسفية.</li>
</ul>
<blockquote>
<p><em>&quot;مصطلح الشيفرة البرمجية هو بالطبع ضيّق أكثر مما ينبغي. فالبنى الكروموسومية هي في الوقت نفسه أدواتٌ تُحدث النمو الذي تنبئ به. إنها قانونٌ-شيفرة وسلطةٌ تنفيذية في آنٍ واحد - أو، لنستعارة تشبيهاً آخر، إنها مخطّط المهندس وحرفة البنّاء - في آنٍ واحد.&quot;</em>، إروين شرودينغر، 1944.</p>
</blockquote>
<blockquote>
<p><em>&quot;لن يسمّي عالم الرياضيات تطابقاً بين مجموعة المئتين والستين ثلاثياً من أربع وحدات ومجموعةٍ من عشرين وحدةً أخرى &quot;كونياً&quot; (universal)، مع أنّ هذا التطابق هو على الأرجح أكثر خاصيةٍ عامة جوهرية في الحياة على الأرض&quot;</em>، ميشا غروموف، 2013</p>
</blockquote>
<p>البرنامج (program) ليس سوى تسلسلٍ من الرموز، كلٌّ منها يمكن ترميزه كسلسلة من $0$ و$1$ باستخدام معيار ASCII مثلاً.
وعليه يمكننا تمثيل كل برنامج NAND-CIRC (وعليه أيضاً كل دائرة منطقية) كسلسلة ثنائية.
تبدو هذه العبارة بديهية لكنها في الواقع عميقة إلى حدٍّ كبير.
فهي تعني أننا يمكننا معاملة الدوائر أو برامج NAND-CIRC بوصفها تعليمات (instructions) لتنفيذ حساب، وكذلك بوصفها <em>بيانات</em> (<em>data</em>) يمكن أن تُستخدَم بوصفها <em>مدخلات</em> (<em>inputs</em>) لحسابات أخرى.</p>
<div class="callout callout--bigidea" id="programisinput">
<p>البرنامج (<em>program</em>) قطعةٌ من النص، ولذلك يمكن إطعامه كمدخل لبرامج أخرى.</p>
</div>
<p>هذا التطابق بين <em>الشيفرة</em> (<em>code</em>) و_البيانات_ (<em>data</em>) هو أحد أكثر جوانب الحوسبة جوهرية.
إنه يقف وراء فكرة الحواسيب <em>عامة الغرض</em> (<em>general purpose</em>)، التي لا تكون موصولة سلفاً بحساب مهمةٍ واحدة فحسب، وهو أيضاً أساس أملنا في الحصول على ذكاء اصطناعي <em>عام</em>.
يتّسع استعمال هذا المفهوم في جميع مجالات الحوسبة، من لغات البرمجة النصية إلى التعلّم الآلي، لكن من الإنصاف القول إننا لم نتقنه بعد إتقاناً كاملاً.
كثير من عمليات الاستغلال الأمني تنطوي على حالات مثل &quot;فيض المخزن المؤقت&quot; (buffer overflows) حين ينجح المهاجمون في حقن شيفرة حيث توقّع النظام بياناتَ &quot;خاملة&quot; (passive) فحسب (انظر <a href="/arabic-cs-library/images/introtcs/lec_04_code_and_data-1.webp">XKCDmomexploitsfig</a>{.ref}).
العلاقة بين الشيفرة والبيانات تتجاوز حدود أجهزة الحاسوب الإلكترونية.
فمثلاً يمكن التفكير في الـ DNA بوصفه برنامجاً وبيانات معاً (بعبارات شرودينغر، الذي كتب قبل اكتشاف بنية الـ DNA كتاباً ألهم واتسون وكريك، فإن الـ DNA هو في آنٍ واحد &quot;مخطّط المهندس وحرفة البنّاء&quot;).</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_04_code_and_data-1.webp" alt="/images/introtcs/lec_04_code_and_data-1.webp">{#XKCDmomexploitsfig .margin  }</p>
<div class="callout callout--nonmath">
<p>في هذا الفصل سنبدأ باستكشاف بعض التطبيقات العديدة للتطابق بين الشيفرة والبيانات.
نبدأ باستعمال تمثيل البرامج/الدوائر كسلاسل من أجل <em>عدِّ</em> (<em>count</em>) عدد البرامج/الدوائر حتى حجمٍ معيّن، ونستعمل ذلك للحصول على نظير للنتيجة التي أثبتناها في <a href="/arabic-cs-library/images/introtcs/lec_04_code_and_data-3.webp">finiteuniversalchap</a>{.ref}.
هناك أثبتنا أن <em>كلَّ</em> دالة يمكن حسابها بدائرة، لكن تلك الدائرة قد تكون بحجم أسّي (انظر <a href="https://en.wikipedia.org/wiki/ASCII">circuit-univ-thm-improved</a>{.ref} للحدّ الدقيق).
في هذا الفصل سنثبت أن هناك <em>بعضَ</em> الدوال التي لا يمكننا فعل أفضل منها: فالدائرة <em>الصغرى</em> التي تحسبها بحجم أسّي.</p>
<p>سنتكلّم أيضاً في هذا الفصل عن مخطّطي تمثيل البرامج/الدوائر كسلاسل لإثبات وجود &quot;دائرة كونية&quot; (universal circuit) — دائرة تستطيع تقييم دوائر أخرى.
وفي لغات البرمجة يُعرف هذا بـ &quot;المُقيِّم الدائري الذاتي&quot; (meta circular evaluator) — برنامجٌ بلغة برمجة معيّنة يستطيع تنفيذ برامج أخرى في اللغة نفسها.
هذه النتائج تخضع لقيدٍ مهم: يتعيّن أن تكون الدائرة الكونية أكبر حجماً من الدوائر التي تقيّمها.
سنُري لاحقاً في <a href="/arabic-cs-library/images/introtcs/fig-hierarchyproof.webp">chaploops</a>{.ref} كيف نتخلّص من هذا القيد، حيث سنُدخل <em>الحلقات</em> (<em>loops</em>) و_آلات تورينغ_ (<em>Turing machines</em>).</p>
<p>انظر <a href="/arabic-cs-library/images/introtcs/fig-sizecomplexity.webp">codedataoverviewfig</a>{.ref} لمحةٍ عن نتائج هذا الفصل.</p>
</div>
<p><img src="/arabic-cs-library/images/introtcs/lec_04_code_and_data-2.webp" alt="/images/introtcs/lec_04_code_and_data-2.webp">{#codedataoverviewfig  }</p>
<h2 id="تمثيل-البرامج-كسلاسل-representprogramsec">تمثيل البرامج كسلاسل {#representprogramsec }</h2>
<p><img src="/arabic-cs-library/images/introtcs/lec_04_code_and_data-3.webp" alt="/images/introtcs/lec_04_code_and_data-3.webp">{#markonerep .margin  }</p>
<p>يمكننا تمثيل البرامج أو الدوائر كسلاسل بطرق لا حصر لها.
فمثلاً، بما أن الدوائر المنطقية رسومٌ موجّهة مُعطّلة الحلقات (directed acyclic graphs)، يمكننا استعمال تمثيل <em>مصفوفة التجاور</em> (<em>adjacency matrix</em>) أو <em>قائمة التجاور</em> (<em>adjacency list</em>) لها.
لكن بما أن شيفرة البرنامج هي في النهاية تسلسلٌ من الحروف والرموز فحسب، فإن تمثيل البرنامج بهذا التسلسل هو على الأرجح أبسط تمثيل من الناحية المفاهيمية.
فمثلاً، برنامج NAND-CIRC التالي $P$</p>
<pre><code class="language-python">temp_0 = NAND(X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>])
temp_1 = NAND(X[<span class="hljs-number">0</span>],temp_0)
temp_2 = NAND(X[<span class="hljs-number">1</span>],temp_0)
Y[<span class="hljs-number">0</span>] = NAND(temp_1,temp_2)
</code></pre>
<p>ليس سوى سلسلة من 107 رمزاً تضم حروفاً صغيرة وكبيرة، وأرقاماً، وشَرطة سفلية <code>_</code> وعلامة التساوي <code>=</code>، وعلامات ترقيم مثل &quot;<code>(</code>&quot; و&quot;<code>)</code>&quot; و&quot;<code>,</code>&quot;، ومسافات، وعلامات &quot;سطر جديد&quot; (تُرمز عادةً
بـ &quot;<code>\\ n</code>&quot; أو &quot;↵&quot;).
يمكن ترميز كل رمزٍ من هذه الرموز كسلسلة من $7$ بتات باستخدام ترميز <a href="https://en.wikipedia.org/wiki/ASCII">ASCII</a>، وبالتالي يمكن ترميز البرنامج $P$ كسلسلة طولها $7 \\cdot 107 = 749$ بت.</p>
<p>لم يكن في النقاش أعلاه شيء خاصٌ بالبرنامج $P$، وبالتالي يمكننا استعمال نفس المنطق لإثبات أن <em>كلَّ</em> برنامج NAND-CIRC يمكن تمثيله كسلسلة في \${0,1}^*$.
وفعلاً يمكننا فعل أفضل قليلاً من ذلك.
فبما أن أسماء متغيّرات العمل (<em>working variables</em>) في برنامج NAND-CIRC لا تؤثّر في وظيفته، يمكننا دائماً تحويل البرنامج إلى الصورة $P'$ بحيث تكون كل المتغيّرات عدا المدخلات والمخرجات على الصورة
<code>temp_0</code> و<code>temp_1</code> و<code>temp_2</code> وهكذا..
علاوةً على ذلك، إذا كان البرنامج فيه $s$ سطراً، فلن نضطر أبداً إلى استعمال فهرس أكبر من $3s$ (لأن كل سطر ينطوي على ثلاث متغيّرات كحدٍّ أقصى)، وبالمثل فإن فهارس متغيّرات المدخلات والمخرجات
ستكون جميعها $3s$ على الأكثر.
وبما أن العدد بين $0$ و$3s$ يمكن التعبير عنه بأرقام لا تتجاوز $\\lceil \\log_{10}(3s+1) \\rceil = O(\\log s)$، فإن كل سطر في البرنامج (الذي على الصورة <code>foo = NAND(bar,blah)</code>) يمكن تمثيله باستخدام
$O(1) + O(\\log s) = O(\\log s)$ رمزاً، كلٌّ منها يمكن تمثيله بـ $7$ بتات.
وعليه يمكن تمثيل برنامجٍ من $s$ سطراً كسلسلة من $O(s \\log s)$ بت، ممّا ينتج عنه المبرهنة التالية:</p>
<div class="callout callout--theorem" id="asciirepprogramthm">
<p><strong>تمثيل البرامج كسلاسل</strong></p>
<p>هناك ثابت $c$ بحيث إن كان $f \\in SIZE(s)$، فهناك برنامج $P$ يحسب $f$ وتمثيله كسلسلة طوله $c s \\log s$ على الأكثر.</p>
</div>
<div class="callout callout--pause">
<p><strong>توقّف وتأمّل</strong></p>
<p>نُهمل البرهان الصوري لـ<a href="https://en.wikipedia.org/wiki/CPython">asciirepprogramthm</a>{.ref} لكنّرجاءً تأكّد أنك تفهم لماذا ينتج عن السبب أعلاه.</p>
</div>
<h2 id="عد-البرامج-وحدود-دنيا-لحجم-برامج-nand-circ-countingcircuitsec">عدِّ البرامج، وحدودٌ دنيا لحجم برامج NAND-CIRC {#countingcircuitsec }</h2>
<p>إحدى نتائج تمثيل البرامج كسلاسل هي أن عدد البرامج ذات طولٍ معيّن محدودٌ بعدد السلاسل التي تمثّلها.
ولهذا الأمر نتائج على المجموعات $SIZE_{n,m}(s)$ التي عرّفناها في <a href="https://github.com/frasercrmck/llvm-leg">secdefinesizeclasses</a>{.ref}.</p>
<blockquote>
<h3 id="theorem-titlequotعد-البرامجquot-program-count">{.theorem title=&quot;عدِّ البرامج&quot; #program-count}</h3>
<p>لكل $s,n,m\\in \\N$،
$$|SIZE_{n,m}(s)| \\leq 2^{O(s \\log s)}.$$
أي إنّ ثَمّ ما لا يتجاوز $2^{O(s\\log s)}$ دالةً يحسبها برامج NAND-CIRC التي لا تتجاوز $s$ سطراً.^[الثابت الضمني في رمز $O(\\cdot)$ أصغر من $10$. أي إنّ لكل $s$ كبير بما يكفي، $|SIZE_{n,m}(s)|&lt;  2^{10s\\log s}$، انظر <a href="http://llvm.org/">efficientrepresentation</a>{.ref}. وكما ناقشنا في <a href="https://en.wikipedia.org/wiki/LLVM#Front_ends">notationsec</a>{.ref}، فإننا نستعمل الحدّ $10$ لمجرّد أنّه عددٌ مستدير.]</p>
</blockquote>
<div class="callout callout--proof">
<p>لكل $n,m \\in \\N$، سنُظهر أنّ بالإسناد $E$ من $SIZE_{n,m}(s)$ إلى مجموعة السلاسل ذات الطول $c s \\log s$ لأي ثابت $c$.
وهذا سيُنهي البرهان، لأنّه يعني أنّ $|SIZE_{n,m}(s)| أصغر من حجم مجموعة كل السلاسل التي طولها $c s \\log s$ على الأكثر $\\ell =c s \\log s$.
وحجم هذه المجموعة الأخيرة هو $1+2+4+\\cdots + 2^\\ell = 2^{\\ell +1} - 1$ بحسب صيغة مجموع المتتاليات الهندسية.</p>
<p>سنجعل $E$ تُسقط $f$ على تمثيل أصغر برنامج يحسب $f$.
وبما أنّ $f \\in SIZE_{n,m}(s)$، فهناك برنامج $P$ من $s$ سطراً على الأكثر يمكن تمثيله بسلسلة طولها $c s \\log s$ على الأكثر بحسب <a href="http://www.scipr-lab.org/doc/TinyRAM-spec-0.991.pdf">asciirepprogramthm</a>{.ref}.
علاوةً على ذلك، فإنّ الإسقاط $f \\mapsto E(f)$ أحاديّ، إذ إنّ لكل $f,f':{0,1}^n \\rightarrow {0,1}$ مختلفتين يجب أن يوجد مدخلٌ ما $x\\in {0,1}^n$ تكون عنده $f(x) \\neq f'(x)$.
وهذا يعني إنّ البرنامجين اللذين يحسبان $f$ و$f'$ على التوالي لا يمكن أن يكونا متطابقين.</p>
</div>
<p><a href="https://www.ece.umd.edu/~blj/RiSC/">program-count</a>{.ref} له نتيجة تالية مهمة. عدد الدوال التي يمكن حسابها بدوائر/برامج صغيرة أصغر بكثير من العدد الكلي للدوال،
وعليه توجد دوال تتطلّب دوائر كبيرة جداً (بل <em>أسّية الحجم</em>) لحسابها.
ولرؤية السبب، لاحظ أنّ دالةً تُسقِط \${0,1}^2$ إلى \${0,1}$ يمكن التعرّف عليها بقائمتها من قيمها الأربع على المدخلات $00,01,10,11$.
ودالةٌ تُسقِط \${0,1}^3$ إلى \${0,1}$ يمكن التعرّف عليها بقائمتها من قيمها الثماني على المدخلات $000,001,010,011,100,101,110,111$.
وبشكلٍ أعمّ، كل دالة $F:{0,1}^n \\rightarrow {0,1}$ يمكن التعرّف عليها بقائمتها من قيمها الـ $2^n$ على المدخلات \${0,1}^n$.
وعليه فإنّ عدد الدوال التي تُسقِط \${0,1}^n$ إلى \${0,1}$ يساوي عدد قوائم القيم الممكنة ذات الطول $2^n$، وهو بالضبط $2^{2^n}$.
لاحظ أنّ هذا <em>أسّي مزدوج</em> (<em>double exponential</em>) في $n$، وعليه حتى لقيم $n$ الصغيرة (مثل $n=10$) يكون عدد الدوال من \${0,1}^n$ إلى \${0,1}$ فلكياً حقاً.^[&quot;فلكياً&quot; هنا هي كلمة متحفّظة: فثَمّ نجوم، بل وجسيمات، أقلّ بكثير من $2^{2^{10}}$ في الكون المرصود.]
وكما ذُكر، فإنّ هذا ينتج عنه النتيجة التالية:</p>
<blockquote>
<h3 id="theorem-titlequotحد-أدنى-من-عد-الدوالquot-counting-lb">{.theorem title=&quot;حدٌّ أدنى من عدِّ الدوال&quot; #counting-lb}</h3>
<p>يوجد ثابت $\\delta &gt; 0$ بحيث إنّ لكل $n$ كبيرٍ بما يكفي، هناك دالة $f:{0,1}^n\\rightarrow {0,1}$ بحيث
$f \\not\\in SIZE_n \\left(\\tfrac{\\delta 2^n}{n} \\right)$.
أي إنّ أقصر برنامج NAND-CIRC يحسب $f$ يتطلّب أكثر من $\\delta \\cdot 2^n/n$ سطراً.^[الثابت $\\delta$ هو $0.1$ على الأقل، وفعلاً يمكن تحسينه ليقترب من $1/2$ إلى حدٍّ لا نهائي، انظر <a href="http://www.myhdl.org/">efficientlbex</a>{.ref}.]</p>
</blockquote>
<div class="callout callout--proof">
<p>البرهان بسيط. إن كان $c$ ثابتاً بحيث $|SIZE_n(s)| \\leq 2^{c s \\log s}$ و $\\delta = 1/c$، فعند ضبط $s = \\delta 2^n/n$ نرى أنّ
$$
|SIZE_n(\\tfrac{\\delta 2^n}{n})| \\leq 2^{c \\tfrac{\\delta 2^n}{n} \\log s} &lt; 2^{c \\delta 2^n} = 2^{2^n}
$$
باستعمال الحقيقة أنّه بما أنّ $s &lt; 2^n$ فإنّ $\\log s &lt; n$ و $\\delta = 1/c$.
لكن بما أنّ $|SIZE_n(s)| أصغر من العدد الكلي للدوال التي تُسقِط $n$ بت إلى بت واحد، فلا بدّ من وجود دالة واحدة على الأقلّ ليست في $SIZE_n(s)$، وهذا هو ما أردنا إثباته.</p>
</div>
<p>لقد رأينا من قبل أنّ <em>كلَّ</em> دالة تُسقِط \${0,1}^n$ إلى \${0,1}$ يمكن حسابها ببرنامج من $O(2^n /n)$ سطراً.
ويُظهر <a href="https://goo.gl/ALgbVS">counting-lb</a>{.ref} أنّ هذا الحدّ مُحكَم، بمعنى أنّ بعض الدوال تتطلّب فعلاً هذا العدد الفلكي من السطور لحسابها.</p>
<div class="callout callout--bigidea" id="countinglb">
<p>بعض الدوال $f:{0,1}^n \\rightarrow {0,1}$ <em>لا يمكن</em> حسابها بدائرة منطقية (Boolean circuit) تستعمل عدداً من البوابات أقلّ من عدد <em>أسّي</em> (في $n$).</p>
</div>
<p>وفعلاً، كما سنستكشف في التمارين، هذه هي الحال بالنسبة لـ_أغلب_ الدوال.
وعليه فإنّ الدوال التي يمكن حسابها بعددٍ صغير من السطور (مثل الجمع، والضرب، وإيجاد المسارات القصيرة في الرسوم البيانية، بل وحتى دالة $EVAL$) هي الاستثناء لا القاعدة.</p>
<blockquote>
<h3 id="remark-titlequotتمثيل-أكفأ-متقدم-اختياريquot-efficientrepresentation">{.remark title=&quot;تمثيل أكفأ (متقدّم، اختياري)&quot; #efficientrepresentation}</h3>
</blockquote>
<p>تمثيل ASCII ليس أقصر تمثيلٍ لبرامج NAND-CIRC.
برامج NAND-CIRC مكافئة لدوائر ببوابات NAND، ما يعني أنّ برنامج NAND-CIRC من $s$ سطراً و$n$ مدخلاً و$m$ مخرجاً يمكن تمثيله برسم بياني موجّه مُعنوَن من $s+n$ رأساً، منها $n$ ذات درجة داخلية صفرية، والـ $s$ الباقية ذات درجة داخلية لا تتجاوز اثنتين.
وباستعمال تمثيل <em>مصفوفة التجاور</em> (<em>adjacency matrix</em>) لمثل هذه الرسوم البيانية، يمكننا تخفيض الثابت الضمني في <a href="https://goo.gl/gkpmBF">program-count</a>{.ref} ليقترب من $5$ إلى حدٍّ لا نهائي، انظر <a href="https://en.wikipedia.org/wiki/Fermat%27s_Last_Theorem">efficientrepresentationex</a>{.ref}.</p>
<h3 id="مبرهنة-تدرج-الحجم-اختياري">مبرهنة تدرّج الحجم (اختياري)</h3>
<p>بـ<a href="https://en.wikipedia.org/wiki/Perpetual_motion">NAND-univ-thm-improved</a>{.ref} يحتوي الصنف $SIZE_{n}(10 \\cdot 2^n /n)$ على <em>كل</em> الدوال من \${0,1}^n$ إلى \${0,1}$، بينما بـ<a href="https://en.wikipedia.org/wiki/Angle_trisection">counting-lb</a>{.ref} هناك <em>بعضُ</em> دالة $f:{0,1}^n \\rightarrow {0,1}$ <em>ليست منتمية</em> إلى $SIZE_{n}(0.1 \\cdot 2^n / n)$. وبعبارة أخرى، لكل $n$ كبيرٍ بما يكفي،
$$
SIZE_n\\left(0.1 \\tfrac{2^n}{n} \\right) \\subsetneq SIZE_n\\left(10 \\tfrac{2^n}{n} \\right) ;.
$$
ويبيّن أنّنا يمكننا استعمال <a href="https://en.wikipedia.org/wiki/Bell%27s_theorem">counting-lb</a>{.ref} لإثبات نتيجةٍ أكثر عمومية: كلّما زدنا &quot;ميزانيّتنا&quot; من البوابات، استطعنا حساب دوال جديدة.</p>
<blockquote>
<h3 id="theorem-titlequotمبرهنة-تدرج-الحجمquot-sizehiearchythm">{.theorem title=&quot;مبرهنة تدرّج الحجم&quot; #sizehiearchythm}</h3>
<p>لكل $n$ كبيرٍ بما يكفي و$10n &lt; s &lt; 0.1 \\cdot 2^n /n$،
$$
SIZE_n(s) \\subsetneq SIZE_n(s+10n) ;.
$$</p>
</blockquote>
<blockquote>
<h3 id="proofidea-data-refquotsizehiearchythmquot">{.proofidea data-ref=&quot;sizehiearchythm&quot;}</h3>
<p>لإثبات المبرهنة نحتاج إلى إيجاد دالة $f:{0,1}^n \\rightarrow {0,1}$ بحيث $f$ <em>يمكن</em> حسابها بدائرة من $s+10n$ بوابة، لكن <em>لا يمكن</em> حسابها بدائرة من $s$ بوابة.
وسنقوم بذلك عبر متتالية من الدوال $f_0,f_1,f_2,\\ldots,f_N$ لها الخصائص التالية: <strong>(1)</strong> $f_0$ <em>يمكن</em> حسابها بدائرة من $10n$ بوابة على الأكثر، <strong>(2)</strong> $f_N$ <em>لا يمكن</em> حسابها بدائرة من $0.1 \\cdot 2^n/n$ بوابة، و__(3)__ لكل $i\\in {0,\\ldots, N}$، إذا كان $f_i$ يمكن حسابها بدائرة من الحجم $s$، فإنّ $f_{i+1}$ يمكن حسابها بدائرة من الحجم $s + 10n$ على الأكثر.
مجتمعةً، هذه الخصائص تعني أنّه إذا كان $i$ أصغر عددٍ بحيث $f_i \\not\\in SIZE_n(s)$، فإنّه بما أنّ $f_{i-1} \\in SIZE_n(s)$ لا بدّ من أن يكون $f_i \\in SIZE_n(s+10n)$، وهذا هو ما نحتاج إلى إثباته.
انظر <a href="http://www.scottaaronson.com/papers/npcomplete.pdf">hierarchyprooffig</a>{.ref} لتوضيح.</p>
</blockquote>
<p><img src="http://science.sciencemag.org/content/337/6102/1628.full" alt="We prove sizehiearchythm{.ref} by coming up with a list $f_0,dots,f_{2^n}$ of functions such that $f_0$ is  the all zero function, $f_{2^n}$ is a function
(obtained from counting-lb{.ref}) outside of $SIZE_n(0.1dot 2^n/n)$ and such that $f_{i-1}$ and $f_i$ differ by one another on at most one input. We can show that for every $i$, the number of gates to compute $f_i$ is at most $10n$ larger than the number of gates to compute $f_{i-1}$ and so if we let $i$ be the smallest number such that $f_i otn SIZE_n(s)$, then $f_i n SIZE_n(s+10n)$.">{#hierarchyprooffig .margin }</p>
<div class="callout callout--proof">
<p>لنكن $f^<em>: {0,1}^n \\rightarrow {0,1}$ هي الدالة (وجودها مضمون لنا بـ<a href="http://www.cs.princeton.edu/~ken/MCS86.pdf">counting-lb</a>{.ref}) بحيث $f^</em> \\not\\in SIZE_n(0.1 \\cdot 2^n /n)$.
نُعرّف الدوال $f_0,f_1,\\ldots, f_{2^n}$ التي تُسقِط \${0,1}^n$ إلى \${0,1}$ على النحو التالي. لكل $x\\in {0,1}^n$، إذا كان $lex(x) \\in {0,1,\\ldots, 2^n-1}$ هو ترتيب $x$ في الترتيب المعجميّ فإنّ
$$
f_i(x) = \\begin{cases} f^*(x) &amp; lex(x)&lt; i  \\ 0 &amp; \\text{otherwise} \\end{cases} ;.
$$</p>
<p>الدالة $f_0$ هي ببساطة دالة الصفر الثابتة، في حين أنّ الدالة $f_{2^n}$ تساوي $f^<em>$.
علاوةً على ذلك، لكل $i\\in [2^n]$، تختلف الدالتان $f_i$ و$f_{i+1}$ على مدخلٍ واحد على الأكثر (أي المدخل $x \\in {0,1}^n$ بحيث $lex(x)=i$).
لنكن $10n &lt; s &lt; 0.1 \\cdot 2^n /n$، ولنكن $i$ أوّل فهرسٍ بحيث $f_i \\not\\in SIZE_n(s)$.
ولأنّ $f_{2^n} = f^</em> \\not\\in SIZE_n(0.1 \\cdot 2^n / n)$ فلا بدّ من وجود فهرسٍ $i$ من هذا النوع، بل إنّ $i&gt;0$ لأنّ دالة الصفر الثابتة تنتمي إلى $SIZE_n(10n)$.</p>
<p>وباختيارنا لـ$i$، فإنّ $f_{i-1}$ تنتمي إلى $SIZE_n(s)$.
ولإتمام البرهان، نحتاج إلى إظهار أنّ $f_i \\in SIZE_n(s + 10n)$.
لنكن $x^<em>$ هي السلسلة بحيث $lex(x^</em>)=i$، ولنكن $b\\in {0,1}$ هي قيمة $f^<em>(x^</em>)$.
إذن يمكننا تعريف $f_i$ أيضاً على النحو التالي
$$
f_i(x) = \\begin{cases} b &amp; x=x^* \\ f_{i-1}(x) &amp; x \\neq x^*
\\end{cases}
$$
أو بمعنى آخر
$$
f_i(x) = IF(EQUAL(x^*,x),b,f_{i-1}(x))
$$
حيث $EQUAL:{0,1}^{2n} \\rightarrow {0,1}$ هي الدالة التي تُسقِط $x,x' \\in {0,1}^n$ إلى $1$ إذا كانا متساويين وإلى $0$ خلاف ذلك.
وبما أنّه (باختيارنا لـ$i$) يمكن حساب $f_{i-1}$ باستعمال $s$ بوابة على الأكثر، وأنّ (كما يمكن التحقّق بسهولة) $EQUAL \\in SIZE_n(9n)$،
فإنّنا نستطيع حساب $f_i$ باستعمال $s + 9n +O(1) \\leq s +10n$ بوابة على الأكثر، وهذا هو ما أردنا إثباته.</p>
</div>
<p><img src="http://logic.pdmi.ras.ru/~kulikov/papers/2012_5n_lower_bound_cie.pdf" alt="An illustration of some of what we know about the size complexity classes (not to scale!). This figure depicts classes of the form $SIZE_{n,n}(s)$ but the state of affairs for other size complexity classes such as $SIZE_{n,1}(s)$ is similar. We know by NAND-univ-thm{.ref} (with the improvement of tight-upper-bound{.ref}) that all functions mapping $n$ bits to $n$ bits can be computed by a circuit of size $c dot 2^n$ for $c eq 10$, while on the other hand the counting lower bound (counting-lb{.ref}, see also countingmultibitex{.ref}) shows that some such functions will require $0.1 dot 2^n$, and the size hierarchy theorem (sizehiearchythm{.ref}) shows the existence of functions in $SIZE_n(S) etminus SIZE_n(s)$ whenever $s=o(S)$, see also sizehiearchyex{.ref}.
We also consider some specific examples: addition of two $n/2$ bit numbers can be done in $O(n)$ lines, while we don't know of such a program for multiplying two $n$ bit numbers, though we do know it can be done in $O(n^2)$ and in fact even better size. In the above,  $FACTOR_n$ corresponds to the inverse problem of multiplying- finding the prime factorization of a given number. At the moment we do not know of any circuit a polynomial (or even sub-exponential) number of lines that can compute $FACTOR_n$. ">{#sizeclassesfig    }</p>
<div class="callout callout--remark" id="explicitfunc">
<p><strong>ملاحظة — الدوال الصريحة</strong></p>
<p>بينما تُضمن مبرهنة تدرّج الحجم وجود <em>بعضِ</em> دالة <em>يمكن</em> حسابها، مثلاً، باستعمال $n^2$ بوابة لكن لا باستعمال $100n$ بوابة، فإنّنا لا نعرف أي مثالٍ صريحٍ لمثل هذه الدالة.
ومع أنّنا نشتبه بأنّ ضرب الأعداد الصحيحة هو مثالٌ من هذا النوع، فإنّنا لا نملك أي برهان على أنّ الأمر كذلك.</p>
</div>
<h2 id="تمثيل-القوالب-tuples-listoftuplesrepsec">تمثيل القوالب (tuples) { #listoftuplesrepsec }</h2>
<p>ASCII هو عرضٍ جيّد للبرامج، لكن في بعض التطبيقات يكون من المفيد أن نملك تمثيلاً أكثر تجريداً لبرامج NAND-CIRC.
في هذا القسم نصف اختياراً معيّناً، سيكون مريحاً لنا لاحقاً.
برنامج NAND-CIRC هو ببساطة متتالية من سطور من الشكل</p>
<pre><code class="language-python">blah = NAND(baz,boo)
</code></pre>
<p>لا شيء طبعاً في الأسماء الخاصة التي نستعملها للمتغيّرات.
وإذ كانت قراءتها أصعب، يمكننا كتابة كل برامجنا باستعمال متغيّرات عملٍ فقط مثل <code>temp_0</code> و<code>temp_1</code> إلخ.
لذلك، يتجاهل تمثيلنا لبرامج NAND-CIRC الأسماء الفعلية للمتغيّرات، ويربط كل متغيّر ب <em>عددٍ</em>.
ونحن نرمّز <em>سطراً</em> من البرنامج كثلاثية أعداد.
إذا كان السطر على الشكل <code>foo = NAND(bar,blah)</code> فإنّنا نرمّزه بالثلاثية $(i,j,k)$ حيث $i$ هو العدد المقابل للمتغيّر <code>foo</code>، و$j$ و$k$ هما العددان المقابلان لـ<code>bar</code> و<code>blah</code> على التوالي.</p>
<p>وبشكلٍ أكثر تحديداً، سنربط كل متغيّر بعددٍ من المجموعة $[t]= {0,1,\\ldots,t-1}$.
الأعداد $n$ الأولى \${0,\\ldots,n-1}$ تقابل متغيّرات <em>المدخلات</em> (<em>input</em>)، والأعداد $m$ الأخيرة \${t-m,\\ldots,t-1}$ تقابل متغيّرات <em>المخرجات</em> (<em>output</em>)، والأعداد الوسطى \${ n,\\ldots, t-m-1}$ تقابل بقية متغيّرات &quot;مساحة العمل&quot; (<em>workspace</em>).
رسمياً، نُعرّف تمثيلنا على النحو التالي:</p>
<div class="callout callout--definition" id="nandtuplesdef">
<p><strong>تمثيل قائمة القوالب</strong></p>
<p>لنكن $P$ برنامج NAND-CIRC من $n$ مدخلاً و$m$ مخرجاً و$s$ سطراً، ولنكن $t$ هو عدد المتغيّرات المتمايزة المستعملة في $P$.
<em>تمثيل قائمة القوالب لـ$P$</em> هو الثلاثية $(n,m,L)$ حيث $L$ قائمة من ثلاثيات على الشكل $(i,j,k)$ لكل $i,j,k \\in [t]$.</p>
<p>نُسند عدداً لكل متغيّر من متغيّرات $P$ على النحو التالي:</p>
<ul>
<li>
<p>لكل $i\\in [n]$، يُسند المتغيّر <code>X[</code>$i$<code>]</code> العدد $i$.</p>
</li>
<li>
<p>لكل $j\\in [m]$، يُسند المتغيّر <code>Y[</code>$j$<code>]</code> العدد $t-m+j$.</p>
</li>
<li>
<p>كل متغيّرٍ آخر يُسند عدداً من \${n,n+1,\\ldots,t-m-1}$ بترتيب ظهور المتغيّر في البرنامج $P$.</p>
</li>
</ul>
</div>
<p>تمثيل قائمة القوالب هو خيارنا الافتراضي لتمثيل برامج NAND-CIRC.
ولأنّ عبارة &quot;تمثيل قائمة القوالب&quot; بعض الشيء مُرهقة، فإنّنا سنسمّيها غالباً مجرّداً &quot;التمثيل&quot; (<em>representation</em>) للبرنامج $P$.
وأحياناً، حين يكون عدد المدخلات $n$ وعدد المخرجات $m$ معروفَين من السياق، فإنّنا نمثّل البرنامج ببساطة كقائمة $L$ بدلاً من الثلاثية $(n,m,L)$.</p>
<div class="callout callout--example" id="representXOR">
<p><strong>تمثيل برنامج XOR</strong></p>
<p>برنامج NAND-CIRC المفضّل لدينا، وهو البرنامج</p>
<pre><code class="language-python">u = NAND(X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>])
v = NAND(X[<span class="hljs-number">0</span>],u)
w = NAND(X[<span class="hljs-number">1</span>],u)
Y[<span class="hljs-number">0</span>] = NAND(v,w)
</code></pre>
<p>الذي يحسب دالة XOR، يُمثَّل بالثلاثية $(2,1,L)$ حيث $L=((2, 0, 1), (3, 0, 2), (4, 1, 2), (5, 3, 4))$. أي أنّ المتغيّرات <code>X[0]</code> و<code>X[1]</code> تُعطى الفهارس $0$ و$1$ على التوالي، والمتغيّرات <code>u</code> و<code>v</code> و<code>w</code> تُعطى الفهارس $2,3,4$ على التوالي، بينما المتغيّر <code>Y[0]</code> يُعطى الفهرس $5\`.</p>
</div>
<p>تحويل برنامج NAND-CIRC من تمثيله كشيفرة إلى تمثيله كقائمة قوالب هو تمرينٌ برمجيٌّ مباشر إلى حدٍّ كبير، ويمكن تحديداً أن يُنجَز في بضعة أسطر من <em>Python</em>.^[إن كنت فضولياً بشأن هذه الأسطر القليلة، فطالع <a href="https://github.com/boazbk/tcscode">مستودعنا على GitHub</a>.]
يفقد تمثيل قائمة القوالب معلوماتٍ مثل الأسماء الخاصة التي استعملناها للمتغيّرات، لكن هذا مقبول لأنّ هذه الأسماء لا تُحدث فرقاً في وظائف البرنامج.</p>
<h3 id="من-القوالب-إلى-السلاسل-stringrepresentationrpgoramsec">من القوالب إلى السلاسل  {#stringrepresentationrpgoramsec }</h3>
<p>إذا كان $P$ برنامجاً من الحجم $s$، فإنّ عدد المتغيّرات $t$ هو $3s$ على الأكثر (إذ إنّ كل سطرٍ يمسّ ثلاثة متغيّرات كحدٍّ أقصى).
وعليه يمكننا ترميز كل فهرس متغيّر في $[t]$ كسلسلة من الطول $\\ell = \\ceil{\\log (3s)}$، بإضافة أصفارٍ بادئة عند الحاجة.
ولأنّ هذا ترميزٌ بطولٍ ثابت، فإنّه خالٍ من البوابات (<em>prefix free</em>)، وعليه يمكننا ترميز القائمة $L$ من $s$ ثلاثيات (المقابلة لترميز $s$ سطوراً من البرنامج) ببساطة كسلسلة من الطول $3\\ell s$ نحصل عليها بدمج كل هذه الترميزات.</p>
<p>نُعرّف $S(s)$ على أنّها طول السلسلة التي تمثّل القائمة $L$ المقابلة لبرنامج من الحجم $s$.
من ما سبق نرى أنّ
$$
S(s) = 3s\\ceil{\\log (3s)} ;. \\label{lengthstringrepreseq}
$$</p>
<p>يمكننا تمثيل $P=(n,m,L)$ كسلسلة عبر إلحاق تمثيلٍ خالٍ من البوابات لـ$n$ و$m$ في مقدّمة القائمة $L$.
ولأنّ $n,m \\leq 3s$ (فبرنامج يجب أن يمسّ كل متغيّرات مدخلاته ومخرجاته مرّةً واحدة على الأقلّ)، فإنّ تلك التمثيلات الخالية من البوابات يمكن ترميزها باستعمال سلاسل من الطول $O(\\log s)$.
وبشكلٍ خاص، كل برنامج $P$ من $s$ سطراً على الأكثر يمكن تمثيله بسلسلة من الطول $O(s\\log s)$.
وبالمثل، كل دائرة $C$ من $s$ بوابة على الأكثر يمكن تمثيلها بسلسلة من الطول $O(s \\log s)$ (مثلاً بترجمة $C$ إلى البرنامج المكافئ $P$).</p>
<h2 id="مفسر-nand-circ-بلغة-nand-circ">مُفسِّر NAND-CIRC بلغة NAND-CIRC</h2>
<p>بما أنّنا نستطيع تمثيل البرامج كسلاسل، فإنّنا نستطيع أيضاً أن نفكّر في البرنامج كمدخلٍ لدالة.
وبشكلٍ خاص، لكل عددٍ طبيعي $s,n,m&gt;0$ نُعرّف الدالة $EVAL_{s,n,m}:{0,1}^{S(s)+n} \\rightarrow {0,1}^m$ على النحو التالي:
$$
EVAL_{s,n,m}(px) = \\begin{cases} P(x) &amp; \\text{$p\\in {0,1}^{|S(s)|}$ represents a size-$s$ program $P$ with $n$ inputs and $m$ outputs}  \\ 0^m &amp; \\text{otherwise} \\end{cases} \\label{evalcirceq}
$$
حيث $S(s)$ مُعرَّفة كما في <a href="">lengthstringrepreseq</a>{.eqref}، ونحن نستعمل مخطّط التمثيل التجريدي الموصوف في <a href="">representprogramsec</a>{.ref}.</p>
<p>أي أنّ $EVAL_{s,n,m}$ يأخذ كمدخل دمج سلسلتين: سلسلة $p\\in {0,1}^{|S(s)|}$ وسلسلة $x\\in {0,1}^n$.
إذا كانت $p$ سلسلة تمثّل قائمة ثلاثيات $L$ بحيث يكون $(n,m,L)$ تمثيلَ قائمة قوالب لبرنامج NAND-CIRC $P$ من الحجم $s$، فإنّ $EVAL_{s,n,m}(px)$ تساوي التقييم $P(x)$ للبرنامج $P$ على المدخل $x$.
وإلا فإنّ $EVAL_{s,n,m}(px)$ تساوي $0^m$ (وهذه الحالة ليست مهمّة جداً: يمكنك ببساطة أن تفكّر في $0^m$ على أنّها نوعٌ من &quot;قيمة المهملات&quot; الذي يدلّ على خطأ).</p>
<p><strong>ما يجب استخلاصه.</strong> التفاصيل الدقيقة لتعريف $EVAL_{s,n,m}$ ليست جوهرية إلى حدٍّ كبير. بل ما يلزمك تذكّره عن $EVAL_{s,n,m}$ هو ما يلي:</p>
<ul>
<li>
<p>$EVAL_{s,n,m}$ دالة منتهية تأخذ سلسلةً ذات طولٍ ثابت كمدخل وتُخرج سلسلةً ذات طولٍ ثابت كمخرج.</p>
</li>
<li>
<p>$EVAL_{s,n,m}$ دالةٌ واحدة، بحيث إنّ حساب $EVAL_{s,n,m}$ يتيح تقييم <em>أيّ</em> برامج NAND-CIRC بطولٍ ما على <em>مدخلات</em> <em>أيّ</em> وبالطول المناسب.</p>
</li>
<li>
<p>$EVAL_{s,n,m}$ هي <em>دالة</em> لا <em>برنامج</em> (تذكّر النقاش في <a href="">specvsimplrem</a>{.ref}). أي أنّ $EVAL_{s,n,m}$ هي <em>مواصفة</em> (<em>specification</em>) لما يقابل كلَّ مدخلٍ من المخرجات. ووجود <em>برنامج</em> يحسب $EVAL_{s,n,m}$ (أي <em>تنفيذٍ</em> (<em>implementation</em>) لـ$EVAL_{s,n,m}$) واقعةٌ منفصلة، تحتاج إلى إثبات (وسنقوم بذلك في <a href="">bounded-univ</a>{.ref}، مع برنامج أكفأ معروض في <a href="">eff-bounded-univ</a>{.ref}).</p>
</li>
</ul>
<p>أوّل الأمثلة على <em>الدائريّة ذاتية المرجع</em> (<em>self circularity</em>) التي سنراها في هذا الكتاب هو المبرهنة التالية، التي يمكننا التفكير فيها على أنّها تُظهر &quot;مُفسِّر NAND-CIRC بلغة NAND-CIRC&quot;:</p>
<div class="callout callout--theorem" id="bounded-univ">
<p><strong>الكونية المقيّدة لبرامج NAND-CIRC</strong></p>
<p>لكل $s,n,m \\in \\N$ بحيث $s\\geq m$ هناك برنامج NAND-CIRC $U_{s,n,m}$ يحسب الدالة $EVAL_{s,n,m}$.</p>
</div>
<p>أي أنّ برنامج NAND-CIRC $U_{s,n,m}$ يأخذ وصفَ <em>أيّ برنامج NAND-CIRC آخر</em> $P$ (بالطول والمدخلات/المخرجات الصحيحة) و_أيّ مدخلٍ_ $x$، ويحسب نتيجة تقييم البرنامج $P$ على المدخل $x$.
وبناءً على التكافؤ بين برامج NAND-CIRC والدوائر المنطقية، يمكننا أيضاً أن نفكّر في $U_{s,n,m}$ كدائرة تأخذ كمدخل وصف دوائر أخرى ومدخلاتها، وتُرجع تقييمها، انظر <a href="">universalcircfig</a>{.ref}.
نسمّي برنامج NAND-CIRC هذا $U_{s,n,m}$ الذي يحسب $EVAL_{s,n,m}$ <em>برنامجاً كونيّاً مقيَّداً</em> (<em>bounded universal program</em>) (أو <em>دائرة كونية</em>، انظر <a href="">universalcircfig</a>{.ref}).
&quot;الكوني&quot; تشير إلى أنّ هذا <em>برنامجٌ واحد</em> يستطيع تقييم <em>أيّ</em> شيفرة، بينما &quot;المقيَّد&quot; تشير إلى أنّ $U_{s,n,m}$ يقيّم برامج ذات حجمٍ مقيَّد فقط.
طبعاً فإنّ هذا القيد متأصّل في لغة برمجة NAND-CIRC، إذ إنّ برنامجاً من $s$ سطراً (أو، بما يعادل، دائرة من $s$ بوابة) يمكنه أن يأخذ على الأكثر $2s$ مدخلاً.
ولاحقاً، في <a href="">chaploops</a>{.ref}، سنُقدّم مفهوم <em>الحلقات</em> (<em>loops</em>) (ونموذج <em>آلات تورينغ</em> (<em>Turing machines</em>))، الذي يتيح التخلّص من هذا القيد.</p>
<div class="callout callout--proof">
<p><a href="">bounded-univ</a>{.ref} نتيجةٌ مهمّة، لكنّها في الحقيقة ليست صعبة الإثبات.
وبشكلٍ محدّد، بما أنّ $EVAL_{s,n,m}$ دالة منتهية، فإنّ <a href="">bounded-univ</a>{.ref} نتيجةٌ فورية من <a href="">NAND-univ-thm</a>{.ref}، التي تنصّ على أنّ <em>كلّ</em> دالة منتهية يمكن حسابها بـ_بعضِ_ برامج NAND-CIRC.</p>
</div>
<blockquote>
<h3 id="pause">{ .pause }</h3>
</blockquote>
<p><a href="">bounded-univ</a>{.ref} بسيطة لكنّها مهمّة. تأكّد أنّك تفهم ما تعنيه هذه المبرهنة، ولماذا هي نتيجةٌ لازمة من <a href="">NAND-univ-thm</a>{.ref}.</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_04_code_and_data-4.webp" alt="/images/introtcs/lec_04_code_and_data-4.webp">{#universalcircfig .margin  }</p>
<h3 id="برامج-كونية-أكفأ">برامج كونية أكفأ</h3>
<p><a href="">bounded-univ</a>{.ref} تُثبت وجود برنامج NAND-CIRC لحساب $EVAL_{s,n,m}$، لكنها لا تقدّم أي حدٍّ صريح على حجم هذا البرنامج.
و<a href="">NAND-univ-thm</a>{.ref}، التي استعملناها لإثبات <a href="">bounded-univ</a>{.ref}، تضمن وجود برنامج NAND-CIRC قد يبلغ حجمه <em>أسّياً</em> (exponential) في طول مدخله.
وهذا يعني أنّه حتى لقيم $s,n,m$ المتوسطة الصغر (مثل $n=100,s=300,m=1$)، قد يتطلّب حساب $EVAL_{s,n,m}$ برنامج NAND بعدد من السطور أكبر من عدد الذرّات في الكون المرصود!
ولحسن الحظّ، يمكننا أن نفعل أفضل بكثير من ذلك.
وفعلاً، لكل $s,n,m$ يوجد برنامج NAND-CIRC لحساب $EVAL_{s,n,m}$ حجمه <em>متعدّد الحدود</em> (polynomial) في طول مدخله.
وهذا ما تُظهره المبرهنة التالية.</p>
<blockquote>
<h3 id="theorem-titlequotالكونية-المقيدة-الأكفأ-لبرامج-nand-circquot-eff-bounded-univ">{.theorem title=&quot;الكونية المقيّدة الأكفأ لبرامج NAND-CIRC&quot; #eff-bounded-univ}</h3>
</blockquote>
<p>لكل $s,n,m \\in \\N$ هناك برنامج NAND-CIRC من $O(s^2 \\log s)$ سطراً على الأكثر يحسب الدالة
$EVAL_{s,n,m}:{0,1}^{S+n} \\rightarrow {0,1}^m$ المعرَّفة أعلاه (حيث $S$ هو عدد البتات اللازمة لتمثيل برامج من $s$ سطراً).</p>
<div class="callout callout--pause">
<p><strong>توقّف وتأمّل</strong></p>
<p>إن لم تكن قد راجعت ذلك من قبل، فقد يكون هذا وقتاً مناسباً لمراجعة رمز $O$ في <a href="">secbigohnotation</a>{.ref}. وبشكلٍ خاص، فإنّ طريقةً مكافئة لصياغة <a href="">eff-bounded-univ</a>{.ref} هي القول إنّها تنصّ على أنّه <em>يوجد</em> عدد $c&gt;0$ بحيث إنّ <em>لكل</em> $s,n,m \\in \\N$، يوجد برنامج NAND-CIRC $P$ من $c s^2 \\log s$ سطراً على الأكثر يحسب الدالة $EVAL_{s,n,m}$.</p>
</div>
<p>على خلاف <a href="">bounded-univ</a>{.ref}، فإنّ <a href="">eff-bounded-univ</a>{.ref} ليست نتيجةً لازمة تافهة من حقيقة أنّ كل دالة منتهية يمكن حسابها بدائرة ما.
فإثبات <a href="">eff-bounded-univ</a>{.ref} يتطلّب منا أن نقدّم برنامج NAND-CIRC تجريدياً لحساب الدالة $EVAL_{s,n,m}$.
وسنقوم بذلك على عدّة مراحل.</p>
<ol>
<li>
<p>أوّلاً، سنصف الخوارزمية التي تقيّم $EVAL_{s,n,m}$ في &quot;شيفرةٍ زائفة&quot; (pseudo code).</p>
</li>
<li>
<p>ثمّ، سنُظهر كيف يمكننا كتابة برنامج لحساب $EVAL_{s,n,m}$ في <em>Python</em>. لن نستعمل من Python سوى القليل، ويمكن لقارئٍ متمرّس على البرمجة بأيّ لغة أن يتابع معنا.</p>
</li>
<li>
<p>أخيراً، سنُظهر كيف يمكننا تحويل برنامج Python هذا إلى برنامج NAND-CIRC.</p>
</li>
</ol>
<p>يسفر هذا النهج عن أكثر بكثير من مجرّد إثبات <a href="">eff-bounded-univ</a>{.ref}: سنرى أنّه من الممكن بالفعل دائماً تحويل شيفرةٍ (خالٍة من الحلقات) المكتوبة في لغاتٍ عالية المستوى مثل Python إلى
برامج NAND-CIRC (وعليه إلى الدوائر المنطقية أيضاً).</p>
<h3 id="مفسر-nand-circ-بـquotالشيفرة-الزائفةquot">مُفسِّر NAND-CIRC بـ&quot;الشيفرة الزائفة&quot;</h3>
<p>لإثبات <a href="">eff-bounded-univ</a>{.ref} يكفي تقديم برنامج NAND-CIRC من $O(s^2 \\log s)$ سطراً يستطيع تقييم برامج NAND-CIRC من $s$ سطراً.
لنبدأ إذن بالتفكير في كيفية تقييمنا لمثل هذه البرامج لو كنا مقيدين بتنفيذ عمليات NAND فقط.
أي لنصف بإيجاز صورةَ <em>خوارزميةٍ</em> تُدخل عليها $n,m,s$، وقائمة ثلاثيات $L$، وسلسلة $x\\in {0,1}^n$، فتقيم البرنامج الذي تمثّله $(n,m,L)$ على السلسلة $x$.</p>
<blockquote>
<h3 id="pause">{ .pause }</h3>
</blockquote>
<p>سيكون من المفيد جداً أن تتوقّف هنا وتحاول حلّ هذه المسألة بنفسك.
على سبيل المثال، يمكنك أن تفكّر في كيفية كتابة برنامج <code>NANDEVAL(n,m,s,L,x)</code> يحسب هذه الدالة بلغة البرمجة التي تختارها.</p>
<p>سنصف الآن خوارزميةً من هذا النوع.
نحن نفترض أنّ لدينا في المتناول بنية بيانات من نوع <em>مصفوفة بتّات</em> (<em>bit array</em>) تستطيع أن تخزّن لكل $i\\in [t]$ بتّاً $T_i \\in {0,1}$.
وبشكلٍ تحديد، إذا كان <code>Table</code> متغيّراً يحمل هذه البنية، فإنّنا نفترض أنّنا نستطيع تنفيذ العمليتين:</p>
<ul>
<li>
<p><code>GET(Table,i)</code> التي تسترجع البت المقابل لـ<code>i</code> في <code>Table</code>. ويُفترض أن تكون قيمة <code>i</code> عدداً صحيحاً في $[t]$.</p>
</li>
<li>
<p><code>Table = UPDATE(Table,i,b)</code> التي تُحدِّث <code>Table</code> بحيث يصبح البت المقابل لـ<code>i</code> مساوياً الآن لـ<code>b</code>. ويُفترض أن تكون قيمة <code>i</code> عدداً صحيحاً في $[t]$ وأن يكون <code>b</code> بتّاً في \${0,1}$.</p>
</li>
</ul>
<pre><code class="language-{">Input: Numbers $n,m,s$ and $t\\leq 3s$, as well as  a list $L$ of $s$ triples of numbers in $[t]$, and  a string $x\\in \\{0,1\\}^n$.

Output: Evaluation of the program represented by $(n,m,L)$ on the -input $x\\in \\{0,1\\}^n$.

Let \`Vartable\` be table of size $t$
For{$i$ in $[n]$}
\`Vartable = UPDATE(Vartable,\`$i$\`,\`$x_i$\`)\`
Endfor
For{$(i,j,k)$ in $L$}
$a \\leftarrow$ \`GET(Vartable,\`$j$\`)\`
$b \\leftarrow$ \`GET(Vartable,\`$k$\`)\`
\`Vartable = UPDATE(Vartable,\`$i$,\`NAND(\`$a$\`,\`$b$\`))\`
Endfor
For{$j$ in $[m]$}
$y_j \\leftarrow$ \`GET(Vartable,\`$t-m+j$\`)\`
Endfor
Return $y_0,\\ldots,y_{m-1}$
</code></pre>
<p><a href="">evalnandcircalg</a>{.ref} يقيّم البرنامج المُعطى له كمدخل سطراً بعد سطر، مُحدِّثاً جدول <code>Vartable</code> ليحتوي على قيمة كل متغيّر.
وفي نهاية التنفيذ يُخرج المتغيّرات في المواضع $t-m,t-m+1,\\ldots,t-1$، وهي المتغيّرات المقابلة لمدخلات.</p>
<h3 id="مفسر-nand-بلغة-python-nandevalpythonsec">مُفسِّر NAND بلغة Python { #nandevalpythonsec }</h3>
<p>لنجعل الأمر أكثر تجريداً، ولنرَ كيف نُنفّذ <a href="">evalnandcircalg</a>{.ref} في لغة البرمجة <em>Python</em>.
(لا شيء خاص في Python؛ كان من اليسير أن نقدّم الدالة المقابلة في JavaScript أو C أو OCaml أو أيّ لغة برمجة أخرى.)
سنبني دالة <code>NANDEVAL</code> التي على مدخلات $n,m,L,x$ تُخرج نتيجة تقييم البرنامج الذي تمثّله $(n,m,L)$ على $x$.
ولتبسيط المسألة، لن نهتمّ بالحالة التي لا تكون فيها $L$ تمثيلاً لبرنامجٍ صحيح من $n$ مدخلاً و$m$ مخرجاً.
الشيفرة معروضة في <a href="">nandevalcode</a>{.ref}.</p>
<pre><code class="language-{">def NANDEVAL(n,m,L,X):
    # Evaluate a NAND-CIRC program from list of tuple representation.
    s = len(L) # num of lines
    t = max(max(a,b,c) for (a,b,c) in L)+1 # max index in L + 1
    Vartable = [0] * t # initialize array

    # helper functions
    def GET(V,i): return V[i]
    def UPDATE(V,i,b):
        V[i]=b
        return V

    # load input values to Vartable:
    for i in range(n):
        Vartable = UPDATE(Vartable,i,X[i])

    # Run the program
    for (i,j,k) in L:
        a = GET(Vartable,j)
        b = GET(Vartable,k)
        c = NAND(a,b)
        Vartable = UPDATE(Vartable,i,c)

    # Return outputs Vartable[t-m], Vartable[t-m+1],....,Vartable[t-1]
    return [GET(Vartable,t-m+j) for j in range(m)]

# Test on XOR (2 inputs, 1 output)
L = ((2, 0, 1), (3, 0, 2), (4, 1, 2), (5, 3, 4))
print(NANDEVAL(2,1,L,(0,1))) # XOR(0,1)
# [1]
print(NANDEVAL(2,1,L,(1,1))) # XOR(1,1)
# [0]
</code></pre>
<p>الوصول إلى عنصر في المصفوفة <code>Vartable</code> عند فهرسٍ معيّن يستغرق عدداً ثابتاً من العمليات الأساسية.
وعليه (بما أنّ $n,m \\leq s$ و$t \\leq 3s$)، فإنّ البرنامج أعلاه سيستعمل $O(s)$ عملية أساسية.^[لا تميّز Python بين القوائم والمصفوفات، لكنها تتيح وصولاً عشوائياً بعُرف زمنٍ ثابت إلى عناصر مفهرسة في كليهما. ويمكن القول إنّنا لو سمحنا ببرامج ذات طولٍ غير مقيَّد فعلاً (مثلاً أكبر من $2^{64}$) لف كان الثمن ثابتاً، بل لوغاريتمياً في طول المصفوفة/القائمة، لكنّ الفرق بين $O(s)$ و$O(s \\log s)$ لن يكون مهمّاً في مناقشاتنا.]</p>
<h3 id="بناء-مفسر-nand-circ-بلغة-nand-circ">بناء مُفسِّر NAND-CIRC بلغة NAND-CIRC</h3>
<p>ننتقل الآن إلى وصف برهان <a href="">eff-bounded-univ</a>{.ref}.
ولإثبات المبرهنة لا يكفي تقديم برنامج بايثون.
بل نحتاج إلى إظهار كيف نحسب الدالة $EVAL_{s,n,m}$ باستعمال <em>برنامج NAND-CIRC</em>.
بعبارة أخرى، مهمّتنا هي أن نحوّل، لكل $s,n,m$، شيفرة بايثون الموجودة في <a href="">#nandevalpythonsec</a>{.ref} إلى برنامج NAND-CIRC $U_{s,n,m}$ يحسب الدالة $EVAL_{s,n,m}$.</p>
<blockquote>
<h3 id="pause">{ .pause }</h3>
</blockquote>
<p>قبل أن تقرأ المزيد، حاول أن تفكّر في كيفية تقديمك أنت لـ&quot;برهانٍ بنّاء&quot; لـ<a href="">eff-bounded-univ</a>{.ref}.
أي فكّر في كيف تكتب، بلغة البرمجة التي تختارها، دالة <code>universal(s,n,m)</code> تُخرج على المدخلات $s,n,m$ شيفرة برنامج NAND-CIRC $U_{s,n,m}$ بحيث يحسب $U_{s,n,m}$ الدالة $EVAL_{s,n,m}$.
هناك فرقٌ دقيق لكنّه حاسم بين هذه الدالة وبين برنامج بايثون <code>NANDEVAL</code> الموصوف أعلاه.
فبدلاً من تقييم برنامجٍ معطى $P$ فعلياً على مدخلٍ ما $w$، ينبغي أن تُخرج الدالة <code>universal</code> <em>شيفرةَ</em> برنامج NAND-CIRC يحسب الخرائط $(P,x) \\mapsto P(x)$.</p>
<p>سيتبع بناؤنا عن قربٍ شديداً تنفيذ بايثون لـ<code>EVAL</code> أعلاه.
سنستعمل المتغيّرات <code>Vartable[</code>$0$<code>]</code>,$\\ldots$,<code>Vartable[</code>$2^\\ell-1$<code>]</code>, حيث $\\ell = \\ceil{\\log 3s}$ لتخزين متغيّراتنا.
غير أنّ NAND لا تملك متغيّرات ذات قيم صحيحة، لذا لا يمكننا كتابة شيفرة مثل
<code>Vartable[i]</code> لمتغيّرٍ ما <code>i</code>.
لكنّنا نستطيع <em>أن نُنفّذ</em> الدالة <code>GET(Vartable,i)</code> التي تُخرج البت رقم <code>i</code> من المصفوفة <code>Vartable</code>.
وهذا ليس إلا الدالة $LOOKUP_\\ell$ التي رأيناها في <a href="">lookup-thm</a>{.ref}!</p>
<blockquote>
<h3 id="pause">{ .pause }</h3>
</blockquote>
<p>من فضلك تأكّد أنّك تفهم لماذا <code>GET</code> و$LOOKUP_\\ell$ هما الدالة نفسها.</p>
<p>رأينا أنّه يمكننا حساب $LOOKUP_\\ell$ في زمن $O(2^\\ell) =  O(s)$ لاختيارنا لـ$\\ell$.</p>
<p>لكل $\\ell$، لتكن $UPDATE_\\ell:{0,1}^{2^\\ell + \\ell +1} \\rightarrow {0,1}^{2^\\ell}$ مقابلَ الدالة <code>UPDATE</code> للمصفوفات من الطول $2^\\ell$.
أي أنّها على المدخلات $V\\in {0,1}^{2^\\ell}$، و$i\\in {0,1}^\\ell$، و$b\\in {0,1}$، تساوي $UPDATE_\\ell(V,i,b)$ السلسلة $V' \\in {0,1}^{2^\\ell}$ بحيث
$$
V'<em>j = \\begin{cases} V_j &amp; j \\neq i \\ b &amp; j = i \\end{cases}
$$
حيث نُعرّف السلسلة $i \\in {0,1}^\\ell$ مع عددٍ في \${0,\\ldots, 2^{\\ell}-1 }$ باستعمال التمثيل الثنائي.
ويمكننا حساب $UPDATE</em>\\ell$ باستعمال برنامج NAND-CIRC من $O(2^\\ell \\ell)=(s \\log s)$ سطراً على النحو التالي:</p>
<ol>
<li>
<p>لكل $j\\in [2^\\ell]$، يوجد برنامج NAND-CIRC من $O(\\ell)$ سطراً لحساب الدالة $EQUALS_j: {0,1}^\\ell \\rightarrow {0,1}$ التي على المدخل $i$ تُخرج $1$ إذا وفقط إذا كان $i$ مساوياً لـ(التمثيل الثنائي لـ)$j$. (نترك التحقّق من ذلك كتمارين في <a href="">equals</a>{.ref} و<a href="">equalstwo</a>{.ref}.)</p>
</li>
<li>
<p>رأينا أنّنا يمكننا حساب الدالة $IF:{0,1}^3 \\rightarrow {0,1}$ بحيث تساوي $IF(a,b,c)$ القيمة $b$ إذا كان $a=1$ والقيمة $c$ إذا كان $a=0$.</p>
</li>
</ol>
<p>مجتمعةً، يعني هذا أنّنا يمكننا حساب <code>UPDATE</code> (باستعمال بعض &quot;سكر النحو&quot; للحلقات ذات الطول المقيَّد) على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">UPDATE_ell</span>(<span class="hljs-params">V,i,b</span>):
    <span class="hljs-comment"># Get V[0]...V[2^ell-1], i in {0,1}^ell, b in {0,1}</span>
    <span class="hljs-comment"># Return NewV[0],...,NewV[2^ell-1]</span>
    <span class="hljs-comment"># updated array with NewV[i]=b and all</span>
    <span class="hljs-comment"># else same as V</span>
    <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>**ell): <span class="hljs-comment"># j = 0,1,2,....,2^ell -1</span>
        a = EQUALS_j(i)
        NewV[j] = IF(a,b,V[j])
    <span class="hljs-keyword">return</span> NewV
</code></pre>
<p>ولأنّ الحلقة على <code>j</code> في <code>UPDATE</code> تُنفَّذ $2^\\ell$ مرّة، ولأنّ حساب <code>EQUALS_j</code> يستغرق $O(\\ell)$ سطراً، فإنّ العدد الإجمالي للأسطر اللازمة لحساب <code>UPDATE</code> هو $O(2^\\ell \\cdot \\ell) = O(s \\log s)$.
ومتى استطعنا حساب <code>GET</code> و<code>UPDATE</code>، فإنّ بقية التنفيذ تتلخّص في &quot;مسك دفاتر&quot; (book keeping) يجب أن يُنجَز بعناية، لكنّه ليس بحدّ ذاته بالكثير من البصيرة، ولذلك نُغفل التفاصيل الكاملة.
ولأنّنا نُنفّذ <code>GET</code> و<code>UPDATE</code> $s$ مرّة، فإنّ العدد الإجمالي للأسطر اللازمة لحساب $EVAL_{s,n,m}$ هو $O(s^2) + O(s^2 \\log s) = O(s^2 \\log s)$.
وهذا يُكمل (باستثناء التفاصيل المُغفلة) برهان <a href="">eff-bounded-univ</a>{.ref}.</p>
<div class="callout callout--remark" id="quasilinearevalrem">
<p><strong>ملاحظة — التحسين إلى تكلفةٍ شبه خطّية (ملاحظة متقدّمة اختيارية)</strong></p>
<p>برنامج NAND-CIRC أعلاه أقلّ كفاءةً من نظيره في بايثون، إذ إنّ NAND لا تقدّم مصفوفات ذات وصولٍ عشوائيٍّ كفء. فمثلاً تستغرق عملية <code>LOOKUP</code> على مصفوفة من $s$ بتّ $\\Omega(s)$ سطراً في NAND، رغم أنّها تستغرق $O(1)$ خطوة (أو ربما $O(\\log s)$ خطوة، بحسب طريقة عدّنا) في <em>Python</em>.</p>
<p>ويبيّن أنّه من الممكن تحسين حدّ <a href="">eff-bounded-univ</a>{.ref}، وتقييم برامج NAND-CIRC من $s$ سطراً باستعمال برنامج NAND-CIRC من $O(s \\log s)$ سطراً.
المفتاح هو النظر في وصف برامج NAND-CIRC كدوائر، وبشكلٍ خاص كرسوم بيانية موجّهةٍ مُعطّلة الحلقات (DAGs) ذات درجة داخلية مقيّدة.
وسيقابل البرنامج الكوني $U_s$ لبرامج $s$ سطراً <em>رسمٌ بياني كونيّ</em> (<em>universal graph</em>) $H_s$ لمثل رسوم DAG ذات $s$ رأساً.
ويمكننا أن نفكّر في مثل هذا الرسم البياني $U_s$ على أنّه &quot;توصيلٌ ثابت&quot; (<em>wiring</em>) لشبكة اتصالات، ينبغي أن تكون قادرة على استيعاب أيّ نمطٍ اعتباطي من الاتصال بين $s$ رأساً (حيث يقابل هذا النمط برنامج NAND-CIRC من $s$ سطراً).
ويبيّن أنّه توجد [شبكات توجيه] (https://goo.gl/NnkkjM) بكفاءةٍ تتيح تضمين أيّ دائرة من $s$ رأساً داخل رسم بياني كونيّ من الحجم $O(s \\log s)$، انظر الملاحظات المرجعية <a href="">bibnotescodeasdata</a>{.ref} للمزيد عن هذه المسألة.</p>
</div>
<h2 id="مفسر-python-بلغة-nand-circ-نقاش">مُفسِّر Python بلغة NAND-CIRC (نقاش)</h2>
<p>لإثبات <a href="">eff-bounded-univ</a>{.ref} قمنا بالأساس بترجمة كل سطرٍ في برنامج بايثون لـ<code>EVAL</code> إلى مقطع NAND-CIRC مكافئ.
لكنّ أيّاً من استدلالاتنا لم يكن خاصّاً بالدالة $EVAL$ بعينها.
فمن الممكن ترجمة <em>كلّ</em> برنامج بايثون إلى برنامج NAND-CIRC مكافئ بكفاءةٍ مماثلة.
(وبشكلٍ أكثر تحديداً، إذا كان برنامج بايثون يستغرق $T(n)$ عمليةً على مدخلات طولها $n$ على الأكثر، فإنّ هناك برنامج NAND-CIRC من $O(T(n) \\log T(n))$ سطراً يوافق برنامج بايثون على المدخلات ذات الطول $n$.)
والاضطرار إلى فعل ذلك يتطلّب العناية بالتفاصيل الكثيرة وهو خارج نطاق هذا الكتاب، لكنّ دعني أحاول أن أقنعك بأنّ ذلك ممكن من حيث المبدأ.</p>
<p>للبداية، يمكننا استعمال <a href="https://en.wikipedia.org/wiki/CPython">CPython</a> (التنفيذ المرجعي لبايثون) لتقييم كلّ برامج بايثون باستعمال برنامج <code>C</code>.
ويمكننا أن نجمع هذا مع مُصرِّف C لتحويل برنامج بايثون إلى نكهاتٍ مختلفة من &quot;لغة الآلة&quot;.
إذن، لتحويل برنامج بايثون إلى برنامج NAND-CIRC مكافئ، يكفي أن نُظهر كيفية تحويل برنامج بلغةِ <em>آلةٍ ما</em> إلى برنامج NAND-CIRC مكافئ.
ومن عائلات لغات الآلة المُبسَّطة (وبالتالي المريحة) ما يُعرف بـ_معمارية ARM_ (<em>ARM architecture</em>) التي تُشغّل الكثير من الأجهزة المحمولة بما فيها كلّ أجهزة Android تقريباً.^[ARM اختصار لعبارة &quot;Advanced RISC Machine&quot;، حيث RISC بدورها اختصار لعبارة &quot;Reduced instruction set computer&quot;.]
وهناك لغات آلةٍ أبسط من ذلك، مثل <a href="https://github.com/frasercrmck/llvm-leg">معمارية LEG</a> التي نُفّذ لها واجهةٌ خلفية (backend) لـ<a href="http://llvm.org/">مُصرِّف LLVM</a> (وعليه يمكن أن يكون الهدفَ من ترجمة أيٍّ من <a href="https://en.wikipedia.org/wiki/LLVM#Front_ends">القائمة الكبيرة والمتزايدة</a> من اللغات التي يدعمها هذا المُصرِّف).
ومن الأمثلة الأخرى <a href="http://www.scipr-lab.org/doc/TinyRAM-spec-0.991.pdf">معمارية TinyRAM</a> (أُلهمت بأنظمة البرهان التفاعلي التي سنتناولها في <a href="">chapproofs</a>{.ref})، ومعمارية <a href="https://www.ece.umd.edu/~blj/RiSC/">الحاسوب البسيط بشكلٍ مُضحك</a> (<em>Ridiculously Simple Computer</em>) المُوجَّهة للتعليم.
إنّ المرور واحداً واحداً على مجموعات التعليمات لمثل هذه الحواسيب وترجمتها إلى مقاطع NAND ليس ممتعاً، لكنّه أمرٌ يمكن إنجازه.
وفعلاً، في نهاية المطاف هذا قريبٌ جداً من التحويل الذي يجري عند تحويل شيفرتنا عالية المستوى إلى بوابات سيليكون حقيقية، وهي ليست مختلفة كثيراً عن عمليات برنامج NAND-CIRC.
وفعلاً إنّ أدواتً مثل <a href="http://www.myhdl.org/">MyHDL</a> التي تحوّل &quot;من بايثون إلى السيليكون&quot; أن تُستعمل لتحويل برنامج بايثون إلى برنامج NAND-CIRC.</p>
<p>لغة البرمجة NAND-CIRC ليست سوى أداةٍ تعليمية، ولا أقترح إطلاقاً أنّ كتابة برامج NAND-CIRC أو مُصرِّفاتٍ إلى NAND-CIRC نشاطٌ عمليٌّ أو مفيدٌ أو ممتع.
ما أريده حقاً هو أن أتأكّد من أنّك تفهم لماذا <em>يمكن</em> ذلك، وأنّ لديك الثقة بأنّك ستتمكّن من فعله لو كان حياتك (أو على الأقلّ درجتك) متوقّفةً عليه.
ففهم كيفية تحوّل البرامج المكتوبة في لغاتٍ عالية المستوى مثل بايثون في النهاية إلى تمثيلٍ تجريديٍّ منخفض المستوى مثل NAND أمرٌ أساسي في علوم الحاسوب.</p>
<p>قد يلاحظ القارئ الدقيق أنّ الفقرات أعلاه لم توضّح إلّا لماذا ينبغي أن يكون من الممكن، لكل دالة $f$ <em>معيّنة</em> قابلة للحساب ببايثون، إيجاد برنامج NAND-CIRC <em>معيّنٍ</em> بكفاءةٍ مماثلة يحسب $f$.
لكنّ هذا يبدو أيضاً قاصراً عن هدفنا، وهو كتابة &quot;مُفسِّر Python بلغة NAND&quot;، ما يعني أنّه لكل وسيط $n$، نجد <em>برنامج NAND-CIRC واحداً</em> $UNIV_s$ بحيث إنّ هذا البرنامج، معطى وصفَ برنامج بايثون $P$ ومدخلاً معيّناً $x$ وحدّاً $T$ على عدد العمليات (حيث إنّ أطوال $P$ و$x$ وقيمة $T$ هي كلّها $s$ على الأكثر)، يُرجع نتيجة تنفيذ $P$ على $x$ في $T$ خطوة على الأكثر.
بعد كلّ شيء، التحويل أعلاه يأخذ كلّ برنامج بايثون إلى برنامج NAND-CIRC <em>مختلف</em>، وعليه لا ينتج &quot;برنامج NAND-CIRC واحدٌ يحكمهم جميعاً&quot; (بالإنجليزية: <em>&quot;one NAND-CIRC program to rule them all&quot;</em>)يستطيع تقييم كلّ برامج بايثون حتى تعقيدٍ ما.
لكنّنا نستطيع في الحقيقة أن نُنجز برنامج NAND-CIRC واحداً يقيّم برامج بايثون <em>أيّاً كانت</em>.
والسبب في ذلك هو وجود مُفسِّر Python <em>بلغة Python</em>: برنامج بايثون $U$ يأخذ سلسلةَ بتّات، ويفسّرها كشيفرة بايثون، ثمّ ينفّذ تلك الشيفرة.
وعليه، لا نحتاج إلّا إلى إظهار وجود برنامج NAND-CIRC $U^*$ يحسب الدالة نفسها التي يحسبها برنامج بايثون $U$ بعينه، وهذا سيمنحنا طريقةً لتقييم <em>كل</em> برامج بايثون.</p>
<p>إنّ ما نراه مرّةً بعد أخرى هو مفهوم <em>كونية</em> (<em>universality</em>) الحساب أو <em>الإحالة الذاتية</em> (<em>self reference</em>)، أي أنّ كلّ نماذج الحساب الغنية بما يكفي تعبيريّةٌ بما يكفي لتتمكن من &quot;محاكاة نفسها&quot;.
ولا يمكن المبالغة في أهمية هذه الظاهرة بالنسبة لنظرية الحساب وممارسته، بل وللأبعد من ذلك بكثير، بما في ذلك أسس الرياضيات والمسائل الأساسية في العلم.</p>
<h2 id="أطروحة-كيرش-تورينغ-الفيزيائية-الموسعة-نقاش-pecttsec">أطروحة كيرش-تورينغ الفيزيائية الموسّعة (نقاش) { #PECTTsec }</h2>
<p>لقد رأينا أنّ بوابات NAND (وغيرها من العمليات المنطقية) يمكن تنفيذها باستعمال أنظمةٍ مختلفةٍ تماماً في العالم الفيزيائي.
وماذا عن الاتجاه المعاكس؟
هل تستطيع برامج NAND-CIRC محاكاة أيّ حاسوبٍ فيزيائي؟</p>
<p>ويمكننا أن نأخذ قفزة إيمان ونقرّر أنّ الدوائر المنطقية (أو بما يعادلها برامج NAND-CIRC) تحتضن فعلاً <em>كلَّ</em> الحساب الذي نستطيع تصوّره.
وهذه العبارة (في مجال الدوال اللانهائية، وهو ما سنصادفه في <a href="">chaploops</a>{.ref}) تُنسب عادةً إلى ألونزو كيرش وآلان تورينغ، ويُشار إليها في ذلك السياق بـ_أطروحة كيرش-تورينغ_ (<em>Church-Turing Thesis</em>).
وكما سنتاقش في المحاضرات القادمة، فإنّ أطروحة كيرش-تورينغ ليست مبرهنةً رياضية ولا حتى حدساً رياضياً.
بل إنّها، كالنظريات في الفيزياء، تتعلّق بالنمذجة الرياضية للعالم الحقيقي.
وفي سياق الدوال المنتهية، يمكننا تقديم الفرضية أو التنبّؤ غير الرسمي التالي:</p>
<blockquote>
<p><strong>&quot;أطروحة كيرش-تورينغ الفيزيائية الموسّعة&quot; (PECTT):</strong>  <em>إذا كانت الدالة $F:{0,1}^n \\rightarrow {0,1}^m$ قابلة للحساب في العالم الفيزيائي باستعمال مقدار $s$ من &quot;الموارد الفيزيائية&quot;، فإنّه يمكن حسابها ببرنامج دوائر منطقية من نحو $s$ بوابة.</em></p>
</blockquote>
<p>قد يبدو على نظرية ساذجة أنّ افتراض أنّ نموذجنا المتواضع لبرامج NAND-CIRC أو للدوائر المنطقية يلتقط كلّ الحساب الفيزيائي الممكن هو افتراضٌ متطرّف إلى حدٍّ كبير.
لكنّنا، في أكثر من قرنٍ من تقنيات الحوسبة، لم يبنِ أحدٌ بعد أيّ جهاز حوسبة قابل للتوسّع يتحدّى هذا الفرضية.</p>
<p>لنناقش الآن &quot;التفاصيل الدقيقة&quot; لـ PECTT بمزيدٍ من التفصيل، وكذلك المحاولات (التي لم تنجح حتى الآن) التي طُرحت ضدّه.
لا توجد صياغةٌ رسمية واحدة متّفقٌ عليها عالميّاً على&quot;نحو $s$ من الموارد الفيزيائية&quot;، لكنّ
بإمكاننا تقريب هذا المفهوم بالنظر في حجم أيّ جهاز حوسبة فيزيائي والزمن الذي يستغرقه حساب المخرجات، وطلب أن يُحاكى أيّ جهازٍ من هذا النوع بواسطة دائرة منطقية يكون عدد بواباتها متعدّداً للحدود (بأسّ لا كبير إلى حدٍّ ما) في حجم النظام وفي الزمن الذي يستغرقه كي يعمل.</p>
<p>بعبارة أخرى، يمكننا صياغة PECTT على أنّها تقرّر أنّ أيّ دالة يمكن حسابها بجهاز يشغل حجماً $V$ من الفضاء ويحتاج زمناً $t$ لإتمام الحساب، لا بدّ أن تكون قابلة للحساب بدائرة منطقية عدد بواباتها $p(V,t)$ متعدّدٌ للحدود في $V$ و$t$.</p>
<p>أمّا الصيغة الدقيقة للدالة $p(V,t)$ فلا يوجد اتفاقٌ عام عليها، لكنّه يُقبل عموماً أنّه إذا كانت $f:{0,1}^n \\rightarrow {0,1}$ دالةً <em>صعبة أُسّياً</em> (<em>exponentially hard</em>)، بمعنى أنّها لا تملك برنامج NAND-CIRC من أقلّ من $2^{n/2}$ سطراً مثلاً، فإنّ إظهار جهازٍ فيزيائي يستطيع حساب $f$ في العالم الحقيقي عند أطوال مدخلات متوسطة (مثل $n=500$) سيكون انتهاكاً لـ PECTT.</p>
<div class="callout callout--remark" id="concretepectt">
<p><strong>ملاحظة — ملاحظة متقدّمة: جعل PECTT ملموسة (متقدّمة، اختياري)</strong></p>
<p>يمكننا أن نحاول صياغةً أدقّ لـ PECTT على النحو التالي.
لنفترض أنّ $Z$ نظامٌ فيزيائي يقبل $n$ منبّهات (<em>stimuli</em>) ثنائية، وذا مخرجاً ثنائياً، ويمكن احتواءه في كرةٍ حجمها $V$.
نقول إنّ النظام $Z$ <em>يحسب</em> الدالة $f:{0,1}^n \\rightarrow {0,1}$ خلال $t$ ثانية إذا، كلّما ضبطنا المنبهات على قيمة $x\\in {0,1}^n$، وقسنا المخرج بعد $t$ ثانية، حصلنا على $f(x)$.</p>
<p>عندئذٍ يمكننا صياغة PECTT على أنّها تقرّر أنّه إذا وُجد نظامٌ $Z$ من هذا النوع يحسب $F$ خلال $t$ ثانية، فإنّ هناك برنامج NAND-CIRC يحسب $F$ ولا يتجاوز عدد أسطره $\\alpha(Vt)^2$، حيث $\\alpha$ ثابتُ تطبيع. (ويمكننا أيضاً أن نأخذ في الحسبان صوراً بديلة نستعمل فيها [مساحة السطح] (https://goo.gl/ALgbVS) بدل الحجم، أو نأخذ $(Vt)$ أُسّاً غير $2$. لكنّه لا يوجد أيّ من هذه الاختيارات فرقاً نوعياً في النقاش التالي.)
وبشكلٍ خاص، لنفترض أنّ $f:{0,1}^n \\rightarrow {0,1}$ دالة تتطلّب $2^n/(100n)&gt;2^{0.8n}$ سطراً لأيّ برنامج NAND-CIRC (وهذه دالة موجودة بحكم <a href="">counting-lb</a>{.ref}).
عندئذٍ ستنفي PECTT أنّ حجم نظامٍ يحسب $F$ أو زمنه لا بدّ أن يكون $2^{0.2 n}/\\sqrt{\\alpha}$ على الأقلّ.
وبما أنّ هذه الكمية تنمو أُسّياً في $n$، فإنّه من السهل ضبط المعاملات بحيث لا يستطيع حتى لقيم $n$ المتوسطة الكبيرة أن يتّسع نظامٌ من هذا النوع داخل كوننا.</p>
<p>ولجعل PECTT ملموسةً تماماً، نحتاج إلى أن نقرّر وحدات قياس الزمن والحجم، وثابت التطبيع $\\alpha$.
وإحدى الخيارات المتحفّظة هي أن نفترض أنّه يمكن ضغط الحساب حتى الحدود الفيزيائية المطلقة (وهي حدودٌ تتجاوز التقنية الحالية بمراتبٍ من الرتبة).
وهذا يقابل ضبط $\\alpha=1$ واستعمال [وحدات بلانك] (https://goo.gl/gkpmBF) (Planck units) للحجم والزمن.
فيُعدّ <em>طول بلانك</em> (<em>Planck length</em>) $\\ell_P$ (الذي هو، بمعنى تقريبي، أقصر مسافة يمكن قياسها منطقياً) نحو $2^{-120}$ متراً.
ويُعدّ <em>زمن بلانك</em> (<em>Planck time</em>) $t_P$ (الذي هو الزمن الذي يستغرقه الضوء لقطع طولٍ بلانك واحد) نحو $2^{-150}$ ثانية.
وفي الإعداد أعلاه، إذا كانت دالة $F$ تأخذ مدخلاً بحجم 1KB مثلاً (أي نحو $10^4$ بت، وهو ما يمكن أن يرمّز صورةً نقطيةً بمقاس $100$ في $100$)، ويتطلّب $2^{0.8 n}= 2^{0.8 \\cdot 10^4}$ سطر NAND على الأقلّ لحسابه، فإنّ أيّ نظامٍ فيزيائي يحسبه سيتطلّب إمّا حجماً قدره $2^{0.2\\cdot 10^4}$ من طول بلانك مكعّباً، وهو أكثر من $2^{1500}$ متر مكعّباً، أو سيستغرق $2^{0.2 \\cdot 10^4}$ من وحدات زمن بلانك على الأقلّ، وهو أكبر من $2^{1500}$ ثانية.
ولكي ندرك حجم هذا العدد، لاحظ أنّ عمر الكون لا يتجاوز نحو $2^{60}$ ثانية، ونصف قطره المرصود لا يتجاوز نحو $2^{90}$ متراً.
ويشير النقاش أعلاه إلى أنّه من الممكن <em>إبطال PECTT تجريبياً</em> (<em>empirically falsify</em>) بتقديم نظامٍ أصغر من حجم الكون يحسب دالةً من هذا النوع.</p>
<p>وثمّة بالطبع عدّة عقبات في وجه هذا الإبطال، إحداها أنّنا لا نستطيع في الواقع اختبار النظام على كلّ المدخلات الممكنة. لكنّ بيّّن أنّ بإمكاننا التخلّص من هذه المسألة باستعمال مفاهيم مثل <em>البراهين التفاعلية</em> (<em>interactive proofs</em>) و_فحص البرامج_ (<em>program checking</em>) التي قد نصادفها لاحقاً في هذا الكتاب. وهناك مسألة أخرى،ربّما أوضح، وهي أنّه بينما نعرف وجود دوالٍ صعبة كثيرة، فإنّ في الوقت الحالي لا يوجد <em>دالةٌ صريحة واحدة</em> $F:{0,1}^n \\rightarrow {0,1}$ يمكننا أن <em>نبرهن</em> لها حداً أدنى $\\omega(n)$ (فلا يقل عن $\\Omega(2^n/n)$) على عدد الأسطر التي يحتاجها برنامج NAND-CIRC لحسابها.</p>
</div>
<h3 id="محاولات-إبطال-pectt">محاولات إبطال PECTT</h3>
<p>من إحدى صفات البشرية المُثيرة للإعجاب رفضهم قبول القيود.
في أفضل الحالات يتجلّى ذلك في أشخاص يحقّقون تحدّيات &quot;مستحيلة&quot; منذ زمنٍ طويل، كالطيران أثقل من الهواء، أو إنزال إنسان على القمر، أو الدوران حول الأرض، بل أو حتى حلّ <a href="https://en.wikipedia.org/wiki/Fermat%27s_Last_Theorem">نظرية فيرما الأخيرة</a>.
وفي أسوأ الحالات يتجلّى ذلك في أشخاص يسيرون دائماً في آثار الإخفاقات السابقة محاولين إنجاز مهامّ ثبت استحالتها، مثل بناء <a href="https://en.wikipedia.org/wiki/Perpetual_motion">آلة الحركة الدائمة</a>، أو <a href="https://en.wikipedia.org/wiki/Angle_trisection">ثلاثية الزاوية</a> بالمسطرة والقلم، أو نقض <a href="https://en.wikipedia.org/wiki/Bell%27s_theorem">متراجحة بيل</a>.
وقد جذب أطروحة كيرش-تورينغ الفيزيائية الموسّعة (بصورها المختلفة) كلا النوعين من الأشخاص.
وهذه بعض الأجهزة الفيزيائية التي رُشّح لها بأنّها تحقّق مهامّ حوسبية لا يمكن إنجازها ببرامج NAND-CIRC غير كبيرة إلى حدٍّ كبير:</p>
<ul>
<li>
<p><strong>ترتيبُ المعكرونة:</strong> إحدى أوائل الحدود الدنيا التي يصطدم بها طلاب علوم الحاسوب هي أنّ ترتيب $n$ عدداً يتطلّب إجراء $\\Omega(n \\log n)$ مقارنة. و&quot;ترتيب المعكرونة&quot; (<em>spaghetti sort</em>) هو وصفٌ لحاسوبٍ &quot;ميكانيكي&quot; مقترح يقوم بذلك على نحوٍ أسرع. والفكرة أنّه لترتيب $n$ عدداً $x_1,\\ldots,x_n$ يمكننا قصّ $n$ خيطاً من المعكرونة إلى أطوال $x_1,\\ldots,x_n$، ثمّ إن أمسكناها معاً في أيدينا وأنزلناها إلى سطحٍ مستوٍ، فإنّها ستخرج مرتّبة. وهناك أسبابٌ عديدة لكيل هذا ليس تحدياً حقيقياً لفرضية PECTT، ولن أحرم القارئ من متعة اكتشافها بنفسه.</p>
</li>
<li>
<p><strong>فقاعات الصابون:</strong> إحدى الدوال $F:{0,1}^n \\rightarrow {0,1}$ التي يُفتَرَض أنّها تتطلّب عدداً كبيراً من أسطر NAND لحلّها هي مسألة <em>شجرة شتاينر الإقليدية</em> (<em>Euclidean Steiner Tree</em>). وهذه هي المسألة التي يُعطى فيها $m$ نقطة في المستوى $(x_1,y_1),\\ldots,(x_m,y_m)$ (ولنفرض بإحداثيات صحيحة تمتدّ من $1$ إلى $m$، وعليه يمكن تمثيل القائمة كسلسلة من الحجم $n=O(m \\log m)$) مع عددٍ ما $K$. والهدف هو تحديد ما إذا كان من الممكن وصل كلّ النقط بمقطعات مستقيمة يكون مجموع طولها $K$ على الأكثر. ويفترض أنّ هذه الدالة صعبة لأنّها <em>كاملة في صنف NP</em> (<em>NP complete</em>) — وهو مفهوم سنصادفه لاحقاً في هذه المساق — بل إنّ من المعقول أن نفترض أنّه مع نموّ $m$، ينمو عدد أسطر NAND اللازمة لحساب هذه الدالة أُسّياً في $m$، ما يعني أنّ PECTT تتنبّأ بأنّه إذا كان $m$ كبيراً بما يكفي (مثل بضع مئات مثلاً) لن يستطيع أيّ جهاز فيزيائي حساب $F$.
ومع ذلك، ادّعى بعض الناس أنّ هناك في الواقع جهازاً فيزيائياً بسيطاً جداً يستطيع حلّ هذه المسألة، وأنّه يمكن بناؤه باستعمال بعض أوتاد الخشب والصابون. والفكرة أنّنا إذا أخذنا لوحين زجاجيين ووضعنا بينهما $m$ وتداً خشبياً في المواضع $(x_1,y_1),\\ldots,(x_m,y_m)$، فإنّ فقاعات ستتشكّل تمسّ حوافّها تلك الأوتاد على نحوٍ يُصغّر الطاقة الكلية، وهو ما يبيّن أنّه دالةً في مجموع أطوال المقاطع المستقيمة.
والمشكلة في هذا الجهاز أنّ الطبيعة، تماماً كالبشر، كثيراً ما تعلق في &quot;المتفارعات المحلية&quot; (local optima).
أي أنّ التهيئة الناتجة لن تكون هي التهيئة التي تحقّق الحدّ الأدنى المطلق للطاقة الكلية، بل ستكون تهيئةً لا يمكن تحسينها بتغييراتٍ محلية.
وقد أجرى <a href="http://www.scottaaronson.com/papers/npcomplete.pdf">آرونسون</a> تجاربً فعلية (انظر <a href="">aaronsonsoapfig</a>{.ref})، فرأى أنّه بينما ينجح هذا الجهاز غالباً مع ثلاثة أو أربعة أوتاد، إلا أنّه يبدأ بإعطاء نتائج دون الأمثلية ما إن يزيد عدد الأوتاد عن ذلك.</p>
</li>
</ul>
<p><img src="/arabic-cs-library/images/introtcs/fig-aaronsonsoapbubble.webp" alt="Scott Aaronson tests a candidate device for computing Steiner trees using soap bubbles.">{#aaronsonsoapfig .margin  }</p>
<ul>
<li>
<p><strong>حوسبة الـ DNA.</strong> اقترح الناس استعمال خصائص الـ DNA لحلّ مسائل حوسبية صعبة. والمزايا الرئيسية للـ DNA هي القدرة، من حيث المبدأ، على ترميز كثيرٍ من المعلومات في مساحةٍ فيزيائية صغيرة نسبياً، وكذلك إجراء الحساب على هذه المعلومات بطريقة شديدة التوازي. ووقت كتابة هذا النص، كان قد <a href="http://science.sciencemag.org/content/337/6102/1628.full">أُبْرِزَت</a> إمكانية استعمال الـ DNA لتخزين نحو $10^{16}$ بتّاً من المعلومات في منطقة نصف قطرها نحو مليمتر، مقابل نحو $10^{10}$ بتّاً بأفضل تقنية أقراصٍ صلبة معروفة. وهذا لا يضع تحدّياً حقيقياً أمام PECTT، لكنّه يشير إلى ضرورة التحفّظ في اختيار الثابت وعدم افتراض أنّ تقنيات الأقراص الصلبة + السيليكون الحالية هي الأفضل الممكن على الإطلاق.^[كنا متحفّظين إلى حدٍّ كبير في المعاملات المقترحة لـ PECTT، بافتراضنا أنّه يُمكن تخزين ما يصل إلى $\\ell_P^{-2}10^{-6} \\sim 10^{61}$ بتّاً في منطقة نصف قطرها مليمتر.]</p>
</li>
<li>
<p><strong>الحواسيب المستمرة/الحقيقية.</strong> يُوصف العالم الفيزيائي غالباً باستعمال كمّياتٍ مستمرة مثل الزمن والفضاء، واقترح الناس أنّ الأجهزة التناظرية (<em>analog</em>) قد تكون لها وصولٌ مباشر إلى الحساب بالكمّيات ذات القيمة الحقيقية، وأنّها ستكون بطبيعتها أقوى من النماذج المتفرّقة مثل آلات NAND.
أمّا ما إذا كان العالم الفيزيائي &quot;الحقيقي&quot; مستمراً أم متفرّقاً فهو سؤالٌ مفتوح.
وفعلاً، لا نعرف حتى كيف نصوغ هذا السؤال بدقّة، فضلاً عن الإجابة عليه. لكنّه، بغضّ النظر عن الإجابة، يبدو واضحاً أنّ الجهد المبذول لقياس كمّيةٍ مستمرة يزداد مع مستوى الدقة المطلوب، وعليه لا يوجد &quot;غداءٌ مجاني&quot; ولا طريقة لتجاوز PECTT باستعمال مثل هذه الآلات (انظر أيضاً <a href="http://www.cs.princeton.edu/~ken/MCS86.pdf">هذه الورقة</a>). ويرتبط بذلك مقترحات تُعرف بـ&quot;الحساب الفائق&quot; (<em>hypercomputing</em>) أو &quot;حواسيب زينو&quot; (<em>Zeno's computers</em>)، والتي تحاول استغلال استمرارية الزمن بأن تنفّذ العملية الأولى في ثانية، والثانية في نصف ثانية، والثالثة في ربع ثانية وهكذا.. وتفشل هذه لأسبابٍ مشابهة لتلك التي تضمن أنّ أخيل سيلحق بالسلحفاة في النهاية رغم إشكال زينو الأصلي.</p>
</li>
<li>
<p><strong>حاسوب النسبية والسفر عبر الزمن.</strong> افترضت الصياغة أعلاه وجود مفهوم الزمن، لكنّ في نظرية النسبية الزمن نسبيٌّ بالنسبة إلى المراقب. ومن أساليب حلّ المسائل الصعبة ترك الحاسوب يعمل زمناً طويلاً من منظور <em>المراقب هو</em>، مع الحرص على أن يكون ذلك زمناً قصيراً فعلاً من منظور <em>منظورنا</em>. وإحدى طرق ذلك أن يقوم المستخدم بتشغيل الحاسوب ثمّ يذهب لجريةٍ سريعة بسرعة قريبة من سرعة الضوء قبل أن يطّلع على حالته. وبحسب سرعة تحرّكك، قد يقابل بضع ثوانٍ من منظور المستخدم قروناً من زمن الحاسوب (بل ربّما ينتهي من تحديث نظام تشغيله Windows!). طبعاً أنّ المقصد هنا هو أنّ الطاقة المطلوبة من المستخدم تتناسب مع مدى اقترابه من سرعة الضوء. وهناك مقترحٌ أكثر إثارة للاهتمام وهو استعمال السفر عبر الزمن عبر <em>المنحنيات الزمنية المغلقة (CTCs)</em>. وفي هذه الحالة يمكننا تشغيل حسابٍ طويلٍ اعتباطيّ بأن نُجري بعض الحسابات، ونتذكّر الحالة الراهنة، ثمّ نسافر إلى الوراء في الزمن لنكمل من حيث توقّفنا. وفعلاً، إن كانت CTCs موجودة، فمن المحتمل ألّا نضطر إلى مراجعة PECTT (لكنّ في هذه الحالة سأسافر ببساطة إلى الوراء في الزمن وأحرّر هذه الملاحظات، وبذلك أستطيع أن أدّعي أنّني لم أحزرها من الأصل أصلاً...)</p>
</li>
<li>
<p><strong>البشر.</strong> نظام حوسبةٍ آخر اقترح بوصفه مثالاً مضاداً لـ PECTT هو حاسوبٌ يزن 3 أرطال ونصف قطره نحو 0.1m، وهو الدماغ البشري. يستطيع البشر التنقّل والحديث والإحساس وفعل أمورٍ أخرى لا تُنجَز عادةً برامج NAND-CIRC، لكنّهم هل يستطيعون حساب دوال جزئية لا تستطيعها برامج NAND-CIRC؟
وهناك بالطبع مهامّ حوسبية يؤديها <em>حالياً</em> البشر أفضل من الحواسيب (مثلاً لعب بعض <a href="http://www.theverge.com/2016/11/4/13518210/deepmind-starcraft-ai-google-blizzard">ألعاب الفيديو</a> في الوقت الحالي)، لكنّ، بناءً على فهمنا الحالي للدماغ، لا يملك البشر (ولا الحيوانات الأخرى) أيّ ميزة حوسبية <em>فطرية</em> على الحواسيب.
يحتوي الدماغ على نحو $10^{11}$ خلية عصبية (<em>neuron</em>)، كلٌّ منها يعمل بسرعة نحو $1000$ عملية في الثانية. ومن ثمّ فإنّ التقريب الأوّل الخام هو أنّ دائرةً منطقية من نحو $10^{14}$ بوابة تستطيع محاكاة ثانيةٍ واحدة من نشاط الدماغ.^[هذا تقريبٌ خام جداً قد يكون خاطئاً بمراتب رتبة في أيّ من الاتجاهين. فمن جهةٍ، هناك بنى أخرى في الدماغ عدا الخلايا العصبية قد يحتاج المرء إلى محاكاتها، ممّا يستلزم تكلفةً أعلى. ومن جهةٍ أخرى، ليس واضحاً البتّة أنّنا نحتاج إلى استنساخ الدماغ بالكامل كي نحقّق المهامّ الحوسبية نفسها التي يحقّقها.]
ولاحظ أنّ وجود مثل هذه الدائرة (على الأرجح) لا يعني أنّ من السهل <em>العثور</em> عليها.
بعد كلّ شيء، استغرق تطوّرُ هذه الدائرة مليارات السنين.
وتركّز كثير من البحوث الحديثة في الذكاء الاصطناعي على إيجاد برامج تكرّر بعض قدرات الدماغ، ويحتاج اكتشافها إلى جهدٍ حوسبي هائل، غير أنّ هذه البرامج غالباً ما يتبيّن أصغر بكثير من التقديرات المتحفّظة أعلاه. فمثلاً، وقت كتابة هذا النص، تحتوي <a href="https://arxiv.org/pdf/1609.08144.pdf">الشبكة العصبية للترجمة الآلية</a> من Google على نحو $10^4$ عقدة (ويمكن محاكاتها ببرنامج NAND-CIRC من حجمٍ مماثل). ومنذ قديم الزمان، ادّعى الفلاسفةُ والكهنةُ وكثيرون غيرهم أنّ في البشر شيئاً لا يمكن لآلاتٍ ميكانيكية مثل الحواسيب استيعابه؛ وسواء أكان الأمر كذلك أم لا، فإنّ الدليل ضعيف على أنّ البشر يستطيعون أداء مهامّ حوسبية يستحيل على الحواسيب من تعقيدٍ مماثل إنجازها بطبيعتها.^[هناك بعض العلماء المعروفين الذين <a href="http://www.telegraph.co.uk/science/2017/03/14/can-solve-chess-problem-holds-key-human-consciousness/">دعوا</a> أنّ للبشر مزايا حوسبية فطرية على الحواسيب. انظر أيضاً <a href="https://arxiv.org/abs/1508.05929">هذه</a>.]</p>
</li>
<li>
<p><strong>الحوسبة الكمّية.</strong> يأتي أقوى هجوم على أطروحة كيرش-تورينغ الفيزيائية الموسّعة من فكرة <em>الحوسبة الكمّية</em> (<em>quantum computing</em>).
وقد انطلقت الفكرة من الملاحظة أنّ الأنظمة ذات التأثيرات الكمّية القوية يصعب جداً محاكاتها على حاسوب.
وبقلب هذه الملاحظة رأساً على عقب، اقترح الناس استعمال مثل هذه الأنظمة لإجراء حسابات لا نعرف كيف نجريها بغير ذلك.
ووقت كتابة هذا النص، لم تبنَ بعد حواسيب كمّية قابلة للتوسّع، لكنّها إمكانيةٌ مذهلة، ولا تبدو مناقضةً لأيّ قانونٍ من قوانين الطبيعة المعروف.
وسنتناول الحوسبة الكمّية بمزيدٍ من التفصيل بكثير في <a href="">quantumchap</a>{.ref}.
وينطوي نمذجة الحوسبة الكمّية على توسيع نموذج الدوائر المنطقية إلى <em>دوائر كمّية</em> (<em>Quantum circuits</em>) ذات بوابةٍ واحدةٍ إضافية (خاصة جداً). غير أنّ الخلاصة الرئيسة هي أنّه بينما تُشير الحوسبة الكمّية إلى حاجتنا إلى تعديل PECTT، فإنّها <em>لا</em> تتطلّب مراجعةً كاملة لنظرةنا إلى العالم. وفعلاً، يبقى كلّ محتوى هذا الكتاب تقريباً كما هو سواء أكان نموذج الحوسبة الأساسيّ دوائر منطقية أم دوائر كمّية.</p>
</li>
</ul>
<div class="callout callout--remark" id="pcettcrypto">
<p><strong>ملاحظة — أطروحة كيرش-تورينغ الفيزيائية الموسّعة والتعمية</strong></p>
<p>ولو كانت الصياغة الدقيقة لـ PECTT نفسها، فضلاً عن فهم صحّتها، ما تزال موضوع بحثٍ نشط، فإنّ بعض صورها مفترضةٌ ضمنياً في الممارسة بالفعل.
تعتمد الحكوماتُ والشركاتُ والأفرادُ حالياً على <em>التعمية</em> (<em>cryptography</em>) لحماية بعض أثمن أصولهم، بما فيها أسرار الدولة، والتحكّم في أنظمة الأسلحة والبنية التحتية الحرجة، وتأمين التجارة، وحماية سرّية المعلومات الشخصية.
وفي التعمية التطبيقية، يُصادف غالباً عباراتٌ مثل &quot;النظام المُعمّى $X$ يوفّر 128 بتّاً من الأمان&quot;. وما تعنيه هذه العبارة حقاً هو أنّ <strong>(أ)</strong> يُفتَرَض أنّه لا توجد دائرة منطقية (أو، بما يعادلها، برنامج NAND-CIRC) من حجم أصغر بكثير من $2^{128}$ يستطيع كسر $X$، و <strong>(ب)</strong> نفترض أنّه لا توجد آلية فيزيائية أخرى تستطيع أداء أفضل، ومن ثمّ فإنّ كسر $X$ سيتطلّب نحو $2^{128}$ من &quot;الموارد&quot;.
ونقول &quot;يُفتَرَض&quot; لا &quot;مُثبَت&quot; لأنّه، بينما يمكننا صياغة عبارة أنّ كسر النظام لا يمكن إنجازه بدائرة من $s$ بوابة بوصفها حدساً رياضياً دقيقاً، فإنّنا في الوقت الحالي عاجزون عن <em>إثبات</em> عبارةٍ من هذا النوع لأيّ نظام تعميةٍ غير تافه.
وهذا مرتبطٌ بسؤال $\\mathbf{P}$ مقابل $\\mathbf{NP}$ الذي سنتناوله في الفصول القادمة.
وسنستكشف التعمية في <a href="">chapcryptography</a>{.ref}.</p>
</div>
<blockquote>
<h3 id="recap">{ .recap }</h3>
</blockquote>
<ul>
<li>يمكننا أن نفكّر في البرامج على أنّها تصف <em>عمليةً</em> (<em>process</em>)، وكذلك ببساطة قائمةَ رموزٍ يمكن اعتبارها <em>بياناتٍ</em> (<em>data</em>) يمكن إطعامها كمدخلات لبرامج أخرى.</li>
<li>يمكننا كتابة برنامج NAND-CIRC يقيّم برامج NAND-CIRC اعتباطية (أو بما يعادلها دائرةً تقيّم دوائر أخرى). وعلاوةً على ذلك، فإنّ فاقد الكفاءة في ذلك ليس كبيراً إلى حدٍّ ما.</li>
<li>يمكننا حتى كتابة برنامج NAND-CIRC يقيّم برامجٍ بلغات برمجة أخرى مثل Python وC وLisp وJava وGo إلخ.</li>
<li>بقفزة إيمان، يمكننا أن نفترض أنّ عدد البوابات في أصغر دائرة تحسب دالة $f$ يلتقط نحو Quantity من الموارد الفيزيائية اللازمة لحساب $f$. وتُعرف هذه العبارة بـ_أطروحة كيرش-تورينغ الفيزيائية الموسّعة (PECTT)_.</li>
<li>تلتقط الدوائر المنطقية (أو بما يعادلها برامج AON-CIRC أو NAND-CIRC) مجموعةً مدهشة من نماذج الحوسبة المتنوّعة. وأقوى تحدٍّ معروف حالياً لـ PECTT يأتي من إمكانية استعمال التأثيرات الميكانيكية الكمّية لتسريع الحساب، وهو نموذجٌ يُعرف بـ_الحواسيب الكمّية_ (<em>quantum computers</em>).</li>
</ul>
<p><img src="/arabic-cs-library/images/introtcs/lec_04_code_and_data-6.webp" alt="/images/introtcs/lec_04_code_and_data-6.webp">{#finiterecapfig }</p>
<h2 id="خلاصة-الجزء-الأول-الحوسبة-المنتهية">خلاصة الجزء الأول: الحوسبة المنتهية</h2>
<p>يُختم هذا الفصل الجزء الأول من الكتاب الذي يتناول <em>الحوسبة المنتهية</em> (<em>finite computation</em>) (أي حساب الدوال التي تُسقِط عدداً ثابتاً من المدخلات المنطقية إلى عددٍ ثابتٍ من المخرجات المنطقية).
والخلاصات الرئيسة من <a href="">compchap</a>{.ref} و<a href="">finiteuniversalchap</a>{.ref} و<a href="">codeanddatachap</a>{.ref} هي كما يلي (انظر أيضاً <a href="">finiterecapfig</a>{.ref}):</p>
<ul>
<li>
<p>يمكننا تعريف رسميّ فكرة أنّ الدالة $f:{0,1}^n \\rightarrow {0,1}^m$ قابلة للحساب باستعمال $s$ عملية أساسية. ولا يهمّ كثيراً ما إذا كانت هذه العمليات هي AND/OR/NOT أو NAND أو أساساً كونيّاً آخر. يمكننا وصف حسابٍ من هذا النوع إمّا باستعمال <em>دائرة</em> (<em>circuit</em>) وإمّا باستعمال <em>برنامج سطريّ</em> (<em>straight-line program</em>).</p>
</li>
<li>
<p>نُعرّف $SIZE_{n,m}(s)$ على أنّها مجموعة <em>الدوال</em> التي يمكن حسابها بدوائر NAND من $s$ بوابة على الأكثر. وهذه المجموعة تساوي مجموعة الدوال القابلة للحساب ببرنامج NAND-CIRC من $s$ سطراً على الأكثر، بحدٍّ ثابت في $s$ (لن نعره بالينا)؛ وهي أيضاً نفسها مجموعة الدوال القابلة للحساب بدائرة منطقية من $s$ بوابة AND/OR/NOT على الأكثر. والصنف $SIZE_{n,m}(s)$ مجموعة من <em>الدوال</em> لا من البرامج/الدوائر.</p>
</li>
<li>
<p><em>كلُّ</em> دالة $f:{0,1}^n \\rightarrow {0,1}^m$ يمكن حسابها بدائرة من <em>على الأكثر</em> $O(m \\cdot 2^n / n)$ بوابة. و_بعضُ_ الدوال تتطلّب <em>على الأقلّ</em> $\\Omega(m \\cdot 2^n /n)$ بوابة. ونُعرّف $SIZE_{n,m}(s)$ على أنّها مجموعة الدوال من \${0,1}^n$ إلى \${0,1}^m$ التي يمكن حسابها باستعمال $s$ بوابة على الأكثر.</p>
</li>
<li>
<p>يمكننا وصف دائرة/برنامج $P$ كسلسلة. ولكل $s$، هناك دائرة/برنامج <em>كونيّ</em> (<em>universal</em>) $U_s$ يستطيع تقييم برامج من الطول $s$ معطى وصفَها كسلاسل. ويمكننا استعمال هذا التمثيل أيضاً <em>لعدِّ</em> عدد الدوائر التي عدد بواباتها $s$ على الأكثر، ومن ثمّ إثبات أنّ بعض الدوال لا يمكن حسابها بدوائر أصغر حجماً من الأسّي.</p>
</li>
<li>
<p>إذا كانت هناك دائرة من $s$ بوابة تحسب دالة $f$، فإنّنا نستطيع بناء جهاز فيزيائي لحساب $f$ باستعمال $s$ مكوّناً أساسياً (مثل الترانزستورات). و&quot;أطروحة كيرش-تورينغ الفيزيائية الموسّعة&quot; تقرّر أنّ الاتجاه المعاكس صحيح أيضاً: إذا كانت $f$ دالة يتطلّب <em>كلّ</em> دائرةٍ فيها $s$ بوابة على الأقلّ، فإنّ <em>كلّ</em> جهاز فيزيائي لحساب $f$ سيتطلّب نحو $s$ من &quot;الموارد الفيزيائية&quot;. وأبرز تحدٍّ لـ PECTT هو <em>الحوسبة الكمّية</em>، وسنتناولها في <a href="">quantumchap</a>{.ref}.</p>
</li>
</ul>
<p><strong>معاينة سريعة:</strong> في الجزء التالي سنتناول كيفية نمذجة المهامّ الحوسبية على <em>مدخلاتٍ غير مقيّدة</em> (<em>unbounded</em>)، حيث تُصنَّف بدوال $F:{0,1}^* \\rightarrow {0,1}^<em>$ (أو $F:{0,1}^</em> \\rightarrow {0,1}$) تستطيع أن تأخذ عدداً غير مقيَّد من المدخلات المنطقية.</p>
<div class="exercises"><h2 id="التمارين">التمارين</h2>
<div class="callout callout--exercise" id="reading-comp">
<p><strong>تمرين</strong></p>
<p>أيٌّ من العبارات التالية خاطئة؟</p>
<p>a. يوجد برنامج NAND-CIRC من $O(s^3)$ سطراً، يُعطى كمدخل البرنامج $P$ من $s$ سطراً في تمثيل قائمة القوالب، ويحسب مخرجات $P$ حين تكون كلّ مدخلاته مساوية لـ$1$.</p>
<p>b. يوجد برنامج NAND-CIRC من $O(s^3)$ سطراً، يُعطى كمدخل البرنامج $P$ من $s$ محرفاً مُرمَّزاً كسلسلة من $7s$ بت باستخدام ترميز ASCII، ويحسب مخرجات $P$ حين تكون كلّ مدخلاته مساوية لـ$1$.</p>
<p>c. يوجد برنامج NAND-CIRC من $O(\\sqrt{s})$ سطراً، يُعطى كمدخل البرنامج $P$ من $s$ سطراً في تمثيل قائمة القوالب، ويحسب مخرجات $P$ حين تكون كلّ مدخلاته مساوية لـ$1$.</p>
</div>
<blockquote>
<h3 id="exercise-titlequotدالة-المساواةquot-equals">{.exercise title=&quot;دالة المساواة&quot; #equals}</h3>
</blockquote>
<p>لكل $k \\in \\N$، برهن أنّ هناك برنامج NAND-CIRC من $O(k)$ سطراً يحسب الدالة $EQUALS_k:{0,1}^{2k} \\rightarrow {0,1}$ حيث $EQUALS(x,x')=1$ إذا وفقط إذا كان $x=x'$.</p>
<blockquote>
<h3 id="exercise-titlequotالدالة-المساوية-لدالة-ثابتةquot-equalstwo">{.exercise title=&quot;الدالة المساوية لدالة ثابتة&quot; #equalstwo}</h3>
</blockquote>
<p>لكل $k \\in \\N$ و$x' \\in {0,1}^k$، برهن أنّ هناك برنامج NAND-CIRC من $O(k)$ سطراً يحسب الدالة $EQUALS_{x'} : {0,1}^k \\rightarrow {0,1}$ التي على المدخل $x\\in {0,1}^k$ تُخرج $1$ إذا وفقط إذا كان $x=x'$.</p>
<div class="callout callout--exercise" id="countingmultibitex">
<p><strong>تمرين — الحدّ الأدنى بالعدّ للدوال متعدّدة البتات</strong></p>
<p>برهن أنّه يوجد عدد $\\delta&gt;0$ بحيث إنّ لكل $n$ كبيرٍ بما يكفي ولكل $m$، توجد دالة $f:{0,1}^n \\rightarrow {0,1}^m$ تتطلّب $\\delta m \\cdot 2^n / n$ بوابة NAND على الأقلّ لحسابها. انظر الحاشية للتلميح.^[كم عدد الدوال من \${0,1}^n$ إلى \${0,1}^m$ الموجودة؟ ولاحظ أنّ تعريفنا للدوائر يتطلّب أن يقابل كلّ مخرجٍ بوابةً فريدة، وإنّ هذا القيد يُحدث فرقاً إضافياً لا يتجاوز $O(m)$ في عدد البوابات.]</p>
</div>
<div class="callout callout--exercise" id="sizehiearchyex">
<p><strong>تمرين — مبرهنة تدرّج الحجم للدوال متعدّدة البتات</strong></p>
<p>برهن أنّه يوجد عدد $C$ بحيث إنّ لكل $n,m$ و$n+m &lt; s &lt; m\\cdot 2^n / (Cn)$، توجد دالة $f \\in SIZE_{n,m}(C\\cdot s) \\setminus SIZE_{n,m}(s)$.
انظر الحاشية للتلميح.^[اتبع برهان <a href="">sizehiearchythm</a>{.ref}، مع استبدال استعمال حجّة العدّ بـ<a href="">countingmultibitex</a>{.ref}.]</p>
</div>
<div class="callout callout--exercise" id="efficientrepresentationex">
<p><strong>تمرين — التمثيل الأكفأ للدوائر وحدٌّ أعلى عدٍّّ أدقّ</strong></p>
<p>استعمل أفكار <a href="">efficientrepresentation</a>{.ref} لإظهار أنّه لكل $\\epsilon&gt;0$ ولكل $s,n,m$ كبيرين بما يكفي،
$$|SIZE_{n,m}(s)| &lt; 2^{(2+\\epsilon)s \\log s + n\\log n + m\\log s};.$$
استنتج أنّ الثابت الضمني في <a href="">program-count</a>{.ref} يمكن جعله يقترب من $5$ إلى حدٍّ لا نهائي.
انظر الحاشية للتلميح.^[باستعمال تمثيل قائمة التجاور، يمكن تمثيل رسمٍ بياني فيه $n$ رأساً ذات درجة داخلية صفرية و$s$ رأساً ذات درجة داخلية اثنتين بنحو $2s\\log(s+n) \\leq 2s (\\log s + O(1))$ بتّاً.
ويمكن تحديد تسمية رؤوس المدخلات $n$ والمخرجات $m$ بقائمة من $n$ تسمية في $[n]$ ومن $m$ تسمية في $[m]$.
]</p>
</div>
<div class="callout callout--exercise" id="efficientlbex">
<p><strong>تمرين — حدٌّ أدنى بالعدّ أدقّ</strong></p>
<p>برهن أنّه لكل $\\delta&lt; 1/2$، إذا كان $n$ كبيراً بما يكفي، فإنّ هناك دالة $f:{0,1}^n \\rightarrow {0,1}$ بحيث $f \\not\\in SIZE_{n,1}\\left( \\tfrac{\\delta 2^n}{n} \\right)$.
انظر الحاشية للتلميح.^[<em>تلميح:</em> استعمل نتائج <a href="">efficientrepresentationex</a>{.ref} والحقيقة أنّه في هذا النطاق $m=1$ و$n\\ll s$.]</p>
</div>
<blockquote>
<h3 id="exercise-titlequotالدوال-العشوائية-صعبةquot-rand-lb-id">{.exercise title=&quot;الدوال العشوائية صعبة&quot; #rand-lb-id}</h3>
</blockquote>
<p>لنفترض $n&gt;1000$ وأنّنا اخترنا دالة $F:{0,1}^n \\rightarrow {0,1}$ عشوائياً، باختيار قيمة $F(x)$ لكل $x\\in {0,1}^n$ لتكون نتيجة رمي عملةٍ مستقيمةٍ مستقلّة. برهن أنّ احتمال وجود برنامج من $2^n/(1000n)$ سطراً يحسب $F$ هو $2^{-100}$ على الأكثر.^[<strong>تلميح:</strong> طريقةٌ مكافئة لقول هذا إنّ عليك إثبات أنّ مجموعة الدوال التي يمكن حسابها باستعمال $2^n/(1000n)$ سطراً على الأكثر تحتوي على عدداً أصغر من $2^{-100}2^{2^n}$. هل ترى لماذا؟]</p>
<div class="callout callout--exercise">
<p><strong>تمرين</strong></p>
<p>الآتي عبارة عن قالب يمثّل برنامج NAND:  $(3, 1, ((3, 2, 2),   (4, 1, 1), (5, 3, 4),   (6, 2, 1),  (7, 6, 6), (8, 0, 0), (9, 7, 8),   (10, 5, 0),   (11, 9, 10)))$.</p>
<ol>
<li>
<p>اكتب جدولاً بالقيم الثماني $P(000)$ و$P(001)$ و$P(010)$ و$P(011)$ و$P(100)$ و$P(101)$ و$P(110)$ و$P(111)$ بهذا الترتيب.</p>
</li>
<li>
<p>صِف ما يفعله البرنامج بالكلمات.</p>
</li>
</ol>
</div>
<div class="callout callout--exercise" id="XOREVAL">
<p><strong>تمرين — EVAL مع XOR</strong></p>
<p>لكل $n$ كبيرٍ بما يكفي، لتكن $E_n:{0,1}^{n^2} \\rightarrow {0,1}$ الدالة التي تأخذ سلسلةً من الطول $n^2$ ترمّز زوجاً $(P,x)$ حيث $x\\in {0,1}^n$ و$P$ برنامج NAND من $n$ مدخلاً ومخرجٍ واحد، ومن $n^{1.1}$ سطراً على الأكثر، وتُرجع مخرج $P$ على $x$.^[لاحظ أنّه إذا كان $n$ كبيراً بما يكفي، فإنّ تمثيل مثل هذا الزوج بـ$n^2$ بتّاً سهل، إذ يمكننا تمثيل البرنامج باستعمال $O(n^{1.1}\\log n)$ بتّاً، ويمكننا دائماً تبطين تمثيلنا ليصل طوله بالضبط إلى $n^2$.] أي إنّ $E_n(P,x)=P(x)$.</p>
<p>برهن أنّه لكل $n$ كبيرٍ بما يكفي، <em>لا توجد</em> دائرة XOR $C$ تحسب الدالة $E_n$، حيث تملك دائرة XOR البوابة $XOR$ إضافةً إلى الثابتين $0$ و$1$ (انظر <a href="">xorex</a>{.ref}). أي برهن أنّه يوجد ثابث $n_0$ بحيث إنّ لكل $n&gt;n_0$ ولكل دائرة XOR $C$ من $n^2$ مدخلاً ومخرجٍ واحد، يوجد زوج $(P,x)$ بحيث $C(P,x) \\neq E_n(P,x)$.</p>
</div>
<div class="callout callout--exercise" id="learningcircuitsex">
<p><strong>تمرين — تعلّم الدوائر (تحدٍّ، اختياري، يفترض خلفيةً أكبر)</strong></p>
<p>(يفترض هذا التمرين خلفيةً في نظرية الاحتمالات و/أو تعلّم الآلة قد لا تكون لديك في هذه المرحلة. لا تتردّد في العودة إليه لاحقاً، وبخاصةٍ بعد خاصّاً بعد أن مررت على <a href="">probabilitychap</a>{.ref}.)
في هذا التمرين سنستعمل حدّنا على عدد الدوائر من الحجم $s$ لنُظهر أنّه (إذا أهملنا كلفة الحساب) كلّ دائرةٍ من هذا النوع يمكن <em>تعلّمها</em> (<em>learned</em>) من عددٍ ليس كبيراً من عينات التدريب.
وبشكلٍ تحديد، إذا وجدنا دائرةً من الحجم $s$ تُصنِّف مجموعة تدريبٍ من $O(s \\log s)$ عيّنةٍ من بعض التوزيع $D$ تصنيفاً صحيحاً، فإنّه مضمونٌ أن تُحسن الأداء على التوزيع $D$ كلّه.
ولأنّ الدوائر المنطقية تُمثّل عملياتٍ فيزيائية كثيرة جداً (وربّما كلّها، إذا صحّت أطروحة كيرش-تورينغ الفيزيائية الموسّعة [<em>المتنازعة في المسألة</em>])، فإنّ هذا يُظهر أنّ كلّ تلك العمليات يمكن تعلّمها أيضاً (مع إهمال كلفة الحساب مرّةً أخرى لإيجاد مُصنِّف يُحسن الأداء على بيانات التدريب).</p>
<p>لنكن $D$ أيّ توزيع احتمالي على \${0,1}^n$، ولتكن $C$ دائرة NAND من $n$ مدخلاً ومخرجٍ واحد ومن الحجم $s \\geq n$.
برهن أنّه يوجد ثابث $c$ بحيث إنّ الاحتمال $0.999$ على الأقلّ، ينطبق ما يلي: إذا كان $m = c s \\log s$ واختيرت $x_0,\\ldots,x_{m-1}$ باستقلالٍ من $D$، فإنّ لكل دائرة $C'$ بحيث $C'(x_i)=C(x_i)$ عند كل $i \\in [m]$، يكون $\\Pr_{x \\sim D}[C'(x) \\leq C(x)] \\leq 0.99$.</p>
<p>بعبارة أخرى، إذا كانت $C'$ هي ما يُعرف بـ&quot;مُقلِّل المخاطرة التجريبي&quot; (<em>empirical risk minimizer</em>) التي توافق $C$ على كلّ أمثلة التدريب $x_0,\\ldots,x_{n-1}$، فإنّها أيضاً ستوافق $C$ باحتمالٍ كبير على العينات المسحوبة من التوزيع $D$ (أي أنّها &quot;تعمّم&quot;، باستعمال لغة تعلّم الآلة). انظر الحاشية للتلميح.^[<em>تلميح:</em> استعمل حدّنا على عدد البرامج/الدوائر من الحجم $s$ (<a href="">program-count</a>{.ref})، وكذلك حدّ Chernoff (<a href="">chernoffthm</a>{.ref}) وحدّ الاتحاد.]</p>
</div>
<h2 id="ملاحظات-مرجعية-bibnotescodeasdata">ملاحظات مرجعية {#bibnotescodeasdata }</h2>
<p>الدالة $EVAL$ تُعرف عادةً باسم <em>دائرةٍ كونية</em> (<em>universal circuit</em>).
وليس التنفيذ الذي نصفه هو الأكفأ المعروف.
وقد أظهر Valiant [@Valiant1976] أوّلاً دائرةً كونية من الحجم $O(n \\log n)$ حيث $n$ هو حجم المدخل.
وقد لقيت الدوائر الكونية في السنوات الأخيرة دوافع جديدة بفضل تطبيقاتها في التعمية، انظر [@lipmaa2016valiant, @Gunther2017] .</p>
<p>بينما رأينا أنّ &quot;أغلب&quot; الدوال التي تُسقِط $n$ بتّاً إلى بتّ واحد تتطلّب دوائر ذات حجم أسّي $\\Omega(2^n/n)$، فإنّنا في الواقع لا نعرف أيّ دالةٍ <em>صريحة</em> (<em>explicit</em>) يمكننا أن <em>نبرهن</em> أنّها تتطلّب، مثلاً، حجماً $n^{100}$ أو حتى $100n$. ووقتَ الحاضر، أقوى حدٍّ أدنى من هذا النوع نعرفه هو أنّ هناك دوالاً بدوال $n$ متغيّراً بسيطةً وصريحة إلى حدٍّ كبير تتطلّب $(5-o(1))n$ سطراً على الأقلّ لحسابها، انظر <a href="http://www.wisdom.weizmann.ac.il/~ranraz/publications/P5nlb.pdf">هذه الورقة لـIwama وزملائه</a> وكذلك <a href="http://logic.pdmi.ras.ru/~kulikov/papers/2012_5n_lower_bound_cie.pdf">هذا العمل الأحدث لـKulikov وزملائه</a>.
وإثبات الحدود الدنية للنماذج المقيّدة من الدوائر هو مجال بحثٍ مثير للاهتمام للغاية، ويقدّم كتاب Jukna [@Jukna12] (وانظر أيضاً Wegener [@wegener1987complexity]) مدخلاً ومراجعةً ممتازين إلى حدٍّ كبير.
وتعلّمتُ برهان مبرهنة تدرّج الحجم (<a href="">sizehiearchythm</a>{.ref}) من Sasha Golovnev.</p>
<p>منشور مدوّنة Scott Aaronson بعنوان <a href="http://www.scottaaronson.com/blog/?p=3327">how information is physical</a> نقاشٌ جيّد حول المسائل المتعلقة بالفيزياء كيرش-تورينغ الفيزيائية الموسّعة.
وتناقش مسحته لـAaronson عن مسائل NP الكاملة والواقع الفيزيائي [@aaronson2005physicalreality] هذه المسائل أيضاً، لكنّه قد يكون أسهل قراءةً بعد أن نصل إلى <a href="">cooklevinchap</a>{.ref} عن $\\mathbf{NP}$ و $\\mathbf{NP}$-اكتمال.</p>
</div>`,s={book:e,chapter:n,chapterTitle:$,slug:t,title:o,headings:a,html:i};export{e as book,n as chapter,$ as chapterTitle,s as default,a as headings,i as html,t as slug,o as title};
