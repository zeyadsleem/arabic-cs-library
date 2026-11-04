---
title: "اللغة الأساسية"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 1: اللغة الأساسية

هذا الجزء من الدليل مقدّمة تعليمية إلى لغة OCaml. نفترض فيه إلمامًا جيدًا بالبرمجة بلغة تقليدية (كـ C أو Java مثلًا)، لكن لا نطلب أي خبرة سابقة بلغات البرمجة الوظيفية. يعرّفنا هذا الفصل باللغة الأساسية، ويعالج الفصل 2 نظام الوحدات، والفصل 3 الميزات الكائنية، والفصل 4 الوسائط المُعنونة، والفصل 5 المتغيّرات متعدّدة الأشكال، والفصل 6 حدود تعدّد الأشكال، ويقدّم الفصل 8 بعض الأمثلة المتقدّمة.

## 1.1 الأساسيات

نستعمل في هذه النظرة العامة إلى OCaml النظام التفاعلي، الذي يُشغَّل بتنفيذ `ocaml` من صدفة Unix أو من موجّه أوامر Windows. ويُعرض هذا الدرس على هيئة نسخة حرفية من جلسة مع النظام التفاعلي: الأسطر التي تبدأ بـ `#` تمثّل ما يدخله المستخدم، وردود النظام تُطبع تحتها دون علامة `#` بادئة.

يكتب المستخدم في النظام التفاعلي عبارات OCaml منتهية بـ `;;` استجابةً لمحثّ `#`، فيترجمها النظام فورًا وينفّذها ويطبع ناتج التقييم. والعبارات إمّا تعابير بسيطة، وإمّا تعريفات `let` لمعرّفات (قيمًا كانت أو دوالًّا).

```ocaml
# 1 + 2 * 3;;

- : int = 7

# let pi = 4.0 *. atan 1.0;;

val pi : float = 3.14159265358979312

# let square x = x *. x;;

val square : float -> float = <fun>

# square (sin pi) +. square (cos pi);;

- : float = 1.
```

يحسب نظام OCaml القيمة والنوع معًا لكل عبارة. ولا تحتاج وسائط الدوال نفسها إلى تصريح صريح بأنواعها: إذ يستنتج النظام أنواعها من طريقة استعمالها داخل الدالة. ولاحظ أيضًا أنّ الأعداد الصحيحة وأعداد الفاصلة العائمة نوعان مختلفان لهما معاملات مختلفة: فالمعاملان `+` و`*` يعملان على الأعداد الصحيحة، بينما يعمل `+.` و`*.` على أعداد الفاصلة العائمة.

```ocaml
# 1.0 * 2;;

Error: The constant 1.0 has type float but an expression was expected of type
         int
```

وتُعرَّف الدوال التعاودية بالربط `let rec`:

```ocaml
# let rec fib n =
    if n < 2 then n else fib (n - 1) + fib (n - 2);;

val fib : int -> int = <fun>

# fib 10;;

- : int = 55
```

## 1.2 أنواع البيانات

إلى جانب الأعداد الصحيحة وأعداد الفاصلة العائمة، يوفّر OCaml أنواع البيانات الأساسية المعتادة:

- القيم المنطقية

```ocaml
# (1 < 2) = false;;

- : bool = false

# let one = if true then 1 else 2;;

val one : int = 1
```

- المحارف

```ocaml
#  'a';;

- : char = 'a'

#  int_of_char '\n';;

- : int = 10
```

- سلاسل المحارف غير القابلة للتعديل

```ocaml
# "Hello" ^ " " ^ "world";;

- : string = "Hello world"

# {|This is a quoted string, here, neither \ nor " are special characters|};;

- : string =
"This is a quoted string, here, neither \\ nor \" are special characters"

# {|"\\"|}="\"\\\\\"";;

- : bool = true

#   {delimiter|the end of this|}quoted string is here|delimiter}
  =           "the end of this|}quoted string is here";;

- : bool = true
```

تشمل بنى البيانات المعرَّفة مسبقًا الأزواج والمصفوفات والقوائم. وهناك أيضًا آليات عامة لتعريف بنى بياناتك الخاصة، كالسجلات والمتغيّرات، وسنغطّيها بمزيد من التفصيل لاحقًا؛ أمّا الآن فنركّز على القوائم. تُعطى القوائم إمّا بالامتداد كقائمة محصورة بين قوسين من عناصر يفصل بينها فاصلة منقوطة، وإمّا تُبنى من القائمة الفارغة `[]` (وتُلفظ «nil») بإضافة عناصر إلى مقدّمتها باستعمال المعامل `::` (ويُلفظ «cons»).

```ocaml
# let l = ["is"; "a"; "tale"; "told"; "etc."];;

val l : string list = ["is"; "a"; "tale"; "told"; "etc."]

# "Life" :: l;;

- : string list = ["Life"; "is"; "a"; "tale"; "told"; "etc."]
```

وكما هي الحال مع سائر بنى بيانات OCaml، لا تحتاج القوائم إلى تخصيص صريح في الذاكرة ولا إلى تحرير منها: فإدارة الذاكرة كلها تلقائية تمامًا في OCaml. وبالمثل، لا يوجد تعامل صريح مع المؤشّرات: بل يُدخل مترجم OCaml المؤشّرات ضمنًا حيثما لزم الأمر.

وكما هي الحال مع معظم بنى بيانات OCaml، يتم فحص القوائم وتفكيكها بمطابقة الأنماط. وأنماط القوائم تتّخذ الشكل نفسه تمامًا الذي تتّخذه تعابير القوائم، مع معرّفات تمثّل الأجزاء غير المحدّدة من القائمة. ومثالًا على ذلك، هذا فرز بالإدراج على قائمة:

```ocaml
# let rec sort lst =
    match lst with
      [] -> []
    | head :: tail -> insert head (sort tail)
  and insert elt lst =
    match lst with
      [] -> [elt]
    | head :: tail -> if elt <= head then elt :: lst else head :: insert elt tail
  ;;

val sort : 'a list -> 'a list = <fun>
val insert : 'a -> 'a list -> 'a list = <fun>

# sort l;;

- : string list = ["a"; "etc."; "is"; "tale"; "told"]
```

