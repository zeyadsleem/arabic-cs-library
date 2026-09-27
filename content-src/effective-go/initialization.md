---
slug: initialization
title: التهيئة
titleEn: Initialization
summary: "الثوابت والتعبيرات التي يستطيع المُصرِّف حسابها، ودالة `init`."
---

رغم أن التهيئة في Go لا تبدو ظاهريًا مختلفة كثيرًا عن التهيئة في C أو C++‎، فإنها أقوى. فبإمكانك بناء البنى المعقّدة أثناء التهيئة، وتُعالَج مسائل الترتيب بين العناصر المُهيّأة — حتى في حزم مختلفة — على نحو صحيح.

## الثوابت

ثوابت Go هي ثوابت فحسب. فهي تُنشأ وقت التصريف، حتى لو عُرِّفت كمتغيّرات محلية في دوال، ولا يمكن أن تكون إلا أعدادًا أو محارف (`rune`) أو نصوصًا أو قيمًا منطقية. وبفضل قيد وقت التصريف، فإن التعبيرات التي تعرّفها يجب أن تكون تعبيرات ثابتة يستطيع المُصرِّف حسابها. فمثلًا `1<<3` تعبير ثابت، بينما `math.Sin(math.Pi/4)` ليس كذلك، لأن نداء `math.Sin` يحتاج أن يحدث وقت التشغيل.

وفي Go تُنشأ الثوابت المُعدَّدة (enumerated) باستعمال المُعدِّد `iota`. وبما أن `iota` يمكن أن يكون جزءًا من تعبير، وأن التعبيرات يمكن أن تتكرر ضمنيًا، فمن السهل بناء مجموعات معقّدة من القيم:

```go
type ByteSize float64

const (
    _           = iota // ignore first value by assigning to blank identifier
    KB ByteSize = 1 << (10 * iota)
    MB
    GB
    TB
    PB
    EB
    ZB
    YB
)
```

والقدرة على ربط طريقة مثل `String` بأي نوع عرّفه المستخدم تجعل من الممكن أن تُنسِّق القيم الاعتباطية نفسها تلقائيًا للطباعة. ورغم أنك ستراها مستعملة أكثر من غيرها مع البنى `struct`، فإن هذه التقنية مفيدة أيضًا للأنواع العددية البسيطة مثل أنواع الفاصلة العائمة التي من حجم `ByteSize`:

```go
func (b ByteSize) String() string {
    switch {
    case b >= YB:
        return fmt.Sprintf("%.2fYB", b/YB)
    case b >= ZB:
        return fmt.Sprintf("%.2fZB", b/ZB)
    case b >= EB:
        return fmt.Sprintf("%.2fEB", b/EB)
    case b >= PB:
        return fmt.Sprintf("%.2fPB", b/PB)
    case b >= TB:
        return fmt.Sprintf("%.2fTB", b/TB)
    case b >= GB:
        return fmt.Sprintf("%.2fGB", b/GB)
    case b >= MB:
        return fmt.Sprintf("%.2fMB", b/MB)
    case b >= KB:
        return fmt.Sprintf("%.2fKB", b/KB)
    }
    return fmt.Sprintf("%.2fB", b)
}
```

يُطبع التعبير `YB` على هيئة `1.00YB`، بينما يُطبع `ByteSize(1e13)` على هيئة `9.09TB`.

استعمال `Sprintf` هنا لتنفيذ دالة `String` لـ `ByteSize` آمن — أي أنه يتجنّب العود إلى ما لا نهاية — لا بسبب التحويل، بل لأنه ينادي `Sprintf` مع `%f`، وهو ليس تنسيق نصّي: فـ `Sprintf` لا تنادي دالة `String` إلا حين تريد نصًّا، و`%f` يريد قيمة فاصلة عائمة.

## المتغيّرات

يمكن تهيئة المتغيّرات تمامًا كما تُهيَّأ الثوابت، لكن المهيّئ يمكن أن يكون تعبيرًا عامًا يُحسب وقت التشغيل:

```go
var (
    home   = os.Getenv("HOME")
    user   = os.Getenv("USER")
    gopath = os.Getenv("GOPATH")
)
```

## دالة init

أخيرًا، يستطيع كل ملف مصدر أن عرّف دالة `init` خاصة به بلا وسائط، لتهيئة أي حالة يحتاجها. (ولكل ملف في الواقع عدّة دوال `init`.) وإلى معنى «أخيرًا» فإلى هذا الحد: تُنادى `init` بعد أن تكون كل التصاريحات المتغيّرة في الحزمة قد قيم مهيّئاتها، وتُقوَّم هذه القيم بدورها بعد أن تكون كل الحزم المستوردة قد هُيّئت.

وإلى جانب التهيئات التي يتعذّر التعبير عنها بتصريجات، فإن استعمال شائعًا لدوال `init` هو التحقّق من صحّة حالة البرنامج أو إصلاحها قبل بدء التنفيذ الحقيقي:

```go
func init() {
    if user == "" {
        log.Fatal("$USER not set")
    }
    if home == "" {
        home = "/home/" + user
    }
    if gopath == "" {
        gopath = home + "/go"
    }
    // gopath may be overridden by --gopath flag on command line.
    flag.StringVar(&gopath, "gopath", gopath, "override default GOPATH")
}
```
