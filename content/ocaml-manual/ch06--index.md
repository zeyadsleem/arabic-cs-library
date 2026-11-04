---
title: "تعدّد الأشكال وحدوده"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 6: تعدّد الأشكال وحدوده

يتناول هذا الفصل مسائل أكثر تقدّمًا تتعلّق بحدود الدوال والأنواع متعدّدة الأشكال. فهناك حالات في OCaml قد يكون فيها النوع الذي يستنتجه مدقّق الأنواع أقل عموميةً مما هو متوقّع. وقد ينشأ هذا النقص في العمومية إمّا من التفاعلات بين الآثار الجانبية والتنميط، أو من صعوبات العودية متعدّدة الأشكال الضمنية وتعدّد الأشكال عالي الرتبة.

ويفصّل هذا الفصل كلًّا من هذه الحالات، ويبيّن — حيثما أمكن — كيفية استعادة العمومية.

## 6.1 ضعف تعدّد الأشكال والتحوير

### 6.1.1 الأنواع ضعيفة تعدّد الأشكال

لعلّ أكثر أمثلة النقص في العمومية شيوعًا تنشأ من التفاعلات بين الأنواع متعدّدة الأشكال والتحوير. ويظهر مثال بسيط عند تنميط التعبير التالي:

```ocaml
# let store = ref None ;;

val store : '_weak1 option ref = {contents = None}
```

بما أن نوع `None` هو `'a option` وللدالة `ref` النوع `'b -> 'b ref`، فإن الاستنتاج الطبيعي لنوع `store` سيكون `'a option ref`. غير أنّ النوع المستنتج، `'_weak1 option ref`، مختلف. إنّ متغيّرات النوع التي تبدأ أسماؤها بالسابقة `_weak` مثل `'_weak1` هي متغيّرات نوع ضعيفة التعدّد، ويُختصر اسمها أحيانًا إلى «متغيّرات النوع الضعيفة». ومتغيّر النوع الضعيف هو عنصر نائب عن نوع واحد غير معروف حاليًا. فحين يُعرف النوع المحدّد `t` الكامن وراء النوع النائب `'_weak1`، تُستبدل جميع ورادات `'_weak1` بـ `t`. ويمكننا، مثلًا، تعريف مرجع اختياري آخر وتخزين قيمة من النوع `int` داخله:

```ocaml
# let another_store = ref None ;;

val another_store : '_weak2 option ref = {contents = None}

# another_store := Some 0;
  another_store ;;

- : int option ref = {contents = Some 0}
```

بعد تخزين قيمة من النوع `int` داخل `another_store`، جرى تحديث نوع `another_store` من `'_weak2 option ref` إلى `int option ref`. ويحمي هذا التمييز بين متغيّرات النوع الضعيفة ومتغيّرات النوع العامة برامج OCaml من عدم السلامة وأخطاء وقت التشغيل. ولتفهم من أين قد يأتي عدم السلامة، تأمّل هذه الدالة البسيطة التي تبدّل قيمة `x` بالقيمة المخزّنة داخل مرجع `store`، إن وُجدت:

```ocaml
# let swap store x = match !store with
    | None -> store := Some x; x
    | Some y -> store := Some x; y;;

val swap : 'a option ref -> 'a -> 'a = <fun>
```

يمكننا تطبيق هذه الدالة على مرجعنا:

```ocaml
# let one = swap store 1
  let one_again = swap store 2
  let two = swap store 3;;

val one : int = 1
val one_again : int = 1
val two : int = 2
```

بعد هذه التبديلات الثلاثة تكون القيمة المخزّنة هي `3`. وكل شيء على ما يرام حتى الآن. ثم يمكننا أن نحاول تبديل `3` بقيمة أكثر تشويقًا، ولتكن دالة:

```ocaml
# let error = swap store (fun x -> x);;

Error: This expression should not be a function, the expected type is int
```

عند هذه النقطة يشكو مدقّق الأنواع، عن حقّ، من أنه لا يمكن تبديل عدد صحيح بدالة، وأنّه ينبغي دائمًا مبادلة `int` بـ `int` آخر. وزيادةً على ذلك، يمنعنا مدقّق الأنواع من تغيير نوع القيمة المخزّنة في `store` يدويًا:

