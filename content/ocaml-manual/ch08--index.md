---
title: "أمثلة متقدّمة بالأصناف والوحدات"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 8: أمثلة متقدّمة بالأصناف والوحدات

*كتب هذا الفصل ديدييه ريمي*

نعرض في هذا الفصل بعض الأمثلة الأكبر استعمالًا للكائنات والأصناف والوحدات. نستعرض كثيرًا من ميزات الكائنات في الوقت نفسه على مثال حساب مصرفي. ونبيّن كيف يمكن التعبير عن وحدات مأخوذة من المكتبة القياسية على هيئة أصناف. وأخيرًا نصف نمطًا برمجيًا يُعرف باسم *الأنواع الافتراضية* من خلال مثال مديري النوافذ.

## 8.1 مثال موسّع: الحسابات المصرفية

نوضّح في هذا القسم معظم جوانب الكائنات والوراثة عبر تنقيح التعريف الأوّلي الساذج التالي لحساب مصرفي بسيط وتصحيحه وتخصيصه. (نعيد استعمال الوحدة `Euro` المعرّفة في نهاية الفصل 3.)

```ocaml
# let euro = new Euro.c;;

val euro : float -> Euro.c = <fun>

# let zero = euro 0.;;

val zero : Euro.c = <obj>

# let neg x = x#times (-1.);;

val neg : < times : float -> 'a; .. > -> 'a = <fun>

# class account =
    object
      val mutable balance = zero
      method balance = balance
      method deposit x = balance <- balance # plus x
      method withdraw x =
        if x#leq balance then (balance <- balance # plus (neg x); x) else zero
    end;;

class account :
  object
    val mutable balance : Euro.c
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method withdraw : Euro.c -> Euro.c
  end

# let c = new account in c # deposit (euro 100.); c # withdraw (euro 50.);;

- : Euro.c = <obj>
```

ننقّح الآن هذا التعريف بإضافة دالة لحساب الفائدة.

```ocaml
# class account_with_interests =
    object (self)
      inherit account
      method private interest = self # deposit (self # balance # times 0.03)
    end;;

class account_with_interests :
  object
    val mutable balance : Euro.c
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method private interest : unit
    method withdraw : Euro.c -> Euro.c
  end
```

جعلنا الدالة `interest` خاصة، لأن من الواضح أنها لا ينبغي أن تُستدعى بحرّية من الخارج. وهي هنا متاحة فقط للأصناف الفرعية التي ستتولّى التحديثات الشهرية أو السنوية للحساب.

سرعان ما ينبغي لنا إصلاح عيب في التعريف الحالي: يمكن استعمال الدالة `deposit` لسحب النقود بإيداع مبالغ سالبة. يمكننا إصلاح ذلك مباشرة:

```ocaml
# class safe_account =
    object
      inherit account
      method deposit x = if zero#leq x then balance <- balance#plus x
    end;;

class safe_account :
  object
    val mutable balance : Euro.c
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method withdraw : Euro.c -> Euro.c
  end
```

غير أنّ العيب يمكن إصلاحه على نحو أكثر أمانًا بالتعريف التالي:

```ocaml
# class safe_account =
    object
      inherit account as unsafe
      method deposit x =
        if zero#leq x then unsafe # deposit x
        else raise (Invalid_argument "deposit")
    end;;

class safe_account :
  object
    val mutable balance : Euro.c
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method withdraw : Euro.c -> Euro.c
  end
```

وهذا على وجه الخصوص لا يستلزم معرفة تنفيذ الدالة `deposit`.

ولتتبّع العمليات، نوسّع الصنف بحقل قابل للتغيير `history` ودالة خاصة `trace` تضيف عملية إلى السجل. ثم نعيد تعريف كل دالة نريد تتبّعها.

