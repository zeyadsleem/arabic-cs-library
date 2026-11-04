---
title: "تحويل البرنامج «ذَيلِي مع الباني»"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 27: تحويل البرنامج «ذَيلِي مع الباني»

*(أُضيف في OCaml 4.14)*

ملاحظة: تُعدّ هذه الميزة تجريبية، وقد تتطوّر واجهتها، بناءً على ملاحظات المستخدمين، في الإصدارات القليلة القادمة من اللغة.

لنتأمّل هذا التعريف الطبيعي للدالة `List.map`:

```ocaml
let rec map f l =
  match l with
  | [] -> []
  | x :: xs ->
    let y = f x in
    y :: map f xs
```

من القيود المعروفة لهذا التعريف أن النداء العودي `map f xs` ليس في موضع *ذَيلِي*. يحتاج زمن التشغيل إلى أن يتذكّر متابعة التنفيذ بـ `y :: r` بعد أن يعيد النداء قيمة `r`، ولذلك تستهلك هذه الدالة قدرًا من مساحة مكدّس الاستدعاءات عند كل نداء عودي. استهلاك المكدّس في `map f li` يتناسب طرديًا مع طول `li`. وهذا مسألة صحّة في القوائم الكبيرة على الأنظمة المضبوطة بمساحة مكدّس محدودة، وينتهي بالأستثناء المخيف `Stack_overflow`.

```ocaml
# let with_stack_limit stack_limit f =
     let old_gc_settings = Gc.get () in
     Gc.set { old_gc_settings with stack_limit };
     Fun.protect ~finally:(fun () -> Gc.set old_gc_settings) f
   ;;

val with_stack_limit : int -> (unit -> 'a) -> 'a = <fun>

# with_stack_limit 20_000 (fun () ->
    List.length (map Fun.id (List.init 1_000_000 Fun.id))
  );;

Stack overflow during evaluation (looping recursion?).
```

في هذا التعريف من `map`، يقع النداء العودي في موضع ليس موضعًا *ذَيلِيًّا* في البرنامج، بل داخل تطبيق باني نوع بيانات هو نفسه في موضع *ذَيلِي*. نقول إن تلك المواضع، المكوّنة من مواضع ذَيلية وتطبيقات بواني، مواضع *ذَيلِيَة مع الباني* (TMC)، ونكتب أحيانًا *ذَيلِي مع الباني* اختصارًا.

يمكن إعادة كتابة البرامج بحيث تصير مواضع «ذَيلِي مع الباني» مواضع ذَيلية؛ وبعد هذا التحويل يصبح تعريف `map` أعلاه *عوديًا ذَيلِيًّا*، بمعنى أنه لا يستهلك إلا قدرًا ثابتًا من مساحة المكدّس. ينفّذ مترجم OCaml هذا التحويل عند الطلب، باستعمال السمة `[@tail_mod_cons]` أو `[@ocaml.tail_mod_cons]` على الدالة المطلوب تحويلها.

```ocaml
let[@tail_mod_cons] rec map f l =
  match l with
  | [] -> []
  | x :: xs ->
    let y = f x in
    y :: map f xs
```

```ocaml
# List.length (map Fun.id (List.init 1_000_000 Fun.id));;

- : int = 1000000
```

لا يحسّن هذا التحويل إلا النداءات الواقعة في موضع «ذَيلِي مع الباني»، ولا يحسّن النداءات العودية التي لا تنتمي إلى هذه الشريحة:

```ocaml
(* does *not* work: addition is not a data constructor *)
let[@tail_mod_cons] rec length l =
  match l with
  | [] -> 0
  | _ :: xs -> 1 + length xs

Warning 71 [unused-tmc-attribute]: This function is marked @tail_mod_cons
  but is never applied in TMC position.
```

من الممكن طبعًا استعمال تحويل `[@tail_mod_cons]` على دوال تحتوي بعض النداءات العودية في موضع «ذَيلِي مع الباني» وبعضها في مواضع أخرى اعتباطية. النداءات الذَيلية ونداءات «ذَيلِي مع الباني» وحدها هي التي ستحدث في مساحة مكدّس ثابتة.

##### التصميم العام

