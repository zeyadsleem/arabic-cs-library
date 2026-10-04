---
title: "قرارات أسلوب Go (2 من 2)"
lang: ar
source: https://google.github.io/styleguide/go/decisions
---

## اللغة (Language)

### تنسيق القيم الحرفية (Literal formatting) {#literal-formatting}

يمتلك Go صيغة [قيم حرفية مركّبة](https://golang.org/ref/spec#Composite_literals) قوية استثنائيًا، تتيح التعبير عن قيم متداخلة بعمق ومعقّدة في تعبير واحد. وعند الإمكان، ينبغي استخدام صيغة القيم الحرفية هذه بدلًا من بناء القيم حقلًا بحقل. وعادةً ما يكون تنسيق `gofmt` للقيم الحرفية جيدًا جدًا، لكن هناك بعض القواعد الإضافية لإبقاء هذه القيم الحرفية قابلة للقراءة والصيانة.

#### أسماء الحقول {#literal-field-names}

يجب أن تحدّد القيم الحرفية للبنى **أسماء الحقول** للأنواع المعرّفة خارج الحزمة الحالية.

ضمِّن أسماء الحقول للأنواع الواردة من حزم أخرى.

```
// Good:
// https://pkg.go.dev/encoding/csv#Reader
r := csv.Reader{
  Comma: ',',
  Comment: '#',
  FieldsPerRecord: 4,
}
```

لا يُعتبر عادةً ترتيب الحقول في البنية ولا مجموعتها الكامل (وكلاهما يجب أن يكون صحيحًا عند حذف أسماء الحقول) جزءًا من الواجهة البرمجية العامة للبنية؛ فيجب تحديد اسم الحقل لتجنّب الارتباط غير الضروري.

```
// Bad:
r := csv.Reader{',', '#', 4, false, false, false, false}
```

أما للأنواع المحلية في الحزمة، فأسماء الحقول اختيارية.

```
// Good:
okay := Type{42}
also := internalType{4, 2}
```

وينبغي مع ذلك استخدام أسماء الحقول إذا كان ذلك يجعل الكود أوضح، وهو أمر شائع جدًا. فمثلًا، يجب دائمًا تقريبًا تهيئة بنية ذات عدد كبير من الحقول بأسماء الحقول.

```
// Good:
okay := StructWithLotsOfFields{
  field1: 1,
  field2: "two",
  field3: 3.14,
  field4: true,
}
```

#### تطابق الأقواس {#literal-matching-braces}

ينبغي أن يظهر النصف المغلق من زوج الأقواس دائمًا في سطر بإزاحة مماثلة لإزاحة القوس الفاتح. والقيم الحرفية ذات السطر الواحد تمتلك هذه الخاصية بالضرورة. وعندما تمتد القيمة الحرفية على عدة أسطر، يحافظ الحفاظ على هذه الخاصية على تطابق الأقواس في القيم الحرفية كما هو الحال في تطابق الأقواس في التراكيب النحوية الشائعة في Go مثل الدوال وجمل `if`.

وأكثر خطأ شائع في هذا المجال هو وضع القوس المغلق في السطر نفسه مع قيمة في قيمة حرفية مركّبة متعدّدة الأسطر. وفي هذه الحالات، ينبغي أن ينتهي السطر بفاصلة وأن يظهر القوس المغلق في السطر التالي.

```
// Good:
good := []*Type{{Key: "value"}}
```

```
// Good:
good := []*Type{
    {Key: "multi"},
    {Key: "line"},
}
```

```
// Bad:
bad := []*Type{
    {Key: "multi"},
    {Key: "line"}}
```

```
// Bad:
bad := []*Type{
    {
        Key: "value"},
}
```

#### الأقواس المتلاصقة (Cuddled braces)

لا يُسمح بحذف المسافات البيضاء بين الأقواس (أي "تلاصقها") في القيم الحرفية للشرائح والمصفوفات إلا عندما يتحقق الأمران التاليان معًا.

- أن تتطابق [الإزاحة](#literal-matching-braces)
- أن تكون القيم الداخلية أيضًا قيمًا حرفية أو بواني proto (أي ليست متغيّرًا أو تعبيرًا آخر)

```
// Good:
good := []*Type{
    { // Not cuddled
        Field: "value",
    },
    {
        Field: "value",
    },
}
```

```
// Good:
good := []*Type{{ // Cuddled correctly
    Field: "value",
}, {
    Field: "value",
}}
```

```
// Good:
good := []*Type{
    first, // Can't be cuddled
    {Field: "second"},
}
```

```
// Good:
okay := []*pb.Type{pb.Type_builder{
    Field: "first", // Proto Builders may be cuddled to save vertical space
}.Build(), pb.Type_builder{
    Field: "second",
}.Build()}
```

```
// Bad:
bad := []*Type{
    first,
    {
        Field: "second",
    }}
```

#### أسماء الأنواع المتكرّرة

يجوز حذف أسماء الأنواع المتكرّرة من القيم الحرفية للشرائح والخرائط. وقد يساعد ذلك في تقليل الفوضى. ومن المناسبات المعقولة لتكرار أسماء الأنواع صراحةً التعامل مع نوع معقّد غير شائع في مشروعك، أو عندما تكون أسماء الأنواع المتكرّرة في أسطر متباعدة ويمكن أن تذكّر القارئ بالسياق.

```
// Good:
good := []*Type{
    {A: 42},
    {A: 43},
}
```

```
// Bad:
repetitive := []*Type{
    &Type{A: 42},
    &Type{A: 43},
}
```

```
// Good:
good := map[Type1]*Type2{
    {A: 1}: {B: 2},
    {A: 3}: {B: 4},
}
```

```
// Bad:
repetitive := map[Type1]*Type2{
    Type1{A: 1}: &Type2{B: 2},
    Type1{A: 3}: &Type2{B: 4},
}
```

**نصيحة:** إذا أردت إزالة أسماء الأنواع المتكرّرة في القيم الحرفية للبنى، فيمكنك تشغيل `gofmt -s`.

#### الحقول ذات القيمة الصفرية

يجوز حذف الحقول ذات [القيمة الصفرية](https://golang.org/ref/spec#The_zero_value) من القيم الحرفية للبنى عندما لا يضيع الوضوح نتيجةً لذلك.

كثيرًا ما تستخدم واجهات API المصمّمة جيدًا البناء بالقيم الصفرية لتعزيز قابلية القراءة. فمثلًا، يؤدي حذف حقول القيمة الصفرية الثلاثة من البنية التالية إلى لفت الانتباه إلى الخيار الوحيد الذي يتم تحديده.

```python
// Bad:
import (
  "github.com/golang/leveldb"
  "github.com/golang/leveldb/db"
)
ldb := leveldb.Open("/my/table", &db.Options{
    BlockSize: 1<<16,
    ErrorIfDBExists: true,
    // These fields all have their zero values.
    BlockRestartInterval: 0,
    Comparer: nil,
    Compression: nil,
    FileSystem: nil,
    FilterPolicy: nil,
    MaxOpenFiles: 0,
    WriteBufferSize: 0,
    VerifyChecksums: false,
})
```

```python
// Good:
import (
  "github.com/golang/leveldb"
  "github.com/golang/leveldb/db"
)
ldb := leveldb.Open("/my/table", &db.Options{
    BlockSize: 1<<16,
    ErrorIfDBExists: true,
})
```

غالبًا ما تستفيد البنى داخل الاختبارات القائمة على الجداول من [أسماء الحقول الصريحة](#literal-field-names)، خصوصًا عندما لا تكون بنية الاختبار بسيطة. وهذا يتيح للمؤلّف حذف الحقول ذات القيمة الصفرية كليًا عندما لا تكون الحقول المعنية مرتبطة بحالة الاختبار. فمثلًا، ينبغي أن تحذف حالات الاختبار الناجحة أي حقول متعلّقة بالأخطاء أو الفشل. وفي الحالات التي تكون فيها القيمة الصفرية ضرورية لفهم حالة الاختبار، مثل اختبار المدخلات الصفرية أو `nil`، ينبغي تحديد أسماء الحقول.

**موجز**

```
tests := []struct {
    input      string
    wantPieces []string
    wantErr    error
}{
    {
        input:      "1.2.3.4",
        wantPieces: []string{"1", "2", "3", "4"},
    },
    {
        input:   "hostname",
        wantErr: ErrBadHostname,
    },
}
```

**صريح**

```
tests := []struct {
    input    string
    wantIPv4 bool
    wantIPv6 bool
    wantErr  bool
}{
    {
        input:    "1.2.3.4",
        wantIPv4: true,
        wantIPv6: false,
    },
    {
        input:    "1:2::3:4",
        wantIPv4: false,
        wantIPv6: true,
    },
    {
        input:    "hostname",
        wantIPv4: false,
        wantIPv6: false,
        wantErr:  true,
    },
}
```

### الشرائح nil

في معظم الأغراض، لا يوجد فرق وظيفي بين `nil` والشريحة الفارغة. وتعمل الدوال المدمجة مثل `len` و`cap` كما هو متوقّع على الشرائح `nil`.

```python
// Good:
import "fmt"
var s []int         // nil
fmt.Println(s)      // []
fmt.Println(len(s)) // 0
fmt.Println(cap(s)) // 0
for range s {...}   // no-op
s = append(s, 42)
fmt.Println(s)      // [42]
```

إذا أعلنت عن شريحة فارغة كمتغيّر محلي (خصوصًا إذا كان يمكن أن تكون مصدرًا لقيمة مُعادة)، ففضّل التهيئة بـ nil لتقليل خطر الأخطاء من قِبل المستدعين.

```javascript
// Good:
var t []string
```

```
// Bad:
t := []string{}
```

لا تُنشئ واجهات برمجية تفرض على عملائها التمييز بين nil والشريحة الفارغة.

```
// Good:
// Ping pings its targets.
// Returns hosts that successfully responded.
func Ping(hosts []string) ([]string, error) { ... }
```

```
// Bad:
// Ping pings its targets and returns a list of hosts
// that successfully responded. Can be empty if the input was empty.
// nil signifies that a system error occurred.
func Ping(hosts []string) []string { ... }
```

عند تصميم الواجهات، تجنّب التمييز بين شريحة `nil` وشريحة غير `nil` بطول صفر، لأن ذلك قد يؤدي إلى أخطاء برمجية دقيقة. ويتحقق ذلك عادةً باستخدام `len` للتحقق من الفراغ بدلًا من `== nil`.

يقبل هذا التنفيذ كلا النوعين، الشريحة `nil` والشريحة ذات الطول صفر، باعتبارهما "فارغتين":

```
// Good:
// describeInts describes s with the given prefix, unless s is empty.
func describeInts(prefix string, s []int) {
    if len(s) == 0 {
        return
    }
    fmt.Println(prefix, s)
}
```

بدلًا من الاعتماد على التمييز كجزء من الواجهة البرمجية:

```javascript
// Bad:
func maybeInts() []int { /* ... */ }
// describeInts describes s with the given prefix; pass nil to skip completely.
func describeInts(prefix string, s []int) {
  // The behavior of this function unintentionally changes depending on what
  // maybeInts() returns in 'empty' cases (nil or []int{}).
  if s == nil {
    return
  }
  fmt.Println(prefix, s)
}
describeInts("Here are some ints:", maybeInts())
```

راجع [الأخطاء داخل النطاق](#in-band-errors) لمزيد من النقاش.

### الالتباس في الإزاحة {#indentation-confusion}

تجنّب إدخال فاصل سطر إذا كان سيحاذي بقية السطر مع كتلة كود مُزاحة. وإذا كان ذلك لا مفرّ منه، فاترك مسافة للفصل بين الكود في الكتلة والسطر الملفوف.

```
// Bad:
if longCondition1 && longCondition2 &&
    // Conditions 3 and 4 have the same indentation as the code within the if.
    longCondition3 && longCondition4 {
    log.Info("all conditions met")
}
```

راجع الأقسام التالية للحصول على إرشادات وأمثلة محدّدة:

- [تنسيق الدوال](#func-formatting)
- [الشروط والحلقات](#conditional-formatting)
- [تنسيق القيم الحرفية](#literal-formatting)

### تنسيق الدوال {#func-formatting}

ينبغي أن يبقى توقيع إعلان الدالة أو الطريقة في سطر واحد لتجنّب [الالتباس في الإزاحة](#indentation-confusion).

قد تُنتج قوائم وسائط الدوال بعضًا من أطول الأسطر في ملف مصدري بلغة Go. غير أنها تسبق تغييرًا في الإزاحة، ولذلك يصعب كسر السطر بطريقة لا تجعل الأسطر التالية تبدو كجزء من جسم الدالة بشكل مربك:

```
// Bad:
func (r *SomeType) SomeLongFunctionName(foo1, foo2, foo3 string,
    foo4, foo5, foo6 int) {
    foo7 := bar(foo1)
    // ...
}
```

راجع [أفضل الممارسات](/book/go-style/best-practices-2/index#funcargs) للاطّلاع على بعض الخيارات لتقصير مواضع استدعاء الدوال التي قد تحتوي خلاف ذلك على وسائط كثيرة.

كثيرًا ما يمكن تقصير الأسطر باستخراج متغيّرات محلية.

```
// Good:
local := helper(some, parameters, here)
good := foo.Call(list, of, parameters, local)
```

وبالمثل، لا ينبغي فصل استدعاءات الدوال والطرق بناءً على طول السطر وحده.

```
// Good:
good := foo.Call(long, list, of, parameters, all, on, one, line)
```

```
// Bad:
bad := foo.Call(long, list, of, parameters,
    with, arbitrary, line, breaks)
```

تجنّب إضافة تعليقات ضمنية إلى وسائط دوال محدّدة عند الإمكان. وبدلًا من ذلك، استخدم [بنية خيارات](/book/go-style/best-practices-2/index#option-structure) أو أضف مزيدًا من التفاصيل إلى توثيق الدالة.

```
// Good:
good := server.New(ctx, server.Options{Port: 42})
```

```
// Bad:
bad := server.New(
    ctx,
    42, // Port
)
```

إذا تعذّر تغيير الواجهة البرمجية أو كان الاستدعاء المحلي غير معتاد (سواء كان الاستدعاء طويلًا جدًا أم لا)، فلا بأس دائمًا في إضافة فواصل أسطر إذا كانت تساعد في فهم الاستدعاء.

```
// Good:
canvas.RenderHeptagon(fillColor,
    x0, y0, vertexColor0,
    x1, y1, vertexColor1,
    x2, y2, vertexColor2,
    x3, y3, vertexColor3,
    x4, y4, vertexColor4,
    x5, y5, vertexColor5,
    x6, y6, vertexColor6,
)
```

لاحظ أن الأسطر في المثال أعلاه ليست ملفوفة عند حدّ عمود معيّن، بل مجمّعة بناءً على إحداثيات الرؤوس واللون.

لا ينبغي كسر القيم الحرفية النصية الطويلة داخل الدوال من أجل طول السطر. وبالنسبة إلى الدوال التي تتضمّن مثل هذه السلاسل، يمكن إضافة فاصل سطر بعد صيغة السلسلة، ويمكن تقديم الوسائط في السطر التالي أو الأسطر اللاحقة. والأفضل أن يُتخذ قرار مكان فواصل الأسطر بناءً على التجميعات الدلالية للمدخلات، لا على طول السطر وحده.

```
// Good:
log.Warningf("Database key (%q, %d, %q) incompatible in transaction started by (%q, %d, %q)",
    currentCustomer, currentOffset, currentKey,
    txCustomer, txOffset, txKey)
```

```
// Bad:
log.Warningf("Database key (%q, %d, %q) incompatible in"+
    " transaction started by (%q, %d, %q)",
    currentCustomer, currentOffset, currentKey, txCustomer,
    txOffset, txKey)
```

### الشروط والحلقات {#conditional-formatting}

لا ينبغي كسر جملة `if` على أسطر متعدّدة؛ فقد تؤدي شروط `if` متعدّدة الأسطر إلى [الالتباس في الإزاحة](#indentation-confusion).

```
// Bad:
// The second if statement is aligned with the code within the if block, causing
// indentation confusion.
if db.CurrentStatusIs(db.InTransaction) &&
    db.ValuesEqual(db.TransactionKey(), row.Key()) {
    return db.Errorf(db.TransactionError, "query failed: row (%v): key does not match transaction key", row)
}
```

إذا لم يكن سلوك التقصير (short-circuit) مطلوبًا، فيمكن استخراج المعاملات المنطقية مباشرةً:

```
// Good:
inTransaction := db.CurrentStatusIs(db.InTransaction)
keysMatch := db.ValuesEqual(db.TransactionKey(), row.Key())
if inTransaction && keysMatch {
    return db.Error(db.TransactionError, "query failed: row (%v): key does not match transaction key", row)
}
```

وقد تكون هناك متغيّرات محلية أخرى يمكن استخراجها، خصوصًا إذا كان الشرط متكرّرًا بالفعل:

```
// Good:
uid := user.GetUniqueUserID()
if db.UserIsAdmin(uid) || db.UserHasPermission(uid, perms.ViewServerConfig) || db.UserHasPermission(uid, perms.CreateGroup) {
    // ...
}
```

```
// Bad:
if db.UserIsAdmin(user.GetUniqueUserID()) || db.UserHasPermission(user.GetUniqueUserID(), perms.ViewServerConfig) || db.UserHasPermission(user.GetUniqueUserID(), perms.CreateGroup) {
    // ...
}
```

ينبغي لجمل `if` التي تحتوي على إغلاقات أو قيم حرفية مركّبة متعدّدة الأسطر أن تتأكد من [تطابق الأقواس](#literal-matching-braces) لتجنّب [الالتباس في الإزاحة](#indentation-confusion).

```
// Good:
if err := db.RunInTransaction(func(tx *db.TX) error {
    return tx.Execute(userUpdate, x, y, z)
}); err != nil {
    return fmt.Errorf("user update failed: %s", err)
}
```

```
// Good:
if _, err := client.Update(ctx, &upb.UserUpdateRequest{
    ID:   userID,
    User: user,
}); err != nil {
    return fmt.Errorf("user update failed: %s", err)
}
```

وبالمثل، لا تحاول إدخال فواصل أسطر مصطنعة في جمل `for`. يمكنك دائمًا ترك السطر طويلًا ببساطة إذا لم توجد طريقة أنيقة لإعادة هيكلته:

```
// Good:
for i, max := 0, collection.Size(); i < max && !collection.HasPendingWriters(); i++ {
    // ...
}
```

لكن كثيرًا ما توجد:

```
// Good:
for i, max := 0, collection.Size(); i < max; i++ {
    if collection.HasPendingWriters() {
        break
    }
    // ...
}
```

وينبغي أيضًا أن تبقى جمل `switch` و`case` في سطر واحد.

```
// Good:
switch good := db.TransactionStatus(); good {
case db.TransactionStarting, db.TransactionActive, db.TransactionWaiting:
    // ...
case db.TransactionCommitted, db.NoTransaction:
    // ...
default:
    // ...
}
```

```
// Bad:
switch bad := db.TransactionStatus(); bad {
case db.TransactionStarting,
    db.TransactionActive,
    db.TransactionWaiting:
    // ...
case db.TransactionCommitted,
    db.NoTransaction:
    // ...
default:
    // ...
}
```

إذا كان السطر طويلًا بشكل مفرط، فأزح كل الحالات وافصل بينها بسطر فارغ لتجنّب [الالتباس في الإزاحة](#indentation-confusion):

```
// Good:
switch db.TransactionStatus() {
case
    db.TransactionStarting,
    db.TransactionActive,
    db.TransactionWaiting,
    db.TransactionCommitted:
    // ...
case db.NoTransaction:
    // ...
default:
    // ...
}
```

في الشروط التي تقارن متغيّرًا بثابت، ضع قيمة المتغيّر على الجانب الأيسر من معامل المساواة:

```
// Good:
if result == "foo" {
  // ...
}
```

بدلًا من الصياغة الأقل وضوحًا التي يأتي فيها الثابت أولًا ([«شروط على نمط يودا»](https://en.wikipedia.org/wiki/Yoda_conditions)):

```
// Bad:
if "foo" == result {
  // ...
}
```

### النسخ (Copying) {#copying}

لتجنّب التضمين (aliasing) غير المتوقّع والأخطاء المشابهة، كن حذرًا عند نسخ بنية من حزمة أخرى. فمثلًا، لا يجوز نسخ كائنات المزامنة مثل `sync.Mutex`.

يحتوي النوع `bytes.Buffer` على شريحة `[]byte`، وكتحسين للسلاسل الصغيرة، على مصفوفة بايتات صغيرة قد تشير إليها الشريحة. وإذا نسخت كائن `Buffer`، فقد تشير الشريحة في النسخة إلى المصفوفة في الأصل، مما يجعل استدعاءات الطرق اللاحقة ذات آثار مفاجئة.

وبشكل عام، لا تنسخ قيمة من النوع `T` إذا كانت طرقها مرتبطة بنوع المؤشّر `*T`.

```
// Bad:
b1 := bytes.Buffer{}
b2 := b1
```

قد يؤدي استدعاء طريقة تأخذ مستقبِلًا بالقيمة إلى إخفاء عملية النسخ. وعند تأليف واجهة برمجية، ينبغي عمومًا أن تستقبل وتُرجع أنواع المؤشّرات إذا كانت بنيتك تحتوي حقولًا لا يجوز نسخها.

هذه مقبولة:

```
// Good:
type Record struct {
  buf bytes.Buffer
  // other fields omitted
}
func New() *Record {...}
func (r *Record) Process(...) {...}
func Consumer(r *Record) {...}
```

لكن هذه خاطئة عادةً:

```
// Bad:
type Record struct {
  buf bytes.Buffer
  // other fields omitted
}
func (r Record) Process(...) {...} // Makes a copy of r.buf
func Consumer(r Record) {...} // Makes a copy of r.buf
```

وينطبق هذا الإرشاد أيضًا على نسخ `sync.Mutex`.

### لا تذعر (Don’t panic)

لا تستخدم `panic` في معالجة الأخطاء العادية، بل استخدم `error` وقيم الإرجاع المتعدّدة. راجع [قسم الأخطاء في Effective Go](http://golang.org/doc/effective_go.html#errors).

داخل `package main` وكود التهيئة، فكّر في استخدام [`log.Exit`](https://pkg.go.dev/github.com/golang/glog#Exit) للأخطاء التي ينبغي أن تنهي البرنامج (مثل إعدادات غير صالحة)، لأنه في كثير من هذه الحالات لن يساعد تتبّع المكدّس (stack trace) القارئ. ولاحظ أن [`log.Exit`](https://pkg.go.dev/github.com/golang/glog#Exit) يستدعي [`os.Exit`](https://pkg.go.dev/os#Exit) ولن تُنفَّذ أي دوال مؤجَّلة.

أما الأخطاء التي تشير إلى حالات "مستحيلة"، أي أخطاء برمجية ينبغي دائمًا اكتشافها أثناء مراجعة الكود و/أو الاختبار، فيجوز للدالة أن تُرجع خطأً أو تستدعي [`log.Fatal`](https://pkg.go.dev/github.com/golang/glog#Fatal).

راجع أيضًا [متى يكون `panic` مقبولًا](/book/go-style/best-practices-2/index#when-to-panic).

**ملاحظة:** `log.Fatalf` لا يشير إلى حزمة `log` في المكتبة القياسية. راجع [#logging].

### دوال Must (Must functions)

تتبع دوال المساعدة الإعدادية التي توقف البرنامج عند الفشل اصطلاح التسمية (naming) `MustXYZ` (أو `mustXYZ`). وينبغي عمومًا استدعاؤها فقط في وقت مبكّر من بدء تشغيل البرنامج، لا على أشياء مثل مدخلات المستخدم حيث تُفضَّل معالجة الأخطاء العادية في Go.

ويظهر ذلك كثيرًا في الدوال التي تُستدعى لتهيئة متغيّرات على مستوى الحزمة حصريًا في [وقت تهيئة الحزمة](https://golang.org/ref/spec#Package_initialization) (مثل [template.Must](https://golang.org/pkg/text/template/#Must) و[regexp.MustCompile](https://golang.org/pkg/regexp/#MustCompile)).

```javascript
// Good:
func MustParse(version string) *Version {
    v, err := Parse(version)
    if err != nil {
        panic(fmt.Sprintf("MustParse(%q) = _, %v", version, err))
    }
    return v
}
// Package level "constant". If we wanted to use `Parse`, we would have had to
// set the value in `init`.
var DefaultVersion = MustParse("1.2.3")
```

ويمكن استخدام الاصطلاح نفسه في مساعدات الاختبار التي توقف الاختبار الحالي فقط (باستخدام `t.Fatal`). وكثيرًا ما تكون هذه المساعدات ملائمة لإنشاء قيم الاختبار، مثل حقول البنى في [الاختبارات القائمة على الجداول](#table-driven-tests)، لأن الدوال التي تُرجع أخطاءً لا يمكن إسنادها مباشرةً إلى حقل في بنية.

```
// Good:
func mustMarshalAny(t *testing.T, m proto.Message) *anypb.Any {
  t.Helper()
  any, err := anypb.New(m)
  if err != nil {
    t.Fatalf("mustMarshalAny(t, m) = %v; want %v", err, nil)
  }
  return any
}
func TestCreateObject(t *testing.T) {
  tests := []struct{
    desc string
    data *anypb.Any
  }{
    {
      desc: "my test case",
      // Creating values directly within table driven test cases.
      data: mustMarshalAny(t, mypb.Object{}),
    },
    // ...
  }
  // ...
}
```

في كلتا الحالتين، تكمن قيمة هذا النمط في إمكانية استدعاء المساعدات في سياق "قيمي". ولا ينبغي استدعاء هذه المساعدات في مواضع يصعب فيها ضمان اكتشاف الخطأ أو في سياق ينبغي فيه [التحقق من الخطأ](#handle-errors) (مثل كثير من معالجات الطلبات). وبالنسبة إلى المدخلات الثابتة، يتيح ذلك للاختبارات التأكد بسهولة من أن وسائط `Must` سليمة التكوين، وبالنسبة إلى المدخلات غير الثابتة، يتيح للاختبارات التحقق من أن الأخطاء [تُعالَج أو تُمرَّر على النحو الصحيح](/book/go-style/best-practices-2/index#error-handling).

وعند استخدام دوال `Must` في اختبار، ينبغي عمومًا [وسمها كمساعد اختبار](#mark-test-helpers) وأن تستدعي `t.Fatal` عند حدوث خطأ (راجع [معالجة الأخطاء في مساعدات الاختبار](/book/go-style/best-practices-2/index#test-helper-error-handling) لمزيد من الاعتبارات المتعلّقة بذلك).

ولا ينبغي استخدامها عندما تكون [معالجة الأخطاء العادية](/book/go-style/best-practices-2/index#error-handling) ممكنة (بما في ذلك مع إجراء بعض إعادة الهيكلة):

```
// Bad:
func Version(o *servicepb.Object) (*version.Version, error) {
    // Return error instead of using Must functions.
    v := version.MustParse(o.GetVersionString())
    return dealiasVersion(v)
}
```

### أعمار الكوروتينات (Goroutine lifetimes)

عند إنشاء الكوروتينات (goroutines)، وضّح متى تنتهي أو ما إذا كانت تنتهي.

قد تتسرّب الكوروتينات بسبب الحجب عند الإرسال أو الاستقبال على قناة (channel). فلن ينهي جامع المهملات (garbage collector) كوروتينًا محجوبًا على قناة حتى لو لم يكن لأي كوروتين آخر مرجع إلى تلك القناة.

وحتى عندما لا تتسرّب الكوروتينات، فإن تركها قيد التنفيذ بعد أن تصبح غير ضرورية قد يسبب مشكلات أخرى دقيقة وصعبة التشخيص. كما أن الإرسال على قناة أُغلقت يسبب ذعرًا (panic).

```
// Bad:
ch := make(chan int)
ch <- 42
close(ch)
ch <- 13 // panic
```

وقد يؤدي تعديل مدخلات لا تزال قيد الاستخدام "بعد أن تصبح النتيجة غير ضرورية" إلى تسابقات بيانات (data races). كما أن ترك الكوروتينات قيد التنفيذ مدة طويلة اعتباطًا قد يؤدي إلى استخدام غير متوقّع للذاكرة.

ينبغي كتابة الكود المتزامن بحيث تكون أعمار الكوروتينات واضحة. ويعني ذلك عادةً حصر الكود المتعلّق بالمزامنة داخل نطاق دالة وتجريد المنطق إلى [دوال متزامنة](#synchronous-functions). وإذا لم يكن التزامن واضحًا بعد، فمن المهم توثيق متى ولماذا تنتهي الكوروتينات.

غالبًا ما تساعد الأكواد التي تتبع أفضل الممارسات في استخدام السياق على توضيح ذلك. ويُدار هذا تقليديًا باستخدام [`context.Context`](https://pkg.go.dev/context):

```python
// Good:
func (w *Worker) Run(ctx context.Context) error {
    var wg sync.WaitGroup
    // ...
    for item := range w.q {
        // process returns at latest when the context is cancelled.
        wg.Add(1)
        go func() {
            defer wg.Done()
            process(ctx, item)
        }()
    }
    // ...
    wg.Wait()  // Prevent spawned goroutines from outliving this function.
}
```

وهناك صيغ أخرى لما سبق تستخدم قنوات إشارات خام مثل `chan struct{}` ومتغيّرات متزامنة و[متغيّرات شرطية](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view) وغيرها. والجزء المهم هو أن نهاية الكوروتين تكون واضحة للمشرفين اللاحقين.

في المقابل، لا يبالي الكود التالي بمتى تنتهي الكوروتينات التي يُشغّلها:

```
// Bad:
func (w *Worker) Run() {
    // ...
    for item := range w.q {
        // process returns when it finishes, if ever, possibly not cleanly
        // handling a state transition or termination of the Go program itself.
        go process(item)
    }
    // ...
}
```

قد يبدو هذا الكود مقبولًا، لكن هناك عدة مشكلات كامنة:

- قد يكون للكود سلوك غير محدّد في الإنتاج، وقد لا ينتهي البرنامج بشكل نظيف، حتى إذا حرّر نظام التشغيل الموارد.
- يصعب اختبار الكود اختبارًا ذا معنى بسبب دورة حياته غير المحدّدة.
- قد يسرّب الكود موارد كما هو موضّح أعلاه.

راجع أيضًا:

- [Never start a goroutine without knowing how it will stop](https://dave.cheney.net/2016/12/22/never-start-a-goroutine-without-knowing-how-it-will-stop)
- Rethinking Classical Concurrency Patterns: [slides](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view), [video](https://www.youtube.com/watch?v=5zXAHh5tJqQ)
- [When Go programs end](https://changelog.com/gotime/165)
- [Documentation Conventions: Contexts](/book/go-style/best-practices-2/index#documentation-conventions-contexts)

### الواجهات (Interfaces)

تجنّب إنشاء الواجهات (interfaces) حتى تنشأ [حاجة حقيقية](/book/go-style/guide/index#simplicity). وركّز على السلوك المطلوب بدلًا من مجرّد أنماط مسماة مجرّدة مثل "service" أو "repository" وما شابه.

- لا تغلّف عملاء RPC في واجهات يدوية جديدة لمجرد التجريد أو الاختبار. استخدم [وسائل نقل حقيقية](/book/go-style/best-practices-2/index#use-real-transports) بدلًا من ذلك ([اختبار RPC](https://codelabs.developers.google.com/grpc/getting-started-grpc-go#3)).
- لا تُعرّف أبوابًا خلفية ولا تصدّر تطبيقات [بدائل اختبارية](https://abseil.io/resources/swe-book/html/ch13.html) لواجهة برمجية لأغراض الاختبار وحده. وفضّل بدلًا من ذلك الاختبار عبر [الواجهة البرمجية العامة](https://abseil.io/resources/swe-book/html/ch12.html#test_via_public_apis) للتنفيذ الحقيقي.

صمّم الواجهات لتكون صغيرة لسهولة التنفيذ والتركيب ([GoTip #78: Minimal Viable Interfaces](https://google.github.io/styleguide/go/index.html#gotip)). ووثّق الواجهات على النحو المناسب، بما في ذلك عقدها وحالاتها الحدّية وأخطاؤها المتوقّعة. وأبقِ أنواع الواجهات غير مصدَّرة إذا كانت تُستخدم داخليًا فقط ضمن الحزمة.

ينبغي أن يعرّفها مستهلك الواجهة (لا الحزمة التي تنفّذ الواجهة)، مع ضمان أنها تتضمّن فقط الطرق التي يستخدمها فعليًا. ويجوز لحزمة المنتِج تصدير الواجهة إذا كانت الواجهة هي المنتج (بروتوكول شائع) لمنع تضخّم إعادة تعريف الواجهة.

هناك قول مأثور: ينبغي أن تأخذ الدوال الواجهات كوسائط لكن أن تُرجع أنواعًا ملموسة ([GoTip #49: Accept Interfaces, Return Concrete Types](https://google.github.io/styleguide/go/index.html#gotip)). فإرجاع الأنواع الملموسة يتيح للمستدعي الوصول إلى كل طريقة وحقل عام في ذلك التنفيذ المحدّد، لا مجرّد مجموعة الطرق المعرّفة في واجهة مختارة مسبقًا. ويمكن للمستدعي رغم ذلك تمرير تلك النتيجة الملموسة إلى أي دالة أخرى تتوقّع واجهة. وأحيانًا يكون إرجاع واجهة مقبولًا لأغراض التغليف (مثل واجهة `error`)، وبعض الأنماط مثل command وchaining وfactory و[strategy](https://en.wikipedia.org/wiki/Strategy_pattern).

يوجد نقاش أعمق حول الواجهات في [قسم الواجهات في أفضل الممارسات](/book/go-style/best-practices-2/index#interfaces).

### الأنواع العامة (Generics)

الأنواع العامة (generics)، وتُسمّى رسميًا "[وسائط الأنواع](https://go.dev/design/43651-type-parameters)"، مسموح بها حيث تلبّي متطلبات عملك. وفي كثير من التطبيقات، يعمل النهج التقليدي باستخدام ميزات اللغة الموجودة (الشرائح والخرائط والواجهات وما إلى ذلك) بشكل جيد دون التعقيد الإضافي، فكن حذرًا من الاستخدام المبكّر. راجع النقاش حول [أقل آلية ممكنة](/book/go-style/guide/index#least-mechanism).

عند تقديم واجهة برمجية مصدَّرة تستخدم الأنواع العامة، تأكد من توثيقها توثيقًا مناسبًا. ويُشجَّع بشدة على تضمين [أمثلة](#examples) قابلة للتشغيل ومحفّزة.

لا تستخدم الأنواع العامة لمجرد أنك تنفّذ خوارزمية أو بنية بيانات لا يهمّها نوع عناصرها. وإذا لم يكن هناك في الممارسة العملية سوى نوع واحد يُنشأ منه، فابدأ بجعل كودك يعمل على ذلك النوع دون استخدام الأنواع العامة إطلاقًا. وسيكون إضافة تعدد الأشكال (polymorphism) لاحقًا أمرًا مباشرًا مقارنةً بإزالة تجريد يتبيّن أنه غير ضروري.

لا تستخدم الأنواع العامة لاختراع لغات خاصة بمجال معيّن (DSLs). وبوجه خاص، امتنع عن تقديم أطر لمعالجة الأخطاء قد تفرض عبئًا كبيرًا على القرّاء. وفضّل بدلًا من ذلك ممارسات [معالجة الأخطاء](#errors) الراسخة. وفي الاختبار، كن حذرًا بشكل خاص من تقديم [مكتبات تحقق](#assert) أو أطر تؤدي إلى [حالات فشل اختبار](#useful-test-failures) أقل فائدة.

وبشكل عام:

- [Write code, don’t design types](https://www.youtube.com/watch?v=Pa_e9EeCdy8&t=1250s). من محاضرة في GopherCon قدّمها Robert Griesemer وIan Lance Taylor.
- إذا كان لديك عدة أنواع تشترك في واجهة موحّدة مفيدة، ففكّر في نمذجة الحل باستخدام تلك الواجهة. وقد لا تكون هناك حاجة إلى الأنواع العامة.
- وإلا، فبدلًا من الاعتماد على النوع `any` و[الإفراط في التبديل بين الأنواع](https://tour.golang.org/methods/16)، فكّر في الأنواع العامة.

راجع أيضًا:

- [Using Generics in Go](https://www.youtube.com/watch?v=nr8EpUO9jhw)، محاضرة لـ Ian Lance Taylor
- [Generics tutorial](https://go.dev/doc/tutorial/generics) على موقع Go الإلكتروني

### تمرير القيم (Pass values) {#pass-values}

لا تمرّر المؤشّرات كوسائط للدوال لمجرد توفير بضعة بايتات. فإذا كانت دالة تقرأ وسيطها `x` فقط بصيغة `*x` في كل مكان، فلا ينبغي أن يكون الوسيط مؤشّرًا. ومن الأمثلة الشائعة على ذلك تمرير مؤشّر إلى سلسلة (`*string`) أو مؤشّر إلى قيمة واجهة (`*io.Reader`). وفي كلتا الحالتين، تكون القيمة نفسها ذات حجم ثابت ويمكن تمريرها مباشرةً.

لا ينطبق هذا الإرشاد على البنى الكبيرة، ولا حتى البنى الصغيرة التي قد يزداد حجمها. وبوجه خاص، ينبغي عمومًا التعامل مع رسائل protocol buffer بالمؤشّر لا بالقيمة. فنوع المؤشّر يحقّق واجهة `proto.Message` (التي تقبلها `proto.Marshal` و`protocmp.Transform` وغيرها)، وقد تكون رسائل protocol buffer كبيرة جدًا وكثيرًا ما تكبر بمرور الوقت.

### نوع المستقبِل (Receiver type)

يمكن تمرير [مستقبِل الطريقة](https://golang.org/ref/spec#Method_declarations) بالقيمة أو بالمؤشّر، تمامًا كما لو كان وسيط دالة عاديًا. ويستند الاختيار بينهما إلى [مجموعة (مجموعات) الطرق](https://golang.org/ref/spec#Method_sets) التي ينبغي أن تكون الطريقة جزءًا منها.

**الصحة تتقدّم على السرعة أو البساطة.** فهناك حالات يجب فيها استخدام قيمة مؤشّر. وفي حالات أخرى، اختر المؤشّرات للأنواع الكبيرة أو استعدادًا للمستقبل إذا لم تكن لديك فكرة جيدة عن كيفية نمو الكود، واستخدم القيم لبيانات [قديمة بسيطة](https://en.wikipedia.org/wiki/Passive_data_structure) (plain old data).

وتوضّح القائمة التالية كل حالة بمزيد من التفصيل:

إذا كان المستقبِل شريحة ولم تكن الطريقة تعيد تقطيع الشريحة أو إعادة تخصيصها، فاستخدم القيمة لا المؤشّر.

```
// Good:
type Buffer []byte
func (b Buffer) Len() int { return len(b) }
```

إذا كانت الطريقة تحتاج إلى تعديل المستقبِل، فيجب أن يكون المستقبِل مؤشّرًا.

```
// Good:
type Counter int
func (c *Counter) Inc() { *c++ }
// See https://pkg.go.dev/container/heap.
type Queue []Item
func (q *Queue) Push(x Item) { *q = append([]Item{x}, *q...) }
```

إذا كان المستقبِل بنية تحتوي حقولًا [لا يمكن نسخها بأمان](#copying)، فاستخدم مستقبِلًا مؤشّرًا. ومن الأمثلة الشائعة [`sync.Mutex`](https://pkg.go.dev/sync#Mutex) وأنواع المزامنة الأخرى.

```
// Good:
type Counter struct {
    mu    sync.Mutex
    total int
}
func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.total++
}
```

**نصيحة:** راجع [Godoc](https://pkg.go.dev/time#example-Duration) الخاص بالنوع للحصول على معلومات حول ما إذا كان نسخه آمنًا أم غير آمن.

إذا كان المستقبِل بنية أو مصفوفة "كبيرة"، فقد يكون المستقبِل المؤشّري أكثر كفاءة. فتمرير بنية يعادل تمرير كل حقولها أو عناصرها كوسائط إلى الطريقة. وإذا بدا ذلك كبيرًا جدًا على [التمرير بالقيمة](#pass-values)، فالمؤشّر خيار جيد.

بالنسبة إلى الطرق التي ستستدعي دوال أخرى تعدّل المستقبِل أو تعمل بالتزامن معها، استخدم القيمة إذا كان ينبغي ألّا تكون تلك التعديلات مرئية لطريقتك؛ وإلا فاستخدم المؤشّر.

إذا كان المستقبِل بنية أو مصفوفة كان أي من عناصرها مؤشّرًا إلى شيء قد يُعدَّل، ففضّل مستقبِلًا مؤشّرًا ليتّضح للقارئ قصد القابلية للتعديل.

```
// Good:
type Counter struct {
    m *Metric
}
func (c *Counter) Inc() {
    c.m.Add(1)
}
```

إذا كان المستقبِل [نوعًا مدمجًا](https://pkg.go.dev/builtin)، مثل عدد صحيح أو سلسلة، لا يحتاج إلى تعديل، فاستخدم القيمة.

```
// Good:
type User string
func (u User) String() { return string(u) }
```

إذا كان المستقبِل خريطة أو دالة أو قناة، فاستخدم القيمة لا المؤشّر.

```
// Good:
// See https://pkg.go.dev/net/http#Header.
type Header map[string][]string
func (h Header) Add(key, value string) { /* omitted */ }
```

إذا كان المستقبِل مصفوفة أو بنية "صغيرة" هي بطبيعتها نوع قيمة بلا حقول قابلة للتعديل وبلا مؤشّرات، فالمستقبِل بالقيمة هو الخيار الصحيح عادةً.

```
// Good:
// See https://pkg.go.dev/time#Time.
type Time struct { /* omitted */ }
func (t Time) Add(d Duration) Time { /* omitted */ }
```

عند الشك، استخدم مستقبِلًا مؤشّرًا.

وكإرشاد عام، فضّل أن تكون طرق النوع كلها طرق مؤشّرات أو كلها طرق قيم.

**ملاحظة:** هناك الكثير من المعلومات المغلوطة حول ما إذا كان تمرير قيمة أو مؤشّر إلى دالة يمكن أن يؤثّر في الأداء. ويمكن للمترجم أن يختار تمرير مؤشّرات إلى قيم على المكدّس وكذلك نسخ قيم على المكدّس، لكن هذه الاعتبارات ينبغي ألّا ترجح على قابلية قراءة الكود وصحته في معظم الحالات. وعندما يهمّ الأداء فعلًا، من المهم قياس كلا النهجين باستخدام قياس أداء واقعي قبل الحكم بأن أحد النهجين يتفوّق على الآخر.

### `switch` و`break`

لا تستخدم عبارات `break` بلا تسميات هدف في نهايات فروع `switch`؛ فهي زائدة. وخلافًا لـ C وJava، تنكسر فروع `switch` في Go تلقائيًا، وتكون هناك حاجة إلى عبارة `fallthrough` لتحقيق السلوك على نمط C. واستخدم تعليقًا بدلًا من `break` إذا أردت توضيح الغرض من فرع فارغ.

```
// Good:
switch x {
case "A", "B":
    buf.WriteString(x)
case "C":
    // handled outside of the switch statement
default:
    return fmt.Errorf("unknown value: %q", x)
}
```

```
// Bad:
switch x {
case "A", "B":
    buf.WriteString(x)
    break // this break is redundant
case "C":
    break // this break is redundant
default:
    return fmt.Errorf("unknown value: %q", x)
}
```

**ملاحظة:** إذا كان فرع `switch` داخل حلقة `for`، فإن استخدام `break` داخل `switch` لا يخرج من حلقة `for` المحيطة.

```
for {
  switch x {
  case "A":
     break // exits the switch, not the loop
  }
}
```

للخروج من الحلقة المحيطة، استخدم تسمية على عبارة `for`:

```
loop:
  for {
    switch x {
    case "A":
       break loop // exits the loop
    }
  }
```

### الدوال المتزامنة (Synchronous functions) {#synchronous-functions}

تُرجع الدوال المتزامنة نتائجها مباشرةً وتُنهي أي عمليات استدعاء رجعي أو عمليات قنوات قبل أن تُرجع. وفضّل الدوال المتزامنة على الدوال غير المتزامنة.

تُبقي الدوال المتزامنة الكوروتينات محصورة داخل الاستدعاء. وهذا يساعد على استدلال أعمارها، ويتجنّب التسريبات وتسابقات البيانات. كما أن الدوال المتزامنة أسهل في الاختبار، إذ يمكن للمستدعي تمرير مدخل والتحقق من المخرج دون حاجة إلى الاستقصاء أو المزامنة.

وعند الضرورة، يمكن للمستدعي إضافة التزامن باستدعاء الدالة في كوروتين منفصل. غير أنه من الصعب جدًا (وأحيانًا من المستحيل) إزالة التزامن غير الضروري من جهة المستدعي.

راجع أيضًا:

- "Rethinking Classical Concurrency Patterns"، محاضرة لـ Bryan Mills: [slides](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view)، [video](https://www.youtube.com/watch?v=5zXAHh5tJqQ)

### الأسماء المستعارة للأنواع (Type aliases)

استخدم *تعريف النوع*، `type T1 T2`، لتعريف نوع جديد. واستخدم [*الاسم المستعار للنوع*](http://golang.org/ref/spec#Type_declarations)، `type T1 = T2`، للإشارة إلى نوع موجود دون تعريف نوع جديد. والأسماء المستعارة للأنواع نادرة؛ ويتمثّل استخدامها الأساسي في المساعدة على نقل الحزم إلى مواقع كود مصدري جديدة. فلا تستخدم الأسماء المستعارة للأنواع عندما لا تكون هناك حاجة إليها.

### استخدام %q (Use %q) {#use-percent-q}

تحتوي دوال التنسيق في Go (`fmt.Printf` وغيرها) على صيغة `%q` تطبع السلاسل داخل علامتي اقتباس مزدوجتين.

```
// Good:
fmt.Printf("value %q looks like English text", someText)
```

فضّل استخدام `%q` على القيام بما يعادلها يدويًا باستخدام `%s`:

```
// Bad:
fmt.Printf("value \"%s\" looks like English text", someText)
// Avoid manually wrapping strings with single-quotes too:
fmt.Printf("value '%s' looks like English text", someText)
```

يُوصى باستخدام `%q` في المخرجات الموجّهة إلى البشر حيث قد تكون قيمة الإدخال فارغة أو تحتوي أحرف تحكّم. فقد يكون من الصعب جدًا ملاحظة سلسلة فارغة صامتة، بينما تبرز `""` بوضوح على هذا النحو.

### استخدام any (Use any)

يقدّم Go 1.18 نوع `any` كـ[اسم مستعار](https://go.googlesource.com/proposal/+/master/design/18130-type-alias.md) لـ`interface{}`. ولأنه اسم مستعار، فإن `any` يعادل `interface{}` في كثير من الحالات، وفي حالات أخرى يمكن التبادل بينهما بسهولة عبر تحويل صريح. وفضّل استخدام `any` في الكود الجديد.

## المكتبات الشائعة (Common libraries)

### الأعلام (Flags)

تستخدم برامج Go في قاعدة كود Google صيغة داخلية من [حزمة `flag` القياسية](https://golang.org/pkg/flag/). ولها واجهة مشابهة لكنها تتفاهم جيدًا مع أنظمة Google الداخلية. وينبغي أن تفضّل أسماء الأعلام في ملفات Go الثنائية استخدام الشرطات السفلية للفصل بين الكلمات، في حين ينبغي أن تتبع المتغيّرات التي تحمل قيمة العلم نمط أسماء Go القياسي ([أسماء الحروف المختلطة](/book/go-style/guide/index#mixed-caps)). وتحديدًا، ينبغي أن يكون اسم العلم بصيغة snake_case، وأن يكون اسم المتغيّر هو الاسم المكافئ بصيغة camelCase.

```javascript
// Good:
var (
    pollInterval = flag.Duration("poll_interval", time.Minute, "Interval to use for polling.")
)
```

```javascript
// Bad:
var (
    poll_interval = flag.Int("pollIntervalSeconds", 60, "Interval to use for polling in seconds.")
)
```

لا يجوز تعريف الأعلام (flags) إلا في `package main` أو ما يعادلها.

ينبغي ضبط الحزم عامّة الغرض باستخدام واجهات Go البرمجية، لا من خلال النفاذ مباشرةً إلى واجهة سطر الأوامر؛ فلا تدع استيراد مكتبة يصدّر أعلامًا جديدة كأثر جانبي. أي فضّل وسائط الدوال الصريحة أو الإسناد إلى حقول البنى، أو — بشكل أقل كثيرًا وتحت أدقّ تدقيق — المتغيّرات العامة المصدَّرة. وفي الحالة النادرة جدًا التي يلزم فيها خرق هذه القاعدة، يجب أن يشير اسم العلم بوضوح إلى الحزمة التي يضبطها.

إذا كانت أعلامك متغيّرات عامة، فضعها في مجموعة `var` خاصة بها بعد قسم الاستيرادات.

هناك نقاش إضافي حول أفضل الممارسات لإنشاء [واجهات سطر أوامر معقّدة](/book/go-style/best-practices-2/index#complex-clis) بأوامر فرعية.

راجع أيضًا:

- [Tip of the Week #45: Avoid Flags, Especially in Library Code](https://abseil.io/tips/45)
- [Go Tip #10: Configuration Structs and Flags](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)

### التسجيل (Logging)

تستخدم برامج Go في قاعدة كود Google صيغة من حزمة [`log`](https://pkg.go.dev/log) القياسية. ولها واجهة مشابهة لكن أقوى، وتتفاهم جيدًا مع أنظمة Google الداخلية. وهناك نسخة مفتوحة المصدر من هذه المكتبة متاحة باسم [الحزمة `glog`](https://pkg.go.dev/github.com/golang/glog)، ويجوز لمشاريع Google مفتوحة المصدر استخدامها، لكن هذا الدليل يشير إليها باسم `log` في كل مكان.

**ملاحظة:** لعمليات الخروج غير الطبيعية من البرنامج، تستخدم هذه المكتبة `log.Fatal` للإجهاض مع تتبّع مكدّس، و`log.Exit` للتوقف دونه. ولا توجد دالة `log.Panic` كما في المكتبة القياسية.

**نصيحة:** `log.Info(v)` يعادل `log.Infof("%v", v)`، وينطبق الأمر نفسه على مستويات التسجيل الأخرى. وفضّل النسخة غير المنسّقة عندما لا يكون لديك تنسيق تريد القيام به.

راجع أيضًا:

- أفضل الممارسات في [تسجيل الأخطاء](/book/go-style/best-practices-2/index#error-logging) و[مستويات الإسهاب المخصّصة](/book/go-style/best-practices-2/index#vlog)
- متى وكيف تُستخدم حزمة log لـ[إيقاف البرنامج](/book/go-style/best-practices-2/index#checks-and-panics)

### السياقات (Contexts) {#contexts}

تحمل قيم النوع [`context.Context`](https://pkg.go.dev/context) بيانات اعتماد أمنية ومعلومات تتبّع ومواعيد نهائية وإشارات إلغاء عبر حدود الواجهات البرمجية والعمليات. وخلافًا لـ C++ وJava، اللتين تستخدمان في قاعدة كود Google تخزينًا محليًا للخيط، تمرّر برامج Go السياقات صراحةً على طول سلسلة استدعاء الدوال كاملة من طلبات RPC وطلبات HTTP الواردة إلى الطلبات الصادرة.

عند تمريره إلى دالة أو طريقة، يكون [`context.Context`](https://pkg.go.dev/context) دائمًا الوسيط الأول.

```
func F(ctx context.Context /* other arguments */) {}
```

والاستثناءات هي:

- في معالج HTTP، حيث يأتي السياق من [`req.Context()`](https://pkg.go.dev/net/http#Request.Context).
- في طرق RPC المتدفّقة، حيث يأتي السياق من التدفّق. ويصل الكود الذي يستخدم تدفّق gRPC إلى سياق من طريقة `Context()` في نوع الخادم المولَّد، الذي ينفّذ `grpc.ServerStream`. راجع [توثيق كود gRPC المولَّد](https://grpc.io/docs/languages/go/generated-code/).
- في دوال الاختبار (مثل `TestXXX` و`BenchmarkXXX` و`FuzzXXX`)، حيث يأتي السياق من [`(testing.TB).Context()`](https://pkg.go.dev/testing#TB.Context).
- في دوال نقاط الدخول الأخرى (راجع أدناه أمثلة على هذه الدوال)، استخدم [`context.Background()`](https://pkg.go.dev/context/#Background). وفي الأهداف الثنائية: `main`
- في الكود والمكتبات عامّة الغرض: `init`

> **ملاحظة**: من النادر جدًا أن يحتاج كود في منتصف سلسلة استدعاءات إلى إنشاء سياق أساسي خاص به باستخدام [`context.Background()`](https://pkg.go.dev/context/#Background). وفضّل دائمًا أخذ سياق من المستدعي، إلا إذا كان السياق خاطئًا.
> > قد تصادف مكتبات خوادم (تنفيذ Stubby أو gRPC أو HTTP في إطار خوادم Google للغة Go) تُنشئ كائن سياق جديد لكل طلب. وتُملأ هذه السياقات فورًا بمعلومات من الطلب الوارد، بحيث تكون القيم المرتبطة بالسياق قد انتقلت إليه عبر حدود الشبكة من المستدعي العميل عند تمريره إلى معالج الطلب. علاوةً على ذلك، ترتبط أعمار هذه السياقات بعمر الطلب: فحين ينتهي الطلب، يُلغى السياق.
> > ما لم تكن تنفّذ إطار خوادم، فلا ينبغي إنشاء سياقات باستخدام [`context.Background()`](https://pkg.go.dev/context/#Background) في كود المكتبات. وبدلًا من ذلك، فضّل استخدام فصل السياق (context detachment) المذكور أدناه، إذا وُجد سياق متاح. وإذا كنت ترى أنك تحتاج فعلًا إلى [`context.Background()`](https://pkg.go.dev/context/#Background) خارج دوال نقاط الدخول، فناقش الأمر في قائمة Google Go style البريدية قبل الالتزام بأي تنفيذ.

وينطبق اصطلاح أن [`context.Context`](https://pkg.go.dev/context) يأتي أولًا في الدوال أيضًا على مساعدات الاختبار.

```
// Good:
func readTestFile(ctx context.Context, t *testing.T, path string) string {}
```

لا تضف عضو سياق إلى نوع بنية. وبدلًا من ذلك، أضف وسيط سياق إلى كل طريقة على النوع تحتاج إلى تمريره. والاستثناء الوحيد هو الطرق التي يجب أن يتطابق توقيعها مع واجهة في المكتبة القياسية أو في مكتبة طرف ثالث خارج سيطرة Google. وهذه الحالات نادرة جدًا، وينبغي مناقشتها في قائمة Google Go style البريدية قبل التنفيذ ومراجعة قابلية القراءة.

**ملاحظة:** أضاف Go 1.24 طريقة [`(testing.TB).Context()`](https://pkg.go.dev/testing#TB.Context). وفي الاختبارات، فضّل استخدام [`(testing.TB).Context()`](https://pkg.go.dev/testing#TB.Context) على [`context.Background()`](https://pkg.go.dev/context/#Background) لتوفير [`context.Context`](https://pkg.go.dev/context) الأولي الذي يستخدمه الاختبار. وينبغي تمرير سياق صراحةً إلى دوال المساعدة وإعداد البيئة أو البدائل الاختبارية وغيرها من الدوال المستدعاة من جسم دالة الاختبار التي تتطلّب سياقًا.

يمكن للكود في قاعدة كود Google الذي يجب أن يُشغّل عمليات خلفية قد تعمل بعد إلغاء السياق الأصل استخدام حزمة داخلية لفصل السياق. وتابع [المسألة #40221](https://github.com/golang/go/issues/40221) للنقاشات حول بديل مفتوح المصدر.

ولأن السياقات غير قابلة للتغيير، فلا بأس في تمرير السياق نفسه إلى عدة استدعاءات تشترك في الموعد النهائي نفسه وإشارة الإلغاء وبيانات الاعتماد والتتبّع الأصلي وما إلى ذلك.

راجع أيضًا:

- [Contexts and structs](https://go.dev/blog/context-and-structs)

#### سياقات مخصّصة (Custom contexts)

لا تنشئ أنواع سياق مخصّصة ولا تستخدم واجهات غير [`context.Context`](https://pkg.go.dev/context) في توقيعات الدوال. ولا توجد استثناءات لهذه القاعدة.

تخيّل لو كان لكل فريق سياق مخصّص. فسيتعيّن على كل استدعاء دالة من الحزمة `p` إلى الحزمة `q` أن يحدّد كيفية تحويل `p.Context` إلى `q.Context`، لجميع أزواج الحزم `p` و`q`. وهذا غير عملي وعُرضة للخطأ بالنسبة إلى البشر، ويجعل إعادة الهيكلة الآلية التي تضيف وسائط سياق شبه مستحيلة.

إذا كانت لديك بيانات تطبيق تريد تمريرها، فضعها في وسيط أو في المستقبِل أو في متغيّرات عامة أو في قيمة `Context` إذا كانت تنتمي إليها حقًا. ولا يُقبل إنشاء نوع سياق خاص بك لأنه يقوّض قدرة فريق Go على جعل برامج Go تعمل بشكل صحيح في الإنتاج.

### crypto/rand

لا تستخدم الحزمة `math/rand` لتوليد المفاتيح، حتى المؤقتة منها. فإذا لم تُزوَّد ببذرة، يكون المولّد قابلًا للتنبؤ تمامًا. وإذا زُوِّد ببذرة باستخدام `time.Nanoseconds()`، فلا توجد سوى بضع بتات من العشوائية. وبدلًا من ذلك، استخدم Reader من `crypto/rand`، وإذا احتجت إلى نص، فاطبعه بصيغة سادسية عشرية أو base64.

```python
// Good:
import (
    "crypto/rand"
    // "encoding/base64"
    // "encoding/hex"
    "fmt"
    // ...
)
func Key() string {
    buf := make([]byte, 16)
    if _, err := rand.Read(buf); err != nil {
        log.Fatalf("Out of randomness, should never happen: %v", err)
    }
    return fmt.Sprintf("%x", buf)
    // or hex.EncodeToString(buf)
    // or base64.StdEncoding.EncodeToString(buf)
}
```

**ملاحظة:** `log.Fatalf` لا يشير إلى حزمة `log` في المكتبة القياسية. راجع [#logging].

## حالات فشل الاختبار المفيدة (Useful test failures) {#useful-test-failures}

ينبغي أن يكون من الممكن تشخيص فشل الاختبار دون قراءة الكود المصدري للاختبار. وينبغي أن تفشل الاختبارات برسائل مفيدة تفصّل:

- ما الذي سبّب الفشل
- المدخلات التي أدّت إلى خطأ
- النتيجة الفعلية
- ما كان متوقّعًا

وفيما يلي الأعراف المحدّدة لتحقيق هذا الهدف.

### مكتبات التحقق (Assertion libraries) {#assert}

لا تنشئ "مكتبات تحقق" كمساعدات للاختبار.

مكتبات التحقق هي مكتبات تحاول الجمع بين التحقق من رسائل الفشل وإنتاجها داخل الاختبار (وإن كانت المزالق نفسها قد تنطبق على مساعدات اختبار أخرى أيضًا). ولمزيد من التفصيل حول الفرق بين مساعدات الاختبار ومكتبات التحقق، راجع [أفضل الممارسات](/book/go-style/best-practices-2/index#test-functions).

```javascript
// Bad:
var obj BlogPost
assert.IsNotNil(t, "obj", obj)
assert.StringEq(t, "obj.Type", obj.Type, "blogPost")
assert.IntEq(t, "obj.Comments", obj.Comments, 2)
assert.StringNotEq(t, "obj.Body", obj.Body, "")
```

تميل مكتبات التحقق إما إلى إيقاف الاختبار مبكّرًا (إذا استدعت `assert` الدالة `t.Fatalf` أو `panic`) أو إلى إغفال معلومات ذات صلة عمّا أصاب الاختبار فيه:

```
// Bad:
package assert
func IsNotNil(t *testing.T, name string, val any) {
    if val == nil {
        t.Fatalf("Data %s = nil, want not nil", name)
    }
}
func StringEq(t *testing.T, name, got, want string) {
    if got != want {
        t.Fatalf("Data %s = %q, want %q", name, got, want)
    }
}
```

لا توفّر دوال التحقق المعقّدة غالبًا [رسائل فشل مفيدة](#useful-test-failures) والسياق الموجود داخل دالة الاختبار. كما أن كثرة دوال التحقق والمكتبات تؤدي إلى تجربة تطوير مشتّتة: أي مكتبة تحقق ينبغي أن أستخدم، وأي نمط من صيغ المخرجات ينبغي أن تُصدر، وما إلى ذلك؟ ويُنتج هذا التشتّت ارتباكًا غير ضروري، خصوصًا لمشرفي المكتبات ومؤلّفي التغييرات واسعة النطاق، المسؤولين عن إصلاح الأعطال اللاحقة المحتملة. وبدلًا من إنشاء لغة خاصة بمجال الاختبار، استخدم Go نفسها.

كثيرًا ما تُجرّد مكتبات التحقق المقارنات وفحوص التساوي. وفضّل استخدام مكتبات قياسية مثل [`cmp`](https://pkg.go.dev/github.com/google/go-cmp/cmp) و[`fmt`](https://golang.org/pkg/fmt/) بدلًا من ذلك:

```javascript
// Good:
var got BlogPost
want := BlogPost{
    Comments: 2,
    Body:     "Hello, world!",
}
if !cmp.Equal(got, want) {
    t.Errorf("Blog post = %v, want = %v", got, want)
}
```

ولمزيد من مساعدات المقارنة الخاصة بمجال معيّن، فضّل إرجاع قيمة أو خطأ يمكن استخدامه في رسالة فشل الاختبار بدلًا من تمرير `*testing.T` واستدعاء طرق إبلاغ الأخطاء الخاصة به:

```
// Good:
func postLength(p BlogPost) int { return len(p.Body) }
func TestBlogPost_VeritableRant(t *testing.T) {
    post := BlogPost{Body: "I am Gunnery Sergeant Hartman, your senior drill instructor."}
    if got, want := postLength(post), 60; got != want {
        t.Errorf("Length of post = %v, want %v", got, want)
    }
}
```

**أفضل ممارسة:** لو كانت `postLength` غير بسيطة، لكان من المنطقي اختبارها مباشرةً، باستقلال عن أي اختبارات تستخدمها.

راجع أيضًا:

- [مقارنة التساوي والفروق](#types-of-equality)
- [طباعة الفروق](#print-diffs)
- لمزيد من التفصيل حول الفرق بين مساعدات الاختبار ومساعدات التحقق، راجع [أفضل الممارسات](/book/go-style/best-practices-2/index#test-functions)
- قسم [Go FAQ](https://go.dev/doc/faq) حول [testing frameworks](https://go.dev/doc/faq#testing_framework) وغيابها المتعمّد

### تحديد الدالة (Identify the function) {#identify-the-function}

في معظم الاختبارات، ينبغي أن تتضمّن رسائل الفشل اسم الدالة التي فشلت، حتى وإن بدا ذلك واضحًا من اسم دالة الاختبار. وتحديدًا، ينبغي أن تكون رسالة الفشل لديك `YourFunc(%v) = %v, want %v` بدلًا من مجرّد `got %v, want %v`.

### تحديد المدخل (Identify the input) {#identify-the-input}

في معظم الاختبارات، ينبغي أن تتضمّن رسائل الفشل مدخلات الدالة إذا كانت قصيرة. وإذا لم تكن الخصائص ذات الصلة للمدخلات واضحة (مثلًا لأن المدخلات كبيرة أو غامضة)، فينبغي تسمية حالات الاختبار بوصف لما يجري اختباره وطباعة الوصف كجزء من رسالة الخطأ.

### got قبل want (Got before want)

ينبغي أن تتضمّن مخرجات الاختبار القيمة الفعلية التي أرجعتها الدالة قبل طباعة القيمة المتوقّعة. والصيغة القياسية لطباعة مخرجات الاختبار هي `YourFunc(%v) = %v, want %v`. وحيثما كنت ستكتب "actual" و"expected"، فضّل استخدام الكلمتين "got" و"want" على الترتيب.

أما في الفروق، فالاتجاه أقل وضوحًا، ولذلك من المهم تضمين مفتاح يساعد على تفسير الفشل. راجع [قسم طباعة الفروق](#print-diffs). وأي ترتيب للفروق تستخدمه في رسائل الفشل، ينبغي أن تشير إليه صراحةً كجزء من رسالة الفشل، لأن الكود الموجود غير متسق في الترتيب.

### مقارنات البنية الكاملة (Full structure comparisons)

إذا أرجعت دالتك بنية (أو أي نوع بيانات متعدّد الحقول مثل الشرائح والمصفوفات والخرائط)، فتجنّب كتابة كود اختبار يقوم بمقارنة يدوية حقلًا بحقل للبنية. وبدلًا من ذلك، أنشئ البيانات التي تتوقّع أن تُرجعها الدالة، وقارن مباشرةً باستخدام [مقارنة عميقة](#types-of-equality).

**ملاحظة:** لا ينطبق ذلك إذا كانت بياناتك تحتوي حقولًا غير ذات صلة تحجب قصد الاختبار.

إذا كانت بنيتك تحتاج إلى المقارنة لتساوٍ تقريبي (أو ما يعادله دلاليًا) أو كانت تحتوي حقولًا لا يمكن مقارنتها للتساوي (مثل أن يكون أحد الحقول من النوع `io.Reader`)، فقد تلبّي احتياجاتك تعديل مقارنة [`cmp.Diff`](https://pkg.go.dev/github.com/google/go-cmp/cmp#Diff) أو [`cmp.Equal`](https://pkg.go.dev/github.com/google/go-cmp/cmp#Equal) بخيارات من [`cmpopts`](https://pkg.go.dev/github.com/google/go-cmp/cmp/cmpopts) مثل [`cmpopts.IgnoreInterfaces`](https://pkg.go.dev/github.com/google/go-cmp/cmp/cmpopts#IgnoreInterfaces) ([مثال](https://play.golang.org/p/vrCUNVfxsvF)).

إذا أرجعت دالتك قيم إرجاع متعدّدة، فلست بحاجة إلى تغليفها في بنية قبل مقارنتها. قارن قيم الإرجاع فرادى واطبعها فحسب.

```
// Good:
val, multi, tail, err := strconv.UnquoteChar(`\"Fran & Freddie's Diner\"`, '"')
if err != nil {
  t.Fatalf(...)
}
if val != `"` {
  t.Errorf(...)
}
if multi {
  t.Errorf(...)
}
if tail != `Fran & Freddie's Diner"` {
  t.Errorf(...)
}
```

### مقارنة النتائج المستقرّة (Compare stable results)

تجنّب مقارنة نتائج قد تعتمد على استقرار مخرجات حزمة لا تملكها. وبدلًا من ذلك، ينبغي أن يقارن الاختبار معلومات ذات دلالة تكون مستقرّة ومقاومة للتغييرات في الاعتماديات. وبالنسبة إلى الوظائف التي تُرجع سلسلة منسّقة أو بايتات مسلسلة، فليس من الآمن عمومًا افتراض أن المخرجات مستقرّة.

فمثلًا، يمكن أن تتغيّر [`json.Marshal`](https://golang.org/pkg/encoding/json/#Marshal) (وقد تغيّرت سابقًا) البايتات المحدّدة التي تُصدرها. وقد تنكسر الاختبارات التي تُجري مقارنة نصية على سلسلة JSON إذا غيّرت حزمة `json` طريقة تسلسل البايتات. وبدلًا من ذلك، سيكون الاختبار الأكثر متانة هو تحليل محتويات سلسلة JSON والتأكد من أنها مكافئة دلاليًا لبنية بيانات متوقّعة ما.

### المتابعة (Keep going)

ينبغي أن تستمر الاختبارات لأطول فترة ممكنة، حتى بعد حدوث فشل، لطباعة كل الفحوص الفاشلة في تشغيل واحد. وبهذه الطريقة، لا يضطر المطوّر الذي يصلح الاختبار الفاشل إلى إعادة تشغيل الاختبار بعد إصلاح كل خطأ للعثور على الخطأ التالي.

فضّل استدعاء `t.Error` على `t.Fatal` للإبلاغ عن عدم تطابق. وعند مقارنة عدة خصائص مختلفة لمخرجات دالة، استخدم `t.Error` لكل من تلك المقارنات.

```
// Good:
gotMean, gotVariance, err := MyDistribution(input)
if err != nil {
  t.Fatalf("MyDistribution(%v) returned unexpected error: %v", input, err)
}
if diff := cmp.Diff(wantMean, gotMean); diff != "" {
  t.Errorf("MyDistribution(%v) returned unexpected difference in mean value (-want +got):\n%s", input, diff)
}
if diff := cmp.Diff(wantVariance, gotVariance); diff != "" {
  t.Errorf("MyDistribution(%v) returned unexpected difference in variance value (-want +got):\n%s", input, diff)
}
```

يكون استدعاء `t.Fatal` مفيدًا أساسًا للإبلاغ عن حالة غير متوقّعة (مثل خطأ أو عدم تطابق في المخرجات) عندما تصبح حالات الفشل اللاحقة بلا معنى أو حتى مضلّلة للمحقّق. ولاحظ كيف يستدعي الكود أدناه `t.Fatalf` ثم `t.Errorf`:

```python
// Good:
gotEncoded := Encode(input)
if gotEncoded != wantEncoded {
  t.Fatalf("Encode(%q) = %q, want %q", input, gotEncoded, wantEncoded)
  // It doesn't make sense to decode from unexpected encoded input.
}
gotDecoded, err := Decode(gotEncoded)
if err != nil {
  t.Fatalf("Decode(%q) returned unexpected error: %v", gotEncoded, err)
}
if gotDecoded != input {
  t.Errorf("Decode(%q) = %q, want %q", gotEncoded, gotDecoded, input)
}
```

في الاختبار القائم على الجداول، فكّر في استخدام الاختبارات الفرعية واستخدام `t.Fatal` بدلًا من `t.Error` و`continue`. راجع أيضًا [GoTip #25: Subtests: Making Your Tests Lean](https://google.github.io/styleguide/go/index.html#gotip).

**أفضل ممارسة:** لمزيد من النقاش حول متى ينبغي استخدام `t.Fatal`، راجع [أفضل الممارسات](/book/go-style/best-practices-2/index#t-fatal).

### مقارنة التساوي والفروق (Equality comparison and diffs) {#types-of-equality}

يقيّم المعامل `==` التساوي باستخدام [مقارنات معرّفة في اللغة](http://golang.org/ref/spec#Comparison_operators). وتُقارن القيم القياسية (الأعداد والمنطقيات وما إلى ذلك) بناءً على قيمها، لكن بعض البنى والواجهات فقط يمكن مقارنتها بهذه الطريقة. وتُقارن المؤشّرات بناءً على ما إذا كانت تشير إلى المتغيّر نفسه، لا بناءً على تساوي القيم التي تشير إليها.

يمكن لحزمة [`cmp`](https://pkg.go.dev/github.com/google/go-cmp/cmp) مقارنة بنى بيانات أكثر تعقيدًا لا يتعامل معها `==` على النحو المناسب، مثل الشرائح. استخدم [`cmp.Equal`](https://pkg.go.dev/github.com/google/go-cmp/cmp#Equal) لمقارنة التساوي و[`cmp.Diff`](https://pkg.go.dev/github.com/google/go-cmp/cmp#Diff) للحصول على فرق مقروء بين الكائنات.

```
// Good:
want := &Doc{
    Type:     "blogPost",
    Comments: 2,
    Body:     "This is the post body.",
    Authors:  []string{"isaac", "albert", "emmy"},
}
if !cmp.Equal(got, want) {
    t.Errorf("AddPost() = %+v, want %+v", got, want)
}
```

بوصفها مكتبة مقارنة عامّة الغرض، قد لا تعرف `cmp` كيفية مقارنة أنواع معيّنة. فمثلًا، يمكنها مقارنة رسائل protocol buffer فقط إذا مُرِّر إليها الخيار [`protocmp.Transform`](https://pkg.go.dev/google.golang.org/protobuf/testing/protocmp#Transform).

```
// Good:
if diff := cmp.Diff(want, got, protocmp.Transform()); diff != "" {
    t.Errorf("Foo() returned unexpected difference in protobuf messages (-want +got):\n%s", diff)
}
```

على الرغم من أن حزمة `cmp` ليست جزءًا من مكتبة Go القياسية، فهي يُشرف عليها فريق Go وينبغي أن تُنتج نتائج تساوٍ مستقرّة بمرور الوقت. وهي قابلة للضبط من المستخدم وينبغي أن تلبّي معظم احتياجات المقارنة.

قد يستخدم الكود الموجود المكتبات الأقدم التالية، وقد يواصل استخدامها للاتساق:

- [`pretty`](https://pkg.go.dev/github.com/kylelemons/godebug/pretty) يُنتج تقارير فروق جميلة بصريًا. غير أنه يعتبر بقصد تام أن القيم التي لها التمثيل البصري نفسه متساوية. وبوجه خاص، لا يكتشف `pretty` الفروق بين الشرائح nil والشرائح الفارغة، ولا يتأثّر باختلاف تطبيقات الواجهات ذات الحقول المتطابقة، ويمكن استخدام خريطة متداخلة كأساس للمقارنة مع قيمة بنية. كما أنه يسلّس القيمة بأكملها إلى سلسلة قبل إنتاج الفرق، ولذلك ليس خيارًا جيدًا لمقارنة القيم الكبيرة. وهو يقارن افتراضيًا الحقول غير المصدَّرة، مما يجعله حسّاسًا للتغييرات في تفاصيل التنفيذ في اعتمادياتك. ولهذا السبب، ليس من المناسب استخدام `pretty` على رسائل protobuf.

فضّل استخدام `cmp` في الكود الجديد، ويستحق الأمر النظر في تحديث الكود الأقدم لاستخدام `cmp` حيث ومتى كان ذلك عمليًا.

قد يستخدم الكود الأقدم دالة `reflect.DeepEqual` من المكتبة القياسية لمقارنة البنى المعقّدة. ولا ينبغي استخدام `reflect.DeepEqual` للتحقق من التساوي، لأنه حسّاس للتغييرات في الحقول غير المصدَّرة وتفاصيل التنفيذ الأخرى. وينبغي تحديث الكود الذي يستخدم `reflect.DeepEqual` ليستخدم إحدى المكتبات المذكورة أعلاه.

**ملاحظة:** صُمّمت حزمة `cmp` للاختبار لا للاستخدام في الإنتاج. ولذلك قد تستدعي panic عندما تشتبه في أن مقارنة أُجريت بشكل غير صحيح، لإرشاد المستخدمين إلى كيفية تحسين الاختبار ليكون أقل هشاشة. ونظرًا إلى نزعة cmp نحو استدعاء panic، فهي غير مناسبة للكود المستخدم في الإنتاج لأن panic عرضيًا قد يكون قاتلًا.

### مستوى التفصيل (Level of detail)

رسالة الفشل التقليدية، المناسبة لمعظم اختبارات Go، هي `YourFunc(%v) = %v, want %v`. غير أن هناك حالات قد تستدعي تفصيلًا أكثر أو أقل:

- ينبغي للاختبارات التي تُجري تفاعلات معقّدة أن تصف التفاعلات أيضًا. فمثلًا، إذا استُدعيت `YourFunc` نفسها عدة مرات، فحدّد أي استدعاء فشل في الاختبار. وإذا كان من المهم معرفة أي حالة إضافية للنظام، فأدرجها في مخرجات الفشل (أو على الأقل في السجلات).
- إذا كانت البيانات بنية معقّدة ذات قدر كبير من الكود المتكرّر، فمن المقبول وصف الأجزاء المهمة فقط في الرسالة، لكن لا تحجب البيانات بإفراط.
- لا تتطلّب حالات فشل الإعداد المستوى نفسه من التفصيل. فإذا كانت مساعدة اختبار تملأ جدول Spanner لكن Spanner كان معطّلًا، فمن المحتمل ألّا تحتاج إلى تضمين المدخل الذي كنت ستخزّنه في قاعدة البيانات. وعادةً يكفي `t.Fatalf("Setup: Failed to set up test database: %s", err)` لحلّ المشكلة.

**نصيحة:** اجعل نمط الفشل لديك يظهر أثناء التطوير. راجع كيف تبدو رسالة الفشل وما إذا كان المشرف قادرًا على التعامل مع الفشل بفعالية.

وهناك بعض التقنيات لإعادة إنتاج مدخلات الاختبار ومخرجاته بوضوح:

- عند طباعة بيانات نصية، يكون [`%q` مفيدًا غالبًا](#use-percent-q) للتأكيد على أن القيمة مهمة ولتسهيل اكتشاف القيم السيئة.
- عند طباعة بنى (صغيرة)، قد يكون `%+v` أكثر فائدة من `%v`.
- عند فشل التحقق من قيم أكبر، يمكن أن تسهّل [طباعة الفرق](#print-diffs) فهم الفشل.

### طباعة الفروق (Print diffs) {#print-diffs}

إذا أرجعت دالتك مخرجات كبيرة، فقد يصعب على قارئ رسالة الفشل العثور على الفروق عند فشل اختبارك. وبدلًا من طباعة كل من القيمة المُعادة والقيمة المتوقّعة، أنشئ فرقًا.

ولحساب الفروق لهذه القيم، يُفضَّل `cmp.Diff`، خصوصًا للاختبارات والكود الجديدين، لكن يمكن استخدام أدوات أخرى. راجع [أنواع التساوي](#types-of-equality) للحصول على إرشاد بشأن مواطن قوة كل دالة وضعفها.

- [`cmp.Diff`](https://pkg.go.dev/github.com/google/go-cmp/cmp#Diff)
- [`pretty.Compare`](https://pkg.go.dev/github.com/kylelemons/godebug/pretty#Compare)

يمكنك استخدام حزمة [`diff`](https://pkg.go.dev/github.com/kylelemons/godebug/diff) لمقارنة السلاسل متعدّدة الأسطر أو قوائم السلاسل. ويمكنك استخدام هذا لبنةً لأنواع أخرى من الفروق.

أضف نصًا إلى رسالة الفشل يشرح اتجاه الفرق.

- شيء مثل `diff (-want +got)` جيد عندما تستخدم حزم `cmp` و`pretty` و`diff` (إذا مرّرت `(want, got)` إلى الدالة)، لأن `-` و`+` التي تضيفها إلى سلسلة التنسيق ستطابق `-` و`+` التي تظهر فعليًا في بداية أسطر الفرق. وإذا مرّرت `(got, want)` إلى الدالة، فسيكون المفتاح الصحيح `(-got +want)` بدلًا من ذلك.
- تستخدم حزمة `messagediff` صيغة مخرجات مختلفة، لذا تكون الرسالة `diff (want -> got)` مناسبة عند استخدامها (إذا مرّرت `(want, got)` إلى الدالة)، لأن اتجاه السهم سيطابق اتجاه السهم في الأسطر "المعدّلة".

سيمتد الفرق على عدة أسطر، لذا ينبغي طباعة سطر جديد قبل طباعة الفرق.

### دلالات أخطاء الاختبار (Test error semantics)

عندما يُجري اختبار وحدة مقارنات نصية أو يستخدم `cmp` العادية للتحقق من أن أنواعًا معيّنة من الأخطاء تُرجَع لمدخلات معيّنة، فقد تجد أن اختباراتك هشّة إذا أُعيدت صياغة أي من رسائل الأخطاء تلك في المستقبل. ولأن ذلك قد يحوّل اختبار الوحدة لديك إلى كاشف تغييرات (راجع [TotT: Change-Detector Tests Considered Harmful](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html)), فلا تستخدم المقارنة النصية للتحقق من نوع الخطأ الذي تُرجعه دالتك. غير أنه يجوز استخدام المقارنات النصية للتحقق من أن رسائل الأخطاء الآتية من الحزمة قيد الاختبار تحقّق خصائص معيّنة، مثل تضمينها اسم الوسيط.

تحتوي قيم الأخطاء في Go عادةً على مكوّن موجّه للعين البشرية ومكوّن موجّه لتدفق التحكم الدلالي. وينبغي أن تسعى الاختبارات إلى اختبار المعلومات الدلالية التي يمكن ملاحظتها بشكل موثوق فقط، لا عرض المعلومات الموجّهة لتنقيح البشر، لأن هذه غالبًا ما تكون عرضة للتغييرات المستقبلية. وللحصول على إرشاد حول إنشاء أخطاء ذات معنى دلالي، راجع [أفضل الممارسات المتعلّقة بالأخطاء](/book/go-style/best-practices-2/index#error-handling). وإذا كان خطأ بمعلومات دلالية غير كافية يأتي من اعتمادية خارج سيطرتك، ففكّر في تقديم تقرير خطأ إلى مالكها للمساعدة في تحسين الواجهة البرمجية، بدلًا من الاعتماد على تحليل نص الخطأ.

داخل اختبارات الوحدة، من الشائع الاهتمام فقط بما إذا حدث خطأ أم لا. وفي هذه الحالة، يكفي اختبار ما إذا كان الخطأ غير nil عندما توقّعت خطأً. وإذا أردت اختبار أن الخطأ يطابق دلاليًا خطأً آخر، ففكّر في استخدام [`errors.Is`](https://pkg.go.dev/errors#Is) أو `cmp` مع [`cmpopts.EquateErrors`](https://pkg.go.dev/github.com/google/go-cmp/cmp/cmpopts#EquateErrors).

**ملاحظة:** إذا استخدم اختبار [`cmpopts.EquateErrors`](https://pkg.go.dev/github.com/google/go-cmp/cmp/cmpopts#EquateErrors) لكن كانت كل قيم `wantErr` لديه إما `nil` أو `cmpopts.AnyError`، فإن استخدام `cmp` يكون [آلية غير ضرورية](/book/go-style/guide/index#least-mechanism). بسّط الكود بجعل حقل want من النوع `bool`. ويمكنك حينئذٍ استخدام مقارنة بسيطة بـ`!=`.

```
// Good:
err := f(test.input)
if gotErr := err != nil; gotErr != test.wantErr {
    t.Errorf("f(%q) = %v, want error presence = %v", test.input, err, test.wantErr)
}
```

راجع أيضًا [GoTip #13: Designing Errors for Checking](https://google.github.io/styleguide/go/index.html#gotip).

## بنية الاختبار (Test structure)

### الاختبارات الفرعية (Subtests) {#subtests}

توفّر مكتبة الاختبار القياسية في Go إمكانية [تعريف اختبارات فرعية](https://pkg.go.dev/testing#hdr-Subtests_and_Sub_benchmarks). وهذا يتيح مرونة في الإعداد والتنظيف، والتحكّم في التوازي، وتصفية الاختبارات. وقد تكون الاختبارات الفرعية مفيدة (خصوصًا للاختبارات القائمة على الجداول)، لكن استخدامها ليس إلزاميًا. راجع أيضًا [تدوينة مدونة Go حول الاختبارات الفرعية](https://blog.golang.org/subtests).

لا ينبغي أن تعتمد الاختبارات الفرعية على تنفيذ حالات أخرى للنجاح أو للحالة الابتدائية، لأن الاختبارات الفرعية يُتوقَّع أن تكون قابلة للتشغيل فرديًا باستخدام أعلام `go test -run` أو تعبيرات [تصفية الاختبارات](https://bazel.build/docs/user-manual#test-filter) في Bazel.

#### أسماء الاختبارات الفرعية (Subtest names) {#subtest-names}

سمِّ اختبارك الفرعي بحيث يكون مقروءًا في مخرجات الاختبار ومفيدًا على سطر الأوامر لمستخدمي تصفية الاختبارات. وعند استخدام `t.Run` لإنشاء اختبار فرعي، يُستخدم الوسيط الأول اسمًا وصفيًا للاختبار. ولضمان أن تكون نتائج الاختبار واضحة للبشر الذين يقرؤون السجلات، اختر أسماء اختبارات فرعية تبقى مفيدة ومقروءة بعد الهروب (escaping). وفكّر في أسماء الاختبارات الفرعية كمعرّف دالة أكثر منها وصفًا نثريًا.

يستبدل مشغّل الاختبارات المسافات بشرطات سفلية، ويهرّب الأحرف غير القابلة للطباعة. ولضمان ارتباط دقيق بين سجلات الاختبار والكود المصدري، يُوصى بتجنّب استخدام هذه الأحرف في أسماء الاختبارات الفرعية.

إذا استفادت بيانات اختبارك من وصف أطول، ففكّر في وضع الوصف في حقل منفصل (ربما لطباعته باستخدام `t.Log` أو إلى جانب رسائل الفشل).

يمكن تشغيل الاختبارات الفرعية فرديًا باستخدام أعلام [مشغّل اختبارات Go](https://golang.org/cmd/go/#hdr-Testing_flags) أو [تصفية الاختبارات](https://bazel.build/docs/user-manual#test-filter) في Bazel، لذا اختر أسماء وصفية يسهل كتابتها أيضًا.

**تحذير:** أحرف الشرطة المائلة غير ودّية بشكل خاص في أسماء الاختبارات الفرعية، لأن لها [معنى خاصًا في تصفية الاختبارات](https://blog.golang.org/subtests#:~:text=Perhaps%20a%20bit,match%20any%20tests).

```
# Bad:
# Assuming TestTime and t.Run("America/New_York", ...)
bazel test :mytest --test_filter="Time/New_York"    # Runs nothing!
bazel test :mytest --test_filter="Time//New_York"   # Correct, but awkward.
```

لـ[تحديد مدخلات](#identify-the-input) الدالة، أدرجها في رسائل فشل الاختبار، حيث لن يهرّبها مشغّل الاختبارات.

```
// Good:
func TestTranslate(t *testing.T) {
    data := []struct {
        name, desc, srcLang, dstLang, srcText, wantDstText string
    }{
        {
            name:        "hu=en_bug-1234",
            desc:        "regression test following bug 1234. contact: cleese",
            srcLang:     "hu",
            srcText:     "cigarettát és egy öngyújtót kérek",
            dstLang:     "en",
            wantDstText: "cigarettes and a lighter please",
        }, // ...
    }
    for _, d := range data {
        t.Run(d.name, func(t *testing.T) {
            got := Translate(d.srcLang, d.dstLang, d.srcText)
            if got != d.wantDstText {
                t.Errorf("%s\nTranslate(%q, %q, %q) = %q, want %q",
                    d.desc, d.srcLang, d.dstLang, d.srcText, got, d.wantDstText)
            }
        })
    }
}
```

وإليك بعض الأمثلة على أشياء ينبغي تجنّبها:

```
// Bad:
// Too wordy.
t.Run("check that there is no mention of scratched records or hovercrafts", ...)
// Slashes cause problems on the command line.
t.Run("AM/PM confusion", ...)
```

راجع أيضًا [Go Tip #117: Subtest Names](https://google.github.io/styleguide/go/index.html#gotip).

### الاختبارات القائمة على الجداول (Table-driven tests) {#table-driven-tests}

استخدم الاختبارات القائمة على الجداول عندما يمكن اختبار حالات اختبار مختلفة كثيرة باستخدام منطق اختبار مشابه.

- عند اختبار ما إذا كانت المخرجات الفعلية لدالة تساوي المخرجات المتوقّعة. فمثلًا، [اختبارات `fmt.Sprintf`](https://cs.opensource.google/go/go/+/master:src/fmt/fmt_test.go) الكثيرة أو المقتطف الأدنى أدناه.
- عند اختبار ما إذا كانت مخرجات دالة تتوافق دائمًا مع المجموعة نفسها من الشروط الثابتة (invariants). فمثلًا، [اختبارات `net.Dial`](https://cs.opensource.google/go/go/+/master:src/net/dial_test.go;l=318;drc=5b606a9d2b7649532fe25794fa6b99bd24e7697c).

وهذا هو الهيكل الأدنى لاختبار قائم على الجداول. وعند الحاجة، يمكنك استخدام أسماء مختلفة أو إضافة تسهيلات إضافية مثل الاختبارات الفرعية أو دوال الإعداد والتنظيف. وأبقِ دائمًا [حالات فشل الاختبار المفيدة](#useful-test-failures) في الحسبان.

```
// Good:
func TestCompare(t *testing.T) {
    compareTests := []struct {
        a, b string
        want int
    }{
        {"", "", 0},
        {"a", "", 1},
        {"", "a", -1},
        {"abc", "abc", 0},
        {"ab", "abc", -1},
        {"abc", "ab", 1},
        {"x", "ab", 1},
        {"ab", "x", -1},
        {"x", "a", 1},
        {"b", "x", -1},
        // test runtime·memeq's chunked implementation
        {"abcdefgh", "abcdefgh", 0},
        {"abcdefghi", "abcdefghi", 0},
        {"abcdefghi", "abcdefghj", -1},
    }
    for _, test := range compareTests {
        got := Compare(test.a, test.b)
        if got != test.want {
            t.Errorf("Compare(%q, %q) = %v, want %v", test.a, test.b, got, test.want)
        }
    }
}
```

**ملاحظة**: تحقّق رسائل الفشل في المثال أعلاه الإرشاد الخاص بـ[تحديد الدالة](#identify-the-function) و[تحديد المدخل](#identify-the-input). ولا حاجة إلى [تحديد الصف رقميًا](#table-tests-identifying-the-row).

عندما تحتاج بعض حالات الاختبار إلى التحقق منها باستخدام منطق مختلف عن حالات اختبار أخرى، يكون من المناسب كتابة دوال اختبار متعدّدة، كما هو موضّح في [GoTip #50: Disjoint Table Tests](https://google.github.io/styleguide/go/index.html#gotip).

وعندما تكون حالات الاختبار الإضافية بسيطة (مثل التحقق الأساسي من الأخطاء) ولا تُدخل تدفّق كود شرطي في جسم حلقة الاختبار الجدولي، فيجوز تضمين تلك الحالة في الاختبار الموجود، لكن كن حذرًا في استخدام منطق كهذا. فما يبدأ بسيطًا اليوم قد ينمو عضويًا ليصبح شيئًا غير قابل للصيانة.

فمثلًا:

```javascript
func TestDivide(t *testing.T) {
    tests := []struct {
        dividend, divisor int
        want              int
        wantErr           bool
    }{
        {
            dividend: 4,
            divisor:  2,
            want:     2,
        },
        {
            dividend: 10,
            divisor:  2,
            want:     5,
        },
        {
            dividend: 1,
            divisor:  0,
            wantErr:  true,
        },
    }
    for _, test := range tests {
        got, err := Divide(test.dividend, test.divisor)
        if (err != nil) != test.wantErr {
            t.Errorf("Divide(%d, %d) error = %v, want error presence = %t", test.dividend, test.divisor, err, test.wantErr)
        }
        // In this example, we're only testing the value result when the tested function didn't fail.
        if err != nil {
            continue
        }
        if got != test.want {
            t.Errorf("Divide(%d, %d) = %d, want %d", test.dividend, test.divisor, got, test.want)
        }
    }
}
```

قد يكون المنطق الأكثر تعقيدًا في كود اختبارك، مثل التحقق المعقّد من الأخطاء بناءً على فروق شرطية في إعداد الاختبار (غالبًا بناءً على وسائط إدخال الاختبار الجدولي)، [صعب الفهم](/book/go-style/guide/index#maintainability) عندما يكون لكل مدخل في الجدول منطق متخصّص بناءً على المدخلات. وإذا كانت لحالات الاختبار منطق مختلف لكن إعداد متطابق، فقد تكون سلسلة من [الاختبارات الفرعية](#subtests) داخل دالة اختبار واحدة أكثر قابلية للقراءة. وقد تكون مساعدة الاختبار مفيدة أيضًا لتبسيط إعداد الاختبار حفاظًا على قابلية قراءة جسم الاختبار.

يمكنك الجمع بين الاختبارات القائمة على الجداول ودوال اختبار متعدّدة. فمثلًا، عند اختبار أن مخرجات دالة تطابق المخرجات المتوقّعة تمامًا وأن الدالة تُرجع خطأً غير nil لمدخل غير صالح، فإن أفضل نهج هو كتابة دالتي اختبار جدوليتين منفصلتين: واحدة للمخرجات العادية غير الخطأ، وأخرى لمخرجات الأخطاء.

#### حالات اختبار قائمة على البيانات (Data-driven test cases)

قد تصبح صفوف الاختبار الجدولي معقّدة أحيانًا، بحيث تفرض قيم الصفوف سلوكًا شرطيًا داخل حالة الاختبار. ويكون الوضوح الإضافي الناتج عن التكرار بين حالات الاختبار ضروريًا لقابلية القراءة.

```javascript
// Good:
type decodeCase struct {
    name   string
    input  string
    output string
    err    error
}
func TestDecode(t *testing.T) {
    // setupCodex is slow as it creates a real Codex for the test.
    codex := setupCodex(t)
    var tests []decodeCase // rows omitted for brevity
    for _, test := range tests {
        t.Run(test.name, func(t *testing.T) {
            output, err := Decode(test.input, codex)
            if got, want := output, test.output; got != want {
                t.Errorf("Decode(%q) = %v, want %v", test.input, got, want)
            }
            if got, want := err, test.err; !cmp.Equal(got, want) {
                t.Errorf("Decode(%q) err %q, want %q", test.input, got, want)
            }
        })
    }
}
func TestDecodeWithFake(t *testing.T) {
    // A fakeCodex is a fast approximation of a real Codex.
    codex := newFakeCodex()
    var tests []decodeCase // rows omitted for brevity
    for _, test := range tests {
        t.Run(test.name, func(t *testing.T) {
            output, err := Decode(test.input, codex)
            if got, want := output, test.output; got != want {
                t.Errorf("Decode(%q) = %v, want %v", test.input, got, want)
            }
            if got, want := err, test.err; !cmp.Equal(got, want) {
                t.Errorf("Decode(%q) err %q, want %q", test.input, got, want)
            }
        })
    }
}
```

في المثال المضاد أدناه، لاحظ كم يصعب التمييز بين نوع `Codex` المستخدم لكل حالة اختبار في إعداد الحالة. (تخالف الأجزاء المميّزة الإرشاد الوارد في [TotT: Data Driven Traps!](https://testing.googleblog.com/2008/09/tott-data-driven-traps.html).)

```javascript
// Bad:
type decodeCase struct {
  name   string
  input  string
  codex  testCodex
  output string
  err    error
}
type testCodex int
const (
  fake testCodex = iota
  prod
)
func TestDecode(t *testing.T) {
  var tests []decodeCase // rows omitted for brevity
  for _, test := tests {
    t.Run(test.name, func(t *testing.T) {
      var codex Codex
      switch test.codex {
      case fake:
        codex = newFakeCodex()
      case prod:
        codex = setupCodex(t)
      default:
        t.Fatalf("Unknown codex type: %v", codex)
      }
      output, err := Decode(test.input, codex)
      if got, want := output, test.output; got != want {
        t.Errorf("Decode(%q) = %q, want %q", test.input, got, want)
      }
      if got, want := err, test.err; !cmp.Equal(got, want) {
        t.Errorf("Decode(%q) err %q, want %q", test.input, got, want)
      }
    })
  }
}
```

#### تحديد الصف (Identifying the row) {#table-tests-identifying-the-row}

لا تستخدم فهرس الاختبار في جدول الاختبار بديلًا عن تسمية اختباراتك أو طباعة المدخلات. فلا أحد يريد تصفّح جدول اختبارك وعدّ المدخلات لمعرفة حالة الاختبار التي تفشل.

```
// Bad:
tests := []struct {
    input, want string
}{
    {"hello", "HELLO"},
    {"wORld", "WORLD"},
}
for i, d := range tests {
    if strings.ToUpper(d.input) != d.want {
        t.Errorf("Failed on case #%d", i)
    }
}
```

أضف وصفًا للاختبار إلى بنية اختبارك واطبعه إلى جانب رسائل الفشل. وعند استخدام الاختبارات الفرعية، ينبغي أن يكون اسم اختبارك الفرعي فعّالًا في تحديد الصف.

**مهم:** على الرغم من أن `t.Run` تحصر المخرجات والتنفيذ، يجب عليك دائمًا [تحديد المدخل](#identify-the-input). ويجب أن تتبع أسماء صفوف الاختبار الجدولي إرشاد [تسمية الاختبارات الفرعية](#subtest-names).

### مساعدات الاختبار (Test helpers) {#mark-test-helpers}

مساعدة الاختبار دالة تؤدي مهمة إعداد أو تنظيف. ويُتوقَّع أن تكون كل حالات الفشل التي تحدث في مساعدات الاختبار فشلًا في البيئة (لا في الكود قيد الاختبار) — مثلًا عندما يتعذّر بدء قاعدة بيانات اختبار لأنه لم تعد هناك منافذ حرّة على هذا الجهاز.

إذا مرّرت `*testing.T`، فاستدعِ [`t.Helper`](https://pkg.go.dev/testing#T.Helper) لنسبة حالات الفشل في مساعدة الاختبار إلى السطر الذي تُستدعى فيه المساعدة. وينبغي أن يأتي هذا الوسيط بعد وسيط [السياق](#contexts)، إن وُجد، وقبل أي وسائط متبقّية.

```python
// Good:
func TestSomeFunction(t *testing.T) {
    golden := readFile(t, "testdata/golden-result.txt")
    // ... tests against golden ...
}
// readFile returns the contents of a data file.
// It must only be called from the same goroutine as started the test.
func readFile(t *testing.T, filename string) string {
    t.Helper()
    contents, err := runfiles.ReadFile(filename)
    if err != nil {
        t.Fatal(err)
    }
    return string(contents)
}
```

لا تستخدم هذا النمط عندما يحجب الصلة بين فشل الاختبار والظروف التي أدّت إليه. وتحديدًا، يظلّ الإرشاد الخاص بـ[مكتبات التحقق](#assert) ساريًا، ولا ينبغي استخدام [`t.Helper`](https://pkg.go.dev/testing#T.Helper) لتنفيذ مثل هذه المكتبات.

**نصيحة:** لمزيد من التفصيل حول الفرق بين مساعدات الاختبار ومساعدات التحقق، راجع [أفضل الممارسات](/book/go-style/best-practices-2/index#test-functions).

على الرغم من أن ما سبق يشير إلى `*testing.T`، فإن كثيرًا من النصائح يبقى كما هو بالنسبة إلى مساعدات القياس (benchmark) والاختبار العشوائي (fuzz).

### حزمة الاختبار (Test package)

#### اختبارات في الحزمة نفسها (Tests in the same package)

يجوز تعريف الاختبارات في الحزمة نفسها التي يوجد فيها الكود قيد الاختبار.

لكتابة اختبار في الحزمة نفسها:

- ضع الاختبارات في ملف `foo_test.go`
- استخدم `package foo` لملف الاختبار
- لا تستورد الحزمة قيد الاختبار صراحةً

```
# Good:
go_library(
    name = "foo",
    srcs = ["foo.go"],
    deps = [
        ...
    ],
)

go_test(
    name = "foo_test",
    size = "small",
    srcs = ["foo_test.go"],
    library = ":foo",
    deps = [
        ...
    ],
)
```

يستطيع الاختبار في الحزمة نفسها الوصول إلى المعرّفات غير المصدَّرة في الحزمة. وقد يتيح ذلك تغطية اختبارية أفضل واختبارات أكثر إيجازًا. وكن على علم بأن أي [أمثلة](#examples) معلنة في الاختبار لن تحمل أسماء الحزم التي سيحتاجها المستخدم في كوده.

#### اختبارات في حزمة مختلفة (Tests in a different package)

ليس من المناسب دائمًا، ولا ممكنًا حتى، تعريف اختبار في الحزمة نفسها التي يوجد فيها الكود قيد الاختبار. وفي هذه الحالات، استخدم اسم حزمة باللاحقة `_test`. وهذا استثناء من قاعدة "لا شرطات سفلية" في [أسماء الحزم](#package-names). فمثلًا:

إذا لم يكن لاختبار تكاملي مكتبة واضحة ينتمي إليها

```python
// Good:
package gmailintegration_test
import "testing"
```

إذا أدّى تعريف الاختبارات في الحزمة نفسها إلى تبعيات دائرية

```python
// Good:
package fireworks_test
import (
  "fireworks"
  "fireworkstestutil" // fireworkstestutil also imports fireworks
)
```

### استخدام الحزمة `testing` (Use package testing)

توفّر مكتبة Go القياسية [حزمة `testing`](https://pkg.go.dev/testing). وهي إطار الاختبار الوحيد المسموح به لكود Go في قاعدة كود Google. وبوجه خاص، لا يُسمح بـ[مكتبات التحقق](#assert) وأطر الاختبار من طرف ثالث.

توفّر حزمة `testing` مجموعة وظائف أدنى لكن كاملة لكتابة اختبارات جيدة:

- اختبارات على المستوى الأعلى
- القياسات (Benchmarks)
- [أمثلة قابلة للتشغيل](https://blog.golang.org/examples)
- الاختبارات الفرعية (Subtests)
- التسجيل (Logging)
- حالات الفشل والفشل القاتل

صُمّمت هذه لتعمل متناغمة مع ميزات اللغة الأساسية مثل [القيم الحرفية المركّبة (composite literals)](https://go.dev/ref/spec#Composite_literals) وصيغة [`if` مع المعلوم الابتدائي](https://go.dev/ref/spec#If_statements) لتمكين مؤلّفي الاختبارات من كتابة [اختبارات واضحة قابلة للقراءة وقابلة للصيانة].

## قضايا غير محسومة (Non-decisions)

لا يمكن لدليل أسلوب أن يسرد وصفات إيجابية لكل الأمور، ولا أن يسرد كل الأمور التي لا يقدّم رأيًا فيها. ومع ذلك، إليك بعض الأمور التي سبق أن ناقشها مجتمع قابلية القراءة ولم يتوصّل إلى إجماع بشأنها.

- **تهيئة المتغيّر المحلي بقيمته الصفرية**. `var i int` و`i := 0` متكافئان. راجع أيضًا [أفضل ممارسات التهيئة](https://google.github.io/styleguide/go/best-practices#vardeclinitialization).
- **القيمة الحرفية المركّبة الفارغة مقابل `new` أو `make`**. `&File{}` و`new(File)` متكافئان. وكذلك `map[string]bool{}` و`make(map[string]bool)`. راجع أيضًا [أفضل ممارسات إعلان القيم المركّبة](https://google.github.io/styleguide/go/best-practices#vardeclcomposite).
- **ترتيب وسيطي got وwant في استدعاءات cmp.Diff**. كن متسقًا محليًا، و[أدرج مفتاحًا](#print-diffs) في رسالة الفشل.
- **`errors.New` مقابل `fmt.Errorf` على السلاسل غير المنسّقة**. يمكن استخدام `errors.New("foo")` و`fmt.Errorf("foo")` بالتبادل.

إذا ظهرت هذه الأمور مجددًا في ظروف خاصة، فقد يبدي مرشد قابلية القراءة تعليقًا اختياريًا، لكن المؤلف حرّ عمومًا في اختيار الأسلوب الذي يفضّله في الحالة المعطاة.

وبطبيعة الحال، إذا احتاج أي أمر غير مشمول بدليل الأسلوب إلى مزيد من النقاش، فالمؤلفون مدعوّون إلى السؤال — سواء في المراجعة المحدّدة أو على لوحات الرسائل الداخلية.

هذا الموقع مفتوح المصدر. [حسّن هذه الصفحة](https://github.com/google/styleguide/edit/gh-pages/go/decisions.md).
