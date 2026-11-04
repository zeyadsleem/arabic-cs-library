---
title: "امتدادات اللغة"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 12: امتدادات اللغة

يصف هذا الفصل امتدادات اللغة والميزات المريحة التي تنفّذها OCaml ولكن الفصل 11 لا يعرضها.

## 12.1 التعريفات العودية للقيم

(أُدخلت في Objective Caml 1.00)

كما ذُكر في القسم 11.7.2، فإن بناء الربط `let rec`، إضافةً إلى تعريف الدوال العودية، يدعم أيضًا صنفًا معيّنًا من التعريفات العودية للقيم غير الدالية، مثل

`let rec` *name*₁ `=` `1 ::` *name*₂ `and` *name*₂ `=` `2 ::` *name*₁ `in` *expr*

الذي يربط *name*₁ بالقائمة الحلقية `1::2::1::2::`…، و*name*₂ بالقائمة الحلقية `2::1::2::1::`… وبصياغة غير صورية، يتألّف صنف التعريفات المقبولة من تلك التعريفات التي لا تظهر فيها الأسماء المعرَّفة إلا داخل أجسام الدوال أو معاملًا لباني بيانات.

وبصياغة أدقّ، لننظر إلى التعبير:

`let rec` *name*₁ `=` *expr*₁ `and` … `and` *name*ₙ `=` *expr*ₙ `in` *expr*

يُقبل هذا التعبير إذا كان كلٌّ من *expr*₁ … *expr*ₙ بنائيًا ساكنًا بالنسبة إلى *name*₁ … *name*ₙ، وغير مرتبط مباشرةً بأيٍّ منها، وليس باني مصفوفة تكون معاملاته من نوع مجرّد.

يقال إن التعبير *e* بنائي ساكن بالنسبة إلى المتغيّرات *name*₁ … *name*ₙ إذا تحقّق أحد الشروط الآتية على الأقل:

- لا يوجد في *e* أي ورود حرّ لأي من *name*₁ … *name*ₙ

- *e* متغيّر

- *e* على الشكل `fun` … `->` …

- *e* على الشكل `function` … `->` …

- *e* على الشكل `lazy` `(` … `)`

- *e* على أحد الأشكال الآتية، حيث يكون كلٌّ من *expr*₁ … *expr*ₘ بنائيًا ساكنًا بالنسبة إلى *name*₁ … *name*ₙ، ويكون *expr*₀ بنائيًا ساكنًا بالنسبة إلى *name*₁ … *name*ₙ و*xname*₁ … *xname*ₘ:

- `let` [`rec`] *xname*₁ `=` *expr*₁ `and` … `and` *xname*ₘ `=` *expr*ₘ `in` *expr*₀

- `let module` … `in` *expr*₁

- *constr* `(`*expr*₁`,` … `,` *expr*ₘ`)`

- `` ` ``*tag-name* `(`*expr*₁`,` … `,` *expr*ₘ`)`

- `[|` *expr*₁`;` … `;` *expr*ₘ `|]`

- `{` *field*₁ `=` *expr*₁`;` … `;` *field*ₘ = *expr*ₘ `}`

- `{` *expr*₁ `with` *field*₂ `=` *expr*₂`;` … `;` *field*ₘ = *expr*ₘ `}` حيث لا يكون *expr*₁ مرتبطًا مباشرةً بـ *name*₁ … *name*ₙ

- `(` *expr*₁`,` … `,` *expr*ₘ `)`

- *expr*₁`;` … `;` *expr*ₘ

ويقال إن التعبير *e* مرتبط مباشرةً بالمتغيّر *name* في الحالات الآتية:

- *e* هو *name*

- *e* على الشكل *expr*₁`;` … `;` *expr*ₘ حيث يكون *expr*ₘ مرتبطًا مباشرةً بـ *name*

- *e* على الشكل `let` [`rec`] *xname*₁ `=` *expr*₁ `and` … `and` *xname*ₘ `=` *expr*ₘ `in` *expr*₀ حيث يكون *expr*₀ مرتبطًا مباشرةً بـ *name* أو بأحد *xname*ᵢ بحيث يكون *expr*ᵢ مرتبطًا مباشرةً بـ *name*.

## 12.2 الوحدات العودية

(أُدخلت في Objective Caml 3.07)

```text
definition::= ... ∣ module rec module-name : module-type = module-expr { and module-name : module-type = module-expr } specification::= ... ∣ module rec module-name : module-type { and module-name: module-type }
```

إن تعريفات الوحدات العودية، التي يُدخلها البناء `module rec` …`and` …، تعمّم تعريفات الوحدات العادية `module` *module-name* `=` *module-expr* ومواصفات الوحدات `module` *module-name* `:` *module-type* بأن تسمح لـ *module-expr* المعرِّفة ولـ *module-type* بالإشارة عوديًا إلى معرّفات الوحدات التي يجري تعريفها. ومن الأمثلة النموذجية على تعريف وحدة عودية:

```ocaml
module rec A : sig
  type t = Leaf of string | Node of ASet.t
  val compare: t -> t -> int
end = struct
  type t = Leaf of string | Node of ASet.t
  let compare t1 t2 =
    match (t1, t2) with
    | (Leaf s1, Leaf s2) -> Stdlib.compare s1 s2
    | (Leaf _, Node _) -> 1
    | (Node _, Leaf _) -> -1
    | (Node n1, Node n2) -> ASet.compare n1 n2
end
and ASet
  : Set.S with type elt = A.t
  = Set.Make(A)
```

ويمكن إعطاؤه المواصفة الآتية:

```ocaml
module rec A : sig
  type t = Leaf of string | Node of ASet.t
  val compare: t -> t -> int
end
and ASet : Set.S with type elt = A.t
```

هذا امتداد تجريبي في OCaml: فصنف التعريفات العودية المقبولة، وكذلك دلالته الديناميكية، ليسا نهائيين وهما عرضة للتغيّر في إصدارات لاحقة.

حاليًا يشترط المترجم أن تمرّ كل دورات التبعية بين معرّفات الوحدات المعرَّفة عوديًا عبر وحدة «آمنة» واحدة على الأقل. والوحدة «آمنة» إذا كانت كل تعريفات القيم التي تحويها من أنواع دوال *typexpr*₁ `->` *typexpr*₂. ويجري تقييم تعريف الوحدة العودية ببناء قيم ابتدائية للوحدات الآمنة المعنية، بربط كل القيم (الدالية) بـ `fun _ -> raise Undefined_recursive_module`. ثم تُقيَّم تعابير الوحدات المعرِّفة، وتُستبدل القيم الابتدائية للوحدات الآمنة بالقيم المحسوبة على هذا النحو. وإذا طُبِّق أحد المكوّنات الدالية لوحدة آمنة أثناء هذا الحساب (وهو ما يوافق تعريفًا عوديًا غير مؤسَّس)، فإن الاستثناء `Undefined_recursive_module` يُرفع وقت التشغيل:

```ocaml
module rec M: sig val f: unit -> int end = struct let f () = N.x end
and N:sig val x: int end = struct let x = M.f () end

Exception:
Undefined_recursive_module ("extensions/recursivemodules.etex", 1, 43).
```

وإذا لم تكن هناك وحدات آمنة على دورة تبعية ما، رُفع خطأ

```ocaml
module rec M: sig val x: int end = struct let x = N.y end
and N:sig val x: int val y:int end = struct let x = M.x let y = 0 end

Error: Cannot safely evaluate the definition of the following cycle
       of recursively-defined modules: M -> N -> M.
       There are no safe modules in this cycle (see manual section 12.2).
  Module M defines an unsafe value, x .
  Module N defines an unsafe value, x .
```

لاحظ أنه في حالة *المواصفة* يجب وضع *module-types* بين قوسين إذا استعملت البناء `with` *mod-constraint*.

## 12.3 الأنواع الخاصة

تتيح تصريحات الأنواع الخاصة في تواقيع الوحدات، من الشكل `type t = private ...`، للمكتبات أن تكشف بعض جوانب تنفيذ نوع ما، لا كلها، لعملاء المكتبة. وبهذا فهي تحلّ وسطًا بين تصريحات الأنواع المجرّدة، حيث لا يُكشف أي شيء عن تنفيذ النوع، وتعريفات أنواع البيانات واختصارات الأنواع، حيث تُعلَن كل جوانب تنفيذ النوع. وتأتي تصريحات الأنواع الخاصة على ثلاثة أنماط: لأنواع المتغيّرات والسجلات (القسم 12.3.1)، ولاختصارات الأنواع (القسم 12.3.2)، ولأنواع الصفوف (القسم 12.3.3).

### 12.3.1 أنواع المتغيّرات والسجلات الخاصة

(أُدخلت في Objective Caml 3.07)

```text
type-representation::= ... ∣ = private [ | ] constr-decl { | constr-decl } ∣ = private record-decl
```

يمكن تفكيك قيم نوع متغيّر أو سجل مصرَّح عنه بـ `private` بشكل عادي في مطابقة الأنماط أو عبر تدوين *expr* `.` *field* للوصول إلى السجلات. غير أنه لا يمكن بناء قيم هذه الأنواع مباشرةً بتطبيق الباني أو ببناء السجل. علاوةً على ذلك، لا يُسمح بالإسناد إلى حقل قابل للتغيير في نوع سجل خاص.

والاستعمال النموذجي للأنواع الخاصة هو في توقيع تصدير وحدة، لضمان أن يمرّ بناء قيم النوع الخاص دومًا عبر الدوال التي توفّرها الوحدة، مع السماح في الوقت نفسه بمطابقة الأنماط خارج الوحدة المعرِّفة. مثال على ذلك:

```ocaml
module M : sig
  type t = private A | B of int
  val a : t
  val b : int -> t
end = struct
  type t = A | B of int
  let a = A
  let b n = assert (n > 0); B n
end
```

هنا يضمن التصريح `private` أن يكون معامل الباني `B` في أي قيمة من النوع `M.t` عددًا صحيحًا موجبًا.

أما بالنسبة إلى تغاير معاملاتها، فتُعالَج الأنواع الخاصة معالجة الأنواع المجرّدة. أي إن النوع الخاص إذا كانت له معاملات فإن تغايرها هو ما يُعطى صراحةً بسبق المعامل بـ «`+`» أو «`-`»، وإلا فهو ثابت.

### 12.3.2 اختصارات الأنواع الخاصة

(أُدخلت في Objective Caml 3.11)

```text
type-equation::= ... ∣ = private typexpr
```

خلافًا لاختصار النوع العادي، يصرّح اختصار النوع الخاص بنوع يتميّز عن نوع تنفيذه *typexpr*. غير أن الإكراهات من النوع إلى *typexpr* مسموحة. علاوةً على ذلك، «يعرف» المترجم نوع التنفيذ ويمكنه أن يستفيد من هذه المعرفة لتنفيذ تحسينات موجّهة بالأنواع.

يستعمل المثال الآتي اختصار نوع خاصًا لتعريف وحدة للأعداد الصحيحة غير السالبة:

```ocaml
module N : sig
  type t = private int
  val of_int: int -> t
  val to_int: t -> int
end = struct
  type t = int
  let of_int n = assert (n >= 0); n
  let to_int n = n
end
```

النوع `N.t` غير متوافق مع `int`، ما يضمن عدم الخلط بين الأعداد الصحيحة غير السالبة والأعداد الصحيحة العادية. غير أنه إذا كان `x` من النوع `N.t` فإن الإكراه `(x :> int)` قانوني ويعيد العدد الصحيح الكامن، تمامًا مثل `N.to_int x`. الإكراهات العميقة مدعومة أيضًا: إذا كانت `l` من النوع `N.t list` فإن الإكراه `(l :> int list)` يعيد قائمة الأعداد الصحيحة الكامنة، مثل `List.map N.to_int l` لكن دون نسخ القائمة `l`.

لاحظ أن الإكراه `(` *expr* `:>` *typexpr* `)` هو في الحقيقة صيغة مختصرة، ولن يعمل في حضور اختصارات خاصة إلا إذا لم يكن في نوع *expr* ولا في *typexpr* أي متغيّر نوع. وإذا كان فيهما متغيّر نوع وجب استعمال الصيغة الكاملة `(` *expr* `:` *typexpr*₁ `:>` *typexpr*₂ `)` حيث *typexpr*₁ هو النوع المتوقّع لـ *expr*. وعلى نحو ملموس، سيكون ذلك `(x : N.t :> int)` و`(l : N.t list :> int list)` للمثالين السابقين.

### 12.3.3 أنواع الصفوف الخاصة

(أُدخلت في Objective Caml 3.09)

```text
type-equation::= ... ∣ = private typexpr
```

أنواع الصفوف الخاصة هي اختصارات أنواع يُترك فيها جزء من بنية النوع مجرّدًا. وعلى نحو ملموس، يجب أن يدلّ *typexpr* في ما سبق على نوع كائن أو على نوع متغيّر متعدّد الأشكال، مع إبقاء بعض إمكان التنقيح. وإذا استُعمل التصريح الخاص في واجهة، جاز للتنفيذ الموافق أن يوفّر نسخة أرضية أو نوعًا خاصًا منقّحًا.

```ocaml
module M : sig type c = private < x : int; .. > val o : c end =
struct
  class c = object method x = 3 method y = 2 end
  let o = new c
end
```

هذا التصريح يفعل أكثر من إخفاء الدالة `y`، فهو يجعل النوع `c` غير متوافق مع أي نوع كائن مغلق آخر، بمعنى أن `o` وحده سيكون من النوع `c`. ومن هذه الجهة يتصرّف على غرار أنواع السجلات الخاصة. لكن أنواع الصفوف الخاصة أكثر مرونة من حيث التنقيح التدريجي. ويمكن استعمال هذه الميزة بالاقتران مع الموصِّلات.

```ocaml
module F(X : sig type c = private < x : int; .. > end) =
struct
  let get_x (o : X.c) = o#x
end
module G(X : sig type c = private < x : int; y : int; .. > end) =
struct
  include F(X)
  let get_y (o : X.c) = o#y
end
```

يمكن تنقيح نوع متغيّر متعدّد الأشكال [t]، مثلًا

```ocaml
type t = [ `A of int | `B of bool ]
```

بطريقتين. فيمكن للتعريف [u] أن يضيف حقولًا جديدة إلى [t]، والتصريح

```ocaml
type u = private [> t]
```

يُبقي تلك الحقول الجديدة مجرّدة. وبناء قيم من النوع [u] ممكن باستعمال المتغيّرات المعروفة من [t]، لكن أي مطابقة أنماط ستتطلّب حالة افتراضية لمعالجة الحقول الإضافية المحتملة. وبالعكس، يمكن للتعريف [u] أن يقيّد حقول [t] بالتجريد: فالتصريح

```ocaml
type v = private [< t > `A]
```

يوافق أنواع المتغيّرات الخاصة. فلا يمكن إنشاء قيمة من النوع الخاص [v] إلا باستعمال البواني المذكورة صراحةً كحاضرة، ``(`A n)`` في هذا المثال؛ ومع ذلك، عند مطابقة الأنماط على [v] ينبغي افتراض أن أيًّا من بواني [t] قد يكون حاضرًا.

وعلى غرار الأنواع المجرّدة، لا يُستنتج تغاير معاملات الأنواع، بل يجب إعطاؤه صراحةً.

## 12.4 الأنواع المجرّدة محليًا

(أُدخلت في OCaml 3.12، وأُضيفت الصيغة المختصرة في 4.03)

```text
parameter::= ... ∣ ( type { typeconstr-name }⁺ )
```

يُدخل التعبير `fun` `(` `type` *typeconstr-name* `)` `->` *expr* باني نوع اسمه *typeconstr-name* يُعدّ مجرّدًا في نطاق التعبير الفرعي، ثم يُستبدل بمتغيّر نوع جديد. لاحظ أنه خلافًا لما قد يوحي به التركيب، فإن التعبير `fun` `(` `type` *typeconstr-name* `)` `->` *expr* نفسه لا يوقف تقييم *expr* كما تفعل التجريدية العادية. وقد اختير هذا التركيب ليناسب سياق تصريحات الدوال، حيث يُستعمل عمومًا. ويمكن خلط معاملات الدوال العادية بمعاملات الأنواع الصورية بحرّية، كما في:

```ocaml
let f = fun (type t) (foo : t list) -> …
```

بل واستعمال التركيب البديل لتصريح الدوال:

```ocaml
let f (type t) (foo : t list) = …
```

وإذا احتجنا إلى إدخال عدة أنواع مجرّدة محليًا، أمكن استعمال التركيب `fun` `(` `type` *typeconstr-name*₁ … *typeconstr-name*ₙ `)` `->` *expr* سكرًا نحويًا مقابل `fun` `(` `type` *typeconstr-name*₁ `)` `->` … `->` `fun` `(` `type` *typeconstr-name*ₙ `)` `->` *expr*. مثلًا:

```ocaml
let f = fun (type t u v) -> fun (foo : (t * u * v) list) -> …
let f' (type t u v) (foo : (t * u * v) list) = …
```

هذا البناء مفيد لأن بواني الأنواع التي يدخلها يمكن استعمالها في مواضع لا يُسمح فيها بمتغيّر نوع. فيمكن المرء مثلًا أن يستعمله لتعريف استثناء في وحدة محلية داخل دالة متعدّدة الأشكال.

```ocaml
let f (type t) () =
  let module M = struct exception E of t end in
  (fun x -> M.E x), (function M.E x -> Some x | _ -> None)
```

وإليك مثالًا آخر:

```ocaml
let sort_uniq (type s) (cmp : s -> s -> int) =
  let module S = Set.Make(struct type t = s let compare = cmp end) in
  fun l ->
    S.elements (List.fold_right S.add l S.empty)
```

وهو مفيد أيضًا للغاية في الوحدات من المرتبة الأولى (انظر القسم 12.5) وفي أنواع البيانات الجبرية المعمّمة (GADT: انظر القسم 12.10).

##### التركيب متعدّد الأشكال

(أُدخل في OCaml 4.00)

```text
let-binding::= ... ∣ value-name : type { typeconstr-name }⁺ . typexpr = expr class-field::= ... ∣ method [private] method-name : type { typeconstr-name }⁺ . typexpr = expr ∣ method! [private] method-name : type { typeconstr-name }⁺ . typexpr = expr
```

لا يجعل بناء التركيب `(type` *typeconstr-name*`)` متغيّر النوع الذي يدخله متعدّد الأشكال بحد ذاته، لكنه يمكن أن يُجمع مع تعليقات متعدّدة الأشكال صريحة حيث يلزم. والقاعدة أعلاه مقدَّمة سكرًا نحويًا لتسهيل ذلك:

```ocaml
let rec f : type t1 t2. t1 * t2 list -> t1 = …
```

يُوسَّع تلقائيًا إلى

```ocaml
let rec f : 't1 't2. 't1 * 't2 list -> 't1 =
  fun (type t1) (type t2) -> ( … : t1 * t2 list -> t1)
```

وقد يكون هذا التركيب مفيدًا جدًا عند تعريف دوال عودية تشمل GADT، انظر القسم 12.10 لشرح أوفى.

وتُوفَّر الميزة نفسها لتعريفات الدوال.

## 12.5 الدوال المعتمدة على الوحدات والوحدات من المرتبة الأولى

(أُدخلت الوحدات من المرتبة الأولى في OCaml 3.12؛ وتركيب الأنماط واستنتاج أنواع الحزم في 4.00؛ والمقارنة البنيوية لأنواع الحزم في 4.02؛ وقلّة الأقواس المطلوبة بدءًا من 4.05. وأُدخلت الدوال المعتمدة على الوحدات في 5.5.)

تتيح الدوال المعتمدة على الوحدات والوحدات من المرتبة الأولى التعامل مع الوحدات بوصفها قيمًا، ولا سيّما قبول وحدات معاملات للدوال.

### 12.5.1 مقدمة

##### الدوال المعتمدة على الوحدات: دوال مُعاملة على وحدة

يمكن كتابة دالة `sort0` تُرتّب العناصر بإضافتها إلى مجموعة مرتّبة ثم تقرأها مرة أخرى بالترتيب:

```ocaml
let sort0 (type a) cmp li =
  let module M = struct type t = a let compare = cmp end in
  let module MSet = Stdlib.Set.Make(M) in
  MSet.elements (List.fold_right MSet.add li MSet.empty)

let example = sort0 Int.compare [3; 1; 2]

val sort0 : ('a -> 'a -> int) -> 'a list -> 'a list = <fun>
val example : int list = [1; 2; 3]
```

وباستعمال الدوال المعتمدة على الوحدات يمكن أيضًا التعبير عن `sort` بوصفها دالة مُعاملة على وحدة مجموعة مرتّبة. وهذا يتيح للمستدعين اختيار تنفيذ المجموعة المرتّبة الذي يريدونه، وقد يكون مخصّصًا لنوعهم؛ فمجموعات الأعداد الصحيحة مثلًا يمكن تمثيلها بمصفوفات بِتِّية أو بتمثيلات مضغوطة للمجالات الكثيفة.

```ocaml
let sort (module MSet : Set.S) li =
  MSet.elements (List.fold_right MSet.add li MSet.empty)

val sort : (module MSet : Set.S) -> MSet.elt list -> MSet.elt list = <fun>
```

يستعمل تصريح `sort` تركيب النمط `(module M : S)`، الذي يسمح بأن تكون معاملات الدوال وحدات بدل قيم عادية. ونسمّي `sort` دالة *معتمدة على وحدة* لأن الوحدة المعاملة تظهر في نوعها، `(module MSet : Set.S) -> MSet.elt list -> MSet.elt list`، على يمين السهم `(module MSet : Set.S) -> ...`، عبر ورودات النوع `MSet.elt`.

ولتطبيق الدالة `sort` نستعمل البناء `(module M)` لتقديم المعامل، أو `(module M : S)` للتصريح بالتوقيع المقصود.

```ocaml
module ISetIncr = Set.Make(Int)
module ISetDecr =
  Set.Make(struct
    type t = int
    let compare i1 i2 = Int.compare i2 i1
  end)
```

```ocaml
# let example = sort (module ISetIncr) [3; 1; 2];;

val example : ISetIncr.elt list = [1; 2; 3]

# let example = sort (module ISetDecr) [3; 1; 2];;

val example : ISetDecr.elt list = [3; 2; 1]
```

هذا يوفّر بديلًا خفيفًا للموصِّلات. فيمكن التعبير عن الدالة `sort` أيضًا باستعمال موصِّل `Sort`:

```ocaml
module Sort (MSet : Set.S) = struct
  let f li =
    MSet.elements (List.fold_right MSet.add li MSet.empty)
end

module Sort :
  (MSet : Set.S) -> sig val f : MSet.elt list -> MSet.elt list end
```

```ocaml
# let module S = Sort(ISetDecr) in S.f [3; 1; 2];;

- : ISetDecr.elt list = [3; 2; 1]
```

##### حالة استعمال: التجريد على البنى الجبرية

توفّر الدوال المعتمدة على الوحدات طريقة جميلة لتنفيذ شيفرة مُعاملة على عائلات من بنى الأنواع، مثلًا على أي موناد.

```ocaml
module type Monad = sig
  type 'a t
  val return : 'a -> 'a t
  val bind : 'a t -> ('a -> 'b t) -> 'b t
end

let mapM (module M : Monad) (f : 'a -> 'b M.t) (li : 'a list) : 'b list M.t =
  let ( let* ) = M.bind in
  let rec loop = function
  | [] -> M.return []
  | x::xs ->
    let* y = f x in
    let* ys = loop xs in
    M.return (y :: ys)
  in loop li

(* Example use-case: a map on the Result monad *)
let map_result (type e)
: ('a -> ('b, e) result) -> 'a list -> ('b list, e) result
= let module R = struct
    type 'a t = ('a, e) result
    let return = Result.ok
    let bind = Result.bind
  end in mapM (module R)
