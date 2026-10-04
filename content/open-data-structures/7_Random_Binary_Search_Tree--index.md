---
title: "7. Random Binary Search Trees"
lang: ar
source: https://opendatastructures.org/ods-java/7_Random_Binary_Search_Tree.html
---

في هذا الفصل، نقدّم بنية شجرة بحث ثنائية (binary search tree) تستخدم التوزيع العشوائي (randomization) لتحقيق $ O(\log \ensuremath{\mathtt{n}})$ زمن متوقَّع (expected time) لكل العمليات.

**الأقسام الفرعية**

[opendatastructures.org](http://opendatastructures.org/)

## 7.1 الأشجار الثنائية للبحث العشوائي

**الأقسام الفرعية**

# 7.1 الأشجار الثنائية للبحث العشوائي

تأمّل الشجرتين الثنائيتين للبحث الظاهرتين في الشكل 7.1، ولكلٍّ منهما $ \ensuremath{\mathtt{n}}=15$ عقدة. إنّ الشجرة على اليسار هي قائمة (list)، والأخرى شجرة بحث ثنائية متوازنة تمامًا. أمّا ارتفاع الشجرة على اليسار فهو $ \ensuremath{\mathtt{n}}-1=14$، وارتفاع الشجرة على اليمين ثلاثة. **الشكل 7.1:** شجرتان ثنائيتان للبحث تحتويان على الأعداد الصحيحة $ 0,\ldots,14$ . ![\includegraphics[scale=0.90909,scale=0.95]{figs/bst-path}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2843.png.webp) ![\includegraphics[scale=0.90909,scale=0.95]{figs/bst-balanced}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2844.png.webp) تخيّل كيف أمكن بناء هاتين الشجرتين. فالشجرة على اليسار تنتَج إذا ما بدأنا من BinarySearchTree فارغ وأضفنا التسلسل

$$
\displaystyle \langle 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14 \rangle \enspace .
$$

لا يوجد أي تسلسل إضافات آخر يولّد هذه الشجرة (ويمكنك إثبات ذلك بالاستدلال على $ \mathtt{n}$ ). وفي المقابل، يمكن توليد الشجرة على اليمين عن طريق التسلسل

$$
\displaystyle \langle 7,3,11,1,5,9,13,0,2,4,6,8,10,12,14 \rangle \enspace .
$$

وتسلسلات أخرى تعمل أيضًا، ومنها

$$
\displaystyle \langle 7,3,1,5,0,2,4,6,11,9,13,8,10,12,14 \rangle \enspace ,
$$

و

$$
\displaystyle \langle 7,3,1,11,5,0,2,4,6,9,13,8,10,12,14 \rangle \enspace .
$$

وفي الواقع، هناك $ 21,964,800$ تسلسل إضافات يولّد الشجرة على اليمين، وتسلسل واحد فقط يولّد الشجرة على اليسار.

يقدّم المثال السابق بعض الأدلة التجريبية على أنّه، إن اخترنا تبديلًا عشوائيًا (random permutation) لـ $ 0,\ldots,14$ وأضفناه إلى شجرة بحث ثنائية، فإنّنا أميل إلى الحصول على شجرة متوازنة جدًّا (جانب الشكل 7.1 الأيمن) أكثر من ميلنا إلى الحصول على شجرة غير متوازنة البتّة (جانب الشكل 7.1 الأيسر). ويمكننا ترسيخ هذه الفكرة بدقّة بدراسة الأشجار الثنائية للبحث العشوائية. وتُحصل شجرة البحث الثنائية العشوائية (random binary search tree) ذات الحجم $ \mathtt{n}$ بالطريقة التالية: خُذ تبديلًا عشوائيًا، $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{\ensuremath{\mathtt{n}}-1}$ ، للأعداد الصحيحة $ 0,\ldots,\ensuremath{\mathtt{n}}-1$ وأضف عناصره واحدًا تلو الآخر إلى BinarySearchTree. وبـ«التبديل العشوائي» نعني أنّ كلًّا من التبديلات (الترتيبات) الممكنة وعددها $ \ensuremath{\mathtt{n}}!$ لـ $ 0,\ldots,\ensuremath{\mathtt{n}}-1$ محتمِلة بالقدر نفسه، بحيث يكون احتمال الحصول على أيّ تبديل بعينه هو $ 1/\ensuremath{\mathtt{n}}!$ . ولاحظ أنّ القيم $ 0,\ldots,\ensuremath{\mathtt{n}}-1$ يمكن استبدالها بأي مجموعة مرتَّبة (ordered set) من $ \mathtt{n}$ عنصرًا دون أن يتغيّر أيٌّ من خصائص شجرة البحث الثنائية العشوائية. فالعنصر $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ ما هو إلا تمثيل للعنصر ذي الرتبة (rank) $ \mathtt{x}$ في مجموعة مرتَّبة ذات حجم $ \mathtt{n}$ . وقبل أن نعرض نتيجتنا الرئيسة عن الأشجار الثنائية للبحث العشوائية، لا بدّ من أن نتوقّف قليلًا عند استطراد قصير نتناول فيه نوعًا من الأعداد يتكرّر كثيرًا عند دراسة البنى العشوائية. فبالنسبة إلى عدد صحيح غير سالب، $ k$، يُعرَّف العدد التوافقي (harmonic number) رقم $ k$، ويُرمَز إليه بـ $ H_k$، بالتعريف

$$
\displaystyle H_k = 1 + 1/2 + 1/3 + \cdots + 1/k \enspace .
$$

وليس للعدد التوافقي $ H_k$ صيغة مغلقة بسيطة، لكنه يرتبط ارتباطًا وثيقًا جدًّا باللوغاريتم الطبيعي (natural logarithm) لـ $ k$ . وبخاصة،

$$
\displaystyle \ln k < H_k \le \ln k + 1 \enspace .
$$

ولعلّ من درس التفاضل والتكامل أن يلاحظ أنّ السبب في ذلك هو التكامل $ \int_1^k\! (1/x)\, \mathrm{d}x= \ln k$ . وإذا تذكّرنا أنّ التكامل يمكن تفسيره كمساحة محصورة بين منحنى ومحور $ x$ ، أمكننا وضع حدٍّ أدنى (lower bound) لقيمة $ H_k$ يساوي التكامل $ \int_1^k\! (1/x)\, \mathrm{d}x$، وحدٍّ أعلى (upper bound) يساوي $ 1+ \int_1^k\! (1/x)\, \mathrm{d}x$ . (راجع الشكل 7.2 لشرحٍ بياني.)

**الشكل 7.2:** العدد التوافقي رقم $ k$، أي $ H_k=\sum_{i=1}^k 1/i$ ، محدود من أعلى ومنأسفل بتكاملَين. فقيمة هذين التكاملَين تُعطى بمساحة المنطقة المظلَّلة، بينما قيمة $ H_k$ تُعطى بمساحة المستطيلات. ![\includegraphics[width=\textwidth ]{figs/harmonic-2}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2878.png.webp) ![\includegraphics[width=\textwidth ]{figs/harmonic-3}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2879.png.webp) **الملمّة 7.1** *في شجرة بحث ثنائية عشوائية ذات حجم $ \mathtt{n}$ ، تنطبق العبارتان التاليتان: * لأي $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ ، يكون الطول المتوقَّع لمسار البحث عن $ \mathtt{x}$ هو $ H_{\ensuremath{\mathtt{x}}+1} + H_{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}} - O(1)$ .7.1 لأي $ \ensuremath{\mathtt{x}}\in(-1,n)\setminus\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ ، يكون الطول المتوقَّع لمسار البحث عن $ \mathtt{x}$ هو $ H_{\lceil\ensuremath{\mathtt{x}}\rceil} + H_{\ensuremath{\mathtt{n}}-\lceil\ensuremath{\mathtt{x}}\rceil}$ .

