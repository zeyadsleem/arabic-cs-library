---
title: "القابلية للتغيير"
lang: ar
source: https://cs3110.github.io/textbook/chapters/mut/intro.html
---

## 6. القابلية للتغيير[#](#mutability)

ليست OCaml لغة *نقية (pure)*: فهي تسمح بالتأثيرات الجانبية. وقد رأينا ذلك بالفعل مع الإدخال/الإخراج، ولا سيما الطباعة. لكننا حتى الآن حصرنا أنفسنا في المجموعة الجزئية من اللغة التي تكون *غير قابلة للتغيير (immutable)*: حيث لا يمكن للقيم أن تتغير.

القابلية للتغيير (mutability) ليست خيرًا محضًا ولا شرًّا محضًا. فهي تتيح وظائف جديدة لم يكن بمقدورنا تنفيذها (أو على الأقل لم يكن ذلك سهلًا) من قبل، وتمكّننا من إنشاء بنى بيانات معينة أكثر كفاءة من الناحية المقاربة (asymptotically) من نظيراتها الوظيفية البحتة. لكن القابلية للتغيير تجعل الاستدلال على الشيفرة أكثر صعوبة، ومن ثمّ فهي مصدر للعديد من الأخطاء في الشيفرة. وقد يكون أحد أسباب ذلك أن البشر ليسوا بارعين في التفكير في التغيّر. فمع القيم غير القابلة للتغيير، نضمن أن أي حقيقة نثبتها بشأنها لا يمكن أن تتغير أبدًا. أما مع القيم القابلة للتغيير، فلم يعد ذلك صحيحًا. «التغيير صعب»، كما يقولون.

في هذا الفصل القصير سنغطي القليل من الميزات القابلة للتغيير في OCaml التي أغفلناها حتى الآن، وسنستخدمها في بعض بنى البيانات البسيطة. أما الفائدة الحقيقية فستأتي في فصول لاحقة، حيث نوظّف هذه الميزات في استخدامات أكثر تقدمًا.

## 6.1. المراجع[#](#refs)

*المرجع (ref)* شبيه بالمؤشر (pointer) أو المرجع (reference) في لغة أمرية (imperative). وهو موقع في الذاكرة قد يتغيّر محتواه. ويُسمى المرجع أيضًا *خلية مرجع (ref cell)*، والفكرة أنه توجد خلية في الذاكرة يمكن أن تتغير.

وإليك مثالًا على إنشاء مرجع، والحصول على القيمة من داخله، وتغيير محتواه، وملاحظة المحتوى المتغيّر:

```ocaml
let x = ref 0;;
```

```text
val x : int ref = {contents = 0}
```

```ocaml
!x;;
```

```text
- : int = 0
```

```ocaml
x := 1;;
```

```text
- : unit = ()
```

```ocaml
!x;;
```

```text
- : int = 1
```

العبارة الأولى، `let x = ref 0`، تنشئ مرجعًا باستخدام الكلمة المفتاحية `ref`. ذلك موقع في الذاكرة محتواه مهيأ ابتدائيًا إلى `0`. فكّر في الموقع نفسه كعنوان (address)—مثلًا 0x3110bae0—مع أنه لا سبيل إلى كتابة عنوان كهذا في برنامج OCaml. والكلمة المفتاحية `ref` هي ما يسبب تخصيص موقع الذاكرة وتهيئته.

الجزء الأول من استجابة OCaml، `val x : int ref`، يدل على أن `x` متغير نوعه `int ref`. لدينا هنا مُنشئ أنواع (type constructor) جديد. فكما أن `list` و`option` مُنشئان للأنواع، كذلك `ref`. و`t ref`، لأي نوع `t`، مرجع إلى موقع في الذاكرة يُضمن أنه يحتوي قيمة من النوع `t`. وكما اعتدنا، ينبغي قراءة النوع من اليمين إلى اليسار: `t ref` تعني مرجعًا إلى `t`. أما الجزء الثاني من الاستجابة فيعرض لنا محتوى موقع الذاكرة. وفعلًا، تمت تهيئة المحتوى إلى `0`.

العبارة الثانية، `!x`، تلغي الإشارة (dereference) إلى `x` وتعيد محتوى موقع الذاكرة. لاحظ أن `!` هو عامل إلغاء الإشارة في OCaml، وليس النفي المنطقي.

العبارة الثالثة، `x := 1`، إسناد (assignment). وهي تغيّر محتوى `x` إلى `1`. لاحظ أن `x` نفسه ما زال يشير إلى الموقع نفسه (أي العنوان نفسه) في الذاكرة. فالذاكرة قابلة للتغيير؛ أما ارتباطات المتغيرات فليست كذلك. الذي يتغير هو المحتوى. واستجابة OCaml هي `()` فحسب، بمعنى أن الإسناد قد حدث—تمامًا كما تُعيد دوال الطباعة `()` للإشارة إلى أن الطباعة قد حدثت فعلًا.

العبارة الرابعة، `!x`، تلغي الإشارة إلى `x` مرة أخرى لتُظهر أن محتوى موقع الذاكرة قد تغيّر فعلًا.

### 6.1.1. الاستعارة المرجعية[#](#aliasing)

الآن بعد أن أصبحت لدينا مراجع، أصبح لدينا *الاستعارة المرجعية (aliasing)*: فقد يشير مرجعان إلى موقع الذاكرة نفسه، ومن ثمّ فإن التحديث عبر أحدهما يجعل الآخر يُحدَّث أيضًا. على سبيل المثال،

```ocaml
let x = ref 42;;
let y = ref 42;;
let z = x;;
x := 43;;
let w = !y + !z;;
```

```text
val x : int ref = {contents = 42}
```

```text
val y : int ref = {contents = 42}
```

```text
val z : int ref = {contents = 42}
```

```text
- : unit = ()
```

نتيجة تنفيذ تلك الشيفرة أن `w` يرتبط بالقيمة `85`، لأن `let z = x` يجعل `z` و`x` اسمين مستعارين لنفس المرجع، ومن ثمّ فإن تحديث `x` إلى `43` يجعل `z` أيضًا `43`.

### 6.1.2. الصياغة والدلالات[#](#syntax-and-semantics)

