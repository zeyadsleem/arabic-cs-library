---
title: "تقنيات pygame إضافية"
lang: ar
source: "https://programming-26.mooc.fi/part-13/4-more-pygame-techniques"
---

> **أهداف التعلّم**
>
> بعد هذا القسم
>
> - ستعرف عنوان نافذة pygame
> - ستتمكّن من رسم الأشكال بمساعدة pygame
> - ستعرف كيفية عرض نص داخل نافذتك


## عنوان النافذة

ستبدو برامجك أكثر احترافيةً إذا احتوى عنوان النافذة على اسم البرنامج الفعلي بدلًا من «نافذة pygame». يُعيَّن العنوان عبر الدالة `pygame.display.set_caption`:

```python
pygame.display.set_caption("Great Adventure")
```

## رسم الأشكال

يرسم البرنامج التالي مستطيلًا ودائرة وخطًا على الشاشة:

```python
import pygame

pygame.init()
display = pygame.display.set_mode((640, 480))
display.fill((0, 0, 0))

pygame.draw.rect(display, (0, 255, 0), (50, 100, 200, 250))
pygame.draw.circle(display, (255, 0, 0), (200, 150), 40)
pygame.draw.line(display, (0, 0, 255), (80, 120), (300, 160), 2)

pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

يبدو تشغيل الشيفرة السابقة بهذا الشكل:

![pygame_shapes.gif](/images/mooc/part-13/pygame_shapes.gif)

## رسم النص

يُرسم النص في pygame على خطوتين: ننشئ أولًا صورةً تحتوي على النص المطلوب، ثم نرسم هذه الصورة على الشاشة. تجري العملية هكذا:

```python
import pygame

pygame.init()
display = pygame.display.set_mode((640, 480))
display.fill((0, 0, 0))

game_font = pygame.font.SysFont("Arial", 24)
text = game_font.render("Moikka!", True, (255, 0, 0))
display.blit(text, (100, 50))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

يبدو تشغيل الشيفرة السابقة بهذا الشكل:

![pygame_text.gif](/images/mooc/part-13/pygame_text.gif)

هنا تنشئ الطريقة `pygame.font.SysFont` كائنًا (object) للخط، يستخدم خط النظام Arial بحجم 24. ثم تنشئ الطريقة `render` صورةً للنص المحدّد باللون المُعطى. وتُرسم هذه الصورة على النافذة عبر الطريقة `blit` تمامًا كما في المثال السابق.

تنبيه: تختلف الخطوط المتوفرة من نظام إلى آخر. فإذا لم يكن خط Arial متوفرًا على النظام الذي يُنفَّذ عليه هذا البرنامج — رغم أن Arial خط شائع جدًا ومتوفر على معظم الأنظمة — استُخدم خط النظام الافتراضي بدلًا منه. وإذا احتجت خطًا معيّنًا للعبتك، فيمكنك وضع ملف الخط داخل مجلد اللعبة وتحديد مساره لطريقة `pygame.font.Font`.

## التمارين

فيما يلي تمارين أكثر تقدّمًا للممارسة على ما تعلّمته في هذا القسم من مادة المقرر.

> **تمرين برمجي: الساعة**
>
> اكتب برنامجًا يعرض واجهة ساعة تُظهر وقت النظام. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_clock.gif](/images/mooc/part-13/pygame_clock.gif)


> **تمرين برمجي: الكويكبات**
>
> أنشئ لعبة تسقط فيها الكويكبات من السماء. يحرّك اللاعب روبوتًا إلى اليمين وإلى اليسار ويحاول جمع الصخور الساقطة. يحصل اللاعب على نقطة لكل كويكب يجمعه، ويظهر مجموع النقاط في أعلى النافذة. تنتهي اللعبة عندما يفوّت اللاعب كويكبًا. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:

![pygame_asteroids.gif](/images/mooc/part-13/pygame_asteroids.gif)

تنبيه: الحركة أعلاه مأخوذة من النسخة الفنلندية من المقرر. يمكنك استخدام كلمة «النقاط» بدلًا من الكلمة الفنلندية «Pisteet» الظاهرة في الصورة.

يحتوي قالب التمرين على الصورة `rock.png` للكويكب.


يرجى الإجابة على استبيان سريع حول هذا القسم من المقرر.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 9b57c7ea-8983-507f-93e7-243be766e2ad)
