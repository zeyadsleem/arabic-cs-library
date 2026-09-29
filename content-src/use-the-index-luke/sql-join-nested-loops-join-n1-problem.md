---
title: "Nested Loops"
lang: en
---

The nested loops join is the most fundamental join algorithm. It works like using two nested queries: the outer or driving query to fetch the results from one table and a second query *for each row* from the driving query to fetch the corresponding data from the other table.

You can actually use “nested selects” to implement the nested loops algorithm on your own. Nevertheless that is a troublesome approach because network latencies occur on top of disk latencies—making the overall response time even worse. “Nested selects” are still very common because it is easy to implement them without being aware of it. Object-relational mapping (ORM) tools are particularly “helpful” in this respect…to the extent that the so-called *N+1 selects problem* has gained a sad notoriety in the field.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-nested-loops&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The following examples show these “accidental nested select” joins produced with different ORM tools. The examples search for employees whose last name starts with `'WIN'` and fetches all `SALES` for these employees.

JavaThe JPA example uses the [CriteriaBuilder](https://docs.oracle.com/javaee/6/api/javax/persistence/criteria/CriteriaBuilder.html) interface.

```
CriteriaBuilder queryBuilder = em.getCriteriaBuilder();
CriteriaQuery<Employees>
   query = queryBuilder.createQuery(Employees.class);
Root<Employees> r = query.from(Employees.class); 
query.where(
  queryBuilder.like(
    queryBuilder.upper(r.get(Employees_.lastName)),
    "WIN%"
  )
);

List<Employees> emp = em.createQuery(query).getResultList();

for (Employees e: emp) {
  // process Employee
  for (Sales s: e.getSales()) {
    // process sale for Employee
  }
}
```

Hibernate JPA 3.6.0 generates N+1 `select` queries:

```sql
select employees0_.subsidiary_id as subsidiary1_0_
       -- MORE COLUMNS
  from employees employees0_ 
 where upper(employees0_.last_name) like ?
```

```sql
  select sales0_.subsidiary_id as subsidiary4_0_1_
         -- MORE COLUMNS
    from sales sales0_
   where sales0_.subsidiary_id=? 
     and sales0_.employee_id=?
```

```sql
  select sales0_.subsidiary_id as subsidiary4_0_1_
         -- MORE COLUMNS
    from sales sales0_
   where sales0_.subsidiary_id=? 
     and sales0_.employee_id=?
```

Perl

The following sample demonstrates Perl’s [DBIx::Class](https://metacpan.org/dist/DBIx-Class) framework:

```javascript
my @employees = 
   $schema->resultset('Employees')
          ->search({'UPPER(last_name)' => {-like=>'WIN%'}});

foreach my $employee (@employees) {
   # process Employee
   foreach my $sale ($employee->sales) {
      # process Sale for Employee
   }
}
```

DBIx::Class 0.08192 generates N+1 `select` queries:

```sql
SELECT me.employee_id, me.subsidiary_id
     , me.last_name, me.first_name, me.date_of_birth 
  FROM employees me 
 WHERE ( UPPER(last_name) LIKE ? )
```

```sql
   SELECT me.sale_id, me.employee_id, me.subsidiary_id
        , me.sale_date, me.eur_value
     FROM sales me
    WHERE ( ( me.employee_id = ? 
      AND me.subsidiary_id = ? ) )
```

```sql
   SELECT me.sale_id, me.employee_id, me.subsidiary_id
        , me.sale_date, me.eur_value
     FROM sales me
    WHERE ( ( me.employee_id = ? 
      AND me.subsidiary_id = ? ) )
```

PHP

The [Doctrine](https://www.doctrine-project.org/) sample uses the query builder interface:

```
$qb = $em->createQueryBuilder();
$qb->select('e')
   ->from('Employees', 'e')
   ->where("upper(e.last_name) like :last_name")
   ->setParameter('last_name', 'WIN%');
$r = $qb->getQuery()->getResult();
foreach ($r as $row) {
   // process Employee
   foreach ($row->getSales() as $sale) {
      // process Sale for Employee
   }
}
```

Doctrine 2.0.5 generates N+1 `select` queries:

```sql
SELECT e0_.employee_id AS employee_id0 -- MORE COLUMNS
  FROM employees e0_
 WHERE UPPER(e0_.last_name) LIKE ?
```

```sql
   SELECT t0.sale_id AS SALE_ID1 -- MORE COLUMNS
     FROM sales t0 
    WHERE t0.subsidiary_id = ? 
      AND t0.employee_id = ?
```

```sql
   SELECT t0.sale_id AS SALE_ID1 -- MORE COLUMNS
     FROM sales t0 
    WHERE t0.subsidiary_id = ? 
      AND t0.employee_id = ?
```

The ORMs don’t generate SQL joins—instead they query the `SALES` table with nested selects. This effect is known as the “N+1 selects problem” or shorter the “N+1 problem” because it executes N+1 selects in total if the driving query returns N rows.

#### Enabling SQL Logging

Enable SQL logging during development and review the generated SQL statements.

[DBIx::Class](https://metacpan.org/release/RIBASUSHI/DBIx-Class-0.082840/view/lib/DBIx/Class/Manual/FAQ.pod#misc)

`export DBIC_TRACE=1` in your shell.

[Doctrine](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/advanced-configuration.html#sql-logger-optional)

Only on source code level—don’t forget to disable this for production. Consider building your own configurable logger.

```
$logger = new \Doctrine\DBAL\Logging\EchoSqlLogger;
$config->setSQLLogger($logger);
```

Hibernate (native)

`true` in `[App.config](https://nhibernate.info/doc/howto/various/configure-log4net-for-use-with-nhibernate)` or `hibernate.cfg.xml`

JPA

In `persistence.xml` but depending on the JPA provider—e.g., for [eclipselink](https://wiki.eclipse.org/EclipseLink/Examples/JPA/Logging), [Hibernate](https://docs.hibernate.org/orm/current/userguide/html_single/#_sql_statement_logging) and [OpenJPA](https://openjpa.apache.org/builds/3.2.2/apache-openjpa/docs/#ref_guide_logging):

```
<property name="eclipselink.logging.level" value="FINE"/>
<property name="hibernate.show_sql" value="TRUE"/>
<property name="openjpa.Log" value="SQL=TRACE"/>
```

Most ORMs offer a programmatic way to enable SQL logging as well. That involves the risk of accidentally deploying the setting in production.

Even though the “nested selects” approach is an anti-pattern, it still explains the *nested loops* join pretty well. The database executes the join exactly as the ORM tools above. Indexing for a nested loops join is therefore like indexing for the above shown `select` statements. That is a [function-based index](/sql/where-clause/functions) on the table `EMPLOYEES` and a [concatenated index](/sql/where-clause/the-equals-operator/concatenated-keys) for the join predicates on the `SALES` table:

```sql
CREATE INDEX emp_up_name ON employees (UPPER(last_name))
```

```sql
CREATE INDEX sales_emp ON sales (subsidiary_id, employee_id)
```

An SQL join is still more efficient than the nested selects approach—even though it performs the same index lookups—because it avoids a lot of network communication. It is even faster if the total amount of transferred data is bigger because of the duplication of employee attributes for each sale. That is because of the two dimensions of performance: [response time and throughput](/sql/testing-scalability/response-time-throughput-scaling-horizontal); in computer networks we call them *latency* and *bandwidth*. Bandwidth has only a minor impact on the response time but latencies have a huge impact. That means that the number of database round trips is more important for the response time than the amount of data transferred.

#### Tip

Execute joins in the database.

Most ORM tools offer some way to create SQL joins. The so-called *eager fetching* mode is probably the most important one. It is typically configured at the property level in the entity mappings—e.g., for the `employees` property in the `Sales` class. The ORM tool will then always join the `EMPLOYEES` table when accessing the `SALES` table. Configuring eager fetching in the entity mappings only makes sense if you always need the employee details along with the sales data.

Eager fetching is counterproductive if you do not need the child records every time you access the parent object. For a telephone directory application, it does not make sense to load the `SALES` records when showing employee details. You might need the related sales data in other cases—but not always. A static configuration is no solution.

For optimal performance, you need to gain full control over joins. The following examples show how to get the greatest flexibility by controlling the join behavior at runtime.

JavaThe JPA [`CriteriaBuilder`](https://docs.oracle.com/javaee/6/api/javax/persistence/criteria/CriteriaBuilder.html) interface provides the `Root<>.fetch()` method for controlling joins. It allows you to specify when and how to join referred objects to the main query. In this example we use a left join to retrieve all employees even if some of them do not have sales.

#### Warning

JPA and Hibernate return the employees *for each sale.*

That means that an employee with 30 sales will appear 30 times. Although it is very disturbing, it is the specified behavior ([EJB 3.0 persistency, paragraph 4.4.5.3 “Fetch Joins”](https://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/)). You can either manually de-duplicate the parent relation e.g. using a [`LinkedHashSet`](https://developer.jboss.org/docs/DOC-15782#jive_content_id_Hibernate_does_not_return_distinct_results_for_a_query_with_outer_join_fetching_enabled_for_a_collection_even_if_I_use_the_distinct_keyword) or use the function `distinct()` as shown in the example.

```
CriteriaBuilder qb = em.getCriteriaBuilder();
CriteriaQuery<Employees> q = qb.createQuery(Employees.class);
Root<Employees> r = q.from(Employees.class); 
q.where(queryBuilder.like(
    queryBuilder.upper(r.get(Employees_.lastName)),
    "WIN%")
);

r.fetch("sales", JoinType.LEFT);
// needed to avoid duplication of Employee records
q.distinct(true);

List<Employees> emp = em.createQuery(q).getResultList();
```

Hibernate 3.6.0 generates the following SQL statement:

```sql
select distinct 
       employees0_.subsidiary_id as subsidiary1_0_0_
     , employees0_.employee_id as employee2_0_0_
       -- MORE COLUMNS
     , sales1_.sale_id as sale1_0__
  from employees employees0_
  left outer join sales sales1_ 
          on employees0_.subsidiary_id=sales1_.subsidiary_id
         and employees0_.employee_id=sales1_.employee_id 
 where upper(employees0_.last_name) like ?
```

The query has the expected left join but also an unnecessary `distinct` keyword. Unfortunately, JPA does not provide separate API calls to filter duplicated parent entries without de-duplicating the child records as well. The `distinct` keyword in the SQL query is alarming because most databases will actually filter duplicate records. Only a few databases recognize that the primary keys guarantees uniqueness in that case anyway.

The native Hibernate API solves the problem on the client side using a result set transformer:

```
Criteria c = session.createCriteria(Employees.class);
c.add(Restrictions.ilike("lastName", 'Win%'));

c.setFetchMode("sales", FetchMode.JOIN);
c.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

List<Employees> result = c.list();
```

It generates the following query:

```sql
select this_.subsidiary_id as subsidiary1_0_1_
     , this_.employee_id as employee2_0_1_
       -- MORE this_ columns on employees
     , sales2_.sale_id as sale1_3_
       -- MORE sales2_ columns on sales
  from employees this_ 
  left outer join sales sales2_ 
          on this_.subsidiary_id=sales2_.subsidiary_id 
         and this_.employee_id=sales2_.employee_id 
 where lower(this_.last_name) like ?
```

This method produces straight SQL without unintended clauses. Note that Hibernate uses `lower()` for case-insensitive queries—an important detail for [function-based indexing](/sql/where-clause/functions).

Perl

The following example uses Perl’s [DBIx::Class](https://metacpan.org/dist/DBIx-Class) framework:

```
my @employees = 
   $schema->resultset('Employees')
          ->search({ 'UPPER(last_name)' => {-like => 'WIN%'}
                   , {prefetch => ['sales']}
                   });
```

DBIx::Class 0.08192 generates the following SQL statement:

```sql
SELECT me.employee_id, me.subsidiary_id, me.last_name
       -- MORE COLUMNS
  FROM employees me 
  LEFT JOIN sales sales 
         ON (sales.employee_id   = me.employee_id 
        AND  sales.subsidiary_id = me.subsidiary_id) 
 WHERE ( UPPER(last_name) LIKE ? )
 ORDER BY sales.employee_id, sales.subsidiary_id
```

Note the `order by` clause—it was not requested by the application. The database has to sort the result set accordingly, and that might take a while.

PHP

The following example uses PHP’s [Doctrine](https://www.doctrine-project.org/) framework:

```
$qb = $em->createQueryBuilder();
$qb->select('e,s')
   ->from('Employees', 'e')
   ->leftJoin('e.sales', 's')
   ->where("upper(e.last_name) like :last_name")
   ->setParameter('last_name', 'WIN%');
$r = $qb->getQuery()->getResult();
```

Doctrine 2.0.5 generates the following SQL statement:

```sql
SELECT e0_.employee_id AS employee_id0
       -- MORE COLUMNS
  FROM employees e0_ 
  LEFT JOIN sales s1_ 
         ON e0_.subsidiary_id = s1_.subsidiary_id 
        AND e0_.employee_id = s1_.employee_id 
 WHERE UPPER(e0_.last_name) LIKE ?
```

The execution plan shows the `NESTED LOOPS OUTER` operation:

Db2 (LUW)

```
Explain Plan
---------------------------------------------------------------
ID | Operation               |                     Rows |  Cost
 1 | RETURN                  |                          | 10501
 2 |  NLJOIN (LEFT)          |               5745 of 57 | 10501
 3 |   FETCH EMPLOYEES       |       57 of 57 (100.00%) |    49
 4 |    RIDSCN               |       57 of 57 (100.00%) |     6
 5 |     SORT (UNIQUE)       |       57 of 57 (100.00%) |     6
 6 |      IXSCAN EMP_NAME    |    57 of 10000 (   .57%) |     6
 7 |   FETCH SALES           |     101 of 101 (100.00%) |   183
 8 |    IXSCAN SALES_SUB_EMP | 101 of 1011118 (   .01%) |    13

Predicate Information
 2 - JOIN (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
     JOIN (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
 3 - SARG (Q1.LAST_NAME LIKE ?)
 6 - START ($INTERNAL_FUNC$() <= Q1.LAST_NAME)
      STOP (Q1.LAST_NAME <= $INTERNAL_FUNC$())
      SARG (Q1.LAST_NAME LIKE ?)
 8 - START (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
     START (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
      STOP (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
      STOP (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
```

The `UPPER` was removed from the `where`-clause to get the expected result.

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |  822 |   38 |
| 1 | NESTED LOOPS OUTER          |             |  822 |   38 |
| 2 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    4 |
|*3 |   INDEX RANGE SCAN          | EMP_UP_NAME |    1 |      |
| 4 |  TABLE ACCESS BY INDEX ROWID| SALES       |  821 |   34 |
|*5 |   INDEX RANGE SCAN          | SALES_EMP   |   31 |      |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  3 - access(UPPER("LAST_NAME") LIKE 'WIN%')
      filter(UPPER("LAST_NAME") LIKE 'WIN%')
  5 - access("E0_"."SUBSIDIARY_ID"="S1_"."SUBSIDIARY_ID"(+)
        AND  "E0_"."EMPLOYEE_ID"  ="S1_"."EMPLOYEE_ID"(+))
```

The database retrieves the result from the `EMPLOYEES` table via `EMP_UP_NAME` first and fetches the corresponding records from the `SALES` table for each employee afterwards.

#### Tip

Get to know your ORM and take control of joins.

Different ORM tools offer different ways to control join behavior. Eager fetching is just one example that is not even provided by every object-relational mapper. It is good practice to implement a small set of samples that explores the capabilities of your ORM. That’s not only a good exercise, it can also serve as reference during development, and will show you unexpected behavior—like duplication of parent records as a side effect of using joins. [Download the samples](/samples/use-the-index-luke-samples.zip) to get started.

The nested loops join delivers good performance if the driving query returns a small result set. Otherwise, the optimizer might choose an entirely different join algorithm—like the hash join described in the next section, but this is only possible if the application uses a join to tell the database what data it actually needs.

#### Links

- [Complete Java, Perl and PHP samples [ZIP]](/samples/use-the-index-luke-samples.zip)
- [`CREATE` and `INSERT` statements for the samples](/sql/example-schema)
- Article: “[Latency: Security vs. Performance](https://blog.fatalmind.com/2009/12/22/latency-security-vs-performance/)” about network latencies and SQL applications.
