---
title: "Performance and Scalability"
lang: en
---

This chapter is about performance and scalability of databases.

In this context, I am using the following definition for scalability:

```
Scalability is the ability of a system, network, or process,
to handle a growing amount of work in a capable manner
or
its ability to be enlarged to accommodate that growth.
```

— [Wikipedia](https://en.wikipedia.org/wiki/Scalability)

You see that there are actually two definitions. The first one is about the effects of a growing load on a system and the second is about growing a system to handle more load.

The second definition enjoys much more popularity than the first one. Whenever somebody talks about scalability, it is almost always about using more hardware. *Scale-up* and *scale-out* are the respective keywords which were recently complemented by new buzzwords like *web-scale*.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-scalability&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Broadly speaking, scalability is about the performance impact of environmental changes. Hardware is just one environmental parameter that can change. This chapter covers other parameters like data volume and system load as well.

## Contents

1. *[Data Volume](/sql/testing-scalability/data-volume)* — Sloppy indexing bites back
2. *[System Load](/sql/testing-scalability/system-load)* — Production load affects response time
3. *[Response Time and Throughput](/sql/testing-scalability/response-time-throughput-scaling-horizontal)* — Horizontal scalability
