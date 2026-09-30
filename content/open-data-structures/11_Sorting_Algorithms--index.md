---
title: "11. خوارزميات الترتيب"
lang: ar
source: https://opendatastructures.org/ods-java/11_Sorting_Algorithms.html
---

يناقش هذا الفصل الخوارزميات اللازمة لترتيب مجموعة من $$ \mathtt{n}$$ عنصرًا. قد يبدو هذا موضوعًا غريبًا في كتاب عن بنى البيانات، غير أن هناك عدة أسباب وجيهة لإدراجه هنا. وأوضح هذه الأسباب أن خوارزميتين من هذه الخوارزميات (الترتيب السريع quicksort، والترتيب بالكومة heap-sort) ترتبطان ارتباطًا وثيقًا ببنيتي بيانات درسناهما من قبل (شجرة البحث الثنائية العشوائية random binary search tree، والكومة heap على التوالي). يناقش الجزء الأول من هذا الفصل خوارزميات للترتيب لا تستعمل إلا المقارنات، ويقدّم ثلاث خوارزميات تعمل في زمن $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$ . ويبيّن في النهاية أن هذه الخوارزميات الثلاث كلها مثلى سلوكًا تقاربيًا؛ فلا توجد خوارزمية تعتمد على المقارنات فحسب، ولا تستطيع تفادي إجراء نحو $$ \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$$ مقارنة في أسوأ الحالات بل وحتى في الحالة المتوسطة. وقبل أن نُكمل، يجدر بنا أن نلاحظ أن أيًّا من تنفيذات SSet أو طابور الأولوية priority queue التي عرضناها في الفصول السابقة يمكن أن يُستعمل أيضًا للحصول على خوارزمية ترتيب في زمن $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$ . فمثلًا، يمكننا ترتيب $$ \mathtt{n}$$ عنصرًا بتنفيذ $$ \mathtt{n}$$ عملية من نوع $$ \mathtt{add(x)}$$ يتبعها $$ \mathtt{n}$$ عملية من نوع $$ \mathtt{remove()}$$ على BinaryHeap أو MeldableHeap. وبدلًا من ذلك، يمكننا استعمال $$ \mathtt{n}$$ عملية من نوع $$ \mathtt{add(x)}$$ على أي بنية من بنى بيانات شجرة البحث الثنائية، ثم تنفيذ اجتياز بالترتيب الوسطي in-order traversal (التمرين 6.8) لاستخراج العناصر بالترتيب المرتَّب. غير أن في الحالتين نتحمّل عبءً كبيرًا لبناء بنية لا تُستعمل بالكامل أبدًا. والترتيب مشكلة بالغة الأهمية، وبه يستحق أن نضع له طرقًا مباشرة تكون بأقصى ما يمكن من السرعة والبساطة وكفاءة المساحة. ويبيّن الجزء الثاني من هذا الفصل أن ما إن نسمح بعمليات أخرى إلى جانب المقارنات حتى تصير تلك الحدود لا محل سريان. وفعلًا، وباستعمال فهرسة المصفوفات، يمكن ترتيب مجموعة من $$ \mathtt{n}$$ عددًا صحيحًا ضمن المدى $$ \{0,\ldots,\ensuremath{\mathtt{n}}^c-1\}$$ في زمن $$ O(c\ensuremath{\mathtt{n}})$$ .

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 11.1 الترتيب المبني على المقارنات

**الأقسام الفرعية**

# 11.1 الترتيب المبني على المقارنات

نقدّم في هذا القسم ثلاث خوارزميات للترتيب: الترتيب بالدمج (merge-sort)، والترتيب السريع (quicksort)، والترتيب بالكومة (heap-sort). تأخذ كل واحدة من هذه الخوارزميات مصفوفة إدخال $$ \mathtt{a}$$ وترتّب عناصر $$ \mathtt{a}$$ في ترتيب غير متناقص خلال زمن $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$ (متوقَّع). وجميع هذه الخوارزميات مبنية على المقارنات. أمّا وسيطها الثاني، $$ \mathtt{c}$$ ، فهو Comparator يُنفّذ الطريقة $$ \mathtt{compare(a,b)}$$ . ولا تُعنى هذه الخوارزميات بنوع البيانات التي يجري ترتيبها؛ فالعملية الوحيدة التي تجريها على البيانات هي المقارنات بالاستعانة بالطريقة $$ \mathtt{compare(a,b)}$$ . وتذكّر، كما ورد في القسم 1.2.4، أن $$ \mathtt{compare(a,b)}$$ تُعيد قيمة سالبة إذا كان $$ \ensuremath{\mathtt{a}}<\ensuremath{\mathtt{b}}$$ ، وقيمة موجبة إذا كان $$ \ensuremath{\mathtt{a}}>\ensuremath{\mathtt{b}}$$ ، وصفرًا إذا كان $$ \ensuremath{\mathtt{a}}=\ensuremath{\mathtt{b}}$$ .

## 11.1.1 الترتيب بالدمج

خوارزمية الترتيب بالدمج مثال كلاسيكي على «القسمة والتغلب» (divide and conquer) التعاودي: فإذا كان طول $$ \mathtt{a}$$ لا يتجاوز 1، فإن $$ \mathtt{a}$$ مرتَّب أصلًا، فلا نفعل شيئًا. وإلّا فسنقسّم $$ \mathtt{a}$$ إلى نصفين، هما $$ \ensuremath{\mathtt{a0}}=\ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[n/2-1]}}$$ و $$ \ensuremath{\mathtt{a1}}=\ensuremath{\mathtt{a[n/2]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$$ . نرتّب $$ \mathtt{a0}$$ و $$ \mathtt{a1}$$ تعايديًا، ثم ندمج (بعد أن صارا مرتَّبين) $$ \mathtt{a0}$$ و $$ \mathtt{a1}$$ للحصول على مصفوفتنا المرتَّبة تمامًا $$ \mathtt{a}$$ :

```
    <T> void mergeSort(T[] a, Comparator<T> c) {
        if (a.length <= 1) return;
        T[] a0 = Arrays.copyOfRange(a, 0, a.length/2);
        T[] a1 = Arrays.copyOfRange(a, a.length/2, a.length);
        mergeSort(a0, c);
        mergeSort(a1, c);
        merge(a0, a1, a, c);
    }
```

يعرض الشكل 11.1 مثالًا على ذلك.

وبالمقارنة مع الترتيب، فإن دمج المصفوفتين المرتَّبتين $$ \mathtt{a0}$$ و $$ \mathtt{a1}$$ أمر يسير إلى حدٍّ ما. فنضيف العناصر إلى $$ \mathtt{a}$$ واحدًا تلو الآخر. فإن كانت $$ \mathtt{a0}$$ أو $$ \mathtt{a1}$$ فارغة، أضفنا العنصر التالي من المصفوفة الأخرى (غير الفارغة). وإلّا أخذنا الأصغر بين العنصر التالي في $$ \mathtt{a0}$$ والعنصر التالي في $$ \mathtt{a1}$$ وأضفناه إلى $$ \mathtt{a}$$ :

```
    <T> void merge(T[] a0, T[] a1, T[] a, Comparator<T> c) {
        int i0 = 0, i1 = 0;
        for (int i = 0; i < a.length; i++) {
            if (i0 == a0.length)
                a[i] = a1[i1++];
            else if (i1 == a1.length)
                a[i] = a0[i0++];
            else if (compare(a0[i0], a1[i1]) < 0)
                a[i] = a0[i0++];
            else 
                a[i] = a1[i1++];
        }
    }
```

لاحظ أن خوارزمية $$ \mathtt{merge(a0,a1,a,c)}$$ تجري ما لا يزيد على $$ \ensuremath{\mathtt{n}}-1$$ مقارنة قبل أن تنفد عناصر إحدى $$ \mathtt{a0}$$ أو $$ \mathtt{a1}$$ .

لفهم زمن تشغيل الترتيب بالدمج، أسهل ما يكون النظر إليه في ضوء شجرة تعاوده (recursion tree). لنفترض الآن أن $$ \mathtt{n}$$ قوة للعدد 2، بحيث يكون $$ \ensuremath{\mathtt{n}}=2^{\log \ensuremath{\mathtt{n}}}$$ ، وأن $$ \log \ensuremath{\mathtt{n}}$$ عددًا صحيحًا. راجع الشكل 11.2. يحوّل الترتيب بالدمج مسألة ترتيب $$ \mathtt{n}$$ عنصرًا إلى مسألتين، كل واحدة منهما ترتيب $$ \ensuremath{\mathtt{n}}/2$$ عنصرًا. ثم تُحوَّل هاتان المسئلتان الفرعيتان كلٌّ منهما إلى مسألتين، أي إلى أربعة مسائل فرعية في المجمل، حجم كلٍّ منها $$ \ensuremath{\mathtt{n}}/4$$ . ثم تصير هذه المسائل الفرعية الأربع ثماني مسائل فرعية، حجم كلٍّ منها $$ \ensuremath{\mathtt{n}}/8$$ ، وهكذا. وفي قاع هذه العملية، تُحوَّل $$ \ensuremath{\mathtt{n}}/2$$ مسألة فرعية، حجم كلٍّ منها اثنان، إلى $$ \mathtt{n}$$ مسألة، حجم كلٍّ منها واحد. ولكل مسألة فرعية حجم $$ \ensuremath{\mathtt{n}}/2^{i}$$ ، فإن الزمن الذي يُستغرق في دمج البيانات ونسخها هو $$ O(\ensuremath{\mathtt{n}}/2^i)$$ . وبما أنه يوجد $$ 2^i$$ مسألة فرعية حجم كلٍّ منها $$ \ensuremath{\mathtt{n}}/2^i$$ ، فإن الزمن الكلي المستغرق في العمل على المسائل ذات الحجم $$ 2^i$$ ، باستثناء الاستدعاءات التعاودية، هو

![$\displaystyle 2^i\times O(\ensuremath{\mathtt{n}}/2^i) = O(\ensuremath{\mathtt{n}}) \enspace . $](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4096.png.webp)

وعليه، فإن الزمن الكلي الذي يستغرقه الترتيب بالدمج هو

![$\displaystyle \sum_{i=0}^{\log \ensuremath{\mathtt{n}}} O(\ensuremath{\mathtt{n}}) = O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}) \enspace . $](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4097.png.webp)

