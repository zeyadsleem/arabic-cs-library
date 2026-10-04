---
title: "2. Array-Based Lists"
lang: ar
source: https://opendatastructures.org/ods-java/2_Array_Based_Lists.html
---

في هذا الفصل، سندرس تطبيقات واجهتَي List وQueue التي تُخزَّن فيها البيانات الأساسية في مصفوفة تُدعى المصفوفة الخلفية (backing array). يلخِّص الجدول التالي أزمنة تنفيذ العمليات لبنى البيانات المعروضة في هذا الفصل:

|  | $ \mathtt{get(i)}$ / $ \mathtt{set(i,x)}$ | $ \mathtt{add(i,x)}$ / $ \mathtt{remove(i)}$ |
| --- | --- | --- |
| ArrayStack | $ O(1)$ | $ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ |
| ArrayDeque | $ O(1)$ | $ O(\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ |
| DualArrayDeque | $ O(1)$ | $ O(\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ |
| RootishArrayStack | $ O(1)$ | $ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ |

للبنى التي تعمل بتخزين بياناتها في مصفوفة واحدة مزايا وقيود مشتركة كثيرة:

- توفِّر المصفوفات وصولًا بزمن ثابت إلى أي قيمة فيها. وهذا ما يتيح لعمليتَي $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ أن تنفَّذا بزمن ثابت.
- ليست المصفوفات ديناميكية إلى حدٍّ كبير. فإضافة عنصر قرب منتصف قائمة أو إزالته يستلزم إزاحة عدد كبير من عناصر المصفوفة لإفساح المجال للعنصر المُضاف حديثًا أو لملء الفراغ الذي نتج عن حذف العنصر. ولهذا تعتمد أزمنة تنفيذ عمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ على $ \mathtt{n}$ و$ \mathtt{i}$ .
- لا يمكن للمصفوفات أن تتوسَّع أو تنكمش. فحين يتجاوز عدد عناصر بنية البيانات حجم المصفوفة الخلفية، لا بد من تخصيص مصفوفة جديدة ونسخ بيانات المصفوفة القديمة إليها. وهذه عملية مكلفة.

النقطة الثالثة مهمة. فأزمنة التنفيذ المذكورة في الجدول أعلاه لا تتضمَّن التكلفة المرتبطة بنمو المصفوفة الخلفية وانكماشها. سنرى أنَّ التكلفة، عند إدارتها بعناية، لا تضيف الكثير إلى تكلفة العملية المتوسطة. وبشكل أدق، إذا بدأنا ببنية بيانات فارغة ونفَّذنا أي تسلسل من $ m$ عملية من $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$، فإنَّ التكلفة الكلية لنمو المصفوفة الخلفية وانكماشها، على امتداد تسلسل العمليات الـ $ m$ كاملًا، هي $ O(m)$ . فعلى الرغم من أنَّ بعض العمليات المنفردة أغلى، فإنَّ التكلفة المُستهلكة (amortized)، عند توزيعها على عمليات الـ $ m$ جميعًا، لا تتجاوز $ O(1)$ لكل عملية.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 2.1 ‏ArrayStack: عمليات مكدّس سريعة باستخدام مصفوفة

**الأقسام الفرعية**

# 2.1 ‏ArrayStack: عمليات مكدّس سريعة باستخدام مصفوفة

يطبِّق ArrayStack واجهة القائمة (List) باستخدام مصفوفة $ \mathtt{a}$ تُدعى المصفوفة الخلفية. ويُخزَّن عنصر القائمة ذي الفهرس $ \mathtt{i}$ في $ \mathtt{a[i]}$ . وفي معظم الأوقات تكون $ \mathtt{a}$ أكبر من الحجم المطلوب تمامًا، لذا يُستخدم عدد صحيح $ \mathtt{n}$ لتتبُّع عدد العناصر المُخزَّنة فعليًا في $ \mathtt{a}$ . وبهذه الطريقة، تُخزَّن عناصر القائمة في $ \mathtt{a[0]}$ ,..., $ \mathtt{a[n-1]}$ ، ودائمًا ما يتحقَّق $ \ensuremath{\mathtt{a.length}} \ge \ensuremath{\mathtt{n}}$ .

```
    T[] a;
    int n;
    int size() {
        return n;
    }
```

## 2.1.1 الأساسيات

الوصول إلى عناصر ArrayStack وتعديلها باستخدام $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ أمرٌ بديهي. فبعد إجراء فحص الحدود (bounds-checking) اللازم، نكتفي بإرجاع $ \mathtt{a[i]}$ أو تعيينه على التوالي.

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        return a[i];
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T y = a[i];
        a[i] = x;
        return y;
    }
```

يوضِّح الشكل 2.1 عمليتي إضافة العناصر إلى ArrayStack وإزالتها منها. ولتنفيذ عملية $ \mathtt{add(i,x)}$ نتحقَّق أولًا مما إذا كانت $ \mathtt{a}$ ممتلئة بالفعل. وإن كان الأمر كذلك، نستدعي الدالة $ \mathtt{resize()}$ لزيادة حجم $ \mathtt{a}$ . وسيُناقَش لاحقًا كيف يُنفَّذ $ \mathtt{resize()}$ . يكفي في الوقت الحالي أن نعلم أنَّه بعد استدعاء $ \mathtt{resize()}$ ، يمكننا التأكُّد من $ \ensuremath{\mathtt{a.length}} > \ensuremath{\mathtt{n}}$ . وبانتهاء هذا الأمر، نزيح الآن العناصر $ \ensuremath{\mathtt{a[i]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$ إلى اليمين بموضع واحد لإفساح المجال لـ $ \mathtt{x}$ ، ونجعل $ \mathtt{a[i]}$ مساويةً لـ $ \mathtt{x}$ ، ونزِيد $ \mathtt{n}$ .

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (n + 1 > a.length) resize();
        for (int j = n; j > i; j--) 
            a[j] = a[j-1];
        a[i] = x;
        n++;
    }
```

إذا تجاهلنا تكلفة الاستدعاء المحتمل لـ $ \mathtt{resize()}$ ، فإنَّ تكلفة عملية $ \mathtt{add(i,x)}$ تتناسب مع عدد العناصر التي علينا إزاحتها لإفساح المجال لـ $ \mathtt{x}$ . وعليه فإنَّ تكلفة هذه العملية (مع تجاهل تكلفة تغيير حجم $ \mathtt{a}$ ) هي $ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ . وتنفيذ عملية $ \mathtt{remove(i)}$ مشابه. فنزيح العناصر $ \ensuremath{\mathtt{a[i+1]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$ إلى اليسار بموضع واحد (مع الكتابة فوق $ \mathtt{a[i]}$ ) وننقص قيمة $ \mathtt{n}$ . وبعد ذلك نتحقَّق مما إذا كان $ \mathtt{n}$ قد أصبح أصغر بكثير من $ \mathtt{a.length}$ عبر التحقُّق مما إذا كان $ \ensuremath{\mathtt{a.length}} \ge 3\ensuremath{\mathtt{n}}$ . وإن كان الأمر كذلك، نستدعي $ \mathtt{resize()}$ لتقليل حجم $ \mathtt{a}$ .

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T x = a[i];
        for (int j = i; j < n-1; j++) 
            a[j] = a[j+1];
        n--;
        if (a.length >= 3*n) resize();
        return x;
    }
```

إذا تجاهلنا تكلفة الدالة $ \mathtt{resize()}$ ، فإنَّ تكلفة عملية $ \mathtt{remove(i)}$ تتناسب مع عدد العناصر التي نزيحها، وهي $ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ .

## 2.1.2 النمو والانكماش

الدالة $ \mathtt{resize()}$ مباشرة إلى حدٍّ كبير؛ فهي تخصِّص مصفوفة جديدة $ \mathtt{b}$ حجمها $ 2\ensuremath{\mathtt{n}}$ وتنسخ عناصر $ \mathtt{n}$ الخاصة بـ $ \mathtt{a}$ إلى أول $ \mathtt{n}$ موضعًا في $ \mathtt{b}$ ، ثم تجعل $ \mathtt{a}$ مساويةً لـ $ \mathtt{b}$ . وعليه، بعد استدعاء $ \mathtt{resize()}$ ، يكون $ \ensuremath{\mathtt{a.length}} = 2\ensuremath{\mathtt{n}}$ .

```
    void resize() {
        T[] b = newArray(Math.max(n*2,1));
        for (int i = 0; i < n; i++) {
            b[i] = a[i];
        }
        a = b;
    }
```

تحليل التكلفة الفعلية لعملية $ \mathtt{resize()}$ أمرٌ سهل. فهي تخصِّص مصفوفة $ \mathtt{b}$ حجمها $ 2\ensuremath{\mathtt{n}}$ وتنسخ عناصر $ \mathtt{n}$ الخاصة بـ $ \mathtt{a}$ إلى $ \mathtt{b}$ . وهذا يستغرق $ O(\ensuremath{\mathtt{n}})$ من الوقت. وكان تحليل زمن التنفيذ في القسم السابق يتجاهل تكلفة الاستدعاءات لـ $ \mathtt{resize()}$ . وفي هذا القسم نحلِّل هذه التكلفة باستخدام تقنية تُعرف باسم التحليل المُستهلك (amortized analysis). وهذه التقنية لا تحاول تحديد تكلفة تغيير الحجم أثناء كل عملية $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ على حدة، بل تأخذ في الحسبان تكلفة جميع استدعاءات $ \mathtt{resize()}$ خلال تسلسل من $ m$ استدعاءً لـ $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ . وعلى وجه التحديد، سنبيِّن ما يلي: **المُلمَّة 2..1** *إذا أُنشئ ArrayStack فارغ ونُفِّذ أي تسلسل من $ m\ge 1$ استدعاءً لـ $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ، فإنَّ الزمن الكلي المستغرق في جميع استدعاءات $ \mathtt{resize()}$ هو $ O(m)$ .*

*البرهان*. سنبيِّن أنَّه في كل مرة يُستدعى فيها $ \mathtt{resize()}$ يكون عدد الاستدعاءات لـ $ \mathtt{add}$ أو $ \mathtt{remove}$ منذ آخر استدعاء لـ $ \mathtt{resize()}$ لا يقل عن $ \ensuremath{\mathtt{n}}/2-1$ . وعليه، إذا كانت $ \ensuremath{\mathtt{n}}_i$ تدل على قيمة $ \mathtt{n}$ أثناء الاستدعاء رقم $ i$ لـ $ \mathtt{resize()}$ ، و $ r$ تدل على عدد استدعاءات $ \mathtt{resize()}$ ، فإنَّ العدد الكلي للاستدعاءات لـ $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ يكون لا يقل عن

![$\displaystyle \sum_{i=1}^{r} (\ensuremath{\mathtt{n}}_i/2-1) \le m \enspace , $](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img537.png.webp)

وهو ما يُعادل

![$\displaystyle \sum_{i=1}^{r} \ensuremath{\mathtt{n}}_i \le 2m + 2r \enspace . $](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img538.png.webp)

ومن جهة أخرى، فإنَّ الزمن الكلي المستغرق في جميع استدعاءات $ \mathtt{resize()}$ هو

![$\displaystyle \sum_{i=1}^{r} O(\ensuremath{\mathtt{n}}_i) \le O(m+r) = O(m) \enspace , $](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img540.png.webp)

إذ $ r$ لا يزيد عن $ m$ . ولم يتبقَّ سوى أن نبيِّن أنَّ عدد الاستدعاءات لـ $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ بين الاستدعاء رقم $ (i-1)$ والاستدعاء رقم $ i$ لـ $ \mathtt{resize()}$ لا يقل عن $ \ensuremath{\mathtt{n}}_i/2$ .

هناك حالتان يجب مراعاتهما. في الحالة الأولى، يُستدعى $ \mathtt{resize()}$ من $ \mathtt{add(i,x)}$ لأنَّ المصفوفة الخلفية $ \mathtt{a}$ ممتلئة، أي $ \ensuremath{\mathtt{a.length}} = \ensuremath{\mathtt{n}}=\ensuremath{\mathtt{n}}_i$ . فلننظر إلى الاستدعاء السابق لـ $ \mathtt{resize()}$ : فبعد ذلك الاستدعاء كان حجم $ \mathtt{a}$ هو $ \mathtt{a.length}$ ، لكن عدد العناصر المُخزَّنة في $ \mathtt{a}$ لم يكن يتجاوز $ \ensuremath{\mathtt{a.length}}/2=\ensuremath{\mathtt{n}}_i/2$ . أما الآن فعدد العناصر المُخزَّنة في $ \mathtt{a}$ هو $ \ensuremath{\mathtt{n}}_i=\ensuremath{\mathtt{a.length}}$ ، لذا لا بد أن يكون هناك ما لا يقل عن $ \ensuremath{\mathtt{n}}_i/2$ استدعاءً لـ $ \mathtt{add(i,x)}$ منذ الاستدعاء السابق لـ $ \mathtt{resize()}$ . أما الحالة الثانية فتحدث عندما يُستدعى $ \mathtt{resize()}$ من $ \mathtt{remove(i)}$ لأنَّ $ \ensuremath{\mathtt{a.length}} \ge 3\ensuremath{\mathtt{n}}=3\ensuremath{\mathtt{n}}_i$ . أيضًا، فبعد الاستدعاء السابق لـ $ \mathtt{resize()}$ كان عدد العناصر المُخزَّنة في $ \mathtt{a}$ لا يقل عن $ \ensuremath{\mathtt{a.length/2}}-1$ .2.1 والآن هناك $ \ensuremath{\mathtt{n}}_i\le\ensuremath{\mathtt{a.length}}/3$ عنصرًا مُخزَّنًا في $ \mathtt{a}$ . وعليه، فإنَّ عدد عمليات $ \mathtt{remove(i)}$ منذ آخر استدعاء لـ $ \mathtt{resize()}$ لا يقل عن

| $\displaystyle R$ | $\displaystyle \ge \ensuremath{\mathtt{a.length}}/2 - 1 - \ensuremath{\mathtt{a.length}}/3$ |  |
| --- | --- | --- |
|  | $\displaystyle = \ensuremath{\mathtt{a.length}}/6 - 1$ |  |
|  | $\displaystyle = (\ensuremath{\mathtt{a.length}}/3)/2 - 1$ |  |
|  | $\displaystyle \ge \ensuremath{\mathtt{n}}_i/2 -1\enspace .$ |  |

في كلتا الحالتين، يكون عدد الاستدعاءات لـ $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ التي تقع بين الاستدعاء رقم $ (i-1)$ لـ $ \mathtt{resize()}$ والاستدعاء رقم $ i$ لـ $ \mathtt{resize()}$ لا يقل عن $ \ensuremath{\mathtt{n}}_i/2-1$ ، كما هو مطلوب لإتمام البرهان. ![$ \qedsymbol$](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img523.png.webp)

2.1.3 الملخَّص تلخِّص المبرهنة التالية أداء ArrayStack: **المبرهنة 2..1** *يطبِّق ArrayStack واجهة القائمة (List). ومع تجاهل تكلفة الاستدعاءات لـ $ \mathtt{resize()}$ ، يدعم ArrayStack العمليتين * $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ في $ O(1)$ لكل عملية؛ وعمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في $ O(1+\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ لكل عملية. * وعلاوة على ذلك، فإنَّ البدء من ArrayStack فارغ وتنفيذ أي تسلسل من $ m$ عملية من $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ينتج عن ذلك كليًا $ O(m)$ من الزمن المستغرق في جميع استدعاءات $ \mathtt{resize()}$ .*

يُعدّ ArrayStack طريقةً كفؤة لتنفيذ مكدّس (Stack). وعلى وجه التحديد، يمكننا تنفيذ $ \mathtt{push(x)}$ بوصفه $ \mathtt{add(n,x)}$ و$ \mathtt{pop()}$ بوصفه $ \mathtt{remove(n-1)}$ ، وفي هذه الحالة تعمل هاتان العمليتان بزمن مُستهلك قدره $ O(1)$.

#### الحواشي

....2.1 إنَّ $ {}-1$ الواردة في هذه الصيغة تأخذ في الحسبان الحالة الخاصة التي تحدث عندما يكون $ \ensuremath{\mathtt{n}}=0$ و $ \ensuremath{\mathtt{a.length}} = 1$ . [opendatastructures.org](http://opendatastructures.org/)

## 2.2 ‏FastArrayStack: ‏ArrayStack مُحسَّن

معظم العمل الذي يؤديه ArrayStack ينطوي على إزاحة البيانات (بواسطة $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ) ونسخها (بواسطة $ \mathtt{resize()}$ ). وفي التنفيذات المعروضة أعلاه، جرى ذلك باستخدام حلقات $ \mathtt{for}$ . ويتبيَّن أنَّ كثيرًا من بيئات البرمجة تملك دوالَّ خاصة شديدة الكفاءة في نسخ كتل البيانات ونقلها. ففي لغة C توجد الدالتان $ \mathtt{memcpy(d,s,n)}$ و$ \mathtt{memmove(d,s,n)}$ . وفي لغة C++ توجد خوارزمية $ \mathtt{std::copy(a0,a1,b)}$ . وفي Java هناك الدالة $ \mathtt{System.arraycopy(s,i,d,j,n)}$ .

```
    void resize() {
        T[] b = newArray(Math.max(2*n,1));
        System.arraycopy(a, 0, b, 0, n);
        a = b;
    }
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (n + 1 > a.length) resize();
        System.arraycopy(a, i, a, i+1, n-i); 
        a[i] = x;
        n++;
    }
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T x = a[i];
        System.arraycopy(a, i+1, a, i, n-i-1);
        n--; 
        if (a.length >= 3*n) resize();
        return x;
    }
