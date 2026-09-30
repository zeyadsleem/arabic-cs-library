---
title: "5. Hash Tables"
lang: ar
source: https://opendatastructures.org/ods-java/5_Hash_Tables.html
---

جداول التجزئة (hash tables) طريقةٌ كفؤة لتخزين عددٍ صغير، $$ \mathtt{n}$$، من الأعداد الصحيحة المأخوذة من مدى واسع $$ U=\{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$. ويشمل مصطلح «جدول التجزئة» مدىً واسعًا من بنى البيانات. يركّز الجزء الأول من هذا الفصل على أكثر تنفيذين شيوعًا لجداول التجزئة: التجزئة بالتسلسل (hashing with chaining) والاستكشاف الخطي (linear probing). وكثيرًا ما تخزّن جداول التجزئة أنواعًا من البيانات ليست أعدادًا صحيحة. وفي هذه الحالة يُسنَد إلى كل عنصر بيانات رمز تجزئة (hash code) صحيح يُستخدَم في جدول التجزئة. ويناقش الجزء الثاني من هذا الفصل كيفية توليد رموز التجزئة هذه. وتتطلب بعض الطرق المستخدَمة في هذا الفصل اختيار أعداد صحيحة عشوائية ضمن مدى محدّد. وفي نماذج الشيفرة تكون بعض هذه الأعداد «العشوائية» ثوابت مكتوبة على نحو صريح (hard-coded). وقد جُمِعت هذه الثوابت باستخدام بتّات عشوائية مولَّدة من ضجيج جوي.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 5.1 ChainedHashTable: التجزئة بالتسلسل

**الأقسام الفرعية**

# 5.1 ChainedHashTable: التجزئة بالتسلسل

تستخدم بنية بيانات ChainedHashTable التجزئة بالتسلسل لتخزين البيانات في صورة مصفوفة، $$ \mathtt{t}$$، من القوائم (lists). ويحتفظ عدد صحيح، $$ \mathtt{n}$$، بمجموع عدد العناصر في جميع القوائم (انظر الشكل 5.1):

```
    List<T>[] t;
    int n;
```

قيمة تجزئة عنصر البيانات $$ \mathtt{x}$$، والمشار إليها بـ $$ \mathtt{hash(x)}$$، هي قيمة ضمن المدى $$ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$$. وتُخزَّن جميع العناصر ذات قيمة التجزئة $$ \mathtt{i}$$ في القائمة عند $$ \mathtt{t[i]}$$. ولمنع أن تصير القوائم طويلة أكثر من اللازم، نُبقي على الشرط الثابت (invariant)

![$\displaystyle \ensuremath{\mathtt{n}} \le \ensuremath{\mathtt{t.length}} $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img1941.png.webp)

بحيث يكون متوسط عدد العناصر المخزَّنة في إحدى هذه القوائم هو $$ \ensuremath{\mathtt{n}}/\ensuremath{\mathtt{t.length}} \le 1$$. ولإضافة عنصر $$ \mathtt{x}$$ إلى جدول التجزئة، نتحقّق أولًا مما إذا كان طول $$ \mathtt{t}$$ يحتاج إلى زيادة، فإن كان ذلك فإننا نُنمّي $$ \mathtt{t}$$. وبعد أن نُنهي ذلك نجزّئ $$ \mathtt{x}$$ لنحصل على عدد صحيح، $$ \mathtt{i}$$، ضمن المدى $$ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$$، ثم نُلحق $$ \mathtt{x}$$ بالقائمة $$ \mathtt{t[i]}$$:

```
    boolean add(T x) {
        if (find(x) != null) return false;
        if (n+1 > t.length) resize();
        t[hash(x)].add(x);
        n++;
        return true;
    }
```

ينطوي نموُّ الجدول، عند الضرورة، على مضاعفة طول $$ \mathtt{t}$$ وإعادة إدراج جميع العناصر في الجدول الجديد. وهذه الاستراتيجية هي نفسها تمامًا المستخدَمة في تنفيذ ArrayStack، وينطبق عليها النتيجة نفسها: ف تكلفة النموّ ثابتة فقط عند الاحتساب بمعدل (amortized) على تسلسل من عمليات الإدراج (انظر المتراجمة 2.1 في الصفحة ![[*]](/images/open-data-structures/5_1_ChainedHashTable_Hashin-crossref.png.webp)). وإلى جانب النموّ، فإن العمل الوحيد الآخر الذي يجري عند إضافة قيمة جديدة $$ \mathtt{x}$$ إلى ChainedHashTable هو إلحاق $$ \mathtt{x}$$ بالقائمة $$ \mathtt{t[hash(x)]}$$. ولكلٍّ من تنفيذي القوائم الموصوفين في الفصلين 2 أو 3، لا يستغرق هذا سوى زمن ثابت. ولإزالة عنصر $$ \mathtt{x}$$ من جدول التجزئة، نمرّ على القائمة $$ \mathtt{t[hash(x)]}$$ حتى نجد $$ \mathtt{x}$$ لنتمكن من إزالته:

```
    T remove(T x) {
        Iterator<T> it = t[hash(x)].iterator();
        while (it.hasNext()) {
            T y = it.next();
            if (y.equals(x)) {
                it.remove();
                n--;
                return y;
            }
        }
        return null;
    }
```

يستغرق هذا زمنًا قدره $$ O(\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{hash(x)}}})$$، حيث يشير $$ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{i}}}$$ إلى طول القائمة المخزَّنة عند $$ \mathtt{t[i]}$$. والبحث عن العنصر $$ \mathtt{x}$$ في جدول تجزئة مشابه. فنجري بحثًا خطيًا في القائمة $$ \mathtt{t[hash(x)]}$$:

```
    T find(Object x) {
        for (T y : t[hash(x)])
            if (y.equals(x))
                return y;
        return null;
    }
```

ومرة أخرى، يستغرق هذا زمنًا متناسبًا مع طول القائمة $$ \mathtt{t[hash(x)]}$$.

يعتمد أداء جدول التجزئة اعتمادًا حاسمًا على اختيار دالة التجزئة (hash function). فدالة التجزئة الجيدة توزّع العناصر بالتساوي على القوائم الـ $$ \mathtt{t.length}$$، بحيث يكون الحجم المتوقَّع للقائمة $$ \mathtt{t[hash(x)]}$$ هو $$ O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{t.length)}} = O(1)$$. وعلى النقيض، فإن دالة التجزئة السيئة تجعل جميع القيم (بما فيها $$ \mathtt{x}$$) تُجزَّأ إلى موضع الجدول نفسه، وعندها يكون حجم القائمة $$ \mathtt{t[hash(x)]}$$ هو $$ \mathtt{n}$$. وفي القسم التالي نصف دالة تجزئة جيدة. 5.1.1 التجزئة الضربية (multiplicative hashing) التجزئة الضربية طريقةٌ كفؤة لتوليد قيم التجزئة بالاعتماد على الحساب النمطي (modular arithmetic) (المُناقَش في القسم 2.3) والقسمة الصحيحة. وهي تستخدم المعامل $$ \ddiv $$ الذي يحسب الجزء الصحيح من ناتج القسمة مع تجاهل الباقي. وصيغته: لأي عددين صحيحين $$ a\ge 0$$ و $$ b\ge 1$$، فإن $$ a\ddiv b = \lfloor a/b\rfloor$$. وفي التجزئة الضربية نستخدم جدول تجزئة حجمه $$ 2^{\ensuremath{\mathtt{d}}}$$ مهما كان العدد الصحيح $$ \mathtt{d}$$ (ويسمى البُعد (dimension)). وصيغة تجزئة العدد الصحيح $$ \ensuremath{\mathtt{x}}\in\{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$ هي

![$\displaystyle \ensuremath{\mathtt{hash(x)}} = ((\ensuremath{\mathtt{z}}\cdot\en... ...htt{w}}}) \ddiv 2^{\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}} \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img1977.png.webp)

هنا $$ \mathtt{z}$$ عددٌ صحيح فردي يُختار عشوائيًا من $$ \{1,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$. ويمكن تنفيذ دالة التجزئة هذه بكفاءة بالغة بمجرد ملاحظة أن عمليات الأعداد الصحيحة تُنفَّذ افتراضيًا بمقياس $$ 2^{\ensuremath{\mathtt{w}}}$$ حيث $$ \ensuremath{\mathtt{w}}$$ عدد البتّات في العدد الصحيح.5.1 (انظر الشكل 5.2.) وإضافةً إلى ذلك، فإن القسمة الصحيحة على $$ 2^{\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}}$$ تعادل إسقاط البتّات $$ \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$$ الأخيرة في التمثيل الثنائي (وهذا يُنفَّذ بإزاحة البتّات إلى اليمين بمقدار $$ \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$$ باستخدام المعامل $$ \mathtt{\text{\ttfamily >>>}}$$). وبهذه الطريقة تكون الشيفرة التي تنفّذ الصيغة أعلاه أبسط من الصيغة نفسها:

```
    int hash(Object x) {
        return (z * x.hashCode()) >>> (w-d);
    }
```

**الشكل 5.2:** تشغيل دالة التجزئة الضربية مع $$ \ensuremath{\mathtt{w}}=32$$ و $$ \ensuremath{\mathtt{d}}=8$$. ![\begin{figure}\begin{center} \resizebox{.98\textwidth}{!}{ \setlength{\arrayru... ... \end{tabular}} \setlength{\arrayrulewidth}{.4pt} \end{center} \end{figure}](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img1991.png.webp) وتبيّن المتراجمة التالية (Lemma)، إن كان برهانها مؤجَّلًا إلى ما بعد في هذا القسم، أن التجزئة الضربية تحسن التخلّص من التصادمات (collisions): **المتراجمة 5..1** *ليكن $$ \mathtt{x}$$ و $$ \mathtt{y}$$ أي قيمتين في $$ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$ بحيث $$ \ensuremath{\mathtt{x}}\neq \ensuremath{\mathtt{y}}$$. وعندئذ $$ \Pr\{\ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{hash(y)}}\} \le 2/2^{\ensuremath{\mathtt{d}}}$$.*

بالمتراجمة 5.1، يصبح تحليل أداء $$ \mathtt{remove(x)}$$ و $$ \mathtt{find(x)}$$ سهلًا: **المتراجمة 5..2** *لكل قيمة بيانات $$ \mathtt{x}$$، يكون الطول المتوقَّع للقائمة $$ \mathtt{t[hash(x)]}$$ هو $$ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + 2$$ على الأكثر، حيث $$ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}}$$ هو عدد تكرارات $$ \mathtt{x}$$ في جدول التجزئة.*

*إثبات*. ليكن $$ S$$ المجموعة (متعددة العناصر) للعناصر المخزَّنة في جدول التجزئة التي لا تساوي $$ \mathtt{x}$$. ولكل عنصر $$ \ensuremath{\mathtt{y}}\in S$$، عرّف المتغيّر الإشاري (indicator variable)

