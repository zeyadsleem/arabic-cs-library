---
title: "نطاق الدوال (Scope of methods)"
lang: ar
source: "https://programming-26.mooc.fi/part-9/4-scope-of-methods"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستعرف كيف يمكنك تقييد رؤية دالة (method) في Python
- ستكون قادراً على كتابة دوال خاصة (private methods)

</text-box>

يمكن إخفاء الدوال المعرفة داخل فئة بالطريقة نفسها التي أُخفيت بها السمات (attributes) في القسم السابق. إذا بدأت الدالة بشرطتين سفليتين `__`، فلن تكون قابلة للوصول مباشرة من قبل العميل (client).

إذن، التقنية هي نفسها لكل من الدوال والسمات، لكن حالات الاستخدام عادةً ما تكون مختلفة قليلاً. السمات الخاصة غالباً ما تأتي مقترنة بدوال مسترجعة (getter) ومُعيّنة (setter) للتحكم في الوصول إليها. الدوال الخاصة، من ناحية أخرى، عادة ما تكون مخصصة للاستخدام الداخلي فقط، كدوال مساعدة (helper methods) لعمليات لا يحتاج العميل إلى معرفتها.

يمكن استخدام دالة خاصة داخل الفئة مثل أي دالة أخرى، بالطبع مع تذكر تضمين البادئة `self`. فيما يلي فئة بسيطة تمثل مستلم رسائل البريد الإلكتروني. تتضمن دالة مساعدة خاصة للتحقق من أن عنوان البريد الإلكتروني بتنسيق صالح:

```python
class Recipient:
    def __init__(self, name: str, email: str):
        self.__name = name
        if self.__check_email(email):
            self.__email = email
        else:
            raise ValueError("The email address is not valid")

    def __check_email(self, email: str):
        # فحص بسيط: يجب أن يكون العنوان أطول من 5 حروف 
        # وأن يحتوي على نقطة وحرف @
        return len(email) > 5 and "." in email and "@" in email
```

محاولة استدعاء الدالة الخاصة مباشرة تسبب خطأ:

```python
peter = Recipient("Peter Emailer", "peter@example.com")
peter.__check_email("someone@example.com")
```


```
AttributeError: 'Recipient' object has no attribute '__check_email'
```


داخل الفئة يمكن الوصول إلى الدالة بشكل طبيعي، ومن المنطقي استخدامها أيضاً للمُعيّنات (setters)...
