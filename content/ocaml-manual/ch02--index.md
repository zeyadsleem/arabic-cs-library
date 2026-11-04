---
title: "نظام الوحدات"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 2: نظام الوحدات

يعرّفنا هذا الفصل بنظام الوحدات في OCaml.

## 2.1 البنى

من أهم دوافع الوحدات جمع تعريفات مترابطة (كتعريف نوع بيانات والعمليات المقترنة به) في حزمة واحدة، وفرض مخطط تسمية متّسق لهذه التعريفات، فيتجنّب المرء نفاد الأسماء أو الخلط بينها عرضًا. وتُسمّى هذه الحزمة *بنية*، وتُدخل بالبنية `struct`…`end` التي تحوي متتالية اعتباطية من التعريفات. وتُعطى البنية عادةً اسمًا بالربط `module`. فمثلًا، هذه بنية تجمع نوعًا من طوابير FIFO وعملياته:

```ocaml
# module Fifo =
    struct
      type 'a queue = { front: 'a list; rear: 'a list }
      let make front rear =
        match front with
        | [] -> { front = List.rev rear; rear = [] }
        | _  -> { front; rear }
      let empty = { front = []; rear = [] }
      let is_empty = function { front = []; _ } -> true | _ -> false
      let add x q = make q.front (x :: q.rear)
      exception Empty
      let top = function
        | { front = []; _ } -> raise Empty
        | { front = x :: _; _ } -> x
      let pop = function
        | { front = []; _ } -> raise Empty
        | { front = _ :: f; rear = r } -> make f r
    end;;

module Fifo :
  sig
    type 'a queue = { front : 'a list; rear : 'a list; }
    val make : 'a list -> 'a list -> 'a queue
    val empty : 'a queue
    val is_empty : 'a queue -> bool
    val add : 'a -> 'a queue -> 'a queue
    exception Empty
    val top : 'a queue -> 'a
    val pop : 'a queue -> 'a queue
  end
```

ويمكن الإشارة إلى مكوّنات البنية من خارجها باستعمال «التدوين النقطي»، أي معرّفات مسبوقة باسم البنية. فمثلًا، `Fifo.add` هي الدالة `add` المعرَّفة داخل البنية `Fifo`، و`Fifo.queue` هو النوع `queue` المعرَّف في `Fifo`.

```ocaml
# Fifo.add "hello" Fifo.empty;;

- : string Fifo.queue = {Fifo.front = ["hello"]; rear = []}
```

وثمّة إمكانية أخرى هي فتح الوحدة، وهو يجلب جميع المعرّفات المعرَّفة داخل الوحدة إلى نطاق البنية الحالية.

```ocaml
# open Fifo;;

# add "hello" empty;;

- : string Fifo.queue = {front = ["hello"]; rear = []}
```

يفتح فتحُ الوحدة سبيلًا أخفّ إلى مكوّناتها، لكنه يجعل تحديد الوحدة التي عُرِّف فيها معرّف ما أصعب. وعلى وجه الخصوص، يمكن للوحدات المفتوحة أن تحجب معرّفات موجودة في النطاق الحالي، وقد يؤدّي ذلك إلى أخطاء مربكة:

```ocaml
# let empty = []
  open Fifo;;

val empty : 'a list = []

# let x = 1 :: empty ;;

Error: The value empty has type 'a Fifo.queue
       but an expression was expected of type int list
```

والحل الجزئي لهذه المعضلة هو فتح الوحدات محليًا، بحيث تصير مكوّنات الوحدة متاحة في التعبير المعني فقط. وقد يجعل هذا الشيفرة أسهل قراءةً (لأنّ عبارة الفتح أقرب إلى موضع استعمالها) وأسهل إعادةَ هيكلة (لأنّ مقطع الشيفرة أكثر استقلالًا). وتتوفر بنيتان لهذا الغرض:

```ocaml
# let open Fifo in
  add "hello" empty;;

- : string Fifo.queue = {front = ["hello"]; rear = []}
```

و

```ocaml
# Fifo.(add "hello" empty);;

- : string Fifo.queue = {front = ["hello"]; rear = []}
```

وفي الصيغة الثانية، إذا كان جسم الفتح المحلي محصورًا هو نفسه بين أقواس أو أقواس معقوفة أو أقواس مربّعة، جاز إغفال أقواس الفتح المحلي. فمثلًا،