**الشكل 11.2:** شجرة التعاود في الترتيب بالدمج. ![\includegraphics[width=\textwidth ]{figs/mergesort-recursion}](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4098.png.webp) يقوم برهان المبرهنة التالية على التحليل السابق، لكنه يحتاج إلى قدر من العناية الإضافية للتعامل مع الحالات التي لا يكون فيها $$ \mathtt{n}$$ قوة للعدد 2. **المبرهنة 11..1** *تعمل خوارزمية $$ \mathtt{mergeSort(a,c)}$$ في زمن $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$ وتجري ما لا يزيد على $$ \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$$ مقارنة.*

*البرهان*. البرهان بالاستدلال (induction) على $$ \ensuremath{\mathtt{n}}$$ . الحالة الأساسية، أي $$ \ensuremath{\mathtt{n}}=1$$ ، بديهية؛ فحين تُعرض على الخوارزمية مصفوفة طولها 0 أو 1 فإنها تعود فورًا دون إجراء أي مقارنة.

يتطلب دمج قائمتين مرتَّبتين مجموع طولهما $$ \ensuremath{\mathtt{n}}$$ ما لا يزيد على $$ \ensuremath{\mathtt{n}}-1$$ مقارنة. وليتكن $$ C(\ensuremath{\mathtt{n}})$$ رمزًا لأقصى عدد من المقارنات التي تجريها $$ \mathtt{mergeSort(a,c)}$$ على مصفوفة $$ \mathtt{a}$$ طولها $$ \mathtt{n}$$ . فإذا كان $$ \ensuremath{\mathtt{n}}$$ زوجيًا، طبّقنا فرضية الاستدلال على المسألتين الفرعيتين وحصلنا على

| $$\displaystyle C(\ensuremath{\mathtt{n}})$$ | $$\displaystyle \le \ensuremath{\mathtt{n}}-1 + 2C(\ensuremath{\mathtt{n}}/2)$$ |  |
| --- | --- | --- |
|  | $$\displaystyle \le \ensuremath{\mathtt{n}}-1 + 2((\ensuremath{\mathtt{n}}/2)\log(\ensuremath{\mathtt{n}}/2))$$ |  |
|  | $$\displaystyle = \ensuremath{\mathtt{n}}-1 + \ensuremath{\mathtt{n}}\log(\ensuremath{\mathtt{n}}/2)$$ |  |
|  | $$\displaystyle = \ensuremath{\mathtt{n}}-1 + \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{n}}$$ |  |
|  | $$\displaystyle < \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}} \enspace .$$ |  |

أما الحالة التي يكون فيها $$ \ensuremath{\mathtt{n}}$$ فرديًا فهي أعقد قليلًا. ونستخدم في هذه الحالة متساويتين يسهل التحقق منهما:

لكل $$ x\ge 1$$ و

لكل $$ x\ge 1/2$$ . وتأتي المتساوية (11.1) من الحقيقة $$ \log(x)+1 = \log(2x)$$ ، فيما تنبع (11.2) من كون $$ \log$$ دالة مقعرة (concave). ومع هذين الأداتين في متناول اليد، ينتج لنا، لأجل $$ \mathtt{n}$$ الفردي،

| $$\displaystyle C(\ensuremath{\mathtt{n}})$$ | $$\displaystyle \le \ensuremath{\mathtt{n}}-1 + C(\lceil \ensuremath{\mathtt{n}}/2 \rceil) + C(\lfloor \ensuremath{\mathtt{n}}/2 \rfloor)$$ |  |
| --- | --- | --- |
|  | $$\displaystyle \le \ensuremath{\mathtt{n}}-1 + \lceil \ensuremath{\mathtt{n}}/2 ... ...\ensuremath{\mathtt{n}}/2 \rfloor\log \lfloor \ensuremath{\mathtt{n}}/2 \rfloor$$ |  |
|  | $$\displaystyle = \ensuremath{\mathtt{n}}-1 + (\ensuremath{\mathtt{n}}/2 + 1/2)\l... ...2+1/2) + (\ensuremath{\mathtt{n}}/2 - 1/2) \log (\ensuremath{\mathtt{n}}/2-1/2)$$ |  |
|  | $$\displaystyle \le \ensuremath{\mathtt{n}}-1 + \ensuremath{\mathtt{n}}\log(\ensu... ...2)(\log (\ensuremath{\mathtt{n}}/2+1/2) - \log (\ensuremath{\mathtt{n}}/2-1/2))$$ |  |
|  | $$\displaystyle \le \ensuremath{\mathtt{n}}-1 + \ensuremath{\mathtt{n}}\log(\ensuremath{\mathtt{n}}/2) + 1/2$$ |  |
|  | $$\displaystyle < \ensuremath{\mathtt{n}} + \ensuremath{\mathtt{n}}\log(\ensuremath{\mathtt{n}}/2)$$ |  |
|  | $$\displaystyle = \ensuremath{\mathtt{n}} + \ensuremath{\mathtt{n}}(\log\ensuremath{\mathtt{n}}-1)$$ |  |
|  | $$\displaystyle = \ensuremath{\mathtt{n}}\log\ensuremath{\mathtt{n}} \enspace . \qedhere$$ |  |

![$ \qedsymbol$](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4103.png.webp)

## 11.1.2 الترتيب السريع

خوارزمية الترتيب السريع خوارزمية «قسمة وتغلب» كلاسيكية أخرى. وبخلاف الترتيب بالدمج الذي يقوم بالدمج بعد حل المسألتين الفرعيتين، فإن الترتيب السريع ينجز كل عمله مقدمًا. ووصفة الترتيب السريع بسيطة: اختر عنصرًا محوريًا (pivot) عشوائيًا، هو $$ \mathtt{x}$$ ، من $$ \mathtt{a}$$ ؛ وقسّم $$ \mathtt{a}$$ إلى مجموعة العناصر الأصغر من $$ \mathtt{x}$$ ، ومجموعة العناصر المساوية لـ $$ \mathtt{x}$$ ، ومجموعة العناصر الأكبر من $$ \mathtt{x}$$ ؛ وأخيرًا رتّب تعايديًا المجموعة الأولى والثالثة من هذا التقسيم. ويعرض الشكل 11.3 مثالًا على ذلك.

```
    <T> void quickSort(T[] a, Comparator<T> c) {
        quickSort(a, 0, a.length, c);
    }
    <T> void quickSort(T[] a, int i, int n, Comparator<T> c) {
        if (n <= 1) return;
        T x = a[i + rand.nextInt(n)];
        int p = i-1, j = i, q = i+n;
        // a[i..p]<x,  a[p+1..q-1]??x, a[q..i+n-1]>x 
        while (j < q) {
            int comp = compare(a[j], x);
            if (comp < 0) {       // move to beginning of array
                swap(a, j++, ++p);
            } else if (comp > 0) {
                swap(a, j, --q);  // move to end of array
            } else {
                j++;              // keep in the middle
            }
        }
        // a[i..p]<x,  a[p+1..q-1]=x, a[q..i+n-1]>x 
        quickSort(a, i, p-i+1, c);
        quickSort(a, q, n-(q-i), c);
    }
```

