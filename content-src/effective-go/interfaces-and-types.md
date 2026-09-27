---
slug: interfaces-and-types
title: الواجهات وأنواع أخرى
titleEn: Interfaces and other types
summary: "الواجهة ليست إلا مجموعة دوال، والدوال يمكن تعريفها لأي نوع تقريبًا."
---

## الواجهات

توفّر الواجهات في Go وسيلة لتحديد سلوك كائن ما: إن كان هناك ما يستطيع عمل هذا، فيمكن استعماله هنا. وقد رأينا أمثلة بسيطة بالفعل: يمكن تنفيذ طابعات مخصّصة بطريقة `String`، بينما تستطيع `Fprintf` توليد مخرجات إلى أي شيء لديه طريقة `Write`.

والواجهات ذات الدالة أو الدالتين شائعة في شيفرة Go، وتُسمّى عادةً باسم مشتقّ من الدالة، مثل `io.Writer` لشيء ينفّذ `Write`.

ويمكن لنوع أن ينفّذ عدّة واجهات. فمثلًا، يمكن ترتيب مجموعة (collection) بواسطة الدوال في الحزمة `sort` إذا كانت تنفّذ `sort.Interface` التي تحوي `Len()` و`Less(i, j int) bool` و`Swap(i, j int)`، كما يمكن أن تكون لها أيضًا دالة تنسيق مخصّصة. وفي هذا المثال المتكلَّف، يشبع `Sequence` الاثنتين:

```go
type Sequence []int

// Methods required by sort.Interface.
func (s Sequence) Len() int {
    return len(s)
}
func (s Sequence) Less(i, j int) bool {
    return s[i] < s[j]
}
func (s Sequence) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}

// Copy returns a copy of the Sequence.
func (s Sequence) Copy() Sequence {
    copy := make(Sequence, 0, len(s))
    return append(copy, s...)
}

// Method for printing - sorts the elements before printing.
func (s Sequence) String() string {
    s = s.Copy() // Make a copy; don't overwrite argument.
    sort.Sort(s)
    str := "["
    for i, elem := range s { // Loop is O(N²); will fix that in next example.
        if i > 0 {
            str += " "
        }
        str += fmt.Sprint(elem)
    }
    return str + "]"
}
```

## التحويلات

دالة `String` لـ `Sequence` تعيد ما تفعله `Sprint` أصلًا للشرائح. (ولها أيضًا تعقيد O(N²) وهو سيّئ.) يمكننا أن نتقاسم الجهد — وأن نسرّعه أيضًا — إن حوّلنا `Sequence` إلى `[]int` مجرّدة قبل نداء `Sprint`:

```go
func (s Sequence) String() string {
    s = s.Copy()
    sort.Sort(s)
    return fmt.Sprint([]int(s))
}
```

وهذه الدالة مثال آخر على تقنية التحويل المستعملة لاستدعاء `Sprintf` بأمان من داخل دالة `String`. فلأن النوعين — `Sequence` و`[]int` — متطابقان إن تجاهلنا اسم النوع، فإن التحويل بينهما قانوني. والتحويل لا ينشئ قيمة جديدة، وإنما يتصرّف مؤقتًا وكأن القيمة القائمة لها نوع جديد. (وهناك تحويلات أخرى قانونية، مثل من عدد صحيح إلى فاصلة عائمة، تنشئ قيمة جديدة فعلًا.)

ومن أعراف برامج Go أن تحوّل نوع تعبير ما للوصول إلى مجموعة دوال مختلفة. فمثلًا، يمكننا استعمال النوع الموجود بالفعل `sort.IntSlice` لنختصر المثال كله إلى:

```go
type Sequence []int

// Method for printing - sorts the elements before printing
func (s Sequence) String() string {
    s = s.Copy()
    sort.IntSlice(s).Sort()
    return fmt.Sprint([]int(s))
}
```