![$\displaystyle I_{\ensuremath{\mathtt{y}}} = \left\{\begin{array}{ll} 1 & \mbox... ...\ensuremath{\mathtt{hash(y)}}$} \\ 0 & \mbox{otherwise} \end{array}\right. $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2008.png.webp)

ولاحظ أن، بحسب المتراجمة 5.1، $$ \mathrm{E}[I_{\ensuremath{\mathtt{y}}}] \le 2/2^{\ensuremath{\mathtt{d}}}=2/\ensuremath{\mathtt{t.length}}$$. ويعطى الطول المتوقَّع للقائمة $$ \mathtt{t[hash(x)]}$$ بـ

| ![$\displaystyle \mathrm{E}\left[\ensuremath{\mathtt{t[hash(x)].size()}}\right]$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2011.png.webp) | ![$\displaystyle =$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2012.png.webp) | ![$\displaystyle \mathrm{E}\left[\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} I_{\ensuremath{\mathtt{y}}}\right]$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2013.png.webp) |  |
| --- | --- | --- | --- |
|  | ![$\displaystyle =$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2014.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} \mathrm{E}[I_{\ensuremath{\mathtt{y}}} ]$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2015.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2016.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} 2/\ensuremath{\mathtt{t.length}}$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2017.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2018.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} 2/\ensuremath{\mathtt{n}}$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2019.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2020.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + (\ensuremath{... ...n}}-\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}})2/\ensuremath{\mathtt{n}}$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2021.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2022.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + 2 \enspace ,$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2023.png.webp) |  |

كما هو مطلوب. ![$ \qedsymbol$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2004.png.webp)

الآن نريد إثبات المتراجمة 5.1، لكننا نحتاج أولًا إلى نتيجة من نظرية الأعداد (number theory). وفي البرهان التالي نستخدم الترميز $$ (b_r,\ldots,b_0)_2$$ للدلالة على $$ \sum_{i=0}^r b_i2^i$$، حيث كل $$ b_i$$ بتّ قيمته 0 أو 1. بمعنى آخر، $$ (b_r,\ldots,b_0)_2$$ هو العدد الصحيح الذي تمثيله الثنائي هو $$ b_r,\ldots,b_0$$. ونستخدم $$ \star$$ للدلالة على بتّ مجهول القيمة. **المتراجمة 5..3** *ليكن $$ S$$ مجموعة الأعداد الفردية في $$ \{1,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$؛ وليكن $$ q$$ و $$ i$$ أي عنصرين في $$ S$$. وعندئذ توجد قيمة واحدة بالضبط $$ \ensuremath{\mathtt{z}}\in S$$ تحقق $$ \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = i$$.*

*إثبات*. بما أن عدد الاختيارات لـ $$ \ensuremath{\mathtt{z}}$$ و $$ i$$ هو نفسه، فإنّه يكفي إثبات وجود قيمة واحدة على الأكثر $$ \ensuremath{\mathtt{z}}\in S$$ تحقق $$ \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = i$$.

ولنفرض، طلبًا للتناقض، وجود قيمتين من هذا النوع $$ \mathtt{z}$$ و $$ \mathtt{z'}$$، بحيث $$ \ensuremath{\mathtt{z}}>\ensuremath{\mathtt{z}}'$$. عندئذ

![$\displaystyle \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = \ensuremath{\mathtt{z}}'q \bmod 2^{\ensuremath{\mathtt{w}}} = i $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2045.png.webp)

إذن

![$\displaystyle (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q\bmod 2^{\ensuremath{\mathtt{w}}} = 0 $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2046.png.webp)

لكن هذا يعني أن

لبعض العدد الصحيح $$ k$$. وبالتفكير في مصطلحات الأعداد الثنائية، لدينا

![$\displaystyle (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q = k\cdot(1,\underbrace{0,\ldots,0}_{\ensuremath{\mathtt{w}}})_2 \enspace , $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2049.png.webp)

بحيث تكون البتّات $$ \mathtt{w}$$ اللاحقة في التمثيل الثنائي لـ $$ (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q$$ كلها أصفارًا.

وفوق ذلك $$ k\neq 0$$، لأن $$ q\neq 0$$ و $$ \ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}'\neq 0$$. وبما أن $$ q$$ فردي، فلا توجد عنده أصفار لاحقة في تمثيله الثنائي:

![$\displaystyle q = (\star,\ldots,\star,1)_2 \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2056.png.webp)

ولأن $$ \vert\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}'\vert < 2^{\ensuremath{\mathtt{w}}}$$، فإن $$ \ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}'$$ يملك عددًا من الأصفار اللاحقة في تمثيله الثاني أقل من $$ \mathtt{w}$$:

![$\displaystyle \ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}' = (\star,\ldots,\star,1,\underbrace{0,\ldots,0}_{<\ensuremath{\mathtt{w}}})_2 \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2060.png.webp)

لذلك يملك حاصل الضرب $$ (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q$$ عددًا من الأصفار اللاحقة في تمثيله الثاني أقل من $$ \mathtt{w}$$:

![$\displaystyle (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q = (\star,\cdots,\star,1,\underbrace{0,\ldots,0}_{<\ensuremath{\mathtt{w}}})_2 \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2063.png.webp)

لذلك لا يمكن أن يحقّق $$ (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q$$ الشرط (5.1)، فينشأ تناقض ويكتمل البرهان. ![$ \qedsymbol$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2037.png.webp)

تنبع فائدة المتراجمة 5.3 من الملاحظة التالية: إذا اختير $$ \mathtt{z}$$ عشوائيًا بانتظام من $$ S$$، فإن $$ \mathtt{zt}$$ يتوزّع بانتظام على $$ S$$. وفي البرهان التالي من المفيد التفكير في التمثيل الثنائي لـ $$ \mathtt{z}$$، وهو يتكوّن من $$ \ensuremath{\mathtt{w}}-1$$ بتّ عشوائي يليه بتّ بقيمة 1.

*إثبات*. [إثبات المتراجمة 5.1] نلاحظ أولًا أن الشرط $$ \ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{hash(y)}}$$ يعادل القول «أن البتّات $$ \mathtt{d}$$ ذات الرتبة العليا في $$ \ensuremath{\mathtt{z}} \ensuremath{\mathtt{x}}\bmod2^{\ensuremath{\mathtt{w}}}$$ والبتّات $$ \mathtt{d}$$ ذات الرتبة العليا في $$ \ensuremath{\mathtt{z}} \ensuremath{\mathtt{y}}\bmod 2^{\ensuremath{\mathtt{w}}}$$ متساوية.» والشرط الضروري لهذا القول هو أن تكون البتّات $$ \mathtt{d}$$ ذات الرتبة العليا في التمثيل الثنائي لـ $$ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$$ إمّا كلها أصفارًا أو كلها آحادًا. أي:

عندما $$ \ensuremath{\mathtt{zx}}\bmod 2^{\ensuremath{\mathtt{w}}} > \ensuremath{\mathtt{zy}}\bmod 2^{\ensuremath{\mathtt{w}}}$$ أو

عندما $$ \ensuremath{\mathtt{zx}}\bmod 2^{\ensuremath{\mathtt{w}}} < \ensuremath{\mathtt{zy}}\bmod 2^{\ensuremath{\mathtt{w}}}$$. لذلك لا علىّ سوى تقييد احتمال أن يبدو $$ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$$ على هيئة (5.2) أو (5.3).

ليكن $$ q$$ العدد الفردية الفريد بحيث $$ (\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}=q2^r$$ لبعض العدد الصحيح $$ r\ge 0$$. وبالمتراجمة 5.3، فإن التمثيل الثنائي لـ $$ \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}}$$ يحتوي $$ \ensuremath{\mathtt{w}}-1$$ بتّ عشوائي يليه بتّ بقيمة 1:

![$\displaystyle \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = (\und... ...{b_{\ensuremath{\mathtt{w}}-1},\ldots,b_{1}}_{\ensuremath{\mathtt{w}}-1},1)_2 $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2089.png.webp)

لذلك، فإن التمثيل الثنائي لـ $$ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod ... ...emath{\mathtt{w}}}=\ensuremath{\mathtt{z}}q2^r\bmod 2^{\ensuremath{\mathtt{w}}}$$ يحتوي $$ \ensuremath{\mathtt{w}}-r-1$$ بتّ عشوائي، يليه بتّ بقيمة 1، يليه $$ r$$ من الأصفار:

![$\displaystyle \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\math... ...ldots,b_{1}}_{\ensuremath{\mathtt{w}}-r-1},1,\underbrace{0,0,\ldots,0}_{r})_2 $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2093.png.webp)

يمكننا الآن إكمال البرهان: إذا كان $$ r > \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$$، فالبتّات $$ \mathtt{d}$$ ذات الرتبة العليا في $$ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$$ تحتوي أصفارًا وآحادًا معًا، ومن ثمّ فإن احتمال أن يبدو $$ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$$ على هيئة (5.2) أو (5.3) هو 0. وإذا كان $$ \ensuremath{\mathtt{r}}=\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$$، فإن احتمال الظهور على هيئة (5.2) هو 0، لكن احتمال الظهور على هيئة (5.3) هو $$ 1/2^{\ensuremath{\mathtt{d}}-1}=2/2^{\ensuremath{\mathtt{d}}}$$ (لأننا يجب أن يكون $$ b_1,\ldots,b_{d-1}=1,\ldots,1$$). وإذا كان $$ r < \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$$، فيجب أن يكون $$ b_{\ensuremath{\mathtt{w}}-r-1},\ldots,b_{\ensuremath{\mathtt{w}}-r-\ensuremath{\mathtt{d}}}=0,\ldots,0$$ أو $$ b_{\ensuremath{\mathtt{w}}-r-1},\ldots,b_{\ensuremath{\mathtt{w}}-r-\ensuremath{\mathtt{d}}}=1,\ldots,1$$. احتمال كلٍّ من هذين الحالتين هو $$ 1/2^{\ensuremath{\mathtt{d}}}$$ وهما متعارضتان تبادليًا، ومن ثمّ فإن احتمال إحداهما هو $$ 2/2^{\ensuremath{\mathtt{d}}}$$. وبهذا يكتمل البرهان. ![$ \qedsymbol$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2071.png.webp)

5.1.2 خلاصة تلخّص النظرية التالية أداء بنية بيانات ChainedHashTable: **نظرية 5..1** *تنفّذ ChainedHashTable واجهة USet. وتجاهلًا لتكلفة استدعاءات $$ \mathtt{grow()}$$، يدعم ChainedHashTable العمليات $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ و $$ \mathtt{find(x)}$$ في زمن متوقَّع قدره $$ O(1)$$ لكل عملية. * *وفضًا عن ذلك، فإن البدء من ChainedHashTable فارغ وأي تسلسل عدده $$ m$$ من عمليات $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ ينتج عنهما زمن كلي قدره $$ O(m)$$ مُنفَقًا خلال جميع استدعاءات $$ \mathtt{grow()}$$.*

#### حواشٍ

... عدد صحيح.5.1 ينطبق هذا على معظم لغات البرمجة ومنها C و C# و C++ و Java. ومن أبرز الاستثناءات Python و Ruby، إذ إن نتيجة عملية على عدد صحيح بطول ثابت قدره $$ \mathtt{w}$$ بت يفيض عن هذا الطول تُرقَّى إلى تمثيل بطول متغيّر. [opendatastructures.org](http://opendatastructures.org/)

## 5.2 LinearHashTable: الاستكشاف الخطي

**الأقسام الفرعية**

# 5.2 LinearHashTable: الاستكشاف الخطي

تستخدم بنية بيانات ChainedHashTable مصفوفة من القوائم، حيث تخزّن القائمة رقم $$ \mathtt{i}$$ جميع العناصر $$ \mathtt{x}$$ التي تتحقق $$ \ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{i}}$$. وهناك بديل يُسمّى العنونة المفتوحة (open addressing) هو تخزين العناصر مباشرةً في مصفوفة، $$ \mathtt{t}$$، بحيث يخزّن كل موضع في $$ \mathtt{t}$$ قيمة واحدة على الأكثر. وهذا هو المنهج الذي يتبعه LinearHashTable الموصوف في هذا القسم. وتُسمّى هذه البنية في بعض المواضع «عنونة مفتوحة مع استكشاف خطي». وتتمثّل الفكرة الأساسية خلف LinearHashTable في أننا نودّ، مثاليًا، تخزين العنصر $$ \mathtt{x}$$ ذي قيمة التجزئة $$ \mathtt{i=hash(x)}$$ في موضع الجدول $$ \mathtt{t[i]}$$. وإذا تعذّر ذلك (لأن عنصرًا ما مخزَّن هناك بالفعل) نحاول تخزينه عند الموضع $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod\ensuremath{\mathtt{t.length}}]$$؛ وإذا لم يكن ذلك ممكنًا، نحاول $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod\ensuremath{\mathtt{t.length}}]$$ وهكذا، حتى نجد مكانًا لـ $$ \mathtt{x}$$. وهناك ثلاثة أنواع من المداخل المخزَّنة في $$ \mathtt{t}$$:

1. قيم البيانات: القيم الفعلية في USet التي نمثّلها؛
2. قيم $$ \mathtt{null}$$: عند المواضع التي لم تُخزَّن فيها أي بيانات من قبل؛ و
3. قيم $$ \mathtt{del}$$: عند المواضع التي خُزِّنت فيها بيانات في وقت ما ثم حُذفت منذ ذلك الحين.

إلى جانب العدّاد $$ \mathtt{n}$$ الذي يتتبّع عدد العناصر في LinearHashTable، فإن عدّادًا آخر، $$ \mathtt{q}$$، يتتبّع عدد عناصر النوعين 1 و3. أي أن $$ \mathtt{q}$$ يساوي $$ \mathtt{n}$$ مضافًا إليه عدد قيم $$ \mathtt{del}$$ في $$ \mathtt{t}$$. ولجعل هذا يعمل بكفاءة نحتاج إلى أن يكون $$ \mathtt{t}$$ أكبر بكثير من $$ \mathtt{q}$$، بحيث تتوفّر في $$ \mathtt{null}$$ قيَم $$ \mathtt{t}$$ كثيرة. وتحافظ عمليات LinearHashTable بالتالي على الشرط الثابت $$ \ensuremath{\mathtt{t.length}}\ge 2\ensuremath{\mathtt{q}}$$. وباختصار، يحتوي LinearHashTable على مصفوفة، $$ \mathtt{t}$$، تخزّن عناصر البيانات، وعلى عددين صحيحين $$ \mathtt{n}$$ و $$ \mathtt{q}$$ يتتبّعان على التوالي عدد عناصر البيانات وعدد القيم غير $$ \mathtt{null}$$ في $$ \mathtt{t}$$. ولأن كثيرًا من دوال التجزئة لا تعمل إلا مع أحجام جداول تكون قوة للعدد 2، فنحن نحتفظ أيضًا بعدد صحيح $$ \mathtt{d}$$ ونحافظ على الشرط الثابت $$ \ensuremath{\mathtt{t.length}}=2^\ensuremath{\mathtt{d}}$$.

```
    T[] t;   // the table
    int n;   // the size
    int d;   // t.length = 2^d
    int q;   // number of non-null entries in t
```

عملية $$ \mathtt{find(x)}$$ في LinearHashTable بسيطة. نبدأ عند المدخل $$ \mathtt{t[i]}$$ في المصفوفة حيث $$ \ensuremath{\mathtt{i}}=\ensuremath{\mathtt{hash(x)}}$$، ونفحص المداخل $$ \mathtt{t[i]}$$ و $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod \ensuremath{\mathtt{t.length}}]$$ و $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod \ensuremath{\mathtt{t.length}}]$$ وهكذا، حتى نجد فهرسًا $$ \mathtt{i'}$$ بحيث إمّا $$ \mathtt{t[i']=x}$$ أو $$ \mathtt{t[i']=null}$$. في الحالة الأولى نُرجع $$ \mathtt{t[i']}$$. وفي الحالة الثانية نستنتج أن $$ \mathtt{x}$$ غير موجود في جدول التجزئة ونُرجع $$ \mathtt{null}$$.

```
    T find(T x) {
        int i = hash(x);
        while (t[i] != null) {
            if (t[i] != del && x.equals(t[i])) return t[i];
            i = (i == t.length-1) ? 0 : i + 1; // increment i
        }
        return null;
    }
```

عملية $$ \mathtt{add(x)}$$ سهلة التنفيذ أيضًا. وبعد التحقق من أن $$ \mathtt{x}$$ غير مخزَّن بالفعل في الجدول (باستخدام $$ \mathtt{find(x)}$$)، نفحص $$ \mathtt{t[i]}$$ و $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod \ensuremath{\mathtt{t.length}}]$$ و $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod \ensuremath{\mathtt{t.length}}]$$ وهكذا، حتى نجد $$ \mathtt{null}$$ أو $$ \mathtt{del}$$ فنخزّن $$ \mathtt{x}$$ عند ذلك الموضع، ونزيد $$ \mathtt{n}$$ و $$ \mathtt{q}$$ بحسب ما يناسب.

```
    boolean add(T x) {
        if (find(x) != null) return false;
        if (2*(q+1) > t.length) resize(); // max 50% occupancy
        int i = hash(x);
        while (t[i] != null && t[i] != del)
            i = (i == t.length-1) ? 0 : i + 1; // increment i
        if (t[i] == null) q++;
        n++;
        t[i] = x;
        return true;
    }
```

والآن أصبح تنفيذ عملية $$ \mathtt{remove(x)}$$ واضحًا. نفحص $$ \mathtt{t[i]}$$ و $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod \ensuremath{\mathtt{t.length}}]$$ و $$ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod \ensuremath{\mathtt{t.length}}]$$ وهكذا حتى نجد فهرسًا $$ \mathtt{i'}$$ بحيث $$ \mathtt{t[i']=x}$$ أو $$ \mathtt{t[i']=null}$$. في الحالة الأولى نضبط $$ \mathtt{t[i']=del}$$ ونُرجع $$ \mathtt{true}$$. وفي الحالة الثانية نستنتج أن $$ \mathtt{x}$$ لم يكن مخزَّنًا في الجدول (وبالتالي لا يمكن حذفه) ونُرجع $$ \mathtt{false}$$.

```
    T remove(T x) {
        int i = hash(x);
        while (t[i] != null) {
            T y = t[i];
            if (y != del && x.equals(y)) { 
                t[i] = del;
                n--;
                if (8*n < t.length) resize(); // min 12.5% occupancy
                return y;
            }
            i = (i == t.length-1) ? 0 : i + 1;  // increment i
        }
        return null;
    }
```

صحة الدوال $$ \mathtt{find(x)}$$ و $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ سهلة التحقّق، وإن كانت تعتمد على استخدام قيم $$ \mathtt{del}$$. ولاحظ أن أيًّا من هذه العمليات لا تضبط مدخلًا غير $$ \mathtt{null}$$ ليصبح $$ \mathtt{null}$$ أبدًا. لذلك، عندما نصل إلى فهرس $$ \mathtt{i'}$$ بحيث $$ \mathtt{t[i']=null}$$، فإن هذا برهان على أن العنصر $$ \mathtt{x}$$ الذي نبحث عنه غير مخزَّن في الجدول؛ فمدخل $$ \mathtt{t[i']}$$ كان $$ \mathtt{null}$$ دائمًا، فلا يوجد سبب يجعل عملية $$ \mathtt{add(x)}$$ سابقة أن تتجاوز الفهرس $$ \mathtt{i'}$$. وتُستدعى الدالة $$ \mathtt{resize()}$$ من $$ \mathtt{add(x)}$$ عندما يتجاوز عدد المداخل غير $$ \mathtt{null}$$ القيمة $$ \ensuremath{\mathtt{t.length}}/2$$، أو من $$ \mathtt{remove(x)}$$ عندما يصبح عدد مداخل البيانات أقل من $$ \mathtt{t.length/8}$$. وتعمل الدالة $$ \mathtt{resize()}$$ كما تعمل دوال $$ \mathtt{resize()}$$ في بنى البيانات الأخرى المعتمدة على المصفوفات. فنجد أصغر عدد صحيح غير سالب $$ \mathtt{d}$$ بحيث $$ 2^{\ensuremath{\mathtt{d}}} \ge 3\ensuremath{\mathtt{n}}$$. ثم نعيد تخصيص المصفوفة $$ \mathtt{t}$$ لتصبح ذات حجم $$ 2^{\ensuremath{\mathtt{d}}}$$، وبعدها نُدرج جميع عناصر النسخة القديمة من $$ \mathtt{t}$$ في النسخة المعاد تحجيمها من $$ \mathtt{t}$$. وأثناء ذلك نعيد ضبط $$ \mathtt{q}$$ مساويةً لـ $$ \mathtt{n}$$، لأن $$ \mathtt{t}$$ المعاد تخصيصه لا يحتوي على قيم $$ \mathtt{del}$$.

```python
    void resize() {
        d = 1;
        while ((1<<d) < 3*n) d++;
        T[] told = t;
        t = newArray(1<<d);
        q = n;
        // insert everything from told
        for (int k = 0; k < told.length; k++) {
            if (told[k] != null && told[k] != del) {
                int i = hash(told[k]);
                while (t[i] != null) 
                    i = (i == t.length-1) ? 0 : i + 1;
                t[i] = told[k];
            }
        }
    }
```

5.2.1 تحليل الاستكشاف الخطي لاحظ أن كل عملية، $$ \mathtt{add(x)}$$ أو $$ \mathtt{remove(x)}$$ أو $$ \mathtt{find(x)}$$، تنتهي بمجرد اكتشافها (أو قبل ذلك) أول مدخل $$ \mathtt{null}$$ في $$ \mathtt{t}$$. والبديهية الكامنة خلف تحليل الاستكشاف الخطي هي أن نصف عناصر $$ \mathtt{t}$$ على الأقل تساوي $$ \mathtt{null}$$، وبالتالي فلا ينبغي أن تستغرق العملية وقتًا طويلًا لإتمامها لأنها ستصطدم سريعًا جدًا بمدخل $$ \mathtt{null}$$. ومع ذلك فلا ينبغي أن نعتمد على هذه البديهية كثيرًا، لأنها ستقودنا إلى استنتاج (خاطئ) بأن عدد المواضع المتوقَّع في $$ \mathtt{t}$$ التي تفحصها عملية ما هو 2 على الأكثر. وفي بقية هذا القسم سنفترض أن جميع قيم التجزئة موزَّعة بشكل مستقل وموحَّد على $$ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$$. وهذا افتراض غير واقعي، لكنه سيمكّننا من تحليل الاستكشاف الخطي. وسنصف لاحقًا في هذا القسم طريقة تُسمّى التجزئة بالجداول (tabulation hashing) تُنتج دالة تجزئة «جيدة بما يكفي» للاستكشاف الخطي. وسنفترض كذلك أن جميع الفهارس المستخدَمة في مواضع $$ \mathtt{t}$$ محسوبة بمقياس $$ \mathtt{t.length}$$، بحيث يكون $$ \mathtt{t[i]}$$ اختصارًا فعليًا لـ $$ \ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}\bmod\ensuremath{\mathtt{t.length}}]$$. نقول إن مقطعًا (run) طوله $$ k$$ يبدأ عند $$ \mathtt{i}$$ يقع عندما تكون جميع مداخل الجدول $$ \ensuremath{\mathtt{t[i]}}, \ensuremath{\mathtt{t[i+1]}},\ldots,\ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}+k-1]$$ غير $$ \mathtt{null}$$ و $$ \ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}-1]=\ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}+k]=\ensuremath{\mathtt{null}}$$. وعدد العناصر غير $$ \mathtt{null}$$ في $$ \mathtt{t}$$ هو بالضبط $$ \mathtt{q}$$، وتضمن الدالة $$ \mathtt{add(x)}$$ في كل الأوقات أن $$ \ensuremath{\mathtt{q}}\le\ensuremath{\mathtt{t.length}}/2$$. وهناك $$ \mathtt{q}$$ عنصرًا $$ \ensuremath{\mathtt{x}}_1,\ldots,\ensuremath{\mathtt{x}}_{\ensuremath{\mathtt{q}}}$$ أُدرجت في $$ \mathtt{t}$$ منذ آخر عملية $$ \mathtt{rebuild()}$$. وافتراضنا، فإن لكلٍّ منها قيمة تجزئة، $$ \ensuremath{\mathtt{hash}}(\ensuremath{\mathtt{x}}_j)$$، موزَّعة بانتظام ومستقلة عن البقية. ومع هذا الإعداد يمكننا إثبات المتراجمة الرئيسية اللازمة لتحليل الاستكشاف الخطي. **المتراجمة 5..4** *ثبّت قيمة $$ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$$. عندئذ يكون احتمال أن مقطعًا طوله $$ k$$ يبدأ عند $$ \mathtt{i}$$ هو $$ O(c^k)$$ حيث $$ 0<c<1$$ ثابت.*

