---
title: "التعاود"
lang: ar
source: "https://programming-26.mooc.fi/part-11/3-recursion"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف ما معنى التعاود
> - ستكون قادرًا على كتابة دالة تعاودية بسيطة


كما رأينا مرات عديدة من قبل، يمكن للدوال أن تستدعي دوالّ أخرى. فمثلًا:

```python
def hello(name : str):
    print("Hello", name)

def hello_many_times(name : str, times : int):
    for i in range(times):
        hello(name)
```

يمكن للدالة أيضًا أن تستدعي نفسها، لكن علينا نحن المبرمجين أن نكون حذرين حين نفعل ذلك. فمن السهل أن نقع في حلقة لا نهائية من استدعاءات الدوال، تمامًا كما وقعنا في حلقة تكرار لا نهائية مع حلقات `while` إذا أهملنا شروط التوقف المناسبة. فمحاولة استدعاء دالة `hello` بالتعريف التالي

```python
def hello(name : str):
    print("Hello", name)
    hello(name) # function calls itself
```

ستُسبّب نوعًا جديدًا من الأخطاء:


```
RecursionError: maximum recursion depth exceeded
```


## ماذا يعني التعاود؟

يشير _التعاود_ المذكور في الخطأ أعلاه إلى _تعريف شيء ما بدلالة نفسه_. وفي سياق البرمجة يشير عادةً إلى دالة تستدعي نفسها. ولكي يعمل ذلك دون إحداث أي حلقات لا نهائية، يجب أن تتغيّر الوسائط الممرّرة إلى الدالة في كل مرة، بحيث تتوقف استدعاءات الدوال المتداخلة في نقطة ما. والمبدأ الأساسي هنا هو نفسه في حلقات `while`: يجب أن يوجد دائمًا شرط توقف من نوع ما، وأن يُستوفى هذا الشرط في نقطة ما أثناء التنفيذ.

لننظر إلى دالة بسيطة تضيف أصفارًا إلى قائمة ما دام عدد العناصر فيها أقل من 10. لكننا هذه المرة لا نستخدم حلقة. فإذا لم يتحقق الشرط بعد، تستدعي الدالة نفسها:

```python
def fill_list(numbers: list):
    """ If the length of the list is less than 10, add items to the list """
    if len(numbers) < 10:
        numbers.append(0)
        # call the function again
        fill_list(numbers)


if __name__ == "__main__":
    test_list = [1,2,3,4]
    fill_list(test_list)
    print(test_list)
```


```
[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]
```


ويمكن تحقيق الوظيفة نفسها تمامًا بحلقة `while` عادية:

```python
def fill_list(numbers: list):
    """ If the length of the list is less than 10, add items to the list """
    while len(numbers) < 10:
        numbers.append(0)

if __name__ == "__main__":
    test_list = [1,2,3,4]
    fill_list(test_list)
    print(test_list)
```

ينتج الأسلوب التكراري الأكثر تقليدية برنامجًا أقصر، ويمكن القول إنه أسهل في الفهم أيضًا. أما مع النسخة التعاودية فليس من الواضح بالقدر نفسه أننا نعمل على القائمة ذاتها طوال العملية. لكن هذا هو الحال فعلًا، ولهذا تعمل الدالة التعاودية بالقدر نفسه من الجودة.

> **تكراري أم تعاودي؟**
>
> كثيرًا ما تفرّق نظرية علوم الحاسوب بين الخوارزميات _التكرارية_ و_التعاودية_، لذا من الأفضل أن تألف هذين المصطلحين منذ البداية. الحلول التكرارية هي تلك المبنية على معالجة العناصر معالجة متسلسلة، غالبًا باستخدام حلقات. وقد تعاملنا حتى الآن مع الأساليب التكرارية على سبيل الحصر تقريبًا. أما التعاودي فيشير إلى أسلوب تستدعي فيه الدالة نفسها بقيم معاملات متغيّرة.
>
> من حيث المبدأ ينبغي أن يكون ممكنًا حل أي مشكلة بالأسلوبين التكراري أو التعاودي. لكن عمليًا غالبًا ما يكون أحد الأسلوبين أنسب بوضوح لكل مشكلة. والقدرة على تحديد الأفضل تأتي في معظمها بالممارسة.