النوع المستنتج لـ `sort`، وهو `'a list -> 'a list`، يعني أنّ `sort` يمكن أن تُطبَّق فعليًا على قوائم من أي نوع، وأنها تُعيد قائمة من النوع نفسه. والنوع `'a` هو *متغيّر نوع*، ويدلّ على أي نوع كان. وسبب قدرة `sort` على العمل على قوائم من أي نوع هو أنّ المقارنات (`=`، `<=`، وما إليهما) *متعدّدة الأشكال* في OCaml: فهي تعمل بين أي قيمتين من النوع نفسه. وهذا ما يجعل `sort` نفسها متعدّدة الأشكال على جميع أنواع القوائم.

```ocaml
# sort [6; 2; 5; 3];;

- : int list = [2; 3; 5; 6]

# sort [3.14; 2.718];;

- : float list = [2.718; 3.14]
```

لا تعدّل دالة `sort` أعلاه قائمة الإدخال، بل تبني وتُعيد قائمة جديدة تحوي العناصر نفسها التي في قائمة الإدخال مرتّبة تصاعديًا. وفي الحقيقة لا سبيل في OCaml إلى تعديل قائمة في مكانها بعد بنائها: فنقول إنّ القوائم بنى بيانات *غير قابلة للتعديل*. ومعظم بنى بيانات OCaml غير قابلة للتعديل، لكن قلّة منها (أبرزها المصفوفات) *قابلة للتعديل*، أي يمكن تعديلها في مكانها في أي وقت.

صيغة OCaml لنوع دالة ذات وسائط متعدّدة هي `arg1_type -> arg2_type -> ... -> return_type`. فمثلًا، النوع المستنتج لـ `insert`، وهو `'a -> 'a list -> 'a list`، يعني أنّ `insert` تأخذ وسيطين: عنصرًا من أي نوع `'a`، وقائمة عناصرها من النوع نفسه `'a`، وتُعيد قائمة من النوع نفسه.

## 1.3 الدوال كقيم

OCaml لغة وظيفية: فهي تدعم الدوال بالمعنى الرياضي الكامل، ويمكن تمريرها بحرّية كما تُمرَّر أي قطعة بيانات أخرى. فمثلًا، هذه دالة `deriv` تأخذ أي دالة على أعداد الفاصلة العائمة وسيطًا، وتُعيد تقريبًا لدالتها المشتقّة:

```ocaml
# let deriv f dx = fun x -> (f (x +. dx) -. f x) /. dx;;

val deriv : (float -> float) -> float -> float -> float = <fun>

# let sin' = deriv sin 1e-6;;

val sin' : float -> float = <fun>

# sin' pi;;

- : float = -1.00000000013961143
```

بل إنّ تركيب الدوال نفسه قابل للتعريف:

```ocaml
# let compose f g = fun x -> f (g x);;

val compose : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b = <fun>

# let cos2 = compose square cos;;

val cos2 : float -> float = <fun>
```

تُسمّى الدوال التي تأخذ دوالًّا أخرى وسائط «دوالًا وظيفية» أو «دوالًا عالية الرتبة». وهي مفيدة بوجه خاص لتوفير مكرّرات أو عمليات عامة مماثلة على بنية بيانات. فمثلًا، توفّر مكتبة OCaml القياسية الدالة الوظيفية `List.map` التي تطبّق دالة معيّنة على كل عنصر من عناصر قائمة، وتُعيد قائمة النتائج:

```ocaml
# List.map (fun n -> n * 2 + 1) [0;1;2;3;4];;

- : int list = [1; 3; 5; 7; 9]
```

هذه الدالة الوظيفية، ومعها عدد من الدوال الوظيفية الأخرى على القوائم والمصفوفات، معرَّفة مسبقًا لأنها كثيرة الاستعمال، لكن ليس فيها شيء سحري: فيمكن تعريفها بسهولة كما يأتي.

```ocaml
# let rec map f l =
    match l with
      [] -> []
    | hd :: tl -> f hd :: map f tl;;

val map : ('a -> 'b) -> 'a list -> 'b list = <fun>
```

## 1.4 السجلات والمتغيّرات

تشمل بنى البيانات المعرَّفة من المستخدم السجلات والمتغيّرات، وكلتاهما تُعرَّف بالتصريح `type`. وهنا نصرّح بنوع سجل لتمثيل الأعداد النسبية.

```ocaml
# type ratio = {num: int; denom: int};;

type ratio = { num : int; denom : int; }

# let add_ratio r1 r2 =
    {num = r1.num * r2.denom + r2.num * r1.denom;
     denom = r1.denom * r2.denom};;

val add_ratio : ratio -> ratio -> ratio = <fun>

# add_ratio {num=1; denom=3} {num=2; denom=5};;

- : ratio = {num = 11; denom = 15}
```

ويمكن أيضًا الوصول إلى حقول السجل عبر مطابقة الأنماط:

```ocaml
# let integer_part r =
    match r with
      {num=num; denom=denom} -> num / denom;;

val integer_part : ratio -> int = <fun>
```

ولأنّ مطابقة الأنماط هذه لا تحوي إلا حالة واحدة، فمن الآمن تفكيك الوسيط `r` مباشرةً في نمط سجل:

```ocaml
# let integer_part {num=num; denom=denom} = num / denom;;

val integer_part : ratio -> int = <fun>
```

ويمكن إغفال الحقول غير اللازمة:

```ocaml
# let get_denom {denom=denom} = denom;;

val get_denom : ratio -> int = <fun>
```

ويمكن، اختياريًا، جعل الحقول الناقصة صريحة بإنهاء قائمة الحقول بمحرف بدل `_` في آخرها:

```ocaml
# let get_num {num=num; _ } = num;;

val get_num : ratio -> int = <fun>
```

