---
title: "Physical data model"
lang: en
---

> The strength of a database is directly proportional to the power of the questions you can ask of it. &mdash;Hans Rosling

In this chapter, we take the final step in planning our database: creating our physical data model. How do you convert a logical data model into a physical data model?

You must be able to explain the following terms, how to visualize this (where relevant) and explain by example:

- Physical data model;
- datatype;
- `NULL`-value.

## Introduction

The final step in laying out our data model, is *the physical layer*. When we get to this step, we have already chosen a database model and converted the conceptual data model into a structure that complies with this database model, resulting in the logical data model.

The physical layer of our data model answers the question ‘How should we describe the data structure according to our chosen DBMS?’ In doing so, we supplement our data model with the following information:

- the *datatype* of a column
- the *length* of a value
- whether or not a value can be empty (`NULL`)
- (*constraints*) that we want to impose on a particular table (not discussed in this course)
- indexing (not discussed in this course)
- views (not discussed in this course)
- procedures (not discussed in this course)
- diskspace usage (not discussed in this course)

The reason we add this information in a separate layer is because it deals with the more *technical* aspects of the data model. For the same database model, there may be differences at the level of the DBMS. In other words, a physical data model for one DBMS may be different from that of another DBMS.

The differences are mostly quite small, especially for DBMS for databases structured by the relational database model, because *standards* were established. For the relational database model, standards were summarized in the ANSI standard for SQL, first in 1986 and more recently in 2016. Developers of DBMS for relational databases usually adhere to these standards, although they also add their own variants to differentiate themselves from other products on the market. The focus in this course is on PostgreSQL; we also do not make comparisons with other DBMS within this course.

Finally, a database architect may also decide to structure the data slightly differently than specified by the logical data model. The architect will do this to optimize the performance or usability of the database, often taking into consideration the technical capabilities of the chosen DBMS. These considerations are covered in a later section.

## From logical to physical data model

In translating a logical data model into a physical data model, in the context of this course, we are going to add the *following information*:

- tables and columns are named in line with our agreed naming conventions; to do so we must first define naming conventions;
- we define a data type and length for each of the columns;
- we indicate for each of the columns whether the value in the column can or cannot be empty (`NULL`);
- we impose restrictions (constraints) on a table.

## Naming conventions

In the physical data model, *naming conventions* play a major role. In particular, you want to strive for naming conventions that are *readable*, *clear* and *consistent*. In doing so, many DBMS allow only a limited number of characters in the names of tables and columns. So you are often forced to keep it short.

There are different ways to set rules for naming, and each company will use its own rules. Some ideas:

- case of the names and/or separation of words: UPPER CASE,
- lower case,
- camelCase,
- PascalCase,
- snake_case,
- kebab-case: words are separated.

use of plural or singular (table "players" or "player") separate words from each other:

- by an underscore (_),
- by a period,
- by a capital letter,
- by a combination of the above.

language (in an international environment it is best to work in English) use of abbreviations to indicate, for example, tables, primary or foreign keys. You can also designate abbreviations to delineate certain subdomains within the data model. rules for abbreviating long words by, for example, omitting all vowels unless the word starts with a vowel.

In addition, we can give *the following tips*:

- don't use spaces;
- don't use foreign characters;
- don't use SQL or DBMS reserved key-words.

Self, we apply the *following naming conventions*:

- **table:** we use a singular name set in lowercase. Different words are separated by an ‘_’.
- **column:** the column name is described in lowercase, with several words separated by an ‘_’. Try to keep the column name as short as possible, but in such a way that it is still possible to figure out what it means.
- **primary key:** if possible, we name the key ‘id’. This way, it is always easy for users to identify the primary key.
- **foreign key:** foreign keys are references to other tables, so we try to include the name of the original table into the name. For example, the primary key ‘id’ from the table ‘lecturer’ could be named ‘lecturer_id’ in other tables as a foreign key.

As mentioned, *you can define your own naming conventions*, and in your future work environment, conventions will probably already be in place. The most important thing is that you stay consistent!

## Datatype

In the physical data model, we are going to define the *data type* for each column. Here we take into account the nature of the data we want to add. In the first steps you took with SQL, within the [chapter ‘Intro SQL’](/EN/SQL_intro/#Some-simple-data-types), you have already been introduced to the most commonly used data types: `char()`, `varchar()`, `integer` and `date`.

In addition to these data types, PostgreSQL offers a wide range of additional data types. Each data type has a particular role and, through the use of functions, offers additional capabilities.

When defining the data type, you must sometimes specify the *length*. Datatypes can have a *fixed* length (for example, `integer` 4 bytes, `boolean` 1 bit, `real` 4 bytes, ...) or a *variable* length (e.g., `char`, `varchar`, `numeric`, ...).

When specifying the length of a column, consider the maximum length a value could have. A datatype with a variable length allows you to make a lot of space available, without taking up all of that space every time. A good guideline is to keep your specified length realistic, minimizing wasted space.

## NULL or NOT NULL

In the physical design, we need to specify whether the value in a column * can be empty or not*. For the columns that should never be empty, we can specify `NOT NULL`. For the columns where we have not specified this, the value can be empty.

The choice to be made here is based on the logical data model, and is determined by two elements:

- As the first element, we have our *foreign keys*. Looking at the relationship that exists between two tables through a primary and a foreign key, we must use the minimum cardinality to evaluate whether the value of the foreign key can be `NULL`. If the relationship is enforced, as for example when using an intermediate table, we indicate that the foreign key is `NOT NULL`.
- As a second element, for each of the columns (beyond the primary and foreign keys) evaluate * whether from the client's logic it makes sense for a column to be is empty *. For example, an employee's name and first name are not used as a key, since they are not necessarily unique. However, an employee whose first and last name are left blank is probably not very useful. Hence, we can additionally specify that these columns should not be empty.

The value `NULL` can mean two things: on the one hand, it can mean that there could be a value filled in, but that we do not know that value. The value could then be filled in at a later time. On the other hand, `NULL` could indicate that for this particular case there is no value possible, the column is not applicable for this entity.

A comparison with a `NULL` value gives a `NULL` value as a result, because a comparison with something unknown is always unknown.