تُقدّم هذه الميزة بوصفها تحويلًا صريحًا للبرنامج، لا تحسينًا ضمنيًا. وهي موجَّهة بالتعليقات: يُتوقَّع من المستخدم أن يعبّر عن قصده بإضافة تعليقات في البرنامج باستعمال السمات، وسيُطلب منه ذلك في كل حالة ملتبسة.

نتوقّع أن يستعملها أساسًا مستخدمو OCaml المتقدّمون ممن يحتاجون إلى ضمانات بشأن سلوك استهلاك المكدّس في برامجهم. وتوصيتنا أن تُستعمل السمة `[@tailcall]` على كل مواضع الاستدعاء التي يجب ألا تستهلك أي مساحة مكدّس. وتوسّع `[@tail_mod_cons]` مجموعة الدوال التي يمكن تعليق نداءاتها لتكون نداءات ذَيلية، ف تساعد على إرساء ضمانات استهلاك المكدّس في حالات أكثر.

##### الأداء

من الطرق المعيارية للحصول على نسخة عودية ذَيلِيَّة من `List.map` استعمال مركم لتجميع عناصر الخرج ثم قلبه في نهاية العبور.

```ocaml
let rec map f l = map_aux f [] l
and map_aux f acc l =
  match l with
  | [] -> List.rev acc
  | x :: xs ->
    let y = f x in
    map_aux f (y :: acc) xs
```

هذه النسخة عودية ذَيلِيَّة، لكنها أبطأ بدرجة قابلة للقياس من النسخة البسيطة غير الذَيلِيَّة. في المقابل، يوفّر تحويل «ذَيلِي مع الباني» تنفيذًا أداؤه مقارب لأداء النسخة الأصلية، حتى في المدخلات الصغيرة.

##### ترتيب التقييم

احذر أن لتحويل «ذَيلِي مع الباني» أثرًا على ترتيب التقييم: فوسيطة الباني التي تُحوَّل إلى موضع ذَيلِي ستُقيَّم دائمًا في الآخر. تأمّل المثال التالي:

```ocaml
type 'a two_headed_list =
  | Nil
  | Consnoc of 'a * 'a two_headed_list * 'a

let[@tail_mod_cons] rec map f = function
  | Nil -> Nil
  | Consnoc (front, body, rear) ->
    Consnoc (f front, map f body, f rear)
```

بسبب تحويل `[@tail_mod_cons]`، سيُقيَّم النداءان `f front` و`f rear` قبل `map f body`. وهذا على الأرجح مختلف عن ترتيب التقييم في النسخة غير المعلَّقة. (ترتيب تقييم وسائط البواني غير محدَّد في OCaml، لكن كثيرًا من التنفيذات تستعمل عادةً الترتيب من اليسار إلى اليمين أو من اليمين إلى اليسار.)

هذا الأثر على ترتيب التقييم أحد أسباب وجوب أن يطلب المستخدم تحويل «ذَيلِي مع الباني» صراحةً، بدلًا من تطبيقه بوصفه تحسينًا تلقائيًا.

##### لماذا «ذَيلِي مع الباني»؟

يمكن لتحويلات أخرى للبرامج، ولا سيّما التحويل إلى نمط تمرير الاستمرارات (CPS)، أن تجعل جميع الدوال عودية ذَيلِيَّة، بدلًا من استهداف شريحة صغيرة فقط. وفيما يلي بعض أسباب توفير دعم مدمج للتحويل الأقل عمومية «ذَيلِي مع الباني»:

- يحافظ تحويل «ذَيلِي مع الباني» على أداء النسخة الأصلية غير الذَيلِيَّة، أما التحويل إلى نمط تمرير الاستمرارات فيكلّف قدرًا ثابتًا قابلاً للقياس.

- لا يمكن التعبير عن تحويل «ذَيلِي مع الباني» بوصفه تحويلاً من المصدر إلى المصدر في برامج OCaml، لأنه يعتمد على حالة قابلة للتغيير بطريقة غير آمنة من حيث الأنواع. في المقابل، يمكن كتابة نسخ نمط تمرير الاستمرارات يدويًا، ربما بترميز مونادي مناسب.

##### ملاحظة: حجم مكدّس الاستدعاءات في OCaml

