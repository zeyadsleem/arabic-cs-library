---
title: "The Where Clause"
lang: en
---

The [previous chapter](/sql/anatomy) described the structure of indexes and explained the cause of poor index performance. In the next step we learn how to spot and avoid these problems in SQL statements. We start by looking at the `where` clause.

The `where` clause defines the search condition of an SQL statement, and it thus falls into the core functional domain of an index: finding data quickly. Although the `where` clause has a huge impact on performance, it is often phrased carelessly so that the database has to scan a large part of the index. The result: a poorly written `where` clause is the first ingredient of a slow query.

This chapter explains how different operators affect index usage and how to make sure that an index is usable for as many queries as possible. The last section shows common anti-patterns and presents alternatives that deliver better performance.

## Contents

1. *[The Equals Operator](/sql/where-clause/the-equals-operator)* — Exact key lookup*[Primary Keys](/sql/where-clause/the-equals-operator/primary-keys)* — Verifying index usage
2. *[Concatenated Keys](/sql/where-clause/the-equals-operator/concatenated-keys)* — Multi-column indexes
3. *[Slow Indexes, Part II](/sql/where-clause/the-equals-operator/slow-indexes-part-ii)* — The first ingredient, revisited

*[Functions](/sql/where-clause/functions)* — Using functions in the `where` clause

1. *[Case-Insensitive Search](/sql/where-clause/functions/case-insensitive-search)* — `UPPER` and `LOWER`
2. *[User-Defined Functions](/sql/where-clause/functions/user-defined-functions)* — Limitations of function-based indexes
3. *[Over-Indexing](/sql/where-clause/functions/over-indexing)* — Avoid redundancy

*[Bind Variables](/sql/where-clause/bind-parameters)* — For security and performance

*[Searching for Ranges](/sql/where-clause/searching-for-ranges)* — Beyond equality

1. *[Greater, Less and `BETWEEN`](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)* — The column order revisited
2. *[Indexing SQL `LIKE` Filters](/sql/where-clause/searching-for-ranges/like-performance-tuning)* — `LIKE` is not for full-text search
3. *[Index Combine](/sql/where-clause/searching-for-ranges/index-merge-performance)* — Why not using one index for every column?

*[Partial Indexes](/sql/where-clause/partial-and-filtered-indexes)* — Indexing selected rows

*[`NULL` in the Oracle Database](/sql/where-clause/null)* — An important curiosity

1. *[`NULL` in Indexes](/sql/where-clause/null/index)* — Every index is a partial index
2. *[`NOT NULL` Constraints](/sql/where-clause/null/not-null-constraint)* — affect index usage
3. *[Emulating Partial Indexes](/sql/where-clause/null/partial-index)* — using function-based indexing

*[Obfuscated Conditions](/sql/where-clause/obfuscation)* — Common anti-patterns

1. *[Dates](/sql/where-clause/obfuscation/dates)* — Pay special attention to `DATE` types
2. *[Numeric Strings](/sql/where-clause/obfuscation/numeric-strings)* — Don’t mix types
3. *[Combining Columns](/sql/where-clause/obfuscation/concatenation)* — use redundant `where` clauses
4. *[Smart Logic](/sql/where-clause/obfuscation/smart-logic)* — The smartest way to make SQL slow
5. *[Math](/sql/where-clause/obfuscation/math)* — Databases don’t solve equations
