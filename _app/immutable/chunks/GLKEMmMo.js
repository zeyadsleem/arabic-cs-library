const e="introtcs",n="lec_06_loops",o="Loops and Recursions",a="index",t="الحلقات وما لا نهاية { #chaploops }",s=[{depth:3,id:"objectives",text:"{ .objectives }"},{depth:2,id:"آلات-تورينج",text:"آلات تورينج"},{depth:3,id:"مثال-موسع-آلة-تورينج-للكلمات-المتناظرة-turingmachinepalindrome",text:"مثال موسَّع:  آلة تورينج للكلمات المتناظرة  { #turingmachinepalindrome }"},{depth:3,id:"آلات-تورينج-تعريف-رسمي",text:"آلات تورينج: تعريف رسمي"},{depth:3,id:"الدوال-القابلة-للحساب",text:"الدوال القابلة للحساب"},{depth:3,id:"definition-titlequotالصنف-mathbfrquot-classrdef",text:"{.definition title=&quot;الصنف $\\mathbf{R}$&quot; #classRdef}"},{depth:3,id:"الحلقات-اللانهائية-والدوال-الجزئية",text:"الحلقات اللانهائية والدوال الجزئية"},{depth:2,id:"آلات-تورينج-كلغات-برمجة",text:"آلات تورينج كلغات برمجة"},{depth:3,id:"لغة-البرمجة-nand-tm",text:"لغة البرمجة NAND-TM"},{depth:3,id:"remark-titlequotnand-circ-حلقات-مصفوفات-كل-شيءquot-otherpl",text:"{.remark title=&quot;‏NAND-CIRC + حلقات + مصفوفات = كل شيء.&quot; #otherpl}"},{depth:3,id:"لمحة-سريعة-nand-tm-مقابل-آلات-تورينج",text:"لمحة سريعة: NAND-TM مقابل آلات تورينج"},{depth:3,id:"أمثلة",text:"أمثلة"},{depth:2,id:"تكافؤ-آلات-تورينج-وبرامج-nand-tm",text:"تكافؤ آلات تورينج وبرامج NAND-TM"},{depth:3,id:"theorem-titlequotآلات-تورينج-وبرامج-nand-tm-متكافئةquot-tm-equiv-thm",text:"{.theorem title=&quot;آلات تورينج وبرامج NAND-TM متكافئة&quot; #TM-equiv-thm}"},{depth:3,id:"المواصفة-مقابل-التنفيذ-مرة-أخرى",text:"المواصفة مقابل التنفيذ (مرة أخرى)"},{depth:2,id:"السكر-النحوي-في-nand-tm",text:"السكر النحوي في NAND-TM"},{depth:3,id:"goto-والحلقات-الداخلية-nandtminnerloopssec",text:"‏GOTO والحلقات الداخلية { #nandtminnerloopssec }"},{depth:2,id:"التوحيد-وnand-مقابل-nand-tm-نقاش",text:"التوحيد، وNAND مقابل NAND-TM (نقاش)"},{depth:3,id:"recap",text:"{ .recap }"},{depth:2,id:"تمارين",text:"تمارين"},{depth:3,id:"exercise-titlequotبت-واحد-مقابل-عدة-بتاتquot-singlebit-ex",text:"{.exercise title=&quot;بتّ واحد مقابل عدة بتّات&quot; #singlebit-ex}"},{depth:2,id:"ملاحظات-مرجعية-chaploopnotes",text:"ملاحظات مرجعية { #chaploopnotes }"}],$=`<h1>الحلقات وما لا نهاية { #chaploops }</h1>
<blockquote>
<h3 id="objectives">{ .objectives }</h3>
</blockquote>
<ul>
<li>تعلّم نموذج <em>آلات تورينج</em> (Turing machines)، التي تستطيع حساب دوال بمداخل <em>ذات أطوال اعتباطية</em>.</li>
<li>اطّلع على وصف بلغة برمجة لآلات تورينج، باستخدام
برامج NAND-TM، التي تضيف <em>الحلقات</em> (loops) و_المصفوفات_ (arrays) إلى NAND-CIRC.</li>
<li>اطّلع على سكر نحوي (syntactic sugar) أساسي، وعلى تكافؤ صيغ آلات تورينج وبرامج NAND-TM.</li>
</ul>
<blockquote>
<p><em>&quot;لكن حدود الحساب قد تجاوزت في اللحظة التي خطرت فيها فكرة استعمال البطاقات [المثقوبة]؛ والآلة التحليلية لا تشترك في الأرضية المشتركة مع «آلات الحساب» المجرّدة فحسب... فبإمكان الآلية أن تجمع بين الرموز العامّة، في تعاقببات من تنوّع ومدى غير محدودين، ينشأ رابط يربط بين عمليات المادة والعمليات العقلية المجرّدة في أكثر فروع الرياضيات تجريدًا.&quot;</em>، أوغستا آدا، كاونتيسة لوفلايس، 1843</p>
</blockquote>
<p>كما يقول اقتباس <a href="/arabic-cs-library/images/introtcs/lec_06_loops-1.webp">chapinfinite</a>{.ref}، فإن الخوارزمية هي «جواب متناهٍ على عدد لا نهائي من الأسئلة».
ولكي نكتب خوارزمية، نحتاج إلى تدوين مجموعة متناهية من التعليمات التي تتيح لنا الحساب على مداخل بطول اعتباطي.
ولكي نصف خوارزمية وننفّذها، نحتاج إلى المكوّنات التالية (انظر <a href="/arabic-cs-library/images/introtcs/fig-chaploopoverview.webp">algcomponentfig</a>{.ref}):</p>
<ul>
<li>
<p>مجموعة التعليمات المتناهية التي يتعيّن تنفيذها.</p>
</li>
<li>
<p>بعض «المتغيّرات المحلية» (local variables) أو الحالة المتناهية المستخدَمة أثناء التنفيذ.</p>
</li>
<li>
<p>ذاكرة عمل قد تكون غير محدودة الحجم، لتخزين المدخل وأي قيم أخرى قد نحتاج إليها لاحقًا.</p>
</li>
<li>
<p>ورغم أن الذاكرة غير محدودة، إلا أننا في كل خطوة على حدة نستطيع القراءة والكتابة في جزء متناهٍ منها فقط، ونحتاج إلى وسيلة لـ_عنونة_ (<em>address</em>) الأجزاء التي نريد القراءة منها والكتابة إليها.</p>
</li>
<li>
<p>إذا كانت لدينا مجموعة متناهية من التعليمات فحسب، بينما قد يكون مدخلنا بطول اعتباطي، فسنحتاج إلى <em>تكرار</em> (<em>repeat</em>) التعليمات (أي، <em>العودة</em> عبر الحلقة). ونحتاج إلى آلية تقرّر متى نكرّر ومتى نتوقّف.</p>
</li>
</ul>
<p><img src="/arabic-cs-library/images/introtcs/lec_06_loops-1.webp" alt="/images/introtcs/lec_06_loops-1.webp">{#algcomponentfig .margin}</p>
<div class="callout callout--nonmath">
<p>في هذا الفصل، نعطي نموذجًا عامًّا للخوارزمية، وهو لا يقتصر (على خلاف الدوائر البوليانية) على طول مدخل ثابت، ولا يقتصر (على خلاف الآلات المحدودة) على كمية متناهية من الذاكرة العاملة.
وسنرى طريقتين لنمذجة الخوارزميات:</p>
<ul>
<li>
<p><em>آلات تورينج</em> (Turing machines)، التي اخترعها آلان تورينج (Alan Turing) سنة 1936، هي أجهزة مجرّدة افتراضية تقدّم أوصافًا متناهية لخوارزميات قادرة على التعامل مع مداخل بطول اعتباطي.</p>
</li>
<li>
<p>توسّع <em>لغة البرمجة NAND-TM</em> (NAND-TM Programming language) لغة NAND-CIRC بمفهوم <em>الحلقات</em> (loops) و_المصفوفات_ (arrays) للحصول على برامج متناهية تستطيع حساب دالة بمدخل بطول اعتباطي.</p>
</li>
</ul>
<p>تبيّن أن هذين النموذجين <em>متكافئان</em> (equivalent). وفي الواقع، إنهما متكافئان مع كثير من نماذج الحوسبة الأخرى، بما فيها لغات البرمجة مثل C وLisp وPython وJavaScript وغيرها. وسنناقش هذه الفكرة، المعروفة بـ_تكافؤ تورينج_ (Turing equivalence) أو <em>اكتمال تورينج</em> (Turing completeness)، في <a href="https://www.loc.gov/pictures/item/2016838906/">chapequivalentmodels</a>{.ref}.
انظر <a href="/arabic-cs-library/images/introtcs/fig-HumanComputers.webp">chaploopoverviewfig</a>{.ref} لنظرة عامّة على النماذج المقدَّمة في هذا الفصل، و<a href="https://www.cs.washington.edu/building/art/SPTM">chapequivalentmodels</a>{.ref}.</p>
</div>
<p><img src="/arabic-cs-library/images/introtcs/fig-turingmachinecomponents.webp" alt="Overview of our models for finite and unbounded computation. In the previous chapters we study the computation of finite functions, which are functions $f:0,1^n ightarrow 0,1^m$ for some fixed $n,m$, and modeled computing these functions using circuits or straight-line programs. In this chapter we study computing unbounded functions of the form $F:0,1^* ightarrow 0,1^m$ or $F:0,1^* ightarrow 0,1^*$. We model computing these functions using Turing Machines or (equivalently) NAND-TM programs, which add the notion of loops to the NAND-CIRC programming language. In chapequivalentmodels{.ref} we will show that these models are equivalent to many other models, including RAM machines, the $ambda$ calculus, and all the common programming languages including C, Python, Java, JavaScript, etc.">{#chaploopoverviewfig  }</p>
<h2 id="آلات-تورينج">آلات تورينج</h2>
<blockquote>
<p><em>&quot;يُنجَز الحساب عادةً بكتابة رموز معيّنة على ورق. يمكننا أن نفترض أن هذا الورق مقسَّم إلى مربّعات، كما في كتاب حساب الأطفال... وسلوك الحاسوب [البشري] في أي لحظة تحدّده الرموز التي يراها، و«حالته الذهنية» في تلك اللحظة... يمكننا أن نفترض أن في أي عملية بسيطة لا يتغيّر أكثر من رمز واحد.&quot;</em>، <br>
<em>&quot;نقارن بين إنسانٍ يجري عملية حسابية ... وبين آلة لا تقبل سوى عدد متناهٍ من الحالات... وتُزوَّد الآلة بـ«شريط» (المقابل للورق) ... مقسَّم إلى مقاطع (تُسمّى «مربّعات») كل منها قادر على حمل «رمز» &quot;</em>، آلان تورينج (Alan Turing)، 1936</p>
</blockquote>
<blockquote>
<p><em>&quot;ما الفرق بين آلة تورينج والحاسوب الحديثة؟ إنه نفس الفرق بين صعود هيلاري لقمة إيفرست وبين إنشاء فندق هيلتون على قمّتها.&quot;</em>، آلان بيرليس (Alan Perlis)، 1982.</p>
</blockquote>
<p><img src="/arabic-cs-library/images/introtcs/lec_06_loops-2.webp" alt="/images/introtcs/lec_06_loops-2.webp">{#turingrunning .margin  }</p>
<p>«جدّ» كل نماذج الحوسبة هو <em>آلة تورينج</em>.
عُرِّفت آلات تورينج سنة 1936 على يد آلان تورينج، في محاولة لالتقاط رسميّ لكل الدوال التي يمكن أن يحسبها «حاسوبون» (computers) من البشر (انظر <a href="https://turingmachinesimulator.com/">humancomputersfig</a>{.ref}) ويتبعون مجموعة قواعد محدَّدة تمامًا، مثل الخوارزميات القياسية للجمع أو الضرب.</p>
<p><img src="http://rendell-attic.org/gol/TMapplet/index.htm" alt="Until the advent of electronic computers, the word &quot;computer&quot; was used to describe a person that performed calculations. Most of these &quot;human computers&quot; were women, and they were absolutely essential to many achievements, including mapping the stars, breaking the Enigma cipher, and the NASA space mission; see also the bibliographical notes. Photo from National Photo Company Collection; see also  [@sobel2017the].">{#humancomputersfig .margin  }</p>
<p>تصوّر تورينج هذا الشخص بصفته يملك ما يشاء من «ورق مسودّة» (scratch paper).
وللبساطة، يمكننا أن نتعامل مع هذه الورقة المسودّة على أنها قطعة ورق مربّعات ببعد واحد (أو <em>شريط</em> (<em>tape</em>) كما يُسمّى عادةً).
والورق مقسّم إلى «خلايا»، حيث يمكن لكل «خلية» أن تحمل رمزًا واحدًا (مثل رقم أو حرف، وعمومًا عنصرًا من <em>أبجدية</em> (<em>alphabet</em>) متناهية).
في أي لحظة من الزمن، يمكن للشخص أن يقرأ من خليّة واحدة من الورق ويكتب فيها. واستنادًا إلى محتوى هذه الخلية، يمكن للشخص أن يحدّث حالته الذهنية المتناهية، و/أو ينتقل إلى الخلية المجاورة مباشرةً على اليمين أو اليسار.</p>
<p><img src="https://github.com/boazbk/tcscode" alt="Steam-powered Turing machine mural, painted by CSE grad students at the University of Washington on the night before spring qualifying examinations, 1987. Image from https://www.cs.washington.edu/building/art/SPTM. ">{#steamturingmachine .margin  }</p>
<p>نمذج تورينج عملية حسابية كهذه بـ«آلة» تحافظ على إحدى $k$ حالات.
في كل لحظة من الزمن، تقرأ الآلة من «شريط عملها» رمزًا واحدًا من أبجدية متناهية $\\Sigma$، وتستخدمه لتحديث حالتها، وللكتابة على الشريط، وللانتقال ربما إلى خليّة مجاورة (انظر <a href="/arabic-cs-library/images/introtcs/lec_06_loops-6.webp">turing-machine-fig</a>{.ref}).
ولحساب دالة $F$ باستخدام هذه الآلة، نهيّئ الشريط بالمدخل $x\\in {0,1}^<em>$، ويكون هدفنا ضمان أن يحتوي الشريط على القيمة $F(x)$ في نهاية الحساب.
وبالتحديد، فإن حساب آلة تورينج $M$ ذات $k$ حالة والأبجدية $\\Sigma$ على المدخل $x\\in {0,1}^</em>$ يسير كما يلي:</p>
<ul>
<li>
<p>في البداية تكون الآلة في الحالة $0$ (المعروفة بـ«حالة البدء») ويُهيَّأ الشريط إلى $\\triangleright,x_0,\\ldots,x_{n-1},\\varnothing,\\varnothing,\\ldots$. ونستخدم الرمز $\\triangleright$ للدلالة على بداية الشريط، والرمز $\\varnothing$ للدلالة على خليّة فارغة. وسنفترض دائمًا أن الأبجدية $\\Sigma$ مجموعة فوقية (ربما صارمة تمامًا) لـ \${ \\triangleright, \\varnothing , 0 , 1 }$.</p>
</li>
<li>
<p>الموضع $i$ الذي تشير إليه الآلة يُضبط على $0$.</p>
</li>
<li>
<p>في كل خطوة، تقرأ الآلة الرمز $\\sigma = T[i]$ الموجود في الموضع $i^{th}$ من الشريط. واستنادًا إلى هذا الرمز وإلى حالتها $s$، تقرّر الآلة:</p>
<ul>
<li>أي رمز $\\sigma'$ تكتبه على الشريط \\</li>
<li>هل تتحرك <strong>L</strong> إلى اليسار (أي، $i \\leftarrow i-1$)، أم <strong>R</strong> إلى اليمين (أي، $i \\leftarrow i+1$)، أم تب <strong>S</strong> مكانها، أم <strong>H</strong>وقف الحساب.</li>
<li>ما هي الحالة الجديدة $s \\in [k]$ التي ستكون عليها</li>
</ul>
</li>
<li>
<p>تُسمّى مجموعة القواعد التي تتبعها آلة تورينج <em>دالة الانتقال</em> (<em>transition function</em>) لها.</p>
</li>
<li>
<p>عندما تتوقّف الآلة، فإن خرجها هو السلسلة الثنائية التي تُقرأ من الشريط من بدايته حتى أول موضع يحتوي فيه على الرمز $\\varnothing$، ثم إخراج كل رموز $0$ و$1$ بالترتيب، مع إسقاط الرمز $\\triangleright$ الأولي إن وُجد، وكذلك الرمز $\\varnothing) الأخير.</p>
</li>
</ul>
<p><img src="/arabic-cs-library/images/introtcs/lec_06_loops-7.webp" alt="The components of a Turing Machine. Note how they correspond to the general components of algorithms as described in algcomponentfig{.ref}.">{#turingmachinecomponentsfig .margin }</p>
<h3 id="مثال-موسع-آلة-تورينج-للكلمات-المتناظرة-turingmachinepalindrome">مثال موسَّع:  آلة تورينج للكلمات المتناظرة  { #turingmachinepalindrome }</h3>
<p>لتكن $PAL$ (أي <em>palindromes</em>، الكلمات المتناظرة) الدالة التي على المدخل $x\\in {0,1}^*$ تُخرج $1$ إذا وفقط إذا كان $x$ <em>متناظرًا</em> (<em>palindrome</em>) (أي ذا طول زوجي)، بالمعنى أن $x = w_0 \\cdots w_{n-1}w_{n-1}w_{n-2}\\cdots w_0$ لبعض $n\\in \\N$ و$w\\in {0,1}^n$.</p>
<p>نعرض الآن آلة تورينج $M$ تحسب $PAL$. ولتحديد $M$ نحتاج إلى تحديد <strong>(i)</strong> أبجدية شريط $M$ وهي $\\Sigma$، ويجب أن تحتوي على الأقل على الرموز $0$،$1$، $\\triangleright$ و$\\varnothing$، و__(ii)__ <em>دالة انتقال</em> $M$، التي تحدّد الإجراء الذي تتّخذه $M$ عندما تقرأ رمزًا معيّنًا وهي في حالة معيّنة.</p>
<p>في حالتنا، ستستخدم $M$ الأبجدية \${ 0,1,\\triangleright, \\varnothing, \\times }$ وستكون لها $k=11$ حالة. ورغم أن الحالات أرقام بين $0$ و$k-1$ فحسب، فسنعطيها التسميات التالية لتسهيل القراءة:</p>
<pre><code class="language-table">---
caption: ''
alignment: ''
table-width: ''
id: ''
---
State, Label
0, \`START\`
1,\`RIGHT_0\`
2,\`RIGHT_1\`
3,\`LOOK_FOR_0\`
4,\`LOOK_FOR_1\`
5,\`RETURN\`
6,\`OUTPUT_0\`
7,\`OUTPUT_1\`
8,\`0_AND_BLANK\`
9,\`1_AND_BLANK\`
10,\`BLANK_AND_STOP\`
</code></pre>
<p>نصف تشغيل آلة تورينج $M$ بالكلمات:</p>
<ul>
<li>
<p>تبدأ $M$ في الحالة <code>START</code> وتتجه إلى اليمين، باحثة عن أول رمز هو $0$ أو $1$. فإذا وجدت $\\varnothing$ قبل أن تصطدم بمثل هذا الرمز، فإنها تنتقل إلى الحالة <code>OUTPUT_1</code> الموصوفة أدناه.</p>
</li>
<li>
<p>وبمجرد أن تجد $M$ رمزًا $b \\in {0,1}$ من هذا النوع، فإنها تحذف $b$ من الشريط بكتابة الرمز $\\times$، وتدخل إما وضع <code>RIGHT_</code>$b$ وتبدأ بالحركة يمينًا حتى تصطدم بأول رمز $\\varnothing$ أو $\\times$.</p>
</li>
<li>
<p>وبمجرد أن تجد $M$ هذا الرمز، فإنها تدخل الحالة <code>LOOK_FOR_0</code> أو <code>LOOK_FOR_1</code> بحسب ما إذا كانت في الحالة <code>RIGHT_0</code> أو <code>RIGHT_1</code>، وتتحرك خطوة واحدة إلى اليسار.</p>
</li>
<li>
<p>في الحالة <code>LOOK_FOR_</code>$b$، تتحقق $M$ ممّا إذا كانت القيمة على الشريط هي $b$. فإن كانت كذلك، فإن $M$ تحذفها بتغيير قيمتها إلى $\\times$، وتنتقل إلى الحالة <code>RETURN</code>. وإلا فإنها تنتقل إلى الحالة <code>OUTPUT_0</code>.</p>
</li>
<li>
<p>تعني الحالة <code>RETURN</code> أن $M$ تعود إلى البداية. وبتحديد، تتحرك $M$ إلى اليسار حتى تصطدم بأول رمز ليس $0$ ولا $1$، وعندئذ تغيّر حالتها إلى <code>START</code>.</p>
</li>
<li>
<p>تعني الحالات <code>OUTPUT_</code>$b$ أن $M$ ستُخرج في النهاية القيمة $b$. وفي كلتا الحالتين <code>OUTPUT_0</code> و<code>OUTPUT_1</code> تتحرك $M$ إلى اليسار حتى تصطدم بـ$\\triangleright$. وبمجرد حدوث ذلك، تتخذ خطوة إلى اليمين، وتنتقل إلى الحالتين <code>1_AND_BLANK</code> أو <code>0_AND_BLANK</code> على التوالي. وفي هاتين الحالتين تكتب $M$ القيمة المناظرة، وتتحرك إلى اليمين، وتنتقل إلى الحالة <code>BLANK_AND_STOP</code>، حيث تكتب $\\varnothing$ على الشريط ثم تتوقّف.</p>
</li>
</ul>
<p>يمكن تحويل الوصف أعلاه إلى جدول يصف لكل واحدة من توافيق $11\\cdot 5$ بين الحالة والرمز ما ستفعله آلة تورينج عندما تكون في تلك الحالة وتقرأ ذلك الرمز. ويُعرف هذا الجدول بـ_دالة الانتقال_ (<em>transition function</em>) لآلة تورينج.</p>
<h3 id="آلات-تورينج-تعريف-رسمي">آلات تورينج: تعريف رسمي</h3>
<p><img src="/arabic-cs-library/images/introtcs/lec_06_loops-5.webp" alt="/images/introtcs/lec_06_loops-5.webp">{#turing-machine-fig   }</p>
<p>التعريف الرسمي لآلات تورينج هو كما يلي:</p>
<div class="callout callout--definition" id="TM-def">
<p><strong>آلة تورينج</strong></p>
<p>آلة تورينج $M$ (بشريط واحد) ذات $k$ حالة وأبجدية $\\Sigma \\supseteq {0,1, \\triangleright, \\varnothing }$ تُمثَّل بـ_دالة انتقال_ (<em>transition function</em>)
$\\delta_M:[k]\\times \\Sigma \\rightarrow [k] \\times \\Sigma  \\times {\\mathsf{L},\\mathsf{R}, \\mathsf{S}, \\mathsf{H} }$.</p>
<p>لكل $x\\in {0,1}^*$، يكون <em>الخرج</em> (<em>output</em>) الخاص بـ$M$ على المدخل $x$، ويُرمز له بـ$M(x)$، هو نتيجة العملية التالية:</p>
<ul>
<li>
<p>نهيّئ  $T$ لتكون المتسلسلة $\\triangleright,x_0,x_1,\\ldots,x_{n-1},\\varnothing,\\varnothing,\\ldots$، حيث $n=|x|$. (أي، $T[0]=\\triangleright$، و$T[i+1]=x_{i}$ لكل $i\\in [n]$، و$T[i]=\\varnothing$ لكل $i&gt;n$.)</p>
</li>
<li>
<p>نهيّئ أيضًا $i=0$ و$s=0$.</p>
</li>
<li>
<p>ثم نكرّر العملية التالية:</p>
<ol>
<li>لنضع $(s',\\sigma',D) = \\delta_M(s,T[i])$.</li>
<li>لنضع $s \\leftarrow s'$، $T[i] \\leftarrow \\sigma'$.</li>
<li>إذا كان $D=\\mathsf{R}$ فنضع $i \\rightarrow i+1$، وإذا كان $D=\\mathsf{L}$ فنضع $i \\rightarrow \\max{i-1,0}$. (وإذا كان $D = \\mathsf{S}$ فنُبقي $i$ كما هو.)</li>
<li>إذا كان $D=\\mathsf{H}$، فإننا نتوقّف.</li>
</ol>
</li>
<li>
<p>إذا توقّفت العملية أعلاه، فإن خرج $M$، ويُرمز له بـ$M(x)$، هو السلسلة $y\\in {0,1}^*$ التي تُحصل عليها بدمج كل الرموز في \${0,1}$ في المواضع $T[0],\\ldots, T[i]$، حيث $i+1$ هو أول موضع في الشريط يحتوي على $\\varnothing$.</p>
</li>
<li>
<p>وإذا لم تتوقّف آلة تورينج، فإننا نرمز لـ $M(x)=\\bot$.</p>
</li>
</ul>
</div>
<div class="callout callout--pause">
<p><strong>توقّف وتأمّل</strong></p>
<p>ينبغي أن تتأكّد من لماذا يقابل هذا التعريف الرسمي وصفنا غير الرسمي لآلة تورينج.
ولكي تحصل على حدسٍ أكثر عن آلات تورينج، يمكنك تجربة بعض المحاكيات المتاحة على الإنترنت مثل <a href="https://turingmachinesimulator.com/">محاكي مارتن أوغارتي</a>، أو <a href="http://morphett.info/turing/turing.html">محاكي أنتوني مورفيت</a>، أو <a href="http://rendell-attic.org/gol/TMapplet/index.htm">محاكي بول ريندل</a>.</p>
</div>
<p>لا ينبغي الخلط بين <em>دالة الانتقال</em> $\\delta_M$ لآلة تورينج $M$ والدالة التي تحسبها الآلة.
إن دالة الانتقال $\\delta_M$ هي دالة <em>متناهية</em>، لها $k|\\Sigma|$ مدخلًا و$4k|\\Sigma|$ خرجًا. (هل ترى لماذا؟)
يمكن للآلة أن تحسب دالة <em>لا نهائية</em> $F$ تأخذ كمدخل سلسلة $x\\in {0,1}^*$ ذات طول اعتباطي، وقد تُخرج أيضًا سلسلة ذات طول اعتباطي.</p>
<p>في تعريفنا الرسمي، فرأنا بين الآلة $M$ ودالة انتقالها $\\delta_M$، لأن دالة الانتقال تخبرنا بكل ما نحتاج معرفته عن آلة تورينج.
غير أن هذا التمثيل اعتباطي نوعًا ما، ويستند إلى عرفنا بأن فضاء الحالات هو دائمًا الأرقام \${0,\\ldots,k-1}$ مع $0$ كحالة بدء.
وتستخدم نصوص أخرى أعرافًا مختلفة، لذا قد يبدو تعريفها الرياضي لآلة تورينج مختلفًا في ظاهره.
غير أن هذه التعريفات تصف العملية الحاسوبية نفسها، وتتمتع بالقدرات الحاسوبية نفسها.
لذلك فهي متكافئة رغم اختلافاتها السطحية.
انظر <a href="https://esolangs.org/wiki/Brainfuck">chaploopnotes</a>{.ref} لمقارنة بين <a href="">TM-def</a>{.ref} وطريقة تعريف آلات تورينج في نصوص مثل Sipser [@SipserBook].</p>
<h3 id="الدوال-القابلة-للحساب">الدوال القابلة للحساب</h3>
<p>ننتقل الآن إلى واحد من أهم تعريفات هذا الكتاب: <em>الدوال القابلة للحساب</em> (<em>computable functions</em>).</p>
<div class="callout callout--definition" id="computablefuncdef">
<p><strong>الدوال القابلة للحساب</strong></p>
<p>لتكن $F:{0,1}^* \\rightarrow {0,1}^<em>$ دالة (كلية) (total)، ولتكن $M$ آلة تورينج. نقول إن $M$ <em>تحسب</em> $F$ إذا وفقط إذا كان $M(x)=F(x)$ لكل $x\\in {0,1}^</em>$.</p>
<p>نقول إن الدالة $F$ <em>قابلة للحساب</em> (<em>computable</em>) إذا وُجدت آلة تورينج $M$ تحسبها.</p>
</div>
<p>قد يبدو تعريف الدالة بأنها «قابلة للحساب» إذا وفقط إذا أمكن حسابها بآلة تورينج أمرًا «متهوّرًا»، لكن كما سنرى في <a href="">chapequivalentmodels</a>{.ref}، فإن القابلية للحساب بالمعنى المبيَّن في <a href="">computablefuncdef</a>{.ref} تكافئ القابلية للحساب في أي نموذج معقول للحوسة تقريبًا.
وتُعرف هذه العبارة بـ_أطروحة تشرتش-تورينج_ (<em>Church-Turing Thesis</em>). (وبخلاف <em>أطروحة تشرتش-تورينج الموسَّعة</em> (<em>extended</em>) التي ناقشناها في <a href="">PECTTsec</a>{.ref}، فإن أطروحة تشرتش-تورينج نفسها مقبولة على نطاق واسع ولا توجد أجهزة مرشّحة لمهاجمتها.)</p>
<div class="callout callout--bigidea" id="definecompidea">
<p>يمكننا أن نعرّف بدقّة ما يعنيه أن تكون الدالة قابلة للحساب بواسطة <em>أي خوارزمية ممكنة</em>.</p>
</div>
<p>هذه مناسبة جيدة لتذكير القارئ بأن <em>الدوال</em> ليست هي <em>البرامج</em> (<em>programs</em>) نفسها:</p>
<p>$$ \\text{Functions} ;\\neq; \\text{Programs} ;.$$</p>
<p>آلة تورينج (أو برنامج) $M$  تستطيع <em>أن تحسب</em> (<em>compute</em>) دالة ما $F$، لكنها ليست $F$ نفسها.
وبخاصة، قد يوجد أكثر من برنامج واحد يحسب الدالة نفسها.
والقابلية للحساب خاصية (<em>property</em>) للدوال، لا للآلات.</p>
<p>وسنولي في الغالب عناية خاصة للدوال $F:{0,1}^* \\rightarrow {0,1}$ التي لها بتّ خرج واحد.
ولذلك نمنح اسمًا خاصًا لمجموعة الدوال القابلة للحساب بهذا الشكل.</p>
<blockquote>
<h3 id="definition-titlequotالصنف-mathbfrquot-classrdef">{.definition title=&quot;الصنف $\\mathbf{R}$&quot; #classRdef}</h3>
</blockquote>
<p>نعرّف $\\mathbf{R}$ بأنها مجموعة كل الدوال <em>القابلة للحساب</em> $F:{0,1}^* \\rightarrow {0,1}$.</p>
<div class="callout callout--remark" id="decidablelanguagesrem">
<p><strong>ملاحظة — الدوال مقابل اللغات</strong></p>
<p>كما ناقشنا في <a href="">languagessec</a>{.ref}، تستخدم نصوص كثيرة مصطلح «اللغات» (<em>languages</em>) بدلًا من الدوال للإشارة إلى المهام الحاسوبية.
نقول إن آلة تورينج $M$ <em>تقرّر</em> (<em>decides</em>) لغة $L$ إذا كان لكل مدخل $x\\in {0,1}^<em>$ تُخرج $M(x)$ القيمة $1$ إذا وفقط إذا كان $x\\in L$.
وهذا يكافئ حساب الدالة البوليانية  $F:{0,1}^</em> \\rightarrow {0,1}$ المعرَّفة بأن $F(x)=1$ إذا وفقط إذا كان $x\\in L$.
نقول إن اللغة $L$ <em>قابلة للقرار</em> (<em>decidable</em>) إذا وُجدت آلة تورينج $M$ تقرّرها.
ولأسباب تاريخية، تسمّي بعض النصوص هذه اللغات أيضًا <em>تعاودية</em> (<em>recursive</em>)، ولهذا يُستخدم الحرف $\\mathbf{R}$ غالبًا للدلالة على مجموعة الدوال البوليانية القابلة للحساب / اللغات القابلة للقرار المعرَّفة في <a href="">classRdef</a>{.ref}.</p>
<p>في هذا الكتاب سنتمسّك بمصطلح <em>الدوال</em> بدلًا من اللغات، لكن جميع التعريفات والنتائج يمكن ترجمتها بسهولة ذهابًا وإيابًا باستخدام التكافؤ بين الدالة $F:{0,1}^* \\rightarrow {0,1}$ واللغة $L = { x\\in {0,1}^* ;|; F(x) = 1 }$.</p>
</div>
<h3 id="الحلقات-اللانهائية-والدوال-الجزئية">الحلقات اللانهائية والدوال الجزئية</h3>
<p>هناك فرق جوهري واحد بين الدوائر/البرامج المستقيمة (<em>straight-line programs</em>) وآلات تورينج، وهو كما يلي.
بالنظر إلى برنامج NAND-CIRC $P$، يمكننا دائمًا أن نعرف كم مدخلًا وكم خرجًا لدى $P$ بمجرد النظر إلى المتغيّرين <code>X</code> و<code>Y</code>.
وفضلاً عن ذلك، نحن مضمونون أنه إذا استدعينا $P$ على أي مدخل، فإن <em>بعضَ</em> الخرج سيُنتَج.</p>
<p>على النقيض من ذلك، عند إعطاء آلة تورينج $M$، لا يمكننا تحديد طول خرج $M$ مسبقًا.
بل إننا لا نعرف أصلًا هل سيُنتَج خرج أم لا!
فمثلًا، من السهل جدًا أن نوجد آلة تورينج لا تُخرج أبدًا $\\mathsf{H}$ في دالة انتقالها، وبالتالي لا تتوقّف أبدًا.</p>
<p>إذا فشلت آلة $M$ في التوقّف وإنتاج خرج على بعض المدخل $x$، فإنها لا تستطيع حساب أي دالة كلية $F$، لأننا بكل وضوح، على المدخل $x$، ستفشل $M$ في إخراج $F(x)$. غير أن $M$ تستطيع مع ذلك حساب <em>دالة جزئية</em> (<em>partial function</em>).^[الدالة الجزئية $F$ من مجموعة $A$ إلى مجموعة $B$ هي دالة معرَّفة على <em>مجموعة جزئية</em> من $A$ فقط (انظر <a href="">functionsec</a>{.ref}). يمكننا أيضًا التفكير في مثل هذه الدالة على أنها تُسقط $A$ على $B \\cup { \\bot }$ حيث $\\bot$ رمز «فشل» خاص بحيث $F(a)=\\bot$  يدل على أن الدالة $F$ غير معرَّفة على $a$.]</p>
<p>فمثلًا، تأمّل الدالة الجزئية $DIV$ التي على المدخل زوج $(a,b)$ من الأعداد الطبيعية تُخرج $\\ceil{a/b}$ إذا كان $b &gt; 0$، وتكون غير معرَّفة في غير ذلك.
يمكننا تعريف آلة تورينج $M$ تحسب $DIV$ على المدخل $a,b$ بإخراج أول $c=0,1,2,\\ldots$ بحيث $cb \\geq a$. فإذا كان $a&gt;0$ و$b=0$ فإن الآلة $M$ لن تتوقّف أبدًا، لكن هذا مقبول، لأن $DIV$ غير معرَّفة على هذه المدخلات. وإذا كان $a=0$ و$b=0$، فإن الآلة $M$ ستُخرج $0$، وهذا أيضًا مقبول، لأننا لا نباله بما يُخرجه البرنامج على المدخلات التي تكون $DIV$ فيها غير معرَّفة. رسميًا، نعرّف قابلية حساب الدوال الجزئية كما يلي:</p>
<div class="callout callout--definition" id="computablepartialfuncdef">
<p><strong>الدوال القابلة للحساب (جزئية أو كلية)</strong></p>
<p>لتكن $F$ دالة كلية أو جزئية تُسقط \${0,1}^<em>$ على \${0,1}^</em>$، ولتكن $M$ آلة تورينج.
نقول إن $M$ <em>تحسب</em> $F$ إذا وفقط إذا كان $M(x)=F(x)$ لكل $x\\in {0,1}^*$ تكون $F$ معرَّفة عليه.
نقول إن الدالة $F$ (الجزئية أو الكلية) <em>قابلة للحساب</em> إذا وُجدت آلة تورينج تحسبها.</p>
</div>
<p>لاحظ أنه إذا كانت $F$ دالة كلية، فإنها معرَّفة على كل $x\\in {0,1}^*$، وبالتالي في هذه الحالة يكون <a href="">computablepartialfuncdef</a>{.ref} مطابقًا لـ<a href="">computablefuncdef</a>{.ref}.</p>
<div class="callout callout--remark" id="botsymbol">
<p><strong>ملاحظة — رمز بوت</strong></p>
<p>نستخدم غالبًا $\\bot$ كـ«رمز الفشل» الخاص بنا.
إذا فشلت آلة تورينج $M$ في التوقّف على بعض المدخل $x\\in {0,1}^*$، فإننا نرمز لذلك بـ$M(x) = \\bot$. وهذا <em>لا يعني</em> أن $M$ تُخرج ترميزًا ما للرمز $\\bot$، بل يعني أن $M$ تدخل في حلقة لا نهائية عند إعطائها $x$ كمدخل.</p>
<p>إذا كانت الدالة الجزئية $F$ غير معرَّفة على $x$، يمكننا أيضًا كتابة $F(x) = \\bot$.
لذلك قد يظن المرء أن <a href="">computablepartialfuncdef</a>{.ref} يمكن تبسيطه إلى اشتراط أن $M(x) = F(x)$ لكل $x\\in {0,1}^*$، وهو ما يعني أن $M$ تتوقّف على $x$ لكل $x$ إذا وفقط إذا كانت $F$ معرَّفة على $x$.
لكن ليس هذا هو الحال: لكي تحسب آلة تورينج $M$ دالة جزئية $F$، ليس من <em>الضروري</em> أن تدخل $M$ في حلقة لا نهائية على المدخلات $x$ التي تكون $F$ غير معرَّفة عليها.
كل ما يلزم هو أن تُخرج $M$ القيمة $F(x)$ على قيم $x$ التي تكون $F$ معرَّفة عليها: أما على المدخلات الأخرى فيجوز أن تُخرج $M$ قيمة اعتباطية مثل $0$ أو $1$ أو أي شيء آخر، أو ألا تتوقّف أصلًا.
ولنستعير مصطلحًا من لغة البرمجة <code>C</code>، فإن ما تفعله $M$ على المدخلات $x$ التي تكون $F$ غير معرَّفة عليها هو «سلوك غير معرّف» (<em>undefined behavior</em>).</p>
</div>
<h2 id="آلات-تورينج-كلغات-برمجة">آلات تورينج كلغات برمجة</h2>
<p>اسم «آلة تورينج» وما يرتبط به من «شريط» و«رأس» يستحضر شيئًا ماديًا، في المقابل، فإننا نرى <em>البرنامج</em> (<em>program</em>) على أنه نص.
لكن يمكننا التفكير في آلة تورينج على أنها برنامج أيضًا.
فمثلًا، تأمّل آلة تورينج $M$ في <a href="">turingmachinepalindrome</a>{.ref} التي تحسب الدالة $PAL$ بحيث $PAL(x)=1$ إذا وفقط إذا كان $x$ متناظرًا.
ويمكننا أيضًا وصف هذه الآلة على أنها <em>برنامج</em> باستخدام شيفرة زائفة (<em>pseudocode</em>) شبيهة بـPython من الشكل التالي</p>
<pre><code class="language-python"><span class="hljs-comment"># Gets an array Tape initialized to</span>
<span class="hljs-comment"># [&quot;&gt;&quot;, x_0 , x_1 , .... , x_(n-1), &quot;∅&quot;, &quot;∅&quot;, ...]</span>
<span class="hljs-comment"># At the end of the execution, Tape[1] is equal to 1</span>
<span class="hljs-comment"># if x is a palindrome and is equal to 0 otherwise</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">PAL</span>(<span class="hljs-params">Tape</span>):
    head = <span class="hljs-number">0</span>
    state = <span class="hljs-number">0</span> <span class="hljs-comment"># START</span>
    <span class="hljs-keyword">while</span> (state != <span class="hljs-number">12</span>):
        <span class="hljs-keyword">if</span> (state == <span class="hljs-number">0</span> &amp;&amp; Tape[head]==<span class="hljs-string">&#x27;0&#x27;</span>):
            state = <span class="hljs-number">3</span> <span class="hljs-comment"># LOOK_FOR_0</span>
            Tape[head] = <span class="hljs-string">&#x27;x&#x27;</span>
            head += <span class="hljs-number">1</span> <span class="hljs-comment"># move right</span>
        <span class="hljs-keyword">if</span> (state==<span class="hljs-number">0</span> &amp;&amp; Tape[head]==<span class="hljs-string">&#x27;1&#x27;</span>)
            state = <span class="hljs-number">4</span> <span class="hljs-comment"># LOOK_FOR_1</span>
            Tape[head] = <span class="hljs-string">&#x27;x&#x27;</span>
            head += <span class="hljs-number">1</span> <span class="hljs-comment"># move right</span>
        ... <span class="hljs-comment"># more if statements here</span>
</code></pre>
<p>التفاصيل الدقيقة لهذا البرنامج ليست مهمّة. المهم هو أن بإمكاننا وصف آلات تورينج بوصفها <em>برامج</em>.
وفضلاً عن ذلك، لاحظ أن عند ترجمة آلة تورينج إلى برنامج، يتحوّل <em>الشريط</em> إلى <em>قائمة</em> (<em>list</em>) أو <em>مصفوفة</em> (<em>array</em>) قادرة على حمل قيم من المجموعة المتناهية $\\Sigma$.^[معظم لغات البرمجة تستخدم مصفوفات ذات حجم ثابت، في حين أن شريط آلة تورينج غير محدود. لكن بالطبع ليس هناك حاجة لتخزين عدد لا نهائي من رموز $\\varnothing$. وإذا شئت، يمكنك التفكير في الشريط على أنه قائمة تبدأ بطول كافٍ لتخزين المدخل فقط، لكنها تنمو ديناميكيًا مع استكشاف رأس آلة تورينج لمواضع جديدة.]
ويمكن التفكير في <em>موضع الرأس</em> (<em>head position</em>) على أنه متغيّر (<em>variable</em>) ذا قيمة أعداد صحيحة يحمل أعدادًا صحيحة غير محدودة الحجم.
أما <em>الحالة</em> (<em>state</em>) فهي <em>سجلّ محلي</em> (<em>local register</em>) يمكنه حمل إحدى قيم عدد ثابت من القيم في $[k]$.</p>
<p>وبشكل أعمّ، يمكننا التفكير في كل آلة تورينج $M$ على أنها مكافئة لبرنامج شبيه بما يلي:</p>
<pre><code class="language-python"><span class="hljs-comment"># Gets an array Tape initialized to</span>
<span class="hljs-comment"># [&quot;&gt;&quot;, x_0 , x_1 , .... , x_(n-1), &quot;∅&quot;, &quot;∅&quot;, ...]</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">M</span>(<span class="hljs-params">Tape</span>):
    state = <span class="hljs-number">0</span>
    i     = <span class="hljs-number">0</span> <span class="hljs-comment"># holds head location</span>
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">True</span>):
        <span class="hljs-comment"># Move head, modify state, write to tape</span>
        <span class="hljs-comment"># based on current state and cell at head</span>
        <span class="hljs-comment"># below are just examples for how program looks for a particular transition function</span>
        <span class="hljs-keyword">if</span> Tape[i]==<span class="hljs-string">&quot;0&quot;</span> <span class="hljs-keyword">and</span> state==<span class="hljs-number">7</span>: <span class="hljs-comment"># δ_M(7,&quot;0&quot;)=(19,&quot;1&quot;,&quot;R&quot;)</span>
            Tape[i]=<span class="hljs-string">&quot;1&quot;</span>
            i += <span class="hljs-number">1</span>

            state = <span class="hljs-number">19</span>
        <span class="hljs-keyword">elif</span> Tape[i]==<span class="hljs-string">&quot;&gt;&quot;</span> <span class="hljs-keyword">and</span> state == <span class="hljs-number">13</span>: <span class="hljs-comment"># δ_M(13,&quot;&gt;&quot;)=(15,&quot;0&quot;,&quot;S&quot;)</span>
            Tape[i]=<span class="hljs-string">&quot;0&quot;</span>
            state = <span class="hljs-number">15</span>
        <span class="hljs-keyword">elif</span> ...
        ...
        <span class="hljs-keyword">elif</span> Tape[i]==<span class="hljs-string">&quot;&gt;&quot;</span> <span class="hljs-keyword">and</span> state == <span class="hljs-number">29</span>: <span class="hljs-comment"># δ_M(29,&quot;&gt;&quot;)=(.,.,&quot;H&quot;)</span>
            <span class="hljs-keyword">break</span> <span class="hljs-comment"># Halt</span>
</code></pre>
<p>ولو أردنا استخدام متغيّرات <em>بوليانية</em> (<em>Boolean</em>) فقط (أي متغيّرات قيمتها $0$/$1$)، لاستطعنا ترميز متغيّرات <code>state</code> باستخدام $\\ceil{\\log k}$ بت.
وبالمثل، يمكننا تمثيل كل عنصر من أبجدية $\\Sigma$ باستخدام $\\ell=\\ceil{\\log |\\Sigma|}$ بت، وبالتالي يمكننا استبدال المصفوفة ذات القيم في $\\Sigma$ والمسمّاة <code>Tape[]</code> بـ$\\ell$ مصفوفة ذات قيم بوليانية هي <code>Tape0[]</code>،$\\ldots$، <code>Tape</code>$(\\ell - 1)$<code>[]</code>.</p>
<h3 id="لغة-البرمجة-nand-tm">لغة البرمجة NAND-TM</h3>
<p>نقدّم الآن <em>لغة البرمجة NAND-TM</em>، التي تلتقط قدرة آلة تورينج بصيغة لغات برمجة.
وكما أن الفرق بين الدوائر البوليانية وآلات تورينج، فإن الفرق الرئيسي بين NAND-TM وNAND-CIRC هو أن NAND-TM تمثّل <em>خوارزمية واحدة موحّدة</em> (<em>uniform</em>) تستطيع حساب دالة تأخذ مداخل <em>بأطوال اعتباطية</em>.
ولتحقيق ذلك، نوسّع لغة البرمجة NAND-CIRC ببنيتين:</p>
<ul>
<li>
<p><em>الحلقات</em> (<em>loops</em>): إن NAND-CIRC هي لغة برمجة <em>مستقيمة</em> (<em>straight-line</em>) — فبرنامج NAND-CIRC بطول $s$ سطرًا يستغرق بالضبط $s$ خطوة حسابية، وبالتالي لا يستطيع حتى لمس أكثر من $3s$ متغيّرًا. وتتيح لنا <em>الحلقات</em> (<em>loops</em>) استخدام برنامج بطول ثابت لترميز تعليمات حساب قد يستغرق وقتًا اعتباطيًا.</p>
</li>
<li>
<p><em>المصفوفات</em> (<em>arrays</em>): يلمس برنامج NAND-CIRC بطول $s$ سطرًا ما لا يزيد عن $3s$ متغيّرًا. ورغم أننا يمكننا استخدام متغيّرات بأسماء مثل  <code>Foo_17</code> أو <code>Bar[22]</code> في NAND-CIRC، فإنها ليست مصفوفات حقيقية، لأن الرقم في المُعرِّف هو ثابت «مضمَّن» (<em>hardwired</em>) في البرنامج. أما NAND-TM فتحتوي مصفوفات فعلية يمكن أن يكون طولها غير محدود مسبقًا.</p>
</li>
</ul>
<p><img src="/arabic-cs-library/images/introtcs/fig-nandtmprog.webp" alt="A NAND-TM program has scalar variables that can take a Boolean value, array variables that hold a sequence of Boolean values, and a special index variable  that can be used to index the array variables. We refer to the -th value of the array variable  using . At each iteration of the program the index variable can be incremented or decremented by one step using the  operation.">{#nandtmfig}</p>
<p>إذن، فإن طريقة جيدة لتذكّر NAND-TM هي استخدام المعادلة غير الرسمية التالية:</p>
<p>$$
\\text{NAND-TM} ;=; \\text{NAND-CIRC} ;+; \\text{loops} ;+; \\text{arrays} \\label{eqnandloops}
$$</p>
<blockquote>
<h3 id="remark-titlequotnand-circ-حلقات-مصفوفات-كل-شيءquot-otherpl">{.remark title=&quot;‏NAND-CIRC + حلقات + مصفوفات = كل شيء.&quot; #otherpl}</h3>
</blockquote>
<p>كما سنرى، فإن إضافة الحلقات والمصفوفات إلى NAND-CIRC تكفي لالتقاط القدرة الكاملة لكل لغات البرمجة! ولذلك يمكننا استبدال «NAND-TM» بأيٍّ من <em>Python</em> أو <em>C</em> أو <em>Javascript</em> أو <em>OCaml</em> وغيرها في الطرف الأيسر من <a href="">eqnandloops</a>{.eqref}.
لكننا نتقدّم بأشواط على حالنا: سنناقش هذه المسألة في <a href="">chapequivalentmodels</a>{.ref}.</p>
<p>عمليًّا، تضيف لغة البرمجة NAND-TM الميزات التالية فوق NAND-CIRC (انظر <a href="">nandtmfig</a>{.ref}):</p>
<ul>
<li>
<p>نضيف متغيّرًا خاصًا <em>ذي قيمة عدد صحيح</em> (<em>integer valued</em>) اسمه <code>i</code>. وجميع المتغيّرات الأخرى في NAND-TM هي <em>ذات قيمة بوليانية</em> (<em>Boolean valued</em>) (كما في NAND-CIRC).</p>
</li>
<li>
<p>إلى جانب <code>i</code>، تمتلك NAND-TM نوعين من المتغيّرات: <em>قياسية</em> (<em>scalars</em>) و_مصفوفات_ (<em>arrays</em>). فالمتغيّرات <em>القياسية</em> (<em>scalar variables</em>) تحمل بتًّا واحدًا (كما في NAND-CIRC تمامًا). أما المتغيّرات <em>من نوع المصفوفة</em> (<em>array variables</em>) فتُخزّن عددًا غير محدود من البتات. وفي أي لحظة من الحساب يمكننا الوصول إلى متغيّرات المصفوفة عند الموضع المُفهرس بـ<code>i</code> باستخدام <code>Foo[i]</code>. ولا يمكننا الوصول إلى المصفوفات في مواضع غير الموضع الذي يشير إليه <code>i</code>.</p>
</li>
<li>
<p>نستخدم العرف أن <em>المصفوفات</em> (<em>arrays</em>) تبدأ دائمًا بحرف كبير، وأن <em>المتغيّرات القياسية</em> (<em>scalar variables</em>) (التي لا تُفهرس أبدًا بـ<code>i</code>) تبدأ بحروف صغيرة. لذا <code>Foo</code> هي مصفوفة و<code>bar</code> متغيّر قياسي.</p>
</li>
<li>
<p>يُعتبر المدخل <code>X</code> والخرج <code>Y</code> الآن <em>مصفوفتين</em> (<em>arrays</em>) قيمتها أصفار وواحدات. (وهناك أيضًا مصفوفتان خاصتان أخريان هما <code>X_nonblank</code> و<code>Y_nonblank</code>، انظر أدناه.)</p>
</li>
<li>
<p>نضيف تعليمة خاصة <code>MODANDJUMP</code> تأخذ كمدخل متغيّرين بوليين $a,b$ وتفعل ما يلي:</p>
<ul>
<li>إذا كان $a=1$ و$b=1$ فإن <code>MODANDJUMP(</code>$a,b$<code>)</code> يزيد <code>i</code> بمقدار واحد ويقفز إلى أول سطر في البرنامج.</li>
<li>إذا كان $a=0$ و$b=1$ فإن <code>MODANDJUMP(</code>$a,b$<code>)</code> ينقص <code>i</code> بمقدار واحد ويقفز إلى أول سطر في البرنامج. (وإذا كان <code>i</code> مساويًا بالفعل لـ $0$ فإنه يبقى عند $0$.)</li>
<li>إذا كان $a=1$ و$b=0$ فإن <code>MODANDJUMP(</code>$a,b$<code>)</code> يقفز إلى أول سطر في البرنامج دون تعديل <code>i</code>.</li>
<li>إذا كان $a=b=0$ فإن <code>MODANDJUMP(</code>$a,b$<code>)</code> يوقف تنفيذ البرنامج.</li>
</ul>
</li>
<li>
<p>تظهر تعليمة <code>MODANDJUMP</code> دائمًا في آخر سطر من برنامج NAND-TM ولا تظهر في أي مكان آخر.</p>
</li>
</ul>
<p><strong>القيم الافتراضية.</strong> نحتاج إلى عرفٍ إضافي واحد للتعامل مع «القيم الافتراضية».
تمتلك آلات تورينج الرمز الخاص $\\varnothing$ للدلالة على أن موضعًا في الشريط «فارغ» أو «غير مُهيّأ».
أما في NAND-TM فلا يوجد مثل هذا الرمز، وجميع المتغيّرات <em>بوليانية</em> (<em>Boolean</em>)، تحتوي إمّا على $0$ أو على $1$.
وتأخذ جميع المتغيّرات ومواضع المصفوفات القيمة الافتراضية $0$ إذا لم تكن قد هُيّئت إلى قيمة أخرى.
ولكي نتتبّع ما إذا كان $0$ في مصفوفة يمثّل صفرًا حقيقيًا أم خليّة غير مُهيّأة، يمكن للمبرمج دائمًا أن يضيف إلى المصفوفة <code>Foo</code> مصفوفة «مرافقة» (<em>companion array</em>) هي <code>Foo_nonblank</code> ويضبط <code>Foo_nonblank[i]</code> على $1$ كلما كان الموضع رقم <code>i</code> مُهيّأ.
وبخاصة، سنستخدم هذا العرف مع مصفوفتي المدخل والخرج <code>X</code> و<code>Y</code>.
يمتلك برنامج NAND-TM <em>أربع</em> مصفوفات خاصة هي <code>X</code> و<code>X_nonblank</code> و<code>Y</code> و<code>Y_nonblank</code>.
وعند تنفيذ برنامج NAND-TM على مدخل $x\\in {0,1}^*$ طوله $n$، تُهيّأ الخلايا $n$ الأولى من المصفوفة <code>X</code> على $x_0,\\ldots,x_{n-1}$، وتُهيّأ الخلايا $n$ الأولى من المصفوفة <code>X_nonblank</code> على $1$. (أما جميع الخلايا غير المُهيّأة فتأخذ القيمة الافتراضية $0$.)
ويكون خرج برنامج NAND-TM هو السلسلة <code>Y[</code>$0$<code>]</code>, $\\ldots$, <code>Y[</code>$m-1$<code>]</code> حيث $m$ أصغر عدد صحيح بحيث <code>Y_nonblank[</code>$m$<code>]</code>$=0$. ويُستدعى برنامج NAND-TM مع <code>X</code> و<code>X_nonblank</code> مُهيّأتين لاحتواء المدخل، ويكتب في <code>Y</code> و<code>Y_nonblank</code> لإنتاج الخرج.</p>
<p>رسميًّا، تُعرَّف برامج NAND-TM كما يلي:</p>
<div class="callout callout--definition" id="NANDTM">
<p><strong>برامج NAND-TM</strong></p>
<p>يتكوّن <em>برنامج NAND-TM</em> (<em>NAND-TM program</em>) من تسلسل أسطر من الشكل <code>foo = NAND(bar,blah)</code> ينتهي بسطر من الشكل <code>MODANDJUMP(foo,bar)</code>، حيث يكون <code>foo</code> و<code>bar</code> و<code>blah</code> إمّا <em>متغيّرات قياسية</em> (<em>scalar variables</em>) (تسلسلات من الحروف والأرقام والشرطات السفلية) أو <em>متغيّرات مصفوفة</em> (<em>array variables</em>) من الشكل <code>Foo[i]</code> (تبدأ بحروف كبيرة وتُفهرس بـ<code>i</code>). ويمتلك البرنامج مسبقًا متغيّرات المصفوفة <code>X</code> و<code>X_nonblank</code> و<code>Y</code> و<code>Y_nonblank</code> ومتغيّر الفهرسة <code>i</code>، ويمكنه استخدام متغيّرات مصفوفة وقياسية إضافية.</p>
<p>إذا كان $P$ برنامج NAND-TM وكان $x\\in {0,1}^*$ مدخلًا، فإن تنفيذ $P$ على $x$ هو العملية التالية:</p>
<ol>
<li>
<p>تُهيّأ المصفوفتان <code>X</code> و<code>X_nonblank</code> بواسطة <code>X[</code>$i$<code>]</code>$=x_i$ و<code>X_nonblank[</code>$i$<code>]</code>$=1$ لكل $i\\in [|x|]$. وتُهيّأ جميع المتغيّرات والخلايا الأخرى على $0$. كما يُهيّأ متغيّر الفهرسة <code>i</code> على $0$.</p>
</li>
<li>
<p>يُنفَّذ البرنامج سطرًا بسطر. وعندما يُنفَّذ آخر سطر <code>MODANDJUMP(foo,bar)</code> نفعل ما يلي:</p>
<p>a. إذا كان <code>foo</code>$=1$ و<code>bar</code>$=0$، فإننا نقفز إلى أول سطر دون تعديل قيمة <code>i</code>.</p>
<p>b. إذا كان <code>foo</code>$=1$ و<code>bar</code>$=1$، فإننا نزيد <code>i</code> بمقدار واحد  ونقفز إلى أول سطر.</p>
<p>c. إذا كان <code>foo</code>$=0$ و<code>bar</code>$=1$، فإننا ننقص <code>i</code> بمقدار واحد (ما لم يكن صفرًا بالفعل) ونقفز إلى أول سطر.</p>
<p>d. إذا كان <code>foo</code>$=0$ و<code>bar</code>$=0$، فإننا نتوقّف ونُخرج <code>Y[</code>$0$<code>]</code>, $\\ldots$, <code>Y[</code>$m-1$<code>]</code> حيث $m$ أصغر عدد صحيح بحيث <code>Y_nonblank[</code>$m$<code>]</code>$=0$.</p>
</li>
</ol>
</div>
<h3 id="لمحة-سريعة-nand-tm-مقابل-آلات-تورينج">لمحة سريعة: NAND-TM مقابل آلات تورينج</h3>
<p>وكما يدلّ الاسم، فإن برامج NAND-TM هي تنفيذ مباشر لآلات تورينج بصيغة لغة برمجة.
وسنُظهر التكافؤ أدناه، لكن يمكنك أن ترى بالفعل كيف تقابل مكوّنات آلات تورينج مكوّنات برامج NAND-TM بعضها ببعض:</p>
<pre><code class="language-table">---
caption: 'Turing Machine and NAND-TM analogs'
alignment: 'LL'
table-width: '1/1'
id: TMvsNANDTMtable
---
**Turing Machine** | **NAND-TM program**
*State:* single register that takes values in $[k]$ | *Scalar variables:* Several variables such as \`foo\`, \`bar\` etc.. each taking values in $\\{0,1\\}$.
*Tape:* One tape containing values in a finite set $\\Sigma$. Potentially infinite but $T[t]$ defaults to $\\varnothing$ for all locations $t$ that have not been accessed. | *Arrays:* Several arrays such as \`Foo\`, \`Bar\` etc.. for each such array \`Arr\` and index $j$, the value of \`Arr\` at position $j$ is either $0$ or $1$. The value defaults to $0$ for position that have not been written to.
*Head location:* A number $i\\in \\mathbb{N}$ that encodes the position of the head. | *Index variable:* The variable \`i\` that can be used to access the arrays.
*Accessing memory:* At every step the Turing machine has access to its local state, but can only access the tape at the position of the current head location. | *Accessing memory:* At every step a NAND-TM program has access to all the scalar variables, but can only access the arrays at the location \`i\` of the index variable
*Control of location:* In each step the machine can move the head location by at most one position. | *Control of index variable:* In each iteration of its main loop the program can modify the index \`i\` by at most one.
</code></pre>
<h3 id="أمثلة">أمثلة</h3>
<p>نعرض الآن بعض الأمثلة لبرامج NAND-TM.</p>
<div class="callout callout--example" id="INCENANDPP">
<p><strong>الزيادة في NAND-TM</strong></p>
<p>فيما يلي برنامج NAND-TM لحساب <em>دالة الزيادة</em> (<em>increment function</em>).
أي، $INC:{0,1}^* \\rightarrow {0,1}^*$ بحيث لكل $x\\in {0,1}^n$، تكون $INC(x)$ هي السلسلة $y$ ذات $n+1$ بت التي إذا كان $X = \\sum_{i=0}^{n-1}x_i \\cdot 2^i$ هو العدد الذي يمثّله $x$، فإن $y$ هي التمثيل الثنائي (بترتيب البت الأقل قيمة أولًا) للعدد $X+1$.</p>
<p>نبدأ بوصف البرنامج مستخدمين «سكرًا نحويًا» (<em>syntactic sugar</em>) خاصًا بـNAND-CIRC لدوال <code>IF</code> و<code>XOR</code> و<code>AND</code> (وكذلك الدالة الثابتة <code>one</code>، والدالة <code>COPY</code> التي تُسقط البت على نفسه فحسب).</p>
<pre><code class="language-python">carry = IF(started,carry,one(started))
started = one(started)
Y[i] = XOR(X[i],carry)
carry = AND(X[i],carry)
Y_nonblank[i] = one(started)
MODANDJUMP(X_nonblank[i],X_nonblank[i])
</code></pre>
<p>ولأننا استخدمنا سكرًا نحويًا، فإن ما سبق ليس، بصرامة، برنامج NAND-TM صالحًا.
غير أنه، بفتح «كل» السكر النحوي، نحصل على البرنامج الصالح التالي «الخالي من السكر» لحساب الدالة نفسها.</p>
<pre><code class="language-python">temp_0 = NAND(started,started)
temp_1 = NAND(started,temp_0)
temp_2 = NAND(started,started)
temp_3 = NAND(temp_1,temp_2)
temp_4 = NAND(carry,started)
carry = NAND(temp_3,temp_4)
temp_6 = NAND(started,started)
started = NAND(started,temp_6)
temp_8 = NAND(X[i],carry)
temp_9 = NAND(X[i],temp_8)
temp_10 = NAND(carry,temp_8)
Y[i] = NAND(temp_9,temp_10)
temp_12 = NAND(X[i],carry)
carry = NAND(temp_12,temp_12)
temp_14 = NAND(started,started)
Y_nonblank[i] = NAND(started,temp_14)
MODANDJUMP(X_nonblank[i],X_nonblank[i])
</code></pre>
</div>
<div class="callout callout--example" id="XORENANDPP">
<p><strong>XOR في NAND-TM</strong></p>
<p>فيما يلي برنامج NAND-TM لحساب دالة XOR على مداخل بطول اعتباطي.
أي $XOR:{0,1}^* \\rightarrow {0,1}$ بحيث $XOR(x) = \\sum_{i=0}^{|x|-1} x_i \\mod 2$ لكل $x\\in {0,1}^*$.
ومرة أخرى، نستخدم نوعًا من «السكر النحوي».
وبتحديد، فإننا نصل إلى المصفوفتين <code>X</code> و<code>Y</code> عند الخانة رقم صفر فيها، في حين أن NAND-TM يسمح
بالوصول إلى المصفوفات عند إحداثي المتغيّر <code>i</code> فقط.</p>
<pre><code class="language-python">temp_0 = NAND(X[<span class="hljs-number">0</span>],X[<span class="hljs-number">0</span>])
Y_nonblank[<span class="hljs-number">0</span>] = NAND(X[<span class="hljs-number">0</span>],temp_0)
temp_2 = NAND(X[i],Y[<span class="hljs-number">0</span>])
temp_3 = NAND(X[i],temp_2)
temp_4 = NAND(Y[<span class="hljs-number">0</span>],temp_2)
Y[<span class="hljs-number">0</span>] = NAND(temp_3,temp_4)
MODANDJUMP(X_nonblank[i],X_nonblank[i])
</code></pre>
<p>لتحويل البرنامج أعلاه إلى برنامج NAND-TM صالح، يمكننا تحويل المراجع مثل <code>X[0]</code> و<code>Y[0]</code> إلى متغيّرات قياسية <code>x_0</code> و<code>y_0</code> (وبالمثل يمكننا تحويل أي مرجع من الشكل <code>Foo[17]</code> أو <code>Bar[15]</code> إلى متغيّرات قياسية مثل <code>foo_17</code> و<code>bar_15</code>).
ثم نحتاج بعد ذلك إلى إضافة شيفرة لتحميل قيمة <code>X[0]</code> إلى <code>x_0</code>، وبالمثل للكتابة في <code>Y[0]</code> القيمة <code>y_0</code>، لكن هذا ليس صعبًا.
ولأننا نعرف أن المتغيّرات تُهيَّأ على الصفر افتراضيًا، يمكننا إنشاء متغيّر <code>init</code> سيضبط على $1$ في نهاية التكرار الأول ولن يتغيّر منذ ذلك الحين.
يمكننا بعد ذلك إضافة مصفوفة <code>Atzero</code> وشيفرة تعدّل <code>Atzero[i]</code> لتصبح $1$ إذا كان <code>init</code> يساوي $0$، وتتركها كما هي في غير ذلك.
وهذا سيضمن أن <code>Atzero[i]</code> يساوي $1$ إذا وفقط إذا كان <code>i</code> مضبوطًا على الصفر، ويسمح للبرنامج بأن يعرف متى كنّا عند الموضع صفر.
وبالتالي يمكننا إضافة شيفرة لقراءة المتغيّرين القياسيين <code>x_0</code> و<code>y_0</code> وكتابتهما عندما نكون عند الموضع صفر، وكذلك شيفرة لنقل <code>i</code> إلى الصفر ثم التوقّف في النهاية.
وإنّ إتمام هذا الجزء بالكامل مملّ بعض الشيء، لكنه قد يكون تمرينًا جيدًا.</p>
</div>
<div class="callout callout--pause">
<p><strong>توقّف وتأمّل</strong></p>
<p>إنّ اشتقاق المثالين أعلاه بالكامل سيقطع شوطًا طويلًا نحو فهم لغة NAND-TM.
انظر <a href="https://github.com/boazbk/tcscode">مستودعنا على GitHub</a> للحصول على المواصفة الكاملة للغة NAND-TM.</p>
</div>
<h2 id="تكافؤ-آلات-تورينج-وبرامج-nand-tm">تكافؤ آلات تورينج وبرامج NAND-TM</h2>
<p>بالنظر إلى النقاش أعلاه، قد لا يكون من المُفاجئ أن تكتشف آلات تورينج أنها متكافئة مع برامج NAND-TM.
وفي الواقع، لقد صمّمنا لغة NAND-TM لتتمتع بهذه الخاصية.
ومع ذلك، فهذه نتيجة مهمة، وهي أولى نتائج التكافؤ الإضافية العديدة التي سنراها في هذا الكتاب.</p>
<blockquote>
<h3 id="theorem-titlequotآلات-تورينج-وبرامج-nand-tm-متكافئةquot-tm-equiv-thm">{.theorem title=&quot;آلات تورينج وبرامج NAND-TM متكافئة&quot; #TM-equiv-thm}</h3>
</blockquote>
<p>لكل $F:{0,1}^* \\rightarrow {0,1}^*$، تكون $F$ قابلة للحساب ببرنامج NAND-TM $P$ إذا وفقط إذا وُجدت آلة تورينج $M$ تحسب $F$.</p>
<div class="callout callout--proofidea">
<p>لإثبات مثل هذه النسخة من التكافؤ، نحتاج إلى بيان اتجاهين. فنحن بحاجة إلى أن نتمكّن من <strong>(1)</strong> تحويل آلة تورينج $M$ إلى برنامج NAND-TM $P$ يحسب الدالة نفسها التي يحسبها $M$، و__(2)__ تحويل برنامج NAND-TM $P$ إلى آلة تورينج $M$ تحسب الدالة نفسها التي يحسبها $P$.</p>
<p>وتوضَّح فكرة البرهان في <a href="">tmvsnandppfig</a>{.ref}.
ولإثبات <strong>(1)</strong>، عند إعطائنا آلة تورينج $M$، سننشئ برنامج NAND-TM $P$ يملك مصفوفة <code>Tape</code> لشريط $M$، ومتغيّرًا قياسيًا (أي غير مصفوفة) واحدًا أو أكثر اسمه <code>state</code> لحالة $M$.
وبتحديد، بما أن حالة آلة تورينج ليست في \${0,1}$ بل في مجموعة أكبر $[k]$، فإننا سنستخدم $\\ceil{\\log k}$ متغيّرًا <code>state_</code>$0$ ، $\\ldots$، <code>state_</code>$\\ceil{\\log k}-1$ لتخزين تمثيل الحالة.
وبالمثل، ولترميز الأبجدية الأكبر $\\Sigma$ للشريط، سنستخدم $\\ceil{\\log |\\Sigma|}$ مصفوفة <code>Tape_</code>$0$ ، $\\ldots$، <code>Tape_</code>$\\ceil{\\log |\\Sigma|}-1$، بحيث يرمز الموضع $i^{th}$ في هذه المصفوفات إلى الرمز $i^{th}$ في الشريط.
وباستخدام الحقيقة أن <em>كل</em> دالة يمكن حسابها ببرنامج NAND-CIRC، فإننا سنتمكّن من حساب دالة انتقال $M$، مع استبدال الحركة إلى اليسار وإلى اليمين بنقصان <code>i</code> وزيادته على التوالي.</p>
<p>ونُثبّت <strong>(2)</strong> باستخدام أفكار مشابهة جدًا. فإذا كان لدينا برنامج $P$ يستخدم $a$ متغيّر مصفوفة و$b$ متغيّرًا قياسيًا، فإننا سننشئ آلة تورينج لها نحو $2^b$ حالة لترميز قيم المتغيّرات القياسية، وأبجدية حجمها نحو $2^a$ حتى نتمكن من ترميز المصفوفات باستخدام شريطنا. (والسبب في أن الأحجام «نحو» $2^a$ و$2^b$ فقط هو أننا نحتاج إلى إضافة بعض الرموز والخطوات لأغراض المساءلة.) وتُحاكي آلة تورينج $M$ كل تكرار من تكرارات البرنامج $P$ بتحديث حالتها وشريطها تبعًا لذلك.</p>
</div>
<p><img src="/arabic-cs-library/images/introtcs/lec_06_loops-6.webp" alt="/images/introtcs/lec_06_loops-6.webp">{#tmvsnandppfig   }</p>
<div class="callout callout--proof">
<p>نبدأ بإثبات اتجاه «إذا» من <a href="">TM-equiv-thm</a>{.ref}. أي إننا سنبيّن أنه عند إعطائنا آلة تورينج $M$، يمكننا إيجاد برنامج NAND-TM $P_M$ بحيث لكل مدخل $x$، إذا توقّفت $M$ على المدخل $x$ بالخرج $y$ فإن $P_M(x)=y$.
ولأن هدفنا هو بيان أن مثل هذا البرنامج $P_M$ <em>يوجد</em> فحسب، فلا نحتاج إلى كتابة الشيفرة الكاملة لـ$P_M$ سطرًا بسطر، ويمكننا الاستفادة من مختلف أنواع «السكر النحوي» في وصفه.</p>
<p>والملاحظة المفتاحية هي أنه، بواسطة <a href="">NAND-univ-thm</a>{.ref}، يمكننا حساب <em>كل</em> دالة متناهية باستخدام برنامج NAND-CIRC.
وبخاصة، تأمّل دالة الانتقال  $\\delta_M:[k]\\times \\Sigma \\rightarrow [k] \\times \\Sigma  \\times {\\mathsf{L},\\mathsf{R},\\mathsf{S},\\mathsf{H}}$ لآلة تورينج لدينا.
ويمكننا ترميز مكوّناتها كما يلي:</p>
<ul>
<li>
<p>نرمّز $[k]$ باستخدام \${0,1}^\\ell$ و$\\Sigma$ باستخدام \${0,1}^{\\ell'}$،  حيث $\\ell = \\ceil{\\log k}$ و$\\ell' = \\ceil{\\log |\\Sigma|}$.</p>
</li>
<li>
<p>نرمّز المجموعة  \${\\mathsf{L},\\mathsf{R}, \\mathsf{S},\\mathsf{H} }$ باستخدام \${0,1}^2$. وسنختار الترميز $\\mathsf{L} \\mapsto 01$، $\\mathsf{R} \\mapsto 11$، $\\mathsf{S} \\mapsto 10$، $\\mathsf{H} \\mapsto 00$. (وهذا يوافق بالمصادفة دلالة العملية <code>MODANDJUMP</code>.)</p>
</li>
</ul>
<p>إذن يمكننا مطابقة $\\delta_M$ مع دالة $\\overline{M}:{0,1}^{\\ell+\\ell'}  \\rightarrow {0,1}^{\\ell+\\ell'+2}$، تُسقط السلاسل ذات الطول $\\ell+\\ell'$ على السلاسل ذات الطول $\\ell+\\ell'+2$.
وبموجب <a href="">NAND-univ-thm</a>{.ref}، يوجد برنامج NAND-CIRC <code>ComputeM</code> ذو طول متناهٍ يحسب هذه الدالة $\\overline{M}$.
وتتمثّل فكرة برنامج NAND-TM الذي يحاكي $M$ فيما يلي:</p>
<ol>
<li>
<p>استخدام المتغيّرات <code>state_</code>$0$ $\\ldots$ <code>state_</code>$\\ell-1$ لترميز حالة $M$.</p>
</li>
<li>
<p>استخدام المصفوفات <code>Tape_</code>$0$<code>[]</code> $\\ldots$ <code>Tape_</code>$\\ell'-1$<code>[]</code> لترميز شريط $M$.</p>
</li>
<li>
<p>استخدام الحقيقة بأن الانتقال متناهٍ ويمكن حسابه ببرنامج NAND-CIRC.</p>
</li>
</ol>
<p>وبناءً على ما سبق، يمكننا كتابة شيفرة من الشكل:</p>
<p><code>state_</code>$0$ $\\ldots$ <code>state_</code>$\\ell-1$, <code>Tape_</code>$0$<code>[i]</code>$\\ldots$ <code>Tape_</code>$\\ell'-1$<code>[i]</code>, <code>dir0</code>,<code>dir1</code> $\\leftarrow$ <code>TRANSITION(</code> <code>state_</code>$0$ $\\ldots$ <code>state_</code>$\\ell-1$, <code>Tape_</code>$0$<code>[i]</code>$\\ldots$ <code>Tape_</code>$\\ell'-1$<code>[i]</code> <code>)</code></p>
<p><code>MODANDJUMP(dir0,dir1)</code></p>
<p>كل خطوة من خطوات الحلقة الرئيسية للبرنامج أعلاه تحاكي بدقّة حساب آلة تورينج $M$، وبالتالي فإن البرنامج ينفّذ تمامًا تعريف الحساب بآلة تورينج كما في <a href="">TM-def</a>{.ref}.</p>
<p>وفي الاتجاه الآخر، نفترض أن $P$ برنامج NAND-TM فيه $s$ أسطر، و$\\ell$ متغيّرًا قياسيًا، و$\\ell'$ متغيّر مصفوفة. وسنبيّن أن وُجدت آلة تورينج $M_P$ لها $2^\\ell+C$ حالة وأبجدية $\\Sigma$ بحجم $C' + 2^{\\ell'}$ تحسب الدوال نفسها التي يحسبها $P$ (حيث $C$ و$C'$ ثابتان سنحدّدهما لاحقًا).</p>
<p>وبتحديد، تأمّل الدالة $\\overline{P}:{0,1}^\\ell \\times {0,1}^{\\ell'} \\rightarrow {0,1}^\\ell \\times {0,1}^{\\ell'}$ التي، على مدخل محتوى متغيّرات $P$ القياسية ومحتوى متغيّرات المصفوفة عند الموضع <code>i</code> في بداية تكرار، تُخرج كل القيم الجديدة لهذه المتغيّرات عند آخر سطر في التكرار، قبيل تنفيذ تعليمة <code>MODANDJUMP</code> مباشرةً.</p>
<p>إذا كان <code>foo</code> و<code>bar</code> هما المتغيّران المستخدمان كمدخل لتعليمة <code>MODANDJUMP</code>، فإننا، بناءً على قيم هذين المتغيّرين، نستطيع حساب ما إذا كان <code>i</code> سيزيد أم ينقص أم يبقى على قيمته، وما إذا كان البرنامج سيتوقّف أم سيقفز إلى البداية.
إذن يمكن لآلة تورينج أن تحاكي تنفيذًا واحدًا من تكرارات $P$ باستخدام دالة متناهية مطبَّقة على أبجديتها.
وسيكون عمل آلة تورينج إجمالًا كما يلي:</p>
<ol>
<li>
<p>تُرمّز الآلة $M_P$ محتوى متغيّرات مصفوفة $P$ في شريطها، ومحتوى المتغيّرات القياسية في (جزء من) حالتها. وبتحديد، إذا كان لدى $P$ عدد $\\ell$ من المتغيّرات المحلية وعدد $t$ من المصفوفات، فإن فضاء حالات $M$ سيكون كبيرًا بما يكفي لترميز كل تعيينات الـ$2^\\ell$ للمتغيّرات المحلية، وستكون أبجدية $\\Sigma$ لـ$M$ كبيرة بما يكفي لترميز كل تعيينات الـ$2^t$ لمتغيّرات المصفوفة عند كل موضع. ويقابل موضع الرأس متغيّر الفهرسة <code>i</code>.</p>
</li>
<li>
<p>تذكّر أن كل سطر في البرنامج $P$ يقابل قراءة وكتابة إمّا متغيّر قياسي أو متغيّر مصفوفة عند الموضع <code>i</code>. وفي تكرار واحد من تكرارات $P$ تبقى قيمة <code>i</code> ثابتة، ولذلك يمكن للآلة $M$ أن تحاكي هذا التكرار بقراءة قيم كل متغيّرات المصفوفة عند <code>i</code> (وهي مرمّزة بالرمز الواحد في الأبجدية $\\Sigma$ الموجود في الخلية رقم <code>i</code> من الشريط)، وقراءة قيم كل المتغيّرات القياسية (وهي مرمّزة في الحالة)، ثم تحديث كليهما. ويمكن لدالة انتقال $M$ أن تُخرج $\\mathsf{L}$ أو $\\mathsf{S}$ أو $\\mathsf{R}$ بحسب ما إذا كانت القيم المعطاة إلى العملية <code>MODANDJUMP</code> هي $01$ أو $10$ أو $11$ على التوالي.</p>
</li>
<li>
<p>عندما يتوقّف البرنامج (أي، حين يحصل <code>MODANDJUMP</code> على $00$)، تدخل آلة تورينج في حلقة خاصة تنسخ نتائج مصفوفة <code>Y</code> إلى الخرج ثم تتوقّف. ويمكننا تحقيق ذلك بإضافة بضع حالات أخرى.</p>
</li>
</ol>
<p>ما سبق ليس وصفًا رسميًّا كاملًا لآلة تورينج، لكن هدفنا هو بيان أن آلة من هذا النوع موجودة فحسب. ويمكن ملاحظة أن $M_P$ تحاكي كل خطوة من خطوات $P$، وبالتالي تحسب الدالة نفسها التي يحسبها $P$.</p>
</div>
<div class="callout callout--remark" id="polyequivrem">
<p><strong>ملاحظة — تكافؤ زمن التنفيذ (اختياري)</strong></p>
<p>وإذا فحصنا برهان <a href="">TM-equiv-thm</a>{.ref}، أمكننا أن نرى أن كل تكرار من تكرارات حلقة برنامج NAND-TM يقابل خطوة واحدة في تنفيذ آلة تورينج.
وسنعود إلى مسألة قياس عدد خطوات الحساب لاحقًا في هذه الدورة.
وأما في الوقت الحالي فالخلاصة الرئيسة هي أن برامج NAND-TM وآلات تورينج متكافئتان في القدرة أساسًا، حتى لو أخذنا زمن التنفيذ في الحسبان.</p>
</div>
<h3 id="المواصفة-مقابل-التنفيذ-مرة-أخرى">المواصفة مقابل التنفيذ (مرة أخرى)</h3>
<p>ما إن تفهم تعريفات كلٍّ من برامج NAND-TM وآلات تورينج، تصبح <a href="">TM-equiv-thm</a>{.ref} بديهية.
وفي الواقع، إن برامج NAND-TM ليست نموذجًا مختلفًا عن آلات تورينج بقدر ما هي مجرد إعادة صياغة للنموذج نفسه باستخدام تدوين لغات البرمجة.
ويمكنك أن تفكّر في الفرق بين آلة تورينج وبرنامج NAND-TM على أنه الفرق بين تمثيل عدد بكتابة عشرية أو كتابة ثنائية.
على النقيض من ذلك، فإن الفرق بين <em>دالة</em> $F$ وبين آلة تورينج تحسب $F$ أعمق بكثير: إنه أشبه بالفرق بين المعادلة $x^2 + x = 12$، والعدد $3$ الذي حلّ للمعادلة.
ولهذا السبب، ومع أخذنا عناية خاصة في التمييز بين <em>الدوال</em> وبين <em>البرامج</em> أو <em>الآلات</em>، سنُعرّف غالبًا المفهومين الأخيرين على أنهما واحد.
وسنتنقّل بحرّية بين وصف خوارزمية على أنها آلة تورينج أو أنها برنامج NAND-TM (وكذلك بعض نماذج الحوسبة المكافئة الأخرى التي سنراها في <a href="">chapequivalentmodels</a>{.ref} وما بعدها).</p>
<pre><code class="language-table">---
caption: 'Specification vs Implementation formalisms'
alignment: 'LL'
table-width: ''
id: specvsimp
---
*Setting* ; *Specification* ; *Implementation*
_Finite computation_ ; __Functions__ mapping $\\{0,1\\}^n$ to $\\{0,1\\}^m$ ; __Circuits__, __Straightline programs__
_Infinite computation_ ; __Functions__ mapping $\\{0,1\\}^*$ to $\\{0,1\\}$ or to $\\{0,1\\}^*$. ; __Algorithms__, __Turing Machines__, __Programs__
</code></pre>
<h2 id="السكر-النحوي-في-nand-tm">السكر النحوي في NAND-TM</h2>
<p>تمامًا كما فعلنا مع NAND-CIRC في <a href="">finiteuniversalchap</a>{.ref}، يمكننا استخدام «السكر النحوي» لتسهيل كتابة برامج NAND-TM.
وللبداية، يمكننا استخدام كل السكر النحوي الخاص بـNAND-CIRC، مثل تعريفات الماكروّات والشروط (أي if/then).
غير أننا يمكننا الذهاب إلى أبعد من ذلك وتحقيق (مثلًا):</p>
<ul>
<li>
<p>حلقات داخلية مثل عمليات <code>while</code> و<code>for</code> الشائعة في كثير من لغات البرمجة.</p>
</li>
<li>
<p>متغيّرات فهرسة متعدّدة (مثلًا، ليس <code>i</code> فحسب، بل يمكننا إضافة <code>j</code> و<code>k</code> وغيرها).</p>
</li>
<li>
<p>مصفوفات بأكثر من بُعد واحد (مثل <code>Foo[i][j]</code>، <code>Bar[i][j][k]</code> وغيرها.)</p>
</li>
</ul>
<p>في كل هذه الحالات (وغيرها الكثير) يمكننا تنفيذ الميزة الجديدة بوصفها مجرد «سكر نحوي» فوق NAND-TM القياسي. وهذا يعني أن مجموعة الدوال القابلة للحساب بـNAND-TM مع هذه الميزة هي نفسها مجموعة الدوال القابلة للحساب بـNAND-TM القياسي.
وبالمثل، يمكننا أن نبيّن أن مجموعة الدوال القابلة للحساب بآلات تورينج التي لها أكثر من شريط واحد، أو بشرائط ذات أبعاد أكثر من بعد واحد، هي نفسها مجموعة الدوال القابلة للحساب بآلات تورينج القياسية.</p>
<h3 id="goto-والحلقات-الداخلية-nandtminnerloopssec">‏<code>GOTO</code> والحلقات الداخلية { #nandtminnerloopssec }</h3>
<p>يمكننا تنفيذ بنيات <em>تكرارية</em> (<em>looping constructs</em>) أكثر تقدّمًا من البسيطة <code>MODANDJUMP</code>.
فمثلًا، يمكننا تنفيذ <code>GOTO</code>.
وتُقابل تعليمة <code>GOTO</code> القفز إلى سطر معيّن أثناء التنفيذ.
فمثلًا، إذا كان لدينا شيفرة من الشكل</p>
<pre><code class="language-python"><span class="hljs-string">&quot;start&quot;</span>:  do foo
   GOTO(<span class="hljs-string">&quot;end&quot;</span>)
<span class="hljs-string">&quot;skip&quot;</span>: do bar
<span class="hljs-string">&quot;end&quot;</span>: do blah
</code></pre>
<p>فإن البرنامج سينفّذ فقط <code>foo</code> و<code>blah</code>، لأنه عند الوصول إلى السطر <code>GOTO(&quot;end&quot;)</code> سيقفز إلى السطر الموسوم بـ<code>&quot;end&quot;</code>.
ويمكننا تحقيق أثر <code>GOTO</code> في NAND-TM باستخدام الشروط (<em>conditionals</em>).
وفي الشيفرة أدناه، نفترض لدينا متغيّر <code>pc</code> يمكن أن يأخذ سلاسل ذات طول ثابت ما.
وهذا يمكن ترميزه باستخدام عدد متناهٍ من المتغيّرات البوليانية <code>pc_0</code>، <code>pc_1</code>، $\\ldots$، <code>pc_</code>$k-1$، بحيث عندما نكتب أدناه
<code>pc = &quot;label&quot;</code> فإننا نعني شيئًا مثل <code>pc_0 = 0</code>,<code>pc_1 = 1</code>, $\\ldots$ (حيث تقابل البتات $0,1,\\ldots$ ترميز السلسلة المتناهية <code>&quot;label&quot;</code> كسلسلة من الطول $k$).
ونفترض أيضًا أننا توفّر على تعليمات شرطية (أي تعليمات <code>if</code>)، يمكننا محاكاتها باستخدام السكر النحوي بالطريقة نفسها التي فعلناها في NAND-CIRC.</p>
<p>لمحاكاة تعليمة GOTO، سنعدّل أولًا برنامج P من الشكل</p>
<pre><code class="language-python">do foo
do bar
do blah
</code></pre>
<p>ليصبح بالشكل التالي (باستخدام السكر النحوي لـ<code>if</code>):</p>
<pre><code class="language-python">pc = <span class="hljs-string">&quot;line1&quot;</span>
<span class="hljs-keyword">if</span> (pc==<span class="hljs-string">&quot;line1&quot;</span>):
    do foo
    pc = <span class="hljs-string">&quot;line2&quot;</span>
<span class="hljs-keyword">if</span> (pc==<span class="hljs-string">&quot;line2&quot;</span>):
    do bar
    pc = <span class="hljs-string">&quot;line3&quot;</span>
<span class="hljs-keyword">if</span> (pc==<span class="hljs-string">&quot;line3&quot;</span>):
    do blah
</code></pre>
<p>وهذان البرنامجان يفعلان الشيء نفسه.
ويُقابل المتغيّر <code>pc</code> «عدّاد البرنامج» (<em>program counter</em>)، وهو يخبر البرنامج أي سطر ينفّذ تاليًا.
ويمكننا أن نرى أن لو أردنا محاكاة <code>GOTO(&quot;line3&quot;)</code> لاستطعنا ببساطة تعديل التعليمة <code>pc = &quot;line2&quot;</code> لتصبح <code>pc = &quot;line3&quot;</code>.</p>
<p>في NAND-CIRC لم تكن لدينا سوى عمليات <code>GOTO</code> تتقدّم إلى الأمام في الشيفرة، لكن بما أن كل شيء في NAND-TM مندرج ضمن حلقة خارجية كبيرة، يمكننا استخدام الأفكار نفسها لتنفيذ عمليات <code>GOTO</code> إلى الخلف، وكذلك الحلقات الشرطية.</p>
<p><strong>حلقات أخرى.</strong> وبمجرد أن تتوفّر لدينا <code>GOTO</code>، يمكننا محاكاة جميع بنيات الحلقة القياسية مثل <code>while</code> أو <code>do .. until</code> أو <code>for</code> في NAND-TM أيضًا. فمثلًا، يمكننا استبدال الشيفرة</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> foo:
    do blah
do bar
</code></pre>
<p>بما يلي:</p>
<pre><code class="language-python"><span class="hljs-string">&quot;loop&quot;</span>:
    <span class="hljs-keyword">if</span> NOT(foo): GOTO(<span class="hljs-string">&quot;next&quot;</span>)
    do blah
    GOTO(<span class="hljs-string">&quot;loop&quot;</span>)
<span class="hljs-string">&quot;next&quot;</span>:
    do bar
</code></pre>
<div class="callout callout--remark" id="gotorem">
<p><strong>ملاحظة — ‏<code>GOTO</code> في لغات البرمجة</strong></p>
<p>كانت تعليمة <code>GOTO</code> عنصرًا أساسيًا في معظم لغات البرمجة المبكرة، لكنها فقدت كثيرًا من شعبيتها ولم تعد موجودة في كثير من اللغات الحديثة مثل <em>Python</em> و_Java_ و_Javascript_.
وفي سنة 1968، كتب إيدسغر دايكسترا (Edsger Dijkstra) رسالة شهيرة بعنوان &quot;<a href="https://goo.gl/bnNsjo">عبارة Go to ضارّة</a>&quot; (وانظر أيضًا <a href="">xkcdgotofig</a>{.ref}).
والعيب الرئيس في <code>GOTO</code> أنه يجعل تحليل البرامج أصعب، إذ يجعل البرهنة على <em>الثوابت</em> (<em>invariants</em>) البرنامج أصعب.</p>
<p>عندما يحتوي برنامج على حلقة من الشكل:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">100</span>):
    do something

do blah
</code></pre>
<p>تعلم أن سطر الشيفرة <code>do blah</code> لا يمكن بلوغه إلا إذا انتهت الحلقة، وعندها تعلم أن <code>j</code> يساوي $100$، وقد تتمكّن أيضًا من البرهنة على خصائص أخرى لحالة البرنامج.
على النقيض من ذلك، إذا كان البرنامج قد يقفز إلى <code>do blah</code> من أي نقطة أخرى في الشيفرة، فسيكون من الصعب عليك كمبرمج أن تعرف ما يمكنك الاعتماد عليه في هذه الشيفرة.
وكما قال دايكسترا، فإن هذه الثوابت مهمّة لأن <em>«قدراتنا الذهنية مهيّأة إلى حدٍّ بعيد لإتقان العلاقات الساكنة، وقدراتنا على تصوّر عمليات تتطوّر مع الزمن متطوّرة نسبيًا»</em>، وبالتالي <em>«علينا... أن نبذل... أقصى جهدنا لتقليص الفجوة المفاهيمية بين البرنامج الساكن والعملية الديناميكية.»</em></p>
<p>ومع ذلك، ما تزال <code>GOTO</code> جزءًا رئيسيًا من اللغات منخفضة المستوى حيث تُستخدم لتنفيذ بنيات حلقة أعلى مستوى مثل حلقتَي <code>while</code> و<code>for</code>.
فمثلًا، ورغم أن <em>Java</em> ليس فيها تعليمة <code>GOTO</code>، فإن Java Bytecode (وهو تمثيل أدنى مستوى لـJava) يحتوي على تعليمة من هذا النوع.
وبالمثل، فإن شيفرة بايثون (Python bytecode) لها تعليمات مثل  <code>POP_JUMP_IF_TRUE</code> تنفّذ وظيفة <code>GOTO</code>، وتتضمّن لغات التجميع الكثير تعليمات مشابهة.
والطريقة التي نستخدم بها <code>GOTO</code> لتنفيذ وظيفة أعلى مستوى في NAND-TM تذكّرنا بالطريقة التي تُستخدم بها تعليمات القفز المختلفة هذه لتنفيذ بنيات حلقة أعلى مستوى.</p>
</div>
<p><img src="/arabic-cs-library/images/introtcs/lec_06_loops-7.webp" alt="/images/introtcs/lec_06_loops-7.webp">{#xkcdgotofig .margin  }</p>
<h2 id="التوحيد-وnand-مقابل-nand-tm-نقاش">التوحيد، وNAND مقابل NAND-TM (نقاش)</h2>
<p>رغم أن NAND-TM تضيف عمليات زائدة على NAND-CIRC، فإن من غير الدقيق تمامًا القول إن برامج NAND-TM أو آلات تورينج «أقوى» من برامج NAND-CIRC أو من الدوائر البوليانية.
فبرامج NAND-CIRC، لأنها بلا حلقات، لا تنطبق ببساطة على حساب دوال لها عدد غير محدود من المداخل.
ولذلك، لحساب دالة $F:{0,1}^* :\\rightarrow {0,1}^*$ باستخدام NAND-CIRC (أو بما يكافئه من الدوائر البوليانية) نحتاج إلى <em>مجموعة</em> (<em>collection</em>) من البرامج/الدوائر: برنامج واحد لكل طول مدخل.</p>
<p>الفرق الجوهري بين NAND-CIRC وNAND-TM هو أن NAND-TM تتيح لنا التعبير عن الحقيقة أن خوارزمية حساب التكافؤات (<em>parities</em>) للسلاسل ذات الطول $100$ هي في الحقيقة الخوارزمية نفسها التي تحسب تكافؤات السلاسل ذات الطول $5$ (أو بشكل مماثل، الحقيقة أن خوارزمية جمع الأعداد ذات $n$ بت هي نفسها لكل $n$، إلخ).
أي يمكننا التفكير في برنامج NAND-TM للتكافؤ العام على أنه «البذرة» التي ننمو منها برامج NAND-CIRC لتكافؤات الطول $10$، أو الطول $100$، أو الطول $1000$، حسب الحاجة.</p>
<p>وتُعرف هذه الفكرة، وهي فكرة خوارزمية واحدة تستطيع حساب دوال بكل أطوال المداخل، بـ_توحيد_ (<em>uniformity</em>) الحوسبة. ولذلك نعتبر آلات تورينج / NAND-TM نماذج حوسبة <em>موحّدة</em> (<em>uniform</em>)، على النقيض من الدوائر البوليانية أو NAND-CIRC التي هي نماذج <em>غير موحّدة</em> (<em>non-uniform</em>)، يتعيّن فيها أن نحدّد برنامجًا مختلفًا لكل طول مدخل.</p>
<p>ونتطلّع إلى الأمام، سنرى أن هذا التوحيد يقود إلى فرق جوهري آخر بين آلات تورينج والدوائر.
يمكن لآلات تورينج أن يكون لها مداخل ومخارج أطول من وصف الآلة على هيئة سلسلة، وبخاصة أنه وُجد آلة تورينج قادرة على «تكرار ذاتها» بمعنى أنها تستطيع طباعة شيفرتها الخاصة.
وتُعدّ فكرة «التكرار الذاتي» (<em>self replication</em>)، والفكرة المرتبطة بها «الإحالة الذاتية» (<em>self reference</em>)، حاسمة في جوانب كثيرة من الحوسبة، بل وفي الحياة نفسها، سواء بصيغة برامج رقمية أو بيولوجية.</p>
<p>في الوقت الحالي، ما ينبغي أن تحفظه هو الفروق التالية بين نماذج الحوسبة <em>الموحّدة</em> و_غير الموحّدة_:</p>
<ul>
<li>
<p><strong>نماذج الحوسبة غير الموحّدة:</strong> من أمثلتها <em>برامج NAND-CIRC</em> و_الدوائر البوليانية_. هذه نماذج يستطيع فيها كل برنامج/دائرة فردي حساب دالة <em>متناهية</em> $f:{0,1}^n \\rightarrow {0,1}^m$. وقد رأينا أن <em>كل</em> دالة متناهية يمكن حسابها <em>بعض</em> برنامج/دائرة.
ولمناقشة حساب دالة <em>لا نهائية</em> $F:{0,1}^* \\rightarrow {0,1}^*$ نحتاج إلى السماح بـ_متسلسلة_ (<em>sequence</em>) \${ P_n }_{n\\in \\N}$ من البرامج/الدوائر (واحد لكل طول مدخل)، لكن هذا لا يلتقط فكرة <em>خوارزمية واحدة</em> لحساب الدالة $F$.</p>
</li>
<li>
<p><strong>نماذج الحوسبة الموحّدة:</strong> من أمثلتها <em>آلات تورينج</em> و_برامج NAND-TM_. هذه نماذج يستطيع فيها برنامج/آلة واحد أن يأخذ مداخل <em>بطول اعتباطي</em> وبالتالي يحسب دالة <em>لا نهائية</em> $F:{0,1}^* \\rightarrow {0,1}^*$.
عدد الخطوات التي يقطعها البرنامج/الآلة على مدخل ما غير محدّد مسبقًا، وبخاصة أن هناك احتمالًا في أن يدخل في <em>حلقة لا نهائية</em>.
وعلى النقيض من الحالة غير الموحّدة، فإننا <em>لم نُبَيِّن</em> أن كل دالة لا نهائية يمكن حسابها ببرنامج NAND-TM/آلة تورينج ما. وسنعود إلى هذه النقطة في <a href="">chapcomputable</a>{.ref}.</p>
</li>
</ul>
<blockquote>
<h3 id="recap">{ .recap }</h3>
</blockquote>
<ul>
<li><em>آلات تورينج</em> تلتقط فكرة خوارزمية واحدة تستطيع تقييم دوال بكل أطوال المداخل.</li>
<li>وهي مكافئة لـ_برامج NAND-TM_، التي تضيف الحلقات والمصفوفات إلى NAND-CIRC.</li>
<li>وعلى النقيض من NAND-CIRC أو الدوائر البوليانية، فإن عدد الخطوات التي تقطعها آلة تورينج على مدخل معيّن غير محدّد مسبقًا. وفي الواقع، يمكن لآلة تورينج أو لبرنامج NAND-TM أن يدخل في <em>حلقة لا نهائية</em> على مداخل معيّنة، وألا يتوقّف إطلاقًا.</li>
</ul>
<div class="exercises"><h2 id="تمارين">تمارين</h2>
<div class="callout callout--exercise" id="majoritynandtm">
<p><strong>تمرين — البرمجة الصريحة في NAND TM</strong></p>
<p>أنتج شيفرة برنامج NAND-TM $P$ (خالٍ من السكر النحوي) يحسب دالة <em>الأغلبيّة</em> (<em>Majority</em>) $Maj:{0,1}^* \\rightarrow {0,1}$ ذات طول المدخل غير المحدود، حيث لكل $x\\in {0,1}^*$، يكون $Maj(x)=1$ إذا وفقط إذا كان $\\sum_{i=0}^{|x|} x_i &gt; |x|/2$.   نقول «أنتج» بدلًا من «اكتب» لأنك لست مضطرًا إلى كتابة شيفرة $P$ يدويًا، بل يمكنك استخدام لغة البرمجة التي تختارها لحساب هذه الشيفرة.</p>
</div>
<div class="callout callout--exercise" id="computable">
<p><strong>تمرين — أمثلة على الدوال القابلة للحساب</strong></p>
<p>اثبت أن الدوال التالية قابلة للحساب. بالنسبة لكل هذه الدوال، لا يلزمك تحديد آلة تورينج أو برنامج NAND-TM الذي يحسب الدالة كاملًا، بل يكفي أن تثبت أن آلة أو برنامجًا من هذا النوع موجود:</p>
<ol>
<li>
<p>$INC:{0,1}^* \\rightarrow {0,1}^*$ التي تأخذ كمدخل تمثيل عدد طبيعي $n$ وتُخرج تمثيل $n+1$.</p>
</li>
<li>
<p>$ADD:{0,1}^* \\rightarrow {0,1}^*$  التي تأخذ كمدخل تمثيل زوج من الأعداد الطبيعية $(n,m)$ وتُخرج تمثيل $n+m$.</p>
</li>
<li>
<p>$MULT:{0,1}^* \\rightarrow {0,1}^*$, التي تأخذ تمثيل زوج من الأعداد الطبيعية $(n,m)$ وتُخرج تمثيل $n\\dot m$.</p>
</li>
<li>
<p>$SORT:{0,1}^* \\rightarrow {0,1}^*$ التي تأخذ كمدخل تمثيل قائمة من الأعداد الطبيعية $(a_0,\\ldots,a_{n-1})$ وتُرجع نسختها المرتَّبة $(b_0,\\ldots,b_{n-1})$ بحيث لكل $i\\in [n]$ يوجد $j \\in [n]$ بحيث $b_i=a_j$  و $b_0 \\leq b_1 \\leq \\cdots \\leq b_{n-1}$.</p>
</li>
</ol>
</div>
<div class="callout callout--exercise" id="twoindexex">
<p><strong>تمرين — NAND-TM بفهرسين</strong></p>
<p>عرّف NAND-TM' لتكون الصيغة البديلة من NAND-TM التي فيها <em>مُتغيّرا فهرسة</em> (<em>two index variables</em>) هما <code>i</code> و<code>j</code>.
يمكن فهرسة المصفوفات بـ<code>i</code> أو بـ<code>j</code>.
وتأخذ العملية <code>MODANDJUMP</code> أربعة متغيّرات $a,b,c,d$ وتستخدم قيمتي $c,d$ لتقرر هل تزيد <code>j</code> أم تنقص <code>j</code> أم تبقيها على القيمة نفسها (المقابلة لـ$01$ و$10$ و$00$ على التوالي).
اثبت أن لكل دالة $F:{0,1}^* \\rightarrow {0,1}^*$، تكون $F$ قابلة للحساب ببرنامج NAND-TM إذا وفقط إذا كانت $F$ قابلة للحساب ببرنامج NAND-TM'.</p>
</div>
<div class="callout callout--exercise" id="twotapeex">
<p><strong>تمرين — آلات تورينج بشريطين</strong></p>
<p>عرّف <em>آلة تورينج بشريطين</em> (<em>two tape Turing machine</em>) لتكون آلة تورينج لها شريطان منفصلان ورأسان منفصلان. وفي كل خطوة، تأخذ دالة الانتقال موضعَ الخليّتين في الشريطين كمدخل، ويمكنها أن تقرر ما إذا كانت تنقل كل رأس على حدة.
اثبت أن لكل دالة $F:{0,1}^* \\rightarrow {0,1}^*$، تكون $F$ قابلة للحساب بآلة تورينج قياسية إذا وفقط إذا كانت $F$ قابلة للحساب بآلة تورينج بشريطين.</p>
</div>
<div class="callout callout--exercise" id="twodimnandtmex">
<p><strong>تمرين — مصفوفات ثنائية البُعد</strong></p>
<p>عرّف NAND-TM&quot; لتكون الصيغة البديلة من NAND-TM التي، تمامًا مثل NAND-TM' المعرَّفة في <a href="">twoindexex</a>{.ref}، فيها متغيّرا فهرسة <code>i</code> و<code>j</code>، لكن المصفوفات الآن <em>ثنائية البُعد</em> (<em>two dimensional</em>)، ولذلك نفهرس المصفوفة <code>Foo</code> بـ<code>Foo[i][j]</code>.
اثبت أن لكل دالة $F:{0,1}^* \\rightarrow {0,1}^*$، تكون $F$ قابلة للحساب ببرنامج NAND-TM إذا وفقط إذا كانت $F$ قابلة للحساب ببرنامج NAND-TM''.</p>
</div>
<div class="callout callout--exercise" id="twodimtapeex">
<p><strong>تمرين — آلات تورينج ثنائية البُعد</strong></p>
<p>عرّف <em>آلة تورينج ثنائية البُعد</em> (<em>two-dimensional Turing machine</em>) لتكون آلة تورينج يكون شريطها <em>ثنائي البُعد</em>. وفي كل خطوة يمكن للآلة أن تتحرك $\\mathsf{U}$p (لأعلى)، أو $\\mathsf{D}$own (لأسفل)، أو $\\mathsf{L}$eft (إلى اليسار)،
أو $\\mathsf{R}$ight (إلى اليمين)، أو $\\mathsf{S}$ (تبقى مكانها).
اثبت أن لكل دالة $F:{0,1}^* \\rightarrow {0,1}^*$، تكون $F$ قابلة للحساب بآلة تورينج قياسية إذا وفقط إذا كانت $F$ قابلة للحساب بآلة تورينج ثنائية البُعد.</p>
</div>
<div class="callout callout--exercise">
<p><strong>تمرين</strong></p>
<p>اثبت خصائص الإغلاق التالية للمجموعة $\\mathbf{R}$ المعرَّفة في <a href="">classRdef</a>{.ref}:</p>
<ol>
<li>
<p>إذا كان $F \\in \\mathbf{R}$ فإن الدالة $G(x) = 1 - F(x)$ تكون في $\\mathbf{R}$.</p>
</li>
<li>
<p>إذا كان $F,G \\in \\mathbf{R}$ فإن الدالة $H(x) = F(x) \\vee G(x)$ تكون في $\\mathbf{R}$.</p>
</li>
<li>
<p>إذا كان $F \\in \\mathbf{R}$ فإن الدالة $F^<em>$ تكون في $\\mathbf{R}$ حيث $F^</em>$ معرَّفة كما يلي: $F^*(x)=1$ إذا وفقط إذا وُجدت سلاسل $w_0,\\ldots,w_{k-1}$ بحيث $x = w_0 w_1 \\cdots w_{k-1}$ و$F(w_i)=1$ لكل $i\\in [k]$.</p>
</li>
<li>
<p>إذا كان $F \\in \\mathbf{R}$ فإن الدالة
$$
G(x) = \\begin{cases}  \\exists_{y \\in {0,1}^{|x|}} F(xy) = 1 \\
0 &amp; \\text{otherwise}
\\end{cases}
$$
تكون في $\\mathbf{R}$.</p>
</li>
</ol>
</div>
<div class="callout callout--exercise" id="obliviousTMex">
<p><strong>تمرين</strong></p>
<p>عرّف آلة تورينج $M$ بأنها <em>غافِلة</em> (<em>oblivious</em>) إذا كانت تحركات رأسها مستقلة عن مدخلها.
أي نقول إن $M$ غافِلة إذا وُجدت متسلسلة لا نهائية  $MOVE \\in  {\\mathsf{L},\\mathsf{R}, \\mathsf{S} }^\\infty$ بحيث لكل $x\\in {0,1}^*$، تكون تحركات $M$ عند إعطائها المدخل $x$ (حتى النقطة التي تتوقّف عندها، إن وُجدت) هي $MOVE_0,MOVE_1,MOVE_2,\\ldots$.</p>
<p>اثبت أن لكل دالة $F:{0,1}^* \\rightarrow {0,1}^*$، إذا كانت $F$ قابلة للحساب فهي قابلة للحساب بآلة تورينج غافِلة. انظر الحاشية للدلالة.^[يمكنك استخدام المتسلسلة $\\mathsf{R}$، $\\mathsf{L}$،$\\mathsf{R}$، $\\mathsf{R}$، $\\mathsf{L}$، $\\mathsf{L}$، $\\mathsf{R}$،$\\mathsf{R}$،$\\mathsf{R}$، $\\mathsf{L}$، $\\mathsf{L}$، $\\mathsf{L}$، $\\ldots$.]</p>
</div>
<blockquote>
<h3 id="exercise-titlequotبت-واحد-مقابل-عدة-بتاتquot-singlebit-ex">{.exercise title=&quot;بتّ واحد مقابل عدة بتّات&quot; #singlebit-ex}</h3>
</blockquote>
<p>اثبت أن لكل $F:{0,1}^* \\rightarrow {0,1}^<em>$، تكون الدالة $F$ قابلة للحساب إذا وفقط إذا كانت الدالة التالية $G:{0,1}^</em> \\rightarrow {0,1}$ قابلة للحساب، حيث $G$ معرَّفة كما يلي:
$G(x,i,\\sigma) = \\begin{cases} F(x)_i &amp; i &lt; |F(x)|, \\sigma =0 \\ 1 &amp; i &lt; |F(x)|, \\sigma = 1 \\ 0 &amp; i \\geq |F(x)| \\end{cases}$</p>
<div class="callout callout--exercise" id="uncomputabilityviacountingex">
<p><strong>تمرين — عدم القابلية للحساب بالعدّ</strong></p>
<p>تذكّر أن  $\\mathbf{R}$ هي مجموعة كل الدوال الكلّية من \${0,1}^*$ إلى \${0,1}$ القابلة للحساب بآلة تورينج (انظر <a href="">classRdef</a>{.ref}). اثبت أن $\\mathbf{R}$ <em>قابلة للعدّ</em> (<em>countable</em>).
أي، اثبت أن وُجدت دالة أحادية التطابق $DtN:\\mathbf{R} \\rightarrow \\mathbb{N}$.
يمكنك استخدام التكافؤ بين آلات تورينج وبرامج NAND-TM.</p>
</div>
<div class="callout callout--exercise" id="uncountablefuncex">
<p><strong>تمرين — ليست كل الدوال قابلة للحساب</strong></p>
<p>اثبت أن مجموعة <em>كل</em> الدوال الكلّية من \${0,1}^* \\rightarrow {0,1}$ ليست <em>قابلة للعدّ</em>. يمكنك استخدام نتائج <a href="">cantorsec</a>{.ref}.
(وسنرى دالة <em>صريحة</em> غير قابلة للحساب في <a href="">chapcomputable</a>{.ref}.)</p>
</div>
<h2 id="ملاحظات-مرجعية-chaploopnotes">ملاحظات مرجعية { #chaploopnotes }</h2>
<p>أوغستا آدا بايرون، كاونتيسة لوفلايس (1815-1852) عاشت حياة قصيرة لكنها مضطربة، غير أنها معروفة اليوم في الأغلبية العظمى بفضل تعاونها مع تشارلز بابيج
(انظر [@stein1987ada] لسيرة ذاتية).
أبدت آدا اهتمامًا هائلًا بمحرك بابيج التحليلي، الذي ذكرناه في <a href="">compchap</a>{.ref}.
وفي سنة 1842-3، ترجمت من الإيطالية ورقة لمينابريا عن المحرك، مضيفةً ملاحظات وفيرة (أطول من الورقة نفسها).
والاقتباس في بداية الفصل مأخوذ من الملاحظة A في هذا النص.
تحتوي ملاحظات لوفلايس على عدة أمثلة لبرامج للمحرك التحليلي، ولهذا السبب سُمّيت «أول مبرمجة حاسوب في العالم»، وإن كان من غير الواضح ما إذا كانت هذه الأمثلة قد كُتبت من لوفلايس أو من بابيج نفسه [@holt2001ada].
وعلى أي حال، كانت آدا بوضوح إحدى القلائل جدًا (ربما الوحيدة خارج بابيج نفسه) التي أدركت تمامًا مدى أهمية فكرة مكننة الحوسبة وثوريتها.</p>
<p>تناقش كتابا شيتري [@shetterly2016hidden] وسوبل [@sobel2017the] تاريخ «الحاسوبين البشريين» (كانوا نساء في أغلب الأحيان) ومساهماتهم المهمّة في الاكتشافات العلمية في الفلك واستكشاف الفضاء.</p>
<p>كان آلان تورينج إحدى عقول القرن العشرين العملاقة. لم يكن أول من عرّف مفهوم الحوسبة فحسب، بل اخترع بعض أقدم أجهزة الحوسبة في العالم واستخدمها في محاولة لكسر شيفرة <em>Enigma</em> خلال الحرب العالمية الثانية، مما أنقذ <a href="https://goo.gl/KY1bJN">ملايين الأرواح</a>.
ولأسف، انتحر تورينج سنة 1954، بعد إدانته سنة 1952 بسبب ممارسات المثلية وما فرضته المحكمة من علاج هرموني.
وفي سنة 2009، قدّم رئيس الوزراء البريطاني غوردون براون اعتذارًا رسميًا علنيًا لتورينج، وفي سنة 2013 منحت الملكة إليزابيث الثاني تورينج عفوًا بعد وفاته.
وتتناول حياة تورينج <a href="https://goo.gl/3GdFdp">كتاب رائع</a> و<a href="https://goo.gl/EtQvSu">فيلم رديء</a>.</p>
<p>يعرّف نصّ سيبسر [@SipserBook] آلة تورينج على أنها <em>سباعية</em> (<em>seven tuple</em>) تتكوّن من فضاء الحالات، وأبجدية المدخل، وأبجدية الشريط، ودالة الانتقال، وحالة البدء، وحالة القبول، وحالة الرفض.
وفي الظاهر يبدو هذا تعريفًا مختلفًا جدًا عن <a href="">TM-def</a>{.ref}، لكنه ببساطة تمثيل مختلف للمفهوم نفسه، تمامًا كما يمكن تمثيل الرسم البياني إمّا بقائمة تجاور أو بمصفوفة تجاور.</p>
<p>أحد الفروق أن سيبسر يتناول مجموعة عامة من الحالات $Q$ ليست بالضرورة من الشكل $Q={0,1,2,\\ldots, k-1}$ لبعض عدد طبيعي $k&gt;0$.
ويقتصر سيبسر أيضًا انتباهه على آلات تورينج التي تُخرج بتًّا واحدًا فقط، ولذلك يسمّي حالتَي توقّف خاصتين: «حالة التوقّف 0» (وهي المعروفة غالبًا بـ_حالة الرفض_) والأخرى «حالة التوقّف 1» (وهي المعروفة غالبًا بـ_حالة القبول_).
وبذلك، بدلًا من كتابة $0$ أو $1$ على شريط خرج، تدخل الآلة في إحدى هاتين الحالتين وتتوقّف.
وهذا أيضًا لا يُحدث فرقًا في القدرة الحاسوبية، وإن كنا نفضّل النموذج الأكثر عمومية ذي المخارج متعددة البتّات.
(يقدّم سيبسر المهمة الأساسية لآلة تورينج على أنها <em>قرار لغة</em> بدلًا من حساب دالة، لكنهما متكافئتان، انظر <a href="">decidablelanguagesrem</a>{.ref}.)</p>
<p>ويتناول سيبسر أيضًا دوال مدخلها في $\\Sigma^*$ لأبجدية اعتباطية $\\Sigma$ (وعليه فإنما يميّز بين <em>أبجدية المدخل</em> التي يسمّيها $\\Sigma$ و_أبجدية الشريط_ التي يسمّيها $\\Gamma$)، في حين أننا نقتصر على الدوال التي مدخلها سلاسل ثنائية.
ومرة أخرى، هذه ليست مسألة كبيرة، يمكننا دائمًا ترميز عنصر من $\\Sigma$ باستخدام سلسلة ثنائية من الطول $\\log \\ceil{|\\Sigma|}$.
وأخيرًا (وهذه نقطة صغيرة جدًا) يشترط سيبسر على الآلة أن تتحرك إلى اليسار أو إلى اليمين في كل خطوة، دون عملية $\\mathsf{S}$ (البقاء في المكان)، مع أن البقاء في المكان سهل جدًا في المحاكاة بمجرد الحركة إلى اليمين ثم العودة إلى اليسار.</p>
<p>ومن التعريفات الأخرى المستخدمة في الأدبيات أن آلة تورينج $M$ <em>تتعترف</em> (<em>recognizes</em>) بلغة $L$ إذا كان لكل $x\\in L$، $M(x)=1$ ولكل $x\\not\\in L$، $M(x) \\in {0,\\bot }$. وتُسمّى اللغة $L$ <em>قابلة للتعداد تعاوديًا</em> (<em>recursively enumerable</em>) إذا وُجدت آلة تورينج $M$ تتعرف عليها، وغالبًا ما تُرمز مجموعة كل اللغات القابلة للتعداد تعاوديًا بـ$\\mathbf{RE}$.
لن نستخدم هذا المصطلح في هذا الكتاب.</p>
<p>ومن أوائل الصياغات لآلات تورينج بلغة برمجة ما قدّمه وانغ [@Wang1957]. وتستهدف صياغتنا لـNAND-TM جعل الصلة بالدوائر أكثر مباشرة، بهدف استعمالها لاحقًا في مبرهنة كوك-ليفن، وكذلك في نتائج مثل $\\mathbf{P} \\subseteq \\mathbf{P_{/poly}}$ و $\\mathbf{BPP} \\subseteq \\mathbf{P_{/poly}}$.
يضم الموقع <a href="https://esolangs.org">esolangs.org</a> تنوّعًا كبيرًا من لغات البرمجة الغامضة التورينجية الكاملة.
ومن أشهرها على الإطلاق <a href="https://esolangs.org/wiki/Brainfuck">Brainf*ck</a>.</p>
</div>`,i={book:e,chapter:n,chapterTitle:o,slug:a,title:t,headings:s,html:$};export{e as book,n as chapter,o as chapterTitle,i as default,s as headings,$ as html,a as slug,t as title};
