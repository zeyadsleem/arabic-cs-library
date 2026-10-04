---
title: "3. أدوات تنقيح C"
lang: ar
source: https://diveintosystems.org/book/C3-C_debug/index.html
---

نقدّم في هذا القسم أداتين للتنقيح: منقّح GNU [(GDB)](https://www.gnu.org/software/gdb)، المفيد لفحص الحالة وقت تشغيل البرنامج، و[Valgrind](http://valgrind.org/info/tools.html) (وتُلفظ «Val-grinned»)، وهي مجموعة أدوات شائعة لتحليل أداء الشيفرة. وتحديداً، نقدّم أداة [Memcheck](https://valgrind.org/docs/manual/mc-manual.html) من Valgrind، التي تحلل وصولات ذاكرة البرنامج لكشف استخدام ذاكرة غير صالح واستخدام ذاكرة غير مهيّأة وتسريبات الذاكرة.

يتضمن قسم GDB جلستي GDB مثاليتين توضحان أوامر GDB شائعة الاستخدام لإيجاد الأخطاء في البرامج. ونناقش أيضاً بعض ميزات GDB المتقدمة، منها إرفاق GDB بعملية قيد التشغيل، وGDB وملفات Makefile، والتحكم في الإشارات في GDB، والتنقيح على مستوى شيفرة لغة التجميع، وتنقيح برامج Pthreads متعددة الخيوط.

يناقش قسم Valgrind أخطاء الوصول إلى الذاكرة وسبب صعوبة كشفها الشديدة. ويتضمن أيضاً تشغيلاً مثالياً لأداة Memcheck على برنامج به بعض أخطاء الوصول إلى الذاكرة السيئة. وتتضمن مجموعة Valgrind أدوات أخرى لتحليل البرامج وتنقيحها، نغطيها في فصول لاحقة. فمثلاً، نغطي أداة تحليل الذاكرة المؤقتة [Cachegrind](https://valgrind.org/docs/manual/cg-manual.html) في [الفصل 11](https://diveintosystems.org/book/C11-MemHierarchy/cachegrind.html#_cache_analysis_and_valgrind) وأداة تحليل استدعاءات الدوال [Callgrind](http://valgrind.org/docs/manual/cl-manual.html) في [الفصل 12](https://diveintosystems.org/book/C12-CodeOpt/basic.html#_using_callgrind_to_profile).

يستطيع [GDB](https://www.gnu.org/software/gdb/) مساعدة المبرمجين في إيجاد الأخطاء في برامجهم وإصلاحها. ويعمل GDB مع برامج مصرَّفة بلغات متنوعة، لكننا نركّز هنا على C. والمنقّح (debugger) برنامج يتحكم في تنفيذ برنامج آخر (البرنامج الجاري تنقيحه) — وهو يتيح للمبرمجين رؤية ما تفعله برامجهم أثناء تشغيلها. وقد يساعد استخدام المنقّح المبرمجين في اكتشاف الأخطاء وتحديد أسباب الأخطاء التي يجدونها. وفيما يلي بعض الإجراءات المفيدة التي يستطيع GDB تنفيذها:

- بدء برنامج والتقدم خلاله سطراً سطراً
- إيقاف تنفيذ برنامج مؤقتاً عند وصوله إلى نقاط معينة في شيفرته
- إيقاف تنفيذ برنامج مؤقتاً عند شروط يحددها المستخدم
- عرض قيم المتغيّرات عند النقطة التي يتوقف فيها تنفيذ البرنامج
- متابعة تنفيذ البرنامج بعد الإيقاف
- فحص حالة تنفيذ البرنامج عند انهياره
- فحص محتويات أي إطار مكدّس في مكدّس الاستدعاء

يضع مستخدمو GDB عادةً **نقاط توقّف** (breakpoints) في برامجهم. وتحدد نقطة التوقّف نقطة في البرنامج يوقف GDB تنفيذ البرنامج عندها مؤقتاً. وعندما يصادف البرنامج الجاري تنفيذه نقطة توقّف، يوقف GDB تنفيذه ويتيح للمستخدم إدخال أوامر GDB لفحص متغيّرات البرنامج ومحتويات المكدّس، والتقدم خلال تنفيذ البرنامج سطراً واحداً في كل مرة، وإضافة نقاط توقّف جديدة، ومتابعة تنفيذ البرنامج حتى يصادف نقطة التوقّف التالية.

كما توفّر كثير من أنظمة Unix [منقّح عرض البيانات (DDD)](https://www.gnu.org/software/ddd/)، وهو غلاف رسومي سهل الاستخدام يحيط ببرنامج تنقيح بسطر الأوامر (GDB مثلاً). ويقبل برنامج DDD الوسائط والأوامر نفسها التي يقبلها GDB، لكنه يوفّر واجهة رسومية بخيارات قائمة التنقيح إضافة إلى واجهة سطر الأوامر الخاصة بـ GDB.

بعد مناقشة بعض المقدمات عن كيفية [البدء بـ GDB](#_getting_started_with_gdb)، نعرض جلستي تنقيح مثاليتين بـ GDB تقدّمان أوامر GDB شائعة الاستخدام في سياق إيجاد أنواع مختلفة من الأخطاء. وتوضح الجلسة الأولى ([GDB على badprog.c](#_example_gdb_sessions)) كيفية استخدام أوامر GDB لإيجاد أخطاء منطقية في برنامج C. وتوضح الجلسة الثانية ([GDB على segfaulter.c](#_segfaulter_)) مثالاً على استخدام أوامر GDB لفحص حالة تنفيذ البرنامج عند انهياره من أجل اكتشاف سبب الانهيار.

وفي قسم [أوامر GDB الشائعة](https://diveintosystems.org/book/C3-C_debug/gdb_commands.html#_common_gdb_commands)، نصف أوامر GDB شائعة الاستخدام بمزيد من التفصيل، مع عرض مزيد من الأمثلة على بعض الأوامر. وفي أقسام لاحقة، نناقش بعض ميزات GDB المتقدمة.

### 3.1.1. البدء بـ GDB {#_getting_started_with_gdb}

عند تنقيح برنامج، يساعد تصريفه بخيار `-g`، الذي يضيف معلومات تنقيح إضافية إلى الملف التنفيذي الثنائي. وتساعد هذه المعلومات الإضافية المنقّح في إيجاد متغيّرات البرنامج ودواله في الملف التنفيذي الثنائي وتمكّنه من ربط تعليمات شيفرة الآلة بأسطر شيفرة C المصدرية (أي الصورة التي يفهمها مبرمج C من البرنامج). كذلك، عند التصريف للتنقيح، تجنّب تحسينات المصرّف (فمثلاً، لا تبنِ باستخدام `-O2`). فشيفرة المصرّف المحسَّنة كثيراً ما يصعب تنقيحها جداً لأن تسلسلات شيفرة الآلة المحسَّنة لا ترتبط غالباً بوضوح بشيفرة C المصدرية. ورغم أننا نغطي استخدام العلامة `-g` في الأقسام التالية، فقد يحصل بعض المستخدمين على نتائج أفضل مع العلامة `-g3`، التي قد تكشف معلومات تنقيح إضافية.

وفيما يلي أمر `gcc` مثال يبني ملفاً تنفيذياً مناسباً للتنقيح بـ GDB:

```bash
$ gcc -g myprog.c
```

لبدء GDB، استدعِه على الملف التنفيذي. فمثلاً:

```bash
$ gdb a.out
(gdb)          # the gdb command prompt
```

عند بدء GDB، يطبع موجّه `(gdb)` الذي يتيح للمستخدم إدخال أوامر GDB (مثل ضبط نقاط التوقّف) قبل أن يبدأ تشغيل برنامج `a.out`.

وبالمثل، لاستدعاء DDD على الملف التنفيذي:

```bash
$ ddd a.out
```

أحياناً، عند إنهاء برنامج بخطأ، يفرّغ نظام التشغيل ملف core يحتوي معلومات عن حالة البرنامج عند انهياره. ويمكن فحص محتويات ملف core هذا في GDB بتشغيل GDB مع ملف core والملف التنفيذي الذي أنشأه:

```bash
$ gdb core a.out
(gdb) where       # the where command shows point of crash
```

### 3.1.2. جلستا GDB مثاليتان {#_example_gdb_sessions}

نعرض ميزات GDB الشائعة عبر جلستين مثاليتين لاستخدام GDB في تنقيح البرامج. الأولى مثال على استخدام GDB لإيجاد خطأين في برنامج وإصلاحهما، والثانية مثال على استخدام GDB لتنقيح برنامج ينهار. وتشمل مجموعة أوامر GDB التي نعرضها في هاتين الجلستين المثاليتين:

| الأمر | الوصف |
| --- | --- |
| `break` | ضبط نقطة توقّف |
| `run` | بدء تشغيل البرنامج من البداية |
| `cont` | متابعة تنفيذ البرنامج حتى يصادف نقطة توقّف |
| `quit` | الخروج من جلسة GDB |
| `next` | السماح للبرنامج بتنفيذ سطر C التالي ثم إيقافه مؤقتاً |
| `step` | السماح للبرنامج بتنفيذ سطر C التالي؛ وإذا احتوى السطر التالي استدعاء دالة، فادخل إلى الدالة وأوقف التنفيذ مؤقتاً |
| `list` | سرد شيفرة C المصدرية حول نقطة الإيقاف أو نقطة محددة |
| `print` | طباعة قيمة متغيّر برنامج (أو تعبير) |
| `where` | طباعة مكدّس الاستدعاء |
| `frame` | الانتقال إلى سياق إطار مكدّس محدد |

#### مثال على استخدام GDB لتنقيح برنامج (badprog.c) {#badprog}

تنقّح جلسة GDB المثالية الأولى برنامج [badprog.c](https://diveintosystems.org/book/C3-C_debug/_attachments/badprog.c). من المفترض أن يجد هذا البرنامج أكبر قيمة في مصفوفة من قيم `int`. غير أنه عند التشغيل، يجد خطأً أن 17 هي أكبر قيمة في المصفوفة بدلاً من القيمة الصحيحة وهي 60. ويوضح هذا المثال كيف يستطيع GDB فحص الحالة وقت تشغيل البرنامج لتحديد سبب عدم حساب البرنامج النتيجة المتوقعة. وبشكل خاص، تكشف جلسة التنقيح المثالية هذه خطأين:

1. خطأ في حدود الحلقة يؤدي إلى وصول البرنامج إلى عناصر تتجاوز حدود المصفوفة.
2. خطأ في دالة لا ترجع القيمة الصحيحة إلى مستدعيها.

لفحص برنامج بـ GDB، صرّف البرنامج أولاً بـ `-g` لإضافة معلومات تنقيح إلى الملف التنفيذي:

```bash
$ gcc -g badprog.c
```

بعد ذلك، شغّل GDB على البرنامج التنفيذي الثنائي (`a.out`). يهيّئ GDB نفسه ويطبع موجّه `(gdb)` حيث يمكن للمستخدم إدخال أوامر GDB:

```bash
$ gdb ./a.out

GNU gdb (Ubuntu 8.1-0ubuntu3) 8.1.0.20180409-git
Copyright (C) 2018 Free Software Foundation, Inc.
  ...
(gdb)
```

عند هذه النقطة لم يبدأ GDB تشغيل البرنامج بعد. وخطوة أولى شائعة في التنقيح هي ضبط نقطة توقّف في الدالة `main()` لإيقاف تنفيذ البرنامج مؤقتاً قبل تنفيذه للتعليمة الأولى في `main()` مباشرة. ويضبط الأمر `break` «نقطة توقّف» (أي يوقف البرنامج مؤقتاً) عند موقع محدد (في هذه الحالة عند بداية دالة `main()`):

```
(gdb) break main

Breakpoint 1 at 0x8048436: file badprog.c, line 36.
```

يأمر الأمر `run` GDB ببدء البرنامج:

```
(gdb) run
Starting program: ./a.out
```

إذا أخذ البرنامج وسائط سطر أوامر، فوفّرها بعد الأمر `run` (فمثلاً، سيشغّل `run 100 200` الملف `a.out` بوسيطي سطر الأوامر `100` و`200`).

بعد إدخال `run`، يبدأ GDB تنفيذ البرنامج من بدايته، ويستمر حتى يصادف نقطة توقّف. وعند الوصول إلى نقطة توقّف، يوقف GDB البرنامج مؤقتاً قبل تنفيذ سطر الشيفرة عند نقطة التوقّف، ويطبع رقم نقطة التوقّف وسطر الشيفرة المصدرية المرتبط بها. وفي هذا المثال، يوقف GDB البرنامج مؤقتاً قبل تنفيذ السطر 36 من البرنامج مباشرة. ثم يطبع موجّه `(gdb)` وينتظر تعليمات إضافية:

```
Breakpoint 1, main (argc=1, argv=0x7fffffffe398) at badprog.c:36
36     int main(int argc, char *argv[]) {

(gdb)
```

غالباً ما يريد المستخدم، عند توقف البرنامج عند نقطة توقّف، رؤية شيفرة C المصدرية حول نقطة التوقّف. ويعرض أمر GDB `list` الشيفرة المحيطة بنقطة التوقّف:

```
(gdb) list
29	    }
30	    return 0;
31	}
32
33	/***************************************/
34	int main(int argc, char *argv[]) {
35
36	    int arr[5] = { 17, 21, 44, 2, 60 };
37
38	    int max = arr[0];
```

تعرض الاستدعاءات اللاحقة لـ `list` أسطر الشيفرة المصدرية التالية لهذه. ويمكن أيضاً استخدام `list` برقم سطر محدد (مثلاً `list 11`) أو باسم دالة لسرد الشيفرة المصدرية عند جزء محدد من البرنامج. فمثلاً:

```
(gdb) list findAndReturnMax
12	 * 	array: array of integer values
13	 * 	len: size of the array
14	 * 	max: set to the largest value in the array
15	 *  	returns: 0 on success and non-zero on an error
16	 */
17	int findAndReturnMax(int *array1, int len, int max) {
18
19	    int i;
20
21	    if (!array1 || (len <=0) ) {
```

قد يريد المستخدم تنفيذ سطر شيفرة واحد في كل مرة بعد مصادفة نقطة توقّف، فاحصاً حالة البرنامج بعد تنفيذ كل سطر. وينفّذ أمر GDB `next` سطر C التالي مباشرةً فقط. وبعد أن ينفّذ البرنامج سطر الشيفرة هذا، يوقف GDB البرنامج مؤقتاً مرة أخرى. ويطبع الأمر `print` قيم متغيّرات البرنامج. وفيما يلي بضعة استدعاءات لـ `next` و`print` لإظهار آثارها في السطرين التاليين من التنفيذ. لاحظ أن سطر الشيفرة المصدرية المسرود بعد `next` لم يُنفَّذ بعد — فهو يعرض السطر الذي توقف عنده البرنامج مؤقتاً، أي السطر الذي سيُنفَّذ تالياً:

```
(gdb) next
36	  int arr[5] = { 17, 21, 44, 2, 60 };
(gdb) next
38	  int max = arr[0];
(gdb) print max
$3 = 0
(gdb) print arr[3]
$4 = 2
(gdb) next
40	  if ( findAndReturnMax(arr, 5, max) != 0 ) {
(gdb) print max
$5 = 17
(gdb)
```

عند هذه النقطة من تنفيذ البرنامج، هيّأ main متغيّريه المحليين `arr` و`max` وهو على وشك استدعاء الدالة `findAndReturnMax()`. وينفّذ أمر GDB `next` سطر شيفرة C المصدرية التالي كاملاً. وإذا تضمن ذلك السطر استدعاء دالة، فنُفِّذ استدعاء الدالة كاملاً وعودته ضمن أمر `next` واحد. أما المستخدم الذي يريد ملاحظة تنفيذ الدالة، فينبغي أن يصدر أمر GDB `step` بدلاً من الأمر `next`: فـ `step` يدخل إلى استدعاء الدالة، ويوقف البرنامج مؤقتاً قبل تنفيذ السطر الأول من الدالة.

ولأننا نشتبه في أن الخطأ في هذا البرنامج يتعلق بالدالة `findAndReturnMax()`، نريد الدخول إلى تنفيذ الدالة بدلاً من تجاوزها. فبعد التوقف عند السطر 40، سيوقف الأمر `step` البرنامج مؤقتاً تالياً عند بداية `findAndReturnMax()` (أو يمكن للمستخدم بدلاً من ذلك ضبط نقطة توقّف عند `findAndReturnMax()` لإيقاف تنفيذ البرنامج مؤقتاً عند تلك النقطة):

```
(gdb) next
40	  if ( findAndReturnMax(arr, 5, max) != 0 ) {
(gdb) step
findAndReturnMax (array1=0x7fffffffe290, len=5, max=17) at badprog.c:21
21	  if (!array1 || (len <=0) ) {
(gdb)
```

البرنامج الآن متوقف داخل الدالة `findAndReturnMax` التي أصبحت متغيّراتها المحلية ووسائطها في النطاق. ويعرض الأمر `print` قيمها، و`list` شيفرة C المصدرية حول نقطة الإيقاف:

```
(gdb) print array1[0]
$6 = 17
(gdb) print max
$7 = 17
(gdb) list
16	 */
17	int findAndReturnMax(int *array1, int len, int max) {
18
19	    int i;
20
21	    if (!array1 || (len <=0) ) {
22	        return -1;
23	    }
24	    max = array1[0];
25	    for (i=1; i <= len; i++) {
(gdb) list
26	        if(max < array1[i]) {
27	            max = array1[i];
28	        }
29	    }
30	    return 0;
31	}
32
33	/***************************************/
34	int main(int argc, char *argv[]) {
35
```

ولأننا نظن أن هناك خطأً يتعلق بهذه الدالة، فقد نريد ضبط نقطة توقّف داخل الدالة لنفحص الحالة وقت التشغيل أثناء تنفيذها. وبشكل خاص، قد يساعدنا ضبط نقطة توقّف عند السطر الذي يتغير فيه `max` على رؤية ما تفعله هذه الدالة.

يمكننا ضبط نقطة توقّف عند رقم سطر محدد في البرنامج (السطر 27) واستخدام الأمر `cont` لإخبار GDB بالسماح لتنفيذ التطبيق بالمتابعة من نقطة إيقافه. ولن يوقف GDB البرنامج ويستعيد السيطرة إلا عندما يصادف البرنامج نقطة توقّف، ليتيح للمستخدم إدخال أوامر GDB أخرى.

```
(gdb) break 27
Breakpoint 2 at 0x555555554789: file badprog.c, line 27.

(gdb) cont
Continuing.

Breakpoint 2, findAndReturnMax (array1=0x...e290,len=5,max=17) at badprog.c:27
27	      max = array1[i];
(gdb) print max
$10 = 17
(gdb) print i
$11 = 1
```

يطلب الأمر `display` من GDB طباعة المجموعة نفسها من متغيّرات البرنامج تلقائياً في كل مرة تُصادف فيها نقطة توقّف. فمثلاً، سنعرض قيم `i` و`max` و`array1[i]` في كل مرة يصادف فيها البرنامج نقطة توقّف (في كل تكرار لحلقة `findAndReturnMax()`):

```
(gdb) display i
1: i = 1
(gdb) display max
2: max = 17
(gdb) display array1[i]
3: array1[i] = 21

(gdb) cont
Continuing.

Breakpoint 2, findAndReturnMax (array1=0x7fffffffe290, len=5, max=21)
    at badprog.c:27
27	      max = array1[i];
1: i = 2
2: max = 21
3: array1[i] = 44

(gdb) cont
Continuing.

Breakpoint 2, findAndReturnMax (array1=0x7fffffffe290, len=5, max=21)
    at badprog.c:27
27	      max = array1[i];
1: i = 3
2: max = 44
3: array1[i] = 2

(gdb) cont

Breakpoint 2, findAndReturnMax (array1=0x7fffffffe290, len=5, max=44)
    at badprog.c:27
27	      max = array1[i];
1: i = 4
2: max = 44
3: array1[i] = 60

(gdb) cont
Breakpoint 2, findAndReturnMax (array1=0x7fffffffe290, len=5, max=60)
    at badprog.c:27
27	      max = array1[i];
1: i = 5
2: max = 60
3: array1[i] = 32767

(gdb)
```

وجدنا خطأنا الأول! قيمة `array1[i]` هي 32767، وهي قيمة ليست في المصفوفة الممرَّرة، وقيمة `i` هي 5، لكن 5 ليس فهرساً صالحاً في هذه المصفوفة. اكتشفنا عبر GDB أن حدود حلقة `for` تحتاج إلى إصلاح لتصبح `i < len`.

عند هذه النقطة، يمكننا الخروج من جلسة GDB وإصلاح هذا الخطأ في الشيفرة. وللخروج من جلسة GDB، اكتب `quit`:

```
(gdb) quit
The program is running.  Exit anyway? (y or n) y
$
```

بعد إصلاح هذا الخطأ وإعادة التصريف وتشغيل البرنامج، لا يجد البرنامج القيمة العظمى الصحيحة بعد (فلا يزال يجد أن 17 هي القيمة العظمى لا 60). وبناءً على تشغيلنا السابق في GDB، قد نشتبه في وجود خطأ في استدعاء الدالة `findAndReturnMax()` أو العودة منها. نعيد تشغيل النسخة الجديدة من برنامجنا في GDB، وهذه المرة نضبط نقطة توقّف عند مدخل الدالة `findAndReturnMax()`:

```bash
$ gdb ./a.out
...
(gdb) break main
Breakpoint 1 at 0x7c4: file badprog.c, line 36.

(gdb) break findAndReturnMax
Breakpoint 2 at 0x748: file badprog.c, line 21.

(gdb) run
Starting program: ./a.out

Breakpoint 1, main (argc=1, argv=0x7fffffffe398) at badprog.c:36
36	int main(int argc, char *argv[]) {
(gdb) cont
Continuing.

Breakpoint 2, findAndReturnMax (array1=0x7fffffffe290, len=5, max=17)
    at badprog.c:21
21	  if (!array1 || (len <=0) ) {
(gdb)
```

إذا اشتبهنا في وجود خطأ في وسائط دالة أو قيمتها المرجَعة، فقد يكون من المفيد فحص محتويات المكدّس. ويعرض أمر GDB `where` (أو `bt`، اختصاراً لـ «backtrace») الحالة الحالية للمكدّس. وفي هذا المثال، الدالة `main()` في أسفل المكدّس (في الإطار 1) وتنفّذ استدعاءً لـ `findAndReturnMax()` عند السطر 40. والدالة `findAndReturnMax()` في أعلى المكدّس (في الإطار 0)، وهي متوقفة حالياً عند السطر 21:

```
(gdb) where
#0  findAndReturnMax (array1=0x7fffffffe290, len=5, max=17) at badprog.c:21
#1  0x0000555555554810 in main (argc=1, argv=0x7fffffffe398) at badprog.c:40
```

ينقل أمر GDB `frame` إلى سياق أي إطار في المكدّس. ويمكن للمستخدم داخل سياق كل إطار مكدّس فحص المتغيّرات المحلية والوسائط في ذلك الإطار. وفي هذا المثال، ننتقل إلى إطار المكدّس 1 (سياق المستدعي) ونطبع قيم الوسائط التي تمرّرها الدالة `main()` إلى `findAndReturnMax()` (مثلاً `arr` و`max`):

```
(gdb) frame 1
#1  0x0000555555554810 in main (argc=1, argv=0x7fffffffe398) at badprog.c:40
40	  if ( findAndReturnMax(arr, 5, max) != 0 ) {
(gdb) print arr
$1 = {17, 21, 44, 2, 60}
(gdb) print max
$2 = 17
(gdb)
```

تبدو قيم الوسائط جيدة، فلنفحص القيمة المرجَعة للدالة `findAndReturnMax()`. وللقيام بذلك، نضيف نقطة توقّف قبل عودة `findAndReturnMax()` مباشرة لنرى ما القيمة التي تحسبها لـ `max`:

```
(gdb) break 30
Breakpoint 3 at 0x5555555547ae: file badprog.c, line 30.
(gdb) cont
Continuing.

Breakpoint 3, findAndReturnMax (array1=0x7fffffffe290, len=5, max=60)
    at badprog.c:30
30	  return 0;

(gdb) print max
$3 = 60
```

يوضح هذا أن الدالة وجدت القيمة العظمى الصحيحة (60). لننفّذ الأسطر القليلة التالية من الشيفرة ونرى أي قيمة تستقبلها الدالة `main()`:

```
(gdb) next
31	}
(gdb) next
main (argc=1, argv=0x7fffffffe398) at badprog.c:44
44	  printf("max value in the array is %d\n", max);

(gdb) where
#0  main (argc=1, argv=0x7fffffffe398) at badprog.c:44

(gdb) print max
$4 = 17
```

وجدنا الخطأ الثاني! تحدد الدالة `findAndReturnMax()` أكبر قيمة صحيحة في المصفوفة الممرَّرة (60)، لكنها لا ترجع تلك القيمة إلى الدالة `main()`. ولإصلاح هذا الخطأ، نحتاج إما إلى تغيير `findAndReturnMax()` لترجع قيمة `max` أو إلى إضافة وسيط «تمرير بالمؤشّر» تستخدمه الدالة لتعديل قيمة المتغيّر المحلي `max` في الدالة `main()`.

#### مثال على استخدام GDB لتنقيح برنامج ينهار (segfaulter.c) {#_segfaulter_}

توضح جلسة GDB المثالية الثانية (المشغَّلة على برنامج [segfaulter.c](https://diveintosystems.org/book/C3-C_debug/_attachments/segfaulter.c)) كيف يتصرف GDB عند انهيار برنامج، وكيف يمكننا استخدام GDB للمساعدة في اكتشاف سبب الانهيار.

في هذا المثال، نشغّل برنامج `segfaulter` في GDB فقط ونتركه ينهار:

```bash
$ gcc -g -o segfaulter segfaulter.c
$ gdb ./segfaulter

(gdb) run
Starting program: ./segfaulter

Program received signal SIGSEGV, Segmentation fault.
0x00005555555546f5 in initfunc (array=0x0, len=100) at segfaulter.c:14
14	    array[i] = i;
```

بمجرد انهيار البرنامج، يوقف GDB تنفيذ البرنامج عند نقطة انهياره ويستعيد السيطرة. ويتيح GDB للمستخدم إصدار أوامر لفحص حالة البرنامج وقت التشغيل عند نقطة الانهيار، وهو ما يؤدي غالباً إلى اكتشاف سبب انهيار البرنامج وكيفية إصلاح سببه. وأمرا GDB `where` و`list` مفيدان بوجه خاص لتحديد أين ينهار البرنامج:

```
(gdb) where
#0 0x00005555555546f5 in initfunc (array=0x0, len=100) at segfaulter.c:14
#1 0x00005555555547a0 in main (argc=1, argv=0x7fffffffe378) at segfaulter.c:37

(gdb) list
9	int initfunc(int *array, int len) {
10
11	    int i;
12
13	    for(i=1; i <= len; i++) {
14	        array[i] = i;
15	    }
16	    return 0;
17	}
18
```

يخبرنا هذا الناتج أن البرنامج ينهار عند السطر 14 في الدالة `initfunc()`. وقد يخبرنا فحص قيم الوسائط والمتغيّرات المحلية عند السطر 14 بسبب انهياره:

```
(gdb) print i
$2 = 1
(gdb) print array[i]
Cannot access memory at address 0x4
```

تبدو قيمة `i` جيدة، لكننا نرى خطأً عند محاولة الوصول إلى الفهرس `i` من `array`. لنطبع قيمة `array` (قيمة عنوان أساس المصفوفة) لنرى إن كان ذلك يخبرنا بشيء:

```
(gdb) print array
$3 = (int *) 0x0
```

وجدنا سبب الانهيار! عنوان أساس المصفوفة صفر (أو `NULL`)، ونعرف أن إلغاء الإشارة إلى مؤشّر فارغ (عبر `array[i]`) يجعل البرامج تنهار.

لنرَ إن كان يمكننا اكتشاف سبب كون الوسيط `array` هو `NULL` بالنظر في إطار مكدّس المستدعي:

```
(gdb) frame 1
#1 0x00005555555547a0 in main (argc=1, argv=0x7fffffffe378) at segfaulter.c:37
37	  if(initfunc(arr, 100) != 0 ) {
(gdb) list
32	int main(int argc, char *argv[]) {
33
34	    int *arr = NULL;
35	    int max = 6;
36
37	    if(initfunc(arr, 100) != 0 ) {
38	        printf("init error\n");
39	        exit(1);
40	    }
41
(gdb) print arr
$4 = (int *) 0x0
(gdb)
```

يُظهر الانتقال إلى إطار مكدّس المستدعي وطباعة قيمة الوسائط التي تمرّرها `main()` إلى `initfunc()` أن الدالة `main()` تمرّر مؤشّراً فارغاً إلى الدالة `initfunc()`. وبعبارة أخرى، نسي المستخدم تخصيص مصفوفة `arr` قبل الاستدعاء `initfunc()`. والإصلاح هو استخدام الدالة `malloc()` لتخصيص بعض المساحة لـ `arr` عند السطر 34.

توضح جلسة GDB المثالية هاتان أوامر شائعة الاستخدام لإيجاد الأخطاء في البرامج. وفي القسم التالي، نناقش هذه الأوامر وأوامر GDB أخرى بمزيد من التفصيل.

نُدرج في هذا القسم أوامر GDB الشائعة ونعرض بعض ميزاتها بأمثلة. نناقش أولاً بعض اختصارات لوحة المفاتيح الشائعة التي تجعل استخدام GDB أسهل.

### 3.2.1. اختصارات لوحة المفاتيح في GDB {#_keyboard_shortcuts_in_gdb}

يدعم GDB **إكمال سطر الأوامر**. ويمكن للمستخدم إدخال بادئة فريدة لأمر ما والضغط على مفتاح `TAB`، وسيحاول GDB إكمال سطر الأمر. كما يمكن استخدام **اختصار قصير** فريد لإصدار كثير من أوامر GDB الشائعة. فمثلاً، بدلاً من إدخال الأمر `print x`، يمكن للمستخدم إدخال `p x` فقط لطباعة قيمة `x`، أو يمكن استخدام `l` للأمر `list`، أو `n` للأمر `next`.

*مفتاحا السهمين لأعلى ولأسفل* يتنقلان في أسطر أوامر GDB السابقة، ما يلغي الحاجة إلى إعادة كتابتها في كل مرة.

الضغط على مفتاح `RETURN` في موجّه GDB ينفّذ *أحدث أمر سابق*. وهذا مفيد بوجه خاص عند التقدم خلال التنفيذ بسلسلة من أوامر `next` أو `step`؛ اضغط `RETURN` فقط وسينفّذ GDB التعليمة التالية.

### 3.2.2. أوامر GDB الشائعة {#_common_gdb_commands}

نلخّص هنا أوامر GDB الأكثر شيوعاً، مجموعةً بحسب وظائفها المتشابهة: أوامر التحكم في تنفيذ البرنامج؛ وأوامر تقييم نقطة تنفيذ البرنامج؛ وأوامر ضبط نقاط التوقّف والتحكم فيها؛ وأوامر طباعة حالة البرنامج وتقييم التعبيرات. ويوفّر أمر GDB `help` معلومات عن جميع أوامر GDB:

**`help`**: وثائق المساعدة للموضوعات وأوامر GDB.

```
help <topic or command>   Shows help available for topic or command

help breakpoints    Shows help information about breakpoints
help print          Shows help information about print command
```

#### أوامر التحكم في مسار التنفيذ {#_commands_for_execution_control_flow}

**`break`**: ضبط نقطة توقّف.

```javascript
break <func-name>   Set breakpoint at start of function <func-name>
break <line>        Set breakpoint at line number <line>
break <filename:><line>  Set breakpoint at <line> in file <filename>

break main          Set breakpoint at beginning of main
break 13            Set breakpoint at line 13
break gofish.c:34   Set breakpoint at line 34 in gofish.c
break main.c:34     Set breakpoint at line 34 in main.c
```

تحديد سطر في ملف محدد (كما في `break gofish.c:34`) يتيح للمستخدم ضبط نقاط توقّف في برامج C تمتد عبر عدة ملفات شيفرة مصدرية C (ملفات .c). وهذه الميزة مفيدة بوجه خاص عندما لا تكون نقطة التوقّف المضبوطة في الملف نفسه الذي فيه الشيفرة عند نقطة إيقاف البرنامج.

**`run`**: بدء تشغيل البرنامج الجاري تنقيحه من البداية.

```
run <command line arguments>

run             Run with no command line arguments
run 2 40 100    Run with 3 command line arguments: 2, 40, 100
```

**`continue`** (`cont`): متابعة التنفيذ من نقطة توقّف

```
continue
```

**`step`** (`s`): تنفيذ السطر (الأسطر) التالية من شيفرة C المصدرية للبرنامج، مع الدخول إلى دالة إذا نُفِّذ استدعاء دالة في الأسطر.

```
step          Execute next line (stepping into a function)
step <count>  Executes next <count> lines of program code

step 10       Executes the next 10 lines (stepping into functions)
```

في حالة الأمر `step `، إذا احتوى سطر على استدعاء دالة، تُحتسب أسطر الدالة المستدعاة في المجموع `count` للأسطر المطلوب التقدم خلالها. وبذلك قد يؤدي `step ` إلى توقف البرنامج داخل دالة استُدعيت من نقطة الإيقاف التي صدر عندها الأمر `step `.

**`next`** (`n`): يشبه الأمر `step`، لكنه يعامل استدعاء الدالة كسطر واحد. وبعبارة أخرى، عندما تحتوي التعليمة التالية استدعاء دالة، لا يدخل `next` إلى تنفيذ الدالة بل يوقف البرنامج بعد عودة استدعاء الدالة (أي يوقف البرنامج عند السطر التالي في الشيفرة بعد السطر الذي فيه استدعاء الدالة).

```
next            Execute the next line
next <count>    Executes next <count> instructions
```

**`until`**: تنفيذ البرنامج حتى يبلغ رقم سطر الشيفرة المصدرية المحدد.

```
until <line>    Executes until hit line number <line>
```

**`quit`**: الخروج من GDB

```
quit
```

#### أوامر فحص نقطة التنفيذ وسرد شيفرة البرنامج {#_commands_for_examining_the_execution_point_and_listing_program_code}

**`list`**: سرد شيفرة البرنامج المصدرية.

```javascript
list                Lists next few lines of program source code
list <line>         Lists lines around line number <line> of program
list <start> <end>  Lists line numbers <start> through <end>
list <func-name>    Lists lines around beginning of function <func-name>

list 30 100         List source code lines 30 to 100
```

**`where`** (`backtrace`، `bt`): عرض محتويات المكدّس (تسلسل استدعاءات الدوال عند النقطة الحالية من تنفيذ البرنامج). ويساعد الأمر `where` في تحديد موقع انهيار برنامج بدقة وفي فحص الحالة عند الواجهة بين استدعاءات الدوال وعودتها، مثل قيم الوسائط الممرَّرة إلى الدوال.

```
where
```
**`frame` <frame-num>**: الانتقال إلى سياق إطار المكدّس رقم <frame-num>. وبشكل افتراضي، يكون البرنامج متوقفاً في سياق الإطار 0، أي الإطار في أعلى المكدّس. ويمكن استخدام الأمر `frame` للانتقال إلى سياق إطار مكدّس آخر. وكثيراً ما ينتقل مستخدمو GDB إلى إطار مكدّس آخر لطباعة قيم وسائط ومتغيّرات محلية لدالة أخرى.

```
frame <frame-num>   Sets current stack frame to <frame-num>
info frame          Show state about current stack frame

frame 3             Move into stack frame 3's context (0 is top frame)
```

#### أوامر ضبط نقاط التوقّف والتلاعب بها {#_commands_for_setting_and_manipulating_breakpoints}

**`break`**: ضبط نقطة توقّف (يوجد مزيد من الشرح عن هذا الأمر في [قسم أوامر التحكم في مسار التنفيذ](#_commands_for_execution_control_flow) أعلاه.)

```
break <func-name>   Set a breakpoint at start of a function
break <line>        Set a breakpoint at a line number

break main          Set a breakpoint at start of main
break 12            Set a breakpoint at line 12
break file.c:34     Set a breakpoint at line 34 of file.c
```

**`enable`**، **`disable`**، **`ignore`**، **`delete`**، **`clear`**: تمكين نقطة توقّف أو أكثر أو تعطيلها أو تجاهلها عدداً من المرات أو حذفها. ويحذف الأمر `delete` نقطة توقّف برقمها. وفي المقابل، يؤدي استخدام الأمر `clear` إلى حذف نقطة توقّف عند موقع معيّن في الشيفرة المصدرية.

```sql
disable <bnums ...>    Disable one or more breakpoints
enable  <bnums ...>    Enable one or more breakpoints
ignore  <bpnum> <num>  Don't pause at breakpoint <bpnum>
                         the next <num> times it's hit
delete  <bpnum>        Delete breakpoint number <bpnum>
delete                 Deletes all breakpoints
clear <line>           Delete breakpoint at line <line>
clear <func-name>      Delete breakpoint at function <func-name>

info break      List breakpoint info (including breakpoint bnums)
disable 3       Disable breakpoint number 3
ignore  2  5    Ignore the next 5 times breakpoint 2 is hit
enable  3       Enable breakpoint number 3
delete  1       Delete breakpoint number 1
clear   124     Delete breakpoint at source code line 124
```

**`condition`**: ضبط شروط على نقاط التوقّف. ونقطة التوقّف الشرطية هي التي لا تنقل السيطرة إلى GDB إلا عندما يتحقق شرط معيّن. ويمكن استخدامها للتوقف عند نقطة توقّف داخل حلقة فقط بعد عدد معيّن من التكرارات (بإضافة شرط على متغيّر عدّاد الحلقة)، أو لإيقاف البرنامج عند نقطة توقّف فقط عندما تكون لقيمة متغيّر قيمة مهمة لأغراض التنقيح (بتجنّب إيقاف البرنامج في أوقات أخرى).

```javascript
condition <bpnum> <exp>    Sets breakpoint number <bpnum> to break
                           only when expression <exp> is true

break 28            Set breakpoint at line 28 (in function play)
info break          Lists information about all breakpoints
  Num Type           Disp Enb Address    What
   1   breakpoint    keep y   0x080483a3 in play at gofish.c:28

condition 1 (i > 1000)     Set condition on breakpoint 1
```

#### أوامر فحص حالة البرنامج والتعبيرات وتقييمها {#_commands_for_examining_and_evaluating_program_state_and_expressions}

**`print`** (`p`): عرض قيمة تعبير. ورغم أن مستخدمي GDB يطبعون عادةً قيمة متغيّر برنامج، فإن GDB سيطبع قيمة أي تعبير C (حتى التعبيرات غير الموجودة في شيفرة البرنامج). ويدعم أمر print الطباعة بصيغ مختلفة ويدعم معاملات بتمثيلات عددية مختلفة.

```
print <exp>     Display the value of expression <exp>

p i             print the value of i
p i+3           print the value of (i+3)
```

للطباعة بصيغ مختلفة:

```
print    <exp>     Print value of the expression as unsigned int
print/x  <exp>     Print value of the expression in hexadecimal
print/t  <exp>     Print value of the expression in binary
print/d  <exp>     Print value of the expression as signed int
print/c  <exp>     Print ASCII value of the expression
print  (int)<exp>  Print value of the expression as unsigned int

print/x 123        Prints  0x7b
print/t 123        Print  1111011
print/d 0x1c       Prints 28
print/c 99         Prints 'c'
print (int)'c'     Prints  99
```

لتحديد تمثيلات عددية مختلفة في التعبير (التمثيل الافتراضي للأعداد هو التمثيل العشري):

```
0x prefix for hex: 0x1c
0b prefix for binary: 0b101

print 0b101        Prints 5 (default format is decimal)
print 0b101 + 3    Prints 8
print 0x12  + 2    Prints 20 (hex 12 is 18 in decimal)
print/x 0x12  + 2  Prints 0x14 (decimal 20 in hexadecimal format)
```

أحياناً، قد تتطلب التعبيرات تحويل نوع صريحاً لإخبار `print` كيفية تفسيرها. فمثلاً هنا، إعادة تحويل قيمة عنوان إلى نوع محدد (`int *`) ضرورية قبل إمكانية إلغاء الإشارة إلى العنوان (وإلا فلا يعرف GDB كيفية إلغاء الإشارة إلى العنوان):

```
print *(int *)0x8ff4bc10   Print int value at address 0x8ff4bc10
```

عند استخدام `print` لعرض قيمة متغيّر مؤشّر بعد إلغاء الإشارة، لا يكون تحويل النوع ضرورياً، لأن GDB يعرف نوع متغيّر المؤشّر ويعرف كيفية إلغاء الإشارة إلى قيمته. فمثلاً، إذا أُعلن `ptr` كـ `int *` فيمكن عرض القيمة الصحيحة التي يشير إليها هكذا:

```
print *ptr      Print the int value pointed to by ptr
```

لطباعة قيمة مخزّنة في سجل عتادي:

```
print $eax      Print the value stored in the eax register
```

**`display`**: عرض قيمة تعبير تلقائياً عند الوصول إلى نقطة توقّف. وصياغة التعبير هي نفسها صياغة الأمر `print`.

```
display <exp>   Display value of <exp> at every breakpoint

display i
display array[i]
```

**`x`** (فحص الذاكرة): عرض محتويات موقع ذاكرة. ويشبه هذا الأمر `print` لكنه يفسّر وسيطته كقيمة عنوان يُلغي الإشارة إليها لطباعة القيمة المخزّنة عند العنوان.

```
x <memory address expression>

x  0x5678       Examine the contents of memory location 0x5678
x  ptr          Examine the contents of memory that ptr points to
x  &temp        Can specify the address of a variable
                 (this command is equivalent to: print temp)
```

مثل `print` يستطيع `x` عرض القيم بصيغ مختلفة (مثلاً كـ `int` أو `char` أو سلسلة نصية).

**تحذير — تنسيق أمر examine ثابت (sticky)**

> *التنسيق الثابت* يعني أن GDB يتذكر إعداد التنسيق الحالي ويطبقه على الاستدعاءات اللاحقة لـ `x` التي لا تحدد تنسيقاً. فمثلاً، إذا أدخل المستخدم الأمر `x/c` فإن جميع التنفيذات اللاحقة لـ `x` دون تنسيق ستستخدم صيغة `/c`. ونتيجةً لذلك، لا تحتاج خيارات التنسيق إلى تحديد صريح بأمر `x` إلا عندما يرغب المستخدم في تغييرات في وحدات عنوان الذاكرة أو التكرار أو صيغة العرض الخاصة بأحدث استدعاء لـ `x`.

بشكل عام، يأخذ `x` ما يصل إلى ثلاثة وسائط تنسيق (`x/nfu `)؛ ولا يهم ترتيب سردها:

1. n: عدد التكرار (قيمة صحيحة موجبة)

2. f: صيغة العرض (s: سلسلة نصية، i: تعليمة، x: ست عشري، d: عشري، t: ثنائي، a: عنوان، …)

3. u: صيغة الوحدات (عدد البايتات) (b: بايت، h: بايتان، w: 4 بايتات، g: 8 بايتات)

وفيما يلي بعض الأمثلة (افترض أن `s1 = "Hello There"` عند عنوان الذاكرة `0x40062d`):

```javascript
x/d   ptr       Print value stored at what ptr points to, in decimal
x/a   &ptr      Print value stored at address of ptr, as an address
x/wx  &temp     Print 4-byte value at address of temp, in hexadecimal
x/10dh  0x1234  Print 10 short values starting at address 0x1234, in decimal

x/4c s1         Examine the first 4 chars in s1
    0x40062d   72 'H'  101 'e'  108 'l'  108 'l'

x/s s1         Examine memory location associated with var s1 as a string
    0x40062d   "Hello There"

x/wd s1        Examine the memory location assoc with var s1 as an int
                (because formatting is sticky, need to explicitly set
                units to word (w) after x/s command sets units to byte)
    0x40062d   72

x/8d s1        Examine ASCII values of the first 8 chars of s1
    0x40062d:  72  101 108 108 111 32  84  104
```

**`whatis`**: عرض نوع تعبير.

```
whatis <exp>       Display the data type of an expression

whatis (x + 3.4)   Displays:  type = double
```

**`set`**: إسناد/تغيير قيمة متغيّر برنامج، أو إسناد قيمة لتُخزَّن عند عنوان ذاكرة محدد، أو في سجل آلة محدد.

```javascript
set <variable> = <exp>   Sets variable <variable> to expression <exp>

set x = 123 * y   Set var x's value to (123 * y)
```

**`info`**: يسرد معلومات عن حالة البرنامج وحالة المنقّح. وهناك عدد كبير من خيارات `info` للحصول على معلومات عن حالة تنفيذ البرنامج الحالية وعن المنقّح. ومن الأمثلة القليلة:

```
help info       Shows all the info options
help status     Lists more info and show commands

info locals     Shows local variables in current stack frame
info args       Shows the argument variable of current stack frame
info break      Shows breakpoints
info frame      Shows information about the current stack frame
info registers    Shows register values
info breakpoints  Shows the status of all breakpoints
```

لمزيد من المعلومات عن هذه الأوامر وأوامر GDB أخرى، انظر صفحة دليل GDB (`man gdb`) و[الصفحة الرئيسية لمنقّح GNU](https://www.gnu.org/software/gdb/).

تسلّط أداة Memcheck من Valgrind الضوء على أخطاء ذاكرة الكومة في البرامج. وذاكرة الكومة هي جزء ذاكرة البرنامج قيد التشغيل الذي يُخصَّص ديناميكياً باستدعاءات `malloc()` ويُحرَّر باستدعاءات `free()` في برامج C. وتشمل أنواع أخطاء الذاكرة التي يجدها Valgrind:

قراءة (جلب) قيمة من ذاكرة غير مهيّأة. فمثلاً:

```c
int *ptr, x;
ptr = malloc(sizeof(int) * 10);
x = ptr[3];    // reading from uninitialized memory
```

قراءة (جلب) أو كتابة (ضبط) قيمة عند موقع ذاكرة غير مخصَّص، وهو ما يشير غالباً إلى خطأ تجاوز حدود المصفوفة. فمثلاً:

```c
ptr[11] = 100;  // writing to unallocated memory (no 11th element)
x = ptr[11];    // reading from unallocated memory
```

تحرير ذاكرة محرَّرة سابقاً. فمثلاً:

```c
free(ptr);
free(ptr); // freeing the same pointer a second time
```

تسريبات الذاكرة. و**تسريب الذاكرة** (memory leak) قطعة من مساحة ذاكرة الكومة المخصَّصة لا يشير إليها أي متغيّر مؤشّر في البرنامج، وبالتالي لا يمكن تحريرها. أي أن تسريب الذاكرة يحدث عندما يفقد البرنامج عنوان قطعة مخصَّصة من مساحة الكومة. فمثلاً:

```c
ptr = malloc(sizeof(int) * 10);
ptr = malloc(sizeof(int) * 5);  // memory leak of first malloc of 10 ints
```

قد تؤدي تسريبات الذاكرة في النهاية إلى نفاد مساحة ذاكرة الكومة من البرنامج، ما يؤدي إلى فشل استدعاءات لاحقة لـ `malloc()`. أما أنواع أخطاء الوصول إلى الذاكرة الأخرى، مثل القراءات والكتابات غير الصالحة، فقد تؤدي إلى انهيار البرنامج أو إلى تعديل محتويات ذاكرة البرنامج بطرق تبدو غامضة.

أخطاء الوصول إلى الذاكرة من أصعب الأخطاء إيجاداً في البرامج. فكثيراً ما لا يؤدي خطأ الوصول إلى الذاكرة فوراً إلى خطأ ملحوظ في تنفيذ البرنامج. بل قد يطلق خطأً يحدث لاحقاً في التنفيذ، غالباً في جزء من البرنامج لا علاقة ظاهرية له بمصدر الخطأ. وفي أوقات أخرى، قد يعمل برنامج به خطأ وصول إلى الذاكرة بصورة صحيحة على بعض المدخلات وينهار على مدخلات أخرى، ما يجعل سبب الخطأ صعب الإيجاد والإصلاح.

تساعد أداة Valgrind المبرمج على تحديد أخطاء الوصول إلى ذاكرة الكومة الصعبة الإيجاد والإصلاح هذه، موفّرةً قدراً كبيراً من وقت وجهد التنقيح. كما تساعد Valgrind المبرمج في تحديد أي أخطاء كامنة في ذاكرة الكومة لم تُكتشف في اختبار شيفرته وتنقيحها.

### 3.3.1. برنامج مثال به خطأ وصول إلى ذاكرة الكومة {#_an_example_program_with_a_heap_memory_access_error}

كمثال على صعوبة اكتشاف برامج بها أخطاء وصول إلى الذاكرة وإصلاحها، تأمّل البرنامج الصغير التالي ([bigfish.c](https://diveintosystems.org/book/C3-C_debug/_attachments/bigfish.c)). يعرض هذا البرنامج خطأ «كتابة إلى ذاكرة كومة غير مخصَّصة» في حلقة `for` الثانية، عندما يسنِد قيماً تتجاوز حدود مصفوفة `bigfish` (ملاحظة: تتضمن القائمة أرقام أسطر الشيفرة المصدرية، وتعريف الدالة `print_array()` غير معروض، لكنه يتصرف كما هو موصوف):

```c
 1  #include <stdio.h>
 2  #include <stdlib.h>
 3
 4  /* print size elms of array p with name name */
 5  void print_array(int *p, int size, char *name) ;
 6
 7  int main(int argc, char *argv[]) {
 8      int *bigfish, *littlefish, i;
 9
10      // allocate space for two int arrays
11      bigfish = (int *)malloc(sizeof(int) * 10);
12      littlefish = (int *)malloc(sizeof(int) * 10);
13      if (!bigfish || !littlefish) {
14          printf("Error: malloc failed\n");
15          exit(1);
16      }
17      for (i=0; i < 10; i++) {
18          bigfish[i] = 10 + i;
19          littlefish[i] = i;
20      }
21      print_array(bigfish,10, "bigfish");
22      print_array(littlefish,10, "littlefish");
23
24      // here is a heap memory access error
25      // (write beyond bounds of allocated memory):
26      for (i=0; i < 13; i++) {
27          bigfish[i] = 66 + i;
28      }
29      printf("\nafter loop:\n");
30      print_array(bigfish,10, "bigfish");
31      print_array(littlefish,10, "littlefish");
32
33      free(bigfish);
34      free(littlefish);  // program will crash here
35      return 0;
36  }
```

في الدالة `main()`، تسبب حلقة `for` الثانية خطأ وصول إلى ذاكرة الكومة عند كتابتها إلى ثلاثة فهارس تتجاوز حدود مصفوفة `bigfish` (الفهارس 10 و11 و12). ولا ينهار البرنامج عند نقطة وقوع الخطأ (عند تنفيذ حلقة `for` الثانية)؛ بل ينهار لاحقاً في تنفيذه عند الاستدعاء `free(littlefish)`:

```
bigfish:
 10  11  12  13  14  15  16  17  18  19
littlefish:
  0   1   2   3   4   5   6   7   8   9

after loop:
bigfish:
 66  67  68  69  70  71  72  73  74  75
littlefish:
 78   1   2   3   4   5   6   7   8   9
Segmentation fault (core dumped)
```

يشير تشغيل هذا البرنامج في GDB إلى انهيار البرنامج بخطأ segfault عند الاستدعاء `free(littlefish)`. وقد يجعل الانهيار عند هذه النقطة المبرمج يشتبه في وجود خطأ في الوصولات إلى مصفوفة `littlefish`. غير أن سبب الخطأ يعود إلى كتابات في مصفوفة `bigfish` ولا علاقة له بأخطاء في كيفية وصول البرنامج إلى مصفوفة `littlefish`.

السبب الأرجح لانهيار البرنامج أن حلقة `for` تتجاوز حدود مصفوفة `bigfish` وتكتب فوق الذاكرة بين موقع ذاكرة الكومة لآخر عنصر مخصَّص في `bigfish` وأول عنصر مخصَّص في `littlefish`. وتستخدم `malloc()` مواقع ذاكرة الكومة بينهما (ومباشرة قبل العنصر الأول من `littlefish`) لتخزين بيانات وصفية عن ذاكرة الكومة المخصَّصة لمصفوفة `littlefish`. وداخلياً، تستخدم الدالة `free()` هذه البيانات الوصفية لتحديد مقدار ذاكرة الكومة المطلوب تحريرها. وتكتب التعديلات على الفهرس `10` والفهرس `11` من `bigfish` فوق قيم البيانات الوصفية هذه، ما يؤدي إلى انهيار البرنامج عند الاستدعاء `free(littlefish)`. ونلاحظ، مع ذلك، أن ليست كل تطبيقات الدالة `malloc()` تستخدم هذه الاستراتيجية.

ولأن البرنامج يتضمن شيفرة لطباعة `littlefish` بعد خطأ الوصول إلى الذاكرة في `bigfish`، فقد يكون سبب الخطأ أوضح للمبرمج: فحلقة `for` الثانية تعدّل بطريقة ما محتويات مصفوفة `littlefish` (فتتغير قيمة عنصرها 0 «بشكل غامض» من `0` إلى `78` بعد الحلقة). غير أنه حتى في هذا البرنامج الصغير جداً، قد يكون إيجاد الخطأ الحقيقي صعباً: فلو لم يطبع البرنامج `littlefish` بعد حلقة `for` الثانية التي بها خطأ الوصول إلى الذاكرة، أو لو كان الحد الأعلى لحلقة `for` هو `12` بدلاً من `13`، لما ظهر أي تغيير غامض مرئي في قيم متغيّرات البرنامج يساعد المبرمج على رؤية أن هناك خطأً في كيفية وصول البرنامج إلى مصفوفة `bigfish`.

وفي البرامج الأكبر، قد يكون خطأ وصول إلى الذاكرة من هذا النوع في جزء مختلف جداً من شيفرة البرنامج عن الجزء الذي ينهار. وقد لا توجد أيضاً علاقة منطقية بين المتغيّرات المستخدمة للوصول إلى ذاكرة كومة فُسدت والمتغيّرات التي استُخدمت لكتابة فوق الذاكرة نفسها عن طريق الخطأ؛ بل علاقتهما الوحيدة أنهما يشيران إلى عناوين ذاكرة مخصَّصة متقاربة في الكومة. ولاحظ أن هذا الوضع قد يختلف من تشغيل لآخر للبرنامج وأن هذا السلوك غالباً ما يكون مخفياً عن المبرمج. وبالمثل، قد لا يكون لبعض الوصولات السيئة إلى الذاكرة أي أثر ملحوظ في إحدى تشغيلات البرنامج، ما يجعل هذه الأخطاء صعبة الاكتشاف. وكلما بدا أن برنامجك يعمل جيداً على بعض المدخلات لكنه ينهار على مدخلات أخرى، فهذه علامة على خطأ وصول إلى الذاكرة في البرنامج.

قد توفّر أدوات مثل Valgrind أياماً من وقت التنقيح بتوجيه المبرمجين سريعاً إلى مصدر أخطاء الوصول إلى ذاكرة الكومة في شيفرتهم وأنواعها. وفي البرنامج السابق، يحدد Valgrind النقطة التي يقع فيها الخطأ (عندما يصل البرنامج إلى عناصر تتجاوز حدود مصفوفة `bigfish`). وتتضمن رسالة خطأ Valgrind نوع الخطأ، والنقطة في البرنامج التي يقع فيها الخطأ، ومكان تخصيص ذاكرة الكومة القريبة من الوصول السيئ إلى الذاكرة في البرنامج. فمثلاً، فيما يلي المعلومات التي سيعرضها Valgrind عند تنفيذ البرنامج للسطر 27 (تُحذف بعض التفاصيل من رسالة خطأ Valgrind الفعلية):

```
Invalid write
 at main (bigfish.c:27)
 Address is 0 bytes after a block of size 40 alloc'd
   by main (bigfish.c:11)
```

تقول رسالة خطأ Valgrind هذه إن البرنامج يكتب إلى ذاكرة كومة غير صالحة (غير مخصَّصة) عند السطر 27، وإن هذه الذاكرة غير الصالحة تقع مباشرة بعد كتلة ذاكرة خُصِّصت عند السطر 11، ما يشير إلى أن الحلقة تصل إلى بعض العناصر التي تتجاوز حدود الذاكرة المخصَّصة في مساحة الكومة التي يشير إليها `bigfish`. ومن الإصلاحات المحتملة لهذا الخطأ زيادة عدد البايتات الممرَّرة إلى `malloc()` أو تغيير حدود حلقة `for` الثانية لتجنّب الكتابة بما يتجاوز حدود مساحة ذاكرة الكومة المخصَّصة.

إضافةً إلى إيجاد أخطاء الوصول إلى ذاكرة الكومة، يستطيع Valgrind أيضاً إيجاد بعض الأخطاء المتعلقة بالوصول إلى ذاكرة المكدّس، مثل استخدام متغيّرات محلية غير مهيّأة أو محاولة الوصول إلى مواقع ذاكرة مكدّس تتجاوز حدود المكدّس الحالي. غير أن Valgrind لا يكشف أخطاء الوصول إلى ذاكرة المكدّس بالتفصيل نفسه الذي يكشف به أخطاء ذاكرة الكومة، ولا يكشف أخطاء الوصول إلى ذاكرة البيانات العامة.

قد يكون في برنامج أخطاء وصول إلى ذاكرة المكدّس والذاكرة العامة لا يستطيع Valgrind إيجادها. غير أن هذه الأخطاء تؤدي إلى سلوك برنامج خاطئ أو انهيار برنامج شبيه بالسلوك الذي قد يحدث مع أخطاء الوصول إلى ذاكرة الكومة. فمثلاً، قد تؤدي الكتابة فوق مواقع ذاكرة تتجاوز حدود مصفوفة معلَنة ساكنةً على المكدّس إلى تغيير قيم متغيّرات محلية أخرى «بشكل غامض» أو إلى الكتابة فوق حالة محفوظة على المكدّس تُستخدم للعودة من استدعاء دالة، ما يؤدي إلى انهيار عند عودة الدالة. وقد تساعد خبرة استخدام Valgrind لأخطاء ذاكرة الكومة المبرمجَ على تحديد أخطاء مشابهة في الوصول إلى ذاكرة المكدّس والذاكرة العامة وإصلاحها.

### 3.3.2. كيفية استخدام Memcheck {#_how_to_use_memcheck}

نوضح بعض الميزات الرئيسية لأداة تحليل الذاكرة Memcheck من Valgrind على برنامج مثال، [valgrindbadprog.c](https://diveintosystems.org/book/C3-C_debug/_attachments/valgrindbadprog.c)، يحتوي عدة أخطاء سيئة في الوصول إلى الذاكرة (تصف التعليقات في الشيفرة نوع الخطأ). ويشغّل Valgrind أداة Memcheck افتراضياً؛ ونعتمد على هذا السلوك الافتراضي في مقتطفات الشيفرة التالية. ويمكنك تحديد أداة Memcheck صراحةً باستخدام الخيار `--tool=memcheck`. وفي أقسام لاحقة، سنستدعي أدوات تحليل أخرى من Valgrind باستدعاء الخيار `--tool`.

لتشغيل Memcheck، صرّف برنامج `valgrindbadprog.c` أولاً بالعلامة `-g` لإضافة معلومات تنقيح إلى الملف التنفيذي (مثل ملف `a.out`). ثم شغّل الملف التنفيذي بـ `valgrind`. ولاحظ أنه في البرامج غير التفاعلية، قد يكون من المفيد إعادة توجيه ناتج Valgrind إلى ملف لعرضه بعد خروج البرنامج:

```bash
$ gcc -g valgrindbadprog.c
$ valgrind -v ./a.out

# re-direct valgrind (and a.out) output to file 'output.txt'
$ valgrind -v ./a.out >& output.txt

# view program and valgrind output saved to out file
$ vim output.txt
```

تطبع أداة Memcheck من Valgrind أخطاء الوصول إلى الذاكرة وتحذيراتها عند وقوعها أثناء تنفيذ البرنامج. وفي نهاية تنفيذ البرنامج، تطبع Memcheck أيضاً ملخصاً عن أي تسريبات ذاكرة في البرنامج. ورغم أن إصلاح تسريبات الذاكرة مهم، فإن الأنواع الأخرى من أخطاء الوصول إلى الذاكرة أكثر حرجاً بكثير لصحة البرنامج. ونتيجةً لذلك، وما لم تكن تسريبات الذاكرة تسبب نفاد مساحة ذاكرة الكومة من البرنامج وانهياره، ينبغي للمبرمج أن يركّز أولاً على إصلاح هذه الأنواع الأخرى من أخطاء الوصول إلى الذاكرة قبل التفكير في تسريبات الذاكرة. ولعرض تفاصيل تسريبات الذاكرة الفردية، استخدم الخيار `--leak-check=yes`.

عند استخدام Valgrind أول مرة، قد يبدو ناتجه صعب التحليل بعض الشيء. غير أن الناتج كله يتبع الصيغة الأساسية نفسها، وبعد معرفتك بهذه الصيغة يصبح فهم المعلومات التي يعرضها Valgrind عن أخطاء الوصول إلى ذاكرة الكومة وتحذيراتها أسهل. وفيما يلي خطأ Valgrind مثال من تشغيل برنامج `valgrindbadprog.c`:

```
==31059== Invalid write of size 1
==31059==    at 0x4006C5: foo (valgrindbadprog.c:29)
==31059==    by 0x40079A: main (valgrindbadprog.c:56)
==31059==  Address 0x52045c5 is 0 bytes after a block of size 5 alloc'd
==31059==    at 0x4C2DB8F: malloc (in /usr/lib/valgrind/...)
==31059==    by 0x400660: foo (valgrindbadprog.c:18)
==31059==    by 0x40079A: main (valgrindbadprog.c:56)
```

كل سطر من ناتج Valgrind مسبوق برقم معرّف العملية (PID) (31059 في هذا المثال):

```
==31059==
```

لمعظم أخطاء Valgrind وتحذيراته الصيغة التالية:

1. نوع الخطأ أو التحذير.
2. مكان وقوع الخطأ (تتبّع مكدّس عند نقطة تنفيذ البرنامج التي يقع فيها الخطأ.)
3. مكان تخصيص ذاكرة الكومة حول الخطأ (عادةً تخصيص الذاكرة المرتبط بالخطأ.)

في مثال الخطأ السابق، يشير السطر الأول إلى كتابة غير صالحة إلى الذاكرة (الكتابة إلى ذاكرة غير مخصَّصة في الكومة — خطأ سيئ جداً!):

```
==31059== Invalid write of size 1
```

تعرض الأسطر القليلة التالية تتبّع المكدّس حيث وقع الخطأ. وتشير هذه الأسطر إلى وقوع كتابة غير صالحة عند السطر 29 في الدالة `foo()` التي استُدعيت من الدالة `main()` عند السطر 56:

```
==31059== Invalid write of size 1
==31059==    at 0x4006C5: foo (valgrindbadprog.c:29)
==31059==    by 0x40079A: main (valgrindbadprog.c:56)
```

تشير الأسطر المتبقية إلى مكان تخصيص مساحة الكومة القريبة من الكتابة غير الصالحة في البرنامج. ويقول هذا القسم من ناتج Valgrind إن الكتابة غير الصالحة حدثت مباشرة بعد (`0 bytes after`) كتلة من 5 بايتات من مساحة ذاكرة الكومة خصّصها استدعاء `malloc()` عند السطر 18 في الدالة `foo()` التي استدعتها `main()` عند السطر 56:

```
==31059==  Address 0x52045c5 is 0 bytes after a block of size 5 alloc'd
==31059==    at 0x4C2DB8F: malloc (in /usr/lib/valgrind/...)
==31059==    by 0x400660: foo (valgrindbadprog.c:18)
==31059==    by 0x40079A: main (valgrindbadprog.c:56)
```

تحدد المعلومات من هذا الخطأ وجود خطأ كتابة إلى ذاكرة كومة غير مخصَّصة في البرنامج، وتوجّه المستخدم إلى أجزاء محددة في البرنامج يقع فيها الخطأ (السطر 29) ويُخصَّص فيها الذاكرة حول الخطأ (السطر 18). وبالنظر إلى هاتين النقطتين في البرنامج، قد يرى المبرمج سبب الخطأ وإصلاحه:

```c
 18   c = (char *)malloc(sizeof(char) * 5);
 ...
 22   strcpy(c, "cccc");
 ...
 28   for (i = 0; i <= 5; i++) {
 29       c[i] = str[i];
 30   }
```

السبب أن حلقة `for` تُنفَّذ مرة زائدة، فتصل إلى `c[5]` الذي يتجاوز نهاية المصفوفة `c`. والإصلاح إما تغيير حدود الحلقة عند السطر 29 أو تخصيص مصفوفة أكبر عند السطر 18.

إذا لم يكن فحص الشيفرة حول خطأ Valgrind كافياً للمبرمج لفهم الخطأ أو إصلاحه، فقد يكون استخدام GDB مفيداً. ويمكن أن يساعد ضبط نقاط توقّف حول النقاط في الشيفرة المرتبطة بأخطاء Valgrind المبرمجَ على تقييم حالة البرنامج وقت التشغيل وفهم سبب خطأ Valgrind. فمثلاً، بوضع نقطة توقّف عند السطر 29 وطباعة قيمتي `i` و`str`، يستطيع المبرمج رؤية خطأ تجاوز حدود المصفوفة عندما يكون `i` مساوياً 5. وفي هذه الحالة، يساعد الجمع بين استخدام Valgrind وGDB المبرمج على تحديد كيفية إصلاح أخطاء الوصول إلى الذاكرة التي يجدها Valgrind.

ورغم أن هذا الفصل ركّز على أداة Memcheck الافتراضية لـ Valgrind، فإننا نوصّف بعض قدرات Valgrind الأخرى لاحقاً في الكتاب، منها [أداة تحليل الذاكرة المؤقتة Cachegrind (الفصل 11)](https://diveintosystems.org/book/C11-MemHierarchy/cachegrind.html#_cache_analysis_and_valgrind)، و[أداة تحليل الشيفرة Callgrind (الفصل 12)](https://diveintosystems.org/book/C12-CodeOpt/basic.html#_using_callgrind_to_profile)، و[أداة تحليل الذاكرة Massif (الفصل 12)](https://diveintosystems.org/book/C12-CodeOpt/memory_considerations.html#_memory_profiling_with_massif). ولمزيد من المعلومات عن استخدام Valgrind، انظر [الصفحة الرئيسية لـ Valgrind](http://valgrind.org) و[دليلها الإلكتروني](http://valgrind.org/docs/manual/).

يعرض هذا القسم ميزات GDB المتقدمة، وقد لا يكون بعضها مفهوماً إلا بعد قراءة [فصل أنظمة التشغيل](https://diveintosystems.org/book/C13-OS/index.html#_the_operating_system).

### 3.4.1. GDB وmake {#_gdb_and_make}

يقبل GDB الأمر `make` لإعادة بناء ملف تنفيذي أثناء جلسة تنقيح، وإذا نجح البناء فسيشغّل البرنامج المبني حديثاً (عند إصدار الأمر `run`).

```
(gdb) make
(gdb) run
```

البناء من داخل GDB ملائم للمستخدم الذي ضبط نقاط توقّف كثيرة وأصلح خطأً واحداً ويريد متابعة جلسة التنقيح. وفي هذه الحالة، بدلاً من الخروج من GDB وإعادة التصريف وإعادة تشغيل GDB بالملف التنفيذي الجديد وإعادة ضبط جميع نقاط التوقّف، يستطيع مستخدم GDB تشغيل `make` وبدء تنقيح النسخة الجديدة من البرنامج مع بقاء جميع نقاط التوقّف مضبوطة. لكن ضع في اعتبارك أن تعديل شيفرة C المصدرية وإعادة التصريف بتشغيل `make` من داخل GDB قد يؤدي إلى عدم وقوع نقاط التوقّف عند الموقع المنطقي نفسه في النسخة الجديدة من البرنامج كما في النسخة القديمة إذا أُضيفت أسطر شيفرة مصدرية أو حُذفت. وعند حدوث هذه المشكلة، إما اخرج من GDB وأعد تشغيل جلسة GDB على الملف التنفيذي الجديد، أو استخدم `disable` أو `delete` لتعطيل نقاط التوقّف القديمة أو حذفها ثم `break` لضبط نقاط توقّف جديدة عند المواقع الصحيحة في النسخة المصرَّفة حديثاً من البرنامج.

### 3.4.2. إرفاق GDB بعملية قيد التشغيل {#_attaching_gdb_to_a_running_process}

يدعم GDB تنقيح برنامج قيد التشغيل بالفعل (بدلاً من بدء برنامج ليعمل من داخل جلسة GDB) بـ*إرفاق* GDB بعملية قيد التشغيل. وللقيام بذلك، يحتاج المستخدم إلى الحصول على قيمة معرّف العملية (PID):

احصل على PID العملية باستخدام أمر الصدفة `ps`:

```bash
# ps to get process's PID (lists all processes started in current shell):
$ ps

# list all processes and pipe through grep for just those named a.out:
$ ps -A | grep a.out
   PID TTY          TIME CMD
   12345 pts/3     00:00:00 a.out
```

ابدأ GDB وأرفقه بالعملية المحددة قيد التشغيل (بمعرّف العملية 12345):

```bash
# gdb <executable> <pid>
$ gdb a.out 12345
(gdb)

# OR alternative syntax: gdb attach <pid>  <executable>
$ gdb attach 12345 a.out
(gdb)
```

إرفاق GDB بعملية يوقفها مؤقتاً، ويمكن للمستخدم إصدار أوامر GDB قبل متابعة تنفيذها.

بدلاً من ذلك، يمكن لبرنامج أن يوقف نفسه صراحةً لانتظار التنقيح باستدعاء `kill(getpid(), SIGSTOP)` (كما في مثال [attach_example.c](https://diveintosystems.org/book/C3-C_debug/_attachments/attach_example.c)). وعندما يتوقف البرنامج عند هذه النقطة، يستطيع المبرمج إرفاق GDB بالعملية لتنقيحها.

بغض النظر عن كيفية توقف البرنامج، بعد أن يُرفق GDB ويدخل المستخدم بعض أوامر GDB، يستمر تنفيذ البرنامج من نقطة إرفاقه باستخدام `cont`. وإذا لم ينجح `cont`، فقد يحتاج GDB إلى إرسال إشارة `SIGCONT` إلى العملية صراحةً لمتابعة تنفيذها:

```
(gdb) signal SIGCONT
```

### 3.4.3. متابعة عملية عند fork {#_following_a_process_on_a_fork}

عندما ينقّح GDB برنامجاً يستدعي الدالة `fork()` لإنشاء عملية فرعية جديدة، يمكن ضبط GDB لمتابعة (تنقيح) العملية الأب أو العملية الفرعية، مع ترك تنفيذ العملية الأخرى دون تأثر بـ GDB. وبشكل افتراضي، يتبع GDB العملية الأب بعد استدعاء `fork()`. ولضبط GDB ليتبع العملية الفرعية بدلاً من ذلك، استخدم الأمر `set follow-fork-mode`:

```
(gdb) set follow-fork-mode child    # Set gdb to follow child on fork

(gdb) set follow-fork-mode parent   # Set gdb to follow parent on fork
(gdb) show follow-fork-mode         # Display gdb's follow mode
```

ضبط نقاط توقّف عند استدعاءات `fork()` في البرنامج مفيد عندما يريد المستخدم تغيير هذا السلوك أثناء جلسة GDB.

يوضح مثال [attach_example.c](https://diveintosystems.org/book/C3-C_debug/_attachments/attach_example.c) طريقة لإتباع كلتا العمليتين عند fork: يتبع GDB العملية الأب بعد fork، وترسل العملية الفرعية لنفسها إشارة `SIGSTOP` لتوقف نفسها صراحةً بعد fork، ما يتيح للمبرمج إرفاق عملية GDB ثانية بالعملية الفرعية قبل متابعتها.

### 3.4.4. التحكم في الإشارات {#_signal_control}

تستطيع عملية GDB إرسال إشارات إلى العملية الهدف التي ينقّحها واستقبال الإشارات التي تستقبلها العملية الهدف.

يستطيع GDB إرسال إشارات إلى العملية التي ينقّحها باستخدام الأمر `signal`:

```
(gdb) signal SIGCONT
(gdb) signal SIGALARM
...
```

أحياناً يريد المستخدم أن ينفّذ GDB بعض الإجراءات عند استقبال العملية الجاري تنقيحها إشارة ما. فمثلاً، إذا حاول برنامج الوصول إلى ذاكرة بعنوان ذاكرة غير مصفوف (misaligned) للنوع الذي يصل إليه، فإنه يستقبل إشارة `SIGBUS` ويخرج عادةً. والسلوك الافتراضي لـ GDB عند `SIGBUS` هو أيضاً ترك العملية تخرج. أما إذا أردت أن يفحص GDB حالة البرنامج عند استقباله `SIGBUS`، فيمكنك تحديد أن يعالج GDB إشارة `SIGBUS` بصورة مختلفة باستخدام الأمر `handle` (ويعرض الأمر `info` معلومات إضافية عن كيفية معالجة GDB للإشارات التي تستقبلها العملية أثناء التنقيح):

```
(gdb) handle SIGBUS stop    # if program gets a SIGBUS, gdb gets control

(gdb) info signal           # list info on all signals
(gdb) info SIGALRM          # list info just for the SIGALRM signal
```

### 3.4.5. إعدادات DDD وإصلاح الأخطاء {#_ddd_settings_and_bug_fixes}

يؤدي تشغيل DDD إلى إنشاء مجلد `.ddd` في مجلدك الرئيسي، يستخدمه لتخزين إعداداته حتى لا يحتاج المستخدمون إلى إعادة ضبط جميع تفضيلاتهم من الصفر في كل استدعاء. ومن أمثلة الإعدادات المحفوظة أحجام النوافذ الفرعية وخيارات عرض القوائم وتمكين نوافذ عرض قيم السجلات وشيفرة لغة التجميع.

أحياناً يتوقف DDD عند بدء التشغيل برسالة «Waiting until GDB ready». ويشير هذا غالباً إلى خطأ في ملفات إعداداته المحفوظة. وأسهل طريقة لإصلاح ذلك إزالة مجلد `.ddd` (ستفقد كل إعداداتك المحفوظة وتحتاج إلى إعادة ضبطها عند بدء تشغيله مرة أخرى):

```bash
$ rm -rf ~/.ddd  # Be careful when entering this command!
$ ddd ./a.out
```

إضافةً إلى التنقيح عالي المستوى بلغتي C وC++، يستطيع GDB تنقيح برنامج على مستوى شيفرة لغة التجميع. ويمكّنه ذلك من سرد تسلسلات الشيفرة المفككة من الدوال، وضبط نقاط توقّف على مستوى تعليمة لغة التجميع، والتقدم خلال تنفيذ البرنامج تعليمة تجميع واحدة في كل مرة، وفحص القيم المخزّنة في سجلات الآلة وعناوين ذاكرة المكدّس والكومة وقت التشغيل. نستخدم IA32 كلغة تجميع مثال في هذا القسم، لكن أوامر GDB المعروضة هنا تنطبق على أي لغة تجميع يدعمها GCC. ونلاحظ أن القرّاء قد يجدون هذا القسم الفرعي أكثر فائدة بعد قراءة المزيد عن شيفرة لغة التجميع في فصول لاحقة.

نستخدم برنامج C القصير التالي كمثال:

```c
int main(void) {
    int x, y;

    x = 1;
    x = x + 2;
    x = x - 14;
    y = x * 100;
    x = x + y * 6;

    return 0;
}
```

للتصريف إلى ملف تنفيذي IA32، استخدم العلامة `-m32`:
```bash
$ gcc -m32 -o simpleops simpleops.c
```

ويمكن اختيارياً أن يؤدي التصريف بخيار سطر الأوامر `-fno-asynchronous-unwind-tables` لـ `gcc` إلى توليد شيفرة IA32 أسهل قليلاً على المبرمج في القراءة والفهم:

```bash
$ gcc -m32 -fno-asynchronous-unwind-tables -o simpleops simpleops.c
```

### 3.5.1. استخدام GDB لفحص الشيفرة الثنائية {#_using_gdb_to_examine_binary_code}

نعرض في هذا القسم بعض أوامر GDB المثالية لتنقيح برنامج C القصير على مستوى شيفرة لغة التجميع. ويلخّص الجدول التالي كثيراً من الأوامر التي يعرضها هذا القسم:

| أمر GDB | الوصف |
| --- | --- |
| `break sum` | ضبط نقطة توقّف عند بداية الدالة `sum` |
| `break *0x0804851a` | ضبط نقطة توقّف عند عنوان الذاكرة 0x0804851a |
| `disass main` | تفكيك الدالة `main` |
| `ni` | تنفيذ التعليمة التالية |
| `si` | الدخول إلى استدعاء دالة (تعليمة الخطوة) |
| `info registers` | سرد محتويات السجلات |
| `p $eax` | طباعة القيمة المخزّنة في السجل %eax |
| `p *(int *)($ebp+8)` | طباعة قيمة عدد صحيح عند عنوان (%ebp+8) |
| `x/d $ebp+8` | فحص محتويات الذاكرة عند عنوان |

أولاً، صرّف إلى لغة تجميع IA32 وشغّل GDB على برنامج IA32 التنفيذي `simpleops`:

```bash
$ gcc -m32 -fno-asynchronous-unwind-tables -o simpleops simpleops.c
$ gdb ./simpleops
```

بعد ذلك، اضبط نقطة توقّف في `main`، ثم ابدأ تشغيل البرنامج بالأمر `run`:

```
(gdb) break main
(gdb) run
```

يفكّك الأمر `disass` (يسرد شيفرة لغة التجميع المرتبطة بـ) أجزاء من البرنامج. فمثلاً، لعرض تعليمات لغة التجميع للدالة main:

```
(gdb) disass main         # Disassemble the main function
```

يتيح GDB للمبرمج ضبط نقاط توقّف عند تعليمات لغة تجميع فردية بإلغاء الإشارة إلى عنوان ذاكرة التعليمة:

```
(gdb) break *0x080483c1   # Set breakpoint at instruction at 0x080483c1
```

يمكن تنفيذ البرنامج تعليمة تجميع واحدة في كل مرة باستخدام `si` أو `ni` للدخول إلى التعليمة التالية أو تنفيذها:

```
(gdb) ni     # Execute the next instruction

(gdb) si     # Execute next instruction; if it is a call instruction,
             # then step into the function
```

يدخل الأمر `si` إلى استدعاءات الدوال، أي أن GDB سيوقف البرنامج عند التعليمة الأولى في الدالة المستدعاة. أما الأمر `ni` فيتجاوزها، أي أن GDB سيوقف البرنامج عند التعليمة التالية بعد تعليمة الاستدعاء (بعد أن تنفَّذ الدالة وتعود إلى المستدعي).

يمكن للمبرمج طباعة القيم المخزّنة في سجلات الآلة باستخدام الأمر `print` واسم السجل مسبوقاً بـ `$`:

```
(gdb) print $eax    # print the value stored in register eax
```

يعرض الأمر `display` القيم تلقائياً عند الوصول إلى نقطة توقّف:

```
(gdb) display $eax
(gdb) display $edx
```

يعرض الأمر `info registers` جميع القيم المخزّنة في سجلات الآلة:

```
(gdb) info registers
```

### 3.5.2. استخدام DDD للتنقيح على مستوى لغة التجميع {#_using_ddd_to_debug_at_the_assembly_level}

يوفّر منقّح DDD واجهة رسومية فوق منقّح آخر (GDB في هذه الحالة). ويوفّر واجهة جميلة لعرض شيفرة لغة التجميع وعرض السجلات والتقدم خلال تنفيذ تعليمات IA32. ولأن DDD له نوافذ منفصلة لعرض الشيفرة المفككة وقيم السجلات وموجّه أوامر GDB، فكثيراً ما يكون استخدامه أسهل من GDB عند التنقيح على مستوى شيفرة لغة التجميع.

للتنقيح بـ DDD، استبدل `ddd` بـ `gdb`:

```bash
$ ddd ./simpleops
```

يظهر موجّه GDB في النافذة السفلية حيث يقبل أوامر GDB. ورغم أنه يوفّر خيارات قائمة وأزراراً لبعض أوامر GDB، فكثيراً ما يكون موجّه GDB في الأسفل أسهل استخداماً.

يعرض DDD عرض شيفرة لغة التجميع للبرنامج باختيار خيار القائمة *View* ← *Machine Code Window*. وينشئ هذا الخيار نافذة فرعية جديدة بها قائمة شيفرة لغة التجميع للبرنامج (قد ترغب على الأرجح في تغيير حجم هذه النافذة لتكبيرها).

لعرض جميع قيم سجلات البرنامج في نافذة منفصلة، فعّل خيار القائمة *Status* ← *Registers*.

### 3.5.3. أوامر وأمثلة تنقيح شيفرة لغة التجميع في GDB {#_gdb_assembly_code_debugging_commands_and_examples}

وفيما يلي بعض التفاصيل والأمثلة على أوامر GDB المفيدة للتنقيح على مستوى شيفرة لغة التجميع (انظر [قسم أوامر GDB الشائعة](https://diveintosystems.org/book/C3-C_debug/gdb_commands.html#_common_gdb_commands) لمزيد من التفاصيل عن بعض هذه الأوامر، وخصوصاً خيارات التنسيق `print` و`x`):

`disass`: تفكيك شيفرة دالة أو مجال عناوين.

```
disass <func_name>   # Lists assembly code for function
disass <start> <end> # Lists assembly instructions between start & end address

disass main          # Disassemble main function
disass 0x1234 0x1248 # Disassemble instructions between addr 0x1234 & 0x1248
```

`break`: ضبط نقطة توقّف عند عنوان تعليمة.

```
break *0x80dbef10  # Sets breakpoint at the instruction at address 0x80dbef10
```

`stepi` (`si`)، `nexti` (`ni`):

```javascript
stepi, si          # Execute next machine code instruction,
                   # stepping into function call if it is a call instr
nexti,  ni         # Execute next machine code instruction,
                   # treating function call as a single instruction
```

`info registers`: يسرد جميع قيم السجلات.

`print`: عرض قيمة تعبير.

```
print $eax                # Print the value stored in the eax register
print *(int *)0x8ff4bc10  # Print int value stored at memory addr 0x8ff4bc10
```

`x` عرض محتويات موقع الذاكرة عند إعطاء عنوان. وتذكّر أن صيغة `x` ثابتة، لذا يجب تغييرها صراحةً.

```
(gdb) x $ebp-4      # Examine memory at address: (contents of register ebp)-4
                    # if the location stores an address x/a, an int x/wd, ...

(gdb) x/s 0x40062d  # Examine the memory location 0x40062d as a string
0x40062d   "Hello There"

(gdb) x/4c 0x40062d # Examine the first 4 char memory locations
                    # starting at address 0x40062d
0x40062d   72 'H'  101 'e' 108 'l' 108 'l'

(gdb) x/d 0x40062d  # Examine the memory location 0x40062d in decimal
0x40062d   72       # NOTE: units is 1 byte, set by previous x/4c command

(gdb) x/wd 0x400000 # Examine memory location 0x400000 as 4 bytes in decimal
0x400000   100      # NOTE: units was 1 byte set, need to reset to w
```

`set`: ضبط محتويات مواقع الذاكرة والسجلات.

```
set $eax = 10                 Set the value of register eax to 10
set $esp = $esp + 4           Pop a 4-byte value off the stack
set *(int *)0x8ff4bc10 = 44   Store 44 at address 0x8ff4bc10
```

`display`: طباعة تعبير في كل مرة تُصادف فيها نقطة توقّف.

```
display $eax         Display value of register eax
```

### 3.5.4. ملخص سريع للأوامر الشائعة لتنقيح لغة التجميع {#_quick_summary_of_common_commands_for_assembly_debugging}

```bash
$ ddd ./a.out
(gdb) break main
(gdb) run

(gdb) disass main         # Disassemble the main function
(gdb) break sum           # Set a breakpoint at the beginning of a function
(gdb) cont                # Continue execution of the program
(gdb) break *0x0804851a   # Set a breakpoint at memory address 0x0804851a
(gdb) ni                  # Execute the next instruction
(gdb) si                  # Step into a function call (step instruction)
(gdb) info registers      # List the register contents
(gdb) p $eax              # Print the value stored in register %eax
(gdb) p  *(int *)($ebp+8) # Print out value of an int at addr (%ebp+8)
(gdb) x/d $ebp+8          # Examine the contents of memory at the given
                          #  address (/d: prints the value as an int)
(gdb) x/s 0x0800004       # Examine contents of memory at address as a string
(gdb) x/wd 0xff5634       # After x/s, the unit size is 1 byte, so if want
                          # to examine as an int specify both the width w & d
```

قد يكون تنقيح البرامج متعددة الخيوط صعباً بسبب تدفقات التنفيذ المتعددة وبسبب التفاعلات بين الخيوط المنفَّذة تزامنياً. وبشكل عام، إليك بعض الأمور التي تسهّل قليلاً تنقيح البرامج متعددة الخيوط:

- حاول، كلما أمكن، تنقيح نسخة من البرنامج بأقل عدد ممكن من الخيوط.
- عند إضافة عبارات `printf` للتنقيح إلى الشيفرة، اطبع معرّف الخيط الجاري تنفيذه لتحديد الخيط الذي يطبع، وأنهِ السطر بـ `\n`.
- حدّ من كمية إخراج التنقيح بجعل خيط واحد فقط يطبع معلوماته والمعلومات المشتركة. فمثلاً، إذا خزّن كل خيط معرّفه المنطقي في متغيّر محلي باسم `my_tid`، فيمكن استخدام عبارة شرطية على قيمة `my_tid` لقصر طباعة إخراج التنقيح على خيط واحد، كما هو موضح في المثال التالي:

```c
if (my_tid == 1) {
    printf("Tid:%d: value of count is %d and my i is %d\n", my_tid, count, i);
    fflush(stdout);
}
```

### 3.6.1. GDB وPthreads {#_gdb_and_pthreads}

يمتلك منقّح GDB دعماً خاصاً لتنقيح البرامج متعددة الخيوط، بما في ذلك ضبط نقاط توقّف لخيوط فردية وفحص مكدّسات خيوط فردية. ومن الأمور التي يجب ملاحظتها عند تنقيح برامج Pthreads في GDB وجود ثلاثة معرّفات على الأقل لكل خيط:

- معرّف مكتبة Pthreads للخيط (قيمة `pthread_t`).
- قيمة معرّف العملية الخفيفة (LWP) للخيط في نظام التشغيل. ويُستخدم هذا المعرّف جزئياً ليتمكن نظام التشغيل من تتبع هذا الخيط لأغراض الجدولة.
- معرّف GDB للخيط. وهذا هو المعرّف الذي يُستخدم عند تحديد خيط معيّن في أوامر GDB.

قد تختلف العلاقة المحددة بين معرّفات الخيوط من نظام تشغيل وتنفيذ مكتبة Pthreads إلى آخر، لكن على معظم الأنظمة توجد مقابلة واحد لواحد لواحد بين معرّف Pthreads ومعرّف LWP ومعرّف خيط GDB.

نعرض بعض أساسيات GDB لتنقيح البرامج متعددة الخيوط في GDB. انظر ما يلي لمزيد من المعلومات عن [تنقيح البرامج متعددة الخيوط في GDB](http://www.sourceware.org/gdb/current/onlinedocs/gdb/Threads.html#Threads).

### 3.6.2. أوامر GDB الخاصة بالخيوط: {#_gdb_thread_specific_commands}

تمكين طباعة أحداث بدء الخيوط وخروجها:

```
set print thread-events
```

سرد جميع الخيوط الموجودة في البرنامج (رقم خيط GDB هو القيمة الأولى المسرودة، ويُشار إلى الخيط الذي صادف نقطة التوقّف بـ `*`):

```
info threads
```

للتبديل إلى سياق تنفيذ خيط معيّن (مثلاً لفحص مكدّسه عند تنفيذ `where`)، حدد الخيط بمعرّفه:

```
thread <threadno>

thread 12        # Switch to thread 12's execution context
where            # Thread 12's stack trace
```

ضبط نقطة توقّف لخيط معيّن فقط. ولن تؤدي الخيوط الأخرى الجارية عند النقطة في الشيفرة التي ضُبطت فيها نقطة التوقّف إلى تفعيل نقطة التوقّف لإيقاف البرنامج وطباعة موجّه GDB:

```javascript
break <where> thread <threadno>

break foo thread 12    # Break when thread 12 executes function foo
```

لتطبيق أمر GDB محدد على جميع الخيوط أو على مجموعة فرعية منها، بإضافة البادئة `thread apply ` إلى أمر GDB، حيث يشير `threadno` إلى معرّف خيط GDB:

```
thread apply <threadno|all> command
```

لا يعمل هذا مع كل أوامر GDB، وخصوصاً ضبط نقاط التوقّف، لذا استخدم هذه الصياغة بدلاً من ذلك لضبط نقاط توقّف خاصة بخيط:

```
break <where> thread <threadno>
```

عند الوصول إلى نقطة توقّف، يوقف GDB افتراضياً جميع الخيوط حتى يكتب المستخدم `cont`. ويمكن للمستخدم تغيير السلوك ليطلب من GDB إيقاف الخيوط التي صادفت نقطة التوقّف فقط، مع السماح للخيوط الأخرى بمتابعة التنفيذ.

### 3.6.3. أمثلة: {#_examples}

نعرض بعض أوامر GDB وناتجاً من تشغيل GDB على ملف تنفيذي متعدد الخيوط مصرَّف من الملف [racecond.c](https://diveintosystems.org/book/C3-C_debug/_attachments/racecond.c).

يفتقر هذا البرنامج الخاطئ إلى التزامن حول الوصولات إلى المتغيّر المشترك `count`. ونتيجةً لذلك، تنتج تشغيلات مختلفة للبرنامج قيماً نهائية مختلفة لـ `count` دلالةً على حالة سباق (race condition). فمثلاً، فيما يلي تشغيلان للبرنامج بخمسة خيوط ينتجان نتيجتين مختلفتين:

```
./a.out 5
hello I'm thread 0 with pthread_id 139673141077760
hello I'm thread 3 with pthread_id 139673115899648
hello I'm thread 4 with pthread_id 139673107506944
hello I'm thread 1 with pthread_id 139673132685056
hello I'm thread 2 with pthread_id 139673124292352
count = 159276966

./a.out 5
hello I'm thread 0 with pthread_id 140580986918656
hello I'm thread 1 with pthread_id 140580978525952
hello I'm thread 3 with pthread_id 140580961740544
hello I'm thread 2 with pthread_id 140580970133248
hello I'm thread 4 with pthread_id 140580953347840
count = 132356636
```

الإصلاح هو وضع الوصولات إلى `count` داخل قسم حرج (critical section) باستخدام متغيّر `pthread_mutex_t`. وإذا لم يستطع المستخدم رؤية هذا الإصلاح بفحص شيفرة C وحدها، فقد يساعد التشغيل في GDB ووضع نقاط توقّف حول الوصولات إلى متغيّر `count` المبرمجَ على اكتشاف المشكلة.

وفيما يلي بعض الأوامر المثالية من تشغيل GDB لهذا البرنامج:

```
(gdb) break worker_loop   # Set a breakpoint for all spawned threads
(gdb) break 77 thread 4   # Set a breakpoint just for thread 4
(gdb) info threads        # List information about all threads
(gdb) where               # List stack of thread that hit the breakpoint
(gdb) print i             # List values of its local variable i
(gdb) thread 2            # Switch to different thread's (2) context
(gdb) print i             # List thread 2's local variables i
```

يُعرض في المثال التالي ناتج جزئي من تشغيل GDB لبرنامج `racecond` بثلاثة خيوط (`run 3`)، مع أمثلة على أوامر خيوط GDB في سياق جلسة تنقيح GDB. والخيط الرئيسي دائماً هو خيط GDB رقم 1، والخيوط الثلاثة المنشأة هي خيوط GDB من 2 إلى 4.

عند تنقيح البرامج متعددة الخيوط، يجب على مستخدم GDB تتبع الخيوط الموجودة عند إصدار الأوامر. فمثلاً، عند مصادفة نقطة التوقّف في `main`، لا يوجد إلا الخيط 1 (الخيط الرئيسي). ونتيجةً لذلك، يجب على مستخدم GDB الانتظار حتى إنشاء الخيوط قبل ضبط نقطة توقّف لخيط معيّن فقط (يوضح هذا المثال ضبط نقطة توقّف للخيط 4 فقط عند السطر 77 في البرنامج). وعند مشاهدة هذا الناتج، لاحظ متى تُضبط نقاط التوقّف وتُحذف، ولاحظ قيمة المتغيّر المحلي `i` لكل خيط عند تبديل سياقات الخيوط بأمر GDB `thread`:

```bash
$ gcc -g racecond.c -pthread

$ gdb ./a.out
(gdb) break main
Breakpoint 1 at 0x919: file racecond.c, line 28.
(gdb) run 3
Starting program: ...
[Thread debugging using libthread_db enabled] ...

Breakpoint 1, main (argc=2, argv=0x7fffffffe388) at racecond.c:28
28	    if (argc != 2) {
(gdb) list 76
71	  myid = *((int *)arg);
72
73	  printf("hello I'm thread %d with pthread_id %lu\n",
74	      myid, pthread_self());
75
76	  for (i = 0; i < 10000; i++) {
77	      count += i;
78	  }
79
80	  return (void *)0;

(gdb) break 76
Breakpoint 2 at 0x555555554b06: file racecond.c, line 76.
(gdb) cont
Continuing.

[New Thread 0x7ffff77c4700 (LWP 5833)]
hello I'm thread 0 with pthread_id 140737345505024
[New Thread 0x7ffff6fc3700 (LWP 5834)]
hello I'm thread 1 with pthread_id 140737337112320
[New Thread 0x7ffff67c2700 (LWP 5835)]
[Switching to Thread 0x7ffff77c4700 (LWP 5833)]

Thread 2 "a.out" hit Breakpoint 2, worker_loop (arg=0x555555757280)
    at racecond.c:76
76	  for (i = 0; i < 10000; i++) {
(gdb) delete 2

(gdb) break 77 thread 4
Breakpoint 3 at 0x555555554b0f: file racecond.c, line 77.
(gdb) cont
Continuing.

hello I'm thread 2 with pthread_id 140737328719616
[Switching to Thread 0x7ffff67c2700 (LWP 5835)]

Thread 4 "a.out" hit Breakpoint 3, worker_loop (arg=0x555555757288)
    at racecond.c:77
77	      count += i;
(gdb) print i
$2 = 0
(gdb) cont
Continuing.
[Switching to Thread 0x7ffff67c2700 (LWP 5835)]

Thread 4 "a.out" hit Breakpoint 3, worker_loop (arg=0x555555757288)
    at racecond.c:77
77	      count += i;
(gdb) print i
$4 = 1

(gdb) thread 3
[Switching to thread 3 (Thread 0x7ffff6fc3700 (LWP 5834))]
#0  0x0000555555554b12 in worker_loop (arg=0x555555757284) at racecond.c:77
77	      count += i;
(gdb) print i
$5 = 0

(gdb) thread 2
[Switching to thread 2 (Thread 0x7ffff77c4700 (LWP 5833))]
#0  worker_loop (arg=0x555555757280) at racecond.c:77
77	      count += i;
(gdb) print i
$6 = 1
```

يختم هذا الفصل تغطيتنا للغة البرمجة C. ومقارنةً بلغات البرمجة عالية المستوى الأخرى، فإن C لغة برمجة صغيرة نسبياً بتراكيب أساسية قليلة يبني منها المبرمج برنامجه. ولأن تجريدات لغة C أقرب إلى شيفرة الآلة الأساسية التي ينفّذها الحاسوب، يستطيع مبرمج C كتابة شيفرة تعمل بكفاءة أعلى بكثير من الشيفرة المكافئة المكتوبة بالتجريدات عالية المستوى التي توفّرها لغات برمجة أخرى. وبشكل خاص، يمتلك مبرمج C تحكماً أكبر بكثير في كيفية استخدام برنامجه للذاكرة، وهو ما قد يكون له أثر كبير في أداء البرنامج. وC لغة برمجة أنظمة الحاسوب (systems programming) حيث يكون التحكم منخفض المستوى والكفاءة أمرين حاسمين.

نستخدم في الفصول التالية أمثلة بلغة C لتوضيح كيفية تصميم نظام حاسوب لتشغيل برنامج.
