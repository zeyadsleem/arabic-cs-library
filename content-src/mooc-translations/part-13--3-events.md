---
title: "الأحداث"
---

> **أهداف التعلّم**
>
> بعد هذا القسم
>
> - ستكون على دراية بأحداث pygame
> - ستتمكّن من كتابة برنامج يتفاعل مع ضغطات المفاتيح
> - ستتمكّن من كتابة برنامج يتفاعل مع أحداث الفأرة


حتى الآن لم تكن حلقاتنا الرئيسية تنفّذ سوى تحريكات محدّدة مسبقًا وتتفاعل فقط مع أحداث من نوع `pygame.QUIT`، رغم أن الحلقة تتلقّى قائمة بجميع الأحداث من نظام التشغيل. فلنتعرّف إذًا على أنواع أخرى من الأحداث.

## معالجة الأحداث

يطبع هذا البرنامج معلومات عن جميع الأحداث التي يمرّرها نظام التشغيل إلى برنامج pygame أثناء تشغيله:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        print(event)
        if event.type == pygame.QUIT:
            exit()
```

لنفترض أن البرنامج بقي يعمل فترة من الزمن، ثم نُقر على زرّ الخروج. يطبع البرنامج المعلومات التالية:

```x
<Event(4-MouseMotion {'pos': (495, 274), 'rel': (495, 274), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (494, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (492, 274), 'rel': (-2, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(4-MouseMotion {'pos': (491, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})>
<Event(5-MouseButtonDown {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(6-MouseButtonUp {'pos': (491, 274), 'button': 1, 'window': None})>
<Event(2-KeyDown {'unicode': 'a', 'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(3-KeyUp {'key': 97, 'mod': 0, 'scancode': 38, 'window': None})>
<Event(2-KeyDown {'unicode': 'b', 'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(3-KeyUp {'key': 98, 'mod': 0, 'scancode': 56, 'window': None})>
<Event(2-KeyDown {'unicode': 'c', 'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(3-KeyUp {'key': 99, 'mod': 0, 'scancode': 54, 'window': None})>
<Event(12-Quit {})>
```

تتعلّق الأحداث القليلة الأولى باستخدام الفأرة، ثم تأتي بعض الأحداث من لوحة المفاتيح، وأخيرًا يُغلق الحدث الأخير البرنامج. ولكل حدث نوع على الأقل، لكنه قد يوفّر كذلك بعض المعلومات المميّزة الأخرى، مثل موقع مؤشّر الفأرة أو المفتاح الذي ضُغط.

يمكنك البحث عن أوصاف الأحداث في [توثيق pygame](https://www.pygame.org/docs/ref/event.html)، لكن قد يكون أسهل أحيانًا طباعة الأحداث بالشيفرة أعلاه، والبحث عن الحدث الذي يقع عندما يحدث شيء تريد التفاعل معه.

## أحداث لوحة المفاتيح

يستطيع هذا البرنامج معالجة الأحداث التي يضغط فيها المستخدم مفتاح السهم إلى اليمين أو إلى اليسار على لوحة مفاتيحه. ويطبع البرنامج المفتاح الذي ضُغط.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                print("left")
            if event.key == pygame.K_RIGHT:
                print("right")

        if event.type == pygame.QUIT:
            exit()
```

يشير الثابتان `pygame.K_LEFT` و`pygame.K_RIGHT` إلى مفتاحَي السهم إلى اليسار وإلى اليمين. وثوابت المفاتيح في pygame الخاصة بمفاتيح لوحة المفاتيح المختلفة مدرجة في [توثيق pygame](https://www.pygame.org/docs/ref/key.html#key-constants-label).

فمثلًا، إذا ضغط المستخدم مفتاح السهم إلى اليمين مرّتين، ثم مفتاح اليسار مرّة واحدة، ثم مفتاح اليمين مرّة أخرى، يطبع البرنامج

```x
right
right
left
right
```

لدينا الآن كل الأدوات اللازمة لتحريك شخصية، أو _كائن رسومي_ (sprite)، على الشاشة إلى اليمين وإلى اليسار بمفتاحَي السهم. وتحقيق ذلك ممكن بالشيفرة التالية:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                x -= 10
            if event.key == pygame.K_RIGHT:
                x += 10

        if event.type == pygame.QUIT:
            exit()

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()
```

وبحسب طريقة استخدامك لمفتاحَي السهم، قد يبدو تشغيل البرنامج بهذا الشكل:

![pygame_move_robot.gif](/images/mooc/part-13/pygame_move_robot.gif)

في الشيفرة أعلاه لدينا المتغيّران `x` و`y` اللذان يحتويان على الموقع الإحداثي للكائن الرسومي. وقد ضُبط المتغيّر `y` ليظهر الكائن الرسومي في أسفل النافذة. ولا تتغيّر قيمة `y` خلال تنفيذ البرنامج. أما قيمة `x` فتزداد بمقدار 10 كلما ضغط المستخدم مفتاح السهم إلى اليمين، وتنقص بمقدار 10 كلما ضُغط مفتاح السهم إلى اليسار.

ويعمل البرنامج عمومًا بشكل جيد، لكن يلزم ضغط المفتاح من جديد في كل مرّة نريد فيها التحرّك مرة أخرى. وسيكون من الأفضل أن تكون الحركة متواصلة طالما بقي المفتاح مضغوطًا. ويوفّر البرنامج التالي هذه الوظيفة:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")
x = 0
y = 480-robot.get_height()

to_right = False
to_left = False

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                to_left = True
            if event.key == pygame.K_RIGHT:
                to_right = True

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                to_left = False
            if event.key == pygame.K_RIGHT:
                to_right = False

        if event.type == pygame.QUIT:
            exit()

    if to_right:
        x += 2
    if to_left:
        x -= 2

    window.fill((0, 0, 0))
    window.blit(robot, (x, y))
    pygame.display.flip()

    clock.tick(60)
```

تحتوي الشيفرة الآن على المتغيّرين `to_right` و`to_left`. وهما يحتويان على معرفة ما إذا كان ينبغي أن يتحرّك الكائن الرسومي إلى اليمين أو إلى اليسار في لحظة معيّنة. وعندما يضغط المستخدم مفتاح سهم، تصبح القيمة المخزّنة في المتغيّر المعنيّ `True`. وعندما يُطلق المفتاح تتغيّر القيمة إلى `False`.

تُستخدم الساعة لتوقيت حركات الكائن الرسومي، بحيث تحدث 60 مرّة في الثانية. وإذا ضُغط مفتاح سهم، يتحرّك الكائن الرسومي بكسلين إلى اليمين أو إلى اليسار. وهذا يعني أن الكائن الرسومي يتحرّك 120 بكسل في الثانية إذا بقي المفتاح مضغوطًا.

> **تمرين برمجي: أربعة اتجاهات**
>
> اكتب برنامجًا يستطيع فيه اللاعب تحريك روبوت في أربعة اتجاهات بمفتاحَي السهم على لوحة المفاتيح. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_four_directions.gif](/images/mooc/part-13/pygame_four_directions.gif)


> **تمرين برمجي: أربعة جدران**
>
> حسّن البرنامج في التمرين السابق بحيث لا يستطيع الروبوت الخروج من النافذة في أيّ من الاتجاهات الأربعة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_four_walls.gif](/images/mooc/part-13/pygame_four_walls.gif)


> **تمرين برمجي: لاعبان**
>
> اكتب برنامجًا يوجّه فيه لاعبان كلٌّ روبوته الخاص. وينبغي أن يستخدم أحد اللاعبين مفتاحَي السهم بينما يستخدم الآخر مثلًا المفاتيح w-s-a-d. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_two_players.gif](/images/mooc/part-13/pygame_two_players.gif)


## أحداث الفأرة

تفاعل الشيفرة التالية مع الأحداث التي يُضغط فيها زرّ من أزرار الفأرة بينما يكون المؤشّر داخل منطقة النافذة:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            print("you pressed the button number", event.button, "at location", event.pos)

        if event.type == pygame.QUIT:
            exit()
```

وينبغي أن يبدو تنفيذ هذا البرنامج على نحو ما بهذا الشكل:

```x
you pressed the button number 1 at location (82, 135)
you pressed the button number 1 at location (369, 135)
you pressed the button number 1 at location (269, 297)
you pressed the button number 3 at location (515, 324)
```

يشير الزرّ رقم 1 إلى زرّ الفأرة الأيسر، ويشير الزرّ رقم 3 إلى زرّ الفأرة الأيمن.

ويجمع البرنامج التالي بين معالجة أحداث الفأرة ورسم صورة على الشاشة. فعندما يضغط المستخدم زرًّا من أزرار الفأرة بينما يكون مؤشّر الفأرة داخل حدود النافذة، تُرسم صورة روبوت في ذلك الموقع.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            x = event.pos[0]-robot.get_width()/2
            y = event.pos[1]-robot.get_height()/2

            window.fill((0, 0, 0))
            window.blit(robot, (x, y))
            pygame.display.flip()

        if event.type == pygame.QUIT:
            exit()
```

وقد يبدو تنفيذ البرنامج بهذا الشكل:

![pygame_cursor.gif](/images/mooc/part-13/pygame_cursor.gif)

يحتوي البرنامج التالي على تحريك يتبع فيه الكائن الرسومي للروبوت مؤشّر الفأرة. ويُخزَّن موقع الكائن الرسومي في المتغيّرين `robot_x` و`robot_y`. وعندما تتحرّك الفأرة، يُخزَّن موقعها في المتغيّرين `target_x` و`target_y`. وإذا لم يكن الروبوت في هذا الموقع، فإنه يتحرّك في الاتجاه المناسب.

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robot = pygame.image.load("robot.png")

robot_x = 0
robot_y = 0
target_x = 0
target_y = 0

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEMOTION:
            target_x = event.pos[0]-robot.get_width()/2
            target_y = event.pos[1]-robot.get_height()/2

        if event.type == pygame.QUIT:
            exit(0)

    if robot_x > target_x:
        robot_x -= 1
    if robot_x < target_x:
        robot_x += 1
    if robot_y > target_y:
        robot_y -= 1
    if robot_y < target_y:
        robot_y += 1

    window.fill((0, 0, 0))
    window.blit(robot, (robot_x, robot_y))
    pygame.display.flip()

    clock.tick(60)
```

وينبغي أن يبدو تنفيذ البرنامج على نحو ما بهذا الشكل:

![pygame_cursor2.gif](/images/mooc/part-13/pygame_cursor2.gif)

> **تمرين برمجي: الروبوت والفأرة**
>
> اكتب برنامجًا يتبع فيه الروبوت مؤشّر الفأرة بحيث يكون مركز الروبوت دائمًا عند مؤشّر الفأرة مباشرة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_robot_cursor.gif](/images/mooc/part-13/pygame_robot_cursor.gif)


> **تمرين برمجي: موقع الروبوت**
>
> اكتب برنامجًا يظهر فيه الروبوت في موقع عشوائي داخل النافذة. وعندما ينقر اللاعب على الروبوت بالفأرة، ينتقل الروبوت إلى موقع جديد. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_robot_location.gif](/images/mooc/part-13/pygame_robot_location.gif)
