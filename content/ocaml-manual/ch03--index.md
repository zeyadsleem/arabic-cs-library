---
title: "الكائنات في OCaml"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 3: الكائنات في OCaml

*كتب هذا الفصل جيروم فوويون وديدييه ريمي وجاك غاريغ*

يقدّم هذا الفصل نظرة عامة على ميزات البرمجة الكائنية في OCaml.

لاحظ أنّ العلاقة بين الكائن والصنف والنوع في OCaml تختلف عنها في اللغات الكائنية الشائعة مثل Java و++C، فلا تفترض أنّ الكلمات المفتاحية المتشابهة تعني الشيء نفسه. تُستعمل الميزات الكائنية في OCaml أقلّ بكثير مما في تلك اللغات. فلـ OCaml بدائل غالبًا ما تكون أنسب، مثل الوحدات والموصِّلات. بل إنّ كثيرًا من برامج OCaml لا تستعمل الكائنات إطلاقًا.

## 3.1 الأصناف والكائنات

يعرّف الصنف `point` أدناه متغيّر نسخة واحدًا هو `x` ودالتين هما `get_x` و`move`. القيمة الابتدائية لمتغيّر النسخة هي `0`. وقد أُعلن المتغيّر `x` قابلًا للتغيير، لذا يمكن للدالة `move` أن تغيّر قيمته.

```ocaml
# class point =
    object
      val mutable x = 0
      method get_x = x
      method move d = x <- x + d
    end;;

class point :
  object val mutable x : int method get_x : int method move : int -> unit end
```

ننشئ الآن نقطة جديدة `p` هي نسخة من الصنف `point`.

```ocaml
# let p = new point;;

val p : point = <obj>
```

لاحظ أنّ نوع `p` هو `point`. هذا اختصار يعرّفه تعريف الصنف أعلاه تلقائيًا. وهو يرمز إلى نوع الكائن `<get_x : int; move : int -> unit>`، الذي يسرد دوال الصنف `point` مع أنواعها.

نستدعي الآن بعض دوال `p`:

```ocaml
# p#get_x;;

- : int = 0

# p#move 3;;

- : unit = ()

# p#get_x;;

- : int = 3
```

لا يجري تقييم جسم الصنف إلا عند إنشاء الكائن. لذلك، في المثال التالي، يُهيَّأ متغيّر النسخة `x` بقيمتين مختلفتين لكائنين مختلفين.

```ocaml
# let x0 = ref 0;;

val x0 : int ref = {contents = 0}

# class point =
    object
      val mutable x = incr x0; !x0
      method get_x = x
      method move d = x <- x + d
    end;;

class point :
  object val mutable x : int method get_x : int method move : int -> unit end

# new point#get_x;;

- : int = 1

# new point#get_x;;

- : int = 2
```

يمكن أيضًا تجريد الصنف `point` فوق القيم الابتدائية للإحداثي `x`.

```ocaml
# class point = fun x_init ->
    object
      val mutable x = x_init
      method get_x = x
      method move d = x <- x + d
    end;;

class point :
  int ->
  object val mutable x : int method get_x : int method move : int -> unit end
```

وكما في تعريفات الدوال، يمكن اختصار التعريف أعلاه كما يلي:

```ocaml
# class point x_init =
    object
      val mutable x = x_init
      method get_x = x
      method move d = x <- x + d
    end;;

class point :
  int ->
  object val mutable x : int method get_x : int method move : int -> unit end
```

أصبحت نسخة الصنف `point` الآن دالة تتوقّع وسيطًا ابتدائيًا لإنشاء كائن نقطة:

```ocaml
# new point;;

- : int -> point = <fun>

# let p = new point 7;;

val p : point = <obj>
```

الوسيط `x_init` ظاهر بالطبع في جسم التعريف كله، بما في ذلك الدوال. ومثالًا على ذلك، تُعيد الدالة `get_offset` في الصنف أدناه موضع الكائن نسبةً إلى موضعه الابتدائي.

```ocaml
# class point x_init =
    object
      val mutable x = x_init
      method get_x = x
      method get_offset = x - x_init
      method move d = x <- x + d
    end;;

class point :
  int ->
  object
    val mutable x : int
    method get_offset : int
    method get_x : int
    method move : int -> unit
  end
```

يمكن تقييم التعابير وربطها قبل تعريف جسم كائن الصنف. وهذا مفيد لفرض الثوابت. فمثلًا يمكن ضبط النقاط تلقائيًا على أقرب نقطة في شبكة كما يلي:

```ocaml
# class adjusted_point x_init =
    let origin = (x_init / 10) * 10 in
    object
      val mutable x = origin
      method get_x = x
      method get_offset = x - origin
      method move d = x <- x + d
    end;;

class adjusted_point :
  int ->
  object
    val mutable x : int
    method get_offset : int
    method get_x : int
    method move : int -> unit
  end
```

(ويمكن أيضًا رفع استثناء إذا لم يكن الإحداثي `x_init` على الشبكة.) بل يمكن الحصول على الأثر نفسه هنا باستدعاء تعريف الصنف `point` بالقيمة `origin`.

```ocaml
# class adjusted_point x_init =  point ((x_init / 10) * 10);;

class adjusted_point : int -> point
```

ومن الحلول البديلة تعريف الضبط في دالة تخصيص خاصة:

```ocaml
# let new_adjusted_point x_init = new point ((x_init / 10) * 10);;

val new_adjusted_point : int -> point = <fun>
```

غير أنّ النمط الأول أنسب عمومًا، لأنّ شيفرة الضبط جزء من تعريف الصنف وستُورَّث.

توفّر هذه الإمكانية بواني أصناف كما تُوجد في لغات أخرى. ويمكن تعريف عدّة بوانٍ بهذه الطريقة لبناء كائنات من الصنف نفسه بأنماط تهيئة مختلفة؛ والبديل هو استعمال المهيّئات كما هو موصوف أدناه في القسم 3.4.

## 3.2 الكائنات المباشرة

ثمّة طريقة أخرى أكثر مباشرة لإنشاء كائن: إنشاؤه من دون المرور بصنف.

الصياغة مطابقة تمامًا لصياغة تعابير الأصناف، لكن النتيجة كائن واحد لا صنف. وكل التركيبات الموصوفة في بقيّة هذا القسم تنطبق أيضًا على الكائنات المباشرة.

```ocaml
# let p =
    object
      val mutable x = 0
      method get_x = x
      method move d = x <- x + d
    end;;

val p : < get_x : int; move : int -> unit > = <obj>

# p#get_x;;

- : int = 0

# p#move 3;;

- : unit = ()

# p#get_x;;

- : int = 3
```

وخلافًا للأصناف، التي لا يمكن تعريفها داخل تعبير، يمكن للكائنات المباشرة أن تظهر في أي موضع، مستعملةً متغيّرات من محيطها.

```ocaml
# let minmax x y =
    if x < y then object method min = x method max = y end
    else object method min = y method max = x end;;

val minmax : 'a -> 'a -> < max : 'a; min : 'a > = <fun>
```

للكائنات المباشرة ضعفان مقارنةً بالأصناف: أنواعها غير مختصرة، ولا يمكن الوراثة منها. لكنّ هذين الضعفين قد يكونان ميزتين في بعض الحالات، كما سنرى في القسمين 3.3 و3.10.

## 3.3 الإشارة إلى الذات

يمكن لدالة أو لمهيّئ أن يستدعي دوال على الذات (أي الكائن الحالي). ولذلك يجب ربط الذات صراحةً، وهنا بالمتغيّر `s` (ويمكن أن يكون `s` أي معرّف، وإن كنّا سنختار غالبًا الاسم `self`.)