```

##### الوحدات من المرتبة الأولى

في تطبيق الدالة `sort (module ISetIncr)` من مثالنا أعلاه نقول إن معامل الوحدة *ساكن*: فهو معروف وقت الترجمة.

وتتيح الوحدات من المرتبة الأولى بناء قيم *ديناميكية* تمثّل وحدات، بحيث يعتمد اختيار الوحدة على حسابات وقت التشغيل. فإذا كانت `M` وحدة ذات توقيع `S`، فإن `(module M : S)` تعبير من النوع `(module S)`، ونقول إنه «يحزم» الوحدة `M` بوصفها قيمة.

والاستعمال النموذجي للوحدات من المرتبة الأولى هو الاختيار وقت التشغيل بين عدة تنفيذات لتوقيع ما. فكل تنفيذ بنية يمكن حزمها في وحدة من المرتبة الأولى ثم تخزينها في بنية بيانات كجدول تجزئة:

```ocaml
type picture = …
module type DEVICE = sig
  val draw : picture -> unit
  …
end
let devices : (string, (module DEVICE)) Hashtbl.t = Hashtbl.create 17

module SVG = struct … end
let _ = Hashtbl.add devices "SVG" (module SVG : DEVICE)

module PDF = struct … end
let _ = Hashtbl.add devices "PDF" (module PDF : DEVICE)
```

ويمكن لتعبير الوحدة `(val e : S)` بعد ذلك أن *يفكّ حزمة* قيمة وحدة محزومة `(e : (module S))` ويعيدها وحدة. وفي مثالنا يمكن اختيار تنفيذ واحد استنادًا إلى معاملات سطر الأوامر:

```ocaml
let parse_cmdline () = …
module Device =
  (val (let device_name = parse_cmdline () in
        try Hashtbl.find devices device_name
        with Not_found ->
          Printf.eprintf "Unknown device %s\n" device_name;
          exit 2)
   : DEVICE)
```

أو يمكن إجراء الاختيار داخل دالة:

```ocaml
let draw_using_device device_name picture =
  let module Device =
    (val (Hashtbl.find devices device_name) : DEVICE)
  in
  Device.draw picture

(* or, equivalently *)
let draw_using_device device_name picture =
  let (module Device : DEVICE) = Hashtbl.find devices device_name in
  Device.draw picture
```

##### قيد: اختيار وحدة وقت التشغيل

هناك قيد على الدوال المعتمدة على الوحدات `fun (module A : S) -> ...`: إذا كان نوع جسم الدالة (`...`) *يعتمد* على معامل الوحدة `A`، فإن هذه الدالة لا يُسمح لها إلا بمعاملات وحدات ساكنة من الشكل `(module M : S)`، لا بتعابير عشوائية من النوع `(module S)`. ولا وجود لهذا القيد إذا لم يذكر نوع الجسم `A`، أو إذا أمكن للمدقّق النوعي إزالة ورودات `A` بإدراج معادلات الأنواع (مثلًا حين يساوي `A.t` النوع `int`).

والدالة `sort` من الفقرة 12.5.1 دالة معتمدة على وحدة من هذا القبيل: فنوعها `(module MSet : Set.S) -> MSet.elt list -> MSet.elt list`، حيث تُستعمل الوحدة `MSet` على يمين السهم `(module MSet : Set.S) -> ...`. والمثال الآتي مرفوض:

```ocaml
let sort_order = `Decr
```

```ocaml
let wrong =
  sort
    (match sort_order with
     | `Incr -> (module ISetIncr)
     | `Decr -> (module ISetDecr))
    [2; 4]

Error: This expression has type
         (module MSet : Set.S) -> MSet.elt list -> MSet.elt list
       but an expression was expected of type (module Set.S) -> 'a
       The module MSet would escape its scope
This function is module-dependent. The dependency is preserved
when the function is passed a static module argument (module M : S)
or (module M). Its argument here is not static, so the type-checker
tried instead to change the function type to be non-dependent.
```

وفي بعض الحالات، ومنها هذا المثال، يمكن إعادة كتابة الشيفرة لتستعمل معامل وحدة ساكنًا من جديد:

```ocaml
let okay =
  let m : (module Set.S with type elt = int) =
    match sort_order with
    | `Incr -> (module ISetIncr)
    | `Decr -> (module ISetDecr)
  in
  let module MSet = (val m) in
  sort (module MSet) [2; 4]

val okay : int list = [4; 2]
```

لاحظ أن `MSet.elt` لا يمكن أن يظهر في نوع `okay`، لأن الوحدة `MSet` معرَّفة محليًا فقط. وفي هذا المثال يذكر نوع إرجاع `sort` النوع `MSet.elt`، لكن هذا النوع يساوي `int` فيمكن تبسيطه وإسقاطه.

وأخيرًا يمكن أيضًا إزالة التبعية من تعريف `sort` باستبدال توقيع المعامل `Set.S` بالتوقيع `Set.S with type elt = a`، الذي يستعمل نوعًا مجرّدًا محليًا `(type a)` (انظر 12.4). وكان هذا النهج الوحيد المتاح قبل إدخال الدوال المعتمدة على الوحدات في اللغة، لكنه أقل مرونة لأنه يتطلّب تغيير تعريف الدالة لا موضع الاستدعاء وحده.

```ocaml
let sort_nondep (type a) (module MSet : Set.S with type elt = a) (li : a list) =
  MSet.elements (List.fold_right MSet.add li MSet.empty)

let also_okay =
  sort_nondep
    (match sort_order with
     | `Incr -> (module ISetIncr)
     | `Decr -> (module ISetDecr))
    [2; 4]

val sort_nondep :
  (module MSet : Set.S with type elt = 'a) -> 'a list -> MSet.elt list =
  <fun>
val also_okay : ISetIncr.elt list = [4; 2]
```

لاحظ أن إزالة التبعيات باستعمال `(type a)` على هذا النحو لا يمكن أن تجرى إلا للأنواع غير المُعاملة مثل `elt`، لا للأنواع المُعاملة مثل `'a t`؛ فلا يوجد تجريد مقابل `(type 'a t)`. ولم يكن ذلك ممكنًا في مثال `mapM` أعلاه، الذي يعتمد على وحدة تحوي نوعًا مُعاملًا `'a M.t`، ومن ثمّ لا يمكن أن تُمرَّر إليه معاملات وحدات مختارة ديناميكيًا.

##### قيد: التطبيقات من الرتبة n

يفشل المثال الآتي، حيث `sort` هي دالتنا المعتمدة على وحدة من قبل:

```ocaml
let sort (module MSet : Set.S) li =
  MSet.elements (List.fold_right MSet.add li MSet.empty)

let wrong = Fun.id sort (module ISetIncr) [2; 3]

Error: The value sort has type
         (module MSet : Set.S) -> MSet.elt list -> MSet.elt list
       but an expression was expected of type (module Set.S) -> 'a -> 'b
       The module MSet would escape its scope
```

المشكلة تأتي من تفاصيل دقيقة في التدقيق النوعي لتطبيقات الدوال من الرتبة n. فهذا يُدقَّق بوصفه `Fun.id` الذي مُرِّر إليه ثلاثة معاملات، ولا يُستعمل في حلّ تطبيق الوحدة إلا نوع `Fun.id` (لا معاملاته)، فلا يكون أي نوع دالة معتمد على وحدة معروفًا في تلك اللحظة.

ويمكن إصلاح المثال بتطبيق `Fun.id sort` أولًا، ثم تمرير معامل الوحدة في تطبيق منفصل. حينها سيُستعمل النوع المعتمد على الوحدة لـ `Fun.id sort` في تدقيق تطبيق الوحدة. ويمكن فعل ذلك بإضافة أقواس إضافية ببساطة:

```ocaml
let fixed = (Fun.id sort) (module ISetIncr) [2; 3]

val fixed : ISetIncr.elt list = [2; 3]
```

(كما أن تعليق نوع «Fun.id» صراحةً بنوع دالة معتمد على وحدة سينجح أيضًا.)

##### التوافق

قبل OCaml 5.5 لم تكن الدوال المعتمدة على الوحدات مدعومة. كان المرء يستطيع استعمال الوحدات من المرتبة الأولى، لكن الدوال التي تأخذ وحدة من المرتبة الأولى كان يجب أن تكون غير معتمدة، فكان يُستعمل حلّ `(type a)` هذا كثيرًا.

### 12.5.2 المرجع

```text
typexpr::= ... ∣ (module package-type) ∣ (module module-name : package-type) -> typexpr module-expr::= ... ∣ (val expr [: package-type]) expr::= ... ∣ (module module-expr [: package-type]) pattern::= ... ∣ (module module-name [: package-type]) package-type::= modtype-path ∣ modtype-path with package-constraint { and package-constraint } package-constraint::= type typeconstr = typexpr
```

يحوّل التعبير `(` `module` *module-expr* `:` *package-type* `)` الوحدة (بنية كانت أو موصِّلًا) التي يدلّ عليها تعبير الوحدة *module-expr* إلى قيمة من لغة النواة تحزم هذه الوحدة. ونوع هذه القيمة في لغة النواة هو `(` `module` *package-type* `)`. ويمكن إسقاط تعليقة *package-type* إذا أمكن استنتاجها من السياق.

وبالعكس، فإن تعبير الوحدة `(` `val` *expr* `:` *package-type* `)` يقيّم تعبير لغة النواة *expr* إلى قيمة يجب أن تكون من النوع `module` *package-type*، ويستخرج الوحدة المحتواة في هذه القيمة. ومرة أخرى يمكن إسقاط *package-type* إذا كان نوع *expr* معروفًا. وإذا كان تعبير الوحدة موضوعًا بين قوسين من قبل، كما هي حال معاملات الموصِّلات، فلا حاجة إلى أقواس إضافية: `Map.Make(val key)`.

ويطابق النمط `(` `module` *module-name* `:` *package-type* `)` حزمة من النوع *package-type* ويربطها بـ *module-name*. وهو غير مسموح في روابط let على المستوى الأعلى. والدالة التي يكون معاملها هذا النمط بالضبط يمكن أن تكون معتمدة على وحدة. ومرة أخرى يمكن إسقاط *package-type* إذا أمكن استنتاجها من النمط المحيط.

أما صنف التركيب *package-type* الظاهر في تعبير النوع `(` `module` *package-type* `)`، وفي تعبير النوع `(` `module` *module-name* `:` *package-type* `)` `->` *typexpr*، وفي الأشكال المعلَّقة، فيمثّل مجموعة جزئية من أنواع الوحدات. تتألّف هذه المجموعة من أنواع وحدات مسمّاة مع قيود اختيارية ذات شكل محدود: فلا يمكن تحديد إلا الأنواع غير المُعاملة.

ولأغراض التدقيق النوعي (وبدءًا من OCaml 4.02)، تُقارَن أنواع الحزم بالمقارنة البنيوية لأنواع الوحدات.

وعند التدقيق النوعي نعدّ أيضًا `(` `module` *module-name* `:` *package-type* `)` `->` *typexpr* و`(` `module` *package-type* `)` `->` *typexpr* متطابقين حين يمكن محو *module-name* من *typexpr*.

وبوجه عام، لا يمكن استعمال تعبير الوحدة `(` `val` *expr* `:` *package-type* `)` في جسم موصِّل، لأن ذلك قد يفضي إلى عدم سلامة بالاقتران مع الموصِّلات التطبيقية. ومنذ OCaml 4.02 خُفِّف هذا القيد بطريقتين: إذا لم تحوِ *package-type* تصريحات أنواع اسمية (*أي* أنواع تُنشأ بهوية صحيحة)، أمكن استعمال هذا التعبير في أي مكان، وحتى إذا حوتها أمكن استعماله داخل جسم موصِّل توليدي، الموصوف في القسم 12.15. ويمكن أيضًا استعماله في أي مكان في سياق ربط وحدة محلية `let` `module` *module-name* `=` `(` `val` *expr*₁ `:` *package-type* `)` `in` *expr*₂.

## 12.6 استعادة نوع وحدة

(أُدخلت في OCaml 3.12)

```text
module-type::= ... ∣ module type of module-expr
```

يتوسّع البناء `module type of` *module-expr* إلى نوع الوحدة (توقيع أو نوع موصِّل) المستنتج لتعبير الوحدة *module-expr*. ولكي يكون نوع الوحدة هذا قابلًا لإعادة الاستعمال في مواقف كثيرة، فهو غير مقوّى عن قصد: فلا تُربط الأنواع المجرّدة وأنواع البيانات صراحةً بأنواع الوحدة الأصلية. وللسبب نفسه تُوسَّع أسماء الوحدات المستعارة في النوع المستنتج.

والاستعمال النموذجي، بالاقتران مع البناء `include` على مستوى التوقيع، هو توسيع توقيع بنية قائمة. وفي هذه الحالة يراد إبقاء الأنواع مساوية لأنواع الوحدة الأصلية. ويمكن فعل ذلك بالاصطلاح الآتي.

```ocaml
module type MYHASH = sig
  include module type of struct include Hashtbl end
  val replace: ('a, 'b) t -> 'a -> 'b -> unit
end
```

يحتوي التوقيع `MYHASH` بعد ذلك على كل حقول توقيع الوحدة `Hashtbl` (مع تعريفات أنواع مقوّاة)، وعلى الحقل الجديد `replace`. ويمكن الحصول على تنفيذ لهذا التوقيع بسهولة باستعمال البناء `include` من جديد، لكن على مستوى البنية هذه المرة:

```ocaml
module MyHash : MYHASH = struct
  include Hashtbl
  let replace t k v = remove t k; add t k v
end
```

ومن التطبيقات الأخرى التي يكون فيها غياب التقوية مفيدًا توفير تنفيذ بديل لوحدة قائمة.

```ocaml
module MySet : module type of Set = struct
  …
end
```

يضمن هذا الاصطلاح أن `Myset` متوافق مع Set، لكنه يتيح له تمثيل المجموعات داخليًا بطريقة مختلفة.

## 12.7 الإحلال داخل توقيع

### 12.7.1 الإحلالات المدمِّرة

(أُدخلت في OCaml 3.12، وعُمّمت في 4.06)

```text
mod-constraint::= ... ∣ type [type-params] typeconstr-name := typexpr ∣ module module-path := extended-module-path
```




يتصرّف الإحلال «المدمِّر» (`with` ... `:=` ...) في الجوهر كالقيود العادية على التوقيع (`with` ... `=` ...)، لكنه يزيل فضلًا عن ذلك النوع أو الوحدة المعاد تعريفها من التوقيع.

وقبل OCaml 4.06 كانت هناك قيود عدة: فلم يكن ممكنًا إلا إزالة الأنواع والوحدات على المستوى الخارجي (لا داخل الوحدات الفرعية)، وفي حالة `with type` وجب أن يكون التعريف باني نوع آخر بالمعاملات نفسها.

ومن التطبيقات الطبيعية للإحلال المدمِّر دمج توقيعين يتشاركان اسم نوع.