كل هذا يجري في الموضع نفسه (in place)، بحيث لا تصنع الطريقة $$ \mathtt{quickSort(a,i,n,c)}$$ نسخًا من المصفوفات الجزئية التي يجري ترتيبها، بل لا تكتفي إلا بترتيب المصفوفة الجزئية $$ \ensuremath{\mathtt{a[i]}},\ldots,\ensuremath{\mathtt{a[i+n-1]}}$$ . ويُستدعى هذا في البداية بالمعطيات $$ \mathtt{quickSort(a,0,a.length,c)}$$ .

وفي قلب خوارزمية الترتيب السريع تقع خوارزمية التقسيم في الموضع نفسه. وهذه الخوارزمية، دون استعمال أي مساحة إضافية، تبدّل العناصر في $$ \mathtt{a}$$ وتحسب الدليلين $$ \mathtt{p}$$ و $$ \mathtt{q}$$ بحيث

![$\displaystyle \ensuremath{\mathtt{a[i]}} \begin{cases} {}< \ensuremath{\mathtt... ...htt{q}}\le \ensuremath{\mathtt{i}} \le \ensuremath{\mathtt{n}}-1$} \end{cases}$](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4150.png.webp)

ينفذ هذا التقسيم، الذي تتولاه حلقة $$ \mathtt{while}$$ في الشيفرة، بزيادة $$ \mathtt{p}$$ وإنقاص $$ \mathtt{q}$$ تكرارًا مع الحفاظ على الشرطين الأول والأخير من هذه الشروط. وفي كل خطوة، إمّا أن يُنقل العنصر الكائن عند الموضع $$ \mathtt{j}$$ إلى المقدّمة، أو يُترك مكانه، أو يُنقل إلى المؤخرة. وفي الحالتين الأوليين تُزاد قيمة $$ \mathtt{j}$$ ، أما في الحالة الأخيرة فلا تُزاد $$ \mathtt{j}$$ ، لأن العنصر الجديد الموجود عند الموضع $$ \mathtt{j}$$ لم يجرِ معالجته بعد.

يرتبط الترتيب السريع ارتباطًا وثيقًا جدًا بأشجار البحث الثنائية العشوائية random binary search trees التي درسناها في القسم 7.1. وفي الواقع، إذا كان مدخل الترتيب السريع مؤلَّفًا من $$ \mathtt{n}$$ عنصرًا متمايزًا، فإن شجرة تعاود الترتيب السريع هي شجرة بحث ثنائية عشوائية. ولرؤية ذلك، تذكّر أن أول ما نفعله عند بناء شجرة بحث ثنائية عشوائية هو اختيار عنصر عشوائي $$ \mathtt{x}$$ وجعله جذر الشجرة. وبعد ذلك، سيُقارَن كل عنصر في النهاية بـ $$ \mathtt{x}$$ ، إذ تذهب العناصر الأصغر إلى الشجرة الفرعية اليسرى والأكبر منها إلى اليمنى. أما في الترتيب السريع فنختار عنصرًا عشوائيًا $$ \mathtt{x}$$ ونقارن كل شيء به $$ \mathtt{x}$$ فورًا، فوضع العناصر الأصغر في بداية المصفوفة والعناصر الأكبر في نهايتها. ثم يرتّب الترتيب السريع تعايديًا بداية المصفوفة ونهايتها، في حين تُدرج شجرة البحث الثنائية العشوائية تعايديًا العناصر الأصغر في الشجرة الفرعية اليسرى للجذر والعناصر الأكبر في الشجرة الفرعية اليمنى للجذر. ويقابل هذا التطابق بين أشجار البحث الثنائية العشوائية والترتيب السريع أن باستطاعتنا نقل الملاحظة 7.1 إلى عبارة عن الترتيب السريع: **الملاحظة 11..1** *حين يُستدعى الترتيب السريع لترتيب مصفوفة تحتوي الأعداد الصحيحة $$ 0,\ldots,\ensuremath{\mathtt{n}}-1$$ ، يكون العدد المتوقَّع لمرات مقارنة العنصر $$ \mathtt{i}$$ بعنصر محوري ما لا يزيد على $$ H_{\ensuremath{\mathtt{i}}+1} + H_{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}}$$ .*

ومن خلال جمع يسير للأعداد التوافقية (harmonic numbers) نحصل على المبرهنة التالية بشأن زمن تشغيل الترتيب السريع: **المبرهنة 11..2** *حين يُستدعى الترتيب السريع لترتيب مصفوفة تحتوي $$ \mathtt{n}$$ عنصرًا متمايزًا، يكون عدد المقارنات المتوقَّع ما لا يزيد على $$ 2\ensuremath{\mathtt{n}}\ln \ensuremath{\mathtt{n}} + O(\ensuremath{\mathtt{n}})$$ .*

*البرهان*. وليكن $$ T$$ عدد المقارنات التي يجريها الترتيب السريع عند ترتيب $$ \mathtt{n}$$ عنصرًا متمايزًا. وباستعمال الملاحظة 11.1 وخطية التوقّع، لدينا:

| $$\displaystyle \mathrm{E}[T]$$ | $$\displaystyle = \sum_{i=0}^{\ensuremath{\mathtt{n}}-1}(H_{\ensuremath{\mathtt{i}}+1}+H_{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}})$$ |  |
| --- | --- | --- |
|  | $$\displaystyle = 2\sum_{i=1}^{\ensuremath{\mathtt{n}}}H_i$$ |  |
|  | $$\displaystyle \le 2\sum_{i=1}^{\ensuremath{\mathtt{n}}}H_{\ensuremath{\mathtt{n}}}$$ |  |
|  | $$\displaystyle \le 2\ensuremath{\mathtt{n}}\ln\ensuremath{\mathtt{n}} + 2\ensure... ...th{\mathtt{n}}\ln \ensuremath{\mathtt{n}} + O(\ensuremath{\mathtt{n}}) \qedhere$$ |  |

![$ \qedsymbol$](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4168.png.webp)

تصف المبرهنة 11.3 الحالة التي تكون فيها العناصر المرتَّبة كلها متمايزة. أما إذا كانت مصفوفة الإدخال $$ \mathtt{a}$$ تحوي عناصر مكرَّرة، فإن زمن التشغيل المتوقَّع للترتيب السريع ليس أسوأ، بل قد يكون أفضل؛ فكلما اختير عنصر مكرَّر $$ \mathtt{x}$$ محورًا، جُمِّعت كل ورودات $$ \mathtt{x}$$ معًا ولم تشارك في أيٍّ من المسألتين الفرعيتين. **المبرهنة 11..3** *تعمل الطريقة $$ \mathtt{quickSort(a,c)}$$ في زمن متوقَّع قدره $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$، وعدد المقارنات المتوقَّع الذي تجريه ما لا يزيد على $$ 2\ensuremath{\mathtt{n}}\ln \ensuremath{\mathtt{n}} +O(\ensuremath{\mathtt{n}})$$ .*

## 11.1.3 الترتيب بالكومة

خوارزمية الترتيب بالكومة خوارزمية ترتيب أخرى تعمل في الموضع نفسه. وهي تستعمل الأكوام الثنائية (binary heaps) التي ناقشناها في القسم 10.1. وتذكّر أن بنية البيانات BinaryHeap تمثّل كومة باستعمال مصفوفة واحدة. تحوّل خوارزمية الترتيب بالكومة مصفوفة الإدخال $$ \mathtt{a}$$ إلى كومة، ثم تستخرج القيمة الأصغر تكرارًا. وبعبارة أدق، تخزّن الكومة $$ \mathtt{n}$$ عنصرًا في مصفوفة، $$ \mathtt{a}$$ ، عند مواقع المصفوفة $$ \ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$$ مع تخزين أصغر قيمة عند الجذر، وهو $$ \mathtt{a[0]}$$ . وبعد تحويل $$ \mathtt{a}$$ إلى BinaryHeap، تبدّل خوارزمية الترتيب بالكومة بين $$ \mathtt{a[0]}$$ و $$ \mathtt{a[n-1]}$$ تكرارًا، وتخفض $$ \mathtt{n}$$ ، وتستدعي $$ \mathtt{trickleDown(0)}$$ بحيث تصير $$ \ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[n-2]}}$$ مجددًا تمثيلًا صالحًا للكومة. وعندما تنتهي هذه العملية (لأن $$ \ensuremath{\mathtt{n}}=0$$ ) تكون عناصر $$ \mathtt{a}$$ مخزَّنة بترتيب متناقص، فنعكس $$ \mathtt{a}$$ للحصول على الترتيب المرتَّب النهائي.11.1يعرض الشكل 11.4 مثالًا على تنفيذ $$ \mathtt{heapSort(a,c)}$$ .

