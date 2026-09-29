---
title: "The WHERE clause in detail"
lang: en
---

> Code is there to explain the comments to the computer. &mdash;Andy Harris

In a `SELECT` statement such as:

```sql
SELECT code, coordinator
FROM course
WHERE coordinator = 'u0012047';
```

the `FROM` clause is executed first by the database server. The entire table ‘course’ is loaded into working memory. We know: we're repeating ourselves, but this is really essential knowledge if you want to be able to write good queries.

Then the `WHERE` clause is executed (if present). Only the rows *that satisfy the condition* in the `WHERE` are kept. All other rows disappear from memory. Afterwards the `SELECT` is executed. In this chapter, we will look more closely at some possibilities of `WHERE`.

You can test the code examples in the table ‘course’ of the schema ‘ucllcatalogue’ (or in your own version of this table in your personal schema).

## Standard comparison operators

SQL provides the standard comparison operators: `=` (equal to), `<>` or `!=` (not equal to), `>` (greater than), `=` (greater than or equal to) and `<=` (less than or equal to). You can compare numbers, strings and dates or timestamps. The following query shows all courses that have a start date before April 5, 2017:

```sql
SELECT *
FROM course
WHERE start_date < '2017-04-05'; --input date in ISO-format with single quotes
```

A date that is *farther in the past* is *smaller* than a later date, as you would logically expect.

Comparing strings is a bit more involved. Unfortunately the result is *database specific*. That ‘a’ < ‘b’ is obvious, but what about the comparison of ‘a’ and ‘A’? You know what, we'll just try it out in PostgreSQL:

```sql
SELECT 'a' < 'A';
```

The result is `true`. We conclude: *in PostgreSQL* lowercase letters come before uppercase letters. In another DBMS, it may be the other way around.

And what about a comparison between ‘magic’ and ‘monkey’ and between ‘cent’ and ‘century’? Let's test this:

```sql
SELECT 'magic' > 'monkey';
SELECT 'cent' > 'century';
```

The result is twice `false`. The comparison between two strings is in fact done *letter by letter from left to right*. For ‘magic’ and ‘monkey’, the first letter is the same, but not the second. The second ‘a’ of ‘magic’ is (alphabetically speaking) smaller than the ‘o’ of ‘monkey’ and so `'magic' < 'monkey'`.

The word ‘cent’ is smaller than ‘century’. The letters are compared one at a time. After four matching letters, there is no fifth letter in the string ‘cent’ and so this word is smaller (*shorter*) than the longer word ‘century’.

## IS (NOT) NULL

The value `NULL` in a field means ‘unknown’: there is no value for this field. It is possible to test for this special `NULL` value. You just have to remember not to use `=` but to use `IS`. The next query shows a list of all courses for which we do not yet know when they will stop:

```sql
SELECT *
FROM course
WHERE end_date IS NULL; -- so don't write = NULL
```

Conversely, the following query returns the list of all courses that do have an end date (and thus are no longer taught or for which it is already known until when these courses will be in the curriculum):

```sql
SELECT *
FROM course
WHERE end_date IS NOT NULL;
```

## String patterns with LIKE

Sometimes you don't want to search for the full value of a string, but only for a part of it. Suppose you want a list of all courses that have the word ‘web’ somewhere in the name (does not matter whether ‘web’ is upper or lower case). We already know [from a previous chapter](/EN/SQL_select/index.html#String-functions) that the function `lower()` will certainly be useful in this query to convert all upper case letters to lower case. But how do we test for the presence of ‘web’ anywhere in the name?

