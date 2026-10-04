---
title: "13. Data Structures for Integers"
lang: ar
source: https://opendatastructures.org/ods-java/13_Data_Structures_Integers.html
---

في هذا الفصل، نعود إلى مسألة تنفيذ مجموعة مرتَّبة (SSet). والفرق الآن أننا نفترض أنّ العناصر المخزَّنة في SSet أعدادٌ صحيحة بطول $ \mathtt{w}$ بت. أي أننا نريد تنفيذ $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ و $ \mathtt{find(x)}$ حيث $ \ensuremath{\mathtt{x}}\in\{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ . ومن السهل إلى حدٍّ ما أن نتخيّل تطبيقاتٍ كثيرة تكون فيها البيانات — أو على الأقلّ المفتاح الذي نستعمله في ترتيب البيانات — عددًا صحيحًا. وسنناقش ثلاث بنى بيانات، كلٌّ منها تبني على أفكار سابقتها. البنية الأولى، BinaryTrie، تنفّذ عمليات SSet الثلاث جميعها بزمن $ O(\ensuremath{\mathtt{w}})$ . وهذا ليس لافتًا للنظر، إذ إنّ أي مجموعة جزئية من $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ لها حجم $ \ensuremath{\mathtt{n}}\le 2^{\ensuremath{\mathtt{w}}}$ ، بحيث إنّ $ \log \ensuremath{\mathtt{n}} \le \ensuremath{\mathtt{w}}$ . وكل تنفيذات SSet الأخرى التي ناقشناها في هذا الكتاب تنفّذ جميع العمليات بزمن $ O(\log \ensuremath{\mathtt{n}})$ ، فهي كلّها على الأقلّ بسرعة BinaryTrie. أمّا البنية الثانية، XFastTrie، فتُسرّع البحث في BinaryTrie باستعمال التجزئة (hashing). ومع هذا التسريع تعمل العملية $ \mathtt{find(x)}$ بزمن $ O(\log \ensuremath{\mathtt{w}})$ . غير أنّ عمليتَي $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ في XFastTrie لا تزالان تستغرقان بزمن $ O(\ensuremath{\mathtt{w}})$ ، والمساحة التي يستعملها XFastTrie هي $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ . أمّا البنية الثالثة، YFastTrie، فتستعمل XFastTrie لتخزين عيّنة فقط، تقارب عنصرًا واحدًا من كلّ $ \ensuremath{\mathtt{w}}$ عناصر، وتخزّن بقية العناصر في بنية SSet معيارية. وتُنزل هذه الحيلة زمن تنفيذ $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ إلى $ O(\log \ensuremath{\mathtt{w}})$ وتُنزل المساحة إلى $ O(\ensuremath{\mathtt{n}})$ . أمّا التنفيذات المستعملة أمثلةً في هذا الفصل فيمكنها تخزين أيّ نوعٍ من البيانات، ما دام بإمكاننا إسناد عددٍ صحيحٍ إليها. وفي نماذج الشيفرة، يكون المتغيّر $ \mathtt{ix}$ دائمًا القيمة الصحيحة المسنَدة إلى $ \mathtt{x}$ ، وتحوّل الدالة $ \mathtt{in.}$ $ \mathtt{intValue(x)}$ القيمة $ \mathtt{x}$ إلى العدد الصحيح المسنَد إليها. أمّا في النصّ فسنكتفي بمعاملة $ \mathtt{x}$ كما لو كانت عددًا صحيحًا.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 13.1 BinaryTrie: شجرة بحث رقمية

يشفّر BinaryTrie مجموعةً من الأعداد الصحيحة بطول $ \mathtt{w}$ بت في شجرة ثنائية. فجميع الأوراق في الشجرة على العمق $ \mathtt{w}$ ، ويُشفَّر كلّ عدد صحيح في صورة مسارٍ يمتدّ من الجذر إلى ورقة. ويتّجه مسار العدد الصحيح $ \mathtt{x}$ إلى اليسار عند المستوى $ \mathtt{i}$ إذا كان البت $ \mathtt{i}$ th الأكثر أهميةً في $ \mathtt{x}$ يساوي 0، وإلى اليمين إذا كان يساوي 1. ويعرض الشكل 13.1 مثالًا للحالة $ \ensuremath{\mathtt{w}}=4$ ، حيث تخزّن شجرة البادئات (trie) الأعداد الصحيحة 3(0011) و9(1001) و12(1100) و13(1101).

لأنّ مسار البحث عن قيمةٍ ما، $ \mathtt{x}$ ، يعتمد على بتات $ \mathtt{x}$ نفسها، من المفيد أن نسمّي أبناء عقدةٍ ما، $ \mathtt{u}$ ، بالاسمين $ \mathtt{u.child[0]}$ ( $ \mathtt{left}$ ) و $ \mathtt{u.child[1]}$ ( $ \mathtt{right}$ ). وفي الواقع، تخدم مؤشّرات الأبناء هذين غرضين معًا. ولأنّ أوراق شجرة البادئات الثنائية لا أبناء لها، تُستعمل هذه المؤشّرات لوصل الأوراق ببعضها في قائمة مترابطة ثنائية الوصل (doubly-linked list). أمّا الورقة في شجرة البادئات الثنائية، $ \mathtt{u.child[0]}$ ( $ \mathtt{prev}$ ) فهي العقدة التي تسبق $ \mathtt{u}$ في القائمة، و $ \mathtt{u.child[1]}$ ( $ \mathtt{next}$ ) هي العقدة التي تلي $ \mathtt{u}$ في القائمة. وتُستعمل عقدةٌ خاصة، $ \mathtt{dummy}$ ، قبل أوّل عقدةٍ في القائمة وبعد آخر عقدةٍ فيها معًا (انظر القسم 3.2). وتحتوي كلّ عقدة، $ \mathtt{u}$ ، كذلك على مؤشّرٍ إضافي هو $ \mathtt{u.jump}$ . فإن كان الابن الأيسر لـ $ \mathtt{u}$ مفقودًا، فإنّ $ \mathtt{u.jump}$ يشير إلى أصغر ورقةٍ في الشجرة الفرعية لـ $ \mathtt{u}$ . وإن كان الابن الأيمن لـ $ \mathtt{u}$ مفقودًا، فإنّ $ \mathtt{u.jump}$ يشير إلى أكبر ورقةٍ في الشجرة الفرعية لـ $ \mathtt{u}$ . ويعرض الشكل 13.2 مثالًا على BinaryTrie يُظهر مؤشّرات $ \mathtt{jump}$ والقائمة المترابطة ثنائية الوصل عند الأوراق.

العملية $ \mathtt{find(x)}$ في BinaryTrie بسيطةٌ إلى حدٍّ ما. فنحن نحاول اتّباع مسار البحث عن $ \mathtt{x}$ في شجرة البادئات. فإذا بلغنا ورقة، فقد وجدنا $ \mathtt{x}$ . وإذا بلغنا عقدةً $ \mathtt{u}$ لا يمكننا المتابعة عندها (لأنّ $ \mathtt{u}$ تفتقر إلى ابن)، فإنّنا نتبع $ \mathtt{u.jump}$ ، الذي ينقلنا إمّا إلى أصغر ورقةٍ أكبر من $ \mathtt{x}$ أو إلى أكبر ورقةٍ أصغر من $ \mathtt{x}$ . وأيّ من هاتين الحالتين يقع يتوقّف على ما إذا كانت $ \mathtt{u}$ تفتقر إلى ابنها الأيسر أم إلى ابنها الأيمن، على التوالي. وفي الحالة الأولى ( $ \mathtt{u}$ تفتقر إلى ابنها الأيسر) فقد وجدنا العقدة التي نريدها. وفي الحالة الثانية ( $ \mathtt{u}$ تفتقر إلى ابنها الأيمن) يمكننا استعمال القائمة المترابطة للوصول إلى العقدة التي نريدها. ويوضّح الشكل 13.3 كلَّ واحدةٍ من هاتين الحالتين.

```
    T find(T x) {
        int i, c = 0, ix = it.intValue(x);
        Node u = r;
        for (i = 0; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            if (u.child[c] == null) break;
            u = u.child[c];
        }
        if (i == w) return u.x;  // found it
        u = (c == 0) ? u.jump : u.jump.child[next]; 
        return u == dummy ? null : u.x;
    }
```

يغلب على زمن تنفيذ الدالة $ \mathtt{find(x)}$ الزمن اللازم لاتّباع مسارٍ من الجذر إلى ورقة، ولذلك تعمل بزمن $ O(\ensuremath{\mathtt{w}})$ . أمّا العملية $ \mathtt{add(x)}$ في BinaryTrie فبسيطةٌ هي الأخرى، لكنّ عليها عملٌ كثير:

1. يتّبع مسار البحث عن $ \mathtt{x}$ حتى يبلغ عقدةً $ \mathtt{u}$ لم يعد في وسعه المتابعة.
2. ينشئ بقيّة مسار البحث من $ \mathtt{u}$ إلى ورقةٍ تحوي $ \mathtt{x}$ .
3. يضيف العقدةَ $ \mathtt{u'}$ ، التي تحوي $ \mathtt{x}$ ، إلى القائمة المترابطة للأوراق (ويستطيع الوصول إلى السابقة $ \mathtt{pred}$ لـ $ \mathtt{u'}$ في القائمة المترابطة من مؤشّر $ \mathtt{jump}$ لآخر عقدٍ، $ \mathtt{u}$ ، صادفها في الخطوة 1.)
4. يصعد عائدًا في مسار البحث عن $ \mathtt{x}$ ، ويعدّل مؤشّرات $ \mathtt{jump}$ عند العقد التي ينبغي أن يشير مؤشّر $ \mathtt{jump}$ فيها الآن إلى $ \mathtt{x}$ .

