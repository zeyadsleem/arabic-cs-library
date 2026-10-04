---
title: "8. Scapegoat Trees"
lang: ar
source: https://opendatastructures.org/ods-java/8_Scapegoat_Trees.html
---

في هذا الفصل، ندرس بنية بيانات من نوع شجرة البحث الثنائية (binary search tree)، وهي ScapegoatTree. تقوم هذه البنية على الحكمة الشائعة بأنّه، حين يسوء شيءٌ ما، فإنّ أوّل ما يلجأ إليه الناس هو البحث عن من يُلام (كبش الفداء). ومتى ثبتت المسؤولية، يتركون كبش الفداء ليصلح المشكلة. تحافظ ScapegoatTree على توازنها عبر عمليات إعادة البناء الجزئية (partial rebuilding). وأثناء عملية إعادة البناء الجزئية، تُفكَّك شجرة فرعية كاملة وتُعاد بناؤها من جديد كشجرة فرعية متوازنة تمامًا. وهناك طرق كثيرة لإعادة بناء الشجرة الفرعية ذات الجذر $ \mathtt{u}$ لتصبح شجرة متوازنة تمامًا. وأبسط هذه الطرق هو اجتياز الشجرة الفرعية ذات الجذر $ \mathtt{u}$ وجمع جميع عقدها في مصفوفة، $ \mathtt{a}$ ، ثم بناء شجرة فرعية متوازنة على نحو تعاودي (recursive) باستخدام $ \mathtt{a}$ . فإذا جعلنا $ \ensuremath{\mathtt{m}}=\ensuremath{\mathtt{a.length}}/2$ ، فإنّ العنصر $ \mathtt{a[m]}$ يصبح جذر الشجرة الفرعية الجديدة، وتُخزَّن $ \ensuremath{\mathtt{a}}[0],\ldots,\ensuremath{\mathtt{a}}[\ensuremath{\mathtt{m}}-1]$ على نحو تعاودي في الشجرة الفرعية اليسرى، وتُخزَّن $ \ensuremath{\mathtt{a}}[\ensuremath{\mathtt{m}}+1],\ldots,\ensuremath{\mathtt{a}}[\ensuremath{\mathtt{a.length}}-1]$ على نحو تعاودي في الشجرة الفرعية اليمنى.

```
    void rebuild(Node<T> u) {
        int ns = size(u);
        Node<T> p = u.parent;
        Node<T>[] a = (Node<T>[]) Array.newInstance(Node.class, ns);
        packIntoArray(u, a, 0);
        if (p == nil) {
            r = buildBalanced(a, 0, ns);
            r.parent = nil;
        } else if (p.right == u) {
            p.right = buildBalanced(a, 0, ns);
            p.right.parent = p;
        } else {
            p.left = buildBalanced(a, 0, ns);
            p.left.parent = p;
        }
    }
    int packIntoArray(Node<T> u, Node<T>[] a, int i) {
        if (u == nil) {
            return i;
        }
        i = packIntoArray(u.left, a, i);
        a[i++] = u;
        return packIntoArray(u.right, a, i);
    }
    Node<T> buildBalanced(Node<T>[] a, int i, int ns) {
        if (ns == 0)
            return nil;
        int m = ns / 2;
        a[i + m].left = buildBalanced(a, i, m);
        if (a[i + m].left != nil)
            a[i + m].left.parent = a[i + m];
        a[i + m].right = buildBalanced(a, i + m + 1, ns - m - 1);
        if (a[i + m].right != nil)
            a[i + m].right.parent = a[i + m];
        return a[i + m];
    }
```

يستغرق استدعاء $ \mathtt{rebuild(u)}$ زمنًا مقداره $ O(\ensuremath{\mathtt{size(u)}})$ . أمّا الشجرة الفرعية الناتجة فإنّ لها أصغر ارتفاع ممكن؛ إذ لا توجد شجرة ذات ارتفاع أصغر تحوي $ \mathtt{size(u)}$ عقدة.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 8.1 ScapegoatTree: شجرة بحث ثنائية مع إعادة بناء جزئية

**الأقسام الفرعية**

# 8.1 ScapegoatTree: شجرة بحث ثنائية مع إعادة بناء جزئية

إنّ ScapegoatTree هي BinarySearchTree، وهي إضافةً إلى تتبّع العدد $ \mathtt{n}$ للعقد في الشجرة، تحتفظ بعدّاد $ \mathtt{q}$ يحافظ على حدّ أعلى (upper bound) لعدد العقد.