```ocaml
# store := Some (fun x -> x);;

Error: This expression should not be a function, the expected type is int
```

وبالفعل، إذا نظرنا إلى نوع `store`، نجد أنّ النوع الضعيف `'_weak1` قد استُبدل بالنوع `int`:

```ocaml
# store;;

- : int option ref = {contents = Some 3}
```

لذلك، بعد وضع `int` في `store`، لا يمكننا استعماله لتخزين أي قيمة غير `int`. وبصفة أعمّ، تحمي الأنواع الضعيفة البرنامج من التحوير غير المشروع للقيم ذات النوع متعدّد الأشكال.

علاوةً على ذلك، لا يمكن أن تظهر الأنواع الضعيفة في توقيع وحدات المستوى الأعلى: إذ يجب أن تكون الأنواع معروفة عند الترجمة. ومن ثَمّ، قد تستبدل وحدات ترجمة مختلفة النوع الضعيف بأنواع مختلفة وغير متوافقة. ولهذا السبب، فإن ترجمة قطعة الشيفرة الصغيرة التالية:

```text
let option_ref = ref None
```

ينتج عنها خطأ في الترجمة:

```text
Error: The type of this expression, '_weak1 option ref,
       contains type variables that cannot be generalized
```

ولحلّ هذا الخطأ يكفي إضافة تعليمة نوع صريحة تحدّد النوع عند التصريح:

```text
let option_ref: int option ref = ref None
```

وهذا في كل الأحوال ممارسة جيدة عند التعامل مع المتغيّرات العامة القابلة للتحوير هذه. فبدون ذلك ستأخذ هذه المتغيّرات نوع أول استعمال لها. وإن وقع خطأ عند هذه النقطة، فقد يفضي ذلك إلى أخطاء تنميط محيّرة حين تُعلَّم الاستعمالات الصحيحة اللاحقة كأخطاء.

### 6.1.2 قيد القيمة

تحديد السياق الدقيق الذي ينبغي أن تُستبدل فيه الأنواع متعدّدة الأشكال بأنواع ضعيفة بطريقة معيارية مسألة صعبة. فالواجب على نظام الأنواع أن يعالج إمكان أن تُخفي الدوال حالات تحويرية دائمة. مثلًا، تستعمل الدالة التالية مرجعًا داخليًا لتطبيق دالة هوية مؤجّلة:

```ocaml
# let make_fake_id () =
    let store = ref None in
    fun x -> swap store x ;;

val make_fake_id : unit -> 'a -> 'a = <fun>

# let fake_id = make_fake_id();;

val fake_id : '_weak3 -> '_weak3 = <fun>
```

سيكون غير سليم تطبيق دالة `fake_id` هذه على قيم ذات أنواع مختلفة. ولذلك تُسند إلى الدالة `fake_id`، عن حقّ، النوع `'_weak3 -> '_weak3` بدلًا من `'a -> 'a`. وفي الوقت ذاته، ينبغي أن يكون ممكنًا استعمال حالة تحويرية محلية دون التأثير في نوع دالة.

وللتغلب على هاتين الصعوبتين المتلازمتين، يعتبر مدقّق الأنواع أنّ أي قيمة تُعيدها دالة قد تعتمد في الخفاء على حالات تحويرية دائمة، وينبغي إعطاؤها نوعًا ضعيفًا. ويُسمّى هذا القيد على نوع القيم القابلة للتحوير وعلى نتائج تطبيق الدوال «قيد القيمة». ولاحظ أنّ قيد القيمة هذا محافظ: فهناك حالات يكون فيها قيد القيمة شديد الحذر فيمنح نوعًا ضعيفًا لقيمة كان يمكن تعميمها بأمان إلى نوع متعدّد الأشكال:

```ocaml
# let not_id = (fun x -> x) (fun x -> x);;

val not_id : '_weak4 -> '_weak4 = <fun>
```

وكثيرًا ما يحدث هذا عند تعريف دوال باستعمال دوال عالية الرتبة. ولتجنّب هذه المشكلة، من الحلول إضافة وسيطة صريحة إلى الدالة:

```ocaml
# let id_again = fun x -> (fun x -> x) (fun x -> x) x;;

val id_again : 'a -> 'a = <fun>
```

وبهذه الوسيطة يرى مدقّق الأنواع في `id_again` تعريفًا لدالة، ومن ثَمّ يمكن تعميمه. ويُسمّى هذا النوع من المعالجة في حساب لامبدا «توسيع إيتا»، ويُشار إليه أحيانًا بهذا الاسم.

### 6.1.3 قيد القيمة المخفَّف

هناك حل جزئي آخر لمشكلة الأنواع الضعيفة غير الضرورية، وهو مطبَّق مباشرةً داخل مدقّق الأنواع. وبإيجاز، يمكن إثبات أنّ الأنواع الضعيفة التي لا تظهر إلا كوسائط نوع في مواضع متغايرة طرديًا — وتُسمّى أيضًا المواضع الموجبة — يمكن تعميمها بأمان إلى أنواع متعدّدة الأشكال. مثلًا، النوع `'a list` متغاير طرديًا في `'a`:

```ocaml
#   let f () = [];;

val f : unit -> 'a list = <fun>

#   let empty = f ();;

val empty : 'a list = []
```

لاحظ أنّ النوع المستنتج لـ `empty` هو `'a list` لا `'_weak5 list` الذي كان ينبغي أن يظهر مع قيد القيمة.

ويُسمّى قيد القيمة مقترنًا بهذا التعميم لوسائط النوع المتغايرة طرديًا «قيد القيمة المخفَّف».

### 6.1.4 التغاير وقيد القيمة

يصف التغاير كيفية سلوك بانيات الأنواع إزاء علاقة النوع الفرعي. تخيّل مثلًا زوجًا من النوعين `x` و`xy` حيث `x` نوع فرعي من `xy`، ويُرمز إلى ذلك بـ `x :> xy`:

```ocaml
#   type x = [ `X ];;

