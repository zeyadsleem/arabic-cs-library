---
title: "الأوقات والتواريخ"
lang: ar
source: "https://programming-26.mooc.fi/part-7/3-times-and-dates"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف كيف تتعامل مع التواريخ والأوقات في شيفرة Python
> - ستكون قادرًا على إنشاء كائنات `datetime` واستخدامها
> - ستعرف كيف تقارن بين تاريخين أو وقتين وتحسب الفروق بينهما


## كائن datetime

تتضمّن وحدة [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) في Python الدالة [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now)، التي تُعيد كائن datetime يحتوي على التاريخ والوقت الحاليين. ويبدو الطبع الافتراضي لكائن datetime هكذا:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time)
```


```
2021-10-19 08:46:49.311393
```


ويمكنك أيضًا تعريف الكائن بنفسك:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print(my_time)
```


```
1952-12-24 00:00:00
```


وبشكل افتراضي، يُضبط الوقت على منتصف الليل، لأننا لم نُعطِ وقتًا من اليوم في المثال أعلاه.

ويمكن الوصول إلى العناصر المختلفة لكائن datetime على النحو التالي:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print("Day:", my_time.day)
print("Month:", my_time.month)
print("Year:", my_time.year)
```


```
Day: 24
Month: 12
Year: 1952
```


ويمكن أيضًا تحديد وقت من اليوم. وقد تتفاوت الدقة، كما ترى أدناه:

```python
from datetime import datetime

pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 at 1PM
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 at 6.45PM
```

## مقارنة الأوقات وحساب الفروق بينها

تعمل مشغّلات المقارنة المألوفة أيضًا على كائنات datetime:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("It is not yet Midsummer")
elif time_now == midsummer:
    print("Happy Midsummer!")
elif time_now > midsummer:
    print("It is past Midsummer")
```


```
It is past Midsummer
```


ويمكن حساب الفرق بين كائني datetime ببساطة بمشغّل الطرح:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

difference = midsummer - time_now
print("Midsummer is", difference.days, "days away")
```


```
Midsummer is -116 days away
```


ملاحظة: نتيجة طرح كائنات datetime هي كائن [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects). وهو أقل مرونة من كائن `datetime`. فمثلًا، يمكنك الوصول إلى عدد الأيام في كائن `timedelta`، لكن ليس عدد السنوات، لأن طول السنة يتفاوت. ويحتوي كائن `timedelta` على الخصائص `days` و`seconds` و`microseconds`. ويمكن تمرير مقاييس أخرى كوسائط، لكنها ستُحوَّل داخليًّا.

وبالمثل، يتوفّر الجمع بين كائنَي `datetime` و`timedelta`. وستكون النتيجة كائن `datetime` الناتج عند إضافة عدد الأيام المحدّد (أو الأسابيع أو الثواني، إلخ) إلى كائن `datetime`:

```python
from datetime import datetime, timedelta
midsummer = datetime(2021, 6, 26)

one_week = timedelta(days=7)
week_from_date = midsummer + one_week

print("A week after Midsummer it will be", week_from_date)

long_time = timedelta(weeks=32, days=15)