في OCaml 4.x وما قبلها، تحترم برامج الشيفرة البايتية إعداد المعامل `stack_limit` في زمن التشغيل (كما يُضبط بـ `Gc.set` في المثال أعلاه)، أو الإعداد `l` في المتغيّر `OCAMLRUNPARAM`. أما البرامج الأصلية فتتجاهل هذه الإعدادات ولا تحترم إلا حدّ المكدّس الأصلي في نظام التشغيل، كما يُضبط بـ `ulimit` في أنظمة Unix. ويعمل معظم أنظمة التشغيل افتراضيًا بحدّ حجم مكدّس منخفض نسبيًا، لذا فإن تجاوز المكدّس في الدوال غير الذَيلِيَّة خلل برمجي شائع.

وابتداءً من OCaml 5.0، لم تعد الشيفرة الأصلية تستعمل مكدّس النظام الأصلي لنداءات دوال OCaml، فهي لم تعد تتأثّر بحجم مكدّس نظام التشغيل الأصلي؛ ويحترم كل من البرامج الأصلية والشيفرة البايتية حدّ زمن تشغيل OCaml نفسه. وهذا الحدّ مضبوط افتراضيًا على قيمة أعلى بكثير من مكدّسات معظم أنظمة التشغيل الأصلية، بحدّ لا يقلّ عن 512 ميبيبايت، لذا ينبغي أن يصير تجاوز المكدّس أقلّ شيوعًا بكثير في الممارسة. ومع ذلك، يبقى هناك حدّ للمكدّس افتراضيًا، لأنه مفيد في اكتشاف أخطاء الدوال العودية غير الذَيلِيَّة الحلقية سريعًا. فبلا حدّ للمكدّس، على المرء أن ينتظر استهلاك المكدّس للذاكرة كلها حتى ينهار البرنامج، وقد يستغرق ذلك وقتًا طويلًا ويجعل النظام غير متجاوب.

ومعنى ذلك أن تحويل «ذَيلِي مع الباني» أقل أهمية في OCaml 5: فهو يحسّن الأداء بشكل ملحوظ في بعض الحالات، لكنه ليس ضروريًا للصحّة الأساسية في معظم حالات الاستعمال.

## 27.1 إزالة الالتباس

قد يحدث أن تكون عدّة وسائط من وسائط باني ما نداءات عودية لدالة «ذَيلِي مع الباني». ولا يمكن للتحويل أن يحوّل إلا واحدًا من هذه النداءات إلى نداء ذَيلِي. ولن يتّخذ المترجم خيارًا ضمنيًا، بل سيطلب من المستخدم إزالة الالتباس صراحةً.

تأمّل هذا النوع من التعابير النحوية (بافتراض وجود نوع سابق `var` لمتغيّرات التعابير):

```ocaml
type var (* some pre-existing type of variables *)

type exp =
  | Var of var
  | Let of binding * exp
and binding = var * exp
```

تأمّل دالة `map` على المتغيّرات. التعريف المباشر يحتوي نداءين عوديين داخل وسائط الباني `Let`، فيُرفض بوصفه ملتبسًا.

```ocaml
let[@tail_mod_cons] rec map_vars f exp =
  match exp with
  | Var v -> Var (f v)
  | Let ((v, def), body) ->
    Let ((f v, map_vars f def), map_vars f body)

Error: [@tail_mod_cons]: this constructor application may be TMC-transformed
       in several different ways. Please disambiguate by adding an explicit
       [@tailcall] attribute to the call that should be made tail-recursive,
       or a [@tailcall false] attribute on calls that should not be
       transformed.
  This call could be annotated.
  This call could be annotated.
```

لإزالة الالتباس، ينبغي للمستخدم أن يضيف السمة `[@tailcall]` إلى النداء العودي الذي يجب تحويله إلى موضع ذَيلِي:

```ocaml
let[@tail_mod_cons] rec map_vars f exp =
  match exp with
  | Var v -> Var (f v)
  | Let ((v, def), body) ->
    Let ((f v, map_vars f def), (map_vars[@tailcall]) f body)
```

اعلم أن الدالة الناتجة *ليست* عودية ذَيلِيَّة، فالنداء العودي على `def` سيستهلك مساحة مكدّس. غير أن أشجار التعابير تميل إلى الانحدار يمينًا (كثير من `Let` متتالية، لا متداخلة بعضها في بعض)، لذا فإن وضع النداء على `body` في موضع ذَيلِي تحسين مثير للاهتمام على التعريف الساذج: فهو يعطي استهلاكًا محدودًا لمساحة المكدّس إن افترضنا حدًّا لعمق تداخل بنى `Let`.

