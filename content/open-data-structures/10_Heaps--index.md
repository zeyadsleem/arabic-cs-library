---
title: "10. Heaps"
lang: ar
source: https://opendatastructures.org/ods-java/10_Heaps.html
---

يناقش هذا الفصل تنفيذين لبنية بيانات طابور الأولوية (priority Queue) المفيدة إلى حدٍّ بعيد. وكلتا البنيتين هما نوعٌ خاص من الشجرة الثنائية (binary tree) يسمّى الكومة (heap)، أي «كومة غير منظَّمة». ويقابل ذلك أشجار البحث الثنائية (binary search trees) التي يمكن تصوّرها كومةً منظَّمة إلى حدٍّ كبير. أمّا التنفيذ الأول للكومة فيستعمل مصفوفة (array) لمحاكاة شجرة ثنائية كاملة. وهذا التنفيذ شديد السرعة يشكّل أساس أحد أسرع خوارزميات الفرز (sorting) المعروفة، وهي الفرز بالكومة (heapsort) (انظر القسم 11.1.3). أمّا التنفيذ الثاني فيقوم على أشجار ثنائية أكثر مرونة. وهو يدعم عملية $ \mathtt{meld(h)}$ التي تتيح لطابور الأولوية أن يمتصّ عناصر طابور أولوية ثانٍ $ \mathtt{h}$ .

**الأقسام الفرعية**

