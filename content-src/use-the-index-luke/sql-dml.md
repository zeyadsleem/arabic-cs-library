---
title: "Modifying Data"
lang: en
---

So far we have only discussed query performance, but SQL is not only about queries. It supports data manipulation as well. The respective commands—`insert`, `delete`, and `update`—form the so-called “data manipulation language” (DML)—a section of the SQL standard. The performance of these commands is for the most part negatively influenced by indexes.

An index is pure redundancy. It contains only data that is also stored in the table. During write operations, the database must keep those redundancies consistent. Specifically, it means that `insert`, `delete` and `update` not only affect the table but also the indexes that hold a copy of the affected data.

## Contents

1. *[Insert](/sql/dml/insert)* — cannot take direct benefit from indexes
2. *[Delete](/sql/dml/delete)* — uses indexes for the `where` clause
3. *[Update](/sql/dml/update)* — does not affect all indexes of the table
