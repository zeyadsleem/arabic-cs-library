const e="kinney",n="react-performance",s="أداء React",t="index",l="أداء React",a=[{depth:2,id:"أمور-مهمة",text:"أمور مهمة"},{depth:2,id:"ملاحظات-عامة",text:"ملاحظات عامة"},{depth:3,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:3,id:"مؤشرات-الويب-الأساسية-web-vitals",text:"مؤشّرات الويب الأساسية (Web Vitals)"},{depth:3,id:"تشريح-إعادة-التصيير",text:"تشريح إعادة التصيير"},{depth:3,id:"react-fiber",text:"React Fiber"},{depth:3,id:"عن-الحفظ-في-الذاكرة-memoization",text:"عن الحفظ في الذاكرة (Memoization)"},{depth:3,id:"react-compiler",text:"React Compiler"},{depth:3,id:"متى-لا-تزال-بحاجة-إلى-usememo",text:"متى لا تزال بحاجة إلى useMemo"},{depth:3,id:"suspense",text:"Suspense"},{depth:3,id:"usetransition",text:"useTransition"},{depth:3,id:"usedeferredvalue",text:"useDeferredValue"},{depth:3,id:"المقارنة-بين-usetransition-و-usedeferredstate",text:"المقارنة بين useTransition و useDeferredState"},{depth:3,id:"useoptimistic",text:"useOptimistic"},{depth:3,id:"react-compiler",text:"React Compiler"},{depth:2,id:"ملحق",text:"ملحق"},{depth:3,id:"أدلة-الترحيل",text:"أدلّة الترحيل"},{depth:2,id:"العرض-من-الخادم-والبث-server-side-and-streaming",text:"العرض من الخادم والبثّ (Server-Side and Streaming)"},{depth:3,id:"أنماط-الأداء-الشائعة",text:"أنماط الأداء الشائعة"},{depth:3,id:"ميزات-react-المتقدمة",text:"ميزات React المتقدّمة"},{depth:3,id:"استراتيجيات-تحميل-متقدمة",text:"استراتيجيات تحميل متقدّمة"},{depth:3,id:"رسومات-وخيوط-متقدمة",text:"رسومات وخيوط متقدّمة"},{depth:3,id:"الذاكرة-والمعمارية",text:"الذاكرة والمعمارية"},{depth:3,id:"المراقبة-والاختبار",text:"المراقبة والاختبار"}],o=`<p>هذه ملاحظاتي من <a href="https://frontendmasters.com/workshops/react-performance-v2/?utm_source=kinney&amp;utm_medium=social&amp;code=kinney">ورشة أداء React</a> التي أقدّمها على <a href="https://frontendmasters.com/?utm_source=kinney&amp;utm_medium=social&amp;code=kinney">Frontend Masters</a>.</p>
<h2 id="أمور-مهمة">أمور مهمة</h2>
<ul>
<li><a href="https://github.com/stevekinney/react-performance">مستودع مختبر التطبيق</a></li>
<li><a href="https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">أدوات مطوّر React</a></li>
</ul>
<h2 id="ملاحظات-عامة">ملاحظات عامة</h2>
<h3 id="مراقبة-الأداء">مراقبة الأداء</h3>
<p><strong>القاعدة رقم 1</strong>: <em>لا</em> تقس أداء نسخة التطوير من تطبيقك.</p>
<p>اعمل استعارات (alias) لما يلي في نسخة الإنتاج:</p>
<ul>
<li><code>react-dom$</code> → <code>react-dom/profiling</code></li>
<li><code>scheduler/tracing</code> → <code>scheduler/tracing-profiling</code></li>
</ul>
<p><strong>القاعدة رقم 2</strong>: تظاهر على الأقل بأنك لا تستخدم جهاز MacBook Pro سريعًا جدًا مع إنترنت فائق السرعة.</p>
<h3 id="مؤشرات-الويب-الأساسية-web-vitals">مؤشّرات الويب الأساسية (Web Vitals)</h3>
<ul>
<li><strong>أكبر رسم للمحتوى (LCP)</strong>: مقياس لأداء التحميل. يحدّد اللحظة التي يُصيَّر فيها أكبر صورة أو كتلة نصية ظاهرة داخل إطار العرض. استهدف 2.5 ثانية من بدء تحميل الصفحة.</li>
<li><strong>مدة التفاعل حتى الرسم التالي (INP)</strong>: يقيس زمن الاستجابة لجميع تفاعلات النقر واللمس ولوحة المفاتيح في الصفحة ويعرض قيمة واحدة. استهدف أقل من 200 مللي ثانية.</li>
<li><strong>الانزياح التراكمي للتخطيط (CLS)</strong>: يقيس الاستقرار البصري للصفحة. وهو يحاول قياس مقدار انزياح التخطيط غير المتوقّع خلال عمر الصفحة كاملًا. درجة CLS الجيدة أقل من 0.1.</li>
</ul>
<h4>تحسين LCP</h4>
<ul>
<li>يقيس LCP المدة التي يستغرقها المتصفّح لتحويل كتلة JavaScript الكبيرة تلك إلى تمثيل لتطبيقك في DOM. لذا اغشّ: صيّر الهيكل على الخادم فلن يُحتسب ذلك.</li>
<li>حسّن أصولك. فلعلّك لا تحتاج إلى صورة بحجم 16 ميغابايت؟ ما رأيك بتجربة صيغة صور حديثة؟ يمكنك أيضًا استخدام تلميحات مثل <code>&lt;link rel=&quot;preload&quot;&gt;</code> لمحاولة القيام بذلك مسبقًا كي لا يلاحظ أحد.</li>
<li>قسّم شيفرتك: هل <em>تحتاج</em> إلى إرسال <em>كل شيء</em> إليهم دفعة واحدة؟</li>
</ul>
<h4>تحسين INP</h4>
<ul>
<li>لا تكن أنانيًا. جزّئ المهام الطويلة ودع كل الآخرين يحصلون على فرصة لإدخال أعمالهم.</li>
<li>احفظ الأمور في الذاكرة كي لا تُهدر الأشياء التي لا تحتاج إلى تغيير وقتًا ثمينًا في محاولة اكتشاف ذلك بنفسها.</li>
<li>استخدم إزالة الاهتزاز (debounce) والخنق (throttle). انتظر حتى يُكمل المستخدم فكرته قبل أن تبدأ في تنفيذ مجموعة من الأعمال. فقد اتّضح أن للأصابع زمن استجابة.</li>
<li>عمّال الويب (Web Workers): اذهب ونفّذ أمورك المكلفة في مكان آخر.</li>
</ul>
<h4>تحسين CLS</h4>
<ul>
<li>لا تنتظر تحميل الصورة لتعرف أبعادها.</li>
<li>اختر خطوطًا مماثلة متريًا قدر الإمكان للخط النهائي على الويب. (أعرف. فقد عملت مع المصمّمين أنا أيضًا.)</li>
<li>احجز مساحة لاستجابات API كي لا يدفع المحتوى ما حوله عند تحميله. هياكل التحميل (skeleton loaders) أصدقاؤك.</li>
</ul>
<h3 id="تشريح-إعادة-التصيير">تشريح إعادة التصيير</h3>
<p>تُعاد المكوّنات للتصيير أساسًا لأحد ثلاثة أسباب:</p>
<ol>
<li>تغيّرت حالته.</li>
<li>صُيّر مكوّنه الأب.</li>
<li>تغيّر السياق (Context).</li>
</ol>
<p>سنتحدّث عن الحفظ في الذاكرة بعد قليل. وفي تلك الحالة يمكننا استبدال السبب الثاني بـ «تغيّرت خصائصه». وسنتحدّث أيضًا عن كيفية مساعدة React Compiler في هذا الصدد. لكن لنعالج أمرًا واحدًا في كل مرة.</p>
<p>أيًّا كان <em>سبب</em> إعادة تصيير المكوّن، يمكننا بالتأكيد تصنيف عمليات إعادة التصيير في فئتين: ضرورية وغير ضرورية. عمليات إعادة التصيير غير الضرورية مسألة دقيقة، لأن أي عملية تصيير واحدة ليست عادةً مشكلة بحدّ ذاتها، بل تراكمها عبر الوقت.</p>
<h3 id="react-fiber">React Fiber</h3>
<p><strong>في زمننا</strong>: كان التصيير متزامنًا تمامًا وغير قابل للمقاطعة. وكان الإصدار السابق يستخدم مكدّس استدعاءات JavaScript للنزول عبر شجرة المكوّنات. أما في Fiber، فتدير React تجريدها الخاص الشبيه بمكدّس الاستدعاءات.</p>
<blockquote>
<p>في أيام ما قبل Fiber (React 15 وما قبله)، كان «الدوم الافتراضي» في جوهره شجرة من كائنات خفيفة تحاكي DOM الحقيقي. في كل تصيير، تبني React شجرة جديدة من JSX لديك، وتقارنها بالسابقة، ثم تحسب رقعة (patch) لتطبيقها على DOM الفعلي. وكانت هذه العملية كلها متزامنة وغير قابلة للمقاطعة: فبمجرد أن تبدأ React في السير عبر الشجرة، كان عليها أن تنتهي قبل أن يستطيع المتصفّح فعل أي شيء آخر.</p>
</blockquote>
<p>React Fiber محرّك تصيير مُجدول تعاونيًا.</p>
<p>عمليًا، نحن لا نقلّل بالضرورة الزمن اللازم لتصيير واجهة المستخدم، بل نحاول فقط أن نكون أذكى قليلًا في ذلك.</p>
<p>الخلاصة هنا أننا نقدّم فكرة الأولوية بدل مجرّد التعامل مع الطلبات بترتيب وصولها.</p>
<p>إنها في الأساس مجموعة من الدوال العادية، وشجرة قائمة مترابطة، ومُجدول صغير متنكّر في معطف.</p>
<p>الميزة الجوهرية أنها تستطيع إيقاف ما تفعله وطرح تصيير جارٍ متى شاءت.</p>
<p>ببساطة، إن وصل شيء <em>أكثر أهمية</em> مما تفعله الآن، تستطيع تحويل تركيزها إلى الأمور الأكثر أهمية، وأن تُجمّد الأمور الأقل أهمية أو تطرحها الآن وتبدأ من جديد لاحقًا.</p>
<p><strong>Fiber</strong> عقدة خفيفة تصف العمل الذي يجب تنفيذه لمكوّن ما: خصائصه، وحالته، والتحديثات المعلّقة، ومؤشّرات إلى أبيه وأبنائه وأشقّائه.</p>
<p>توجد دائمًا شجرتان:</p>
<ol>
<li>شجرة <strong>الحالة الحالية</strong> (Current): ما يعكسه DOM (أو أي شيء آخر) حاليًا.</li>
<li>شجرة <strong>العمل الجاري</strong> (Work in Progress): المسوّدة التي يجري إعدادها.</li>
</ol>
<p>تنفّذ React عملها على شجرة العمل الجاري، وإن وصل شيء أكثر أهمية، تستطيع ببساطة طرح تلك الشجرة — أو أجزاء منها — وتبدأ جولة جديدة بالتحديثات الأعلى أولوية التي وصلت.</p>
<p>لم تُلغِ Fiber الدوم الافتراضي — بل أعادت بناء معماريتّه فقط. كل عقدة في الشجرة هي الآن كائن Fiber، وهو أكثر من مجرّد وصف لعنصر في الدوم الافتراضي:</p>
<ul>
<li>يحمل نوع المكوّن وخصائصه وحالته المعلّقة.</li>
<li>له مؤشّرات إلى أبيه وابنه وشقيقه، فتتشكّل شجرة قائمة مترابطة.</li>
<li>يحمل معلومات محاسبية للجدولة (المسارات/الأولوية، وزمن الانتهاء).</li>
<li>يخزّن التأثيرات التي يجب إيداعها (تحويرات DOM ودوال الاستدعاء المرتد).</li>
</ul>
<p>عندما يقول الناس «لم تعد React تستخدم الدوم الافتراضي»، فما يعنونه عادةً أن React Fiber ليست مجرّد النهج الساذج القديم القائم على «مقارنة شجرتين من JSON». لكن الفكرة الأساسية — تمثيل برمجي شجري لواجهة المستخدم تقارنه React بـ DOM الحقيقي — لا تزال قائمة تمامًا. وقد جعلت Fiber ذلك التمثيل ذكيًا ودائمًا ومتعاونًا مع حلقة أحداث المتصفّح.</p>
<h4>حلقة التصيير</h4>
<p>في مرحلة التصيير™، نعالج Fiber واحدًا في كل مرة.</p>
<ol>
<li>خُذ الـ Fiber التالي.</li>
<li>نفّذ <code>beginWork(fiber, renderLanes)</code>. ببساطة، استدعِ دالة المكوّن واستنتج الأبناء.</li>
<li>إن وُجد أبناء، انزل إليهم. وإن لم يوجد، اصعد عبر <code>completeWork</code> لإنهاء العقدة، وتحديث DOM، وجمع أي تأثيرات.</li>
<li>لكن في الطريق — اسأل «هل ينبغي أن أتنازل؟» إن كان الجواب نعم، توقّف لحظة ودَع المتصفّح يستعيد دفة القيادة لثانية.</li>
<li>استأنف من حيث توقّفت.</li>
</ol>
<p>هناك مجموعة من المسارات (lanes) المختلفة، لكننا سنقسمها لأغراضنا إلى فئتين:</p>
<ul>
<li><strong>التحديثات العاجلة</strong>: إدخال المستخدم وما شابه.</li>
<li><strong>تحديثات الانتقال</strong>: أمور تُعلنها <em>أنت</em> صراحةً بأنها غير عاجلة.</li>
</ul>
<p>وهناك أيضًا أمور يعدّها React أقل إلحاحًا، لكن لا توجد طريقة معتمدة رسميًا لتصل إليها.</p>
<h4>الإيداع</h4>
<p>بعد أن ننتهي من التصيير، نُودع التغييرات في DOM.</p>
<ol>
<li>مرحلة ما قبل التحوير (وتُعرف بمرحلة اللقطة) تستدعي React أي توابع دورة حياة أو خُطّافات تحتاج إلى قراءة DOM قبل أن تُحوّله React. مثال: getSnapshotBeforeUpdate. لا كتابة على DOM بعد، قراءة فقط.
<ul>
<li>تستدعي React أي توابع دورة حياة أو خُطّافات تحتاج إلى قراءة DOM قبل أن تُحوّله React.</li>
<li>مثال: getSnapshotBeforeUpdate.</li>
<li>لا كتابة على DOM بعد، قراءة فقط.</li>
</ul>
</li>
<li>مرحلة التحوير تطبّق React كل التغييرات التي قرّرتها أثناء مرحلة التصيير. تُنشئ عقد DOM أو تحدّثها أو تحذفها. تُنفّذ تنظيف ref (‏ref = null) للعقد المحذوفة. تُشغّل تنظيفات التأثيرات السلبية المجدولة لهذا الإيداع (من التصيير السابق).
<ul>
<li>تطبّق React كل التغييرات التي قرّرتها أثناء مرحلة التصيير.</li>
<li>تُنشئ عقد DOM أو تحدّثها أو تحذفها.</li>
<li>تُنفّذ تنظيف ref (‏ref = null) للعقد المحذوفة.</li>
<li>تُشغّل تنظيفات التأثيرات السلبية المجدولة لهذا الإيداع (من التصيير السابق).</li>
</ul>
</li>
<li>مرحلة التخطيط (وتُعرف بتأثيرات التخطيط) الآن تستدعي React دوال useLayoutEffect (وتوابع الصنف componentDidMount / componentDidUpdate). تعمل هذه بعد تحويرات DOM لكن قبل رسم المتصفّح. مثالية لقياس تخطيط DOM أو ضبط مواضع التمرير.
<ul>
<li>الآن تستدعي React دوال useLayoutEffect (وتوابع الصنف componentDidMount / componentDidUpdate).</li>
<li>تعمل هذه بعد تحويرات DOM لكن قبل رسم المتصفّح.</li>
<li>مثالية لقياس تخطيط DOM أو ضبط مواضع التمرير.</li>
</ul>
</li>
<li>مرحلة التأثيرات السلبية بعد أن يرسم المتصفّح، تجدول React دوال useEffect. تعمل هذه بشكل غير متزامن، فلا تعيق الرسم. رائعة لجلب البيانات والاشتراكات والتسجيل والمؤقتات وما شابه.
<ul>
<li>بعد أن يرسم المتصفّح، تجدول React دوال useEffect.</li>
<li>تعمل هذه بشكل غير متزامن، فلا تعيق الرسم.</li>
<li>رائعة لجلب البيانات والاشتراكات والتسجيل والمؤقتات وما شابه.</li>
</ul>
</li>
</ol>
<h4>ملاحظات تذوّق</h4>
<h4>آليات التنازل</h4>
<p>التنازل مدعوم بحزمة <a href="https://www.npmjs.com/package/scheduler"><code>scheduler</code></a>.</p>
<ul>
<li>جدولة العمل: <code>unstable_scheduleCallback(priority, cb)</code></li>
<li>تقرير ما إذا كان ينبغي التنازل: <code>unstable_shouldYield()</code></li>
</ul>
<p>إليك نسخة مبسّطة للغاية عن كيفية عمل ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  unstable_scheduleCallback <span class="hljs-keyword">as</span> scheduleCallback,
  unstable_NormalPriority <span class="hljs-keyword">as</span> <span class="hljs-title class_">NormalPriority</span>,
  unstable_shouldYield <span class="hljs-keyword">as</span> shouldYield,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;scheduler&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">workLoop</span>(<span class="hljs-params"><span class="hljs-attr">root</span>: <span class="hljs-title class_">FiberRoot</span></span>) {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">next</span>: <span class="hljs-title class_">Fiber</span> | <span class="hljs-literal">null</span> = root.<span class="hljs-property">workInProgress</span>;
  <span class="hljs-keyword">while</span> (next) {
    next = <span class="hljs-title function_">performUnitOfWork</span>(next);
    <span class="hljs-keyword">if</span> (<span class="hljs-title function_">shouldYield</span>()) {
      <span class="hljs-comment">// Pause: reschedule continuation</span>
      <span class="hljs-title function_">scheduleCallback</span>(<span class="hljs-title class_">NormalPriority</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">workLoop</span>(root));
      <span class="hljs-keyword">return</span>; <span class="hljs-comment">// Cooperative yield to browser</span>
    }
  }
  <span class="hljs-title function_">commitRoot</span>(root); <span class="hljs-comment">// Synchronous commit</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">performUnitOfWork</span>(<span class="hljs-params"><span class="hljs-attr">fiber</span>: <span class="hljs-title class_">Fiber</span></span>): <span class="hljs-title class_">Fiber</span> | <span class="hljs-literal">null</span> {
  <span class="hljs-keyword">const</span> child = <span class="hljs-title function_">beginWork</span>(fiber);
  <span class="hljs-keyword">if</span> (child) <span class="hljs-keyword">return</span> child;
  <span class="hljs-keyword">let</span> <span class="hljs-attr">node</span>: <span class="hljs-title class_">Fiber</span> | <span class="hljs-literal">null</span> = fiber;
  <span class="hljs-keyword">while</span> (node) {
    <span class="hljs-title function_">completeWork</span>(node);
    <span class="hljs-keyword">if</span> (node.<span class="hljs-property">sibling</span>) <span class="hljs-keyword">return</span> node.<span class="hljs-property">sibling</span>;
    node = node.<span class="hljs-property">return</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h5>متى ينبغي أن يتنازل؟</h5>
<ul>
<li>من وقت لآخر. بعد نحو 5 مللي ثانية.</li>
<li>هل هناك مهام ذات أولوية أعلى تنتظر؟</li>
</ul>
<p>سيحاول المُجدول التنازل قبل أن يحتاج المتصفّح إلى الرسم. (‏60 إطارًا في الثانية تعني نحو 16.6 مللي ثانية). يعني هذا أن React تفسح الطريق في كل مرة تحتاج فيها واجهة المستخدم إلى التحديث من أجل:</p>
<ul>
<li>عمليات الرسم والتخطيط.</li>
<li>معالجة إدخال المستخدم.</li>
<li>أمور متصفّح أخرى.</li>
</ul>
<h4>فهم المسارات (Lanes)</h4>
<p>حسنًا، لنتخيّل أن لدينا حقل إدخال بحث ونكتب فيه «cat» بوصفه بداية استعلامنا.</p>
<p>كل <em>ضغطة مفتاح</em> ستُدرج تحديث حالة عاجلًا في مسارات الإدخال المنفصلة — وستتعامل React مع كل واحد منها بوصفه عالي الأولوية.</p>
<p>بتأجيل العمل، نتيح للمستخدم إنهاء الكتابة دون أن نعدّ كل ضغطة مفتاح فورًا أهم شيء فعله في حياته.</p>
<p>وعندما تسنح الفرصة، تستأنف العمل. وفي الطريق، إن تغيّر استعلام البحث في هذا المسار منخفض الأولوية — تستطيع React التنازل لذلك التحديث وطرح ما تعمل عليه حاليًا. فقد ظهرت أمور جديدة.</p>
<p>وبمجرد أن تخلو جميع المسارات الأعلى أولوية، تُنهي React العمل منخفض الأولوية ثم تستعدّ لإيداع التغييرات في DOM.</p>
<h4>الإلغاء وإعادة البدء</h4>
<p>توضع الأمور المختلفة التي تحتاج React إلى فعلها في <strong>مسارات</strong> (lanes).</p>
<p>ببساطة، إن وصل شيء في مسار أعلى أولوية، تتوجّه React إليه بدل المضي قدمًا فيما كانت تفعله.</p>
<p>تذهب الأمور الأعلى أولوية إلى أعلى القائمة.</p>
<p>إن لم يُبطل ذلك الشيء الآخر أي شيء، نستأنف من حيث توقّفنا.</p>
<p>وإن <em>أبطل</em> العمل الحالي — نبدأ من جديد من الأعلى.</p>
<h4>المسارات والأولويات</h4>
<p><strong>المسارات</strong> هي نظام React الداخلي لإدارة أولوياتها.</p>
<p>وهي تستخدم أقنعة البتات (bitmasks) لأن العمليات الثنائية سريعة. يعني هذا أن React لا تبذل جهدًا مكلفًا في مقارنة جميع الأولويات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">SyncLane</span> = <span class="hljs-number">0b0000000000000000000000000000001</span>; <span class="hljs-comment">// Bit 1</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">InputContinuousLane</span> = <span class="hljs-number">0b0000000000000000000000000000100</span>; <span class="hljs-comment">// Bit 3</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">DefaultLane</span> = <span class="hljs-number">0b0000000000000000000000000010000</span>; <span class="hljs-comment">// Bit 5</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TransitionLane1</span> = <span class="hljs-number">0b0000000000000000000000001000000</span>; <span class="hljs-comment">// Bit 7</span>
</code></pre>
<p>إليك نظرة تقريبية على الأولويات:</p>
<ul>
<li><code>SyncLane</code>: تحديثات فورية حاجبة (مثل <code>flushSync</code>)</li>
<li>إجراءات المستخدم (<code>InputContinuousLane</code>): النقر وضغط المفاتيح والسحب والتمرير.</li>
<li><code>DefaultLane</code>: سير العمل الطبيعي.</li>
<li><code>TransitionLanes</code>: أمور تُوضع صراحةً في مسار أقل أولوية.</li>
<li><code>RetryLanes</code>: أمور فشلت وننتظر إعادة محاولتها.</li>
<li><code>IdleLane</code>: العمل الأدنى أولوية.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// This gets assigned DefaultLane</span>
<span class="hljs-title function_">setState</span>(newValue);

<span class="hljs-comment">// This gets assigned TransitionLane</span>
<span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">setState</span>(newValue);
});
</code></pre>
<p>عند تحفيز تحديث، تقوم React بما يلي:</p>
<ul>
<li>تُسند التحديث إلى المسار المناسب.</li>
<li>تجمع التحديثات في المسارات نفسها معًا.</li>
<li>تعالج المسارات من الأعلى أولوية إلى الأدنى.</li>
</ul>
<p>ثم إن وصل لاحقًا شيء في مسار أعلى أولوية، ننتقل للتعامل معه قبل استئناف ما توقّفنا عنده.</p>
<h5>مجموعات المسارات</h5>
<p>تستخدم React في الواقع <em>مجموعات من المسارات</em> لبعض الأولويات. فمثلًا توجد <em>عدة</em> مسارات انتقال يمكن أن تعمل في الوقت نفسه دون أن يتداخل بعضها مع بعض.</p>
<h5>مسار الخمول (Idle Lane)</h5>
<p>ما نوع الأمور التي تحدث في <code>IdleLane</code>؟ من حيث المفهوم، يشبه <code>requestIdleCallback</code>.</p>
<p>حاليًا، هو مخصّص تقريبًا لواجهات React الداخلية والتجريبية فقط.</p>
<p>الحالة الأساسية هي أي محتوى خارج الشاشة غير مرئي حاليًا.</p>
<p>أي نوع من الجلب المسبق أو التصيير المسبق. فالأمور التي قد نحتاجها مستقبلًا ليست بالتأكيد بأهمية الأمور التي تحدث <em>الآن</em>.</p>
<p>التأثيرات الخلفية: التحليلات، والقياس عن بُعد (telemetry)، وتنظيف الذاكرة المؤقتة، ومزامنة البيانات في الخلفية.</p>
<h4>إيداع العمل</h4>
<p>لا تُقاطَع عمليات الإيداع أبدًا. لدينا شجرة كاملة لما ينبغي أن يبدو عليه DOM. لنمضِ ونجعله كذلك.</p>
<p>ذلك لأننا نغيّر DOM فعليًا في هذه المرحلة، والتوقّف في المنتصف قد يتركنا في حالة غير متّسقة.</p>
<p>يعني هذا أننا لن ننتهي أبدًا بواجهة مستخدم مصيّرة جزئيًا.</p>
<h3 id="عن-الحفظ-في-الذاكرة-memoization">عن الحفظ في الذاكرة (Memoization)</h3>
<p>لدينا ثلاث طرق رئيسية لحفظ الأمور في الذاكرة في React:</p>
<ol>
<li><code>React.memo()</code> مكوّن أعلى رتبة يمنع المكوّن من إعادة التصيير إن لم تتغيّر خصائصه.</li>
<li><code>useMemo()</code> خُطّاف يحفظ في الذاكرة <em>ناتج</em> عملية حسابية مكلفة.</li>
<li><code>useCallback()</code> خُطّاف يحفظ تعريف دالة في الذاكرة، فيمنع المكوّنات الأبناء التي تتلقّاها كخاصية من إعادة التصيير.</li>
</ol>
<h4>React.memo</h4>
<p>مكوّن أعلى رتبة يلفّ مكوّنك. يقول هذا المكوّن ببساطة: «لا يهمّني إن تغيّر أبوك، دعني أنظر إلى خصائصك. إن كانت هي نفسها، سأتخطّى استدعاءك وأعيد فقط الناتج نفسه من آخر مرة استُدعيت فيها بهذه الخصائص.»</p>
<ol>
<li>تتحقّق React مما إذا كان كائنا الخصائص القديم والجديد يحملان العدد نفسه من المفاتيح.</li>
<li>ثم تمرّ على كل مفتاح في كائن الخصائص وتقارن القيمة السابقة بالقيمة الحالية باستخدام خوارزمية المقارنة <code>Object.is</code>.</li>
</ol>
<ul>
<li><strong>التبرير</strong>: استخدم <code>React.memo</code> عندما يُظهر <code>React Profiler</code> أن مكوّنًا يُعاد تصييره بشكل متكرّر، لكن ميزة «Why did this render?» تشير إلى أن السبب كان إعادة تصيير المكوّن الأب لا تغيّرًا في خصائص المكوّن نفسه أو حالته. وهو أكثر فعالية مع المكوّنات المكلفة في التصيير والتي كثيرًا ما تُصيّر بالخصائص نفسها.</li>
<li><strong>موانع الاستخدام</strong>: لا تلفّ مكوّنات بسيطة تُصيّر سريعًا أو مكوّنات تختلف خصائصها دائمًا تقريبًا في كل تصيير. فقد تفوق كلفة مقارنة الخصائص فائدة تخطّي التصيير.</li>
</ul>
<h4>useMemo</h4>
<p><code>useMemo()</code> خُطّاف في React مصمّم لحفظ <em>القيمة المُعادة</em> للدالة في الذاكرة. إن تغيّر <em>أي</em> اعتماد، فسيشغّل تلك الدالة مرة أخرى. وإلا، فسيُعيد القيمة المخزّنة في الذاكرة المؤقتة فقط.</p>
<p>حالة الاستخدام الأساسية هي الحسابات المكلفة. لكنه يُستخدم أيضًا لاستقرار المرجعية.</p>
<ul>
<li><strong>التبرير</strong>: هناك تبريران أساسيان مدفوعان بالبيانات لاستخدام <code>useMemo</code>: <strong>حفظ الحسابات المكلفة في الذاكرة</strong>: عندما يحدّد عرض «Bottom-Up» في تبويب Chrome Performance دالة نقية كثيفة حسابيًا داخل مكوّن تعمل في كل تصيير، يمكن استخدام <code>useMemo</code> لتخزين ناتجها مؤقتًا. يمنع ذلك إعادة تنفيذ الحساب المكلف ما لم تتغيّر مدخلاته. <strong>الحفاظ على المساواة المرجعية</strong>: على غرار useCallback، ينبغي استخدام <code>useMemo</code> لحفظ القيم غير الأولية (الكائنات أو المصفوفات) في الذاكرة، وهي القيم التي تُنشأ أثناء التصيير وتُمرَّر كخصائص إلى مكوّنات أبناء محفوظة في الذاكرة. بدون <code>useMemo</code>، يُنشأ مرجع جديد للكائن أو المصفوفة في كل تصيير، ما يكسر المقارنة السطحية للخصائص في المكوّن الابن.
<ul>
<li><strong>حفظ الحسابات المكلفة في الذاكرة</strong>: عندما يحدّد عرض «Bottom-Up» في تبويب Chrome Performance دالة نقية كثيفة حسابيًا داخل مكوّن تعمل في كل تصيير، يمكن استخدام <code>useMemo</code> لتخزين ناتجها مؤقتًا. يمنع ذلك إعادة تنفيذ الحساب المكلف ما لم تتغيّر مدخلاته.</li>
<li><strong>الحفاظ على المساواة المرجعية</strong>: على غرار useCallback، ينبغي استخدام <code>useMemo</code> لحفظ القيم غير الأولية (الكائنات أو المصفوفات) في الذاكرة، وهي القيم التي تُنشأ أثناء التصيير وتُمرَّر كخصائص إلى مكوّنات أبناء محفوظة في الذاكرة. بدون <code>useMemo</code>، يُنشأ مرجع جديد للكائن أو المصفوفة في كل تصيير، ما يكسر المقارنة السطحية للخصائص في المكوّن الابن.</li>
</ul>
</li>
<li><strong>موانع الاستخدام</strong>: لا تلفّ حسابات بسيطة أو إنشاء كائنات/مصفوفات بـ <code>useMemo</code> إلا إذا كانت تُمرَّر إلى مكوّن محفوظ في الذاكرة. فالعبء الإضافي غير مبرَّر.</li>
</ul>
<h4>useCallback</h4>
<p><code>useCallback()</code> خُطّاف في React يشبه useMemo نحويًا ومفاهيميًا إلى حدّ كبير، مع فرق جوهري واحد: فهو يحفظ تعريف الدالة نفسه في الذاكرة، <em>لا</em> قيمتها المُعادة.</p>
<p>حالة استخدامه <em>الأساسية</em> هي استقرار المرجعية في دوال الاستدعاء المرتد.</p>
<ul>
<li><strong>التبرير</strong>: حالة الاستخدام الأساسية لـ <code>useCallback</code> هي الحفاظ على المساواة المرجعية للدوال التي تُمرَّر كخصائص إلى مكوّنات أبناء محفوظة في الذاكرة (أي المكوّنات الملفوفة بـ <code>React.memo</code>). بدون <code>useCallback</code>، تُنشأ نسخة جديدة من الدالة في كل تصيير للمكوّن الأب. وهذا المرجع الجديد سيكسر المقارنة السطحية للخصائص في المكوّن الابن المحفوظ في الذاكرة، فيُبطل الغاية من <code>React.memo</code>.</li>
<li><strong>موانع الاستخدام</strong>: لا تستخدم <code>useCallback</code> مع دوال لا تُمرَّر كخصائص إلى أبناء محفوظين في الذاكرة أو لا تُستخدم في مصفوفة اعتمادات. فهي تضيف تعقيدًا وعبئًا على الذاكرة بلا داعٍ.</li>
</ul>
<h3 id="react-compiler">React Compiler</h3>
<p>React Compiler إضافة Babel متطوّرة تحاول تطبيق معظم أفضل الممارسات نيابةً عنك — حتى لا تحتاج إلى القلق من كل هذا الجنون.</p>
<p>يحاول المُصرِّف تقليل مقدار العمل الذي يحتاج المُجدول إلى النظر فيه من الأساس تقليلًا جذريًا. وإن كان كل ما قلناه عن الحفظ في الذاكرة أمرًا جيدًا كما يُقال، فوجود شيء يفعله باطراد لن يزيد النتائج إلا تحسّنًا.</p>
<p><strong>ملاحظة تذوّق مهمة</strong>: يُفضّل React Compiler السلامة على كل شيء آخر. فإن رأى أن تحسين شيء ما محفوف بالمخاطر — <em>فلن يفعله</em>.</p>
<h4>فيما يتعلّق بالحفظ في الذاكرة</h4>
<p>مع وجود React Compiler — يمكننا التخلّص من كثير من العمل اليدوي، لكنه لا يُلغي تمامًا الحاجة إلى <code>React.memo</code> و<code>useMemo</code> و<code>useCallback</code>. (آسف.)</p>
<h5>متى لا تزال بحاجة إلى React.memo</h5>
<ul>
<li><strong>المكوّنات غير النقية</strong>: إن كان لمكوّنك سلوك غير نقي (مثل القراءة من حالة عامة، أو استخدام العشوائية، أو الاعتماد على كائنات قابلة للتغيير خارج الخصائص)، فلا يستطيع المُصرِّف افتراض النقاء بأمان. و<code>React.memo</code> هو ضمانك الصريح لـ React بأنه يمكن تخطّي إعادة التصيير عند تساوي الخصائص تساويًا سطحيًا.</li>
<li><strong>التوافق مع أطراف ثالثة</strong>: بالنسبة إلى المكوّنات القادمة من مكتبات خارجية لم تُصرَّف بـ React Compiler، يبقى <code>React.memo</code> أداة للتحكّم في معدّل تصييرها.</li>
<li><strong>التحكّم في الحدود</strong>: تريد أحيانًا فرض حدّ للتصيير — لنقل إنك تعرف أن شجرة فرعية ينبغي أن تتحدّث <em>فقط</em> عند تغيّر خاصية معيّنة، لا عندما يُعيد المكوّن الأب تصييره لأسباب غير ذات صلة. يتيح لك <code>React.memo</code> تثبيت هذا العقد في مكانه.</li>
</ul>
<h3 id="متى-لا-تزال-بحاجة-إلى-usememo">متى لا تزال بحاجة إلى useMemo</h3>
<ul>
<li><strong>الحسابات المكلفة</strong>: لا يخزّن المُصرِّف أي حسابات ثقيلة عشوائية سحرًا — بل يحسّن فقط ما يستطيع إثبات أنه آمن على مستوى التصيير. وإن كنت تعالج مجموعة بيانات ضخمة، فإن حفظ ذلك الحساب في الذاكرة يبقى مسؤوليتك.</li>
<li>استقرار المرجعية للاعتمادات: عندما تحتاج إلى تمرير قيمة ثابتة إلى اعتمادات <code>useEffect</code>/<code>useCallback</code>، يبقى <code>useMemo</code> هو الطريقة لتثبيتها. فلن يعيد المُصرِّف كتابة مصفوفات الاعتمادات لديك.</li>
<li><strong>منطق مساواة مخصّص</strong>: تحتاج أحيانًا إلى مساواة عميقة أو معايير محدّدة بدل المساواة السطحية. يبقى <code>useMemo</code> مطرقتك.</li>
</ul>
<h4>متى لا تزال بحاجة إلى useCallback</h4>
<ul>
<li><strong>هويات ثابتة لدوال الاستدعاء المرتد</strong>: إن كنت تمرّر دوال استدعاء مرتد نزولًا إلى أبناء محفوظين في الذاكرة بعمق (مصرَّفين أو غير مصرَّفين)، فقد تظلّ بحاجة إلى <code>useCallback</code> لتجنّب التقلّب. يستطيع المُصرِّف تضمين كثير من الإغلاقات البسيطة وحفظها في الذاكرة، لكنه لا يغطّي كل علاقة بين مكوّن ومكوّن.</li>
<li><strong>الإغلاقات المدفوعة بالاعتمادات</strong>: قد تحتاج دالة استدعاء مرتد تلتقط قيمًا متغيّرة بطرق دقيقة إلى <code>useCallback</code> صريح لإخبار React متى تعيد توليدها. ولن يتفوّق المُصرِّف على دلالات الإغلاق العشوائية.</li>
<li><strong>واجهات المكتبات</strong>: تتوقّع بعض الخُطّافات أو الواجهات الخارجية هويات دوال ثابتة (مثل تسجيل الأحداث وإدارة الاشتراكات). ويبقى <code>useCallback</code> ضروريًا في هذه السياقات.</li>
</ul>
<h3 id="suspense">Suspense</h3>
<p>يضيف Suspense منعطفًا إلى عملية التصيير في React Fiber.</p>
<p>يتيح Suspense للتصيير أن <strong>يرمي وعدًا</strong> (promise).</p>
<p>عندما يحدث ذلك، تُعلّم React ذلك الـ fiber بوصفه <em>معلّقًا</em> وتواصل طريقها عاملةً على ما تستطيع.</p>
<p>وعندما يُحلّ الوعد، تجدول React إعادة محاولة للمسارات المتأثّرة.</p>
<h4>مع الانتقالات (Transitions)</h4>
<p>عندما يُعلّق وعد شجرة مكوّنات، فإنها ترث الأولوية نفسها للشيء الذي سبّبها. فإذا أُنشئ ذلك الوعد داخل انتقال، فإن استئناف ما توقّف عنده يحافظ على الأولوية نفسها.</p>
<h3 id="usetransition">useTransition</h3>
<p>خُطّاف <code>useTransition</code> هو الطريقة الأساسية لإخبار React بأن تحديث حالة معيّنًا يمكن التعامل معه كأقل أولوية وغير عاجل.</p>
<p>بدون انتقال، فإن استدعاء <code>setState</code> من حدث إدخال مستخدم يضعه في مسار عالي الأولوية.</p>
<p>وقد يكون هذا <em>شيئًا غير جيد™</em> إن كنا على وشك القيام بأمر مكلف.</p>
<p><strong>بدون <code>useTransition()</code></strong>: ستُحفّز كل ضغطة مفتاح فورًا تحديثًا وتُعيد تصيير القائمة بالكامل. وكلما كتبت أكثر، <em>احتمل</em> أن يزداد الأمر سوءًا.</p>
<p><strong>مع <code>useTransition()</code></strong>: تحديث النص في حقل البحث عاجل بالتأكيد، ويمكننا أن نمنح المستخدم فورًا التغذية الراجعة البصرية التي يتوق إليها. ثم نكسب لأنفسنا بعض الوقت للقيام بالأمور المكلفة. وإن استطعنا أيضًا طرح العمل الذي لم يعد ذا صلة.</p>
<p>لا تجعل <code>useTransition()</code> <em>فعليًا</em> أي شيء أسرع، لكنها بالتأكيد تجعل كل شيء <em>يبدو</em> أسرع بضمان حدوث الأمور المهمّة لنا أولًا.</p>
<h3 id="usedeferredvalue">useDeferredValue</h3>
<p><code>useDefferedValue()</code> خُطّاف يقبل قيمة ويعيد نسخة جديدة <em>مؤجّلة</em> منها. ستتأخّر هذه النسخة المؤجّلة عن القيمة الأصلية أثناء التحديثات العاجلة.</p>
<p>عندما نستخدم <code>useDeferredValue</code>، فإننا نقول ببساطة:</p>
<blockquote>
<p>انتبه، قد يستغرق حساب هذه القيمة بعض الوقت. فلا تنتظرنا. تابع ما تفعله بالقيمة القديمة، وعندما تصبح الجديدة جاهزة يمكننا التحوّل إليها.</p>
</blockquote>
<p>مفاهيميًا، تخزّن React النسختين الحالية والمؤجّلة. وتواصل استخدام القيمة القديمة حتى تصبح القيمة الجديدة جاهزة.</p>
<p>يتضمّن هذا عملية من خطوتين:</p>
<ol>
<li>عند حدوث تحديث عاجل (مثل أن يكتب المستخدم شيئًا)، تبدأ React فورًا إعادة تصيير. خلال هذا التصيير الأول، لا يزال <code>deferredQuery</code> يحمل قيمته <em>السابقة</em>.</li>
<li>بعد اكتمال التصيير العاجل، تجدول React إعادة تصيير ثانية قابلة للمقاطعة في الخلفية. وفي هذا التصيير الثاني، يُحدَّث deferredQuery إلى أحدث قيمة.</li>
</ol>
<h3 id="المقارنة-بين-usetransition-و-usedeferredstate">المقارنة بين useTransition و useDeferredState</h3>
<ul>
<li>يلفّ <code>useTransition</code> <em>الفعل</em> أو <em>السبب</em> المؤدّي إلى التحديث. فأنت تلفّ دالة ضبط الحالة (مثل <code>setState</code>) داخل <code>startTransition</code> صراحةً. يمنحك هذا تحكّمًا مباشرًا في جدولة تحديث محدّد.</li>
<li>يلفّ <code>useDeferredValue</code> <em>نتيجة</em> التحديث. فأنت تمرّر إليه قيمة موجودة فيعيد نسخة مؤجّلة منها. يفيد هذا عندما يحدث تحديث الحالة نفسه في مكان آخر (مثل مكوّن أب أو مكتبة خارجية). وهو مفيد لتأجيل أثر قيمة <em>لا</em> تتحكّم بها.</li>
</ul>
<p>ثمّة فرق آخر هو كيفية تحديد ما إذا كان لدينا انتقال معلّق.</p>
<ul>
<li>يمنحك <code>useTransition()</code> قيمة منطقية <code>isPending</code>.</li>
<li>لا يمنحك <code>useDeferredValue()</code> ذلك، لكنك تملك القيمة الحالية والقيمة المؤجّلة معًا، فلا شيء يمنعك من استنتاج ذلك بنفسك.</li>
</ul>
<p><strong>باختصار</strong>: يقول <code>useTransition()</code>: «اعتبر هذا الإجراء منخفض الأولوية». ويقول <code>useDeferredValue()</code>: «دع هذه القيمة تتأخّر».</p>
<h4>كيف تختار</h4>
<ul>
<li>فضّل <code>useTransition()</code> عندما تتحكّم <em>أنت</em> في تحديث الحالة. فـ <code>useTransition()</code> يلفّ الدالة التي تحدّث الحالة.</li>
<li>فضّل <code>useDeferredValue</code> عندما <em>لا</em> تتحكّم في تحديث الحالة. فـ <code>useDeferred()</code> يلفّ القيمة نفسها.</li>
</ul>
<h3 id="useoptimistic">useOptimistic</h3>
<p>يتعامل <code>useTransition</code> و<code>useDeferredValue</code> فعليًا مع أداء التصيير لدينا. أما <code>useOptimistic</code> — في المقابل — فيتعامل مع كون التواصل مع الخوادم عبر الإنترنت قد يكون بطيئًا. فهو يتيح لنا أن نتصرف بتفاؤل وكأن كل شيء على ما يرام بينما ننتظر استجابة الخادم بالموافقة.</p>
<p>وإذا لم تسر الأمور كما هو متوقّع، سيساعدنا <code>useOptimistic</code> على التراجع تلقائيًا والتعامل مع واقع الموقف.</p>
<ul>
<li><strong>عند النجاح</strong>: سيُحدَّث المكوّن الأب لدينا، وسنستبدل البديل المتفائل المؤقّت بالقيمة الحقيقية.</li>
<li><strong>عند الفشل</strong>: سنعود إلى الحالة السابقة، ونترك واجهة المستخدم تتعامل مع الخطأ وتنقل الخبر إلى مستخدمنا.</li>
</ul>
<p>هل تستطيع فعل كل هذا يدويًا؟ <em>بالطبع</em>. هل تريد ذلك؟ قطعًا لا.</p>
<h3 id="react-compiler">React Compiler</h3>
<p>إذن، الحفظ اليدوي في الذاكرة فيه بعض المشكلات الجوهرية. وأولها وأهمّها أن عليك فعله فعلًا.</p>
<h2 id="ملحق">ملحق</h2>
<p>هناك مجموعة كاملة من المعلومات الممتعة التي <em>على الأرجح</em> لن نصل إليها اليوم، لكن لديّ بعض الملاحظات في حال أردت التوسّع فيها. بعضها مجرد مواد تكميلية أو مراجع في حال ألقى أحدكم عليّ سؤالًا مفاجئًا.</p>
<h3 id="أدلة-الترحيل">أدلّة الترحيل</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/react-compiler-migration-guide">دليل ترحيل React Compiler</a></li>
</ul>
<h2 id="العرض-من-الخادم-والبث-server-side-and-streaming">العرض من الخادم والبثّ (Server-Side and Streaming)</h2>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/optimizing-server-side-rendering">تحسين العرض من الخادم</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/streaming-ssr-optimization">تحسين البثّ في SSR</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/react-server-components-rsc">مكوّنات الخادم في React (RSC)</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/selective-hydration-react-19">الترطيب الانتقائي في React 19</a></li>
</ul>
<h3 id="أنماط-الأداء-الشائعة">أنماط الأداء الشائعة</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/windowing-and-virtualization">النوافذ والافتراضية</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/animation-performance">أداء الحركات</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/skeleton-screens-perceived-performance">شاشات الهياكل والأداء المُحسّ به</a></li>
</ul>
<h3 id="ميزات-react-المتقدمة">ميزات React المتقدّمة</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/react-cache-api">واجهة React Cache</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/flushsync-in-react-dom"><code>flushSync</code> في React DOM</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/uselayouteffect-performance">أداء <code>useLayoutEffect</code></a></li>
</ul>
<h3 id="استراتيجيات-تحميل-متقدمة">استراتيجيات تحميل متقدّمة</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/resource-preloading-apis">واجهات الجلب المسبق للموارد</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/priority-hints-resource-loading">تلميحات الأولوية وتحميل الموارد</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/cdn-caching-immutable-assets">التخزين المؤقّت في CDN والأصول غير القابلة للتغيير</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/service-worker-strategies">استراتيجيات عامل الخدمة</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/speculation-rules-bfcache">قواعد التوقّع و<code>bfcache</code></a></li>
<li><a href="https://stevekinney.com/courses/react-performance/image-and-asset-optimization">تحسين الصور والأصول</a></li>
</ul>
<h3 id="رسومات-وخيوط-متقدمة">رسومات وخيوط متقدّمة</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/web-workers-with-react">عمّال الويب مع React</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/view-transitions-api">واجهة View Transitions</a></li>
</ul>
<h3 id="الذاكرة-والمعمارية">الذاكرة والمعمارية</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/memory-management-deep-dive">إدارة الذاكرة</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/memory-leak-detection">الكشف عن تسريبات الذاكرة</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/micro-frontend-performance">أداء الواجهات المصغّرة</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/swc-speedy-web-compiler">SWC (مُصرّف الويب السريع)</a></li>
</ul>
<h3 id="المراقبة-والاختبار">المراقبة والاختبار</h3>
<ul>
<li><a href="https://stevekinney.com/courses/react-performance/inp-optimization-long-tasks">تحسين INP والمهام الطويلة</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/inp-production-monitoring">مراقبة INP في الإنتاج</a></li>
<li><a href="https://stevekinney.com/courses/react-performance/performance-testing-strategy">استراتيجية اختبار الأداء</a></li>
</ul>
`,i={book:e,chapter:n,chapterTitle:s,slug:t,title:l,headings:a,html:o};export{e as book,n as chapter,s as chapterTitle,i as default,a as headings,o as html,t as slug,l as title};
