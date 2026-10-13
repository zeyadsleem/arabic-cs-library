---
title: "الروبوت والصناديق"
lang: ar
source: "https://programming-26.mooc.fi/part-14/2-robot-and-boxes"
---

أصعب شيء في تنفيذ لعبة على نمط Sokoban يميل إلى أن يكون تحريك الروبوت بحيث يمكنه دفع الصناديق في الاتجاه المطلوب. يجب أن تكون اللعبة قادرة على معرفة متى يمكن للروبوت التحرك في اتجاه محدد، والقدرة على التعامل مع أي موقف يجب أن يتحرك فيه صندوق أيضًا. لنواجه هذا التحدي الآن.

## التعامل مع أحداث المفاتيح

يرشد اللاعب الروبوت بمفاتيح الأسهم الأربعة، لذا يجب أن يكون معالج الأحداث (event handler) قادرًا أيضًا على التفاعل مع أحداث المفاتيح المناسبة:

```python
    def check_events(self):
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    self.move(0, -1)
                if event.key == pygame.K_RIGHT:
                    self.move(0, 1)
                if event.key == pygame.K_UP:
                    self.move(-1, 0)
                if event.key == pygame.K_DOWN:
                    self.move(1, 0)

            if event.type == pygame.QUIT:
                exit()
```

الآن كلما ضغط اللاعب على مفتاح سهم، يتم استدعاء الطريقة `move` مع زوج مناسب من الوسائط. الوسيط الأول يحتوي على الحركة في الاتجاه الرأسي، بينما يحتوي الثاني على الحركة في الاتجاه الأفقي.

## البحث عن الروبوت

يجب أن تعرف اللعبة موقع الروبوت لتحريكه بشكل صحيح. لنضف الطريقة `find_robot` التي تحدد موقع الروبوت:

```python
    def find_robot(self ):
        for y in range(self.height):
            for x in range(self.width):
                if self.map[y][x] in [4, 6]:
                    return (y, x)
```

الطريقة تمر على جميع المربعات في شبكة اللعبة وتعيد إحداثيات المربع الذي يحتوي إما على الرقم 4 (الروبوت بمفرده) أو الرقم 6 (الروبوت على مربع هدف).

الفكرة هي أنه كلما ضغط اللاعب على مفتاح سهم، يتم أولًا تحديد موقع الروبوت، ثم يتم استدعاء الطريقة `move` مع الاتجاه المطلوب. تقوم الطريقة `move` بعد ذلك بالتحقق مما إذا كان الروبوت يمكنه التحرك في ذلك الاتجاه، وإذا كان الأمر كذلك، تقوم بتحديث الخريطة وفقًا لذلك.

## تنفيذ الحركة

لنقم بتنفيذ الطريقة `move`. تحتاج إلى التحقق من عدة حالات:

1. إذا كان المربع المستهدف جدارًا (1)، لا يمكن للروبوت التحرك.
2. إذا كان المربع المستهدف أرضية (0) أو هدفًا (2)، يمكن للروبوت التحرك هناك ببساطة.
3. إذا كان المربع المستهدف صندوقًا (3) أو صندوقًا على هدف (5)، نحتاج إلى التحقق مما إذا كان يمكن دفع الصندوق.
4. إذا كان المربع المستهدف يحتوي على الروبوت على هدف (6)، نتعامل معه كما لو كان الروبوت على أرضية.

إليك التنفيذ:

```python
    def move(self, move_y, move_x):
        robot_y, robot_x = self.find_robot()
        target_y = robot_y + move_y
        target_x = robot_x + move_x
        
        # Check what's in the target square
        target_content = self.map[target_y][target_x]
        
        # Wall - cannot move
        if target_content == 1:
            return
        
        # Empty floor or target - simple move
        if target_content in [0, 2]:
            self.map[robot_y][robot_x] = 0 if self.map[robot_y][robot_x] == 4 else 2
            self.map[target_y][target_x] = 4 if target_content == 0 else 6
            return
        
        # Box or box on target - try to push
        if target_content in [3, 5]:
            box_target_y = target_y + move_y
            box_target_x = target_x + move_x
            box_target_content = self.map[box_target_y][box_target_x]
            
            # Can push if the square beyond is floor or target
            if box_target_content in [0, 2]:
                # Move the box
                self.map[box_target_y][box_target_x] = 3 if box_target_content == 0 else 5
                # Move the robot
                self.map[robot_y][robot_x] = 0 if self.map[robot_y][robot_x] == 4 else 2
                self.map[target_y][target_x] = 4 if target_content == 3 else 6
                return
```

الطريقة أولاً تجد موقع الروبوت، ثم تحسب الإحداثيات المستهدفة بناءً على اتجاه الحركة. ثم تتحقق من محتوى المربع المستهدف وتتصرف وفقًا لذلك.

إذا كان المربع المستهدف صندوقًا، تتحقق مما إذا كان المربع الذي بعده (في نفس الاتجاه) فارغًا أو هدفًا. إذا كان الأمر كذلك، يتم دفع الصندوق ويتحرك الروبوت إلى مربع الصندوق السابق.

لاحظ كيف نتعامل مع القيم 4 و 6 (الروبوت على أرضية/هدف) و 3 و 5 (الصندوق على أرضية/هدف) للحفاظ على حالة الأهداف بشكل صحيح.

إذا قمت بتشغيل اللعبة الآن، يجب أن تكون قادرًا على تحريك الروبوت ودفع الصناديق!
