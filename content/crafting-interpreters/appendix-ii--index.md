---
title: "الملحق الثاني"
lang: ar
source: https://craftinginterpreters.com/
---

لمنفعة القارئ، هاهو الشيفرة التي يُنتجها [السكربت الصغير الذي بنيناه][generator]
لأتمتة توليد أصناف شجرة التحليل الخاصّة بـ jlox.

[generator]: /book/crafting-interpreters/representing-code/index#metaprogramming-the-trees

## التعبيرات

التعبيرات هي أوّل عُقد شجرة التحليل التي نراها، وهي مُقدَّمة في "[تمثيل
الشيفرة](/book/crafting-interpreters/representing-code/index)". ويُعرّف صنف `Expr` الرئيسي (class) واجهة الزائر
(visitor interface) المستخدَمة للتوجيه نحو أنواع التعبيرات المحدّدة، ويحتوي الأصناف
الفرعية لتلك التعبيرات الأخرى كأصناف متداخلة.

^code expr

### تعبير الإسناد

إسناد (assignment) المتغيّرات مُقدَّم في "[الجمل والحالة](/book/crafting-interpreters/statements-and-state/index#assignment)".

^code expr-assign

### تعبير ثنائي

المعاملات الثنائية مُقدَّمة في "[تمثيل
الشيفرة](/book/crafting-interpreters/representing-code/index)".

^code expr-binary

### تعبير استدعاء

تعبيرات استدعاء الدوال مُقدَّمة في
"[الدوال](/book/crafting-interpreters/functions/index#function-calls)".

^code expr-call

### تعبير الجلب (get)

الوصول إلى الخصائص، أو تعبيرات "get"، مُقدَّمة في
"[الأصناف](/book/crafting-interpreters/classes/index#properties-on-instances)".

^code expr-get

### تعبير تجميع

استخدام الأقواس لتجميع التعبيرات مُقدَّم في "[تمثيل
الشيفرة](/book/crafting-interpreters/representing-code/index)".

^code expr-grouping

### تعبير قيمة حرفية

تعبيرات القيم الحرفية مُقدَّمة في "[تمثيل
الشيفرة](/book/crafting-interpreters/representing-code/index)".

^code expr-literal

### تعبير منطقي

معاملا `and` و`or` المنطقيان مُقدَّمان في "[التحكّم في
المسار](/book/crafting-interpreters/control-flow/index#logical-operators)".

^code expr-logical

### تعبير الضبط (set)

إسناد الخصائص، أو تعبيرات "set"، مُقدَّمة في
"[الأصناف](/book/crafting-interpreters/classes/index#properties-on-instances)".

^code expr-set

### تعبير الاستدعاء الفائق (super)

تعبير `super` مُقدَّم في
"[الوراثة](/book/crafting-interpreters/inheritance/index#calling-superclass-methods)".

^code expr-super

### تعبير this

تعبير `this` مُقدَّم في "[الأصناف](/book/crafting-interpreters/classes/index#this)".

^code expr-this

### تعبير أحادي

المعاملات الأحادية مُقدَّمة في "[تمثيل الشيفرة](/book/crafting-interpreters/representing-code/index)".

^code expr-unary

### تعبير متغيّر

تعبيرات الوصول إلى المتغيّرات (variables) مُقدَّمة في "[البيانات
والحالة](/book/crafting-interpreters/statements-and-state/index#variable-syntax)".

^code expr-variable

## الجمل

تشكّل الجمل تسلسلاً ثانياً من عُقد شجرة التحليل مستقلاً عن
التعبيرات. وقد أضفنا أول عبارتين منها في "[البيانات
والحالة](/book/crafting-interpreters/statements-and-state/index)".

^code stmt

### جملة الكتلة (block)

جملة الكتلة بأقواسها المعقوفة التي تُعرّف نطاقاً (scope) محلياً مُقدَّمة في
"[الجمل والحالة](/book/crafting-interpreters/statements-and-state/index#block-syntax-and-semantics)".

^code stmt-block

### جملة الصنف (class)

إعلانات الأصناف مُقدَّمة -- ومن المتوقّع تماماً -- في
"[الأصناف](/book/crafting-interpreters/classes/index#class-declarations)".

^code stmt-class

### جملة تعبير

جملة التعبير مُقدَّمة في "[البيانات
والحالة](/book/crafting-interpreters/statements-and-state/index#statements)".

^code stmt-expression

### جملة دالة

إعلانات الدوال مُقدَّمة -- وقد خمّنت ذلك -- في
"[الدوال](/book/crafting-interpreters/functions/index#function-declarations)".

^code stmt-function

### جملة `if`

جملة `if` مُقدَّمة في "[التحكّم في
المسار](/book/crafting-interpreters/control-flow/index#conditional-execution)".

^code stmt-if

### جملة `print`

جملة `print` مُقدَّمة في "[البيانات
والحالة](/book/crafting-interpreters/statements-and-state/index#statements)".

^code stmt-print

### جملة `return`

تحتاج دالة كي تُرجع منها، لذا فإنّ جُمل `return` مُقدَّمة في
"[الدوال](/book/crafting-interpreters/functions/index#return-statements)".

^code stmt-return

### جملة متغيّر

إعلانات المتغيّرات مُقدَّمة في "[البيانات
والحالة](/book/crafting-interpreters/statements-and-state/index#variable-syntax)".

^code stmt-var

### جملة `while`

جملة `while` مُقدَّمة في "[التحكّم في
المسار](/book/crafting-interpreters/control-flow/index#while-loops)".

^code stmt-while
