---
title: "تراكيب الأصناف"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف ما تعنيه الوراثة (inheritance) في سياق البرمجة
> - ستكون قادرًا على كتابة أصناف ترث أصنافًا أخرى
> - ستعرف كيف تؤثر الوراثة في خصائص الأصناف


## صنوف خاصة لأغراض خاصة

قد تصادف أحيانًا موقفًا تكون فيه قد عرّفت صنفًا بالفعل، ثم تدرك أنك تحتاج إلى خصائص معيّنة في بعض نسخ من ذلك الصنف لا في جميعها. وفي أحيانٍ أخرى تدرك أنك عرّفت صنفين متشابهين جدًّا يفترقان بفروق طفيفة فحسب. نحن بصفتنا مبرمجين نسعى دائمًا إلى أقل قدر ممكن من التكرار، مع الحفاظ على الوضوح والقابلية للقراءة. فكيف يمكننا إيواء تنفيذات مختلفة لأشياء تتشابه في جوهرها؟

لننظر إلى تعريفَي صنف: `Student` و`Teacher`. وقد تُركت توابع الجلب والوضع (getter and setter) جانبًا حاليًا لإبقاء المثال قصيرًا.

```python

class Student:

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits

class Teacher:

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

```

حتى في مثال مُبسَّط كالمثال أعلاه، يكون لدينا بالفعل تكرار لا بأس به: يحتوي كلٌّ من الصنفين على الخاصيتين `name` و`email`. ولو كانت تعريفة الخاصيتين واحدة لكان تابع واحد كافيًا لتعديلهما.

فمثلًا، تخيّل أن عنوان بريد المدرسة قد تغيّر. فسيتعيّن تحديث جميع العناوين. و_يمكننا_ كتابة نسختين منفصلتين من الدالة نفسها في الجوهر:

```python

def update_email(o: Student):
    o.email = o.email.replace(".com", ".edu")

def update_email2(o: Teacher):
    o.email = o.email.replace(".com", ".edu")

```

إن كتابة الشيء نفسه عمليًا مرتين تكرار غير ضروري، ناهيك عن أنه يضاعف احتمالات حدوث الأخطاء. ولو استطعنا استخدام تابع واحد للتعامل مع نسخ من كلي الصنفين لكان ذلك تحسينًا جوهريًّا.

يملك الصنفان أيضًا خصائص لا تتماثل مع غيرهما. ومجرد دمج _كل_ الخصائص في صنف واحد يعني أن _كل_ نسخة من الصنف ستحمل بعدها خصائص غير ضرورية، تختلف باختلاف النسخ. وهذا لا يبدو وضعًا مثاليًا أيضًا.

 ## الوراثة

تتسم عبّارات البرمجة الكائنية عادةً بتقنية تُسمى _الوراثة_ (inheritance). ويمكن لصنف أن _يرث_ خصائص صنف آخر. وإلى جانب هذه الخصائص الموروثة يستطيع الصنف أن يحتوي أيضًا على خصائص خاصة به وحده.

وبناءً على ما سبق، سيكون منطقيًّا أن يملك صنفا `Teacher` و`Student` صنفًا أساسيًا مشتركًا هو `Person`:

 ```python

class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

 ```

يحتوي الصنف الجديد على تلك الخصائص التي يشترك فيها الصنفان الآخران. والآن يستطيع `Student` و`Teacher` أن _يرثا_ هذه الخصائص ويضيفا إلى جانبهما خصائصهما الخاصة.

تقتصر صياغة الوراثة على إضافة اسم الصنف الأساسي بين قوسين في سطر الترويسة:

 ```python
class Person:

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def update_email_domain(self, new_domain: str):
        old_domain = self.email.split("@")[1]
        self.email = self.email.replace(old_domain, new_domain)


class Student(Person):

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits


class Teacher(Person):

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

# Let's test our classes
if __name__ == "__main__":
    saul = Student("Saul Student", "1234", "saul@example.com", 0)
    saul.update_email_domain("example.edu")
    print(saul.email)

    tara = Teacher("Tara Teacher", "tara@example.fi", "A123", 2)
    tara.update_email_domain("example.ex")
    print(tara.email)

 ```

يرث كلٌّ من `Student` و`Teacher` الصنف `Person`، فكلاهما يملك الخصائص المعرّفة في الصنف `Person`، بما في ذلك التابع `update_email_domain`. ويعمل التابع نفسه مع نسخ من كلي الصنفين المشتقَّين.