```ocaml
# class printable_point x_init =
    object (s)
      val mutable x = x_init
      method get_x = x
      method move d = x <- x + d
      method print = print_int s#get_x
    end;;

class printable_point :
  int ->
  object
    val mutable x : int
    method get_x : int
    method move : int -> unit
    method print : unit
  end

# let p = new printable_point 7;;

val p : printable_point = <obj>

# p#print;;

7- : unit = ()
```

ديناميكيًا، يُربط المتغيّر `s` عند استدعاء دالة. وعلى وجه الخصوص، عندما يُورَّث الصنف `printable_point`، سيُربط المتغيّر `s` ربطًا صحيحًا بكائن الصنف الفرعي.

من المشكلات الشائعة في الذات أنّ نوعها قد يُوسَّع في الأصناف الفرعية، فلا يمكن تثبيته مسبقًا. وهذا مثال بسيط.

```ocaml
# let ints = ref [];;

val ints : '_weak1 list ref = {contents = []}

# class my_int =
    object (self)
      method n = 1
      method register = ints := self :: !ints
    end ;;

Error: The value self has type < n : int; register : 'a; .. >
       but an expression was expected of type 'weak1
       Self type cannot escape its class
```

يمكنك تجاهل أوّل سطرين من رسالة الخطأ. المهم هو السطر الأخير: فوضع الذات في مرجع خارجي سيجعل توسيعها بالوراثة مستحيلًا. وسنرى في القسم 3.12 حلًّا بديلًا لهذه المشكلة. غير أنّ المشكلة لا تحدث مع الكائنات المباشرة، لأنها غير قابلة للتوسيع.

```ocaml
# let my_int =
    object (self)
      method n = 1
      method register = ints := self :: !ints
    end;;

val my_int : < n : int; register : unit > = <obj>
```

## 3.4 المهيّئات

تُقيَّم روابط let داخل تعريفات الأصناف قبل بناء الكائن. ويمكن أيضًا تقييم تعبير فورًا بعد بناء الكائن. وتُكتب هذه الشيفرة دالةً مخفية مجهولة تُسمّى مهيّئًا. ولذلك يمكنها الوصول إلى الذات وإلى متغيّرات النسخة.

```ocaml
# class printable_point x_init =
    let origin = (x_init / 10) * 10 in
    object (self)
      val mutable x = origin
      method get_x = x
      method move d = x <- x + d
      method print = print_int self#get_x
      initializer print_string "new point at "; self#print; print_newline ()
    end;;

class printable_point :
  int ->
  object
    val mutable x : int
    method get_x : int
    method move : int -> unit
    method print : unit
  end

# let p = new printable_point 17;;

new point at 10
val p : printable_point = <obj>
```

لا يمكن تجاوز المهيّئات. بل تُقيَّم كل المهيّئات بالتتابع. والمهيّئات مفيدة خصوصًا لفرض الثوابت. ويمكن رؤية مثال آخر في القسم 8.1.

## 3.5 الدوال المجرّدة

يمكن إعلان دالة من دون تعريفها فعليًا، باستعمال الكلمة المفتاحية `virtual`. وستُوفَّر هذه الدالة لاحقًا في الأصناف الفرعية. ويجب وسم الصنف الذي يحتوي دوالًا مجرّدة بـ `virtual`، ولا يمكن إنشاء نسخ منه (أي لا يمكن إنشاء أي كائن من هذا الصنف). لكنه يظلّ يعرّف اختصارات أنواع (بمعاملة الدوال المجرّدة كغيرها من الدوال.)

```ocaml
# class virtual abstract_point x_init =
    object (self)
      method virtual get_x : int
      method get_offset = self#get_x - x_init
      method virtual move : int -> unit
    end;;

class virtual abstract_point :
  int ->
  object
    method get_offset : int
    method virtual get_x : int
    method virtual move : int -> unit
  end

# class point x_init =
    object
      inherit abstract_point x_init
      val mutable x = x_init
      method get_x = x
      method move d = x <- x + d
    end;;

class point :
  int ->
  object
    val mutable x : int
    method get_offset : int
    method get_x : int
    method move : int -> unit
  end
```

يمكن أيضًا إعلان متغيّرات النسخة مجرّدة، بالأثر نفسه الذي للدوال.

```ocaml
# class virtual abstract_point2 =
    object
      val mutable virtual x : int
      method move d = x <- x + d
    end;;

class virtual abstract_point2 :
  object val mutable virtual x : int method move : int -> unit end

# class point2 x_init =
    object
      inherit abstract_point2
      val mutable x = x_init
      method get_offset = x - x_init
    end;;

class point2 :
  int ->
  object
    val mutable x : int
    method get_offset : int
    method move : int -> unit
  end
```

## 3.6 الدوال الخاصة

الدوال الخاصة هي دوال لا تظهر في واجهات الكائنات. ولا يمكن استدعاؤها إلا من دوال أخرى في الكائن نفسه.

```ocaml
# class restricted_point x_init =
    object (self)
      val mutable x = x_init
      method get_x = x
      method private move d = x <- x + d
      method bump = self#move 1
    end;;

class restricted_point :
  int ->
  object
    val mutable x : int
    method bump : unit
    method get_x : int
    method private move : int -> unit
  end

# let p = new restricted_point 0;;

val p : restricted_point = <obj>

# p#move 10 ;;

Error: This expression has type restricted_point
       It has no method move

# p#bump;;

- : unit = ()
```

لاحظ أنّ هذا ليس الشيء نفسه الذي تعنيه الدوال الخاصة والمحمية في Java أو ++C، والتي يمكن استدعاؤها من كائنات أخرى من الصنف نفسه. وهذا نتيجة مباشرة لاستقلال الأنواع عن الأصناف في OCaml: فقد ينتج صنفان غير مترابطين كائنات من النوع نفسه، ولا سبيل على مستوى النوع إلى التأكّد من أنّ كائنًا ما يأتي من صنف معيّن. غير أنّ طريقة تشفير ممكنة للدوال الصديقة ترد في القسم 3.17.

تُورَّث الدوال الخاصة (فهي ظاهرة افتراضيًا في الأصناف الفرعية)، إلا إذا حُجبت بمطابقة توقيع كما هو موصوف أدناه.

ويمكن جعل الدوال الخاصة عامة في صنف فرعي.

```ocaml
# class point_again x =
    object (self)
      inherit restricted_point x
      method virtual move : _
    end;;

class point_again :
  int ->
  object
    val mutable x : int
    method bump : unit
    method get_x : int
    method move : int -> unit
  end
```

لا تُستعمل إضافة `virtual` هنا إلا للإشارة إلى دالة من دون تقديم تعريفها. ولأننا لم نضف `private`، صارت الدالة عامة مع الحفاظ على تعريفها الأصلي.

وثمّة تعريف بديل هو:

```ocaml
# class point_again x =
    object (self : < move : _; ..> )
      inherit restricted_point x
    end;;

class point_again :
  int ->
  object
    val mutable x : int
    method bump : unit
    method get_x : int
    method move : int -> unit
  end
```

فالقيد على نوع الذات يفرض وجود دالة عامة `move`، وهذا كافٍ لتجاوز `private`.

قد يُظنّ أنّ الدالة الخاصة ينبغي أن تبقى خاصة في الصنف الفرعي. غير أنّ الدالة، بما أنها ظاهرة في الصنف الفرعي، يمكن دائمًا أخذ شيفرتها وتعريف دالة بالاسم نفسه تُشغّل تلك الشيفرة، فيكون حلّ ثالث (أثقل) هو:

```ocaml
# class point_again x =
    object
      inherit restricted_point x as super
      method move = super#move
    end;;

class point_again :
  int ->
  object
    val mutable x : int
    method bump : unit
    method get_x : int
    method move : int -> unit
  end
```

وبالطبع يمكن أن تكون الدوال الخاصة مجرّدة أيضًا. وحينها يجب أن تظهر الكلمات المفتاحية بهذا الترتيب: `method private virtual`.

## 3.7 واجهات الأصناف

تُستنتج واجهات الأصناف من تعريفات الأصناف. ويمكن أيضًا تعريفها مباشرةً واستعمالها لتقييد نوع صنف. وهي، مثل تصريحات الأصناف، تعرّف اختصار نوع جديدًا.

```ocaml
# class type restricted_point_type =
    object
      method get_x : int
      method bump : unit
  end;;

class type restricted_point_type =
  object method bump : unit method get_x : int end

# fun (x : restricted_point_type) -> x;;

- : restricted_point_type -> restricted_point_type = <fun>
```

وإضافةً إلى توثيق البرامج، يمكن استعمال واجهات الأصناف لتقييد نوع صنف. ويمكن لقيد نوع الصنف أن يحجب متغيّرات النسخة الملموسة والدوال الخاصة الملموسة معًا. أمّا الدوال العامة والأعضاء المجرّدة فلا يمكن حجبها.

```ocaml
# class restricted_point' x = (restricted_point x : restricted_point_type);;

class restricted_point' : int -> restricted_point_type
```

أو، وبالتكافؤ:

```ocaml
# class restricted_point' = (restricted_point : int -> restricted_point_type);;

class restricted_point' : int -> restricted_point_type
```

ويمكن أيضًا تحديد واجهة صنف في توقيع وحدة، واستعمالها لتقييد التوقيع المستنتج لوحدة.

```ocaml
# module type POINT = sig
    class restricted_point' : int ->
      object
        method get_x : int
        method bump : unit
      end
  end;;

module type POINT =
  sig
    class restricted_point' :
      int -> object method bump : unit method get_x : int end
  end

# module Point : POINT = struct
    class restricted_point' = restricted_point
  end;;

module Point : POINT
```

## 3.8 الوراثة

نوضّح الوراثة بتعريف صنف للنقاط الملوّنة يرث من صنف النقاط. لهذا الصنف كل متغيّرات النسخة وكل دوال صنف `point`، إضافةً إلى متغيّر نسخة جديد `c` ودالة جديدة `color`.

```ocaml
# class colored_point x (c : string) =
    object
      inherit point x
      val c = c
      method color = c
    end;;

class colored_point :
  int ->
  string ->
  object
    val c : string
    val mutable x : int
    method color : string
    method get_offset : int
    method get_x : int
    method move : int -> unit
  end

# let p' = new colored_point 5 "red";;

val p' : colored_point = <obj>

# p'#get_x, p'#color;;

- : int * string = (5, "red")
```

النقطة والنقطة الملوّنة لهما نوعان غير متوافقين، لأنّ النقطة لا تملك الدالة `color`. غير أنّ الدالة `get_succ_x` أدناه دالة عامة تطبّق الدالة `get_x` على أي كائن `p` يملك هذه الدالة (وربما دوال أخرى، تُمثَّل بعلامة حذف في النوع). ولذلك تنطبق على النقاط والنقاط الملوّنة معًا.

```ocaml
# let get_succ_x p = p#get_x + 1;;

val get_succ_x : < get_x : int; .. > -> int = <fun>

# get_succ_x p + get_succ_x p';;

- : int = 8
```

لا يلزم أن تُعلَن الدوال مسبقًا، كما يبيّن المثال:

```ocaml
# let set_x p = p#set_x;;

val set_x : < set_x : 'a; .. > -> 'a = <fun>

# let incr p = set_x p (get_succ_x p);;

val incr : < get_x : int; set_x : int -> 'a; .. > -> 'a = <fun>
```

## 3.9 الوراثة المتعددة

الوراثة المتعددة مسموح بها. ولا يُحفظ إلا آخر تعريف لدالة: فإعادة تعريف دالة كانت ظاهرة في الصنف الأب في صنف فرعي تتجاوز تعريف الصنف الأب. ويمكن إعادة استعمال التعريفات السابقة لدالة بربط السلف المعني. وفي ما يلي، يُربط `super` بالسلف `printable_point`. والاسم `super` معرّف قيمي زائف لا يمكن استعماله إلا لاستدعاء دالة صنف أب، كما في `super#print`.

```ocaml
# class printable_colored_point y c =
    object (self)
      val c = c
      method color = c
      inherit printable_point y as super
      method! print =
        print_string "(";
        super#print;
        print_string ", ";
        print_string (self#color);
        print_string ")"
    end;;

class printable_colored_point :
  int ->
  string ->
  object
    val c : string
    val mutable x : int
    method color : string
    method get_x : int
    method move : int -> unit
    method print : unit
  end

# let p' = new printable_colored_point 17 "red";;

new point at (10, red)
val p' : printable_colored_point = <obj>

# p'#print;;

(10, red)- : unit = ()
```

والدالة الخاصة التي حُجبت في الصنف الأب لم تعد ظاهرة، فلا تُتجاوز. ولأنّ المهيّئات تُعامَل كدوال خاصة، تُقيَّم كل المهيّئات على طول التسلسل الهرمي للصنف، بالترتيب الذي أُدخلت به.

لاحظ أنّ الدالة `print` وُسمت صراحةً، لأجل الوضوح، بأنها تتجاوز تعريفًا آخر، وذلك بإضافة علامة تعجّب `!` إلى الكلمة المفتاحية `method`. ولو لم تكن `print` تتجاوز الدالة `print` في `printable_point`، لرفع المترجم خطأً:

```ocaml
#   object
      method! m = ()
    end;;

Error: The method m has no previous definition
```

وتعمل إضافة التجاوز الصريحة هذه أيضًا مع `val` و`inherit`:

```ocaml
# class another_printable_colored_point y c c' =
    object (self)
    inherit printable_point y
    inherit! printable_colored_point y c
    val! c = c'
    end;;

class another_printable_colored_point :
  int ->
  string ->
  string ->
  object
    val c : string
    val mutable x : int
    method color : string
    method get_x : int
    method move : int -> unit
    method print : unit
  end
```

## 3.10 الأصناف ذات المعاملات

يمكن تنفيذ خلايا المراجع كائناتٍ. والتعريف الساذج يفشل في فحص الأنواع:

```ocaml
# class oref x_init =
    object
      val mutable x = x_init
      method get = x
      method set y = x <- y
    end;;

Error: Some type variables are unbound in this type:
         class oref :
           'a ->
           object
             val mutable x : 'a
             method get : 'a
             method set : 'a -> unit
           end
       The method get has type 'a where 'a is unbound
```

والسبب أنّ إحدى الدوال على الأقل لها نوع متعدّد الأشكال (وهنا نوع القيمة المخزّنة في خلية المرجع)، لذا إمّا أن يكون الصنف مُعامَلًا، وإمّا أن يُقيَّد نوع الدالة بنوع أحادي الشكل. ويمكن تعريف نسخة أحادية الشكل من الصنف كما يلي:

```ocaml
# class oref (x_init:int) =
    object
      val mutable x = x_init
      method get = x
      method set y = x <- y
    end;;

class oref :
  int ->
  object val mutable x : int method get : int method set : int -> unit end
```

لاحظ أنّ الكائنات المباشرة، بما أنها لا تعرّف نوع صنف، لا يقع عليها هذا القيد.

