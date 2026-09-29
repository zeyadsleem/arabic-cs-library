---
title: "أفضل ممارسات أسلوب Go (1 من 2)"
lang: ar
source: https://google.github.io/styleguide/go/best-practices
---

## نبذة

يوثّق هذا الملف **إرشادات حول كيفية تطبيق دليل أسلوب Go على أفضل وجه**. هذه الإرشادات موجّهة إلى المواقف الشائعة التي تتكرّر كثيرًا، لكنها قد لا تنطبق في كل الظروف. وحيثما أمكن، تُناقَش عدة مقاربات بديلة إلى جانب الاعتبارات التي تدخل في قرار متى نطبّقها ومتى لا نطبّقها.

راجع [النظرة العامة](https://google.github.io/styleguide/go/index#about) للاطلاع على المجموعة الكاملة من وثائق دليل الأسلوب.

## التسمية

### أسماء الدوال والطرائق

#### تجنّب التكرار

عند اختيار اسم لدالة أو طريقة، ضع في اعتبارك السياق الذي سيُقرأ فيه الاسم. خذ بعين الاعتبار التوصيات التالية لتجنّب [التكرار](/book/go-style/decisions-2/index#repetition) المفرط في موضع الاستدعاء:

- يمكن عمومًا حذف ما يلي من أسماء الدوال والطرائق: أنواع المُدخَلات والمُخرَجات (عند عدم وجود تعارض)
- نوع مستقبِل الطريقة
- ما إذا كان المُدخَل أو المُخرَج مؤشّرًا

بالنسبة إلى الدوال، لا [تُكرّر اسم الحزمة](/book/go-style/decisions-2/index#repetitive-with-package).

```
// Bad:
package yamlconfig
func ParseYAMLConfig(input string) (*Config, error)
```

```
// Good:
package yamlconfig
func Parse(input string) (*Config, error)
```

بالنسبة إلى الطرائق، لا تُكرّر اسم مستقبِل الطريقة.

```
// Bad:
func (c *Config) WriteConfigTo(w io.Writer) (int64, error)
```

```
// Good:
func (c *Config) WriteTo(w io.Writer) (int64, error)
```

لا تُكرّر أسماء المتغيّرات التي تُمرَّر كوسائط.

```
// Bad:
func OverrideFirstWithSecond(dest, source *Config) error
```

```
// Good:
func Override(dest, source *Config) error
```

لا تُكرّر أسماء القيم المُعادة وأنواعها.

```
// Bad:
func TransformToJSON(input *Config) *jsonconfig.Config
```

```
// Good:
func Transform(input *Config) *jsonconfig.Config
```

عندما يلزم إزالة الالتباس بين دوال متشابهة الاسم، لا بأس في تضمين معلومات إضافية.

```
// Good:
func (c *Config) WriteTextTo(w io.Writer) (int64, error)
func (c *Config) WriteBinaryTo(w io.Writer) (int64, error)
```

#### اصطلاحات التسمية

هناك بعض الاصطلاحات الشائعة الأخرى عند اختيار أسماء الدوال والطرائق:

تُمنح الدوال التي تُعيد شيئًا أسماء ذات طابع اسمي.

```
// Good:
func (c *Config) JobName(key string) (value string, ok bool)
```

ويترتّب على ذلك أن أسماء الدوال والطرائق ينبغي أن [تتجنّب البادئة `Get`](/book/go-style/decisions-2/index#getters).

```
// Bad:
func (c *Config) GetJobName(key string) (value string, ok bool)
```

وتُمنح الدوال التي تقوم بفعل ما أسماء ذات طابع فعلي.

```
// Good:
func (c *Config) WriteDetail(w io.Writer) (int64, error)
```

الدوال المتماثلة التي تختلف فقط في الأنواع المعنية تُضمّن اسم النوع في نهاية الاسم.

```
// Good:
func ParseInt(input string) (int, error)
func ParseInt64(input string) (int64, error)
func AppendInt(buf []byte, value int) []byte
func AppendInt64(buf []byte, value int64) []byte
```

إذا وُجدت نسخة «أساسية» واضحة، فيمكن حذف النوع من الاسم لتلك النسخة:

```
// Good:
func (c *Config) Marshal() ([]byte, error)
func (c *Config) MarshalText() (string, error)
```

### حزم البدائل الاختبارية والدوال المساعدة

هناك عدة مناهج يمكنك تطبيقها على [تسمية](/book/go-style/guide/index#naming) الحزم والأنواع التي توفّر دوال اختبار مساعدة، وبخاصة [البدائل الاختبارية](https://abseil.io/resources/swe-book/html/ch13.html#basic_concepts). قد يكون البديل الاختباري بديلًا صوريًا (stub) أو مزيّفًا (fake) أو محاكيًا (mock) أو جاسوسًا (spy).

تستخدم هذه الأمثلة في معظمها بدائل صورية. عدّل أسماءك وفقًا لذلك إذا كانت شيفرتك تستخدم بدائل مزيّفة أو نوعًا آخر من البدائل الاختبارية.

افترض أن لديك حزمة مركّزة جيدًا توفّر شيفرة إنتاجية مشابهة لما يلي:

```python
package creditcard
import (
    "errors"
    "path/to/money"
)
// ErrDeclined indicates that the issuer declines the charge.
var ErrDeclined = errors.New("creditcard: declined")
// Card contains information about a credit card, such as its issuer,
// expiration, and limit.
type Card struct {
    // omitted
}
// Service allows you to perform operations with credit cards against external
// payment processor vendors like charge, authorize, reimburse, and subscribe.
type Service struct {
    // omitted
}
func (s *Service) Charge(c *Card, amount money.Money) error { /* omitted */ }
```

#### إنشاء حزم مساعدة للاختبار

افترض أنك تريد إنشاء حزمة تحتوي على بدائل اختبارية لأخرى. سنستخدم `package creditcard` (من الأعلى) في هذا المثال:

أحد الأساليب هو إنشاء حزمة Go جديدة مبنية على الحزمة الإنتاجية لأغراض الاختبار. والخيار الآمن هو إلحاق كلمة `test` باسم الحزمة الأصلي («creditcard» + «test»):

```
// Good:
package creditcardtest
```

ما لم يُذكر خلاف ذلك صراحةً، فإن جميع الأمثلة في الأقسام التالية موجودة في `package creditcardtest`.

#### الحالة البسيطة

تريد إضافة مجموعة من البدائل الاختبارية لـ `Service`. ولأن `Card` نوع بيانات بسيط فعليًا، شبيه برسالة Protocol Buffer، فلا يحتاج إلى معالجة خاصة في الاختبارات، ومن ثمّ لا حاجة إلى بديل له. وإذا كنت تتوقّع بدائل اختبارية لنوع واحد فقط (مثل `Service`)، فيمكنك اتباع مقاربة موجزة في تسمية البدائل:

```python
// Good:
import (
    "path/to/creditcard"
    "path/to/money"
)
// Stub stubs creditcard.Service and provides no behavior of its own.
type Stub struct{}
func (Stub) Charge(*creditcard.Card, money.Money) error { return nil }
```

هذا أفضل بشكل قاطع من اختيار تسمية مثل `StubService` أو التسمية السيئة جدًا `StubCreditCardService`، لأن اسم الحزمة الأساسية وأنواع مجالها تدلّان ضمنًا على ماهية `creditcardtest.Stub`.

أخيرًا، إذا كانت الحزمة تُبنى باستخدام Bazel، فتأكّد من تعليم قاعدة `go_library` الجديدة للحزمة بـ `testonly`:

```
# Good:
go_library(
    name = "creditcardtest",
    srcs = ["creditcardtest.go"],
    deps = [
        ":creditcard",
        ":money",
    ],
    testonly = True,
)
```

المقاربة أعلاه تقليدية وسيفهمها المهندسون الآخرون فهمًا جيدًا معقولًا.

انظر أيضًا:

- [Go Tip #42: Authoring a Stub for Testing](https://google.github.io/styleguide/go/index.html#gotip)

#### سلوكيات متعددة للبديل الاختباري

عندما لا يكفي نوع واحد من البدائل الصورية (مثلًا، تحتاج أيضًا إلى بديل يفشل دائمًا)، نوصي بتسمية البدائل وفقًا للسلوك الذي تحاكيه. هنا نعيد تسمية `Stub` إلى `AlwaysCharges` ونقدّم بديلًا صوريًا جديدًا باسم `AlwaysDeclines`:

```
// Good:
// AlwaysCharges stubs creditcard.Service and simulates success.
type AlwaysCharges struct{}
func (AlwaysCharges) Charge(*creditcard.Card, money.Money) error { return nil }
// AlwaysDeclines stubs creditcard.Service and simulates declined charges.
type AlwaysDeclines struct{}
func (AlwaysDeclines) Charge(*creditcard.Card, money.Money) error {
    return creditcard.ErrDeclined
}
```

#### بدائل متعددة لأنواع متعددة

لكن افترض الآن أن `package creditcard` يحتوي على أنواع متعددة يستحق كل منها إنشاء بديل له، كما يظهر أدناه مع `Service` و`StoredValue`:

```
package creditcard
type Service struct {
    // omitted
}
type Card struct {
    // omitted
}
// StoredValue manages customer credit balances.  This applies when returned
// merchandise is credited to a customer's local account instead of processed
// by the credit issuer.  For this reason, it is implemented as a separate
// service.
type StoredValue struct {
    // omitted
}
func (s *StoredValue) Credit(c *Card, amount money.Money) error { /* omitted */ }
```

في هذه الحالة، تكون التسمية الأكثر وضوحًا للبدائل الاختبارية منطقية:

```
// Good:
type StubService struct{}
func (StubService) Charge(*creditcard.Card, money.Money) error { return nil }
type StubStoredValue struct{}
func (StubStoredValue) Credit(*creditcard.Card, money.Money) error { return nil }
```

#### المتغيّرات المحلية في الاختبارات

عندما تشير متغيّرات في اختباراتك إلى بدائل، فاختر اسمًا يميّز البديل تمييزًا واضحًا عن أنواع الإنتاج الأخرى بناءً على السياق. تأمّل بعض الشيفرة الإنتاجية التي تريد اختبارها:

```python
package payment
import (
    "path/to/creditcard"
    "path/to/money"
)
type CreditCard interface {
    Charge(*creditcard.Card, money.Money) error
}
type Processor struct {
    CC CreditCard
}
var ErrBadInstrument = errors.New("payment: instrument is invalid or expired")
func (p *Processor) Process(c *creditcard.Card, amount money.Money) error {
    if c.Expired() {
        return ErrBadInstrument
    }
    return p.CC.Charge(c, amount)
}
```

في الاختبارات، يوضع البديل الاختباري المسمّى «جاسوسًا» (spy) لـ `CreditCard` إلى جانب أنواع الإنتاج، لذا قد تُحسّن بادئة الاسم الوضوح.

```python
// Good:
package payment
import "path/to/creditcardtest"
func TestProcessor(t *testing.T) {
    var spyCC creditcardtest.Spy
    proc := &Processor{CC: spyCC}
    // declarations omitted: card and amount
    if err := proc.Process(card, amount); err != nil {
        t.Errorf("proc.Process(card, amount) = %v, want nil", err)
    }
    charges := []creditcardtest.Charge{
        {Card: card, Amount: amount},
    }
    if got, want := spyCC.Charges, charges; !cmp.Equal(got, want) {
        t.Errorf("spyCC.Charges = %v, want %v", got, want)
    }
}
```

هذا أوضح مما لو لم تُضَف البادئة إلى الاسم.

```python
// Bad:
package payment
import "path/to/creditcardtest"
func TestProcessor(t *testing.T) {
    var cc creditcardtest.Spy
    proc := &Processor{CC: cc}
    // declarations omitted: card and amount
    if err := proc.Process(card, amount); err != nil {
        t.Errorf("proc.Process(card, amount) = %v, want nil", err)
    }
    charges := []creditcardtest.Charge{
        {Card: card, Amount: amount},
    }
    if got, want := cc.Charges, charges; !cmp.Equal(got, want) {
        t.Errorf("cc.Charges = %v, want %v", got, want)
    }
}
```

### التظليل

**ملاحظة:** يستخدم هذا الشرح مصطلحين غير رسميين هما *الدوس* (stomping) و*التظليل* (shadowing). وهما ليسا مفهومين رسميين في مواصفة لغة Go.

مثل كثير من لغات البرمجة، تمتلك Go متغيّرات قابلة للتغيير: فالإسناد إلى متغيّر يغيّر قيمته.

```
// Good:
func abs(i int) int {
    if i < 0 {
        i *= -1
    }
    return i
}
```

عند استخدام [تصريحات المتغيّرات القصيرة](https://go.dev/ref/spec#Short_variable_declarations) مع المعامل `:=`، لا يُنشَأ متغيّر جديد في بعض الحالات. يمكننا تسمية ذلك *الدوس* (stomping). ولا بأس بفعله عندما لا تكون القيمة الأصلية مطلوبة بعد الآن.

```
// Good:
// innerHandler is a helper for some request handler, which itself issues
// requests to other backends.
func (s *Server) innerHandler(ctx context.Context, req *pb.MyRequest) *pb.MyResponse {
    // Unconditionally cap the deadline for this part of request handling.
    ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
    defer cancel()
    ctxlog.Info(ctx, "Capped deadline in inner request")
    // Code here no longer has access to the original context.
    // This is good style if when first writing this, you anticipate
    // that even as the code grows, no operation legitimately should
    // use the (possibly unbounded) original context that the caller provided.
    // ...
}
```

لكن احترس من استخدام تصريحات المتغيّرات القصيرة في نطاق جديد: فذلك يُنشئ متغيّرًا جديدًا. يمكننا تسمية ذلك *تظليل* المتغيّر الأصلي. والشيفرة بعد نهاية الكتلة تشير إلى المتغيّر الأصلي. وهذه محاولة معطوبة لتقصير الموعد النهائي شرطيًا:

```
// Bad:
func (s *Server) innerHandler(ctx context.Context, req *pb.MyRequest) *pb.MyResponse {
    // Attempt to conditionally cap the deadline.
    if *shortenDeadlines {
        ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
        defer cancel()
        ctxlog.Info(ctx, "Capped deadline in inner request")
    }
    // BUG: "ctx" here again means the context that the caller provided.
    // The above buggy code compiled because both ctx and cancel
    // were used inside the if statement.
    // ...
}
```

قد تكون النسخة الصحيحة من الشيفرة كما يلي:

```javascript
// Good:
func (s *Server) innerHandler(ctx context.Context, req *pb.MyRequest) *pb.MyResponse {
    if *shortenDeadlines {
        var cancel func()
        // Note the use of simple assignment, = and not :=.
        ctx, cancel = context.WithTimeout(ctx, 3*time.Second)
        defer cancel()
        ctxlog.Info(ctx, "Capped deadline in inner request")
    }
    // ...
}
```

في الحالة التي سمّيناها الدوس، ولأنه لا يوجد متغيّر جديد، يجب أن يطابق النوع المُسنَد نوع المتغيّر الأصلي. أما مع التظليل، فيُدخَل كيان جديد تمامًا، لذا يمكن أن يكون له نوع مختلف. وقد يكون التظليل المتعمّد ممارسة مفيدة، لكن يمكنك دائمًا استخدام اسم جديد إذا كان ذلك يحسّن [الوضوح](/book/go-style/guide/index#clarity).

ليس من الجيد استخدام متغيّرات تحمل الأسماء نفسها لحزم قياسية خارج نطاقات صغيرة جدًا، لأن ذلك يجعل الدوال والقيم الحرة من تلك الحزمة غير قابلة للوصول. وعلى العكس، عند اختيار اسم لحزمتك، تجنّب الأسماء التي يُرجَّح أن تتطلّب [إعادة تسمية الاستيراد](/book/go-style/decisions-2/index#import-renaming) أو أن تسبّب تظليلًا لأسماء متغيّرات جيدة على جانب العميل.

```
// Bad:
func LongFunction() {
    url := "https://example.com/"
    // Oops, now we can't use net/url in code below.
}
```

### حزم الأدوات المساعدة

تمتلك حزم Go اسمًا محدَّدًا في تصريح `package`، منفصلًا عن مسار الاستيراد. واسم الحزمة أهمّ للقابلية للقراءة من المسار.

ينبغي أن تكون أسماء حزم Go [مرتبطة بما توفّره الحزمة](/book/go-style/decisions-2/index#package-names). وتسمية حزمة بـ `util` أو `helper` أو `common` أو ما شابه هي عادةً خيار سيئ (وإن كان يمكن استخدامها كـ*جزء* من الاسم). فالأسماء غير المفيدة تجعل الشيفرة أصعب قراءةً، وإذا استُخدمت على نطاق واسع جدًا فقد تسبّب [تعارضات استيراد](/book/go-style/decisions-2/index#import-renaming) لا داعي لها.

بدلًا من ذلك، تأمّل كيف سيبدو موضع الاستدعاء.

```
// Good:
db := spannertest.NewDatabaseFromFile(...)
_, err := f.Seek(0, io.SeekStart)
b := elliptic.Marshal(curve, x, y)
```

يمكنك معرفة ما تفعله كل واحدة منها تقريبًا حتى دون معرفة قائمة الاستيرادات (`cloud.google.com/go/spanner/spannertest` و`io` و`crypto/elliptic`). ومع أسماء أقل تركيزًا، قد تُقرأ هكذا:

```
// Bad:
db := test.NewDatabaseFromFile(...)
_, err := f.Seek(0, common.SeekStart)
b := helper.Marshal(curve, x, y)
```

## حجم الحزمة

إذا كنت تتساءل عن الحجم الذي ينبغي أن تكون عليه حزم Go لديك، وعمّا إذا كان ينبغي وضع الأنواع المرتبطة في الحزمة نفسها أم تقسيمها إلى حزم مختلفة، فإن نقطة انطلاق جيدة هي [تدوينة Go حول أسماء الحزم](https://go.dev/blog/package-names). فرغم عنوان التدوينة، فهي ليست عن التسمية وحدها. إذ تحتوي على بعض التلميحات المفيدة وتستشهد بعدة مقالات ومحاضرات نافعة.

وفيما يلي بعض الاعتبارات والملاحظات الأخرى.

يرى المستخدمون [godoc](https://pkg.go.dev/) للحزمة في صفحة واحدة، وتُجمَّع أي طرائق تصدّرها الأنواع التي توفّرها الحزمة حسب نوعها. كما تُجمّع godoc الدوال البانية (constructors) مع الأنواع التي تُعيدها. وإذا كان من المرجّح أن تحتاج *شيفرة العميل* إلى قيمتين مختلفتي النوع لتفاعل إحداهما مع الأخرى، فقد يكون من المناسب للمستخدم وجودهما في الحزمة نفسها.

يمكن للشيفرة داخل حزمة الوصول إلى المعرّفات غير المصدَّرة في الحزمة. وإذا كان لديك بضعة أنواع مرتبطة يكون *تنفيذها* مقترنًا اقترانًا وثيقًا، فإن وضعها في الحزمة نفسها يتيح لك تحقيق هذا الاقتران دون تلويث الواجهة البرمجية العامة بهذه التفاصيل. وهناك اختبار جيد لهذا الاقتران: تخيّل مستخدمًا افتراضيًا لحزمتين تغطّيان موضوعات وثيقة الصلة: إذا كان على المستخدم استيراد كلتا الحزمتين لاستخدام أيٍّ منهما استخدامًا ذا معنى، فجمعُهما معًا هو الصواب عادةً. وتوضّح المكتبة القياسية عمومًا هذا النوع من تحديد النطاق والطبقات توضيحًا جيدًا.

ومع كل ما قيل، فإن وضع مشروعك بأكمله في حزمة واحدة قد يجعل تلك الحزمة كبيرة جدًا. وعندما يكون شيء ما متمايزًا مفهوميًا، فإن منحه حزمة صغيرة خاصة به قد يسهّل استخدامه. ويعمل الاسم القصير للحزمة كما يعرفه العملاء مع اسم النوع المصدَّر معًا على تكوين معرّف ذي معنى: مثل `bytes.Buffer` و`ring.New`. وتحتوي [تدوينة أسماء الحزم](https://go.dev/blog/package-names) على مزيد من الأمثلة.

أسلوب Go مرن بشأن حجم الملف، لأن القائمين على الصيانة يمكنهم نقل الشيفرة داخل الحزمة من ملف إلى آخر دون التأثير على المستدعين. لكن كإرشاد عام: ليس من الجيد عادةً أن يحتوي ملف واحد على آلاف عديدة من الأسطر، أو أن تكون هناك ملفات صغيرة كثيرة. ولا يوجد اصطلاح «نوع واحد، ملف واحد» كما في بعض اللغات الأخرى. وكقاعدة عامة، ينبغي أن تكون الملفات مركّزة بما يكفي ليعرف القائم على الصيانة أي ملف يحتوي على شيء ما، وأن تكون صغيرة بما يكفي ليسهل العثور عليه هناك. وغالبًا ما تقسّم المكتبة القياسية الحزم الكبيرة إلى عدة ملفات مصدرية، وتجمّع الشيفرة المرتبطة حسب الملف. ويُعدّ مصدر [الحزمة `bytes`](https://go.dev/src/bytes/) مثالًا جيدًا. وقد تختار الحزم ذات التوثيق الطويل تخصيص ملف واحد باسم `doc.go` يحتوي على [توثيق الحزمة](/book/go-style/decisions-2/index#package-comments) وتصريح حزمة، ولا شيء غير ذلك، لكن هذا ليس مطلوبًا.

داخل قاعدة شيفرة Google وفي المشاريع التي تستخدم Bazel، يختلف تنظيم المجلدات لشيفرة Go عمّا هو عليه في مشاريع Go مفتوحة المصدر: إذ يمكن أن يكون لديك عدة أهداف `go_library` في مجلد واحد. ومن الأسباب الجيدة لمنح كل حزمة مجلدًا خاصًا بها أن تتوقّع فتح مشروعك كمصدر مفتوح في المستقبل.

وفيما يلي بضعة أمثلة مرجعية غير قياسية للمساعدة في إظهار هذه الأفكار عمليًا:

- حزم صغيرة تحتوي على فكرة واحدة متماسكة لا تستدعي إضافة شيء ولا حذف شيء: [الحزمة `csv`](https://pkg.go.dev/encoding/csv): ترميز بيانات CSV وفكّ ترميزها مع تقسيم المسؤولية على التوالي بين [reader.go](https://go.googlesource.com/go/+/refs/heads/master/src/encoding/csv/reader.go) و[writer.go](https://go.googlesource.com/go/+/refs/heads/master/src/encoding/csv/writer.go).
- [الحزمة `expvar`](https://pkg.go.dev/expvar): قياسات البرنامج من الداخل (whitebox) موجودة كلها في [expvar.go](https://go.googlesource.com/go/+/refs/heads/master/src/expvar/expvar.go).

حزم متوسطة الحجم تحتوي على مجال كبير واحد ومسؤولياته المتعددة معًا:

- [الحزمة `flag`](https://pkg.go.dev/flag): إدارة أعلام سطر الأوامر موجودة كلها في [flag.go](https://go.googlesource.com/go/+/refs/heads/master/src/flag/flag.go).

حزم كبيرة توزّع عدة مجالات وثيقة الصلة على عدة ملفات:

- [الحزمة `http`](https://pkg.go.dev/net/http): جوهر HTTP: [client.go](https://go.googlesource.com/go/+/refs/heads/master/src/net/http/client.go)، دعم عملاء HTTP؛ [server.go](https://go.googlesource.com/go/+/refs/heads/master/src/net/http/client.go)، دعم خوادم HTTP؛ [cookie.go](https://go.googlesource.com/go/+/refs/heads/master/src/net/http/cookie.go)، إدارة ملفات تعريف الارتباط (cookies).
- [الحزمة `os`](https://pkg.go.dev/os): تجريدات نظام التشغيل عبر المنصات: [exec.go](https://go.googlesource.com/go/+/refs/heads/master/src/os/exec.go)، إدارة العمليات الفرعية؛ [file.go](https://go.googlesource.com/go/+/refs/heads/master/src/os/file.go)، إدارة الملفات؛ [tempfile.go](https://go.googlesource.com/go/+/refs/heads/master/src/os/tempfile.go)، الملفات المؤقتة.

انظر أيضًا:

- [حزم البدائل الاختبارية](#naming-doubles)
- [Organizing Go Code (Blog Post)](https://go.dev/blog/organizing-go-code)
- [Organizing Go Code (Presentation)](https://go.dev/talks/2014/organizeio.slide)

## الاستيراد

### رسائل Protocol Buffer والبدائل الصورية

تُعامَل استيرادات مكتبة Proto بشكل مختلف عن استيرادات Go القياسية نظرًا لطبيعتها العابرة للغات. ويستند اصطلاح إعادة تسمية استيرادات proto إلى القاعدة التي أنشأت الحزمة:

- تُستخدم اللاحقة `pb` عمومًا لقواعد `go_proto_library`.
- وتُستخدم اللاحقة `grpc` عمومًا لقواعد `go_grpc_library`.

وغالبًا ما تُستخدم كلمة واحدة تصف الحزمة:

```python
// Good:
import (
    foopb "path/to/package/foo_service_go_proto"
    foogrpc "path/to/package/foo_service_go_grpc"
)
```

اتبع إرشادات الأسلوب الخاصة بـ[أسماء الحزم](https://google.github.io/styleguide/go/decisions#package-names). فضّل الكلمات الكاملة. الأسماء القصيرة جيدة، لكن تجنّب الغموض. وعند الشك، استخدم اسم حزمة proto حتى `_go` مع لاحقة pb:

```python
// Good:
import (
    pushqueueservicepb "path/to/package/push_queue_service_go_proto"
)
```

**ملاحظة:** شجّعت الإرشادات السابقة على أسماء قصيرة جدًا مثل «xpb» أو حتى «pb» فقط. وينبغي أن تفضّل الشيفرة الجديدة أسماء أكثر وصفًا. أما الشيفرة الموجودة التي تستخدم أسماء قصيرة فلا ينبغي استخدامها كمثال، لكنها لا تحتاج إلى تغيير.

### ترتيب الاستيراد

راجع [قرارات أسلوب Go: تجميع الاستيراد](/book/go-style/decisions-2/index#import-grouping).

## معالجة الأخطاء

في Go، [الأخطاء قيم](https://go.dev/blog/errors-are-values)؛ تُنشئها الشيفرة وتستهلكها الشيفرة. ويمكن أن تكون الأخطاء:

- محوَّلة إلى معلومات تشخيصية لعرضها على البشر
- مستخدَمة من القائم على الصيانة
- مفسَّرة من مستخدم نهائي

تظهر رسائل الخطأ أيضًا عبر مجموعة متنوعة من الواجهات المختلفة، بما في ذلك رسائل السجلّ، ومَقالب تفريغ الأخطاء، وواجهات المستخدم المعروضة.

ينبغي أن تتعامل الشيفرة التي تعالج الأخطاء (تُنتجها أو تستهلكها) معها بوعي وقصد. وقد يكون من المغري تجاهل قيمة خطأ مُعادة أو نشرها بشكل أعمى. ومع ذلك، يجدر دائمًا التفكير فيما إذا كانت الدالة الحالية في إطار الاستدعاء هي الأقدر على معالجة الخطأ على نحو فعّال. وهذا موضوع واسع ويصعب إعطاء نصيحة قاطعة بشأنه. استخدم حكمك، لكن ضع في اعتبارك الاعتبارات التالية:

- عند إنشاء قيمة خطأ، قرّر ما إذا كنت ستمنحها أي [بنية](#error-structure).
- عند معالجة خطأ، فكّر في [إضافة معلومات](#error-extra-info) تملكها لكن قد لا يملكها المستدعي و/أو المدعوّ.
- راجع أيضًا الإرشادات حول [تسجيل الأخطاء](#error-logging).

ورغم أنه ليس مناسبًا عادةً تجاهل خطأ ما، فمن الاستثناءات المعقولة لذلك تنسيق عمليات مرتبطة، حيث لا يكون مفيدًا غالبًا سوى الخطأ الأول. وتوفّر الحزمة [`errgroup`](https://pkg.go.dev/golang.org/x/sync/errgroup) تجريدًا ملائمًا لمجموعة عمليات يمكن أن تفشل كلها أو تُلغى كمجموعة.

انظر أيضًا:

- [Effective Go on errors](https://go.dev/doc/effective_go#errors)
- [A post by the Go Blog on errors](https://go.dev/blog/go1.13-errors)
- [Package `errors`](https://pkg.go.dev/errors)
- [Package `upspin.io/errors`](https://commandcenter.blogspot.com/2017/12/error-handling-in-upspin.html)
- [GoTip #89: When to Use Canonical Status Codes as Errors](https://google.github.io/styleguide/go/index.html#gotip)
- [GoTip #48: Error Sentinel Values](https://google.github.io/styleguide/go/index.html#gotip)
- [GoTip #13: Designing Errors for Checking](https://google.github.io/styleguide/go/index.html#gotip)

### بنية الخطأ

إذا كان على المستدعين استجواب الخطأ (مثل التمييز بين حالات خطأ مختلفة)، فامنح قيمة الخطأ بنية تتيح القيام بذلك برمجيًا بدلًا من أن يقوم المستدعي بمطابقة السلاسل النصية. وتنطبق هذه النصيحة على شيفرة الإنتاج وكذلك على الاختبارات التي تهتم بحالات خطأ مختلفة.

أبسط الأخطاء المهيكلة هي قيم عامة غير مُعامَلة (unparameterized).

```javascript
type Animal string
var (
    // ErrDuplicate occurs if this animal has already been seen.
    ErrDuplicate = errors.New("duplicate")
    // ErrMarsupial occurs because we're allergic to marsupials outside Australia.
    // Sorry.
    ErrMarsupial = errors.New("marsupials are not supported")
)
func process(animal Animal) error {
    switch {
    case seen[animal]:
        return ErrDuplicate
    case marsupial(animal):
        return ErrMarsupial
    }
    seen[animal] = true
    // ...
    return nil
}
```

يمكن للمستدعي ببساطة مقارنة قيمة الخطأ المُعادة من الدالة بإحدى قيم الخطأ المعروفة:

```
// Good:
func handlePet(...) {
    switch err := process(an); err {
    case ErrDuplicate:
        return fmt.Errorf("feed %q: %v", an, err)
    case ErrMarsupial:
        // Try to recover with a friend instead.
        alternate = an.BackupAnimal()
        return handlePet(..., alternate, ...)
    }
}
```

يستخدم ما سبق قيمًا علامية (sentinel values)، حيث يجب أن يكون الخطأ مساويًا (بمعنى `==`) للقيمة المتوقعة. وهذا كافٍ تمامًا في كثير من الحالات. وإذا أعادت `process` أخطاء مُغلَّفة (كما سيُبحث أدناه)، فيمكنك استخدام [`errors.Is`](https://pkg.go.dev/errors#Is).

```
// Good:
func handlePet(...) {
    switch err := process(an); {
    case errors.Is(err, ErrDuplicate):
        return fmt.Errorf("feed %q: %v", an, err)
    case errors.Is(err, ErrMarsupial):
        // ...
    }
}
```

لا تحاول التمييز بين الأخطاء بناءً على شكلها النصّي. (راجع [Go Tip #13: Designing Errors for Checking](https://google.github.io/styleguide/go/index.html#gotip) للمزيد.)

```
// Bad:
func handlePet(...) {
    err := process(an)
    if regexp.MatchString(`duplicate`, err.Error()) {...}
    if regexp.MatchString(`marsupial`, err.Error()) {...}
}
```

إذا كان في الخطأ معلومات إضافية يحتاجها المستدعي برمجيًا، فمن المثالي تقديمها بشكل بنيوي. فمثلًا، يُوثَّق النوع [`os.PathError`](https://pkg.go.dev/os#PathError) بأنه يضع اسم مسار العملية الفاشلة في حقل بنية يمكن للمستدعي الوصول إليه بسهولة.

يمكن استخدام بنى أخطاء أخرى حسب الاقتضاء، مثل بنية خاصة بالمشروع تحتوي على رمز خطأ وسلسلة تفاصيل. وتُعدّ [الحزمة `status`](https://pkg.go.dev/google.golang.org/grpc/status) تغليفًا شائعًا؛ وإذا اخترت هذه المقاربة (ولستَ ملزمًا بها)، فاستخدم [رموزًا قياسية](https://pkg.go.dev/google.golang.org/grpc/codes). راجع [Go Tip #89: When to Use Canonical Status Codes as Errors](https://google.github.io/styleguide/go/index.html#gotip) لمعرفة ما إذا كان استخدام رموز الحالة هو الخيار الصحيح.

### إضافة معلومات إلى الأخطاء

عند إضافة معلومات إلى الأخطاء، تجنّب المعلومات الزائدة التي يوفّرها الخطأ الأساسي بالفعل. فمثلًا، تتضمّن حزمة `os` بالفعل معلومات المسار في أخطائها.

```
// Good:
if err := os.Open("settings.txt"); err != nil {
  return fmt.Errorf("launch codes unavailable: %v", err)
}
// Output:
//
// launch codes unavailable: open settings.txt: no such file or directory
```

هنا، تضيف عبارة «launch codes unavailable» معنى محددًا إلى خطأ `os.Open` ذا صلة بسياق الدالة الحالية، دون تكرار معلومات مسار الملف الأساسية.

```
// Bad:
if err := os.Open("settings.txt"); err != nil {
  return fmt.Errorf("could not open settings.txt: %v", err)
}
// Output:
//
// could not open settings.txt: open settings.txt: no such file or directory
```

لا تُضِف تعليقًا توضيحيًا إذا كان غرضه الوحيد الإشارة إلى فشل دون إضافة معلومات جديدة. فوجود الخطأ ينقل الفشل إلى المستدعي نقلًا كافيًا.

```
// Bad:
return fmt.Errorf("failed: %v", err) // just return err instead
```

يُعدّ [الاختيار بين `%v` و`%w` عند تغليف الأخطاء](https://go.dev/blog/go1.13-errors#whether-to-wrap) باستخدام `fmt.Errorf` قرارًا دقيقًا يؤثّر تأثيرًا كبيرًا في كيفية نشر الأخطاء ومعالجتها وفحصها وتوثيقها داخل تطبيقك. والمبدأ الجوهري هو جعل قيم الأخطاء مفيدة لمن يلاحظها، سواء أكانوا بشرًا أم شيفرة.

**`%v` للتعليق البسيط أو لخطأ جديد**

صيغة `%v` هي أداتك العامة لتنسيق السلاسل النصية لأي قيمة في Go، بما في ذلك الأخطاء. وعند استخدامها مع `fmt.Errorf`، فإنها تُضمّن التمثيل النصّي للخطأ (ما تُعيده طريقة `Error()` الخاصة به) في قيمة خطأ جديدة، مع إسقاط أي معلومات بنيوية من الخطأ الأصلي. أمثلة على استخدام `%v`:

إضافة سياق مهم غير زائد: كما في المثال أعلاه.

تسجيل الأخطاء أو عرضها: عندما يكون الهدف الأساسي تقديم رسالة خطأ قابلة للقراءة البشرية في السجلّات أو للمستخدم، ولا تنوي أن يستخدم المستدعي `errors.Is` أو `errors.As` برمجيًا مع الخطأ (ملاحظة: لا يُنصَح عمومًا بـ`errors.Unwrap` هنا لأنه لا يتعامل مع الأخطاء المتعددة).

إنشاء أخطاء جديدة مستقلة: يلزم أحيانًا تحويل خطأ إلى رسالة خطأ جديدة، وبذلك تُخفى تفاصيل الخطأ الأصلي. وتكون هذه الممارسة مفيدة بشكل خاص عند حدود الأنظمة، بما في ذلك على سبيل المثال لا الحصر RPC وIPC والتخزين، حيث نترجم الأخطاء الخاصة بمجال معيّن إلى فضاء أخطاء قياسي.

```
// Good:
func (*FortuneTeller) SuggestFortune(context.Context, *pb.SuggestionRequest) (*pb.SuggestionResponse, error) {
  // ...
  if err != nil {
    return nil, fmt.Errorf("couldn't find fortune database: %v", err)
  }
}
```

ويمكننا أيضًا أن نُعلّق صراحةً على رمز RPC `Internal` في المثال أعلاه.

```python
// Good:
import (
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"
)
func (*FortuneTeller) SuggestFortune(context.Context, *pb.SuggestionRequest) (*pb.SuggestionResponse, error) {
  // ...
  if err != nil {
    // Or use fmt.Errorf with the %w verb if deliberately wrapping an
    // error which the caller is meant to unwrap.
    return nil, status.Errorf(codes.Internal, "couldn't find fortune database", status.ErrInternal)
  }
}
```

**`%w` (التغليف) للفحص البرمجي وتسلسل الأخطاء**

صيغة `%w` مصمَّمة خصيصًا لتغليف الأخطاء. فهي تُنشئ خطأً جديدًا يوفّر طريقة `Unwrap()`، ما يتيح للمستدعين فحص سلسلة الأخطاء برمجيًا باستخدام `errors.Is` و`errors.As`. أمثلة على استخدام `%w`:

إضافة سياق مع الحفاظ على الخطأ الأصلي لفحصه برمجيًا: هذه هي حالة الاستخدام الأساسية داخل الدوال المساعدة في تطبيقك. إذ تريد إثراء خطأ بسياق إضافي (مثل العملية التي كانت تُنفَّذ عند الفشل) مع السماح للمستدعي بفحص ما إذا كان الخطأ الأساسي خطأً علاميًا أو نوعًا محددًا.

```
// Good:
func (s *Server) internalFunction(ctx context.Context) error {
  // ...
  if err != nil {
    return fmt.Errorf("couldn't find remote file: %w", err)
  }
}
```

يتيح ذلك لدالة أعلى مستوى تنفيذ `errors.Is(err, fs.ErrNotExist)` إذا كان الخطأ الأساسي هو `fs.ErrNotExist`، حتى وإن كان مُغلَّفًا.

عند النقاط التي يتفاعل فيها نظامك مع أنظمة خارجية مثل RPC أو IPC أو التخزين، غالبًا ما يكون من الأفضل ترجمة الأخطاء الخاصة بالمجال إلى فضاء أخطاء موحّد (مثل رموز حالة gRPC) بدلًا من مجرد تغليف الخطأ الأساسي الخام بـ`%w`. فالعميل عادةً لا يهمّه خطأ نظام الملفات الداخلي الدقيق؛ بل يهمّه النتيجة القياسية (مثل `Internal` و`NotFound` و`PermissionDenied`).

عندما توثّق وتختبر صراحةً الأخطاء الأساسية التي تكشفها: إذا كانت واجهة حزمتك البرمجية تضمن إمكانية فكّ تغليف أخطاء أساسية معيّنة وفحصها من المستدعين (مثل «قد تُعيد هذه الدالة `ErrInvalidConfig` مُغلَّفًا داخل خطأ أعمّ»)، فإن `%w` يكون مناسبًا. ويشكّل ذلك جزءًا من عقد حزمتك.

انظر أيضًا:

- [اصطلاحات توثيق الأخطاء](#documentation-conventions-errors)
- [Blog post on error wrapping](https://blog.golang.org/go1.13-errors)

### موضع %w في الأخطاء

فضّل وضع `%w` في نهاية سلسلة الخطأ *إذا* كنت ستستخدم [تغليف الخطأ](https://go.dev/blog/go1.13-errors) مع صيغة التنسيق `%w`.

يمكن تغليف الأخطاء بصيغة `%w`، أو بوضعها في [خطأ مهيكل](https://google.github.io/styleguide/go/index.html#gotip) يُنفّذ `Unwrap() error` (مثال: [`fs.PathError`](https://pkg.go.dev/io/fs#PathError)).

تشكّل الأخطاء المُغلَّفة سلاسل أخطاء: فكل طبقة تغليف جديدة تضيف مدخلًا جديدًا إلى مقدمة سلسلة الأخطاء. ويمكن اجتياز سلسلة الأخطاء بطريقة `Unwrap() error`. على سبيل المثال:

```
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("err2: %w", err1)
err3 := fmt.Errorf("err3: %w", err2)
```

وهذا يشكّل سلسلة أخطاء بالشكل التالي،

```
flowchart LR
  err3 == err3 wraps err2 ==> err2;
  err2 == err2 wraps err1 ==> err1;
```

بغضّ النظر عن موضع صيغة `%w`، فإن الخطأ المُعاد يمثّل دائمًا مقدمة سلسلة الأخطاء، ويكون `%w` هو الابن التالي. وبالمثل، يجتاز `Unwrap() error` دائمًا سلسلة الأخطاء من الأحدث إلى الأقدم.

غير أنّ موضع صيغة `%w` يؤثّر في ما إذا كانت سلسلة الأخطاء تُطبَع من الأحدث إلى الأقدم، أو من الأقدم إلى الأحدث، أو لا هذا ولا ذاك:

```
// Good:
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("err2: %w", err1)
err3 := fmt.Errorf("err3: %w", err2)
fmt.Println(err3) // err3: err2: err1
// err3 is a newest-to-oldest error chain, that prints newest-to-oldest.
```

```
// Bad:
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("%w: err2", err1)
err3 := fmt.Errorf("%w: err3", err2)
fmt.Println(err3) // err1: err2: err3
// err3 is a newest-to-oldest error chain, that prints oldest-to-newest.
```

```
// Bad:
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("err2-1 %w err2-2", err1)
err3 := fmt.Errorf("err3-1 %w err3-2", err2)
fmt.Println(err3) // err3-1 err2-1 err1 err2-2 err3-2
// err3 is a newest-to-oldest error chain, that neither prints newest-to-oldest
// nor oldest-to-newest.
```

لذلك، ولكي يعكس نصّ الخطأ بنية سلسلة الأخطاء، فضّل وضع صيغة `%w` في النهاية بالشكل `[...]: %w`.

#### موضع الخطأ العلامي

وثمّة استثناء لهذه القاعدة عند تغليف الأخطاء العلامية. فالخطأ العلامي (sentinel error) هو خطأ يعمل كتصنيف أساسي لفشل ما. ويساعد ذلك الملاحظين على فهم طبيعة الفشل بسرعة (مثل «not found» أو «invalid argument») دون الحاجة إلى تحليل رسالة الخطأ بأكملها. ومن المفيد تحديد نوع الخطأ في أقرب موضع ممكن في سلسلة الخطأ.

تشمل أمثلة الأخطاء العلامية أخطاء os (مثل [`os.ErrInvalid`](https://pkg.go.dev/os#ErrInvalid)) والأخطاء على مستوى الحزمة.

وفي هذه الحالات، يمكن أن يؤدي وضع صيغة `%w` في بداية سلسلة الخطأ إلى تحسين القابلية للقراءة بتحديد فئة الخطأ فورًا.

```javascript
// Good:
package parser
var ErrParse = fmt.Errorf("parse error")
// This is another package error that could be returned.
var ErrParseInvalidHeader = fmt.Errorf("%w: invalid header", ErrParse)
func parseHeader() error {
  err := checkHeader()
  return fmt.Errorf("%w: invalid character in header: %v", ErrParseInvalidHeader, err)
}
err := fmt.Errorf("%w: couldn't find fortune database: %v", ErrInternal, err)
```

ووضعه للحالة في البداية يضمن أن تكون المعلومات التصنيفية الأكثر صلة هي الأبرز.

```javascript
// Bad:
package parser
var ErrParse = fmt.Errorf("parse error")
// This is another package error that could be returned.
var ErrParseInvalidHeader = fmt.Errorf("%w: invalid header", ErrParse)
func parseHeader() error {
  err := checkHeader()
  return fmt.Errorf("invalid character in header: %v: %w", err, ErrParseInvalidHeader)
}
var ErrInternal = status.Error(codes.Internal, "internal")
err2 := fmt.Errorf("couldn't find fortune database: %v: %w", err, ErrInternal)
```

وعند وضعه في النهاية، يصبح تحديد فئة الخطأ أصعب عند قراءة نصّ الخطأ، لأنه يكون مدفونًا في تفاصيل الخطأ المحددة.

انظر أيضًا:

- [Go Tip #48: Error Sentinel Values](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #106: Error Naming Conventions](https://google.github.io/styleguide/go/index.html#gotip)

### تسجيل الأخطاء

تحتاج الدوال أحيانًا إلى إخبار نظام خارجي بخطأ ما دون نشره إلى مستدعيها. ويُعدّ التسجيل خيارًا واضحًا هنا؛ لكن كن واعيًا بما تسجّله من أخطاء وكيفية تسجيلها.

- مثل [رسائل فشل الاختبار الجيدة](https://google.github.io/styleguide/go/decisions#useful-test-failures)، ينبغي أن تعبّر رسائل السجلّ بوضوح عمّا ساء، وأن تساعد القائم على الصيانة بتضمين معلومات ذات صلة لتشخيص المشكلة.
- تجنّب التكرار. إذا أعدتَ خطأً، فمن الأفضل عادةً ألّا تسجّله بنفسك بل أن تدع المستدعي يتعامل معه. ويمكن للمستدعي أن يختار تسجيل الخطأ، أو ربما تقييد معدّل التسجيل باستخدام [`rate.Sometimes`](https://pkg.go.dev/golang.org/x/time/rate#Sometimes). وتشمل الخيارات الأخرى محاولة الاستعادة أو حتى [إيقاف البرنامج](#checks-and-panics). وفي كل الأحوال، فإن منح المستدعي التحكّم يساعد على تجنّب إغراق السجلّ. غير أنّ الجانب السلبي لهذه المقاربة هو أن أي تسجيل يُكتب باستخدام إحداثيات أسطر المستدعي.
- احترس من [المعلومات الشخصية المعرِّفة (PII)](https://en.wikipedia.org/wiki/Personal_data). فكثير من وجهات السجلّ ليست أماكن مناسبة لمعلومات المستخدم النهائي الحساسة.
- استخدم `log.Error` باعتدال. فتسجيل مستوى ERROR يسبّب تفريغًا (flush) وهو أكثر كلفة من مستويات التسجيل الأدنى. وقد يكون لذلك تأثير أداء خطير على شيفرتك. وعند الاختيار بين مستويي error وwarning، ضع في اعتبارك أفضل ممارسة تقول إن الرسائل عند مستوى error ينبغي أن تكون قابلة للتنفيذ وليست «أكثر خطورة» من التحذير فحسب.
- داخل Google، لدينا أنظمة مراقبة يمكن إعدادها لتنبيه أكثر فعالية من الكتابة إلى ملف سجلّ والأمل في أن يلاحظه أحدهم. وهذا مشابه لكنه ليس مطابقًا لـ[الحزمة `expvar`](https://pkg.go.dev/expvar) في المكتبة القياسية.

#### مستويات الإسهاب المخصّصة

استفد من التسجيل المُسهب ([`log.V`](https://pkg.go.dev/github.com/golang/glog#V)). ويمكن أن يكون التسجيل المُسهب مفيدًا في التطوير والتتبّع. وقد يكون وضع اصطلاح لمستويات الإسهاب مفيدًا. على سبيل المثال:

- اكتب قدرًا صغيرًا من المعلومات الإضافية عند `V(1)`
- تتبّع معلومات أكثر في `V(2)`
- افرغ حالات داخلية كبيرة في `V(3)`

لتقليل كلفة التسجيل المُسهب، ينبغي أن تضمن عدم استدعاء دوال مكلفة عن غير قصد حتى عندما يكون `log.V` مُطفأً. وتوفّر `log.V` واجهتين برمجيتين. والأكثر ملاءمة منهما تحمل خطر هذه الكلفة غير المقصودة. وعند الشك، استخدم الأسلوب الأكثر إسهابًا قليلًا.

```
// Good:
for _, sql := range queries {
  log.V(1).Infof("Handling %v", sql)
  if log.V(2) {
    log.Infof("Handling %v", sql.Explain())
  }
  sql.Run(...)
}
```

```
// Bad:
// sql.Explain called even when this log is not printed.
log.V(2).Infof("Handling %v", sql.Explain())
```

### تهيئة البرنامج

ينبغي نشر أخطاء تهيئة البرنامج (مثل الأعلام والإعدادات غير الصحيحة) إلى الأعلى نحو `main`، التي ينبغي أن تستدعي `log.Exit` مع خطأ يشرح كيفية إصلاح الخطأ. وفي هذه الحالات، لا ينبغي عمومًا استخدام `log.Fatal`، لأن تتبّع المكدّس الذي يشير إلى موضع الفحص ليس مرجّحًا أن يكون مفيدًا مثل رسالة قابلة للتنفيذ من صنع الإنسان.

### فحوص البرنامج وحالات الذعر

كما ورد في [القرار ضد استخدام الذعر](https://google.github.io/styleguide/go/decisions#dont-panic)، ينبغي أن تُبنى معالجة الأخطاء القياسية حول قيم الأخطاء المُعادة. وينبغي أن تفضّل المكتبات إعادة خطأ إلى المستدعي بدلًا من إجهاض البرنامج، وبخاصة في الأخطاء العابرة.

يلزم أحيانًا إجراء فحوص اتساق على ثابت (invariant) وإنهاء البرنامج إذا خُورِج. وعمومًا، لا يُفعل ذلك إلا عندما يعني فشل فحص الثابت أن الحالة الداخلية أصبحت غير قابلة للاستعادة. وأكثر الطرق موثوقية للقيام بذلك في قاعدة شيفرة Google هو استدعاء `log.Fatal`. ولا يُعدّ استخدام `panic` موثوقًا في هذه الحالات، لأنه من الممكن أن تتسبب الدوال المؤجَّلة في جمود (deadlock) أو في مزيد من إفساد الحالة الداخلية أو الخارجية.

وبالمثل، قاوم إغراء استعادة حالات الذعر لتجنّب الانهيارات، لأن فعل ذلك قد يؤدّي إلى نشر حالة فاسدة. فكلما بعدتَ عن موضع الذعر، قلّت معرفتك بحالة البرنامج، التي قد تكون ممسكة بأقفال أو موارد أخرى. وقد يطوّر البرنامج بعدها أنماط فشل غير متوقعة أخرى تجعل تشخيص المشكلة أصعب. وبدلًا من محاولة معالجة حالات الذعر غير المتوقعة في الشيفرة، استخدم أدوات المراقبة لإظهار الإخفاقات غير المتوقعة وإصلاح العلل المرتبطة بها بأولوية عالية.

**ملاحظة:** يخالف [خادم `net/http`](https://pkg.go.dev/net/http#Server) القياسي هذه النصيحة ويستعيد حالات الذعر من معالِجات الطلبات. ويُجمع المهندسون ذوو الخبرة في Go على أن ذلك كان خطأً تاريخيًا. وإذا أخذت عيّنة من سجلّات الخوادم في تطبيقات مكتوبة بلغات أخرى، فمن الشائع أن تجد تتبّعات مكدّس كبيرة تُركت دون معالجة. تجنّب هذا المطبّ في خوادمك.

### متى نستخدم الذعر

تُصدر المكتبة القياسية حالات ذعر عند إساءة استخدام الواجهة البرمجية. فمثلًا، يُصدر [`reflect`](https://pkg.go.dev/reflect) حالة ذعر في كثير من الحالات التي يُوصَل فيها إلى قيمة بطريقة تدلّ على أنها أُسيء تفسيرها. وهذا مشابه لحالات الذعر الناتجة عن أخطاء جوهرية في اللغة مثل الوصول إلى عنصر في شريحة خارج الحدود. وينبغي أن تكتشف مراجعة الشيفرة والاختبارات مثل هذه العلل، التي لا يُتوقّع ظهورها في شيفرة الإنتاج. وتعمل حالات الذعر هذه كفحوص ثوابت لا تعتمد على مكتبة، لأن المكتبة القياسية لا تملك وصولًا إلى [حزمة `log` متعددة المستويات](/book/go-style/decisions-2/index#logging) التي تستخدمها قاعدة شيفرة Google.

وثمّة حالة أخرى قد تكون فيها حالات الذعر مفيدة، وإن كانت غير شائعة، وهي استخدامها كتفصيل تنفيذ داخلي لحزمة لديها دائمًا استعادة (recover) مطابقة في سلسلة الاستدعاء. ويمكن أن تستفيد المحلّلات (parsers) ومجموعات الدوال الداخلية المشابهة شديدة التداخل والمترابطة ترابطًا وثيقًا من هذا التصميم، حيث تضيف مدّ إرجاعات الأخطاء تعقيدًا بلا قيمة.

والسمة الأساسية لهذا التصميم هي أن **حالات الذعر هذه لا يُسمح لها أبدًا بالخروج عبر حدود الحزمة** ولا تشكّل جزءًا من واجهة الحزمة البرمجية. ويتحقق ذلك عادةً بدالة مؤجَّلة على المستوى الأعلى تستخدم `recover` لتحويل حالة ذعر منتشرة إلى خطأ مُعاد عند حدود الواجهة البرمجية العامة. وهو يتطلّب من الشيفرة التي تُصدر الذعر وتستعيده أن تميّز بين حالات الذعر التي ترفعها الشيفرة نفسها وتلك التي لا ترفعها:

```
// Good:
type syntaxError struct {
  msg string
}
func parseInt(in string) int {
  n, err := strconv.Atoi(in)
  if err != nil {
    panic(&syntaxError{"not a valid integer"})
  }
}
func Parse(in string) (_ *Node, err error) {
  defer func() {
    if p := recover(); p != nil {
      sErr, ok := p.(*syntaxError)
      if !ok {
        panic(p) // Propagate the panic since it is outside our code's domain.
      }
      err = fmt.Errorf("syntax error: %v", sErr.msg)
    }
  }()
  ... // Parse input calling parseInt internally to parse integers
}
```

> **تحذير:** يجب على الشيفرة التي تستخدم هذا النمط أن تعتني بإدارة أي موارد مرتبطة بالشيفرة التي تعمل في هذه الأقسام المُدارة بالتأجيل (مثل الإغلاق أو التحرير أو فتح القفل).
> > راجع: [Go Tip #81: Avoiding Resource Leaks in API Design](https://google.github.io/styleguide/go/index.html#gotip)

يُستخدم الذعر أيضًا عندما لا يستطيع المترجم تحديد الشيفرة غير القابلة للوصول، مثل عند استخدام دالة مثل `log.Fatal` لا تعود:

```
// Good:
func answer(i int) string {
    switch i {
    case 42:
        return "yup"
    case 54:
        return "base 13, huh"
    default:
        log.Fatalf("Sorry, %d is not the answer.", i)
        panic("unreachable")
    }
}
```

[لا تستدعِ دوال `log` قبل تحليل الأعلام.](https://pkg.go.dev/github.com/golang/glog#pkg-overview) وإذا كان لا بد من إنهاء البرنامج في دالة تهيئة حزمة (وهي `init` أو [دالة «must»](/book/go-style/decisions-2/index#must-functions))، فيُقبَل استخدام الذعر بدلًا من استدعاء التسجيل القاتل.

انظر أيضًا:

- [Handling panics](https://go.dev/ref/spec#Handling_panics) و[Run-time Panics](https://go.dev/ref/spec#Run_time_panics) في مواصفة اللغة
- [Defer, Panic, and Recover](https://go.dev/blog/defer-panic-and-recover)
- [On the uses and misuses of panics in Go](https://eli.thegreenplace.net/2018/on-the-uses-and-misuses-of-panics-in-go/)

## التوثيق

### الاصطلاحات

يوسّع هذا القسم قسم [التعليقات](/book/go-style/decisions-2/index#commentary) في وثيقة القرارات.

شيفرة Go الموثّقة بأسلوب مألوف أسهل قراءةً وأقل عرضة لسوء الاستخدام من شيفرة موثّقة توثيقًا خاطئًا أو غير موثّقة على الإطلاق. وتظهر [الأمثلة](/book/go-style/decisions-2/index#examples) القابلة للتشغيل في Godoc وCode Search، وهي طريقة ممتازة لشرح كيفية استخدام شيفرتك.

#### المعاملات والإعدادات

لا يلزم تعداد كل معامل في التوثيق. وينطبق ذلك على:

- معاملات الدوال والطرائق
- حقول البنى
- الواجهات البرمجية الخاصة بالخيارات

وثّق الحقول والمعاملات المعرّضة للخطأ أو غير الواضحة ببيان سبب أهميتها.

في المقتطف التالي، لا يضيف التعليق البارز معلومات مفيدة تُذكر للقارئ:

```
// Bad:
// Sprintf formats according to a format specifier and returns the resulting
// string.
//
// format is the format, and data is the interpolation data.
func Sprintf(format string, data ...any) string
```

غير أن هذا المقتطف يعرض سيناريو شيفرة مشابهًا للسابق حيث يذكر التعليق بدلًا من ذلك أمرًا غير واضح أو مفيدًا جوهريًا للقارئ:

```javascript
// Good:
// Sprintf formats according to a format specifier and returns the resulting
// string.
//
// The provided data is used to interpolate the format string. If the data does
// not match the expected format verbs or the amount of data does not satisfy
// the format specification, the function will inline warnings about formatting
// errors into the output string as described by the Format errors section
// above.
func Sprintf(format string, data ...any) string
```

ضع في اعتبارك جمهورك المحتمل عند اختيار ما توثّقه وبأي عمق. فالقائمون على الصيانة، والقادمون الجدد إلى الفريق، والمستخدمون الخارجيون، وحتى أنت نفسك بعد ستة أشهر، قد يقدّرون معلومات تختلف قليلًا عمّا يدور في ذهنك عند بدء كتابة توثيقك.

انظر أيضًا:

- [GoTip #41: Identify Function Call Parameters](https://google.github.io/styleguide/go/index.html#gotip)
- [GoTip #51: Patterns for Configuration](https://google.github.io/styleguide/go/index.html#gotip)

#### السياقات

من المفهوم ضمنًا أن إلغاء وسيط السياق يقطع الدالة التي مُرِّر إليها. وإذا كان بإمكان الدالة إعادة خطأ، فمن المتعارف عليه أن يكون `ctx.Err()`.

ولا حاجة إلى إعادة ذكر هذه الحقيقة:

```
// Bad:
// Run executes the worker's run loop.
//
// The method will process work until the context is cancelled and accordingly
// returns an error.
func (Worker) Run(ctx context.Context) error
```

ولأن ذلك مفهوم ضمنًا، فإن ما يلي أفضل:

```
// Good:
// Run executes the worker's run loop.
func (Worker) Run(ctx context.Context) error
```

وحيث يكون سلوك السياق مختلفًا أو غير واضح، ينبغي توثيقه صراحةً إذا تحقّق أي مما يلي.

تُعيد الدالة خطأً غير `ctx.Err()` عند إلغاء السياق:

```
// Good:
// Run executes the worker's run loop.
//
// If the context is cancelled, Run returns a nil error.
func (Worker) Run(ctx context.Context) error
```

لدى الدالة آليات أخرى قد تقطعها أو تؤثّر في عمرها:

```python
// Good:
// Run executes the worker's run loop.
//
// Run processes work until the context is cancelled or Stop is called.
// Context cancellation is handled asynchronously internally: run may return
// before all work has stopped. The Stop method is synchronous and waits
// until all operations from the run loop finish. Use Stop for graceful
// shutdown.
func (Worker) Run(ctx context.Context) error
func (Worker) Stop()
```

لدى الدالة توقعات خاصة بشأن عمر السياق أو سلالته أو القيم المرفقة به:

```python
// Good:
// NewReceiver starts receiving messages sent to the specified queue.
// The context should not have a deadline.
func NewReceiver(ctx context.Context) *Receiver
// Principal returns a human-readable name of the party who made the call.
// The context must have a value attached to it from security.NewContext.
func Principal(ctx context.Context) (name string, ok bool)
```

**تحذير:** تجنّب تصميم واجهات برمجية تفرض مثل هذه المطالب على مستدعيها (مثل ألّا يكون للسياق موعد نهائي). وما سبق مجرد مثال على كيفية توثيق ذلك إذا لم يمكن تجنّبه، وليس تأييدًا للنمط.

#### التزامن

يفترض مستخدمو Go أن العمليات القرائية مفهوميًا آمنة للاستخدام المتزامن ولا تتطلّب مزامنة إضافية.

يمكن بأمان حذف الملاحظة الإضافية حول التزامن في توثيق godoc هذا:

```
// Len returns the number of bytes of the unread portion of the buffer;
// b.Len() == len(b.Bytes()).
//
// It is safe to be called concurrently by multiple goroutines.
func (*Buffer) Len() int
```

غير أن العمليات المُغيِّرة لا يُفترض أنها آمنة للاستخدام المتزامن، وهي تتطلّب من المستخدم مراعاة المزامنة.

وبالمثل، يمكن بأمان حذف الملاحظة الإضافية حول التزامن هنا:

```
// Grow grows the buffer's capacity.
//
// It is not safe to be called concurrently by multiple goroutines.
func (*Buffer) Grow(n int)
```

يُشجَّع بشدة على التوثيق إذا تحقّق أي مما يلي.

إذا كان غير واضح ما إذا كانت العملية قرائية أم مُغيِّرة:

```python
// Good:
package lrucache
// Lookup returns the data associated with the key from the cache.
//
// This operation is not safe for concurrent use.
func (*Cache) Lookup(key string) (data []byte, ok bool)
```

لماذا؟ لأن إصابة الذاكرة المؤقتة (cache hit) عند البحث عن المفتاح تُغيّر ذاكرة LRU المؤقتة داخليًا. وقد لا يكون هذا التنفيذ واضحًا لجميع القرّاء.

توفّر الواجهة البرمجية المزامنة:

```
// Good:
package fortune_go_proto
// NewFortuneTellerClient returns an *rpc.Client for the FortuneTeller service.
// It is safe for simultaneous use by multiple goroutines.
func NewFortuneTellerClient(cc *rpc.ClientConn) *FortuneTellerClient
```

لماذا؟ لأن Stubby يوفّر المزامنة.

**ملاحظة:** إذا كانت الواجهة البرمجية نوعًا وكانت توفّر المزامنة بالكامل، فمن المتعارف عليه أن يوثّق تعريف النوع وحده الدلالات.

إذا كانت الواجهة البرمجية تستهلك أنواعًا ينفّذها المستخدم من الواجهات، وكان لمستهلك الواجهة متطلبات تزامن معيّنة:

```
// Good:
package health
// A Watcher reports the health of some entity (usually a backend service).
//
// Watcher methods are safe for simultaneous use by multiple goroutines.
type Watcher interface {
    // Watch sends true on the passed-in channel when the Watcher's
    // status has changed.
    Watch(changed chan<- bool) (unwatch func())
    // Health returns nil if the entity being watched is healthy, or a
    // non-nil error explaining why the entity is not healthy.
    Health() error
}
```

لماذا؟ لأن كون الواجهة البرمجية آمنة للاستخدام من عدة كوروتينات هو جزء من عقدها.

#### التنظيف

وثّق أي متطلبات تنظيف صريحة تتضمّنها الواجهة البرمجية. وإلا فلن يستخدم المستدعون الواجهة استخدامًا صحيحًا، ما يؤدي إلى تسرّبات الموارد وعلل أخرى محتملة.

أبرِز عمليات التنظيف المتروكة للمستدعي:

```
// Good:
// NewTicker returns a new Ticker containing a channel that will send the
// current time on the channel after each tick.
//
// Call Stop to release the Ticker's associated resources when done.
func NewTicker(d Duration) *Ticker
func (*Ticker) Stop()
```

إذا كان من المحتمل ألّا يكون واضحًا كيف تُنظَّف الموارد، فاشرح الكيفية:

```python
// Good:
// Get issues a GET to the specified URL.
//
// When err is nil, resp always contains a non-nil resp.Body.
// Caller should close resp.Body when done reading from it.
//
//    resp, err := http.Get("http://example.com/")
//    if err != nil {
//        // handle error
//    }
//    defer resp.Body.Close()
//    body, err := io.ReadAll(resp.Body)
func (c *Client) Get(url string) (resp *Response, err error)
```

انظر أيضًا:

- [GoTip #110: Don’t Mix Exit With Defer](https://google.github.io/styleguide/go/index.html#gotip)

#### الأخطاء

وثّق قيم الأخطاء العلامية المهمة أو أنواع الأخطاء التي تُعيدها دوالك إلى المستدعين، حتى يتوقّع المستدعون أنواع الحالات التي يمكنهم معالجتها في شيفرتهم.

```python
// Good:
package os
// Read reads up to len(b) bytes from the File and stores them in b. It returns
// the number of bytes read and any error encountered.
//
// At end of file, Read returns 0, io.EOF.
func (*File) Read(b []byte) (n int, err error) {
```

عندما تُعيد دالة نوع خطأ محددًا، فبيّن بدقة ما إذا كان الخطأ مستقبِل مؤشّر أم لا:

```
// Good:
package os
type PathError struct {
    Op   string
    Path string
    Err  error
}
// Chdir changes the current working directory to the named directory.
//
// If there is an error, it will be of type *PathError.
func Chdir(dir string) error {
```

إن توثيق ما إذا كانت القيم المُعادة مستقبِلات مؤشّرات يتيح للمستدعين مقارنة الأخطاء مقارنةً صحيحة باستخدام [`errors.Is`](https://pkg.go.dev/errors#Is) و[`errors.As`](https://pkg.go.dev/errors#As) و[`package cmp`](https://pkg.go.dev/github.com/google/go-cmp/cmp). وذلك لأن قيمة غير مؤشّرية لا تكون مكافئة لقيمة مؤشّرية.

**ملاحظة:** في مثال `Chdir`، كُتب نوع الإرجاع `error` بدلًا من `*PathError` بسبب [طريقة عمل قيم الواجهة nil](https://go.dev/doc/faq#nil_error).

وثّق اصطلاحات الأخطاء العامة في [توثيق الحزمة](/book/go-style/decisions-2/index#package-comments) عندما ينطبق السلوك على معظم الأخطاء الموجودة في الحزمة:

```
// Good:
// Package os provides a platform-independent interface to operating system
// functionality.
//
// Often, more information is available within the error. For example, if a
// call that takes a file name fails, such as Open or Stat, the error will
// include the failing file name when printed and will be of type *PathError,
// which may be unpacked for more information.
package os
```

إن التطبيق المتأنّي لهذه المقاربات يمكن أن يضيف [معلومات إضافية إلى الأخطاء](#error-extra-info) دون جهد كبير، ويساعد المستدعين على تجنّب إضافة تعليقات توضيحية زائدة.

انظر أيضًا:

- [Go Tip #106: Error Naming Conventions](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #89: When to Use Canonical Status Codes as Errors](https://google.github.io/styleguide/go/index.html#gotip)

### المعاينة

تتضمّن Go [خادم توثيق](https://pkg.go.dev/golang.org/x/pkgsite/cmd/pkgsite). ويُنصَح بمعاينة التوثيق الذي تنتجه شيفرتك قبل عملية مراجعة الشيفرة وأثناءها. ويساعد ذلك على التحقق من أن [تنسيق godoc](#godoc-formatting) يُعرض عرضًا صحيحًا.

### تنسيق godoc

يوفّر [Godoc](https://pkg.go.dev/) بعض الصيغ المحددة [لتنسيق التوثيق](https://go.dev/doc/comment).

يلزم سطر فارغ للفصل بين الفقرات:

```
// Good:
// LoadConfig reads a configuration out of the named file.
//
// See some/shortlink for config file format details.
```

يمكن أن تحتوي ملفات الاختبار على [أمثلة قابلة للتشغيل](/book/go-style/decisions-2/index#examples) تظهر مرتبطة بالتوثيق المقابل في godoc:

```
// Good:
func ExampleConfig_WriteTo() {
  cfg := &Config{
    Name: "example",
  }
  if err := cfg.WriteTo(os.Stdout); err != nil {
    log.Exitf("Failed to write config: %s", err)
  }
  // Output:
  // {
  //   "name": "example"
  // }
}
```

إضافة مسافتين إضافيتين في بداية الأسطر تنسّقها كما هي حرفيًا:

```javascript
// Good:
// Update runs the function in an atomic transaction.
//
// This is typically used with an anonymous TransactionFunc:
//
//   if err := db.Update(func(state *State) { state.Foo = bar }); err != nil {
//     //...
//   }
```

لاحظ، مع ذلك، أنه قد يكون من الأنسب غالبًا وضع الشيفرة في مثال قابل للتشغيل بدلًا من تضمينها في تعليق.

ويمكن الاستفادة من هذا التنسيق الحرفي لتنسيقات ليست أصلية في godoc، مثل القوائم والجداول:

```python
// Good:
// LoadConfig reads a configuration out of the named file.
//
// LoadConfig treats the following keys in special ways:
//   "import" will make this configuration inherit from the named file.
//   "env" if present will be populated with the system environment.
```

يُنسَّق كعنوان أي سطر واحد يبدأ بحرف كبير، ولا يحتوي على علامات ترقيم سوى الأقواس والفواصل، ويعقبه سطر آخر:

```
// Good:
// The following line is formatted as a heading.
//
// Using headings
//
// Headings come with autogenerated anchor tags for easy linking.
```

### تعزيز الإشارة

أحيانًا يبدو سطر من الشيفرة كشيء مألوف، لكنه في الحقيقة ليس كذلك. ومن أفضل الأمثلة على ذلك فحص `err == nil` (لأن `err != nil` أكثر شيوعًا بكثير). والفحصان الشرطيان التاليان يصعب تمييزهما:

```
// Good:
if err := doSomething(); err != nil {
    // ...
}
```

```
// Bad:
if err := doSomething(); err == nil {
    // ...
}
```

ويمكنك بدلًا من ذلك «تعزيز» إشارة الشرط بإضافة تعليق:

```
// Good:
if err := doSomething(); err == nil { // if NO error
    // ...
}
```

فيلفت التعليق الانتباه إلى الفرق في الشرط.

## تصريحات المتغيّرات

### التهيئة

من أجل الاتساق، فضّل `:=` على `var` عند تهيئة متغيّر جديد بقيمة غير صفرية.

```
// Good:
i := 42
```

```javascript
// Bad:
var i = 42
```

### تصريح المتغيّرات بقيم صفرية

تستخدم التصريحات التالية [القيمة الصفرية](https://golang.org/ref/spec#The_zero_value):

```javascript
// Good:
var (
    coords Point
    magic  [4]byte
    primes []int
)
```

ينبغي أن تصرّح بالقيم باستخدام القيمة الصفرية عندما تريد التعبير عن قيمة فارغة **جاهزة للاستخدام لاحقًا**. وقد يكون استخدام المركّبات الحرفية مع تهيئة صريحة ثقيلًا:

```javascript
// Bad:
var (
    coords = Point{X: 0, Y: 0}
    magic  = [4]byte{0, 0, 0, 0}
    primes = []int(nil)
)
```

من التطبيقات الشائعة لتصريح القيمة الصفرية استخدام متغيّر كمُخرَج عند فكّ التسلسل:

```javascript
// Good:
var coords Point
if err := json.Unmarshal(data, &coords); err != nil {
```

ولا بأس أيضًا في استخدام القيمة الصفرية بالشكل التالي عندما تحتاج إلى متغيّر من نوع مؤشّر:

```
// Good:
msg := new(pb.Bar) // or "&pb.Bar{}"
if err := proto.Unmarshal(data, msg); err != nil {
```

إذا كنت تحتاج إلى قفل أو حقل آخر [يجب ألّا يُنسَخ](/book/go-style/decisions-2/index#copying) في بنيتك، فيمكنك جعله نوع قيمة للاستفادة من تهيئة القيمة الصفرية. وهذا يعني أن النوع الحاوي يجب الآن أن يُمرَّر عبر مؤشّر لا كقيمة. ويجب أن تتّخذ الطرائق على النوع مستقبِلات مؤشّرات.

```
// Good:
type Counter struct {
    // This field does not have to be "*sync.Mutex". However,
    // users must now pass *Counter objects between themselves, not Counter.
    mu   sync.Mutex
    data map[string]int64
}
// Note this must be a pointer receiver to prevent copying.
func (c *Counter) IncrementBy(name string, n int64)
```

لا بأس في استخدام أنواع القيم لمتغيّرات محلية من مركّبات (مثل البنى والمصفوفات) حتى لو كانت تحتوي على مثل هذه الحقول غير القابلة للنسخ. غير أنه إذا كانت الدالة تُعيد المركّب، أو إذا كانت كل عمليات الوصول إليه ستضطر في النهاية إلى أخذ عنوانه، ففضّل تصريح المتغيّر كنوع مؤشّر من البداية. وبالمثل، ينبغي تصريح رسائل protobuf كنواع مؤشّرات.

```javascript
// Good:
func NewCounter(name string) *Counter {
    c := new(Counter) // "&Counter{}" is also fine.
    registerCounter(name, c)
    return c
}
var msg = new(pb.Bar) // or "&pb.Bar{}".
```

وذلك لأن `*pb.Something` يحقّق [`proto.Message`](https://pkg.go.dev/google.golang.org/protobuf/proto#Message) بينما لا يفعل `pb.Something` ذلك.

```javascript
// Bad:
func NewCounter(name string) *Counter {
    var c Counter
    registerCounter(name, &c)
    return &c
}
var msg = pb.Bar{}
```

> **مهم:** يجب تهيئة أنواع الخرائط تهيئةً صريحة قبل أن يمكن تعديلها. غير أن القراءة من خرائط ذات قيمة صفرية أمر لا بأس به إطلاقًا.
> > بالنسبة إلى أنواع الخرائط والشرائح، إذا كانت الشيفرة حساسة للأداء بشكل خاص وإذا كنت تعرف الأحجام مسبقًا، فراجع قسم [تلميحات الحجم](#vardeclsize).

### المركّبات الحرفية

التصريحات التالية هي تصريحات [مركّبات حرفية](https://golang.org/ref/spec#Composite_literals):

```javascript
// Good:
var (
    coords   = Point{X: x, Y: y}
    magic    = [4]byte{'I', 'W', 'A', 'D'}
    primes   = []int{2, 3, 5, 7, 11}
    captains = map[string]string{"Kirk": "James Tiberius", "Picard": "Jean-Luc"}
)
```

ينبغي أن تصرّح بقيمة باستخدام مركّب حرفي عندما تعرف العناصر أو الأعضاء الأولية.

وفي المقابل، قد يكون استخدام المركّبات الحرفية للتصريح بقيم فارغة أو بلا أعضاء مُشوِّشًا بصريًا مقارنةً بـ[تهيئة القيمة الصفرية](#vardeclzero).

عندما تحتاج إلى مؤشّر إلى قيمة صفرية، لديك خياران: المركّبات الحرفية الفارغة و`new`. وكلاهما جيد، لكن الكلمة المفتاحية `new` يمكن أن تذكّر القارئ بأنه لو كانت هناك حاجة إلى قيمة غير صفرية، فلن ينجح المركّب الحرفي:

```javascript
// Good:
var (
  buf = new(bytes.Buffer) // non-empty Buffers are initialized with constructors.
  msg = new(pb.Message) // non-empty proto messages are initialized with builders or by setting fields one by one.
)
```

### تلميحات الحجم

التصريحات التالية تستفيد من تلميحات الحجم لتخصيص السعة مسبقًا:

```javascript
// Good:
var (
    // Preferred buffer size for target filesystem: st_blksize.
    buf = make([]byte, 131072)
    // Typically process up to 8-10 elements per run (16 is a safe assumption).
    q = make([]Node, 0, 16)
    // Each shard processes shardSize (typically 32000+) elements.
    seen = make(map[string]bool, shardSize)
)
```

تُعدّ تلميحات الحجم والتخصيص المسبق خطوات مهمة **عند الجمع بينها وبين تحليل تجريبي للشيفرة وتكاملاتها**، لإنشاء شيفرة حساسة للأداء وفعّالة في استخدام الموارد.

لا تحتاج معظم الشيفرات إلى تلميح حجم أو تخصيص مسبق، ويمكنها أن تتيح لوقت التشغيل تنمية الشريحة أو الخريطة حسب الحاجة. ولا بأس في التخصيص المسبق عندما يكون الحجم النهائي معروفًا (مثل التحويل بين خريطة وشريحة)، لكن هذا ليس شرطًا للقابلية للقراءة، وقد لا يستحق الفوضى البصرية في الحالات الصغيرة.

**تحذير:** قد يؤدي تخصيص ذاكرة أكثر من حاجتك إلى إهدار الذاكرة في الأسطول (fleet) أو حتى الإضرار بالأداء. وعند الشك، راجع [GoTip #3: Benchmarking Go Code](https://google.github.io/styleguide/go/index.html#gotip) وارجع افتراضيًا إلى [تهيئة صفرية](#vardeclzero) أو [تصريح بمركّب حرفي](#vardeclcomposite).

### اتجاه القناة

حدّد [اتجاه القناة](https://go.dev/ref/spec#Channel_types) حيث أمكن.

```python
// Good:
// sum computes the sum of all of the values. It reads from the channel until
// the channel is closed.
func sum(values <-chan int) int {
    // ...
}
```

يمنع ذلك أخطاء برمجية عابرة يمكن حدوثها دون التحديد:

```
// Bad:
func sum(values chan int) (out int) {
    for v := range values {
        out += v
    }
    // values must already be closed for this code to be reachable, which means
    // a second close triggers a panic.
    close(values)
}
```

وعند تحديد الاتجاه، يلتقط المترجم أخطاء بسيطة كهذه. كما يساعد ذلك على نقل قدر من الملكية إلى النوع.

انظر أيضًا محاضرة Bryan Mills «Rethinking Classical Concurrency Patterns»: [الشرائح](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view?usp=sharing) [الفيديو](https://www.youtube.com/watch?v=5zXAHh5tJqQ).
