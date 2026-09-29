---
title: "الاستعلامات ذات المعاملات"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/bind-parameters
---

يغطي هذا القسم موضوعاً تُغفله معظم كتب SQL: *الاستعلامات ذات المعاملات* (parameterized queries) و*معاملات الربط* (bind parameters).

معاملات الربط—وتسمى أيضاً المعاملات الديناميكية أو متغيّرات الربط—هي طريقة بديلة لتمرير البيانات إلى قاعدة البيانات (database). فبدلاً من وضع القيم مباشرة في عبارة SQL، تستخدم مجرد عنصر نائب مثل `?` أو `:name` أو `@name` وتقدّم القيم الفعلية عبر نداء API منفصل.

لا عيب في كتابة القيم مباشرة في عبارات مخصّصة؛ غير أن هناك سببين وجيهين لاستخدام معاملات الربط في البرامج:

الأمان

متغيّرات الربط هي أفضل طريقة لمنع [حقن SQL](https://en.wikipedia.org/wiki/SQL_injection) (SQL injection).

الأداء

يمكن لقواعد البيانات التي تملك ذاكرة مؤقتة لخطط التنفيذ (execution plan cache)، مثل SQL Server وقاعدة بيانات Oracle، أن تعيد استخدام خطة تنفيذ عند تنفيذ العبارة نفسها مرات متعددة. وهذا يوفّر جهد إعادة بناء خطة التنفيذ، لكنه لا يعمل إلا إذا كانت عبارة SQL *مطابقة تماماً*. وإذا وضعت قيماً مختلفة في عبارة SQL، تعاملها قاعدة البيانات كعبارة مختلفة وتعيد إنشاء خطة التنفيذ.

وعند استخدام معاملات الربط، لا تكتب القيم الفعلية بل تُدرج عناصر نائبة في عبارة SQL. وبذلك لا تتغير العبارات عند تنفيذها بقيم مختلفة.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-bind&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

وبطبيعة الحال توجد استثناءات، مثلاً إذا كان حجم البيانات المتأثرة يعتمد على القيم الفعلية:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE subsidiary_id = 20
```

```
99 rows selected.

----------------------------------------------------------------
|Id | Operation                   | Name         | Rows | Cost |
----------------------------------------------------------------
| 0 | SELECT STATEMENT            |              |   99 |   70 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |   99 |   70 |
|*2 |   INDEX RANGE SCAN          | EMPLOYEES_PK |   99 |    2 |
----------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("SUBSIDIARY_ID"=20)
```

يقدّم البحث بالفهرس أفضل أداء للشركات الفرعية الصغيرة، لكن `TABLE ACCESS FULL` قد يتفوق على الفهرس للشركات الفرعية الكبيرة:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE subsidiary_id = 30
```

```
1000 rows selected.

----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           | 1000 |  478 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES | 1000 |  478 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("SUBSIDIARY_ID"=30)
```

في هذه الحالة، يؤدي المدرج التكراري على `SUBSIDIARY_ID` غرضه. ويستخدمه المُحسِّن (optimizer) لتحديد تكرار معرّف الشركة الفرعية المذكور في استعلام SQL. وبالتالي يحصل على تقديرين مختلفين لعدد الصفوف لكلا الاستعلامين.

لذا سيؤدي حساب التكلفة اللاحق إلى قيمتي تكلفة مختلفتين. وعندما يختار المُحسِّن خطة تنفيذ في النهاية، يأخذ الخطة ذات قيمة التكلفة الأدنى. وبالنسبة للشركة الفرعية الأصغر، تكون هي الخطة التي تستخدم الفهرس.

وتتأثر تكلفة عملية `TABLE ACCESS BY INDEX ROWID` بشدة بتقدير عدد الصفوف. فاختيار عشرة أضعاف عدد الصفوف سيرفع قيمة التكلفة بهذا العامل. وبذلك تصبح التكلفة الإجمالية باستخدام الفهرس أعلى حتى من مسح كامل للجدول. لذا سيختار المُحسِّن خطة التنفيذ الأخرى للشركة الفرعية الأكبر.

وعند استخدام معاملات الربط، لا تتوفر للمُحسِّن قيم محددة لتحديد تكرارها. فيفترض حينها توزيعاً متساوياً ويحصل دائماً على تقديرات عدد الصفوف وقيم التكلفة نفسها. وفي النهاية سيختار دائماً خطة التنفيذ نفسها.

#### نصيحة

تكون المدرجات التكرارية للأعمدة أكثر فائدة إذا لم تكن القيم موزّعة توزيعاً منتظماً.

وبالنسبة للأعمدة ذات التوزيع المنتظم، يكفي غالباً قسمة عدد القيم المتمايزة على عدد صفوف الجدول. وتعمل هذه الطريقة أيضاً عند استخدام معاملات الربط.

وإذا قارنّا المُحسِّن بالمترجم (compiler)، فمعاملات الربط تشبه متغيّرات البرنامج، أما إذا كتبت القيم مباشرة في العبارة فهي أشبه بالثوابت. وتستطيع قاعدة البيانات استخدام القيم من عبارة SQL أثناء التحسين كما يستطيع المترجم تقييم التعبيرات الثابتة أثناء الترجمة. وببساطة، لا تكون معاملات الربط مرئية للمُحسِّن، كما أن قيم المتغيّرات في زمن التشغيل غير معروفة للمترجم.

ومن هذا المنظور، من المفارقات قليلاً أن معاملات الربط قد تحسّن الأداء، مع أن عدم استخدامها يمكّن المُحسِّن من اختيار أفضل خطة تنفيذ دائماً. لكن السؤال: بأي ثمن؟ إن توليد جميع صور خطة التنفيذ وتقييمها جهد هائل لا يستحق التكلفة إذا كنت ستحصل على النتيجة نفسها في النهاية على أي حال.

#### نصيحة

عدم استخدام معاملات الربط يشبه إعادة ترجمة البرنامج في كل مرة.

يمثّل قرار بناء خطة تنفيذ متخصصة أو عامة معضلة لقاعدة البيانات. فإما أن يُبذل الجهد لتقييم جميع صور الخطة الممكنة لكل تنفيذ للحصول دائماً على أفضل خطة تنفيذ، وإما أن يُوفَّر عبء التحسين وتُستخدم خطة تنفيذ مخزّنة مؤقتاً كلما أمكن—مع قبول خطر استخدام خطة تنفيذ دون المستوى الأمثل. والمأزق أن قاعدة البيانات لا تعرف إن كانت دورة التحسين الكاملة ستنتج خطة تنفيذ مختلفة دون أن تنفّذ التحسين الكامل فعلاً. ويحاول موردو قواعد البيانات حل هذه المعضلة بطرق استكشافية—لكن بنجاح محدود جداً.

وبوصفك مطوّراً، يمكنك استخدام معاملات الربط عن قصد للمساعدة في حل هذه المعضلة. أي ينبغي أن تستخدم معاملات الربط دائماً باستثناء القيم التي *يُفترض* أن تؤثر في خطة التنفيذ.

ورموز الحالة الموزّعة توزيعاً غير منتظم مثل «todo» و«done» مثال جيد. فعدد مدخلات «done» يتجاوز غالباً سجلات «todo» بمرتبة قدر. ولا معنى لاستخدام فهرس إلا عند البحث عن مدخلات «todo» في هذه الحالة. والتقسيم (partitioning) مثال آخر—أي إذا قسّمت الجداول والفهارس على عدة مناطق تخزين. ويمكن للقيم الفعلية حينها أن تؤثر في الأقسام التي يجب مسحها. وقد يعاني أداء استعلامات `LIKE` من معاملات الربط أيضاً كما سنرى في [القسم التالي](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index).

#### نصيحة

في الواقع، ليست إلا حالات قليلة تؤثر فيها القيم الفعلية في خطة التنفيذ. لذا ينبغي أن تستخدم معاملات الربط عند الشك—فقط لمنع حقن SQL.

تعرض مقتطفات الشيفرة التالية كيفية استخدام معاملات الربط في لغات برمجة مختلفة.

C#

بدون معاملات الربط:

```python
int subsidiary_id;
SqlCommand cmd = new SqlCommand(
                   "select first_name, last_name" 
                 + "  from employees"
                 + " where subsidiary_id = " + subsidiary_id
                 , connection);
```

باستخدام معامل ربط:

```python
int subsidiary_id;
SqlCommand cmd =
       new SqlCommand(
                      "select first_name, last_name" 
                    + "  from employees"
                    + " where subsidiary_id = @subsidiary_id
                    , connection);
cmd.Parameters.AddWithValue("@subsidiary_id", subsidiary_id);
```

انظر أيضاً: توثيق فئة [`SqlParameterCollection`](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlparametercollection?view=netframework-4.8.1&viewFallbackFrom=dotnet-plat-ext-5.0).

Java

بدون معاملات الربط:

```python
int subsidiary_id;
Statement command = connection.createStatement(
                    "select first_name, last_name" 
                  + "  from employees"
                  + " where subsidiary_id = " + subsidiary_id
                  );
```

باستخدام معامل ربط:

```python
int subsidiary_id;
PreparedStatement command = connection.prepareStatement(
                    "select first_name, last_name" 
                  + "  from employees"
                  + " where subsidiary_id = ?"
                  );
command.setInt(1, subsidiary_id);
```

انظر أيضاً: توثيق فئة [`PreparedStatement`](https://docs.oracle.com/javase/8/docs/api/java/sql/PreparedStatement.html).

Perl

بدون معاملات الربط:

```python
my $subsidiary_id;
my $sth = $dbh->prepare(
                  "select first_name, last_name" 
                . "  from employees"
                . " where subsidiary_id = $subsidiary_id"
                );
$sth->execute();
```

باستخدام معامل ربط:

```python
my $subsidiary_id;
my $sth = $dbh->prepare(
                  "select first_name, last_name" 
                . "  from employees"
                . " where subsidiary_id = ?"
                );
$sth->execute($subsidiary_id);
```

انظر: [Programming the Perl DBI](https://docstore.mik.ua/orelly/linux/dbi/ch05_03.htm).

PHP

باستخدام MySQL، بدون معاملات الربط:

```python
$mysqli->query("select first_name, last_name" 
             . "  from employees"
             . " where subsidiary_id = " . $subsidiary_id);
```

باستخدام معامل ربط:

```python
if ($stmt = $mysqli->prepare("select first_name, last_name" 
                           . "  from employees"
                           . " where subsidiary_id = ?")) 
{
   $stmt->bind_param("i", $subsidiary_id);
   $stmt->execute();
} else {
  /* handle SQL error */
}
```

انظر أيضاً: توثيق فئة [`mysqli_stmt::bind_param`](https://www.php.net/manual/en/mysqli-stmt.bind-param.php) و[«العبارات المُعدّة والإجراءات المخزّنة» في توثيق PDO](https://www.php.net/manual/en/pdo.prepared-statements.php).

Ruby

بدون معاملات الربط:

```python
dbh.execute("select first_name, last_name" 
          + "  from employees"
          + " where subsidiary_id = #{subsidiary_id}");
```

باستخدام معامل ربط:

```python
dbh.prepare("select first_name, last_name" 
          + "  from employees"
          + " where subsidiary_id = ?");
dbh.execute(subsidiary_id);
```

انظر أيضاً: [«الاقتباس والعناصر النائبة وربط المعاملات» في درس Ruby DBI](https://web.archive.org/web/20190228233411/http://www.kitebird.com/articles/ruby-dbi.html#TOC_8).

#### انظر أيضاً

[أمثلة باستخدام أدوات ORM](/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index#myth-dynamic-sql-sample)

علامة الاستفهام (`?`) هي محرف العنصر النائب الوحيد الذي يعرّفه معيار SQL. وعلامات الاستفهام معاملات موضعية؛ أي أنها ترقَّم من اليسار إلى اليمين. ولربط قيمة بعلامة استفهام معينة، عليك تحديد رقمها. وقد يكون ذلك غير عملي جداً لأن الترقيم يتغير عند إضافة عناصر نائبة أو حذفها. وتقدّم قواعد بيانات كثيرة امتداداً خاصاً للمعاملات المسمّاة لحل هذه المشكلة—مثلاً باستخدام رمز «at» (`@name`) أو النقطتين (`:name`).

#### ملاحظة

لا تستطيع معاملات الربط تغيير بنية عبارة SQL.

ويعني ذلك أنك لا تستطيع استخدام معاملات الربط لأسماء الجداول أو الأعمدة. ومعاملات الربط التالية لا تعمل:

```
String sql = prepare("SELECT * FROM ? WHERE ?");

sql.execute('employees', 'employee_id = 1');
```

وإذا احتجت إلى تغيير بنية عبارة SQL أثناء التشغيل، فاستخدم [SQL الديناميكي](/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index).

## مشاركة المؤشرات والمعاملة القسرية

كلما زاد تعقيد المُحسِّن واستعلام SQL، زادت أهمية التخزين المؤقت لخطط التنفيذ. وتملك قاعدتا بيانات SQL Server وOracle ميزات لاستبدال القيم الحرفية في سلسلة SQL بمعاملات ربط تلقائياً. وتسمى هذه الميزات `CURSOR_SHARING` (في Oracle) أو *المعاملة القسرية* (forced parameterization) (في SQL Server).

وكلتا الميزتين حلّان بديلان للتطبيقات التي لا تستخدم معاملات الربط إطلاقاً. وتمكين هاتين الميزتين يمنع المطوّرين من استخدام القيم الحرفية عن قصد.

#### انظر أيضاً

- يضم [*المنطق الذكي*](/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index#smart_logic_affected) مزيداً من المعلومات عن قدرات التخزين المؤقت لخطط التنفيذ في مختلف قواعد البيانات.
- مقال: [Planning for Execution Plan Reuse](https://use-the-index-luke.com/blog/2011-07-16/planning-for-reuse)
