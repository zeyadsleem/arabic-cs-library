---
title: "أنماط التسلسل"
lang: ar
source: https://gameprogrammingpatterns.com/
---

^title Sequencing Patterns

ألعاب الفيديو ممتعة في المقام الأول لأنها تنقلنا إلى مكانٍ آخر. لبضع دقائق
(ولنكن صادقين مع أنفسنا: لزمنٍ أطول بكثير) نصبح سكان عالمٍ افتراضي. وإنشاء هذه
العوالم إحدى أعلى متع أن تكون مبرمج ألعاب.

أحد الجوانب التي تتسم بها معظم عوالم الألعاب هذه هو *الزمن* — فالعالم الاصطناعي
حيّ يتنفّس بإيقاعه الخاص. وكبناة عوالم، علينا أن نخترع الزمن ونصنع التروس التي
تُدير ساعة لعبتنا الكبرى.

الأنماط في هذا القسم أدوات للقيام بذلك تماماً. فـ [حلقة
اللعبة](/book/game-programming-patterns/game-loop/index) هي المحور المركزي الذي تدور حوله الساعة. وتسمع الكائنات
نبضها عبر [دوال التحديث](/book/game-programming-patterns/update-method/index). ويمكننا إخفاء الطابع المتسلسل
للحاسوب خلف واجهة من لقطات للحظات زمنية باستخدام [المخزن المؤقت
المزدوج](/book/game-programming-patterns/double-buffer/index)، بحيث يبدو العالم وكأنه يتحدّث في وقت واحد.

## الأنماط

* [المخزن المؤقت المزدوج (Double Buffer)](/book/game-programming-patterns/double-buffer/index)
* [حلقة اللعبة (Game Loop)](/book/game-programming-patterns/game-loop/index)
* [دالة التحديث (Update Method)](/book/game-programming-patterns/update-method/index)