```ocaml
# let new_oref x_init =
    object
      val mutable x = x_init
      method get = x
      method set y = x <- y
    end;;

val new_oref : 'a -> < get : 'a; set : 'a -> unit > = <fun>
```

ومن ناحية أخرى، يجب أن يسرد صنف المراجع متعدّدة الأشكال معاملات النوع صراحةً في تصريحه. وتُسرد معاملات نوع الصنف بين `[` و`]`. ويجب أيضًا ربط معاملات النوع في موضع ما في جسم الصنف بقيد نوع.

```ocaml
# class ['a] oref x_init =
    object
      val mutable x = (x_init : 'a)
      method get = x
      method set y = x <- y
    end;;

class ['a] oref :
  'a -> object val mutable x : 'a method get : 'a method set : 'a -> unit end

# let r = new oref 1 in r#set 2; (r#get);;

- : int = 2
```

وقد يُقيَّد معامل النوع في التصريح فعليًا في جسم تعريف الصنف. وفي نوع الصنف، تُعرض القيمة الفعلية لمعامل النوع في جملة `constraint`.

```ocaml
# class ['a] oref_succ (x_init:'a) =
    object
      val mutable x = x_init + 1
      method get = x
      method set y = x <- y
    end;;

class ['a] oref_succ :
  'a ->
  object
    constraint 'a = int
    val mutable x : int
    method get : int
    method set : int -> unit
  end
```

لننظر في مثال أعقد: تعريف دائرة قد يكون مركزها أي نوع من النقاط. نضع قيد نوع إضافيًا في الدالة `move`، لأنه لا يجوز أن تبقى متغيّرات حرّة غير محسوبة بمعاملات نوع الصنف.

```ocaml
# class ['a] circle (c : 'a) =
    object
      val mutable center = c
      method center = center
      method set_center c = center <- c
      method move = (center#move : int -> unit)
    end;;

class ['a] circle :
  'a ->
  object
    constraint 'a = < move : int -> unit; .. >
    val mutable center : 'a
    method center : 'a
    method move : int -> unit
    method set_center : 'a -> unit
  end
```

وثمّة تعريف بديل لـ `circle` يستعمل جملة `constraint` في تعريف الصنف، وهو مبين أدناه. والنوع `#point` المستعمل أدناه في جملة `constraint` اختصار ينتجه تعريف الصنف `point`. وهذا الاختصار يتّحد مع نوع أي كائن ينتمي إلى صنف فرعي من الصنف `point`. وهو يتوسّع فعليًا إلى `<get_x : int; move : int -> unit; ..>`. وهذا يقود إلى التعريف البديل التالي لـ `circle`، الذي يفرض قيودًا أقوى قليلًا على وسيطه، لأننا نتوقّع الآن أن يملك `center` الدالة `get_x`.

```ocaml
# class ['a] circle (c : 'a) =
    object
      constraint 'a = #point
      val mutable center = c
      method center = center
      method set_center c = center <- c
      method move = center#move
    end;;

class ['a] circle :
  'a ->
  object
    constraint 'a = #point
    val mutable center : 'a
    method center : 'a
    method move : int -> unit
    method set_center : 'a -> unit
  end
```

والصنف `colored_circle` نسخة متخصّصة من الصنف `circle` تشترط أن يتّحد نوع المركز مع `#colored_point`، وتضيف دالة `color`. لاحظ أنّك عند تخصيص صنف ذي معاملات يجب أن تعطي نسخة معامل النوع صراحةً دائمًا. وتُكتب هي أيضًا بين `[` و`]`.

```ocaml
# class ['a] colored_circle c =
    object
      constraint 'a = #colored_point
      inherit ['a] circle c
      method color = center#color
    end;;

class ['a] colored_circle :
  'a ->
  object
    constraint 'a = #colored_point
    val mutable center : 'a
    method center : 'a
    method color : string
    method move : int -> unit
    method set_center : 'a -> unit
  end
```

## 3.11 الدوال متعدّدة الأشكال

قد تكون الأصناف ذات المعاملات متعدّدة الأشكال في محتوياتها، لكنها لا تكفي للسماح بتعدّد أشكال استعمال الدوال.

ومن الأمثلة الكلاسيكية تعريف مُكرِّر (iterator).

```ocaml
# List.fold_left;;

- : ('acc -> 'a -> 'acc) -> 'acc -> 'a list -> 'acc = <fun>

# class ['a] intlist (l : int list) =
    object
      method empty = (l = [])
      method fold f (accu : 'a) = List.fold_left f accu l
    end;;

class ['a] intlist :
  int list ->
  object method empty : bool method fold : ('a -> int -> 'a) -> 'a -> 'a end
```

للوهلة الأولى يبدو أن لدينا مكرِّرًا متعدّد الأشكال، لكنّ هذا لا يعمل عمليًا.

```ocaml
# let l = new intlist [1; 2; 3];;

val l : '_weak2 intlist = <obj>

# l#fold (fun x y -> x+y) 0;;

- : int = 6

# l;;

- : int intlist = <obj>

# l#fold (fun s x -> s ^ Int.to_string x ^ " ") "" ;;

Error: The value s has type int but an expression was expected of type string
```

يعمل مكرِّرنا، كما يبيّن استعماله الأول للجمع. غير أنّ الكائنات نفسها ليست متعدّدة الأشكال (بل بوانيها فقط)، فاستعمال الدالة `fold` يثبّت نوعها لهذا الكائن بعينه. ويفشل محاولتنا التالية لاستعماله مكرِّرًا على السلاسل.

المشكلة هنا أنّ التكميم وُضع في غير موضعه: فليس الصنف هو ما نريد أن يكون متعدّد الأشكال، بل الدالة `fold`. ويمكن تحقيق ذلك بإعطاء نوع متعدّد الأشكال صراحةً في تعريف الدالة.

```ocaml
# class intlist (l : int list) =
    object
      method empty = (l = [])
      method fold : 'a. ('a -> int -> 'a) -> 'a -> 'a =
        fun f accu -> List.fold_left f accu l
    end;;

class intlist :
  int list ->
  object method empty : bool method fold : ('a -> int -> 'a) -> 'a -> 'a end

# let l = new intlist [1; 2; 3];;

val l : intlist = <obj>

# l#fold (fun x y -> x+y) 0;;

- : int = 6

# l#fold (fun s x -> s ^ Int.to_string x ^ " ") "";;

- : string = "1 2 3 "
```

وكما ترى في نوع الصنف الذي يعرضه المترجم، يجب أن تكون أنواع الدوال متعدّدة الأشكال صريحة تمامًا في تعريفات الأصناف (تظهر فورًا بعد اسم الدالة)، أمّا متغيّرات النوع المكمَّمة فيمكن تركها ضمنية في أوصاف الأصناف. ولماذا نشترط صراحة الأنواع؟ المشكلة أنّ `(int -> int -> int) -> int -> int` نوع صالح أيضًا للدالة `fold`، وهو غير متوافق مع النوع متعدّد الأشكال الذي أعطيناه (فالإحلال التلقائي لا يعمل إلا لمتغيّرات النوع في المستوى الأعلى، لا للمكمِّمات الداخلية، حيث تصبح المسألة غير قابلة للحسم.) فلا يستطيع المترجم الاختيار بين هذين النوعين، ويجب مساعدته.

غير أنّ النوع يمكن حذفه كليًا في تعريف الصنف إذا كان معروفًا سلفًا، بالوراثة أو بقيود النوع على الذات. وهذا مثال على تجاوز دالة.

```ocaml
# class intlist_rev l =
    object
      inherit intlist l
      method! fold f accu = List.fold_left f accu (List.rev l)
    end;;
```

والأسلوب التالي يفصل الوصف عن التعريف.