سنبرهن على الملمة 7.1 في القسم التالي. أمّا الآن، فلننظر فيما تخبرنا به الجزأان من الملمة 7.1. فأمّا الجزء الأول فيخبرنا أنّه إذا بحثنا عن عنصر في شجرة ذات حجم $ \mathtt{n}$ ، فإنّ الطول المتوقَّع لمسار البحث يساوي على الأكثر $ 2\ln n + O(1)$ . وأمّا الجزء الثاني فيخبرنا بالأمر نفسه عند البحث عن قيمة غير مخزَّنة في الشجرة. وعندما نقارن بين جزأَي الملمة، نرى أنّ البحث عن شيءٍ موجود في الشجرة أسرع قليلًا فقط ممّا هو عليه البحث عن شيءٍ ليس فيها. 7.1.1 برهان الملمة 7.1 الملاحظة المفتاحية اللازمة لبرهان الملمة 7.1 هي التالية: يحتوي مسار البحث عن قيمة $ \mathtt{x}$ تقع في الفترة المفتوحة $ (-1,\ensuremath{\mathtt{n}})$ في شجرة بحث ثنائية عشوائية، $ T$ ، على العقدة ذات المفتاح $ i < \ensuremath{\mathtt{x}}$ إذا وفقط إذا، في التبديل العشوائي المستخدَم لإنشاء $ T$، كان $ i$ يظهر قبل أيٍّ من $ \{i+1,i+2,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ . ولمعرفة ذلك، راجع الشكل 7.3 ولاحظ أنّه إلى أن تُضاف قيمة ما في $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$، تكون مسارات البحث عن كل قيمة في الفترة المفتوحة $ (i-1,\lfloor\ensuremath{\mathtt{x}}\rfloor+1)$ متطابقة. (وتذكّر أنّه كي تختلف مسارات البحث عن قيمتين، لا بدّ من وجود عنصر في الشجرة يُقارَن بهما على نحو مختلف.) وليكن $ j$ أول عنصر في $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ يظهر في التبديل العشوائي. لاحظ أنّ $ j$ أصبح الآن، وسيظلّ دائمًا، على مسار البحث عن $ \mathtt{x}$ . فإن كان $ j\neq i$ فإنّ العقدة $ \ensuremath{\mathtt{u}}_j$ التي تحوي $ j$ تُنشأ قبل العقدة $ \ensuremath{\mathtt{u}}_i$ التي تحوي $ i$ . وفي وقتٍ لاحق، عند إضافة $ i$ ، ستُضاف إلى الشجرة الفرعية (subtree) التي جذورها هو $ \ensuremath{\mathtt{u}}_j\ensuremath{\mathtt{.left}}$ ، لأنّ $ i<j$ . ومن جهة أخرى، لن يزور مسار البحث عن $ \mathtt{x}$ هذه الشجرة الفرعية أبدًا، لأنّه سينتقل إلى $ \ensuremath{\mathtt{u}}_j\ensuremath{\mathtt{.right}}$ بعد زيارة $ \ensuremath{\mathtt{u}}_j$ . **الشكل 7.3:** القيمة $ i<\ensuremath{\mathtt{x}}$ تكون على مسار البحث عن $ \mathtt{x}$ إذا وفقط إذا كانت $ i$ أول عنصر ضمن $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ يُضاف إلى الشجرة. ![% latex2html id marker 54970 \includegraphics[width=\textwidth ]{figs/rbst-records}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2923.png.webp) وبالمثل، فإنّ $ i>\ensuremath{\mathtt{x}}$ تُدرَج $ i$ في مسار البحث عن $ \mathtt{x}$ إذا وفقط إذا ظهرت $ i$ قبل أيٍّ من $ \{\lceil\ensuremath{\mathtt{x}}\rceil, \lceil\ensuremath{\mathtt{x}}\rceil+1,\ldots,i-1\}$ في التبديل العشوائي المستخدَم لإنشاء $ T$ . ولاحظ أنّه إذا بدأنا بتبديل عشوائي لـ $ \{0,\ldots,\ensuremath{\mathtt{n}}\}$ ، فإنّ المتتاليات الجزئية التي لا تحتوي سوى $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ و $ \{\lceil\ensuremath{\mathtt{x}}\rceil, \lceil\ensuremath{\mathtt{x}}\rceil+1,\ldots,i-1\}$ هي أيضًا تبديلات عشوائية لعناصرها على التوالي. وعليه، فإنّ كل عنصر ضمن المجموعتين $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ و $ \{\lceil\ensuremath{\mathtt{x}}\rceil, \lceil\ensuremath{\mathtt{x}}\rceil+1,\ldots,i-1\}$ محتمَل بالقدر نفسه أن يسبق أيّ عنصر آخر في مجموعته ضمن التبديل العشوائي المستخدَم لإنشاء $ T$ . ومن ثمّ لدينا

$$
\displaystyle \Pr\{
$$

![$\displaystyle \mbox{$i$\ is on the search path for \ensuremath{\mathtt{x}}}$](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2941.png.webp)

![$\displaystyle \} = \left\{ \begin{array}{ll} 1/(\lfloor\ensuremath{\mathtt{x}... ...+1) & \mbox{if $i > \ensuremath{\mathtt{x}}$} \end{array}\right . \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2942.png.webp)

وبهذه الملاحظة، ينطوي برهان الملمة 7.1 على بعض الحسابات البسيطة بالأعداد التوافقية:

*البرهان*. [برهان الملمة 7.1] وليكن $ I_i$ متغيّرًا عشوائيًا إشاريًا (indicator random variable) يساوي واحدًا عندما يظهر $ i$ على مسار البحث عن $ \mathtt{x}$، وصفرًا في غير ذلك. وعندئذٍ يكون طول مسار البحث معطىً بـ

$$
\displaystyle \sum_{i\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}\setminus\{\ensuremath{\mathtt{x}}\}} I_i
$$

فإذا كان $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ ، كان الطول المتوقَّع لمسار البحث معطىً بـ (راجع الشكل 7.4.a)

| $\displaystyle \mathrm{E}\left[\sum_{i=0}^{\ensuremath{\mathtt{x}}-1} I_i + \sum_{i=\ensuremath{\mathtt{x}}+1}^{\ensuremath{\mathtt{n}}-1} I_i\right]$ | ![المعادلة الأصلية: حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية، الصيغة 1](/images/open-data-structures/math-70abe543986e6ce31249.webp) |  |
| --- | --- | --- |
|  | ![المعادلة الأصلية: حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية، الصيغة 2](/images/open-data-structures/math-662da9b9197de555bcb9.webp) |  |
|  | ![المعادلة الأصلية: حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية، الصيغة 3](/images/open-data-structures/math-42e67a5963e6f0fe7601.webp) |  |
|  | $\displaystyle = \frac{1}{2}+\frac{1}{3}+\cdots+\frac{1}{\ensuremath{\mathtt{x}}+1}$ |  |
|  | $\displaystyle \quad {} + \frac{1}{2}+\frac{1}{3}+\cdots+\frac{1}{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}}$ |  |
|  | $\displaystyle = H_{\ensuremath{\mathtt{x}}+1} + H_{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}} - 2 \enspace .$ |  |