```

عادةً ما تكون هذه الدوال محسَّنة إلى حدٍّ كبير، وقد تستخدم حتى تعليمات آلة خاصة قادرة على إنجاز هذا النسخ بسرعة أكبر بكثير مما نستطيع إنجازه باستخدام حلقة $ \mathtt{for}$ . ورغم أنَّ استخدام هذه الدوال لا يخفض أزمنة التنفيذ من الناحية المقامية (asymptotic)، إلا أنه قد يظل تحسينًا يستحق العناء. ففي تنفيذات Java هنا، أضاف استخدام الدالة الأصلية $ \mathtt{System.arraycopy(s,i,d,j,n)}$ تحسينات في السرعة بمعامل يتراوح بين 2 و3، تبعًا لأنواع العمليات المنفَّذة. وقد تختلف النتائج لديك. [opendatastructures.org](http://opendatastructures.org/)

## 2.3 ‏ArrayQueue: طابور قائم على مصفوفة

**الأقسام الفرعية**

# 2.3 ‏ArrayQueue: طابور قائم على مصفوفة

في هذا القسم، نقدِّم بنية بيانات ArrayQueue التي تنفِّذ طابورًا من نوع FIFO (أول داخل أول خارج)؛ إذ تُزال العناصر من الطابور (باستخدام عملية $ \mathtt{remove()}$ ) بالترتيب نفسه الذي أُضيفت به (باستخدام عملية $ \mathtt{add(x)}$ ). ولاحظ أنَّ ArrayStack خيارٌ سيئ لتنفيذ طابور FIFO. فهو ليس خيارًا جيدًا لأننا سنضطر إلى اختيار أحد طرفي القائمة لإضافة العناصر ثم إزالة العناصر من الطرف الآخر. ويجب أن تعمل إحدى العمليتين على رأس القائمة، ما يستلزم استدعاء $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ بقيمة $ \ensuremath{\mathtt{i}}=0$ . وهذا يعطي زمن تنفيذ يتناسب مع $ \mathtt{n}$ . ولتحقيق تنفيذ فعَّال للطابور قائم على مصفوفة، نلاحظ أولًا أنَّ المشكلة ستكون سهلة لو كانت لدينا مصفوفة لا نهائية $ \mathtt{a}$ . يمكننا أن نحتفظ بفهرس $ \mathtt{j}$ واحد يتتبَّع العنصر التالي الذي ستُزال قيمته، وبعدد صحيح $ \mathtt{n}$ يعدّ عناصر الطابور. وستُخزَّن عناصر الطابور دائمًا في

![$\displaystyle \ensuremath{\mathtt{a[j]}},\ensuremath{\mathtt{a[j+1]}},\ldots,\ensuremath{\mathtt{a[j+n-1]}} \enspace . $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img627.png.webp)

في البداية، تُضبَط كلٌّ من $ \mathtt{j}$ و$ \mathtt{n}$ على 0. ولإضافة عنصر، نضعه في $ \mathtt{a[j+n]}$ ونزِيد $ \mathtt{n}$ . ولإزالة عنصر، نزيله من $ \mathtt{a[j]}$ ، ونزِيد $ \mathtt{j}$ ، وننقص $ \mathtt{n}$ .

بالطبع، تكمن مشكلة هذا الحل في أنه يحتاج مصفوفة لا نهائية. يحاكي ArrayQueue ذلك باستخدام مصفوفة منتهية $ \mathtt{a}$ والحساب ثنائي الباقي (modular arithmetic). وهذا هو نوع الحساب المستخدم عند الحديث عن وقت اليوم. فمثلًا، الساعة 10:00 مضافًا إليها خمس ساعات تعطي 3:00. وصياغةً رسمية، نقول إنَّ

![$\displaystyle 10 + 5 = 15 \equiv 3 \pmod{12} \enspace . $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img636.png.webp)

نقرأ الجزء الأخير من هذه المعادلة على أنَّ «‏15 مُتماثلة (congruent) مع 3 modulo 12.» ويمكن أيضًا أن نتعامل مع $ \bmod$ كمعامل ثنائي، بحيث

![$\displaystyle 15 \bmod 12 = 3 \enspace . $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img638.png.webp)

بشكل أعمَّ، لعدد صحيح $ a$ و عدد صحيح موجب $ m$ ، يكون $ a \bmod m$ هو العدد الصحيح الوحدي $ r\in\{0,\ldots,m-1\}$ الذي يحقِّق $ a = r + km$ لأجل عدد صحيح ما $ k$ . وبعبارة أقل رسمية، فإن القيمة $ r$ هي الباقي الذي نحصل عليه عند قسمة $ a$ على $ m$ . وفي كثير من لغات البرمجة، ومنها Java، يُمثَّل معامل $ \bmod$ بالرمز $ \mathtt{\text{\ttfamily\%}}$ symbol.2.2. ويكون الحساب ثنائي الباقي مفيدًا لمحاكاة مصفوفة لا نهائية، لأنَّ $ \ensuremath{\mathtt{i}}\bmod \ensuremath{\mathtt{a.length}}$ يعطي دائمًا قيمة في المجال $ 0,\ldots,\ensuremath{\mathtt{a.length-1}}$ . وباستخدام الحساب ثنائي الباقي يمكننا تخزين عناصر الطابور في مواضع المصفوفة

![$\displaystyle \ensuremath{\mathtt{a[j\text{\ttfamily\%}a.length]}},\ensuremath{... ...}},\ldots,\ensuremath{\mathtt{a[(j+n-1)\text{\ttfamily\%}a.length]}} \enspace. $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img652.png.webp)

يعامل هذا الأمر المصفوفة $ \mathtt{a}$ بوصفها مصفوفة دائرية (circular array) تُلفّ فيها فهارس المصفوفة الأكبر من $ \ensuremath{\mathtt{a.length}}-1$ «تدور حول نفسها» إلى بداية المصفوفة. ولم يتبقَّ سوى مراعاة ألّا يتجاوز عدد عناصر ArrayQueue حجم $ \mathtt{a}$ .

```
    T[] a;
    int j;
    int n;
