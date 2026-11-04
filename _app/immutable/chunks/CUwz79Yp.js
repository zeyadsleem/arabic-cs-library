const s="ocaml-manual",a="ch10",n="نموذج الذاكرة: الأجزاء الصعبة",e="index",c="نموذج الذاكرة: الأجزاء الصعبة",l=[{depth:2,id:"101-لماذا-ذاكرة-ضعيفة-الاتساق",text:"10.1 لماذا ذاكرة ضعيفة الاتساق؟"},{depth:3,id:"1011-تحسينات-المترجم",text:"10.1.1 تحسينات المترجم"},{depth:3,id:"1012-تحسينات-العتاد",text:"10.1.2 تحسينات العتاد"},{depth:2,id:"102-خلو-البرنامج-من-تسابقات-البيانات-يستلزم-الاتساق-التتابعي",text:"10.2 خلوّ البرنامج من تسابقات البيانات يستلزم الاتساق التتابعي"},{depth:3,id:"1021-مواقع-الذاكرة",text:"10.2.1 مواقع الذاكرة"},{depth:3,id:"1022-علاقة-الحدوث-قبل",text:"10.2.2 علاقة الحدوث-قبل"},{depth:3,id:"1023-تسابق-البيانات",text:"10.2.3 تسابق البيانات"},{depth:3,id:"1024-drf-sc",text:"10.2.4 DRF-SC"},{depth:2,id:"103-الاستدلال-باستخدام-drf-sc",text:"10.3 الاستدلال باستخدام DRF-SC"},{depth:2,id:"104-حرية-تسابق-البيانات-المحلية",text:"10.4 حرية تسابق البيانات المحلية"},{depth:2,id:"105-رؤية-تشغيلية-لنموذج-الذاكرة",text:"10.5 رؤية تشغيلية لنموذج الذاكرة"},{depth:3,id:"1051-المواقع-غير-الذرية",text:"10.5.1 المواقع غير الذرّية"},{depth:3,id:"1052-النطاقات",text:"10.5.2 النطاقات"},{depth:3,id:"1053-الوصولات-غير-الذرية",text:"10.5.3 الوصولات غير الذرّية"},{depth:3,id:"1054-الوصولات-الذرية",text:"10.5.4 الوصولات الذرّية"},{depth:3,id:"1055-الاستدلال-بالدلالة",text:"10.5.5 الاستدلال بالدلالة"},{depth:2,id:"106-عمليات-غير-مطابقة",text:"10.6 عمليات غير مطابقة"}],p=`<h1>الفصل 10: نموذج الذاكرة: الأجزاء الصعبة</h1>
<p>يصف هذا الفصل تفاصيل نموذج الذاكرة المرخي في OCaml. يبيّن نموذج الذاكرة المرخي القيم التي يُسمح لبرنامج OCaml بمشاهدتها عند قراءة موقع من الذاكرة. وإن كنت مهتمًّا بالبرمجة المتوازية عالية المستوى في OCaml، فراجع الفصل 9 المخصّص للبرمجة المتوازية.</p>
<p>يستهدف هذا الفصل الخبراء الذين يرغبون في فهم تفاصيل نموذج الذاكرة في OCaml من منظور ممارس. أمّا التعريف الصوري لنموذج الذاكرة في OCaml وضماناته والترجمة إلى نماذج ذاكرة العتاد، فيجدها القارئ في ورقة PLDI 2018 بعنوان <a href="https://doi.org/10.1145/3192366.3192421">Bounding Data Races in Space and Time</a>. ونموذج الذاكرة المعروض في هذا الفصل امتداد للنموذج الوارد في تلك الورقة. ويغطّي هذا الفصل أيضًا بعض الجوانب العملية لنموذج الذاكرة التي لا تتناولها الورقة.</p>
<h2 id="101-لماذا-ذاكرة-ضعيفة-الاتساق">10.1 لماذا ذاكرة ضعيفة الاتساق؟</h2>
<p>أبسط نموذج ذاكرة يمكن أن نمنحه لبرامجنا هو الاتساق التتابعي. وفي ظلّ الاتساق التتابعي، يمكن تفسير القيم التي يلاحظها البرنامج عبر تشابك ما لعمليات نطاقات مختلفة في البرنامج. لننظر مثلًا إلى البرنامج التالي الذي ينفّذ فيه نطاقان <code>d1</code> و<code>d2</code> بالتوازي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> d1 a b =
  <span class="hljs-keyword">let</span> r1 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = !b <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r3 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  (r1, r2, r3)

<span class="hljs-keyword">let</span> d2 b = b := <span class="hljs-number">0</span>

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> a = <span class="hljs-built_in">ref</span> <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> b = <span class="hljs-built_in">ref</span> <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> h = <span class="hljs-type">Domain</span>.spawn (<span class="hljs-keyword">fun</span> _ -&gt;
    <span class="hljs-keyword">let</span> r1, r2, r3 = d1 a b <span class="hljs-keyword">in</span>
    <span class="hljs-type">Printf</span>.printf <span class="hljs-string">&quot;r1 = %d, r2 = %d, r3 = %d\\n&quot;</span> r1 r2 r3)
  <span class="hljs-keyword">in</span>
  d2 b;
  <span class="hljs-type">Domain</span>.join h
</code></pre>
<p>الخلية المرجعية <code>a</code> و<code>b</code> قيمتهما الأولية <code>1</code>. ويمكن للمستخدم أن يلاحظ <code>r1 = 2, r2 = 0, r3 = 2</code> إذا وقعت الكتابة في <code>b</code> داخل <code>d2</code> قبل قراءة <code>b</code> داخل <code>d1</code>. وهنا يمكن تفسير السلوك الملاحَظ بدلالة تشابك العمليات الصادرة من نطاقات مختلفة.</p>
<p>لنفترض الآن أنّ <code>a</code> و<code>b</code> اسمان لموقع واحد.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> d1 a b =
  <span class="hljs-keyword">let</span> r1 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = !b <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r3 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  (r1, r2, r3)

<span class="hljs-keyword">let</span> d2 b = b := <span class="hljs-number">0</span>

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> ab = <span class="hljs-built_in">ref</span> <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> h = <span class="hljs-type">Domain</span>.spawn (<span class="hljs-keyword">fun</span> _ -&gt;
    <span class="hljs-keyword">let</span> r1, r2, r3 = d1 ab ab <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">assert</span> (not (r1 = <span class="hljs-number">2</span> &amp;&amp; r2 = <span class="hljs-number">0</span> &amp;&amp; r3 = <span class="hljs-number">2</span>)))
  <span class="hljs-keyword">in</span>
  d2 ab;
  <span class="hljs-type">Domain</span>.join h
</code></pre>
<p>في البرنامج أعلاه، تشير المتغيّرات <code>ab</code> و<code>a</code> و<code>b</code> إلى الخلية المرجعية نفسها. والمرء يتوقّع ألّا تفشل العبارة التأكيدية في الدالة الرئيسة أبدًا. والحجّة أنّ <code>r2</code> إذا كانت <code>0</code>، فالكتابة في <code>d2</code> وقعت قبل قراءة <code>b</code> في <code>d1</code>. وبما أنّ <code>a</code> و<code>b</code> اسمان لموقع واحد، ينبغي أن تعيد القراءة الثانية لـ<code>a</code> في <code>d1</code> القيمة <code>0</code> أيضًا.</p>
<h3 id="1011-تحسينات-المترجم">10.1.1 تحسينات المترجم</h3>
<p>للمفاجأة، قد تفشل هذه العبارة التأكيدية في OCaml بسبب تحسينات المترجم. يلاحظ مترجم OCaml التعبير الجزئي المشترك <code>!a * 2</code> في <code>d1</code> فيحسن البرنامج إلى:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> d1 a b =
  <span class="hljs-keyword">let</span> r1 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = !b <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r3 = r1 <span class="hljs-keyword">in</span> <span class="hljs-comment">(* CSE: !a * 2 ==&gt; r1 *)</span>
  (r1, r2, r3)

<span class="hljs-keyword">let</span> d2 b = b := <span class="hljs-number">0</span>

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> ab = <span class="hljs-built_in">ref</span> <span class="hljs-number">1</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> h = <span class="hljs-type">Domain</span>.spawn (<span class="hljs-keyword">fun</span> _ -&gt;
    <span class="hljs-keyword">let</span> r1, r2, r3 = d1 ab ab <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">assert</span> (not (r1 = <span class="hljs-number">2</span> &amp;&amp; r2 = <span class="hljs-number">0</span> &amp;&amp; r3 = <span class="hljs-number">2</span>)))
  <span class="hljs-keyword">in</span>
  d2 ab;
  <span class="hljs-type">Domain</span>.join h
</code></pre>
<p>يُعرف هذا التحسين بحذف التعابير الجزئية المشتركة (CSE). ومثل هذه التحسينات سليمة وضرورية للأداء الجيد، ولا تغيّر المعنى التتابعي للبرنامج. غير أنّ حذف التعابير الجزئية المشتركة يخرّب الاستدلال التتابعي.</p>
<p>في البرنامج المحسَّن أعلاه، حتى لو وقعت الكتابة في <code>b</code> داخل <code>d2</code> بين القراءتين الأولى والثانية في <code>d1</code>، سيلاحظ البرنامج القيمة <code>2</code> في <code>r3</code>، فتفشل العبارة التأكيدية. والسلوك الملاحَظ لا يمكن تفسيره بتشابك العمليات الصادرة من نطاقات مختلفة في البرنامج المصدر. ولذلك يقال إنّ حذف التعابير الجزئية المشتركة غير سليم في ظلّ الاتساق التتابعي.</p>
<p>من طرائق تفسير السلوك الملاحَظ أن نتصوّر أنّ العمليات المنفَّذة في نطاق ما قد أُعيد ترتيبها. فلو أُعيد ترتيب القراءتين الثانية والثالثة في <code>d1</code>،</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> d1 a b =
  <span class="hljs-keyword">let</span> r1 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r3 = !a * <span class="hljs-number">2</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = !b <span class="hljs-keyword">in</span>
  (r1, r2, r3)
</code></pre>
<p>أمكننا عندئذ تفسير السلوك الملاحَظ <code>(2,0,2)</code> الذي يعيده <code>d1</code>.</p>
<h3 id="1012-تحسينات-العتاد">10.1.2 تحسينات العتاد</h3>
<p>المصدر الآخر لإعادة الترتيب هو العتاد. فمعماريات العتاد الحديثة ذات هرميات مخابئ معقّدة بمستويات متعدّدة من المخابئ. ومع أنّ تماسك المخابئ يضمن أن تحترم القراءات والكتابات في موقع ذاكرة واحد الاتساق التتابعي، فإنّ الضمانات المتعلّقة بالبرامج التي تعمل على مواقع ذاكرة مختلفة أضعف بكثير. لننظر إلى البرنامج التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>
<span class="hljs-keyword">and</span> b = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>

<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> =
  a := <span class="hljs-number">1</span>;
  !b

<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> =
  b := <span class="hljs-number">1</span>;
  !a

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> h = <span class="hljs-type">Domain</span>.spawn d2 <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r1 = d1 <span class="hljs-literal">()</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = <span class="hljs-type">Domain</span>.join h <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">assert</span> (not (r1 = <span class="hljs-number">0</span> &amp;&amp; r2 = <span class="hljs-number">0</span>))
</code></pre>
<p>في ظلّ الاتساق التتابعي، لا نتوقّع أن تفشل العبارة التأكيدية أبدًا. غير أنّ الكتابات المنفَّذة في نواة معالجة لا تُنشر فورًا إلى سائر النوى، حتى على معمارية x86 التي تقدّم ضمانات أقوى بكثير من ARM. ولأنّ <code>a</code> و<code>b</code> موقعان مختلفان في الذاكرة، قد تشهد قراءتا <code>a</code> و<code>b</code> القيمتين الأوليتين معًا، فتفشل العبارة التأكيدية.</p>
<p>يمكن تفسير هذا السلوك إذا سُمح بإعادة ترتيب تحميل ما قبل مخزن سابق إلى موقع ذاكرة مختلف. وقد يحدث هذا إعادة الترتيب بسبب وجود مخازن كتابة مؤقتة داخل النواة في المعالجات الحديثة. فلكلّ نواة عمليًا مخزن مؤقت بترتيب FIFO للكتابات المعلّقة، تفاديًا للحاجة إلى الانتظار حتى تكتمل الكتابة. وقد تكون الكتابتان في <code>a</code> و<code>b</code> في مخزني الكتابة المؤقتين للنواتين <code>c1</code> و<code>c2</code> اللتين تشغّلان النطاقين <code>d1</code> و<code>d2</code> على التوالي. وعندئذٍ لن ترى قراءتا <code>b</code> و<code>a</code> الجاريتان على النواتين <code>c1</code> و<code>c2</code> على التوالي تلك الكتابتين ما لم تنتشر الكتابات من المخازن إلى الذاكرة الرئيسة.</p>
<h2 id="102-خلو-البرنامج-من-تسابقات-البيانات-يستلزم-الاتساق-التتابعي">10.2 خلوّ البرنامج من تسابقات البيانات يستلزم الاتساق التتابعي</h2>
<p>هدف نموذج الذاكرة المرخي في OCaml أن يصف بدقة أيّ الترتيبات يحفظها برنامج OCaml. فالمترجم والعتاد حرّان في تحسين البرنامج ما داما يحترمان ضمانات الترتيب في نموذج الذاكرة. ومع أنّ البرمجة المباشرة في ظلّ نموذج الذاكرة المرخي صعبة، فإنّ نموذج الذاكرة يبيّن أيضًا الشروط التي لا يُظهر فيها البرنامج إلا سلوكيات متسقة تتابعيًا. تُعرف هذه الضمانة بأنها <em>خلوّ البرنامج من تسابقات البيانات يستلزم الاتساق التتابعي</em> (DRF-SC). وسنصف هذه الضمانة في هذا القسم. وللقيام بذلك، نحتاج أولًا إلى جملة من التعريفات.</p>
<h3 id="1021-مواقع-الذاكرة">10.2.1 مواقع الذاكرة</h3>
<p>يصنّف OCaml مواقع الذاكرة إلى مواقع <em>ذرّية</em> و<em>غير ذرّية</em>. فالخلايا المرجعية وحقول المصفوفات وحقول السجلات القابلة للتغيير مواقع ذاكرة غير ذرّية. والأجسام غير القابلة للتغيير مواقع غير ذرّية لها كتابة تهيئة واحدة ولا تحديثات بعدها. أمّا مواقع الذاكرة الذرّية فهي تلك التي تُنشأ باستعمال وحدة <code>Atomic</code>.</p>
<h3 id="1022-علاقة-الحدوث-قبل">10.2.2 علاقة الحدوث-قبل</h3>
<p>لنتخيّل أنّ برامج OCaml تنفّذها آلة مجرّدة تنفّذ فعلًا واحدًا في كل مرة، وتختار عشوائيًا أحد النطاقات المتاحة في كل خطوة. ونصنّف الأفعال صنفين: <em>بين النطاقات</em> و<em>داخل النطاق</em>. فالفعل بين النطاقات هو فعل يمكن ملاحظته والتأثّر به من أفعال نطاقات أخرى. وهناك عدة أفعال بين النطاقات:</p>
<ul>
<li>
<p>قراءات وكتابات المواقع الذرّية وغير الذرّية.</p>
</li>
<li>
<p>توليد النطاقات وضمّها.</p>
</li>
<li>
<p>العمليات على الأقفال (mutexes).</p>
</li>
</ul>
<p>وفي المقابل، لا يمكن ملاحظة الأفعال داخل النطاق ولا أن تؤثّر في تنفيذ نطاقات أخرى. ومن أمثلتها تقييم تعبير حسابي أو نداء دالة. وتتجاهل مواصفة نموذج الذاكرة هذه الأفعال داخل النطاق. وسنستعمل في ما يلي لفظ «فعل» للدلالة على الأفعال بين النطاقات.</p>
<p>تسمّى قائمة الأفعال المرتّبة ترتيبًا كليًا والتي تنفّذها الآلة المجرّدة <em>أثر تنفيذ</em>. وقد يوجد للبرنامج الواحد عدة آثار تنفيذ ممكنة بسبب اللاحتمية.</p>
<p>ولأثر تنفيذ معيّن، نعرّف <em>علاقة الحدوث-قبل</em> غير الانعكاسية والمتعدّية التي تلتقط السببية بين الأفعال في برنامج OCaml. وتُعرَّف علاقة الحدوث-قبل بأنها أصغر علاقة متعدّية تحقّق الخصائص التالية:</p>
<ul>
<li>
<p>نعرّف الترتيب الذي ينفّذ به النطاق أفعاله باسم <em>ترتيب البرنامج</em>. فإذا سبق فعل <code>x</code> فعلًا آخر <code>y</code> في ترتيب البرنامج، سبق <code>x</code> الفعل <code>y</code> في ترتيب الحدوث-قبل.</p>
</li>
<li>
<p>إذا كان <code>x</code> كتابة إلى موقع ذرّي وكان <code>y</code> قراءة أو كتابة لاحقة إلى ذلك الموقع في أثر التنفيذ، سبق <code>x</code> الفعل <code>y</code> في ترتيب الحدوث-قبل. وفي المواقع الذرّية، تُعدّ <code>compare_and_set</code> و<code>fetch_and_add</code> و<code>exchange</code> و<code>incr</code> و<code>decr</code> منفّذة لقراءة وكتابة معًا.</p>
</li>
<li>
<p>إذا كان <code>x</code> هو <code>Domain.spawn f</code> وكان <code>y</code> أول فعل في النطاق المولَّد حديثًا الذي ينفّذ <code>f</code>، سبق <code>x</code> الفعل <code>y</code> في ترتيب الحدوث-قبل.</p>
</li>
<li>
<p>إذا كان <code>x</code> آخر فعل في نطاق <code>d</code> وكان <code>y</code> هو <code>Domain.join d</code>، سبق <code>x</code> الفعل <code>y</code> في ترتيب الحدوث-قبل.</p>
</li>
<li>
<p>إذا كان <code>x</code> عملية فتح قفل (unlock) على قفل ما، وكان <code>y</code> أيّ عملية لاحقة على ذلك القفل في أثر التنفيذ، سبق <code>x</code> الفعل <code>y</code> في ترتيب الحدوث-قبل.</p>
</li>
</ul>
<h3 id="1023-تسابق-البيانات">10.2.3 تسابق البيانات</h3>
<p>في أثر معيّن، يقال إنّ فعلين <em>متعارضان</em> إذا وصولا إلى الموقع غير الذرّي نفسه، وكان أحدهما على الأقل كتابة، ولم يكن أيّ منهما كتابة تهيئة لذلك الموقع.</p>
<p>ونقول إنّ برنامجًا فيه <em>تسابق بيانات</em> إذا وُجد لأحد آثار تنفيذه فعلان متعارضان ولم توجد بين الوصولين المتعارضين علاقة حدوث-قبل. ويقال إنّ البرنامج الخالي من تسابقات البيانات <em>مُزامَن على نحو صحيح</em>.</p>
<h3 id="1024-drf-sc">10.2.4 DRF-SC</h3>
<p><strong>ضمانة DRF-SC:</strong> البرنامج الخالي من تسابقات البيانات لا يُظهر إلا سلوكيات متسقة تتابعيًا.</p>
<p>ضمانة DRF-SC قوية للمبرمجين. فبإمكانهم استعمال <em>الاستدلال التتابعي</em>، أي الاستدلال بتنفيذ فعل بين النطاقات تلو الآخر، لتحديد ما إذا كان برنامجهم فيه تسابق بيانات. وعلى وجه الخصوص، لا يحتاجون إلى الاستدلال على إعادات الترتيب الموصوفة في القسم 10.1 ليعرفوا هل في برنامجهم تسابق بيانات. فمتى قضوا بأنّ برنامجًا معيّنًا خالٍ من تسابقات البيانات، لم يعد عليهم أن يقلقوا بشأن إعادات الترتيب في شيفرتهم.</p>
<h2 id="103-الاستدلال-باستخدام-drf-sc">10.3 الاستدلال باستخدام DRF-SC</h2>
<p>سننظر في هذا القسم إلى أمثلة على استعمال DRF-SC في الاستدلال على البرامج. وسنستعمل فيه الدوال المسماة <code>dN</code> للدلالة على نطاقات تُنفَّذ بالتوازي مع نطاقات أخرى. أي إننا نفترض وجود دالة <code>main</code> تشغّل دوال <code>dN</code> بالتوازي كما يأتي:</p>
<pre><code class="language-text">let main () =
  let h1 = Domain.spawn d1 in
  let h2 = Domain.spawn d2 in
  ...
  ignore @@ Domain.join h1;
  ignore @@ Domain.join h2
</code></pre>
<p>وإليك مثالًا بسيطًا فيه تسابق بيانات:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* Has data race *)</span>
<span class="hljs-keyword">let</span> r = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> = r := <span class="hljs-number">1</span>
<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> = !r
</code></pre>
<p><code>r</code> مرجع غير ذرّي. والنطاقان يتسابقان إلى الوصول إلى المرجع، وفعل <code>d1</code> كتابة. ولمّا لم توجد علاقة حدوث-قبل بين الوصولين المتعارضين، فثمّة تسابق بيانات.</p>
<p>والبرنامجان اللذان رأيناهما في القسم 10.1 فيهما تسابق بيانات. ولا عجب أن يظهرا سلوكيات غير متسقة تتابعيًا.</p>
<p>أمّا الوصول بالتوازي إلى فهارس متباينة في مصفوفة وإلى حقول سجل، فليس تسابق بيانات. فمثلًا،</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* No data race *)</span>
<span class="hljs-keyword">let</span> a = [| <span class="hljs-number">0</span>; <span class="hljs-number">1</span> |]
<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> = a.(<span class="hljs-number">0</span>) &lt;- <span class="hljs-number">42</span>
<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> = a.(<span class="hljs-number">1</span>) &lt;- <span class="hljs-number">42</span>
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-comment">(* No data race *)</span>
<span class="hljs-keyword">type</span> t = {
  <span class="hljs-keyword">mutable</span> a : <span class="hljs-built_in">int</span>;
  <span class="hljs-keyword">mutable</span> b : <span class="hljs-built_in">int</span>
}
<span class="hljs-keyword">let</span> r = {a = <span class="hljs-number">0</span>; b = <span class="hljs-number">1</span>}
<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> = r.a &lt;- <span class="hljs-number">42</span>
<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> = r.b &lt;- <span class="hljs-number">42</span>
</code></pre>
<p>ليس فيهما تسابق بيانات.</p>
<p>والسباقات على المواقع الذرّية لا تؤدّي إلى تسابق بيانات.</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* No data race *)</span>
<span class="hljs-keyword">let</span> r = <span class="hljs-type">Atomic</span>.make <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> = <span class="hljs-type">Atomic</span>.set r <span class="hljs-number">1</span>
<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> = <span class="hljs-type">Atomic</span>.get r
</code></pre>
<h4>تمرير الرسائل</h4>
<p>يمكن استعمال المتغيّرات الذرّية لتنفيذ تواصل غير حاجب بين النطاقات.</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* No data race *)</span>
<span class="hljs-keyword">let</span> msg = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> flag = <span class="hljs-type">Atomic</span>.make <span class="hljs-literal">false</span>
<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> =
  msg := <span class="hljs-number">42</span>; <span class="hljs-comment">(* a *)</span>
  <span class="hljs-type">Atomic</span>.set flag <span class="hljs-literal">true</span> <span class="hljs-comment">(* b *)</span>
<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">if</span> <span class="hljs-type">Atomic</span>.get flag <span class="hljs-comment">(* c *)</span> <span class="hljs-keyword">then</span>
    !msg <span class="hljs-comment">(* d *)</span>
  <span class="hljs-keyword">else</span> <span class="hljs-number">0</span>
</code></pre>
<p>لاحظ أنّ الفعلين <code>a</code> و<code>d</code> يكتبان ويقرآن على التوالي في الموقع غير الذرّي نفسه <code>msg</code>، ومن ثمّ فهما متعارضان. وعلينا أن نثبت وجود علاقة حدوث-قبل بين <code>a</code> و<code>d</code> لنبيّن أنّ هذا البرنامج خالٍ من تسابق بيانات.</p>
<p>يسبق الفعل <code>a</code> الفعل <code>b</code> في ترتيب البرنامج، ومن ثمّ يحدث <code>a</code> قبل <code>b</code>. وعلى المنوال نفسه، يحدث <code>c</code> قبل <code>d</code>. فإن لاحظ <code>d2</code> أنّ المتغيّر الذرّي <code>flag</code> قيمته <code>true</code>، سبق <code>b</code> الفعل <code>c</code> في ترتيب الحدوث-قبل. ولأنّ علاقة الحدوث-قبل متعدّية، فالفعلان المتعارضان <code>a</code> و<code>d</code> في ترتيب الحدوث-قبل. وإن لاحظ <code>d2</code> أنّ <code>flag</code> قيمته <code>false</code>، لم تُنفَّذ قراءة <code>msg</code>. ومن ثمّ لا يوجد وصول متعارض في أثر التنفيذ هذا. وبناءً على ذلك، لا تسابق بيانات في البرنامج.</p>
<p>أمّا النسخة المعدّلة التالية من برنامج تمرير الرسائل ففيها تسابق بيانات.</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* Has data race *)</span>
<span class="hljs-keyword">let</span> msg = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> flag = <span class="hljs-type">Atomic</span>.make <span class="hljs-literal">false</span>
<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> =
  msg := <span class="hljs-number">42</span>; <span class="hljs-comment">(* a *)</span>
  <span class="hljs-type">Atomic</span>.set flag <span class="hljs-literal">true</span> <span class="hljs-comment">(* b *)</span>
<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> =
  ignore (<span class="hljs-type">Atomic</span>.get flag); <span class="hljs-comment">(* c *)</span>
  !msg <span class="hljs-comment">(* d *)</span>
</code></pre>
<p>فالنطاق <code>d2</code> يقرأ الآن دون شرط المرجع غير الذرّي <code>msg</code>. لننظر إلى أثر التنفيذ:</p>
<pre><code class="language-text">Atomic.get flag; (* c *)
!msg; (* d *)
msg := 42; (* a *)
Atomic.set flag true (* b *)
</code></pre>
<p>في هذا الأثر، <code>d</code> و<code>a</code> عمليتان متعارضتان. لكن لا توجد بينهما علاقة حدوث-قبل. ومن ثمّ فهذا البرنامج فيه تسابق بيانات.</p>
<h2 id="104-حرية-تسابق-البيانات-المحلية">10.4 حرية تسابق البيانات المحلية</h2>
<p>يقدّم نموذج الذاكرة في OCaml ضمانات قوية حتى للبرامج التي فيها تسابقات بيانات. فهو يقدّم ما يُعرف بضمانة <em>حرية تسابق البيانات المحلية مع الاتساق التتابعي</em> (LDRF-SC). والتعريف الصوري لهذه الخصيصة يتجاوز نطاق هذا الفصل من الدليل. ونشجّع القارئ المهتم على قراءة ورقة PLDI 2018 بعنوان <a href="https://doi.org/10.1145/3192366.3192421">Bounding Data Races in Space and Time</a>.</p>
<p>تقول LDRF-SC، بعبارة غير صورية، إنّ الأجزاء الخالية من تسابقات البيانات من البرنامج تبقى متسقة تتابعيًا. أي إنّه حتى لو كان في البرنامج تسابقات بيانات، فإنّ تلك الأجزاء منه المنفصلة عن الأجزاء التي فيها تسابقات بيانات تقبل الاستدلال التتابعي.</p>
<p>لننظر إلى المقطع التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> snippet <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> c = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span> <span class="hljs-keyword">in</span>
  c := <span class="hljs-number">42</span>;
  <span class="hljs-keyword">let</span> a = !c <span class="hljs-keyword">in</span>
  (a, c)
</code></pre>
<p>لاحظ أنّ <code>c</code> مرجع مُخصَّص حديثًا. فهل يمكن أن تعيد قراءة <code>c</code> قيمة ليست 42؟ أي هل يمكن أن تكون <code>a</code> غير <code>42</code> أبدًا؟ للمفاجأة، الجواب في نموذجَي ذاكرة ++C وJava هو نعم. ففي نموذج ذاكرة ++C، إذا كان في البرنامج تسابق بيانات، ولو في أجزاء غير ذات صلة، فالدلالة غير معرّفة. ولو رُبط هذا المقطع بمكتبة فيها تسابق بيانات، لأمكن للقراءة، في ظلّ نموذج ذاكرة ++C، أن تعيد أيّ قيمة. ولأنّ تسابقات البيانات على مواقع غير ذات صلة تؤثّر في سلوك البرنامج، نقول إنّ نموذج ذاكرة ++C غير محدود في المكان.</p>
<p>وعلى خلاف ++C، فإنّ نموذج ذاكرة Java محدود في المكان. لكنّه غير محدود في الزمن؛ فتسابقات البيانات في المستقبل تؤثّر في سلوك الماضي. لننظر مثلًا إلى ترجمة هذا المثال إلى Java. نفترض تعريفًا سابقًا <code>Class c {int x;}</code> ومتغيّرًا مشتركًا <em>غير متطاير</em> <code>C g</code>. وقد يكون المقطع حينئذٍ جزءًا من برنامج أكبر ذي خيوط متوازية:</p>
<pre><code class="language-text">(* Thread 1 *)
C c = new C();
c.x = 42;
a = c.x;
g = c;

(* Thread 2 *)
g.x = 7;
</code></pre>
<p>قراءة <code>c.x</code> والكتابة في <code>g</code> في الخيط الأول تجريان على موقعَي ذاكرة منفصلين. ولذلك يسمح نموذج ذاكرة Java بإعادة ترتيبهما. ونتيجةً لذلك، قد تقع الكتابة في الخيط الثاني قبل قراءة <code>c.x</code>، فتكون نتيجة <code>c.x</code> هي <code>7</code>.</p>
<p>والنظير في OCaml لشيفرة Java أعلاه هو:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> g = <span class="hljs-built_in">ref</span> <span class="hljs-type">None</span>

<span class="hljs-keyword">let</span> snippet <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> c = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span> <span class="hljs-keyword">in</span>
  c := <span class="hljs-number">42</span>;
  <span class="hljs-keyword">let</span> a = !c <span class="hljs-keyword">in</span>
  (a, c)

<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> (a,c) = snippet <span class="hljs-literal">()</span> <span class="hljs-keyword">in</span>
  g := <span class="hljs-type">Some</span> c;
  a

<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">match</span> !g <span class="hljs-keyword">with</span>
  | <span class="hljs-type">None</span> -&gt; <span class="hljs-literal">()</span>
  | <span class="hljs-type">Some</span> c -&gt; c := <span class="hljs-number">7</span>
</code></pre>
<p>لاحظ أنّ ثمّة تسابق بيانات على <code>g</code> وعلى <code>c</code> معًا. لننظر إلى التعليمات الثلاث الأولى فقط في <code>snippet</code>:</p>
<pre><code class="language-text">let c = ref 0 in
c := 42;
let a = !c in
...
</code></pre>
<p>نموذج الذاكرة في OCaml محدود في المكان والزمن معًا. وموقع الذاكرة الوحيد هنا هو <code>c</code>. فبالاستدلال على هذا المقطع وحده، لا يوجد تسابق بيانات في المكان (التسابق على <code>g</code>) ولا في الزمن (التسابق المستقبلي على <code>c</code>). ومن ثمّ سيكون للمقطع سلوك متسق تتابعيًا، وستكون القيمة التي تعيدها <code>!c</code> هي <code>42</code>.</p>
<p>يضمن نموذج الذاكرة في OCaml الحفاظ على سلامة الذاكرة حتى في البرامج التي فيها تسابقات بيانات. فالبرامج التي فيها تسابقات بيانات قد تلاحظ سلوكيات غير متسقة تتابعيًا، لكنها لن تنهار.</p>
<h2 id="105-رؤية-تشغيلية-لنموذج-الذاكرة">10.5 رؤية تشغيلية لنموذج الذاكرة</h2>
<p>نصف في هذا القسم دلالة نموذج الذاكرة في OCaml. وقد ورد تعريف صوري للرؤية التشغيلية لنموذج الذاكرة في القسم 3 من ورقة PLDI 2018 بعنوان <a href="https://doi.org/10.1145/3192366.3192421">Bounding Data Races in Space and Time</a>. ويعرض هذا القسم وصفًا غير صوري لنموذج الذاكرة بمساعدة مثال.</p>
<p>إذا أُعطي برنامج OCaml، قد يحتوي على تسابقات بيانات، فإنّ الدلالة التشغيلية تخبرك بالقيم التي قد تلاحظها قراءة موقع من الذاكرة. وللتبسيط، نحصر الأفعال داخل الخيط في الوصولات إلى المواقع الذرّية وغير الذرّية فقط، متجاهلين عمليات توليد النطاقات وضمّها والعمليات على الأقفال.</p>
<p>نصف دلالة نموذج الذاكرة في OCaml على نحو تشغيلي صغير الخطوات مباشر. أي إنّ الدلالة يصفها آلة مجرّدة تنفّذ فعلًا واحدًا في كل مرة، وتختار عشوائيًا أحد النطاقات المتاحة في كل خطوة. وهذا مشابه للآلة المجرّدة التي استعملناها لوصف علاقة الحدوث-قبل في القسم 10.2.2.</p>
<h3 id="1051-المواقع-غير-الذرية">10.5.1 المواقع غير الذرّية</h3>
<p>في الدلالة، نمذج المواقع غير الذرّية بوصفها خرائط منتهية من الطوابع الزمنية <code>t</code> إلى القيم <code>v</code>. ونأخذ الطوابع الزمنية أعدادًا كسرية. والطوابع الزمنية مرتّبة ترتيبًا كليًا لكنها كثيفة؛ فبين أيّ طابعين منها طابع آخر.</p>
<p>فمثلًا،</p>
<pre><code class="language-text">a: [t1 -&gt; 1; t2 -&gt; 2]
b: [t3 -&gt; 3; t4 -&gt; 4; t5 -&gt; 5]
c: [t6 -&gt; 5; t7 -&gt; 6; t8 -&gt; 7]
</code></pre>
<p>يمثّل ثلاثة مواقع غير ذرّية <code>a</code> و<code>b</code> و<code>c</code> وتواريخها. فللموقع <code>a</code> كتابتان عند الطابعين الزمنيين <code>t1</code> و<code>t2</code> بالقيمتين <code>1</code> و<code>2</code> على التوالي. وحين نكتب <code>a: [t1 -&gt; 1; t2 -&gt; 2]</code>، نفترض أنّ <code>t1 &lt; t2</code>. ونفترض أنّ المواقع مهيّأة بتاريخ فيه مدخل واحد عند الطابع الزمني 0 يحمل القيمة الأولية.</p>
<h3 id="1052-النطاقات">10.5.2 النطاقات</h3>
<p>يُجهَّز كل نطاق بـ<em>حدّ أمامي</em>، وهو خريطة من المواقع غير الذرّية إلى الطوابع الزمنية. وبديهيًا، يسجّل الحدّ الأمامي لكل نطاق، ولكل موقع غير ذرّي، آخر كتابة يعرفها الخيط. فقد تكون ثمّة كتابات أحدث، لكن ليس مضمونًا أن تكون مرئية.</p>
<p>فمثلًا،</p>
<pre><code class="language-text">d1: [a -&gt; t1; b -&gt; t3; c -&gt; t7]
d2: [a -&gt; t1; b -&gt; t4; c -&gt; t7]
</code></pre>
<p>يمثّل نطاقين <code>d1</code> و<code>d2</code> وحدّيهما الأماميين.</p>
<h3 id="1053-الوصولات-غير-الذرية">10.5.3 الوصولات غير الذرّية</h3>
<p>لنعرّف الآن دلالة القراءات والكتابات غير الذرّية. لنفترض أنّ النطاق <code>d1</code> ينفّذ قراءة <code>b</code>. ففي القراءات غير الذرّية، يجوز للنطاقات أن تقرأ عنصرًا عشوائيًا من تاريخ ذلك الموقع، ما دام ليس أقدم من الطابع الزمني في الحدّ الأمامي للنطاق. وفي هذه الحالة، بما أنّ الحدّ الأمامي لـ<code>d1</code> عند <code>b</code> هو <code>t3</code>، فقد تعيد القراءة القيمة <code>3</code> أو <code>4</code> أو <code>5</code>. والقراءة غير الذرّية لا تغيّر الحدّ الأمامي للنطاق الحالي.</p>
<p>لنفترض أنّ النطاق <code>d2</code> يكتب القيمة <code>10</code> في <code>c</code> (أي <code>c := 10</code>). فنختار طابعًا زمنيًا جديدًا <code>t9</code> لهذه الكتابة على أن يكون لاحقًا للحدّ الأمامي لـ<code>d2</code> عند <code>c</code>. ولاحظ هنا نقطة دقيقة: قد لا يكون هذا الطابع الجديد لاحقًا لكلّ ما في التاريخ، بل لاحقًا لأيّ كتابة أخرى يعرفها النطاق الكاتب فقط. ومن ثمّ قد يُدرج <code>t9</code> في تاريخ <code>c</code> إمّا (أ) بين <code>t7</code> و<code>t8</code> أو (ب) بعد <code>t8</code>. ولنختر الخيار الأول في مناقشتنا. ولأنّ الكتابة الجديدة تظهر بعد كل الكتابات التي يعرفها النطاق <code>d2</code> للموقع <code>c</code>، يُحدَّث الحدّ الأمامي لـ<code>d2</code> عند <code>c</code> أيضًا. والحالة الجديدة للآلة المجرّدة هي:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t1 -&gt; 1; t2 -&gt; 2]
b: [t3 -&gt; 3; t4 -&gt; 4; t5 -&gt; 5]
c: [t6 -&gt; 5; t7 -&gt; 6; t9 -&gt; 10; t8 -&gt; 7] (* new write at t9 *)

(* Domains *)
d1: [a -&gt; t1; b -&gt; t3; c -&gt; t7]
d2: [a -&gt; t1; b -&gt; t4; c -&gt; t9] (* frontier updated at c *)
</code></pre>
<h3 id="1054-الوصولات-الذرية">10.5.4 الوصولات الذرّية</h3>
<p>لا تحمل المواقع الذرّية قيمًا فحسب، بل تحمل أيضًا معلومات مزامنة. فنمذج المواقع الذرّية بزوج مؤلّف من القيمة التي يحملها الموقع وحدّ أمامي. ويمثّل الحدّ الأمامي معلومات المزامنة التي تُدمج مع الحدود الأمامية للخيوط التي تعمل على الموقع. وبهذه الطريقة، يمكن أن تصبح الكتابات غير الذرّية التي يقوم بها خيط ما معروفة لخيط آخر عبر التواصل بواسطة موقع ذرّي.</p>
<p>فمثلًا،</p>
<pre><code class="language-text">(* Atomic locations *)
A: 10, [a -&gt; t1; b -&gt; t5; c -&gt; t7]
B: 5,  [a -&gt; t2; b -&gt; t4; c -&gt; t6]
</code></pre>
<p>يُظهر متغيّرين ذرّيين <code>A</code> و<code>B</code> بالقيمتين <code>10</code> و<code>5</code> على التوالي، ولكلّ منهما حدّه الأمامي. ونستعمل أسماء متغيّرات بحروف كبيرة للدلالة على المواقع الذرّية.</p>
<p>أثناء القراءات الذرّية، يُدمج الحدّ الأمامي للموقع في الحدّ الأمامي للنطاق الذي ينفّذ القراءة. فلنفترض مثلًا أنّ <code>d1</code> يقرأ <code>B</code>. فالقراءة تعيد <code>5</code>، ويُحدَّث الحدّ الأمامي لـ<code>d1</code> بدمجه مع الحدّ الأمامي لـ<code>B</code>، باختيار الطابع الزمني الأحدث لكل موقع. وحالة الآلة المجرّدة قبل القراءة الذرّية هي:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t1 -&gt; 1; t2 -&gt; 2]
b: [t3 -&gt; 3; t4 -&gt; 4; t5 -&gt; 5]
c: [t6 -&gt; 5; t7 -&gt; 6; t9 -&gt; 10; t8 -&gt; 7]

(* Domains *)
d1: [a -&gt; t1; b -&gt; t3; c -&gt; t7]
d2: [a -&gt; t1; b -&gt; t4; c -&gt; t9]

(* Atomic locations *)
A: 10, [a -&gt; t1; b -&gt; t5; c -&gt; t7]
B: 5,  [a -&gt; t2; b -&gt; t4; c -&gt; t6]
</code></pre>
<p>ونتيجةً للقراءة الذرّية، تُحدَّث حالة الآلة المجرّدة إلى:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t1 -&gt; 1; t2 -&gt; 2]
b: [t3 -&gt; 3; t4 -&gt; 4; t5 -&gt; 5]
c: [t6 -&gt; 5; t7 -&gt; 6; t9 -&gt; 10; t8 -&gt; 7]

(* Domains *)
d1: [a -&gt; t2; b -&gt; t4; c -&gt; t7] (* frontier updated at a and b *)
d2: [a -&gt; t1; b -&gt; t4; c -&gt; t9]

(* Atomic locations *)
A: 10, [a -&gt; t1; b -&gt; t5; c -&gt; t7]
B: 5,  [a -&gt; t2; b -&gt; t4; c -&gt; t6]
</code></pre>
<p>أثناء الكتابات الذرّية، تُحدَّث القيمة التي يحملها الموقع الذرّي. ويُحدَّث الحدّان الأماميان، حدّ النطاق الكاتب وحدّ الموقع المكتوب إليه، إلى دمج الحدّين. فمثلًا، إذا كتب <code>d2</code> القيمة <code>20</code> في <code>A</code> في حالة الآلة الحالية، تُحدَّث حالة الآلة إلى:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t1 -&gt; 1; t2 -&gt; 2]
b: [t3 -&gt; 3; t4 -&gt; 4; t5 -&gt; 5]
c: [t6 -&gt; 5; t7 -&gt; 6; t9 -&gt; 10; t8 -&gt; 7]

(* Domains *)
d1: [a -&gt; t2; b -&gt; t4; c -&gt; t7]
d2: [a -&gt; t1; b -&gt; t5; c -&gt; t9] (* frontier updated at b *)

(* Atomic locations *)
A: 20, [a -&gt; t1; b -&gt; t5; c -&gt; t9] (* value updated. frontier updated at c. *)
B: 5,  [a -&gt; t2; b -&gt; t4; c -&gt; t6]
</code></pre>
<h3 id="1055-الاستدلال-بالدلالة">10.5.5 الاستدلال بالدلالة</h3>
<p>لنعد إلى مثال من قبل (القسم 10.1).</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>
<span class="hljs-keyword">and</span> b = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>

<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> =
  a := <span class="hljs-number">1</span>;
  !b

<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> =
  b := <span class="hljs-number">1</span>;
  !a

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> h = <span class="hljs-type">Domain</span>.spawn d2 <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r1 = d1 <span class="hljs-literal">()</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = <span class="hljs-type">Domain</span>.join h <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">assert</span> (not (r1 = <span class="hljs-number">0</span> &amp;&amp; r2 = <span class="hljs-number">0</span>))
</code></pre>
<p>هذا البرنامج فيه تسابق بيانات على <code>a</code> و<code>b</code>، ومن ثمّ قد يُظهر سلوكًا غير متسق تتابعيًا. ولنستعمل الدلالة لنبيّن أنّ البرنامج قد يُظهر <code>r1 = 0 &amp;&amp; r2 = 0</code>.</p>
<p>والحالة الأولية للآلة المجرّدة هي:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t0 -&gt; 0]
b: [t1 -&gt; 0]

(* Domains *)
d1: [a -&gt; t0; b -&gt; t1]
d2: [a -&gt; t0; b -&gt; t1]
</code></pre>
<p>ثمّة عدة جداول زمنية ممكنة لتنفيذ هذا البرنامج. لننظر إلى الجدول الزمني التالي:</p>
<pre><code class="language-text">1: a := 1 @ d1
2: b := 1 @ d2
3: !b     @ d1
4: !a     @ d2
</code></pre>
<p>بعد الفعل الأول <code>a:=1</code> من <code>d1</code>، تصبح حالة الآلة:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t0 -&gt; 0; t2 -&gt; 1] (* new write at t2 *)
b: [t1 -&gt; 0]

(* Domains *)
d1: [a -&gt; t2; b -&gt; t1] (* frontier updated at a *)
d2: [a -&gt; t0; b -&gt; t1]
</code></pre>
<p>وبعد الفعل الثاني <code>b:=1</code> من <code>d2</code>، تصبح حالة الآلة:</p>
<pre><code class="language-text">(* Non-atomic locations *)
a: [t0 -&gt; 0; t2 -&gt; 1]
b: [t1 -&gt; 0; t3 -&gt; 1] (* new write at t3 *)

(* Domains *)
d1: [a -&gt; t2; b -&gt; t1]
d2: [a -&gt; t0; b -&gt; t3] (* frontier updated at b *)
</code></pre>
<p>الآن، في الفعل الثالث <code>!b</code> من <code>d1</code>، لاحظ أنّ الحدّ الأمامي لـ<code>d1</code> عند <code>b</code> هو <code>t1</code>. ومن ثمّ قد تعيد القراءة <code>0</code> أو <code>1</code>. ولنفترض أنها تعيد <code>0</code>. ولا تُحدَّث حالة الآلة بالقراءة غير الذرّية.</p>
<p>وعلى المنوال نفسه، في الفعل الرابع <code>!a</code> من <code>d2</code>، الحدّ الأمامي لـ<code>d2</code> عند <code>a</code> هو <code>t0</code>. ومن ثمّ قد تعيد هذه القراءة أيضًا <code>0</code> أو <code>1</code>. ولنفترض أنها تعيد <code>0</code>. ومن ثمّ ستفشل العبارة التأكيدية في البرنامج الأصلي، <code>assert (not (r1 = 0 &amp;&amp; r2 = 0))</code>، في هذا التنفيذ بعينه.</p>
<h2 id="106-عمليات-غير-مطابقة">10.6 عمليات غير مطابقة</h2>
<p>ثمّة عمليات معيّنة لا تتوافق مع نموذج الذاكرة.</p>
<ul>
<li>
<p>قد تسبّب دالة <code>Array.blit</code> على مصفوفات العوائم <em>التمزّق</em>. فحين تجري عملية نسخ (blit) غير مزامنة بالتوازي مع كتابة متداخلة في حقول المصفوفة نفسها من العوائم، قد ينتهي الحقل ببتّات من إحدى الكتابتين.</p>
</li>
<li>
<p>مع مصفوفات العوائم المسطّحة أو السجلات التي لا تحتوي إلا على حقول من نوع float على معماريات 32 بت، يتضمّن الحصول على حقل أو ضبطه وصولين منفصلين إلى الذاكرة. وفي وجود تسابقات بيانات، قد يلاحظ المستخدم التمزّق.</p>
</li>
<li>
<p>تسمح وحدة <code>Bytes</code> بوصولات مختلطة الأنماط قد تكون القراءات والكتابات فيها بأحجام مختلفة. والوصولات المختلطة الأنماط غير المزامنة تؤدّي إلى التمزّق.</p>
</li>
</ul>
`,d={book:s,chapter:a,chapterTitle:n,slug:e,title:c,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,d as default,l as headings,p as html,e as slug,c as title};