```ocaml
# class type ['a] iterator =
    object method fold : ('b -> 'a -> 'b) -> 'b -> 'b end;;

# class intlist' l =
    object (self : int #iterator)
      method empty = (l = [])
      method fold f accu = List.fold_left f accu l
    end;;
```

لاحظ هنا أسلوب `(self : int #iterator)`، الذي يضمن أن هذا الكائن ينفّذ الواجهة `iterator`.

تُستدعى الدوال متعدّدة الأشكال بالطريقة نفسها التي تُستدعى بها الدوال العادية تمامًا، لكن ينبغي أن تنتبه إلى بعض حدود استنتاج الأنواع. أي أنّ الدالة متعدّدة الأشكال لا يمكن استدعاؤها إلا إذا كان نوعها معروفًا عند موضع الاستدعاء. وإلّا فستُفترض الدالة أحادية الشكل، وتُعطى نوعًا غير متوافق.

```ocaml
# let sum lst = lst#fold (fun x y -> x+y) 0;;

val sum : < fold : (int -> int -> int) -> int -> 'a; .. > -> 'a = <fun>

# sum l ;;

Error: The value l has type
         intlist = < empty : bool; fold : 'a. ('a -> int -> 'a) -> 'a -> 'a >
       but an expression was expected of type
         < fold : (int -> int -> int) -> int -> 'b; .. >
       The method fold has type 'a. ('a -> int -> 'a) -> 'a -> 'a,
       but the expected method type was (int -> int -> int) -> int -> 'b
```

والحلّ سهل: ضع قيد نوع على الوسيط.

```ocaml
# let sum (lst : _ #iterator) = lst#fold (fun x y -> x+y) 0;;

val sum : int #iterator -> int = <fun>
```

وبالطبع يمكن أن يكون القيد نوع دالة صريحًا. ولا يُشترط إلا مواضع المتغيّرات المكمَّمة.

```ocaml
# let sum lst =
    (lst : < fold : 'a. ('a -> _ -> 'a) -> 'a -> 'a; .. >)#fold (+) 0;;

val sum : < fold : 'a. ('a -> int -> 'a) -> 'a -> 'a; .. > -> int = <fun>
```

ومن استعمالات الدوال متعدّدة الأشكال الأخرى السماح بنوع من الوراثة الضمنية في وسائط الدوال. وقد رأينا في القسم 3.8 كيف يمكن أن تكون بعض الدوال متعدّدة الأشكال في صنف وسيطها. ويمكن توسيع ذلك ليشمل الدوال.

```ocaml
# class type point0 = object method get_x : int end;;

class type point0 = object method get_x : int end

# class distance_point x =
    object
      inherit point x
      method distance : 'a. (#point0 as 'a) -> int =
        fun other -> abs (other#get_x - x)
    end;;

class distance_point :
  int ->
  object
    val mutable x : int
    method distance : #point0 -> int
    method get_offset : int
    method get_x : int
    method move : int -> unit
  end

# let p = new distance_point 3 in
  (p#distance (new point 8), p#distance (new colored_point 1 "blue"));;

- : int * int = (5, 2)
```

لاحظ هنا الصياغة الخاصة `(#point0 as 'a)` التي يجب استعمالها لتكميم الجزء القابل للتوسيع من `#point0`. وكما في رابط المتغيّر، يمكن حذفها في مواصفات الأصناف. وإذا أردت تعدّد الأشكال داخل حقل كائن، وجب تكميمه مستقلًّا.

```ocaml
# class multi_poly =
    object
      method m1 : 'a. (< n1 : 'b. 'b -> 'b; .. > as 'a) -> _ =
        fun o -> o#n1 true, o#n1 "hello"
      method m2 : 'a 'b. (< n2 : 'b -> bool; .. > as 'a) -> 'b -> _ =
        fun o x -> o#n2 x
    end;;

class multi_poly :
  object
    method m1 : < n1 : 'b. 'b -> 'b; .. > -> bool * string
    method m2 : < n2 : 'b -> bool; .. > -> 'b -> bool
  end
```

في الدالة `m1`، يجب أن يكون `o` كائنًا يملك على الأقل الدالة `n1`، وهي نفسها متعدّدة الأشكال. وفي الدالة `m2`، يجب أن يكون لوسيط `n2` و`x` النوع نفسه، وهو مكمَّم في المستوى نفسه الذي فيه `'a`.

## 3.12 استعمال الإكراهات

علاقة النوع الفرعي ليست ضمنية أبدًا. غير أنّ ثمّة طريقتين لتحقيقها. فالتركيب الأكثر عمومية صريح تمامًا: يجب إعطاء كل من مجال النوع ونطاقه في إكراه النوع.

رأينا أنّ للنقاط والنقاط الملوّنة أنواعًا غير متوافقة. فمثلًا لا يمكن خلطها في القائمة نفسها. غير أنّ النقطة الملوّنة يمكن إكراهها إلى نقطة، مع حجب دالتها `color`:

```ocaml
# let colored_point_to_point cp = (cp : colored_point :> point);;

val colored_point_to_point : colored_point -> point = <fun>

# let p = new point 3 and q = new colored_point 4 "blue";;

val p : point = <obj>
val q : colored_point = <obj>

# let l = [p; (colored_point_to_point q)];;

val l : point list = [<obj>; <obj>]
```

ولا يمكن النظر إلى كائن من النوع `t` كائنًا من النوع `t'` إلا إذا كان `t` نوعًا فرعيًا من `t'`. فمثلًا لا يمكن النظر إلى نقطة كنقطة ملوّنة.

```ocaml
# (p : point :> colored_point);;

Error: Type point = < get_offset : int; get_x : int; move : int -> unit >
       is not a subtype of
         colored_point =
           < color : string; get_offset : int; get_x : int;
             move : int -> unit >
       The first object type has no method color
```

وبالفعل، فإنّ الإكراهات المُضيِّقة من دون فحوص وقت التشغيل ستكون غير آمنة. وفحوص الأنواع وقت التشغيل قد ترفع استثناءات، وستتطلّب وجود معلومات الأنواع وقت التشغيل، وهذا ليس الحال في نظام OCaml. ولهذه الأسباب لا توجد في اللغة عملية من هذا القبيل.

كن على علم بأنّ علاقة النوع الفرعي والوراثة غير مترابطتين. فالوراثة علاقة صياغية بين الأصناف، أمّا علاقة النوع الفرعي فعلاقة دلالية بين الأنواع. فمثلًا كان يمكن تعريف صنف النقاط الملوّنة مباشرةً من دون الوراثة من صنف النقاط؛ وسيبقى نوع النقاط الملوّنة على حاله، ومن ثمّ يبقى نوعًا فرعيًا من النقاط.

وغالبًا ما يمكن حذف مجال الإكراه. فمثلًا يمكن تعريف:

```ocaml
# let to_point cp = (cp :> point);;

val to_point : #point -> point = <fun>
```

وفي هذه الحالة، تكون الدالة `colored_point_to_point` نسخةً من الدالة `to_point`. لكنّ هذا ليس صحيحًا دائمًا. فالإكراه الصريح تمامًا أدقّ ولا غنى عنه أحيانًا. تخيّل، مثلًا، الصنف التالي:

```ocaml
# class c0 = object method m = {< >} method n = 0 end;;

class c0 : object ('a) method m : 'a method n : int end
```

نوع الكائن `c0` اختصار لـ `<m : 'a; n : int> as 'a`. تخيّل الآن تصريح النوع:

```ocaml
# class type c1 =  object method m : c1 end;;

class type c1 = object method m : c1 end
```

