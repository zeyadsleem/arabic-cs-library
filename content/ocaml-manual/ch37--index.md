---
title: "المكتبات المُزالة أو المنقولة حديثًا (Graphics وBigarray وNum وLablTk)"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 37: المكتبات المُزالة أو المنقولة حديثًا (Graphics وBigarray وNum وLablTk)

يصف هذا الفصل ثلاث مكتبات كانت في السابق جزءًا من توزيعة OCaml (Graphics وNum وLablTk)، ومكتبة أصبحت الآن جزءًا من المكتبة القياسية لـ OCaml وتُوثَّق فيها (Bigarray).

## 37.1 مكتبة Graphics

منذ OCaml 4.09، تُوزَّع مكتبة `graphics` على هيئة حزمة خارجية. وموطنها الجديد هو:

[`https://github.com/ocaml/graphics`](https://github.com/ocaml/graphics)

وإذا كنت تستعمل مدير الحزم opam، فينبغي أن تثبّت حزمة `graphics` المقابلة:

```text
        opam install graphics
```

وقبل OCaml 4.09، كانت هذه الحزمة تكفل فقط أن مكتبة `graphics` مثبَّتة مع المترجم؛ أما بدءًا من OCaml 4.09 فإن هذه الحزمة توفّر مكتبة `graphics` فعليًا.

## 37.2 مكتبة Bigarray

بدءًا من OCaml 4.07، أُدمجت مكتبة `bigarray` في المكتبة القياسية لـ OCaml.

ويمكن الآن العثور على وظائف `bigarray` في وحدة `Bigarray` من المكتبة القياسية، باستثناء الدالة `map_file` التي أصبحت الآن جزءًا من مكتبة Unix. وقد أُدمج التوثيق في توثيق المكتبة القياسية.

أما مكتبة `bigarray` القديمة المرفقة بالمترجم فهي مكتبة توافق لها الواجهة نفسها تمامًا كما كانت من قبل، أي بما فيها `map_file`.

ونوصي بشدّة بأن تنقل شيفرتك لتستعمل نسخة المكتبة القياسية بدلًا من ذلك، لأن التغييرات المطلوبة ضئيلة.

وإذا اخترت استعمال مكتبة التوافق، فيجب أن تربط برامجك على النحو التالي:

```text
        ocamlc other options bigarray.cma other files
        ocamlopt other options bigarray.cmxa other files
```

ولااستعمال مكتبة التوافق `bigarray` استعمالًا تفاعليًا، افعل ما يلي:

```text
        ocamlmktop -o mytop bigarray.cma
        ./mytop
```

أو (إذا كان الربط الدينامي لمكتبات C مدعومًا على منصّتك) ابدأ `ocaml` واكتب `#load "bigarray.cma";;`.

## 37.3 مكتبة Num

تنفّذ مكتبة `num` حساب الأعداد الصحيحة وحساب الأعداد الكسرية بدقّة اعتباطية. وقد فُصلت عن التوزيعة الأساسية لـ OCaml بدءًا من الإصدار 4.06.0، ويمكن الآن العثور عليها في [`https://github.com/ocaml/num`](https://github.com/ocaml/num).

وينبغي للتطبيقات الجديدة التي تحتاج إلى حساب بدقّة اعتباطية أن تستعمل مكتبة `Zarith` ([`https://github.com/ocaml/Zarith`](https://github.com/ocaml/Zarith)) بدلًا من مكتبة `Num`، ويُشجَّع التطبيقات القديمة التي تستعمل `Num` بالفعل على الانتقال إلى `Zarith`. فمكتبة `Zarith` توفّر أداءً أفضل بكثير من `Num` ولها واجهة برمجية أجمل.

## 37.4 مكتبة Labltk وOCamlBrowser

منذ الإصدار 4.02 من OCaml، تُوزَّع أداة OCamlBrowser ومكتبة Labltk منفصلتين عن مترجم OCaml. ويُستضاف المشروع الآن في [`https://github.com/garrigue/labltk`](https://github.com/garrigue/labltk).