لننظر إلى مثال آخر. لدينا رفّ كتب `Bookshelf` يرث الصنف `BookContainer`:

 ```python
class Book:
    """ This class models a simple book """
    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class BookContainer:
    """ This class models a container for books """

    def __init__(self):
        self.books = []

    def add_book(self, book: Book):
        self.books.append(book)

    def list_books(self):
        for book in self.books:
            print(f"{book.name} ({book.author})")


class Bookshelf(BookContainer):
    """ This class models a shelf for books """

    def __init__(self):
        super().__init__()

    def add_book(self, book: Book, location: int):
        self.books.insert(location, book)

 ```

يحتوي الصنف `Bookshelf` على التابع `add_book`. وهو تعريف لتابع بنفس الاسم في الصنف الأساسي `BookContainer`. ويُسمى هذا _إعادة التعريف_ (overriding): إذا كان لصنف مشتق تابع بنفس الاسم الموجود في الصنف الأساسي، فإن التابع المشتق يُعيد تعريف التابع الأصلي في نسخ الصنف المشتق.

الفكرة في المثال أعلاه أن الكتاب المضاف إلى BookContainer يذهب دائمًا إلى الأعلى، لكن مع Bookshelf يمكنك تحديد الموقع بنفسك. ويعمل التابع `list_books` بالطريقة نفسها مع كلي الصنفين، إذ لا يوجد تابع مُعاد تعريفه في الصنف المشتق.

لنجرّب هذه الأصناف:

 ```python
if __name__ == "__main__":
    # Create some books for testing
    b1 = Book("Old Man and the Sea", "Ernest Hemingway")
    b2 = Book("Silent Spring", "Rachel Carson")
    b3 = Book("Pride and Prejudice", "Jane Austen")

    # Create a BookContainer and add the books
    container = BookContainer()
    container.add_book(b1)
    container.add_book(b2)
    container.add_book(b3)

    # Create a Bookshelf and add the books (always to the beginning)
    shelf = Bookshelf()
    shelf.add_book(b1, 0)
    shelf.add_book(b2, 0)
    shelf.add_book(b3, 0)


    # Tulostetaan
    print("Container:")
    container.list_books()

    print()

    print("Shelf:")
    shelf.list_books()
 ```


```
Container:
Old Man and the Sea (Ernest Hemingway)
Silent Spring (Rachel Carson)
Pride and Prejudice (Jane Austen)

Shelf:
Pride and Prejudice (Jane Austen)
Silent Spring (Rachel Carson)
Old Man and the Sea (Ernest Hemingway)
```


وبذلك يمتلك الصنف Bookshelf أيضًا وصولًا إلى التابع `list_books`. ومن خلال الوراثة يصبح التابع عضوًا في كل الأصناف المشتقّة من الصنف `BookContainer`.

 ## الوراثة ونطاق الخصائص

يرث الصنف المشتق كل خصائص صنفه الأساسي. وتكون هذه الخصائص متاحة مباشرة في الصنف المشتق، ما لم تُعرَّف كخاصية خاصة في الصنف الأساسي (بوضع شرطتين سفليتين قبل اسم الخاصية).

وبما أن خصائص Bookshelf مطابقة لخصائص BookContainer، لم يكن هناك حاجة لإعادة كتابة باني (constructor) Bookshelf. فقد استدعينا باني الصنف الأساسي ببساطة:

 ```python
class Bookshelf(BookContainer):

    def __init__(self):
        super().__init__()

```

ويمكن الوصول إلى أي خاصية في الصنف الأساسي من الصنف المشتق عبر الدالة `super()`. ويُترك الوسيط `self` خارج استدعاء التابع، إذ تضيفه Python تلقائيًّا.

لكن ماذا لو كانت الخصائص غير متطابقة؛ هل يمكننا مع ذلك استخدام باني الصنف الأساسي بطريقة ما؟ لننظر إلى صنف اسمه `Thesis` يرث الصنف `Book`. فالصنف المشتق _يستطيع_ هو أيضًا استدعاء الباني من الصنف الأساسي:

```python

class Book:
    """ This class models a simple book """

    def __init__(self, name: str, author: str):
        self.name = name
        self.author = author


class Thesis(Book):
    """ This class models a graduate thesis """

    def __init__(self, name: str, author: str, grade: int):
        super().__init__(name, author)
        self.grade = grade

```

يستدعي الباني في الصنف `Thesis` باني الصنف الأساسي `Book` بالوساطين `name` و`author`. وإلى جانب ذلك، يضبط باني الصنف المشتق قيمة الخاصية `grade`. ولا يمكن أن يكون هذا جزءًا من باني الصنف الأساسي بطبيعة الحال، إذ لا يملك الصنف الأساسي مثل هذه الخاصية.

يمكن استخدام الصنف أعلاه هكذا:

```python
if __name__ == "__main__":
    thesis = Thesis("Python and the Universe", "Peter Pythons", 3)

    # Print out the values of the attributes
    print(thesis.name)
    print(thesis.author)
    print(thesis.grade)

```


```
Python and the Universe
Peter Pythons
3
```


حتى إذا _عاد تعريف_ صنف مشتق لتابع في صنفه الأساسي، فإنه _يستطيع_ هو أيضًا استدعاء التابع المُعاد تعريفه في الصنف الأساسي. في المثال التالي لدينا بطاقة مكافآت أساسية `BonusCard` وبطاقة خاصة `PlatinumCard` للعملاء الأكثر إخلاصًا. فالتابع `calculate_bonus` مُعاد تعريفه في الصنف المشتق، لكن التابع المُعاد تعريفه يستدعي التابع الأساسي:

```python

class Product:

    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class BonusCard:

    def __init__(self):
        self.products_bought = []

    def add_product(self, product: Product):
        self.products_bought.append(product)

    def calculate_bonus(self):
        bonus = 0
        for product in self.products_bought:
            bonus += product.price * 0.05

        return bonus

class PlatinumCard(BonusCard):

    def __init__(self):
        super().__init__()

    def calculate_bonus(self):
        # Call the method in the base class
        bonus = super().calculate_bonus()

        # ...and add five percent to the total
        bonus = bonus * 1.05
        return bonus
```

هكذا يُحسب المكافأة لبطاقة PlatinumCard باستدعاء التابع المُعاد تعريفه في الصنف الأساسي، ثم إضافة 5 بالمئة إضافية إلى النتيجة الأساسية. وهذا مثال على كيفية استخدام هذين الصنفين:

```python
if __name__ == "__main__":
    card = BonusCard()
    card.add_product(Product("Bananas", 6.50))
    card.add_product(Product("Satsumas", 7.95))
    bonus = card.calculate_bonus()

    card2 = PlatinumCard()
    card2.add_product(Product("Bananas", 6.50))
    card2.add_product(Product("Satsumas", 7.95))
    bonus2 = card2.calculate_bonus()

    print(bonus)
    print(bonus2)
```


```
0.7225
0.7586250000000001
```


> **تمرين برمجي: حاسوب محمول**
>
> يحتوي قالب التمرين على تعريف صنف `Computer`، له الخاصيتان `model` و`speed`.

يُرجى تعريف صنف اسمه `LaptopComputer` يَرث الصنف `Computer`. ينبغي أن يأخذ بانٍ الصنف الجديد وسيطًا ثالثًا: `weight` من نوع عدد صحيح.

يُرجى إضافة تابع `__str__` أيضًا إلى تعريف صنفك. راجع المثال أدناه لشكل السلسلة النصية المطبوعة المتوقّع.

```python
laptop = LaptopComputer("NoteBook Pro15", 1500, 2)
print(laptop)
```


```
NoteBook Pro15, 1500 MHz, 2 kg
```


> **تمرين برمجي: متحف الألعاب**
>
> يحتوي قالب التمرين على تعريفَي صنف لـ`ComputerGame` و`GameWarehouse`. ويُستخدم كائن GameWarehouse لتخزين كائنات ComputerGame.

يُرجى التعرّف على هذين الصنفين. ثم عرّف صنفًا جديدًا اسمه `GameMuseum` يرث الصنف `GameWarehouse`.

ينبغي أن _يعيد تعريف_ صنف GameMuseum التابع `list_games()`، بحيث يُرجع قائمة تضمّ فقط الألعاب التي صُنعت قبل سنة 1990.

ينبغي أيضًا أن يمتلك الصنف الجديد بانيًا _يستدعي الباني من الصنف الأب `GameWarehouse`_. ولا يأخذ الباني أي وسيط.

يمكنك استخدام الشيفرة التالية لاختبار تنفيذك:

```python
museum = GameMuseum()
museum.add_game(ComputerGame("Pacman", "Namco", 1980))
museum.add_game(ComputerGame("GTA 2", "Rockstar", 1999))
museum.add_game(ComputerGame("Bubble Bobble", "Taito", 1986))
for game in museum.list_games():
    print(game.name)
```


```
Pacman
Bubble Bobble
```


