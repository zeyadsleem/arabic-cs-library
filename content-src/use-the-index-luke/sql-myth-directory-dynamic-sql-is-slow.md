---
title: "Dynamic SQL is Slow"
lang: en
---

The true essence of the “*Dynamic SQL is Slow*” myth is rather simple; dynamic SQL can be slow—when done wrong.

The problem is that dynamic SQL is often used for the wrong reason, sometimes even without knowing. To clarify the confusion, I will use the following terms as explained:

Embedded SQL

Embedding SQL directly into program source code is very common in procedural database languages such as Oracle PL/SQL or Microsoft Transact-SQL. It is also possible to embed SQL into other languages such as C.

The benefit of embedded SQL is the smooth integration with the respective programming language. However, embedded SQL is compiled into the program. It can not change a runtime—it’s static.

Dynamic SQL

Dynamic SQL is handled as string within the application. The application may change the SQL string at runtime before passing it to the database layer. It is actually the most common way to access databases.

Static SQL

I use the term *static SQL* to describe SQL statements that do not change at runtime. No matter if it is embedded SQL that cannot change at runtime, or dynamic SQL that could change, but doesn’t.

The crux of these definitions is that a statement can be dynamic and static SQL at the same time. In other words, there are different levels of dynamic SQL. Consider the following example:

```
String sql = "SELECT first_name, last_name"
           + "  FROM employees"
           + " WHERE employee_id = " + employeeId;

ResultSet rs = con.executeQuery(sql);
```

Is that dynamic SQL? According to the definition above, it is. The SQL statement is prepared as string and passed to the database layer. But is it static SQL as well? Assuming that value of the `employeeId` variable changes, it’s not static SQL because the SQL string changes at runtime. It is an example for dynamic SQL that will actually hurt performance. The problem is not that it is dynamic SQL but that it doesn’t use [bind variables](/sql/where-clause/bind-parameters). SQL bind variables—e.g., the question mark `?` or `:name`—are placeholders for values that change during execution. That means, that the example can be turned into static SQL by using a bind variable instead of the actual value of the `employeeId` variable.

#### Important

Not using [bind parameters](/sql/where-clause/bind-parameters) is misused dynamic SQL.

Bind parameters are very important for security and performance.

