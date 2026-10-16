---
title: "المزيد من الإدراكات"
---

> **أهداف التعلّم**
>
> بعد هذا القسم
>
> - ستكون قادرًا على استخدام الإدراكات مع السلاسل النصية
> - ستعرف كيف تستخدم الإدراكات مع أصنافك الخاصة
> - ستكون قادرًا على إنشاء إدراكات القواميس


القوائم هي على الأرجح الهدف الأكثر شيوعًا للإدراكات، لكن الإدراكات تعمل مع أي متتالية من العناصر، بما في ذلك السلاسل النصية. وكما في أمثلة القوائم في القسم السابق، إذا أُجري إدراك قوائم على سلسلة نصية، انتُزعت العناصر (أي المحارف) من السلسلة النصية واحدًا واحدًا، وعُولجت وفقًا للتعبير المعطى، وخُزّنت في قائمة.

```python
name = "Peter Python"

uppercased = [character.upper() for character in name]
print(uppercased)
```


```
['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']
```


والنتيجة قائمة فعلًا، على ما تقتضيه صيغة الأقواس المربّعة حول عبارة الإدراك. ولو أردنا سلسلة نصية بدلًا من ذلك، لأمكننا استخدام تابع السلسلة النصية `join` لتحويل القائمة إلى سلسلة نصية. وتذكّر أن التابع يُنادى على السلسلة النصية التي نريد استخدامها "غراءً" بين المحارف. لنلقِ نظرة على بعض الأمثلة:

```python
name = "Peter"
char_list = list(name)
print(char_list)

print("".join(char_list))
print(" ".join(char_list))
print(",".join(char_list))
print(" and ".join(char_list))
```


```
['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P and e and t and e and r
```


إن إدراكات القوائم والتابع `join` يسهّلان إنشاء سلاسل نصية جديدة استنادًا إلى سلاسل نصية أخرى. فيمكننا مثلًا إنشاء سلسلة نصية لا تحتوي إلا على حروف العلة من سلسلة نصية أخرى:

```python
test_string = "Hello there, this is a test!"

vowels = [character for character in test_string if character in "aeiou"]
new_string = "".join(vowels)

print(new_string)
```


```
eoeeiiae
```


في المثال أعلاه جاء إدراك القوائم والتابع `join` في سطرين منفصلين، لكن كان يمكن دمجهما في تعبير واحد:

```python
test_string = "Hello there, this is a test!"

vowel_string = "".join([character for character in test_string if character in "aeiou"])

print(vowel_string)
```

كثير من مبرمجي Python ممن يفضّلون هذه الأسطر الأحادية، فمن الجدير جدًّا بوقتك أن تتعلّم قراءتها. بل يمكننا حتى أن نضيف التابع `split` إلى الخليط، بحيث نستطيع معالجة جمل كاملة بكفاءة بعبارة واحدة. في المثال أدناه يُحذف المحرف الأول من كل كلمة في جملة:

```python
sentence = "Sheila keeps on selling seashells on the seashore"

sentence_no_initials = " ".join([word[1:] for word in sentence.split()])
print(sentence_no_initials)
```


```
heila eeps n elling eashells n he eashore
```


لنمضِ في هذا خطوة خطوة:

- يستخرج التعبير `word[1:]` سلسلة نصية فرعية بدءًا من المحرف الثاني (عند الفهرس 1) فصاعدًا
- يقسّم التعبير `sentence.split()` الجملة إلى مقاطع عند المحرف المعطى. وفي هذه الحالة لا يُمنح التابع أي وسيط، فتُقسَّم الجملة عند محارف المسافة افتراضيًا
- يدمج التعبير `" ".join()` عناصر القائمة في سلسلة نصية جديدة مستخدمًا محرف مسافة بين العناصر

وقد تبدو الطريقة التكرارية التقليدية أكثر هكذا

```python
sentence = "Sheila keeps on selling seashells on the seashore"

word_list = []
words = sentence.split()
for word in words:
    word_no_initials = word[1:]
    word_list.append(word_no_initials)

sentence_no_initials = " ".join(word_list)

print(sentence_no_initials)
```

> **تمرين برمجي: تصفية المحظور**
>
> يُرجى كتابة دالة اسمها `filter_forbidden(string: str, forbidden: str)` تأخذ سلسلتين نصيتين وسيطين لها. وينبغي أن تُعيد الدالة نسخة جديدة من السلسلة النصية الأولى، لا تحتوي على أي محرف من السلسلة النصية الثانية.

