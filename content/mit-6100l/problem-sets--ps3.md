---
title: "مجموعة المسائل 3 — المسافة بين المستندات"
lang: ar
---

# مجموعة المسائل 3: المسافة بين المستندات (Document Distance)

**زميل مجموعة المسائل (Pset Buddy):** لم يُعيَّن لك زميل لهذه المجموعة في النسخة المنشورة.

## المقدمة

### الأهداف

- تقديم فكرة القواميس (Dictionaries) في بايثون.
- كتابة الدوال المساعدة (Helper Functions) واستدعاؤها في بايثون.

### التعاون

- يمكن للطلاب العمل معًا، لكن يكتب كل طالب تكليفه ويسلّمه منفصلًا. لا يجوز تسليم الكود نفسه تمامًا.
- لا يُسمح بالنظر إلى كود الآخرين أو بنيته أو نسخهما.
- اذكر أسماء المتعاونين في تعليق في بداية كل ملف.
- راجع سياسة التعاون في معلومات المقرر للتفاصيل.
- رغم طول النشرة، فالمعلومات فيها توفر السياق والأمثلة المفيدة والتلميحات؛ اقرأها بعناية.

## البدء (Getting Started)

### A) إعداد الملفات (File Setup)

حمّل ملف `1_ps3.zip` وفكّ ضغط كل ملفاته في المجلد نفسه. الملفات المُضمَّنة هي: `document_distance.py`، و`test_ps3_student.py`، ومجموعة متنوّعة من مستندات النصوص وكلمات الأغاني داخل المجلد `tests/student_tests`. وعندما تنتهي، تأكّد من تشغيل ملف الاختبار `test_ps3_student.py` للتحقق من كودك مقابل بعض حالات الاختبار لدينا.

**ستحرّر الملف `document_distance.py` وحده.**

> **ملاحظة المترجم — مادة محجوزة:** ملف الاختبار `test_ps3_student.py` غير منشور هنا. يتضمن مساعدات مأخوذة من Stack Overflow تحتاج تحققًا مستقلًا من الترخيص والنَّسب. احصل على الحزمة الأصلية من [صفحة الشيفرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps3_code_zip/). جميع الإرشادات وأسماء الملفات والمخرجات النموذجية أدناه من نشرة MIT نفسها، وليست إعادة نشر لتلك المساعدة.

### B) نظرة عامة على المسافة بين المستندات (Document Distance Overview)

بالنظر إلى كل كلمتين أو مستندين، ستحسب درجة (Score) بين 0 و1 تخبرك بمدى تشابههما. إذا كانت الكلمات أو المستندات متطابقة فستحصل على درجة 1. وإذا كانت مختلفة تمامًا فستحصل على درجة 0. ستحسب الدرجة بطريقتين مختلفتين وتلاحظ أيّهما تعمل بشكل أفضل. الطريقة الأولى تستخدم تكرار الكلمات المفردة (Single Word Frequencies) في النصين. والثانية تستخدم تردد المصطلح–تردد المستند العكسي (TF-IDF: Term Frequency-Inverse Document Frequency) للكلمات في الملف.

> **ملاحظة المترجم:** لا تحتاج في هذه المجموعة إلى القلق بشأن حساسية حالة الأحرف (Case Sensitivity). كل المدخلات بأحرف صغيرة.

## 1) من النص إلى قائمة (Text to List)

الخطوة الأولى في أي مسألة تحليل بيانات (Data Analysis) هي تجهيز بياناتك. قدّمنا لك دالة اسمها `load_file` تقرأ ملفًا نصيًا وتخرج كل النص الموجود في الملف على هيئة سلسلة نصية (String). تأخذ هذه الدالة متغيّرًا اسمه `filename`، وهو سلسلة نصية لاسم الملف الذي تريد تحميله، بما في ذلك الامتداد. وهي تزيل كل علامات الترقيم وتحفظ النص كسلسلة نصية. لا تُعدّل هذه الدالة.

إليك مثالًا على استخدامها:

```python
# ملف hello_world.txt يبدو هكذا: 'hello world, hello'

>>> text = load_file("tests/student_tests/hello_world.txt")
>>> text
'hello world hello'
```

ستقوم بتجهيز النص أكثر من ذلك بأخذ السلسلة النصية وتحويلها إلى تمثيل على هيئة قائمة (List) للنص.بالاستناد إلى المثال أعلاه، هذا ما نتوقعه:

