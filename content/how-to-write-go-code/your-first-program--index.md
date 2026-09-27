---
title: برنامجك الأول
lang: ar
---

لتصريف برنامج بسيط وتشغيله، اختر أولًا مسار وحدة (سنستعمل `example/user/hello`) وأنشئ ملف `go.mod` يعلنه:

```text
$ mkdir hello # Alternatively, clone it if it already exists in version control.
$ cd hello
$ go mod init example/user/hello
go: creating new go.mod: module example/user/hello
$ cat go.mod
module example/user/hello

go 1.16
$
```

يجب أن تكون الجملة الأولى في أي ملف مصدر لـ Go هي `package name`. والأوامر القابلة للتنفيذ يجب أن تستعمل `package main` دائمًا.

بعد ذلك، أنشئ ملفًا باسم `hello.go` داخل ذلك المجلد يحتوي شيفرة Go التالية:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world.")
}
```

والآن تستطيع بناء ذلك البرنامج وتثبيته بأداة `go`:

```text
$ go install example/user/hello
$
```

يبني هذا الأمر أمر `hello` ويُنتج ملفًا تنفيذيًا، ثم يثبّته في `$HOME/go/bin/hello` (أو على ويندوز في `%USERPROFILE%\go\bin\hello.exe`).

يتحكّم في مجلد التثبيت متغيّرا البيئة `GOPATH` و`GOBIN`. فإن ضُبط `GOBIN`، ثُبِّتت الملفات التنفيذية في ذلك المجلد. وإن ضُبط `GOPATH`، ثُبِّتت في المجلد الفرعي `bin` داخل أول مجلد في قائمة `GOPATH`. وإلا فثُبِّتت في المجلد `bin` داخل `GOPATH` الافتراضي (`$HOME/go` أو `%USERPROFILE%\go`).

ويمكنك استعمال أمر `go env` لضبط القيمة الافتراضية لمتغيّر بيئة بصورة محمولة، بحيث تسري على أوامر `go` اللاحقة:

```text
$ go env -w GOBIN=/somewhere/else/bin
$
```

ولإلغاء ضبط متغيّر سبق ضبطه بـ `go env -w`، استعمل `go env -u`:

```text
$ go env -u GOBIN
$
```

وتعمل أوامر مثل `go install` في سياق الوحدة الحاوية لمجلد العمل الحالي. فإن لم يكن مجلد العمل داخل وحدة `example/user/hello`، فقد يفشل `go install`.

وللراحة، تقبل أوامر `go` مسارات نسبةً إلى مجلد العمل، وتقع افتراضيًا على الحزمة الموجودة في مجلد العمل الحالي إن لم يُعطَ أي مسار آخر. فمن داخل مجلد العمل الخاص بنا، الأوامر التالية كلّها متكافئة:

```text
$ go install example/user/hello
```

```text
$ go install .
```

```text
$ go install
```

ولنشغّل البرنامج الآن للتأكد من عمله. ولتيسير إضافي، سنضيف مجلد التثبيت إلى `PATH` كي يكون تشغيل الملفات التنفيذية سهلًا:

```text
# Windows users should consult /wiki/SettingGOPATH
# for setting %PATH%.
$ export PATH=$PATH:$(dirname $(go list -f '{{.Target}}' .))
$ hello
Hello, world.
$
```

وإن كنت تستعمل نظام تحكّم بالإصدارات، فهذه وقت مناسب لتهيئة مستودع، وإضافة الملفات، وتنفيذ أول تغيير لك. وهذه الخطوة اختيارية أيضًا: فأنت لا تحتاج إلى نظام تحكّم بالإصدارات كي تكتب شيفرة Go.

```text
$ git init
Initialized empty Git repository in /home/user/hello/.git/
$ git add go.mod hello.go
$ git commit -m "initial commit"
[master (root-commit) 0b4507d] initial commit
 1 file changed, 7 insertion(+)
 create mode 100644 go.mod hello.go
