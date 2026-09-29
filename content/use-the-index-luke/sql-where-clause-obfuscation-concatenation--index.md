---
title: "دمج الأعمدة"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/obfuscation/concatenation
---

يتناول هذا القسم تعتيماً شائعاً يؤثر في [الفهارس المُسلسلة](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index).

المثال الأول يتعلق مرة أخرى بأنواع [التاريخ والوقت](/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index) لكن في الاتجاه المعاكس. فاستعلام MySQL التالي يدمج عمودي تاريخ ووقت لتطبيق مرشّح نطاق عليهما معاً.

```sql
SELECT ...
  FROM ...
 WHERE ADDTIME(date_column, time_column)
     > DATE_ADD(now(), INTERVAL -1 DAY)
```

إنه يختار جميع السجلات من آخر 24 ساعة. ولا يستطيع الاستعلام استخدام فهرس مُسلسل على (`DATE_COLUMN`، `TIME_COLUMN`) استخداماً سليماً لأن البحث لا يجري على الأعمدة المفهرسة بل على بيانات مشتقة.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-obf-concat&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

يمكنك تجنّب هذه المشكلة باستخدام نوع بيانات يضم مكوّن تاريخ ووقت معاً (مثل `DATETIME` في MySQL). وحينها يمكنك استخدام هذا العمود دون نداء دالة:

```sql
SELECT ...
  FROM ...
 WHERE datetime_column
     > DATE_ADD(now(), INTERVAL -1 DAY)
```

للأسف، لا يكون تغيير الجدول ممكناً في كثير من الأحيان عند مواجهة هذه المشكلة.

والخيار التالي هو [فهرس قائم على دالة](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index) إذا كانت قاعدة البيانات تدعمه—رغم أن له كل العيوب [التي نوقشت سابقاً](/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index). وعند استخدام MySQL، لا تكون الفهارس القائمة على الدوال خياراً على أي حال.

لا يزال ممكناً كتابة الاستعلام بحيث تستطيع قاعدة البيانات استخدام فهرس مُسلسل على `DATE_COLUMN` و`TIME_COLUMN` مع [مُسند وصول](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index#imp-index-predicate-types)—جزئياً على الأقل. ولذلك نضيف شرطاً إضافياً على `DATE_COLUMN`.

```
 WHERE ADDTIME(date_column, time_column)
     > DATE_ADD(now(), INTERVAL -1 DAY)
   AND date_column
    >= DATE(DATE_ADD(now(), INTERVAL -1 DAY))
```

الشرط الجديد زائد تماماً لكنه مرشّح مباشر على `DATE_COLUMN` يمكن استخدامه كمُسند وصول. ورغم أن هذه التقنية ليست مثالية، فهي تقريب جيد بما يكفي عادةً.

#### نصيحة

استخدم شرطاً زائداً على العمود الأكثر أهمية عندما يجمع شرط نطاق بين عدة أعمدة.

وبالنسبة لـPostgreSQL، يُفضَّل استخدام [صيغة قيم الصف](/book/use-the-index-luke/sql-partial-results-fetch-next-page/index#ch07-paging-row-values-example).

يمكنك أيضاً استخدام هذه التقنية عند تخزين التاريخ والوقت في أعمدة نصية، لكن عليك استخدام تنسيقات تاريخ ووقت تعطي ترتيباً زمنياً عند الفرز معجمياً—مثل ما تقترحه [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) (`YYYY-MM-DD HH:MM:SS`). ويستخدم المثال التالي دالة `TO_CHAR` في قاعدة بيانات Oracle لهذا الغرض:

```sql
SELECT ...
  FROM ...
 WHERE date_string || time_string
     > TO_CHAR(sysdate - 1, 'YYYY-MM-DD HH24:MI:SS')
   AND date_string
    >= TO_CHAR(sysdate - 1, 'YYYY-MM-DD')
```

سنواجه مشكلة تطبيق شرط نطاق على عدة أعمدة مرة أخرى في القسم المعنون [«*الترقيم عبر النتائج*»](/book/use-the-index-luke/sql-partial-results-fetch-next-page/index). وسنستخدم أيضاً طريقة التقريب نفسها للتخفيف منها.

أحياناً تكون لدينا الحالة المعاكسة وقد نريد تعتيم شرط عن قصد بحيث لا يمكن استخدامه كمُسند وصول بعد الآن. وقد نظرنا في تلك المشكلة عند مناقشة آثار [معاملات الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index) على شروط `LIKE`. تأمّل المثال التالي:

```sql
SELECT last_name, first_name, employee_id
  FROM employees
 WHERE subsidiary_id = ?
   AND last_name LIKE ?
```

بافتراض وجود فهرس على `SUBSIDIARY_ID` وآخر على `LAST_NAME`، أيهما أفضل لهذا الاستعلام؟

دون معرفة موضع المحرف البديل في مصطلح البحث، يستحيل تقديم جواب دقيق. ولا يملك المُحسِّن (optimizer) خياراً آخر سوى «التخمين». وإذا *كنت تعرف* أن هناك دائماً محرفاً بديلاً بادئاً، يمكنك تعتيم شرط `LIKE` عن قصد بحيث لا يستطيع المُحسِّن بعد ذلك اعتبار الفهرس على `LAST_NAME`.

```sql
SELECT last_name, first_name, employee_id
  FROM employees
 WHERE subsidiary_id = ?
   AND last_name || '' LIKE ?
```

يكفي إلحاق سلسلة فارغة بالعمود `LAST_NAME`. غير أن هذا خيار الملاذ الأخير. لا تفعله إلا عند الضرورة القصوى.