print("32 weeks and 15 days after Midsummer it will be", midsummer + long_time)
```


```
A week after Midsummer it will be 2021-07-03 00:00:00
32 weeks and 15 days after Midsummer it will be 2022-02-20 00:00:00
```


ولنرَ كيف تعمل دقة أعلى:

```python
time_now = datetime.now()
midnight = datetime(2021, 6, 30)
difference = midnight - time_now
print(f"Midnight is still {difference.seconds} seconds away")
```


```
Midnight is still 8188 seconds away
```


> **تمرين برمجي: كم العمر**
>
> يُرجى كتابة برنامج يسأل المستخدم عن تاريخ ميلاده، ثم يطبع كم كان عمره في ليلة الألفية الجديدة. وينبغي أن يسأل البرنامج عن اليوم والشهر والسنة كلًّا على حدة، ويطبع العمر بالأيام. يُرجى الاطلاع على الأمثلة أدناه:


```
Day: **10**
Month: **9**
Year: **1979**
You were 7417 days old on the eve of the new millennium.
```



```
Day: **28**
Month: **3**
Year: **2005**
You weren't born yet on the eve of the new millennium.
```


ويمكنك أن تفترض أن جميع تركيبات اليوم والشهر والسنة المعطاة كوسيط ستكون تواريخ صحيحة. أي أنه لن يكون هناك تاريخ مثل 31 فبراير.


> **تمرين برمجي: هل PIC صالح؟**
>
> في هذا التمرين ستتحقّق من صحة رموز الهوية الشخصية الفنلندية (PIC). 

يُرجى كتابة دالة اسمها `is_it_valid(pic: str)`، تُعيد `True` أو `False` بحسب ما إذا كان رمز الهوية المعطى كوسيط صحيحًا أم لا. تتبع رموز الهوية الفنلندية الصيغة `ddmmyyXyyyz`، حيث يحتوي `ddmmyy` على تاريخ الميلاد، و`X` علامة القرن، و`yyy` المعرّف الشخصي، و`z` محرف التحقّق.

وينبغي أن يتحقّق البرنامج من الصحة بثلاثة معايير:

* النصف الأول من الرمز تاريخ صحيح وموجود بالصيغة `ddmmyy`.
* علامة القرن إما `+` (القرن التاسع عشر) أو `-` (القرن العشرون) أو `A` (القرن الحادي والعشرون).
* محرف التحقّق صحيح.

ويُحسب محرف التحقّق بأخذ العدد المكوّن من تسعة أرقام من تاريخ الميلاد والمعرّف الشخصي، وقسمته على 31، واختيار المحرف عند الفهرس الذي يحدّده الباقي من السلسلة النصية `0123456789ABCDEFHJKLMNPRSTUVWXY`. فمثلًا، إذا كان الباقي 12، فسيكون محرف التحقّق `C`.

وتتوفر أمثلة وشروح إضافية عن استخدامات رموز الهوية الشخصية على موقع [وكالة الخدمات الرقمية والسكانية](https://dvv.fi/en/personal-identity-code).

**ملاحظة مهمة!** يُرجى الحرص على عدم مشاركة رمز هويتك الشخصية، مثلًا في الشيفرة التي تستخدمها للاختبار أو عبر قنوات دعم الدورة.

وفيما يلي بعض رموز الهوية الصحيحة التي يمكنك استخدامها للاختبار:

* 230827-906F
* 120488+246L
* 310823A9877


## تنسيق الأوقات والتواريخ

تحتوي وحدة `datetime` على تابع مفيد هو [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime) لتنسيق التمثيل النصي لكائن datetime. فمثلًا، ستطبع الشيفرة التالية التاريخ الحالي بالصيغة `dd.mm.yyyy`، ثم التاريخ والوقت بصيغة مختلفة:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time.strftime("%d.%m.%Y"))
print(my_time.strftime("%d/%m/%Y %H:%M"))
```


```
19.10.2021
19/10/2021 09:31
```


ويستخدم تنسيق الوقت محارف معيّنة للدلالة على صيغ محدّدة. وفيما يلي قائمة ببعضها (يُرجى الاطلاع على [وثائق](https://docs.python.org/3/library/time.html#time.strftime) Python للحصول على القائمة الكاملة):

الترميز | الدلالة
:--------|:--------
`%d` | اليوم (01–31)
`%m` | الشهر (01–12)
`%Y` | السنة بصيغة أربعة أرقام
`%H` | الساعات بصيغة 24 ساعة
`%M` | الدقائق (00–59)
`%S` | الثواني (00–59)

ويمكنك أيضًا تحديد الفاصل بين العناصر المختلفة، كما ترى في الأمثلة أعلاه.

ويعمل تنسيق datetime في الاتجاه المعاكس أيضًا، في حال احتجت إلى تحليل كائن datetime من سلسلة نصية يوفّرها المستخدم. والتابع [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime) يفعل ذلك بالضبط:

```python
from datetime import datetime

birthday = input("Please type in your birthday in the format dd.mm.yyyy: ")
my_time = datetime.strptime(birthday, "%d.%m.%Y")

if my_time < datetime(2000, 1, 1):
    print("You were born in the previous millennium")
else:
    print("You were born during this millennium")
```


```
Please type in your birthday in the format dd.mm.yyyy: **5.11.1986**
You were born in the previous millennium
```


> **تمرين برمجي: وقت الشاشة**
>
> يُرجى كتابة برنامج لتسجيل مقدار الوقت الذي أمضاه المستخدم أمام شاشة تلفاز أو حاسوب أو جهاز محمول خلال مدة زمنية محدّدة. 

وينبغي أن يعمل البرنامج على النحو التالي:


```
Filename: **late_june.txt**
Starting date: **24.6.2020**
How many days: **5**
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: **60 120 0**
Screen time 25.06.2020: **0 0 0**
Screen time 26.06.2020: **180 0 0**
Screen time 27.06.2020: **25 240 15**
Screen time 28.06.2020: **45 90 5**
Data stored in file late_june.txt
```


وسيُدخل المستخدم كل يوم في سطر مستقل، وستحتوي المُدخلات على ثلاثة أعداد تفصلها مسافات، تمثّل الدقائق.

ومع المُدخل أعلاه، ينبغي أن يخزّن البرنامج البيانات في ملف اسمه `late_june.txt`. وينبغي أن يبدو المحتوى هكذا:


```
Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5
```


<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 6fff0633-2f18-5e2b-9eab-6c8950c8378b)

-->