فبدلًا من أن يكون `Sequence` مشبّعًا لعدّة واجهات (الترتيب والطباعة)، نستخدم القدرة على تحويل عنصر البيانات إلى عدّة أنواع — `Sequence` و`sort.IntSlice` و`[]int` — كل واحد منها يؤدّي جزءًا من العمل. وهذه الممارسة أقل شيوعًا، لكنها قد تكون فعّالة.

## تحويلات الواجهات وتأكيدات الأنواع

مُبدِّلات الأنواع صورة من صور التحويل: فهي تأخذ واجهة، ثم تحوّلها — في كل حالة داخل المُبدِّل — إلى نوع تلك الحالة. وإليك نسخة مبسّطة من الشيفرة الموجودة تحت `fmt.Printf` التي تحوّل قيمة إلى نصّ باستعمال مُبدِّل أنواع. فإن كانت القيمة نصًّا بالفعل، نريد قيمة النصّ الفعلية المحمّلة في الواجهة؛ أمّا إن كانت لديها دالة `String` فنريد نتيجة نداء الدالة:

```go
type Stringer interface {
    String() string
}

var value interface{} // Value provided by caller.
switch str := value.(type) {
case string:
    return str
case Stringer:
    return str.String()
}
```

الحالة الأولى تجد قيمة محدّدة (concrete)، والثانية تحوّل الواجهة إلى واجهة أخرى. ومن السليم تمامًا أن تخلط الأنواع بهذه الطريقة.

وماذا إن كان هناك نوع واحد نهمّ به فحسب؟ إن كنا نعرف أن القيمة تحوي `string` ونريد مجرّد استخراجه؟ يكفي أن نستعمل مُبدِّل أنواع ذو حالة واحدة، لكن تأكيد النوع يفي بالغرض أيضًا. فتأكيد النوع يأخذ قيمة واجهة ويستخرج منها قيمةً من النوع الصريح المحدّد. وصياغته مستعارة من بند مُبدِّل الأنواع، لكن بنوع صريح بدل الكلمة المفتاحية `type`:

```go
value.(typeName)
```

وتكون النتيجة قيمةً جديدة من النوع الساكن `typeName`. ويجب أن يكون هذا النوع إمّا النوع المحدّد الذي تحمله الواجهة، وإمّا نوع واجهة ثانية يمكن تحويل القيمة إليه. ولاستخراج النصّ الذي نعرف أنه في القيمة، يمكننا أن نكتب:

```go
str := value.(string)
```

لكن إن ثبت أن القيمة لا تحوي نصًّا، فإن البرنامج سينهار بخطأ وقت تشغيل. ولحماية نفسك من ذلك، استعمل عرف «الفاصلة، ok» لتختبر بأمان ما إذا كانت القيمة نصًّا:

```go
str, ok := value.(string)
if ok {
    fmt.Printf("string value is: %q\n", str)
} else {
    fmt.Printf("value is not a string\n")
}
```

وإن فشل تأكيد النوع، فإن `str` سيظل موجودًا ومن نوع string، لكنه سيحمل القيمة الصفرية، أي نصًّا فارغًا.

ولتوضيح هذه القدرة، إليك جملة `if`-`else` تكافئ مُبدِّل الأنواع الذي بدأنا به هذا القسم:

```go
if str, ok := value.(string); ok {
    return str
} else if str, ok := value.(Stringer); ok {
    return str.String()
}
```

## العمومية

إن كان وجود نوع ليس إلا لتنفيذ واجهة، ولن تُصدَّر له دوال خارج تلك الواجهة، فلا حاجة لتصدير النوع نفسه. فتصدير الواجهة وحدها يوضّح أن القيمة لا تملك سلوكًا لافتًا خارج ما تصفه الواجهة. كما أنه يتفادى الحاجة إلى تكرار التوثيق في كل موضع من مواضع دالة شائعة.

