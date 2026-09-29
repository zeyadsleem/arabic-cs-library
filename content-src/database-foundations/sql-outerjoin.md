---
title: "Combining tables with OUTER JOIN"
lang: en
---

> You can’t complain about the sea if you suffer shipwreck for the second time. &mdash;Icelandic proverb

Again, we start with a movie: the sequel to the movie from the previous chapter on Inner Join.

## The need for an OUTER JOIN

Make the following exercise as an introduction.

Our program manager would like an overview of all lecturers with their lecturer id, first name, last name and the name of the course of which they are coordinator. Sort alphabetically by last name. You should obtain the figure below.

![](/images/database-foundations/sql-outerjoin-0-outerjoin_1.webp)

#### الحل

Not so difficult:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM lecturer L INNER JOIN course c ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

These are the steps the RDBMS takes when executing this query:

1. First, the `FROM` is executed. This is an `INNER JOIN` of two tables and so the *cartesian product* is created: each row of the lecturer table is combined with each row of the course table.
2. Not all combinations in this cartesian product *make sense*: only those where the lecturer id (in one table called ‘lecturer_id’, in the other ‘coordinator’) matches are retained, because those satisfy the join condition ON L.lecturer_id = c.coordinator.
3. There is no `WHERE` component, so no rows are dropped from the result.
4. The `GROUP BY` (and `HAVING`) is also missing.
5. Finally, the result rows are arranged alphabetically by last name via the `ORDER BY` component.

You show the requested list to the manager, who unfortunately is not entirely satisfied with the result. “I actually wanted that *all* lecturers were in the list, including those who are not coordinating any course” you hear him say. The `INNER JOIN` in your SQL query, however, shows *only* the lecturers that appear in both tables, so only the coordinators of courses.

If you want to include *all* lecturers in the list, the missing lecturers must be *added* to the result of the `INNER JOIN`. This is exactly what an `OUTER JOIN` does. You just need to replace the word `INNER` with `LEFT OUTER` or `RIGHT OUTER` (or possibly `FULL OUTER`):

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM lecturer L LEFT OUTER JOIN course c ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

Why `LEFT`? This join contains two tables: one *left* of the word `JOIN` (i.e. ‘lecturer’) and one *right* of the word JOIN (i.e. ‘course’). After the ordinary `INNER JOIN` some lecturers are still missing from the lecturer table. Because that table is to the left of the word `JOIN`, this becomes a `LEFT OUTER JOIN`.

This code is completely equivalent to this variant:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

After all, we simply swapped the order in which the two tables are written. This does not affect the `INNER JOIN` which happens first, but we replaced the word `LEFT` with `RIGHT` to account for the different order. The following figure shows the result. In comparison with the previous figure, a *number of rows are added*. For example, there is lecturer Elke Crabbé who is not coordinating any course. Since she does not appear in the table ‘courses’, there is also no information about the name of the course. *This is why there is null (no value) in the last column* (orange line).

![](/images/database-foundations/sql-outerjoin-1-outerjoin_2.webp) Explain why the following two queries return the exact same result:

```sql
-- query 1
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c LEFT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;

-- query 2
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c INNER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

#### الحل

For query 2 with the `INNER JOIN` you already know the result. Query 1 is a `LEFT OUTER JOIN`. **Each `OUTER JOIN` first starts as a regular `INNER JOIN` **. Once that is done, it looks at which rows from the left table are missing. Those are then added. Here, however, the left table, is the ‘courses’ table. *Every* row of this table is already represented in the `INNER JOIN` (why?), so no more rows are added. Both queries therefore return the same result.

## JOIN and GROUP BY

`JOIN` can be combined with other components without any problem, so also with `GROUP BY` and `HAVING`.

We will work out the following example. Please try all the steps yourself. You will make mistakes – often provoked by us – but that is the best way to learn.

List all lecturers with the number of courses for which they are coordinator. Even lecturers who are not coordinators of any course, should be included in the list. Sort the list alphabetically by name.

Analyze the task:

- You need to combine information from the lecturer table and the course table, so we need an `(INNER) JOIN`.
- The sentence “also lecturers who are not coordinators of any course ...” points to an `OUTER JOIN`.
- *For each lecturer* summary information should be given, so we need a `GROUP BY`.
- Counting numbers is done with `COUNT()`.

To predict what we should obtain, we start from the known code that generated the figure in the section above:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

See the list in that figure (above). Lecturer ‘Gerben Adriaens’ is coordinator of one course, ‘Goedele Bogers’ of two, ‘Elke Crabbé’ of none etc.

Expand this code with a `GROUP BY`:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
GROUP BY lecturer_id
ORDER BY 3;
```

You get an error message (think for a moment why):

```
ERROR: column "c.name" must appear in the GROUP BY clause or be used
in an aggregate function
LINE 2: SELECT lecturer_id, L.first_name, L.last_name, c.name;
```

Why is there an error message about ‘c.name’? If you studied the [chapter on GROUP BY](/EN/SQL_groupby_having/), you should be able to provide the answer to this question. *By grouping the information into boxes per lecturer, the detailed information about the courses is lost*. The only thing you can still retrieve is information from the so-called ‘aggregation functions’ `MIN()`, `MAX()`, `AVG()`, `COUNT()` and `SUM()`.

Something strange is going on, however. Why is there no error message about L.first_name and L.last_name? We had explained that `SELECT` can only list the columns that are in the `GROUP BY` and aggregation functions. Then why do you get *no* error message for L.first_name and L.last_name?