```
    int q;
```

في كل الأوقات، يطيع $ \mathtt{n}$ و$ \mathtt{q}$ المتراجحتَين التاليتين:

$$
\displaystyle \ensuremath{\mathtt{q}}/2 \le \ensuremath{\mathtt{n}} \le \ensuremath{\mathtt{q}} \enspace .
$$

إضافةً إلى ذلك، فإنّ ارتفاع ScapegoatTree لوغاريتمي؛ وفي كل الأوقات لا يتجاوز ارتفاع شجرة كبش الفداء

حتى مع هذا القيد، قد تبدو ScapegoatTree غير متوازنة على نحوٍ مفاجئ. فشجرة الشكل 8.1 تحوي $ \ensuremath{\mathtt{q}}=\ensuremath{\mathtt{n}}=10$ وارتفاعها $ 5<\log_{3/2}10 \approx 5.679$ .

**الشكل 8.1:** ScapegoatTree تحوي 10 عقد وارتفاعها 5. ![\includegraphics[scale=0.90909]{figs/scapegoat-insert-1}](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3227.png.webp) يُنفَّذ تنفيذ العملية $ \mathtt{find(x)}$ في ScapegoatTree باستخدام الخوارزمية المعيارية للبحث في BinarySearchTree (راجع القسم 6.2). وهذا يستغرق زمنًا متناسبًا مع ارتفاع الشجرة الذي، بحسب (8.1)، هو $ O(\log \ensuremath{\mathtt{n}})$ . ولتنفيذ العملية $ \mathtt{add(x)}$، نزيد أوّلًا $ \mathtt{n}$ و$ \mathtt{q}$ ثم نستخدم الخوارزمية المعتادة لإضافة $ \mathtt{x}$ إلى شجرة بحث ثنائية؛ فنبحث عن $ \mathtt{x}$ ثم نضيف ورقة جديدة $ \mathtt{u}$ بحيث $ \ensuremath{\mathtt{u.x}}=\ensuremath{\mathtt{x}}$ . وفي هذه المرحلة قد نكون محظوظين، فقد لا يتجاوز عمق $ \mathtt{u}$ القيمة $ \log_{3/2}\ensuremath{\mathtt{q}}$ . وإن كان الأمر كذلك، فاتركنا الحال على حالها ولم نفعل شيئًا آخر. لكن للأسف، سيحدث أحيانًا أنّ $ \ensuremath{\mathtt{depth(u)}} > \log_{3/2} \ensuremath{\mathtt{q}}$ . وفي هذه الحالة، نحتاج إلى تقليل الارتفاع. وليست هذه عملًا كبيرًا؛ إذ لا توجد سوى عقدة واحدة، وهي $ \mathtt{u}$ ، يتجاوز عمقها $ \log_{3/2} \ensuremath{\mathtt{q}}$ . ولإصلاح $ \mathtt{u}$ ، نصعد من $ \mathtt{u}$ عائدين إلى الجذر باحثين عن كبش فداء، $ \mathtt{w}$ . إنّ كبش الفداء $ \mathtt{w}$ هو عقدة شديدة اللاتوازن، وله الخاصية التالية

حيث $ \mathtt{w.child}$ هو الابن الذي يلي $ \mathtt{w}$ على المسار الممتد من الجذر إلى $ \mathtt{u}$ . وسنبرهن بعد قليلٍ على أنّ كبش فداء موجود. أمّا الآن فيمكننا التسليم بذلك. وبعد أن نجد كبش الفداء $ \mathtt{w}$ ، نهدم تمامًا الشجرة الفرعية ذات الجذر $ \mathtt{w}$ ونعيد بناؤها كشجرة بحث ثنائية متوازنة تمامًا. ومن المعادلة (8.2) نعلم أنّه حتى قبل إضافة $ \mathtt{u}$ لم تكن الشجرة الفرعية ذات الجذر $ \mathtt{w}$ شجرة ثنائية كاملة. ومن ثمّ، عندما نعيد بناء $ \mathtt{w}$ ، ينخفض الارتفاع بمقدار 1 على الأقل، بحيث يعود ارتفاع ScapegoatTree إلى ما لا يتجاوز $ \log_{3/2}\ensuremath{\mathtt{q}}$ .