والحسابات المقابلة لقيمة بحث $ \ensuremath{\mathtt{x}}\in(-1,n)\setminus\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ تكاد تكون مطابقة (راجع الشكل 7.4.b). $\qedsymbol$

**الشكل 7.4:** احتمالات وجود عنصر على مسار البحث عن $ \mathtt{x}$ عندما (a) يكون $ \mathtt{x}$ عددًا صحيحًا، و(b) عندما لا يكون $ \mathtt{x}$ عددًا صحيحًا. ![\includegraphics[width=\textwidth ]{figs/rbst-probs-a}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2957.png.webp) (a) ![\includegraphics[width=\textwidth ]{figs/rbst-probs-b}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2958.png.webp) (b) 7.1.2 الخلاصة تلخّص المبرهنة التالية أداء شجرة البحث الثنائية العشوائية: **المبرهنة 7.1** *يمكن إنشاء شجرة بحث ثنائية عشوائية في زمن $ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$ . وفي شجرة البحث الثنائية العشوائية، تستغرق العملية $ \mathtt{find(x)}$ زمنًا متوقَّعًا قدره $ O(\log \ensuremath{\mathtt{n}})$ .*

وينبغي أن نؤكّد مجدّدًا أنّ التوقّع في المبرهنة 7.1 محسوب بالنسبة إلى التبديل العشوائي المستخدَم لإنشاء شجرة البحث الثنائية العشوائية. وبخاصة، فهو لا يعتمد على اختيار عشوائي لـ $ \mathtt{x}$ ؛ بل هو صحيح لكل قيمة من قيم $ \mathtt{x}$ .

#### الحواشي

