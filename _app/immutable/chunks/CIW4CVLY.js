const e="ocaml-manual",o="ch22",n="قياس الأداء (ocamlprof, perf)",p="index",s="قياس الأداء (ocamlprof, perf)",c=[{depth:2,id:"221-قياس-أعداد-التنفيذ-باستعمال-ocamlprof",text:"22.1 قياس أعداد التنفيذ باستعمال ocamlprof"},{depth:3,id:"2211-الترجمة-من-أجل-قياس-الأداء",text:"22.1.1 الترجمة من أجل قياس الأداء"},{depth:3,id:"2212-قياس-تنفيذ-برنامج",text:"22.1.2 قياس تنفيذ برنامج"},{depth:3,id:"2213-طباعة-معلومات-القياس",text:"22.1.3 طباعة معلومات القياس"},{depth:2,id:"222-قياس-الزمن-باستعمال-linux-perf",text:"22.2 قياس الزمن باستعمال Linux perf"},{depth:3,id:"2221-خلفية",text:"22.2.1 خلفية"},{depth:3,id:"2222-الترجمة-من-أجل-قياس-الأداء",text:"22.2.2 الترجمة من أجل قياس الأداء"},{depth:3,id:"2223-قياس-تنفيذ-برنامج",text:"22.2.3 قياس تنفيذ برنامج"},{depth:3,id:"2224-عرض-معلومات-القياس",text:"22.2.4 عرض معلومات القياس"},{depth:3,id:"2225-خاتمة",text:"22.2.5 خاتمة"},{depth:2,id:"223-قياس-الزمن-باستعمال-macos-instruments",text:"22.3 قياس الزمن باستعمال macOS Instruments"},{depth:2,id:"224-المصطلحات",text:"22.4 المصطلحات"}],a=`<h1>الفصل 22: قياس الأداء (ocamlprof, perf)</h1>
<p>يصف هذا الفصل طرقًا مختلفة لقياس تنفيذ برامج OCaml.</p>
<h2 id="221-قياس-أعداد-التنفيذ-باستعمال-ocamlprof">22.1 قياس أعداد التنفيذ باستعمال ocamlprof</h2>
<p>يصف هذا القسم كيف يمكن قياس تنفيذ برامج OCaml بتسجيل عدد مرات استدعاء الدوال، والأوقات التي تُسلَك فيها فروع الشروط. وينطبق هذا المنهج على برامج OCaml المترجمة بالمنصّة الخلفية للشيفرة البايتية وبالمنصّة الخلفية للشيفرة الأصلية على السواء.</p>
<h3 id="2211-الترجمة-من-أجل-قياس-الأداء">22.1.1 الترجمة من أجل قياس الأداء</h3>
<p>قبل قياس تنفيذ برنامج، يجب ترجمته في نمط قياس الأداء، باستعمال الواجهة الأمامية <code>ocamlcp</code> للمترجم <code>ocamlc</code> (انظر الفصل 13) أو الواجهة الأمامية <code>ocamloptp</code> للمترجم <code>ocamlopt</code> (انظر الفصل 16). وعند ترجمة الوحدات منفصلة، يجب استعمال <code>ocamlcp</code> أو <code>ocamloptp</code> عند ترجمة الوحدات (أي عند إنتاج ملفّي <code>.cmo</code> أو <code>.cmx</code>)، ويمكن أيضًا استعمالهما (وإن لم يكن ذلك لازمًا بالضرورة) عند ربطها معًا.</p>
<h5>ملاحظة</h5>
<p>إذا لم تكن للوحدة (ملف <code>.ml</code>) واجهة مقابلة (ملف <code>.mli</code>)، فإن ترجمتها بـ <code>ocamlcp</code> ستنتج ملفّات كائن (<code>.cmi</code> و<code>.cmo</code>) غير متوافقة مع تلك التي ينتجها <code>ocamlc</code>، وقد يؤدّي ذلك إلى مشكلات (إذا ظلّ ملفّ <code>.cmi</code> أو <code>.cmo</code> موجودًا) عند التبديل بين ترجمات قياس الأداء وغير قياس الأداء. ولتجنّب هذه المشكلة، ينبغي أن يكون لكل ملف <code>.ml</code> ملف <code>.mli</code>. والمشكلة نفسها قائمة مع <code>ocamloptp</code>.</p>
<h5>ملاحظة</h5>
<p>للتأكّد من إمكان ترجمة برامجك في نمط قياس الأداء، تجنّب استعمال أي معرّف يبدأ بـ <code>__ocaml_prof</code>.</p>
<p>يمكن التحكّم في كمّ معلومات القياس عبر الخيار <code>-P</code> في <code>ocamlcp</code> أو <code>ocamloptp</code>، يتبعه حرف واحد أو عدّة أحرف تشير إلى أجزاء البرنامج التي ينبغي قياسها:</p>
<p><strong><code>a</code></strong></p>
<p>كل الخيارات</p>
<p><strong><code>f</code></strong></p>
<p>استدعاءات الدوال: تُوضع نقطة عدّ في بداية جسم كل دالة</p>
<p><strong><code>i</code></strong></p>
<p>عبارة <strong>if …then …else …</strong>: تُوضع نقطتا عدّ في فرع <strong>then</strong> وفرع <strong>else</strong></p>
<p><strong><code>l</code></strong></p>
<p>حلقات <strong>while</strong> و<strong>for</strong>: تُوضع نقطة عدّ في بداية جسم الحلقة</p>
<p><strong><code>m</code></strong></p>
<p>فروع <strong>match</strong>: تُوضع نقطة عدّ في بداية جسم كل فرع</p>
<p><strong><code>t</code></strong></p>
<p>فروع <strong>try …with …</strong>: تُوضع نقطة عدّ في بداية جسم كل فرع</p>
<p>فعلى سبيل المثال، تؤدّي الترجمة بـ <code>ocamlcp -P film</code> إلى قياس استدعاءات الدوال، وعبارات if…then…else…، والحلقات، ومطابقة الأنماط.</p>
<p>استدعاء <code>ocamlcp</code> أو <code>ocamloptp</code> بلا الخيار <code>-P</code> يعادل <code>-P fm</code>، أي أنه لا يُقاس إلا استدعاء الدوال ومطابقة الأنماط.</p>
<h5>ملاحظة</h5>
<p>للتوافق مع الإصدارات السابقة، يقبل <code>ocamlcp</code> أيضًا الخيار <code>-p</code> بالوسائط والسلوك نفسيهما اللذين للخيار <code>-P</code>.</p>
<p>كما يقبل الأمران <code>ocamlcp</code> و<code>ocamloptp</code> جميع خيارات المترجم المقابل <code>ocamlc</code> أو <code>ocamlopt</code>، عدا الخيار <code>-pp</code> (المعالجة المسبقة).</p>
<h3 id="2212-قياس-تنفيذ-برنامج">22.1.2 قياس تنفيذ برنامج</h3>
<p>تشغيل ملف تنفيذي جرى ترجمته بـ <code>ocamlcp</code> أو <code>ocamloptp</code> يسجّل أعداد التنفيذ للأجزاء المحدّدة من البرنامج ويحفظها في ملف يُسمّى <code>ocamlprof.dump</code> في الدليل الحالي.</p>
<p>وإذا كان المتغيّر البيئي <code>OCAMLPROF_DUMP</code> مضبوطًا عند خروج البرنامج، استُعملت قيمته اسمًا للملف بدلًا من <code>ocamlprof.dump</code>.</p>
<p>ولا يُكتب ملف التصريف إلا إذا انتهى البرنامج انتهاءً طبيعيًا (باستدعاء <code>exit</code> أو بالوصول إلى نهاية التنفيذ). ولا يُكتب إذا انتهى البرنامج باستثناء غير مُلتقَط.</p>
<p>وإذا وُجد ملف تصريف متوافق في الدليل الحالي، تجمّعت معلومات القياس في هذا الملف. ويتيح ذلك، مثلًا، قياس عدّة تنفيذات لبرنامج على مدخلات مختلفة. ولاحظ أن ملفّات التصريف التي تنتجها الملفّات التنفيذية للشيفرة البايتية (المترجمة بـ <code>ocamlcp</code>) متوافقة مع ملفّات التصريف التي تنتجها الملفّات التنفيذية الأصلية (المترجمة بـ <code>ocamloptp</code>).</p>
<h3 id="2213-طباعة-معلومات-القياس">22.1.3 طباعة معلومات القياس</h3>
<p>ينتج الأمر <code>ocamlprof</code> قائمة بالشيفرة المصدرية لوحدات البرنامج مدخلًا فيها أعداد التنفيذ على هيئة تعليقات. فمثلًا،</p>
<pre><code class="language-text">        ocamlprof foo.ml
</code></pre>
<p>يطبع الشيفرة المصدرية لوحدة <code>foo</code>، مصحوبة بتعليقات تبيّن عدد مرات استدعاء الدوال في هذه الوحدة. وبطبيعة الحال، تكون هذه المعلومات دقيقة فقط إذا لم يُعدَّل ملف المصدر بعد ترجمته.</p>
<p>تعرّف <code>ocamlprof</code> الخيارات التالية:</p>
<p><strong><code>-args</code> <em>filename</em></strong></p>
<p>يقرأ وسائط سطر أوامر إضافية منتهية بمحرف سطر جديد من <em>filename</em>.</p>
<p><strong><code>-args0</code> <em>filename</em></strong></p>
<p>يقرأ وسائط سطر أوامر إضافية منتهية بمحرف فارغ من <em>filename</em>.</p>
<p><strong><code>-f</code> <em>dumpfile</em></strong></p>
<p>يحدّد ملف تصريف بديلًا لمعلومات القياس التي ستُقرأ.</p>
<p><strong><code>-F</code> <em>string</em></strong></p>
<p>يحدّد سلسلة إضافية تُخرَج مع معلومات القياس. فبشكل افتراضي، يعلّق <code>ocamlprof</code> على البرامج بتعليقات من الشكل <code>(* *n* *)</code> حيث <em>n</em> قيمة العدّاد عند نقطة قياس. ومع الخيار <code>-F *s*</code> يصير التعليق <code>(* *sn* *)</code>.</p>
<p><strong><code>-impl</code> <em>filename</em></strong></p>
<p>يعالج الملف <em>filename</em> ملفًا للتنفيذ، حتى إذا لم تكن امتدادته <code>.ml</code>.</p>
<p><strong><code>-intf</code> <em>filename</em></strong></p>
<p>يعالج الملف <em>filename</em> ملفًا للواجهة، حتى إذا لم تكن امتدادته <code>.mli</code>.</p>
<p><strong><code>-keywords</code> <em>version+list</em></strong></p>
<p>يضبط الكلمات المفتاحية وفق مواصفة <em>version+list</em>.</p>
<p><strong><code>-version</code></strong></p>
<p>يطبع سلسلة الإصدار ثم يخرج.</p>
<p><strong><code>-vnum</code></strong></p>
<p>يطبع رقم الإصدار المختصر ثم يخرج.</p>
<p><strong><code>-help</code> أو <code>--help</code></strong></p>
<p>يعرض ملخّصًا قصيرًا للاستعمال ثم يخرج.</p>
<p>لا يسجّل القياس بـ <code>ocamlprof</code> إلا أعداد التنفيذ، لا الزمن الفعلي المستغرق داخل كل دالة. ولا توجد حاليًا طريقة لقياس الزمن في برامج الشيفرة البايتية التي ينتجها <code>ocamlc</code>.</p>
<h2 id="222-قياس-الزمن-باستعمال-linux-perf">22.2 قياس الزمن باستعمال Linux perf</h2>
<p>يشرح هذا القسم كيفية استعمال <code>perf</code> لقياس أداء برامج OCaml. وأحداث أداء Linux (المعروفة بـ <code>perf</code>) مجموعة أدوات لمراقبة الأداء مضمّنة في نواة Linux. وأهمّ ما يُغطّى هنا تسجيل الأحداث باستعمال <code>perf-record(1)</code>، وعرض الأحداث المسجّلة بصريًا باستعمال <code>perf-report(1)</code>. ولـ <code>perf</code> ميزات إضافية كثيرة للقياس والعرض المرئي؛ ولمزيد من التوثيق الشامل، انظر صفحة الدليل <code>perf(1)</code> أو <a href="https://perfwiki.github.io/main/">ويكي <code>perf</code></a> أو <a href="https://www.brendangregg.com/perf.html">مدوّنة برندان غريغ</a>.</p>
<h3 id="2221-خلفية">22.2.1 خلفية</h3>
<p>يُجرى قياس الزمن عادةً بأخذ عيّنات من رسم استدعاءات المعالج على فترات متقاربة، لجمع إحصاءات عن مسارات الشيفرة التي تستهلك موارد المعالج. ولمعالجة شيفرة OCaml، يحتاج <code>perf</code> إلى فهم رسم استدعاءات برنامج OCaml. ويدعم <code>perf</code> عدّة خيارات لتسجيل رسوم الاستدعاءات:</p>
<ul>
<li>
<p>مؤشرات الإطار (Frame Pointers)، وهي الخيار الافتراضي.</p>
</li>
<li>
<p>معلومات إطار الاستدعاء (CFI) في DWARF.</p>
</li>
<li>
<p>سجل الفرع الأخير في العتاد (LBR).</p>
</li>
</ul>
<p>تعتمد رسوم الاستدعاءات المبنية على مؤشر الإطار على اصطلاح يحمل فيه سجل يُسمّى مؤشر الإطار عنوان بداية إطار المكدّس، وتُخزَّن القيم السابقة لمؤشر الإطار عند إزاحة معروفة من مؤشر الإطار الحالي. وبهذه المعلومات يمكن حساب رسم استدعاءات الدالة الحالية اعتمادًا على المكدّس الحالي وحده، وهي عملية تُسمّى فكّ المكدّس (unwinding). وعلى AMD64 يُستعمل السجل <code>$rbp</code> لتخزين مؤشر الإطار،
بينما تستعمل ARM64 السجل <code>$x29</code>.
أدخلت OCaml 5 المكدّسات غير المتجاورة في إطار تنفيذ الآثار؛ انظر <a href="https://dl.acm.org/doi/10.1145/3453483.3454039">Retrofitting effect handlers onto OCaml</a> (القسم 5.5). وبسبب هذا التفصيل في التنفيذ، تعمل مؤشرات الإطار على نحو أفضل مع طبيعة النسخ في <code>perf</code>.</p>
<p>تستعمل رسوم الاستدعاءات المبنية على DWARF معلومات CFI في DWARF لفكّ المكدّس. لكن هذا يتفاعل تفاعلًا رديئًا مع طبيعة النسخ في <code>perf</code>، فيؤدّي غالبًا إلى رسوم استدعاءات مبتورة حيث لا يكون <code>perf</code> قد نسخ ما يكفي من المكدّس. كما ينتج ملفّات تتبّع أكبر تكون أكثر كلفة في الالتقاط والمعالجة. وأخيرًا، يقتضي تضمين معلومات تنقيح CFI في برنامجك، ما ينتج ملفّات تنفيذية أكبر قليلًا.</p>
<p>ويستعمل سجل الفرع الأخير في العتاد (LBR) طريقة يوفّرها المعالج لتسجيل رسوم الاستدعاءات. ويحدّه محدودية التوفّر (فهو موجود في بعض معالجات Intel فقط) ومحدودية عمق المكدّس (16 في Haswell و32 منذ Skylake).</p>
<p>ومن بين هذه الخيارات، يُوصى بمؤشرات الإطار لقياس شيفرة OCaml، ولها المزايا التالية:</p>
<ul>
<li>
<p>حساب فكّ المكدّس أسرع.</p>
</li>
<li>
<p>بيانات التتبّع الناتجة أصغر.</p>
</li>
<li>
<p>توفّر مؤشرات الإطار رسوم استدعاءات أكمل، لا سيّما عند استعمالها مع توزيعة Linux تدعمها.</p>
</li>
<li>
<p>تعمل مؤشرات الإطار على نحو أفضل مع طبيعة النسخ في <code>perf</code> ومع المكدّسات غير المتجاورة في OCaml 5.</p>
</li>
</ul>
<h3 id="2222-الترجمة-من-أجل-قياس-الأداء">22.2.2 الترجمة من أجل قياس الأداء</h3>
<p>تعتمد عملية ترجمة ملف تنفيذي لقياس الزمن على إصدار OCaml. ففي إصدارات OCaml 4.14 وما قبلها، يمكن استعمال مؤشرات الإطار أو DWARF، أما في OCaml 5.0 وما بعده فيُوصى بتمكين مؤشرات الإطار.</p>
<p>ولتمكين مؤشرات الإطار، اضبط إعداد المترجم بـ <code>--enable-frame-pointers</code>. أو بدلًا من ذلك، يمكنك تثبيت تبديل opam مع تمكين مؤشرات الإطار كما يلي:</p>
<pre><code class="language-text">        opam switch create &lt;YOUR-SWITCH-NAME-HERE&gt; ocaml-option-fp
</code></pre>
<p>دعم مؤشرات الإطار في OCaml متاح على معمارية AMD64 في Linux بدءًا من OCaml 4.12، وعلى macOS بدءًا من OCaml 5.3. ومعمارية ARM64 مدعومة في Linux وmacOS بدءًا من OCaml 5.4، بينما المعماريات الأخرى من المستوى الأول (POWER وRISC-V وs390x) غير مدعومة حاليًا.</p>
<h3 id="2223-قياس-تنفيذ-برنامج">22.2.3 قياس تنفيذ برنامج</h3>
<p>الأمر الأساسي في <code>perf</code> لقياس الأداء هو:</p>
<pre><code class="language-text">        perf record -F 99 --call-graph fp PROGRAM
</code></pre>
<p>يضبط الخيار <code>-F 99</code> معدّل أخذ العيّنات في <code>perf</code> عند 99 هرتز، فيقلّل توليد البيانات المفرط في التشغيلات الطويلة ويقلّل التداخل مع الأنشطة الدورية الأخرى. ويوجّه <code>--call-graph fp</code> الأمر <code>perf</code> إلى استعمال مؤشرات الإطار للحصول على رسم الاستدعاءات، ويتبعه الملفّ التنفيذي لـ OCaml الذي تريد قياسه. وينشئ هذا الأمر ملفًا اسمه <code>perf.data</code> في الدليل الحالي. وبدلًا من ذلك استعمل <code>--output</code> لاختيار اسم ملف أكثر دلالة.</p>
<p>يعمل الأمر <code>perf record</code> بنسخ مقطع من مكدّس الاستدعاءات عند كل عيّنة وتسجيل هذه البيانات في ملف <code>perf.data</code>. ثم يمكن معالجة هذه العيّنات بعد التسجيل باستعمال <code>perf report</code> لإعادة بناء مكدّس استدعاءات البرنامج المقيس عند كل عيّنة.</p>
<p>ويستعمل <code>perf</code> الرموز الموجودة في الملف التنفيذي لـ OCaml، لذا يفيد فهم مخطط تشويه الأسماء في OCaml لربط الأسماء بمواضع الشيفرة المصدرية.</p>
<p>يستعمل OCaml 5.3 وما بعده مخطط تشويه بالأسماء من الشكل <code>caml&lt;MODULE_NAME&gt;.&lt;FUNCTION_NAME&gt;_&lt;NNN&gt;</code> في Linux، حيث <code>NNN</code> عدد يُولَّد عشوائيًا. وفي macOS ومنفذ Windows MSVC (المُعاد في OCaml 5.3)، يستعمل المخطط <code>$</code> فاصلًا.
قبل OCaml 5.1.1 كان المخطط يستعمل خطّي سفلي مزدوجين فاصلًا، مثل <code>caml&lt;MODULE_NAME&gt;__&lt;FUNCTION_NAME&gt;_&lt;NNN&gt;</code>. وجميع الصيغ مدعومة في <code>perf</code> في Linux.</p>
<p>خذ البرنامج التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* fib.ml *)</span>
<span class="hljs-keyword">module</span> <span class="hljs-type">Compute</span> = <span class="hljs-keyword">struct</span>
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fib n =
    <span class="hljs-keyword">if</span> n = <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> n = <span class="hljs-number">1</span> <span class="hljs-keyword">then</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">else</span> fib (n-<span class="hljs-number">1</span>) + fib (n-<span class="hljs-number">2</span>)
<span class="hljs-keyword">end</span>

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> r = <span class="hljs-type">Compute</span>.fib <span class="hljs-number">20</span> <span class="hljs-keyword">in</span>
  <span class="hljs-type">Printf</span>.printf <span class="hljs-string">&quot;fib(20) = %d&quot;</span> r

<span class="hljs-keyword">let</span> _ = main <span class="hljs-literal">()</span>
</code></pre>
<p>ينتج هذا البرنامج الاسمين <code>camlFib.main_274</code> للدالة <code>main</code> و<code>camlFib.fib_271</code> للدالة <code>fib</code> في الوحدة <code>Compute</code>.</p>
<h3 id="2224-عرض-معلومات-القياس">22.2.4 عرض معلومات القياس</h3>
<p>يلخّص الأمر <code>perf report</code> البيانات في ملف <code>perf.data</code>. والأمر الأساسي في <code>perf report</code> هو:</p>
<pre><code class="language-text">        perf report -f --no-children -i perf.data
</code></pre>
<p>يوفّر هذا الأمر واجهة تفاعلية تنقّل فيها بين رسوم الاستدعاءات المتراكمة وتختار الدوال والخيوط للحصول على معلومات مفصّلة. وبدلًا من ذلك، يُخرج <code>--stdio</code> بيانات مشابهة في تقرير نصّي يُكتب إلى الخَرْج القياسي. ولاحظ أنه إذا ظهرت آثار المكدّس مبتورة، فقد يكون السبب أن البرمجيات لم تُترجم مع تمكين دعم مؤشرات الإطار.</p>
<p>خذ البرنامج التالي الذي يحسب دالة تاك:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> (x,y,z) =
  <span class="hljs-keyword">try</span>
    <span class="hljs-keyword">let</span> x = int_of_string <span class="hljs-type">Sys</span>.argv.(<span class="hljs-number">1</span>) <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">let</span> y = int_of_string <span class="hljs-type">Sys</span>.argv.(<span class="hljs-number">2</span>) <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">let</span> z = int_of_string <span class="hljs-type">Sys</span>.argv.(<span class="hljs-number">3</span>) <span class="hljs-keyword">in</span>
    (x,y,z)
  <span class="hljs-keyword">with</span> _ -&gt; (<span class="hljs-number">18</span>,<span class="hljs-number">12</span>,<span class="hljs-number">6</span>)

<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> tak x y z =
  <span class="hljs-keyword">if</span> x &gt; y <span class="hljs-keyword">then</span>
    tak (tak (x-<span class="hljs-number">1</span>) y z) (tak (y-<span class="hljs-number">1</span>) z x) (tak (z-<span class="hljs-number">1</span>) x y)
  <span class="hljs-keyword">else</span> z

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> r = tak x y z <span class="hljs-keyword">in</span>
  <span class="hljs-type">Printf</span>.printf <span class="hljs-string">&quot;tak %d %d %d = %d\\n&quot;</span> x y z r

<span class="hljs-keyword">let</span> _ = main <span class="hljs-literal">()</span>
</code></pre>
<p>قد يشبه تقرير <code>perf</code> لهذا البرنامج ما يلي.</p>
<pre><code class="language-text">Samples: 809  of event &#x27;cycles&#x27;, Event count (approx.): 24701952617
  Overhead  Command     Shared Object      Symbol
-  100.00%  tak-fp.exe  tak-fp.exe         [.] Tak.tak_402
     Tak.tak_402
     Tak.tak_402
   + Tak.tak_402
     0.00%  tak-fp.exe  [kernel.kallsyms]  [k] 0xffffb9a5ff79d854
     0.00%  perf-exec   [kernel.kallsyms]  [k] 0xffffb9a5ff719c34
</code></pre>
<p>وفي برنامج أكثر تشويقًا ينفّذ حلّال سودوكو بخوارزمية التراجع لدى نورفيغ، قد يشبه الخَرْج ما يلي.</p>
<pre><code class="language-text">Samples: 7K of event &#x27;cycles:P&#x27;, Event count (approx.): 141874642467
  Overhead  Command          Shared Object      Symbol
-   35.90%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig._pow_747
   - 35.29% Sudoku_norvig._pow_747
      + 17.70% Sudoku_norvig.eliminate_value_760
      + 15.74% Sudoku_norvig._pow_747
      + 1.03% Sudoku_norvig.fun_1435
     0.61% Sudoku_norvig.eliminate_value_760
-   12.99%  sudoku_norvig.e  sudoku_norvig.exe  [.] BatList.findnext_1543
   - 12.00% BatList.findnext_1543
      - 11.71% BatList.find_all_1539
         + 8.07% Sudoku_norvig.fun_1421
         + 2.73% Sudoku_norvig.eliminate_948
         + 0.90% Sudoku_norvig.assign_949
-   10.63%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig.eliminate_value_760
   + 8.29% Sudoku_norvig.eliminate_value_760
   + 1.93% Sudoku_norvig._pow_747
+    9.50%  sudoku_norvig.e  [kernel.kallsyms]  [k] asm_exc_nmi
+    7.24%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig.fun_1435
+    5.06%  sudoku_norvig.e  sudoku_norvig.exe  [.] caml_modify
+    3.10%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig.fun_1360
+    2.11%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig.eliminate_948
+    2.00%  sudoku_norvig.e  sudoku_norvig.exe  [.] Stdlib.List.iter_366
+    1.54%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig.fun_1421
+    1.47%  sudoku_norvig.e  sudoku_norvig.exe  [.] caml_apply2
+    1.42%  sudoku_norvig.e  sudoku_norvig.exe  [.] BatList.find_all_1539
+    1.20%  sudoku_norvig.e  sudoku_norvig.exe  [.] Sudoku_norvig.fun_1366
+    1.09%  sudoku_norvig.e  sudoku_norvig.exe  [.] Stdlib.List.fold_left_380
</code></pre>
<p>ولاحظ أن لهذا التنفيذ بوضوح بعض التحسينات الممكنة في <code>_pow_747</code>، وهي دالة عودية تحسب قوّة العدد 2، وأن أجزاء من زمن تشغيل OCaml مثل <code>caml_modify</code> حاضرة.</p>
<p>ويمكن أيضًا عرض بيانات القياس رسومًا لهبية (Flame Graphs) تبرز مسارات الشيفرة الأكثر تكرارًا في آثار المكدّس. والسكربتات الأصلية <code>stackcollapse-perf.pl</code> و<code>flamegraph.pl</code> تجدها في صفحة <a href="https://www.brendangregg.com/flamegraphs.html">Flame Graphs</a> لبرندان غريغ، وهي تعمل كما يلي:</p>
<pre><code class="language-text">git clone https://github.com/brendangregg/FlameGraph
cd FlameGraph

# Collect the results into perf.data
perf record -F 99 --call-graph fp PROGRAM
perf script -i perf.data | ./stackcollapse-perf.pl out.folded
flamegraph.pl out.folded &gt; flamegraph.svg ## Create the FlameGraph svg
</code></pre>
<p>وبدلًا من ذلك، <a href="https://github.com/jonhoo/inferno">inferno</a> منفذ بلغة Rust لأدوات الرسوم اللهبية، يعمل بطريقة مشابهة وهو أسرع في معالجة ملفّات <code>perf</code> الكبيرة.</p>
<pre><code class="language-text">cargo install inferno

# Collect the results into perf.data
perf script -i perf.data | inferno-collapse-perf &gt; stacks.folded
cat stacks.folded | inferno-flamegraph &gt; flamegraph.svg
</code></pre>
<p>تستعمل بعض أدوات <code>perf</code> (مثل <code>perf-report(1)</code> و<code>perf-annotate(1)</code>) معلومات تنقيح DWARF لربط الرموز بمواضع الشيفرة المصدرية. فإن احتجت هذه الميزات، وجب أن يُترجم البرنامج وتبعياته بالخيار <code>-g</code> لتضمين معلومات التنقيح في الملف التنفيذي.</p>
<p>ويمكن أيضًا معالجة بيانات القياس الملتقَطة باستعمال <code>perf script</code> بطرق مختلفة، أو بأدوات على الإنترنت مثل <a href="https://www.speedscope.app">speedscope.app</a> و<a href="https://profiler.firefox.com/">profiler.firefox.com</a>، أو أي أداة أخرى تدعم بيانات بصيغة <code>perf</code>.</p>
<h3 id="2225-خاتمة">22.2.5 خاتمة</h3>
<p>لقياس الزمن في الشيفرة الأصلية، يُوصى بأدوات قياسية مثل <code>perf</code> وeBPF وDTrace أو Instruments (في macOS). وكثيرًا ما تكون الترجمة مع تمكين مؤشرات الإطار ضرورية لعمل هذه الأدوات على نحو فعّال. ولم يعد القياس بـ <code>gprof</code> مدعومًا.</p>
<p>وقد يؤثّر تمكين مؤشرات الإطار في الأداء على بعض المعماريات (قيس تأثيره بما يصل إلى 10% على x86_64). ويُشجَّع مستخدمو هذه الميزة على قياس تطبيقاتهم بأنفسهم لتقييم هذا التأثير.</p>
<h2 id="223-قياس-الزمن-باستعمال-macos-instruments">22.3 قياس الزمن باستعمال macOS Instruments</h2>
<p>Instruments محلّل أداء تطبيقات وعارض مرئي يوفّره XCode في macOS. وهو يتضمّن أداة سطر أوامر <code>xctrace</code> يمكنها التقاط معلومات قياس الزمن عن برامج OCaml، كما توجد تطبيقة رسومية لتشغيل القياسات وعرضها. ولا نغطّي هنا إلا التقاط قياسات الزمن بـ <code>xctrace</code>؛ ولمزيد من المعلومات عن Instruments راجع توثيق Apple.</p>
<p>تنطبق المتطلّبات المسبقة نفسها لقياس الزمن بـ macOS Instruments كما في <code>perf</code> في Linux؛ راجع «خلفية» (22.2.1) من القسم السابق لشرح رسوم الاستدعاءات، واتبع الإعداد في «الترجمة من أجل قياس الأداء» (22.2.2).</p>
<p>والأمر الأساسي في <code>xctrace</code> لقياس الزمن هو:</p>
<pre><code class="language-text">xcrun xctrace record --output . --template &quot;Time Profiler&quot; \\
  --target-stdout - --launch -- PROGRAM
</code></pre>
<p>ويختار الخيار <code>--template &quot;Time Profiler&quot;</code> قالبًا محدّدًا مسبقًا لقياس الزمن، فينشئ ملف تتبّع بامتداد <code>.trace</code> يمكن فتحه بـ Instruments. واستعمل <code>--output</code> لاختيار اسم ملف التتبّع؛ فبشكل افتراضي ينشئ <code>xctrace</code> ملفًا جديدًا في كل تشغيل بدلًا من الكتابة على الملف الموجود.</p>
<p>ويمكن فتح الملف الناتج بـ Instruments لعرض القياس، وقد يمكن توليد رسوم لهبية باستعمال <a href="https://github.com/jonhoo/inferno">inferno</a> أو السكربتات من <a href="https://github.com/brendangregg/FlameGraph">https://github.com/brendangregg/FlameGraph</a>.</p>
<h5>ملاحظة</h5>
<p>تحتاج Instruments أحيانًا إلى استحقاقات (entitlements) تُضاف إلى ملف OCaml التنفيذي قبل أن يتمكّن من قياسه. ويظهر ذلك عادةً فشلًا في إطلاق العملية أو خطأ في الأذونات. وللتحايل على هذه المشكلة، نفّذ الأمر التالي مع تعويض <code>PROGRAM</code> بالبرنامج المطلوب تتبّعه.</p>
<pre><code class="language-text">$ codesign -s - -v -f --entitlements =(echo -n
&#x27;&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
 &lt;!DOCTYPE plist PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot;
   &quot;https://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;\\&gt;
 &lt;plist version=&quot;1.0&quot;&gt;
    &lt;dict&gt;
        &lt;key&gt;com.apple.security.get-task-allow&lt;/key&gt;
        &lt;true/&gt;
    &lt;/dict&gt;
 &lt;/plist&gt;&#x27;) PROGRAM
</code></pre>
<p>لمزيد من التفاصيل عن الاستحقاقات وcodesign راجع توثيق Apple.</p>
<h2 id="224-المصطلحات">22.4 المصطلحات</h2>
<p>يُستعمل في هذا الفصل من الدليل المصطلح التالي.</p>
<ul>
<li>
<p><strong>رسم الاستدعاءات</strong> سلسلة استدعاءات الدوال التي أدّت إلى الدالة الحالية (ويُسمّى أيضًا مكدّس الاستدعاءات).</p>
</li>
<li>
<p><strong>فكّ المكدّس</strong> عملية الصعود في مكدّس الاستدعاءات (وتُسمّى أيضًا فكّ مكدّس الاستدعاءات).</p>
</li>
<li>
<p><strong>إطار المكدّس</strong> الجزء من المكدّس المخصّص لاستدعاء دالة واحدة (ويُسمّى أيضًا إطار التنشيط أو سجل التنشيط أو الإطار ببساطة).</p>
</li>
</ul>
`,d={book:e,chapter:o,chapterTitle:n,slug:p,title:s,headings:c,html:a};export{e as book,o as chapter,n as chapterTitle,d as default,c as headings,a as html,p as slug,s as title};