```ocaml
# Fifo.[empty] = Fifo.([empty]);;

- : bool = true

# Fifo.[|empty|] = Fifo.([|empty|]);;

- : bool = true

# Fifo.{ contents = empty } = Fifo.({ contents = empty });;

- : bool = true
```

وتعمل هذه الصيغة الثانية أيضًا في الأنماط:

```ocaml
# let at_most_one_element x = match x with
  | Fifo.{ front = ([] | [_]); rear = [] } -> true
  | _ -> false ;;

val at_most_one_element : 'a Fifo.queue -> bool = <fun>
```

ويمكن أيضًا نسخ مكوّنات وحدة داخل وحدة أخرى باستعمال العبارة `include`، وهذا نافع بوجه خاص لتوسيع وحدات قائمة. وللتوضيح، يمكننا إضافة دوال تُعيد قيمة اختيارية بدلًا من رفع استثناء عندما يكون الطابور فارغًا.

```ocaml
# module FifoOpt =
  struct
    include Fifo
    let top_opt q = if is_empty q then None else Some(top q)
    let pop_opt q = if is_empty q then None else Some(pop q)
  end;;

module FifoOpt :
  sig
    type 'a queue = 'a Fifo.queue = { front : 'a list; rear : 'a list; }
    val make : 'a list -> 'a list -> 'a queue
    val empty : 'a queue
    val is_empty : 'a queue -> bool
    val add : 'a -> 'a queue -> 'a queue
    exception Empty
    val top : 'a queue -> 'a
    val pop : 'a queue -> 'a queue
    val top_opt : 'a queue -> 'a option
    val pop_opt : 'a queue -> 'a queue option
  end
```

## 2.2 التوقيعات

التوقيعات واجهات للبنى. يحدّد التوقيع مكوّنات البنية المتاحة من الخارج، وأنواعها. ويمكن استعماله لإخفاء بعض مكوّنات البنية (كتعريفات الدوال المحلية) أو لتصدير بعضها بنوع مقيَّد. فمثلًا، يحدّد التوقيع التالي عمليات الطابور `empty` و`add` و`top` و`pop`، لا الدالة المساعدة `make`. وبالمثل، يجعل نوع `queue` مجرّدًا (بعدم تقديم تمثيله الفعلي كنوع ملموس)، وهذا يضمن ألّا يستطيع مستعملو الوحدة `Fifo` خرق ثوابت بنية البيانات التي تعتمد عليها العمليات، مثل «إذا كانت القائمة الأمامية فارغة وجبت أن تكون القائمة الخلفية فارغة أيضًا».

```ocaml
# module type FIFO =
    sig
      type 'a queue               (* now an abstract type *)
      val empty : 'a queue
      val add : 'a -> 'a queue -> 'a queue
      val top : 'a queue -> 'a
      val pop : 'a queue -> 'a queue
      exception Empty
    end;;

module type FIFO =
  sig
    type 'a queue
    val empty : 'a queue
    val add : 'a -> 'a queue -> 'a queue
    val top : 'a queue -> 'a
    val pop : 'a queue -> 'a queue
    exception Empty
  end
```

ويؤدّي تقييد البنية `Fifo` بهذا التوقيع إلى رؤية أخرى للبنية `Fifo` لا تكون فيها الدالة `make` متاحة ويُخفى فيها التمثيل الفعلي للطوابير:

```ocaml
# module AbstractQueue = (Fifo : FIFO);;

module AbstractQueue : FIFO

# AbstractQueue.make [1] [2;3] ;;

Error: Unbound value AbstractQueue.make

# AbstractQueue.add "hello" AbstractQueue.empty;;

- : string AbstractQueue.queue = <abstr>
```

ويمكن إجراء التقييد أيضًا أثناء تعريف البنية، كما في

```text
module Fifo = (struct ... end : FIFO);;
```

وتُقدَّم صيغة بديلة لما سبق:

```text
module Fifo : FIFO = struct ... end;;
```

وكما في الوحدات، يمكن إدراج توقيع لنسخ مكوّناته داخل التوقيع الحالي. فمثلًا، يمكننا توسيع التوقيع `FIFO` بالدالتين `top_opt` و`pop_opt`:

```ocaml
# module type FIFO_WITH_OPT =
    sig
      include FIFO
      val top_opt: 'a queue -> 'a option
      val pop_opt: 'a queue -> 'a queue option
    end;;

module type FIFO_WITH_OPT =
  sig
    type 'a queue
    val empty : 'a queue
    val add : 'a -> 'a queue -> 'a queue
    val top : 'a queue -> 'a
    val pop : 'a queue -> 'a queue
    exception Empty
    val top_opt : 'a queue -> 'a option
    val pop_opt : 'a queue -> 'a queue option
  end
```

## 2.3 الموصِّلات

الموصِّلات «دوال» من وحدات إلى وحدات. وهي تتيح إنشاء وحدات ذات وسائط، ثم تقديم وحدات أخرى وسائطَ للحصول على تنفيذ معيّن. فمثلًا، يمكن أن تكون وحدة `Set` التي تنفّذ المجموعات كقوائم مرتّبة ذات وسيط، فتعمل مع أي وحدة توفّر نوع عنصر ودالة مقارنة `compare` (مثل `OrderedString`):

```ocaml
# type comparison = Less | Equal | Greater;;

type comparison = Less | Equal | Greater

# module type ORDERED_TYPE =
    sig
      type t
      val compare: t -> t -> comparison
    end;;

module type ORDERED_TYPE = sig type t val compare : t -> t -> comparison end

# module Set =
    functor (Elt: ORDERED_TYPE) ->
      struct
        type element = Elt.t
        type set = element list
        let empty = []
        let rec add x s =
          match s with
            [] -> [x]
          | hd::tl ->
             match Elt.compare x hd with
               Equal   -> s         (* x is already in s *)
             | Less    -> x :: s    (* x is smaller than all elements of s *)
             | Greater -> hd :: add x tl
        let rec member x s =
          match s with
            [] -> false
          | hd::tl ->
              match Elt.compare x hd with
                Equal   -> true     (* x belongs to s *)
              | Less    -> false    (* x is smaller than all elements of s *)
              | Greater -> member x tl
      end;;

module Set :
  (Elt : ORDERED_TYPE) ->
    sig
      type element = Elt.t
      type set = element list
      val empty : 'a list
      val add : Elt.t -> Elt.t list -> Elt.t list
      val member : Elt.t -> Elt.t list -> bool
    end
```

وبتطبيق الموصِّل `Set` على بنية تنفّذ نوعًا مرتّبًا، نحصل على عمليات مجموعات لهذا النوع:

```ocaml
# module OrderedString =
    struct
      type t = string
      let compare x y = if x = y then Equal else if x < y then Less else Greater
    end;;

module OrderedString :
  sig type t = string val compare : 'a -> 'a -> comparison end

# module StringSet = Set(OrderedString);;

module StringSet :
  sig
    type element = OrderedString.t
    type set = element list
    val empty : 'a list
    val add : OrderedString.t -> OrderedString.t list -> OrderedString.t list
    val member : OrderedString.t -> OrderedString.t list -> bool
  end

# StringSet.member "bar" (StringSet.add "foo" StringSet.empty);;

- : bool = false
```

## 2.4 الموصِّلات وتجريد الأنواع

كما في مثال `Fifo`، من حسن الأسلوب إخفاء التنفيذ الفعلي للنوع `set` كي لا يعتمد مستعملو البنية على كون المجموعات قوائم، فنستطيع لاحقًا الانتقال إلى تمثيل آخر أعلى كفاءة للمجموعات دون إفساد شيفرتهم. ويتحقّق ذلك بتقييد `Set` بتوقيع موصِّل مناسب:

```ocaml
# module type SETFUNCTOR =
    (Elt: ORDERED_TYPE) ->
      sig
        type element = Elt.t      (* concrete *)
        type set                  (* abstract *)
        val empty : set
        val add : element -> set -> set
        val member : element -> set -> bool
      end;;

module type SETFUNCTOR =
  (Elt : ORDERED_TYPE) ->
    sig
      type element = Elt.t
      type set
      val empty : set
      val add : element -> set -> set
      val member : element -> set -> bool
    end

# module AbstractSet = (Set : SETFUNCTOR);;

module AbstractSet : SETFUNCTOR

# module AbstractStringSet = AbstractSet(OrderedString);;

module AbstractStringSet :
  sig
    type element = OrderedString.t
    type set = AbstractSet(OrderedString).set
    val empty : set
    val add : element -> set -> set
    val member : element -> set -> bool
  end

# AbstractStringSet.add "gee" AbstractStringSet.empty;;

- : AbstractStringSet.set = <abstr>
```