> **تمرين برمجي: إضافة أعداد إلى قائمة**
>
> يُرجى كتابة _دالة تعاودية_ باسم `add_numbers_to_list(numbers: list)`. تأخذ الدالة قائمة أعداد بوصفها وسيطًا لها، وتضيف أعدادًا جديدة إلى القائمة حتى يصبح طول القائمة قابلًا للقسمة على خمسة. وينبغي أن يكون كل عدد يُضاف إلى القائمة أكبر بواحد من العدد الأخير في القائمة.

يجب أن تستدعي الدالة نفسها استدعاءً تعاوديًا. يُرجى الاطلاع على المثال أدناه.

```python
numbers = [1,3,4,5,10,11]
add_numbers_to_list(numbers)
print(numbers)
```


```
[1, 3, 4, 5, 10, 11, 12, 13, 14, 15]
```


## التعاود وقيم الإرجاع

يمكن أن يكون للدوال التعاودية قيم إرجاع أيضًا. وقد تعاملنا في الأقسام القليلة الماضية مع المضروب (factorial)، فلنكتب دالة تعاودية لحساب المضروب:

```python

def factorial(n: int):
    """ The function calculates the factorial n! for n >= 0 """
    if n < 2:
        # The factorial for 0 and 1 is 1
        return 1

    # Call the function again with an argument that is one smaller
    return n * factorial(n - 1)

if __name__ == "__main__":
    # Tesing our function
    for i in range(1, 7):
        print(f"The factorial of {i} is {factorial(i)}")

```


```
The factorial of 1 is 1
The factorial of 2 is 2
The factorial of 3 is 6
The factorial of 4 is 24
The factorial of 5 is 120
The factorial of 6 is 720
```


إذا كان معامل الدالة التعاودية للمضروب يساوي 0 أو 1، فتُرجع الدالة 1، لأن هذه هي طريقة تعريف عملية المضروب. وفي أي حالة أخرى تُرجع الدالة القيمة `n * factorial(n - 1)`، وهي قيمة معاملها `n` مضروبة في قيمة الإرجاع للاستدعاء `factorial(n - 1)`.

والجزء الحاسم هنا أن تعريف الدالة يتضمّن شرط توقف. فإذا تحقق هذا الشرط انتهى التعاود. وهذا الشرط في هذه الحالة هو `n < 2`. ونحن نعلم أنه سيُستوفى في النهاية، لأن القيمة الممرّرة وسيطًا إلى الدالة تنقص بمقدار واحد في كل مستوى من مستويات التعاود.

