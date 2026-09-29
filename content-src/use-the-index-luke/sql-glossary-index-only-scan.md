---
title: "Index-Only Scan"
lang: en
---

The Index-Only Scan is an index scan without subsequent table access—hence, accessing the index only.

All recent versions of Oracle, SQL Server and MySQL support index-only scans. The PostgreSQL database supports index-only scans since [release 9.2](https://www.depesz.com/2011/10/08/waiting-for-9-2-index-only-scans/).

A query can be executed with an Index-Only Scan if all queried data is available in the index. That means that even the columns that appear in the `select` clause only, must be included in the index.

The performance advantage of an index-only scans depends on the number of accessed rows and the index clustering factor.

#### Links

- Book-Section: [Index-Only Scan: Avoiding Table Access](/sql/clustering/index-only-scan-covering-index)
- Glossary: [Covering Index](/sql/glossary/covering-index) — Alternative name for index-only scan
