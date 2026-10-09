---
title: "3. القوائم المترابطة"
lang: ar
source: https://opendatastructures.org/ods-java/3_Linked_Lists.html
---

في هذا الفصل نواصل دراسة تنفيذات واجهة List، وهذه المرة باستخدام بنى بيانات قائمة على المؤشرات (pointer-based) بدلًا من المصفوفات. تتكوَّن البنى في هذا الفصل من عقد (nodes) تحتوي على عناصر القائمة. وتُربط العقد معًا في متسلسلة (sequence) بواسطة المراجع (المؤشرات). نبدأ بدراسة القوائم المترابطة أحادية الوصل (singly-linked lists)، التي تستطيع تنفيذ عمليات Stack وQueue (بترتيب FIFO) في زمن ثابت لكل عملية، ثم ننتقل إلى القوائم المترابطة ثنائية الوصل (doubly-linked lists)، التي تستطيع تنفيذ عمليات Deque في زمن ثابت. وللقوائم المترابطة مزايا وعيوب مقارنةً بتنفيذات واجهة List القائمة على المصفوفات. والعيب الأساسي هو فقدان القدرة على الوصول إلى أي عنصر بواسطة $ \mathtt{get(i)}$ أو $ \mathtt{set(i,x)}$ في زمن ثابت. وبدلًا من ذلك علينا أن نمرّ في القائمة عنصرًا تلو الآخر حتى نصل إلى العنصر $ \mathtt{i}$ . أما الميزة الأساسية فهي أنها أكثر ديناميكية: فبناءً على مرجع إلى أي عقدة في القائمة $ \mathtt{u}$ ، يمكننا حذف $ \mathtt{u}$ أو إدراج عقدة مجاورة لـ $ \mathtt{u}$ في زمن ثابت. وهذا صحيح أينما كانت $ \mathtt{u}$ في القائمة.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 3.1 SLList: قائمة مترابطة أحادية الوصل

**الأقسام الفرعية**

# 3.1 SLList: قائمة مترابطة أحادية الوصل

إن SLList (قائمة مترابطة أحادية الوصل) هي متسلسلة من عقد Node. وتخزّن كل عقدة $ \mathtt{u}$ قيمة بيانات $ \mathtt{u.x}$ ومرجعًا $ \mathtt{u.next}$ إلى العقدة التالية في المتسلسلة. أما العقدة الأخيرة $ \mathtt{w}$ في المتسلسلة فيكون $ \ensuremath{\mathtt{w.next}} = \ensuremath{\mathtt{null}}$

```
    class Node {
        T x;
        Node next;
    }
```

ولكفاءة التنفيذ، تستخدم SLList المتغيّرات $ \mathtt{head}$ و$ \mathtt{tail}$ لمتابعة العقدة الأولى والعقدة الأخيرة في المتسلسلة، وكذلك عددًا صحيحًا $ \mathtt{n}$ لمتابعة طول المتسلسلة:

```
    Node head;
    Node tail;
    int n;
```

يوضّح الشكل 3.1 متسلسلة من عمليات Stack وQueue على SLList.

تستطيع SLList تنفيذ عمليتَي Stack، وهما $ \mathtt{push()}$ و$ \mathtt{pop()}$، بكفاءة عبر إضافة العناصر وحذفها عند رأس المتسلسلة. إن عملية $ \mathtt{push()}$ ببساطة تنشئ عقدة جديدة $ \mathtt{u}$ بقيمة البيانات $ \mathtt{x}$ ، وتضبط $ \mathtt{u.next}$ على الرأس القديم للقائمة، وتجعل $ \mathtt{u}$ هو الرأس الجديد للقائمة. وأخيرًا هي تزيد $ \mathtt{n}$ بمقدار واحد لأن حجم SLList قد ازداد بمقدار واحد:

```
    T push(T x) {
        Node u = new Node();
        u.x = x;
        u.next = head;
        head = u;
        if (n == 0)
            tail = u;
        n++;
        return x;
    }
```

أما عملية $ \mathtt{pop()}$ ، بعد التحقق من أن SLList ليست فارغة، فتزيل الرأس عبر ضبط $ \ensuremath{\mathtt{head=head.next}}$ وإنقاص $ \mathtt{n}$ . وتحدث حالة خاصة عند إزالة العنصر الأخير، وعندئذ يُضبط $ \mathtt{tail}$ على $ \mathtt{null}$ :

```
    T pop() {
        if (n == 0)    return null;
        T x = head.x;
        head = head.next;
        if (--n == 0) tail = null;
        return x;
    }
```

من الواضح أن عمليتَي $ \mathtt{push(x)}$ و$ \mathtt{pop()}$ تعملان في زمن $ O(1)$ .

## 3.1.1 عمليات الطابور

تستطيع SLList كذلك تنفيذ عمليتَي الطابور من نوع FIFO، وهما $ \mathtt{add(x)}$ و$ \mathtt{remove()}$ ، في زمن ثابت. يتم الحذف من رأس القائمة، وهو مطابق تمامًا لعملية $ \mathtt{pop()}$ :

```
    T remove() {
        if (n == 0)    return null;
        T x = head.x;
        head = head.next;
        if (--n == 0) tail = null;
        return x;
    }
```

أما الإضافة، على النقيض، تتم عند ذيل القائمة. وفي معظم الحالات يتم ذلك عبر ضبط $ \ensuremath{\mathtt{tail.next}}=\ensuremath{\mathtt{u}}$ ، حيث $ \mathtt{u}$ هي العقدة المُنشأة حديثًا التي تحتوي على $ \mathtt{x}$ . غير أن حالة خاصة تحدث عندما $ \ensuremath{\mathtt{n}}=0$ ، وعندئذ يكون $ \ensuremath{\mathtt{tail}}=\ensuremath{\mathtt{head}}=\ensuremath{\mathtt{null}}$ . في هذه الحالة يُضبط كلٌّ من $ \mathtt{tail}$ و$ \mathtt{head}$ على $ \mathtt{u}$ .

```
    boolean add(T x) {
        Node u = new Node();
        u.x = x;
        if (n == 0) {
            head = u;
        } else {
            tail.next = u;
        }
        tail = u;
        n++;
        return true;
    }
```

من الواضح أن كلتا العمليتين $ \mathtt{add(x)}$ و$ \mathtt{remove()}$ تستغرقان زمنًا ثابتًا. 3.1.2 الملخّص تلخّص المبرهنة التالية أداء SLList: **مبرهنة 3.1** *يطبِّق SLList واجهتَي Stack وQueue (بترتيب FIFO). وتعمل العمليات $ \mathtt{push(x)}$ و$ \mathtt{pop()}$ و$ \mathtt{add(x)}$ و$ \mathtt{remove()}$ في زمن $ O(1)$ لكل عملية.*