ويوضّح الشكل 13.4 مثالًا على إضافة عنصر.

```
    boolean add(T x) {
        int i, c = 0, ix = it.intValue(x);
        Node u = r;
        // 1 - search for ix until falling out of the trie
        for (i = 0; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            if (u.child[c] == null) break;
            u = u.child[c];
        }        
        if (i == w) return false; // already contains x - abort
        Node pred = (c == right) ? u.jump : u.jump.child[0];
        u.jump = null;  // u will have two children shortly
        // 2 - add path to ix
        for (; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            u.child[c] = newNode();
            u.child[c].parent = u;
            u = u.child[c];
        }
        u.x = x;
        // 3 - add u to linked list
        u.child[prev] = pred;
        u.child[next] = pred.child[next];
        u.child[prev].child[next] = u;
        u.child[next].child[prev] = u;
        // 4 - walk back up, updating jump pointers
        Node v = u.parent;
        while (v != null) {
            if ((v.child[left] == null 
                    && (v.jump == null || it.intValue(v.jump.x) > ix))
            || (v.child[right] == null 
                    && (v.jump == null || it.intValue(v.jump.x) < ix)))
                v.jump = u;
            v = v.parent;
        }
        n++;
        return true;
    }
```

تُجري هذه الدالة نزولًا واحدًا في مسار البحث عن $ \mathtt{x}$ وصعودًا واحدًا عائدًا. وتستغرق كلّ خطوةٍ من خطوتي الصعود والنزول زمنًا ثابتًا، ولذلك تعمل الدالة $ \mathtt{add(x)}$ بزمن $ O(\ensuremath{\mathtt{w}})$ . أمّا العملية $ \mathtt{remove(x)}$ فتلغي عمل $ \mathtt{add(x)}$ . ومثل $ \mathtt{add(x)}$ ، عليها عملٌ كثير:

1. يتّبع مسار البحث عن $ \mathtt{x}$ حتى يبلغ الورقةَ $ \mathtt{u}$ ، التي تحوي $ \mathtt{x}$ .
2. يزيل $ \mathtt{u}$ من القائمة المترابطة ثنائية الوصل.
3. يحذف $ \mathtt{u}$ ثمّ يصعد عائدًا في مسار البحث عن $ \mathtt{x}$ ، محذفًا العقد، حتى يبلغ عقدةً $ \mathtt{v}$ لها ابنٌ ليس على مسار البحث عن $ \mathtt{x}$ .
4. يصعد من $ \mathtt{v}$ إلى الجذر، محدِّثًا أيّ مؤشّرات $ \mathtt{jump}$ التي تشير إلى $ \mathtt{u}$ .

ويوضّح الشكل 13.5 مثالًا على إزالة عنصر.

```python
    boolean remove(T x) {
        // 1 - find leaf, u, containing x
        int i, c, ix = it.intValue(x);
        Node u = r;
        for (i = 0; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            if (u.child[c] == null) return false;
            u = u.child[c];
        }
        // 2 - remove u from linked list
        u.child[prev].child[next] = u.child[next];
        u.child[next].child[prev] = u.child[prev];
        Node v = u;
        // 3 - delete nodes on path to u
        for (i = w-1; i >= 0; i--) {
            c = (ix >>> w-i-1) & 1;
            v = v.parent;
            v.child[c] = null;
            if (v.child[1-c] != null) break;
        }
        // 4 - update jump pointers
        c = (ix >>> w-i-1) & 1;
        v.jump = u.child[1-c];
        v = v.parent;
        i--;
        for (; i >= 0; i--) {
            c = (ix >>> w-i-1) & 1;
            if (v.jump == u) 
                v.jump = u.child[1-c];
            v = v.parent;
        }
        n--;
        return true;
    }
```

**المبرهنة 13..1** *يُنفِّذ BinaryTrie واجهة SSet للأعداد الصحيحة بطول $ \mathtt{w}$ بت. ويدعم BinaryTrie العمليات $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ و $ \mathtt{find(x)}$ في زمن $ O(\ensuremath{\mathtt{w}})$ لكل عملية. والمساحة التي يستعملها BinaryTrie يخزّن $ \mathtt{n}$ قيمةً هي $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 13.2 XFastTrie: البحث في زمن لوغاريتمي مزدوج

أداء بنية BinaryTrie ليس لافتًا للنظر. فعدد العناصر، $ \mathtt{n}$ ، المخزَّنة في البنية لا يتجاوز $ 2^{\ensuremath{\mathtt{w}}}$ ، ولذلك فإنّ $ \log \ensuremath{\mathtt{n}}\le \ensuremath{\mathtt{w}}$ . بمعنى آخر، أيّ بنيةٍ من بنى SSet المبنيّة على المقارنات الموصوفة في أجزاءٍ أخرى من هذا الكتاب لا تقلّ كفاءةً عن BinaryTrie، وهي غير مقيّدة بتخزين الأعداد الصحيحة وحدها. ثمّ نصف الآن XFastTrie، وهي مجرّد BinaryTrie مع $ \mathtt{w+1}$ من جداول التجزئة (hash tables) — جدولٌ لكلّ مستوىٍ من مستويات شجرة البادئات. وتُستعمل جداول التجزئة هذه لتسريع العملية $ \mathtt{find(x)}$ إلى زمن $ O(\log \ensuremath{\mathtt{w}})$ . ولنتذكّر أنّ العملية $ \mathtt{find(x)}$ في BinaryTrie تكاد تكون منتهيةً بمجرد وصولنا إلى عقدة، $ \mathtt{u}$ ، يكون فيها مسار البحث عن $ \mathtt{x}$ راغبًا في الانتقال إلى $ \mathtt{u.right}$ (أو $ \mathtt{u.left}$ ) بينما $ \mathtt{u}$ ليس له ابنٌ أيمن (على سبيل المقابل، ابنٌ أيسر). وعند هذه النقطة، يقفز البحث بواسطة $ \mathtt{u.jump}$ إلى ورقةٍ، $ \mathtt{v}$ ، من أوراق BinaryTrie، ثمّ إمّا يعيد $ \mathtt{v}$ أو خليفتها في القائمة المترابطة للأوراق. ويُسرّع XFastTrie عملية البحث باستعمال البحث الثنائي (binary search) على مستويات شجرة البادئات لتحديد موضع العقدة $ \mathtt{u}$ . ولاستعمال البحث الثنائي، نحتاج طريقةً لمعرفة ما إذا كانت العقدة $ \mathtt{u}$ التي نبحث عنها فوق مستوىٍ معيّن، $ \mathtt{i}$ ، أم أنّ $ \mathtt{u}$ عند المستوى $ \mathtt{i}$ أو تحته. وتقدّم هذه المعلومة البتات $ \mathtt{i}$ الأعلى رتبةً في التمثيل الثنائي لـ $ \mathtt{x}$ ; فهذه البتات تحدّد مسار البحث الذي يسلكه $ \mathtt{x}$ من الجذر إلى المستوى $ \mathtt{i}$ . ولمثالٍ ما، راجع الشكل 13.6؛ ففي هذا الشكل، آخر عقدة، $ \mathtt{u}$ ، على مسار البحث عن 14 (الذي تمثيله الثنائي هو 1110) هي العقدة الموسومة $ 11{\star\star}$ عند المستوى 2، لأنّه لا توجد عقدةٌ موسومة $ 111{\star}$ عند المستوى 3. وبذلك، يمكننا وسم كلّ عقدةٍ عند المستوى $ \mathtt{i}$ بعددٍ صحيحٍ من $ \mathtt{i}$ بت. وعندئذٍ تكون العقدة $ \mathtt{u}$ التي نبحث عنها عند المستوى $ \mathtt{i}$ أو تحته إذا وفقط إذا وُجدت عقدةٌ عند المستوى $ \mathtt{i}$ يطابق وسمها البتات $ \mathtt{i}$ الأعلى رتبةً في $ \mathtt{x}$ .

