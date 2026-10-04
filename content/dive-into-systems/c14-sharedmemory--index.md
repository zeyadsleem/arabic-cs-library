---
title: "14. استغلال الذاكرة المشتركة في عصر تعدد الأنوية"
lang: ar
source: https://diveintosystems.org/book/C14-SharedMemory/index.html
---

*تغيّر العالم.*

*أشعر به في السيليكا.*

*أشعر به في الترانزستور.*

*أراه في النواة.*

~ مع الاعتذار إلى Galadriel (*سيد الخواتم: رفقة الخاتم*)

حتى الآن، ركّزت مناقشتنا للمعمارية على عالم أحادي المعالج خالص. لكن العالم تغيّر. فمعالجات اليوم تملك **أنوية** متعددة، أي وحدات حساب. ونناقش في هذا الفصل المعماريات متعددة الأنوية، وكيفية استغلالها لتسريع تنفيذ البرامج.

**ملاحظة — المعالجات ووحدات المعالجة المركزية والأنوية**

> في مواضع كثيرة من هذا الفصل، يُستخدم المصطلحان *معالج* و*وحدة معالجة مركزية* بالتبادل. وعلى المستوى الأساسي، **المعالج** أي دائرة تجري بعض الحساب على بيانات خارجية. وبناءً على هذا التعريف، فإن **وحدة المعالجة المركزية** (CPU) مثال على معالج. ويُشار إلى معالج أو وحدة معالجة مركزية بعدة أنوية حسابية بـ**معالج متعدد الأنوية** أو **وحدة معالجة مركزية متعددة الأنوية**. أما **النواة** فوحدة حساب تحتوي كثيرًا من المكوّنات التي تتألف منها وحدة المعالجة المركزية الكلاسيكية: وحدة حساب ومنطق، وسجلات، وقليل من الذاكرة المؤقتة. ومع أن *النواة* تختلف عن المعالج، فليس غريبًا رؤية هذه المصطلحات مستخدمة بالتبادل في الأدبيات (خصوصًا إذا كانت الأدبيات قد نشأت في وقت كانت فيه المعالجات متعددة الأنوية ما زالت تُعدّ جديدة).

في عام 1965، قدّر مؤسس Intel، Gordon Moore، أن عدد الترانزستورات في الدارة المتكاملة سيتضاعف كل سنة. وقد نُقّح تنبؤه، المعروف الآن بـ**قانون Moore**، لاحقًا ليصبح تضاعف عدد الترانزستورات كل *سنتين*. ومع أن المفاتيح الإلكترونية تطوّرت من ترانزستور Bardeen إلى ترانزستورات الشرائح الصغيرة المستخدمة حاليًا في الحواسيب الحديثة، ظل قانون Moore صحيحًا على مدى الخمسين سنة الماضية. لكن مطلع الألفية شهد اصطدام تصميم المعالجات بعدة جدران أداء حرجة:

- **جدار الذاكرة**: لم تواكب التحسينات في تقنية الذاكرة التحسينات في سرعة الساعة، فصارت الذاكرة عنق زجاجة للأداء. ونتيجة لذلك، لم يعد التسريع المستمر لتنفيذ وحدة المعالجة المركزية يحسّن أداء النظام الكلي.
- **جدار الطاقة**: تؤدي زيادة عدد الترانزستورات في المعالج بالضرورة إلى زيادة حرارته واستهلاكه للطاقة، ما يزيد بدوره الكلفة اللازمة لتغذية النظام وتبريده. ومع انتشار الأنظمة متعددة الأنوية، صارت الطاقة الشغل الشاغل المهيمن في تصميم أنظمة الحاسوب.

دفع جدارا الطاقة والذاكرة معماريي الحواسيب إلى تغيير طريقة تصميمهم للمعالجات. فبدلًا من إضافة مزيد من الترانزستورات لزيادة سرعة تنفيذ وحدة المعالجة المركزية لتدفق تعليمات واحد، بدأ المعماريون بإضافة عدة **أنوية حسابية** إلى وحدة المعالجة المركزية. والأنوية الحسابية وحدات معالجة مبسّطة تحتوي ترانزستورات أقل من وحدات المعالجة المركزية التقليدية وتكون عمومًا أسهل في الإنشاء. ويسمح دمج عدة أنوية في وحدة معالجة مركزية واحدة بتنفيذ *عدة* تدفقات مستقلة من التعليمات دفعة واحدة.

**تحذير — أنوية أكثر لا تعني أفضل**