تستند دلالات المراجع إلى *المواقع (locations)* في الذاكرة. فالمواقع قيم يمكن تمريرها إلى الدوال وإعادتها منها. لكن خلافًا للقيم الأخرى (مثل الأعداد الصحيحة والأنواع المتغايرة)، لا سبيل إلى كتابة موقع مباشرةً في برنامج OCaml. وهذا مختلف عن لغات مثل C، حيث يمكن للمبرمجين كتابة عناوين الذاكرة مباشرةً وإجراء حساب على المؤشرات. يريد مبرمجو C هذا النوع من الوصول المنخفض المستوى لأداء أشياء مثل التفاعل مع العتاد وبناء أنظمة التشغيل. أما المبرمجون في المستويات الأعلى فيقبلون التنازل عنه مقابل الحصول على *أمان الذاكرة (memory safety)*. وهذا مصطلح يصعب تعريفه، لكن وفقًا لـ [Hicks 2014](http://www.pl-enthusiast.net/2014/07/21/memory-safety/) فهو يعني بديهيًا أن

- لا تُنشأ المؤشرات إلا بطريقة آمنة تحدّد منطقة الذاكرة المشروعة الخاصة بها،
- ولا يمكن إلغاء الإشارة إلى المؤشرات إلا إذا كانت تشير إلى منطقة الذاكرة المخصّصة لها،
- وأن تكون تلك المنطقة (ما زالت) معرّفة.

**الصياغة (Syntax).**

- إنشاء مرجع: `ref e`
- إسناد مرجع: `e1 := e2`
- إلغاء الإشارة: `!e`

**الدلالات الديناميكية (Dynamic semantics).**

- لتقييم `ref e`، قيّم `e` إلى قيمة `v`
- خصّص موقعًا جديدًا `loc` في الذاكرة لحمل `v`
- خزّن `v` في `loc`
- أعِد `loc`

لتقييم `e1 := e2`،

- قيّم `e2` إلى قيمة `v`، و`e1` إلى موقع `loc`.
- خزّن `v` في `loc`.
- أعِد `()`، أي unit.

لتقييم `!e`،

- قيّم `e` إلى موقع `loc`.
- أعِد محتوى `loc`.

**الدلالات الساكنة (Static semantics).**

لدينا مُنشئ أنواع جديد، `ref`، حيث يكون `t ref` نوعًا لأي نوع `t`. لاحظ أن الكلمة المفتاحية `ref` تُستخدم بطريقتين: كمُنشئ أنواع، وكتعبير ينشئ المراجع.

- `ref e : t ref` إذا كان `e : t`.
- `e1 := e2 : unit` إذا كان `e1 : t ref` و`e2 : t`.
- `!e : t` إذا كان `e : t ref`.

### 6.1.3. تتابع التأثيرات[#](#sequencing-of-effects)

يُستخدم عامل الفاصلة المنقوطة لتتابع التأثيرات، مثل تغيير المراجع. وقد رأينا الفاصلة المنقوطة سابقًا مع الطباعة. وبعد أن صرنا ندرس القابلية للتغيير، حان وقت معالجتها معالجة صورية.

- **الصياغة:** `e1; e2`
- **الدلالات الديناميكية:** لتقييم `e1; e2`، قيّم `e1` أولًا إلى قيمة `v1`.
- ثم قيّم `e2` إلى قيمة `v2`.
- أعِد `v2`. (لا يُستخدم `v1` إطلاقًا.)
- إذا وُجدت عدة تعبيرات في متتالية، مثل `e1; e2; ...; en`، فقيّم كل واحد منها بالترتيب من اليسار إلى اليمين، ولا تعِد إلا `vn`.

**الدلالات الساكنة:** `e1; e2 : t` إذا كان `e1 : unit` و`e2 : t`. وبالمثل، `e1; e2; ...; en : t` إذا كان `e1 : unit`، `e2 : unit`، … (أي أن جميع التعبيرات عدا `en` نوعها `unit`)، و`en : t`.

صُمّمت قاعدة الأنواع الخاصة بالفاصلة المنقوطة لمنع أخطاء المبرمجين. فمثلًا، المبرمج الذي يكتب `2+3; 7` لم يقصد ذلك على الأرجح: فلا سبب لتقييم `2+3` ثم طرح النتيجة وبدلًا من ذلك إعادة `7`. وسيعطيك المصرّف تحذيرًا إذا خالفت قاعدة الأنواع هذه تحديدًا.

للتخلص من التحذير (إن كنت واثقًا من أن ذلك ما تحتاج إلى فعله)، توجد دالة `ignore : 'a -> unit` في المكتبة القياسية. وباستخدامها، ستُصرَّف `ignore(2+3); 7` دون تحذير. ويمكنك بالطبع كتابة `ignore` بنفسك: `let ignore _ = ()`.

### 6.1.4. مثال: عدّاد قابل للتغيير[#](#example-mutable-counter)

إليك شيفرة تنفّذ *عدّادًا (counter)*. في كل مرة تُستدعى فيها `next_val`، تعيد واحدًا أكثر من المرة السابقة.

```ocaml
let counter = ref 0
let next_val =
  fun () ->
    counter := !counter + 1;
    !counter
```

```text
val counter : int ref = {contents = 0}
```

```text
val next_val : unit -> int = <fun>
```

```ocaml
next_val ()
```

```text
- : int = 1
```

```ocaml
next_val ()
```

```text
- : int = 2
```

```ocaml
next_val ()
```

```text
- : int = 3
```

في تنفيذ `next_val`، يوجد تعبيران تفصلهما فاصلة منقوطة. التعبير الأول، `counter := !counter + 1`، إسناد يزيد `counter` بمقدار 1. والتعبير الثاني، `!counter`، يعيد محتوى `counter` بعد الزيادة.

تتميز الدالة `next_val` بأنها في كل مرة نستدعيها تعيد قيمة مختلفة. وهذا مختلف تمامًا عن أي من الدوال التي نفّذناها بأنفسنا حتى الآن، والتي كانت دائمًا *حتمية (deterministic)*: فبالنسبة إلى مدخل معطى، كانت تُنتج المخرج نفسه دائمًا. وفي المقابل، ثمة دوال *غير حتمية (nondeterministic)*: فقد يُنتج كل استدعاء للدالة مخرجًا مختلفًا رغم تلقي المدخل نفسه. وفي المكتبة القياسية، مثلًا، الدوال في وحدة `Random` غير حتمية، وكذلك `Stdlib.read_line` التي تقرأ مدخلات من المستخدم. وليس من قبيل المصادفة أن تكون هذه الدوال منفَّذة باستخدام ميزات قابلة للتغيير.

يمكننا تحسين عدّادنا بطريقتين. أولًا، توجد دالة مكتبية `incr : int ref -> unit` تزيد `int ref` بمقدار 1. فهي إذن مثل عامل `++` المألوف في كثير من لغات عائلة C. وباستخدامها يمكننا كتابة `incr counter` بدلًا من `counter := !counter + 1`. (وتوجد أيضًا دالة `decr` تنقص بمقدار 1.)

ثانيًا، الطريقة التي كتبنا بها العدّاد تكشف المتغير `counter` للعالم الخارجي. ربما نفضّل إخفاءه حتى لا يستطيع عملاء `next_val` تغييره مباشرةً. ويمكننا فعل ذلك بتدشين `counter` داخل نطاق `next_val`:

```ocaml
let next_val =
  let counter = ref 0 in
  fun () ->
    incr counter;
    !counter
```

```text
val next_val : unit -> int = <fun>
```

الآن يقع `counter` في النطاق داخل `next_val`، لكن لا يمكن الوصول إليه خارج ذلك النطاق.

عندما قدّمنا الدلالات الديناميكية لتعبيرات let سابقًا، تحدثنا عن الاستبدال (substitution). وإحدى طرق التفكير في تعريف `next_val` هي كما يلي.

أولًا، يُقيَّم التعبير `ref 0`. فذلك يعيد موقعًا `loc`، وهو عنوان في الذاكرة. ويُهيَّأ محتوى ذلك العنوان ابتدائيًا إلى `0`.

ثانيًا، في كل موضع يظهر فيه `counter` في جسم تعبير let، نستبدل به ذلك الموقع. فنحصل على:

```text
fun () -> incr loc; !loc
```

ثالثًا، ترتبط تلك الدالة المجهولة بـ `next_val`.

لذا ففي أي وقت تُستدعى فيه `next_val`، فإنها تزيد محتوى موقع الذاكرة الواحد `loc` هذا وتعيده.

الآن تخيّل أننا كتبنا بدلًا من ذلك الشيفرة (المعطوبة) التالية:

```ocaml
let next_val_broken = fun () ->
  let counter = ref 0 in
  incr counter;
  !counter
```

```text
val next_val_broken : unit -> int = <fun>
```

الفرق بسيط فحسب: ارتباط `counter` يحدث بعد `fun () ->` بدلًا من أن يحدث قبله. لكن الفرق هائل:

```ocaml
next_val_broken ();;
next_val_broken ();;
next_val_broken ();;
```

```text
- : int = 1
```

```text
- : int = 1
```

```text
- : int = 1
```

في كل مرة نستدعي `next_val_broken`، تعيد `1`: لم يعد لدينا عدّاد. ما الذي يسير على غير ما يرام هنا؟

المشكلة أن كل مرة تُستدعى فيها `next_val_broken`، يكون أول ما تفعله تقييم `ref 0` إلى موقع جديد يُهيَّأ ابتدائيًا إلى `0`. ثم يُزاد ذلك الموقع ليصير `1`، وتُعاد القيمة `1`. وهكذا يخصّص *كل* استدعاء لـ `next_val_broken` خلية مرجع جديدة، بينما تخصّص `next_val` خلية مرجع جديدة *واحدة* فقط.

### 6.1.5. مثال: المؤشرات[#](#example-pointers)

في لغات مثل C، تجمع المؤشرات بين ميزتين: يمكن أن تكون فارغة (null)، ويمكن أن تتغير. (وللغة Java بناء مشابه بمراجع الكائنات، لكن هذا المصطلح مربك في سياق OCaml لدينا لأن «المرجع» يعني حاليًا خلية مرجع. لذا سنلتزم بكلمة «مؤشر».) لنكتب المؤشرات باستخدام خلايا مرجع OCaml.

```ocaml
type 'a pointer = 'a ref option
```

```text
type 'a pointer = 'a ref option
```

وكما اعتدنا، اقرأ ذلك النوع من اليمين إلى اليسار. وجزء `option` منه يجسّد حقيقة أن المؤشر قد يكون فارغًا. ونحن نستخدم `None` لتمثيل ذلك الاحتمال.

```ocaml
let null : 'a pointer = None
```

```text
val null : 'a pointer = None
```

وجزء `ref` من النوع يجسّد حقيقة أن المحتوى قابل للتغيير. ويمكننا إنشاء دالة مساعدة لتخصيص محتوى مؤشر جديد وتهيئته:

```ocaml
let malloc (x : 'a) : 'a pointer = Some (ref x)
```

```text
val malloc : 'a -> 'a pointer = <fun>
```

الآن يمكننا إنشاء مؤشر إلى أي قيمة نشاء:

```ocaml
let p = malloc 42
```

```text
val p : int pointer = Some {contents = 42}
```

*إلغاء الإشارة (Dereferencing)* إلى مؤشر هو العامل السابق `*` في C. وهو يعيد محتوى المؤشر، ويرفع استثناءً (exception) إذا كان المؤشر فارغًا:

```ocaml
exception Segfault
let deref (ptr : 'a pointer) : 'a =
  match ptr with None -> raise Segfault | Some r -> !r
```

```text
exception Segfault
```

```text
val deref : 'a pointer -> 'a = <fun>
```

```ocaml
deref p
```

```text
- : int = 42
```

```ocaml
deref null
```

```text
Exception: Segfault.
Raised at deref in file "[17]", line 4, characters 25-39
Called from <unknown> in file "[19]", line 1, characters 0-10
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

بل يمكننا حتى استحداث عامل OCaml خاص بنا لإلغاء الإشارة. لكن علينا وضع `~` أمامه ليجري تحليله نحويًا كعامل سابق.

```ocaml
let ( ~* ) = deref;;
~*p
```

```text
val ( ~* ) : 'a pointer -> 'a = <fun>
```

```text
- : int = 42
```

في C، يُكتب الإسناد عبر مؤشر بالشكل `*p = x`. وذلك يغيّر الذاكرة التي يشير إليها `p` لتحتوي على `x`. ويمكننا كتابة ذلك العامل كما يلي:

```ocaml
let assign (ptr : 'a pointer) (x : 'a) : unit =
  match ptr with None -> raise Segfault | Some r -> r := x
```

```text
val assign : 'a pointer -> 'a -> unit = <fun>
```

```ocaml
assign p 2;
deref p
```

```text
- : int = 2
```

```ocaml
assign null 0
```

```text
Exception: Segfault.
Raised at assign in file "[21]", line 2, characters 25-39
Called from <unknown> in file "[23]", line 1, characters 0-13
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

ومرة أخرى، يمكننا استحداث عامل OCaml خاص بنا لذلك، وإن كان من الصعب اختيار رمز جيد يتضمن `*` و`=` لا يُفهم خطأً على أنه يتضمن ضربًا:

```ocaml
let ( =* ) = assign;;
p =* 3;;
~*p
```

```text
val ( =* ) : 'a pointer -> 'a -> unit = <fun>
```

```text
- : unit = ()
```

```text
- : int = 3
```

الشيء الوحيد الذي لا يمكننا فعله هو معاملة المؤشر كعدد صحيح. فـ C تسمح بذلك، بما في ذلك أخذ عنوان متغير، وهو ما يتيح *حساب المؤشرات (pointer arithmetic)*. ذلك رائع للكفاءة، لكنه فظيع أيضًا لأنه يؤدي إلى شتى أنواع أخطاء البرامج والثغرات الأمنية.

سر شرير

حسنًا، لم يكن ما قلناه للتو صحيحًا في الواقع، لكن هذه معرفة خطرة حقًا لا ينبغي لك حتى أن تقرأها. توجد دالة غير موثّقة `Obj.magic` يمكننا استخدامها للحصول على عنوان الذاكرة لمرجع:

```ocaml
let address (ptr : 'a pointer) : int =
  match ptr with None -> 0 | Some r -> Obj.magic r
let ( ~& ) = address
```

لكن عليك أن تعِد بألا تستخدم تلك الدالة بنفسك أبدًا، أبدًا، لأنها تتجاوز تمامًا أمان نظام أنواع OCaml. وإذا فعلت ذلك، فلا ضمانات على الإطلاق.

لا شيء من هذا الترميز للمؤشرات جزء من المكتبة القياسية لـ OCaml، لأنك لا تحتاج إليه. فيمكنك دائمًا استخدام المراجع والأنواع الاختيارية بنفسك حسب حاجتك. والكتابة كما فعلنا للتو ليست خاصة بأسلوب OCaml المألوف. وقد فعلنا ذلك لتوضيح العلاقة بين مراجع OCaml ومؤشرات C (أو مراجع Java على نحو مكافئ).

### 6.1.6. مثال: تعاود بلا rec[#](#example-recursion-without-rec)

إليك حيلة أنيقة ممكنة بالمراجع: يمكننا بناء دوال تعاودية (recursive) دون استخدام الكلمة المفتاحية `rec` إطلاقًا. لنفترض أننا نريد تعريف دالة تعاودية مثل `fact`، التي نكتبها عادةً كما يلي:

```ocaml
let rec fact_rec n = if n = 0 then 1 else n * fact_rec (n - 1)
```

```text
val fact_rec : int -> int = <fun>
```

نريد تعريف تلك الدالة دون استخدام `rec`. يمكننا البدء بتعريف مرجع إلى نسخة خاطئة بوضوح من الدالة:

```ocaml
let fact0 = ref (fun x -> x + 0)
```

```text
val fact0 : (int -> int) ref = {contents = <fun>}
```

الطريقة التي تكون بها `fact0` خاطئة غير ذات أهمية في الواقع. نحتاج فقط أن يكون نوعها صحيحًا. وكان يمكننا بالقدر نفسه استخدام `fun x -> x` بدلًا من `fun x -> x + 0`.

في هذه المرحلة، من الواضح أن `fact0` لا تحسب دالة العاملي. فمثلًا، ينبغي أن تكون \(5!\) مساوية 120، لكن هذا ليس ما تحسبه `fact0`:

```ocaml
!fact0 5
```

```text
- : int = 5
```

بعد ذلك نكتب `fact` كالمعتاد، لكن دون `rec`. وفي الموضع الذي نحتاج فيه إلى إجراء الاستدعاء التعاودي، نستدعي بدلًا من ذلك الدالة المخزنة داخل `fact0`:

```ocaml
let fact n = if n = 0 then 1 else n * !fact0 (n - 1)
```

```text
val fact : int -> int = <fun>
```

الآن `fact` تعطي بالفعل الجواب الصحيح من أجل `0`، لكن ليس من أجل `5`:

```ocaml
fact 0;;
fact 5;;
```

```text
- : int = 1
```

```text
- : int = 20
```

سبب عدم صحتها من أجل `5` أن الاستدعاء التعاودي ليس في الواقع إلى الدالة الصحيحة. فنحن نريد أن يذهب الاستدعاء التعاودي إلى `fact`، لا إلى `fact0`. **وهنا تكمن الحيلة:** نغيّر `fact0` ليشير إلى `fact`:

```ocaml
fact0 := fact
```

```text
- : unit = ()
```

الآن عندما تُجري `fact` استدعاءها التعاودي وتلغي الإشارة إلى `fact0`، تعود إليها هي نفسها! وهذا يجعل الحساب صحيحًا:

```ocaml
fact 5
```

```text
- : int = 120
```

وبشيء من التجريد، هذا ما فعلناه. بدأنا بدالة تعاودية:

```ocaml
let rec f x = ... f y ...
```

ثم أعدنا كتابتها كما يلي:

```ocaml
let f0 = ref (fun x -> x)
let f x = ... !f0 y ...
f0 := f
```

الآن ستحسب `f` النتيجة نفسها التي كانت تحسبها في النسخة التي عرّفناها بـ `rec`.

يُسمى ما يحدث هنا أحيانًا «ربط العقدة التعاودية»: فنحن نحدّث المرجع إلى `f0` ليشير إلى `f`، بحيث عندما تلغي `f` الإشارة إلى `f0`، تعود إليها هي نفسها. والدالة الأولية التي جعلنا `f0` يشير إليها (وهي هنا دالة الهوية) لا تهم حقًا؛ فهي مجرد عنصر نائب ريثما نربط العقدة.

### 6.1.7. متغيرات الأنواع الضعيفة[#](#weak-type-variables)

ربما جربت بالفعل استخدام دالة الهوية لتعريف `fact0`، كما ذكرنا أعلاه. إن كان الأمر كذلك، فقد صادفت هذا المخرج المحيّر:

```ocaml
let fact0 = ref (fun x -> x)
```

```text
val fact0 : ('_weak1 -> '_weak1) ref = {contents = <fun>}
```

ما هذا النوع الغريب لدالة الهوية، `'_weak1 -> '_weak1`؟ ولماذا ليس النوع المعتاد `'a -> 'a`؟

الجواب يتعلق بتفاعل دقيق بشكل خاص بين تعدد الأشكال (polymorphism) والقابلية للتغيير. وفي فصل لاحق عن المفسّرات، سنتعلم كيف يعمل استدلال الأنواع (type inference)، وعندها سنتمكن من شرح المشكلة بالتفصيل. وباختصار، فإن السماح بالنوع `'a -> 'a` لذلك المرجع سيؤدي إلى إمكانية وجود برامج تنهار في وقت التشغيل بسبب أخطاء نوعية.

وإلى أن يحين ذلك الحين، فكّر في الأمر على هذا النحو: صحيح أن *القيمة* المخزنة في خلية مرجع يُسمح لها بالتغير، لكن *نوع* تلك القيمة لا يُسمح له بذلك. ولو أعطت OCaml التعبير `ref (fun x -> x)` النوع `('a -> 'a) ref`، لأمكن لتلك الخلية أن تخزّن أولًا `fun x -> x + 1 : int -> int` ثم تخزّن لاحقًا `fun x -> s ^ "!" : string -> string`. وذلك هو نوع تغيّر النوع غير المسموح به.

لذا تستخدم OCaml *متغيرات الأنواع الضعيفة (weak type variables)* للدلالة على أنواع مجهولة لكنها ليست متعددة الأشكال. وتبدأ هذه المتغيرات دائمًا بـ `_weak`. وجوهر الأمر أن استدلال الأنواع عليها لم يكتمل بعد. وما إن تعطي OCaml معلومات كافية حتى يُكمل استدلال الأنواع ويستبدل متغير النوع الضعيف بالنوع الفعلي:

```ocaml
!fact0
```

```text
- : '_weak1 -> '_weak1 = <fun>
```

```ocaml
!fact0 1
```

```text
- : int = 1
```

```ocaml
!fact0
```

```text
- : int -> int = <fun>
```

بعد تطبيق `!fact0` على `1`، صارت OCaml تعرف أن الدالة مقصود بها أن يكون نوعها `int -> int`. لذا فهو النوع الوحيد الذي يمكن استخدامها به من ذلك الحين فصاعدًا. فلا يمكن، مثلًا، تطبيقها على سلسلة نصية.

```ocaml
!fact0 "camel"
```

```text
File "[36]", line 1, characters 7-14:
1 | !fact0 "camel"
           ^^^^^^^
Error: This constant has type string but an expression was expected of type
         int
```

إذا كنت ترغب في معرفة المزيد عن متغيرات الأنواع الضعيفة الآن، فألقِ نظرة على القسم 2 من [*Relaxing the value restriction*](https://caml.inria.fr/pub/papers/garrigue-value_restriction-fiwflp04.pdf) لجاك غاريغ، أو [هذا القسم](https://ocaml.org/manual/polymorphism.html) من دليل OCaml.

### 6.1.8. التساوي الفيزيائي[#](#physical-equality)

تمتلك OCaml عاملي تساوٍ: التساوي الفيزيائي (physical equality) والتساوي البنيوي (structural equality). ويشرح [توثيق](https://ocaml.org/api/Stdlib.html) `Stdlib.(==)` التساوي الفيزيائي:

> `e1 == e2` يختبر التساوي الفيزيائي لـ `e1` و`e2`. وفي الأنواع القابلة للتغيير مثل المراجع والمصفوفات ومتتاليات البايتات والسجلات ذات الحقول القابلة للتغيير والكائنات ذات متغيرات الحالة القابلة للتغيير، تكون `e1 == e2` مساوية `true` إذا وفقط إذا كان التعديل الفيزيائي لـ `e1` يؤثر أيضًا في `e2`. وفي الأنواع غير القابلة للتغيير، يعتمد سلوك `( == )` على التنفيذ؛ لكن من المضمون أن `e1 == e2` تستلزم `compare e1 e2 = 0`.

ويمكن أن يكون أحد التفسيرات أن `==` لا ينبغي استخدامه إلا عند مقارنة المراجع (وغيرها من أنواع البيانات القابلة للتغيير) لمعرفة ما إذا كانت تشير إلى الموقع نفسه في الذاكرة. وإلا فلا تستخدم `==`.

ويُشرح التساوي البنيوي أيضًا في توثيق `Stdlib.(=)`:

> `e1 = e2` يختبر التساوي البنيوي لـ `e1` و`e2`. وتكون البنى القابلة للتغيير (مثل المراجع والمصفوفات) متساوية إذا وفقط إذا كان محتواها الحالي متساويًا بنيويًا، حتى لو لم يكن الكائنان القابلان للتغيير الكائن الفيزيائي نفسه. ورفع التساوي بين القيم الدالية `Invalid_argument`. وقد لا ينتهي التساوي بين بنى بيانات دورية.

التساوي البنيوي هو عادةً ما تريد اختباره. أما بالنسبة إلى المراجع، فهو يتحقق مما إذا كان محتوى موقع الذاكرة متساويًا، بصرف النظر عن كونهما الموقع نفسه.

ونفي التساوي الفيزيائي هو `!=`، ونفي التساوي البنيوي هو `<>`. وقد يكون تذكّر ذلك صعبًا.

وفيما يلي بعض الأمثلة التي تتضمن التساوي والمراجع لتوضيح الفرق بين التساوي البنيوي (`=`) والتساوي الفيزيائي (`==`):

```ocaml
let r1 = ref 42
let r2 = ref 42
```

```text
val r1 : int ref = {contents = 42}
```

```text
val r2 : int ref = {contents = 42}
```

المرجع متساوٍ فيزيائيًا مع نفسه، لكن ليس مع مرجع آخر في موقع مختلف في الذاكرة:

```ocaml
r1 == r1
```

```text
- : bool = true
```

```ocaml
r1 == r2
```

```text
- : bool = false
```

```ocaml
r1 != r2
```

```text
- : bool = true
```

المرجعان الموجودان في موقعين مختلفين في الذاكرة لكنهما يخزنان قيمتين متساويتين بنيويًا يكونان هما نفساهما متساويين بنيويًا:

```ocaml
r1 = r1
```

```text
- : bool = true
```

```ocaml
r1 = r2
```

```text
- : bool = true
```

```ocaml
r1 <> r2
```

```text
- : bool = false
```

المرجعان اللذان يخزنان قيمتين غير متساويتين بنيويًا يكونان هما نفساهما غير متساويين بنيويًا:

```ocaml
ref 42 <> ref 43
```

```text
- : bool = true
```

### 6.1.9. مثال: القوائم المترابطة الأحادية[#](#example-singly-linked-lists)

القوائم المترابطة الأحادية المدمجة في OCaml وظيفية، لا أمرية. لكن يمكننا بالطبع كتابة قوائم مترابطة أحادية أمرية باستخدام المراجع. (وكان يمكننا أيضًا استخدام المؤشرات التي ابتكرناها أعلاه، لكن ذلك لا يزيد الشيفرة إلا تعقيدًا.)

نبدأ بتعريف نوع `'a node` لعقد قائمة تحتوي قيمًا من النوع `'a`. وحقل `next` في العقدة هو نفسه قائمة أخرى.

```ocaml
(** An ['a node] is a node of a mutable singly-linked list. It contains a value
    of type ['a] and a link to the [next] node. *)
type 'a node = { next : 'a mlist; value : 'a }
(** An ['a mlist] is a mutable singly-linked list with elements of type ['a].
    The [option] represents the possibility that the list is empty.
    RI: The list does not contain any cycles. *)
and 'a mlist = 'a node option ref
```

```text
type 'a node = { next : 'a mlist; value : 'a; }
and 'a mlist = 'a node option ref
```

لإنشاء قائمة فارغة، نُعيد ببساطة مرجعًا إلى `None`:

```ocaml
(** [empty ()] is an empty singly-linked list. *)
let empty () : 'a mlist = ref None
```

```text
val empty : unit -> 'a mlist = <fun>
```

لاحظ نوع `empty`: فبدلًا من أن يكون قيمة، أصبح الآن دالة. وهذا نمطي في الدوال التي تنشئ بنى بيانات قابلة للتغيير. وفي نهاية هذا القسم سنعود إلى سبب *وجوب* أن تكون `empty` دالة.

إدراج عنصر أول جديد يقتضي فقط إنشاء عقدة جديدة، وربطها بالقائمة الأصلية، وتغيير القائمة:

```ocaml
(** [insert_first lst v] mutates mlist [lst] by inserting value [v] as the
    first value in the list. *)
let insert_first (lst : 'a mlist) (v : 'a) : unit =
  lst := Some { next = ref !lst; value = v }
```

```text
val insert_first : 'a mlist -> 'a -> unit = <fun>
```

ومرة أخرى، لاحظ نوع `insert_first`. فبدلًا من إعادة `'a mlist`، تعيد `unit`. وهذا أيضًا نمطي في الدوال التي تعدّل بنى بيانات قابلة للتغيير.

في كل من `empty` و`insert_first`، يجعل استخدام `unit` الدالتين أشبه بنظيرتيهما في لغة أمرية. فمُنشئ القائمة الفارغة في Java، مثلًا، قد لا يأخذ أي وسائط (وهو ما يكافئ أخذ `unit`). وقد تُعيد عملية `insert_first` لقائمة مترابطة في Java القيمة `void`، وهو ما يكافئ إعادة `unit`.

وأخيرًا، إليك دالة تحويل من قوائمنا القابلة للتغيير الجديدة إلى قوائم OCaml المدمجة:

```ocaml
(** [to_list lst] is an OCaml list containing the same values as [lst]
    in the same order. Not tail recursive. *)
let rec to_list (lst : 'a mlist) : 'a list =
  match !lst with None -> [] | Some { next; value } -> value :: to_list next
```

```text
val to_list : 'a mlist -> 'a list = <fun>
```

الآن يمكننا رؤية القابلية للتغيير في العمل:

```ocaml
let lst0 = empty ();;
let lst1 = lst0;;
insert_first lst0 1;;
to_list lst1;;
```

```text
val lst0 : '_weak2 mlist = {contents = None}
```

```text
val lst1 : '_weak2 mlist = {contents = None}
```

```text
- : unit = ()
```

```text
- : int list = [1]
```

التغيير الذي يطرأ على `lst0` يغيّر `lst1`، لأنهما اسمان مستعاران لنفس المرجع.

**نوع `empty`.** بالعودة إلى `empty`، لماذا يجب أن تكون دالة؟ قد يبدو أنه كان يمكننا تعريفها على نحو أبسط كما يلي:

```ocaml
let empty = ref None
```

```text
val empty : '_weak3 option ref = {contents = None}
```

لكن الآن لا يُنشأ إلا *مرجع واحد* فحسب، ومن ثمّ لا توجد إلا قائمة واحدة في الوجود:

```ocaml
let lst2 = empty;;
let lst3 = empty;;
insert_first lst2 2;;
insert_first lst3 3;;
to_list lst2;;
to_list lst3;;
```

```text
val lst2 : '_weak3 option ref = {contents = None}
```

```text
val lst3 : '_weak3 option ref = {contents = None}
```

```text
- : unit = ()
```

```text
- : unit = ()
```

```text
- : int list = [3; 2]
```

```text
- : int list = [3; 2]
```

لاحظ كيف تؤثر التغييرات في كلتا القائمتين، لأنهما اسمان مستعاران للمرجع نفسه.

بجعل `empty` دالة على النحو الصحيح، نضمن إعادة مرجع جديد في كل مرة تُنشأ فيها قائمة فارغة.

```ocaml
let empty () = ref None
```

```text
val empty : unit -> 'a option ref = <fun>
```

لا يهم حقًا ما هي الوسيطة التي تأخذها تلك الدالة، لأنها لن تستخدمها أبدًا. ويمكننا من حيث المبدأ تعريفها بأي من هذه الصور:

```ocaml
let empty _ = ref None
let empty (b : bool) = ref None
let empty (n : int) = ref None
(* etc. *)
```

```text
val empty : 'a -> 'b option ref = <fun>
```

```text
val empty : bool -> 'a option ref = <fun>
```

```text
val empty : int -> 'a option ref = <fun>
```

لكن سبب تفضيلنا `unit` كنوع للوسيطة هو الإشارة إلى العميل بأن قيمة الوسيطة لن تُستخدم. فليس ثمة بعد كل شيء ما يمكن للدالة أن تفعله بشكل مثير بقيمة unit. وطريقة أخرى للتفكير في ذلك أن دالة نوع مدخلها `unit` أشبه بدالة أو طريقة في لغة أمرية لا تأخذ أي وسائط. فمثلًا، قد يكون لصنف قائمة مترابطة في Java مُنشئ لا يأخذ أي وسائط وينشئ قائمة فارغة:

```java
class LinkedList {
  /** Returns an empty list. */
  LinkedList() { ... }
}
```

**القيم القابلة للتغيير.** في `mlist`، عقد القائمة قابلة للتغيير، أما القيم فليست كذلك. ولو أردنا أن تكون القيم قابلة للتغيير أيضًا، أمكننا جعلها مراجع كذلك:

```ocaml
type 'a node = { next : 'a mlist; value : 'a ref }
and 'a mlist = 'a node option ref
let empty () : 'a mlist = ref None
let insert_first (lst : 'a mlist) (v : 'a) : unit =
  lst := Some { next = ref !lst; value = ref v }
let rec set (lst : 'a mlist) (n : int) (v : 'a) : unit =
  match (!lst, n) with
  | None, _ -> invalid_arg "out of bounds"
  | Some { value }, 0 -> value := v
  | Some { next }, _ -> set next (n - 1) v
let rec to_list (lst : 'a mlist) : 'a list =
  match !lst with None -> [] | Some { next; value } -> !value :: to_list next
```

```text
type 'a node = { next : 'a mlist; value : 'a ref; }
and 'a mlist = 'a node option ref
```

```text
val empty : unit -> 'a mlist = <fun>
```

```text
val insert_first : 'a mlist -> 'a -> unit = <fun>
```

```text
val set : 'a mlist -> int -> 'a -> unit = <fun>
```

```text
val to_list : 'a mlist -> 'a list = <fun>
```

الآن، بدلًا من الاضطرار إلى إنشاء عقد جديدة إذا أردنا تغيير قيمة، يمكننا تغيير القيمة في العقدة مباشرةً:

```ocaml
let lst = empty ();;
insert_first lst 42;;
insert_first lst 41;;
to_list lst;;
set lst 1 43;;
to_list lst;;
```

```text
val lst : '_weak4 mlist = {contents = None}
```

```text
- : unit = ()
```

```text
- : unit = ()
```

```text
- : int list = [41; 42]
```

```text
- : unit = ()
```

```text
- : int list = [41; 43]
```

## 6.2. الحقول القابلة للتغيير[#](#mutable-fields)

يمكن إعلان حقول السجل قابلة للتغيير، بمعنى أنه يمكن تحديث محتواها دون إنشاء سجل جديد. فمثلًا، إليك نوع سجل لنقاط ثنائية الأبعاد ملوّنة يكون حقل اللون `c` فيه قابلًا للتغيير:

```ocaml
type point = {x : int; y : int; mutable c : string}
```

```text
type point = { x : int; y : int; mutable c : string; }
```

لاحظ أن `mutable` خاصية بالحقل نفسه، لا بنوع الحقل. وبوجه خاص، نكتب `mutable field : type`، لا `field : mutable type`.

العامل المستخدم لتحديث حقل قابل للتغيير هو `<-`، المقصود به أن يبدو كسهم متجه إلى اليسار.

```ocaml
let p = {x = 0; y = 0; c = "red"}
```

```text
val p : point = {x = 0; y = 0; c = "red"}
```

```ocaml
p.c <- "white"
```

```text
- : unit = ()
```

```ocaml
p
```

```text
- : point = {x = 0; y = 0; c = "white"}
```

لا يمكن تحديث الحقول غير القابلة للتغيير بتلك الطريقة:

```ocaml
p.x <- 3;;
```

```text
File "[5]", line 1, characters 0-8:
1 | p.x <- 3;;
    ^^^^^^^^
Error: The record field x is not mutable
```

- **الصياغة:** `e1.f
- **الدلالات الديناميكية:** لتقييم `e1.f
- **الدلالات الساكنة:** `e1.f

### 6.2.1. المراجع حقول قابلة للتغيير[#](#refs-are-mutable-fields)

يتبين أن المراجع منفَّذة في الواقع كحقول قابلة للتغيير. وفي [`Stdlib`](https://ocaml.org/api/Stdlib.html) نجد الإعلان التالي:

```ocaml
type 'a ref = { mutable contents : 'a }
```

ولهذا السبب يبدو المرجع عند إخراجه من المستوى الأعلى كسجل: فهو *سجل* ذو حقل واحد قابل للتغيير اسمه `contents`!

```ocaml
let r = ref 42
```

```text
val r : int ref = {contents = 42}
```

أما الصياغة الأخرى التي رأيناها للمراجع فهي في الواقع مكافئة لدوال OCaml بسيطة:

```ocaml
let ref x = {contents = x}
```

```text
val ref : 'a -> 'a ref = <fun>
```

```ocaml
let ( ! ) r = r.contents
```

```text
val ( ! ) : 'a ref -> 'a = <fun>
```

```ocaml
let ( := ) r x = r.contents <- x
```

```text
val ( := ) : 'a ref -> 'a -> unit = <fun>
```

وسبب قولنا «مكافئة» أن تلك الدوال منفَّذة فعليًا لا في OCaml نفسها بل في نظام تشغيل OCaml وقت التنفيذ، وهو منفَّذ في معظمه بـ C. ومع ذلك، فسلوك الدوال هو نفسه سلوك مصدر OCaml المذكور أعلاه.

### 6.2.2. مثال: القوائم المترابطة الأحادية القابلة للتغيير[#](#example-mutable-singly-linked-lists)

باستخدام الحقول القابلة للتغيير، يمكننا تنفيذ القوائم المترابطة الأحادية بالطريقة نفسها تقريبًا التي فعلناها بالمراجع. وقد بُسِّط نوعا العقد والقوائم:

```ocaml
(** An ['a node] is a node of a mutable singly-linked list. It contains a value
    of type ['a] and optionally has a pointer to the next node. *)
type 'a node = {
  mutable next : 'a node option;
  value : 'a
}
(** An ['a mlist] is a mutable singly-linked list with elements of type ['a].
    RI: The list does not contain any cycles. *)
type 'a mlist = {
  mutable first : 'a node option;
}
```

```text
type 'a node = { mutable next : 'a node option; value : 'a; }
```

```text
type 'a mlist = { mutable first : 'a node option; }
```

ولا فرق جوهري في الخوارزميات المستخدمة لتنفيذ العمليات، لكن الشيفرة مبسّطة قليلًا لأننا لا نضطر إلى استخدام عمليات المراجع:

```ocaml
(** [insert_first lst n] mutates mlist [lst] by inserting value [v] as the
    first value in the list. *)
let insert_first (lst : 'a mlist) (v : 'a) =
  lst.first <- Some {value = v; next = lst.first}
(** [empty ()] is an empty singly-linked list. *)
let empty () : 'a mlist = {
  first = None
}
(** [to_list lst] is an OCaml list containing the same values as [lst]
    in the same order. Not tail recursive. *)
let to_list (lst : 'a mlist) : 'a list =
  let rec helper = function
    | None -> []
    | Some {next; value} -> value :: helper next
  in
  helper lst.first
```

```text
val insert_first : 'a mlist -> 'a -> unit = <fun>
```

```text
val empty : unit -> 'a mlist = <fun>
```

```text
val to_list : 'a mlist -> 'a list = <fun>
```

### 6.2.3. مثال: المكدسات القابلة للتغيير[#](#example-mutable-stacks)

نعلم بالفعل أن القوائم والمكدسات يمكن تنفيذها بطرق متشابهة إلى حد كبير. لنستخدم ما تعلمناه من القوائم المترابطة القابلة للتغيير لتنفيذ مكدسات قابلة للتغيير. وإليك واجهة:

```ocaml
module type MutableStack = sig
  (** ['a t] is the type of mutable stacks whose elements have type ['a].
      The stack is mutable not in the sense that its elements can
      be changed, but in the sense that it is not persistent:
      the operations [push] and [pop] destructively modify the stack. *)
  type 'a t
  (** Raised if [peek] or [pop] encounter the empty stack. *)
  exception Empty
  (** [empty ()] is the empty stack. *)
  val empty : unit -> 'a t
  (** [push x s] modifies [s] to make [x] its top element.
      The rest of the elements are unchanged. *)
  val push : 'a -> 'a t -> unit
  (** [peek s] is the top element of [s].
      Raises: [Empty] if [s] is empty. *)
  val peek : 'a t -> 'a
  (** [pop s] removes the top element of [s].
      Raises: [Empty] if [s] is empty. *)
  val pop : 'a t -> unit
end
```

```text
module type MutableStack =
  sig
    type 'a t
    exception Empty
    val empty : unit -> 'a t
    val push : 'a -> 'a t -> unit
    val peek : 'a t -> 'a
    val pop : 'a t -> unit
  end
```

الآن لننفّذ المكدس القابل للتغيير باستخدام قائمة مترابطة قابلة للتغيير.

```ocaml
module MutableRecordStack : MutableStack = struct
  (** An ['a node] is a node of a mutable linked list.  It has
     a field [value] that contains the node's value, and
     a mutable field [next] that is [None] if the node has
     no successor, or [Some n] if the successor is [n]. *)
  type 'a node = {value : 'a; mutable next : 'a node option}
 (** AF: An ['a t] is a stack represented by a mutable linked list.
     The mutable field [top] is the first node of the list,
     which is the top of the stack. The empty stack is represented
     by {top = None}.  The node {top = Some n} represents the
     stack whose top is [n], and whose remaining elements are
     the successors of [n]. *)
  type 'a t = {mutable top : 'a node option}
  exception Empty
  let empty () = {top = None}
  let push x s = s.top <- Some {value = x; next = s.top}
  let peek s =
    match s.top with
    | None -> raise Empty
    | Some {value} -> value
  let pop s =
    match s.top with
    | None -> raise Empty
    | Some {next} -> s.top <- next
end
```

```text
module MutableRecordStack : MutableStack
```

## 6.3. المصفوفات والحلقات[#](#arrays-and-loops)

المصفوفات متتاليات قابلة للتغيير ذات طول ثابت، مع وصول وتحديث في زمن ثابت. لذا فهي تشبه من جوانب شتى المراجع والقوائم والمجموعات المرتّبة. فهي مثل المراجع قابلة للتغيير. ومثل القوائم متتاليات (منتهية). ومثل المجموعات المرتّبة، طولها ثابت مسبقًا ولا يمكن تغييره.

صياغة المصفوفات شبيهة بصياغة القوائم:

```ocaml
let v = [|0.; 1.|]
```

```text
val v : float array = [|0.; 1.|]
```

تنشئ تلك الشيفرة مصفوفة طولها ثابت عند 2 ومحتواها مهيأ ابتدائيًا إلى `0.` و`1.`. والكلمة المفتاحية `array` مُنشئ أنواع، شأنها شأن `list`.

ويمكن لاحقًا تغيير ذلك المحتوى باستخدام العامل `<-`:

```ocaml
v.(0) <- 5.
```

```text
- : unit = ()
```

```ocaml
v
```

```text
- : float array = [|5.; 1.|]
```

وكما ترى في ذلك المثال، تستخدم الفهرسة داخل مصفوفة الصياغة `array.(index)`، حيث القوسان إلزاميان.

تحتوي [وحدة `Array`](https://ocaml.org/api/Array.html) على دوال كثيرة مفيدة للمصفوفات.

**الصياغة.**

- إنشاء مصفوفة: `[|e0; e1; ...; en|]`
- فهرسة مصفوفة: `e1.(e2)`
- إسناد مصفوفة: `e1.(e2)

**الدلالات الديناميكية.**

- لتقييم `[|e0; e1; ...; en|]`، قيّم كل `ei` إلى قيمة `vi`، وأنشئ مصفوفة جديدة طولها `n+1`، وخزّن كل قيمة في المصفوفة عند فهرسها.
- لتقييم `e1.(e2)`، قيّم `e1` إلى قيمة مصفوفة `v1`، و`e2` إلى عدد صحيح `v2`. إذا لم يكن `v2` ضمن حدود المصفوفة (أي من `0` إلى `n-1`، حيث `n` طول المصفوفة)، فارفع `Invalid_argument`. وإلا فافهرس في `v1` للحصول على القيمة `v` عند الفهرس `v2`، وأعِد `v`.
- لتقييم `e1.(e2)

**الدلالات الساكنة.**

- `[|e0; e1; ...; en|] : t array` إذا كان `ei : t` لجميع `ei`.
- `e1.(e2) : t` إذا كان `e1 : t array` و`e2 : int`.
- `e1.(e2)

**الحلقات.**

تمتلك OCaml حلقات while وحلقات for. وصياغتها كما يلي:

```ocaml
while e1 do e2 done
for x=e1 to e2 do e3 done
for x=e1 downto e2 do e3 done
```

يقيّم كل من هذه التعبيرات الثلاثة التعبير الواقع بين `do` و`done` في كل دورة من دورات الحلقة؛ فحلقات `while` تنتهي عندما يصير `e1` غير صحيح؛ وحلقات `for` تُنفَّذ مرة واحدة لكل عدد صحيح من `e1` إلى `e2`؛ وحلقات `for..to` تبدأ التقييم عند `e1` وتزيد `x` في كل دورة؛ وحلقات `for..downto` تبدأ التقييم عند `e1` وتنقص `x` في كل دورة. وتُقيَّم التعبيرات الثلاثة كلها إلى `()` بعد انتهاء الحلقة. ولأنها تُقيَّم دائمًا إلى `()`، فهي أقل عمومية من الطي (fold) والربط (map) والدوال التعاودية.

الحلقات نفسها ليست قابلة للتغيير بطبيعتها، لكنها تُستخدم في أغلب الأحيان مقترنة بميزات قابلة للتغيير مثل المصفوفات—فعادةً ما يُحدث جسم الحلقة تأثيرات جانبية. ويمكننا أيضًا استخدام دوال مثل `Array.iter` و`Array.map` و`Array.fold_left` بدلًا من الحلقات.

## 6.4. الخلاصة[#](#summary)

تزيد أنواع البيانات القابلة للتغيير صعوبة الاستدلال على البرامج. فمثلًا، قبل المراجع، لم نكن مضطرين للقلق بشأن الاستعارة المرجعية في OCaml. لكن للقابلية للتغيير استخداماتها. فالإدخال/الإخراج يقوم أساسًا على التغيير. وبعض بنى البيانات (مثل المصفوفات وجداول التجزئة) لا يمكن تنفيذها بالقدر نفسه من الكفاءة دون قابلية للتغيير.

وهكذا تمنح القابلية للتغيير قوة عظيمة، ولكن مع القوة العظيمة تأتي مسؤولية عظيمة. فاحرص على ألا تسيء استخدام قوتك المستجدة!

### 6.4.1. المصطلحات والمفاهيم[#](#terms-and-concepts)

- عنوان (address)
- اسم مستعار (alias)
- مصفوفة (array)
- إسناد (assignment)
- إلغاء الإشارة (dereference)
- حتمي (deterministic)
- غير قابل للتغيير (immutable)
- فهرس (index)
- حلقة (loop)
- أمان الذاكرة (memory safety)
- قابل للتغيير (mutable)
- حقل قابل للتغيير (mutable field)
- غير حتمي (nondeterministic)
- تساوٍ فيزيائي (physical equality)
- مؤشر (pointer)
- نقي (pure)
- مرجع (ref)
- خلية مرجع (ref cell)
- مرجع (reference)
- تتابع (sequencing)
- تساوٍ بنيوي (structural equality)

### 6.4.2. قراءات إضافية[#](#further-reading)

- *Introduction to Objective Caml*، الفصلان 7 و8.
- *OCaml from the Very Beginning*، الفصل 13.
- *Real World OCaml*، الفصل 8.

## 6.5. التمارين[#](#exercises)

حلول معظم التمارين [متاحة](https://github.com/cs3110/textbook-solutions). ويسعدنا إضافة الحلول أو تصحيحها. فيرجى المساهمة عبر GitHub.

**تمرين: حقول قابلة للتغيير [★]**

عرّف نوع سجل في OCaml لتمثيل أسماء الطلاب ومعدلاتهم التراكمية. وينبغي أن يكون من الممكن تغيير قيمة المعدل التراكمي للطالب. اكتب تعبيرًا يعرّف طالبًا اسمه `"Alice"` ومعدله التراكمي `3.7`. ثم اكتب تعبيرًا يغيّر معدل Alice التراكمي إلى `4.0`.

**تمرين: المراجع [★]**

أعطِ تعبيرات OCaml تكون أنواعها كما يلي. واستخدم utop للتحقق من أجوبتك.

- `bool ref`
- `int list ref`
- `int ref list`

**تمرين: دالة inc [★]**

عرّف مرجعًا إلى دالة كما يلي:

```ocaml
let inc = ref (fun x -> x + 1)
```

اكتب شيفرة تستخدم `inc` لإنتاج القيمة `3110`.

**تمرين: إسناد الجمع [★★]**

تمتلك لغة C ولغات كثيرة مشتقة منها، مثل Java، عامل *إسناد الجمع (addition assignment)* يُكتب `a += b` ويعني `a = a + b`. نفّذ عاملًا كهذا في OCaml؛ وينبغي أن يكون نوعه `int ref -> int -> unit`. وإليك بعض الشيفرة للبدء:

```ocaml
let ( +:= ) x y = ...
```

وإليك مثالًا على الاستخدام:

```ocaml
# let x = ref 0;;
# x +:= 3110;;
# !x;;
- : int = 3110
```

**تمرين: التساوي الفيزيائي [★★]**

عرّف `x` و`y` و`z` كما يلي:

```ocaml
let x = ref 0
let y = x
let z = ref 0
```

توقّع قيمة سلسلة التعبيرات التالية:

```ocaml
# x == y;;
# x == z;;
# x = y;;
# x = z;;
# x := 1;;
# x = y;;
# x = z;;
```

وتحقق من أجوبتك في utop.

**تمرين: norm [★★]**

[المعيار الإقليدي (Euclidean norm)](https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm) لمتجه \(x = (x_1, \ldots, x_n)\) ذي الأبعاد \(n\) يُكتب \(|x|\) ويُعرَّف بأنه

\[\sqrt{x_1^2 + \cdots + x_n^2}.\]

اكتب دالة `norm : vector -> float` تحسب المعيار الإقليدي لمتجه، حيث يُعرَّف `vector` كما يلي:

```text
(* AF: the float array [| x1; ...; xn |] represents the
 *     vector (x1, ..., xn)
 * RI: the array is non-empty *)
type vector = float array
```

ينبغي ألا تغيّر دالتك مصفوفة المدخلات. *تلميح: رغم أن حدسك الأول قد يدفعك إلى استخدام حلقة، فجرّب بدلًا من ذلك استخدام `Array.map` و`Array.fold_left` أو `Array.fold_right`.*

**تمرين: normalize [★★]**

يمكن *تطبيع* كل متجه \(x\) بقسمة كل مكوّن على \(|x|\)؛ فينتج عن ذلك متجه معياره 1:

\[ \left(\frac{x_1}{|x|}, \ldots, \frac{x_n}{|x|}\right) . \]

اكتب دالة `normalize : vector -> unit` تطبّع متجهًا «في مكانه» بتغيير مصفوفة المدخلات. وإليك استخدامًا نموذجيًا:

```ocaml
# let a = [|1.; 1.|];;
val a : float array = [|1.; 1.|]
# normalize a;;
- : unit = ()
# a;;
- : float array = [|0.7071...; 0.7071...|]
```

*تلميح: `Array.iteri`.*

**تمرين: norm بحلقة [★★]**

عدّل تنفيذك لـ `norm` ليستخدم حلقة. وإليك شيفرة زائفة لما ينبغي عليك فعله:

```text
initialize norm to 0.0
loop through array
  add to norm the square of the current array component
return sqrt of norm
```

**تمرين: normalize بحلقة [★★]**

عدّل تنفيذك لـ `normalize` ليستخدم حلقة.

**تمرين: init matrix [★★★]**

تحتوي وحدة `Array` على دالتين لإنشاء مصفوفة: `make` و`init`. فـ `make` تنشئ مصفوفة وتملؤها بقيمة افتراضية، بينما تنشئ `init` مصفوفة وتستخدم دالة مقدَّمة لملئها. وتحتوي المكتبة أيضًا على دالة `make_matrix` لإنشاء مصفوفة ثنائية الأبعاد، لكنها لا تحتوي على `init_matrix` المناظرة لإنشاء مصفوفة باستخدام دالة للتهيئة.

اكتب دالة `init_matrix : int -> int -> (int -> int -> 'a) -> 'a array array` بحيث تنشئ `init_matrix n o f` مصفوفة `m` من `n` في `o` وتعيدها، مع `m.(i).(j) = f i j` لجميع `i` و`j` ضمن الحدود.

راجع توثيق [`make_matrix`](https://v2.ocaml.org/api/Array.html#VALmake_matrix) لمزيد من المعلومات عن تمثيل المصفوفات كمصفوفات.