```
    boolean add(T x) {
        // first do basic insertion keeping track of depth
        Node<T> u = newNode(x);
        int d = addWithDepth(u);
        if (d > log32(q)) {
            // depth exceeded, find scapegoat
            Node<T> w = u.parent;
            while (3*size(w) <= 2*size(w.parent))
                w = w.parent;
            rebuild(w.parent);
        }
        return d >= 0;
    }
```

إذا أهملنا كلفة العثور على كبش الفداء $ \mathtt{w}$ وإعادة بناء الشجرة الفرعية ذات الجذر $ \mathtt{w}$ ، فإنّ زمن تشغيل $ \mathtt{add(x)}$ يهيمن عليه البحث الأوّلي، الذي يستغرق $ O(\log \ensuremath{\mathtt{q}}) = O(\log \ensuremath{\mathtt{n}})$ من الزمن. أمّا كلفة العثور على كبش الفداء وإعادة البناء فسنحاسبها في القسم التالي باستخدام التحليل المُلبَّد (amortized analysis). وتنفيذ عملية $ \mathtt{remove(x)}$ في ScapegoatTree بسيطٌ جدًّا. فنبحث عن $ \mathtt{x}$ ونزيله باستخدام الخوارزمية المعتادة لإزالة عقدة من BinarySearchTree. (ولاحظ أنّ ذلك لا يمكنه إطلاقًا أن يزيد من ارتفاع الشجرة.) ثمّ نقص $ \mathtt{n}$ مع الإبقاء على $ \mathtt{q}$ دون تغيير. وأخيرًا نتحقّق ممّا إذا كان $ \ensuremath{\mathtt{q}} > 2\ensuremath{\mathtt{n}}$ ، فإن كان كذلك أعدنا بناء الشجرة بأكملها كشجرة بحث ثنائية متوازنة تمامًا وضبطنا $ \ensuremath{\mathtt{q}}=\ensuremath{\mathtt{n}}$ .

```
    boolean remove(T x) {
        if (super.remove(x)) {
            if (2*n < q) {
                rebuild(r);
                q = n;
            }
            return true;
        }
        return false;
    }
```

ومرّة أخرى، إذا أهملنا كلفة إعادة البناء، فإنّ زمن تشغيل العملية $ \mathtt{remove(x)}$ متناسب مع ارتفاع الشجرة، ومن ثمّ فهو $ O(\log \ensuremath{\mathtt{n}})$ .

8.1.1 تحليل صحّة العمليات وزمن تشغيلها في هذا القسم، نحلّل صحّة العمليات على ScapegoatTree وزمن تشغيلها المُلبَّد. ونبرهن أوّلًا على الصحّة بأنّنا نبيّن أنّه، عندما ينتج عن العملية $ \mathtt{add(x)}$ عقدة تنتهك الشرط (8.1)، فإنّنا نستطيع دائمًا العثور على كبش فداء: **الملمّة 8.1** *ليكن $ \mathtt{u}$ عقدة عمقها $ h>\log_{3/2} \ensuremath{\mathtt{q}}$ في ScapegoatTree. عندئذٍ توجد عقدة $ \ensuremath{\mathtt{w}}$ على المسار الممتد من $ \mathtt{u}$ إلى الجذر بحيث *

$$
\displaystyle \frac{\ensuremath{\mathtt{size(w)}}}{\ensuremath{\mathtt{size(parent(w))}}} > 2/3 \enspace .
$$

*البرهان*. نفترض، طلبًا للتناقض، أنّ الأمر ليس كذلك، وأنّ

$$
\displaystyle \frac{\ensuremath{\mathtt{size(w)}}}{\ensuremath{\mathtt{size(parent(w))}}} \le 2/3 \enspace .
$$

يسري ذلك لكل العقد $ \mathtt{w}$ على المسار الممتد من $ \mathtt{u}$ إلى الجذر. لنُسمِّ المسار الممتد من الجذر إلى $ \mathtt{u}$ بالرمز $ \ensuremath{\mathtt{r}}=\ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_h=\ensuremath{\mathtt{u}}$ . عندئذٍ لدينا $ \ensuremath{\mathtt{size(u}}_0\ensuremath{\mathtt{)}}=\ensuremath{\mathtt{n}}$ ، $ \ensuremath{\mathtt{size(u}}_1\ensuremath{\mathtt{)}}\le\frac{2}{3}\ensuremath{\mathtt{n}}$ ، $ \ensuremath{\mathtt{size(u}}_2\ensuremath{\mathtt{)}}\le\frac{4}{9}\ensuremath{\mathtt{n}}$ وبشكلٍ عامّ

