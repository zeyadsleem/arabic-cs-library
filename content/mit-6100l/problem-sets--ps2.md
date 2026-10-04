---
title: "مجموعة المسائل 2 — لعبة تخمين الكلمة"
lang: ar
---

# مجموعة المسائل 2: لعبة تخمين الكلمة (Hangman)

**زميل مجموعة المسائل (Pset Buddy):** لم يُعيَّن لك زميل لهذه المجموعة في النسخة المنشورة.

## المقدمة

### الأهداف

- كتابة الدوال (Functions) واستدعاؤها في بايثون.
- استخدام آليات الحلقات (Loops) لتكرار عملية حاسوبية حتى يتحقق شرط.

### التعاون

- يمكن للطلاب العمل معًا، لكن يكتب كل طالب تكليفه ويسلّمه منفصلًا. لا يجوز تسليم الكود نفسه تمامًا.
- لا يُسمح بالنظر إلى كود الآخرين أو بنيته أو نسخهما.
- اذكر أسماء المتعاونين في تعليق في بداية كل ملف.
- راجع سياسة التعاون في معلومات المقرر للتفاصيل.

رغم طول النشرة، فالمعلومات فيها توفر السياق والأمثلة المفيدة والتلميحات؛ اقرأها بعناية.

## البدء (Getting Started)

ستنفذ في هذه المجموعة نسخة مختلفة من لعبة الكلمات التقليدية Hangman.

### A) إعداد الملفات (File Setup)

حمّل `hangman.py` و`test_ps2_student.py` و`words.txt`، واحفظها في المجلد نفسه. شغّل `hangman.py` قبل كتابة أي كود للتأكد من صحة حفظ الملفات. يحمّل كود البداية كلمات من `words.txt`. ينبغي أن ترى في الصدفة:

```text
Loading word list from file...
  55900 words loaded
```

أي تحميل قائمة الكلمات من الملف، ثم تحميل 55900 كلمة.

**ملاحظة المترجم — مادة محجوزة:** احصل على ملف الاختبار من [الحزمة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps2_code_zip/). يتضمن مساعدات من Stack Overflow تحتاج تحققًا مستقلًا من الترخيص والنَّسب؛ لذلك لا يُنسخ هنا. الإرشادات وأسماء الاختبارات التالية من نشرة MIT، وليست إعادة نشر لكود تلك المساعدات.

### B) نظرة عامة على اللعبة

ستنفذ دالة `hangman` تسمح للمستخدم باللعب ضد الحاسوب. يختار الحاسوب الكلمة، ويحاول اللاعب تخمين حروفها. السلوك العام المطلوب أدناه، وسنقسمه لاحقًا إلى خطوات ومواصفات تفصيلية:

1. يختار الحاسوب كلمة عشوائية من `words.txt`. يحتوي الملف على كلمات بحروف صغيرة فقط.
2. يُمنح المستخدم عددًا معينًا من التخمينات في البداية.
3. يدخل تخمينه، فيقوم الحاسوب بأحد الآتي:
   - يكشف الحرف إن وُجد في الكلمة السرية.
   - يخبر المستخدم أن التخمين غير صالح، إذا كان أطول من محرف واحد، أو ليس حرفًا، أو سبق تخمينه؛ دون عقوبة أو كشف أي شيء.
   - يعاقب المستخدم ويحدّث عدد التخمينات المتبقية إذا كان التخمين صالحًا لكن الحرف غير موجود.
4. تنتهي اللعبة عند تخمين الكلمة أو نفاد التخمينات.

سنضيف ميزة تجعل اللعبة أسهل: يدخل المستخدم محرف المساعدة الخاص `!` لكشف حرف لم يُخمَّن، مقابل خسارة تخمينات أكثر.

## 1) الدوال المساعدة الثلاث (Helper Functions)

سنقسم المسألة إلى مهام فرعية منطقية بإنشاء ثلاث دوال مساعدة؛ وهو نهج شائع لحل المشكلات حاسوبيًا. يحتوي كود البداية في `hangman.py` على تنفيذ `load_words` و`choose_word`. اقرأ السلاسل التوثيقية (Docstrings) لفهم وظيفتيهما.

