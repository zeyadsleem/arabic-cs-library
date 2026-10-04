---
book: mit-6100l
chapter: lecture-03
slug: exercises
lang: ar
title: "المحاضرة 3: التمرين القصير وحلّه والشيفرة الأصلية"
---

# المحاضرة 3: التمرين القصير وحلّه والشيفرة الأصلية

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة المحاضرة ونص التمرين الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-3-iteration/).
- [صفحة حلول التمرين الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex03_sol_pdf/).
- [ملف الحل الرسمي، PDF](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex03_sol.pdf).
- [صفحة شيفرة المحاضرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec03_code_py/).
- [ملف الشيفرة الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec03_code.py).

هذه ترجمة وتكييف عربي غير رسمي، وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تمثل اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/). نُقلت الشيفرة الأصلية أدناه دون ترجمة تعليقاتها أو تغيير مسافاتها؛ لم تُشغَّل.

## صفحة المصدر 1: التمارين القصيرة للمحاضرة 3

موعد تسليم الأسئلة أدناه: **الاثنين 19 سبتمبر 2022، الساعة 03:00:00 مساءً**.

### 1) السؤال 1 من 1

افترض أن لديك متغيرًا لعدد صحيح موجب (Positive Integer) اسمه `N`. اكتب مقطعًا من شيفرة Python يطبع `hello world` على أسطر منفصلة، `N` مرات. يمكنك استخدام حلقة (Loop) `while` أو حلقة `for`.

سطر محرر الإجابة الأصلي، ورقمه 1:

```python
# Write your code here
```

لديك عدد غير محدود من محاولات الإرسال المتبقية.

هذا هو الحل الذي كتبناه:

```python
for i in range(N):
    print('hello world')
```

## صفحة المصدر 2: بيانات المقرر

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.

للحصول على معلومات عن الاستشهاد بهذه المواد أو شروط استخدامها، تفضل بزيارة https://ocw.mit.edu/terms.

## ترجمة تعليمات ملف شيفرة المحاضرة

**ملاحظة المترجم:** هذه ترجمة للنصوص الإرشادية في الملف، وليست تعديلًا لتعليقاته في النسخة الحرفية أدناه.

يمكنك إزالة التعليق عن كل مثال ومحاولة تشغيله بنفسك. لإضافة التعليق إلى مجموعة أسطر أو إزالته عنها، حدد الأسطر ثم اضغط `CTRL+1` على Windows أو `CMD+1` على Mac.

يتضمن الملف أمثلة حلقات `while`، وشيفرة مسلية للغابة الضائعة لتجربتها بنفسك، ومثالًا يطبع `x`، وتمرين حلقة لانهائية (Infinite Loop) ينبغي الحذر منه. لإيقافه، انقر نافذة الصدفة (Shell) واضغط `CTRL+c` أو المربع الأحمر في أعلاها.

تمرين «جرّب بنفسك» الأول: وسّع الشيفرة لعرض وجه حزين حين يدخل المستخدم حلقة `while` أكثر من مرتين. تلميح: استخدم عدّادًا (Counter). تتبعه أمثلة عدّاد باستخدام `while` ثم `for`، والمضروب (Factorial) بالحَلقتين، وتجربة النطاقات `range(1,4,1)` و`range(1,4,2)` و`range(4,0,-1)`، وأمثلة المجموع (Sum).

تمرين «جرّب بنفسك» الآخر: أصلح الشيفرة لتستخدم المتغيرين `start` و`end` في النطاق (Range)، وتحصل على مجموع القيم الواقعة بينهما بما يشمل الطرفين.

### تدريب منزلي 1

عرّف متغيرًا `x` يخزن عددًا صحيحًا أكبر من `0`. اطبع جميع الأعداد الصحيحة القابلة للقسمة على `5` بين `1` شاملًا و`x` شاملًا، كل عدد على سطر منفصل. مثلًا، إذا كان `x = 15` تُطبع `5` و`10` و`15`؛ وإذا كان `x = 14` تُطبع `5` و`10`.

### تدريب منزلي 2

عرّف متغيرًا `n` يخزن عددًا صحيحًا. اطبع مجموع كل الأرقام (Digits) فيه. تلميح: يمكنك الحصول على رقم واحد كل مرة بالنظر إلى الباقي (Remainder) عند قسمة `n` على `10`. مثلًا، إذا كان `x = 1234`، اطبع `10`؛ ورد اسم `x` هنا في تعليق المصدر مع أن المتغير المطلوب اسمه `n`.

يضم الملف حلول التدريبين المنزليين، وحلّي تمريني المحاضرة: عدّاد الوجه الحزين، ومجموع الطرفين باستخدام `end+1`. جميعها محفوظة كاملة بالتعليقات الأصلية في النسخة التالية.

## ملف Python الأصلي كاملًا، دون تغيير