*إثبات*. إذا وقع مقطع طوله $$ k$$ يبدأ عند $$ \mathtt{i}$$، فإن هناك بالضبط $$ k$$ عنصرًا $$ \ensuremath{\mathtt{x}}_j$$ بحيث $$ \ensuremath{\mathtt{hash}}(\ensuremath{\mathtt{x}}_j)\in\{\ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{i}}+k-1\}$$. واحتمال حدوث ذلك هو بالضبط

![$\displaystyle p_k = \binom{\ensuremath{\mathtt{q}}}{k}\left(\frac{k}{\ensuremat... ...{\ensuremath{\mathtt{t.length}}}\right)^{\ensuremath{\mathtt{q}}-k} \enspace , $](/images/open-data-structures/5_2_LinearHashTable_Linear_-img2253.png.webp)

إذ إن كل اختيار لـ $$ k$$ عنصرًا يفرض أن تُجزَّأ هذه $$ k$$ عناصر إلى أحد مواضع $$ k$$، وأن تُجزَّأ العناصر الـ $$ \ensuremath{\mathtt{q}}-k$$ الباقية إلى بقية مواضع الجدول وعددها $$ \ensuremath{\mathtt{t.length}}-k$$.5.2

في الاشتقاق التالي سنحتال قليلًا ونستبدل $$ r!$$ بـ $$ (r/e)^r$$. فتقريب ستيرلنغ (Stirling's Approximation) (القسم 1.3.2) يبيّن أن هذا لا يبتعد عن الحقيقة إلا بعامل قدره $$ O(\sqrt{r})$$. وقد لجأنا إلى ذلك لمجرّد تبسيط الاشتقاق؛ إذ يطلب التمرين 5.4 من القارئ إعادة الحساب بمنتهى الدقة باستخدام تقريب ستيرلنغ كاملًا. وقيمة $$ p_k$$ تبلغ عظمىها عندما تكون $$ \mathtt{t.length}$$ أصغر ما يمكن، وبنية البيانات تحافظ على الشرط الثابت $$ \ensuremath{\mathtt{t.length}} \ge 2\ensuremath{\mathtt{q}}$$، إذن

| $$\displaystyle p_k$$ | $$\displaystyle \le \binom{\ensuremath{\mathtt{q}}}{k}\left(\frac{k}{2\ensuremath... ...ath{\mathtt{q}}-k}{2\ensuremath{\mathtt{q}}}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
| --- | --- | --- | --- | --- |
|  | $$\displaystyle = \left(\frac{\ensuremath{\mathtt{q}}!}{(\ensuremath{\mathtt{q}}-... ...ath{\mathtt{q}}-k}{2\ensuremath{\mathtt{q}}}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
|  | $$\displaystyle \approx \left(\frac{\ensuremath{\mathtt{q}}^{\ensuremath{\mathtt{... ...ath{\mathtt{q}}-k}{2\ensuremath{\mathtt{q}}}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
|  | $$\displaystyle = \left(\frac{\ensuremath{\mathtt{q}}^{k}\ensuremath{\mathtt{q}}^... ...ath{\mathtt{q}}-k}{2\ensuremath{\mathtt{q}}}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
|  | $$\displaystyle = \left(\frac{\ensuremath{\mathtt{q}}k}{2\ensuremath{\mathtt{q}}k... ...math{\mathtt{q}}(\ensuremath{\mathtt{q}}-k)}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
|  | $$\displaystyle = \left(\frac{1}{2}\right)^k \left(\frac{(2\ensuremath{\mathtt{q}}-k)}{2(\ensuremath{\mathtt{q}}-k)}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
|  | $$\displaystyle = \left(\frac{1}{2}\right)^k \left(1+\frac{k}{2(\ensuremath{\mathtt{q}}-k)}\right)^{\ensuremath{\mathtt{q}}-k}$$ |  |  |  |
|  | $$\displaystyle \le \left(\frac{\sqrt{e}}{2}\right)^k \enspace .$$ |  |  |  |

(في الخطوة الأخيرة نستخدم المتراجحة $$ (1+1/x)^x \le e$$، التي تتحقّق لكل $$ x>0$$.) وبما أن $$ \sqrt{e}/{2}< 0.824360636 < 1$$، فقد اكتمل البرهان. ![$ \qedsymbol$](/images/open-data-structures/5_2_LinearHashTable_Linear_-img2247.png.webp)

أصبح استخدام المتراجمة 5.4 لإثبات الحدود العليا لزمن التشغيل المتوقَّع للدوال $$ \mathtt{find(x)}$$ و $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ سهلًا إلى حدٍّ ما. لنفحص أبسط حالة: أن نُنفّذ $$ \mathtt{find(x)}$$ لقيمة $$ \mathtt{x}$$ لم تُخزَّن قط في LinearHashTable. في هذه الحالة تكون $$ \ensuremath{\mathtt{i}}=\ensuremath{\mathtt{hash(x)}}$$ قيمة عشوائية في $$ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$$ مستقلة عن محتوى $$ \mathtt{t}$$. وإذا كان $$ \mathtt{i}$$ جزءًا من مقطع طوله $$ k$$، فإن الزمن اللازم لتنفيذ عملية $$ \mathtt{find(x)}$$ هو $$ O(1+k)$$ على الأكثر. ومن ثمّ يمكن تحديد حدّ أعلى لزمن التشغيل المتوقَّع بـ

![$\displaystyle O\left(1 + \left(\frac{1}{\ensuremath{\mathtt{t.length}}}\right)\... ...xt{\ensuremath{\mathtt{i}} is part of a run of length $k$}\}\right) \enspace . $](/images/open-data-structures/5_2_LinearHashTable_Linear_-img2294.png.webp)

لاحظ أن كل مقطع طوله $$ k$$ يساهم في المجموع الداخلي $$ k$$ مرة، أي بمساهمة إجمالية قدرها $$ k^2$$، ومن ثمّ يمكن إعادة كتابة المجموع أعلاه على الصورة

|  | $$\displaystyle { } O\left(1 + \left(\frac{1}{\ensuremath{\mathtt{t.length}}}\rig... ...fty} k^2\Pr\{\mbox{\ensuremath{\mathtt{i}} starts a run of length $k$}\}\right)$$ |  |
| --- | --- | --- |
|  | $$\displaystyle \le O\left(1 + \left(\frac{1}{\ensuremath{\mathtt{t.length}}}\right)\sum_{i=1}^{\ensuremath{\mathtt{t.length}}}\sum_{k=0}^{\infty} k^2p_k\right)$$ |  |
|  | $$\displaystyle = O\left(1 + \sum_{k=0}^{\infty} k^2p_k\right)$$ |  |
|  | $$\displaystyle = O\left(1 + \sum_{k=0}^{\infty} k^2\cdot O(c^k)\right)$$ |  |
|  | $$\displaystyle = O(1) \enspace .$$ |  |

تأتي الخطوة الأخيرة في هذا الاشتقاق من أن $$ \sum_{k=0}^{\infty} k^2\cdot O(c^k)$$ متتالية متناقصة أُسّيًا.5.3لذلك نستنتج أن زمن التشغيل المتوقَّع لعملية $$ \mathtt{find(x)}$$ على قيمة $$ \mathtt{x}$$ غير الموجودة في LinearHashTable هو $$ O(1)$$.

إذا تجاهلنا تكلفة عملية $$ \mathtt{resize()}$$، فإن التحليل أعلاه يمكّننا من كل ما نحتاجه لتحليل تكلفة العمليات على LinearHashTable. أولًا، فإن تحليل $$ \mathtt{find(x)}$$ أعلاه ينطبق على عملية $$ \mathtt{add(x)}$$ عندما لا يكون $$ \mathtt{x}$$ موجودًا في الجدول. ولتحليل عملية $$ \mathtt{find(x)}$$ عندما يكون $$ \mathtt{x}$$ موجودًا في الجدول، يكفي أن نلاحظ أن ذلك هو نفسه تكلفة عملية $$ \mathtt{add(x)}$$ التي كانت قد أضافت $$ \mathtt{x}$$ إلى الجدول. وأخيرًا، تكلفة عملية $$ \mathtt{remove(x)}$$ هي نفسها تكلفة عملية $$ \mathtt{find(x)}$$. وباختصار، إذا تجاهلنا تكلفة استدعاءات $$ \mathtt{resize()}$$، فإن جميع العمليات على LinearHashTable تعمل بزمن متوقَّع قدره $$ O(1)$$. ويمكن احتساب تكلفة إعادة التحجيم (resize) باستخدام التحليل المُستهلَك (amortized analysis) نفسه الذي أُجري لبنية بيانات ArrayStack في القسم 2.1. 5.2.2 خلاصة تلخّص النظرية التالية أداء بنية بيانات LinearHashTable: **نظرية 5..2** *تنفّذ LinearHashTable واجهة USet. وتجاهلًا لتكلفة استدعاءات $$ \mathtt{resize()}$$، يدعم LinearHashTable العمليات $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ و $$ \mathtt{find(x)}$$ في زمن متوقَّع قدره $$ O(1)$$ لكل عملية. * *وفضًا عن ذلك، فإن البدء من LinearHashTable فارغ وأي تسلسل عدده $$ m$$ من عمليات $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ ينتج عنهما زمن كلي قدره $$ O(m)$$ مُنفَقًا خلال جميع استدعاءات $$ \mathtt{resize()}$$.*

## 5.2.3 التجزئة بالجداول

أثناء تحليل بنية LinearHashTable، أتينا بافتراض قوي جدًا: أن قيم التجزئة لأي مجموعة عناصر $$ \{\ensuremath{\mathtt{x}}_1,\ldots,\ensuremath{\mathtt{x}}_\ensuremath{\mathtt{n}}\}$$، أي $$ \ensuremath{\mathtt{hash}}($$$$ _1),\ldots,\ensuremath{\mathtt{hash}}(\ensuremath{\mathtt{x}}_\ensuremath{\mathtt{n}})$$، موزَّعة بشكل مستقل وموحَّد على المجموعة $$ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$$. وإحدى طرق تحقيق ذلك هي تخزين مصفوفة ضخمة، $$ \mathtt{tab}$$، طولها $$ 2^{\ensuremath{\mathtt{w}}}$$، يكون فيها كل مدخل عددًا صحيحًا عشوائيًا بطول $$ \mathtt{w}$$ بت مستقلًا عن جميع المداخل الأخرى. وبهذه الطريقة يمكننا تنفيذ $$ \mathtt{hash(x)}$$ باستخراج عدد صحيح بطول $$ \mathtt{d}$$ بت من $$ \mathtt{tab[x.hashCode()]}$$:

```
    int idealHash(T x) {
        return tab[x.hashCode() >>> w-d];
    }
```

للأسف، فإن تخزين مصفوفة بحجم $$ 2^{\ensuremath{\mathtt{w}}}$$ مكلف جدًا من حيث استهلاك الذاكرة. والأسلوب الذي تعتمده التجزئة بالجداول هو، بدلًا من ذلك، معاملة الأعداد الصحيحة بطول $$ \mathtt{w}$$ بت كأنها مكوَّنة من $$ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{r}}$$ عددًا صحيحًا، كل واحد منها بطول $$ \ensuremath{\mathtt{r}}$$ بت فقط. وبهذه الطريقة، لا تحتاج التجزئة بالجداول إلا إلى $$ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{r}}$$ مصفوفة، كلٌّ منها بطول $$ 2^{\ensuremath{\mathtt{r}}}$$. وكل المداخل في هذه المصفوفات أعداد صحيحة عشوائية مستقلة بطول $$ \mathtt{w}$$ بت. وللحصول على قيمة $$ \mathtt{hash(x)}$$ نقسّم $$ \mathtt{x.hashCode()}$$ إلى $$ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{r}}$$ عددًا صحيحًا بطول $$ \mathtt{r}$$ بت ونستخدمها كفهارس في هذه المصفوفات. ثم ندمج كل هذه القيم بمعامل XOR على مستوى البتات للحصول على $$ \mathtt{hash(x)}$$. ويبيّن الشيفرة التالية كيف يعمل هذا عندما $$ \ensuremath{\mathtt{w}}=32$$ و $$ \ensuremath{\mathtt{r}}=4$$:

```
    int hash(T x) {
        int h = x.hashCode();
        return (tab[0][h&0xff] 
                 ^ tab[1][(h>>>8)&0xff]
                 ^ tab[2][(h>>>16)&0xff] 
                 ^ tab[3][(h>>>24)&0xff])
                  >>> (w-d);
    }
```

في هذه الحالة يكون $$ \mathtt{tab}$$ مصفوفة ثنائية الأبعاد بأربعة أعمدة و $$ 2^{32/4}=256$$ صفًا. ويمكن التحقّق بسهولة من أن كل قيمة $$ \mathtt{x}$$ لها رمز تجزئة $$ \mathtt{hash(x)}$$ موزَّع بانتظام على $$ \{0,\ldots,2^{\ensuremath{\mathtt{d}}}-1\}$$. وجهدٍ قليل يمكن حتى التحقّق من أن قيم التجزئة لأي زوج من القيم مستقلة. وهذا يعني أن في وسعنا استخدام التجزئة بالجداول بدلًا من التجزئة الضربية في تنفيذ ChainedHashTable. غير أنه ليس صحيحًا أن أي مجموعة من $$ \mathtt{n}$$ قيم متمايزة تعطي مجموعة من $$ \mathtt{n}$$ قيم تجزئة مستقلة. ومع ذلك، فعند استخدام التجزئة بالجداول يظل حدّ النظرية 5.2 ساريًا. أما المراجع اللازمة فتوجد في نهاية هذا الفصل.

#### حواشٍ

... المواضع.5.2 لاحظ أن $$ p_k$$ أكبر من احتمال أن مقطعًا طوله $$ k$$ يبدأ عند $$ \mathtt{i}$$، لأن تعريف $$ p_k$$ لا يتضمّن اشتراط $$ \ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}-1]=\ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}+k]=\ensuremath{\mathtt{null}}$$. ... المتتالية.5.3 ولغة كثير من كتب التفاضل والتكامل، تُجتاز هذه المتتالية اختبار النسبة: يوجد عدد صحيح موجب $$ k_0$$ بحيث إن كان $$ k\ge k_0$$ فإن $$ \frac{(k+1)^2c^{k+1}}{k^2c^k} < 1$$. [opendatastructures.org](http://opendatastructures.org/)

## 5.3 رموز التجزئة

**الأقسام الفرعية**

# 5.3 رموز التجزئة

تُستخدم جداول التجزئة التي ناقشناها في القسم السابق لربط البيانات بمفاتيح صحيحة مكوَّنة من $$ \mathtt{w}$$ بت. وفي كثير من الحالات تكون لدينا مفاتيح ليست أعدادًا صحيحة؛ قد تكون نصوصًا (strings) أو كائنات (objects) أو مصفوفات أو بنى مركّبة أخرى. ولاستخدام جداول التجزئة مع أنواع البيانات هذه، علينا ربطها برموز تجزئة (hash codes) بطول $$ \mathtt{w}$$ بت. وينبغي أن توفّر ربطات رموز التجزئة الخصائص التالية: إذا كان $$ \mathtt{x}$$ و $$ \mathtt{y}$$ متساويين، فإن $$ \mathtt{x.hashCode()}$$ و $$ \mathtt{y.hashCode()}$$ متساويان. وإذا كان $$ \mathtt{x}$$ و $$ \mathtt{y}$$ غير متساويين، فيجب أن يكون احتمال $$ \ensuremath{\mathtt{x.hashCode()}}=\ensuremath{\mathtt{y.hashCode()}}$$ صغيرًا (قريبًا من $$ 1/2^{\ensuremath{\mathtt{w}}}$$). والخاصية الأولى تضمن أنه إذا خزّنّا $$ \mathtt{x}$$ في جدول تجزئة ثم بحثنا لاحقًا عن قيمة $$ \mathtt{y}$$ مساوية لـ $$ \mathtt{x}$$، فسنجد $$ \mathtt{x}$$ -- كما ينبغي. أما الخاصية الثانية فتُقلّل الخسارة الناتجة عن تحويل كائناتنا إلى أعداد صحيحة. فهي تضمن أن الكائنات غير المتساوية تملك عادةً رموز تجزئة مختلفة، ومن ثمّ يُرجَّح أن تُخزَّن في مواضع مختلفة في جدول التجزئة لدينا. 5.3.1 رموز التجزئة لأنواع البيانات البدائية عادةً ما يكون إيجاد رموز تجزئة للأنواع البدائية الصغيرة مثل $$ \mathtt{char}$$ و $$ \mathtt{byte}$$ و $$ \mathtt{int}$$ و $$ \mathtt{float}$$ سهلًا. فلهذه الأنواع تمثيل ثنائي دائمًا، وهذا التمثيل الثنائي يتكوّن عادةً من $$ \mathtt{w}$$ بت أو أقل. (على سبيل المثال، في Java، $$ \mathtt{byte}$$ نوع بطول 8 بت و $$ \mathtt{float}$$ نوع بطول 32 بت.) وفي هذه الحالات، نتعامل مع هذه البتّات بوصفها تمثيلًا لعدد صحيح ضمن المدى $$ \{0,\ldots,2^\ensuremath{\mathtt{w}}-1\}$$. فإذا اختلفت قيمتان فستحصلان على رمزي تجزئة مختلفين، وإذا تساوتا فستحصلان على رمز التجزئة نفسه. وهناك القليل من أنواع البيانات البدائية المكوَّنة من أكثر من $$ \mathtt{w}$$ بت، عادةً $$ c\ensuremath{\mathtt{w}}$$ بت حيث $$ c$$ عدد صحيح ثابت. (ومن أمثلتها نوعا $$ \mathtt{long}$$ و $$ \mathtt{double}$$ في Java مع $$ c=2$$.) ويمكن التعامل مع أنواع البيانات هذه بوصفها كائنات مركّبة من $$ c$$ أجزاء، كما سيأتي في القسم التالي. 5.3.2 رموز التجزئة للكائنات المركّبة بالنسبة إلى كائن مركّب، نريد إنشاء رمز تجزئة بدمج رموز التجزئة الفردية لأجزاء الكائن المكوّنة له. وهذا ليس بالأمر السهل كما يبدو. فعلى الرغم من وجود طرق كثيرة — بل متناهية — للقيام بذلك (مثلًا دمج رموز التجزئة بعمليات XOR على مستوى البتات)، إلا أن كثيرًا من هذه الحيل يسهل إبطالها (انظر التمارين 5.7-5.9). لكن إذا كان المرء مستعدًا لإجراء عمليات حسابية بدقة $$ 2\ensuremath{\mathtt{w}}$$ بت، فإن هناك طرقًا بسيطة ومتينة متاحة. لنفترض لدينا كائن مكوَّن من عدة أجزاء $$ P_0,\ldots,P_{r-1}$$ رموز تجزئتها $$ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$$. عندئذ يمكننا اختيار أعداد صحيحة عشوائية مستقلة متبادلة بطول $$ \mathtt{w}$$ بت هي $$ \ensuremath{\mathtt{z}}_0,\ldots,\ensuremath{\mathtt{z}}_{r-1}$$، وعددًا صحيحًا فرديًا عشوائيًا بطول $$ 2\ensuremath{\mathtt{w}}$$ بت هو $$ \mathtt{z}$$، ثم نحسب رمز تجزئة لكائننا بمعادلة

![$\displaystyle h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})... ...2\ensuremath{\mathtt{w}}}\right) \ddiv 2^{\ensuremath{\mathtt{w}}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2399.png.webp)

لاحظ أن رمز التجزئة هذا يتضمّن خطوة أخيرة (الضرب في $$ \mathtt{z}$$ والقسمة على $$ 2^{\ensuremath{\mathtt{w}}}$$) تستخدم دالة التجزئة الضربية من القسم 5.1.1 لتحويل النتيجة الوسيطة ذات $$ 2\ensuremath{\mathtt{w}}$$ بت واختصارها إلى نتيجة نهائية ذات $$ \mathtt{w}$$ بت. وفيما يلي مثال على تطبيق هذه الطريقة على كائن مركّب بسيط من ثلاثة أجزاء $$ \mathtt{x0}$$ و $$ \mathtt{x1}$$ و $$ \mathtt{x2}$$:

```python
    int hashCode() {
        // random numbers from rand.org
        long[] z = {0x2058cc50L, 0xcb19137eL, 0x2cb6b6fdL}; 
        long zz = 0xbea0107e5067d19dL;

        // convert (unsigned) hashcodes to long
        long h0 = x0.hashCode() & ((1L<<32)-1);
        long h1 = x1.hashCode() & ((1L<<32)-1);
        long h2 = x2.hashCode() & ((1L<<32)-1);
        
        return (int)(((z[0]*h0 + z[1]*h1 + z[2]*h2)*zz)
                     >>> 32);
    }
```

تبيّن النظرية التالية أن هذه الطريقة، إلى جانب بساطة تنفيذها، جيدة ويمكن إثبات ذلك:

**نظرية 5..3** *ليكن $$ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$$ و $$ \ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1}$$ كلٌّ منهما تسلسلًا من الأعداد الصحيحة بطول $$ \mathtt{w}$$ بت ضمن $$ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$، ولنفترض أن $$ \ensuremath{\mathtt{x}}_i \neq \ensuremath{\mathtt{y}}_i$$ لفهرس واحد على الأقل $$ i\in\{0,\ldots,r-1\}$$. عندئذ*

![$\displaystyle \Pr\{ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_... ...suremath{\mathtt{y}}_{r-1}) \} \le 3/2^{\ensuremath{\mathtt{w}}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2413.png.webp)

*إثبات*. سنتجاهل أولًا خطوة التجزئة الضربية الأخيرة، ونرى لاحقًا كيف تساهم تلك الخطوة. نعرّف:

![$\displaystyle h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}... ...\ensuremath{\mathtt{x}}_j\right)\bmod 2^{2\ensuremath{\mathtt{w}}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2415.png.webp)