**مهم:** لا تغير اسم أي دالة مقدمة أو معاملاتها أو مواصفاتها! يمكنك إضافة دوال مساعدة، لكن تغيير تعريفات الدوال المقدمة يؤدي لفشل اختبارات الوحدات (Unit Tests).

### 1.1) تحديد فوز اللاعب

نفذ `has_player_won` حسب توثيقها. تساعد في تحديد الفوز، أي تخمين المستخدم جميع حروف الكلمة السرية.

```python
>>> secret_word = 'apple'
>>> letters_guessed = ['e', 'i', 'k', 'p', 'r', 's']
>>> print(has_player_won(secret_word, letters_guessed))
False
```

**الاختبار:** افتح `test_ps2_student.py` وشغّله في Spyder. سيشغل سلسلة اختبارات وحدات على كودك، بما فيها دوال ستنفذها لاحقًا، فلا تتوقع اجتياز الجميع مباشرة. افحص الاختبارات التي تبدأ بـ `test_has_player_won`. إن كانت الدالة صحيحة سترى:

```text
test_has_player_won (__main__.TestPS2) ... ok
test_has_player_won_empty_list (__main__.TestPS2) ... ok
test_has_player_won_empty_string (__main__.TestPS2) ... ok
test_has_player_won_repeated_letters (__main__.TestPS2) ... ok
```

### 1.2) كشف الحروف

نفذ `get_word_progress` حسب توثيقها. ينبغي أن تشبه `has_player_won` كثيرًا.

**تلميح:** فكر هل تحتاج تخزين معلومات أثناء المرور على بنية البيانات، وكيف تضيف المعلومات إلى النتيجة المتراكمة.

```python
>>> secret_word = 'apple'
>>> letters_guessed = ['e', 'i', 'k', 'p', 'r', 's']
>>> print(get_word_progress(secret_word, letters_guessed))
*pp*e
```

**الاختبار:** شغّل الملف وافحص ما يبدأ بـ `test_get_word_progress`. النتيجة الصحيحة:

```text
test_get_word_progress (__main__.TestPS2) ... ok
test_get_word_progress_empty_list (__main__.TestPS2) ... ok
test_get_word_progress_empty_string (__main__.TestPS2) ... ok
test_get_word_progress_repeated_letters (__main__.TestPS2) ... ok
```

### 1.3) الحصول على الحروف المتاحة

نفذ `get_available_letters` حسب توثيقها. يجب إرجاع الحروف مرتبة أبجديًا. قد تفيدك `string.ascii_lowercase`، وهي سلسلة تضم جميع الحروف الصغيرة:

```python
>>> import string
>>> print(string.ascii_lowercase)
abcdefghijklmnopqrstuvwxyz
>>> letters_guessed = ['e', 'i', 'k', 'p', 'r', 's']
>>> print(get_available_letters(letters_guessed))
abcdfghjlmnoqtuvwxyz
```

**الاختبار:** افحص ما يبدأ بـ `test_get_available_letters`:

```text
test_get_available_letters (__main__.TestPS2) ... ok
test_get_available_letters_empty_list (__main__.TestPS2) ... ok
test_get_available_letters_empty_string (__main__.TestPS2) ... ok
```

## 2) اللعبة (The Game)

بعد كتابة الدوال المساعدة، نفذ `hangman`، التي تستقبل (1) `secret_word`، الكلمة المطلوب تخمينها، و(2) `with_help`، قيمة منطقية تحدد استخدام المساعدة. استدعاؤها يبدأ لعبة تفاعلية بين المستخدم والحاسوب. استفد من الدوال الثلاث السابقة، ويمكنك كتابة مساعدات إضافية.

اختبرها باستدعائها داخل شرط `if __name__ == "__main__":` في أسفل `hangman.py`. حدد الكلمة يدويًا لتسهيل الاختبار، ثم اختبر أيضًا بكلمة عشوائية. مثال:

```python
if __name__ == "__main__":
    secret_word = "tact"
    with_help = False
    hangman(secret_word, with_help)
```

