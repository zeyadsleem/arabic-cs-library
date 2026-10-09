---
title: "16. الملحق 1: الفصل 1 لمبرمجي Java"
lang: ar
source: https://diveintosystems.org/book/Appendix1/index.html
---

*بالـC، بالـC، بالـC الجميلة* --"By the Beautiful Sea"، Carroll وAtteridge، 1914

**ملاحظة**

> هذا الملحق نسخة من [الفصل 1](https://diveintosystems.org/book/C1-C_intro/index.html#_by_the_c_by_the_c_by_the_beautiful_c) مكتوبة لمبرمجي Java. ومحتواه شبه مطابق للفصل 1، إلا أنه يستخدم أمثلة بلغة Java لأغراض المقارنة بدلًا من أمثلة Python المستخدمة في الفصل 1.

يقدّم هذا الملحق نظرة عامة على البرمجة بلغة C مكتوبة لطلاب لديهم بعض الخبرة في البرمجة بلغة أخرى. وقد كُتب تحديدًا لمبرمجي Java ويستخدم بعض أمثلة Java لأغراض المقارنة. غير أنه ينبغي أن يكون مفيدًا كمقدمة للبرمجة بلغة C لأي شخص لديه خبرة برمجية أساسية بأي لغة.

C لغة برمجة عالية المستوى مثل لغات أخرى قد تعرفها، مثل Python وJava وRuby وC++. وهي لغة برمجة أمرية وإجرائية، أي أن برنامج C يُعبَّر عنه كتسلسل من العبارات (الخطوات) لينفّذها الحاسوب، وأن برامج C تُبنى كمجموعة من الدوال (الإجراءات). ويجب أن يحتوي كل برنامج C على دالة واحدة على الأقل، هي الدالة `main`، التي تحتوي مجموعة العبارات التي تُنفَّذ عند بدء البرنامج.

لغة البرمجة C أقل تجريدًا من لغة الآلة في الحاسوب مقارنة ببعض اللغات الأخرى التي قد تعرفها. وهذا يعني أن C لا تدعم البرمجة الكائنية التوجه، ولا توفّر مجموعة غنية من التجريدات البرمجية عالية المستوى (مثل String وArrayList) ومجموعة كبيرة من مكتبات الفئات ليستخدمها المبرمجون، ولا تدعم جمع المهملات والاستثناءات. ونتيجة لذلك، إذا أردت استخدام بنية بيانات مثل قاموس (dictionary) في برنامجك بلغة C، فستحتاج إلى تنفيذها بنفسك، بدلًا من مجرد استخدام بنية منفَّذة بالفعل في مكتبة فئات Java.

قد يجعل افتقار C إلى التجريدات عالية المستوى تبدو لغة برمجة أقل جذبًا للاستخدام. غير أن كونها أقل تجريدًا من الآلة الأساسية يجعل من الأسهل على المبرمج رؤية العلاقة بين شيفرة البرنامج وتنفيذ الحاسوب لها وفهمها. ويحتفظ مبرمجو C بقدر أكبر من التحكم في كيفية تنفيذ برامجهم على العتاد، ويمكنهم كتابة شيفرة تعمل بكفاءة أكبر من الشيفرة المكافئة المكتوبة باستخدام التجريدات عالية المستوى التي توفّرها لغات برمجة أخرى. وتحديدًا، يملكون تحكمًا أكبر في كيفية إدارة برامجهم للذاكرة، وهو ما قد يكون له أثر كبير في الأداء. وهكذا تبقى C اللغة *بحكم الواقع* لبرمجة أنظمة الحاسوب حيث يكون التحكم منخفض المستوى والكفاءة أمرين حاسمين.

نستخدم لغة C في هذا الكتاب بسبب قدرتها على التعبير عن التحكم في البرنامج وترجمتها المباشرة نسبيًا إلى لغة التجميع وشيفرة الآلة التي ينفّذها الحاسوب. ويقدّم هذا الفصل البرمجة بلغة C للقراء الملمّين بـJava، بدءًا بنظرة عامة على سمات C وعلاقتها بلغة برمجة Java. ثم يصف [الفصل 2](https://diveintosystems.org/book/C2-C_depth/index.html#_a_deeper_dive_into_c_programming) سمات C بمزيد من التفصيل.

لنبدأ بالنظر إلى برنامج "hello world" يتضمّن مثالًا على استدعاء دالة من مكتبة الرياضيات. وفي [الجدول 1](#TabJavaC) نقارن نسخة C من هذا البرنامج بنسخة Java. وقد توضع نسخة C في ملف اسمه `hello.c` (فاللاحقة `.c` هي الاصطلاح المتبع لملفات شيفرة C المصدرية)، بينما قد تكون نسخة Java في ملف اسمه `HelloWorld.java`.

**الجدول 1. مقارنة الصياغة لبرنامج صغير بلغة Java وأخرى بلغة C. كلا [نسخة C](https://diveintosystems.org/book/Appendix1/_attachments/hello.c) و[نسخة Java](https://diveintosystems.org/book/Appendix1/_attachments/HelloWorld.java) متاحتان للتنزيل.**

**نسخة Java ([HelloWorld.java](https://diveintosystems.org/book/Appendix1/_attachments/HelloWorld.java))**

```java
/*
    The Hello World Program in Java
 */

/* Java Math library */
import java.lang.Math;

/* define a HelloWorld class */
class HelloWorld {

  /* main method definition: */
  public static void main(String[] args){

   System.out.println("Hello World");
   System.out.println("sqrt(4) is "
         + Math.sqrt(4));
  }
}
```

**نسخة C ([hello.c](https://diveintosystems.org/book/Appendix1/_attachments/hello.c))**

```c
/*
    The Hello World Program in C
 */

/* C math and I/O libraries */
#include <math.h>
#include <stdio.h>

/* main function definition: */
int main(void) {

    printf("Hello World\n");
    printf("sqrt(4) is %f\n", sqrt(4));

    return 0;  // main returns value 0
}
```

لاحظ أن كلا نسختي هذا البرنامج لهما بنية وتراكيب لغوية متشابهة، وإن كانت صياغة اللغتين مختلفة.

ومن أوجه الشبه في الصياغة:

**التعليقات:**

- تبدأ التعليقات متعددة الأسطر في Java وC بـ`/*` وتنتهي بـ`*/`، وتبدأ التعليقات أحادية السطر بـ`//`.

**العبارات:**

- تنتهي العبارات في C وJava بـ`;`.

**الكتل:**

- تستخدم Java وC كلتاهما `{` و`}` حول كتل الشيفرة المترابطة (مثل أجسام الدوال وأجسام الحلقات). ويتضمّن أسلوب البرمجة الجيد إزاحة العبارات داخل الكتلة.

ومن الفروق الرئيسية:

**استيراد شيفرة المكتبات:**

- في Java، تُضمَّن المكتبات (تُستورد) باستخدام `import`.
- وفي C، تُضمَّن المكتبات (تُستورد) باستخدام `#include`. وتظهر جميع عبارات `#include` في أعلى البرنامج، خارج أجسام الدوال.

**الدالة main:**

- تعرّف Java وC كلتاهما دوال `main` التي تكون أولى الدوال المنفَّذة عند تشغيل البرنامج. وفي C، تُعرَّف دالة `main` واحدة فقط، وتُستدعى تلقائيًا عند تنفيذ برنامج C. وفي Java، تُنفَّذ الدالة `public static void main` للفئة المشغَّلة على JVM.
- Java لغة كائنية التوجه بالكامل، لذا يجب أن تكون كل الشيفرة جزءًا من فئة (`HelloWorld` في هذا المثال). وتُعرَّف الدالة `main` كدالة `public static` في الفئة `HelloWorld` (`public static void main(String[] args)`). وحسب الاصطلاح، تكون `main` دالة `void` في Java وتُمرَّر إليها مصفوفة من سلاسل وسائط سطر الأوامر.
- C لغة أمرية وإجرائية بالكامل، ولذلك لا توجد فئات في C. ونتيجة لذلك، تُعرَّف جميع الدوال خارج تعريفات الفئات (فلا توجد تعريفات فئات في C). وفي C، يُعرّف `int main(void){ }` الدالة `main`. وتعني `void` أنها لا تتوقع استقبال معامل. وستوضّح أقسام لاحقة كيف يمكن لـ`main` أن تأخذ معاملات لاستقبال وسائط سطر الأوامر.
- يجب أن يحتوي برنامج C على دالة اسمها `main`، ويجب أن يكون نوع قيمة إرجاعها `int`. ويمكن لدالة `main` في C أن تأخذ اختياريًا معاملًا هو قائمة سلاسل، سلسلة لكل وسيط من وسائط سطر الأوامر (على غرار Java)، لكن في أبسط صورها لا تأخذ `main` أي معاملات. وفي الفصل 2 نعرض `main` معرّفة لتأخذ وسائط سطر الأوامر.
- وتحتوي دالة `main` في C على عبارة `return` صريحة لإرجاع قيمة `int` (وحسب الاصطلاح، تعيد `main` القيمة `0` إذا نُفِّذت بنجاح دون أخطاء).

**الإخراج:**

- في Java، يمكن استخدام داليتي `print` و`println` من `System.out` لطباعة سلسلة. ويمكن استخدام المعامل `+` لدمج القيم معًا لإنشاء سلسلة أكثر تعقيدًا (مثل `"sqrt(4) is " + Math.sqrt(4)`). ويملك `System.out` أيضًا دالة `printf` لطباعة سلسلة تنسيق مع وسائط. وتأتي قيم العناصر النائبة في سلسلة التنسيق كقائمة من قيم الوسائط مفصولة بفواصل. فمثلًا، يمكن استبدال الاستدعاء الثاني لـ`System.out.println` في [الجدول 1](#TabJavaC) بالاستدعاء المكافئ `System.out.printf("sqrt(4) is %f%n", Math.sqrt(4)`)، حيث تُطبع قيمة `Math.sqrt(4)` بدل العنصر النائب `%f` في سلسلة التنسيق، ويُستخدم `%n` (أو `\n`) لتحديد محرف سطر جديد. وتملك Java إضافةً إلى ذلك فئات يمكن استخدامها لتنسيق أنواع مختلفة من القيم.
- وفي C، تطبع الدالة `printf` سلسلة منسّقة مثل الدالة `System.out.printf` في Java (فمثلًا، تُطبع قيمة `sqrt(4)` بدل العنصر النائب `%f` في وسيط سلسلة التنسيق، ويحدّد `\n` محرف سطر جديد). وتُستخدم الدالة `printf` لطباعة سلاسل التنسيق وقيم السلاسل البسيطة معًا (فلا توجد في C دالة منفصلة تشبه `System.out.println` في Java). كما أن دالة `printf` في C لا تطبع محرف سطر جديد تلقائيًا في النهاية. ونتيجة لذلك، يحتاج مبرمجو C إلى تحديد محرف سطر جديد (`\n`) صراحةً في سلسلة التنسيق عند الرغبة في سطر جديد في الإخراج.

### 16.1.1. ترجمة برامج C وتشغيلها {#_compiling_and_running_c_programs}

تعمل برامج Java على الآلة الظاهرية لـJava (JVM). وJVM برنامج يعمل مباشرة على النظام الحاسوبي الأساسي. ولتشغيل برنامج Java، يُترجم أولًا بواسطة مترجم Java (`javac`) من صورته كشيفرة مصدرية (`HelloWorld.java`) إلى صورة بايت كود Java. فمثلًا (`$` هي مطالبة صدفة Linux):

```bash
$ javac HelloWorld.java
```

وإذا نجحت الترجمة، ينشئ `javac` ملفًا جديدًا هو `HelloWorld.class` يحتوي الترجمة إلى بايت كود Java للبرنامج الذي يمكن لـJVM تشغيله. فمثلًا:

```bash
$ java HelloWorld
```

وJVM برنامج في صورة يمكن تشغيلها مباشرة على النظام الأساسي (وتُسمى هذه الصورة **ملفًا تنفيذيًا ثنائيًا**) وتأخذ كمدخل فئة Java التي تشغّلها ([الشكل 1](#FigJavaExecution)). وبايت كود Java قابل للنقل جدًا بمعنى أنه يمكن تشغيله على أي نظام حاسوبي فيه JVM. غير أنه بما أن بايت كود Java لا يعمل مباشرة على النظام الحاسوبي الأساسي، فقد لا يعمل برنامج Java بكفاءة مثل البرامج التي تعمل مباشرة على النظام الأساسي.

![تنفيذ برنامج Java بواسطة JVM.](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-0-javac.webp){#FigJavaExecution} الشكل 1. يُترجم برنامج Java إلى بايت كود Java ينفّذه JVM، وهو برنامج تنفيذي ثنائي يعمل على النظام الأساسي (نظام التشغيل والعتاد)

ولتشغيل برنامج C، يجب أولًا ترجمته إلى صورة يمكن للنظام الحاسوبي تنفيذها مباشرة. و**المترجم** (compiler) في C، شأنه شأن مترجم Java، برنامج يترجم شيفرة C المصدرية إلى صورة **تنفيذية ثنائية** يمكن للنظام الحاسوبي تنفيذها مباشرة. ويتكوّن الملف التنفيذي الثنائي من سلسلة من الأصفار والآحاد بصيغة محدّدة جيدًا يستطيع الحاسوب تشغيلها؛ وخلافًا لبايت كود Java الذي يتطلب JVM للتشغيل، يعمل الملف التنفيذي الثنائي مباشرة على النظام الأساسي.

فمثلًا، لتشغيل برنامج C المسمّى `hello.c` على نظام Unix، يجب أولًا ترجمة شيفرة C بواسطة مترجم C (مثل [مترجم GNU C](https://gcc.gnu.org)، GCC) ينتج ملفًا تنفيذيًا ثنائيًا (يُسمّى افتراضيًا `a.out`). ثم يمكن تشغيل النسخة التنفيذية الثنائية من البرنامج مباشرة على النظام ([الشكل 2](#FigCCompile)):

```bash
$ gcc hello.c
$ ./a.out
```

(لاحظ أن بعض مترجمات C قد تحتاج إلى إخبار صريح لربط مكتبة الرياضيات: `-lm`):

```bash
$ gcc hello.c -lm
```

![يُرسَل نص برنامج C إلى مصرّف C الذي يحوّله إلى تسلسل تنفيذي من الأصفار والواحدات. ويمكن للنظام الأساسي تشغيل ذلك التسلسل.](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-1-compile.webp){#FigCCompile} الشكل 2. يبني مترجم C (gcc) شيفرة C المصدرية في ملف تنفيذي ثنائي (a.out). وينفّذ النظام الأساسي (نظام التشغيل والعتاد) ملف a.out مباشرة لتشغيل البرنامج.

#### خطوات مفصّلة {#_detailed_steps}

بشكل عام، يصف التسلسل التالي الخطوات اللازمة لتحرير برنامج C وترجمته وتشغيله على نظام Unix:

باستخدام [محرر نصوص](https://www.cs.swarthmore.edu/help/editors.html) (مثل `vim`)، اكتب برنامجك بشيفرة C المصدرية واحفظه في ملف (مثل `hello.c`):

```bash
$ vim hello.c
```

ترجم المصدر إلى صورة تنفيذية، ثم شغّله. وأبسط صيغة للترجمة بـ`gcc` هي:

```bash
$ gcc <input_source_file>
```

وإذا لم تُنتج الترجمة أخطاء، ينشئ المترجم ملفًا تنفيذيًا ثنائيًا اسمه `a.out`. كما يتيح لك المترجم تحديد اسم الملف التنفيذي الثنائي المراد توليده باستخدام الراية `-o`:

```bash
$ gcc -o <output_executable_file> <input_source_file>
```

فمثلًا، يأمر هذا الأمر `gcc` بترجمة `hello.c` إلى ملف تنفيذي اسمه `hello`:

```bash
$ gcc -o hello hello.c
```

ويمكننا استدعاء البرنامج التنفيذي باستخدام `./hello`:

```bash
$ ./hello
```

وأي تغييرات تُجرى على شيفرة C المصدرية (ملف `hello.c`) يجب إعادة ترجمتها بـ`gcc` لإنتاج نسخة جديدة من `hello`. وإذا اكتشف المترجم أي أخطاء أثناء الترجمة، فلن يُنشأ ملف `./hello` أو يُعاد إنشاؤه (لكن احذر، فقد تظل موجودة نسخة أقدم من الملف ناتجة عن ترجمة ناجحة سابقة).

وغالبًا ما ترغب عند الترجمة بـ`gcc` في تضمين عدة خيارات سطر أوامر. فمثلًا، تمكّن هذان الخياران تحذيرات أكثر من المترجم وتبني ملفًا تنفيذيًا ثنائيًا بمعلومات تصحيح إضافية:

```bash
$ gcc -Wall -g -o hello hello.c
```

ولأن سطر أوامر `gcc` قد يكون طويلًا، كثيرًا ما تُستخدم أداة `make` لتبسيط ترجمة برامج C وتنظيف الملفات التي ينشئها `gcc`. ويُعدّ [استخدام make وكتابة Makefiles](https://www.cs.swarthmore.edu/~newhall/unixhelp/howto_makefiles.html) من المهارات المهمة التي ستطوّرها مع تراكم خبرتك في البرمجة بلغة C.

نغطي الترجمة والربط بشيفرة مكتبة C بمزيد من التفصيل في نهاية [الفصل 2](https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_compilation_steps_).

### 16.1.2. المتغيرات والأنواع العددية في C {#_variables_and_c_numeric_types}

مثل Java، تستخدم C المتغيرات كمواقع تخزين مسمّاة لحمل البيانات. والتفكير في **نطاق** (scope) متغيرات البرنامج و**نوعها** (type) مهم لفهم دلالات ما سيفعله برنامجك عند تشغيله. ويحدّد **نطاق** المتغير متى يكون للمتغير معنى (أي أين ومتى يمكن استخدامه في برنامجك) ومدة حياته (أي قد يستمر طوال تشغيل البرنامج أو خلال تنشيط دالة فقط). ويحدّد **نوع** المتغير نطاق القيم التي يمكنه تمثيلها وكيفية تفسير تلك القيم عند إجراء عمليات على بياناته.

في Java وC معًا، يجب إعلان جميع المتغيرات قبل استخدامها. ولإعلان متغير في C، استخدم الصيغة التالية:

```
type_name variable_name;
```

ولا يمكن أن يكون للمتغير إلا **نوع** واحد. وتشمل أنواع C الأساسية `char` و`int` و`float` و`double`. وحسب الاصطلاح، ينبغي إعلان متغيرات C في بداية نطاقها (في أعلى كتلة `{ }`)، قبل أي عبارات C في ذلك النطاق.

وفيما يلي مقطع شيفرة C نموذجي يعرض إعلانات متغيرات من أنواع مختلفة واستخداماتها. ونناقش الأنواع والمعاملات بمزيد من التفصيل بعد المثال.

varsin.c

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

### 16.1.3. أنواع C {#_c_types}

وخلافًا لـJava، لا تملك C مجموعة واسعة من مكتبات الفئات التي تعرّف أنواع بيانات معقّدة. وبدلًا من ذلك، تدعم C مجموعة صغيرة من أنواع البيانات المدمجة، وتوفّر طرقًا قليلة يمكن للمبرمجين من خلالها بناء مجموعات أساسية من الأنواع (المصفوفات والبنى). ومن هذه اللبنات الأساسية، يستطيع مبرمج C بناء بنى بيانات معقّدة.

تعرّف C مجموعة من الأنواع الأساسية لتخزين القيم العددية. وفيما يلي بعض الأمثلة على قيم حرفية عددية من أنواع C مختلفة:

```c
8     // the int value 8
3.4   // the double value 3.4
'h'   // the char value 'h' (its value is 104, the ASCII value of h)
```

يخزّن النوع `char` في C قيمة عددية. غير أن المبرمجين يستخدمونه غالبًا لتخزين قيمة محرف ASCII. وتُحدَّد القيمة الحرفية للمحرف في C كمحرف واحد بين علامتي اقتباس مفردتين.

لا تدعم C نوع سلاسل (string)، لكن يمكن للمبرمجين إنشاء السلاسل من النوع `char` ومن دعم C لبناء مصفوفات القيم، وهو ما نناقشه في أقسام لاحقة. غير أن C تدعم طريقة للتعبير عن قيم السلاسل الحرفية في البرامج: فالسلسلة الحرفية هي أي تتابع من المحارف بين علامتي اقتباس مزدوجتين. وغالبًا ما يمرّر مبرمجو C السلاسل الحرفية كوسيط سلسلة التنسيق إلى `printf`:

```c
printf("this is a C string\n");
```

تدعم Java وC كلتاهما قيم نوعي السلسلة والمحرف. وعادةً تكون قيم `char` في Java قيم يونيكود ذات 16 بت، بينما تكون قيم C محارف ASCII ذات 8 بتات.

وفي Java وC معًا، السلسلة و`char` نوعان مختلفان جدًا، ويُقيَّمان تقييمًا مختلفًا. ويتضح هذا الفرق بمقارنة سلسلة C حرفية تحتوي محرفًا واحدًا بمحرف C حرفي. فمثلًا:

```c
'h'  // this is a char literal value   (its value is 104, the ASCII value of h)
"h"  // this is a string literal value (its value is NOT 104, it is not a char)
```

نناقش سلاسل C ومتغيرات `char` بمزيد من التفصيل في قسم [السلاسل](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library) لاحقًا في هذا الفصل. وهنا سنركّز أساسًا على الأنواع العددية في C.

#### الأنواع العددية في C {#_c_numeric_types}

تدعم C عدة أنواع مختلفة لتخزين القيم العددية. وتختلف الأنواع في صيغة القيم العددية التي تمثّلها. فمثلًا، يمثّل النوعان `float` و`double` القيم الحقيقية، ويمثّل `int` قيمًا صحيحة موقّعة، ويمثّل `unsigned int` قيمًا صحيحة غير موقّعة. والقيم الحقيقية قيم موجبة أو سالبة ذات نقطة عشرية، مثل `-1.23` أو `0.0056`. وتخزّن الأعداد الصحيحة الموقّعة قيمًا صحيحة موجبة أو سالبة أو صفرًا، مثل `-333` أو `0` أو `3456`. وتخزّن الأعداد الصحيحة غير الموقّعة قيمًا صحيحة غير سالبة حصرًا، مثل `0` أو `1234`.

وتختلف الأنواع العددية في C أيضًا في نطاق القيم التي يمكنها تمثيلها ودقتها. ويعتمد نطاق القيمة أو دقتها على عدد البايتات المرتبطة بنوعها. ويمكن للأنواع ذات البايتات الأكثر أن تمثّل نطاقًا أكبر من القيم (للأنواع الصحيحة)، أو قيمًا أعلى دقة (للأنواع الحقيقية)، مقارنة بالأنواع ذات البايتات الأقل.

ويعرض [الجدول 2](#TabNumericCTypes) عدد بايتات التخزين، ونوع القيم العددية المخزّنة، وكيفية إعلان متغير لمجموعة متنوعة من أنواع C العددية الشائعة (لاحظ أن هذه أحجام نموذجية — إذ يعتمد العدد الدقيق للبايتات على معمارية العتاد).

| اسم النوع | الحجم المعتاد | القيم المخزّنة | كيفية الإعلان |
| --- | --- | --- | --- |
| `char` | بايت واحد | أعداد صحيحة | `char x;` |
| `short` | بايتان | أعداد صحيحة موقّعة | `short x;` |
| `int` | 4 بايتات | أعداد صحيحة موقّعة | `int x;` |
| `long` | 4 أو 8 بايتات | أعداد صحيحة موقّعة | `long x;` |
| `long long` | 8 بايتات | أعداد صحيحة موقّعة | `long long x;` |
| `float` | 4 بايتات | أعداد حقيقية موقّعة | `float x;` |
| `double` | 8 بايتات | أعداد حقيقية موقّعة | `double x;` |

وتوفّر C أيضًا إصدارات *غير موقّعة* من الأنواع العددية الصحيحة (`char` و`short` و`int` و`long` و`long long`). ولإعلان متغير كغير موقّع، أضف الكلمة المفتاحية `unsigned` قبل اسم النوع. فمثلًا:

```c
int x;           // x is a signed int variable
unsigned int y;  // y is an unsigned int variable
```

ولا يحدّد معيار C ما إذا كان النوع `char` موقّعًا أم غير موقّع. ونتيجة لذلك، قد تنفّذ بعض التطبيقات `char` كقيم صحيحة موقّعة وتنفّذها أخرى كغير موقّعة. ومن ممارسات البرمجة الجيدة إعلان `unsigned char` صراحةً إذا أردت استخدام النسخة غير الموقّعة من متغير `char`.

وقد يختلف العدد الدقيق للبايتات لكل نوع من أنواع C من معمارية إلى أخرى. والأحجام في [الجدول 2](#TabNumericCTypes) هي أحجام دنيا (وشائعة) لكل نوع. ويمكنك طباعة الحجم الدقيق على جهاز معيّن باستخدام المعامل `sizeof` في C، الذي يأخذ اسم نوع كوسيط ويُقيَّم إلى عدد البايتات المستخدمة لتخزين ذلك النوع. فمثلًا:

```c
printf("number of bytes in an int: %lu\n", sizeof(int));
printf("number of bytes in a short: %lu\n", sizeof(short));
```

يُقيَّم المعامل `sizeof` إلى قيمة long غير موقّعة، لذا استخدم في استدعاء `printf` العنصر النائب `%lu` لطباعة قيمته. وعلى معظم المعماريات ستكون مخرجات هاتين العبارتين:

```
number of bytes in an int: 4
number of bytes in a short: 2
```

#### المعاملات الحسابية {#_arithmetic_operators}

تجمع المعاملات الحسابية قيمًا من الأنواع العددية. ويعتمد النوع الناتج من العملية على أنواع المعاملات. فمثلًا، إذا جُمعت قيمتان `int` بمعامل حسابي، كان النوع الناتج عددًا صحيحًا أيضًا.

وتُجري C تحويلًا تلقائيًا للأنواع عندما يجمع معامل بين معاملين من نوعين مختلفين. فمثلًا، إذا جُمع معامل `int` بمعامل `float`، يُحوَّل المعامل الصحيح أولًا إلى ما يكافئه من الفاصلة العائمة قبل تطبيق المعامل، ويكون نوع نتيجة العملية `float`.

ويمكن استخدام المعاملات الحسابية التالية على معظم معاملات الأنواع العددية:

الجمع (`+`) والطرح (`-`)

الضرب (`*`) والقسمة (`/`) وباقي القسمة (`%`):

ولا يمكن لمعامل باقي القسمة (`%`) أن يأخذ إلا معاملات من الأنواع الصحيحة (`int` و`unsigned int` و`short` وهكذا).

وإذا كان كلا المعاملين من النوع `int`، ينفّذ معامل القسمة (`/`) قسمة صحيحة (تكون القيمة الناتجة `int`، وتُقتطع كل ما بعد النقطة العشرية من عملية القسمة). فمثلًا، تُقيَّم `8/3` إلى `2`.

وإذا كان أحد المعاملين أو كلاهما من النوع `float` (أو `double`)، ينفّذ `/` قسمة حقيقية ويُقيَّم إلى نتيجة `float` (أو `double`). فمثلًا، تُقيَّم `8 / 3.0` إلى `2.666667` تقريبًا.

الإسناد (`=`):

```
variable = value of expression;  // e.g., x = 3 + 4;
```

الإسناد مع التحديث (`+=` و`-=` و`*=` و`/=` و`%=`):

```
variable op= expression;  // e.g., x += 3; is shorthand for x = x + 3;
```

الزيادة (`++`) والإنقاص (`--`):

```
variable++;  // e.g., x++; assigns to x the value of x + 1
```

**تحذير — الزيادة السابقة مقابل اللاحقة**

> المعاملان `++variable` و`variable++` صالحان معًا، لكن يُقيَّمان تقييمًا مختلفًا قليلًا:
>
> - `++x`: زد `x` أولًا، ثم استخدم قيمته.
> - `x++`: استخدم قيمة `x` أولًا، ثم زدها.
>
> وفي حالات كثيرة لا يهم أيّهما تستخدم، لأن قيمة المتغير المزاد أو المنقوص لا تُستخدم في العبارة. فمثلًا، هاتان العبارتان متكافئتان (وإن كانت الأولى هي الصيغة الأكثر استخدامًا لهذه العبارة):
>
> ```c
> x++;
> ++x;
> ```
>
> وفي بعض الحالات يؤثر السياق في النتيجة (عندما تكون قيمة المتغير المزاد أو المنقوص *مستخدمة* في العبارة). فمثلًا:
>
> ```c
> x = 6;
> y = ++x + 2;  // y is assigned 9: increment x first, then evaluate x + 2 (9)
>
> x = 6;
> y = x++ + 2;  // y is assigned 8: evaluate x + 2 first (8), then increment x
> ```
>
> غالبًا ما تكون الشيفرة مثل المثال السابق التي تستخدم تعبيرًا حسابيًا مع معامل زيادة صعبة القراءة، ويسهل الخطأ فيها. ونتيجة لذلك، من الأفضل عمومًا تجنّب كتابة شيفرة كهذه؛ واكتب بدلًا منها عبارات منفصلة تعبّر عن الترتيب الذي تريده بالضبط. فمثلًا، إذا أردت زيادة `x` أولًا ثم إسناد `x + 1` إلى `y`، فاكتب ذلك كعبارتين منفصلتين.
>
> فبدلًا من كتابة هذا:
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

تطبع الدالة `printf` في C القيم إلى الطرفية، وتقرأ الدالة `scanf` القيم التي يُدخلها المستخدم. وتنتمي الدالتان `printf` و`scanf` إلى مكتبة الإدخال/الإخراج القياسية في C، التي يجب تضمينها صراحةً في أعلى أي ملف `.c` يستخدم هاتين الدالتين باستخدام `#include `. ونقدّم في هذا القسم أساسيات استخدام `printf` و`scanf` في برامج C. ويناقش [قسم "الإدخال/الإخراج" في الفصل 2](https://diveintosystems.org/book/C2-C_depth/IO.html#_io_in_c) دوال الإدخال والإخراج في C بمزيد من التفصيل.

### 16.2.1. printf {#_printf}

تشبه الدالة `printf` في C الدالة `System.out.printf` في Java إلى حد كبير، حيث يحدّد المستدعي سلسلة تنسيق للطباعة. وغالبًا ما تحتوي سلسلة التنسيق على محدّدات تنسيق، مثل محارف خاصة تطبع علامات جدولة (`\t`) أو أسطرًا جديدة (`\n`)، أو عناصر نائبة للقيم في الإخراج. وتتكوّن العناصر النائبة من `%` متبوعة بحرف محدّد نوع (فمثلًا `%d` يمثّل عنصرًا نائبًا لقيمة صحيحة). ولكل عنصر نائب في سلسلة التنسيق، تتوقع `printf` وسيطًا إضافيًا. ويحتوي [الجدول 1](#TabCSyntaxPrinting) على برنامج نموذجي بلغة Java وأخرى بلغة C بإخراج منسّق:

**الجدول 1. مقارنة الصياغة للطباعة في Java وC**

**نسخة Java**

```java
/* Java formatted print example */

class PrintfExample {

 public static void main(String[] args){

  System.out.printf("Name: %s, Info:\n",
                    "Vijay");
  System.out.printf("\tAge: %d\t Ht: %g\n",
                    20, 5.9);
  System.out.printf("\tYr: %d\t Dorm: %s\n",
                    3, "Alice Paul");
 }

}
```

**نسخة C**

```c
/* C printf example */

#include <stdio.h> // for printf

int main(void) {

  printf("Name: %s, Info:\n",
         "Vijay");
  printf("\tAge: %d\t Ht: %g\n",
         20, 5.9);
  printf("\tYr: %d\t Dorm: %s\n",
         3, "Alice Paul");

  return 0;
}
```

وعند التشغيل، تنتج نسختا هذا البرنامج مخرجات منسّقة بشكل مطابق:

```
Name: Vijay,  Info:
	Age: 20 	 Ht: 5.9
	Year: 3 	 Dorm: Alice Paul
```

وتستخدم C عناصر التنسيق النائبة نفسها التي تستخدمها Java لتحديد أنواع مختلفة من القيم. ويوضّح المثال السابق العناصر النائبة التالية:

```
%g:  placeholder for a float (or double) value
%d:  placeholder for a decimal value (int, short, char)
%s:  placeholder for a string value
%c:  placeholder for a char value
```

ويكون العنصر النائب `%c` مفيدًا عندما يريد المبرمج طباعة محرف ASCII المرتبط بترميز عددي معيّن. وهذا مقطع شيفرة C يطبع `char` بقيمته العددية (`%d`) وبترميزه كمحرف (`%c`):

```c
// Example printing a char value as its decimal representation (%d)
// and as the ASCII character that its value encodes (%c)

char ch;

ch = 'A';
printf("ch value is %d which is the ASCII value of  %c\n", ch, ch);

ch = 99;
printf("ch value is %d which is the ASCII value of  %c\n", ch, ch);
```

وعند التشغيل، تبدو مخرجات البرنامج هكذا:

```
ch value is 65 which is the ASCII value of  A
ch value is 99 which is the ASCII value of  c
```

### 16.2.2. scanf {#_scanf}

تمثّل الدالة `scanf` في C إحدى طرق قراءة القيم التي يُدخلها المستخدم (عبر لوحة المفاتيح) وتخزينها في متغيرات البرنامج. وقد تكون الدالة `scanf` انتقائية بعض الشيء بشأن الصيغة الدقيقة التي يُدخل بها المستخدم البيانات، ما يعني أنها ليست متينة جدًا في وجه إدخال المستخدم المشوّه. وفي [قسم "الإدخال/الإخراج" في الفصل 2](https://diveintosystems.org/book/C2-C_depth/IO.html#_io_in_c)، نناقش طرقًا أكثر متانة لقراءة قيم الإدخال من المستخدم. في الوقت الحالي، تذكّر أنه إذا وقع برنامجك في حلقة لا نهائية بسبب إدخال مستخدم مشوّه، فيمكنك دائمًا ضغط **CTRL-C** لإنهائه.

تُعالج قراءة الإدخال بشكل مختلف في Java وC: إذ تنشئ Java كائن `Scanner` جديدًا وتستخدم دواله لقراءة قيم من أنواع مختلفة وإعادتها، بينما تستخدم C الدالة `scanf` لقراءة قيم من أنواع مختلفة يحدّدها وسيط سلسلة التنسيق، وتخزينها في مواقع الذاكرة لمتغيرات البرنامج (مثل `&num1`). ويعرض [الجدول 2](#TabInputJavaComparison) برامج نموذجية لقراءة قيم إدخال المستخدم في Java وC:

**الجدول 2. مقارنة طرق قراءة قيم الإدخال في Java وC**

**نسخة Java**

```java
/* Java input example */

import java.util.Scanner;

class InputExample {

  public static void main(String[] args) {

    int num1, num2;
    Scanner in = new Scanner(System.in);

    System.out.print("Enter a number: ");
    num1 = in.nextInt();
    System.out.print("Enter another: ");
    num2 = in.nextInt();

    System.out.printf( "%d + %d = %d\n",
          num1, num2, (num1+num2) );
  }

}
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

  printf("%d + %d = %d\n",
       num1, num2, (num1+num2) );

  return 0;
}
```

وعند التشغيل، يقرأ البرنامجان قيمتين (هنا 30 و67):

```
Enter a number: 30
Enter another: 67
30 + 67 = 97
```

ومثل `printf`، تأخذ `scanf` سلسلة تنسيق تحدّد عدد القيم المراد قراءتها وأنواعها (فمثلًا `"%d"` تحدّد قيمة `int` واحدة). وتتخطى الدالة `scanf` المسافات البيضاء البادئة واللاحقة أثناء قراءتها قيمة عددية، لذا لا تحتاج سلسلة تنسيقها إلا إلى احتواء تتابع من العناصر النائبة للتنسيق، وعادةً بلا مسافات بيضاء أو محارف تنسيق أخرى بين العناصر النائبة في سلسلة تنسيقها. وتحدّد وسائط العناصر النائبة في سلسلة التنسيق *مواقع* متغيرات البرنامج التي ستُخزَّن فيها القيم المقروءة. وسبق اسم المتغير بالمعامل `&` ينتج موقع ذلك المتغير في ذاكرة البرنامج — أي عنوان الذاكرة الخاص بالمتغير. ويناقش [قسم "المؤشرات" في الفصل 2](https://diveintosystems.org/book/C2-C_depth/pointers.html#_cs_pointer_variables) المعامل `&` بمزيد من التفصيل. وفي الوقت الحالي، نستخدمه في سياق الدالة `scanf` فقط.

وهذا مثال آخر على `scanf`، حيث تحتوي سلسلة التنسيق على عنصرين نائبين لقيمتين، الأولى `int` والثانية `float`:

scanf_ex.c

```c
int x;
float pi;

// read in an int value followed by a float value ("%d%g")
// store the int value at the memory location of x (&x)
// store the float value at the memory location of pi (&pi)
scanf("%d%g", &x, &pi);
```

عند إدخال البيانات إلى برنامج عبر `scanf`، يجب فصل قيم الإدخال العددية الفردية بمحرف مسافة بيضاء واحد على الأقل. غير أنه بما أن `scanf` تتخطى محارف المسافات البيضاء البادئة واللاحقة الإضافية (مثل المسافات وعلامات الجدولة والأسطر الجديدة)، يمكن للمستخدم إدخال قيم بأي مقدار من المسافات قبل كل قيمة إدخال أو بعدها. فمثلًا، إذا أدخل المستخدم ما يلي لاستدعاء `scanf` في المثال السابق، فستقرأ `scanf` القيمة 8 وتخزّنها في المتغير `x`، ثم تقرأ 3.14 وتخزّنها في المتغير `pi`:

```
          8                   3.14
```

يوضّح [الجدول 1](#TabJavaIfElseComparison) أن صياغة عبارات `if`-`else` ودلالاتها في C وJava متماثلة.

**الجدول 1. مقارنة الصياغة لعبارات if-else في Java وC**

**نسخة Java**

```java
/* Java if-else example */

import java.util.Scanner;

class IfExample {

 public static void  main(String[] args) {

   int n1, n2;
   Scanner in = new Scanner(System.in);

   System.out.print("Enter 1st num: ");
   n1 = in.nextInt();
   System.out.print("Enter 2nd num: ");
   n2 = in.nextInt();

   if (n1 > n2) {
     System.out.printf("%d is biggest\n",n1);
     n2 = n1;
   } else {
     System.out.printf("%d is biggest\n",n2);
     n1 = n2;
   }
 }

}
```

**نسخة C**

```c
/* C if-else example */

#include <stdio.h>

int main(void) {

  int n1, n2;

  printf("Enter 1st num: ");
  scanf("%d", &n1);
  printf("Enter 2nd num: ");
  scanf("%d", &n2);

  if (n1 > n2) {
    printf("%d is biggest\n",n1);
    n2 = n1;
  } else {
    printf("%d is biggest\n",n2);
    n1 = n2;
  }

  return 0;
}
```

صياغة عبارات `if`-`else` في Java وC متطابقة. وفي كلتيهما، يكون الجزء `else` اختياريًا. كما تدعم Java وC التفريع متعدد الاتجاهات بربط عبارات `if` و`else if`. ويصف ما يلي صياغة `if`-`else` الكاملة في C:

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

### 16.3.1. القيم المنطقية في C {#_boolean_values_in_c}

لا توفّر C نوعًا منطقيًا (Boolean) بقيمتي true وfalse. وبدلًا من ذلك، تُقيَّم القيم الصحيحة إلى **true** (صحيح) أو **false** (خطأ) عند استخدامها في العبارات الشرطية. وعند استخدامها في التعبيرات الشرطية، فإن أي تعبير صحيح يكون:

- **صفرًا (0)** يُقيَّم إلى **false**
- **غير صفر (أي قيمة موجبة أو سالبة)** يُقيَّم إلى **true**

وتملك C مجموعة من المعاملات العلائقية والمنطقية للتعبيرات المنطقية مطابقة للمعاملات العلائقية والمنطقية في Java.

تأخذ **المعاملات العلائقية** معاملًا أو معاملات من النوع نفسه وتُقيَّم إلى صفر (خطأ) أو لا صفر (صحيح). ومجموعة المعاملات العلائقية هي:

- المساواة (`==`) وعدم المساواة (لا يساوي، `!=`)
- معاملات المقارنة: أصغر من (``)، وأكبر من أو يساوي (`>=`)

وفيما يلي بعض مقاطع شيفرة C تعرض أمثلة على المعاملات العلائقية:

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

وتأخذ **المعاملات المنطقية** في C معاملًا أو معاملات "منطقية" صحيحة وتُقيَّم إما إلى صفر (خطأ) وإما إلى لا صفر (صحيح). ومجموعة المعاملات المنطقية هي:

- النفي المنطقي (`!`)
- العطف المنطقي and (`&&`): يتوقف عن التقييم عند أول تعبير خطأ (short-circuiting)
- الفصل المنطقي or (`||`): يتوقف عن التقييم عند أول تعبير صحيح (short-circuiting)

ويتوقف تقييم المعاملات المنطقية **قصير الدائرة** (short-circuit) في C عن تقييم تعبير منطقي بمجرد أن تصبح النتيجة معروفة. فمثلًا، إذا قُيِّم المعامل الأول في تعبير العطف المنطقي (`&&`) إلى خطأ، وجب أن تكون نتيجة التعبير `&&` خطأ. ونتيجة لذلك، لا حاجة لتقييم قيمة المعامل الثاني، ولا تُقيَّم فعلًا.

وفيما يلي مثال على عبارات شرطية في C تستخدم معاملات منطقية (ومن الأفضل دائمًا استخدام أقواس حول التعبيرات المنطقية المعقّدة لتسهيل قراءتها):

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

### 16.3.2. الحلقات في C {#_loops_in_c}

تملك Java وC كلتاهما دعمًا على مستوى اللغة لتكرار تسلسل من الشيفرة. ومثل Java، تدعم C حلقات `for` و`while` و`do`-`while`. وصياغة هذه الحلقات ودلالاتها متطابقة في اللغتين. وتدعم Java إضافةً إلى ذلك التكرار عبر المجموعات، وهو ما لا تدعمه C.

#### حلقات while {#_while_loops}

صياغة حلقة `while` في C وJava متطابقة، وسلوكها واحد. ويعرض [الجدول 2](#TabWhileLoop) برنامج C نموذجيًا بحلقة `while`.

**الجدول 2. صياغة حلقة while في C**

**مثال على حلقة while بلغة C**

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

صياغة حلقة `while` في C هي نفسها في Java، وكلتاهما تُقيَّمان بالطريقة نفسها:

```c
while ( <boolean expression> ) {
    <true body>
}
```

وتتحقق حلقة `while` من التعبير المنطقي أولًا وتنفّذ الجسم إذا كان صحيحًا. وفي البرنامج المثال السابق، تُطبع قيمة المتغير `val` مرارًا في حلقة `while` حتى تصبح قيمته أكبر من قيمة المتغير `num`. وإذا أدخل المستخدم `10`، فسيطبع برنامجا C وJava:

```
1
2
4
8
```

وتملك Java وC أيضًا حلقة `do`-`while` تشبه حلقة `while`، لكنها تنفّذ جسم الحلقة أولًا ثم تتحقق من شرط وتكرر تنفيذ جسم الحلقة ما دام الشرط صحيحًا. أي أن حلقة `do`-`while` ستنفّذ جسم الحلقة مرة واحدة على الأقل دائمًا:

```c
do {
    <body>
} while ( <boolean expression> );
```

ولمزيد من الأمثلة على حلقات `while`، جرّب هذين البرنامجين:

- [whileLoop1.c](https://diveintosystems.org/book/Appendix1/_attachments/whileLoop1.c)
- [whileLoop2.c](https://diveintosystems.org/book/Appendix1/_attachments/whileLoop2.c)

#### حلقات for {#_for_loops}

حلقة `for` في C هي نفسها حلقة `for` في Java، وتُقيَّمان بالطريقة نفسها. وصياغة حلقة `for` في C (وفي Java) هي:

```c
for ( <initialization>; <boolean expression>; <step> ) {
    <body>
}
```

وقواعد تقييم حلقة `for` هي:

1. قيّم *التهيئة* مرة واحدة عند أول دخول إلى الحلقة.
2. قيّم *التعبير المنطقي*. وإذا كان 0 (خطأ)، اخرج من حلقة `for` (أي ينتهي البرنامج من تكرار عبارات جسم الحلقة).
3. قيّم العبارات داخل *جسم* الحلقة.
4. قيّم تعبير *الخطوة*.
5. كرر بدءًا من الخطوة (2).

وهذه حلقة `for` بسيطة لطباعة القيم 0 و1 و2:

```c
int i;

for (i = 0; i < 3; i++) {
    printf("%d\n", i);
}
```

وتطبيق قواعد تقييم حلقة `for` على الحلقة السابقة يعطي تسلسل الإجراءات التالي:

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

ويعرض البرنامج التالي مثالًا أعقد على حلقة `for` (وهو أيضًا [متاح للتنزيل](https://diveintosystems.org/book/Appendix1/_attachments/forLoop2.c)). لاحظ أنه لمجرد أن C تدعم حلقات `for` بقائمة عبارات في جزأي *التهيئة* و*الخطوة*، فمن الأفضل إبقاؤها بسيطة (يوضّح هذا المثال صياغة أعقد لحلقة `for`، لكن الحلقة ستكون أسهل قراءة وفهمًا لو بُسّطت بنقل عبارة الخطوة `j += 10` إلى نهاية جسم الحلقة والاكتفاء بعبارة خطوة واحدة هي `i += 1`).

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

وكما في Java، تتكافئ حلقات `for` وحلقات `while` في C في القوة، أي يمكن التعبير عن أي حلقة `while` بحلقة `for` والعكس صحيح.

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

ولأن حلقات `for` و`while` متساويتان في قدرة التعبير في C، لا حاجة في اللغة إلى أكثر من بنية تكرار واحدة. غير أن حلقات `for` بنية لغوية أكثر طبيعية للحلقات المحدّدة (مثل التكرار عبر نطاق من القيم)، بينما حلقات `while` بنية لغوية أكثر طبيعية للحلقات غير المحدّدة (مثل التكرار حتى يُدخل المستخدم عددًا زوجيًا). ونتيجة لذلك، توفّر C (وJava) كلتيهما للمبرمجين.

من الفروق الرئيسية بين Java وC أن C لغة أمرية وإجرائية وJava لغة كائنية التوجه. وفي C، تُنظَّم البرامج كدالة واحدة أو أكثر. ويجب أن يحتوي كل برنامج C على دالة `main` على الأقل، لكنه غالبًا يحتوي على دوال أخرى كثيرة. وفي Java، يُنظَّم البرنامج كمجموعة من الكائنات المتفاعلة. وتعريفات الفئات تحدّد حالة الكائنات ودوالها، فضلًا عن التعريفات والدوال الساكنة المرتبطة بالفئة. ولا توجد في Java دوال خارج تعريفات الفئات. وبرنامج Java الذي يتكوّن من فئة واحدة بلا أعضاء بيانات وبلا سوى دوال `public static` هو الأقرب في التصميم إلى برنامج C.

تقسّم الدوال الشيفرة إلى أجزاء يمكن إدارتها وتقلّل تكرار الشيفرة. وقد تأخذ الدوال صفرًا أو أكثر من **المعاملات** (parameters) كمدخل، وهي **تعيد** (return) قيمة واحدة من نوع محدّد. ويحدّد **إعلان** الدالة أو **نموذجها الأولي** (prototype) اسم الدالة ونوع قيمة إرجاعها وقائمة معاملاتها (عدد جميع المعاملات وأنواعها). ويتضمّن **تعريف** الدالة الشيفرة التي ستُنفَّذ عند استدعاء الدالة. ويجب إعلان جميع الدوال في C قبل استدعائها. ويمكن فعل ذلك بإعلان نموذج أولي للدالة أو بتعريف الدالة تعريفًا كاملًا قبل استدعائها:

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

وهذا مثال على تعريف دالة. لاحظ أن التعليقات تصف ما تفعله الدالة، وتفاصيل كل معامل (فيمَ يُستخدم وما ينبغي تمريره إليه)، وما تعيده الدالة:

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

والدوال التي لا تعيد قيمة ينبغي أن تحدّد نوع الإرجاع `void`. وهذا مثال على دالة `void`:

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

وكما في أي لغة برمجة تدعم الدوال أو الإجراءات، يستدعي **استدعاء الدالة** (function call) دالةً ما، ويمرّر قيم وسائط محدّدة لذلك الاستدعاء. وتُستدعى الدالة باسمها وتُمرَّر إليها وسائط، بواقع وسيط لكل معامل مقابل في الدالة. وفي C، يبدو استدعاء الدالة هكذا:

```javascript
// function call format:
// ---------------------
function_name(<argument list>);

// argument list format:
// ---------------------
<argument 1 expression>, <argument 2 expression>, ...,  <last argument expression>
```

وتُمرَّر وسائط دوال C **بالقيمة** (passed by value): إذ يُسنَد إلى كل معامل في الدالة *قيمة* الوسيط المقابل الذي مرّره المستدعي في استدعاء الدالة. وتعني دلالات التمرير بالقيمة أن أي تغيير في قيمة معامل داخل الدالة (أي إسناد قيمة جديدة لمعامل في الدالة) *لا يظهر* للمستدعي.

وفيما يلي بعض الأمثلة على استدعاءات الدالتين `max` و`print_table` المذكورتين سابقًا:

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

وهذا مثال آخر على برنامج كامل يعرض استدعاءً لتنفيذ مختلف قليلًا من الدالة `max` فيه عبارة إضافية لتغيير قيمة معاملها (`x = y`):

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

تُظهر المخرجات التالية كيف قد يبدو تشغيلان لهذا البرنامج. لاحظ الفرق في قيمة المعامل `x` (المطبوعة من داخل الدالة `max`) في التشغيلين. وتحديدًا، لاحظ أن تغيير قيمة المعامل `x` في التشغيل الثاني *لا* يؤثر في المتغير الذي مُرّر كوسيط إلى `max` بعد عودة الاستدعاء:

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

ولأن الوسائط *تُمرَّر بالقيمة* إلى الدوال، فإن النسخة السابقة من الدالة `max` التي تغيّر إحدى قيم معاملاتها تتصرف تمامًا كالنسخة الأصلية من `max` التي لا تغيّرها.

### 16.4.1. المكدّس {#_the_stack}

يتتبّع **مكدّس التنفيذ** (execution stack) حالة الدوال النشطة في البرنامج. وينشئ كل استدعاء دالة **إطار مكدّس** جديدًا (يُسمّى أحيانًا **إطار تنشيط** أو **سجل تنشيط**) يحتوي قيم معاملاته ومتغيراته المحلية. والإطار الموجود في قمة المكدّس هو الإطار النشط؛ وهو يمثّل تنشيط الدالة قيد التنفيذ حاليًا، ولا تكون في النطاق إلا متغيراته المحلية ومعاملاته. وعند استدعاء دالة، يُنشأ لها إطار مكدّس جديد (*يُدفع* إلى قمة المكدّس)، وتُخصَّص مساحة لمتغيراته المحلية ومعاملاته في الإطار الجديد. وعند عودة دالة، يُزال إطار مكدّسها من المكدّس (*يُسحب* من قمة المكدّس)، فيبقى إطار مكدّس المستدعي في قمة المكدّس.

وبالنسبة للبرنامج المثال السابق، عند نقطة في تنفيذه مباشرة قبل أن تنفّذ `max` عبارة `return`، سيبدو مكدّس التنفيذ كما في [الشكل 1](#FigCFunctionSimple). وتذكّر أن قيم الوسائط التي مرّرتها `main` إلى `max` *مُمرَّرة بالقيمة*، أي أن المعاملين `x` و`y` في `max` يُسنَد إليهما قيم الوسيطين المقابلين، `a` و`b` من الاستدعاء في `main`. ورغم أن الدالة `max` تغيّر قيمة `x`، فإن التغيير لا يؤثر في قيمة `a` في `main`.

![مكدّس به إطاران: main في الأسفل وmax فوقه. ويضمّ إطار مكدّس main ثلاثة متغيّرات: a (11)، وb (7)، وres (غير معرّف في هذه المرحلة). وضمن إطار مكدّس max ثلاثة متغيّرات أيضاً: x (11)، وy (7)، وbigger (11).](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-0-Function_simple.webp){#FigCFunctionSimple} الشكل 1. محتويات مكدّس التنفيذ مباشرة قبل العودة من الدالة max

ويتضمّن البرنامج الكامل التالي دالتين ويعرض أمثلة على استدعائهما من الدالة `main`. وفي هذا البرنامج، نعلن نموذجين أوليين للدالتين `max` و`print_table` فوق الدالة `main` لتتمكن `main` من الوصول إليهما رغم تعريفها أولًا. وتحتوي الدالة `main` الخطوات عالية المستوى للبرنامج الكامل، ويعكس تعريفها أولًا التصميم من أعلى إلى أسفل للبرنامج. ويتضمّن هذا المثال تعليقات تصف أجزاء البرنامج المهمة للدوال واستدعاءات الدوال. ويمكنك أيضًا تنزيل [البرنامج الكامل](https://diveintosystems.org/book/Appendix1/_attachments/function.c) وتشغيله.

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

**المصفوفة** (array) بنية في C تنشئ مجموعة مرتّبة من عناصر بيانات من النوع نفسه وتربط هذه المجموعة بمتغير برنامج واحد. وتعني كلمة **مرتّبة** أن كل عنصر في موضع محدّد في مجموعة القيم (أي يوجد عنصر في الموضع 0 والموضع 1 وهكذا)، لا أن القيم مرتّبة بالضرورة. والمصفوفات إحدى آليات C الأساسية لتجميع قيم بيانات متعددة والإشارة إليها باسم واحد. وتأتي المصفوفات في صور عدة، لكن الصورة الأساسية هي *المصفوفة أحادية البعد*، وهي مفيدة لتنفيذ بنى بيانات شبيهة بالقوائم والسلاسل في C. وتشبه مصفوفات C فئة Array في Java إلى حد كبير.

### 16.5.1. مقدمة إلى المصفوفات {#_introduction_to_arrays}

يمكن لمصفوفات C تخزين قيم بيانات متعددة من النوع *نفسه*. ونناقش في هذا الفصل المصفوفات **المعلَنة ساكنًا**، أي التي تكون سعتها الإجمالية (الحد الأقصى لعدد العناصر التي يمكن تخزينها في المصفوفة) ثابتة ومحدّدة عند إعلان متغير المصفوفة. ونناقش في الفصل 2 [المصفوفات المخصّصة ديناميكيًا](https://diveintosystems.org/book/C2-C_depth/arrays.html#_dynamically_allocated) و[المصفوفات متعددة الأبعاد](https://diveintosystems.org/book/C2-C_depth/arrays.html#_two_dimensional_arrays).

ويعرض [الجدول 1](#TabJavaArrayComparison) نسختي Java وC من برنامج يهيّئ مجموعة من القيم الصحيحة ثم يطبعها. وتستخدم نسختا Java وC كلتاهما مصفوفة من النوع `int` لتخزين مجموعة القيم.

وبشكل عام، توفّر Java واجهات عالية المستوى للمبرمج تخفي كثيرًا من تفاصيل التنفيذ منخفض المستوى. أما C، في المقابل، تكشف للمبرمج تنفيذًا منخفض المستوى للمصفوفات وتترك له تنفيذ الوظائف عالية المستوى. وبعبارة أخرى، تمكّن المصفوفات من تخزين البيانات منخفض المستوى دون وظائف القوائم عالية المستوى مثل `length` و`compare` و`binarySearch` وهكذا. وتوفّر Java أيضًا عدة تجريدات قوائم أعلى مستوى في فئتي `List` و`ArrayList`، وكلتاهما تدعم تغيير حجم قائمة القيم ديناميكيًا. وفي المقابل، يعود إلى مبرمج C تنفيذ هذه الأنواع من التجريدات فوق مصفوفاته ثابتة الحجم.

**الجدول 1. مقارنة الصياغة للمصفوفات في Java وC**

**نسخة Java**

```java
/* Example Java program using an Array */

class ArrayExample {

 public static void  main(String[] args) {

   int i, size = 0;

   // create and init array of 3 ints
   int[] small_arr = {1, 3, 5};

   // declare and create array of 10 ints
   int[] nums = new int[10];

   // set value of each element
   for (i = 0; i < 10; i++) {
      nums[i] = i;
      size++;
   }

   // set value at position 3 to 5
   nums[3] = small_arr[2];

   // print number of array elements
   System.out.printf("array size: %d\n",
        size);  // or nums.length

   // print each element of nums
   for (i = 0; i < 10; i++) {
     System.out.printf("%d\n", nums[i]);
   }

 }
}
```

**نسخة C**

```c
/* Example C program using arrays */

#include <stdio.h>

int main(void) {

  int i, size = 0;

  // declare and init array of 3 ints
  int small_arr[] = {1, 3, 5};

  // declare array of 10 ints
  int nums[10];

  // set value of each element
  for (i = 0; i < 10; i++) {
    nums[i] = i;
    size++;
  }

  // set value at position 3 to 5
  nums[3] = small_arr[2];

  // print number of array elements
  printf("array size: %d\n",
         size);

  // print each element of nums
  for (i = 0; i < 10; i++) {
    printf("%d\n", nums[i]);
  }

  return 0;
}
```

نسختا هذا البرنامج بلغة C وJava شبه متطابقتين. وتحديدًا، يمكن الوصول إلى العناصر الفردية عبر **الفهرسة** (indexing)، وتبدأ قيم الفهرس من `0`. أي أن اللغتين تشيران إلى العنصر الأول في المجموعة بأنه العنصر في الموضع `0`.

وفي C وJava معًا، المصفوفات بنى بيانات ثابتة السعة (على عكس البنى التي تزداد سعتها مع إضافة عناصر). وتتعلق الفروق الرئيسية بين نسختي C وJava لهذا البرنامج بكيفية إعلان نوع المصفوفة وكيفية حجز مساحة لسعتها.

في Java، صياغة نوع المصفوفة هي `[]` وتُخصَّص مساحة مصفوفة بسعة ما باستخدام `new []`. فمثلًا:

لمصفوفة Java:

```java
int[] nums;          // declare nums as an array of int
nums = new int[10];  // create a new int array of capacity 10
```

وفي C، تُعلَن أنواع المصفوفات باستخدام ` []`. فمثلًا:

لمصفوفة C:

```c
int nums[10];    // declare nums as an array of capacity 10
```

وعند إعلان متغير مصفوفة في C، يجب على المبرمج تحديد نوعها (نوع كل قيمة مخزّنة في المصفوفة) وسعتها الإجمالية (الحد الأقصى لعدد مواقع التخزين) كجزء من التعريف. فمثلًا:

```c
int  arr[10];  // declare an array of 10 ints
char str[20];  // declare an array of 20 chars
```

والتعريفان السابقان ينشئان متغيرًا اسمه `arr`، وهو مصفوفة من قيم `int` بسعة إجمالية 10، ومتغيرًا آخر اسمه `str`، وهو مصفوفة من قيم `char` بسعة إجمالية 20.

وتتيح Java وC للمبرمج أيضًا إعلان عناصر المصفوفة وتهيئتها في الإعلان نفسه (فمصفوفة `small_arr` في كلتا اللغتين مصفوفة بسعة 3 تخزّن القيم الصحيحة `1` و`3` و`5`):

```java
// java version:
int[]  small_arr = {1, 3, 5};
```

```c
// C version:
int  small_arr[] = {1, 3, 5};
```

ولأن المصفوفات كائنات في Java، توجد مجموعة كبيرة من دوال الفئة Array يمكن استخدامها للتفاعل مع مصفوفات Java بما يتجاوز الفهرسة البسيطة للحصول على القيم وضبطها. ومنها دوال للبحث في المصفوفة وإنشاء بنى بيانات أخرى من المصفوفة. أما دعم المصفوفات في C فيقتصر على إنشاء مجموعة مرتّبة من عناصر من النوع نفسه، ودعم الفهرسة للوصول إلى عناصر المصفوفة الفردية. وأي معالجة أعلى مستوى للمصفوفة يجب أن ينفّذها مبرمج C.

وتخزّن Java وC كلتاهما قيم المصفوفة في مواقع ذاكرة متجاورة. وتحدّد C تخطيط المصفوفة في ذاكرة البرنامج، بينما تخفي Java بعض تفاصيل ذلك عن المبرمج. وفي C، تُخصَّص عناصر المصفوفة الفردية في مواقع متتالية في ذاكرة البرنامج. فمثلًا، يقع موضع المصفوفة الثالث في الذاكرة مباشرة بعد موضع المصفوفة الثاني ومباشرة قبل موضع المصفوفة الرابع. وينطبق الشيء نفسه على Java، غير أن ما يُخزَّن غالبًا في مصفوفة Java مرجع كائن لا قيمة الكائن نفسه. ونتيجة لذلك، ومع أن مراجع الكائنات لعناصر المصفوفة المتجاورة تُخزَّن بشكل متجاور في ذاكرة البرنامج، فقد لا تُخزَّن الكائنات التي تشير إليها بشكل متجاور في الذاكرة.

### 16.5.2. طرق الوصول إلى المصفوفات {#_array_access_methods}

توفّر Java طرقًا متعددة للوصول إلى العناصر في مصفوفاتها. أما C فلا تدعم سوى الفهرسة كما وصفنا سابقًا. وتتراوح قيم الفهرس الصحيحة من 0 إلى سعة المصفوفة ناقص 1. وفيما يلي بعض الأمثلة:

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

يعلن هذا المثال المصفوفة بسعة 10 (فلها 10 عناصر)، لكنه لا يستخدم سوى العناصر الستة الأولى (فمجموعة قيمنا الحالية حجمها 6 لا 10). وكثيرًا ما يبقى بعض سعة المصفوفة غير مستخدم عند استخدام المصفوفات المعلَنة ساكنًا. ونتيجة لذلك، نحتاج إلى متغير برنامج آخر لتتبّع الحجم الفعلي (عدد العناصر) في المصفوفة (`num` في هذا المثال).

وتختلف Java وC في أساليب معالجة الأخطاء عندما يحاول برنامج الوصول إلى فهرس غير صحيح. فترفع Java استثناء `java.lang.ArrayIndexOutOfBoundsException` إذا استُخدمت قيمة فهرس غير صحيحة للوصول إلى عناصر في مصفوفة. أما في C، فيعود إلى المبرمج ضمان أن شيفرته تستخدم قيم فهرس صحيحة فقط عند الفهرسة في المصفوفات. ونتيجة لذلك، فبالنسبة لشيفرة مثل التالية تصل إلى عنصر مصفوفة يتجاوز حدود المصفوفة المخصّصة، يكون سلوك البرنامج عند التشغيل غير معرّف:

```c
int array[10];    // an array of size 10 has valid indices 0 through 9

array[10] = 100;  // 10 is not a valid index into the array
```

يسعد مترجم C بترجمة شيفرة تصل إلى مواضع مصفوفة تتجاوز حدود المصفوفة؛ فلا يوجد فحص للحدود من المترجم ولا عند التشغيل. ونتيجة لذلك، قد يؤدي تشغيل هذه الشيفرة إلى سلوك غير متوقع في البرنامج (وقد يختلف السلوك من تشغيل لآخر). وقد يؤدي إلى انهيار برنامجك، أو إلى تغيير قيمة متغير آخر، أو قد لا يكون له أي أثر في سلوك برنامجك. وبعبارة أخرى، يؤدي هذا الموقف إلى خطأ برمجي قد يظهر أو لا يظهر كسلوك غير متوقع. لذا، بصفتك مبرمج C، يعود إليك ضمان أن وصولك إلى المصفوفة يشير إلى مواضع صحيحة!

### 16.5.3. المصفوفات والدوال {#_arrays_and_functions}

تشبه دلالات تمرير المصفوفات إلى الدوال في C دلالات تمريرها في Java: إذ يمكن للدالة تغيير عناصر المصفوفة الممرَّرة. وهذا مثال على دالة تأخذ معاملين، هما معامل مصفوفة `int` (`arr`) ومعامل `int` (`size`):

```c
void print_array(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++) {
        printf("%d\n", arr[i]);
    }
}
```

تشير `[]` بعد اسم المعامل إلى المترجم أن نوع المعامل `arr` هو **مصفوفة من int**، لا `int` مثل المعامل `size`. ونعرض في الفصل 2 صياغة بديلة لتحديد معاملات المصفوفات. ولا تُحدَّد سعة معامل المصفوفة `arr`: فـ`arr[]` تعني أنه يمكن استدعاء هذه الدالة بوسيط مصفوفة بأي سعة. ولأنه لا توجد طريقة لمعرفة حجم المصفوفة أو سعتها من متغير المصفوفة وحده، فإن الدوال التي تُمرَّر إليها مصفوفات يكون لها دائمًا تقريبًا معامل ثانٍ يحدّد حجم المصفوفة (المعامل `size` في المثال السابق).

ولاستدعاء دالة لها معامل مصفوفة، مرّر **اسم المصفوفة** كوسيط. وهذا مقطع شيفرة C فيه أمثلة على استدعاءات الدالة `print_array`:

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

في C، يكافئ اسم متغير المصفوفة **العنوان الأساسي** للمصفوفة (أي موقع الذاكرة الخاص بعنصرها رقم 0). وبسبب دلالات الاستدعاء *بالقيمة* في C، عندما تمرّر مصفوفة إلى دالة، *لا* يُمرَّر كل عنصر من عناصر المصفوفة فرديًا إلى الدالة. وبعبارة أخرى، لا تتلقى الدالة نسخة من كل عنصر من عناصر المصفوفة. وبدلًا من ذلك، يحصل معامل المصفوفة على *قيمة العنوان الأساسي للمصفوفة*. ويعني هذا السلوك أنه عندما تعدّل دالة عناصر مصفوفة مُرّرت كمعامل، فإن التغييرات *ستبقى* بعد عودة الدالة. فمثلًا، تأمّل مقطع برنامج C التالي:

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

يُمرَّر إلى استدعاء الدالة `test` في `main` الوسيط `arr`، الذي قيمته العنوان الأساسي لمصفوفة `arr` في الذاكرة. ويحصل المعامل `a` في الدالة test على نسخة من قيمة هذا العنوان الأساسي. وبعبارة أخرى، *يشير المعامل `a` إلى مواقع تخزين المصفوفة نفسها التي يشير إليها وسيطه* `arr`. ونتيجة لذلك، عندما تغيّر دالة test قيمة مخزّنة في المصفوفة `a` (`a[3] = 8`)، فإنها تؤثر في الموضع المقابل في مصفوفة الوسيط (فأصبح `arr[3]` يساوي 8). والسبب أن قيمة `a` هي العنوان الأساسي لـ`arr`، وقيمة `arr` هي العنوان الأساسي لـ`arr`، لذا يشير كلٌّ من `a` و`arr` إلى المصفوفة نفسها (مواقع التخزين نفسها في الذاكرة)! ويعرض [الشكل 1](#FigCArrayStack) محتويات المكدّس عند نقطة في التنفيذ مباشرة قبل عودة دالة test.

![مكدّس به إطاران: main في الأسفل وtest في الأعلى. ويملك main متغيّرين: عدد صحيح n (5) ومصفوفة تحفظ القيم 0 و1 و2 و8 و4. وتملك test قيمتين أيضاً: عدد صحيح size (2) ومعامل مصفوفة arr يخزّن العنوان الأساسي للمصفوفة في إطار مكدّس main.](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-0-arraystack.webp){#FigCArrayStack} الشكل 1. محتويات المكدّس لدالة لها معامل مصفوفة

يُمرَّر إلى المعامل `a` قيمة العنوان الأساسي لمصفوفة الوسيط `arr`، ما يعني أن كليهما يشير إلى المجموعة نفسها من مواقع تخزين المصفوفة في الذاكرة. ونشير إلى ذلك بالسهم من `a` إلى `arr`. والقيم التي تعدّلها الدالة `test` مميّزة. ولا يؤدي تغيير قيمة المعامل `size` إلى تغيير قيمة وسيطه المقابل `n`، لكن تغيير قيمة أحد العناصر التي يشير إليها `a` (مثل `a[3] = 8`) يؤثر فعلًا في قيمة الموضع المقابل في `arr`.

### 16.5.4. مقدمة إلى السلاسل ومكتبة سلاسل C {#_introduction_to_strings_and_the_c_string_library}

تنفّذ Java فئة `String` وتوفّر واجهة غنية لاستخدام السلاسل. أما C فلا تعرّف نوع سلاسل. وبدلًا من ذلك، تُنفَّذ السلاسل كمصفوفات من قيم `char`. وليست كل مصفوفة محارف تُستخدم كسلسلة C، لكن كل سلسلة C هي مصفوفة محارف.

تذكّر أن المصفوفات في C قد تُعرَّف بحجم أكبر مما يستخدمه البرنامج في النهاية. فمثلًا، رأينا سابقًا في قسم ["طرق الوصول إلى المصفوفات"](#_array_access_methods) أننا قد نعلن مصفوفة بحجم 10 لكننا لا نستخدم سوى المواضع الستة الأولى. ولهذا السلوك آثار مهمة على السلاسل: فلا يمكننا افتراض أن طول السلسلة يساوي طول المصفوفة التي تخزّنها. ولهذا السبب، يجب أن تنتهي السلاسل في C بقيمة محرف خاصة، هي **المحرف الصفري** (null character) (`'\0'`)، للإشارة إلى نهاية السلسلة.

وتُوصف السلاسل التي تنتهي بمحرف صفري بأنها **منتهية بمحرف صفري** (null-terminated). ومع أنه *ينبغي* أن تكون جميع السلاسل في C منتهية بمحرف صفري، فإن الفشل في مراعاة المحارف الصفرية مراعاة صحيحة مصدر شائع للأخطاء لدى مبرمجي C المبتدئين. وعند استخدام السلاسل، من المهم أن تضع في اعتبارك أن مصفوفات المحارف لديك يجب أن تُعلَن بسعة تكفي لتخزين كل قيمة محرف في السلسلة بالإضافة إلى المحرف الصفري (`'\0'`). فمثلًا، لتخزين السلسلة `"hi"`، تحتاج إلى مصفوفة من ثلاثة محارف على الأقل (واحد لتخزين `'h'` وواحد لتخزين `'i'` وواحد لتخزين `'\0'`).

ولأن السلاسل تُستخدم كثيرًا، توفّر C مكتبة سلاسل تحتوي دوالًا لمعالجة السلاسل. والبرامج التي تستخدم دوال مكتبة السلاسل هذه تحتاج إلى تضمين الترويسة `string.h`.

وتوفّر مكتبة سلاسل C بعض الوظائف المشابهة لفئة `String` في Java لمعالجة قيم السلاسل. غير أن البرنامج في C مسؤول عن ضمان أن السلاسل الممرَّرة إلى مكتبة سلاسل C سليمة التكوين (مصفوفات محارف منتهية بمحرف صفري) وأن مصفوفات المحارف الممرَّرة لها سعة كافية لدالة المكتبة. أما Java فتخفي هذه التفاصيل عن المبرمج، وبالتالي لا يحتاج المبرمج إلى التفكير فيها عند استخدام السلاسل في برنامجه بلغة Java.

وعند طباعة قيمة سلسلة بـ`printf`، استخدم العنصر النائب `%s` في سلسلة التنسيق. وستطبع الدالة `printf` جميع المحارف في وسيط المصفوفة حتى تصادف المحرف `'\0'`. وبالمثل، غالبًا ما تحدّد دوال مكتبة السلاسل نهاية السلسلة بالبحث عن المحرف `'\0'` أو تضيف محرف `'\0'` إلى نهاية أي سلسلة تعدّلها.

وهذا برنامج نموذجي يستخدم السلاسل ودوال مكتبة السلاسل:

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

تعيد الدالة `strlen` في مكتبة سلاسل C عدد المحارف في وسيطها من نوع سلسلة. ولا يُحتسب المحرف الصفري المنهي للسلسلة جزءًا من طول السلسلة، لذا يعيد استدعاء `strlen(str1)` القيمة 2 (طول السلسلة `"hi"`). وتنسخ الدالة `strcpy` محرفًا واحدًا في المرة من سلسلة مصدر (المعامل الثاني) إلى سلسلة هدف (المعامل الأول) حتى تصل إلى محرف صفري في المصدر.

لاحظ أن معظم دوال مكتبة سلاسل C تتوقع أن يمرّر الاستدعاء مصفوفة محارف لها سعة كافية لتؤدي الدالة عملها. فمثلًا، لا تريد استدعاء `strcpy` بسلسلة هدف ليست كبيرة بما يكفي لاحتواء المصدر؛ إذ سيؤدي ذلك إلى سلوك غير معرّف في برنامجك!

كما تشترط دوال مكتبة سلاسل C أن تكون قيم السلاسل الممرَّرة إليها سليمة التكوين، بمحرف `'\0'` منهٍ. ويعود إليك بصفتك مبرمج C ضمان تمرير سلاسل صحيحة لتعالجها دوال مكتبة C. وهكذا، في استدعاء `strcpy` في المثال السابق، لو لم تكن سلسلة المصدر (`str1`) مهيّأة بمحرف `'\0'` منهٍ، لواصلت `strcpy` لما بعد حدود مصفوفة `str1`، ما يؤدي إلى سلوك غير معرّف قد يسبب انهياره.

**تحذير**

> يستخدم المثال السابق الدالة `strcpy` استخدامًا آمنًا. لكن `strcpy` بشكل عام تشكّل خطرًا أمنيًا لأنها تفترض أن هدفها كبير بما يكفي لتخزين السلسلة كاملة، وهو ما قد لا يكون صحيحًا دائمًا (مثلًا إذا جاءت السلسلة من إدخال المستخدم).
>
> اخترنا عرض `strcpy` الآن لتبسيط المقدمة إلى السلاسل، لكننا نوضّح بدائل أكثر أمانًا في [القسم 2.6](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library).

ونناقش في الفصل 2 [سلاسل C ومكتبة سلاسل C](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library) بمزيد من التفصيل.

المصفوفات والبنى هما الطريقتان اللتان تدعم بهما C إنشاء مجموعات من عناصر البيانات. وتُستخدم المصفوفات لإنشاء مجموعة مرتّبة من عناصر بيانات من النوع نفسه، بينما تُستخدم **البنى** (structs) لإنشاء مجموعة من عناصر بيانات من أنواع *مختلفة*. ويمكن لمبرمج C دمج لبنات المصفوفات والبنى بطرق مختلفة كثيرة لإنشاء أنواع وبنى بيانات أكثر تعقيدًا. يقدّم هذا القسم البنى، ونوضّح في الفصل 2 [البنى بمزيد من التفصيل](https://diveintosystems.org/book/C2-C_depth/structs.html#_c_structs) و[نبيّن كيف يمكن دمجها مع المصفوفات](https://diveintosystems.org/book/C2-C_depth/structs.html#_arrays_of_structs).

C ليست لغة كائنية التوجه؛ لذا لا تدعم الفئات. غير أنها تدعم تعريف أنواع بنيوية، تشبه الجزء العام من بيانات الفئات. والـ`struct` نوع يُستخدم لتمثيل مجموعة غير متجانسة من البيانات؛ وهو آلية لمعاملة مجموعة من أنواع مختلفة كوحدة واحدة متماسكة. وتوفّر بنى C مستوى من التجريد فوق قيم البيانات الفردية، فتعاملها كنوع واحد. فمثلًا، الطالب له اسم وعمر ومعدل تراكمي (GPA) وسنة تخرّج. ويمكن للمبرمج تعريف نوع `struct` جديد يجمع عناصر البيانات الأربعة في متغير `struct student` واحد يحتوي قيمة اسم (من النوع `char []` لحمل سلسلة)، وقيمة عمر (من النوع `int`)، وقيمة GPA (من النوع `float`)، وقيمة سنة تخرّج (من النوع `int`). ويمكن لمتغير واحد من نوع البنية هذا تخزين الأجزاء الأربعة كلها لطالب معيّن؛ مثلًا ("Freya"، 19، 3.7، 2021).

وتوجد ثلاث خطوات لتعريف أنواع `struct` واستخدامها في برامج C:

1. عرّف نوع `struct` جديدًا يمثّل البنية.
2. أعلن متغيرات من نوع `struct` الجديد.
3. استخدم صيغة النقطة (`.`) للوصول إلى قيم الحقول الفردية للمتغير.

### 16.6.1. تعريف نوع بنية {#_defining_a_struct_type}

ينبغي أن يظهر تعريف نوع البنية *خارج أي دالة*، وعادةً قريبًا من أعلى ملف `.c` الخاص بالبرنامج. وصياغة تعريف نوع بنية جديد هي التالية (`struct` كلمة مفتاحية محجوزة):

```c
struct <struct_name> {
    <field 1 type> <field 1 name>;
    <field 2 type> <field 2 name>;
    <field 3 type> <field 3 name>;
    ...
};
```

وهذا مثال على تعريف نوع `struct studentT` جديد لتخزين بيانات الطلاب:

```c
struct studentT {
    char name[64];
    int age;
    float gpa;
    int grad_yr;
};
```

يضيف تعريف البنية هذا نوعًا جديدًا إلى نظام أنواع C، واسم النوع هو `struct studentT`. وتعرّف هذه البنية أربعة حقول، ويتضمّن تعريف كل حقل نوع الحقل واسمه. لاحظ أن نوع الحقل `name` في هذا المثال مصفوفة محارف، [لاستخدامها كسلسلة](https://diveintosystems.org/book/Appendix1/arrays_strings.html#_introduction_to_strings_and_the_c_string_library).

### 16.6.2. إعلان متغيرات من أنواع البنى {#_declaring_variables_of_struct_types}

بعد تعريف النوع، يمكنك إعلان متغيرات من النوع الجديد `struct studentT`. لاحظ أنه خلافًا للأنواع الأخرى التي صادفناها حتى الآن والتي تتكوّن من كلمة واحدة فقط (مثل `int` و`char` و`float`)، فإن اسم نوع بنيتنا الجديد يتكوّن من كلمتين، `struct studentT`.

```c
struct studentT student1, student2; // student1, student2 are struct studentT
```

### 16.6.3. الوصول إلى قيم الحقول {#_accessing_field_values}

للوصول إلى قيم الحقول في متغير بنية، استخدم *صيغة النقطة*:

```bash
<variable name>.<field name>
```

عند الوصول إلى البنى وحقولها، تأمّل بعناية أنواع المتغيرات التي تستخدمها. فغالبًا ما يُدخل مبرمجو C المبتدئون أخطاءً في برامجهم لأنهم لا يراعون أنواع حقول البنى. ويعرض [الجدول 1](#TabCStructTypes) أنواع عدة تعبيرات تتعلق بنوع `struct studentT` لدينا.

| التعبير | نوع C |
| --- | --- |
| `student1` | `struct studentT` |
| `student1.age` | عدد صحيح (`int`) |
| `student1.name` | مصفوفة محارف (`char []`) |
| `student1.name[3]` | محرف (`char`)، النوع المخزّن في كل موضع من مصفوفة name |

وفيما يلي بعض الأمثلة على إسناد حقول متغير `struct studentT`:

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

ويوضّح [الشكل 1](#FigCStudentStruct) تخطيط المتغير `student1` في الذاكرة بعد إسنادات الحقول في المثال السابق. ولا تُخزَّن في الذاكرة إلا حقول متغير البنية (المناطق داخل الصناديق). وأسماء الحقول مُعلَّمة في الشكل للوضوح، لكن الحقول بالنسبة لمترجم C مجرد مواقع تخزين أو **إزاحات** (offsets) من بداية ذاكرة متغير البنية. فمثلًا، بناءً على تعريف `struct studentT`، يعرف المترجم أنه للوصول إلى الحقل المسمّى `gpa`، يجب تجاوز مصفوفة من 64 محرفًا (`name`) وعدد صحيح واحد (`age`). لاحظ أن حقل `name` في الشكل لا يعرض سوى المحارف الستة الأولى من مصفوفة المحارف الـ64.

![تخطيط ذاكرة student1: حقل name مصفوفة محارف تحوي 'k' 'w' 'a' 'm' 'e' …​ وحقل age يحمل 20، وحقل gpa يخزّن 3.5، وحقل grad_yr يحوي 2020.](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-0-studentstruct.webp){#FigCStudentStruct} الشكل 1. ذاكرة المتغير student1 بعد إسناد كل حقل من حقوله

أنواع بنى C **قيم قابلة للإسناد** (lvalues)، أي يمكن أن تظهر في الجانب الأيسر من عبارة إسناد. وهكذا، يمكن إسناد قيمة متغير بنية إلى متغير بنية آخر بعبارة إسناد بسيطة. وتُ*نسخ* قيم حقول البنية في الجانب الأيمن من عبارة الإسناد إلى قيم حقول البنية في الجانب الأيسر منها. وبعبارة أخرى، تُنسخ محتويات ذاكرة بنية ما إلى ذاكرة الأخرى. وهذا مثال على إسناد قيم بنية بهذه الطريقة:

```c
student2 = student1;  // student2 gets the value of student1
                      // (student1's field values are copied to
                      //  corresponding field values of student2)

strcpy(student2.name, "Frances Allen");  // change one field value
```

ويعرض [الشكل 2](#FigCStructAssign) قيم متغيري الطالب بعد تنفيذ عبارة الإسناد واستدعاء `strcpy`. لاحظ أن الشكل يعرض حقلي `name` كقيمتي السلسلتين التي تحتويانها لا كمصفوفة المحارف الـ64 كاملة.

![قيم البنية والإسناد: تُسند قيم حقول البنية على الجانب الأيمن إلى قيم الحقول المقابلة في البنية على الجانب الأيسر من عبارة الإسناد.](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-1-structassign.webp){#FigCStructAssign} الشكل 2. تخطيط بنيتي student1 وstudent2 بعد تنفيذ إسناد البنية واستدعاء strcpy

وتوفّر C المعامل `sizeof` الذي يأخذ نوعًا ويعيد عدد البايتات التي يستخدمها النوع. ويمكن استخدام المعامل `sizeof` على أي نوع من أنواع C، بما فيها أنواع البنى، لمعرفة مقدار مساحة الذاكرة التي يحتاجها متغير من ذلك النوع. فمثلًا، يمكننا طباعة حجم نوع `struct studentT`:

```c
// Note: the `%lu` format placeholder specifies an unsigned long value.
printf("number of bytes in student struct: %lu\n", sizeof(struct studentT));
```

وعند التشغيل، ينبغي أن يطبع هذا السطر قيمة *لا تقل عن* 76 بايت، لأن مصفوفة `name` تحتوي 64 محرفًا (بايت واحد لكل `char`)، و4 بايتات لحقل `age` من النوع `int`، و4 بايتات لحقل `gpa` من النوع `float`، و4 بايتات لحقل `grad_yr` من النوع `int`. وقد يكون العدد الدقيق للبايتات أكبر من 76 على بعض الأجهزة.

وهذا [برنامج مثال كامل](https://diveintosystems.org/book/Appendix1/_attachments/studentTstruct.c) يعرّف نوع `struct studentT` لدينا ويوضّح استخدامه:

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

وعند التشغيل، يُخرج هذا البرنامج ما يلي:

```
name: Kwame Salter age: 20 gpa: 3.5, year: 2020
name: Frances Allen age: 20 gpa: 3.5, year: 2021
number of bytes in student struct: 76
```

البنى قيم قابلة للإسناد (lvalues)

**القيمة القابلة للإسناد** (lvalue) تعبير يمكن أن يظهر في الجانب الأيسر من عبارة إسناد. وهو تعبير يمثّل موقع تخزين في الذاكرة. وبينما نقدّم أنواع المؤشرات في C وأمثلة على إنشاء بنى أكثر تعقيدًا تدمج مصفوفات C والبنى والمؤشرات، من المهم التفكير بعناية في الأنواع ووضع نصب العين أي تعبيرات C صالحة كقيم قابلة للإسناد (أي يمكن استخدامها في الجانب الأيسر من عبارة إسناد).

ومن معرفتنا بـC حتى الآن، فإن المتغيرات الفردية للأنواع الأساسية وعناصر المصفوفات والبنى كلها قيم قابلة للإسناد. أما اسم مصفوفة معلَنة ساكنًا فـ*ليس* قيمة قابلة للإسناد (فلا يمكنك تغيير العنوان الأساسي لمصفوفة معلَنة ساكنًا في الذاكرة). ويوضّح مقطع الشيفرة التالي عبارات إسناد C صالحة وغير صالحة بناءً على حالة القابلية للإسناد لدى أنواع مختلفة:

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

### 16.6.4. تمرير البنى إلى الدوال {#_passing_structs_to_functions}

في C، تُمرَّر وسائط جميع الأنواع *بالقيمة* إلى الدوال. ولذلك، إذا كان للدالة معامل من نوع بنية، فعند استدعائها بوسيط بنية، تُمرَّر **قيمة** الوسيط إلى معاملها، أي يحصل المعامل على نسخة من قيمة وسيطه. وقيمة متغير البنية هي محتويات ذاكرته، ولهذا يمكننا إسناد حقول بنية لتطابق بنية أخرى في عبارة إسناد واحدة كهذه:

```c
student2 = student1;
```

ولأن قيمة متغير البنية تمثّل كامل محتويات ذاكرته، فإن تمرير بنية كوسيط إلى دالة يمنح المعامل **نسخة** من قيم جميع حقول بنية الوسيط. وإذا غيّرت الدالة قيم حقول معامل بنية، فإن التغييرات في قيم حقول المعامل *لا أثر لها* في قيم الحقول المقابلة في الوسيط. أي أن التغييرات في حقول المعامل تعدّل القيم في مواقع ذاكرة المعامل لتلك الحقول فقط، لا في مواقع ذاكرة الوسيط لتلك الحقول.

وهذا [برنامج مثال كامل](https://diveintosystems.org/book/Appendix1/_attachments/structfunc.c) يستخدم الدالة `checkID` التي تأخذ معامل بنية:

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

عندما تستدعي `main` الدالة `checkID`، تُمرَّر قيمة بنية `student` (نسخة من محتويات ذاكرة جميع حقولها) إلى المعامل `s`. وعندما تغيّر الدالة قيمة حقل `age` في معاملها، فإنها *لا* تؤثر في حقل `age` في وسيطها (`student`). ويمكن ملاحظة هذا السلوك بتشغيل البرنامج، الذي يُخرج ما يلي:

```
Ruth is 19 years old
Ruth is only 17 years old and cannot vote.
```

تُظهر المخرجات أنه عندما تطبع `checkID` الحقل `age`، فإنها تعكس تغيير الدالة في حقل `age` للمعامل `s`. غير أنه بعد عودة استدعاء الدالة، تطبع `main` الحقل `age` في `student` بالقيمة نفسها التي كان عليها قبل استدعاء `checkID`. ويوضّح [الشكل 3](#FigCStructStack) محتويات مكدّس الاستدعاء مباشرة قبل عودة الدالة `checkID`.

![عند تمرير بنية student إلى checkID يحصل المعامل على نسخة من محتوياتها. وعند أن تعدّل checkID حقل age إلى 19 لا يسري التعديل إلا على نسختها المحلية، فيبقى حقل age في بنية student داخل main عند 17.](https://diveintosystems.org/images/dive-into-systems/c16-appendix-1-2-structstack.webp){#FigCStructStack} الشكل 3. محتويات مكدّس الاستدعاء قبل العودة من الدالة checkID

وفهم دلالات التمرير بالقيمة لمعاملات البنى مهم بشكل خاص عندما تحتوي البنية على حقل مصفوفة معلَنة ساكنًا (مثل حقل `name` في `struct studentT`). وعند تمرير بنية كهذه إلى دالة، تُنسخ محتويات ذاكرة وسيط البنية كاملة، بما فيها كل عنصر مصفوفة في حقل المصفوفة، إلى معاملها. وإذا غيّرت الدالة محتويات مصفوفة المعامل البنيوي، فإن تلك التغييرات *لن* تبقى بعد عودة الدالة. وقد يبدو هذا السلوك غريبًا بالنظر إلى ما نعرفه عن [كيفية تمرير المصفوفات إلى الدوال](https://diveintosystems.org/book/Appendix1/arrays_strings.html#_arrays_and_functions)، لكنه متسق مع سلوك نسخ البنى الذي وصفناه سابقًا.

قدّمنا في هذا الفصل أجزاء كثيرة من لغة البرمجة C بمقارنتها بتراكيب لغوية مشابهة في Java، وهي لغة قد يعرفها كثير من القراء. وتملك C سمات لغوية مشابهة لسمات كثير من لغات البرمجة الأمرية والكائنية عالية المستوى الأخرى، بما فيها المتغيرات والحلقات والتعبيرات الشرطية والدوال والإدخال/الإخراج. ومن الفروق الرئيسية بين سمات C وJava التي ناقشناها أن C لغة أمرية وإجرائية وJava لغة كائنية التوجه، وأن مصفوفات وسلاسل C تجريد أدنى مستوى من فئات array وArrayList وList وString في Java، وأن Java تملك مكتبة فئات واسعة من الأنواع المعقّدة بينما C لغة أصغر بتجريدات أدنى مستوى. وتتيح التجريدات الأدنى مستوى لمبرمج C تحكمًا أكبر في كيفية وصول برنامجه إلى ذاكرته، وبالتالي تحكمًا أكبر في كفاءة برنامجه.

ونغطي في [الفصل 2](https://diveintosystems.org/book/C2-C_depth/index.html) لغة البرمجة C بالتفصيل. ونعيد النظر بعمق أكبر في سمات اللغة الكثيرة المقدَّمة في هذا الفصل، ونقدّم بعض سمات لغة C الجديدة، وأبرزها متغيرات المؤشرات في C ودعم تخصيص الذاكرة الديناميكي.

- [جميع تمارين الملحق 1/الفصل 1](https://diveintosystems.org/exercises/dive-into-systems-exercises-4.html) (تمارين الملحق 1 هي نفسها تمارين الفصل 1)
- [تمرين واحد من قسم Java إلى C في الملحق 1، القسم 1](https://diveintosystems.org/exercises/section-16_1.html)
