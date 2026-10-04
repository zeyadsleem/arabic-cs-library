---
book: mit-6100l
chapter: lecture-01
slug: exercises
lang: ar
title: "المحاضرة 1: التمرين القصير والحل والشيفرة الأصلية"
---

# المحاضرة 1: التمرين القصير (Finger Exercise)

المصادر: [نص التمرين في صفحة المحاضرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-1-introduction/)، [ملف الحل الرسمي، PDF](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex01_sol.pdf)، [ملف شيفرة المحاضرة الأصلي، Python](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec01_code.py).

إعداد الأصل: **آنا بيل (Ana Bell)، MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا**؛ مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022 (Fall 2022)**. هذه ترجمة وتكييف عربيان غير رسميين، ولا يعنيان اعتماد MIT أو تأييده لهما. الأصل وهذا التكييف متاحان للاستخدام غير التجاري بموجب [CC BY-NC-SA 4.0: نسب المصنف–غير تجاري–الترخيص بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، باستثناء مواد الأطراف الثالثة المستثناة صراحةً في الأصل.

## صفحة المصدر 1: التمارين القصيرة للمحاضرة 1

موعد تسليم الأسئلة أدناه هو الاثنين 12 سبتمبر 2022، الساعة 03:00:00 مساءً.

### 1) السؤال 1 من 1

افترض أن ثلاثة متغيرات معرّفة لك مسبقًا: `a` و`b` و`c`. أنشئ متغيرًا اسمه `total` يجمع `a` و`b` ثم يضرب الناتج في `c`. أدرج سطرًا أخيرًا في شيفرتك لطباعة القيمة: `print(total)`.

يظهر في محرر الإجابة السطر رقم 1؛ التعليق الأصلي محفوظ كما هو:

```python
# Write your code here
```

لديك عدد لا نهائي من محاولات التسليم المتبقية.

هذا هو الحل الذي كتبناه:

```python
total = (a+b)*c
print(total)
```

## صفحة المصدر 2: بيانات النشر

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو شروط الاستخدام، زُر: https://ocw.mit.edu/terms

## ملف شيفرة المحاضرة 1 كاملًا دون تعديل

**ملاحظة المترجم:** الكتلة التالية نسخة حرفية من ملف Python الرسمي، بما فيها التعليقات الإنجليزية والأسطر الفارغة والمسافات وعلامات الجدولة. المثال الموسوم بأنه معيب بقي كما هو لأنه تمرين لتصحيح الأخطاء (Debugging)، لا حل بديل من المترجم.

```python
## TYPE THIS IN THE CONSOLE - CHECK THE TYPE OF OBJECTS ##
type(5)
type(3.0)

## TYPE THIS IN THE CONSOLE - CONVERT TO ANOTHER TYPE ##
float(3)
int(3.9)
round(3.9)

## TYPE THIS IN THE CONSOLE - EXPRESSIONS ##
3+2
(4+2)*6-1
type((4+2)*6-1)
float((4+2)*6-1)

## TYPE THIS IN THE CONSOLE - VARIABLES ##
pi = 355/113

#Compute approximate value for pi
pi = 355/113
radius = 2.2
area = pi*(radius**2)
circumference = pi*(radius*2)

## CODE STYLE ##

# Example 1
#do calculations
a = 355/113 *(2.2**2)
c = 355/113 *(2.2*2)

# Example 2
p = 355/113
r = 2.2
#multiply p with r squared
a = p*(r**2)
#multiply p with r times 2
c = p*(r*2)

#Example 3
#calculate area and circumference of a circle using an approximation for pi
pi = 355/113
radius = 2.2
area = pi*(radius**2)
circumference = pi*(radius*2)

## CHANGING BINDINGS ##
pi = 3.14
radius = 2.2
area = pi*(radius**2)
radius = radius+1


## DEBUG THIS - SWAP VALUES ##
# Given x and y below, the code incorrectly swaps the values. Fix it!
x = 1			
y = 2
#Buggy example
y = x
x = y
#Fix it here!



###############################
###### COMMENTING LINES #######
###############################
## to comment MANY lines at a time, highlight all of them then CTRL+1
## do CTRL+1 again to uncomment them
## try it on the next few lines below!

# pi = 355/113
# radius = 2.2
# area = pi*(radius**2)
# circumference = pi*(radius*2)

###############################
###### AUTOCOMPLETE #######
###############################
## Spyder can autocomplete names for you (in console or the editor)
## start typing a variable name defined in your program and hit tab 
## before you finish typing -- try it below

## define a variable
#a_very_long_variable_name_dont_name_them_this_long_pls = 0

## start typing a_ve then hit tab... cool, right!
## use autocomplete to change the value of that variable to 1

## use autocomplete to show the type of the value of that long variable
## notice that Spyder also automatically adds the closed parentheses for you!
```

المقرر الأصلي: [6.100L، خريف 2022](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/).