```ocaml
# type 'a operation = Deposit of 'a | Retrieval of 'a;;

type 'a operation = Deposit of 'a | Retrieval of 'a

# class account_with_history =
    object (self)
      inherit safe_account as super
      val mutable history = []
      method private trace x = history <- x :: history
      method deposit x = self#trace (Deposit x);  super#deposit x
      method withdraw x = self#trace (Retrieval x); super#withdraw x
      method history = List.rev history
    end;;

class account_with_history :
  object
    val mutable balance : Euro.c
    val mutable history : Euro.c operation list
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method history : Euro.c operation list
    method private trace : Euro.c operation -> unit
    method withdraw : Euro.c -> Euro.c
  end
```

قد يرغب المرء في فتح حساب مع إيداع مبلغ أوّلي في الوقت نفسه. ومع أنّ التنفيذ الأوّلي لم يعالج هذا الشرط، فيمكن تحقيقه باستعمال مهيّئ.

```ocaml
# class account_with_deposit x =
    object
      inherit account_with_history
      initializer balance <- x
    end;;

class account_with_deposit :
  Euro.c ->
  object
    val mutable balance : Euro.c
    val mutable history : Euro.c operation list
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method history : Euro.c operation list
    method private trace : Euro.c operation -> unit
    method withdraw : Euro.c -> Euro.c
  end
```

والبديل الأفضل هو:

```ocaml
# class account_with_deposit x =
    object (self)
      inherit account_with_history
      initializer self#deposit x
    end;;

class account_with_deposit :
  Euro.c ->
  object
    val mutable balance : Euro.c
    val mutable history : Euro.c operation list
    method balance : Euro.c
    method deposit : Euro.c -> unit
    method history : Euro.c operation list
    method private trace : Euro.c operation -> unit
    method withdraw : Euro.c -> Euro.c
  end
```

فالبديل الأخير أكثر أمانًا فعلًا، لأن نداء `deposit` سيستفيد تلقائيًا من فحوص الأمان ومن التتبّع. لنجرّبه:

```ocaml
# let ccp = new account_with_deposit (euro 100.) in
  let _balance = ccp#withdraw (euro 50.) in
  ccp#history;;

- : Euro.c operation list = [Deposit <obj>; Retrieval <obj>]
```

ويمكن إغلاق حساب بالدالة متعدّدة الأشكال التالية:

```ocaml
# let close c = c#withdraw c#balance;;

val close : < balance : 'a; withdraw : 'a -> 'b; .. > -> 'b = <fun>
```

وهذا ينطبق بطبيعة الحال على جميع أنواع الحسابات.

وأخيرًا نجمع عدّة نسخ من الحساب في وحدة `Account` مُجرّدة على عملة ما.

```ocaml
# let today () = (01,01,2000) (* an approximation *)
  module Account (M:MONEY) =
    struct
      type m = M.c
      let m = new M.c
      let zero = m 0.

      class bank =
        object (self)
          val mutable balance = zero
          method balance = balance
          val mutable history = []
          method private trace x = history <- x::history
          method deposit x =
            self#trace (Deposit x);
            if zero#leq x then balance <- balance # plus x
            else raise (Invalid_argument "deposit")
          method withdraw x =
            if x#leq balance then
              (balance <- balance # plus (neg x); self#trace (Retrieval x); x)
            else zero
          method history = List.rev history
        end

      class type client_view =
        object
          method deposit : m -> unit
          method history : m operation list
          method withdraw : m -> m
          method balance : m
        end

      class virtual check_client x =
        let y = if (m 100.)#leq x then x
        else raise (Failure "Insufficient initial deposit") in
        object (self)
          initializer self#deposit y
          method virtual deposit: m -> unit
        end

      module Client (B : sig class bank : client_view end) =
        struct
          class account x : client_view =
            object
              inherit B.bank
              inherit check_client x
            end

          let discount x =
            let c = new account x in
            if today() < (1998,10,30) then c # deposit (m 100.); c
        end
    end;;
```