[موقع opendatastructures.org](http://opendatastructures.org/)

## 10.1 BinaryHeap: شجرة ثنائية ضمنية

**الأقسام الفرعية**

# 10.1 BinaryHeap: شجرة ثنائية ضمنية

يقوم تنفيذنا الأول لطابور (أولوية) على تقنيةٍ عمرها أكثر من أربعمئة عام. تتيح لنا طريقة Eytzinger تمثيل شجرة ثنائية كاملة بوصفها مصفوفة، بترتيب عقد الشجرة في تسلسلٍ بالعرض (breadth-first order) (انظر القسم 6.1.2). وبهذه الطريقة، يُخزَّن الجذر عند الموضع 0، وتُخزَّن الابنة اليسرى للجذر عند الموضع 1، وتُخزَّن الابنة اليمنى للجذر عند الموضع 2، وتُخزَّن ابنة الابنة اليسرى للجذر عند الموضع 3، وهكذا. انظر الشكل 10.1.

وإذا طبّقنا طريقة Eytzinger على شجرةٍ كبيرة بما يكفي، تظهر بعض الأنماط. فالابنة اليسرى للعقدة ذات الفهرس $ \mathtt{i}$ تقع عند الفهرس $ \ensuremath{\mathtt{left(i)}}=2\ensuremath{\mathtt{i}}+1$ ، والابنة اليمنى للعقدة ذات الفهرس $ \mathtt{i}$ تقع عند الفهرس $ \ensuremath{\mathtt{right(i)}}=2\ensuremath{\mathtt{i}}+2$ . أمّا الأمّ (parent) للعقدة ذات الفهرس $ \mathtt{i}$ فتقع عند الفهرس $ \ensuremath{\mathtt{parent(i)}}=(\ensuremath{\mathtt{i}}-1)/2$ .

```
    int left(int i) {
        return 2*i + 1;
    }
    int right(int i) {
        return 2*i + 2;
    }
    int parent(int i) {
        return (i-1)/2;
    }
```

يستخدم BinaryHeap هذه التقنيةَ لتمثيل شجرة ثنائية كاملة ضمنيًّا، تكون فيها العناصر مرتّبة ترتيب كومة (heap-ordered): فالقيمة المخزَّنة عند أي فهرس $ \mathtt{i}$ ليست أصغر من القيمة المخزَّنة عند الفهرس $ \mathtt{parent(i)}$ ، باستثناء قيمة الجذر، $ \ensuremath{\mathtt{i}}=0$ . ويترتّب على ذلك أنّ أصغر قيمة في طابور الأولوية تُخزَّن عند الموضع 0 (الجذر). أمّا في BinaryHeap، فتُخزَّن العناصر الـ $ \mathtt{n}$ في مصفوفة $ \mathtt{a}$ :

```
    T[] a;
    int n;
```

وتنفيذ العملية $ \mathtt{add(x)}$ مباشرٌ إلى حدٍّ كبير. فكما في جميع البنى المعتمدة على المصفوفات، نتحقّق أولًا مما إذا كانت $ \mathtt{a}$ ممتلئة (بالتحقّق مما إذا كان $ \ensuremath{\mathtt{a.length}}=\ensuremath{\mathtt{n}}$ )، وإذا كانت كذلك فإنّنا نُكبِّر $ \mathtt{a}$ . ثمّ نضع $ \mathtt{x}$ عند الموضع $ \mathtt{a[n]}$ ونزيد $ \mathtt{n}$ . وفي هذه المرحلة، لم يبقَ سوى ضمان الحفاظ على خاصية الكومة. ونفعل ذلك بتبديل $ \mathtt{x}$ مع أمّه تكرارًا حتى تصير $ \mathtt{x}$ ليست أصغر من أمّها. انظر الشكل 10.2.

```
    boolean add(T x) {
        if (n + 1 > a.length) resize();
        a[n++] = x;
        bubbleUp(n-1);
        return true;
    }
    void bubbleUp(int i) {
        int p = parent(i);
        while (i > 0 && compare(a[i], a[p]) < 0) {
            swap(i,p);
            i = p;
            p = parent(i);
        }
    }
```

أمّا تنفيذ العملية $ \mathtt{remove()}$ ، التي تزيل أصغر قيمة من الكومة، فهو أعقد قليلًا. فنحن نعرف أين تقع أصغر قيمة (عند الجذر)، لكنّنا بحاجة إلى استبدالها بعد إزالتها والحرص على الحفاظ على خاصية الكومة. وأيسر طريقة للقيام بذلك هي استبدال الجذر بالقيمة $ \mathtt{a[n-1]}$ ، ثمّ حذف تلك القيمة، وإنقاص $ \mathtt{n}$ . للأسف، فإنّ عنصر الجذر الجديد على الأرجح ليس أصغر عنصر، لذا يلزم نقله إلى الأسفل. ونفعل ذلك بمقارنة هذا العنصر بابنتيه تكرارًا. فإن كان أصغر الثلاثة فقد انتهينا. وإلّا فبدّلنا هذا العنصر مع أصغر ابنتيه وتابعنا.

```
    T remove() {
        T x = a[0];
        a[0] = a[--n];
        trickleDown(0);
        if (3*n < a.length) resize();
        return x;
    }
    void trickleDown(int i) {
        do {
            int j = -1;
            int r = right(i);
            if (r < n && compare(a[r], a[i]) < 0) {
                int l = left(i);
                if (compare(a[l], a[r]) < 0) {
                    j = l;
                } else {
                    j = r;
                }
            } else {
                int l = left(i);
                if (l < n && compare(a[l], a[i]) < 0) {
                    j = l;
                }
            }
            if (j >= 0)    swap(i, j);
            i = j;
        } while (i >= 0);
    }
```

**الشكل 10.3:** إزالة أصغر قيمة، وهي 4، من BinaryHeap. ![\includegraphics[height=.25\textheight ]{figs/heap-remove-1}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3867.png.webp) ![\includegraphics[height=.25\textheight ]{figs/heap-remove-2}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3868.png.webp) ![\includegraphics[height=.25\textheight ]{figs/heap-remove-3}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3869.png.webp) ![\includegraphics[height=.25\textheight ]{figs/heap-remove-4}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3870.png.webp) ومثل سائر البنى المعتمدة على المصفوفات، سنتجاهل الزمن الذي يُنفق في استدعاءات $ \mathtt{resize()}$ ، إذ يمكن تبريره بحجّة التطفئة (amortization) الواردة في الملمة 2.1. ويفترق زمنا تشغيل $ \mathtt{add(x)}$ و $ \mathtt{remove()}$ على ارتفاع الشجرة الثنائية (الضمنية). ومن حسن الحظ أنّ هذه شجرة ثنائية كاملة؛ فكل مستوى سوى الأخير فيه أكبر عدد ممكن من العقد. وعليه، إذا كان ارتفاع هذه الشجرة $ h$ ، فإنّ فيها ما لا يقلّ عن $ 2^h$ عقدة. وبعبارة أخرى

![$\displaystyle \ensuremath{\mathtt{n}} \ge 2^h \enspace . $](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3876.png.webp)

وأخذ لوغاريتمات طرفي هذه المعادلة يعطي

![$\displaystyle h \le \log \ensuremath{\mathtt{n}} \enspace . $](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3877.png.webp)

وعليه، فإنّ عمليتَي $ \mathtt{add(x)}$ و $ \mathtt{remove()}$ تعملان في زمن $ O(\log \ensuremath{\mathtt{n}})$ .

10.1.1 الخلاصة تلخّص المبرهنة التالية أداء بنية البيانات BinaryHeap: **المبرهنة 10..1** *يطبّق BinaryHeap واجهة طابور (الأولوية). وتجاهلًا تكلفة استدعاءات $ \mathtt{resize()}$ ، يدعم BinaryHeap العمليتين $ \mathtt{add(x)}$ و $ \mathtt{remove()}$ في زمن $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية. * *وفضلا عن ذلك، إذا بدأنا من BinaryHeap فارغ، فإنّ أي تسلسلٍ من $ m$ عملية $ \mathtt{add(x)}$ و $ \mathtt{remove()}$ يؤدّي إلى زمنٍ كلّي قدره $ O(m)$ مُنفق في جميع استدعاءات $ \mathtt{resize()}$ .*

[موقع opendatastructures.org](http://opendatastructures.org/)

## 10.2 MeldableHeap: كومة قابلة للدمج عشوائية

**الأقسام الفرعية**

# 10.2 MeldableHeap: كومة قابلة للدمج عشوائية

نصف في هذا القسم بنية البيانات MeldableHeap، وهي تنفيذٌ لطابور الأولوية تكون فيه البنية الأساسية أيضًا شجرة ثنائية مرتّبة ترتيب كومة (heap-ordered). غير أنّه، بخلاف BinaryHeap الذي تُحدَّد فيه الشجرة الثنائية الأساسية تمامًا بعدد العناصر، لا توجد قيودٍ على شكل الشجرة الثنائية التي تقوم عليها بنية MeldableHeap؛ فأيّ شكلٍ يصاح. أمّا العمليتان $ \mathtt{add(x)}$ و $ \mathtt{remove()}$ في MeldableHeap فتُنفَّذان بدلالة العملية $ \mathtt{merge(h1,h2)}$ . تأخذ هذه العملية عقدتَي كومة $ \mathtt{h1}$ و $ \mathtt{h2}$ وتدمجهما، وتُرجع عقدة كومةٍ تكون جذر كومةٍ تحتوي جميع العناصر في الشجرة الفرعية المجذَّرة عند $ \mathtt{h1}$ وجميع العناصر في الشجرة الفرعية المجذَّرة عند $ \mathtt{h2}$ . ومن مزايا العملية $ \mathtt{merge(h1,h2)}$ أنّه يمكن تعريفها على نحو تعاودي (recursive). انظر الشكل 10.4. فإذا كانت $ \mathtt{h1}$ أو $ \mathtt{h2}$ على القيمة $ \mathtt{nil}$ ، فإنّنا ندمج مع مجموعةٍ فارغة، فنُرجع $ \mathtt{h2}$ أو $ \mathtt{h1}$ على التوالي. وإلّا، فافترض $ \ensuremath{\mathtt{h1.x}} \le \ensuremath{\mathtt{h2.x}}$ ، إذ إنّنا لو كان $ \ensuremath{\mathtt{h1.x}} > \ensuremath{\mathtt{h2.x}}$ لاستطعنا تبديل دورَي $ \mathtt{h1}$ و $ \mathtt{h2}$ . وعندئذٍ نعرف أنّ جذر الكومة المدموجة سيحتوي $ \mathtt{h1.x}$ ، ويمكننا أن ندمج تعاوديًا $ \mathtt{h2}$ مع $ \mathtt{h1.left}$ أو $ \mathtt{h1.right}$ ، كيفما شئنا. وهنا يأتي دور العشوائية (randomization): فنقذف عملة (coin) لتقرّر ما إذا كنّا سندمج $ \mathtt{h2}$ مع $ \mathtt{h1.left}$ أم مع $ \mathtt{h1.right}$ :

```
    Node<T> merge(Node<T> h1, Node<T> h2) {
        if (h1 == nil) return h2;
        if (h2 == nil) return h1;
        if (compare(h2.x, h1.x) < 0) return merge(h2, h1);
        // now we know h1.x <= h2.x
        if (rand.nextBoolean()) {
            h1.left = merge(h1.left, h2);
            h1.left.parent = h1;
        } else {
            h1.right = merge(h1.right, h2);
            h1.right.parent = h1;
        }
        return h1;
    }
```

نبيّن في القسم التالي أنّ $ \mathtt{merge(h1,h2)}$ تعمل في زمنٍ متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ ، حيث $ \mathtt{n}$ هو العدد الإجمالي للعناصر في $ \mathtt{h1}$ و $ \mathtt{h2}$ . ومع توفّر العملية $ \mathtt{merge(h1,h2)}$ تصير العملية $ \mathtt{add(x)}$ سهلة. فننشئ عقدةً جديدة $ \mathtt{u}$ تحتوي $ \mathtt{x}$ ثمّ ندمج $ \mathtt{u}$ مع جذر كومتنا:

```
    boolean add(T x) {
        Node<T> u = newNode();
        u.x = x;
        r = merge(u, r);
        r.parent = nil;
        n++;
        return true;
    }
```

وهذا يستغرق زمنًا متوقَّعًا قدره $ O(\log (\ensuremath{\mathtt{n}}+1)) = O(\log \ensuremath{\mathtt{n}})$ . والعملية $ \mathtt{remove()}$ سهلةٌ على نحو مماثل. فالعقدة التي نريد إزالتها هي الجذر، لذا ندمج ابنتيها فحسب ونجعل الناتج هو الجذر:

```
    T remove() {
        T x = r.x;
        r = merge(r.left, r.right);
        if (r != nil) r.parent = nil;
        n--;
        return x;
    }
```

ومرّةً أخرى، يستغرق هذا زمنًا متوقَّعًا قدره $ O(\log \ensuremath{\mathtt{n}})$ .

وفضلا عن ذلك، يمكن لـ MeldableHeap تنفيذ عملياتٍ كثيرة أخرى في زمنٍ متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ ، من بينها: $ \mathtt{remove(u)}$ : إزالة العقدة $ \mathtt{u}$ (ومفتاحها $ \mathtt{u.x}$ ) من الكومة. $ \mathtt{absorb(h)}$ : إضافة جميع عناصر بنية MeldableHeap $ \mathtt{h}$ إلى هذه الكومة، وإفراغ $ \mathtt{h}$ في أثناء ذلك. ويمكن تنفيذ كلٍّ من هاتين العمليتين باستعمال عددٍ ثابت من عمليات $ \mathtt{merge(h1,h2)}$ ، كلٌّ منها يستغرق زمنًا متوقَّعًا قدره $ O(\log \ensuremath{\mathtt{n}})$ . 10.2.1 تحليل $ \mathtt{merge(h1,h2)}$ يستند تحليل $ \mathtt{merge(h1,h2)}$ إلى تحليل مسيرٍ عشوائي (random walk) في شجرة ثنائية. يبدأ المسير العشوائي في شجرة ثنائية من جذر الشجرة. وفي كل خطوةٍ من خطواته، تُقذف عملة، وبحسب نتيجة هذه الرمية يتقدّم المسير إلى الابنة اليسرى أو إلى الابنة اليمنى للعقدة الحالية. وينتهي المسير حين يسقط خارج الشجرة (تصير العقدة الحالية على القيمة $ \mathtt{nil}$ ). والملمة التالية لافتةٌ إلى حدٍّ ما لأنّها لا تعتمد إطلاقًا على شكل الشجرة الثنائية: **الملمة 10..1** *الطول المتوقَّع لمسيرٍ عشوائي في شجرة ثنائية فيها $ \mathtt{n}$ عقدة هو على الأكثر $ \mathtt{\log (n+1)}$ .*

*البرهان*. يتم البرهان بالاستدلال على $ \mathtt{n}$ . وفي الحالة الأساس، $ \ensuremath{\mathtt{n}}=0$ ويكون طول المسير $ 0=\log (\ensuremath{\mathtt{n}}+1)$ . ولنفترض الآن أنّ النتيجة صحيحة لكل الأعداد الصحيحة غير السالبة $ \ensuremath{\mathtt{n}}'< \ensuremath{\mathtt{n}}$ .

ولنجعل $ \ensuremath{\mathtt{n}}_1$ يدلّ على حجم الشجرة الفرعية اليسرى للجذر، بحيث يكون $ \ensuremath{\mathtt{n}}_2=\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{n}}_1-1$ حجم الشجرة الفرعية اليمنى للجذر. ومنطلقًا من الجذر، يأخذ المسير خطوةً واحدة ثمّ يتابع داخل شجرةٍ فرعية حجمها $ \ensuremath{\mathtt{n}}_1$ أو $ \ensuremath{\mathtt{n}}_2$ . وبموجب فرضية الاستدلال لدينا، يكون الطول المتوقَّع للمسير حينئذٍ

![$\displaystyle \mathrm{E}[W] = 1 + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_1+1) + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_2+1) \enspace , $](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3956.png.webp)