وسيظهر خطأ أيضًا عند استعمال تعليقات متعارضة، تطلب وضع وسيطتين من وسائط الباني في موضع ذَيلِي:

```ocaml
let[@tail_mod_cons] rec map_vars f exp =
  match exp with
  | Var v -> Var (f v)
  | Let ((v, def), body) ->
    Let ((f v, (map_vars[@tailcall]) f def), (map_vars[@tailcall]) f body)

Error: [@tail_mod_cons]: this constructor application may be TMC-transformed
       in several different ways. Only one of the arguments may become a TMC
       call, but several arguments contain calls that are explicitly marked
       as tail-recursive. Please fix the conflict by reviewing and fixing the
       conflicting annotations.
  This call is explicitly annotated.
  This call is explicitly annotated.
```

## 27.2 خطر: الخروج من «ذَيلِي مع الباني»

بسبب طبيعة تحويل «ذَيلِي مع الباني» (انظر القسم 27.3 لعرض التحويل):

- النداءات من دالة «ذَيلِي مع الباني» إلى دالة أخرى «ذَيلِي مع الباني» مصرَّحة في مجموعة الربط العودية نفسها تُحوَّل إلى نداءات ذَيلية، بمجرّد أن تقع في موضع ذَيلِي أو موضع «ذَيلِي مع الباني» في الدالة المصدرية.

- النداءات من دالة *غير* معلَّقة بـ «ذَيلِي مع الباني» إلى دالة «ذَيلِي مع الباني»، أو على العكس من دالة «ذَيلِي مع الباني» إلى دالة غير «ذَيلِي مع الباني»، تُحوَّل إلى نداءات *غير* ذَيلية، حتى وإن ظهرت نحويًا في موضع ذَيلِي في البرنامج المصدري.

كون النداءات الواقعة في موضع ذَيلِي في البرنامج المصدر قد تصير نداءات غير ذَيلية إذا انتقلت من دالة «ذَيلِي مع الباني» إلى دالة غير «ذَيلِي مع الباني» أمر مفاجئ، وسينبّه التحويل إليها.

مثال:

```ocaml
let[@tail_mod_cons] rec flatten = function
| [] -> []
| xs :: xss ->
    let rec append_flatten xs xss =
      match xs with
      | [] -> flatten xss
      | x :: xs -> x :: append_flatten xs xss
    in append_flatten xs xss

Warning 71 [unused-tmc-attribute]: This function is marked @tail_mod_cons
  but is never applied in TMC position.
Warning 72 [tmc-breaks-tailcall]: This call is in tail-modulo-cons position
  in a TMC function, but the function called is not itself specialized for
  TMC, so the call will not be transformed into a tail call.
  Please either mark the called function with the [@tail_mod_cons] attribute,
  or mark this call with the [@tailcall false] attribute to make its
  non-tailness explicit.
```

هنا المساعدة `append_flatten` غير معلَّقة بـ `[@tail_mod_cons]`، فالنداءان `append_flatten xs xss` و`flatten xss` *لن* يكونا نداءين ذَيلِيين. والإصلاح الصحيح هنا تعليق `append_flatten` لتكون «ذَيلِي مع الباني».

```ocaml
let[@tail_mod_cons] rec flatten = function
| [] -> []
| xs :: xss ->
    let[@tail_mod_cons] rec append_flatten xs xss =
      match xs with
      | [] -> flatten xss
      | x :: xs -> x :: append_flatten xs xss
    in append_flatten xs xss
```

ويحدث التحذير نفسه عندما تكون `append_flatten` دالة غير «ذَيلِي مع الباني» في مجموعة التتبّع العودي نفسها؛ فاستعمال تحويل «ذَيلِي مع الباني» خاصية دوال مفردة، لا مجموعات عودية كاملة.