في XFastTrie، نخزّن، لكلّ $ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{w}}\}$ ، جميع العقد عند المستوى $ \mathtt{i}$ في مجموعة غير مرتَّبة (USet)، هي $ \mathtt{t[i]}$ ، منفَّذةً في صورة جدول تجزئة (hash table) (الفصل 5). ويتيح لنا استعمال هذا USet أن نتحقّق بزمنٍ ثابتٍ متوقَّع ممّا إذا كانت هناك عقدةٌ عند المستوى $ \mathtt{i}$ يطابق وسمها البتات $ \mathtt{i}$ الأعلى رتبةً في $ \mathtt{x}$ . بل إنّنا نستطيع أصلًا أن نجد هذه العقدة باستعمال $ \mathtt{t[i].find(x\text{\ttfamily >>>}(w-i))}$ تتيح لنا جداول التجزئة $ \ensuremath{\mathtt{t[0]}},\ldots,\ensuremath{\mathtt{t[w]}}$ استعمال البحث الثنائي للعثور على $ \mathtt{u}$ . وفي البداية نعرف أنّ $ \mathtt{u}$ عند مستوىٍ ما، $ \mathtt{i}$ ، مع $ 0\le \ensuremath{\mathtt{i}}< \ensuremath{\mathtt{w}}+1$ . لذلك نُهيّئ $ \ensuremath{\mathtt{l}}=0$ و $ \ensuremath{\mathtt{h}}=\ensuremath{\mathtt{w}}+1$ ، وننظر تكرارًا في جدول التجزئة $ \mathtt{t[i]}$ ، حيث $ \ensuremath{\mathtt{i}}=\lfloor (\ensuremath{\mathtt{l+h}})/2\rfloor$ . فإذا كان $ \ensuremath{\mathtt{t[i]}}$ يحوي عقدةً يطابق وسمها البتات $ \mathtt{x}$ الأعلى رتبةً، أي البتات $ \mathtt{i}$ ، فإنّنا نضع $ \mathtt{l=i}$ ( $ \mathtt{u}$ عند المستوى $ \mathtt{i}$ أو تحته )؛ وإلّا فإنّنا نضع $ \mathtt{h=i}$ ( $ \mathtt{u}$ فوق المستوى $ \mathtt{i}$ ). وتنتهي هذه العملية حين يصبح $ \ensuremath{\mathtt{h-l}}\le 1$ ، وعندئذٍ نحدّد أنّ $ \mathtt{u}$ عند المستوى $ \mathtt{l}$ . ثمّ نُكمل العملية $ \mathtt{find(x)}$ باستعمال $ \mathtt{u.jump}$ والقائمة المترابطة ثنائية الوصل للأوراق.

```
    T find(T x) {
        int l = 0, h = w+1, ix = it.intValue(x);
        Node v, u = r, q = newNode();
        while (h-l > 1) {
            int i = (l+h)/2;
            q.prefix = ix >>> w-i;
            if ((v = t[i].find(q)) == null) {
                h = i;
            } else {
                u = v;
                l = i;
            }
        }
        if (l == w) return u.x;
        Node pred = (((ix >>> w-l-1) & 1) == 1) 
                 ? u.jump : u.jump.child[0];
        return (pred.child[next] == dummy) 
                     ? null : pred.child[next].x;
    }
```

تُنقص كلّ دورةٍ من دورات حلقة $ \mathtt{while}$ في الطريقة أعلاه $ \mathtt{h-l}$ بنحو النصف، ولذلك تجد هذه الحلقة $ \mathtt{u}$ بعد $ O(\log \ensuremath{\mathtt{w}})$ دورة. وتُجري كلّ دورة عملًا ثابت المقدار وعملية $ \mathtt{find(x)}$ واحدة في USet، وهي عملية تستغرق زمنًا متوقَّعًا ثابتًا. ولا يستغرق العمل المتبقّي سوى زمنٍ ثابت، ولذلك لا تستغرق الطريقة $ \mathtt{find(x)}$ في XFastTrie سوى $ O(\log\ensuremath{\mathtt{w}})$ زمنًا متوقَّعًا.

الدالتان $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ في XFastTrie متطابقتان تقريبًا مع الدالتين ذواتهما في BinaryTrie. والتعديلات الوحيدة هي الخاصة بإدارة جداول التجزئة $ \mathtt{t[0]}$ و... و $ \mathtt{t[w]}$ . وخلال العملية $ \mathtt{add(x)}$ ، حين تُنشأ عقدةٌ جديدة عند المستوى $ \mathtt{i}$ ، تُضاف هذه العقدة إلى $ \mathtt{t[i]}$ . وخلال العملية $ \mathtt{remove(x)}$ ، حين تُزال عقدةٌ من المستوى $ \mathtt{i}$ ، تُزال هذه العقدة من $ \mathtt{t[i]}$ . ولأنّ الإضافة والإزالة في جدول التجزئة تستغرقان زمنًا متوقَّعًا ثابتًا، فإنّ هذا لا يزيد زمنَي تنفيذ $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ إلّا بعاملٍ ثابت. ونُهمل عرض شيفرة $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ لأنّ الشيفرة تكاد تكون مطابقةً لشيفرة العرض (الطويلة) التي سبق أن قدّمناها للدالتين ذواتهما في BinaryTrie. وتُلخّص المبرهنة التالية أداء XFastTrie: **المبرهنة 13..2** *يُنفِّذ XFastTrie واجهة SSet للأعداد الصحيحة بطول $ \mathtt{w}$ بت. ويدعم XFastTrie العمليات * $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ في زمن $ O(\ensuremath{\mathtt{w}})$ متوقَّع لكل عملية، والعملية $ \mathtt{find(x)}$ في زمن $ O(\log \ensuremath{\mathtt{w}})$ متوقَّع لكل عملية. * والمساحة التي يستعملها XFastTrie يخزّن $ \mathtt{n}$ قيمةً هي $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 13.3 YFastTrie: مجموعة مرتَّبة بزمن لوغاريتمي مزدوج