يطبِّق SLList تقريبًا المجموعة الكاملة لعمليات Deque. والعملية الوحيدة المفقودة هي الحذف من ذيل SLList. والحذف من ذيل SLList صعب لأنه يتطلب تحديث قيمة $ \mathtt{tail}$ بحيث يشير إلى العقدة $ \mathtt{w}$ التي تسبق $ \mathtt{tail}$ في SLList؛ وهذه هي العقدة $ \mathtt{w}$ بحيث $ \ensuremath{\mathtt{w.next}}=\ensuremath{\mathtt{tail}}$ . وللأسف، الطريقة الوحيدة للوصول إلى $ \mathtt{w}$ هي اجتياز SLList بدءًا من $ \mathtt{head}$ مع أخذ $ \ensuremath{\mathtt{n}}-2$ خطوة. [opendatastructures.org](http://opendatastructures.org/)

## 3.2 DLList: قائمة مترابطة ثنائية الوصل

**الأقسام الفرعية**

# 3.2 DLList: قائمة مترابطة ثنائية الوصل

إن DLList (قائمة مترابطة ثنائية الوصل) مشابهة جدًا لـ SLList، إلا أن كل عقدة $ \mathtt{u}$ في DLList لها مراجع إلى العقدة $ \mathtt{u.next}$ التي تليها وإلى العقدة $ \mathtt{u.prev}$ التي تسبقها.

```
    class Node {
        T x;
        Node prev, next;
    }
```

وحينما نفّذنا SLList لاحظنا أنه كانت هناك دائمًا عدة حالات خاصة يجب الاهتمام بها. فمثلًا، إزالة العنصر الأخير من SLList أو إضافة عنصر إلى SLList فارغة تتطلب عنايةً لضمان تحديث $ \mathtt{head}$ و$ \mathtt{tail}$ بشكل صحيح. وفي DLList يزداد عدد هذه الحالات الخاصة بدرجة كبيرة. ولعل أنظف طريقة للاهتمام بكل هذه الحالات الخاصة في DLList هي إدخال عقدة $ \mathtt{dummy}$ . وهذه عقدة لا تحتوي على أي بيانات، لكنها تعمل كعنصر نائب (placeholder) بحيث لا توجد عقد خاصة؛ فكل عقدة لديها $ \mathtt{next}$ و$ \mathtt{prev}$ ، مع كون $ \mathtt{dummy}$ هي العقدة التي تلي آخر عقدة في القائمة وتسبق أول عقدة فيها. وبهذه الطريقة تُربط عقد القائمة بترابط ثنائي في دورة (cycle)، كما يوضّح الشكل 3.2.

```
    int n;
    Node dummy;
    DLList() {
        dummy = new Node();
        dummy.next = dummy;
        dummy.prev = dummy;
        n = 0;
    }
```

العثور على العقدة ذات الفهرس معيّن في DLList سهل؛ فإما أن نبدأ من رأس القائمة ( $ \mathtt{dummy.next}$ ) ونتقدّم إلى الأمام، أو نبدأ من ذيل القائمة ( $ \mathtt{dummy.prev}$ ) ونتراجع إلى الخلف. وهذا يتيح لنا الوصول إلى العقدة $ \mathtt{i}$ في زمن $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ :

```
    Node getNode(int i) {
        Node p = null;
        if (i < n / 2) {
            p = dummy.next;
            for (int j = 0; j < i; j++)
                p = p.next;
        } else {
            p = dummy;
            for (int j = n; j > i; j--)
                p = p.prev;
        }
        return p;
    }
```

أصبحت العمليتان $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ سهلتين أيضًا. فنبدأ بالعثور على العقدة $ \mathtt{i}$ ثم نجلب قيمتها $ \mathtt{x}$ أو نضبطها:

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        return getNode(i).x;
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Node u = getNode(i);
        T y = u.x;
        u.x = x;
        return y;
    }
```

ويُهيمن على زمن تنفيذ هذه العمليات الوقت اللازم للعثور على العقدة $ \mathtt{i}$ ، ويكون $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ .

## 3.2.1 الإضافة والحذف

إذا كان لدينا مرجع إلى عقدة $ \mathtt{w}$ في DLList أردنا إدراج عقدة $ \mathtt{u}$ قبل $ \mathtt{w}$ ، فلا{amsر سوى ضبط $ \ensuremath{\mathtt{u.next}}=\ensuremath{\mathtt{w}}$ و$ \ensuremath{\mathtt{u.prev}}=\ensuremath{\mathtt{w.prev}}$ ثم تعديل $ \mathtt{u.prev.next}$ و$ \mathtt{u.next.prev}$ . (انظر الشكل 3.3.) وبفضل عقدة dummy، لا حاجة للقلق بشأن غياب $ \mathtt{w.prev}$ أو $ \mathtt{w.next}$ .

```
    Node addBefore(Node w, T x) {
        Node u = new Node();
        u.x = x;
        u.prev = w.prev;
        u.next = w;
        u.next.prev = u;
        u.prev.next = u;
        n++;
        return u;
    }
```

والآن أصبح تنفيذ عملية القائمة $ \mathtt{add(i,x)}$ بسيطًا تامًّا. فنجد العقدة $ \mathtt{i}$ في DLList ونُدرِج عقدة جديدة $ \mathtt{u}$ تحتوي على $ \mathtt{x}$ قبلها مباشرة.

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        addBefore(getNode(i), x);
    }
```

الجزء الوحيد غير الثابت في زمن تنفيذ $ \mathtt{add(i,x)}$ هو الوقت اللازم للعثور على العقدة $ \mathtt{i}$ (باستخدام $ \mathtt{getNode(i)}$ ). ولذلك تعمل $ \mathtt{add(i,x)}$ في زمن $ O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ . أما حذف عقدة $ \mathtt{w}$ من DLList فسهل. فنحن بحاجة فقط إلى تعديل المؤشرين عند $ \mathtt{w.next}$ و$ \mathtt{w.prev}$ بحيث يتجاوزان $ \mathtt{w}$ . ومرة أخرى، يُلغي استخدام عقدة dummy الحاجة إلى اعتبار أي حالات خاصة:

```
    void remove(Node w) {
        w.prev.next = w.next;
        w.next.prev = w.prev;
        n--;
    }
```

والآن أصبحت عملية $ \mathtt{remove(i)}$ بسيطة تامًّا. فنجد العقدة ذات الفهرس $ \mathtt{i}$ ونحذفها:

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Node w = getNode(i);
        remove(w);
        return w.x;
    }
