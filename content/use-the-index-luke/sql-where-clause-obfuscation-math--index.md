---
title: "الرياضيات"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/obfuscation/math
---

هناك فئة أخرى من التعتيم ذكية وتمنع الاستخدام السليم للفهرس. فهي لا تستخدم تعبيرات منطقية بل عملية حسابية.

تأمّل العبارة التالية. هل يمكنها استخدام فهرس على `NUMERIC_NUMBER`؟

```sql
SELECT numeric_number
  FROM table_name
 WHERE numeric_number - 1000 > ?
```

وبالمثل، هل يمكن للعبارة التالية استخدام فهرس على `A` و`B`—وأنت تختار الترتيب؟

```sql
SELECT a, b
  FROM table_name
 WHERE 3*a + 5 = b
```

لنضع هذين السؤالين في منظور مختلف؛ لو كنت تطوّر قاعدة بيانات (database) SQL، هل ستضيف حلال معادلات؟ معظم موردي قواعد البيانات يقولون ببساطة «لا!»، وبالتالي لا يستخدم أي من المثالين الفهرس.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-obf-math&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

يمكنك حتى استخدام الرياضيات لتعتيم شرط عن قصد—[كما فعلنا سابقاً في البحث النصي الكامل بـ`LIKE`](/book/use-the-index-luke/sql-where-clause-obfuscation-concatenation/index). ويكفي إضافة صفر، مثلاً:

```sql
SELECT numeric_number
  FROM table_name
 WHERE numeric_number + 0 = ?
```

ومع ذلك يمكننا فهرسة هذه التعبيرات بـ[فهرس قائم على دالة](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index) إذا استخدمنا الحسابات بذكاء وحوّلنا عبارة `where` كما نحل معادلة:

```sql
SELECT a, b
  FROM table_name
 WHERE 3*a - b = -5
```

لقد نقلنا مراجع الجدول إلى طرف والمعاملات الثابتة إلى الطرف الآخر. ثم يمكننا إنشاء فهرس قائم على دالة للطرف الأيسر من المعادلة:

```sql
CREATE INDEX math ON table_name (3*a - b)
```
