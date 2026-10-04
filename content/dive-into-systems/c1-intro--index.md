---
title: "1. بلغة C، بلغة C، بلغة C الجميلة"
lang: ar
source: https://diveintosystems.org/book/C1-C_intro/index.html
---

«By the Beautiful Sea»، كارول وأتريدج، 1914

يقدّم هذا الفصل نظرة عامة على البرمجة بلغة C، وهو مكتوب للطلاب الذين لديهم بعض الخبرة في البرمجة بلغة أخرى. وقد كُتب تحديداً لمبرمجي Python ويستخدم بعض أمثلة Python لأغراض المقارنة ([الملحق 1](https://diveintosystems.org/book/Appendix1/index.html#_appendix_1_chapter_1_for_java_programmers) نسخة من الفصل 1 لمبرمجي Java). ومع ذلك، ينبغي أن يكون مفيداً كمقدمة للبرمجة بلغة C لأي شخص لديه خبرة برمجية أساسية بأي لغة.

C لغة برمجة عالية المستوى مثل اللغات الأخرى التي قد تعرفها، كـ Python وJava وRuby وC++. وهي لغة برمجة أمرية (imperative) وإجرائية (procedural)، أي أن برنامج C يُعبَّر عنه بسلسلة من العبارات (الخطوات) التي ينفّذها الحاسوب، وأن برامج C تُبنى كمجموعة من الدوال (الإجراءات). ويجب أن يحتوي كل برنامج C على دالة واحدة على الأقل، هي دالة `main`، وهي التي تضم مجموعة العبارات التي تُنفَّذ عند بدء البرنامج.

لغة البرمجة C أقل تجريداً من لغة الآلة الخاصة بالحاسوب مقارنةً ببعض اللغات الأخرى التي قد تكون على دراية بها. وهذا يعني أن C لا تدعم البرمجة كائنية التوجه (مثل Python وJava وC++) ولا تمتلك مجموعة غنية من التجريدات البرمجية عالية المستوى (مثل السلاسل النصية والقوائم والقواميس في Python). ونتيجةً لذلك، إذا أردت استخدام بنية بيانات قاموس (dictionary) في برنامجك بلغة C، فعليك تنفيذها بنفسك، بدلاً من مجرد استيراد القاموس الذي هو جزء من اللغة (كما في Python).

قد يجعل افتقار C إلى التجريدات عالية المستوى تبدو لغة أقل جاذبية للاستخدام. غير أن كونها أقل تجريداً من الآلة الأساسية يجعل من الأسهل على المبرمج رؤية وفهم العلاقة بين شيفرة البرنامج وتنفيذ الحاسوب لها. ويحتفظ مبرمجو C بقدر أكبر من التحكم في كيفية تنفيذ برامجهم على العتاد، ويمكنهم كتابة شيفرة تعمل بكفاءة أعلى من الشيفرة المكافئة المكتوبة بالتجريدات عالية المستوى التي توفّرها لغات أخرى. وبشكل خاص، لديهم تحكم أكبر في كيفية إدارة برامجهم للذاكرة (memory)، وهو ما قد يكون له أثر كبير على الأداء. وهكذا تبقى C اللغة *الفعليّة* (de facto) لبرمجة الأنظمة (systems programming) حيث يكون التحكم منخفض المستوى والكفاءة أمرين حاسمين.

نستخدم C في هذا الكتاب لما تتيحه من تعبير واضح عن التحكم في البرنامج، ولترجمتها المباشرة نسبياً إلى لغة التجميع (assembly) وشيفرة الآلة التي ينفّذها الحاسوب. يقدّم هذا الفصل البرمجة بلغة C، بدءاً بنظرة عامة على خصائصها. ثم يصف [الفصل 2](https://diveintosystems.org/book/C2-C_depth/index.html#_a_deeper_dive_into_c_programming) خصائص C بمزيد من التفصيل.

لنبدأ بالنظر إلى برنامج «hello world» يتضمن مثالاً على استدعاء دالة من مكتبة الرياضيات. وفي [الجدول 1](#TabPythonC) نقارن نسخة C من هذا البرنامج بنسخته بلغة Python. وقد تُوضع نسخة C في ملف باسم `hello.c` (حيث `.c` هي اللاحقة الاصطلاحية لملفات شيفرة C المصدرية)، بينما قد تكون نسخة Python في ملف باسم `hello.py`.

**الجدول 1. مقارنة صياغة برنامج صغير بلغتي Python وC. تتوفر كلٌّ من [نسخة C](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.c) و[نسخة Python](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.py) للتنزيل.**

**نسخة Python ([hello.py](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.py))**

```python
'''
    The Hello World Program in Python
'''

# Python math library
from math import *

# main function definition:
def main():
    # statements on their own line
    print("Hello World")
    print("sqrt(4) is %f" % (sqrt(4)))

# call the main function:
main()
```

**نسخة C ([hello.c](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.c))**

```c
/*
    The Hello World Program in C
 */

/* C math and I/O libraries */
#include <math.h>
#include <stdio.h>

/* main function definition: */
int main(void) {
    // statements end in a semicolon (;)
    printf("Hello World\n");
    printf("sqrt(4) is %f\n", sqrt(4));

    return 0;  // main returns value 0
}
```

لاحظ أن نسختي البرنامج لهما بنية وتراكيب لغوية متشابهة، وإن اختلفت صياغة اللغة. وبشكل خاص:

**التعليقات:**

- في Python، تبدأ التعليقات متعددة الأسطر وتنتهي بـ `'''`، وتبدأ التعليقات أحادية السطر بـ `#`.
- في C، تبدأ التعليقات متعددة الأسطر بـ `/*` وتنتهي بـ `*/`، وتبدأ التعليقات أحادية السطر بـ `//`.

**استيراد شيفرة المكتبات:**

- في Python، تُضمَّن المكتبات (تُستورد) باستخدام `import`.
- في C، تُضمَّن المكتبات (تُستورد) باستخدام `#include`. وتظهر جميع عبارات `#include` في أعلى البرنامج، خارج أجسام الدوال.

**الكتل:**

- في Python، تشير المسافات البادئة (indentation) إلى كتلة.
- في C، تبدأ الكتل (مثل أجسام الدوال والحلقات والشروط) بـ `{` وتنتهي بـ `}`.

**الدالة الرئيسية:**

- في Python، تعرّف `def main():` الدالة الرئيسية.
- في C، تعرّف `int main(void){ }` الدالة الرئيسية. وتُرجع دالة `main` قيمة من النوع `int` وهو اسم C لتحديد نوع العدد الصحيح المؤشّر (والأعداد الصحيحة المؤشّرة قيم مثل ‎-3 و0 و1234). وتُرجع دالة `main` القيمة `int` للدلالة على اكتمال التشغيل دون خطأ. وتعني `void` أنها لا تتوقع استقبال وسيط (parameter). وستوضح أقسام لاحقة كيف يمكن لدالة `main` أن تستقبل وسائط لتلقي وسائط سطر الأوامر.

**العبارات:**

- في Python، تقع كل عبارة في سطر منفصل.
- في C، تنتهي كل عبارة بفاصلة منقوطة `;`. وفي C، يجب أن تقع العبارات داخل جسم دالة ما (في `main` في هذا المثال).

**الإخراج:**

- في Python، تطبع الدالة `print` سلسلة منسّقة (formatted string). وتأتي قيم العناصر النائبة في سلسلة التنسيق بعد رمز `%` في قائمة قيم مفصولة بفواصل (مثلاً، ستُطبع قيمة `sqrt(4)` بدلاً من العنصر النائب `%f` في سلسلة التنسيق).
- في C، تطبع الدالة `printf` سلسلة منسّقة. وتكون قيم العناصر النائبة في سلسلة التنسيق وسائط إضافية مفصولة بفواصل (مثلاً، ستُطبع قيمة `sqrt(4)` بدلاً من العنصر النائب `%f` في سلسلة التنسيق).

هناك بعض الفروق المهمة التي يجب ملاحظتها في نسختي C وPython من هذا البرنامج:

**المسافات البادئة:** في C، لا معنى للمسافات البادئة، لكن من حسن أسلوب البرمجة إزاحة العبارات بحسب مستوى تداخلها داخل الكتلة الحاوية.

**الإخراج:** لا تطبع دالة `printf` في C تلقائياً محرف سطر جديد في النهاية كما تفعل دالة `print` في Python. ونتيجةً لذلك، يحتاج مبرمجو C إلى تحديد محرف سطر جديد صراحةً (`\n`) في سلسلة التنسيق عند الرغبة في سطر جديد في الإخراج.

**دالة `main`:**

- يجب أن يحتوي برنامج C على دالة باسم `main`، ويجب أن يكون نوع إرجاعها `int`. وهذا يعني أن دالة `main` ترجع قيمة من نوع عدد صحيح مؤشّر. ولا تحتاج برامج Python إلى تسمية دالتها الرئيسية `main`، لكنها غالباً ما تفعل ذلك بالاصطلاح.
- تحتوي دالة `main` في C على عبارة `return` صريحة لإرجاع قيمة `int` (وبالاصطلاح، ينبغي أن ترجع `main` القيمة `0` إذا نُفِّذت الدالة الرئيسية بنجاح دون أخطاء).
- يحتاج برنامج Python إلى تضمين استدعاء صريح لدالته `main` لتشغيلها عند تنفيذ البرنامج. أما في C، فتُستدعى دالتها `main` تلقائياً عند تنفيذ برنامج C.

### 1.1.1. تصريف برامج C وتشغيلها {#_compiling_and_running_c_programs}

Python لغة برمجة مُفسَّرة (interpreted)، أي أن برنامجاً آخر هو مفسّر Python يشغّل برامج Python: يعمل مفسّر Python كآلة افتراضية تُشغَّل عليها برامج Python. ولتشغيل برنامج Python، تُعطى شيفرة البرنامج المصدرية (`hello.py`) كمدخل إلى برنامج مفسّر Python الذي يشغّله. وعلى سبيل المثال (حيث `$` هو موجّه صدفة Linux):

```bash
$ python hello.py
```

مفسّر Python برنامج في صورة قابلة للتشغيل مباشرةً على النظام الأساسي (وتسمى هذه الصورة **الملف التنفيذي الثنائي** binary executable) ويأخذ كمدخل برنامج Python الذي يشغّله ([الشكل 1](#FigPythonExecution)).

![Interpreted execution of a Python program.](https://diveintosystems.org/images/dive-into-systems/c1-intro-0-interpreted.webp){#FigPythonExecution} الشكل 1. يُنفَّذ برنامج Python مباشرةً بواسطة مفسّر Python، وهو برنامج تنفيذي ثنائي يعمل على النظام الأساسي (نظام التشغيل والعتاد)

لتشغيل برنامج C، يجب أولاً ترجمته إلى صورة يستطيع نظام الحاسوب تنفيذها مباشرةً. و**المصرّف** (compiler) برنامج يترجم شيفرة C المصدرية إلى صورة **ملف تنفيذي ثنائي** يستطيع عتاد الحاسوب تنفيذها مباشرةً. ويتألف الملف التنفيذي الثنائي من سلسلة من الأصفار والآحاد بتنسيق محدد جيداً يستطيع الحاسوب تشغيله.

فمثلاً، لتشغيل برنامج C هو `hello.c` على نظام Unix، يجب أولاً تصريف شيفرة C بواسطة مصرّف C (مثل [مصرّف GNU للغة C](https://gcc.gnu.org)، GCC) ينتج ملفاً تنفيذياً ثنائياً (يُسمى افتراضياً `a.out`). ويمكن بعد ذلك تشغيل النسخة التنفيذية الثنائية من البرنامج مباشرةً على النظام ([الشكل 2](#FigCCompilation)):

```bash
$ gcc hello.c
$ ./a.out
```

(لاحظ أن بعض مصرّفات C قد تحتاج إلى إخبارها صراحةً بربط مكتبة الرياضيات: `-lm`):

```bash
$ gcc hello.c -lm
```

![C program text goes to the C compiler, which converts it into an executable sequence of zeroes and ones. The format of the executable sequence can be run by the underlying system.](https://diveintosystems.org/images/dive-into-systems/c1-intro-1-compile.webp){#FigCCompilation} الشكل 2. يبني مصرّف C (gcc) شيفرة C المصدرية إلى ملف تنفيذي ثنائي (a.out). وينفّذ النظام الأساسي (نظام التشغيل والعتاد) ملف a.out مباشرةً لتشغيل البرنامج.

#### الخطوات التفصيلية {#_detailed_steps}

بشكل عام، تصف السلسلة التالية الخطوات اللازمة لتحرير برنامج C وتصريفه وتشغيله على نظام Unix:

باستخدام [محرّر نصوص](https://www.cs.swarthmore.edu/help/editors.html) (مثلاً `vim`)، اكتب برنامجك المصدر بلغة C واحفظه في ملف (مثل `hello.c`):

```bash
$ vim hello.c
```

صرّف المصدر إلى صورة تنفيذية، ثم شغّله. وأبسط صياغة للتصريف باستخدام `gcc` هي:

```bash
$ gcc <input_source_file>
```

إذا لم يُنتج التصريف أخطاء، ينشئ المصرّف ملفاً تنفيذياً ثنائياً باسم `a.out`. ويتيح لك المصرّف أيضاً تحديد اسم الملف التنفيذي الثنائي المطلوب إنشاؤه باستخدام العلامة `-o`:

```bash
$ gcc -o <output_executable_file> <input_source_file>
```

فمثلاً، يأمر هذا الأمر `gcc` بتصريف `hello.c` إلى ملف تنفيذي باسم `hello`:

```bash
$ gcc -o hello hello.c
```

يمكننا استدعاء البرنامج التنفيذي باستخدام `./hello`:

```bash
$ ./hello
```

يجب إعادة تصريف أي تغييرات تُجرى على شيفرة C المصدرية (ملف `hello.c`) باستخدام `gcc` لإنتاج نسخة جديدة من `hello`. وإذا اكتشف المصرّف أخطاء أثناء التصريف، فلن يُنشأ ملف `./hello` أو يُعاد إنشاؤه (لكن انتبه، فقد تظل نسخة أقدم من الملف ناتجة عن تصريف ناجح سابق موجودة).

غالباً ما تريد، عند التصريف باستخدام `gcc`، تضمين عدة خيارات لسطر الأوامر. فمثلاً، تمكّن هذه الخيارات من مزيد من تحذيرات المصرّف وتبني ملفاً تنفيذياً ثنائياً بمعلومات تنقيح إضافية:

```bash
$ gcc -Wall -g -o hello hello.c
```

ولأن سطر أوامر `gcc` قد يكون طويلاً، كثيراً ما تُستخدم أداة `make` لتبسيط تصريف برامج C ولتنظيف الملفات التي ينشئها `gcc`. ويُعدّ [استخدام make وكتابة ملفات Makefile](https://www.cs.swarthmore.edu/~newhall/unixhelp/howto_makefiles.html) من المهارات المهمة التي ستطوّرها مع تراكم خبرتك في البرمجة بلغة C.

نغطي التصريف والربط مع شيفرة مكتبة C بمزيد من التفصيل في نهاية [الفصل 2](https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_compilation_steps_).

### 1.1.2. المتغيّرات وأنواع C العددية {#_variables_and_c_numeric_types}

مثل Python، تستخدم C المتغيّرات كمواقع تخزين مسمّاة لحمل البيانات. ويُعدّ التفكير في **نطاق** (scope) متغيّرات البرنامج و**نوعها** (type) أمراً مهماً لفهم دلالات ما سيفعله برنامجك عند تشغيله. ويحدد **نطاق** المتغيّر متى يكون للمتغيّر معنى (أي أين ومتى يمكن استخدامه في برنامجك) وعمره (أي قد يستمر طوال تشغيل البرنامج أو خلال تنشيط دالة فقط). ويحدد **نوع** المتغيّر نطاق القيم التي يمكنه تمثيلها وكيفية تفسير تلك القيم عند تنفيذ عمليات على بياناته.

في C، يجب الإعلان عن جميع المتغيّرات قبل استخدامها. وللإعلان عن متغيّر، استخدم الصياغة التالية:

```
type_name variable_name;
```

لا يمكن أن يكون للمتغيّر إلا **نوع** واحد. وتشمل أنواع C الأساسية `char` و`int` و`float` و`double`. وبالاصطلاح، ينبغي الإعلان عن متغيّرات C في بداية نطاقها (في أعلى كتلة `{ }`)، قبل أي عبارة C في ذلك النطاق.

فيما يلي مقتطف شيفرة C يوضح إعلانات متغيّرات من أنواع مختلفة واستخداماتها. ونناقش الأنواع والمعاملات بمزيد من التفصيل بعد المثال.

vars.c

```c
{
    /* 1. Define variables in this block's scope at the top of the block. */

    int x; // declares x to be an int type variable and allocates space for it

    int i, j, k;  // can define multiple variables of the same type like this

    char letter;  // a char stores a single-byte integer value
                  // it is often used to store a single ASCII character
                  // value (the ASCII numeric encoding of a character)
                  // a char in C is a different type than a string in C

    float winpct; // winpct is declared to be a float type
    double pi;    // the double type is more precise than float

    /* 2. After defining all variables, you can use them in C statements. */

    x = 7;        // x stores 7 (initialize variables before using their value)
    k = x + 2;    // use x's value in an expression

    letter = 'A';        // a single quote is used for single character value
    letter = letter + 1; // letter stores 'B' (ASCII value one more than 'A')

    pi = 3.1415926;

    winpct = 11 / 2.0; // winpct gets 5.5, winpct is a float type
    j = 11 / 2;        // j gets 5: int division truncates after the decimal
    x = k % 2;         // % is C's mod operator, so x gets 9 mod 2 (1)
}
```

لاحظ كثرة الفواصل المنقوطة. تذكّر أن عبارات C تُفصل بـ `;`، لا بفواصل الأسطر — تتوقع C فاصلة منقوطة بعد كل عبارة. وستنسى بعضها، و`gcc` لا يخبرك تقريباً أبداً بأنك نسيت فاصلة منقوطة، حتى لو كان ذلك الخطأ النحوي الوحيد في برنامجك. بل غالباً ما يشير المصرّف، عند نسيانك فاصلة منقوطة، إلى خطأ نحوي في السطر *التالي* للسطر الذي ينقصه المنقوطة: والسبب أن `gcc` يفسّرها كجزء من عبارة السطر السابق. ومع استمرارك في البرمجة بلغة C، ستتعلم ربط أخطاء `gcc` بأخطاء صياغة C المحددة التي تصفها.

### 1.1.3. أنواع C {#_c_types}

تدعم C مجموعة صغيرة من أنواع البيانات المدمجة، وتوفّر بضع طرق يمكن للمبرمجين بها إنشاء تجميعات أساسية من الأنواع (المصفوفات والبنى). ومن هذه اللبنات الأساسية، يستطيع مبرمج C بناء بنى بيانات معقّدة.

تعرّف C مجموعة من الأنواع الأساسية لتخزين القيم العددية. وفيما يلي أمثلة على قيم حرفية (literal) عددية من أنواع C مختلفة:

```c
8     // the int value 8
3.4   // the double value 3.4
'h'   // the char value 'h' (its value is 104, the ASCII value of h)
```

يخزّن نوع `char` في C قيمة عددية. غير أن المبرمجين كثيراً ما يستخدمونه لتخزين قيمة محرف ASCII. وتُحدَّد القيمة الحرفية للمحرف في C كمحرف واحد بين علامتي اقتباس مفردتين.

لا تدعم C نوع سلسلة نصية (string)، لكن المبرمجين يستطيعون إنشاء سلاسل نصية من نوع `char` ومن دعم C لإنشاء مصفوفات من القيم، وهو ما نناقشه في أقسام لاحقة. غير أن C تدعم طريقة للتعبير عن القيم الحرفية للسلسلة النصية في البرامج: فالقيمة الحرفية للسلسلة النصية هي أي تسلسل من المحارف بين علامتي اقتباس مزدوجتين. وغالباً ما يمرّر مبرمجو C القيم الحرفية للسلسلة النصية كوسيط سلسلة التنسيق إلى `printf`:

```c
printf("this is a C string\n");
```

تدعم Python السلاسل النصية، لكنها لا تمتلك نوع `char`. وفي C، تختلف السلسلة النصية و`char` اختلافاً كبيراً، وتُقيَّمان تقييماً مختلفاً. ويتضح هذا الفرق بمقارنة قيمة حرفية لسلسلة نصية في C تحتوي على محرف واحد بقيمة حرفية لـ `char` في C. فمثلاً:

```c
'h'  // this is a char literal value   (its value is 104, the ASCII value of h)
"h"  // this is a string literal value (its value is NOT 104, it is not a char)
```

نناقش سلاسل C ومتغيّرات `char` بمزيد من التفصيل في [قسم السلاسل النصية](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library) لاحقاً في هذا الفصل. وهنا سنركّز أساساً على الأنواع العددية في C.

#### أنواع C العددية {#_c_numeric_types}

تدعم C عدة أنواع مختلفة لتخزين القيم العددية. وتختلف الأنواع في صيغة القيم العددية التي تمثّلها. فمثلاً، يمثّل النوعان `float` و`double` القيم الحقيقية، ويمثّل `int` قيماً صحيحة مؤشّرة، ويمثّل `unsigned int` قيماً صحيحة غير مؤشّرة. والقيم الحقيقية قيم موجبة أو سالبة ذات نقطة عشرية، مثل `-1.23` أو `0.0056`. وتخزّن الأعداد الصحيحة المؤشّرة قيماً صحيحة موجبة أو سالبة أو صفراً، مثل `-333` أو `0` أو `3456`. وتخزّن الأعداد الصحيحة غير المؤشّرة قيماً صحيحة غير سالبة حصراً، مثل `0` أو `1234`.

تختلف أنواع C العددية أيضاً في مدى القيم التي يمكنها تمثيلها ودقتها. ويعتمد مدى القيمة أو دقتها على عدد البايتات (bytes) المرتبطة بنوعها. وتستطيع الأنواع ذات البايتات الأكثر تمثيل مدى أوسع من القيم (للأنواع الصحيحة)، أو قيم أعلى دقة (للأنواع الحقيقية)، مقارنةً بالأنواع ذات البايتات الأقل.

يوضّح [الجدول 2](#TabNumericTypes) عدد بايتات التخزين، ونوع القيم العددية المخزّنة، وكيفية الإعلان عن متغيّر لمجموعة متنوعة من أنواع C العددية الشائعة (لاحظ أن هذه أحجام نموذجية — فعدد البايتات الدقيق يعتمد على معمارية العتاد).

| اسم النوع | الحجم المعتاد | القيم المخزّنة | كيفية الإعلان |
| --- | --- | --- | --- |
| `char` | 1 بايت | أعداد صحيحة | `char x;` |
| `short` | 2 بايت | أعداد صحيحة مؤشّرة | `short x;` |
| `int` | 4 بايت | أعداد صحيحة مؤشّرة | `int x;` |
| `long` | 4 أو 8 بايت | أعداد صحيحة مؤشّرة | `long x;` |
| `long long` | 8 بايت | أعداد صحيحة مؤشّرة | `long long x;` |
| `float` | 4 بايت | أعداد حقيقية مؤشّرة | `float x;` |
| `double` | 8 بايت | أعداد حقيقية مؤشّرة | `double x;` |

وتوفّر C أيضاً نسخاً *غير مؤشّرة* من الأنواع العددية الصحيحة (`char` و`short` و`int` و`long` و`long long`). وللإعلان عن متغيّر غير مؤشّر، أضف الكلمة المفتاحية `unsigned` قبل اسم النوع. فمثلاً:

```c
int x;           // x is a signed int variable
unsigned int y;  // y is an unsigned int variable
```

لا يحدد معيار C ما إذا كان النوع `char` مؤشّراً أم غير مؤشّر. ونتيجةً لذلك، قد تنفّذ بعض التطبيقات `char` كقيم صحيحة مؤشّرة بينما تنفّذها أخرى كغير مؤشّرة. ومن حسن ممارسة البرمجة الإعلان صراحةً عن `unsigned char` إذا أردت استخدام النسخة غير المؤشّرة من متغيّر `char`.

قد يختلف عدد البايتات الدقيق لكل نوع من أنواع C من معمارية إلى أخرى. والأحجام في [الجدول 2](#TabNumericTypes) هي أحجام دنيا (وشائعة) لكل نوع. ويمكنك طباعة الحجم الدقيق على جهاز معيّن باستخدام معامل `sizeof` في C، الذي يأخذ اسم نوع كوسيط ويُقيَّم إلى عدد البايتات المستخدمة لتخزين ذلك النوع. فمثلاً:

```c
printf("number of bytes in an int: %lu\n", sizeof(int));
printf("number of bytes in a short: %lu\n", sizeof(short));
```

يُقيَّم المعامل `sizeof` إلى قيمة unsigned long، لذا في الاستدعاء `printf` استخدم العنصر النائب `%lu` لطباعة قيمته. وعلى معظم المعماريات سيكون ناتج هذه العبارات:

```
number of bytes in an int: 4
number of bytes in a short: 2
```

#### المعاملات الحسابية {#_arithmetic_operators}

تجمع المعاملات الحسابية قيم الأنواع العددية. ويعتمد النوع الناتج عن العملية على أنواع المعاملات. فمثلاً، إذا جُمعت قيمتان من النوع `int` بمعامل حسابي، فسيكون النوع الناتج عدداً صحيحاً أيضاً.

تُجري C تحويلاً تلقائياً للنوع عندما يجمع معامل بين معاملين من نوعين مختلفين. فمثلاً، إذا جُمع معامل `int` بمعامل `float`، يُحوَّل المعامل الصحيح أولاً إلى مكافئه العشري العائم قبل تطبيق المعامل، ويكون نوع ناتج العملية `float`.

يمكن استخدام المعاملات الحسابية التالية على معظم معاملات الأنواع العددية:

الجمع (`+`) والطرح (`-`)

الضرب (`*`) والقسمة (`/`) والباقي (`%`):

لا يمكن لمعامل الباقي (`%`) أن يأخذ إلا معاملات من نوع صحيح (`int` و`unsigned int` و`short` وهكذا).

إذا كان كلا المعاملين من نوع `int`، فإن معامل القسمة (`/`) ينفّذ قسمة صحيحة (القيمة الناتجة `int`، مع اقتطاع كل ما بعد النقطة العشرية من عملية القسمة). فمثلاً يُقيَّم `8/3` إلى `2`.

إذا كان أحد المعاملين أو كلاهما `float` (أو `double`)، فإن `/` ينفّذ قسمة حقيقية ويُقيَّم إلى ناتج `float` (أو `double`). فمثلاً يُقيَّم `8 / 3.0` إلى ما يقارب `2.666667`.

الإسناد (`=`):

```
variable = value of expression;  // e.g., x = 3 + 4;
```

الإسناد مع التحديث (`+=` و`-=` و`*=` و`/=` و`%=`):

```
variable op= expression;  // e.g., x += 3; is shorthand for x = x + 3;
```

الزيادة (`++`) والنقصان (`--`):

```
variable++;  // e.g., x++; assigns to x the value of x + 1
```

**تحذير — الزيادة السابقة مقابل اللاحقة**

> المعاملان `++variable` و`variable++` صالحان معاً، لكنهما يُقيَّمان على نحو مختلف قليلاً:
>
> - `++x`: زد `x` أولاً، ثم استخدم قيمته.
> - `x++`: استخدم قيمة `x` أولاً، ثم زدها.
>
> في كثير من الحالات لا يهم أيَّهما تستخدم، لأن قيمة المتغيّر المزاد أو المنقوص لا تُستخدم في العبارة. فمثلاً، هاتان العبارتان متكافئتان (وإن كانت الأولى هي الصياغة الأكثر شيوعاً لهذه العبارة):
>
> ```c
> x++;
> ++x;
> ```
>
> وفي بعض الحالات يؤثر السياق في النتيجة (عندما تُستخدم قيمة المتغيّر المزاد أو المنقوص *فعلاً* في العبارة). فمثلاً:
>
> ```c
> x = 6;
> y = ++x + 2;  // y is assigned 9: increment x first, then evaluate x + 2 (9)
>
> x = 6;
> y = x++ + 2;  // y is assigned 8: evaluate x + 2 first (8), then increment x
> ```
>
> غالباً ما يكون من الصعب قراءة الشيفرة التي تستخدم تعبيراً حسابياً مع معامل زيادة، كما يسهل الخطأ فيها. ونتيجةً لذلك، من الأفضل عموماً تجنب كتابة شيفرة كهذه؛ واكتب بدلاً من ذلك عبارات منفصلة بالترتيب الذي تريده بالضبط. فمثلاً، إذا أردت زيادة `x` أولاً ثم إسناد `x + 1` إلى `y`، فاكتب ذلك كعبارتين منفصلتين.
>
> فبدلاً من كتابة هذا:
>
> ```c
> y = ++x + 1;
> ```
>
> اكتبه كعبارتين منفصلتين:
>
> ```c
> x++;
> y = x + 1;
> ```
تطبع دالة `printf` في C القيم إلى الطرفية، وتقرأ الدالة `scanf` القيم التي يُدخلها المستخدم. وتنتمي دالتا `printf` و`scanf` إلى مكتبة الإدخال/الإخراج القياسية في C، والتي يجب تضمينها صراحةً في أعلى أي ملف `.c` يستخدم هاتين الدالتين باستخدام `#include `. وفي هذا القسم، نقدّم أساسيات استخدام `printf` و`scanf` في برامج C. ويناقش [قسم «الإدخال/الإخراج» في الفصل 2](https://diveintosystems.org/book/C2-C_depth/IO.html#_io_in_c) دوال الإدخال والإخراج في C بمزيد من التفصيل.

### 1.2.1. printf {#_printf}

تشبه دالة `printf` في C كثيراً الطباعة المنسّقة (formatted print) في Python، حيث يحدد المستدعي سلسلة تنسيق للطباعة. وغالباً ما تحتوي سلسلة التنسيق على محددات تنسيق (formatting specifiers)، مثل محارف خاصة تطبع علامات جدولة (`\t`) أو أسطراً جديدة (`\n`)، أو عناصر نائبة للقيم في الإخراج. وتتكون العناصر النائبة من `%` متبوعاً بحرف محدد النوع (فمثلاً، يمثّل `%d` عنصراً نائباً لقيمة صحيحة). ولكل عنصر نائب في سلسلة التنسيق، تتوقع `printf` وسيطاً إضافياً. ويضم [الجدول 1](#TabSyntaxPrinting) برنامجاً مثالياً بلغتي Python وC بإخراج منسّق:

**الجدول 1. مقارنة صياغة الطباعة في Python وC**

**نسخة Python**

```python
# Python formatted print example

def main():

    print("Name: %s,  Info:" % "Vijay")
    print("\tAge: %d \t Ht: %g" %(20,5.9))
    print("\tYear: %d \t Dorm: %s" %(3, "Alice Paul"))

# call the main function:
main()
```

**نسخة C**

```c
/* C printf example */
#include <stdio.h> // needed for printf

int main(void) {

    printf("Name: %s,  Info:\n", "Vijay");
    printf("\tAge: %d \t Ht: %g\n",20,5.9);
    printf("\tYear: %d \t Dorm: %s\n",
            3,"Alice Paul");

    return 0;
}
```

عند التشغيل، ينتج كلا النسختين مخرجات منسّقة بصورة متطابقة:

```
Name: Vijay,  Info:
	Age: 20 	 Ht: 5.9
	Year: 3 	 Dorm: Alice Paul
```

الفرق الرئيسي بين دالة `printf` في C ودالة `print` في Python هو أن نسخة Python تطبع ضمنياً محرف سطر جديد في نهاية سلسلة الإخراج، أما نسخة C فلا تفعل ذلك. ونتيجةً لذلك، تحتوي سلاسل التنسيق بلغة C في هذا المثال على محارف سطر جديد (`\n`) في النهاية لطباعة محرف سطر جديد صراحةً. كما تختلف صياغة إدراج قيم الوسائط للعناصر النائبة في سلسلة التنسيق قليلاً بين دالة `printf` في C ودالة `print` في Python.

تستخدم C عناصر التنسيق النائبة نفسها التي تستخدمها Python لتحديد أنواع مختلفة من القيم. ويوضح المثال السابق العناصر النائبة للتنسيق التالية:

```
%g:  placeholder for a float (or double) value
%d:  placeholder for a decimal value (int, short, char)
%s:  placeholder for a string value
```

تدعم C إضافةً إلى ذلك العنصر النائب `%c` لطباعة قيمة محرف. ويُفيد هذا العنصر النائب عندما يريد المبرمج طباعة محرف ASCII المرتبط بترميز عددي معيّن. وفيما يلي مقتطف شيفرة C يطبع `char` بقيمته العددية (`%d`) وترميزه المحرفي (`%c`):

```c
// Example printing a char value as its decimal representation (%d)
// and as the ASCII character that its value encodes (%c)

char ch;

ch = 'A';
printf("ch value is %d which is the ASCII value of  %c\n", ch, ch);

ch = 99;
printf("ch value is %d which is the ASCII value of  %c\n", ch, ch);
```

وعند التشغيل، يبدو ناتج البرنامج هكذا:

```
ch value is 65 which is the ASCII value of  A
ch value is 99 which is the ASCII value of  c
```

### 1.2.2. scanf {#_scanf}

تمثّل دالة `scanf` في C طريقة لقراءة القيم التي يُدخلها المستخدم (عبر لوحة المفاتيح) وتخزينها في متغيّرات البرنامج. وقد تكون دالة `scanf` صارمة بعض الشيء بشأن الصيغة الدقيقة التي يُدخل بها المستخدم البيانات، ما يعني أنها ليست متينة كثيراً أمام إدخال المستخدم السيئ التكوين. وفي [قسم «الإدخال/الإخراج» في الفصل 2](https://diveintosystems.org/book/C2-C_depth/IO.html#_io_in_c)، نناقش طرقاً أكثر متانة لقراءة قيم الإدخال من المستخدم. والآن، تذكّر أنه إذا وقع برنامجك في حلقة لا نهائية بسبب إدخال مستخدم سيئ التكوين، فيمكنك دائماً الضغط على **CTRL-C** لإنهائه.

تُعالَج قراءة الإدخال بصورة مختلفة في Python وC: فتستخدم Python الدالة `input` لقراءة قيمة كسلسلة نصية، ثم يحوّل البرنامج قيمة السلسلة إلى `int`؛ بينما تستخدم C الدالة `scanf` لقراءة قيمة `int` وتخزينها في موقع في الذاكرة لمتغيّر برنامج من نوع `int` (مثلاً `&num1`). ويعرض [الجدول 2](#TabInputComparison) برامج مثالية لقراءة قيم إدخال المستخدم في Python وC:

**الجدول 2. مقارنة طرق قراءة قيم الإدخال في Python وC**

**نسخة Python**

```python
# Python input example

def main():

    num1 = input("Enter a number:")
    num1 = int(num1)
    num2 = input("Enter another:")
    num2 = int(num2)

    print("%d + %d = %d" % (num1, num2, (num1+num2)))

# call the main function:
main()
```

**نسخة C**

```c
/* C input (scanf) example */
#include <stdio.h>

int main(void) {
    int num1, num2;

    printf("Enter a number: ");
    scanf("%d", &num1);
    printf("Enter another: ");
    scanf("%d", &num2);

    printf("%d + %d = %d\n", num1, num2, (num1+num2));

    return 0;
}
```

وعند التشغيل، يقرأ البرنامجان قيمتين (هنا 30 و67):

```
Enter a number: 30
Enter another: 67
30 + 67 = 97
```

مثل `printf`، تأخذ `scanf` سلسلة تنسيق تحدد عدد القيم المراد قراءتها وأنواعها (فمثلاً، يحدد `"%d"` قيمة `int` واحدة). وتتجاوز الدالة `scanf` المسافات البيضاء البادئة واللاحقة أثناء قراءتها قيمة عددية، لذا لا تحتاج سلسلة تنسيقها إلا إلى تسلسل من العناصر النائبة للتنسيق، عادةً دون أي مسافات بيضاء أو محارف تنسيق أخرى بين العناصر النائبة في سلسلة تنسيقها. وتحدد وسائط العناصر النائبة في سلسلة التنسيق *مواقع* متغيّرات البرنامج التي ستُخزَّن فيها القيم المقروءة. ووضع المعامل `&` قبل اسم متغيّر ينتج موقع ذلك المتغيّر في ذاكرة البرنامج — أي عنوان الذاكرة (address) الخاص بالمتغيّر. ويناقش [قسم «المؤشّرات» في الفصل 2](https://diveintosystems.org/book/C2-C_depth/pointers.html#_cs_pointer_variables) المعامل `&` بمزيد من التفصيل. وسنستخدمه الآن فقط في سياق الدالة `scanf`.

وفيما يلي مثال آخر على `scanf`، حيث تحتوي سلسلة التنسيق على عنصرين نائبين لقيمتين، الأولى `int` والثانية `float`:

scanf_ex.c

```c
int x;
float pi;

// read in an int value followed by a float value ("%d%g")
// store the int value at the memory location of x (&x)
// store the float value at the memory location of pi (&pi)
scanf("%d%g", &x, &pi);
```

عند إدخال بيانات إلى برنامج عبر `scanf`، يجب فصل قيم الإدخال العددية الفردية بمحرف مسافة بيضاء واحد على الأقل. غير أنه لما كانت `scanf` تتجاوز محارف المسافات البيضاء البادئة واللاحقة الإضافية (مثل المسافات وعلامات الجدولة والأسطر الجديدة)، فيمكن للمستخدم إدخال القيم بأي مقدار من الفراغ قبل كل قيمة إدخال أو بعدها. فمثلاً، إذا أدخل المستخدم ما يلي للاستدعاء `scanf` في المثال السابق، فستقرأ `scanf` القيمة 8 وتخزّنها في المتغيّر `x`، ثم تقرأ 3.14 وتخزّنها في المتغيّر `pi`:

```
          8                   3.14
```

يوضّح [الجدول 1](#TabIfElseComparison) أن صياغة ودلالات عبارات `if`-`else` في C وPython متشابهة جداً. والفرق النحوي الرئيسي هو أن Python تستخدم المسافات البادئة للإشارة إلى عبارات «الجسم»، بينما تستخدم C الأقواس المعقوفة (لكن ينبغي أن تستخدم المسافات البادئة الجيدة في شيفرتك بلغة C أيضاً).

**الجدول 1. مقارنة صياغة عبارات if-else في Python وC**

**نسخة Python**

```python
# Python if-else example

def main():

    num1 = input("Enter the 1st number:")
    num1 = int(num1)
    num2 = input("Enter the 2nd number:")
    num2 = int(num2)

    if num1 > num2:
        print("%d is biggest" % num1)
        num2 = num1
    else:
        print("%d is biggest" % num2)
        num1 = num2

# call the main function:
main()
```

**نسخة C**

```c
/* C if-else example */
#include <stdio.h>

int main(void) {
    int num1, num2;

    printf("Enter the 1st number: ");
    scanf("%d", &num1);
    printf("Enter the 2nd number: ");
    scanf("%d", &num2);

    if (num1 > num2) {
        printf("%d is biggest\n", num1);
        num2 = num1;
    } else {
        printf("%d is biggest\n", num2);
        num1 = num2;
    }

    return 0;
}
```

صياغة عبارات `if`-`else` في Python وC متطابقة تقريباً مع اختلافات طفيفة فقط. وفي كلتيهما، يكون الجزء `else` اختيارياً. وتدعم Python وC أيضاً التفرّع متعدد الاتجاهات بربط عبارات `if` و`else if`. ويصف ما يلي صياغة `if`-`else` الكاملة في C:

```c
    // a one-way branch:
    if ( <boolean expression> ) {
        <true body>
    }

    // a two-way branch:
    if ( <boolean expression> ) {
        <true body>
    }
    else {
        <false body>
    }

    // a multibranch (chaining if-else if-...-else)
    // (has one or more 'else if' following the first if):
    if ( <boolean expression 1> ) {
        <true body>
    }
    else if ( <boolean expression  2> ) {
        // first expression is false, second is true
        <true 2 body>
    }
    else if ( <boolean expression  3> ) {
        // first and second expressions are false, third is true
        <true 3 body>
    }
    // ... more else if's ...
    else if ( <boolean expression  N> ) {
        // first N-1 expressions are false, Nth is true
        <true N body>
    }
    else { // the final else part is optional
        // if all previous expressions are false
        <false body>
    }
```

### 1.3.1. القيم المنطقية في C {#_boolean_values_in_c}

لا توفّر C نوعاً منطقياً بقيمتي true أو false. وبدلاً من ذلك، تُقيَّم القيم الصحيحة إلى **صواب** أو **خطأ** عند استخدامها في عبارات شرطية. وعند استخدامها في تعبيرات شرطية، فإن أي تعبير صحيح يكون:

- **صفراً (0)** يُقيَّم إلى **خطأ**
- **غير صفري (أي قيمة موجبة أو سالبة)** يُقيَّم إلى **صواب**

تمتلك C مجموعة من المعاملات العلائقية (relational) والمنطقية (logical) للتعبيرات المنطقية.

تأخذ **المعاملات العلائقية** معاملاً أو معاملات من النوع نفسه وتُقيَّم إلى صفر (خطأ) أو قيمة غير صفرية (صواب). ومجموعة المعاملات العلائقية هي:

- التساوي (`==`) وعدم التساوي (not equal، `!=`)
- معاملات المقارنة: أصغر من (``)، وأكبر من أو يساوي (`>=`)

وفيما يلي بعض مقتطفات شيفرة C تعرض أمثلة على المعاملات العلائقية:

```c
// assume x and y are ints, and have been assigned
// values before this point in the code

if (y < 0) {
    printf("y is negative\n");
} else if (y != 0) {
    printf("y is positive\n");
} else {
    printf("y is zero\n");
}

// set x and y to the larger of the two values
if (x >= y) {
    y = x;
} else {
    x = y;
}
```

تأخذ **المعاملات المنطقية** في C معاملاً/معاملات «منطقية» صحيحة وتُقيَّم إلى صفر (خطأ) أو قيمة غير صفرية (صواب). ومجموعة المعاملات المنطقية هي:

- النفي المنطقي (`!`)
- المنطقي «و» (and) (`&&`): يتوقف عن التقييم عند أول تعبير خاطئ (تقييم قصير الدائرة short-circuiting)
- المنطقي «أو» (or) (`||`): يتوقف عن التقييم عند أول تعبير صحيح (تقييم قصير الدائرة)

يوقف التقييم **قصير الدائرة** (short-circuit) لمعاملات C المنطقية تقييم تعبير منطقي حالما تُعرف النتيجة. فمثلاً، إذا قُيِّم المعامل الأول في تعبير «المنطقي و» (`&&`) إلى خطأ، وجب أن تكون نتيجة تعبير `&&` خطأ. ونتيجةً لذلك، لا حاجة لتقييم قيمة المعامل الثاني، وهي لا تُقيَّم فعلاً.

وفيما يلي مثال على عبارات شرطية في C تستخدم معاملات منطقية (من الأفضل دائماً استخدام الأقواس حول التعبيرات المنطقية المعقّدة لتسهيل قراءتها):

```c
if ( (x > 10) && (y >= x) ) {
    printf("y and x are both larger than 10\n");
    x = 13;
} else if ( ((-x) == 10) || (y > x) ) {
    printf("y might be bigger than x\n");
    x = y * x;
} else {
    printf("I have no idea what the relationship between x and y is\n");
}
```

### 1.3.2. الحلقات في C {#_loops_in_c}

مثل Python، تدعم C حلقات `for` و`while`. وبالإضافة إلى ذلك، توفّر C حلقات `do`-`while`.

#### حلقات while {#_while_loops}

صياغة حلقة `while` في C وPython متطابقة تقريباً، والسلوك واحد. ويعرض [الجدول 2](#TabWhileComparison) برامج مثالية لحلقات `while` في C وPython.

**الجدول 2. مقارنة صياغة حلقة while في Python وC**

**نسخة Python**

```python
# Python while loop example

def main():

    num = input("Enter a value: ")
    num = int(num)
    # make sure num is not negative
    if num < 0:
        num = -num

    val = 1
    while val < num:
        print("%d" % (val))
        val = val * 2

# call the main function:
main()
```

**نسخة C**

```c
/* C while loop example */
#include <stdio.h>

int main(void) {
    int num, val;

    printf("Enter a value: ");
    scanf("%d", &num);
    // make sure num is not negative
    if (num < 0) {
        num = -num;
    }
    val = 1;
    while (val < num) {
        printf("%d\n", val);
        val = val * 2;
    }

    return 0;
}
```

صياغة حلقة `while` في C شبيهة جداً بصياغتها في Python، وكلتاهما تُقيَّمان بالطريقة نفسها:

```c
while ( <boolean expression> ) {
    <true body>
}
```

تفحص حلقة `while` التعبير المنطقي أولاً وتنفّذ الجسم إذا كان صحيحاً. وفي البرنامج المثال السابق، ستُطبع قيمة المتغيّر `val` مراراً في حلقة `while` حتى تصبح قيمته أكبر من قيمة المتغيّر `num`. وإذا أدخل المستخدم `10`، فسيطبع برنامجا C وPython:

```
1
2
4
8
```

تمتلك C أيضاً حلقة `do`-`while` شبيهة بحلقة `while` فيها، لكنها تنفّذ جسم الحلقة أولاً ثم تفحص شرطاً وتكرّر تنفيذ جسم الحلقة ما دام الشرط صحيحاً. أي أن حلقة `do`-`while` ستُنفِّذ جسم الحلقة مرة واحدة على الأقل دائماً:

```c
do {
    <body>
} while ( <boolean expression> );
```

لمزيد من أمثلة حلقات `while`، جرّب هذين البرنامجين:

- [whileLoop1.c](https://diveintosystems.org/book/C1-C_intro/_attachments/whileLoop1.c)
- [whileLoop2.c](https://diveintosystems.org/book/C1-C_intro/_attachments/whileLoop2.c)

#### حلقات for {#_for_loops}

تختلف حلقة `for` في C عنها في Python. ففي Python، حلقات `for` تكرارات على متتاليات، بينما في C تكون حلقات `for` تراكيب حلقية أعم. ويعرض [الجدول 3](#TabForComparison) برامج مثالية تستخدم حلقات `for` لطباعة كل القيم بين 0 ورقم إدخال يقدمه المستخدم:

**الجدول 3. مقارنة صياغة حلقة for في Python وC**

**نسخة Python**

```python
# Python for loop example

def main():

    num = input("Enter a value: ")
    num = int(num)
    # make sure num is not negative
    if num < 0:
        num = -num

    for i in range(num):
        print("%d" % i)

# call the main function:
main()
```

**نسخة C**

```c
/* C for loop example */
#include <stdio.h>

int main(void) {
    int num, i;

    printf("Enter a value: ");
    scanf("%d", &num);
    // make sure num is not negative
    if (num < 0) {
        num = -num;
    }

    for (i = 0; i < num; i++) {
        printf("%d\n", i);
    }

    return 0;
}
```

في هذا المثال، يمكنك أن ترى أن صياغة حلقة `for` في C مختلفة تماماً عن صياغة حلقة `for` في Python. وهي تُقيَّم أيضاً على نحو مختلف.

صياغة حلقة `for` في C هي:

```c
for ( <initialization>; <boolean expression>; <step> ) {
    <body>
}
```

وقواعد تقييم حلقة `for` هي:

1. قيّم *التهيئة* مرة واحدة عند الدخول إلى الحلقة أول مرة.
2. قيّم *التعبير المنطقي*. إذا كان 0 (خطأ)، اخرج من حلقة `for` (أي انتهى البرنامج من تكرار عبارات جسم الحلقة).
3. قيّم العبارات داخل *جسم* الحلقة.
4. قيّم تعبير *الخطوة*.
5. أعد من الخطوة (2).

وفيما يلي مثال بسيط على حلقة `for` لطباعة القيم 0 و1 و2:

```c
int i;

for (i = 0; i < 3; i++) {
    printf("%d\n", i);
}
```

ويؤدي تنفيذ قواعد تقييم حلقة `for` على الحلقة السابقة إلى تسلسل الإجراءات التالي:

```
(1) eval init: i is set to 0  (i=0)
(2) eval bool expr: i < 3 is true
(3) execute loop body: print the value of i (0)
(4) eval step: i is set to 1  (i++)
(2) eval bool expr: i < 3 is true
(3) execute loop body: print the value of i (1)
(4) eval step: i is set to 2  (i++)
(2) eval bool expr: i < 3 is true
(3) execute loop body: print the value of i (2)
(4) eval step: i is set to 3  (i++)
(2) eval bool expr: i < 3 is false, drop out of the for loop
```

يعرض البرنامج التالي مثالاً أكثر تعقيداً على حلقة `for` (وهو أيضاً [متاح للتنزيل](https://diveintosystems.org/book/C1-C_intro/_attachments/forLoop2.c)). لاحظ أنه رغم دعم C لحلقات `for` بقائمة عبارات لجزأي *التهيئة* و*الخطوة*، فمن الأفضل إبقاؤها بسيطة (يوضح هذا المثال صياغة أكثر تعقيداً لحلقة `for`، لكن قراءة حلقة `for` وفهمها سيكونان أسهل لو بُسّطت بنقل عبارة الخطوة `j += 10` إلى نهاية جسم الحلقة والاكتفاء بعبارة خطوة واحدة، `i += 1`).

```c
/* An example of a more complex for loop which uses multiple variables.
 * (it is unusual to have for loops with multiple statements in the
 * init and step parts, but C supports it and there are times when it
 * is useful...don't go nuts with this just because you can)
 */
#include <stdio.h>

int main(void) {
    int i, j;

    for (i=0, j=0; i < 10; i+=1, j+=10) {
        printf("i+j = %d\n", i+j);
    }

    return 0;
}

// the rules for evaluating a for loop are the same no matter how
// simple or complex each part is:
// (1) evaluate the initialization statements once on the first
//     evaluation of the for loop:  i=0 and j=0
// (2) evaluate the boolean condition: i < 10
//     if false (when i is 10), drop out of the for loop
// (3) execute the statements inside the for loop body: printf
// (4) evaluate the step statements:  i += 1, j += 10
// (5) repeat, starting at step (2)
```

في C، حلقات `for` وحلقات `while` متكافئة في القوة، أي يمكن التعبير عن أي حلقة `while` كحلقة `for`، والعكس صحيح. وهذا ليس صحيحاً في Python، حيث حلقات `for` تكرارات على متتالية من القيم. وبذلك لا يمكنها التعبير عن بعض سلوكيات التكرار التي تستطيع حلقة `while` الأعم في Python التعبير عنها. والحلقات غير المحددة (indefinite loops) مثال واحد لا يمكن كتابته في Python إلا كحلقة `while`.

تأمّل حلقة `while` التالية في C:

```c
int guess = 0;

while (guess != num) {
    printf("%d is not the right number\n", guess);
    printf("Enter another guess: ");
    scanf("%d", &guess);
}
```

يمكن ترجمة هذه الحلقة إلى حلقة `for` مكافئة في C:

```c
int guess;

for (guess = 0; guess != num; ) {
    printf("%d is not the right number\n", guess);
    printf("Enter another guess: ");
    scanf("%d", &guess);
}
```

أما في Python، فلا يمكن التعبير عن هذا النوع من سلوك التكرار إلا باستخدام حلقة `while`.

ولأن حلقات `for` و`while` متساوية في قوة التعبير في C، فلا حاجة إلا إلى تركيب حلقي واحد في اللغة. غير أن حلقات `for` تركيب لغوي أكثر طبيعية للحلقات المحددة (definite) (مثل التكرار على مدى من القيم)، بينما حلقات `while` تركيب لغوي أكثر طبيعية للحلقات غير المحددة (مثل التكرار حتى يُدخل المستخدم عدداً زوجياً). ونتيجةً لذلك، توفّر C التركيبين للمبرمجين.

تقسّم الدوال الشيفرة إلى أجزاء قابلة للإدارة وتقلّل تكرار الشيفرة. وقد تأخذ الدوال صفراً أو أكثر من **الوسائط** (parameters) كمدخل، و**تُرجع** قيمة واحدة من نوع محدد. ويحدد **إعلان** الدالة أو **النموذج الأولي** (prototype) اسم الدالة ونوع إرجاعها وقائمة وسائطها (عدد الوسائط وأنواعها جميعاً). ويتضمن **تعريف** الدالة الشيفرة التي تُنفَّذ عند استدعاء الدالة. ويجب الإعلان عن جميع الدوال في C قبل استدعائها. ويمكن فعل ذلك بالإعلان عن نموذج أولي للدالة أو بتعريف الدالة كاملة قبل استدعائها:

```javascript
// function definition format:
// ---------------------------
<return type> <function name> (<parameter list>)
{
    <function body>
}

// parameter list format:
// ---------------------
<type> <param1 name>, <type> <param2 name>, ...,  <type> <last param name>
```

وفيما يلي مثال على تعريف دالة. لاحظ أن التعليقات تصف ما تفعله الدالة، وتفاصيل كل وسيط (الغرض منه وما ينبغي تمريره إليه)، وما تُرجعه الدالة:

```c
/* This program computes the larger of two
 * values entered by the user.
 */
#include <stdio.h>

/* max: computes the larger of two integer values
 *   x: one integer value
 *   y: the other integer value
 *   returns: the larger of x and y
 */
int max(int x, int y) {
    int bigger;

    bigger = x;
    if (y > x) {
        bigger = y;
    }
    printf("  in max, before return x: %d y: %d\n", x, y);
    return bigger;
}
```

أما الدوال التي لا تُرجع قيمة فينبغي أن تحدد نوع الإرجاع `void`. وفيما يلي مثال على دالة `void`:

```c
/* prints out the squares from start to stop
 *   start: the beginning of the range
 *   stop: the end of the range
 */
void print_table(int start, int stop) {
    int i;

    for (i = start; i <= stop; i++) {
        printf("%d\t", i*i);
    }
    printf("\n");
}
```

كما في أي لغة برمجة تدعم الدوال أو الإجراءات، يستدعي **استدعاء الدالة** دالةً، ويمرّر قيم وسائط محددة لذلك الاستدعاء. وتُستدعى الدالة باسمها وتُمرَّر إليها الوسائط، بوسيط واحد لكل وسيط مقابل في الدالة. وفي C، يبدو استدعاء الدالة هكذا:

```javascript
// function call format:
// ---------------------
function_name(<argument list>);

// argument list format:
// ---------------------
<argument 1 expression>, <argument 2 expression>, ...,  <last argument expression>
```

تُمرَّر الوسائط إلى دوال C **بالقيمة** (by value): يُسنَد إلى كل وسيط في الدالة *قيمة* الوسيط المقابل الممرَّر إليه في استدعاء الدالة من المستدعي. وتعني دلالات التمرير بالقيمة أن أي تغيير في قيمة وسيط داخل الدالة (أي إسناد قيمة جديدة لوسيط في الدالة) *لا يظهر* للمستدعي.

وفيما يلي بعض أمثلة استدعاءات الدالتين `max` و`print_table` المذكورتين سابقاً:

```c
int val1, val2, result;

val1 = 6;
val2 = 10;

/* to call max, pass in two int values, and because max returns an
   int value, assign its return value to a local variable (result)
 */
result = max(val1, val2);     /* call max with argument values 6 and 10 */
printf("%d\n", result);       /* prints out 10 */

result = max(11, 3);          /* call max with argument values 11 and 3 */
printf("%d\n", result);       /* prints out 11 */

result = max(val1 * 2, val2); /* call max with argument values 12 and 10 */
printf("%d\n", result);       /* prints out 12 */

/* print_table does not return a value, but takes two arguments */
print_table(1, 20);           /* prints a table of values from 1 to 20 */
print_table(val1, val2);      /* prints a table of values from 6 to 10 */
```

وفيما يلي مثال آخر على برنامج كامل يعرض استدعاءً لتنفيذ مختلف قليلاً لدالة `max` فيه عبارة إضافية لتغيير قيمة وسيطها (`x = y`):

```c
/* max: computes the larger of two int values
 *   x: one value
 *   y: the other value
 *   returns: the larger of x and y
 */
int max(int x, int y) {
    int bigger;

    bigger = x;
    if (y > x) {
        bigger = y;
        // note: changing the parameter x's value here will not
        //       change the value of its corresponding argument
        x = y;
    }
    printf("  in max, before return x: %d y: %d\n", x, y);

    return bigger;
}

/* main: shows a call to max */
int main(void) {
    int a, b, res;

    printf("Enter two integer values: ");
    scanf("%d%d", &a, &b);

    res = max(a, b);
    printf("The larger value of %d and %d is %d\n", a, b, res);

    return 0;
}
```

يوضح الناتج التالي كيف قد تبدو إحدى تشغيلتي هذا البرنامج. لاحظ الفرق في الوسيط `x` (المطبوع من داخل الدالة `max`) في التشغيلتين. وبشكل خاص، لاحظ أن تغيير قيمة الوسيط `x` في التشغيل الثاني *لا* يؤثر في المتغيّر الذي مُرِّر وسيطاً إلى `max` بعد عودة الاستدعاء:

```bash
$ ./a.out
Enter two integer values: 11  7
  in max, before return x: 11 y: 7
The larger value of 11 and 7 is 11

$ ./a.out
Enter two integer values: 13  100
  in max, before return x: 100 y: 100
The larger value of 13 and 100 is 100
```

ولأن الوسائط *تُمرَّر بالقيمة* إلى الدوال، فإن النسخة السابقة من دالة `max` التي تغيّر إحدى قيم وسائطها تسلك السلوك نفسه الذي تسلكه النسخة الأصلية من `max` التي لا تغيّرها.

### 1.4.1. المكدّس {#_the_stack}

يتتبع **مكدّس التنفيذ** (execution stack) حالة الدوال النشطة في البرنامج. وينشئ كل استدعاء دالة **إطار مكدّس** جديداً (stack frame) (يُسمى أحياناً **إطار التنشيط** أو **سجل التنشيط**) يحتوي على قيم وسائطه ومتغيّراته المحلية. والإطار الموجود في أعلى المكدّس هو الإطار النشط؛ وهو يمثّل تنشيط الدالة الجاري تنفيذه، ولا تكون في النطاق إلا متغيّراته ووسائطه المحلية. وعند استدعاء دالة، يُنشأ لها إطار مكدّس جديد (*يُدفع* pushed إلى أعلى المكدّس)، وتُخصَّص مساحة لمتغيّراته ووسائطه المحلية في الإطار الجديد. وعندما ترجع دالة، يُزال إطار مكدّسها من المكدّس (*يُفرقع* popped من أعلى المكدّس)، تاركاً إطار مكدّس المستدعي في أعلى المكدّس.

في البرنامج المثال السابق، عند النقطة من تنفيذه قبل تنفيذ `max` للعبارة `return` مباشرة، سيبدو مكدّس التنفيذ كما في [الشكل 1](#FigFunctionSimple). تذكّر أن قيم الوسائط الممرَّرة إلى `max` عبر `main` *تُمرَّر بالقيمة*، أي أن الوسيطين في `max`، وهما `x` و`y`، يُسنَد إليهما قيم الوسائط المقابلة لهما، `a` و`b` من الاستدعاء في `main`. فرغم أن دالة `max` تغيّر قيمة `x`، فإن التغيير لا يؤثر في قيمة `a` في `main`.

![A stack with two frames: main at the bottom, and max on top of it. Main’s stack frame has three variables, a (11), b (7) and res (undefined at this point). Max’s stack frame also has three variables, x (11), y (7), and bigger (11).](https://diveintosystems.org/images/dive-into-systems/c1-intro-0-Function_simple.webp){#FigFunctionSimple} الشكل 1. محتويات مكدّس التنفيذ قبل العودة من دالة max مباشرة

يتضمن البرنامج الكامل التالي دالتين ويعرض أمثلة على استدعائهما من الدالة `main`. وفي هذا البرنامج، نعلن نموذجين أوليين للدالتين `max` و`print_table` فوق الدالة `main` حتى تستطيع `main` الوصول إليهما رغم تعريفهما أولاً. وتحتوي الدالة `main` على الخطوات عالية المستوى للبرنامج الكامل، وتعريفها أولاً يعكس التصميم من أعلى إلى أسفل للبرنامج. ويتضمن هذا المثال تعليقات تصف أجزاء البرنامج المهمة للدوال واستدعاءاتها. ويمكنك أيضاً تنزيل [البرنامج الكامل](https://diveintosystems.org/book/C1-C_intro/_attachments/function.c) وتشغيله.

```c
/* This file shows examples of defining and calling C functions.
 * It also demonstrates using scanf().
 */

#include <stdio.h>

/* This is an example of a FUNCTION PROTOTYPE.  It declares just the type
 * information for a function (the function's name, return type, and parameter
 * list). A prototype is used when code in main wants to call the function
 * before its full definition appears in the file.
 */
int max(int n1, int n2);

/* A prototype for another function.  void is the return type of a function
 * that does not return a value
 */
void print_table(int start, int stop);

/* All C programs must have a main function.  This function defines what the
 * program does when it begins executing, and it's typically used to organize
 * the big-picture behavior of the program.
 */
int main(void) {
    int x, y, larger;

    printf("This program will operate over two int values.\n");

    printf("Enter the first value: ");
    scanf("%d", &x);

    printf("Enter the second value: ");
    scanf("%d", &y);

    larger = max(x, y);

    printf("The larger of %d and %d is %d\n", x, y, larger);

    print_table(x, larger);

    return 0;
}

/* This is an example of a FUNCTION DEFINITION.  It specifies not only the
 * function name and type, but it also fully defines the code of its body.
 * (Notice, and emulate, the complete function comment!)
 */
/* Computes the max of two integer values.
 *   n1: the first value
 *   n2: the other value
 *   returns: the larger of n1 and n2
 */
int max(int n1, int n2)  {
    int result;

    result = n1;

    if (n2 > n1) {
        result = n2;
    }

    return result;
}

/* prints out the squares from start to stop
 *   start: the beginning of the range
 *   stop: the end of the range
 */
void print_table(int start, int stop) {
    int i;

    for (i = start; i <= stop; i++) {
        printf("%d\t", i*i);
    }

    printf("\n");
}
```

**المصفوفة** (array) تركيب في C ينشئ مجموعة مرتبة من عناصر بيانات من النوع نفسه ويربط هذه المجموعة بمتغيّر برنامج واحد. وتعني **المرتبة** أن كل عنصر في موضع محدد من مجموعة القيم (أي يوجد عنصر في الموضع 0 والموضع 1 وهكذا)، لا أن القيم مرتبة بالضرورة. والمصفوفات إحدى الآليات الأساسية في C لتجميع قيم بيانات متعددة والإشارة إليها باسم واحد. وللمصفوفات عدة أنواع، لكن الشكل الأساسي هو *المصفوفة أحادية البعد*، وهي مفيدة لتنفيذ بنى بيانات شبيهة بالقوائم والسلاسل النصية في C.

### 1.5.1. مقدمة إلى المصفوفات {#_introduction_to_arrays}

يمكن لمصفوفات C تخزين قيم بيانات متعددة من النوع *نفسه*. وفي هذا الفصل، نناقش المصفوفات **المعلَنة ساكنةً**، أي أن السعة الكلية (أقصى عدد من العناصر يمكن تخزينه في مصفوفة) ثابتة وتُحدَّد عند الإعلان عن متغيّر المصفوفة. وفي الفصل التالي، نناقش [المصفوفات المخصَّصة ديناميكياً](https://diveintosystems.org/book/C2-C_depth/arrays.html#_dynamically_allocated) و[المصفوفات متعددة الأبعاد](https://diveintosystems.org/book/C2-C_depth/arrays.html#_two_dimensional_arrays).
يعرض [الجدول 1](#TabArrayComparison) نسختي Python وC لبرنامج يهيّئ مجموعة من القيم الصحيحة ثم يطبعها. وتستخدم نسخة Python نوع القائمة (list) المدمج فيها لتخزين قائمة القيم، بينما تستخدم نسخة C مصفوفة من نوع `int` لتخزين مجموعة القيم.

بشكل عام، توفّر Python للمبرمج واجهة قائمة عالية المستوى تخفي كثيراً من تفاصيل التنفيذ منخفض المستوى. أما C، في المقابل، فتكشف للمبرمج تنفيذاً منخفض المستوى للمصفوفة وتترك له تنفيذ الوظائف عالية المستوى. وبعبارة أخرى، تتيح المصفوفات تخزيناً منخفض المستوى للبيانات دون وظائف القوائم عالية المستوى، مثل `len` و`append` و`insert` وهكذا.

**الجدول 1. مقارنة صياغة القوائم في Python والمصفوفات في C**

**نسخة Python**

```python
# An example Python program using a list.

def main():

    # create an empty list
    my_lst = []

    # add 10 integers to the list
    for i in range(10):
        my_lst.append(i)

    # set value at position 3 to 100
    my_lst[3] = 100

    # print the number of list items
    print("list %d items:" % len(my_lst))

    # print each element of the list
    for i in range(10):
        print("%d" % my_lst[i])

# call the main function:
main()
```

**نسخة C**

```c
/* An example C program using an array. */
#include <stdio.h>

int main(void) {
    int i, size = 0;

    // declare array of 10 ints
    int my_arr[10];

    // set the value of each array element
    for (i = 0; i < 10; i++) {
        my_arr[i] = i;
        size++;
    }

    // set value at position 3 to 100
    my_arr[3] = 100;

    // print the number of array elements
    printf("array of %d items:\n", size);

    // print each element of the array
    for (i = 0; i < 10; i++) {
        printf("%d\n", my_arr[i]);
    }

    return 0;
}
```

لنسختي C وPython من هذا البرنامج أوجه تشابه عدة، أبرزها أنه يمكن الوصول إلى العناصر الفردية عبر **الفهرسة** (indexing)، وأن قيم الفهارس تبدأ من `0`. أي أن اللغتين تشيران إلى العنصر الأول في المجموعة باعتباره العنصر في الموضع `0`.

تتعلق الفروق الرئيسية بين نسختي C وPython من هذا البرنامج بسعة القائمة أو المصفوفة وبكيفية تحديد أحجامهما (عدد العناصر).

لقائمة Python:

```python
my_lst[3] = 100   # Python syntax to set the element in position 3 to 100.

my_lst[0] = 5     # Python syntax to set the first element to 5.
```

لمصفوفة C:

```c
my_arr[3] = 100;  // C syntax to set the element in position 3 to 100.

my_arr[0] = 5;    // C syntax to set the first element to 5.
```

في نسخة Python، لا يحتاج المبرمج إلى تحديد سعة القائمة مسبقاً: إذ تزيد Python سعة القائمة تلقائياً حسب حاجة البرنامج. فمثلاً، تزيد الدالة `append` في Python حجم قائمة Python تلقائياً وتضيف القيمة الممرَّرة إلى نهايتها.

في المقابل، عند الإعلان عن متغيّر مصفوفة في C، يجب على المبرمج تحديد نوعها (نوع كل قيمة مخزّنة في المصفوفة) وسعتها الكلية (أقصى عدد من مواقع التخزين). فمثلاً:

```c
int  arr[10];  // declare an array of 10 ints

char str[20];  // declare an array of 20 chars
```

تُنشئ التعريفات السابقة متغيّراً باسم `arr`، هو مصفوفة من قيم `int` بسعة كلية 10، ومتغيّراً آخر باسم `str`، هو مصفوفة من قيم `char` بسعة كلية 20.

لحساب حجم قائمة (حيث يعني الحجم العدد الكلي للقيم في القائمة)، توفّر Python دالة `len` ترجع حجم أي قائمة تُمرَّر إليها. أما في C، فعلى المبرمج أن يتتبع صراحةً عدد العناصر في المصفوفة (مثلاً، المتغيّر `size` في [الجدول 1](#TabArrayComparison)).

وثمة فرق آخر قد لا يظهر من النظر إلى نسختي Python وC من هذا البرنامج، وهو كيفية تخزين قائمة Python ومصفوفة C في الذاكرة. فـ C تفرض تخطيط المصفوفة في ذاكرة البرنامج، بينما تخفي Python كيفية تنفيذ القوائم عن المبرمج. وفي C، تُخصَّص عناصر المصفوفة الفردية في مواقع متتالية في ذاكرة البرنامج. فمثلاً، يقع موضع المصفوفة الثالث في الذاكرة مباشرة بعد موضع المصفوفة الثاني ومباشرة قبل موضع المصفوفة الرابع.

### 1.5.2. طرق الوصول إلى المصفوفة {#_array_access_methods}

توفّر Python طرقاً متعددة للوصول إلى العناصر في قوائمها. أما C فلا تدعم إلا الفهرسة، كما وصفنا سابقاً. وتتراوح قيم الفهارس الصالحة من 0 إلى سعة المصفوفة ناقص 1. وفيما يلي بعض الأمثلة:

```c
int i, num;
int arr[10];  // declare an array of ints, with a capacity of 10

num = 6;      // keep track of how many elements of arr are used

// initialize first 5 elements of arr (at indices 0-4)
for (i=0; i < 5; i++) {
    arr[i] = i * 2;
}

arr[5] = 100; // assign the element at index 5 the value 100
```

يعلن هذا المثال المصفوفة بسعة 10 (لها 10 عناصر)، لكنه لا يستخدم إلا العناصر الستة الأولى (مجموعة قيمنا الحالية حجمها 6، لا 10). وكثيراً ما يبقى جزء من سعة المصفوفة غير مستخدم عند استخدام المصفوفات المعلَنة ساكنةً. ونتيجةً لذلك، نحتاج إلى متغيّر برنامج آخر لتتبع الحجم الفعلي (عدد العناصر) في المصفوفة (`num` في هذا المثال).

تختلف Python وC في أساليب معالجة الأخطاء عندما يحاول برنامج الوصول إلى فهرس غير صالح. فـ Python تطرح استثناء `IndexError` إذا استُخدمت قيمة فهرس غير صالحة للوصول إلى عناصر قائمة (مثلاً، الفهرسة بما يتجاوز عدد عناصر القائمة). أما في C، فعلى المبرمج ضمان ألا تستخدم شيفرته إلا قيم فهارس صالحة عند الفهرسة في المصفوفات. ونتيجةً لذلك، فإن سلوك التشغيل لشيفرة كالتالية تصل إلى عنصر مصفوفة بما يتجاوز حدود المصفوفة المخصَّصة يكون غير معرّف:

```c
int array[10];   // an array of size 10 has valid indices 0 through 9

array[10] = 100;  // 10 is not a valid index into the array
```

يسعد مصرّف C بتصريف شيفرة تصل إلى مواضع مصفوفة تتجاوز حدود المصفوفة؛ فلا يوجد فحص للحدود من المصرّف ولا عند التشغيل. ونتيجةً لذلك، قد يؤدي تشغيل هذه الشيفرة إلى سلوك غير متوقّع للبرنامج (وقد يختلف السلوك من تشغيل لآخر). وقد يؤدي إلى انهيار برنامجك، أو قد يغيّر قيمة متغيّر آخر، أو قد لا يكون له أي أثر في سلوك برنامجك. وبعبارة أخرى، يؤدي هذا الوضع إلى خطأ برمجي قد يظهر أو لا يظهر كسلوك غير متوقّع. لذا، بصفتك مبرمج C، عليك أنت ضمان أن تشير وصولاتك إلى المصفوفة إلى مواضع صالحة!

### 1.5.3. المصفوفات والدوال {#_arrays_and_functions}

تتشابه دلالات تمرير المصفوفات إلى الدوال في C مع دلالات تمرير القوائم إلى الدوال في Python: إذ يمكن للدالة تغيير العناصر في المصفوفة أو القائمة الممرَّرة. وفيما يلي مثال على دالة تأخذ وسيطين: وسيط مصفوفة `int` (`arr`)، ووسيط `int` (`size`):

```c
void print_array(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++) {
        printf("%d\n", arr[i]);
    }
}
```

تخبر `[]` بعد اسم الوسيط المصرّفَ بأن نوع الوسيط `arr` هو **مصفوفة من int**، لا `int` كما في الوسيط `size`. وسنعرض في الفصل التالي صياغة بديلة لتحديد وسائط المصفوفات. ولا تُحدَّد سعة وسيط المصفوفة `arr`: فـ `arr[]` تعني أنه يمكن استدعاء هذه الدالة بوسيط مصفوفة بأي سعة. ولأنه لا سبيل للحصول على حجم المصفوفة أو سعتها من متغيّر المصفوفة وحده، فإن الدوال التي تُمرَّر إليها مصفوفات تمتلك دائماً تقريباً وسيطاً ثانياً يحدد حجم المصفوفة (وسيط `size` في المثال السابق).

لاستدعاء دالة لها وسيط مصفوفة، مرّر **اسم المصفوفة** كوسيط. وفيما يلي مقتطف شيفرة C يحتوي على استدعاءات مثالية لدالة `print_array`:

```c
int some[5], more[10], i;

for (i = 0; i < 5; i++) {  // initialize the first 5 elements of both arrays
    some[i] = i * i;
    more[i] = some[i];
}

for (i = 5; i < 10; i++) { // initialize the last 5 elements of "more" array
    more[i] = more[i-1] + more[i-2];
}

print_array(some, 5);    // prints all 5 values of "some"
print_array(more, 10);   // prints all 10 values of "more"
print_array(more, 8);    // prints just the first 8 values of "more"
```

في C، يكافئ اسم متغيّر المصفوفة **عنوان الأساس** (base address) للمصفوفة (أي موقع الذاكرة الخاص بالعنصر رقم 0 فيها). وبسبب دلالات استدعاء الدوال *بالتمرير بالقيمة* في C، فعند تمرير مصفوفة إلى دالة، *لا* يُمرَّر كل عنصر من عناصر المصفوفة على حدة إلى الدالة. وبعبارة أخرى، لا تتلقى الدالة نسخة من كل عنصر من عناصر المصفوفة. وبدلاً من ذلك، يحصل وسيط المصفوفة على *قيمة عنوان أساس المصفوفة*. ويعني هذا السلوك أن تغيير دالة لعناصر مصفوفة مُرِّرت كوسيط *سيبقى* بعد عودة الدالة. فمثلاً، تأمّل مقتطف برنامج C هذا:

```c
void test(int a[], int size) {
    if (size > 3) {
        a[3] = 8;
    }
    size = 2; // changing parameter does NOT change argument
}

int main(void) {
    int arr[5], n = 5, i;

    for (i = 0; i < n; i++) {
        arr[i] = i;
    }

    printf("%d %d", arr[3], n);  // prints: 3 5

    test(arr, n);
    printf("%d %d", arr[3], n);  // prints: 8 5

    return 0;
}
```

يُمرَّر إلى الاستدعاء `main` للدالة `test` الوسيط `arr`، الذي قيمته عنوان أساس مصفوفة `arr` في الذاكرة. ويتلقى الوسيط `a` في دالة test نسخة من قيمة عنوان الأساس هذه. وبعبارة أخرى، *يشير الوسيط `a` إلى مواقع التخزين نفسها التي تشير إليها وسيطته* `arr`. ونتيجةً لذلك، عندما تغيّر دالة test قيمة مخزّنة في مصفوفة `a` (`a[3] = 8`)، فإن ذلك يؤثر في الموضع المقابل في مصفوفة الوسيط (أصبح `arr[3]` يساوي 8). والسبب أن قيمة `a` هي عنوان أساس `arr`، وقيمة `arr` هي عنوان أساس `arr`، لذا يشير كل من `a` و`arr` إلى المصفوفة نفسها (مواقع التخزين نفسها في الذاكرة)! ويعرض [الشكل 1](#FigArrayStack) محتويات المكدّس عند النقطة من التنفيذ قبل عودة دالة test مباشرة.

![A stack with two frames: main at the bottom and test on the top. main has two variables, an integer n (5) and an array storing values 0, 1, 2, 8, and 4. Test also has two values, an integer size (2) and an array parameter arr that stores the base memory address of the array in main’s stack frame.](https://diveintosystems.org/images/dive-into-systems/c1-intro-0-arraystack.webp){#FigArrayStack} الشكل 1. محتويات المكدّس لدالة لها وسيط مصفوفة

يُمرَّر إلى الوسيط `a` عنوان أساس مصفوفة الوسيط `arr`، ما يعني أن كليهما يشير إلى مجموعة مواقع التخزين نفسها في الذاكرة. ونشير إلى ذلك بالسهم من `a` إلى `arr`. والقيم التي تعدّلها الدالة `test` مظللة. ولا *يغيّر* تغيير قيمة الوسيط `size` قيمة وسيطته المقابلة `n`، لكن تغيير قيمة أحد العناصر التي يشير إليها `a` (مثلاً `a[3] = 8`) يؤثر في قيمة الموضع المقابل في `arr`.

### 1.5.4. مقدمة إلى السلاسل النصية ومكتبة سلاسل C {#_introduction_to_strings_and_the_c_string_library}

تنفّذ Python نوع سلسلة نصية وتوفّر واجهة غنية لاستخدام السلاسل، لكن لا يوجد في C نوع سلسلة نصية مقابل. وبدلاً من ذلك، تُنفَّذ السلاسل النصية كمصفوفات من قيم `char`. وليست كل مصفوفة محارف تُستخدم كسلسلة C، لكن كل سلسلة C هي مصفوفة محارف.

تذكّر أن المصفوفات في C قد تُعرَّف بحجم أكبر مما يستخدمه البرنامج فعلاً. فمثلاً، رأينا سابقاً في قسم [«طرق الوصول إلى المصفوفة»](#_array_access_methods) أننا قد نعلن مصفوفة بحجم 10 لكن نستخدم المواضع الستة الأولى فقط. ولهذا السلوك دلالات مهمة على السلاسل النصية: فلا يمكننا افتراض أن طول السلسلة النصية يساوي طول المصفوفة التي تخزّنها. ولهذا السبب، يجب أن تنتهي السلاسل النصية في C بقيمة محرف خاص، هي **المحرف الفارغ** (null character) (`'\0'`)، للدلالة على نهاية السلسلة.

يُقال إن السلاسل النصية التي تنتهي بمحرف فارغ **منتهية بمحرف فارغ** (null-terminated). ورغم أن جميع السلاسل النصية في C *ينبغي* أن تكون منتهية بمحرف فارغ، فإن عدم مراعاة المحارف الفارغة بشكل صحيح مصدر شائع للأخطاء لدى مبرمجي C المبتدئين. وعند استخدام السلاسل النصية، من المهم أن تضع في اعتبارك أن مصفوفات المحارف يجب أن تُعلَن بسعة كافية لتخزين كل قيمة محرف في السلسلة إضافة إلى المحرف الفارغ (`'\0'`). فمثلاً، لتخزين السلسلة النصية `"hi"`، تحتاج إلى مصفوفة من ثلاثة محارف على الأقل (واحد لتخزين `'h'`، وواحد لتخزين `'i'`، وواحد لتخزين `'\0'`).

ولأن السلاسل النصية شائعة الاستخدام، توفّر C مكتبة سلاسل نصية تحتوي على دوال للتلاعب بالسلاسل. ويجب على البرامج التي تستخدم دوال مكتبة السلاسل هذه تضمين الترويسة `string.h`.

عند طباعة قيمة سلسلة نصية بـ `printf`، استخدم العنصر النائب `%s` في سلسلة التنسيق. وستطبع الدالة `printf` كل المحارف في وسيط المصفوفة حتى تصادف المحرف `'\0'`. وبالمثل، كثيراً ما تحدد دوال مكتبة السلاسل نهاية سلسلة بالبحث عن المحرف `'\0'` أو تضيف المحرف `'\0'` إلى نهاية أي سلسلة تعدّلها.

وفيما يلي برنامج مثال يستخدم السلاسل النصية ودوال مكتبة السلاسل:

```c
#include <stdio.h>
#include <string.h>   // include the C string library

int main(void) {
    char str1[10];
    char str2[10];
    int len;

    str1[0] = 'h';
    str1[1] = 'i';
    str1[2] = '\0';

    len = strlen(str1);

    printf("%s %d\n", str1, len);  // prints: hi 2

    strcpy(str2, str1);     // copies the contents of str1 to str2
    printf("%s\n", str2);   // prints:  hi

    strcpy(str2, "hello");  // copy the string "hello" to str2
    len = strlen(str2);
    printf("%s has %d chars\n", str2, len);   // prints: hello has 5 chars
}
```

ترجع الدالة `strlen` في مكتبة سلاسل C عدد المحارف في وسيطها من نوع سلسلة نصية. ولا يُحتسب المحرف الفارغ الذي تنتهي به السلسلة جزءاً من طول السلسلة، لذا يرجع الاستدعاء `strlen(str1)` القيمة 2 (طول السلسلة `"hi"`). وتنسخ الدالة `strcpy` محرفاً واحداً في كل مرة من سلسلة مصدر (الوسيط الثاني) إلى سلسلة وجهة (الوسيط الأول) حتى تصل إلى محرف فارغ في المصدر.

لاحظ أن معظم دوال مكتبة سلاسل C تتوقع أن يمرّر الاستدعاء مصفوفة محارف ذات سعة كافية لتؤدي الدالة عملها. فمثلاً، لا تريد استدعاء `strcpy` بسلسلة وجهة ليست كبيرة بما يكفي لاحتواء المصدر؛ فذلك سيؤدي إلى سلوك غير معرّف في برنامجك!

تشترط دوال مكتبة سلاسل C أيضاً أن تكون قيم السلاسل الممرَّرة إليها مكوَّنة تكويناً صحيحاً، بمحرف `'\0'` في نهايتها. وعليك أنت بصفتك مبرمج C ضمان تمرير سلاسل صالحة لتتلاعب بها دوال مكتبة C. وهكذا، في الاستدعاء `strcpy` في المثال السابق، لو لم تكن سلسلة المصدر (`str1`) مهيّأة لتنتهي بمحرف `'\0'`، فستستمر `strcpy` بما يتجاوز حدود مصفوفة `str1`، ما يؤدي إلى سلوك غير معرّف قد يسبب انهياره.

**تحذير**

> يستخدم المثال السابق الدالة `strcpy` بأمان. لكن بشكل عام، تشكّل `strcpy` خطراً أمنياً لأنها تفترض أن وجهتها كبيرة بما يكفي لتخزين السلسلة كاملة، وهو ما قد لا يكون صحيحاً دائماً (مثلاً، إذا جاءت السلسلة من إدخال المستخدم).
>
> اخترنا عرض `strcpy` الآن لتبسيط المقدمة إلى السلاسل النصية، لكننا نوضح بدائل أكثر أماناً في [القسم 2.6](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library).

وفي الفصل التالي، نناقش [سلاسل C ومكتبة سلاسل C](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library) بمزيد من التفصيل.

المصفوفات والبنى هما الطريقتان التي تدعم بهما C إنشاء مجموعات من عناصر البيانات. وتُستخدم المصفوفات لإنشاء مجموعة مرتبة من عناصر بيانات من النوع نفسه، بينما تُستخدم **البنى** (structs) لإنشاء مجموعة من عناصر بيانات من *أنواع مختلفة*. ويستطيع مبرمج C دمج لبنات المصفوفات والبنى بطرق مختلفة كثيرة لإنشاء أنواع وبنى بيانات أكثر تعقيداً. يقدّم هذا القسم البنى، وفي الفصل التالي [نصف البنى بمزيد من التفصيل](https://diveintosystems.org/book/C2-C_depth/structs.html#_c_structs) و[نوضح كيف يمكن دمجها مع المصفوفات](https://diveintosystems.org/book/C2-C_depth/structs.html#_arrays_of_structs).

C ليست لغة كائنية التوجه؛ لذا لا تدعم الأصناف (classes). غير أنها تدعم تعريف الأنواع البنيوية، وهي أشبه بالجزء الخاص بالبيانات في الأصناف. والـ `struct` نوع يُستخدم لتمثيل مجموعة غير متجانسة من البيانات؛ وهو آلية لمعالجة مجموعة من الأنواع المختلفة كوحدة واحدة متماسكة. وتوفّر بنى C مستوى من التجريد فوق قيم البيانات الفردية، بمعاملتها كنوع واحد. فمثلاً، للطالب اسم وعمر ومعدل درجات تراكمي (GPA) وسنة تخرج. ويستطيع المبرمج تعريف نوع `struct` جديد يجمع عناصر البيانات الأربعة هذه في متغيّر `struct student` واحد يحتوي على قيمة اسم (من النوع `char []`، لتخزين سلسلة نصية)، وقيمة عمر (من النوع `int`)، وقيمة GPA (من النوع `float`)، وقيمة سنة تخرج (من النوع `int`). ويستطيع متغيّر واحد من نوع البنية هذا تخزين قطع البيانات الأربع كلها لطالب معيّن؛ مثل ("Freya", 19, 3.7, 2021).

ويتضمّن تعريف أنواع `struct` واستخدامها في برامج C ثلاث خطوات:

1. عرّف نوع `struct` جديداً يمثّل البنية.
2. أعلن متغيّرات من النوع `struct` الجديد.
3. استخدم صيغة النقطة (dot) (`.`) للوصول إلى قيم الحقول الفردية في المتغيّر.

### 1.6.1. تعريف نوع بنية {#_defining_a_struct_type}

ينبغي أن يظهر تعريف نوع البنية *خارج أي دالة*، عادةً قرب أعلى ملف `.c` الخاص بالبرنامج. وصياغة تعريف نوع بنية جديد هي التالية (`struct` كلمة مفتاحية محجوزة):

```c
struct <struct_name> {
    <field 1 type> <field 1 name>;
    <field 2 type> <field 2 name>;
    <field 3 type> <field 3 name>;
    ...
};
```

وفيما يلي مثال على تعريف نوع `struct studentT` جديد لتخزين بيانات الطالب:

```c
struct studentT {
    char name[64];
    int age;
    float gpa;
    int grad_yr;
};
```

يضيف تعريف البنية هذا نوعاً جديداً إلى نظام أنواع C، واسم النوع هو `struct studentT`. وتعرّف هذه البنية أربعة حقول، ويتضمن كل تعريف حقل نوع الحقل واسمه. ولاحظ في هذا المثال أن نوع الحقل `name` مصفوفة محارف، [لاستخدامها كسلسلة نصية](https://diveintosystems.org/book/C1-C_intro/arrays_strings.html#_introduction_to_strings_and_the_c_string_library).

### 1.6.2. الإعلان عن متغيّرات من أنواع البنى {#_declaring_variables_of_struct_types}

بعد تعريف النوع، يمكنك الإعلان عن متغيّرات من النوع الجديد `struct studentT`. ولاحظ أنه خلافاً للأنواع الأخرى التي صادفناها حتى الآن والتي تتألف من كلمة واحدة فقط (مثل `int` و`char` و`float`)، فإن اسم نوع بنيتنا الجديد يتألف من كلمتين، `struct studentT`.

```c
struct studentT student1, student2; // student1, student2 are struct studentT
```

### 1.6.3. الوصول إلى قيم الحقول {#_accessing_field_values}

للوصول إلى قيم الحقول في متغيّر بنية، استخدم *صيغة النقطة*:

```bash
<variable name>.<field name>
```

عند الوصول إلى البنى وحقولها، تأمّل بعناية أنواع المتغيّرات التي تستخدمها. فكثيراً ما يُدخل مبرمجو C المبتدئون أخطاءً في برامجهم بإغفال مراعاة أنواع حقول البنى. ويعرض [الجدول 1](#TabStructTypes) أنواع عدة تعبيرات تتعلق بنوع `struct studentT`.

| التعبير | نوع C |
| --- | --- |
| `student1` | `struct studentT` |
| `student1.age` | عدد صحيح (`int`) |
| `student1.name` | مصفوفة محارف (`char []`) |
| `student1.name[3]` | محرف (`char`)، وهو النوع المخزّن في كل موضع من مصفوفة name |

وفيما يلي بعض الأمثلة على إسناد حقول متغيّر من نوع `struct studentT`:

```c
// The 'name' field is an array of characters, so we can use the 'strcpy'
// string library function to fill in the array with a string value.
strcpy(student1.name, "Kwame Salter");

// The 'age' field is an integer.
student1.age = 18 + 2;

// The 'gpa' field is a float.
student1.gpa = 3.5;

// The 'grad_yr' field is an int
student1.grad_yr = 2020;
student2.grad_yr = student1.grad_yr;
```

يوضّح [الشكل 1](#FigStudentStruct) تخطيط متغيّر `student1` في الذاكرة بعد إسنادات الحقول في المثال السابق. ولا تُخزَّن في الذاكرة إلا حقول متغيّر البنية (المناطق داخل الصناديق). وأسماء الحقول مكتوبة على الشكل للتوضيح، لكن بالنسبة لمصرّف C، الحقول مجرد مواقع تخزين أو **إزاحات** (offsets) من بداية ذاكرة متغيّر البنية. فمثلاً، استناداً إلى تعريف `struct studentT`، يعرف المصرّف أنه للوصول إلى الحقل المسمّى `gpa` يجب تجاوز مصفوفة من 64 محرفاً (`name`) وعدد صحيح واحد (`age`). ولاحظ أن حقل `name` في الشكل يصوّر المحارف الستة الأولى فقط من مصفوفة الـ 64 محرفاً.

![The layout of student1’s memory: the name field is a character array containing 'k' 'w' 'a' 'm' 'e' …​ The age field holds 20, the gpa field stores 3.5, and grad_yr contains 2020.](https://diveintosystems.org/images/dive-into-systems/c1-intro-0-studentstruct.webp){#FigStudentStruct} الشكل 1. ذاكرة المتغيّر student1 بعد إسناد كل حقل من حقوله

أنواع بنى C هي **قيم يسارية** (lvalues)، أي يمكن أن تظهر في الجانب الأيسر من عبارة إسناد. وهكذا يمكن إسناد قيمة متغيّر بنية إلى متغيّر بنية آخر بعبارة إسناد بسيطة. وتُ*نسخ* قيم حقول البنية في الجانب الأيمن من عبارة الإسناد إلى قيم حقول البنية في الجانب الأيسر. وبعبارة أخرى، يُنسخ محتوى ذاكرة إحدى البنى إلى ذاكرة الأخرى. وفيما يلي مثال على إسناد قيم بنية بهذه الطريقة:

```c
student2 = student1;  // student2 gets the value of student1
                      // (student1's field values are copied to
                      //  corresponding field values of student2)

strcpy(student2.name, "Frances Allen");  // change one field value
```

يعرض [الشكل 2](#FigStructAssign) قيم متغيّري الطالب بعد تنفيذ عبارة الإسناد والاستدعاء `strcpy`. ولاحظ أن الشكل يصوّر حقول `name` كقيم السلاسل النصية التي تحتويها، لا كمصفوفة المحارف الكاملة المكوّنة من 64 محرفاً.

![Struct Values and Assignment: the field values of the struct on the right hand side are assigned to corresponding field values of the struct on the left hand side of the assignment statement.](https://diveintosystems.org/images/dive-into-systems/c1-intro-1-structassign.webp){#FigStructAssign} الشكل 2. تخطيط بنيتَي student1 وstudent2 بعد تنفيذ إسناد البنية واستدعاء strcpy

توفّر C معامل `sizeof` يأخذ نوعاً ويرجع عدد البايتات التي يستخدمها ذلك النوع. ويمكن استخدام معامل `sizeof` على أي نوع من أنواع C، بما فيها أنواع البنى، لمعرفة مقدار مساحة الذاكرة التي يحتاجها متغيّر من ذلك النوع. فمثلاً، يمكننا طباعة حجم نوع `struct studentT`:

```c
// Note: the `%lu` format placeholder specifies an unsigned long value.
printf("number of bytes in student struct: %lu\n", sizeof(struct studentT));
```

عند التشغيل، ينبغي أن يطبع هذا السطر قيمة *لا تقل عن* 76 بايت، لأن 64 محرفاً في مصفوفة `name` (بايت واحد لكل `char`)، و4 بايتات لحقل `int` `age`، و4 بايتات لحقل `float` `gpa`، و4 بايتات لحقل `int` `grad_yr`. وقد يكون العدد الدقيق للبايتات أكبر من 76 على بعض الأجهزة.

وفيما يلي [برنامج مثال كامل](https://diveintosystems.org/book/C1-C_intro/_attachments/studentTstruct.c) يعرّف نوع `struct studentT` ويوضح استخدامه:

```c
#include <stdio.h>
#include <string.h>

// Define a new type: struct studentT
// Note that struct definitions should be outside function bodies.
struct studentT {
    char name[64];
    int age;
    float gpa;
    int grad_yr;
};

int main(void) {
    struct studentT student1, student2;

    strcpy(student1.name, "Kwame Salter");  // name field is a char array
    student1.age = 18 + 2;                  // age field is an int
    student1.gpa = 3.5;                     // gpa field is a float
    student1.grad_yr = 2020;                // grad_yr field is an int

    /* Note: printf doesn't have a format placeholder for printing a
     * struct studentT (a type we defined).  Instead, we'll need to
     * individually pass each field to printf. */
    printf("name: %s age: %d gpa: %g, year: %d\n",
           student1.name, student1.age, student1.gpa, student1.grad_yr);

    /* Copy all the field values of student1 into student2. */
    student2 = student1;

    /* Make a few changes to the student2 variable. */
    strcpy(student2.name, "Frances Allen");
    student2.grad_yr = student1.grad_yr + 1;

    /* Print the fields of student2. */
    printf("name: %s age: %d gpa: %g, year: %d\n",
           student2.name, student2.age, student2.gpa, student2.grad_yr);

    /* Print the size of the struct studentT type. */
    printf("number of bytes in student struct: %lu\n", sizeof(struct studentT));

    return 0;
}
```

وعند التشغيل، يطبع هذا البرنامج ما يلي:

```
name: Kwame Salter age: 20 gpa: 3.5, year: 2020
name: Frances Allen age: 20 gpa: 3.5, year: 2021
number of bytes in student struct: 76
```

القيم اليسارية

**القيمة اليسارية** (lvalue) تعبير يمكن أن يظهر في الجانب الأيسر من عبارة إسناد. وهو تعبير يمثّل موقع تخزين في الذاكرة. ومع تقديمنا أنواع مؤشّرات C وأمثلة إنشاء بنى أكثر تعقيداً تدمج مصفوفات C والبنى والمؤشّرات، من المهم التفكير بعناية في الأنواع ومراعاة أي تعبيرات C هي قيم يسارية صالحة (يمكن استخدامها في الجانب الأيسر من عبارة إسناد).

ومما نعرفه عن C حتى الآن، فإن المتغيّرات المفردة من الأنواع الأساسية وعناصر المصفوفات والبنى كلها قيم يسارية. أما اسم المصفوفة المعلَنة ساكنةً فـ *ليس* قيمة يسارية (لا يمكنك تغيير عنوان أساس مصفوفة معلَنة ساكنةً في الذاكرة). ويوضح مقتطف الشيفرة المثال التالي عبارات إسناد C صالحة وغير صالحة بناءً على حالة القيمة اليسارية لأنواع مختلفة:

```c
struct studentT {
    char name[32];
    int  age;
    float gpa;
    int  grad_yr;
};

int main(void) {
    struct studentT  student1, student2;
    int x;
    char arr[10], ch;

    x = 10;                 // Valid C: x is an lvalue
    ch = 'm';               // Valid C: ch is an lvalue
    student1.age = 18;      // Valid C: age field is an lvalue
    student2 = student1;    // Valid C: student2 is an lvalue
    arr[3] = ch;            // Valid C: arr[3] is an lvalue

    x + 1 = 8;       // Invalid C: x+1 is not an lvalue
    arr = "hello";   // Invalid C: arr is not an lvalue
                     //  cannot change base addr of statically declared array
                     //  (use strcpy to copy the string value "hello" to arr)

    student1.name = student2.name;  // Invalid C: name field is not an lvalue
                                    // (the base address of a statically
                                    //  declared array cannot be changed)
```

### 1.6.4. تمرير البنى إلى الدوال {#_passing_structs_to_functions}

في C، تُمرَّر وسائط جميع الأنواع *بالقيمة* إلى الدوال. وبالتالي، إذا كانت لدالة وسيط من نوع بنية، فعند استدعائها بوسيط بنية، تُمرَّر **قيمة** الوسيط إلى وسيطها، أي أن الوسيط يحصل على نسخة من قيمة وسيطته. وقيمة متغيّر البنية هي محتوى ذاكرته، ولهذا يمكننا إسناد حقول بنية لتكون مماثلة لبنية أخرى بعبارة إسناد واحدة كهذه:

```c
student2 = student1;
```

ولأن قيمة متغيّر البنية تمثّل المحتوى الكامل لذاكرته، فإن تمرير بنية كوسيط إلى دالة يمنح الوسيط **نسخة** من قيم حقول بنية الوسيط كلها. وإذا غيّرت الدالة قيم حقول وسيط بنية، فإن التغييرات في قيم حقول الوسيط *لا أثر لها* في قيم الحقول المقابلة في الوسيط الأصلي. أي أن التغييرات في حقول الوسيط تعدّل فقط القيم في مواقع ذاكرة الوسيط لتلك الحقول، لا في مواقع ذاكرة الوسيط الأصلي لتلك الحقول.

وفيما يلي [برنامج مثال كامل](https://diveintosystems.org/book/C1-C_intro/_attachments/structfunc.c) يستخدم الدالة `checkID` التي تأخذ وسيط بنية:

```c
#include <stdio.h>
#include <string.h>

/* struct type definition: */
struct studentT {
    char name[64];
    int  age;
    float gpa;
    int  grad_yr;
};

/* function prototype (prototype: a declaration of the
 *    checkID function so that main can call it, its full
 *    definition is listed after main function in the file):
 */
int checkID(struct studentT s1, int min_age);

int main(void) {
    int can_vote;
    struct studentT student;

    strcpy(student.name, "Ruth");
    student.age = 17;
    student.gpa = 3.5;
    student.grad_yr = 2021;

    can_vote = checkID(student, 18);
    if (can_vote) {
        printf("%s is %d years old and can vote.\n",
                student.name, student.age);
    } else {
        printf("%s is only %d years old and cannot vote.\n",
                student.name, student.age);
    }

    return 0;
}

/*  check if a student is at least the min age
 *    s: a student
 *    min_age: a minimum age value to test
 *    returns: 1 if the student is min_age or older, 0 otherwise
 */
int checkID(struct studentT s, int min_age) {
    int ret = 1;  // initialize the return value to 1 (true)

    if (s.age < min_age) {
        ret = 0;  // update the return value to 0 (false)

        // let's try changing the student's age
        s.age = min_age + 1;
    }

    printf("%s is %d years old\n", s.name, s.age);

    return ret;
}
```

عندما يستدعي `main` الدالة `checkID`، تُمرَّر قيمة بنية `student` (نسخة من محتوى ذاكرة جميع حقولها) إلى الوسيط `s`. وعندما تغيّر الدالة قيمة حقل `age` في وسيطها، فإن ذلك *لا* يؤثر في حقل `age` في وسيطتها الأصلية (`student`). ويمكن ملاحظة هذا السلوك بتشغيل البرنامج، الذي يطبع ما يلي:

```
Ruth is 19 years old
Ruth is only 17 years old and cannot vote.
```

يوضح الناتج أنه عندما تطبع `checkID` الحقل `age`، فإنه يعكس تغيير الدالة لحقل `age` في الوسيط `s`. لكن بعد عودة استدعاء الدالة، تطبع `main` الحقل `age` من `student` بالقيمة نفسها التي كان عليها قبل استدعاء `checkID`. ويوضح [الشكل 3](#FigStructStack) محتويات مكدّس الاستدعاء قبل عودة الدالة `checkID` مباشرة.

![As the student struct is passed to checkID, the parameter gets a copy of its contents. When checkID modifies the age field to 19, the change only applies to its local copy. The student struct’s age field in main remains at 17.](https://diveintosystems.org/images/dive-into-systems/c1-intro-2-structstack.webp){#FigStructStack} الشكل 3. محتويات مكدّس الاستدعاء قبل العودة من دالة checkID

يُعدّ فهم دلالات التمرير بالقيمة لوسائط البنى مهماً بشكل خاص عندما تحتوي بنية على حقل مصفوفة معلَنة ساكنةً (مثل حقل `name` في `struct studentT`). فعند تمرير بنية كهذه إلى دالة، يُنسخ محتوى ذاكرة وسيط البنية كاملاً، بما فيه كل عنصر مصفوفة في حقل المصفوفة، إلى وسيطها. وإذا غيّرت الدالة محتويات مصفوفة وسيط البنية، فلن *تبقى* تلك التغييرات بعد عودة الدالة. وقد يبدو هذا السلوك غريباً بالنظر إلى ما نعرفه عن [كيفية تمرير المصفوفات إلى الدوال](https://diveintosystems.org/book/C1-C_intro/arrays_strings.html#_arrays_and_functions)، لكنه متسق مع سلوك نسخ البنى الموصوف سابقاً.

قدّمنا في هذا الفصل كثيراً من أجزاء لغة البرمجة C بمقارنتها بتراكيب لغوية مشابهة في Python، وهي لغة قد يعرفها كثير من القرّاء. فـ C تمتلك ميزات لغوية مشابهة لميزات كثير من اللغات عالية المستوى الأمرية والكائنية التوجه الأخرى، منها المتغيّرات والحلقات والعبارات الشرطية والدوال والإدخال/الإخراج. ومن الفروق الجوهرية بين ميزات C وPython التي ناقشناها أن C تشترط الإعلان عن جميع المتغيّرات بنوع محدد قبل استخدامها، وأن مصفوفات C وسلاسلها النصية تجريد أدنى مستوى من قوائم Python وسلاسلها النصية. وتتيح التجريدات الأدنى مستوى لمبرمج C تحكماً أكبر في كيفية وصول برنامجه إلى ذاكرته، وبالتالي تحكماً أكبر في كفاءة برنامجه.

وفي الفصل التالي، نغطي لغة البرمجة C بالتفصيل. فنعود بعمق أكبر إلى كثير من الميزات اللغوية المعروضة في هذا الفصل، ونقدّم بعض ميزات لغة C الجديدة، وأبرزها متغيّرات المؤشّرات في C ودعم التخصيص الديناميكي للذاكرة.

- [جميع تمارين الفصل 1](https://diveintosystems.org/exercises/dive-into-systems-exercises-4.html)
