---
title: "مولّد التوثيق (ocamldoc)"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 19: مولّد التوثيق (ocamldoc)

يصف هذا الفصل OCamldoc، وهو أداة تولّد التوثيق من تعليقات خاصة تُدرَج في ملفات المصدر. التعليقات التي يستعملها OCamldoc من الشكل `(**`…`*)` وتتبع الصيغة الموصوفة في القسم 19.2.

يستطيع OCamldoc إنتاج التوثيق بصيغ متعدّدة: HTML، وLATEX، وTeXinfo، وصفحات `man` في Unix، ومخطّطات التبعيات بصيغة `dot`. ويمكن للمستخدمين، فوق ذلك، إضافة مولّدات مخصّصة خاصة بهم، كما يوضّح القسم 19.3.

نستعمل في هذا الفصل كلمة *عنصر* للإشارة إلى أيٍّ من الأجزاء التالية في ملف مصدر OCaml: تعريف نوع، أو قيمة، أو وحدة، أو استثناء، أو نوع وحدة، أو باني نوع، أو حقل سجل، أو صنف، أو نوع صنف، أو دالة صنف، أو قيمة صنف، أو شرط وراثة صنف.

## 19.1 الاستعمال

### 19.1.1 الاستدعاء

يُستدعى OCamldoc بالأمر `ocamldoc` على النحو التالي:

```text
        ocamldoc options sourcefiles
```

#### خيارات اختيار صيغة الخَرْج

تحدّد الخيارات التالية صيغة التوثيق المولَّد.

**`-html`**

توليد التوثيق بصيغة HTML الافتراضية. تُخزَّن صفحات HTML المولَّدة في المجلد الحالي، أو في المجلد المحدَّد بالخيار **`-d`**. ويمكنك تخصيص نمط الصفحات المولَّدة بتحرير ملف `style.css` المولَّد، أو بتقديم ورقة أنماط خاصة بك بالخيار `-css-style`. ولا يُولَّد الملف `style.css` إن كان موجودًا مسبقًا أو إن استُعمل `-css-style`.

**`-latex`**

توليد التوثيق بصيغة LATEX الافتراضية. تُحفظ وثيقة LATEX المولَّدة في الملف `ocamldoc.out`، أو في الملف المحدَّد بالخيار **`-o`**. وتستعمل الوثيقة ملف الأنماط `ocamldoc.sty`؛ ويُولَّد هذا الملف عند استعمال الخيار `-latex` إن لم يكن موجودًا مسبقًا. ويمكنك تعديل هذا الملف لتخصيص نمط توثيق LATEX.

**`-texi`**

توليد التوثيق بصيغة TeXinfo الافتراضية. تُحفظ الوثيقة المولَّدة في الملف `ocamldoc.out`، أو في الملف المحدَّد بالخيار **`-o`**.

**`-man`**

توليد التوثيق في هيئة مجموعة من صفحات `man` في Unix. تُخزَّن الصفحات المولَّدة في المجلد الحالي، أو في المجلد المحدَّد بالخيار **`-d`**.

**`-dot`**