```python
###################
# Tou can uncomment each of these examples
# and try running them yourself

# To batch comment/uncomment, select the lines and then
# on Windows hit CTRL+1 or on Mac hit CMD+1
###################



###################
# EXAMPLE: while loops 
####################
# where = input("You are in the Lost Forest. Go left or right? ")
# while where == "right":
#     where = input("You are in the Lost Forest. Go left or right? ")
# print("You got out of the Lost Forest! \o/")



###########################################

# Fun Lost Forest code, run it on your own!
#where = input("You are in the Lost Forest\n****************\n****************\n :)\n****************\n****************\nGo left or right? ")
#while where.lower() == "right":
#    where = input("You are in the Lost Forest\n****************\n******       ***\n  (╯°□°）╯\n     ︵ \n    ┻━┻\n****************\n****************\nGo left or right? ")
#print("\nYou got out of the Lost Forest!\n\o/")

    
###########
## EXAMPLE    
###########
# n = int(input('Please enter a non-negative integer: '))
# while n > 0:
#     print('x')
#     n = n-1  # the same as n -= 1
    

################ YOU TRY IT ###################
## EXAMPLE: infinite loop, be careful!
# To stop it, click the shell and hit CTRL+c or 
# the red square at the top of the shell
##############################################
# while True:
#     print("noooooooo")



############### YOU TRY IT ################
# Expand this code to show a sad face when the user entered 
# the while loop more than 2 times. Hint: use a counter
###################
# where = input("Go left or right? ")
# while where == "right":
#     where = input("Go left or right? ")
# print("You got out!")



#############
## EXAMPLE: counter
#############

## With while loop
# n = 0
# while n < 5:
#     print(n)
#     n = n+1

## With for loop
#for n in range(5):
#    print(n)

###########
## EXAMPLE: factorial
###########

## With while loops
# x = 6
# i = 1
# factorial = 1
# while i <= x:
#     factorial *= i
#     i += 1
# print(f'{x} factorial is {factorial}')

## With for loops
# factorial = 1
# for i in range(1, x+1, 1):
#     factorial *= i
# print(f'{x} factorial is {factorial}')


################ YOU TRY IT ################
# for i in range(1,4,1):
#     print(i)
# for j in range(1,4,2):
#     print(j*2)
# for me in range(4,0,-1):
#     print("$"*me)


###########################################

###############
## EXAMPLE: sum
###############

#mysum = 0
#for i in range(10):
#    mysum += i
#print(mysum)

######

#mysum = 0
#for i in range(7, 10):
#    mysum += i
#print(mysum)

######

#mysum = 0
#for i in range(5, 11, 2):
#    mysum += i
#    if mysum == 5:
#        break
#        mysum += 1
#print(mysum)

################ YOU TRY IT ################
# Fix this code to use variables start and end in the 
# range, to get the total sum between and including those values. 

# mysum = 0
# start = 3
# end = 5
# for i in range(start, end):
#     mysum += i
# print(mysum)

###########################################



#########################################################
##################### AT HOME ###########################
#########################################################

# Practice 1: 
# Declare a variable x that stores an int > 0. Print all ints, one on each
# line, between 1 (inclusive) and x (inclusive) that are divisible by 5.
# For ex. if x = 15, it prints 5, 10, and 15. 
# For ex. if x = 14, it prints 5 and 10.


# Practice 2:
# Declare a variable n that stores an int. Print the sum of all digits 
# in n. Hint: you can get a digit at a time looking at the remainder 
# when you divide n by 10.
# For ex. If x = 1234, print 10
 



#########################################################
##################### END AT HOME ###########################
#########################################################


#########################################################
##################### ANSWERS AT HOME ###########################
#########################################################

# Practice 1: 
# Declare a variable x that stores an int > 0. Print all ints, one on each
# line, between 1 (inclusive) and x (inclusive) that are divisible by 5.
# For ex. if x = 15, it prints 5, 10, and 15. If x = 14, it prints 5 and 10.

# x = 15
# for i in range(1,x+1):
#     if i%5 == 0:
#         print(i)


# Practice 2:
# Declare a variable n that stores an int. Print the sum of all digits 
# in n. Hint: you can get a digit at a time looking at the remainder 
# when you divide n by 10.
# For ex. If x = 1234, print 10
# n = 1234
# total = 0
# while True:
#     r = n%10
#     total += r 
#     n = n//10
#     if n == 0:
#         break
# print(total)

#########################################################
##################### END ANSWERS AT HOME ###########################
#########################################################




#########################################
############### ANSWERS TO LECTURE ##########################
#########################################
# You Try It 1: 
# Expand this code to show a sad face when the user entered 
# the while loop more than 2 times. Hint: use a counter
###################
# where = input("Go left or right? ")
# counter = 0
# while where == "right":
#     counter = counter + 1
#     if counter > 2:
#         print(":(")
#     where = input("Go left or right? ")
# print("You got out!")



# Your Try It 2: 
# Fix this code to use variables start and end in the 
# range, to get the total sum between and including those values. 

# mysum = 0
# start = 1
# end = 3
# for i in range(start, end+1):
#     mysum += i
# print(mysum)

#########################################
############### END ANSWERS TO LECTURE ##########################
#########################################
```
