---
title: "العمليات"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/mysql/operations
---

مرجع MySQL: [http://dev.mysql.com/doc/refman/5.6/en/explain-output.html](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html)

## الوصول إلى الفهرس والجدول

تنزع خطة شرح MySQL إلى إعطاء إحساس زائف بالأمان لأنها تقول الكثير عن الفهارس المستخدمة. ومع أن ذلك صحيح تقنياً، فهو لا يعني أنها تستخدم الفهرس بكفاءة. وأهم المعلومات في عمود `TYPE` من خرج `explain` في MySQL — لكن حتى هناك، لا تدل الكلمة المفتاحية `INDEX` على فهرسة سليمة.

eq_ref, constتنفّذ اجتياز شجرة B للعثور على *صف واحد* (مثل `INDEX UNIQUE SCAN`) وتجلب أعمدة إضافية من الجدول عند الحاجة (`TABLE ACCESS BY INDEX ROWID`). وتستخدم قاعدة البيانات هذه العملية إذا ضمن مفتاح أساسي أو قيد فريد أن معايير البحث لن تطابق أكثر من مدخل واحد. انظر «[Using Index](#index-only-scan)» لمعرفة ما إذا كان الوصول إلى الجدول يحدث أم لا.

ref, range

تنفّذ اجتياز شجرة B، وتمشي عبر العقد الورقية للعثور على جميع مدخلات الفهرس المطابقة (على غرار `INDEX RANGE SCAN`)، وتجلب أعمدة إضافية من مخزن الجدول الأساسي عند الحاجة (`TABLE ACCESS BY INDEX ROWID`). انظر «[Using Index](#index-only-scan)» لمعرفة ما إذا كان الوصول إلى الجدول يحدث أم لا.

index

تقرأ الفهرس بأكمله — جميع الصفوف — بترتيب الفهرس (على غرار `INDEX FULL SCAN`).

ALL

تقرأ الجدول بأكمله — جميع الصفوف والأعمدة — كما هو مخزّن على القرص. وإلى جانب معدلات الإدخال/الإخراج العالية، يجب أن يفحص مسح الجدول أيضاً جميع صفوفه، لذا قد يضع حِملاً كبيراً على المعالج أيضاً. انظر أيضاً [«*المسح الكامل للجدول*»](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan).

Using Index (في عمود «Extra»)

عندما يُظهر عمود «Extra» عبارة «Using Index»، فهذا يعني أن الجدول لا يُوصَل إليه لأن الفهرس يملك جميع البيانات المطلوبة؛ أي فكّر فيها كـ«استخدام الفهرس فقط». غير أنه إذا استُخدم فهرس عنقودي (مثل فهرس `PRIMARY` عند استخدام InnoDB) فلا تظهر «Using Index» في عمود Extra مع أنه مسح للفهرس فقط من الناحية التقنية. انظر أيضاً [«*تجميع البيانات: القوة الثانية للفهرسة*»](/book/use-the-index-luke/sql-clustering/index).

PRIMARY (في عمود «key» أو «possible_keys»)

`PRIMARY` هو اسم الفهرس المنشأ تلقائياً للمفتاح الأساسي.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-mysql-op&utm_medium=web&utm_content=ap-plan-mysql-op-idx-tbl)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

## الترتيب والتجميع

using filesort (في عمود «Extra»)تشير عبارة «using filesort» في عمود Extra إلى عملية فرز صريحة — بصرف النظر عن مكان الفرز (الذاكرة الرئيسية أو القرص). وتحتاج «Using filesort» إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). انظر أيضاً [«*فهرسة Order By*»](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index).

## استعلامات Top-N

ضمني: لا «using filesort» في عمود «Extra»لا تُظهر خطة تنفيذ MySQL استعلام Top-N صراحةً. وإذا كنت تستخدم صيغة `limit` ولم ترَ «using filesort» في عمود extra، فهو يُنفَّذ على نحو متدفق. انظر أيضاً [«*الاستعلام عن صفوف Top-N*»](/book/use-the-index-luke/sql-partial-results-top-n-queries/index).