يبيّن هذا استعمال الوحدات لتجميع عدّة تعريفات أصناف يمكن التفكير فيها في الواقع كوحدة واحدة. وهذه الوحدة يوفّرها مصرف للاستعمال الداخلي والخارجي معًا. وقد نُفّذ ذلك على هيئة موصِّل مُجرَّد على العملة حتى يمكن استعمال الشيفرة نفسها لتوفير حسابات بعملات مختلفة.

الصنف `bank` هو التنفيذ *الحقيقي* للحساب المصرفي (وكان يمكن تضمينه في المكان نفسه). وهو الصنف الذي سيُستعمل في التوسيعات والتنقيحات اللاحقة وما إليها. وفي المقابل لن يُعطى العميل إلا واجهة العميل.

```ocaml
# module Euro_account = Account(Euro);;

# module Client = Euro_account.Client (Euro_account);;

# new Client.account (new Euro.c 100.);;
```

وبالتالي لا يستطيع العملاء الوصول المباشر إلى `balance` ولا إلى `history` الخاصة بحساباتهم. وسبيلهم الوحيد لتغيير أرصدتهم هو الإيداع أو السحب. ومن المهم إعطاء العملاء صنفًا لا مجرّد القدرة على إنشاء حسابات (كحساب `discount` الترويجي)، حتى يتسنّى لهم تخصيص حساباتهم. فمثلًا يمكن للعميل أن ينقّح الدالتين `deposit` و`withdraw` ليقوم بمسك دفاتره المالية الخاصة تلقائيًا. وفي المقابل تُعطى الدالة `discount` على هذا النحو، دون أي إمكانية لمزيد من التخصيص.

ومن المهم تقديم واجهة العميل على هيئة موصِّل `Client` حتى يمكن بناء حسابات العملاء بعد تخصيص محتمل للصنف `bank`. فقد يبقى الموصِّل `Client` على حاله ويُمرَّر إليه التعريف الجديد لتهيئة واجهة عميل للحساب الموسّع.

```ocaml
# module Investment_account (M : MONEY) =
    struct
      type m = M.c
      module A = Account(M)

      class bank =
        object
          inherit A.bank as super
          method deposit x =
            if (new M.c 1000.)#leq x then
              print_string "Would you like to invest?";
            super#deposit x
        end

      module Client = A.Client
    end;;
```

ويمكن أيضًا إعادة تعريف الموصِّل `Client` حين يمكن منح العميل بعض الميزات الجديدة في الحساب.

```ocaml
# module Internet_account (M : MONEY) =
    struct
      type m = M.c
      module A = Account(M)

      class bank =
        object
          inherit A.bank
          method mail s = print_string s
        end

      class type client_view =
        object
          method deposit : m -> unit
          method history : m operation list
          method withdraw : m -> m
          method balance : m
          method mail : string -> unit
        end

      module Client (B : sig class bank : client_view end) =
        struct
          class account x : client_view =
            object
              inherit B.bank
              inherit A.check_client x
            end
        end
    end;;
```

## 8.2 وحدات بسيطة على هيئة أصناف

قد يتساءل المرء هل يمكن معاملة أنواع أوّلية كالأعداد الصحيحة والسلاسل كائناتٍ. ومع أنّ ذلك غير مثير للاهتمام عادةً في حالة الأعداد الصحيحة أو السلاسل، فقد توجد بعض الحالات التي يُستحسن فيها ذلك. والصنف `money` أعلاه مثال من هذا القبيل. ونبيّن هنا كيف نفعل ذلك في حالة السلاسل.

### 8.2.1 السلاسل

قد يكون التعريف الساذج للسلاسل كائنات كما يلي:

```ocaml
# class ostring s =
    object
       method get n = String.get s n
       method print = print_string s
       method escaped = new ostring (String.escaped s)
    end;;

class ostring :
  string ->
  object
    method escaped : ostring
    method get : int -> char
    method print : unit
  end
```