```

يوضِّح الشكل 2.2 تسلسلًا من عمليتَي $ \mathtt{add(x)}$ و$ \mathtt{remove()}$ على ArrayQueue. ولتنفيذ $ \mathtt{add(x)}$ ، نتحقَّق أولًا مما إذا كانت $ \mathtt{a}$ ممتلئة، وإن كان الأمر كذلك نستدعي $ \mathtt{resize()}$ لزيادة حجم $ \mathtt{a}$ . بعد ذلك، نخزِّن $ \mathtt{x}$ في $ \mathtt{a[(j+n)\text{\ttfamily\%}a.length]}$ ونزِيد $ \mathtt{n}$ .

```
    boolean add(T x) {
        if (n + 1 > a.length) resize();
        a[(j+n) % a.length] = x;
        n++;
        return true;
    }
```

ولتنفيذ $ \mathtt{remove()}$ ، نخزِّن أولًا $ \mathtt{a[j]}$ لإعادة إرجاعه لاحقًا. بعد ذلك ننقص $ \mathtt{n}$ ونزِيد $ \mathtt{j}$ (حسب $ \mathtt{a.length}$ ) عبر تعيين $ \ensuremath{\mathtt{j}}=(\ensuremath{\mathtt{j}}+1)\bmod \ensuremath{\mathtt{a.length}}$ . وأخيرًا، نُرجِع القيمة المُخزَّنة لـ $ \mathtt{a[j]}$ . وعند الضرورة، يمكننا استدعاء $ \mathtt{resize()}$ لتقليل حجم $ \mathtt{a}$ .

```
    T remove() { 
        if (n == 0) throw new NoSuchElementException();
        T x = a[j];
        j = (j + 1) % a.length;
        n--;
        if (a.length >= 3*n) resize();
        return x;
    }
```

أخيرًا، إنَّ عملية $ \mathtt{resize()}$ شديدة الشبه بعملية $ \mathtt{resize()}$ في ArrayStack. فهي تخصِّص مصفوفة جديدة $ \mathtt{b}$ حجمها $ 2\ensuremath{\mathtt{n}}$ وتنسخ

![$\displaystyle \ensuremath{\mathtt{a[j]}},\ensuremath{\mathtt{a[(j+1)\text{\ttfa... ...}a.length]}},\ldots,\ensuremath{\mathtt{a[(j+n-1)\text{\ttfamily\%}a.length]}} $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img682.png.webp)

إلى

![$\displaystyle \ensuremath{\mathtt{b[0]}},\ensuremath{\mathtt{b[1]}},\ldots,\ensuremath{\mathtt{b[n-1]}} $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img683.png.webp)

وتضبط $ \ensuremath{\mathtt{j}}=0$ .

```
    void resize() {
        T[] b = newArray(Math.max(1,n*2));
        for (int k = 0; k < n; k++) 
            b[k] = a[(j+k) % a.length];
        a = b;
        j = 0;
    }
```

2.3.1 الملخَّص تلخِّص المبرهنة التالية أداء بنية بيانات ArrayQueue: **المبرهنة 2..2** *يطبِّق ArrayQueue واجهة الطابور (Queue) من نوع FIFO. ومع تجاهل تكلفة الاستدعاءات لـ $ \mathtt{resize()}$ ، يدعم ArrayQueue العمليتين $ \mathtt{add(x)}$ و$ \mathtt{remove()}$ في $ O(1)$ لكل عملية. وعلاوة على ذلك، فإنَّ البدء من ArrayQueue فارغ وتنفيذ أي تسلسل من $ m$ عملية من $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ينتج عن ذلك كليًا $ O(m)$ من الزمن المستغرق في جميع استدعاءات $ \mathtt{resize()}$ .*

#### الحواشي

... symbol.2.2 يُشار إلى هذا أحيانًا بـ«عامل الباقي الغبي» (brain-dead mod operator)، لأنَّه لا ينفِّذ معامل الباقي الرياضي تنفيذًا صحيحًا عندما يكون المعامل الأول سالبًا. [opendatastructures.org](http://opendatastructures.org/)

## 2.4 ‏ArrayDeque: عمليات deque سريعة باستخدام مصفوفة

**الأقسام الفرعية**

# 2.4 ‏ArrayDeque: عمليات deque سريعة باستخدام مصفوفة

إنَّ ArrayQueue من القسم السابق بنية بيانات تمثِّل تسلسلًا يتيح لنا الإضافة بكفاءة إلى أحد طرفي التسلسل والإزالة من الطرف الآخر. أما بنية بيانات ArrayDeque — أي الصف المزدوج الطرفين (deque) — فتتيح الإضافة والإزالة بكفاءة عند كلا الطرفين. وتنفِّذ هذه البنية واجهة القائمة (List) باستخدام تقنية المصفوفة الدائرية نفسها المستخدَمة لتمثيل ArrayQueue.

```
    T[] a;
    int j;
    int n;
```

عمليتا $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ على ArrayDeque مباشرتان. فهما تجلبان أو تضبطان عنصر المصفوفة $ \ensuremath{\mathtt{a[}}{\ensuremath{\mathtt{(j+i)}}\bmod \ensuremath{\mathtt{a.length}}}\ensuremath{\mathtt{]}}$ .

```
    T get(int i) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        return a[(j+i)%a.length];
    }
    T set(int i, T x) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        T y = a[(j+i)%a.length];
        a[(j+i)%a.length] = x;
        return y;
    }
```

تنفيذ $ \mathtt{add(i,x)}$ أكثر إثارةً للاهتمام قليلًا. وكالمعتاد، نتحقَّق أولًا مما إذا كانت $ \mathtt{a}$ ممتلئة، وإن كان الأمر كذلك نستدعي $ \mathtt{resize()}$ لتغيير حجم $ \mathtt{a}$ . وتذكَّر أنَّنا نريد أن تكون هذه العملية سريعة عندما يكون $ \mathtt{i}$ صغيرًا (قريبًا من 0) أو عندما يكون $ \mathtt{i}$ كبيرًا (قريبًا من $ \mathtt{n}$ ). وعليه، نتحقَّق مما إذا كان $ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{n}}/2$ . وإن كان الأمر كذلك، فإنَّنا نزيح العناصر $ \ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[i-1]}}$ إلى اليسار بموضع واحد. وإلا ( $ \ensuremath{\mathtt{i}}\ge\ensuremath{\mathtt{n}}/2$ )، فإنَّنا نزيح العناصر $ \ensuremath{\mathtt{a[i]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$ إلى اليمين بموضع واحد. انظر الشكل 2.3 لتوضيح عمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(x)}$ على ArrayDeque.

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (n+1 > a.length) resize();
        if (i < n/2) { // shift a[0],..,a[i-1] left one position
            j = (j == 0) ? a.length - 1 : j - 1; //(j-1)mod a.length
            for (int k = 0; k <= i-1; k++)
                a[(j+k)%a.length] = a[(j+k+1)%a.length];
        } else { // shift a[i],..,a[n-1] right one position
            for (int k = n; k > i; k--)
                a[(j+k)%a.length] = a[(j+k-1)%a.length];
        }
        a[(j+i)%a.length] = x;
        n++;
    }
```

