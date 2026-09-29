---
title: "The GROUP BY and HAVING clauses in detail"
lang: en
---

> Confusion is part of programming. &mdash;Felienne Hermans, The Programmer's Brain

## Grouping rows

In [the chapter on importing a CSV file](/EN/SQL_CSV/index.html#Grouping-data-with-GROUP-BY) you came into contact with grouping rows for the first time. Often this involves a question containing the words ‘for each’. An example: “Enter *for each lecturer* the number of courses for which this lecturer is coordinator”. “Please provide ** the total number of credits from all courses now or previously given in that language”. Granted, that last sentence does not contain the words ‘for each’, but you can rephrase it as “Provide *for each language* the total number of credits of all courses that are or have been given in that language.”.

The image we use is: *group the rows with the same value of a given field (or fields) in a box*. From that box, you can then no longer view individual rows (you're not allowed to open the box). You must limit yourself *to summary information*.

As an example, let's consider the question above: “For each lecturer, please provide the number of courses for which this lecturer is (or was) the coordinator.”.

You can test the code examples in the table ‘course’ of the schema ‘ucllcatalogue’ (or in your own version of this table in your personal schema).

In a first step, as an exercise, write the query that generates the following figure, namely a list of all coordinators with code, name and semester, ordered by lecturer code (u-number, ascending):

![](/images/database-foundations/sql-groupby-having-0-sortbycoord.webp)

Not such a difficult query, right?

#### الحل

```sql
SELECT coordinator, code, name, semester
FROM course
ORDER BY coordinator;
```

You can read in this figure that lector ‘u0012047’ is (or was) coordinator of ‘Probleemoplossend denken’, ‘Web Development 1’ and ‘Front-end Development’. Now if you group by lector then all rows with the same value for the ‘coordinator’ column are put together in one box. The first box thus contains three rows. On the box is the name of the field that is common to all these rows, so ‘u0012047’.

The second box labeled ‘u0015529’ contains two rows. The third box (‘u0032987’) contains only one row, etc.

Because these rows are together in a box (and you're not allowed to open the boxes to look at specific rows), you can no longer retrieve individual data in the `SELECT` clause. If you try to do that you get a typical error message, as the following piece of code shows:

```sql
SELECT coordinator, code, name, semester
FROM course
GROUP BY coordinator;

-- the result of this query is this error:
ERROR: column "course.code" must appear in the GROUP BY clause
  or be used in an aggregate function
LINE 2: select coordinator, code, name, semester
                            ^
SQL state: 42803
Character: 50
```

This query just shows a summary of all the ‘labels’ of the boxes and is executed without any problems:

```sql
SELECT coordinator
FROM course
GROUP BY coordinator;
```

You may only look inside the box and provide certain summary information given in the `SELECT`, such as the number of rows, the sum of all the rows as far as a particular column is concerned. *We call these summary functions ‘aggregation functions’ and talk about data ‘aggregation'*. In the next section, we look at several of these functions.

## Aggregation functions

### Counting the number of rows

The question we are still trying to answer is “For each lecturer, please provide the number of courses for which this lecturer is (or was) the coordinator.”. In this sentence you already know by now that the ‘for each lecturer’ bit means that you have to group together rows that have the same value for coordinator. * Counting the number of rows contained in one box* is done with the function `COUNT()` ([documentation](https://www.postgresql.org/docs/current/functions-aggregate.html)). If you want to count full rows, use `COUNT(*)`.

The final query that returns the answer to the question is:

```sql
SELECT coordinator, COUNT(*)
FROM course
GROUP BY coordinator
ORDER BY coordinator;
```

### Sum of certain data in a group

A second aggregation function is `SUM()`. *You use it to sum values in a given column*. Caution: we regularly see students who mix up `COUNT()` en `SUM()`! Now make the following exercise.

Write a SQL query that generates the summary of the total number of credits for which a lecturer is coordinator. Organize the result according to decreasing total number of credits. You should obtain the figure below. As always: also pay attention to the correct heading of each column.

![](/images/database-foundations/sql-groupby-having-1-sumSP.webp)

#### الحل

```sql
SELECT coordinator, SUM(credits) AS "total number of credits"
FROM course
GROUP BY coordinator
ORDER BY 2 DESC;
```

### Minimum, maximum and average

The last three aggregation functions are `MIN()`, `MAX()`and `AVG()`, respectively, for the minimum, maximum or arithmetic mean of *values in a given column*. Make the following exercises.

Create a list that shows the average number of credits for each semester. Order the answer rows by semester from small to large. Your should obtain the figure below. Can you also include the name of the course?

![Grouped on semester](/images/database-foundations/sql-groupby-having-2-groupavgsemester.webp)

#### الحل

Not every task will contain the word ‘for each’. Language has many alternatives for asking the same thing. So here you will have to group by semester and you will have to use the aggregation function `AVG()`. Obviously, you cannot retrieve information from individual courses (such as the name) because that is ‘information that is inside the box’. The following query is a possible solution:

```sql
SELECT semester, AVG(credits) AS "average number of credits"
FROM course
GROUP BY semester
ORDER BY 1;
```

Slightly more difficult ... List by language the number of courses of at least 4 credits taught in that language. You don't have to order.

#### الحل

```sql
SELECT language, COUNT(*) AS number
FROM course
WHERE credits >= 4
GROUP BY language;
```

## Grouping on an expression

Usually you group on a particular column, but it is also possible to group on a ‘calculated column’ (expression). Each course has a start date. From this start date you can easily extract the year with [`EXTRACT`](/NL/SQL_select/index.html#Extract-…-from). As an example, we provide the query that answers the following question: “List for each year how many courses entered the program in that year.”.

```sql
SELECT EXTRACT(year FROM start_date), COUNT(*) AS "number of courses"
FROM course
GROUP BY EXTRACT(year FROM start_date)
ORDER BY 1;
```

## Grouping on multiple columns

The following query groups on two columns: semester and credits:

```sql
SELECT semester, credits, COUNT(*)
FROM course
GROUP BY semester, credits
ORDER BY 1, 2;
```

This query creates 15 boxes (see figure). The first box (orange border) shows on the label ‘semester 1, courses with 3 credits’. There are four rows in this box. The second box (blue border) is ‘semester 1, courses with 4 credits’. In this box there is only one course. etc.

![Grouping can be on multiple columns](/images/database-foundations/sql-groupby-having-3-grouptweekol.webp)

## HAVING

The `HAVING` clause has already been covered [in the chapter on CSV files](/EN/SQL_CSV/index.html#HAVING). Students often find it difficult to distinguish it from the `WHERE` clause, which is understandable because they are doing something similar. The `WHERE` follows immediately after the execution of the `FROM` component and selects *which rows may remain and which will disappear*.

The `HAVING` component, however, is executed only after creating the ‘boxes’ when grouping. *This condition decides which boxes may remain and which will disappear from the result*.

## Exercises

Now make the following exercises.

For odd semesters (so 1, 3, 5, …), list the number of credits and number of courses in that semester. Sort according to decreasing number of credits. You should obtain the following figure.

A tip for finding the odd semesters: to do this, look at the possibilities of *the remainder in integer division* (the so-called ‘modulo’ operation), do a search for ‘Modulo’ on the page [https://www.postgresql.org/docs/current/functions-math.html](https://www.postgresql.org/docs/current/functions-math.html).

![group on odd semesters](/images/database-foundations/sql-groupby-having-4-grouponevensem.webp)

#### الحل

```sql
SELECT semester, SUM(credits) AS "total number of credits", COUNT(*) AS "number of courses"
FROM course
WHERE semester %2 != 0
GROUP BY semester
ORDER BY 2 DESC;
```

How many different coordinators are there for each semester?

#### الحل

```sql
SELECT SEMESTER, COUNT(DISTINCT(coordinator)) AS number_of_different_coordinators
FROM course
GROUP BY semester;
```

Give all semesters with two or more ‘follow-up’ courses (courses ending with ‘2’) per semester.

#### الحل

```sql
SELECT semester, COUNT(name) AS number_of_follow_up_courses
FROM course
WHERE name LIKE'%2'
GROUP BY semester
HAVING COUNT(name) >= 2;
```

This gives a ‘wrong’ result because the course ‘Communication in French 2 (sem 2)’ does not follow the (unspoken?) convention in terms of name. This version may give a better result:

```sql
SELECT semester, COUNT(name) AS number_of_follow_up_courses
FROM course
WHERE name LIKE '%2' OR name LIKE '%2 (%'
GROUP BY semester
HAVING COUNT(name) >= 2;
```

## Exercises SQLzoo

Make [Exercise series 5 on aggregation functions](https://sqlzoo.net/wiki/SUM_and_COUNT) (table ‘world’).