**ملاحظتان مهمتان:** اجعل عبارات الطباعة أقرب ما يمكن إلى أمثلة اللعب؛ يحتوي الملحق أيضًا على أمثلة مفيدة. وراجع نصائح تصحيح الأخطاء إن واجهت صعوبة.

### 2.1) إعداد اللعبة

1. تُمرر `secret_word` والقيمة المنطقية `with_help` إلى الدالة كمعاملين.
2. اعرض في البداية عدد حروف الكلمة السرية.
3. يبدأ المستخدم بعشرة تخمينات.

```text
Loading word list from file...
  55900 words loaded.
Welcome to Hangman!
I am thinking of a word that is 4 letters long.
```

### 2.2) التفاعل بين المستخدم والحاسوب

1. قبل كل تخمين اعرض:
   - ثلاثة شُرط `-` على الأقل، مثل `--------------`، للفصل بين التخمينات. حذف هذا السطر يؤدي لفشل أداة الاختبار.
   - عدد التخمينات المتبقية.
   - جميع الحروف التي لم تُخمَّن بعد.
2. اطلب تخمينًا واحدًا في كل مرة:
   - يمكن للمستخدم كتابة أرقام أو رموز أو حروف، لكن يجب قبول **الحروف المفردة الكبيرة والصغيرة فقط** كتخمينات صالحة.
   - مع المساعدة اقبل أيضًا `!`.
3. عقب كل تخمين مباشرة اعرض:
   - هل الحرف موجود في الكلمة السرية.
   - الكلمة مع الحروف المخمنة مكشوفة، وغير المخمنة ممثلة بنجمات `*`.

مثال التنفيذ 1:

```text
Loading word list from file...
   55900 words loaded.
Welcome to Hangman!
I am thinking of a word that is 4 letters long.
--------------
You have 10 guesses left.
Available letters: abcdefghijklmnopqrstuvwxyz
Please guess a letter: a      # This is the user input
Good guess: *a**
--------------
You have 10 guesses left.
Available letters: bcdefghijklmnopqrstuvwxyz
Please guess a letter: b      # This is the user input
Oops! That letter is not in my word: *a**
--------------
You have 9 guesses left.
Available letters: cdefghijklmnopqrstuvwxyz
Please guess a letter: 2      # This is the user input
Oops! That is not a valid letter. Please input a letter from
the alphabet: *a**
--------------
You have 9 guesses left.
Available letters: cdefghijklmnopqrstuvwxyz
Please guess a letter: foo      # This is the user input
Oops! That is not a valid letter. Please input a letter from
the alphabet: *a**
--------------
You have 9 guesses left.
Available letters: cdefghijklmnopqrstuvwxyz
Please guess a letter: +      # This is the user input
Oops! That is not a valid letter. Please input a letter from
the alphabet: *a**
```

**ملاحظة:** `# This is the user input` تعليق، وليس جزءًا من المخرج. **ملاحظة المترجم:** حُفظت نصوص المخرجات الإنجليزية لمطابقة الاختبارات. معانيها: ترحيب، طول الكلمة، التخمينات المتبقية، الحروف المتاحة، طلب حرف، تخمين صحيح، حرف غير موجود، أو إدخال غير صالح.

**تلميحات:**

1. استخدم `input()` للحصول على التخمين. تحقق أنه حرف أبجدي، أو محرف المساعدة عند تفعيلها. إن لم يكن صالحًا، أخبر المستخدم أنه يستطيع إدخال حرف أبجدي فقط.
2. لأن كلمات `words.txt` صغيرة الحروف، نقترح تحويل الإدخال إلى حروف صغيرة حتى يتعامل البرنامج معها فقط.
3. قد تفيدك `str.isalpha()` و`str.lower()`! اكتب `help(str.isalpha)` أو `help(str.lower)` في صدفة Spyder لقراءة التوثيق. مثال:

```python
>> my_string = "HeLLoWoRlD"
>> my_string.isalpha()
True
>> my_string.lower()
'helloworld'
```

### 2.3) التخمينات المتبقية

إذا أدخل المستخدم:

1. شيئًا غير حرف، مثل رمز أو رقم، فأخبره أنه يستطيع إدخال حرف أبجدي فقط. لا يخسر تخمينًا. مع المساعدة تكون `!` صالحة أيضًا.
2. حرفًا سبق تخمينه، فاطبع رسالة بذلك. لا يخسر تخمينًا.
3. حرفًا جديدًا موجودًا في الكلمة، فلا يخسر تخمينًا.
4. حرفًا ساكنًا (Consonant) جديدًا غير موجود، فيخسر تخمينًا واحدًا.
5. حرف علة (Vowel) جديدًا غير موجود، فيخسر تخمينين. حروف العلة هي `a` و`e` و`i` و`o` و`u`، ولا تُعد `y` منها. إذا بقي تخمين واحد وأدخل حرف علة خاطئًا جديدًا، يخسر وتنتهي اللعبة.

متابعة مثال التنفيذ 1:

```text
You have 9 guesses left.
Available letters: bcdefghijklmnopqrtuvwxyz
Please guess a letter: t
Good guess: ta*t
--------------
You have 9 guesses left.
Available letters: bcdefghijklmnopqruvwxyz
Please guess a letter: e
Oops! That letter is not in my word: ta*t
--------------
You have 7 guesses left.
Available letters: bcdfghijklmnopqruvwxyz
Please guess a letter: e
Oops! You've already guessed that letter: ta*t
```

الرسالة الأخيرة تعني: سبق أن خمنت هذا الحرف.

### 2.4) اللعبة مع المساعدة

ليس التفوق على الحاسوب سهلًا دائمًا، خصوصًا إذا اختار كلمة نادرة. قد يكون طلب المساعدة مفيدًا. أنشئ ميزة تعمل كالآتي:

- إذا كتبت المحرف الخاص `!`، يكشف الحاسوب حرفًا مفقودًا في الكلمة مقابل ثلاثة تخمينات. يجب أن يكون المحرف الوحيد غير الحرفي المقبول كتخمين.
- إن لم يبق ثلاثة تخمينات على الأقل، يحذرك الحاسوب ويتيح إعادة المحاولة. لا تخسر تخمينًا.
- تتاح الميزة فقط حين تكون `with_help` مساوية لـ `True`.

نقترح كبداية دالة مساعدة تختار حرفًا لكشفه. تستقبل الكلمة السرية وسلسلة الحروف المتاحة من `get_available_letters`. أنشئ سلسلة `choose_from` تضم الحروف الفريدة الموجودة في الكلمة وفي الحروف المتاحة معًا. ثم اختر حرفًا عشوائيًا `revealed_letter`:

```python
new = random.randint(0, len(choose_from)-1)
revealed_letter = choose_from[new]
```

ترجع الدالة هذا الحرف. أضف إلى منطق اللعبة شرطًا يلتقط إدخال `!`: يضيف الحرف إلى `letters_guessed`، ويعرض تقدم الكلمة الجديد، وينقص المتبقي بمقدار 3، ويواصل اللعب.

مثال التنفيذ 2:

```text
Welcome to Hangman!
I am thinking of a word that is 7 letters long.
--------------
You currently have 10 guesses left.
Available letters: abcdefghijklmnopqrstu
Please guess a letter: !
Letter revealed: r
r*****r
--------------
You currently have 7 guesses left.
Available letters: abcdefghijklmnopqrstu
Please guess a letter: !
Letter revealed: a
ra***ar
--------------
You currently have 4 guesses left.
Available letters: abdefghijklmnopqrstu
Please guess a letter: !
Letter revealed: e
ra*e*ar
--------------
You currently have 1 guess left.
Available letters: abdefghijklmnopqstu
Please guess a letter: !
Oops! Not enough guesses left: ra*e*ar
```

تعني الرسائل الجديدة: الحرف المكشوف، أو عدم كفاية التخمينات. راجع الملحق لمثال لعبة كاملة مع المساعدة. **ملاحظة المترجم:** سلاسل الحروف المتاحة في هذا المثال محفوظة كما نشرها المصدر، حتى حين لا تعكس كل تحديث متوقع؛ القواعد النصية أعلاه هي المواصفات.

### 2.5) إنهاء اللعبة (Game Termination)