توليد مخطّط تبعيات للوحدات العليا، بصيغة مناسبة للعرض والمعالجة بأداة `dot`. وأداة `dot` متاحة من [`https://graphviz.org/`](https://graphviz.org/). ويُكتب التمثيل النصي للمخطّط في الملف `ocamldoc.out`، أو في الملف المحدَّد بالخيار **`-o`**. استعمل `dot ocamldoc.out` لعرضه.

**`-g` *file.cm[o,a,xs]***

تحميل الملف المعطى ديناميًا، وهو ملف يعرّف مولّد توثيق مخصّصًا. انظر القسم 19.4.1. يدعم هذا الخيار الأمر `ocamldoc` (لتحميل ملفات `.cmo` و`.cma`) ونسخته بالشيفرة الأصلية `ocamldoc.opt` (لتحميل ملفات `.cmxs`). وإن كان الملف المعطى بسيطًا وغير موجود في المجلد الحالي، بحث عنه ocamldoc في المجلد الافتراضي للمولّدات المخصّصة، وفي المجلدات المحدَّدة بخيارات `-i` الاختيارية.

**`-customdir`**

عرض المجلد الافتراضي للمولّدات المخصّصة.

**`-i` *directory***

إضافة المجلد المعطى إلى المسار الذي يُبحث فيه عن المولّدات المخصّصة.

#### خيارات عامة

**`-d` *dir***

توليد الملفات في المجلد *dir* بدلًا من المجلد الحالي.

**`-dump` *file***

إلقاء المعلومات المجمَّعة في الملف *file*. ويمكن قراءة هذه المعلومات بالخيار `-load` في استدعاء لاحق لـ ocamldoc.

**`-hide` *modules***

إخفاء أسماء الوحدات الكاملة المعطاة في التوثيق المولَّد. و*modules* قائمة أسماء وحدات كاملة تفصل بينها فواصل `,` بلا فراغات، مثلًا: `Stdlib,M2.M3`.

**`-inv-merge-ml-mli`**

عكس أسبقية ملفات التنفيذ على ملفات الواجهة عند الدمج. تُحتفظ بجميع العناصر في ملفات التنفيذ، ويشير الخيار **`-m`** إلى أجزاء التعليقات في ملفات الواجهة التي تُدمج مع التعليقات في ملفات التنفيذ.

**`-keep-code`**

الاحتفاظ دائمًا بالشيفرة المصدرية للقيم والدوال ومتغيّرات النسخة، متى توفّرت.

**`-load` *file***

تحميل المعلومات من الملف *file*، الذي أنتجه `ocamldoc -dump`. ويمكن إعطاء عدّة خيارات `-load`.

**`-m` *flags***

تحديد خيارات الدمج بين الواجهات والتنفيذات (انظر القسم 19.1.2 للتفاصيل). ويمكن أن تكون *flags* محرفًا واحدًا أو أكثر من المحارف التالية:

- **`d`**: دمج الوصف؛
- **`a`**: دمج `@author`؛
- **`v`**: دمج `@version`؛
- **`l`**: دمج `@see`؛
- **`s`**: دمج `@since`؛
- **`b`**: دمج `@before`؛
- **`o`**: دمج `@deprecated`؛
- **`p`**: دمج `@param`؛
- **`e`**: دمج `@raise`؛
- **`r`**: دمج `@return`؛
- **`A`**: دمج كل شيء.

**`-no-custom-tags`**

عدم السماح بوسوم `@` المخصّصة (انظر القسم 19.2.5).

**`-no-stop`**

الاحتفاظ بالعناصر الموضوعة بعد التعليق الخاص `(**/**)` أو بين تعليقين منه (انظر القسم 19.2).

**`-o` *file***

إخراج التوثيق المولَّد إلى الملف *file* بدلًا من `ocamldoc.out`. وهذا الخيار ذو معنى مقترنًا بالخيارات **`-latex`** أو **`-texi`** أو **`-dot`** فقط.

**`-pp` *command***

تمرير المصادر عبر المعالج المسبق *command*.

**`-impl` *filename***

معالجة الملف *filename* كملف تنفيذ، حتى إن لم يكن امتداده `.ml`.

**`-intf` *filename***

معالجة الملف *filename* كملف واجهة، حتى إن لم يكن امتداده `.mli`.

**`-text` *filename***

معالجة الملف *filename* كملف نصّي، حتى إن لم يكن امتداده `.txt`.

**`-sort`**

ترتيب قائمة الوحدات العليا قبل توليد التوثيق.

**`-stars`**

إزالة المحارف الفارغة حتى أول نجمة (`*`) في كل سطر من التعليقات.

**`-t` *title***

استعمال *title* عنوانًا للتوثيق المولَّد.

**`-intro` *file***

استعمال محتوى الملف *file* نصًّا لـ ocamldoc يُستعمل مقدّمة (في HTML وLATEX وTeXinfo فقط). وفي HTML يُستعمل الملف لإنشاء الملف `index.html` بكامله.

**`-v`**

النمط المطوَّل. عرض معلومات التقدّم.

**`-version`**

طباعة سلسلة الإصدار والخروج.

**`-vnum`**

طباعة رقم الإصدار القصير والخروج.

**`-warn-error`**

معاملة تحذيرات OCamldoc كأخطاء.

**`-hide-warnings`**

عدم طباعة تحذيرات OCamldoc.

**`-help` أو `--help`**

عرض ملخّص استعمال قصير والخروج.

#### خيارات فحص الأنواع

يستدعي OCamldoc مدقّق أنواع OCaml ليحصل على معلومات الأنواع. وتؤثّر الخيارات التالية في مرحلة فحص الأنواع، ولها المعنى نفسه في الأمرين `ocamlc` و`ocamlopt`.

**`-I` *directory***

إضافة *directory* إلى قائمة المجلدات التي يُبحث فيها عن ملفات الواجهة المترجمة (ملفات `.cmi`).

**`-H` *directory***

مثل `-I`، لكن المجلدات المعطاة بـ `-H` يُبحث فيها أخيرًا، وقد لا يشير البرنامج مباشرةً إلى الوحدات المضافة إلى مسار البحث بهذه الطريقة.

**`-nolabels`**

تجاهل الوسوم غير الاختيارية في الأنواع.

**`-rectypes`**

السماح بالأنواع العودية العشوائية (انظر الخيار `-rectypes` في `ocamlc`).

#### خيارات توليد صفحات HTML

تنطبق الخيارات التالية مقترنةً بالخيار `-html`:

**`-all-params`**

عرض القائمة الكاملة لمعاملات الدوال والدوال الأعضاء.

**`-charset` *charset***

إضافة معلومات عن ترميز المحارف بوصفه *charset* (الافتراضي هو iso-8859-1).

**`-colorize-code`**

تلوين شيفرة OCaml الموضوعة بين `[ ]` و`{[ ]}` بألوان تُبرز الكلمات المحجوزة وغيرها. وإن لم تكن شيفرة الشظايا صحيحة نحويًا لم يُضَف أي لون.

**`-css-style` *filename***

استعمال *filename* ملفًّا لورقة الأنماط المتتالية.

**`-index-only`**

توليد ملفات الفهارس فقط.

**`-short-functors`**

استعمال صيغة قصيرة لعرض الموصِّلات: تُعرض الوحدة `module M : functor (A:Module) -> functor (B:Module2) -> sig .. end` على النحو `module M (A:Module) (B:Module2) : sig .. end`.

#### خيارات توليد ملفات LATEX

تنطبق الخيارات التالية مقترنةً بالخيار `-latex`:

**`-latex-value-prefix` *prefix***

إعطاء بادئة تُستعمل لوسوم القيم في وثيقة LATEX المولَّدة. البادئة الافتراضية سلسلة فارغة. ويمكنك أيضًا استعمال الخيارات `-latex-type-prefix` و`-latex-exception-prefix` و`-latex-module-prefix` و`-latex-module-type-prefix` و`-latex-class-prefix` و`-latex-class-type-prefix` و`-latex-attribute-prefix` و`-latex-method-prefix`. وهذه الخيارات مفيدة حين يكون لديك مثلًا نوع وقيمة بالاسم نفسه؛ فإن لم تحدّد بادئات، شكا LATEX من وسوم معرَّفة أكثر من مرة.

**`-latextitle` *n,style***

ربط رقم النمط *n* بأمر تقسيم الأقسام في LATEX *style*، مثل `section` أو `subsection` (في LATEX فقط). وهذا مفيد عند إدراج الوثيقة المولَّدة في وثيقة LATEX أخرى عند مستوى تقسيم معيّن. والربط الافتراضي هو 1 لـ `section`، و2 لـ `subsection`، و3 لـ `subsubsection`، و4 لـ `paragraph`، و5 لـ `subparagraph`.

**`-noheader`**

حذف الترويسة من التوثيق المولَّد.

**`-notoc`**

عدم توليد جدول محتويات.

**`-notrailer`**

حذف الذيل من التوثيق المولَّد.

**`-sepfiles`**

توليد ملف `.tex` واحد لكل وحدة عليا، بدلًا من الملف العام `ocamldoc.out`.

#### خيارات توليد ملفات TeXinfo

تنطبق الخيارات التالية مقترنةً بالخيار `-texi`:

**`-esc8`**

هروب المحارف المنقَّطة في ملفات Info.

**`-info-entry`**

تحديد مدخل دليل Info.

**`-info-section`**

تحديد قسم دليل Info.

**`-noheader`**

حذف الترويسة من التوثيق المولَّد.

**`-noindex`**

عدم بناء فهرس لملفات Info.

**`-notrailer`**

حذف الذيل من التوثيق المولَّد.

#### خيارات توليد مخطّطات dot

تنطبق الخيارات التالية مقترنةً بالخيار `-dot`:

**`-dot-colors` *colors***

تحديد الألوان المستعملة في شيفرة `dot` المولَّدة. فعند توليد تبعيات الوحدات يستعمل `ocamldoc` ألوانًا مختلفة للوحدات بحسب المجلدات التي تقيم فيها، وعند توليد تبعيات الأنواع يستعمل ألوانًا مختلفة للأنواع بحسب الوحدات التي تُعرَّف فيها. و*colors* قائمة أسماء ألوان تفصل بينها فواصل `,`، كما في `Red,Blue,Green`. والألوان المتاحة هي التي تدعمها أداة `dot`.

**`-dot-include-all`**

إدراج جميع الوحدات في خَرْج `dot`، لا الوحدات المعطاة في سطر الأوامر أو المحمَّلة بالخيار **`-load`** فقط.

**`-dot-reduce`**

إجراء اختزال متعدٍّ لمخطّط التبعيات قبل إخراج شيفرة `dot`. وهذا مفيد حين تكثر التبعيات المتعدية فتُشوّش المخطّط.

**`-dot-types`**

إخراج شيفرة `dot` التي تصف مخطّط تبعيات الأنواع بدلًا من مخطّط تبعيات الوحدات.

#### خيارات توليد ملفات man

تنطبق الخيارات التالية مقترنةً بالخيار `-man`:

**`-man-mini`**

توليد صفحات man للوحدات وأنواع الوحدات والأصناف وأنواع الأصناف فقط، بدلًا من صفحات لكل العناصر.

**`-man-suffix` *suffix***

ضبط اللاحقة المستعملة لأسماء ملفات man المولَّدة. الافتراضي `3o`، كما في `List.3o`.

**`-man-section` *section***

ضبط رقم القسم المستعمل لأسماء ملفات man المولَّدة. الافتراضي `3`.

### 19.1.2 دمج معلومات الوحدة

يمكن استخراج المعلومات عن وحدة من الملف `.mli` أو من الملف `.ml` أو منهما معًا، بحسب الملفات المعطاة في سطر الأوامر. وعند إعطاء الملفين `.mli` و`.ml` للوحدة نفسها، تُدمج المعلومات المستخرجة منهما وفق القواعد التالية:

- لا تُحتفظ إلا بالعناصر (القيم والأنواع والأصناف وغيرها) المصرَّح بها في الملف `.mli`. بعبارة أخرى، لا تُوثَّق التعريفات في الملف `.ml` التي لم تُصدَّر في الملف `.mli`.

- تُعالج أوصاف العناصر والأوصاف في وسوم `@` على النحو التالي: إن وُجد وصف للعنصر نفسه أو للوسم نفسه من العنصر نفسه في الملفين، وُصل وصف الملف `.ml` بوصف الملف `.mli` إن أُعطي علم `-m` الموافق في سطر الأوامر. وإن وُجد وصف في الملف `.ml` ولم يوجد في الملف `.mli`، حُفظ وصف `.ml`. وفي الحالتين تُحفظ كل المعلومات المعطاة في الملف `.mli`.

### 19.1.3 قواعد كتابة الشيفرة

يجب احترام القواعد التالية لتجنّب تعارضات الأسماء التي تؤدي إلى أخطاء في الإحالات المرجعية:

- لا يجوز أن توجد في الوحدة وحدتان، أو نوعا وحدتين، أو وحدة ونوع وحدة، بالاسم نفسه. وفي المولّد الافتراضي لـ HTML تُطبع الوحدتان `ab` و`AB` في الملف نفسه على أنظمة الملفات غير الحسّاسة لحالة الأحرف.

- لا يجوز أن يوجد في الوحدة صنفان، أو نوعا صنفين، أو صنف ونوع صنف، بالاسم نفسه.

- لا يجوز أن توجد في الوحدة قيمتان، أو نوعان، أو استثناءان، بالاسم نفسه.

- لا يحتفظ OCamldoc بالقيم المعرَّفة داخل صفّ، كما في `let (x,y,z) = (1,2,3)`.

- تجنّب التركيب التالي؛ ففي هذه الحالة يربط OCamldoc `Bar.x` بالمتغيّر `x` في الوحدة `Foo` المعرَّفة أعلاه مباشرةً، لا بـ `Bar.x` المعرَّف في الوحدة `Foo` المفتوحة.

```ocaml
open Foo (* which has a module Bar with a value x *)
module Foo =
  struct
    module Bar =
      struct
        let x = 1
      end
  end
  let dummy = Bar.x
```

## 19.2 صيغة تعليقات التوثيق

تُسمّى التعليقات التي تحمل مادّة توثيقية *تعليقات خاصة*، وتُكتب بين `(**` و`*)`. ويجب أن تبدأ التعليقات الخاصة بـ `(**` بالضبط؛ أما التعليقات التي تبدأ بـ `(` ثم بأكثر من نجمتين فتُهمَل.

### 19.2.1 موضع تعليقات التوثيق

يستطيع OCamldoc ربط التعليقات ببعض عناصر اللغة التي يلقاها في ملفات المصدر، ويُجرى الربط وفق مواضع التعليقات إزاء عناصر اللغة. ومواضع التعليقات في ملفات `.mli` تختلف عن مواضعها في ملفات `.ml`.

#### التعليقات في ملفات .mli

يُربط التعليق الخاص بعنصر إن وُضع قبله أو بعده. ويُربط التعليق الخاص السابق للعنصر بهذا العنصر إذا:

- لم يوجد سطر فارغ أو تعليق خاص آخر بين التعليق الخاص والعنصر، ويجوز أن يقع تعليق عادي بين التعليق الخاص والعنصر؛

- لم يكن التعليق الخاص مربوطًا سابقًا بالعنصر السابق؛

- لم يكن التعليق الخاص أول تعليق في وحدة عليا.

أما التعليق الخاص التالي للعنصر فيُربط به إن لم يوجد سطر فارغ أو تعليق بين التعليق الخاص والعنصر.

وثمّة استثناءان: في حالة البواني وحقول السجلات داخل تعريفات الأنواع لا يمكن وضع التعليق المرتبط إلا بعد تعريف الباني أو الحقل، بلا أسطر فارغة أو تعليقات أخرى بينهما. والتعليق الخاص بباني يتبعه باني آخر يجب أن يوضع قبل المحرف `|` الذي يفصل بين البانيين.

يوضّح ملف الواجهة النموذجي التالي `foo.mli` قواعد وضع التعليقات في ملفات `.mli`.

```ocaml
(** The first special comment of the file is the comment associated
    with the whole module.*)

(** Special comments can be placed between elements and are kept
    by the OCamldoc tool, but are not associated to any element.
    @-tags in these comments are ignored.*)

(*******************************************************************)
(** Comments like the one above, with more than two asterisks,
    are ignored. *)

(** The comment for function f. *)
val f : int -> int -> int
(** The continuation of the comment for function f. *)

(** Comment for exception My_exception, even with a simple comment
    between the special comment and the exception.*)
(* Hello, I'm a simple comment :-) *)
exception My_exception of (int -> int) * int

(** Comment for type weather  *)
type weather =
| Rain of int (** The comment for constructor Rain *)
| Sun (** The comment for constructor Sun *)

(** Comment for type weather2  *)
type weather2 =
| Rain of int (** The comment for constructor Rain *)
| Sun (** The comment for constructor Sun *)
(** I can continue the comment for type weather2 here
  because there is already a comment associated to the last constructor.*)

(** The comment for type my_record *)
type my_record = {
    foo : int ;    (** Comment for field foo *)
    bar : string ; (** Comment for field bar *)
  }
  (** Continuation of comment for type my_record *)

(** Comment for foo *)
val foo : string
(** This comment is associated to foo and not to bar. *)
val bar : string
(** This comment is associated to bar. *)

(** The comment for class my_class *)
class my_class :
  object
    (** A comment to describe inheritance from cl *)
    inherit cl

    (** The comment for attribute tutu *)
    val mutable tutu : string

    (** The comment for attribute toto. *)
    val toto : int

    (** This comment is not attached to titi since
        there is a blank line before titi, but is kept
        as a comment in the class. *)

    val titi : string

    (** Comment for method toto *)
    method toto : string

    (** Comment for method m *)
    method m : float -> int
  end

(** The comment for the class type my_class_type *)
class type my_class_type =
  object
    (** The comment for variable x. *)
    val mutable x : int

    (** The comment for method m. *)
    method m : int -> int
end

(** The comment for module Foo *)
module Foo :
  sig
    (** The comment for x *)
    val x : int

    (** A special comment that is kept but not associated to any element *)
  end

(** The comment for module type my_module_type. *)
module type my_module_type =
  sig
    (** The comment for value x. *)
    val x : int

    (** The comment for module M. *)
    module M :
      sig
        (** The comment for value y. *)
        val y : int

        (* ... *)
      end

  end
```

#### التعليقات في ملفات .ml

يُربط التعليق الخاص بعنصر إن وُضع قبله ولم يوجد سطر فارغ بين التعليق والعنصر، ويجوز أن يقع تعليق بسيط بين التعليق الخاص والعنصر. وثمّة استثناءان في حالة البواني وحقول السجلات داخل تعريفات الأنواع، إذ يجب وضع التعليق المرتبط بعد تعريف الباني أو الحقل بلا سطر فارغ بينهما. والتعليق الخاص بباني يتبعه باني آخر يجب أن يوضع قبل المحرف `|` الفاصل بينهما.

يوضّح المثال التالي للملف `toto.ml` أين توضع التعليقات في ملف `.ml`.

```ocaml
(** The first special comment of the file is the comment associated
    to the whole module. *)

(** The comment for function f *)
let f x y = x + y

(** This comment is not attached to any element since there is another
    special comment just before the next element. *)

(** Comment for exception My_exception, even with a simple comment
    between the special comment and the exception.*)
(* A simple comment. *)
exception My_exception of (int -> int) * int

(** Comment for type weather  *)
type weather =
| Rain of int (** The comment for constructor Rain *)
| Sun (** The comment for constructor Sun *)

(** The comment for type my_record *)
type my_record = {
    foo : int ;    (** Comment for field foo *)
    bar : string ; (** Comment for field bar *)
  }

(** The comment for class my_class *)
class my_class =
    object
      (** A comment to describe inheritance from cl *)
      inherit cl

      (** The comment for the instance variable tutu *)
      val mutable tutu = "tutu"
      (** The comment for toto *)
      val toto = 1
      val titi = "titi"
      (** Comment for method toto *)
      method toto = tutu ^ "!"
      (** Comment for method m *)
      method m (f : float) = 1
    end

(** The comment for class type my_class_type *)
class type my_class_type =
  object
    (** The comment for the instance variable x. *)
    val mutable x : int
    (** The comment for method m. *)
    method m : int -> int
  end

(** The comment for module Foo *)
module Foo =
  struct
    (** The comment for x *)
    let x = 0
    (** A special comment in the class, but not associated to any element. *)
  end

(** The comment for module type my_module_type. *)
module type my_module_type =
  sig
    (* Comment for value x. *)
    val x : int
    (* ... *)
  end
```

### 19.2.2 التعليق الخاص Stop

يخبر التعليق الخاص `(**/**)` أداة OCamldoc بأن تُهمل العناصر الموضوعة بعده، حتى نهاية الصنف أو نوع الصنف أو الوحدة أو نوع الوحدة الحالي، أو حتى تعليق الإيقاف التالي. مثلًا:

```ocaml
class type foo =
  object
    (** comment for method m *)
    method m : string

    (**/**)

    (** This method won't appear in the documentation *)
    method bar : int
  end

(** This value appears in the documentation, since the Stop special comment
    in the class does not affect the parent module of the class.*)
val foo : string

(**/**)
(** The value bar does not appear in the documentation.*)
val bar : string
(**/**)

(** The type t appears since in the documentation since the previous stop comment
toggled off the "no documentation mode". *)
type t = string
```

ويؤدي الخيار **`-no-stop`** في `ocamldoc` إلى تجاهل تعليقات الإيقاف الخاصة.

### 19.2.3 صيغة تعليقات التوثيق

يتكوّن داخل تعليقات التوثيق `(**`…`*)` من نص حرّ مع تعليقات تنسيق اختيارية، يتبعها *وسوم* اختيارية تعطي معلومات أدقّ عن المعاملات والإصدار والمؤلفين وغيرها. وتُتميَّز الوسوم بمحرف `@` في مقدمتها. وبذلك يكون لتعليق التوثيق الشكل التالي:

```text
(** The comment begins with a description, which is text formatted
   according to the rules described in the next section.
   The description continues until the first non-escaped '@' character.
   @author Mr Smith
   @param x description for parameter x
*)
```

وبعض العناصر لا تدعم إلا مجموعة جزئية من وسوم `@` كلها؛ فالوسوم غير ذات الصلة بالعنصر الموثَّق تُهمَل ببساطة. مثلًا تُهمَل كل الوسوم عند توثيق بواني الأنواع وحقول السجلات وشروط وراثة الأصناف، وبالمثل يُهمَل وسم `@param` على متغيّر نسخة في صنف.

وأخيرًا، `(**)` هو تعليق التوثيق الفارغ.

### 19.2.4 تنسيق النص

فيما يلي قواعد BNF للغة الترميز البسيطة المستعملة لتنسيق أوصاف النص.

```text
text::= {text-element}⁺
```

```text
inline-text::= {inline-text-element}⁺
```

```text
text-element ::=
```

| ∣ | *inline-text-element* |  |
| --- | --- | --- |
| ∣ | *blank-line* | إجبار سطر جديد. |

```text
inline-text-element ::=
```

| ∣ | `{` { `0` … `9` }⁺ *inline-text* `}` | تنسيق *text* ترويسةَ قسم؛ والعدد الصحيح التالي لـ `{` يدلّ على مستوى التقسيم. |
| --- | --- | --- |
| ∣ | `{` { `0` … `9` }⁺ `:` *label* *inline-text* `}` | الأمر نفسه، لكن مع ربط الاسم *label* بالنقطة الحالية. ويمكن الإحالة إلى هذه النقطة بوسمها المؤهَّل كاملًا في أمر `{!`، كما في أي عنصر آخر. |
| ∣ | `{b` *inline-text* `}` | ضبط *text* بخط عريض. |
| ∣ | `{i` *inline-text* `}` | ضبط *text* بخط مائل. |
| ∣ | `{e` *inline-text* `}` | إبراز *text*. |
| ∣ | `{C` *inline-text* `}` | توسيط *text*. |
| ∣ | `{L` *inline-text* `}` | محاذاة *text* إلى اليسار. |
| ∣ | `{R` *inline-text* `}` | محاذاة *text* إلى اليمين. |
| ∣ | `{ul` *list* `}` | بناء قائمة. |
| ∣ | `{ol` *list* `}` | بناء قائمة معدودة. |
| ∣ | `{{:` *string* `}` *inline-text* `}` | وضع رابط إلى العنوان المعطى (بالسلسلة *string*) على *text* المعطى. |
| ∣ | `[` *string* `]` | ضبط السلسلة *string* المعطاة بنمط الشيفرة المصدرية. |
| ∣ | `{[` *string* `]}` | ضبط السلسلة *string* المعطاة بنمط الشيفرة المصدرية المنسَّقة مسبقًا. |
| ∣ | `{v` *string* `v}` | ضبط السلسلة *string* المعطاة بنمط حرفي. |
| ∣ | `{%` *string* `%}` | محتوى خاص بهدف معيّن (شيفرة LATEX افتراضيًا، وانظر التفاصيل في 19.2.4.4). |
| ∣ | `{!` *string* `}` | إدراج إحالة مرجعية إلى عنصر (انظر القسم 19.2.4.2 لصيغة الإحالات المرجعية). |
| ∣ | `{{!` *string* `}` *inline-text* `}` | إدراج إحالة مرجعية بالنص المعطى. |
| ∣ | `{!modules:` *string* *string* ... `}` | إدراج جدول فهرس لأسماء الوحدات المعطاة (في HTML فقط). |
| ∣ | `{!indexlist}` | إدراج جدول روابط إلى الفهارس المختلفة (الأنواع والقيم والوحدات وغيرها)، في HTML فقط. |
| ∣ | `{^` *inline-text* `}` | ضبط النص في موضع علوي. |
| ∣ | `{_` *inline-text* `}` | ضبط النص في موضع سفلي. |
| ∣ | *escaped-string* | صفّ السلسلة المعطاة كما هي؛ ويجب هروب المحارف الخاصة (`{` و`}` و`[` و`]` و`@`) بمحرف `\`. |

#### 19.2.4.1 تنسيق القوائم

```text
list::= ∣ { {- inline-text } }⁺ ∣ { {li inline-text } }⁺
```

وثمّة صيغة مختصرة للقوائم والقوائم المعدودة:

```text
(** Here is a {b list}
- item 1
- item 2
- item 3

The list is ended by the blank line.*)
```

تكافئ:

```text
(** Here is a {b list}
{ul {- item 1}
{- item 2}
{- item 3}}
The list is ended by the blank line.*)
```

والصيغة المختصرة نفسها متاحة للقوائم المعدودة باستعمال `+` بدلًا من `-`. ولاحظ أنه لا يمكن تعريف إلا قائمة واحدة بهذه الصيغة المختصرة في القوائم المتداخلة.

#### 19.2.4.2 تنسيق الإحالات المرجعية

الإحالات المرجعية أسماء عناصر مؤهَّلة كاملة، كما في المثال `{!Foo.Bar.t}`. وهذه إحالة ملتبسة، إذ قد تدلّ على اسم نوع أو اسم قيمة أو اسم صنف وغيرها. ويمكن إزالة الالتباس بتحديد الصنف النحوي المقصود، باستعمال `{!type:Foo.Bar.t}` للدلالة على نوع، و`{!val:Foo.Bar.t}` للدلالة على قيمة بالاسم نفسه.

وقائمة الأصناف النحوية الممكنة كما يلي:

| **الوسم** | **الصنف النحوي** |
| --- | --- |
|  |  |
| `module:` | وحدة |
| `modtype:` | نوع وحدة |
| `class:` | صنف |
| `classtype:` | نوع صنف |
| `val:` | قيمة |
| `type:` | نوع |
| `exception:` | استثناء |
| `attribute:` | سمة |
| `method:` | دالة صنف |
| `section:` | قسم ocamldoc |
| `const:` | باني متغيّر |
| `recfield:` | حقل سجل |

وفي حالة بواني المتغيّرات أو حقول السجلات ينبغي أن يسبق اسم الباني أو الحقل اسم النوع الموافق، لتجنّب التباس الأنواع التي تتشارك أسماء بوانيها. فمثلًا، يُحال إلى الباني `Node` من النوع `tree` بالصيغة `{!tree.Node}` أو `{!const:tree.Node}`، أو ربما `{!Mod1.Mod2.tree.Node}` من خارج الوحدة.

#### 19.2.4.3 الجملة الأولى

في وصف قيمة أو نوع أو استثناء أو وحدة أو نوع وحدة أو صنف أو نوع صنف، تُستعمل *الجملة الأولى* أحيانًا في الفهارس، أو حين لا يُحتاج إلا إلى جزء من الوصف. وتتكوّن الجملة الأولى من أوائل محارف الوصف، حتى:

- أول نقطة يتبعها فراغ، أو

- أول سطر فارغ

خارج تنسيق النص التالي: `{ul` *list* `}` و`{ol` *list* `}` و`[` *string* `]` و`{[` *string* `]}` و`{v` *string* `v}` و`{%` *string* `%}` و`{!` *string* `}` و`{^` *text* `}` و`{_` *text* `}`.

#### 19.2.4.4 التنسيق الخاص بهدف معيّن

المحتوى داخل `{%foo: ... %}` خاص بهدف معيّن، فلا يفسّره إلا الخلف `foo` ويُهمله غيره من الخلفيات. والخلفيات في التوزيعة هي `latex` و`html` و`texi` و`man`. وإن لم يُحدَّد هدف (الصيغة `{% ... %}`) اختير `latex` افتراضيًا. وقد تدعم المولّدات المخصّصة بادئة هدف خاصة بها.

#### 19.2.4.5 وسوم HTML المعروفة

يمكن استعمال وسوم HTML `b` و`code` و`i` و`ul` و`ol` و`li` و`center` و`h0`…`h9` (مكتوبة في المصدر بين علامة أصغر وعلامة أكبر) بدلًا من `{b ..}` و`[..]` و`{i ..}` و`{ul ..}` و`{ol ..}` و`{li ..}` و`{C ..}` و`{[0-9] ..}` على الترتيب.

### 19.2.5 وسوم التوثيق (وسوم @)

#### الوسوم المعرَّفة مسبقًا

يعطي الجدول التالي قائمة وسوم `@` المعرَّفة مسبقًا، مع صيغتها ومعناها.

| `@author` *string* | مؤلف العنصر. مؤلف واحد لكل وسم `@author`، وقد تكون لعنصر واحد عدّة وسوم `@author`. |
| --- | --- |
| `@deprecated` *text* | ينبغي أن يصف *text* متى هُجر العنصر، وما يُستعمل بدلًا منه، وربما سبب الهجر. |
| `@param` *id* *text* | ربط الوصف المعطى (*text*) باسم المعامل المعطى *id*. يُستعمل هذا الوسم للدوال والدوال الأعضاء والأصناف والموصِّلات. |
| `@raise` *Exc* *text* | بيان أن العنصر قد يرفع الاستثناء *Exc*. |
| `@return` *text* | وصف القيمة المعادة وقيمها الممكنة. يُستعمل هذا الوسم للدوال والدوال الأعضاء. |
| `@see` `<` *URL* `>` *text* | إضافة إحالة إلى *URL* بالنص المعطى تعليقًا. |
| `@see` `'`*filename*`'` *text* | إضافة إحالة إلى اسم الملف المعطى (مكتوبًا بين علامتي اقتباس مفردتين) بالنص المعطى تعليقًا. |
| `@see` `"`*document-name*`"` *text* | إضافة إحالة إلى اسم الوثيقة المعطى (مكتوبًا بين علامتي اقتباس مزدوجتين) بالنص المعطى تعليقًا. |
| `@since` *string* | بيان متى أُدخل العنصر. |
| `@before` *version* *text* | ربط الوصف المعطى (*text*) بالإصدار المعطى *version* لتوثيق مسائل التوافق. |
| `@version` *string* | رقم إصدار العنصر. |

#### الوسوم المخصّصة

يمكنك استعمال وسوم مخصّصة في تعليقات التوثيق، لكنها لن تؤثّر إن لم يكن المولّد المستعمل يعالجها. ولاستعمال وسم مخصّص، مثل `foo`، ضع `@foo` مع نص في تعليقك، كما في:

```text
(** My comment to show you a custom tag.
@foo this is the text argument to the [foo] custom tag.
*)
```

ولمعالجة الوسوم المخصّصة تحتاج إلى تعريف مولّد مخصّص، كما يوضّح القسم 19.3.2.

## 19.3 المولّدات المخصّصة

يعمل OCamldoc على مرحلتين:

1. تحليل ملفات المصدر؛

2. توليد التوثيق عبر مولّد توثيق، وهو كائن من الصنف `Odoc_args.class_generator`.

ويمكن للمستخدمين تقديم مولّد توثيق خاص بهم يُستعمل في المرحلة الثانية بدلًا من المولّدات الافتراضية. وكل المعلومات المستخرجة في مرحلة التحليل متاحة عبر الوحدة `Odoc_info`، التي تتيح الوصول إلى جميع الأنواع والدوال التي تمثّل العناصر الموجودة في الوحدات المعطاة مع أوصافها المرتبطة بها.

أما الملفات التي يمكنك استعمالها لتعريف مولّدات مخصّصة فمثبَّتة في المجلد الفرعي `ocamldoc` من المكتبة القياسية لـ OCaml.

### 19.3.1 وحدات المولّد

يعتمد نوع وحدة المولّد على نوع التوثيق المولَّد. وفيما يلي قائمة أنواع وحدات المولّدات، مع اسم صنف المولّد في الوحدة:

- في HTML: `Odoc_html.Html_generator` (الصنف `html`)؛

- في LATEX: `Odoc_latex.Latex_generator` (الصنف `latex`)؛

- في TeXinfo: `Odoc_texi.Texi_generator` (الصنف `texi`)؛

- في صفحات man: `Odoc_man.Man_generator` (الصنف `man`)؛

- في graphviz (dot): `Odoc_dot.Dot_generator` (الصنف `dot`)؛

- في الأنواع الأخرى: `Odoc_gen.Base` (الصنف `generator`).

أي أن تعريف مولّد جديد يقتضي تنفيذ وحدة بالتوقيع المتوقَّع وبصنف المولّد المعطى، مع توفير الدالة `generate` نقطةَ دخول تجعل المولّد يولّد التوثيق لقائمة وحدات معطاة:

```text
        method generate : Odoc_info.Module.t_module list -> unit
```

تُستدعى هذه الدالة بقائمة بنى `Odoc_info.t_module` المحلَّلة والمدموجة ربما.

ويُستحسن أن ترث من المولّد الحالي من النوع نفسه الذي تريد تعريفه، فبذلك يمكن تحميل مولّدات مخصّصة متنوّعة لدمج التحسينات التي يأتي بها كل منها.

ويُفعل ذلك باستعمال الوحدات من المرتبة الأولى (انظر الفصل 12.5).

وأسهل طريقة لتعريف مولّد مخصّص هي المثال التالي، الذي يمدّ المولّد الحالي لـ HTML. ولا حاجة لنا إلى معرفة إن كان هذا هو مولّد HTML الأصلي المعرَّف في ocamldoc أم أنه مُدَّد سابقًا بمولّد مخصّص حُمِّل قبله:

```text
module Generator (G : Odoc_html.Html_generator) =
struct
  class html =
    object(self)
      inherit G.html as html
      (* ... *)

      method generate module_list =
        (* ... *)
        ()

      (* ... *)
  end
end;;

let _ = Odoc_args.extend_html_generator (module Generator : Odoc_gen.Html_functor);;
```

ولمعرفة الدوال التي ينبغي تجاوزها أو الدوال المتاحة، ألقِ نظرة على التنفيذات الأساسية المختلفة بحسب نوع المولّد الذي تمدّه:

- في HTML: [`odoc_html.ml`](https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_html.ml)؛

- في LATEX: [`odoc_latex.ml`](https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_latex.ml)؛

- في TeXinfo: [`odoc_texi.ml`](https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_texi.ml)؛

- في صفحات man: [`odoc_man.ml`](https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_man.ml)؛

- في graphviz (dot): [`odoc_dot.ml`](https://github.com/ocaml/ocaml/blob/5.5/ocamldoc/odoc_dot.ml).

### 19.3.2 معالجة الوسوم المخصّصة

جعل مولّد مخصّص يعالج وسومًا مخصّصة (انظر 19.2.5) أمر بسيط جدًا.

#### في HTML

إليك كيف تطوّر مولّد HTML يعالج وسومك المخصّصة.

يرث الصنف `Odoc_html.Generator.html` من الصنف `Odoc_html.info`، الذي يحوي حقلًا `tag_functions` هو قائمة أزواج تتكوّن من وسم مخصّص (مثل `"foo"`) ودالة تأخذ `text` وتعيد شيفرة HTML (من النوع `string`). ولمعالجة وسم جديد `bar`، مدّ المولّد الحالي لـ HTML وأكمل الحقل `tag_functions`:

```text
module Generator (G : Odoc_html.Html_generator) =
struct
  class html =
    object(self)
      inherit G.html

      (** Return HTML code for the given text of a bar tag. *)
      method html_of_bar t = (* your code here *)

      initializer
        tag_functions <- ("bar", self#html_of_bar) :: tag_functions
  end
end
let _ = Odoc_args.extend_html_generator (module Generator : Odoc_gen.Html_functor);;
```

وثمّة دالة أخرى في الصنف `Odoc_html.info` تبحث عن الدالة المرتبطة بوسم مخصّص وتطبّقها على النص المعطى للوسم. وإن لم تكن ثمّة دالة مرتبطة بوسم مخصّص، طبعت الدالة رسالة تحذير على `stderr`.

#### في المولّدات الأخرى

يمكنك أن تفعل الشيء نفسه في الأنواع الأخرى من المولّدات.

## 19.4 إضافة خيارات سطر الأوامر

يُجرى تحليل سطر الأوامر بعد تحميل الوحدة التي تحوي مولّد التوثيق، ما يتيح إضافة خيارات إلى قائمة الخيارات الموجودة. وتُضاف الإضافة بالدالة:

```text
        Odoc_args.add_option : string * Arg.spec * string -> unit
```

ملاحظة: يمكن إعادة تعريف خيارات سطر الأوامر الموجودة باستعمال هذه الدالة.

### 19.4.1 الترجمة والاستعمال

#### تعريف صنف مولّد مخصّص في ملف واحد

ليكن `custom.ml` الملف الذي يعرّف صنف مولّد جديدًا. وتُجرى ترجمة `custom.ml` بالأمر التالي:

```text
        ocamlc -I +ocamldoc -c custom.ml
```

ويُنشأ الملف `custom.cmo`، ويمكن استعماله هكذا:

```text
        ocamldoc -g custom.cmo other-options source-files
```

أما الخيارات التي تختار مولّدًا مدمجًا لـ `ocamldoc`، مثل `-html`، فلا تؤثّر إن قُدِّم مولّد مخصّص من النوع نفسه بالخيار `-g`. وإن اختلف النوعان استُعمل المولّد المدمج المختار وأُهمل المخصّص.

#### تعريف صنف مولّد مخصّص في عدّة ملفات

يمكن تعريف صنف مولّد في عدّة وحدات معرَّفة في عدّة ملفات *file*₁`.ml`[`i`]، و*file*₂`.ml`[`i`]، …، و*file*ₙ`.ml`[`i`]. ويجب إنشاء ملف مكتبة `.cma` يضمّ كل هذه الملفات.

وتنشئ الأوامر التالية الملف `custom.cma` من الملفات *file*₁`.ml`[`i`]، …، و*file*ₙ`.ml`[`i`]:

```text
ocamlc -I +ocamldoc -c file₁.ml[i]
ocamlc -I +ocamldoc -c file₂.ml[i]
...
ocamlc -I +ocamldoc -c fileₙ.ml[i]
ocamlc -o custom.cma -a file₁.cmo file₂.cmo ... fileₙ.cmo
```

ثم يستعمل الأمر التالي `custom.cma` مولّدًا مخصّصًا:

```text
        ocamldoc -g custom.cma other-options source-files
```
