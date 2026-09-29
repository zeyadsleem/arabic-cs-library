---
title: "The Equality Operator"
lang: en
---

The equality operator is both the most trivial and the most frequently used SQL operator. Indexing mistakes that affect performance are still very common and `where` clauses that combine multiple conditions are particularly vulnerable.

This section shows how to verify index usage and explains how concatenated indexes can optimize combined conditions. To aid understanding, we will analyze a slow query to see the real world impact of the causes explained in [Chapter 1](/sql/anatomy).

## Contents

1. *[Primary Keys](/sql/where-clause/the-equals-operator/primary-keys)* — Verifying index usage
2. *[Concatenated Keys](/sql/where-clause/the-equals-operator/concatenated-keys)* — Multi-column indexes
3. *[Slow Indexes, Part II](/sql/where-clause/the-equals-operator/slow-indexes-part-ii)* — The first ingredient, revisited