وعندما يكون طرفا علامة `=` متماثلين، يمكن تجنّب تكرار اسم الحقل بحذف جزء `=field`:

```ocaml
# let integer_part {num; denom} = num / denom;;

val integer_part : ratio -> int = <fun>
```

وتعمل هذه الصيغة المختصرة للحقول أيضًا عند بناء السجلات:

```ocaml
# let ratio num denom = {num; denom};;

val ratio : int -> int -> ratio = <fun>
```

وأخيرًا، يمكن تحديث بضعة حقول من سجل دفعةً واحدة:

```ocaml
# let integer_product integer ratio = { ratio with num = integer * ratio.num };;

val integer_product : int -> ratio -> ratio = <fun>
```

وبهذه الصيغة الوظيفية للتحديث، يُنسخ السجل الواقع على يسار `with` باستثناء الحقول الواقعة على يمينها، فهي التي تُحدَّث.

يُدرج تصريح النوع المتغيّر جميع الصور الممكنة لقيم ذلك النوع. وتُعرَّف كل حالة باسم يُسمّى بانيًا، وهو يخدم في بناء قيم النوع المتغيّر وفي فحصها بمطابقة الأنماط معًا. وتبدأ أسماء البانين بحرف كبير لتمييزها من أسماء المتغيّرات (التي يجب أن تبدأ بحرف صغير). فمثلًا، هذا نوع متغيّر لإجراء حساب مختلط (أعداد صحيحة وأعداد فاصلة عائمة):

```ocaml
# type number = Int of int | Float of float | Error;;

type number = Int of int | Float of float | Error
```

يعبّر هذا التصريح عن أنّ قيمة من النوع `number` إمّا عدد صحيح، وإمّا عدد بفاصلة عائمة، وإمّا الثابت `Error` الذي يمثّل نتيجة عملية غير صحيحة (كالقسمة على صفر مثلًا).

والأنواع التعدادية حالة خاصة من الأنواع المتغيّرة، تكون فيها جميع البدائل ثوابت:

```ocaml
# type sign = Positive | Negative;;

type sign = Positive | Negative

# let sign_int n = if n >= 0 then Positive else Negative;;

val sign_int : int -> sign = <fun>
```

ولتعريف عمليات حسابية للنوع `number`، نستعمل مطابقة الأنماط على العددين المعنيّين:

```ocaml
# let add_num n1 n2 =
    match (n1, n2) with
      (Int i1, Int i2) ->
        (* Check for overflow of integer addition *)
        if sign_int i1 = sign_int i2 && sign_int (i1 + i2) <> sign_int i1
        then Float(float i1 +. float i2)
        else Int(i1 + i2)
    | (Int i1, Float f2) -> Float(float i1 +. f2)
    | (Float f1, Int i2) -> Float(f1 +. float i2)
    | (Float f1, Float f2) -> Float(f1 +. f2)
    | (Error, _) -> Error
    | (_, Error) -> Error;;

val add_num : number -> number -> number = <fun>

# add_num (Int 123) (Float 3.14159);;

- : number = Float 126.14159
```

وثمّة مثال آخر مثير للاهتمام على النوع المتغيّر، وهو النوع المدمج `'a option` الذي يمثّل إمّا قيمة من النوع `'a` وإمّا غياب قيمة:

```ocaml
# type 'a option = Some of 'a | None;;

type 'a option = Some of 'a | None
```

وهذا النوع نافع بوجه خاص عند تعريف دالة قد تفشل في حالات شائعة، مثلًا

```ocaml
# let safe_square_root x = if x >= 0. then Some(sqrt x) else None;;

val safe_square_root : float -> float option = <fun>
```

وأكثر استعمالات الأنواع المتغيّرة شيوعًا وصف بنى بيانات تعاودية. خُذ مثلًا نوع الأشجار الثنائية:

```ocaml
# type 'a btree = Empty | Node of 'a * 'a btree * 'a btree;;

type 'a btree = Empty | Node of 'a * 'a btree * 'a btree
```

يُقرأ هذا التعريف كما يأتي: الشجرة الثنائية التي تحوي قيمًا من النوع `'a` (أي نوع كان) إمّا فارغة، وإمّا عقدة تحوي قيمة واحدة من النوع `'a` وشجرتين فرعيتين تحويان أيضًا قيمًا من النوع `'a`، أي شجرتين من النوع `'a btree`.

وتُعبَّر العمليات على الأشجار الثنائية طبيعيًا بدوال تعاودية تتبع البنية نفسها التي يتبعها تعريف النوع. فمثلًا، هذه دوال تنفّذ البحث والإدراج في أشجار ثنائية مرتّبة (تتزايد العناصر من اليسار إلى اليمين):

```ocaml
# let rec member x btree =
    match btree with
      Empty -> false
    | Node(y, left, right) ->
        if x = y then true else
        if x < y then member x left else member x right;;

val member : 'a -> 'a btree -> bool = <fun>

# let rec insert x btree =
    match btree with
      Empty -> Node(x, Empty, Empty)
    | Node(y, left, right) ->
        if x <= y then Node(y, insert x left, right)
                  else Node(y, left, insert x right);;

val insert : 'a -> 'a btree -> 'a btree = <fun>
```

### 1.4.1 إزالة الالتباس بين السجلات والمتغيّرات

(يمكن تجاوز هذا القسم الفرعي في القراءة الأولى)

ربما تساءل القارئ الفطن عمّا يحدث عندما يشترك حقلان من حقول السجل أو بانيان أو أكثر في الاسم نفسه

```ocaml
# type first_record  = { x:int; y:int; z:int }
  type middle_record = { x:int; z:int }
  type last_record   = { x:int };;

# type first_variant = A | B | C
  type last_variant  = A;;
```

والجواب أنّ OCaml، عند مواجهة خيارات متعدّدة، يحاول استعمال المعلومات المتاحة محليًا لرفع الالتباس بين الحقول والبانين المختلفة. فأولًا، إذا كان نوع السجل أو النوع المتغيّر معروفًا، استطاع OCaml اختيار الحقل أو الباني المقابل دون لبس. مثلًا:

```ocaml
# let look_at_x_then_z (r:first_record) =
    let x = r.x in
    x + r.z;;

val look_at_x_then_z : first_record -> int = <fun>

# let permute (x:first_variant) = match x with
    | A -> (B:first_variant)
    | B -> A
    | C -> C;;

val permute : first_variant -> first_variant = <fun>

# type wrapped = First of first_record
  let f (First r) = r, r.x;;

type wrapped = First of first_record
val f : wrapped -> first_record * int = <fun>
```

في المثال الأول، التعليق النوعي `(r:first_record)` تصريح صريح يخبر OCaml بأنّ نوع `r` هو `first_record`. وبهذا التصريح يعرف OCaml أنّ `r.x` يشير إلى الحقل `x` من نوع السجل الأول. وبالمثل، يوضّح التعليق النوعي في المثال الثاني لـ OCaml أنّ البانين `A` و`B` و`C` من النوع المتغيّر الأول. وعلى العكس، استنتج OCaml في المثال الأخير بنفسه أنّ نوع `r` لا يمكن أن يكون إلا `first_record`، فلا حاجة إلى تعليقات نوعية صريحة.

وهذه التعليقات النوعية الصريحة يمكن استعمالها في الواقع في أي موضع. وهي غير لازمة في معظم الأحيان، لكنها نافعة لتوجيه رفع الالتباس، أو لتنقيح أخطاء نوعية غير متوقّعة، أو للاقتران ببعض ميزات OCaml الأكثر تقدمًا التي تُوصف في فصول لاحقة.

ثانيًا، يمكن OCaml في السجلات أن يستنتج نوع السجل الصحيح أيضًا بالنظر إلى مجموعة الحقول كاملةً المستعملة في تعبير أو نمط:

```ocaml
# let project_and_rotate {x; y; _} = { x= - y; y = x; z = 0} ;;

val project_and_rotate : first_record -> first_record = <fun>
```

ولأنّ الحقلين `x` و`y` لا يظهران معًا إلا في نوع السجل الأول، يستنتج OCaml أنّ نوع `project_and_rotate` هو `first_record -> first_record`.

وكملاذ أخير، إذا لم تتوفّر معلومات كافية لرفع الالتباس بين حقول أو بانين مختلفين، يختار OCaml آخر نوع معرَّف من بين جميع الخيارات الصحيحة محليًا:

```ocaml
# let look_at_xz {x; z} = x;;

val look_at_xz : middle_record -> int = <fun>
```

هنا استنتج OCaml أنّ الخيارين الممكنين لنوع `{x;z}` هما `first_record` و`middle_record`، لأنّ النوع `last_record` لا يحوي الحقل `z`. ثم اختار النوع `middle_record` لأنه آخر نوع معرَّف بين الاحتمالين.

واحذر: فرفع الالتباس بهذا الملاذ الأخير محلي، فبعد أن يختار OCaml رفع التباس معيّنًا يتشبّث بهذا الاختيار، حتى لو أدّى إلى خطأ نوعي لاحق:

```ocaml
# let look_at_x_then_y r =
    let x = r.x in (* Ocaml deduces [r: last_record] *)
    x + r.y;;

Error: This expression has type last_record
       There is no field y within type last_record

# let is_a_or_b x = match x with
    | A -> true (* OCaml infers [x: last_variant] *)
    | B -> true;;

Error: This variant pattern is expected to have type last_variant
       There is no constructor B within type last_variant
```

يُضاف إلى ذلك أنّ كون النوع آخرَ نوع معرَّف مركز غير مستقرّ البتة، فقد يتغيّر خفيةً بعد إضافة تعريف نوع أو تحريكه، أو بعد فتح وحدة (انظر الفصل 2). لذلك فإنّ إضافة تعليقات نوعية صريحة لتوجيه رفع الالتباس أمتن من الاعتماد على رفع الالتباس بآخر نوع معرَّف.

## 1.5 الميزات الأمرية

مع أنّ جميع الأمثلة حتى الآن كُتبت بالأسلوب التطبيقي المحض، فإنّ OCaml مجهّز أيضًا بميزات أمرية كاملة، تشمل حلقتَي `while` و`for` المعتادتين، وبنى بيانات قابلة للتعديل كالمصفوفات. وتُنشأ المصفوفات إمّا بإدراج قيم عناصرها مفصولةً بفواصل منقوطة بين القوسين `[|` و`|]`، وإمّا بتخصيصها وتهيئتها بالدالة `Array.make` ثم ملئها لاحقًا بالإسناد. فمثلًا، تجمع الدالة التالية متجهين (ممثَّلين بمصفوفتين من أعداد الفاصلة العائمة) عنصرًا بعنصر.

```ocaml
# let add_vect v1 v2 =
    let len = min (Array.length v1) (Array.length v2) in
    let res = Array.make len 0.0 in
    for i = 0 to len - 1 do
      res.(i) <- v1.(i) +. v2.(i)
    done;
    res;;

val add_vect : float array -> float array -> float array = <fun>

# add_vect [| 1.0; 2.0 |] [| 3.0; 4.0 |];;

- : float array = [|4.; 6.|]
```

ويمكن تعديل حقول السجلات أيضًا بالإسناد، بشرط أن تُصرَّح `mutable` في تعريف نوع السجل:

```ocaml
# type mutable_point = { mutable x: float; mutable y: float };;

type mutable_point = { mutable x : float; mutable y : float; }

# let translate p dx dy =
    p.x <- p.x +. dx; p.y <- p.y +. dy;;

val translate : mutable_point -> float -> float -> unit = <fun>

# let mypoint = { x = 0.0; y = 0.0 };;

val mypoint : mutable_point = {x = 0.; y = 0.}

# translate mypoint 1.0 2.0;;

- : unit = ()

# mypoint;;

- : mutable_point = {x = 1.; y = 2.}
```