```
    <T> void sort(T[] a, Comparator<T> c) {
        BinaryHeap<T> h = new BinaryHeap<T>(a, c);
        while (h.n > 1) {
            h.swap(--h.n, 0);
            h.trickleDown(0);
        }
        Collections.reverse(Arrays.asList(a));
    }
```

تتمثل إحدى الدوال الفرعية (subroutines) الجوهرية في الترتيب بالكومة في المُنشئ (constructor) الذي يحوّل مصفوفة غير مرتَّبة $$ \mathtt{a}$$ إلى كومة. ومن السهل إنجاز ذلك في زمن $$ O(\ensuremath{\mathtt{n}}\log\ensuremath{\mathtt{n}})$$ عبر استدعاء طريقة BinaryHeap $$ \mathtt{add(x)}$$ مرارًا، لكننا نستطيع فعل ما هو أفضل باستعمال خوارزمية تصاعدية (bottom-up). وتذكّر أن أبناء $$ \mathtt{a[i]}$$ في الكومة الثنائية يُخزَّنون عند المواضع $$ \mathtt{a[2i+1]}$$ و $$ \mathtt{a[2i+2]}$$ . ويترتب على ذلك أن عناصر $$ \ensuremath{\mathtt{a}}[\lfloor\ensuremath{\mathtt{n}}/2\rfloor],\ldots,\ensuremath{\mathtt{a[n-1]}}$$ ليس لها أبناء. وبعبارة أخرى، كلٌّ من $$ \ensuremath{\mathtt{a}}[\lfloor\ensuremath{\mathtt{n}}/2\rfloor],\ldots,\ensuremath{\mathtt{a[n-1]}}$$ كومة جزئية (sub-heap) بحجم 1. الآن، وإذا عملنا في الاتجاه المعاكس، يمكننا استدعاء $$ \mathtt{trickleDown(i)}$$ لكل $$ \ensuremath{\mathtt{i}}\in\{\lfloor \ensuremath{\mathtt{n}}/2\rfloor-1,\ldots,0\}$$ . وهذا يعمل، ذلك أنه بحلول اللحظة التي نستدعي فيها $$ \mathtt{trickleDown(i)}$$ يكون كلٌّ من أبناء $$ \mathtt{a[i]}$$ جذرًا لكومة جزئية، لذا فإن استدعاء $$ \mathtt{trickleDown(i)}$$ يجعل $$ \mathtt{a[i]}$$ جذرًا لكومته الجزئية الخاصة.

```
    BinaryHeap(T[] a, Comparator<T> c) {
        this.c = c;
        this.a = a;
        n = a.length;
        for (int i = n/2-1; i >= 0; i--) {
            trickleDown(i);
        }
    }
```

والأمر اللافت في هذه الاستراتيجية التصاعدية أنها أكثر كفاءة من استدعاء $$ \mathtt{add(x)}$$ $$ \mathtt{n}$$ مرة. ولرؤية ذلك، لاحظ أن عددًا قدره $$ \ensuremath{\mathtt{n}}/2$$ من العناصر لا يحتاج إلى أي عمل، وأن $$ \ensuremath{\mathtt{n}}/4$$ من العناصر نستدعي فيها $$ \mathtt{trickleDown(i)}$$ على كومة جزئية جذرها $$ \mathtt{a[i]}$$ وارتفاعها واحد، و $$ \ensuremath{\mathtt{n}}/8$$ من العناصر نستدعي فيها $$ \mathtt{trickleDown(i)}$$ على كومة جزئية ارتفاعها اثنان، وهكذا. وبما أن العمل الذي تجريه $$ \mathtt{trickleDown(i)}$$ متناسب مع ارتفاع الكومة الجزئية التي جذرها $$ \mathtt{a[i]}$$ ، فإن إجمالي العمل المنجز هو على الأكثر

![$\displaystyle \sum_{i=1}^{\log\ensuremath{\mathtt{n}}} O((i-1)\ensuremath{\math... ...i/2^{i} = O(2\ensuremath{\mathtt{n}}) = O(\ensuremath{\mathtt{n}}) \enspace . $](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4226.png.webp)

أما المساواة قبل الأخيرة فتُفَهَّم بالاعتراف بأن المجموع $$ \sum_{i=1}^{\infty} i/2^{i}$$ يساوي، بحسب تعريف القيمة المتوقَّعة، عدد مرات رمي عملة (بما فيها الرمية التي تخرج فيها الوجه أولًا)؛ ثم بتطبيق الملاحظة 4.2.

تصف المبرهنة التالية أداء $$ \mathtt{heapSort(a,c)}$$ . **المبرهنة 11..4** *تعمل الطريقة $$ \mathtt{heapSort(a,c)}$$ في زمن $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$ وتجري ما لا يزيد على $$ 2\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}} + O(\ensuremath{\mathtt{n}})$$ مقارنة.*

*البرهان*. تعمل الخوارزمية في ثلاث خطوات: (1) تحويل $$ \mathtt{a}$$ إلى كومة، (2) استخراج العنصر الأصغر من $$ \mathtt{a}$$ تكرارًا، و(3) عكس عناصر $$ \mathtt{a}$$ . وقد برهنا للتو أن الخطوة 1 تستغرق زمنًا قدره $$ O(\ensuremath{\mathtt{n}})$$ وتجري $$ O(\ensuremath{\mathtt{n}})$$ مقارنة. أما الخطوة 3 فتستغرق زمنًا قدره $$ O(\ensuremath{\mathtt{n}})$$ ولا تجري أي مقارنة. وتُجري الخطوة 2 عددًا قدره $$ \mathtt{n}$$ من الاستدعاءات لـ $$ \mathtt{trickleDown(0)}$$ . ويعمل الاستدعاء رقم $$ i$$ من هذه الاستدعاءات على كومة حجمها $$ \ensuremath{\mathtt{n}}-i$$ ويجري ما لا يزيد على $$ 2\log(\ensuremath{\mathtt{n}}-i)$$ مقارنة. وبجمع ذلك على $$ i$$ نحصل على

![$\displaystyle \sum_{i=0}^{\ensuremath{\mathtt{n}}-i} 2\log(\ensuremath{\mathtt{... ...ensuremath{\mathtt{n}} = 2\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}} $](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4245.png.webp)

بجمع عدد المقارنات التي تجريها كل واحدة من الخطوات الثلاث يكتمل البرهان. ![$ \qedsymbol$](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4232.png.webp)

11.1.4 حدٌّ أدنى (lower bound) للترتيب المبني على المقارنات لقد رأينا الآن ثلاث خوارزميات ترتيب مبنية على المقارنات، كل منها تعمل في زمن $$ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$$ . وإلى هذا الحد، ينبغي أن نتساءل إن كانت هناك خوارزميات أسرع. والجواب المختصر على هذا السؤال هو لا. فإذا كانت العمليات الوحيدة المسموح بها على عناصر $$ \mathtt{a}$$ هي المقارنات، فلا يمكن لأي خوارزمية أن تتجنب إجراء نحو $$ \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$$ مقارنة. وإثبات ذلك ليس صعبًا، لكنه يتطلب قدرًا من الخيال. وفي المحصلة، فإنه ينبع من الحقيقة أن

![$\displaystyle \log(\ensuremath{\mathtt{n}}!) = \log \ensuremath{\mathtt{n}} +... ...athtt{n}}\log \ensuremath{\mathtt{n}} - O(\ensuremath{\mathtt{n}}) \enspace . $](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4249.png.webp)

( وترك إثبات هذه الحقيقة كتمرين 11.11.)

