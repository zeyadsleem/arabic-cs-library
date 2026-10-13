---
title: "CLI"
lang: en
chapter: concepts
slug: cli
order: 23
source: https://better-auth.com/docs/concepts/cli
---

# CLI (/docs/concepts/cli)

Learn about the Better Auth CLI commands for generating, migrating, and checking database schemas, creating initial admins, initializing projects, generating secret keys, and gathering diagnostic info.

Better Auth comes with a built-in CLI to help you manage and check database schemas, create initial admin users, initialize your project, generate a secret key for your application, and gather diagnostic information about your setup.

## Generate

The `generate` command creates the schema required by Better Auth. If you're using a database adapter like Prisma or Drizzle, this command will generate the right schema for your ORM. If you're using the built-in Kysely adapter, it will generate an SQL file you can run directly on your database.