$$
\displaystyle \ensuremath{\mathtt{size(u}}_i\ensuremath{\mathtt{)}}\le\left(\frac{2}{3}\right)^i\ensuremath{\mathtt{n}} \enspace .
$$

لكنّ هذا يعطي تناقضًا، إذ إنّ $ \ensuremath{\mathtt{size(u)}}\ge 1$ ، ومن ثمّ

![$\displaystyle 1 \le \ensuremath{\mathtt{size(u)}} \le \left(\frac{2}{3}\right)^... ...suremath{\mathtt{n}}}\right) \ensuremath{\mathtt{n}} = 1 \enspace . \qedhere $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3288.png.webp)

$$
\qedsymbol
$$

تالًا، نحلّل جزأَي زمن التشغيل اللذين لم نحتسبهما بعد. هناك جزأان: كلفة الاستدعاءات إلى $ \mathtt{size(u)}$ عند البحث عن عقد كبش الفداء، وكلفة الاستدعاءات إلى $ \mathtt{rebuild(w)}$ عند العثور على كبش فداء $ \mathtt{w}$ . ويمكن ربط كلفة الاستدعاءات إلى $ \mathtt{size(u)}$ بكلفة الاستدعاءات إلى $ \mathtt{rebuild(w)}$ على النحو التالي: **الملمّة 8.2** *أثناء استدعاء $ \mathtt{add(x)}$ في ScapegoatTree، تكون كلفة العثور على كبش الفداء $ \mathtt{w}$ وإعادة بناء الشجرة الفرعية ذات الجذر $ \mathtt{w}$ هي $ O(\ensuremath{\mathtt{size(w)}})$ .*

*البرهان*. كلفة إعادة بناء عقدة كبش الفداء $ \mathtt{w}$، بعد العثور عليها، هي $ O(\ensuremath{\mathtt{size(w)}})$ . وعند البحث عن عقدة كبش الفداء، نستدعي $ \mathtt{size(u)}$ على تسلسلٍ من العقد $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_k$ حتى نجد كبش الفداء $ \ensuremath{\mathtt{u}}_k=\ensuremath{\mathtt{w}}$ . لكنّ $ \ensuremath{\mathtt{u}}_k$ أوّل عقدة في هذا التسلسل تُعدّ كبش فداء، ومن ثمّ نعلم أنّ

$$
\displaystyle \ensuremath{\mathtt{size(u}}_{i}\ensuremath{\mathtt{)}} < \frac{2}{3}\ensuremath{\mathtt{size(u}}_{i+1}\ensuremath{\mathtt{)}}
$$

يسري ذلك لكل $ i\in\{0,\ldots,k-2\}$ . إذن، كلفة جميع الاستدعاءات إلى $ \mathtt{size(u)}$ هي

| $\displaystyle O\left( \sum_{i=0}^k \ensuremath{\mathtt{size(u}}_{k-i}\ensuremath{\mathtt{)}} \right)$ | $\displaystyle =$ | $\displaystyle O\left( \ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}} + \... ...{i=0}^{k-1} \ensuremath{\mathtt{size(u}}_{k-i-1}\ensuremath{\mathtt{)}} \right)$ |  |
| --- | --- | --- | --- |
|  | $\displaystyle =$ | ![$\displaystyle O\left( \ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}} + \... ...c{2}{3}\right)^i\ensuremath{\mathtt{size(u}}_{k}\ensuremath{\mathtt{)}} \right)$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3312.png.webp) |  |
|  | $\displaystyle =$ | $\displaystyle O\left( \ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}}\left(1+ \sum_{i=0}^{k-1} \left(\frac{2}{3}\right)^i \right)\right)$ |  |
|  | $\displaystyle =$ | $\displaystyle O(\ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}}) = O(\ensuremath{\mathtt{size(w)}}) \enspace ,$ |  |

حيث يتبع السطر الأخير من أنّ المجموع متتاليةٌ هابطة هندسيًا. $\qedsymbol$

لم يبقَ سوى إثبات حدٍّ أعلى (upper bound) لكلفة جميع الاستدعاءات إلى $ \mathtt{rebuild(u)}$ خلال تسلسلٍ من $ m$ عملية: **الملمّة 8.3** *إذا بدأنا من ScapegoatTree فارغة، فإنّ أي تسلسلٍ من $ m$ عملية من نوعَي $ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ يستهلك على الأكثر $ O(m\log m)$ من الزمن في عمليات $ \mathtt{rebuild(u)}$ .*