```python
>>> text_to_list('hello world hello')
['hello', 'world', 'hello']
```

نفّذ `text_to_list` في `document_distance.py` حسب التعليمات والسلاسل التوثيقية (Docstrings) المعطاة. وبالإضافة إلى تشغيل ملف الاختبار، يمكنك التحقق السريع من تنفيذك على الأمثلة المعطاة لكل مسألة بإلغاء تعليق الأسطر ذات الصلة في أسفل `document_distance.py`:

```python
if __name__ == "__main__":
    # Tests Problem 0: Prep Data
    test_directory = "tests/student_tests/"
    hello_world, hello_friend = load_file(test_directory + 'hello_world.txt'), load_file(test_directory + 'hello_friends.txt')
    world, friend = text_to_list(hello_world), text_to_list(hello_friend)
    print(world)
    # should print ['hello', 'world', 'hello']
    print(friend)
    # should print ['hello', 'friends']
```

> **ملاحظة المترجم:** يمكنك افتراض أن أنواع المسافات البيضاء (White Space) الوحيدة في المستندات النصية التي نقدّمها ستكون أسطرًا جديدة أو مسافة (أو مسافات) بين الكلمات (أي لا توجد علامات جدولة tabs).

## 2) احسب التكرارات (Get Frequencies)

لنبدأ بحساب تكرار كل عنصر في قائمة معطاة. الهدف هو إعادة قاموس (Dictionary) يكون فيه كل عنصر فريد هو المفتاح (Key)، وعدد مرات ورود العنصر في القائمة هو القيمة (Value).

فكّر في الأمثلة التالية:

**المثال 1:**

```python
>>> get_frequencies(['h', 'e', 'l', 'l', 'o'])
{'h': 1, 'e': 1, 'l': 2, 'o': 1}
```

**المثال 2:**

```python
>>> get_frequencies(['hello', 'world', 'hello'])
{'hello': 2, 'world': 1}
```

نفّذ `get_frequencies` في `document_distance.py` حسب التعليمات أعلاه والسلاسل التوثيقية المعطاة. وبالإضافة إلى تشغيل ملف الاختبار، يمكنك التحقق السريع من تنفيذك بإلغاء تعليق الأسطر ذات الصلة في أسفل `document_distance.py`:

```python
if __name__ == "__main__":
    # Tests Problem 1: Get Frequencies
    test_directory = "tests/student_tests/"
    hello_world, hello_friend = load_file(test_directory + 'hello_world.txt'), load_file(test_directory + 'hello_friends.txt')
    world, friend = text_to_list(hello_world), text_to_list(hello_friend)
    world_word_freq = get_frequencies(world)
    friend_word_freq = get_frequencies(friend)
    print(world_word_freq)
    # should print {'hello': 2, 'world': 1}
    print(friend_word_freq)
    # should print {'hello': 1, 'friends': 1}
```

## 3) تكرارات الحروف (Letter Frequencies)

الآن، بالنظر إلى كلمة على هيئة سلسلة نصية، لننشئ قاموسًا يكون فيه كل حرف هو المفتاح وعدد مرات ورود كل حرف في الكلمة هو القيمة. هذا يبدو مشابهًا جدًا لـ `get_frequencies` …

**يجب أن تستدعي `get_frequencies` داخل `get_letter_frequencies` للحصول على الدرجة كاملة.**

**المثال 1:**

```python
>>> get_letter_frequencies('hello')
{'h': 1, 'e': 1, 'l': 2, 'o': 1}
```

**المثال 2:**

```python
>>> get_letter_frequencies('that')
{'t': 2, 'h': 1, 'a': 1}
```

نفّذ `get_letter_frequencies` في `document_distance.py` حسب التعليمات أعلاه والسلاسل التوثيقية المعطاة. وبالإضافة إلى تشغيل ملف الاختبار، يمكنك التحقق السريع من تنفيذك بإلغاء تعليق الأسطر ذات الصلة في أسفل `document_distance.py`:

```python
if __name__ == "__main__":
    # Tests Problem 2: Get Letter Frequencies
    freq1 = get_letter_frequencies('hello')
    freq2 = get_letter_frequencies('that')
    print(freq1)
    # should print {'h': 1, 'e': 1, 'l': 2, 'o': 1}
    print(freq2)
    # should print {'t': 2, 'h': 1, 'a': 1}
```

