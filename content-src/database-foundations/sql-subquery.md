---
title: "Subqueries"
lang: en
---

> Programming, it turns out, is hard. The fundamental rules are typically simple and clear. But programs built on top of these rules tend to become complex enough to introduce their own rules and complexity. You’re building your own maze, in a way, and you might just get lost in it. &mdash;Marijn Haverbeke

## Schema students_campus

Take a quick look at the figure's ERD. You can find the schema ‘students_campus’ in the database ‘df’ via the pooling connection (or the 5... connection). Do a `SELECT *` of both tables to get an idea of the information contained in the schema.

![](/images/database-foundations/sql-subquery-0-ERD_student_campus.webp)

Specifically, it involves a listing of all eight campuses of UCLL and a table of 1,000 students with some personal information for each student, which campus they go to (a student can only belong to one campus) and how far they live from this campus. The latter field is not mandatory. By the way, we created this schema as an example for automatic data generation in DBSchema or using a site such as [https://mockaroo.com](https://mockaroo.com).

## Who lives farther from a campus than the average distance?

There are several types of SQL queries. One kind asks only the answer to a question. That can be a number, one or more names, a date, ... For this type of query, you do not need to provide the query/queries used. Only the answer is sufficient. An example of such a question is the following exercise. Make that one and check your answer.

How many students live farther from their campus than the average distance? Only the answer was asked, not the queries you used. Can you find the correct answer: 401 students?

#### الحل

This is typically a question you can quickly solve with two simple queries. The first query looks for the average of all distances:

```sql
SELECT AVG(distance_to_campus)
FROM student;
```

The result of this query is 52.01658. Note that null values do not count to calculate an average, such as [the documentation briefly mentions for the function ‘avg’](https://www.postgresql.org/docs/15/functions-aggregate.html). You can now use this number in a subsequent query:

```sql
SELECT count(*) -- or simply use * and read the number of lines in the query tool
FROM student
WHERE distance_to_campus > 52.01658;
```

So for this type of SQL query, just answer ‘401’. Fine, point earned!

However, for another type of exam question, you need to *give the query*. In addition you may only give *one* query, which your lecturer must be able to copy and execute in pgAdmin. A solution with two separate queries, where you then have to copy the answer of the first to the second query is not allowed.

The above exercise has an elegant solution: use a *subquery* (also called a *nested query*). The following query provides the solution (401) of the exercise in one query:

```sql
SELECT COUNT(*)
FROM student
WHERE distance_to_campus > (
  SELECT AVG(distance_to_campus)
  FROM student
);
```

In the `WHERE` clause, a new `SELECT` is started. We call this query the *inner query*. The query around it is called the *outer query*. You can define different levels of nesting. A subquery can return one or more rows to the calling query. The above is an example of a *scalar* subquery: as the subquery returns only *one number*. You can nest a subquery in the `SELECT`, `FROM`, `WHERE` or `HAVING` clause.

## Average distance of Proximus students

### Two versions of the same exercise

Now solve the following exercise with a subquery:

Give the average distance to campus of all students attending campus Proximus. Use one query with a subquery. The answer is: 49.0319

#### الحل

```sql
SELECT avg(distance_to_campus)
FROM student
WHERE campus_id = (
  SELECT id
  FROM campus
  WHERE name = 'Campus Proximus'
);
```

Perhaps when reading the above statement you thought ‘I can do that just as well with a `JOIN`?’ Rightly so! Now solve the same exercise without a subquery by just using a `JOIN`:

Give the average distance to campus of all students going to campus Proximus using a `JOIN`.

#### الحل

```sql
SELECT avg(distance_to_campus)
FROM student S INNER JOIN campus C on S.campus_id = C.id
WHERE C.name = 'Campus Proximus';
```

### Choosing between JOIN and subquery

Sometimes you have no choice and have to use a subquery, as in the first exercise. You can't solve that one with a `JOIN`. Conversely, for some queries you need a `JOIN`. However, sometimes you have the choice between a subquery and a `JOIN`. It is difficult to unambiguously define which is the best choice. For complex queries, a `JOIN` is often *more* efficient. A subquery is usually easier to read, though.

In any case, you should be able to use both types of query. It is possible that for a given query on the exam you will have to explicitly use one of both.

## Subquery with IN operator

We looked at the `IN` operator already [in the section on the `WHERE` clause](/EN/SQL_where/index.html#IN). After `IN` the result of a subquery can be used. Try the following exercise.

Show the five oldest students attending a campus in Heverlee. Work with a subquery.

![](/images/database-foundations/sql-subquery-1-oudste5Heverlee.webp)

#### الحل

```sql
SELECT first_name || ' ' || last_name AS name, birth_date
FROM student
WHERE campus_id IN (
  SELECT id
  FROM campus
  WHERE location = 'Heverlee'
)
ORDER BY birth_date
LIMIT 5;
```

This exercise can also be perfectly solved with a `JOIN`. Try the exercise again with a `JOIN`.

#### الحل

```sql
SELECT first_name || ' ' || last_name AS name, birth_date
FROM student S INNER JOIN campus C ON S.campus_id = C.id
WHERE location = 'Heverlee'
ORDER BY birth_date
LIMIT 5;
```

## Subquery with the ALL operator

The `ALL` operator compares a value to *every* value of the result table. We illustrate this with the following example.

List all students who are younger than all students whose whose first name begins with ‘Al’. Again, you could solve this with two queries. First, query the birth dates of all students with the first name requested:

```sql
SELECT birth_date
FROM student
WHERE (first_name like 'Al%')
ORDER BY birth_date DESC;
```

It turns out that the youngest of these students was born on Feb. 27. 2004. You can now query in a second query all students with a birth date greater than (because they must be younger!) this date:

```sql
SELECT *
FROM student
WHERE birth_date > '2004-02-27'
ORDER BY birth_date DESC;
```

You will eventually find a list of 22 students.

You can combine these two consecutive queries into one query by using a subquery. You will find the same 22 students:

```sql
SELECT *
FROM student
WHERE birth_date > ALL (
  SELECT birth_date
  FROM student
  WHERE first_name LIKE 'Al%'
)
ORDER BY birth_date DESC;
```

The following exercise does not look so difficult at first glance, but there is an unexpected problem that you might struggle with. Tips and solution can be found in the usual place, but try this exercise yourself first!

List all students who live closer to their campus than all students who attend a campus in Diest and whose last name contains the letter ‘a’ twice (capital letters are also allowed). You may use only one query (which may, of course, contain subqueries). Rank according to increasing campus_id and decreasing distance.

![](/images/database-foundations/sql-subquery-2-afstandDiest.webp)

#### الحل

It is a good idea to solve such an exercise in pieces. Sub-question 1: What is the campus_id of the campus(es) in Diest?

```sql
SELECT id
FROM campus
WHERE location = 'Diest';
```

There appears to be only one campus in Diest, namely the campus with id = 2. With this we can now answer part 2 of the question: give all students from this campus who have a family name with two times ‘a’ (upper or lower case does not matter).

```sql
SELECT *
FROM student
WHERE lower(last_name) LIKE '%a%a%' AND campus_id = 2
ORDER BY distance_to_campus ASC;
```

Verify that the result effectively includes only students who attend campus 2 and have a surname with at least 2 times the letter ‘a’. The smallest distance turns out to be 15 km. Finally, we can answer the last part of the question: all students from the student table who live less than 15 km from their campus:

```sql
SELECT *
FROM student
WHERE distance_to_campus < 15
ORDER BY campus_id ASC, distance_to_campus DESC;
```

This turns out to be a list of 106 students. Puzzling everything together into one big query, with two subqueries in it is now not so difficult:

```sql
SELECT *
from student
WHERE distance_to_campus < ALL (
  SELECT distance_to_campus
  FROM student
  WHERE lower(last_name) LIKE '%a%a%' AND campus_id IN (
    SELECT id
    FROM campus
    WHERE location = 'Diest'
  )
)
ORDER BY campus_id ASC, distance_to_campus DESC;
```

*Yet this query does not appear to give the correct result. The result does not contain any rows at all! What is going on?*

The problem is in sub-question 2. After all, the list of all students from campus 4 with twice an ‘a’ in the surname contains a number of null values in the distance. Any comparison of a number with a null always gives a null, as this query demonstrates:

```sql
SELECT null > 999 -- result is not true or false but null
SELECT null <= 999 -- result is not true or false but null;
```

As a result, each test `WHERE distance_to_campus < ALL ...` will always fail, leaving no row in the result. Fortunately, the solution is not that difficult: * In sub-question 2, avoid null values in the result *. So we add a single condition in the first subquery:

```sql
SELECT *
from student
WHERE distance_to_campus < ALL (
  SELECT distance_to_campus
  FROM student
  WHERE lower(last_name) LIKE '%a%a%'
    AND distance_to_campus IS NOT null --Avoid null in the result
    AND campus_id IN (
      SELECT id
      FROM campus
      WHERE location = 'Diest'
    )
)
ORDER BY campus_id ASC, distance_to_campus DESC;
```

## Subquery with the ANY operator

The `ANY` operator compares a value to any value in a table and is satisfied *if the comparison applies to at least one value in the table*. The table being compared to must contain at least one value. The example below explains the principle.

We want a list of all students from campus 7 who are older than at least one student from campus 4. The following code returns a list of 135 students who meet the condition:

```sql
SELECT *
FROM student
WHERE campus_id = 7 AND birth_date < ANY(
  SELECT birth_date
  FROM student
  WHERE campus_id = 4
);
```

As always, it's a good idea to parse a query properly to understand how everything works. Let's query the list of all students from campus 7:

```sql
SELECT *
FROM student
WHERE campus_id = 7;
```

That list contains 136 students, so one more than the first query! We quickly examine where the difference is.

We are looking for the youngest student from campus 4 first:

```sql
SELECT *
FROM student
WHERE campus_id = 4
ORDER BY 4 DESC;
```

That turns out to be Lisa Vargas, born Sept. 30, 2004. In campus 7 however, there is one student even younger than Lisa Vargas, namely Kate Gonzales, born on Oct. 12, 2004. Thus, she does not meet the condition with the `ANY` and consequently does not appear in the result.