```ocaml
module type Printable = sig
  type t
  val print : Format.formatter -> t -> unit
end
module type Comparable = sig
  type t
  val compare : t -> t -> int
end
module type PrintableComparable = sig
  include Printable
  include Comparable with type t := t
end
```




ويمكن أيضًا استعماله لإزالة حقل إزالة كاملة:

```ocaml
module type S = Comparable with type t := int

module type S = sig val compare : int -> int -> int end
```




أو لإعادة تسميته:

```ocaml
module type S = sig
  type u
  include Comparable with type t := u
end

module type S = sig type u val compare : u -> u -> int end
```




لاحظ أنه يمكن أيضًا إزالة الأنواع البيانية بالإحلال بالنوع نفسه.

```ocaml
module type ComparableInt = Comparable with type t = int ;;

module type ComparableInt = sig type t = int val compare : t -> t -> int end

module type CompareInt = ComparableInt with type t := int

module type CompareInt = sig val compare : int -> int -> int end
```




### 12.7.2 تصريحات الإحلال المحلية

(أُدخلت في OCaml 4.08، وأُدخل إحلال نوع الوحدة في 4.13)

```text
specification::= ... ∣ type type-subst { and type-subst } ∣ module module-name := extended-module-path ∣ module type module-name := module-type type-subst::= [type-params] typeconstr-name := typexpr { type-constraint }
```




تتصرّف الإحلالات المحلية كالإحلالات المدمِّرة (`with` ... `:=` ...)، لكنها بدل أن تُطبَّق على توقيع كامل بعد الفراغ، تُدخل أثناء مواصفة التوقيع، وتُطبَّق على كل العناصر التي تليها.

وهذا يوفّر طريقة مريحة لإدخال أسماء محلية للأنواع والوحدات عند تعريف توقيع:

```ocaml
module type S = sig
  type t
  module Sub : sig
    type outer := t
    type t
    val to_outer : t -> outer
  end
end

module type S =
  sig type t module Sub : sig type t val to_outer : t -> t/2 end end
```




لاحظ أنه خلافًا لتصريحات الأنواع، فإن تصريحات إحلال الأنواع ليست عودية، لذا تُرفض إحلالات كالآتي:

```ocaml
# module type S = sig
    type 'a poly_list := [ `Cons of 'a * 'a poly_list | `Nil ]
  end ;;

Error: Unbound type constructor poly_list
```


ويمكن أيضًا استعمال الإحلالات المحلية لإعطاء اسم محلي لنوع أو لنوع وحدة أدخله تطبيق موصِّل:

```ocaml
# module type F = sig
    type set := Set.Make(Int).t

    module type Type = sig type t end
    module Nest : Type -> sig module type T = Type end

    module type T := Nest(Int).T

    val set: set
    val m : (module T)
  end;;

module type F =
  sig
    module type Type = sig type t end
    module Nest : Type -> sig module type T = Type end
    val set : Set.Make(Int).t
    val m : (module Nest(Int).T)
  end
```


إحلالات أنواع الوحدات المحلية خاضعة للقيود نفسها التي تخضع لها إحلالات أنواع الوحدات، انظر القسم 12.7.3.

### 12.7.3 إحلالات أنواع الوحدات

(أُدخلت في OCaml 4.13)

```text
mod-constraint::= ... ∣ module type modtype-path = module-type ∣ module type modtype-path := module-type
```


يتصرّف إحلال نوع الوحدة في الجوهر كإحلالات الأنواع. وهو مفيد لتنقيح نوع وحدة مجرّد في توقيع ما إلى نوع وحدة ملموس،

```ocaml
# module type ENDO = sig
    module type T
    module F: T -> T
  end
  module Endo(X: sig module type T end): ENDO with module type T = X.T =
  struct
      module type T = X.T
      module F(X:T) = X
   end;;

module type ENDO = sig module type T module F : T -> T end
module Endo :
  (X : sig module type T end) ->
    sig module type T = X.T module F : T -> T end
```


ويمكن أيضًا إحلال نوع وحدة ملموس بنوع وحدة مكافئ.

```ocaml
module type A = sig
  type x
  module type R = sig
    type a = A of x
    type b
  end
end
module type S = sig
  type a = A of int
  type b
end
module type B = A with type x = int and module type R = S
```


غير أن هذه الإحلالات ليست ضرورية قطّ.

وإحلال نوع الوحدة المدمِّر يزيل إحلال نوع الوحدة من التوقيع

```ocaml
# module type ENDO' = ENDO with module type T := ENDO;;

module type ENDO' = sig module F : ENDO -> ENDO end
```


#### القيود

إذا لم يكن الطرف الأيمن لإحلال نوع وحدة أو لإحلال نوع وحدة محلي *modtype-path*، فإن الإحلال المدمِّر لا يكون صالحًا إلا إذا لم يُستعمل الطرف الأيسر للإحلال قطّ نوعًا لوحدة من المرتبة الأولى في نوع الوحدة الأصلي.

```ocaml
module type T = sig module type S val x: (module S) end
module type Error = T with module type S := sig end

Error: This with constraint S := sig end makes a packed module ill-formed.
       (see manual section 12.7.3)
```

```ocaml
module type T = sig module type S := sig end val x: (module S) end

Error: The module type S is not a valid type for a packed module:
       it is defined as a local substitution (temporary name)
       for an anonymous module type. (see manual section 12.7.3)
```


## 12.8 أسماء الوحدات المستعارة على مستوى النوع

(أُدخلت في OCaml 4.02)

```text
specification::= ... ∣ module module-name = module-path
```

المواصفة أعلاه، داخل توقيع، لا تطابق إلا تعريف وحدة يساوي *module-path*. وبالعكس، فإن اسم وحدة مستعار على مستوى النوع يمكن أن يطابقه هو نفسه، أو أي نوع أعلى لنوع الوحدة التي يشير إليها.

وهناك قيود عدة على *module-path*:

1. يجب أن يكون على الشكل *M*₀.*M*₁...*M*ₙ (*أي* دون تطبيقات موصِّلات)؛

2. داخل جسم موصِّل، يجب ألّا يكون *M*₀ أحد معاملات الموصِّل؛

3. داخل تعريف وحدة عودية، يجب ألّا يكون *M*₀ أحد الوحدات المعرَّفة عوديًا.

وهذه المواصفات تُستنتج أيضًا. أي إنه حين يكون *P* مسارًا يحقّق القيود أعلاه، فإن

```ocaml
module N = P
```

له النوع

```ocaml
module N = P
```

تُستعمل أسماء الوحدات المستعارة على مستوى النوع عند تدقيق تساوي مسارات الوحدات. أي إنه في سياق يُعرف فيه أن اسم الوحدة *N* مستعار لـ *P*، لا يُعدّ هذان المساران متساويين فحسب، بل يُعترف أيضًا بأن *F*(*N*) و*F*(*P*) متساويان. وفي نمط الترجمة الافتراضي، هذا هو الفرق الوحيد عن النهج السابق حيث كانت الأسماء المستعارة للوحدات تحمل نوع الوحدة نفسه الذي تحمله الوحدة التي تشير إليها وحسب.

وحين تُفعَّل راية المترجم `-no-alias-deps`، تُستغل أسماء الوحدات المستعارة على مستوى النوع أيضًا لتفادي إدخال تبعيات بين وحدات الترجمة. أي إن اسم وحدة مستعارًا يشير إلى وحدة داخل وحدة ترجمة أخرى لا يُدخل تبعية وقت الربط على وحدة الترجمة تلك، ما دام لم يُجرَ عليه إلغاء إشارة؛ لكنه يُدخل تبعية وقت الترجمة إذا احتاجت الواجهة إلى القراءة، *أي* إذا كانت الوحدة وحدة فرعية من وحدة الترجمة، أو إذا أُشير إلى بعض مكوّنات الأنواع. وفضلًا عن ذلك، فإن الوصول إلى اسم وحدة مستعار يُدخل تبعية وقت الربط على وحدة الترجمة التي تحوي الوحدة المشار إليها بالاسم المستعار، لا على وحدة الترجمة التي تحوي الاسم المستعار. ولاحظ أن هذه الفروق في سلوك وقت الربط قد تكون غير متوافقة مع السلوك السابق، إذ قد لا تُستخرج بعض وحدات الترجمة من المكتبات وتُهمَل آثارها الجانبية.

وهذه التبعيات المخفَّفة تجعل من الممكن استعمال أسماء الوحدات المستعارة بدل آلية `-pack`. افترض أن لديك مكتبة `Mylib` مؤلَّفة من الوحدتين `A` و`B`. فباستعمال `-pack` يصدر المرء سطر الأوامر

```text
ocamlc -pack a.cmo b.cmo -o mylib.cmo
```

ويحصل نتيجةً لذلك على وحدة ترجمة `Mylib` تحوي ماديًا `A` و`B` بوصفهما وحدتين فرعيتين، ودون أي تبعيات على وحدتي ترجمتهما. وإليك مثالًا ملموسًا على نهج بديل ممكن:

1. أعد تسمية الملفين الحاويين لـ `A` و`B` إلى `Mylib__A` و`Mylib__B`.

2. أنشئ واجهة حزم `Mylib.ml` تحوي السطرين `module A = Mylib__A` و`module B = Mylib__B`.

3. ترجم `Mylib.ml` باستعمال `-no-alias-deps`، وترجم الملفات الأخرى باستعمال `-no-alias-deps` و`-open` `Mylib` (وهذا الأخير مكافئ لإضافة السطر `open!` `Mylib` في أعلى كل ملف): `ocamlc -c -no-alias-deps Mylib.ml` ثم `ocamlc -c -no-alias-deps -open Mylib Mylib__*.mli Mylib__*.ml`.

4. أخيرًا أنشئ مكتبة تحوي كل وحدات الترجمة، وصدّر كل الواجهات المترجمة: `ocamlc -a Mylib*.cmo -o Mylib.cma`.

يتيح هذا النهج الوصول إلى `A` و`B` مباشرةً داخل المكتبة، وإلى `Mylib.A` و`Mylib.B` من خارجها. وله ميزة أيضًا هي أن `Mylib` لم تعد كتلة واحدة: فإذا استعملت `Mylib.A` فلن يُربط إلا `Mylib__A`، لا `Mylib__B`.

لاحظ استعمال الشرطة السفلية المزدوجة في `Mylib__A` و`Mylib__B`. وقد اختيرت عن قصد؛ فالمترجم يستعمل الاستدلال الآتي عند طباعة المسارات: إذا أُعطي مسار `Lib__fooBar`، وكان `Lib.FooBar` موجودًا واسمًا مستعارًا لـ `Lib__fooBar`، فإن المترجم يعرض دومًا `Lib.FooBar` بدل `Lib__fooBar`. وبهذا تبقى الأسماء الطويلة `Mylib__` مخفيّة ولا يرى المستعمل إلا الأسماء النقطية الأجمل. وهكذا تُترجم مكتبة OCaml القياسية.

## 12.9 التجاوز في عبارات open

(أُدخل في OCaml 4.01)

```text
definition::= ... ∣ open! module-path specification::= ... ∣ open! module-path expr::= ... ∣ let open! module-path in expr class-body-type::= ... ∣ let open! module-path in class-body-type class-expr::= ... ∣ let open! module-path in class-expr
```

منذ OCaml 4.01 تُطلق عبارات `open` التي تحجب معرّفًا موجودًا (ويُستعمل لاحقًا) التحذير 44. وإضافة محرف `!` بعد الكلمة المفتاحية `open` تدلّ على أن هذا الحجب مقصود ويجب ألّا يُطلق التحذير.

وهذا متاح أيضًا (منذ OCaml 4.06) للفتحات المحلية في تعابير الأصناف وتعابير أنواع الأصناف.

## 12.10 أنواع البيانات الجبرية المعمّمة

توسّع أنواع البيانات الجبرية المعمّمة، أو GADT، أنواع المجموع المعتادة بطريقتين: فقد تتغيّر القيود على معاملات الأنواع بحسب باني القيمة، وقد تكون بعض متغيّرات الأنواع مكمَّمة وجوديًا. وهي موصوفة في الفصل 7.

(أُدخلت في OCaml 4.00)

```text
constr-decl::= ... ∣ constr-name : [ constr-args -> ] typexpr type-param::= ... ∣ [variance] _
```

حالات الدحض. (أُدخلت في OCaml 4.03)

```text
matching-case::= pattern [when expr] -> expr ∣ pattern -> .
```

التسمية الصريحة للأنواع الوجودية. (أُدخلت في OCaml 4.13.0)

```text
pattern::= ... ∣ constr ( type { typeconstr-name }⁺ ) ( pattern )
```

## 12.11 تركيب الوصول إلى Bigarray

(أُدخل في Objective Caml 3.00)

```text
expr::= ... ∣ expr .{ expr { , expr } } ∣ expr .{ expr { , expr } } <- expr
```

يوفّر هذا الامتداد سكرًا نحويًا لجلب عناصر من المصفوفات التي توفّرها وحدة `Bigarray` ولوضعها فيها.

وتُترجم التعابير المختصرة إلى استدعاءات لدوال من وحدة `Bigarray` كما هو موضّح في الجدول الآتي.

| **التعبير** | **الترجمة** |
| --- | --- |
| *expr*₀`.{`*expr*₁`}` | `Bigarray.Array1.get`*expr*₀ *expr*₁ |
| *expr*₀`.{`*expr*₁`}` `<-`*expr* | `Bigarray.Array1.set`*expr*₀ *expr*₁ *expr* |
| *expr*₀`.{`*expr*₁`,` *expr*₂`}` | `Bigarray.Array2.get`*expr*₀ *expr*₁ *expr*₂ |
| *expr*₀`.{`*expr*₁`,` *expr*₂`}` `<-`*expr* | `Bigarray.Array2.set`*expr*₀ *expr*₁ *expr*₂ *expr* |
| *expr*₀`.{`*expr*₁`,` *expr*₂`,` *expr*₃`}` | `Bigarray.Array3.get`*expr*₀ *expr*₁ *expr*₂ *expr*₃ |
| *expr*₀`.{`*expr*₁`,` *expr*₂`,` *expr*₃`}` `<-`*expr* | `Bigarray.Array3.set`*expr*₀ *expr*₁ *expr*₂ *expr*₃ *expr* |
| *expr*₀`.{`*expr*₁`,` …`,` *expr*ₙ`}` | `Bigarray.Genarray.get` *expr*₀ `[\|` *expr*₁`,` … `,` *expr*ₙ `\|]` |
| *expr*₀`.{`*expr*₁`,` …`,` *expr*ₙ`}` `<-`*expr* | `Bigarray.Genarray.set` *expr*₀ `[\|` *expr*₁`,` … `,` *expr*ₙ `\|]` *expr* |

والسطران الأخيران صالحان لأي *n* > 3.

## 12.12 السمات

(أُدخلت في OCaml 4.02)

السمات هي «زينة» شجرة التركيب يتجاهلها المدقّق النوعي في الأغلب لكن يمكن أن تستعملها أدوات خارجية. وتتألّف السمة من معرّف وحمولة، قد تكون بنية أو تعبير نوع (مسبوقًا بـ `:`) أو توقيعًا (مسبوقًا بـ `:`) أو نمطًا (مسبوقًا بـ `?`) وربما يتبعها شرط `when`:

```text
attr-id::= lowercase-ident ∣ capitalized-ident ∣ attr-id . attr-id attr-payload::= [ module-items ] ∣ : typexpr ∣ : [ specification ] ∣ ? pattern [when expr]
```

يُلحق الشكل الأول من السمات بتدوين لاحق على الأصناف «الجبرية»:

```text
attribute::= [@ attr-id attr-payload ] expr::= ... ∣ expr attribute typexpr::= ... ∣ typexpr attribute pattern::= ... ∣ pattern attribute module-expr::= ... ∣ module-expr attribute module-type::= ... ∣ module-type attribute class-expr::= ... ∣ class-expr attribute class-type::= ... ∣ class-type attribute
```

