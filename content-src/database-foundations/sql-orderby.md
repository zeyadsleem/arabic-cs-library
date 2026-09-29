---
title: "The ORDER BY clause in detail"
lang: en
---

> Everybody in this country should learn to program a computer, because it teaches you how to think. &mdash;Steve Jobs

If a `SELECT` query gives you a number of rows as a result, then the order in which they are displayed is *unpredictable*. The only way to get a certain order is to use the `ORDER BY` clause.

You can test the code examples in the table ‘course’ of the schema ‘ucllcatalogue’ (or in your own version of this table in your personal schema).

## Sorting by columns

### By column name

The following query shows three columns for all courses that have less than 6 credits:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6;
```

As mentioned, you can't say anything in advance about the order in which these rows are displayed. If you want the rows sorted so that the credits are arranged from small to large, you can do so by using the column header in the `ORDER BY` clause:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY credits ASC;
```

The addition `ASC` (‘ascending’) may be omitted, because that is the *standard sorting*.

Because it is so important, let's again go over the order in which this query is executed:

1. First the `FROM`: which table(s) should be loaded into working memory?
2. Then `WHERE`: only the rows that meet this condition are kept, the rest are deleted.
3. Then the `GROUP BY`, immediately followed by `HAVING`. These two clauses are not present in this example.
4. Only then comes the `SELECT` clause: which columns should be shown?
5. Finally, the `ORDER BY`: in what order are the rows displayed?

This is the result of the query:

![sort by ascending number of credits](/images/database-foundations/sql-orderby-0-orderbySP.webp) The courses with the smallest number of credits are at the top. Within the rows with the same value for the number of credits (e.g., 3), the order is still unpredictable. However, you can specify more than one column to sort on. Suppose you want to first sort by increasing number of credits and then (within rows with the same number of credits) alphabetically by name, you can do so as follows:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY credits, name;
```

This is the result:

![sort by ascending number of credits and then by name](/images/database-foundations/sql-orderby-1-orderbySPnaam.webp)

Note that the order is important: `ORDER BY credits, name` returns a different result than `ORDER BY name, credits`!

### By column sequence number

As so often in SQL, there is a shorter way to write things. Take the last query as an example:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY credits, name;
```

A shorter alternative is *writing the column numbers* of the columns from the `SELECT` instead of using the name:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY 2, 3;
```

You then obviously need to know what the column numbers are in the `SELECT`. A small *disadvantage* is that you have to change the column numbers if you decide to add an extra column in the `SELECT` clause, like e.g. in this extended query:

```sql
SELECT code, coordinator, credits, name -- extra second column
FROM course
WHERE credits < 6
ORDER BY 3, 4; -- add 1 to all column numbers
```

## Sorting ascending and descending

With `ASC` you sort from small to large. This is also the default value, so you can omit it. Sorting from large to small is done with `DESC`. Especially if English is not your native language, it can be a challenge to figure out the correct sorting order from the question you're trying to answer. After all, in language there are many different ways of saying roughly the same thing. A small overview with some possibilities:

- `ASC`: from small to large, ascending, alphabetically, chronologically, incrementally, increasing, growing, ...
- `DESC`: from large to small, descending, antichronological, decreasing, shrinking, ...

## Sorting by expressions

You already know that you can add new columns yourself ([see chapter SELECT](/EN/SQL_select/index.html#Creating-new-columns)). You can do the same in the ORDER BY clause as the following example shows:

```sql
SELECT code, coordinator, credits, name
FROM course
ORDER BY
  CASE
    WHEN credits <= 6 THEN 'normal'
    ELSE 'special'
  END;
```

You can compare this to adding a new column (put the `CASE` in the `SELECT` to try it out) and then sorting by this new column. This query gives all courses of 6 or less credits the value ‘normal’ and all larger courses the value ‘special’. On these two values the results are then sorted. Because ‘special’ comes later in alphabetical order than ‘normal’ all courses with 6 or less credits will be at the top of the list.

A second example: the last letter of the course code often has a special meaning. The next query allows sorting by this last letter (‘A’, ‘H’ etc):

```sql
SELECT code, coordinator, credits, name
FROM course
ORDER BY substring(code FROM 6); -- all letters from the 6th, so only the last letter
```

## What about NULL values?

As already explained in [the solution of the first exercise on the CSV dataset](/EN/SQL_CSV/index.html#Ranking-based-on-Internet-speed) the SQL standard does not define what to do with `NULL` values in a column being sorted. PostgreSQL considers `NULL` as a value greater than all other values, and so rows with this value in the sorted on column will appear at the bottom of the list. There are other database systems that do it the other way around ...

## Exercises

List all courses sorted alphabetically by coordinator and for each coordinator sorted in ascending order by semester.

#### الحل

```sql
SELECT name, coordinator, semester
FROM course
ORDER BY coordinator ASC, semester ASC;
```

Sort the courses based on how long they are being taught. The courses that have been taught the longest are at the top. If the end date is `NULL`, you may set the number of years equal to 1.

#### الحل

```sql
SELECT name, start_date, end_date,
  CASE
    WHEN end_date IS NULL THEN 1
     ELSE(end_date - start_date) / 365.25     -- Every 4 years a leap year, not entirely correct, but good enough
  END AS number_of_years_given
FROM course
ORDER BY 4 DESC;
```

## Exercises SQLzoo

### Table of nobel prize winners

A table of noble prize winners with following columns:

- yr: year,
- subject: field of study, subject,
- winner: name of the winner.

[Exercise Series 3](https://sqlzoo.net/wiki/SELECT_from_Nobel_Tutorial) contains mainly exercises on `WHERE`. In the last exercises, you should also use `ORDER BY`.

Now make [quiz 3](https://sqlzoo.net/wiki/Nobel_Quiz) on the table with the Nobel laureates.
