const n="ocaml-manual",e="ch26",t="تتبّع زمن التشغيل بأحداث runtime",o="index",p="تتبّع زمن التشغيل بأحداث runtime",i=[{depth:2,id:"261-نظرة-عامة",text:"26.1 نظرة عامة"},{depth:2,id:"262-البنية",text:"26.2 البنية"},{depth:3,id:"2621-مصادر-الأحداث",text:"26.2.1 مصادر الأحداث"},{depth:3,id:"2622-نقل-الأحداث",text:"26.2.2 نقل الأحداث"},{depth:2,id:"263-الاستعمال",text:"26.3 الاستعمال"},{depth:3,id:"2631-باستعمال-واجهات-ocaml",text:"26.3.1 باستعمال واجهات OCaml"},{depth:3,id:"2632-باستعمال-الأدوات",text:"26.3.2 باستعمال الأدوات"},{depth:2,id:"264-أحداث-مخصصة",text:"26.4 أحداث مخصّصة"},{depth:3,id:"2641-نظرة-عامة",text:"26.4.1 نظرة عامة"},{depth:3,id:"2642-تتبع-أحداث-مخصصة-مثال",text:"26.4.2 تتبّع أحداث مخصّصة: مثال"}],l=`<h1>الفصل 26: تتبّع زمن التشغيل بأحداث runtime</h1>
<p>يصف هذا الفصل نظام تتبّع أحداث زمن التشغيل، الذي يتيح استخراجًا متواصلًا لمعلومات الأداء من زمن تشغيل OCaml بعبء إضافي ضئيل جدًّا. والنظام وواجهاته منخفضا المستوى ومرتبطان ارتباطًا وثيقًا بتنفيذ زمن التشغيل، والمقصود أن يعتمد المستخدمون النهائيون على الأدوات لاستهلاك البيانات ذات الأهمية وعرضها بصريًّا.</p>
<p>وتشمل البيانات المُصدَرة:</p>
<ul>
<li>
<p>أزمنة أحداث مراحل جامع القمامة وزمن التشغيل</p>
</li>
<li>
<p>أحجام الكومتين الصغرى والكبرى ونسب استغلالهما</p>
</li>
<li>
<p>معدّلات التخصيص والترقية بين الكومتين</p>
</li>
</ul>
<p>ويمكن تعريف أحداث إضافية واستهلاكها، ممّا يوفّر قدرات مراقبة أعلى مستوى لمكتبات OCaml. ويُشار إلى هذه الأحداث بـ<em>الأحداث المخصّصة</em>.</p>
<h2 id="261-نظرة-عامة">26.1 نظرة عامة</h2>
<p>ثمّة ثلاث فئات رئيسية من الأحداث التي يصدرها نظام أحداث زمن التشغيل:</p>
<p><strong>الامتدادات</strong></p>
<p>أحداث تمتدّ على مدة زمنية. فمثلًا، يصدر نظام تتبّع أحداث زمن التشغيل حدث امتداد يبدأ عند بدء جمع صغير في جامع القمامة في OCaml وينتهي عند إتمام الجمع. وقد تحتوي الامتدادات امتدادات أخرى، أي قد تصدر أحداث امتداد تبدأ بعد بدء جمع صغير وتنتهي قبله.</p>
<p><strong>أحداث دورة الحياة</strong></p>
<p>أحداث تقع في لحظة زمنية. فمثلًا، عند انتهاء نطاق، يصدر حدث دورة حياة مقابل.</p>
<p><strong>العدّادات</strong></p>
<p>أحداث تتضمّن قياسًا لكمية ذات أهمية. فمثلًا، عدد الكلمات المرفَّعة من الكومة الصغرى إلى الكبرى خلال آخر جمع صغير للقمامة يصدر بوصفه حدث عدّاد.</p>
<p>ونظام تتبّع أحداث زمن التشغيل مصمَّم للاستعمال في سياقات مختلفة:</p>
<p><strong>المراقبة الذاتية</strong></p>
<p>تستطيع برامج ومكتبات OCaml تركيب استدعاءاتها الراجعة الخاصة للاستماع إلى أحداث زمن التشغيل والتفاعل معها برمجيًّا، مثلًا لتصدير الأحداث إلى القرص أو عبر الشبكة.</p>
<p><strong>المراقبة الخارجية</strong></p>
<p>تستطيع عملية خارجية استهلاك أحداث زمن التشغيل لبرنامج OCaml يكون نظام تتبّعه قد مُمِّكن بضبط متغيّر البيئة المقابل.</p>
<p>يسجّل نظام تتبّع أحداث زمن التشغيل الأحداث في <em>مخزن حلقي</em>. وبالتالي تُطمَس الأحداث القديمة بأحداث جديدة. ويستطيع المستهلكون إمّا استهلاك الأحداث باستمرار، وإمّا أن يختاروا عدم فعل ذلك إلا استجابةً لظرف ما، مثلًا إذا استغرق استعلام أو عملية معيّنة وقتًا أطول من المتوقّع.</p>
<h2 id="262-البنية">26.2 البنية</h2>
<p>يتكوّن نظام التتبّع تصوّرًا من جزأين: 1) مصادر الأحداث التي تصدر الأحداث، و2) ناقل الأحداث الذي يبتلع هذه الأحداث وينقلها.</p>
<h3 id="2621-مصادر-الأحداث">26.2.1 مصادر الأحداث</h3>
<p>مصادر الأحداث نقاط مُصدِرة للأحداث. وثمّة عدد منها في نظام زمن تشغيل OCaml. وهي تنقسم كذلك إلى مجموعتين: 1) مصادر أحداث متاحة دائمًا، و2) مصادر أحداث متاحة في زمن التشغيل المجهَّز فقط. ومصادر الأحداث في زمن التشغيل المجهَّز تهمّ مطوّري زمن تشغيل OCaml وجامع القمامة بالأساس، وهي لا تتكوّن حاليًّا إلا من أحداث عدّاد حجم تخصيص الكومة الكبرى.</p>
<p>ويمكن العثور على المجموعة الكاملة للأحداث التي تصدرها مصادر الأحداث وتوثيقها في الوحدة <code>Runtime_events</code>.</p>
<h3 id="2622-نقل-الأحداث">26.2.2 نقل الأحداث</h3>
<p>يبتلع جزء نقل الأحداث من النظام الأحداثَ التي تصدرها مصادر الأحداث ويتيحها للمستهلكين.</p>
<h4>المخازن الحلقية</h4>
<p>تُنقل الأحداث باستعمال بنية بيانات تُعرف بـ<em>المخزن الحلقي</em>. وتتكوّن هذه البنية من مؤشرين إلى مصفوفة خطّية داعمة: مؤشر الذيل يشير إلى موضع يمكن كتابة أحداث جديدة فيه، ومؤشر الرأس يشير إلى أقدم حدث في المخزن يمكن قراءته. وعندما لا يتوفّر فراغ كافٍ في المصفوفة الداعمة لكتابة أحداث جديدة، يُقدَّم مؤشر الرأس وتُطمس أقدم الأحداث بأحداث جديدة.</p>
<p>ولا يمكن كتابة المخزن الحلقي المستعمل في أحداث زمن التشغيل من أكثر من منتج واحد في وقت واحد، لكن يمكن قراءته في الوقت نفسه من عدّة مستهلكين دون تنسيق من المنتج. وثمّة مخزن حلقي واحد لكل نطاق قيد التشغيل، وعند انتهاء نطاق قد يُعاد استعمال مخازنه الحلقية لنطاقات مولَّدة حديثًا. ولا تُخصَّص المخازن الحلقية (بما في ذلك للنطاق الرئيسي) إلا عند تمكين أحداث زمن التشغيل. وتُخزَّن المخازن نفسها في ملف مُخطَّط في الذاكرة يحمل اسمه معرّف العملية وامتداده <code>.events</code>، ممّا يتيح قراءتها من خارج عملية OCaml الرئيسية. انظر <code>Runtime_events</code> لمزيد من المعلومات.</p>
<h4>واجهات الاستهلاك</h4>
<p>يوفّر نظام تتبّع أحداث زمن التشغيل واجهتي OCaml وC، وكلتاهما قائمتان على المؤشرات وعلى السحب الدوري. والعملية عالية المستوى لاستهلاك الأحداث كما يلي:</p>
<ol>
<li>
<p>يُنشأ مؤشر عبر <code>Runtime_events.create_cursor</code> إمّا للعملية الحالية وإمّا لعملية خارجية (تُحدَّد بمسار ومعرّف عملية).</p>
</li>
<li>
<p>يُستدعى <code>Runtime_events.Callbacks.create</code> لتسجيل دالة راجعة تستقبل الأحداث.</p>
</li>
<li>
<p>يُسحب المؤشر دوريًّا عبر <code>Runtime_events.read_poll</code> باستعمال الاستدعاءات الراجعة المنشأة في الخطوة السابقة. ولكل حدث مطابق في المخازن الحلقية تُستدعى الدوال الراجعة المقدَّمة. وإضافةً إلى الأحداث المُصدَرة، تُمنح الاستدعاءات الراجعة معرّف نطاق المُصدِر وطابع زمن الإصدار.</p>
</li>
</ol>
<h2 id="263-الاستعمال">26.3 الاستعمال</h2>
<h3 id="2631-باستعمال-واجهات-ocaml">26.3.1 باستعمال واجهات OCaml</h3>
<p>نبدأ بمثال بسيط يطبع اسم كل حدث تصدره أدوات تتبّع أحداث زمن التشغيل وزمن بدئه وزمن انتهائه:</p>
<pre><code class="language-text">let runtime_begin _ ts phase =
    Printf.printf &quot;Begin\\t%s\\t%Ld\\n&quot;
        (Runtime_events.runtime_phase_name phase)
        (Runtime_events.Timestamp.to_int64 ts)

let runtime_end _ ts phase =
    Printf.printf &quot;End\\t%s\\t%Ld\\n&quot;
        (Runtime_events.runtime_phase_name phase)
        (Runtime_events.Timestamp.to_int64 ts)

let () =
    Runtime_events.start ();
    let cursor = Runtime_events.create_cursor None in
    let callbacks = Runtime_events.Callbacks.create ~runtime_begin ~runtime_end ()
    in
    while true do
        let list_ref = ref [] in (* for later fake GC work *)
        for _ = 1 to 100 do
            (* here we do some fake GC work *)
            list_ref := [];
            for _ = 1 to 10 do
                list_ref := (Sys.opaque_identity(ref 42)) :: !list_ref
            done;
            Gc.full_major ();
        done;
        ignore(Runtime_events.read_poll cursor callbacks None);
        Unix.sleep 1
    done
</code></pre>
<p>والخطوة التالية هي تصريف البرنامج وربطه بمكتبة runtime_events. ويمكن فعل ذلك كما يلي:</p>
<pre><code class="language-text">       ocamlopt -I +runtime_events -I +unix unix.cmxa runtime_events.cmxa
            example.ml -o example
</code></pre>
<p>وعند استعمال نظام البناء <em>dune</em>، يمكن بناء هذا المثال كما يلي:</p>
<pre><code class="language-text">(executable
 (name example)
 (modules example)
 (libraries unix runtime_events))
</code></pre>
<p>وتشغيل الملف التنفيذي المصرَّف للمثال يعطي خَرْجًا شبيهًا بما يلي:</p>
<pre><code class="language-text">Begin   explicit_gc_full_major  24086187297852
Begin   stw_leader      24086187298594
Begin   minor   24086187299404
Begin   minor_global_roots      24086187299807
End     minor_global_roots      24086187331461
Begin   minor_remembered_set    24086187331631
Begin   minor_finalizers_oldify 24086187544312
End     minor_finalizers_oldify 24086187544704
Begin   minor_remembered_set_promote    24086187544879
End     minor_remembered_set_promote    24086187606414
End     minor_remembered_set    24086187606584
Begin   minor_finalizers_admin  24086187606854
End     minor_finalizers_admin  24086187607152
Begin   minor_local_roots       24086187607329
Begin   minor_local_roots_promote       24086187609699
End     minor_local_roots_promote       24086187610539
End     minor_local_roots       24086187610709
End     minor   24086187611746
Begin   minor_clear     24086187612238
End     minor_clear     24086187612580
End     stw_leader      24086187613209
...
</code></pre>
<p>هذا مثال على المراقبة الذاتية، حيث يبدأ برنامج صراحةً الاستماع إلى أحداث زمن التشغيل ويراقب نفسه.</p>
<p>أمّا المراقبة الخارجية، فلا يحتاج البرنامج فيها إلى معرفة بوجود أحداث زمن التشغيل. ويمكن التحكّم في أحداث زمن التشغيل بمتغيّر البيئة <code>OCAML_RUNTIME_EVENTS_START</code> الذي، عند ضبطه، يجعل نظام التتبّع يبدأ عند تهيئة البرنامج.</p>
<p>ويمكننا حذف <code>Runtime_events.start ();</code> من المثال السابق، والاستدعاء بدلًا من ذلك كما يلي للحصول على النتيجة نفسها:</p>
<pre><code class="language-text">OCAML_RUNTIME_EVENTS_START=1 ./example
</code></pre>
<h4>متغيّرات البيئة</h4>
<p>يمكن استعمال متغيّرات البيئة للتحكّم في جوانب مختلفة من نظام تتبّع أحداث زمن التشغيل. ومتغيّرات البيئة المتاحة هي:</p>
<ul>
<li>
<p><code>OCAML_RUNTIME_EVENTS_START</code>: عند ضبطه يجعل نظام أحداث زمن التشغيل يبدأ ضمن تهيئة زمن تشغيل OCaml.</p>
</li>
<li>
<p><code>OCAML_RUNTIME_EVENTS_DIR</code>: يضبط الدليل الذي ستوضع فيه ملفات <code>.events</code> الحاوية للمخازن الحلقية لنظام تتبّع أحداث زمن التشغيل. وإذا لم يكن موجودًا يُستعمل دليل عمل البرنامج.</p>
</li>
<li>
<p><code>OCAML_RUNTIME_EVENTS_PRESERVE</code>: عند ضبطه يجعل زمن تشغيل OCaml يحافظ على ملفات المخازن الحلقية لأحداث زمن التشغيل بعد انتهاء برنامج OCaml. ويفيد ذلك في مراقبة البرامج القصيرة جدًّا. وإذا لم يُضبط، تُحذف ملفات <code>.events</code> الخاصة ببرنامج OCaml عند انتهاء البرنامج.</p>
</li>
</ul>
<p>ويمكن ضبط حجم المخازن الحلقية لأحداث زمن التشغيل عبر <code>OCAMLRUNPARAM</code>، انظر القسم 15.2 لمزيد من المعلومات.</p>
<h4>البناء مع زمن التشغيل المجهَّز</h4>
<p>بعض الأحداث لا يصدرها إلا زمن التشغيل المجهَّز. ولتلقّيها، يلزم تصريف برنامج OCaml وربطه في زمن التشغيل المجهَّز. وبرنامجنا المثالي السابق، يُنجَز ذلك كما يلي:</p>
<pre><code class="language-text">ocamlopt -runtime-variant i -I +runtime_events -I +unix unix.cmxa runtime_events.cmxa example.ml -o example
</code></pre>
<p>ولـ dune:</p>
<pre><code class="language-text">(executable
 (name example)
 (modules example)
 (flags &quot;-runtime-variant=i&quot;)
 (libraries unix runtime_events))
</code></pre>
<h3 id="2632-باستعمال-الأدوات">26.3.2 باستعمال الأدوات</h3>
<p>الوصول البرمجي إلى الأحداث مقصود به بالأساس كاتبو مكتبات الرصد والأدوات للمستخدمين النهائيين. فالواجهة المرنة تتيح استعمال بيانات الأداء من أحداث زمن التشغيل لأغراض التسجيل والمراقبة.</p>
<p>وفي هذا القسم نتناول عدّة أدوات مساعدة في حزمة <code>runtime_events_tools</code> توفّر طرقًا بسيطة لاستخراج بيانات أحداث زمن التشغيل وتلخيصها. وأداة trace بصفة خاصة تنتج بيانات شبيهة بتلك التي ينتجها نظام تجهيز «eventlog» السابق المتوفّر في OCaml 4.12 حتى 4.14.</p>
<p>أولًا، ثبّت <code>runtime_events_tools</code> في تبديل opam للإصدار OCaml 5.0 فما فوق:</p>
<pre><code class="language-text">opam install runtime_events_tools
</code></pre>
<p>ومن المفروض أن يثبّت ذلك أداة olly في مسارك. ويمكنك الآن توليد تتبّعات زمن التشغيل للبرامج المصرَّفة بـ OCaml 5.0 فما فوق باستعمال الأمر الفرعي trace:</p>
<pre><code class="language-text">olly trace trace.json &#x27;your_program.exe .. args ..&#x27;
</code></pre>
<p>وستولَّد بيانات تتبّع زمن التشغيل بصيغة JSON Trace Event في الملف trace.json. ويمكن بعدها تحميل هذا الملف في عارض تتبّع Chrome أو في <a href="https://ui.perfetto.dev/">Perfetto</a> لعرض التتبّع المجموع بصريًّا.</p>
<h4>قياس كمون جامع القمامة</h4>
<p>تتضمّن أداة olly أيضًا أمرًا فرعيًّا اسمه latency يستهلك بيانات أحداث زمن التشغيل ويصدر عند اكتمال البرنامج ملخّصًا قابلًا للتحليل على هيئة مدراج لتوزيع مدد التوقّف. ويمكن تشغيلها كما يلي:</p>
<pre><code class="language-text">olly latency &#x27;your_program.exe .. args ..&#x27;
</code></pre>
<p>ومن المفروض أن ينتج ذلك خَرْجًا شبيهًا بما يلي:</p>
<pre><code class="language-text">GC latency profile:
#[Mean (ms):  2.46,   Stddev (ms):  3.87]
#[Min (ms):  0.01,   max (ms):  9.17]

Percentile    Latency (ms)
25.0000    0.01
50.0000    0.23
60.0000    0.23
70.0000    0.45
75.0000    0.45
80.0000    0.45
85.0000    0.45
90.0000    9.17
95.0000    9.17
96.0000    9.17
97.0000    9.17
98.0000    9.17
99.0000    9.17
99.9000    9.17
99.9900    9.17
99.9990    9.17
99.9999    9.17
100.0000    9.17
</code></pre>
<h2 id="264-أحداث-مخصصة">26.4 أحداث مخصّصة</h2>
<h3 id="2641-نظرة-عامة">26.4.1 نظرة عامة</h3>
<p>يدعم نظام أحداث زمن التشغيل تعريف أحداث مخصّصة. وهذه الأحداث، المعرَّفة باسم فريد عالميًّا، تصدر بحمولات من أنواع مدمجة (<code>unit</code>، <code>int</code>، <code>span</code>) وأنواع يعرّفها المستخدم. ولاستيعاب التعامل مع الأحداث المخصّصة، يفيد معرفة كيف تُنقل وتُخزَّن: فتمثيلها يتكوّن من سلسلة اسم (وهي في الحقيقة فهرس في مصفوفة تضمّ جميع الأسماء المخصّصة) ومن متتالية بايتات اعتباطية. ويمكن <em>تسجيل</em> أنواع الأحداث المخصّصة بتقديم دالّتي ترميز وفكّ ترميز من وإلى متتالية بايتات، عبر الدالة <code>Runtime_events.Type.register</code>.</p>
<p>ويُنجَز تعريف حدث مخصّص جديد (سواء كانت حمولته من نوع مدمج أو من نوع مخصّص) بدالة تسجيل أخرى هي <code>Runtime_events.User.register</code>. وتسجّل هذه الدالة الارتباط بين اسم الحدث المخصّص ونوعه و<em>وسم</em>. ثم يُستعمل الوسم عند إصدار الأحداث المخصّصة أو استهلاكها؛ فهو يعمل اختصارًا لاسم الحدث.</p>
<p>وما إن يُسجَّل حدث، تُصدَر قيم ذلك الحدث باستعمال <code>Runtime_events.User.write</code>.</p>
<p>وخلاصةً، كي يصدر مستخدم أحداثًا مخصّصة ويستهلكها باستعمال نوع مخصّص، عليه أن:</p>
<ol>
<li>
<p>يسجّل النوع المخصّص</p>
</li>
<li>
<p>يوسّع المتغيّر <code>Runtime_events.User.tag</code> بباني جديد</p>
</li>
<li>
<p>يسجّل الحدث المخصّص الجديد، رابطًا اسم الحدث المخصّص الجديد والوسم الجديد والنوع المخصّص الجديد</p>
</li>
<li>
<p>يصدر حالات من الحدث باستعمال <code>Runtime_events.User.write</code></p>
</li>
<li>
<p>يشير إلى استدعاء راجع ينبغي أن يستقبل كل أحداث النوع المخصّص باستعمال <code>Runtime_events.Callbacks.add_user_event</code>، لتسجيله داخل كائن <code>Runtime_events.Callbacks.t</code> يُستعمل عند السحب الدوري (انظر القسم 26.3.1 أعلاه).</p>
</li>
<li>
<p><em>(اختياري، إذا كانت ثمة أحداث متمايزة مسجَّلة بالنوع المخصّص نفسه:)</em> في ذلك الاستدعاء الراجع، يطابق نمطيًّا على وسم الحدث لتمييز الوسوم المختلفة للنوع المخصّص نفسه.</p>
</li>
</ol>
<p>ولاحظ أنه إذا كان المُصدِر والمستهلك برنامجين مختلفين، فعلى كليهما إنجاز الخطوات 1 إلى 3 لتسجيل الأحداث المخصّصة وأنواع الأحداث المخصّصة (إن وُجدت). ولاحظ أن قيم الوسوم لا يلزم أن تكون واحدة في البرنامجين؛ فالقيم الوحيدة التي ينبغي أن تتطابق هي الأسماء.</p>
<p>والأحداث غير المسجَّلة للأنواع المعرَّفة من المستخدم تُتجاهل حاليًّا. وكخيار بديل، تتوفّر الأحداث المخصّصة غير المسجَّلة من نوع مدمج، لكنها كلها موسومة <code>UNK</code> (مجهولة).</p>
<p>وهكذا ثمّة ثلاث حالات للمستهلك عند تلقّي حدث:</p>
<ul>
<li>
<p>الحدث مسجَّل: تتوفّر الحمولة والوسم.</p>
</li>
<li>
<p>الحدث غير مسجَّل وله نوع حدث مدمج (unit، int، span): تتوفّر الحمولة فقط.</p>
</li>
<li>
<p>الحدث غير مسجَّل وله نوع حدث مخصّص: يُهمَل الحدث.</p>
</li>
</ul>
<p>ولاحظ أن مستهلكي الأحداث يربطون الاستدعاءات الراجعة بـ<em>أنواع</em> الأحداث، فيمكنهم العمل كمستمعين عامّين يفسّرون الحمولات الآتية من أحداث غير مسجَّلة. ولأن ذلك لا يعمل إلا مع أحداث الأنواع المدمجة، فقد يفيد إصدار الأحداث في أزواج: حدث من نوع مخصّص مع حدث من نوع مدمج، ممّا يتيح تصميم مستهلك متخصّص مع البقاء متوافقًا مع أدوات التتبّع العامة.</p>
<h3 id="2642-تتبع-أحداث-مخصصة-مثال">26.4.2 تتبّع أحداث مخصّصة: مثال</h3>
<p>يستعمل البرنامج التالي الوحدتين <code>Runtime_events.User</code> و<code>Runtime_events.Type</code> لتعريف حدثين مخصّصين يقدّمان قيمتي <code>span</code> و<code>int</code>. ويُوسَّع المتغيّر القابل للتمديد <code>tag</code> بـ<code>CustomSpan</code> و<code>CustomInt</code>.</p>
<pre><code class="language-text">type Runtime_events.User.tag += CustomSpan | CustomInt

let count_span =
    Runtime_events.User.register &quot;count.span&quot; CustomSpan
        Runtime_events.Type.span

let count_value =
    Runtime_events.User.register &quot;count.value&quot; CustomInt
        Runtime_events.Type.int

let count () =
    Runtime_events.User.write count_span Begin;
    for i = 1 to 5 do
        Runtime_events.User.write count_value i
    done;
    Runtime_events.User.write count_span End

let () =
    Runtime_events.start ();
    for _ = 1 to 3 do
        count ()
    done
</code></pre>
<p>وعلى جانب المستهلك، يمكن استعمال وسم الحدث ونوعه المقدَّمين للمطابقة على الأحداث ذات الصلة. وللتمام، نفترض أن المستهلك برنامج مختلف، ونكرّر تعريف بواني الوسم الجديدة وتسجيل الأحداث المخصّصة.</p>
<pre><code class="language-text">type Runtime_events.User.tag += CustomSpan | CustomInt

let count_span =
    Runtime_events.User.register &quot;count.span&quot; CustomSpan
        Runtime_events.Type.span

let count_value =
    Runtime_events.User.register &quot;count.value&quot; CustomInt
        Runtime_events.Type.int

let span_event_handler domain_id ts event value =
    (* we&#x27;re only interested in our CustomSpan event *)
    match Runtime_events.User.tag event, value with
    | CustomSpan, Runtime_events.Type.Begin -&gt; Printf.printf &quot;&gt; count begin\\n&quot;
    | CustomSpan, End -&gt; Printf.printf &quot;&lt; count end\\n&quot;
    | _ -&gt; ()

let int_event_handler domain_id ts event value =
    (* we&#x27;re only interested in our CustomInt event *)
    match Runtime_events.User.tag event with
    | CustomInt -&gt; Printf.printf &quot;| count %d\\n&quot; value
    | _ -&gt; ()

let () =
    let open Runtime_events in
    let cursor = create_cursor None in
    let callbacks =
        Callbacks.create ()
        |&gt; Callbacks.add_user_event Type.span span_event_handler
        |&gt; Callbacks.add_user_event Type.int int_event_handler
    in
    for _ = 0 to 100 do
        ignore(read_poll cursor callbacks None)
    done
</code></pre>
<p>ممّا يعطي الخَرْج التالي:</p>
<pre><code class="language-text">&gt; count begin
| count 1
| count 2
| count 3
| count 4
| count 5
&lt; count end
&gt; count begin
| count 1
| count 2
[...]
</code></pre>
`,s={book:n,chapter:e,chapterTitle:t,slug:o,title:p,headings:i,html:l};export{n as book,e as chapter,t as chapterTitle,s as default,i as headings,l as html,o as slug,p as title};
