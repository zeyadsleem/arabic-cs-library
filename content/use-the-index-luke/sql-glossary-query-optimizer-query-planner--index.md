---
title: "المُحسِّن - مُحسِّن الاستعلام - مخطِّط الاستعلام"
lang: ar
source: https://use-the-index-luke.com/sql/glossary/query-optimizer-query-planner
---

يترجم *المُحسِّن* (Optimizer) في Oracle أو *مُحسِّن الاستعلام* (Query Optimizer) في SQL Server وMySQL أو *مخطِّط الاستعلام* (Query Planner) في PostgreSQL عبارة SQL إلى برنامج قابل للتنفيذ في صورة [خطة تنفيذ](/book/use-the-index-luke/sql-glossary-execution-plan-explain-plan/index)، تماماً كما يترجم المترجم الشيفرة المصدرية إلى برنامج قابل للتنفيذ.

وهناك عموماً نوعان من المُحسِّنات:

المُحسِّن القائم على القواعد (Rule Based Optimizer — RBO)

تتبع المُحسِّنات القائمة على القواعد مجموعة صارمة من القواعد لإنشاء خطة التنفيذ — مثل استخدام فهرس دائماً إذا أمكن.

المُحسِّن القائم على التكلفة (Cost Based Optimizer — CBO)

تولّد المُحسِّنات القائمة على التكلفة خطط تنفيذ مختلفة كثيرة، وتطبّق نموذج تكلفة عليها جميعاً، وتختار الخطة ذات أفضل قيمة تكلفة للتنفيذ.

وسيقارن المُحسِّن القائم على التكلفة، مثلاً، التكلفة المقدَّرة لاستعلام يستخدم فهرساً بتكلفة قراءة الجدول بأكمله. وقد يختار الوصول الكامل إلى الجدول إذا دلّت قيم التكلفة على أن الوصول الكامل أكثر كفاءة من البحث في الفهرس.

والمُحسِّنات القائمة على التكلفة هي التطبيق السائد.

وأهم القرارات التي تتخذها المُحسِّنات هي:

- اختيار خوارزمية الربط وترتيب الربط
- استخدام الفهارس

ولا تقوم المُحسِّنات بما يلي:

- تحسين الجداول أو الفهارس
- تحسين SQL المشوَّش
- إعادة تجميع البيانات (defragmentation)

#### روابط

- [استخدام وسائط الربط لتقليل كلفة المُحسِّن](/book/use-the-index-luke/sql-where-clause-bind-parameters/index)
- مقال: «[التخطيط لإعادة الاستخدام](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index)» حول تخزين خطط التنفيذ مؤقتاً
- المسرد: [خطة التنفيذ](/book/use-the-index-luke/sql-glossary-execution-plan-explain-plan/index)
