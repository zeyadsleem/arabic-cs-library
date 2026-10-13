---
title: "إنهاء اللعبة"
lang: ar
source: "https://programming-26.mooc.fi/part-14/3-finishing-the-game"
---

لعبتنا أصبحت وظيفية تمامًا، لذا حان الوقت لإضافة بعض اللمسات النهائية. سنضيف عدادًا لعرض الحركات المتخذة، خيارًا لبدء لعبة جديدة وإغلاق اللعبة بإدخال لوحة المفاتيح، وإشعارًا عندما ينجح اللاعب في حل اللعبة.

## عداد الحركات

عداد الحركات بالقرب من الحافة السفلية لنافذة اللعبة يعرض عدد الحركات التي قام بها اللاعب حتى الآن. يمكن استخدام هذا لإيجاد الحل بأقل عدد من الحركات.

يتطلب العداد بعض التغييرات في الكود. أولاً، لنغير المُنشئ (constructor) بحيث يكون هناك مساحة كافية للعداد، وأن يكون لدينا خط مناسب تحت تصرفنا لرسم النص:

```python
    def __init__(self):
        ...
        self.window = pygame.display.set_mode((window_width, window_height + self.scale))

        self.game_font = pygame.font.SysFont("Arial", 24)
        ...
```

يتم تهيئة عداد الحركات بالصفر في بداية اللعبة. كل حركة تزيده بواحد:

```python
    def new_game(self):
        ...
        self.moves = 0
```

```python
    def move(self, move_y, move_x):
        ...
        self.moves += 1

```

في كل مرة يتم فيها تحديث محتويات النافذة، يجب أيضًا تحديث عدد الحركات المعروضة على الشاشة:

```python
    def draw_window(self):
        ...
        game_text = self.game_font.render("Moves: " + str(self.moves), True, (255, 0, 0))
        self.window.blit(game_text, (25, self.height * self.scale + 10))
        ...
```

## لعبة جديدة والخروج من اللعبة

بعد ذلك، لنضف أوامر لوحة مفاتيح لبدء لعبة جديدة بمفتاح F2 والخروج من اللعبة بمفتاح Esc. كلاهما سهل التنفيذ إلى حد ما:

```python
    def check_events(self):
        ...
                if event.key == pygame.K_F2:
                    self.new_game()
                if event.key == pygame.K_ESCAPE:
                    exit()
        ...
```

يجب أن نضيف أيضًا استدعاء `self.moves = 0` في `new_game` لإعادة تعيين العداد عند بدء لعبة جديدة.

## اكتشاف الفوز

أخيرًا، نريد اكتشاف متى حل اللاعب اللعبة. اللعبة محلولة عندما تكون جميع الصناديق على أهداف. يمكننا التحقق من ذلك بعد كل حركة:

```python
    def move(self, move_y, move_x):
        ...
        self.moves += 1
        
        if self.check_win():
            print("Congratulations, you solved the puzzle!")
```

طريقة `check_win` تتحقق مما إذا كان هناك أي صناديق (قيمة 3) متبقية على الخريطة:

```python
    def check_win(self):
        for row in self.map:
            if 3 in row:
                return False
        return True
```

إذا كانت جميع الصناديق على أهداف (قيمة 5)، فلا توجد قيمة 3 في الخريطة، وتعيد الطريقة True.

يمكننا أيضًا عرض رسالة فوز على الشاشة بدلاً من طباعتها فقط في وحدة التحكم:

```python
    def draw_window(self):
        ...
        if self.check_win():
            game_text = self.game_font.render("Congratulations, you solved the puzzle!", True, (255, 0, 0))
            self.window.blit(game_text, (25, self.height * self.scale + 10))
        else:
            game_text = self.game_font.render("Moves: " + str(self.moves), True, (255, 0, 0))
            self.window.blit(game_text, (25, self.height * self.scale + 10))
        ...
```

الآن أصبحت اللعبة مكتملة مع عداد حركات، إمكانية بدء لعبة جديدة، الخروج، واكتشاف الفوز!