1. تنتهي عند تخمين جميع حروف `secret_word` أو بقاء صفر تخمينات.
2. عند الفوز اطبع تهنئة وأخبر المستخدم بدرجته:

$$
\mathrm{total\_score}=(\mathrm{guesses\_remaining}+4\times\text{عدد الحروف الفريدة في الكلمة السرية})+(3\times\text{طول الكلمة السرية})
$$

مثلًا، مع الكلمة `asleep` و6 تخمينات متبقية، هناك 5 حروف فريدة: `a, s, l, e, p`. الدرجة هي $(6+4\times5)+(3\times6)=44$.

3. عند نفاد التخمينات قبل إكمال الكلمة، أخبر اللاعب بخسارته واكشف الكلمة في النهاية.

مثال الفوز:

```text
# ... snip ...
You have 5 guesses left.
Available letters: abcgnqrstuvwxyz
Please guess a letter: n
Good guess: dolphin
--------------
Congratulations, you won!
Your total score for this game is: 54
```

`# ...snip...` ليست من المخرج، بل تعني أن المثال يعرض جزءًا فقط من التنفيذ.

مثال الخسارة:

```text
# ... snip ...
You have 1 guess left.
Available Letters: ghijklmnopqrstuvwxyz
Please guess a letter: i
Oops! That letter is not in my word: e**e
--------------
Sorry, you ran out of guesses. The word was else.
```

ينطبق على علامة الاقتصاص التنبيه نفسه. تعني رسائل النهاية: تهانينا بالفوز ودرجتك الكلية، أو للأسف نفدت التخمينات وكانت الكلمة كذا.

### 2.6) اختبار الكود

اقرأ أمثلة الملحق بعناية، واجعل الطباعة أقرب ما يمكن إليها. إن واجهت مشكلة فراجع تلميحات التصحيح. في أسفل `hangman.py` ستجد:

```python
if __name__ == "__main__":
    # To test your game, uncomment the following three lines.

    # secret_word = choose_word(wordlist)
    # with_help = False
    # hangman(secret_word, with_help)
```

أزل علامة التعليق من الأسطر الثلاثة الأخيرة لاختيار كلمة عشوائية واللعب بها. يمكنك تمرير كلمتك الخاصة أثناء الاختبار.

#### 2.6.1) أداة اختبار الطالب

شغّل `test_ps2_student.py` لاختبار عمل اللعبة. ينبغي أن ترى:

```text
test_play_game_short (__main__.TestPS2) ... ok
test_play_game_short_fail (__main__.TestPS2) ... ok
test_play_game_with_help (__main__.TestPS2) ... ok
```

قد تظهر رسائل بين `...` و`ok`، مثل:

```text
Problem Set 2 Unit Test Results:
All correct!
Points for these tests: 5/5
(Please note that this is not your final pset score, additional test cases will be run on submissions)
ok
```

لا بأس بذلك. معناها: جميع الاختبارات صحيحة، ودرجتها 5/5، لكنها ليست الدرجة النهائية؛ ستُشغّل حالات إضافية على التسليمات.

## 3) إجراءات التسليم

### 3.1) تسمية الملفات

احفظ الحل بالاسم الأصلي `hangman.py`. لا تتجاهل ذلك ولا تحفظه باسم مختلف!

### 3.2) معلومات الوقت والتعاون

اكتب أسماء المتعاونين في تعليق أول كل ملف، مثل:

```python
# Problem Set 2, hangman.py
# Name: Jane Lee
# Collaborators: John Doe
```

قدّر الساعات التي قضيتها في المجموعة في صندوق السؤال.

### 3.3) التسليم المرحلي

على جميع الطلاب تسليم تقدمهم بحلول الموعد المرحلي، قبل النهائي بأسبوع. يساوي نقطة واحدة ولا يُقيَّم للصحة؛ الهدف تقدم ثابت بدل العمل في آخر الأيام. يمكنك رفع إصدارات جديدة من كل ملف حتى **12 أكتوبر، 09:00 مساءً**. لا تمديدات ولا أيام تأخير لهذا التسليم.

واجهة المصدر: اختيار ملف، لم يُختَر ملف، إرسال. عدد التسليمات المتبقية غير محدود.

