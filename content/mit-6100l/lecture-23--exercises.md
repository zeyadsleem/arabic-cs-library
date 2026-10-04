---
book: mit-6100l
chapter: lecture-23
slug: exercises
lang: ar
title: "تمارين المحاضرة 23 وحلولها: فئات التعقيد"
---

# التمارين القصيرة للمحاضرة 23 وحلولها

**المصادر الأصلية:** [أسئلة صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-23-complexity-classes-examples/)، و[ملف الأسئلة والحلول الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex23_sol.pdf).

**النسبة والترخيص:** آنا بيل (Ana Bell)، مقرر 6.100L، خريف 2022، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare. هذه ترجمة وتكييف عربي غير رسمي للاستخدام غير التجاري، وليست معتمدة من MIT؛ تخضع المواد الأصلية المشمولة والترجمة لرخصة [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). لا تشمل الرخصة الافتراضية مواد الأطراف الثالثة المستثناة.

موعد تسليم الأسئلة أدناه في المقرر الأصلي: الاثنين 5 ديسمبر 2022، الساعة 03:00:00 مساءً.

> **ملاحظة المترجم:** عولج تشوه حروف استخراج PDF بالرجوع إلى أسئلة الصفحة الرسمية. الكود، بما فيه سلاسل التوثيق (Docstrings)، محفوظ كما نُشر في الصفحة؛ لم تُترجم النصوص داخل كود Python. عبارة «حدًّا علويًّا وحدًّا سفليًّا» تطلب رتبة ثيتا (Theta)، لا مجرد حد أوه الكبرى (Big-Oh).

## 1) السؤال 1 من 3

اختر رتبة النمو التقاربية (Asymptotic Order of Growth) في أسوأ حالة، حدًّا علويًّا وحدًّا سفليًّا، للدالة التالية. افترض أن `n = a`.

```python
def running_product(a):
    """ a is an int """
    product = 1
    for i in range(5,a+5):
        product *= i
        if product == a:
            return True
    return False
```

عدد المحاولات المتبقية لإرسال الإجابة غير محدود.

**الحل المنشور:** $\Theta(n)$.

## 2) السؤال 2 من 3

اختر رتبة النمو التقاربية في أسوأ حالة، حدًّا علويًّا وحدًّا سفليًّا، للدالة التالية. افترض أن `n = len(L)`.

```python
def tricky_f(L, L2):
    """ L and L2 are lists of equal length """
    inL = False
    for e1 in L:
        if e1 in L2:
            inL = True
    inL2 = False
    for e2 in L2:
        if e2 in L:
            inL2 = True
    return inL and inL2
```

عدد المحاولات المتبقية لإرسال الإجابة غير محدود.

**الحل المنشور:** θ(`n**2`)؛ أي $\Theta(n^2)$.

## 3) السؤال 3 من 3

اختر رتبة النمو التقاربية في أسوأ حالة، حدًّا علويًّا وحدًّا سفليًّا، للدالة التالية.

```python
def sum_f(n):
    """ n > 0 """
    answer = 0
    while n > 0:
        answer += n%10
        n = int(n/10)
    return answer
```

عدد المحاولات المتبقية لإرسال الإجابة غير محدود.

**الحل المنشور:** $\Theta(\log n)$.

## صفحة النسبة في الأصل

MIT OpenCourseWare — <https://ocw.mit.edu>.

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام: <https://ocw.mit.edu/terms>.
