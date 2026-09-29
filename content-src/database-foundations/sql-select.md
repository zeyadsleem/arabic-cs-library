---
title: "The SELECT clause in detail"
lang: en
---

> One of the easiest ways to get noticed or hired as a junior developer in the tech industry is by documenting everything you are learning. Build great projects, but don't forget to document your journey along the way. &mdash;Olawale Daniel

This chapter and the next four are actually one big topic. We look at the various components of a query in more detail. The first two SQL chapters already introduced `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING` en `ORDER BY`. Now it's time to dive a little deeper into these clauses.

In this chapter, we will look at some of the features of `SELECT`. As an example, we will use an extended version of the table ‘course’ which is used in the [introduction SQL chapter](/EN/SQL_intro/). * This is a work text. Reading is nice, doing is even nicer. Test things and make exercises. *

In this chapter we use a simple schema with only one table. This schema corresponds to the following conceptual model:

![](/images/database-foundations/sql-select-0-opo_conceptueel.webp)

The entity type ‘Course’ has eight attributes. The attribute ‘Code’ is the key attribute.

You can find the table ‘course’ in the schema ‘ucllcatalogue’ in the database ‘df’. In order to make this table for you, we took the following steps (we will come back to them later). These steps are only for illustration. You cannot perform them yourself because you do not have write permissions in the database ‘df’.

I open a query tool in the database ‘df’ and run this code:

```sql
CREATE SCHEMA ucllcatalogue;
```

All colleagues and students should have access to this schema:

```
GRANT USAGE on schema ucllcatalogue to student;
GRANT USAGE on schema ucllcatalogue to lector;
```

Next, I create the table ‘course’:

```sql
CREATE TABLE ucllcatalogue.course (
  code char(6) NOT NULL ,
  credits smallint NOT NULL ,
  name varchar(100) NOT NULL ,
  start_date date NOT NULL ,
  end_date date ,
  language char(2) NOT NULL ,
  semester smallint NOT NULL ,
  coordinator char(8) NOT NULL ,
  CONSTRAINT pk_course_code PRIMARY KEY ( code )
);
```

Everyone should be given SELECT rights. Students should not be able to modify this table, delete or update rows, etc. So the permissions are limited to SELECT only:

```
grant select on all tables in schema ucllcatalogue to student;
grant select on all tables in schema ucllcatalogue to lector;
```

Finally, 21 rows were added via an import of a .CSV file. This could have been done with `INSERT INTO` as well, of course.

## Requesting something

With `SELECT` you can request something from a database server. That can even be a small calculation:

```sql
SELECT 3*4; -- gives 12
SELECT sqrt(200); -- returns the root of 200, i.e., 14,142....
SELECT TRUE AND FALSE; -- result is FALSE
```

A little silly to use a database server as a calculator, but it can be done.