ويمكن إدراج هذا الشكل من السمات أيضًا بعد `` ` ``*tag-name* في تعابير أنواع المتغيّرات متعدّدة الأشكال (*tag-spec-first*، *tag-spec*، *tag-spec-full*) أو بعد *method-name* في *method-type*.

ويُستعمل الشكل التركيبي نفسه أيضًا لإلحاق السمات بالتسميات والبواني في تصريحات الأنواع:

```text
field-decl::= [mutable] field-name : poly-typexpr { attribute } constr-decl::= (constr-name ∣ ()) [ of constr-args ] { attribute }
```

ملاحظة: حين يتبع تصريح تسمية فاصلة منقوطة، يمكن أيضًا وضع السمات بعد الفاصلة المنقوطة (وفي هذه الحالة تُدمج بالسمات المحدّدة قبلها).

أما الشكل الثاني من السمات فيُلحق «بالكتل» كتصريحات الأنواع وحقول الأصناف وغيرها:

```text
item-attribute::= [@@ attr-id attr-payload ] typedef::= ... ∣ typedef item-attribute exception-definition::= exception constr-decl ∣ exception constr-name = constr module-items::= [;;] ( definition ∣ expr { item-attribute } ) { [;;] definition ∣ ;; expr { item-attribute } } [;;] class-binding::= ... ∣ class-binding item-attribute class-spec::= ... ∣ class-spec item-attribute classtype-def::= ... ∣ classtype-def item-attribute let-binding::= ... ∣ let-binding item-attribute definition::= let [rec] let-binding { and let-binding } ∣ external value-name : typexpr = external-declaration { item-attribute } ∣ type-definition ∣ exception-definition { item-attribute } ∣ class-definition ∣ classtype-definition ∣ module module-name { ( module-name : module-type ) } [ : module-type ] = module-expr { item-attribute } ∣ module type modtype-name = module-type { item-attribute } ∣ open module-path { item-attribute } ∣ include module-expr { item-attribute } ∣ module rec module-name : module-type = module-expr { item-attribute } { and module-name : module-type = module-expr { item-attribute } } specification::= val value-name : typexpr { item-attribute } ∣ external value-name : typexpr = external-declaration { item-attribute } ∣ type-definition ∣ exception constr-decl { item-attribute } ∣ class-specification ∣ classtype-definition ∣ module module-name : module-type { item-attribute } ∣ module module-name { ( module-name : module-type ) } : module-type { item-attribute } ∣ module type modtype-name { item-attribute } ∣ module type modtype-name = module-type { item-attribute } ∣ open module-path { item-attribute } ∣ include module-type { item-attribute } class-field-spec::= ... ∣ class-field-spec item-attribute class-field::= ... ∣ class-field item-attribute
```

ويظهر شكل ثالث من السمات كعناصر بنية أو توقيع قائمة بذاتها في اللغات الفرعية للوحدات أو الأصناف. وهي لا تُلحق بأي عقدة محدّدة في شجرة التركيب:

```text
floating-attribute::= [@@@ attr-id attr-payload ] definition::= ... ∣ floating-attribute specification::= ... ∣ floating-attribute class-field-spec::= ... ∣ floating-attribute class-field::= ... ∣ floating-attribute
```

(ملاحظة: خلافًا لما يصفه التركيب أعلاه، لا يمكن إلحاق *item-attributes* بهذه السمات القائمة بذاتها في *class-field-spec* و*class-field*.)

ويمكن أيضًا تحديد السمات باستعمال تركيب وسيط. مثلًا:

```text
let[@foo] x = 2 in x + 1          === (let x = 2 [@@foo] in x + 1)
begin[@foo][@bar x] ... end       === (begin ... end)[@foo][@bar x]
module[@foo] M = ...              === module M = ... [@@foo]
type[@foo] t = T                  === type t = T [@@foo]
method[@foo] m = ...              === method m = ... [@@foo]
```

وفي حالة `let` تُطبَّق السمات على كل ربط:

```text
let[@foo] x = 2 and y = 3 in x + y === (let x = 2 [@@foo] and y = 3 in x + y)
let[@foo] x = 2
and[@bar] y = 3 in x + y           === (let x = 2 [@@foo] and y = 3 [@@bar] in x + y)
```

### 12.12.1 السمات المدمجة

بعض السمات يفهمها المترجم:

- `ocaml.warning` أو `warning`، وحمولتها مكوّن حرفي سلسلي. ويمكن استعمالها سمات قائمة بذاتها في توقيع أو بنية أو نوع كائن. وتُحلَّل السلسلة ويكون أثرها كأثر خيار سطر الأوامر `-w`، في النطاق بين السمة ونهاية التوقيع أو البنية أو نوع الكائن الحالي. ويمكن أيضًا إلحاق السمة بأي نوع من العناصر التركيبية التي تدعم السمات (كتعبير أو تعبير نوع)، وحينها يقتصر نطاقها على ذلك العنصر. لاحظ أنه ليس محدَّدًا تحديدًا جيدًا أي نطاق يُستعمل لتحذير بعينه. فهذا يعتمد على التنفيذ وقد يتغيّر بين الإصدارات. بل إن بعض التحذيرات خارج سيطرة `ocaml.warning` كليًا (مثلًا التحذيرات 1 و2 و14 و29 و50).

- `ocaml.warnerror` أو `warnerror`، وحمولتها مكوّن حرفي سلسلي. وهي كـ `ocaml.warning`، من أجل خيار سطر الأوامر `-warn-error`.

- `ocaml.alert` أو `alert`: انظر القسم 12.21.

- `ocaml.deprecated` أو `deprecated`: اسم مستعار لتنبيه `deprecated`، انظر القسم 12.21.

- `ocaml.deprecated_mutable` أو `deprecated_mutable`. يمكن تطبيقه على تسمية سجل قابلة للتغيير. وإذا استُعملت التسمية لاحقًا لتعديل الحقل (بـ `expr.l <- expr`)، أُطلق تنبيه `deprecated`. وإذا كانت حمولة السمة مكوّنًا حرفيًا سلسليًا، تضمّن رسالة التنبيه هذا النص.

- `ocaml.ppwarning` أو `ppwarning`، في أي سياق، وحمولتها مكوّن حرفي سلسلي. ويُبلَّغ النص تحذيرًا (22) من المترجم (وحاليًا موضع التحذير هو موضع الحمولة السلسلية). وهذا مفيد في الأغلب للمعالجات السابقة التي تحتاج إلى إبلاغ المستعمل بالتحذيرات. ويمكن أيضًا استعماله لوسم موضع شيفرة بعينه صراحةً لمزيد من الفحص.

- `ocaml.warn_on_literal_pattern` أو `warn_on_literal_pattern` تعلّق على البواني في تعريف النوع. فيُطلق تحذير (52) عند مطابقة هذا الباني بنمط مع ثابت حرفي معاملًا. وتدلّ هذه السمة على بوانٍ معاملها إخباري محض وقد يتغيّر مستقبلًا. لذا فمطابقة الأنماط على هذا المعامل بثابت حرفي غير موثوقة. فمثلًا كل بواني الاستثناءات المدمجة موسومة بـ `warn_on_literal_pattern`. لاحظ أن هذا التحذير (52) لا يُطلق، بسبب قيد في التنفيذ، إلا لبوانٍ بمعامل واحد.

- `ocaml.tailcall` أو `tailcall` يمكن تطبيقها على تطبيق دالة للتحقّق من أن الاستدعاء محسّن استدعاءً ذيليًا. وإذا لم يكن كذلك أُطلق تحذير (51).

- `ocaml.inline` أو `inline` تأخذ `never` أو `always` أو لا شيء حمولةً على تعريف دالة أو موصِّل. وإذا لم تُقدَّم حمولة فالقيمة الافتراضية `always`. وتتحكّم هذه الحمولة في متى ينبغي إدراج تطبيقات الدوال الموسومة.

- `ocaml.inlined` أو `inlined` يمكن تطبيقها على أي تطبيق دالة أو موصِّل للتحقّق من أن المترجم أدرج الاستدعاء. وإذا لم يُدرج الاستدعاء أُطلق تحذير (55).

- `ocaml.noalloc` و`ocaml.unboxed` و`ocaml.untagged` أو `noalloc` و`unboxed` و`untagged` يمكن استعمالها على التعريفات الخارجية للحصول على تحكّم أدقّ في واجهة C إلى OCaml. انظر 23.11 لمزيد من التفاصيل.

- `ocaml.immediate` أو `immediate` مطبَّقة على نوع مجرّد توسم النوع بأن له تنفيذًا غير مؤشِّر (مثل `int` أو `bool` أو `char` أو أنواع التعداد). وتغيير هذه الأنواع الفورية لا يُنشّط حاجز الكتابة في جامع القمامة، ما قد يعزّز الأداء تعزيزًا كبيرًا في البرامج التي تعتمد اعتمادًا شديدًا على حالة قابلة للتغيير.

- `ocaml.immediate64` أو `immediate64` مطبَّقة على نوع مجرّد توسم النوع بأن له تنفيذًا غير مؤشِّر على منصّات 64 بت. ولا يُفترض شيء على المنصّات الأخرى. ولإنتاج نوع بالسمة `immediate64`، يجب استعمال الموصِّل `Sys.Immediate64.Make`.

- `ocaml.unboxed` أو `unboxed` يمكن استعمالها على تعريف نوع إذا كان النوع سجلًا بحقل واحد أو نوعًا ملموسًا ببوانٍ واحد له معامل واحد. وهي تطلب من المترجم تحسين تمثيل النوع بإزالة الكتلة التي تمثّل السجل أو الباني (أي إن قيمة من هذا النوع تساوي ماديًا معاملها). وفي حالة GADT يُطبَّق قيد إضافي: يجب ألّا يكون المعامل متغيّرًا وجوديًا، يمثّله متغيّر نوع وجودي، أو باني نوع مجرّدًا مطبَّقًا على متغيّر نوع وجودي.

- `ocaml.boxed` أو `boxed` يمكن استعمالها على تعريفات الأنواع لتعني عكس `ocaml.unboxed`: إبقاء التمثيل غير المحسّن للنوع. وحين لا توجد تعليقة فالقيمة الافتراضية حاليًا `boxed` لكنها قد تتغيّر مستقبلًا.

- `ocaml.local` أو `local` تأخذ `never` أو `always` أو `maybe` أو لا شيء حمولةً على تعريف دالة. وإذا لم تُقدَّم حمولة فالقيمة الافتراضية `always`. وتتحكّم السمة في تحسين يقوم بترجمة دالة إلى استمرار ساكن. وخلافًا للإدراج، لا ينسخ هذا التحسين جسم الدالة. وهذا ممكن حين تكون كل الإشارات إلى الدالة تطبيقات كاملة تشترك في الاستمرار نفسه (مثلًا القيمة المعادة من عدة فروع لمطابقة أنماط). و`never` يعطّل التحسين، و`always` يؤكّد انطباقه (وإلا أُطلق تحذير 55)، و`maybe` يتيح تطبيقه حين يمكن (وهذا هو السلوك الافتراضي حين لا تُحدَّد السمة). ويُعطَّل التحسين ضمنًا عند استعمال مترجم الشيفرة البايتية في نمط التنقيح (`-g`)، وللدوال الموسومة بالسمة `ocaml.inline always` أو `ocaml.unrolled` التي تنسخ `ocaml.local`.

- `ocaml.poll` أو `poll` بحمولة `error` على تعريف دالة تُطلق خطأً كلما أدخل المترجم نقطة استقصاء وقت تشغيل في جسم الدالة الموسومة.

- `ocaml.remove_aliases` أو `remove_aliases`، المعرَّفة على تعبير توقيع `module type of` أو على قيد `with module`، تطلب من المدقّق النوعي إسقاط أسماء الوحدات المستعارة من التوقيع الناتج.

- `ocaml.atomic` أو `atomic` على تعريف حقل سجل، توسم هذا الحقل بأنه ذرّي. انظر 9.7.2 لمزيد من التفاصيل.

```ocaml
module X = struct
  [@@@warning "+9"]  (* locally enable warning 9 in this structure *)
  …
end
[@@deprecated "Please use module 'Y' instead."]

let x = begin[@warning "+9"] […] end

type t = A | B
  [@@deprecated "Please use type 's' instead."]
```

```ocaml
let fires_warning_22 x =
  assert (x >= 0) [@ppwarning "TODO: remove this later"]

Warning 22 [preprocessor]: TODO: remove this later
```

```ocaml
let rec is_a_tail_call = function
  | [] -> ()
  | _ :: q -> (is_a_tail_call[@tailcall]) q

let rec not_a_tail_call = function
  | [] -> []
  | x :: q -> x :: (not_a_tail_call[@tailcall]) q

Warning 51 [wrong-tailcall-expectation]: expected tailcall
```

```ocaml
let f x = x [@@inline]

let () = (f[@inlined]) ()
```

```ocaml
type fragile =
  | Int of int [@warn_on_literal_pattern]
  | String of string [@warn_on_literal_pattern]
```

```ocaml
let fragile_match_1 = function
| Int 0 -> ()
| _ -> ()

Warning 52 [fragile-literal-pattern]: Code should not depend on the actual
  values of this constructor's arguments.
  They are only for information and may change in future versions.
  (see manual section 13.5.3)

val fragile_match_1 : fragile -> unit = <fun>
```

```ocaml
let fragile_match_2 = function
| String "constant" -> ()
| _ -> ()

Warning 52 [fragile-literal-pattern]: Code should not depend on the actual
  values of this constructor's arguments.
  They are only for information and may change in future versions.
  (see manual section 13.5.3)

val fragile_match_2 : fragile -> unit = <fun>
```

```ocaml
module Immediate: sig
  type t [@@immediate]
  val x: t ref
end = struct
  type t = A | B
  let x = ref A
end
```

```ocaml
module Int_or_int64 : sig
  type t [@@immediate64]
  val zero : t
  val one : t
  val add : t -> t -> t
end = struct

  include Sys.Immediate64.Make(Int)(Int64)

  module type S = sig
    val zero : t
    val one : t
    val add : t -> t -> t
  end

  let impl : (module S) =
    match repr with
    | Immediate ->
        (module Int : S)
    | Non_immediate ->
        (module Int64 : S)

  include (val impl : S)
end
```


## 12.13 عقد الامتداد

(أُدخلت في OCaml 4.02، وأُضيفت التدوينات الوسيطة لبنى غير التعابير في 4.03، والتدوينة الوسيطة `(e1 ;%ext e2)` في 4.04.)

عقد الامتداد عناصر نائبة عامة في شجرة التركيب. ويرفضها المدقّق النوعي، والمراد أن «توسّعها» أدوات خارجية كمعيدات كتابة `-ppx`.

وتشترك عقد الامتداد في تصوّر المعرّف والحمولة نفسه الذي للسمات 12.12.

ويُستعمل الشكل الأول من عقد الامتداد للأصناف «الجبرية»:

```text
extension::= [% attr-id attr-payload ] expr::= ... ∣ extension typexpr::= ... ∣ extension pattern::= ... ∣ extension module-expr::= ... ∣ extension module-type::= ... ∣ extension class-expr::= ... ∣ extension class-type::= ... ∣ extension
```

وهناك شكل ثانٍ من عقد الامتداد يمكن استعماله في البنى والتواقيع، في لغتي الوحدات والكائنات معًا:

```text
item-extension::= [%% attr-id attr-payload ] definition::= ... ∣ item-extension specification::= ... ∣ item-extension class-field-spec::= ... ∣ item-extension class-field::= ... ∣ item-extension
```

ويتاح شكل وسيط لعقد الامتداد حين تكون الحمولة من النوع نفسه (تعبير مع تعبير، ونمط مع نمط ...).

أمثلة:

```text
let%foo x = 2 in x + 1     === [%foo let x = 2 in x + 1]
begin%foo ... end          === [%foo begin ... end]
x ;%foo 2                  === [%foo x; 2]
module%foo M = ..          === [%%foo module M = ... ]
val%foo x : t              === [%%foo: val x : t]
```

وحين يُستعمل هذا الشكل مع التركيب الوسيط للسمات، تُعدّ السمات مطبَّقة على الحمولة:

```text
fun%foo[@bar] x -> x + 1 === [%foo (fun x -> x + 1)[@bar ] ];
```

وهناك اختصار إضافي `let%foo x in ...` متاح للتيسير حين تُستعمل عقد الامتداد لتنفيذ معاملات الربط (انظر 12.23.4).

وفضلًا عن ذلك، يمكن جمع السلاسل المقتبسة `{|...|}` مع عقد الامتداد لتضمين شذرات من تراكيب أجنبية. ويمكن لمعالج سابق أن يفسّر تلك الشذرات ويحوّلها إلى شيفرة OCaml دون حاجة إلى هروب علامات الاقتباس. وهناك اختصار تركيبي لها:

```text
{%%foo|...|}               === [%%foo{|...|}]
let x = {%foo|...|}        === let x = [%foo{|...|}]
let y = {%foo bar|...|bar} === let y = [%foo{bar|...|bar}]
```

فمثلًا يمكنك استعمال `{%sql|...|}` لتمثيل عبارات SQL عشوائية — بافتراض أن لديك معيد كتابة ppx يعرف امتداد `%sql`.

لاحظ أن الشكل المحدَّد بالكلمات، مثل `{sql|...|sql}`، لا ينبغي استعماله للإشارة إلى أن امتدادًا مستعمل. فالمستعمل لا يستطيع أن يرى من الشيفرة إن كان لهذا المكوّن الحرفي السلسلي دلالة مختلفة عمّا يتوقّع. وفضلًا عن ذلك، فإن إعطاء دلالة لمحدِّد بعينه يقيّد حرية تغيير المحدِّد لتفادي مشكلات الهروب.

### 12.13.1 عقد الامتداد المدمجة

(أُدخلت في OCaml 4.03)

بعض عقد الامتداد يفهمها المترجم نفسه:

- امتدادات `ocaml.extension_constructor` أو `extension_constructor` تأخذ حمولةً بانيًا من نوع متغيّر قابل للتمديد (انظر 12.14) وتعيد خانة باني امتداده.

```ocaml
type t = ..
type t += X of int | Y of string
let x = [%extension_constructor X]
let y = [%extension_constructor Y]
```

```ocaml
#  x <> y;;

- : bool = true
```

- امتدادات `ocaml.atomic.loc` أو `atomic.loc` تأخذ حمولةً تعبير OCaml يدلّ على موقع ذرّي. انظر 9.7.2 لمزيد من التفاصيل.

## 12.14 الأنواع المتغيّرة القابلة للتمديد

(أُدخلت في OCaml 4.02)

```text
type-representation::= ... ∣ = .. specification::= ... ∣ type [type-params] typeconstr type-extension-spec definition::= ... ∣ type [type-params] typeconstr type-extension-def type-extension-spec::= += [private] [|] constr-decl { | constr-decl } type-extension-def::= += [private] [|] constr-def { | constr-def } constr-def::= constr-decl ∣ constr-name = constr
```

الأنواع المتغيّرة القابلة للتمديد هي أنواع متغيّرة يمكن توسيعها ببوانٍ متغيّرة جديدة. تُعرَّف الأنواع المتغيّرة القابلة للتمديد باستعمال `..`، وتُضاف البواني المتغيّرة الجديدة باستعمال `+=`.

```ocaml
module Expr = struct
  type attr = ..

  type attr += Str of string

  type attr +=
    | Int of int
    | Float of float
end
```

تتطلّب مطابقة الأنماط على نوع متغيّر قابل للتمديد حالة افتراضية لمعالجة البواني المتغيّرة غير المعروفة:

```ocaml
let to_string = function
  | Expr.Str s -> s
  | Expr.Int i -> Int.to_string i
  | Expr.Float f -> string_of_float f
  | _ -> "?"
```

من الأمثلة السابقة على نوع متغيّر قابل للتمديد النوع المدمج `exn` المستعمل للاستثناءات. ففي الواقع، يمكن تصريح بواني الاستثناءات بتركيب تمديد الأنواع:

```ocaml
type exn += Exc of int
```

يمكن إعادة ربط بواني المتغيّرات القابلة للتمديد باسم مختلف، وهذا يسمح بتصدير المتغيّرات من وحدة أخرى.

```ocaml
# let not_in_scope = Str "Foo";;

Error: Unbound constructor Str
```

```ocaml
type Expr.attr += Str = Expr.Str
```

```ocaml
# let now_works = Str "foo";;

val now_works : Expr.attr = Expr.Str "foo"
```

يمكن تصريح بواني المتغيّرات القابلة للتمديد بـ `private`. وكما في المتغيّرات العادية، يمنع ذلك بنيها مباشرةً بتطبيق الباني، مع السماح بفكّ بنيتها في مطابقة الأنماط.

```ocaml
module B : sig
  type Expr.attr += private Bool of int
  val bool : bool -> Expr.attr
end = struct
  type Expr.attr += Bool of int
  let bool p = if p then Bool 1 else Bool 0
end
```

```ocaml
# let inspection_works = function
    | B.Bool p -> (p = 1)
    | _ -> true;;

val inspection_works : Expr.attr -> bool = <fun>
```

```ocaml
# let construction_is_forbidden = B.Bool 1;;

Error: Cannot use private constructor Bool to create values of type Expr.attr
```

### 12.14.1 الأنواع المتغيّرة القابلة للتمديد الخاصة

(أُدخلت في OCaml 4.06)

```text
type-representation::= ... ∣ = private ..
```

يمكن تصريح الأنواع المتغيّرة القابلة للتمديد بـ `private`. يمنع ذلك تصريح بوانٍ جديدة مباشرةً، لكنه يسمح بالإشارة إلى بواني التمديد في الواجهات.

```ocaml
module Msg : sig
  type t = private ..
  module MkConstr (X : sig type t end) : sig
    type t += C of X.t
  end
end = struct
  type t = ..
  module MkConstr (X : sig type t end) = struct
    type t += C of X.t
  end