> **تمرين برمجي: المساحات**
>
> يحتوي قالب التمرين على تعريف صنف `Rectangle`. ويمثّل الصنف [شكل مستطيل](https://en.wikipedia.org/wiki/Rectangle). ويعمل Rectangle كالتالي:

```python
rectangle = Rectangle(2, 3)
print(rectangle)
print("area:", rectangle.area())
```


```
rectangle 2x3
area: 6
```


## المربّع

يُرجى تعريف صنف اسمه `Square` يرث الصنف `Rectangle`. فأضلاع [المربّع](https://en.wikipedia.org/wiki/Square) كلها متساوية الطول، ما يجعل المربّع حالة خاصة من المستطيل. ولا ينبغي أن يحتوي الصنف الجديد على أي خاصية جديدة.

يُستخدم كائن Square كالتالي:

```python
square = Square(4)
print(square)
print("area:", square.area())
```


```
square 4x4
area: 16
```


> **تمرين برمجي: لعبة الكلمات**
>
> يحتوي قالب التمرين على تعريف صنف `WordGame`. وهو يوفّر بعض الوظائف الأساسية لتشغيل ألعاب قائمة على الكلمات:

```python
import random

class WordGame():
    def __init__(self, rounds: int):
        self.wins1 = 0
        self.wins2 = 0
        self.rounds = rounds

    def round_winner(self, player1_word: str, player2_word: str):
        # determine a random winner
        return random.randint(1, 2)

    def play(self):
        print("Word game:")
        for i in range(1, self.rounds+1):
            print(f"round {i}")
            answer1 = input("player1: ")
            answer2 = input("player2: ")

            if self.round_winner(answer1, answer2) == 1:
                self.wins1 += 1
                print("player 1 won")
            elif self.round_winner(answer1, answer2) == 2:
                self.wins2 += 1
                print("player 2 won")
            else:
                pass # it's a tie

        print("game over, wins:")
        print(f"player 1: {self.wins1}")
        print(f"player 2: {self.wins2}")
```

تُلعب اللعبة كالتالي:

```python
p = WordGame(3)
p.play()
```


```
Word game:
round 1
player1: **longword**
player2: **??**
player 2 won
round 2
player1: **i'm the best**
player2: **wut?**
player 1 won
round 3
player1: **who's gonna win**
player2: **me**
player 1 won
game over, wins:
player 1: 2
player 2: 1
```


في هذا الإصدار "الأساسي" من اللعبة يُحدَّد الفائز عشوائيًّا. ولا يتأثر النتيجة بأي شيء يُدخله اللاعبان.

## الكلمة الأطول تفوز

يُرجى تعريف صنف اسمه `LongestWord`. وهو إصدار من اللعبة يفوز فيه من يكتب أطول كلمة في كل جولة.

يُنفَّذ الإصدار الجديد من اللعبة عبر _وراثة_ الصنف `WordGame`. وينبغي أيضًا إعادة تعريف التابع `round_winner` على نحو مناسب. وهيكل الصنف الجديد كالتالي:

```python
class LongestWord(WordGame):
    def __init__(self, rounds: int):
        super().__init__(rounds)

    def round_winner(self, player1_word: str, player2_word: str):
        # your code for determining the winner goes here
```

مثال على كيفية لعب اللعبة الجديدة:

```python
p = LongestWord(3)
p.play()
```


```
Word game:
round 1
player1: **short**
player2: **longword**
player 2 won
round 2
player1: **word**
player2: **wut?**
round 3
player1: **i'm the best**
player2: **no, me**
player 1 won
game over, wins:
player 1: 1
player 2: 1
```


## الأكثر حروفًا متحرّكة يفوز

يُرجى تعريف صنف WordGame آخر اسمه `MostVowels`. في هذا الإصدار من اللعبة يفوز بالجولة من نجح في إدخال عدد أكبر من الحروف المتحركة في كلمته.

## الحجر والورقة والمقص

وأخيرًا، يُرجى تعريف صنف اسمه `RockPaperScissors` يتيح لك لعب [لعبة الحجر والورقة والمقص](https://en.wikipedia.org/wiki/Rock_paper_scissors).

قواعد اللعبة كالتالي:

- يهزم الحجر المقصّ (الحجر يستطيع كسر المقص لكن المقص لا يستطيع قطع الحجر)
- تهزم الورقة الحجر (الورقة تستطيع تغطية الحجر)
- يهزم المقص الورقة (المقص يستطيع قطع الورقة)

إذا كان مُدخَل أيّ من اللاعبين غير صالح، فقد خسر الجولة. وإذا كتب اللاعبان شيئًا غير _الحجر_ أو _الورقة_ أو _المقص_، كانت النتيجة تعادلًا.

مثال على كيفية لعب اللعبة:

```python
p = RockPaperScissors(4)
p.play()
```


```
Word game:
round 1
player1: **rock**
player2: **rock**
round 2
player1: **rock**
player2: **paper**
player 2 won
round 3
player1: **scissors**
player2: **paper**
player 1 won
round 4
player1: **paper**
player2: **dynamite**
player 1 won
game over, wins:
player 1: 2
player 2: 1
```

