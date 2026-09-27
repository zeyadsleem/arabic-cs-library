---
title: "أنماط فصل الترابط"
lang: ar
source: https://gameprogrammingpatterns.com/
---

^title أنماط فصل الترابط

بمجرد أن تتقن لغة برمجة، تصبح كتابة شيفرة تفعل ما تريده سهلة إلى حدٍّ كبير. أما
الصعب هو كتابة شيفرة يسهل تكيّفها حين تتغيّر *متطلباتك*. فنادراً ما نتمتع برفاهية
مجموعة ميزات مثالية قبل أن نشغّل محرّرنا.

ولنا أداة قوية تجعل التغيير أسهل، وهي *فصل الترابط* (decoupling). فحين نقول إن قطعتَي
شيفرة «مفصولتان في الترابط»، فإننا نعني أن التغيير في إحداهما لا يستلزم عادةً تغييراً
في الأخرى. وحين تغيّر ميزة ما في لعبتك، كلما قلّت المواضع في الشيفرة التي عليك
لمسها، كان الأمر أسهل.

تفصل [المكوّنات](/book/game-programming-patterns/component/index) مجالات مختلفة في لعبتك عن بعضها داخل كيان واحد
يملك جوانب من جميعها. ويفصل [طوابير الأحداث](/book/game-programming-patterns/event-queue/index) كائنين
يتواصلان مع بعضهما، ساكنياً و*في الزمن* معاً. وتتيح
[محدّدات الخدمات](/book/game-programming-patterns/service-locator/index) للشيفرة الوصول إلى مرفق دون أن ترتبط
بالشيفرة التي توفّره.

## الأنماط

* [المكوّن](/book/game-programming-patterns/component/index)
* [طابور الأحداث](/book/game-programming-patterns/event-queue/index)
* [محدّد الخدمات](/book/game-programming-patterns/service-locator/index)
