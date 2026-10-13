---
title: "Database"
lang: en
chapter: concepts
slug: database
order: 26
source: https://better-auth.com/docs/concepts/database
---

# Database (/docs/concepts/database)

Learn about database adapters, migrations, secondary storage with Redis, core schema (user, session, account, verification), custom tables, extending schemas, ID generation, database hooks, and plugin schemas.

## Adapters

Better Auth connects to a database to store data. The database will be used to store data such as users, sessions, and more. Plugins can also define their own database tables to store data.

You can pass a database connection to Better Auth by passing a supported database instance in the database options. You can learn more about supported database adapters in the [Other relational databases](https://better-auth.com/docs/adapters/other-relational-databases) documentation.

::: {note}
Better Auth also works without any database. For more details, see [Stateless Session Management](https://better-auth.com/docs/concepts/session-management#stateless-session-management).
:::

## CLI

Better Auth comes with a CLI tool to manage database migrations and generate schema.

### Running Migrations

The cli checks your database and prompts you to add missing tables or update existing ones with new columns. This is only supported for the built-in Kysely adapter. For other adapters, you can use the `generate` command to create the schema and handle the migration through your ORM.
