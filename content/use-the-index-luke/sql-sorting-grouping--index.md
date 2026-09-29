---
title: "الترتيب والتجميع"
lang: ar
source: https://use-the-index-luke.com/sql/sorting-grouping
---

الفرز عملية مستهلكة للموارد بشدة؛ فهو يحتاج قدراً كبيراً من وقت المعالج، لكن المشكلة الأساسية أن قاعدة البيانات يجب أن تخزّن النتائج مؤقتاً. وعلى أي حال، يجب أن تقرأ عملية الفرز المدخلات كاملة قبل أن تنتج الخرج الأول. ولا يمكن تنفيذ عمليات الفرز على نحو متدفق، وقد يصبح ذلك مشكلة مع مجموعات البيانات الكبيرة.

يوفّر الفهرس تمثيلاً مرتَّباً للبيانات المفهرسة: وقد شُرح هذا المبدأ في [الفصل 1](/book/use-the-index-luke/sql-anatomy/index). ويمكننا القول أيضاً إن الفهرس يخزّن البيانات مرتَّبة مسبقاً؛ فهو في الحقيقة مرتَّب كما لو استُخدم تعريف الفهرس في جملة `order by`. فلا عجب إذن أن نستطيع استخدام الفهارس لتجنّب عملية الفرز من أجل تلبية جملة `order by`.

ومن المفارقات أن `INDEX RANGE SCAN` يصبح أيضاً غير فعّال مع مجموعات البيانات الكبيرة — خصوصاً عندما يعقبه وصول إلى الجدول. وقد يلغي ذلك التوفير الناتج عن تجنّب عملية الفرز، وقد يكون [`FULL TABLE SCAN`](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan) مع عملية فرز صريحة أسرع في هذه الحالة. ومرة أخرى، مهمة المُحسِّن تقييم خطط التنفيذ المختلفة واختيار أفضلها.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-order&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

غير أن تنفيذ `order by` المفهرس لا يوفّر جهد الفرز فحسب، بل يستطيع أيضاً إرجاع النتائج الأولى دون معالجة بيانات المدخلات كلها. ويُنفَّذ `order by` إذن على نحو *متدفق*. ويشرح [الفصل 7*النتائج الجزئية*](/book/use-the-index-luke/sql-partial-results/index) كيفية استغلال التنفيذ المتدفق لتنفيذ استعلامات ترقيم فعّالة. وهذا ما يجعل `order by` المتدفق مهماً إلى حد أنني أسميه *القوة الثالثة للفهرسة*.

#### ملاحظة

[اجتياز شجرة B](/book/use-the-index-luke/sql-anatomy-the-tree/index) هو القوة الأولى للفهرسة.

[العنقدة](/book/use-the-index-luke/sql-clustering/index) هي القوة الثانية للفهرسة.

`order by` المتدفق هو القوة الثالثة للفهرسة.

يشرح هذا الفصل كيفية استخدام فهرس لتنفيذ `order by` متدفق. ولهذا الغرض يجب أن نولي اهتماماً خاصاً للتفاعلات مع جملة `where` وكذلك لمُعدِّلَي `ASC` و`DESC`. ويُختتم الفصل بتطبيق هذه التقنيات على جمل `group by` أيضاً.

## المحتويات

1. *[فهرسة Order By](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index)* — التفاعلات مع جملة `where`
2. *[`ASC`/`DESC` و`NULL FIRST`/`LAST`](/book/use-the-index-luke/sql-sorting-grouping-order-by-asc-desc-nulls-last/index)* — تغيير ترتيب الفهرس
3. *[فهرسة Group By](/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index)* — تدفّق `group by`
