---
title: "الحلقات ذات الشروط"
lang: ar
source: "https://programming-26.mooc.fi/part-3/1-loops-with-conditions"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to create a while loop with a condition
- You will know what roles initialisation, formulating a condition and updating variables perform in a loop
- You will be able to create loops with different kinds of conditions

</text-box>

<!--the same text is in sections 3-1, 5-1 and 6-1, check them all if you're changing this-->
<text-box variant='hint' name="About the exercises on this course">

Becoming a proficient programmer requires a lot of practice, sometimes even quite mechanical practice. It also involves developing problem solving skills and applying intuition. This is why there are a lot of exercises of different kinds on this course. Some of them ask you to quite straightforwardly apply what you have learnt in the material, but some of them are intentionally more challenging and open-ended.

Some of the exercises might at first seem overwhelming, but this is nothing to worry about. None of the exercises is strictly mandatory, and in fact _you need only 25 % of the points from each part to pass the course._ You can find more details about passing the course on the [page on grading](/grading-and-exams).

**The exercises are not in any specific order of difficulty.** Each section usually introduces some new programming concepts, and these are then practised with both simpler and more complicated exercises. **If you come across an exercise that feels too difficult, move on to the next one.** You can always come back to the more difficult exercises if you have time later.

When the going inevitably gets tough, a word of consolation: a task that seems impossibly difficult this week will likely feel rather easy in about four weeks' time.

</text-box>

في القسم السابق تعلمنا استخدام حلقة `while True` لتكرار أقسام الكود. في هذا البناء شرط الحلقة هو `True`، لذا الشرط يتحقق في كل مرة. كنا بحاجة لكسر الحلقة بشكل صريح في كل مرة لتجنب حلقة لا نهائية. على سبيل المثال:

```python
# Print numbers until the variable a equals 5
a = 1
while True:
    print(a)
    a += 1
    if a == 5:
        break
```

```
1
2
3
4
```

بالطبع، الشرط لا يجب أن يكون دائماً `True`، بل يمكن استخدام أي تعبير بولياني (Boolean expression) كشرط. البنية العامة لجملة `while` كالتالي:

```python
while <condition>:
    <block>
```

الفكرة هنا هي أن التنفيذ يذهب ذهاباً وإياباً، يتحقق مما إذا كان الشرط صحيحاً وينفذ الكود داخل الكتلة، مراراً وتكراراً. إذا كان الشرط في أي نقطة خاطئاً، يستمر تنفيذ البرنامج من السطر التالي بعد كتلة `while`.

<img src="3_1_1.png">

في الحلقة التالية لدينا الشرط `number < 10`. الكتلة داخل الحلقة يتم تنفيذها فقط إذا كان المتغير number أقل من 10.

```python
number = int(input("Please type in a number: "))

while number < 10:
    print(number)
    number += 1

print("Execution finished.")
```

هذا قد يطبع:

```
Please type in a number: **4**
4
5
6
7
8
9
Execution finished.
```

في هذه البنية يتم التحقق من الشرط دائماً قبل تنفيذ الكتلة داخل الحلقة. قد يحدث أن الكتلة لا يتم تنفيذها أبداً، كالتالي:

```
Please type in a number: **12**
Execution finished.
```

12 ليس أقل من 10، لذا البرنامج لا يطبع أي رقم.

## التهيئة، الشرط، والتحديث (Initialisation, condition and update)

لإنشاء حلقة ستحتاج غالباً إلى تضمين ثلاث خطوات متميزة: التهيئة (initialisation)، الشرط (condition)، وتحديث متغيرات التكرار (updating the iteration variables).

_التهيئة_ تشير إلى تعيين القيمة/القيم الأولية للمتغير/المتغيرات المستخدمة داخل شرط الحلقة. تسمى هذه غالباً بمتغيرات التكرار (iteration أو iterator variables). يتم هذا قبل دخول الحلقة لأول مرة. _الشرط_ يحدد المدة التي ستنفذ فيها الحلقة. يتم تحديده في بداية الحلقة مباشرة. أخيراً، داخل كل تكرار من الحلقة يتم _تحديث_ المتغيرات المتضمنة في الشرط، بحيث كل تكرار يقرب الحلقة خطوة نحو نهايتها. الصورة التالية توضح هذه الخطوات:

<!--- this is here in case the following image needs to be updated
```python
# Ask the user for a number
number = int(input("Please type in a number: "))

# Repeat while the number is less than 10
while number < 10:

    # Print out and increment
    print(number)
    number += 1

print("Execution finished.")
```
-->
<img src="3_1_2.png">

إذا كان أي من هذه المكونات الثلاثة مفقوداً، فستعمل الحلقة على الأرجح بشكل غير صحيح. خطأ نموذجي هو إغفال خطوة التحديث:

```python
number = 1

while number < 10:
    print(number)

print("Execution finished.")
```

هنا، قيمة المتغير `number` لا تتغير أبداً. البرنامج عال في حلقة لا نهائية، ونفس الكود بالتحديد يتكرر مراراً وتكراراً حتى يوقف المستخدم التنفيذ، على سبيل المثال بالضغط على `Control` + `C`:

```
1
1
1
1
1
(continued ad infinitum...)
```
