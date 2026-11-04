---
title: "مكتبة str: التعابير النمطية ومعالجة السلاسل"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 33: مكتبة str: التعابير النمطية ومعالجة السلاسل

توفّر مكتبة `str` دوال عالية المستوى لمعالجة السلاسل، بعضها قائم على التعابير النمطية. والغرض منها دعم نوع معالجة الملفات الذي يُجرى عادةً بلغات البرمجة النصية مثل `awk` أو `perl` أو `sed`.

ويجب ربط البرامج التي تستعمل مكتبة `str` على النحو التالي:

```text
        ocamlc other options -I +str str.cma other files
        ocamlopt other options  -I +str str.cmxa other files
```

ولااستعمال مكتبة `str` استعمالًا تفاعليًا، افعل ما يلي:

```text
        ocamlmktop -o mytop str.cma
        ./mytop
```

أو (إذا كان الربط الدينامي لمكتبات C مدعومًا على منصّتك) ابدأ `ocaml` واكتب

```ocaml
# #directory "+str";;

# #load  "str.cma";;
```

- الوحدة `Str`: التعابير النمطية ومعالجة السلاسل
