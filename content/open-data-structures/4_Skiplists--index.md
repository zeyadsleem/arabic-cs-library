---
title: "4. Skiplists"
lang: ar
source: https://opendatastructures.org/ods-java/4_Skiplists.html
---

في هذا الفصل، نناقش بنية بيانات (data structure) جميلة: قائمة التخطي (skiplist)، ولها تطبيقات متنوعة. وباستخدام قائمة التخطي يمكننا تنفيذ واجهة List تمتلك تنفيذات بزمن $ O(\log n)$ للدوال $ \mathtt{get(i)}$ ، $ \mathtt{set(i,x)}$ ، $ \mathtt{add(i,x)}$ ، و $ \mathtt{remove(i)}$ . ويمكن أيضًا تنفيذ مجموعة SSet تعمل فيها جميع العمليات بزمن متوقع قدره $ O(\log \ensuremath{\mathtt{n}})$ . وتعتمد كفاءة قوائم التخطي على استخدامها للعشوائية. فعندما يُضاف عنصر جديد إلى قائمة تخطٍ، تستخدم قائمة التخطي رميات عملة عشوائية لتحديد ارتفاع العنصر الجديد. ويُعبَّر عن أداء قوائم التخطي في أزمنة التشغيل المتوقعة وأطوال المسارات. ويُؤخذ هذا التوقع على رميات العملة العشوائية التي تستخدمها قائمة التخطي. وفي التنفيذ، تُحاكى رميات العملة العشوائية المستخدمة في قائمة التخطي بواسطة مولّد أرقام (أو بتات) شبه عشوائي.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 4.1 البنية الأساسية

من الناحية المفاهيمية، قائمة التخطي هي تسلسل من القوائم المترابطة أحادية الاتجاه $ L_0,\ldots,L_h$ . تحتوي كل قائمة $ L_r$ على مجموعة جزئية من العناصر الموجودة في $ L_{r-1}$ . نبدأ بالقائمة المُدخلة $ L_0$ التي تحتوي على $ \mathtt{n}$ عنصر، ونبني $ L_1$ من $ L_0$ ، ثم $ L_2$ من $ L_1$ ، وهكذا. تُحصل عناصر $ L_r$ برمي عملة مقابل كل عنصر $ \mathtt{x}$ في $ L_{r-1}$ وإدراج $ \mathtt{x}$ في $ L_r$ إذا ظهر وجه العملة. وتنتهي هذه العملية عند إنشاء قائمة $ L_r$ فارغة. ويظهر مثال على قائمة تخطٍ في الشكل 4.1. **الشكل 4.1:** قائمة تخطٍ تحتوي على سبعة عناصر. ![\includegraphics[width=\textwidth ]{figs/skiplist}](/images/open-data-structures/4_1_Basic_Structure-img1615.png.webp) وبالنسبة إلى عنصر $ \mathtt{x}$ في قائمة تخطٍ، فإننا نسمّي ارتفاع $ \mathtt{x}$ هو أكبر قيمة $ r$ بحيث يظهر $ \mathtt{x}$ في $ L_r$ . فمثلًا، العناصر التي لا تظهر إلا في $ L_0$ يكون ارتفاعها . وإذا أمعنا التفكير لحظة، نلاحظ أن ارتفاع $ \mathtt{x}$ يوافق التجربة التالية: ارمِ عملة تكرارًا حتى يأتي ظهرها. كم مرة كان وجهها؟ والإجابة، وهو ما ليس مفاجئًا، هي أن الارتفاع المتوقع للعقدة يساوي 1. (نتوقع أن نرمي العملة مرتين قبل الحصول على ظهرها، لكننا لا نحسب الرمية الأخيرة.) وارتفاع قائمة التخطي هو ارتفاع أطول عقدة فيها. وفي رأس كل قائمة توجد عقدة خاصة تُسمى الحارس (sentinel)، تعمل كعقدة صورية (dummy) لتلك القائمة. والخاصية الأساسية لقوائم التخطي هي وجود مسار قصير، يُسمى مسار البحث (search path)، من الحارس في $ L_h$ إلى كل عقدة في $ L_0$ . وتذكّر كيفية بناء مسار البحث لعقدة $ \mathtt{u}$ أمر سهل (انظر الشكل 4.2): ابدأ من الزاوية العلوية اليسرى لقائمة التخطي (الحارس في $ L_h$ )، وتحرَّك دائمًا إلى اليمين إلا إذا كان ذلك سيتجاوز $ \mathtt{u}$ ، وعندئذ تنزل خطوة إلى القائمة التي تحتها. وبأدق عبارة، لبناء مسار البحث للعقدة $ \mathtt{u}$ في $ L_0$ ، نبدأ من الحارس $ \mathtt{w}$ في $ L_h$ . ثم نفحص $ \mathtt{w.next}$ . فإذا كان $ \mathtt{w.next}$ يحتوي على عنصر يظهر قبل $ \mathtt{u}$ في $ L_0$ ، فإننا نجعل $ \ensuremath{\mathtt{w}}=\ensuremath{\mathtt{w.next}}$ . وإلا فإننا ننزل ونواصل البحث عند موضع ورود $ \mathtt{w}$ في القائمة $ L_{h-1}$ . ونستمر على هذا النحو حتى نصل إلى السابقة (predecessor) للعقدة $ \mathtt{u}$ في $ L_0$ . **الشكل 4.2:** مسار البحث عن العقدة التي تحتوي على $ 4$ في قائمة تخطٍ. ![\includegraphics[width=\textwidth ]{figs/skiplist-searchpath}](/images/open-data-structures/4_1_Basic_Structure-img1641.png.webp) وفيما يلي النتيجة التي سنثبتها في القسم 4.4، والتي تُظهر أن مسار البحث قصير إلى حد كبير: **المُلَم 4..1** *الطول المتوقع لمسار البحث عن أي عقدة $ \mathtt{u}$ في $ L_0$ لا يتجاوز $ 2\log \ensuremath{\mathtt{n}} + O(1) = O(\log \ensuremath{\mathtt{n}})$ .*