```ocaml
let[@tail_mod_cons] rec flatten = function
| [] -> []
| xs :: xss -> append_flatten xs xss

and append_flatten xs xss =
  match xs with
  | [] -> flatten xss
  | x :: xs -> x :: append_flatten xs xss

Warning 71 [unused-tmc-attribute]: This function is marked @tail_mod_cons
  but is never applied in TMC position.
Warning 72 [tmc-breaks-tailcall]: This call is in tail-modulo-cons position
  in a TMC function, but the function called is not itself specialized for
  TMC, so the call will not be transformed into a tail call.
  Please either mark the called function with the [@tail_mod_cons] attribute,
  or mark this call with the [@tailcall false] attribute to make its
  non-tailness explicit.
```

ومرة أخرى، الإصلاح هو تخصيص `append_flatten` أيضًا:

```ocaml
let[@tail_mod_cons] rec flatten = function
| [] -> []
| xs :: xss -> append_flatten xs xss

and[@tail_mod_cons] append_flatten xs xss =
  match xs with
  | [] -> flatten xss
  | x :: xs -> x :: append_flatten xs xss
```

يمكن أيضًا تعليق الدوال غير العودية بـ `[@tail_mod_cons]`؛ وهذا مفيد عادةً لعمليات الربط المحلية بالدوال العودية.

النسخة غير الصحيحة:

```ocaml
let[@tail_mod_cons] rec map_vars f exp =
  let self exp = map_vars f exp in
  match exp with
  | Var v -> Var (f v)
  | Let ((v, def), body) ->
    Let ((f v, self def), (self[@tailcall]) body)

Warning 51 [wrong-tailcall-expectation]: expected tailcall

Warning 51 [wrong-tailcall-expectation]: expected tailcall
Warning 71 [unused-tmc-attribute]: This function is marked @tail_mod_cons
  but is never applied in TMC position.
```

الإصلاح الموصى به:

```ocaml
let[@tail_mod_cons] rec map_vars f exp =
  let[@tail_mod_cons] self exp = map_vars f exp in
  match exp with
  | Var v -> Var (f v)
  | Let ((v, def), body) ->
    Let ((f v, self def), (self[@tailcall]) body)
```

وفي حالات أخرى، لا منفعة في جعل الدالة المدعوّة «ذَيلِي مع الباني»، أو لا يمكن ذلك: مثلًا إذا كانت معاملًا داليًا (فالتحويل لا يعمل إلا مع النداءات المباشرة إلى دوال معروفة).

تأمّل، مثلًا، دالة إحلال على أشجار ثنائية:

```ocaml
type 'a tree = Leaf of 'a | Node of 'a tree * 'a tree

let[@tail_mod_cons] rec bind (f : 'a -> 'a tree) (t : 'a tree) : 'a tree =
  match t with
  | Leaf v -> f v
  | Node (left, right) ->
    Node (bind f left, (bind[@tailcall]) f right)

Warning 72 [tmc-breaks-tailcall]: This call is in tail-modulo-cons position
  in a TMC function, but the function called is not itself specialized for
  TMC, so the call will not be transformed into a tail call.
  Please either mark the called function with the [@tail_mod_cons] attribute,
  or mark this call with the [@tailcall false] attribute to make its
  non-tailness explicit.
```

هنا `f` معامل دالي، لا نداء مباشر، والتنفيذ الحالي من الرتبة الأولى بصرامة، فهو لا يدعم وسائط «ذَيلِي مع الباني». في هذه الحالة، ينبغي للمستخدم أن يشير إلى إدراكه أن النداء `f v` ليس، في الحقيقة، في موضع ذَيلِي، باستعمال `(f[@tailcall false]) v`.

```ocaml
type 'a tree = Leaf of 'a | Node of 'a tree * 'a tree

let[@tail_mod_cons] rec bind (f : 'a -> 'a tree) (t : 'a tree) : 'a tree =
  match t with
  | Leaf v -> (f[@tailcall false]) v
  | Node (left, right) ->
    Node (bind f left, (bind[@tailcall]) f right)
```

## 27.3 تفاصيل التحويل

لاستعمال هذه الميزة المتقدّمة، من المفيد أن تعرف أن تحويل الدالة يُنتج دالة مخصَّصة بنمط تمرير الوجهة.

لنتذكّر مثال `map`:

```ocaml
let rec map f l =
  match l with
  | [] -> []
  | x :: xs ->
    let y = f x in
    y :: map f xs
```

فيما يلي وصف البرنامج المحوَّل بترميز شبه-OCaml: بعض العمليات لا يمكن التعبير عنها في شيفرة OCaml المصدرية. (يحدث التحويل في الواقع على التمثيل الوسيط Lambda في مترجم OCaml.)