## 4) التشابه (Similarity)

حان الوقت لحساب التشابه! أكمل الدالة `calculate_similarity_score` بناءً على تعريف التشابه الوارد في الفقرة التالية. ويجب أن تكون دالتك قابلة للاستخدام مع مخرجات `get_frequencies` أو `get_letter_frequencies`.

فكّر في قائمتين `L1` و`L2`. لتكن `U` قائمة مكوّنة من كل العناصر الموجودة في `L1` أو `L2`، لكن بلا تكرار (مثلًا: إذا كانت `L1 = ['a', 'b']` و`L2 = ['b', 'c']`، فإن `U = ['a', 'b', 'c']`).

لعنصر `e` موجود في `L1` أو `L2`، لتكن:

$$
count(e, L_i) =
\begin{cases}
\text{number of times } e \text{ appears in } L_i & \text{if } e \in L_i\\
0 & \text{if } e \notin L_i
\end{cases}
$$

ثم نُعرِّف:

$$
\delta(e) = \left| count(e, L_1) - count(e, L_2) \right|
$$

$$
\sigma(e) = count(e, L_1) + count(e, L_2)
$$

(حيث تُشير الشرطات الرأسية إلى القيمة المطلقة)، ويُعرَّف التشابه على أنه:

$$
1 - \frac{\delta(u_1) + \delta(u_2) + \delta(u_3) + \dots}{\sigma(u_1) + \sigma(u_2) + \sigma(u_3) + \dots}
$$

حيث تُؤخذ المجاميع على كل عناصر `U` أي `u1` و`u2` و`u3` و…، وتُقرَّب النتيجة إلى منزلتين عشريتين.

**مثال (حيث العناصر كلمات):**

لنفترض أن:

```python
L1 = ['hello', 'world', 'hello']
L2 = ['hello', 'friends']
```

قائمة العناصر الفريدة `U` هي `U = ['hello', 'world', 'friends']`.

فروق التكرار $\delta(u)$ هي:

$$
\delta(\text{'hello'}) = |2 - 1| = 1
$$

$$
\delta(\text{'world'}) = |1 - 0| = 1
$$

$$
\delta(\text{'friends'}) = |0 - 1| = 1
$$

ومجاميع التكرار $\sigma(u)$ هي:

$$
\sigma(\text{'hello'}) = 2 + 1 = 3
$$

$$
\sigma(\text{'world'}) = 1 + 0 = 1
$$

$$
\sigma(\text{'friends'}) = 0 + 1 = 1
$$

إذن:

$$
1 - \frac{1 + 1 + 1}{3 + 1 + 1} = 1 - \frac{5}{5} = 0.4
$$

وبالتالي درجة التشابه هي **0.4** (والتقريب إلى منزلتين عشريتين يبقى 0.4).

> **ملاحظة المترجم:** يعرض نصّ PDF الأصلي نفس المعادلة في موضعين مختلفين، وهما متكافئتان: في نسخة الشرح فإن البسط $\delta(u_1) + \delta(u_2) + \delta(u_3) + \dots$ والمقام $\sigma(u_1) + \sigma(u_2) + \sigma(u_3) + \dots$ كما هو مذكور أعلاه، بينما يعرض الموضع الثاني البسط $1 - \frac{1 + 1 + 1}{3 + 1 + 1}$. النتيجة واحدة: 0.4. الحساب هو $1 - \frac{5}{5} = 1 - 1 = 0.4$.

**مهم:** تأكّد من تقريب حساب التشابه النهائي إلى منزلتين عشريتين.

يمكن العثور على نفس الحساب مع شرح بديل (لكن مكافئ) في السلسلة التوثيقية لدالة `calculate_similarity_score`.

نفّذ الدالة `calculate_similarity_score` في `document_distance.py` حسب التعليمات والسلاسل التوثيقية المعطاة. وبالإضافة إلى تشغيل ملف الاختبار، يمكنك التحقق السريع من تنفيذك بإلغاء تعليق الأسطر ذات الصلة في أسفل `document_distance.py`:

```python
if __name__ == "__main__":
    # Tests Problem 3: Similarity
    test_directory = "tests/student_tests/"
    hello_world, hello_friend = load_file(test_directory + 'hello_world.txt'), load_file(test_directory + 'hello_friends.txt')
    world, friend = text_to_list(hello_world), text_to_list(hello_friend)
    world_word_freq = get_frequencies(world)
    friend_word_freq = get_frequencies(friend)
    word1_freq = get_letter_frequencies('toes')
    word2_freq = get_letter_frequencies('that')
    word3_freq = get_frequencies('nah')
    word_similarity1 = calculate_similarity_score(word1_freq, word1_freq)
    word_similarity2 = calculate_similarity_score(word1_freq, word2_freq)
    word_similarity3 = calculate_similarity_score(word1_freq, word3_freq)
    word_similarity4 = calculate_similarity_score(world_word_freq, friend_word_freq)
    print(word_similarity1)
    # should print 1.0
    print(word_similarity2)
    # should print 0.25
    print(word_similarity3)
    # should print 0.0
    print(word_similarity4)
    # should print 0.4
```

## 5) الكلمة (أو الكلمات) الأكثر تكرارًا (Most Frequent Word(s))

الآن، ستكتشف أي كلمة (أو كلمات) تتكرر أكثر من غيرها بين قواميس. ستعدّ كم مرة وردت كل كلمة عبر النصين معًا وتعيد قائمة بالكلمة (أو الكلمات) الأكثر تكرارًا. لا يلزم أن تكون الكلمة الأكثر تكرارًا موجودة في القاموسين معًا. فالأمر يعتمد على تكرارات الكلمات مجتمعة عبر القاموسين. إذا وردت كلمة في القاموسين معًا، فاعتبر مجموع التكرارات هو تكرار الكلمة المجتمَع. وإذا تعدّدت الكلمات المتعادلة في التكرار (أي أنها تملك أعلى تكرار متساوٍ)، فأعد قائمة مرتّبة أبجديًا بكل هذه الكلمات.

على سبيل المثال، فكّر في الاستخدام التالي:

```python
>>> freq1 = {"hello": 5, "world": 1}
>>> freq2 = {"hello": 1, "world": 5}
>>> get_most_frequent_words(freq1, freq2)
["hello", "world"]
```

نفّذ الدالة `get_most_frequent_words` في `document_distance.py` حسب التعليمات والسلسلة التوثيقية المعطاة. وبالإضافة إلى تشغيل ملف الاختبار، يمكنك التحقق السريع من تنفيذك بإلغاء تعليق الأسطر ذات الصلة في أسفل `document_distance.py`:

```python
if __name__ == "__main__":
    # Tests Problem 4: Most Frequent Word(s)
    freq_dict1, freq_dict2 = {"hello": 5, "world": 1}, {"hello": 1, "world": 5}
    most_frequent = get_most_frequent_words(freq_dict1, freq_dict2)
    print(most_frequent)
    # should print ["hello", "world"]
```

## 6) تردد المصطلح–تردد المستند العكسي (TF-IDF)

في هذا الجزء، ستحسب تردد المصطلح–تردد المستند العكسي (Term Frequency–Inverse Document Frequency)، وهو مقياس عددي يدل على أهمية الكلمة (أو الكلمات) في مستند. ستقوم بذلك بحساب تردد المصطلح (TF) أولًا ثم تردد المستند العكسي (IDF)، ثم تجمع الاثنين معًا للحصول على TF-IDF.

يُحسب تردد المصطلح (TF) على النحو التالي:

$$
TF(w) = \frac{\text{number of times word } w \text{ appears in the document}}{\text{total number of words in the document}}
$$

ويُحسب تردد المستند العكسي (IDF) على النحو التالي:

$$
IDF(w) = \log_{10}\left(\frac{\text{total number of documents}}{\text{number of documents with word } w \text{ in it}}\right)
$$

حيث `log10` هو اللوغاريتم للأساس 10 ويمكن استدعاؤه بـ `math.log10`.

ثم نجمع بين TF وIDF لتكوين:

$$
TF\text{-}IDF(w) = TF(w) \times IDF(w)
$$

حيث كلما كانت القيمة أعلى، كان المصطلح أندر، والعكس. في هذه المجموعة سنعمل مع كلمات مفردة فقط، لكن TF-IDF يعمل مع تجمّعات أكبر من الكلمات أيضًا (مثل الثنائيات (bigrams)، والثلاثيات (trigrams)، إلخ).

