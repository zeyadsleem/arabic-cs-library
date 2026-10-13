---
title: "الأوقات والتواريخ"
lang: ar
source: "https://programming-26.mooc.fi/part-7/3-times-and-dates"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستعرف كيف تتعامل مع التواريخ والأوقات في كود Python
- ستتمكن من إنشاء واستخدام كائنات `datetime`
- ستعرف كيف تقارن وتحسب الفروقات بين تاريخين أو وقتين

</text-box>

## كائن datetime

وحدة Python [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) تتضمن دالة [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now)، التي تعيد كائن datetime يحتوي على التاريخ والوقت الحاليين. الطباعة الافتراضية لكائن datetime تبدو هكذا:

```python
from datetime import datetime

my_time = datetime.now()
print(my_time)
```


```
2021-10-19 08:46:49.311393
```


يمكنك أيضاً تعريف الكائن بنفسك:

```python
from datetime import datetime

my_time = datetime(1952, 12, 24)
print(my_time)
```


```
1952-12-24 00:00:00
```


افتراضياً، الوقت يضبط على منتصف الليل، لأننا لم نعط وقتاً من اليوم في المثال أعلاه.

يمكن الوصول لعناصر مختلفة من كائن datetime بالطريقة التالية:

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


يمكن أيضاً تحديد وقت من اليوم. الدقة يمكن أن تختلف، كما ترى أدناه:

```python
from datetime import datetime

pv1 = datetime(2021, 6, 30, 13)     # 30.6.2021 at 1PM
pv2 = datetime(2021, 6, 30, 18, 45) # 30.6.2021 at 6.45PM
```

## مقارنة الأوقات وحساب الفروقات بينها

عاملو المقارنة المألوفون يعملون أيضاً على كائنات datetime:

```python
from datetime import datetime

time_now = datetime.now()
midsummer = datetime(2021, 6, 26)

if time_now < midsummer:
    print("It is not yet Midsum... (truncated in source)