ينبغي أن تُنفَّذ الدالة باستخدام إدراكات القوائم. والحدّ الأقصى لطول الدالة ثلاثة أسطر من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية `def`.

يُرجى إلقاء نظرة على المثال أدناه.

```python
sentence = "Once! upon, a time: there was a python!??!?!"
filtered = filter_forbidden(sentence, "!?:,.")
print(filtered)
```


```
Once upon a time there was a python
```


## الأصناف الخاصة والإدراكات

يمكن أن تكون الإدراكات أداة مفيدة لمعالجة أمثلة أصنافك الخاصة أو صياغتها، كما سنرى في الأمثلة التالية.

أولًا، لنلقِ نظرة على الصنف `Country`، وهو نموذج بسيط لبلد واحد، بخصائص للاسم وعدد السكان. وفي الدالة الرئيسة أدناه ننشئ أولًا بعض كائنات Country، ثم نستخدم إدراك قوائم لاختيار البلدان التي يزيد عدد سكانها على خمسة ملايين فقط.

```python
class Country:
    """ This class models a single country with population """
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country.name for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country)

```


```
Finland
Sweden
```


في إدراك القوائم أعلاه اخترنا خاصية الاسم فقط من كائنات Country، فكانت محتويات القائمة قابلة للطباعة مباشرة. وكان يمكننا أيضًا إنشاء قائمة جديدة بالبلدان نفسها والوصول إلى خاصية الاسم في حلقة `for`. وقد يكون هذا مفيدًا لو استُخدمت القائمة نفسها من البلدان لاحقًا في البرنامج أيضًا، أو لو احتجنا خاصية عدد السكان في حلقة `for` كذلك:

```python
if __name__ == "__main__":
    finland = Country("Finland", 6000000)
    malta = Country("Malta", 500000)
    sweden = Country("Sweden", 10000000)
    iceland = Country("Iceland", 350000)

    countries = [finland, malta, sweden, iceland]

    bigger_countries = [country for country in countries if country.population > 5000000]
    for country in bigger_countries:
        print(country.name, country.population)
```

في المثال التالي لدينا صنف اسمه `RunningEvent`، وهو نموذج لسباق جري واحد، بخصائص لطول السباق واسمه. وسنستخدم إدراكات القوائم لإنشاء كائنات `RunningEvent` استنادًا إلى قائمة بأطوال السباقات.

وللمعامل `name` قيمة افتراضية في باني الصنف `RunningEvent`، ولهذا لا نحتاج إلى تمرير الاسم وسيطًا.

```python
class RunningEvent:
    """ The class models a foot race event of a length of n metres  """
    def __init__(self, length: int, name: str = "no name"):
        self.length = length
        self.name = name

    def __repr__(self):
        return f"{self.length} m. ({self.name})"

if __name__ == "__main__":
    lengths = [100, 200, 1500, 3000, 42195]
    events = [RunningEvent(length) for length in lengths]

    # Print out all events
    print(events)

    # Pick one from the list and give it a name
    marathon = events[-1] # the last item in the list
    marathon.name = "Marathon"

    # Print out everything again, including the new name
    print(events)
```


```
[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (no name)]
[100 m. (no name), 200 m. (no name), 1500 m. (no name), 3000 m. (no name), 42195 m. (Marathon)]
```