```

ومرة أخرى، الجزء الوحيد المكلف في هذه العملية هو العثور على العقدة $ \mathtt{i}$ باستخدام $ \mathtt{getNode(i)}$ ، ولذلك تعمل $ \mathtt{remove(i)}$ في زمن $ O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ . 3.2.2 الملخّص تلخّص المبرهنة التالية أداء DLList: **مبرهنة 3.2** *يطبِّق DLList واجهة List. وفي هذا التنفيذ، تعمل العمليات $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ و$ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في زمن $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ لكل عملية.*

من المفيد ملاحظة أنه، إذا تجاهلنا تكلفة عملية $ \mathtt{getNode(i)}$ ، فإن جميع العمليات على DLList تستغرق زمنًا ثابتًا. وبالتالي فإن الجزء الوحيد المكلف في العمليات على DLList هو العثور على العقدة المطلوبة. وبمجرد أن نتوفّر لدينا على العقدة المطلوبة، فإن الإضافة أو الحذف أو الوصول إلى البيانات في تلك العقدة لا يستغرق سوى زمن ثابت. وهذا في تناقض حادّ مع تنفيذات List القائمة على المصفوفات في الفصل 2؛ ففي تلك التنفيذات يمكن العثور على عنصر المصفوفة المطلوب في زمن ثابت. غير أن الإضافة أو الحذف تتطلّب إزاحة عناصر داخل المصفوفة، وهي عمومًا تستغرق زمنًا غير ثابت. ولهذا السبب فإن بنى القوائم المترابطة تناسب التطبيقات التي يمكن فيها الحصول على مراجع عقد القائمة بطرق خارجية. ومن أمثلتها بنية بيانات LinkedHashSet الموجودة في Java Collections Framework، حيث تُخزَّن مجموعة عناصر في قائمة مترابطة ثنائية الوصل وتُخزَّن عقد تلك القائمة في جدول تجزئة (hash table) (يُناقش في الفصل 5). وعندما تُزال العناصر من LinkedHashSet، يُستخدم جدول التجزئة للعثور على عقدة القائمة المطلوبة في زمن ثابت ثم تُحذف عقدة القائمة (أيضًا في زمن ثابت). [opendatastructures.org](http://opendatastructures.org/)

## 3.3 SEList: قائمة مترابطة موفّرة للمساحة

**الأقسام الفرعية**

# 3.3 SEList: قائمة مترابطة موفّرة للمساحة

أحد عيوب القوائم المترابطة (بخلاف الوقت اللازم للوصول إلى العناصر الموجودة في أعماق القائمة) هو استهلاكها للمساحة. تتطلّب كل عقدة في DLList مرجعين إضافيين إلى العقدة التالية والعقدة السابقة في القائمة. وحقلان من حقول Node مخصّصان لصيانة القائمة، ولا يبقى سوى حقل واحد لتخزين البيانات! ويقلّل SEList (قائمة موفّرة للمساحة) هذه المساحة المهدرة باستخدام فكرة بسيطة: فبدلًا من تخزين العناصر المفردة في DLList، نخزّن كتلة (block) تحتوي على عدة عناصر. وبعبارة أدق، يُعاير SEList بحجم الكتلة $ \mathtt{b}$ . وتخزّن كل عقدة مفردة في SEList كتلة يمكن أن تتّسع حتى $ \mathtt{b+1}$ عنصرًا. ولأسباب ستتضح لاحقًا، من المفيد أن نتمكّن من تنفيذ عمليات Deque على كل كتلة. وبنية البيانات التي نختارها لهذا هي BDeque (طابور مزدوج مقيَّد)، المشتق من بنية ArrayDeque الموصوفة في القسم 2.4. ويختلف BDeque عن ArrayDeque في فرق بسيط واحد: فعند إنشاء BDeque جديد، يكون حجم المصفوفة $ \mathtt{a}$ المؤسِّسة ثابتًا عند $ \mathtt{b+1}$ ولا يتزايد ولا يتناقص أبدًا. والخاصية المهمة في BDeque هي أنها تسمح بإضافة العناصر أو حذفها عند المقدّمة أو المؤخّرة في زمن ثابت. وسيكون هذا مفيدًا عند إزاحة العناصر من كتلة إلى أخرى.

```
    class BDeque extends ArrayDeque<T> {
        BDeque() {
            super(SEList.this.type());
            a = newArray(b+1);
        }
        void resize() { }
    }
```

يصبح SEList إذن قائمة مترابطة ثنائية الوصل من الكتل:

```
    class Node {
        BDeque d;
        Node prev, next;
    }
```

```
    int n;
    Node dummy;
```

3.3.1 متطلبات المساحة يفرض SEList قيودًا شديدة على عدد العناصر في الكتلة: فمالم تكن الكتلة هي الكتلة الأخيرة، فإن تلك الكتلة تحتوي على $ \ensuremath{\mathtt{b}}-1$ عنصرًا على الأقل و$ \ensuremath{\mathtt{b}}+1$ عنصرًا على الأكثر. وهذا يعني أنه إذا كان SEList يحتوي على $ \mathtt{n}$ عنصرًا، فإنه يحتوي على

$$
\displaystyle \ensuremath{\mathtt{n}}/(\ensuremath{\mathtt{b}}-1) + 1 = O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}})
$$

كتلة كحد أقصى. يحتوي BDeque الخاص بكل كتلة على مصفوفة طولها $ \ensuremath{\mathtt{b}}+1$ ، لكن في كل كتلة عدا الأخيرة، لا يُهدَر في هذه المصفوفة سوى قدر ثابت من المساحة. والذاكرة المتبقية المستخدَمة بواسطة الكتلة هي أيضًا ثابتة. وهذا يعني أن المساحة المهدرة في SEList هي $ O(\ensuremath{\mathtt{b}}+\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}})$ فقط. وباختيار قيمة لـ $ \mathtt{b}$ ضمن معامل ثابت من $ \sqrt{\ensuremath{\mathtt{n}}}$ ، يمكننا أن نجعل الحمل الزائد للمساحة في SEList يقترب من الحدّ الأدنى $ \sqrt{\ensuremath{\mathtt{n}}}$ المذكور في القسم 2.6.2.

## 3.3.2 العثور على العناصر

التحدّي الأول الذي نواجهه مع SEList هو العثور على عنصر القائمة ذي الفهرس $ \mathtt{i}$ . ولاحظ أن موقع العنصر يتكوّن من جزأين:

1. العقدة $ \mathtt{u}$ التي تحتوي على الكتلة التي تحتوي على العنصر ذو الفهرس $ \mathtt{i}$ ؛ و
2. الفهرس $ \mathtt{j}$ للعنصر داخل كتلته.

```
    class Location {
        Node u;
        int j;
        Location(Node u, int j) {
            this.u = u;
            this.j = j;
        }
    }