بإجراء الإزاحة بهذه الطريقة، نضمن ألَّا تحتاج $ \mathtt{add(i,x)}$ قط إلى إزاحة أكثر من $ \min\{ \ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}} \}$ عنصرًا. وعليه، فإن زمن تنفيذ عملية $ \mathtt{add(i,x)}$ (مع تجاهل تكلفة عملية $ \mathtt{resize()}$ ) هو $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ . وتنفيذ عملية $ \mathtt{remove(i)}$ مشابه. فهو إما أن يزيح العناصر $ \ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[i-1]}}$ إلى اليمين بموضع واحد، أو يزيح العناصر $ \ensuremath{\mathtt{a[i+1]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$ إلى اليسار بموضع واحد، تبعًا لما إذا كان $ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{n}}/2$ . ومرةً أخرى، هذا يعني أنَّ $ \mathtt{remove(i)}$ لا يقضي أكثر من $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ في إزاحة العناصر.

```
    T remove(int i) {
        if (i < 0 || i > n - 1)    throw new IndexOutOfBoundsException();
        T x = a[(j+i)%a.length];
        if (i < n/2) {  // shift a[0],..,[i-1] right one position
            for (int k = i; k > 0; k--)
                a[(j+k)%a.length] = a[(j+k-1)%a.length];
            j = (j + 1) % a.length;
        } else { // shift a[i+1],..,a[n-1] left one position
            for (int k = i; k < n-1; k++)
                a[(j+k)%a.length] = a[(j+k+1)%a.length];
        }
        n--;
        if (3*n < a.length) resize();
        return x;
    }
```

2.4.1 الملخَّص تلخِّص المبرهنة التالية أداء بنية بيانات ArrayDeque: **المبرهنة 2..3** *يطبِّق ArrayDeque واجهة القائمة (List). ومع تجاهل تكلفة الاستدعاءات لـ $ \mathtt{resize()}$ ، يدعم ArrayDeque العمليتين * $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ في $ O(1)$ لكل عملية؛ وعمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ لكل عملية. * وعلاوة على ذلك، فإنَّ البدء من ArrayDeque فارغ وتنفيذ أي تسلسل من $ m$ عملية من $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ينتج عن ذلك كليًا $ O(m)$ من الزمن المستغرق في جميع استدعاءات $ \mathtt{resize()}$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 2.5 ‏DualArrayDeque: بناء deque من مكدَّسين

**الأقسام الفرعية**

# 2.5 ‏DualArrayDeque: بناء deque من مكدَّسين

بعد ذلك، نقدِّم بنية بيانات هي DualArrayDeque، التي تحقِّق حدود الأداء نفسها التي يحقِّقها ArrayDeque باستخدام مصفوفة ArrayStack. ورغم أنَّ الأداء المقامي (asymptotic) لـ DualArrayDeque ليس أفضل من أداء ArrayDeque، فإنَّه يظل جديرًا بالدراسة، لأنَّه يقدِّم مثالًا جيدًا على كيفية بناء بنية بيانات متطوِّرة عبر دمج بنَيتي بيانات أبسط. يمثِّل DualArrayDeque قائمة باستخدام مصفوفتي ArrayStack. وتذكَّر أنَّ ArrayStack سريع عندما تعدِّل عليه العمليات عناصر قريبة من نهايته. يضع DualArrayDeque مصفوفتي ArrayStack، المسمَّيتَي $ \mathtt{front}$ و$ \mathtt{back}$ ، متجاورتين ظهرًا لظهر بحيث تكون العمليات سريعة عند أيٍّ من الطرفين.

```
    List<T> front;
    List<T> back;
```

لا يخزِّن DualArrayDeque صراحةً العدد $ \mathtt{n}$ للعناصر التي يحتوي عليها. فهو لا يحتاج إلى ذلك، لأنَّه يحتوي على $ \ensuremath{\mathtt{n}}=\ensuremath{\mathtt{front.size()}} + \ensuremath{\mathtt{back.size()}}$ عنصرًا. ومع ذلك، فإننا سنظل نستخدم $ \mathtt{n}$ في تحليل DualArrayDeque للدلالة على عدد العناصر التي يحتوي عليها.

```
    int size() {
        return front.size() + back.size();        
    }
```

يخزِّن الـ ArrayStack المسمَّى $ \mathtt{front}$ عناصر القائمة التي فهارسها $ 0,\ldots,\ensuremath{\mathtt{front.size()}}-1$ ، لكنه يخزِّنها بترتيب معكوس. ويحتوي الـ ArrayStack المسمَّى $ \mathtt{back}$ على عناصر القائمة ذات الفهارس في $ \ensuremath{\mathtt{front.size()}},\ldots,\ensuremath{\mathtt{size()}}-1$ بترتيبها الطبيعي. وبهذه الطريقة، تُترجَم $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ إلى استدعاءات ملائمة لـ $ \mathtt{get(i)}$ أو $ \mathtt{set(i,x)}$ على $ \mathtt{front}$ أو $ \mathtt{back}$ ، وتستغرق $ O(1)$ لكل عملية.

```
    T get(int i) {
        if (i < front.size()) {
            return front.get(front.size()-i-1);
        } else {
            return back.get(i-front.size());
        }
    }
    T set(int i, T x) {
        if (i < front.size()) {
            return front.set(front.size()-i-1, x);
            
        } else {
            return back.set(i-front.size(), x);
        }
    }
```

ولاحظ أنَّ الفهرس $ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{front.size()}}$ يقابل عنصر $ \mathtt{front}$ عند الموضع $ \ensuremath{\mathtt{front.size()}}-\ensuremath{\mathtt{i}}-1$ ، لأنَّ عناصر $ \mathtt{front}$ مُخزَّنة بترتيب معكوس. ويوضِّح الشكل 2.4 إضافة العناصر إلى DualArrayDeque وإزالتها منها. فعملية $ \mathtt{add(i,x)}$ تُعالج $ \mathtt{front}$ أو $ \mathtt{back}$ حسبما هو مناسب:

```
    void add(int i, T x) {
        if (i < front.size()) { 
            front.add(front.size()-i, x);
        } else {
            back.add(i-front.size(), x);
        }
        balance();
    }
```

تنفِّذ الدالة $ \mathtt{add(i,x)}$ إعادة الموازنة (rebalancing) لـ ArrayStack المسمَّيين $ \mathtt{front}$ و$ \mathtt{back}$ ، من خلال استدعاء الدالة $ \mathtt{balance()}$ . ويُشرح تنفيذ $ \mathtt{balance()}$ أدناه، لكن يكفي في الوقت الحالي أن نعلم أنَّ $ \mathtt{balance()}$ تضمن، ما لم يكن $ \ensuremath{\mathtt{size()}}<2$ ، ألَّا يختلف $ \mathtt{front.size()}$ عن $ \mathtt{back.size()}$ بمعامل يفوق 3. وعلى وجه التحديد، $ 3\cdot\ensuremath{\mathtt{front.size()}} \ge \ensuremath{\mathtt{back.size()}}$ و $ 3\cdot\ensuremath{\mathtt{back.size()}} \ge \ensuremath{\mathtt{front.size()}}$ . نحلِّل بعد ذلك تكلفة $ \mathtt{add(i,x)}$ ، متجاهلين تكلفة الاستدعاءات لـ $ \mathtt{balance()}$ . فإذا كان $ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{front.size()}}$ ، فإنَّ $ \mathtt{add(i,x)}$ يُنفَّذ بالاستدعاء إلى $ \ensuremath{\mathtt{front.add(front.size()-i-1,x)}}$ . وبما أنَّ $ \mathtt{front}$ هو ArrayStack، فإنَّ تكلفة ذلك هي

ومن جهة أخرى، إذا كان $ \ensuremath{\mathtt{i}}\ge\ensuremath{\mathtt{front.size()}}$ ، فإنَّ $ \mathtt{add(i,x)}$ يُنفَّذ بوصفه $ \ensuremath{\mathtt{back.add(i-front.size(),x)}}$ . وتكلفة ذلك هي

ولاحظ أنَّ الحالة الأولى (2.1) تحدث عندما يكون $ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{n}}/4$ . وتحدث الحالة الثانية (2.2) عندما يكون $ \ensuremath{\mathtt{i}}\ge 3\ensuremath{\mathtt{n}}/4$ . وعندما يكون $ \ensuremath{\mathtt{n}}/4\le\ensuremath{\mathtt{i}}<3\ensuremath{\mathtt{n}}/4$ ، لا يمكننا الجزم ما إذا كانت العملية تؤثِّر في $ \mathtt{front}$ أم في $ \mathtt{back}$ ، لكن في كلتا الحالتين تستغرق العملية $ O(\ensuremath{\mathtt{n}})=O(\ensuremath{\mathtt{i}})=O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ من الوقت، لأنَّ $ \ensuremath{\mathtt{i}}\ge \ensuremath{\mathtt{n}}/4$ و $ \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}> \ensuremath{\mathtt{n}}/4$ . وتلخيصًا للموقف، لدينا