إذ إنّ كلٍّ من $ \ensuremath{\mathtt{n}}_1$ و $ \ensuremath{\mathtt{n}}_2$ أصغر من $ \ensuremath{\mathtt{n}}$ . وبما أنّ $ \log$ دالةً محدَّبة (concave)، فإنّ $ \mathrm{E}[W]$ يبلغ قيمته العظمى عندما $ \ensuremath{\mathtt{n}}_1=\ensuremath{\mathtt{n}}_2=(\ensuremath{\mathtt{n}}-1)/2$ . وعليه، فإنّ عدد الخطوات المتوقَّع الذي يأخذه المسير العشوائي هو

| $\displaystyle \mathrm{E}[W]$ | $\displaystyle = 1 + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_1+1) + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_2+1)$ |  |
| --- | --- | --- |
|  | $\displaystyle \le 1 + \log ((\ensuremath{\mathtt{n}}-1)/2+1)$ |  |
|  | $\displaystyle = 1 + \log ((\ensuremath{\mathtt{n}}+1)/2)$ |  |
|  | $\displaystyle = \log (\ensuremath{\mathtt{n}}+1) \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3947.png.webp)

ونستطرد استطرادًا قصيرًا لنلاحظ أنّه يمكن، لكل قارئٍ يعرف بعض نظرية المعلومات (information theory)، صياغة برهان الملمة 10.1 بدلالةِ إنتروبيا (entropy).