ويمكن أن تكون [أداة التصوير](http://www.pythontutor.com/visualize.html#mode=edit) عونًا كبيرًا في فهم البرامج التعاودية.

وقد يصبح المثال أعلاه أوضح قليلًا لو استخدمنا متغيّرات مساعدة:

```python
def factorial(n: int):
    if n < 2:
        return 1

    factorial_one_level_down = factorial(n - 1)
    factorial_now = n * factorial_one_level_down
    return factorial_now
    
factorial(5)
```

ألقِ نظرة على كيف توضّح [أداة التصوير](http://www.pythontutor.com/visualize.html#code=def%20factorial%28n%3A%20int%29%3A%0A%20%20%20%20if%20n%20%3C%202%3A%0A%20%20%20%20%20%20%20%20return%201%0A%0A%20%20%20%20factorial_one_level_down%20%3D%20factorial%28n%20-%201%29%0A%20%20%20%20factorial_now%20%3D%20n%20*%20factorial_one_level_down%0A%20%20%20%20return%20factorial_now%0A%20%20%20%20%0Afactorial%285%29&cumulative=false&curInstr=5&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false) تقدّم التعاود.

لأداة التصوير خصوصية صغيرة في طريقة تعاملها مع مكدّس الاستدعاءات، إذ يبدو أنها "تنمو" نحو الأسفل. وعادةً ما تُصوَّر مكدّسات الاستدعاءات على أنها كذلك بالفعل: مكدّسات توضع فيها الاستدعاءات الجديدة في الأعلى. أما في أداة التصوير فإن استدعاء الدالة النشط حاليًا هو الكتلة المظللة في الأسفل، ولها نسخها الخاصة من المتغيّرات الظاهرة.

عند استدعاء الدالة التعاودية للمضروب يُبنى مكدّس الاستدعاءات حتى الوصول إلى الحد الذي يفرضه `n < 2`. عندئذٍ يعود آخر استدعاء للدالة في المكدّس بقيمة، وهي `1`، لأن `n` أصبح الآن أقل من 2. وتُمرَّر قيمة الإرجاع هذه إلى الاستدعاء السابق في المكدّس، حيث تُستخدم لحساب قيمة الإرجاع لذلك الاستدعاء، وهكذا دواليك في الخروج من المكدّس.

وتُخزَّن قيمة الإرجاع لكل استدعاء للدالة في المتغيّر المساعد `factorial_now`. يُرجى مراجعة التصوير بعناية حتى تفهم ما يحدث في كل خطوة، وأولِ عناية خاصة للقيمة المُرجعة في كل خطوة.

![11_1_1.png](/images/mooc/part-11/11_1_1.png)

لننظر إلى مثال تعاودي شائع آخر: عدد فيبوناتشي (Fibonacci). في متتالية فيبوناتشي يكون كل عدد مجموع العددين السابقين له. وقد عُرِّف العددان الأولان هنا بأنهما 1 و1، فتبدأ المتتالية هكذا: 1، 1، 2، 3، 5، 8، 13، 21، 34.

```python
def fibonacci(n: int):
    """ The function returns the nth number in the Fibonacci sequence (1, 1, 2, 3, 5, 8 etc.); n > 0"""

    if n <= 2:
        # the first two are ones
        return 1

    # All other numbers equal the sum of the two preceding numbers in the sequence
    return fibonacci(n - 1) + fibonacci(n - 2)

# Test that everything works
if __name__ == "__main__":
    for i in range(1, 11):
        print(f"The {i}. number in the Fibonacci sequence is {fibonacci(i)}")
```


```
The 1. number in the Fibonacci sequence is 1
The 2. number in the Fibonacci sequence is 1
The 3. number in the Fibonacci sequence is 2
The 4. number in the Fibonacci sequence is 3
The 5. number in the Fibonacci sequence is 5
The 6. number in the Fibonacci sequence is 8
The 7. number in the Fibonacci sequence is 13
The 8. number in the Fibonacci sequence is 21
The 9. number in the Fibonacci sequence is 34
The 10. number in the Fibonacci sequence is 55
```


هذه المرة شرط التوقف هو أن يكون المعامل أقل من أو يساوي 2، لأن المتتالية كلها معرّفة انطلاقًا من العددين الأولين، وقد عرّفنا العددين الأولين بأنهما يساويان 1.

إذًا، كيف تعمل هذه الدالة عمليًا؟

إذا استُدعيت الدالة بالوسيط 1 أو 2، فإنها تُرجع 1، وفقًا لما يقتضيه الشرط `n <= 2`.

أما إذا كان الوسيط 3 أو أكبر، فتُرجع الدالة قيمة `fibonacci(n - 1) + fibonacci(n - 2)`. وإذا كان الوسيط 3 بالضبط، فإن هذه القيمة تساوي `fibonacci(2) + fibonacci(1)`، ونحن نعرف بالفعل نتيجة كلٍّ منهما من الخطوة السابقة. و`1 + 1` يساوي 2، وهو فعلًا العدد الثالث في متتالية فيبوناتشي.

وإذا كان الوسيط 4، فقيمة الإرجاع هي `fibonacci(3) + fibonacci(2)`، التي نعرف الآن أنها `2 + 1`، أي ما يساوي 3.

وإذا كان الوسيط 5، فقيمة الإرجاع هي `fibonacci(4) + fibonacci(3)`، التي نعرف الآن أنها `3 + 2`، أي ما يساوي 5.

وهكذا دواليك، وهكذا دواليك.

ويمكننا التحقق في كل خطوة من أن الدالة تُنتج النتائج الصحيحة، وهذا يكفي غالبًا في مهام البرمجة الأساسية. أما قابلية الخوارزميات للتحقق الصوري فهي موضوع لدورات أكثر تقدمًا، مثل [هياكل البيانات والخوارزميات](https://studies.helsinki.fi/courses/cur/hy-opt-cur-2122-808d3413-3db0-4ab9-89d9-e816e94bf51d).

> **تمرين برمجي: مجموع تعاودي**
>
> يُرجى كتابة دالة تعاودية باسم `recursive_sum(number: int)` تحسب المجموع `1 + 2 + ... + number`. ويحتوي قالب التمرين على الهيكل التالي:

```python
def recursive_sum(number: int):
    # if the number is 1, there is nothing else to add
    if number <= 1:
        return number

    # fill in the rest of the function
```

بعض الأمثلة:

```python
result = recursive_sum(3)
print(result)

print(recursive_sum(5))
print(recursive_sum(10))
```


```
6
15
55
```


> **تمرين برمجي: موازنة جميع الأقواس**
>
> يحتوي قالب التمرين على الدالة `balanced_brackets` التي تأخذ سلسلة نصية بوصفها وسيطًا لها. وهي تتحقق مما إذا كانت الأقواس _الدائرية_، أي الأقواس الهلالية، داخل السلسلة النصية متوازنة. أي أنه مقابل كل قوس فتح `(` ينبغي أن يكون هناك قوس إغلاق `)`، وأن تُطابَق كل أزواج الأقواس بالترتيب، بمعنى أنه لا يجوز تقاطع أزواج الأقواس.

```python
def balanced_brackets(my_string: str):
    if len(my_string) == 0:
        return True
    if not (my_string[0] == '(' and my_string[-1] == ')'):
        return False

    # remove first and last character
    return balanced_brackets(my_string[1:-1])

ok = balanced_brackets("(((())))")
print(ok)

# there is one closing bracket too many, so this produces False
ok = balanced_brackets("()())")
print(ok)

# this one starts with a closing bracket, False again
ok = balanced_brackets(")()")
print(ok)

# this produces False because the function only handles entirely nested brackets
ok = balanced_brackets("()(())")
print(ok)
```


```
True
False
False
False
```


يُرجى توسيع الدالة بحيث تعمل أيضًا مع الأقواس المعقوفة `[]`. وينبغي أن تتجاهل الدالة كذلك كل المحارف التي ليست أقواسًا `()` أو `[]`. ويجب أن تُطابَق الأنواع المختلفة من الأقواس بشكل صحيح بالترتيب.

يُرجى الاطلاع على الأمثلة أدناه::

```python
ok = balanced_brackets("([([])])")
print(ok)

ok = balanced_brackets("(python version [3.7]) please use this one!")
print(ok)

# this is no good, the closing bracket doesn't match
ok = balanced_brackets("(()]")
print(ok)

# different types of brackets are mismatched
ok = balanced_brackets("([bad egg)]")
print(ok)
```

ملاحظة: تحتاج الدالة فقط إلى معالجة الأقواس المتداخلة كليًا. وينبغي أن تُنتج السلسلة النصية `(x + 1)(y + 1)` القيمة `False` لأن الأقواس غير متداخلة إحداها داخل الأخرى.


```
True
True
False
False
```


## البحث الثنائي

في البحث الثنائي تكون لدينا قائمة مرتّبة من العناصر ونحاول العثور على عنصر معيّن داخلها. ويمكن أن يكون ترتيب العناصر، على سبيل المثال، أعدادًا من الأصغر إلى الأكبر، أو سلاسل نصية من الأول أبجديًا إلى الأخير. ولا تهمّ طريقة الترتيب، ما دامت معروفة وذات صلة بالعنصر الذي نحاول العثور عليه.

تقوم فكرة البحث الثنائي على النظر دائمًا إلى العنصر الواقع في منتصف القائمة تمامًا. وعندها تكون لدينا ثلاث حالات محتملة. فإذا كان العنصر الواقع في المنتصف
- هو العنصر الذي نبحث عنه: يمكننا إرجاع إشارة إلى أننا وجدنا العنصر
- أصغر من العنصر الذي نبحث عنه: يمكننا إعادة البحث في النصف الأكبر من القائمة
- أكبر من العنصر الذي نبحث عنه: يمكننا إعادة البحث في النصف الأصغر من القائمة.

وإذا كانت القائمة فارغة، يمكننا أن نستنتج أن العنصر لم يُوجد، وأن نُرجع إشارة إلى ذلك.

في الصورة التالية يمكننا أن نرى كيف يتقدّم البحث الثنائي وهو يبحث عن العدد 24:

![11_3_1.png](/images/mooc/part-11/11_3_1.png)

وهذه خوارزمية تعاودية للبحث الثنائي:

```python
def binary_search(target: list, item: int, left : int, right : int):
    """ The function returns True if the item is contained in the target list, False otherwise """
    # If the search area is empty, item was not found
    if left > right:
        return False

    # Calculate the centre of the search area, integer result
    centre = (left+right)//2

    # If the item is found at the centre, return
    if target[centre] == item:
        return True

    # If the item is greater, search the greater half
    if target[centre] < item:
        return binary_search(target, item, centre+1, right)
    # Else the item is smaller, search the smaller half
    else:
        return binary_search(target, item, left, centre-1)


if __name__ == "__main__":
    # Test your function
    target = [1, 2, 4, 5, 7, 8, 11, 13, 14, 18]
    print(binary_search(target, 2, 0, len(target)-1))
    print(binary_search(target, 13, 0, len(target)-1))
    print(binary_search(target, 6, 0, len(target)-1))
    print(binary_search(target, 15, 0, len(target)-1))
```


```
True
True
False
False
```


تأخذ الدالة `binary_search` أربعة وسائط: القائمة الهدف، والعنصر المبحوث عنه، والحدّين الأيسر والأيمن لمنطقة البحث. وعند استدعاء الدالة أول مرة تغطي منطقة البحث القائمة الهدف بأكملها. ويقع الحدّ الأيسر عند الفهرس `0` والحدّ الأيمن عند الفهرس `len(target)-1`. وتحسب الدالة الفهرس المركزي وتفحص ذلك الموضع في القائمة. فإما أن يكون العنصر قد وُجد، وإما أن يستمر البحث في النصف الأصغر أو الأكبر من القائمة الهدف.

لنقارن هذا ببحث خطّي بسيط. في البحث الخطّي تُجتاز منطقة البحث من البداية فصاعدًا، حتى إما العثور على العنصر، وإما نفاد منطقة البحث. وينمو عدد الخطوات اللازمة لتغطية منطقة البحث بأكملها _خطيًا_ بالوتيرة نفسها التي ينمو بها حجم منطقة البحث. وتغطي كل خطوة بحث مرشّحًا واحدًا فقط من بداية منطقة البحث. ولنفترض أن العنصر المبحوث عنه _لم_ يُوجد. فإذا كانت منطقة البحث بطول مليون عنصر، فسيتعيّن علينا اتخاذ مليون خطوة بحث للتأكد من أن العنصر ليس في منطقة البحث.

أما في البحث الثنائي، في المقابل، فينمو عدد الخطوات اللازمة _لوغاريتميًا_. ولنفترض مرة أخرى أن العنصر المبحوث عنه _لم_ يُوجد. فتُقسَّم منطقة البحث إلى نصفين مع كل خطوة، لأننا نعلم أن العنصر إما أصغر وإما أكبر من مرشّح البحث الحالي في المنتصف. و2 مرفوعًا إلى القوة 20 (2^20) يتجاوز المليون بكثير، لذا سيلزم على الأكثر 20 خطوة لتغطية منطقة البحث بأكملها بالبحث الثنائي. ومن ثم، حين نتعامل مع مناطق بحث مرتّبة، كما نفعل كثيرًا عند التعامل مع الحواسيب والمواد المعدّة للمعالجة الآلية، يكون البحث الثنائي أكفأ بكثير من البحث الخطّي.
