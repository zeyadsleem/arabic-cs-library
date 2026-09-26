---
title: "إطار عمل ويب قائم على الأحداث"
lang: ar
source: https://aosabook.org/en/500L/event-web-framework.html
---

_Leo (المعروف أكثر على الإنترنت باسم inaimathi) هو مصمم جرافيك سابق يحكم على نفسه بأنه يواصل التعلّم، وقد كتب مهنياً بلغات Scheme وCommon Lisp وErlang وJavascript وHaskell وClojure وGo وPython وPHP وC. وهو حالياً يكتب مدونة عن البرمجة، ويلعب ألعاب اللوح، ويعمل في شركة ناشئة قائمة على Ruby في تورونتو، أونتاريو._


في عام 2013، قرّرت أن أكتب [أداة أولية لنمذجة الألعاب عبر الويب](https://github.com/Inaimathi/deal) لألعاب البطاقات وألعاب اللوح، وسمّيتها _House_. في هذا النوع من الألعاب، من الشائع أن ينتظر لاعبٌ آخرَ لاعباً ليقوم بخطوة؛ غير أن حين يتخذ اللاعب الآخر قراره في النهاية، نودّ لو أُبلغ اللاعب المنتظر بتلك الخطوة بسرعة تالية.

تبيّن أن هذه المشكلة أعقد مما تبدو للوهلة الأولى. في هذا الفصل، سنستعرض المشكلات التي تنشأ عن استخدام HTTP لبناء هذا النوع من التفاعل، ثم سنبني _إطار عمل ويب_ (web framework) بلغة Common Lisp يتيح لنا حل مشكلات مماثلة في المستقبل.

## أساسيات خوادم HTTP

في أبسط مستوياته، يتمثّل التبادل عبر HTTP من طلب (request) واحد يليه استجابة (response) واحدة. يُرسل _عميل_ (client) طلباً يتضمن مُعرِّف مورد، ووسم إصدار HTTP، وبعض الترويسات (headers)، وبعض المعاملات (parameters). يحلّل _الخادم_ (server) ذلك الطلب، ويقرّر ما العمل حياله، ثم يرسل استجابة تتضمن وسم إصدار HTTP نفسه، وشيفرة استجابة، وبعض الترويسات، وجسم استجابة.

لاحظ أن هذا الوصف يجعل الخادم يستجيب لطلب وارد من عميل محدد. أما في حالتنا فنحن نريد لكل لاعب أن يُحدَّث بـ_أي_ خطوات بمجرد حدوثها، لا أن يتلقى إشعارات فقط حين تكون حركته هي التي قُدِّمت. وهذا يعني أننا نحتاج إلى أن _يدفع_ (push) الخادم الرسائل إلى العملاء دون أن يتلقى أولاً طلباً يطلب هذه المعلومات.[^polling]

[^polling]: أحد الحلول لهذه المشكلة هو إجبار العملاء على _الاستطلاع_ (polling) للخادم. أي أن كل عميل يرسل إلى الخادم طلباً دورياً يسأله فيه هل تغيّر شيء. هذا قد ينجح مع التطبيقات البسيطة، لكن في هذا الفصل سنركّز على الحلول المتاحة أمامك عندما يتوقف هذا النموذج عن العمل.

هناك عدة مقاربات قياسية لتفعيل الدفع من الخادم (server push) عبر HTTP.

### Comet/الاستطلاع الطويل

تقنية «الاستطلاع الطويل» (long poll) تجعل العميل يرسل إلى الخادم طلباً جديداً بمجرد أن يتلقى استجابة. وبدلاً من الوفاء بذلك الطلب فوراً، ينتظر الخادم حدوثَ حدثٍ لاحق كي يستجيب. وهذا فرقٌ دقيق في المعنى، لأن العميل يظل يبدأ طلبًا جديدًا مع كل تحديث.

### الأحداث المُرسَلة من الخادم (SSE)

تتطلب الأحداث المُرسَلة من الخادم (Server-Sent Events) أن يبدأ العميل اتصالاً ثم يبقيه مفتوحاً. ويكتب الخادم بيانات جديدة دورياً في هذا الاتصال دون إغلاقه، ويفسّر العميل الرسائل الواردة الجديدة فور وصولها بدلاً من انتظار انتهاء اتصال الاستجابة. وهذا أكثر كفاءة قليلاً من مقاربة Comet/الاستطلاع الطويل، لأن كل رسالة لا تتحمّل عبء ترويسات HTTP جديدة.

### WebSockets

WebSockets بروتوكول اتصالات مبني فوق HTTP. يفتح الخادم والعميل محادثة عبر HTTP، ثم يُجريان مصافحة (handshake) ويجريان ترقية البروتوكول. والنتيجة النهائية أنهما لا يزالان يتواصلان عبر TCP/IP، لكنهما لا يستخدمان HTTP في ذلك على الإطلاق. وميزة هذا الأمر على SSE هي إمكانية تخصيص البروتوكول لأجل الكفاءة.

### الاتصالات طويلة العمر

هذه المقاربات الثلاث تختلف كثيراً عن بعضها، لكنها تشترك جميعها في صفة مهمة: فهي جميعها تعتمد على اتصالات طويلة العمر. فالاستطلاع الطويل يعتمد على إبقاء الخادم الطلبات عالقة حتى تتوفر بيانات جديدة، وSSE يبقي تدفقاً مفتوحاً بين العميل والخادم تُكتب فيه البيانات دورياً، وWebSockets تغيّر البروتوكول الذي تستخدمه إمكانية بعينها ثم تتركها مفتوحة.

ولكي نرى لماذا قد يسبب هذا مشكلات لخادم HTTP عادي، لننظر في كيفية عمل التنفيذ الأساسي.

### بنية خادم HTTP التقليدية
\label{sec.eventsweb.serverarch}

يعالج خادم HTTP واحد طلبات كثيرة على التوازي. وتاريخياً، استخدمت خوادم HTTP كثيرة بنية _خيط لكل طلب_ (thread-per-request). أي أن الخادم، لكل طلب وارد، ينشئ خيطاً (thread) يقوم بالعمل اللازم للردّ.

ولأن كل واحد من هذه الاتصالات مقصود به أن يكون قصير العمر، فلا نحتاج إلى خيوط كثيرة تعمل على التوازي للتعامل معها جميعاً. كما أن هذا النموذج يُبسّط _التنفيذ_ (implementation) للخادم، إذ يتيح لمبرمج الخادم أن يكتب الشيفرة وكأنه يعالج اتصالاً واحداً فقط في كل لحظة. وهو أيضاً يمنحنا حرية التنظيف من الاتصالات الفاشلة أو «الزومبية» ومواردها المرتبطة، بقتل الخيط المقابل وترك جامع القمامة يؤدي عمله.

الملاحظة الجوهرية هي أن خادم HTTP الذي يستضيف تطبيق ويب «تقليدياً» لديه $N$ مستخدم متزامن قد لا يحتاج سوى معالجة نسبة صغيرة جداً من طلبات $N$ _على التوازي_ كي ينجح. أما نوع التطبيق التفاعلي الذي نحاول بناءه، فإن $N$ من المستخدمين ستتطلب بالتأكيد أن يحافظ التطبيق على $N$ اتصال على الأقل على التوازي، في وقت واحد.

النتيجة للإبقاء على الاتصالات طويلة العمر هي أننا سنحتاج إما إلى:

- منصة تكون فيها الخيوط «رخيصة» بما يكفي ل يمكننا استخدام أعداد كبيرة منها في وقت واحد.
- بنية خادم قادرة على معالجة اتصالات كثيرة بخيط واحد.

هناك بيئات برمجية مثل [Racket](http://racket-lang.org/) و[Erlang](http://www.erlang.org/) و[Haskell](http://hackage.haskell.org/package/base-4.7.0.1/docs/Control-Concurrent.html) توفّر بِنَى شبيهة بالخيوط «خفيفة» بما يكفي للنظر في الخيار الأول. ويتطلب هذا الأسلوب من المبرمج أن يتعامل صراحةً مع مشكلات التزامن (synchronization)، التي ستكون أكثر انتشاراً بكثير في نظام تبقى فيه الاتصالات مفتوحة وقتاً طويلاً ويحتمل أن يتنافس فيها الجميع على موارد متشابهة. وتحديداً، إذا كان لدينا نوع من البيانات المركزية تتشاركها عدة مستخدمين في وقت واحد، فسنحتاج إلى تنسيق عمليات القراءة والكتابة على تلك البيانات بطريقة ما.

وإن لم تكن الخيوط الرخيصة متاحة لنا، أو كنا غير مستعدين للعمل مع التزامن الصريح، فعلينا أن نضع في الحسبان أن يتولى خيط واحد معالجة اتصالات كثيرة.[^mn] وفي هذا النموذج، سيكون خيطنا الفردي يتعامل في الوقت نفسه مع «شذرات» (slices) دقيقة من طلبات كثيرة، مبدّلاً بينها بأكبر قدر ممكن من الكفاءة. ويُشار إلى نمط بنية النظام هذا عادةً بأنه _قائم على الأحداث_ (event-driven) أو _مبني على الأحداث_ (event-based).[^eventbased]

[^mn]: يمكننا أن نضع في الحسبان نظاماً أكثر عمومية يتعامل مع $N$ مستخدماً متزامناً باستخدام $M$ خيطاً بالنسبة لقيمة $M$ قابلة للتهيئة؛ في هذا النموذج، يُقال إن اتصالات $N$ مُوزَّعة تعددياً (multiplexed) على الخيوط $M$. وفي هذا الفصل، سنركّز على كتابة برنامج تكون فيه $M$ ثابتة عند 1؛ غير أن الدروس المستفادة هنا قد تنطبق جزئياً على النموذج الأكثر عمومية.

[^eventbased]: هذه التسمية مربكة بعض الشيء، ومصدرها أبحاث أنظمة التشغيل المبكرة. فهي تشير إلى كيفية إتمام الاتصال بين العمليات المتزامنة المتعددة. وفي نظام قائم على الخيوط، يتم الاتصال عبر مورد مُزامن مثل الذاكرة المشتركة. أما في نظام قائم على الأحداث، فتتواصل العمليات عموماً عبر طابور (queue) تنشر فيه عناصر تصف ما فعلته أو ما تريد فعله، وهو ما يتولى صيانته خيط التنفيذ الفردي لدينا. وبما أن هذه العناصر تصف عموماً إجراءات مطلوبة أو سابقة،فيُشار إليها بـ«الأحداث» (events).

وبما أننا لا ندير سوى خيط واحد، فلا نحتاج إلى القدر نفسه من القلق بشأن حماية الموارد المشتركة من الوصول المتزامن. غير أن لدينا مشكلة فريدة خاصة بنا في هذا النموذج. وبما أن خيطنا الفردي يعمل على جميع الطلبات الجاري تنفيذها في وقت واحد، فيجب أن نتأكد من أنه __لا يحجب أبداً__ (never blocks). فالحجب على أي اتصال يحجب الخادم بأكمله عن إحراز التقدم في أي طلب آخر. علينا أن نكون قادرين على الانتقال إلى عميل آخر إذا تعذّرت خدمة الحالي، وأن نكون قادرين على ذلك بطريقة لا تُهدِر العمل الذي أُنجز حتى الآن.[^crawler]

[^crawler]: انظر \aosachapref{s:crawler} لمقاربة أخرى لهذه المشكلة.

ورغم أنه من غير المعتاد أن يطلب مبرمج من خيط صراحةً أن يتوقف عن العمل، فإن كثيراً من العمليات الشائعة تحمل خطر الحجب. ولأن الخيوط منتشرة إلى هذا الحد، ولأن التفكير في اللاتزامنية عبء ثقيل على المبرمج، تفترض كثير من اللغات وأطرها أن الحجب على الإدخال/الإخراج (I/O) صفة مرغوبة. وهذا يجعل من السهل جداً أن تحجب في مكان ما _عرضاً_. لحسن الحظ، توفّر لنا Common Lisp مجموعة دنيا من أوّليات الإدخال/الإخراج اللاتزامني (asynchronous I/O) التي يمكننا البناء فوقها.

### القرارات المعمارية

الآن وقد درسنا خلفية هذه المشكلة، وصلنا إلى النقطة التي يجب أن نتخذ عندها قرارات مبنية على المعرفة بشأن _ماذا_ نبني.

في الوقت الذي بدأت فيه التفكير في هذا المشروع، لم تكن Common Lisp تملك تنفيذاً كاملاً لـgreen-thread، كما أن [مكتبة الخيوط القياسية القابلة للنقل](http://common-lisp.net/project/bordeaux-threads/) لا تستوفي شرط «really REALLY cheap» أي الرخيصة حقًا. وانحصر الخياران في إما اختيار لغة أخرى، أو بناء خادم ويب قائم على الأحداث لغرضي. وقد اخترت الثاني.

إلى جانب بنية الخادم، نحتاج أيضاً إلى اختيار أيّ من مقاربات الدفع من الخادم الثلاث نستخدم. إن حالة الاستخدام التي نفكر فيها (لعبة لوح جماعية تفاعلية) تتطلب تحديثات متكررة لكل عميل، لكن طلبات _صادرة_ عن كل عميل ومتباعدة نسبياً، وهذا يناسب مقاربة SSE في دفع التحديثات، لذا سنعتمد عليها.

الآن وقد بررنا قرارنا المعماري وقررنا آلية لمحاكاة الاتصال ثنائي الاتجاه بين العملاء والخادم، فلنبدأ في بناء إطار عمل الويب. سنبدأ أولًا ببناء خادم «غبي» نسبيًا، ثم نوسّعه ليصبح إطار عمل لتطبيقات الويب يتيح لنا التركيز على _ماذا_ يحتاج برنامجنا شديد التفاعل أن يفعله، لا على _كيف_ يقوم بذلك.

## بناء خادم ويب قائم على الأحداث

معظم البرامج التي تستخدم عملية واحدة لإدارة تدفقات عمل متزامنة
تستخدم نمطاً يسمى _حلقة الأحداث_ (event loop). لننظر في شكل حلقة الأحداث
التي قد تكون لخادم الويب لدينا.

### حلقة الأحداث

تحتاج حلقة الأحداث لدينا إلى:

- الاستماع إلى الاتصالات الواردة؛
- معالجة كل المصافحات الجديدة أو البيانات الواردة على الاتصالات القائمة؛
- تنظيف المقابس المعلقة التي قُتلت بشكل غير متوقع (مثلًا بسبب مقاطعة)

```lisp
(defmethod start ((port integer))
  (let ((server (socket-listen
		 usocket:*wildcard-host* port
		 :reuse-address t
		 :element-type 'octet))
	(conns (make-hash-table)))
    (unwind-protect
	 (loop (loop for ready
		  in (wait-for-input
		      (cons server (alexandria:hash-table-keys conns))
		      :ready-only t)
		  do (process-ready ready conns)))
      (loop for c being the hash-keys of conns
	 do (loop while (socket-close c)))
      (loop while (socket-close server)))))
```

إذا لم تكن قد كتبت برنامج Common Lisp من قبل، فإن كتلة الشيفرة هذه تحتاج إلى بعض الشرح. ما كتبناه هنا هو _تعريف دالة_ (method definition). ولئن كانت Lisp معروفة على أنها لغة وظيفية، فإنها تمتلك أيضًا نظامها الخاص للبرمجة كائنية التوجه اسمه «نظام كائنات Common Lisp»، ويختصر عادةً بـ«CLOS».[^CLOSpronounce]

[^CLOSpronounce]: تُنطق «kloss» أو «see-loss» أو «see-lows»، تبعًا لمن تسأله.

### CLOS والدوال العامة

في CLOS، بدلاً من التركيز على الأصناف (classes) والدوال، نكتب [_دوالاً عامة_](http://www.gigamonkeys.com/book/object-reorientation-generic-functions.html) تُنفَّذ كمجموعات من _دوال_ (methods). وفي هذا النموذج، لا _تنتمي_ الدوال إلى الأصناف، بل _تتخصص على_ (specialize on) الأنواع.[^juliachap] ودالة `start` التي كتبناها للتو هي دالة أحادية (unary method) يكون فيها الوسيط `port` _متخصصاً على_ النوع `integer`. وهذا يعني أننا نستطيع أن نمتلك عدة تطبيقات (implementations) لدالة `start` يختلف فيها نوع `port`، وسيختار وقت التشغيل أي تطبيق يستخدمه بحسب نوع `port` عند استدعاء `start`.

[^juliachap]: لغة البرمجة Julia تتبنى مقاربة مشابهة للبرمجة كائنية التوجه؛ يمكنك التعلم المزيد عنها في \aosachapref{s:static-analysis}.

وبشكل أعم، يمكن للدوال أن تتخصص على أكثر من وسيط واحد. فعند استدعاء `method`، يقوم وقت التشغيل بـ:

- التوجيه (dispatch) على نوع وسائطه ليقرّر أي جسم دالة ينبغي تشغيله، و
- تشغيل الدالة المناسبة.

### معالجة المقابس

سنرى دالة عامة أخرى تعمل في `process-ready`، والتي استُدعيت في وقت سابق من حلقة الأحداث لدينا. وهي تعالج مقبساً جاهزاً بإحدى دالتين، بحسب نوع المقبس الذي نعينه.

النوعان اللذان نهتم بهما هما `stream-usocket`، الذي يمثّل مقبس عميل سيقوم بطلب ويتوقع إرسال بعض البيانات إليه في المقابل، و`stream-server-usocket`، الذي يمثّل مستمع TCP المحلي لدينا وستصلنا اتصالات عملاء جدد نتعامل معها.

إذا كان `stream-server-socket` في حالة `ready`، فهذا يعني وجود مقبس عميل جديد في انتظار بدء محادثة. نستدعي `socket-accept` لقبول الاتصال، ثم نضع النتيجة في جدول الاتصالات لدينا كي تبدأ حلقة الأحداث بمعالجته مع البقية.

```lisp
(defmethod process-ready ((ready stream-server-usocket) (conns hash-table))
  (setf (gethash (socket-accept ready :element-type 'octet) conns) nil))
```

عندما يكون `stream-usocket` في حالة `ready`، فهذا يعني أنه لدينا بعض البايتات جاهزة للقراءة. (ومن الممكن أيضاً أن يكون الطرف الآخر قد أنهى الاتصال.)

```lisp
(defmethod process-ready ((ready stream-usocket) (conns hash-table))
  (let ((buf (or (gethash ready conns)
		 (setf (gethash ready conns)
		       (make-instance 'buffer :bi-stream (flex-stream ready))))))
    (if (eq :eof (buffer! buf))
	(ignore-errors
	  (remhash ready conns)
	  (socket-close ready))
	(let ((too-big?
	       (> (total-buffered buf)
		  +max-request-size+))
	      (too-old?
	       (> (- (get-universal-time) (started buf))
		  +max-request-age+))
	      (too-needy?
	       (> (tries buf)
		  +max-buffer-tries+)))
	  (cond (too-big?
		 (error! +413+ ready)
		 (remhash ready conns))
		((or too-old? too-needy?)
		 (error! +400+ ready)
		 (remhash ready conns))
		((and (request buf) (zerop (expecting buf)))
		 (remhash ready conns)
		 (when (contents buf)
		   (setf (parameters (request buf))
			 (nconc (parse buf) (parameters (request buf)))))
		 (handler-case
		     (handle-request ready (request buf))
		   (http-assertion-error () (error! +400+ ready))
		   ((and (not warning)
		     (not simple-error)) (e)
		     (error! +500+ ready e))))
		(t
		 (setf (contents buf) nil)))))))
```

هذا أكثر تعقيداً من الحالة الأولى. نحن:

1. نأخذ المخزن المؤقت (buffer) المرتبط بهذا المقبس، أو ننشئه إن لم يكن موجوداً بعد؛
2. نقرأ المخرجات في ذلك المخزن المؤقت، وهو ما يحدث في الاستدعاء إلى `buffer!`؛
3. إذا كانت تلك القراءة قد أعطتنا `:eof`، فإن الطرف الآخر قد أغلق الخط، لذا نتخلص من المقبس _ومن_ مخزنه المؤقت؛
4. وإلا، فنحن نتحقق مما إذا كان المخزن المؤقت واحداً من `complete?` أو `too-big?` أو `too-old?` أو `too-needy?`. وإن كان كذلك، فنزيله من جدول الاتصالات ونعيد استجابة HTTP المناسبة.

هذه أول مرة نرى فيها الإدخال/الإخراج في حلقة الأحداث لدينا. وفي مناقشتنا في \aosasecref{sec.eventsweb.serverarch}، ذكرنا أننا يجب أن نكون حذرين للغاية بشأن الإدخال/الإخراج في نظام قائم على الأحداث، لأننا قد نحجب خيطنا الفردي من باب الحظ. إذن، ماذا نفعل هنا لضمان عدم حدوث ذلك؟ علينا أن نستكشف تنفيذنا لدالة `buffer!` لنعرف بدقة كيف يعمل هذا.

### معالجة الاتصالات دون حجب

أساس مقاربتنا في معالجة الاتصالات دون حجب هو دالة المكتبة [`read-char-no-hang`](http://clhs.lisp.se/Body/f_rd_c_1.htm)، التي تُعيد `nil` فوراً عند استدعائها على تدفق لا تتوفر فيه بيانات. وحيثما توجد بيانات للقراءة، نستخدم مخزناً مؤقتاً لتخزين المدخلات الوسيطة لهذا الاتصال.

```lisp
(defmethod buffer! ((buffer buffer))
  (handler-case
      (let ((stream (bi-stream buffer)))
    	(incf (tries buffer))
    	(loop for char = (read-char-no-hang stream) until (null char)
    	   do (push char (contents buffer))
    	   do (incf (total-buffered buffer))
    	   when (request buffer) do (decf (expecting buffer))
    	   when (line-terminated? (contents buffer))
    	   do (multiple-value-bind (parsed expecting) (parse buffer)
    		(setf (request buffer) parsed
    		      (expecting buffer) expecting)
    		(return char))
    	   when (> (total-buffered buffer) +max-request-size+) return char
    	   finally (return char)))
    (error () :eof)))
```

عندما تُستدعى `buffer!` على `buffer` فإنها:

- تزيد عدّاد `tries`، كي نتمكن من إخراج المخازن «المُتعِشة» (needy) في `process-ready`؛
- تدور في حلقة لقراءة المحارف من تدفق الإدخال، و
- تُعيد آخر محرفقرأته إذا كانت قد قرأت كل المدخلات المتاحة.

كما أنها تتتبع أي تسلسلات `\r\n\r\n` حتى نتمكن لاحقاً من اكتشاف الطلبات المكتملة. وأخيراً، إذا نتج أي خطأ فإنها تُعيد `:eof` للإشارة إلى أن `process-ready` ينبغي أن يتخلص من هذا الاتصال.

النوع `buffer` هو _صنف_ (class) في CLOS. تتيح لنا الأصناف في CLOS تعريف نوع بحقول تُسمى `slots` (الخانات). لا نرى السلوكيات المرتبطة بـ`buffer` في تعريف الصنف، لأننا (كما تعلّمنا من قبل) نقوم بذلك باستخدام دوال عامة مثل `buffer!`.

وتتيح `defclass` لنا تحديد getters/setters (وهي `reader`s و`accessor`s)، ومهيّئات الخانات؛ فـ`:initform` يحدد قيمة افتراضية، بينما تحدد `:initarg` خطّافاً (hook) يمكن لمُنشئ \newline `make-instance` أن يستخدمه لتوفير قيمة افتراضية.

```lisp
(defclass buffer ()
  ((tries :accessor tries :initform 0)
   (contents :accessor contents :initform nil)
   (bi-stream :reader bi-stream :initarg :bi-stream)
   (total-buffered :accessor total-buffered :initform 0)
   (started :reader started :initform (get-universal-time))
   (request :accessor request :initform nil)
   (expecting :accessor expecting :initform 0)))
```

يحتوي صنف `buffer` لدينا على سبع خانات:

- `tries`، التي تعدّ كم مرة حاولنا القراءة في هذا المخزن المؤقت
- `contents`، التي تضم ما قرأناه حتى الآن
- `bi-stream`، وهي تجاوز (hack) لبعض مشكلات الإدخال/الإخراج غير المحجب الخاصة بـCommon Lisp التي ذكرتها في وقت سابق
- `total-buffered`، وهي عدّاد للمحارف التي قرأناها حتى الآن
- `started`، وهي ختم زمني يخبرنا متى أنشأنا هذا المخزن المؤقت
- `request`، التي ستحتوي في النهاية على الطلب الذي نبنيه من البيانات المخزَّنة
- `expecting`، التي ستُظهر كم محرفاً إضافياً نتوقعه (إن وُجد) بعد أن نخزّن ترويسات الطلب

### تفسير الطلبات
\label{sec.eventsweb.handlerfunc}
الآن وقد رأينا كيف نجمّع الطلبات الكاملة تِباعًا من قطع صغيرة من البيانات (bits) تُجمَّع في مخازننا المؤقتة، فماذا يحدث حين يتوفر لدينا طلب كامل جاهز للمعالجة؟ يحدث هذا في الدالة `handle-request`.

```lisp
(defmethod handle-request ((socket usocket) (req request))
  (aif (lookup (resource req) *handlers*)
       (funcall it socket (parameters req))
       (error! +404+ socket)))
```

تضيف هذه الدالة طبقة أخرى من معالجة الأخطاء، بحيث إذا كان الطلب قديمًا أو كبيرًا أو مُتعِشًا نستطيع إرسال استجابة `400` للدلالة على أن العميل قدّم لنا بيانات سيئة أو بطيئة. غير أن إن حدث أي خطأ _آخر_ هنا، فذلك لأن المبرمج أخطأ في تعريف _معالِج_ (handler)، وينبغي أن يُعامَل كخطأ `500`. وسيُخبر هذا العميل بأن شيئًا ما قد حدث خطأً في الخادم نتيجةً لطلبه الشرعي.

وإذا كان الطلب حسن الصياغة، فإننا نقوم بالمهمة الصغيرة والبديهية، وهي البحث عن المورد المطلوب في جدول `*handlers*`. وإذا وجدناه، فإننا نستدعي `funcall` على `it`، معِدِّين إياه الوسيط `socket` الخاص بالعميل إضافة إلى معاملات الطلب المُحلَّلة. وإذا لم يكن في جدول `*handlers*` معالِج مطابق، فإننا نرسل بدلاً منه خطأ `404`. وسيكون نظام المعالِجات جزءًا من إطار عمل الويب الكامل لدينا، وسنتناوله في قسم لاحق.

ولم نَرَ بعد كيف تُحلَّل الطلبات وتُفسَّر انطلاقًا من أحد مخازننا المؤقتة. لننظر في ذلك تاليًا:

```lisp
(defmethod parse ((buf buffer))
  (let ((str (coerce (reverse (contents buf)) 'string)))
    (if (request buf)
	    (parse-params str)
	    (parse str))))
```

تفوّض هذه الدالة عالية المستوى العمل إلى تخصّص من `parse` يعمل مع النصوص العادية، أو إلى `parse-params` الذي يفسّر محتويات المخزن المؤقت بوصفها معاملات HTTP. ويتم استدعاء أيّهما بحسب مقدار ما عالجناه من الطلب؛ إذ إن `parse` الأخيرة تحدث حين يكون لدينا بالفعل `request` جزئي محفوظ في `buffer`، وعندها لا نبحث إلا عن تحليل جسم الطلب.


```lisp
(defmethod parse ((str string))
  (let ((lines (split "\\r?\\n" str)))
    (destructuring-bind (req-type path http-version) (split " " (pop lines))
      (declare (ignore req-type))
      (assert-http (string= http-version "HTTP/1.1"))
      (let* ((path-pieces (split "\\?" path))
	     (resource (first path-pieces))
	     (parameters (second path-pieces))
	     (req (make-instance 'request :resource resource)))
	(loop
	   for header = (pop lines)
	   for (name value) = (split ": " header)
	   until (null name)
	   do (push (cons (->keyword name) value) (headers req)))
	(setf (parameters req) (parse-params parameters))
	req))))

(defmethod parse-params ((params null)) nil)

(defmethod parse-params ((params string))
  (loop for pair in (split "&" params)
     for (name val) = (split "=" pair)
     collect (cons (->keyword name) (or val ""))))
```

في الدالة `parse` المتخصصة على `string`، نحوّل المحتوى إلى أجزاء قابلة للاستخدام. ونقوم بذلك على النصوص بدلاً من العمل مباشرة مع المخازن المؤقتة لأن ذلك يجعل اختبار شيفرة التحليل الفعلية أسهل في بيئة مثل مفسّر (interpreter) أو REPL.

عملية التحليل هي:

1. التقسيم عند `"\\r?\\n"`.
2. تقسيم السطر الأول من ذلك عند `" "` للحصول على نوع الطلب (`POST` أو `GET` أو ما شابه) ومسار URI وإصدار HTTP.
3. التأكيد من أننا نتعامل مع طلب `HTTP/1.1`.
4. تقسيم مسار URI عند `"?"`، مما يعطينا المورد المجرد منفصلاً عن أي معاملات `GET`.
5. إنشاء نسخة جديدة من `request` مع المورد في موضعه.
6. ملء نسخة `request` تلك بسطر الترويسة بعد تفكيكه.
7. ضبط معاملات `request` تلك على نتيجة تحليل معاملات `GET`.

وكما قد خمّنت في هذه المرحلة، فإن `request` هي نسخة من صنف في CLOS:

```lisp
	(defclass request ()
	  ((resource :accessor resource :initarg :resource)
	   (headers :accessor headers :initarg :headers :initform nil)
	   (parameters :accessor parameters :initarg :parameters :initform nil)))
```

لقد رأينا الآن كيف يمكن لعملائنا إرسال الطلبات وكأن خادمنا يفسّرها ويعالجها. وآخر ما علينا تنفيذه كجزء من واجهة خادمنا الأساسية هو القدرة على كتابة الاستجابات عائدةً إلى العميل.

### عرض الاستجابات

قبل أن نتناول عرض الاستجابات، علينا أن نأخذ في الحسبان أن هناك نوعين من الاستجابات قد نعيدها إلى عملائنا. الأول هو استجابة HTTP «طبيعية» كاملة بترويسات HTTP وجسم. وندلّل هذا النوع من الاستجابات بنسخ من الصنف `response`:

```lisp
(defclass response ()
  ((content-type
    :accessor content-type :initform "text/html" :initarg :content-type)
   (charset
    :accessor charset :initform "utf-8")
   (response-code
    :accessor response-code :initform "200 OK" :initarg :response-code)
   (keep-alive?
    :accessor keep-alive? :initform nil :initarg :keep-alive?)
   (body
    :accessor body :initform nil :initarg :body)))
```

والثاني هو [رسالة SSE](http://www.w3.org/TR/eventsource/)، التي سنستخدمها لإرسال تحديث تزايدي إلى عملائنا.

```lisp
(defclass sse ()
  ((id :reader id :initarg :id :initform nil)
   (event :reader event :initarg :event :initform nil)
   (retry :reader retry :initarg :retry :initform nil)
   (data :reader data :initarg :data)))
```

سنرسل استجابة HTTP كلما استلمنا طلب HTTP كاملاً؛ غير كيف نعرف متى وأين نرسل رسائل SSE دون وجود طلب أصلي من العميل؟

أحد الحلول البسيطة هو تسجيل _قنوات_ (channels)[^defparameter]، سنشترك فيها في مقابس `socket` حسب الحاجة.

```lisp
(defparameter *channels* (make-hash-table))

(defmethod subscribe! ((channel symbol) (sock usocket))
  (push sock (gethash channel *channels*))
  nil)
```

[^defparameter]: نحن نقدّم هنا بعض الصياغة الجديدة على سبيل المجاملة. هذه هي طريقتنا في إعلان متغيّر قابل للتعديل. وهي على الصورة `(defparameter <name> <value> <optional docstring>)`.

 يمكننا عندئذٍ أن ننشر الإشعارات عبر `publish!` إلى تلك القنوات بمجرد توفرها.

```lisp
(defmethod publish! ((channel symbol) (message string))
  (awhen (gethash channel *channels*)
	 (setf (gethash channel *channels*)
	       (loop with msg = (make-instance 'sse :data message)
		  for sock in it
		  when (ignore-errors
			 (write! msg sock)
			 (force-output (socket-stream sock))
			 sock)
		  collect it))))
```

في `publish!`، نستدعي `write!` للكتابة فعلًا لكائن `sse` إلى مقبس. وسنحتاج أيضًا إلى تخصّص لـ`write!` على `response`s لكتابة استجابات HTTP الكاملة. لنتعامل مع حالة HTTP أولًا.

```lisp
(defmethod write! ((res response) (socket usocket))
  (handler-case
      (with-timeout (.2)
	(let ((stream (flex-stream socket)))
	  (flet ((write-ln (&rest sequences)
		   (mapc (lambda (seq) (write-sequence seq stream)) sequences)
		   (crlf stream)))
	    (write-ln "HTTP/1.1 " (response-code res))
	    (write-ln
	     "Content-Type: " (content-type res) "; charset=" (charset res))
	    (write-ln "Cache-Control: no-cache, no-store, must-revalidate")
	    (when (keep-alive? res)
	      (write-ln "Connection: keep-alive")
	      (write-ln "Expires: Thu, 01 Jan 1970 00:00:01 GMT"))
	    (awhen (body res)
	      (write-ln "Content-Length: " (write-to-string (length it)))
	      (crlf stream)
	      (write-ln it))
	    (values))))
    (trivial-timeout:timeout-error ()
      (values))))
```

تأخذ هذه النسخة من `write!` كائن `response` و`usocket` باسم `sock`، وتكتب المحتوى إلى تدفق يوفّره `sock`. ونعرّف محليًا الدالة `write-ln` التي تأخذ عددًا ما من التسلسلات، وتكتبها إلى التدفق متبوعة بـ`crlf`. وهذا من أجل سهولة القراءة؛ كان بإمكاننا بدلًا من ذلك استدعاء `write-sequence`/`crlf` مباشرة.

لاحظ أننا ننفّذ أمر «يجب ألا يحجب» من جديد. فرغم أن عمليات الكتابة من المرجح أن تكون مخزَّنة مؤقتًا وأن خطرها في الحجب أقل من القراءة، إلا أننا لا نريد أن يتوقف خادمنا عن العمل إذا حدث خطأ ما هنا. فإذا استغرقت الكتابة أكثر من 0.2 ثانية[^timeout]، فإننا نتابع فقط (نرمِي بالمقبس الحالي) بدلًا من الانتظار أكثر.

[^timeout]: لدى `with-timeout` تطبيقات مختلفة في بيئات Lisp المختلفة. ففي بعض البيئات قد ينشئ خيطًا أو عملية أخرى لمراقبة الخيط أو العملية التي استدعته. ولرغم أننا لن ننشئ أكثر من واحد من هذه في المرة الواحدة، إلا أن ذلك عملية ثقيلة نسبيًا لتُنفَّذ مع كل كتابة. قد نرغب في التفكير في مقاربة بديلة في تلك البيئات.

والكتابة كائن `SSE` مشابهة، من الناحية المفاهيمية، لكتابة كائن `response`:

```lisp
(defmethod write! ((res sse) (socket usocket))
  (let ((stream (flex-stream socket)))
    (handler-case
    (with-timeout (.2)
      (format
       stream "~@[id: ~a~%~]~@[event: ~a~%~]~@[retry: ~a~%~]data: ~a~%~%"
       (id res) (event res) (retry res) (data res)))
      (trivial-timeout:timeout-error ()
        (values)))))
```

هذا أبسط من العمل مع استجابات HTTP الكاملة، إذ إن معيار رسائل SSE لا يحدّد نهايات الأسطر بـ`CRLF`، لذا يمكننا الاكتفاء باستدعاء `format` واحد. أما الكتل `~@[`...`~]` فهي _توجيهات شرطية_ (conditional directives)، تتيح لنا التعامل بسلاسة مع الخانات ذات القيمة `nil`. فمثلًا، إذا كانت `(id res)` غير `nil`، فسنُخرج `id: <the id here> `، وإلا تجاهلنا التوجيه كليًا. وحمولة تحديثنا التزايدي `data` هي الخانة الوحيدة الإلزامية في `sse`، لذا يمكننا تضمينها دون قلق من أن تكون `nil`. مرة أخرى، نحن لا ننتظر مدة _طويلة_. فبعد 0.2 ثانية، ستنتهي المهلة وننتقل إلى الأمر التالي إن لم تكتمل الكتابة بحلول ذلك الحين.

### استجابات الأخطاء

لم يغطي تعاملنا مع دورة الطلب/الاستجابة حتى الآن ما يحدث عندما يسوء شيء ما. وتحديدًا، لقد استخدمنا الدالة `error!` في `handle-request` و`process-ready` دون أن نصف ما تفعله.

```lisp
(define-condition http-assertion-error (error)
  ((assertion :initarg :assertion :initform nil :reader assertion))
  (:report (lambda (condition stream)
	     (format stream "Failed assertions '~s'"
		     (assertion condition)))))
```

تُنشئ `define-condition` أصناف أخطاء جديدة في Common Lisp. وفي حالتنا هذه، نحن نعرّف خطأ تحقق من نوع HTTP (HTTP assertion error)، ونصرّح بأنه سيحتاج تحديدًا إلى معرفة التحقق الفعلي الذي يعمل عليه، وإلى وسيلة لإخراج نفسه إلى تدفق. وفي اللغات الأخرى، كنت ستسمّي هذا دالة. أما هنا، فهو دالة تصادف أنها قيمة خانة في صنف.

كيف نمثّل الأخطاء أمام العميل؟ لنعرّف أخطاء HTTP من صنفَي `4xx` و`5xx` التي سنستخدمها كثيرًا:

```lisp
(defparameter +404+
  (make-instance
   'response :response-code "404 Not Found"
   :content-type "text/plain"
   :body "Resource not found..."))

(defparameter +400+
  (make-instance
   'response :response-code "400 Bad Request"
   :content-type "text/plain"
   :body "Malformed, or slow HTTP request..."))

(defparameter +413+
  (make-instance
   'response :response-code "413 Request Entity Too Large"
   :content-type "text/plain"
   :body "Your request is too long..."))

(defparameter +500+
  (make-instance
   'response :response-code "500 Internal Server Error"
   :content-type "text/plain"
   :body "Something went wrong on our end..."))
```

والآن يمكننا أن نرى ما تفعله `error!`:

```lisp
(defmethod error! ((err response) (sock usocket) &optional instance)
  (declare (ignorable instance))
  (ignore-errors
    (write! err sock)
    (socket-close sock)))
```

إنها تأخذ استجابة خطأ ومقبسًا، وتكتب الاستجابة إلى المقبس ثم تغلقه (متجاهلة الأخطاء، تحسبًا لأن الطرف الآخر ربما يكون قد انقطع بالفعل). والوسيط `instance` هنا لأغراض التسجيل وتصحيح الأخطاء.

وبهذا، لدينا خادم ويب قائم على الأحداث قادر على الاستجابة لطلبات HTTP أو إرسال رسائل SSE، مع معالجة أخطاء كاملة!


## توسيع الخادم ليصبح إطار عمل ويب

لقد بنينا الآن خادم ويب يعمل إلى حدٍّ معقول، بحيث ينقل الطلبات والاستجابات والرسائل إلى العملاء ومنهم. والعمل الفعلي لأي تطبيق ويب يستضيفه هذا الخادم يتم عبر التفويض إلى دوال المعالجة (handler functions)، التي قُدِّمت في \aosasecref{sec.eventsweb.handlerfunc} وتركت دون تحديد كافٍ.

الواجهة بين خادمنا والتطبيق المُستضاف هي واجهة مهمة، لأنها تحدد مدى سهولة عمل مبرمجي التطبيقات مع بنتنا التحتية. وفي الحالة المثلى، كانت واجهة المعالِج لدينا ستربط معاملات الطلب بدالة تؤدّي العمل الحقيقي:

```lisp
(define-handler (source :is-stream? nil) (room)
  (subscribe! (intern room :keyword) sock))

(define-handler (send-message) (room name message)
  (publish! (intern room :keyword)
	    (encode-json-to-string
	     `((:name . ,name) (:message . ,message)))))

(define-handler (index) ()
  (with-html-output-to-string (s nil :prologue t :indent t)
    (:html
     (:head (:script
	     :type "text/javascript"
	     :src "/static/js/interface.js"))
     (:body (:div :id "messages")
	    (:textarea :id "input")
	    (:button :id "send" "Send")))))
```

كان أحد ما كنت أشغل به بالي وأنا أكتب House أنه، مثل أي تطبيق مفتوح أمام الإنترنت الأوسع، سيعالج طلبات واردة من عملاء غير موثوقين. وكان من الجيد لو استطعنا تحديد نوع البيانات التي يجب أن يحتوي عليها كل طلب _على نحو_ (_type_) محدد، وذلك عن طريق توفير _مخطط_ (schema) صغير يصف البيانات. عندئذٍ ستبدو قائمة المعالِجات السابقة لدينا هكذا:

```lisp
(defun len-between (min thing max)
  (>= max (length thing) min))

(define-handler (source :is-stream? nil)
    ((room :string (len-between 0 room 16)))
  (subscribe! (intern room :keyword) sock))

(define-handler (send-message)
    ((room :string (len-between 0 room 16))
     (name :string (len-between 1 name 64))
     (message :string (len-between 5 message 256)))
  (publish! (intern room :keyword)
	    (encode-json-to-string
	     `((:name . ,name) (:message . ,message)))))

(define-handler (index) ()
  (with-html-output-to-string (s nil :prologue t :indent t)
    (:html
     (:head (:script
	     :type "text/javascript"
	     :src "/static/js/interface.js"))
     (:body (:div :id "messages")
	    (:textarea :id "input")
	    (:button :id "send" "Send")))))
```

ولرغم أننا ما زلنا نعمل بشيفرة Lisp، فإن هذه الواجهة بدأت تبدو مثل _لغة تصريحية_ (declarative language) تقريبًا، نُصرّح فيها _بما_ نريد من معالِجاتنا أن تتحقق منه دون التفكير كثيرًا في _كيف_ ستقوم بذلك. وما نفعله هو بناء _لغة خاصة بمجال محدد_ (domain-specific language، DSL) لدوال المعالجة؛ أي أننا نُنشئ اصطلاحًا وصياغة محددين يتيحان لنا التعبير بإيجاز ودقة عمّا نريد من معالِجاتنا أن تتحقق منه. وهذا الأسلوب في بناء لغة صغيرة لحل المشكلة المطروحة كثيرًا ما يستخدمه مبرمجو Lisp، وهي تقنية مفيدة يمكن تطبيقها في لغات برمجة أخرى.

### لغة DSL للمعالِجات

الآن وبعد أن لدينا مواصفة تقريبية لشكل DSL المعالِجات الذي نريده، فكيف ننفّذه؟ أي، ماذا تحديدًا نتوقع أن يحدث عند استدعاء `define-handler`؟ لننظر في تعريف `send-message` السابق:

```lisp
(define-handler (send-message)
    ((room :string (len-between 0 room 16))
     (name :string (len-between 1 name 64))
     (message :string (len-between 5 message 256)))
  (publish! (intern room :keyword)
	    (encode-json-to-string
	     `((:name . ,name) (:message . ,message)))))
```

ما نودّ أن يفعله `define-handler` هنا هو:

1. ربط الإجراء `(publish! ...)` بمسار URI ‏`/send-message` في جدول المعالِجات.
2. عند ورود طلب إلى مسار URI هذا:
    - التأكد من تضمين معاملات HTTP ‏`room` و`name` و`message`.
    - التحقق من أن `room` نص طوله لا يتجاوز 16 محرفًا، وأن `name`
      نص طوله بين 1 و64 محرفًا (شاملاً الطرفين)، وأن `message`
      نص طوله بين 5 و256 محرفًا (شاملاً الطرفين أيضًا).
3. بعد إعادة الاستجابة، إغلاق القناة.

ورغم أننا نستطيع كتابة دوال Lisp للقيام بكل هذه الأمور ثم تجميع القطع يدويًا بأنفسنا، إلا أن المقاربة الأكثر شيوعًا هي استخدام وسيلة في Lisp اسمها `macros` من أجل أن _تولّد_ شيفرة Lisp نيابةً عنا. هذا يتيح لنا التعبير بإيجاز عمّا نريد أن يفعله DSL لدينا، دون اضطرارنا إلى صيانة كثير من الشيفرة للقيام بذلك. ويمكنك أن تتصوّر الماكرو (macro) على أنه «قالب قابل للتنفيذ» يُوسَّع إلى شيفرة Lisp في وقت التشغيل.

وها هو الماكرو `define-handler` لدينا[^indentation]:

[^indentation]: يجدر بي أن أوضح أن كتلة الشيفرة أدناه تستخدم مسافة بادئة غير مألوفة إطلاقًا بالنسبة إلى Common Lisp. فقوائم الوسائط (Arglists) لا تُقسَّم عادةً على عدّة أسطر، وتُبقى غالبًا على السطر نفسه الذي يحمل اسم الماكرو أو الدالة. اضطررت إلى فعل ذلك للالتزام بإرشادات عرض السطر في هذا الكتاب، ولكني كنت سأفضّل بدون ذلك أسطرًا أطول تنكسر طبيعيًا عند المواضع التي يحددها محتوى الشيفرة.

```lisp
(defmacro define-handler
    ((name &key (is-stream? t) (content-type "text/html")) (&rest args)
     &body body)
  (if is-stream?
      `(bind-handler
	,name (make-closing-handler
	       (:content-type ,content-type)
	       ,args ,@body))
      `(bind-handler
	,name (make-stream-handler ,args ,@body))))
```

إنها تفوّض العمل إلى ثلاثة ماكروهات أخرى (`bind-handler` و`make-closing-handler`، \newline `make-stream-handler`) سنعرّفها لاحقًا. وستُنشئ `make-closing-handler` معالِجًا لدورة طلب/استجابة HTTP كاملة؛ في المقابل تعالج `make-stream-handler` رسالة SSE. والمُنبِه `is-stream?` يميّز بين الحالتين نيابةً عنا. أما مشعار الفاصلة المائلة العكسية (`backtick`) والفاصلة، فهما معاملان خاصان بالماكروهات يمكننا استخدامهما «ثقب الأشواك» (to "cut holes") في شيفرتنا، تُملأ بقيم تحددها شيفرة Lisp لدينا لحظة استخدمنا الفعلي لـ`define-handler`.

ولاحِظ مدى انصياع ماكرونا لمواصفة ما أردناه أن يفعله `define-handler`: فلو كنا سنكتب سلسلة من دوال Lisp للقيام بكل هذه الأمور، لاستطعنا تمييز نيّة الشيفرة بالفحص البصري بصعوبة أكبر بكثير.

### توسيع معالِج

لنمر خطوة بخطوة على توسيع معالِج `send-message` كي نفهم على نحو أفضل ما يحدث فعليًا حين «يوسّع» Lisp ماكرونا نيابةً عنا. وسنستخدم خاصية توسيع الماكروهات من وضع Emacs ‏[SLIME](https://common-lisp.net/project/slime/) للقيام بذلك. إن استدعاء `macro-expander` على `define-handler` سيوسّع ماكرونا «درجة» واحدة، تاركًا ماكروهاتنا المساعدة في صورتها المحشوّة بعد:

```lisp
(BIND-HANDLER
 SEND-MESSAGE
 (MAKE-CLOSING-HANDLER
  (:CONTENT-TYPE "text/html")
  ((ROOM :STRING (LEN-BETWEEN 0 ROOM 16))
   (NAME :STRING (LEN-BETWEEN 1 NAME 64))
   (MESSAGE :STRING (LEN-BETWEEN 5 MESSAGE 256)))
  (PUBLISH! (INTERN ROOM :KEYWORD)
	    (ENCODE-JSON-TO-STRING
	     `((:NAME ,@NAME) (:MESSAGE ,@MESSAGE))))))
```

لقد وفّر لنا ماكرونا بالفعل بعض الكتابة عبر استبدال شيفرتنا الخاصة بـ`send-message` داخل قالب المعالِج لدينا. و`bind-handler` هو ماكرو آخر يربط مسار URI بدالة معالِج على جدول المعالِجات لدينا؛ ولأنه صار الآن في جذر توسيعنا، فلنرَ كيف هو معرّف قبل أن نوسّع هذا أكثر.

```lisp
(defmacro bind-handler (name handler)
  (assert (symbolp name) nil "`name` must be a symbol")
  (let ((uri (if (eq name 'root) "/" (format nil "/~(~a~)" name))))
    `(progn
       (when (gethash ,uri *handlers*)
	 (warn ,(format nil "Redefining handler '~a'" uri)))
       (setf (gethash ,uri *handlers*) ,handler))))
```

يحدث الربط في السطر الأخير: `(setf (gethash ,uri *handlers*) ,handler)`، وهو ما تبدو عليه إسنادات جداول التجزئة (hash tables) في Common Lisp (باستثناء الفواصل، فهي جزء من ماكرونا). ولاحظ أن `assert` يقع خارج المنطقة المقتبسة، وهذا يعني أنه سيُنفَّذ بمجرد _استدعاء_ الماكرو لا حين تُقيَّم نتيجته.

وحين نوسّع بدوره توسيعنا لـ`define-handler` الخاص بـ`send-message` أعلاه، نحصل على:

```lisp
(PROGN
  (WHEN (GETHASH "/send-message" *HANDLERS*)
    (WARN "Redefining handler '/send-message'"))
  (SETF (GETHASH "/send-message" *HANDLERS*)
	(MAKE-CLOSING-HANDLER
	 (:CONTENT-TYPE "text/html")
	 ((ROOM :STRING (LEN-BETWEEN 0 ROOM 16))
	  (NAME :STRING (LEN-BETWEEN 1 NAME 64))
	  (MESSAGE :STRING (LEN-BETWEEN 5 MESSAGE 256)))
	 (PUBLISH! (INTERN ROOM :KEYWORD)
		   (ENCODE-JSON-TO-STRING
		    `((:NAME ,@NAME) (:MESSAGE ,@MESSAGE)))))))
```

هذا بدأ يبدو أشبه بتنفيذ مخصّص لما كنا سنكتبه لتوجيه طلب من مسار URI إلى دالة معالِج، لو كنا كتبناه كله بأنفسنا. لكننا لم نضطر إلى ذلك!

 وما زال أمامنا في توسيعنا `make-closing-handler`. إليك تعريفها:

```lisp
(defmacro make-closing-handler
    ((&key (content-type "text/html")) (&rest args) &body body)
  `(lambda (sock parameters)
     (declare (ignorable parameters))
     ,(arguments
       args
       `(let ((res (make-instance
		    'response
		    :content-type ,content-type
		    :body (progn ,@body))))
	  (write! res sock)
	  (socket-close sock)))))
```

إذن، فإن إنشاء معالِج من نوع closing-handler ينطوي على إنشاء `lambda`، وهو ما تسمّيه الدوال المجهولة في Common Lisp. ونحن أيضاً ننشئ نطاقًا داخليًا يصنع `response` من الوسيط `body` الذي نمرّره، ثم ينفّذ `write!` على المقبس الطالب، ثم يغلقه. والسؤال المتبقي هو: ما هي `arguments`؟

```lisp
(defun arguments (args body)
  (loop with res = body
     for arg in args
     do (match arg
	 ((guard arg-sym (symbolp arg-sym))
	  (setf res `(let ((,arg-sym ,(arg-exp arg-sym))) ,res)))
	 ((list* arg-sym type restrictions)
	  (setf res
		(let ((sym (or (type-expression
				(arg-exp arg-sym)
				type restrictions)
			       (arg-exp arg-sym))))
		  `(let ((,arg-sym ,sym))
		     ,@(awhen (type-assertion arg-sym type restrictions)
			 `((assert-http ,it)))
		     ,res)))))
     finally (return res)))
```

أهلاً بك في الجزء الصعب. تحوّل `arguments` المدقِّقات (validators) التي سجّلناها مع معالِجنا إلى شجرة من محاولات تحليل وتأكيدات. وتُستخدم `type-expression` و`arg-exp` و`type-assertion` لتنفيذ «نظام أنواع» وفرضه على أنواع البيانات التي نتوقعها في استجاباتنا؛ وسنتناولها في \aosasecref{sec.eventsweb.types}. واستخدام هذا مع `make-closing-handler` من شأنه أن ينفّذ قواعد التحقق التي كتبناها هنا:

```lisp
(define-handler (send-message)
    ((room :string (>= 16 (length room)))
     (name :string (>= 64 (length name) 1))
     (message :string (>= 256 (length message) 5)))
  (publish! (intern room :keyword)
	    (encode-json-to-string
	     `((:name . ,name) (:message . ,message)))))
```

...بوصفها تسلسلًا من الفحوص «مبسوطًا» (unrolled) يلزم للتحقق من الطلب:

```lisp
(LAMBDA (SOCK #:COOKIE?1111 SESSION PARAMETERS)
  (DECLARE (IGNORABLE SESSION PARAMETERS))
  (LET ((ROOM (AIF (CDR (ASSOC :ROOM PARAMETERS))
		   (URI-DECODE IT)
		   (ERROR (MAKE-INSTANCE
			   'HTTP-ASSERTION-ERROR
			   :ASSERTION 'ROOM)))))
    (ASSERT-HTTP (>= 16 (LENGTH ROOM)))
    (LET ((NAME (AIF (CDR (ASSOC :NAME PARAMETERS))
		     (URI-DECODE IT)
		     (ERROR (MAKE-INSTANCE
			     'HTTP-ASSERTION-ERROR
			     :ASSERTION 'NAME)))))
      (ASSERT-HTTP (>= 64 (LENGTH NAME) 1))
      (LET ((MESSAGE (AIF (CDR (ASSOC :MESSAGE PARAMETERS))
			  (URI-DECODE IT)
			  (ERROR (MAKE-INSTANCE
				  'HTTP-ASSERTION-ERROR
				  :ASSERTION 'MESSAGE)))))
	(ASSERT-HTTP (>= 256 (LENGTH MESSAGE) 5))
	(LET ((RES (MAKE-INSTANCE
		    'RESPONSE :CONTENT-TYPE "text/html"
		    :COOKIE (UNLESS #:COOKIE?1111
			      (TOKEN SESSION))
		    :BODY (PROGN
			    (PUBLISH!
			     (INTERN ROOM :KEYWORD)
			     (ENCODE-JSON-TO-STRING
			      `((:NAME ,@NAME)
				(:MESSAGE ,@MESSAGE))))))))
	  (WRITE! RES SOCK)
	  (SOCKET-CLOSE SOCK))))))