لا يملك OCaml مفهومًا مدمجًا للمتغيّر، أي معرّف يمكن تغيير قيمته الحالية بالإسناد. (فالربط `let` ليس إسنادًا، بل يُدخل معرّفًا جديدًا بنطاق جديد.) غير أنّ المكتبة القياسية توفّر المراجع، وهي خلايا إحالة غير مباشرة قابلة للتعديل، مع المعامل `!` لجلب محتوى المرجع الحالي والمعامل `:=` لإسناد محتواه. ويمكن عندئذ محاكاة المتغيّرات بربط مرجع بـ `let`. فمثلًا، هذا فرز بالإدراج في المكان على المصفوفات:

```ocaml
# let insertion_sort a =
    for i = 1 to Array.length a - 1 do
      let val_i = a.(i) in
      let j = ref i in
      while !j > 0 && val_i < a.(!j - 1) do
        a.(!j) <- a.(!j - 1);
        j := !j - 1
      done;
      a.(!j) <- val_i
    done;;

val insertion_sort : 'a array -> unit = <fun>
```

والمراجع نافعة أيضًا لكتابة دوال تحفظ حالة حالية بين نداءين متتاليين للدالة. فمثلًا، يحفظ مولّد الأعداد العشوائية الزائفة التالي آخر عدد أعاده في مرجع:

```ocaml
# let current_rand = ref 0;;

val current_rand : int ref = {contents = 0}

# let random () =
    current_rand := !current_rand * 25713 + 1345;
    !current_rand;;

val random : unit -> int = <fun>
```

ومرة أخرى، ليس في المراجع شيء سحري: فهي منفَّذة كسجل قابل للتعديل ذي حقل واحد، كما يأتي.

```ocaml
# type 'a ref = { mutable contents: 'a };;

type 'a ref = { mutable contents : 'a; }

# let ( ! ) r = r.contents;;

val ( ! ) : 'a ref -> 'a = <fun>

# let ( := ) r newval = r.contents <- newval;;

val ( := ) : 'a ref -> 'a -> unit = <fun>
```

قد تحتاج في بعض الحالات الخاصة إلى تخزين دالة متعدّدة الأشكال في بنية بيانات مع الحفاظ على تعدّد أشكالها. وهذا يتطلّب تعليقات نوعية يوفّرها المستخدم، لأنّ تعدّد الأشكال لا يُدخل تلقائيًا إلا في التعريفات العامة. غير أنّك تستطيع أن تُعطي حقول السجلات أنواعًا متعدّدة الأشكال صراحةً.

```ocaml
# type idref = { mutable id: 'a. 'a -> 'a };;

type idref = { mutable id : 'a. 'a -> 'a; }

# let r = {id = fun x -> x};;

val r : idref = {id = <fun>}

# let g s = (s.id 1, s.id true);;

val g : idref -> int * bool = <fun>

# r.id <- (fun x -> print_string "called id\n"; x);;

- : unit = ()

# g r;;

called id
called id
- : int * bool = (1, true)
```

## 1.6 الاستثناءات

يوفّر OCaml الاستثناءات للإبلاغ عن الأحوال الاستثنائية ومعالجتها. ويمكن استعمال الاستثناءات أيضًا كبنية تحكّم عامة غير محلية، غير أنه لا ينبغي الإكثار من ذلك لأنه قد يجعل الشيفرة أصعب فهمًا. وتُصرَّح الاستثناءات بالبنية `exception`، ويُبلَّغ عنها بالمعامل `raise`. فمثلًا، تستعمل دالة أخذ رأس القائمة التالية استثناءً للإبلاغ عن حالة تمرير قائمة فارغة.

```ocaml
# exception Empty_list;;

exception Empty_list

# let head l =
    match l with
      [] -> raise Empty_list
    | hd :: tl -> hd;;

val head : 'a list -> 'a = <fun>

# head [1; 2];;

- : int = 1

# head [];;

Exception: Empty_list.
```

تُستعمل الاستثناءات في المكتبة القياسية كلها للإبلاغ عن الحالات التي لا تستطيع فيها دوال المكتبة أن تكتمل على نحو طبيعي. فمثلًا، ترفع الدالة `List.assoc`، التي تُعيد البيانات المقترنة بمفتاح معيّن في قائمة من أزواج (المفتاح، البيانات)، الاستثناء المعرَّف مسبقًا `Not_found` عندما لا يظهر المفتاح في القائمة:

```ocaml
# List.assoc 1 [(0, "zero"); (1, "one")];;

- : string = "one"

# List.assoc 2 [(0, "zero"); (1, "one")];;

Exception: Not_found.
```

ويمكن اعتراض الاستثناءات بالبنية `try`…`with`:

```ocaml
# let name_of_binary_digit digit =
    try
      List.assoc digit [0, "zero"; 1, "one"]
    with Not_found ->
      "not a binary digit";;

val name_of_binary_digit : int -> string = <fun>

# name_of_binary_digit 0;;

- : string = "zero"

# name_of_binary_digit (-1);;

- : string = "not a binary digit"
```

ويجري الجزء `with` مطابقة الأنماط على قيمة الاستثناء بالصيغة والسلوك نفسيهما اللذين يجري بهما `match`. وبذلك يمكن اعتراض عدّة استثناءات ببنية `try`…`with` واحدة:

```ocaml
# let rec first_named_value values names =
    try
      List.assoc (head values) names
    with
    | Empty_list -> "no named value"
    | Not_found -> first_named_value (List.tl values) names;;

val first_named_value : 'a list -> ('a * string) list -> string = <fun>

# first_named_value [0; 10] [1, "one"; 10, "ten"];;

- : string = "ten"
```

ويمكن أيضًا إجراء أعمال إنهاء باعتراض جميع الاستثناءات، ثم إجراء الإنهاء، ثم إعادة رفع الاستثناء:

```ocaml
# let temporarily_set_reference ref newval funct =
    let oldval = !ref in
    try
      ref := newval;
      let res = funct () in
      ref := oldval;
      res
    with x ->
      ref := oldval;
      raise x;;

val temporarily_set_reference : 'a ref -> 'a -> (unit -> 'b) -> 'b = <fun>
```