لنفترض أن $$ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}) = h'(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$$. ويمكن إعادة كتابة ذلك على الصورة:

حيث

![$\displaystyle t = \left(\sum_{j=0}^{i-1} \ensuremath{\mathtt{z}}_j(\ensuremath{... ...tt{y}}_j-\ensuremath{\mathtt{x}}_j)\right) \bmod 2^{2\ensuremath{\mathtt{w}}} $](/images/open-data-structures/5_3_Hash_Codes-img2418.png.webp)

إذا افترضنا، دون حدّ من العمومية، أن $$ \ensuremath{\mathtt{x}}_i> \ensuremath{\mathtt{y}}_i$$، فإن (5.4) يصير

إذ إن كلًا من $$ \ensuremath{\mathtt{z}}_i$$ و $$ (\ensuremath{\mathtt{x}}_i-\ensuremath{\mathtt{y}}_i)$$ هو $$ 2^{\ensuremath{\mathtt{w}}}-1$$ على الأكثر، فإن حاصل ضربهما هو $$ 2^{2\ensuremath{\mathtt{w}}}-2^{\ensuremath{\mathtt{w}}+1}+1 < 2^{2\ensuremath{\mathtt{w}}}-1$$ على الأكثر. ويفترض أن $$ \ensuremath{\mathtt{x}}_i-\ensuremath{\mathtt{y}}_i\neq 0$$، ومن ثمّ يكون للمعادلة (5.5) حل واحد على الأكثر في $$ \ensuremath{\mathtt{z}}_i$$. لذلك، وبما أن $$ \ensuremath{\mathtt{z}}_i$$ و $$ t$$ مستقلان ( $$ \ensuremath{\mathtt{z}}_0,\ldots,\ensuremath{\mathtt{z}}_{r-1}$$ مستقلة متبادلة)، فإن احتمال اختيار $$ \ensuremath{\mathtt{z}}_i$$ بحيث $$ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})=h'(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$$ هو $$ 1/2^{\ensuremath{\mathtt{w}}}$$ على الأكثر.