نوع الكائن `c1` اختصار للنوع `<m : 'a> as 'a`. والإكراه من كائن من النوع `c0` إلى كائن من النوع `c1` صحيح:

```ocaml
# fun (x:c0) -> (x : c0 :> c1);;

- : c0 -> c1 = <fun>
```

غير أنّ مجال الإكراه لا يمكن حذفه دائمًا. وفي تلك الحالة يكون الحلّ استعمال الصيغة الصريحة. وأحيانًا قد يحلّ تغيير في تعريف نوع الصنف المشكلة أيضًا.

```ocaml
# class type c2 = object ('a) method m : 'a end;;

class type c2 = object ('a) method m : 'a end

# fun (x:c0) -> (x :> c2);;

- : c0 -> c2 = <fun>
```

فرغم أنّ نوعي الصنف `c1` و`c2` مختلفان، فإنّ نوعي الكائن `c1` و`c2` يتوسّعان إلى نوع الكائن نفسه (أسماء الدوال وأنواعها نفسها). ومع ذلك، عندما يُترك مجال الإكراه ضمنيًا ونطاقه اختصار لنوع صنف معروف، يُستعمل نوع الصنف، لا نوع الكائن، لاشتقاق دالة الإكراه. وهذا يسمح بترك المجال ضمنيًا في معظم الحالات عند الإكراه من صنف فرعي إلى صنفه الأب. ويمكن دائمًا النظر إلى نوع الإكراه كما يلي:

```ocaml
# let to_c1 x = (x :> c1);;

val to_c1 : < m : #c1; .. > -> c1 = <fun>

# let to_c2 x = (x :> c2);;

val to_c2 : #c2 -> c2 = <fun>
```

لاحظ الفرق بين هذين الإكراهين: ففي حالة `to_c2`، النوع `#c2 = <m : 'a; ..> as 'a` عودي متعدّد الأشكال (وفق العودية الصريحة في نوع الصنف `c2`)؛ ومن هنا نجاح تطبيق هذا الإكراه على كائن من الصنف `c0`. أمّا في الحالة الأولى، فقد وُسِّع `c1` وفُكّ مرّتين فقط للحصول على `<m : <m : c1; ..>; ..>` (تذكّر أنّ `#c1 = <m : c1; ..>`)، من دون إدخال عودية. وقد تلاحظ أيضًا أنّ نوع `to_c2` هو `#c2 -> c2` بينما نوع `to_c1` أعمّ من `#c1 -> c1`. وهذا ليس صحيحًا دائمًا، إذ توجد أنواع أصناف تكون فيها بعض نسخ `#c` غير أنواع فرعية من `c`، كما هو موضّح في القسم 3.16. غير أنّ الإكراه `(_ :> c)` أعمّ دائمًا من `(_ : #c :> c)` في الأصناف التي لا معاملات لها.

وقد تظهر مشكلة شائعة عند محاولة تعريف إكراه إلى صنف `c` أثناء تعريف الصنف `c` نفسه. والسبب أنّ اختصار النوع لم يُعرَّف تمامًا بعد، فأنواعه الفرعية غير معروفة بوضوح. وحينها يُؤخذ الإكراه `(_ :> c)` أو `(_ : #c :> c)` دالة الهوية، كما في

```ocaml
# fun x -> (x :> 'a);;

- : 'a -> 'a = <fun>
```

ونتيجةً لذلك، إذا طُبّق الإكراه على الذات كما في المثال التالي، اتّحد نوع الذات مع النوع المغلق `c` (ونوع الكائن المغلق نوع كائن بلا علامة حذف). وهذا سيقيّد نوع الذات بأن يكون مغلقًا، فيُرفض. وبالفعل لا يمكن أن يكون نوع الذات مغلقًا: فذلك سيمنع أي توسيع لاحق للصنف. ولذلك يُولَّد خطأ نوع عندما يؤدّي اتّحاد هذا النوع مع نوع آخر إلى نوع كائن مغلق.

```ocaml
# class c = object method m = 1 end
  and d = object (self)
    inherit c
    method n = 2
    method as_c = (self :> c)
  end;;

Error: This expression cannot be coerced to type c = < m : int >; it has type
         < as_c : c; m : int; n : int; .. >
       but is here used with type c
       Self type cannot escape its class
```

غير أنّ أكثر صور هذه المشكلة شيوعًا، أي إكراه الذات إلى صنفها الحالي، يكتشفها فاحص الأنواع كحالة خاصة، ويصحّح نوعها.

```ocaml
# class c = object (self) method m = (self :> c) end;;

class c : object method m : c end
```

وهذا يسمح بالأسلوب التالي، الذي يحفظ قائمة بكل الكائنات التي تنتمي إلى صنف أو إلى أصنافه الفرعية:

```ocaml
# let all_c = ref [];;

val all_c : '_weak3 list ref = {contents = []}

# class c (m : int) =
    object (self)
      method m = m
      initializer all_c := (self :> c) :: !all_c
    end;;

class c : int -> object method m : int end
```

ويمكن بدور ذلك استعمال هذا الأسلوب لاسترجاع كائن أُضعف نوعه:

```ocaml
# let rec lookup_obj obj = function [] -> raise Not_found
    | obj' :: l ->
       if (obj :> < >) = (obj' :> < >) then obj' else lookup_obj obj l ;;

val lookup_obj : < .. > -> (< .. > as 'a) list -> 'a = <fun>

# let lookup_c obj = lookup_obj obj !all_c;;

val lookup_c : < .. > -> < m : int > = <fun>
```

والنوع `<m : int>` الذي نراه هنا ليس إلا توسيع `c`، بسبب استعمال مرجع؛ وقد نجحنا في استعادة كائن من النوع `c`.

وغالبًا ما يمكن تجنّب مشكلة الإكراه السابقة بتعريف الاختصار أولًا باستعمال نوع صنف:

```ocaml
# class type c' = object method m : int end;;

class type c' = object method m : int end

# class c : c' = object method m = 1 end
  and d = object (self)
    inherit c
    method n = 2
    method as_c = (self :> c')
  end;;

class c : c'
and d : object method as_c : c' method m : int method n : int end
```

ويمكن أيضًا استعمال صنف مجرّد. فالوراثة من هذا الصنف تفرض في الوقت نفسه أن تكون كل دوال `c` من النوع نفسه الذي لدوال `c'`.

```ocaml
# class virtual c' = object method virtual m : int end;;

class virtual c' : object method virtual m : int end

# class c = object (self) inherit c' method m = 1 end;;

class c : object method m : int end
```

قد يُخطر بالبال تعريف اختصار النوع مباشرةً:

```ocaml
# type c' = <m : int>;;
```

غير أنّ الاختصار `#c'` لا يمكن تعريفه مباشرةً بالطريقة نفسها. فلا يمكن تعريفه إلا بتعريف صنف أو نوع صنف. والسبب أنّ اختصار `#` يحمل متغيّرًا مجهولًا ضمنيًا `..` لا يمكن تسميته صراحةً. وأقرب ما يمكن الوصول إليه هو:

```ocaml
# type 'a c'_class = 'a constraint 'a = < m : int; .. >;;
```

مع متغيّر نوع إضافي يلتقط نوع الكائن المفتوح.

## 3.13 الكائنات الدالية

يمكن كتابة نسخة من الصنف `point` بلا إسنادات إلى متغيّرات النسخة. فتركيب التجاوز `{< ... >}` يُعيد نسخة من «الذات» (أي الكائن الحالي)، مع تغيير قيمة بعض متغيّرات النسخة ربما.