```

وللعثور على الكتلة التي تحتوي على عنصر معيّن، نتصرّف بالطريقة نفسها التي نتصرّف بها في DLList. فإما أن نبدأ من مقدّمة القائمة ونجتاز في الاتجاه الأمامي، أو من ذيل القائمة ونجتاز إلى الخلف حتى نصل إلى العقدة التي نريدها. والاختلاف الوحيد هو أنه، كلما انتقلنا من عقدة إلى التي تليها، نتخطى فوق كتلة كاملة من العناصر.

```
    Location getLocation(int i) {
        if (i < n/2) {
            Node u = dummy.next;
            while (i >= u.d.size()) {
                i -= u.d.size();
                u = u.next;
            }
            return new Location(u, i);
        } else {
            Node u = dummy;
            int idx = n;
            while (i < idx) {
                u = u.prev;
                idx -= u.d.size();
            }
            return new Location(u, i-idx);
        }
    }
```

تذكّر أن، باستثناء كتلة واحدة على الأكثر، تحتوي كل كتلة على $ \ensuremath{\mathtt{b}}-1$ عنصرًا على الأقل، لذا تقربنا كل خطوة في بحثنا $ \ensuremath{\mathtt{b}}-1$ عنصرًا من العنصر الذي نبحث عنه. وإذا كنا نبحث إلى الأمام، فهذا يعني أننا نصل إلى العقدة التي نريدها بعد $ O(1+\ensuremath{\mathtt{i}}/\ensuremath{\mathtt{b}})$ خطوة. وإذا كنا نبحث إلى الخلف، فنصل إلى العقدة التي نريدها بعد $ O(1+(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})/\ensuremath{\mathtt{b}})$ خطوة. وتأخذ الخوارزمية الأصغر من هاتين القيمتين تبعًا لقيمة $ \mathtt{i}$ ، لذا فإن الزمن اللازم لتحديد موقع العنصر ذي الفهرس $ \mathtt{i}$ هو $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ . وبمجرد أن نعرف كيفية تحديد موقع العنصر ذي الفهرس $ \mathtt{i}$ ، تتحوّل العمليتان $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ إلى جلب فهرس معيّن داخل الكتلة الصحيحة أو ضبطه:

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Location l = getLocation(i);
        return l.u.d.get(l.j);
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Location l = getLocation(i);
        T y = l.u.d.get(l.j);
        l.u.d.set(l.j,x);
        return y;
    }
```

ويُهيمن على زمن تنفيذ هذه العمليات الوقت اللازم لتحديد موقع العنصر، لذا فهي تعمل أيضًا في زمن $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ .

## 3.3.3 إضافة عنصر

إضافة العناصر إلى SEList أعقد قليلًا. وقبل النظر في الحالة العامة، نبحث عن العملية الأسهل، وهي $ \mathtt{add(x)}$ ، حيث يُضاف $ \mathtt{x}$ إلى نهاية القائمة. وإذا كانت الكتلة الأخيرة ممتلئة (أو غير موجودة لعدم وجود كتل بعد)، فإننا نخصّص كتلة جديدة أولًا ونُلحقها بقائمة الكتل. وبمجرد أن نتيقّن من وجود الكتلة الأخيرة وعدم امتلائها، نُلحق $ \mathtt{x}$ بالكتلة الأخيرة.

```
    boolean add(T x) {
        Node last = dummy.prev;
        if (last == dummy || last.d.size() == b+1) {
            last = addBefore(dummy);
        }
        last.d.add(x);
        n++;
        return true;
    }
```

يصبح الأمر أكثر تعقيدًا عندما نضيف إلى داخل القائمة باستخدام $ \mathtt{add(i,x)}$ . فنحن أولًا نحدّد موقع $ \mathtt{i}$ للحصول على العقدة $ \mathtt{u}$ التي تحتوي كتلتها على عنصر القائمة ذي الفهرس $ \mathtt{i}$ . والمشكلة أننا نريد إدراج $ \mathtt{x}$ في كتلة $ \mathtt{u}$ ، لكن علينا الاستعداد لحالة تكون فيها كتلة $ \mathtt{u}$ تحتوي بالفعل على $ \ensuremath{\mathtt{b}}+1$ عنصرًا، بحيث تكون ممتلئة ولا يوجد متّسع لها لـ $ \mathtt{x}$ . لنرمز بـ $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ إلى $ \mathtt{u}$ و$ \mathtt{u.next}$ و$ \mathtt{u.next.next}$ وهكذا. ونستكشف $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ بحثًا عن عقدة تستطيع توفير مساحة لـ $ \mathtt{x}$ . ويمكن أن تحدث ثلاث حالات أثناء استكشافنا للمساحة (انظر الشكل 3.4):

|  | ![ ](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1345.png.webp) |  |
| --- | --- | --- |
|  | ![ ](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1346.png.webp) |  |
|  | ![ ](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1347.png.webp) |  |

1. نجد بسرعة (في $ r+1\le \ensuremath{\mathtt{b}}$ خطوة) عقدة $ \ensuremath{\mathtt{u}}_r$ كتلتها ليست ممتلئة. في هذه الحالة، نُجري $ r$ إزاحة لعنصر من كتلة إلى التي تليها، بحيث تصبح المساحة الحرة في $ \ensuremath{\mathtt{u}}_r$ مساحة حرة في $ \ensuremath{\mathtt{u}}_0$ . يمكننا بعدها إدراج $ \mathtt{x}$ في كتلة $ \ensuremath{\mathtt{u}}_0$ .
2. نتجاوز بسرعة (في $ r+1\le \ensuremath{\mathtt{b}}$ خطوة) نهاية قائمة الكتل. في هذه الحالة، نضيف كتلة فارغة جديدة إلى نهاية قائمة الكتل ونتصرّف كما في الحالة الأولى.
3. بعد $ \mathtt{b}$ خطوات لا نجد أي كتلة ليست ممتلئة. في هذه الحالة، يكون $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ متسلسلة من $ \mathtt{b}$ كتل تحتوي كل منها على $ \ensuremath{\mathtt{b}}+1$ عنصرًا. نُدرِج كتلة جديدة $ \ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}}$ في نهاية هذه المتسلسلة ونوزّع العناصر الـ $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)$ الأصلية بحيث تحتوي كل كتلة من $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}}$ على $ \mathtt{b}$ عنصرًا بالضبط. والآن كتلة $ \ensuremath{\mathtt{u}}_0$ تحتوي على $ \mathtt{b}$ عناصر فقط، لذا يتّسع لها لإدراج $ \mathtt{x}$ .

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (i == n) {
            add(x);
            return;
        }
        Location l = getLocation(i);
        Node u = l.u;
        int r = 0;
        while (r < b && u != dummy && u.d.size() == b+1) {
            u = u.next;
            r++;
        }
        if (r == b) {      // b blocks each with b+1 elements
            spread(l.u);
            u = l.u;
        } 
        if (u == dummy) {  // ran off the end - add new node
            u = addBefore(u);
        }
        while (u != l.u) { // work backwards, shifting elements
            u.d.add(0, u.prev.d.remove(u.prev.d.size()-1));
            u = u.prev;
        }
        u.d.add(l.j, x);
        n++;
    }
