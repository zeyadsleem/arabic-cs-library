---
title: "5.5 التصريف"
lang: ar
---

### 5.5 التصريف

إنّ المقيّم ذا المتحكّم الصريح الوارد في [5.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4) آلةُ مسجّلاتٍ متحكّمها يفسّر برامج Scheme. وفي هذا القسم سنرى كيف نشغّل برامج Scheme على آلة مسجّلاتٍ متحكّمها ليس مفسّر Scheme.

إنّ آلة المقيّم ذي المتحكّم الصريح عامّة - فهي قادرة على أداء أيّ عمليّةٍ حسابيّةٍ يمكن وصفها بـScheme. ومتحكّم المقيّم ينسّق استخدام مسارات بياناته لأداء الاحتساب المطلوب. وبذلك، فإنّ مسارات بيانات المقيّم عامّة: فهي كافيّة لأداء أيّ احتسابٍ نرغبه، بمتحكّمٍ مناسب.[^33]

إنّ الحواسيب التجاريّة العامّة الغرض آلاتُ مسجّلاتٍ منظّمةٌ حول مجموعةٍ من المسجّلات والعمليّات التي تُشكّل مجموعةً عامّةً كفوءةً ومريحةً من مسارات البيانات. أمّا متحكّم آلةٍ عامّة الغرض فهو مفسّرٌ للغةٍ من لغات آلات المسجّلات شبيهة بتلك التي كنّا نستخدمها. وهذه اللغة تُسمّى *اللغة الأصليّة (native language)* للآلة، أو باختصار *لغة الآلة (machine language)*. والبرامج المكتوبة بلغة الآلة تسلسلاتٌ من التعليمات التي تستخدم مسارات بيانات الآلة. فإنّ تسلسل تعليمات المقيّم ذي المتحكّم الصريح مثلًا يمكن النظر إليه كبرنامجٍ بلغة الآلة لحاسوبٍ عامّ الغرض بدلًا من اعتباره متحكّمًا لآلة مفسّرٍ متخصّصة.

ثمّة استراتيجيّتان شائعتان لردم الفجوة بين اللغات العالية المستوى ولغات آلات المسجّلات. ويُمثّل المقيّم ذو المتحكّم الصريح استراتيجيّة التفسير. فالمفسّر المكتوب باللغة الأصليّة لآلةٍ يُهيّئ الآلة لتنفيذ برامجٍ مكتوبةٍ بلغةٍ (تُسمّى *لغة المصدر (source language)*) قد تختلف عن اللغة الأصليّة للآلة التي تُجري التقييم. وتُنفَّذ الإجراءات الأوّليّة للغة المصدر كمكتبةٍ من الإجراءات الفرعيّة المكتوبة باللغة الأصليّة للآلة المعطاة. أمّا البرنامج المراد تفسيره (ويُسمّى *البرنامج المصدريّ (source program)*) فيُمثَّل كبنية بيانات. والمفسّر يجتاز بنية البيانات هذه، محلّلًا البرنامج المصدريّ. وبينما يفعل ذلك، فإنّه يحاكي السلوك المقصود من البرنامج المصدريّ بنداء الإجراءات الفرعيّة الأوّليّة الملائمة من المكتبة.

وفي هذا القسم نستكشف الاستراتيجيّة البديلة، وهي *التصريف (compilation)*. فإنّ المصرِّف الخاصّ بلغة مصدرٍ وآلةٍ معيّنتين يُترجم برنامجًا مصدريًّا إلى برنامجٍ مكافئٍ (يُسمّى *البرنامج الهدف (object program)*) مكتوبٍ بلغة الآلة الأصليّة. أمّا المصرِّف الذي ننفّذه في هذا القسم فيُترجم البرامج المكتوبة بـScheme إلى تسلسلاتٍ من التعليمات التي يُنفَّذ باستخدام مسارات بيانات آلة المقيّم ذي المتحكّم الصريح.[^34]

وبالمقارنة مع التفسير، فإنّ التصريف قادرٌ على توفير زيادةٍ كبيرةٍ في كفاءة تنفيذ البرامج، كما سنشرح أدناه في استعراضنا للمصرِّف. ومن جهةٍ أخرى، فإنّ المفسّر يوفّر بيئةً أكثر قوّةٍ لتطوير البرامج التفاعليّ وتصحيحها، لأنّ البرنامج المصدريّ قيد التنفيذ متاحٌ في زمن التشغيل للفحص والتعديل. وبالإضافة إلى ذلك، وبسبب حضور مكتبة الأوّليّات بتمامها، يمكن بناء برامج جديدة وإضافتها إلى النظم أثناء التصحيح.

وإذ نُلاحِظ المزايا المكمّلة للتصريف والتفسير، فإنّ بيئات تطوير البرامج الحديثة تنتهج استراتيجيّة مختلطة. فإنّ مفسّرات Lisp منظّمةٌ عمومًا بحيث تستطيع الإجراءات المفسَّرة والإجراءات المصرَّفة أن تنداي بعضها بعضًا. وهذا يمكّن المبرمجَ من تصريف الأجزاء من البرنامج التي يُفترض أنّها صُحِّحت، فيحصُل بذلك على ميزة كفاءة التصريف، مع الاحتفاظ بنمط التنفيذ التفسيريّ للأجزاء التي هي في تطوّرٍ تفاعليٍّ وتصحيح. وفي [5.5.7](/book/sicp/c5-computing-with-register-machines/5-5/)، بعد أن نكون قد نفّذنا المصرِّف، سنُظهر كيف نوفّق بينه وبين مفسّرنا لإنتاج نظام تطويرٍ متكاملٍ يجمع المفسّر والمصرِّف.

#### استعراض المصرِّف

إنّ مصرّفنا يشبه مفسّرنا إلى حدٍّ كبير، في بنيته وفي الوظيفة التي يؤدّيها. ووفقًا لذلك، فإنّ الآليّات التي يستخدمها المصرِّف لتحليل التعابير ستشبه تلك التي يستخدمها المفسّر. وبالإضافة إلى ذلك، ولتسهيل التوفيق بين الشيفرة المصرَّفة والشيفرة المفسَّرة، سنُصمّم المصرِّف ليُنتج شيفرةً تلتزم بالأعراف ذاتها في استخدام المسجّلات التي يلتزم بها المفسّر: فتُحفظ البيئة في المسجّل `env`، وتُتراكم قوائم المعطيات في `argl`، ويكون الإجراء المطلوب تطبيقه في `proc`، وتُعيد الإجراءات أجوبتها في `val`، ويُحفظ الموضع الذي ينبغي أن يعود إليه الإجراء في `continue`. وبصورةٍ عامّة، يُترجم المصرِّف برنامجًا مصدريًّا إلى برنامجٍ هدفٍ يؤدّي - في الجوهري - عمليّات المسجّل ذاتها التي كان المفسّر سيؤدّيها في تقييم البرنامج المصدريّ ذاته.

وهذا الوصف يقترح استراتيجيّة لتنفيذ مصرِّفٍ أوّليّ: نجتاز التعبير بالطريقة ذاتها التي يجتازها المفسّر. وحين نصادف تعليمة مسجّلٍ كان المفسّر سيؤدّيها في تقييم التعبير، فإنّنا لا ننفّذ التعليمة بل نُراكمها في تسلسلٍ بدلًا من ذلك. وتسلسل التعليمات الناتج سيكون شيفرة الهدف. وتأمّل ميزة كفاءة التصريف على التفسير. ففي كلّ مرّةٍ يُقيّم فيها المفسّر تعبيرًا - `(f 84 96)` مثلًا - فإنّه يؤدّي عمل تصنيف التعبير (باكتشاف أنّ هذا تطبيق إجراء) واختبار نهاية قائمة العوامل (باكتشاف أنّ هناك عاملين). أمّا مع مصرِّف، فإنّ التعبير يُحلَّل مرّةً واحدةً فقط، حين يُنتَج تسلسل التعليمات في زمن التصريف. وشيفرة الهدف التي يُنتجها المصرِّف تحتوي فقط على التعليمات التي تُقيّم المشغّل والعاملين، وتبني قائمة المعطيات، وتُطبّق الإجراء (في `proc`) على المعطيات (في `argl`).

وهذا هو النوع ذاته من التحسين الذي نفّذناه في المقيّم المحلِّل الوارد في [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7). لكن ثمّة فرصًا أخرى لاكتساب الكفاءة في الشيفرة المصرَّفة. فبينما يعمل المفسّر، فإنّه يتبع عمليّةً يجب أن تكون قابلة للتطبيق على أيّ تعبيرٍ في اللغة. وبالمقابل، فإنّ مقطعًا معيّنًا من الشيفرة المصرَّفة يُقصد به تنفيذ تعبيرٍ خاصّ بعينه. وهذا قد يُحدث فرقًا كبيرًا، في استخدام المكدّس لحفظ المسجّلات مثلًا. فحين يُقيّم المفسّر تعبيرًا، ينبغي أن يكون مستعدًّا لأيّ طارئ. وقبل تقييم تعبيرٍ جزئيّ، يحفظ المفسّر جميع المسجّلات التي ستكون لازمةً لاحقًا، لأنّ التعبير الجزئيّ قد يتطلّب تقييمًا اعتباطيًّا. أمّا المصرِّف، من جهةٍ أخرى، فيستطيع استثمار بنية التعبير الخاصّ الذي يعالجه ليُنتج شيفرةً تتجنّب عمليّات المكدّس غير الضروريّة.

وبوصفه مثالًا على ذلك، تأمّل التركيب `(f 84 96)`. فقبل أن يُقيّم المفسّر مشغّل التركيب، فإنّه يتهيّأ لهذا التقييم بحفظ المسجّلات التي تحتوي العوامل والبيئة، والتي ستكون قيمُها لازمةً لاحقًا. ثم يُقيّم المفسّر المشغّل ليحصل على النتيجة في `val`، ويستعيد المسجّلات المحفوظة، وأخيرًا ينقل النتيجة من `val` إلى `proc`. لكنّنا في التعبير الخاصّ الذي نتعامل معه، المشغّل هو الرمز `f`، الذي يُنجَز تقييمه بعمليّة الآلة `lookup-variable-value`، وهي لا تُغيّر أيّ مسجّل. والمصرِّف الذي ننفّذه في هذا القسم سيستفيد من هذه الحقيقة ويُنتج شيفرةً تُقيّم المشغّل باستخدام التعليمة

```scheme
(assign proc 
        (op lookup-variable-value)
        (const f)
        (reg env))
```

وهذه الشيفرة لا تتجنّب الحفظ والاستعادة غير الضروريّين فحسب، بل تُسند أيضًا نتيجة البحث مباشرةً إلى `proc`، بخلاف المفسّر الذي كان سيستخرج النتيجة في `val` ثم ينقلها إلى `proc`.

ويستطيع المصرِّف أيضًا تحسين الوصول إلى البيئة. فإنّه بعد تحليل الشيفرة، يستطيع المصرِّف - في حالاتٍ كثيرةٍ - أن يعرف في أيّ إطارٍ سيقع متغيّرٌ خاصّ، وأن يصل إلى ذلك الإطار مباشرةً، بدلًا من إجراء بحث `lookup-variable-value`. وسنناقش كيف ننفّذ وصول المتغيّرات هذا في [5.5.6](/book/sicp/c5-computing-with-register-machines/5-5/). لكنّنا، حتّى ذلك الحين، سنركّز على نوع تحسينات المسجّلات والمكدّس الموصوف أعلاه. ثمّة تحسيناتٌ أخرى كثيرةٌ يستطيع المصرِّف أداءها، كترميز العمليّات الأوّليّة «سطرًا» بدلًا من استخدام آليّة `apply` عامّة (انظر [التمرين 5.38](/book/sicp/c5-computing-with-register-machines/5-5/))؛ لكنّنا لن نُشدّد على هذه هنا. أمّا هدفنا الرئيسيّ في هذا القسم فهو توضيح عمليّة التصريف في سياقٍ مبسّطٍ (لكنه لا يزال مثيرًا للاهتمام).

#### 5.5.1 بنية المصرِّف

لقد عدّلنا في [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7) مفسّرنا البعديّ الأصليّ لفصل التحليل عن التنفيذ. فقد حلّلنا كلّ تعبيرٍ لنُنتج إجراء تنفيذٍ يأخذ بيئةً كمعطىً ويؤدّي العمليّات المطلوبة. وفي مصرّفنا، سنجري التحليل ذاته في الجوهري. لكنّنا، بدلًا من إنتاج إجراءات تنفيذٍ، سنُنتج تسلسلاتٍ من التعليمات التي ستُشغَّل بآلة مسجّلاتنا.

والإجراء `compile` هو التوزيع الأعلى مستوىً في المصرِّف. وهو يقابل الإجراء `eval` الوارد في [4.1.1](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1)، والإجراء `analyze` الوارد في [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7)، ونقطة دخول `eval-dispatch` في المقيّم ذي المتحكّم الصريح الوارد في [5.4.1](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1). وإنّ المصرِّف - كالمفسّرات - يستخدم إجراءات صياغة التعبير المعرَّفة في [4.1.2](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2).[^35] ويُجري `compile` تحليل حالاتٍ على النوع الصياغيّ للتعبير المطلوب تصريفه. فلكلّ نوعٍ من التعابير، يوزّع إلى *مولّد شيفرةٍ (code generator)* متخصّص:

```scheme
(define (compile exp target linkage)
  (cond ((self-evaluating? exp)
         (compile-self-evaluating 
          exp target linkage))
        ((quoted? exp) 
         (compile-quoted exp target linkage))
        ((variable? exp)
         (compile-variable 
          exp target linkage))
        ((assignment? exp)
         (compile-assignment
          exp target linkage))
        ((definition? exp)
         (compile-definition
          exp target linkage))
        ((if? exp)
         (compile-if exp target linkage))
        ((lambda? exp)
         (compile-lambda exp target linkage))
        ((begin? exp)
         (compile-sequence 
          (begin-actions exp) target linkage))
        ((cond? exp) 
         (compile 
          (cond->if exp) target linkage))
        ((application? exp)
         (compile-application 
          exp target linkage))
        (else
         (error "Unknown expression type: 
                 COMPILE" 
                exp))))
```

#### الأهداف والروابط

إنّ `compile` ومولّدات الشيفرة التي ينديها يأخذان - بالإضافة إلى التعبير المطلوب تصريفه - معطيين. هناك *هدف (target)*، يُحدّد المسجّل الذي ينبغي أن تُعيد فيه الشيفرة المصرَّفة قيمة التعبير. وهناك أيضًا *واصف ربط (linkage descriptor)*، يصف كيف ينبغي أن تسير الشيفرة الناتجة عن تصريف التعبير بعد أن تُتمّ تنفيذها. ويستطيع واصف الربط أن يُلزم الشيفرة بأداء واحدةٍ من الأمور الثلاثة الآتية:

- المواصلة عند التعليمة التالية في التسلسل (وهذا ما يُحدّده واصف الربط `next`)،
- العودة من الإجراء قيد التصريف (وهذا ما يُحدّده واصف الربط `return`)، أو
- القفز إلى نقطة دخولٍ مُسمّاة (وهذا ما يُحدّده استخدام التسمية المُعيّنة واصفًا للربط).

فمثلًا، ينبغي لتصريف التعبير `5` (الذي يُقيّم ذاتيًّا) بهدفٍ هو المسجّل `val` وبربطٍ هو `next` أن يُنتج التعليمة

```scheme
(assign val (const 5))
```

وينبغي لتصريف التعبير ذاته بربطٍ هو `return` أن يُنتج التعليمات

```scheme
(assign val (const 5))
(goto (reg continue))
```

في الحالة الأولى، سيستمرّ التنفيذ بالتعليمة التالية في التسلسل. وفي الحالة الثانية، سنعود من نداء إجراء. وفي كلتي الحالتين، ستُوضع قيمة التعبير في مسجّل الهدف `val`.

#### تسلسلات التعليمات واستخدام المكدّس

