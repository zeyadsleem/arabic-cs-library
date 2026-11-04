---
title: "مكتبة runtime_events"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 34: مكتبة runtime_events

توفّر مكتبة `runtime_events` واجهة برمجية لاستهلاك معلومات تتبّع زمن التشغيل ومقاييسه. انظر الفصل 26 لمزيد من المعلومات.

ويجب ربط البرامج التي تستعمل runtime_events على النحو التالي:

```text
        ocamlc -I +runtime_events other options unix.cma runtime_events.cma other files
        ocamlopt -I +runtime_events other options unix.cmxa runtime_events.cmxa other files
```

ويجب أيضًا ترجمة وحدات الترجمة التي تستعمل مكتبة runtime_events بالخيار `-I +runtime_events` (انظر الفصل 13).

- الوحدة `Runtime_events`: نظام التتبّع
