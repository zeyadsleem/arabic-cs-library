---
slug: control-structures
title: بنى التحكم
titleEn: Control structures
summary: "`for` واحدة تصنع ثلاثة، و`switch` أكثر مرونة، ولا أقواس في بناء التحكم."
---

بنى التحكم في Go صلة ببنى C، لكنها تختلف عنها في جوانب مهمة. فلا وجود لحلقة `do` ولا `while`، وإنما `for` تعميمًا طفيفًا؛ و`switch` أكثر مرونة؛ و`if` و`switch` يقبلان جملة تهيئة اختيارية على غرار `for`؛ و`break` و`continue` يأخذان تسمية (label) اختيارية تحدّد ما يُنهى أو يُتابَع؛ وهناك بنى تحكم جديدة منها مُبدِّل الأنواع (type switch) ومُبدِّل اتصالات متعدّد المسارات، وهو `select`. والصياغة تختلف أيضًا اختلافًا طفيفًا: لا أقواس، ويجب دائمًا محاطة الأجسام بأقواس معقوفة.

## if

في Go تبدو `if` البسيطة هكذا:

```go
if x > 0 {
    return y
}
```

الأقواس المعقوفة الإلزامية تشجّع على كتابة جمل `if` البسيطة في عدّة أسطر. وهو أسلوب جيّد على أي حال، ولا سيما حين يحتوي الجسم على جملة تحكم مثل `return` أو `break`.

ولأن `if` و`switch` تقبلان جملة تهيئة، فسنرى كثيرًا ما يُستعمل فيهما لتهيئة متغيّر محلي:

```go
if err := file.Chmod(0664); err != nil {
    log.Print(err)
    return err
}
```

وفي مكتبات Go ستجد أن `if` التي لا تنساب إلى الجملة التالية — أي أن الجسم ينتهي بـ `break` أو `continue` أو `goto` أو `return` — يُحذف منها `else` غير الضروري:

```go
f, err := os.Open(name)
if err != nil {
    return err
}
codeUsing(f)
```

وهذا مثال على موقف شائع تفرض فيه الشيفرة التحسّس أمام سلسلة من حالات الخطأ. وتُقرأ الشيفرة قراءةً سليمة إن كان مسار النجاح يجري نزولًا في الصفحة، فتُلغى حالات الخطأ لحظة ظهورها. وبما أن حالات الخطأ تنتهي غالبًا بجمل `return`، لا تحتاج الشيفرة الناتجة إلى أي جمل `else`:

```go
f, err := os.Open(name)
if err != nil {
    return err
}
d, err := f.Stat()
if err != nil {
    f.Close()
    return err
}
codeUsing(f, d)
```

## إعادة التصريح وإعادة الإسناد

على هامش الموضوع: المثال الأخير في القسم السابق يوضّح تفصيلًا في كيفية عمل صيغة التصريح القصير `:=`. فالتصريح الذي ينادي `os.Open` هو:

```go
f, err := os.Open(name)
```

وتُعلن هذه الجملة متغيّرين: `f` و`err`. وبعد بضعة أسطر، يصبح نداء `f.Stat`:

```go
d, err := f.Stat()
```

وهو يبدو وكأنه يُعلن `d` و`err`. لكن لاحظ أن `err` يظهر في الجملتين معًا. وهذا التكرار قانوني: فـ `err` مُعلَن في الجملة الأولى، ومُعاد إسناده في الثانية فحسب. أي أن نداء `f.Stat` يستعمل متغيّر `err` الموجود أصلًا، ويكتفي بإعطائه قيمة جديدة.

وفي تصريح بـ `:=` قد يظهر المتغيّر `v` حتى لو كان مُعلَنًا من قبل، شريطة:

- أن يقع هذا التصريح في النطاق نفسه الذي أُعلن فيه `v` (فإن كان `v` مُعلَنًا في نطاق خارجي، فإن التصريح سينشئ متغيّرًا جديدًا، انظر الحاشية)،

- أن تكون القيمة المقابلة له في التهيئة قابلة للإسناد إلى `v`، و

- أن يوجد متغيّر آخر واحد على الأقل ينشئه هذا التصريح.

وهذه الخاصية غير المعتادة هي خالصة العمليّة: فهي تتيح مثلًا استعمال قيمة `err` واحدة في سلسلة طويلة من `if-else`. وستراها مستعملة في كل موضع تقريبًا.

> في Go، نطاق معاملات الدالة وقيم عودتها هو نفسه نطاق جسم الدالة، رغم أنها تظهر معجَميًا خارج الأقواس المعقوفة التي تحدّ الجسم.

## for

حلقة `for` في Go شبيهة بحلقة C، لكنها ليست هي. فهي توحّد `for` و`while`، ولا وجود لـ `do-while`. ولها ثلاثة أشكال، واحد منها فقط يتضمّن فواصل منقوطة:

```go
// Like a C for
for init; condition; post { }

// Like a C while
for condition { }

// Like a C for(;;)
for { }
```

وتجعل التصاريح القصيرة من السهل أن تُعلن متغيّر الفهرس في الحلقة نفسها:

```go
sum := 0
for i := 0; i < 10; i++ {
    sum += i
}
```

وإن كنت تتصفّح مصفوفة (array) أو شريحة (slice) أو نصًّا (string) أو خريطة (map)، أو تقرأ من قناة (channel)، فبند `range` يستطيع أن يدير الحلقة عنك:

```go
for key, value := range oldMap {
    newMap[key] = value
}
```

وإن كنت تحتاج العنصر الأول في النطاق فقط — المفتاح أو الفهرس — فاحذف الثاني:

