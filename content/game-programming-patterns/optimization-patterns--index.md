---
title: "أنماط التحسين"
lang: ar
source: https://gameprogrammingpatterns.com/
---

^title أنماط التحسين

بينما رفع مدّ العتاد المتسارع وأسرع وأسرع معظم البرمجيات فوق مستوى القلق بشأن الأداء
(performance)، تُعدّ الألعاب إحدى الحالات المتبقّية القليلة. فاللاعبين يريدون دائماً
تجارب أغنى وأكثر واقعية وإثارة. والشاشات مزدحمة بألعاب تتنافس على انتباه اللاعب --
وأمواله! -- واللعبة التي تدفع العتاد إلى أبعد حدّ هي التي تفوز غالباً.

والتحسين لأغراض الأداء فنّ عميق يمسّ جميع جوانب البرمجيات. فمبرمجو المستوى المنخفض
يتقنون سِمات معماريات العتاد الغريبة العديدة. وفي الوقت نفسه، يتنافس باحثو الخوارزميات
على البرهان الرياضي لصالح مَن إجراءَه الأكثر كفاءة.

وهنا أعرّض عليك بضعة أنماط متوسّطة المستوى تُستخدم كثيراً لتسريع اللعبة. فـ[محلية
البيانات](/book/game-programming-patterns/data-locality/index) تقدّمك إلى تسلسل الذاكرة في الحاسوب الحديث وكيف يمكنك
الاستفادة منه. ويساعدك نمط [علامة الوسخ](/book/game-programming-patterns/dirty-flag/index) على تفادي الحوسبة
غير الضرورية، بينما تساعدك [مجمّعات الكائنات](/book/game-programming-patterns/object-pool/index) على تفادي التخصيص
غير الضروري. و[التقسيم المكاني](/book/game-programming-patterns/spatial-partition/index) يسرّع العالم الافتراضي
وترتيب سكانه في الفضاء.

## الأنماط

* [محلية البيانات](/book/game-programming-patterns/data-locality/index)
* [علامة الوسخ](/book/game-programming-patterns/dirty-flag/index)
* [مجمّع الكائنات](/book/game-programming-patterns/object-pool/index)
* [التقسيم المكاني](/book/game-programming-patterns/spatial-partition/index)