```

يعتمد زمن تنفيذ عملية $ \mathtt{add(i,x)}$ على أيّ من الحالات الثلاث السابقة تحدث. وتتضمّن الحالتان 1 و2 فحص العناصر وإزاحتها عبر $ \mathtt{b}$ كتل كحد أقصى وتستغرقان زمن $ O(\ensuremath{\mathtt{b}})$ . أما الحالة 3 فتتضمّن استدعاء الطريقة $ \mathtt{spread(u)}$ ، التي تحرّك $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)$ عنصرًا وتستغرق زمن $ O(\ensuremath{\mathtt{b}}^2)$ . وإذا تجاهلنا تكلفة الحالة 3 (والتي سنحسبها لاحقًا بالتحليل المُلبَّد) فإن هذا يعني أن زمن التنفيذ الكلي لتحديد موقع $ \mathtt{i}$ وإدراج $ \mathtt{x}$ هو $ O(\ensuremath{\mathtt{b}}+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ .

## 3.3.4 حذف عنصر

حذف عنصر من SEList شبيه بإضافة عنصر. فنحن أولًا نحدّد موقع العقدة $ \mathtt{u}$ التي تحتوي على العنصر ذي الفهرس $ \mathtt{i}$ . والآن علينا الاستعداد للحالة التي لا يمكننا فيها حذف عنصر من $ \mathtt{u}$ دون أن تصبح كتلة $ \mathtt{u}$ أصغر من $ \ensuremath{\mathtt{b}}-1$ . ومرة أخرى، لنرمز بـ $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ إلى $ \mathtt{u}$ و$ \mathtt{u.next}$ و$ \mathtt{u.next.next}$ وهكذا. ونفحص $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ بالترتيب بحثًا عن عقدة نستطيع أن نستعير منها عنصرًا لجعل حجم كتلة $ \ensuremath{\mathtt{u}}_0$ على الأقل $ \ensuremath{\mathtt{b}}-1$ . وهناك ثلاث حالات يجب اعتبارها (انظر الشكل 3.5):

| ![ ](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1390.png.webp) |
| --- |
| ![ ](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1391.png.webp) |
| ![ ](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1392.png.webp) |

1. نجد بسرعة (في $ r+1\le \ensuremath{\mathtt{b}}$ خطوة) عقدة كتلتها تحتوي على أكثر من $ \ensuremath{\mathtt{b}}-1$ عنصرًا. في هذه الحالة، نُجري $ r$ إزاحة لعنصر من كتلة إلى السابقة لها، بحيث يصبح العنصر الزائد في $ \ensuremath{\mathtt{u}}_r$ عنصرًا زائدًا في $ \ensuremath{\mathtt{u}}_0$ . يمكننا بعدها حذف العنصر المناسب من كتلة $ \ensuremath{\mathtt{u}}_0$ .
2. نتجاوز بسرعة (في $ r+1\le \ensuremath{\mathtt{b}}$ خطوة) نهاية قائمة الكتل. في هذه الحالة، تكون $ \ensuremath{\mathtt{u}}_r$ هي الكتلة الأخيرة، ولا حاجة لأن تحتوي كتلة $ \ensuremath{\mathtt{u}}_r$ على $ \ensuremath{\mathtt{b}}-1$ عنصرًا على الأقل. ولذلك نتصرّف كما سبق، مستعيرين عنصرًا من $ \ensuremath{\mathtt{u}}_r$ ليكون عنصرًا زائدًا في $ \ensuremath{\mathtt{u}}_0$ . وإذا أدّى هذا إلى أن تصبح كتلة $ \ensuremath{\mathtt{u}}_r$ فارغة، فإننا نحذفها.
3. بعد $ \mathtt{b}$ خطوات، لا نجد أي كتلة تحتوي على أكثر من $ \ensuremath{\mathtt{b}}-1$ عنصرًا. في هذه الحالة، يكون $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ متسلسلة من $ \mathtt{b}$ كتل تحتوي كل منها على $ \ensuremath{\mathtt{b}}-1$ عنصرًا. نجمع العناصر الـ $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}-1)$ هذه في $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-2}$ بحيث تحتوي كل واحدة من هذه الـ $ \ensuremath{\mathtt{b}}-1$ كتلة على $ \mathtt{b}$ عنصرًا بالضبط، ونحذف $ \ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ التي صارت فارغة. والآن كتلة $ \ensuremath{\mathtt{u}}_0$ تحتوي على $ \mathtt{b}$ عنصرًا، ونتمكن بعدها من حذف العنصر المناسب منها.

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Location l = getLocation(i);
        T y = l.u.d.get(l.j);
        Node u = l.u;
        int r = 0;
        while (r < b && u != dummy && u.d.size() == b-1) {
            u = u.next;
            r++;
        }
        if (r == b) {  // b blocks each with b-1 elements
            gather(l.u);
        }
        u = l.u;
        u.d.remove(l.j);
        while (u.d.size() < b-1 && u.next != dummy) {
            u.d.add(u.next.d.remove(0));
            u = u.next;
        }
        if (u.d.isEmpty()) remove(u);
        n--;
        return y;
    }
```