غير أنّ الدالة `escaped` تعيد كائنًا من الصنف `ostring` لا كائنًا من الصنف الحالي. ومن ثمّ، إذا وُسّع الصنف أكثر، فلن تعيد الدالة `escaped` إلا كائنًا من الصنف الأب.

```ocaml
# class sub_string s =
    object
       inherit ostring s
       method sub start len = new sub_string (String.sub s  start len)
    end;;

class sub_string :
  string ->
  object
    method escaped : ostring
    method get : int -> char
    method print : unit
    method sub : int -> int -> sub_string
  end
```

وكما رأينا في القسم 3.16، فالحلّ هو استعمال التحديث الدالي بدلًا من ذلك. ويلزمنا إنشاء متغيّر نسخة يحمل تمثيل السلسلة `s`.

```ocaml
# class better_string s =
    object
       val repr = s
       method get n = String.get repr n
       method print = print_string repr
       method escaped = {< repr = String.escaped repr >}
       method sub start len = {< repr = String.sub s start len >}
    end;;

class better_string :
  string ->
  object ('a)
    val repr : string
    method escaped : 'a
    method get : int -> char
    method print : unit
    method sub : int -> int -> 'a
  end
```

وكما يظهر في النوع المستنتَج، تعيد الدالتان `escaped` و`sub` الآن كائنات من النوع نفسه الذي للصنف.

وثمّة صعوبة أخرى في تنفيذ الدالة `concat`. فمن أجل دمج سلسلة مع سلسلة أخرى من الصنف نفسه، يجب أن يتيسّر الوصول إلى متغيّر النسخة من الخارج. لذا يجب تعريف دالة `repr` تعيد `repr`. وهذا هو التعريف الصحيح للسلاسل:

```ocaml
# class ostring s =
    object (self : 'mytype)
       val repr = s
       method repr = repr
       method get n = String.get repr n
       method print = print_string repr
       method escaped = {< repr = String.escaped repr >}
       method sub start len = {< repr = String.sub s start len >}
       method concat (t : 'mytype) = {< repr = repr ^ t#repr >}
    end;;

class ostring :
  string ->
  object ('a)
    val repr : string
    method concat : 'a -> 'a
    method escaped : 'a
    method get : int -> char
    method print : unit
    method repr : string
    method sub : int -> int -> 'a
  end
```

ويمكن تعريف باني آخر للصنف `ostring` ليعيد سلسلة جديدة بطول معطى:

```ocaml
# class cstring n = ostring (String.make n ' ');;

class cstring : int -> ostring
```

وهنا يكون كشف تمثيل السلاسل غير ضارّ على الأرجح. ويمكننا أيضًا إخفاء تمثيل السلاسل كما أخفينا العملة في الصنف `money` بالقسم 3.17.

#### المكدّسات

ثمّة أحيانًا بديل بين استعمال الوحدات أو الأصناف لأنواع البيانات ذات المعاملات. فثمّة حالات يكون فيها المنهجان متشابهين إلى حدّ بعيد. فمثلًا يمكن تنفيذ مكدّس تنفيذًا مباشرًا على هيئة صنف:

```ocaml
# exception Empty;;

exception Empty

# class ['a] stack =
    object
      val mutable l = ([] : 'a list)
      method push x = l <- x::l
      method pop = match l with [] -> raise Empty | a::l' -> l <- l'; a
      method clear = l <- []
      method length = List.length l
    end;;

class ['a] stack :
  object
    val mutable l : 'a list
    method clear : unit
    method length : int
    method pop : 'a
    method push : 'a -> unit
  end
```

غير أنّ كتابة دالة للمرور على عناصر المكدّس أعقد. فالدالة `fold` سيكون نوعها `('b -> 'a -> 'b) -> 'b -> 'b`. وهنا `'a` هو معامل المكدّس. أمّا المعامل `'b` فلا علاقة له بالصنف `'a stack` بل بالوسيط الذي سيُمرَّر إلى الدالة `fold`. والنهج الساذج هو جعل `'b` معاملًا إضافيًا للصنف `stack`:

```ocaml
# class ['a, 'b] stack2 =
    object
      inherit ['a] stack
      method fold f (x : 'b) = List.fold_left f x l
    end;;

class ['a, 'b] stack2 :
  object
    val mutable l : 'a list
    method clear : unit
    method fold : ('b -> 'a -> 'b) -> 'b -> 'b
    method length : int
    method pop : 'a
    method push : 'a -> unit
  end
```

غير أنّ الدالة `fold` لكائن معيّن لا يمكن تطبيقها إلا على دوالّ لها جميعًا النوع نفسه:

```ocaml
# let s = new stack2;;

val s : ('_weak1, '_weak2) stack2 = <obj>

# s#fold ( + ) 0;;

- : int = 0

# s;;

- : (int, int) stack2 = <obj>
```

والحلّ الأفضل هو استعمال الدوال متعدّدة الأشكال، التي أُدخلت في الإصدار 3.05 من OCaml. فالدوال متعدّدة الأشكال تجعل من الممكن معاملة متغيّر النوع `'b` في نوع `fold` كمكمَّم كليًا، فيأخذ `fold` النوع متعدّد الأشكال `Forall 'b. ('b -> 'a -> 'b) -> 'b -> 'b`. ويلزم إعلان نوع صريح على الدالة `fold`، لأن مدقّق الأنواع لا يستطيع استنتاج النوع متعدّد الأشكال بنفسه.

```ocaml
# class ['a] stack3 =
    object
      inherit ['a] stack
      method fold : 'b. ('b -> 'a -> 'b) -> 'b -> 'b
                  = fun f x -> List.fold_left f x l
    end;;

class ['a] stack3 :
  object
    val mutable l : 'a list
    method clear : unit
    method fold : ('b -> 'a -> 'b) -> 'b -> 'b
    method length : int
    method pop : 'a
    method push : 'a -> unit
  end
```

### 8.2.2 Hashtbl

ينبغي لنسخة مبسّطة من جداول التجزئة الكائنية أن يكون لها نوع الصنف التالي.

```ocaml
# class type ['a, 'b] hash_table =
    object
      method find : 'a -> 'b
      method add : 'a -> 'b -> unit
    end;;

class type ['a, 'b] hash_table =
  object method add : 'a -> 'b -> unit method find : 'a -> 'b end
```

وأحد التنفيذات البسيطة، وهو معقول تمامًا لجداول التجزئة الصغيرة، استعمال قائمة اقتران:

```ocaml
# class ['a, 'b] small_hashtbl : ['a, 'b] hash_table =
    object
      val mutable table = []
      method find key = List.assoc key table
      method add key value = table <- (key, value) :: table
    end;;

class ['a, 'b] small_hashtbl : ['a, 'b] hash_table
```

وثمّة تنفيذ أفضل، وهو يقيس على نحو أفضل، يقوم على استعمال جدول تجزئة حقيقي… عناصره جداول تجزئة صغيرة!

```ocaml
# class ['a, 'b] hashtbl size : ['a, 'b] hash_table =
    object (self)
      val table = Array.init size (fun i -> new small_hashtbl)
      method private hash key =
        (Hashtbl.hash key) mod (Array.length table)
      method find key = table.(self#hash key) # find key
      method add key = table.(self#hash key) # add key
    end;;

class ['a, 'b] hashtbl : int -> ['a, 'b] hash_table
```

### 8.2.3 المجموعات

يؤدّي تنفيذ المجموعات إلى صعوبة أخرى. فالدالة `union` تحتاج إلى القدرة على الوصول إلى التمثيل الداخلي لكائن آخر من الصنف نفسه.