يُعدّ XFastTrie تحسينًا هائلًا — بل أُسّيّ — على BinaryTrie من حيث زمن الاستعلام، لكنّ عمليتَي $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ لا تزالان بطيئتين نوعًا ما. وإضافةً إلى ذلك، فإنّ استهلاك المساحة، $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ ، أعلى من تنفيذات SSet الأخرى الموصوفة في هذا الكتاب، التي تشغل جميعها $ O(\ensuremath{\mathtt{n}})$ من المساحة. وهذان المشكلتان مترابطتان؛ فإذا كانت $ \mathtt{n}$ عملية $ \mathtt{add(x)}$ تبني بنيةً بحجم $ \ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}}$ ، فإنّ عملية $ \mathtt{add(x)}$ تتطلّب على الأقلّ زمنًا (ومساحةً) من رتبة $ \mathtt{w}$ لكل عملية. أمّا YFastTrie، الذي سنناقشه تاليًا، فيحسّن المساحة والسرعة معًا. ويستعمل YFastTrie بنية XFastTrie، $ \mathtt{xft}$ ، لكنّه لا يخزّن سوى $ O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{w}})$ قيمةً في $ \mathtt{xft}$ . وبهذه الطريقة، لا تتجاوز المساحة الإجمالية المستعملة في $ \mathtt{xft}$ حدود $ O(\ensuremath{\mathtt{n}})$ . وإضافةً إلى ذلك، فإنّ واحدةً فقط من كلّ $ \mathtt{w}$ عمليات $ \mathtt{add(x)}$ أو $ \mathtt{remove(x)}$ في YFastTrie تؤدّي إلى عملية $ \mathtt{add(x)}$ أو $ \mathtt{remove(x)}$ في $ \mathtt{xft}$ . وبهذا، لا يتجاوز متوسّط الكلفة التي يتحمّلها استدعاءُ $ \mathtt{xft}$ — أي عمليتَي $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ — قيمةً ثابتة. والسؤال الواضح يصبح: إذا كان $ \mathtt{xft}$ يخزّن $ \mathtt{n}$ / $ \mathtt{w}$ عنصرًا فقط، فإلى أين تذهب بقية العناصر $ \ensuremath{\mathtt{n}}(1-1/\ensuremath{\mathtt{w}})$؟ تنتقل هذه العناصر إلى بنى ثانوية، وهي في هذه الحالة نسخةٌ موسَّعة من Treap (القسم 7.2). وهناك نحو $ \mathtt{n}$ / $ \mathtt{w}$ من هذه البنى الثانوية، لذا يخزّن كلٌّ منها في المتوسّط $ O(\ensuremath{\mathtt{w}})$ عنصرًا. وتدعم Treap عمليات SSet بزمنٍ لوغاريتمي، ولذلك ستعمل العمليات على هذه الـTreap بزمن $ O(\log \ensuremath{\mathtt{w}})$، كما هو مطلوب. وبنحوٍ أكثر تحديدًا، يحتوي YFastTrie على XFastTrie، $ \mathtt{xft}$ ، يحوي عيّنةً عشوائية من البيانات، حيث يظهر كلّ عنصر في العيّنة باستقلالٍ واحتمال $ 1/\ensuremath{\mathtt{w}}$ . وللراحة، القيمة $ 2^{\ensuremath{\mathtt{w}}}-1$ محتواةٌ دائمًا في $ \mathtt{xft}$ . ولنفرض أنّ $ \ensuremath{\mathtt{x}}_0<\ensuremath{\mathtt{x}}_1<\cdots<\ensuremath{\mathtt{x}}_{k-1}$ تصف العناصر المخزَّنة في $ \mathtt{xft}$ . ومرتبطةً بكلّ عنصر، $ \ensuremath{\mathtt{x}}_i$ ، Treap، $ \ensuremath{\mathtt{t}}_i$ ، تخزّن جميع القيم في المدى $ \ensuremath{\mathtt{x}}_{i-1}+1,\ldots,\ensuremath{\mathtt{x}}_i$ . ويوضّح هذا الشكل 13.7.

العملية $ \mathtt{find(x)}$ في YFastTrie سهلةٌ إلى حدٍّ ما. فنحن نبحث عن $ \mathtt{x}$ في $ \mathtt{xft}$ ، ونجد قيمةً ما $ \ensuremath{\mathtt{x}}_i$ مرتبطةً بالـTreap $ \ensuremath{\mathtt{t}}_i$ . ثمّ نستعمل الدالة $ \mathtt{find(x)}$ الخاصة بالـTreap على $ \ensuremath{\mathtt{t}}_i$ للردّ على الاستعلام. والدالة بأكملها سطرٌ واحد:

```
    T find(T x) {
        return xft.find(new Pair<T>(it.intValue(x))).t.find(x);
    }
```