This can be done in different ways (e.g. with [regular expressions](https://www.postgresql.org/docs/current/functions-matching.html)). Here we look at *the simplest way* using `LIKE` and a pattern. In that pattern you can use two special characters:

- `%`: 0 or more characters;
- `_` (underscore): exactly 1 character.

The following query searches all names that contain the substring ‘web’ (upper / lower case does not matter):

```sql
SELECT code, name, semester
FROM course
WHERE lower(name) LIKE '%web%';
```

Now try the following exercises.

Describe in words what subsequent LIKE strings are looking for:

```
... LIKE 'B%'
... LIKE '_e%'
... LIKE '%e%e%e%'
... LIKE '__a_b%'
```

#### الحل

```
... LIKE 'B%' --all strings beginning with capital B
... LIKE '_e%' --all strings with an e as second letter
... LIKE '%e%e%e%' --all strings with at least 3 times the letter e
... LIKE '__a_b%' --all strings with a as third and b as fifth letter
```

Write the SQL query that generates a list of all lecturers whose lecturer code ends with the digit 4. Also add a column with the name of the course for which they are responsible.

#### الحل

```sql
SELECT coordinator, name
FROM course
WHERE coordinator like '%4';
-- It's also possible to use substring(), please try this version as well
```

## Retain rows that do NOT satisfy a condition

With a condition in the `WHERE` clause, we only keep those rows that meet that condition. What if you want all the other rows, so only those that *don't* satisfy the condition? For this purpose you can use the keyword `NOT`. The next query returns all courses that do not meet the condition, i.e. those that do not start with the letters ‘Web’:

```sql
SELECT code, name, semester
FROM course
WHERE NOT name LIKE 'Web%';
```

List all courses (code, name and number of credits) whose name does not contain a single ‘a’ (lower case only, upper case ‘A’ may occur). Write the query. What do you modify in your solution if upper case ‘A’ is also disallowed?

#### الحل

```sql
SELECT code, name, credits
FROM course
WHERE NOT name like '%a%'; -- adaptation: NOT lower(name) like '%a%'
```

## Linking conditions with AND and OR

We can link multiple conditions with `AND` and `OR`:

- `A AND B`: only `TRUE` if both A and B are `TRUE`;
- `A OR B`: `TRUE` if either A or B or both are `TRUE`.

`AND` and `OR` can of course also be used in combination with `NOT`.

What does the following query do:

```sql
SELECT *
FROM course
WHERE language = 'nl' AND lower(name) LIKE '%prog%';
```

#### الحل

This query displays all columns of those courses that are given in Dutch *and* whose name (converted to lower case) contains the string ‘prog’. Both conditions must be satisfied at the same time!

Write the query that generates the list of all courses given in either Dutch or French.

#### الحل

```sql
SELECT *
FROM course
WHERE language = 'nl' OR language = 'fr'; -- we will see how to write this query more concisely later
```

You can *link* more than two conditions. You have to be be careful as the following example demonstrates. List all the courses taught in Dutch or French that are still being taught. We try the following query:

```sql
SELECT *
FROM course
WHERE language = 'nl' OR language = 'fr' AND end_date IS NULL;
```

This query returns the wrong result. Run the query and explain why this result is incorrect.

#### الحل

The reason has to do with the order of operations. Just as you learned long ago that 3 + 4 * 2 should be read as 3 + (4 * 2) because multiplication takes precedence over addition, there is a sequence of operators in a `WHERE`.

The order of the operators is, from high priority to low:

1. first, comparison operators such as `=`, ``, `<=`, ...,
2. then `NOT`,
3. then `AND`,
4. and last but not least `OR`.

This means that the condition above is not evaluated simply left-to-right but as `language = 'nl' OR (language = 'fr' AND end_date IS NULL)`. You can translate this condition as ‘all Dutch courses (from present or past, doesn't matter) or all French ones that are still being taught’. That's not what we wanted.

The solution is simple: use parentheses. The query as we intended it thus becomes:

```sql
SELECT *
FROM course
WHERE (language = 'nl' OR language = 'fr') AND end_date IS NULL;
```

For complex compound conditions, parentheses are always a good idea because they *increase the readability* of the condition.

## BETWEEN

We begin with a simple exercise:

Give all courses (code, name and credits) with 3 to 8 credits.

#### الحل

```sql
SELECT code, name, credits
FROM course
WHERE credits >=3 AND credits <=8;
```

SQL provides a somewhat shorter notation for this type of query (more consistent with common language):

```sql
SELECT code, name, credits
FROM course
WHERE credits BETWEEN 3 AND 8; -- both boundaries are included
```

If you have to write SQL queries on an exam, you may always choose whether you go for the `BETWEEN` notation or the slightly longer version. You must understand both notations, obviously.

## IN

The keyword IN allows you to *shorten* some conditions. Again, a little exercise to get started:

Write the query that shows all courses where the coordinator is one of the following individuals: u0012047, u0015584, u0024689 or u0031447.

#### الحل

```sql
SELECT code, name, coordinator
FROM course
WHERE coordinator = 'u0012047' OR coordinator = 'u0015584' OR
 coordinator = 'u0024689' OR coordinator = 'u0031447';
```

A bit cumbersome, isn't it? This query can be shortened with `IN`:

```sql
SELECT code, name, coordinator
FROM course
WHERE coordinator IN ('u0012047','u0015584','u0024689','u0031447');
```

## Overview operators

The following table gives an overview of the operators that you can use in a `WHERE` clause.

| Operator | Function | Example |
| --- | --- | --- |
| `=` | Equal to | `WHERE name = 'Jan Van Hee'` |
| `<>` or `!=` | Not equal to | `WHERE year <> 2023` |
| `>` | Greater than | `WHERE amount > 250` |
| `<` | Less than | `WHERE amount < 400` |
| `>=` | Greater than or equal to | `WHERE amount >= 250` |
| `<=` | Less than or equal to | `WHERE amount <= 400` |
| `BETWEEN` | Within a range | `WHERE amount BETWEEN 250 AND 400` |
| `IN` | Equal to one of a set of values | `WHERE city IN ('Leuven', 'Brussel', 'Gent')` |
| `LIKE` | Match a pattern (with '%' of '_', case sensitive) | `WHERE name LIKE 'Jan%'` |
| `ILIKE` | Match a pattern (case insensitive) | `WHERE name ILIKE 'jan%'` |
| `NOT` | Negates a condition | `WHERE name NOT LIKE 'Jan%'` |

## Exercises SQLzoo

SQLzoo is an interactive practice platform. You enter SQL code that the system reviews for you. It's a good idea to try these exercises. This way, you'll learn to work with tables other than the ones we use in this course text.

### Table ‘world’

This table contains the following data from countries:

- name
- continent
- area
- population
- [gdp](https://en.wikipedia.org/wiki/Gross_domestic_product)

As an introduction to this table, make [exercise series 1](https://sqlzoo.net/wiki/SELECT_basics), with three small exercises. Here you use `WHERE`, `IN` and `BETWEEN` (and of course `SELECT` and `FROM`).

Take [quiz 1](https://sqlzoo.net/wiki/SELECT_Quiz) with 7 questions focusing on `WHERE`.

[Exercise series 2](https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial) on the ‘world’ table contains 13 exercises in the style of the previous one, but with additional computational functions such as `ROUND` and some string manipulation.

[Quiz 2](https://sqlzoo.net/wiki/BBC_QUIZ) again contains 7 questions. Pay attention to the details!