وهذه حالة أخرى من الدوال الصديقة كما رأينا في القسم 3.17. بل هي الآلية نفسها المستعملة في الوحدة `Set` عند غياب الكائنات.

وفي النسخة الكائنية من المجموعات لا نحتاج إلا إلى إضافة دالة `tag` تعيد تمثيل مجموعة. ولأن المجموعات ذات معاملات في نوع العناصر، فلدالة `tag` نوع ذو معاملات هو `'a tag`، ملموس داخل تعريف الوحدة ومجرّد في توقيعها. ومن الخارج سيُضمن حينها أن كائنين لهما دالة `tag` من النوع نفسه سيشتركان في التمثيل نفسه.

```ocaml
# module type SET =
    sig
      type 'a tag
      class ['a] c :
        object ('b)
          method is_empty : bool
          method mem : 'a -> bool
          method add : 'a -> 'b
          method union : 'b -> 'b
          method iter : ('a -> unit) -> unit
          method tag : 'a tag
        end
    end;;

# module Set : SET =
    struct
      let rec merge l1 l2 =
        match l1 with
          [] -> l2
        | h1 :: t1 ->
            match l2 with
              [] -> l1
            | h2 :: t2 ->
                if h1 < h2 then h1 :: merge t1 l2
                else if h1 > h2 then h2 :: merge l1 t2
                else merge t1 l2
      type 'a tag = 'a list
      class ['a] c =
        object (_ : 'b)
          val repr = ([] : 'a list)
          method is_empty = (repr = [])
          method mem x = List.exists (( = ) x) repr
          method add x = {< repr = merge [x] repr >}
          method union (s : 'b) = {< repr = merge repr s#tag >}
          method iter (f : 'a -> unit) = List.iter f repr
          method tag = repr
        end
    end;;
```

## 8.3 نمط الموضوع/المراقب

المثال التالي، المعروف بنمط الموضوع/المراقب، يُعرض كثيرًا في المؤلَّفات بوصفه مسألة وراثة صعبة بأصناف مترابطة. ويُجمل النمط العامّ في تعريف زوج من صنفين يتفاعلان مع بعضهما تفاعلًا عوديًا.

وللصنف `observer` دالة مميّزة `notify` تحتاج إلى وسيطين: موضوع وحدث، لتنفيذ إجراء.

```ocaml
# class virtual ['subject, 'event] observer =
    object
      method virtual notify : 'subject ->  'event -> unit
    end;;

class virtual ['subject, 'event] observer :
  object method virtual notify : 'subject -> 'event -> unit end
```

أمّا الصنف `subject` فيحفظ قائمة بالمراقبين في متغيّر نسخة، وله دالة مميّزة `notify_observers` تبثّ الرسالة `notify` إلى جميع المراقبين مع حدث معيّن `e`.

```ocaml
# class ['observer, 'event] subject =
    object (self)
      val mutable observers = ([]:'observer list)
      method add_observer obs = observers <- (obs :: observers)
      method notify_observers (e : 'event) =
          List.iter (fun x -> x#notify self e) observers
    end;;

class ['a, 'event] subject :
  object ('b)
    constraint 'a = < notify : 'b -> 'event -> unit; .. >
    val mutable observers : 'a list
    method add_observer : 'a -> unit
    method notify_observers : 'event -> unit
  end
```

وتكمن الصعوبة عادةً في تعريف نسخ من النمط السابق بالوراثة. ويمكن فعل ذلك في OCaml على نحو طبيعي وبديهي، كما يظهر في المثال التالي الذي يتعامل مع النوافذ.