```

يوفّر هذا التحقق الذي نحتاجه لدورات طلب/استجابة HTTP الكاملة. وماذا عن رسائل SSE لدينا؟ تفعل `make-stream-handler` الشيء الأساسي نفسه الذي تفعله `make-closing-handler`، إلا أنها تكتب `SSE` بدلاً من `RESPONSE`، وتستدعي `force-output` بدلاً من `socket-close`، لأننا نريد تفريغ البيانات عبر الاتصال دون إغلاقه:

```lisp
(defmacro make-stream-handler ((&rest args) &body body)
  `(lambda (sock parameters)
     (declare (ignorable parameters))
     ,(arguments
       args
       `(let ((res (progn ,@body)))
	  (write! (make-instance
		   'response
		   :keep-alive? t
		   :content-type "text/event-stream")
		  sock)
	  (write!
	   (make-instance 'sse :data (or res "Listening..."))
	   sock)
	  (force-output
	   (socket-stream sock))))))

(defmacro assert-http (assertion)
  `(unless ,assertion
     (error (make-instance
	     'http-assertion-error
	     :assertion ',assertion))))
```

`assert-http` هو ماكرو ينشئ شيفرة القالب الجاهزة (boilerplate) التي نحتاجها في حالات الخطأ. وهو يتوسّع إلى فحص للتأكيد المُعطى، ويرمي `http-assertion-error` عند فشل ذلك الفحص، ويحزم التأكيد الأصلي داخل ذلك الحدث.

```lisp
(defmacro assert-http (assertion)
  `(unless ,assertion
     (error (make-instance
	     'http-assertion-error
	     :assertion ',assertion))))
```

### «أنواع» HTTP
\label{sec.eventsweb.types}

في القسم السابق، لمّنا بإيجاز إلى ثلاثة تعبيرات نستخدمها لتنفيذ نظام التحقق من أنواع HTTP لدينا: `arg-exp` و`type-expression` و`type-assertion`. ومتى فهمتَ هذه، لن يبقى في إطار عملنا أي سحر. سنبدأ بالسهل أولًا.

#### arg-exp

تأخذ `arg-exp` رمزًا (symbol) وتنشئ تعبير `aif` يتحقق من وجود وسيط.

```lisp
(defun arg-exp (arg-sym)
  `(aif (cdr (assoc ,(->keyword arg-sym) parameters))
	(uri-decode it)
	(error (make-instance
		'http-assertion-error
		:assertion ',arg-sym))))
```

يبدو تقييم `arg-exp` على رمز كالتالي:

```lisp
HOUSE> (arg-exp 'room)
(AIF (CDR (ASSOC :ROOM PARAMETERS))
     (URI-DECODE IT)
     (ERROR (MAKE-INSTANCE
	     'HTTP-ASSERTION-ERROR
	     :ASSERTION 'ROOM)))
HOUSE>
```

لقد كنا نستخدم صيغًا مثل `aif` و`awhen` دون فهم كيفية عملها، فلنخصّص بعض الوقت لاستكشافها الآن.

وتذكّر أن شيفرة Lisp ممثَّلة في ذاتها على هيئة شجرة. هذا هو ما تفعله الأقواس؛ فهي تبيّن لنا كيف تتترابط الأوراق والأغصان معًا. فإذا عدنا خطوة إلى ما كنا نفعله في القسم السابق، فإن `make-closing-handler` تستدعي دالة اسمها `arguments` لتوليد جزء من شجرة Lisp التي تبنيها، وهي بدورها تستدعي بعض دوال المساعدة التي تتلاعب بالشجرة، ومنها `arg-exp`، لتوليد قيمة إرجاعها.

بمعنى آخر، لقد بنينا نظامًا صغيرًا يأخذ تعبير Lisp كمدخل، وينتج تعبير Lisp مختلفًا كمخرج. وعلى الأرجح فإن أبسط طريقة لتخييل هذا هي رؤيته بوصفه مُصرِّفًا بسيطًا من Common Lisp إلى Common Lisp، مخصَّصًا للمشكلة بعينها.

وتصنيفٌ شائع الاستخدام لهكذا من المُصرِّفين هو أنها _ماكروهات إحالة_ (_anaphoric macros_). وتأتي هذه التسمية من المفهوم اللغوي _الضمير المرجعي_ (_anaphor_)، وهو استخدام كلمة واحدة بديلاً عن مجموعة كلمات سبقتها. و`aif` و`awhen` ماكروهات إحالة، وهما الوحيدتان التي أكثُر من استخدامهما. وهناك الكثير غيرهما في حزمة [`anaphora`](http://www.cliki.net/Anaphora).

وعلى حدّ علمي، فقد عُرِّفت ماكروهات الإحالة أول مرة من قِبل Paul Graham في [فصل من OnLisp](http://dunsmor.com/lisp/onlisp/onlisp_18.html). وحالة الاستخدام التي يقدّمها هي موقف تريد فيه إجراء نوع ما من الفحص المكلف أو شبه المكلف، ثم تفعل شيئًا بشكل مشروط على أساس النتيجة. وفي السياق أعلاه، نستخدم `aif` لإجراء فحص على نتيجة اجتياز `alist`.

```lisp
(aif (cdr (assoc :room parameters))
     (uri-decode it)
     (error (make-instance
	     'http-assertion-error
	     :assertion 'room)))
```

يأخذ هذا `cdr` للبحث عن الرمز `:room` في قائمة الارتباط `parameters`. فإذا أعاد ذلك قيمة غير `nil` فإننا نفكّ ترميزها بـ`uri-decode`، وإلا فرمِ خطأً من النوع `http-assertion-error`.

بعبارة أخرى، ما سبق يعادل:

```lisp
(let ((it (cdr (assoc :room parameters))))
  (if it
      (uri-decode it)
      (error (make-instance
	      'http-assertion-error
	      :assertion 'room))))
```

غالبًا ما تستخدم اللغات الوظيفية المُنمَّطة بشدة مثل Haskell نوع `Maybe` في هذا الموقف. أما في Common Lisp، فنحن نلتقط الرمز `it` في التوسيع بوصفه اسمًا لنتيجة الفحص.

والآن بعد فهمنا لهذا، ينبغي أن نتمكّن من رؤية أن `arg-exp` يولّد جزءًا محدّدًا ومتكررًا من شجرة الشيفرة نريد في النهاية تقييمها. وفي هذه الحالة، الجزء الذي يتحقق من وجود الوسيط المعطى ضمن `parameters` الخاصة بالمعالِجات. الآن، فلننتقل إلى...

#### type-expression

```lisp
(defgeneric type-expression (parameter type)
  (:documentation
   "A type-expression will tell the server
how to convert a parameter from a string to
a particular, necessary type."))
...
(defmethod type-expression (parameter type) nil)
```

هذه دالة عامة تولّد هياكل شجرية جديدة (وهي شيفرة Lisp بالمناسبة)، لا مجرد دالة فحسب. وكل ما يخبرك به أعلاه هو أن `type-expression` تكون `NIL` افتراضيًا. أي بمعنى آخر، أننا لا نملك واحدة. وإذا صادفنا `NIL` فإننا نستخدم المخرج الخام لـ`arg-exp`، لكن ذلك لا يخبرنا الكثير عن الحالة الأكثر شيوعًا. ولرؤية ذلك، فلننظر في تعبير `define-http-type` مدمج (في `:house`).

```lisp
(define-http-type (:integer)
    :type-expression `(parse-integer ,parameter :junk-allowed t)
    :type-assertion `(numberp ,parameter))
```

إن `:integer` هو شيء نصنعه من `parameter` باستخدام `parse-integer`. ويخبر الوسيط `junk-allowed` دالة `parse-integer` أننا لسنا واثقين من أن البيانات التي نمرّرها قابلة للتحليل فعلاً، لذا نحتاج إلى التأكد من أن النتيجة المُعادة عدد صحيح. فإذا لم تكن كذلك، نحصل على هذا السلوك:

```
HOUSE> (type-expression 'blah :integer)
(PARSE-INTEGER BLAH :JUNK-ALLOWED T)
HOUSE>
```

تُعد `define-http-handler`[^readable] أحد الرموز المُصدَّرة لإطار عملنا. وهذا يتيح لمبرمجي تطبيقاتنا تعريف أنواعهم الخاصة لتبسيط التحليل فوق عدد قليل من «الأنواع المدمجة» التي نوفّرها لهم (`:string` و`:integer` و`:keyword` و`:json` و`:list-of-keyword` و`:list-of-integer`).

```lisp
(defmacro define-http-type ((type) &key type-expression type-assertion)
  (with-gensyms (tp)
    `(let ((,tp ,type))
       ,@(when type-expression
	  `((defmethod type-expression (parameter (type (eql ,tp)))
	      ,type-expression)))
       ,@(when type-assertion
	  `((defmethod type-assertion (parameter (type (eql ,tp)))
	      ,type-assertion))))))
```

[^readable]: هذا الماكرو صعب القراءة لأنه يحاول بجهد أن يجعل مخرجه قابلًا للقراءة من الإنسان، عبر توسيع `NIL`s بعيدًا باستخدام `,@` متى أمكن.

ويعمل عن طريق إنشاء تعريفات دوال لـ`type-expression` و`type-assertion` للنوع الجاري تعريفه. يمكننا أن نترك لمستخدمَي إطار عملنا تنفيذ ذلك يدويًا دون عناء يذكر؛ غير أن إضافة هذا المستوى الإضافي من التوجيه تمنحنا، نحن مبرمجي إطار العمل، حرية تغيير _كيف_ تُنفَّذ الأنواع دون إجبار مستخدمينا على إعادة كتابة مواصفاتهم. وليس هذا اعتبارًا أكاديميًا فحسب؛ فقد أجريتُ بنفسي تغييرات جذرية في هذا الجزء من النظام حين بنيته أول مرة، وسعدت بأن عدد التعديلات التي اضطررت إليها في التطبيقات المعتمدة عليه كان ضئيلًا جدًا.

فلننظر في توسيع تعريف العدد الصحيح ذلك لنرى كيف يعمل بالتفصيل:

```lisp
(LET ((#:TP1288 :INTEGER))
  (DEFMETHOD TYPE-EXPRESSION (PARAMETER (TYPE (EQL #:TP1288)))
    `(PARSE-INTEGER ,PARAMETER :JUNK-ALLOWED T))
  (DEFMETHOD TYPE-ASSERTION (PARAMETER (TYPE (EQL #:TP1288)))
    `(NUMBERP ,PARAMETER)))
```

وكما قلنا، فإن هذا لا يقلّص حجم الشيفرة كثيرًا، لكنه يمنعنا من الحاجة إلى الاهتمام بما هي معاملات تلك الدوال تحديدًا، أو حتى أنها دوال من الأساس.

#### type-assertion

الآن وبعد أن أصبح بإمكاننا تعريف الأنواع، فلننظر في كيف نستخدم `type-assertion` للتحقق من أن عملية تحليل ما تُستوفي متطلباتنا. وهي أيضًا تأخذ صورة زوج متكامل من `defgeneric` و`defmethod` تماماً مثل `type-expression`:

```lisp
(defgeneric type-assertion (parameter type)
  (:documentation
   "A lookup assertion is run on a parameter
immediately after conversion. Use it to restrict
 the space of a particular parameter."))
...
(defmethod type-assertion (parameter type) nil)
```

وهذا ما يُخرجه هذا:

```lisp
HOUSE> (type-assertion 'blah :integer)
(NUMBERP BLAH)
HOUSE>
```

هناك حالات لا يحتاج فيها `type-assertion` إلى فعل أي شيء. فمثلًا، بما أن معاملات HTTP تُعطى لنا كنصوص، فلا يوجد ما يتحقق منه تأكيد النوع `:string` لدينا:

```lisp
HOUSE> (type-assertion 'blah :string)
NIL
HOUSE>
```

### كل شيء معًا الآن

نجحنا! لقد بنينا إطار عمل ويب فوق تنفيذ خادم ويب قائم على الأحداث. ويحدد إطار عملنا (وDSL المعالِجات) تطبيقات جديدة عن طريق:

- ربط عناوين URL بالمعالِجات؛
- تعريف المعالِجات لتطبيق قواعد سلامة الأنواع والتحقق على الطلبات؛
- تحديد أنواع جديدة للمعالِجات عند الحاجة، بشكل اختياري.

والآن يمكننا أن نصف تطبيقنا هكذا:

```lisp
(defun len-between (min thing max)
  (>= max (length thing) min))

(define-handler (source :is-stream? nil)
    ((room :string (len-between 0 room 16)))
  (subscribe! (intern room :keyword) sock))

(define-handler (send-message)
    ((room :string (len-between 0 room 16))
     (name :string (len-between 1 name 64))
     (message :string (len-between 5 message 256)))
  (publish! (intern room :keyword)
	    (encode-json-to-string
	     `((:name . ,name) (:message . ,message)))))

(define-handler (index) ()
  (with-html-output-to-string (s nil :prologue t :indent t)
    (:html
     (:head (:script
	     :type "text/javascript"
	     :src "/static/js/interface.js"))
     (:body (:div :id "messages")
	    (:textarea :id "input")
	    (:button :id "send" "Send")))))

(start 4242)
```

ومتى كتبنا `interface.js` لتوفير التفاعل في جانب العميل، سيقوم هذا بتشغيل خادم دردشة HTTP على المنفذ `4242` والاستماع للاتصالات الواردة.