The reason is that here you *group on the primary key* of the lecturer table. So you are sure that one box will be created per lecturer. In that box there is only one lecturer name, first name, etc., but multiple courses. Therefore, you can retrieve the columns L.name and L.first name, but not c.name.

So you have to use an aggregation function in the code. In this case we need to count the number of times something occurs, so a `COUNT()` funtion is required. Modify the code to:

```sql
SELECT lecturer_id, L.first_name, L.last_name, COUNT(*)
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
GROUP BY lecturer_id
ORDER BY 3;
```

You obtain this *(wrong!)* result:

![](/images/database-foundations/sql-outerjoin-2-outerjoin_3.webp)

There is a problem with this figure (and thus with our code). Compare for a moment with the previous figure. Gerben does have 1 course, Goedele is coordinator of two courses, * but Elke Crabbé is not the coordinator of any course*. However, the result of our code is that Elke Crabbé is coordinator of one course (see orange arrow in the figure). What goes wrong?

The error is in the aggregation function `COUNT(*)`. This function (with `*`) *counts all rows, including those with one or more `NULL` values*. So the row containing Elke Crabbé's info is counted. This problem is fortunately easy to solve. Instead of the `*` enter *the column of interest for what you want to count*. Specifically, here we are talking about ‘c.name’. A value `NULL` in this field will not be counted. So you end the `SELECT` with `COUNT(c.name)`:

```sql
SELECT lecturer_id, L.first_name, L.last_name, COUNT(c.name)
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
GROUP BY lecturer_id
ORDER BY 3;
```

## Select rows that do NOT meet a certain condition

Note: This is a **quite difficult topic**. Exercises that rely on this principle are quite tough!

You get a new request from your manager: “I would like a list of all lecturers who are NOT coordinator of one or multiple courses.”.

Piece of cake, of course! With the `OUTER JOIN` of previous section you got a list of all coordinators, supplemented by the lecturers who do not appear in the course table and thus are not coordinators. Those “added lecturers” are easily recognisable by the absence of a value for the column with the course name. Filtering rows after running the `FROM` is done with the `WHERE` component. The query thus becomes:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM lecturer L LEFT OUTER JOIN course c ON L.lecturer_id = c.coordinator
WHERE name = NULL -- idea is OK, code not! See assignment below
ORDER BY 3;
```

We intentionally put an error in the `WHERE` component of the above query. Correct it so that the query is executed correctly and you obtain a list of four lecturers: Elke, Maarten, Patrick and Lut.

#### الحل

Comparing with `NULL` should never be done with ‘=’ but must be done with the word ‘IS’. The correct `WHERE` component is: `WHERE c.name IS NULL`.

### Exercise

List all teachers who are not coordinator of a course that has 6 credits. Order alphabetically by name and then by first name. You should obtain the result from this figure:

![](/images/database-foundations/sql-outerjoin-3-outerjoin_4.webp)

#### الحل

Hint 1: Start this exercise with more columns than just first name and last name (possibly even with all columns!).

Hint 2: We want all lecturers that *DO NOT* coordinate a 6 credit course. How would you select all those that *DO* coordinate a 6 credit course? Think about how you could reverse this. The previous exercise, where we chose lecturers that did not coordinate a course, might help you find a solution.

Hint 3: If you are still stuck, try to visualize what you are trying to do: draw a table with ‘last name’, ‘first name’ and ‘lecturer_id’, and fill in some values. Now draw a table with ‘coordinator’ and ‘credits’ that contains the 6 credit courses. Which records will join together if you merge both? Which ones will not? Try to execute that step in SQL.

![Hint to outer join exercise](/images/database-foundations/sql-outerjoin-4-outerjoin_hint.webp)

The solution:

```sql
SELECT L.last_name, l.first_name
FROM course o RIGHT OUTER JOIN lecturer l ON
  o.coordinator = l.lecturer_id AND o.credits = 6
WHERE o.credits IS NULL
ORDER BY 1, 2;
```

## FULL OUTER JOIN

An `OUTER JOIN` is an `INNER JOIN` where all missing elements from one table (those attached to the `LEFT` or the `RIGHT` side) are added. There is also a `FULL OUTER JOIN` which essentially * means adding the missing elements from both the left and the right table *. In our example with only two tables (lecturers and courses), we cannot create a meaningful `FULL OUTER JOIN`. We will cover `FULL OUTER JOIN` later in the exercises. The video at the beginning of this chapter does explain it clearly.

## Summary overview JOIN

Below is an overview of all the different types of `JOIN` that we have seen. For each type we list how the set of rows that the rest of the query is run with is constructed.

- `Implicit JOIN A,B`: Each row of table A is combined with each row of table B. All combined rows are kept.
- `A INNER JOIN B`: Each row of table A is combined with each row of table B. Only combined rows that satisfy the join condition are kept.
- `A LEFT OUTER JOIN B`: Each row of table A is combined with each row of table B. Only combined rows that satisfy the join condition are kept. All rows of table A that do not satisfy the join condition are added, padded with null values for all columns of table B.
- `A RIGHT OUTER JOIN B`: Each row of table A is combined with each row of table B. Only combined rows that satisfy the join condition are kept. All rows of table B that do not satisfy the join condition are added, padded with null values for all columns of table A.
- `A FULL OUTER JOIN B`: Each row of table A is combined with each row of table B. Only combined rows that satisfy the join condition are kept. All rows of table A that do not satisfy the join condition are added, padded with null values for all columns of table B. Also, all rows of table B that do not satisfy the join condition are added, padded with null values for all columns of table A.
