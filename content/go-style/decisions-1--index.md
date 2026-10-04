---
title: "قرارات أسلوب Go (1 من 2)"
lang: ar
source: https://google.github.io/styleguide/go/decisions
---

## نبذة

يحتوي هذا المستند على قرارات أسلوبية تهدف إلى توحيد النصائح التي يقدّمها مرشدو قابلية القراءة في Go، وتوفير إرشادات وتفسيرات وأمثلة معيارية لها.

هذا المستند **ليس شاملًا** وسينمو بمرور الوقت. وفي الحالات التي يتعارض فيها [دليل الأسلوب الأساسي](/book/go-style/guide/index) مع النصائح الواردة هنا، **فإن دليل الأسلوب هو المرجع**، وينبغي تحديث هذا المستند وفقًا لذلك.

راجع [النظرة العامة](https://google.github.io/styleguide/go#about) للاطّلاع على المجموعة الكاملة من مستندات أسلوب Go.

انتقلت الأقسام التالية من قرارات الأسلوب إلى جزء آخر من الدليل:

- **أسماء الحروف المختلطة (MixedCaps)**: راجع [guide#mixed-caps](/book/go-style/guide/index#mixed-caps)
- **التنسيق (Formatting)**: راجع [guide#formatting](/book/go-style/guide/index#formatting)
- **طول السطر (Line Length)**: راجع [guide#line-length](/book/go-style/guide/index#line-length)

## التسمية {#naming}

راجع قسم التسمية في [دليل الأسلوب الأساسي](/book/go-style/guide/index#naming) للحصول على إرشادات شاملة حول التسمية. وتقدّم الأقسام التالية توضيحات إضافية حول مجالات محدّدة في التسمية.

### الشرطات السفلية (Underscores)

ينبغي عمومًا ألّا تحتوي الأسماء في Go على شرطات سفلية (underscores). وهناك ثلاثة استثناءات لهذا المبدأ:

1. يجوز أن تحتوي أسماء الحزم التي لا يستوردها إلا الكود المولَّد على شرطات سفلية. راجع [أسماء الحزم](#package-names) لمزيد من التفاصيل حول كيفية اختيار أسماء حزم متعدّدة الكلمات.
2. يجوز أن تتضمّن أسماء دوال الاختبار (Test) والقياس (Benchmark) والمثال (Example) داخل ملفات `*_test.go` شرطات سفلية.
3. قد تعيد المكتبات منخفضة المستوى التي تتفاعل مع نظام التشغيل أو cgo استخدام معرّفات، كما هو الحال في [`syscall`](https://pkg.go.dev/syscall#pkg-constants). ويُتوقَّع أن يكون هذا نادرًا جدًا في معظم قواعد الكود.

**ملاحظة:** أسماء ملفات الكود المصدري ليست معرّفات Go ولا يلزم أن تتبع هذه الأعراف. ويجوز أن تحتوي على شرطات سفلية.

### أسماء الحزم (Package names) {#package-names}

في Go، يجب أن تكون أسماء الحزم موجزة وأن تستخدم الأحرف الصغيرة والأرقام فقط (مثل [`k8s`](https://pkg.go.dev/k8s.io/client-go/kubernetes) و[`oauth2`](https://pkg.go.dev/golang.org/x/oauth2)). وينبغي أن تبقى أسماء الحزم متعدّدة الكلمات موصولة وبأحرف صغيرة بالكامل (مثل [`tabwriter`](https://pkg.go.dev/text/tabwriter) بدلًا من `tabWriter` أو `TabWriter` أو `tab_writer`).

تجنّب اختيار أسماء حزم يُرجَّح أن تُحجب (shadowed) بأسماء متغيّرات محلية شائعة الاستخدام. على سبيل المثال، `usercount` اسم حزمة أفضل من `count`، لأن `count` اسم متغيّر شائع الاستخدام.

لا ينبغي أن تحتوي أسماء حزم Go على شرطات سفلية. وإذا احتجت إلى استيراد حزمة يحوي اسمها شرطة سفلية (عادةً من كود مولَّد أو من طرف ثالث)، فيجب إعادة تسميتها وقت الاستيراد إلى اسم مناسب للاستخدام في كود Go.

ويُستثنى من ذلك أن أسماء الحزم التي لا يستوردها إلا الكود المولَّد يجوز أن تحتوي على شرطات سفلية. وتشمل الأمثلة المحدّدة:

- استخدام اللاحقة `_test` لاختبارات الوحدة التي تختبر فقط الواجهة البرمجية المصدَّرة للحزمة (تسمّي حزمة `testing` هذه الاختبارات ["black box tests"](https://pkg.go.dev/testing)). على سبيل المثال، يجب أن تعرّف الحزمة `linkedlist` اختبارات وحدتها ذات الصندوق الأسود في حزمة تُسمّى `linkedlist_test` (وليس `linked_list_test`)
- استخدام الشرطات السفلية واللاحقة `_test` للحزم التي تحدّد اختبارات وظيفية أو تكاملية. على سبيل المثال، يمكن تسمية اختبار تكامل خدمة قائمة مرتبطة `linked_list_service_test`
- استخدام اللاحقة `_test` لـ[أمثلة التوثيق على مستوى الحزمة](https://go.dev/blog/examples)

تجنّب أسماء الحزم غير المفيدة مثل `util` و`utility` و`common` و`helper` و`model` و`testhelper` وما شابهها، لأنها تغري مستخدمي الحزمة بـ[إعادة تسميتها عند الاستيراد](#import-renaming). راجع:

- [إرشادات حول ما يسمّى "حزم الأدوات المساعدة"](/book/go-style/best-practices-2/index#util-packages)
- [Go Tip #97: What's in a Name](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #108: The Power of a Good Package Name](https://google.github.io/styleguide/go/index.html#gotip)

عند إعادة تسمية حزمة مستوردة (مثل `import foopb "path/to/foo_go_proto"`)، يجب أن يتوافق الاسم المحلي للحزمة مع القواعد المذكورة أعلاه، لأن الاسم المحلي يحدّد كيفية الإشارة إلى الرموز في الحزمة داخل الملف. وإذا أُعيدت تسمية استيراد معيّن في عدة ملفات، خصوصًا في الحزم نفسها أو الحزم المجاورة، فينبغي استخدام الاسم المحلي نفسه قدر الإمكان للاتساق.

راجع أيضًا: [تدوينة مدونة Go حول أسماء الحزم](https://go.dev/blog/package-names).

### أسماء المستقبِل (Receiver names) {#receiver-names}

يجب أن تكون أسماء متغيّرات [المستقبِل](https://golang.org/ref/spec#Method_declarations) كما يلي:

- قصيرة (عادةً بحرف أو حرفين)
- اختصارات للنوع نفسه
- مطبَّقة باتساق على كل مستقبِل لذلك النوع
- ألّا تكون شرطة سفلية؛ احذف الاسم إذا لم يُستخدم

| الاسم الطويل | اسم أفضل |
| --- | --- |
| `func (tray Tray)` | `func (t Tray)` |
| `func (info *ResearchInfo)` | `func (ri *ResearchInfo)` |
| `func (this *ReportWriter)` | `func (w *ReportWriter)` |
| `func (self *Scanner)` | `func (s *Scanner)` |

### أسماء الثوابت (Constant names)

يجب أن تستخدم أسماء الثوابت [MixedCaps](/book/go-style/guide/index#mixed-caps) مثل جميع الأسماء الأخرى في Go. (تبدأ الثوابت [المصدَّرة](https://tour.golang.org/basics/3) بحرف كبير، بينما تبدأ الثوابت غير المصدَّرة بحرف صغير.) وينطبق ذلك حتى عندما يخالف أعراف لغات أخرى. ولا ينبغي أن تكون أسماء الثوابت مشتقّة من قيمها، بل ينبغي أن تشرح ما تدلّ عليه القيمة.

```javascript
// Good:
const MaxPacketSize = 512
const (
    ExecuteBit = 1 << iota
    WriteBit
    ReadBit
)
```

لا تستخدم أسماء ثوابت غير MixedCaps أو ثوابت بادئتها `K`.

```javascript
// Bad:
const MAX_PACKET_SIZE = 512
const kMaxBufferSize = 1024
const KMaxUsersPergroup = 500
```

سمِّ الثوابت بناءً على دورها، لا على قيمها. وإذا لم يكن للثابت دور غير قيمته، فلا حاجة إلى تعريفه كثابت.

```javascript
// Bad:
const Twelve = 12
const (
    UserNameColumn = "username"
    GroupColumn    = "group"
)
```

### الاختصارات (Initialisms)

ينبغي أن تكون الكلمات في الأسماء التي هي اختصارات (initialisms) أو أحرف أولى (acronyms) (مثل `URL` و`NATO`) بحالة أحرف موحّدة. فينبغي أن يظهر `URL` بصيغة `URL` أو `url` (كما في `urlPony` أو `URLPony`)، وليس بصيغة `Url` أبدًا. وكقاعدة عامة، ينبغي أيضًا كتابة المعرّفات (مثل `ID` و`DB`) بأحرف كبيرة على نحو مماثل لاستخدامها في النثر الإنجليزي.

- في الأسماء التي تحتوي على عدة اختصارات (مثل `XMLAPI` لأنه يحتوي على `XML` و`API`)، ينبغي أن يكون كل حرف داخل اختصار معيّن بالحالة نفسها، لكن لا يلزم أن يكون كل اختصار في الاسم بالحالة نفسها.
- في الأسماء التي تحتوي على اختصار يتضمّن حرفًا صغيرًا (مثل `DDoS` و`iOS` و`gRPC`)، ينبغي أن يظهر الاختصار كما يظهر في النثر القياسي، إلا إذا احتجت إلى تغيير الحرف الأول من أجل [التصدير](https://golang.org/ref/spec#Exported_identifiers). في هذه الحالات، ينبغي أن يكون الاختصار كاملًا بالحالة نفسها (مثل `ddos` و`IOS` و`GRPC`).

| الاستخدام الإنجليزي | النطاق | الصحيح | غير الصحيح |
| --- | --- | --- | --- |
| XML API | Exported | `XMLAPI` | `XmlApi`, `XMLApi`, `XmlAPI`, `XMLapi` |
| XML API | Unexported | `xmlAPI` | `xmlapi`, `xmlApi` |
| iOS | Exported | `IOS` | `Ios`, `IoS` |
| iOS | Unexported | `iOS` | `ios` |
| gRPC | Exported | `GRPC` | `Grpc` |
| gRPC | Unexported | `gRPC` | `grpc` |
| DDoS | Exported | `DDoS` | `DDOS`, `Ddos` |
| DDoS | Unexported | `ddos` | `dDoS`, `dDOS` |
| ID | Exported | `ID` | `Id` |
| ID | Unexported | `id` | `iD` |
| DB | Exported | `DB` | `Db` |
| DB | Unexported | `db` | `dB` |
| Txn | Exported | `Txn` | `TXN` |

### الدوال الجالبة (Getters)

لا ينبغي أن تستخدم أسماء الدوال والطرق بادئة `Get` أو `get`، إلا إذا كان المفهوم الأساسي يستخدم كلمة "get" (مثل طلب HTTP GET). يُفضَّل أن يبدأ الاسم بالاسم مباشرةً، فاستخدم مثلًا `Counts` بدلًا من `GetCounts`.

إذا كانت الدالة تتضمّن إجراء عملية حسابية معقّدة أو تنفيذ استدعاء بعيد، فيمكن استخدام كلمة مختلفة مثل `Compute` أو `Fetch` بدلًا من `Get`، ليتّضح للقارئ أن استدعاء الدالة قد يستغرق وقتًا وقد يحجب التنفيذ أو يفشل.

### أسماء المتغيّرات (Variable names)

القاعدة العامة هي أن يتناسب طول الاسم طرديًا مع حجم نطاقه وعكسيًا مع عدد مرات استخدامه داخل ذلك النطاق. وقد يحتاج المتغيّر المُعرَّف على مستوى الملف إلى عدة كلمات، بينما قد يكون متغيّر نطاقه كتلة داخلية واحدة كلمةً واحدة أو حتى حرفًا أو حرفين، للحفاظ على وضوح الكود وتجنّب معلومات لا لزوم لها.

وفيما يلي خط أساس تقريبي. هذه الإرشادات العددية ليست قواعد صارمة. طبّق حكمك بناءً على السياق و[الوضوح](/book/go-style/guide/index#clarity) و[الإيجاز](/book/go-style/guide/index#concision).

- النطاق الصغير هو نطاق تُنفَّذ فيه عملية أو عمليتان صغيرتان، من 1 إلى 7 أسطر مثلًا.
- النطاق المتوسط هو بضع عمليات صغيرة أو عملية كبيرة واحدة، من 8 إلى 15 سطرًا مثلًا.
- النطاق الكبير هو عملية كبيرة واحدة أو بضع عمليات كبيرة، من 15 إلى 25 سطرًا مثلًا.
- النطاق الكبير جدًا هو أي شيء يتجاوز صفحة واحدة (أكثر من 25 سطرًا مثلًا).

قد يكون الاسم واضحًا تمامًا (مثل `c` لعدّاد) في نطاق صغير لكنه لا يكفي في نطاق أكبر، وسيحتاج إلى توضيح لتذكير القارئ بغرضه لاحقًا في الكود. وقد يستدعي النطاق الذي توجد فيه متغيّرات كثيرة، أو متغيّرات تمثّل قيمًا أو مفاهيم متشابهة، أسماءً أطول مما يوحي به حجم النطاق.

يمكن أن تساعد خصوصية المفهوم أيضًا في إبقاء اسم المتغيّر موجزًا. فمثلًا، بافتراض وجود قاعدة بيانات واحدة فقط قيد الاستخدام، قد يبقى اسم قصير مثل `db` — الذي قد يُحجز عادةً للنطاقات الصغيرة جدًا — واضحًا تمامًا حتى لو كان النطاق كبيرًا جدًا. وفي هذه الحالة، يُرجَّح أن تكون الكلمة الواحدة `database` مقبولة بناءً على حجم النطاق، لكنها ليست مطلوبة لأن `db` اختصار شائع جدًا للكلمة وله تفسيرات بديلة قليلة.

ينبغي أن يعبّر اسم المتغيّر المحلي عن محتواه وكيفية استخدامه في السياق الحالي، لا عن مصدر القيمة. فمثلًا، غالبًا لا يكون أفضل اسم لمتغيّر محلي مطابقًا لاسم الحقل في بنية أو رسالة protocol buffer.

وبشكل عام:

- الأسماء المفردة مثل `count` أو `options` نقطة بداية جيدة.
- يمكن إضافة كلمات لتمييز الأسماء المتشابهة، مثل `userCount` و`projectCount`.
- لا تحذف الحروف لمجرد توفير الكتابة. فمثلًا `Sandbox` أفضل من `Sbx`، خصوصًا للأسماء المصدَّرة.
- احذف [الأنواع والكلمات الشبيهة بالأنواع](#repetitive-with-type) من معظم أسماء المتغيّرات. فللأعداد، `userCount` اسم أفضل من `numUsers` أو `usersInt`.
- للشرائح (slice)، `users` اسم أفضل من `userSlice`.
- لا بأس في تضمين وصف شبيه بالنوع إذا وُجدت نسختان من قيمة ما في النطاق، فمثلًا قد تخزّن المُدخل في `ageString` وتستخدم `age` للقيمة المحلَّلة.

احذف الكلمات الواضحة من [السياق المحيط](#repetitive-in-context). فمثلًا، في تنفيذ دالة `UserCount`، من المرجّح أن يكون متغيّر محلي باسم `userCount` زائدًا عن الحاجة؛ فـ`count` أو `users` أو حتى `c` بنفس القدر من الوضوح.

#### أسماء المتغيّرات المكوّنة من حرف واحد

قد تكون أسماء المتغيّرات المكوّنة من حرف واحد أداة مفيدة لتقليل [التكرار](#repetition)، لكنها قد تجعل الكود غامضًا بلا داعٍ. اقتصر على استخدامها في الحالات التي تكون فيها الكلمة الكاملة واضحة والتي يكون فيها ظهورها مكان المتغيّر المكوّن من حرف واحد متكرّرًا.

وبشكل عام:

- بالنسبة إلى [متغيّر مستقبِل الطريقة](#receiver-names)، يُفضَّل اسم من حرف واحد أو حرفين.
- غالبًا ما يكون استخدام أسماء متغيّرات مألوفة للأنواع الشائعة مفيدًا: `r` لـ`io.Reader` أو `*http.Request`
- `w` لـ`io.Writer` أو `http.ResponseWriter`

تُعدّ المعرّفات المكوّنة من حرف واحد مقبولة كمتغيّرات حلقات صحيحة، خصوصًا للفهارس (مثل `i`) والإحداثيات (مثل `x` و`y`). ويمكن قبول الاختصارات كمعرّفات حلقات عندما يكون النطاق قصيرًا، مثل `for _, n := range nodes { ... }`.

### التكرار (Repetition) {#repetition}

ينبغي أن يتجنّب الكود المصدري في Go التكرار غير الضروري. ومن المصادر الشائعة لذلك الأسماء المتكرّرة، التي كثيرًا ما تتضمّن كلمات غير ضرورية أو تكرّر سياقها أو نوعها. وقد يكون الكود نفسه متكرّرًا بلا داعٍ إذا ظهر المقطع نفسه أو مقطع مشابه عدة مرات على مقربة من بعضها.

قد تأتي التسمية المتكرّرة في أشكال عديدة، منها:

#### اسم الحزمة مقابل اسم الرمز المصدَّر

عند تسمية الرموز المصدَّرة، يكون اسم الحزمة مرئيًا دائمًا خارج حزمتك، لذا ينبغي تقليل المعلومات المكرّرة بين الاثنين أو إزالتها. وإذا كانت الحزمة تصدّر نوعًا واحدًا فقط وكان اسمه مشتقًّا من اسم الحزمة نفسها، فإن الاسم المتعارف عليه للدالة البانية هو `New` إذا كانت هناك حاجة إليها.

> **أمثلة:** اسم متكرّر -> اسم أفضل
> > `widget.NewWidget` -> `widget.New` `widget.NewWidgetWithName` -> `widget.NewWithName` `db.LoadFromDatabase` -> `db.Load` `goatteleportutil.CountGoatsTeleported` -> `gtutil.CountGoatsTeleported` أو `goatteleport.Count` `myteampb.MyTeamMethodRequest` -> `mtpb.MyTeamMethodRequest` أو `myteampb.MethodRequest`

#### اسم المتغيّر مقابل النوع {#repetitive-with-type}

يعرف المترجم دائمًا نوع المتغيّر، وفي معظم الحالات يكون نوع المتغيّر واضحًا أيضًا للقارئ من طريقة استخدامه. ولا يلزم توضيح نوع المتغيّر إلا إذا ظهرت قيمته مرتين في النطاق نفسه.

| اسم متكرّر | اسم أفضل |
| --- | --- |
| `var numUsers int` | `var users int` |
| `var nameString string` | `var name string` |
| `var primaryProject *Project` | `var primary *Project` |

إذا ظهرت القيمة بأشكال متعدّدة، فيمكن توضيح ذلك بكلمة إضافية مثل `raw` و`parsed` أو بالتمثيل الأساسي:

```
// Good:
limitRaw := r.FormValue("limit")
limit, err := strconv.Atoi(limitRaw)
```

```
// Good:
limitStr := r.FormValue("limit")
limit, err := strconv.Atoi(limitStr)
```

#### السياق الخارجي مقابل الأسماء المحلية {#repetitive-in-context}

غالبًا ما تُنشئ الأسماء التي تتضمّن معلومات من سياقها المحيط ضوضاء إضافية بلا فائدة. فاسم الحزمة واسم الطريقة واسم النوع واسم الدالة ومسار الاستيراد وحتى اسم الملف يمكن أن توفّر جميعها سياقًا يؤهّل تلقائيًا كل الأسماء داخلها.

```
// Bad:
// In package "ads/targeting/revenue/reporting"
type AdsTargetingRevenueReport struct{}
func (p *Project) ProjectName() string
```

```
// Good:
// In package "ads/targeting/revenue/reporting"
type Report struct{}
func (p *Project) Name() string
```

```
// Bad:
// In package "sqldb"
type DBConnection struct{}
```

```
// Good:
// In package "sqldb"
type Connection struct{}
```

```
// Bad:
// In package "ads/targeting"
func Process(in *pb.FooProto) *Report {
    adsTargetingID := in.GetAdsTargetingID()
}
```

```
// Good:
// In package "ads/targeting"
func Process(in *pb.FooProto) *Report {
    id := in.GetAdsTargetingID()
}
```

ينبغي عمومًا تقييم التكرار في سياق مستخدم الرمز، لا بمعزل عنه. فمثلًا، يحتوي الكود التالي على أسماء كثيرة قد تكون مقبولة في بعض الظروف، لكنها مكرّرة في السياق:

```javascript
// Bad:
func (db *DB) UserCount() (userCount int, err error) {
    var userCountInt64 int64
    if dbLoadError := db.LoadFromDatabase("count(distinct users)", &userCountInt64); dbLoadError != nil {
        return 0, fmt.Errorf("failed to load user count: %s", dbLoadError)
    }
    userCount = int(userCountInt64)
    return userCount, nil
}
```

وبدلًا من ذلك، يمكن غالبًا حذف المعلومات المتعلّقة بالأسماء الواضحة من السياق أو الاستخدام:

```javascript
// Good:
func (db *DB) UserCount() (int, error) {
    var count int64
    if err := db.Load("count(distinct users)", &count); err != nil {
        return 0, fmt.Errorf("failed to load user count: %s", err)
    }
    return int(count), nil
}
```

## التعليقات (Commentary)

تهدف الأعراف المتعلّقة بالتعليقات (التي تشمل ما يجب التعليق عليه، والأسلوب المستخدم، وكيفية تقديم أمثلة قابلة للتشغيل، وما إلى ذلك) إلى دعم تجربة قراءة توثيق واجهة برمجية عامة. راجع [Effective Go](http://golang.org/doc/effective_go.html#commentary) لمزيد من المعلومات.

ويناقش قسم [أعراف التوثيق](/book/go-style/best-practices-2/index#documentation-conventions) في مستند أفضل الممارسات هذا الأمر بمزيد من التفصيل.

**أفضل ممارسة:** استخدم [معاينة التوثيق](/book/go-style/best-practices-2/index#documentation-preview) أثناء التطوير ومراجعة الكود للتحقق مما إذا كان التوثيق والأمثلة القابلة للتشغيل مفيدة وتُعرض بالطريقة التي تتوقعها.

**نصيحة:** يستخدم Godoc تنسيقًا خاصًا قليلًا جدًا؛ وينبغي عادةً إزاحة القوائم ومقاطع الكود لتجنّب التفاف الأسطر. وبعيدًا عن الإزاحة، ينبغي عمومًا تجنّب الزخرفة.

### طول سطر التعليق

لا يوجد [طول سطر](/book/go-style/guide/index#line-length) ثابت للتعليقات في Go.

ينبغي لفّ أسطر التعليقات الطويلة لضمان قابلية قراءة المصدر في الأدوات التي لا تقوم باللفّ التلقائي لأسطر التعليقات. وإذا لم تكن متأكدًا من مكان اللفّ، فمن الخيارات الشائعة 80 أو 100 عمود. ومع ذلك، هذا ليس حدًّا صارمًا؛ فهناك حالات يكون فيها كسر نص حرفي طويل ضارًّا. ولا يوجد اشتراط لعرض عمود معيّن يتم عنده اللفّ. استهدف [الاتساق](/book/go-style/guide/index#consistency) داخل الملف.

راجع [هذه التدوينة من مدونة Go حول التوثيق](https://blog.golang.org/godoc-documenting-go-code) لمزيد من المعلومات عن التعليقات.

```
# Good:
// This is a comment paragraph.
// The length of individual lines doesn't matter in Godoc;
// but the choice of wrapping makes it easy to read on narrow screens.
//
// Don't worry too much about the long URL:
// https://supercalifragilisticexpialidocious.example.com:8080/Animalia/Chordata/Mammalia/Rodentia/Geomyoidea/Geomyidae/
//
// Similarly, if you have other information that is made awkward
// by too many line breaks, use your judgment and include a long line
// if it helps rather than hinders.
```

تجنّب التعليقات التي تحشر كميات كبيرة من النص في سطر واحد، فهي تجربة قراءة سيئة.

```
# Bad:
// This is a comment paragraph. While some code editors and viewers will wrap the paragraph for the reader, others will display a very long line that will overflow most windows and require users to scroll horizontally. In addition, even on a screen capable of displaying the entire line, it is easier to read a narrower paragraph than very wide one.
//
// Don't worry too much about the long URL:
// https://supercalifragilisticexpialidocious.example.com:8080/Animalia/Chordata/Mammalia/Rodentia/Geomyoidea/Geomyidae/
```

### التعليقات التوثيقية (Doc comments) {#doc-comments}

يجب أن تحتوي جميع الأسماء المصدَّرة على المستوى الأعلى على تعليقات توثيقية، وكذلك إعلانات الأنواع أو الدوال غير المصدَّرة ذات السلوك أو المعنى غير الواضح. وينبغي أن تكون هذه التعليقات [جُملًا كاملة](#comment-sentences) تبدأ باسم الكائن الموصوف. ويمكن أن تسبق أداة التعريف ("a" أو "an" أو "the") الاسم ليُقرأ بشكل أكثر طبيعية.

```
// Good:
// A Request represents a request to run a command.
type Request struct { ...
// Encode writes the JSON encoding of req to w.
func Encode(w io.Writer, req *Request) { ...
```

تظهر التعليقات التوثيقية في [Godoc](https://pkg.go.dev/) وتعرضها بيئات التطوير، ولذلك ينبغي كتابتها لأي شخص يستخدم الحزمة.

وينطبق تعليق التوثيق على الرمز التالي، أو على مجموعة الحقول إذا ظهر داخل بنية.

```
// Good:
// Options configure the group management service.
type Options struct {
    // General setup:
    Name  string
    Group *FooGroup
    // Dependencies:
    DB *sql.DB
    // Customization:
    LargeGroupThreshold int // optional; default: 10
    MinimumMembers      int // optional; default: 2
}
```

**أفضل ممارسة:** إذا كانت لديك تعليقات توثيقية لكود غير مصدَّر، فاتبع العرف نفسه كما لو كان مصدَّرًا (أي البدء بالتعليق بالاسم غير المصدَّر). وهذا يسهّل تصديره لاحقًا بمجرد استبدال الاسم غير المصدَّر بالاسم المصدَّر الجديد في التعليقات والكود معًا.

### جُمل التعليقات {#comment-sentences}

التعليقات التي هي جُمل كاملة ينبغي أن تبدأ بحرف كبير وتُضبط بالترقيم مثل جُمل اللغة الإنجليزية القياسية. (وكاستثناء، لا بأس في بدء جملة باسم معرّف يبدأ بحرف صغير إذا كان ذلك واضحًا. ومن الأفضل على الأرجح أن يقتصر ذلك على بداية الفقرة.)

أما التعليقات التي هي أجزاء من جُمل فليس لها متطلبات مماثلة فيما يخص الترقيم أو بدء الحرف الكبير.

ينبغي أن تكون [تعليقات التوثيق](#doc-comments) جُملًا كاملة دائمًا، وبالتالي ينبغي دائمًا أن تبدأ بحرف كبير وأن تُضبط بالترقيم. أما التعليقات البسيطة في نهاية السطر (خصوصًا لحقول البنى) فيمكن أن تكون عبارات بسيطة تفترض أن اسم الحقل هو الفاعل.

```python
// Good:
// A Server handles serving quotes from the collected works of Shakespeare.
type Server struct {
    // BaseDir points to the base directory under which Shakespeare's works are stored.
    //
    // The directory structure is expected to be the following:
    //   {BaseDir}/manifest.json
    //   {BaseDir}/{name}/{name}-part{number}.txt
    BaseDir string
    WelcomeMessage  string // displayed when user logs in
    ProtocolVersion string // checked against incoming requests
    PageLength      int    // lines per page when printing (optional; default: 20)
}
```

### الأمثلة {#examples}

ينبغي أن توثّق الحزم بوضوح الاستخدام المقصود لها. حاول تقديم [مثال قابل للتشغيل](http://blog.golang.org/examples)؛ تظهر الأمثلة في Godoc. وتنتمي الأمثلة القابلة للتشغيل إلى ملف الاختبار، لا إلى ملف المصدر الإنتاجي. راجع هذا المثال ([Godoc](https://pkg.go.dev/time#example-Duration)، [المصدر](https://cs.opensource.google/go/go/+/HEAD:src/time/example_test.go)).

إذا لم يكن تقديم مثال قابل للتشغيل ممكنًا، فيمكن تقديم كود مثال داخل تعليقات الكود. وكما هو الحال مع مقاطع الكود وسطر الأوامر الأخرى في التعليقات، ينبغي أن يتبع أعراف التنسيق القياسية.

### وسائط النتائج المسماة

عند تسمية الوسائط، ضع في اعتبارك كيف تظهر توقيعات الدوال في Godoc. فغالبًا ما يكون اسم الدالة نفسه ونوع وسائط النتيجة واضحين بما يكفي.

```
// Good:
func (n *Node) Parent1() *Node
func (n *Node) Parent2() (*Node, error)
```

إذا أعادت دالة وسيطين أو أكثر من النوع نفسه، فقد يكون إضافة الأسماء مفيدًا.

```
// Good:
func (n *Node) Children() (left, right *Node, err error)
```

إذا كان على المستدعي اتخاذ إجراء بشأن وسائط نتيجة معيّنة، فقد تساعد تسميتها في بيان الإجراء المطلوب:

```python
// Good:
// WithTimeout returns a context that will be canceled no later than d duration
// from now.
//
// The caller must arrange for the returned cancel function to be called when
// the context is no longer needed to prevent a resource leak.
func WithTimeout(parent Context, d time.Duration) (ctx Context, cancel func())
```

في الكود أعلاه، الإلغاء إجراء محدّد يجب على المستدعي اتخاذه. لكن لو كُتبت وسائط النتيجة بصيغة `(Context, func())` وحدها، لكان غير واضح المقصود بـ"دالة الإلغاء".

لا تستخدم وسائط النتائج المسماة عندما تنتج الأسماء [تكرارًا غير ضروري](#repetitive-with-type).

```
// Bad:
func (n *Node) Parent1() (node *Node)
func (n *Node) Parent2() (node *Node, err error)
```

لا تسمِّ وسائط النتائج لتجنّب الإعلان عن متغيّر داخل الدالة. فهذه الممارسة تؤدي إلى إسهاب غير ضروري في الواجهة البرمجية مقابل إيجاز بسيط في التنفيذ.

لا تُقبل [الإرجاعات المجرّدة](https://tour.golang.org/basics/7) إلا في دالة صغيرة. وبمجرد أن تصبح الدالة متوسطة الحجم، كن صريحًا في القيم المُعادة. وبالمثل، لا تسمِّ وسائط النتائج لمجرد أن ذلك يمكّنك من استخدام الإرجاعات المجرّدة. فـ[الوضوح](/book/go-style/guide/index#clarity) أهم دائمًا من توفير بضعة أسطر في دالتك.

ومن المقبول دائمًا تسمية وسيط نتيجة إذا كان يجب تغيير قيمته في إغلاق مؤجَّل.

> **نصيحة:** غالبًا ما تكون الأنواع أوضح من الأسماء في توقيعات الدوال. ويوضّح [GoTip #38: Functions as Named Types](https://google.github.io/styleguide/go/index.html#gotip) ذلك.
> > في [`WithTimeout`](https://pkg.go.dev/context#WithTimeout) أعلاه، يستخدم الكود الحقيقي [`CancelFunc`](https://pkg.go.dev/context#CancelFunc) بدلًا من `func()` خام في قائمة وسائط النتيجة ولا يتطلّب سوى جهد ضئيل للتوثيق.

### تعليقات الحزم

يجب أن تظهر تعليقات الحزم مباشرة فوق عبارة الحزمة (package clause) دون سطر فارغ بين التعليق واسم الحزمة. مثال:

```
// Good:
// Package math provides basic constants and mathematical functions.
//
// This package does not guarantee bit-identical results across architectures.
package math
```

يجب أن يكون هناك تعليق حزمة واحد لكل حزمة. وإذا تألفت الحزمة من عدة ملفات، فينبغي أن يحتوي أحد الملفات بالضبط على تعليق الحزمة.

وتأخذ التعليقات الخاصة بحزم `main` شكلًا مختلفًا قليلًا، حيث يحل اسم قاعدة `go_binary` في ملف BUILD محل اسم الحزمة.

```python
// Good:
// The seed_generator command is a utility that generates a Finch seed file
// from a set of JSON study configs.
package main
```

الأنماط الأخرى من التعليقات مقبولة ما دام اسم الملف الثنائي مكتوبًا تمامًا كما في ملف BUILD. وعندما يكون اسم الملف الثنائي هو الكلمة الأولى، يجب كتابته بحرف كبير حتى وإن لم يطابق تمامًا كتابة استدعاء سطر الأوامر.

```
// Good:
// Binary seed_generator ...
// Command seed_generator ...
// Program seed_generator ...
// The seed_generator command ...
// The seed_generator program ...
// Seed_generator ...
```

نصائح:

يمكن أن تكون أمثلة استدعاءات سطر الأوامر واستخدام الواجهة البرمجية توثيقًا مفيدًا. وبالنسبة إلى تنسيق Godoc، أزح أسطر التعليق التي تحتوي على كود.

إذا لم يكن هناك ملف رئيسي واضح أو إذا كان تعليق الحزمة طويلًا للغاية، فلا بأس في وضع التعليق التوثيقي في ملف باسم `doc.go` يحتوي فقط على التعليق وعبارة الحزمة.

يمكن استخدام التعليقات متعدّدة الأسطر بدلًا من عدة تعليقات أحادية السطر. وهذا مفيد أساسًا إذا كان التوثيق يحتوي على أقسام قد يكون من المفيد نسخها ولصقها من الملف المصدري، كما هو الحال مع نماذج أسطر الأوامر (للملفات الثنائية) وأمثلة القوالب.

```python
// Good:
/*
The seed_generator command is a utility that generates a Finch seed file
from a set of JSON study configs.

    seed_generator *.json | base64 > finch-seed.base64
*/
package template
```

التعليقات الموجّهة إلى المشرفين والتي تنطبق على الملف بأكمله توضع عادةً بعد إعلانات الاستيراد. وهذه لا تظهر في Godoc ولا تخضع للقواعد المذكورة أعلاه بشأن تعليقات الحزم.

## الاستيرادات

### إعادة تسمية الاستيرادات {#import-renaming}

لا ينبغي عادةً إعادة تسمية استيرادات الحزم، لكن هناك حالات يجب فيها إعادة تسميتها أو تكون إعادة التسمية فيها تحسينًا للقابلية للقراءة.

يجب أن تتبع الأسماء المحلية للحزم المستوردة [الإرشادات المتعلّقة بتسمية الحزم](#package-names)، بما في ذلك حظر استخدام الشرطات السفلية والأحرف الكبيرة. حاول أن تكون [متسقًا](/book/go-style/guide/index#consistency) باستخدام الاسم المحلي نفسه دائمًا للحزمة المستوردة نفسها.

*يجب* إعادة تسمية الحزمة المستوردة لتجنّب تعارض الاسم مع استيرادات أخرى. (ومن لوازم ذلك أن [أسماء الحزم الجيدة](#package-names) ينبغي ألّا تتطلّب إعادة تسمية.) وفي حال حدوث تعارض بالأسماء، فضّل إعادة تسمية الاستيراد الأكثر محلية أو الأكثر ارتباطًا بالمشروع.

*يجب* إعادة تسمية حزم protocol buffer المولَّدة لإزالة الشرطات السفلية من أسمائها، ويجب أن تكون أسماؤها المحلية منتهية باللاحقة `pb`. راجع [أفضل ممارسات proto والـ stub](/book/go-style/best-practices-2/index#import-protos) لمزيد من المعلومات.

```python
// Good:
import (
    foosvcpb "path/to/package/foo_service_go_proto"
)
```

وأخيرًا، *يمكن* إعادة تسمية حزمة مستوردة غير مولَّدة تلقائيًا إذا كان اسمها غير مفيد (مثل `util` أو `v1`). افعل ذلك باعتدال: لا تعد تسمية الحزمة إذا كان الكود المحيط باستخدامها ينقل سياقًا كافيًا. وعند الإمكان، فضّل إعادة هيكلة الحزمة نفسها باسم أكثر ملاءمة.

```python
// Good:
import (
    core "github.com/kubernetes/api/core/v1"
    meta "github.com/kubernetes/apimachinery/pkg/apis/meta/v1beta1"
)
```

إذا احتجت إلى استيراد حزمة يتعارض اسمها مع اسم متغيّر محلي شائع تريد استخدامه (مثل `url` و`ssh`) وأردت إعادة تسمية الحزمة، فالطريقة المفضّلة لذلك هي استخدام اللاحقة `pkg` (مثل `urlpkg`). لاحظ أنه يمكن حجب حزمة بمتغيّر محلي؛ ولا تكون إعادة التسمية ضرورية إلا إذا كانت الحزمة ما زالت بحاجة إلى الاستخدام عندما يكون هذا المتغيّر في النطاق.

### تجميع الاستيرادات

ينبغي تنظيم الاستيرادات في المجموعات التالية، بهذا الترتيب:

1. حزم المكتبة القياسية
2. الحزم الأخرى (الخاصة بالمشروع والمضمّنة)
3. استيرادات protocol buffer (مثل `fpb "path/to/foo_go_proto"`)
4. الاستيراد من أجل [الآثار الجانبية](https://go.dev/doc/effective_go#blank_import) (مثل `_ "path/to/package"`)

```python
// Good:
package main
import (
    "fmt"
    "hash/adler32"
    "os"
    "github.com/dsnet/compress/flate"
    "golang.org/x/text/encoding"
    "google.golang.org/protobuf/proto"
    foopb "myproj/foo/proto/proto"
    _ "myproj/rpc/protocols/dial"
    _ "myproj/security/auth/authhooks"
)
```

### الاستيراد "الفارغ" (`import _`)

الحزم التي تُستورد من أجل آثارها الجانبية فقط (باستخدام الصيغة `import _ "package"`) لا يجوز استيرادها إلا في حزمة main، أو في الاختبارات التي تحتاج إليها.

ومن أمثلة هذه الحزم:

- [time/tzdata](https://pkg.go.dev/time/tzdata)
- [image/jpeg](https://pkg.go.dev/image/jpeg) في كود معالجة الصور

تجنّب الاستيرادات الفارغة في حزم المكتبات، حتى لو كانت المكتبة تعتمد عليها بشكل غير مباشر. فحصر استيرادات الآثار الجانبية في حزمة main يساعد في التحكم بالاعتماديات، ويجعل من الممكن كتابة اختبارات تعتمد على استيراد مختلف دون تعارض أو تكاليف بناء مهدورة.

والاستثناءات الوحيدة التالية هي:

- يمكنك استخدام استيراد فارغ لتجاوز فحص الاستيرادات غير المسموح بها في [فاحص nogo الساكن](https://github.com/bazelbuild/rules_go/blob/master/go/nogo.rst).
- يمكنك استخدام استيراد فارغ لحزمة [embed](https://pkg.go.dev/embed) في ملف مصدري يستخدم توجيه المترجم `//go:embed`.

**نصيحة:** إذا أنشأت حزمة مكتبة تعتمد بشكل غير مباشر على استيراد ذي أثر جانبي في الإنتاج، فوثّق الاستخدام المقصود.

### الاستيراد "النقطي" (`import .`)

صيغة `import .` ميزة لغوية تتيح جلب المعرّفات المصدَّرة من حزمة أخرى إلى الحزمة الحالية دون تأهيل. راجع [مواصفات اللغة](https://go.dev/ref/spec#Import_declarations) لمزيد من المعلومات.

لا تستخدم هذه الميزة في قاعدة كود Google؛ فهي تجعل من الصعب معرفة مصدر الوظائف.

```python
// Bad:
package foo_test
import (
    "bar/testutil" // also imports "foo"
    . "foo"
)
var myThing = Bar() // Bar defined in package foo; no qualification needed.
```

```python
// Good:
package foo_test
import (
    "bar/testutil" // also imports "foo"
    "foo"
)
var myThing = foo.Bar()
```

## الأخطاء {#documentation-conventions-errors}

### إرجاع الأخطاء

استخدم `error` للإشارة إلى أن دالة قد تفشل. وبحسب العرف، يكون `error` آخر وسيط في النتائج.

```
// Good:
func Good() error { /* ... */ }
```

إرجاع قيمة `nil` من نوع error هو الطريقة المتعارف عليها للإشارة إلى عملية ناجحة كان يمكن أن تفشل. وإذا أعادت دالة خطأً، فيجب على المستدعين التعامل مع جميع قيم الإرجاع غير الخاصة بالخطأ على أنها غير محدّدة ما لم يُوثَّق خلاف ذلك صراحةً. وشائع أن تكون قيم الإرجاع غير الخاصة بالخطأ هي قيمها الصفرية، لكن لا يمكن افتراض ذلك.

```
// Good:
func GoodLookup() (*Result, error) {
    // ...
    if err != nil {
        return nil, err
    }
    return res, nil
}
```

ينبغي أن تُرجع الدوال المصدَّرة التي تُرجع أخطاءً هذه الأخطاء باستخدام نوع `error`. فالأنواع الملموسة للأخطاء معرّضة لأخطاء دقيقة: إذ يمكن لف مؤشّر `nil` ملموس داخل واجهة فيصبح قيمة غير nil (راجع [مدخل Go FAQ حول هذا الموضوع](https://golang.org/doc/faq#nil_error)).

```
// Bad:
func Bad() *os.PathError { /*...*/ }
```

**نصيحة:** الدالة التي تأخذ وسيطًا من نوع [`context.Context`](https://pkg.go.dev/context) ينبغي أن تُرجع عادةً `error` ليتمكّن المستدعي من تحديد ما إذا أُلغي السياق أثناء تشغيل الدالة.

### نصوص الأخطاء

لا ينبغي أن تبدأ نصوص الأخطاء بحرف كبير (إلا إذا بدأت باسم مصدَّر أو اسم علم أو اختصار) ولا أن تنتهي بعلامة ترقيم. وذلك لأن نصوص الأخطاء تظهر عادةً ضمن سياق آخر قبل طبعها للمستخدم.

```
// Bad:
err := fmt.Errorf("Something bad happened.")
```

```
// Good:
err := fmt.Errorf("something bad happened")
```

ومن ناحية أخرى، يعتمد أسلوب الرسالة الكاملة المعروضة (التسجيل أو فشل الاختبار أو استجابة الواجهة البرمجية أو أي واجهة مستخدم أخرى) على السياق، لكن ينبغي عادةً أن تبدأ بحرف كبير.

```
// Good:
log.Infof("Operation aborted: %v", err)
log.Errorf("Operation aborted: %v", err)
t.Errorf("Op(%q) failed unexpectedly; err=%v", args, err)
```

### التعامل مع الأخطاء {#handle-errors}

ينبغي للكود الذي يواجه خطأً أن يتخذ قرارًا مدروسًا بشأن كيفية التعامل معه. وليس من المناسب عادةً تجاهل الأخطاء باستخدام متغيّرات `_`. وإذا أعادت دالة خطأً، فافعل أحد الأمور التالية:

- تعامل مع الخطأ وعالجه فورًا.
- أعد الخطأ إلى المستدعي.
- في الحالات الاستثنائية، استدعِ [`log.Fatal`](https://pkg.go.dev/github.com/golang/glog#Fatal) أو `panic` (إذا كان ضروريًا للغاية).

**ملاحظة:** `log.Fatalf` ليس هو log المكتبة القياسية. راجع [#logging].

في الحالة النادرة التي يكون فيها تجاهل خطأ أو التخلص منه مناسبًا (مثل استدعاء [`(*bytes.Buffer).Write`](https://pkg.go.dev/bytes#Buffer.Write) الموثّق بأنه لا يفشل أبدًا)، ينبغي أن يشرح تعليق مصاحب لماذا هذا آمن.

```javascript
// Good:
var b *bytes.Buffer
n, _ := b.Write(p) // never returns a non-nil error
```

لمزيد من النقاش والأمثلة حول معالجة الأخطاء، راجع [Effective Go](http://golang.org/doc/effective_go.html#errors) و[أفضل الممارسات](/book/go-style/best-practices-2/index#error-handling).

### الأخطاء داخل النطاق (In-band errors) {#in-band-errors}

في C واللغات المشابهة، من الشائع أن تُرجع الدوال قيمًا مثل ‎-1 أو null أو السلسلة الفارغة للإشارة إلى أخطاء أو نتائج مفقودة. ويُعرف هذا بمعالجة الأخطاء داخل النطاق (in-band error handling).

```
// Bad:
// Lookup returns the value for key or -1 if there is no mapping for key.
func Lookup(key string) int
```

قد يؤدي عدم التحقق من قيمة خطأ داخل النطاق إلى أخطاء برمجية وقد ينسب الأخطاء إلى الدالة الخطأ.

```
// Bad:
// The following line returns an error that Parse failed for the input value,
// whereas the failure was that there is no mapping for missingKey.
return Parse(Lookup(missingKey))
```

توفّر دعم Go لقيم الإرجاع المتعدّدة حلًّا أفضل (راجع [قسم Effective Go حول الإرجاعات المتعدّدة](http://golang.org/doc/effective_go.html#multiple-returns)). وبدلًا من إلزام العملاء بالتحقق من قيمة خطأ داخل النطاق، ينبغي أن تُرجع الدالة قيمة إضافية للإشارة إلى ما إذا كانت قيم الإرجاع الأخرى صالحة. وقد تكون قيمة الإرجاع هذه خطأً أو قيمة منطقية عندما لا تكون هناك حاجة إلى تفسير، وينبغي أن تكون قيمة الإرجاع الأخيرة.

```
// Good:
// Lookup returns the value for key or ok=false if there is no mapping for key.
func Lookup(key string) (value string, ok bool)
```

تمنع هذه الواجهة البرمجية المستدعي من كتابة `Parse(Lookup(key))` بشكل خاطئ، وهو ما يسبب خطأ وقت الترجمة، لأن `Lookup(key)` لها مخرجان.

وإرجاع الأخطاء بهذه الطريقة يشجّع على معالجة أخطاء أكثر متانة وصريحة:

```
// Good:
value, ok := Lookup(key)
if !ok {
    return fmt.Errorf("no value for %q", key)
}
return Parse(value)
```

بعض دوال المكتبة القياسية، مثل تلك الموجودة في الحزمة `strings`، تُرجع قيم أخطاء داخل النطاق. وهذا يبسّط كود معالجة السلاسل كثيرًا مقابل طلب مزيد من الحرص من المبرمج. وبشكل عام، ينبغي أن يُرجع كود Go في قاعدة كود Google قيمًا إضافية للأخطاء.

### إزاحة مسار الأخطاء

تعامل مع الأخطاء قبل المتابعة إلى بقية الكود. فهذا يحسّن قابلية قراءة الكود بتمكين القارئ من إيجاد المسار الطبيعي بسرعة. وينطبق المنطق نفسه على أي كتلة تختبر شرطًا ثم تنتهي بحالة نهائية (مثل `return` أو `panic` أو `log.Fatal`).

والكود الذي يعمل إذا لم تتحقق الحالة النهائية ينبغي أن يظهر بعد كتلة `if`، وألّا يكون مُزاحًا داخل جملة `else`.

```
// Good:
if err != nil {
    // error handling
    return // or continue, etc.
}
// normal code
```

```
// Bad:
if err != nil {
    // error handling
} else {
    // normal code that looks abnormal due to indentation
}
```

**نصيحة:** إذا كنت تستخدم متغيّرًا لأكثر من بضعة أسطر من الكود، فعادةً لا يستحق استخدام نمط `if` مع المعلوم الابتدائي. وفي هذه الحالات، يكون من الأفضل عادةً نقل الإعلان إلى الخارج واستخدام جملة `if` عادية:

```
// Good:
x, err := f()
if err != nil {
  // error handling
  return
}
// lots of code that uses x
// across multiple lines
```

```
// Bad:
if x, err := f(); err != nil {
  // error handling
  return
} else {
  // lots of code that uses x
  // across multiple lines
}
```

راجع [Go Tip #1: Line of Sight](https://google.github.io/styleguide/go/index.html#gotip) و[TotT: Reduce Code Complexity by Reducing Nesting](https://testing.googleblog.com/2017/06/code-health-reduce-nesting-reduce.html) لمزيد من التفاصيل.
