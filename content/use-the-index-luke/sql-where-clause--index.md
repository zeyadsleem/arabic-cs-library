---
title: "عبارة where"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause
---

وصف [الفصل السابق](/book/use-the-index-luke/sql-anatomy/index) بنية الفهارس وشرح سبب ضعف أداء الفهارس. وفي الخطوة التالية نتعلّم كيف نكتشف هذه المشكلات ونتجنبها في عبارات SQL. نبدأ بالنظر إلى عبارة `where`.

تحدّد عبارة `where` شرط البحث في عبارة SQL، وبذلك تقع في المجال الوظيفي الأساسي للفهرس: العثور على البيانات بسرعة. ورغم أن لعبارة `where` تأثيراً هائلاً في الأداء، فإنها غالباً ما تُصاغ بإهمال بحيث تضطر قاعدة البيانات (database) إلى مسح جزء كبير من الفهرس. والنتيجة: عبارة `where` سيئة الصياغة هي المكوّن الأول لاستعلام بطيء.

يشرح هذا الفصل كيف تؤثر مختلف المعاملات في استخدام الفهرس، وكيف نضمن أن يكون الفهرس صالحاً لأكبر عدد ممكن من الاستعلامات. ويعرض القسم الأخير أنماطاً مضادة شائعة (anti-patterns) ويقدّم بدائل تحقق أداءً أفضل.

## المحتويات

1. *[معامل التساوي](/book/use-the-index-luke/sql-where-clause-the-equals-operator/index)* — بحث دقيق بالمفتاح*[المفاتيح الأساسية](/book/use-the-index-luke/sql-where-clause-the-equals-operator-primary-keys/index)* — التحقق من استخدام الفهرس
2. *[المفاتيح المُسلسلة](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index)* — فهارس متعددة الأعمدة
3. *[الفهارس البطيئة، الجزء الثاني](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index)* — المكوّن الأول، مرة أخرى

*[الدوال](/book/use-the-index-luke/sql-where-clause-functions/index)* — استخدام الدوال في عبارة `where`

1. *[بحث غير حساس لحالة الأحرف](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index)* — `UPPER` و`LOWER`
2. *[الدوال المعرّفة من المستخدم](/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index)* — قيود الفهارس القائمة على الدوال
3. *[الإفراط في الفهرسة](/book/use-the-index-luke/sql-where-clause-functions-over-indexing/index)* — تجنّب التكرار

*[متغيّرات الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index)* — للأمان والأداء

*[البحث عن النطاقات](/book/use-the-index-luke/sql-where-clause-searching-for-ranges/index)* — ما بعد التساوي

1. *[أكبر وأصغر و`BETWEEN`](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index)* — ترتيب الأعمدة مرة أخرى
2. *[فهرسة مرشّحات `LIKE` في SQL](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index)* — `LIKE` ليس للبحث النصي الكامل
3. *[دمج الفهارس](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index)* — لماذا لا نستخدم فهرساً لكل عمود؟

*[الفهارس الجزئية](/book/use-the-index-luke/sql-where-clause-partial-and-filtered-indexes/index)* — فهرسة صفوف مختارة

*[`NULL` في قاعدة بيانات Oracle](/book/use-the-index-luke/sql-where-clause-null/index)* — خصوصية مهمة

1. *[`NULL` في الفهارس](/book/use-the-index-luke/sql-where-clause-null-index/index)* — كل فهرس هو فهرس جزئي
2. *[قيود `NOT NULL`](/book/use-the-index-luke/sql-where-clause-null-not-null-constraint/index)* — تؤثر في استخدام الفهارس
3. *[محاكاة الفهارس الجزئية](/book/use-the-index-luke/sql-where-clause-null-partial-index/index)* — باستخدام الفهرسة القائمة على الدوال

*[الشروط المُعتَّمة](/book/use-the-index-luke/sql-where-clause-obfuscation/index)* — أنماط مضادة شائعة

1. *[التواريخ](/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index)* — انتبه انتباهاً خاصاً لأنواع `DATE`
2. *[السلاسل الرقمية](/book/use-the-index-luke/sql-where-clause-obfuscation-numeric-strings/index)* — لا تخلط الأنواع
3. *[دمج الأعمدة](/book/use-the-index-luke/sql-where-clause-obfuscation-concatenation/index)* — استخدم عبارات `where` زائدة
4. *[المنطق الذكي](/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index)* — أذكى طريقة لإبطاء SQL
5. *[الرياضيات](/book/use-the-index-luke/sql-where-clause-obfuscation-math/index)* — قواعد البيانات لا تحل المعادلات
