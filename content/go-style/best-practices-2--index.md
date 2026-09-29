---
title: "أفضل ممارسات أسلوب Go (2 من 2)"
lang: ar
source: https://google.github.io/styleguide/go/best-practices
---

## قوائم وسائط الدوال

لا تدع توقيع الدالة يصبح طويلًا جدًا. فبإضافة مزيد من المعاملات إلى دالة، يصبح دور كل معامل أقل وضوحًا، ويصبح الخلط بين معاملات متجاورة من النوع نفسه أسهل. والدوال ذات الأعداد الكبيرة من الوسائط أقل قابلية للتذكّر وأصعب قراءةً في موضع الاستدعاء.

عند تصميم واجهة برمجية، فكّر في تقسيم دالة شديدة القابلية للإعداد يتعقّد توقيعها إلى عدة دوال أبسط. ويمكن أن تتشارك هذه الدوال تنفيذًا (غير مصدَّر) عند الحاجة.

وحيث تتطلّب دالة مُدخَلات كثيرة، فكّر في إدخال [بنية خيارات](#option-structure) لبعض الوسائط أو في استخدام تقنية [الخيارات المتغيّرة العدد](#variadic-options) الأكثر تقدّمًا. وينبغي أن يكون الاعتبار الأساسي لاختيار الاستراتيجية هو شكل استدعاء الدالة في جميع حالات الاستخدام المتوقعة.

تنطبق التوصيات أدناه أساسًا على الواجهات البرمجية المصدَّرة، التي تُقاس بمعيار أعلى من غير المصدَّرة. وقد لا تكون هذه التقنيات ضرورية لحالة استخدامك. استخدم حكمك، ووازن بين مبدأي [الوضوح](/book/go-style/guide/index#clarity) و[أقل آلية ممكنة](/book/go-style/guide/index#least-mechanism).

انظر أيضًا: [Go Tip #24: Use Case-Specific Constructions](https://google.github.io/styleguide/go/index.html#gotip)

### بنية الخيارات

بنية الخيارات هي نوع بنية يجمع بعض وسائط دالة أو طريقة أو كلها، ثم يُمرَّر كوسيط أخير إلى الدالة أو الطريقة. (وينبغي ألّا تُصدَّر البنية إلا إذا استُخدمت في دالة مصدَّرة.)

لاستخدام بنية الخيارات فوائد عديدة:

- يتضمّن المركّب الحرفي للبنية الحقول والقيم لكل وسيط، ما يجعلها موثّقة ذاتيًا وأصعب في التبديل الخاطئ.
- يمكن حذف الحقول غير ذات الصلة أو حقول «القيم الافتراضية».
- يمكن للمستدعين مشاركة بنية الخيارات وكتابة دوال مساعدة للعمل عليها.
- توفّر البنى توثيقًا أنظف لكل حقل من وسائط الدوال.
- يمكن أن تنمو بنى الخيارات بمرور الوقت دون التأثير على مواضع الاستدعاء.

وهذا مثال على دالة يمكن تحسينها:

```
// Bad:
func EnableReplication(ctx context.Context, config *replicator.Config, primaryRegions, readonlyRegions []string, replicateExisting, overwritePolicies bool, replicationInterval time.Duration, copyWorkers int, healthWatcher health.Watcher) {
    // ...
}
```

يمكن إعادة كتابة الدالة أعلاه باستخدام بنية خيارات كما يلي:

```
// Good:
type ReplicationOptions struct {
    Config              *replicator.Config
    PrimaryRegions      []string
    ReadonlyRegions     []string
    ReplicateExisting   bool
    OverwritePolicies   bool
    ReplicationInterval time.Duration
    CopyWorkers         int
    HealthWatcher       health.Watcher
}
func EnableReplication(ctx context.Context, opts ReplicationOptions) {
    // ...
}
```

ويمكن بعد ذلك استدعاء الدالة في حزمة مختلفة:

```
// Good:
func foo(ctx context.Context) {
    // Complex call:
    storage.EnableReplication(ctx, storage.ReplicationOptions{
        Config:              config,
        PrimaryRegions:      []string{"us-east1", "us-central2", "us-west3"},
        ReadonlyRegions:     []string{"us-east5", "us-central6"},
        OverwritePolicies:   true,
        ReplicationInterval: 1 * time.Hour,
        CopyWorkers:         100,
        HealthWatcher:       watcher,
    })
    // Simple call:
    storage.EnableReplication(ctx, storage.ReplicationOptions{
        Config:         config,
        PrimaryRegions: []string{"us-east1", "us-central2", "us-west3"},
    })
}
```

**ملاحظة:** [لا تُضمَّن السياقات أبدًا في بنى الخيارات](/book/go-style/decisions-2/index#contexts).

ويُفضَّل هذا الخيار غالبًا عندما ينطبق بعض مما يلي:

- يحتاج جميع المستدعين إلى تحديد خيار واحد أو أكثر من الخيارات.
- يحتاج عدد كبير من المستدعين إلى تقديم خيارات كثيرة.
- تُشارَك الخيارات بين عدة دوال سيستدعيها المستخدم.

### الخيارات المتغيّرة العدد

باستخدام الخيارات المتغيّرة العدد، تُنشأ دوال مصدَّرة تُعيد دوال مغلقة (closures) يمكن تمريرها إلى [الوسيط المتغيّر العدد (`...`)](https://golang.org/ref/spec#Passing_arguments_to_..._parameters) لدالة. وتأخذ الدالة كمعاملات لها قيم الخيار (إن وُجدت)، وتقبل الدالة المغلقة المُعادة مرجعًا قابلًا للتغيير (عادةً مؤشّر إلى نوع بنية) سيُحدَّث بناءً على المُدخَلات.

قد يوفّر استخدام الخيارات المتغيّرة العدد فوائد عديدة:

- لا تشغل الخيارات أي مساحة في موضع الاستدعاء عندما لا حاجة إلى إعداد.
- تظل الخيارات قيمًا، لذا يمكن للمستدعين مشاركتها وكتابة دوال مساعدة وتجميعها.
- يمكن للخيارات أن تقبل عدة معاملات (مثل `cartesian.Translate(dx, dy int) TransformOption`).
- يمكن لدوال الخيارات أن تُعيد نوعًا مسمّى لتجميع الخيارات معًا في godoc.
- يمكن للحزم أن تسمح (أو تمنع) للحزم الخارجية بتعريف خياراتها الخاصة.

**ملاحظة:** يتطلّب استخدام الخيارات المتغيّرة العدد قدرًا كبيرًا من الشيفرة الإضافية (انظر المثال التالي)، لذا ينبغي ألّا يُستخدم إلا عندما ترجح مزاياه على الكلفة الإضافية.

وهذا مثال على دالة يمكن تحسينها:

```
// Bad:
func EnableReplication(ctx context.Context, config *placer.Config, primaryCells, readonlyCells []string, replicateExisting, overwritePolicies bool, replicationInterval time.Duration, copyWorkers int, healthWatcher health.Watcher) {
  ...
}
```

يمكن إعادة كتابة المثال أعلاه باستخدام الخيارات المتغيّرة العدد كما يلي:

```javascript
// Good:
type replicationOptions struct {
    readonlyCells       []string
    replicateExisting   bool
    overwritePolicies   bool
    replicationInterval time.Duration
    copyWorkers         int
    healthWatcher       health.Watcher
}
// A ReplicationOption configures EnableReplication.
type ReplicationOption func(*replicationOptions)
// ReadonlyCells adds additional cells that should additionally
// contain read-only replicas of the data.
//
// Passing this option multiple times will add additional
// read-only cells.
//
// Default: none
func ReadonlyCells(cells ...string) ReplicationOption {
    return func(opts *replicationOptions) {
        opts.readonlyCells = append(opts.readonlyCells, cells...)
    }
}
// ReplicateExisting controls whether files that already exist in the
// primary cells will be replicated.  Otherwise, only newly-added
// files will be candidates for replication.
//
// Passing this option again will overwrite earlier values.
//
// Default: false
func ReplicateExisting(enabled bool) ReplicationOption {
    return func(opts *replicationOptions) {
        opts.replicateExisting = enabled
    }
}
// ... other options ...
// DefaultReplicationOptions control the default values before
// applying options passed to EnableReplication.
var DefaultReplicationOptions = []ReplicationOption{
    OverwritePolicies(true),
    ReplicationInterval(12 * time.Hour),
    CopyWorkers(10),
}
func EnableReplication(ctx context.Context, config *placer.Config, primaryCells []string, opts ...ReplicationOption) {
    var options replicationOptions
    for _, opt := range DefaultReplicationOptions {
        opt(&options)
    }
    for _, opt := range opts {
        opt(&options)
    }
}
```

ويمكن بعد ذلك استدعاء الدالة في حزمة مختلفة:

```
// Good:
func foo(ctx context.Context) {
    // Complex call:
    storage.EnableReplication(ctx, config, []string{"po", "is", "ea"},
        storage.ReadonlyCells("ix", "gg"),
        storage.OverwritePolicies(true),
        storage.ReplicationInterval(1*time.Hour),
        storage.CopyWorkers(100),
        storage.HealthWatcher(watcher),
    )
    // Simple call:
    storage.EnableReplication(ctx, config, []string{"po", "is", "ea"})
}
```

فضّل هذا الخيار عندما ينطبق كثير مما يلي:

- لن يحتاج معظم المستدعين إلى تحديد أي خيارات.
- تُستخدم معظم الخيارات بشكل غير متكرر.
- يوجد عدد كبير من الخيارات.
- تتطلّب الخيارات وسائط.
- قد تفشل الخيارات أو تُضبَط بشكل خاطئ (وفي هذه الحالة تُعيد دالة الخيار `error`).
- تتطلّب الخيارات قدرًا كبيرًا من التوثيق قد يصعب احتواؤه في بنية.
- يمكن للمستخدمين أو الحزم الأخرى توفير خيارات مخصّصة.

ينبغي أن تقبل الخيارات بهذا الأسلوب معاملات بدلًا من استخدام وجودها للإشارة إلى قيمتها؛ إذ يمكن للأخير أن يجعل التركيب الديناميكي للوسائط أصعب بكثير. فمثلًا، ينبغي أن تقبل الإعدادات الثنائية قيمة منطقية (مثل `rpc.FailFast(enable bool)` مفضَّلًا على `rpc.EnableFailFast()`). وينبغي أن يقبل الخيار المُعدَّد ثابتًا مُعدَّدًا (مثل `log.Format(log.Capacitor)` مفضَّلًا على `log.CapacitorFormat()`). ويجعل البديل ذلك أصعب بكثير على المستخدمين الذين يجب أن يختاروا برمجيًا أي الخيارات يمرّرون؛ إذ يُجبَر هؤلاء المستخدمون على تغيير التركيب الفعلي للمعاملات بدلًا من مجرد تغيير الوسائط الممرَّرة إلى الخيارات. لا تفترض أن جميع المستخدمين سيعرفون المجموعة الكاملة من الخيارات بشكل ساكن.

وعمومًا، ينبغي معالجة الخيارات بالترتيب. وإذا حدث تعارض أو مُرِّر خيار غير تراكمي عدة مرات، فينبغي أن يفوز الوسيط الأخير.

يكون معامل دالة الخيار عادةً غير مصدَّر في هذا النمط، لتقييد تعريف الخيارات داخل الحزمة نفسها فقط. وهذا افتراض جيد، وإن كانت هناك أوقات قد يكون فيها من المناسب السماح لحزم أخرى بتعريف الخيارات.

راجع [تدوينة Rob Pike الأصلية](http://commandcenter.blogspot.com/2014/01/self-referential-functions-and-design.html) و[محاضرة Dave Cheney](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis) لنظرة أعمق في كيفية استخدام هذه الخيارات.

## واجهات سطر الأوامر المعقّدة

ترغب بعض البرامج في تقديم واجهة سطر أوامر غنية للمستخدمين تتضمّن أوامر فرعية. فمثلًا، `kubectl create` و`kubectl run` والعديد من الأوامر الفرعية الأخرى كلها يوفّرها البرنامج `kubectl`. وهناك على الأقل المكتبات التالية الشائعة الاستخدام لتحقيق ذلك.

إذا لم يكن لديك تفضيل أو كانت الاعتبارات الأخرى متساوية، فيُنصَح بـ[subcommands](https://pkg.go.dev/github.com/google/subcommands)، لأنه الأبسط ويسهل استخدامه استخدامًا صحيحًا. غير أنك إذا احتجت ميزات مختلفة لا يوفّرها، فاختر أحد الخيارات الأخرى.

- **[cobra](https://pkg.go.dev/github.com/spf13/cobra)** اصطلاح الأعلام: getopt
- شائع خارج قاعدة شيفرة Google.
- ميزات إضافية كثيرة.
- مطبّات في الاستخدام (انظر أدناه).

**[subcommands](https://pkg.go.dev/github.com/google/subcommands)**

- اصطلاح الأعلام: Go
- بسيط ويسهل استخدامه استخدامًا صحيحًا.
- يُنصَح به إذا لم تكن بحاجة إلى ميزات إضافية.

**تحذير**: ينبغي أن تستخدم دوال أوامر cobra الدالة `cmd.Context()` للحصول على سياق بدلًا من إنشاء سياق جذري خاص بها باستخدام `context.Background`. والشيفرة التي تستخدم حزمة subcommands تتلقّى بالفعل السياق الصحيح كمعامل دالة.

لا يلزمك وضع كل أمر فرعي في حزمة منفصلة، وغالبًا لا تكون هناك حاجة إلى ذلك. طبّق الاعتبارات نفسها بشأن حدود الحزم كما في أي قاعدة شيفرة Go. وإذا كان يمكن استخدام شيفرتك كمكتبة وكتطبيق تنفيذي معًا، فمن المفيد عادةً فصل شيفرة واجهة سطر الأوامر عن المكتبة، بحيث تصبح الواجهة مجرد عميل آخر من عملائها. (وهذا ليس خاصًا بواجهات سطر الأوامر التي لها أوامر فرعية، لكنه ذُكر هنا لأنه موضع شائع لظهوره.)

## الاختبارات

### اترك الاختبار لدالة `Test`

تميّز Go بين «دوال الاختبار المساعدة» و«دوال التأكيد المساعدة»:

- **دوال الاختبار المساعدة (test helpers)** هي دوال تؤدّي مهام تهيئة أو تنظيف. ويُتوقّع أن تكون كل حالات الفشل التي تحدث في دوال الاختبار المساعدة فشلًا في البيئة (لا في الشيفرة قيد الاختبار) — مثل تعذّر بدء قاعدة بيانات اختبارية لعدم وجود منافذ حرة أخرى على هذا الجهاز. وبالنسبة إلى دوال كهذه، غالبًا ما يكون استدعاء `t.Helper` مناسبًا [لوسمها كدالة اختبار مساعدة](/book/go-style/decisions-2/index#mark-test-helpers). راجع [معالجة الأخطاء في دوال الاختبار المساعدة](#test-helper-error-handling) لمزيد من التفاصيل.
- **دوال التأكيد المساعدة (assertion helpers)** هي دوال تتحقق من صحة نظام ما وتُفشل الاختبار إذا لم يتحقق توقّع. ولا تُعدّ دوال التأكيد المساعدة [أسلوبًا اصطلاحيًا](/book/go-style/decisions-2/index#assert) في Go.

الغرض من الاختبار هو الإبلاغ عن حالات النجاح/الفشل للشيفرة قيد الاختبار. والمكان المثالي لإفشال اختبار هو داخل دالة `Test` نفسها، لأن ذلك يضمن وضوح [رسائل الفشل](/book/go-style/decisions-2/index#useful-test-failures) ومنطق الاختبار.

بينما تنمو شيفرة اختبارك، قد يصبح من الضروري فصل بعض الوظائف إلى دوال مستقلة. وتظل اعتبارات هندسة البرمجيات المعتادة سارية، لأن *شيفرة الاختبار تظل شيفرة*. وإذا لم تتفاعل الوظيفة مع إطار الاختبار، فتنطبق كل القواعد المعتادة. أما عندما تتفاعل الشيفرة المشتركة مع الإطار، فيجب توخّي بعض الحذر لتجنّب المطبّات الشائعة التي قد تؤدي إلى رسائل فشل غير مفيدة واختبارات غير قابلة للصيانة.

إذا كانت حالات اختبار منفصلة كثيرة تتطلّب منطق تحقق واحدًا، فرتّب الاختبار بإحدى الطرق التالية بدلًا من استخدام دوال تأكيد مساعدة أو دوال تحقق معقّدة:

- ضمّن المنطق (التحقق والإفشال معًا) داخل دالة `Test`، حتى لو كان متكررًا. وهذا ينفع أكثر في الحالات البسيطة.
- إذا كانت المُدخَلات متشابهة، فكّر في توحيدها في [اختبار مبني على جدول](/book/go-style/decisions-2/index#table-driven-tests) مع إبقاء المنطق مضمّنًا في الحلقة. ويساعد ذلك على تجنّب التكرار مع إبقاء التحقق والإفشال في دالة `Test`.
- إذا كان هناك مستدعون متعددون يحتاجون دالة التحقق نفسها لكن اختبارات الجداول غير مناسبة (عادةً لأن المُدخَلات ليست بسيطة بما يكفي أو لأن التحقق مطلوب كجزء من تسلسل عمليات)، فرتّب دالة التحقق بحيث تُعيد قيمة (عادةً `error`) بدلًا من أخذ معامل `testing.T` واستخدامه لإفشال الاختبار. واستخدم منطقًا داخل `Test` لتقرير ما إذا كان يجب الإفشال، ولتقديم [حالات فشل اختبار مفيدة](/book/go-style/decisions-2/index#useful-test-failures). ويمكنك أيضًا إنشاء دوال اختبار مساعدة لفصل شيفرة التهيئة المتكرّرة الشائعة.

يحافظ التصميم المبيَّن في النقطة الأخيرة على التعامد. فمثلًا، لم تُصمَّم [الحزمة `cmp`](https://pkg.go.dev/github.com/google/go-cmp/cmp) لإفشال الاختبارات، بل لمقارنة القيم (وإظهار فروقها). ولذلك لا تحتاج إلى معرفة السياق الذي أُجريت فيه المقارنة، لأن المستدعي يمكنه توفيره. وإذا كانت شيفرة الاختبار المشتركة لديك توفّر `cmp.Transformer` لنوع بياناتك، فغالبًا ما يكون ذلك أبسط تصميم. وبالنسبة إلى عمليات تحقق أخرى، فكّر في إعادة قيمة `error`.

```
// Good:
// polygonCmp returns a cmp.Option that equates s2 geometry objects up to
// some small floating-point error.
func polygonCmp() cmp.Option {
    return cmp.Options{
        cmp.Transformer("polygon", func(p *s2.Polygon) []*s2.Loop { return p.Loops() }),
        cmp.Transformer("loop", func(l *s2.Loop) []s2.Point { return l.Vertices() }),
        cmpopts.EquateApprox(0.00000001, 0),
        cmpopts.EquateEmpty(),
    }
}
func TestFenceposts(t *testing.T) {
    // This is a test for a fictional function, Fenceposts, which draws a fence
    // around some Place object. The details are not important, except that
    // the result is some object that has s2 geometry (github.com/golang/geo/s2)
    got := Fencepost(tomsDiner, 1*meter)
    if diff := cmp.Diff(want, got, polygonCmp()); diff != "" {
        t.Errorf("Fencepost(tomsDiner, 1m) returned unexpected diff (-want+got):\n%v", diff)
    }
}
func FuzzFencepost(f *testing.F) {
    // Fuzz test (https://go.dev/doc/fuzz) for the same.
    f.Add(tomsDiner, 1*meter)
    f.Add(school, 3*meter)
    f.Fuzz(func(t *testing.T, geo Place, padding Length) {
        got := Fencepost(geo, padding)
        // Simple reference implementation: not used in prod, but easy to
        // reason about and therefore useful to check against in random tests.
        reference := slowFencepost(geo, padding)
        // In the fuzz test, inputs and outputs can be large so don't
        // bother with printing a diff. cmp.Equal is enough.
        if !cmp.Equal(got, reference, polygonCmp()) {
            t.Errorf("Fencepost returned wrong placement")
        }
    })
}
```

دالة `polygonCmp` محايدة بشأن كيفية استدعائها؛ فهي لا تأخذ نوع مُدخَل محدّدًا ولا تفرض ما يجب فعله في حال عدم تطابق كائنين. ولذلك يمكن لمستدعين أكثر الاستفادة منها.

**ملاحظة:** هناك تشابه بين دوال الاختبار المساعدة وشيفرة المكتبات العادية. فشيفرة المكتبات ينبغي عادةً ألّا [تُصدر حالات ذعر](/book/go-style/decisions-2/index#dont-panic) إلا في ظروف نادرة؛ وينبغي ألّا توقف الشيفرة المستدعاة من اختبار الاختبارَ إلا إذا لم يكن هناك [جدوى من المتابعة](#t-fatal).

### تصميم واجهات تحقق قابلة للتوسّع

معظم النصائح حول الاختبار في دليل الأسلوب تتعلق باختبار شيفرتك الخاصة. أما هذا القسم فيتعلق بكيفية توفير أدوات لآخرين لاختبار الشيفرة التي يكتبونها للتأكد من مطابقتها لمتطلبات مكتبتك.

#### اختبار القبول

يُشار إلى هذا النوع من الاختبار بـ[اختبار القبول](https://en.wikipedia.org/wiki/Acceptance_testing). ومقدّمة هذا النوع من الاختبار أن الشخص الذي يستخدم الاختبار لا يعرف كل تفصيل صغير ممّا يجري في الاختبار؛ بل يسلّم المُدخَلات فحسب إلى أداة الاختبار لتقوم بالعمل. ويمكن التفكير في ذلك كشكل من أشكال [عكس التحكّم](https://en.wikipedia.org/wiki/Inversion_of_control).

في اختبار Go نموذجي، تتحكّم دالة الاختبار في مسار البرنامج، وتشجّعك إرشادات [عدم التأكيد](/book/go-style/decisions-2/index#assert) و[دوال الاختبار](#test-functions) على الإبقاء على ذلك. ويشرح هذا القسم كيفية تأليف دعم لهذه الاختبارات بما يتّسق مع أسلوب Go.

قبل الخوض في الكيفية، تأمّل مثالًا من [`io/fs`](https://pkg.go.dev/io/fs) مقتطفًا أدناه:

```
type FS interface {
    Open(name string) (File, error)
}
```

ورغم وجود تطبيقات معروفة لـ`fs.FS`، فقد يُتوقّع من مطوّر Go أن يؤلّف واحدًا. وللمساعدة في التحقق من صحة `fs.FS` الذي ينفّذه المستخدم، وُفِّرت مكتبة عامة في [`testing/fstest`](https://pkg.go.dev/testing/fstest) تُسمّى [`fstest.TestFS`](https://pkg.go.dev/testing/fstest#TestFS). وتتعامل هذه الواجهة البرمجية مع التطبيق كصندوق أسود للتأكد من أنه يحافظ على أبسط أجزاء عقد `io/fs`.

#### كتابة اختبار قبول

بعد أن عرفنا ما هو اختبار القبول ولماذا قد تستخدم واحدًا، لنستكشف بناء اختبار قبول لـ`package chess`، وهي حزمة تُستخدم لمحاكاة مباريات الشطرنج. ويُتوقّع من مستخدمي `chess` تنفيذ واجهة `chess.Player`. وهذه التطبيقات هي الشيء الأساسي الذي سنتحقق منه. ويهتم اختبار القبول لدينا بما إذا كان تطبيق اللاعب يقوم بنقلات قانونية، لا بما إذا كانت النقلات ذكية.

أنشئ حزمة جديدة لسلوك التحقق، [تُسمّى عادةً](#naming-doubles-helper-package) بإلحاق كلمة `test` باسم الحزمة (على سبيل المثال، `chesstest`).

أنشئ الدالة التي تُجري التحقق بأن تقبل التطبيق قيد الاختبار كوسيط وتمتحنه:

```
// ExercisePlayer tests a Player implementation in a single turn on a board.
// The board itself is spot checked for sensibility and correctness.
//
// It returns a nil error if the player makes a correct move in the context
// of the provided board. Otherwise ExercisePlayer returns one of this
// package's errors to indicate how and why the player failed the
// validation.
func ExercisePlayer(b *chess.Board, p chess.Player) error
```

ينبغي أن يبيّن الاختبار أي الثوابت خُرقت وكيف. ويمكن لتصميمك أن يختار بين منهجين للإبلاغ عن الفشل:

**الفشل السريع**: إعادة خطأ فور انتهاك التطبيق لأحد الثوابت.

هذه أبسط مقاربة، وهي تعمل جيدًا إذا كان متوقّعًا أن يُنفَّذ اختبار القبول بسرعة. ويمكن هنا استخدام [القيم العلامية](https://google.github.io/styleguide/go/index.html#gotip) البسيطة للأخطاء و[الأنواع المخصّصة](https://google.github.io/styleguide/go/index.html#gotip) بسهولة، ما يجعل بدوره اختبار اختبار القبول سهلًا.

```
for color, army := range b.Armies {
    // The king should never leave the board, because the game ends at
    // checkmate.
    if army.King == nil {
        return &MissingPieceError{Color: color, Piece: chess.King}
    }
}
```

**تجميع كل حالات الفشل**: جمع كل حالات الفشل والإبلاغ عنها جميعًا.

تشبه هذه المقاربة إرشاد [المتابعة](/book/go-style/decisions-2/index#keep-going) في الإحساس، وقد تكون مفضَّلة إذا كان متوقّعًا أن يُنفَّذ اختبار القبول ببطء.

يجب أن تتحدّد طريقة تجميع حالات الفشل بما إذا كنت تريد منح المستخدمين القدرة أم منح نفسك القدرة على استجواب حالات الفشل الفردية (مثل اختبارك أنت لاختبار القبول). ويوضّح ما يلي استخدام [نوع خطأ مخصّص](https://google.github.io/styleguide/go/index.html#gotip) [يجمع الأخطاء](https://google.github.io/styleguide/go/index.html#gotip):

```javascript
var badMoves []error
move := p.Move()
if putsOwnKingIntoCheck(b, move) {
    badMoves = append(badMoves, PutsSelfIntoCheckError{Move: move})
}
if len(badMoves) > 0 {
    return SimulationError{BadMoves: badMoves}
}
return nil
```

ينبغي أن يحترم اختبار القبول إرشاد [المتابعة](/book/go-style/decisions-2/index#keep-going) بعدم استدعاء `t.Fatal` إلا إذا اكتشف الاختبار خرقًا لثابت في النظام قيد الامتحان.

فمثلًا، ينبغي أن يُحتفَظ بـ`t.Fatal` للحالات الاستثنائية مثل [فشل التهيئة](#test-helper-error-handling) كالمعتاد:

```
func ExerciseGame(t *testing.T, cfg *Config, p chess.Player) error {
    t.Helper()
    if cfg.Simulation == Modem {
        conn, err := modempool.Allocate()
        if err != nil {
            t.Fatalf("No modem for the opponent could be provisioned: %v", err)
        }
        t.Cleanup(func() { modempool.Return(conn) })
    }
    // Run acceptance test (a whole game).
}
```

يمكن أن تساعدك هذه التقنية على إنشاء عمليات تحقق موجزة وقياسية. لكن لا تحاول استخدامها للتحايل على [الإرشادات المتعلقة بالتأكيدات](/book/go-style/decisions-2/index#assert).

ينبغي أن يكون الناتج النهائي بشكل مشابه لما يلي بالنسبة إلى المستخدمين النهائيين:

```python
// Good:
package deepblue_test
import (
    "chesstest"
    "deepblue"
)
func TestAcceptance(t *testing.T) {
    player := deepblue.New()
    err := chesstest.ExerciseGame(t, chesstest.SimpleGame, player)
    if err != nil {
        t.Errorf("Deep Blue player failed acceptance test: %v", err)
    }
}
```

### استخدم النواقل الحقيقية (real transports)

عند اختبار تكامل المكوّنات، وبخاصة حيث يُستخدم HTTP أو RPC ناقلًا أساسيًا (transport) بين المكوّنات، فضّل استخدام الناقل الأساسي الحقيقي للاتصال بنسخة الاختبار من الواجهة الخلفية (backend).

فمثلًا، افترض أن الشيفرة التي تريد اختبارها (يُشار إليها أحيانًا بـ«النظام تحت الاختبار» أو SUT) تتفاعل مع واجهة خلفية تنفّذ واجهة [العمليات الطويلة الأمد (long running operations)](https://pkg.go.dev/google.golang.org/genproto/googleapis/longrunning) البرمجية. لاختبار نظامك تحت الاختبار، استخدم [OperationsClient](https://pkg.go.dev/google.golang.org/genproto/googleapis/longrunning#OperationsClient) حقيقيًا متصلًا بـ[بديل اختباري](https://abseil.io/resources/swe-book/html/ch13.html#basic_concepts) (test double) (مثل محاكٍ أو بديل صوري أو مزيّف) لـ[OperationsServer](https://pkg.go.dev/google.golang.org/genproto/googleapis/longrunning#OperationsServer).

يُوصى بهذا بدلًا من تنفيذ العميل يدويًا، بسبب تعقيد محاكاة سلوك العميل محاكاةً صحيحة. وباستخدام عميل الإنتاج مع خادم خاص بالاختبار، تضمن أن اختبارك يستخدم أكبر قدر ممكن من الشيفرة الحقيقية.

**نصيحة:** حيث أمكن، استخدم مكتبة اختبار يوفّرها مؤلفو الخدمة قيد الاختبار.

### `t.Error` مقابل `t.Fatal`

كما نوقش في [القرارات](/book/go-style/decisions-2/index#keep-going)، ينبغي عمومًا ألّا تتوقف الاختبارات عند أول مشكلة تواجهها.

غير أن بعض الحالات تتطلّب ألّا يستمر الاختبار. ويكون استدعاء `t.Fatal` مناسبًا عندما يفشل جزء من تهيئة الاختبار، وبخاصة في [دوال تهيئة الاختبار المساعدة](#test-helper-error-handling)، التي بدونها لا يمكنك تشغيل بقية الاختبار. وفي اختبار مبني على جدول، يكون `t.Fatal` مناسبًا لحالات الفشل التي تهيّئ دالة الاختبار بأكملها قبل حلقة الاختبار. أما حالات الفشل التي تؤثّر في مدخل واحد من جدول الاختبار، والتي تجعل متابعة ذلك المدخل مستحيلة، فينبغي الإبلاغ عنها كما يلي:

- إذا لم تكن تستخدم اختبارات فرعية عبر `t.Run`، فاستخدم `t.Error` متبوعًا بعبارة `continue` للانتقال إلى مدخل الجدول التالي.
- وإذا كنت تستخدم اختبارات فرعية (وكنت داخل استدعاء لـ`t.Run`)، فاستخدم `t.Fatal`، الذي ينهي الاختبار الفرعي الحالي ويتيح لحالة اختبارك الانتقال إلى الاختبار الفرعي التالي.

**تحذير:** ليس من الآمن دائمًا استدعاء `t.Fatal` والدوال المشابهة. [مزيد من التفاصيل هنا](#t-fatal-goroutine).

### معالجة الأخطاء في دوال الاختبار المساعدة

**ملاحظة:** يناقش هذا القسم [دوال الاختبار المساعدة](/book/go-style/decisions-2/index#mark-test-helpers) بالمعنى الذي تستخدمه Go للمصطلح: دوال تؤدّي تهيئة الاختبار وتنظيفه، لا أدوات التأكيد الشائعة. راجع قسم [دوال الاختبار](#test-functions) لمزيد من النقاش.

قد تفشل العمليات التي تؤدّيها دالة اختبار مساعدة. فمثلًا، يتضمّن إعداد مجلد بملفات عمليات إدخال/إخراج (I/O)، وقد تفشل. وعندما تفشل دوال الاختبار المساعدة، فغالبًا ما يعني فشلها أن الاختبار لا يمكن أن يستمر، لأن شرطًا مسبقًا من شروط التهيئة قد فشل. وعندما يحدث ذلك، فضّل استدعاء إحدى دوال `Fatal` في الدالة المساعدة:

```
// Good:
func mustAddGameAssets(t *testing.T, dir string) {
    t.Helper()
    if err := os.WriteFile(path.Join(dir, "pak0.pak"), pak0, 0644); err != nil {
        t.Fatalf("Setup failed: could not write pak0 asset: %v", err)
    }
    if err := os.WriteFile(path.Join(dir, "pak1.pak"), pak1, 0644); err != nil {
        t.Fatalf("Setup failed: could not write pak1 asset: %v", err)
    }
}
```

فذلك يبقي جانب الاستدعاء أنظف مما لو كانت الدالة المساعدة تعيد الخطأ إلى الاختبار نفسه:

```
// Bad:
func addGameAssets(t *testing.T, dir string) error {
    t.Helper()
    if err := os.WriteFile(path.Join(d, "pak0.pak"), pak0, 0644); err != nil {
        return err
    }
    if err := os.WriteFile(path.Join(d, "pak1.pak"), pak1, 0644); err != nil {
        return err
    }
    return nil
}
```

**تحذير:** ليس من الآمن دائمًا استدعاء `t.Fatal` والدوال المشابهة. [مزيد من التفاصيل](#t-fatal-goroutine) هنا.

ينبغي أن تتضمّن رسالة الفشل وصفًا لما حدث. وهذا مهم، لأنك قد توفّر واجهة اختبار برمجية لمستخدمين كثيرين، وبخاصة مع زيادة عدد الخطوات المنتِجة للأخطاء في الدالة المساعدة. وعندما يفشل الاختبار، ينبغي أن يعرف المستخدم أين ولماذا.

**نصيحة:** قدّمت Go 1.14 دالة [`t.Cleanup`](https://pkg.go.dev/testing#T.Cleanup) يمكن استخدامها لتسجيل دوال تنظيف تُنفَّذ عند اكتمال اختبارك. وتعمل هذه الدالة أيضًا مع دوال الاختبار المساعدة. راجع [GoTip #4: Cleaning Up Your Tests](https://google.github.io/styleguide/go/index.html#gotip) للحصول على إرشادات حول تبسيط دوال الاختبار المساعدة.

يوضّح المقتطف التالي في ملف خيالي يُسمّى `paint_test.go` كيف تؤثّر `(*testing.T).Helper` في الإبلاغ عن الفشل في اختبار Go:

```python
package paint_test
import (
    "fmt"
    "testing"
)
func paint(color string) error {
    return fmt.Errorf("no %q paint today", color)
}
func badSetup(t *testing.T) {
    // This should call t.Helper, but doesn't.
    if err := paint("taupe"); err != nil {
        t.Fatalf("Could not paint the house under test: %v", err) // line 15
    }
}
func goodSetup(t *testing.T) {
    t.Helper()
    if err := paint("lilac"); err != nil {
        t.Fatalf("Could not paint the house under test: %v", err)
    }
}
func TestBad(t *testing.T) {
    badSetup(t)
    // ...
}
func TestGood(t *testing.T) {
    goodSetup(t) // line 32
    // ...
}
```

وفيما يلي مثال على هذا الناتج عند التشغيل. لاحظ النص المميّز وكيف يختلف:

```
=== RUN   TestBad
    paint_test.go:15: Could not paint the house under test: no "taupe" paint today
--- FAIL: TestBad (0.00s)
=== RUN   TestGood
    paint_test.go:32: Could not paint the house under test: no "lilac" paint today
--- FAIL: TestGood (0.00s)
FAIL
```

يشير الخطأ `paint_test.go:15` إلى سطر دالة التهيئة التي فشلت في `badSetup`:

`t.Fatalf("Could not paint the house under test: %v", err)`

في حين يشير `paint_test.go:32` إلى سطر الاختبار الذي فشل في `TestGood`:

`goodSetup(t)`

استخدام `(*testing.T).Helper` استخدامًا صحيحًا ينسب موضع الفشل نسبًا أفضل بكثير عندما:

- تنمو دوال الاختبار المساعدة
- تستدعي دوال الاختبار المساعدة دوال مساعدة أخرى
- ينمو مقدار استخدام الدوال المساعدة في دوال الاختبار

**نصيحة:** إذا استدعت دالة مساعدة `(*testing.T).Error` أو `(*testing.T).Fatal`، فوفّر بعض السياق في سلسلة التنسيق للمساعدة في تحديد ما ساء ولماذا.

**نصيحة:** إذا لم يكن بمقدور أي شيء تفعله دالة مساعدة أن يسبّب فشل اختبار، فهي لا تحتاج إلى استدعاء `t.Helper`. بسّط توقيعها بحذف `t` من قائمة وسائط الدالة.

### لا تستدعِ `t.Fatal` من كوروتينات منفصلة

كما هو [موثَّق في حزمة testing](https://pkg.go.dev/testing#T)، من غير الصحيح استدعاء `t.FailNow` و`t.Fatal` وما شابههما من أي كوروتين (goroutine) غير الكوروتين الذي يشغّل دالة الاختبار (أو الاختبار الفرعي). وإذا بدأ اختبارك كوروتينات جديدة، فيجب ألّا تستدعي هذه الدوال من داخل هذه الكوروتينات.

[دوال الاختبار المساعدة](#test-functions) لا تشير عادةً إلى الفشل من كوروتينات جديدة، ولذلك لا بأس في أن تستخدم `t.Fatal`. وعند الشك، استدعِ `t.Error` وأعِد بدلًا من ذلك.

```javascript
// Good:
func TestRevEngine(t *testing.T) {
    engine, err := Start()
    if err != nil {
        t.Fatalf("Engine failed to start: %v", err)
    }
    num := 11
    var wg sync.WaitGroup
    wg.Add(num)
    for i := 0; i < num; i++ {
        go func() {
            defer wg.Done()
            if err := engine.Vroom(); err != nil {
                // This cannot be t.Fatalf.
                t.Errorf("No vroom left on engine: %v", err)
                return
            }
            if rpm := engine.Tachometer(); rpm > 1e6 {
                t.Errorf("Inconceivable engine rate: %d", rpm)
            }
        }()
    }
    wg.Wait()
    if seen := engine.NumVrooms(); seen != num {
        t.Errorf("engine.NumVrooms() = %d, want %d", seen, num)
    }
}
```

إضافة `t.Parallel` إلى اختبار أو اختبار فرعي لا تجعل استدعاء `t.Fatal` غير آمن.

عندما تكون جميع استدعاءات واجهة `testing` البرمجية في [دالة الاختبار](#test-functions)، يكون اكتشاف الاستخدام غير الصحيح سهلًا عادةً لأن الكلمة المفتاحية `go` ظاهرة للعيان. أما تمرير وسائط `testing.T` هنا وهناك فيجعل تتبّع هذا الاستخدام أصعب. وعادةً يكون سبب تمرير هذه الوسائط إدخال دالة اختبار مساعدة، ولا ينبغي لتلك الدوال أن تعتمد على النظام تحت الاختبار. لذلك، إذا [سجّلت دالة اختبار مساعدة فشلًا قاتلًا](#test-helper-error-handling)، فيمكنها بل ينبغي لها أن تفعل ذلك من كوروتين الاختبار.

### استخدم أسماء الحقول في المركّبات الحرفية للبنى

في الاختبارات المبنية على جدول، فضّل تحديد أسماء الحقول عند تهيئة المركّبات الحرفية لحالات الاختبار. وهذا مفيد عندما تشغل حالات الاختبار مساحة رأسية كبيرة (مثلًا أكثر من 20-30 سطرًا)، وعندما تكون هناك حقول متجاورة من النوع نفسه، وكذلك عندما ترغب في حذف حقول تحمل القيمة الصفرية. فمثلًا:

```
// Good:
func TestStrJoin(t *testing.T) {
    tests := []struct {
        slice     []string
        separator string
        skipEmpty bool
        want      string
    }{
        {
            slice:     []string{"a", "b", ""},
            separator: ",",
            want:      "a,b,",
        },
        {
            slice:     []string{"a", "b", ""},
            separator: ",",
            skipEmpty: true,
            want:      "a,b",
        },
        // ...
    }
    // ...
}
```

### احصر شيفرة التهيئة في اختبارات محدّدة

حيث أمكن، ينبغي أن تكون تهيئة الموارد والاعتماديات محصورة بأقرب ما يمكن بحالات اختبار محدّدة. فمثلًا، بالنظر إلى دالة تهيئة:

```
// mustLoadDataSet loads a data set for the tests.
//
// This example is very simple and easy to read. Often realistic setup is more
// complex, error-prone, and potentially slow.
func mustLoadDataset(t *testing.T) []byte {
    t.Helper()
    data, err := os.ReadFile("path/to/your/project/testdata/dataset")
    if err != nil {
        t.Fatalf("Could not load dataset: %v", err)
    }
    return data
}
```

استدعِ `mustLoadDataset` صراحةً في دوال الاختبار التي تحتاج إليها:

```
// Good:
func TestParseData(t *testing.T) {
    data := mustLoadDataset(t)
    parsed, err := ParseData(data)
    if err != nil {
        t.Fatalf("Unexpected error parsing data: %v", err)
    }
    want := &DataTable{ /* ... */ }
    if got := parsed; !cmp.Equal(got, want) {
        t.Errorf("ParseData(data) = %v, want %v", got, want)
    }
}
func TestListContents(t *testing.T) {
    data := mustLoadDataset(t)
    contents, err := ListContents(data)
    if err != nil {
        t.Fatalf("Unexpected error listing contents: %v", err)
    }
    want := []string{ /* ... */ }
    if got := contents; !cmp.Equal(got, want) {
        t.Errorf("ListContents(data) = %v, want %v", got, want)
    }
}
func TestRegression682831(t *testing.T) {
    if got, want := guessOS("zpc79.example.com"), "grhat"; got != want {
        t.Errorf(`guessOS("zpc79.example.com") = %q, want %q`, got, want)
    }
}
```

دالة الاختبار `TestRegression682831` لا تستخدم مجموعة البيانات، ولذلك لا تستدعي `mustLoadDataset`، التي قد تكون بطيئة ومعرّضة للفشل:

```javascript
// Bad:
var dataset []byte
func TestParseData(t *testing.T) {
    // As documented above without calling mustLoadDataset directly.
}
func TestListContents(t *testing.T) {
    // As documented above without calling mustLoadDataset directly.
}
func TestRegression682831(t *testing.T) {
    if got, want := guessOS("zpc79.example.com"), "grhat"; got != want {
        t.Errorf(`guessOS("zpc79.example.com") = %q, want %q`, got, want)
    }
}
func init() {
    dataset = mustLoadDataset()
}
```

قد يرغب المستخدم في تشغيل دالة بمعزل عن غيرها، وينبغي ألّا يتضرّر بهذه العوامل:

```bash
# No reason for this to perform the expensive initialization.
$ go test -run TestRegression682831
```

#### متى تستخدم نقطة دخول `TestMain` مخصّصة

إذا كانت **جميع الاختبارات في الحزمة** تتطلّب تهيئة مشتركة و**كانت التهيئة تتطلّب تفكيكًا**، فيمكنك استخدام [نقطة دخول testmain مخصّصة](https://golang.org/pkg/testing/#hdr-Main). وقد يحدث ذلك إذا كان المورد الذي تتطلّبه حالات الاختبار مكلفًا بشكل خاص في التهيئة، وكانت الكلفة ينبغي أن توزّع. وعادةً تكون قد استخرجت أي اختبارات غير مرتبطة من مجموعة الاختبارات عند هذه النقطة. ولا يُستخدم ذلك عادةً إلا في [الاختبارات الوظيفية](https://en.wikipedia.org/wiki/Functional_testing).

استخدام `TestMain` مخصّصة **ينبغي ألّا يكون خيارك الأول** بسبب القدر الكبير من العناية الواجب توخّيها للاستخدام الصحيح. انظر أولًا فيما إذا كان الحل في قسم [*توزيع كلفة التهيئة المشتركة للاختبارات*](#t-setup-amortization) أو [دالة اختبار مساعدة](#t-common-setup-scope) عادية كافيًا لاحتياجاتك.

```javascript
// Good:
var db *sql.DB
func TestInsert(t *testing.T) { /* omitted */ }
func TestSelect(t *testing.T) { /* omitted */ }
func TestUpdate(t *testing.T) { /* omitted */ }
func TestDelete(t *testing.T) { /* omitted */ }
// runMain sets up the test dependencies and eventually executes the tests.
// It is defined as a separate function to enable the setup stages to clearly
// defer their teardown steps.
func runMain(ctx context.Context, m *testing.M) (code int, err error) {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()
    d, err := setupDatabase(ctx)
    if err != nil {
        return 0, err
    }
    defer d.Close() // Expressly clean up database.
    db = d          // db is defined as a package-level variable.
    // m.Run() executes the regular, user-defined test functions.
    // Any defer statements that have been made will be run after m.Run()
    // completes.
    return m.Run(), nil
}
func TestMain(m *testing.M) {
    code, err := runMain(context.Background(), m)
    if err != nil {
        // Failure messages should be written to STDERR, which log.Fatal uses.
        log.Fatal(err)
    }
    // NOTE: defer statements do not run past here due to os.Exit
    //       terminating the process.
    os.Exit(code)
}
```

من المثالي أن تكون حالة الاختبار محكمة العزل بين استدعاءاتها المتكرّرة وبين حالات الاختبار الأخرى.

وعلى الأقل، تأكّد من أن حالات الاختبار الفردية تعيد ضبط أي حالة عامة عدّلتها إن كانت قد فعلت ذلك (مثلًا، إذا كانت الاختبارات تتعامل مع قاعدة بيانات خارجية).

#### توزيع كلفة التهيئة المشتركة للاختبارات

قد يكون استخدام `sync.Once` مناسبًا، وإن لم يكن مطلوبًا، إذا صحّت كل الحالات التالية بشأن التهيئة المشتركة:

- أن تكون مكلفة.
- أن تنطبق على بعض الاختبارات فقط.
- ألّا تتطلّب تفكيكًا.

```javascript
// Good:
var dataset struct {
    once sync.Once
    data []byte
    err  error
}
func mustLoadDataset(t *testing.T) []byte {
    t.Helper()
    dataset.once.Do(func() {
        data, err := os.ReadFile("path/to/your/project/testdata/dataset")
        // dataset is defined as a package-level variable.
        dataset.data = data
        dataset.err = err
    })
    if err := dataset.err; err != nil {
        t.Fatalf("Could not load dataset: %v", err)
    }
    return dataset.data
}
```

وعندما تُستخدم `mustLoadDataset` في دوال اختبار متعددة، تتوزّع كلفتها:

```
// Good:
func TestParseData(t *testing.T) {
    data := mustLoadDataset(t)
    // As documented above.
}
func TestListContents(t *testing.T) {
    data := mustLoadDataset(t)
    // As documented above.
}
func TestRegression682831(t *testing.T) {
    if got, want := guessOS("zpc79.example.com"), "grhat"; got != want {
        t.Errorf(`guessOS("zpc79.example.com") = %q, want %q`, got, want)
    }
}
```

سبب صعوبة التفكيك المشترك هو عدم وجود موضع موحّد لتسجيل روتينات التنظيف. فإذا كانت دالة التهيئة (في هذه الحالة `mustLoadDataset`) تعتمد على سياق، فقد يكون `sync.Once` مشكِلًا. والسبب أن الثانية من استدعاءين متسابقين لدالة التهيئة ستحتاج إلى انتظار انتهاء الاستدعاء الأول قبل أن تعود. ولا يمكن جعل هذه الفترة من الانتظار تحترم إلغاء السياق بسهولة.

## دمج السلاسل النصية

هناك عدة طرق لدمج السلاسل النصية في Go. تشمل بعض الأمثلة:

- معامل «+»
- `fmt.Sprintf`
- `strings.Builder`
- `text/template`
- `safehtml/template`

ورغم عدم وجود قاعدة واحدة تناسب الجميع للاختيار بينها، يوضّح الإرشاد التالي متى تُفضَّل كل طريقة.

### فضّل «+» في الحالات البسيطة

فضّل استخدام «+» عند دمج سلاسل قليلة. فهذه الطريقة أبسط نحويًا ولا تتطلّب أي استيراد.

```
// Good:
key := "projectid: " + p
```

### فضّل `fmt.Sprintf` عند التنسيق

فضّل استخدام `fmt.Sprintf` عند بناء سلسلة معقّدة بتنسيق. فاستخدام معاملات «+» كثيرة قد يحجب الناتج النهائي.

```
// Good:
str := fmt.Sprintf("%s [%s:%d]-> %s", src, qos, mtu, dst)
```

```
// Bad:
bad := src.String() + " [" + qos.String() + ":" + strconv.Itoa(mtu) + "]-> " + dst.String()
```

**أفضل ممارسة:** عندما يكون ناتج عملية بناء السلسلة من نوع `io.Writer`، فلا تُنشئ سلسلة مؤقتة بـ`fmt.Sprintf` فقط لإرسالها إلى Writer. بل استخدم `fmt.Fprintf` للإخراج إلى Writer مباشرة.

وعندما يكون التنسيق أكثر تعقيدًا، فضّل [`text/template`](https://pkg.go.dev/text/template) أو [`safehtml/template`](https://pkg.go.dev/github.com/google/safehtml/template) حسب الاقتضاء.

### فضّل `strings.Builder` لبناء السلسلة تدريجيًا

فضّل استخدام `strings.Builder` عند بناء سلسلة قطعةً قطعة. فتأخذ `strings.Builder` وقتًا خطيًا موزّعًا (amortized)، بينما يأخذ «+» و`fmt.Sprintf` وقتًا تربيعيًا عند استدعائهما تباعًا لتكوين سلسلة أكبر.

```
// Good:
b := new(strings.Builder)
for i, d := range digitsOfPi {
    fmt.Fprintf(b, "the %d digit of pi is: %d\n", i, d)
}
str := b.String()
```

**ملاحظة:** لمزيد من النقاش، راجع [GoTip #29: Building Strings Efficiently](https://google.github.io/styleguide/go/index.html#gotip).

### السلاسل الثابتة

فضّل استخدام علامات الاقتباس الخلفية (`) عند إنشاء سلاسل حرفية ثابتة متعددة الأسطر.

```
// Good:
usage := `Usage:

custom_tool [args]`
```

```
// Bad:
usage := "" +
  "Usage:\n" +
  "\n" +
  "custom_tool [args]"
```

## الحالة العامة

ينبغي ألّا تُجبر المكتبات عملاءها على استخدام واجهات برمجية تعتمد على [حالة عامة (global state)](https://en.wikipedia.org/wiki/Global_variable). ويُنصَح بعدم كشف واجهات برمجية أو تصدير متغيّرات [على مستوى الحزمة](https://go.dev/ref/spec#TopLevelDecl) تتحكّم في سلوك جميع العملاء كأجزاء من واجهتها البرمجية. ويستخدم باقي هذا القسم تعبيرَي «العامة» و«حالة مستوى الحزمة» بالمعنى نفسه.

بدلًا من ذلك، إذا حافظت وظيفتك على حالة، فأتح لعملائك إنشاء قيم نسخ (instance values) واستخدامها.

**مهم:** بينما ينطبق هذا الإرشاد على جميع المطورين، فهو الأكثر أهمية لمزوّدي البنية التحتية الذين يقدّمون مكتبات وتكاملات وخدمات لفرق أخرى.

```
// Good:
// Package sidecar manages subprocesses that provide features for applications.
package sidecar
type Registry struct { plugins map[string]*Plugin }
func New() *Registry { return &Registry{plugins: make(map[string]*Plugin)} }
func (r *Registry) Register(name string, p *Plugin) error { ... }
```

سيُنشئ مستخدموك البيانات التي يحتاجون إليها (`*sidecar.Registry`) ثم يمرّرونها كاعتمادية صريحة:

```
// Good:
package main
func main() {
  sidecars := sidecar.New()
  if err := sidecars.Register("Cloud Logger", cloudlogger.New()); err != nil {
    log.Exitf("Could not setup cloud logger: %v", err)
  }
  cfg := &myapp.Config{Sidecars: sidecars}
  myapp.Run(context.Background(), cfg)
}
```

هناك مقاربات مختلفة لترحيل الشيفرة الموجودة لدعم تمرير الاعتماديات. والمقاربة الرئيسية التي ستستخدمها هي تمرير الاعتماديات كوسائط إلى الدوال البانية (constructors) والدوال والطرائق أو كحقول بنى في سلسلة الاستدعاء.

انظر أيضًا:

- [Go Tip #5: Slimming Your Client Libraries](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #24: Use Case-Specific Constructions](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #40: Improving Time Testability with Function Parameters](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #41: Identify Function Call Parameters](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #44: Improving Time Testability with Struct Fields](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)

تصبح الواجهات البرمجية التي لا تدعم تمرير الاعتماديات صريحًا هشّة مع تزايد عدد العملاء:

```javascript
// Bad:
package sidecar
var registry = make(map[string]*Plugin)
func Register(name string, p *Plugin) error { /* registers plugin in registry */ }
```

تأمّل ما يحدث في حالة اختبارات تمارس شيفرة تعتمد اعتمادًا غير مباشر على sidecar للتسجيل السحابي.

```python
// Bad:
package app
import (
  "cloudlogger"
  "sidecar"
  "testing"
)
func TestEndToEnd(t *testing.T) {
  // The system under test (SUT) relies on a sidecar for a production cloud
  // logger already being registered.
  ... // Exercise SUT and check invariants.
}
func TestRegression_NetworkUnavailability(t *testing.T) {
  // We had an outage because of a network partition that rendered the cloud
  // logger inoperative, so we added a regression test to exercise the SUT with
  // a test double that simulates network unavailability with the logger.
  sidecar.Register("cloudlogger", cloudloggertest.UnavailableLogger)
  ... // Exercise SUT and check invariants.
}
func TestRegression_InvalidUser(t *testing.T) {
  // The system under test (SUT) relies on a sidecar for a production cloud
  // logger already being registered.
  //
  // Oops. cloudloggertest.UnavailableLogger is still registered from the
  // previous test.
  ... // Exercise SUT and check invariants.
}
```

تُنفَّذ اختبارات Go تباعًا افتراضيًا، لذا تعمل الاختبارات أعلاه كما يلي:

1. `TestEndToEnd`
2. `TestRegression_NetworkUnavailability`، الذي يتجاوز القيمة الافتراضية لـcloudlogger
3. `TestRegression_InvalidUser`، الذي يتطلّب القيمة الافتراضية لـcloudlogger المسجَّلة في `package sidecar`

وهذا يُنشئ حالة اختبار تعتمد على الترتيب، ما يعطّل التشغيل بمرشّحات الاختبار، ويمنع تشغيل الاختبارات على التوازي أو تقسيمها إلى أجزاء (sharding).

يطرح استخدام الحالة العامة مشكلات تفتقر إلى إجابات سهلة لك ولعملاء الواجهة البرمجية:

- ماذا يحدث إذا احتاج عميل إلى استخدام مجموعتين مختلفتين تعملان بشكل منفصل من `Plugin` (مثلًا، لدعم عدة خوادم) في مساحة العملية نفسها؟
- ماذا يحدث إذا أراد عميل استبدال `Plugin` مسجَّل بتطبيق بديل في اختبار، مثل [بديل اختباري](https://abseil.io/resources/swe-book/html/ch13.html)؟ وماذا يحدث إذا تطلّبت اختبارات عميل عزلًا محكمًا (hermeticity) بين نسخ `Plugin`، أو بين جميع الإضافات (plugins) المسجَّلة؟
- ماذا يحدث إذا سجّل عدة عملاء `Plugin` بالاسم نفسه؟ أيّها يفوز، إن وُجد؟ كيف ينبغي [معالجة](/book/go-style/decisions-2/index#handle-errors) الأخطاء؟ وإذا أصدرت الشيفرة حالة ذعر أو استدعت `log.Fatal`، فهل سيكون ذلك دائمًا [مناسبًا لجميع المواضع التي ستُستدعى فيها الواجهة البرمجية](/book/go-style/decisions-2/index#dont-panic)؟ وهل يمكن للعميل أن يتحقق من أنه لا يفعل شيئًا سيئًا قبل أن يفعله؟
- هل هناك مراحل معيّنة في مراحل بدء تشغيل البرنامج أو عمره يمكن فيها استدعاء `Register` ومراحل لا يمكن؟ وماذا يحدث إذا استُدعيت `Register` في الوقت الخطأ؟ فقد يستدعي العميل `Register` في [`func init`](https://go.dev/ref/spec#Package_initialization)، قبل تحليل الأعلام، أو بعد `main`. والمرحلة التي تُستدعى فيها الدالة تؤثّر في معالجة الأخطاء. وإذا افترض مؤلف الواجهة البرمجية أن الواجهة تُستدعى *فقط* أثناء تهيئة البرنامج دون أن يكون ذلك مطلوبًا، فقد يدفعه هذا الافتراض إلى تصميم معالجة الأخطاء [لإجهاض البرنامج](/book/go-style/best-practices-2/index#program-init) بنمذجة الواجهة كدالة شبيهة بـ`Must`. وإجهاض البرنامج ليس مناسبًا لدوال المكتبات العامة التي يمكن استخدامها في أي مرحلة.
- ماذا لو كانت احتياجات التزامن لدى العميل والمصمّم غير متوافقة؟

انظر أيضًا:

- [Go Tip #36: Enclosing Package-Level State](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #71: Reducing Parallel Test Flakiness](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)
- معالجة الأخطاء: [Look Before You Leap](https://docs.python.org/3/glossary.html#term-LBYL) مقابل [Easier to Ask for Forgiveness than Permission](https://docs.python.org/3/glossary.html#term-EAFP)
- [Unit Testing Practices on Public APIs](/book/go-style/index/index#unit-testing-practices)

للحالة العامة آثار متتالية على [صحة قاعدة شيفرة Google](/book/go-style/guide/index#maintainability). وينبغي التعامل مع الحالة العامة بـ**تدقيق بالغ**.

[تأتي الحالة العامة بأشكال عدة](#globals-forms)، ويمكنك استخدام بعض [اختبارات عباد الشمس (litmus tests) لتحديد متى تكون آمنة](#globals-litmus-tests).

### الأشكال الرئيسية لواجهات حالة الحزمة البرمجية

عدّدنا أدناه عدة صور من أكثر صور الواجهات البرمجية الشائعة إشكالًا:

المتغيّرات على المستوى الأعلى، بصرف النظر عمّا إذا كانت مصدَّرة.

```javascript
// Bad:
package logger
// Sinks manages the default output sources for this package's logging API.  This
// variable should be set at package initialization time and never thereafter.
var Sinks []Sink
```

راجع [اختبارات عباد الشمس](#globals-litmus-tests) لمعرفة متى تكون هذه آمنة.

[نمط محدِّد الخدمة (service locator)](https://en.wikipedia.org/wiki/Service_locator_pattern). راجع [المثال الأول](#globals). نمط محدِّد الخدمة نفسه ليس إشكاليًا، بل كون المحدِّد معرَّفًا كحالة عامة.

سجلات [عمليات الاستدعاء الراجعة (callbacks)](https://en.wikipedia.org/wiki/Callback_\(computer_programming\)) والسلوكيات المشابهة.

```javascript
// Bad:
package health
var unhealthyFuncs []func
func OnUnhealthy(f func()) {
  unhealthyFuncs = append(unhealthyFuncs, f)
}
```

المفردات (singletons) من العملاء السميكين للأشياء مثل الواجهات الخلفية والتخزين وطبقات الوصول إلى البيانات وغيرها من موارد النظام. وتطرح هذه غالبًا مشكلات إضافية تتعلق بموثوقية الخدمة.

```javascript
// Bad:
package useradmin
var client pb.UserAdminServiceClientInterface
func Client() *pb.UserAdminServiceClient {
    if client == nil {
        client = ...  // Set up client.
    }
    return client
}
```

> **ملاحظة:** كثير من الواجهات البرمجية القديمة في قاعدة شيفرة Google لا تتبع هذا الإرشاد؛ بل إن بعض مكتبات Go القياسية تسمح بالتهيئة عبر قيم عامة. ومع ذلك، فإن مخالفة الواجهة القديمة لهذا الإرشاد **[ينبغي ألّا تُستخدم سابقة](/book/go-style/guide/index#local-consistency)** لمواصلة النمط.
> > من الأفضل الاستثمار في تصميم واجهة برمجية سليم اليوم من دفع كلفة إعادة تصميمها لاحقًا.

### اختبارات عباد الشمس

[الواجهات البرمجية التي تستخدم الأنماط أعلاه](#globals-forms) غير آمنة عندما:

- تتفاعل دوال متعددة عبر حالة عامة عند تنفيذها في البرنامج نفسه، رغم كونها مستقلة فيما عدا ذلك (مثلًا، مكتوبة من مؤلفين مختلفين في مجلدات شديدة الاختلاف).
- تتفاعل حالات اختبار مستقلة بعضها مع بعض عبر حالة عامة.
- يُغرى مستخدمو الواجهة البرمجية بتبديل الحالة العامة أو استبدالها لأغراض الاختبار، وبخاصة استبدال أي جزء من الحالة بـ[بديل اختباري](https://abseil.io/resources/swe-book/html/ch13.html)، مثل بديل صوري أو مزيّف أو جاسوس أو محاكٍ.
- يضطر المستخدمون إلى مراعاة متطلبات ترتيب خاصة عند التعامل مع الحالة العامة: `func init`، وما إذا كانت الأعلام قد حُلّلت بعد، وما شابه.

شريطة تجنّب الشروط أعلاه، هناك **ظروف محدودة قليلة تكون فيها هذه الواجهات البرمجية آمنة**، وهي عندما يصدق أي ممّا يلي:

- أن تكون الحالة العامة ثابتة منطقيًا ([مثال](https://github.com/klauspost/compress/blob/290f4cfacb3eff892555a491e3eeb569a48665e7/zstd/snappy.go#L413)).
- أن يكون السلوك الملاحَظ للحزمة بلا حالة (stateless). فمثلًا، قد تستخدم دالة عامة متغيّرًا عامًا خاصًا كذاكرة مؤقتة، ولكن ما دام المستدعي لا يستطيع التمييز بين إصابات الذاكرة المؤقتة وإخفاقاتها، فالدالة بلا حالة.
- ألّا تتسرّب الحالة العامة إلى أشياء خارجية عن البرنامج، مثل عمليات sidecar أو الملفات على نظام ملفات مشترك.
- ألّا يكون هناك توقّع لسلوك قابل للتنبؤ ([مثال](https://pkg.go.dev/math/rand)).

> **ملاحظة:** قد **لا** تكون [عمليات sidecar](https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/ch02.html) محلية للعملية بالمعنى الدقيق. فهي يمكن أن تُشارَك، بل غالبًا ما تُشارَك، مع أكثر من عملية تطبيق واحدة. علاوةً على ذلك، غالبًا ما تتفاعل هذه العمليات الجانبية مع أنظمة موزّعة خارجية.
> > وبالإضافة إلى الاعتبارات الأساسية أعلاه، تنطبق القواعد نفسها المتعلقة بانعدام الحالة وكونها متساوية الأثر (idempotent) ومحلية على شيفرة عملية sidecar نفسها!

من أمثلة هذه الحالات الآمنة [`package image`](https://pkg.go.dev/image) مع دالتها [`image.RegisterFormat`](https://pkg.go.dev/image#RegisterFormat). تأمّل اختبارات عباد الشمس أعلاه مطبَّقة على مفكّك ترميز نمطي، مثل مفكّك ترميز صيغة [PNG](https://pkg.go.dev/image/png):

- الاستدعاءات المتعددة لواجهات `package image` البرمجية التي تستخدم مفكّكات الترميز المسجَّلة (مثل `image.Decode`) لا يمكن أن تتعارض بعضها مع بعض، وكذلك الحال في الاختبارات. والاستثناء الوحيد هو `image.RegisterFormat`، لكن النقاط أدناه تخفّف من ذلك.
- من المستبعد جدًا أن يرغب مستخدم في استبدال مفكّك ترميز بـ[بديل اختباري](https://abseil.io/resources/swe-book/html/ch13.html)، إذ يجسّد مفكّك ترميز PNG حالة تنطبق فيها تفضيلات قاعدة شيفرتنا للأجسام الحقيقية. غير أن المستخدم أكثر ميلًا إلى استبدال مفكّك ترميز ببديل اختباري إذا كان مفكّك الترميز يتفاعل مع موارد نظام التشغيل تفاعلًا حفظيًا (statefully) (مثل الشبكة).
- التصادمات في التسجيل واردة، وإن كانت نادرة في الممارسة على الأرجح.
- مفكّكات الترميز بلا حالة، ومتساوية الأثر (idempotent)، ونقية.

### توفير نسخة افتراضية

رغم أنه غير موصى به، لا بأس في توفير واجهة برمجية مبسّطة تستخدم حالة على مستوى الحزمة إذا احتجت إلى تعظيم الراحة للمستخدم.

اتبع [اختبارات عباد الشمس](#globals-litmus-tests) مع هذه الإرشادات في مثل هذه الحالات:

يجب أن تتيح الحزمة للعملاء القدرة على إنشاء نسخ معزولة من أنواع الحزمة كما [وُصف أعلاه](#globals-forms). ويجب أن تكون الواجهات البرمجية العامة التي تستخدم حالة عامة وكيلًا رقيقًا للواجهة السابقة. ومن الأمثلة الجيدة على ذلك أن [`http.Handle`](https://pkg.go.dev/net/http#Handle) يستدعي داخليًا [`(*http.ServeMux).Handle`](https://pkg.go.dev/net/http#ServeMux.Handle) على المتغيّر على مستوى الحزمة [`http.DefaultServeMux`](https://pkg.go.dev/net/http#DefaultServeMux).

يجب ألّا تُستخدم هذه الواجهة البرمجية على مستوى الحزمة إلا من [أهداف البناء الثنائية](https://github.com/bazelbuild/rules_go/blob/master/docs/go/core/rules.md#go_binary)، لا من [المكتبات](https://github.com/bazelbuild/rules_go/blob/master/docs/go/core/rules.md#go_library)، ما لم تكن المكتبات تخوض عملية إعادة هيكلة لدعم تمرير الاعتماديات. ويجب ألّا تعتمد مكتبات البنية التحتية القابلة للاستيراد من حزم أخرى على الحالة على مستوى الحزمة للحزم التي تستوردها.

فمثلًا، مزوّد بنية تحتية ينفّذ sidecar يُشارَك مع فرق أخرى تستخدم الواجهة البرمجية من الأعلى ينبغي أن يوفّر واجهة برمجية تستوعب ذلك:

```
// Good:
package cloudlogger
func New() *Logger { ... }
func Register(r *sidecar.Registry, l *Logger) {
  r.Register("Cloud Logging", l)
}
```

ويجب أن [توثّق](#documentation-conventions) هذه الواجهة البرمجية على مستوى الحزمة ثوابتها وتفرضها (مثلًا، في أي مرحلة من عمر البرنامج يمكن استدعاؤها، وما إذا كان يمكن استخدامها بالتزامن). علاوةً على ذلك، يجب أن توفّر واجهة برمجية لإعادة ضبط الحالة العامة إلى قيمة افتراضية سليمة معروفة (مثلًا، لتسهيل الاختبار).

انظر أيضًا:

- [Go Tip #36: Enclosing Package-Level State](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)

## الواجهات

تتسم الواجهات في Go بالقوة، لكن يمكن الإفراط في استخدامها أو إساءة فهمها. ولأن واجهات Go تُحقَّق ضمنًا، فهي أداة بنيوية لا إعلانية. ويقدّم الإرشاد التالي أفضل ممارسات تصميم الواجهات وإعادتها في Go دون إفراط في هندسة قاعدة شيفرتك.

راجع [قسم الواجهات في وثيقة القرارات](/book/go-style/decisions-2/index#interfaces) للحصول على ملخّص.

### تجنّب الواجهات غير الضرورية

الخطأ الأكثر شيوعًا هو إنشاء واجهة قبل وجود [حاجة حقيقية](/book/go-style/guide/index#simplicity).

1. **لا تخلط بين المفهوم والكلمة المفتاحية:** مجرّد أنك تصمّم «خدمة» أو «مستودعًا» أو نمطًا مشابهًا لا يعني أنك تحتاج إلى نوع واجهة مسمّى (مثل `type Service interface`). ركّز على السلوك وتطبيقه الملموس أولًا.
2. **أعِد استخدام الواجهات الموجودة:** إذا كانت واجهة موجودة بالفعل، وبخاصة في الشيفرة المولّدة، مثل عميل RPC أو خادمه، فاستخدمها ([اختبار RPC](https://codelabs.developers.google.com/grpc/getting-started-grpc-go#3)). لا تُغلّف شيفرة RPC مولّدة في واجهة يدوية جديدة لمجرد التجريد أو الاختبار. [استخدم النواقل الحقيقية](#use-real-transports) بدلًا من ذلك.
3. **لا تعرّف أبوابًا خلفية للاختبارات فقط:** لا تصدّر تطبيق [بديل اختباري](https://abseil.io/resources/swe-book/html/ch13.html) لواجهة من واجهة برمجية تستهلكها. بل فضّل تصميم الواجهة البرمجية بحيث يمكن اختبارها باستخدام [الواجهة البرمجية العامة](https://abseil.io/resources/swe-book/html/ch12.html#test_via_public_apis) للتطبيق الحقيقي. فكل نوع مصدَّر يزيد الحمل المعرفي على القارئ. وعندما تصدّر بديلًا اختباريًا إلى جانب التطبيق الحقيقي، فإنك تفرض على القارئ فهم ثلاثة كيانات (الواجهة والتطبيق الحقيقي والبديل الاختباري) بدلًا من كيان واحد. صدّر واجهة لبديل اختباري عندما تكون لديك [حاجة جوهرية](/book/go-style/guide/index#least-mechanism) لدعم الاستبدال.

وعندما يكون من المنطقي فعلًا إنشاء واجهة:

1. **تطبيقات متعددة:** عندما يكون هناك نوعان ملموسان أو أكثر يجب التعامل معهما بالمنطق نفسه (مثل شيء يعمل مع كل من [json.Encoder](https://pkg.go.dev/encoding/json#Encoder) و[gob.GobEncoder](https://pkg.go.dev/encoding/gob#GobEncoder))، فيمكن لمستهلك الواجهة البرمجية تعريف واجهة.
2. **فصل الحزم:** لكسر الاعتماديات الدائرية بين حزمتين (راجع [مثالًا](#avoiding-circular-dependencies))، يمكن لمنتج الواجهة البرمجية تعريف واجهة. **تحذير:** راقب بعناية الإرشادات المتعلقة بـ[حجم الحزمة](#package-size). فإدخال واجهات لكسر دورات الاعتماديات غالبًا ما يكون إشارة إلى حزم غير منظمة تنظيمًا سليمًا.
3. **إخفاء التعقيد:** عندما يكون لنوع ملموس سطح واجهة برمجية ضخم، لكن دالة محدّدة لا تحتاج إلا إلى طريقة أو طريقتين، فقد يعرّف مستهلك الواجهة البرمجية واجهة.

### ملكية الواجهة وظهورها

1. **لا تصدّر أنواع الواجهات دون داعٍ:** إذا كانت واجهة تُستخدم داخليًا فقط ضمن حزمة لتلبية مسار منطقي محدّد، فأبقِ الواجهة غير مصدَّرة. فتصدير واجهة يُلزمك بصيانة تلك الواجهة البرمجية للمستدعين الخارجيين.
2. **المستهلك هو من يعرّف الواجهة:** في Go، تنتمي الواجهات عمومًا إلى الحزمة التي تستخدمها، لا الحزمة التي تنفّذها. وينبغي أن يعرّف المستهلك الطرائق التي يستخدمها فعليًا فقط [GoTip #78: Minimal Viable Interfaces](https://google.github.io/styleguide/go/index.html#gotip)، التزامًا بفكرة أن [كلما كبرت الواجهة، ضعف التجريد](https://go-proverbs.github.io/). وهناك سيناريوهات شائعة يكون من المنطقي فيها غالبًا أن يصدّر المنتج (الحزمة التي توفّر المنطق) الواجهة: **الواجهة هي المنتج:** عندما يكون الغرض الأساسي لحزمة توفير بروتوكول مشترك يجب أن تتبعه تطبيقات مختلفة كثيرة، يعرّف المنتج الواجهة. مثل [io.Writer](https://pkg.go.dev/io#Writer) و[hash.Hash](https://pkg.go.dev/hash#Hash). ويشمل مفهوم «البروتوكول» جوانب مثل [التوثيق](#documentation) حول السلوكيات الحرجة (مثل حالة الاستخدام المتوقعة والحالات الحدّية والتزامن) التي تحتاج إلى شرح مركزي وقانوني. ومن الأمثلة البارزة الأخرى على ذلك الواجهات المولّدة من protobuf. فهي لا تجرّد سلوكًا محدّدًا، بل تعرّف حدًّا. وغرضها ضمان أن يطابق تطبيق خادمك المخطط التعريفي المحدَّد في ملف `.proto` مطابقة تامة. وهنا تعمل الواجهة كعقد قانوني صارم بين الخدمة وعملائها. وفي الأنظمة الكبيرة، إذا كانت الواجهة تعيش داخل حزمة تطبيق ضخمة، فكل عميل يُجبَر على استيراد العالم كله لمجرد الإشارة إلى الواجهة. ويمكنك تعريف الواجهة في حزمة مستقلة خالية من التطبيق، متجنّبًا الرموز غير الضرورية والاعتماديات الدائرية المحتملة. وهذه هي الفلسفة نفسها التي تتبعها الشيفرة المولّدة من protobuf.
3. **امنع تضخّم الواجهة:** في قواعد الشيفرة الكبيرة، تصبح الصيانة صعبة إذا استخدمت حزم كثيرة `AuthService` نفسه بينما تعرّف كل منها `type Authorizer interface` مطابقًا. وبينما تفضّل Go غالبًا [قليلًا من النسخ على قليل من الاعتماديات](https://go-proverbs.github.io/)، فتذكّر أن صيانة واجهات متطابقة تمامًا (راجع النقطة أعلاه) عبر حزم كثيرة قد يخلق عبئًا لا داعي له.
4. **حلّ الاعتمادية الدائرية:** راجع [مثالًا](#avoiding-circular-dependencies) أدناه.

### تصميم واجهات فعّالة

1. **أبقِ الواجهات صغيرة:** كلما كبرت الواجهة، [صعب تنفيذها وكتابة شيفرة تستفيد منها](https://go-proverbs.github.io/). فمن الأسهل تركيب الواجهات الصغيرة في واجهات أكبر عند الحاجة.
2. **التوثيق:** عامل كل واجهة كأنها «دليل المستخدم» لتجريدك. وينبغي أن يتناسب عمق توثيقك مع الحمل المعرفي للواجهة، لا مع عدد طرائقها فحسب. وسواء أكانت الواجهة تحتوي عشرة طرائق أم طريقة `Write` واحدة من [io.Writer](https://pkg.go.dev/io#Writer)، فإذا كان متوقّعًا من مبرمج أن يتعامل مع ذلك النوع، فيجب توثيق الواجهة البرمجية توثيقًا وافيًا. **الواجهات ذات الطريقة الواحدة:** يكفي عادةً التوثيق على النوع نفسه (مثل io.Writer). اشرح عقدها وحالاتها الحدّية وأخطاءها المتوقعة.
3. **الواجهات متعددة الطرائق:** تتطلّب كل طريقة على حدة توثيقها الخاص.
4. **الواجهات غير المصدَّرة:** فكّر في توثيقها على أي حال. فهي غالبًا الغراء الذي يمسك المنطق الداخلي المعقّد معًا، ولأنها غير مرئية للمستخدمين الخارجيين، فقد تصبح بسهولة شيفرة غامضة للقائمين على الصيانة مستقبلًا (بمن فيهم أنت مستقبلًا).
5. **اقبل الواجهات، وأعِد الأنواع الملموسة:** إعادة نوع ملموس تتيح للمستدعي استخدام الوظائف الكاملة للقيمة دون الارتباط بتجريد واجهة محدّد [GoTip #49: Accept Interfaces, Return Concrete Types](https://google.github.io/styleguide/go/index.html#gotip).

هناك عدة سيناريوهات شائعة تكون فيها إعادة واجهة هي الخيار الاصطلاحي:

**التغليف (Encapsulation):** بينما لا تستطيع الواجهات إخفاء الطرائق المصدَّرة إخفاءً تامًا (لأنها تبقى قابلة للوصول عبر تأكيدات النوع)، فإن إعادة واجهة أداة قوية لتقييد سطح الواجهة البرمجية الافتراضي وتوجيه سلوك المستدعي. والمثال الأكثر شيوعًا هو واجهة `error`؛ فأنت [لا تعيد أبدًا تقريبًا نوع خطأ ملموسًا](/book/go-style/decisions-2/index#errors) مثل `*MyCustomError`.

تأمّل `ThrottledReader` ينفّذ `io.Reader` لكن له أيضًا طريقة `Refill` لإدارة دلو الرموز الداخلي. إن إعادة `*ThrottledReader` الملموس تدعو المستدعي إلى إدارة الدلو يدويًا، ما قد يؤدي إلى حالات سباق (race conditions) أو منطق تحديد معدّل معطوب. أما بإعادة واجهة، فأنت تخبر المستدعي أن مهمتك الوحيدة هي استهلاك هذا القارئ. وإذا حاولت إعادة تحويل هذا إلى `ThrottledReader` لـ`Refill` الدلو الداخلي، فأنت تخرق العقد.

```python
// Good:
type ThrottledReader struct {
    source     io.Reader
    limit      int  // bytes per second
    balance    int  // current allowance of bytes
    lastRefill time.Time
}
// Read implements the io.Reader interface with rate-limiting logic.
func (t *ThrottledReader) Read(p []byte) (int, error) { ... }
// Refill manually adds tokens to the bucket.
// INTERNAL USE ONLY: Calling this from outside breaks the rate limit logic.
func (t *ThrottledReader) Refill(amount int) {
    t.balance = min(t.balance + amount, t.limit)
}
// New returns the io.Reader with rate-limiting.
func New(r io.Reader, bytesPerSec int) io.Reader {
    return &ThrottledReader{
        source:     r,
        limit:      bytesPerSec,
        balance:    bytesPerSec, // start with a full bucket
        lastRefill: time.Now(),
    }
}
```

وهذا يطرح سؤالًا طبيعيًا: إذا كانت `Refill` خطرة، فلماذا تصديرها أصلًا؟ في الأنظمة المعقّدة، تحتاج غالبًا إلى تنسيق داخلي. فمثلًا، يدير `AggregateReader` عدة قيم `ThrottledReader` لضمان بقاء إجمالي النطاق الترددي عبر جميع التدفقات ضمن حدّ عام. ويحتاج هذا المنسّق إلى استدعاء Refill لتوزيع الرموز، لكن المستخدم العادي الذي يعالج البيانات لا ينبغي أن يرى تلك القدرة أبدًا.

**تحذير:** قبل إعادة واجهة لإخفاء التطبيق، اسأل: «هل يؤدي استدعاء المستخدم لهذه الطرائق الإضافية فعلًا إلى خرق سلامة النظام أو تقييد القابلية للصيانة تقييدًا ذا معنى؟» فإذا كانت التفاصيل الإضافية تتيح للمستخدم تجاوز فحوص الأمان، أو إذا كان كشف النوع الملموس يجعل من المستحيل تغيير المزوّد الأساسي لاحقًا دون تغيير كاسر، فقد تعيد واجهة. لا تُغلّف آليًا دون سبب.

**أنماط معيّنة:** إذا صُمِّمت دالة لتُعيد أحد عدة أنواع ملموسة مختلفة بناءً على قرارات تُتّخذ في وقت التشغيل، فيجب أن تُعيد واجهة. ويصدق هذا عادةً في أنماط الأمر (command) والتسلسل (chaining) والمصنع (factory) و[الاستراتيجية](https://en.wikipedia.org/wiki/Strategy_pattern). تأمّل هذه الشيفرة التي تختار أي مُرمِّز (encoder) تستخدم بناءً على الصيغة المطلوبة:

```
// Good:
func NewWriter(format string) io.Writer {
    switch format {
    case "json":
        return &jsonWriter{}
    case "xml":
        return &xmlWriter{}
    default:
        return &textWriter{}
    }
}
```

يوضّح المثال التالي لواجهة برمجية متسلسلة كيف تتيح إعادة الواجهة سلوكًا متعدد الأشكال (polymorphic). فبإتاحة استخدام المستدعين إما `client.Do(req)` أو `client.WithAuth("token").Do(req)`، يمكنك تبديل التطبيقات دون كسر الشيفرة المستدعية.

```
// Good:
type Client interface {
    WithAuth(token string) Client
    Do(req *Request) error
}
```

هذه الأنماط إرشادات لا قواعد. تجنّب فرض واجهة إذا كان نوع ملموس واحد متين يمكنه التعامل مع التجريد داخليًا. فمثلًا، تصدّر مكتبة [database/sql](https://pkg.go.dev/database/sql#DB) القياسية نوع `DB` ملموسًا واحدًا بدلًا من فرض واجهة للتعامل مع أنواع مثل `MySQLDB` و`OracleDB`.

**تجنّب الاعتماديات الدائرية:** إذا كانت إعادة نوع ملموس ستتطلّب استيراد حزمة تستورد بالفعل حزمتك الحالية، فيجب أن تعيد واجهة لكسر الاعتمادية الدائرية.

فمثلًا:

```python
// Bad:
package app
import "myproject/plugin"
type Config struct {
    APIKey string
}
func Start() {
    p := plugin.New()
}
```

```python
// Bad:
package plugin
import "myproject/app"  // ERROR: Import cycle!
func New() *app.Config {
    return &app.Config{APIKey: "secret"}
}
```

في هذه الحالة، لا يمكن لـ`New` في `plugin` أن تعيد `*app.Config` لأن ذلك سيُنشئ استيرادًا دائريًا. ولكسر ذلك، نستفيد من كون الواجهات تُحقَّق ضمنًا. فننقل «العقد» إلى موضع محايد أو نجعل المنتج يعيد واجهة يفهمها المستهلك بالفعل.

وإذا أعادت `New` في `plugin` واجهة بدلًا من بنية `*app.Config` الملموسة، فلن تحتاج بعد ذلك إلى استيراد حزمة `app`.

```
package plugin
type Configurer interface {
    APIKey() string
}
type localConfig struct {
    key string
}
func (c localConfig) APIKey() string { return c.key }
// New returns the interface Configurer instead of the concrete app.Config
func New() Configurer {
    return &localConfig{key: "secret"}
}
```

```python
package app
import "myproject/plugin"
func Start() {
    conf := plugin.New()  // 'conf' is now a Configurer interface
    fmt.Println(conf.APIKey())
}
```

**تحذير:** راقب بعناية الإرشادات المتعلقة بـ[حجم الحزمة](#package-size). فإدخال واجهات لكسر دورات الاعتماديات غالبًا ما يكون إشارة إلى حزم غير منظمة تنظيمًا سليمًا. وغالبًا ما تُفضَّل الحزم الموحّدة على حزم كثيرة صغيرة جدًا تفشل في الوقوف على قدميها.

هذا الموقع مفتوح المصدر. [حسّن هذه الصفحة](https://github.com/google/styleguide/edit/gh-pages/go/best-practices.md).