وسنبدأ بتركيز انتباهنا على الخوارزميات الحتمية (deterministic) مثل الترتيب بالدمج والترتيب بالكومة، وعلى قيمة ثابتة بعينها لـ $$ \mathtt{n}$$ . تخيّل خوارزمية من هذا النوع مستعملة لترتيب $$ \mathtt{n}$$ عنصرًا متمايزًا. ومفتاح إثبات هذا الحد الأدنى هو ملاحظة أن الخوارزمية الحتمية، عند ثبات قيمة $$ \mathtt{n}$$ ، تقارن أولًا دائمًا الزوج نفسه من العناصر. فمثلًا، في $$ \mathtt{heapSort(a,c)}$$ ، عندما يكون $$ \mathtt{n}$$ زوجيًا، يكون أول استدعاء لـ $$ \mathtt{trickleDown(i)}$$ هو $$ \mathtt{i=n/2-1}$$ ، وتكون أول مقارنة بين العنصرين $$ \mathtt{a[n/2-1]}$$ و $$ \mathtt{a[n-1]}$$ . وبما أن جميع عناصر الإدخال متمايزة، فإن هذه المقارنة الأولى لها نتيجتان محتملتان فقط. وقد تعتمد المقارنة الثانية التي تجريها الخوارزمية على نتيجة المقارنة الأولى. وقد تعتمد المقارنة الثالثة على نتيجتي المقارنتين الأوليين، وهكذا. وبهذه الطريقة، يمكن النظر إلى أي خوارزمية ترتيب حتمية مبنية على المقارنات على أنها شجرة مقارنات ثنائية الجذر. وكل عقدة داخلية، $$ \mathtt{u}$$ ، في هذه الشجرة موسومة بزوج من الدلالين $$ \mathtt{u.i}$$ و $$ \mathtt{u.j}$$ . فإذا كان $$ \ensuremath{\mathtt{a[u.i]}}<\ensuremath{\mathtt{a[u.j]}}$$ انتقلت الخوارزمية إلى الشجرة الفرعية اليسرى، وإلّا انتقلت إلى الشجرة الفرعية اليمنى. وكل ورقة $$ \mathtt{w}$$ في هذه الشجرة موسومة بتبادل $$ \ensuremath{\mathtt{w.p[0]}},\ldots,\ensuremath{\mathtt{w.p[n-1]}}$$ لـ $$ 0,\ldots,\ensuremath{\mathtt{n}}-1$$ . ويمثّل هذا التبادل التبادلَ المطلوب لترتيب $$ \mathtt{a}$$ إذا بلغت شجرة المقارنات هذه الورقة. أي أن:

![$\displaystyle \ensuremath{\mathtt{a[w.p[0]]}}<\ensuremath{\mathtt{a[w.p[1]]}}<\cdots<\ensuremath{\mathtt{a[w.p[n-1]]}} \enspace . $](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4267.png.webp)

يعرض الشكل 11.5 مثالًا على شجرة مقارنات لمصفوفة حجمها $$ \mathtt{n=3}$$ .

تخبرنا شجرة المقارنات الخاصة بخوارزمية الترتيب بكل شيء عن تلك الخوارزمية. فهي تخبرنا بدقة بتسلسل المقارنات التي ستُجرى لأي مصفوفة إدخال، $$ \mathtt{a}$$ ، ذات $$ \mathtt{n}$$ عنصرًا متمايزًا، وتخبرنا بكيفية إعادة الخوارزمية ترتيب $$ \mathtt{a}$$ بغية ترتيبه. وعليه، يجب أن تملك شجرة المقارنات ما لا يقل عن $$ \ensuremath{\mathtt{n}}!$$ ورقة؛ وإلّا فهناك تباديلان مختلفان يقودان إلى الورقة نفسها، وبالتالي لا ترتّب الخوارزمية أحد هذين التباديل ترتيبًا صحيحًا. فمثلًا، لا تملك شجرة المقارنات في الشكل 11.6 سوى $$ 4< 3!=6$$ ورقة. وبفحص هذه الشجرة نرى أن مصفوفتي الإدخال $$ 3,1,2$$ و $$ 3,2,1$$ توصلان كلتاهما إلى الورقة واقفة أقصى اليمين. ففي الإدخال $$ 3,1,2$$ تُخرج هذه الورقة بصورة صحيحة $$ \ensuremath{\mathtt{a[1]}}=1,\ensuremath{\mathtt{a[2]}}=2,\ensuremath{\mathtt{a[0]}}=3$$ . غير أن في الإدخال $$ 3,2,1$$ تُخرج هذه العقدة بصورة خاطئة $$ \ensuremath{\mathtt{a[1]}}=2,\ensuremath{\mathtt{a[2]}}=1,\ensuremath{\mathtt{a[0]}}=3$$ . ويقودنا هذا النقاش إلى الحد الأدنى الأساسي للخوارزميات المبنية على المقارنات. **الشكل 11.6:** شجرة مقارنات لا ترتّب كل تباديل الإدخال ترتيبًا صحيحًا. ![\includegraphics[width=\textwidth ]{figs/comparison-tree-b}](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4283.png.webp) **المبرهنة 11..5** *لأي خوارزمية ترتيب حتمية مبنية على المقارنات $$ \mathcal{A}$$ وأي عدد صحيح $$ \ensuremath{\mathtt{n}}\ge 1$$ ، توجد مصفوفة إدخال $$ \mathtt{a}$$ طولها $$ \mathtt{n}$$ بحيث تجري $$ \mathcal{A}$$ عددًا من المقارنات يبلغ على الأقل $$ \log(\ensuremath{\mathtt{n}}!) = \ensuremath{\mathtt{n}}\log\ensuremath{\mathtt{n}}-O(\ensuremath{\mathtt{n}})$$ عند ترتيب $$ \mathtt{a}$$ .*

*البرهان*. ووفق المناقشة السابقة، يجب أن تملك شجرة المقارنات المعرَّفة بواسطة $$ \mathcal{A}$$ ما لا يقل عن $$ \ensuremath{\mathtt{n}}!$$ ورقة. ويبيّن برهان استدلالي سهل أن ارتفاع أي شجرة ثنائية ذات $$ k$$ ورقة هو على الأقل $$ \log k$$ . وعليه، فإن شجرة المقارنات الخاصة بـ $$ \mathcal{A}$$ فيها ورقة، $$ \mathtt{w}$$ ، عمقها على الأقل $$ \log(\ensuremath{\mathtt{n}}!)$$ ، وهناك مصفوفة إدخال $$ \mathtt{a}$$ تقود إلى هذه الورقة. ومصفوفة الإدخال $$ \mathtt{a}$$ هذه هي مدخل تجري فيه $$ \mathcal{A}$$ عددًا من المقارنات يبلغ على الأقل $$ \log(\ensuremath{\mathtt{n}}!)$$ . ![$ \qedsymbol$](/images/open-data-structures/11_1_Comparison_Based_Sorti-img4291.png.webp)