```text
let rec map f l =
  match l with
  | [] -> []
  | x :: xs ->
    let y = f x in
    let dst = y ::{mutable} Hole in
    map_dps f xs dst 1;
    dst

and map_dps f l dst idx =
  match l with
  | [] -> dst.idx <- []
  | x :: xs ->
    let y = f x in
    let dst' = y ::{mutable} Hole in
    dst.idx <- dst';
    map_dps f xs dst' 1
```

تتحوّل نسخة `map` المصدرية إلى دالتين: نسخة *بالنمط المباشر* تُسمّى هي أيضًا `map`، ونسخة *بنمط تمرير الوجهة* (DPS) تُسمّى `map_dps`. ولا تعيد نسخة تمرير الوجهة نتيجة مباشرة، بل تكتبها في موضع ذاكرة يحدّده معاملان إضافيان للدالة: `dst` (كتلة ذاكرة) و`i` (موضع داخل كتلة الذاكرة).

ويتحوّل النداء المصدري `y :: map f xs` إلى إنشاء كتلة قابلة للتغيير `y ::{mutable} Hole`، وسيطها الثاني *ثقب* غير مهيّأ. ثم تُمرَّر الكتلة إلى `map_dps` معاملًا للوجهة (بإزاحة `1`).

لاحظ أن `map` لا تنادي نفسها عوديًا، بل تنادي `map_dps`. ثم تنادي `map_dps` نفسها عوديًا، بطريقة عودية ذَيلِيَّة.

والنداء من `map` إلى `map_dps` *ليس* نداء ذَيلِيًّا (وهذا شيء يمكن أن نحسّنه في المستقبل)؛ لكن هذا النداء يحدث مرة واحدة فقط عند استدعاء `map f l`، وتُعالَج كل عناصر القائمة بعد العنصر الأول في مكدّس ثابت بواسطة `map_dps`.

وهذا يفسّر دقائق «الخروج من ذَيلِي مع الباني». تأمّل مثالنا السابق المتعلّق بالتعاود المتبادل بين `flatten` و`append_flatten`.

```text
let[@tail_mod_cons] rec flatten l =
  match l with
  | [] -> []
  | xs :: xss ->
    append_flatten xs xss
```

يتحوّل النداء إلى `append_flatten`، الذي يظهر نحويًا في موضع ذَيلِي، بطرق مختلفة بحسب توفّر نسخة بنمط تمرير الوجهة للدالة، أي بحسب ما إذا كانت هي نفسها معلَّقة بـ `[@tail_mod_cons]`:

```text
(* if append_flatten_dps exists *)
and flatten_dps l dst i =
  match l with
  | [] -> dst.i <- []
  | xs :: xss ->
    append_flatten_dps xs xss dst i

(* if append_flatten_dps does not exist *)
and rec flatten_dps l dst i =
  match l with
  | [] -> dst.i <- []
  | xs :: xss ->
    dst.i <- append_flatten xs xss
```

إذا لم تكن لـ `append_flatten` نسخة بنمط تمرير الوجهة، يتحوّل النداء إلى نداء غير ذَيلِي.

## 27.4 القيود الحالية

##### معيار نحوي محض

كما هو حال النداءات الذَيلية عمومًا، فإن مفهوم موضع «ذَيلِي مع الباني» نحوي محض؛ وبعض عمليات إعادة الهيكلة البسيطة ستُخرج النداءات من موضع «ذَيلِي مع الباني».

```ocaml
(* works as expected *)
let[@tail_mod_cons] rec map f li =
  match li with
  | [] -> []
  | x :: xs ->
    let y = f x in
    y ::
      (* this call is in TMC position *)
      map f xs
```

```ocaml
(* not optimizable anymore *)
let[@tail_mod_cons] rec map f li =
  match li with
  | [] -> []
  | x :: xs ->
    let y = f x in
    let ys =
      (* this call is not in TMC position anymore *)
      map f xs in
    y :: ys

Warning 71 [unused-tmc-attribute]: This function is marked @tail_mod_cons
  but is never applied in TMC position.
```

##### تحويل محلي من الرتبة الأولى