سعيًا إلى كتابة قيد النوع أعلاه على نحو أنيق أكثر، قد يرغب المرء في تسمية توقيع البنية التي يُعيدها الموصِّل، ثم استعمال ذلك التوقيع في القيد:

```ocaml
# module type SET =
    sig
      type element
      type set
      val empty : set
      val add : element -> set -> set
      val member : element -> set -> bool
    end;;

module type SET =
  sig
    type element
    type set
    val empty : set
    val add : element -> set -> set
    val member : element -> set -> bool
  end

# module WrongSet = (Set : (Elt: ORDERED_TYPE) -> SET);;

module WrongSet : (Elt : ORDERED_TYPE) -> SET

# module WrongStringSet = WrongSet(OrderedString);;

module WrongStringSet :
  sig
    type element = WrongSet(OrderedString).element
    type set = WrongSet(OrderedString).set
    val empty : set
    val add : element -> set -> set
    val member : element -> set -> bool
  end

# WrongStringSet.add "gee" WrongStringSet.empty ;;

Error: This constant has type string but an expression was expected of type
         WrongStringSet.element = WrongSet(OrderedString).element
```

المشكلة هنا أنّ `SET` يحدّد النوع `element` على نحو مجرّد، فتضيع المساواة النوعية بين `element` في نتيجة الموصِّل و`t` في وسيطه. وبالتالي فـ `WrongStringSet.element` ليس النوع نفسه الذي هو `string`، ولا يمكن تطبيق عمليات `WrongStringSet` على السلاسل. وكما بُرِهَن أعلاه، من المهم أن يُصرَّح بأنّ النوع `element` في التوقيع `SET` مساوٍ لـ `Elt.t`؛ وللأسف هذا مستحيل في ما سبق لأنّ `SET` معرَّف في سياق لا وجود فيه لـ `Elt`. وللتغلّب على هذه الصعوبة، يوفّر OCaml بنية `with type` على التوقيعات تتيح إغناء توقيع بمساوٍات نوعية إضافية:

```ocaml
# module AbstractSet2 =
    (Set : (Elt: ORDERED_TYPE) -> (SET with type element = Elt.t));;

module AbstractSet2 :
  (Elt : ORDERED_TYPE) ->
    sig
      type element = Elt.t
      type set
      val empty : set
      val add : element -> set -> set
      val member : element -> set -> bool
    end
```

وكما في حالة البنى البسيطة، تُقدَّم صيغة بديلة لتعريف الموصِّلات وتقييد نتيجتها:

```text
module AbstractSet2(Elt: ORDERED_TYPE) : (SET with type element = Elt.t) =
  struct ... end;;
```

تجريد مكوّن نوعي في نتيجة موصِّل تقنية قوية توفّر قدرًا عاليًا من أمان الأنواع، كما نوضّح الآن. لننظر إلى ترتيب على سلاسل المحارف يختلف عن الترتيب القياسي المنفَّذ في البنية `OrderedString`؛ مثلًا، نقارن السلاسل دون تمييز بين الحروف الكبيرة والصغيرة.

```ocaml
# module NoCaseString =
    struct
      type t = string
      let compare s1 s2 =
        OrderedString.compare (String.lowercase_ascii s1) (String.lowercase_ascii s2)
    end;;

module NoCaseString :
  sig type t = string val compare : string -> string -> comparison end

# module NoCaseStringSet = AbstractSet(NoCaseString);;

module NoCaseStringSet :
  sig
    type element = NoCaseString.t
    type set = AbstractSet(NoCaseString).set
    val empty : set
    val add : element -> set -> set
    val member : element -> set -> bool
  end

# NoCaseStringSet.add "FOO" AbstractStringSet.empty ;;

Error: The value AbstractStringSet.empty has type
         AbstractStringSet.set = AbstractSet(OrderedString).set
       but an expression was expected of type
         NoCaseStringSet.set = AbstractSet(NoCaseString).set
```