العملية $ \mathtt{find(x)}$ الأولى (على $ \mathtt{xft}$ ) تستغرق زمن $ O(\log\ensuremath{\mathtt{w}})$ . أمّا العملية $ \mathtt{find(x)}$ الثانية (على Treap) فتستغرق زمن $ O(\log r)$ ، حيث $ r$ هو حجم الـTreap. وفيما بعد من هذا القسم سنبيّن أنّ الحجم المتوقَّع للـTreap هو $ O(\ensuremath{\mathtt{w}})$ ، بحيث تستغرق هذه العملية زمن $ O(\log \ensuremath{\mathtt{w}})$ .13.1 وإضافة عنصرٍ إلى YFastTrie بسيطةٌ هي الأخرى في معظم الأحيان. تستدعي الدالة $ \mathtt{add(x)}$ الدالة $ \mathtt{xft.find(x)}$ لتحديد الـTreap، $ \mathtt{t}$ ، التي ينبغي أن يُدرج $ \mathtt{x}$ فيها. ثمّ تستدعي $ \mathtt{t.add(x)}$ لإضافة $ \mathtt{x}$ إلى $ \mathtt{t}$ . وعند هذه النقطة، ترمي عملةً بميل، تأتي وجوهًا باحتمال $ 1/\ensuremath{\mathtt{w}}$ وظهرًا باحتمال $ 1-1/\ensuremath{\mathtt{w}}$ . فإذا جاءت هذه العملة وجوهًا، فسيُضاف $ \mathtt{x}$ إلى $ \mathtt{xft}$ . وهنا تبدأ الأمورقليلاً في التعقيد. وحين يُضاف $ \mathtt{x}$ إلى $ \mathtt{xft}$ ، لا بدّ من تقسيم الـTreap $ \mathtt{t}$ إلى Treapَين، $ \mathtt{t1}$ و $ \mathtt{t'}$ . ويحتوي الـTreap $ \mathtt{t1}$ على جميع القيم الأصغر من $ \mathtt{x}$ أو المساوية لها؛ أمّا $ \mathtt{t'}$ فهو الـTreap الأصلي، $ \mathtt{t}$ ، بعد إزالة عناصر $ \mathtt{t1}$ منه. وبعد إتمام ذلك، نضيف الزوج $ \mathtt{(x,t1)}$ إلى $ \mathtt{xft}$ . ويعرض الشكل 13.8 مثالًا على ذلك.

```
    boolean add(T x) {
        int ix = it.intValue(x);
        STreap<T> t = xft.find(new Pair<T>(ix)).t;
        if (t.add(x)) {
            n++;
            if (rand.nextInt(w) == 0) {
                STreap<T> t1 = t.split(x);
                xft.add(new Pair<T>(ix, t1));
            }
            return true;
        } 
        return false;
    }
```

تستغرق إضافة $ \mathtt{x}$ إلى $ \mathtt{t}$ زمن $ O(\log \ensuremath{\mathtt{w}})$ . ويبيّن التمرين 7.12 أنّ تقسيم $ \mathtt{t}$ إلى $ \mathtt{t1}$ و $ \mathtt{t'}$ يمكن أن يتمّ أيضًا في زمن $ O(\log \ensuremath{\mathtt{w}})$ متوقَّع. أمّا إضافة الزوج ( $ \mathtt{x}$ ، $ \mathtt{t1}$ ) إلى $ \mathtt{xft}$ فتستغرق زمن $ O(\ensuremath{\mathtt{w}})$ ، لكنها لا تحدث إلّا باحتمال $ 1/\ensuremath{\mathtt{w}}$ . لذلك فإنّ زمن التشغيل المتوقَّع للعملية $ \mathtt{add(x)}$ هو

![$\displaystyle O(\log\ensuremath{\mathtt{w}}) + \frac{1}{\ensuremath{\mathtt{w}}}O(\ensuremath{\mathtt{w}}) = O(\log \ensuremath{\mathtt{w}}) \enspace . $](/images/open-data-structures/13_3_YFastTrie_Doubly_Logar-img5153.png.webp)

تلغي الدالة $ \mathtt{remove(x)}$ العمل الذي أدّته $ \mathtt{add(x)}$ . فنحن نستعمل $ \mathtt{xft}$ للعثور على الورقة، $ \mathtt{u}$ ، في $ \mathtt{xft}$ التي تحوي جواب $ \mathtt{xft.find(x)}$ . ومن $ \mathtt{u}$ ، نحصل على الـTreap، $ \mathtt{t}$ ، التي تحوي $ \mathtt{x}$ ونزيل $ \mathtt{x}$ من $ \mathtt{t}$ . فإذا كان $ \mathtt{x}$ مخزَّنًا أيضًا في $ \mathtt{xft}$ (و $ \mathtt{x}$ لا يساوي $ 2^{\ensuremath{\mathtt{w}}}-1$ )، فإنّنا نزيل $ \mathtt{x}$ من $ \mathtt{xft}$ ونضيف عناصر الـTreap الخاصة بـ $ \mathtt{x}$ إلى الـTreap، $ \mathtt{t2}$ ، التي يخزّنها خَلِفُ $ \mathtt{u}$ في القائمة المترابطة. ويوضّح هذا الشكل 13.9.

```
    boolean remove(T x) {
        int ix = it.intValue(x);
        Node<T> u = xft.findNode(ix);
        boolean ret = u.x.t.remove(x);
        if (ret) n--;
        if (u.x.x == ix && ix != 0xffffffff) {
            STreap<T> t2 = u.child[1].x.t;
            t2.absorb(u.x.t);
            xft.remove(u.x);
        }
        return ret;
    }
```

يستغرق العثور على العقدة $ \mathtt{u}$ في $ \mathtt{xft}$ زمنًا متوقَّعًا قدره $ O(\log\ensuremath{\mathtt{w}})$ . ويستغرق إزالة $ \mathtt{x}$ من $ \mathtt{t}$ زمنًا متوقَّعًا قدره $ O(\log\ensuremath{\mathtt{w}})$ . ومرةً أخرى، يبيّن التمرين 7.12 أنّ دمج جميع عناصر $ \mathtt{t}$ في $ \mathtt{t2}$ يمكن أن يتمّ في زمن $ O(\log\ensuremath{\mathtt{w}})$ . وإن كان ذلك ضروريًا، فإنّ إزالة $ \mathtt{x}$ من $ \mathtt{xft}$ تستغرق زمن $ O(\ensuremath{\mathtt{w}})$ ، لكنّ $ \mathtt{x}$ لا يكون محتوًى في $ \mathtt{xft}$ إلّا باحتمال $ 1/\ensuremath{\mathtt{w}}$ . لذلك فإنّ الزمن المتوقَّع لإزالة عنصرٍ من YFastTrie هو $ O(\log \ensuremath{\mathtt{w}})$ .

في النقاش السابق، أجّلنا البحت في أحجام الـTreap في هذه البنية إلى وقتٍ لاحق. وقبل أن نختم هذا الفصل، نبرهن النتيجة التي نحتاجها. **الملاحظة 13..1** *ليكن $ \mathtt{x}$ عددًا صحيحًا مخزَّنًا في YFastTrie، وليكن $ \ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}$ يدلّ على عدد العناصر في الـTreap، $ \mathtt{t}$ ، التي تحوي $ \mathtt{x}$ . عندئذٍ $ \mathrm{E}[\ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}] \le 2\ensuremath{\mathtt{w}}-1$ .*

