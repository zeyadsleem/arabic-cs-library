---
title: "Hash Join"
lang: en
---

The hash join algorithm aims for the weak spot of the [nested loops join](/sql/join/nested-loops-join-n1-problem): the many B-tree traversals when executing the inner query. Instead it loads the candidate records from one side of the join into a [hash table](https://en.wikipedia.org/wiki/Hash_table) that can be probed very quickly for each row from the other side of the join. Tuning a hash join requires an entirely different indexing approach than the nested loops join. Beyond that, it is also possible to improve hash join performance by selecting fewer *columns*—a challenge for most ORM tools.

The indexing strategy for a hash join is very different because there is no need to index the join columns. Only indexes for *independent* `where` predicates improve hash join performance.

#### Tip

Index the *independent* `where` predicates to improve hash join performance.

Consider the following example. It selects all sales for the past six months with the corresponding employee details:

```sql
SELECT *
  FROM sales s
  JOIN employees e ON (s.subsidiary_id = e.subsidiary_id
                  AND  s.employee_id   = e.employee_id  )
 WHERE s.sale_date > trunc(sysdate) - INTERVAL '6' MONTH
```

The `SALE_DATE` filter is the only independent `where` clause—that means it refers to one table only and does not belong to the join predicates.

Db2 (LUW)

```
Explain Plan
------------------------------------------------------------
ID | Operation          |                       Rows |  Cost
 1 | RETURN             |                            | 60750
 2 |  HSJOIN            |             50795 of 10000 | 60750
 3 |   TBSCAN SALES     | 50795 of 1011118 (  5.02%) | 60053
 4 |   TBSCAN EMPLOYEES |   10000 of 10000 (100.00%) |   688

Predicate Information
 2 - JOIN (Q2.SUBSIDIARY_ID = DECIMAL(Q1.SUBSIDIARY_ID, 10, 0))
     JOIN (Q2.EMPLOYEE_ID = DECIMAL(Q1.EMPLOYEE_ID, 10, 0))
 3 - SARG ((CURRENT DATE - 6 MONTHS) < Q2.SALE_DATE)
```

The `where` clause was changed like this to get the desired result: `WHERE s.sale_date > current_date - 6 MONTH`.

Oracle

```
--------------------------------------------------------------
| Id | Operation          | Name      | Rows  | Bytes | Cost |
--------------------------------------------------------------
|  0 | SELECT STATEMENT   |           | 49244 |    59M| 12049|
|* 1 |  HASH JOIN         |           | 49244 |    59M| 12049|
|  2 |   TABLE ACCESS FULL| EMPLOYEES | 10000 |     9M|   478|
|* 3 |   TABLE ACCESS FULL| SALES     | 49244 |    10M| 10521|
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - access("S"."SUBSIDIARY_ID"="E"."SUBSIDIARY_ID"
          AND "S"."EMPLOYEE_ID"  ="E"."EMPLOYEE_ID")
   3 - filter("S"."SALE_DATE">TRUNC(SYSDATE@!)
                           -INTERVAL'+00-06' YEAR(2) TO MONTH)
```

The first execution step is a full table scan to load all employees into a hash table (plan id 2). The hash table uses the join predicates as key. In the next step, the database does another full table scan on the `SALES` table and discards all sales that do not satisfy the condition on `SALE_DATE` (plan id 3). For the remaining `SALES` records, the database accesses the hash table to load the corresponding employee details.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-hash-join&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The sole purpose of the hash table is to act as a temporary in-memory structure to avoid accessing the `EMPLOYEE` table many times. The hash table is initially loaded in one shot so that there is no need for an index to efficiently fetch single records. The predicate information confirms that not a single filter is applied on the `EMPLOYEES` table (plan id 2). The query doesn’t have any independent predicates on this table.

#### Important

Indexing join predicates doesn’t improve hash join performance.

That does not mean it is impossible to index a hash join. The independent predicates can be indexed. These are the conditions which are applied during one of the two table access operations. In the above example, it is the filter on `SALE_DATE`.

```sql
CREATE INDEX sales_date ON sales (sale_date)
```

The following execution plan uses this index. Nevertheless it uses a full table scan for the `EMPLOYEES` table because the query has no independent `where` predicate on `EMPLOYEES`.

Db2 (LUW)

```
Explain Plan
----------------------------------------------------------------
ID | Operation              |                       Rows |  Cost
 1 | RETURN                 |                            | 16655
 2 |  HSJOIN                |             50795 of 10000 | 16655
 3 |   FETCH SALES          |   50795 of 50795 (100.00%) | 15958
 4 |    RIDSCN              |   50795 of 50795 (100.00%) |  1655
 5 |     SORT (UNIQUE)      |   50795 of 50795 (100.00%) |  1655
 6 |      IXSCAN SALES_DATE | 50795 of 1011118 (  5.02%) |  1631
 7 |   TBSCAN EMPLOYEES     |   10000 of 10000 (100.00%) |   688

Predicate Information
 2 - JOIN (Q2.SUBSIDIARY_ID = DECIMAL(Q1.SUBSIDIARY_ID, 10, 0))
     JOIN (Q2.EMPLOYEE_ID = DECIMAL(Q1.EMPLOYEE_ID, 10, 0))
 3 - SARG ((CURRENT DATE - 6 MONTHS) < Q2.SALE_DATE)
 6 - START ((CURRENT DATE - 6 MONTHS) < Q2.SALE_DATE)
```

The `where` clause was changed like this to get the desired result: `WHERE s.sale_date > current_date - 6 MONTH`.

Oracle

```
--------------------------------------------------------------
| Id | Operation                    | Name      | Bytes| Cost|
--------------------------------------------------------------
|  0 | SELECT STATEMENT             |           |   59M| 3252|
|* 1 |  HASH JOIN                   |           |   59M| 3252|
|  2 |   TABLE ACCESS FULL          | EMPLOYEES |    9M|  478|
|  3 |   TABLE ACCESS BY INDEX ROWID| SALES     |   10M| 1724|
|* 4 |    INDEX RANGE SCAN          | SALES_DATE|      |     |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - access("S"."SUBSIDIARY_ID"="E"."SUBSIDIARY_ID"
          AND "S"."EMPLOYEE_ID"  ="E"."EMPLOYEE_ID"  )
   4 - access("S"."SALE_DATE" > TRUNC(SYSDATE@!)
                           -INTERVAL'+00-06' YEAR(2) TO MONTH)
```

Indexing a hash join is—contrary to the [nested loops join](/sql/join/nested-loops-join-n1-problem)—symmetric. That means that the join order does not influence indexing. The `SALES_DATE` index can be used to load the hash table if the join order is reversed.

#### Note

Indexing a hash join is independent of the join order.

A rather different approach to optimizing hash join performance is to minimize the hash table size. This method works because an optimal hash join is only possible if the entire hash table fits into memory. The optimizer will therefore automatically use the smaller side of the join for the hash table. The Oracle execution plan shows the estimated memory requirement in the “Bytes” column. In the above execution plan, the `EMPLOYEES` table needs nine megabytes and is thus the smaller one.

It is also possible to reduce the hash table size by changing the SQL query, for example by adding extra conditions so that the database loads fewer candidate records into the hash table. Continuing the above example it would mean adding a filter on the `DEPARTMENT` attribute so only sales staff is considered. This improves hash join performance even if there is no index on the `DEPARTMENT` attribute because the database does not need to store employees who cannot have sales in the hash table. When doing so you have to make sure there are no `SALES` records for employees that do not work in the respective department. Use constraints to guard your assumptions.

When minimizing the hash table size, the relevant factor is not the number of rows but the memory footprint. It is, in fact, also possible to reduce the hash table size by selecting fewer *columns*—only the attributes you really need:

```sql
SELECT s.sale_date, s.eur_value
     , e.last_name, e.first_name
  FROM sales s
  JOIN employees e ON (s.subsidiary_id = e.subsidiary_id
                  AND  s.employee_id   = e.employee_id  )
 WHERE s.sale_date > trunc(sysdate) - INTERVAL '6' MONTH
```

That method seldom introduces bugs because dropping the wrong column will probably quickly result in an error message. Nevertheless it is possible to cut the hash table size considerably, in this particular case from 9 megabyte down to 234 kilobytes—a reduction of 97%.

```
--------------------------------------------------------------
| Id | Operation                    | Name      | Bytes| Cost|
--------------------------------------------------------------
|  0 | SELECT STATEMENT             |           | 2067K| 2202|
|* 1 |  HASH JOIN                   |           | 2067K| 2202|
|  2 |   TABLE ACCESS FULL          | EMPLOYEES |  234K|  478|
|  3 |   TABLE ACCESS BY INDEX ROWID| SALES     |  913K| 1724|
|* 4 |    INDEX RANGE SCAN          | SALES_DATE|      |  133|
--------------------------------------------------------------
```

#### Tip

Select fewer columns to improve hash join performance.

Although at first glance it seems simple to remove a few columns from an SQL statement, it is a real challenge when using an object-relational mapping (ORM) tool. Support for so-called *partial objects* is very sparse. The following examples show some possibilities.JavaJPA defines the `FetchType.LAZY` in the `@Basic` annotation. It can be applied on property level:

```
@Column(name="junk")
@Basic(fetch=FetchType.LAZY)
private String junk;
```

JPA providers are free to ignore it:

The LAZY strategy is a hint to the persistence provider runtime that data should be fetched lazily when it is first accessed. The implementation is permitted to eagerly fetch data for which the LAZY strategy hint has been specified.

— [EJB 3.0 JPA, paragraph 9.1.18](https://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/)

Hibernate 3.6 implements lazy property fetching via [compile time bytecode instrumentation](https://docs.hibernate.org/orm/6.2/userguide/html_single/#BytecodeEnhancement-lazy-loading). The instrumentation adds extra code to the compiled classes that does not fetch the `LAZY` properties until accessed. The approach is fully transparent to the application but it opens the door to a new dimension of [N+1 problems](/sql/join/nested-loops-join-n1-problem): one `select` for each record *and property*. This is particularly dangerous because JPA does not offer runtime control to fetch eagerly if needed.

Hibernate’s native query language HQL solves the problem with the `FETCH ALL PROPERTIES` clause (see [`FewerColumnsInstrumentedHibernate.java`](/samples/use-the-index-luke-samples.zip)):

```sql
select s from Sales s FETCH ALL PROPERTIES
 inner join fetch s.employee e FETCH ALL PROPERTIES
 where s.saleDate >:dt
```

The `FETCH ALL PROPERTIES` clause forces Hibernate to eagerly fetch the entity—even when using instrumented code and the `LAZY` annotation.

Another option for loading only selected columns is to use data transport objects (DTOs) instead of entities. This method works the same way in HQL and JPQL, that is you initialize an object in the query ([`FewerColumnsJPA.java`](/samples/use-the-index-luke-samples.zip) sample):

```sql
select new SalesHeadDTO(s.saleDate , s.eurValue
                       ,e.firstName, e.lastName)
  from Sales s
  join s.employee e
 where s.saleDate > :dt
```

The query selects the requested data only and returns a `SalesHeadDTO` object—a simple Java object ([POJO](https://en.wikipedia.org/wiki/Plain_Old_Java_Object)), not an entity.

Solving a real world performance problem does often involve a lot of existing code. Migrating that code to new classes is probably unreasonable. But byte-code instrumentation causes N+1 problems, which is likely worse than the original performance issue. The [`FewerColumnsJPA.java`](/samples/use-the-index-luke-samples.zip) example uses a common interface for the entity and the DTO to solve the problem. The interface defines the getter methods only so that a read-only consumer can easily be changed to accept the the DTO as input. That is often sufficient because large hash joins are usually triggered by reporting procedures that do not update anything.

If you are building a new report, you could consider fetching the data via DTOs or a simple `Map`, like demonstrated in the [`FewerColumnsHibernate.java`](/samples/use-the-index-luke-samples.zip) sample.

Perl

The DBIx::Class framework does not act as entity manager so that inheritance doesn’t cause [aliasing problems](https://en.wikipedia.org/wiki/Aliasing_%28computing%29). The [cookbook](https://metacpan.org/release/RIBASUSHI/DBIx-Class-0.082840/view/lib/DBIx/Class/Manual/Cookbook.pod#Static_sub-classing_DBIx::Class_result_classes) supports this approach. The following schema definition defines the `Sales` class on two levels:

```
package UseTheIndexLuke::Schema::Result::SalesHead;
use base qw/DBIx::Class::Core/;

__PACKAGE__->table('sales');
__PACKAGE__->add_columns(qw/sale_id employee_id subsidiary_id
                            sale_date eur_value/);
__PACKAGE__->set_primary_key(qw/sale_id/);
__PACKAGE__->belongs_to('employee', 'Employees', 
           {'foreign.employee_id'   => 'self.employee_id'
           ,'foreign.subsidiary_id' => 'self.subsidiary_id'});

package UseTheIndexLuke::Schema::Result::Sales;
use base qw/UseTheIndexLuke::Schema::Result::SalesHead/;

__PACKAGE__->table('sales');
__PACKAGE__->add_columns(qw/junk/);
```

The `Sales` class is derived from the `SalesHead` class and adds the missing attribute. You can use both classes as you need them. Please note that the table setup is required in the derived class as well.

You can fetch all employee details via [prefetch](/sql/join/nested-loops-join-n1-problem#orm-join) or just selected columns as shown below:

```
my @sales =
   $schema->resultset('SalesHead')
          ->search($cond
                  ,{      join => 'employee'
                   ,'+columns' => ['employee.first_name'
                                  ,'employee.last_name']
                   }
                  );
```

It is not possible to load only selected columns from the root table—`SalesHead` in this case.

DBIx::Class 0.08192 generates the following SQL. It fetches all columns from the `SALES` table and the selected attributes from `EMPLOYEES`:

```sql
SELECT me.sale_id,
       me.employee_id,
       me.subsidiary_id,
       me.sale_date,
       me.eur_value,
       employee.first_name,
       employee.last_name
  FROM sales me
  JOIN employees employee
        ON( employee.employee_id   = me.employee_id
       AND  employee.subsidiary_id = me.subsidiary_id)
 WHERE(sale_date > ?)
```

PHP

Version 2 of the Doctrine framework supports attribute selection at runtime. The documentation states that the [partially loaded objects](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/partial-objects.html) might behave oddly and requires the `partial` keyword to acknowledge the risks. Furthermore, you must select the primary key columns explicitly:

```
$qb = $em->createQueryBuilder();
$qb->select('partial s.{sale_id, sale_date, eur_value},'
          . 'partial e.{employee_id, subsidiary_id, '
                     . 'first_name , last_name}')
   ->from('Sales', 's')
   ->join('s.employee', 'e')
   ->where("s.sale_date > :dt")
   ->setParameter('dt', $dt, Type::DATETIME);
```

The generated SQL contains the requested columns and once more the `SUBSIDIARY_ID` and `EMPLOYEE_ID` from the `SALES` table.

```sql
SELECT s0_.sale_id       AS sale_id0,
       s0_.sale_date     AS sale_date1,
       s0_.eur_value     AS eur_value2,
       e1_.employee_id   AS employee_id3,
       e1_.subsidiary_id AS subsidiary_id4,
       e1_.first_name    AS first_name5,
       e1_.last_name     AS last_name6,
       s0_.subsidiary_id AS subsidiary_id7,
       s0_.employee_id   AS employee_id8
  FROM sales s0_
 INNER JOIN employees e1_
         ON s0_.subsidiary_id = e1_.subsidiary_id
        AND s0_.employee_id   = e1_.employee_id
 WHERE s0_.sale_date > ?
```

The returned objects are compatible with fully loaded objects, but the missing columns remain uninitialized. Accessing them does *not* trigger an exception.

#### Note

MySQL introduced the hash join with version 8.0.18 in 2019.

#### Factbox

- Hash joins do not need indexes on the join predicates. They use the hash table instead.
- A hash join uses indexes only if the index supports the independent predicates.
- Reduce the hash table size to improve performance; either horizontally (less rows) or vertically (less columns).
- Hash joins cannot perform joins that have range conditions in the join predicates ([theta joins](https://en.wikipedia.org/wiki/Join_(relational_algebra)#%CE%B8-join_and_equijoin)).

#### Links

- [Complete Java, Perl and PHP samples [ZIP]](/samples/use-the-index-luke-samples.zip)
- [`CREATE` and `INSERT` statements for the samples](/sql/example-schema)