وفي هذه الحالات، ينبغي أن يُرجع المُنشئ قيمة واجهة بدل النوع المنفّذ. فمثلًا، في مكتبات التجزئة (hash) تُرجع كلٌّ من `crc32.NewIEEE` و`adler32.New` نوع الواجهة `hash.Hash32`. واستبدال خوارزمية CRC-32 بـ Adler-32 في برنامج Go لا يتطلّب سوى تغيير نداء المُنشئ؛ فبقية الشيفرة لا تتأثّر بتغيّر الخوارزمية.

ويتيح نهج مشابه فصل خوارزميات التعمية المتدفّقة (streaming ciphers) في حزم `crypto` المختلفة عن تشفيرات الكتل التي تتسلسل فوق بعضها. فالواجهة `Block` في حزمة `crypto/cipher` تصف سلوك تشفير كتلة، الذي يوفّر تشفير كتلة بيانات واحدة. ثم، قياسًا على حزمة `bufio`، يمكن لحزم التعمير التي تنفّذ هذه الواجهة أن تُستعمل لبناء تعميرات متدفّقة ممثَّلة بالواجهة `Stream`، من دون معرفة تفاصيل تشفير الكتل.

وتبدو واجهتا `crypto/cipher` كالتالي:

```go
type Block interface {
    BlockSize() int
    Encrypt(dst, src []byte)
    Decrypt(dst, src []byte)
}

type Stream interface {
    XORKeyStream(dst, src []byte)
}
```

وهذا تعريف تعمير نمط العدّاد (CTR)، الذي يحوّل تشفير كتلة إلى تعمير متدفّق؛ ولاحظ أن تفاصيل تشفير الكتلة مُجرَّدة تمامًا:

```go
// NewCTR returns a Stream that encrypts/decrypts using the given Block in
// counter mode. The length of iv must be the same as the Block's block size.
func NewCTR(block Block, iv []byte) Stream
```

و`NewCTR` لا تنطبق على خوارزمية تشفير واحدة محدّدة ومصدر بيانات واحد فحسب، بل على أي تنفيذ للواجهة `Block` وأي `Stream`. ولأنها تُرجع قيم واجهات، فإن استبدال تشفير CTR بأنماط تشفير أخرى يبقى تغييرًا موضعيًا. فنداءات المُنشئات يجب تعديلها، لكن بما أن الشيفرة المحيطة لا بدّ أن تعامل الناتج على أنه `Stream` فحسب، فلن تلاحظ الفرق.

## الواجهات والدوال

لأن كل شيء تقريبًا يمكن ربط دوال به، فكل شيء تقريبًا يستطيع إشباع واجهة. ومن الأمثلة التوضيحية الحزمة `http` التي تعرّف الواجهة `Handler`. وأي كائن ينفّذ `Handler` يستطيع خدمة طلبات HTTP:

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

و`ResponseWriter` هي نفسها واجهة توفّر الوصول إلى الدوال اللازمة لإرجاع الاستجابة إلى العميل. وتشمل هذه الدوال الدالة المعتادة `Write`، ومن ثمّ يمكن استعمال `http.ResponseWriter` في كل موضع يمكن فيه استعمال `io.Writer`. أمّا `Request` فهو بنية تحوي تمثيلًا محلَّلًا للطلب القادم من العميل.

ولتبسيط العرض، لنتجاهل طلبات POST ونفترض أن طلبات HTTP هي دائمًا GET؛ هذا التبسيط لا يؤثّر في طريقة إعداد المعالجات. وإليك تنفيذًا تافهًا لمعالج يعدّ عدد مرات زيارة الصفحة:

```go
// Simple counter server.
type Counter struct {
    n int
}

func (ctr *Counter) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    ctr.n++
    fmt.Fprintf(w, "counter = %d\n", ctr.n)
}
```

(ومتماسًا مع ثيمتنا، لاحظ كيف تستطيع `Fprintf` أن تطبع إلى `http.ResponseWriter`.) وفي خادم حقيقي، ستحتاج الوصول إلى `ctr.n` إلى الحماية من الوصول المتزامن. راجع حزمتَي `sync` و`atomic` للاقتراحات.