....7.1 يمكن تفسير التعبيرَين $ \ensuremath{\mathtt{x}}+1$ و $ \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}$ على التوالي بأنهما عدد العناصر في الشجرة الأصغر من $ \mathtt{x}$ أو المساوية له، وعدد العناصر في الشجرة الأكبر من $ \mathtt{x}$ أو المساوية له. [opendatastructures.org](http://opendatastructures.org/)

## 7.2 Treap: شجرة بحث ثنائية عشوائية

**الأقسام الفرعية**

# 7.2 Treap: شجرة بحث ثنائية عشوائية

المشكلة في الأشجار الثنائية للبحث العشوائية أنّها بطبيعتها غير ديناميكية (dynamic). فهي لا تدعم العمليتَين $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ اللتين تلزمان لتنفيذ واجهة SSet. وفي هذا القسم نشرح بنية بيانات تُدعى Treap تستخدم الملمة 7.1 لتنفيذ واجهة SSet.7.2 إنّ عقدة في Treap تشبه عقدة في BinarySearchTree من حيث أنّها تحمل قيمة بيانات، $ \mathtt{x}$ ، كما أنّها تحتوي أيضًا على أولوية (priority) عددية فريدة، $ \mathtt{p}$ ، تُسنَد عشوائيًا:

```
    class Node<T> extends BinarySearchTree.BSTNode<Node<T>,T> {
        int p;
    }
```

إلى جانب كونه شجرة بحث ثنائية، تلتزم عقد الـTreap أيضًا بخاصية الكومة (heap property):

- (خاصية الكومة) عند كل عقدة $ \mathtt{u}$ ، باستثناء الجذر، $ \ensuremath{\mathtt{u.parent.p}} < \ensuremath{\mathtt{u.p}}$ .

بعبارة أخرى، لكل عقدة أولوية أصغر من أولوية طفليها. ويبيّن الشكل 7.5 مثالًا على ذلك.

**الشكل 7.5:** مثال على Treap يحوي الأعداد الصحيحة $ 0,\ldots,9$ . كل عقدة، $ \mathtt{u}$ ، موصوفة بصندوق يحتوي $ \ensuremath{\mathtt{u.x}},\ensuremath{\mathtt{u.p}}$ . ![\includegraphics[width=\textwidth ]{figs/treap}](/images/open-data-structures/7_2_Treap_Randomized_Binary-img2973.png.webp) ويضمن شرطا الكومة وشجرة البحث الثنائية معًا أنّه، بمجرّد تعريف المفتاح ( $ \mathtt{x}$ ) والأولوية ( $ \mathtt{p}$ ) لكل عقدة، يتحدّد شكل الـTreap تمامًا. فخاصية الكومة تخبرنا بأنّ العقدة ذات الأولوية الدنيا لا بدّ أن تكون الجذر، $ \mathtt{r}$ ، للـTreap. أمّا خاصية شجرة البحث الثنائية فتخبرنا بأنّ جميع العقد ذات المفاتيح الأصغر من $ \mathtt{r.x}$ تُخزَّن في الشجرة الفرعية التي جذورها $ \mathtt{r.left}$ ، وأنّ جميع العقد ذات المفاتيح الأكبر من $ \mathtt{r.x}$ تُخزَّن في الشجرة الفرعية التي جذورها $ \mathtt{r.right}$ . والنقطة المهمّة في قيم الأولوية داخل الـTreap هي أنّها فريدة وتُسنَد عشوائيًا. ولهذا فإنّ هناك طريقتين متكافئتين يمكننا التفكير في الـTreap بهما. فكما هو معرَّف أعلاه، يلتزم الـTreap بخاصيتي الكومة وشجرة البحث الثنائية. وعلى نحو بديل، يمكننا النظر إلى الـTreap على أنّه BinarySearchTree أُضيفت عقدُه بترتيب أولويّاتها المتزايد. فمثلًا، يمكن الحصول على الـTreap في الشكل 7.5 بإضافة تسلسل قيم $ (\ensuremath{\mathtt{x}},\ensuremath{\mathtt{p}})$ 

$$
\displaystyle \langle (3,1), (1,6), (0,9), (5,11), (4,14), (9,17), (7,22), (6,42), (8,49), (2,99) \rangle
$$

إلى BinarySearchTree.

ولأنّ الأولويات تُختار عشوائيًا، فإنّ هذا يعادل أخذ تبديل عشوائي للمفاتيح--وفي حالتنا هذه يكون التبديل هو

$$
\displaystyle \langle 3, 1, 0, 5, 9, 4, 7, 6, 8, 2 \rangle
$$

--وإضافة هذه المفاتيح إلى BinarySearchTree. لكنّ هذا يعني أنّ شكل الـtreap مطابق لشكل شجرة البحث الثنائية العشوائية. وبخاصة، إذا استبدلنا كل مفتاح $ \mathtt{x}$ برتبته،7.3 فتنطبق الملمة 7.1. ولإعادة صياغة الملمة 7.1 بعبارات Treap، نقول:

**الملمّة 7.2** *في Treap يخزّن مجموعة $ S$ من $ \mathtt{n}$ مفتاحًا، تنطبق العبارتان التاليتان: * لأي $ \ensuremath{\mathtt{x}}\in S$ ، يكون الطول المتوقَّع لمسار البحث عن $ \mathtt{x}$ هو $ H_{r(\ensuremath{\mathtt{x}})+1} + H_{\ensuremath{\mathtt{n}}-r(\ensuremath{\mathtt{x}})} - O(1)$ . لأي $ \ensuremath{\mathtt{x}}\not\in S$ ، يكون الطول المتوقَّع لمسار البحث عن $ \mathtt{x}$ هو $ H_{r(\ensuremath{\mathtt{x}})} + H_{\ensuremath{\mathtt{n}}-r(\ensuremath{\mathtt{x}})}$ . * هنا، $ r(\ensuremath{\mathtt{x}})$ تدلّ على رتبة $ \mathtt{x}$ في المجموعة $ S\cup\{\ensuremath{\mathtt{x}}\}$ .*

ونؤكّد مجدّدًا أنّ التوقّع في الملمة 7.2 محسوب على الاختيارات العشوائية لأولويات كل عقدة. وهو لا يتطلّب أيّ افتراضات بشأن العشوائية في المفاتيح. وتخبرنا الملمة 7.2 بأنّ هياكل Treap تستطيع تنفيذ العملية $ \mathtt{find(x)}$ بكفاءة. غير أنّ الفائدة الحقيقية للـTreap تكمن في قدرته على دعم العمليتَين $ \mathtt{add(x)}$ و $ \mathtt{delete(x)}$ . ولتحقيق ذلك، عليه إجراء دورانات (rotations) للحفاظ على خاصية الكومة. راجع الشكل 7.6. الدوران في شجرة بحث ثنائية هو تعديلٌ محلّي يأخذ أبًا $ \mathtt{u}$ لعقدة $ \mathtt{w}$ ويجعل $ \mathtt{w}$ أبًا لـ $ \mathtt{u}$، مع الحفاظ على خاصية شجرة البحث الثنائية. ويأتي الدوران بنوعَين: دوران أيسر أو أيمن، بحسب ما إذا كان $ \mathtt{w}$ طفلًا أيمنًا أو أيسرًا لـ $ \mathtt{u}$ على التوالي.

والشيفرة التي تطبّق ذلك عليها معالجة الحالتَين أعلاه، فضلًا عن حالةٍ حدّية (boundary case) ينبغي الانتباه لها (عندما يكون $ \mathtt{u}$ هو الجذر)، ولذلك فإنّ الشيفرة الفعلية أطول قليلًا ممّا يوحي به الشكل 7.6 للقارئ:

```
    void rotateLeft(Node u) {
        Node w = u.right;
        w.parent = u.parent;
        if (w.parent != nil) {
            if (w.parent.left == u) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        u.right = w.left;
        if (u.right != nil) {
            u.right.parent = u;
        }
        u.parent = w;
        w.left = u;
        if (u == r) { r = w; r.parent = nil; }
    }    
    void rotateRight(Node u) {
        Node w = u.left;
        w.parent = u.parent;
        if (w.parent != nil) {
            if (w.parent.left == u) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        u.left = w.right;
        if (u.left != nil) {
            u.left.parent = u;
        }
        u.parent = w;
        w.right = u;
        if (u == r) { r = w; r.parent = nil; }
    }
```

بالنسبة إلى بنية بيانات الـTreap، أهمّ خاصية للدوران هي أنّ عمق $ \mathtt{w}$ ينقص بمقدار واحد فيما يزيد عمق $ \mathtt{u}$ بمقدار واحد. وباستخدام الدورانات يمكننا تنفيذ العملية $ \mathtt{add(x)}$ على النحو التالي: ننشئ عقدة جديدة، $ \mathtt{u}$ ، ونُسند $ \mathtt{u.x=x}$ ، ونختار قيمةً عشوائية لـ $ \mathtt{u.p}$ . ثم نضيف $ \mathtt{u}$ باستخدام خوارزمية $ \mathtt{add(x)}$ المعتادة الخاصة بـ BinarySearchTree، بحيث تصير $ \mathtt{u}$ الآن ورقةً (leaf) في الـTreap. وعند هذه النقطة يكون الـTreap لدينا ملتزمًا بخاصية شجرة البحث الثنائية، ولكن ليس بالضرورة بخاصية الكومة. وبخاصة، قد يكون $ \mathtt{u.parent.p > u.p}$ . وإن كان الأمر كذلك، فإنّنا نجري دورانًا عند العقدة $ \mathtt{w}$ = $ \mathtt{u.parent}$ حتّى تصبح $ \mathtt{u}$ أبًا للعقدة $ \mathtt{w}$ . وإذا ظلّ $ \mathtt{u}$ يخالف خاصية الكومة، فلا بدّ لنا من تكرار ذلك، مع إنقاص عمق $ \mathtt{u}$ بمقدار واحد في كل مرة، إلى أن يصير $ \mathtt{u}$ إمّا الجذر وإمّا بحيث $ \ensuremath{\mathtt{u.parent.p}} < \ensuremath{\mathtt{u.p}}$ .

```
    boolean add(T x) {
        Node<T> u = newNode();
        u.x = x;
        u.p = rand.nextInt();
        if (super.add(u)) {
            bubbleUp(u);
            return true;
        }
        return false;
    }
    void bubbleUp(Node<T> u) {
        while (u.parent != nil && u.parent.p > u.p) {
            if (u.parent.right == u) {
                rotateLeft(u.parent);
            } else {
                rotateRight(u.parent);
            }
        }
        if (u.parent == nil) {
            r = u;
        }
    }
```

ويبيّن الشكل 7.7 مثالًا على عملية $ \mathtt{add(x)}$ .

زمن تشغيل العملية $ \mathtt{add(x)}$ محدَّدٌ بزمن اتباع مسار البحث عن $ \mathtt{x}$ مضافًا إليه عدد الدورانات التي أُجريت لنقل العقدة المضافة حديثًا، $ \mathtt{u}$ ، إلى موضعها الصحيح في الـTreap. وبموجب الملمة 7.2، فإنّ الطول المتوقَّع لمسار البحث يساوي على الأكثر $ 2\ln \ensuremath{\mathtt{n}}+O(1)$ . وإضافةً إلى ذلك، فإنّ كل دوران يُنقِص عمق $ \mathtt{u}$ . وهذا يتوقّف إذا صار $ \mathtt{u}$ هو الجذر، ومن ثمّ لا يمكن أن يتجاوز عدد الدورانات المتوقَّع الطول المتوقَّع لمسار البحث. وبالتالي فإنّ زمن التشغيل المتوقَّع للعملية $ \mathtt{add(x)}$ في الـTreap هو $ O(\log \ensuremath{\mathtt{n}})$ . (يطلب التمرين 7.5 أن تُثبت أنّ عدد الدورانات المتوقَّع أثناء الإضافة ليس في الحقيقة إلا $ O(1)$ .) أمّا العملية $ \mathtt{remove(x)}$ في الـTreap فهي عكس العملية $ \mathtt{add(x)}$ . فنبحث عن العقدة، $ \mathtt{u}$ ، التي تحوي $ \mathtt{x}$ ، ثمّ نجري دورانات لنقل $ \mathtt{u}$ إلى الأسفل حتى يصير ورقة، ثمّ نفصل $ \mathtt{u}$ عن الـTreap. ولاحظ أنّه لنقل $ \mathtt{u}$ إلى الأسفل، يمكننا إجراء دوران أيسر أو أيمن عند $ \mathtt{u}$، وهو ما سيستبدل $ \mathtt{u}$ بـ $ \mathtt{u.right}$ أو $ \mathtt{u.left}$ على التوالي. ويُتَّخذ الاختيار وفق أول الشروط التالية المنطبقة:

1. إذا كان $ \mathtt{u.left}$ و $ \mathtt{u.right}$ كلاهما $ \mathtt{null}$ ، فإنّ $ \mathtt{u}$ ورقة ولا يُجرى أيّ دوران.
2. إذا كان $ \mathtt{u.left}$ (أو $ \mathtt{u.right}$ ) هو $ \mathtt{null}$ ، ف أجرِ دورانًا أيمنًا (أو أيسرًا، على التوالي) عند $ \mathtt{u}$ .
3. إذا كان $ \ensuremath{\mathtt{u.left.p}} < \ensuremath{\mathtt{u.right.p}}$ (أو $ \ensuremath{\mathtt{u.left.p}} > \ensuremath{\mathtt{u.right.p}})$ ، ف أجرِ دورانًا أيمنًا (أو أيسرًا، على التوالي) عند $ \mathtt{u}$ .

تضمن هذه القواعد الثلاث ألّا ينقطع الـTreap عن بعضه، وأن تُستعاد خاصية الكومة بعد إزالة $ \mathtt{u}$ .

```
    boolean remove(T x) {
        Node<T> u = findLast(x);
        if (u != nil && compare(u.x, x) == 0) {
            trickleDown(u);
            splice(u);
            return true;
        }
        return false;
    }
    void trickleDown(Node<T> u) {
        while (u.left != nil || u.right != nil) {
            if (u.left == nil) {
                rotateLeft(u);
            } else if (u.right == nil) {
                rotateRight(u);
            } else if (u.left.p < u.right.p) {
                rotateRight(u);
            } else {
                rotateLeft(u);
            }
            if (r == u) {
                r = u.parent;
            }
        }
    }
```

ويبيّن الشكل 7.8 مثالًا على عملية $ \mathtt{remove(x)}$ .

والحيلة في تحليل زمن تشغيل العملية $ \mathtt{remove(x)}$ هي ملاحظة أنّ هذه العملية تعكس العملية $ \mathtt{add(x)}$ . وبخاصة، إذا أعدنا إدراج $ \mathtt{x}$ باستخدام الأولوية نفسها $ \mathtt{u.p}$ ، فإنّ العملية $ \mathtt{add(x)}$ ستجري عدد الدورانات نفسه بالضبط، وتعيد الـTreap إلى الحالة عينها التي كان عليها قبل وقوع عملية $ \mathtt{remove(x)}$ . (وإذا قُرئ الشكل 7.8 من الأسفل إلى الأعلى، فإنه يوضّح إضافة القيمة 9 إلى Treap.) وهذا يعني أنّ زمن التشغيل المتوقَّع للعملية $ \mathtt{remove(x)}$ على Treap ذات حجم $ \mathtt{n}$ متناسب مع زمن التشغيل المتوقَّع للعملية $ \mathtt{add(x)}$ على Treap ذات حجم $ \ensuremath{\mathtt{n}}-1$ . ومن ثمّ نستنتج أنّ زمن التشغيل المتوقَّع لـ $ \mathtt{remove(x)}$ هو $ O(\log \ensuremath{\mathtt{n}})$ . 7.2.1 الخلاصة تلخّص المبرهنة التالية أداء بنية بيانات Treap: **المبرهنة 7.2** *يطبّق Treap واجهة SSet. يدعم Treap العمليات $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ و $ \mathtt{find(x)}$ في زمن متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية.*

من المفيد مقارنة بنية بيانات Treap ببنية بيانات SkiplistSSet. فالاثنتان تطبّقان عمليات SSet في زمن متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ لكل عملية. وفي كلتا البنيتين، تتضمّن $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ عملية بحث ثمّ عددًا ثابتًا من تغييرات المؤشّرات (راجع التمرين 7.5 أدناه). ومن ثمّ فإنّ الطول المتوقَّع لمسار البحث هو القيمة الحاسمة في تقييم أداء هاتين البنيتين. وفي SkiplistSSet، يكون الطول المتوقَّع لمسار البحث هو

$$
\displaystyle 2\log \ensuremath{\mathtt{n}} + O(1) \enspace ,
$$

وفي Treap، يكون الطول المتوقَّع لمسار البحث هو

$$
\displaystyle 2\ln \ensuremath{\mathtt{n}} +O(1) \approx 1.386\log \ensuremath{\mathtt{n}} + O(1) \enspace .
$$

وعليه، فإنّ مسارات البحث في الـTreap أقصر بدرجة كبيرة، وهذا ينعكس عمليًا على عمليات أسرع في Treap مقارنةً بقوائم التخطّي (skiplists). ويُبيّن التمرين 4.7 في الفصل 4 كيف يمكن تقصير الطول المتوقَّع لمسار البحث في قائمة التخطّي ليصبح

$$
\displaystyle e\ln \ensuremath{\mathtt{n}} + O(1) \approx 1.884\log \ensuremath{\mathtt{n}} + O(1)
$$

باستخدام قذفات عملة مُتحيّزة (biased coin tosses). وحتى مع هذا التحسين، يبقى الطول المتوقَّع لمسارات البحث في SkiplistSSet أطول بوضوح ممّا هو عليه في Treap.

#### الحواشي

... interface.7.2 جاء اسم Treap من أنّ بنية البيانات هذه شجرة بحث ثنائية (القسم 6.2) وكومة (الفصل 10) في آنٍ واحد. ... rank,7.3 رتبة (rank) عنصر $ \mathtt{x}$ في مجموعة عناصر $ S$ هي عدد العناصر في $ S$ الأصغر من $ \mathtt{x}$ . [opendatastructures.org](http://opendatastructures.org/)

## 7.3 النقاش والتمارين

جرت دراسة الأشجار الثنائية للبحث العشوائية على نطاق واسع. ويقدّم Devroye [19] برهانًا للملمة 7.1 ولنتائج ذات صلة. وهناك في الأدبيات نتائج أقوى بكثير، وأبرزها ما يعود إلى Reed [64]، الذي يُظهر أنّ الارتفاع المتوقَّع لشجرة بحث ثنائية عشوائية هو

$$
\displaystyle \alpha\ln n - \beta\ln\ln n + O(1)
$$

حيث $ \alpha\approx4.31107$ هو الحلّ الوحيد على الفترة $ [2,\infty)$ للمعادلة $ \alpha\ln((2e/\alpha))=1$ ، و $ \beta=\frac{3}{2\ln(\alpha/2)}$ . وإضافةً إلى ذلك، فإنّ تباين الارتفاع ثابت.

ابتكر Seidel و Aragon [67] اسم Treap، وقد ناقشا هياكل Treap وبعض تنويعاتها. غير أنّ بنيتها الأساسية دُرست قبل ذلك بوقتٍ طويل من قِبل Vuillemin [76] الذي أسماها أشجارًا كرتيسية (Cartesian trees). ومن تحسينات المساحة الممكنة لبنية بيانات Treap أن نُغني عن التخزين الصريح للأولوية $ \mathtt{p}$ في كل عقدة. وبدلًا من ذلك، تُحسب أولوية العقدة، $ \mathtt{u}$ ، عبر تجزئة (hashing) عنوان $ \mathtt{u}$ في الذاكرة (وفي Java ذات 32 بت، فإنّ ذلك يعادل تجزئة $ \mathtt{u.hashCode()}$ ). ورغم أنّ عددًا من دوال التجزئة (hash functions) قد تعمل جيدًا لهذا الغرض في الممارسة العملية، إلا أنّه كي تظلّ الأجزاء المهمّة من برهان الملمة 7.1 صحيحة، ينبغي أن تكون دالة التجزئة عشوائية وأن توفّر خاصية الاستقلال التصغيريّ (min-wise independent): فبالنسبة إلى أي قيم متمايزة $ x_1,\ldots,x_k$ ، ينبغي أن تكون قيم التجزئة $ h(x_1),\ldots,h(x_k)$ كلها متمايزة باحتمالٍ عالٍ، وأن من أجل كل $ i\in\{1,\ldots,k\}$ ،

$$
\displaystyle \Pr\{h(x_i) = \min\{h(x_1),\ldots,h(x_k)\}\} \le c/k
$$

حيث $ c$ ثابت ما. ومن أصناف دوال التجزئة التي يسهل تنفيذها وسريعة نسبيًا: تجزئة الجدولة (tabulation hashing) (القسم 5.2.3).

ومن تنويعات Treap الأخرى التي لا تخزّن أولويات عند كل عقدة: شجرة البحث الثنائية العشوائية لـ Mart&#237;nez و Roura [51]. ففي هذا التنويع، تخزّن كل عقدة، $ \mathtt{u}$ ، الحجم $ \mathtt{u.size}$ للشجرة الفرعية التي جذورها $ \mathtt{u}$ . وكلتا خوارزمتَي $ \mathtt{add(x)}$ و $ \mathtt{remove(x)}$ عشوائيتان. وتقوم خوارزمية إضافة $ \mathtt{x}$ إلى الشجرة الفرعية التي جذورها هو $ \mathtt{u}$ بما يلي: باحتمال $ 1/(\ensuremath{\mathtt{size(u)}}+1)$ ، تُضاف القيمة $ \mathtt{x}$ بالطريقة المعتادة كورقة، ثمّ تُجرى دورانات لرفع $ \mathtt{x}$ حتى جذر هذه الشجرة الفرعية. وفي غير ذلك (باحتمال $ 1-1/(\ensuremath{\mathtt{size(u)}}+1)$ )، تُضاف القيمة $ \mathtt{x}$ secara تكرارية إلى إحدى الشجرتين الفرعيتين الجذور لهما $ \mathtt{u.left}$ أو $ \mathtt{u.right}$، بحسب ما يقتضيه الحال. وتُقابل الحالة الأولى عملية $ \mathtt{add(x)}$ في Treap تحصل فيها عقدة $ \mathtt{x}$ على أولوية عشوائية أصغر من أيٍّ من الأولويات $ \mathtt{size(u)}$ الموجودة في الشجرة الفرعية التي جذورها $ \mathtt{u}$ . وتحدث هذه الحالة بالاحتمال نفسه بالضبط. وإزالة قيمة $ \mathtt{x}$ من شجرة بحث ثنائية عشوائية تشبه عملية الإزالة من Treap. فنجد العقدة، $ \mathtt{u}$ ، التي تحوي $ \mathtt{x}$ ، ثمّ نجري دورانات ترفع عمق $ \mathtt{u}$ تكرارًا حتى يصير ورقة، وعندئذٍ يمكننا فصله عن الشجرة. والاختيار بين إجراء دوران أيسر أو أيمن في كل خطوة عشوائي. فباحتمال $ \mathtt{u.left.size/(u.size-1)}$ ، نجري دورانًا أيمنًا عند $ \mathtt{u}$، فتصير $ \mathtt{u.left}$ جذرًا للشجرة الفرعية التي كان جذورها هو $ \mathtt{u}$ . وباحتمال $ \mathtt{u.right.size/(u.size-1)}$ ، نجري دورانًا أيسرًا عند $ \mathtt{u}$، فتصير $ \mathtt{u.right}$ جذرًا للشجرة الفرعية التي كان جذورها هو $ \mathtt{u}$ . ومرةً أخرى، يسهل التحقّق من أنّ هذه هي بالضبط الاحتمالات عينها التي تجري فيها خوارزمية الإزالة في Treap دورانًا أيسرًا أو أيمنًا للعقدة $ \mathtt{u}$ . وللأشجار الثنائية للبحث العشوائية عيبٌ مقارنةً بـTreap، إذ إنّها عند إضافة العناصر وإزالتها تجري اختياراتٍ عشوائية كثيرة، وعليها أن تحافظ على أحجام الشجرات الفرعية. وفي المقابل، فإنّ لأشجار البحث الثنائية العشوائية ميزةٌ على Treap، إذ إنّ أحجام الشجرات الفرعية يمكن أن تخدم غرضًا نافعًا آخر، وتحديدًا توفير الوصول حسب الرتبة في زمن متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ (راجع التمرين 7.10). وبالمقارنة مع ذلك، فإنّ الأولويات العشوائية المخزَّنة في عقد الـtreap لا فائدة فيها سوى إبقاء الـtreap متوازنًا. **التمرين 7.1** بيّن إضافة 4.5 (بأولوية 7) ثمّ 7.5 (بأولوية 20) إلى الـTreap في الشكل 7.5.

**التمرين 7.2** بيّن إزالة 5 ثمّ 7 من الـTreap في الشكل 7.5.

**التمرين 7.3** اثبت أنّ المُدّعى هو أنّ هناك $ 21,964,800$ تسلسلًا يولّد الشجرة في الجانب الأيمن من الشكل 7.1. (تلميح: أعطِ صيغةً تكرارية لعدد التسلسلات التي تولّد شجرة بحث ثنائية كاملة ارتفاعها $ h$ ، ثمّ قيّم هذه الصيغة عند $ h=3$ .)

**التمرين 7.4** صمّم ونفّذ طريقة $ \mathtt{permute(a)}$ التي تأخذ كمُدخَل مصفوفة، $ \mathtt{a}$ ، تحتوي $ \mathtt{n}$ قيمةً متمايزة وتبدّل ترتيب عناصر $ \mathtt{a}$ عشوائيًا. وينبغي أن تعمل هذه الطريقة في زمن $ O(\ensuremath{\mathtt{n}})$ ، وأن تُثبت أنّ احتمال كل تبديلٍ من التبديلات الـ $ \ensuremath{\mathtt{n}}!$ الممكنة لـ $ \mathtt{a}$ متساوٍ.

**التمرين 7.5** استخدم جزأَي الملمة 7.2 لإثبات أنّ عدد الدورانات المتوقَّع الذي تجريه عملية $ \mathtt{add(x)}$ (وعليه أيضًا عملية $ \mathtt{remove(x)}$) هو $ O(1)$ .

**التمرين 7.6** عدّل تنفيذ الـTreap المعطى هنا بحيث لا يخزّن الأولويات صراحةً. وبدلًا من ذلك، ينبغي أن يحاكيها عبر تجزئة قيمة $ \mathtt{hashCode()}$ لكل عقدة.

**التمرين 7.7** افترض أنّ شجرة بحث ثنائية تخزّن عند كل عقدة، $ \mathtt{u}$ ، الارتفاع $ \mathtt{u.height}$ للشجرة الفرعية التي جذورها $ \mathtt{u}$، والحجم $ \mathtt{u.size}$ لتلك الشجرة الفرعية التي جذورها $ \mathtt{u}$ . بيّن كيف يمكن تحديث هذين المقدارين، في زمن ثابت، لجميع العقد المتأثّرة بالدوران إذا أجرينا دورانًا أيسرًا أو أيمنًا عند $ \mathtt{u}$ . واشرح لماذا لا يمكن بلوغ النتيجة نفسها إذا حاولنا أيضًا تخزين العمق، $ \mathtt{u.depth}$ ، لكل عقدة $ \mathtt{u}$ .

**التمرين 7.8** صمّم ونفّذ خوارزمية تبني Treap من مصفوفةٍ مرتَّبة، $ \mathtt{a}$ ، من $ \mathtt{n}$ عنصرًا. وينبغي أن تعمل هذه الطريقة في أسوأ الحالات في زمن $ O(\ensuremath{\mathtt{n}})$، وأن تبني Treap لا يمكن تمييزه عن Treap أُضيفت عناصر $ \mathtt{a}$ إليه واحدًا تلو الآخر باستخدام طريقة $ \mathtt{add(x)}$ .

**التمرين 7.9** يتناول هذا التمرين تفاصيل كيفية البحث بكفاءة في Treap معطىً مؤشّرًا قريبًا من العقدة التي نبحث عنها. صمّم ونفّذ تنفيذًا لـTreap يحتفظ فيه كل عقدة بأصغر قيمة وأكبر قيمة في شجرتها الفرعية. وباستخدام هذه المعلومات الإضافية، أضف طريقة $ \mathtt{fingerFind(x,u)}$ تنفّذ العملية $ \mathtt{find(x)}$ بمساعدة مؤشّر إلى العقدة $ \mathtt{u}$ (ويُرجَّح ألّا تكون بعيدة عن العقدة التي تحوي $ \mathtt{x}$ ). وينبغي أن تبدأ هذه العملية من $ \mathtt{u}$ وتصعد حتى تبلغ عقدة $ \mathtt{w}$ بحيث $ \ensuremath{\mathtt{w.min}}\le \ensuremath{\mathtt{x}}\le \ensuremath{\mathtt{w.max}}$ . ومن تلك النقطة فصاعدًا، ينبغي أن يُجري بحثًا معتادًا عن $ \mathtt{x}$ بدءًا من $ \mathtt{w}$ . (يمكن إظهار أنّ $ \mathtt{fingerFind(x,u)}$ يستغرق زمنًا قدره $ O(1+\log r)$ ، حيث $ r$ هو عدد العناصر في الـtreap التي تقع قيمتها بين $ \mathtt{x}$ و $ \mathtt{u.x}$ .) ووسِّع تنفيذك ليصير نسخةً من الـtreap تبدأ كل عمليات $ \mathtt{find(x)}$ فيها من آخر عقدة عثر عليها $ \mathtt{find(x)}$ .

**التمرين 7.10** صمّم ونفّذ نسخةً من Treap تتضمّن عملية $ \mathtt{get(i)}$ تُعيد المفتاح ذي الرتبة (rank) $ \mathtt{i}$ في الـTreap. (تلميح: اجعل كل عقدة، $ \mathtt{u}$ ، تحتفظ بحجم الشجرة الفرعية التي جذورها هي $ \mathtt{u}$ .)

**التمرين 7.11** نفّذ TreapList، وهو تنفيذٌ لواجهة List بوصفه treap. وينبغي أن تخزّن كل عقدة في الـtreap عنصرَ قائمة، وأن يعثر اجتياز الـtreap بترتيب الوسط (in-order) على العناصر بالترتيب نفسه الذي ترد به في القائمة. وينبغي أن تعمل جميع عمليات List، وهي $ \mathtt{get(i)}$ و $ \mathtt{set(i,x)}$ و $ \mathtt{add(i,x)}$ و $ \mathtt{remove(i)}$، في زمن متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ .

**التمرين 7.12** صمّم ونفّذ نسخةً من Treap تدعم عملية $ \mathtt{split(x)}$ . وهذه العملية تزيل من الـTreap كلَّ القيم الأكبر من $ \mathtt{x}$ وتُعيد Treap ثانيةً يحتوي على كل القيم المُزالة. مثال: الشيفرة $ \mathtt{t2 = t.split(x)}$ تزيل من $ \mathtt{t}$ كل القيم الأكبر من $ \mathtt{x}$ وتُعيد Treap جديدًا $ \mathtt{t2}$ يحتوي على هذه القيم جميعًا. وينبغي أن تعمل عملية $ \mathtt{split(x)}$ في زمن متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ . تحذير: لكي يعمل هذا التعديل على الوجه الصحيح ولا تزال طريقة $ \mathtt{size()}$ تعمل في زمن ثابت، من الضروري تنفيذ التعديلات الواردة في التمرين 7.10.

**التمرين 7.13** صمّم ونفّذ نسخةً من Treap تدعم عملية $ \mathtt{absorb(t2)}$ ، ويمكن التفكير فيها على أنّها العملية العاكسة لـ $ \mathtt{split(x)}$ . وهذه العملية تزيل من الـTreap $ \mathtt{t2}$ كلَّ القيم وتضيفها إلى الكائن المستقبِل. وتفترض هذه العملية أنّ أصغر قيمة في $ \mathtt{t2}$ أكبر من أكبر قيمة في الكائن المستقبِل. وينبغي أن تعمل عملية $ \mathtt{absorb(t2)}$ في زمن متوقَّع قدره $ O(\log \ensuremath{\mathtt{n}})$ .

**التمرين 7.14** نفّذ أشجار البحث الثنائية العشوائية لـ Martinez كما نُوقشت في هذا القسم. وقارن بين أداء تنفيذك وأداء تنفيذ الـTreap.

[opendatastructures.org](http://opendatastructures.org/)