```ocaml
# class functional_point y =
    object
      val x = y
      method get_x = x
      method move d = {< x = x + d >}
      method move_to x = {< x >}
    end;;

class functional_point :
  int ->
  object ('a)
    val x : int
    method get_x : int
    method move : int -> 'a
    method move_to : int -> 'a
  end

# let p = new functional_point 7;;

val p : functional_point = <obj>

# p#get_x;;

- : int = 7

# (p#move 3)#get_x;;

- : int = 10

# (p#move_to 15)#get_x;;

- : int = 15

# p#get_x;;

- : int = 7
```

وكما في السجلات، الصيغة `{< x >}` نسخة مختصرة من `{< x = x >}` تتجنّب تكرار اسم متغيّر النسخة. لاحظ أنّ اختصار النوع `functional_point` عودي، ويمكن رؤية ذلك في نوع الصنف `functional_point`: فنوع الذات هو `'a`، و`'a` يظهر داخل نوع الدالة `move`.

وتعريف `functional_point` أعلاه ليس مكافئًا لما يلي:

```ocaml
# class bad_functional_point y =
    object
      val x = y
      method get_x = x
      method move d = new bad_functional_point (x+d)
      method move_to x = new bad_functional_point x
    end;;

class bad_functional_point :
  int ->
  object
    val x : int
    method get_x : int
    method move : int -> bad_functional_point
    method move_to : int -> bad_functional_point
  end
```

فرغم أنّ كائنات الصنفين ستتصرّف التصرّف نفسه، ستختلف كائنات أصنافهما الفرعية. ففي صنف فرعي من `bad_functional_point` ستظلّ الدالة `move` تُعيد كائنًا من الصنف الأب. وعلى العكس، في صنف فرعي من `functional_point` ستُعيد الدالة `move` كائنًا من الصنف الفرعي.

وغالبًا ما يُستعمل التحديث الدالي مع الدوال الثنائية كما هو موضّح في القسم 8.2.1.

## 3.14 استنساخ الكائنات

يمكن استنساخ الكائنات أيضًا، سواء كانت دالية أو أمرية. فدالة المكتبة `Oo.copy` تُنشئ نسخة سطحية من كائن. أي أنها تُعيد كائنًا جديدًا يملك الدوال ومتغيّرات النسخة نفسها التي يملكها وسيطها. فمتغيّرات النسخة تُنسخ، لكنّ محتوياتها مشتركة. وإسناد قيمة جديدة إلى متغيّر نسخة في النسخة (باستدعاء دالة) لن يؤثّر في متغيّرات نسخة الأصل، والعكس صحيح. أمّا الإسناد الأعمق (مثلًا إذا كان متغيّر النسخة خلية مرجع) فسيؤثّر بالطبع في الأصل والنسخة معًا.

ونوع `Oo.copy` هو التالي:

```ocaml
# Oo.copy;;

- : (< .. > as 'a) -> 'a = <fun>
```

فالكلمة المفتاحية `as` في هذا النوع تربط متغيّر النوع `'a` بنوع الكائن `< .. >`. ولذلك تأخذ `Oo.copy` كائنًا له أي دوال (تُمثَّل بعلامة الحذف)، وتُعيد كائنًا من النوع نفسه. ونوع `Oo.copy` يختلف عن النوع `< .. > -> < .. >`، لأنّ كل علامة حذف تُمثّل مجموعة دوال مختلفة. فعلًا، تتصّرّف علامة الحذف كمتغيّر نوع.

```ocaml
# let p = new point 5;;

val p : point = <obj>

# let q = Oo.copy p;;

val q : point = <obj>

# q#move 7; (p#get_x, q#get_x);;

- : int * int = (5, 12)
```

وفي الواقع، ستتصرّف `Oo.copy p` كما تتصرّف `p#copy` بافتراض أنّ دالة عامة `copy` جسمها `{< >}` قد عُرِّفت في صنف `p`.

ويمكن مقارنة الكائنات بدوال المقارنة العامة `=` و`<>`. فالكائنان متساويان إذا وفقط إذا كانا متساويين فيزيائيًا. وعلى وجه الخصوص، الكائن ونسخته غير متساويين.

```ocaml
# let q = Oo.copy p;;

val q : point = <obj>

# p = q, p = p;;

- : bool * bool = (false, true)
```

ويمكن استعمال مقارنات عامة أخرى مثل (`<`، `<=`، ...) على الكائنات أيضًا. فالعلاقة `<` تعرّف ترتيبًا على الكائنات غير محدَّد لكنه صارم. وعلاقة الترتيب بين كائنين تُثبَّت نهائيًا بمجرّد إنشاء الكائنين، ولا تتأثّر بتغيير الحقول.

للاستنساخ والتجاوز تقاطع غير خالٍ. وهما متبادلان عندما يُستعملان داخل كائن ومن دون تجاوز أي حقل:

```ocaml
# class copy =
    object
      method copy = {< >}
    end;;

class copy : object ('a) method copy : 'a end

# class copy =
    object (self)
      method copy = Oo.copy self
    end;;

class copy : object ('a) method copy : 'a end
```

فالتجاوز وحده يمكن استعماله لتجاوز الحقول فعليًا، والأولية `Oo.copy` وحدها يمكن استعمالها من الخارج.

ويمكن استعمال الاستنساخ أيضًا لتوفير وسائل حفظ حالة الكائنات واستعادتها.

```ocaml
# class backup =
    object (self : 'mytype)
      val mutable copy = None
      method save = copy <- Some {< copy = None >}
      method restore = match copy with Some x -> x | None -> self
    end;;

class backup :
  object ('a)
    val mutable copy : 'a option
    method restore : 'a
    method save : unit
  end
```

التعريف أعلاه لا ينسخ إلا مستوى واحدًا. ويمكن إضافة وسيلة النسخ الاحتياطي إلى أي صنف باستعمال الوراثة المتعددة.

```ocaml
# class ['a] backup_ref x = object inherit ['a] oref x inherit backup end;;

class ['a] backup_ref :
  'a ->
  object ('b)
    val mutable copy : 'b option
    val mutable x : 'a
    method get : 'a
    method restore : 'b
    method save : unit
    method set : 'a -> unit
  end

# let rec get p n = if n = 0 then p # get else get (p # restore) (n-1);;

val get : (< get : 'b; restore : 'a; .. > as 'a) -> int -> 'b = <fun>

# let p = new backup_ref 0  in
  p # save; p # set 1; p # save; p # set 2;
  [get p 0; get p 1; get p 2; get p 3; get p 4];;

- : int list = [2; 1; 1; 1; 1]
```

يمكننا تعريف بديل للنسخ الاحتياطي يحتفظ بكل النسخ. (ونضيف أيضًا دالة `clear` لمحو كل النسخ يدويًا.)

```ocaml
# class backup =
    object (self : 'mytype)
      val mutable copy = None
      method save = copy <- Some {< >}
      method restore = match copy with Some x -> x | None -> self
      method clear = copy <- None
    end;;

class backup :
  object ('a)
    val mutable copy : 'a option
    method clear : unit
    method restore : 'a
    method save : unit
  end
```

```ocaml
# class ['a] backup_ref x = object inherit ['a] oref x inherit backup end;;

class ['a] backup_ref :
  'a ->
  object ('b)
    val mutable copy : 'b option
    val mutable x : 'a
    method clear : unit
    method get : 'a
    method restore : 'b
    method save : unit
    method set : 'a -> unit
  end

# let p = new backup_ref 0  in
  p # save; p # set 1; p # save; p # set 2;
  [get p 0; get p 1; get p 2; get p 3; get p 4];;

- : int list = [2; 1; 0; 0; 0]
```

## 3.15 الأصناف العودية

يمكن استعمال الأصناف العودية لتعريف كائنات أنواعها متبادلة العودية.