وللتذكير، إليك كيف تربط مثل هذا الخادم بعقدة في شجرة الروابط:

```go
import "net/http"
...
ctr := new(Counter)
http.Handle("/counter", ctr)
```

لكن لماذا نجعل `Counter` بنية؟ يكفي عدد صحيح. (ويحتاج المُستقبِل أن يكون مؤشرًا حتى يظهر الزيادة للمنادي.)

```go
// Simpler counter server.
type Counter int

func (ctr *Counter) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    *ctr++
    fmt.Fprintf(w, "counter = %d\n", *ctr)
}
```

وماذا لو كان برنامجك يملك حالة داخلية تحتاج أن تُبلَّغ بزيارة صفحة؟ اربط قناة بالصفحة:

```go
// A channel that sends a notification on each visit.
// (Probably want the channel to be buffered.)
type Chan chan *http.Request

func (ch Chan) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    ch <- req
    fmt.Fprint(w, "notification sent")
}
```

وأخيرًا، لنقل إن أردنا أن نعرض على `/args` الوسائط المستخدمة عند تشغيل الملف التنفيذي للخادم. فكتابة دالة تطبع الوسائط أمر سهل:

```go
func ArgServer() {
    fmt.Println(os.Args)
}
```

فكيف نحوّلها إلى خادم HTTP؟ يمكننا أن نجعل `ArgServer` طريقةً لنوعٍ ما نهمل قيمته، لكن هناك طريق أنظف. فلأننا نستطيع تعريف دالة لأي نوع عدا المؤشرات والواجهات، يمكننا كتابة دالة لدالة. وتحوي حزمة `http` هذه الشيفرة:

```go
// The HandlerFunc type is an adapter to allow the use of
// ordinary functions as HTTP handlers.  If f is a function
// with the appropriate signature, HandlerFunc(f) is a
// Handler object that calls f.
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, req).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, req *Request) {
    f(w, req)
}
```

فـ `HandlerFunc` نوع له دالة هي `ServeHTTP`، ولذلك تستطيع قيم ذلك النوع خدمة طلبات HTTP. تأمّل تنفيذ الدالة: المُستقبِل هو دالة هي `f`، والدالة تنادي `f`. قد يبدو هذا غريبًا، لكنه ليس مختلفًا كثيرًا عن، مثلًا، أن يكون المُستقبِل قناةً والدالة ترسل على القناة.

ولتحويل `ArgServer` إلى خادم HTTP، نعدّله أولًا ليصبح ذا التوقيع الصحيح:

```go
// Argument server.
func ArgServer(w http.ResponseWriter, req *http.Request) {
    fmt.Fprintln(w, os.Args)
}
```

أصبح لـ `ArgServer` الآن التوقيع نفسه الذي لـ `HandlerFunc`، ولذلك يمكن تحويله إلى ذلك النوع للوصول إلى دواله، تمامًا كما حوّلنا `Sequence` إلى `IntSlice` للوصول إلى `IntSlice.Sort`. وشيفرة الإعداد موجزة:

```go
http.Handle("/args", http.HandlerFunc(ArgServer))
```

وحين يزور أحدهم الصفحة `/args`، يكون المعالج المركّب في تلك الصفحة قيمته `ArgServer` ونوعه `HandlerFunc`. وسيستدعي خادم HTTP دالة `ServeHTTP` من ذلك النوع، وبمُستقبِل هو `ArgServer`، ما يستدعي بدوره `ArgServer` (عبر الاستدعاء `f(w, req)` داخل `HandlerFunc.ServeHTTP`). وعندئذ تُعرض الوسائط.

وفي هذا القسم صنعنا خادم HTTP من بنية، ومن عدد صحيح، ومن قناة، ومن دالة — كل ذلك لأن الواجهات ليست إلا مجموعات دوال، ويمكن تعريفها لأي نوع تقريبًا.
