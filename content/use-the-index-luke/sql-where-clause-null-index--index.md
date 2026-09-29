---
title: "فهرسة `NULL`"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/null/index
---

لا تُدرج قاعدة بيانات Oracle الصفوف في الفهرس إذا كانت جميع الأعمدة المفهرسة `NULL`. ويعني ذلك أن كل فهرس هو [فهرس جزئي](/book/use-the-index-luke/sql-where-clause-partial-and-filtered-indexes/index) — أشبه بوجود جملة `where`:

```sql
CREATE INDEX idx
          ON tbl (A, B, C, ...)
       WHERE A IS NOT NULL
          OR B IS NOT NULL
          OR C IS NOT NULL
             ...
```

تأمّل الفهرس `EMP_DOB`؛ فله عمود واحد فقط: `DATE_OF_BIRTH`. والصف الذي لا توجد له قيمة `DATE_OF_BIRTH` لا يُضاف إلى هذا الفهرس.

```sql
INSERT INTO employees ( subsidiary_id, employee_id
                      , first_name   , last_name
                      , phone_number)
               VALUES ( ?, ?, ?, ?, ? )
```

لا تضبط عبارة `insert` قيمة `DATE_OF_BIRTH`، فتكون قيمتها الافتراضية `NULL`، ومن ثمّ لا يُضاف السجل إلى فهرس `EMP_DOB`. ونتيجة لذلك، لا يستطيع الفهرس دعم استعلام عن السجلات التي تحقق `DATE_OF_BIRTH` `IS NULL`:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE date_of_birth IS NULL
```

ومع ذلك، يُدرَج السجل في فهرس مُدمج إذا كان عمود واحد على الأقل غير `NULL`:

```sql
CREATE INDEX demo_null
          ON employees (subsidiary_id, date_of_birth)
```

يُضاف الصف المنشأ أعلاه إلى الفهرس لأن `SUBSIDIARY_ID` ليس `NULL`. ويمكن لهذا الفهرس إذن دعم استعلام عن جميع موظفي فرع معيّن لا توجد لهم قيمة `DATE_OF_BIRTH`:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE subsidiary_id = ?
   AND date_of_birth IS NULL
```

لاحظ أن الفهرس يغطي جملة `where` بأكملها؛ فجميع المرشّحات تُستخدم كمُسندات وصول أثناء `INDEX RANGE SCAN`.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-indexingnull&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

ويمكننا توسيع هذا المفهوم للاستعلام الأصلي للعثور على جميع السجلات التي تحقق `DATE_OF_BIRTH` `IS NULL`. ولذلك يجب أن يكون العمود `DATE_OF_BIRTH` أقصى عمود إلى اليسار في الفهرس ليمكن استخدامه كمُسند وصول. ومع أننا لا نحتاج إلى عمود ثانٍ في الفهرس من أجل الاستعلام نفسه، نضيف عموداً آخر لا يمكن أن يكون `NULL` أبداً لضمان احتواء الفهرس على جميع الصفوف. ويمكننا استخدام أي عمود له قيد `NOT NULL`، مثل `SUBSIDIARY_ID`، لهذا الغرض.

بدلاً من ذلك، يمكننا استخدام تعبير ثابت لا يمكن أن يكون `NULL` أبداً، ما يضمن أن الفهرس يحتوي جميع الصفوف — حتى إذا كانت `DATE_OF_BIRTH` هي `NULL`.

```
DROP   INDEX emp_dob
```

```sql
CREATE INDEX emp_dob ON employees (date_of_birth, 'X')
```

من الناحية التقنية، هذا الفهرس [فهرس قائم على الدوال](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index). ويدحض هذا المثال أيضاً الخرافة القائلة إن قاعدة بيانات Oracle لا تستطيع فهرسة `NULL`.

#### نصيحة

أضف عموداً لا يمكن أن يكون `NULL` لفهرسة `NULL` مثل أي قيمة.