end
```

## 12.15 الموصِّلات التوليدية

(أُدخلت في OCaml 4.02)

```text
module-expr::= ... ∣ functor () -> module-expr ∣ module-expr () definition::= ... ∣ module module-name { ( module-name : module-type ) ∣ () } [ : module-type ] = module-expr module-type::= ... ∣ [functor] () -> module-type specification::= ... ∣ module module-name { ( module-name : module-type ) ∣ () } : module-type
```

يأخذ الموصِّل التوليدي وسيطًا من نوع الوحدة `()`. ولاستعماله، لا بدّ من تطبيقه على وسيط الوحدة هذا، بما يضمن أن تتصرف جميع المكوّنات النوعية في نتيجة الموصِّل تصرّفًا توليديًا، أي أنها تختلف عن الأنواع التي تُحصَل من تطبيقات أخرى للموصِّل نفسه. وهذا مكافئ لأخذ وسيط بتوقيع `sig end` وتطبيقه دومًا على `struct end`، لا على وحدة معرَّفة (إذ يؤدي التطبيق مرتين على الوحدة نفسها في الحالة الأخيرة إلى أنواع متطابقة).

وكأثر جانبي لهذه التوليدية، يُسمح بفكّ حزمة الوحدات من المرتبة الأولى داخل جسم الموصِّلات التوليدية.

## 12.16 التركيب الخاص بالامتدادات فقط

(أُدخل في OCaml 4.02.2، ووُسِّع في 4.03)

تُقبل بعض التراكيب النحوية أثناء التحليل النحوي وتُرفض أثناء فحص الأنواع. لذلك لا يمكن استعمال هذه التراكيب النحوية مباشرةً في OCaml الخالص. غير أنّ معيدات الكتابة `-ppx` وغيرها من الأدوات الخارجية يمكنها استغلال هذا التسامح في المحلّل لتوسيع اللغة بهذه التراكيب النحوية الجديدة بإعادة كتابتها إلى تراكيب خالصة.

### 12.16.1 معاملات الامتداد

(أُدخلت في OCaml 4.02.2، ووُسِّعت لتشمل المعاملات الأحادية في OCaml 4.12.0)

```text
infix-symbol::= ... ∣ # { operator-char } # { operator-char ∣ # } prefix-symbol::= ... ∣ (? ∣ ~ ∣ !) { operator-char } # { operator-char ∣ # }
```

يتوفّر صنفان من المعاملات للامتدادات: معاملات وسيطة يبدأ اسمها بمحرف `#` ويحتوي على أكثر من محرف `#` واحد، ومعاملات أحادية يحتوي اسمها (الذي يبدأ بمحرف `?` أو `~` أو `!`) على محرف `#` واحد على الأقل.

مثال:

```ocaml
# let infix x y = x##y;;

Error: ## is not a valid value identifier.

# let prefix x = !#x;;

Error: !# is not a valid value identifier.
```

لاحظ أن كلا من `##` و`!#` يجب أن يُحذَف بواسطة معيد كتابة ppx لكي يصبح هذا المثال صالحًا.

### 12.16.2 المكوّنات الحرفية للامتدادات

(أُدخل في OCaml 4.03)

```text
float-literal::= ... ∣ [-] (0…9) { 0…9 ∣ _ } [. { 0…9 ∣ _ }] [(e ∣ E) [+ ∣ -] (0…9) { 0…9 ∣ _ }] [g…z ∣ G…Z] ∣ [-] (0x ∣ 0X) (0…9 ∣ A…F ∣ a…f) { 0…9 ∣ A…F ∣ a…f ∣ _ } [. { 0…9 ∣ A…F ∣ a…f ∣ _ }] [(p ∣ P) [+ ∣ -] (0…9) { 0…9 ∣ _ }] [g…z ∣ G…Z] int-literal::= ... ∣ [-] (0…9) { 0…9 ∣ _ }[g…z ∣ G…Z] ∣ [-] (0x ∣ 0X) (0…9 ∣ A…F ∣ a…f) { 0…9 ∣ A…F ∣ a…f ∣ _ } [g…z ∣ G…Z] ∣ [-] (0o ∣ 0O) (0…7) { 0…7 ∣ _ } [g…z ∣ G…Z] ∣ [-] (0b ∣ 0B) (0…1) { 0…1 ∣ _ } [g…z ∣ G…Z]
```

المكوّنات الحرفية للأعداد الصحيحة وأعداد الفاصلة العائمة التي يتبعها معرّف من محرف واحد في المدى من `g` إلى `z` أو من `G` إلى `Z` هي مكوّنات حرفية خاصة بالامتدادات فقط.

## 12.17 السجلات المضمّنة

(أُدخلت في OCaml 4.03)

```text
constr-args::= ... ∣ record-decl
```

يمكن الآن تعريف وسائط بواني أنواع المجموع بالتركيب نفسه المستعمل في السجلات. ويُسمح بالحقول المتغيّرة والحقول متعدّدة الأشكال، كما يدعم تركيب GADT، ويمكن تحديد السمات على الحقول فرادى.

من الناحية النحوية، يشبه بناء البواني التي تأخذ وسيط سجل مضمّن أو مطابقتها التعامل مع باني أحادي وسيطه الوحيد نوع سجل مصرَّح به. ويمكن للنمط أن يربط السجل المضمّن كقيمة زائفة، لكن السجل لا يمكنه الإفلات من نطاق الربط، ولا يمكن استعماله إلا بترميز النقطة لاستخراج الحقول أو تعديلها أو لبناء قيم بوانٍ جديدة.

```ocaml
type t =
  | Point of {width: int; mutable x: float; mutable y: float}
  | Other

let v = Point {width = 10; x = 0.; y = 0.}

let scale l = function
  | Point p -> Point {p with x = l *. p.x; y = l *. p.y}
  | Other -> Other

let print = function
  | Point {x; y; _} -> Printf.printf "%f/%f" x y
  | Other -> ()

let reset = function
  | Point p -> p.x <- 0.; p.y <- 0.
  | Other -> ()
```

```ocaml
let invalid = function
  | Point p -> p

Error: This form is not allowed as the type of the inlined record could escape.
```

## 12.18 تعليقات التوثيق

(أُدخلت في OCaml 4.03)

تعالج التعليقات التي تبدأ بـ `**` معالجة خاصة من المترجم؛ إذ تُحوَّل تلقائيًا أثناء التحليل النحوي إلى سمات (انظر 12.12) لكي تتمكّن الأدوات من معالجتها بوصفها توثيقًا.

يمكن أن تتخذ هذه التعليقات ثلاثة أشكال: *التعليقات الطافية* و*تعليقات العناصر* و*تعليقات الوسوم*. وأي تعليق يبدأ بـ `**` ولا يطابق أحد هذه الأشكال يؤدي إلى إصدار المترجم التحذير 50.

كما يستعمل مولّد التوثيق ocamldoc (انظر 19) التعليقات التي تبدأ بـ `**`. والأشكال الثلاثة التي يتعرّف عليها المترجم مجموعة فرعية من الأشكال التي يقبلها ocamldoc (انظر 19.2).

### 12.18.1 التعليقات الطافية

التعليقات المحاطة بأسطر فارغة والتي تظهر داخل البنى أو التوقيعات أو الأصناف أو أنواع الأصناف تُحوَّل إلى *سمات طافية*. مثال:

```ocaml
type t = T

(** Now some definitions for [t] *)

let mkT = T
```

يتحوّل إلى:

```ocaml
type t = T

[@@@ocaml.text " Now some definitions for [t] "]

let mkT = T
```

### 12.18.2 تعليقات العناصر

التعليقات التي تظهر *مباشرةً قبل* أو *مباشرةً بعد* عنصر بنية أو عنصر توقيع أو عنصر صنف أو عنصر نوع صنف تُحوَّل إلى *سمات عناصر*. ويعني «مباشرةً قبل أو بعد» ألّا تكون بينهما أسطر فارغة ولا `;;` ولا تعليقات توثيق أخرى. مثال:

```ocaml
type t = T
(** A description of [t] *)
```

أو

```ocaml
(** A description of [t] *)
type t = T
```

يتحوّلان إلى:

```ocaml
type t = T
[@@ocaml.doc " A description of [t] "]
```

لاحظ أنه إذا ظهر التعليق مباشرةً بجوار عدة عناصر، كما في:

```ocaml
type t = T
(** An ambiguous comment *)
type s = S
```

فسيُعلَّق بالعنصرين معًا:

```ocaml
type t = T
[@@ocaml.doc " An ambiguous comment "]
type s = S
[@@ocaml.doc " An ambiguous comment "]
```

ويصدر المترجم التحذير 50.

### 12.18.3 تعليقات الوسوم

التعليقات التي تظهر *مباشرةً بعد* وسيط موسوم أو حقل سجل أو باني متغيّر أو دالة كائن أو باني متغيّر متعدّد الأشكال تُحوَّل إلى *سمات*. ويعني «مباشرةً بعد» ألّا تكون بينهما أسطر فارغة ولا تعليقات توثيق أخرى. مثال:

```ocaml
type t1 = lbl:int (** Labelled argument *) -> unit

type t2 = {
  fld: int; (** Record field *)
  fld2: float;
}

type t3 =
  | Cstr of string (** Variant constructor *)
  | Cstr2 of string

type t4 = < meth: int * int; (** Object method *) >

type t5 = [
  `PCstr (** Polymorphic variant constructor *)
]
```

يتحوّل إلى:

```ocaml
type t1 = lbl:(int [@ocaml.doc " Labelled argument "]) -> unit

type t2 = {
  fld: int [@ocaml.doc " Record field "];
  fld2: float;
}

type t3 =
  | Cstr of string [@ocaml.doc " Variant constructor "]
  | Cstr2 of string

type t4 = < meth : int * int [@ocaml.doc " Object method "] >