You can use mathematical functions in SQL (think of the ones on your calculator such as sin, cos, ...). Above is one example: `SELECT sqrt(200)` returns the square root of 200. Find the SQL function you use to round up a number. A good source for this is [https://www.postgresql.org/docs/current/functions-math.html](https://www.postgresql.org/docs/current/functions-math.html).

#### الحل

```sql
SELECT ceil(2.1) -- gives: 3
SELECT ceiling(2.1) -- alternative, does exactly the same thing
SELECT ceil(-2.1) -- gives: -2 (careful with negative numbers: -2 > -2.1)
```

## Selecting columns

What interests us more is extracting information from data stored in a database. We already did that in the introductory examples, so we can be brief here.

Using the `*` you can select *all* columns of a table:

```sql
SELECT *
FROM course;
```

The database server begins to work from the `FROM` clause. The entire table ‘course’ is loaded into the server's working memory. Then the server looks at the `SELECT` clause. The star `*` indicates that all columns should be displayed.

Suppose we only want to see the columns with the name and the semester in which it was given. This can be done as follows:

```sql
SELECT name, semester
FROM course;
```

## Alias for a column name

Sometimes you want *other headers* for a displayed column. Suppose that we run the following query to get a summary of the start date when each course was first given:

```sql
SELECT name, start_date
FROM course;
```

The header of the second column will be ‘start_date’. Perhaps you would prefer the word ‘start’ as the column title? That can be done very easily with an *alias*. You give it using the word `AS`.

```sql
SELECT name, start_date AS start
FROM course;
```

Beware if you use several *words with a space in between*. Then you must enclose this alias between *double quotes* like this:

```sql
SELECT name, start_date AS "start date"
FROM course;
```

A point of interest and source of problems in SQL is the use of single and double quotes:

- Single quotes ('...') are used in SQL for strings or dates.
- Double quotes ("...") are reserved for names (called identifiers) of tables, schemas and aliases with special characters (such as a space, hyphen, etc.). There are tools (such as DBSchema, [see later](/EN/SQL_DBschema/)) that, in the code they generate, always enclose table and schema names in double quotes.

More info e.g. at [https://www.prisma.io/dataguide/postgresql/short-guides/quoting-rules](https://www.prisma.io/dataguide/postgresql/short-guides/quoting-rules)

## Creating new columns

You don't have to limit yourself to columns that already exist in tables when writing queries. It is possible to specify new columns in the `SELECT` that are not present in a table.

### Constant text or number

If you put a string or number as a column, this is repeated for each row in the result.

Describe the result of the following query:

```sql
SELECT code, name, 'Applied Computer Science'
FROM course;
```

#### الحل

You get an overview of all rows of the table with course code and name and a new column ‘Applied Computer Science’, repeated for each row.

Adjust the code from the previous exercise so that above the column with the repeated text ‘Applied Computer Science’ the word ‘course’ is used as the column header. Then modify the query so that the column header shows ‘Course Proximus’.

#### الحل

```sql
SELECT code, name, 'Applied Computer Science' AS course
FROM course
 
-- version 2 with spaces in the header
SELECT code, name, 'Applied Computer Science' AS "Course Proximus"
FROM course;
```

### Math

One credit corresponds to roughly 25 hours of work, everything included (attending classes, studying, completing assignments, studying for exams, taking the exam, ...). The following query creates a new column ‘work hours’ based on the present column study points:

```sql
SELECT code, name, credits * 25 AS "work hours"
FROM course;
```

Leave out ‘AS work hours’ in the above query to see what the (ugly) default column header becomes.

### Concatenating strings

You can combine multiple columns into one column. For student coaches it is useful that the name of a course is always followed by the number of credits in parentheses, such as, e.g. ‘Database Foundations (6)’.

The double ‘pipe’ character (`||`) allows you to put columns of text next to each other. The requested combination of name and credits can be realized by the following query. Pay attention to the difference between single and double quotes.

```sql
SELECT code, name || ' (' || credits || ')' AS "Course Name (credits)"
FROM course;
```

### String functions

Let's take a quick look at the fantastic documentation of PostgreSQL. It is very comprehensive. On some questions about SQL functions, the lecturers will suggest to look up the answer in the documentation yourself. [RTFM](https://en.wikipedia.org/wiki/RTFM), then!

I usually start at the index page [https://www.postgresql.org/docs/current/bookindex.html](https://www.postgresql.org/docs/current/bookindex.html). At the ‘S’ of string, I find a number of references to [https://www.postgresql.org/docs/current/functions-string.html](https://www.postgresql.org/docs/current/functions-string.html). Browse through the long list of features. Below we give two examples of string functions.

#### Switching between upper case and lower case letters

The functions `lower()` and `upper()` allow you to switch between lower case and upper case (see picture below for the [origin](https://en.wikipedia.org/wiki/Letter_case) of these designations). Especially if we want to search in the next chapter for strings (in the `WHERE` clause) it is usually a safe option to convert everything to lowercase first because *strings in SQL are case sensitive*. The string ‘Van Hee’ is not the same as ‘Van hee’.

![](/images/database-foundations/sql-select-1-letterkast.webp) Photo: The most frequently used letters (that is, the lower case letters) are in the lower case, the less frequently used (upper case letters) in the upper case. The following query shows all names of courses in lowercase:

```sql
SELECT code, lower(name)
FROM course;
```

#### Substring

A second basic operation with strings is *to select a part of the string*. This can be done with the `substring()` function. The following query returns only the digit part of the lecturer code (column ‘coordinator’), so without the ‘u’:

```sql
SELECT code, substring(coordinator from 2) -- start at letter 2 to the end
FROM course;
```

You may have already noticed that all course codes begin with ‘MBI’ (at least in the BCS program anyway). All lecturers have a number that starts with ‘u’. Write a query that shows the course code and the coordinator, but without the initial letter(s) that are always the same. Pay attention to the column headings!

![](/images/database-foundations/sql-select-2-zonderbeginletters.webp)

#### الحل

```sql
SELECT substring(code from 4) AS "short code",
  substring(coordinator from 2) AS "coordinator(shortened)"
FROM course;
```

### CASE

Suppose: instead of a column of credits, we just want to show a column showing the values ‘small’ (for courses with 4 or less credits), ‘medium’ (courses with 5 or 6 credits) and ‘large’ for courses with more than 6 credits. That column will be based on the ‘credits’ column and will be created with a `CASE` structure.

We refer to the documentation. Through the index page, we find ‘CASE: conditional expressions’ on the page[https://www.postgresql.org/docs/current/functions-conditional.html](https://www.postgresql.org/docs/current/functions-conditional.html). You'll find the following structure (and examples) here:

```
CASE
  WHEN condition THEN result
  [WHEN ...]
  [ELSE result]
END
```

Applied to the requested query, that gives the following possible query:

```sql
SELECT name,
  CASE
    WHEN credits <= 4 THEN 'small'
    WHEN credits <= 6 THEN 'medium' -- checking > 4 not necessary
    ELSE 'large'
  END AS size
FROM course;
```

The first condition that is true causes a value to be assigned in the column. The rest of the lines in the `CASE` are then skipped. Also note that we use an alias (`AS`) because otherwise the column header otherwise just shows ‘case’.

*White space* (indenting with tabs or spaces) is not important to the database server, but it is *important for people who have to read your code* (such as lecturers who need to correct your assignments :-).

Courses that do not have an end date are called ‘new’ courses in contrast to the ‘old’ courses that are no longer given and have an end date in our table. Write the query that generates the result of figure below. Need we say more? Note the column headings ...

![new column with the text old or new](/images/database-foundations/sql-select-3-oudnieuw.webp)

#### الحل

```sql
SELECT name, code,
  CASE
    WHEN end_date is null THEN 'new'
    ELSE 'old'
  END AS "old or new"
FROM course;
```

## Distinct

List all the possible languages that are used in courses. The query for this is not difficult:

```sql
SELECT language
FROM course;
```

The result contains as many rows as there are rows in the table. That is not really what we want. To avoid *repetition* use `DISTINCT` behind the word`SELECT`:

```sql
SELECT DISTINCT language
FROM course;
```

Attention: the *full* combination of all columns that come after the word `DISTINCT` must be different. Adjust the query to:

```sql
SELECT DISTINCT language, coordinator
FROM course;
```

We now get more rows than before, but less than the full number of rows because some coordinators have multiple courses in the same language. For example, check in the original table that coordinator ‘u0012047’ appears three times with language dutch. The combination of language and coordinator is thus the same three times. By using the keyword `DISTINCT` this row will be shown only once.

Generate a list with per course each lecturer and the number of credits from each course. Count how many rows there are. Now make sure that there are no duplicates in this list, so if lecturer ‘u0012047’ gives two courses of 6 credits, this row should appear in the list only once.

#### الحل

```sql
-- the list without duplicates (for the full list remove distinct)
SELECT distinct coordinator, credits
FROM course;
```

## Working with a date

The data type `date` is very important in a database. There are dozens of functions that can manipulate a date. We will look only at a few of them here. Moreover, there is not only `date` as a datatype, but also `timestamp`, `time` and `interval` (see documentation at [https://www.postgresql.org/docs/current/datatype-datetime.html](https://www.postgresql.org/docs/current/datatype-datetime.html)).

For now, we limit ourselves to the data type `date`. The [documentation](https://www.postgresql.org/docs/current/functions-datetime.html) provides an overview of the `date/time` functions that PostgreSQL offers.

### Extract … from

A date contains the year, month and day. A time additionally includes hours, minutes, seconds, etc. With the function [`EXTRACT`](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT) you can extract a piece from a date (or time). A small example from the course list to clarify this:

```sql
SELECT code, EXTRACT(year FROM start_date) AS "start academic year"
FROM course;
```

This query displays a list of all courses with code and the year in which that course was first given. The list of possibilities is quite extensive: month, week, day, hour, ... (see [documentation](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT)).

### Calculating with a date

You can increase or decrease a date by an integer, subtract dates from each other, etc ([documentation](https://www.postgresql.org/docs/current/functions-datetime.html)).

#### Example 1: subtracting dates from each other

The following query calculates for each course how many days it will run or has been running. Of course, if we do not know end date, the result cannot cannot be calculated and you get the value`NULL`:

```sql
SELECT code, end_date - start_date AS "number of days"
FROM course;
```

Apparently, the course with code ‘MBI68A’ is the course with the longest duration: 5477 days.

#### Example 2: functions age() and now()

A second example shows two functions: `age()` and `now()`. How old am I today if I was born on May 7, 1967?

```sql
SELECT age(now(),'1967-05-07');
-- alternative is: SELECT age(CURRENT_DATE, '1967-05-07');
-- second alternative: SELECT age(timestamp '1967-05-07');
```

## Changing data type

A classic problem in typed programming languages is * converting a value to another data type *. You want to add an integer to a float, convert a number to a string, ... In English, this action is called ‘to cast’.

The last example in the previous section in which the age was calculated was an example of an *automatic cast*. According to the documentation that we have already referred to a few times, the function `age()`in the first version of the query operates on two `timestamps`. We however, wrote `age(now(),‘1967-05-07’)`. The function `now()` returns a `timestamp`, but the second argument (‘1967-05-07’) is a `date` and not a `timestamp`. PostgreSQL, however, will silently turn this `date` into a `timestamp` (by taking midnight as the time).

### CAST … AS

Often, however, you have to do the casting yourself. This can be done with two types of syntax: either with the `CAST(... AS ...)` function, or with the notation `::`. We give some simple examples:

```sql
-- cast a string to an integer
SELECT CAST('123' AS integer);
SELECT '123'::integer; -- different notation, but does the same thing as the CAST

-- cast an integer to a numeric
SELECT CAST(1234 AS numeric(8,3));
SELECT 1234::numeric(8,3); -- different notation, but does the same thing

-- a number to a string
SELECT CAST(1234 AS char(6)); -- generates the string '1234  '
```

### TO_CHAR

The last example above (number to string) is a bit odd. Usually you want to convert the values in a column to a string *with a certain format*, e.g. a date in European notation with slashes between day, month and year. To do this, the function `TO_CHAR()` exists ([documentation](https://www.postgresql.org/docs/current/functions-formatting.html)). Some examples:

```sql
SELECT TO_CHAR(date '1967-05-07', 'dd/mm/yyyy'); -- results: '07/05/1967'
SELECT TO_CHAR(date '1967-05-07', 'day dd month yyyy'); -- results: 'sunday 07 may 1967'
SELECT TO_CHAR(148.5, '9999.9999'); -- returns the string ' 148.5000'
```
