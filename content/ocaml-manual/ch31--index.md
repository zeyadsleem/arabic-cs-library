---
title: "واجهة المترجم الأمامية"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 31: واجهة المترجم الأمامية

يصف هذا الفصل الواجهة الأمامية لـ OCaml، وهي تصرّح بشجرة التركيب المجرّد التي يستعملها المترجم، وتوفّر وسيلة لتحليل شيفرة OCaml وطباعتها وطباعتها طباعةً جميلة، وتتيح في النهاية كتابة معالجات سابقة لشجرة التركيب المجرّد تُستدعى بالخيار `-ppx` (انظر الفصلين 13 و16).

ومن المهم ملاحظة أن واجهة الواجهة الأمامية المصدَّرة تتبع تطوّر لغة OCaml وتنفيذها، ولذلك فهي لا تقدّم **أي** ضمانات للتوافق مع الإصدارات السابقة.

والواجهة الأمامية جزء من مكتبة `compiler-libs`. وينبغي بناء البرامج التي تستعمل مكتبة `compiler-libs` على النحو التالي:

```text
        ocamlfind ocamlc other options -package compiler-libs.common other files
        ocamlfind ocamlopt other options -package compiler-libs.common other files
```

ويُنصَح باستعمال الأداة `ocamlfind`. أما إذا لم يكن ذلك ممكنًا، فيمكن استعمال طريقة بديلة:

```text
        ocamlc other options -I +compiler-libs ocamlcommon.cma other files
        ocamlopt other options -I +compiler-libs ocamlcommon.cmxa other files
```

وللاستعمال التفاعلي لمكتبة `compiler-libs`، ابدأ `ocaml` واكتب `#load "compiler-libs/ocamlcommon.cma";;`.

- الوحدة `Ast_helper`: دوال مساعدة لبناء شجرة التركيب المجرّد

- الوحدة `Ast_mapper`: واجهة مُعاد الكتابة `-ppx`

- الوحدة `Asttypes`: أنواع مساعدة تستعملها `Parsetree`

- الوحدة `Location`: مواضع الشيفرة المصدرية

- الوحدة `Longident`: المعرّفات الطويلة

- الوحدة `Parse`: تحليل صياغة OCaml

- الوحدة `Parsetree`: شجرة صياغة OCaml

- الوحدة `Pprintast`: طباعة صياغة OCaml