*إثبات*. راجع الشكل 13.10. ولنفرض أنّ ![المعادلة الأصلية: ترتيب العناصر المخزنة في بنية واي فاست تراي، الصيغة 1](/images/open-data-structures/math-aa7dab8b971ea473c3d0.webp) تصف العناصر المخزَّنة في YFastTrie. ويحتوي الـTreap $ \mathtt{t}$ على بعض العناصر الأكبر من $ \mathtt{x}$ أو المساوية لها. وهذه هي $ \ensuremath{\mathtt{x}}_i,\ensuremath{\mathtt{x}}_{i+1},\ldots,\ensuremath{\mathtt{x}}_{i+j-1}$ ، حيث $ \ensuremath{\mathtt{x}}_{i+j-1}$ هو العنصر الوحيد من هذه العناصر الذي جاءت رمية العملة بميل في الدالة $ \mathtt{add(x)}$ فيه وجوهًا. بمعنى آخر، $ \mathrm{E}[j]$ يساوي العدد المتوقَّع لرمي العملة بميل اللازم للحصول على أول وجوه.13.2 وكلّ رمية العملة مستقلّة وتأتي وجوهًا باحتمال $ 1/\ensuremath{\mathtt{w}}$ ، ولذلك فإنّ $ \mathrm{E}[j]\le\ensuremath{\mathtt{w}}$ . (راجع الملاحظة 4.2 لتحليل هذا في الحالة $ \ensuremath{\mathtt{w}}=2$ .)

وبالمثل، فإنّ عناصر $ \mathtt{t}$ الأصغر من $ \mathtt{x}$ هي $ \ensuremath{\mathtt{x}}_{i-1},\ldots,\ensuremath{\mathtt{x}}_{i-k}$ حيث تأتي كلّ رميات العملة الـ $ k$ هذه ظهرًا، وتأتي رمية العملة الخاصة بـ $ \ensuremath{\mathtt{x}}_{i-k-1}$ وجوهًا. لذلك فإنّ $ \mathrm{E}[k]\le\ensuremath{\mathtt{w}}-1$ ، لأنّها تجربة رمي العملة عينها التي نظرنا إليها في الفقرة السابقة، غير أنّ الرمية الأخيرة لا تُحتسب فيها. وباختصار،

$ \ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}=j+k$ ، إذًا

![$\displaystyle \mathrm{E}[\ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}] = \ma... ...athrm{E}[j] + \mathrm{E}[k] \le 2\ensuremath{\mathtt{w}}-1 \enspace . \qedhere $](/images/open-data-structures/13_3_YFastTrie_Doubly_Logar-img5217.png.webp)

![$ \qedsymbol$](/images/open-data-structures/13_3_YFastTrie_Doubly_Logar-img5196.png.webp)

كانت الملاحظة 13.1 هي القطعة الأخيرة في برهان المبرهنة التالية، التي تلخّص أداء YFastTrie: **المبرهنة 13..3** *يُنفِّذ YFastTrie واجهة SSet للأعداد الصحيحة بطول $ \mathtt{w}$ بت. ويدعم YFastTrie العمليات $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ و $ \mathtt{find(x)}$ في زمن $ O(\log \ensuremath{\mathtt{w}})$ متوقَّع لكل عملية. والمساحة التي يستعملها YFastTrie يخزّن $ \mathtt{n}$ قيمةً هي $ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{w}})$ .*

حدّ $ \mathtt{w}$ في متطلّب المساحة يأتي من أنّ $ \mathtt{xft}$ يخزّن دائمًا القيمة $ 2^\ensuremath{\mathtt{w}}-1$ . ويمكن تعديل التنفيذ (على حساب إضافة بعض الحالات الإضافية إلى الشيفرة) بحيث يصبح تخزين هذه القيمة غير لازم. وعندئذٍ يصبح متطلّب المساحة في المبرهنة $ O(\ensuremath{\mathtt{n}})$ .

#### حواشٍ