بالنسبة لدالة `get_tf` التي ستنفّذها، سيُعطى لك اسم ملف مخزّن في متغيّر اسمه `text_file`. ستحتاج إلى تحميل الملف وتجهيز البيانات وتحديد قيمة TF لكل كلمة ترد في `text_file`. يجب أن يكون الخرج ققاموسًا يربط كل كلمة بقيمة TF الخاصة بها.

**فكّر في كيفية إعادة استخدام دوالك السابقة.**

بالنسبة لدالة `get_idf` التي ستنفّذها، ستُعطى قائمة ملفات نصية مخزّنة في متغيّر اسمه `text_files`. ستحتاج إلى تحميل كل ملف منها وتجهيز البيانات وتحديد قيم IDF لكل الكلمات التي ترد في أي من المستندات في `text_files`. يجب أن يكون الخرج قاموسًا يربط كل كلمة بقيمة IDF الخاصة بها.

بالنسبة لدالة `get_tfidf` التي ستنفّذها، سيُعطى لك اسم ملف `text_file` وقائمة أسماء ملفات `text_files`. ستحتاج إلى تحميل الملف وتجهيز البيانات وتحديد TF-IDF لكل الكلمات في `text_file`. يجب أن يكون الخرج **قائمة مرتّبة من الأزواج** (بترتيب TF-IDF تصاعديًا)، حيث كل زوج على الشكل `(word, TF-IDF)`. وفي حالة الكلمات التي لها TF-IDF متساوٍ، يجب أن تُرتَّب الكلمات بترتيب أبجدي تصاعدي.

على سبيل المثال:

```python
>>> text_file = "tests/student_tests/hello_world.txt"
>>> get_tf(text_file)
{"hello": 0.6666666666666666, "world": 0.3333333333333333}
# Explanation: There are 3 total words in "hello_world.txt".
# 2 of the three total words are "hello", giving the first value.

>>> text_files = ["tests/student_tests/hello_world.txt", "tests/student_tests/hello_friends.txt"]
>>> get_idf(text_files)
{"hello": 0.0, "world": 0.3010299956639812, "friends": 0.3010299956639812}
# Explanation: There are a total of 2 documents in this example.
# "hello" is in both documents, giving "hello" an IDF of log10(2/2) = 0.0

>>> text_file = "tests/student_tests/hello_world.txt"
>>> text_files = ["tests/student_tests/hello_world.txt", "tests/student_tests/hello_friends.txt"]
>>> get_tfidf(text_file, text_files)
[('hello', 0.0), ('world', 0.10034333188799373)]
# Explanation: We multiply the corresponding TF and IDF values
# for each word in "hello_world.txt" and get these values.
```

نفّذ الدوال `get_tf` و`get_idf` و`get_tfidf` في `document_distance.py` حسب التعليمات المعطاة. وبالإضافة إلى تشغيل ملف الاختبار، يمكنك التحقق السريع من تنفيذك بإلغاء تعليق الأسطر ذات الصلة في أسفل `document_distance.py`:

```python
if __name__ == "__main__":
    # Tests Problem 5: Find TF-IDF
    tf_text_file = 'tests/student_tests/hello_world.txt'
    idf_text_files = ['tests/student_tests/hello_world.txt', 'tests/student_tests/hello_friends.txt']
    tf = get_tf(tf_text_file)
    idf = get_idf(idf_text_files)
    tf_idf = get_tfidf(tf_text_file, idf_text_files)
    print(tf)
    # should print {'hello': 0.6666666666666666, 'world': 0.3333333333333333}
    print(idf)
    # should print {'hello': 0.0, 'world': 0.3010299956639812, 'friends': 0.3010299956639812}
    print(tf_idf)
    # should print [('hello', 0.0), ('world', 0.10034333188799373)]
```

عندما تنتهي، تأكّد من تشغيل ملف الاختبار `test_ps3_student.py` للتحقق من كودك مقابل حالات الاختبار لدينا.

## 7) إجراءات التسليم (Hand-in Procedure)

### 7.1) تسمية الملفات (Naming Files)

احفظ حلولك باسم الملف الأصلي: `document_distance.py`. لا تتجاهل هذه الخطوة ولا تحفظ ملفك باسم مختلف!

### 7.2) معلومات الوقت والتعاون (Time and Collaboration Info)

في بداية كل ملف، اكتب في تعليق عدد الساعات (تقريبًا) التي أمضيتها على مسائل هذا الجزء، وأسماء متعاونيك. مثال:

```python
# Problem Set 3
# Name: Jane Lee
# Collaborators: John Doe
```

يُرجى تقدير عدد الساعات التي أمضيتها على مجموعة المسائل في مربع السؤال أدناه.

> **ملاحظة المترجم:** عبارات واجهة موقع التسليم («حدث خطأ في بايثون»، «إرسال»، «لم يتم اختيار أي ملف»، «تبقّى لك عدد لا نهائي من مرات التسليم»، وخطأ `ImportError` الظاهر في النسخة المنشورة) نُقلت كما هي لأنها تظهر ضمن النتيجة المصدَّرة من صفحة التسليم في نشرة MIT؛ وهي لا تخصّ الكود الذي تكتبه.

### 7.3) التسليم النصفي (Half-way Submission)

يجب على كل الطلاب تسليم ما أنجزوه حتى موعد التسليم النصفي (أسبوع واحد قبل الموعد النهائي). هذه التسليمات تساوي نقطة واحدة من درجة المجموعة، ولن تُصحَّح من حيث الصحة. الغرض هو التأكّد من أنك تتقدّم باستمرار في المجموعة بدلًا من العمل عليها في الأيام الأخيرة قبل الموعد.

يمكنك رفع نسخ جديدة من كل ملف حتى 12 أكتوبر الساعة 09:00 مساءً. لا يمكنك استخدام تمديدات أو أيام تأخّر في هذه التسليمات.

يُرجى تحديث الصفحة قبل رفع ملف جديد. إذا لم تفعل فلن يتم تحديث آخر تسليم لك.

### 7.4) التسليم النهائي (Final Submission)

تأكّد من تشغيل أداة الاختبار الخاصة بالطالب وأن جميع الاختبارات تنجح. لكن أداة اختبار الطالب تحتوي فقط على مجموعة جزئية من الاختبارات التي ستُشغَّل لتحديد درجة المجموعة. نجاح جميع حالات الاختبار المعطاة لا يضمن الحصول على الدرجة كاملة في المجموعة.

يمكنك رفع نسخ جديدة من كل ملف حتى 2 نوفمبر الساعة 09:00 مساءً، لكن أي شيء يُرفع بعد ذلك الوقت سيُحسب ضمن أيام التأخّر، إن كانت لديك أيّ أيام تأخّر متبقية. وإذا لم تكن لديك أي أيام تأخّر متبقية، فلن تحصل على أي درجة لتسليم متأخّر.

عند رفع ملف جديد بالاسم نفسه، سيُستبدل ملفك القديم.

يُرجى تحديث الصفحة قبل رفع ملف جديد. إذا لم تفعل فلن يتم تحديث آخر تسليم لك.

## قراءة إضافية عن تشابه المستندات (Supplemental Reading about Document Similarity)

هذه المجموعة هي نسخة مبسَّطة كثيرًا من مسألة بالغة الأهمية في استرجاع المعلومات (Information Retrieval). تطبيقات تشابه المستندات تتراوح من استرجاع نتائج محرّكات البحث إلى مقارنة الجينات والبروتينات إلى تحسين الترجمة الآلية (Machine Translation).

وتشمل التقنيات أكثر تقدّمًا لحساب مسافة المستندات تحويل النص إلى فضاء متجهي (Vector Space) وحساب تشابه الجيب التمام (Cosine Similarity)، أو مؤشر جاكار (Jaccard Index)، أو مقياس آخر للمتجهات.

## المصدر والنَّسب والترخيص

المصدر: [تعليمات PS 3 الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps3_pdf/)، `extracted/mit6_100l_f22_ps3.txt`. ترجمة عربية لجميع التعليمات مع إبقاء الكود والمخرجات النموذجية دون ترجمة حتى تبقى نافعة للاختبار. المواعيد تاريخية. لم يُنشر ملف الاختبار المحجوز أو الحزمة الأصلية في `static/`.

النَّسب: **Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare.** [المقرر الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/). المواد المملوكة لـ MIT وهذه الترجمة بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): النَّسب، غير تجاري، المشاركة بالمثل. ترجمة غير رسمية لا تعني اعتماد MIT. استثناءات الأطراف الثالثة محفوظة؛ [شروط الاستخدام](https://ocw.mit.edu/pages/privacy-and-terms-of-use/).