الخطوة الأخيرة في دالة التجزئة هي تطبيق التجزئة الضربية لاختصار نتيجتنا الوسيطة ذات $$ 2\ensuremath{\mathtt{w}}$$ بت، أي $$ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})$$، إلى نتيجة نهائية ذات $$ \mathtt{w}$$ بت، أي $$ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})$$. وبالنظرية 5.3، إذا كان $$ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})\neq h'(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$$، فإن $$ \Pr\{h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}) = h(\en... ...y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})\} \le 2/2^{\ensuremath{\mathtt{w}}}$$. وباختصار،

|  | $$\displaystyle \Pr\left\{\begin{array}{l} h(\ensuremath{\mathtt{x}}_0,\ldots,\en... ...suremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})\end{array}\right\}$$ |  |
| --- | --- | --- |
|  | $$\displaystyle = \Pr\left\{\begin{array}{ll} \mbox{$h'(\ensuremath{\mathtt{x}}_0... ...emath{\mathtt{y}}_{r-1})\ddiv 2^{\ensuremath{\mathtt{w}}}$} \end{array}\right\}$$ |  |
|  | $$\displaystyle \le 1/2^{\ensuremath{\mathtt{w}}} + 2/2^{\ensuremath{\mathtt{w}}} = 3/2^{\ensuremath{\mathtt{w}}} \enspace . \qedhere$$ |  |

![$ \qedsymbol$](/images/open-data-structures/5_3_Hash_Codes-img2414.png.webp)

5.3.3 رموز التجزئة للمصفوفات والنصوص تنجح طريقة القسم السابق جيدًا مع الكائنات التي لها عدد ثابت من المكوّنات. غير أنها تنهار عندما نريد استخدامها مع كائنات ذات عدد متغيّر من المكوّنات، لأنها تتطلّب عددًا صحيحًا عشوائيًا بطول $$ \mathtt{w}$$ بت هو $$ \ensuremath{\mathtt{z}}_i$$ لكل مكوّن. يمكننا استخدام تسلسل شبه عشوائي لتوليد أكبر عدد نحتاجه من $$ \ensuremath{\mathtt{z}}_i$$، لكن عندئذٍ لا تكون $$ \ensuremath{\mathtt{z}}_i$$ مستقلة متبادلة، ويصعب عندئذٍ إثبات أن الأعداد شبه العشوائية لا تتفاعل بصورة ضارة مع دالة التجزئة التي نستخدمها. وعلى وجه التحديد، لا تعود قيمتا $$ t$$ و $$ \ensuremath{\mathtt{z}}_i$$ في برهان النظرية 5.3 مستقلتين. وهناك نهج أدقّ هو بناء رموز التجزئة على متعددات الحدود (polynomials) فوق الحقول الأولية (prime fields)؛ وهذه ليست سوى متعددات حدود عادية تُقَيَّم بمقياس عدد أولي ما، $$ \mathtt{p}$$. ويقوم هذا النهج على النظرية التالية التي تقول إن متعددات الحدود فوق الحقول الأولية تتصرف إلى حدٍّ كبير كالمتعددات الحدود المعتادة: **نظرية 5..4** *ليكن $$ \ensuremath{\mathtt{p}}$$ عددًا أوليًا، وليكن $$ f(\ensuremath{\mathtt{z}}) = \ensuremath{\mathtt{x}}_0\ensuremath{\mathtt{z}}^... ...tt{z}}^1 + \cdots + \ensuremath{\mathtt{x}}_{r-1}\ensuremath{\mathtt{z}}^{r-1}$$ متعدد حدود غير تافه معاملات $$ \ensuremath{\mathtt{x}}_i\in\{0,\ldots,\ensuremath{\mathtt{p}}-1\}$$. عندئذ تكون للمعادلة $$ f(\ensuremath{\mathtt{z}})\bmod \ensuremath{\mathtt{p}} = 0$$ حلول عددها $$ r-1$$ على الأكثر من أجل $$ \ensuremath{\mathtt{z}}\in\{0,\ldots,p-1\}$$.*

لاستخدام النظرية 5.4، نجزّئ تسلسلًا من الأعداد الصحيحة $$ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$$، حيث كل $$ \ensuremath{\mathtt{x}}_i\in \{0,\ldots,\ensuremath{\mathtt{p}}-2\}$$، باستخدام عدد صحيح عشوائي $$ \ensuremath{\mathtt{z}}\in\{0,\ldots,\ensuremath{\mathtt{p}}-1\}$$ عبر الصيغة

![$\displaystyle h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})... ...}}-1)\ensuremath{\mathtt{z}}^r \right)\bmod \ensuremath{\mathtt{p}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2458.png.webp)

لاحظ الحدّ الإضافي $$ (\ensuremath{\mathtt{p}}-1)\ensuremath{\mathtt{z}}^r$$ في نهاية الصيغة. ومن المفيد التفكير في $$ (\ensuremath{\mathtt{p}}-1)$$ بوصفه العنصر الأخير، $$ \ensuremath{\mathtt{x}}_r$$، في التسلسل $$ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r}$$. ولاحظ أن هذا العنصر يختلف عن كل عنصر آخر في التسلسل (وكلٌّ منها يقع في المجموعة $$ \{0,\ldots,\ensuremath{\mathtt{p}}-2\}$$). ويمكننا أن نرى في $$ \ensuremath{\mathtt{p}}-1$$ علامة نهاية تسلسل. وتبيّن النظرية التالية، التي تتناول حالة تسلسلين بالطول نفسه، أن دالة التجزئة هذه تحقّق عائدًا جيدًا بالمقابل مع مقدار التوزيع العشوائي المحدود اللازم لاختيار $$ \mathtt{z}$$: **نظرية 5..5** *ليكن $$ \ensuremath{\mathtt{p}}>2^{\ensuremath{\mathtt{w}}}+1$$ عددًا أوليًا، وليكن $$ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$$ و $$ \ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1}$$ كلٌّ منهما تسلسلًا من الأعداد الصحيحة بطول $$ \mathtt{w}$$ بت ضمن $$ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$، ولنفترض أن $$ \ensuremath{\mathtt{x}}_i \neq \ensuremath{\mathtt{y}}_i$$ لفهرس واحد على الأقل $$ i\in\{0,\ldots,r-1\}$$. عندئذ*