تتناول المبرهنة 11.5 خوارزميات حتمية مثل الترتيب بالدمج والترتيب بالكومة، لكنها لا تخبرنا بشيء عن الخوارزميات العشوائية مثل الترتيب السريع. فهل يمكن لخوارزمية عشوائية أن تتجاوز الحد الأدنى $$ \log(\ensuremath{\mathtt{n}}!)$$ على عدد المقارنات؟ والجواب، مرة أخرى، هو لا. والطريقة لإثبات ذلك هي التفكير، بطريقة مختلفة، فيما تعنيه الخوارزمية العشوائية. وفي النقاش التالي، سنفترض أن أشجار قرارنا «نُظِّفت» بالطريقة التالية: تُحذف أي عقدة لا يمكن بلوغها بواسطة مصفوفة إدخال ما، هي $$ \mathtt{a}$$ . وهذه التنظيفية تعني أن الشجرة فيها بالضبط $$ \ensuremath{\mathtt{n}}!$$ ورقة. وفيها ما لا يقل عن $$ \ensuremath{\mathtt{n}}!$$ ورقة، لأن ما عدا ذلك لما استطاعت أن ترتّب ترتيبًا صحيحًا. وفيها ما لا يزيد عن $$ \ensuremath{\mathtt{n}}!$$ ورقة، لأن كل واحد من التباديل $$ \ensuremath{\mathtt{n}}!$$ المحتملة لعدد $$ \mathtt{n}$$ من العناصر المتمايزة يسلك مسارًا واحدًا بالضبط من الجذر إلى الورقة في شجرة القرار. ويمكننا النظر إلى خوارزمية ترتيب عشوائية، $$ \mathcal{R}$$ ، على أنها خوارزمية حتمية تأخذ مدخلين: مصفوفة الإدخال $$ \mathtt{a}$$ التي يفترض ترتيبها، ومتوالية طويلة $$ b=b_1,b_2,b_3,\ldots,b_m$$ من أعداد حقيقية عشوائية ضمن المدى $$ [0,1]$$ . وتوفّر هذه الأعداد العشوائيةَ ما يلزم من عشوائيةٍ في الخوارزمية. وحين تريد الخوارزمية أن ترمي عملة أو تجري اختيارًا عشوائيًا، فإنها تفعل ذلك باستعمال عنصر ما من $$ b$$ . فمثلًا، ولحساب دليل أول عنصر محوري في الترتيب السريع، يمكن للخوارزمية أن تستعمل الصيغة $$ \lfloor n b_1\rfloor$$ . والآن، لاحظ أن إذا ثبّتنا $$ b$$ على متتالية بعينها $$ \hat{b}$$ ، فإن $$ \mathcal{R}$$ تصير خوارزمية ترتيب حتمية، $$ \mathcal{R}(\hat{b})$$ ، لها شجرة مقارنات مقابلة، $$ \mathcal{T}(\hat{b})$$ . ثم لاحظ أن إذا اخترنا $$ \mathtt{a}$$ لتكون تبادلًا عشوائيًا لـ $$ \{1,\ldots,\ensuremath{\mathtt{n}}\}$$ ، فإن هذا يعادل اختيار ورقة عشوائية، $$ \mathtt{w}$$ ، من $$ \ensuremath{\mathtt{n}}!$$ ورقة في $$ \mathcal{T}(\hat{b})$$ . ويطلب منك التمرين 11.13 أن تثبت أن إذا اخترنا ورقة عشوائية من أي شجرة ثنائية ذات $$ k$$ ورقة، فإن عمق هذه الورقة المتوقَّع هو على الأقل $$ \log k$$ . وعليه، فإن عدد المقارنات المتوقَّع الذي تجريه الخوارزمية (الحتمية) $$ \mathcal{R}(\hat{b})$$ حين تُعطى مصفوفة إدخال تحوي تبادلًا عشوائيًا لـ $$ \{1,\ldots,n\}$$ هو على الأقل $$ \log(\ensuremath{\mathtt{n}}!)$$ . وأخيرًا، لاحظ أن هذا صحيح لكل اختيار لـ $$ \hat{b}$$ ، لذا فهو يصح حتى في حالة $$ \mathcal{R}$$ . وبهذا يكتمل برهان الحد الأدنى للخوارزميات العشوائية. **المبرهنة 11..6** *لأي عدد صحيح $$ n\ge 1$$ وأي خوارزمية ترتيب مبنية على المقارنات (حتمية كانت أو عشوائية)، $$ \mathcal{A}$$ ، يكون عدد المقارنات المتوقَّع الذي تجريه $$ \mathcal{A}$$ عند ترتيب تبادل عشوائي لـ $$ \{1,\ldots,n\}$$ على الأقل $$ \log(\ensuremath{\mathtt{n}}!) = \ensuremath{\mathtt{n}}\log\ensuremath{\mathtt{n}}-O(\ensuremath{\mathtt{n}})$$ .*

#### الحواشي

... بالترتيب.11.1 كان بإمكان الخوارزمية، على نحو بديل، أن تعيد تعريف الدالة $$ \mathtt{compare(x,y)}$$ بحيث يخزّن الترتيب بالكومة العناصر مباشرةً بالترتيب التصاعدي. [opendatastructures.org](http://opendatastructures.org/)

## 11.2 الترتيب العدّي (counting sort) والترتيب الجذري (radix sort)

**الأقسام الفرعية**

# 11.2 الترتيب العدّي (counting sort) والترتيب الجذري (radix sort)

ندرس في هذا القسم خوارزميتَي ترتيب ليستا مبنيتين على المقارنات. ومتخصصتان في ترتيب الأعداد الصحيحة الصغيرة، فإن هاتين الخوارزميتين تتجاوزان الحدود الدنيا للمبرهنة 11.5 باستعمال (أجزاء من) عناصر $$ \mathtt{a}$$ كدلالَين داخل مصفوفة. ولنفترض عبارة من الشكل

![$\displaystyle \ensuremath{\mathtt{c[a[i]]}} = 1 \enspace . $](/images/open-data-structures/11_2_Counting_Sort_Radix_So-img4339.png.webp)

تُنفَّذ هذه العبارة في زمن ثابت، لكن لها $$ \mathtt{c.length}$$ نواتج مختلفة محتملة، بحسب قيمة $$ \mathtt{a[i]}$$ . وهذا يعني أن تنفيذ خوارزمية تجري مثل هذه العبارة لا يمكن نمذجته على شكل شجرة ثنائية. وفي المحصلة، فهذه هي سبب قدرة خوارزميات هذا القسم على الترتيب أسرع من الخوارزميات المبنية على المقارنات.

## 11.2.1 الترتيب العدّي

لنفترض لدينا مصفوفة إدخال $$ \mathtt{a}$$ مؤلَّفة من $$ \mathtt{n}$$ عدد صحيح، كلٌّ منها ضمن المدى $$ 0,\ldots,\ensuremath{\mathtt{k}}-1$$ . ترتّب خوارزمية الترتيب العدّي المصفوفة $$ \mathtt{a}$$ باستعمال مصفوفة مساعدة $$ \mathtt{c}$$ من العدادات. وتُخرج نسخة مرتَّبة من $$ \mathtt{a}$$ في مصفوفة مساعدة $$ \mathtt{b}$$ . والفكرة وراء الترتيب العدّي بسيطة: لكل $$ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{k}}-1\}$$ ، عُدّ عدد مرات ورود $$ \mathtt{i}$$ في $$ \mathtt{a}$$ واحفظ هذا العدد في $$ \mathtt{c[i]}$$ . الآن، بعد الترتيب، سيبدو المخرج على النحو التالي: $$ \mathtt{c[0]}$$ ورودة من 0، تليها $$ \mathtt{c[1]}$$ ورودة من 1، تليها $$ \mathtt{c[2]}$$ ورودة من 2،...، تليها $$ \mathtt{c[k-1]}$$ ورودة من $$ \mathtt{k-1}$$ . والشيفرة التي تقوم بذلك في غاية النحت والإيجاز، ويوضّح الشكل 11.7 تنفيذها:

```
    int[] countingSort(int[] a, int k) {
        int c[] = new int[k];
        for (int i = 0; i < a.length; i++)
            c[a[i]]++;
        for (int i = 1; i < k; i++)
            c[i] += c[i-1];
        int b[] = new int[a.length];
        for (int i = a.length-1; i >= 0; i--)
            b[--c[a[i]]] = a[i];
        return b;
    }
```

**الشكل 11.7:** عمل الترتيب العدّي على مصفوفة طولها $$ \ensuremath{\mathtt{n}}=20$$ تخزّن الأعداد الصحيحة $$ 0,\ldots,\ensuremath{\mathtt{k}}-1=9$$ . ![\includegraphics[width=\textwidth ]{figs/countingsort}](/images/open-data-structures/11_2_Counting_Sort_Radix_So-img4358.png.webp) تضبط حلقة $$ \mathtt{for}$$ الأولى في هذه الشيفرة كل عدّاد $$ \mathtt{c[i]}$$ بحيث يعدّ عدد ورودات $$ \mathtt{i}$$ في $$ \mathtt{a}$$ . وباستعمال قيم $$ \mathtt{a}$$ كدلالَين، يمكن حساب جميع هذه العدادات في زمن $$ O(\ensuremath{\mathtt{n}})$$ بحلقة for واحدة. وعند هذه النقطة كان بإمكاننا استعمال $$ \mathtt{c}$$ لملء مصفوفة المخرجات $$ \mathtt{b}$$ مباشرة. غير أن هذا لن ينجح إذا كانت عناصر $$ \mathtt{a}$$ مرتبطة ببيانات مرافقة. ولذلك نبذل جهدًا إضافيًا يسيرًا لنسخ عناصر $$ \mathtt{a}$$ إلى $$ \mathtt{b}$$ . أمّا حلقة $$ \mathtt{for}$$ التالية، التي تستغرق زمنًا قدره $$ O(\ensuremath{\mathtt{k}})$$، فتحسب مجموعًا تراكميًا للعدادات بحيث تصير $$ \mathtt{c[i]}$$ عدد العناصر في $$ \mathtt{a}$$ التي تكون أصغر من $$ \mathtt{i}$$ أو مساوية لها. وبخاصة، فلكل $$ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{k}}-1\}$$ ، سيكون لدى مصفوفة المخرجات، $$ \mathtt{b}$$ ، ما يلي

