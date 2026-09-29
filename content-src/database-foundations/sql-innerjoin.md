---
title: "Combining tables with INNER JOIN"
lang: en
---

> No night of drinking or drugs or sex could ever compare to a long evening of productive hacking. &mdash;Lynn Voedisch

In previous chapters, all components of a `SELECT` query have been have been reviewed, except for one: the `FROM` component. There wasn't much to say about it either, since we only queried one table. In this section, we use multiple tables in a query, so that we can combine the information in those tables.

The video explains the principles of *the cartesian product* and *join*. Watch it first, then follow the text below and make the exercises.

## Implicit JOIN

We'll use a simple example to explain the principle. Suppose that you want a list of the mail addresses of all course coordinators as in the figure below. After the [previous chapter](/EN/SQL_eenopveel/) you should have two linked tables in your own schema: ‘lecturer’ and ‘course’.

![All mailaddresses of all coordinators of all courses](/images/database-foundations/sql-innerjoin-0-join_vb1.webp)

Now work out the following example by trying out the code of all the steps in your own schema. Do not forget to specify the name of your schema for each table, or set your search_path correctly. In the code examples below we chose the latter solution.

### Cartesian product of multiple tables

The lecturer table contains 18 rows, which you can easily check with a `COUNT(*)` can check:

```sql
SELECT COUNT(*)
FROM lecturer;
```

How many rows does the table ‘course’ contain?

#### الحل

This table contains 21 rows.

Now try out the following code and try to figure out from the output what it does:

```sql
SELECT *
FROM lecturer, course;
```

#### الحل

By specifying in the `FROM` component two tables (separated by a comma) * each row of the table ‘lecturer’ becomes linked to each row of the second table ‘course’ *. Each of the 18 lecturer rows is thus combined with each of the 21 courses. That gives a total of 18 × 21 = 378 rows in the result. You will need the horizontal scroll bar in the result field, because these rows will be quite long since all the columns of both tables together are present in the result.

This product – a set in which each row from the first table occurs with each row from the second table – is called the *cartesian product*. Listing two tables after the word `FROM` is an *implicit* join. We will later ask to always use an *explicit* join, but for now we'll do it this way.

### Selecting columns in the cartesian product

You know that the `FROM` component is always *ran first*. In this case, it loads the cartesian product of both tables into the working memory. The `SELECT` comes later. It selects certain columns.

Try this code:

```sql
SELECT code, coordinator, lecturer_id, email
FROM lecturer, course;
```

Now suppose that, in addition to these four columns, you also want to show the start date of the course, a simple addition of this column in the `SELECT` …

```sql
SELECT code, coordinator, lecturer_id, email, start_date
FROM lecturer, course;
```

... you would think. However, you get an error message:

```
ERROR: column reference "start_date" is ambiguous
LINE 3: SELECT code, coordinator, lecturer_id, email, start_date
```

What goes wrong? Then modify the `SELECT` so that you also see the start_date.

#### الحل

The database server informs you that the requested column ‘start_date’ is ambiguous. In fact, there are two columns ‘start_date’. You can remove this ambiguity by prefixing the name of the column with the name of the table, i.e. something in the style of `SELECT table_name.column°name`. *If there is no ambiguity, the column name is of course sufficient!*

This could then be a possible solution:

```sql
SELECT code, coordinator, lecturer_id, email, course.start_date
FROM lecturer, course;
```

### Alias for table names

You'll notice that you have to regularly specify the column by writing the table name in front of it. That's a fair amount of typing. A shorter option is to use an *alias*. You temporarily replace the name of the table with something shorter (often only one or a few letters). Compare subsequent versions of the same query. First the long version:

```sql
SELECT code, course.name, coordinator, lecturer_id, lecturer.last_name, email
FROM lecturer, course;
```

Shorter and therefore possibly easier to read is this version with two aliases:

```sql
SELECT code, O.name, coordinator, lecturer_id, L.last_name, email
FROM lecturer AS L, course AS O;
```

You may omit the word `AS` and so the query gets even shorter:

```sql
SELECT code, O.name, coordinator, lecturer_id, L.last_name, email
FROM lecturer L, course O;
```

Try making the combination where you define an *alias*, but still use the full name of the table in the `SELECT` by testing out the following code:

```sql
SELECT code, course.name, coordinator, lecturer_id, L.last_name, email
FROM lecturer L, course O;
```

#### الحل

The error message will help you further:

```
ERROR:  invalid reference to FROM-clause entry for table "course"
LINE 2: SELECT code, course.name, coordinator, lectu...
                        ^
HINT:  Perhaps you meant to reference the table alias "o".
SQL state: 42P01
Character: 50
```