A reasonable use of dynamic SQL is to change the *structure* of the statement at runtime. That’s something that [cannot be done with bind parameters](/sql/where-clause/bind-parameters#note-bind-not-dynamic-sql). E.g., a conditional `where` clause:

```
String where = "";
if (subsidiaryId != null) {
   where += (where == "") ? " WHERE " : " AND " 
         +  "subsidiary_id = " + subsidiaryId;
}
if (employeeId != null) {
   where += (where == "") ? " WHERE " : " AND " 
         +  "employee_id = " + employeeId;
}
if (lastName != null) {
   where += (where == "") ? " WHERE " : " AND " 
         +  "UPPER(last_name) = '"+lastName.toUpperCase()+"'";
}
String SQL = "SELECT employee_id, first_name, last_name "
           + "  FROM employees" 
           +   where;
// execute SQL
```

The code builds an SQL statement to fetch employees based on any combination of three filter criteria. Although it is rather awkward, the constructed SQL can be executed using the best available index. Nevertheless, this approach is troublesome because of the possible [SQL injection vulnerability](https://en.wikipedia.org/wiki/SQL_injection#Forms_of_vulnerability) and the high optimization overhead: that the database has to recreate the execution plan every time, because the search terms—that can be different every time—prevent caching. [*Parameterized Queries*](/sql/where-clause/bind-parameters) explains the optimization overhead in detail. Again, dynamic SQL is again not the problem but not using bind parameters is.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=myth-dynamic-sql&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

An example that builds the `where` clause dynamically and uses bind parameters is omitted because it is even more awkward as the example above. However, most ORM frameworks offer a sufficiently convenient way to dynamically create SQL using bind parameters. The following overview shows some samples:

Java

The following sample demonstrates Hibernate’s [Criteria](https://docs.hibernate.org/orm/6.2/userguide/html_single/#criteria) classes:

```
Criteria criteria = session.createCriteria(Employees.class);

if (subsidiaryId != null) {
  criteria.add(Restrictions.eq("subsidiaryId", subsidiaryId));
}
if (employeeId != null) {
  criteria.add(Restrictions.eq("employeeId", employeeId));
}
if (lastName != null) {
  criteria.add(
    Restrictions.eq("lastName", lastName).ignoreCase()
  );
}
```

When providing `LAST_NAME` only, the following SQL is generated by Hibernate (Oracle):

```sql
select this_.subsidiary_id as subsidiary1_0_0_,
       [... other columns ...]
  from employees this_
 where lower(this_.last_name)=?
```

Please note that a bind parameter is used and the `LOWER` function to implement the [ignoreCase()](https://docs.hibernate.org/core/3.6/javadocs/org/hibernate/criterion/SimpleExpression.html#ignoreCase%28%29) functionality. The same is true for the [ilike restriction](https://docs.hibernate.org/orm/current/userguide/html_single/#hql-like-predicate). That’s a very important fact for [function-based indexing](/sql/where-clause/functions/case-insensitive-search).

The Java Persistence API (JPA) has a similar functionality:

However, it’s less straight and doesn’t support a native case-insensitive search that’s probably good):

```
List<Predicate> predicates = new ArrayList<Predicate>();

if (lastName != null) {
   predicates.add(queryBuilder.equal(
         queryBuilder.upper(r.get(Employees_.lastName))
       , lastName.toUpperCase())
   );
}
if (employeeId != null) {
   predicates.add(queryBuilder.equal(
         r.get(Employees_.employeeId)
       , employeeId)
   );
}
if (subsidiaryId != null) {
   predicates.add(queryBuilder.equal(
         r.get(Employees_.subsidiaryId)
       , subsidiaryId)
   );
}

query.where(predicates.toArray(new Predicate[0]));
```

You see that the example is less straight in favor of compile time type safety. Another difference is that JPA doesn’t support native case-insensitive operators—explicit case conversion is needed. That’s probably good to have awareness and control over it. Just as a side note; the native Hibernate API supports explicit case conversion as well.

Perl

The following sample demonstrates Perl’s [DBIx::Class](https://metacpan.org/dist/DBIx-Class) framework:

```
my @search = ();

if (defined $employee_id) {
   push @search, {employee_id => $employee_id};
}
if (defined $subsidiary_id) {
   push @search, {subsidiary_id => $subsidiary_id};
}
if (defined $last_name) {
   push @search, {'UPPER(last_name)' => uc($last_name)};
}

my @employees = $schema->resultset('Employees')
              ->search({-and => \@search});
```

```sql
SELECT me.employee_id, me.subsidiary_id,
       me.last_name,   me.first_name,
       me.date_of_birth
  FROM employees me
 WHERE ( UPPER(last_name) = :p1 )
```

PHP

The following sample demonstrates PHP’s [Doctrine](https://www.doctrine-project.org/) framework:

```
$filter = $qb->expr()->andx();

if (isset($employee_id)) {
   $filter->add(
       $qb->expr()->eq('e.employee_id', ':employee_id'));
   $qb->setParameter('employee_id', $employee_id);
}
if (isset($subsidiary_id)) {
   $filter->add(
       $qb->expr()->eq('e.subsidiary_id', ':subsidiary_id'));
   $qb->setParameter('subsidiary_id', $subsidiary_id);
}
if (isset($last_name)) {
   $filter->add($qb->expr()->eq(
       $qb->expr()->upper('e.last_name'), ':last_name'));
   $qb->setParameter('last_name', strtoupper($last_name));
}

if ($filter->count() > 0) {
   $qb->where($filter);
}
```

Doctrine generates the following SQL for a search by last name (MySQL):

```sql
SELECT e0_.employee_id AS employee_id0, 
       [... other columns ...]
  FROM employees e0_
 WHERE UPPER(e0_.last_name) = ?
```

#### Tip

Download the [complete sample code](/samples/use-the-index-luke-samples.zip) and try yourself.

Using dynamic SQL with bind parameters allows the optimizer to choose the best execution plan for the particular combination of `where` clauses. That will yield better performance than constructions like described in [*Smart Logic*](/sql/where-clause/obfuscation/smart-logic):

```sql
SELECT first_name, last_name
  FROM employees
 WHERE (     employee_id = ? OR ? IS NULL)
   AND (   subsidiary_id = ? OR ? IS NULL)
   AND (UPPER(last_name) = ? OR ? IS NULL)
```

The reason for the observation that dynamic SQL is slow is very often not using bind parameters—that is, using dynamic SQL for the wrong reason.

However, there are some—I’d say rare—cases when dynamic SQL can be slower than “smart logic” like above. That’s when very cheap (fast) SQL statements are executed at a very high frequency. But, first of all, there are two more terms to explain:

Hard Parsing

Hard parsing is constructing an execution plan based on the SQL statement. That’s a major effort; inspecting all parts of the SQL; considering all indexes; considering all join orders and so on. Hard parsing is very resource intensive.

Soft Parsing

Soft parsing is searching, finding and using a cached execution plan. There are some minor checks done, e.g., access rights, but the execution plan can be re-used as is. That is a rather fast operation.

The key to the cache is basically the literal SQL string—usually a hash of it. If there is no exact match, a hard parse is triggered. That’s why inlined literals—as opposed to bind parameters—trigger a hard parse unless the very same search terms are used again. But even in that case there are good chances that the previous execution plan was already expired from the cache because new ones are coming over and over again.

However, there is a way to execute a statement without any parsing at all—not even soft parsing. The trick is to keep the parsed statement open, e.g., like in the following Java pseudo-code:

```
PreparedStatement pSQL = con.prepareStatement("select ...");
for (String last_name:last_names) {
    pSQL.setString(1, last_name.toUpperCase());
    ResultSet rs = pSQL.executeQuery();
    // process result
}
pSQL.close();
```

Note that the `PreparedStatement` is opened and closed once only—yet it can be executed many times. That means that there is only one parsing operation—during prepare—but non inside the loop.

The pitfall is that converting the statement to dynamic SQL moves the `prepareStatement` call into the loop—causing a soft-parse for each execution. The parsing overhead, that might also include network latencies, can exceed the savings of a better execution plan when the statement is executed often and runs fast anyway. That’s especially true if the actual execution plan doesn’t vary for the different where clauses—e.g., because one well indexed `where` clause is always present.

Even though the “prepare before loop” trick is seldom used explicitly, it is very common in stored procedures—but implicit. Languages such as PL/SQL—with real static SQL—prepare the SQL when the procedure is compiled or, at most, once per execution. Changing that to dynamic SQL can easily kill performance.

#### Tip

- [Correctly using Bind-Parameters](/sql/where-clause/bind-parameters)
- Article: “[Planning for Re-Use](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)” about execution plan caching
- [Avoid Smart-Logic for conditional where clauses](/sql/where-clause/obfuscation/smart-logic)
