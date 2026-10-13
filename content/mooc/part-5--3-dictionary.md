---
title: "القاموس (Dictionary)"
lang: ar
source: "https://programming-26.mooc.fi/part-5/3-dictionary"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستكون مألوفاً مع بنية بيانات القاموس
- ستتمكن من استخدام قاموس مع أنواع مختلفة من المفاتيح والقيم
- ستعرف كيف تعبر (traverse) محتويات القاموس
- ستتمكن من تسمية بعض حالات الاستخدام النموذجية للقواميس

</text-box>

يمكن أن تكون القوائم مفيدة في مواقف كثيرة، لكنها محدودة بكون العناصر تُصل عبر الفهارس (indexes)؛ 0، 1، 2، وهكذا. إذا أردت العثور على عنصر في قائمة، فإما أن تعرف فهارسه، أو في أسوأ الحالات، تعبر القائمة بالكامل.

بنية بيانات مركزية أخرى في Python هي _القاموس_ (dictionary). في القاموس، تُفهرس العناصر بـ _المفاتيح_ (keys). كل مفتاح يربط بـ _قيمة_ (value). القيم المخزنة في القاموس يمكن الوصول إليها وتغييرها باستخدام المفتاح.

## استخدام القاموس

يوضح المثال التالي كيف تعمل بنية بيانات القاموس. إليك قاموس بسيط من الفنلندية إلى الإنجليزية:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

print(len(my_dictionary))
print(my_dictionary)
print(my_dictionary["apina"])
```


```
3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey
```


الترميز `{}` ينشئ قاموساً فارغاً، يمكننا الآن إضافة محتوى إليه. تتم إضافة ثلاثة أزواج مفتاح-قيمة: `"apina"` يربط بـ `"monkey"`، `"banaani"` يربط بـ `"banana"`، و `"cembalo"` يربط بـ `"harpsichord"`. أخيراً، يُطبع عدد أزواج المفتاح-القيمة في القاموس، مع القاموس بأكمله، والقيمة المرتبطة بالمفتاح `"apina"`.

بعد تعريف القاموس، يمكننا أيضاً استخدامه مع إدخال المستخدم:

```python
word = input("Please type in a word: ")
if word in my_dictionary:
    print("Translation: ", my_dictionary[word])
else:
    print("Word... (truncated in source)