type t5 = [
  `PCstr [@ocaml.doc " Polymorphic variant constructor "]
]
```

لاحظ أن تعليقات الوسوم لها الأسبقية على تعليقات العناصر، لذلك:

```ocaml
type t = T of string
(** Attaches to T not t *)
```

يتحوّل إلى:

```ocaml
type t =  T of string [@ocaml.doc " Attaches to T not t "]
```

بينما:

```ocaml
type t = T of string
(** Attaches to T not t *)
(** Attaches to t *)
```

يتحوّلان إلى:

```ocaml
type t =  T of string [@ocaml.doc " Attaches to T not t "]
[@@ocaml.doc " Attaches to t "]
```

وفي حال غياب تعليق ذي معنى على الباني الأخير في نوع ما، يمكن استعمال تعليق فارغ `(**)` بدلًا منه:

```ocaml
type t = T of string
(**)
(** Attaches to t *)
```

يتحوّل مباشرةً إلى

```ocaml
type t =  T of string
[@@ocaml.doc " Attaches to t "]
```

## 12.19 معاملات الفهرسة الموسّعة

(أُدخلت في 4.06)

```text
dot-ext::= ∣ dot-operator-char { operator-char } dot-operator-char::= ! ∣ ? ∣ core-operator-char ∣ % ∣ : expr::= ... ∣ expr . [module-path .] dot-ext ( ( expr ) ∣ [ expr ] ∣ { expr } ) [ <- expr ] operator-name::= ... ∣ . dot-ext (() ∣ [] ∣ {}) [<-]
```

يوفّر هذا الامتداد سكرًا نحويًا لجلب عناصر الأنواع المفهرسة المعرَّفة من المستخدم وضبطها. فمثلًا يمكننا تعريف قواميس شبيهة بقواميس بايثون بـ

```ocaml
module Dict = struct
include Hashtbl
let ( .%{} ) tabl index = find tabl index
let ( .%{}<- ) tabl index value = add tabl index value
end
let dict =
  let dict = Dict.create 10 in
  let () =
    dict.Dict.%{"one"} <- 1;
    let open Dict in
    dict.%{"two"} <- 2 in
  dict
```

```ocaml
# dict.Dict.%{"one"};;

- : int = 1

# let open Dict in dict.%{"two"};;

- : int = 2
```

### 12.19.1 ترميز الفهارس المتعددة

```text
expr::= ... ∣ expr . [module-path .] dot-ext ( expr { ; expr }⁺ ) [ <- expr ] ∣ expr . [module-path .] dot-ext [ expr { ; expr }⁺ ] [ <- expr ] ∣ expr . [module-path .] dot-ext { expr { ; expr }⁺ } [ <- expr ] operator-name::= ... ∣ . dot-ext ((;..) ∣ [;..] ∣ {;..}) [<-]
```

تُدعَم الفهارس المتعددة أيضًا عبر صيغة ثانية من معاملات الفهرسة

```ocaml
let (.%[;..]) = Bigarray.Genarray.get
let (.%{;..}) = Bigarray.Genarray.get
let (.%(;..)) = Bigarray.Genarray.get
```

وهي تُستدعى عندما تحتوي المكوّنات الحرفية للفهرس على قائمة تعابير مفصولة بفواصل منقوطة بعنصرين أو أكثر:

```ocaml
let sum x y = x.%[1;2;3] + y.%[1;2]
(* is equivalent to *)
let sum x y = (.%[;..]) x [|1;2;3|] + (.%[;..]) y [|1;2|]
```

وعلى وجه الخصوص، يجعل ترميز الفهارس المتعددة هذا من الممكن معالجة Genarray وغيرها من تطبيقات المصفوفات متعددة الأبعاد معالجة موحّدة.

```ocaml
module A = Bigarray.Genarray
let (.%{;..}) = A.get
let (.%{;..}<- ) = A.set
let (.%{ }) a k = A.get a [|k|]
let (.%{ }<-) a k x = A.set a [|k|] x
let syntax_compare vec mat t3 t4 =
          vec.%{0} = A.get vec [|0|]
   &&   mat.%{0;0} = A.get mat [|0;0|]
   &&   t3.%{0;0;0} = A.get t3 [|0;0;0|]
   && t4.%{0;0;0;0} = t4.{0,0,0,0}
```

احذر من أن التفريق بين معاملات الفهارس المتعددة ومعاملات الفهرس الواحد تفريق نحوي بحت: فمعاملات الفهارس المتعددة محصورة في تعابير الفهرسة التي تحتوي على فاصلة منقوطة واحدة أو أكثر `;`. مثلًا،

```ocaml
  let pair vec mat = vec.%{0}, mat.%{0;0}
```

مكافئ لـ

```ocaml
  let pair vec mat = (.%{ }) vec 0, (.%{;..}) mat [|0;0|]
```

لاحظ أننا في حالة `vec` نستدعي معامل الفهرس الواحد `(.%{})` لا صيغة الفهارس المتعددة `(.{;..})`. ولهذا يُتوقَّع أن يحتاج معظم مستعملي معاملات الفهارس المتعددة إلى تعريف صيغة الفهرس الواحد معًا

```ocaml
let (.%{;..}) = A.get
let (.%{ }) a k = A.get a [|k|]
```

لمعالجة الحالتين على نحو موحّد.

## 12.20 أنواع المتغيّرات الفارغة

(أُدخلت في 4.07.0)

```text
type-representation::= ... ∣ = |
```

يسمح هذا الامتداد للمستخدم بتعريف أنواع متغيّرات فارغة. ويمكن إزالة نوع المتغيّر الفارغ بحالة دحض في مطابقة الأنماط.

```ocaml
type t = |
let f (x: t) = match x with _ -> .
```

## 12.21 التنبيهات

(أُدخلت في 4.08)

منذ OCaml 4.08، أصبح من الممكن وسم المكوّنات (كتصريحات القيم أو الأنواع) في التوقيعات «بتنبيهات» تُبلَّغ عند الإشارة إلى تلك المكوّنات. وهذا يعمّم فكرة المكوّنات «المهجورة» التي كانت تُبلَّغ سابقًا بوصفها التحذير 3. ويمكن استعمال هذه التنبيهات مثلًا للإبلاغ عن استعمال ميزات غير آمنة، أو ميزات لا تتوفّر إلا على بعض المنصّات، وما إلى ذلك.

تُعرَّف فئات التنبيهات بمعرّف رمزي (معرّف بحروف صغيرة يتبع القواعد المعجمية المعتادة) وبرسالة اختيارية. ويُستعمل المعرّف للتحكّم في التنبيهات الممكَّنة وفي تلك التي تُحوَّل إلى أخطاء قاتلة، بينما تُبلَّغ الرسالة إلى المستخدم عند إطلاق التنبيه (أي عند الإشارة إلى المكوّن الموسوم).

تؤدي السمة `ocaml.alert` أو `alert` غرضين: (أولًا) وسم مكوّن بتنبيه يُطلَق عند الإشارة إليه، و(ثانيًا) التحكّم في التنبيهات الممكَّنة.

### 12.21.1 وسم مكوّن

عند وسم مكوّن، تأخذ السمة معرّفًا يتبعه اختياريًا نصّ رسالة. وفي ما يلي مثال على تصريح قيمة موسومة بتنبيه:

```ocaml
module U: sig
  val fork: unit -> bool
    [@@alert unix "This function is only available under Unix."]
end
```

هنا `unix` هو معرّف التنبيه. وإذا كانت فئة التنبيه هذه ممكَّنة، فسيُنتج أيّ إشارة إلى `U.fork` رسالةً وقت الترجمة، يمكن تحويلها أو عدم تحويلها إلى خطأ قاتل.

أما بالنسبة إلى بقية مكوّنات البنى أو التوقيعات، فالتركيب كما يلي:

```ocaml
module type Sig = sig
  val v: int [@@alert name]
end

let v [@alert name] = 1
let `A (v [@alert name]) = `A 1

external e : int -> int = "c_function" [@@alert name]

type t1 = A | B [@@alert name]
(* N.B.: this only alerts on use of "t1", not uses of the constructors "A"
   and "B". So let x = A wouldn't alert, so long as you don't write down its
   type. *)

type t2 = A | B [@alert name]
(* Alerts on use of "B", but not "A" nor "t2". Note the single "@". *)

type t3 = { a : int; b : int [@alert name] }
(* Alerts on use of "b", but not "a" nor "t3". Note the single "@". *)

exception E of int [@alert name]
(* Alerts on use of "E". Note the single "@". *)

module M = struct end [@@alert name]
module type S = sig end [@@alert name]
class c1 = object end [@@alert name]
class type c2 = object end [@@alert name]
```

عند إكراه المُنمِّط توقيعًا يحمل تنبيهات إلى توقيع يحمل تنبيهات مختلفة:

```ocaml
module M : sig
  val x : int
  val y : int [@@alert name]
end = struct
  let x [@alert name] = 0
  let y = 1
end
```

فإن أيّ تنبيه لا يُمرَّر عبرها، أي التنبيه على `x` هنا، يُطلَق.

وأخيرًا، للتنبيه عند الإشارة إلى الوحدة المقابلة لملف، يمكن كتابة سمة طافية في أعلى ملف «.mli» (أي قبل أيّ عنصر آخر غير سمة)، أو في أعلى ملف «.ml» في حال عدم وجود ملف «.mli»:

```ocaml
[@@@alert unsafe "This module is unsafe!"]
```

### 12.21.2 التحكّم في التنبيهات الممكَّنة

يتمّ التحكّم في التنبيهات الممكَّنة وفي تحويلها إلى أخطاء قاتلة إما بخيار سطر أوامر المترجم `-alert <spec>` أو محليًا في الشيفرة عبر السمة `alert` أو `ocaml.alert` التي تأخذ حمولة سلسلة واحدة هي `<spec>`. وفي كلتا الحالتين، يكون تركيب `<spec>` سلسلة من العناصر بالشكل التالي:

- `+id` يمكّن التنبيه `id`.

- `-id` يعطّل التنبيه `id`.

- `++id` يحوّل التنبيه `id` إلى خطأ قاتل.

- `--id` يعيد التنبيه `id` إلى النمط غير القاتل.

- `@id` مكافئ لـ `++id+id` (يمكّن `id` ويحوّله إلى خطأ قاتل)

وكحالة خاصة، إذا كان `id` هو `all` فإنه يعني جميع التنبيهات.

وفي ما يلي بعض الأمثلة:

```text
(* Disable all alerts, reenables just unix (as a soft alert) and window
   (as a fatal-error), for the rest of the current structure *)

[@@@alert "-all--all+unix@window"]
 ...

let x =
  (* Locally disable the window alert *)
  begin[@alert "-window"]
      ...
  end
```

### 12.21.3 تركيب مختصر للإهجار

قبل OCaml 4.08 كان هناك دعم لنوع واحد من تنبيهات الإهجار. ويُعرف الآن باسم تنبيه `deprecated`، لكن السمات القديمة لإطلاقه والطرائق القديمة للتحكّم فيه بوصفه التحذير 3 ما تزال مدعومة. فمثلًا، تمرير `-w +3` في سطر الأوامر مكافئ لـ `-alert +deprecated`، كما أنّ:

```ocaml
val x: int
  [@@ocaml.deprecated "Please do something else"]
```

مكافئ لـ:

```ocaml
val x: int
  [@@ocaml.alert deprecated "Please do something else"]
```

## 12.22 عبارات open المعمّمة

(أُدخلت في 4.08)

```text
definition::= ... ∣ open module-expr ∣ open! module-expr specification::= ... ∣ open extended-module-path ∣ open! extended-module-path expr::= ... ∣ let open module-expr in expr ∣ let open! module-expr in expr
```

يجعل هذا الامتداد من الممكن فتح أيّ تعبير وحدة في بنى الوحدات وتعبيراتها. وتتوفر آلية مشابهة أيضًا داخل أنواع الوحدات، لكن لمسارات الوحدات الموسّعة فقط (مثل `F(X).G(Y)`).

فمثلًا، يمكن تقييد وحدة عند فتحها بـ

```ocaml
module M = struct let x = 0 let hidden = 1 end
open (M:sig val x: int end)
let y = hidden

Error: Unbound value hidden
```

ومن الاحتمالات الأخرى فتح نتيجة تطبيق موصِّل فورًا

```ocaml
  let sort (type x) (x:x list) =
    let open Set.Make(struct type t = x let compare=compare end) in
    elements (of_list x)

val sort : 'x list -> 'x list = <fun>
```

وبالذهاب أبعد، يمكن لهذا التركيب إدخال مكوّنات محلية داخل بنية،

```ocaml
module M = struct
  let x = 0
  open! struct
    let x = 0
    let y = 1
  end
  let w = x + y
end

module M : sig val x : int val w : int end
```

وثمّة قيد مهم هو أن الأنواع التي يدخلها `open` `struct` ... `end` لا يمكن أن تظهر في توقيع البنية الحاوية، إلا إذا كانت معرَّفة بوصفها مساوية لنوع غير محلي. لذلك:

```ocaml
module M = struct
  open struct type 'a t = 'a option = None | Some of 'a end
  let x : int t = Some 1
end

module M : sig val x : int option end
```

مقبول، لكن:

```ocaml
module M = struct
  open struct type t = A end
  let x = A
end

Error: The type t introduced by this open appears in the signature.
  The value x has no valid type if t is hidden.
```

غير مقبول، لأن `x` لا يمكن أن يُعطى نوعًا آخر غير `t`، وهو نوع موجود محليًا فقط. ومع ذلك، سيكون ما سبق مقبولًا لو كان `x` هو نفسه محليًا:

```ocaml
module M: sig end = struct
  open struct
  type t = A
  end
  …
  open struct let x = A end
  …
end

module M : sig end
```

داخل التوقيعات، تُحصر عبارات الفتح الموسّعة في مسارات الوحدات الموسّعة،

```ocaml
module type S = sig
  module F: sig end -> sig type t end
  module X: sig end
  open F(X)
  val f: t
end

module type S =
  sig
    module F : sig end -> sig type t end
    module X : sig end
    val f : F(X).t
  end
```

وليس في

```text
  open struct type t = int end
```

وفي تلك الحالات، يمكن استعمال الإحلالات المحلية (انظر 12.7.2) بدلًا منها.

احذر من أن هذا الامتداد غير متاح داخل تعريفات الأصناف:

```text
class c =
  let open Set.Make(Int) in
  ...
```

## 12.23 معاملات الربط

(أُدخلت في 4.08.0)

```text
let-operator::= ∣ let (core-operator-char ∣ <) { dot-operator-char } and-operator::= ∣ and (core-operator-char ∣ <) { dot-operator-char } operator-name ::= ... ∣ let-operator ∣ and-operator letop-binding ::= pattern = expr ∣ value-name expr::= ... ∣ let-operator letop-binding { and-operator letop-binding } in expr
```

توفّر معاملات الربط سكرًا نحويًا يعرّض دوال المكتبة بصيغة (أو بصيغة متغيّرة) من التركيب المألوف للكلمات المحجوزة القياسية. و«معاملات الربط» المدعومة حاليًا هي `let<op>` و`and<op>`، حيث `<op>` رمز معامل، مثل `and+$`.

أُدخلت معاملات الربط لتوفير تركيب ملائم للعمل مع المونادات والموصِّلات التطبيقية؛ ومن أجلها نقترح اصطلاحات تستعمل المعاملين `*` و`+` على الترتيب. ويمكن استعمالها لأغراض أخرى، لكن ينبغي أن يبقى في الذهن أن كل ترميز جديد غير مألوف يجعل البرامج أصعب فهمًا لغير الخبراء. ونتوقّع أن تُطوَّر اصطلاحات جديدة مع الوقت على عائلات أخرى من المعاملات.

### 12.23.1 أمثلة

يمكن للمستخدمين تعريف *معاملات let*:

```ocaml
let ( let* ) o f =
  match o with
  | None -> None
  | Some x -> f x

let return x = Some x

val ( let* ) : 'a option -> ('a -> 'b option) -> 'b option = <fun>
val return : 'a -> 'a option = <fun>
```

ثم تطبيقها بهذا التركيب الملائم:

```ocaml
let find_and_sum tbl k1 k2 =
  let* x1 = Hashtbl.find_opt tbl k1 in
  let* x2 = Hashtbl.find_opt tbl k2 in
    return (x1 + x2)

val find_and_sum : ('a, int) Hashtbl.t -> 'a -> 'a -> int option = <fun>
```

وهو مكافئ لهذه الصيغة الموسّعة:

```ocaml
let find_and_sum tbl k1 k2 =
  ( let* ) (Hashtbl.find_opt tbl k1)
    (fun x1 ->
       ( let* ) (Hashtbl.find_opt tbl k2)
         (fun x2 -> return (x1 + x2)))

val find_and_sum : ('a, int) Hashtbl.t -> 'a -> 'a -> int option = <fun>
```

ويمكن للمستخدمين أيضًا تعريف *معاملات and*:

```ocaml
module ZipSeq = struct

  type 'a t = 'a Seq.t

  open Seq

  let rec return x =
    fun () -> Cons(x, return x)

  let rec prod a b =
    fun () ->
      match a (), b () with
      | Nil, _ | _, Nil -> Nil
      | Cons(x, a), Cons(y, b) -> Cons((x, y), prod a b)

  let ( let+ ) f s = map s f
  let ( and+ ) a b = prod a b

end

module ZipSeq :
  sig
    type 'a t = 'a Seq.t
    val return : 'a -> 'a Seq.t
    val prod : 'a Seq.t -> 'b Seq.t -> ('a * 'b) Seq.t
    val ( let+ ) : 'a Seq.t -> ('a -> 'b) -> 'b Seq.t
    val ( and+ ) : 'a Seq.t -> 'b Seq.t -> ('a * 'b) Seq.t
  end
```

لدعم التركيب:

```ocaml
open ZipSeq
let sum3 z1 z2 z3 =
  let+ x1 = z1
  and+ x2 = z2
  and+ x3 = z3 in
    x1 + x2 + x3

val sum3 : int Seq.t -> int Seq.t -> int Seq.t -> int Seq.t = <fun>
```

وهو مكافئ لهذه الصيغة الموسّعة:

```ocaml
open ZipSeq
let sum3 z1 z2 z3 =
  ( let+ ) (( and+ ) (( and+ ) z1 z2) z3)
    (fun ((x1, x2), x3) -> x1 + x2 + x3)

val sum3 : int Seq.t -> int Seq.t -> int Seq.t -> int Seq.t = <fun>
```

### 12.23.2 الاصطلاحات

ينبغي أن يوفّر الموصِّل التطبيقي وحدةً تنفّذ الواجهة التالية:

```ocaml
module type Applicative_syntax = sig
  type 'a t
  val ( let+ ) : 'a t -> ('a -> 'b) -> 'b t
  val ( and+ ): 'a t -> 'b t -> ('a * 'b) t
end
```

حيث يُربط `(let+)` بعملية `map` ويُربط `(and+)` بعملية الجداء المونويدي.

وينبغي أن يوفّر الموناد وحدةً تنفّذ الواجهة التالية:

```ocaml
module type Monad_syntax = sig
  include Applicative_syntax
  val ( let* ) : 'a t -> ('a -> 'b t) -> 'b t
  val ( and* ): 'a t -> 'b t -> ('a * 'b) t
end
```

حيث يُربط `(let*)` بعملية `bind`، ويُربط `(and*)` أيضًا بعملية الجداء المونويدي.

### 12.23.3 قواعد إزالة السكر العامة

الصيغة

```text
let<op0>
  x1 = e1
and<op1>
  x2 = e2
and<op2>
  x3 = e3
in e
```

تُزال منها الحلوى فتصير

```text
( let<op0> )
  (( and<op2> )
    (( and<op1> )
      e1
      e2)
    e3)
  (fun ((x1, x2), x3) -> e)
```

وهذا يعمل بطبيعة الحال مع أيّ عدد من معاملات `and` المتداخلة. ويمكن التعبير عن القاعدة العامة بتكرار خطوات التبسيط التالية:

- يمكن إزالة سكر أول معامل `and` بتحويله إلى تطبيق دالة

`let<op0> x1 = e1 and<op1> x2 = e2 and... in e`

`let<op0> (x1, x2) = ( and<op1> ) e1 e2 and... in e`

- وبعد تبسيط جميع معاملات `and` وإزالة سكرها، يمكن إزالة سكر معامل `let` بتحويله إلى تطبيق

`let<op> x1 = e1 in e`

`( let<op> ) e1 (fun x1 -> e)`

لاحظ أن القواعد النحوية تسمح بمزج رموز معاملات مختلفة في الربط نفسه (`<op0>` و`<op1>` و`<op2>` قد تكون متمايزة)، لكننا نوصي بشدّة بواجهات برمجية تستعمل فيها معاملات let ومعاملات and المتعاونة الرمز نفسه.

### 12.23.4 الترميز المختصر لربط المتغيّرات (let-punning)

(أُدخل في 4.13.0)

عندما يكون التعبير المرتبط متغيّرًا، قد يكون من الملائم استعمال الترميز المختصر `let+ x in ...`، الذي يتمدد إلى `let+ x = x in ...`. وهذا الترميز، المعروف أيضًا باسم let-punning، يسمح بكتابة الدالة `sum3` أعلاه على نحو أوجز:

```ocaml
open ZipSeq
let sum3 z1 z2 z3 =
  let+ z1 and+ z2 and+ z3 in
  z1 + z2 + z3

val sum3 : int Seq.t -> int Seq.t -> int Seq.t -> int Seq.t = <fun>
```

ويدعم هذا الترميز أيضًا في عقد الامتداد، فيتمدد `let%foo x in ...` إلى `let%foo x = x in ...`. غير أنه، تفاديًا للالتباس، لا يُدعم هذا الترميز في روابط `let` العادية.

## 12.24 معالجات الآثار

(أُدخلت في 5.0، وأُدخل الدعم النحوي للمعالجات العميقة في 5.3)

```text
pattern::= ... ∣ effect pattern, value-name
```

معالجات الآثار آلية للبرمجة المعيارية بآثار يعرّفها المستخدم. وتتيح للمبرمجين وصف *حسابات* *تنفّذ* *عمليات* ذات أثر، يوصف معناها *بمعالجات* تحيط بتلك الحسابات. ومعالجات الآثار تعميم لمعالجات الاستثناءات، وتمكّن من التعبير عن آليات تحكّم في التدفّق غير محلية — كالاستثناءات القابلة للاستئناف والخيوط الخفيفة والبرامج المتناوبة والمولّدات والإدخال/الإخراج غير المتزامن — تعبيرًا قابلًا للتركيب. وسنرى في هذا الدرس كيف يمكن بناء بعض هذه الآليات باستعمال معالجات الآثار.

### 12.24.1 الأساسيات

لفهم الأساسيات، لنعرّف أثرًا (أي عملية) يأخذ وسيطًا صحيحًا ويعيد نتيجة صحيحة. ونسمّي هذا الأثر `Xchg`.

```ocaml
open Effect
open Effect.Deep

type _ Effect.t += Xchg: int -> int t
let comp1 () = perform (Xchg 0) + perform (Xchg 1)
```

نصرّح بأثر التبادل `Xchg` بتمديد النوع المتغيّر القابل للتمديد المعرَّف مسبقًا `Effect.t` ببانٍ جديد هو `Xchg: int -> int t`. ويمكن قراءة التصريح حدسيًا كما يلي: «يأخذ الأثر `Xchg` وسيطًا صحيحًا، وعند تنفيذ هذا الأثر يعيد عددًا صحيحًا». والحساب `comp1` ينفّذ الأثر مرتين باستعمال البدائية `perform` ويعيد مجموعهما.

يمكننا معالجة الأثر `Xchg` بتنفيذ معالج يعيد دومًا خَلَف القيمة المعروضة:

```ocaml
try comp1 () with
| effect (Xchg n), k -> continue k (n+1)

- : int = 3
```

نُشغّل الحساب `comp1 ()` تحت معالج أثار يعالج الأثر `Xchg` باستمرار مربوط بـ `k`. وهنا `effect` كلمة محجوزة تدلّ على أن النمط `Xchg n` يطابق آثارًا لا استثناءات. وكما ذُكر آنفًا، فمعالجات الآثار تعميم لمعالجات الاستثناءات: فكما في معالجات الاستثناءات، عندما ينفّذ الحساب الأثر `Xchg` يقفز التحكّم إلى المعالج المقابل، وتُمرَّر الآثار غير المعالجة إلى المعالج الخارجي. غير أن المعالج يُزوَّد، خلافًا لمعالجات الاستثناءات، بالاستمرار المحدَّد `k` أيضًا، وهو يمثّل الحساب المعلَّق بين موضع `perform` وهذا المعالج.

ويستعمل المعالج البدائية `continue` لاستئناف الحساب المعلَّق بخَلَف القيمة المعروضة. ففي هذا المثال، ينفّذ الحساب `comp1` الأثرين `Xchg 0` و`Xchg 1` ويتلقّى القيمتين `1` و`2` من المعالج على الترتيب، ولذلك يُقيَّم التعبير كله إلى `3`.

ونستعمل في هذا المثال النسخة *العميقة* من معالجات الآثار، لا النسخة *السطحية*. فالمعالج العميق يراقب حسابًا حتى ينتهي (سواء انتهى انتهاءً عاديًا أو باستثناء)، ويعالج جميع الآثار التي ينفّذها الحساب (على التوالي). أما المعالج السطحي فيراقب حسابًا حتى ينتهي أو حتى ينفّذ أثرًا واحدًا، ولا يعالج إلا هذا الأثر الواحد. وفي الحالات التي تصلح فيها المعالجات العميقة، يُفضَّل استعمالها عادةً. وسيُناقش مثال يستعمل المعالجات السطحية لاحقًا في 12.24.6.

### 12.24.2 التزامن

تنبع قوّة معالجات الآثار التعبيرية من الاستمرار المحدَّد. فبينما استأنف المثال السابق الحساب فورًا، يمكن استئناف الحساب لاحقًا وتشغيل حساب آخر في الأثناء. فلنوسّع المثال السابق وننفّذ تزامنًا بتمرير الرسائل بين حسابين متزامنين باستعمال الأثر `Xchg`. ونسمّي هذين الحسابين المتزامنين *مهمّتين*.

تكون المهمة إما في حالة معلَّقة وإما مكتملة. ونمثّل حالة المهمة كما يلي:

```ocaml
type 'a status =
  Complete of 'a
| Suspended of {msg: int; cont: (int, 'a status) continuation}
```

تكون المهمة إما مكتملة، بنتيجة من النوع `'a`، وإما معلَّقة برسالة `msg` تُرسل واستمرار `cont`. والنوع `(int,'a status) continuation` يقول إن الحساب المحدَّد المعلَّق ينتظر قيمة من النوع `int` للاستئناف، ويعيد قيمة من النوع `'a status` عند استئنافه.

بعد ذلك نعرّف دالة `step` تنفّذ خطوة واحدة من الحساب حتى يكتمل أو يُعلَّق:

```ocaml
let step (f : unit -> 'a) () : 'a status =
  match f () with
  | v -> Complete v
  | effect (Xchg msg), cont -> Suspended {msg; cont}
```

وسيط الدالة `step`، أي `f`، حساب يمكنه تنفيذ الأثر `Xchg` ويعيد نتيجة من النوع `'a`. والدالة `step` نفسها تعيد قيمة من النوع `'a status`. وكما يدعم OCaml أنماط الاستثناءات في تعبير `match ... with` (11.6)، يدعم أيضًا أنماط `effect`. وهنا نطابق نتيجة تشغيل الحساب `f`: فإن عاد الحساب بقيمة `v` أعدنا `Complete v`، وإن نفّذ الأثر `Xchg msg` بالاستمرار `cont` أعدنا `Suspended {msg;cont}`. وفي هذه الحالة لا يستدعي المعالج الاستمرار `cont` فورًا، بل يخزّنه في بنية بيانات لاستعماله لاحقًا.

ولأن الدالة `step` تعالج الأثر `Xchg`، فإن `step f` حساب لا ينفّذ الأثر `Xchg`، وإن كان قد ينفّذ آثارًا أخرى. وفضلًا عن ذلك، ولأننا نستعمل معالجات عميقة، فإن الاستمرار `cont` المخزَّن في الحالة لا ينفّذ الأثر `Xchg`.

يمكننا الآن كتابة مجدول بسيط يشغّل مهمتين حتى الاكتمال:

```ocaml
let rec run_both a b =
  match a (), b () with
  | Complete va, Complete vb -> (va, vb)
  | Suspended {msg = m1; cont = k1},
    Suspended {msg = m2; cont = k2} ->
      run_both (fun () -> continue k1 m2)
               (fun () -> continue k2 m1)
  | _ -> failwith "Improper synchronization"
```

قد تصل كلتا المهمتين إلى الاكتمال، وقد تعرض كلتاهما تبادل رسالة. وفي الحالة الأخيرة يتلقّى كل حساب القيمة التي يعرضها الحساب الآخر. أما الحالة التي يعرض فيها حساب تبادلًا بينما ينتهي الحساب الآخر فتُعدّ خطأً من المبرمج، وتدفع المعالج إلى رفع استثناء.

يمكننا الآن تعريف حساب ثانٍ يتبادل رسالتين أيضًا:

```ocaml
let comp2 () = perform (Xchg 21) * perform (Xchg 21)
```

وأخيرًا يمكننا تشغيل الحسابين معًا:

```ocaml
run_both (step comp1) (step comp2)

- : int * int = (42, 0)
```

يعرض الحساب `comp1` القيمتين `0` و`1` ويتلقّى في المقابل القيمتين `21` و`21`، فيجمعهما منتجًا `42`. ويعرض الحساب `comp2` القيمتين `21` و`21` ويتلقّى في المقابل القيمتين `0` و`1`، فيضربهما منتجًا `0`. والتواصل بين الحسابين مبرمَج بكامله داخل `run_both`. فتعريفا `comp1` و`comp2` وحدهما لا يعطيان الأثر `Xchg` أيّ معنى.

### 12.24.3 الخيوط على مستوى المستخدم

لنوسّع المثال السابق إلى عدد اعتباطي من المهام. فكثير من اللغات، مثل GHC Haskell وGo، توفّر الخيوط على مستوى المستخدم بوصفها ميزة أولية منفَّذة في نظام التشغيل. وبمعالجات الآثار، يمكن تنفيذ الخيوط على مستوى المستخدم ومجدولاتها في OCaml نفسه. وأنظمة الخيوط على مستوى المستخدم توفّر عادةً بدائية `fork` لتوليد مهمة متزامنة جديدة، وبدائية `yield` للتخلّي عن التحكّم لمهمة أخرى. وبالمقابل سنصرّح بأثرين كما يلي:

```ocaml
type _ Effect.t += Fork : (unit -> unit) -> unit t
                 | Yield : unit t
```

يأخذ الأثر `Fork` دالة مؤجّلة (thunk، أي حساب معلَّق ممثَّل بدالة من النوع `unit -> unit`) ويعيد وحدةً إلى المنفّذ. أما الأثر `Yield` فبلا وسائط، ويعيد وحدةً عند تنفيذه. ولنفترض أن مهمة تنفّذ الأثر `Xchg` يمكن أن تتطابق مع أيّ مهمة أخرى تعرض تبادل قيمة.

كما سنعرّف دوال مساعدة تنفّذ هذه الآثار ببساطة:

```ocaml
let fork f = perform (Fork f)
let yield () = perform Yield
let xchg v = perform (Xchg v)
```

وتعرّف دالة `run` العليا المجدول:

```ocaml
(* A concurrent round-robin scheduler *)
let run (main : unit -> unit) : unit =
  let exchanger : (int * (int, unit) continuation) option ref =
    ref None (* waiting exchanger *)
  in
  let run_q = Queue.create () in (* scheduler queue *)
  let enqueue k v =
    let task () = continue k v in
    Queue.push task run_q
  in
  let dequeue () =
    if Queue.is_empty run_q then () (* done *)
    else begin
      let task = Queue.pop run_q in
      task ()
    end
  in
  let rec spawn (f : unit -> unit) : unit =
    match f () with
    | () -> dequeue ()
    | exception e ->
        print_endline (Printexc.to_string e);
        dequeue ()
    | effect Yield, k -> enqueue k (); dequeue ()
    | effect (Fork f), k -> enqueue k (); spawn f
    | effect (Xchg n), k ->
        begin match !exchanger with
        | Some (n', k') -> exchanger := None; enqueue k' n; continue k n'
        | None -> exchanger := Some (n, k); dequeue ()
        end
  in
  spawn main
```

نستعمل طابورًا قابلًا للتغيير `run_q` لحمل طابور المجدول. ويتيح الطابور (FIFO) جدولة المهام بالتناوب الدوري في المجدول. وتُدخل `enqueue` المهام في الطابور، وتستخرج `dequeue` المهام منه وتشغّلها. وتحمل الخانة المرجعية `exchanger` مهمةً (معلَّقة) تعرض تبادل قيمة؛ ويكون في أيّ لحظة إما صفر مهمة معلَّقة معروضة للتبادل وإما مهمة واحدة.

والدالة `spawn` هي التي تقوم بالعمل الشاق: فهي تشغّل الحساب المعطى `f` داخل معالج أثار. فإن عاد `f` بقيمة الوحدة، أخرجنا المهمة التالية من طابور المجدول وشغّلناها. وإن رفع الحساب `f` أيّ استثناء، طبعنا الاستثناء إلى الخرج القياسي وشغّلنا المهمة التالية من المجدول.

وقد ينفّذ الحساب `f` آثارًا أيضًا. فإن نفّذ الأثر `Yield`، عُلِّقت المهمة الحالية (وأُدخلت في طابور المهام الجاهزة) وشُغّلت المهمة التالية من طابور المجدول. وإن كان الأثر `Fork f`، عُلِّقت المهمة الحالية ونُفِّذت المهمة الجديدة `f` فورًا باستدعاء ذيلي إلى `spawn f`. ولاحظ أن اختيار تشغيل المهمة الجديدة أولًا اختيار اعتباطي؛ إذ كان يمكننا بدلًا من ذلك إدخال مهمة `f` في طابور الجاهزين واستئناف `k` فورًا.

وإن كان الأثر `Xchg`، فنتحقّق أولًا مما إذا كانت هناك مهمة تنتظر التبادل: فإن وُجدت أدخلنا المهمة المنتظرة في الطابور بالقيمة المعروضة الآن، واستأنفنا المهمة الحالية فورًا بالقيمة المعروضة. وإن لم توجد جعلنا المهمة الحالية هي المتبادِل المنتظر، وشغّلنا المهمة التالية من طابور المجدول.

ويمكننا الآن كتابة برنامج متزامن يستعمل العمليات المعرَّفة حديثًا:

```ocaml
open Printf

let _ = run (fun _ ->
  fork (fun _ ->
    printf "[t1] Sending 0\n";
    let v = xchg 0 in
    printf "[t1] received %d\n" v);
  fork (fun _ ->
    printf "[t2] Sending 1\n";
    let v = xchg 1 in
    printf "[t2] received %d\n" v))

[t1] Sending 0
[t2] Sending 1
[t2] received 0
[t1] received 1
```

لاحظ أن رسائل المهمتين متشابكة. ولاحظ أيضًا أن الشذرة أعلاه لا تشير إلى معالجات الآثار وتأتي في النمط المباشر (دون عمليات مونادية). ويوضّح هذا المثال أنه، بمعالجات الآثار، يمكن لشيفرة المستخدم في برنامج متزامن أن تبقى في نمط مباشر بسيط، وأن يُحتوى استعمال معالجات الآثار بكامله داخل تنفيذ مكتبة التزامن.

#### الاستئناف باستثناء

فضلًا عن استئناف استمرار بقيمة، تسمح معالجات الآثار أيضًا بالاستئناف برفع أثر عند موضع perform. ويُفعل ذلك بمساعدة البدائية `discontinue`، التي تساعد على ضمان تحرير الموارد في النهاية دومًا، حتى في حضور الآثار.

خذ مثلًا عملية `dequeue` في المثال السابق، المعادة هنا:

```ocaml
…
let dequeue () =
  if Queue.is_empty run_q then () (* done *)
  else (Queue.pop run_q) ()
```

إذا كان طابور المجدول فارغًا، عدّت `dequeue` أن المجدول قد انتهى وعادت إلى المستدعي. غير أنه قد تبقى مهمة تنتظر تبادل قيمة (مخزَّنة في الخانة المرجعية `exchanger`)، فتبقى محجوبةً إلى الأبد! وإن كانت المهمة المحجوبة تحتفظ بموارد، فهذه الموارد تُسرَّب. خذ مثلًا المهمة التالية:

```ocaml
let leaky_task () =
  fork (fun _ ->
    let oc = open_out "secret.txt" in
    Fun.protect ~finally:(fun _ -> close_out oc) (fun _ ->
      output_value oc (xchg 0)))
```

تكتب المهمة الرسالة المتلقّاة إلى الملف `secret.txt`، وتستعمل `Fun.protect` لضمان إغلاق قناة الخرج `oc` في حالتي العودة العادية والعودة الاستثنائية. لكن هذا غير كافٍ للأسف: فإن لم يتطابق أثر التبادل `xchg 0` مع أثر تبادل ينفّذه خيط آخر، بقيت هذه المهمة محجوبة إلى الأبد، وبالتالي لا تُغلق قناة الخرج `oc` أبدًا.

ولتفادي هذه المشكلة، يجب الالتزام بقاعدة بسيطة: ***يجب أن يُستأنف كل استمرار أو يُوقَف في النهاية***. وهنا نستعمل `discontinue` لضمان ألا تبقى المهمة المحجوبة محجوبةً إلى الأبد؛ فبإيقاف هذه المهمة نجبرها على الانتهاء (باستثناء):

    exception

    Improper_synchronization

    let

    dequeue () =

    if

    Queue.is_empty run_q

    then

    begin

    match

    !exchanger

    with

    | None -> ()

    (* done *)

    | Some (n, k) -> exchanger := None; discontinue k Improper_synchronization

    end

    else

    (Queue.pop run_q) ()

عندما يكون طابور المجدول فارغًا وتوجد مهمة متبادِلة محجوبة، توقف دالة `dequeue` الخيط المحجوب باستثناء `Improper_synchronization`. ويُرفع هذا الاستثناء عند استدعاء `xchg` المحجوب، فيُشغَّل كتلة `finally` وتُغلق قناة الخرج `oc`. ومن وجهة نظر المستخدم، يبدو الأمر وكأن الاستدعاء `xchg 0` يرفع الاستثناء `Improper_synchronization`.

### 12.24.4 قلب التحكّم

في المرور على بنية بيانات، ثمّة طريقتان أساسيتان بحسب ما إذا كان المنتج أم المستهلك هو الذي يملك التحكّم في المرور. فمثلًا في `List.iter f l`، يملك المنتج `List.iter` التحكّم ويدفع العناصر إلى المستهلك `f` الذي يعالجها. أما وحدة `Seq` فتوفّر آلية شبيهة بالقوائم المؤجَّلة، حيث يتحكّم المستهلك في المرور: فمثلًا تعيد `Seq.forever Random.bool` متتالية لا نهائية من البتات العشوائية، يُنتَج كل بت فيها (عند الطلب) حين يستعلم عنه المستهلك.

ومن الطبيعي أن يكون كتابة المنتجات مثل `List.iter` أسهل في النمط الأول، بينما النمط الثاني أفضل من ناحية سهولة الاستعمال للمستهلك، لأن التحكّم أمر مفضَّل وأكثر طبيعية. ولكي ننال أفضل ما في العالمين، نرغب في كتابة منتج في النمط الأول وتحويله تلقائيًا إلى النمط الثاني. وهذا التحويل يمكن كتابته *مرة واحدة وللأبد* بوصفه دالة مكتبة، بفضل معالجات الآثار. ولنسمّ هذه الدالة `invert`. وسننظر أولًا في كيفية استعمال الدالة `invert` قبل النظر في تفاصيل تنفيذها. ونوع هذه الدالة معطى فيما يلي:

```ocaml
val invert : iter:(('a -> unit) -> unit) -> 'a Seq.t
```

تأخذ الدالة `invert` دالة `iter` (منتجًا يدفع العناصر إلى المستهلك) وتعيد متتالية (يملك المستهلك التحكّم فيها). فمثلًا،

```ocaml
let lst_iter = Fun.flip List.iter [1;2;3]

val lst_iter : (int -> unit) -> unit = <fun>
```

دالة `iter` من النوع `(int -> unit) -> unit`، والتعبير `lst_iter f` يدفع العناصر 1 و2 و3 إلى المستهلك `f`. فمثلًا،

```ocaml
lst_iter (fun i -> Printf.printf "%d\n" i)

1
2
3
- : unit = ()
```

ويعيد التعبير `invert lst_iter` متتالية تتيح للمستهلك المرور على القائمة عند الطلب. فمثلًا،

```ocaml
let s = invert ~iter:lst_iter
let next = Seq.to_dispenser s;;

val s : int Seq.t = <fun>
val next : unit -> int option = <fun>

next();;

- : int option = Some 1

next();;

- : int option = Some 2

next();;

- : int option = Some 3

next();;

- : int option = None
```

ويمكننا استعمال الدالة `invert` نفسها مع أيّ دالة `iter`. فمثلًا،

```ocaml
let s = invert ~iter:(Fun.flip String.iter "OCaml")
let next = Seq.to_dispenser s;;

val s : char Seq.t = <fun>
val next : unit -> char option = <fun>

next();;

- : char option = Some 'O'

next();;

- : char option = Some 'C'

next();;

- : char option = Some 'a'

next();;

- : char option = Some 'm'

next();;

- : char option = Some 'l'

next();;

- : char option = None
```

#### تنفيذ قلب التحكّم

تنفيذ الدالة `invert` معطى فيما يلي:

```ocaml
let invert (type a) ~(iter : (a -> unit) -> unit) : a Seq.t =
  let module M = struct
    type _ Effect.t += Yield : a -> unit t
  end in
  let yield v = perform (M.Yield v) in
  fun () -> match iter yield with
  | () -> Seq.Nil
  | effect M.Yield v, k -> Seq.Cons (v, continue k)
```

تصرّح الدالة `invert` بأثر `Yield` يأخذ العنصر المطلوب إنتاجه وسيطًا. ودالة `yield` تنفّذ الأثر `Yield`. والتجريد اللامبدي `fun () -> ...` يؤجّل كل عمل حتى يُطلب العنصر الأول من المتتالية؛ وعندئذٍ يُنفَّذ الحساب `iter yield` تحت معالج أثار. وفي كل مرة تدفع دالة `iter` عنصرًا إلى دالة `yield`، ينقطع الحساب بالأثر `Yield`، ويُعالَج هذا الأثر بإعادة القيمة `Seq.Cons(v,continue k)` إلى المستهلك. فيحصل المستهلك على العنصر `v` وعلى الحساب المعلَّق، الذي ليس في نظر المستهلك إلا ذيل المتتالية.

وعندما يطلب المستهلك العنصر التالي من المتتالية (بتطبيقها على `()`)، يُستأنف الاستمرار `k`، فيسمح للحساب `iter yield` بالتقدّم حتى ينتج عنصرًا آخر أو ينتهي انتهاءً عاديًا. وفي الحالة الأخيرة تُعاد القيمة `Seq.Nil` إشارةً إلى المستهلك بأن المرور قد انتهى.

ومن المهم ملاحظة أن المتتالية التي تعيدها الدالة `invert` *عابرة* (كما تعرّفها وحدة `Seq`)، أي أنه لا يجوز استعمالها إلا مرة واحدة على الأكثر. وفضلًا عن ذلك، يجب استهلاك المتتالية كاملةً (أي استعمالها مرة واحدة على الأقل) لضمان استعمال الاستمرار المحتجَز استعمالًا خطيًا.

### 12.24.5 الدلالة

سنرى في هذا القسم دلالة معالجات الآثار بمساعدة أمثلة.

#### تداخل المعالجات

مثل معالجات الاستثناءات، يمكن تداخل معالجات الآثار.

```ocaml
type _ Effect.t += E : int t
                 | F : string t

let foo () = perform F

let bar () =
  try foo () with
  | effect E, k -> failwith "impossible"

let baz () =
  try bar () with
  | effect F, k -> continue k "Hello, world!"
```

في هذا المثال ينفّذ الحساب `foo` الأثر `F`، ويعالج المعالج الداخلي الأثر `E` وحده، ويعالج المعالج الخارجي الحرف `F`. ويعيد استدعاء `baz` القيمة `Hello, world!`.

```ocaml
baz ()

- : string = "Hello, world!"
```

#### الألياف

من المفيد معرفة القليل عن تنفيذ معالجات الآثار لتقدير خيارات التصميم وخصائص أدائها. تُنفَّذ معالجات الآثار بمساعدة مقاطع مكدّس متنامية ديناميكيًا يديرها نظام التشغيل، تُسمّى *أليافًا* (fibers). ومكدّس البرنامج في OCaml قائمة مترابطة من هذه الألياف.

يُخصَّص ليف جديد لتقييم الحساب الذي يحوطه معالج أثار، ويُحرَّر الليف عندما يعود الحساب إلى المستدعي، سواء بالعودة بقيمة أم برفع استثناء.

وعند موضع `perform` في `foo` في المثال السابق، يبدو مكدّس البرنامج كما يلي:

    +-----+  +-----+  +-----+
    |     |  |     |  |     |
    | baz |<-| bar |<-| foo |
    |     |  |     |  |     |
    +-----+  +-----+  +-----+
                              <- stack_pointer

ويقابل الوصلتان معالجي الآثار في البرنامج. وعندما يُعالَج الأثر `F` في `baz`، تبدو حالة البرنامج كما يلي:

    +-----+  +-----+  +-----+
    |     |  |     |  |     |
    | baz |  | bar |<-| foo |<--+
    |     |  |     |  |     |   |
    +-----+  +-----+  +-----+   |
                              <- stack_pointer
    +-----+
    |     |
    |  k  |
    |     |
    +-----+

والاستمرار المحدَّد `k` كائن على الكومة يشير إلى المقطع من المكدّس المقابل للحساب المعلَّق. ولا يتضمّن احتجاز الاستمرار نسخ إطارات المكدّس. وعند استئناف الاستمرار يُعاد المكدّس إلى حالته السابقة بربط المقطع الذي تشير إليه `k` بالمكدّس الحالي. ولأن احتجاز الاستمرار واستئنافه لا يتطلّبان نسخ إطارات المكدّس، فإن تعليق التنفيذ بـ `perform` واستئنافه بـ `continue` أو `discontinue` سريعان.

#### الآثار غير المعالجة

خلافًا للغات مثل Eff وKoka، لا توفّر معالجات الآثار في OCaml *سلامة الآثار*؛ فالمترجم لا يضمن ساكنًا أن جميع الآثار التي ينفّذها البرنامج معالَجة. وإذا لم يكن لأثر معالج مطابق، رُفع استثناء `Effect.Unhandled` عند موضع `perform` المقابل. فمثلًا في المثال السابق لا يعالج `bar` الأثر `F`، ولذلك سنحصل على استثناء `Effect.Unhandled F` عند تشغيل `bar`.

```ocaml
try bar () with Effect.Unhandled F -> "Saw Effect.Unhandled exception"

- : string = "Saw Effect.Unhandled exception"
```

#### الاستمرارات الخطية

كما نوقش سابقًا في 12.24.3، يجب استعمال الاستمرارات المحدَّدة في OCaml استعمالًا خطيًا: ***يجب استئناف كل استمرار محتجَز بـ `continue` أو `discontinue` مرة واحدة بالضبط***. ومحاولة استعمال استمرار أكثر من مرة ترفع استثناء `Continuation_already_resumed`. فمثلًا:

```ocaml
try perform (Xchg 0) with
| effect Xchg n, k -> continue k 21 + continue k 21

Exception: Stdlib.Effect.Continuation_already_resumed.
```

الدافع الرئيسي لإضافة معالجات الآثار إلى OCaml هو تمكين البرمجة المتزامنة، والاستمرارات أحادية الاستعمال كافية لجميع احتياجات البرمجة المتزامنة تقريبًا. وهي أيضًا أرخص تنفيذًا بكثير من الاستمرارات متعددة الاستعمال، لأنها لا تتطلّب نسخ إطارات المكدّس. وفضلًا عن ذلك، فقد تتعامل برامج OCaml مع موارد خطية مثل المقابس وواصفات الملفات، وقاعدة الخطية تُخرَق بسهولة إذا سُمح للاستمرارات بالاستئناف أكثر من مرة. وسيكون تنقيح خروق الخطية هذه على الموارد عسيرًا جدًا لغياب الفحوص الساكنة للخطية وللطبيعة غير المحلية للتحكّم في التدفّق. ولذلك لا يدعم OCaml الاستمرارات متعددة الاستعمال.

وبينما تُضمن خاصية «الاستئناف مرة واحدة على الأكثر» للاستمرارات بفحص دينامي، لا يوجد فحص يضمن استئنافها «مرة واحدة على الأقل». ويُترك للمستخدم ضمان استئناف الاستمرارات المحتجَزة مرة واحدة على الأقل؛ فعدم استئنافها يسرّب الذاكرة المخصَّصة للألياف وأيّ موارد قد يحتفظ بها الحساب المعلَّق.

ويمكن للمرء تركيب مُنهٍ (finaliser) على الاستمرار المحتجَز لضمان تحرير الموارد:

    exception

    Unwind Gc.finalise (

    fun

    k ->

    try

    ignore (discontinue k Unwind)

    with

    _ -> ()) k

وفي هذه الحالة، إذا صار `k` غير قابل للوصول، يضمن المنهي فكّ مكدّس الاستمرار بإيقافه باستثناء `Unwind`، بما يتيح للحساب تحرير موارده. غير أن الكلفة الوقتية للمنهيات أكبر بكثير من كلفة احتجاز استمرار، ولذلك يُوصى بأن يعتني المستخدم باستئناف الاستمرار مرة واحدة بالضبط بدلًا من الاعتماد على المنهي.

#### القيود

آثار OCaml *متزامنة*: فلا يمكن تنفيذ أثر تنفيذًا غير متزامن من معالج إشارة أو منهٍ أو دالة رد نداء memprof أو إنذار جمع القمامة، والتقاطه من الجزء الرئيسي من الشيفرة؛ بل يؤدي ذلك إلى استثناء `Effect.Unhandled` (12.24.5).

وبالمثل، فالآثار غير متوافقة مع استعمال ردود النداء من C إلى OCaml (القسم 23.7). فلا يمكن لأثر أن يعبر استدعاءً إلى `caml_callback`، بل يؤدي ذلك إلى استثناء `Effect.Unhandled`. وعلى وجه الخصوص، يجب الحرص عند مزج مكتبات تستعمل ردود النداء من C إلى OCaml مع مكتبات تستعمل الآثار.

### 12.24.6 المعالجات السطحية

استعملت الأمثلة التي رأيناها حتى الآن معالجات *عميقة*. فالمعالج العميق يعالج جميع الآثار التي ينفّذها الحساب (على التوالي)، وكل استمرار يُحتجَز في معالج عميق يتضمّن المعالج أيضًا؛ وهذا يعني أنه عند استئناف الاستمرار يُعاد تركيب معالج الآثار تلقائيًا، فيعالج الأثر أو الآثار التي قد ينفّذها الحساب في المستقبل.

ويوفّر OCaml أيضًا معالجات *سطحية*. فمقارنةً بالمعالجات العميقة، لا يعالج المعالج السطحي إلا الأثر الأول الذي ينفّذه الحساب. والاستمرار المحتجَز في معالج سطحي لا يتضمّن المعالج، وهذا يعني أن المعالج لا يكون حاضرًا عند استئناف الاستمرار؛ ولهذا يُتوقّع من المستخدم، عند استئناف الاستمرار، أن يوفّر معالج أثار جديدًا (قد يكون مختلفًا) لمعالجة الأثر التالي الذي قد ينفّذه الحساب.

تسهّل المعالجات السطحية التعبير عن أصناف معيّنة من البرامج. فلننفّذ معالجًا سطحيًا يفرض على حساب متتالية معيّنة من الآثار (بروتوكولًا). ولنفترض في هذا المثال أن الحساب قد ينفّذ الآثار التالية:

```ocaml
type _ Effect.t += Send : int -> unit Effect.t
                 | Recv : int Effect.t
```

ولنفترض أننا نريد فرض بروتوكول يسمح فقط بمتتالية متناوبة من الأثرين `Send` و`Recv` تطابق التعبير النمطي `(Send;Recv)*;Send?`. وبذلك تكون متتاليات الآثار `[]` (المتتالية الفارغة) و`[Send]` و`[Send;Recv]` و`[Send;Recv;Send]` وما إلى ذلك مسموحة، أما `[Recv]` و`[Send;Send]` و`[Send;Recv;Recv]` وما إلى ذلك فغير مسموحة. والملاحظة الأساسية هنا أن مجموعة الآثار المعالَجة تتطوّر مع الوقت. ويمكننا فرض هذا البروتوكول على نحو طبيعي جدًا باستعمال معالجات سطحية كما يلي:

```ocaml
open Effect.Shallow

let run (comp: unit -> unit) : unit =
  let rec loop_send : type a. (a,unit) continuation -> a -> unit = fun k v ->
    continue_with k v
      { retc = Fun.id;
        exnc = raise;
        effc = fun (type b) (eff : b Effect.t) ->
          match eff with
          | Send n -> Some (fun (k: (b,_) continuation) ->
              loop_recv n k ())
          | Recv -> failwith "protocol violation"
          | _ -> None }
  and loop_recv : type a. int -> (a,unit) continuation -> a -> unit = fun n k v ->
    continue_with k v
      { retc = Fun.id;
        exnc = raise;
        effc = fun (type b) (eff : b Effect.t) ->
          match eff with
          | Recv -> Some (fun (k: (b,_) continuation) ->
              loop_send k n)
          | Send v -> failwith "protocol violation"
          | _ -> None }
  in
  loop_send (fiber comp) ()
```

تشغّل الدالة `run` الحساب `comp` ضامنةً أنه لا ينفّذ إلا متتالية متناوبة من الأثرين `Send` و`Recv`. ويستعمل المعالج السطحي مجموعة بدائيات مختلفة عن المعالج العميق. والبدائية `fiber` (في السطر الأخير) تأخذ دالة `'a -> 'b` وتعید `('a,'b) Effect.Shallow.continuation`.

وخلافًا للمعالجات العميقة، لا يوفّر OCaml دعمًا نحويًا للمعالجات السطحية. والتعبير `continue_with k v h` يستأنف الاستمرار `k` بالقيمة `v` تحت المعالج `h`. والمعالج هنا سجل بثلاثة حقول: حالة القيمة (`retc`) والحالة الاستثنائية (`exnc`) وحالة الأثر (`effc`).

والدالتان المتعاودتان `loop_send` و`loop_recv` تستأنفان الاستمرار المعطى `k` بالقيمة `v` تحت معالجين مختلفين. فالدالة `loop_send` تعالج الأثر `Send` وتستدعي `loop_recv` استدعاءً ذيليًا، وإذا نفّذ الحساب الأثر `Recv` أجهضت `loop_send` الحساب برفع استثناء. وبالمثل تعالج `loop_recv` الأثر `Recv` وتستدعي `loop_send` استدعاءً ذيليًا، وإذا نفّذ الحساب الأثر `Send` أجهضت `loop_recv` الحساب. ولأن الاستمرار المحتجَز في المعالج السطحي لا يتضمّن المعالج، فلا يوجد أبدًا إلا معالج واحد مركَّب في النطاق الدينامي للحساب `comp`.

لاحظ أنه، خلافًا للمعالجات العميقة ذات الدعم النحوي، لا بدّ من تعليقات أنواع صريحة في المعالج السطحي؛ إذ يجب استعمال نوع مجرّد محلي `(type b)` في معالج الأثر (`effc`)، وتعليق نوع صريح على وسيط الأثر `eff` وعلى الاستمرار `k` في كل حالة من حالات الأثر. ومن النقاط الجديرة بالملاحظة أيضًا أن حالة الأثر الجامعة `| _ -> None` ضرورية، ويمكن قراءتها حدسيًا كما يلي: «مرّر الآثار غير المعالجة إلى المعالج الخارجي». وتوفّر وحدة المكتبة القياسية `Effect` أيضًا نسخة غير نحوية من المعالجات العميقة تحتاج إلى تعليقات مماثلة.

يُنفَّذ الحساب في البداية بالدالة `loop_send` (انظر السطر الأخير في الشيفرة أعلاه)، بما يضمن أن الأثر الأول الذي يُسمح للحساب بتنفيذه هو الأثر `Send`. ولاحظ أن الحساب حرّ في تنفيذ آثار أخرى غير `Send` و`Recv`، قد يعالجها معالج خارجي.

ونرى أن الدالة `run` ستسمح بحساب يتبع البروتوكول:

```ocaml
run (fun () ->
  printf "Send 42\n";
  perform (Send 42);
  printf "Recv: %d\n" (perform Recv);
  printf "Send 43\n";
  perform (Send 43);
  printf "Recv: %d\n" (perform Recv))

Send 42
Recv: 42
Send 43
Recv: 43
- : unit = ()
```

وتجهض الحسابات التي لا تتبعه:

```ocaml
run (fun () ->
  Printf.printf "Send 0\n";
  perform (Send 0);
  Printf.printf "Send 1\n";
  perform (Send 1) (* protocol violation *))

Send 0
Send 1
Exception: Failure "protocol violation".
```

ويمكننا تنفيذ المثال نفسه بمعالجات عميقة باستعمال خانات مرجعية (وهو سهل لكنه غير مُرضٍ) أو دونها (وهو أصعب)، ونترك ذلك تمرينًا للقارئ.

## 12.25 إزالة الالتباس بتوجيه النوع في مكوّنات المصفوفات الحرفية

(أُدخلت في OCaml 5.4)

منذ OCaml 5.4، يمكن استعمال تركيب المكوّنات الحرفية للمصفوفات `[|` *e1* `;` *e2* `;` ... `;` *eN* `|]` للدلالة على قيم من النوع `floatarray` أو `'a Iarray.t` فضلًا عن `'a array`، في موضعي التعابير والأنماط معًا. ويُستعمل هذا التركيب أيضًا لعرض قيم `floatarray` وقيم `'a Iarray.t` في النظام التفاعلي.

ويطابق المترجم النوع المتوقَّع للتعبير أو النمط مع نوع المكوّن الحرفي، على نحو مماثل لإزالة الالتباس بين البواني وحقول السجلات (انظر 1.4.1).

وفي غياب نوع متوقَّع، يُفترض أن المكوّنات الحرفية للمصفوفات من النوع `'a array`.

وفي الأمثلة التالية تُسند إلى المكوّنات الحرفية للمصفوفات نوع `floatarray`:

```ocaml
let _ : floatarray = [|42.|];;

- : floatarray = [|42.|]

let _ = ([|42.|] : floatarray);;

- : floatarray = [|42.|]

let _ = Float.Array.length [|42.|];;

- : int = 1
```

ويمكن بناء المصفوفات غير القابلة للتغيير (هنا `int Iarray.t`) بالطريقة نفسها بالضبط:

```ocaml
let _ : _ Iarray.t = [|42|];;

- : int Iarray.t = [|42|]

let _ = ([|42|] : _ Iarray.t );;

- : int Iarray.t = [|42|]

let _ = Iarray.length [|42|];;

- : int = 1
```

وتُستعمل آلية إزالة الالتباس نفسها للمكوّنات الحرفية للمصفوفات التي تظهر في الأنماط:

```ocaml
let f : floatarray -> _ = function
  | [| 42. |] -> "It's a floatarray containing one element"
  | _ -> "Also a floatarray"
;;

val f : floatarray -> string = <fun>
```

وفي المثال التالي يُسند إلى `x` النوع `float array`:

```ocaml
let x = [|42.|];;

val x : float array = [|42.|]
```

غير أن ما يلي لا يعمل:

```ocaml
let f a =
  match a with
  | [| _ |] -> Float.Array.length a
  | _ -> 42
;;

Error: The value a has type 'a array but an expression was expected of type
         Float.Array.t = floatarray

let f b (a : floatarray) = if b then [|42.|] else a
;;

Error: The value a has type floatarray but an expression was expected of type
         float array
```

فالمعلومة المستفادة من استعمال `a` بوصفه `floatarray` لا يمكن نشرها عكسيًا إلى المكوّن الحرفي للمصفوفة. وبوجه عام، لا يمكن نشر معلومة النوع المتوقَّع «عكسيًا».

وفي المثال التالي تنجح إزالة التباس النوع لأن معلومة النوع المستفادة في الفرع `then` من التعبير الشرطي تُنشر إلى الفرع `else`، الذي يقع «لاحقًا».

```ocaml
let f b (a : floatarray) = if b then a else [|42.|];;

val f : bool -> floatarray -> floatarray = <fun>
```

وتُطلق في هذه الحالات التنبيه 18 `not-principal`، إن كان ممكَّنًا.

## 12.26 الصفوف الموسومة

(أُدخلت في OCaml 5.4)

```text
typexpr::= ... ∣ [label-name:] typexpr { * [label-name:]typexpr }⁺ expr::= ... ∣ [~label-name:] expr { , [~label-name:] expr }⁺ pattern::= ... ∣ [~label-name:] pattern { , [~label-name:] pattern }⁺
```

منذ OCaml 5.4، يمكن وسم حقول الصفوف اختياريًا. وهذه الميزة مثنوية مفهوميًا لوسائط الدوال الموسومة، إذ تتيح إعطاء اسم مفيد للقيم المبنية حيث تتيح وسائط الدوال الموسومة إعطاء اسم مفيد للوسائط.

وفي ما يلي مثال دافع نريد فيه حساب قيمتين من قائمة والحرص على عدم الخلط بينهما:

```ocaml
let sum_and_product ints =
  let init = ~sum:0, ~product:1 in
  List.fold_left (fun (~sum, ~product) elem ->
    let sum = elem + sum in
    let product = elem * product in
    ~sum, ~product) init ints

val sum_and_product : int list -> sum:int * product:int = <fun>
```

يوضّح هذا المثال استعمال الصفوف الموسومة في الأنواع والأنماط. ويمكن اختصارها كعناصر السجلات أو وسائط الدوال.

وفي الأنواع تُكتب وسوم الصفوف على غرار وسوم وسائط الدوال. فمثلًا وسيط الدالة `fold_left` في المثال السابق له النوع:

```text
(sum:int * product:int) -> int -> sum:int * product:int
```

ويمكن أن تكون الصفوف الموسومة مفيدة متى أردت استعمال الأسماء لتفسير عناصر صفّ أو إزالة الالتباس بينها، بينما يبدو تصريح سجل جديد ثقيلًا أكثر من اللازم.

ويمكن أن تكون الصفوف موسومة جزئيًا، وقد يكون ذلك مفيدًا حين تشترك بعض عناصر الصفّ في نوع واحد وتحتاج إلى إزالة التباس، بينما لا تحتاج إليها عناصر أخرى. فمثلًا:

```ocaml
type min_max_avg = min:int * max:int * float
```

#### إعادة الترتيب والأنماط الجزئية

مثل السجلات، يمكن إعادة ترتيب أنماط الصفوف الموسومة أو جعلها جزئية. ولا يدعم المترجم إعادة الترتيب أو المطابقة الجزئية إلا حين يعرف نوع النمط من سياقه.

فمثلًا يمكننا كتابة:

```ocaml
let lt = ~x:0, ~y:42
let twice_y = let ~y, .. = lt in y * 2

val lt : x:int * y:int = (~x:0, ~y:42)
val twice_y : int = 84
```

وحين لا يُعرف النوع (بالمعنى نفسه الذي نشترط فيه معرفة النوع لإزالة الالتباس بين البواني)، يرفض المترجم النمط الجزئي. فمثلًا هذا البرنامج:

```ocaml
let get_y t =
  let ~y, .. = t in
  y

Error: Could not determine the type of this partial tuple pattern.
```

ويمكن إصلاح هذا المثال بإضافة تعليقة نوع إلى وسيط الدالة.

ولا يجوز تكرار الوسوم في صفّ. غير أنه يمكن اعتبار العناصر غير الموسومة كلها تشترك في الوسم الوحيد نفسه. وعند المطابقة على صفّ كهذا يُربط أول عنصر غير موسوم في النمط بأول عنصر غير موسوم في القيمة، وهكذا دواليك. ونتيجةً لذلك، يمكن أيضًا المطابقة الجزئية على صفّ غير موسوم لاسترجاع العناصر الأولى منه.

#### القيود

الأقواس ضرورية لإزالة الالتباس بين أنواع الدوال ذات الوسائط الموسومة وأنواع الدوال ذات وسائط الصفوف الموسومة، حين يكون للعنصر الأول من الصفّ وسم.

وخلافًا للسجلات، لا تُدعم إعادة الترتيب في تعابير الصفوف الموسومة، حتى حين يُعرف النوع. وهذا شبيه بأن تعريف دالة ذات وسائط موسومة يجب أن يربط الوسائط بالترتيب نفسه الذي في النوع.

ولا تدعم الصفوف الموسومة الإسقاط (أي استخراج عنصر من الصفّ بوسمه).

#### العلاقة بالسجلات المرنة

الصفوف الموسومة شبيهة في جوهرها بالسجلات المرنة في SML. والفرق الأساسي أن سجلات SML مرتَّبة ترتيبًا قانونيًا بحسب اسم الوسم، أما الصفوف الموسومة فليست كذلك. فمثلًا `x:int * y:bool` و`y:bool * x:int` نوعان مختلفان في OCaml، يقابلان ترتيبين مختلفين للحقول في كتلة وقت التشغيل. أما في SML فتُعدّ أنواع السجلات المقابلة متساوية، وتُرتَّب كتلة وقت التشغيل دومًا بحيث يكون الحقل `x` أولًا.

## 12.27 الأنواع الخارجية

(أُدخلت في OCaml 5.5)

تُدخل الأنواع الخارجية أنواعًا من القيم معرَّفة خارج لغة OCaml (فلا يمكن تعريفها كنوع بيانات قياسي أو تكوينها بتركيب بنيات أنواع موجودة)، لأنها تُملأ من واجهة الدوال الأجنبية. فمثلًا يمكن تعريف نوع `gmp` للأعداد الصحيحة غير المحدودة الطول، المنفَّذ بربط مكتبة `Gmp` من C، كما يلي:

```ocaml
module Gmp : sig
  type t = external "gmp"

  val of_int : int -> t
  val add : t -> t -> t
  (* ... *)
end = …
```

نقول إن `Gmp.t` نوع خارجي اسمه `gmp`. والأسماء الخارجية ليست وحيدة، إذ يمكن تعريف نوعين خارجيين (مختلفين) بالاسم نفسه. وبالمقابل، يفرض نظام الأنواع أن يكون نوعان خارجيان باسمين مختلفين نوعين مختلفين.

وقبل توفّر الأنواع الخارجية، كان بإمكان المستخدمين استعمال نوع مجرّد لهذا الغرض، بكتابة `type gmp` فحسب. لكن ذلك أقل إفادة، لأنه يفرض على مترجم OCaml افتراض أن الأنواع المجرّدة يمكن تعريفها على نحو اعتباطي، وبخاصة أن نوعًا مجرّدًا من وحدة أخرى قد يساوي أيّ نوع.

##### الأنواع المعرَّفة مسبقًا

يمكن استعمال الأنواع الخارجية بوجه خاص لتعريف الأنواع المدمجة مثل `float` و`string` وغيرها.

```ocaml
type float = external "float"
type string = external "string"
type 'a array = external "array"
type +'a iarray = external "iarray"
(* ... *)
```

فنحن نعلم مثلًا أن `float` و`string` نوعان مختلفان، لأن لهما اسمين مختلفين.

ملاحظة: يفيد ذلك بوجه خاص عند استعمال الأنواع المعرَّفة مسبقًا بوصفها فهارس GADT، إذ يمكن استبعاد بوانٍ غير متوافق. انظر 7.8 لمناقشة فهارس GADT.

##### التغاير والحقنية

مثل الأنواع المجرّدة، يجب على المستخدمين تحديد تغاير معاملات الأنواع الخارجية، ويُفترض الثبات افتراضيًا. وخلافًا للأنواع المجرّدة، فالأنواع الخارجية حقنية دومًا.