$
```

يحدّد أمر `go` المستودع الحاوي لمسار وحدة معيّن بطلب عنوان HTTPS مقابل وقراءة بيانات وصفية مضمّنة في استجابة HTML (راجع `go help importpath`). وكثير من خدمات الاستضافة توفّر تلك البيانات الوصفية أصلًا للمستودعات التي تحوي شيفرة Go، ف السبب فإن أسهل طريقة تجعل وحدتك متاحة للاستعمال من غيرك هي عادةً أن تجعل مسار وحدة مطابقًا لعنوان URL الخاص بالمستودع.

## استيراد الحزم من وحدتك

لنكتب حزمة `morestrings` ونستعملها من برنامج `hello`. أولًا، أنشئ مجلدًا للحزمة باسم `$HOME/hello/morestrings`، ثم ملفًا باسم `reverse.go` في ذلك المجلد بالمحتويات التالية:

```go
// Package morestrings implements additional functions to manipulate UTF-8
// encoded strings, beyond what is provided in the standard "strings" package.
package morestrings

// ReverseRunes returns its argument string reversed rune-wise left to right.
func ReverseRunes(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)
}
```

ولأن دالتنا `ReverseRunes` تبدأ بحرف كبير، فهي مصدَّرة، ويمكن استعمالها في الحزم الأخرى التي تستورد حزمة `morestrings`.

ولنختبر أن الحزمة تُصرَّف بـ `go build`:

```text
$ cd $HOME/hello/morestrings
$ go build
$
```

ولن يُنتج ذلك ملفًا. بل يحفظ الحزمة المُصرَّفة في مخزن البناء المحلي.

وبعد التأكد من بناء حزمة `morestrings`، فلنستعملها من برنامج `hello`. وللعمل ذلك، عدّل ملف `$HOME/hello/hello.go` الأصلي ليستعمل حزمة `morestrings`:

```go
package main

import (
    "fmt"

    "example/user/hello/morestrings"
)

func main() {
    fmt.Println(morestrings.ReverseRunes("!oG ,olleH"))
}
```

ثم ثبّت برنامج `hello`:

```text
$ go install example/user/hello
```

وحين تشغّل النسخة الجديدة من البرنامج، ينبغي أن ترى رسالة جديدة معكوسة:

```text
$ hello
Hello, Go!
```

## استيراد الحزم من وحدات بعيدة

يستطيع مسار الاستيراد أن يصف كيفية الحصول على شيفرة مصدر الحزمة باستعمال نظام تحكّم بالإصدارات مثل Git أو Mercurial. وتستعمل الأداة `go` هذه الخاصية لجلب الحزم تلقائيًا من المستودعات البعيدة. فمثلًا، لاستعمال `github.com/google/go-cmp/cmp` في برنامجك:

```go
package main

import (
    "fmt"

    "example/user/hello/morestrings"
    "github.com/google/go-cmp/cmp"
)

func main() {
    fmt.Println(morestrings.ReverseRunes("!oG ,olleH"))
    fmt.Println(cmp.Diff("Hello World", "Hello Go"))
}
```

والآن وقد صار لديك اعتماد على وحدة خارجية، عليك تنزيل تلك الوحدة وتسجيل إصداراتها في ملف `go.mod`. ويضيف الأمر `go mod tidy` متطلّبات الوحدات الناقصة للحزم المستوردة، ويزيل المتطلّبات الخاصة بالوحدات التي لم تعد مستعملة.

```text
$ go mod tidy
go: finding module for package github.com/google/go-cmp/cmp
go: found github.com/google/go-cmp/cmp in github.com/google/go-cmp v0.5.4
$ go install example/user/hello
$ hello
Hello, Go!
  string(
-     "Hello World",
+     "Hello Go",
  )
$ cat go.mod
module example/user/hello

go 1.16

require github.com/google/go-cmp v0.5.4
$
```

تُنزَّل اعتماديات الوحدات تلقائيًا إلى المجلد الفرعي `pkg/mod` داخل المجلد الذي يشير إليه متغيّر البيئة `GOPATH`. وتُشارَك المحتويات المنزَّلة لإصدار معيّن من وحدة بين كل الوحدات الأخرى التي تطلب `require` ذلك الإصدار، ولذلك يضع أمر `go` علامة على تلك الملفات والمجلدات بأنها للقراءة فقط. ولإزالة كل الوحدات المنزَّلة، مرِّر الراية `-modcache` إلى `go clean`:

```text
$ go clean -modcache
$
```
