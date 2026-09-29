---
title: "معامل التساوي"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/the-equals-operator
---

معامل التساوي (equality operator) هو في الوقت نفسه أكثر معاملات SQL بداهةً وأكثرها استخداماً. ولا تزال أخطاء الفهرسة التي تؤثر في الأداء شائعة جداً، وعبارات `where` التي تجمع شروطاً متعددة معرّضة لذلك بشكل خاص.

يعرض هذا القسم كيفية التحقق من استخدام الفهرس، ويشرح كيف يمكن للفهارس المُسلسلة (concatenated indexes) تحسين الشروط المركّبة. ولتسهيل الفهم، سنحلّل استعلاماً بطيئاً لنرى الأثر الواقعي للأسباب التي شُرحت في [الفصل الأول](/book/use-the-index-luke/sql-anatomy/index).

## المحتويات

1. *[المفاتيح الأساسية](/book/use-the-index-luke/sql-where-clause-the-equals-operator-primary-keys/index)* — التحقق من استخدام الفهرس
2. *[المفاتيح المُسلسلة](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index)* — فهارس متعددة الأعمدة
3. *[الفهارس البطيئة، الجزء الثاني](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index)* — المكوّن الأول، مرة أخرى