زمن تنفيذ ![$\displaystyle \ensuremath{\mathtt{add(i,x)}} \le \left\{\begin{array}{ll} O(... ... $\ensuremath{\mathtt{i}} \ge 3\ensuremath{\mathtt{n}}/4$} \end{array}\right. $](/images/open-data-structures/2_5_DualArrayDeque_Building-img793.png.webp)

وعليه، فإن زمن تنفيذ $ \mathtt{add(i,x)}$ ، إذا تجاهلنا تكلفة الاستدعاء إلى $ \mathtt{balance()}$ ، هو $ O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ . وتُشبه عملية $ \mathtt{remove(i)}$ وتحليلُها عملية $ \mathtt{add(i,x)}$ وتحليلَها.

```
    T remove(int i) {
        T x;
        if (i < front.size()) {
            x = front.remove(front.size()-i-1);
        } else {
            x = back.remove(i-front.size());
        }
        balance();
        return x;
    }
```

## 2.5.1 الموازنة

أخيرًا، ننتقل إلى عملية $ \mathtt{balance()}$ التي تنفِّذها $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ . وتضمن هذه العملية ألَّا يصير $ \mathtt{front}$ ولا $ \mathtt{back}$ كبيرًا جدًا (أو صغيرًا جدًا). فهي تضمن أنَّ كلًّا من $ \mathtt{front}$ و$ \mathtt{back}$ يحتوي على ما لا يقل عن $ \ensuremath{\mathtt{n}}/4$ عنصر، ما لم يكن عدد العناصر أقل من اثنين. وإن لم يكن الأمر كذلك، فإنَّها تنقل عناصر بينهما بحيث يحتوي كلٌّ من $ \mathtt{front}$ و$ \mathtt{back}$ على $ \lfloor\ensuremath{\mathtt{n}}/2\rfloor$ عنصر و $ \lceil\ensuremath{\mathtt{n}}/2\rceil$ عنصر على الترتيب.

```
    void balance() {
        int n = size();
        if (3*front.size() < back.size()) {
            int s = n/2 - front.size();
            List<T> l1 = newStack();
            List<T> l2 = newStack();
            l1.addAll(back.subList(0,s));
            Collections.reverse(l1);
            l1.addAll(front);
            l2.addAll(back.subList(s, back.size()));
            front = l1;
            back = l2;
        } else if (3*back.size() < front.size()) {
            int s = front.size() - n/2;
            List<T> l1 = newStack();
            List<T> l2 = newStack();
            l1.addAll(front.subList(s, front.size()));
            l2.addAll(front.subList(0, s));
            Collections.reverse(l2);
            l2.addAll(back);
            front = l1;
            back = l2;
        }
    }
```

لا يوجد الكثير هنا لتحليله. فإذا قامت $ \mathtt{balance()}$ بإعادة الموازنة، فإنَّها تنقل $ O(\ensuremath{\mathtt{n}})$ عنصرًا وهذا يستغرق $ O(\ensuremath{\mathtt{n}})$ من الوقت. وهذا أمر سيئ، لأنَّ $ \mathtt{balance()}$ يُستدعى مع كل استدعاء لـ $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ . لكنَّ المُلمَّة التالية تبيِّن أنَّ $ \mathtt{balance()}$ ، في المتوسط، لا يقضي سوى وقت ثابت لكل عملية. **المُلمَّة 2..2** *إذا أُنشئ DualArrayDeque فارغ ونُفِّذ أي تسلسل من $ m\ge 1$ استدعاءً لـ $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ، فإنَّ الزمن الكلي المستغرق في جميع استدعاءات $ \mathtt{balance()}$ هو $ O(m)$ .*

*البرهان*. سنبيِّن أنَّه إذا أُجبر $ \mathtt{balance()}$ على إزاحة عناصر، فإنَّ عدد عمليات $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ منذ آخر مرة أوزحت فيها $ \mathtt{balance()}$ العناصر لا يقل عن $ \ensuremath{\mathtt{n}}/2-1$ . وكما في برهان المُلمَّة 2.1، فإنَّ هذا كافٍ لإثبات أنَّ الزمن الكلي الذي يقضيه $ \mathtt{balance()}$ هو $ O(m)$ .

سنجري تحليلنا باستخدام تقنية تُعرف باسم طريقة الجهد (potential method). نعرِّف جهد DualArrayDeque، $ \Phi$ ، بأنه الفرق في الحجم بين $ \mathtt{front}$ و$ \mathtt{back}$ :

![$\displaystyle \Phi = \vert\ensuremath{\mathtt{front.size()}} - \ensuremath{\mathtt{back.size()}}\vert \enspace . $](/images/open-data-structures/2_5_DualArrayDeque_Building-img834.png.webp)

والأمر اللافت للنظر في هذا الجهد أنَّ استدعاء $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ الذي لا يقوم بأي موازنة يمكن أن يزيد الجهد بما لا يزيد عن 1.

ولاحظ أنَّه مباشرة بعد استدعاء $ \mathtt{balance()}$ الذي يزيح العناصر، يكون الجهد $ \Phi_0$ لا يزيد عن 1، لأنَّ

![$\displaystyle \Phi_0 = \left\vert\lfloor\ensuremath{\mathtt{n}}/2\rfloor-\lceil\ensuremath{\mathtt{n}}/2\rceil\right\vert\le 1 \enspace .$](/images/open-data-structures/2_5_DualArrayDeque_Building-img839.png.webp)

تخيَّل الحالة السابقة مباشرة لاستدعاء $ \mathtt{balance()}$ الذي يزيح العناصر، وافترض دون خسارة في العمومية أنَّ $ \mathtt{balance()}$ يزيح العناصر لأنَّ $ 3\ensuremath{\mathtt{front.size()}} < \ensuremath{\mathtt{back.size()}}$ . ولاحظ أنَّه في هذه الحالة، ![$\displaystyle \ensuremath{\mathtt{n}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img843.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img844.png.webp) ![$\displaystyle \ensuremath{\mathtt{front.size()}}+\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img845.png.webp) ![$\displaystyle <$](/images/open-data-structures/2_5_DualArrayDeque_Building-img846.png.webp) ![$\displaystyle \ensuremath{\mathtt{back.size()}}/3+\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img847.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img848.png.webp) ![$\displaystyle \frac{4}{3}\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img849.png.webp) وعلاوة على ذلك، فإنَّ الجهد في هذه اللحظة يساوي ![$\displaystyle \Phi_1$](/images/open-data-structures/2_5_DualArrayDeque_Building-img850.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img851.png.webp) ![$\displaystyle \ensuremath{\mathtt{back.size()}} - \ensuremath{\mathtt{front.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img852.png.webp) ![$\displaystyle >$](/images/open-data-structures/2_5_DualArrayDeque_Building-img853.png.webp) ![$\displaystyle \ensuremath{\mathtt{back.size()}} - \ensuremath{\mathtt{back.size()}}/3$](/images/open-data-structures/2_5_DualArrayDeque_Building-img854.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img855.png.webp) ![$\displaystyle \frac{2}{3}\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img856.png.webp) ![$\displaystyle >$](/images/open-data-structures/2_5_DualArrayDeque_Building-img857.png.webp) ![$\displaystyle \frac{2}{3}\times\frac{3}{4}\ensuremath{\mathtt{n}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img858.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img859.png.webp) ![$\displaystyle \ensuremath{\mathtt{n}}/2$](/images/open-data-structures/2_5_DualArrayDeque_Building-img860.png.webp) وعليه، فإنَّ عدد الاستدعاءات لـ $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ منذ آخر مرة أزاحت فيها $ \mathtt{balance()}$ العناصر لا يقل عن $ \Phi_1-\Phi_0 > \ensuremath{\mathtt{n}}/2-1$ . وهذا يُتمِّ البرهان. ![$ \qedsymbol$](/images/open-data-structures/2_5_DualArrayDeque_Building-img823.png.webp)

2.5.2 الملخَّص تلخِّص المبرهنة التالية خصائص DualArrayDeque: **المبرهنة 2..4** *يطبِّق DualArrayDeque واجهة القائمة (List). ومع تجاهل تكلفة الاستدعاءات لـ $ \mathtt{resize()}$ و$ \mathtt{balance()}$ ، يدعم DualArrayDeque العمليتين * $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ في $ O(1)$ لكل عملية؛ وعمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ لكل عملية. * وعلاوة على ذلك، فإنَّ البدء من DualArrayDeque فارغ وتنفيذ أي تسلسل من $ m$ عملية من $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ينتج عن ذلك كليًا $ O(m)$ من الزمن المستغرق في جميع استدعاءات $ \mathtt{resize()}$ و$ \mathtt{balance()}$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 2.6 ‏RootishArrayStack: مكدّس مصفوفات موفِّر للمساحة

**الأقسام الفرعية**

# 2.6 ‏RootishArrayStack: مكدّس مصفوفات موفِّر للمساحة

أحد عيوب جميع بنى البيانات السابقة في هذا الفصل أنَّها، لأنها تخزِّن بياناتها في مصفوفة أو مصفوفتين وتتجنَّب تغيير حجم هاتين المصفوفتين كثيرًا، تكون المصفوفات بكثرة غير ممتلئة إلى حدٍّ كبير. فمثلًا، مباشرة بعد عملية $ \mathtt{resize()}$ على ArrayStack، تكون المصفوفة الخلفية $ \mathtt{a}$ ممتلئة بمقدار النصف فقط. والأمر أسوأ، إذ توجد أوقات لا يحمل فيها سوى ثلث $ \mathtt{a}$ بيانات. وفي هذا القسم، نناقش بنية بيانات RootishArrayStack التي تعالج مشكلة المساحة المهدورة. يخزِّن RootishArrayStack عدد $ \mathtt{n}$ من العناصر باستخدام $ O(\sqrt{\ensuremath{\mathtt{n}}})$ مصفوفة. وفي هذه المصفوفات، لا يوجد سوى $ O(\sqrt{\ensuremath{\mathtt{n}}})$ موضع كحدٍّ أقصى غير مستخدَم في أي لحظة. وتُستخدم جميع المواضع المتبقية لتخزين البيانات. وعليه، فإنَّ هذه البنى تهدر $ O(\sqrt{\ensuremath{\mathtt{n}}})$ من المساحة كحدٍّ أقصى عند تخزين $ \mathtt{n}$ عنصرًا. ويخزِّن RootishArrayStack عناصره في قائمة من $ \mathtt{r}$ مصفوفة تُدعى كتلًا (blocks) وتُرقَّم $ 0,1,\ldots,\ensuremath{\mathtt{r}}-1$ . انظر الشكل 2.5. تحتوي الكتلة $ b$ على $ b+1$ عنصرًا. وعليه، فإنَّ الكتل $ \mathtt{r}$ كلها تحتوي إجمالًا على

![$\displaystyle 1+ 2+ 3+\cdots +\ensuremath{\mathtt{r}} = \ensuremath{\mathtt{r}}(\ensuremath{\mathtt{r}}+1)/2 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img892.png.webp)

عنصرًا. ويمكن اشتقاق الصيغة أعلاه على النحو المبيَّن في الشكل 2.6.

```
    List<T[]> blocks;
    int n;
```

**الشكل 2.6:** عدد المربعات البيضاء يساوي $ 1+2+3+\cdots+\ensuremath{\mathtt{r}}$ . وعدد المربعات المظلَّلة هو نفسه. ويشكِّل المربعات البيضاء والمظلَّلة معًا مستطيلًا يتكوَّن من $ \ensuremath{\mathtt{r}}(\ensuremath{\mathtt{r}}+1)$ مربعًا. ![\includegraphics[scale=0.90909]{figs/gauss}](/images/open-data-structures/2_6_RootishArrayStack_Space-img896.png.webp) وكما قد نتوقَّع، تُرتَّب عناصر القائمة بالترتيب داخل الكتل. فعنصر القائمة ذو الفهرس 0 مُخزَّن في الكتلة 0، وعناصر القائمة ذات الفهارس 1 و2 مُخزَّنة في الكتلة 1، وعناصر القائمة ذات الفهارس 3 و4 و5 مُخزَّنة في الكتلة 2، وهكذا. المشكلة الرئيسية التي علينا معالجتها هي، عند معرفة الفهرس $ \ensuremath{\mathtt{i}}$ ، تحديد الكتلة التي تحتوي $ \mathtt{i}$ وكذلك الفهرس المقابل لـ $ \mathtt{i}$ داخل تلك الكتلة. ويتبيَّن أنَّ تحديد فهرس $ \mathtt{i}$ داخل كتلته أمرٌ سهل. فإذا كان الفهرس $ \mathtt{i}$ في الكتلة $ \mathtt{b}$ ، فإنَّ عدد العناصر في الكتل $ 0,\ldots,\ensuremath{\mathtt{b}}-1$ هو $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)/2$ . وعليه، فإنَّ $ \mathtt{i}$ مُخزَّن في الموضع

![$\displaystyle \ensuremath{\mathtt{j}} = \ensuremath{\mathtt{i}} - \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)/2 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img910.png.webp)

داخل الكتلة $ \mathtt{b}$ . والإطار تحديبي هو تحديد قيمة $ \mathtt{b}$ . فعدد العناصر التي فهارسها أصغر من $ \mathtt{i}$ أو تساويه هو $ \ensuremath{\mathtt{i}}+1$ . ومن جهة أخرى، عدد العناصر في الكتل 0,...,b هو $ (\ensuremath{\mathtt{b}}+1)(\ensuremath{\mathtt{b}}+2)/2$ . وعليه، فإنَّ $ \mathtt{b}$ هو أصغر عدد صحيح بحيث

![$\displaystyle (\ensuremath{\mathtt{b}}+1)(\ensuremath{\mathtt{b}}+2)/2 \ge \ensuremath{\mathtt{i}}+1 \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img917.png.webp)

ويمكننا إعادة كتابة هذه المعادلة على النحو

![$\displaystyle \ensuremath{\mathtt{b}}^2 + 3\ensuremath{\mathtt{b}} - 2\ensuremath{\mathtt{i}} \ge 0 \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img918.png.webp)

وللمعادلة التربيعية المقابلة $ \ensuremath{\mathtt{b}}^2 + 3\ensuremath{\mathtt{b}} - 2\ensuremath{\mathtt{i}} = 0$ حلّان: $ \ensuremath{\mathtt{b}}=(-3 + \sqrt{9+8\ensuremath{\mathtt{i}}}) / 2$ و $ \ensuremath{\mathtt{b}}=(-3 - \sqrt{9+8\ensuremath{\mathtt{i}}}) / 2$ . والحلّ الثاني لا معنى له في تطبيقنا لأنَّه يعطي دائمًا قيمة سالبة. وعليه، نحصل على الحل $ \ensuremath{\mathtt{b}} = (-3 + \sqrt{9+8i}) / 2$ . وبشكل عام، فإنَّ هذا الحل ليس عددًا صحيحًا، لكن عند العودة إلى المتباينة نريد أصغر عدد صحيح $ \ensuremath{\mathtt{b}}$ بحيث $ \ensuremath{\mathtt{b}} \ge (-3 + \sqrt{9+8i}) / 2$ . وهذا ببساطة هو

![$\displaystyle \ensuremath{\mathtt{b}} = \left\lceil(-3 + \sqrt{9+8i}) / 2\right\rceil \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img925.png.webp)

```
     int i2b(int i) {
        double db = (-3.0 + Math.sqrt(9 + 8*i)) / 2.0;
        int b = (int)Math.ceil(db);
        return b; 
    }
```

وبانتهاء هذا الأمر، تكون الدالتان $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ مباشرتين. فنحسب أولًا الكتلة المناسبة $ \mathtt{b}$ والفهرس المناسب $ \mathtt{j}$ داخل الكتلة، ثم ننفِّذ العملية المناسبة:

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        int b = i2b(i);
        int j = i - b*(b+1)/2;
        return blocks.get(b)[j];
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        int b = i2b(i);
        int j = i - b*(b+1)/2;
        T y = blocks.get(b)[j];
        blocks.get(b)[j] = x;
        return y;
    }
```

إذا استخدمنا أيًّا من بنى البيانات في هذا الفصل لتمثيل قائمة $ \mathtt{blocks}$ ، فإنَّ $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ تعمل كلٌّ منهما بزمن ثابت. أمَّا الدالة $ \mathtt{add(i,x)}$ فستبدو مألوفةً الآن. فنتحقَّق أولًا مما إذا كانت بنية البيانات ممتلئة، عبر التحقُّق مما إذا كان عدد الكتل $ \mathtt{r}$ بحيث $ \ensuremath{\mathtt{r}}(\ensuremath{\mathtt{r}}+1)/2 = \ensuremath{\mathtt{n}}$ . وإن كان الأمر كذلك، نستدعي $ \mathtt{grow()}$ لإضافة كتلة أخرى. وبانتهاء ذلك، نزيح العناصر ذات الفهارس $ \ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{n}}-1$ إلى اليمين بموضع واحد لإفساح المجال للعنصر الجديد ذي الفهرس $ \mathtt{i}$ :

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        int r = blocks.size();
        if (r*(r+1)/2 < n + 1) grow();
        n++;
        for (int j = n-1; j > i; j--)
            set(j, get(j-1));
        set(i, x);
    }
```

تفعل الدالة $ \mathtt{grow()}$ ما نتوقَّعه؛ فهي تضيف كتلة جديدة:

```
    void grow() {
        blocks.add(newArray(blocks.size()+1));
    }
```

مع تجاهل تكلفة عملية $ \mathtt{grow()}$ ، تكون تكلفة عملية $ \mathtt{add(i,x)}$ مهيمنةً عليها تكلفة الإزاحة، وعليها $ O(1+\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ ، تمامًا مثل ArrayStack. أما عملية $ \mathtt{remove(i)}$ فمشابهة لـ $ \mathtt{add(i,x)}$ . فهي تزيح العناصر ذات الفهارس $ \ensuremath{\mathtt{i}}+1,\ldots,\ensuremath{\mathtt{n}}$ إلى اليسار بموضع واحد، ثم إن كان هناك أكثر من كتلة فارغة واحدة، تستدعي الدالة $ \mathtt{shrink()}$ لإزالة جميع الكتل غير المستخدَمة ما عدا واحدة:

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T x = get(i);
        for (int j = i; j < n-1; j++)
            set(j, get(j+1));
        n--;
        int r = blocks.size();
        if ((r-2)*(r-1)/2 >= n)    shrink();
        return x;
    }
```

```
    void shrink() {
        int r = blocks.size();
        while (r > 0 && (r-2)*(r-1)/2 >= n) {
            blocks.remove(blocks.size()-1);
            r--;
        }
    }
```

مرةً أخرى، مع تجاهل تكلفة عملية $ \mathtt{shrink()}$ ، تكون تكلفة عملية $ \mathtt{remove(i)}$ مهيمنةً عليها تكلفة الإزاحة، وعليها $ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ . 2.6.1 تحليل النمو والانكماش لا يأخذ التحليل أعلاه لعمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في الحسبان تكلفة $ \mathtt{grow()}$ و$ \mathtt{shrink()}$ . ولاحظ أنَّ عملية $ \mathtt{ArrayStack.resize()}$ لا تنسخ أي بيانات، بخلاف $ \mathtt{grow()}$ و$ \mathtt{shrink()}$ . فهما تخصِّصان أو تحرِّران مصفوفة واحدة فقط بحجم $ \mathtt{r}$ . وفي بعض البيئات يستغرق هذا وقتًا ثابتًا فقط، بينما في بيئات أخرى قد يتطلب وقتًا يتناسب مع $ \mathtt{r}$ . ونلاحظ أنَّ الحالة تكون واضحة مباشرة بعد استدعاء $ \mathtt{grow()}$ أو $ \mathtt{shrink()}$ : فالكتلة الأخيرة فارغة تمامًا، وكل الكتل الأخرى ممتلئة تمامًا. ولن يحدث استدعاء آخر لـ $ \mathtt{grow()}$ أو $ \mathtt{shrink()}$ حتى يتم إضافة أو إزالة ما لا يقل عن $ \ensuremath{\mathtt{r}}-1$ عنصر. وعليه، فحتى لو استغرق $ \mathtt{grow()}$ و$ \mathtt{shrink()}$ $ O(\ensuremath{\mathtt{r}})$ من الوقت، فإنَّ هذه التكلفة يمكن توزيعها (amortize) على ما لا يقل عن $ \ensuremath{\mathtt{r}}-1$ عملية من $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$، بحيث تصبح التكلفة المُستهلكة لـ $ \mathtt{grow()}$ و$ \mathtt{shrink()}$ هي $ O(1)$ لكل عملية. 2.6.2 استهلاك المساحة نحلِّل بعد ذلك مقدار المساحة الإضافية التي يستخدمها RootishArrayStack. فعلى وجه التحديد، نريد أن نحسب أي مساحة يستخدمها RootishArrayStack وليست عنصرًا في مصفوفة مستخدَمًا حاليًا للاحتفاظ بعنصر قائمة. ونسمِّي كل هذه المساحة «المساحة المهدورة» (wasted space). وتضمن عملية $ \mathtt{remove(i)}$ ألَّا يكون لدى RootishArrayStack أكثر من كتلتين ليستا ممتلئتين تمامًا. وعليه، فإنَّ عدد الكتل $ \mathtt{r}$ المستخدَمة في RootishArrayStack الذي يخزِّن $ \mathtt{n}$ عنصرًا يحقِّق

![$\displaystyle (\ensuremath{\mathtt{r}}-2)(\ensuremath{\mathtt{r}}-1) \le \ensuremath{\mathtt{n}} \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img976.png.webp)

ومرةً أخرى، فإنَّ تطبيق المعادلة التربيعية على ذلك يعطي

![$\displaystyle \ensuremath{\mathtt{r}} \le (3+\sqrt{1+4\ensuremath{\mathtt{n}}})/2 = O(\sqrt{\ensuremath{\mathtt{n}}}) \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img977.png.webp)

للكتلتين الأخيرتين الحجمان $ \mathtt{r}$ و $ \mathtt{r-1}$ ، لذا فإنَّ المساحة المهدورة بهاتين الكتلتين لا تتجاوز $ 2\ensuremath{\mathtt{r}}-1 = O(\sqrt{\ensuremath{\mathtt{n}}})$ . وإذا خزَّنَّا الكتل في (مثلًا) ArrayStack، فإنَّ مقدار المساحة المهدورة في القائمة (List) التي تخزِّن تلك الكتل $ \mathtt{r}$ هو أيضًا $ O(\ensuremath{\mathtt{r}})=O(\sqrt{\ensuremath{\mathtt{n}}})$ . أما المساحة الأخرى اللازمة لتخزين $ \mathtt{n}$ والمعلومات المحاسبية الأخرى فهي $ O(1)$ . وعليه، فإنَّ المقدار الكلي للمساحة المهدورة في RootishArrayStack هو $ O(\sqrt{\ensuremath{\mathtt{n}}})$ .

بعد ذلك، نُجادل بأنَّ استهلاك المساحة هذا هو الأمثل لأي بنية بيانات تبدأ فارغة وتدعم إضافة عنصر واحد في كل مرة. وبشكل أدق، سنبيِّن أنَّه في لحظة ما أثناء إضافة $ \mathtt{n}$ عنصرًا، تكون بنية البيانات تهدري مساحة لا تقل عن $ \sqrt{\ensuremath{\mathtt{n}}}$ (رغم أنها قد تكون مهدورة للحظة فقط). لنفترض أننا نبدأ ببنية بيانات فارغة ونضيف $ \mathtt{n}$ عنصرًا واحدًا في كل مرة. وفي نهاية هذه العملية، تكون جميع العناصر $ \mathtt{n}$ مخزَّنة في البنية وموزَّعة على مجموعة من كتل الذاكرة $ \mathtt{r}$ . فإذا كان $ \ensuremath{\mathtt{r}}\ge \sqrt{\ensuremath{\mathtt{n}}}$ ، فيجب أن تستخدم بنية البيانات $ \mathtt{r}$ مؤشرًا (أو مرجعًا) لتتبُّع تلك الكتل $ \mathtt{r}$ ، وهذه المؤشرات هي المساحة المهدورة. ومن جهة أخرى، إذا كان $ \ensuremath{\mathtt{r}} < \sqrt{\ensuremath{\mathtt{n}}}$ ، فإنَّ مبدأ الجرس (pigeonhole principle) يفرض أنَّ إحدى الكتل يجب أن يكون حجمها لا يقل عن $ \ensuremath{\mathtt{n}}/\ensuremath{\mathtt{r}} > \sqrt{\ensuremath{\mathtt{n}}}$ . فلنفكر في اللحظة التي خُصِّصت فيها هذه الكتلة لأول مرة. فمباشرة بعد تخصيصها كانت هذه الكتلة فارغة، وبالتالي كانت تهدري مساحة قدرها $ \sqrt{\ensuremath{\mathtt{n}}}$ . وعليه، فإنَّ بنية البيانات في لحظة ما أثناء إدراج $ \mathtt{n}$ عنصرًا كانت تهدري مساحة قدرها $ \sqrt{\ensuremath{\mathtt{n}}}$ . 2.6.3 الملخَّص تلخِّص المبرهنة التالية مناقشتنا لبنية بيانات RootishArrayStack: **المبرهنة 2..5** *يطبِّق RootishArrayStack واجهة القائمة (List). ومع تجاهل تكلفة الاستدعاءات لـ $ \mathtt{grow()}$ و$ \mathtt{shrink()}$ ، يدعم RootishArrayStack العمليتين * $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ في $ O(1)$ لكل عملية؛ وعمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في $ O(1+\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$ لكل عملية. * وعلاوة على ذلك، فإنَّ البدء من RootishArrayStack فارغ وتنفيذ أي تسلسل من $ m$ عملية من $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ينتج عن ذلك كليًا $ O(m)$ من الزمن المستغرق في جميع استدعاءات $ \mathtt{grow()}$ و$ \mathtt{shrink()}$ .* *والمساحة (مقاسة بالكلمات)2.3 التي يستخدمها RootishArrayStack الذي يخزِّن $ \mathtt{n}$ عنصرًا هي $ \ensuremath{\mathtt{n}} +O(\sqrt{\ensuremath{\mathtt{n}}})$ .*

2.6.4 حساب الجذور التربيعية قد يلاحظ القارئ الذي لديه بعض الاطلاع على نماذج الحساب أنَّ RootishArrayStack، على النحو الموصوف أعلاه، لا يندرج ضمن نموذج word-RAM المعتاد للحساب (القسم 1.4) لأنه يتطلب أخذ جذور تربيعية. ولا تُعدّ عملية الجذر التربيعي في العادة عمليةً أساسية، ولذلك لا تكون عادةً جزءًا من نموذج word-RAM. وفي هذا القسم، نبيِّن أنَّ عملية الجذر التربيعي يمكن تنفيذها بكفاءة. وعلى وجه التحديد، نبيِّن أنَّه لأي عدد صحيح $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}\}$ ، يمكن حساب $ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$ بزمن ثابت، بعد عملية معالجة أولية (preprocessing) من $ O(\sqrt{\ensuremath{\mathtt{n}}})$ تُنشئ مصفوفتين طول كلٍّ منهما $ O(\sqrt{\ensuremath{\mathtt{n}}})$ . وتبيِّن المُلمَّة التالية أنَّنا يمكننا اختزال مسألة حساب الجذر التربيعي لـ $ \mathtt{x}$ إلى حساب الجذر التربيعي لقيمة مرتبطة $ \mathtt{x'}$ . **المُلمَّة 2..3** *ليكن $ \ensuremath{\mathtt{x}}\ge 1$ وليكن $ \ensuremath{\mathtt{x'}}=\ensuremath{\mathtt{x}}-a$ ، حيث $ 0\le a\le\sqrt{\ensuremath{\mathtt{x}}}$ . عندئذٍ $ \sqrt{x'} \ge \sqrt{\ensuremath{\mathtt{x}}}-1$ .*

*البرهان*. يكفي أن نبيِّن أنَّ

![$\displaystyle \sqrt{\ensuremath{\mathtt{x}}-\sqrt{\ensuremath{\mathtt{x}}}} \ge \sqrt{\ensuremath{\mathtt{x}}}-1 \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1026.png.webp)

بربيع طرفي هذه المتباينة نحصل على

![$\displaystyle \ensuremath{\mathtt{x}}-\sqrt{\ensuremath{\mathtt{x}}} \ge \ensuremath{\mathtt{x}}-2\sqrt{\ensuremath{\mathtt{x}}}+1 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1027.png.webp)

وجمع الحدود نحصل على

![$\displaystyle \sqrt{\ensuremath{\mathtt{x}}} \ge 1 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1028.png.webp)

وهو واضح تمامًا لأي $ \ensuremath{\mathtt{x}}\ge 1$ . ![$ \qedsymbol$](/images/open-data-structures/2_6_RootishArrayStack_Space-img1025.png.webp)

لنبدأ بتقييد المسألة قليلًا، ونفترض أنَّ $ 2^{\ensuremath{\mathtt{r}}} \le \ensuremath{\mathtt{x}} < 2^{\ensuremath{\mathtt{r}}+1}$ ، بحيث يكون $ \lfloor\log \ensuremath{\mathtt{x}}\rfloor=\ensuremath{\mathtt{r}}$ ، أي أنَّ $ \mathtt{x}$ عدد صحيح له $ \ensuremath{\mathtt{r}}+1$ بت في تمثيله الثنائي. ويمكننا أن نأخذ $ \ensuremath{\mathtt{x'}}=\ensuremath{\mathtt{x}} - (\ensuremath{\mathtt{x}}\bmod 2^{\lfloor r/2\rfloor})$ . والآن، يستوفي $ \mathtt{x'}$ شروط المُلمَّة 2.3، لذا $ \sqrt{\ensuremath{\mathtt{x}}}-\sqrt{\ensuremath{\mathtt{x'}}} \le 1$ . وعلاوة على ذلك، فإنَّ جميع بتات $ \mathtt{x'}$ ذات الرتبة الدنيا $ \lfloor \ensuremath{\mathtt{r}}/2\rfloor$ تساوي 0، لذا لا توجد سوى

![$\displaystyle 2^{\ensuremath{\mathtt{r}}+1-\lfloor \ensuremath{\mathtt{r}}/2\rfloor} \le 4\cdot2^{\ensuremath{\mathtt{r}}/2} \le 4\sqrt{\ensuremath{\mathtt{x}}} $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1039.png.webp)

قيمة ممكنة لـ $ \mathtt{x'}$ . وهذا يعني أننا يمكننا استخدام مصفوفة $ \mathtt{sqrttab}$ تخزِّن قيمة $ \lfloor\sqrt{\ensuremath{\mathtt{x'}}}\rfloor$ لكل قيمة ممكنة لـ $ \mathtt{x'}$ . وبشكل أدق قليلًا، لدينا

![$\displaystyle \ensuremath{\mathtt{sqrttab}}[i] = \left\lfloor \sqrt{i 2^{\lfloor \ensuremath{\mathtt{r}}/2\rfloor}} \right\rfloor \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1044.png.webp)

وبهذه الطريقة، يكون $ \ensuremath{\mathtt{sqrttab}}[i]$ ضمن مسافة 2 من $ \sqrt{\ensuremath{\mathtt{x}}}$ لكل $ \ensuremath{\mathtt{x}}\in\{i2^{\lfloor r/2\rfloor},\ldots,(i+1)2^{\lfloor r/2\rfloor}-1\}$ . وبعبارة أخرى، إمَّا أن يساوي مدخل المصفوفة $ \ensuremath{\mathtt{s}}=\ensuremath{\mathtt{sqrttab}}[\ensuremath{\mathtt{x}}\ensuremath{\mathtt{\text{\ttfamily >>}}}\lfloor \ensuremath{\mathtt{r}}/2\rfloor]$ القيمة $ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$ أو $ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor-1$ أو $ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor-2$ . ومن $ \mathtt{s}$ يمكننا تحديد قيمة $ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$ بزيادة $ \mathtt{s}$ حتى تتحقَّق $ (\ensuremath{\mathtt{s}}+1)^2 > \ensuremath{\mathtt{x}}$ .

```
    int sqrt(int x, int r) {
        int s = sqrtab[x>>r/2];
        while ((s+1)*(s+1) <= x) s++; // executes at most twice
        return s;
    }
```

والآن، فإنَّ هذا لا ينطبق إلا على $ \ensuremath{\mathtt{x}}\in\{2^{\ensuremath{\mathtt{r}}},\ldots,2^{\ensuremath{\mathtt{r}}+1}-1\}$ ، فـ $ \mathtt{sqrttab}$ جدول خاص لا يعمل إلا لقيمة معيَّنة $ \ensuremath{\mathtt{r}}=\lfloor\log \ensuremath{\mathtt{x}}\rfloor$ . وللتغلُّب على ذلك، يمكننا حساب $ \lfloor\log \ensuremath{\mathtt{n}}\rfloor$ من مصفوفات $ \mathtt{sqrttab}$ المختلفة، واحدة لكل قيمة ممكنة لـ $ \lfloor\log \ensuremath{\mathtt{x}}\rfloor$ . وتُشكِّل أحجام هذه الجداول تسلسلًا أُسِّيًّا أكبر قيمته لا يتجاوز $ 4\sqrt{\ensuremath{\mathtt{n}}}$ ، لذا فإنَّ الحجم الكلي لجميع الجداول هو $ O(\sqrt{\ensuremath{\mathtt{n}}})$ .

غير أنَّه يتبيَّن أنَّ مصفوفة واحدة من $ \mathtt{sqrttab}$ تكفي؛ فنحن لا نحتاج سوى مصفوفة $ \mathtt{sqrttab}$ واحدة للقيمة $ \ensuremath{\mathtt{r}}=\lfloor\log \ensuremath{\mathtt{n}}\rfloor$ . وأي قيمة $ \mathtt{x}$ بحيث $ \log\ensuremath{\mathtt{x}}=\ensuremath{\mathtt{r'}}<\ensuremath{\mathtt{r}}$ يمكن «ترقيتها» بضرب $ \mathtt{x}$ في $ 2^{\ensuremath{\mathtt{r}}-\ensuremath{\mathtt{r'}}}$ واستخدام المعادلة

![$\displaystyle \sqrt{2^{\ensuremath{\mathtt{r}}-\ensuremath{\mathtt{r'}}}x} = 2^... ...thtt{r}}-\ensuremath{\mathtt{r}}')/2}\sqrt{\ensuremath{\mathtt{x}}} \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1071.png.webp)

إنَّ الكمية $ 2^{\ensuremath{\mathtt{r}}-\ensuremath{\mathtt{r}}'}x$ تقع في المجال $ \{2^{\ensuremath{\mathtt{r}}},\ldots,2^{\ensuremath{\mathtt{r}}+1}-1\}$ ، لذا يمكننا البحث عن جذرها التربيعي في $ \mathtt{sqrttab}$ . ويَنفِّذ الشيفرة التالية هذه الفكرة لحساب $ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$ لكل الأعداد الصحيحة غير السالبة $ \mathtt{x}$ في المجال $ \{0,\ldots,2^{30}-1\}$ باستخدام مصفوفة $ \mathtt{sqrttab}$ بحجم $ 2^{16}$ .

```
    int sqrt(int x) {
        int rp = log(x);
        int upgrade = ((r-rp)/2) * 2;
        int xp = x << upgrade;  // xp has r or r-1 bits
        int s = sqrtab[xp>>(r/2)] >> (upgrade/2);
        while ((s+1)*(s+1) <= x) s++;  // executes at most twice
        return s;
    }
```

حتى الآن افترضنا دون مناقشة مسألة كيفية حساب $ \ensuremath{\mathtt{r}}'=\lfloor\log\ensuremath{\mathtt{x}}\rfloor$ . وهذه أيضًا مسألة يمكن حلُّها باستخدام مصفوفة $ \mathtt{logtab}$ بحجم $ 2^{\ensuremath{\mathtt{r}}/2}$ . وفي هذه الحالة تكون الشيفرة بسيطةً بصفة خاصة، لأنَّ $ \lfloor\log \ensuremath{\mathtt{x}}\rfloor$ هو ببساطة فهرس البت 1 الأكثر أهمية في التمثيل الثنائي لـ $ \mathtt{x}$ . وهذا يعني أنَّه بالنسبة إلى $ \ensuremath{\mathtt{x}}>2^{\ensuremath{\mathtt{r}}/2}$ ، يمكننا إزاحة بتات $ \mathtt{x}$ إلى اليمين بمقدار $ \ensuremath{\mathtt{r}}/2$ موضعًا قبل استخدامها كفهرس في $ \mathtt{logtab}$ . ويَنفِّذ الشيفرة التالية ذلك باستخدام مصفوفة $ \mathtt{logtab}$ بحجم $ 2^{16}$ لحساب $ \lfloor\log \ensuremath{\mathtt{x}}\rfloor$ لكل $ \mathtt{x}$ في المجال $ \{1,\ldots,2^{32}-1\}$ .

```
    int log(int x) {
        if (x >= halfint)
            return 16 + logtab[x>>>16];
        return logtab[x];
    }
```

أخيرًا، ومن أجل الاكتمال، نُدرج الشيفرة التالية التي تُهيِّئ $ \mathtt{logtab}$ و$ \mathtt{sqrttab}$ :

```
    void inittabs() {
        sqrtab = new int[1<<(r/2)];
        logtab = new int[1<<(r/2)];
        for (int d = 0; d < r/2; d++) 
            Arrays.fill(logtab, 1<<d, 2<<d, d);
        int s = 1<<(r/4);                    // sqrt(2^(r/2))
        for (int i = 0; i < 1<<(r/2); i++) {
            if ((s+1)*(s+1) <= i << (r/2)) s++; // sqrt increases
            sqrtab[i] = s;
        }
    }
```

وخلاصةً، يمكن تنفيذ الحسابات التي تجريها الدالة $ \mathtt{i2b(i)}$ بزمن ثابت على word-RAM باستخدام ذاكرة إضافية قدرها $ O(\sqrt{n})$ لتخزين مصفوفتي $ \mathtt{sqrttab}$ و$ \mathtt{logtab}$ . ويمكن إعادة بناء هاتين المصفوفتين عندما يزداد $ \mathtt{n}$ أو ينقص بمعامل اثنين، ويمكن توزيع تكلفة إعادة البناء على عدد عمليات $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ التي سبَّبت التغيُّر في $ \mathtt{n}$ بالطريقة نفسها التي حُلِّل بها تكلفة $ \mathtt{resize()}$ في تنفيذ ArrayStack.

#### الحواشي

... words)2.3 راجع القسم 1.4 لمناقشة كيفية قياس الذاكرة. [opendatastructures.org](http://opendatastructures.org/)

## 2.7 مناقشة وتمارين

معظم بنى البيانات الموصوفة في هذا الفصل تراثية (folklore)، إذ يمكن العثور عليها في تنفيذات ترجع إلى أكثر من 30 عامًا. فمثلًا، يناقش Knuth [46, القسم 2.2.2] تنفيذات للمكدَّسات والطوابير deques (صفوف مزدوجة الطرفين)، التي تتعمَّم بسهولة إلى البنى ArrayStack وArrayQueue وArrayDeque الموصوفة هنا. ويبدو أنَّ Brodnik وآخرون [13] كانوا الأوائل في وصف RootishArrayStack وإثبات حدٍّ أدنى من الشكل $ \sqrt{n}$ مثل ذاك في القسم 2.6.2. وهم أيضًا يقدِّمون بنية مختلفة تستخدم اختيارًا أكثر تعقيدًا لأحجام الكتل من أجل تجنُّب حساب الجذور التربيعية في الدالة $ \mathtt{i2b(i)}$ . وفي مخطَّطهم، تكون الكتلة التي تحتوي $ \mathtt{i}$ هي الكتلة $ \lfloor\log (\ensuremath{\mathtt{i}}+1)\rfloor$ ، وهو ببساطة فهرس البت 1 الأبرز في التمثيل الثنائي لـ $ \ensuremath{\mathtt{i}}+1$ . وتوفِّر بعض معماريات الحاسوب تعليمةً لحساب فهرس البت 1 الأبرز في عدد صحيح. وفي Java، توفِّر الفئة Integer الدالة $ \mathtt{numberOfLeadingZeros(i)}$ التي يمكن منها بسهولة حساب $ \lfloor\log (\ensuremath{\mathtt{i}}+1)\rfloor$ . أما البنية المرتبطة بـ RootishArrayStack فهي المتجه المُطبَّق على مستويين (two-level tiered vector) لـ Goodrich وKloss [35]. تدعم هذه البنية عمليتَي $ \mathtt{get(i,x)}$ و$ \mathtt{set(i,x)}$ بزمن ثابت، وعمليتَي $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في $ O(\sqrt{\ensuremath{\mathtt{n}}})$ من الوقت. وهذه أزمنة التنفيذ مشابهة لما يمكن بلوغه مع التنفيذ الأدق لـ RootishArrayStack المناقش في التمرين 2.11. **التمرين 2..1** في تنفيذ ArrayStack، بعد أول استدعاء لـ $ \mathtt{remove(i)}$ ، تحتوي المصفوفة الخلفية $ \mathtt{a}$ على $ \ensuremath{\mathtt{n}}+1$ قيمة غير $ \mathtt{null}$ على الرغم من أنَّ ArrayStack يحتوي على $ \mathtt{n}$ عنصرًا فقط. فأين القيمة غير $ \mathtt{null}$ الزائدة؟ ناقش أي عواقب قد تُحدثها هذه القيمة غير $ \mathtt{null}$ في مدير الذاكرة الخاص ببيئة تشغيل Java.

**التمرين 2..2** تُدرج الدالة $ \mathtt{addAll(i,c)}$ في القائمة (List) جميع عناصر المجموعة (Collection) $ \mathtt{c}$ عند الموضع $ \mathtt{i}$ . (و $ \mathtt{add(i,x)}$ هي حالة خاصة حيث $ \ensuremath{\mathtt{c}}=\{\ensuremath{\mathtt{x}}\}$ .) اشرح لماذا، بالنسبة إلى بنى البيانات في هذا الفصل، لا يكون تنفيذ $ \mathtt{addAll(i,c)}$ عبر استدعاءات متكررة لـ $ \mathtt{add(i,x)}$ كفؤًا. صمِّم ونفِّذ تنفيذًا أكثر كفؤة.

**التمرين 2..3** صمِّم ونفِّذ RandomQueue. وهذا تنفيذ لواجهة الطابور (Queue) تُزيل فيه عملية $ \mathtt{remove()}$ عنصرًا يُختار عشوائيًا بانتظام من بين جميع العناصر الموجودة حاليًا في الطابور. (تخيَّل RandomQueue ككيسٍ يمكننا أن نضيف إليه عناصر أو نمدَّ أيدينا داخله ونُزيل عشوائيًا بعض العناصر دون رؤية.) وينبغي أن تعمل عمليتا $ \mathtt{add(x)}$ و$ \mathtt{remove()}$ في RandomQueue بزمن ثابت لكل عملية.

**التمرين 2..4** صمِّم ونفِّذ Treque (طابورًا ثلاثي الأطراف). وهذا تنفيذ للقائمة (List) تعمل فيه $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ بزمن ثابت وتعمل $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في زمن

![$\displaystyle O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensur... ...}}, \vert\ensuremath{\mathtt{n}}/2-\ensuremath{\mathtt{i}}\vert\}) \enspace . $](/images/open-data-structures/2_7_Discussion_Exercises-img1138.png.webp)

بعبارة أخرى، تكون التعديلات سريعة إذا كانت قريبة من أيٍّ من الطرفين أو قريبة من منتصف القائمة.

**التمرين 2..5** نفِّذ دالة $ \mathtt{rotate(a,r)}$ «تدوِّر» (rotate) المصفوفة $ \mathtt{a}$ بحيث ينتقل $ \mathtt{a[i]}$ إلى $ \ensuremath{\mathtt{a}}[(\ensuremath{\mathtt{i}}+\ensuremath{\mathtt{r}})\bmod \ensuremath{\mathtt{a.length}}]$ ، لكل $ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{a.length}}\}$ .

**التمرين 2..6** نفِّذ دالة $ \mathtt{rotate(r)}$ «تدوِّر» قائمةً (List) بحيث يصبح عنصر القائمة $ \mathtt{i}$ هو عنصر القائمة $ (\ensuremath{\mathtt{i}}+\ensuremath{\mathtt{r}})\bmod \ensuremath{\mathtt{n}}$ . وعندما تُنفَّذ على ArrayDeque أو DualArrayDeque، ينبغي أن تعمل $ \mathtt{rotate(r)}$ في $ O(1+\min\{\ensuremath{\mathtt{r}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{r}}\})$ من الوقت.

**التمرين 2..7** عدِّل تنفيذ ArrayDeque بحيث تُنفَّذ الإزاحة التي تجريها $ \mathtt{add(i,x)}$ و $ \mathtt{remove(i)}$ و$ \mathtt{resize()}$ باستخدام الدالة الأسرع $ \mathtt{System.arraycopy(s,i,d,j,n)}$ .

**التمرين 2..8** عدِّل تنفيذ ArrayDeque بحيث لا يستخدم معامل $ \mathtt{\text{\ttfamily\%}}$ (الذي يكون مكلفًا على بعض الأنظمة). وبدلًا من ذلك، ينبغي أن يستفيد من الحقيقة التالية: إذا كان $ \mathtt{a.length}$ قوةً للعدد 2، فإنَّ

![$\displaystyle \ensuremath{\mathtt{k\text{\ttfamily\%}a.length}}=\ensuremath{\mathtt{k\text{\ttfamily\&}(a.length-1)}} \enspace . $](/images/open-data-structures/2_7_Discussion_Exercises-img1155.png.webp)

(هنا، $ \mathtt{\text{\ttfamily\&}}$ هو معامل AND على مستوى البتات (bitwise-and).)

**التمرين 2..9** صمِّم ونفِّذ نوعًا بديلًا من ArrayDeque لا يجري أي حساب ثنائي الباقي على الإطلاق. وبدلًا من ذلك، تجلس جميع البيانات في كتلة متصلة، بالترتيب، داخل مصفوفة. وعندما تتجاوز البيانات بداية هذه المصفوفة أو نهايتها، تُنفَّذ عملية $ \mathtt{rebuild()}$ معدَّلة. وينبغي أن تكون التكلفة المُستهلكة لجميع العمليات مطابقة لتلك في ArrayDeque. تلميح: إنَّ جعل هذا يعمل يتوقف فعليًا على كيفية تنفيذك لعملية $ \mathtt{rebuild()}$ . فأنت تريد أن تضع $ \mathtt{rebuild()}$ بنية البيانات في حالة لا يمكن فيها للبيانات أن تتجاوز أيًّا من الطرفين حتى بعد تنفيذ ما لا يقل عن $ \ensuremath{\mathtt{n}}/2$ عملية. اختبر أداء تنفيذك مقابل ArrayDeque. وحسِّن تنفيذك (باستخدام $ \mathtt{System.arraycopy(a,i,b,i,n)}$ ) وشاهد ما إذا استطعت أن تجعله يتفوق على تنفيذ ArrayDeque.

**التمرين 2..10** صمِّم ونفِّذ نسخة من RootishArrayStack لا تملك سوى $ O(\sqrt{\ensuremath{\mathtt{n}}})$ من المساحة المهدورة، لكنها قادرة على تنفيذ عمليتَي $ \mathtt{add(i,x)}$ و $ \mathtt{remove(i,x)}$ في $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ من الوقت.

**التمرين 2..11** صمِّم ونفِّذ نسخة من RootishArrayStack لا تملك سوى $ O(\sqrt{\ensuremath{\mathtt{n}}})$ من المساحة المهدورة، لكنها قادرة على تنفيذ عمليتَي $ \mathtt{add(i,x)}$ و $ \mathtt{remove(i,x)}$ في $ O(1+\min\{\sqrt{\ensuremath{\mathtt{n}}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ من الوقت. (للاطلاع على فكرة كيفية ذلك، انظر القسم 3.3.)

**التمرين 2..12** صمِّم ونفِّذ نسخة من RootishArrayStack لا تملك سوى $ O(\sqrt{\ensuremath{\mathtt{n}}})$ من المساحة المهدورة، لكنها قادرة على تنفيذ عمليتَي $ \mathtt{add(i,x)}$ و $ \mathtt{remove(i,x)}$ في $ O(1+\min\{\ensuremath{\mathtt{i}},\sqrt {\ensuremath{\mathtt{n}}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ من الوقت. (انظر القسم 3.3 للحصول على أفكار عن كيفية تحقيق ذلك.)

**التمرين 2..13** صمِّم ونفِّذ CubishArrayStack. وهذه البنية ذات المستويات الثلاثة تنفِّذ واجهة القائمة (List) باستخدام $ O(\ensuremath{\mathtt{n}}^{2/3})$ من المساحة المهدورة. وفي هذه البنية، تأخذ $ \mathtt{get(i)}$ و $ \mathtt{set(i,x)}$ وقتًا ثابتًا؛ بينما تأخذ $ \mathtt{add(i,x)}$ و $ \mathtt{remove(i)}$ وقتًا مُستهلكًا قدره $ O(\ensuremath{\mathtt{n}}^{1/3})$ .

[opendatastructures.org](http://opendatastructures.org/)
