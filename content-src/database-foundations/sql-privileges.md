---
title: "Allocation of PRIVILEGES"
lang: en
---

> When my brothers try to draw a circle to exclude me, I shall draw a larger circle to include them. Where they speak out for the privileges of a puny group, I shall shout for the rights of all mankind. &mdash;Pauli Murray

Consider your ISP in KULoket for a moment. Behind KULoket is an extensive database. At the beginning of each semester you can make adjustments in your ISP: e.g. add or omit courses, adjust groups in another phase than your basic phase etc.* Obviously, you cannot view another student's ISP, because that is personal information*. But have you ever wondered who within UCLL does have access to your ISP? Who can change it?

- Your student coach (STC), which goes without saying because you can discuss the ISP with your STC, who, by the way, must also approve it.
- People from the student secretarial office, for example, sometimes have to adjust the basic group, so they also get access.
- Ordinary lecturers (without an STC role), however, cannot view students' ISPs.

In other words, the rights to view and change an ISP are not the same for everyone. This is also the case in a database. In a database, you can determine who can view and change data. This access rights are called *privileges*.

In this section, we'll give you a simplified look at the rights system of PostgreSQL.

## Privileges - rights

As an STC, I have *limited* access to all ISPs in KULoket. If I go to my son David's ISP (studied at KULeuven, so not UCLL), I get a (Dutch) error message saying that I can only look at it, not change it:

![](/images/database-foundations/sql-privileges-0-DavidISP.webp)

Thus, I *do* have the right to *survey* the ISP, consult it, but *not* to make *changes* to it.

Can you think of a reason why an STC at UCLL can still consult ISPs of KULeuven students?

#### الحل

One reason is that a student coach at UCLL should be able to advise new students who were already studying at KULeuven. In order to assess whether such a student could get exemptions, it makes sense for an STC to be able to request an overview of every student at the KULeuven association. An STC should only be able to see what credits a student obtained, not with what grades this occurred. So I don't get to see those points!

We talk about ‘privileges’ within PostgreSQL. Granting privileges to other users in SQL can be done with `GRANT ... PRIVILEGE ... TO`. We will first give some examples and then discuss the `GRANT` statements that can be useful for a database assignment where you need to collaborate with other people within the same database schema.

## GRANT

Without going into detail, first some examples:

- `GRANT USAGE ON SCHEMA examoef TO student`: all users who have the role ‘student’ get access to the schema ‘examoef’.
- `GRANT SELECT ON TABLE customer TO local_r0987654`: user ‘local_r0987654’ is allowed to `SELECT` statements on the table ‘customer’ in the current schema.
- `GRANT ALL ON ALL TABLES IN SCHEMA project TO local_01234567, local_02345678, local_03456789`: give these three students *all* permissions to *all* tables of which you are the owner.

