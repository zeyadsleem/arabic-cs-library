---
title: "مشروع لعبة"
lang: ar
source: "https://programming-26.mooc.fi/part-14/1-game-project"
---

في هذا الجزء سنستخدم pygame لإنشاء لعبة أكبر إلى حد ما. إنها تنويع للعبة Sokoban الكلاسيكية، حيث يحرك اللاعب روبوتًا على شبكة ويدفع الصناديق إلى المواقع الصحيحة بأقل عدد ممكن من الحركات.

ستبدو النتيجة النهائية كالتالي:

<img src="game.png">

## خريطة اللعبة

لنبدأ برسم الخريطة المستخدمة في اللعبة. يتم تنفيذ اللعبة في الفئة `Sokoban`، التي ستحتوي على جميع الوظائف المطلوبة للعب اللعبة. في هذه المرحلة الأولى، محتويات الفئة كالتالي:

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
                self.window.blit(self.images[self.map[y][x]], (x * self.scale, y * self.scale))
        pygame.display.flip()
```

الخريطة عبارة عن قائمة ثنائية الأبعاد (قائمة قوائم). القيمة 1 تمثل جدارًا، و 0 تمثل أرضية، و 2 تمثل هدفًا، و 3 تمثل صندوقًا، و 4 تمثل الروبوت، و 5 تمثل صندوقًا على هدف (تم)، و 6 تمثل روبوتًا على هدف.

الطريقة `load_images` تحمل الصور السبعة المطلوبة للعبة. الصور تسمى floor.png و wall.png و target.png و box.png و robot.png و done.png و target_robot.png.

الطريقة `main_loop` هي حلقة اللعبة الرئيسية (game loop). تستدعي `check_events` للتعامل مع الأحداث (مثل إغلاق النافذة) و `draw_window` لرسم محتويات النافذة.

الطريقة `draw_window` ترسم كل مربع من الخريطة باستخدام الصورة المقابلة من القائمة `self.images`. تقوم بالحلقة عبر جميع إحداثيات y و x وتضع الصورة في الموضع الصحيح.

إذا قمت بتشغيل البرنامج الآن، يجب أن ترى نافذة لعبة تعرض الخريطة.
