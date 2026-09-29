---
title: "The LIMIT clause"
lang: en
---

> The most important thing in the programming language is the name. A language will not succeed without a good name. I have recently invented a very good name and now I am looking for a suitable language. &mdash;Donald Knuth

In this section, we'll look at how to limit the number of result rows being shown. Coincidentally, this little topic provides a good occasion to briefly talk about (SQL) standards.

You can test the code examples in the table ‘course’ of the schema ‘ucllcatalogue’ (or in your own version of this table in your personal schema).

## LIMIT

Often, as a result of a query, you only want to see the first 3, 5, 10, ... results. The following query shows the top two courses with the largest number of credits:

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
LIMIT 2;
```

It makes sense that you can only do this meaningfully if there is also an `ORDER BY` clause present. Here's the result:

![Limit the list to the upper two](/images/database-foundations/sql-limit-0-limit2.webp)

## OFFSET

Suppose you don't want to see numbers 1 and 2 as above, but you do want to see the two next (i.e., numbers 3 and 4 in the sorted list). This can be done easily as follows:

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
LIMIT 2 OFFSET 2;
```

## Standard SQL

You might make the observation in the previous query that there are more courses that have 6 credits. The system effectively shows – as requested – only two. We can imagine situations where we would like to see the other courses of 6 credits as well (the *‘ex aequos’* as we often call them).

By the way, there is something else interesting: `LIMIT` and `OFFSET` are not actually standard SQL. The need to limit the number of rows shown to a specific amount has existed for a long time. The SQL standard had no solution for this and so every database creator started working on their own version. A number of DBMS (including MySQL, PostgreSQL, ...) came up with the `LIMIT` syntax. It wasn't until 2008 that standard SQL caught up with: `FETCH FIRST ... ROWS` (`ONLY` or `WITH TIES`). The previous query according to standard SQL could look like this (also supported by PostgreSQL):

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
OFFSET 2
FETCH FIRST 2 ROWS ONLY;
```

The result is identical to the `LIMIT / OFFSET` query: results 3 and 4 are displayed from the sorted list (decreasing number of credits).

Moreover, this syntax has an elegant solution to the problem of ‘ex aequos’: `WITH TIES`. The following query shows the numbers 3 and 4 of the list, unless there are still courses with the same number of credits as number 4. In that case, the list continues, as the figure below the code shows:

```sql
SELECT code, name, credits
FROM course
ORDER BY credits DESC
OFFSET 2
FETCH FIRST 2 ROWS WITH TIES;
```

![extra rows with the same values are also shown](/images/database-foundations/sql-limit-1-withties.webp)

## Exercises

How many credits does each coordinator coordinate? List all coordinators who coordinate the fourth most credits.

#### الحل

```sql
SELECT coordinator, SUM(credits) AS number_of_credits_coordinated
FROM course
GROUP BY coordinator
ORDER BY SUM(credits) DESC
OFFSET 3
FETCH FIRST 1 ROW WITH TIES;
```