إحدى الطرق الموفِّرة للمساحة لتنفيذ قائمة تخطٍ هي تعريف العقدة (Node) $ \mathtt{u}$ على أنها تتكوّن من قيمة بيانات $ \mathtt{x}$ ومصفوفة $ \mathtt{next}$ من المؤشرات، حيث يشير $ \mathtt{u.next[i]}$ إلى العنصر اللاحق لـ $ \mathtt{u}$ في القائمة $ L_{\ensuremath{\mathtt{i}}}$ . بهذه الطريقة، لا تتم الإشارة إلى البيانات $ \mathtt{x}$ داخل العقدة إلا مرة واحدة، حتى لو ظهر $ \mathtt{x}$ في عدة قوائم.

```
    class Node<T> {
        T x;
        Node<T>[] next;
        Node(T ix, int h) {
            x = ix;
            next = (Node<T>[])Array.newInstance(Node.class, h+1);
        }
        int height() {
            return next.length - 1;
        }
    }
```

يناقش القسمان التاليان من هذا الفصل تطبيقين مختلفين لقوائم التخطي. في كلٍّ منهما، تخزّن $ L_0$ البنية الأساسية (قائمة عناصر أو مجموعة عناصر مرتبة). والفرق الرئيسي بين هاتين البنيتين يكمن في كيفية التنقّل عبر مسار البحث؛ وبخاصة، يختلفان في كيفية تحديد ما إذا كان ينبغي أن ينزل مسار البحث إلى $ L_{r-1}$ أم أن يتحرك إلى اليمين ضمن $ L_r$ . [opendatastructures.org](http://opendatastructures.org/)

## 4.2 SkiplistSSet: مجموعة SSet فعّالة

**الأقسام الفرعية**

# 4.2 SkiplistSSet: مجموعة SSet فعّالة

تستخدم SkiplistSSet بنية قائمة التخطي لتنفيذ واجهة SSet. وعند استخدامها بهذه الطريقة، تخزّن القائمة $ L_0$ عناصر مجموعة SSet مرتبة. وتعمل الدالة $ \mathtt{find(x)}$ باتباع مسار البحث عن أصغر قيمة $ \mathtt{y}$ بحيث $ \ensuremath{\mathtt{y}}\ge\ensuremath{\mathtt{x}}$ :

```
    Node<T> findPredNode(T x) {
        Node<T> u = sentinel;
        int r = h;
        while (r >= 0) {
            while (u.next[r] != null && compare(u.next[r].x,x) < 0)
                u = u.next[r];   // go right in list r
            r--;               // go down into list r-1
        }
        return u;
    }
    T find(T x) {
        Node<T> u = findPredNode(x);
        return u.next[0] == null ? null : u.next[0].x;
    }
```

اتباع مسار البحث عن $ \mathtt{y}$ سهل: عندما نقع عند عقدة ما $ \mathtt{u}$ في $ L_{\ensuremath{\mathtt{r}}}$ ، ننظر إلى اليمين إلى $ \mathtt{u.next[r].x}$ . فإذا كان $ \ensuremath{\mathtt{x}}>\ensuremath{\mathtt{u.next[r].x}}$ ، فإننا نتحرك خطوة إلى اليمين في $ L_{\ensuremath{\mathtt{r}}}$ ؛ وإلا فإننا ننزل إلى $ L_{\ensuremath{\mathtt{r}}-1}$ . وكل خطوة (يمينًا أو هبوطًا) في هذا البحث تستغرق زمنًا ثابتًا فقط؛ وبالتالي، وبموجب المُلم 4.1، فإن زمن التشغيل المتوقع للدالة $ \mathtt{find(x)}$ هو $ O(\log \ensuremath{\mathtt{n}})$ . وقبل أن نتمكن من إضافة عنصر إلى SkipListSSet، نحتاج إلى دالة تحاكي رمي العملات لتحديد ارتفاع العقدة الجديدة $ \mathtt{k}$ . ونفعل ذلك باختيار عدد صحيح عشوائي $ \mathtt{z}$ وعدّ البتات $ 1$ المتتابعة في التمثيل الثنائي لـ $ \mathtt{z}$ :4.1

```
    int pickHeight() {
        int z = rand.nextInt();
        int k = 0;
        int m = 1;
        while ((z & m) != 0) {
            k++;
            m <<= 1;
        }
        return k;
    }
```

لتنفيذ الدالة $ \mathtt{add(x)}$ في SkiplistSSet، نبحث عن $ \mathtt{x}$ ثم ندرج $ \mathtt{x}$ (splice) في بضعة قوائم $ L_0$ ,..., $ L_{\ensuremath{\mathtt{k}}}$ ، حيث يُختار $ \mathtt{k}$ باستخدام الدالة $ \mathtt{pickHeight()}$ . وأبسط طريقة للقيام بذلك هي استخدام مصفوفة $ \mathtt{stack}$ تتابع العقد عندها ينزل مسار البحث من قائمة ما $ L_{\ensuremath{\mathtt{r}}}$ إلى $ L_{\ensuremath{\mathtt{r}}-1}$ . وبأدق عبارة، $ \mathtt{stack[r]}$ هي العقدة في $ L_{\ensuremath{\mathtt{r}}}$ عندها نزل مسار البحث إلى $ L_{\ensuremath{\mathtt{r}}-1}$ . والعقد التي نعدّلها لإدراج $ \mathtt{x}$ هي بالضبط العقد $ \ensuremath{\mathtt{stack[0]}},\ldots,\ensuremath{\mathtt{stack[k]}}$ . ويطبّق الشيفرة التالية هذه الخوارزمية على $ \mathtt{add(x)}$ :

```
    boolean add(T x) {
        Node<T> u = sentinel;
        int r = h;
        int comp = 0;
        while (r >= 0) {
            while (u.next[r] != null 
                   && (comp = compare(u.next[r].x,x)) < 0)
                u = u.next[r];
            if (u.next[r] != null && comp == 0) return false;
            stack[r--] = u;          // going down, store u
        }
        Node<T> w = new Node<T>(x, pickHeight());
        while (h < w.height())
            stack[++h] = sentinel;   // height increased
        for (int i = 0; i < w.next.length; i++) {
            w.next[i] = stack[i].next[i];
            stack[i].next[i] = w;
        }
        n++;
        return true;
    }
```

يتم حذف عنصر $ \mathtt{x}$ بطريقة مماثلة، إلا أنه لا حاجة إلى $ \mathtt{stack}$ لمتابعة مسار البحث. ويمكن إجراء الحذف أثناء اتباع مسار البحث. نبحث عن $ \mathtt{x}$، وكلما تحرّك البحث إلى الأسفل من عقدة $ \mathtt{u}$$ ، نتحقق مما إذا كان $ \ensuremath{\mathtt{u.next.x}}=\ensuremath{\mathtt{x}}$ ، وإذا كان الأمر كذلك فإننا نزع $ \mathtt{u}$ من القائمة (splice):

```
    boolean remove(T x) {
        boolean removed = false;
        Node<T> u = sentinel;
        int r = h;
        int comp = 0;
        while (r >= 0) {
            while (u.next[r] != null 
                   && (comp = compare(u.next[r].x, x)) < 0) {
                u = u.next[r];
            }
            if (u.next[r] != null && comp == 0) {
                removed = true;
                u.next[r] = u.next[r].next[r];
                if (u == sentinel && u.next[r] == null)
                    h--;  // height has gone down
            }
            r--;
        }
        if (removed) n--;
        return removed;
    }
```

**الشكل 4.4:** إزالة العقدة التي تحتوي على $ 3$ من قائمة تخطٍ. ![\includegraphics[width=\textwidth ]{figs/skiplist-remove}](/images/open-data-structures/4_2_SkiplistSSet_Efficient_-img1703.png.webp) 4.2.1 ملخص تلخّص المبرهنة التالية أداء قوائم التخطي عند استخدامها لتنفيذ المجموعات المرتبة: **المبرهنة 4..1** *تنفّذ SkiplistSSet واجهة SSet. تدعم SkiplistSSet العمليات $ \mathtt{add(x)}$ ، $ \mathtt{remove(x)}$ ، و $ \mathtt{find(x)}$ بزمن متوقع قدره $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية.*

#### الحواشي

...:4.1 لا تُحاكي هذه الدالة تجربة رمي العملة تمامًا، لأن قيمة $ \mathtt{k}$ ستكون دائمًا أقل من عدد البتات في $ \mathtt{int}$ . غير أن لهذا تأثيرًا مهمَلًا ما لم يكن عدد العناصر في البنية أكبر بكثير من $ 2^{32}=4294967296$ . [opendatastructures.org](http://opendatastructures.org/)

## 4.3 SkiplistList: قائمة فعّالة ذات وصول عشوائي

**الأقسام الفرعية**

# 4.3 SkiplistList: قائمة فعّالة ذات وصول عشوائي

تنفّذ SkiplistList واجهة List باستخدام بنية قائمة التخطي. وفي SkiplistList، تحتوي $ L_0$ على عناصر القائمة بالترتيب الذي تظهر به في القائمة. وكما في SkiplistSSet، يمكن إضافة العناصر وحذفها والوصول إليها في زمن $ O(\log \ensuremath{\mathtt{n}})$ . ولتحقيق ذلك، نحتاج إلى وسيلة لاتباع مسار البحث عن العنصر ذي الفهرس $ \mathtt{i}$ في $ L_0$ . وأبسط طريقة للقيام بذلك هي تعريف مفهوم طول الحافة (edge) في قائمة ما $ L_{\ensuremath{\mathtt{r}}}$ . نعرّف طول كل حافة في $ L_{0}$ بأنه 1. ويُعرَّف طول الحافة $ \mathtt{e}$ في $ L_{\ensuremath{\mathtt{r}}}$ ، $ \ensuremath{\mathtt{r}}>0$ ، بأنه مجموع أطوال الحواف الواقعة أسفل $ \mathtt{e}$ في $ L_{\ensuremath{\mathtt{r}}-1}$ . وبالمثل، فإن طول $ \mathtt{e}$ هو عدد الحواف في $ L_0$ الواقعة أسفل $ \mathtt{e}$ . انظر الشكل 4.5 لمثال على قائمة تخطٍ معروضة فيها أطوال حوافها. وبما أن حواف قوائم التخطي مخزّنة في مصفوفات، فيمكن تخزين الأطوال بالطريقة نفسها:

```
    class Node {
        T x;
        Node[] next;
        int[] length;
        @SuppressWarnings("unchecked")
        Node(T ix, int h) {
            x = ix;
            next = (Node[])Array.newInstance(Node.class, h+1);
            length = new int[h+1];
        }
        int height() {
            return next.length - 1;
        }
    }
```

الخاصية المفيدة لهذا التعريف للطول هي أنه، إذا كنا حاليًا عند عقدة تقع في الموضع $ \mathtt{j}$ في $ L_0$ واتبعنا حافة طولها $ \ell$ ، فإننا ننتقل إلى عقدة يكون موضعها في $ L_0$ هو $ \ensuremath{\mathtt{j}}+\ell$ . وبهذه الطريقة، أثناء اتباع مسار البحث، يمكننا متابعة الموضع $ \mathtt{j}$ للعقدة الحالية في $ L_0$ . وعندما نقع عند عقدة $ \mathtt{u}$ في $ L_{\ensuremath{\mathtt{r}}}$ ، فإننا نتحرك إلى اليمين إذا كان $ \mathtt{j}$ مضافًا إليه طول الحافة $ \mathtt{u.next[r]}$ أصغر من $ \mathtt{i}$ . وإلا فإننا ننزل إلى $ L_{\ensuremath{\mathtt{r}}-1}$ .

```
    Node findPred(int i) {
        Node u = sentinel;
        int r = h;
        int j = -1;   // index of the current node in list 0
        while (r >= 0) {
            while (u.next[r] != null && j + u.length[r] < i) {
                j += u.length[r];
                u = u.next[r];
            }
            r--;
        }
        return u;
    }
```

```
    T get(int i) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        return findPred(i).next[0].x;
    }
    T set(int i, T x) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        Node u = findPred(i).next[0];
        T y = u.x;
        u.x = x;
        return y;
    }
```

ولأن أصعب جزء في العمليتين $ \mathtt{get(i)}$ و $ \mathtt{set(i,x)}$ هو العثور على العقدة ذات الفهرس $ \mathtt{i}$ في $ L_0$ ، فإن هاتين العمليتين تعملان في زمن $ O(\log \ensuremath{\mathtt{n}})$ . وإضافة عنصر إلى SkiplistList عند الموضع $ \mathtt{i}$ أمر بسيط إلى حد ما. وخلافًا لحالة SkiplistSSet، نحن نتيقن أن عقدة جديدة ستُضاف بالفعل، لذا يمكننا إجراء الإضافة في الوقت نفسه الذي نبحث فيه عن موضع العقدة الجديدة. نختار أولًا الارتفاع $ \mathtt{k}$ للعقدة المُدخلة حديثًا $ \mathtt{w}$ ، ثم نتبع مسار البحث عن $ \mathtt{i}$ . وكلما نزل مسار البحث من $ L_{\ensuremath{\mathtt{r}}}$ مع $ \ensuremath{\mathtt{r}}\le \ensuremath{\mathtt{k}}$ ، فإننا ندرج $ \mathtt{w}$ (splice) في $ L_{\ensuremath{\mathtt{r}}}$ . والاهتمام الإضافي الوحيد الضروري هو التأكد من تحديث أطوال الحواف تحديثًا صحيحًا. انظر الشكل 4.6.

لاحظ أن كلما نزل مسار البحث عند عقدة $ \mathtt{u}$ في $ L_{\ensuremath{\mathtt{r}}}$ ، يزداد طول الحافة $ \mathtt{u.next[r]}$ بمقدار واحد، لأننا نضيف عنصرًا أسفل تلك الحافة عند الموضع $ \mathtt{i}$ . وإدراج العقدة $ \mathtt{w}$ (splice) بين عقدتين $ \mathtt{u}$ و $ \mathtt{z}$ يتم بالطريقة المبيّنة في الشكل 4.7. وأثناء اتباعنا مسار البحث، فإننا نتابع بالفعل الموضع $ \mathtt{j}$ للعقدة $ \mathtt{u}$ في $ L_0$ . ومن ثم نعرف أن طول الحافة من $ \mathtt{u}$ إلى $ \mathtt{w}$ هو $ \ensuremath{\mathtt{i}}-\ensuremath{\mathtt{j}}$ . كما يمكننا استنتاج طول الحافة من $ \mathtt{w}$ إلى $ \mathtt{z}$ من الطول $ \ell$ للحافة من $ \mathtt{u}$ إلى $ \mathtt{z}$ . ومن ثم يمكننا إدراج $ \mathtt{w}$ وتحديث أطوال الحواف في زمن ثابت.

يبدو هذا أكثر تعقيدًا مما هو عليه، فالشيفرة في الواقع بسيطة إلى حد كبير:

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        Node w = new Node(x, pickHeight());
        if (w.height() > h) 
            h = w.height();
        add(i, w);
    }
```

```
    Node add(int i, Node w) {
        Node u = sentinel;
        int k = w.height();
        int r = h;
        int j = -1; // index of u
        while (r >= 0) {
            while (u.next[r] != null && j+u.length[r] < i) {
                j += u.length[r];
                u = u.next[r];
            }
            u.length[r]++; // accounts for new node in list 0
            if (r <= k) {
                w.next[r] = u.next[r];
                u.next[r] = w;
                w.length[r] = u.length[r] - (i - j);
                u.length[r] = i - j;
            }
            r--;
        }
        n++;
        return u;
    }
```

والآن، ينبغي أن يكون تنفيذ العملية $ \mathtt{remove(i)}$ في SkiplistList واضحًا. فنتبع مسار البحث عن العقدة عند الموضع $ \mathtt{i}$ . وكلما أخذ مسار البحث خطوة إلى الأسفل من عقدة $ \mathtt{u}$ عند المستوى $ \mathtt{r}$ ، فإننا ننقص واحدًا من طول الحافة الخارجة من $ \mathtt{u}$ عند ذلك المستوى. ونتحقق أيضًا مما إذا كانت $ \mathtt{u.next[r]}$ هي العنصر ذو الرتبة $ \mathtt{i}$ ، وإذا كان الأمر كذلك فإننا نزعها من القائمة عند ذلك المستوى. ويظهر مثال في الشكل 4.8.

```
    T remove(int i) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        T x = null;
        Node u = sentinel;
        int r = h;
        int j = -1; // index of node u
        while (r >= 0) {
            while (u.next[r] != null && j+u.length[r] < i) {
                j += u.length[r];
                u = u.next[r];
            }
            u.length[r]--;  // for the node we are removing
            if (j + u.length[r] + 1 == i && u.next[r] != null) {
                x = u.next[r].x;
                u.length[r] += u.next[r].length[r];
                u.next[r] = u.next[r].next[r];
                if (u == sentinel && u.next[r] == null)
                    h--;
            }
            r--;
        }
        n--;
        return x;
    }
