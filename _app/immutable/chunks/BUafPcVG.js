const n="introtcs",e="lec_03a_computing_every_function",t="Computing Every Function",a="index",s="السكر النحوي، وحساب كل دالة {#finiteuniversalchap }",o=[{depth:3,id:"objectives",text:"{ .objectives }"},{depth:2,id:"بعض-أمثلة-السكر-النحوي-secsyntacticsugar",text:"بعض أمثلة السكر النحوي  { #secsyntacticsugar }"},{depth:3,id:"إجراءات-معرفة-من-المستخدم",text:"إجراءات معرَّفة من المستخدم"},{depth:3,id:"theorem-titlequotسكر-نحوي-لتعريف-الإجراءاتquot-functionsynsugarthm",text:"{.theorem title=&quot;سكر نحوي لتعريف الإجراءات&quot; #functionsynsugarthm}"},{depth:3,id:"البرهان-بـ-python-اختياري-functionsynsugarthmpython",text:"البرهان بـ Python (اختياري) { #functionsynsugarthmpython }"},{depth:3,id:"الجمل-الشرطية-ifstatementsec",text:"الجمل الشرطية {#ifstatementsec }"},{depth:3,id:"pause",text:"{ .pause }"},{depth:3,id:"theorem-titlequotالسكر-النحوي-للجمل-الشرطيةquot-conditionalsugarthm",text:"{.theorem title=&quot;السكر النحوي للجمل الشرطية&quot; #conditionalsugarthm }"},{depth:2,id:"مثال-موسع-الجمع-والضرب-اختياري-addexample",text:"مثال موسَّع: الجمع والضرب (اختياري) { #addexample }"},{depth:3,id:"theorem-titlequotالجمع-ببرامج-nand-circquot-addition-thm",text:"{.theorem title=&quot;الجمع ببرامج NAND-CIRC&quot; #addition-thm}"},{depth:3,id:"theorem-titlequotالضرب-ببرامج-nand-circquot-theoremid",text:"{.theorem title=&quot;الضرب ببرامج NAND-CIRC&quot; #theoremid}"},{depth:2,id:"دالة-lookup-seclookupfunc",text:"دالة $LOOKUP$ { #seclookupfunc }"},{depth:3,id:"definition-titlequotدالة-البحثquot-lookup-def",text:"{.definition title=&quot;دالة البحث&quot; #lookup-def}"},{depth:3,id:"بناء-برنامج-nand-circ-لدالة-lookup",text:"بناء برنامج NAND-CIRC لدالة $LOOKUP$"},{depth:3,id:"lemma-titlequotتكرار-دالة-البحثquot-lookup-rec-lem",text:"{.lemma title=&quot;تكرار دالة البحث&quot; #lookup-rec-lem}"},{depth:3,id:"proof-data-refquotlookup-rec-lemquot",text:"{.proof data-ref=&quot;lookup-rec-lem&quot;}"},{depth:2,id:"حساب-كل-دالة-seccomputeallfunctions",text:"حساب كل دالة { #seccomputeallfunctions }"},{depth:3,id:"theorem-titlequotشمولية-nandquot-nand-univ-thm",text:"{.theorem title=&quot;شمولية NAND&quot; #NAND-univ-thm}"},{depth:3,id:"theorem-titlequotشمولية-الدوائر-المنطقيةquot-circuit-univ-thm",text:"{.theorem title=&quot;شمولية الدوائر المنطقية&quot; #circuit-univ-thm}"},{depth:3,id:"برهان-شمولية-nand",text:"برهان شمولية NAND"},{depth:3,id:"remark-titlequotالنتيجة-في-منظورquot-discusscomputation",text:"{.remark title=&quot;النتيجة في منظور&quot; #discusscomputation}"},{depth:3,id:"تحسين-بمعامل-n-اختياري-tight-upper-bound",text:"تحسين بمعامل $n$ (اختياري) {#tight-upper-bound}"},{depth:3,id:"theorem-titlequotشمولية-دوائر-nand-بحد-محسنquot-nand-univ-thm-improved",text:"{.theorem title=&quot;شمولية دوائر NAND، بحدّ محسّن&quot; #NAND-univ-thm-improved}"},{depth:3,id:"theorem-titlequotشمولية-الدوائر-المنطقية-بحد-محسنquot-circuit-univ-thm-improved",text:"{.theorem title=&quot;شمولية الدوائر المنطقية، بحدّ محسّن&quot; #circuit-univ-thm-improved}"},{depth:2,id:"حساب-كل-دالة-برهان-بديل-seccomputalternative",text:"حساب كل دالة: برهان بديل {#seccomputalternative }"},{depth:3,id:"theorem-titlequotشمولية-الدوائر-المنطقية-صياغة-بديلةquot-circuit-univ-alt-thm",text:"{.theorem title=&quot;شمولية الدوائر المنطقية (صياغة بديلة)&quot; #circuit-univ-alt-thm}"},{depth:3,id:"proofidea-data-refquotcircuit-univ-alt-thmquot",text:"{.proofidea data-ref=&quot;circuit-univ-alt-thm&quot;}"},{depth:2,id:"الصنف-sizenms-secdefinesizeclasses",text:"الصنف $SIZE_{n,m}(s)$ {#secdefinesizeclasses }"},{depth:3,id:"definition-titlequotصنف-حجم-الدوالquot-sizedef",text:"{.definition title=&quot;صنف حجم الدوال&quot; #sizedef}"},{depth:3,id:"lemma-nandaonsizelem",text:"{.lemma #nandaonsizelem}"},{depth:3,id:"recap",text:"{ .recap }"},{depth:2,id:"تمارين",text:"تمارين"},{depth:3,id:"exercise-titlequotالجمعquot-addition-ex",text:"{.exercise title=&quot;الجمع&quot; #addition-ex}"},{depth:3,id:"exercise-titlequotالضربquot-multiplication-ex",text:"{.exercise title=&quot;الضرب&quot; #multiplication-ex}"},{depth:3,id:"exercise-titlequotضرب-كفؤ-تحدquot-eff-multiplication-ex",text:"{.exercise title=&quot;ضرب كفؤ (تحدٍّ)&quot; #eff-multiplication-ex}"},{depth:2,id:"ملاحظات-ببليوغرافية-computeeveryfunctionbibnotes",text:"ملاحظات ببليوغرافية { #computeeveryfunctionbibnotes  }"}],$=`<h1>السكر النحوي، وحساب كل دالة {#finiteuniversalchap }</h1>
<blockquote>
<h3 id="objectives">{ .objectives }</h3>
</blockquote>
<ul>
<li>أن تتمرّس على السكر النحوي أو الترجمة التلقائية للمنطق عالي المستوى إلى البوابات منخفضة المستوى. \\</li>
<li>أن تتعلّم برهان نتيجة رئيسية: كل دالة متناهية يمكن حسابها بدائرة منطقية. \\</li>
<li>أن تبدأ التفكير <em>كمّيًا</em> في عدد الأسطر التي تتطلّبها عملية الحساب.</li>
</ul>
<blockquote>
<p><em>«[في عام 1951] كان لديّ مُصرِّف (compiler) يعمل، ولم يقترب منه أحد لأنهم، كما قالوا بعناية، لا يمكن للحواسيب سوى أن تقوم بالحساب العددي (arithmetic)؛ إذ لا يمكنها تنفيذ البرامج.»</em>، غريس موراي هوبِر، 1986.</p>
</blockquote>
<blockquote>
<p><em>«السكر النحوي يُسبّب سرطان الفاصلة المنقوطة.»</em>، آلان بيرليس، 1982.</p>
</blockquote>
<p>النماذج الحوسبية التي نظرناها حتى الآن في أبسط صورة ممكنة لها.
على سبيل المثال، لا تمتلك «لغة البرمجة» NAND-CIRC لدينا سوى عملية واحدة وهي <code>foo = NAND(bar,blah)</code>.
في هذا الفصل سنرى أن هذه النماذج البسيطة هي في الواقع <em>متكافئة</em> مع نماذج أكثر تطوّرًا.
الملاحظة المفتاحية هي أننا نستطيع تنفيذ سمات أكثر تعقيدًا باستخدام لبناتنا الأساسية، ثم نستخدم هذه السمات الجديدة بدورها لبناتٍ أكثر تعقيدًا.
ويُعرف هذا بـ«السكر النحوي» (syntactic sugar) في مجال تصميم لغات البرمجة، لأننا لا نعدّل نموذج البرمجة الأساسي نفسه، بل نكتفي بتنفيذ سمات جديدة عبر تحويل برنامج يستعمل هذه السمات نحويًا إلى برنامج لا يستعملها.</p>
<p>يوفّر هذا الفصل «عدّة أدوات» (toolkit) يمكن استعمالها لإظهار أن كثيرًا من الدوال يمكن حسابها ببرامج NAND-CIRC، وبالتالي أيضًا بدوائر منطقية.
وسنستعمل هذه العدّة أيضًا لإثبات مبرهنة أساسية: <em>كل</em> دالة متناهية $f:{0,1}^n \\rightarrow {0,1}^m$ يمكن حسابها بدائرة منطقية، انظر <a href="/arabic-cs-library/images/introtcs/fig-compute_every_function_overview.webp">circuit-univ-thm</a>{.ref} أدناه.
ولأهمية عدّة السكر النحوي في ذاتها، يمكن أيضًا إثبات <a href="/arabic-cs-library/images/introtcs/fig-progcircmaj.webp">circuit-univ-thm</a>{.ref} مباشرة دون استعمال هذه العدّة.
ونعرض هذا البرهان البديل في <a href="/arabic-cs-library/images/introtcs/fig-add2bitnumbers.webp">seccomputalternative</a>{.ref}.
انظر <a href="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-1.webp">computefuncoverviewfig</a>{.ref} لتجد ملخّص نتائج هذا الفصل.</p>
<p><img src="/arabic-cs-library/images/introtcs/fig-computeallfunctionalt.webp" alt="ملخّص نتائج هذا الفصل. في secsyntacticsugar{.ref} نقدّم عدّة أدوات تحويل «سكر نحوي» تبيّن كيف يمكن تنفيذ سمات مثل الدوال المعرَّفة من المُبرمِج (programmer-defined functions) والجمل الشرطية (conditional statements) في NAND-CIRC. نستعمل هذه الأدوات في seclookupfunc{.ref} لنقدّم برنامج NAND-CIRC (أو بدلًا من ذلك دائرة منطقية) يحسب دالة $LOOKUP$. ثم نبني على هذه النتيجة لنبيّن في seccomputeallfunctions{.ref} أن برامج NAND-CIRC (أو ما يماثلها من دوائر منطقية) تستطيع حساب كل دالة متناهية. ويُعرض برهان بديل مباشر للنتيجة نفسها في seccomputalternative{.ref}.">{#computefuncoverviewfig  }</p>
<p>::: {.nonmath}</p>
<p>في هذا الفصل سنرى نتيجتنا الرئيسية الأولى: <em>كل</em> دالة متناهية يمكن حسابها بدائرة منطقية ما (انظر <a href="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-5.webp">circuit-univ-thm</a>{.ref} و<a href="/arabic-cs-library/images/introtcs/fig-funcvscircs.webp">finitecomputation</a>{.ref}).
ويُعرف هذا أحيانًا بـ«شمولية» (universality) عمليات $AND$ و$OR$ و$NOT$ (وباستعمال تكافؤ <a href="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-6.webp">compchap</a>{.ref}، كذلك $NAND$)</p>
<p>ولأهمية هذه النتيجة، إلا أن [circuit-univ-thm](https://en.wikipedia.org/wiki/Master%5Ftheorem%5F(analysis%5Fof%5Falgorithms){.ref} ليس صعب الإثبات في الحقيقة. إذ يعرض <a href="https://babeljs.io/">seccomputalternative</a>{.ref} برهانًا مباشرًا بسيطًا نسبيًا لهذه النتيجة.
غير أننا في <a href="https://babeljs.io/docs/plugins/">secsyntacticsugar</a>{.ref} و<a href="">seclookupfunc</a>{.ref} نستنتج هذه النتيجة باستعمال مفهوم «السكر النحوي» (انظر <a href="">synsugar</a>{.ref}).
وهذا مفهوم مهم في نظرية لغات البرمجة وفي ممارستها.
الفكرة وراء «السكر النحوي» هي أننا نستطيع توسيع لغة برمجة بتنفيذ سمات متقدّمة انطلاقًا من مكوّناتها الأساسية.
على سبيل المثال، يمكننا أن نأخذ لغتَي البرمجة AON-CIRC وNAND-CIRC اللتين رأيناهما في <a href="">compchap</a>{.ref}، ونوسّعهما للحصول على سمات مثل الدوال المعرَّفة من المستخدم (user-defined functions) (مثل <code>def Foo(...)</code>)، والجمل الشرطية (conditional statements) (مثل <code>if blah ...</code>)، وغيرها.
وبعد أن تتوفّر لدينا هذه السمات، ليس من الصعب البتّة أن نبيّن أننا نستطيع أن نأخذ «جدول الصدق» (truth table)، أي جدول كل المُداخل والمُخارج، لأي دالة، ونستعمله لإنشاء برنامج AON-CIRC أو NAND-CIRC يُسقط كل مُدخل على مُخرجه المقابل.</p>
<p>وسنلمّ في هذا الفصل أيضًا لأول مرة إلى <em>المقادير الكمية</em> (quantitative measures). فبينما تخبرنا <a href="">circuit-univ-thm</a>{.ref} أن كل دالة يمكن حسابها بدائرة <em>ما</em>، فإن عدد البوابات في هذه الدائرة قد يكون أُسّيّ النمو.
(لا نستعمل هنا كلمة «أُسّيّ» بالمعنى العامي الذي يعني «كبير جدًا جدًا»، بل بمعنى رياضي دقيق جدًّا، وهو ما يتزامن بالمصادفة مع كونه كبيرًا جدًا جدًا.)
ويبيّن الأمر في الواقع أن <em>بعض الدوال</em> (مثل جمع الأعداد الصحيحة وضربها) يمكن حسابها فعلًا بعدد بوابات أقل بكثير.
وسنتناول مسألة «تعقيد البوابات» (gate complexity) بمزيد من التعمّق في <a href="">codeanddatachap</a>{.ref} والفصول التالية.
:::</p>
<h2 id="بعض-أمثلة-السكر-النحوي-secsyntacticsugar">بعض أمثلة السكر النحوي  { #secsyntacticsugar }</h2>
<p>نعرض الآن بعض أمثلة تحويلات «السكر النحوي» التي يمكننا استعمالها في بناء برامج مستقيمة أو دوائر.
نركّز على رؤية «لغة البرمجة المستقيمة» (<em>straight-line programming language</em>) لنماذجنا الحوسبية، وتحديدًا (من أجل الاتّضاح) على لغة البرمجة NAND-CIRC.
وهذا مريح لأن كثيرًا من تحويلات السكر النحوي التي نعرضها يسهل التفكير فيها بوصفها تطبيقات لعمليات «بحث واستبدال» (search and replace) على الشيفرة المصدرية لبرنامج.
غير أنه، بموجب <a href="">equivalencemodelsthm</a>{.ref}، تنطبق كل نتائجنا على الدوائر على قدم المساواة، سواء كانت دوائر تستعمل بوابات NAND أو دوائر منطقية تستعمل العمليات AND وOR وNOT.
قد يكون استعراض أمثلة تحويلات السكر النحوي هذه مملًّا بعض الشيء، غير أننا نفعله لسببين:</p>
<ol>
<li>
<p>كي نُقنعك بأنه، رغم بساطتها الظاهرة ومحدودياتها، فإن النماذج البسيطة مثل الدوائر المنطقية أو لغة البرمجة NAND-CIRC قوية في الواقع إلى حدٍّ كبير.</p>
</li>
<li>
<p>كي تدرك كم أنت محظوظ لأنك تدرس مساقًا في نظرية الحوسبة (theory of computation) لا مساقًا في مُصرِّفات المترجِمين (compilers)... <code>:)</code></p>
</li>
</ol>
<h3 id="إجراءات-معرفة-من-المستخدم">إجراءات معرَّفة من المستخدم</h3>
<p>من أركان أي لغة برمجة تقريبًا القدرة على تعريف <em>إجراءات</em> (procedures) أو <em>دوال فرعية</em> (subroutines) ثم تنفيذها.
(وتُسمّى هذه في بعض لغات البرمجة <em>دوال</em> (functions)، لكننا نفضّل اسم <em>إجراءات</em> (procedures) تفاديًا للالتباس مع الدالة التي يحسبها البرنامج.)
ليس في لغة البرمجة NAND-CIRC هذه الآلية مُدمجة.
غير أننا نستطيع تحقيق الأثر نفسه باستعمال التقنية العريقة «نسخ ولصق» (copy and paste).
على وجه التحديد، يمكننا استبدال شيفرة تعرّف إجراءً مثل</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">Proc</span>(<span class="hljs-params">a,b</span>):
    proc_code
    <span class="hljs-keyword">return</span> c
some_code
f = Proc(d,e)
some_more_code
</code></pre>
<p>بالشيفرة التالية التي «نلصق» فيها شيفرة <code>Proc</code></p>
<pre><code class="language-python">some_code
proc_code<span class="hljs-string">&#x27;
some_more_code
</span></code></pre>
<p>وحيث إنّ <code>proc_code'</code> يُنتَج باستبدال كل ورود لـ <code>a</code> بـ <code>d</code>، و<code>b</code> بـ <code>e</code>، و<code>c</code> بـ <code>f</code>.
وعندئذٍ سنحتاج إلى التأكّد من أن بقية المتغيّرات الظاهرة في <code>proc_code'</code> لا تتداخل مع متغيّرات أخرى.
ويمكننا دائمًا فعل ذلك بإعادة تسمية المتغيّرات إلى أسماء جديدة لم تُستعمل من قبل.
ويؤدّي الاستدلال أعلاه إلى برهان المبرهنة التالية:</p>
<blockquote>
<h3 id="theorem-titlequotسكر-نحوي-لتعريف-الإجراءاتquot-functionsynsugarthm">{.theorem title=&quot;سكر نحوي لتعريف الإجراءات&quot; #functionsynsugarthm}</h3>
</blockquote>
<p>لتكن NAND-CIRC-PROC هي لغة البرمجة NAND-CIRC معزَّزة بالصياغة أعلاه لتعريف الإجراءات.
عندئذٍ، لكل برنامج NAND-CIRC-PROC من الشكل $P$، يوجد برنامج NAND-CIRC معياري (أي «خالٍ من السكر») $P'$ يحسب الدالة نفسها التي يحسبها $P$.</p>
<p>::: {.remark title=&quot;لا إجراءات تكرارية&quot; #norecursion}
لا تسمح NAND-CIRC-PROC إلّا بـ_إجراءات غير تكرارية_ (<em>non-recursive</em>). وعلى وجه الخصوص، لا تستطيع شيفرة إجراء <code>Proc</code> أن تستدعي <code>Proc</code>، بل تستعمل فقط الإجراءات التي عُرِّفت قبله.
ومن دون هذا القيد، قد لا ينتهي إجراء «البحث والاستبدال» أعلاه أبدًا، ولن يكون <a href="">functionsynsugarthm</a>{.ref} صحيحًا.
:::</p>
<p>يمكن إثبات <a href="">functionsynsugarthm</a>{.ref} باستعمال التحويل أعلاه، لكن بما أن البرهان الرسمي طويل ومملّ بعض الشيء، فإننا نُهمله هنا.</p>
<p>::: {.example title=&quot;حساب دالة الأغلبية انطلاقًا من NAND باستعمال السكر النحوي&quot; #majcircnand}
تتيح لنا الإجراءات التعبير عن برامج NAND-CIRC بوضوح وإيجاز أكبر بكثير.
على سبيل المثال، بما أننا نستطيع حساب AND وOR وNOT باستعمال NAND، يمكننا حساب دالة <em>الأغلبية</em> (<em>Majority</em>) على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">NOT</span>(<span class="hljs-params">a</span>):
    <span class="hljs-keyword">return</span> NAND(a,a)
<span class="hljs-keyword">def</span> <span class="hljs-title function_">AND</span>(<span class="hljs-params">a,b</span>):
    temp = NAND(a,b)
    <span class="hljs-keyword">return</span> NOT(temp)
<span class="hljs-keyword">def</span> <span class="hljs-title function_">OR</span>(<span class="hljs-params">a,b</span>):
    temp1 = NOT(a)
    temp2 = NOT(b)
    <span class="hljs-keyword">return</span> NAND(temp1,temp2)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">MAJ</span>(<span class="hljs-params">a,b,c</span>):
    and1 = AND(a,b)
    and2 = AND(a,c)
    and3 = AND(b,c)
    or1 = OR(and1,and2)
    <span class="hljs-keyword">return</span> OR(or1,and3)

<span class="hljs-built_in">print</span>(MAJ(<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>))
<span class="hljs-comment"># 1</span>
</code></pre>
<p>يعرض <a href="">progcircmajfig</a>{.ref} برنامج NAND-CIRC «الخالي من السكر» (والدائرة المقابلة له) الذي ينتج عن «فكّ» هذا البرنامج، أي استبدال استدعاءات الإجراءات بتعريفاتها.
:::</p>
<p>::: { .bigidea #synsugar}
متى بيّنا أن نموذجًا حوسبًا $X$ متكافئ مع نموذج يملك السمة $Y$، استطعنا أن نفترض توفّر $Y$ عند إظهار أن دالة $f$ قابلة للحساب بواسطة $X$.
:::</p>
<p><img src="/arabic-cs-library/images/introtcs/fig-progcircmaj.webp" alt="برنامج NAND-CIRC معياري (أي «خالٍ من السكر») يُنتَج بفكّ تعريفات الإجراءات في برنامج الأغلبية (majcircnand{.ref}). الدائرة المقابلة له على اليمين. لاحظ أن هذه ليست أكثر دائرة NAND ولا أكثر برنامج NAND كفاءةً للأغلبية: يمكننا توفير بعض البوابات عبر «اختصار» الخطوات التي تحسب فيها بوابة $u$ القيمة $NAND(v,v)$ ثم تحسب بوابة $w$ القيمة $NAND(u,u)$ (كما تُشير إليه الأسهم الخضراء المتقطّعة في الشكل أعلاه).">{#progcircmajfig}</p>
<p>::: {.remark title=&quot;عدّ الأسطر&quot; #countinglines}
رغم أننا نستطيع استعمال السكر النحوي لـ_عرض_ برامج NAND-CIRC بصورة أكثر قابلية للقراءة، فإننا لم نغيّر تعريف اللغة نفسها.
لذلك، كلما قلنا إن دالة ما $f$ لها برنامج NAND-CIRC من $s$ سطرًا، فإننا نعني برنامج NAND-CIRC معياريًا «خالٍ من السكر»، قد فُكّ فيه كل السكر النحوي.
على سبيل المثال، برنامج <a href="">majcircnand</a>{.ref} هو برنامج من $12$ سطرًا لحساب دالة $MAJ$، رغم أنه يمكن كتابته في أسطر أقل باستعمال NAND-CIRC-PROC.
:::</p>
<h3 id="البرهان-بـ-python-اختياري-functionsynsugarthmpython">البرهان بـ Python (اختياري) { #functionsynsugarthmpython }</h3>
<p>يمكننا كتابة برنامج بلغة Python يُنفّذ برهان <a href="">functionsynsugarthm</a>{.ref}.
وهذا برنامج Python يأخذ برنامج NAND-CIRC-PROC من الشكل $P$ الذي يتضمّن تعريفات إجراءات، ويستعمل «بحثًا واستبدالًا» بسيطًا (search and replace) لتحويل $P$ إلى برنامج NAND-CIRC معياري (أي «خالٍ من السكر») $P'$ يحسب الدالة نفسها التي يحسبها $P$ دون استعمال أي إجراء.
والفكرة بسيطة: إذا احتوى البرنامج $P$ على تعريف إجراء <code>Proc</code> ذي وسيطين هما <code>x</code> و<code>y</code>، فعند كل ما نرى سطرًا من الشكل <code>foo = Proc(bar,blah)</code> يمكننا استبدال هذا السطر بـ:</p>
<ol>
<li>
<p>جسم الإجراء <code>Proc</code> (مع استبدال كل ورود لـ <code>x</code> و<code>y</code> بـ <code>bar</code> و<code>blah</code> على الترتيب).</p>
</li>
<li>
<p>سطر <code>foo = exp</code>، حيث <code>exp</code> هو التعبير الوارد بعد عبارة <code>return</code> في تعريف الإجراء <code>Proc</code>.</p>
</li>
</ol>
<p>ولجعل هذا أمتن، نضيف بادئةً إلى المتغيّرات الداخلية التي يستعملها <code>Proc</code> حتى لا تتنازع مع متغيّرات $P$؛ نبساطةٍ نُهمل هذه المسألة في الشيفرة أدناه مع أنها يمكن إضافتها بسهولة.</p>
<p>وتحقّق شيفرة الدالة <code>desugar</code> في Python أدناه هذا النوع من التحويلات.</p>
<pre><code class="language-{">def desugar(code, func_name, func_args,func_body):
    &quot;&quot;&quot;
    Replaces all occurences of 
       foo = func_name(func_args) 
    with
       func_body[x-&gt;a,y-&gt;b]
       foo = [result returned in func_body]    
    &quot;&quot;&quot;
    # Uses Python regular expressions to simplify the search and replace,
    # see https://docs.python.org/3/library/re.html and Chapter 9 of the book

    # regular expression for capturing a list of variable names separated by commas
    arglist = &quot;,&quot;.join([r&quot;([a-zA-Z0-9\\_\\[\\]]+)&quot; for i in range(len(func_args))])
    # regular expression for capturing a statement of the form
    # &quot;variable = func_name(arguments)&quot;
    regexp = fr'([a-zA-Z0-9\\_\\[\\]]+)\\s*=\\s*{func_name}\\({arglist}\\)\\s*$'
    while True:
        m = re.search(regexp, code, re.MULTILINE)
        if not m: break
        newcode = func_body 
        # replace function arguments by the variables from the function invocation
        for i in range(len(func_args)): 
            newcode = newcode.replace(func_args[i], m.group(i+2))
        # Splice the new code inside
        newcode = newcode.replace('return', m.group(1) + &quot; = &quot;)
        code = code[:m.start()] + newcode + code[m.end()+1:]
    return code
</code></pre>
<p>يبيّن <a href="">progcircmajfig</a>{.ref} نتيجة تطبيق <code>desugar</code> على برنامج <a href="">majcircnand</a>{.ref} الذي يستعمل السكر النحوي لحساب دالة الأغلبية.
وعلى وجه التحديد، نطبّق <code>desugar</code> أولًا لإزالة استعمال دالة OR، ثم نطبّقه لإزالة استعمال دالة AND، وأخيرًا نطبّقه ثالث مرة لإزالة استعمال دالة NOT.</p>
<p>::: {.remark title=&quot;تحليل تعريفات الدوال (اختياري)&quot; #parsingdeg}
تفترض الدالة <code>desugar</code> في <a href="">desugarcode</a>{.ref} أنها تتلقّى الإجراء وقد قُسِّم مسبقًا إلى اسمه ووسيطيه وجسمه.
وليس من الضروري لأغراضنا أن نصف بدقّة كيفية تفحّص تعريف وتقسيمه إلى هذه المكوّنات، لكن إن كنت فضوليًا فيمكن إنجاز ذلك في Python عبر الشيفرة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">parse_func</span>(<span class="hljs-params">code</span>):
    <span class="hljs-string">&quot;&quot;&quot;Parse a function definition into name, arguments and body&quot;&quot;&quot;</span>
    lines = [l.strip() <span class="hljs-keyword">for</span> l <span class="hljs-keyword">in</span> code.split(<span class="hljs-string">&#x27;\\n&#x27;</span>)]
    regexp = <span class="hljs-string">r&#x27;def\\s+([a-zA-Z\\_0-9]+)\\(([\\sa-zA-Z0-9\\_,]+)\\)\\s*:\\s*&#x27;</span>
    m = re.<span class="hljs-keyword">match</span>(regexp,lines[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">return</span> m.group(<span class="hljs-number">1</span>), m.group(<span class="hljs-number">2</span>).split(<span class="hljs-string">&#x27;,&#x27;</span>), <span class="hljs-string">&#x27;\\n&#x27;</span>.join(lines[<span class="hljs-number">1</span>:])
</code></pre>
<p>:::</p>
<h3 id="الجمل-الشرطية-ifstatementsec">الجمل الشرطية {#ifstatementsec }</h3>
<p>من السمات المفقودة بشدّة في NAND-CIRC الجملة الشرطية مثل بُنى <code>if</code>/<code>then</code> الموجودة في كثير من لغات البرمجة.
غير أننا نستطيع، باستعمال الإجراءات، الحصول على بديل (ersatz) لبنية if/then.
أوّلًا يمكننا حساب الدالة $IF:{0,1}^3 \\rightarrow {0,1}$ بحيث تساوي $IF(a,b,c)$ القيمة $b$ إذا كان $a=1$ والقيمة $c$ إذا كان $a=0$.</p>
<blockquote>
<h3 id="pause">{ .pause }</h3>
</blockquote>
<p>قبل أن تتابع القراءة، حاول أن ترى كيف يمكنك حساب الدالة $IF$ باستعمال NANDs.
وبعد أن تتمكّن من ذلك، حاول أن ترى كيف يمكنك استعماله لتقليد بُنى من نوع <code>if</code>/<code>then</code>.</p>
<p>يمكن تنفيذ الدالة $IF$ انطلاقًا من NANDs على النحو التالي (انظر <a href="">mux-ex</a>{.ref}):</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">IF</span>(<span class="hljs-params">cond,a,b</span>):
    notcond = NAND(cond,cond)
    temp = NAND(b,notcond)
    temp1 = NAND(a,cond)
    <span class="hljs-keyword">return</span> NAND(temp,temp1)
</code></pre>
<p>وتُعرف الدالة $IF$ أيضًا باسم دالة <em>التبادل</em> (<em>multiplexing</em>)، إذ يمكن التفكير في <code>cond</code> بوصفه مفتاحًا يحدّد ما إذا كان الخرج موصولًا بـ $a$ أم بـ $b$.
وبعد أن يتوفّر لدينا إجراء لحساب الدالة $IF$، يمكننا تنفيذ الجمل الشرطية في NAND.
والفكرة أنك نستبدل شيفرة من الشكل</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> (condition):  assign blah to variable foo
</code></pre>
<p>بالشيفرة من الشكل</p>
<pre><code class="language-python">foo   = IF(condition, blah, foo)
</code></pre>
<p>وهي شيفرة تُسند إلى <code>foo</code> قيمته القديمة عندما يساوي <code>condition</code> القيمة $0$، وتُسند إلى <code>foo</code> قيمة <code>blah</code> في غير ذلك.
والأعمّ من ذلك، يمكننا استبدال شيفرة من الشكل</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> (cond):
    a = ...
    b = ...
    c = ...
</code></pre>
<p>بالشيفرة من الشكل</p>
<pre><code class="language-python">temp_a = ...
temp_b = ...
temp_c = ...
a = IF(cond,temp_a,a)
b = IF(cond,temp_b,b)
c = IF(cond,temp_c,c)
</code></pre>
<p>وباستعمال تحويلات من هذا النوع، يمكننا إثبات المبرهنة التالية.
ونُهمل مرة أخرى البرهان الرسمي الكامل (الذي لا يقدّم فكرة غير بديهية)، لكن انظر <a href="">functionsynsugarthmpython</a>{.ref} لبعض القرائن على كيفية إتمامه.</p>
<blockquote>
<h3 id="theorem-titlequotالسكر-النحوي-للجمل-الشرطيةquot-conditionalsugarthm">{.theorem title=&quot;السكر النحوي للجمل الشرطية&quot; #conditionalsugarthm }</h3>
</blockquote>
<p>لتكن NAND-CIRC-IF هي لغة البرمجة NAND-CIRC معزَّزة بعبارات <code>if</code>/<code>then</code>/<code>else</code> التي تسمح بتنفيذ الشيفرة شرطًا على أساس ما إذا كان متغيّر ما يساوي $0$ أم $1$.<br>
عندئذٍ، لكل برنامج NAND-CIRC-IF من الشكل $P$، يوجد برنامج NAND-CIRC معياري (أي «خالٍ من السكر») $P'$ يحسب الدالة نفسها التي يحسبها $P$.</p>
<h2 id="مثال-موسع-الجمع-والضرب-اختياري-addexample">مثال موسَّع: الجمع والضرب (اختياري) { #addexample }</h2>
<p>باستعمال «السكر النحوي» يمكننا كتابة دالة جمع الأعداد الصحيحة على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-comment"># Add two n-bit integers</span>
<span class="hljs-comment"># Use LSB first notation for simplicity</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">ADD</span>(<span class="hljs-params">A,B</span>):
    Result = [<span class="hljs-number">0</span>]*(n+<span class="hljs-number">1</span>)
    Carry  = [<span class="hljs-number">0</span>]*(n+<span class="hljs-number">1</span>)
    Carry[<span class="hljs-number">0</span>] = zero(A[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(n):
        Result[i] = XOR(Carry[i],XOR(A[i],B[i]))
        Carry[i+<span class="hljs-number">1</span>] = MAJ(Carry[i],A[i],B[i])
    Result[n] = Carry[n]
    <span class="hljs-keyword">return</span> Result

ADD([<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>],[<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>]);;
<span class="hljs-comment"># [0, 0, 0, 1, 0, 0]</span>
</code></pre>
<p>حيث <code>zero</code> هي دالة الصفر الثابت، و<code>MAJ</code> و<code>XOR</code> تمثّلان على الترتيب دالتي الأغلبية وXOR.
ولأغراض الراحة نستعمل صياغة Python، لكنّ $n$ في هذا المثال <em>عددٌ صحيح ثابت</em>، ومن ثمّ فلكل قيمة من هذه القيم يكون <code>ADD</code> دالةً <em>متناهية</em> تأخذ $2n$ بتًّا مُدخلًا وتُخرج $n+1$ بتًّا.
وبالذات، لكل $n$ يمكننا إزالة بِنية الحلقة <code>for i in range(n)</code> ببساطة بتكرار الشيفرة $n$ مرة، مع استبدال قيمة <code>i</code> بـ $0,1,2,\\ldots,n-1$.
وبفكّ كل السمات، لكل قيمة من $n$ يمكننا ترجمة البرنامج أعلاه إلى برنامج NAND-CIRC معياري («خالٍ من السكر»). ويصوّر <a href="">add2bitnumbersfig</a>{.ref} ما نحصل عليه عند $n=2$.</p>
<p><img src="/arabic-cs-library/images/introtcs/fig-add2bitnumbers.webp" alt="برنامج NAND-CIRC والدائرة المقابلة له لإضافة عددين ثنائيّين، ويُحصل عليهما بفكّ كل السكر النحوي. يتكوّن البرنامج/الدائرة من 43 سطرًا/بوابة، وهذا ليس ضروريًا البتّة. ومن الممكن جمع أعداد بطول $n$ بت باستخدام $9n$ بوابة NAND، انظر halffulladderex{.ref}.">{#add2bitnumbersfig .class  }</p>
<p>وبمراجعة البرنامج أعلاه بعناية وحساب عدد البوابات، نرى أنّه يؤدّي إلى برهان المبرهنة التالية (انظر أيضًا <a href="">addnumoflinesfig</a>{.ref}):</p>
<blockquote>
<h3 id="theorem-titlequotالجمع-ببرامج-nand-circquot-addition-thm">{.theorem title=&quot;الجمع ببرامج NAND-CIRC&quot; #addition-thm}</h3>
</blockquote>
<p>لكل $n\\in \\N$، لتكن $ADD_n:{0,1}^{2n}\\rightarrow {0,1}^{n+1}$ الدالة التي، عند إعطائها $x,x'\\in {0,1}^n$، تحسب تمثيل مجموع العددين اللذين يمثّلهما $x$ و$x'$. عندئذٍ يوجد ثابت $c \\leq 30$ بحيث لكل $n$ يوجد برنامج NAND-CIRC من $cn$ سطرًا على الأكثر يحسب $ADD_n$.^[يمكن تحسين قيمة $c$ إلى $9$، انظر <a href="">halffulladderex</a>{.ref}.]</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-1.webp" alt="/images/introtcs/lec_03a_computing_every_function-1.webp">{#addnumoflinesfig .margin  }</p>
<p>وبعد أن يتوفّر لدينا الجمع، يمكننا استعمال خوارزمية المدرسة الابتدائية للحصول على الضرب أيضًا، وبذلك نحصل على المبرهنة التالية:</p>
<blockquote>
<h3 id="theorem-titlequotالضرب-ببرامج-nand-circquot-theoremid">{.theorem title=&quot;الضرب ببرامج NAND-CIRC&quot; #theoremid}</h3>
</blockquote>
<p>لكل $n$، لتكن $MULT_n:{0,1}^{2n}\\rightarrow {0,1}^{2n}$ الدالة التي، عند إعطائها $x,x'\\in {0,1}^n$، تحسب تمثيل حاصل ضرب العددين اللذين يمثّلهما $x$ و$x'$. عندئذٍ يوجد ثابت $c$ بحيث لكل $n$ يوجد برنامج NAND-CIRC من $cn^2$ سطرًا على الأكثر يحسب الدالة $MULT_n$.</p>
<p>ونُهمل البرهان، لكنّنا في <a href="">multiplication-ex</a>{.ref} نطلب منك تقديم «برهان بنائي» (constructive proof) على صورة برنامج (بلغتك البرمجية المفضّلة) يُدخل إليه عدد $n$ ويُخرج شيفرة برنامج NAND-CIRC من $1000n^2$ سطرًا على الأكثر يحسب دالة $MULT_n$.
وفي الواقع، يمكننا استعمال خوارزمية كارا تسوبا (Karatsuba) لإظهار أنّ هناك برنامج NAND-CIRC من $O(n^{\\log_2 3})$ سطرًا لحساب $MULT_n$
(ويمكننا أيضًا الحصول على تحسينات أُسّية (asymptotic) أبعد باستخدام خوارزميات أفضل).</p>
<h2 id="دالة-lookup-seclookupfunc">دالة $LOOKUP$ { #seclookupfunc }</h2>
<p>ستلعب دالة $LOOKUP$ دورًا مهمًا في هذا الفصل وفيما بعده.
وهي معرَّفة على النحو التالي:</p>
<blockquote>
<h3 id="definition-titlequotدالة-البحثquot-lookup-def">{.definition title=&quot;دالة البحث&quot; #lookup-def}</h3>
</blockquote>
<p>لكل $k$، تُعرَّف دالةُ <em>البحث</em> (<em>lookup</em>) من الرتبة $k$، $LOOKUP_k: {0,1}^{2^k+k}\\rightarrow {0,1}$، على النحو التالي:
لكل $x\\in{0,1}^{2^k}$ و$i\\in {0,1}^k$،
$$
LOOKUP_k(x,i)=x_i
$$
حيث $x_i$ تدلّ على المُدخل رقم $i^{th}$ من $x$، مع استعمال التمثيل الثنائي لتحديد $i$ بعدد ضمن \${0,\\ldots,2^k - 1 }$.</p>
<p><img src="/arabic-cs-library/images/introtcs/fig-lookupfunc.webp" alt="تدخل دالة $LOOKUP_k$ مُدخلًا في $0,1^{2^k+k}$، نرمّز له بـ $x,i$ (مع $xn 0,1^{2^k}$ و$i n 0,1^k$). والمخرج هو $x_i$: الإحداثي رقم $i$ من $x$، حيث نحدّد $i$ بعدد في $[k]$ باستعمال التمثيل الثنائي. في المثال أعلاه $xn 0,1^{16}$ و$in 0,1^4$. وبما أنّ $i=0110$ هو التمثيل الثنائي للعدد $6$، فإن مُخرج $LOOKUP_4(x,i)$ في هذه الحالة هو $x_6 = 1$.">{#lookupfig}</p>
<p>انظر <a href="">lookupfig</a>{.ref} لتجد تصويرًا توضيحيًا لدالة LOOKUP.
ويبيّن الأمر أنّ لكل $k$ يمكننا حساب $LOOKUP_k$ باستعمال برنامج NAND-CIRC:</p>
<blockquote>
<h1>{.theorem title=&quot;دالة البحث&quot; #lookup-thm}</h1>
</blockquote>
<p>لكل $k&gt;0$، يوجد برنامج NAND-CIRC يحسب الدالة $LOOKUP_k: {0,1}^{2^k+k}\\rightarrow {0,1}$. وزيادةً على ذلك، فإن عدد الأسطر في هذا البرنامج هو $4\\cdot 2^k$ على الأكثر.</p>
<p>ومن النتائج الفورية لـ <a href="">lookup-thm</a>{.ref} أنّ لكل $k&gt;0$ يمكن حساب $LOOKUP_k$ بدائرة منطقية (ذات بوابات AND وOR وNOT) من $8 \\cdot 2^k$ بوابة على الأكثر.</p>
<h3 id="بناء-برنامج-nand-circ-لدالة-lookup">بناء برنامج NAND-CIRC لدالة $LOOKUP$</h3>
<p>نُثبت <a href="">lookup-thm</a>{.ref} بالاستدلال (induction).
في الحالة $k=1$، تُسقط $LOOKUP_1$ العنصر $(x_0,x_1,i) \\in {0,1}^3$ على $x_i$.
بعبارة أخرى، إذا كان $i=0$ فإنها تُخرج $x_0$، وإلّا فإنها تُخرج $x_1$، وهذا (حتى إعادة ترتيب المتغيّرات) هو نفسه
الدالة $IF$ المعروضة في <a href="">ifstatementsec</a>{.ref}، والتي يمكن حسابها ببرنامج NAND-CIRC من أربعة أسطر.</p>
<p>وتمرينًا تمهيديًا على الحالة العامة $k$، لننظر في الحالة $k=2$.
إذا أُعطينا مُدخلًا $x=(x_0,x_1,x_2,x_3)$ لدالة $LOOKUP_2$ وفهرسًا $i=(i_0,i_1)$، وكان البتّ الأعلى قيمةً $i_0$ من الفهرس يساوي $0$، فإن $LOOKUP_2(x,i)$ تساوي $x_0$ إذا كان $i_1=0$ وتساوي $x_1$ إذا كان $i_1=1$.
وبالمثل، إذا كان البتّ الأعلى قيمةً $i_0$ يساوي $1$، فإن $LOOKUP_2(x,i)$ تساوي $x_2$ إذا كان $i_1=0$ وتساوي $x_3$ إذا كان $i_1=1$.
وتُقال هذه بطريقة أخرى، إنّنا نستطيع كتابة $LOOKUP_2$ على النحو التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">LOOKUP2</span>(<span class="hljs-params">X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>],X[<span class="hljs-number">2</span>],X[<span class="hljs-number">3</span>],i[<span class="hljs-number">0</span>],i[<span class="hljs-number">1</span>]</span>):
    <span class="hljs-keyword">if</span> i[<span class="hljs-number">0</span>]==<span class="hljs-number">1</span>:
        <span class="hljs-keyword">return</span> LOOKUP1(X[<span class="hljs-number">2</span>],X[<span class="hljs-number">3</span>],i[<span class="hljs-number">1</span>])
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> LOOKUP1(X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>],i[<span class="hljs-number">1</span>])
</code></pre>
<p>أو بعبارة أخرى،</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">LOOKUP2</span>(<span class="hljs-params">X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>],X[<span class="hljs-number">2</span>],X[<span class="hljs-number">3</span>],i[<span class="hljs-number">0</span>],i[<span class="hljs-number">1</span>]</span>):
    a = LOOKUP1(X[<span class="hljs-number">2</span>],X[<span class="hljs-number">3</span>],i[<span class="hljs-number">1</span>])
    b = LOOKUP1(X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>],i[<span class="hljs-number">1</span>])
    <span class="hljs-keyword">return</span> IF( i[<span class="hljs-number">0</span>],a,b)
</code></pre>
<p>والأعمّ من ذلك، كما تبيّن الملاحظة التالية، يمكننا حساب $LOOKUP_k$ باستعمال استدعاءين لـ $LOOKUP_{k-1}$ واستدعاء واحد لـ $IF$:</p>
<blockquote>
<h3 id="lemma-titlequotتكرار-دالة-البحثquot-lookup-rec-lem">{.lemma title=&quot;تكرار دالة البحث&quot; #lookup-rec-lem}</h3>
</blockquote>
<p>لكل $k \\geq 2$، فإن $LOOKUP_k(x_0,\\ldots,x_{2^k-1},i_0,\\ldots,i_{k-1})$
تساوي
$$
IF \\left(i_0, LOOKUP_{k-1}(x_{2^{k-1}},\\ldots,x_{2^k-1},i_1,\\ldots,i_{k-1}), LOOKUP_{k-1}(x_0,\\ldots,x_{2^{k-1}-1},i_1,\\ldots,i_{k-1}) \\right)
$$</p>
<blockquote>
<h3 id="proof-data-refquotlookup-rec-lemquot">{.proof data-ref=&quot;lookup-rec-lem&quot;}</h3>
</blockquote>
<p>إذا كان البتّ الأعلى قيمةً $i_{0}$ من $i$ يساوي صفرًا، فإن الفهرس $i$ يقع في \${0,\\ldots,2^{k-1}-1}$، ومن ثمّ يمكننا إجراء البحث في «النصف الأول» من $x$، وستكون نتيجة $LOOKUP_k(x,i)$ نفسها هي $a=LOOKUP_{k-1}(x_0,\\ldots,x_{2^{k-1}-1},i_1,\\ldots,i_{k-1})$.
ومن جهة أخرى، إذا كان هذا البتّ الأعلى قيمةً $i_{0}$ مساويًا لـ $1$، فإن الفهرس يقع في \${2^{k-1},\\ldots,2^k-1}$، وعندئذٍ تكون نتيجة $LOOKUP_k(x,i)$ نفسها هي $b=LOOKUP_{k-1}(x_{2^{k-1}},\\ldots,x_{2^k-1},i_1,\\ldots,i_{k-1})$.
وعليه يمكننا حساب $LOOKUP_k(x,i)$ بحساب $a$ و$b$ أولًا ثم بإخراج $IF(i_0,b,a)$.</p>
<p><strong>برهان <a href="">lookup-thm</a>{.ref} انطلاقًا من <a href="">lookup-rec-lem</a>{.ref}.</strong> وبعد أن صار لدينا <a href="">lookup-rec-lem</a>{.ref}، يمكننا إتمام برهان <a href="">lookup-thm</a>{.ref}.
سنُثبت بالاستدلال على $k$ أنّ هناك برنامج NAND-CIRC من $4\\cdot (2^k-1)$ سطرًا على الأكثر لـ $LOOKUP_k$.
وبالنسبة إلى $k=1$، فإن ذلك يتّضح من برنامج $IF$ ذي الأربعة أسطر الذي رأيناه من قبل.
وبالنسبة إلى $k&gt;1$، نستعمل الشيفرة شبه البرمجية (pseudocode) التالية:</p>
<pre><code class="language-python">a = LOOKUP_(k-<span class="hljs-number">1</span>)(X[<span class="hljs-number">0</span>],...,X[<span class="hljs-number">2</span>^(k-<span class="hljs-number">1</span>)-<span class="hljs-number">1</span>],i[<span class="hljs-number">1</span>],...,i[k-<span class="hljs-number">1</span>])
b = LOOKUP_(k-<span class="hljs-number">1</span>)(X[<span class="hljs-number">2</span>^(k-<span class="hljs-number">1</span>)],...,X[<span class="hljs-number">2</span>^(k-<span class="hljs-number">1</span>)],i[<span class="hljs-number">1</span>],...,i[k-<span class="hljs-number">1</span>])
<span class="hljs-keyword">return</span> IF(i[<span class="hljs-number">0</span>],b,a)
</code></pre>
<p>إذا تركنا $L(k)$ تدلّ على عدد الأسطر المطلوبة لـ $LOOKUP_k$، فإن الشيفرة شبه البرمجية أعلاه تُظهر أنّ
$$
L(k) \\leq 2L(k-1)+4 ;. \\label{induction-lookup}
$$
وبموجب فرضية الاستدلال لدينا $L(k-1) \\leq 4(2^{k-1}-1)$، نحصل على أنّ
$L(k) \\leq 2\\cdot 4 (2^{k-1}-1) + 4 = 4(2^k - 1)$ وهو ما كنا نريد إثباته.
انظر <a href="">lookuplinesfig</a>{.ref} لتجد رسمًا بيانيًا لعدد الأسطر الفعلي في تنقيذنا لدالة $LOOKUP_k$.</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-2.webp" alt="/images/introtcs/lec_03a_computing_every_function-2.webp">{#lookuplinesfig .margin  }</p>
<h2 id="حساب-كل-دالة-seccomputeallfunctions">حساب <em>كل</em> دالة { #seccomputeallfunctions }</h2>
<p>حتى هذه اللحظة نعرف الحقائق التالية عن برامج NAND-CIRC (وعن الدوائر المنطقية، وبالتالي، وعن نماذجنا الأخرى المتكافئة معها):</p>
<ol>
<li>
<p>إنّها تحسب على الأقل بعض الدوال غير البديهية.</p>
</li>
<li>
<p>إنّ ابتكار برامج NAND-CIRC لدوال مختلفة مهمّة بالغة.</p>
</li>
</ol>
<p>لذلك لا ألوم القارئ إن لم يكن متلهّفًا على نحو خاص لمطَوّلة من الأمثلة للدوال التي يمكن حسابها ببرامج NAND-CIRC.
غير أنّه تبيّن أنّنا لن نحتاج إلى هذا، إذ يمكننا في ضربة واحدة أن نبيّن أنّ برامج NAND-CIRC تستطيع حساب <em>كل</em> دالة متناهية:</p>
<blockquote>
<h3 id="theorem-titlequotشمولية-nandquot-nand-univ-thm">{.theorem title=&quot;شمولية NAND&quot; #NAND-univ-thm}</h3>
</blockquote>
<p>يوجد ثابت ما $c&gt;0$ بحيث لكل $n,m&gt;0$ ولكل دالة $f: {0,1}^n\\rightarrow {0,1}^m$، يوجد برنامج NAND-CIRC من $c \\cdot m 2^n$ سطرًا على الأكثر يحسب الدالة $f$.</p>
<p>وبموجب <a href="">equivalencemodelsthm</a>{.ref}، فإن نماذج دوائر NAND وبرامج NAND-CIRC وبرامج AON-CIRC والدوائر المنطقية متكافئة فيما بينها جميعًا، ومن ثمّ فإن <a href="">NAND-univ-thm</a>{.ref} تنطبق على كل هذه النماذج.
وبالذات، المبرهنة التالية تكافئ <a href="">NAND-univ-thm</a>{.ref}:</p>
<blockquote>
<h3 id="theorem-titlequotشمولية-الدوائر-المنطقيةquot-circuit-univ-thm">{.theorem title=&quot;شمولية الدوائر المنطقية&quot; #circuit-univ-thm}</h3>
</blockquote>
<p>يوجد ثابت ما $c&gt;0$ بحيث لكل $n,m&gt;0$ ولكل دالة $f: {0,1}^n\\rightarrow {0,1}^m$، توجد دائرة منطقية من $c \\cdot m 2^n$ بوابة على الأكثر تحسب الدالة $f$.</p>
<p>::: { .bigidea #finitecomputation }
<em>كل</em> دالة متناهية يمكن حسابها بدائرة منطقية كبيرة بما يكفي.
:::</p>
<p><em>حدود محسّنة.</em> وإن كانت أهميتها ليست بالغة بالنسبة لنا، فمن الممكن تحسين برهان <a href="">NAND-univ-thm</a>{.ref} وتشذيب عامل إضافي من $n$، فضلًا عن تحسين الثابت $c$، وبذلك نُثبت أنّ لكل $\\epsilon&gt;0$ و$m\\in \\N$ و$n$ كبير بما يكفي، إذا كانت $f:{0,1}^n \\rightarrow {0,1}^m$ فإن $f$ يمكن حسابها بدائرة NAND من
$(1+\\epsilon)\\tfrac{m\\cdot 2^n}{n}$ بوابة على الأكثر.
برهان هذه النتيجة خارج نطاق هذا الكتاب، لكنّنا نناقش في <a href="">tight-upper-bound</a>{.ref} كيفية الحصول على حدٍّ من الشكل $O(\\tfrac{m \\cdot 2^n}{n})$؛ وانظر أيضًا الملاحظات الببليوغرافية.</p>
<h3 id="برهان-شمولية-nand">برهان شمولية NAND</h3>
<p>لإثبات <a href="">NAND-univ-thm</a>{.ref}، نحتاج إلى إعطاء دائرة NAND، أو بما يكافئها برنامج NAND-CIRC، لكل دالة ممكنة.
سنقصر اهتمامنا على حالة الدوال المنطقية (أي $m=1$).
يطلب منك <a href="">mult-bit-ex</a>{.ref} توسيع البرهان على جميع قيم $m$.
يمكن تحديد دالة $F: {0,1}^n\\rightarrow {0,1}$ بجدول من قيمها لكل واحد من الـ $2^n$ مُدخلًا.
على سبيل المثال، يصف الجدول أدناه دالة بعينها $G: {0,1}^4 \\rightarrow {0,1}$:^[إن كنت فضوليًا، فإن هذه هي الدالة التي على المُدخل $i\\in {0,1}^4$ (الذي نفسّره بعدد في $[16]$) تُخرج الرقم رقم $i$ من $\\pi$ في الأساس الثنائي.]</p>
<table>
<thead>
<tr>
<th style="text-align:left">المُدخل ($x$)</th>
<th style="text-align:left">المُخرج ($G(x)$)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">$0000$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$0001$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$0010$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$0011$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$0100$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$0101$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$0110$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$0111$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$1000$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$1001$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$1010$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$1011$</td>
<td style="text-align:left">0</td>
</tr>
<tr>
<td style="text-align:left">$1100$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$1101$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$1110$</td>
<td style="text-align:left">1</td>
</tr>
<tr>
<td style="text-align:left">$1111$</td>
<td style="text-align:left">1</td>
</tr>
</tbody>
</table>
<p>جدول: مثال على دالة $G:{0,1}^4 \\rightarrow {0,1}$.</p>
<p>لكل $x\\in {0,1}^4$، لدينا $G(x)=LOOKUP_4(1100100100001111,x)$، ومن ثمّ فالشيفرة التالية هي «شيفرة شبه برمجية» (pseudocode) بلغة NAND-CIRC لحساب $G$ باستعمال السكر النحوي للإجراء <code>LOOKUP_4</code>.</p>
<pre><code class="language-python">G0000 = <span class="hljs-number">1</span>
G1000 = <span class="hljs-number">1</span>
G0100 = <span class="hljs-number">0</span>
...
G0111 = <span class="hljs-number">1</span>
G1111 = <span class="hljs-number">1</span>
Y[<span class="hljs-number">0</span>] = LOOKUP_4(G0000,G1000,...,G1111,
                X[<span class="hljs-number">0</span>],X[<span class="hljs-number">1</span>],X[<span class="hljs-number">2</span>],X[<span class="hljs-number">3</span>])
</code></pre>
<p>يمكننا ترجمة هذه الشيفرة شبه البرمجية إلى برنامج NAND-CIRC حقيقي بإضافة ثلاثة أسطر لتعريف المتغيّرين <code>zero</code> و<code>one</code> اللذين يُهيَّآن على $0$ و$1$ على الترتيب،
ثم باستبدال عبارة مثل <code>Gxxx = 0</code> بـ <code>Gxxx = NAND(one,one)</code>، وعبارة مثل <code>Gxxx = 1</code> بـ <code>Gxxx = NAND(zero,zero)</code>.
وسيُستبدَل الاستدعاء إلى <code>LOOKUP_4</code> ببرنامج NAND-CIRC الذي يحسب $LOOKUP_4$، مع تلقيم المُداخل المناسبة.</p>
<p>لم يكن في الاستدلال أعلاه شيء يخصّ الدالة $G$ بعينها.
ولكل دالة $F: {0,1}^n \\rightarrow {0,1}$، يمكننا كتابة برنامج NAND-CIRC يفعل ما يلي:</p>
<ol>
<li>
<p>تهيئة $2^n$ متغيّرًا من الشكل <code>F00...0</code> إلى <code>F11...1</code> بحيث لكل $z\\in{0,1}^n$ يُسنَد إلى المتغيّر المقابل لـ $z$ القيمة $F(z)$.</p>
</li>
<li>
<p>حساب $LOOKUP_n$ على الـ $2^n$ متغيّرًا المهيّأة في الخطوة السابقة، مع كون متغيّر الفهرس هو متغيّرات المُدخل <code>X[</code>$0$ <code>]</code>,...,<code>X[</code>$n-1$ <code>]</code>. أي أنّنا، تمامًا كما في الشيفرة شبه البرمجية للدالة <code>G</code> أعلاه، نستعمل <code>Y[0] = LOOKUP(F00..00,...,F11..1,X[0],..,X[</code>$n-1$<code>])</code></p>
</li>
</ol>
<p>مجموع عدد الأسطر في البرنامج الناتج هو $3+2^n$ سطرًا لتهيئة المتغيّرات، إضافةً إلى $4\\cdot 2^n$ سطرًا ندفع ثمنها مقابل حساب $LOOKUP_n$.
وهذا يُتمّ برهان <a href="">NAND-univ-thm</a>{.ref}.</p>
<blockquote>
<h3 id="remark-titlequotالنتيجة-في-منظورquot-discusscomputation">{.remark title=&quot;النتيجة في منظور&quot; #discusscomputation}</h3>
</blockquote>
<p>ولأنّ <a href="">NAND-univ-thm</a>{.ref} تبدو مذهلة في البداية، فمن المحتمل — إذا أعدنا النظر إليها — ألّا يكون مُدهشًا البتّة أن كل دالة متناهية يمكن حسابها ببرنامج NAND-CIRC. فبعد كلّ شيء، يمكن تمثيل دالة متناهية $F: {0,1}^n \\rightarrow {0,1}^m$ بمجرّد قائمة مُخرجاتها لكل واحد من الـ $2^n$ قيمة مُدخل.
ولذلك يكون من المعقول أن نتمكّن من كتابة برنامج NAND-CIRC بحجم مماثل لحسابها.
والأكثر إثارةً للاهتمام هو أنّ <em>بعض</em> الدوال، مثل الجمع والضرب، لها تمثيل أكثر كفاءة بكثير: تمثيل يتطلّب $O(n^2)$ سطرًا أو حتى أقل.</p>
<h3 id="تحسين-بمعامل-n-اختياري-tight-upper-bound">تحسين بمعامل $n$ (اختياري) {#tight-upper-bound}</h3>
<p>بمزيد من العناية قليلًا، يمكننا تحسين حدّ <a href="">NAND-univ-thm</a>{.ref} وإظهار أنّ كل دالة $F:{0,1}^n \\rightarrow {0,1}^m$ يمكن حسابها ببرنامج NAND-CIRC من $O(m 2^n/n)$ سطرًا على الأكثر.
بعبارة أخرى، يمكننا إثبات الصيغة المحسّنة التالية:</p>
<blockquote>
<h3 id="theorem-titlequotشمولية-دوائر-nand-بحد-محسنquot-nand-univ-thm-improved">{.theorem title=&quot;شمولية دوائر NAND، بحدّ محسّن&quot; #NAND-univ-thm-improved}</h3>
</blockquote>
<p>يوجد ثابت $c&gt;0$ بحيث لكل $n,m&gt;0$ ولكل دالة $f: {0,1}^n\\rightarrow {0,1}^m$، يوجد برنامج NAND-CIRC من $c \\cdot m 2^n / n$ سطرًا على الأكثر يحسب الدالة $f$.^[الثابت $c$ في هذه المبرهنة هو $10$ على الأكثر، ويمكن في الواقع أن يقترب من $1$ إلى أي حدّ شئنا، انظر <a href="">computeeveryfunctionbibnotes</a>{.ref}.]</p>
<p>::: {.proof data-ref=&quot;NAND-univ-thm-improved&quot;}
كما من قبل، يكفي إثبات الحالة التي يكون فيها $m=1$.
ومن ثمّ نترك $f:{0,1}^n \\rightarrow {0,1}$، وهدفنا هو إثبات أنّ هناك برنامج NAND-CIRC من $O(2^n/n)$ سطرًا (أو بما يكافئه دائرة منطقية من $O(2^n/n)$ بوابة) يحسب $f$.</p>
<p>نترك $k= \\log(n-2\\log n)$ (وسيصير سبب هذا الاختيار واضحًا لاحقًا).
نعرّف الدالة $g:{0,1}^k \\rightarrow {0,1}^{2^{n-k}}$ على النحو التالي:
$$
g(a) = f(a0^{n-k})f(a0^{n-k-1}1) \\cdots f(a1^{n-k}) ;.
$$
بعبارة أخرى، إذا استعملنا التمثيل الثنائي المعتاد لتحديد الأعداد \${0,\\ldots, 2^{n-k}-1 }$ مع النصوص \${0,1}^{n-k}$، فإن لكل $a\\in {0,1}^k$ و$b\\in {0,1}^{n-k}$
$$
g(a)_b = f(ab) ;. \\label{eqcomputefusinggeffcircuit}
$$</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-3.webp" alt="/images/introtcs/lec_03a_computing_every_function-3.webp">{#efficient_circuit_allfuncfig}</p>
<p>تعني <a href="">eqcomputefusinggeffcircuit</a>{.eqref} أنّ لكل $x\\in {0,1}^n$، إذا كتبنا $x=ab$ مع $a\\in {0,1}^k$ و$b\\in {0,1}^{n-k}$، فإننا نستطيع حساب $f(x)$ بحساب النص $T=g(a)$ الطويل من $2^{n-k}$ أولًا، ثم بحساب $LOOKUP_{n-k}(T;,; b)$ لاسترجاع العنصر من $T$ عند الموضع المقابل لـ $b$ (انظر <a href="">efficient_circuit_allfuncfig</a>{.ref}).
تكلّفة حساب $LOOKUP_{n-k}$ هي $O(2^{n-k})$ سطرًا/بوابة، وتكلّفة حساب $f$ مقيسةً بأسطر NAND-CIRC (أو البوابات المنطقية) هي على الأكثر
$$
cost(g) + O(2^{n-k}) ;, \\label{eqcostcomputefusingg}
$$
حيث $cost(g)$ هو عدد العمليات (أي أسطر برامج NAND-CIRC أو بوابات الدائرة) اللازمة لحساب $g$.</p>
<p>ولإتمام البرهان نحتاج إلى إعطاء حدٍّ لـ $cost(g)$.
وبما أنّ $g$ دالة تُسقط \${0,1}^k$ على \${0,1}^{2^{n-k}}$، يمكننا أيضًا التفكير فيها بوصفها مجموعة
من $2^{n-k}$ دالة $g_0,\\ldots, g_{2^{n-k}-1}: {0,1}^k \\rightarrow {0,1}$، حيث
$g_i(x) = g(a)<em>i$ لكل $a\\in {0,1}^k$ و$i\\in [2^{n-k}]$. (أي أنّ $g_i(a)$ هو البتّ رقم $i$ من $g(a)$.)
بشكل ساذج، يمكننا استعمال <a href="">NAND-univ-thm</a>{.ref} لحساب كل $g_i$ في $O(2^k)$ سطرًا، لكن عندئذٍ
تكون التكلّفة الكلية $O(2^{n-k} \\cdot 2^k) = O(2^n)$ وهو ما لا يوفّر علينا شيئًا.
غير أنّ الملاحظة الحاسمة هي أنّه لا يوجد سوى $2^{2^k}$ <em>دالة متمايزة</em> تُسقط
\${0,1}^k$ على \${0,1}$.
على سبيل المثال، إذا كانت $g</em>{17}$ هي الدالة نفسها $g_{67}$، فهذا يعني أنّنا إذا كنّا قد حسبنا $g_{17}(a)$ نستطيع عندئذٍ حساب $g_{67}(a)$ بعدد عمليات ثابت فقط: بمجرّد نسخ القيمة نفسها!
وبشكل عام، إذا كانت لديك مجموعة من $N$ دالة $g_0,\\ldots,g_{N-1}$ تُسقط \${0,1}^k$ على \${0,1}$، منها $S$ على الأكثر متمايزة، فإن لكل قيمة $a\\in {0,1}^k$ نستطيع حساب القيم $g_0(a),\\ldots,g_{N-1}(a)$ البالغة $N$ قيمة باستعمال $O(S\\cdot 2^k + N)$ عملية على الأكثر (انظر <a href="">computemanyfunctionsfig</a>{.ref}).</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-4.webp" alt="/images/introtcs/lec_03a_computing_every_function-4.webp">{#computemanyfunctionsfig .margin }</p>
<p>في حالتنا، ولأنّ عدد الدوال المتمايزة التي تُسقط \${0,1}^k$ على \${0,1}$ هو $2^{2^k}$ على الأكثر، يمكننا حساب الدالة $g$ (وبالتالي أيضًا $f$ بموجب <a href="">eqcomputefusinggeffcircuit</a>{.eqref}) باستعمال
$$O(2^{2^k} \\cdot 2^k + 2^{n-k}) \\label{eqboundoncostg}$$
عمليات.
وكل ما تبقّى الآن هو التعويض في <a href="">eqboundoncostg</a>{.eqref} عن اختيارنا $k = \\log (n-2\\log n)$.
وبالتعريف، $2^k = n-2\\log n$، ما يعني أنّ <a href="">eqboundoncostg</a>{.eqref} يمكن تحديد حدٍّ له كـ
$$
O\\left(2^{n-2\\log n} \\cdot (n-2\\log n) +  2^{n-\\log(n-2\\log n)}\\right) \\leq
$$</p>
<p>$$
O\\left(\\tfrac{2^n}{n^2} \\cdot n + \\tfrac{2^n}{n-2\\log n} \\right)
\\leq
O\\left(\\tfrac{2^n}{n}  + \\tfrac{2^n}{0.5n} \\right)  = O\\left( \\tfrac{2^n}{n} \\right)
$$
وهو ما كنا نريد إثباته. (استعملنا أعلاه الحقيقة أنّ $n - 2\\log n \\geq 0.5 \\log n$ لـ $n$ كبير بما يكفي.)
:::</p>
<p>وباستعمال الصلة بين برامج NAND-CIRC والدوائر المنطقية، فإنّ النتيجة الفورية لـ <a href="">NAND-univ-thm-improved</a>{.ref} هي التحسين التالي لـ <a href="">circuit-univ-thm</a>{.ref}:</p>
<blockquote>
<h3 id="theorem-titlequotشمولية-الدوائر-المنطقية-بحد-محسنquot-circuit-univ-thm-improved">{.theorem title=&quot;شمولية الدوائر المنطقية، بحدّ محسّن&quot; #circuit-univ-thm-improved}</h3>
</blockquote>
<p>يوجد ثابت ما $c&gt;0$ بحيث لكل $n,m&gt;0$ ولكل دالة $f: {0,1}^n\\rightarrow {0,1}^m$، توجد دائرة منطقية من $c \\cdot m 2^n / n$ بوابة على الأكثر تحسب الدالة $f$.</p>
<h2 id="حساب-كل-دالة-برهان-بديل-seccomputalternative">حساب كل دالة: برهان بديل {#seccomputalternative }</h2>
<p><a href="">circuit-univ-thm</a>{.ref} نتيجة أساسية في نظرية الحوسبة (وفي ممارستها أيضًا!).
في هذا القسم نعرض برهانًا بديلًا لهذه الحقيقة الأساسية القائلة إنّ الدوائر المنطقية تستطيع حساب كل دالة متناهية.
ويعطي هذا البرهان البديل حدًّا كمّيًا أضعف قليلًا لعدد البوابات، لكنّ له ميزة أنّه أبسط، إذ يعمل مباشرةً مع الدوائر ويتفادى استعمال آليات السكر النحوي بأسرها.
(غير أنّ تلك الآليات مفيدة في ذاتها، وستجد لها تطبيقات أخرى لاحقًا.)</p>
<blockquote>
<h3 id="theorem-titlequotشمولية-الدوائر-المنطقية-صياغة-بديلةquot-circuit-univ-alt-thm">{.theorem title=&quot;شمولية الدوائر المنطقية (صياغة بديلة)&quot; #circuit-univ-alt-thm}</h3>
</blockquote>
<p>يوجد ثابت ما $c&gt;0$ بحيث لكل $n,m&gt;0$ ولكل دالة $f: {0,1}^n\\rightarrow {0,1}^m$، توجد دائرة منطقية من $c \\cdot m\\cdot n 2^n$ بوابة على الأكثر تحسب الدالة $f$.</p>
<p><img src="/arabic-cs-library/images/introtcs/fig-computeallfunctionalt.webp" alt="معطاةً الدالة $f:0,1^n ightarrow 0,1$، نُعرِّف $ x_0, x_1, dots, x_{N-1}  ubseteq 0,1^n$ لتكون مجموعة المُداخل التي تتحقّق فيها $f(x_i)=1$، ولاحظ أنّ $N eq 2^n$. يمكننا التعبير عن $f$ بأنها OR لـ $elta_{x_i}$ لكل $in [N]$، حيث تُعرَّف الدالة $elta_lpha:0,1^n ightarrow 0,1$ (لكل $lpha n 0,1^n$) على النحو التالي: $elta_lpha(x)=1$ إذا ونحو فقط إذا كان $x=lpha$. ويمكننا حساب OR لـ $N$ قيمة باستعمال $N$ بوابة OR ثنائية المُدخل. لذلك، إذا كانت لدينا دائرة بحجم $O(n)$ لحساب $elta_lpha$ لكل $lpha n 0,1^n$، فيمكننا حساب $f$ باستعمال دائرة بحجم $O(n dot N) = O(n dot 2^n)$. ">{#computeallfuncaltfig  .margin }</p>
<blockquote>
<h3 id="proofidea-data-refquotcircuit-univ-alt-thmquot">{.proofidea data-ref=&quot;circuit-univ-alt-thm&quot;}</h3>
</blockquote>
<p>فكرة البرهان مصوّرة في <a href="">computeallfuncaltfig</a>{.ref}. وكما من قبل، يكفي التركيز على الحالة التي يكون فيها $m=1$ (أي أنّ الدالة $f$ لها مُخرج واحد)، إذ يمكننا دائمًا توسيع ذلك إلى الحالة $m&gt;1$ بالنظر في تركيب $m$ دائرة، كل واحدة تحسب بتًّا مختلفًا من مُخرجات الدالة $f$.
نبدأ بإظهار أنّ لكل $\\alpha \\in {0,1}^n$ توجد دائرة بحجم $O(n)$ تحسب الدالة $\\delta_\\alpha:{0,1}^n \\rightarrow {0,1}$ المعرَّفة على النحو التالي: $\\delta_\\alpha(x)=1$ إذا ونحو فقط إذا كان $x=\\alpha$ (أي أنّ $\\delta_\\alpha$ تُخرج $0$ على كل المُداخل ما عدا المُدخل $\\alpha$). وعندئذٍ يمكننا كتابة أي دالة $f:{0,1}^n \\rightarrow {0,1}$ بأنها OR لـ $2^n$ دالة $\\delta_\\alpha$ على الأكثر، حيث $\\alpha$ تلك القيم التي تتحقّق عندها $f(\\alpha)=1$.</p>
<p>::: {.proof data-ref=&quot;circuit-univ-alt-thm&quot;}
نُثبت المبرهنة للحالة $m=1$. ويمكن توسيع النتيجة إلى $m&gt;1$ كما من قبل (انظر أيضًا <a href="">mult-bit-ex</a>{.ref}).
لتكن $f:{0,1}^n \\rightarrow {0,1}$.
سنُثبت أنّ هناك دائرة منطقية بحجم $O(n\\cdot 2^n)$ لحساب $f$ عبر الخطوات التالية:</p>
<ol>
<li>
<p>نُبيّن أنّ لكل $\\alpha\\in {0,1}^n$ توجد دائرة بحجم $O(n)$ تحسب الدالة $\\delta_\\alpha:{0,1}^n \\rightarrow {0,1}$، حيث $\\delta_\\alpha(x)=1$ إذا ونحو فقط إذا كان $x=\\alpha$.</p>
</li>
<li>
<p>ثم نُبيّن أنّ هذا يقتضي وجود دائرة بحجم $O(n\\cdot 2^n)$ تحسب $f$، بكتابة $f(x)$ بأنها OR لـ $\\delta_\\alpha(x)$ لكل $\\alpha\\in {0,1}^n$ بحيث $f(\\alpha)=1$. (وإذا كانت $f$ هي دالة الصفر الثابت، وبالتالي لا توجد مثل هذه القيمة $\\alpha$، فيمكننا استعمال الدائرة $f(x) = x_0 \\wedge \\overline{x}_0$.)</p>
</li>
</ol>
<p>نبدأ بالخطوة 1:</p>
<p><strong>ادّعاء:</strong> لكل $\\alpha \\in {0,1}^n$، نُعرِّف $\\delta_\\alpha:{0,1}^n$ على النحو التالي:
$$
\\delta_\\alpha(x) = \\begin{cases}1 &amp; x=\\alpha \\ 0 &amp; \\text{otherwise} \\end{cases} ;.
$$
عندئذٍ توجد دائرة منطقية تستعمل $2n$ بوابة على الأكثر تحسب $\\delta_\\alpha$.</p>
<p><strong>برهان الادّعاء:</strong> البرهان مصوَّر في <a href="">deltafuncfig</a>{.ref}.
مثالًا، لننظر في الدالة $\\delta_{011}:{0,1}^3 \\rightarrow {0,1}$.
تُخرج هذه الدالة $1$ على $x$ إذا ونحو فقط إذا كان $x_0=0$ و$x_1=1$ و$x_2=1$، ومن ثمّ يمكننا كتابة $\\delta_{011}(x) = \\overline{x_0} \\wedge x_1 \\wedge x_2$، وهو ما ينطوي على دائرة منطقية ببوابة NOT واحدة وبوابة AND ثانية.
وبشكل عام، لكل $\\alpha \\in {0,1}^n$ يمكننا التعبير عن $\\delta_{\\alpha}(x)$ على صورة $(x_0 = \\alpha_0) \\wedge (x_1 = \\alpha_1) \\wedge \\cdots \\wedge (x_{n-1} = \\alpha_{n-1})$، حيث إذا كان $\\alpha_i=0$ نستبدل $x_i = \\alpha_i$ بـ $\\overline{x_i}$، وإذا كان $\\alpha_i=1$ نستبدل $x_i=\\alpha_i$ ببساطة $x_i$.
وهذا يعطي دائرة تحسب $\\delta_\\alpha$ باستعمال $n$ بوابة AND و$n$ بوابة NOT على الأكثر، أي بمجموع $2n$ بوابة على الأكثر.</p>
<p>والآن، لكل دالة $f:{0,1}^n \\rightarrow {0,1}$، يمكننا كتابة</p>
<p>$$
f(x) = \\delta_{x_0}(x) \\vee \\delta_{x_1}(x) \\vee \\cdots \\vee \\delta_{x_{N-1}}(x) \\label{eqorofdeltafunc}
$$</p>
<p>حيث $S={ x_0 ,\\ldots, x_{N-1}}$ هي مجموعة المُداخل التي تُخرج فيها $f$ القيمة $1$.
(ولرؤية ذلك، يمكنك التحقّق من أنّ الطرف الأيمن من <a href="">eqorofdeltafunc</a>{.eqref} يُقيَّم إلى $1$ على $x\\in {0,1}^n$ إذا ونحو فقط إذا كان $x$ في المجموعة $S$.)</p>
<p>لذلك يمكننا حساب $f$ باستعمال دائرة منطقية من $2n$ بوابة على الأكثر لكل واحدة من الدوال $\\delta_{x_i}$ وعددها $N$، ثمّ دمجها مع $N$ بوابة OR على الأكثر، فنحصل بذلك على دائرة من $2n\\cdot N + N$ بوابة على الأكثر.
وبما أنّ $S \\subseteq {0,1}^n$، فإنّ حجمها $N$ هو $2^n$ على الأكثر، ومن ثمّ فإنّ مجموع عدد البوابات في هذه الدائرة هو $O(n\\cdot 2^n)$.
:::</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-5.webp" alt="/images/introtcs/lec_03a_computing_every_function-5.webp">{#deltafuncfig .margin }</p>
<h2 id="الصنف-sizenms-secdefinesizeclasses">الصنف $SIZE_{n,m}(s)$ {#secdefinesizeclasses }</h2>
<p>لقد رأينا أنّ <em>كل</em> دالة $f:{0,1}^n \\rightarrow {0,1}^m$ يمكن حسابها بدائرة بحجم $O(m\\cdot 2^n)$، وأنّ <em>بعض</em> الدوال (مثل الجمع والضرب) يمكن حسابها بدوائر أصغر بكثير.
نُعرِّف $SIZE_{n,m}(s)$ لتكون مجموعة الدوال التي تُسقط $n$ بتًّا على $m$ بتًّا والتي يمكن حسابها بدوائر NAND من $s$ بوابة على الأكثر (أو بما يكافئها، ببرامج NAND-CIRC من $s$ سطرًا على الأكثر).
والتعريف الرسمي هو كما يلي:</p>
<blockquote>
<h3 id="definition-titlequotصنف-حجم-الدوالquot-sizedef">{.definition title=&quot;صنف حجم الدوال&quot; #sizedef}</h3>
</blockquote>
<p>لكل الأعداد الطبيعية $n,m,s$، لتُدلّ $SIZE_{n,m}(s)$ على مجموعة كل الدوال $f:{0,1}^n \\rightarrow {0,1}^m$ بحيث توجد دائرة NAND من $s$ بوابة على الأكثر تحسب $f$.
ونرمز بـ $SIZE_n(s)$ إلى المجموعة $SIZE_{n,1}(s)$.
ولكل عدد صحيح $s \\geq 1$، نضع $SIZE(s) = \\cup_{n,m} SIZE_{n,m}(s)$ لتكون مجموعة كل الدوال $f$ التي توجد دائرة NAND من $s$ بوابة على الأكثر تحسب $f$.</p>
<p>يصوّر <a href="">funcvscircfig</a>{.ref} المجموعة $SIZE_{n,1}(s)$.
لاحظ أنّ $SIZE_{n,m}(s)$ مجموعة <em>دوال</em> لا مجموعة <em>برامج!</em> فالسؤال عمّا إذا كان برنامج أو دائرة عضوًا في $SIZE_{n,m}(s)$ هو <em>خطأ في التصنيف</em> (<em>category error</em>) بالمعنى المذكور في <a href="">cucumberfig</a>{.ref}.
وكما ناقشنا في <a href="">specvsimplrem</a>{.ref} (و<a href="">secimplvsspec</a>{.ref})، فإنّ التمييز بين <em>البرامج</em> و_الدوال_ بالغ الأهمية.
وينبغي أن تتذكّر دائمًا أنّ البرنامج <em>يحسب</em> الدالة، لكنه ليس <em>مساويًا</em> لها.
وبالذات، كما رأينا، قد يوجد أكثر من برنامج واحد يحسب الدالة نفسها.</p>
<p><img src="/arabic-cs-library/images/introtcs/fig-funcvscircs.webp" alt="هناك $2^{2^n}$ دالة تُسقط $0,1^n$ على $0,1$، وعددٌ لا نهائي من الدوائر ذات $n$ بتًّا مُدخلًا وبتّ خرج واحد. كل دائرة تحسب دالة واحدة، لكن كل دالة يمكن حسابها بدوائر عديدة. نقول إنّ $f n SIZE_{n,1}(s)$ إذا كانت أصغر دائرة تحسب $f$ لها $s$ بوابة أو أقل. مثلًا $XOR_n n SIZE_{n,1}(4n)$. وتُظهر NAND-univ-thm{.ref} أنّ كل دالة $g$ قابلة للحساب بدائرة ما من $cdot 2^n/n$ بوابة على الأكثر، ومن ثمّ فإنّ $SIZE_{n,1}(cdot 2^n/n)$ يقابل مجموعة كل الدوال من $0,1^n$ إلى $0,1$.">{#funcvscircfig .class  }</p>
<p>ولأَنّنا عرّفنا $SIZE_n(s)$ بالنسبة إلى بوابات NAND، فسنحصل على الصنف نفسه جوهريًا لو عرّفناه بالنسبة إلى بوابات AND/OR/NOT:</p>
<blockquote>
<h3 id="lemma-nandaonsizelem">{.lemma #nandaonsizelem}</h3>
</blockquote>
<p>لتُدلّ $SIZE^{AON}<em>{n,m}(s)$ على مجموعة كل الدوال $f:{0,1}^n \\rightarrow {0,1}^m$ التي يمكن حسابها بدائرة منطقية AND/OR/NOT من $s$ بوابة على الأكثر.
عندئذٍ،
$$
SIZE</em>{n,m}(s/2) \\subseteq SIZE^{AON}<em>{n,m}(s) \\subseteq SIZE</em>{n,m}(3s)
$$</p>
<p>::: {.proof data-ref=&quot;nandaonsizelem&quot;}
إذا كانت $f$ قابلة للحساب بدائرة NAND من $s/2$ بوابة على الأكثر، فإنّه باستبدال كل NAND ببوابتَي NOT وAND يمكننا الحصول على دائرة منطقية AND/OR/NOT من $s$ بوابة على الأكثر تحسب $f$.
ومن جهة أخرى، إذا كانت $f$ قابلة للحساب بدائرة منطقية AND/OR/NOT من $s$ بوابة على الأكثر، فإنّها بموجب <a href="">NANDuniversamthm</a>{.ref} قابلة للحساب بدائرة NAND من $3s$ بوابة على الأكثر.
:::</p>
<p><img src="/arabic-cs-library/images/introtcs/lec_03a_computing_every_function-6.webp" alt="/images/introtcs/lec_03a_computing_every_function-6.webp">{#cucumberfig .margin  }</p>
<p>يمكن صياغة النتائج التي رأيناها في هذا الفصل على صورة أنّ $ADD_n \\in SIZE_{2n,n+1}(100 n)$
و$MULT_n \\in SIZE_{2n,2n}(10000 n^{\\log_2 3})$.
وتُظهر <a href="">NAND-univ-thm</a>{.ref} أنّه لبعض الثابت $c$، تكون $SIZE_{n,m}(c m 2^n)$ مساوية لمجموعة كل الدوال من \${0,1}^n$ إلى \${0,1}^m$.</p>
<p>:::  {.remark title=&quot;الدوال المتناهية في مقابل اللانهائية&quot; #infinitefunc}
على خلاف لغات البرمجة مثل <em>Python</em> أو <em>C</em> أو <em>JavaScript</em>، فإن لغتَي البرمجة NAND-CIRC وAON-CIRC لا تملكان <em>مصفوفات</em> (<em>arrays</em>).
ولبرنامج NAND-CIRC $P$ عددٌ ثابت $n$ من مُدخلات وعددٌ ثابت $m$ من متغيّرات مُخرج. ولذلك، مثلًا، لا يوجد برنامج NAND-CIRC واحد يستطيع حساب دالة الزيادة $INC:{0,1}^* \\rightarrow {0,1}^*$ التي تُسقط نصًّا $x$ (الذي نحدّده بعددٍ عبر التمثيل الثنائي) على النص الذي يمثّل $x+1$. بل إنّ لكل $n&gt;0$ يوجد برنامج NAND-CIRC $P_n$ يحسب التقييد $INC_n$ للدالة $INC$ على المُداخل من الطول $n$. وبما أنّه يمكن إظهار أنّه لكل $n&gt;0$ يوجد مثل هذا البرنامج $P_n$ بطول $10n$ على الأكثر، فإنّ $INC_n \\in SIZE_{n,n+1}(10n)$ لكل $n&gt;0$.</p>
<p>أمّا في الوقت الحالي فسيتركّز اهتمامنا على الدوال <em>المتناهية</em>، لكنّنا سنناقش لاحقًا في <a href="">nonuniformcompsec</a>{.ref} كيفية توسيع تعريف تعقيد الحجم على الدوال ذات أطوال المُداخل غير المحدودة.
:::</p>
<p>::: {.solvedexercise title=&quot;انغلاق $SIZE$ تحت التكامل.&quot; #sizeclosundercomp}
في هذا التمرين نُثبت خاصيةَ انغلاق (closure property) معيّنة للصنف $SIZE_n(s)$.
أي أنّنا نُبيّن أنّه إذا كانت $f$ في هذا الصنف فإنّ تكاملها — أي الدالة $g(x)=1-f(x)$ — يكون كذلك فيه (حتى حدٍّ جُمعِي صغير).</p>
<p>أثبِت أنّه يوجد ثابت $c$ بحيث لكل $f:{0,1}^n \\rightarrow {0,1}$ و$s\\in \\N$، إذا كان $f \\in SIZE_n(s)$ فإنّ $1-f \\in SIZE_n(s+c)$.
:::</p>
<p>::: {.solution data-ref=&quot;sizeclosundercomp&quot;}
إذا كان $f\\in SIZE_n(s)$ فإنّ هناك برنامج NAND-CIRC $P$ من $s$ سطرًا يحسب $f$.
يمكننا إعادة تسمية المتغيّر <code>Y[0]</code> في $P$ إلى متغيّر اسمه <code>temp</code> وإضافة السطر</p>
<pre><code class="language-python">Y[<span class="hljs-number">0</span>] = NAND(temp,temp)
</code></pre>
<p>في نهايته تمامًا للحصول على برنامج $P'$ يحسب $1-f$.
:::</p>
<blockquote>
<h3 id="recap">{ .recap }</h3>
</blockquote>
<ul>
<li>يمكننا تعريف فكرة حساب دالة عبر «لغة برمجة» مبسّطة، بحيث إنّ حساب الدالة $F$ في $T$ خطوة يقابل وجود برنامج NAND-CIRC من $T$ سطرًا يحسب $F$.</li>
<li>ولأَنّ لغة البرمجة NAND-CIRC لا تملك سوى عملية واحدة، فإنّ العمليات الأخرى مثل الدوال والتنفيذ الشرطي يمكن تنفيذها باستعمالها.</li>
<li>كل دالة $f:{0,1}^n \\rightarrow {0,1}^m$ يمكن حسابها بدائرة من $O(m 2^n)$ بوابة على الأكثر (وفي الحقيقة من $O(m 2^n/n)$ بوابة على الأكثر).</li>
<li>أحيانًا (وربما دائمًا؟) يمكننا ترجمة خوارزمية <em>كفؤة</em> لحساب $f$ إلى دائرة تحسب $f$ بعدد بوابات يقارن عدد خطوات هذه الخوارزمية.</li>
</ul>
<div class="exercises"><h2 id="تمارين">تمارين</h2>
<p>::: {.exercise title=&quot;الاقتران&quot; #embedtuples-ex}
يطلب منك هذا التمرين إعطاء خريطة (map) واحد-إلى-واحد (one-to-one) من $\\N^2$ إلى $\\N$. ويمكن أن يكون ذلك مفيدًا لتنفيذ المصفوفات ثنائية الأبعاد بوصفها «سكرًا نحويًا» في لغات البرمجة التي لا تملك إلّا مصفوفات أحادية البعد.</p>
<ol>
<li>
<p>أثبِت أنّ الخريطة $F(x,y)=2^x3^y$ هي خريطة واحد-إلى-واحد من $\\N^2$ إلى $\\N$.</p>
</li>
<li>
<p>بيّن أنّه توجد خريطة واحد-إلى-واحد $F:\\N^2 \\rightarrow \\N$ بحيث لكل $x,y$، لدينا $F(x,y) \\leq 100\\cdot \\max{x,y}^2+100$.</p>
</li>
<li>
<p>لكل $k$، بيّن أنّه توجد خريطة واحد-إلى-واحد $F:\\N^k \\rightarrow \\N$ بحيث لكل $x_0,\\ldots,x_{k-1} \\in \\N$، لدينا $F(x_0,\\ldots,x_{k-1}) \\leq 100 \\cdot (x_0+x_1+\\ldots+x_{k-1}+100k)^k$.
:::</p>
</li>
</ol>
<p>::: {.exercise title=&quot;حساب MUX&quot; #mux-ex}
أثبِت أنّ برنامج NAND-CIRC أدناه يحسب الدالة $MUX$ (أي $LOOKUP_1$)، حيث تساوي $MUX(a,b,c)$ القيمة $a$ إذا كان $c=0$ والقيمة $b$ إذا كان $c=1$:</p>
<pre><code class="language-python">t = NAND(X[<span class="hljs-number">2</span>],X[<span class="hljs-number">2</span>])
u = NAND(X[<span class="hljs-number">0</span>],t)
v = NAND(X[<span class="hljs-number">1</span>],X[<span class="hljs-number">2</span>])
Y[<span class="hljs-number">0</span>] = NAND(u,v)
</code></pre>
<p>:::</p>
<p>::: {.exercise title=&quot;على الأقل اثنين / الأغلبية&quot; #atleasttwo-ex}
اكتب برنامج NAND-CIRC من 6 أسطر على الأكثر يحسب الدالة $MAJ:{0,1}^3 \\rightarrow {0,1}$
حيث $MAJ(a,b,c) = 1$ إذا ونحو فقط إذا كان $a+b+c \\geq 2$.
:::</p>
<p>::: {.exercise title=&quot;الجمل الشرطية&quot; #conditionalsugarthmex}
في هذا التمرين سنستكشف <a href="">conditionalsugarthm</a>{.ref}: تحويل برامج NAND-CIRC-IF التي تستعمل شيفرة مثل <code>if .. then .. else ..</code> إلى برامج NAND-CIRC معيارية.</p>
<ol>
<li>
<p>قدّم «برهانًا بالشيفرة» لـ <a href="">conditionalsugarthm</a>{.ref}: برنامجًا بلغة برمجة من اختيارك يحوّل برنامج NAND-CIRC-IF من الشكل $P$ إلى برنامج NAND-CIRC «خالٍ من السكر» $P'$ يحسب الدالة نفسها. انظر الحاشية للتلميح.^[يمكنك البدء بتحويل $P$ إلى برنامج NAND-CIRC-PROC يستعمل عبارات الإجراءات، ثمّ استعمال شيفرة <a href="">desugarcode</a>{.ref} لتحويل الأخير إلى برنامج NAND-CIRC «خالٍ من السكر».]</p>
</li>
<li>
<p>أثبِت العبارة التالية، وهي جوهر <a href="">conditionalsugarthm</a>{.ref}: افترض أنّه يوجد برنامج NAND-CIRC من $s$ سطرًا يحسب $f:{0,1}^n \\rightarrow {0,1}$، وبرنامج NAND-CIRC من $s'$ سطرًا يحسب $g:{0,1}^n \\rightarrow {0,1}$.
أثبِت أنّه يوجد برنامج NAND-CIRC من $s+s'+10$ أسطر على الأكثر يحسب الدالة $h:{0,1}^{n+1} \\rightarrow {0,1}$ حيث $h(x_0,\\ldots,x_{n-1},x_n)$ تساوي $f(x_0,\\ldots,x_{n-1})$ إذا كان $x_n=0$ وتساوي $g(x_0,\\ldots,x_{n-1})$ في غير ذلك. (جميع البرامج في هذا البند هي برامج NAND-CIRC معيارية «خالية من السكر».)
:::</p>
</li>
</ol>
<p>::: {.exercise title=&quot;نصف الجامع والجامع الكامل&quot; #halffulladderex}</p>
<ol>
<li>
<p><em>نصف الجامع</em> (<em>half adder</em>) هو الدالة $HA:{0,1}^2 :\\rightarrow {0,1}^2$ التي تقابل إضافة بتّين ثنائيين. أي أنّه لكل $a,b \\in {0,1}$، لدينا $HA(a,b)= (e,f)$ حيث $2e+f = a+b$. أثبِت أنّه توجد دائرة NAND من خمس بوابات NAND على الأكثر تحسب $HA$.</p>
</li>
<li>
<p><em>الجامع الكامل</em> (<em>full adder</em>) هو الدالة $FA:{0,1}^3 \\rightarrow {0,1}^{2}$ التي تأخذ بتّين وبتّ «احتفاظ» (<em>carry</em>) وتُخرج مجموعها. أي أنّه لكل $a,b,c \\in {0,1}$، لدينا $FA(a,b,c) = (e,f)$ بحيث $2e+f = a+b+c$. أثبِت أنّه توجد دائرة NAND من تسع بوابات NAND على الأكثر تحسب $FA$.</p>
</li>
<li>
<p>أثبِت أنّه إذا كانت هناك دائرة NAND من $c$ بوابة تحسب $FA$، فإنّ هناك دائرة من $cn$ بوابة تحسب $ADD_n$، حيث (كما في <a href="">addition-thm</a>{.ref}) $ADD_n:{0,1}^{2n} \\rightarrow {0,1}^{n+1}$ هي الدالة التي تُخرج مجموع عددين مُدخلين من $n$ بت. انظر الحاشية للتلميح.^[استعمل «سلسلة» (<em>cascade</em>) من إضافة البتات واحدًا تلو الآخر، بدءًا من الرقم الأقل قيمة، تمامًا كما في خوارزمية المدرسة الابتدائية.]</p>
</li>
<li>
<p>بيّن أنّه لكل $n$ يوجد برنامج NAND-CIRC يحسب $ADD_n$ بـ $9n$ سطرًا على الأكثر.
:::</p>
</li>
</ol>
<blockquote>
<h3 id="exercise-titlequotالجمعquot-addition-ex">{.exercise title=&quot;الجمع&quot; #addition-ex}</h3>
</blockquote>
<p>اكتب برنامجًا بلغتك البرمجية المفضّلة، يُدخل إليه عدد صحيح $n$ ويُخرج برنامج NAND-CIRC يحسب $ADD_n$. هل تستطيع أن تضمن أنّ البرنامج الذي يُخرجه لـ $ADD_n$ يكون في أقلّ من $10n$ سطرًا؟</p>
<blockquote>
<h3 id="exercise-titlequotالضربquot-multiplication-ex">{.exercise title=&quot;الضرب&quot; #multiplication-ex}</h3>
</blockquote>
<p>اكتب برنامجًا بلغتك البرمجية المفضّلة، يُدخل إليه عدد صحيح $n$ ويُخرج برنامج NAND-CIRC يحسب $MULT_n$. هل تستطيع أن تضمن أنّ البرنامج الذي يُخرجه لـ $MULT_n$ يكون في أقلّ من $1000\\cdot n^2$ سطرًا؟</p>
<blockquote>
<h3 id="exercise-titlequotضرب-كفؤ-تحدquot-eff-multiplication-ex">{.exercise title=&quot;ضرب كفؤ (تحدٍّ)&quot; #eff-multiplication-ex}</h3>
</blockquote>
<p>اكتب برنامجًا بلغتك البرمجية المفضّلة، يُدخل إليه عدد صحيح $n$ ويُخرج برنامج NAND-CIRC يحسب $MULT_n$ ولا يتجاوز $10000 n^{1.9}$ سطرًا.^[<strong>تلميح:</strong> استعمل خوارزمية كارا تسوبا (Karatsuba).] ما أصغر عدد أسطر تستطيع استعماله لضرب عددين من 2048 بت؟</p>
<p>::: {.exercise title=&quot;دوال متعدّدة البتات&quot; #mult-bit-ex}
في متن الكتاب، لم تُثبَت <a href="">NAND-univ-thm</a>{.ref} إلّا للحالة $m=1$.
وفي هذا التمرين ستوسّع البرهان لكل $m$.</p>
<p>أثبِت أنّ</p>
<ol>
<li>
<p>إذا كان هناك برنامج NAND-CIRC من $s$ سطرًا يحسب $f:{0,1}^n \\rightarrow {0,1}$ وبرنامج NAND-CIRC من $s'$ سطرًا يحسب $f':{0,1}^n \\rightarrow {0,1}$، فإنّ هناك برنامجًا من $s+s'$ سطرًا يحسب الدالة $g:{0,1}^n \\rightarrow {0,1}^2$ بحيث $g(x)=(f(x),f'(x))$.</p>
</li>
<li>
<p>لكل دالة $f:{0,1}^n \\rightarrow {0,1}^m$، يوجد برنامج NAND-CIRC من $10m\\cdot 2^n$ سطرًا على الأكثر يحسب $f$. (يمكنك استعمال حالة $m=1$ من <a href="">NAND-univ-thm</a>{.ref}، وكذلك البند 1.)
:::</p>
</li>
</ol>
<p>::: {.exercise title=&quot;التبسيط باستعمال السكر النحوي&quot; #usesugarex}
لتكن $P$ برنامج NAND-CIRC التالي:</p>
<pre><code class="language-python">Temp[<span class="hljs-number">0</span>] = NAND(X[<span class="hljs-number">0</span>],X[<span class="hljs-number">0</span>])
Temp[<span class="hljs-number">1</span>] = NAND(X[<span class="hljs-number">1</span>],X[<span class="hljs-number">1</span>])
Temp[<span class="hljs-number">2</span>] = NAND(Temp[<span class="hljs-number">0</span>],Temp[<span class="hljs-number">1</span>])
Temp[<span class="hljs-number">3</span>] = NAND(X[<span class="hljs-number">2</span>],X[<span class="hljs-number">2</span>])
Temp[<span class="hljs-number">4</span>] = NAND(X[<span class="hljs-number">3</span>],X[<span class="hljs-number">3</span>])
Temp[<span class="hljs-number">5</span>] = NAND(Temp[<span class="hljs-number">3</span>],Temp[<span class="hljs-number">4</span>])
Temp[<span class="hljs-number">6</span>] = NAND(Temp[<span class="hljs-number">2</span>],Temp[<span class="hljs-number">2</span>])
Temp[<span class="hljs-number">7</span>] = NAND(Temp[<span class="hljs-number">5</span>],Temp[<span class="hljs-number">5</span>])
Y[<span class="hljs-number">0</span>] = NAND(Temp[<span class="hljs-number">6</span>],Temp[<span class="hljs-number">7</span>])
</code></pre>
<ol>
<li>
<p>اكتب برنامجًا $P'$ من ثلاثة أسطر شيفرة على الأكثر يستعمل كلًّا من <code>NAND</code> والسكر النحوي <code>OR</code>، ويحسب الدالة نفسها التي يحسبها $P$.</p>
</li>
<li>
<p>ارسم دائرة تحسب الدالة نفسها التي يحسبها $P$ وتستعمل بوابات $AND$ و$NOT$ فقط.
:::</p>
</li>
</ol>
<p>في التمارين التالية يُطلب منك مقارنة <em>القدرة</em> (<em>power</em>) لثنائيات من لغات البرمجة.
وبـ«مقارنة القدرة» لغتَي برمجة $X$ و$Y$ فإننا نعني تحديد العلاقة بين مجموعة الدوال القابلة للحساب ببرامج مكتوبة بـ $X$ وببرامج مكتوبة بـ $Y$ على الترتيب. أي أنّ للإجابة عن مثل هذا السؤال عليك أن تفعل ما يلي معًا:</p>
<ol>
<li>إمّا أن تُثبت أنّ لكل برنامج $P$ في $X$ يوجد برنامج $P'$ في $Y$ يحسب الدالة نفسها التي يحسبها $P$، <em>أو</em> أن تعطي مثالًا لدالة قابلة للحساب ببرنامج في $X$ وغير قابلة للحساب ببرنامج في $Y$.</li>
</ol>
<p><em>و</em></p>
<ol start="2">
<li>إمّا أن تُثبت أنّ لكل برنامج $P$ في $Y$ يوجد برنامج $P'$ في $X$ يحسب الدالة نفسها التي يحسبها $P$، <em>أو</em> أن تعطي مثالًا لدالة قابلة للحساب ببرنامج في $Y$ وغير قابلة للحساب ببرنامج في $X$.</li>
</ol>
<p>وعندما تعطي مثالًا كما سبق لدالة قابلة للحساب في لغة برمجة واحدة وغير قابلة للحساب في الأخرى، فعليك أن <em>تُثبت</em> أنّ الدالة التي أظهرتها هي <em>(1)</em> قابلة للحساب في لغة البرمجة الأولى و_(2)_ <em>غير قابلة للحساب</em> في لغة البرمجة الثانية.</p>
<p>::: {.exercise title=&quot;قارن IF وNAND&quot; #compareif}
لتكن IF-CIRC هي لغة البرمجة التي نملك فيها العمليات التالية <code>foo = 0</code> و<code>foo = 1</code> و<code>foo = IF(cond,yes,no)</code> (أي أنّنا نستطيع استعمال الثابتين $0$ و$1$، والدالة $IF:{0,1}^3 \\rightarrow {0,1}$ بحيث تساوي $IF(a,b,c)$ القيمة $b$ إذا كان $a=1$ والقيمة $c$ إذا كان $a=0$). قارن بين قدرة لغة البرمجة NAND-CIRC ولغة البرمجة IF-CIRC.
:::</p>
<p>::: {.exercise title=&quot;قارن XOR وNAND&quot; #comparexor}
لتكن XOR-CIRC هي لغة البرمجة التي نملك فيها العمليات التالية <code>foo = XOR(bar,blah)</code> و<code>foo = 1</code> و<code>bar = 0</code> (أي أنّنا نستطيع استعمال الثابتين $0$ و$1$ والدالة $XOR$ التي تُسقط $a,b \\in {0,1}^2$ على $a+b \\mod 2$). قارن بين قدرة لغة البرمجة NAND-CIRC ولغة البرمجة XOR-CIRC. انظر الحاشية للتلميح.^[يمكنك استعمال الحقيقة $(a+b)+c \\mod 2 = a+b+c \\mod 2$. وبخاصة فهي تعني أنّه إذا كانت لديك السطران <code>d = XOR(a,b)</code> و<code>e = XOR(d,c)</code> فإنّ <code>e</code> يأخذ مجموع المتغيّرات <code>a</code> و<code>b</code> و<code>c</code> على مقياس $2$.]
:::</p>
<p>::: {.exercise title=&quot;دوائر للأغلبية&quot; #majasymp}
أثبِت أنّه يوجد ثابت ما $c$ بحيث لكل $n&gt;1$، لدينا $MAJ_n \\in SIZE_n(cn)$، حيث $MAJ_n:{0,1}^n \\rightarrow {0,1}$ هي دالة الأغلبية على $n$ بتًّا مُدخلًا. أي أنّ $MAJ_n(x)=1$ إذا ونحو فقط إذا كان $\\sum_{i=0}^{n-1}x_i &gt; n/2$. انظر الحاشية للتلميح.^[أحد الطرق لحلّ هذا هو استعمال التكرارية وما يُعرف بـ<a href="https://en.wikipedia.org/wiki/Master%5Ftheorem%5F(analysis%5Fof%5Falgorithms)">مبرهنة المُعلِّم</a> (<em>Master Theorem</em>).]
:::</p>
<p>::: {.exercise title=&quot;دوائر للعتبة&quot; #thresholdcirc}
أثبِت أنّه يوجد ثابت ما $c$ بحيث لكل $n&gt;1$، ولكل أعداد صحيحة $a_0,\\ldots,a_{n-1},b \\in {-2^n,-2^n+1,\\ldots,-1,0,+1,\\ldots,2^n}$، توجد دائرة NAND من $n^c$ بوابة على الأكثر تحسب دالةَ العتبة (<em>threshold function</em>) $f_{a_0,\\ldots,a_{n-1},b}:{0,1}^n \\rightarrow {0,1}$ التي على مُدخل $x\\in {0,1}^n$ تُخرج $1$ إذا ونحو فقط إذا كان $\\sum_{i=0}^{n-1} a_i x_i &gt; b$.
:::</p>
<h2 id="ملاحظات-ببليوغرافية-computeeveryfunctionbibnotes">ملاحظات ببليوغرافية { #computeeveryfunctionbibnotes  }</h2>
<p>انظر كتابَي Jukna وWegener [@Jukna12, @wegener1987complexity] لمناقشة أوسع بكثير للدوائر.
أثبت Shannon أنّ كل دالة منطقية يمكن حسابها بدائرة أُسّية الحجم [@Shannon1938]. والحدّ المحسّن $c \\cdot 2^n/n$ (مع القيمة المثلى لـ $c$ بالنسبة لقواعد كثيرة) هو من وضع Lupanov [@Lupanov1958]. وعرضٌ له في حالة NAND (حيث $c=1$) موجود في الفصل 4 من كتابه [@lupanov1984].
(شكرًا لـ Sasha Golovnev على البحث عن هذا المرجع!)</p>
<p>يُعرف مفهوم «السكر النحوي» أيضًا بـ«الماكرو» (<em>macros</em>) أو بـ«البرمجة فوق البرمجية» (<em>meta-programming</em>)، وأحيانًا ما يُنفَّذ عبر معالِج أولي (preprocessor) أو لغة ماكرو داخل لغة برمجة أو محرّر نصوص. ومن الأمثلة الحديثة محوِّل صياغة JavaScript المعروف بـ<a href="https://babeljs.io/">Babel</a>، الذي يحوّل برامج JavaScript المكتوبة بأحدث الميزات إلى صيغةٍ تقبلها المتصفّحات الأقدم. بل إنّ له بنية <a href="https://babeljs.io/docs/plugins/">إضافات</a> (<em>plug-ins</em>) تتيح للمستخدمين أن يضيفوا سكّرهم النحوي الخاص إلى اللغة.</p>
</div>`,i={book:n,chapter:e,chapterTitle:t,slug:a,title:s,headings:o,html:$};export{n as book,e as chapter,t as chapterTitle,i as default,o as headings,$ as html,a as slug,s as title};
