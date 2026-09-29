---
title: "الإفراط في الفهرسة"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/functions/over-indexing
---

إذا كان مفهوم الفهرسة القائمة على الدوال جديداً عليك، فقد تغريك فكرة فهرسة كل شيء، لكن هذا في الواقع آخر ما ينبغي أن تفعله. والسبب أن كل فهرس يسبّب صيانة مستمرة. والفهارس القائمة على الدوال مزعجة بوجه خاص لأنها تجعل إنشاء *الفهارس المكرّرة* سهلاً جداً.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-over-indexing&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

يمكن تنفيذ [البحث غير الحسّاس لحالة الأحرف المذكور أعلاه](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index) بدالة `LOWER` أيضاً:

```sql
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE LOWER(last_name) = LOWER('winand')
```

لا يستطيع فهرس واحد دعم طريقتي تجاهل حالة الأحرف معاً. ويمكننا طبعاً إنشاء فهرس ثانٍ على `LOWER(last_name)` لهذا الاستعلام، لكن ذلك يعني أن على قاعدة البيانات صيانة فهرسين مقابل كل عبارة `insert` و`update` و`delete` (انظر أيضاً [الفصل 8، «*تعديل البيانات*»](/book/use-the-index-luke/sql-dml/index)). ولكي يكفي فهرس واحد، ينبغي أن تستخدم الدالة نفسها باستمرار في جميع أنحاء تطبيقك.

#### نصيحة

وحّد مسار الوصول بحيث يستطيع فهرس واحد خدمة عدة استعلامات.

#### تحذير

أحياناً تستخدم أدوات ORM دالتَي `UPPER` و`LOWER` دون علم المطوّر. فمثلاً [تحقن Hibernate دالة `LOWER` ضمنياً](/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index#myth-dynamic-sql-sample) في عمليات البحث غير الحسّاسة لحالة الأحرف.

#### نصيحة

احرص دائماً على فهرسة البيانات الأصلية، فهي غالباً أنفع معلومات يمكنك وضعها في فهرس.
