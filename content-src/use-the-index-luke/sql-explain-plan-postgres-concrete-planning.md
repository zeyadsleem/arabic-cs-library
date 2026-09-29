---
title: "Concrete Planning"
lang: en
---

PostgreSQL does not have a shared query plan cache, but it has an *optional* query plan cache for prepared statements. That means that the developer has the choice to use a prepared statement with or without cached query plan. But note that the cache is dropped when the prepared statement is closed.

The following samples show how to use this functionality in various languages.

CThe native C API provides the function [`PQexecParams`](https://www.postgresql.org/docs/current/libpq-exec.html#LIBPQ-PQEXECPARAMS), which allows to use bind parameters during prepare (as opposed to `PQprepare`).

Java

The PostgreSQL JDBC driver controls [server-side prepare](https://jdbc.postgresql.org/documentation/server-prepare/) via the non-standard method `setPrepareThreshold` on [PGStatement](https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/PGStatement.html#setPrepareThreshold%28int%29) and [PGConnection](https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/PGConnection.html#setPrepareThreshold%28int%29).

Note that the default setting is five, which means that the first four executions will actually use the bind parameters during prepare, the later ones not. That counter starts fresh for each `PreparedStatement` instance.

#### Warning

There are many frameworks that use a `PreparedStatement` cache—configured via `prepared-statement-cache-size` in the data source setup. That means you can hit limit at any time.

Ruby

Ruby’s [PGconn.exec](https://deveiate.org/code/pg/PGconn.html#method-i-exec) accepts bind parameters as optional argument. The values will be used during planning if provided. Jeff Davis has an [example](http://thoughts.davisjeff.com/2011/07/09/building-sql-strings-dynamically-in-2011/).