![$\displaystyle \Pr\{ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_... ...math{\mathtt{y}}_{r-1}) \} \le (r-1)/\ensuremath{\mathtt{p}} \} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2473.png.webp)

*إثبات*. يمكن إعادة كتابة المعادلة $$ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}) = h(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$$ على الصورة

بما أن $$ \ensuremath{\mathtt{x}}_\ensuremath{\mathtt{i}}\neq \ensuremath{\mathtt{y}}_\ensuremath{\mathtt{i}}$$، فإن هذا المتعدد غير تافه. لذلك، وبالنظرية 5.4، فإن له حلولًا عددها $$ r-1$$ على الأكثر في $$ \mathtt{z}$$. ومن ثمّ فإن احتمال أن نختار $$ \mathtt{z}$$ ليكون أحد هذه الحلول هو $$ (r-1)/\ensuremath{\mathtt{p}}$$ على الأكثر. ![$ \qedsymbol$](/images/open-data-structures/5_3_Hash_Codes-img2474.png.webp)

لاحظ أن دالة التجزئة هذه تتعامل أيضًا مع الحالة التي يكون فيها التسلسلان مختلفي الطول، حتى عندما يكون أحد التسلسلين بادئةً (prefix) للآخر. وذلك لأن هذه الدالة تُجزّئ فعليًا التسلسل اللانهائي

![$\displaystyle \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}, \ensuremath{\mathtt{p}}-1,0,0,\ldots \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2482.png.webp)

وهذا يضمن أنه إذا كان لدينا تسلسلان بطول $$ r$$ و $$ r'$$ مع $$ r > r'$$، فإن هذين التسلسلين يختلفان عند الفهرس $$ i=r$$. وفي هذه الحالة، تصير (5.6)

![$\displaystyle \left( \sum_{i=0}^{i=r'-1}(\ensuremath{\mathtt{x}}_i-\ensuremath... ...nsuremath{\mathtt{z}}^{r} \right)\bmod \ensuremath{\mathtt{p}} = 0 \enspace , $](/images/open-data-structures/5_3_Hash_Codes-img2487.png.webp)

والتي، بحسب النظرية 5.4، لها حلول عددها $$ r$$ على الأكثر في $$ \ensuremath{\mathtt{z}}$$. وهذا مقترنًا بالنظرية 5.5 يكفي لإثبات النظرية الأكثر عمومية التالية:

**نظرية 5..6** *ليكن $$ \ensuremath{\mathtt{p}}>2^{\ensuremath{\mathtt{w}}}+1$$ عددًا أوليًا، وليكن $$ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$$ و $$ \ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r'-1}$$ تسلسلين متمايزين من الأعداد الصحيحة بطول $$ \mathtt{w}$$ بت ضمن $$ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$$. عندئذ*

![$\displaystyle \Pr\{ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_... ...{\mathtt{y}}_{r-1}) \} \le \max\{r,r'\}/\ensuremath{\mathtt{p}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2495.png.webp)

تبيّن شيفرة المثال التالية كيف تُطبَّق دالة التجزئة هذه على كائن يحتوي على مصفوفة، $$ \mathtt{x}$$، من القيم:

```python
    int hashCode() {
        long p = (1L<<32)-5;   // prime: 2^32 - 5
        long z = 0x64b6055aL;  // 32 bits from random.org
        int z2 = 0x5067d19d;   // random odd 32 bit number
        long s = 0;
        long zi = 1;
        for (int i = 0; i < x.length; i++) {
            // reduce to 31 bits
            long xi = (x[i].hashCode() * z2) >>> 1; 
            s = (s + zi * xi) % p;
            zi = (zi * z) % p;    
        }
        s = (s + zi * (p-1)) % p;
        return (int)s;
    }
```

تقدّم الشيفرة السابقة بعضًا من احتمال التصادم مقابل سهولة التنفيذ. وعلى وجه التحديد، فهي تطبّق دالة التجزئة الضربية من القسم 5.1.1، مع $$ \ensuremath{\mathtt{d}}=31$$، لاختصار $$ \mathtt{x[i].hashCode()}$$ إلى قيمة بطول 31 بت. وذلك حتى يمكن تنفيذ الجمعيات والضربيات التي تُجرى بمقياس العدد الأولي $$ \ensuremath{\mathtt{p}}=2^{32}-5$$ باستخدام حساب غير موقَّع بدقة 63 بت. ومن ثمّ فإن احتمال تسلسلين مختلفين، أحدهما أطول وطوله $$ r$$، أن يكون لهما رمز التجزئة نفسه هو

![$\displaystyle 2/2^{31} + r/(2^{32}-5) $](/images/open-data-structures/5_3_Hash_Codes-img2501.png.webp)

بدلًا من $$ r/(2^{32}-5)$$ المحدَّد في النظرية 5.6. [opendatastructures.org](http://opendatastructures.org/)

## 5.4 مناقشة وتمارين

تمثّل جداول التجزئة ورموز التجزئة حقلًا بحثيًا هائلًا ونشطًا لم يقتصر هذا الفصل على إلماح سريع به. تحتوي «ببليوغرافيا التجزئة» (Bibliography on Hashing) على الإنترنت [10] على نحو 2000 مدخل. وتوجد تنوّعات كثيرة من تنفيذي جداول التجزئة. والتنفيذ الموصوف في القسم 5.1 معروف بالتجزئة بالتسلسل (hashing with chaining) (يحتوي كل مدخل في المصفوفة على سلسلة (List) من العناصر). وتعود التجزئة بالتسلسل إلى مذكرة داخلية من IBM كتبها H. P. Luhn وتاريخها يناير 1953. ويبدو أن هذه المذكرة أيضًا إحدى أقدم الإشارات إلى القوائم المترابطة (linked lists). والبديل عن التجزئة بالتسلسل هو ما تعتمده مخططات العنونة المفتوحة، حيث تُخزَّن جميع البيانات مباشرةً في مصفوفة. ومن هذه المخططات بنية LinearHashTable في القسم 5.2. وقد اقتُرح هذه الفكرة أيضًا، بشكل مستقل، من مجموعة في IBM في خمسينيات القرن الماضي. ويجب أن تتعامل مخططات العنونة المفتوحة مع مسألة معالجة التصادم (collision resolution): الحالة التي تُجزَّأ فيها قيمتان إلى موضع المصفوفة نفسه. وتوجد استراتيجيات مختلفة لمعالجة التصادم؛ وهي تقدّم ضمانات أداء مختلفة، وغالبًا ما تتطلّب دوال تجزئة أكثر تطوّرًا من تلك الموصوفة هنا. وهناك فئة أخرى من تنفيذي جداول التجزئة هي ما تُسمّى طرائق التجزئة التامّة (perfect hashing). وهذه طرائق تستغرق فيها عمليات $$ \mathtt{find(x)}$$ زمنًا قدره $$ O(1)$$ في أسوأ الحالات. وبالنسبة لمجموعات البيانات الساكنة، يمكن تحقيق ذلك بإيجاد دوال تجزئة تامّة (perfect hash functions) للبيانات؛ وهذه دوال تربط كل قطعة بيانات بموضع فريد في المصفوفة. أما البيانات التي تتغيّر مع الزمن، فتشمل طرائق التجزئة التامّة جداول التجزئة ثنائية المستوى من نوع FKS [31,24] وتجزئة cuckoo [57]. ومن المرجّح أن دوال التجزئة المقدَّمة في هذا الفصل من بين أكثر الأساليب العملية المعروفة اليوم التي يمكن إثبات أنها تعمل جيدًا مع أي مجموعة بيانات. وهناك أساليب أخرى جيدة يمكن إثباتها تعود إلى العمل الرائد لـ Carter و Wegman اللذين أدخلا مفهوم التجزئة الشاملة (universal hashing) ووصفا عدة دوال تجزئة لسيناريوهات مختلفة [14]. أمّا التجزئة بالجداول الموصوفة في القسم 5.2.3 فينسبها Carter و Wegman [14]، لكن تحليلها عند تطبيقها على الاستكشاف الخطي (وعدة مخططات أخرى لجداول التجزئة) فينسبه إلى P ![{\v{a\/}}\kern.05em](/images/open-data-structures/5_4_Discussion_Exercises-img2583.png.webp) tra ![{\c{s\/}}](/images/open-data-structures/5_4_Discussion_Exercises-img2584.png.webp) cu و Thorup [60]. وفكرة التجزئة الضربية قديمة جدًا ويبدو أنها جزء من التراث المتعلق بالتجزئة [48, Section 6.4]. لكن فكرة اختيار المُضاعِف $$ \mathtt{z}$$ عددًا فرديًا عشوائيًا، وكذلك التحليل في القسم 5.1.1، فينسبها إلى Dietzfelbinger وآخرون [23]. وهذه النسخة من التجزئة الضربية من أبسط النسخ، لكن احتمال التصادم فيها البالغ $$ 2/2^{\ensuremath{\mathtt{d}}}$$ أكبر بمعامل اثنين مما يمكن توقّعه مع دالة عشوائية من $$ 2^{\ensuremath{\mathtt{w}}}\to 2^{\ensuremath{\mathtt{d}}}$$. وتستخدم طريقة التجزئة بالضرب-والجمع (multiply-add hashing) الدالة

![$\displaystyle h(\ensuremath{\mathtt{x}}) = ((\ensuremath{\mathtt{z}}\ensuremath... ...math{\mathtt{2w}}}) \ddiv 2^{\ensuremath{\mathtt{2w}}-\ensuremath{\mathtt{d}}} $](/images/open-data-structures/5_4_Discussion_Exercises-img2508.png.webp)

حيث $$ \mathtt{z}$$ و $$ \mathtt{b}$$ يُختار كلٌّ منهما عشوائيًا من $$ \{0,\ldots,2^{\ensuremath{\mathtt{2w}}}-1\}$$. وتجزئة الضرب-والجمع (multiply-add hashing) ذات احتمال تصادم يبلغ $$ 1/2^{\ensuremath{\mathtt{d}}}$$ فقط [21]، لكنها تتطلّب حسابًا بدقة $$ 2\ensuremath{\mathtt{w}}$$ بت.

توجد عدة طرق للحصول على رموز تجزئة من تسلسلات ثابتة الطول من الأعداد الصحيحة بطول $$ \mathtt{w}$$ بت. ومن أسرعها على الإطلاق [11] هي الدالة

![\begin{displaymath}\begin{array}{l} h(\ensuremath{\mathtt{x}}_0,\ldots,\ensurem... ...htt{w}}})\right) \bmod 2^{2\ensuremath{\mathtt{w}}} \end{array}\end{displaymath}](/images/open-data-structures/5_4_Discussion_Exercises-img2515.png.webp)

حيث $$ r$$ زوجي و $$ \ensuremath{\mathtt{a}}_0,\ldots,\ensuremath{\mathtt{a}}_{r-1}$$ تُختار عشوائيًا من $$ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}\}$$. وينتج عن ذلك رمز تجزئة بطول $$ 2\ensuremath{\mathtt{w}}$$ بت احتمال تصادمه $$ 1/2^{\ensuremath{\mathtt{w}}}$$. ويمكن اختصاره إلى رمز تجزئة بطول $$ \mathtt{w}$$ بت باستخدام التجزئة الضربية (أو التجزئة بالضرب-والجمع). وهذه الطريقة سريعة لأنها تتطلّب $$ r/2$$ فقط من الضربيات ذات $$ 2\ensuremath{\mathtt{w}}$$ بت، في حين تتطلّب الطريقة الموصوفة في القسم 5.3.2 ما مقداره $$ r$$ ضربة. (وتحدث عمليات $$ \bmod$$ ضمنيًا باستخدام حساب بطول $$ \mathtt{w}$$ للجمعيات وبحساب بطول $$ 2\ensuremath{\mathtt{w}}$$ للضربيات على التوالي.)