وكما في عملية $ \mathtt{add(i,x)}$ ، فإن زمن تنفيذ عملية $ \mathtt{remove(i)}$ هو $ O(\ensuremath{\mathtt{b}}+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ إذا تجاهلنا تكلفة الطريقة $ \mathtt{gather(u)}$ التي تحدث في الحالة 3.

## 3.3.5 التحليل المُلبَّد للتوزيع والجمع

بعد ذلك، نبحث في تكلفة الطريقتين $ \mathtt{gather(u)}$ و$ \mathtt{spread(u)}$ اللتين قد تنفَّذان بواسطة الطريقتين $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ . ولأجل الاكتمال، إليك إياهما:

```
    void spread(Node u) {
        Node w = u;
        for (int j = 0; j < b; j++) {
            w = w.next;
        }
        w = addBefore(w);
        while (w != u) {
            while (w.d.size() < b)
                w.d.add(0,w.prev.d.remove(w.prev.d.size()-1));
            w = w.prev;
        }
    }
```

```
    void gather(Node u) {
        Node w = u;
        for (int j = 0; j < b-1; j++) {
            while (w.d.size() < b)
                w.d.add(w.next.d.remove(0));
            w = w.next;
        }
        remove(w);
    }
```

ويُهيمن على زمن تنفيذ كلٍّ من هاتين الطريقتين على الحلقتين المتداخلتين. وكلٌّ من الحلقة الداخلية والخارجية تُنفَّذ في أقصاه $ \ensuremath{\mathtt{b}}+1$ مرة، لذا فإن زمن التنفيذ الكلي لكلٍّ من هاتين الطريقتين هو $ O((\ensuremath{\mathtt{b}}+1)^2)=O(\ensuremath{\mathtt{b}}^2)$ . غير أن الملمّة التالية تبيّن أن هاتين الطريقتين لا تُنفَّذان إلا في حالة واحدة على الأكثر من كل $ \mathtt{b}$ استدعاءات لـ $ \mathtt{add(i,x)}$ أو $ \mathtt{remove(i)}$ . **ملمّة 3.1** *إذا أُنشئ SEList فارغ ونُفِّذت أي متسلسلة من $ m\ge 1$ استدعاءات لـ $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ، فإن الزمن الكلي المُقضى في جميع استدعاءات $ \mathtt{spread()}$ و$ \mathtt{gather()}$ هو $ O(\ensuremath{\mathtt{b}}m)$ .*

*البرهان*. سنستخدم طريقة الجهد (potential method) في التحليل المُلبَّد. نقول إن العقدة $ \mathtt{u}$ هشّة (fragile) إذا كانت كتلة $ \mathtt{u}$ لا تحتوي على $ \mathtt{b}$ عناصر (بحيث تكون $ \mathtt{u}$ إما العقدة الأخيرة، أو تحتوي على $ \ensuremath{\mathtt{b}}-1$ أو $ \ensuremath{\mathtt{b}}+1$ عنصرًا). وأي عقدة كتلتها تحتوي على $ \mathtt{b}$ عناصر هي متينة (rugged). ونعرّف جهد SEList بأنه عدد العقد الهشّة التي يحتويها. وسنعتبر عملية $ \mathtt{add(i,x)}$ فقط وعلاقتها بعدد استدعاءات $ \mathtt{spread(u)}$ . وتحليل $ \mathtt{remove(i)}$ و$ \mathtt{gather(u)}$ مطابق.

لاحظ أنه، إذا وقعت الحالة 1 أثناء الطريقة $ \mathtt{add(i,x)}$ ، فإن عقدة واحدة فقط، وهي $ \ensuremath{\mathtt{u}}_r$ ، يتغيّر حجم كتلتها. لذلك تنتقل عقدة واحدة على الأكثر، وهي $ \ensuremath{\mathtt{u}}_r$ ، من حالة المتانة إلى حالة الهشاشة. وإذا وقعت الحالة 2، فإن عقدة جديدة تُنشأ، وهذه العقدة هشّة، لكن أحجام أي عقدة أخرى لا تتغيّر، لذا يزداد عدد العقد الهشّة بمقدار واحد. وبالتالي، سواء في الحالة 1 أو الحالة 2، يزداد جهد SEList بمقدار واحد على الأكثر. وأخيرًا، إذا وقعت الحالة 3، فذلك لأن $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ كلها عقد هشّة. عندئذٍ يُستدعى $ \ensuremath{\mathtt{spread(}}u_0\ensuremath{\mathtt{)}}$ وتُستبدل هذه العقد الـ $ \mathtt{b}$ الهشّة بعقد متينة عددها $ \ensuremath{\mathtt{b}}+1$ . وأخيرًا يُضاف $ \mathtt{x}$ إلى كتلة $ \ensuremath{\mathtt{u}}_0$ مما يجعل $ \ensuremath{\mathtt{u}}_0$ هشّة. إجمالًا، ينخفض الجهد بمقدار $ \ensuremath{\mathtt{b}}-1$ . وباختصار، يبدأ الجهد من 0 (لا توجد عقد في القائمة). وكلما وقعت الحالة 1 أو الحالة 2، يزداد الجهد بمقدار 1 على الأكثر. وكلما وقعت الحالة 3، ينخفض الجهد بمقدار $ \ensuremath{\mathtt{b}}-1$ . الجهد (الذي يعدّ عدد العقد الهشّة) لا يقل أبدًا عن 0. ونستنتج أنه، لكل وقوع للحالة 3، هناك على الأقل $ \ensuremath{\mathtt{b}}-1$ وقوع للحالة 1 أو الحالة 2. وبالتالي، لكل استدعاء لـ $ \mathtt{spread(u)}$ هناك على الأقل $ \mathtt{b}$ استدعاءً لـ $ \mathtt{add(i,x)}$ . وهذا يُتمّ البرهان. $\qedsymbol$

3.3.6 الملخّص تلخّص المبرهنة التالية أداء بنية بيانات SEList: **مبرهنة 3.3** *يطبِّق SEList واجهة List. ومع تجاهل تكلفة استدعاءات $ \mathtt{spread(u)}$ و$ \mathtt{gather(u)}$ ، يدعم SEList ذو حجم الكتلة $ \mathtt{b}$ العمليتين * $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ في زمن $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ لكل عملية؛ و$ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ في زمن $ O(\ensuremath{\mathtt{b}}+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ لكل عملية. * وفوق ذلك، بدءًا من SEList فارغ، فإن أي متسلسلة من $ m$ عملية $ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ ينتج عنها زمن كلي مقداره $ O(\ensuremath{\mathtt{b}}m)$ يُقضى في جميع استدعاءات $ \mathtt{spread(u)}$ و$ \mathtt{gather(u)}$ . * * والمساحة (مقيسة بالكلمات)3.1 التي يستخدمها SEList الذي يخزّن $ \mathtt{n}$ عنصرًا هي $ \ensuremath{\mathtt{n}} +O(\ensuremath{\mathtt{b}} + \ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}})$ .*

إن SEList هو حلّ وسط (trade-off) بين ArrayList وDLList، حيث يعتمد المزيج النسبي بين هذين البنيتين على حجم الكتلة $ \mathtt{b}$ . وفي الطرف المتطرّف $ \ensuremath{\mathtt{b}}=2$ ، تخزّن كل عقدة في SEList ثلاث قيم كحد أقصى، وهو ما لا يختلف كثيرًا عن DLList. وفي الطرف المتطرّف الآخر، $ \ensuremath{\mathtt{b}}>\ensuremath{\mathtt{n}}$ ، تُخزَّن جميع العناصر في مصفوفة واحدة، تمامًا كما في ArrayList. وبين هذين الطرفين المتطرفين يقع حلّ وسط بين الزمن اللازم لإضافة عنصر قائمة أو حذفه والزمن اللازم لتحديد موقع عنصر قائمة معيّن.

#### الحواشي

