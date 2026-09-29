---
title: "محاكاة الفهارس الجزئية في قاعدة بيانات Oracle"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/null/partial-index
---

يمكن استخدام الطريقة الغريبة التي تتعامل بها قاعدة بيانات Oracle مع `NULL` في الفهارس لمحاكاة الفهارس الجزئية؛ إذ يكفي أن نستخدم `NULL` للصفوف التي لا ينبغي فهرستها.

وللتوضيح، نحاكي الفهرس الجزئي التالي:

```sql
CREATE INDEX messages_todo
          ON messages (receiver)
       WHERE processed = 'N'
```

أولاً، نحتاج إلى دالة تعيد قيمة `RECEIVER` فقط إذا كانت قيمة `PROCESSED` تساوي `'N'`.

```sql
CREATE OR REPLACE
FUNCTION pi_processed(processed CHAR, receiver NUMBER)
RETURN NUMBER
DETERMINISTIC
AS BEGIN
   IF processed IN ('N') THEN
      RETURN receiver;
   ELSE
      RETURN NULL;
   END IF;
END
```

ويجب أن تكون الدالة [حتمية لتُستخدم في تعريف فهرس](/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index).

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-partial-indexes-oracle&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

الآن يمكننا إنشاء فهرس يحتوي فقط الصفوف التي تكون فيها `PROCESSED='N'`.

```sql
CREATE INDEX messages_todo
          ON messages (pi_processed(processed, receiver))
```

لاستخدام الفهرس، يجب استخدام التعبير المفهرس في الاستعلام:

```sql
SELECT message
  FROM messages
 WHERE pi_processed(processed, receiver) = ?
```

```
----------------------------------------------------------
|Id | Operation                   | Name          | Cost |
----------------------------------------------------------
| 0 | SELECT STATEMENT            |               | 5330 |
| 1 |  TABLE ACCESS BY INDEX ROWID| MESSAGES      | 5330 |
|*2 |   INDEX RANGE SCAN          | MESSAGES_TODO | 5303 |
----------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access("PI_PROCESSED"("PROCESSED","RECEIVER")=:X)
```

## الفهارس الجزئية، الجزء الثاني

بدءاً من الإصدار 11*g*، يوجد نهج ثانٍ — مخيف بالقدر نفسه — لمحاكاة الفهارس الجزئية في قاعدة بيانات Oracle، وذلك باستخدام قسم فهرس معطَّل عمداً والمعامل [`SKIP_UNUSABLE_INDEXES`](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/SKIP_UNUSABLE_INDEXES.html).