![$\displaystyle \ensuremath{\mathtt{b[c[i-1]]}}=\ensuremath{\mathtt{b[c[i-1]+1]=}}\cdots=\ensuremath{\mathtt{b[c[i]-1]}}=\ensuremath{\mathtt{i}} \enspace . $](/images/open-data-structures/11_2_Counting_Sort_Radix_So-img4381.png.webp)

وأخيرًا، تفحص الخوارزمية $$ \mathtt{a}$$ في الاتجاه العكسي لتضع عناصرها بالترتيب في مصفوفة مخرجات $$ \mathtt{b}$$ . وأثناء الفحص، يوضع العنصر $$ \mathtt{a[i]=j}$$ عند الموضع $$ \mathtt{b[c[j]-1]}$$ وتُنقص قيمة $$ \mathtt{c[j]}$$ .

**المبرهنة 11..7** *يمكن للطريقة $$ \mathtt{countingSort(a,k)}$$ أن ترتّب مصفوفة $$ \mathtt{a}$$ التي تحوي $$ \mathtt{n}$$ عددًا صحيحًا من المجموعة $$ \{0,\ldots,\ensuremath{\mathtt{k}}-1\}$$ في زمن $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{k}})$$ .*

ولخوارزمية الترتيب العدّي خاصية حسنة؛ فهي ثابتة (stable)، أي أنها تحافظ على الترتيب النسبي للعناصر المتساوية. فإذا كان عنصران $$ \mathtt{a[i]}$$ و $$ \mathtt{a[j]}$$ لهما القيمة نفسها، وكان $$ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{j}}$$ ، فإن $$ \mathtt{a[i]}$$ سيظهر قبل $$ \mathtt{a[j]}$$ في $$ \mathtt{b}$$ . وسيكون هذا مفيدًا في القسم التالي.

## 11.2.2 الترتيب الجذري

الترتيب العدّي شديد الكفاءة في ترتيب مصفوفة من الأعداد الصحيحة عندما لا يقلّ طول المصفوفة، $$ \mathtt{n}$$ ، كثيرًا عن القيمة القصوى، $$ \ensuremath{\mathtt{k}}-1$$ ، التي تظهر في المصفوفة. أما خوارزمية الترتيب الجذري التي نصفها الآن، فهي تستعمل عدة تمريرات (passes) من الترتيب العدّي لتسمح بمدى أكبر بكثير من القيم القصوى. يرتّب الترتيب الجذري الأعداد الصحيحة ذات $$ \mathtt{w}$$ بت باستعمال $$ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{d}}$$ تمريرة من الترتيب العدّي لترتيب هذه الأعداد الصحيحة $$ \mathtt{d}$$ بت في كل مرة.11.2 وبعبارة أدق، يرتّب الترتيب الجذري أولًا الأعداد الصحيحة حسب $$ \mathtt{d}$$ بت الأقل أهمية، ثم حسب $$ \mathtt{d}$$ بت التالية في الأهمية، وهكذا حتى أنه في التمريرة الأخيرة تُرتَّب الأعداد الصحيحة حسب $$ \mathtt{d}$$ بت الأعلى أهمية.

```
    int[] radixSort(int[] a) {
        int[] b = null;
        for (int p = 0; p < w/d; p++) {
            int c[] = new int[1<<d];
            // the next three for loops implement counting-sort
            b = new int[a.length];
            for (int i = 0; i < a.length; i++)
                c[(a[i] >> d*p)&((1<<d)-1)]++;
            for (int i = 1; i < 1<<d; i++)
                c[i] += c[i-1];
            for (int i = a.length-1; i >= 0; i--)
                b[--c[(a[i] >> d*p)&((1<<d)-1)]] = a[i];
            a = b;
        }
        return b;
    }
```

(في هذه الشيفرة، يستخرج التعبير $$ \mathtt{(a[i]\text{\ttfamily >>}d*p)\text{\ttfamily\&}((1\text{\ttfamily <<}d)-1)}$$ العددَ الصحيح الذي يُعطى تمثيله الثنائي بتات $$ (\ensuremath{\mathtt{p}}+1)\ensuremath{\mathtt{d}}-1,\ldots,\ensuremath{\mathtt{p}}\ensuremath{\mathtt{d}}$$ من $$ \mathtt{a[i]}$$ .) ويعرض الشكل 11.8 مثالًا على خطوات هذه الخوارزمية.

**الشكل 11.8:** استعمال radixsort لترتيب أعداد صحيحة ذات $$ \ensuremath{\mathtt{w}}=8$$ بت باستعمال 4 تمريرات من الترتيب العدّي على أعداد صحيحة ذات $$ \ensuremath{\mathtt{d}}=2$$ بت. ![\includegraphics[width=\textwidth ]{figs/radixsort}](/images/open-data-structures/11_2_Counting_Sort_Radix_So-img4413.png.webp) ترتّب هذه الخوارزمية اللافتة تصحيحًا لأن الترتيب العدّي خوارزمية ترتيب ثابتة. فإذا كان $$ \ensuremath{\mathtt{x}} < \ensuremath{\mathtt{y}}$$ عنصرين من $$ \mathtt{a}$$ ، وكان البت الأعلى أهمية الذي يختلف عنده $$ \mathtt{x}$$ عن $$ \mathtt{y}$$ فهرسه $$ r$$ ، فإن $$ \mathtt{x}$$ سيُوضع قبل $$ \mathtt{y}$$ أثناء التمريرة $$ \lfloor r/\ensuremath{\mathtt{d}}\rfloor$$ ولن تغيّر التمريرات التالية الترتيب النسبي بين $$ \mathtt{x}$$ و $$ \mathtt{y}$$ . ويؤدي الترتيب الجذري $$ \mathtt{w/d}$$ تمريرة من الترتيب العدّي. وتحتاج كل تمريرة إلى زمن $$ O(\ensuremath{\mathtt{n}}+2^{\ensuremath{\mathtt{d}}})$$ . وعليه، فإن أداء الترتيب الجذري تحدده المبرهنة التالية. **المبرهنة 11..8** *لأي عدد صحيح $$ \ensuremath{\mathtt{d}}>0$$ ، يمكن للطريقة $$ \mathtt{radixSort(a,k)}$$ أن ترتّب مصفوفة $$ \mathtt{a}$$ تحوي $$ \mathtt{n}$$ عددًا صحيحًا ذا $$ \mathtt{w}$$ بت في زمن $$ O((\ensuremath{\mathtt{w}}/\ensuremath{\mathtt{d}})(\ensuremath{\mathtt{n}}+2^{\ensuremath{\mathtt{d}}}))$$ .*

وإن فكّرنا بدلًا من ذلك في أن عناصر المصفوفة تقع ضمن المدى $$ \{0,\ldots,\ensuremath{\mathtt{n}}^c-1\}$$ ، وآخذنا $$ \ensuremath{\mathtt{d}}=\lceil\log\ensuremath{\mathtt{n}}\rceil$$ ، نحصل على الصيغة التالية للمبرهنة 11.8. **النتيجة 11..1** *يمكن للطريقة $$ \mathtt{radixSort(a,k)}$$ أن ترتّب مصفوفة $$ \mathtt{a}$$ تحوي $$ \mathtt{n}$$ قيمة عددية ضمن المدى $$ \{0,\ldots,\ensuremath{\mathtt{n}}^c-1\}$$ في زمن $$ O(c\ensuremath{\mathtt{n}})$$ .*

#### الحواشي

