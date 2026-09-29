---
title: "جملة LIMIT"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_limit/
---

> أهم شيء في لغة البرمجة هو الاسم. فلن تنجح لغة دون اسم جيد. وقد اخترعت حديثًا اسمًا جيدًا جدًا وأبحث الآن عن لغة مناسبة له. &mdash;Donald Knuth

في هذا القسم، سننظر في كيفية تحديد عدد صفوف النتائج المعروضة. ومن قبيل المصادفة، يتيح هذا الموضوع الصغير فرصة جيدة للحديث بإيجاز عن معايير (SQL).

يمكنك اختبار أمثلة الشيفرة في جدول "course" في المخطط "ucllcatalogue" (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).

## LIMIT

غالبًا ما تريد، نتيجةً لاستعلام، أن ترى النتائج الأولى فقط: 3 أو 5 أو 10... ويعرض الاستعلام التالي أعلى مقررين من حيث عدد النقاط:

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
LIMIT 2;
```

من المنطقي أنك لا تستطيع فعل ذلك بشكل مفيد إلا إذا كانت جملة `ORDER BY` موجودة أيضًا. وهذه هي النتيجة:

![Limit the list to the upper two](https://df.webontwerp.ucll.be/images/database-foundations/sql-limit-0-limit2.webp)

## OFFSET

افترض أنك لا تريد رؤية الرقمين 1 و2 كما أعلاه، بل تريد رؤية الرقمين التاليين (أي الرقمين 3 و4 في القائمة المرتبة). ويمكن فعل ذلك بسهولة كما يلي:

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
LIMIT 2 OFFSET 2;
```

## SQL القياسية

ربما لاحظت في الاستعلام السابق أن هناك مقررات أخرى لها 6 نقاط. ويعرض النظام فعليًا — كما طُلب — اثنين فقط. ويمكننا تصوّر حالات نريد فيها رؤية المقررات الأخرى ذات النقاط الست أيضًا (وهي *"المتعادلون"* كما نسميهم غالبًا).

وبالمناسبة، هناك أمر آخر مثير للاهتمام: `LIMIT` و`OFFSET` ليستا في الواقع من SQL القياسية. فقد وُجدت منذ زمن طويل الحاجة إلى تحديد عدد الصفوف المعروضة بمقدار معين. ولم يكن لدى معيار SQL حل لذلك، فبدأ كل منشئ قواعد بيانات العمل على نسخته الخاصة. وقد جاء عدد من أنظمة إدارة قواعد البيانات (منها MySQL وPostgreSQL...) بصيغة `LIMIT`. ولم يلحق معيار SQL إلا في عام 2008 بـ: `FETCH FIRST ... ROWS` (`ONLY` أو `WITH TIES`). ويمكن أن يبدو الاستعلام السابق وفق SQL القياسية كما يلي (وهو مدعوم أيضًا في PostgreSQL):

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
OFFSET 2
FETCH FIRST 2 ROWS ONLY;
```

والنتيجة مطابقة لاستعلام `LIMIT / OFFSET`: يُعرض الناتجان 3 و4 من القائمة المرتبة (تنازليًا حسب عدد النقاط).

علاوة على ذلك، لهذه الصيغة حل أنيق لمشكلة "المتعادلين": `WITH TIES`. ويعرض الاستعلام التالي الرقمين 3 و4 من القائمة، إلا إذا كانت هناك مقررات أخرى لها عدد النقاط نفسه للرقم 4. وفي هذه الحالة تستمر القائمة، كما يوضح الشكل أسفل الشيفرة:

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
OFFSET 2
FETCH FIRST 2 ROWS WITH TIES;
```

![extra rows with the same values are also shown](https://df.webontwerp.ucll.be/images/database-foundations/sql-limit-1-withties.webp)

## تمارين

كم عدد النقاط التي ينسّقها كل منسّق؟ اسرد جميع المنسّقين الذين ينسّقون رابع أكبر عدد من النقاط.

#### الحل

```sql
SELECT coordinator, SUM(credits) AS number_of_credits_coordinated
FROM course
GROUP BY coordinator
ORDER BY SUM(credits) DESC
OFFSET 3
FETCH FIRST 1 ROW WITH TIES;
```