### 3.4) التسليم النهائي

شغّل أداة اختبار الطالب وتأكد من اجتياز الجميع. تحتوي الأداة على جزء فقط من اختبارات الدرجة؛ النجاح فيها لا يضمن الدرجة كاملة.

يمكنك رفع إصدارات جديدة حتى **19 أكتوبر، 09:00 مساءً**. يُحتسب الرفع المتأخر من رصيد أيام التأخير إن بقي؛ دون رصيد لا تحصل على درجة للتسليم المتأخر. رفع ملف جديد بالاسم نفسه يستبدل القديم.

حدّث الصفحة قبل تسليم ملف جديد؛ وإلا فلن يُحدَّث آخر تسليم.

واجهة المصدر: اختيار ملف، لم يُختَر ملف، إرسال. عدد التسليمات المتبقية غير محدود.

## 4) الملحق (Appendix)

### 4.1) مثال Hangman: لعبة فوز

```text
Loading word list from file...
  55900 words loaded.
Welcome to Hangman!
I am thinking of a word that is 4 letters long.
--------------
You have 10 guesses left.
Available letters: abcdefghijklmnopqrstuvwxyz
Please guess a letter: a
Good guess: *a**
--------------
You have 10 guesses left.
Available letters: bcdefghijklmnopqrstuvwxyz
Please guess a letter: a
Oops! You've already guessed that letter: *a**
--------------
You have 10 guesses left.
Available letters: bcdefghijklmnopqrstuvwxyz
Please guess a letter: s
Oops! That letter is not in my word: *a**
--------------
You have 9 guesses left.
Available letters: bcdefghijklmnopqrtuvwxyz
Please guess a letter: +
Oops! That is not a valid letter. Please input a letter from the alphabet: *a**
--------------
You have 9 guesses left.
Available letters: bcdefghijklmnopqrtuvwxyz
Please guess a letter: t
Good guess: ta*t
--------------
You have 9 guesses left.
Available letters: bcdefghijklmnopqruvwxyz
Please guess a letter: e
Oops! That letter is not in my word: ta*t
--------------
You have 7 guesses left.
Available letters: bcdfghijklnopquvwxyz
Please guess a letter: c
Good guess: tact
--------------
Congratulations, you won!
Your total score for this game is: 31
```

### 4.2) مثال Hangman: لعبة خسارة

```text
Loading word list from file...
  55900 words loaded.
Welcome to Hangman!
I am thinking of a word that is 4 letters long
--------------
You have 10 guesses left.
Available Letters: abcdefghijklmnopqrstuvwxyz
Please guess a letter: a
Oops! That letter is not in my word: ****
--------------
You have 8 guesses left.
Available Letters: bcdefghijklmnopqrstuvwxyz
Please guess a letter: b
Oops! That letter is not in my word: ****
--------------
You have 7 guesses left.
Available Letters: cdefghijklmnopqrstuvwxyz
Please guess a letter: c
Oops! That letter is not in my word: ****
--------------
You have 6 guesses left.
Available Letters: defghijklmnopqrstuvwxyz
Please guess a letter: 2
Oops! That is not a valid letter. Please input a letter from the alphabet: ****
--------------
You have 6 guesses left.
Available Letters: defghijklmnopqrstuvwxyz
Please guess a letter: d
Oops! That letter is not in my word: ****
--------------
You have 5 guesses left.
Available Letters: efghijklmnopqrstuvwxyz
Please guess a letter: u
Oops! That letter is not in my word: ****
--------------
You have 3 guesses left.
Available Letters: efghijklmnopqrstvwxyz
Please guess a letter: e
Good guess: e**e
--------------
You have 3 guesses left.
Available Letters: fghijklmnopqrstuvwxyz
Please guess a letter: f
Oops! That letter is not in my word: e**e
--------------
You have 2 guesses left.
Available Letters: ghijklmnopqrstuvwxyz
Please guess a letter: o
Oops! That letter is not in my word: e**e
--------------
Sorry, you ran out of guesses. The word was else.
```

### 4.3) Hangman مع المساعدة