... words)3.1 راجع القسم 1.4 لمناقشة كيفية قياس الذاكرة. [opendatastructures.org](http://opendatastructures.org/)

## 3.4 مناقشة والتمارين

كلتا القائمتين المترابطتين أحادية الوصل وثنائية الوصل هما أسلوبان راسخان، استُخدما في البرامج لأكثر من 40 عامًا. وقد ناقشهما، على سبيل المثال، نوت [46، الأقسام 2.2.3-2.2.5]. وحتى بنية بيانات SEList تبدو تمرينًا معروفًا في بنى البيانات. ويُشار إلى SEList أحيانًا بأنه قائمة مترابطة غير ملفوفة (unrolled linked list) [69]. وطريقة أخرى لتوفير المساحة في قائمة مترابطة ثنائية الوصل هي استخدام ما يُعرف بقوائم XOR. في قائمة XOR، تحتوي كل عقدة، $ \mathtt{u}$ ، على مؤشر واحد فقط، يُدعى $ \mathtt{u.nextprev}$ ، يحمل قيمة OR الحصري على مستوى البِتّات (bitwise exclusive-or) لـ $ \mathtt{u.prev}$ و$ \mathtt{u.next}$ . وتحتاج القائمة نفسها إلى تخزين مؤشرين، أحدهما إلى عقدة $ \mathtt{dummy}$ والآخر إلى $ \mathtt{dummy.next}$ (العقدة الأولى، أو $ \mathtt{dummy}$ إذا كانت القائمة فارغة). وتستخدم هذه التقنية الحقيقة التالية: إذا كان لدينا مؤشرات إلى $ \mathtt{u}$ و$ \mathtt{u.prev}$ ، يمكننا استخراج $ \mathtt{u.next}$ باستخدام الصيغة

$$
\displaystyle \ensuremath{\mathtt{u.next}} = \ensuremath{\mathtt{u.prev}} \verb+^+ \ensuremath{\mathtt{u.nextprev}} \enspace .
$$

(وهنا يحسب `^` قيمة OR الحصري على مستوى البِتّات لمِرَّعيه.) وتُعقِّد هذه التقنية الشيفرة قليلًا ولا يمكن تطبيقها في بعض اللغات مثل Java وPython التي تملك جمع القمامة، لكنها تقدّم تنفيذًا لقائمة مترابطة ثنائية الوصل يحتاج إلى مؤشر واحد فقط لكل عقدة. انظر مقالة Sinha في المجلة [70] لمناقشة تفصيلية لقوائم XOR.

**تمرين 3.1** لماذا لا يمكن استخدام عقدة dummy في SLList لتجنّب جميع الحالات الخاصة التي تحدث في العمليات $ \mathtt{push(x)}$ و$ \mathtt{pop()}$ و$ \mathtt{add(x)}$ و$ \mathtt{remove()}$ ؟

**تمرين 3.2** صمّم ونفّذ طريقة SLList اسمها $ \mathtt{secondLast()}$ تُعيد العنصر الثاني من الأخير في SLList. افعل ذلك دون استخدام متغيّر العضو $ \mathtt{n}$ الذي يتتبّع حجم القائمة.

**تمرين 3.3** نفّذ عمليات List $ \mathtt{get(i)}$ و$ \mathtt{set(i,x)}$ و$ \mathtt{add(i,x)}$ و$ \mathtt{remove(i)}$ على SLList. وينبغي أن تعمل كل واحدة من هذه العمليات في زمن $ O(1+\ensuremath{\mathtt{i}})$ .

**تمرين 3.4** صمّم ونفّذ طريقة SLList اسمها $ \mathtt{reverse()}$ تعكس ترتيب العناصر في SLList. وينبغي أن تعمل هذه الطريقة في زمن $ O(\ensuremath{\mathtt{n}})$ ، وألا تستخدم التعاود، وألا تستخدم أي بنى بيانات ثانوية، وألا تنشئ أي عقد جديدة.

**تمرين 3.5** صمّم ونفّذ طريقتي SLList وDLList اسمهما $ \mathtt{checkSize()}$ . تسيران هاتان الطريقتان في القائمة وتحسبان عدد العقد للتأكد مما إذا كان يطابق القيمة $ \mathtt{n}$ المخزّنة في القائمة. ولا تعيد هاتان الطريقتان أي شيء، لكنهما تُلقيان استثناءً إذا كان الحجم الذي تحسبانه لا يطابق قيمة $ \mathtt{n}$ .

**تمرين 3.6** حاول أن تعيد إنشاء الشيفرة الخاصة بعملية $ \mathtt{addBefore(w)}$ التي تنشئ عقدة $ \mathtt{u}$ وتضيفها في DLList قبل العقدة $ \mathtt{w}$ مباشرة. لا ترجع إلى هذا الفصل. حتى لو لم تطابق شيفرك تمامًا الشيفرة المعطاة في هذا الكتاب، فقد تكون صحيحة على أي حال. اختبرها وشاهد إن كانت تعمل.

التمارين التالية القليلة تنطوي على إجراء عمليات تعديل على قوائم DLList. وينبغي أن تُنجزها دون تخصيص أي عقد أو مصفوفات مؤقتة جديدة. ويمكن إنجازها جميعًا بتغيير قيمتي $ \mathtt{prev}$ و$ \mathtt{next}$ في العقد الموجودة فقط. **تمرين 3.7** اكتب طريقة DLList اسمها $ \mathtt{isPalindrome()}$ تعيد $ \mathtt{true}$ إذا كانت القائمة متناظرة (palindrome)، أي أن العنصر في الموضع $ \mathtt{i}$ يساوي العنصر في الموضع $ \ensuremath{\mathtt{n}}-i-1$ لكل $ i\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ . وينبغي أن تعمل شيفرك في زمن $ O(\ensuremath{\mathtt{n}})$ .

**تمرين 3.8** نفّذ طريقة اسمها $ \mathtt{rotate(r)}$ «تدوّر» DLList بحيث يصبح عنصر القائمة $ \mathtt{i}$ هو عنصر القائمة $ (\ensuremath{\mathtt{i}}+\ensuremath{\mathtt{r}})\bmod \ensuremath{\mathtt{n}}$ . وينبغي أن تعمل هذه الطريقة في زمن $ O(1+\min\{\ensuremath{\mathtt{r}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{r}}\})$ وألا تعدّل أي عقد في القائمة.

**تمرين 3.9** اكتب طريقة اسمها $ \mathtt{truncate(i)}$ تقتطع DLList عند الموضع $ \mathtt{i}$ . وبعد تنفيذ هذه الطريقة سيكون حجم القائمة هو $ \mathtt{i}$ وستحتوي فقط على العناصر ذات الفهارس $ 0,\ldots,\ensuremath{\mathtt{i}}-1$ . وقيمة الإعادة هي DLList أخرى تحتوي على العناصر ذات الفهارس $ \ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{n}}-1$ . وينبغي أن تعمل هذه الطريقة في زمن $ O(\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ .

**تمرين 3.10** اكتب طريقة DLList اسمها $ \mathtt{absorb(l2)}$ تأخذ كوسيط DLList، وهي $ \mathtt{l2}$ ، وتُفرغها ثم تلحق محتواها بالترتيب في القائمة المستقبِلة. فمثلًا، إذا كانت $ \mathtt{l1}$ تحتوي على $ a,b,c$ و$ \mathtt{l2}$ تحتوي على $ d,e,f$ ، فعند استدعاء $ \mathtt{l1.absorb(l2)}$ ، ستحتوي $ \mathtt{l1}$ على $ a,b,c,d,e,f$ وستكون $ \mathtt{l2}$ فارغة.

**تمرين 3.11** اكتب طريقة اسمها $ \mathtt{deal()}$ تزيل جميع العناصر ذات الفهارس الفردية من DLList وتعيد DLList تحتوي على هذه العناصر. فمثلًا، إذا كانت $ \mathtt{l1}$ تحتوي على العناصر $ a,b,c,d,e,f$ ، فعند استدعاء $ \mathtt{l1.deal()}$ ، ينبغي أن تحتوي $ \mathtt{l1}$ على $ a,c,e$ وأن تُعاد قائمة تحتوي على $ b,d,f$ .

**تمرين 3.12** اكتب طريقة اسمها $ \mathtt{reverse()}$ تعكس ترتيب العناصر في DLList.

**تمرين 3.13** يقودك هذا التمرين خطوة بخطوة إلى تنفيذ خوارزمية الفرز بالدمج (merge-sort) لفرز DLList، كما نوقش في القسم 11.1.1. وفي تنفيذك، قارن بين العناصر باستخدام الطريقة $ \mathtt{compareTo(x)}$ بحيث يصبح التنفيذ الناتج قادرًا على فرز أي DLList يحتوي على عناصر تنفّذ واجهة Comparable. اكتب طريقة DLList اسمها $ \mathtt{takeFirst(l2)}$ . تأخذ هذه الطريقة أول عقدة من $ \mathtt{l2}$ وتلحقها بالقائمة المستقبِلة. وهذا يعادل $ \mathtt{add(size(),l2.remove(0))}$ ، باستثناء أنها لا ينبغي أن تنشئ عقدة جديدة. اكتب طريقة DLList ساكنة اسمها $ \mathtt{merge(l1,l2)}$ ، تأخذ قائمتين مرتّبتين $ \mathtt{l1}$ و$ \mathtt{l2}$ ، وتدمجهما، وتعيد قائمة مرتّبة جديدة تحتوي على النتيجة. ويؤدي هذا إلى تفريغ $ \mathtt{l1}$ و$ \mathtt{l2}$ أثناء العملية. فمثلًا، إذا كانت $ \mathtt{l1}$ تحتوي على $ a,c,d$ و$ \mathtt{l2}$ تحتوي على $ b,e,f$ ، فإن هذه الطريقة تعيد قائمة جديدة تحتوي على $ a,b,c,d,e,f$ . اكتب طريقة DLList اسمها $ \mathtt{sort()}$ ترتّب العناصر الموجودة في القائمة باستخدام خوارزمية الفرز بالدمج. وتعمل هذه الخوارزمية التعاودية على النحو التالي: إذا كانت القائمة تحتوي على 0 أو 1 عنصر فلا يوجد ما يُفعل. بخلاف ذلك، باستخدام الطريقة $ \mathtt{truncate(size()/2)}$ ، قسّم القائمة إلى قائمتين متساويتي الطول تقريبًا، $ \mathtt{l1}$ و$ \mathtt{l2}$ ; رتّب $ \mathtt{l1}$ تعاوديًا ; رتّب $ \mathtt{l2}$ تعاوديًا ; وأخيرًا، ادمج $ \mathtt{l1}$ و$ \mathtt{l2}$ في قائمة مرتّبة واحدة.

التمارين التالية القليلة أكثر تقدّمًا وتتطلب فهمًا واضحًا لما يحدث للقيمة الدنيا المخزّنة في Stack أو Queue عند إضافة العناصر وإزالتها. **تمرين 3.14** صمّم ونفّذ بنية بيانات MinStack تستطيع تخزين عناصر قابلة للمقارنة وتدعم عمليات المكدس $ \mathtt{push(x)}$ و$ \mathtt{pop()}$ و$ \mathtt{size()}$ ، وكذلك عملية $ \mathtt{min()}$ التي تعيد أصغر قيمة مخزّنة حاليًا في بنية البيانات. وينبغي أن تعمل جميع العمليات في زمن ثابت.

**تمرين 3.15** صمّم ونفّذ بنية بيانات MinQueue تستطيع تخزين عناصر قابلة للمقارنة وتدعم عمليات الطابور $ \mathtt{add(x)}$ و$ \mathtt{remove()}$ و$ \mathtt{size()}$ ، وكذلك عملية $ \mathtt{min()}$ التي تعيد أصغر قيمة مخزّنة حاليًا في بنية البيانات. وينبغي أن تعمل جميع العمليات في زمن ثابت مُلبَّد.

**تمرين 3.16** صمّم ونفّذ بنية بيانات MinDeque تستطيع تخزين عناصر قابلة للمقارنة وتدعم جميع عمليات الطابور المزدوج $ \mathtt{addFirst(x)}$ و$ \mathtt{addLast(x)}$ $ \mathtt{removeFirst()}$ و$ \mathtt{removeLast()}$ و$ \mathtt{size()}$ ، وعملية $ \mathtt{min()}$ التي تعيد أصغر قيمة مخزّنة حاليًا في بنية البيانات. وينبغي أن تعمل جميع العمليات في زمن ثابت مُلبَّد.

التمارين التالية مصمَّمة لاختبار فهم القارئ لتنفيذ وتحليل SEList الموفّر للمساحة: **تمرين 3.17** أثبت أنه، إذا استُخدم SEList كمكدس Stack (بحيث تقتصر التعديلات الوحيدة على SEList على تنفيذ $ \ensuremath{\mathtt{push(x)}}\equiv \ensuremath{\mathtt{add(size(),x)}}$ و$ \ensuremath{\mathtt{pop()}}\equiv \ensuremath{\mathtt{remove(size()-1)}}$ )، فإن هذه العمليات تعمل في زمن ثابت مُلبَّد، بغضّ النظر عن قيمة $ \mathtt{b}$ .

**تمرين 3.18** صمّم ونفّذ نسخة من SEList تدعم جميع عمليات Deque في زمن ثابت مُلبَّد لكل عملية، بغضّ النظر عن قيمة $ \mathtt{b}$ .

**تمرين 3.19** اشرح كيفية استخدام معامل OR الحصري على مستوى البِتّات، `^`، لتبديل قيم متغيّري $ \mathtt{int}$ دون استخدام متغيّر ثالث.

[opendatastructures.org](http://opendatastructures.org/)