```ocaml
# class window =
    object
      val mutable top_widget = (None : widget option)
      method top_widget = top_widget
    end
  and widget (w : window) =
    object
      val window = w
      method window = window
    end;;

class window :
  object
    val mutable top_widget : widget option
    method top_widget : widget option
  end
and widget : window -> object val window : window method window : window end
```

فرغم أنّ نوعيهما متبادلا العودية، فإنّ الصنفين `widget` و`window` مستقلّان في نفسيهما.

## 3.16 الدوال الثنائية

الدالة الثنائية دالة تأخذ وسيطًا من النوع نفسه الذي للذات. والصنف `comparable` أدناه قالب لأصناف ذات دالة ثنائية `leq` من النوع `'a -> bool`، حيث يُربط متغيّر النوع `'a` بنوع الذات. ولذلك يتوسّع `#comparable` إلى `<leq : 'a -> bool; ..> as 'a`. ونرى هنا أنّ الرابط `as` يسمح بكتابة الأنواع العودية أيضًا.

```ocaml
# class virtual comparable =
    object (_ : 'a)
      method virtual leq : 'a -> bool
    end;;

class virtual comparable : object ('a) method virtual leq : 'a -> bool end
```

نعرّف بعد ذلك صنفًا فرعيًا `money` من `comparable`. والصنف `money` يغلّف ببساطة أعداد الفاصلة العائمة كائناتٍ قابلة للمقارنة.[^1] وسنوسّع `money` أدناه بعمليات أخرى. ويجب أن نستعمل قيد نوع على معامل الصنف `x`، لأنّ الأولية `<=` دالة متعدّدة الأشكال في OCaml. وتضمن جملة `inherit` أن يكون نوع كائنات هذا الصنف نسخةً من `#comparable`.

```ocaml
# class money (x : float) =
    object
      inherit comparable
      val repr = x
      method value = repr
      method leq p = repr <= p#value
    end;;

class money :
  float ->
  object ('a)
    val repr : float
    method leq : 'a -> bool
    method value : float
  end
```

لاحظ أنّ النوع `money` ليس نوعًا فرعيًا من النوع `comparable`، لأنّ نوع الذات يظهر في موضع مضادّ التغاير في نوع الدالة `leq`. فالكائن `m` من الصنف `money` يملك دالة `leq` تتوقّع وسيطًا من النوع `money`، لأنه يصل إلى دالته `value`. ولو نُظر إلى `m` كنوع `comparable` لأتاح ذلك استدعاء الدالة `leq` على `m` بوسيط لا يملك الدالة `value`، وهذا خطأ.

وبالمثل، النوع `money2` أدناه ليس نوعًا فرعيًا من النوع `money`.

```ocaml
# class money2 x =
    object
      inherit money x
      method times k = {< repr = k *. repr >}
    end;;

class money2 :
  float ->
  object ('a)
    val repr : float
    method leq : 'a -> bool
    method times : float -> 'a
    method value : float
  end
```

غير أنّه يمكن تعريف دوال تتعامل مع كائنات من النوع `money` أو `money2`: فالدالة `min` ستُعيد أصغر أي كائنين يتّحد نوعهما مع `#comparable`. ونوع `min` ليس هو `#comparable -> #comparable -> #comparable`، لأنّ الاختصار `#comparable` يخفي متغيّر نوع (علامة حذف). وكل ظهور لهذا الاختصار يولّد متغيّرًا جديدًا.

```ocaml
# let min (x : #comparable) y =
    if x#leq y then x else y;;

val min : (#comparable as 'a) -> 'a -> 'a = <fun>
```

ويمكن تطبيق هذه الدالة على كائنات من النوع `money` أو `money2`.

```ocaml
# (min (new money  1.3) (new money 3.1))#value;;

- : float = 1.3

# (min (new money2 5.0) (new money2 3.14))#value;;

- : float = 3.14
```

ويمكن إيجاد مزيد من أمثلة الدوال الثنائية في القسمين 8.2.1 و8.2.3.

لاحظ استعمال التجاوز في الدالة `times`. فكتابة `new money2 (k *. repr)` بدلًا من `{< repr = k *. repr >}` لن تتصرّف تصرّفًا حسنًا مع الوراثة: ففي صنف فرعي `money3` من `money2` ستُعيد الدالة `times` كائنًا من الصنف `money2` لا من الصنف `money3` كما هو متوقّع.

ويمكن أن يحمل الصنف `money` بطبيعته دالة ثنائية أخرى. وهذا تعريف مباشر:

```ocaml
# class money x =
    object (self : 'a)
      val repr = x
      method value = repr
      method print = print_float repr
      method times k = {< repr = k *. x >}
      method leq (p : 'a) = repr <= p#value
      method plus (p : 'a) = {< repr = x +. p#value >}
    end;;

class money :
  float ->
  object ('a)
    val repr : float
    method leq : 'a -> bool
    method plus : 'a -> 'a
    method print : unit
    method times : float -> 'a
    method value : float
  end
```

## 3.17 الأصدقاء

يكشف الصنف `money` أعلاه مشكلة تظهر كثيرًا مع الدوال الثنائية. فللتفاعل مع كائنات أخرى من الصنف نفسه، يجب كشف تمثيل كائنات `money`، بدالة مثل `value`. وإذا حذفنا كل الدوال الثنائية (وهنا `plus` و`leq`)، أمكن حجب التمثيل داخل الكائنات بسهولة بحذف الدالة `value` أيضًا. غير أنّ هذا غير ممكن بمجرّد أن تحتاج إحدى الدوال الثنائية إلى الوصول إلى تمثيل كائنات من الصنف نفسه (غير الذات).

```ocaml
# class safe_money x =
    object (self : 'a)
      val repr = x
      method print = print_float repr
      method times k = {< repr = k *. x >}
    end;;

class safe_money :
  float ->
  object ('a)
    val repr : float
    method print : unit
    method times : float -> 'a
  end
```

هنا لا يعرف تمثيل الكائن إلا كائن معيّن. ولجعله متاحًا لكائنات أخرى من الصنف نفسه، نُضطرّ إلى جعله متاحًا للعالم كله. غير أنّنا نستطيع تقييد ظهور التمثيل بسهولة باستعمال نظام الوحدات.

```ocaml
# module type MONEY =
    sig
      type t
      class c : float ->
        object ('a)
          val repr : t
          method value : t
          method print : unit
          method times : float -> 'a
          method leq : 'a -> bool
          method plus : 'a -> 'a
        end
    end;;

# module Euro : MONEY =
    struct
      type t = float
      class c x =
        object (self : 'a)
          val repr = x
          method value = repr
          method print = print_float repr
          method times k = {< repr = k *. x >}
          method leq (p : 'a) = repr <= p#value
          method plus (p : 'a) = {< repr = x +. p#value >}
        end
    end;;
```

وثمّة مثال آخر على دوال الصداقة في القسم 8.2.3. وتظهر هذه الأمثلة عندما يجب أن ترى مجموعة من الكائنات (وهنا كائنات الصنف نفسه) ودوالّ ما تمثيل بعضها الداخلي، بينما يجب أن يبقى تمثيلها محجوبًا عن الخارج. والحلّ دائمًا هو تعريف كل الأصدقاء في الوحدة نفسها، وإتاحة الوصول إلى التمثيل، واستعمال قيد توقيع لجعل التمثيل مجرّدًا خارج الوحدة.

[^1]: أعداد الفاصلة العائمة تقريب للأعداد العشرية، وهي غير صالحة للاستعمال في معظم الحسابات النقدية، لأنها قد تُدخل أخطاء.