والآن لنكتشف ما الذي يجعل متتالية من العناصر "قابلة للإدراك". لقد تعلّمنا في الجزء السابق كيف نجعل أصنافنا الخاصة قابلة للتكرار. وهذه الميزة نفسها بالضبط هي التي تتيح أيضًا إدراكات القوائم. فإن كان صنفك الخاص قابلًا للتكرار، أمكن استخدامه أساسًا لعبارة إدراك قوائم. وتعريفات الأصناف التالية منسوخة مباشرةً من [الجزء 10](/part-10/3-oo-programming-techniques#iterators):

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # This is the iterator initialization method
    # The iteration variable(s) should be initialized here
    def __iter__(self):
        self.n = 0
        # the method returns a reference to the object itself as 
        # the iterator is implemented within the same class definition
        return self

    # This method returns the next item within the object
    # If all items have been traversed, the StopIteration event is raised
    def __next__(self):
        if self.n < len(self._books):
            # Select the current item from the list within the object
            book = self._books[self.n]
            # increase the counter (i.e. iteration variable) by one
            self.n += 1
            # return the current item
            return book
        else:
            # All books have been traversed
            raise StopIteration

# Test your classes
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Create a list containing the names of all books
    book_names = [book.name for book in shelf]
    print(book_names)

```

> **تمرين برمجي: المنتجات في قائمة التسوق**
>
> لقد أنشأت في الجزء 10 [قائمة تسوّق قابلة للتكرار](/part-10/3-oo-programming-techniques#programming-exercise-an-iterable-shopping-list)، وقد تعلّمنا للتو أنّ الكائن المنشأ من صنف قابل للتكرار يمكن استخدامه مع إدراكات القوائم. ويحتوي قالب التمرين على نسخة مختصرة من الصنف `ShoppingList` بوظائف تكفي بالكاد لتلبية متطلبات هذا التمرين.

يُرجى كتابة دالة اسمها `products_in_shopping_list(shopping_list, amount: int)` تأخذ كائن ShoppingList وقيمة عدد صحيح وسيطين لها. وتُعيد الدالة قائمة بأسماء المنتجات. وينبغي أن تتضمّن القائمة المنتجات التي لها عدد من العناصر لا يقلّ عن العدد المحدّد في المعامل `amount` فقط.

ينبغي أن تُنفَّذ الدالة باستخدام إدراكات القوائم. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية `def`. وينبغي _ألا_ يُعدَّل تعريف الصنف `ShoppingList`.

ينبغي أن تعمل الدالة على النحو التالي:

```python
my_list = ShoppingList()
my_list.add("bananas", 10)
my_list.add("apples", 5)
my_list.add("alcohol free beer", 24)
my_list.add("pineapple", 1)

print("the shopping list contains at least 8 of the following items:")
for product in products_in_shopping_list(my_list, 8):
    print(product)
```


```
the shopping list contains at least 8 of the following items:
bananas
alcohol free beer
```


> **تمرين برمجي: فرق السعر للعقارات الأرخص**
>
> هذا التمرين نسخة معدّلة قليلًا من تمرين [مقارنة الخصائص](/part-9/1-objects-and-references#programming-exercise-comparing-properties) من الجزء 9.

يُرجى كتابة دالة اسمها `cheaper_properties(properties: list, reference: RealProperty)` تأخذ قائمة من العقارات وكائن RealProperty واحدًا وسيطين لها. وينبغي أن تُعيد الدالة قائمة تحتوي على العقارات الأرخص من العقار المرجعي فقط من القائمة الأصلية، مع فرق السعر. وينبغي أن تكون عناصر القائمة المُعادة صفوفًا، عنصرها الأول هو العقار نفسه وعنصرها الثاني هو فرق السعر.

ينبغي أن تُنفَّذ الدالة باستخدام إدراكات القوائم. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية `def`.

وشيفرة الصنف `RealProperty` موجودة في قالب التمرين ولا ينبغي تغييرها.

مثال على الدالة أثناء العمل:

```python
a1 = RealProperty(1, 16, 5500, "Central studio")
a2 = RealProperty(2, 38, 4200, "Two bedrooms downtown")
a3 = RealProperty(3, 78, 2500, "Three bedrooms in the suburbs")
a4 = RealProperty(6, 215, 500, "Farm in the middle of nowhere")
a5 = RealProperty(4, 105, 1700, "Loft in a small town")
a6 = RealProperty(25, 1200, 2500, "Countryside mansion")

properties = [a1, a2, a3, a4, a5, a6]

print(f"cheaper options when compared to {a3.description}:")
for item in cheaper_properties(properties, a3):
    print(f"{item[0].description:35} price difference {item[1]} euros")
```


```
cheaper options when compared to Three bedrooms in the suburbs:
Central studio                                    price difference 107000 euros
Two bedrooms downtown               price difference 35400 euros
Farm in the middle of nowhere       price difference 87500 euros
Loft in a small town                           price difference 16500 euros
```


## الإدراكات والقواميس

لا يوجد في الإدراكات ما يجعلها "قوائمية" بطبيعتها. فالنتيجة قائمة لأن عبارة الإدراك محاطة بأقواس مربّعة، وهي التي تدلّ على قائمة في Python. وتعمل الإدراكات بالقدر نفسه من الكفاءة مع قواميس Python إذا استخدمت أقواسًا معقوفة بدلًا منها. لكن تذكّر أن القواميس تتطلّب أزواجًا من المفتاح والقيمة. ويجب تحديد كليهما عند إنشاء قاموس، وكذلك مع الإدراكات.

ويمكن أن يكون أساس الإدراك أي متتالية قابلة للتكرار، سواء كانت قائمة أو سلسلة نصية أو صفًّا أو قاموسًا أو أيًّا من أصنافك القابلة للتكرار، وما إلى ذلك.

في المثال التالي نستخدم سلسلة نصية أساسًا لقاموس. ويحتوي القاموس على جميع المحارف الفريدة في السلسلة النصية، مع عدد مرات ظهورها:

```python
sentence = "hello there"

char_counts = {character : sentence.count(character) for character in sentence}
print(char_counts)
```


```
{'h': 2, 'e': 3, 'l': 2, 'o': 1, ' ': 1, 't': 1, 'r': 1}
```


ومبدأ عبارة الإدراك هو نفسه تمامًا كما في القوائم، لكن التعبير الآن يتكوّن من مفتاح وقيمة بدلًا من قيمة واحدة. وبناء الجملة العام كما يلي:

`{<key expression> : <value expression> for <item> in <series>}`

ولإنهاء هذا القسم، لنلقِ نظرة على المضاريب مرة أخرى. وهذه المرة نخزّن النتائج في قاموس. فالعدد نفسه هو المفتاح، أما القيمة فهي نتيجة المضروب من دالتنا:

```python
def factorial(n: int):
    """ The function calculates the factorial n! for integers above zero """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    numbers = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    factorials = {number : factorial(number) for number in numbers if number > 0}
    print(factorials)
```


```
{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}
```


> **تمرين برمجي: أطوال السلاسل النصية**
>
> يُرجى كتابة دالة اسمها `lengths(strings: list)` تأخذ قائمة من السلاسل النصية وسيطًا لها. وينبغي أن تُعيد الدالة _قاموسًا_ تكون فيه السلاسل النصية في القائمة مفاتيح وأطوالها قيمًا.

ينبغي أن تُنفَّذ الدالة بإدراك قاموس. والحدّ الأقصى لطول الدالة سطران من الشيفرة، بما في ذلك سطر الترويسة الذي يبدأ بالكلمة المفتاحية `def`.

ينبغي أن تعمل الدالة على النحو التالي:

```python
word_list = ["once", "upon" , "a", "time", "in"]

word_lengths = lengths(word_list)
print(word_lengths)
```


```
{'once': 4, 'upon': 4, 'a': 1, 'time': 4, 'in': 2}
```


> **تمرين برمجي: الكلمات الأكثر شيوعًا**
>
> يُرجى كتابة دالة اسمها `most_common_words(filename: str, lower_limit: int)` تأخذ اسم ملف وقيمة عدد صحيح لحدّ أدنى وسيطين لها. وينبغي أن تُعيد الدالة قاموسًا يحتوي على مرات ظهور الكلمات التي تظهر على الأقل بعدد المرات المحدّد في المعامل `lower_limit`.

فمثلًا، لنفترض أن الدالة استُخدمت لمعالجة ملف اسمه _comprehensions.txt_ بالمحتويات التالية:

```txt
List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can’t be rewritten in the form of list comprehension.
```

فعند نداء الدالة بالوسيطين `most_common_words("comprehensions.txt", 3)` ينبغي أن تُعيد


```
{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}
```


ملاحظة: تؤثّر حالة الأحرف في النتائج، وجميع الصيغ المُصرَّفة كلمات فريدة في هذا التمرين. أي إنّ الكلمات `List` و`lists` و`list` كل منها كلمة منفصلة هنا، و`list` وحدها لها مرات ظهور تكفي لتصل إلى القائمة المُعادة. وينبغي إزالة جميع علامات الترقيم قبل عدّ مرات الظهور.

والقرار في كيفية تنفيذ ذلك متروك لك. وعلى الأرجح ستكون أسهل طريقة هي الاستفادة من إدراكات القوائم والقواميس.