... زمن.13.1 وهذا تطبيقٌ لمتراجحة جِنسن (Jensen's Inequality): إذا كان $ \mathrm{E}[r]=\ensuremath{\mathtt{w}}$ ، فإنّ $ \mathrm{E}[\log r] \le \log w$ . ... وجوهًا.13.2 وهذا التحليل يتجاهل أنّ $ j$ لا يتجاوز أبدًا $ \ensuremath{\mathtt{n}}-i+1$ . غير أنّ هذا يقلّل $ \mathrm{E}[j]$ فقط، ولذلك يبقى الحدّ الأعلى قائمًا. [opendatastructures.org](http://opendatastructures.org/)

## 13.4 مناقشة وتمارين

أوّل بنية بيانات توفّر عمليات بزمن $ O(\log\ensuremath{\mathtt{w}})$ هي عمليات $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ و $ \mathtt{find(x)}$ التي اقترحها van Emde Boas وصارت معروفة منذ ذلك الحين باسم شجرة van Emde Boas (أو الشجرة المتدرّجة (stratified)) [74]. وكانت بنية van Emde Boas الأصلية ذات حجم $ 2^{\ensuremath{\mathtt{w}}}$ ، ممّا يجعلها غير عمليةٍ للأعداد الصحيحة الكبيرة. واكتشف Willard [77] بنيتَي البيانات XFastTrie وYFastTrie. وترتبط بنية XFastTrie ارتباطًا وثيقًا بأشجار van Emde Boas؛ فمثلًا، تحلّ جداول التجزئة في XFastTrie محلَّ المصفوفات في شجرة van Emde Boas. أي إنّ شجرة van Emde Boas تخزّن، بدلًا من جدول التجزئة $ \mathtt{t[i]}$ ، مصفوفةً طولها $ 2^{\ensuremath{\mathtt{i}}}$ . وبنية أخرى لتخزين الأعداد الصحيحة هي أشجار الدمج (fusion trees) لفريدمان وويلارد [32]. ويمكن لهذه البنية أن تخزّن $ \mathtt{n}$ عددًا صحيحًا بطول $ \mathtt{w}$ بت في مساحة $ O(\ensuremath{\mathtt{n}})$ بحيث تعمل العملية $ \mathtt{find(x)}$ بزمن $ O((\log \ensuremath{\mathtt{n}})/(\log \ensuremath{\mathtt{w}}))$ . وباستعمال شجرة دمج حين $ \log \ensuremath{\mathtt{w}} > \sqrt{\log \ensuremath{\mathtt{n}}}$ و YFastTrie حين $ \log \ensuremath{\mathtt{w}} \le \sqrt{\log \ensuremath{\mathtt{n}}}$ ، نحصل على بنية بيانات تشغل $ O(\ensuremath{\mathtt{n}})$ من المساحة وتستطيع تنفيذ العملية $ \mathtt{find(x)}$ بزمن $ O(\sqrt{\log \ensuremath{\mathtt{n}}})$ . وتبيّن نتائج الحدود الدنيا الحديثة لـ P ![{\v{a\/}}\kern.05em](/images/open-data-structures/13_4_Discussion_Exercises-img5275.png.webp) tra ![{\c{s\/}}](/images/open-data-structures/13_4_Discussion_Exercises-img5276.png.webp) cu و Thorup [59] أنّ هذه النتائج مثلى إلى حدٍّ كبير، على الأقلّ بالنسبة إلى البنى التي لا تشغل إلّا $ O(\ensuremath{\mathtt{n}})$ من المساحة. **التمرين 13..1** صمّم ونفّذ نسخةً مبسَّطة من BinaryTrie لا تملك قائمة مترابطة ولا مؤشّرات قفز (jump pointers)، لكنّ العملية $ \mathtt{find(x)}$ تظلّ تعمل فيها بزمن $ O(\ensuremath{\mathtt{w}})$ .

**التمرين 13..2** صمّم ونفّذ تنفيذًا مبسَّطًا لـ XFastTrie لا يستعمل شجرة بادئات ثنائية إطلاقًا. وبدلًا من ذلك، ينبغي أن يخزّن تنفيذك كلّ شيء في قائمة مترابطة ثنائية الوصل وفي $ \ensuremath{\mathtt{w}}+1$ من جداول التجزئة.

**التمرين 13..3** يمكننا التفكير في BinaryTrie على أنها بنية تخزّن سلاسلَ بتاتٍ بطول $ \mathtt{w}$ بحيث يُمثَّل كلُّ سلسلة بتاتٍ بمسارٍ من الجذر إلى ورقة. ووسِّع هذه الفكرة إلى تنفيذ SSet يخزّن سلاسل متغيّرة الطول وينفّذ $ \mathtt{add(s)}$ و $ \mathtt{remove(s)}$ و $ \mathtt{find(s)}$ بزمن متناسب مع طول $ \mathtt{s}$ . تلميح: ينبغي أن تخزّن كلُّ عقدةٍ في بنية بياناتك جدول تجزئة مفهرسًا بقيم المحارف.

**التمرين 13..4** بالنسبة إلى العدد الصحيح $ \ensuremath{\mathtt{x}}\in\{0,\ldots2^{\ensuremath{\mathtt{w}}}-1\}$ ، ليكن $ d(\ensuremath{\mathtt{x}})$ يدلّ على الفرق بين $ \mathtt{x}$ والقيمة التي تعيدها $ \mathtt{find(x)}$ [وإذا أعادت $ \mathtt{find(x)}$ القيمة $ \mathtt{null}$ ، فإننا نعرّف $ d(\ensuremath{\mathtt{x}})$ بأنّه $ 2^\ensuremath{\mathtt{w}}$ ]. فمثلًا، إذا أعادت $ \mathtt{find(23)}$ القيمة 43، فإنّ $ d(23)=20$ . صمّم ونفّذ نسخةً معدَّلة من العملية $ \mathtt{find(x)}$ في XFastTrie تعمل بزمن $ O(1+\log d(\ensuremath{\mathtt{x}}))$ متوقَّع. تلميح: يحتوي جدول التجزئة $ t[\ensuremath{\mathtt{w}}]$ على جميع القيم، $ \mathtt{x}$ ، التي تحقّق $ d(\ensuremath{\mathtt{x}})=0$ ، ولذلك سيكون ذلك نقطة بدايةٍ جيدة. صمّم ونفّذ نسخةً معدَّلة من العملية $ \mathtt{find(x)}$ في XFastTrie تعمل بزمن $ O(1+\log\log d(\ensuremath{\mathtt{x}}))$ متوقَّع.

[opendatastructures.org](http://opendatastructures.org/)