```go
for key := range m {
    if key.expired() {
        delete(m, key)
    }
}
```

وإن كنت تحتاج العنصر الثاني فقط — القيمة — فاستعمل المُعرِّف الفارغ، أي الشرطة السفلية، للتخلّص من الأول:

```go
sum := 0
for _, value := range array {
    sum += value
}
```

وللمُعرِّف الفارغ استعمالات كثيرة، كما هو موضَّح في قسم لاحق.

أمّا في النصوص، فـ `range` يفعل عنك أكثر من ذلك: فهو يستخرج نقاط ترميز Unicode منفردة بتحليل UTF-8. أما الترميزات الخاطئة فتستهلك بايتًا واحدًا وتنتج محرف البديل U+FFFD. (واسم `rune` — مع نوعه المدمج المرتبط به — هو مصطلح Go للنقطة الواحدة من ترميز Unicode؛ راجع مواصفات اللغة للتفاصيل.)

فالحلقة

```go
for pos, char := range "日本\x80語" { // \x80 is an illegal UTF-8 encoding
    fmt.Printf("character %#U starts at byte position %d\n", char, pos)
}
```

تُطبع

```text
character U+65E5 '日' starts at byte position 0
character U+672C '本' starts at byte position 3
character U+FFFD '�' starts at byte position 6
character U+8A9E '語' starts at byte position 7
```

وأخيرًا، لا يوجد في Go معامل فاصلة (comma operator)، كما أن `++` و`--` جملتان لا تعبيران. فإن أردت تشغيل عدّة متغيّرات داخل `for` فينبغي أن تستعمل الإسناد المتوازي (مع العلم بأن ذلك يستبعد `++` و`--`):

```go
// Reverse a
for i, j := 0, len(a)-1; i < j; i, j = i+1, j-1 {
    a[i], a[j] = a[j], a[i]
}
```

## switch

إن `switch` في Go أكثر عمومية من نظيرتها في C. فالتعبيرات ليست بالضرورة ثوابت ولا أعدادًا صحيحة؛ وتُقاس الحالات من الأعلى إلى الأسفل حتى يُعثر على تطابق؛ وإذا لم يكن في `switch` تعبير، فإنه يتبدّل على `true`. ومن ثمّ فمن الممكن — بل من المتّبَع لأعراف Go — أن تكتب سلسلة `if`-`else`-`if`-`else` على هيئة `switch`:

```go
func unhex(c byte) byte {
    switch {
    case '0' <= c && c <= '9':
        return c - '0'
    case 'a' <= c && c <= 'f':
        return c - 'a' + 10
    case 'A' <= c && c <= 'F':
        return c - 'A' + 10
    }
    return 0
}
```

ولا يوجد سقوط تلقائي إلى الحالة التالية، لكن يمكن تقديم الحالات في قوائم مفصولة بفواصل:

```go
func shouldEscape(c byte) bool {
    switch c {
    case ' ', '?', '&', '=', '#', '+', '%':
        return true
    }
    return false
}
```

ومع ذلك فجمل `break` أقل شيوعًا في Go بكثير مما هي في بعض اللغات الشبيهة بـ C، غير أنها تُستعمل لإنهاء `switch` مبكرًا. غير أنه أحيانًا يلزم الخروج من حلقة محيطة لا من الـ `switch`، وفي Go يتحقق ذلك بوضع تسمية (label) على الحلقة ثم «القفز» إليها. ويعرض المثال التالي الاستعمالين معًا:

```go
Loop:
    for n := 0; n < len(src); n += size {
        switch {
        case src[n] < sizeOne:
            if validateOnly {
                break
            }
            size = 1
            update(src[n])

        case src[n] < sizeTwo:
            if n+1 >= len(src) {
                err = errShortInput
                break Loop
            }
            if validateOnly {
                break
            }
            size = 2
            update(src[n] + src[n+1]<<shift)
        }
    }
```

ولأن `continue` تقبل أيضًا تسمية اختيارية، لكنها تنطبق على الحلقات فقط.

ولختم هذا القسم، إليك دالة مقارنة لشرائح البايت تستعمل جملتَي `switch`:

```go
// Compare returns an integer comparing the two byte slices,
// lexicographically.
// The result will be 0 if a == b, -1 if a < b, and +1 if a > b
func Compare(a, b []byte) int {
    for i := 0; i < len(a) && i < len(b); i++ {
        switch {
        case a[i] > b[i]:
            return 1
        case a[i] < b[i]:
            return -1
        }
    }
    switch {
    case len(a) > len(b):
        return 1
    case len(a) < len(b):
        return -1
    }
    return 0
}
```

## مُبدِّل الأنواع

يمكن أيضًا استعمال `switch` في اكتشاف النوع الديناميكي لمتغيّر من نوع واجهة (interface). ويستخدم هذا مُبدِّل الأنواع صيغة تأكيد النوع (type assertion) مع الكلمة المفتاحية `type` داخل الأقواس. وإذا أعلن الـ `switch` متغيّرًا في التعبير، فإن ذلك المتغيّر يأخذ النوع المقابل في كل بند. ومن المتّبَع لأعراف Go أيضًا أن تُعيد استعمال الاسم نفسه في هذه الحالات، فتُعلن فعليًا متغيّرًا جديدًا بالاسم نفسه لكن بنوع مختلف في كل حالة:

```go
var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
default:
    fmt.Printf("unexpected type %T\n", t)     // %T prints whatever type t has
case bool:
    fmt.Printf("boolean %t\n", t)             // t has type bool
case int:
    fmt.Printf("integer %d\n", t)             // t has type int
case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t has type *bool
case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t has type *int
}
```