> قد يغريك افتراض أن جميع الأنوية متساوية وأن الحاسوب كلما زاد عدد أنويته كان أفضل. وهذا ليس صحيحًا بالضرورة! فمثلًا، تحتوي أنوية **وحدة معالجة الرسوميات** (graphics processing unit أو GPU) ترانزستورات أقل حتى من أنوية المعالج، وهي متخصصة في مهام معينة تتعلق بالمتجهات. وقد تملك وحدة معالجة رسوميات نموذجية 5,000 نواة GPU أو أكثر. لكن أنوية GPU محدودة في أنواع العمليات التي تستطيع تنفيذها، وليست مناسبة دائمًا للحوسبة عامة الغرض مثل نواة المعالج. وتُعرف الحوسبة باستخدام وحدات معالجة الرسوميات بـالحوسبة **متعددة الأنوية بكثافة** (manycore). ونركّز في هذا الفصل على الحوسبة **متعددة الأنوية** (multicore). انظر [الفصل 15](https://diveintosystems.org/book/C15-Parallel/gpu.html#_GPUs) لمناقشة الحوسبة متعددة الأنوية بكثافة.

### نظرة أقرب: كم عدد الأنوية؟

تملك جميع أنظمة الحاسوب الحديثة تقريبًا أنوية متعددة، بما في ذلك الأجهزة الصغيرة مثل [Raspberry Pi](https://www.raspberrypi.org/). وتحديد عدد الأنوية في النظام جوهري لقياس أداء البرامج متعددة الأنوية قياسًا دقيقًا. وفي حواسيب Linux وmacOS، يقدّم الأمر `lscpu` ملخصًا لمعمارية النظام. وفي المثال التالي، نعرض مخرجات الأمر `lscpu` عند تشغيله على آلة نموذجية (حُذفت بعض المخرجات لإبراز السمات الرئيسية):

```bash
$ lscpu

Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                8
On-line CPU(s) list:   0-7
Thread(s) per core:    2
Core(s) per socket:    4
Socket(s):             1
Model name:            Intel(R) Core(TM) i7-3770 CPU @ 3.40GHz
CPU MHz:               1607.562
CPU max MHz:           3900.0000
CPU min MHz:           1600.0000
L1d cache:             32K
L1i cache:             32K
L2 cache:              256K
L3 cache:              8192K
...
```

يقدّم الأمر `lscpu` كثيرًا من المعلومات المفيدة، منها نوع المعالجات وسرعة النواة وعدد الأنوية. ولحساب عدد الأنوية **الفيزيائية** (أو الفعلية) في نظام، اضرب عدد المقابس في عدد الأنوية لكل مقبس. وتُظهر مخرجات `lscpu` النموذجية أعلاه أن للنظام مقبسًا واحدًا فيه أربع أنوية لكل مقبس، أي أربع أنوية فيزيائية إجمالًا.

تعدد الخيوط الفائق

للوهلة الأولى، قد يبدو أن النظام في المثال السابق يملك ثمانية أنوية إجمالًا. فهذا ما يبدو أن حقل "CPU(s)" يعنيه. لكن ذلك الحقل يدل فعلًا على عدد الأنوية **الفائقة الخيوط** (المنطقية)، لا عدد الأنوية الفيزيائية. ويتيح تعدد الخيوط الفائق، أو تعدد الخيوط المتزامن (SMT)، المعالجة الكفؤة لخيوط متعددة على نواة واحدة. ومع أن تعدد الخيوط الفائق قد يقلل زمن التشغيل الكلي لبرنامج، فإن الأداء على الأنوية الفائقة الخيوط لا يتوسع بالمعدل نفسه الذي يتوسع به على الأنوية الفيزيائية. لكن إذا خملت مهمة ما (مثلًا بسبب [خطر تحكم](https://diveintosystems.org/book/C5-Arch/pipelining_advanced.html#_pipelining_hazards_control_hazards))، تستطيع مهمة أخرى استخدام النواة. وباختصار، أُدخل تعدد الخيوط الفائق لتحسين *إنتاجية العمليات* (التي تقيس عدد العمليات التي تكتمل في وحدة زمنية معينة) بدلًا من *تسريع العملية* (الذي يقيس مقدار التحسن في زمن تشغيل عملية فردية). وسيركّز كثير من مناقشتنا للأداء في الفصل القادم على التسريع.

أنوية الأداء وأنوية الكفاءة

في بعض المعماريات الأحدث (مثل معالجات Intel من الجيل الثاني عشر وما بعده)، يعطي ضرب عدد المقابس في أعداد الأنوية وخيوط العتاد عددًا مختلفًا (أصغر عادةً) من المعروض في حقل "CPU(s)". فما الذي يجري؟ تكمن الإجابة في المعماريات غير المتجانسة الجديدة التي تطوّرها شركات تصنيع الشرائح. فمثلًا، بدءًا من معالجاتها من الجيل الثاني عشر، قدّمت Intel معمارية تتألف من مزيج من أنوية «الأداء» (**P-cores**) وأنوية «الكفاءة» (**E-cores**). وهدف هذا التصميم الهجين تفويض المهام الخلفية الأصغر إلى أنوية E الأصغر قليلة الاستهلاك للطاقة، وتحرير أنوية P الأكبر كثيفة الاستهلاك للمهام الحسابية. ويقود مبدأ مشابه تصميم معمارية big.LITTLE المتنقلة الأسبق التي قدّمتها Arm. وفي المعماريات غير المتجانسة، تُظهر المخرجات الافتراضية لـ `lscpu` أنوية P المتاحة فقط؛ ويمكن عادةً حساب عدد أنوية E بطرح عدد أنوية P من إجمالي الأنوية المعروض في حقل "CPU(s)". واستدعاء الأمر `lscpu` بعلميه `--all` و`--extended` سيعرض خريطة كاملة لأنوية P وE في النظام، حيث يمكن تمييز نواة E بسرعات معالجها الأدنى.

أُنشئت معظم اللغات الشائعة التي يعرفها المبرمجون اليوم قبل عصر تعدد الأنوية. ونتيجة لذلك، لا تستطيع لغات كثيرة استخدام المعالجات متعددة الأنوية *ضمنيًا* (أو تلقائيًا) لتسريع تنفيذ البرنامج. بل يجب على المبرمجين كتابة برمجيات تحديدًا للاستفادة من الأنوية المتعددة في النظام.

### 14.1.1. أثر الأنظمة متعددة الأنوية في تنفيذ العمليات {#_the_impact_of_multicore_systems_on_process_execution}

تذكّر أن [**العملية**](https://diveintosystems.org/book/C13-OS/processes.html#_processes) يمكن التفكير فيها كتجريد لبرنامج عامل. وتنفّذ كل عملية في فضاء عنوانها الافتراضي الخاص. ويجدول نظام التشغيل العمليات للتنفيذ على المعالج؛ ويحدث **تبديل السياق** عندما يغيّر المعالج العملية التي ينفّذها حاليًا.

ويوضح [الشكل 1](#FigConcurrency1) كيف يمكن لخمس عمليات نموذجية أن تنفّذ على معالج أحادي النواة.

![concurrency example with 5 processes](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-0-concurrency_1.webp) Figure 1. An execution time sequence for five processes as they share a single CPU core

المحور الأفقي هو الزمن، وتستغرق كل شريحة زمنية وحدة زمن واحدة. ويمثّل المربع وقت استخدام العملية للمعالج أحادي النواة. لنفترض أن كل عملية تنفّذ شريحة زمنية كاملة قبل حدوث تبديل السياق. فعملية 1 تستخدم المعالج خلال الخطوتين الزمنيتين T1 وT3.

في هذا المثال، ترتيب تنفيذ العمليات هو P1، P2، P1، P2، P4، P2، P3، P4، P5، P3، P5. ونستغرق لحظة هنا للتمييز بين مقياسين للزمن. فـ**زمن المعالج** (CPU time) يقيس مقدار الوقت الذي تستغرقه العملية في التنفيذ على المعالج. وفي المقابل، يقيس **الزمن الحائطي** (wall-clock time) مقدار الوقت الذي يتصور فيه الإنسان أن العملية استغرقته لتكتمل. وكثيرًا ما يكون الزمن الحائطي أطول بكثير من زمن المعالج بسبب تبديلات السياق. فمثلًا، يحتاج زمن المعالج لعملية 1 إلى وحدتي زمن، بينما زمنها الحائطي ثلاث وحدات زمن.

وعندما يتداخل زمن التنفيذ الكلي لعملية مع أخرى، تكون العمليات عاملة **بالتزامن** مع بعضها. وقد استخدمت أنظمة التشغيل التزامن في عصر النواة الواحدة لإعطاء وهم بأن الحاسوب يستطيع تنفيذ أشياء كثيرة دفعة واحدة (مثلًا، يمكن أن يكون لديك برنامج آلة حاسبة ومتصفح ويب ومستند معالجة نصوص مفتوحة كلها في الوقت نفسه). وفي الحقيقة، كل عملية تنفّذ تتابعيًا، ويحدد نظام التشغيل [ترتيب تنفيذ العمليات واكتمالها](https://diveintosystems.org/book/C13-OS/processes.html#_multiprogramming_and_context_switching) (وهو ترتيب يختلف غالبًا في التشغيلات اللاحقة).

وبالعودة إلى المثال، لاحظ أن العملية 1 والعملية 2 تعملان بالتزامن مع بعضهما، لأن تنفيذهما يتداخل عند النقاط الزمنية T2-T4. وبالمثل، تعمل العملية 2 بالتزامن مع العملية 4، لأن تنفيذهما يتداخل عند النقاط T4-T6. وفي المقابل، *لا* تعمل العملية 2 بالتزامن مع العملية 3، لأنه لا تداخل بين تنفيذهما؛ فالعملية 3 تبدأ العمل فقط عند الزمن T7، بينما تكتمل العملية 2 عند الزمن T6.

وتتيح وحدة المعالجة المركزية متعددة الأنوية لنظام التشغيل جدولة عملية مختلفة لكل نواة متاحة، ما يتيح للعمليات التنفيذ *في الوقت نفسه*. ويُشار إلى التنفيذ المتزامن لتعليمات من عمليات تعمل على أنوية متعددة بـ**التنفيذ المتوازي** (parallel execution). ويعرض [الشكل 2](#FigConcurrency2) كيف يمكن لعملياتنا المثال أن تنفّذ على نظام ثنائي الأنوية.

![parallel example with 2 cores](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-1-concurrency_2.webp) Figure 2. An execution time sequence for five processes, extended to include two CPU cores (one in dark blue, the other in light green).

في هذا المثال، تُلوَّن نواتا المعالج بلونين مختلفين. لنفترض أن ترتيب تنفيذ العمليات هو مرة أخرى P1، P2، P1، P2، P4، P2، P3، P4، P5، P3، P5. ويتيح وجود أنوية متعددة لبعض العمليات التنفيذ *مبكرًا*. فمثلًا، خلال الوحدة الزمنية T1، تنفّذ النواة الأولى العملية 1 بينما تنفّذ النواة الثانية العملية 2. وعند الزمن T2، تنفّذ النواة الأولى العملية 2 بينما تنفّذ الثانية العملية 1. وبذلك تكمل العملية 1 تنفيذها بعد الزمن T2، بينما تكمل العملية 2 تنفيذها عند الزمن T3.

لاحظ أن التنفيذ المتوازي لعمليات متعددة يزيد فقط عدد العمليات التي تنفّذ في أي لحظة. وفي [الشكل 2](#FigConcurrency2)، تكمل جميع العمليات التنفيذ بحلول الوحدة الزمنية T7. لكن كل عملية فردية ما زالت تحتاج المقدار نفسه من زمن المعالج لتكتمل كما يظهر في [الشكل 1](#FigConcurrency1). فمثلًا، تحتاج العملية 2 ثلاث وحدات زمن سواء نُفّذت على نظام أحادي النواة أم متعدد الأنوية (أي أن *زمن معالجها* يبقى كما هو). ويزيد المعالج متعدد الأنوية **إنتاجية** تنفيذ العمليات، أي عدد العمليات التي يمكن أن تكتمل في فترة زمنية معينة. وبذلك، بينما يبقى زمن المعالج لعملية فردية دون تغيير، قد ينخفض زمنها الحائطي.

### 14.1.2. تعجيل تنفيذ العمليات بالخيوط {#_expediting_process_execution_with_threads}

من طرق تسريع تنفيذ عملية واحدة تفكيكها إلى تدفقات تنفيذ مستقلة خفيفة تُسمى **الخيوط** (threads). ويعرض [الشكل 3](#FigProcess) كيف يتغير فضاء العنوان الافتراضي للعملية عندما تصبح متعددة الخيوط بخيطين. ومع أن لكل خيط تخصيصه الخاص لمساحة مكدّس النداء، فإن جميع الخيوط *تتشارك* بيانات البرنامج وتعليماته والكومة المخصصة للعملية متعددة الخيوط.

![multithread process with 2 threads](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-2-multithread-vas.webp) Figure 3. Comparing the virtual address space of a single-threaded and a multithreaded process with two threads

ويجدول نظام التشغيل الخيوط بالطريقة نفسها التي يجدول بها العمليات. وعلى معالج متعدد الأنوية، يستطيع نظام التشغيل تسريع تنفيذ برنامج متعدد الخيوط بجدولة خيوطه المختلفة للعمل على أنوية منفصلة. ويساوي الحد الأقصى لعدد الخيوط التي يمكن أن تنفّذ على التوازي عدد الأنوية الفيزيائية في النظام. وإذا تجاوز عدد الخيوط عدد الأنوية الفيزيائية، وجب على الخيوط الباقية انتظار دورها للتنفيذ (على غرار طريقة تنفيذ العمليات على نواة واحدة).

#### مثال: الضرب القياسي {#_an_example_scalar_multiplication}

وكمثال أولي على كيفية استخدام تعدد الخيوط لتسريع تطبيق، فكّر في مسألة إجراء ضرب قياسي لمصفوفة `array` في عدد صحيح ما `s`. وفي الضرب القياسي، يُقاس كل عنصر في المصفوفة بضربه في `s`.

وتطبيق تتابعي لدالة الضرب القياسي كما يلي:

```c
void scalar_multiply(int * array, long length, int s) {
    int i;
    for (i = 0; i < length; i++) {
      array[i] = array[i] * s;
    }
}
```

لنفترض أن `array` يحتوي *N* عنصرًا إجمالًا. ولإنشاء نسخة متعددة الخيوط من هذا التطبيق بـ*t* من الخيوط، يلزم:

1. إنشاء *t* خيوط.
2. إسناد كل خيط مجموعة جزئية من مصفوفة الإدخال (أي *N*/*t* عنصرًا).
3. تكليف كل خيط بضرب العناصر في مجموعته الجزئية من المصفوفة في `s`.

لنفترض أن التطبيق التتابعي لـ `scalar_multiply` يستغرق 60 ثانية لضرب مصفوفة إدخال من 100 مليون عنصر. ولبناء نسخة تنفّذ بـ*t*= 4 خيوط، نُسند إلى كل خيط ربع مصفوفة الإدخال الكلية (25 مليون عنصر).

ويعرض [الشكل 4](#singleCPU) ما يحدث عند تشغيل أربعة خيوط على نواة واحدة. وكما سبق، يُترك ترتيب التنفيذ لنظام التشغيل. وفي هذا السيناريو، افترض أن ترتيب تنفيذ الخيوط هو الخيط 1، الخيط 3، الخيط 2، الخيط 4. وعلى معالج أحادي النواة (تمثله المربعات)، ينفّذ كل خيط تتابعيًا. وبذلك، ستستغرق العملية متعددة الخيوط العاملة على نواة واحدة 60 ثانية أيضًا (وربما أطول قليلًا بسبب كلفة إنشاء الخيوط).

![multithreaded process on one core](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-3-single-core-thread.webp) Figure 4. Running four threads on a single-core CPU

والآن لنفترض أننا نشغّل عمليتنا متعددة الخيوط على نظام ثنائي الأنوية. ويعرض [الشكل 5](#doubleCPU) النتيجة. ومرة أخرى، افترض *t* = 4 خيوط، وأن ترتيب تنفيذ الخيوط هو الخيط 1، الخيط 3، الخيط 2، الخيط 4. ونواتانا تمثلهما مربعات مظللة. ولأن النظام ثنائي الأنوية، ينفّذ الخيطان 1 و3 على التوازي خلال الخطوة الزمنية T1. ثم ينفّذ الخيطان 2 و4 على التوازي خلال الخطوة الزمنية T2. وبذلك، صارت العملية متعددة الخيوط التي كانت تستغرق 60 ثانية تعمل في 30 ثانية.

![multithreaded process on two cores](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-4-dual-core-thread.webp) Figure 5. Running four threads on a dual-core CPU

وأخيرًا، لنفترض أن العملية متعددة الخيوط (*t* = 4) تُشغَّل على معالج رباعي الأنوية. ويعرض [الشكل 6](#quadCPU) أحد تسلسلات التنفيذ هذه. وتظلَّل كل نواة من الأنوية الأربع في [الشكل 6](#quadCPU) بلون مختلف. وعلى النظام رباعي الأنوية، ينفّذ كل خيط على التوازي خلال الشريحة الزمنية T1. وبذلك، على معالج رباعي الأنوية، صارت العملية متعددة الخيوط التي كانت تستغرق 60 ثانية تعمل في 15 ثانية.

![multithreaded process on four cores](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-5-quad-core-thread.webp) Figure 6. Running four threads on a quad-core CPU

وبصفة عامة، إذا طابق عدد الخيوط عدد الأنوية (*c*) وجدول نظام التشغيل كل خيط للعمل على نواة منفصلة على التوازي، فمن المفترض أن تعمل العملية متعددة الخيوط في نحو 1/*c* من الزمن. وهذا التسريع الخطي مثالي، لكنه لا يُلاحظ كثيرًا في الواقع العملي. فمثلًا، إذا كانت هناك عمليات أخرى كثيرة (أو عمليات متعددة الخيوط) تنتظر استخدام المعالج، فستتنافس كلها على العدد المحدود من الأنوية، ما يؤدي إلى **تنازع الموارد** (resource contention) بين العمليات. وإذا تجاوز عدد الخيوط المحددة عدد أنوية المعالج، وجب على كل خيط انتظار دوره للعمل. وسنستكشف عوامل أخرى كثيرًا ما تمنع التسريع الخطي [لاحقًا في هذا الفصل](https://diveintosystems.org/book/C14-SharedMemory/performance.html#_measuring_the_performance_of_parallel_programs).

نفحص في هذا القسم مكتبة الخيوط الشائعة POSIX، أي **Pthreads**. وPOSIX اختصار لـ Portable Operating System Interface. وهو معيار من IEEE يحدد شكل أنظمة UNIX وسلوكها وإحساسها. وتتوافر واجهة برمجة خيوط POSIX على جميع أنظمة التشغيل الشبيهة بـ UNIX تقريبًا، وكل منها يستوفي المعيار بكامله أو بدرجة كبيرة. لذلك، إذا كتبت شيفرة متوازية باستخدام خيوط POSIX على آلة Linux، فستعمل بالتأكيد على آلات Linux أخرى، ويُرجَّح أن تعمل على آلات تشغّل macOS أو متغيرات UNIX أخرى.

لنبدأ بتحليل برنامج Pthreads نموذجي لـ«Hello World» ([hellothreads.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/hellothreads.c)). وللإيجاز، استبعدنا معالجة الأخطاء من القائمة، مع أن [النسخة القابلة للتنزيل](https://diveintosystems.org/book/C14-SharedMemory/_attachments/hellothreads.c) تحتوي معالجة أخطاء نموذجية.

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

/* The "thread function" passed to pthread_create.  Each thread executes this
 * function and terminates when it returns from this function. */
void *HelloWorld(void *id) {

    /* We know the argument is a pointer to a long, so we cast it from a
     * generic (void *) to a (long *). */
    long *myid = (long *) id;

    printf("Hello world! I am thread %ld\n", *myid);

    return NULL; // We don't need our threads to return anything.
}

int main(int argc, char **argv) {
    int i;
    int nthreads; //number of threads
    pthread_t *thread_array; //pointer to future thread array
    long *thread_ids;

    // Read the number of threads to create from the command line.
    if (argc !=2) {
        fprintf(stderr, "usage: %s <n>\n", argv[0]);
        fprintf(stderr, "where <n> is the number of threads\n");
        return 1;
    }
    nthreads = strtol(argv[1], NULL, 10);

    // Allocate space for thread structs and identifiers.
    thread_array = malloc(nthreads * sizeof(pthread_t));
    thread_ids = malloc(nthreads * sizeof(long));

    // Assign each thread an ID and create all the threads.
    for (i = 0; i < nthreads; i++) {
        thread_ids[i] = i;
        pthread_create(&thread_array[i], NULL, HelloWorld, &thread_ids[i]);
    }

    /* Join all the threads. Main will pause in this loop until all threads
     * have returned from the thread function. */
    for (i = 0; i < nthreads; i++) {
        pthread_join(thread_array[i], NULL);
    }

    free(thread_array);
    free(thread_ids);

    return 0;
}
```

لنفحص هذا البرنامج في مكوّنات أصغر.

- لاحظ تضمين ملف الترويسة `pthread.h` الذي يعرّف أنواع `pthread` ودوالها.
- بعد ذلك، تعرّف الدالة `HelloWorld` **دالة الخيط** التي نمرّرها لاحقًا إلى `pthread_create`. ودالة الخيط مماثلة لدالة `main` بالنسبة إلى خيط عامل (منشأ) — فيبدأ الخيط تنفيذه عند بداية دالة خيطه وينتهي عند وصوله إلى نهايتها. وينفّذ كل خيط دالة الخيط باستخدام حالة تنفيذه الخاصة (أي ذاكرة مكدّسه وقيم سجلاته الخاصة). لاحظ أيضًا أن دالة الخيط من النوع `void*`. وتحديد [**مؤشر مجهول**](https://diveintosystems.org/book/C2-C_depth/advanced_voidstar.html#_c_voidstar_recasting_) في هذا السياق يتيح للمبرمجين كتابة دوال خيوط تتعامل مع وسائط وقيم إرجاع من أنواع مختلفة.
- وأخيرًا، في الدالة `main`، يهيّئ الخيط الرئيسي حالة البرنامج قبل إنشاء خيوط العمل وضمّها.

### 14.2.1. إنشاء الخيوط وضمّها {#_creating_and_joining_threads}

يبدأ البرنامج أولًا كعملية أحادية الخيط. وأثناء تنفيذه الدالة `main`، يقرأ عدد الخيوط المراد إنشاؤها، ويخصص ذاكرة لمصفوفتين: `thread_array` و`thread_ids`. وتحتوي المصفوفة `thread_array` مجموعة عناوين كل خيط مُنشأ. وتخزّن المصفوفة `thread_ids` مجموعة الوسائط التي تُمرَّر إلى كل خيط. وفي هذا المثال، يُمرَّر إلى كل خيط عنوان رتبته (أو معرّفه، الممثَّل بـ `thread_ids[i]`).

وبعد تخصيص جميع المتغيرات الأولية وتهيئتها، ينفّذ الخيط الرئيسي خطوتي تعدد الخيوط الرئيستين:

- خطوة **الإنشاء**، وفيها يولّد الخيط الرئيسي خيط عمل واحدًا أو أكثر. وبعد توليده، يعمل كل خيط عمل داخل سياق تنفيذه الخاص بالتزامن مع الخيوط والعمليات الأخرى في النظام.
- خطوة **الضم** (join)، وفيها ينتظر الخيط الرئيسي اكتمال جميع خيوط العمل قبل المتابعة كعملية أحادية الخيط. وضم خيط انتهى يحرّر سياق تنفيذ الخيط وموارده. ومحاولة ضم خيط *لم* ينتهِ تحجب المستدعي حتى ينتهي الخيط، على غرار دلالات [دالة wait للعمليات](https://diveintosystems.org/book/C13-OS/processes.html#_exit_and_wait).

وتوفّر مكتبة Pthreads دالة `pthread_create` لإنشاء الخيوط ودالة `pthread_join` لضمّها. وتوقيع الدالة `pthread_create` كما يلي:

```c
pthread_create(pthread_t *thread, const pthread_attr_t *attr,
               void *(*thread_function)(void *), void *thread_args)
```

وتأخذ الدالة مؤشرًا إلى بنية خيط (من النوع `pthread_t`)، ومؤشرًا إلى بنية سمات (تُضبط عادةً على `NULL`)، واسم الدالة التي ينبغي أن ينفّذها الخيط، ومصفوفة الوسائط التي ستُمرَّر إلى دالة الخيط عند بدئه.

ويستدعي برنامج Hello World الدالة `pthread_create` في الدالة `main` بالشكل:

```c
pthread_create(&thread_array[i], NULL, HelloWorld, &thread_ids[i]);
```

وهنا:

- يحتوي `&thread_array[i]` عنوان الخيط *i*. وتخصص الدالة `pthread_create` كائن خيط `pthread_t` وتخزّن عنوانه في هذا الموقع، ما يتيح للمبرمج الإشارة إلى الخيط لاحقًا (مثلًا عند ضمّه).
- يحدد `NULL` أنه ينبغي إنشاء الخيط بسمات افتراضية. وفي معظم البرامج، من الآمن ترك هذا المُعامِل الثاني `NULL`.
- يسمّي `HelloWorld` دالة الخيط التي ينبغي أن ينفّذها الخيط المنشأ. وتتصرف هذه الدالة مثل دالة «main» للخيط. وبالنسبة إلى دالة خيط اعتباطية (مثل `function`)، يجب أن يطابق نموذجها الشكل `void * function(void *)`.
- يحدد `&thread_ids[i]` عنوان الوسائط التي ستُمرَّر إلى الخيط *i*. وفي هذه الحالة، يحتوي `thread_ids[i]` عددًا واحدًا من النوع `long` يمثل معرّف الخيط. ولأن المُعامِل الأخير لـ `pthread_create` يجب أن يكون مؤشرًا، نمرّر *عنوان* معرّف الخيط.

ولتوليد عدة خيوط تنفّذ دالة الخيط `HelloWorld`، يُسند البرنامج إلى كل خيط معرّفًا فريدًا وينشئ كل خيط داخل حلقة `for`:

```c
for (i = 0; i < nthreads; i++) {
    thread_ids[i] = i;
    pthread_create(&thread_array[i], NULL, HelloWorld, &thread_ids[i]);
}
```

ويجدول نظام التشغيل تنفيذ كل خيط مُنشأ؛ ولا يستطيع المستخدم افتراض أي شيء عن ترتيب تنفيذ الخيوط.

وتوقف دالة `pthread_join` تنفيذ مستدعيها حتى ينتهي الخيط الذي تشير إليه. وتوقيعها:

```c
pthread_join(pthread_t thread, void **return_val)
```

تأخذ `pthread_join` مدخلًا بنية `pthread_t` تدل على الخيط الذي ستنتظره، ومُعامِل مؤشر اختياريًا يحدد أين تُخزَّن قيمة إرجاع الخيط.

ويستدعي برنامج Hello World الدالة `pthread_join` في `main` بالشكل:

```c
pthread_join(thread_array[t], NULL);
```

يدل هذا السطر على أن على الخيط الرئيسي انتظار انتهاء الخيط `t`. وتمرير `NULL` مُعامِلًا ثانيًا يدل على أن البرنامج لا يستخدم قيمة إرجاع الخيط.

وفي البرنامج السابق، يستدعي `main` الدالة `pthread_join` في حلقة لأن *جميع* خيوط العمل تحتاج إلى الانتهاء قبل أن تتابع الدالة `main` تنظيف الذاكرة وإنهاء العملية:

```c
for (i = 0; i < nthreads; i++) {
    pthread_join(thread_array[i], NULL);
}
```

### 14.2.2. دالة الخيط {#_the_thread_function}

في البرنامج السابق، يطبع كل خيط مُنشأ `Hello world! I am thread n`، حيث `n` معرّف الخيط الفريد. وبعد أن يطبع الخيط رسالته، ينتهي. لنلقِ نظرة أقرب على الدالة `HelloWorld`:

```c
void *HelloWorld(void *id) {
    long *myid = (long*)id;

    printf("Hello world! I am thread %ld\n", *myid);

    return NULL;
}
```

تذكّر أن `pthread_create` تمرّر الوسائط إلى دالة الخيط عبر المُعامِل `thread_args`. وفي الدالة `pthread_create` في `main`، حدد برنامج Hello World أن هذا المُعامِل هو في الواقع معرّف الخيط. لاحظ أن المُعامِل في `HelloWorld` يجب أن يُعلَن كمؤشر عام أو [مؤشر مجهول (`void *`)](https://diveintosystems.org/book/C2-C_depth/advanced_voidstar.html#_c_voidstar_recasting_). وتستخدم مكتبة Pthreads `void *` لجعل `pthread_create` أكثر عمومية بعدم فرض نوع مُعامِل. وبالنسبة إلى المبرمج، يكون `void *` غير مريح قليلًا لأنه يجب إعادة صبه قبل استخدامه. وهنا *نعرف* أن المُعامِل من النوع `long *` لأن ذلك ما مرّرناه إلى `pthread_create` في `main`. ولذلك يمكننا صب القيمة بأمان كـ `long *` وإلغاء الإشارة عن المؤشر للوصول إلى قيمة `long`. وتتبع برامج متوازية كثيرة هذه البنية.

وعلى غرار مُعامِل دالة الخيط، تتجنّب مكتبة Pthreads فرض نوع إرجاع دالة الخيط بتحديد `void *` آخر — فالمبرمج حر في إعادة أي مؤشر من دالة الخيط. وإذا احتاج البرنامج إلى الوصول إلى قيمة إرجاع الخيط، فيمكنه استرجاعها عبر المُعامِل الثاني لـ `pthread_join`. وفي مثالنا، لا حاجة للخيط إلى إعادة قيمة، فيعيد ببساطة مؤشر `NULL`.

### 14.2.3. تشغيل الشيفرة {#_running_the_code}

يوضح الأمر التالي كيفية استخدام GCC لتصريف [hellothreads.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/hellothreads.c). ويتطلب بناء تطبيق Pthreads تمرير علم الربط `-pthread` إلى GCC لضمان إتاحة دوال Pthreads وأنواعها:

```bash
$ gcc -o hellothreads hellothreads.c -pthread
```

وينتج عن تشغيل البرنامج من دون وسيطة سطر أوامر رسالة استخدام:

```bash
$ ./hellothreads
usage: ./hellothreads <n>
where <n> is the number of threads
```

وينتج عن تشغيل البرنامج بأربعة خيوط المخرجات التالية:

```bash
$ ./hellothreads 4
Hello world! I am thread 1
Hello world! I am thread 2
Hello world! I am thread 3
Hello world! I am thread 0
```

لاحظ أن كل خيط يطبع رقم معرّفه الفريد. وفي هذا التشغيل، تظهر مخرجات الخيط 1 أولًا، ثم الخيوط 2 و3 و0. وإذا شغّلنا البرنامج مرة أخرى، فقد نرى المخرجات معروضة بترتيب مختلف:

```bash
$ ./hellothreads 4
Hello world! I am thread 0
Hello world! I am thread 1
Hello world! I am thread 2
Hello world! I am thread 3
```

تذكّر أن مجدول نظام التشغيل هو الذي يحدد ترتيب تنفيذ الخيوط. ومن منظور المستخدم، الترتيب *عشوائي فعليًا* لأنه يتأثر بعوامل كثيرة تتفاوت خارج سيطرته (مثل موارد النظام المتاحة، أو تلقّي النظام مدخلات، أو جدولة نظام التشغيل). ولأن جميع الخيوط تعمل بالتزامن مع بعضها وكل خيط ينفّذ نداءً إلى `printf` (التي تطبع إلى `stdout`)، فإن أول خيط يطبع إلى `stdout` ستظهر مخرجاته أولًا. وقد تؤدي التشغيلات اللاحقة (أو لا تؤدي) إلى مخرجات مختلفة.

**تحذير — ترتيب تنفيذ الخيوط**

> ينبغي *ألا* تفترض أبدًا أي شيء عن ترتيب تنفيذ الخيوط. وإذا كانت صحة برنامجك تتطلب عمل الخيوط بترتيب معين، فيجب أن تضيف [**تزامنًا**](https://diveintosystems.org/book/C14-SharedMemory/synchronization.html#_synchronizing_threads) إلى برنامجك لمنع الخيوط من العمل عندما لا ينبغي لها ذلك.

### 14.2.4. إعادة النظر في الضرب القياسي {#_revisiting_scalar_multiplication}

لنستكشف كيفية إنشاء تطبيق متعدد الخيوط لبرنامج [الضرب القياسي](https://diveintosystems.org/book/C14-SharedMemory/multicore.html#_an_example_scalar_multiplication) من القسم السابق. تذكّر أن استراتيجيتنا العامة لجعل `scalar_multiply` متوازية هي:

1. إنشاء خيوط متعددة،
2. إسناد كل خيط مجموعة جزئية من مصفوفة الإدخال،
3. تكليف كل خيط بضرب العناصر في مجموعته الجزئية من المصفوفة في `s`.

وفيما يلي دالة خيط تنجز هذه المهمة. لاحظ أننا نقلنا `array` و`length` و`s` إلى النطاق العام للبرنامج.

```c
long *array; //allocated in main
long length; //set in main (1 billion)
long nthreads; //number of threads
long s; //scalar

void *scalar_multiply(void *id) {
    long *myid = (long *) id;
    int i;

    //assign each thread its own chunk of elements to process
    long chunk = length / nthreads;
    long start = *myid * chunk;
    long end  = start + chunk;
    if (*myid == nthreads - 1) {
        end = length;
    }

    //perform scalar multiplication on assigned chunk
    for (i = start; i < end; i++) {
        array[i] *= s;
    }

    return NULL;
}
```

لنفصّل ذلك إلى أجزاء. تذكّر أن الخطوة الأولى هي إسناد مكوّن من المصفوفة إلى كل خيط. وتنجز الأسطر التالية هذه المهمة:

```c
long chunk = length / nthreads;
long start = *myid * chunk;
long end  = start + chunk;
```

يخزّن المتغير `chunk` عدد العناصر المسندة إلى كل خيط. ولضمان حصول كل خيط على كمية عمل متقاربة تقريبًا، نضبط حجم القطعة أولًا على عدد العناصر مقسومًا على عدد الخيوط، أو `length / nthreads`.

بعد ذلك، نُسند إلى كل خيط مجالًا مميزًا من العناصر لمعالجته. ويحسب كل خيط فهرسي `start` و`end` لمجاله باستخدام حجم `chunk` ومعرّف خيطه الفريد.

فمثلًا، مع أربعة خيوط (بمعرّفات 0-3) تعمل على مصفوفة من 100 مليون عنصر، يكون كل خيط مسؤولًا عن معالجة `chunk` من 25 مليون عنصر. وإدراج معرّف الخيط يُسند إلى كل خيط مجموعة جزئية فريدة من الإدخال.

ويعالج السطران التاليان حالة عدم قابلية `length` للقسمة على عدد الخيوط بالتساوي:

```c
if (*myid == nthreads - 1) {
    end = length;
}
```

لنفترض أننا حددنا ثلاثة خيوط بدلًا من أربعة. سيكون حجم القطعة الاسمي 33,333,333 عنصرًا، فيتبقى عنصر واحد غير محسوب. وستسند الشيفرة في المثال السابق العنصر المتبقي إلى الخيط الأخير.

**ملاحظة — إنشاء إدخال متوازن**

> شيفرة التقطيع المعروضة للتو غير مثالية. فعندما لا يقسم عدد الخيوط الإدخال بالتساوي، يُسند الباقي إلى الخيط الأخير. فكّر في تشغيل نموذجي تكون فيه المصفوفة من 100 عنصر ويُحدَّد 12 خيطًا. سيكون حجم القطعة الاسمي 8 والباقي 4. ومع شيفرة المثال، سيكون لكل من الخيوط الأحد عشر الأولى 8 عناصر مسندة، بينما يُسند إلى الخيط الأخير 12 عنصرًا. ونتيجة لذلك، ينفّذ الخيط الأخير عملًا أكثر بنسبة 50% من الخيوط الأخرى. وربما تكون الطريقة الأفضل لتقطيع هذا المثال أن يعالج كل من الخيوط الأربعة الأولى 9 عناصر، بينما يعالج كل من الخيوط الثمانية الأخيرة 8 عناصر. وسينتج عن ذلك **موازنة حمل** (load balancing) أفضل للإدخال بين الخيوط.

وبعد حساب فهرسي `start` و`end` المحليين المناسبين، يصبح كل خيط جاهزًا لإجراء الضرب القياسي على مكوّنه من المصفوفة. وينجز الجزء الأخير من دالة `scalar_multiply` ذلك:

```c
for (i = start; i < end; i++) {
    array[i] *= s;
}
```

### 14.2.5. تحسين الضرب القياسي: وسائط متعددة {#_improving_scalar_multiplication_multiple_arguments}

من أوجه الضعف الرئيسية في التطبيق السابق الاستخدام الواسع للمتغيرات العامة. وقد أظهرت مناقشتنا الأصلية لـ[المتغيرات العامة](https://diveintosystems.org/book/C2-C_depth/scope_memory.html#_parts_of_program_memory_and_scope) أنه مع فائدتها، ينبغي تجنّب المتغيرات العامة عمومًا في C. ولتقليل عدد المتغيرات العامة في البرنامج، يتمثل أحد الحلول في تعريف بنية `t_arg` كما يلي في النطاق العام:

```c
struct t_arg {
    int *array; // pointer to shared array
    long length; // num elements in array
    long s; //scaling factor
    long numthreads; // total number of threads
    long id; //  logical thread id
};
```

وستخصص دالتنا main، إضافةً إلى تخصيص `array` وضبط المتغيرات المحلية `length` و`nthreads` و`s` (عامل القياس لدينا)، مصفوفة من سجلات `t_arg`:

```c
long nthreads = strtol(argv[1], NULL, 10); //get number of threads
long length = strtol(argv[2], NULL, 10); //get length of array
long s = strtol( argv[3], NULL, 10 ); //get scaling factor

int *array = malloc(length*sizeof(int));

//allocate space for thread structs and identifiers
pthread_t *thread_array = malloc(nthreads * sizeof(pthread_t));
struct t_arg *thread_args = malloc(nthreads * sizeof(struct t_arg));

//Populate thread arguments for all the threads
for (i = 0; i < nthreads; i++){
    thread_args[i].array = array;
    thread_args[i].length = length;
    thread_args[i].s = s;
    thread_args[i].numthreads = nthreads;
    thread_args[i].id = i;
}
```

لاحقًا في `main`، عند استدعاء `pthread_create`، تُمرَّر بنية `t_args` المرتبطة بالخيط كوسيطة:

```c
for (i = 0; i < nthreads; i++){
    pthread_create(&thread_array[i], NULL, scalar_multiply, &thread_args[i]);
}
```

وأخيرًا، ستبدو دالتنا `scalar_multiply` كما يلي:

```c
void * scalar_multiply(void* args) {
    //cast to a struct t_arg from void*
    struct t_arg * myargs = (struct t_arg *) args;

    //extract all variables from struct
    long myid =  myargs->id;
    long length = myargs->length;
    long s = myargs->s;
    long nthreads = myargs->numthreads;
    int * ap = myargs->array; //pointer to array in main

    //code as before
    long chunk = length/nthreads;
    long start = myid * chunk;
    long end  = start + chunk;
    if (myid == nthreads-1) {
        end = length;
    }

    int i;
    for (i = start; i < end; i++) {
        ap[i] *= s;
    }

    return NULL;
}
```

وتنفيذ هذا البرنامج تنفيذًا كاملًا تمرين نتركه للقارئ. يرجى ملاحظة أن معالجة الأخطاء حُذفت للإيجاز.

في الأمثلة التي نظرنا إليها حتى الآن، ينفّذ كل خيط من دون تشارك بيانات مع أي خيوط أخرى. وفي برنامج الضرب القياسي، مثلًا، يكون كل عنصر في المصفوفة مستقلًا تمامًا عن جميع العناصر الأخرى، فلا حاجة إلى تشارك الخيوط بيانات.

غير أن قدرة الخيط على تشارك البيانات مع الخيوط الأخرى بسهولة من سماته الرئيسية. تذكّر أن جميع خيوط العملية متعددة الخيوط تتشارك الكومة المشتركة للعملية. وفي هذا القسم، ندرس آليات تشارك البيانات والحماية المتاحة للخيوط بالتفصيل.

يشير **تزامن الخيوط** (thread synchronization) إلى إجبار الخيوط على التنفيذ بترتيب معين. ومع أن تزامن الخيوط قد يضيف إلى زمن تشغيل البرنامج، فإنه ضروري غالبًا لضمان صحة البرنامج. ونناقش في هذا القسم أساسًا كيف تساعد بنية تزامن واحدة (وهي *قفل التبادل المتبادل*) في ضمان صحة برنامج ذي خيوط. ونختم القسم بمناقشة بعض بنى التزامن الشائعة الأخرى: *السيمافورات* و*الحواجز* و*متغيرات الشرط*.

### CountSort

لندرس مثالًا أعقد قليلًا يُسمى CountSort. وخوارزمية CountSort خوارزمية ترتيب خطية بسيطة (O(*N*)) لترتيب مجال صغير معروف من *R* قيمة، حيث *R* أصغر بكثير من *N*. ولتوضيح كيفية عمل CountSort، فكّر في مصفوفة `A` من 15 عنصرًا، تحتوي جميعها قيمًا عشوائية بين 0 و9 (10 قيم ممكنة):

```
A = [9, 0, 2, 7, 9, 0, 1, 4, 2, 2, 4, 5, 0, 9, 1]
```

وبالنسبة إلى مصفوفة معينة، يعمل CountSort كما يلي:

1. يحصي تكرار كل قيمة في المصفوفة.
2. يكتب فوق المصفوفة الأصلية بذكر كل قيمة بحسب تكرارها.

وبعد الخطوة 1، يُوضع تكرار كل قيمة في مصفوفة `counts` بطول 10، حيث قيمة `counts[i]` هي تكرار القيمة *i* في المصفوفة `A`. فمثلًا، بما أن هناك ثلاثة عناصر قيمتها 2 في المصفوفة `A`، فإن `counts[2]` تساوي 3.

وتبدو مصفوفة `counts` المقابلة للمثال السابق كما يلي:

```
counts = [3, 2, 3, 0, 2, 1, 0, 1, 0, 3]
```

لاحظ أن مجموع جميع عناصر مصفوفة `counts` يساوي طول `A`، أي 15.

وتستخدم الخطوة 2 مصفوفة `counts` للكتابة فوق `A`، مستخدمةً أعداد التكرار لتحديد مجموعة الفهارس في `A` التي تخزّن كل قيمة متعاقبة بترتيب مفروز. ولأن مصفوفة `counts` تدل على وجود ثلاثة عناصر قيمتها 0 وعنصرين قيمتهما 1 في المصفوفة `A`، ستكون العناصر الثلاثة الأولى من المصفوفة النهائية 0، والعنصران التاليان 1.

وبعد تشغيل الخطوة 2، تبدو المصفوفة النهائية كما يلي:

```
A = [0, 0, 0, 1, 1, 2, 2, 2, 4, 4, 5, 7, 9, 9, 9]
```

وفيما يلي تطبيق تتابعي لخوارزمية CountSort، مع تمييز دالتي `count` (الخطوة 1) و`overwrite` (الخطوة 2) بوضوح. وللإيجاز، لا نعيد إدراج البرنامج كاملًا هنا، لكن يمكنك تنزيل الشيفرة المصدرية ([countSort.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countSort.c)).

```c
#define MAX 10 //the maximum value of an element. (10 means 0-9)

/*step 1:
 * compute the frequency of all the elements in the input array and store
 * the associated counts of each element in array counts. The elements in the
 * counts array are initialized to zero prior to the call to this function.
*/
void countElems(int *counts, int *array_A, long length) {
    int val, i;
    for (i = 0; i < length; i++) {
      val = array_A[i]; //read the value at index i
      counts[val] = counts[val] + 1; //update corresponding location in counts
    }
}

/* step 2:
 * overwrite the input array (array_A) using the frequencies stored in the
 *  array counts
*/
void writeArray(int *counts, int *array_A) {
    int i, j = 0, amt;

    for (i = 0; i < MAX; i++) { //iterate over the counts array
        amt = counts[i]; //capture frequency of element i
        while (amt > 0) { //while all values aren't written
            array_A[j] = i; //replace value at index j of array_A with i
            j++; //go to next position in array_A
            amt--; //decrease the amount written by 1
        }
    }
}

/* main function:
 * gets array length from command line args, allocates a random array of that
 * size, allocates the counts array, the executes step 1 of the CountSort
 * algorithm (countsElem) followed by step 2 (writeArray).
*/
int main( int argc, char **argv ) {
    //code ommitted for brevity -- download source to view full file

    srand(10); //use of static seed ensures the output is the same every run

    long length = strtol( argv[1], NULL, 10 );
    int verbose = atoi(argv[2]);

    //generate random array of elements of specified length
    int *array = malloc(length * sizeof(int));
    genRandomArray(array, length);

    //print unsorted array (commented out)
    //printArray(array, length);

    //allocate counts array and initializes all elements to zero.
    int counts[MAX] = {0};

    countElems(counts, array, length); //calls step 1
    writeArray(counts, array); //calls step2

    //print sorted array (commented out)
    //printArray(array, length);

    free(array); //free memory

    return 0;
}
```

وينتج عن تشغيل هذا البرنامج على مصفوفة بحجم 15 المخرجات التالية:

```bash
$ ./countSort 15 1
array before sort:
5 8 8 5 8 7 5 1 7 7 3 3 8 3 4
result after sort:
1 3 3 3 4 5 5 5 7 7 7 8 8 8 8
```

والمُعامِل الثاني لهذا البرنامج هو علم *الإسهاب* (verbose) الذي يدل على ما إذا كان البرنامج يطبع مخرجات. وهذا خيار مفيد للمصفوفات الأكبر التي قد نريد تشغيل البرنامج عليها من دون بالضرورة طباعة المخرجات.

### جعل countElems متوازية: محاولة أولية

يتألف CountSort من خطوتين رئيسيتين، تستفيد كل منهما من جعلها متوازية. وفي ما تبقى من الفصل، نركّز أساسًا على جعل الخطوة 1، أي الدالة `countElems`، متوازية. وتُترك موازاة الدالة `writeArray` تمرينًا للقارئ.

ويوضح مقطع الشيفرة التالي محاولة أولى لإنشاء دالة `countElems` بخيوط. وقد حُذفت أجزاء من الشيفرة (تحليل الوسائط ومعالجة الأخطاء) في هذا المثال للإيجاز، لكن الشيفرة المصدرية الكاملة يمكن تنزيلها من هنا ([countElems_p.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElems_p.c)). وفي الشيفرة التالية، يحاول كل خيط إحصاء تكرار عناصر المصفوفة في مكوّنه المسند من المصفوفة العامة ويحدّث مصفوفة عدّ عامة بالأعداد المكتشفة:

```c
/*parallel version of step 1 (first cut) of CountSort algorithm:
 * extracts arguments from args value
 * calculates the portion of the array that thread is responsible for counting
 * computes the frequency of all the elements in assigned component and stores
 * the associated counts of each element in counts array
*/
void *countElems( void *args ) {
    struct t_arg * myargs = (struct t_arg *)args;
    //extract arguments (omitted for brevity)
    int *array = myargs->ap;
    long *counts = myargs->countp;
    //... (get nthreads, length, myid)

    //assign work to the thread
    long chunk = length / nthreads; //nominal chunk size
    long start = myid * chunk;
    long end = (myid + 1) * chunk;
    long val;
    if (myid == nthreads-1) {
        end = length;
    }

    long i;
    //heart of the program
    for (i = start; i < end; i++) {
        val = array[i];
        counts[val] = counts[val] + 1;
    }

    return NULL;
}
```

وتبدو الدالة `main` شبه مطابقة لبرامجنا النموذجية السابقة:

```c
int main(int argc, char **argv) {

    if (argc != 4) {
        //print out usage info (ommitted for brevity)
        return 1;
    }

    srand(10); //static seed to assist in correctness check

    //parse command line arguments
    long t;
    long length = strtol(argv[1], NULL, 10);
    int verbose = atoi(argv[2]);
    long nthreads = strtol(argv[3], NULL, 10);

    //generate random array of elements of specified length
    int *array = malloc(length * sizeof(int));
    genRandomArray(array, length);

    //specify counts array and initialize all elements to zero
    long counts[MAX] = {0};

    //allocate threads and args array
    pthread_t *thread_array; //pointer to future thread array
    thread_array = malloc(nthreads * sizeof(pthread_t)); //allocate the array
    struct t_arg *thread_args = malloc( nthreads * sizeof(struct t_arg) );

    //fill thread array with parameters
    for (t = 0; t < nthreads; t++) {
        //ommitted for brevity...
    }

    for (t = 0; t < nthreads; t++) {
        pthread_create(&thread_array[t], NULL, countElems, &thread_args[t]);
    }

    for (t = 0; t < nthreads; t++) {
        pthread_join(thread_array[t], NULL);
    }

    free(thread_array);
    free(array);

    if (verbose) {
        printf("Counts array:\n");
        printCounts(counts);
    }
    return 0;
}
```

ولأغراض قابلية إعادة الإنتاج، تُهيَّأ مولّد الأعداد العشوائية بقيمة ساكنة (10) لضمان احتواء `array` (وبالتالي `counts`) دائمًا المجموعة نفسها من الأعداد. وتطبع دالة إضافية (`printCounts`) محتويات مصفوفة `counts` العامة. والتوقع أن تظل محتويات مصفوفة `counts` هي نفسها دائمًا، أيًا كان عدد الخيوط المستخدم. وللإيجاز، أُزيلت معالجة الأخطاء من القائمة.

وينتج عن تصريف البرنامج وتشغيله بخيط واحد وخيطين وأربعة خيوط على 10 ملايين عنصر ما يلي:

```bash
$ gcc -o countElems_p countElems_p.c -pthread

$./countElems_p 10000000 1 1
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207

$./countElems_p 10000000 1 2
Counts array:
661756 661977 657828 658479 657913 659308 658561 656879 658070 657276

$./countElems_p 10000000 1 4
Counts array:
579846 580814 580122 579772 582509 582713 582518 580917 581963 581094
```

لاحظ أن النتائج المطبوعة تتغير تغيرًا كبيرًا في كل تشغيل. وعلى وجه الخصوص، تبدو متغيرة كلما غيّرنا عدد الخيوط! ولا ينبغي أن يحدث هذا، لأن استخدامنا للبذرة الساكنة يضمن المجموعة نفسها من الأعداد في كل تشغيل. وتناقض هذه النتائج إحدى القواعد الأساسية للبرامج ذات الخيوط: ينبغي أن يكون إخراج البرنامج صحيحًا ومتسقًا *بغض النظر* عن عدد الخيوط المستخدم.

ولأن محاولتنا الأولى لجعل `countElems` متوازية لا تبدو ناجحة، لنغص أعمق في ما يفعله هذا البرنامج ونفحص كيف يمكن إصلاحه.

### حالات سباق البيانات

لفهم ما يجري، لنفكّر في تشغيل نموذجي بخيطين على نواتين منفصلتين في نظام متعدد الأنوية. تذكّر أن تنفيذ أي خيط يمكن أن يُستبق في أي وقت بواسطة نظام التشغيل، ما يعني أن كل خيط قد ينفّذ تعليمات مختلفة من دالة معينة في أي لحظة (أو ربما التعليمة نفسها). ويعرض [الجدول 1](#ExecSequence) مسارًا ممكنًا للتنفيذ عبر دالة `countElems`. ولتوضيح ما يجري توضيحًا أفضل، ترجمنا السطر `counts[val] = counts[val] + 1` إلى التسلسل التالي من التعليمات المكافئة:

1. **اقرأ** `counts[val]` وضعها في سجل.
2. **عدّل** السجل بزيادته بمقدار واحد.
3. **اكتب** محتويات السجل إلى `counts[val]`.

ويُعرف هذا بـ**نمط القراءة-التعديل-الكتابة** (read-modify-write). وفي المثال المعروض في [الجدول 1](#ExecSequence)، ينفّذ كل خيط على نواة منفصلة (الخيط 0 على النواة 0، والخيط 1 على النواة 1). ونبدأ فحص تنفيذ العملية عند الخطوة الزمنية *i*، حيث يكون لدى كلا الخيطين `val` تساوي 1.

| الزمن | الخيط 0 | الخيط 1 |
| --- | --- | --- |
| *i* | اقرأ counts[1] وضعها في سجل النواة 0 | …​ |
| *i+1* | زد السجل بمقدار 1 | اقرأ counts[1] وضعها في سجل النواة 1 |
| *i+2* | اكتب فوق counts[1] محتويات السجل | زد السجل بمقدار 1 |
| *i+3* | …​ | اكتب فوق counts[1] محتويات السجل |

لنفترض أن `counts[1]` كانت تحتوي القيمة 60 قبل تسلسل التنفيذ في [الجدول 1](#ExecSequence). وفي الخطوة الزمنية *i*، يقرأ الخيط 0 القيمة `counts[1]` ويضع القيمة 60 في سجل النواة 0. وفي الخطوة الزمنية *i+1*، بينما يزيد الخيط 0 سجل النواة 0 بمقدار واحد، تُقرأ القيمة *الحالية* في `counts[1]` (وهي 60) إلى سجل النواة 1 بواسطة الخيط 1. وفي الخطوة الزمنية *i+2*، يحدّث الخيط 0 القيمة `counts[1]` إلى 61 بينما يزيد الخيط 1 القيمة المخزَّنة في سجله المحلي (60) بمقدار واحد. والنتيجة النهائية أن القيمة `counts[1]` يُكتب فوقها في الخطوة الزمنية *i+3* بواسطة الخيط 1 بالقيمة 61، لا 62 كما كنا نتوقع! ويؤدي هذا إلى أن `counts[1]` «تفقد» زيادة!

ونشير إلى السيناريو الذي يحاول فيه خيطان الكتابة إلى موقع الذاكرة نفسه بـ**حالة سباق البيانات** (data race). وبصفة أعم، تشير **حالة السباق** (race condition) إلى أي سيناريو يعطي فيه التنفيذ المتزامن لعمليتين نتيجة غير صحيحة. لاحظ أن القراءة المتزامنة لموقع `counts[1]` *لا* تشكّل في حد ذاتها حالة سباق، لأن القيم يمكن قراءتها عمومًا من الذاكرة وحدها من دون مشكلة. وقد كان الجمع بين هذه الخطوة والكتابات في `counts[1]` هو ما سبب النتيجة غير الصحيحة. ونمط القراءة-التعديل-الكتابة هذا مصدر شائع لنوع معين من حالات السباق يُسمى **حالة سباق البيانات** في معظم البرامج ذات الخيوط. وفي مناقشتنا لحالات السباق وكيفية إصلاحها، نركّز على حالات سباق البيانات.

**ملاحظة — العمليات الذرية**

> تُعرَّف العملية بأنها **ذرية** (atomic) إذا رأى خيط أنها تنفّذ من دون انقطاع (وبعبارة أخرى، كإجراء «كل شيء أو لا شيء»). وفي بعض المكتبات، تُستخدم كلمة مفتاحية أو نوع لتحديد أن كتلة حساب يجب أن تُعامل كذرية. وفي المثال السابق، السطر `counts[val] = counts[val] + 1` (حتى لو كُتب بالشكل `counts[val]++`) *ليس* ذريًا، لأن هذا السطر يقابل فعلًا عدة تعليمات على مستوى الآلة. ويلزم بنية تزامن مثل الاستبعاد المتبادل لضمان عدم وجود حالات سباق بيانات. وبصفة عامة، ينبغي افتراض أن جميع العمليات غير ذرية إلا إذا فُرض الاستبعاد المتبادل صراحةً.

تذكّر أن ليس كل تسلسلات تنفيذ الخيطين تسبب حالة سباق. فكّر في تسلسل التنفيذ النموذجي للخيطين 0 و1 في [الجدول 2](#NoRaceExec).

| الزمن | الخيط 0 | الخيط 1 |
| --- | --- | --- |
| *i* | اقرأ counts[1] وضعها في سجل النواة 0 | …​ |
| *i+1* | زد السجل بمقدار 1 | …​ |
| *i+2* | اكتب فوق counts[1] محتويات السجل | …​ |
| *i+3* | …​ | اقرأ counts[1] وضعها في سجل النواة 1 |
| *i+4* | …​ | زد السجل بمقدار 1 |
| *i+5* | …​ | اكتب فوق counts[1] محتويات السجل |

في تسلسل التنفيذ هذا، لا يقرأ الخيط 1 من `counts[1]` إلا بعد أن يحدّثها الخيط 0 بقيمته الجديدة (61). والنتيجة النهائية أن الخيط 1 يقرأ القيمة 61 من `counts[1]` ويضعها في سجل النواة 1 خلال الخطوة الزمنية *i+3*، ويكتب القيمة 62 إلى `counts[1]` في الخطوة الزمنية *i+5*.

ولإصلاح حالة سباق بيانات، يجب أولًا عزل **القسم الحرج** (critical section)، أي المجموعة الجزئية من الشيفرة التي يجب أن تنفّذ **ذرّيًا** (بمعزل) لضمان سلوك صحيح. وفي البرامج ذات الخيوط، تُحدَّد عادةً كتل الشيفرة التي تحدّث موردًا مشتركًا كأقسام حرجة.

وفي الدالة `countElems`، ينبغي وضع تحديثات مصفوفة `counts` في قسم حرج لضمان عدم فقدان قيم بسبب تحديث خيوط متعددة الموقع نفسه في الذاكرة:

```c
long i;
for (i = start; i < end; i++) {
    val = array[i];
    counts[val] = counts[val] + 1; //this line needs to be protected
}
```

ولأن المشكلة الجوهرية في `countElems` هي الوصول المتزامن إلى `counts` من خيوط متعددة، تلزم آلية تضمن ألا ينفّذ داخل القسم الحرج إلا خيط واحد في المرة. واستخدام بنية تزامن (مثل قفل التبادل المتبادل الذي يُغطّى في القسم التالي) سيجبر الخيوط على دخول القسم الحرج تتابعيًا.

*ما هو قفل التبادل المتبادل؟ الجواب هناك في الخارج، وهو يبحث عنك، وسيجدك إن أردت ذلك.*

~Trinity وهي تشرح أقفال التبادل المتبادل لـ Neo (مع الاعتذار إلى *The Matrix*)

ولإصلاح حالة سباق البيانات، لنستخدم بنية تزامن تُعرف بقفل الاستبعاد المتبادل، أو **قفل التبادل المتبادل** (mutex). وأقفال التبادل المتبادل نوع من عناصر التزامن الأولية تضمن ألا يدخل وينفّذ الشيفرة داخل القسم الحرج إلا خيط واحد في أي لحظة.

وقبل استخدام قفل التبادل المتبادل، يجب على البرنامج أولًا:

1. تعريف القفل في ذاكرة تتشاركها الخيوط (غالبًا كمتغير عام).
2. تهيئة القفل قبل أن تحتاج الخيوط إلى استخدامه (عادةً في الدالة `main`).

وتعرّف مكتبة Pthreads نوع `pthread_mutex_t` لأقفال التبادل المتبادل. ولتعريف متغير قفل، أضف هذا السطر:

```c
pthread_mutex_t mutex;
```

وتهيئة القفل باستخدام الدالة `pthread_mutex_init` التي تأخذ عنوان قفل وبنية سمات تُضبط عادةً على `NULL`:

```c
pthread_mutex_init(&mutex, NULL);
```

وعندما لا تعود الحاجة إلى القفل (عادةً في نهاية الدالة `main` بعد `pthread_join`)، ينبغي للبرنامج تحرير بنية القفل باستدعاء الدالة `pthread_mutex_destroy`:

```c
pthread_mutex_destroy(&mutex);
```

#### قفل التبادل المتبادل: مقفل وجاهز

الحالة الأولية لقفل التبادل المتبادل غير مقفلة، أي أنه قابل للاستخدام فورًا من أي خيط. ولدخول قسم حرج، يجب على الخيط أولًا حيازة القفل. ويتحقق ذلك باستدعاء الدالة `pthread_mutex_lock`. وبعد أن يحوز الخيط القفل، لا يستطيع أي خيط آخر دخول القسم الحرج حتى يحرّره الخيط الحائز للقفل. وإذا استدعى خيط آخر `pthread_mutex_lock` وكان القفل مقفلًا بالفعل، فسيُحجب الخيط (أو ينتظر) حتى يصبح القفل متاحًا. تذكّر أن [*الحجب* يعني أن الخيط لن يُجدول](https://diveintosystems.org/book/C13-OS/processes.html#_process_state) لاستخدام المعالج حتى يتحقق الشرط الذي ينتظره (أي توافر القفل).

وعند خروج الخيط من القسم الحرج، يجب أن يستدعي الدالة `pthread_mutex_unlock` لتحرير القفل وجعله متاحًا لخيط آخر. وبذلك يمكن لخيط واحد على الأكثر حيازة القفل ودخول القسم الحرج في المرة، ما يمنع خيوطًا متعددة من *التسابق* لقراءة المتغيرات المشتركة وتحديثها.

وبعد تعريف قفل وتهيئته، يصبح السؤال التالي أين ينبغي وضع دالتي القفل وفتح القفل لفرض القسم الحرج فرضًا أفضل. وإليك محاولة أولية لتعزيز الدالة `countElems` بقفل تبادل متبادل (يمكن تنزيل الشيفرة الكاملة من [countElems_p_v2.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElems_p_v2.c)):

```c
pthread_mutex_t mutex; //global declaration of mutex, initialized in main()

/*parallel version of step 1 of CountSort algorithm (attempt 1 with mutexes):
 * extracts arguments from args value
 * calculates component of the array that thread is responsible for counting
 * computes the frequency of all the elements in assigned component and stores
 * the associated counts of each element in counts array
*/
void *countElems( void *args ) {
    //extract arguments
    //ommitted for brevity
    int *array = myargs->ap;
    long *counts = myargs->countp;

    //assign work to the thread
    long chunk = length / nthreads; //nominal chunk size
    long start = myid * chunk;
    long end = (myid + 1) * chunk;
    long val;
    if (myid == nthreads - 1) {
        end = length;
    }
    long i;

    //heart of the program
    pthread_mutex_lock(&mutex); //acquire the mutex lock
    for (i = start; i < end; i++) {
        val = array[i];
        counts[val] = counts[val] + 1;
    }
    pthread_mutex_unlock(&mutex); //release the mutex lock

    return NULL;
}
```

وتُوضع دالتا تهيئة القفل وتدميره في `main` حول دالتي إنشاء الخيوط وضمّها:

```c
//code snippet from main():

pthread_mutex_init(&mutex, NULL); //initialize the mutex

for (t = 0; t < nthreads; t++) {
    pthread_create( &thread_array[t], NULL, countElems, &thread_args[t] );
}

for (t = 0; t < nthreads; t++) {
    pthread_join(thread_array[t], NULL);
}
pthread_mutex_destroy(&mutex); //destroy (free) the mutex
```

لنعد تصريف هذا البرنامج الجديد ونشغّله مع تغيير عدد الخيوط:

```bash
$ ./countElems_p_v2 10000000 1 1
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207

$ ./countElems_p_v2 10000000 1 2
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207

$ ./countElems_p_v2 10000000 1 4
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207
```

ممتاز، صارت المخرجات *أخيرًا* متسقة بغض النظر عن عدد الخيوط المستخدم!

تذكّر أن من الأهداف الرئيسية الأخرى لتعدد الخيوط تقليل زمن تشغيل البرنامج كلما زاد عدد الخيوط (وبعبارة أخرى، *تسريع* تنفيذ البرنامج). لنقِس أداء الدالة `countElems`. ومع أن استخدام أداة سطر أوامر مثل `time -p` قد يغريك، تذكّر أن استدعاء `time -p` يقيس الزمن الحائطي للبرنامج *كله* (بما في ذلك توليد العناصر العشوائية) *لا* تشغيل الدالة `countElems` وحدها. وفي هذه الحالة، الأفضل استخدام نداء نظام مثل `gettimeofday` يتيح للمستخدم قياس الزمن الحائطي لقسم معين من الشيفرة قياسًا دقيقًا. وينتج عن قياس `countElems` على 100 مليون عنصر أزمنة التشغيل التالية:

```bash
$ ./countElems_p_v2 100000000 0 1
Time for Step 1 is 0.368126 s

$ ./countElems_p_v2 100000000 0 2
Time for Step 1 is 0.438357 s

$ ./countElems_p_v2 100000000 0 4
Time for Step 1 is 0.519913 s
```

إضافة مزيد من الخيوط تجعل البرنامج *أبطأ*! وهذا يناقض هدف جعل البرامج *أسرع* بالخيوط.

ولفهم ما يجري، فكّر في مكان وضع الأقفال في الدالة `countsElems`:

```c
//code snippet from the countElems function from earlier
//the heart of the program
pthread_mutex_lock(&mutex); //acquire the mutex lock
for (i = start; i < end; i++){
    val = array[i];
    counts[val] = counts[val] + 1;
}
pthread_mutex_unlock(&mutex); //release the mutex lock
```

في هذا المثال، وضعنا القفل حول حلقة `for` *بالكامل*. ومع أن هذا الوضع يحل مشكلات الصحة، فهو قرار بالغ السوء من منظور الأداء — فالقسم الحرج يشمل الآن جسم الحلقة كله. ووضع الأقفال بهذه الطريقة يضمن ألا ينفّذ الحلقة إلا خيط واحد في المرة، ما يجعل البرنامج تتابعيًا فعليًا!

#### قفل التبادل المتبادل: النسخة المحمَّلة

لنجرّب مقاربة أخرى ونضع دالتي قفل القفل وفتحه داخل كل تكرار من تكرارات الحلقة:

```c
/*modified code snippet of countElems function:
 *locks are now placed INSIDE the for loop!
*/
//the heart of the program
for (i = start; i < end; i++) {
    val = array[i];
    pthread_mutex_lock(&m); //acquire the mutex lock
    counts[val] = counts[val] + 1;
    pthread_mutex_unlock(&m); //release the mutex lock
}
```

قد يبدو هذا في البداية حلًا أفضل لأن كل خيط يستطيع دخول الحلقة على التوازي، ولا يتسلسل إلا عند وصوله إلى القفل. والقسم الحرج صغير جدًا، إذ يشمل السطر `counts[val] = counts[val] + 1` فقط.

لنجرِ أولًا فحص صحة على هذه النسخة من البرنامج:

```bash
$ ./countElems_p_v3 10000000 1 1
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207

$ ./countElems_p_v3 10000000 1 2
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207

$ ./countElems_p_v3 10000000 1 4
Counts array:
999170 1001044 999908 1000431 999998 1001479 999709 997250 1000804 1000207
```

حتى الآن، كل شيء جيد. وتنتج هذه النسخة من البرنامج أيضًا مخرجات متسقة بغض النظر عن عدد الخيوط المستخدمة.

والآن، لننظر إلى الأداء:

```bash
$ ./countElems_p_v3 100000000 0 1
Time for Step 1 is 1.92225 s

$ ./countElems_p_v3 100000000 0 2
Time for Step 1 is 10.9704 s

$ ./countElems_p_v3 100000000 0 4
Time for Step 1 is 9.13662 s
```

وينتج عن تشغيل هذه النسخة من الشيفرة (والمثير للعجب) زمن تشغيل *أبطأ بدرجة كبيرة*!

وتبيّن أن قفل قفل التبادل المتبادل وفتحه عمليتان مكلفتان. تذكّر ما غُطّي في مناقشة [تحسينات نداء الدوال](https://diveintosystems.org/book/C12-CodeOpt/loops_functions.html#_function_inlining): استدعاء دالة بتكرار (وبلا داعٍ) في حلقة يمكن أن يكون سببًا رئيسيًا لإبطاء البرنامج. وفي استخدامنا السابق لأقفال التبادل المتبادل، كان كل خيط يقفل القفل ويفتحه مرة واحدة بالضبط. وفي الحل الحالي، يقفل كل خيط القفل ويفتحه *n/t* مرة، حيث *n* حجم المصفوفة و*t* عدد الخيوط و*n/t* حجم مكوّن المصفوفة المسند إلى كل خيط بعينه. ونتيجة لذلك، تؤدي كلفة عمليات القفل الإضافية إلى إبطاء تنفيذ الحلقة بدرجة كبيرة.

#### قفل التبادل المتبادل: إعادة النظر

إضافةً إلى حماية القسم الحرج لتحقيق سلوك صحيح، سيستخدم الحل المثالي دالتي القفل وفتح القفل بأقل قدر ممكن، ويقلل القسم الحرج إلى أصغر حجم ممكن.

يحقق التطبيق الأصلي الشرط الأول، بينما يحاول التطبيق الثاني إنجاز الثاني. وللوهلة الأولى، يبدو الشرطان غير متوافقين. فهل من طريقة لإنجاز كليهما فعلًا (وبينما نفعل ذلك، تسريع تنفيذ برنامجنا)؟

في المحاولة التالية، يحتفظ كل خيط بمصفوفة عدّ خاصة *محلية* على مكدّسه. ولأن المصفوفة محلية لكل خيط، يستطيع الخيط الوصول إليها من دون قفل — فلا خطر لحدوث حالة سباق على بيانات غير مشتركة بين الخيوط. ويعالج كل خيط مجموعته الجزئية المسندة من المصفوفة المشتركة ويملأ مصفوفة عدّه المحلية. وبعد إحصاء جميع القيم ضمن مجموعته الجزئية، يقوم كل خيط بما يلي:

1. يقفل القفل المشترك (دخول قسم حرج).
2. يضيف القيم من مصفوفة عدّه المحلية إلى مصفوفة العدّ المشتركة.
3. يفتح القفل المشترك (خروج من القسم الحرج).

وتقييد كل خيط بتحديث مصفوفة العدّ المشتركة مرة واحدة فقط يقلل بدرجة كبيرة تنافس المتغيرات المشتركة ويقلل عمليات القفل المكلفة.

وفيما يلي دالتنا المعدّلة `countElems`. ويمكن الوصول إلى الشيفرة المصدرية الكاملة لهذا البرنامج النهائي في ([countElems_p_v3.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElems_p_v3.c)):

```c
/*parallel version of step 1 of CountSort algorithm (final attempt w/mutexes):
 * extracts arguments from args value
 * calculates component of the array that thread is responsible for counting
 * computes the frequency of all the elements in assigned component and stores
 * the associated counts of each element in counts array
*/
void *countElems( void *args ) {
    //extract arguments
    //ommitted for brevity
    int *array = myargs->ap;
    long *counts = myargs->countp;

    //local declaration of counts array, initializes every element to zero.
    long local_counts[MAX] = {0};

    //assign work to the thread
    long chunk = length / nthreads; //nominal chunk size
    long start = myid * chunk;
    long end = (myid + 1) * chunk;
    long val;
    if (myid == nthreads-1)
        end = length;

    long i;

    //heart of the program
    for (i = start; i < end; i++) {
        val = array[i];

        //updates local counts array
        local_counts[val] = local_counts[val] + 1;
    }

    //update to global counts array
    pthread_mutex_lock(&mutex); //acquire the mutex lock
    for (i = 0; i < MAX; i++) {
        counts[i] += local_counts[i];
    }
    pthread_mutex_unlock(&mutex); //release the mutex lock

    return NULL;
}
```

ولهذه النسخة سمات إضافية قليلة:

- وجود `local_counts`، وهي مصفوفة خاصة بنطاق كل خيط (أي مخصصة على مكدّس الخيط). ومثل `counts`، تحتوي `local_counts` عناصر `MAX`، حيث `MAX` أقصى قيمة يمكن أن يحملها أي عنصر في مصفوفة إدخالنا.
- يجري كل خيط تحديثات على `local_counts` بوتيرته الخاصة، من دون أي تنافس على متغيرات مشتركة.
- نداء واحد إلى `pthread_mutex_lock` يحمي تحديث كل خيط للمصفوفة العامة `counts`، وهو تحديث يحدث مرة واحدة فقط في نهاية تنفيذ كل خيط.

وبهذه الطريقة، نقلل الوقت الذي يقضيه كل خيط في قسم حرج إلى تحديث مصفوفة العدّ المشتركة فقط. ومع أنه لا يستطيع دخول القسم الحرج إلا خيط واحد في المرة، فالوقت الذي يقضيه كل خيط فيه يتناسب مع `MAX` لا مع *n*، طول المصفوفة العامة. ولأن `MAX` أصغر بكثير من *n*، ينبغي أن نرى تحسنًا في الأداء.

لنقِس الآن أداء هذه النسخة من شيفرتنا:

```bash
$ ./countElems_p_v3 100000000 0 1
Time for Step 1 is 0.334574 s

$ ./countElems_p_v3 100000000 0 2
Time for Step 1 is 0.209347 s

$ ./countElems_p_v3 100000000 0 4
Time for Step 1 is 0.130745 s
```

يا للفرق! فبرنامجنا لا يحسب الإجابات الصحيحة فحسب، بل ينفّذ أيضًا أسرع كلما زدنا عدد الخيوط.

والدرس المستفاد هنا هو: لتقليل القسم الحرج بفعالية، استخدم متغيرات محلية لتجميع القيم الوسيطة. وبعد انتهاء العمل الشاق الذي يتطلب التوازي، استخدم قفل تبادل متبادل لتحديث أي متغير (متغيرات) مشتركة بأمان.

#### التجمّد

في بعض البرامج، تعتمد الخيوط المنتظرة على بعضها. وقد تنشأ حالة تُسمى **التجمّد** (deadlock) عند تطبيق عناصر تزامن متعددة مثل أقفال التبادل المتبادل تطبيقًا خاطئًا. فخيط المتجمّد يُحجب عن التنفيذ بواسطة خيط آخر *محجوب هو نفسه* على خيط محجوب. والازدحام التام (الذي لا تستطيع فيه السيارات من جميع الاتجاهات التقدم بسبب انسدادها بسيارات أخرى) مثال واقعي شائع على التجمّد يحدث عند تقاطعات المدن المزدحمة.

ولتوضيح سيناريو تجمّد في الشيفرة، لنفكّر في مثال يُستخدم فيه تعدد الخيوط لتنفيذ تطبيق مصرفي. وتُعرَّف كل حساب مستخدم برصيد وقفل تبادل متبادل خاص به (يضمن عدم حدوث حالات سباق عند تحديث الرصيد):

```c
struct account {
    pthread_mutex_t lock;
    int balance;
};
```

لنفكّر في التطبيق الساذج التالي لدالة `Transfer` التي تنقل مالًا من حساب مصرفي إلى آخر:

```c
void *Transfer(void *args){
    //argument passing removed to increase readability
    //...

    pthread_mutex_lock(&fromAcct->lock);
    pthread_mutex_lock(&toAcct->lock);

    fromAcct->balance -= amt;
    toAcct->balance += amt;

    pthread_mutex_unlock(&fromAcct->lock);
    pthread_mutex_unlock(&toAcct->lock);

    return NULL;
}
```

لنفترض أن الخيطين 0 و1 ينفّذان بالتزامن ويمثلان المستخدمين A وB على الترتيب. ولنفكّر الآن في الوضع الذي يريد فيه A وB تحويل مال أحدهما للآخر: يريد A تحويل 20 دولارًا إلى B، بينما يريد B تحويل 40 إلى A.

وفي مسار التنفيذ المميز في [الشكل 1](#deadlockFig)، ينفّذ الخيطان بالتزامن الدالة `Transfer`. فيحوز الخيط 0 قفل `acctA` بينما يحوز الخيط 1 قفل `acctB`. والآن فكّر في ما يحدث. لمواصلة التنفيذ، يحتاج الخيط 0 إلى حيازة قفل `acctB` الذي يحوزه الخيط 1. وبالمثل، يحتاج الخيط 1 إلى حيازة قفل `acctA` لمواصلة التنفيذ، وهو محجوز للخيط 0. ولأن كلا الخيطين محجوبان على الآخر، فهما في تجمّد.

![Two threads deadlocked with each other](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-0-deadlock.webp) Figure 1. An example of deadlock

ومع أن نظام التشغيل يوفّر بعض الحماية من التجمّد، ينبغي للمبرمجين الانتباه إلى كتابة شيفرة تزيد احتمال التجمّد. فمثلًا، كان يمكن تجنّب السيناريو السابق بإعادة ترتيب الأقفال بحيث يحيط كل زوج قفل/فتح قفل بعبارة تحديث الرصيد المرتبطة به فقط:

```c
void *Transfer(void *args){
    //argument passing removed to increase readability
    //...

    pthread_mutex_lock(&fromAcct->lock);
    fromAcct->balance -= amt;
    pthread_mutex_unlock(&fromAcct->lock);

    pthread_mutex_lock(&toAcct->lock);
    toAcct->balance += amt;
    pthread_mutex_unlock(&toAcct->lock);

    return NULL;
}
```

والتجمّد ليس حالة خاصة بالخيوط. فالعمليات (خصوصًا تلك التي تتواصل مع بعضها) يمكن أن تتجمد مع بعضها. وينبغي للمبرمجين الانتباه إلى عناصر التزامن الأولية التي يستخدمونها وعواقب استخدامها استخدامًا خاطئًا.

تُستخدم السيمافورات عادةً في أنظمة التشغيل والبرامج المتزامنة التي يكون الهدف فيها إدارة الوصول المتزامن إلى مجموعة موارد. وعند استخدام سيمافور، ليس الهدف *من* يملك ماذا، بل *كم* من الموارد لا يزال متاحًا. وتختلف السيمافورات عن أقفال التبادل المتبادل في عدة أوجه:

- لا يلزم أن تكون السيمافورات في حالة ثنائية (مقفلة أو غير مقفلة). فنوع خاص من السيمافورات يُسمى *سيمافور العدّ* يمكن أن تتراوح قيمته من 0 إلى عدد ما *r*، حيث *r* عدد الموارد الممكنة. وكلما أُنتج مورد، يزداد السيمافور. وكلما استُخدم مورد، ينقص السيمافور. وعندما تكون قيمة سيمافور العدّ 0، فهذا يعني عدم توافر أي موارد، ويجب على أي خيوط أخرى تحاول حيازة مورد أن تنتظر (أي تُحجب).
- يمكن أن تكون السيمافورات مقفلة افتراضيًا.

ومع أن قفل التبادل المتبادل ومتغيرات الشرط يمكنهما محاكاة وظيفة السيمافور، فقد يكون استخدام سيمافور أبسط وأكفأ في بعض الحالات. وللسيمافورات أيضًا ميزة أن *أي* خيط يمكنه فتح السيمافور (خلافًا لقفل التبادل المتبادل حيث يجب أن يفتحه الخيط المستدعي).

والسيمافورات ليست جزءًا من مكتبة Pthreads، لكن هذا لا يعني أنه لا يمكنك استخدامها. وفي أنظمة Linux وmacOS، يمكن الوصول إلى عناصر السيمافور الأولية من `semaphore.h` الموجود عادةً في `/usr/include`. ولأنه لا يوجد معيار، قد تختلف نداءات الدوال على أنظمة مختلفة. ومع ذلك، فللمكتبة السيمافور تصريحات مشابهة لتصريحات أقفال التبادل المتبادل:

- عرّف سيمافورًا (النوع `sem_t`، مثل `sem_t semaphore`).
- هيّئ سيمافورًا باستخدام `sem_init` (عادةً في `main`). وللدالة `sem_init` ثلاثة مُعامِلات: الأول عنوان سيمافور، والثاني حالته الأولية (مقفل أو غير مقفل)، والمُعامِل الثالث يدل على ما إذا كان ينبغي تشارك السيمافور مع خيوط عملية (مثلًا بالقيمة 0) أو بين العمليات (مثلًا بالقيمة 1). وهذا مفيد لأن السيمافورات تُستخدم عادةً لتزامن العمليات. فمثلًا، تهيئة سيمافور بالنداء `sem_init(&semaphore, 1, 0)` تدل على أن سيمافورنا مقفل ابتدائيًا (المُعامِل الثاني هو 1)، وأنه سيُتشارك بين خيوط عملية مشتركة (المُعامِل الثالث هو 0). وفي المقابل، تبدأ أقفال التبادل المتبادل دائمًا غير مقفلة. ومن المهم ملاحظة أن الدالة المكافئة في macOS هي `sem_open`.
- دمّر سيمافورًا باستخدام `sem_destroy` (عادةً في `main`). وتأخذ هذه الدالة مؤشرًا إلى السيمافور فقط (`sem_destroy(&semaphore)`). لاحظ أن الدالة المكافئة في macOS قد تكون `sem_unlink` أو `sem_close`.
- تدل الدالة `sem_wait` على أن موردًا قيد الاستخدام، وتنقص السيمافور. وإذا كانت قيمة السيمافور أكبر من 0 (دلالةً على توافر موارد)، تعود الدالة فورًا ويُسمح للخيط بالمتابعة. وإذا كانت قيمة السيمافور 0 بالفعل، يُحجب الخيط حتى يتوافر مورد (أي تصبح للسيمافور قيمة موجبة). ويبدو نداء `sem_wait` عادةً بالشكل `sem_wait(&semaphore)`.
- تدل الدالة `sem_post` على تحرير مورد، وتزيد السيمافور. وتعود هذه الدالة فورًا. وإذا كان هناك خيط منتظر على السيمافور (أي كانت قيمة السيمافور 0 سابقًا)، فسيأخذ الخيط الآخر ملكية المورد المحرَّر. ويبدو نداء `sem_post` بالشكل `sem_post(&semaphore)`.

وأقفال التبادل المتبادل والسيمافورات ليست المثال الوحيد على عناصر التزامن التي يمكن استخدامها في سياق البرامج متعددة الخيوط. وفي هذا القسم الفرعي سنناقش بإيجاز عنصرَي التزامن الحاجز ومتغير الشرط، وكلاهما جزء من مكتبة Pthreads.

#### الحواجز {#_barriers}

**الحاجز** (barrier) نوع من عناصر التزامن يجبر *جميع* الخيوط على الوصول إلى نقطة مشتركة في التنفيذ قبل إطلاق الخيوط لمتابعة التنفيذ بالتزامن. وتوفّر Pthreads عنصر تزامن أولي للحاجز. ولاستخدام حواجز Pthreads، يلزم فعل ما يلي:

- تعريف متغير حاجز عام (مثل `pthread_barrier_t barrier`)
- تهيئة الحاجز في `main` (`pthread_barrier_init(&barrier)`)
- تدمير الحاجز في `main` بعد الاستخدام (`pthread_barrier_destroy(&barrier)`)
- استخدام الدالة `pthread_barrier_wait` لإنشاء نقطة تزامن.

ويعرض البرنامج التالي استخدام حاجز في دالة تُسمى `threadEx`:

```c
void *threadEx(void *args){
    //parse args
    //...
    long myid = myargs->id;
    int nthreads = myargs->numthreads;
    int *array = myargs->array

    printf("Thread %ld starting thread work!\n", myid);
    pthread_barrier_wait(&barrier); //forced synchronization point
    printf("All threads have reached the barrier!\n");
    for (i = start; i < end; i++) {
        array[i] = array[i] * 2;
    }
    printf("Thread %ld done with work!\n", myid);

    return NULL;
}
```

في هذا المثال، لا يستطيع أي خيط بدء معالجة جزئه المسند من المصفوفة حتى *يُطبع* في *كل* خيط الرسالة الدالة على بدء العمل. ومن دون الحاجز، من الممكن أن يكون خيط قد أنهى عمله قبل أن تطبع الخيوط الأخرى رسالتها عن بدء العمل! لاحظ أنه *ما زال* ممكنًا أن يطبع خيط رسالة انتهائه من العمل قبل أن ينتهي خيط آخر.

#### متغيرات الشرط {#_condition_variables}

تجبر متغيرات الشرط خيطًا على الحجب حتى بلوغ شرط معين. ويفيد هذا العنصر في السيناريوهات التي يجب فيها بلوغ شرط قبل أن يؤدّي الخيط عملًا ما. وفي غياب متغيرات الشرط، سيتعين على الخيط فحص بلوغ الشرط مرارًا بتكرار، مستهلكًا المعالج باستمرار. وتُستخدم متغيرات الشرط دائمًا مقترنة بقفل تبادل متبادل. وفي هذا النوع من عناصر التزامن، يفرض القفل الاستبعاد المتبادل، بينما يضمن متغير الشرط بلوغ شروط معينة قبل أن يحوز الخيط القفل.

لمتغيرات الشرط في POSIX النوع `pthread_cond_t`. وكما في عنصرَي القفل والحاجز، يجب تهيئة متغيرات الشرط قبل استخدامها وتدميرها بعده.

ولتهيئة متغير شرط، استخدم الدالة `pthread_cond_init`. ولتدمير متغير شرط، استخدم الدالة `pthread_cond_destroy`.

والدالتان الشائع استدعاؤهما عند استخدام متغيرات الشرط هما `pthread_cond_wait` و`pthread_cond_signal`. وتحتاج كلتا الدالتين عنوان قفل تبادل متبادل إضافةً إلى عنوان متغير الشرط:

- تأخذ الدالة `pthread_cond_wait(&cond, &mutex)` عنواني متغير شرط `cond` وقفل `mutex` كمُعامِلَيها. وتسبب حجب الخيط المستدعي على متغير الشرط `cond` حتى يشير إليه خيط آخر (أو «يوقظه»).
- تسبب الدالة `pthread_cond_signal(&cond)` إلغاء حجب (أو إشعار) خيط آخر منتظر على متغير الشرط `cond` (بحسب أولوية الجدولة). وإذا لم تكن هناك خيوط محجوبة حاليًا على الشرط، فلا أثر للدالة. وخلافًا لـ `pthread_cond_wait`، يمكن استدعاء الدالة `pthread_cond_signal` من خيط سواء كان يملك القفل الذي يُستدعى فيه `pthread_cond_wait` أم لا.

#### مثال على متغير الشرط

تقليديًا، تكون متغيرات الشرط أكثر فائدة عندما تنتظر مجموعة جزئية من الخيوط مجموعة أخرى لإكمال إجراء ما. وفي المثال التالي، نستخدم خيوطًا متعددة لمحاكاة مجموعة مزارعين يجمعون البيض من مجموعة دجاجات. ويمثّل «Chicken» و«Farmer» صنفين منفصلين من الخيوط. ويمكن تنزيل الشيفرة الكاملة لهذا البرنامج ([layeggs.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/layeggs.c)). لاحظ أن القائمة تستبعد كثيرًا من التعليقات ومعالجة الأخطاء للإيجاز.

تنشئ الدالة `main` متغيرًا مشتركًا `num_eggs` (يدل على العدد الإجمالي للبيض المتاح في أي لحظة)، و`mutex` مشتركًا (يُستخدم كلما وصل خيط إلى `num_eggs`)، ومتغير شرط مشتركًا `eggs`. ثم تنشئ خيطَي Chicken وخيطَي Farmer:

```c
int main(int argc, char **argv){
    //... declarations omitted for brevity

    // these will be shared by all threads via pointer fields in t_args
    int num_eggs;           // number of eggs ready to collect
    pthread_mutex_t mutex;  // mutex associated with cond variable
    pthread_cond_t  eggs;   // used to block/wake-up farmer waiting for eggs

    //... args parsing removed for brevity

    num_eggs = 0; // number of eggs ready to collect
    ret = pthread_mutex_init(&mutex, NULL); //initialize the mutex
    pthread_cond_init(&eggs, NULL); //initialize the condition variable

    //... thread_array and thread_args creation/filling omitted for brevity

    // create some chicken and farmer threads
    for (i = 0; i < (2 * nthreads); i++) {
        if ( (i % 2) == 0 ) {
            ret = pthread_create(&thread_array[i], NULL,
                                 chicken, &thread_args[i]);
        }
        else {
            ret = pthread_create(&thread_array[i], NULL,
                                 farmer, &thread_args[i] );
        }
    }

    // wait for chicken and farmer threads to exit
    for (i = 0; i < (2 * nthreads); i++)  {
        ret = pthread_join(thread_array[i], NULL);
    }

    // clean-up program state
    pthread_mutex_destroy(&mutex); //destroy the mutex
    pthread_cond_destroy(&eggs);   //destroy the cond var

    return 0;
}
```

وكل خيط Chicken مسؤول عن وضع عدد معين من البيض:

```c
void *chicken(void *args ) {
    struct t_arg *myargs = (struct t_arg *)args;
    int *num_eggs, i, num;

    num_eggs = myargs->num_eggs;
    i = 0;

    // lay some eggs
    for (i = 0; i < myargs->total_eggs; i++) {
        usleep(EGGTIME); //chicken sleeps

        pthread_mutex_lock(myargs->mutex);
        *num_eggs = *num_eggs + 1;  // update number of eggs
        num = *num_eggs;
        pthread_cond_signal(myargs->eggs); // wake a sleeping farmer (squawk)
        pthread_mutex_unlock(myargs->mutex);

        printf("chicken %d created egg %d available %d\n",myargs->id,i,num);
    }
    return NULL;
}
```

لوضع بيضة، ينام خيط Chicken مدة، ثم يحوز القفل ويحدّث العدد الإجمالي للبيض المتاح بواحد. وقبل تحرير القفل، «يوقظ» خيط Chicken مزارعًا نائمًا (بصياحه على الأرجح). ويكرر خيط Chicken الدورة حتى يضع كل البيض الذي يعتزم وضعه (`total_eggs`).

وكل خيط Farmer مسؤول عن جمع `total_eggs` بيضة من مجموعة الدجاجات (لإفطاره على الأرجح):

```c
void *farmer(void *args ) {
    struct t_arg * myargs = (struct t_arg *)args;
    int *num_eggs, i, num;

    num_eggs = myargs->num_eggs;

    i = 0;

    for (i = 0; i < myargs->total_eggs; i++) {
        pthread_mutex_lock(myargs->mutex);
        while (*num_eggs == 0 ) { // no eggs to collect
            // wait for a chicken to lay an egg
            pthread_cond_wait(myargs->eggs, myargs->mutex);
        }

        // we hold mutex lock here and num_eggs > 0
        num = *num_eggs;
        *num_eggs = *num_eggs - 1;
        pthread_mutex_unlock(myargs->mutex);

        printf("farmer %d gathered egg %d available %d\n",myargs->id,i,num);
    }
    return NULL;
}
```

يحوز كل خيط Farmer القفل قبل فحص المتغير المشترك `num_eggs` لمعرفة ما إذا كان هناك بيض متاح (`*num_eggs == 0`). وما دام لا يوجد بيض متاح، يُحجب خيط Farmer (أي يأخذ قسطًا من النوم).

وبعد أن «يستيقظ» خيط Farmer بسبب إشارة من خيط Chicken، يتحقق من أن بيضة لا تزال متاحة (فقد يلتقطها مزارع آخر أولًا)، وإن كان الأمر كذلك «يجمع» المزارع بيضة (منقصًا `num_eggs` بواحد) ويحرر القفل.

وبهذه الطريقة، يعمل Chicken وFarmer معًا لوضع/جمع البيض. وتضمن متغيرات الشرط ألا يجمع أي خيط Farmer بيضة حتى تضعها دجاجة.

#### البث {#_broadcasting}

من الدوال الأخرى المستخدمة مع متغيرات الشرط `pthread_cond_broadcast`، وهي مفيدة عندما تكون خيوط متعددة محجوبة على شرط معين. ويؤدي استدعاء `pthread_cond_broadcast(&cond)` إلى إيقاظ *جميع* الخيوط المحجوبة على الشرط `cond`. وفي المثال التالي، نوضح كيف يمكن لمتغيرات الشرط تنفيذ عنصر الحاجز المناقش سابقًا:

```c
// mutex (initialized in main)
pthread_mutex_t mutex;

// condition variable signifying the barrier (initialized in main)
pthread_cond_t barrier;

void *threadEx_v2(void *args){
    // parse args
    // ...

    long myid = myargs->id;
    int nthreads = myargs->numthreads;
    int *array = myargs->array

    // counter denoting the number of threads that reached the barrier
    int *n_reached = myargs->n_reached;

    // start barrier code
    pthread_mutex_lock(&mutex);
    *n_reached++;

    printf("Thread %ld starting work!\n", myid)

    // if some threads have not reached the barrier
    while (*n_reached < nthreads) {
        pthread_cond_wait(&barrier, &mutex);
    }
    // all threads have reached the barrier
    printf("all threads have reached the barrier!\n");
    pthread_cond_broadcast(&barrier);

    pthread_mutex_unlock(&mutex);
    // end barrier code

    // normal thread work
    for (i = start; i < end; i++) {
        array[i] = array[i] * 2;
    }
    printf("Thread %ld done with work!\n", myid);

    return NULL;
}
```

للدالة `threadEx_v2` الوظيفة نفسها التي لـ `threadEx`. وفي هذا المثال، يُسمى متغير الشرط `barrier`. وعندما يحوز كل خيط القفل، يزيد `n_reached`، أي عدد الخيوط التي وصلت إلى تلك النقطة. وما دام عدد الخيوط التي وصلت إلى الحاجز أقل من العدد الإجمالي للخيوط، ينتظر الخيط على متغير الشرط `barrier` والقفل `mutex`.

لكن عندما يصل الخيط الأخير إلى الحاجز، يستدعي `pthread_cond_broadcast(&barrier)` التي تحرّر *جميع* الخيوط الأخرى المنتظرة على متغير الشرط `barrier`، فتتيح لها متابعة التنفيذ.

هذا المثال مفيد لتوضيح الدالة `pthread_cond_broadcast`؛ لكن من الأفضل استخدام عنصر الحاجز الأولي في Pthreads كلما لزمت الحواجز في برنامج.

ومن الأسئلة التي يميل الطلاب إلى طرحها: هل يمكن استبدال حلقة `while` حول نداء `pthread_cond_wait` في شيفرة `farmer` و`threadEx_v2` بعبارة `if`؟ في الواقع، حلقة `while` هذه ضرورية تمامًا لسببين رئيسيين. أولًا، قد يتغير الشرط قبل أن يصل الخيط المستيقظ لمتابعة التنفيذ. وتفرض حلقة `while` إعادة اختبار الشرط اختبارًا أخيرًا. وثانيًا، الدالة `pthread_cond_wait` عرضة لـ**الاستيقاظات الكاذبة** (spurious wakeups)، حيث يُوقظ خيط خطأً حتى لو لم يكن الشرط متحققًا. وحلقة `while` في الواقع مثال على **حلقة محمول** (predicate loop) تفرض فحصًا أخيرًا لمتغير الشرط قبل تحرير القفل. ولذلك فإن استخدام حلقات المحمول ممارسة صحيحة عند استخدام متغيرات الشرط.

حتى الآن، استخدمنا الدالة `gettimeofday` لقياس مقدار الوقت الذي تستغرقه البرامج في التنفيذ. ونناقش في هذا القسم كيفية قياس مدى أداء برنامج متوازٍ مقارنةً ببرنامج تتابعي، فضلًا عن موضوعات أخرى مرتبطة بقياس أداء البرامج المتوازية.

نغطي أولًا بعض الأساسيات المتعلقة بالأداء المتوازي:

- [التسريع](https://diveintosystems.org/book/C14-SharedMemory/performance_basics.html#_speedup)
- [الكفاءة](https://diveintosystems.org/book/C14-SharedMemory/performance_basics.html#_efficiency)
- [قانون Amdahl](https://diveintosystems.org/book/C14-SharedMemory/performance_basics.html#_amdahls_law)

ومع أن قانون Amdahl والتسريع مفهومان مهمان جدًا مرتبطان بالأداء، فإن الفهم الجيد للموضوعين التاليين سيكمل فهم القارئ للأداء:

- [قانون Gustafson-Barsis](https://diveintosystems.org/book/C14-SharedMemory/performance_advanced.html#_gustafson_barsis_law)
- [قابلية التوسع](https://diveintosystems.org/book/C14-SharedMemory/performance_advanced.html#_scalability)

وتحديدًا، يعطي قانون Gustafson-Barsis فهمًا أفضل لحدود قانون Amdahl.

#### التسريع {#_speedup}

لنفترض أن برنامجًا يستغرق زمن T*c* للتنفيذ على *c* من الأنوية. وبذلك تستغرق النسخة التتابعية من البرنامج زمن T1.

ويعبَّر عن تسريع البرنامج على *c* من الأنوية بالمعادلة:

![speedup](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-0-speedup.webp)

إذا استغرق برنامج تتابعي 60 ثانية للتنفيذ، بينما تستغرق نسخته المتوازية 30 ثانية على نواتين، فالتسريع المقابل هو 2. وبالمثل، إذا استغرق ذلك البرنامج 15 ثانية على أربع أنوية، فالتسريع 4. وفي سيناريو مثالي، يكون تسريع برنامج يعمل على *n* من الأنوية بـ*n* من الخيوط الإجمالية مساويًا *n*.

وإذا كان تسريع برنامج أكبر من 1، فهو يدل على أن التوازي حقق بعض التحسن. وإذا كان التسريع أقل من 1، فالحل المتوازي في الواقع أبطأ من الحل التتابعي. ومن الممكن أن يكون تسريع برنامج أكبر من *n* (مثلًا كأثر جانبي لوجود ذاكرات مؤقتة إضافية تقلل الوصول إلى الذاكرة). وتُشار إلى هذه الحالات بـ**التسريع فوق الخطي** (superlinear speedup).

#### الكفاءة {#_efficiency}

لا يأخذ التسريع عدد الأنوية في الحسبان — فهو ببساطة نسبة الزمن التتابعي إلى الزمن المتوازي. فمثلًا، إذا استغرق برنامج تتابعي 60 ثانية، لكن برنامجًا متوازيًا استغرق 30 ثانية على أربع أنوية، فسيظل تسريعه 2. غير أن هذا المقياس لا يجسّد حقيقة أنه عمل على أربع أنوية.

ولقياس التسريع لكل نواة، استخدم الكفاءة:

![efficiency](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-1-efficiency.webp)

تتفاوت الكفاءة عادةً من 0 إلى 1. وتدل كفاءة 1 على أن الأنوية تُستخدم استخدامًا مثاليًا. وإذا كانت الكفاءة قريبة من 0، فللتوازي فائدة ضئيلة أو معدومة، إذ لا تحسّن الأنوية الإضافية الأداء. وإذا كانت الكفاءة أكبر من 1، فهي تدل على تسريع فوق خطي.

لنعد إلى المثال السابق الذي يستغرق فيه برنامج تتابعي 60 ثانية. فإذا استغرقت النسخة المتوازية 30 ثانية على نواتين، فكفاءتها 1 (أو 100%). وإذا استغرق البرنامج بدلًا من ذلك 30 ثانية على أربع أنوية، تهبط الكفاءة إلى 0.5 (أو 50%).

#### الأداء المتوازي في العالم الواقعي {#_parallel_performance_in_the_real_world}

في عالم مثالي، يكون التسريع خطيًا. فلكل وحدة حساب إضافية، ينبغي أن يحقق البرنامج المتوازي مقدارًا متناسبًا من التسريع. لكن هذا السيناريو نادر الحدوث في العالم الواقعي. فمعظم البرامج تحتوي مكوّنًا تتابعيًا ضروريًا وُجد بسبب تبعيات متأصلة في الشيفرة. وتُشار إلى أطول مجموعة من التبعيات في برنامج بـ**المسار الحرج** (critical path). وتقليل طول المسار الحرج للبرنامج خطوة أولى مهمة في جعله متوازيًا. ونقاط تزامن الخيوط و(بالنسبة إلى البرامج التي تعمل على عقد حسابية متعددة) الكلفة الإضافية للتواصل بين العمليات مكوّنات أخرى في الشيفرة يمكن أن تحدّ من الأداء المتوازي للبرنامج.

**تحذير — ليست كل البرامج مرشحة جيدة للتوازي!**

> يمكن أن يجعل طول المسار الحرج بعض البرامج *عسيرة* التوازي تمامًا. وكمثال، فكّر في مسألة توليد عدد فيبوناتشي رقم _n_. ولأن كل عدد فيبوناتشي يعتمد على العددين السابقين له، فمن الصعب جدًا جعل هذا البرنامج متوازيًا بكفاءة!

لننظر في موازاة الدالة `countElems` من خوارزمية CountSort من وقت سابق في هذا الفصل. في عالم مثالي، كنا نتوقع أن يكون تسريع البرنامج خطيًا بالنسبة إلى عدد الأنوية. لكن لنقِس زمن تشغيله (وفي هذه الحالة على نظام رباعي الأنوية بثمانية خيوط منطقية):

```bash
$ ./countElems_p_v3 100000000 0 1
Time for Step 1 is 0.331831 s

$ ./countElems_p_v3 100000000 0 2
Time for Step 1 is 0.197245 s

$ ./countElems_p_v3 100000000 0 4
Time for Step 1 is 0.140642 s

$ ./countElems_p_v3 100000000 0 8
Time for Step 1 is 0.107649 s
```

ويعرض [الجدول 1](#PerformanceBenchmarks) التسريع والكفاءة لهذه التشغيلات متعددة الخيوط:

| عدد الخيوط | 2 | 4 | 8 |
| --- | --- | --- | --- |
| التسريع | 1.68 | 2.36 | 3.08 |
| الكفاءة | 0.84 | 0.59 | 0.39 |

ومع أن لدينا كفاءة 84% بنواتين، تهبط كفاءة الأنوية إلى 39% بثماني أنوية. لاحظ أن التسريع المثالي البالغ 8 لم يتحقق. وأحد أسباب ذلك أن الكلفة الإضافية لإسناد العمل إلى الخيوط والتحديث التتابعي لمصفوفة `counts` تبدأ بالسيطرة على الأداء عند أعداد أكبر من الخيوط. وثانيًا، يقلل تنازع الموارد بين الخيوط الثمانية (تذكّر أن هذا معالج رباعي الأنوية) كفاءة الأنوية.

#### قانون Amdahl {#_amdahls_law}

في عام 1967، تنبأ Gene Amdahl، وهو معماري حواسيب بارز في IBM، بأن التسريع الأقصى الذي يمكن أن يحققه برنامج حاسوبي محدود بحجم مكوّنه التتابعي الضروري (المعروف الآن بقانون Amdahl). وبصفة أعم، ينص قانون Amdahl على أنه يوجد في كل برنامج مكوّن يمكن تسريعه (أي الجزء من البرنامج الذي يمكن تحسينه أو جعله متوازيًا، *P*)، ومكوّن *لا* يمكن تسريعه (أي الجزء من البرنامج التتابعي بطبيعته، *S*). وحتى لو انخفض الوقت اللازم لتنفيذ المكوّن القابل للتحسين أو التوازي *P* إلى الصفر، فسيظل المكوّن التتابعي *S* موجودًا، وسيسيطر على الأداء في نهاية الأمر. ولأن *S* و*P* كسران، لاحظ أن *S* + *P* = 1.

فكّر في برنامج ينفّذ على نواة واحدة في زمن T1. عندئذٍ يستغرق الجزء التتابعي الضروري من تنفيذ البرنامج زمن *S* × T1 للعمل، ويستغرق الجزء القابل للتوازي من تنفيذ البرنامج (*P* = 1 - *S*) زمن *P* × T1 للعمل.

وعندما ينفّذ البرنامج على *c* من الأنوية، ما زال الجزء التتابعي من الشيفرة يستغرق زمن *S* × T1 للعمل (مع بقاء جميع الشروط الأخرى على حالها)، لكن الجزء القابل للتوازي يمكن تقسيمه على *c* من الأنوية. وبذلك يكون التحسن الأقصى للمعالج المتوازي بـ*c* من الأنوية لتنفيذ المهمة نفسها هو:

![amdahl](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-2-amdahl.webp)

وكلما زاد *c*، صار زمن التنفيذ على المعالج المتوازي مسيطرًا عليه بالجزء التتابعي من البرنامج.

ولفهم أثر قانون Amdahl، فكّر في برنامج 90% منه قابل للتوازي وينفّذ في 10 ثوانٍ على نواة واحدة. وفي معادلتنا، المكوّن القابل للتوازي (*P*) هو 0.9، بينما المكوّن التتابعي (*S*) هو 0.1. ويعرض [الجدول 2](#TabAmdahl) الزمن الكلي المقابل على *c* من الأنوية (T*c*) وفق قانون Amdahl، والتسريع المرتبط به.

| عدد الأنوية | الزمن التتابعي (ث) | الزمن المتوازي (ث) | الزمن الكلي (T*c* ث) | التسريع (مقارنةً بنواة واحدة) |
| --- | --- | --- | --- | --- |
| 1 | 1 | 9 | 10 | 1 |
| 10 | 1 | 0.9 | 1.9 | 5.26 |
| 100 | 1 | 0.09 | 1.09 | 9.17 |
| 1000 | 1 | 0.009 | 1.009 | 9.91 |

لاحظ أنه مع مرور الوقت، يبدأ المكوّن التتابعي من البرنامج بالسيطرة، ويبدو أن أثر إضافة مزيد من الأنوية ضئيل أو معدوم.

وثمة طريقة أكثر رسمية للنظر إلى ذلك تتطلب إدماج حساب Amdahl لـ T*c* في معادلة التسريع:

![amdahl speed](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-3-amdahl_speed.webp)

ويُظهر أخذ نهاية هذه المعادلة أنه كلما اقترب عدد الأنوية (*c*) من اللانهاية، اقترب التسريع من 1/*S*. وفي المثال المعروض في [الجدول 2](#TabAmdahl)، يقترب التسريع من 1/0.1، أي 10.

وكمثال آخر، فكّر في برنامج حيث *P* = 0.99. وبعبارة أخرى، 99% من البرنامج قابل للتوازي. وكلما اقترب *c* من اللانهاية، بدأ الزمن التتابعي بالسيطرة على الأداء (وفي هذا المثال *S* = 0.01). وبذلك يقترب التسريع من 1/0.01، أي 100. وبعبارة أخرى، حتى بمليون نواة، فإن التسريع الأقصى الذي يمكن أن يحققه هذا البرنامج هو 100 فقط.

لم يضع كل شيء: حدود قانون Amdahl

عند تعلّم قانون Amdahl، من المهم مراعاة *مقاصد* واضعه، Gene Amdahl. وبكلماته هو، اقترح القانون لبيان «*استمرار صلاحية مقاربة المعالج الواحد، وضعف مقاربة المعالجات المتعددة من حيث تطبيقها على المسائل الحقيقية وما يصاحبها من تفاوتات*1». وفي ورقته عام 1967، وسّع Amdahl هذا المفهوم قائلًا: «*على مدى أكثر من عقد، أكد الأنبياء أن تنظيم الحاسوب الواحد بلغ حدوده، وأن التقدم الجوهري لا يمكن أن يتحقق إلا بربط عدد كبير من الحواسيب بطريقة تتيح حلًا تعاونيًا*1».

وقد تحدّث أعمال لاحقة عن بعض الافتراضات الرئيسية التي بنى عليها Amdahl. اقرأ عن [قانون Gustafson-Barsis](https://diveintosystems.org/book/C14-SharedMemory/performance_advanced.html#_gustafson_barsis_law) لمناقشة حدود قانون Amdahl وحجة مختلفة حول كيفية التفكير في فوائد التوازي.

#### المراجع {#_references}

1. Gene Amdahl. "Validity of the single processor approach to achieving large scale computing capabilities" *Proceedings of the April 18-20, 1967, Spring Joint Computer Conference*. pp. 483—​485. ACM. 1967.

#### قانون Gustafson-Barsis {#_gustafson_barsis_law}

في عام 1988، كتب John L. Gustafson، وهو عالم حاسوب وباحث في مختبرات Sandia الوطنية، ورقة بعنوان "Reevaluating Amdahl’s Law1". ويُبرز Gustafson في هذه الورقة افتراضًا جوهريًا كان قد وُضع حول تنفيذ البرنامج المتوازي ولا يصح دائمًا.

وتحديدًا، يعني قانون Amdahl أن عدد أنوية الحساب *c* والجزء القابل للتوازي من البرنامج *P* مستقلان عن بعضهما. ويلاحظ Gustafson أن هذا «*لا يحدث فعليًا أبدًا تقريبًا*»1. ومع أن قياس أداء برنامج بتغيير عدد الأنوية على مجموعة بيانات ثابتة تمرين أكاديمي مفيد، فإنه في العالم الواقعي تُضاف أنوية (أو معالجات، كما بحثنا في مناقشة الذاكرة الموزعة) كلما كبرت المسألة. ويكتب Gustafson1: «*قد يكون الأكثر واقعية افتراض ثبات زمن التشغيل، لا حجم المسألة*».

وبالتالي، ووفق Gustafson، فالأدق أن نقول إن «*مقدار العمل القابل للتنفيذ على التوازي يتغير خطيًا مع عدد المعالجات*»1.

فكّر في برنامج *متوازٍ* يستغرق زمن T*c* للعمل على نظام بـ*c* من الأنوية. ولتمثّل *S* الجزء التتابعي الضروري من تنفيذ البرنامج الذي يستغرق زمن *S* × T*c* للعمل. وبذلك يستغرق الجزء القابل للتوازي من تنفيذ البرنامج، *P* = 1 - *S*، زمن *P* × T*c* للعمل على *c* من الأنوية.

وعندما يعمل البرنامج نفسه على نواة واحدة فقط، ما زال الجزء التتابعي من الشيفرة يستغرق *S* x T*c* (بافتراض بقاء جميع الشروط الأخرى على حالها). لكن الجزء القابل للتوازي (الذي كان مقسومًا على *c* من الأنوية) يجب الآن أن تنفّذه نواة واحدة فقط ليعمل تتابعيًا، فيستغرق زمن *P* × T*c* × *c*. وبعبارة أخرى، سيستغرق المكوّن المتوازي *c* ضعف المدة على نظام أحادي النواة. ويترتب على ذلك أن التسريع المعياري سيكون:

![sspeedup](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-0-sspeedup.webp)

وهذا يدل على أن التسريع المعياري يزداد خطيًا مع عدد وحدات الحساب.

فكّر في مثالنا السابق الذي كان 99% منه قابلًا للتوازي (أي *P* = 0.99). وبتطبيق معادلة التسريع المعياري، سيكون التسريع النظري على 100 معالج 99.01. وعلى 1,000 معالج سيكون 990.01. لاحظ أن الكفاءة تبقى ثابتة عند *P*.

وكما يستنتج Gustafson، «*ينبغي قياس التسريع بقياس المسألة إلى عدد المعالجات، لا بتثبيت حجم المسألة*»1. وتُعدّ نتيجة Gustafson جديرة بالملاحظة لأنها تُظهر إمكانية الحصول على تسريع متزايد بتحديث عدد المعالجات. وكم باحث يعمل في منشأة حوسبة فائقة وطنية، كان اهتمام Gustafson أكبر بأداء *عمل أكثر* في مقدار ثابت من الزمن. وفي عدة مجالات علمية، تؤدي القدرة على تحليل بيانات أكثر إلى دقة أو إتقان أعلى في النتائج عادةً. وقد أظهر عمل Gustafson إمكانية الحصول على تسريعات كبيرة على أعداد كبيرة من المعالجات، وأعاد إحياء الاهتمام بالمعالجة المتوازية2.

#### قابلية التوسع {#_scalability}

نصف برنامجًا بـ**قابل للتوسع** (scalable) إذا رأينا أداءً متحسنًا (أو ثابتًا) كلما زدنا عدد الموارد (الأنوية والمعالجات) أو حجم المسألة. وثمة مفهومان مرتبطان هما **التوسع القوي** (strong scaling) و**التوسع الضعيف** (weak scaling). ومن المهم ملاحظة أن «الضعيف» و«القوي» في هذا السياق لا يدلان على *جودة* قابلية توسع البرنامج، بل هما مجرد طريقتين مختلفتين لقياس قابلية التوسع.

نقول إن برنامجًا **قابل للتوسع بقوة** إذا أدت زيادة عدد الأنوية/وحدات المعالجة على حجم مسألة *ثابت* إلى تحسن في الأداء. ويُظهر البرنامج قابلية توسع قوية خطية إذا كان تسريعه على *n* من الأنوية مساويًا *n* أيضًا. وبالطبع، يضمن قانون Amdahl أنه بعد نقطة ما تصبح إضافة أنوية إضافية بلا معنى تقريبًا.

ونقول إن برنامجًا **قابل للتوسع بضعف** إذا أدت زيادة حجم البيانات بالمعدل نفسه الذي يزداد به عدد الأنوية (أي إذا كان هناك حجم بيانات ثابت لكل نواة/معالج) إلى أداء ثابت أو متحسن. ونقول إن برنامجًا يُظهر قابلية توسع ضعيفة خطية إذا رأينا تحسنًا بمقدار *n* عند زيادة العمل لكل نواة بمعامل *n*.

#### نصائح عامة بشأن قياس الأداء {#_general_advice_regarding_measuring_performance}

نختم مناقشتنا للأداء ببعض الملاحظات عن القياس المرجعي والأداء على الأنوية الفائقة الخيوط.

شغّل البرنامج مرات متعددة عند القياس المرجعي.

في كثير من الأمثلة المعروضة حتى الآن في هذا الكتاب، نشغّل برنامجًا مرة واحدة فقط للإحساس بزمن تشغيله. لكن هذا لا يكفي للقياسات المرجعية الرسمية. فتشغيل البرنامج مرة واحدة *ليس* أبدًا مقياسًا دقيقًا لزمن تشغيله الحقيقي! فقد تؤدي تبديلات السياق والعمليات الأخرى العاملة إلى تذبذب زمن التشغيل جذريًا مؤقتًا. ولذلك من الأفضل دائمًا تشغيل البرنامج عدة مرات والإبلاغ عن زمن تشغيل متوسط مع أكبر قدر ممكن من التفاصيل، بما في ذلك عدد التشغيلات وتغير القياسات الملاحظ (مثل أشرطة الخطأ والحد الأدنى والحد الأقصى والوسيط والانحراف المعياري) والظروف التي أُخذت فيها القياسات.

كن حذرًا في موضع قياس التوقيت.

تفيد الدالة `gettimeofday` في المساعدة على قياس الوقت الذي يستغرقه البرنامج قياسًا دقيقًا. لكن يمكن أيضًا إساءة استخدامها. ومع أن وضع نداء `gettimeofday` حول مكوّن إنشاء الخيوط وضمّها فقط في `main` قد يغريك، فمن المهم التفكير فيما تريد قياسه بالضبط. فمثلًا، إذا قرأ برنامج ملف بيانات خارجيًا كجزء ضروري من تنفيذه، فيُرجَّح أن يُدرج زمن قراءة الملف في قياس البرنامج.

كن منتبهًا لأثر الأنوية الفائقة الخيوط.

كما نوقش في [مقدمة هذا الفصل](https://diveintosystems.org/book/C14-SharedMemory/index.html#_taking_a_closer_look_how_many_cores) و[قسم تعدد خيوط العتاد](https://diveintosystems.org/book/C5-Arch/modern.html#_multicore_and_hardware_multithreading)، تستطيع الأنوية الفائقة الخيوط (المنطقية) تنفيذ خيوط متعددة على نواة واحدة. وفي نظام رباعي الأنوية بخيطين منطقيين لكل نواة، نقول إن في النظام ثمانية أنوية فائقة الخيوط. وينتج عن تشغيل برنامج على التوازي على ثمانية أنوية منطقية في كثير من الحالات زمن حائطي أفضل من تشغيله على أربع أنوية. لكن بسبب تنازع الموارد الذي يحدث عادةً مع الأنوية الفائقة الخيوط، قد ترى انخفاضًا في كفاءة الأنوية وتسريعًا غير خطي.

احترس من تنازع الموارد.

عند القياس المرجعي، من المهم دائمًا مراعاة العمليات والتطبيقات المتعددة الخيوط *الأخرى* العاملة على النظام. وإذا بدت نتائج أدائك غريبة بعض الشيء، فمن الجدير تشغيل `top` بسرعة لرؤية ما إذا كان هناك مستخدمون آخرون يشغّلون أيضًا مهام كثيفة الموارد على النظام نفسه. وإن كان الأمر كذلك، فحاول استخدام نظام مختلف للقياس المرجعي (أو انتظر حتى لا يكون النظام مستخدمًا بكثافة).

#### المراجع {#_references}

1. John Gustafson. "Reevaluating Amdahl’s law". *Communications of the ACM* 31(5), pp. 532—​533. ACM. 1988.
2. Caroline Connor. "Movers and Shakers in HPC: John Gustafson" *HPC Wire*. [http://www.hpcwire.com/hpcwire/2010-10-20/movers_and_shakers_in_hpc_john_gustafson.html](http://www.hpcwire.com/hpcwire/2010-10-20/movers_and_shakers_in_hpc_john_gustafson.html)

قد يكون لذاكرات التخزين المؤقت في الأنظمة متعددة الأنوية آثار عميقة في أداء برنامج متعدد الخيوط. لكن أولًا، لنراجع سريعًا بعض [المفاهيم الأساسية المرتبطة بتصميم الذاكرة المؤقتة](https://diveintosystems.org/book/C11-MemHierarchy/caching.html#_cpu_caches):

- لا تُنقل البيانات/التعليمات إلى الذاكرة المؤقتة *منفردةً*. بل تُنقل البيانات في *كتل*، وتميل أحجام الكتل إلى الكبر في المستويات الأدنى من هرم الذاكرة.
- تُنظَّم كل ذاكرة مؤقتة في سلسلة من المجموعات، ولكل مجموعة عدد من الأسطر. ويحمل كل سطر كتلة بيانات واحدة.
- تُستخدم بتات عنوان الذاكرة الفردية لتحديد أي مجموعة ووسم وإزاحة كتلة في الذاكرة المؤقتة تُكتب فيها كتلة بيانات.
- تحدث **إصابة في الذاكرة المؤقتة** عندما توجد كتلة البيانات المطلوبة في الذاكرة المؤقتة. وإلا تحدث **إخفاق في الذاكرة المؤقتة**، ويُجرى بحث في المستوى الأدنى التالي من هرم الذاكرة (الذي قد يكون ذاكرة مؤقتة أو الذاكرة الرئيسية).
- يدل **بت الصلاحية** على ما إذا كانت الكتلة عند سطر معين في الذاكرة المؤقتة آمنة للاستخدام. وإذا كان بت الصلاحية 0، فلا يمكن استخدام كتلة البيانات عند ذلك السطر (مثلًا، قد تحتوي الكتلة بيانات من عملية منتهية).
- تُكتب المعلومات في الذاكرة المؤقتة/الذاكرة وفق استراتيجيتين رئيسيتين. في استراتيجية **الكتابة المباشرة**، تُكتب البيانات في الذاكرة المؤقتة والذاكرة الرئيسية في الوقت نفسه. وفي استراتيجية **الكتابة المرتجعة**، تُكتب البيانات في الذاكرة المؤقتة فقط، وتُكتب إلى المستويات الأدنى من الهرم بعد إخلاء الكتلة من الذاكرة المؤقتة.

### 14.5.1. الذاكرات المؤقتة في الأنظمة متعددة الأنوية {#_caches_on_multicore_systems}

[تذكّر](https://diveintosystems.org/book/C11-MemHierarchy/coherency.html#_looking_ahead_caching_on_multicore_processors) أنه في معماريات الذاكرة المشتركة يمكن أن تملك كل نواة ذاكرتها المؤقتة الخاصة، ويمكن أن تتشارك أنوية متعددة ذاكرة مؤقتة مشتركة. ويعرض [الشكل 1](#FigMulticoreCache) مثالًا على وحدة معالجة مركزية ثنائية الأنوية. ومع أن كل نواة تملك ذاكرتها المؤقتة L1 المحلية، فإن الأنوية تتشارك ذاكرة L2 مؤقتة مشتركة.

![dual core processor with separate L1 caches and shared L2 cache](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-0-multicore-cache.webp) Figure 1. An example dual-core CPU with separate L1 caches and a shared L2 cache

قد تنفّذ خيوط متعددة في ملف تنفيذي واحد دوال منفصلة. ومن دون استراتيجية [**تماسك الذاكرة المؤقتة**](https://diveintosystems.org/book/C11-MemHierarchy/coherency.html#_cache_coherency) تضمن أن كل ذاكرة مؤقتة تحافظ على رؤية متسقة للذاكرة المشتركة، يمكن تحديث المتغيرات المشتركة تحديثًا غير متسق. وكمثال، فكّر في المعالج ثنائي الأنوية في [الشكل 1](#FigMulticoreCache)، حيث تكون كل نواة مشغولة بتنفيذ خيوط منفصلة بالتزامن. وللخيط المسند إلى النواة 0 متغير محلي `x`، وللخيط المنفّذ على النواة 1 متغير محلي `y`، ولكلا الخيطين وصول مشترك إلى متغير عام `g`. ويعرض [الجدول 1](#TabCache) مسارًا ممكنًا للتنفيذ.

| الزمن | النواة 0 | النواة 1 |
| --- | --- | --- |
| 0 | g = 5 | (عمل آخر) |
| 1 | (عمل آخر) | y = g*4 |
| 2 | x += g | y += g*2 |

لنفترض أن القيمة الأولية لـ `g` هي 10، والقيمتين الأوليتين لـ `x` و`y` كلتاهما 0. ما القيمة النهائية لـ `y` في نهاية هذا التسلسل من العمليات؟ من دون تماسك الذاكرة المؤقتة، يصعب جدًا الإجابة عن هذا السؤال، بما أن هناك ثلاث قيم مخزَّنة لـ `g` على الأقل: واحدة في ذاكرة L1 المؤقتة للنواة 0، وواحدة في ذاكرة L1 المؤقتة للنواة 1، ونسخة منفصلة من `g` مخزَّنة في ذاكرة L2 المشتركة.

![A problematic update to the caches](https://diveintosystems.org/images/dive-into-systems/c14-sharedmemory-1-mc-cache-example.webp) Figure 2. A problematic update to caches that do not employ cache coherency

ويعرض [الشكل 2](#FigMCCacheExample) نتيجة خاطئة ممكنة بعد اكتمال تسلسل العمليات في [الجدول 1](#TabCache). لنفترض أن ذاكرات L1 المؤقتة تنفّذ سياسة الكتابة المرتجعة. فعندما يكتب الخيط المنفّذ على النواة 0 القيمة 5 في `g`، لا يحدّث إلا قيمة `g` في ذاكرة L1 المؤقتة للنواة 0. وتبقى قيمة `g` في ذاكرة L1 المؤقتة للنواة 1 مساوية 10، وكذلك النسخة في ذاكرة L2 المشتركة. وحتى لو نُفّذت سياسة الكتابة المباشرة، فلا ضمان أن تُحدَّث نسخة `g` المخزَّنة في ذاكرة L1 المؤقتة للنواة 1! وفي هذه الحالة، ستكون القيمة النهائية لـ `y` هي `60`.

وتُبطل استراتيجية تماسك الذاكرة المؤقتة النسخ المخزَّنة مؤقتًا للقيم المشتركة في الذاكرات المؤقتة الأخرى أو تحدّثها عندما تُجرى كتابة في القيمة المشتركة في ذاكرة مؤقتة واحدة. وبروتوكول [المعدَّلة المشتركة غير الصالحة (MSI)](https://diveintosystems.org/book/C11-MemHierarchy/coherency.html#_the_msi_protocol) (المناقش بالتفصيل في [الفصل 11.6](https://diveintosystems.org/book/C11-MemHierarchy/coherency.html#_the_msi_protocol)) مثال على بروتوكول تماسك ذاكرة مؤقتة بالإبطال.

ومن التقنيات الشائعة لتنفيذ MSI التجسّس. وتتجنّس **الذاكرة المؤقتة المتجسّسة** (snoopy cache) كهذه على ناقل الذاكرة بحثًا عن إشارات كتابة محتملة. وإذا اكتشفت الذاكرة المؤقتة المتجسّسة كتابة في كتلة ذاكرة مؤقتة مشتركة، أُبطلت سطرها الحاوي تلك الكتلة. والنتيجة النهائية أن النسخة الصالحة الوحيدة من الكتلة تكون في الذاكرة المؤقتة التي كُتب فيها، بينما تُوسم *جميع النسخ الأخرى* من الكتلة في الذاكرات المؤقتة الأخرى غير صالحة.

ومن شأن استخدام بروتوكول MSI مع التجسّس أن يعطي الإسناد النهائي الصحيح للقيمة `30` إلى المتغير `y` في المثال السابق.

### 14.5.2. المشاركة الزائفة {#_false_sharing}

يضمن تماسك الذاكرة المؤقتة الصحة، لكنه قد يضر بالأداء. تذكّر أنه عندما يحدّث الخيط `g` على النواة 0، تُبطل الذاكرة المؤقتة المتجسّسة ليس `g` فقط، بل *سطر الذاكرة المؤقتة كله* الذي يقع فيه `g`.

فكّر في [محاولتنا الأولية](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElems_p.c) لجعل الدالة `countElems` من خوارزمية CountSort متوازية. وللتيسير، أُعيد إدراج الدالة هنا:

```c
/*parallel version of step 1 (first cut) of CountSort algorithm:
 * extracts arguments from args value
 * calculates portion of the array this thread is responsible for counting
 * computes the frequency of all the elements in assigned component and stores
 * the associated counts of each element in counts array
*/
void *countElems(void *args){
    //extract arguments
    //ommitted for brevity
    int *array = myargs->ap;
    long *counts = myargs->countp;

    //assign work to the thread
    //compute chunk, start, and end
    //ommited for brevity

    long i;
    //heart of the program
    for (i = start; i < end; i++){
        val = array[i];
        counts[val] = counts[val] + 1;
    }

    return NULL;
}
```

في [مناقشتنا السابقة](https://diveintosystems.org/book/C14-SharedMemory/synchronization.html#_data_races) لهذه الدالة، أشرنا إلى كيف يمكن لحالات سباق البيانات أن تمنع امتلاء مصفوفة `counts` بالمجموعة الصحيحة من الأعداد. لنرَ ما يحدث إذا حاولنا *قياس* زمن هذه الدالة. نضيف شيفرة قياس إلى `main` باستخدام `getimeofday` بالطريقة نفسها المعروضة في [countElems_p_v3.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElems_p_v3.c). وينتج عن القياس المرجعي للنسخة الأولية من `countElems` كما هي معروضة للتو على 100 مليون عنصر الأزمنة التالية:

```bash
$ ./countElems_p 100000000 0 1
Time for Step 1 is 0.336239 s

$ ./countElems_p 100000000 0 2
Time for Step 1 is 0.799464 s

$ ./countElems_p 100000000 0 4
Time for Step 1 is 0.767003 s
```

حتى من دون أي عناصر تزامن، فإن هذه النسخة من البرنامج *تصبح أبطأ* كلما زاد عدد الخيوط!

ولفهم ما يجري، لنعد إلى مصفوفة `counts`. تحمل مصفوفة `counts` تكرار حدوث كل عدد في مصفوفة إدخالنا. ويتحدد الحد الأقصى بالمتغير `MAX`. وفي برنامجنا المثال، `MAX` مضبوط على 10. وبعبارة أخرى، تشغل مصفوفة `counts` مساحة 40 بايتًا.

تذكّر أن [تفاصيل الذاكرة المؤقتة](https://diveintosystems.org/book/C11-MemHierarchy/coherency.html#_looking_ahead_caching_on_multicore_processors) في نظام Linux موجودة في الدليل `/sys/devices/system/cpu/`. ولكل نواة منطقية دليلها الفرعي الخاص المسمى `cpuk` حيث `k` يدل على النواة المنطقية *kth*. ولكل دليل فرعي `cpu` بدوره أدلة `index` منفصلة تدل على الذاكرات المؤقتة المتاحة لتلك النواة.

وتحتوي أدلة `index` ملفات فيها تفاصيل كثيرة عن الذاكرات المؤقتة لكل نواة منطقية. وتُعرض محتويات دليل `index0` نموذجي هنا (`index0` يقابل عادةً ذاكرة L1 المؤقتة في نظام Linux):

```bash
$ ls /sys/devices/system/cpu/cpu0/cache/index0
coherency_line_size      power            type
level                    shared_cpu_list  uevent
number_of_sets           shared_cpu_map   ways_of_associativity
physical_line_partition  size
```

ولمعرفة حجم سطر الذاكرة المؤقتة L1، استخدم هذا الأمر:

```bash
$ cat /sys/devices/system/cpu/cpu0/cache/index0/coherency_line_size
64
```

وتكشف المخرجات أن حجم سطر ذاكرة L1 المؤقتة للآلة هو 64 بايتًا. وبعبارة أخرى، فإن مصفوفة `counts` البالغة 40 بايتًا تتسع *داخل سطر ذاكرة مؤقتة واحد*.

تذكّر أنه مع بروتوكولات تماسك الذاكرة المؤقتة بالإبطال مثل MSI، في كل مرة يحدّث فيها برنامج متغيرًا مشتركًا، *يُبطل سطر الذاكرة المؤقتة كله في الذاكرات المؤقتة الأخرى التي تخزّن المتغير*. لنفكّر فيما يحدث عندما ينفّذ خيطان الدالة السابقة. ويُعرض مسار تنفيذ ممكن في [الجدول 2](#TabInvalidate) (بافتراض أن كل خيط مسند إلى نواة منفصلة، وأن المتغير `x` محلي لكل خيط).

| الزمن | الخيط 0 | الخيط 1 |
| --- | --- | --- |
| *i* | يقرأ array[x] (1) | …​ |
| *i+1* | يزيد counts[1] (**يبطل سطر الذاكرة المؤقتة**) | يقرأ array[x] (4) |
| *i+2* | يقرأ array[x] (6) | يزيد counts[4] (**يبطل سطر الذاكرة المؤقتة**) |
| *i+3* | يزيد counts[6] (**يبطل سطر الذاكرة المؤقتة**) | يقرأ array[x] (2) |
| *i+4* | يقرأ array[x] (3) | يزيد counts[2] (**يبطل سطر الذاكرة المؤقتة**) |
| *i+5* | يزيد counts[3] (**يبطل سطر الذاكرة المؤقتة**) | …​ |

- خلال الخطوة الزمنية *i*، يقرأ الخيط 0 القيمة عند `array[x]` في جزئه من المصفوفة، وهي 1 في هذا المثال.
- وخلال الخطوات الزمنية *i + 1* إلى *i + 5*، يقرأ كل خيط قيمة من `array[x]`. لاحظ أن كل خيط ينظر إلى مكوّنات مختلفة من المصفوفة. وليس هذا فحسب، بل تعطي كل قراءة من `array` في تنفيذنا النموذجي قيمًا فريدة (فلا حالات سباق في هذا التسلسل التنفيذي النموذجي!). وبعد قراءة القيمة من `array[x]`، يزيد كل خيط القيمة المرتبطة بها في `counts`.
- تذكّر أن مصفوفة `counts` *تتسع في سطر ذاكرة مؤقتة واحد* في ذاكرة L1 المؤقتة لدينا. ونتيجة لذلك، تُبطل كل كتابة في `counts` *السطر كله* في *كل ذاكرة L1 مؤقتة أخرى*.
- والنتيجة النهائية أنه رغم تحديث *مواقع ذاكرة مختلفة* في `counts`، فإن أي سطر ذاكرة مؤقتة يحتوي `counts` *يُبطل* مع *كل تحديث* لـ `counts`!

ويجبر الإبطال جميع ذاكرات L1 المؤقتة على تحديث السطر بنسخة «صالحة» من L2. والتكرار المتواصل لإبطال أسطر من ذاكرة L1 والكتابة فوقها مثال على **الخبط** (thrashing)، حيث تسبب التعارضات المتكررة في الذاكرة المؤقتة سلسلة من الإخفاقات.

وتزيد إضافة مزيد من الأنوية المشكلة سوءًا، بما أن ذاكرات L1 مؤقتة أكثر تُبطل السطر الآن. ونتيجة لذلك، تؤدي إضافة خيوط إضافية إلى إبطاء زمن التشغيل، رغم أن كل خيط يصل إلى عناصر مختلفة من مصفوفة `counts`! وهذا مثال على **المشاركة الزائفة** (false sharing)، أو الوهم بأن عناصر فردية يتشاركها عدة أنوية. وفي المثال السابق، يبدو أن جميع الأنوية تصل إلى العناصر نفسها من `counts`، حتى لو لم يكن الأمر كذلك.

### 14.5.3. إصلاح المشاركة الزائفة {#_fixing_false_sharing}

من طرق إصلاح حالة مشاركة زائفة حشو المصفوفة (في حالتنا `counts`) بعناصر إضافية بحيث لا تتسع في سطر ذاكرة مؤقتة واحد. لكن الحشو قد يهدر الذاكرة، وقد لا يزيل المشكلة من جميع المعماريات (فكّر في سيناريو تكون فيه آلتان مختلفتان بأحجام ذاكرة L1 مؤقتة مختلفة). وفي معظم الحالات، لا تستحق كتابة شيفرة تدعم أحجام ذاكرات مؤقتة مختلفة المكسب في الأداء.

والحل الأفضل أن يكتب الخيوط في *تخزين محلي* كلما أمكن. والتخزين المحلي في هذا السياق يشير إلى ذاكرة *محلية* لخيط. ويقلل الحل التالي المشاركة الزائفة باختيار إجراء تحديثات على نسخة معلنة محليًا من `counts` تُسمى `local_counts`.

لنعد إلى النسخة النهائية من دالتنا `countElems` (معادة من [countElems_p_v3.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElems_p_v3.c)):

```c
/*parallel version of CountSort algorithm step 1 (final attempt with mutexes):
 * extracts arguments from args value
 * calculates the portion of the array this thread is responsible for counting
 * computes the frequency of all the elements in assigned component and stores
 * the associated counts of each element in counts array
*/
void *countElems( void *args ){
    //extract arguments
    //omitted for brevity
    int *array = myargs->ap;
    long *counts = myargs->countp;

    long local_counts[MAX] = {0}; //local declaration of counts array

    //assign work to the thread
    //compute chunk, start, and end values (omitted for brevity)

    long i;

    //heart of the program
    for (i = start; i < end; i++){
        val = array[i];
        local_counts[val] = local_counts[val] + 1; //update local counts array
    }

    //update to global counts array
    pthread_mutex_lock(&mutex); //acquire the mutex lock
    for (i = 0; i < MAX; i++){
        counts[i] += local_counts[i];
    }
    pthread_mutex_unlock(&mutex); //release the mutex lock

    return NULL;
}
```

واستخدام `local_counts` لتجميع التكرارات بدلًا من `counts` هو المصدر الرئيسي لتقليل المشاركة الزائفة في هذا المثال:

```c
for (i = start; i < end; i++){
    val = array[i];
    local_counts[val] = local_counts[val] + 1; //updates local counts array
}
```

ولأن تماسك الذاكرة المؤقتة يهدف إلى الحفاظ على رؤية متسقة للذاكرة المشتركة، فلا تُفعَّل عمليات الإبطال إلا على *الكتابات* في *القيم المشتركة* في الذاكرة. ولأن `local_counts` غير مشتركة بين الخيوط المختلفة، فإن الكتابة فيها لن تبطل سطر الذاكرة المؤقتة المرتبط بها.

وفي المكوّن الأخير من الشيفرة، يفرض القفل الصحة بضمان ألا يحدّث مصفوفة `counts` المشتركة إلا خيط واحد في المرة:

```c
//update to global counts array
pthread_mutex_lock(&mutex); //acquire the mutex lock
for (i = 0; i < MAX; i++){
    counts[i] += local_counts[i];
}
pthread_mutex_unlock(&mutex); //release the mutex lock
```

ولأن `counts` تقع على سطر ذاكرة مؤقتة واحد، فسيظل يُبطل مع كل كتابة. والفرق أن العقوبة هنا `MAX` × *t* كتابة على الأكثر مقابل *n* كتابة، حيث *n* طول مصفوفة إدخالنا و*t* عدد الخيوط المستخدمة.

حتى الآن، غطينا عناصر التزامن التي يمكن للمبرمجين استخدامها لضمان اتساق برامجهم متعددة الخيوط وصحتها بغض النظر عن عدد الخيوط المستخدم. لكن ليس من الآمن دائمًا افتراض أن دوال مكتبة C القياسية يمكن استخدامها «كما هي» في سياق أي تطبيق متعدد الخيوط. فليست كل الدوال في مكتبة C **آمنة للخيوط** (thread safe)، أو قادرة على التشغيل بواسطة خيوط متعددة مع ضمان نتيجة صحيحة بلا آثار جانبية غير مقصودة. ولضمان أن البرامج التي *نكتبها* آمنة للخيوط، من المهم استخدام [عناصر التزامن الأولية](https://diveintosystems.org/book/C14-SharedMemory/synchronization.html#_synchronizing_threads) مثل أقفال التبادل المتبادل والحواجز لفرض اتساق البرامج متعددة الخيوط وصحتها بغض النظر عن تغير عدد الخيوط.

وثمة مفهوم آخر وثيق الصلة بأمان الخيوط هو إعادة الدخول. فجميع الشيفرة الآمنة للخيوط قابلة لإعادة الدخول؛ لكن ليست كل شيفرة قابلة لإعادة الدخول آمنة للخيوط. وتكون الدالة **قابلة لإعادة الدخول** (re-entrant) إذا أمكن إعادة تنفيذها/تنفيذها جزئيًا بواسطة دالة من دون إحداث مشكلة. وبحكم التعريف، تضمن الشيفرة القابلة لإعادة الدخول أن تؤدي عمليات الوصول إلى الحالة العامة للبرنامج دائمًا إلى بقاء تلك الحالة العامة متسقة. ومع أن إعادة الدخول تُستخدم كثيرًا (استخدامًا خاطئًا) كمرادف لأمان الخيوط، فثمة حالات خاصة تكون فيها الشيفرة القابلة لإعادة الدخول غير آمنة للخيوط.

عند كتابة شيفرة متعددة الخيوط، تحقق من أن دوال مكتبة C المستخدمة آمنة للخيوط فعلًا. لحسن الحظ، قائمة دوال مكتبة C غير الآمنة للخيوط صغيرة نسبيًا. وتحتفظ The Open Group مشكورةً بـ[قائمة بالدوال غير الآمنة للخيوط](http://pubs.opengroup.org/onlinepubs/009695399/functions/xsh_chap02_09.html).

### 14.6.1. إصلاح مشكلات أمان الخيوط {#_fixing_issues_of_thread_safety}

[عناصر التزامن الأولية](https://diveintosystems.org/book/C14-SharedMemory/synchronization.html#_synchronizing_threads) هي الطريقة الأكثر شيوعًا لإصلاح المشكلات المرتبطة بأمان الخيوط. لكن استخدام دوال مكتبة C غير الآمنة للخيوط من دون علم قد يسبب مشكلات دقيقة. لننظر في نسخة معدّلة قليلًا من دالتنا `countsElem` تُسمى `countElemsStr`، تحاول إحصاء تكرار الأرقام في سلسلة نصية معينة، حيث يُفصل بين كل رقم ورقم بمسافات. وقد حُرّر البرنامج التالي للإيجاز؛ والشيفرة الكاملة لهذا البرنامج متاحة في: [countElemsStr.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElemsStr.c).

```c
/* computes the frequency of all the elements in the input string and stores
 * the associated counts of each element in the array called counts. */
void countElemsStr(int *counts, char *input_str) {
    int val, i;
    char *token;
    token = strtok(input_str, " ");
    while (token != NULL) {
        val = atoi(token);
        counts[val] = counts[val] + 1;
        token = strtok(NULL, " ");
    }
}

/* main function:
 * calls countElemsStr on a static string and counts up all the digits in
 * that string. */
int main( int argc, char **argv ) {
    //lines omitted for brevity, but gets user defined length of string

    //fill string with n digits
    char *inputString = calloc(length * 2, sizeof(char));
    fillString(inputString, length * 2);

    countElemsStr(counts, inputString);

    return 0;
}
```

The `countElemsStr` function uses the `strtok` function (as examined in our [discussion on strings](https://diveintosystems.org/book/C2-C_depth/strings.html#_strtok_strtok_r)) to parse each digit (stored in `token`) in the string, before converting it to an integer and making the associated updates in the `counts` array.

Compiling and running this program on 100,000 elements yields the following output:

```bash
$ gcc -o countElemsStr countElemsStr.c

$ ./countElemsStr 100000 1
contents of counts array:
9963 9975 9953 10121 10058 10017 10053 9905 9915 10040
```

Now, let’s take a look at a multithreaded version of `countElemsStr` (full source of the program viewable [here](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElemsStr_p.c)):

```c
/* parallel version of countElemsStr (First cut):
 * computes the frequency of all the elements in the input string and stores
 * the associated counts of each element in the array called counts
*/
void *countElemsStr(void *args) {
    //parse args
    struct t_arg *myargs = (struct t_arg *)args;
    //omitted for brevity

    //local variables
    int val, i;
    char *token;
    int local_counts[MAX] = {0};

    //compute local start and end values and chunk size:
    //omitted for brevity

    //tokenize values
    token = strtok(input_str + start, " ");
    while (token != NULL) {
        val = atoi(token); //convert to an int
        local_counts[val] = local_counts[val] + 1; //update associated counts
        token = strtok(NULL, " ");
    }

    pthread_mutex_lock(&mutex);
    for (i = 0; i < MAX; i++) {
        counts[i] += local_counts[i];
    }
    pthread_mutex_unlock(&mutex);

    return NULL;
}
```

In this version of the program, each thread processes a separate section of the string referenced by `input_str`. The `local_counts` array ensures that the bulk of the write operations occur to local storage. A mutex is employed to ensure that no two threads write to the shared variable `counts`.

However, compiling and running this program yields the following results:

```bash
$ gcc -o countElemsStr_p countElemsStr_p.c -pthread

$ ./countElemsStr_p 100000 1 1
contents of counts array:
9963 9975 9953 10121 10058 10017 10053 9905 9915 10040

$ ./countElemsStr_p 100000 1 2
contents of counts array:
498 459 456 450 456 471 446 462 450 463

$ ./countElemsStr_p 100000 1 4
contents of counts array:
5038 4988 4985 5042 5056 5013 5025 5035 4968 5065
```

Even though mutex locks are used around accesses to the `counts` array, the results from separate runs are radically different. This issue arises because the `countsElemsStr` function is not thread safe, because the string library function `strtok` is *not thread safe*! Visiting the [OpenGroup](http://pubs.opengroup.org/onlinepubs/009695399/functions/xsh_chap02_09.html) website confirms that `strtok` is on the list of thread-unsafe functions.

To fix this issue, it suffices to replace `strtok` with its thread-safe alternative, `strtok_r`. In the latter function, a pointer is used as the last parameter to help the thread keep track of where in the string it is parsing. Here is the fixed function with `strtok_r` (full source code here ([countsElemsStr_p_v2.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countElemsStr_p_v2.c)):

```c
/* parallel version of countElemsStr (First cut):
 * computes the frequency of all the elements in the input string and stores
 * the associated counts of each element in the array called counts */
void* countElemsStr(void* args) {
    //parse arguments
    //omitted for brevity

    //local variables
    int val, i;
    char * token;
    int local_counts[MAX] = {0};
    char * saveptr; //for saving state of strtok_r

    //compute local start and end values and chunk size:
    //omitted for brevity

    //tokenize values
    token = strtok_r(input_str+start, " ", &saveptr);
    while (token != NULL) {
        val = atoi(token); //convert to an int
        local_counts[val] = local_counts[val]+1; //update associated counts
        token = strtok_r(NULL, " ", &saveptr);
    }

    pthread_mutex_lock(&mutex);
    for (i = 0; i < MAX; i++) {
        counts[i]+=local_counts[i];
    }
    pthread_mutex_unlock(&mutex);

    return NULL;
}
```

The only change in this version of the code is the declaration of the character pointer `saveptr` and replacing all instances of `strtok` with `strtok_r`. Rerunning the code with these changes yields the following output:

```bash
$ gcc -o countElemsStr_p_v2 countElemsStr_p_v2.c -pthread

$ ./countElemsStr_p_v2 100000 1 1
contents of counts array:
9963 9975 9953 10121 10058 10017 10053 9905 9915 10040

$ ./countElemsStr_p_v2 100000 1 2
contents of counts array:
9963 9975 9953 10121 10058 10017 10053 9905 9915 10040

$ ./countElemsStr_p_v2 100000 1 4
contents of counts array:
9963 9975 9953 10121 10058 10017 10053 9905 9915 10040
```

Now the program produces the same result for every run. The use of `saveptr` in conjunction with `strtok_r` ensures that each thread can independently track their location when parsing the string.

The takeaway from this section is that one should always check [the list of thread-unsafe functions in C](http://pubs.opengroup.org/onlinepubs/009695399/functions/xsh_chap02_09.html) when writing multithreaded applications. Doing so can save the programmer a lot of heartache and frustration when writing and debugging threaded applications.

Thus far, we have presented shared memory programming using POSIX threads. Although Pthreads are great for simple applications, they become increasingly difficult to use as programs themselves become more complex. POSIX threads are an example of **explicit parallel programming** of threads, requiring a programmer to specify exactly what each thread is required to do and when each thread should start and stop.

With Pthreads, it can also be challenging to *incrementally* add parallelism to an existing sequential program. That is, one must often rewrite the program entirely to use threads, which is often not desirable when attempting to parallelize a large, existing codebase.

The Open Multiprocessing (OpenMP) library implements an *implicit* alternative to Pthreads. OpenMP is built into GCC and other popular compilers such as LLVM and Clang, and can be used with the C, C++, and Fortran programming languages. A key advantage of OpenMP is that it enables programmers to parallelize components of existing, sequential C code by adding **pragmas** (special compiler directives) to parts of the code. Pragmas specific to OpenMP begin with `#pragma omp`.

Detailed coverage of OpenMP is outside the scope of this book, but we cover some common pragmas, and show how several can be used in the context of some sample applications.

### 14.7.1. Common Pragmas {#_common_pragmas}

Here are some of the most commonly used pragmas in OpenMP programs:

`#pragma omp parallel`

This pragma creates a team of threads and has each thread run the code in its scope (usually a function call) on each thread. An invocation of this pragma is usually equivalent to an invocation of the `pthread_create` and `pthread_join` function pairing [discussed in our original discussion on Pthreads](https://diveintosystems.org/book/C14-SharedMemory/posix.html#_creating_and_joining_threads). The pragma may have a number of clauses, including the following:

- `num_threads` specifies the number of threads to create.
- `private` is a list of variables that should be private (or local) to each thread. Variables that should be private to a thread can also be declared within the scope of the pragma (see below for an example). Each thread gets its own copy of each variable.
- `shared` is a listing of variables that should be shared amongst the threads. There is one copy of the variable that is shared amongst all threads.
- `default` indicates whether the determination of which variables should be shared is left up to the compiler. In most cases, we want to use `default(none)` and specify explicitly which variables should be shared, and which should be private.

`#pragma omp for`

Specifies that each thread execute a subset of iterations of a `for` loop. Although the scheduling of the loops is up to the system, the default is usually the "chunking" method first discussed in the [scalar multiplication example](https://diveintosystems.org/book/C14-SharedMemory/posix.html#_revisiting_scalar_multiplication). This is a *static* form of scheduling: each thread gets an assigned chunk, and then processes the iterations in its chunk. However, OpenMP also makes *dynamic* scheduling easy. In dynamic scheduling, each thread gets a number of iterations, and requests a new set upon completing processing their iteration. The scheduling policy can be set using the following clause:

- `schedule(dynamic)`: specifies that a *dynamic* form of scheduling should be used. While this is advantageous in some cases, the static (default) form of scheduling is usually faster.

`#pragma omp parallel for`

This pragma is a combination of the `omp parallel` and the `omp for` pragmas. Unlike the `omp for` pragma, the `omp parallel for` pragma also generates a team of threads before assigning each thread a set of iterations of the loop.

`#pragma omp critical`

This pragma is used to specify that the code under its scope should be treated as a *critical section* — that is, only one thread should execute the section of code at a time to ensure correct behavior.

There are also several *functions* that a thread can access that are often useful for execution. For example:

`omp_get_num_threads`

returns the number of threads in the current team that is being executed.

`omp_set_num_threads`

sets the number of threads that a team should have.

`omp_get_thread_num`

returns the identifier of the calling thread.

**Warning — The `omp parallel for` directive works only with for loops!**

> Keep in mind that the `omp parallel for` pragma works *only* with `for` loops. Other types of loops, such as `while` loops and `do`-`while` loops, are not supported.

### 14.7.2. Hello Threading: OpenMP flavored {#_hello_threading_openmp_flavored}

Let’s revisit our "Hello World" ([hellothreads.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/hellothreads.c)) program, now using OpenMP instead of Pthreads:

```c
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

void HelloWorld( void ) {
    long myid = omp_get_thread_num();
    printf( "Hello world! I am thread %ld\n", myid );
}

int main( int argc, char** argv ) {
    long nthreads;

    if (argc !=2) {
        fprintf(stderr, "usage: %s <n>\n", argv[0]);
        fprintf(stderr, "where <n> is the number of threads\n");
        return 1;
    }

    nthreads = strtol( argv[1], NULL, 10 );

    #pragma omp parallel num_threads(nthreads)
        HelloWorld();

    return 0;
}
```

Note that the OpenMP program is *much* shorter than the Pthreads version. To access the OpenMP library functions, we include the header file `omp.h`. The `omp parallel num_threads(nthreads)` pragma in `main` creates a set of threads, where each thread calls the `HelloWorld` function. The clause `num_threads(nthreads)` specifies that a total of `nthreads` should be generated. The pragma also joins each created thread back to a single-threaded process. In other words, all the low-level work of creating and joining threads is *abstracted* away from the programmer and is accomplished with the inclusion of just one pragma. For this reason, OpenMP is considered an **implicit threading** library.

OpenMP also abstracts away the need to explicitly manage thread IDs. In the context of `HelloWorld`, the `omp_get_thread_num` function extracts the unique ID associated with the thread that is running it.

#### Compiling the code {#_compiling_the_code}

Let’s compile and run this program by passing the `-fopenmp` flag to the compiler, which signals that we’re compiling with OpenMP:

```bash
$ gcc -o hello_mp hello_mp.c -fopenmp

$ ./hello_mp 4
Hello world! I am thread 2
Hello world! I am thread 3
Hello world! I am thread 0
Hello world! I am thread 1
```

Since the execution of threads can change with subsequent runs, rerunning this program results in a different sequence of messages:

```bash
$ ./hello_mp 4
Hello world! I am thread 3
Hello world! I am thread 2
Hello world! I am thread 1
Hello world! I am thread 0
```

This behavior is consistent with our [example with Pthreads](https://diveintosystems.org/book/C14-SharedMemory/posix.html#_hello_threading_writing_your_first_multithreaded_program).

### 14.7.3. A More Complex Example: CountSort in OpenMP {#_a_more_complex_example_countsort_in_openmp}

A powerful advantage of OpenMP is that it enables programmers to incrementally parallelize their code. To see this in action, let’s parallelize the more complex CountSort algorithm discussed earlier in this chapter (the serial code is located here: [countSort.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countSort.c)). Recall that this algorithm sorts arrays containing a small range of values. The main function of the serial program looks like the following:

```c
int main( int argc, char **argv ) {
    //parse args (omitted for brevity)

    srand(10); //use of static seed ensures the output is the same every run

    //generate random array of elements of specified length
    //(omitted for brevity)

    //allocate counts array and initializes all elements to zero.
    int counts[MAX] = {0};

    countElems(counts, array, length); //calls step 1
    writeArray(counts, array); //calls step2

    free(array); //free memory

    return 0;
}
```

The `main` function, after doing some command line parsing and generating a random array, calls the `countsElems` function followed by the `writeArray` function.

#### Parallelizing CountElems Using OpenMP {#_parallelizing_countelems_using_openmp}

There are several ways to parallelize the preceding program. One way (shown in the example that follows) uses the `omp parallel` pragma in the context of the `countElems` and `writeArray` functions. As a result, no changes need to be made to the `main` function. A full version of the program is available at: [countSort_mp.c](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countSort_mp.c).

First, let’s examine how to parallelize the `countElems` function using OpenMP:

```c
void countElems(int *counts, int *array, long length) {

    #pragma omp parallel default(none) shared(counts, array, length)
    {
        int val, i, local[MAX] = {0};
        #pragma omp for
        for (i = 0; i < length; i++) {
            val = array[i];
            local[val]++;
        }

       #pragma omp critical
       {
           for (i = 0; i < MAX; i++) {
               counts[i] += local[i];
           }
       }
   }
}
```

In this version of the code, three pragmas are employed:

- The `#pragma omp parallel` pragma indicates that a team of threads should be created. The `omp_set_num_threads(nthreads)` line in `main` sets the default size of the thread team to be `nthreads`. If the `omp_set_num_threads` function is not used, then the number of threads assigned will equal the number of cores in the system. As a reminder, the `omp parallel` pragma implicitly creates threads at the beginning of the block and joins them at the end of the block. Braces (`{}`) are used to specify scope. The `shared` clause declares that the variables `counts`, `array`, and `length` are shared (global) among all the threads. Thus, the variables `val`, `i`, and `local[MAX]` are declared *locally* in each thread.
- The next pragma is `#pragma omp for`, which parallelizes the `for` loop, splitting the number of iterations among the number of threads. OpenMP calculates how best to split up the iterations of the loop. As previously mentioned, the default strategy is usually a chunking method, wherein each thread gets roughly the same number of iterations to compute. Thus, each thread reads a component of the shared array `array`, and accumulates its counts in its local array `local`.
- The `#pragma omp critical` pragma indicates that the code in the scope of the critical section should be executed by exactly one thread at a time. This is equivalent to the mutex that was employed in the Pthreads version of this program. Here, each thread increments the shared `counts` array one at a time.

Let’s get a sense of the performance of this function by running it with 100 million elements:

```bash
$ ./countElems_mp 100000000 1
Run Time for Phase 1 is 0.249893

$ ./countElems_mp 100000000 2
Run Time for Phase 1 is 0.124462

$ ./countElems_mp 100000000 4
Run Time for Phase 1 is 0.068749
```

This is excellent performance, with our function getting a speedup of 2 on two threads, and a speedup of 3.63 on four threads. We get even better performance than the Pthreads implementation!

#### The `writeArray` Function in OpenMP {#_the_writearray_function_in_openmp}

Parallelizing the `writeArray` function is *much* harder. The following code shows one possible solution:

```c
void writeArray(int *counts, int *array) {
    int i;

    //assumed the number of threads is no more than MAX
    #pragma omp parallel for schedule(dynamic)
    for (i = 0; i < MAX; i++) {
        int j = 0, amt, start = 0;
        for (j = 0; j < i; j++) {  //calculate the "true" start position
            start += counts[j];
        }

        amt = counts[i]; //the number of array positions to fill

        //overwrite amt elements with value i, starting at position start
        for (j = start; j < start + amt; j++) {
            array[j] = i;
        }
    }
}
```

Prior to parallelizing, we made a change to this function, because [the old version](https://diveintosystems.org/book/C14-SharedMemory/_attachments/countSort.c) of `writeArray` caused `j` to have a dependency on the previous iterations of the loop. In this version, each thread calculates its unique `start` value based on the sum of all the previous elements in `counts`.

When this dependency is removed, the parallelization is pretty straightforward. The `#pragma omp parallel for` pragma generates a team of threads and parallelizes the `for` loop by assigning each thread a subset of the iterations of the loop. As a reminder, this pragma is a combination of the `omp parallel` and the `omp for` pragmas (which were used in the parallelization of `countElems`).

A chunking approach to scheduling threads (as shown in the earlier `countElems` function) is not appropriate here, because it is possible that each element in `counts` has a radically different frequency. Therefore, the threads will not have equal work, resulting in some threads being assigned more work than others. Therefore, the `schedule(dynamic)` clause is employed, so that each thread completes the iteration it is assigned before requesting a new iteration from the thread manager.

Since each thread is writing to distinct array locations, mutual exclusion is not needed for this function.

Notice how much cleaner the OpenMP code is than the POSIX thread implementation. The code is very readable, and required very little modification. This is one of the powers of **abstraction**, in which the implementation details are hidden from the programmer.

However, a necessary trade-off for abstraction is control. The programmer assumes that the compiler is "smart" enough to take care of the particulars of parallelization and thus has an easier time parallelizing their application. However, the programmer no longer makes detailed decisions about the particulars of that parallelization. Without a clear idea of how OpenMP pragmas execute under the hood, it can be difficult to debug an OpenMP application or know which pragma is the most appropriate to use at a given time.

### 14.7.4. Learning More about OpenMP {#_learning_more_about_openmp}

A deeper discussion of OpenMP is beyond the scope of this book, but there are useful free resources1,2 for learning OpenMP.

### References:

1. Blaise Barney. "OpenMP". [https://hpc.llnl.gov/tuts/openMP/](https://hpc.llnl.gov/tuts/openMP/)
2. Richard Brown and Libby Shoop. "Multicore Programming with OpenMP". *CSinParallel: Parallel Computing in the Computer Science curriculum*. [http://selkie.macalester.edu/csinparallel/modules/MulticoreProgramming/build/html/index.html](http://selkie.macalester.edu/csinparallel/modules/MulticoreProgramming/build/html/index.html)

This chapter provided an overview of multicore processors and how to program them. Specifically, we cover the POSIX threads (or Pthreads) library and how to use it to create correct multithreaded programs that speed up a single-threaded program’s performance. Libraries like POSIX and OpenMP utilize the **shared memory** model of communication, as threads share data in a common memory space.

### Key Takeaways

Threads are the fundamental unit of concurrent programs

To parallelize a serial program, programmers utilize lightweight constructs known as **threads**. For a particular multithreaded process, each thread has its own allocation of stack memory, but shares the program data, heap and instructions of the process. Like processes, threads run **nondeterministically** on the CPU (i.e., the order of execution changes between runs, and which thread is assigned to which core is left up to the operating system).

Synchronization constructs ensure that programs work correctly

A consequence of shared memory is that threads can accidentally overwrite data residing in shared memory. A **race condition** can occur whenever two operations incorrectly update a shared value. When that shared value is data, a special type of race condition called a **data race** can arise. Synchronization constructs (mutexes, semaphores, etc.) help to guarantee program correctness by ensuring that threads execute one at a time when updating shared variables.

Be mindful when using synchronization constructs

Synchronization inherently introduces points of serial computation in an otherwise parallel program. It is therefore important to be aware of *how* one uses synchronization concepts. The set of operations that must run atomically is referred to as a **critical section**. If a critical section is too big, the threads will execute serially, yielding no improvement in runtime. Use synchronization constructs sloppily, and situations like **deadlock** may inadvertently arise. A good strategy is to have threads employ local variables as much as possible and update shared variables only when necessary.

Not all components of a program are parallelizable

Some programs necessarily have large serial components that can hinder a multithreaded program’s performance on multiple cores (e.g., **Amdahl’s Law**). Even when a high percentage of a program is parallelizable, speedup is rarely linear. Readers are also encouraged to look at other metrics such as efficiency and scalability when ascertaining the performance of their programs.

### Further Reading

This chapter is meant to give a taste of concurrency topics with threads; it is by no means exhaustive. To learn more about programming with POSIX threads and OpenMP, check out the excellent tutorials on [Pthreads](https://hpc-tutorials.llnl.gov/posix/) and [OpenMP](https://hpc.llnl.gov/tuts/openMP/) by Blaise Barney from Lawrence Livermore National Labs. For automated tools for debugging parallel programs, readers are encouraged to check out the [Helgrind](https://valgrind.org/docs/manual/hg-manual.html) and [DRD](https://valgrind.org/docs/manual/drd-manual.html) Valgrind tools.

In the [final chapter](https://diveintosystems.org/book/C15-Parallel/index.html#_looking_ahead_other_parallel_systems_and_parallel_programming_models) of the book, we give a high-level overview of other common parallel architectures and how to program them. [Read on to learn more](https://diveintosystems.org/book/C15-Parallel/index.html#_looking_ahead_other_parallel_systems_and_parallel_programming_models).

- [Chapter 14 Exercises](https://diveintosystems.org/exercises/dive-into-systems-exercises-17.html) (in progress)

### Additional Exercises

1. Implement the entirety of the scalar_multiply program. Time your code using the `gettimeofday()` function and 100 millions elements. How does the time of the program vary as you increase the number of threads? What if you increase the number of elements to 1 billion? 2 billion?
2. Improve the original `scalar multiply` threaded function by placing all the arguments into a `struct` and passing it through main. Time the performance of this version of the code. Is there any difference? [(solution)](https://diveintosystems.org/book/C14-SharedMemory/_attachments/scalar2.c)
3. Improve the `scalar_multiply` threaded function by implementing a better load balancing procedure. In other words, implement the load balancing procedure in the note above.
4. Using what you have learned, try implementing a program that performs matrix vector multiplication. In matrix vector multiplication, each row in the matrix is multiplied by some vector of elements.
5. Implement a parallel version of the Step 2 of the CountSort algorithm. Time your performance.
6. Try combining Step 1 and Step 2 of the CountSort program into a single program. To do this, you will need to add another cycle of `pthread_create()` and `pthread_join()` to your program.
7. Time the total performance of the new CountSort program.
8. OpenMP: The `writeElems()` function makes the assumption that the user only inputs a number of threads less that `MAX`. Is there a way to rewrite this code so that it will work, regardless of the number of threads?
