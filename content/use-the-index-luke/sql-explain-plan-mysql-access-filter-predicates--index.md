---
title: "التمييز بين مُسندات الوصول والترشيح"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/mysql/access-filter-predicates
---

تستخدم قاعدة بيانات MySQL ثلاث طرق مختلفة لتقييم جمل `where` (المُسندات):

مُسند وصول (عمودا «key_len» و«ref»)

تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ[اجتياز العقد الورقية](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index).

مُسند ترشيح الفهرس («Using index condition»، منذ MySQL 5.6)

تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.

مُسند ترشيح على مستوى الجدول («Using where» في عمود «Extra»)

تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من الجدول أولاً.

لا تُظهر خطط تنفيذ MySQL أنواع المُسندات المستخدمة لكل شرط — بل تسرد أنواع المُسندات المستخدمة فقط.

في المثال التالي، تُستخدم جملة `where` بأكملها كمُسند وصول:

```sql
CREATE TABLE demo (
   id1 NUMERIC
 , id2 NUMERIC
 , id3 NUMERIC
 , val NUMERIC)
```

```sql
INSERT INTO demo VALUES (1,1,1,1)
```

```sql
INSERT INTO demo VALUES (2,2,2,2)
```

```sql
CREATE INDEX demo_idx
          ON demo
             (id1, id2, id3)
```

```
EXPLAIN
 SELECT * 
   FROM demo
  WHERE id1=1
    AND id2=1
```

```javascript
+------+----------+---------+-------------+------+-------+
| type | key      | key_len | ref         | rows | Extra |
+------+----------+---------+-------------+------+-------+
| ref  | demo_idx | 12      | const,const |    1 |       |
+------+----------+---------+-------------+------+-------+
```

لا تظهر «Using where» ولا «Using index condition» في عمود «Extra». غير أن الفهرس مستخدم (`type=ref, key=demo_idx`)، لذا يمكنك افتراض أن جملة `where` بأكملها مؤهَّلة لتكون مُسند وصول.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-my-filter&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

لاحظ أيضاً أن عمود `ref` يشير إلى استخدام عمودين من الفهرس (وكلاهما ثابت استعلام في هذا المثال). وثمة طريقة أخرى لتأكيد أي جزء من الفهرس مستخدم وهي قيمة `key_len`: فهي تُظهر أن الاستعلام يستخدم أول 12 بايت من تعريف الفهرس. ولو رغبت في ربط ذلك بأسماء الأعمدة، فكل ما «عليك» فعله هو معرفة مقدار مساحة التخزين التي يحتاجها كل عمود (انظر «[متطلبات تخزين أنواع البيانات](https://dev.mysql.com/doc/refman/8.0/en/storage-requirements.html)» في وثائق MySQL). وفي غياب قيد `NOT NULL`، تحتاج MySQL بايت إضافياً لكل عمود. وعلى أي حال، يحتاج كل عمود `NUMERIC` في المثال 6 بايتات؛ ولذلك يؤكد طول المفتاح 12 أن أول عمودين في الفهرس مستخدمان كمُسندات وصول.

وعند الترشيح بالعمود `ID3` (بدلاً من `ID2`)، تستخدم MySQL 5.6 وما بعدها مُسند ترشيح فهرس («Using index condition»):

```
EXPLAIN
 SELECT * 
   FROM demo
  WHERE id1=1
    AND id3=1
```

```javascript
+------+----------+---------+-------+------+-----------------------+
| type | key      | key_len | ref   | rows | Extra                 |
+------+----------+---------+-------+------+-----------------------+
| ref  | demo_idx | 6       | const |    1 | Using index condition |
+------+----------+---------+-------+------+-----------------------+
```

وفي هذه الحالة، يعني `ken_len=6` ووجود `const` واحد فقط في عمود `ref` أن عموداً واحداً فقط في الفهرس مستخدم كمُسند وصول.

وقد استخدمت إصدارات MySQL السابقة مُسند ترشيح على مستوى الجدول لهذا الاستعلام — ويُعرف بـ«Using where» في عمود «Extra»:

```javascript
+------+----------+---------+-------+------+-------------+
| type | key      | key_len | ref   | rows | Extra       |
+------+----------+---------+-------+------+-------------+
| ref  | demo_idx | 6       | const |    1 | Using where |
+------+----------+---------+-------+------+-------------+
```

#### نصيحة

- يشرح قسم [«*أكبر من، وأصغر من، و`BETWEEN`*»](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index) الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.
- ويبيّن [الفصل 3، «*الأداء وقابلية التوسع*»](/book/use-the-index-luke/sql-testing-scalability/index) فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.