عندما تُحوَّل دالة بـ «ذَيلِي مع الباني»، يُولَّد تعريفان: أحدهما يوفّر واجهة بالنمط المباشر والآخر يوفّر نسخة بنمط تمرير الوجهة. ومع ذلك، لن تستعمل كل النداءات إلى هذه الدالة في موضع «ذَيلِي مع الباني» نسخة تمرير الوجهة وتصير نداءات ذَيلية:

- التحويل محلي: لا تصير نداءات «ذَيلِي مع الباني» إلى `foo` نداءات ذَيلية إلا إذا كانت في وحدة الترجمة نفسها التي فيها `foo`.

- التحويل من الرتبة الأولى: لا تصير نداءات «ذَيلِي مع الباني» نداءات ذَيلية إلا إذا كانت نداءات مباشرة إلى دوال معروفة «ذَيلِي مع الباني»، ولا تصير كذلك أبدًا النداءات إلى معاملات دالية.

تأمّل النداء `Option.map foo x` مثلًا: حتى لو كان `foo` مدعوًّا في موضع «ذَيلِي مع الباني» داخل تعريف `Option.map`، فلن يصير ذلك النداء أبدًا نداءً ذَيلِيًّا. (وهذا سيكون الحال حتى لو كان النداء إلى `Option.map` داخل الوحدة `Option`.)

وبوجه عام، هذا القيد ليس مشكلة في الدوال العودية: فالنداء الأول من وحدة خارجية أو من دالة عالية الرتبة سيستهلك مساحة مكدّس، لكن النداءات العودية اللاحقة في موضع «ذَيلِي مع الباني» ستُحسَّن. فمثلًا، إذا عُرِّفت `List.map` دالةً «ذَيلِي مع الباني»، فلن تصير النداءات من خارج الوحدة `List` نداءات ذَيلية إذا وقعت في مواضع ذَيلية، أما النداءات العودية داخل تعريف `List.map` فهي في مواضع «ذَيلِي مع الباني» وتصير بالفعل نداءات ذَيلية: معالجة العنصر الأول من القائمة ستستهلك مساحة مكدّس، أما كل العناصر اللاحقة فتُعالَج في مساحة ثابتة.

وقد تكون هذه القيود مشكلة في حالات أعقد يحدث فيها تعاود متبادل بين دوال، بعضها غير معلَّق بـ «ذَيلِي مع الباني»، أو معرَّفة في وحدات مختلفة، أو مدعوّة على نحو غير مباشر، مثلًا عبر معاملات دالية.

##### النداءات غير المطابقة للدوال الصفوفية

يجري OCaml تحسينًا ضمنيًا للدوال «الصفوفية»، التي تأخذ معاملًا واحدًا هو صفّ: `let f (x, y, z) = ...`. فالنداءات المباشرة إلى هذه الدوال بوسيط صفّ حرفي (مثل `f (a, b, c)`) تنادي الدالة «الصفوفية» بتمرير المعاملات مباشرة، بدلًا من بناء صفّ منها. أما النداءات الأخرى، سواء كانت غير مباشرة أو تمرّر قيمة صفّ أعقد (مثل `let t = (a, b, c) in f t`)، فتُترجَم نداءات «غير مطابقة» تمرّ عبر غلاف.

يدعم تحويل `[@tail_mod_cons]` الدوال الصفوفية، لكنه لا يحسّن إلا النداءات «المطابقة» في موضع ذَيلِي؛ فالنداءات المباشرة إلى شيء غير صفّ حرفي لن تصير نداءات ذَيلية. ويمكن للمستخدم أن يفكّ الصفّ يدويًا ليفرض على النداء أن يكون «مطابقًا»: `let (x, y, z) = t in f (x, y, z)`. وإذا كان ثمة شكّ في إمكان تحسين نداء ما بـ «ذَيلِي مع الباني»، فيمكن استعمال السمة `[@tailcall]` على الدالة المدعوّة، وهي ستنبّه إذا تعذّر التحويل.

```ocaml
let rec map (f, l) =
  match l with
  | [] -> []
  | x :: xs ->
    let y = f x in
    let args = (f, xs) in
    (* this inexact call cannot be tail-optimized, so a warning will be raised *)
    y :: (map[@tailcall]) args

Warning 51 [wrong-tailcall-expectation]: expected tailcall
```