يُعيد كلّ مولّد شيفرةٍ *تسلسل تعليمات (instruction sequence)* يحتوي شيفرة الهدف التي ولّدها للتعبير. أمّا توليد الشيفرة لتعبيرٍ مركّبٍ فيُنجَز بدمج مُخرَج مولّدات شيفرةٍ أبسط للتعابير المكوّنة، تمامًا كما يُنجَز تقييم تعبيرٍ مركّبٍ بتقييم التعابير المكوّنة له.

إنّ أبسط طريقةٍ لدمج تسلسلات التعليمات هو إجراءٌ يُسمّى `append-instruction-sequences`. وهو يأخذ كمعطيات أيّ عددٍ من تسلسلات التعليمات التي يُنفَّذ بالتعاقب؛ فإنّه يُلحق بعضها ببعض ويُعيد التسلسل المدمَج. أي أنّّه، إذا كان $⟨ s e q_{1} ⟩$ و$⟨ s e q_{2} ⟩$ تسلسلَي تعليمات، فإنّ تقييم

```scheme
(append-instruction-sequences ⟨seq₁⟩ ⟨seq₂⟩)
```

يُنتج التسلسل

```scheme
⟨seq₁⟩
⟨seq₂⟩
```

كلّما قد تحتاج المسجّلات إلى الحفظ، تستخدم مولّدات الشيفرة في المصرِّف `preserving`، وهي طريقة أكثر دقّةً لدمج تسلسلات التعليمات. و`preserving` تأخذ ثلاثة معطيات: مجموعةً من المسجّلات وتسلسلي تعليمات يُنفَّذان بالتعاقب. وهي تُلحق التسلسلين بعضهما ببعض بحيث تُحفظ محتويات كلّ مسجّلٍ في المجموعة على امتداد تنفيذ التسلسل الأوّل، إذا كان ذلك لازمًا لتنفيذ التسلسل الثاني. أي أنّّه، إذا عدّل التسلسل الأوّل المسجّل وكان التسلسل الثاني يحتاج فعلًا إلى محتويات المسجّل الأصليّة، فإنّ `preserving` تلفّ `save` و`restore` للمسجّل حول التسلسل الأوّل قبل إلحاق التسلسلين. وإلّا، فإنّ `preserving` تُعيد تسلسلات التعليمات الملحوقة فحسب. وبذلك، فإنّ `(preserving (list ⟨reg₁⟩ ⟨reg₂⟩) ⟨seg₁⟩ ⟨seg₂⟩)` مثلًا يُنتج واحدًا من تسلسلات التعليمات الأربعة الآتية، بحسب كيفيّة استخدام $⟨ s e q_{1} ⟩$ و$⟨ s e q_{2} ⟩$ لـ$⟨ r e g_{1} ⟩$ و$⟨ r e g_{2} ⟩$ : $⟨ s e q_{1} ⟩ (save (save (save ⟨ r e g_{2} ⟩ ) ⟨ s e q_{2} ⟩ ⟨ r e g_{1} ⟩ ) ⟨ r e g_{2} ⟩ ) (save ⟨ r e g_{1} ⟩ ) ⟨ s e q_{1} ⟩ ⟨ s e q_{1} ⟩ ⟨ s e q_{1} ⟩ (restore (restore (restore ⟨ r e g_{1} ⟩ ) ⟨ r e g_{1} ⟩ ) ⟨ r e g_{2} ⟩ ) (restore ⟨ r e g_{2} ⟩ ) ⟨ s e q_{2} ⟩ ⟨ s e q_{2} ⟩ ⟨ s e q_{2} ⟩$

إنّ استخدام `preserving` لدمج تسلسلات التعليمات يجعل المصرِّف يتجنّب عمليّات المكدّس غير الضروريّة. وهذا يعزل أيضًا تفاصيل ما إذا كان توليد تعليمات `save` و`restore` لازمًا أم لا داخل الإجراء `preserving`، فاصلًا إيّاها عن الهموم الناشئة عن كتابة كلّ مولّد شيفرةٍ فرديّ. فإنّه لا تُنتج فعليًّا أيّ تعليمة `save` أو `restore` صراحةً من قِبَل مولّدات الشيفرة.

من حيث المبدأ، كان بإمكاننا تمثيل تسلسل تعليماتٍ كقائمةٍ من التعليمات. وعندئذٍ يستطيع `append-instruction-sequences` دمج تسلسلات التعليمات بأداء `append` عاديّ على القوائم. لكنّ `preserving` سيصير عندئذٍ عمليّةً معقّدة، لأنّه سيتعيّن عليها تحليل كلّ تسلسل تعليماتٍ لتحديد كيفيّة استخدام التسلسل لمسجّلاته. و`preserving` سيكون غير كفؤٍ فضلًا عن كونه معقّدًا، لأنّه سيتعيّن عليه تحليل كلّ واحدٍ من معطياته التي هي تسلسلات تعليمات، حتّى وإن كانت هذه التسلسلات قد بُنيت بدورها بنداءاتٍ إلى `preserving`، وفي هذه الحالة تكون أجزاؤها قد حُلِّلت سابقًا. ولكي نتجنّب مثل هذا التحليل المتكرّر، سنربط بكلّ تسلسل تعليماتٍ بعض المعلومات حول استخدامه للمسجّلات. وحين نبني تسلسل تعليماتٍ أساسيًّا، سنُوفّر هذه المعلومات صراحةً، والإجراءات التي تدمج تسلسلات التعليمات ستستخرج معلومات استخدام المسجّلات للتسلسل المدمَج من المعلومات المرتبطة بالتسلسلات المكوّنة.

سيحتوي تسلسل التعليمات على ثلاثة أجزاء من المعلومات:

- مجموعة المسجّلات التي يجب تهيئتها قبل تنفيذ التعليمات في التسلسل (يُقال عن هذه المسجّلات أنّ التسلسل *يحتاج* إليها)،
- مجموعة المسجّلات التي تُعدّل قيمها التعليمات في التسلسل، و
- التعليمات الفعليّة (المسمّاة أيضًا *العبارات*) في التسلسل.

وسنمثّل تسلسل التعليمات كقائمةٍ من أجزائه الثلاثة. وباني تسلسلات التعليمات هو إذن

```scheme
(define (make-instruction-sequence 
         needs modifies statements)
  (list needs modifies statements))
```

فمثلًا، تسلسل التعليمتين الذي يبحث عن قيمة المتغيّر `x` في البيئة الحاليّة، ويسند النتيجة إلى `val`، ثم يرجع، يتطلّب أن يكون المسجّلان `env` و`continue` قد هُيّئا، ويعدّل المسجّل `val`. وبذلك، سيُبنى هذا التسلسل على النحو الآتي

```scheme
(make-instruction-sequence
 '(env continue)
 '(val)
 '((assign val
           (op lookup-variable-value)
           (const x)
           (reg env))
   (goto (reg continue))))
```

ونحتاج أحيانًا إلى بناء تسلسل تعليماتٍ بلا عبارات:

```scheme
(define (empty-instruction-sequence)
  (make-instruction-sequence '() '() '()))
```

الإجراءات الخاصة بدمج تسلسلات التعليمات موضّحة في [5.5.4](/book/sicp/c5-computing-with-register-machines/5-5/).

**التمرين 5.31:** في تقييم تطبيق إجراءٍ، يحفظ مُقيِّم التحكّم الصريح دائمًا المسجّل `env` ويعيده حول تقييم المشغّل، ويحفظ `env` ويعيده حول تقييم كلّ عاملٍ باستثناء الأخير، ويحفظ `argl` ويعيده حول تقييم كلّ عامل، ويحفظ `proc` ويعيده حول تقييم تسلسل العوامل. فبالنسبة لكلّ تركيبةٍ من التركيبات الآتية، قُل أيّ عمليّات `save` و`restore` هذه زائدةٌ عن الحاجة وبإمكانها بالتالي أن تُحذف بواسطة آليّة `preserving` في المصرِّف:

```scheme
(f 'x 'y)
((f) 'x 'y)
(f (g 'x) y)
(f (g 'x) 'y)
```

> **التمرين 5.32:** باستخدام آليّة `preserving`، سيتجنّب المصرِّف حفظ `env` وإعادته حول تقييم مشغّل تركيبةٍ في الحالة التي يكون فيها المشغّل رمزًا. وبإمكاننا أيضًا أن نُدمج تحسيناتٍ كهذه في المُقيِّم. ففي الحقيقة، إنّ مُقيِّم التحكّم الصريح الوارد في [5.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4) يؤدّي تحسينًا مشابهًا بالفعل، وذلك بمعاملة التركيبات التي لا عوامل لها كحالةٍ خاصّة. وسّع مُقيِّم التحكّم الصريح ليتعرّف على التركيبات التي مشغّلها رمز كصنفٍ منفصلٍ من التعابير، وليستثمر هذه الحقيقة في تقييم مثل هذه التعابير.
> > تقترح أليسا پي. هاكر أنه بتوسيع المُقيِّم ليتعرّف على المزيد من الحالات الخاصّة فأكثر، فبوسعنا أن نُدرج جميع تحسينات المصرِّف، وأنّ هذا من شأنه أن يُزيل مزيّة التصريف برمّتها. فما رأيك في هذه الفكرة؟
> > 

#### 5.5.2 تصريف التعابير

في هذا القسم والقسم التالي نُنفّذ مولّدات الشيفرة التي يُوزّع إليها الإجراء `compile`.

#### تصريف شيفرة الوصل

بصورةٍ عامّة، ستنتهي مخرجات كلّ مولّد شيفرةٍ بتعليماتٍ - تُولَّدها الإجراء `compile-linkage` - تُنفّذ الوصل المطلوب. فإن كان الوصل هو `return` فيجب أن نُولّد التعليمة `(goto (reg continue))`. وهذا يحتاج المسجّل `continue` ولا يعدّل أيّ مسجّلات. فإن كان الوصل هو `next`، فنحن لا نحتاج إلى إضافة أيّ تعليمات. وإلّا، فالوصل عنوانٌ (label)، ونُولّد `goto` إلى ذلك العنوان، وهو تعليمةٌ لا تحتاج ولا تعدّل أيّ مسجّلات.[^36]

```scheme
(define (compile-linkage linkage)
  (cond ((eq? linkage 'return)
         (make-instruction-sequence 
          '(continue)
          '()
          '((goto (reg continue)))))
        ((eq? linkage 'next)
         (empty-instruction-sequence))
        (else
         (make-instruction-sequence '() '()
          `((goto (label ,linkage)))))))
```

تُلحَق شيفرة الوصل بتسلسل تعليماتٍ بواسطة `preserving` للمسجّل `continue`، إذ إنّ وصل `return` سيحتاج المسجّل `continue`: فإن كان تسلسل التعليمات المعطى يُعدّل `continue` وشيفرة الوصل تحتاجه، فسيُحفظ `continue` ويُستعاد.

```scheme
(define (end-with-linkage 
         linkage instruction-sequence)
  (preserving '(continue)
   instruction-sequence
   (compile-linkage linkage)))
```

#### تصريف التعابير البسيطة

مولّدات الشيفرة الخاصّة بالتعابير التي تُقيّم ذاتيًّا والاقتباسات والمتغيّرات تبني تسلسلات تعليماتٍ تُسنِد القيمة المطلوبة إلى المسجّل الهدف ثم تواصل بالطريقة التي يُحدّدها واصف الوصل.

```scheme
(define (compile-self-evaluating 
         exp target linkage)
  (end-with-linkage
   linkage (make-instruction-sequence 
            '()
            (list target)
            `((assign ,target (const ,exp))))))

(define (compile-quoted exp target linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    '()
    (list target)
    `((assign 
       ,target
       (const ,(text-of-quotation exp)))))))

(define (compile-variable
         exp target linkage)
  (end-with-linkage 
   linkage
   (make-instruction-sequence 
    '(env)
    (list target)
    `((assign ,target
              (op lookup-variable-value)
              (const ,exp)
              (reg env))))))
```

جميع تعليمات الإسناد هذه تُعدّل المسجّل الهدف، وتلك التي تبحث عن قيمة متغيّر تحتاج المسجّل `env`.

وتُعالَج الإحلالات والتعريفات إلى حدٍّ كبيرٍ كما تُعالَج في المفسّر. فنحن نُولّد تعاوديًّا شيفرةً تحتسب القيمة التي ستُسنَد إلى المتغيّر، ونُلحق بها تسلسلًا من تعليمتين يُعيّن المتغيّر فعلًا أو يُعرّفه ويُسنِد قيمة التعبير كلّه (الرمز `ok`) إلى المسجّل الهدف. والتصريف التعاوديّ له هدفٌ هو `val` ووصلٌ هو `next` حتّى تضع الشيفرة نتيجتها في `val` وتواصل بالشيفرة المُلحَقة بعدها. أمّا الإلحاق فيُجرى مع حفظ `env`، إذ إنّ البيئة لازمة لتعيين المتغيّر أو تعريفه، وقد تكون شيفرة قيمة المتغيّر تصريفَ تعبيرٍ مركّب قد يُعدّل المسجّلات بطرائق اعتباطيّة.

```scheme
(define (compile-assignment 
         exp target linkage)
  (let ((var (assignment-variable exp))
        (get-value-code
         (compile (assignment-value exp) 
                  'val
                  'next)))
    (end-with-linkage 
     linkage
     (preserving 
      '(env)
      get-value-code
      (make-instruction-sequence
       '(env val)
       (list target)
       `((perform (op set-variable-value!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))))))))