```ocaml
# type event = Raise | Resize | Move;;

type event = Raise | Resize | Move

# let string_of_event = function
      Raise -> "Raise" | Resize -> "Resize" | Move -> "Move";;

val string_of_event : event -> string = <fun>

# let count = ref 0;;

val count : int ref = {contents = 0}

# class ['observer] window_subject =
    let id = count := succ !count; !count in
    object (self)
      inherit ['observer, event] subject
      val mutable position = 0
      method identity = id
      method move x = position <- position + x; self#notify_observers Move
      method draw = Printf.printf "{Position = %d}\n"  position;
    end;;

class ['a] window_subject :
  object ('b)
    constraint 'a = < notify : 'b -> event -> unit; .. >
    val mutable observers : 'a list
    val mutable position : int
    method add_observer : 'a -> unit
    method draw : unit
    method identity : int
    method move : int -> unit
    method notify_observers : event -> unit
  end

# class ['subject] window_observer =
    object
      inherit ['subject, event] observer
      method notify s e = s#draw
    end;;

class ['a] window_observer :
  object
    constraint 'a = < draw : unit; .. >
    method notify : 'a -> event -> unit
  end
```

وكما هو متوقّع، فنوع `window` عودي.

```ocaml
# let window = new window_subject;;

val window :
  (< notify : 'a -> event -> unit; .. > as '_weak3) window_subject as 'a =
  <obj>
```

غير أنّ الصنفين `window_subject` و`window_observer` ليسا متعائدين.

```ocaml
# let window_observer = new window_observer;;

val window_observer : (< draw : unit; .. > as '_weak4) window_observer =
  <obj>

# window#add_observer window_observer;;

- : unit = ()

# window#move 1;;

{Position = 1}
- : unit = ()
```

ويمكن مع ذلك توسيع الصنفين `window_observer` و`window_subject` بالوراثة. فمثلًا يمكن إثراء `subject` بسلوكات جديدة وتنقيح سلوك المراقب.

```ocaml
# class ['observer] richer_window_subject =
    object (self)
      inherit ['observer] window_subject
      val mutable size = 1
      method resize x = size <- size + x; self#notify_observers Resize
      val mutable top = false
      method raise = top <- true; self#notify_observers Raise
      method draw = Printf.printf "{Position = %d; Size = %d}\n"  position size;
    end;;

class ['a] richer_window_subject :
  object ('b)
    constraint 'a = < notify : 'b -> event -> unit; .. >
    val mutable observers : 'a list
    val mutable position : int
    val mutable size : int
    val mutable top : bool
    method add_observer : 'a -> unit
    method draw : unit
    method identity : int
    method move : int -> unit
    method notify_observers : event -> unit
    method raise : unit
    method resize : int -> unit
  end

# class ['subject] richer_window_observer =
    object
      inherit ['subject] window_observer as super
      method notify s e = if e <> Raise then s#raise; super#notify s e
    end;;

class ['a] richer_window_observer :
  object
    constraint 'a = < draw : unit; raise : unit; .. >
    method notify : 'a -> event -> unit
  end
```

ويمكننا كذلك إنشاء نوع آخر من المراقبين:

```ocaml
# class ['subject] trace_observer =
    object
      inherit ['subject, event] observer
      method notify s e =
        Printf.printf
          "<Window %d <== %s>\n" s#identity (string_of_event e)
    end;;

class ['a] trace_observer :
  object
    constraint 'a = < identity : int; .. >
    method notify : 'a -> event -> unit
  end
```

وإرفاق عدّة مراقبين بالكائن نفسه:

```ocaml
# let window = new richer_window_subject;;

val window :
  (< notify : 'a -> event -> unit; .. > as '_weak5) richer_window_subject
  as 'a = <obj>

# window#add_observer (new richer_window_observer);;

- : unit = ()

# window#add_observer (new trace_observer);;

- : unit = ()

# window#move 1; window#resize 2;;

<Window 1 <== Move>
<Window 1 <== Raise>
{Position = 1; Size = 1}
{Position = 1; Size = 1}
<Window 1 <== Resize>
<Window 1 <== Raise>
{Position = 1; Size = 3}
{Position = 1; Size = 3}
- : unit = ()
```
