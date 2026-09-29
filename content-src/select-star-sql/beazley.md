---
title: "Beazley's Last Statement"
lang: en
---

## The Beazley Case

In 1994, Napoleon Beazley shot 63-year-old businessman John Luttig in his garage while trying to steal his family’s car. Because he was just shy of 18 years old at the time of the murder, the Beazley case ignited a fierce debate over the death penalty for juvenile offenders. 3 years after Beazley was executed, the Supreme Court prohibited the execution of offenders under 18 at the time of their offense ([Roper v Simmons, 2005](https://en.wikipedia.org/wiki/Roper_v._Simmons)).

The case was also notable because the victim was the father of a federal judge John Michael Luttig. During the appeals to the Supreme court, three of the nine justices recused themselves because of their personal ties to Judge Luttig, leaving only six to review the case.

Napoleon Beazley made an impassioned last statement arguing that an eye for an eye does not constitute justice. Our task is to retrieve his statement from the database.

## A First SQL Query

The SQL query may look like an ordinary sentence, but you should view it as three Lego blocks: `SELECT *` `FROM executions` `LIMIT 3`. As with Lego, each block has a fixed format and the different blocks have to fit together in particular ways.

## The SELECT Block

The `SELECT` block specifies which columns you want to output. Its format is ` SELECT <column>, <column>, ... ` . Each column must be separated by a comma, but the space following the comma is optional. The star (ie. `*`) is a special character that signifies we want all the columns in the table.

### SQL Comments

Notice that clicking "Show Solution" displays the solution in the editor preceded by `/*`. The contents between `/*` and `*/` are taken as comments and aren't run as code. This is useful for temporarily hiding code we don't want to run. To run the solution, simply delete or comment out your code and uncomment the solution.

`--` is another way of indicating comments. It is used to mark the rest of a single line as a comment. When we have multiple lines we want to comment out, `/* ... */` is more convenient than prepending `--` to each line.

## The FROM Block

The `FROM` block specifies which table we’re querying from. Its format is ` FROM <table> ` . It always comes after the `SELECT` block.

In the next example, observe that we don’t need the `FROM` block if we’re not using anything from a table.

Isn’t it strange that `51 / 2` gives `25` rather than `25.5`? This is because SQL is doing integer division. To do decimal division, at least one of the operands must be a decimal, for instance `51.0 / 2`. A common trick is to multiply one number by `1.0` to convert it into a decimal. This will come in useful in the later chapters.

### Capitalization

Even though we’ve capitalized `SELECT`, `FROM` and `LIMIT`, SQL commands are not case-sensitive. You can see that the code editor recognizes them and formats them as a command no matter the capitalization. Nevertheless, I recommend capitalizing them to differentiate them from column names, table names and variables.

Column names, table names and variables are also not case-sensitive in this version of SQL, though they are case-sensitive in many other versions. To be on the safe side, I recommend always assuming they are case-sensitive.

### Whitespace

Whitespace refers to spaces, tabs, linebreaks and other characters that are rendered as empty space on a page. As with capitalization, SQL isn't very sensitive to whitespace as long as you don't smush two words into one. This means that there just needs to be at least one whitespace character around each command — it doesn't matter which one or how many you use. Unless it's a short query, I prefer putting each command on a new line to improve readability.

## The WHERE Block

The `WHERE` block allows us to filter the table for rows that meet certain conditions. Its format is ` WHERE <clause> ` and it always goes after the `FROM` block. Here, a clause refers to a Boolean statement that the computer can evaluate to be true or false like `ex_number = 145`. You can imagine that the computer will go through each row in the table checking if the clause is true, and if so, return the row.

It’s clear how we can use arithmetic operators like ` < ` and ` <= ` to build clauses. There are also a collection of string operators to work with strings.

The most powerful of these is probably `LIKE`. It allows us to use wildcards such as `%` and `_` to match various characters. For instance, `first_name LIKE '%roy'` will return true for rows with first names ‘roy’, ‘Troy’, and ‘Deroy’ but not ‘royman’. The wildcard `_` will match a single character so `first_name LIKE '_roy'` will only match ‘Troy’.

### Quotes

In SQL, strings are denoted by single quotes. Backticks (ie `` ` `` ) can be used to denote column and table names. This is useful when the column or table name is the same as a SQL keyword and when they have a space in them. It's possible to have a database with a table named 'where' and a column named 'from'. (Who would be so cruel as to do this?!) You would have to do `` SELECT `from` FROM `where` WHERE ... `` . This is another example why capitalization of SQL commands helps.

As you’ve seen in the previous exercise, complex clauses can be made out of simple ones using Boolean operators like `NOT`, `AND` and `OR`. SQL gives most precedence to `NOT` and then `AND` and finally `OR`. But if, like me, you’re too lazy to remember the order of precedence, you can use parenthesis to clarify the order you want.

Let’s take a quick quiz to cement your understanding.

Now you have the tools you need to complete our project.

Isn’t it amazing how profound and eloquent Beazley is? Recall that he was only 25 when he made the statement and had been in prison since he was 18.

## Recap

The point of this chapter has been to introduce the basic but powerful ` SELECT <column> FROM <table> WHERE <clause> ` . It allows us to filter a table by having the computer go row by row and pick out those for which the `WHERE` clause is true. We’ve also learned how to put together fairly complex clauses that can operate on string, numeric and boolean-valued columns.

Up till now, we’ve been operating at the row-level which has limited us to looking at individual data points. In the next chapter, we’ll focus on aggregations which will allow us to study system-level phenomena.