*البرهان*. [البرهان بالمعلوماتية للملمة 10.1] وليدلّ $ d_i$ على عمق العقدة الخارجية رقم $ i$ ، ولنتذكّر أنّ الشجرة الثنائية التي فيها $ \mathtt{n}$ عقدةً تضمّ $ \mathtt{n+1}$ عقدةً خارجية. واحتمال أن يبلغ المسير العشوائي العقدة الخارجية رقم $ i$ هو بالضبط $ p_i=1/2^{d_i}$ ، ومن ثمّ يُعطى الطول المتوقَّع للمسير العشوائي بالمعادلة

![$\displaystyle H=\sum_{i=0}^{\ensuremath{\mathtt{n}}} p_id_i =\sum_{i=0}^{\ensu... ...og\left(2^{d_i}\right) = \sum_{i=0}^{\ensuremath{\mathtt{n}}}p_i\log({1/p_i}) $](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3975.png.webp)

أمّا الطرف الأيمن من هذه المعادلة فيُعرف بسهولة على أنّه إنتروبيا (entropy) لتوزيعٍ احتمالي على $ \ensuremath{\mathtt{n}}+1$ عنصرًا. ومن الحقائق الأساسية حول إنتروبيا توزيعٍ على $ \ensuremath{\mathtt{n}}+1$ عنصرًا أنّها لا تتجاوز $ \log(\ensuremath{\mathtt{n}}+1)$ ، ممّا يُثبت الملمة. ![$ \qedsymbol$](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3968.png.webp)

ومع هذه النتيجة عن المسيرات العشوائية، يمكننا الآن بسهولة إثبات أنّ زمن تشغيل العملية $ \mathtt{merge(h1,h2)}$ هو $ O(\log \ensuremath{\mathtt{n}})$ . **الملمة 10..2** *إذا كانت $ \mathtt{h1}$ و $ \mathtt{h2}$ جذرَي كومتين تضمّان $ \ensuremath{\mathtt{n}}_1$ و $ \ensuremath{\mathtt{n}}_2$ عقدةً على التوالي، فإنّ زمن التشغيل المتوقَّع للعملية $ \mathtt{merge(h1,h2)}$ هو على الأكثر $ O(\log \ensuremath{\mathtt{n}})$ ، حيث $ \ensuremath{\mathtt{n}}=\ensuremath{\mathtt{n}}_1+\ensuremath{\mathtt{n}}_2$ .*

*البرهان*. تأخذ كل خطوةٍ من خطوات خوارزمية الدمج خطوةً واحدة من مسيرٍ عشوائي، إمّا في الكومة المجذَّرة عند $ \mathtt{h1}$ وإمّا في الكومة المجذَّرة عند $ \mathtt{h2}$ . وتنتهي الخوارزمية عندما يسقط أحد هذين المسيرين العشوائيين خارج شجرته المقابلة (عندما $ \ensuremath{\mathtt{h1}}=\ensuremath{\mathtt{null}}$ أو $ \ensuremath{\mathtt{h2}}=\ensuremath{\mathtt{null}}$ ). وعليه، فإنّ عدد الخطوات المتوقَّع الذي تنفّذه خوارزمية الدمج هو على الأكثر

![$\displaystyle \log (\ensuremath{\mathtt{n}}_1+1) + \log (\ensuremath{\mathtt{n}}_2+1) \le 2\log \ensuremath{\mathtt{n}} \enspace . \qedhere $](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3993.png.webp)

![$ \qedsymbol$](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3988.png.webp)

10.2.2 الخلاصة تلخّص المبرهنة التالية أداء بنية البيانات MeldableHeap: **المبرهنة 10..2** *يطبّق MeldableHeap واجهة طابور (الأولوية). ويدعم MeldableHeap العمليتين $ \mathtt{add(x)}$ و $ \mathtt{remove()}$ في زمنٍ متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية.*

[موقع opendatastructures.org](http://opendatastructures.org/)

## 10.3 مناقشة والتمارين

يبدو أنّ التمثيل الضمني للشجرة الثنائية الكاملة بوصفه مصفوفةً (أو قائمةً) أوّل ما اقترحه Eytzinger [27]. وقد استعمل هذا التمثيل في كتبٍ تحتوي على أشجار نسبية (pedigree) للعائلات النبيلة. وأما بنية البيانات BinaryHeap الموصوفة هنا فقد أدخلها أوّلًا Williams [78]. ويبدو أنّ بنية البيانات العشوائية MeldableHeap الموصوفة هنا أوّل ما اقترحها Gambin وMalinowski [34]. وهناك تنفيذاتٌ أخرى للكومات القابلة للدمج (meldable heaps)، منها الكومات اليسارية (leftist heaps) [16,48, القسم 5.3.2]، والكومات الثنائية (binomial heaps) [75]، وكومات فيبوناتشي (Fibonacci heaps) [30]، وكومات الأزواج (pairing heaps) [29]، والكومات المائلة (skew heaps) [72]، وإنّما لم يكن أيٌّ منها بسيطًا بقدر بنية MeldableHeap. وتدعم بعض البنى المذكورة أعلاه أيضًا عملية $ \mathtt{decreaseKey(u,y)}$ التي تُنقص فيها القيمة المخزَّنة عند العقدة $ \mathtt{u}$ إلى $ \mathtt{y}$ . (ويُشترط سلفًا أن يكون $ \ensuremath{\mathtt{y}}\le\ensuremath{\mathtt{u.x}}$ .) وفي معظم البنى السابقة، يمكن دعم هذه العملية في زمن $ O(\log \ensuremath{\mathtt{n}})$ بإزالة العقدة $ \mathtt{u}$ وإضافة $ \mathtt{y}$ . غير أنّ بعض هذه البنى يمكنها تنفيذ $ \mathtt{decreaseKey(u,y)}$ بكفاءةٍ أعلى. وتحديدًا، تستغرق $ \mathtt{decreaseKey(u,y)}$ زمنًا مُطفَّأ (amortized) قدره $ O(1)$ في كومات فيبوناتشي، وزمنًا مُطفَّأ قدره $ O(\log\log \ensuremath{\mathtt{n}})$ في نسخةٍ خاصة من كومات الأزواج [25]. ولهذه العملية الأكفأ $ \mathtt{decreaseKey(u,y)}$ تطبيقاتٌ في تسريع عدة خوارزميات رسمٍ بياني (graph)، ومنها خوارزمية أقصر مسار في Dijkstra [30]. **التمرين 10..1** بيّن إضافة القيمة 7 ثمّ القيمة 3 إلى BinaryHeap المبيَّن في نهاية الشكل 10.2.

**التمرين 10..2** بيّن إزالة القيّمين التاليين (6 و8) من BinaryHeap المبيَّن في نهاية الشكل 10.3.

**التمرين 10..3** نفّذ الطريقة $ \mathtt{remove(i)}$ التي تزيل القيمة المخزَّنة في $ \mathtt{a[i]}$ في BinaryHeap. وينبغي أن تعمل هذه الطريقة في زمن $ O(\log \ensuremath{\mathtt{n}})$ . ثمّ اشرح لماذا يُرجَّح ألّا تكون هذه الطريقة نافعة.

**التمرين 10..4** الشجرة الـ $ d$ -ary هي تعميمٌ للشجرة الثنائية، بحيث يكون لكل عقدةٍ داخلية $ d$ ابنة. وباستعمال طريقة Eytzinger يمكن أيضًا تمثيل أشجار الـ $ d$ -ary كاملة باستخدام المصفوفات. فاشتقّ المعادلات التي، معطى فهرس $ \mathtt{i}$ ، تحدّد فهرس الأمّ لـ $ \mathtt{i}$ وفهرس كلٍّ من ابنتَي $ \mathtt{i}$ الـ $ d$ في هذا التمثيل.

**التمرين 10..5** بالاعتماد على ما تعلّمته في التمرين 10.4، صمّم ونفّذ بنية DaryHeap، وهي التعميم الـ $ d$ -ary لبنية BinaryHeap. وحلّل أزمنة تشغيل العمليات على DaryHeap، واختبر أداء تنفيذك لـ DaryHeap مقابل تنفيذ BinaryHeap المعطى هنا.

**التمرين 10..6** بيّن إضافة القيمة 17 ثمّ القيمة 82 في MeldableHeap $ \mathtt{h1}$ المبيَّنة في الشكل 10.4. واستعمل عملةً لمحاكاة بتٍ عشوائي عند الحاجة.

**التمرين 10..7** بيّن إزالة القيّمين التاليين (4 و8) في MeldableHeap $ \mathtt{h1}$ المبيَّنة في الشكل 10.4. واستعمل عملةً لمحاكاة بتٍ عشوائي عند الحاجة.

**التمرين 10..8** نفّذ الطريقة $ \mathtt{remove(u)}$ التي تزيل العقدة $ \mathtt{u}$ من MeldableHeap. وينبغي أن تعمل هذه الطريقة في زمنٍ متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ .

**التمرين 10..9** بيّن كيف يمكن العثور على ثاني أصغر قيمة في BinaryHeap أو MeldableHeap في زمنٍ ثابت.

**التمرين 10..10** بيّن كيف يمكن العثور على $ k$ أصغر قيمة في BinaryHeap أو MeldableHeap في زمن $ O(k\log k)$ . (تلميح: قد يفيد استعمال كومة أخرى.)

**التمرين 10..11** افترض أنّ لديك $ \mathtt{k}$ قوائم مرتَّبة، طولها الإجمالي $ \mathtt{n}$ . وباستعمال كومة، بيّن كيف يمكن دمجها في قائمةٍ مرتَّبة واحدة في زمن $ O(n\log k)$ . (تلميح: قد يكون البدء بالحالة $ k=2$ مفيدًا.)

[موقع opendatastructures.org](http://opendatastructures.org/)