لاحظ أنّ النوعين `AbstractStringSet.set` و`NoCaseStringSet.set` غير متوافقين، وأنّ قيم هذين النوعين لا تتطابق. وهذا هو السلوك الصحيح: فمع أنّ نوعي المجموعتين يحويان عناصر من النوع نفسه (سلاسل)، فهما مبنيان على ترتيبين مختلفين لذلك النوع، وعلى العمليات أن تحفظ ثوابت مختلفة (التزايد الصارم في الترتيب القياسي وفي الترتيب غير المتأثّر بحالة الأحرف). وتطبيق عمليات من `AbstractStringSet` على قيم من النوع `NoCaseStringSet.set` قد يعطي نتائج خاطئة أو يبني قوائم تخرق ثوابت `NoCaseStringSet`.

## 2.5 الوحدات والترجمة المنفصلة

قُدِّمت جميع أمثلة الوحدات حتى الآن في سياق النظام التفاعلي. غير أنّ الوحدات أنفع ما تكون في البرامج الكبيرة المترجمة دفعيًا. وفي هذه البرامج، من الضروري عمليًا تقسيم المصدر إلى عدّة ملفات تُسمّى وحدات ترجمة، يمكن ترجمتها منفصلةً، فيُقلَّل بذلك إعادة الترجمة بعد التغييرات.

وحدات الترجمة في OCaml حالات خاصة من البنى والتوقيعات، ويمكن تفسير العلاقة بين الوحدات بسهولة بمصطلحات نظام الوحدات. تتكوّن وحدة الترجمة *A* من ملفّين:

- ملف التنفيذ *A*`.ml`، وهو يحوي متتالية من التعريفات نظيرة لما في داخل بنية `struct`…`end`؛

- ملف الواجهة *A*`.mli`، وهو يحوي متتالية من المواصفات نظيرة لما في داخل بنية `sig`…`end`.

ويُعرّف هذان الملفان معًا بنية باسم *A* كأنّ التعريف التالي أُدخل على المستوى الأعلى:

```text
module A: sig (* contents of file A.mli *) end
        = struct (* contents of file A.ml *) end;;
```

ويمكن ترجمة الملفات التي تعرّف وحدات الترجمة منفصلةً بالأمر `ocamlc -c` (والخيار `-c` يعني «ترجمة فقط، لا تحاول الربط»)؛ وينتج عن ذلك ملفات واجهة مترجمة (بامتداد `.cmi`) وملفات شيفرة كائن مترجمة (بامتداد `.cmo`). وبعد ترجمة جميع الوحدات، تُربط ملفات `.cmo` معًا بالأمر `ocamlc`. فمثلًا، تترجم الأوامر التالية برنامجًا يتكوّن من وحدتَي ترجمة `Aux` و`Main` وتربطه:

```text
$ ocamlc -c Aux.mli                     # produces aux.cmi
$ ocamlc -c Aux.ml                      # produces aux.cmo
$ ocamlc -c Main.mli                    # produces main.cmi
$ ocamlc -c Main.ml                     # produces main.cmo
$ ocamlc -o theprogram Aux.cmo Main.cmo
```

ويسلك البرنامج سلوكًا مطابقًا تمامًا لما لو أُدخلت العبارات التالية على المستوى الأعلى:

```text
module Aux: sig (* contents of Aux.mli *) end
          = struct (* contents of Aux.ml *) end;;
module Main: sig (* contents of Main.mli *) end
           = struct (* contents of Main.ml *) end;;
```

وعلى وجه الخصوص، يمكن لـ `Main` أن تشير إلى `Aux`: فالتعريفات والتصريحات الواردة في `Main.ml` و`Main.mli` يمكنها الإشارة إلى تعريفات في `Aux.ml` باستعمال تدوين `Aux.`*ident*، بشرط أن تكون تلك التعريفات مصرَّحًا بها في `Aux.mli`.

ويحدّد ترتيب إعطاء ملفات `.cmo` للأمر `ocamlc` في مرحلة الربط ترتيبَ حدوث تعريفات الوحدات. وعلى هذا، يظهر `Aux` أولًا في المثال أعلاه، فيمكن لـ `Main` أن تشير إليه، لكن `Aux` لا يمكنها أن تشير إلى `Main`.

لاحظ أنّ البنى على المستوى الأعلى وحدها هي التي يمكن إسقاطها على ملفات مترجمة منفصلة، لا الموصِّلات ولا أنواع الوحدات. غير أنّ جميع كائنات صنف الوحدات يمكن أن تظهر مكوّنات في بنية، فالحلّ إذًا وضع الموصِّل أو نوع الوحدة داخل بنية، ثم إسقاط تلك البنية على ملف.