وبديل عن `try`…`with` اعتراضُ الاستثناء أثناء مطابقة الأنماط:

```ocaml
# let assoc_may_map f x l =
    match List.assoc x l with
    | exception Not_found -> None
    | y -> f y;;

val assoc_may_map : ('a -> 'b option) -> 'c -> ('c * 'a) list -> 'b option =
  <fun>
```

ولاحظ أنّ هذه البنية لا تكون نافعة إلا إذا رُفع الاستثناء بين `match`…`with`. ويمكن جمع أنماط الاستثناءات مع الأنماط العادية على المستوى الأعلى،

```ocaml
# let flat_assoc_opt x l =
    match List.assoc x l with
    | None | exception Not_found -> None
    | Some _ as v -> v;;

val flat_assoc_opt : 'a -> ('a * 'b option) list -> 'b option = <fun>
```

لكنها لا يمكن أن تُضمَّن داخل أنماط أخرى. فمثلًا، النمط `Some (exception A)` غير صالح.

وعند استعمال الاستثناءات كبنية تحكّم، قد يفيد جعلها محلية قدر الإمكان باستعمال استثناء معرَّف محليًا. فمثلًا، مع الشيفرة

```ocaml
# let fixpoint f x =
    let exception Done in
    let x = ref x in
    try while true do
        let y = f !x in
        if !x = y then raise Done else x := y
      done
    with Done -> !x;;

val fixpoint : ('a -> 'a) -> 'a -> 'a = <fun>
```

لا تستطيع الدالة `f` أن ترفع الاستثناء `Done`، وهذا يزيل صنفًا كاملًا من الدوال سيئة السلوك.

## 1.7 التعابير الكسولة

يتيح لنا OCaml تأجيل بعض الحساب إلى وقت لاحق عندما نحتاج نتيجة ذلك الحساب.

نستعمل `lazy (expr)` لتأخير تقييم تعبير ما `expr`. فمثلًا، يمكن تأجيل حساب `1+1` إلى أن نحتاج نتيجة ذلك التعبير، وهي `2`. ولنرَ كيف نهيّئ تعبيرًا كسولًا.

```ocaml
# let lazy_two = lazy (print_endline "lazy_two evaluation"; 1 + 1);;

val lazy_two : int lazy_t = <lazy>
```

أضفنا `print_endline "lazy_two evaluation"` لنرى متى يُقيَّم التعبير الكسول.

تُعرض قيمة `lazy_two` على هيئة `<lazy>`، وهذا يعني أنّ التعبير لم يُقيَّم بعد، وأنّ قيمته النهائية غير معروفة.

لاحظ أنّ نوع `lazy_two` هو `int lazy_t`. غير أنّ النوع `'a lazy_t` اسم نوع داخلي، لذا يُفضَّل النوع `'a Lazy.t` حيثما أمكن.

وعندما نحتاج أخيرًا نتيجة تعبير كسول، يمكننا نداء `Lazy.force` عليه لإجبار تقييمه. والدالة `force` مأخوذة من الوحدة `Lazy` في المكتبة القياسية.

```ocaml
# Lazy.force lazy_two;;

lazy_two evaluation
- : int = 2
```

لاحظ أنّ نداء الدالة أعلاه يطبع «lazy_two evaluation» ثم يُعيد القيمة الصريحة للحساب.

والآن إذا نظرنا إلى قيمة `lazy_two` نجد أنها لم تعد تُعرض على هيئة `<lazy>` بل على هيئة `lazy 2`.

```ocaml
# lazy_two;;

- : int lazy_t = lazy 2
```

والسبب أنّ `Lazy.force` تحفظ نتيجة التعبير المُجبَر في الذاكرة. بعبارة أخرى، كل نداء لاحق لـ `Lazy.force` على ذلك التعبير يُعيد نتيجة الحساب الأول دون إعادة حساب التعبير الكسول. ولنجبر `lazy_two` مرة أخرى.

```ocaml
# Lazy.force lazy_two;;

- : int = 2
```

لا يُقيَّم التعبير هذه المرة؛ ولاحظ أنّ «lazy_two evaluation» لم تُطبع. بل تُعاد ببساطة نتيجة الحساب الأول.

وتوفّر أنماط الكسل طريقة أخرى لإجبار تعبير كسول.

```ocaml
# let lazy_l = lazy ([1; 2] @ [3; 4]);;

val lazy_l : int list lazy_t = <lazy>

# let lazy l = lazy_l;;

val l : int list = [1; 2; 3; 4]
```

ويمكننا أيضًا استعمال أنماط الكسل في مطابقة الأنماط.

```ocaml
# let maybe_eval lazy_guard lazy_expr =
    match lazy_guard, lazy_expr with
    | lazy false, _ -> "matches if (Lazy.force lazy_guard = false); lazy_expr not forced"
    | lazy true, lazy _ -> "matches if (Lazy.force lazy_guard = true); lazy_expr forced";;

val maybe_eval : bool lazy_t -> 'a lazy_t -> string = <fun>
```

لا يُجبَر التعبير الكسول `lazy_expr` إلا إذا أعطت قيمة `lazy_guard` القيمة `true` بعد حسابها. فالواقع أنّ نمط محرف البدل البسيط (غير الكسول) لا يجبر تقييم التعبير الكسول أبدًا، أمّا النمط الذي يحوي الكلمة المفتاحية `lazy`، حتى لو كان محرف بدل، فيجبر دائمًا تقييم الحساب المؤجَّل.

## 1.8 المعالجة الرمزية للتعبيرات

نختم هذه المقدّمة بمثال أكمل يمثّل استعمال OCaml في المعالجة الرمزية: التلاعب الصوري بتعبيرات حسابية تحوي متغيّرات. ويصف النوع المتغيّر التالي التعبيرات التي سنتلاعب بها:

```ocaml
# type expression =
      Const of float
    | Var of string
    | Sum of expression * expression    (* e1 + e2 *)
    | Diff of expression * expression   (* e1 - e2 *)
    | Prod of expression * expression   (* e1 * e2 *)
    | Quot of expression * expression   (* e1 / e2 *)
  ;;

type expression =
    Const of float
  | Var of string
  | Sum of expression * expression
  | Diff of expression * expression
  | Prod of expression * expression
  | Quot of expression * expression
```

نعرّف أولًا دالة لتقييم تعبير بمعلومية بيئة تربط أسماء المتغيّرات بقيمها. وللتبسيط، نمثّل البيئة بقائمة اقتران.

```ocaml
# exception Unbound_variable of string;;

exception Unbound_variable of string

# let rec eval env exp =
    match exp with
      Const c -> c
    | Var v ->
        (try List.assoc v env with Not_found -> raise (Unbound_variable v))
    | Sum(f, g) -> eval env f +. eval env g
    | Diff(f, g) -> eval env f -. eval env g
    | Prod(f, g) -> eval env f *. eval env g
    | Quot(f, g) -> eval env f /. eval env g;;

val eval : (string * float) list -> expression -> float = <fun>

# eval [("x", 1.0); ("y", 3.14)] (Prod(Sum(Var "x", Const 2.0), Var "y"));;

- : float = 9.42
```

والآن، في معالجة رمزية حقيقية، نعرّف مشتقّة تعبير بالنسبة إلى متغيّر `dv`:

```ocaml
# let rec deriv exp dv =
    match exp with
      Const c -> Const 0.0
    | Var v -> if v = dv then Const 1.0 else Const 0.0
    | Sum(f, g) -> Sum(deriv f dv, deriv g dv)
    | Diff(f, g) -> Diff(deriv f dv, deriv g dv)
    | Prod(f, g) -> Sum(Prod(f, deriv g dv), Prod(deriv f dv, g))
    | Quot(f, g) -> Quot(Diff(Prod(deriv f dv, g), Prod(f, deriv g dv)),
                         Prod(g, g))
  ;;

val deriv : expression -> string -> expression = <fun>

# deriv (Quot(Const 1.0, Var "x")) "x";;

- : expression =
Quot (Diff (Prod (Const 0., Var "x"), Prod (Const 1., Const 1.)),
 Prod (Var "x", Var "x"))
```

## 1.9 الطباعة الجميلة

كما تُظهر الأمثلة أعلاه، يصير التمثيل الداخلي للتعبيرات (ويُسمّى أيضًا *البنية النحوية المجرّدة*) عسير القراءة والكتابة سريعًا كلما كبرت التعبيرات. فنحتاج إلى طابعة ومحلّل نحوي للانتقال ذهابًا وإيابًا بين البنية النحوية المجرّدة و*البنية النحوية الملموسة*، وهي في حالة التعبيرات التدوين الجبري المألوف (مثل `2*x+1`).

نراعي في دالة الطباعة قواعد الأولوية المعتادة (أي أنّ `*` أقوى ربطًا من `+`) لتجنّب طباعة أقواس لا لزوم لها. ولهذا نحتفظ بأولوية المعامل الحالية، ولا نطبع الأقواس حول معامل إلا إذا كانت أولويته أدنى من الأولوية الحالية.

```ocaml
# let print_expr exp =
    (* Local function definitions *)
    let open_paren prec op_prec =
      if prec > op_prec then print_string "(" in
    let close_paren prec op_prec =
      if prec > op_prec then print_string ")" in
    let rec print prec exp =     (* prec is the current precedence *)
      match exp with
        Const c -> print_float c
      | Var v -> print_string v
      | Sum(f, g) ->
          open_paren prec 0;
          print 0 f; print_string " + "; print 0 g;
          close_paren prec 0
      | Diff(f, g) ->
          open_paren prec 0;
          print 0 f; print_string " - "; print 1 g;
          close_paren prec 0
      | Prod(f, g) ->
          open_paren prec 2;
          print 2 f; print_string " * "; print 2 g;
          close_paren prec 2
      | Quot(f, g) ->
          open_paren prec 2;
          print 2 f; print_string " / "; print 3 g;
          close_paren prec 2
    in print 0 exp;;

val print_expr : expression -> unit = <fun>

# let e = Sum(Prod(Const 2.0, Var "x"), Const 1.0);;

val e : expression = Sum (Prod (Const 2., Var "x"), Const 1.)

# print_expr e; print_newline ();;

2. * x + 1.
- : unit = ()

# print_expr (deriv e "x"); print_newline ();;

2. * 1. + 0. * x + 0.
- : unit = ()
```

## 1.10 صيغ Printf

توجد دالة `printf` في الوحدة `Printf` (انظر الفصل 2) تتيح لك إنتاج مخرجات منسَّقة بإيجاز أكبر. وهي تتبع سلوك الدالة `printf` في مكتبة C القياسية. تأخذ الدالة `printf` سلسلة صيغة تصف المخرجات المطلوبة نصًّا تتخلّله محدِّدات (مثل `%d` و`%f`). ثم تُستبدل المحدِّدات بالوسائط التالية حسب ترتيب ظهورها في سلسلة الصيغة:

```ocaml
# Printf.printf "%i + %i is an integer value, %F * %F is a float, %S\n"
  3 2 4.5 1. "this is a string";;

3 + 2 is an integer value, 4.5 * 1. is a float, "this is a string"
- : unit = ()
```

يتحقّق نظام أنواع OCaml من توافق أنواع الوسائط مع المحدِّدات. وإذا مرّرت وسيطًا من نوع لا يوافق محدِّد الصيغة، عرض المترجم رسالة خطأ:

```ocaml
# Printf.printf "Float value: %F" 42;;

Error: The constant 42 has type int but an expression was expected of type
         float
Hint: Did you mean 42.?
```

والدالة `fprintf` مثل `printf` إلا أنها تأخذ قناة إخراج وسيطًا أول. وقد يكون المحدِّد `%a` نافعًا لتعريف طابعات مخصّصة (للأنواع المخصّصة). فمثلًا، يمكننا إنشاء قالب طباعة يحوّل وسيطًا صحيحًا إلى تمثيل عشري مُوقَّع:

```ocaml
# let pp_int ppf n = Printf.fprintf ppf "%d" n;;

val pp_int : out_channel -> int -> unit = <fun>

# Printf.printf "Outputting an integer using a custom printer: %a " pp_int 42;;

Outputting an integer using a custom printer: 42 - : unit = ()
```

وميزة هذه الطابعات القائمة على المحدِّد `%a` أنها قابلة للتركيب معًا لإنشاء طابعات أعقد خطوةً بخطوة. ويمكننا تعريف مُركِّب يحوّل طابعة للنوع `'a` إلى طابعة لقيمة اختيارية من النوع `'a`:

```ocaml
# let pp_option printer ppf = function
    | None -> Printf.fprintf ppf "None"
    | Some v -> Printf.fprintf ppf "Some(%a)" printer v;;

val pp_option :
  (out_channel -> 'a -> unit) -> out_channel -> 'a option -> unit = <fun>

# Printf.fprintf stdout
    "The current setting is %a. \nThere is only %a\n"
    (pp_option pp_int) (Some 3)
    (pp_option pp_int) None
  ;;

The current setting is Some(3).
There is only None
- : unit = ()
```

إذا كانت قيمة وسيطها `None`، طبعت الطابعة التي تُعيدها `pp_option printer` النص `None`، وإلّا استعملت الطابعة المزوّدة لطباعة `Some`.

وهذه طريقة إعادة كتابة الطابعة الجميلة باستعمال `fprintf`:

```ocaml
# let pp_expr ppf expr =
    let open_paren prec op_prec output =
      if prec > op_prec then Printf.fprintf output "%s" "(" in
    let close_paren prec op_prec output =
      if prec > op_prec then Printf.fprintf output "%s" ")" in
    let rec print prec ppf expr =
        match expr with
        | Const c -> Printf.fprintf ppf "%F" c
        | Var v -> Printf.fprintf ppf "%s" v
        | Sum(f, g) ->
            open_paren prec 0 ppf;
            Printf.fprintf ppf "%a + %a" (print 0) f (print 0) g;
            close_paren prec 0 ppf
        | Diff(f, g) ->
            open_paren prec 0 ppf;
            Printf.fprintf ppf "%a - %a" (print 0) f (print 1) g;
            close_paren prec 0 ppf
        | Prod(f, g) ->
            open_paren prec 2 ppf;
            Printf.fprintf ppf "%a * %a" (print 2) f (print 2) g;
            close_paren prec 2 ppf
        | Quot(f, g) ->
            open_paren prec 2 ppf;
            Printf.fprintf ppf "%a / %a" (print 2) f (print 3) g;
            close_paren prec 2 ppf
    in print 0 ppf expr;;

val pp_expr : out_channel -> expression -> unit = <fun>

# pp_expr stdout e; print_newline ();;

2. * x + 1.
- : unit = ()

# pp_expr stdout (deriv e "x"); print_newline ();;

2. * 1. + 0. * x + 0.
- : unit = ()
```

نظرًا إلى طريقة بناء سلاسل الصيغ، يتطلّب تخزين سلسلة صيغة تعليقًا نوعيًا صريحًا:

```ocaml
# let str : _ format =
      "%i is an integer value, %F is a float, %S\n";;
```

```ocaml
# Printf.printf str 3 4.5 "string value";;

3 is an integer value, 4.5 is a float, "string value"
- : unit = ()
```

## 1.11 برامج OCaml المستقلة

نُفِّذت جميع الأمثلة المعروضة حتى الآن في النظام التفاعلي. ويمكن أيضًا ترجمة شيفرة OCaml على نحو منفصل وتنفيذها بغير تفاعل باستعمال المترجمين الدفعيين `ocamlc` و`ocamlopt`. ويجب وضع الشيفرة المصدرية في ملف بامتداد `.ml`، وهو يتكوّن من متتالية من العبارات تُقيَّم وقت التشغيل حسب ترتيب ظهورها في الملف المصدري. وعلى خلاف الوضع في النمط التفاعلي، لا تُطبع الأنواع والقيم تلقائيًا؛ بل يجب أن ينادي البرنامج دوال الطباعة صراحةً لإنتاج مخرجات. ولا يُشترط `;;` المستعمل في الأمثلة التفاعلية في الملفات المصدرية المعدّة للاستعمال مع مترجمات OCaml، لكنه قد يفيد في تعليم نهاية تعبير على المستوى الأعلى دون لبس حتى عند وجود أخطاء نحوية. وهذا برنامج مستقل نموذجي لطباعة القاسم المشترك الأكبر لعددين:

```text
(* File gcd.ml *)
let rec gcd a b =
  if b = 0 then a
  else gcd b (a mod b);;

let main () =
  let a = int_of_string Sys.argv.(1) in
  let b = int_of_string Sys.argv.(2) in
  Printf.printf "%d\n" (gcd a b);
  exit 0;;
main ();;
```

‏`Sys.argv` مصفوفة سلاسل تحوي وسائط سطر الأوامر؛ لذا `Sys.argv.(1)` هو الوسيط الأول في سطر الأوامر. ويُترجم البرنامج أعلاه ويُنفَّذ بأوامر الصدفة الآتية:

```text
$ ocamlc -o gcd gcd.ml
$ ./gcd 6 9
3
$ ./gcd 7 11
1
```

البرامج المستقلة الأعقد في OCaml تتكوّن عادةً من عدّة ملفات مصدرية، ويمكنها الربط بمكتبات مترجمة مسبقًا. ويشرح الفصلان 13 و16 كيفية استعمال المترجمين الدفعيين `ocamlc` و`ocamlopt`. ويمكن أتمتة إعادة ترجمة مشاريع OCaml متعدّدة الملفات باستعمال أنظمة بناء خارجية، مثل [dune](https://github.com/ocaml/dune).