```

4.3.1 ملخص تلخّص المبرهنة التالية أداء بنية البيانات SkiplistList: **المبرهنة 4..2** *تنفّذ SkiplistList واجهة List. تدعم SkiplistList العمليات $ \mathtt{get(i)}$ ، $ \mathtt{set(i,x)}$ ، $ \mathtt{add(i,x)}$ ، و $ \mathtt{remove(i)}$ بزمن متوقع قدره $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية.*

[opendatastructures.org](http://opendatastructures.org/)

## 4.4 تحليل قوائم التخطي

في هذا القسم، نحلّل الارتفاع والحجم وطول مسار البحث المتوقعة في قائمة تخطٍ. ويتطلب هذا القسم خلفية في الاحتمالات الأساسية. وتستند عدة براهين إلى الملاحظة الأساسية التالية حول رمي العملات. **المُلَم 4..2** *لنفترض أن $ T$ هو عدد مرات رمي عملة عادلة، حتى المرة الأولى التي يأتي فيها وجه العملة وشاملًا تلك الرمية. عندئذ $ \mathrm{E}[T]=2$ .*

*البرهان*. نفترض أننا نتوقف عن رمي العملة أول مرة يأتي فيها وجهها. ولنفعرّف المتغير المؤشّر (indicator variable)

![$\displaystyle I_{i} = \left\{\begin{array}{ll} 0 & \mbox{if the coin is tossed... ...\\ 1 & \mbox{if the coin is tossed $i$\ or more times} \end{array}\right. $](/images/open-data-structures/4_4_Analysis_Skiplists-img1789.png.webp)

لاحظ أن $ I_i=1$ إذا وفقط إذا كانت أول $ i-1$ رمية من رميات العملة قد جاءت بظهر العملة، لذا $ \mathrm{E}[I_i]=\Pr\{I_i=1\}=1/2^{i-1}$ . ولاحظ أن $ T$ ، وهو إجمالي عدد رميات العملة، يمكن كتابته على النحو $ T=\sum_{i=1}^{\infty} I_i$ . لذلك،

| $\displaystyle \mathrm{E}[T]$ | $\displaystyle = \mathrm{E}\left[\sum_{i=1}^\infty I_i\right]$ |  |
| --- | --- | --- |
|  | $\displaystyle = \sum_{i=1}^\infty \mathrm{E}\left[I_i\right]$ |  |
|  | $\displaystyle = \sum_{i=1}^\infty 1/2^{i-1}$ |  |
|  | $\displaystyle = 1 + 1/2 + 1/4 + 1/8 + \cdots$ |  |
|  | $\displaystyle = 2 \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1788.png.webp)

يخبرنا المُلَمان التاليان أن قوائم التخطي ذات حجم خطي: **المُلَم 4..3** *العدد المتوقع للعقد في قائمة تخطٍ تحتوي على $ \ensuremath{\mathtt{n}}$ عنصرًا، لا بما في ذلك ورودات الحارس، هو $ 2\ensuremath{\mathtt{n}}$ .*

*البرهان*. احتمال أن يُدرَج عنصر معيّن $ \mathtt{x}$ في القائمة $ L_{\ensuremath{\mathtt{r}}}$ هو $ 1/2^{\ensuremath{\mathtt{r}}}$ ، لذا فإن العدد المتوقع للعقد في $ L_{\ensuremath{\mathtt{r}}}$ هو $ \ensuremath{\mathtt{n}}/2^{\ensuremath{\mathtt{r}}}$ .4.2 ومن ثم فإن إجمالي العدد المتوقع للعقد في جميع القوائم هو

![$\displaystyle \sum_{\ensuremath{\mathtt{r}}=0}^\infty \ensuremath{\mathtt{n}}/2... ...athtt{n}}(1+1/2+1/4+1/8+\cdots) = 2\ensuremath{\mathtt{n}} \enspace . \qedhere $](/images/open-data-structures/4_4_Analysis_Skiplists-img1809.png.webp)

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1803.png.webp)

**المُلَم 4..4** *الارتفاع المتوقع لقائمة تخطٍ تحتوي على $ \mathtt{n}$ عنصرًا لا يتجاوز $ \log \ensuremath{\mathtt{n}} + 2$ .*

*البرهان*. لكل $ \ensuremath{\mathtt{r}}\in\{1,2,3,\ldots,\infty\}$ ، عرّف متغيرًا عشوائيًا مؤشّرًا

![$\displaystyle I_{\ensuremath{\mathtt{r}}} = \left\{\begin{array}{ll} 0 & \mbox... ...1 & \mbox{if $L_{\ensuremath{\mathtt{r}}}$\ is non-empty} \end{array}\right. $](/images/open-data-structures/4_4_Analysis_Skiplists-img1814.png.webp)

وعليه فإن ارتفاع قائمة التخطي $ \mathtt{h}$ يُعطى بـ

![$\displaystyle \ensuremath{\mathtt{h}} = \sum_{i=1}^\infty I_{\ensuremath{\mathtt{r}}} \enspace . $](/images/open-data-structures/4_4_Analysis_Skiplists-img1816.png.webp)

لاحظ أن $ I_{\ensuremath{\mathtt{r}}}$ لا يتجاوز أبدًا الطول $ \vert L_{\ensuremath{\mathtt{r}}}\vert$ للقائمة $ L_{\ensuremath{\mathtt{r}}}$ ، لذا

![$\displaystyle \mathrm{E}[I_{\ensuremath{\mathtt{r}}}] \le \mathrm{E}[\vert L_{\... ...t{r}}}\vert] = \ensuremath{\mathtt{n}}/2^{\ensuremath{\mathtt{r}}} \enspace . $](/images/open-data-structures/4_4_Analysis_Skiplists-img1820.png.webp)

لذلك لدينا

| $\displaystyle \mathrm{E}[\ensuremath{\mathtt{h}}]$ | $\displaystyle = \mathrm{E}\left[\sum_{r=1}^\infty I_{\ensuremath{\mathtt{r}}}\right]$ |  |
| --- | --- | --- |
|  | $\displaystyle = \sum_{\ensuremath{\mathtt{r}}=1}^{\infty} E[I_{\ensuremath{\mathtt{r}}}]$ |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 1](/images/open-data-structures/math-d2fcf0265b52a9f28c66.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 2](/images/open-data-structures/math-f005f04aba9cc1995529.webp) |  |
|  | $\displaystyle \le \log \ensuremath{\mathtt{n}} + \sum_{\ensuremath{\mathtt{r}}=0}^\infty 1/2^{\ensuremath{\mathtt{r}}}$ |  |
|  | $\displaystyle = \log \ensuremath{\mathtt{n}} + 2 \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1812.png.webp)

**المُلَم 4..5** *العدد المتوقع للعقد في قائمة تخطٍ تحتوي على $ \ensuremath{\mathtt{n}}$ عنصرًا، بما في ذلك جميع ورودات الحارس، هو $ 2\ensuremath{\mathtt{n}}+O(\log \ensuremath{\mathtt{n}})$ .*

*البرهان*. وبموجب المُلم 4.3، فإن العدد المتوقع للعقد، لا بما في ذلك الحارس، هو $ 2\ensuremath{\mathtt{n}}$ . وعدد ورودات الحارس يساوي ارتفاع قائمة التخطي $ \ensuremath{\mathtt{h}}$ ، لذا فإن بالجُلم 4.4 يكون العدد المتوقع لورودات الحارس لا يتجاوز $ \log \ensuremath{\mathtt{n}}+2 = O(\log \ensuremath{\mathtt{n}})$ . ![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1830.png.webp)

**المُلَم 4..6** *الطول المتوقع لمسار البحث في قائمة تخطٍ لا يتجاوز $ 2\log \ensuremath{\mathtt{n}} + O(1)$ .*

*البرهان*. أسهل طريقة لرؤية ذلك هي النظر في مسار البحث العكسي لعقدة $ \mathtt{x}$ . يبدأ هذا المسار من السابقة (predecessor) للعقدة $ \mathtt{x}$ في $ L_0$ . وفي أي لحظة، إذا كان بإمكان المسار الصعود مستوى، فإنه يفعل ذلك. وإذا لم يستطع الصعود مستوى، فإنه يذهب إلى اليسار. التفكير في هذا الأمر لدقائق قليلة سيقنعنا بأن مسار البحث العكسي للعقدة $ \mathtt{x}$ مطابق لمسار البحث عن $ \mathtt{x}$ ، إلا أنه معكوس.

يرتبط عدد العقد التي يزورها مسار البحث العكسي عند مستوى معيّن $ \mathtt{r}$ بالتجربة التالية: ارمِ عملة. فإذا جاءت العملة بوجهها، فارتقِ مستوى واحدًا وتوقّف. وإلا فارتح إلى اليسار وكرّر التجربة. ويمثّل عدد رميات العملة قبل ظهور الوجه عدد الخطوات إلى اليسار التي يخطوها مسار البحث العكسي عند مستوى معيّن.4.3 ويخبرنا المُلم 4.2 أن العدد المتوقع لرميات العملة قبل أول ظهور للوجه هو 1. ولنفترض أن $ S_{\ensuremath{\mathtt{r}}}$ تدل على عدد الخطوات التي يتخذها مسار البحث الأمامي عند المستوى $ \ensuremath{\mathtt{r}}$ ويتحرك بها إلى اليمين. وقد رجّحنا للتو أن $ \mathrm{E}[S_{\ensuremath{\mathtt{r}}}]\le 1$ . كذلك $ S_{\ensuremath{\mathtt{r}}}\le \vert L_{\ensuremath{\mathtt{r}}}\vert$ ، إذ لا يمكننا اتخاذ خطوات في $ L_{\ensuremath{\mathtt{r}}}$ أكثر من طول $ L_{\ensuremath{\mathtt{r}}}$ ، لذا

![$\displaystyle \mathrm{E}[S_{\ensuremath{\mathtt{r}}}] \le \mathrm{E}[\vert L_{\... ...t{r}}}\vert] = \ensuremath{\mathtt{n}}/2^{\ensuremath{\mathtt{r}}} \enspace . $](/images/open-data-structures/4_4_Analysis_Skiplists-img1848.png.webp)

ويمكننا الآن أن نُتمّ كما في برهان المُلم 4.4. ولنفترض أن $ S$ هو طول مسار البحث لعقدة ما $ \mathtt{u}$ في قائمة تخطٍ، وأن $ \ensuremath{\mathtt{h}}$ هو ارتفاع قائمة التخطي. عندئذ

| $\displaystyle \mathrm{E}[S]$ | $\displaystyle = \mathrm{E}\left[ \ensuremath{\mathtt{h}} + \sum_{\ensuremath{\mathtt{r}}=0}^\infty S_{\ensuremath{\mathtt{r}}} \right]$ |  |
| --- | --- | --- |
|  | $\displaystyle = \mathrm{E}[\ensuremath{\mathtt{h}}] + \sum_{\ensuremath{\mathtt{r}}=0}^\infty \mathrm{E}[S_{\ensuremath{\mathtt{r}}}]$ |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 3](/images/open-data-structures/math-ea7d1bbd5d990b5dc692.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 4](/images/open-data-structures/math-a1ec5ea486749c62ec98.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 5](/images/open-data-structures/math-bba1e5036c0dbda1de84.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 6](/images/open-data-structures/math-6ee314f429351b9ab936.webp) |  |
|  | $\displaystyle \le \mathrm{E}[\ensuremath{\mathtt{h}}] + \log \ensuremath{\mathtt{n}} + 3$ |  |
|  | $\displaystyle \le 2\log \ensuremath{\mathtt{n}} + 5 \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1835.png.webp)

تلخّص المبرهنة التالية نتائج هذا القسم: **المبرهنة 4..3** *لقائمة تخطٍ تحتوي على $ \ensuremath{\mathtt{n}}$ عنصرًا، الحجم المتوقع هو $ O(\ensuremath{\mathtt{n}})$ ، والطول المتوقع لمسار البحث عن أي عنصر بعينه لا يتجاوز $ 2\log \ensuremath{\mathtt{n}} + O(1)$ .*

#### الحواشي

....4.2 انظر القسم 1.3.4 لترى كيف يُشتق ذلك باستخدام المتغيرات المؤشّرة وخطية التوقع. ... مستوى.4.3 لاحظ أن هذا قد يُفرط في عدّ عدد الخطوات إلى اليسار، لأن التجربة ينبغي أن تنتهي إما عند أول ظهور للوجه أو عند وصول مسار البحث إلى الحارس، أيهما أسبق. وهذه ليست مشكلة لأن المُلم يقرّر حدًا أعلى فقط. [opendatastructures.org](http://opendatastructures.org/)

## 4.5 نقاش وتمارين

قدَّم Pugh [62] قوائم التخطي، وعرض أيضًا عددًا من تطبيقاتها وتوسيعاتها [61]. ومنذ ذلك الحين يجري دراستها على نطاق واسع. وقام عدة باحثين بإجراء تحليلات دقيقة إلى حد كبير للطول المتوقع وتباين طول مسار البحث عن العنصر $ \mathtt{i}$ في قائمة تخطٍ [45,44,58]. وقد طُوّرت نسخ حتمية (deterministic) [53]، ونسخ مُتحيّزة (biased) [8,26]، ونسخ ذاتية الضبط (self-adjusting) [12] من قوائم التخطي. وقد كُتبت تنفيذات لقوائم التخطي بلغات وأطر عمل مختلفة، واستُخدمت في أنظمة قواعد بيانات مفتوحة المصدر [71,63]. ويُستخدم أحد صيغ قوائم التخطي في هياكل إدارة العمليات في نواة نظام التشغيل HP-UX [42]. بل إن قوائم التخطي جزء من واجهة API في Java 1.6 [55]. **التمرين 4..1** ارسم مساري البحث عن 2.5 و 5.5 على قائمة التخطي في الشكل 4.1.

**التمرين 4..2** ارسم إضافة القيمة 0.5 (بارتفاع 1) ثم القيمة 3.5 (بارتفاع 2) إلى قائمة التخطي في الشكل 4.1.

**التمرين 4..3** ارسم حذف القيمة 1 ثم القيمة 3 من قائمة التخطي في الشكل 4.1.

**التمرين 4..4** ارسم تنفيذ $ \mathtt{remove(2)}$ على SkiplistList في الشكل 4.5.

**التمرين 4..5** ارسم تنفيذ $ \mathtt{add(3,x)}$ على SkiplistList في الشكل 4.5. افترض أن $ \mathtt{pickHeight()}$ يختار ارتفاعًا قدره 4 للعقدة المنشأة حديثًا.

**التمرين 4..6** بيّن أن العدد المتوقع للمؤشرات في SkiplistSet التي تتغيّر أثناء عملية $ \mathtt{add(x)}$ أو $ \mathtt{remove(x)}$ هو عدد ثابت.

**التمرين 4..7** افترض أنه بدلاً من ترقية عنصر من $ L_{i-1}$ إلى $ L_i$ استنادًا إلى رمية عملة، فإننا نرقّيه باحتمال ما $ p$ ، حيث $ 0 < p < 1$ . بيّن أن مع هذا التعديل يكون الطول المتوقع لمسار البحث لا يتجاوز $ (1/p)\log_{1/p} \ensuremath{\mathtt{n}} + O(1)$ . ما قيمة $ p$ التي تُصغّر التعبير السابق إلى أدنى حد؟ وما الارتفاع المتوقع لقائمة التخطي؟ وما العدد المتوقع للعقد في قائمة التخطي؟

**التمرين 4..8** تنفّذ الدالة $ \mathtt{find(x)}$ في SkiplistSet أحيانًا مقارنات زائدة (redundant)، وتحدث هذه عندما يُقارن $ \mathtt{x}$ بالقيمة نفسها أكثر من مرة. ويمكن أن تحدث عندما تكون، عند بعض العقد $ \mathtt{u}$ ، $ \ensuremath{\mathtt{u.next[r]}} = \ensuremath{\mathtt{u.next[r-1]}}$ . بيّن كيف تحدث هذه المقارنات الزائدة، وعدّل $ \mathtt{find(x)}$ بحيث تُتجنَّب. وحلّل العدد المتوقع من المقارنات التي تنفّذها الدالة $ \mathtt{find(x)}$ بعد تعديلها.

**التمرين 4..9** صمّم ونفّذ صيغة من قائمة التخطي تنفّذ واجهة SSet، لكنها تسمح أيضًا بالوصول السريع إلى العناصر حسب الرتبة. أي أنها تدعم أيضًا الدالة $ \mathtt{get(i)}$ التي تُعيد العنصر الذي رتبته $ \mathtt{i}$ في زمن متوقع قدره $ O(\log \ensuremath{\mathtt{n}})$ . (رتبة العنصر $ \mathtt{x}$ في مجموعة SSet هي عدد العناصر في مجموعة SSet الأقل من $ \mathtt{x}$ .)

**التمرين 4..10** الإصبع (finger) في قائمة التخطي هو مصفوفة تخزّن تسلسل العقد الموجودة على مسار البحث عندها ينزل مسار البحث. (المتغير $ \mathtt{stack}$ في شيفرة $ \mathtt{add(x)}$ في صفحة ![*](/images/open-data-structures/4_5_Discussion_Exercises-crossref.png.webp) هو إصبع؛ وتُظهر العقد المظلَّلة في الشكل 4.3 محتوى الإصبع.) ويمكن تخيّل الإصبع على أنه يشير إلى المسار المؤدّي إلى عقدة في أدنى القوائم، $ L_0$ . وينفّذ البحث بالإصبع (finger search) الدالة $ \mathtt{find(x)}$ باستخدام إصبع، بأن يصعد في القائمة مستخدمًا الإصبع حتى يبلغ عقدة $ \mathtt{u}$ بحيث $ \ensuremath{\mathtt{u.x}} < \ensuremath{\mathtt{x}}$ و $ \ensuremath{\mathtt{u.next}}=\ensuremath{\mathtt{null}}$ أو $ \ensuremath{\mathtt{u.next.x}} > \ensuremath{\mathtt{x}}$ ، ثم يُجري بحثًا عاديًا عن $ \mathtt{x}$ بدءًا من $ \mathtt{u}$ . ومن الممكن إثبات أن العدد المتوقع من الخطوات اللازمة للبحث بالإصبع هو $ O(1+\log r)$ ، حيث $ r$ هو عدد القيم في $ L_0$ الواقعة بين $ \mathtt{x}$ والقيمة التي يشير إليها الإصبع. نفّذ صنفًا فرعيًا (subclass) من Skiplist باسم SkiplistWithFinger ينفّذ عمليات $ \mathtt{find(x)}$ باستخدام إصبع داخلي. يخزّن هذا الصنف الفرعي إصبعًا يُستخدم بعد ذلك بحيث تُنفَّذ كل عملية $ \mathtt{find(x)}$ على هيئة بحث بالإصبع. وأثناء كل عملية $ \mathtt{find(x)}$ يُحدَّث الإصبع بحيث تستخدم كل عملية $ \mathtt{find(x)}$ ، كنقطة انطلاق، إصبعًا يشير إلى نتيجة عملية $ \mathtt{find(x)}$ السابقة.

**التمرين 4..11** اكتب دالة $ \mathtt{truncate(i)}$ تقتطع SkiplistList عند الموضع $ \mathtt{i}$ . وبعد تنفيذ هذه الدالة يصبح حجم القائمة $ \mathtt{i}$ ، وتحتوي على العناصر ذات الفهارس $ 0,\ldots,\ensuremath{\mathtt{i}}-1$ فقط. وقيمة الإعادة هي SkiplistList أخرى تحتوي على العناصر ذات الفهارس $ \ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{n}}-1$ . وينبغي أن تعمل هذه الدالة في زمن $ O(\log \ensuremath{\mathtt{n}})$ .

**التمرين 4..12** اكتب دالة في SkiplistList اسمها $ \mathtt{absorb(l2)}$ ، تأخذ كوسيط SkiplistList باسم $ \mathtt{l2}$ ، ثم تفرغه وتُلحق محتوياته بالترتيب بالمستقبِل. فمثلًا، إذا كان $ \mathtt{l1}$ يحتوي على $ a,b,c$ وكان $ \mathtt{l2}$ يحتوي على $ d,e,f$ ، فإن بعد استدعاء $ \mathtt{l1.absorb(l2)}$ سيحتوي $ \mathtt{l1}$ على $ a,b,c,d,e,f$ وسيكون $ \mathtt{l2}$ فارغًا. وينبغي أن تعمل هذه الدالة في زمن $ O(\log \ensuremath{\mathtt{n}})$ .

**التمرين 4..13** باستخدام الأفكار من القائمة الموفِّرة للمساحة، SEList، صمّم ونفّذ مجموعة SSet موفِّرة للمساحة، SESSet. ولتحقيق ذلك، خزّن البيانات بالترتيب في SEList، وخزّن كتل هذه SEList في مجموعة SSet. فإذا كان تنفيذ مجموعة SSet الأصلي يستخدم مساحة مقدارها $ O(\ensuremath{\mathtt{n}})$ لتخزين $ \mathtt{n}$ عنصرًا، فإن SESSet ستستخدم مساحة كافية لـ $ \mathtt{n}$ عنصرًا زائدًا $ O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}}+\ensuremath{\mathtt{b}})$ مساحة مهدورة.

**التمرين 4..14** باستخدام مجموعة SSet كبنية أساسية، صمّم ونفّذ تطبيقًا يقرأ ملفًا نصيًا (كبيرًا) ويسمح لك بالبحث، تفاعليًا، عن أي سلسلة جزئية (substring) واردة في النص. ومع أن يكتب المستخدم استعلامه، ينبغي أن يظهر الجزء المطابق من النص (إن وُجد) كنتيجة. تلميح 1: كل سلسلة جزئية هي بادئة لبعض اللاحقة (suffix)، لذا يكفي تخزين جميع لواحق الملف النصي. تلميح 2: يمكن تمثيل أي لاحقة على نحو مضغوط كعدد صحيح واحد يشير إلى موضع بدايتها في النص. اختبر تطبيقك على بعض النصوص الكبيرة، مثل بعض الكتب المتاحة في Project Gutenberg [1]. وإذا نُفِّذ بشكل صحيح، فإن تطبيقك سيكون سريع الاستجابة إلى حد كبير؛ فلا ينبغي أن يكون هناك تأخير ملحوظ بين ضغط ضغطات المفاتيح ورؤية النتائج.

**التمرين 4..15** (ينبغي أن يُنجز هذا التمرين بعد قراءة شجرة البحث الثنائي في القسم 6.2.) قارن بين قوائم التخطي وأشجار البحث الثنائي على النحو التالي: اشرح كيف يؤدي حذف بعض حواف قائمة تخطٍ إلى بنية تبدو كشجرة ثنائية وتتشابه مع شجرة بحث ثنائي. تستخدم قوائم التخطي وأشجار البحث الثنائي كلٌّ منها عددًا متقاربًا من المؤشرات (مؤشران لكل عقدة). لكن قوائم التخطي تستغل تلك المؤشرات استغلالًا أفضل. اشرح السبب.

[opendatastructures.org](http://opendatastructures.org/)