*البرهان*. لإثبات ذلك، سنستخدم مخطّط أرصدة (credit scheme). نتخيّل أنّ كل عقدة تخزّن عددًا من الأرصدة. ويمكن لكل رصيدٍ أن يدفع ثمن ثابتٍ، $ c$ ، من وحدات الزمن التي تُنفق في إعادة البناء. ويوزّع هذا المخطّط ما مجموعه $ O(m\log m)$ من الأرصدة، ويُدفَع كل استدعاء إلى $ \mathtt{rebuild(u)}$ بالأرصدة المخزَّنة عند $ \mathtt{u}$ .

أثناء الإدراج أو الحذف، نمنح رصيدًا واحدًا لكل عقدةٍ على المسار المؤدّي إلى العقدة المُدرَجة أو المحذوفة، $ \mathtt{u}$ . وبهذه الطريقة نوزّع على الأكثر $ \log_{3/2}\ensuremath{\mathtt{q}}\le \log_{3/2}m$ رصيدًا لكل عملية. وأثناء الحذف نحتفظ برصيدٍ إضافي ``مُدَّخرًا إلى جانب.'' وعليه، فإنّ ما نوزّعه إجمالًا لا يتجاوز $ O(m\log m)$ من الأرصدة. ولم يبقَ سوى بيان أنّ هذه الأرصدة تكفي لدفع كلفة جميع الاستدعاءات إلى $ \mathtt{rebuild(u)}$ . فإذا استدعينا $ \mathtt{rebuild(u)}$ أثناء إدراج، فإنّ ذلك لأنّ $ \mathtt{u}$ كبش فداء. ولنفترض، دون 잃انٍ من العموم، أنّ

$$
\displaystyle \frac{\ensuremath{\mathtt{size(u.left)}}}{\ensuremath{\mathtt{size(u)}}} > \frac{2}{3} \enspace .
$$

باستخدام الحقيقة

$$
\displaystyle \ensuremath{\mathtt{size(u)}} = 1 + \ensuremath{\mathtt{size(u.left)}} + \ensuremath{\mathtt{size(u.right)}}
$$

نستنتج أنّ

$$
\displaystyle \frac{1}{2}\ensuremath{\mathtt{size(u.left)}} > \ensuremath{\mathtt{size(u.right)}} \enspace
$$

وبالتالي