```text
Loading word list from file...
  55900 words loaded.
Welcome to Hangman!
I am thinking of a word that is 7 letters long
--------------
You currently have 10 guesses left
Available letters: abcdefghijklmnopqrstuvwxyz
Please guess a letter: r
Good guess: r*****r
--------------
You currently have 10 guesses left
Available letters: abcdefghijklmnopqstuvwxyz
Please guess a letter: !
Letter revealed: c
r*c*c*r
--------------
You currently have 7 guesses left
Available letters: abdeghijklmnopqstuvwxyz
Please guess a letter: !
Letter revealed: a
rac*car
--------------
You currently have 4 guesses left
Available letters: bdeghijklmnopqstuvwxyz
Please guess a letter: e
Good guess: racecar
--------------
Congratulations, you won!
Your total score for this game is: 41
```

## 5) نصائح مفيدة لتصحيح الأخطاء (Helpful Debugging Tips)

- يقارن المصحح الآلي المخرج المطبوع بالمخرج المتوقع، لذلك صمم اللعبة لتطابقه قدر الإمكان. يحتاج مخرجك مثلًا إلى عدد الأسطر نفسه. أدرج كل ما تطبعه الأمثلة، بما فيه الشُرط `--------------` في نهاية الدور!
- إذا فشل أي اختبار `test_play_game`، ينبغي ظهور `run_game_test_results.txt` في مجلد أداة الاختبار، وفيه المخرج المتوقع والفعلي.
  - لا تقلق إذا غابت رسائل طلب الإدخال مثل `Please guess a letter:` من الملف؛ لا تُعاد توجيهها إلى مخرج الملف، ولا ينبغي أن يؤثر ذلك في الاختبار.
  - مرر سلسلة غير فارغة إلى `input`، مثل `input("Please guess a letter: ")`. لا تستطيع الأداة تغذية البرنامج بالإدخال بصورة صحيحة إذا استدعيت `input("")`.
  - إذا ظهر `NameError: name 'outputstr' is not defined` فأعد تشغيل نواة Spyder.
- قد تضيف `print` مسافات دون قصد. المثال التالي يدرج مسافة بين السلسلتين:

```python
>>> print('foo', 'bar')
foo bar
```

يمكن تغيير الفاصل باستخدام المعامل الاختياري `sep`، وقيمته الافتراضية مسافة واحدة. تضيف بايثون افتراضيًا `\n`، محرف السطر الجديد، إلى نهاية السلسلة المطبوعة؛ لذلك ترى كل طباعة في سطر جديد. يمكن تغيير ذلك باستخدام `end`. لا تحتاجه للمجموعة، لكن من الجيد معرفته:

```python
>>> print('foo', 'bar', 'baz', sep=" and ", end='\n')
foo and bar and baz
```

- قد تُدرج نافذة Spyder سطرًا فارغًا إضافيًا حتى دون كود يطلبه؛ لا ينبغي أن يؤثر في الاختبار.
- هل تحسب الدرجات بصورة صحيحة؟ قد يفيدك كتابة دالة تحسب الدرجة من الكلمة والتخمينات المتبقية. احتسب التخمينات المفقودة بسبب التلميحات أيضًا.

كالمعتاد، طباعة قيم المتغيرات في مواضع مدروسة طريقة مفيدة للتحقق من تخزين القيم الصحيحة فيها.

## المصدر والنَّسب والترخيص

المصدر: [تعليمات PS 2 الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps2_pdf/)، `extracted/mit6_100l_f22_ps2.layout.txt`. ترجمة عربية لجميع التعليمات مع إبقاء الكود والمخرجات النموذجية دون ترجمة حتى تبقى نافعة للاختبار. المواعيد تاريخية. لم يُنشر ملف الاختبار المحجوز أو الحزمة الأصلية في `static/`.

النَّسب: **Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare.** [المقرر الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/). المواد المملوكة لـ MIT وهذه الترجمة بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): النَّسب، غير تجاري، المشاركة بالمثل. ترجمة غير رسمية لا تعني اعتماد MIT. استثناءات الأطراف الثالثة محفوظة؛ [شروط الاستخدام](https://ocw.mit.edu/pages/privacy-and-terms-of-use/).