type x = [ `X ]

#   type xy = [ `X | `Y ];;

type xy = [ `X | `Y ]
```

ولأن `x` نوع فرعي من `xy`، يمكننا تحويل قيمة من النوع `x` إلى قيمة من النوع `xy`:

```ocaml
#   let x:x = `X;;

val x : x = `X

#   let x' = ( x :> xy);;

val x' : xy = `X
```

وبالمثل، إذا كانت لدينا قيمة من النوع `x list`، أمكننا تحويلها إلى قيمة من النوع `xy list`، لأنّنا نستطيع تحويل كل عنصر على حدة:

```ocaml
#   let l:x list = [`X; `X];;

val l : x list = [`X; `X]

#   let l' = ( l :> xy list);;

val l' : xy list = [`X; `X]
```

وبعبارة أخرى، `x :> xy` يقتضي `x list :> xy list`، ومن ثَمّ فإنّ باني النوع `'a list` متغاير طرديًا (أي يحفظ علاقة النوع الفرعي) في وسيطه `'a`.

وعلى العكس، إذا كانت لدينا دالة تستطيع معالجة قيم من النوع `xy`:

```ocaml
#   let f: xy -> unit = function
    | `X -> ()
    | `Y -> ();;

val f : xy -> unit = <fun>
```

فإنّها تستطيع أيضًا معالجة قيم من النوع `x`:

```ocaml
#   let f' = (f :> x -> unit);;

val f' : x -> unit = <fun>
```

لاحظ أنّنا نستطيع إعادة كتابة نوعي `f` و`f'` على النحو التالي:

```ocaml
#   type 'a proc = 'a -> unit
    let f' = (f: xy proc :> x proc);;

type 'a proc = 'a -> unit
val f' : x proc = <fun>
```

في هذه الحالة لدينا `x :> xy` يقتضي `xy proc :> x proc`. ولاحظ أنّ علاقة النوع الفرعي الثانية تعكس ترتيب `x` و`xy`: فباني النوع `'a proc` متغاير عكسيًا في وسيطه `'a`. وبصفة أعمّ، فإنّ باني نوع الدالة `'a -> 'b` متغاير طرديًا في نوع عائده `'b` ومتغاير عكسيًا في نوع وسيطه `'a`.

وقد يكون باني النوع ثابتًا (لا متغايرًا ولا متغايرًا عكسيًا) في بعض وسائط نوعه. ومن الأمثلة النمطية على ذلك المرجع:

```ocaml
#   let x: x ref = ref `X;;

val x : x ref = {contents = `X}
```

فلو استطعنا إكراه `x` إلى النوع `xy ref` بوصفه متغيّرًا `xy`، لأمكننا استعمال `xy` لتخزين القيمة `` `Y `` داخل المرجع، ثم استعمال القيمة `x` لقراءة هذا المحتوى بوصفه قيمة من النوع `x`، وهو ما ينقض نظام الأنواع.

وبصفة أعمّ، بمجرّد أن يظهر متغيّر نوع في موضع يصف حالة قابلة للتحوير يصبح ثابتًا. وكنتيجة مساوية، فإنّ المتغيّرات المتغايرة طرديًا لن تدلّ قطّ على مواقع قابلة للتحوير، ومن ثَمّ يمكن تعميمها بأمان. ولمزيد من التوضيح، يمكن للقارئ المهتم أن يرجع إلى المقال الأصلي لجاك غاريغ على [`http://www.math.nagoya-u.ac.jp/~garrigue/papers/morepoly-long.pdf`](http://www.math.nagoya-u.ac.jp/~garrigue/papers/morepoly-long.pdf).

ومعًا، يساعد قيد القيمة المخفَّف وتغاير وسائط النوع على تجنّب توسيع إيتا في حالات كثيرة.

### 6.1.5 الأنواع البيانية المجرّدة

علاوةً على ذلك، حين تكون تعريفات الأنواع مكشوفة، يستطيع مدقّق الأنواع أن يستنتج معلومات التغاير بنفسه، فيستفيد المرء من قيد القيمة المخفَّف حتى دون أن يدري. غير أنّ الأمر لم يعد كذلك عند تعريف أنواع مجرّدة جديدة. وللتوضيح، يمكننا تعريف نوع وحدة `collection` على النحو التالي:

```ocaml
# module type COLLECTION = sig
    type 'a t
    val empty: unit -> 'a t
  end

  module Implementation = struct
    type 'a t = 'a list
    let empty ()= []
  end;;

module type COLLECTION = sig type 'a t val empty : unit -> 'a t end
module Implementation :
  sig type 'a t = 'a list val empty : unit -> 'a list end

# module List2: COLLECTION = Implementation;;

module List2 : COLLECTION
```

في هذه الحالة، عند إكراه الوحدة `List2` إلى نوع الوحدة `COLLECTION`، ينسى مدقّق الأنواع أنّ `'a List2.t` كان متغايرًا طرديًا في `'a`. وبالتالي لم يعد قيد القيمة المخفَّف ينطبق:

```ocaml
#   List2.empty ();;

- : '_weak5 List2.t = <abstr>
```

وللحفاظ على قيد القيمة المخفَّف، نحتاج إلى التصريح بأنّ النوع المجرّد `'a COLLECTION.t` متغاير طرديًا في `'a`:

```ocaml
# module type COLLECTION = sig
    type +'a t
    val empty: unit -> 'a t
  end

  module List2: COLLECTION = Implementation;;

module type COLLECTION = sig type +'a t val empty : unit -> 'a t end
module List2 : COLLECTION
```

حينئذٍ نستعيد تعدّد الأشكال:

```ocaml
#   List2.empty ();;

- : 'a List2.t = <abstr>
```

## 6.2 العودية متعدّدة الأشكال

ترتبط فئة النقص الثانية الكبرى في العمومية ارتباطًا مباشرًا بمشكلة استنتاج الأنواع للدوال متعدّدة الأشكال. ففي بعض الظروف قد لا يكون النوع الذي يستنتجه OCaml عامًّا بما يكفي للسماح بتعريف بعض الدوال العودية، ولا سيّما الدوال العودية التي تعمل على أنواع بيانات جبرية غير منتظمة.

في نوع البيانات الجبري المنتظم متعدّد الأشكال تكون وسائط نوع باني النوع ثابتة داخل تعريف النوع. مثلًا، يمكننا النظر إلى قائمة متداخلة تعسّفيًا معرّفة على النحو التالي:

```ocaml
# type 'a regular_nested = List of 'a list | Nested of 'a regular_nested list;;

type 'a regular_nested = List of 'a list | Nested of 'a regular_nested list

# let l = Nested[ List [1]; Nested [List[2;3]]; Nested[Nested[]] ];;

val l : int regular_nested =
  Nested [List [1]; Nested [List [2; 3]]; Nested [Nested []]]
```

لاحظ أنّ باني النوع `regular_nested` يظهر دائمًا في التعريف السابق بصيغة `'a regular_nested`، بالوسيط نفسه `'a`. وبهذا النوع يمكن حساب العمق بدالة عودية تقليدية:

```ocaml
# let rec regular_depth = function
    | List _ -> 1
    | Nested n -> 1 + List.fold_left max 1 (List.map regular_depth n);;

val regular_depth : 'a regular_nested -> int = <fun>
```

أما أنواع البيانات الجبرية العودية غير المنتظمة فتقابل أنواع البيانات الجبرية متعدّدة الأشكال التي تختلف أنواع وسائطها بين الطرف الأيسر والطرف الأيمن من تعريف النوع. مثلًا، قد يكون من المفيد تعريف نوع بياني يضمن أنّ جميع القوائم متداخلة في العمق نفسه:

```ocaml
# type 'a nested = List of 'a list | Nested of 'a list nested;;

type 'a nested = List of 'a list | Nested of 'a list nested
```

حدسيًا، قيمة من النوع `'a nested` هي قائمة من قوائم … من قوائم عناصر `a`، بعدد `k` من القوائم المتداخلة. ثم يمكننا تكييف الدالة `regular_depth` المعرّفة على `regular_nested` لتصبح دالة `depth` تحسب هذا `k`. وكمحاولة أولى يمكننا تعريف:

```ocaml
# let rec depth = function
    | List _ -> 1
    | Nested n -> 1 + depth n;;

Error: The value n has type 'a list nested
       but an expression was expected of type 'a nested
       The type variable 'a occurs inside 'a list
```

ينشأ خطأ النوع هنا من أنّ مدقّق الأنواع، أثناء تعريف `depth`، يُسند إليه أولًا النوع `'a -> 'b`. وعند تنميط مطابقة الأنماط يصبح `'a -> 'b` هو `'a nested -> 'b`، ثم `'a nested -> int` بعد تنميط فرع `List`. غير أنّ مدقّق الأنواع، عند تنميط التطبيق `depth n` في فرع `Nested`، يواجه مشكلة: فـ `depth n` مطبَّق على `'a list nested`، ومن ثَمّ يجب أن يكون نوعه `'a list nested -> 'b`. وتوحيد هذا القيد مع القيد السابق يفضي إلى القيد المستحيل `'a list nested = 'a nested`. وبعبارة أخرى، تُطبَّق الدالة العودية `depth` داخل تعريفها على قيم من النوع `'a t` بأنواع `'a` مختلفة، بسبب عدم انتظام باني النوع `nested`. وهذا يخلق مشكلة لأنّ مدقّق الأنواع كان قد أدخل متغيّر نوع جديدًا `'a` عند *تعريف* الدالة `depth` فقط، بينما نحتاج هنا إلى متغيّر نوع مختلف لكل *تطبيق* للدالة `depth`.

### 6.2.1 التعليقات متعدّدة الأشكال الصريحة

حلّ هذا الإشكال هو استعمال تعليمة نوع صريحة متعدّدة الأشكال للنوع `'a`:

```ocaml
# let rec depth: 'a. 'a nested -> int = function
    | List _ -> 1
    | Nested n -> 1 + depth n;;

val depth : 'a nested -> int = <fun>

# depth ( Nested(List [ [7]; [8] ]) );;

- : int = 2
```

في نوع `depth`، أي `'a.'a nested -> int`، يكون متغيّر النوع `'a` مكمَّمًا كليًا. وبعبارة أخرى، تُقرأ `'a.'a nested -> int` كما يلي: «لكل نوع `'a`، تربط `depth` قيم `'a nested` بأعداد صحيحة». أما النوع القياسي `'a nested -> int` فيمكن تفسيره كما يلي: «ليكن `'a` متغيّر نوع، عندئذٍ تربط `depth` قيم `'a nested` بأعداد صحيحة». وهناك فرقان كبيران بين تعبيري النوع هذين. أولًا، تشير التعليمة الصريحة متعدّدة الأشكال إلى مدقّق الأنواع بأنّه يحتاج إلى إدخال متغيّر نوع جديد في كل مرة تُطبَّق فيها الدالة `depth`. وهذا يحلّ مشكلتنا مع تعريف الدالة `depth`.

ثانيًا، تُعلم هذه التعليمة مدقّق الأنواع أيضًا بأنّ نوع الدالة ينبغي أن يكون متعدّد الأشكال. فبدون تعليمة نوع صريحة متعدّدة الأشكال، تكون تعليمة النوع التالية صحيحة تمامًا:

```ocaml
# let sum: 'a -> 'b -> 'c = fun x y -> x + y;;

val sum : int -> int -> int = <fun>
```

لأنّ `'a` و`'b` و`'c` تدلّ على متغيّرات نوع قد تكون متعدّدة الأشكال أو لا تكون. بينما يكون توحيد نوع صريح متعدّد الأشكال مع نوع غير متعدّد الأشكال خطأً:

```ocaml
# let sum: 'a 'b 'c. 'a -> 'b -> 'c = fun x y -> x + y;;

Error: This definition has type int -> int -> int which is less general than
         'a 'b 'c. 'a -> 'b -> 'c
       The type int is not a type variable.
       The type int is not a type variable.
       The type int is not a type variable.
```

ومن الملاحظات المهمة هنا أنّه لا حاجة إلى التصريح الكامل بنوع `depth`: يكفي إضافة تعليقات لمتغيّرات النوع المكمَّمة كليًا فقط:

```ocaml
# let rec depth: 'a. 'a nested -> _ = function
    | List _ -> 1
    | Nested n -> 1 + depth n;;

val depth : 'a nested -> int = <fun>

# depth ( Nested(List [ [7]; [8] ]) );;

- : int = 2
```

### 6.2.2 أمثلة أخرى

بالتعليقات الصريحة متعدّدة الأشكال يصبح ممكنًا تطبيق أي دالة عودية تعتمد على بنية القوائم المتداخلة وحدها لا على نوع العناصر. ومن الأمثلة الأكثر تعقيدًا حساب العدد الإجمالي لعناصر القوائم المتداخلة:

```ocaml
#   let len nested =
      let map_and_sum f = List.fold_left (fun acc x -> acc + f x) 0 in
      let rec len: 'a. ('a list -> int ) -> 'a nested -> int =
      fun nested_len n ->
        match n with
        | List l -> nested_len l
        | Nested n -> len (map_and_sum nested_len) n
      in
    len List.length nested;;

val len : 'a nested -> int = <fun>

# len (Nested(Nested(List [ [ [1;2]; [3] ]; [ []; [4]; [5;6;7]]; [[]] ])));;

- : int = 7
```

وبالمثل، قد يلزم استعمال أكثر من متغيّر نوع صريح متعدّد الأشكال، كما في حساب قائمة أطوال القوائم المتداخلة للقائمة المتداخلة:

```ocaml
# let shape n =
    let rec shape: 'a 'b. ('a nested -> int nested) ->
      ('b list list -> 'a list) -> 'b nested -> int nested
      = fun nest nested_shape ->
        function
        | List l -> raise
         (Invalid_argument "shape requires nested_list of depth greater than 1")
        | Nested (List l) -> nest @@ List (nested_shape l)
        | Nested n ->
          let nested_shape = List.map nested_shape in
          let nest x = nest (Nested x) in
          shape nest nested_shape n in
    shape (fun n -> n ) (fun l -> List.map List.length l ) n;;

val shape : 'a nested -> int nested = <fun>

# shape (Nested(Nested(List [ [ [1;2]; [3] ]; [ []; [4]; [5;6;7]]; [[]] ])));;

- : int nested = Nested (List [[2; 1]; [0; 1; 3]; [0]])
```

## 6.3 الدوال متعدّدة الأشكال عالية الرتبة

غير أنّ التعليقات الصريحة متعدّدة الأشكال لا تكفي لتغطية جميع الحالات التي يكون فيها النوع المستنتج لدالة أقل عموميةً مما هو متوقّع. وتنشأ مشكلة مماثلة عند استعمال دوال متعدّدة الأشكال كوسائط لدوال عالية الرتبة. مثلًا، قد نريد حساب متوسط العمق أو الطول لقائمتين متداخلتين:

```ocaml
#   let average_depth x y = (depth x + depth y) / 2;;

val average_depth : 'a nested -> 'b nested -> int = <fun>

#   let average_len x y = (len x + len y) / 2;;

val average_len : 'a nested -> 'b nested -> int = <fun>

#   let one = average_len (List [2]) (List [[]]);;

val one : int = 1
```

سيكون من الطبيعي تجميع هذين التعريفين على النحو التالي:

```ocaml
#     let average f x y = (f x + f y) / 2;;

val average : ('a -> int) -> 'a -> 'a -> int = <fun>
```

غير أنّ نوع `average len` أقل عموميةً من نوع `average_len`، لأنّه يشترط أن يكون نوع الوسيط الأول والثاني واحدًا:

```ocaml
#   average_len (List [2]) (List [[]]);;

- : int = 1

#   average len (List [2]) (List [[]]);;

Error: This expression should not be a list literal, the expected type is int
```

وكما كان الحال سابقًا مع العودية متعدّدة الأشكال، تنشأ المشكلة من أنّ متغيّرات النوع لا تُدخل إلا في بداية تعريفات `let`. فحين نحسب `f x` و`f y` معًا، يُوحَّد نوعا `x` و`y`. ولتجنّب هذا التوحيد، نحتاج إلى إعلام مدقّق الأنواع بأنّ `f` متعدّدة الأشكال في وسيطها الأول. وبمعنى ما، نريد أن يكون نوع `average` كما يلي:

```text
val average: ('a. 'a nested -> int) -> 'a nested -> 'b nested -> int
```

لاحظ أنّ هذه الصيغة غير صحيحة داخل OCaml: فـ `average` لها نوع مكمَّم كليًا `'a` داخل نوع إحدى وسائطها، بينما في العودية متعدّدة الأشكال كان النوع المكمَّم كليًا يُدخل قبل بقية النوع. وهذا الموضع للنوع المكمَّم كليًا يعني أنّ `average` دالة متعدّدة الأشكال من الرتبة الثانية. وهذا النوع من الدوال عالية الرتبة غير مدعوم مباشرةً في OCaml: إذ إنّ استنتاج الأنواع للدوال متعدّدة الأشكال من الرتبة الثانية وما فوقها غير قابل للتقرير؛ ومن ثَمّ فإنّ استعمال هذا النوع من الدوال عالية الرتبة يستلزم معالجة هذه الأنواع المكمَّمة كليًا يدويًا.

وفي OCaml، هناك طريقتان لإدخال هذا النوع من الأنواع المكمَّمة كليًا الصريحة: حقول السجلات المكمَّمة كليًا،

```ocaml
#   type 'a nested_reduction = { f:'elt. 'elt nested -> 'a };;

type 'a nested_reduction = { f : 'elt. 'elt nested -> 'a; }

#   let boxed_len = { f = len };;

val boxed_len : int nested_reduction = {f = <fun>}
```

ودوال الكائنات المكمَّمة كليًا:

```ocaml
#   let obj_len = object method f:'a. 'a nested -> 'b = len end;;

val obj_len : < f : 'a. 'a nested -> int > = <obj>
```

ولحلّ مشكلتنا يمكننا بالتالي استعمال حلّ السجل:

```ocaml
#   let average nsm x y = (nsm.f x + nsm.f y) / 2 ;;

val average : int nested_reduction -> 'a nested -> 'b nested -> int = <fun>
```

أو حلّ الكائن:

```ocaml
#   let average (obj:<f:'a. 'a nested -> _ > ) x y = (obj#f x + obj#f y) / 2 ;;

val average : < f : 'a. 'a nested -> int > -> 'b nested -> 'c nested -> int =
  <fun>
```