... زمنيًا.11.2 نفترض أن $$ \mathtt{d}$$ يقسم $$ \mathtt{w}$$ ، وإلا يمكننا دائمًا زيادة $$ \mathtt{w}$$ إلى $$ \ensuremath{\mathtt{d}}\lceil \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{d}}\rceil$$ . [opendatastructures.org](http://opendatastructures.org/)

## 11.3 مناقشة وتمارين

الترتيب هو المسألة الخوارزمية الأساسية في علم الحاسوب، وله تاريخ طويل. ويُنسب Knuth [48] خوارزمية الترتيب بالدمج إلى von Neumann (1945). أما الترتيب السريع فينسب إلى Hoare [39]. وخوارزمية الترتيب بالكومة الأصلية تنسب إلى Williams [78]، غير أن النسخة المعروضة هنا (والتي تُبنى فيها الكومة تصاعديًا في زمن $$ O(\ensuremath{\mathtt{n}})$$) تنسب إلى Floyd [28]. أما الحدود الدنيا للترتيب المبني على المقارنات فتبدو من جهل المعرفة (folklore). ويُلخّص الجدول التالي أداء خوارزميات الترتيب المبنية على المقارنات هذه: المقارنات، في الموضع نفسه: الترتيب بالدمج $$ \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$$ أسوأ حالة، لا؛ الترتيب السريع $$ 1.38\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$$ $$ {}+ O(\ensuremath{\mathtt{n}})$$ متوقَّع، نعم؛ الترتيب بالكومة $$ 2\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$$ $$ {}+ O(\ensuremath{\mathtt{n}})$$ أسوأ حالة، نعم. ولكل واحدة من خوارزميات الترتيب المبنية على المقارنات هذه مزاياها وعيوبها. فالترتيب بالدمج يجري أقل عدد من المقارنات ولا يعتمد على العشوائية. وللأسف، فهو يستعمل مصفوفة مساعدة في مرحلة الدمج. وتخصيص هذه المصفوفة قد يكون مكلفًا، وهو نقطة فشل محتملة إذا كانت الذاكرة محدودة. أما الترتيب السريع فهو خوارزمية تعمل في الموضع نفسه، ويأتي في مرتبة ثانية قريبة من حيث عدد المقارنات، لكنه عشوائي، لذا فإن زمن التشغيل هذا غير مضمون دائمًا. والترتيب بالكومة يجري أكبر عدد من المقارنات، لكنه يعمل في الموضع نفسه وهو حتمي. وهناك إعداد واحد يتفوق فيه الترتيب بالدمج بوضوح؛ هو ترتيب قائمة مترابطة (linked list). ففي هذه الحالة لا حاجة إلى المصفوفة المساعدة؛ إذ يمكن دمج قائمتين مترابطتين مرتَّبتين بسهولة شديدة في قائمة مترابطة واحدة مرتَّبة عبر التلاعب بالمؤشرات (راجع التمرين 11.2). أما خوارزميتا الترتيب العدّي والترتيب الجذري الموصوفتان هنا فينسبان إلى Seward [68, Section 2.4.6]. غير أن أشكالًا من الترتيب الجذري استُعملت منذ العشرينيات من القرن الماضي لترتيب بطاقات الثقب بواسطة آلات ترتيب بطاقات مثقّبة (punched card sorting machines). تستطيع هذه الآلات ترتيب حزمة من البطاقات إلى كومتين استنادًا إلى وجود ثقب (أو عدمه) في موضع محدّد على البطاقة. وتكرار هذه العملية لمواضع ثقب مختلفة يعطي تنفيذًا للترتيب الجذري. وأخيرًا، نلاحظ أن الترتيب العدّي والترتيب الجذري يمكن أن يُستعملا لترتيب أنواع أخرى من الأعداد غير الأعداد الصحيحة غير السالبة. فبتعديلات مباشرة على الترتيب العدّي يمكن ترتيب الأعداد الصحيحة، في أي مدى $$ \{a,\ldots,b\}$$ ، في زمن $$ O(\ensuremath{\mathtt{n}}+b-a)$$ . وبالمثل، يمكن للترتيب الجذري أن يرتّب الأعداد الصحيحة في المدى نفسه في زمن $$ O(\ensuremath{\mathtt{n}}(\log_{\ensuremath{\mathtt{n}}}(b-a))$$ . وأخيرًا، يمكن أيضًا لخوارزميتَي الترتيب هاتين أن تُستعملا لترتيب الأعداد العشرية العائمة بصيغة IEEE 754 العشرية العائمة. وذلك لأن صيغة IEEE مصمَّمة لتتيح مقارنة عددين عشريين عائمين بمقارنة قيمتيهما كأنهما عددان صحيحان بترميز ثنائي بإشارة-مقدار (signed-magnitude) [2]. **التمرين 11..1** بيّن تنفيذ الترتيب بالدمج والترتيب بالكومة على مصفوفة إدخال تحتوي $$ 1,7,4,6,2,8,3,5$$ . وقدّم نموذجًا توضيحيًا لتنفيذ واحد ممكن للترتيب السريع على المصفوفة نفسها.

**التمرين 11..2** نفّذ نسخة من خوارزمية الترتيب بالدمج ترتّب DLList دون استعمال مصفوفة مساعدة. (راجع التمرين 3.13.)

**التمرين 11..3** تستعمل بعض تنفيذات $$ \mathtt{quickSort(a,i,n,c)}$$ دائمًا $$ \mathtt{a[i]}$$ كعنصر محوري. أعطِ مثالًا لمصفوفة إدخال طولها $$ \mathtt{n}$$ تجري فيها هذه النسخة عددًا من المقارنات يبلغ $$ \binom{\ensuremath{\mathtt{n}}}{2}$$ .

**التمرين 11..4** تستعمل بعض تنفيذات $$ \mathtt{quickSort(a,i,n,c)}$$ دائمًا $$ \mathtt{a[i+n/2]}$$ كعنصر محوري. أعطِ مثالًا لمصفوفة إدخال طولها $$ \mathtt{n}$$ تجري فيها هذه النسخة عددًا من المقارنات يبلغ $$ \binom{\ensuremath{\mathtt{n}}}{2}$$ .

**التمرين 11..5** بيّن أن أي تنفيذ لـ $$ \mathtt{quickSort(a,i,n,c)}$$ يختار عنصرًا محوريًا بشكل حتمي، دون النظر أولًا في أي قيم ضمن $$ \ensuremath{\mathtt{a[i]}},\ldots,\ensuremath{\mathtt{a[i+n-1]}}$$ ، توجد مصفوفة إدخال طولها $$ \mathtt{n}$$ تجعل هذا التنفيذ يجري $$ \binom{\ensuremath{\mathtt{n}}}{2}$$ مقارنة.

**التمرين 11..6** صمّم Comparator، هو $$ \mathtt{c}$$، يمكنك تمريره كوسيط إلى $$ \mathtt{quickSort(a,i,n,c)}$$ ويجعل الترتيب السريع يجري $$ \binom{\ensuremath{\mathtt{n}}}{2}$$ مقارنة. (تلميح: لا يحتاج المقارن (comparator) لديك فعليًا إلى النظر في القيم قيد المقارنة.)

**التمرين 11..7** حلّل عدد المقارنات المتوقَّع الذي يجريه الترتيب السريع بعناية أكبر قليلًا مما فعل برهان المبرهنة 11.3. وبخاصة، بيّن أن عدد المقارنات المتوقَّع هو $$ 2\ensuremath{\mathtt{n}}H_\ensuremath{\mathtt{n}} -\ensuremath{\mathtt{n}} + H_\ensuremath{\mathtt{n}}$$ .

**التمرين 11..8** صِف مصفوفة إدخال تجعل الترتيب بالكومة يجري عددًا من المقارنات يبلغ على الأقل $$ 2\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}-O(\ensuremath{\mathtt{n}})$$ . وبرّر إجابتك.

**التمرين 11..9** تنفيذ الترتيب بالكومة الموصوف هنا يرتّب العناصر في ترتيب معكوس ثم يعكس المصفوفة. ويمكن تفادي هذه الخطوة الأخيرة بتعريف Comparator جديد ينفي نتائج Comparator الإدخال، وهو $$ \mathtt{c}$$ . اشرح لماذا لا يكون هذا تحسينًا جيدًا. (تلميح: تأمّل كم عدد عمليات النفي التي يلزم إجراؤها مقابل الزمن الذي يستغرقه عكس المصفوفة.)

**التمرين 11..10** أوجد زوجًا آخر من تباديل $$ 1,2,3$$ لا ترتّبها شجرة المقارنات في الشكل 11.6 ترتيبًا صحيحًا.

**التمرين 11..11** اثبت أن $$ \log \ensuremath{\mathtt{n}}! = \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}-O(\ensuremath{\mathtt{n}})$$ .

**التمرين 11..12** اثبت أن الشجرة الثنائية ذات $$ k$$ ورقة ارتفاعها على الأقل $$ \log k$$ .

**التمرين 11..13** اثبت أنه إذا اخترنا ورقة عشوائية من شجرة ثنائية ذات $$ k$$ ورقة، فإن ارتفاع هذه الورقة المتوقَّع هو على الأقل $$ \log k$$ .

**التمرين 11..14** التنفيذ المعطى هنا لـ $$ \mathtt{radixSort(a,k)}$$ يعمل عندما تحوي مصفوفة الإدخال، $$ \mathtt{a}$$ ، على أعداد صحيحة غير سالبة فقط. وسّع هذا التنفيذ بحيث يعمل أيضًا تصحيحًا عندما يحوي $$ \mathtt{a}$$ على أعداد صحيحة سالبة وغير سالبة معًا.

[opendatastructures.org](http://opendatastructures.org/)