طريقة القسم 5.3.3، أي استخدام متعددات الحدود فوق الحقول الأولية لتجزئة المصفوفات والنصوص متغيّرة الطول، ترجع إلى Dietzfelbinger وآخرون [22]. ولأنها تستخدم المعامل $$ \bmod$$ الذي يعتمد على تعليمة آليّة مكلفة، فإنها للأسف ليست سريعة جدًا. وتختار بعض صيغ هذه الطريقة العدد الأولي $$ \mathtt{p}$$ من الشكل $$ 2^{\ensuremath{\mathtt{w}}}-1$$، وعندها يمكن استبدال المعامل $$ \bmod$$ بعمليتي الجمع ( $$ \mathtt{+}$$ ) و AND على مستوى البتات ( $$ \mathtt{\text{\ttfamily\&}}$$ ) [47, Section 3.6]. ومن الخيارات الأخرى تطبيق إحدى الطرق السريعة للنصوص ثابتة الطول على كتل بطول $$ c$$ حيث $$ c>1$$ ثابت، ثم تطبيق طريقة الحقل الأولي على التسلسل الناتج من رموز التجزئة وعددها $$ \lceil r/c\rceil$$. **تمرين 5..1** تمنح جامعةٌ معيّنة كلًا من طلابها رقمًا جامعيًا عند أول تسجيل له في أي دورة. وهذه الأعداد أعداد صحيحة متتابعة بدأت من 0 قبل سنوات طويلة واليوم تقع في الملايين. لنفترض لدينا صفٌّ من مئة طالب في السنة الأولى ونريد إسناد رموز تجزئة إليهم بالاستناد إلى أرقامهم الجامعية. فهل استخدام الرقم الأولين من الرقم الجامعي أم آخر رقمين فيه أكثر منطقية؟ برّر إجابتك.

**تمرين 5..2** تأمّل مخطّط التجزئة في القسم 5.1.1، ولنفرض $$ \ensuremath{\mathtt{n}}=2^{\ensuremath{\mathtt{d}}}$$ و $$ \ensuremath{\mathtt{d}}\le \ensuremath{\mathtt{w}}/2$$. بيّن أن لكل اختيار للمُضاعِف، $$ \mathtt{z}$$، توجد $$ \mathtt{n}$$ قيمة كلها تملك رمز التجزئة نفسه. (تلميح: هذا سهل ولا يحتاج إلى نظرية الأعداد.) وبمعطى المُضاعِف، $$ \mathtt{z}$$، صِف $$ \mathtt{n}$$ قيمة كلها تملك رمز التجزئة نفسه. (تلميح: هذا أصعب ويحتاج إلى بعض أساسيات نظرية الأعداد.)

**تمرين 5..3** أثبت أن الحدّ $$ 2/2^{\ensuremath{\mathtt{d}}}$$ في المتراجمة 5.1 هو أفضل حدّ ممكن، ببيّن أنه إذا كان $$ x=2^{\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}-2}$$ و $$ \ensuremath{\mathtt{y}}=3\ensuremath{\mathtt{x}}$$، فإن $$ \Pr\{\ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{hash(y)}}\}=2/2^{\ensuremath{\mathtt{d}}}$$. (تلميح: انظر إلى التمثيلين الثنائيين لـ $$ \ensuremath{\mathtt{zx}}$$ و $$ \ensuremath{\mathtt{z}}3\ensuremath{\mathtt{x}}$$ واستخدم الحقيقة $$ \ensuremath{\mathtt{z}}3\ensuremath{\mathtt{x}} = \ensuremath{\mathtt{z}}x\ensuremath{\mathtt{+2}}z\ensuremath{\mathtt{x}}$$.)

**تمرين 5..4** أعد إثبات المتراجمة 5.4 باستخدام الصيغة الكاملة لتقريب ستيرلنغ المعطاة في القسم 1.3.2.

**تمرين 5..5** تأمّل الصيغة المبسّطة التالية لشيفرة إضافة عنصر $$ \mathtt{x}$$ إلى LinearHashTable، وهي ببساطة تخزّن $$ \mathtt{x}$$ في أول مدخل $$ \mathtt{null}$$ في المصفوفة تجده. واشرح لماذا قد تكون بطيئة جدًا، مع إعطاء مثالٍ لتسلسل من $$ O(\ensuremath{\mathtt{n}})$$ من عمليات $$ \mathtt{add(x)}$$ و $$ \mathtt{remove(x)}$$ و $$ \mathtt{find(x)}$$ يستغرق زمنًا من المرتبة $$ \ensuremath{\mathtt{n}}^2$$ في التنفيذ.

```
    boolean addSlow(T x) {
        if (2*(q+1) > t.length) resize(); // max 50% occupancy
        int i = hash(x);
        while (t[i] != null) {
            if (t[i] != del && x.equals(t[i])) return false;
            i = (i == t.length-1) ? 0 : i + 1; // increment i
        }
        t[i] = x;
        n++; q++;
        return true;
    }
```

**تمرين 5..6** عملت الإصدارات المبكِّرة من دالة Java $$ \mathtt{hashCode()}$$ لصنف String على عدم استخدام كل المحارف الموجودة في النصوص الطويلة. فمثلًا، كان رمز التجزئة لنص من ستة عشر محرفًا يُحسب باستخدام المحارف ذات الفهارس الزوجية الثمانية فقط. واشرح لماذا كانت فكرة سيئة جدًا، مع إعطاء مثال لمجموعة كبيرة من النصوص كلها تملك رمز التجزئة نفسه.

**تمرين 5..7** لنفترض لديك كائن مكوَّن من عددين صحيحين بطول $$ \mathtt{w}$$ بت، $$ \mathtt{x}$$ و $$ \mathtt{y}$$. بيّن لماذا لا يصلح $$ \ensuremath{\mathtt{x}}\oplus\ensuremath{\mathtt{y}}$$ رمز تجزئة لكائنك. وأعطِ مثالًا لمجموعة كبيرة من الكائنات جميعها تملك رمز التجزئة 0.

**تمرين 5..8** لنفترض لديك كائن مكوَّن من عددين صحيحين بطول $$ \mathtt{w}$$ بت، $$ \mathtt{x}$$ و $$ \mathtt{y}$$. بيّن لماذا لا يصلح $$ \ensuremath{\mathtt{x}}+\ensuremath{\mathtt{y}}$$ رمز تجزئة لكائنك. وأعطِ مثالًا لمجموعة كبيرة من الكائنات جميعها تملك رمز التجزئة نفسه.

**تمرين 5..9** لنفترض لديك كائن مكوَّن من عددين صحيحين بطول $$ \mathtt{w}$$ بت، $$ \mathtt{x}$$ و $$ \mathtt{y}$$. ولنفترض أن رمز التجزئة لكائنك معرَّف بدالة حتمية $$ h(\ensuremath{\mathtt{x}},\ensuremath{\mathtt{y}})$$ تُنتج عددًا صحيحًا واحدًا بطول $$ \mathtt{w}$$ بت. أثبت وجود مجموعة كبيرة من الكائنات تملك رمز التجزئة نفسه.

**تمرين 5..10** ليكن $$ p=2^{\ensuremath{\mathtt{w}}}-1$$ حيث $$ \mathtt{w}$$ عدد صحيح موجب. اشرح لماذا، بالنسبة إلى عدد صحيح موجب $$ x$$

![$\displaystyle (x\bmod 2^{\ensuremath{\mathtt{w}}}) + (x\ddiv 2^{\ensuremath{\mathtt{w}}}) \equiv x \bmod (2^{\ensuremath{\mathtt{w}}}-1) \enspace . $](/images/open-data-structures/5_4_Discussion_Exercises-img2575.png.webp)

(وهذا يعطي خوارزمية لحساب $$ x \bmod (2^{\ensuremath{\mathtt{w}}}-1)$$ عبر إعادة الضبط المتكرر لـ

![$\displaystyle \ensuremath{\mathtt{x = x\text{\ttfamily\&}((1\text{\ttfamily <<}w)-1) + x\text{\ttfamily >>>}w}} $](/images/open-data-structures/5_4_Discussion_Exercises-img2577.png.webp)

حتى $$ \ensuremath{\mathtt{x}} \le 2^{\ensuremath{\mathtt{w}}}-1$$.)

**تمرين 5..11** اعثر على أحد تنفيذي جداول التجزئة الشائعة الاستخدام، مثل HashMap في Java Collection Framework أو تنفيذَي HashTable و LinearHashTable في هذا الكتاب، وصمّم برنامجًا يخزّن أعدادًا صحيحة في بنية البيانات هذه بحيث توجد أعداد صحيحة، $$ \mathtt{x}$$، يكون $$ \mathtt{find(x)}$$ فيها زمنيًا خطيًا. أي بعبارة أخرى، ابحث عن مجموعة من $$ \mathtt{n}$$ عدد صحيح يوجد فيها $$ c\ensuremath{\mathtt{n}}$$ عنصر تُجزَّأ إلى موضع الجدول نفسه. وبحسب جودة التنفيذ، قد تتمكّن من ذلك بمجرد فحص شيفرة التنفيذ، أو قد تضطر إلى كتابة شيفرة تجرّب عمليات الإدراج والبحث، وتقيس الزمن اللازم لإضافة قيم بعينها وإيجادها. (وقد استُخدم هذا، وما زال يُستخدم، في إطلاق هجمات حجب الخدمة على خوادم الويب [17].)

[opendatastructures.org](http://opendatastructures.org/)