(define (compile-definition 
         exp target linkage)
  (let ((var (definition-variable exp))
        (get-value-code
         (compile (definition-value exp)
                  'val
                  'next)))
    (end-with-linkage
     linkage
     (preserving 
      '(env)
      get-value-code
      (make-instruction-sequence
       '(env val)
       (list target)
       `((perform (op define-variable!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))))))))
```

التسلسل المُلحَق المكوّن من تعليمتين يحتاج `env` و`val` ويُعدّل الهدف. ولاحِظ أنّنا مع أنّنا نحفظ `env` من أجل هذا التسلسل، فإنّا لا نحفظ `val`، لأنّ `get-value-code` مُصمَّمٌ لوضع نتيجته في `val` صراحةً لاستخدام هذا التسلسل لها. (في الحقيقة، لو حفظنا `val`، لكان لدينا عِلّة، لأنّ هذا من شأنه أن يُسبّب استعادة المحتويات السابقة لـ`val` مباشرةً بعد تشغيل `get-value-code`.)

#### تصريف التعابير الشرطيّة

شيفرة تعبير `if` المُصَرَّف بهدفٍ ووصلٍ معطيين لها الصيغة الآتية

```scheme
⟨compilation of predicate, 
 target val, linkage next⟩
 (test (op false?) (reg val))
 (branch (label false-branch))
true-branch
 ⟨compilation of consequent with given 
  target and given linkage or after-if⟩
false-branch
 ⟨compilation of alternative 
  with given target and linkage⟩
after-if
```

ولتوليد هذه الشيفرة، نُصَرِّف المسيّم والنتيجة والبديل، وندمج الشيفرة الناتجة مع تعليماتٍ لاختبار نتيجة المسيّم ومع عناوينَ حديثةِ التوليد لوسم الفرع الصحيح والفرع الخاطئ ونهاية التعبير الشرطيّ.[^37] وفي هذا الترتيب للشيفرة، يجب أن نتفرّع متجاوزين الفرع الصحيح إذا كان الاختبار خاطئًا. والتعقيد الطفيف الوحيد هو في كيفيّة التعامل مع وصلة الفرع الصحيح. فإن كان وصلة التعبير الشرطيّ هو `return` أو عنوانًا، فإنّ الفرعين الصحيح والخاطئ سيستخدمان الوصل عينه. فإن كان الوصل هو `next`، فإنّ الفرع الصحيح ينتهي بقفزةٍ متجاوزةً شيفرة الفرع الخاطئ إلى العنوان عند نهاية التعبير الشرطيّ.

```scheme
(define (compile-if exp target linkage)
  (let ((t-branch (make-label 'true-branch))
        (f-branch (make-label 'false-branch))
        (after-if (make-label 'after-if)))
    (let ((consequent-linkage
           (if (eq? linkage 'next) 
               after-if
               linkage)))
      (let ((p-code 
             (compile (if-predicate exp)
                      'val
                      'next))
            (c-code
             (compile (if-consequent exp) 
                      target 
                      consequent-linkage))
            (a-code
             (compile (if-alternative exp)
                      target
                      linkage)))
        (preserving 
         '(env continue)
         p-code
         (append-instruction-sequences
          (make-instruction-sequence 
           '(val) 
           '()
           `((test (op false?) (reg val))
             (branch (label ,f-branch))))
          (parallel-instruction-sequences
           (append-instruction-sequences 
            t-branch c-code)
           (append-instruction-sequences
            f-branch a-code))
          after-if))))))
```

يُحفظ `env` حول شيفرة المسيّم لأنّ الفرعين الصحيح والخاطئ قد يحتاجانه، ويُحفظ `continue` لأنّ شيفرة الوصل في هذين الفرعين قد تحتاجه. وشيفرة الفرعين الصحيح والخاطئ (اللذين لا يُنفّذان تسلسليًّا) تُلحَق باستخدام مُدَمِّجٍ خاصّ هو `parallel-instruction-sequences` الموصوف في [5.5.4](/book/sicp/c5-computing-with-register-machines/5-5/).

ولاحِظ أنّ `cond` تعبيرٌ مشتقّ، فكلّ ما يلزم المصرِّف ليتعامل معه هو أن يُطبّق المحوّل `cond->if` (من [4.1.2](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2)) ثم يُصَرِّف تعبير `if` الناتج.

#### تصريف التسلسلات

إنّ تصريف التسلسلات (الواردة في أجسام الإجراءات أو في تعابير `begin` الصريحة) يوازي تقييمها. فيُصَرَّف كلّ تعبيرٍ من التسلسل - التعبير الأخير بالوصل المحدَّد للتسلسل، والتعبيرات الأخرى بوصل `next` (لتنفيذ بقيّة التسلسل). وتُلحَق تسلسلات التعليمات الخاصّة بالتعابير المنفردة لتكوين تسلسل تعليماتٍ واحد، بحيث يُحفظ `env` (اللازم لبقيّة التسلسل) و`continue` (الذي قد يكون لازما للوصل عند نهاية التسلسل).

```scheme
(define (compile-sequence seq target linkage)
  (if (last-exp? seq)
      (compile (first-exp seq) target linkage)
      (preserving '(env continue)
       (compile (first-exp seq) target 'next)
       (compile-sequence (rest-exps seq)
                         target
                         linkage))))
```

#### تصريف تعابير `lambda`

إنّ تعابير `lambda` تُنشئ الإجراءات. ويجب أن تكون الشيفرة الهدف لتعبير `lambda` على الصيغة الآتية

```scheme
⟨construct procedure object 
 and assign it to target register⟩
⟨linkage⟩
```

وحين نُصَرِّف تعبير `lambda`، نُولّد أيضًا الشيفرة الخاصّة بجسم الإجراء. فعلى الرغم من أنّ الجسم لن يُنفَّذ وقت بناء الإجراء، فمن الملائم إدراجه في الشيفرة الهدف مباشرةً بعد شيفرة `lambda`. فإن كان وصلة تعبير `lambda` عنوانًا أو `return`، فهذا حسن. لكن إن كان الوصل هو `next`، فسنحتاج إلى التجاوز حول شيفرة جسم الإجراء باستخدام وصلةٍ تقفز إلى عنوانٍ يُدرج بعد الجسم. وبذلك، تكون الشيفرة الهدف على الصيغة الآتية

```scheme
⟨construct procedure object 
 and assign it to target register⟩
 ⟨code for given linkage⟩ or 
  (goto (label after-lambda))
 ⟨compilation of procedure body⟩
after-lambda
```

يُولّد `compile-lambda` شيفرة بناء كائن الإجراء متبوعةً بشيفرة جسم الإجراء. وسيُبنى كائن الإجراء في وقت التشغيل بدمج البيئة الحاليّة (البيئة عند نقطة التعريف) مع نقطة الدخول إلى جسم الإجراء المُصَرَّف (وهو عنوانٌ حديث التوليد).[^38]

```scheme
(define (compile-lambda exp target linkage)
  (let ((proc-entry 
         (make-label 'entry))
        (after-lambda 
         (make-label 'after-lambda)))
    (let ((lambda-linkage
           (if (eq? linkage 'next)
               after-lambda
               linkage)))
      (append-instruction-sequences
       (tack-on-instruction-sequence
        (end-with-linkage 
         lambda-linkage
         (make-instruction-sequence 
          '(env)
          (list target)
          `((assign 
             ,target
             (op make-compiled-procedure)
             (label ,proc-entry)
             (reg env)))))
        (compile-lambda-body exp proc-entry))
       after-lambda))))
```

يستخدم `compile-lambda` المُدَمِّج الخاصّ `tack-on-instruction-sequence` بدلًا من `append-instruction-sequences` ([5.5.4](/book/sicp/c5-computing-with-register-machines/5-5/)) لإلحاق جسم الإجراء بشيفرة تعبير `lambda`، لأنّ الجسم ليس جزءًا من تسلسل التعليمات الذي سيُنفَّذ عند الدخول إلى التسلسل المدمج؛ بل هو في التسلسل فقط لأنّ ذلك كان موضعًا ملائمًا لوضع الجسم فيه.

يُعمّر `compile-lambda-body` شيفرة جسم الإجراء. فتبدأ هذه الشيفرة بعنوانٍ لنقطة الدخول. ثمّ تأتي تعليماتٌ ستُسبّب انتقال بيئة التقييم في وقت التشغيل إلى البيئة الصحيحة لتقييم جسم الإجراء - أي بيئةُ تعريف الإجراء، ممدودةً لتشمل ربط الوسائط الشكليّة بالمعطيات التي يُدعى بها الإجراء. وبعد هذا تأتي شيفرة تسلسل التعابير الذي يؤلّف جسم الإجراء. ويُصَرَّف التسلسل بوصل `return` وهدف `val` حتّى ينتهي بالرجوع من الإجراء ونتيجة الإجراء في `val`.

```scheme
(define (compile-lambda-body exp proc-entry)
  (let ((formals (lambda-parameters exp)))
    (append-instruction-sequences
     (make-instruction-sequence 
      '(env proc argl)
      '(env)
      `(,proc-entry
        (assign env 
                (op compiled-procedure-env)
                (reg proc))
        (assign env
                (op extend-environment)
                (const ,formals)
                (reg argl)
                (reg env))))
     (compile-sequence (lambda-body exp)
                       'val
                       'return))))
```

#### 5.5.3 تصريف التركيبات

إنّ جوهر عمليّة التصريف هو تصريف تطبيقات الإجراءات. وشيفرة تركيبةٍ مُصَرَّفة بهدفٍ ووصلٍ معطيين لها الصيغة الآتية

```scheme
⟨compilation of operator, 
 target proc, linkage next⟩
⟨evaluate operands and construct 
 argument list in argl⟩
⟨compilation of procedure call 
 with given target and linkage⟩
```

قد يلزم حفظ المسجّلات `env` و`proc` و`argl` وإعادتها خلال تقييم المشغّل والعوامل. ولاحِظ أنّ هذا هو الموضع الوحيد في المصرِّف الذي يُحدَّد فيه هدفٌ غير `val`.

تُولَّد الشيفرة المطلوبة بواسطة `compile-application`. فهذا يُصَرِّف تعاوديًّا المشغّل، لإنتاج شيفرةٍ تضع الإجراء المطلوب تطبيقه في `proc`، ويُصَرِّف العوامل، لإنتاج شيفرةٍ تُقيّم عوامل التطبيق المنفردة. وتُدمَج تسلسلات التعليمات الخاصّة بالعوامل (بواسطة `construct-arglist`) مع شيفرةٍ تبني قائمة المعطيات في `argl`، وتُدمَج شيفرة قائمة المعطيات الناتجة مع شيفرة الإجراء ومع الشيفرة التي تؤدّي نداء الإجراء (والتي يُنتجها `compile-procedure-call`). وعند إلحاق تسلسلات الشيفرة، يجب حفظ المسجّل `env` حول تقييم المشغّل (إذ إنّ تقييم المشغّل قد يُعدّل `env`، الذي سيكون لازمًا لتقييم العوامل)، ويجب حفظ المسجّل `proc` حول بناء قائمة المعطيات (إذ إنّ تقييم العوامل قد يُعدّل `proc`، الذي سيكون لازمًا لتطبيق الإجراء الفعليّ). ويجب حفظ `continue` على مدى ذلك كلّه أيضًا، إذ إنّه لازم للوصل في نداء الإجراء.

```scheme
(define (compile-application 
         exp target linkage)
  (let ((proc-code 
         (compile (operator exp) 'proc 'next))
        (operand-codes
         (map (lambda (operand)
                (compile operand 'val 'next))
              (operands exp))))
    (preserving 
     '(env continue)
     proc-code
     (preserving 
      '(proc continue)
      (construct-arglist operand-codes)
      (compile-procedure-call 
       target
       linkage)))))
```

ستُقيّم شيفرة بناء قائمة المعطيات كلّ عاملٍ إلى `val` ثم تعمل `cons` لتلك القيمة على قائمة المعطيات المتراكمة في `argl`. وبما أنّنا نعمل `cons` للمعطيات على `argl` تسلسليًّا، فيجب أن نبدأ بالمعطى الأخير وننتهي بالأوّل، حتّى تظهر المعطيات في القائمة الناتجة مرتّبةً من الأوّل إلى الأخير. وبدلًا من إهدار تعليمةٍ بتهيئة `argl` إلى القائمة الخالية للإعداد لهذا التسلسل من التقييمات، نجعل أوّل تسلسل شيفرةٍ يبني `argl` الأوّليّة. وبذلك، فإنّ الصيغة العامّة لبناء قائمة المعطيات هي كالآتي:

```scheme
⟨compilation of last operand, targeted to val⟩
(assign argl (op list) (reg val))
⟨compilation of next operand, targeted to val⟩
(assign argl (op cons) (reg val) (reg argl))
…
⟨compilation of first operand, targeted to val⟩
(assign argl (op cons) (reg val) (reg argl))
```

يجب حفظ `argl` حول تقييم كلّ عاملٍ باستثناء الأوّل (حتّى لا تُفقد المعطيات المتراكمة حتّى الآن)، ويجب حفظ `env` حول تقييم كلّ عاملٍ باستثناء الأخير (لاستخدامه في تقييمات العوامل التالية).

إنّ تصريف شيفرة المعطيات هذه شاقٌّ بعض الشيء، بسبب المعاملة الخاصّة لأوّل عاملٍ يُقيَّم والحاجة إلى حفظ `argl` و`env` في مواضع مختلفة. ويأخذ الإجراء `construct-arglist` كمعطياتٍ الشيفرة التي تُقيّم العوامل المنفردة. فإن لم تكن هناك عواملٌ إطلاقًا، فهو يُخرج التعليمة الآتية ببساطةٍ

```scheme
(assign argl (const ()))
```

وإلّا، فإنّ `construct-arglist` يُنشئ شيفرةً تُهيّئ `argl` بالمعطى الأخير، ويلحق بها شيفرةً تُقيّم بقيّة المعطيات وتُضمّها إلى `argl` تتابعًا. ولكي نعالج المعطيات من الأخير إلى الأوّل، يجب أن نعكس قائمة تسلسلات شيفرة العوامل عن الترتيب الذي يُوفّره `compile-application`.

```scheme
(define (construct-arglist operand-codes)
  (let ((operand-codes 
         (reverse operand-codes)))
    (if (null? operand-codes)
        (make-instruction-sequence 
         '() 
         '(argl)
         '((assign argl (const ()))))
        (let ((code-to-get-last-arg
               (append-instruction-sequences
                (car operand-codes)
                (make-instruction-sequence 
                 '(val)
                 '(argl)
                 '((assign argl
                           (op list)
                           (reg val)))))))
          (if (null? (cdr operand-codes))
              code-to-get-last-arg
              (preserving 
               '(env)
               code-to-get-last-arg
               (code-to-get-rest-args
                (cdr operand-codes))))))))

(define (code-to-get-rest-args operand-codes)
  (let ((code-for-next-arg
         (preserving 
          '(argl)
          (car operand-codes)
          (make-instruction-sequence 
           '(val argl)
           '(argl)
           '((assign argl
                     (op cons)
                     (reg val)
                     (reg argl)))))))
    (if (null? (cdr operand-codes))
        code-for-next-arg
        (preserving 
         '(env)
         code-for-next-arg
         (code-to-get-rest-args 
          (cdr operand-codes))))))
```

#### تطبيق الإجراءات

وبعد تقييم عناصر تركيبةٍ، يجب أن تُطبّق الشيفرة المُصَرَّفة الإجراءَ الموجود في `proc` على المعطيات الموجودة في `argl`. وإنّ الشيفرة تُجري التوزيع عينه أساسًا كما يُجريه الإجراء `apply` في المُقيِّم الحلقيّ الوسيط (metacircular evaluator) الوارد في [4.1.1](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1) أو نقطة الدخول `apply-dispatch` في مُقيِّم التحكّم الصريح الوارد في [5.4.1](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1). فهي تفحص ما إذا كان الإجراء المطلوب تطبيقه إجراءً أوّليًّا أم إجراءً مُصَرَّفًا. فبالنسبة للإجراء الأوّليّ، فهي تستخدم `apply-primitive-procedure`؛ وسنرى قريبًا كيف تتعامل مع الإجراءات المُصَرَّفة. وشيفرة تطبيق الإجراء لها الصيغة الآتية:

```scheme
(test (op primitive-procedure?) (reg proc))
 (branch (label primitive-branch))
compiled-branch
 ⟨code to apply compiled procedure 
  with given target and appropriate linkage⟩
primitive-branch
 (assign ⟨target⟩
         (op apply-primitive-procedure)
         (reg proc)
         (reg argl))
 ⟨linkage⟩
after-call
```

لاحِظ أنّ الفرع المُصَرَّف يجب أن يتجاوز الفرع الأوّليّ. وبناءً على ذلك، فإن كان وصلة نداء الإجراء الأصليّ هو `next`، فيجب أن يستخدم الفرع المركّب وصلةً تقفز إلى عنوانٍ يُدرج بعد الفرع الأوّليّ. (وهذا شبيه بالوصل المستخدم للفرع الصحيح في `compile-if`.)

```scheme
(define (compile-procedure-call
         target linkage)
  (let ((primitive-branch 
         (make-label 'primitive-branch))
        (compiled-branch 
         (make-label 'compiled-branch))
        (after-call
         (make-label 'after-call)))
    (let ((compiled-linkage
           (if (eq? linkage 'next)
               after-call
               linkage)))
      (append-instruction-sequences
       (make-instruction-sequence 
        '(proc)
        '()
        `((test 
           (op primitive-procedure?)
           (reg proc))
          (branch 
           (label ,primitive-branch))))
       (parallel-instruction-sequences
        (append-instruction-sequences
         compiled-branch
         (compile-proc-appl 
          target
          compiled-linkage))
        (append-instruction-sequences
         primitive-branch
         (end-with-linkage
          linkage
          (make-instruction-sequence
           '(proc argl)
           (list target)
           `((assign 
              ,target
              (op apply-primitive-procedure)
              (reg proc)
              (reg argl)))))))
       after-call))))
```

الفرعان الأوّليّ والمركّب، كالفرعين الصحيح والخاطئ في `compile-if`، يُلحَقان باستخدام `parallel-instruction-sequences` بدلًا من `append-instruction-sequences` الاعتياديّ، لأنّهما لن يُنفَّذا تسلسليًّا.

#### تطبيق الإجراءات المصرَّفة

الشيفرة التي تتولّى تطبيق الإجراءات هي أدقّ أجزاء المصرِّف، مع أنّ متسلسلات التعليمات التي تُنتجها قصيرةٌ جدًّا. فالإجراء المصرَّف (كما يبنيه `compile-lambda`) له نقطةُ دخولٍ، وهي عنوانٌ يُعرّف موضع بداية شيفرة الإجراء. والشيفرة عند نقطة الدخول هذه تحسب نتيجةً في `val` وتعود بتنفيذ التعليمة `(goto (reg continue))`. وهكذا، فقد نتوقّع أن تكون الشيفرة الخاصّة بتطبيق إجراءٍ مصرَّفٍ (التي سيُنتجها `compile-proc-appl`) بهدفٍ ووصلةٍ معطيّين على هذه الصورة إذا كانت الوصلة عنوانًا

```scheme
(assign continue 
        (label proc-return))
 (assign val
         (op compiled-procedure-entry)
         (reg proc))
 (goto (reg val))
proc-return
 (assign ⟨target⟩ 
         (reg val))   ; included if target is not val
 (goto (label ⟨linkage⟩))   ; linkage code
```

أو على هذه الصورة إذا كانت الوصلة هي `return`.

```scheme
(save continue)
 (assign continue 
         (label proc-return))
 (assign val 
         (op compiled-procedure-entry)
         (reg proc))
 (goto (reg val))
proc-return
 (assign ⟨target⟩
         (reg val))   ; included if target is not val
 (restore continue)
 (goto (reg continue))   ; linkage code
```

تُهيِّئ هذه الشيفرة `continue` بحيث يعود الإجراء إلى عنوانٍ اسمه `proc-return` وتقفز إلى نقطة دخول الإجراء. والشيفرة عند `proc-return` تنقل نتيجة الإجراء من `val` إلى المسجّل الهدف (إن لزم الأمر) ثم تقفز إلى الموضع الذي تُحدّده الوصلة. (فالوصلة تكون دائمًا `return` أو عنوانًا، لأنّ `compile-procedure-call` يستبدل وصلة `next` المخصّصة للفرع المركّب بعنوانٍ اسمه `after-call`.)

في الحقيقة، إذا لم يكن الهدف هو `val`، فهذه هي بالضبط الشيفرة التي سيُنتجها مصرّفنا.[^39] غير أنّ الهدف عادةً هو `val` (والمرّة الوحيدة التي يُحدّد فيها المصرِّف مسجّلًا مختلفًا هي عندما يكون الهدف تقييمَ مشغّلٍ في `proc`)، ولذلك تُوضع نتيجة الإجراء مباشرةً في المسجّل الهدف ولا حاجة إلى العودة إلى موضعٍ خاصٍّ ينسخها. وبدلًا من ذلك، نبسّط الشيفرة بتهيئة `continue` بحيث «يعود» الإجراء مباشرةً إلى الموضع الذي تُحدّده وصلة المُنادِي:

```scheme
⟨set up continue for linkage⟩
(assign val 
        (op compiled-procedure-entry)
        (reg proc))
(goto (reg val))
```

إذا كانت الوصلة عنوانًا، نُهيِّئ `continue` بحيث يعود الإجراء إلى ذلك العنوان. (أي أنّ `(goto (reg continue))` الذي يُنهي به الإجراء عمله يصبح مكافئًا للـ`(goto (label ⟨linkage⟩))` عند `proc-return` أعلاه.)

```scheme
(assign continue 
        (label ⟨linkage⟩))
(assign val
        (op compiled-procedure-entry)
        (reg proc))
(goto (reg val))
```

إذا كانت الوصلة هي `return`، فلا نحتاج إلى تهيئة `continue` إطلاقًا: فهو يحمل الموضع المطلوب أصلًا. (أي أنّ `(goto (reg continue))` الذي يُنهي به الإجراء عمله ينتقل مباشرةً إلى الموضع الذي كان `(goto (reg continue))` عند `proc-return` سينتقل إليه.)

```scheme
(assign val
        (op compiled-procedure-entry)
        (reg proc))
(goto (reg val))
```

وبهذا التنفيذ للوصلة `return`، يُنتج المصرِّف شيفرةً تعاوديّةً ذيليّةً. فإنّ نداء إجراءٍ كخطوةٍ أخيرةٍ في جسم الإجراء يؤدّي نقلًا مباشرًا، دون حفظ أيّ معلوماتٍ في المكدس.

أمّا لو كنّا قد تعاملنا مع حالة نداء إجراءٍ بوصلةٍ `return` وهدفٍ هو `val` كما عُرض أعلاه لهدفٍ ليس `val`، لدمّرنا التعاود الذيليّ. فسيظلّ نظامنا يُعطي القيمة ذاتها لأيّ تعبيرٍ. لكنّنا كنّا، في كلّ مرّةٍ ننادي فيها إجراءً، سنحفظ `continue` ونعود بعد النداء للتراجع عن الحفظ (عديم الفائدة). وهذه الحفظات الإضافيّة ستتراكم أثناء عشٍّ من نداءات الإجراءات.[^40]

يُنتج `compile-proc-appl` شيفرة تطبيق الإجراءات أعلاه بدرس أربع حالات، تبعًا لما إذا كان الهدف للنداء هو `val` ولما إذا كانت الوصلة هي `return`. ولاحِظ أنّ متسلسلات التعليمات مُعلَنةٌ بأنّها تعدّل جميع المسجّلات، إذ إنّ تنفيذ جسم الإجراء قد يغيّر المسجّلات بطرائق اعتباطيّة.[^41] ولاحِظ أيضًا أنّ متسلسلة الشيفرة للحالة ذات الهدف `val` والوصلة `return` مُعلَنةٌ باحتياجها إلى `continue`: فعلى الرغم من أنّ `continue` غير مستخدمٍ صراحةً في متسلسلة التعليمتين، ينبغي أن نتيقّن من أنّ `continue` سيحمل القيمة الصحيحة عندما ندخل الإجراء المصرَّف.

```scheme
(define (compile-proc-appl target linkage)
  (cond ((and (eq? target 'val)
              (not (eq? linkage 'return)))
         (make-instruction-sequence 
          '(proc)
          all-regs
          `((assign continue (label ,linkage))
            (assign 
             val 
             (op compiled-procedure-entry)
             (reg proc))
            (goto (reg val)))))
        ((and (not (eq? target 'val))
              (not (eq? linkage 'return)))
         (let ((proc-return 
                (make-label 'proc-return)))
           (make-instruction-sequence 
            '(proc)
            all-regs
            `((assign continue 
                      (label ,proc-return))
              (assign 
               val 
               (op compiled-procedure-entry)
               (reg proc))
              (goto (reg val))
              ,proc-return
              (assign ,target (reg val))
              (goto (label ,linkage))))))
        ((and (eq? target 'val)
              (eq? linkage 'return))
         (make-instruction-sequence 
          '(proc continue) 
          all-regs
          '((assign 
             val 
             (op compiled-procedure-entry)
             (reg proc))
            (goto (reg val)))))
        ((and (not (eq? target 'val))
              (eq? linkage 'return))
         (error "return linkage, 
                 target not val: COMPILE"
                target))))
```

#### 5.5.4 دمج متسلسلات التعليمات

يصف هذا القسم تفاصيل كيفيّة تمثيل متسلسلات التعليمات ودمجها. فتذكّر من [5.5.1](/book/sicp/c5-computing-with-register-machines/5-5/) أنّ متسلسلة التعليمات تُمثَّل بقائمةٍ من المسجّلات المطلوبة، والمسجّلات المعدَّلة، والتعليمات الفعليّة. وسنعتبر أيضًا العنوان (رمز) حالةً منحطّةً من متسلسلة التعليمات، لا تحتاج ولا تعدّل أيّ مسجّلات. ولتحديد المسجّلات المطلوبة والمعدَّلة بواسطة متسلسلات التعليمات نستخدم المحدِّدات

```scheme
(define (registers-needed s)
  (if (symbol? s) '() (car s)))
(define (registers-modified s)
  (if (symbol? s) '() (cadr s)))
(define (statements s)
  (if (symbol? s) (list s) (caddr s)))
```

ولتحديد ما إذا كانت متسلسلةٌ معطاةٌ تحتاج مسجّلًا معطىً أو تعدّله نستخدم المُسَيِّمات

```scheme
(define (needs-register? seq reg)
  (memq reg (registers-needed seq)))
(define (modifies-register? seq reg)
  (memq reg (registers-modified seq)))
```

بدلالة هذه المُسَيِّمات والمحدِّدات، نستطيع تنفيذ مُجمِّعات متسلسلات التعليمات المتنوّعة المستخدمة في أرجاء المصرِّف.

المُجمِّع الأساسيّ هو `append-instruction-sequences`. فهو يأخذ كمعطياتٍ عددًا اعتباطيًّا من متسلسلات التعليمات التي ستُنفَّذ متسلسلةً ويُعيد متسلسلة تعليماتٍ بياناتُها هي بيانات جميع المتسلسلات ملحقةً بعضها ببعض. والنقطة الدقيقة هي تحديد المسجّلات التي تحتاجها المتسلسلة الناتجة وتعدّلها. فإنّها تعدّل تلك المسجّلات التي تعدّلها أيٌّ من المتسلسلات؛ وتحتاج تلك المسجّلات التي يجب تهيئتها قبل أن تُشغَّل المتسلسلة الأولى (المسجّلات التي تحتاجها المتسلسلة الأولى)، مع تلك المسجّلات التي تحتاجها أيٌّ من المتسلسلات الأخرى والتي لا تُهيَّأ (تُعدَّل) بواسطة المتسلسلات السابقة لها.

تُلحَق المتسلسلات اثنتين في كلّ مرّةٍ بواسطة `append-2-sequences`. فهذا يأخذ متسلسلتي تعليماتٍ `seq1` و`seq2` ويُعيد متسلسلة التعليمات التي بياناتُها هي بيانات `seq1` متبوعةً ببيانات `seq2`، ومسجّلاتها المعدَّلة هي تلك المسجّلات التي تعدّلها إمّا `seq1` وإمّا `seq2`، ومسجّلاتها المطلوبة هي المسجّلات التي تحتاجها `seq1` مع تلك المسجّلات التي تحتاجها `seq2` والتي لا تعدّلها `seq1`. (وبدلالة عمليّات المجموعات، مجموعة المسجّلات المطلوبة الجديدة هي اتحاد مجموعة المسجّلات التي تحتاجها `seq1` مع الفرق بين مجموعة المسجّلات التي تحتاجها `seq2` والمسجّلات التي تعدّلها `seq1`.) وهكذا، يُنفَّذ `append-instruction-sequences` كما يلي:

```scheme
(define (append-instruction-sequences . seqs)
  (define (append-2-sequences seq1 seq2)
    (make-instruction-sequence
     (list-union 
      (registers-needed seq1)
      (list-difference 
       (registers-needed seq2)
       (registers-modified seq1)))
     (list-union
      (registers-modified seq1)
      (registers-modified seq2))
     (append (statements seq1)
             (statements seq2))))
  (define (append-seq-list seqs)
    (if (null? seqs)
        (empty-instruction-sequence)
        (append-2-sequences 
         (car seqs)
         (append-seq-list (cdr seqs)))))
  (append-seq-list seqs))
```

ويستخدم هذا الإجراء بعض العمليّات البسيطة للتلاعب بمجموعاتٍ ممثَّلةٍ كقوائم، شبيهةً بتمثيل المجموعات (غير المرتّب) الموصوف في [2.3.3](https://sarabander.github.io/sicp/html/2_002e3.xhtml#g_t2_002e3_002e3):

```scheme
(define (list-union s1 s2)
  (cond ((null? s1) s2)
        ((memq (car s1) s2)
         (list-union (cdr s1) s2))
        (else
         (cons (car s1)
               (list-union (cdr s1) s2)))))

(define (list-difference s1 s2)
  (cond ((null? s1) '())
        ((memq (car s1) s2)
         (list-difference (cdr s1) s2))
        (else 
         (cons (car s1)
               (list-difference (cdr s1)
                                s2)))))
```

يأخذ `preserving`، مُجمِّع متسلسلات التعليمات الرئيسيّ الثاني، قائمةً من المسجّلات `regs` ومتسلسلتي تعليماتٍ `seq1` و`seq2` ستُنفَّذان متسلسلةً. وهو يُعيد متسلسلة تعليماتٍ بياناتُها هي بيانات `seq1` متبوعةً ببيانات `seq2`، مع تعليمات `save` و`restore` مناسقتين حول `seq1` لحماية المسجّلات في `regs` التي تعدّلها `seq1` لكنّها يحتاجها `seq2`. ولتحقيق ذلك، ينشئ `preserving` أوّلًا متسلسلةً تحتوي تعليمات `save` المطلوبة متبوعةً ببيانات `seq1` متبوعةً بتعليمات `restore` المطلوبة. وتحتاج هذه المتسلسلة المسجّلات التي تُحفظ وتُستعاد إضافةً إلى المسجّلات التي تحتاجها `seq1`، وتعدّل المسجّلات التي تعدّلها `seq1` عدا تلك التي تُحفظ وتُستعاد. ثُمّ تُلحَق هذه المتسلسلة المُعزَّزة و`seq2` بالطريقة المعتادة. وينفّذ الإجراء التالي هذه الاستراتيجيّة تعاوديًّا، نازلًا في قائمة المسجّلات الواجب حمايتها:[^42]

```scheme
(define (preserving regs seq1 seq2)
  (if (null? regs)
      (append-instruction-sequences seq1 seq2)
      (let ((first-reg (car regs)))
        (if (and 
             (needs-register? seq2 first-reg)
             (modifies-register? seq1 
                                 first-reg))
            (preserving 
             (cdr regs)
             (make-instruction-sequence
              (list-union 
               (list first-reg)
               (registers-needed seq1))
              (list-difference
               (registers-modified seq1)
               (list first-reg))
              (append `((save ,first-reg))
                      (statements seq1)
                      `((restore ,first-reg))))
             seq2)
            (preserving 
             (cdr regs)
             seq1
             seq2)))))
```

وهناك مُجمِّع متسلسلاتٍ آخر، هو `tack-on-instruction-sequence`، تستخدمه `compile-lambda` لإلحاق جسم إجراءٍ بمتسلسلةٍ أخرى. ولأنّ جسم الإجراء ليس «على الخطّ» ليُنفَّذ كجزءٍ من المتسلسلة المدمجة، فإنّ استخدامه للمسجّلات لا يؤثّر في استخدام المتسلسلة المضيفة له للمسجّلات. ولذلك نتجاهل مجموعتي المسجّلات المطلوبة والمعدَّلة الخاصّتين بجسم الإجراء حين نُلحقه بالمتسلسلة الأخرى.

```scheme
(define (tack-on-instruction-sequence 
         seq body-seq)
  (make-instruction-sequence
   (registers-needed seq)
   (registers-modified seq)
   (append (statements seq)
           (statements body-seq))))
```

يستخدم `compile-if` و`compile-procedure-call` مُجمِّعًا خاصًّا يُسمّى `parallel-instruction-sequences` لإلحاق الفرعين البديلين اللذين يليان اختبارًا. فلن يُنفَّذ الفرعان متسلسلين أبدًا؛ ففي أيّ تقييمٍ معيّنٍ للاختبار، يُدخل أحد الفرعين أو الآخر. ولهذا السبب، تظلّ المسجّلات التي يحتاجها الفرع الثاني مطلوبةً بواسطة المتسلسلة المدمجة، حتّى لو عدّلها الفرع الأوّل.

```scheme
(define (parallel-instruction-sequences 
         seq1 seq2)
  (make-instruction-sequence
   (list-union (registers-needed seq1)
               (registers-needed seq2))
   (list-union (registers-modified seq1)
               (registers-modified seq2))
   (append (statements seq1)
           (statements seq2))))
```

#### 5.5.5 مثال على شيفرة مصرَّفة

والآن بعد أن رأينا جميع عناصر المصرِّف، دعنا نفحص مثالًا على شيفرةٍ مصرَّفةٍ لنرى كيف تتناسب الأجزاء معًا. فسنُصرّف تعريف إجراء `factorial` تعاوديٍّ بنداء `compile`:

```scheme
(compile
 '(define (factorial n)
    (if (= n 1)
        1
        (* (factorial (- n 1)) n)))
 'val
 'next)
```

لقد حدّدنا أنّ قيمة تعبير `define` ينبغي أن تُوضع في المسجّل `val`. ولا يهمّنا ما تفعله الشيفرة المصرَّفة بعد تنفيذ `define`، فاختيارنا `next` كواصف الوصلة اعتباطيّ.

يحدّد `compile` أنّ التعبير تعريفٌ، فينادي `compile-definition` ليُصرّف شيفرةً تحسب القيمة التي ستُسَنَّد (موجّهةً إلى `val`)، تليها شيفرةٌ لتنصيب التعريف، تليها شيفرةٌ لوضع قيمة `define` (وهي الرمز `ok`) في المسجّل الهدف، تليها أخيرًا شيفرة الوصلة. ويُحتفظ بـ`env` أثناء احتساب القيمة، لأنّها لازمة لتنصيب التعريف. ولأنّ الوصلة هي `next`، فلا وجود لشيفرة الوصلة في هذه الحالة. وهكذا يكون الهيكل العظميّ للشيفرة المصرَّفة

```scheme
⟨save env if modified by code to compute value⟩
  ⟨compilation of definition value, 
   target val, linkage next⟩
  ⟨restore env if saved above⟩
  (perform (op define-variable!)
           (const factorial)
           (reg val)
           (reg env))
  (assign val (const ok))
```

التعبير الذي سيُصرَّف لإنتاج قيمة المتغيّر `factorial` هو تعبير `lambda` قيمتُه هي الإجراء الذي يحسب العامليّات. ويتعامل `compile` مع هذا بنداء `compile-lambda`، الذي يُصرّف جسم الإجراء، ووسمه كنقطة دخولٍ جديدة، ويُنتج التعليمة التي ستدمج جسم الإجراء عند نقطة الدخول الجديدة مع بيئة وقت التشغيل وتُسند النتيجة إلى `val`. ثم تقفز المتسلسلة فوق شيفرة الإجراء المصرَّفة، التي تُدرَج عند هذه النقطة. وتبدأ شيفرة الإجراء ذاتها بتمديد بيئة تعريف الإجراء بإطارٍ يربط الوسيط الشكليّ `n` بمعطى الإجراء. ثم يأتي جسم الإجراء الفعليّ. وبما أنّ هذه الشيفرة الخاصّة بقيمة المتغيّر لا تعدّل المسجّل `env`، فإنّ تعليمتَي `save` و`restore` الاختياريّتين المعروضتين أعلاه لا تُنتَجان. (فشيفرة الإجراء عند `entry2` لا تُنفَّذ في هذه المرحلة، فاستخدامها لـ`env` غير ذي صلة.) ولذلك، يصبح الهيكل العظميّ للشيفرة المصرَّفة

```scheme
  (assign val (op make-compiled-procedure)
              (label entry2)
              (reg env))
  (goto (label after-lambda1))
entry2
  (assign env (op compiled-procedure-env)
              (reg proc))
  (assign env (op extend-environment)
              (const (n))
              (reg argl)
              (reg env))
  ⟨compilation of procedure body⟩
after-lambda1
  (perform (op define-variable!)
           (const factorial)
           (reg val) (reg env))
  (assign val (const ok))
```

يُصرَّف جسم الإجراء دائمًا (بواسطة `compile-lambda-body`) كمتسلسلةٍ هدفُها `val` ووصلتُها `return`. والمتسلسلة في هذه الحالة تتألّف من تعبير `if` واحد:

```scheme
(if (= n 1)
    1
    (* (factorial (- n 1)) n))
```

يُنتج `compile-if` شيفرةً تحسب المُسَيِّم أوّلًا (موجّهةً إلى `val`)، ثم تفحص النتيجة وتتفرّع حول الفرع الصحيح إذا كان المُسَيِّم خاطئًا. ويُحتفظ بـ`env` و`continue` حول شيفرة المُسَيِّم، إذ قد تكونان لازمين لبقية تعبير `if`. وبما أنّ تعبير `if` هو التعبير الأخير (والوحيد) في المتسلسلة المكوّنة لجسم الإجراء، فهدفُه `val` ووصلتُه `return`، ولذلك يُصرَّف الفرعان الصحيح والخاطئ كلاهما بهدف `val` ووصلة `return`. (أي أنّ قيمة التعبير الشرطيّ، وهي القيمة التي يحسبها أيٌّ من فرعيه، هي قيمة الإجراء.)

```scheme
⟨save continue, env if modified by 
 predicate and needed by branches⟩
  ⟨compilation of predicate, 
   target val, linkage next⟩
  ⟨restore continue, env if saved above⟩
  (test (op false?) (reg val))
  (branch (label false-branch4))
true-branch5
  ⟨compilation of true branch, 
   target val, linkage return⟩
false-branch4
  ⟨compilation of false branch, 
   target val, linkage return⟩
after-if3
```

المُسَيِّم `(= n 1)` هو نداءُ إجراءٍ. وهو يبحث عن المشغّل (الرمز `=`) ويضع قيمتَه في `proc`. ثم يجمّع المعطيات `1` وقيمة `n` في `argl`. ثم يختبر ما إذا كان `proc` يحتوي إجراءً أوّليًّا أو إجراءً مركّبًا، ويُوجّه إلى فرعٍ أوّليٍّ أو فرعٍ مركّبٍ تبعًا لذلك. ويستأنف الفرعان عند العنوان `after-call`. ومتطلّبات صون المسجّلات حول تقييم المشغّل والعوامل لا تؤدّي إلى حفظ أيّ مسجّلات، لأنّ تلك التقييمات لا تعدّل المسجّلات المعنيّة في هذه الحالة.

```scheme
  (assign proc (op lookup-variable-value)
               (const =) 
               (reg env))
  (assign val (const 1))
  (assign argl (op list) (reg val))
  (assign val (op lookup-variable-value)
              (const n)
              (reg env))
  (assign argl (op cons) (reg val) (reg argl))
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-branch17))
compiled-branch16
  (assign continue (label after-call15))
  (assign val (op compiled-procedure-entry)
              (reg proc))
  (goto (reg val))
primitive-branch17
  (assign val (op apply-primitive-procedure)
              (reg proc)
              (reg argl))
after-call15
```

يُصرَّف الفرع الصحيح، وهو الثابت 1، (بهدف `val` ووصلة `return`) إلى

```scheme
(assign val (const 1))
(goto (reg continue))
```

شيفرة الفرع الخاطئ هي نداء إجراءٍ آخر، الإجراء فيه هو قيمة الرمز `*`، والمعطيات هي `n` ونتيجة نداء إجراءٍ آخر (نداء لـ`factorial`). وكلٌّ من هذه النداءات يُهيِّئ `proc` و`argl` وفرعيه الأوّليّ والمركّب الخاصّين به. ويُظهر [الشكل 5.17](/book/sicp/c5-computing-with-register-machines/5-5/) التصريف الكامل لتعريف إجراء `factorial`. ولاحِظ أنّ تعليمتَي `save` و`restore` المحتملتين لـ`continue` و`env` حول المُسَيِّم، والمبيَّنتين أعلاه، تُنتَجان فعلًا، لأنّ هذين المسجّلين يعدّلهما نداء الإجراء في المُسَيِّم ويحتاجهما نداء الإجراء والوصلة `return` في الفرعين.

**الشكل 5.17:** $↓$ تصريف تعريف إجراء `factorial`.

```scheme
;; construct the procedure and skip over code
;; for the procedure body
  (assign val
          (op make-compiled-procedure) 
          (label entry2) 
          (reg env))
  (goto (label after-lambda1))
entry2     ; calls to factorial will enter here
  (assign env 
          (op compiled-procedure-env)
          (reg proc))
  (assign env
          (op extend-environment) 
          (const (n)) 
          (reg argl) 
          (reg env))
;; begin actual procedure body
  (save continue)
  (save env)
;; compute (= n 1)
  (assign proc 
          (op lookup-variable-value) 
          (const =) 
          (reg env))
  (assign val (const 1))
  (assign argl (op list) (reg val))
  (assign val 
          (op lookup-variable-value) 
          (const n) 
          (reg env))
  (assign argl (op cons) (reg val) (reg argl))
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-branch17))
compiled-branch16
  (assign continue (label after-call15))
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
primitive-branch17
  (assign val 
          (op apply-primitive-procedure) 
          (reg proc) 
          (reg argl))
after-call15   ; val now contains result of (= n 1)
  (restore env)
  (restore continue)
  (test (op false?) (reg val))
  (branch (label false-branch4))
true-branch5  ; return 1
  (assign val (const 1))
  (goto (reg continue))

false-branch4
;; compute and return (* (factorial (- n 1)) n)
  (assign proc 
          (op lookup-variable-value) 
          (const *) 
          (reg env))
  (save continue)
  (save proc)   ; save * procedure
  (assign val 
          (op lookup-variable-value) 
          (const n) 
          (reg env))
  (assign argl (op list) (reg val))
  (save argl)   ; save partial argument list for *
;; compute (factorial (- n 1)), 
;; which is the other argument for *
  (assign proc
          (op lookup-variable-value) 
          (const factorial) 
          (reg env))
  (save proc)  ; save factorial procedure
;; compute (- n 1), which is the argument for factorial
  (assign proc 
          (op lookup-variable-value)
          (const -) 
          (reg env))
  (assign val (const 1))
  (assign argl (op list) (reg val))
  (assign val 
          (op lookup-variable-value) 
          (const n) 
          (reg env))
  (assign argl (op cons) (reg val) (reg argl))
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-branch8))
compiled-branch7
  (assign continue (label after-call6))
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
primitive-branch8
  (assign val 
          (op apply-primitive-procedure) 
          (reg proc) 
          (reg argl))

after-call6   ; val now contains result of (- n 1)
  (assign argl (op list) (reg val))
  (restore proc) ; restore factorial
;; apply factorial
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-branch11))
compiled-branch10
  (assign continue (label after-call9))
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
primitive-branch11
  (assign val 
          (op apply-primitive-procedure) 
          (reg proc) 
          (reg argl))
after-call9      ; val now contains result 
                 ; of (factorial (- n 1))
  (restore argl) ; restore partial argument list for *
  (assign argl (op cons) (reg val) (reg argl))
  (restore proc) ; restore *
  (restore continue)
;; apply * and return its value
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-branch14))
compiled-branch13
;; note that a compound procedure here
;; is called tail-recursively
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
primitive-branch14
  (assign val 
          (op apply-primitive-procedure) 
          (reg proc) 
          (reg argl))
  (goto (reg continue))
after-call12
after-if3
after-lambda1
;; assign the procedure to the variable factorial
  (perform (op define-variable!) 
           (const factorial) 
           (reg val) 
           (reg env))
  (assign val (const ok))
```

**التمرين 5.33:** تأمّل التعريف الآتي لإجراءٍ لحساب العامليّ، وهو يختلف اختلافًا طفيفًا عن المعطى أعلاه:

```scheme
(define (factorial-alt n)
  (if (= n 1)
      1
      (* n (factorial-alt (- n 1)))))
```

صرّف هذا الإجراء وقارِن الشيفرة الناتجة بتلك التي أُنتجت للإجراء `factorial`. اشرح أيّ فروقٍ تجدها. فهل ينفّذ أحد البرنامجين بكفاءةٍ أعلى من الآخر؟

**التمرين 5.34:** صرّف إجراء العامليّ التكراريّ

```scheme
(define (factorial n)
  (define (iter product counter)
    (if (> counter n)
        product
        (iter (* counter product)
              (+ counter 1))))
  (iter 1 1))
```

علّم الشيفرة الناتجة، مُبيّنًا الفرق الجوهريّ بين شيفرة النسختين التكراريّة والتعاوديّة من `factorial`، وهو الفرق الذي يجعل إحدى العمليّتين تبني مساحةً في المكدّس بينما تعمل الأخرى في مساحة مكدّسٍ ثابتة.

> **التمرين 5.35:** ما التعبير الذي صُرّف لإنتاج الشيفرة الموضّحة في [الشكل 5.18](/book/sicp/c5-computing-with-register-machines/5-5/)؟

**الشكل 5.18:** $↓$ مثالٌ على ناتج المصرِّف. انظر [التمرين 5.35](/book/sicp/c5-computing-with-register-machines/5-5/).

```scheme
(assign val (op make-compiled-procedure) 
            (label entry16) 
            (reg env))
  (goto (label after-lambda15))
entry16
  (assign env (op compiled-procedure-env)
              (reg proc))
  (assign env (op extend-environment) 
              (const (x)) 
              (reg argl) 
              (reg env))
  (assign proc (op lookup-variable-value) 
               (const +) 
               (reg env))
  (save continue) (save proc) (save env)
  (assign proc (op lookup-variable-value) 
               (const g) 
               (reg env))
  (save proc)
  (assign proc (op lookup-variable-value) 
               (const +) 
               (reg env))
  (assign val (const 2))
  (assign argl (op list) (reg val))
  (assign val (op lookup-variable-value)
              (const x) 
              (reg env))
  (assign argl (op cons)
               (reg val)
               (reg argl))
  (test (op primitive-procedure?)
        (reg proc))
  (branch (label primitive-branch19))
compiled-branch18
  (assign continue (label after-call17))
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
primitive-branch19
  (assign val
          (op apply-primitive-procedure)
          (reg proc) 
          (reg argl))
after-call17
  (assign argl (op list) (reg val))
  (restore proc)
  (test (op primitive-procedure?)
        (reg proc))
  (branch (label primitive-branch22))
compiled-branch21
  (assign continue (label after-call20))
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
primitive-branch22
  (assign val 
          (op apply-primitive-procedure) 
          (reg proc) 
          (reg argl))
after-call20
  (assign argl (op list) (reg val))
  (restore env)
  (assign val
          (op lookup-variable-value) 
          (const x) 
          (reg env))
  (assign argl
          (op cons)
          (reg val)
          (reg argl))
  (restore proc)
  (restore continue)
  (test (op primitive-procedure?)
        (reg proc))
  (branch (label primitive-branch25))
compiled-branch24
  (assign val (op compiled-procedure-entry)
              (reg proc))
  (goto (reg val))
primitive-branch25
  (assign val 
          (op apply-primitive-procedure)
          (reg proc) 
          (reg argl))
  (goto (reg continue))
after-call23
after-lambda15
  (perform (op define-variable!) 
           (const f) 
           (reg val) 
           (reg env))
  (assign val (const ok))
```

> **التمرين 5.36:** ما ترتيب التقييم الذي يُنتجه مصرِّفنا لعوامل التركيب؟ أهو من اليسار إلى اليمين، أم من اليمين إلى اليسار، أم ترتيبٌ آخر؟ وأين يُحدَّد هذا الترتيب في المصرِّف؟ عدّل المصرّف بحيث يُنتج ترتيب تقييمٍ آخر. (انظر مناقشة ترتيب التقييم للمُقيِّم صريح التحكّم الواردة في [5.4.1](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1).) فكيف يؤثّر تغيير ترتيب تقييم العوامل في كفاءة الشيفرة التي تبني قائمة المعطيات؟

> **التمرين 5.37:** إحدى طرائق فهم آليّة `preserving` في المصرِّف - المستخدمة لتحسين استغلال المكدّس - هي رؤية العمليّات الإضافيّة التي كانت ستُولَّد لو لم نستخدم هذه الفكرة. عدّل `preserving` بحيث تُولَّد عمليّتا `save` و`restore` دائمًا. صرّف بعض التعابير البسيطة وحدّد عمليّات المكدّس غير الضروريّة التي تُولَّد. قارِن الشيفرة بتلك التي تُولَّد مع بقاء آليّة `preserving` على حالها.

مصرِّفنا بارعٌ في تجنّب عمليّات المكدّس غير الضروريّة، لكنّه ليس بارعًا على الإطلاق حين يُصرّف نداءات الإجراءات الأوّليّة للغة من حيث العمليّات الأوّليّة التي تزوّدها الآلة. فتأمّل، مثلًا، كم الشيفرة التي تُصرَّف لاحتساب `(+ a 1)`: فالشيفرة تُنشئ قائمةَ معطياتٍ في `argl`، وتضع إجراء الجمع الأوّليّ (الذي تجده بالبحث عن الرمز `+` في البيئة) في `proc`، وتختبر ما إذا كان الإجراء أوّليًّا أم مركّبًا. والمصرِّف يُولّد دائمًا شيفرةً لأداء الاختبار، وكذلك شيفرةً للفرعين الأوّليّ والمركّب (ولن يُنفَّذ إلّا أحدهما). ونحن لم نُظهر الجزء من المتحكّم الذي يُنفّذ الأوّليّات، لكنّنا نفترض أنّ هذه التعليمات تستخدم العمليّات الحسابيّة الأوّليّة في مسارات بيانات الآلة. وتأمّل كم الشيفرة الأقلّ التي كانت ستُولَّد لو كان المصرِّف قادرًا على *الترميز المباشر (open-coding)* للأوّليّات - أي لو كان قادرًا على توليد شيفرةٍ تستخدم عمليّات الآلة الأوّليّة هذه مباشرةً. فقد يُصرَّف التعبير `(+ a 1)` إلى شيءٍ بسيطٍ كالآتي:[^43]

```scheme
(assign val (op lookup-variable-value) 
            (const a) 
            (reg env))
(assign val (op +)
            (reg val)
            (const 1))
```

سنُوسّع في هذا التمرين مصرِّفنا ليدعم الترميز المباشر لأوّليّاتٍ منتقاة. وستُولَّد شيفرةٌ خاصّةٌ لنداءات هذه الإجراءات الأوّليّة بدلًا من شيفرة تطبيق الإجراءات العامّة. ولكي نُسند هذا، سنُعزّز آلتنا بمسجّلي معطياتٍ خاصّين، `arg1` و`arg2`. وستأخذ عمليّات الآلة الحسابيّة الأوّليّة معطياتها من `arg1` و`arg2`. وقد توضع النتائج في `val` أو `arg1` أو `arg2`.

ينبغي أن يكون المصرِّف قادرًا على التعرّف على تطبيق أوّليٍّ مُرمَّزٍ مباشرةً في البرنامج المصدريّ. وسنُعزّز التوزيع في الإجراء `compile` ليُتعرّف على أسماء هذه الأوّليّات بالإضافة إلى الكلمات المحجوزة (الصيغ الخاصّة) التي يتعرّف عليها حاليًّا.[^44] ولكلّ صيغةٍ خاصّةٍ في مصرِّفنا مولّدُ شيفرة. وسنبني في هذا التمرين عائلةً من مولّدات الشيفرة للأوّليّات المُرمَّزة مباشرةً.

1. تحتاج الأوّليّات المُرمَّزة مباشرةً - بخلاف الصيغ الخاصّة - جميعًا إلى تقييم عواملها. اكتب مولّد شيفرةٍ `spread-arguments` لاستخدامه من جميع مولّدات الشيفرة التي تُرمّز مباشرةً. وينبغي لـ`spread-arguments` أن تأخذ قائمة عواملٍ وتُصرّف العوامل المعطاة موجَّهةً إلى مسجّلات المعطيات المتتالية. ولاحِظ أنّ العامل قد يحتوي نداءً لأوّليٍّ مُرمَّزٍ مباشرةً، ومن ثمّ يتعيّن الحفاظ على مسجّلات المعطيات أثناء تقييم العامل.
2. لكلّ من الإجراءات الأوّليّة `=` و`*` و`-` و`+`، اكتب مولّد شيفرةٍ يأخذ تركيبًا ذي المشغّل المذكور، مع هدفٍ وواصف ربط، ويُنتج شيفرةً تنشر المعطيات في المسجّلات ثم تُداء العمليّة موجَّهةً إلى الهدف المعطى بالربط المعطى. وليس عليك إلّا التعامل مع التعابير ذات العاملين. واجعل `compile` يُوزّع إلى مولّدات الشيفرة هذه.
3. جرّب مصرِّفك الجديد على مثال `factorial`. قارِن الشيفرة الناتجة بالناتج المُنتَج دون الترميز المباشر.
4. وسّع مولّدي الشيفرة الخاصّين بـ`+` و`*` بحيث يتمكّنان من التعامل مع تعابيرَ ذات أعدادٍ اعتباطيّةٍ من العوامل. وسيتعيّن تصريف التعبير ذي أكثر من عاملين إلى تسلسلٍ من العمليّات، لكلٍّ منها مدخلان فقط.

#### 5.5.6 العنونة المعجميّة

إحدى أكثر التحسينات شيوعًا التي تُجريها المصرّفات هي تحسين البحث عن المتغيّرات. فمصرِّفنا، كما نفّذناه حتّى الآن، يُولّد شيفرةً تستخدم عمليّة `lookup-variable-value` الخاصّة بآلة المُقيِّم. وتبحث هذه العمليّة عن متغيّرٍ بمقارنته بكلّ متغيّرٍ مربوطٍ حاليًّا، مُنتقلةً إطارًا بعد إطارٍ إلى الخارج عبر بيئة وقت التشغيل. وقد يكون هذا البحث مكلفًا إذا كانت الأطر متداخلةً بعمقٍ أو إذا كان المتغيّرات كثيرة. فتأمّل، مثلًا، مسألة البحث عن قيمة `x` أثناء تقييم التعبير `(* x y z)` في تطبيق الإجراء الذي يُعيده

```scheme
(let ((x 3) (y 4))
  (lambda (a b c d e)
    (let ((y (* a b x))
          (z (+ c d x)))
      (* x y z))))
```

وحيث إنّ تعبير `let` ليس إلّا سُكّرًا نحويًّا لتركيب `lambda`، فإنّ هذا التعبير مكافئٌ لـ

```scheme
((lambda (x y)
   (lambda (a b c d e)
     ((lambda (y z) (* x y z))
      (* a b x)
      (+ c d x))))
 3
 4)
```

في كلّ مرّةٍ تبحث فيها `lookup-variable-value` عن `x`، ينبغي أن تُحدّد أنّ الرمز `x` ليس `eq?` بالنسبة إلى `y` أو `z` (في الإطار الأوّل)، ولا بالنسبة إلى `a` أو `b` أو `c` أو `d` أو `e` (في الإطار الثاني). وسنفترض، في الوقت الحاضر، أنّ برامجنا لا تستخدم `define` - أي أنّ المتغيّرات لا تُربط إلّا بـ`lambda`. ولأنّ لغتنا محدودة النطاق معجميًّا، فإنّ بيئة وقت التشغيل لأيّ تعبيرٍ ستكون ذات بنيةٍ تُوازي البنية المعجميّة للبرنامج الذي يظهر فيه التعبير.[^45] وبالتالي، فيستطيع المصرِّف أن يعرف، حين يُحلّل التعبير أعلاه، أنّ المتغيّر `x` في `(* x y z)` سيوجد، في كلّ مرّةٍ يُطبَّق فيها الإجراء، على مسافة إطارين من الإطار الحاليّ وسيكون أوّل متغيّرٍ في ذلك الإطار.

ويمكننا استثمار هذه الحقيقة باختراع نوعٍ جديدٍ من عمليّات البحث عن المتغيّرات، هو `lexical-address-lookup`، الذي يأخذ بيئةً و*عنوانًا معجميًّا* يتألّف من عددين: *رقم إطار*، يُحدّد كم إطارًا ينبغي تجاوزه، و*رقم إزاحة*، يُحدّد كم متغيّرًا ينبغي تجاوزه في ذلك الإطار. وستُنتج `Lexical-address-lookup` قيمة المتغيّر المخزّن عند ذلك العنوان المعجميّ نسبةً إلى البيئة الحاليّة. فإذا أضفنا عمليّة `lexical-address-lookup` إلى آلتنا، أمكننا أن نجعل المصرِّف يُولّد شيفرةً تشير إلى المتغيّرات باستخدام هذه العمليّة بدلًا من `lookup-variable-value`. وبالمثل، فيمكن لشيفرتنا المصرّفة أن تستخدم عمليّةً جديدةً هي `lexical-address-set!` بدلًا من `set-variable-value!`.

ولتوليد شيفرةٍ كهذه، ينبغي أن يكون المصرِّف قادرًا على تحديد العنوان المعجميّ لمتغيّرٍ يُوشك أن يُصرّف إشارةً إليه. ويعتمد العنوان المعجميّ لمتغيّرٍ في برنامجٍ على موضع المرء في الشيفرة. فتأمّل، مثلًا، في البرنامج الآتي، عنوان `x` في التعبير `⟨`e1`⟩` هو (2, 0) - أي إطاران إلى الخلف وأوّل متغيّرٍ في الإطار. وعند تلك النقطة يكون `y` عند العنوان (0, 0) و`c` عند العنوان (1, 2). وفي التعبير `⟨`e2`⟩`، يكون `x` عند (1, 0)، و`y` عند (1, 1)، و`c` عند (0, 2).

```scheme
((lambda (x y)
   (lambda (a b c d e)
     ((lambda (y z) ⟨e1⟩)
      ⟨e2⟩
      (+ c d x))))
 3
 4)
```

إحدى طرائق جعل المصرِّف يُنتج شيفرةً تستخدم العنونة المعجميّة هي المحافظة على بنية بياناتٍ تُسمّى *بيئة وقت التصريف*. وهي تتابع أيّ المتغيّرات ستكون في أيّ المواضع وفي أيّ الأطر في بيئة وقت التشغيل حين تُنفَّذ عمليّة وصولٍ معيّنةٍ إلى متغيّر. وبيئة وقت التصريف قائمةٌ من الأطر، يحتوي كلٌّ منها على قائمةٍ من المتغيّرات. (ولن تكون هناك بالطبع أيّ قيمٍ مربوطةٍ بالمتغيّرات، إذ إنّ القيم لا تُحتسب في وقت التصريف.) وتصير بيئة وقت التصريف معطىً إضافيًّا لـ`compile` وتُمرَّر إلى كلّ مولّد شيفرة. ويستخدم نداء `compile` في المستوى الأعلى بيئةَ وقت تصريفٍ فارغة. وحين يُصرَّف جسم `lambda`، تُوسّع `compile-lambda-body` بيئةَ وقت التصريف بإطارٍ يحتوي وسائط الإجراء، بحيث يُصرَّف التسلسل المكوِّن للجسم بتلك البيئة المُوسَّعة. وعند كلّ نقطةٍ في التصريف، تستخدم `compile-variable` و`compile-assignment` بيئةَ وقت التصريف لتوليد العناوين المعجميّة المناسبة.

يصف [التمرين 5.39](/book/sicp/c5-computing-with-register-machines/5-5/) إلى [التمرين 5.43](/book/sicp/c5-computing-with-register-machines/5-5/) كيف يُتْم هذه المخططات لاستراتيجيّة العنونة المعجميّة بغية إدماج البحث المعجميّ في المصرِّف. ويصف [التمرين 5.44](/book/sicp/c5-computing-with-register-machines/5-5/) استخدامًا آخر لبيئة وقت التصريف.

> **التمرين 5.39:** اكتب إجراءً `lexical-address-lookup` يُنفّذ عمليّة البحث الجديدة. وينبغي أن يأخذ معطيين - عنوانًا معجميًّا وبيئةَ وقت تشغيل - ويُعيد قيمة المتغيّر المخزّن عند العنوان المعجميّ المحدَّد. وينبغي لـ`Lexical-address-lookup` أن يُشير إلى خطأٍ إذا كانت قيمة المتغيّر هي الرمز `*unassigned*`.[^46] واكتب أيضًا إجراءً `lexical-address-set!` يُنفّذ العمليّة التي تُغيّر قيمة المتغيّر عند عنوانٍ معجميٍّ محدَّد.

> **التمرين 5.40:** عدّل المصرِّف ليحافظ على بيئة وقت التصريف كما وُصِف أعلاه. أي أضِف معطى بيئةِ وقت تصريفٍ إلى `compile` وإلى مولّدات الشيفرة المختلفة، ووسّعه في `compile-lambda-body`.

**التمرين 5.41:** اكتب إجراءً `find-variable` يأخذ متغيّرًا وبيئةَ وقت تصريفٍ كمعطيين ويُعيد العنوان المعجميّ للمتغيّر نسبةً إلى تلك البيئة. فمثلًا، في المقطع البرمجيّ الموضّح أعلاه، تكون بيئة وقت التصريف أثناء تصريف التعبير `⟨`e1`⟩` هي `((y z) (a b c d e) (x y))`. وينبغي لـ`Find-variable` أن يُنتج

```scheme
(find-variable 
 'c '((y z) (a b c d e) (x y)))
(1 2)

(find-variable 
 'x '((y z) (a b c d e) (x y)))
(2 0)

(find-variable 
 'w '((y z) (a b c d e) (x y)))
not-found
```

> **التمرين 5.42:** باستخدام `find-variable` من [التمرين 5.41](/book/sicp/c5-computing-with-register-machines/5-5/)، أعد كتابة `compile-variable` و`compile-assignment` ليُخرِجا تعليمات العنوان المعجميّ. وفي الحالات التي تُعيد فيها `find-variable` القيمة `not-found` (أي حيث لا يكون المتغيّر في بيئة وقت التصريف)، ينبغي أن تجعل مولّدات الشيفرة تستخدم عمليّات المُقيِّم، كما سبق، للبحث عن الربط. (والمكان الوحيد الذي يمكن أن يكون فيه متغيّرٌ لا يُعثَر عليه في وقت التصريف هو البيئة العامّة، وهي جزءٌ من بيئة وقت التشغيل لكنّها ليست جزءًا من بيئة وقت التصريف.[^47] وبالتالي، فإن شئتَ، أمكنك أن تجعل عمليّات المُقيِّم تنظر مباشرةً في البيئة العامّة، التي يمكن الحصول عليها بالعمليّة `(op get-global-environment)`، بدلًا من أن تجعلها تبحث في بيئة وقت التشغيل كلّها الموجودة في `env`.) واختبر المصرِّف المُعدَّل على بعض الحالات البسيطة، كتركيب `lambda` المتداخل في بداية هذا القسم.

> **التمرين 5.43:** لقد حاججنا في [4.1.6](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e6) بأنّ التعريفات الداخليّة لبنية الكتل لا ينبغي اعتبارها `define`s «حقيقيّة». فالأولى أن يُفسَّر جسم الإجراء كما لو كانت المتغيّرات الداخليّة المُعرَّفة تُثبَّت متغيّرات `lambda` اعتياديّةً تُهيَّأ بقيمها الصحيحة باستخدام `set!`. وأظهر [4.1.6](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e6) و[التمرين 4.16](https://sarabander.github.io/sicp/html/4_002e1.xhtml#Exercise-4_002e16) كيف يُعدَّل المُقيِّم التحاكميّ (metacircular evaluator) لإنجاز هذا بمسح التعريفات الداخليّة وإخراجها. عدّل المصرِّف ليؤدّي التحويل ذاته قبل أن يُصرّف جسم إجراء.

**التمرين 5.44:** لقد تركّزنا في هذا القسم على استخدام بيئة وقت التصريف لإنتاج العناوين المعجميّة. لكن ثمّة استخدامات أخرى لبيئات وقت التصريف. فمثلًا، زدنا في [التمرين 5.38](/book/sicp/c5-computing-with-register-machines/5-5/) كفاءة الشيفرة المصرّفة بترميز الإجراءات الأوّليّة مباشرةً. وقد عامل تنفيذنا أسماء الإجراءات المُرمَّزة مباشرةً معاملة الكلمات المحجوزة. فلو أعاد برنامجٌ ربط اسمٍ كهذا، لظلّت الآليّة الموصوفة في [التمرين 5.38](/book/sicp/c5-computing-with-register-machines/5-5/) تُرمّزه مباشرةً كأوّليٍّ، متجاهلةً الربط الجديد. فتأمّل، مثلًا، الإجراء

```scheme
(lambda (+ * a b x y)
  (+ (* a x) (* b y)))
```

الذي يحسب تركيبةً خطّيّةً من `x` و`y`. فقد ندعوه بمعطيات `+matrix` و`*matrix` وأربع مصفوفات، لكن المصرِّف المُرمِّز مباشرةً كان سيظلّ يُرمّز الـ`+` والـ`*` في `(+ (* a x) (* b y))` مباشرةً كأوّليَّي `+` و`*`. عدّل المصرِّف المُرمِّز مباشرةً ليستشير بيئة وقت التصريف بغية تصريف الشيفرة الصحيحة للتعابير التي تشمل أسماء الإجراءات الأوّليّة. (وستعمل الشيفرة صحيحةً ما دام البرنامج لا يُعرّف هذه الأسماء بـ`define` أو `set!`.)

#### 5.5.7 ربط الشيفرة المصرّفة بالمُقيِّم

لم نشرح بعد كيف تُحمَّل الشيفرة المصرّفة في آلة المُقيِّم ولا كيف تُشغَّل. وسنفترض أنّ آلة المُقيِّم صريحة التحكّم قد عُرِّفت كما في [5.4.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e4)، مع العمليّات الإضافيّة المحدَّدة في [الحاشية 323](#Footnote-323). وسنُنفّذ إجراءً `compile-and-go` يُصرّف تعبير Scheme، ويُحمّل الشيفرة الهدفيّة الناتجة في آلة المُقيِّم، ويجعل الآلة تُشغّل الشيفرة في البيئة العامّة للمُقيِّم، وتطبع النتيجة، وتدخل حلقة المقود (driver loop) الخاصّة بالمُقيِّم. وسنُعدّل المُقيِّم أيضًا حتّى تستطيع التعابير المُفسَّرة أن تنادي الإجراءات المصرّفة كما تنادي المُفسَّرة. وبوسعنا حينئذٍ أن نضع إجراءً مصرّفًا في الآلة وأن نستخدم المُقيِّم لندائه:

```scheme
(compile-and-go
 '(define (factorial n)
    (if (= n 1)
        1
        (* (factorial (- n 1)) n))))

;;; EC-Eval value:
ok

;;; EC-Eval input:
(factorial 5)

;;; EC-Eval value:
120
```

وليتمكّن المُقيِّم من التعامل مع الإجراءات المصرّفة (لتقييم نداء `factorial` أعلاه، مثلًا)، يتعيّن علينا تغيير الشيفرة عند `apply-dispatch` ([5.4.1](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1)) بحيث تتعرّف على الإجراءات المصرّفة (بوصفها متميّزةً عن الإجراءات المركّبة أو الأوّليّة) وتنقل التحكّم مباشرةً إلى نقطة دخول الشيفرة المصرّفة:[^48]

```scheme
apply-dispatch
  (test (op primitive-procedure?) (reg proc))
  (branch (label primitive-apply))
  (test (op compound-procedure?) (reg proc))
  (branch (label compound-apply))
  (test (op compiled-procedure?) (reg proc))
  (branch (label compiled-apply))
  (goto (label unknown-procedure-type))

compiled-apply
  (restore continue)
  (assign val
          (op compiled-procedure-entry)
          (reg proc))
  (goto (reg val))
```

لاحِظ استعادة `continue` عند `compiled-apply`. وتذكّر أنّ المُقيِّم رُتّب بحيث تكون الاستمراريّة في قمّة المكدّس عند `apply-dispatch`. أمّا نقطة دخول الشيفرة المصرّفة، من جهةٍ أخرى، فتتوقّع أن تكون الاستمراريّة في `continue`، ومن ثمّ يتعيّن استعادة `continue` قبل تنفيذ الشيفرة المصرّفة.

وليُتاح لنا تشغيل بعض الشيفرة المصرّفة حين نُشغّل آلة المُقيِّم، نُضيف تعليمة `branch` في بداية آلة المُقيِّم، تجعل الآلة تنتقل إلى نقطة دخولٍ جديدة إذا كان مسجّل `flag` مضبوطًا.[^49]

```scheme
;; branches if flag is set:
(branch (label external-entry)) 
read-eval-print-loop
  (perform (op initialize-stack))
  …
```

تفترض `External-entry` أنّ الآلة تُشغَّل و`val` يحتوي موقع تسلسل تعليماتٍ يضع نتيجةً في `val` وينتهي بـ`(goto (reg continue))`. فالانطلاق من نقطة الدخول هذه يقفز إلى الموقع الذي يُعيّنه `val`، لكنّه يُسند أوّلًا `continue` بحيث يعود التنفيذ إلى `print-result`، الذي يطبع القيمة في `val` ثم يذهب إلى بداية حلقة القراءة والتقييم والطباعة الخاصّة بالمُقيِّم.[^50]

```scheme
external-entry
  (perform (op initialize-stack))
  (assign env (op get-global-environment))
  (assign continue (label print-result))
  (goto (reg val))
```

والآن يمكننا استخدام الإجراء الآتي لتصريف تعريف إجراءٍ وتنفيذ الشيفرة المصرّفة وتشغيل حلقة القراءة والتقييم والطباعة حتّى نتمكّن من تجربة الإجراء. ولأنّنا نريد للشيفرة المصرّفة أن تعود إلى الموقع في `continue` بنتيجتها في `val`، فإنّنا نُصرّف التعبير بهدفٍ هو `val` وربطٍ هو `return`. وَلِكي نحوّل الشيفرة الهدفيّة التي يُنتجها المصرِّف إلى تعليماتٍ قابلةٍ للتنفيذ على آلة مسجّلات المُقيِّم، فإنّنا نستخدم الإجراء `assemble` من محاكي آلة المسجّلات ([5.2.2](https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2_002e2)). ثم نُهيّئ مسجّل `val` ليشير إلى قائمة التعليمات، ونضبط `flag` بحيث يذهب المُقيِّم إلى `external-entry`، ونُشغّل المُقيِّم.

```scheme
(define (compile-and-go expression)
  (let ((instructions
         (assemble 
          (statements
           (compile 
            expression 'val 'return))
          eceval)))
    (set! the-global-environment
          (setup-environment))
    (set-register-contents! 
     eceval 'val instructions)
    (set-register-contents! 
     eceval 'flag true)
    (start eceval)))
```

وإذا كنّا قد أعددنا مراقبة المكدّس، كما في نهاية [5.4.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e4)، فأمكننا فحص استغلال المكدّس في الشيفرة المصرّفة:

```scheme
(compile-and-go
 '(define (factorial n)
    (if (= n 1)
        1
        (* (factorial (- n 1)) n))))
(total-pushes = 0, maximum-depth = 0)

;;; EC-Eval value:
ok

;;; EC-Eval input:
(factorial 5)
(total-pushes = 31, maximum-depth = 14)

;;; EC-Eval value:
120
```

قارِن هذا المثال بتقييم `(factorial 5)` باستخدام النسخة المُفسَّرة من الإجراء ذاته، الموضّحة في نهاية [5.4.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e4). فقد احتاجت النسخة المُفسَّرة 144 مدفعةً وعمقَ مكدّسٍ أقصاه 28. وهذا يُبيّن التحسين الناتج عن استراتيجيّة التصريف لدينا.

#### التفسير والتصريف

بالبرامج الواردة في هذا القسم، يمكننا الآن أن نُجرّب استراتيجيّي التنفيذ البديلتين المتمثّلتين في التفسير والتصريف.[^51] فالمفسّر يرفع الآلة إلى مستوى برنامج المستخدم؛ أمّا المصرِّف فيخفض برنامج المستخدم إلى مستوى لغة الآلة. ويمكننا اعتبار لغة Scheme (أو أيّ لغة برمجةٍ) عائلةً متماسكةً من التجريدات القائمة على لغة الآلة. والمفسّرات حسنةٌ للتطوير التفاعليّ للبرامج ولتنقيحها، لأنّ خطوات تنفيذ البرنامج مُنظَّمةٌ من حيث هذه التجريدات، ومن ثمّ فهي أكثر وضوحًا للمبرمج. والشيفرة المصرّفة قادرةٌ على التنفيذ أسرعَ، لأنّ خطوات تنفيذ البرنامج مُنظَّمةٌ من حيث لغة الآلة، ولأنّ المصرِّف حرٌّ في إجراء تحسيناتٍ تتجاوز التجريدات ذات المستوى الأعلى.[^52]

وتؤدّي بديلتا التفسير والتصريف أيضًا إلى استراتيجيّاتٍ مختلفةٍ لنقل اللغات إلى حواسيب جديدة. فافترض أنّنا نرغب في تنفيذ Lisp على آلةٍ جديدة. فإحدى الاستراتيجيّات هي الانطلاق بالمُقيِّم صريح التحكّم الوارد في [5.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4) وترجمة تعليماته إلى تعليماتٍ للآلة الجديدة. واستراتيجيّةٌ مختلفة هي الانطلاق بالمصرِّف وتغيير مولّدات الشيفرة بحيث تُولّد شيفرةً للآلة الجديدة. والاستراتيجيّة الثانية تسمح لنا بتشغيل أيّ برنامج Lisp على الآلة الجديدة بتصريفه أوّلًا بالمصرِّف العامل على نظام Lisp الأصليّ لدينا، وربطه بنسخةٍ مصرّفةٍ من مكتبة وقت التشغيل.[^53] والأفضل من ذلك، أنّنا نستطيع تصريف المصرِّف نفسه، وتشغيل هذا الأخير على الآلة الجديدة لتصريف برامج Lisp أخرى.[^54] أو نستطيع تصريف أحد مفسّري [4.1](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1) لإنتاج مفسّرٍ يعمل على الآلة الجديدة.

> **التمرين 5.45:** بمقارنة عمليّات المكدّس التي تستخدمها الشيفرة المصرّفة بتلك التي يستخدمها المُقيِّم للاحتساب ذاته، نستطيع تحديد المدى الذي يُحسّن به المصرِّف استغلال المكدّس، سواءً في السرعة (بتقليل العدد الكلّيّ لعمليّات المكدّس) أو في المكان (بتقليل عمق المكدّس الأقصى). ومقارنة هذا الاستغلال المُحسَّن بأداء آلةٍ خاصّةٍ للاحتساب ذاته تُعطي إشارةً ما عن جودة المصرِّف. فقد طُلب منك في [التمرين 5.27](https://sarabander.github.io/sicp/html/5_002e4.xhtml#Exercise-5_002e27) أن تُحدّد، كدالّةٍ في $n$ ، عدد المدفعات وعمق المكدّس الأقصى اللذين يحتاجهما المُقيِّم لاحتساب $n !$ باستخدام إجراء العامليّ التعاوديّ المعطى أعلاه. وطُلب منك في [التمرين 5.14](https://sarabander.github.io/sicp/html/5_002e2.xhtml#Exercise-5_002e14) أن تُجري القياسات ذاتها لآلة العامليّ الخاصّة الموضّحة في [الشكل 5.11](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11). وأدِر الآن التحليل ذاته باستخدام إجراء `factorial` المصرّف.
> > خُذ نسبة عدد المدفعات في النسخة المصرّفة إلى عدد المدفعات في النسخة المُفسَّرة، وافعل المثل لعمق المكدّس الأقصى. وحيث إنّ عدد العمليّات وعمق المكدّس المستخدمين لاحتساب $n !$ خطّيان في $n$ ، فينبغي أن تقترب هذه النسب من ثوابتَ كلّما كَبُرَت $n$ . فما هذه الثوابت؟ وبالمثل، أوجد نسب استغلال المكدّس في الآلة الخاصّة إلى الاستغلال في النسخة المُفسَّرة. وقارِن نسب الخاصّة مقابل المُفسَّرة بنسب المصرّفة مقابل المُفسَّرة. وستجد أنّ الآلة الخاصّة أفضلُ أداءً بكثيرٍ من الشيفرة المصرّفة، إذ ينبغي أن تكون شيفرة المتحكّم المصمّمة يدويًّا أفضلَ بكثيرٍ مما يُنتجه مصرِّفنا العامّ البدائيّ. فهل تستطيع اقتراح تحسيناتٍ على المصرِّف تُعينه على توليد شيفرةٍ تُقارِب في أدائها النسخة المصمّمة يدويًّا؟
> > 

**التمرين 5.46:** أدِر تحليلًا مثل التحليل الوارد في [التمرين 5.45](/book/sicp/c5-computing-with-register-machines/5-5/) لتحديد فعّاليّة تصريف إجراء فيبوناتشي التعاوديّ الشجريّ

```scheme
(define (fib n)
  (if (< n 2)
      n
      (+ (fib (- n 1)) (fib (- n 2)))))
```

مقابل فعّاليّة استخدام آلة فيبوناتشي الخاصّة الواردة في [الشكل 5.12](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12). (ولقياس الأداء المُفسَّر، انظر [التمرين 5.29](https://sarabander.github.io/sicp/html/5_002e4.xhtml#Exercise-5_002e29).) فبالنسبة إلى فيبوناتشي، فإنّ المورد الزمنيّ المستخدم ليس خطّيًّا في $n ;$ ومن ثمّ فلن تقترب نسب عمليّات المكدّس من قيمةٍ حدّيّةٍ مستقلّةٍ عن $n$ .

**التمرين 5.47:** وصف هذا القسم كيف يُعدَّل المُقيِّم صريح التحكّم حتّى تستطيع الشيفرة المُفسَّرة أن تنادي إجراءاتٍ مصرّفة. أُظهر كيف يُعدَّل المصرِّف حتّى تستطيع الإجراءات المصرّفة أن تنادي، ليس الإجراءات الأوّليّة والمصرّفة فحسب، بل الإجراءات المُفسَّرة أيضًا. وهذا يتطلّب تعديل `compile-procedure-call` لمعالجة حالة الإجراءات المركّبة (المُفسَّرة). وتأكّد من معالجة جميع توليفات `target` و`linkage` ذاتها كما في `compile-proc-appl`. ولأداء تطبيق الإجراء فعليًّا، تحتاج الشيفرة إلى القفز إلى نقطة دخول `compound-apply` في المُقيِّم. ولا يمكن الإشارة إلى هذا العنوان مباشرةً في الشيفرة الهدفيّة (إذ إنّ المُجمِّع يشترط أن تكون جميع العناوين التي تشير إليها الشيفرة التي يُجمّعها معرَّفةً هناك)، ومن ثمّ سنُضيف مسجّلًا يُسمّى `compapp` إلى آلة المُقيِّم لحفظ نقطة الدخول هذه، ونُضيف تعليمةً لتهيئته:

```scheme
  (assign compapp (label compound-apply))
  ;; branches if flag is set:
  (branch (label external-entry))
read-eval-print-loop …
```

ولاختبار شيفرتك، ابدأ بتعريف إجراءٍ `f` ينادي إجراءً `g`. واستخدم `compile-and-go` لتصريف تعريف `f` وتشغيل المُقيِّم. ثم، بالكتابة على المُقيِّم، عرّف `g` وحاول نداء `f`.

**التمرين 5.48:** إنّ واجهة `compile-and-go` المُنفَّذة في هذا القسم حرجةُ التعامل، إذ لا يمكن نداء المصرِّف إلّا مرّةً واحدةً (عند تشغيل آلة المُقيِّم). عزّز واجهة المصرِّف-المفسّر بتوفير أوّليٍّ `compile-and-run` يمكن نداؤه من داخل المُقيِّم صريح التحكّم على النحو الآتي:

```scheme
;;; EC-Eval input:
(compile-and-run
 '(define (factorial n)
    (if (= n 1)
        1
        (* (factorial (- n 1)) n))))

;;; EC-Eval value:
ok

;;; EC-Eval input:
(factorial 5)

;;; EC-Eval value:
120
```

> **التمرين 5.49:** كبديلٍ عن استخدام حلقة القراءة والتقييم والطباعة الخاصّة بالمُقيِّم صريح التحكّم، صمّم آلة مسجّلاتٍ تُداء حلقة قراءة-تصريف-تنفيذ-طباعة. أي أنّ الآلة ينبغي أن تُشغّل حلقةً تقرأ تعبيرًا، وتُصرّفه، وتُجمّع الشيفرة الناتجة وتنفّذها، وتطبع النتيجة. وهذا سهلُ التشغيل في تهيئتنا المُحاكاة، إذ يمكننا ترتيب أمر نداء الإجراءين `compile` و`assemble` بوصفهما «عمليّتَي آلة مسجّلات».

> **التمرين 5.50:** استخدم المصرِّف لتصريف المُقيِّم التحاكميّ (metacircular evaluator) الوارد في [4.1](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1) وتشغيل هذا البرنامج باستخدام محاكي آلة المسجّلات. (ولتصريف أكثر من تعريفٍ في المرّة الواحدة، يمكنك حزم التعريفات في `begin`.) وسيعمل المفسّر الناتج ببطءٍ شديدٍ بسبب مستويات التفسير المتعدّدة، لكنّ جعل جميع التفاصيل تعمل تمرينٌ مفيدٌ للغاية.

> **التمرين 5.51:** طوّر تنفيذًا بدائيًّا لـScheme في لغة C (أو لغة أخرى منخفضة المستوى من اختيارك) بترجمة المُقيِّم صريح التحكّم الوارد في [5.4](https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4) إلى C. ولكي تُشغّل هذه الشيفرة، ستحتاج أيضًا إلى تزويد روتينات تخصيص تخزينٍ مناسبةٍ ودعمٍ آخر لوقت التشغيل.

> **التمرين 5.52:** كنقيضٍ لـ[التمرين 5.51](/book/sicp/c5-computing-with-register-machines/5-5/)، عدّل المصرّف ليُصرِّف إجراءات Scheme إلى سلاسل من تعليمات C. صرِّف المُقيِّم الحلقيّ الوسيط (metacircular evaluator) الوارد في [4.1](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1) لتُنتج مفسّرًا لـ Scheme مكتوبًا بلغة C.
























































[^33]: هذا بيانٌ نظريّ. فنحن لا ندّعي أنّ مسارات البيانات الخاصّة بالمُقيّم مجموعةٌ مناسبةٌ أو فعّالةٌ بشكلٍ خاصّ لتكون مسارات حاسوبٍ عامّ الغرض. فهي مثلًا غير جيّدةٍ لتنفيذ حسابات النقاط العائمة عالية الأداء أو الحسابات التي تتلاعب بكثافةٍ بمتجهات البتّات.

[^34]: في الواقع، بوسع الآلة التي تُشغّل الشيفرة المصرّفة أن تكون أبسط من آلة المفسّر، لأنّنا لن نستخدم المسجّلين `exp` و`unev`. فقد كان المفسّر يستخدمهما للاحتفاظ بقطعٍ من التعابير غير المُقيَّمة. أمّا مع المصرّف، فهذه التعابير تُبنى في الشيفرة المصرّفة التي ستُشغّلها آلة المسجّلات. ولغير هذا السبب، لا نحتاج إلى عمليّات الآلة التي تتعامل مع صياغة التعابير. لكنّ الشيفرة المصرّفة ستستخدم بعض عمليّات آلةٍ إضافيّة (لتمثيل كائنات الإجراءات المصرّفة) لم تظهر في آلة المُقيّم ذي المتحكّم الصريح.

[^35]: لكن لاحظ أنّ مصرّفنا برنامج Scheme، وأنّ إجراءات الصياغة التي يستخدمها للتلاعب بالتعابير هي إجراءات Scheme الفعليّة المستخدمة مع المُقيّم الحلقيّ الوسيط. أمّا في المُقيّم ذي المتحكّم الصريح، فقد افترضنا أنّ عمليّات صياغةٍ مكافئةً متاحةٌ كعمليّاتٍ لآلة المسجّلات. (وبالطبع، عندما حاكينا آلة المسجّلات في Scheme، استخدمنا إجراءات Scheme الفعليّة في محاكاة آلة المسجّلات خاصّتنا.)

[^36]: يستخدم هذا الإجراء ميزةً من Lisp تُسمّى *الاقتباس الخلفيّ (backquote)* (أو *شبه الاقتباس (quasiquote)*) وهي مفيدةٌ لبناء القوائم. فتسبيق قائمةٍ برمز الاقتباس الخلفيّ أشبه باقتباسها، إلّا أنّ أيّ شيءٍ في القائمة يُعلَّم بفاصلةٍ يُقيَّم. فمثلًا، إذا كانت قيمة `linkage` هي الرمز `branch25`، فإنّ التعبير ```scheme `((goto (label ,linkage))) ```

[^37]: لا يمكننا ببساطةٍ استخدام الأسماء `true-branch` و`false-branch` و`after-if` كما وردت أعلاه، لأنّ البرنامج قد يحوي أكثر من `if` واحد. فالمصرّف يستخدم الإجراء `make-label` لتوليد الأسماء. و`Make-label` يأخذ رمزًا كمعطىً ويُعيد رمزًا جديدًا يبدأ بالرمز المعطى. فمثلًا، كانت نداءات `(make-label 'a)` المتتالية تُعيد `a1` و`a2` وهكذا. ويمكن تنفيذ `Make-label` على نحوٍ يشبه توليد أسماء المتغيّرات الفريدة في لغة الاستعلام، كما يلي: ```scheme (define label-counter 0) (define (new-label-number) (set! label-counter (+ 1 label-counter)) label-counter) (define (make-label name) (string->symbol (string-append (symbol->string name) (number->string (new-label-number))))) ```

[^38]: نحتاج إلى عمليّات آلةٍ لتنفيذ بنية بياناتٍ لتمثيل الإجراءات المصرّفة، تقابل البنيّة الخاصّة بالإجراءات المركّبة الموصوفة في [4.1.3](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e3): ```scheme (define (make-compiled-procedure entry env) (list 'compiled-procedure entry env)) (define (compiled-procedure? proc) (tagged-list? proc 'compiled-procedure)) (define (compiled-procedure-entry c-proc) (cadr c-proc)) (define (compiled-procedure-env c-proc) (caddr c-proc)) ```

[^39]: في الحقيقة، نُشير إلى خطأٍ عندما لا يكون الهدف `val` والوصلة `return`، إذ إنّ المكان الوحيد الذي نطلب فيه وصلات `return` هو تصريف الإجراءات، واصطلاحنا أنّ الإجراءات تُعيد قيمها في `val`.

[^40]: قد يبدو جعلُ مصرّفٍ يُنتج شيفرةً تعاوديّةً ذيليًّا فكرةً مباشرة. لكنّ معظم مصرّفات اللغات الشائعة، ومنها C وPascal، لا تفعل ذلك، ولذلك لا تستطيع هذه اللغات تمثيل العمليّات التكراريّة بالنداء الإجرائيّ وحده. وتكمُن صعوبة التعاوب الذيلي في هذه اللغات في أنّ تنفيذها تستخدم المكدس لتخزين معطيات الإجراءات ومتغيّراتها المحليّة فضلًا عن عناوين العودة. أمّا تنفيذات Scheme الموضحة في هذا الكتاب فتخزّن المعطيات والمتغيّرات في ذاكرةٍ تُجمَّع كانقالًا. والسبب في استخدام المكدس للمتغيّرات والمعطيات هو تفادي الحاجة إلى جمع القمامة في لغاتٍ لما كانت تتطلّبه لولا ذلك، ويُعتقد عمومًا أنّه أكفّ. وتستطيع مصرّفات Lisp المتطوّرة، في الواقع، استخدام المكدس للمعطيات دون أن تُفسد التعاوب الذيليّ. (انظر [هانسون 1990](https://sarabander.github.io/sicp/html/References.xhtml#Hanson-1990) لوصفٍ له.) ثمّة جدلٌ أيضًا حول ما إذا كان تخصيص المكدس أكفّ فعلًا من جمع القمامة في المقام الأوّل، لكنّ التفاصيل يبدو أنّها مرتهنةٌ بدقائق دقيقة في بنية الحاسوب. (انظر [آبل 1987](https://sarabander.github.io/sicp/html/References.xhtml#Appel-1987) و[ميلر وروزاس 1994](https://sarabander.github.io/sicp/html/References.xhtml#Miller-and-Rozas-1994) لرأيين متعارضين في هذه المسألة.)

[^41]: المتغيّر `all-regs` مربوطٌ بأسماء كلّ المسجّلات: ```scheme (define all-regs '(env proc val argl continue)) ```

[^42]: لاحظ أنّ `preserving` ينادي `append` بثلاثة معطيات. ومع أنّ تعريف `append` المعروض في هذا الكتاب لا يقبل إلّا معطيين، فإنّ Scheme يوفّر قياسيًّا إجراء `append` يأخذ عددًا اعتباطيًّا من المعطيات.

[^43]: لقد استخدمنا الرمز `+` نفسه هنا للدلالة على كلٍّ من إجراء لغة المصدر وعمليّة الآلة. وبشكلٍ عام، لن توجد مقابلةٌ واحدٌ بواحدٍ بين أوّليّات لغة المصدر وأوّليّات الآلة.

[^44]: جعل الأوّليّات كلماتٍ محجوزة هو فكرةٌ سيّئةٌ عمومًا، إذ لا يستطيع المستخدم حينها إعادة ربط هذه الأسماء بإجراءاتٍ مختلفة. والأسوأ من ذلك، أنّ إضافة كلماتٍ محجوزةً إلى مصرّفٍ قيد الاستخدام ستجعل البرامج الموجودة التي تُعرِّف إجراءاتٍ بهذه الأسماء تتوقّف عن العمل. انظر [التمرين 5.44](/book/sicp/c5-computing-with-register-machines/5-5/) لأفكارٍ عن كيفيّة تجنّب هذه المشكلة.

[^45]: لا يصحّ هذا إذا سمحنا بتعريفاتٍ داخليّة، إلّا إذا استخرجناه بالمسح. انظر [التمرين 5.43](/book/sicp/c5-computing-with-register-machines/5-5/).

[^46]: هذا هو التعديل المطلوب على البحث عن المتغيّرات إذا نُفّذت طريقة الاستخراج لإزالة التعريفات الداخليّة ([التمرين 5.43](/book/sicp/c5-computing-with-register-machines/5-5/)). وسنحتاج إلى إزالة هذه التعريفات لكي تعمل العنونة المعجميّة.

[^47]: لا يمكن استخدام العناوين المعجميّة للوصول إلى المتغيّرات في البيئة العامّة، لأنّ هذه الأسماء يمكن تعريفها وإعادة تعريفها تفاعليًّا في أيّ وقت. فمع استخراج التعريفات الداخليّة، كما في [التمرين 5.43](/book/sicp/c5-computing-with-register-machines/5-5/)، تكون التعريفات الوحيدة التي يراها المصرّف هي التعريفات على المستوى الأعلى، وهي التي تعمل على البيئة العامّة. ولا يتسبّب تصريف تعريفٍ في إدخال الاسم المعرَّف في بيئة وقت التصريف.

[^48]: وبالطبع، الإجراءات المصرّفة كالإجراءات المُفسَّرة مركّبةٌ (غير أوّليّة). واتّفاقًا مع المصطلحات المستخدمة في المُقيّم ذي المتحكّم الصريح، سنستخدم في هذا القسم «مركّب» بمعنى مُفسَّر (مقابلًا لمصرَّف).

[^49]: وحيث إنّ آلة المُقيّم تبدأ الآن بـ`branch`، ينبغي لنا دائمًا تهيئة المسجّل `flag` قبل تشغيل آلة المُقيّم. ولتشغيل الآلة على حلقة القراءة-التقييم-الطباعة المعتادة، كان بوسعنا استخدام ```scheme (define (start-eceval) (set! the-global-environment (setup-environment)) (set-register-contents! eceval 'flag false) (start eceval)) ```

[^50]: وبما أنّ الإجراء المصرّف كائنٌ قد يحاول النظام طباعته، نُعدّل أيضًا عمليّة طباعة النظام `user-print` (الواردة في [4.1.4](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e4)) حتّى لا تحاول طباعة مكوّنات الإجراء المصرّف: ```scheme (define (user-print object) (cond ((compound-procedure? object) (display (list 'compound-procedure (procedure-parameters object) (procedure-body object) '))) ((compiled-procedure? object) (display ')) (else (display object)))) ```

[^51]: وبوسعنا أن نفعل أفضل من ذلك بتمديد المصرّف للسماح للشيفرة المصرّفة بنداء الإجراءات المُفسَّرة. انظر [التمرين 5.47](/book/sicp/c5-computing-with-register-machines/5-5/).

[^52]: مستقلًّا عن استراتيجيّة التنفيذ، نتحمّل عبئًا إضافيًّا كبيرًا إذا أصرَرنا على كشف الأخطاء التي تقع أثناء تنفيذ برنامج المستخدم والإشارة إليها، بدلًا من السّماح لها بإسقاط النظام أو إنتاج إجابات خاطئة. فمثلًا، يمكن كشف مرجع مصفوفةٍ خارج الحدود بالتحقّق من صلاحيّة المرجع قبل إجرائه. غير أنّ عبء التحقّق قد يبلغ أضعاف كلفة مرجع المصفوفة نفسه، وعلى المبرمج أن يوزن بين السرعة والأمان في تحديد مدى رغبته في مثل هذا التحقّق. وينبغي لمصرّفٍ جيّدٍ أن يكون قادرًا على إنتاج شيفرةٍ تتضمّن مثل هذه التحقّقات، وأن يتجنّب التحقّقات الزائدة، وأن يسمح للمبرمجين بالتحكّم في مدى فحوص الأخطاء ونوعها في الشيفرة المصرّفة. أمّا مصرّفات اللغات الشائعة، مثل C وC++، فلا تُدخل إلّا القليل جدًّا من عمليّات التحقّق من الأخطاء في الشيفرة العاملة، حتّى تجري الأمور بأسرع ما يمكن. ونتيجةً لذلك، يقع على عاتق المبرمجين تدبير التحقّق من الأخطاء صراحةً. ومؤسفٌ أنّ الناس يغفلون عن ذلك كثيرًا، حتّى في التطبيقات الحرجة حيث لا يكون هناك قيدٌ على السرعة. فبرامجهم تعيش حياةً سريعةً وخطرة. فمثلًا، استغلّت «الدودة» (Worm) الشهيرة التي شلّت الإنترنت عام 1988 فشل نظام التشغيل UNIX(tm) في التحقّق من أنّ مخزَن الإدخال قد فاض في عفريت finger. (انظر [سبافورد 1989](https://sarabander.github.io/sicp/html/References.xhtml#Spafford-1989).)

[^53]: وبالطبع، مع كلٍّ من استراتيجيّة التفسير واستراتيجيّة التصريف، يتحتّم علينا أيضًا أن نُنفّذ للآلة الجديدة تخصيص التخزين، والإدخال والإخراج، وكلّ العمليّات المتنوّعة التي أخذناها كـ«أوّليّات» في مناقشتنا للمُقيّم والمصرّف. وإحدى استراتيجيّات تقليل العمل هنا هي كتابة أكبر عددٍ ممكن من هذه العمليّات في Lisp ثمّ تصريفها للآلة الجديدة. وفي النهاية، يندرج كلّ شيءٍ في نواةٍ صغيرة (مثل جمع القمامة وآليّة تطبيق أوّليّات الآلة الفعليّة) تُكتب يدويًّا للآلة الجديدة.

[^54]: تؤدّي هذه الاستراتيجيّة إلى اختباراتٍ ممتعةٍ لصحّة المصرّف، مثل التحقّق ممّا إذا كان تصريف برنامجٍ على الآلة الجديدة، باستخدام المصرّف المصرَّف، مطابقًا لتصريف البرنامج على نظام Lisp الأصليّ. وتتبّع مصدر الفروقات أمرٌ ممتعٌ لكنّه مُحبطٌ غالبًا، لأنّ النتائج حسّاسةٌ للغاية حتّى لأدقّ التفاصيل.