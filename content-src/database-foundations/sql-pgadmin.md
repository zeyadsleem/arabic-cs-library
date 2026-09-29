---
title: "Installation of pgAdmin"
lang: en
---

> A man's nothing without his tools. &mdash;Kathy Reichs

In this chapter, you'll install pgadmin and configure connections to the database server. This involves a fair bit of configuration. Lots of things can (and will) go wrong but don't worry: we are here to help.

## Connecting to the database server

It is possible to install database software on your own laptop. However, for larger applications, a *database server* that runs the software is commonly used. Everyone that needs to use the database stored on the server (be it humans, software, ...) then connects to the server using a piece of software. In this course, we will use a PostgreSQL server. You communicate with the server via a *client*. There are dozens of clients. In this course we will use two of them: pgAdmin and DBSchema. For the first lessons pgAdmin will do fine.

The figure below shows how a client never interacts directly with the data itself, but how it always interacts via a database server ([source figure](https://medium.datadriveninvestor.com/artificial-intelligence-series-part-5-data-analysis-using-sql-7e61bee24b85)).

![client-server at databases, source: https://medium.datadriveninvestor.com/artificial-intelligence-series-part-5-data-analysis-using-sql-7e61bee24b85](/images/database-foundations/sql-pgadmin-0-rdbms.webp)

## Installation pgAdmin

Follow the steps in the document [‘manual.pdf’](/assets/PDF/manual.pdf). This manual describes in detail how to install pgAdmin and how to configure three connections to the database server within pgAdmin. The video below demonstrates the steps of the manual for a previous academic year (so the connections have a different number), but the steps stay the same.

After executing all of the steps, you should have three connections to the database:

- The connection via port 54321 remains the same every year. Here you will find a number of basic databases that can be used over the course of several academic years.
- The second connection, via port 50203 is updated every year. Via this connection you reach, among other things, the database of your class where you can create your own new schemas.
- Finally, there is a third connection that uses pooling: 60203. This connection gives access to exactly the same as via port 50203, but in a smarter way so that you will never run out of connections. *In practice, always use this pooling connection.*