Specifically, this means that *once you have defined an alias for a table name, you are obliged to use that alias*. At that point, the table name is temporarily replaced by the alias!

### Join condition

Because of the implicit join in the `FROM` component, you created the *cartesian product*: a combination of each row of one table with each row of the second table. So a total of 378 rows. You must now limit that long list to the ‘meaningful’ rows. Removing or keeping rows is done with a `WHERE`. This `WHERE` is called the ‘join condition’.

What are the *sensible* rows here? Each coordinator of each course will be paired with any lecturer. However, we were only looking for the email address of the coordinator. *The only meaningful rows then are those where the coordinator in the course table equals the lecturer_id in the lecturer table:*

```sql
SELECT code, email
FROM lecturer, course
WHERE coordinator = lecturer_id; -- join condition
```

Of the 378 rows in the cartesian product, only 21 satisfy this condition. This makes sense: there are 21 courses and each course has precisely one coordinator. [The figure at the beginning of this chapter](#Implicit-JOIN) shows the result in pgAdmin.

* This exercise covers a lot of things from previous chapters. * Write the query that, for each course of less than 6 credits, returns the following: the name of the course, the number of credits, first name and last name of the coordinator in one column, and the year in which that course was first on the program. Sort according to increasing number of credits. For equal number of credits, continue sorting according to year (newest first). You should obtain the following figure with a table of 13 rows.

![](/images/database-foundations/sql-innerjoin-1-join_vb2.webp)

#### الحل

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L, course O
WHERE coordinator = lecturer_id AND credits < 6
ORDER BY 2 ASC, 4 DESC;
```

## Explicit JOIN

The previous exercise exposes a *weakness of the implicit join* (multiple tables in the FROM separated by a comma). Both the join condition `(coordinator = lecturer_id)` and the ‘normal’ condition `(credits The solution of the previous exercise then looks like this with an explicit `JOIN`:

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L INNER JOIN course O ON coordinator = lecturer_id  -- more readable!
WHERE credits < 6
ORDER BY 2 ASC, 4 DESC;
```

The join condition is now in the `FROM` and we explicitly state the word `JOIN`. This notation is more logical and you are less likely to forget the join condition or doing something wrong in the `WHERE`, because this component is now simpler.

The order in which you write the tables is not important. The word `INNER`can be omitted. *We recommend always writing it anyway*. In fact, there is also an `OUTER JOIN`.

There is also an alternative notation for the join condition that you can use use *if both columns in that condition have identically the same name and if you are testing for equality of both*. It is not the case in this example, but suppose that the column ‘coordinator’ also had ‘lecturer_id’ as its name, then we could have written the above code like this:

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L INNER JOIN course O ON O.lecturer_id = L.lecturer_id. -- alias necessary!
WHERE credits < 6
ORDER BY 2 ASC, 4 DESC;
```

This can be written somewhat shorter by using `USING`:

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L INNER JOIN course O USING(lecturer_id)
WHERE credits < 6
ORDER BY 2 ASC, 4 DESC;
```

We will return to this later in the exercises. The notation with `ON` is always usable, the one with `USING` only in certain cases.

## Joining a table with itself

In a `JOIN` operation, you combine two (or more) tables. You may also use *the same table two times*. The use of aliases is mandatory in this case. Try the following exercise using the tips.

For a competition, lecturers form a team of two. One person is the captain of the team; the other is then just a team member. Write the query that generates a list of all possible teams as shown in accompanying figure. This list contains 306 rows. Some tips:

- The first team member is in the table ‘lecturer’, so is the second team member. So you do an `INNER JOIN` of the table ‘lecturer’ with itself.
- You will have to distinguish between the first table ‘lecturer’ and the second table ‘lecturer’. Use as aliases e.g. ‘L1’ and ‘L2’.
- What will be the join condition? You cannot form a team with yourself ...
- Note the column headings in the figure.

![](/images/database-foundations/sql-innerjoin-2-join_vb3.webp)

#### الحل

```sql
SELECT L1.first_name || ' ' || L1.last_name AS captain,
  L2.first_name || ' ' || L2.last_name AS "team_member 2"
FROM lecturer L1 INNER JOIN lecturer L2 on L1.lecturer_id != L2.lecturer_id;
```

We extend the previous exercise a bit:

We still want a list of possible teams of lecturers, but with the additional condition that both team members must live in the same municipality. You will now only be able to create 6 possible teams. Also show the municipality.

#### الحل

```sql
SELECT L1.first_name || ' ' || L1.last_name AS "captain",
  L2.first_name || ' ' || L2.last_name AS "team_member 2", L1.municipality
FROM lecturer L1 INNER JOIN lecturer L2 on
  L1.lecturer_id != L2.lecturer_id AND L1.municipality = L2.municipality;
```

## Exercises

Which courses currently in the program have a coordinator who lives in a municipality whose zip code begins with ‘3’. Write the SQL query that generates the figure below. No sorting is required.

![](/images/database-foundations/sql-innerjoin-3-join_vb5.webp)

#### الحل

```sql
SELECT code, O.name, lecturer_id, first_name, L.last_name, municipality
FROM course O INNER JOIN lecturer L on O.coordinator = L.lecturer_id
WHERE municipality LIKE '3%' AND O.end_date IS NULL;
```

Write the SQL query that generates the list (see figure) of all the lecturers who are younger than Gerben Adriaens. This list is sorted so that the youngest lecturer is at the top. You may assume that there is only one Gerben Adriaens. *You may not first query the date of birth of Gerben Adriaens*. Subqueries are not allowed either, because we haven't studied those (yet). It can be done with one query by using a `JOIN`. Also note the column header (as always).

![](/images/database-foundations/sql-innerjoin-4-join_vb4.webp)

#### الحل

You can join the table ‘lecturer’ with itself. Note the special condition in the join condition. If you want to better see what happens, you should ask for a `SELECT *` so that you can inspect the *full*row. The `WHERE` tests for who is younger. You are younger if your date of birth is greater.

```sql
SELECT L1.first_name, L1.last_name, EXTRACT(YEAR FROM L1.birthdate) AS birthyear
FROM lecturer L1 INNER JOIN lecturer Adr ON Adr.last_name = 'Adriaens' AND Adr.first_name = 'Gerben'
WHERE L1.birthdate > Adr.birthdate
ORDER BY 3 DESC;
```

A student is still 8 credits short of graduation. Generate a list (see figure below) of all possible combinations of 2 courses from the old program (courses that are now no longer given) that together represent 8 credits. Chances are that you will obtain a list where each combination appears twice (if A and B together are 8 credits, then B and A are also 8 credits and then there are two rows with the same two courses in a different order). Can you find a trick to avoid these duplicates? No need to sort.

![](/images/database-foundations/sql-innerjoin-5-join_vb6.webp)

#### الحل

```sql
SELECT O1.code, O1.name || ' (' || O1.credits ||')' AS course1,
  O2.code, O2.name || ' (' || O2.credits ||')' AS course2
FROM course O1 INNER JOIN course O2 on O1.code != O2.code
WHERE O1.credits + O2.credits = 8 AND
  O1.end_date IS NOT NULL AND
  O2.end_date IS NOT NULL AND
  O1.code < O2.code; -- trick to filter out the duplicates
```

## Exercises SQLzoo

### Schema ‘Euro2012’

An interesting exercise series on SQLzoo uses data from the [the European football championship in 2012](https://en.wikipedia.org/wiki/UEFA_Euro_2012). The logic model on SQLzoo's site that accompanies this exercise, has a somewhat different notation. Therefore, we recreated it according to our conventions:

![](/images/database-foundations/sql-innerjoin-6-euro2012.webp)

A word about this model:

- The schema contains three tables: ‘game’ (contains information about each game, such as time, stage and between which teams), ‘eteam’ (name and coach of each team) and finally a table ‘goal’ (who scored a goal in which minute for which team).
- Note that the primary key of the table ‘goal‘ is a *composite key* (twice PK in the table): after all, there may be multiple goals per match, after all, and so matchid alone would be be insufficient to uniquely specify a goal. The combination of matchid and gtime (minute in which the goal was scored) is unique (if you assume that goals cannot be scored twice in the same minute &#128512;).
- The table ‘game’ has two foreign keys, numbered FK1 and FK2. After all, a game is played between two teams, and each field (‘team1’ and ‘team2’) thus refers to a particular team about which you can find more information in the table ‘eteam’).
- Moreover, you must be able to read the *cardinalities* well in this logical schema. The large green ellipse tells you &ndash;if you look from ‘eteam’ to ‘game’&ndash; that each team plays at least one game. The smaller orange ellipse

Regarding the cardinalities of the relationship between the tables ‘goal’ and ‘etam’: A team can score 0 or more goals in the tournament (red circle) and a specific goal always belongs to one team (blue diamond).

### Exercises on INNER JOIN

Note on this exercise set: on SQLzoo's site, they use `JOIN` without the word `INNER` every time. We prefer the full name, so preferably always write `INNER JOIN`.

[Complete exercise sequence 6 on `JOIN`](https://sqlzoo.net/wiki/The_JOIN_operation). Small remark: exercise 13 is not solvable with an `INNER JOIN`, it needs an `OUTER JOIN`. You can skip this exercise.
