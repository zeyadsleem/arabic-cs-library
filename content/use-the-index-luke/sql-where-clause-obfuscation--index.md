---
title: "الشروط المُعتَّمة"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/obfuscation
---

تعرض الأقسام التالية بعض الطرق الشائعة لتعتيم الشروط. والشروط المُعتَّمة (obfuscated conditions) هي عبارات `where` تُصاغ بطريقة تمنع الاستخدام السليم للفهرس. وهذا القسم مجموعة من الأنماط المضادة التي ينبغي لكل مطوّر أن يعرفها ويتجنبها.

## المحتويات

1. *[التواريخ](/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index)* — انتبه انتباهاً خاصاً لأنواع `DATE`
2. *[السلاسل الرقمية](/book/use-the-index-luke/sql-where-clause-obfuscation-numeric-strings/index)* — لا تخلط الأنواع
3. *[دمج الأعمدة](/book/use-the-index-luke/sql-where-clause-obfuscation-concatenation/index)* — استخدم عبارات `where` زائدة
4. *[المنطق الذكي](/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index)* — أذكى طريقة لإبطاء SQL
5. *[الرياضيات](/book/use-the-index-luke/sql-where-clause-obfuscation-math/index)* — قواعد البيانات لا تحل المعادلات
