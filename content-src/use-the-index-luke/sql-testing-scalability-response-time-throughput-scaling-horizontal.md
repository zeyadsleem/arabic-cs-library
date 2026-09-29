---
title: "Response Time, Throughput and Horizontal Scalability"
lang: en
---

Bigger hardware is not always faster—but it can usually handle more load. Bigger hardware is more like a wider highway than a faster car: you cannot drive faster—well, you are not allowed to—just because there are more lanes. That is the reason that more hardware does not automatically improve slow SQL queries.

We are not in the 1990s anymore. The computing power of single core CPUs was increasing rapidly at that time. Most response time issues disappeared on newer hardware—just because of the improved CPU. It was like new car models consistently going twice as fast as old models—every year! However, single core CPU power hit the wall during the first few years of the 21st century. There was almost no improvement on this axis anymore. To continue building ever more powerful CPUs, the vendors had to move to a multi-core strategy. Even though it allows multiple tasks to run concurrently, it does not improve performance if there is only one task. Performance has more than just one dimension.

Scaling horizontally (adding more servers) has similar limitations. Although more servers can process more requests, they do not improve the response time for one particular query. To make searching faster, you need an efficient search tree—even in non-relational systems like [CouchDB](https://couchdb.apache.org/) and [MongoDB](https://www.mongodb.com/).

#### Important

Proper indexing is the best way to reduce query response time—in relational SQL databases as well as in non-relational systems.

Proper indexing aims to fully exploit the [logarithmic scalability](/sql/anatomy/the-tree#sb-log) of the [B-tree index](/sql/anatomy). Unfortunately indexing is usually done in a very sloppy way. The chart in [“*Performance Impacts of Data Volume*”](/sql/testing-scalability/data-volume) makes the effect of sloppy indexing apparent.

Figure 3.5 Response Time by Data VolumeThe response time difference between a sloppy and a proper index is stunning. It is hardly possible to compensate for this effect by adding more hardware. Even if you manage to cut the response time with hardware, it is still questionable if it is the best solution for this problem.

Many of the so-called NoSQL systems still claim to solve all performance problems with horizontal scalability. This scalability however is mostly limited to write operations and is accomplished with the so-called [eventual consistency](#sb-cap-theorem) model. SQL databases use a strict consistency model that slows down write operations, but that does not necessarily imply bad throughput. Learn more about this in the box entitled [“*Eventual Consistency and the CAP Theorem*”](#sb-cap-theorem).

## Eventual Consistency and the CAP Theorem

Maintaining strict consistency in a distributed system requires a synchronous coordination of all write operations between the nodes. This principle has two unpleasant side effects: (1) it adds latencies and increases response times; (2) it reduces the overall availability because multiple members must be available at the same time to complete a write operation.

A *distributed* SQL database is often confused with computer clusters that use a shared storage system or master-slave replication. In fact a *distributed* database is more like a web shop that is integrated with an [ERP](https://en.wikipedia.org/wiki/Enterprise_resource_planning) system—often two different products from different vendors. The consistency between both systems is still a desirable goal that is often achieved using the [two-phase commit (2PC) protocol](https://en.wikipedia.org/wiki/Two-phase_commit_protocol). This protocol established global transactions that deliver the well-known “all-or-nothing” behavior across multiple databases. Completing a global transaction is only possible if all contributing members are available. It thus reduces the overall availability.

The more nodes a distributed system has, the more troublesome strict consistency becomes. Maintaining strict consistency is almost impossible if the system has more than a few nodes. Dropping strict consistency, on the other hand, solves the availability problem and eliminates the increased response time. The basic idea is to reestablish the global consistency after completing the write operation on a subset of the nodes. This approach leaves just one problem unsolved: it is impossible to prevent conflicts if two nodes accept contradictory changes. [Consistency is eventually](https://en.wikipedia.org/wiki/Eventual_consistency) reached by *handling* conflicts, not by *preventing* them. In that context, consistency means that all nodes have the same data—it is not necessarily the correct or best data.

[Brewer’s CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem) describes the general dependencies between *C*onsistency, *A*vailability, and *P*artition tolerance.

More hardware will typically not improve response times. In fact, it might even make the system slower because the additional complexity might accumulate more latencies. Network latencies won’t be a problem if the application and database run on the same computer, but this setup is rather uncommon in production environments where the database and application are usually installed in dedicated hardware. Security policies might even require a firewall between the application server and the database—often doubling the network latency. The more complex the infrastructure gets, the more latencies accumulate and the slower the responses become. This effect often leads to the counterintuitive observation that the expensive production hardware is slower than the cheap desktop PC environment that was used for development.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-responsetime-througput&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Another very important latency is the disk seek time. Spinning hard disk drives (HDD) need a rather long time to place the mechanical parts so that the requested data can be read—typically a few milliseconds. This latency occurs four times when traversing a four level B-tree—in total: a few dozen milliseconds. Although that’s half an eternity for computers, it is still far below out perception threshold…when done only once. However, it is very easy to trigger hundreds or even thousands disk seeks with a single SQL statement, in particular when combining multiple tables with a join operation. Even though [caching](#sb-ssd-caching) reduces the problem dramatically and new technologies like [SSD](#sb-ssd-caching) decrease the seek time by an order of magnitude, joins are still generally suspected of being slow. The next chapter will therefore explain how to use indexes for efficient table joins.

## Solid State Disks (SSD) and Caching

Solid State Disks (SSD) are a mass storage technology that uses no moving parts. The typical seek time of SSDs is by an order of magnitude faster than the seek time of HDDs. SSDs became available for enterprise storage around 2010 but, due to their high cost and limited lifetime, are not commonly used for databases.

Databases do, however, cache frequently accessed data in the main memory. This is particularly useful for data that is needed for every index access—for example the index root nodes. The database might fully cache frequently used indexes so that an index lookup does not trigger a single disk seek.

#### Factbox

- Performance has two dimensions: response time and throughput.
- More hardware will typically not improve query response time.
- Proper indexing is the best way to improve query response time.

#### Links

- [Description of the setup for the chart.](/sql/testing-scalability/system-load)
- [NoSQL](https://en.wikipedia.org/wiki/NoSQL), [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) and [Brewer’s CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem) at Wikipedia
- B-Tree indexes in [CouchDB](https://guide.couchdb.org/draft/btree.html) and [MongoDB](https://www.mongodb.com/docs/manual/indexes/).
- Article: “[Choosing NoSQL For The Right Reason](https://blog.fatalmind.com/2011/05/13/choosing-nosql-for-the-right-reason/)”
