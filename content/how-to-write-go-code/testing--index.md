---
title: الاختبار
lang: ar
---

لدى Go إطار اختبار خفيف الوزن يتكوّن من الأمر `go test` وحزمة `testing`.

تكتب الاختبار بأنشئ ملفًا ينتهي اسمه بـ `_test.go` يحتوي دوال اسمها `TestXXX` وتوقيعها `func (t *testing.T)`. ويشغّل إطار الاختبار كل دالة من هذه الدوال؛ فإذا استدعت الدالة دالة فشل مثل `t.Error` أو `t.Fail`، عُدَّ الاختبار فاشلًا.

أضف اختبارًا إلى حزمة `morestrings` بأنشئ الملف `$HOME/hello/morestrings/reverse_test.go` الذي يحتوي شيفرة Go التالية:

```go
package morestrings

import "testing"

func TestReverseRunes(t *testing.T) {
    cases := []struct {
        in, want string
    }{
        {"Hello, world", "dlrow ,olleH"},
 {"Hello, ", " ,olleH"},
        {"", ""},
    }
    for _, c := range cases {
        got := ReverseRunes(c.in)
        if got != c.want {
            t.Errorf("ReverseRunes(%q) == %q, want %q", c.in, got, c.want)
        }
    }
}
```

ثم شغّل الاختبار بـ `go test`:

```text
$ cd $HOME/hello/morestrings
$ go test
PASS
ok  	example/user/hello/morestrings 0.165s
$
```

وشغّل `go help test` وانظر توثيق حزمة `testing` لمزيد من التفاصيل.