You define access rights with the `GRANT` statement. This is one of the more complex statements in SQL. We will limit ourselves to those things that are useful for the group work. From [the extensive documentation of `GRANT`](https://www.postgresql.org/docs/current/sql-grant.html) we extract some possibilities. Don't panic if the following overwhelms you a bit. We will elaborate in the following sections.

The formal definition looks like this:

```
GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER }
  [, ...] | ALL [ PRIVILEGES ] }
  ON { [ TABLE ] table_name [, ...]
    | ALL TABLES IN SCHEMA schema_name [, ...] }
  TO role_specification [, ...] [ WITH GRANT OPTION ]
  [ GRANTED BY role_specification ]

GRANT { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }
  ON SCHEMA schema_name [, ...]
  TO role_specification [, ...] [ WITH GRANT OPTION ]
  [ GRANTED BY role_specification ]
```

*No panic!* First, process the rest of this chapter and then come back for a moment back to the definition above. It will look a whole lot more readable then.

## Practical exercise related to rights

In what follows we will get hands-on in postgreSQL. Preferably make these exercises in pairs. It is also possible alone (e.g. for distance learning students). Each student has after all, two separate users: your r-number on the regular connection 50203 and your local_r-number on the pooling connection 60203. The exercises are set up as a kind of role-play between two users ([‘Alpha’ and ‘Bravo’](https://militaryalphabet.net)).

Screenshots and code below were created for user ‘local_u0012047’ (‘Alpha’, played here by lecturer Jan) and user ‘local_0145920’ (‘Bravo’, lecturer Steven). If you make the exercise yourself, of course you replace our two usernames with your own r-numbers.

Perform the steps in the following work text. If something goes wrong, please read on. We intentionally let you make mistakes here and there in order to learn from them …

## Owner

* Anyone who creates an object (schema, table, etc.) in a database is automatically owner of this object. * Now perform the following steps in the database belonging to your group (‘1TX31’, ...):

- Alpha creates a new schema named ‘u0012047_privileges’ in the pooling connection 60203.
- Bravo also uses the pooling connection.
- Only the owner currently has privileges to do anything in this schema. To demonstrate this, Bravo tries to create a table in this schema.

Bravo creates (via a `CREATE` statement) a very simple table ‘customer’ with only two columns: customer number (integer, this is the primary key so mandatory) and name (`varchar(50)`, also mandatory). *Don't forget to put the name of the schema before the name of the table otherwise you will create a new table in public!* Normally, Bravo gets an error message in the style of:

```
ERROR:  permission denied for schema u0012047_privileges
LINE 1: create table u0012047_privileges.customer (
                     ^
SQL state: 42501
Character: 14
```

## Giving rights to your schema

Bravo cannot create new objects (such as a table) in the schema of Alpha. * It is now up to the schema owner to assign appropriate permissions to another user. * Now put these next steps into practice:

Alpha gives certain rights to the schema to Bravo. This can be very limited to only use (`USAGE`), as we do for the schema on an exam. After all, we do not want students to make their own changes to the schema (new tables etc). Alpha, however, wants his peer to be able to work in his schema and types the following command into a query tool:

```
GRANT ALL PRIVILEGES ON SCHEMA u0012047_privileges TO local_0145920;
--The word PRIVILEGES is not required, so shorter is:
GRANT ALL ON SCHEMA u0012047_privileges TO local_0145920
```

If all goes well, the server responds with:

```
GRANT

Query returned successfully in 60 msec.
```

Bravo has now been granted all rights to Alpha's schema. Although ... *all* rights? Bravo tries to drop the schema:

```
DROP SCHEMA u0012047_privileges;
```

The database server responds with an error message:

```
ERROR: must be owner of schema u0012047_privileges
SQL state: 42501
```

In other words, `ALL PRIVILEGES` actually means ‘everything except `DROP`’. You can never drop someone else's schema, unless you are *superuser* of the database server.

Bravo now tries again in Alpha's schema to create the new table ‘customer’. It should succeed now. Try this out!

## Giving rights to a table

Bravo was able to successfully create the small table ‘customer’. We are now trying the following things on this table.

Bravo adds a customer with number 789 and name ‘Dieter Desmedt’ to the table. This should work without a problem, see figure:

![](/images/database-foundations/sql-privileges-1-KlantDieter.webp) Alpha tries to add a row to the table ‘customer’ (‘Wim Claes’ with customer number 5). However, it gets the following error message:

```
ERROR: permission denied for table customer state: 42501
```

That error message makes sense, because Alpha is not the owner of the ‘customer’ table object. *The fact that Alpha does own the schema is irrelevant, because this is only about the permissions on the table itself.*

Bravo now gives `INSERT` privilege to Alpha:

```
GRANT INSERT ON TABLE u0012047_privileges.customer to local_u0012047;
```

You can visualize those permissions nicely in pgAdmin. Right click on the table ‘client’ and choose properties... The figure below tells me that local_0145920 is the owner of this table:

![](/images/database-foundations/sql-privileges-2-tabelproperties.webp)

The security tab provides additional information:

![](/images/database-foundations/sql-privileges-3-tabelsecurity.webp)

Two difficult words here: ‘grantor’ is the one who gives the rights, ‘grantee’ is the recipient of the rights. This screenshot shows that user local_u0145920 has given `INSERT` rights to user local_u0012047. *By the way, you can change permissions yourself in this tab and save this. However, at least for the exam, you should be able to do this using only SQL statements in pgAdmin.*

Now Alpha can add a row to the table:

```sql
INSERT INTO u0012047_privileges.customer VALUES(5,'Wim Claes');
```

Alpha notices, however, that this is not the right customer, so it must be removed:

```sql
DELETE FROM u0012047_privileges.customer
WHERE customer_number = 5;
```

Explain what happens when this query is executed.

Bravo also gives Alpha `DELETE` privilege. Alpha then tries to delete the customer with number 5 again with the query above. The surprising result is that this fails because Alpha does not have enough permissions! How can that be? The owner of the table (Bravo) just gave `DELETE` permissions, didn't he?

The answer to these questions is [in the postgres documentation](https://www.postgresql.org/docs/current/ddl-priv.html). We quote briefly, “In practice, any nontrivial `DELETE` command will require `SELECT` privilege as well, since it must reference table columns to determine which rows to delete.”. Since the `DELETE` query above has to be able to `select` the row with customer number 5, Alpha must therefore also have `SELECT` permissions.

Bravo, also give `SELECT` permissions on your table, so that Alpha can remove the wrong row. Great!

## Overview rights

You can find the full list of privileges at [the page already mentioned](https://www.postgresql.org/docs/current/ddl-priv.html). For us the most interesting ones are (the system is much more extensive than this small overview):

1. `ALL`: all rights (except `DROP`).
2. `SELECT`: select column(s) in a table. Almost also always needed for `UPDATE` and `DELETE` privileges.
3. `UPDATE`: right to update columns in a table.
4. `DELETE`: delete rows in a table.
5. `CREATE`: right to create a new schema in a database, or create a new table in an existing schema.
6. `USAGE`: right to access in a schema.

For the group work, in practice you will give all permissions to all group members. One person creates the schema and gives everyone rights:

```
GRANT ALL ON SCHEMA ... TO local_r1, local_r2, local_r3
```

Each student who creates a new table in this schema then gives the others all rights to those tables. You can also give privileges on *all* tables in a schema:

```
GRANT ALL ON ALL TABLES IN SCHEMA ... TO ...
```

This is what the lecturers do for the exam schema:

```
GRANT USAGE ON SCHEMA examschema TO student;
GRANT SELECT ON ALL TABLES IN SCHEMA examschema TO student;
```

In other words, on the exam, you get access to all the tables of the schema and can only perform `SELECT` queries.

## REVOKE

Everything you can *grant* in terms of privileges you can also *remove* with `REVOKE`. You simply replace the word `GRANT` with `REVOKE` in the above examples.
