---
title: "مشروع اللعبة"
lang: ar
source: "https://programming-26.mooc.fi/part-14/1-game-project"
---

في هذا الجزء سنستخدم pygame لإنشاء لعبة أكبر نسبيًا. وهي تنويعة من لعبة سوكوبان (Sokoban) الكلاسيكية، يحرّك فيها اللاعب روبوتًا على شبكة ويَدفع الصناديق إلى مواضعها الصحيحة بأقل عدد ممكن من الحركات.

سيبدو النتيجة النهائية هكذا:

![game.png](/images/mooc/part-14/game.png)

## خريطة اللعبة

لنبدأ برسم الخريطة المستخدمة في اللعبة. تُنفَّذ اللعبة في الصنف `Sokoban`، والذي يجمع كل الوظائف اللازمة للعب. وفي هذه المرحلة الأولى تكون محتويات الصنف كما يلي:

```python
import pygame

class Sokoban:
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()

    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))

    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()

if __name__ == "__main__":
    Sokoban()
```

ينبغي لتشغيل البرنامج أن يعرض نافذة تحمل الحالة الأولية للعبة. لننظر عن قرب إلى الشيفرة التي تُحقّق ذلك.

## المُنشِئ

يُهيّئ مُنشِئ (constructor) الصنف وحدود pygame والمتغيرات وبنى البيانات الأساسية المعنية بالعبة. كما يستدعي طريقة الحلقة الرئيسية للعبة.

```python
    def __init__(self):
        pygame.init()
        
        self.load_images()
        self.new_game()
        
        self.height = len(self.map)
        self.width = len(self.map[0])
        self.scale = self.images[0].get_width()

        window_height = self.scale * self.height
        window_width = self.scale * self.width
        self.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption("Sokoban")

        self.main_loop()
```

تحمّل الطريقة `load_images` الصور المستخدمة في اللعبة إلى قائمة اسمها `images`. وتنشئ الطريقة `new_game` قائمة ثنائية الأبعاد اسمها `map`، التي تحمل حالة شبكة اللعبة في بدايتها.

يُهيَّأ المتغيّران `height` و`width` استنادًا إلى أبعاد شبكة اللعبة. وتحمل المتغيّر `scale` طول ضلع واحد من مربّعات الشبكة. ولأن كل صورة مربّع بنفس الحجم تمامًا، فإن حجم جميع المربّعات يغطّيه هذا المتغيّر وحده، ويكفي أن نستخدم عرض الصورة الأولى قيمًا له. ويمكن استخدام هذه القيمة نفسها لحساب عرض وارتفاع الشبكة كاملة، وهذا يتيح لنا إنشاء نافذة بالحجم المناسب لعرض شبكة اللعبة.

## تحميل الصور

تحمّل الطريقة `load_images` كل الصور المستخدمة في اللعبة:

```python
    def load_images(self):
        self.images = []
        for name in ["floor", "wall", "target", "box", "robot", "done", "target_robot"]:
            self.images.append(pygame.image.load(name + ".png"))
```

تستخدم اللعبة الصور التالية:

### مربّع الأرضية

![floor.png](/images/mooc/part-14/floor.png)

* اسم الملف: `floor.png`
* الموضع في القائمة: 0

### مربّع الجدار

![wall.png](/images/mooc/part-14/wall.png)

* اسم الملف: `wall.png`
* الموضع في القائمة: 1

### مربّع الهدف

![target.png](/images/mooc/part-14/target.png)

* اسم الملف: `target.png`
* الموضع في القائمة: 2
* ينبغي للروبوت أن يُحرّك أحد الصناديق إلى هذا المربّع

### صندوق

![box.png](/images/mooc/part-14/box.png)

* اسم الملف: `box.png`
* الموضع في القائمة: 3

### روبوت

![robot.png](/images/mooc/part-14/robot.png)

* اسم الملف: `robot.png`
* الموضع في القائمة: 4

### صندوق فوق مربّع هدف

![done.png](/images/mooc/part-14/done.png)

* اسم الملف: `done.png`
* الموضع في القائمة: 5
* نُقل الصندوق إلى مربّع الهدف

### روبوت فوق مربّع هدف

![target_robot.png](/images/mooc/part-14/target_robot.png)

* اسم الملف: `target_robot.png`
* الموضع في القائمة: 6
* ويمكن للروبوت أن يكون أيضًا داخل مربّع هدف فارغ

## إنشاء الشبكة

تنشئ الطريقة `new_game` الحالة الأولية لشبكة اللعبة:

```python
    def new_game(self):
        self.map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                    [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                    [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
```

تنشئ الطريقة قائمة ثنائية الأبعاد اسمها `map` تستخدم المواقع المرقّمة للصور في *قائمتها* للدلالة على أي صورة تذهب إلى أي موضع. وبهذا تحتفظ اللعبة بسجلّ لحالة شبكة اللعبة في كل وقت.

ملاحظة: في البداية تحوي جميع مربّعات الشبكة عددًا بين 0 و4. أمّا العدَدان 5 و6 فلا يظهران في البداية، إذ لا يوجد صندوق أو روبوت داخل مربّع هدف في تلك المرحلة.

## الحلقة الرئيسية

الطريقة `main_loop` قصيرة نسبيًا. ففي كل دورة تستدعي طريقتين: تمرّ `check_events` على الأحداث التي جُمعت منذ الدورة السابقة، وتُحدِّث الطريقة `draw_window` محتويات النافذة.

```python
    def main_loop(self):
        while True:
            self.check_events()
            self.draw_window()

    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

    def draw_window(self):
        self.window.fill((0, 0, 0))

        for y in range(self.height):
            for x in range(self.width):
                square = self.map[y][x]
                self.window.blit(self.images[square], (x * self.scale, y * self.scale))

        pygame.display.flip()
```

في هذه المرحلة، الحدث الوحيد الذي تعامل فعليًا معه اللعبة هو إغلاق نافذتها، من زر الإغلاق مثلًا. ثم تخرج اللعبة باستدعاء الدالة `exit` في بايثون.

وفي كل مرة تُستدعى فيها الطريقة `draw_window`، تُمرَّ شبكة اللعبة كاملة، وتُرسم الصورة المقابلة لكل مربّع في الشبكة في الموقع الصحيح.

ملاحظة: تُستعمل إحداثيّات x وy بطريقتين مختلفتين داخل اللعبة. فعند التعامل مع فهرس قائمة ثنائية الأبعاد، يكون منطقيًا ذكر الإحداثي y أوّلًا، إذ يشير y إلى رقم الصفاحة بينما x إلى رقم العمود. أمّا عند استعمال طرق pygame فيُمرَّر x عادةً أولًا، وهو ما يحدث كثيرًا في الرسوميات وفي السياقات الرياضية أيضًا.
