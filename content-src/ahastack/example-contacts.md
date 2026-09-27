---
title: "مثال من كتاب Hypermedia Systems"
lang: en
---

The [Hypermedia Systems book](https://hypermedia.systems/book/contents/) is the essential book you need to read when starting out with htmx.

In the book you build a simple contacts management application using Flask + htmx.

I created a repo that follows the book using Astro + htmx instead, using PocketBase as the backend.

Use this repo as you read the book, otherwise it will not make much sense to you.

The PocketBase collection contains 5 fields, `first`, `last`, `phone`, `email`.

Follow along the book and use this repository’s commits as a reference:

[https://github.com/flaviocopes/astromediasystems/commits/main/](https://github.com/flaviocopes/astromediasystems/commits/main/)

It’s not 100% implemented, a lot of stuff is missing (there’s a lot!) but you can get the idea of what it’s like to work with htmx and Astro to build Web Applications.

Right now you can see in action `hx-boost`, active search, confirmation dialogs, using `DELETE` HTTP method, using `hx-push-url`, `hx-select`, and pagination.

Note that the repo uses htmx 1. The concepts are the same in htmx 4, but check the [migration notes](https://four.htmx.org/docs/#migrating-from-htmx-2x-to-4x) if you copy code from it.
