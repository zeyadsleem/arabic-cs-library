---
title: "Obfuscated Conditions"
lang: en
---

The following sections demonstrate some popular methods for obfuscating conditions. Obfuscated conditions are `where` clauses that are phrased in a way that prevents proper index usage. This section is a collection of anti-patterns every developer should know about and avoid.

## Contents

1. *[Dates](/sql/where-clause/obfuscation/dates)* — Pay special attention to `DATE` types
2. *[Numeric Strings](/sql/where-clause/obfuscation/numeric-strings)* — Don’t mix types
3. *[Combining Columns](/sql/where-clause/obfuscation/concatenation)* — use redundant `where` clauses
4. *[Smart Logic](/sql/where-clause/obfuscation/smart-logic)* — The smartest way to make SQL slow
5. *[Math](/sql/where-clause/obfuscation/math)* — Databases don’t solve equations