![$\displaystyle \ensuremath{\mathtt{size(u.left)}} - \ensuremath{\mathtt{size(u.r... ...\mathtt{size(u.left)}} > \frac{1}{3}\ensuremath{\mathtt{size(u)}} \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3338.png.webp)

والآن، في آخر مرّةٍ أُعيدت فيها بناء شجرةٍ فرعية تحوي $ \mathtt{u}$ (أو حين أُدرجت $ \mathtt{u}$، إن لم تُعَد بناء شجرةٍ فرعية تحوي $ \mathtt{u}$ قطّ)، كان لدينا

$$
\displaystyle \ensuremath{\mathtt{size(u.left)}} - \ensuremath{\mathtt{size(u.right)}} \le 1 \enspace .
$$

لذلك فإنّ عدد عمليات $ \mathtt{add(x)}$ أو $ \mathtt{remove(x)}$ التي أثّرت في $ \mathtt{u.left}$ أو $ \mathtt{u.right}$ منذ ذلك الحين لا يقلّ عن

$$
\displaystyle \frac{1}{3}\ensuremath{\mathtt{size(u)}} - 1 \enspace .
$$

ومن ثمّ فإنّ عددًا من الأرصدة لا يقلّ عن هذا العدد مخزَّنٌ عند $ \mathtt{u}$ ، ومتاح لدفع الزمن $ O(\ensuremath{\mathtt{size(u)}})$ الذي يستغرقه استدعاء $ \mathtt{rebuild(u)}$ .

أمّا إذا استدعينا $ \mathtt{rebuild(u)}$ أثناء حذف، فإنّ ذلك لأنّ $ \ensuremath{\mathtt{q}} > 2\ensuremath{\mathtt{n}}$ . في هذه الحالة لدينا $ \ensuremath{\mathtt{q}}-\ensuremath{\mathtt{n}}> \ensuremath{\mathtt{n}}$ من الأرصدة المخزَّنة ``مُدَّخرة إلى جانب،'' ونستخدمها لدفع الزمن $ O(\ensuremath{\mathtt{n}})$ الذي يلزم لإعادة بناء الجذر. وبهذا يكتمل البرهان. $\qedsymbol$

8.1.2 الخلاصة تلخّص المبرهنة التالية أداء بنية بيانات ScapegoatTree: **المبرهنة 8.1** *تُنفِّذ ScapegoatTree واجهة SSet. وإذا أهملنا كلفة عمليات $ \mathtt{rebuild(u)}$ ، فإنّ ScapegoatTree تدعم العمليات $ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ و$ \mathtt{find(x)}$ في زمنٍ قدره $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية. * *وإضافةً إلى ذلك، فإنّ البدء من ScapegoatTree فارغة يُسبّب أي تسلسلٍ من $ m$ عملية من نوعَي $ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ إنفاقًا إجماليًا قدره $ O(m\log m)$ من الزمن خلال جميع الاستدعاءات إلى $ \mathtt{rebuild(u)}$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 8.2 مناقشة والتمارين

مصطلح «شجرة كبش الفداء» يعود إلى Galperin وRivest [33] اللذين عرّفا هذه الأشجار وحلّلاها. غير أنّ البنية ذاتها اكتشفها في وقتٍ أسبق Andersson [5,7]، وسمّاها أشجارًا متوازنة عامّة (general balanced trees) لأنّها يمكن أن تأخذ أيّ شكل ما دام ارتفاعها صغيرًا. وستُظهر التجارب مع تنفيذ ScapegoatTree أنّه كثيرًا ما يكون أبطأ بدرجةٍ كبيرة من عمليات SSet الأخرى في هذا الكتاب. وقد يبدو هذا مثيرًا للدهشة إلى حدٍّ ما، لأنّ حدّ الارتفاع

$$
\displaystyle \log_{3/2}\ensuremath{\mathtt{q}} \approx 1.709\log \ensuremath{\mathtt{n}} + O(1)
$$

أفضل من الطول المتوقَّع لمسار البحث في Skiplist وليس بعيدًا جدًّا عن نظيره في Treap. ويمكن تحسين التنفيذ إمّا بتخزين أحجام الشجرات الفرعية صراحةً عند كل عقدة، أو بإعادة استخدام أحجام الشجرات الفرعية المحسوبة سلفًا (التمرينان 8.5 و8.6). وحتى مع هذه التحسينات، ستظلّ هناك دائمًا تسلسلاتٌ من عمليات $ \mathtt{add(x)}$ و$ \mathtt{delete(x)}$ التي تستغرق فيها ScapegoatTree زمنًا أطول من عمليات SSet الأخرى.

وهذه الفجوة في الأداء تعود إلى أنّ ScapegoatTree، بخلاف عمليات SSet الأخرى المتناوَشة في هذا الكتاب، يمكن أن تقضي وقتًا طويلًا في إعادة ترتيب بنيتها. ويطلب منك التمرين 8.3 إثبات أنّ هناك تسلسلاتٍ من $ \mathtt{n}$ عملية تستهلك فيها ScapegoatTree زمنًا من المرتبة $ \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$ في الاستدعاءات إلى $ \mathtt{rebuild(u)}$ . وهذا على عكس ما في عمليات SSet الأخرى المتناوَشة في هذا الكتاب، فإنّها لا تنجز سوى $ O(\ensuremath{\mathtt{n}})$ من التغييرات البنيوية خلال تسلسلٍ من $ \mathtt{n}$ عملية. وهذا، للأسف، نتيجةٌ لازمة عن كون ScapegoatTree تنجز كل إعادة ترتيب لبنيتها عبر استدعاءات إلى $ \mathtt{rebuild(u)}$ [20]. وعلى الرغم من ضعف أدائها، هناك تطبيقات قد تكون فيها ScapegoatTree هي الخيار الصحيح. ويحدث ذلك كلّما كانت هناك بياناتٌ إضافية مرتبطةٌ بعقدٍ لا يمكن تحديثها في زمنٍ ثابت عند إجراء دورانٍ (rotation)، لكن يمكن تحديثها أثناء عملية $ \mathtt{rebuild(u)}$ . وفي هذه الحالات قد تنفع ScapegoatTree والبنيات المرتبطة القائمة على إعادة البناء الجزئي. ويعرض التمرين 8.11 مثالًا على تطبيقٍ من هذا النوع. **التمرين 8.1** بيّن إضافة القيمة 1.5 ثم القيمة 1.6 على ScapegoatTree في الشكل 8.1.

**التمرين 8.2** بيّن ما يحدث عند إضافة التسلسل $ 1,5,2,4,3$ إلى ScapegoatTree فارغة، وأظهر أين تذهب الأرصدة الموصوفة في برهان الملمة 8.3، وكيف تُستخدَم خلال تسلسل الإضافات هذا.

**التمرين 8.3** بيّن أنّه، إذا بدأنا من ScapegoatTree فارغة واستدعينا $ \mathtt{add(x)}$ لكل $ \ensuremath{\mathtt{x}}=1,2,3,\ldots,\ensuremath{\mathtt{n}}$ ، فإنّ الزمن الإجمالي المنفق في الاستدعاءات إلى $ \mathtt{rebuild(u)}$ لا يقلّ عن $ c\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$ من أجل ثابتٍ ما $ c>0$ .

**التمرين 8.4** تضمن ScapegoatTree الموصوفة في هذا الفصل أن ألّا يتجاوز طول مسار البحث $ \log_{3/2}\ensuremath{\mathtt{q}}$ . صمّم وحلّل ونفّذ نسخةً معدَّلة من ScapegoatTree يكون فيها طول مسار البحث لا يتجاوز $ \log_{\ensuremath{\mathtt{b}}} \ensuremath{\mathtt{q}}$ ، حيث $ \mathtt{b}$ معاملٌ يحقّق $ 1<\ensuremath{\mathtt{b}}<2$ . ماذا يخبرك تحليلك و/أو تجاربك عن الكلفة المُلبَّدة لـ$ \mathtt{find(x)}$ و$ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ دالّةً في $ \mathtt{n}$ و$ \mathtt{b}$ ؟

**التمرين 8.5** عدّل الدالة $ \mathtt{add(x)}$ في ScapegoatTree بحيث لا تُهدر أي وقت في إعادة حساب أحجام الشجرات الفرعية التي حُسبت من قبل. وهذا مُمكن لأنّ الدالة، حين ترغب في حساب $ \mathtt{size(w)}$ ، تكون قد حسبت بالفعل أحد $ \mathtt{size(w.left)}$ أو $ \mathtt{size(w.right)}$ . وقارن بين أداء تنفيذك المعدَّل وأداء التنفيذ المعطى هنا.

**التمرين 8.6** نفّذ نسخةً ثانية من بنية بيانات ScapegoatTree تخزّن أحجام الشجرة الفرعية ذات الجذر عند كل عقدة صراحةً وتحافظ عليها. وقارن بين أداء التنفيذ الناتج وأداء تنفيذ ScapegoatTree الأصلي، وكذلك أداء التنفيذ الخاص بالتمرين 8.5.

**التمرين 8.7** أعد تنفيذ الدالة $ \mathtt{rebuild(u)}$ التي نُوقشت في مطلع هذا الفصل بحيث لا تتطلّب استخدام مصفوفة لتخزين عقد الشجرة الفرعية قيد إعادة البناء. وبدلًا من ذلك، ينبغي أن تستخدم التكرار (recursion) لربط العقد أوّلًا في قائمةٍ مترابطة، ثم تحويل هذه القائمة المترابطة إلى شجرة ثنائية متوازنة تمامًا. (وهناك تنفيذان تعاوديان بديعان جدًّا لكلتا الخطوتين.)

**التمرين 8.8** حلّل ونفّذ WeightBalancedTree. وهذه شجرةٌ تحافظ فيها كل عقدة $ \mathtt{u}$ ، ما عدا الجذر، على ثابت اتزان (balance invariant) هو $ \ensuremath{\mathtt{size(u)}} \le (2/3)\ensuremath{\mathtt{size(u.parent)}}$ . وعمليتا $ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ مطابقتان لعمليتي BinarySearchTree المعياريتين، إلّا أنّه كلّما انتُكِث ثابت الاتزان عند عقدة $ \mathtt{u}$ ، أُعيد بناء الشجرة الفرعية ذات الجذر $ \mathtt{u.parent}$ . وينبغي أن يُظهر تحليلك أنّ العمليات على WeightBalancedTree تعمل في زمنٍ مُلبَّد قدره $ O(\log\ensuremath{\mathtt{n}})$ .

**التمرين 8.9** حلّل ونفّذ CountdownTree. وفي CountdownTree تحتفظ كل عقدة $ \mathtt{u}$ بعدّادٍ تنازلي $ \mathtt{u.t}$ . وعمليتا $ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ مطابقتان تمامًا لتلك في BinarySearchTree المعياري، إلّا أنّه كلّما أثّرت إحدى هاتين العمليتين في الشجرة الفرعية ذات الجذر $ \mathtt{u}$ ، نُقص $ \mathtt{u.t}$ . وعندما يصبح $ \ensuremath{\mathtt{u.t}}=0$ تُعاد الشجرة الفرعية ذات الجذر $ \mathtt{u}$ بناءً كاملًا لتصبح شجرة بحث ثنائية متوازنة تمامًا. وعندما تكون عقدة $ \mathtt{u}$ مشتركة في عملية إعادة بناء (إمّا لأنّ $ \mathtt{u}$ هي التي أُعيد بناؤها أو لأنّ أحد أجداد $ \mathtt{u}$ أُعيد بناؤه)، يُعاد ضبط $ \mathtt{u.t}$ على $ \ensuremath{\mathtt{size(u)}}/3$ . وينبغي أن يُظهر تحليلك أنّ العمليات على CountdownTree تعمل في زمنٍ مُلبَّد قدره $ O(\log \ensuremath{\mathtt{n}})$ . (تلميح: بيّن أوّلًا أنّ كل عقدة $ \mathtt{u}$ تحقّق نسخةً ما من ثابت الاتزان.)

**التمرين 8.10** حلّل ونفّذ DynamiteTree. وفي DynamiteTree تتتبّع كل عقدة $ \mathtt{u}$ حجمَ الشجرة الفرعية ذات جذر $ \mathtt{u}$ في متغيّر $ \mathtt{u.size}$ . وعمليتا $ \mathtt{add(x)}$ و$ \mathtt{remove(x)}$ مطابقتان تمامًا لتلك في BinarySearchTree المعياري، إلّا أنّه كلّما أثّرت إحدى هاتين العمليتين في الشجرة الفرعية لعقدة $ \mathtt{u}$ ، انفجرت $ \mathtt{u}$ باحتمال $ 1/\ensuremath{\mathtt{u.size}}$ . وحين تنفجر $ \mathtt{u}$ ، تُعاد شجرتها الفرعية بناءً كاملًا لتصبح شجرة بحث ثنائية متوازنة تمامًا. وينبغي أن يُظهر تحليلك أنّ العمليات على DynamiteTree تعمل في زمنٍ متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ .

**التمرين 8.11** صمّم ونفّذ بنية بيانات Sequence تحافظ على تسلسلٍ (قائمة) من العناصر. وهي تدعم العمليات التالية: $ \mathtt{addAfter(e)}$ : أضف عنصرًا جديدًا بعد العنصر $ \mathtt{e}$ في التسلسل، وأعِد العنصر المُضاف حديثًا. (وإن كان $ \mathtt{e}$ فارغًا (null)، فيُضاف العنصر الجديد في مطلع التسلسل.) $ \mathtt{remove(e)}$ : أزل $ \mathtt{e}$ من التسلسل. $ \mathtt{testBefore(e1,e2)}$ : أعِد $ \mathtt{true}$ إذا وفقط إذا كان $ \mathtt{e1}$ يسبق $ \mathtt{e2}$ في التسلسل. وينبغي أن تعمل العمليتان الأوليان في زمنٍ مُلبَّد قدره $ O(\log \ensuremath{\mathtt{n}})$ . أمّا العملية الثالثة فينبغي أن تعمل في زمنٍ ثابت. ويمكن تنفيذ بنية بيانات Sequence بتخزين العناصر في شيءٍ من قبيل ScapegoatTree، بالترتيب نفسه الذي ترد فيه في التسلسل. ولتنفيذ $ \mathtt{testBefore(e1,e2)}$ في زمنٍ ثابت، يُوسَم كل عنصر $ \mathtt{e}$ بعددٍ صحيحٍ يُرمِّز المسار من الجذر إلى $ \mathtt{e}$ . وبهذه الطريقة يمكن تنفيذ $ \mathtt{testBefore(e1,e2)}$ بمقارنة وسمَي $ \mathtt{e1}$ و$ \mathtt{e2}$ .

[opendatastructures.org](http://opendatastructures.org/)
