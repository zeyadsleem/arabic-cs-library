---
title: "Query Processing"
lang: en
---

# 3.1. Overview

In PostgreSQL, a single backend process typically handles all queries issued by a connected client.

The backend consists of five primary subsystems:

1. **Parser:** Creates a parse tree from a plain-text SQL statement.
2. **Analyzer/Analyser:** Performs semantic analysis of the parse tree and creates a query tree.
3. **Rewriter:** Transforms the query tree according to rules stored in the [rule system](http://www.postgresql.org/docs/current/static/rules.html), if any such rules exist.
4. **Planner:** Creates the most efficient plan tree from the query tree.
5. **Executor:** Executes the query by accessing tables and indexes in the order specified by the plan tree.

![](/images/postgres-internals/pgsql03-fig-3-01.webp)

#### Figure 3.1. Query Processing.

This section provides an overview of these subsystems. Because the planner and the executor are highly complex, their functions are explained in detail in the subsequent sections.

Section Contents

- 3.1.1. Parser
- 3.1.2. Analyzer/Analyser
- 3.1.3. Rewriter
- 3.1.4. Planner and Executor

## 3.1.1. Parser

The parser creates a parse tree from a plain-text SQL statement that can be processed by subsequent subsystems. Below is a specific example illustrating this process.

Consider the following query:

```
testdb=# SELECT id, data FROM tbl_a WHERE id < 300 ORDER BY data;
```

A parse tree is a data structure whose root is the `SelectStmt` structure, defined in [parsenodes.h](https://github.com/postgres/postgres/blob/master/src/include/nodes/parsenodes.h).

Figure 3.2(b) illustrates the parse tree of the query shown in Figure 3.2(a).

** ** SelectStmt

```
typedef struct SelectStmt
{
	NodeTag		type;

	/*
	 * These fields are used only in &#34;leaf&#34; SelectStmts.
	 */
	List	   *distinctClause; /* NULL, list of DISTINCT ON exprs, or
								 * lcons(NIL,NIL) for all (SELECT DISTINCT) */
	IntoClause *intoClause;		/* target for SELECT INTO */
	List	   *targetList;		/* the target list (of ResTarget) */
	List	   *fromClause;		/* the FROM clause */
	Node	   *whereClause;	/* WHERE qualification */
	List	   *groupClause;	/* GROUP BY clauses */
	bool		groupDistinct;	/* Is this GROUP BY DISTINCT? */
	Node	   *havingClause;	/* HAVING conditional-expression */
	List	   *windowClause;	/* WINDOW window_name AS (...), ... */

	/*
	 * In a &#34;leaf&#34; node representing a VALUES list, the above fields are all
	 * null, and instead this field is set.  Note that the elements of the
	 * sublists are just expressions, without ResTarget decoration. Also note
	 * that a list element can be DEFAULT (represented as a SetToDefault
	 * node), regardless of the context of the VALUES list. It's up to parse
	 * analysis to reject that where not valid.
	 */
	List	   *valuesLists;	/* untransformed list of expression lists */

	/*
	 * These fields are used in both &#34;leaf&#34; SelectStmts and upper-level
	 * SelectStmts.
	 */
	List	   *sortClause;		/* sort clause (a list of SortBy's) */
	Node	   *limitOffset;	/* # of result tuples to skip */
	Node	   *limitCount;		/* # of result tuples to return */
	LimitOption limitOption;	/* limit type */
	List	   *lockingClause;	/* FOR UPDATE (list of LockingClause's) */
	WithClause *withClause;		/* WITH clause */

	/*
	 * These fields are used only in upper-level SelectStmts.
	 */
	SetOperation op;			/* type of set op */
	bool		all;			/* ALL specified? */
	struct SelectStmt *larg;	/* left child */
	struct SelectStmt *rarg;	/* right child */
	/* Eventually add fields for CORRESPONDING spec here */
} SelectStmt;
```

![](/images/postgres-internals/pgsql03-fig-3-02.webp)

#### Figure 3.2. An example of a parse tree.

The elements of the SELECT query are mapped to corresponding nodes in the parse tree, indicated by the matching numbers in Figure 3.2. For example:

- (1) is an item in the target list, representing the ‘id’ column.
- (4) represents the WHERE clause.

The parser validates only the syntax of the input query. Consequently, it returns an error only if the query contains a syntax violation.

The parser does not perform semantic checks; for example, it will not return an error even if the query references a non-existent table. All semantic validations are handled by the analyzer/analyser.

## 3.1.2. Analyzer/Analyser

The analyzer/analyser performs a semantic analysis of the parse tree created by the parser and produces a query tree.

The root of a query tree is the `Query` structure, defined in [parsenodes.h](https://github.com/postgres/postgres/blob/master/src/include/nodes/parsenodes.h). This structure contains metadata for the query &mdash; such as the command type (SELECT, INSERT, etc.) &mdash; and several leaves. Each leaf constitutes a list or a tree that holds data for a specific clause.

** ** Query

```python
/*
 * Query -
 *	  Parse analysis turns all statements into a Query tree
 *	  for further processing by the rewriter and planner.
 *
 *	  Utility statements (i.e. non-optimizable statements) have the
 *	  utilityStmt field set, and the rest of the Query is mostly dummy.
 *
 *	  Planning converts a Query tree into a Plan tree headed by a PlannedStmt
 *	  node --- the Query structure is not used by the executor.
 *
 *	  All the fields ignored for the query jumbling are not semantically
 *	  significant (such as alias names), as is ignored anything that can
 *	  be deduced from child nodes (else we'd just be double-hashing that
 *	  piece of information).
 */
typedef struct Query
{
	NodeTag		type;

	CmdType		commandType;	/* select|insert|update|delete|merge|utility */

	/* where did I come from? */
	QuerySource querySource pg_node_attr(query_jumble_ignore);

	/*
	 * query identifier (can be set by plugins); ignored for equal, as it
	 * might not be set; also not stored.  This is the result of the query
	 * jumble, hence ignored.
	 *
	 * We store this as a signed value as this is the form it's displayed to
	 * users in places such as EXPLAIN and pg_stat_statements.  Primarily this
	 * is done due to lack of an SQL type to represent the full range of
	 * uint64.
	 */
	int64		queryId pg_node_attr(equal_ignore, query_jumble_ignore, read_write_ignore, read_as(0));

	/* do I set the command result tag? */
	bool		canSetTag pg_node_attr(query_jumble_ignore);

	Node	   *utilityStmt;	/* non-null if commandType == CMD_UTILITY */

	/*
	 * rtable index of target relation for INSERT/UPDATE/DELETE/MERGE; 0 for
	 * SELECT.  This is ignored in the query jumble as unrelated to the
	 * compilation of the query ID.
	 */
	int			resultRelation pg_node_attr(query_jumble_ignore);

	/* has aggregates in tlist or havingQual */
	bool		hasAggs pg_node_attr(query_jumble_ignore);
	/* has window functions in tlist */
	bool		hasWindowFuncs pg_node_attr(query_jumble_ignore);
	/* has set-returning functions in tlist */
	bool		hasTargetSRFs pg_node_attr(query_jumble_ignore);
	/* has subquery SubLink */
	bool		hasSubLinks pg_node_attr(query_jumble_ignore);
	/* distinctClause is from DISTINCT ON */
	bool		hasDistinctOn pg_node_attr(query_jumble_ignore);
	/* WITH RECURSIVE was specified */
	bool		hasRecursive pg_node_attr(query_jumble_ignore);
	/* has INSERT/UPDATE/DELETE/MERGE in WITH */
	bool		hasModifyingCTE pg_node_attr(query_jumble_ignore);
	/* FOR [KEY] UPDATE/SHARE was specified */
	bool		hasForUpdate pg_node_attr(query_jumble_ignore);
	/* rewriter has applied some RLS policy */
	bool		hasRowSecurity pg_node_attr(query_jumble_ignore);
	/* parser has added an RTE_GROUP RTE */
	bool		hasGroupRTE pg_node_attr(query_jumble_ignore);
	/* is a RETURN statement */
	bool		isReturn pg_node_attr(query_jumble_ignore);

	List	   *cteList;		/* WITH list (of CommonTableExpr's) */

	List	   *rtable;			/* list of range table entries */

	/*
	 * list of RTEPermissionInfo nodes for the rtable entries having
	 * perminfoindex > 0
	 */
	List	   *rteperminfos pg_node_attr(query_jumble_ignore);
	FromExpr   *jointree;		/* table join tree (FROM and WHERE clauses);
								 * also USING clause for MERGE */

	List	   *mergeActionList;	/* list of actions for MERGE (only) */

	/*
	 * rtable index of target relation for MERGE to pull data. Initially, this
	 * is the same as resultRelation, but after query rewriting, if the target
	 * relation is a trigger-updatable view, this is the index of the expanded
	 * view subquery, whereas resultRelation is the index of the target view.
	 */
	int			mergeTargetRelation pg_node_attr(query_jumble_ignore);

	/* join condition between source and target for MERGE */
	Node	   *mergeJoinCondition;

	List	   *targetList;		/* target list (of TargetEntry) */

	/* OVERRIDING clause */
	OverridingKind override pg_node_attr(query_jumble_ignore);

	OnConflictExpr *onConflict; /* ON CONFLICT DO [NOTHING | UPDATE] */

	/*
	 * The following three fields describe the contents of the RETURNING list
	 * for INSERT/UPDATE/DELETE/MERGE. returningOldAlias and returningNewAlias
	 * are the alias names for OLD and NEW, which may be user-supplied values,
	 * the defaults &#34;old&#34; and &#34;new&#34;, or NULL (if the default &#34;old&#34;/&#34;new&#34; is
	 * already in use as the alias for some other relation).
	 */
	char	   *returningOldAlias pg_node_attr(query_jumble_ignore);
	char	   *returningNewAlias pg_node_attr(query_jumble_ignore);
	List	   *returningList;	/* return-values list (of TargetEntry) */

	List	   *groupClause;	/* a list of SortGroupClause's */
	bool		groupDistinct;	/* is the group by clause distinct? */

	List	   *groupingSets;	/* a list of GroupingSet's if present */

	Node	   *havingQual;		/* qualifications applied to groups */

	List	   *windowClause;	/* a list of WindowClause's */

	List	   *distinctClause; /* a list of SortGroupClause's */

	List	   *sortClause;		/* a list of SortGroupClause's */

	Node	   *limitOffset;	/* # of result tuples to skip (int8 expr) */
	Node	   *limitCount;		/* # of result tuples to return (int8 expr) */
	LimitOption limitOption;	/* limit type */

	List	   *rowMarks;		/* a list of RowMarkClause's */

	Node	   *setOperations;	/* set-operation tree if this is top level of
								 * a UNION/INTERSECT/EXCEPT query */

	/*
	 * A list of pg_constraint OIDs that the query depends on to be
	 * semantically valid
	 */
	List	   *constraintDeps pg_node_attr(query_jumble_ignore);

	/* a list of WithCheckOption's (added during rewrite) */
	List	   *withCheckOptions pg_node_attr(query_jumble_ignore);

	/*
	 * The following two fields identify the portion of the source text string
	 * containing this query.  They are typically only populated in top-level
	 * Queries, not in sub-queries.  When not set, they might both be zero, or
	 * both be -1 meaning &#34;unknown&#34;.
	 */
	/* start location, or -1 if unknown */
	ParseLoc	stmt_location;
	/* length in bytes; 0 means &#34;rest of string&#34; */
	ParseLoc	stmt_len pg_node_attr(query_jumble_ignore);
} Query;
```

Figure 3.3 illustrates the query tree for the query shown in Figure 3.2(a) from the previous subsection.

![](/images/postgres-internals/pgsql03-fig-3-03.webp)

#### Figure 3.3. The Query Tree of the SELECT query in Figure 3.2.

The query tree shown above is summarized as follows:

- **targetlist:** A list of columns that form the result of the query. In this example, the list contains two columns: ‘id’ and ‘data’. If the input query uses an asterisk (’*’), the analyzer/analyser explicitly expands it into all available columns.
- **range table:** A list of relations (tables) used in the query. In this example, the range table holds metadata for ’tbl_a’, such as its OID and name.
- **jointree:** A structure that stores the FROM and WHERE clauses.
- **sortClause:** A list of `SortGroupClause` structures.

The [official documentation](http://www.postgresql.org/docs/current/static/querytree.html) briefly describes the details of query trees.

## 3.1.3. Rewriter

The rewriter is the subsystem based on the [rule system](http://www.postgresql.org/docs/current/static/rules.html). It transforms a query tree according to the rules stored in the [pg_rules](http://www.postgresql.org/docs/current/static/view-pg-rules.html) system catalog, when applicable.

Although the rewriter and the rule system are powerful features, this section focuses on how they implement [Views](https://www.postgresql.org/docs/current/static/rules-views.html), using a specific example.

### 3.1.3.1. Views

When a view is defined with the [CREATE VIEW](http://www.postgresql.org/docs/current/static/sql-createview.html) command, a corresponding rule is automatically created and stored in the system catalog.

Assume that the following view has been defined and its corresponding rule is stored in the pg_rules system catalog:

```
sampledb=# CREATE VIEW employees_list
sampledb-#      AS SELECT e.id, e.name, d.name AS department
sampledb-#            FROM employees AS e, departments AS d WHERE e.department_id = d.id;
```

When the query shown below is issued, the parser creates a parse tree as illustrated in Figure 3.4(a).

```
sampledb=# SELECT * FROM employees_list;
```

At this stage, the rewriter transforms the range table node into a subquery parse tree based on the view definition stored in pg_rules system catalog.

![](/images/postgres-internals/pgsql03-fig-3-04.webp)

#### Figure 3.4. An example of the rewriter stage.

** Info

Because PostgreSQL implements views using this mechanism, they were not updatable prior to version 9.2 (2012). Although updatable views were introduced in version 9.3 (2013), several limitations remain. For further details, refer to the [official documentation](https://www.postgresql.org/docs/current/static/sql-createview.html#SQL-CREATEVIEW-UPDATABLE-VIEWS).

## 3.1.4. Planner and Executor

The planner receives a query tree from the rewriter and creates a (query) plan tree optimized for efficient execution by the executor.

PostgreSQL’s planner is based on pure **cost-based optimization**; it does not support rule-based optimization or hints. As the most complex subsystem in PostgreSQL, a detailed overview of the planner is provided in the subsequent sections of this chapter.

** pg_hint_plan and pg_plan_advice

Prior to version 19, PostgreSQL did not inherently support planner hints in core SQL, making [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) extension the primary choice for developers.

Version 19 (2026) introduces [pg_plan_advice](https://www.postgresql.org/docs/19/pgplanadvice.html) as a contribution module, making query hints officially available.

Similar to other RDBMSs, the [EXPLAIN](http://www.postgresql.org/docs/current/static/sql-explain.html) command in PostgreSQL displays the plan tree. A specific example is shown below:

```
1
2
3
4
5
6
7
8
```

```
testdb=# EXPLAIN SELECT * FROM tbl_a WHERE id < 300 ORDER BY data;
                          QUERY PLAN
---------------------------------------------------------------
 Sort  (cost=182.34..183.09 rows=300 width=8)
   Sort Key: data
   ->  Seq Scan on tbl_a  (cost=0.00..170.00 rows=300 width=8)
         Filter: (id < 300)
(4 rows)
```

This output represents the plan tree illustrated in Figure 3.5.

![](/images/postgres-internals/pgsql03-fig-3-05.webp)

#### Figure 3.5. A simple plan tree and the relationship between the plan tree and the result of the EXPLAIN command.

A plan tree is composed of elements called **plan nodes**, which are linked to the plantree list of the `PlannedStmt` structure. These elements are defined in [plannodes.h](https://github.com/postgres/postgres/blob/master/src/include/nodes/plannodes.h). For more details, refer to Section 3.3.3 and Section 3.5.4.2.

Each plan node contains the metadata required by the executor. In a single-table query, data flows through the plan tree from the leaves (bottom) up to the root. This execution follows the **Volcano Model** (also known as the **Iterator Model**), where tuples are processed and passed upward one at a time.

For example, the plan tree in Figure 3.5. consists of a Sort node and a Sequential Scan node. Consequently, the executor performs a sequential scan of the table *tbl_a* and then sorts the retrieved result[1](#fn:1).

The executor interacts with tables and indexes via the buffer manager, as described in [Chapter 8](/book/postgres-internals/pgsql08/index). During processing, the executor utilizes allocated memory areas such as temp_buffers and work_mem, and creates temporary files if the data exceeds the available memory. See Figure 3.6.

![](/images/postgres-internals/pgsql03-fig-3-06.webp)

#### Figure 3.6. The relationship among the executor, buffer manager and temporary files.

Furthermore, when accessing tuples, PostgreSQL employs a concurrency control mechanism to maintain the atomicity and isolation of active transactions. This mechanism is detailed in [Chapter 5](/book/postgres-internals/pgsql05/index).

1. From the perspective of control flow rather than data flow, the executor processes the plan tree from the top down. For instance, in this example, the executor invokes the Sort node, which in turn triggers the Sequential Scan node.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 3.2. Cost Estimation in Single-Table Query

PostgreSQL uses a **cost-based** query optimization model. Costs are dimensionless values; they do not serve as absolute performance indicators but are used to compare the relative performance of different operations.

Costs are estimated by the functions defined in [costsize.c](https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c). Every operation performed by the executor has a corresponding cost function. For instance, the costs of sequential scans and index scans are calculated by cost_seqscan() and cost_index(), respectively.

PostgreSQL categorizes costs into three types: **start-up**, **run**, and **total**. Since the total cost is the sum of the start-up and run costs, only the first two are independently estimated.

- **Start-up cost:** The cost incurred before the first tuple is fetched. For an index scan, this includes the cost of reading index pages to access the first tuple in the target table.
- **Run cost:** The cost of fetching all tuples.
- **Total cost:** The overall cost, calculated as the sum of the start-up and run costs.

The [EXPLAIN](https://www.postgresql.org/docs/current/static/sql-explain.html) command displays both the start-up and total costs for each operation. A basic example is shown below:

```
1
2
3
4
5
```

```
testdb=# EXPLAIN SELECT * FROM tbl;
                       QUERY PLAN
---------------------------------------------------------
 Seq Scan on tbl  (cost=0.00..145.00 rows=10000 width=8)
(1 row)
```

On line 4, the output provides details for the sequential scan. The cost section contains two values: $0.00$ and $145.00$, representing the start-up cost and the total cost, respectively.

This section explores the estimation processes for sequential scans, index scans, and sort operations in detail.

The following examples utilize the table and index defined below:

```
testdb=# CREATE TABLE tbl (id int PRIMARY KEY, data int);
testdb=# CREATE INDEX tbl_data_idx ON tbl (data);
testdb=# INSERT INTO tbl SELECT generate_series(1,10000),generate_series(1,10000);
testdb=# ANALYZE;
testdb=# \d tbl
      Table &#34;public.tbl&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &#34;tbl_pkey&#34; PRIMARY KEY, btree (id)
    &#34;tbl_data_idx&#34; btree (data)
```

Section Contents

- 3.2.1. Sequential Scan
- 3.2.2. Index Scan
- 3.2.3. Sort
- 3.2.4. Cardinality Estimation

## 3.2.1. Sequential Scan

The cost of a sequential scan is estimated by the cost_seqscan() function. This subsection explores the cost estimation for the following query:

```
testdb=# SELECT * FROM tbl WHERE id <= 8000;
```

In a sequential scan, the start-up cost is $0$. The run cost is defined by the following equation:

$$ \begin{aligned} \text{'run cost'} &= \text{'cpu run cost'} + \text{'disk run cost'} \\ &= (\text{cpu_tuple_cost} + \text{cpu_operator_cost}) \times N_{\text{tuple}} + \text{seq_page_cost} \times N_{\text{page}} \end{aligned} $$

Where:

[seq_page_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-SEQ-PAGE-COST), [cpu_tuple_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-CPU-TUPLE-COST) and [cpu_operator_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-CPU-OPERATOR-COST) are set in the postgresql.conf file. Their default values are $1.0$, $0.01$, and $0.0025$, respectively. $N_{\text{tuple}}$ and $N_{\text{page}}$ are the numbers of all tuples and all pages of this table, respectively. These values can be retrieved using the following query:

```
testdb=# SELECT relpages, reltuples FROM pg_class WHERE relname = 'tbl';
 relpages | reltuples
----------+-----------
       45 |     10000
(1 row)
```

Based on the query result:

$$ \begin{align} N_{\text{tuple}} &= 10000 \tag{3-1} \\ N_{\text{page}} &= 45 \tag{3-2} \end{align} $$

Therefore,

$$ \begin{align*} \text{'run cost'} &= (0.01 + 0.0025) \times 10000 + 1.0 \times 45 = 170.0 \\ \text{'total cost'} &= 0.0 + 170.0 = 170 \end{align*} $$

The result of the EXPLAIN command confirms these estimations:

```
1
2
3
4
5
6
```

```
testdb=# EXPLAIN SELECT * FROM tbl WHERE id <= 8000;
                       QUERY PLAN
--------------------------------------------------------
 Seq Scan on tbl  (cost=0.00..170.00 rows=8000 width=8)
   Filter: (id <= 8000)
(2 rows)
```

On line 4, the output shows the start-up and total costs as $0.00$ and $170.00$. The planner also estimates that $8000$ rows will be selected.

Line 5 displays the filter: “$(\text{id} <= 8000)$”, formally known as a *table-level filter predicate*.

Note that this type of filter is applied after reading all tuples from the table; it does not reduce the range of pages scanned on the disk.

** Info

As shown in the run-cost estimation, PostgreSQL assumes that all pages must be read from storage. The optimizer does not consider whether the scanned pages are currently resident in the shared buffers.

## 3.2.2. Index Scan

Although PostgreSQL supports various [index methods](https://www.postgresql.org/docs/current/static/indexes-types.html) &mdash; such as B-Tree, [GiST](https://www.postgresql.org/docs/current/static/gist.html), [GIN](https://www.postgresql.org/docs/current/static/gin.html), and [BRIN](https://www.postgresql.org/docs/current/static/brin.html) &mdash; the cost of an index scan is estimated using the common cost function [cost_index()](https://github.com/postgres/postgres/blob/ef6e028f05b3e4ab23c5edfdfff457e0d2a649f6/src/backend/optimizer/path/costsize.c#L549).

This subsection explains the process of estimating the index scan cost for the following query:

```
testdb=# SELECT id, data FROM tbl WHERE data <= 240;
```

Before estimation, the number of the index pages ($N_{\text{index,page}}$) and index tuples ($N_{\text{index,tuple}}$) must be identified:

```
testdb=# SELECT relpages, reltuples FROM pg_class WHERE relname = 'tbl_data_idx';
 relpages | reltuples
----------+-----------
       30 |     10000
(1 row)
```

Based on the query result:

$$ \begin{align} N_{\text{index,tuple}} &= 10000 \tag{3-3} \\ N_{\text{index,page}} &= 30 \tag{3-4} \end{align} $$

### 3.2.2.1. Start-Up Cost

The start-up cost of an index scan represents the cost incurred by reading index pages to access the first tuple in the target table. It is defined by the following equation:

$$ \begin{align*} \text{'start-up cost'} = \{\mathrm{ceil}(\log_2 (N_{\text{index,tuple}})) + (H_{\text{index}} + 1) \times 50\} \times \text{cpu_operator_cost} \end{align*} $$

In this equation, $H_{\text{index}}$ is the height of the index tree. The specifics of this calculation are documented in the comments of [btcostestimate()](https://github.com/postgres/postgres/blob/ef6e028f05b3e4ab23c5edfdfff457e0d2a649f6/src/backend/utils/adt/selfuncs.c#L7022).

In this example, $N_{\text{index,tuple}}$ is $10000$ according to (3-3), and $H_{\text{index}}$ is $1$. Using the default value of $0.0025$ for $\text{cpu_operator_cost}$, the calculation is as follows:

$$ \begin{align} \text{'start-up cost'} = \{\mathrm{ceil}(\log_2(10000)) + (1 + 1) \times 50\} \times 0.0025 = 0.285 \tag{3-5} \end{align} $$

### 3.2.2.2. Run Cost

The run cost of an index scan is the sum of the CPU and I/O costs for both the table and the index:

$$ \begin{align*} \text{'run cost'} &= (\text{'index cpu cost'} + \text{'table cpu cost'}) + (\text{'index IO cost'} + \text{'table IO cost'}). \end{align*} $$ ** Info

If an [Index-Only Scans](https://www.postgresql.org/docs/current/static/indexes-index-only-scans.html) (described in Section 7.2) is applied, the $\text{'table cpu cost'}$ and $\text{'table IO cost'}$ are not estimated.

The first three components are calculated as follows:

$$ \begin{align*} \text{'index cpu cost'} &= \text{Selectivity} \times N_{\text{index,tuple}} \times (\text{cpu_index_tuple_cost} + \text{qual_op_cost}) \\ \text{'table cpu cost'} &= \text{Selectivity} \times N_{\text{tuple}} \times \text{cpu_tuple_cost} \\ \text{'index IO cost'} &= \mathrm{ceil}(\text{Selectivity} \times N_{\text{index,page}}) \times \text{random_page_cost} \end{align*} $$

Where:

- [cpu_index_tuple_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-CPU-INDEX-TUPLE-COST) and [random_page_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-RANDOM-PAGE-COST) are parameters set in postgresql.conf (defaults are $0.005$ and $4.0$, respectively).
- $\text{qual_op_cost}$ represents the cost of evaluating the index predicate (default is $0.0025$).
- $\text{Selectivity}$ is the estimated fraction of the index search range that satisfies the WHERE clause (a floating-point value between $0$ and $1$). $(\text{Selectivity} \times N_{\text{tuple}})$ represents the number of table tuples to be read.
- $(\text{Selectivity} \times N_{\text{index,page}})$ represents the number of index pages to be read.

Selectivity is described in detail in the following **.

** Selectivity

The selectivity of query predicates is estimated using either **MCV (Most Common Values)** or **histogram_bounds**, both of which are stored as statistics in the [pg_stats](https://www.postgresql.org/docs/current/static/view-pg-stats.html).

The following provides a brief description of selectivity calculation using specific examples. For further details, refer to the [official documentation](https://www.postgresql.org/docs/current/static/row-estimation-examples.html).

#### Most Common Values (MCV)

The MCV for each column is stored in the pg_stats view in two associated columns:

- **most_common_vals:** A list of the most frequent values in the column.
- **most_common_freqs:** A list of the frequencies for those values.

Consider a table named “countries” with the following structure:

- **country:** The name of the country.
- **continent:** The continent to which the country belongs.

** ** countries

```
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
```

```sql
--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE countries (
    continent text,
    country text
);

ALTER TABLE countries OWNER TO postgres;

--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY countries (continent, country) FROM stdin;
Africa	Algeria
Africa	Angola
Africa	Benin
Africa	Botswana
Africa	Burkina
Africa	Burundi
Africa	Cameroon
Africa	Cape Verde
Africa	Central African Republic
Africa	Chad
Africa	Comoros
Africa	Congo
Africa	Djibouti
Africa	Egypt
Africa	Equatorial Guinea
Africa	Eritrea
Africa	Ethiopia
Africa	Gabon
Africa	Gambia
Africa	Ghana
Africa	Guinea
Africa	Guinea-Bissau
Africa	Ivory Coast
Africa	Kenya
Africa	Lesotho
Africa	Liberia
Africa	Libya
Africa	Madagascar
Africa	Malawi
Africa	Mali
Africa	Mauritania
Africa	Mauritius
Africa	Morocco
Africa	Mozambique
Africa	Namibia
Africa	Niger
Africa	Nigeria
Africa	Rwanda
Africa	Sao Tome and Principe
Africa	Senegal
Africa	Seychelles
Africa	Sierra Leone
Africa	Somalia
Africa	South Africa
Africa	South Sudan
Africa	Sudan
Africa	Swaziland
Africa	Tanzania
Africa	Togo
Africa	Tunisia
Africa	Uganda
Africa	Zambia
Africa	Zimbabwe
Asia	Afghanistan
Asia	Bahrain
Asia	Bangladesh
Asia	Bhutan
Asia	Brunei
Asia	Burma (Myanmar)
Asia	Cambodia
Asia	China
Asia	East Timor
Asia	India
Asia	Indonesia
Asia	Iran
Asia	Iraq
Asia	Israel
Asia	Japan
Asia	Jordan
Asia	Kazakhstan
Asia	North Korea
Asia	South Korea
Asia	Kuwait
Asia	Kyrgyzstan
Asia	Laos
Asia	Lebanon
Asia	Malaysia
Asia	Maldives
Asia	Mongolia
Asia	Nepal
Asia	Oman
Asia	Pakistan
Asia	Philippines
Asia	Qatar
Asia	Russian Federation
Asia	Saudi Arabia
Asia	Singapore
Asia	Sri Lanka
Asia	Syria
Asia	Tajikistan
Asia	Thailand
Asia	Turkey
Asia	Turkmenistan
Asia	United Arab Emirates
Asia	Uzbekistan
Asia	Vietnam
Asia	Yemen
Europe	Albania
Europe	Andorra
Europe	Armenia
Europe	Austria
Europe	Azerbaijan
Europe	Belarus
Europe	Belgium
Europe	Bosnia and Herzegovina
Europe	Bulgaria
Europe	Croatia
Europe	Cyprus
Europe	Czech Republic
Europe	Denmark
Europe	Estonia
Europe	Finland
Europe	France
Europe	Georgia
Europe	Germany
Europe	Greece
Europe	Hungary
Europe	Iceland
Europe	Ireland
Europe	Italy
Europe	Latvia
Europe	Liechtenstein
Europe	Lithuania
Europe	Luxembourg
Europe	Macedonia
Europe	Malta
Europe	Moldova
Europe	Monaco
Europe	Montenegro
Europe	Netherlands
Europe	Norway
Europe	Poland
Europe	Portugal
Europe	Romania
Europe	San Marino
Europe	Serbia
Europe	Slovakia
Europe	Slovenia
Europe	Spain
Europe	Sweden
Europe	Switzerland
Europe	Ukraine
Europe	United Kingdom
Europe	Vatican City
North America	Antigua and Barbuda
North America	Bahamas
North America	Barbados
North America	Belize
North America	Canada
North America	Costa Rica
North America	Cuba
North America	Dominica
North America	Dominican Republic
North America	El Salvador
North America	Grenada
North America	Guatemala
North America	Haiti
North America	Honduras
North America	Jamaica
North America	Mexico
North America	Nicaragua
North America	Panama
North America	Saint Kitts and Nevis
North America	Saint Lucia
North America	Saint Vincent and the Grenadines
North America	Trinidad and Tobago
North America	United States
Oceania	Australia
Oceania	Fiji
Oceania	Kiribati
Oceania	Marshall Islands
Oceania	Micronesia
Oceania	Nauru
Oceania	New Zealand
Oceania	Palau
Oceania	Papua New Guinea
Oceania	Samoa
Oceania	Solomon Islands
Oceania	Tonga
Oceania	Tuvalu
Oceania	Vanuatu
South America	Argentina
South America	Bolivia
South America	Brazil
South America	Chile
South America	Colombia
South America	Ecuador
South America	Guyana
South America	Paraguay
South America	Peru
South America	Suriname
South America	Uruguay
South America	Venezuela
\.

--
-- Name: idx_continent; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_continent ON countries USING btree (continent);

--
-- PostgreSQL database dump complete
--
```

```
testdb=# \d countries
   Table &#34;public.countries&#34;
  Column   | Type | Modifiers
-----------+------+-----------
 country   | text |
 continent | text |
Indexes:
    &#34;continent_idx&#34; btree (continent)

testdb=# SELECT continent, count(*) AS &#34;number of countries&#34;,
testdb-#     (count(*)/(SELECT count(*) FROM countries)::real) AS &#34;number of countries / all countries&#34;
testdb-#       FROM countries GROUP BY continent ORDER BY &#34;number of countries&#34; DESC;
   continent   | number of countries | number of countries / all countries
---------------+---------------------+-------------------------------------
 Africa        |                  53 |                   0.274611398963731
 Europe        |                  47 |                   0.243523316062176
 Asia          |                  44 |                   0.227979274611399
 North America |                  23 |                   0.119170984455959
 Oceania       |                  14 |                  0.0725388601036269
 South America |                  12 |                  0.0621761658031088
(6 rows)
```

For a query containing the clause **WHERE continent = ‘Asia’**, the planner estimates the cost using the MCV of the ‘continent’ column:

```
testdb=# SELECT * FROM countries WHERE continent = 'Asia';
```

To perform this estimation, the planner refers to the ‘most_common_vals’ and ‘most_common_freqs’ in the pg_stats view:

```
testdb=# \x
Expanded display is on.
testdb=# SELECT most_common_vals, most_common_freqs FROM pg_stats
testdb-#                  WHERE tablename = 'countries' AND attname='continent';
-[ RECORD 1 ]-----+-------------------------------------------------------------
most_common_vals  | {Africa,Europe,Asia,&#34;North America&#34;,Oceania,&#34;South America&#34;}
most_common_freqs | {0.274611,0.243523,0.227979,0.119171,0.0725389,0.0621762}
```

As shown above, the frequency in most_common_freqs corresponding to ‘Asia’ in most_common_vals is $0.227979$. Consequently, this value is adopted as the selectivity for the cost estimation.

#### Histogram Bounds

If MCVs are unavailable &mdash; for instance, when dealing with unique or highly diverse integer or double precision types &mdash; histogram_bounds are used.

- **histogram_bounds:** A list of values that divide the column’s data into groups (buckets) of approximately equal population.

Below is an example of histogram_bounds for the ‘data’ column in the table *tbl*:

```
testdb=# SELECT histogram_bounds FROM pg_stats WHERE tablename = 'tbl' AND attname = 'data';
				              histogram_bounds
----------------------------------------------------------------------------
 {1,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,
 1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,
 3200,3300,3400,3500,3600,3700,3800,3900,4000,4100,4200,4300,4400,4500,4600,
 4700,4800,4900,5000,5100,5200,5300,5400,5500,5600,5700,5800,5900,6000,6100,
 6200,6300,6400,6500,6600,6700,6800,6900,7000,7100,7200,7300,7400,7500,7600,
 7700,7800,7900,8000,8100,8200,8300,8400,8500,8600,8700,8800,8900,9000,9100,
 9200,9300,9400,9500,9600,9700,9800,9900,10000}
(1 row)
```

By default, histogram_bounds divides the data into 100 buckets. Figure 3.7 illustrates these buckets and their corresponding bounds.

Buckets are numbered starting from 0, with each bucket containing approximately the same number of tuples.

The histogram_bounds values represent the edges of these buckets. For example, if the 0th value of the histogram bounds is $1$ and the 1st value is $100$, then bucket[0] contains tuples with values in the range $[1,100)$ (i.e., values greater than or equal to $1$ and less than $100$).

![](/images/postgres-internals/pgsql03-fig-3-07.webp)

#### Figure 3.7. Buckets and histogram_bounds.

The selectivity calculation for the query **WHERE** $\text{data} <= 240$ is performed as follows. Since the value $240$ falls within the second bucket (between the bounds $200$ and $300$), linear interpolation is applied:

$$ \begin{align*} \text{Selectivity} &= \frac{2 + (240-\text{hb[2]})/(\text{hb[3]} - \text{hb[2]})}{100} \\ &= \frac{2 + (240-200) / (300-200)}{100} = \frac{2 + 40/100}{100} \\ &= 0.024 \tag{3-6} \end{align*} $$

Based on equations (3-1),(3-3),(3-4) and (3-6), the costs are calculated as:

$$ \begin{align*} \text{'index cpu cost'} &= 0.024 \times 10000 \times (0.005 + 0.0025) = 1.8 \tag{3-7} \\ \text{'table cpu cost'} &= 0.024 \times 10000 \times 0.01 = 2.4 \tag{3-8} \\ \text{'index IO cost'} &= \mathrm{ceil}(0.024 \times 30) \times 4.0 = 4.0 \tag{3-9} \end{align*} $$

The $\text{'table IO cost'}$ is defined by the following equation:

$$ \begin{align*} \text{'table IO cost'} = \text{max_IO_cost} + \text{indexCorrelation}^2 \times (\text{min_IO_cost} - \text{max_IO_cost}) \end{align*} $$

$\text{max_IO_cost}$ represents the worst-case I/O cost, occurring when all table pages are scanned randomly:

$$ \begin{align*} \text{max_IO_cost} = N_{\text{page}} \times \text{random_page_cost} \end{align*} $$

Using $N_{\text{page}} = 45$ from (3-2):

$$ \begin{align} \text{max_IO_cost} = 45 \times 4.0 = 180.0 \tag{3-10} \end{align} $$

$\text{min_IO_cost}$ represents the best-case I/O cost, occurring when selected table pages are scanned sequentially:

$$ \begin{align*} \text{min_IO_cost} = 1 \times \text{random_page_cost} + (\mathrm{ceil}(\text{Selectivity} \times N_{\text{page}}) - 1) \times \text{seq_page_cost} \end{align*} $$

In this case,

$$ \begin{align} \text{min_IO_cost} = 1 \times 4.0 + (\mathrm{ceil}(0.024 \times 45)) - 1) \times 1.0 = 5.0 \tag{3-11} \end{align} $$

$\text{indexCorrelation}$ is discussed in detail in the following **. In this example, the correlation is:

$$ \begin{align} \text{indexCorrelation} = 1.0 \tag{3-12} \end{align} $$

Consequently, according to (3-10), (3-11), and (3-12):

$$ \begin{align} \text{'table IO cost'} = 180.0 + 1.0^2 \times (5.0 - 180.0) = 5.0 \tag{3-13} \end{align} $$

Finally, the total run cost is determined by combining equations (3-7), (3-8), (3-9), and (3-13):

$$ \begin{align} \text{'run cost'} = (1.8 + 2.4) + (4.0 + 5.0) = 13.2 \tag{3-14} \end{align} $$ ** Index Correlation

Index correlation is the statistical correlation between the physical row ordering and the logical ordering of column values (as defined in the official documentation). This value ranges from $-1$ to $+1$.

The following example illustrates the relationship between index scans and index correlation.

The table *tbl_corr* consists of five columns: two text type and three integer type.

The integer columns store values from $1$ to $12$. Physically, *tbl_corr* is composed of three pages, with each page containing four tuples. Each integer column has a corresponding B-Tree index.

```
testdb=# \d tbl_corr
    Table &#34;public.tbl_corr&#34;
  Column  |  Type   | Modifiers
----------+---------+-----------
 col      | text    |
 col_asc  | integer |
 col_desc | integer |
 col_rand | integer |
 data     | text    |
Indexes:
    &#34;tbl_corr_asc_idx&#34; btree (col_asc)
    &#34;tbl_corr_desc_idx&#34; btree (col_desc)
    &#34;tbl_corr_rand_idx&#34; btree (col_rand)
```

The logical data distribution is as follows:

```
testdb=# SELECT col,col_asc,col_desc,col_rand
testdb-#                         FROM tbl_corr;
   col    | col_asc | col_desc | col_rand
----------+---------+----------+----------
 Tuple_1  |       1 |       12 |        3
 Tuple_2  |       2 |       11 |        8
 Tuple_3  |       3 |       10 |        5
 Tuple_4  |       4 |        9 |        9
 Tuple_5  |       5 |        8 |        7
 Tuple_6  |       6 |        7 |        2
 Tuple_7  |       7 |        6 |       10
 Tuple_8  |       8 |        5 |       11
 Tuple_9  |       9 |        4 |        4
 Tuple_10 |      10 |        3 |        1
 Tuple_11 |      11 |        2 |       12
 Tuple_12 |      12 |        1 |        6
(12 rows)
```

The index correlations for these columns are retrieved from the pg_stats view:

```
testdb=# SELECT tablename,attname, correlation FROM pg_stats WHERE tablename = 'tbl_corr';
 tablename | attname  | correlation
-----------+----------+-------------
 tbl_corr  | col_asc  |           1
 tbl_corr  | col_desc |          -1
 tbl_corr  | col_rand |    0.125874
(3 rows)
```

Consider a query targeting values between $2$ and $4$ in ‘col_asc’:

```
testdb=# SELECT * FROM tbl_corr WHERE col_asc BETWEEN 2 AND 4;
```

Because the physical row order matches the logical index order (correlation = $1$), all target tuples are stored on the first page. Consequently, the executor only needs to read a single page, as illustrated in Figure 3.8(a).

In contrast, consider a similar query on ‘col_rand’:

```
testdb=# SELECT * FROM tbl_corr WHERE col_rand BETWEEN 2 AND 4;
```

Due to the low correlation ($0.125874$), the target tuples are scattered across different physical locations. This requires the executor to read all pages, as shown in Figure 3.8(b).

![](/images/postgres-internals/pgsql03-fig-3-08.webp)

#### Figure 3.8. Two Examples of Index correlation.

Ultimately, index correlation is a statistical measure used during cost estimation to reflect the impact of random I/O access. It accounts for the discrepancy between the index order and the physical tuple order within the table.

### 3.2.2.3. Total Cost

Based on equations (3-5) and (3-14), the total cost is calculated as follows:

$$ \begin{align} \text{'total cost'} = 0.285 + 13.2 = 13.485 \tag{3-15} \end{align} $$

The output of the EXPLAIN command confirms these estimations:

```
1
2
3
4
5
6
```

```
testdb=# EXPLAIN SELECT id, data FROM tbl WHERE data <= 240;
                                QUERY PLAN
---------------------------------------------------------------------------
 Index Scan using tbl_data_idx on tbl  (cost=0.29..13.49 rows=240 width=8)
   Index Cond: (data <= 240)
(2 rows)
```

On line 4, the start-up and total costs are shown as $0.29$ and $13.49$, respectively (rounded from the calculated values). The planner also estimates that $240$ rows (tuples) will be scanned.

Line 5 displays the index condition **Index Cond:** $(\text{data} <= 240)$. Formally, this is an *access predicate*, which defines the start and stop conditions for the index scan.

** seq_page_cost and random_page_cost

The default values of [seq_page_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-SEQ-PAGE-COST) and [random_page_cost](https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-RANDOM-PAGE-COST) are $1.0$ and $4.0$, respectively.

These defaults imply that PostgreSQL assumes random I/O is four times slower than sequential I/O, a ratio typical for traditional Hard Disk Drives (HDDs).

However, in modern environments where Solid State Drives (SSDs) are standard, the default random_page_cost is often excessively high. If this value remains at the default while running on an SSD, the planner may favor sequential scans over index scans even when the index would be more efficient. Therefore, for SSD-based storage, it is generally recommended to reduce random_page_cost to $1.0$.

The impact of inappropriate random_page_cost settings on query performance is documented in [this blog](https://web.archive.org/web/20171123101558/https://amplitude.engineering/how-a-single-postgresql-config-change-improved-slow-query-performance-by-50x-85593b8991b0?gi=15341f11d527).

## 3.2.3. Sort

The sort path is utilized for operations such as ORDER BY, the preprocessing of merge joins, and other internal functions. Sorting costs are estimated by the cost_sort() function.

In a sorting operation, the choice of algorithm depends on the data volume. If all tuples to be sorted fit within the memory allocated by work_mem, the quicksort algorithm is used. Otherwise, a temporary file is created and an external merge sort algorithm is employed.

The start-up cost of the sort path represents the cost of the sorting process itself. This is expressed as $O(N_{\text{sort}} \times \log_2(N_{\text{sort}}))$, where $N_{\text{sort}}$ is the number of the tuples to be sorted.

The run cost represents the cost of reading the already sorted tuples, which is $O(N_{\text{sort}})$.

This subsection explores the cost estimation for the following query, assuming the operation fits within work_mem without requiring temporary files:

```
testdb=# SELECT id, data FROM tbl WHERE data <= 240 ORDER BY id;
```

In this scenario, the start-up cost is defined by the following equation:

$$ \begin{align*} \text{'start-up cost'} = C + \text{comparison_cost} \times N_{\text{sort}} \times \log_2(N_{\text{sort}}) \end{align*} $$

Where:

- $C$ is the total cost of the preceding operation (in this case, the index scan). According to equation (3-15), it is $13.485$.
- $N_{\text{sort}}$ is the number of tuples to be sorted, which is $240$.
- $\text{comparison_cost}$ is defined as $2 \times \text{cpu_operator_cost}$.

Using the default $\text{cpu_operator_cost}$ of $0.0025$, the start-up cost is calculated as follows:

$$ \begin{align*} \text{'start-up cost'} = 13.485 + (2 \times 0.0025) \times 240.0 \times \log_2(240.0) = 22.973 \end{align*} $$

The $\text{run cost}$ is the cost of reading the sorted tuples from memory:

$$ \begin{align*} \text{'run cost'} = \text{cpu_operator_cost} \times N_{\text{sort}} = 0.0025 \times 240 = 0.6 \end{align*} $$

Consequently, the $\text{total cost}$ is:

$$ \begin{align*} \text{'total cost'} = 22.973 + 0.6 = 23.573 \end{align*} $$

The EXPLAIN command output confirms these estimations:

```
1
2
3
4
5
6
7
8
```

```
testdb=# EXPLAIN SELECT id, data FROM tbl WHERE data <= 240 ORDER BY id;
                                   QUERY PLAN
---------------------------------------------------------------------------------
 Sort  (cost=22.97..23.57 rows=240 width=8)
   Sort Key: id
   ->  Index Scan using tbl_data_idx on tbl  (cost=0.29..13.49 rows=240 width=8)
         Index Cond: (data <= 240)
(4 rows)
```

On line 4, the start-up cost and total cost are shown as $22.97$ and $23.57$, respectively.

## 3.2.4. Cardinality Estimation

Previous discussions assumed that Selectivity could be determined with absolute accuracy. In reality, however, selectivity estimation has been one of the most persistent and challenging problems in database systems since their inception.

### 3.2.4.1. Selectivity vs. Cardinality

While PostgreSQL internally utilizes Selectivity, the broader database field generally focuses on **Cardinality**. Cardinality is represented as an integer, and the relationship between Selectivity and Cardinality is defined as:

$$ \text{Selectivity} = \frac{\text{Cardinality}}{N_{\text{tuple}}} $$

Where $N_{\text{tuple}}$ is the total number of tuples (rows) in the table. Going forward, the term Cardinality will be used primarily.

### 3.2.4.2. Demonstrating the Difficulty of Cardinality Estimation

A concrete example illustrates the difficulty of Cardinality Estimation.

Consider a database representing **100 villagers**. The `residents` table records an *age* category (under18, young, middle, elder) and a driver’s *license* status (none, standard, gold). (Here, “gold license” is a term used in Japan for a license issued to drivers who have been accident- and violation-free for five years.)

#### **Database Setup**

The table structure is defined as follows:

```sql
testdb=# CREATE TYPE license AS ENUM ('none', 'standard', 'gold');
CREATE TYPE
testdb=# CREATE TYPE age AS ENUM ('under18', 'young', 'middle', 'elder');
CREATE TYPE

testdb=# CREATE TABLE residents (id int, name text, license license, age age);
CREATE TABLE

testdb=# \d residents
Table &#34;public.residents&#34;
 Column  |  Type   | Collation | Nullable | Default
---------+---------+-----------+----------+---------
 id      | integer |           |          |
 name    | text    |           |          |
 license | license |           |          |
 age     | age     |           |          |
```

The `residents.csv` is here:

** ** residents.csv

```bash
$ cat residents.csv
0,,none,under18
1,,none,under18
2,,none,under18
3,,none,under18
4,,none,under18
5,,none,under18
6,,none,under18
7,,none,under18
8,,none,under18
9,,none,under18
10,,none,under18
11,,none,under18
12,,none,under18
13,,none,under18
14,,none,under18
15,,none,under18
16,,none,under18
17,,none,under18
18,,none,under18
19,,none,under18
20,,none,young
21,,none,young
22,,none,young
23,,none,young
24,,none,young
25,,none,young
26,,none,young
27,,standard,young
28,,standard,young
29,,standard,young
30,,standard,young
31,,standard,young
32,,standard,young
33,,standard,young
34,,standard,young
35,,standard,young
36,,standard,young
37,,standard,young
38,,standard,young
39,,standard,young
40,,standard,young
41,,standard,young
42,,standard,young
43,,gold,young
44,,gold,young
45,,none,middle
46,,none,middle
47,,none,middle
48,,none,middle
49,,none,middle
50,,none,middle
51,,none,middle
52,,none,middle
53,,standard,middle
54,,standard,middle
55,,standard,middle
56,,standard,middle
57,,standard,middle
58,,standard,middle
59,,standard,middle
60,,standard,middle
61,,standard,middle
62,,standard,middle
63,,standard,middle
64,,standard,middle
65,,standard,middle
66,,standard,middle
67,,standard,middle
68,,standard,middle
69,,standard,middle
70,,standard,middle
71,,standard,middle
72,,standard,middle
73,,standard,middle
74,,standard,middle
75,,standard,middle
76,,standard,middle
77,,standard,middle
78,,gold,middle
79,,gold,middle
80,,none,elder
81,,none,elder
82,,none,elder
83,,none,elder
84,,none,elder
85,,standard,elder
86,,standard,elder
87,,standard,elder
88,,standard,elder
89,,standard,elder
90,,standard,elder
91,,standard,elder
92,,standard,elder
93,,standard,elder
94,,standard,elder
95,,standard,elder
96,,standard,elder
97,,standard,elder
98,,standard,elder
99,,gold,elder
```

```
testdb=# COPY residents FROM '/usr/local/pgsql/residents.csv' (FORMAT csv);
COPY 100
testdb=# ANALYZE;
ANALYZE
```

#### **Frequency Distribution**

The **Most Common Values (MCVs)** and their frequencies for the age and license columns are retrieved from pg_stats:

Age Category Distribution:

```
testdb=# SELECT most_common_vals, most_common_freqs FROM pg_stats WHERE tablename = 'residents' AND attname='age';
       most_common_vals       |  most_common_freqs
------------------------------+---------------------
 {middle,young,under18,elder} | {0.35,0.25,0.2,0.2}
(1 row)
```

| Age Category | Frequency | Corresponding Residents (100 total) |
| --- | --- | --- |
| **under18** | 0.2 | 20 people |
| **young** | 0.25 | 25 people |
| **middle** | 0.35 | 35 people |
| **elder** | 0.2 | 20 people |

License Status Distribution:

```
testdb=# SELECT most_common_vals, most_common_freqs FROM pg_stats WHERE tablename = 'residents' AND attname='license';
   most_common_vals   | most_common_freqs
----------------------+-------------------
 {standard,none,gold} | {0.55,0.4,0.05}
(1 row)
```

| License Status | Frequency | Corresponding Residents (100 total) |
| --- | --- | --- |
| **none** | 0.4 | 40 people |
| **standard** | 0.55 | 55 people |
| **gold** | 0.05 | 5 people |

#### **Initial Estimation Failure (Without Correlation Awareness)**

A SELECT statement is executed to retrieve residents who are under18 and have no license (none). EXPLAIN ANALYZE compares the planner’s estimated value with the actual execution result:

```
testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'none';
                                      QUERY PLAN
--------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=8 width=18) (actual rows=20.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'none'::license))
   Rows Removed by Filter: 80
 Planning Time: 0.183 ms
 Execution Time: 0.048 ms
(8 rows)
```

The estimated cardinality is $8$, while the actual row count is $20$.

This actual value reflects the real-world constraint that individuals under 18 cannot obtain a driver’s license (e.g., under this village’s law or Japanese law). Consequently, the entire under-18 group necessarily belongs to the “none” license category, resulting in exactly $20$ matching rows.

#### **The Root Cause: Assuming Independence**

The PostgreSQL planner calculates the estimate of $8$ by multiplying the proportion of under18 ($0.2$) by that of none ($0.4$), assuming the columns are independent: $(0.2 \times 0.4) \times 100 = 0.08 \times 100 = 8$.

Most RDBMS planners calculate Cardinality by assuming that columns are mutually independent unless specified otherwise. This ignores potential correlations between data. Consequently, as the correlation between columns strengthens, the accuracy of the planner’s estimation degrades. Cardinality Estimation remains an active area of research.

### 3.2.4.3. A Partial Solution: Extended Statistics

To address this, PostgreSQL introduced support for extended statistics in version 13. By using the [CREATE STATISTICS](https://www.postgresql.org/docs/current/sql-createstatistics.html) statement, the correlation between the age and license columns can be captured in a new statistics object.

```sql
testdb=# CREATE STATISTICS stat_residents (mcv) ON license, age FROM residents;
CREATE STATISTICS
testdb=# ANALYZE;
ANALYZE
```

After analyzing the extended statistics, the estimation results for the under18 age group align more closely with reality:

age = ‘under18’ AND license = ’none’

```
testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'none';
                                      QUERY PLAN
-------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=20 width=18) (actual rows=20.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'none'::license))
   Rows Removed by Filter: 80
 Planning Time: 0.515 ms
 Execution Time: 0.049 ms
(8 rows)
```

age = ‘under18’ AND license = ‘standard’

```
testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'standard';
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=1 width=18) (actual rows=0.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'standard'::license))
   Rows Removed by Filter: 100
 Planning Time: 0.538 ms
 Execution Time: 0.073 ms
(6 rows)
```

age = ‘under18’ AND license = ‘gold’

```
testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'gold';
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=1 width=18) (actual rows=0.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'gold'::license))
   Rows Removed by Filter: 100
 Planning Time: 0.112 ms
 Execution Time: 0.053 ms
(6 rows)
```

“None” license holders within the under18 group are estimated at $20$, which is an accurate number.

The estimated value of $1$ for “standard” and “gold” license holders within the under18 group is likely a result of rounding or smoothing logic, but it represents a significant improvement over the independent assumption.

** Limitation of Extended Statistics

PostgreSQL Extended Statistics can only be configured for columns within a **single table**. This feature cannot be applied to joins involving multiple tables.

Consequently, Cardinality Estimation for JOIN operations remains a significant challenge. While extensive research continues, a practical, universally applicable solution for cross-table cardinality estimation has yet to be realized.

# 3.3. Creating the Plan Tree of a Single-Table Query

Because planner processing is highly complex, this section outlines the most fundamental case: the creation of a plan tree for a single-table query. The more complex process of creating plan trees for multi-table queries is covered in Section 3.6.

The PostgreSQL planner performs the following three steps:

1. **Preprocessing:** Performs initial transformations and simplifications on the query.
2. **Path Creation and Cost Estimation:** Estimates the costs of all possible access paths to identify the cheapest option.
3. **Plan Tree Creation:** Creates the final plan tree based on the identified cheapest path.

An **access path** is a processing unit used exclusively during the cost estimation phase. For example, sequential scans, index scans, sorting, and various join operations each have corresponding paths. These paths exist only within the planner to facilitate the selection of an optimal plan; they are not used during the actual execution.

The most fundamental data structure for access paths is the `Path` structure, defined in [pathnodes.h](https://github.com/postgres/postgres/blob/master/src/include/nodes/pathnodes.h), which corresponds to a sequential scan. All other access paths are extensions or variations of this base structure.

** ** Path

```
typedef struct PathKey
{
	pg_node_attr(no_read, no_query_jumble)

	NodeTag		type;

	/* the value that is ordered */
	EquivalenceClass *pk_eclass pg_node_attr(copy_as_scalar, equal_as_scalar);
	Oid			pk_opfamily;	/* index opfamily defining the ordering */
	CompareType pk_cmptype;		/* sort direction (ASC or DESC) */
	bool		pk_nulls_first; /* do NULLs come before normal values? */
} PathKey;

typedef struct Path
{
	pg_node_attr(no_copy_equal, no_read, no_query_jumble)

	NodeTag		type;

	/* tag identifying scan/join method */
	NodeTag		pathtype;

	/*
	 * the relation this path can build
	 *
	 * We do NOT print the parent, else we'd be in infinite recursion.  We can
	 * print the parent's relids for identification purposes, though.
	 */
	RelOptInfo *parent pg_node_attr(write_only_relids);

	/*
	 * list of Vars/Exprs, cost, width
	 *
	 * We print the pathtarget only if it's not the default one for the rel.
	 */
	PathTarget *pathtarget pg_node_attr(write_only_nondefault_pathtarget);

	/*
	 * parameterization info, or NULL if none
	 *
	 * We do not print the whole of param_info, since it's printed via
	 * RelOptInfo; it's sufficient and less cluttering to print just the
	 * required outer relids.
	 */
	ParamPathInfo *param_info pg_node_attr(write_only_req_outer);

	/* engage parallel-aware logic? */
	bool		parallel_aware;
	/* OK to use as part of parallel plan? */
	bool		parallel_safe;
	/* desired # of workers; 0 = not parallel */
	int			parallel_workers;

	/* estimated size/costs for path (see costsize.c for more info) */
	Cardinality rows;			/* estimated number of result tuples */
	int			disabled_nodes; /* count of disabled nodes */
	Cost		startup_cost;	/* cost expended before fetching any tuples */
	Cost		total_cost;		/* total cost (assuming all tuples fetched) */

	/* sort ordering of path's output; a List of PathKey nodes; see above */
	List	   *pathkeys;
} Path;
```

To manage these steps, the planner internally maintains a `PlannerInfo` structure, which holds the query tree, metadata regarding the relations involved, and the candidate access paths.

** ** PlannerInfo

```javascript
/*----------
 * PlannerInfo
 *		Per-query information for planning/optimization
 *
 * This struct is conventionally called &#34;root&#34; in all the planner routines.
 * It holds links to all of the planner's working state, in addition to the
 * original Query.  Note that at present the planner extensively modifies
 * the passed-in Query data structure; someday that should stop.
 *
 * For reasons explained in optimizer/optimizer.h, we define the typedef
 * either here or in that header, whichever is read first.
 *
 * Not all fields are printed.  (In some cases, there is no print support for
 * the field type; in others, doing so would lead to infinite recursion or
 * bloat dump output more than seems useful.)
 *
 * NOTE: When adding new entries containing relids and relid bitmapsets,
 * remember to check that they will be correctly processed by
 * the remove_self_join_rel function - relid of removing relation will be
 * correctly replaced with the keeping one.
 *----------
 */
#ifndef HAVE_PLANNERINFO_TYPEDEF
typedef struct PlannerInfo PlannerInfo;
#define HAVE_PLANNERINFO_TYPEDEF 1
#endif

struct PlannerInfo
{
	pg_node_attr(no_copy_equal, no_read, no_query_jumble)

	NodeTag		type;

	/* the Query being planned */
	Query	   *parse;

	/* global info for current planner run */
	PlannerGlobal *glob;

	/* 1 at the outermost Query */
	Index		query_level;

	/* NULL at outermost Query */
	PlannerInfo *parent_root pg_node_attr(read_write_ignore);

	/*
	 * plan_params contains the expressions that this query level needs to
	 * make available to a lower query level that is currently being planned.
	 * outer_params contains the paramIds of PARAM_EXEC Params that outer
	 * query levels will make available to this query level.
	 */
	/* list of PlannerParamItems, see below */
	List	   *plan_params;
	Bitmapset  *outer_params;

	/*
	 * simple_rel_array holds pointers to &#34;base rels&#34; and &#34;other rels&#34; (see
	 * comments for RelOptInfo for more info).  It is indexed by rangetable
	 * index (so entry 0 is always wasted).  Entries can be NULL when an RTE
	 * does not correspond to a base relation, such as a join RTE or an
	 * unreferenced view RTE; or if the RelOptInfo hasn't been made yet.
	 */
	struct RelOptInfo **simple_rel_array pg_node_attr(array_size(simple_rel_array_size));
	/* allocated size of array */
	int			simple_rel_array_size;

	/*
	 * simple_rte_array is the same length as simple_rel_array and holds
	 * pointers to the associated rangetable entries.  Using this is a shade
	 * faster than using rt_fetch(), mostly due to fewer indirections.  (Not
	 * printed because it'd be redundant with parse->rtable.)
	 */
	RangeTblEntry **simple_rte_array pg_node_attr(read_write_ignore);

	/*
	 * append_rel_array is the same length as the above arrays, and holds
	 * pointers to the corresponding AppendRelInfo entry indexed by
	 * child_relid, or NULL if the rel is not an appendrel child.  The array
	 * itself is not allocated if append_rel_list is empty.  (Not printed
	 * because it'd be redundant with append_rel_list.)
	 */
	struct AppendRelInfo **append_rel_array pg_node_attr(read_write_ignore);

	/*
	 * all_baserels is a Relids set of all base relids (but not joins or
	 * &#34;other&#34; rels) in the query.  This is computed in deconstruct_jointree.
	 */
	Relids		all_baserels;

	/*
	 * outer_join_rels is a Relids set of all outer-join relids in the query.
	 * This is computed in deconstruct_jointree.
	 */
	Relids		outer_join_rels;

	/*
	 * all_query_rels is a Relids set of all base relids and outer join relids
	 * (but not &#34;other&#34; relids) in the query.  This is the Relids identifier
	 * of the final join we need to form.  This is computed in
	 * deconstruct_jointree.
	 */
	Relids		all_query_rels;

	/*
	 * join_rel_list is a list of all join-relation RelOptInfos we have
	 * considered in this planning run.  For small problems we just scan the
	 * list to do lookups, but when there are many join relations we build a
	 * hash table for faster lookups.  The hash table is present and valid
	 * when join_rel_hash is not NULL.  Note that we still maintain the list
	 * even when using the hash table for lookups; this simplifies life for
	 * GEQO.
	 */
	List	   *join_rel_list;
	struct HTAB *join_rel_hash pg_node_attr(read_write_ignore);

	/*
	 * When doing a dynamic-programming-style join search, join_rel_level[k]
	 * is a list of all join-relation RelOptInfos of level k, and
	 * join_cur_level is the current level.  New join-relation RelOptInfos are
	 * automatically added to the join_rel_level[join_cur_level] list.
	 * join_rel_level is NULL if not in use.
	 *
	 * Note: we've already printed all baserel and joinrel RelOptInfos above,
	 * so we don't dump join_rel_level or other lists of RelOptInfos.
	 */
	/* lists of join-relation RelOptInfos */
	List	  **join_rel_level pg_node_attr(read_write_ignore);
	/* index of list being extended */
	int			join_cur_level;

	/* init SubPlans for query */
	List	   *init_plans;

	/*
	 * per-CTE-item list of subplan IDs (or -1 if no subplan was made for that
	 * CTE)
	 */
	List	   *cte_plan_ids;

	/* List of Lists of Params for MULTIEXPR subquery outputs */
	List	   *multiexpr_params;

	/* list of JoinDomains used in the query (higher ones first) */
	List	   *join_domains;

	/* list of active EquivalenceClasses */
	List	   *eq_classes;

	/* set true once ECs are canonical */
	bool		ec_merging_done;

	/* list of &#34;canonical&#34; PathKeys */
	List	   *canon_pathkeys;

	/*
	 * list of OuterJoinClauseInfos for mergejoinable outer join clauses
	 * w/nonnullable var on left
	 */
	List	   *left_join_clauses;

	/*
	 * list of OuterJoinClauseInfos for mergejoinable outer join clauses
	 * w/nonnullable var on right
	 */
	List	   *right_join_clauses;

	/*
	 * list of OuterJoinClauseInfos for mergejoinable full join clauses
	 */
	List	   *full_join_clauses;

	/* list of SpecialJoinInfos */
	List	   *join_info_list;

	/* counter for assigning RestrictInfo serial numbers */
	int			last_rinfo_serial;

	/*
	 * all_result_relids is empty for SELECT, otherwise it contains at least
	 * parse->resultRelation.  For UPDATE/DELETE/MERGE across an inheritance
	 * or partitioning tree, the result rel's child relids are added.  When
	 * using multi-level partitioning, intermediate partitioned rels are
	 * included. leaf_result_relids is similar except that only actual result
	 * tables, not partitioned tables, are included in it.
	 */
	/* set of all result relids */
	Relids		all_result_relids;
	/* set of all leaf relids */
	Relids		leaf_result_relids;

	/*
	 * list of AppendRelInfos
	 *
	 * Note: for AppendRelInfos describing partitions of a partitioned table,
	 * we guarantee that partitions that come earlier in the partitioned
	 * table's PartitionDesc will appear earlier in append_rel_list.
	 */
	List	   *append_rel_list;

	/* list of RowIdentityVarInfos */
	List	   *row_identity_vars;

	/* list of PlanRowMarks */
	List	   *rowMarks;

	/* list of PlaceHolderInfos */
	List	   *placeholder_list;

	/* array of PlaceHolderInfos indexed by phid */
	struct PlaceHolderInfo **placeholder_array pg_node_attr(read_write_ignore, array_size(placeholder_array_size));
	/* allocated size of array */
	int			placeholder_array_size pg_node_attr(read_write_ignore);

	/* list of ForeignKeyOptInfos */
	List	   *fkey_list;

	/* desired pathkeys for query_planner() */
	List	   *query_pathkeys;

	/* groupClause pathkeys, if any */
	List	   *group_pathkeys;

	/*
	 * The number of elements in the group_pathkeys list which belong to the
	 * GROUP BY clause.  Additional ones belong to ORDER BY / DISTINCT
	 * aggregates.
	 */
	int			num_groupby_pathkeys;

	/* pathkeys of bottom window, if any */
	List	   *window_pathkeys;
	/* distinctClause pathkeys, if any */
	List	   *distinct_pathkeys;
	/* sortClause pathkeys, if any */
	List	   *sort_pathkeys;
	/* set operator pathkeys, if any */
	List	   *setop_pathkeys;

	/* Canonicalised partition schemes used in the query. */
	List	   *part_schemes pg_node_attr(read_write_ignore);

	/* RelOptInfos we are now trying to join */
	List	   *initial_rels pg_node_attr(read_write_ignore);

	/*
	 * Upper-rel RelOptInfos. Use fetch_upper_rel() to get any particular
	 * upper rel.
	 */
	List	   *upper_rels[UPPERREL_FINAL + 1] pg_node_attr(read_write_ignore);

	/* Result tlists chosen by grouping_planner for upper-stage processing */
	struct PathTarget *upper_targets[UPPERREL_FINAL + 1] pg_node_attr(read_write_ignore);

	/*
	 * The fully-processed groupClause is kept here.  It differs from
	 * parse->groupClause in that we remove any items that we can prove
	 * redundant, so that only the columns named here actually need to be
	 * compared to determine grouping.  Note that it's possible for *all* the
	 * items to be proven redundant, implying that there is only one group
	 * containing all the query's rows.  Hence, if you want to check whether
	 * GROUP BY was specified, test for nonempty parse->groupClause, not for
	 * nonempty processed_groupClause.  Optimizer chooses specific order of
	 * group-by clauses during the upper paths generation process, attempting
	 * to use different strategies to minimize number of sorts or engage
	 * incremental sort.  See preprocess_groupclause() and
	 * get_useful_group_keys_orderings() for details.
	 *
	 * Currently, when grouping sets are specified we do not attempt to
	 * optimize the groupClause, so that processed_groupClause will be
	 * identical to parse->groupClause.
	 */
	List	   *processed_groupClause;

	/*
	 * The fully-processed distinctClause is kept here.  It differs from
	 * parse->distinctClause in that we remove any items that we can prove
	 * redundant, so that only the columns named here actually need to be
	 * compared to determine uniqueness.  Note that it's possible for *all*
	 * the items to be proven redundant, implying that there should be only
	 * one output row.  Hence, if you want to check whether DISTINCT was
	 * specified, test for nonempty parse->distinctClause, not for nonempty
	 * processed_distinctClause.
	 */
	List	   *processed_distinctClause;

	/*
	 * The fully-processed targetlist is kept here.  It differs from
	 * parse->targetList in that (for INSERT) it's been reordered to match the
	 * target table, and defaults have been filled in.  Also, additional
	 * resjunk targets may be present.  preprocess_targetlist() does most of
	 * that work, but note that more resjunk targets can get added during
	 * appendrel expansion.  (Hence, upper_targets mustn't get set up till
	 * after that.)
	 */
	List	   *processed_tlist;

	/*
	 * For UPDATE, this list contains the target table's attribute numbers to
	 * which the first N entries of processed_tlist are to be assigned.  (Any
	 * additional entries in processed_tlist must be resjunk.)  DO NOT use the
	 * resnos in processed_tlist to identify the UPDATE target columns.
	 */
	List	   *update_colnos;

	/*
	 * Fields filled during create_plan() for use in setrefs.c
	 */
	/* for GroupingFunc fixup (can't print: array length not known here) */
	AttrNumber *grouping_map pg_node_attr(read_write_ignore);
	/* List of MinMaxAggInfos */
	List	   *minmax_aggs;

	/* context holding PlannerInfo */
	MemoryContext planner_cxt pg_node_attr(read_write_ignore);

	/* # of pages in all non-dummy tables of query */
	Cardinality total_table_pages;

	/* tuple_fraction passed to query_planner */
	Selectivity tuple_fraction;
	/* limit_tuples passed to query_planner */
	Cardinality limit_tuples;

	/*
	 * Minimum security_level for quals. Note: qual_security_level is zero if
	 * there are no securityQuals.
	 */
	Index		qual_security_level;

	/* true if any RTEs are RTE_JOIN kind */
	bool		hasJoinRTEs;
	/* true if any RTEs are marked LATERAL */
	bool		hasLateralRTEs;
	/* true if havingQual was non-null */
	bool		hasHavingQual;
	/* true if any RestrictInfo has pseudoconstant = true */
	bool		hasPseudoConstantQuals;
	/* true if we've made any of those */
	bool		hasAlternativeSubPlans;
	/* true once we're no longer allowed to add PlaceHolderInfos */
	bool		placeholdersFrozen;
	/* true if planning a recursive WITH item */
	bool		hasRecursion;

	/*
	 * The rangetable index for the RTE_GROUP RTE, or 0 if there is no
	 * RTE_GROUP RTE.
	 */
	int			group_rtindex;

	/*
	 * Information about aggregates. Filled by preprocess_aggrefs().
	 */
	/* AggInfo structs */
	List	   *agginfos;
	/* AggTransInfo structs */
	List	   *aggtransinfos;
	/* number of aggs with DISTINCT/ORDER BY/WITHIN GROUP */
	int			numOrderedAggs;
	/* does any agg not support partial mode? */
	bool		hasNonPartialAggs;
	/* is any partial agg non-serializable? */
	bool		hasNonSerialAggs;

	/*
	 * These fields are used only when hasRecursion is true:
	 */
	/* PARAM_EXEC ID for the work table */
	int			wt_param_id;
	/* a path for non-recursive term */
	struct Path *non_recursive_path;

	/*
	 * These fields are workspace for createplan.c
	 */
	/* outer rels above current node */
	Relids		curOuterRels;
	/* not-yet-assigned NestLoopParams */
	List	   *curOuterParams;

	/*
	 * These fields are workspace for setrefs.c.  Each is an array
	 * corresponding to glob->subplans.  (We could probably teach
	 * gen_node_support.pl how to determine the array length, but it doesn't
	 * seem worth the trouble, so just mark them read_write_ignore.)
	 */
	bool	   *isAltSubplan pg_node_attr(read_write_ignore);
	bool	   *isUsedSubplan pg_node_attr(read_write_ignore);

	/* optional private data for join_search_hook, e.g., GEQO */
	void	   *join_search_private pg_node_attr(read_write_ignore);

	/* Does this query modify any partition key columns? */
	bool		partColsUpdated;

	/* PartitionPruneInfos added in this query's plan. */
	List	   *partPruneInfos;
};
```

The following examples illustrate the transformation of query trees into plan trees.

Section Contents

- 3.3.1. Preprocessing
- 3.3.2. Determining the Cheapest Access Path
- 3.3.3. Creating a Plan Tree

## 3.3.1. Preprocessing

Before creating a plan tree, the planner performs preprocessing on the query tree stored in the `PlannerInfo` structure.

While preprocessing involves numerous operations, this subsection focuses on the primary steps relevant to single-table queries. Additional preprocessing operations, such as those related to joins and subqueries, are detailed in Section 3.6.

The core preprocessing steps include:

1. **Simplifying Target Lists and Clauses:** The planner simplifies target lists, LIMIT clauses, and other expressions. For example, the eval_const_expressions() function, defined in [clauses.c](https://github.com/postgres/postgres/blob/master/src/backend/optimizer/util/clauses.c), performs constant folding by rewriting expressions such as “(1 + 2)” into “3”.
2. **Normalizing Boolean Expressions:** Boolean logic is simplified for efficiency; for instance, the double negation “NOT(NOT a)” is rewritten as “a”.
3. **Flattening AND/OR Expressions:** While the SQL standard defines AND and OR as binary operators, PostgreSQL treats them internally as n-ary operators. The planner assumes that all nested AND and OR expressions should be flattened to reduce tree depth and improve evaluation speed.

As a specific example, consider the Boolean expression “(id = 1) OR (id = 2) OR (id = 3)”. Figure 3.9(a) illustrates the initial structure of the query tree using binary operators. The planner simplifies this tree by flattening it into a single ternary operator, as shown in Figure 3.9(b).

![](/images/postgres-internals/pgsql03-fig-3-09.webp)

#### Figure 3.9. An example of flattening AND/OR expressions.

## 3.3.2. Determining the Cheapest Access Path

To determine the cheapest access path, the planner estimates the costs of all possible access paths and selects the one with the lowest cost. Specifically, the planner performs the following operations:

1. **Create a RelOptInfo structure:** The `RelOptInfo` structure is created by the make_one_rel() function and stored in the *simple_rel_array* of the `PlannerInfo` structure (see Figure 3.10). In its initial state, RelOptInfo holds the *baserestrictinfo* &mdash; which contains the WHERE clauses of the query &mdash; and the *indexlist*, which stores metadata for any indexes associated with the target table.

** ** RelOptInfo

```python
typedef enum RelOptKind
{
	RELOPT_BASEREL,
	RELOPT_JOINREL,
	RELOPT_OTHER_MEMBER_REL,
	RELOPT_OTHER_JOINREL,
	RELOPT_UPPER_REL,
	RELOPT_OTHER_UPPER_REL
} RelOptKind;

/*
 * Is the given relation a simple relation i.e a base or &#34;other&#34; member
 * relation?
 */
#define IS_SIMPLE_REL(rel) \
	((rel)->reloptkind == RELOPT_BASEREL || \
	 (rel)->reloptkind == RELOPT_OTHER_MEMBER_REL)

/* Is the given relation a join relation? */
#define IS_JOIN_REL(rel)	\
	((rel)->reloptkind == RELOPT_JOINREL || \
	 (rel)->reloptkind == RELOPT_OTHER_JOINREL)

/* Is the given relation an upper relation? */
#define IS_UPPER_REL(rel)	\
	((rel)->reloptkind == RELOPT_UPPER_REL || \
	 (rel)->reloptkind == RELOPT_OTHER_UPPER_REL)

/* Is the given relation an &#34;other&#34; relation? */
#define IS_OTHER_REL(rel) \
	((rel)->reloptkind == RELOPT_OTHER_MEMBER_REL || \
	 (rel)->reloptkind == RELOPT_OTHER_JOINREL || \
	 (rel)->reloptkind == RELOPT_OTHER_UPPER_REL)

typedef struct RelOptInfo
{
	pg_node_attr(no_copy_equal, no_read, no_query_jumble)

	NodeTag		type;

	RelOptKind	reloptkind;

	/*
	 * all relations included in this RelOptInfo; set of base + OJ relids
	 * (rangetable indexes)
	 */
	Relids		relids;

	/*
	 * size estimates generated by planner
	 */
	/* estimated number of result tuples */
	Cardinality rows;

	/*
	 * per-relation planner control flags
	 */
	/* keep cheap-startup-cost paths? */
	bool		consider_startup;
	/* ditto, for parameterized paths? */
	bool		consider_param_startup;
	/* consider parallel paths? */
	bool		consider_parallel;

	/*
	 * default result targetlist for Paths scanning this relation; list of
	 * Vars/Exprs, cost, width
	 */
	struct PathTarget *reltarget;

	/*
	 * materialization information
	 */
	List	   *pathlist;		/* Path structures */
	List	   *ppilist;		/* ParamPathInfos used in pathlist */
	List	   *partial_pathlist;	/* partial Paths */
	struct Path *cheapest_startup_path;
	struct Path *cheapest_total_path;
	struct Path *cheapest_unique_path;
	List	   *cheapest_parameterized_paths;

	/*
	 * parameterization information needed for both base rels and join rels
	 * (see also lateral_vars and lateral_referencers)
	 */
	/* rels directly laterally referenced */
	Relids		direct_lateral_relids;
	/* minimum parameterization of rel */
	Relids		lateral_relids;

	/*
	 * information about a base rel (not set for join rels!)
	 */
	Index		relid;
	/* containing tablespace */
	Oid			reltablespace;
	/* RELATION, SUBQUERY, FUNCTION, etc */
	RTEKind		rtekind;
	/* smallest attrno of rel (often <0) */
	AttrNumber	min_attr;
	/* largest attrno of rel */
	AttrNumber	max_attr;
	/* array indexed [min_attr .. max_attr] */
	Relids	   *attr_needed pg_node_attr(read_write_ignore);
	/* array indexed [min_attr .. max_attr] */
	int32	   *attr_widths pg_node_attr(read_write_ignore);

	/*
	 * Zero-based set containing attnums of NOT NULL columns.  Not populated
	 * for rels corresponding to non-partitioned inh==true RTEs.
	 */
	Bitmapset  *notnullattnums;
	/* relids of outer joins that can null this baserel */
	Relids		nulling_relids;
	/* LATERAL Vars and PHVs referenced by rel */
	List	   *lateral_vars;
	/* rels that reference this baserel laterally */
	Relids		lateral_referencers;
	/* list of IndexOptInfo */
	List	   *indexlist;
	/* list of StatisticExtInfo */
	List	   *statlist;
	/* size estimates derived from pg_class */
	BlockNumber pages;
	Cardinality tuples;
	double		allvisfrac;
	/* indexes in PlannerInfo's eq_classes list of ECs that mention this rel */
	Bitmapset  *eclass_indexes;
	PlannerInfo *subroot;		/* if subquery */
	List	   *subplan_params; /* if subquery */
	/* wanted number of parallel workers */
	int			rel_parallel_workers;
	/* Bitmask of optional features supported by the table AM */
	uint32		amflags;

	/*
	 * Information about foreign tables and foreign joins
	 */
	/* identifies server for the table or join */
	Oid			serverid;
	/* identifies user to check access as; 0 means to check as current user */
	Oid			userid;
	/* join is only valid for current user */
	bool		useridiscurrent;
	/* use &#34;struct FdwRoutine&#34; to avoid including fdwapi.h here */
	struct FdwRoutine *fdwroutine pg_node_attr(read_write_ignore);
	void	   *fdw_private pg_node_attr(read_write_ignore);

	/*
	 * cache space for remembering if we have proven this relation unique
	 */
	/* known unique for these other relid set(s) given in UniqueRelInfo(s) */
	List	   *unique_for_rels;
	/* known not unique for these set(s) */
	List	   *non_unique_for_rels;

	/*
	 * used by various scans and joins:
	 */
	/* RestrictInfo structures (if base rel) */
	List	   *baserestrictinfo;
	/* cost of evaluating the above */
	QualCost	baserestrictcost;
	/* min security_level found in baserestrictinfo */
	Index		baserestrict_min_security;
	/* RestrictInfo structures for join clauses involving this rel */
	List	   *joininfo;
	/* T means joininfo is incomplete */
	bool		has_eclass_joins;

	/*
	 * used by partitionwise joins:
	 */
	/* consider partitionwise join paths? (if partitioned rel) */
	bool		consider_partitionwise_join;

	/*
	 * inheritance links, if this is an otherrel (otherwise NULL):
	 */
	/* Immediate parent relation (dumping it would be too verbose) */
	struct RelOptInfo *parent pg_node_attr(read_write_ignore);
	/* Topmost parent relation (dumping it would be too verbose) */
	struct RelOptInfo *top_parent pg_node_attr(read_write_ignore);
	/* Relids of topmost parent (redundant, but handy) */
	Relids		top_parent_relids;

	/*
	 * used for partitioned relations:
	 */
	/* Partitioning scheme */
	PartitionScheme part_scheme pg_node_attr(read_write_ignore);

	/*
	 * Number of partitions; -1 if not yet set; in case of a join relation 0
	 * means it's considered unpartitioned
	 */
	int			nparts;
	/* Partition bounds */
	struct PartitionBoundInfoData *boundinfo pg_node_attr(read_write_ignore);
	/* True if partition bounds were created by partition_bounds_merge() */
	bool		partbounds_merged;
	/* Partition constraint, if not the root */
	List	   *partition_qual;

	/*
	 * Array of RelOptInfos of partitions, stored in the same order as bounds
	 * (don't print, too bulky and duplicative)
	 */
	struct RelOptInfo **part_rels pg_node_attr(read_write_ignore);

	/*
	 * Bitmap with members acting as indexes into the part_rels[] array to
	 * indicate which partitions survived partition pruning.
	 */
	Bitmapset  *live_parts;
	/* Relids set of all partition relids */
	Relids		all_partrels;

	/*
	 * These arrays are of length partkey->partnatts, which we don't have at
	 * hand, so don't try to print
	 */

	/* Non-nullable partition key expressions */
	List	  **partexprs pg_node_attr(read_write_ignore);
	/* Nullable partition key expressions */
	List	  **nullable_partexprs pg_node_attr(read_write_ignore);
} RelOptInfo;
```

1. **Estimate costs and add the access paths:** The planner evaluates all potential access methods through the following sub-steps: **Sequential Scan:** A path is created for a sequential scan, its cost is estimated, and the path is added to the pathlist of the RelOptInfo structure.
2. **Index Scan:** If relevant indexes exist, index access paths are created. The planner estimates the costs for these index scans and adds the resulting paths to the pathlist.
3. **Bitmap Scan:** If a bitmap scan is feasible, corresponding paths are created. Their costs are estimated and added to the pathlist.

**Select the cheapest path:** The planner compares all entries in the pathlist of the RelOptInfo structure and selects the one with the cheapest total cost.

**Estimate auxiliary costs:** If the query includes LIMIT, ORDER BY, or AGGREGATE functions, the planner estimates the additional costs associated with these operations and updates the plan accordingly.

The following two examples illustrate this process in detail.

### 3.3.2.1. Example 1

This example explores a simple single-table query without indexes. The query contains both WHERE and ORDER BY clauses:

```
testdb=# \d tbl_1
     Table &#34;public.tbl_1&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# SELECT * FROM tbl_1 WHERE id < 300 ORDER BY data;
```

Figures 3.10 and 3.11 illustrate the planner’s operations for this query.

![](/images/postgres-internals/pgsql03-fig-3-10.webp)

#### Figure 3.10. How to identify the cheapest path of Example 1

- (1) **Create the RelOptInfo structure:** The planner creates a RelOptInfo structure and stores it in the simple_rel_array of the PlannerInfo.
- (2) **Add the WHERE clause to baserestrictinfo:** The clause “id < 300” is added to the baserestrictinfo by the distribute_restrictinfo_to_rels() function (defined in [initsplan.c](https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/initsplan.c)). Since the target table has no indexes, the indexlist of the RelOptInfo remains NULL.
- (3) **Add the pathkey for sorting to sort_pathkeys:** The standard_qp_callback() function (defined in [planner.c](https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/planner.c)) adds the relevant pathkeys to the sort_pathkeys of the PlannerInfo. A pathkey is a data structure representing the sort order for a path. In this example, the column ‘data’ is added as a pathkey because of the ORDER BY clause.
- (4) **Estimate the Sequential Scan cost:** The planner creates a `Path` structure and estimates the sequential scan cost using the cost_seqscan() function. These estimated costs are written into the path, which is then added to the RelOptInfo by the add_path() function (defined in [pathnode.c](https://github.com/postgres/postgres/blob/master/src/backend/optimizer/util/pathnode.c)).

Because no indexes exist, the sequential scan is the only available access method, making it the automatically determined cheapest access path for the base relation.

![](/images/postgres-internals/pgsql03-fig-3-11.webp)

#### Figure 3.11. How to identify the cheapest path of Example 1. (continued from Figure 3.10)

- (5) **Create a new RelOptInfo for sorting:** A new RelOptInfo structure is created specifically to process the ORDER BY procedure. Note that this new structure does not contain the baserestrictinfo (the WHERE clause information).
- (6) **Create and link the SortPath:** A `SortPath` structure is created and added to the new RelOptInfo. The SortPath consists of two primary components: the path itself (storing sort operation metadata) and a subpath (pointing to the cheapest underlying access path).

** ** SortPath

```
typedef struct SortPath
{
	Path	path;
	Path	*subpath;		/* path representing input source */
} SortPath;
```

Even though the new RelOptInfo lacks the baserestrictinfo, the parent field of the sequential scan path maintains a link to the original RelOptInfo. Consequently, during the plan tree creation stage (described in Section 3.3.3), the planner can correctly attach the WHERE clause to the sequential scan node as a ‘Filter’.

The final plan tree is created based on the cheapest access path identified here. Details on this transformation are provided in Section 3.3.3.

### 3.3.2.2. Example 2

This example examines a single-table query on a table with two indexes. The query includes a WHERE clause:

```
testdb=# \d tbl_2
     Table &#34;public.tbl_2&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &#34;tbl_2_pkey&#34; PRIMARY KEY, btree (id)
    &#34;tbl_2_data_idx&#34; btree (data)

testdb=# SELECT * FROM tbl_2 WHERE id < 240;
```

Figures 3.12 through 3.14 illustrate the planner’s operations for this query.

![](/images/postgres-internals/pgsql03-fig-3-12.webp)

#### Figure 3.12. How to identify the cheapest path of Example 2.

- (1) **Create the RelOptInfo structure:** The planner initializes a RelOptInfo structure for the target table.
- (2) **Add baserestrictinfo and indexlist:** The WHERE clause “id < 240” is added to the baserestrictinfo. Simultaneously, metadata for the two indexes &ndash; tbl_2_pkey and tbl_2_data_idx &ndash; is added to the indexlist.
- (3) **Estimate the Sequential Scan cost:** The planner creates a Path for a sequential scan, estimates its cost, and adds it to the pathlist of the RelOptInfo.

![](/images/postgres-internals/pgsql03-fig-3-13.webp)

#### Figure 3.13. How to identify the cheapest path of Example 2. (continued from Figure 3.12)

- (4) **Create and evaluate the first IndexPath:** The planner processes the indexes in the indexlist sequentially. First, it creates an `IndexPath` for tbl_2_pkey. Since tbl_2_pkey is defined on the column ‘id’ and the WHERE clause filters by that same column, the clause is stored in the indexclauses field of the IndexPath. The add_path() function then evaluates this path. If its total cost is lower than the existing sequential scan path, it is inserted at the beginning of the pathlist.
- (5) **Create and evaluate subsequent IndexPaths:** Next, an IndexPath is created for tbl_2_data_idx. However, because the query does not contain a filter related to the ‘data’ column, the indexclauses for this path remain NULL. The cost is estimated, and the path is passed to add_path().

** ** IndexPath

```python
typedef struct IndexPath
{
	Path		path;
	IndexOptInfo *indexinfo;
	List	   *indexclauses;
	List	   *indexorderbys;
	List	   *indexorderbycols;
	ScanDirection indexscandir;
	Cost		indextotalcost;
	Selectivity indexselectivity;
} IndexPath;

/*
 * IndexOptInfo
 *		Per-index information for planning/optimization
 *
 *		indexkeys[] and canreturn[] each have ncolumns entries.
 *
 *		indexcollations[], opfamily[], and opcintype[] each have nkeycolumns
 *		entries.  These don't contain any information about INCLUDE columns.
 *
 *		sortopfamily[], reverse_sort[], and nulls_first[] have
 *		nkeycolumns entries, if the index is ordered; but if it is unordered,
 *		those pointers are NULL.
 *
 *		Zeroes in the indexkeys[] array indicate index columns that are
 *		expressions; there is one element in indexprs for each such column.
 *
 *		For an ordered index, reverse_sort[] and nulls_first[] describe the
 *		sort ordering of a forward indexscan; we can also consider a backward
 *		indexscan, which will generate the reverse ordering.
 *
 *		The indexprs and indpred expressions have been run through
 *		prepqual.c and eval_const_expressions() for ease of matching to
 *		WHERE clauses. indpred is in implicit-AND form.
 *
 *		indextlist is a TargetEntry list representing the index columns.
 *		It provides an equivalent base-relation Var for each simple column,
 *		and links to the matching indexprs element for each expression column.
 *
 *		While most of these fields are filled when the IndexOptInfo is created
 *		(by plancat.c), indrestrictinfo and predOK are set later, in
 *		check_index_predicates().
 */
#ifndef HAVE_INDEXOPTINFO_TYPEDEF
typedef struct IndexOptInfo IndexOptInfo;
#define HAVE_INDEXOPTINFO_TYPEDEF 1
#endif

struct IndexPath;				/* forward declaration */

struct IndexOptInfo
{
	pg_node_attr(no_copy_equal, no_read, no_query_jumble)

	NodeTag		type;

	/* OID of the index relation */
	Oid			indexoid;
	/* tablespace of index (not table) */
	Oid			reltablespace;
	/* back-link to index's table; don't print, else infinite recursion */
	RelOptInfo *rel pg_node_attr(read_write_ignore);

	/*
	 * index-size statistics (from pg_class and elsewhere)
	 */
	/* number of disk pages in index */
	BlockNumber pages;
	/* number of index tuples in index */
	Cardinality tuples;
	/* index tree height, or -1 if unknown */
	int			tree_height;

	/*
	 * index descriptor information
	 */
	/* number of columns in index */
	int			ncolumns;
	/* number of key columns in index */
	int			nkeycolumns;

	/*
	 * table column numbers of index's columns (both key and included
	 * columns), or 0 for expression columns
	 */
	int		   *indexkeys pg_node_attr(array_size(ncolumns));
	/* OIDs of collations of index columns */
	Oid		   *indexcollations pg_node_attr(array_size(nkeycolumns));
	/* OIDs of operator families for columns */
	Oid		   *opfamily pg_node_attr(array_size(nkeycolumns));
	/* OIDs of opclass declared input data types */
	Oid		   *opcintype pg_node_attr(array_size(nkeycolumns));
	/* OIDs of btree opfamilies, if orderable.  NULL if partitioned index */
	Oid		   *sortopfamily pg_node_attr(array_size(nkeycolumns));
	/* is sort order descending? or NULL if partitioned index */
	bool	   *reverse_sort pg_node_attr(array_size(nkeycolumns));
	/* do NULLs come first in the sort order? or NULL if partitioned index */
	bool	   *nulls_first pg_node_attr(array_size(nkeycolumns));
	/* opclass-specific options for columns */
	bytea	  **opclassoptions pg_node_attr(read_write_ignore);
	/* which index cols can be returned in an index-only scan? */
	bool	   *canreturn pg_node_attr(array_size(ncolumns));
	/* OID of the access method (in pg_am) */
	Oid			relam;

	/*
	 * expressions for non-simple index columns; redundant to print since we
	 * print indextlist
	 */
	List	   *indexprs pg_node_attr(read_write_ignore);
	/* predicate if a partial index, else NIL */
	List	   *indpred;

	/* targetlist representing index columns */
	List	   *indextlist;

	/*
	 * parent relation's baserestrictinfo list, less any conditions implied by
	 * the index's predicate (unless it's a target rel, see comments in
	 * check_index_predicates())
	 */
	List	   *indrestrictinfo;

	/* true if index predicate matches query */
	bool		predOK;
	/* true if a unique index */
	bool		unique;
	/* true if the index was defined with NULLS NOT DISTINCT */
	bool		nullsnotdistinct;
	/* is uniqueness enforced immediately? */
	bool		immediate;
	/* true if index doesn't really exist */
	bool		hypothetical;

	/*
	 * Remaining fields are copied from the index AM's API struct
	 * (IndexAmRoutine).  These fields are not set for partitioned indexes.
	 */
	bool		amcanorderbyop;
	bool		amoptionalkey;
	bool		amsearcharray;
	bool		amsearchnulls;
	/* does AM have amgettuple interface? */
	bool		amhasgettuple;
	/* does AM have amgetbitmap interface? */
	bool		amhasgetbitmap;
	bool		amcanparallel;
	/* does AM have ammarkpos interface? */
	bool		amcanmarkpos;
	/* AM's cost estimator */
	/* Rather than include amapi.h here, we declare amcostestimate like this */
	void		(*amcostestimate) (struct PlannerInfo *, struct IndexPath *, double, Cost *, Cost *, Selectivity *, double *, double *) pg_node_attr(read_write_ignore);
};
```

![](/images/postgres-internals/pgsql03-fig-3-14.webp)

#### Figure 3.14. How to identify the cheapest path of Example 2. (continued from Figure 3.13)

- (6) **Create a new RelOptInfo structure:** A new RelOptInfo is initialized to finalize the selection process.
- (7) **Select and store the cheapest path:** In this example, the index scan using tbl_2_pkey is selected as the cheapest path. This path is consequently added to the pathlist of the new RelOptInfo as the optimal plan.

** Note

The add_path() function does not necessarily add every path it receives. It may discard a new path if it is significantly more expensive than an existing path with the same or better sort order (pathkeys). Due to the complexity of this pruning logic, refer to the source code comments for add_path() for further details.

## 3.3.3. Creating a Plan Tree

In the final stage, the planner creates a plan tree based on the identified cheapest path.

The root of the plan tree is a `PlannedStmt` structure, defined in [plannodes.h](https://github.com/postgres/postgres/blob/master/src/include/nodes/plannodes.h). While it contains nineteen fields, four representative fields are described below:

- **commandType** stores the type of operation, such as SELECT, UPDATE, or INSERT.
- **rtable** stores the range table entries.
- **relationOids** stores the OIDs of the tables related to the query.
- **plantree** stores the actual plan tree, which is composed of various plan nodes.

** ** PlannedStmt

```python
typedef struct PlannedStmt
{
	pg_node_attr(no_equal, no_query_jumble)

	NodeTag		type;

	/* select|insert|update|delete|merge|utility */
	CmdType		commandType;

	/* query identifier (copied from Query) */
	int64		queryId;

	/* plan identifier (can be set by plugins) */
	int64		planId;

	/* is it insert|update|delete|merge RETURNING? */
	bool		hasReturning;

	/* has insert|update|delete|merge in WITH? */
	bool		hasModifyingCTE;

	/* do I set the command result tag? */
	bool		canSetTag;

	/* redo plan when TransactionXmin changes? */
	bool		transientPlan;

	/* is plan specific to current role? */
	bool		dependsOnRole;

	/* parallel mode required to execute? */
	bool		parallelModeNeeded;

	/* which forms of JIT should be performed */
	int			jitFlags;

	/* tree of Plan nodes */
	struct Plan *planTree;

	/*
	 * List of PartitionPruneInfo contained in the plan
	 */
	List	   *partPruneInfos;

	/* list of RangeTblEntry nodes */
	List	   *rtable;

	/*
	 * RT indexes of relations that are not subject to runtime pruning or are
	 * needed to perform runtime pruning
	 */
	Bitmapset  *unprunableRelids;

	/*
	 * list of RTEPermissionInfo nodes for rtable entries needing one
	 */
	List	   *permInfos;

	/* rtable indexes of target relations for INSERT/UPDATE/DELETE/MERGE */
	/* integer list of RT indexes, or NIL */
	List	   *resultRelations;

	/* list of AppendRelInfo nodes */
	List	   *appendRelations;

	/*
	 * Plan trees for SubPlan expressions; note that some could be NULL
	 */
	List	   *subplans;

	/* indices of subplans that require REWIND */
	Bitmapset  *rewindPlanIDs;

	/* a list of PlanRowMark's */
	List	   *rowMarks;

	/* OIDs of relations the plan depends on */
	List	   *relationOids;

	/* other dependencies, as PlanInvalItems */
	List	   *invalItems;

	/* type OIDs for PARAM_EXEC Params */
	List	   *paramExecTypes;

	/* non-null if this is utility stmt */
	Node	   *utilityStmt;

	/* statement location in source string (copied from Query) */
	/* start location, or -1 if unknown */
	ParseLoc	stmt_location;
	/* length in bytes; 0 means &#34;rest of string&#34; */
	ParseLoc	stmt_len;
} PlannedStmt;
```

Each node in the plan tree corresponds to a specific operation, such as a sequential scan, sort, or index scan.

The `PlanNode` structure serves as the base node, and all other specific plan nodes (such as SeqScan or Sort) begin with a Plan field.

For example, `ScanNode`, which is an abstract type that all relation-scan plan types inherit from, consists of a Plan structure followed by the integer variable scanrelid.

The PlanNode structure contains fourteen fields, including the following seven representative fields:

- **startup_cost** and **total_cost** represent the estimated costs for the operation corresponding to the node.
- **plan_rows** is the estimated number of rows to be scanned.
- **targetlist** stores the target list items retrieved from the query tree.
- **qual** is a list of qualifier conditions (filters) to be applied.
- **lefttree** and **righttree** are pointers to child nodes, enabling the hierarchical structure of the tree.

** ** PlanNode

```python
/* ----------------
 *		Plan node
 *
 * All plan nodes &#34;derive&#34; from the Plan structure by having the
 * Plan structure as the first field.  This ensures that everything works
 * when nodes are cast to Plan's.  (node pointers are frequently cast to Plan*
 * when passed around generically in the executor)
 *
 * We never actually instantiate any Plan nodes; this is just the common
 * abstract superclass for all Plan-type nodes.
 * ----------------
 */
typedef struct Plan
{
	pg_node_attr(abstract, no_equal, no_query_jumble)

	NodeTag		type;

	/*
	 * estimated execution costs for plan (see costsize.c for more info)
	 */
	/* count of disabled nodes */
	int			disabled_nodes;
	/* cost expended before fetching any tuples */
	Cost		startup_cost;
	/* total cost (assuming all tuples fetched) */
	Cost		total_cost;

	/*
	 * planner's estimate of result size of this plan step
	 */
	/* number of rows plan is expected to emit */
	Cardinality plan_rows;
	/* average row width in bytes */
	int			plan_width;

	/*
	 * information needed for parallel query
	 */
	/* engage parallel-aware logic? */
	bool		parallel_aware;
	/* OK to use as part of parallel plan? */
	bool		parallel_safe;

	/*
	 * information needed for asynchronous execution
	 */
	/* engage asynchronous-capable logic? */
	bool		async_capable;

	/*
	 * Common structural data for all Plan types.
	 */
	/* unique across entire final plan tree */
	int			plan_node_id;
	/* target list to be computed at this node */
	List	   *targetlist;
	/* implicitly-ANDed qual conditions */
	List	   *qual;
	/* input plan tree(s) */
	struct Plan *lefttree;
	struct Plan *righttree;
	/* Init Plan nodes (un-correlated expr subselects) */
	List	   *initPlan;

	/*
	 * Information for management of parameter-change-driven rescanning
	 *
	 * extParam includes the paramIDs of all external PARAM_EXEC params
	 * affecting this plan node or its children.  setParam params from the
	 * node's initPlans are not included, but their extParams are.
	 *
	 * allParam includes all the extParam paramIDs, plus the IDs of local
	 * params that affect the node (i.e., the setParams of its initplans).
	 * These are _all_ the PARAM_EXEC params that affect this node.
	 */
	Bitmapset  *extParam;
	Bitmapset  *allParam;
} Plan;
```

** ** ScanNode

```
/*
 * ==========
 * Scan nodes
 *
 * Scan is an abstract type that all relation scan plan types inherit from.
 * ==========
 */
typedef struct Scan
{
	pg_node_attr(abstract)

	Plan		plan;
	/* relid is index into the range table */
	Index		scanrelid;
} Scan;

/* ----------------
 *		sequential scan node
 * ----------------
 */
typedef struct SeqScan
{
	Scan		scan;
} SeqScan;
```

The following sections describe the two plan trees created from the cheapest paths identified in the previous examples.

### 3.3.3.1. Example 1

This section describes the plan tree created for the query in Section 3.3.2.1.

The cheapest path, illustrated in Figure 3.11, consists of a SortPath as the root and a Sequential Scan Path as its child.

While the complex details of the transformation are omitted here, the plan tree is created almost directly from the hierarchical structure of the cheapest path.

In this example, a `SortNode` is assigned to the plantree field of the PlannedStmt structure, and a `SeqScanNode` is assigned to the lefttree of the Sort node. This structure is shown in Figure 3.15(a).

** ** SortNode

```
/* ----------------
 *		sort node
 * ----------------
 */
typedef struct Sort
{
	Plan		plan;

	/* number of sort-key columns */
	int			numCols;

	/* their indexes in the target list */
	AttrNumber *sortColIdx pg_node_attr(array_size(numCols));

	/* OIDs of operators to sort them by */
	Oid		   *sortOperators pg_node_attr(array_size(numCols));

	/* OIDs of collations */
	Oid		   *collations pg_node_attr(array_size(numCols));

	/* NULLS FIRST/LAST directions */
	bool	   *nullsFirst pg_node_attr(array_size(numCols));
} Sort;
```

![](/images/postgres-internals/pgsql03-fig-3-15.webp)

#### Figure 3.15. Examples of plan trees.

In the SortNode, the lefttree pointer targets the SeqScanNode. In the SeqScanNode, the qual field stores the WHERE clause “id < 300”.

### 3.3.3.2. Example 2

The second example describes the plan tree for the query in Section 3.3.2.2.

As illustrated in Figure 3.14, the cheapest path is an index scan path; therefore, the resulting plan tree consists solely of an `IndexScanNode`. This is shown in Figure 3.15(b).

** ** IndexScanNode

```python
/* ----------------
 *		index scan node
 *
 * indexqualorig is an implicitly-ANDed list of index qual expressions, each
 * in the same form it appeared in the query WHERE condition.  Each should
 * be of the form (indexkey OP comparisonval) or (comparisonval OP indexkey).
 * The indexkey is a Var or expression referencing column(s) of the index's
 * base table.  The comparisonval might be any expression, but it won't use
 * any columns of the base table.  The expressions are ordered by index
 * column position (but items referencing the same index column can appear
 * in any order).  indexqualorig is used at runtime only if we have to recheck
 * a lossy indexqual.
 *
 * indexqual has the same form, but the expressions have been commuted if
 * necessary to put the indexkeys on the left, and the indexkeys are replaced
 * by Var nodes identifying the index columns (their varno is INDEX_VAR and
 * their varattno is the index column number).
 *
 * indexorderbyorig is similarly the original form of any ORDER BY expressions
 * that are being implemented by the index, while indexorderby is modified to
 * have index column Vars on the left-hand side.  Here, multiple expressions
 * must appear in exactly the ORDER BY order, and this is not necessarily the
 * index column order.  Only the expressions are provided, not the auxiliary
 * sort-order information from the ORDER BY SortGroupClauses; it's assumed
 * that the sort ordering is fully determinable from the top-level operators.
 * indexorderbyorig is used at runtime to recheck the ordering, if the index
 * cannot calculate an accurate ordering.  It is also needed for EXPLAIN.
 *
 * indexorderbyops is a list of the OIDs of the operators used to sort the
 * ORDER BY expressions.  This is used together with indexorderbyorig to
 * recheck ordering at run time.  (Note that indexorderby, indexorderbyorig,
 * and indexorderbyops are used for amcanorderbyop cases, not amcanorder.)
 *
 * indexorderdir specifies the scan ordering, for indexscans on amcanorder
 * indexes (for other indexes it should be &#34;don't care&#34;).
 * ----------------
 */
typedef struct Scan
{
	pg_node_attr(abstract)

	Plan		plan;
	Index		scanrelid;		/* relid is index into the range table */
} Scan;

typedef struct IndexScan
{
	Scan		scan;
	/* OID of index to scan */
	Oid			indexid;
	/* list of index quals (usually OpExprs) */
	List	   *indexqual;
	/* the same in original form */
	List	   *indexqualorig;
	/* list of index ORDER BY exprs */
	List	   *indexorderby;
	/* the same in original form */
	List	   *indexorderbyorig;
	/* OIDs of sort ops for ORDER BY exprs */
	List	   *indexorderbyops;
	/* forward or backward or don't care */
	ScanDirection indexorderdir;
} IndexScan;
```

In this example, the WHERE clause “id < 240” acts as an access predicate. Consequently, it is stored in the indexqual field of the IndexScanNode, rather than the general qual field.

# 3.4. Executor Performance

This section describes the basic operation of the Executor during query processing.

It also describes the processing of aggregate functions and the internal processing of table constraints, both of which are important for practical use.

Section Contents

- 3.4.1. How the Executor Performs
- 3.4.2. Aggregate Functions
- 3.4.3. Constraints

## 3.4.1. How the Executor Performs

PostgreSQL utilizes the Volcano Model (also known as the Iterator Model) for query execution.

In this model, the executor processes the plan tree by invoking the functions associated with each node. From a data flow perspective, tuples move upward from the leaf nodes to the root.

Each plan node has specific functions responsible for its operation, located in the [src/backend/executor/](https://github.com/postgres/postgres/blob/master/src/backend/executor/) directory. For example:

- **Sequential Scan (SeqScan):** Defined in [nodeSeqscan.c](https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeIndexscan.c).
- **Index Scan (IndexScan):** Defined in [nodeIndexscan.c](https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeIndexscan.c).
- **Sort (Sort):** Defined in [nodeSort.c](https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeSort.c).

The operation of the executor is best understood by examining the output of the EXPLAIN command, which reflects the structure of the plan tree. Consider the following result from Example 1 (Section 3.3.3.1):

```
1
2
3
4
5
6
7
8
```

```
testdb=# EXPLAIN SELECT * FROM tbl_1 WHERE id < 300 ORDER BY data;
                          QUERY PLAN
---------------------------------------------------------------
 Sort  (cost=182.34..183.09 rows=300 width=8)
   Sort Key: data
   ->  Seq Scan on tbl_1  (cost=0.00..170.00 rows=300 width=8)
         Filter: (id < 300)
(4 rows)
```

When analyzing the execution flow, the EXPLAIN output is typically read from the bottom up:

- **Line 6 (SeqScan):** The SeqScan node (defined in [nodeSeqscan.c](https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeSeqscan.c)) sequentially scans the target table, applies the filter “id < 300”, and passes the resulting tuples upward to the SortNode.
- **Line 4 (Sort):** The SortNode (defined in [nodeSort.c](https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeSort.c)) receives tuples one by one from its child (the SeqScanNode) and stores them in the work_mem buffer. Once the child node has finished providing tuples, the SortNode performs the sorting operation.

From a control-flow perspective, the executor starts at the SortNode. The SortNode then repeatedly invokes the SeqScan node to obtain tuples. As shown in Figure 3.16, these tuples are collected in memory before the final sort is executed.

![](/images/postgres-internals/pgsql03-fig-3-16.webp)

#### Figure 3.16. Sort Processing in the Executor.

### 3.4.1.1. Scanning Functions

As mentioned in Section 1.3, data tuples are stored in 8 KB physical blocks. To access a single data tuple, the Executor must traverse many layers, such as Buffer Manager (see [Chapter 8](/book/postgres-internals/pgsql08/index)) and Concurrency Control (see [Chapter 5](/book/postgres-internals/pgsql05/index)). Furthermore, the access method differs depending on whether the data block belongs to a table or an index.

The method of accessing a single data tuple by the Executor is highly abstracted, and the complexity of the intermediate layers is hidden.

For example, in the case of a sequential scan, by repeatedly calling the [SeqNext()](https://github.com/postgres/postgres/blob/6ba9892f5cb8c2f1c2592198d938cc8f5cf52edc/src/backend/executor/nodeSeqscan.c#L50) function, rows in a table can be accessed sequentially, taking transactions into account. For an index scan, an index scan can be performed by repeatedly calling the [IndexNext()](https://github.com/postgres/postgres/blob/6ba9892f5cb8c2f1c2592198d938cc8f5cf52edc/src/backend/executor/nodeIndexscan.c#L80) function.

### 3.4.1.2. Temporary Files

The executor utilizes work_mem and temp_buffers allocated in memory for query processing. However, if a task &ndash; such as sorting or hash aggregation &mdash; exceeds the available memory, the executor switches to temporary files on disk.

By using the ANALYZE option, the EXPLAIN command executes the query and displays the actual row counts, run time, and memory or disk usage. An example of this is shown below:

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
```

```
testdb=# EXPLAIN ANALYZE SELECT id, data FROM tbl_25m ORDER BY id;
                                                        QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=3944070.01..3945895.01 rows=730000 width=4104) (actual time=885.648..1033.746 rows=730000 loops=1)
   Sort Key: id
   Sort Method: external sort  Disk: 10000kB
   ->  Seq Scan on tbl_25m  (cost=0.00..10531.00 rows=730000 width=4104) (actual time=0.024..102.548 rows=730000 loops=1)
 Planning time: 1.548 ms
 Execution time: 1109.571 ms
(6 rows)
```

On Line 6, the EXPLAIN ANALYZE output indicates that the executor performed an “external sort” and used a temporary file of 10,000 kB.

Temporary files are created under the `$PGDATA/base/pg_tmp` subdirectory. They follow a specific naming convention:

- **Temporary File Pattern:** `pgsql_tmp[PID].[seq_number]`

For instance, a file named ‘pgsql_tmp8903.5’ represents the 6th temporary file (as the sequence number is zero-indexed) created by the Postgres process with PID 8903.

```bash
$ ls -la $PGDATA/base/pgsql_tmp*
-rw-------  1 postgres  postgres  10240000 12  4 14:18 pgsql_tmp8903.5
```

## 3.4.2. Aggregate Functions

In practice, the efficient calculation of aggregate functions is a critical role of database systems. This section describes how aggregate functions &mdash; such as sum, average, and variance &mdash; are handled by the executor.

The following table `d` is used for the examples in this section:

```sql
testdb=# CREATE TABLE d (x DOUBLE PRECISION);
CREATE TABLE
testdb=# INSERT INTO d SELECT GENERATE_SERIES(1, 10);
INSERT 0 10
```

When a sum function is issued, a plan tree is created as shown in Figure 3.17.

```
testdb=# SELECT sum(x) FROM d;
 sum
-----
  55
(1 row)
```

![](/images/postgres-internals/pgsql03-fig-3-17.webp)

#### Figure 3.17. A Plan Tree for the Sum Function.

The result of the EXPLAIN command for this query is shown below:

```
1
2
3
4
5
6
```

```
testdb=# EXPLAIN SELECT sum(x) FROM d;
                       QUERY PLAN
--------------------------------------------------------
 Aggregate  (cost=38.25..38.26 rows=1 width=8)
   ->  Seq Scan on d  (cost=0.00..32.60 rows=2260 width=8)
(2 rows)
```

- **Line 5:** The SeqScan node sequentially scans the target table and passes the values of the target column ‘x’ to the Aggregate node.
- **Line 4:** The Aggregate node receives the data from the SeqScan node and processes it according to the specified aggregate function (e.g., sum, avg, variance, or count).

Figure 3.18 provides an overview of how the aggregate function is processed within the executor.

![](/images/postgres-internals/pgsql03-fig-3-18.webp)

#### Figure 3.18. Aggregate Function Processing in the Executor.

The following subsections explore the internal processing of aggregate functions using specific examples.

### 3.4.2.1. Sum and Average

The formulas for the sum $S_{n}$ and average $A_{n}$ are given by:

$$ \begin{align*} S_{n} &= \sum_{i=1}^{n} x_{i} \tag{3-16} \\ A_{n} &= \frac{1}{n} \sum_{i=1}^{n} x_{i} = \frac{1}{n} S_{n} \tag{3-17} \end{align*} $$

where $x_{i}$ epresents the value of the target column in the $i-$th row.

As shown in these formulas, the primary difference between a sum and an average is the final division by the total number of elements, $n$.

Internally, the `Aggregate` node accumulates the scanned values sequentially. During the final stage of processing, the node returns the accumulated sum for a sum operation. For an avg operation, it returns the accumulated sum divided by the count of processed rows ($n$).

The following pseudocode illustrates this logic:

```python
d =[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]

N = 0
S = 0

# Seq Scan
for x in d:

    # Aggregate: Sum
    N += 1
    S += x

print(&#34;Sum=&#34;, S)
print(&#34;Avg=&#34;, S/N)
```

### 3.4.2.2. Variance

For simplicity, variance $V_{n}$ is defined based on the sum of squared deviations from the average:

$$ V_{n} = \sum_{i=1}^{n} (x_{i} - A_{n})^{2} \tag{3-18} $$

Based on this definition, PostgreSQL provides two types of variance:

- **Sample Variance (var_samp):** $\frac{1}{n-1} V_{n}$. This is used when the data represents a sample of a larger population.
- **Population Variance (var_pop):** $\frac{1}{n} V_{n}$. This is used when the data represents the entire population.

The following examples show the output for both functions:

```
testdb=# SELECT var_samp(x) FROM d;
     var_samp
-------------------
 9.166666666666666
(1 row)

testdb=# SELECT var_pop(x) FROM d;
 var_pop
---------
    8.25
(1 row)
```

#### 3.4.2.2.1. One-Pass Variance Calculation (Versions 11 or earlier)

A naive implementation of the variance formula (3-18) requires two passes over the data: the first to calculate the average and a second to calculate the sum of squared differences.

To optimize this, the calculation can be reduced to a single pass using the following formula:

$$ \begin{align*} V_{n} &= \sum_{i=1}^{n} x_{i}^{2} - \frac{1}{n} (S_{n})^{2} \tag{3-19} \\ \end{align*} $$

This approach allows the executor to calculate the variance iteratively by maintaining running totals for both the sum of the squares ($\sum x^{2}$) and the sum of the values ($S_{n}$).

The following pseudocode illustrates this logic:

```python
d =[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]

N = 0
S = 0
X2 = 0

# SeqScan
for x in d:

    # Aggregate: Variance
    N += 1
    S += x
    X2 += x**2

V = X2 - S**2/N

print(&#34;V=&#34;, V)
print(&#34;Var_samp=&#34;, V/(N-1))
print(&#34;Var_pop=&#34;, V/N)
```

** Rewriting from 2-Pass to 1-Pass Method $$ \begin{align*} V_{n} &= \sum_{i=1}^{n} (x_{i} - A_{n})^{2} = \sum_{i=1}^{n} (x_{i}^{2} - 2 A_{n} x_{i} + (A_{n})^{2}) = \sum_{i=1}^{n} x_{i}^{2} - 2 A_{n} \sum_{i=1}^{n} x_{i} + \sum_{i=1}^{n} (A_{n})^{2} \\ &= \sum_{i=1}^{n} x_{i}^{2} - 2 \frac{S_{n}}{n} \sum_{i=1}^{n} x_{i} + \sum_{i=1}^{n} \left( \frac{S_{n}}{n} \right)^{2} = \sum_{i=1}^{n} x_{i}^{2} - 2 \frac{S_{n}}{n} S_{n} + n \cdot \left( \frac{S_{n}}{n} \right)^{2} \\ &= \sum_{i=1}^{n} x_{i}^{2} - \frac{2}{n} (S_{n})^{2} + \frac{1}{n} (S_{n})^{2} \\ &= \sum_{i=1}^{n} x_{i}^{2} - \frac{1}{n} (S_{n})^{2} \end{align*} $$

#### 3.4.2.2.2. Youngs and Cramer method (Versions 12 or later)

In 2016, a research paper titled “[A Closer Look at Variance ImplementationsIn Modern Database Systems](https://sigmodrecord.org/publications/sigmodRecord/1612/pdfs/05_vision_Kamat.pdf)” highlighted accuracy limitations in PostgreSQL’s variance calculation.

To address these concerns, a [patch](https://www.postgresql.org/message-id/flat/153313051300.1397.9594490737341194671@wrigleys.postgresql.org) was developed in November 2018, leading to the adoption of the [Youngs and Cramer](http://i.stanford.edu/pub/cstr/reports/cs/tr/79/773/CS-TR-79-773.pdf) method in PostgreSQL version 12. This algorithm provides significantly higher numerical stability and accuracy than the standard single-pass formula[1](#fn:1).

The following pseudocode illustrates the implementation of the Youngs and Cramer method (refer to Appendix 1.1 for details.):

$$ \begin{cases} V_{1} &= 0 \\ V_{n} &= V_{n-1} + \frac{1}{n(n-1)} (nx_{n} - S_{n})^{2} \tag{3-20} \end{cases} $$

Following is the pseudocode of Youngs and Cramer method:

```python
d =[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]

N = 0
S = 0
V = 0

# SeqScan
for x in d:

    # Aggregate: Variance
    N += 1
    S += x
    if 1 < N:
        V += (x * N - S)**2 / (N * (N-1))

print(&#34;V=&#34;, V)
print(&#34;Var_samp=&#34;, V/(N-1))
print(&#34;Var_pop=&#34;, V/N)
```

## 3.4.3. Constraints

When PostgreSQL executes an INSERT, UPDATE, or DELETE statement, the Executor checks the constraints defined on the target table.

This section focuses on the following three common constraint types:

1. NOT NULL and CHECK constraints
2. PRIMARY KEY and UNIQUE constraints
3. FOREIGN KEY constraints

To illustrate how PostgreSQL processes these constraints, consider the insertion of a single tuple.

The pseudocode below shows the main flow of the `ExecInsert()` function:

```
ExecInsert() @ nodeModifyTable.c

/*
 * Block 1: Validate table constraints
 */
(1) ExecConstraints()@execMain.c       /* Check NOT NULL and CHECK constraints. */

/*
 * Block 2: Insert the heap tuple
 */
(2) table_tuple_insert()@tableam.c     /* Insert the target tuple into the heap table. */

/*
 * Block 3: Insert index tuples and enforce uniqueness
 */
(3) ExecInsertIndexTuples()@execIndexing.c
        for each index:
(4)         index_insert()@indexam.c   /* Insert the corresponding index tuple. */
            if (UNIQUE or PRIMARY KEY index)
(5)             _bt_check_unique()@nbtinsert.c
                                       /* Check whether a conflicting key already exists
                                        * in the B-tree index.
                                        */
/*
 * Block 4: Execute AFTER ROW INSERT triggers
 */
(6) ExecARInsertTriggers()@trigger.c
        for each AFTER INSERT trigger:
(7)         RI_FKey_check_ins()@ri_triggers.c /* Check FOREIGN KEY constraints. */
```

The major steps are:

**Block 1: Validate table constraints**

- (1) ExecConstraints() checks **NOT NULL** constraints and **CHECK** constraints.

**Block 2: Insert the heap tuple**

- (2) table_tuple_insert() inserts the tuple into the heap table.

**Block 3: Insert index tuples and enforce uniqueness**

- (3) ExecInsertIndexTuples() processes all indexes belonging to the table.
- (4) index_insert() inserts the corresponding index tuple into each index.
- (5) _bt_check_unique() checks whether a conflicting key already exists. **UNIQUE** and **PRIMARY KEY** constraints are enforced here.

**Block 4: Execute AFTER ROW INSERT triggers**

- (6) ExecARInsertTriggers() executes AFTER INSERT triggers.
- (7) RI_FKey_check_ins() checks **FOREIGN KEY** constraints.

The following sections explain each constraint type in more detail.

### 3.4.3.1. NOT NULL and CHECK Constraints

PostgreSQL checks these constraints in **Block 1**.

The ExecConstraints() function checks **NOT NULL** constraints and **CHECK** constraints. More precisely, the ExecRelCheck() function evaluates CHECK constraints.

PostgreSQL stores CHECK constraint definitions in the system catalog [pg_constraint](https://www.postgresql.org/docs/current/catalog-pg-constraint.html). PostgreSQL loads these definitions into memory and evaluates the corresponding expressions for each inserted or updated tuple.

The same mechanism applies to UPDATE statements.

### 3.4.3.2. PRIMARY KEY and UNIQUE Constraints

PostgreSQL checks **PRIMARY KEY** and **UNIQUE** constraints in **Block 3**.

When inserting an index tuple into a UNIQUE index, PostgreSQL checks whether a conflicting key already exists in the index.

The _bt_check_unique() function performs this check for B-tree indexes. Because the function checks the index directly, the check runs in approximately $O(\log n)$ time, where $n$ is the number of index entries.

The same mechanism applies to UPDATE statements.

### 3.4.3.3. FOREIGN KEY Constraints

PostgreSQL checks **FOREIGN KEY** constraints in **Block 4**.

FOREIGN KEY constraints require PostgreSQL to check rows in another table. Therefore, the implementation is more complex than that of the previous two constraint types.

Consider the following tables:

```sql
CREATE TABLE tbl_parent (
    id int PRIMARY KEY,
    data text
);

CREATE TABLE tbl_child (
    cid int REFERENCES tbl_parent(id),
    data text
);
```

Suppose that PostgreSQL executes the following statement:

```sql
INSERT INTO tbl_child VALUES (1, 'test');
```

During Block 4, PostgreSQL executes the FOREIGN KEY trigger function.

In versions 18 and earlier, the trigger generates and executes a query similar to the following:

```sql
SELECT 1
FROM ONLY &#34;public&#34;.&#34;tbl_parent&#34; x
WHERE &#34;id&#34; OPERATOR(pg_catalog.=) $1
FOR KEY SHARE OF x;
```

This SELECT statement uses *FOR KEY SHARE* to lock the referenced row. This lock prevents concurrent transactions from deleting the row or modifying the referenced key while PostgreSQL checks the foreign key constraint.

PostgreSQL executes this SELECT statement through the [Server Programming Interface (SPI)](https://www.postgresql.org/docs/current/spi.html).

Because SPI executes an internal SQL query, PostgreSQL must still perform query processing for the generated query. This processing adds overhead to each FOREIGN KEY check.

Consequently, inserting a single tuple into the child table executes an additional internal SELECT query.

#### Direct FOREIGN KEY Validation in PostgreSQL 19

PostgreSQL 19 (2026) introduces a new execution path for FOREIGN KEY validation.

When a suitable index backs the referenced PRIMARY KEY or UNIQUE constraint, PostgreSQL can validate the FOREIGN KEY by directly probing the referenced index instead of generating and executing an internal SELECT query through SPI.

- PostgreSQL performs a direct lookup on the referenced PRIMARY KEY or UNIQUE index.
- This avoids the planner, executor, and SPI overhead associated with executing an internal SQL statement.
- PostgreSQL still acquires the required row-level lock on the referenced tuple to preserve FOREIGN KEY semantics.
- If a direct index lookup is unavailable, PostgreSQL falls back to the traditional SPI-based implementation.

This optimization does not change the behavior of FOREIGN KEY enforcement. Instead, it reduces the cost of each constraint check by eliminating the internal SPI query execution path whenever possible, improving INSERT and UPDATE performance for many workloads.

1. This method calculates the variance iteratively without requiring the sum of squares, thereby reducing the risk of catastrophic cancellation in floating-point arithmetic.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 3.5. Join Operations

PostgreSQL supports three join operations: nested loop join, merge join and hash join. The nested loop join and the merge join in PostgreSQL have several variations.

In the following, we assume that the reader is familiar with the basic behavior of these three joins.

If you are unfamiliar with these terms, see the references:

** References

1. Abraham Silberschatz, Henry F. Korth, and S. Sudarshan, “[Database System Concepts](https://www.amazon.com/dp/0073523321)”, McGraw-Hill Education, ISBN-13: 978-0073523323
2. Thomas M. Connolly, and Carolyn E. Begg, “[Database Systems](https://www.amazon.com/dp/0321523067)”, Pearson, ISBN-13: 978-0321523068

However, as there is not much explanation on the hybrid hash join with skew supported by PostgreSQL, it will be explained in more detail here.

Section Contents

- Nested Loop Join
- Merge Join
- Hash Join
- Join Access Paths and Join Nodes

Note that the three join methods supported by PostgreSQL can perform all join operations, not only INNER JOIN, but also LEFT/RIGHT OUTER JOIN, FULL OUTER JOIN, and so on. However, for simplicity, we focus on the NATURAL INNER JOIN in this chapter.

# 3.6. Creating the Plan Tree of Multiple-Table Query

In this section, the process of creating a plan tree for a multiple-table query is explained.

Section Contents

- 3.6.1. Preprocessing
- 3.6.2. Determining the Cheapest Path
- 3.6.3. Determining the Cheapest Path of a Triple-Table Query

## 3.6.1. Preprocessing

The subquery_planner() function, defined in [planner.c](https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/planner.c), invokes the preprocessing stage.

While the preprocessing for single-table queries was described in Section 3.3.1, this subsection focuses on the preprocessing specific to multiple-table queries.

Given the extensive number of tasks performed, only the primary operations are described here.

**Processing and Converting CTEs:** If WITH lists are present, the planner processes each common table expression (CTE) using the SS_process_ctes() function.

**Pulling Up Subqueries:** If a subquery in the FROM clause does not contain GROUP BY, HAVING, ORDER BY, LIMIT, or DISTINCT clauses, and does not use INTERSECT or EXCEPT, the planner converts it into a join form using the pull_up_subqueries() function. For example, a query containing a subquery in the FROM clause can be converted into a natural join:

```
testdb=# SELECT * FROM tbl_a AS a, (SELECT * FROM tbl_b) as b WHERE a.id = b.id;
```

$$\Downarrow$$

```
testdb=# SELECT * FROM tbl_a AS a, tbl_b as b WHERE a.id = b.id;
```

**Transforming Outer Joins to Inner Joins:** The planner transforms an outer join into an inner join whenever the join condition or WHERE clause constraints allow for a more efficient inner join execution without changing the result set.

## 3.6.2. Determining the Cheapest Path

To determine the optimal plan tree, the planner must consider all combinations of indexes and join methods. This is a very expensive process and becomes impossible if the number of tables increases due to a combinatorial explosion.

When the number of joining tables is relatively small (typically fewer than 12), the planner uses dynamic programming to determine the optimal plan.

** Genetic Query Optimizer (GQO)

When a query joining many tables is executed, a huge amount of time is required to optimize the query plan. To deal with this situation, PostgreSQL implements the [Genetic Query Optimizer (GQO)](http://www.postgresql.org/docs/current/static/geqo.html).

GEQO is an approximate algorithm used to determine a reasonable plan within a reasonable time. If the number of joining tables is higher than the threshold specified by the parameter [geqo_threshold](http://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-GEQO-THRESHOLD) (the default is 12), PostgreSQL creates a query plan using this genetic algorithm instead of dynamic programming.

Determining the optimal plan tree via dynamic programming involves the following processing levels (refer to Figure 3.34):

- **Level 1:** Determine the cheapest path for each individual table. Each table’s cheapest path is stored in its respective `RelOptInfo` structure.
- **Level 2:** In the following, the RelOptInfo of a set of tables is represented using curly braces, such as {A, B}. If there are two tables, A and B, the planner identifies the cheapest join path for {A, B}. This result is the final answer for a two-table join. If there are three tables, the planner identifies the cheapest path for each possible pair: {A, B}, {A, C}, and {B, C}.
- **Level 3 and higher:** Continue this process incrementally. The results of lower-level join combinations are used to determine the cheapest paths for larger sets (e.g., {A, B, C}) until a single set containing all tables is reached.

![](/images/postgres-internals/pgsql03-fig-3-34.webp)

#### Figure 3.34. How to identify the cheapest access path using dynamic programming.

By reusing the cheapest paths of partial problems at each level, the planner can efficiently determine the optimal plan tree.

The following section describes how the planner identifies the cheapest plan for the following query:

```
testdb=# \d tbl_a
     Table &#34;public.tbl_a&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &#34;tbl_a_pkey&#34; PRIMARY KEY, btree (id)

testdb=# \d tbl_b
     Table &#34;public.tbl_b&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# SELECT * FROM tbl_a AS a, tbl_b AS b WHERE a.id = b.id AND b.data < 400;
```

### 3.6.2.1. Processing in Level 1

In Level 1, the planner creates a RelOptInfo structure and estimates the cheapest costs for each relation in the query. These RelOptInfo structures are added to the simple_rel_array within the PlannerInfo structure of the query (refer to Figure 3.35).

![](/images/postgres-internals/pgsql03-fig-3-35.webp)

#### Figure 3.35. The PlannerInfo and RelOptInfo after processing in Level 1.

The RelOptInfo for tbl_a contains three access paths, which are added to its pathlist. Each RelOptInfo is linked to its cheapest cost paths:

- the cheapest start-up cost path
- the cheapest total cost path
- the cheapest parameterized cost path (refer to Section 3.5.1.3 for details on parameterized paths)

In contrast, the RelOptInfo for tbl_b contains only a sequential scan access path because tbl_b has no associated index.

### 3.6.2.2. Processing in Level 2

In Level 2, a RelOptInfo structure for the join relation is created and added to the join_rel_list of the PlannerInfo (refer to Figure 3.36 [1]).

![](/images/postgres-internals/pgsql03-fig-3-36.webp)

#### Figure 3.36. The PlannerInfo and RelOptInfo after processing in Level 2.

The planner then estimates the costs of all possible join paths and identifies the best access path &mdash; the one with the cheapest total cost. The RelOptInfo stores this result as its cheapest total cost path.

Table 3.3 shows all combinations of join access paths considered in this example. Since the query is an equi-join, the planner estimates costs for all three join methods (Nested Loop, Merge, and Hash Join). For clarity, the following notations are used:

- **SeqScanPath(table):** Sequential scan path of the table.
- **Materialized->SeqScanPath(table):** Materialized sequential scan path of the table.
- **IndexScanPath(table, attribute):** Index scan path using the specified attribute.
- **ParameterizedIndexScanPath(table, attr1, attr2):** Index path of the table using attr1, parameterized by attr2 of the outer table.

|  | Outer Path | Inner Path |  |
| --- | --- | --- | --- |
| Nested Loop Join |  |  |  |
| 2 | SeqScanPath(tbl_a) | Materialized->SeqScanPath(tbl_b) | Materialized nested loop join |
| 3 | IndexScanPath(tbl_a,id) | SeqScanPath(tbl_b) | Nested loop join with outer index scan |
| 4 | IndexScanPath(tbl_a,id) | Materialized->SeqScanPath(tbl_b) | Materialized nested loop join with outer index scan |
| 5 | SeqScanPath(tbl_b) | SeqScanPath(tbl_a) |  |
| 6 | SeqScanPath(tbl_b) | Materialized->SeqScanPath(tbl_a) | Materialized nested loop join |
| 7 | SeqScanPath(tbl_b) | ParametalizedIndexScanPath(tbl_a, id, tbl_b.id) | Indexed nested loop join |
| Merge Join |  |  |  |
| 2 | IndexScanPath(tbl_a,id) | SeqScanPath(tbl_b) | Merge join with outer index scan |
| 3 | SeqScanPath(tbl_b) | SeqScanPath(tbl_a) |  |
| Hash Join |  |  |  |
| 2 | SeqScanPath(tbl_b) | SeqScanPath(tbl_a) |  |

In the nested loop join category, for instance, seven join paths are estimated. The first path uses sequential scans for both tbl_a (outer) and tbl_b (inner). The second path uses a sequential scan for tbl_a and a materialized sequential scan for tbl_b, and so on.

The planner finally identifies the cheapest path among all estimated join paths and adds it to the pathlist of the RelOptInfo representing the set {tbl_a, tbl_b} (refer to Figure 3.36 [2]).

In this example, as shown in the EXPLAIN output below, the planner selects a hash join where tbl_b is the inner table and tbl_a is the outer table.

```
testdb=# EXPLAIN  SELECT * FROM tbl_b AS b, tbl_c AS c WHERE c.id = b.id AND b.data < 400;
                              QUERY PLAN
----------------------------------------------------------------------
 Hash Join  (cost=90.50..277.00 rows=400 width=16)
   Hash Cond: (c.id = b.id)
   ->  Seq Scan on tbl_c c  (cost=0.00..145.00 rows=10000 width=8)
   ->  Hash  (cost=85.50..85.50 rows=400 width=8)
         ->  Seq Scan on tbl_b b  (cost=0.00..85.50 rows=400 width=8)
               Filter: (data < 400)
(6 rows)
```

## 3.6.3. Determining the Cheapest Path of a Triple-Table Query

The process for determining the cheapest path of a query involving three tables is as follows:

```
testdb=# \d tbl_a
     Table &#34;public.tbl_a&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# \d tbl_b
     Table &#34;public.tbl_b&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# \d tbl_c
     Table &#34;public.tbl_c&#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &#34;tbl_c_pkey&#34; PRIMARY KEY, btree (id)

testdb=# SELECT * FROM tbl_a AS a, tbl_b AS b, tbl_c AS c
testdb-#                WHERE a.id = b.id AND b.id = c.id AND a.data < 40;
```

- **Level 1:** The planner estimates the cheapest paths for all individual tables and stores this information in the corresponding RelOptInfo objects: {tbl_a}, {tbl_b}, and {tbl_c}.
- **Level 2:** The planner identifies all possible pairs of the three tables and estimates the cheapest path for each combination. The results are stored in the corresponding RelOptInfo objects: {tbl_a, tbl_b}, {tbl_b, tbl_c}, and {tbl_a, tbl_c}.
- **Level 3:** The planner finally identifies the cheapest path for the entire query using the previously obtained RelOptInfo objects.

A more detailed description of the Level 3 processing follows (refer to Figure 3.34):

The planner considers three combinations of RelOptInfo objects: {tbl_a, {tbl_b, tbl_c}}, {tbl_b, {tbl_a, tbl_c}}, and {tbl_c, {tbl_a, tbl_b}}. This is expressed as:

$$ \begin{align*} \{\text{tbl_a},\text{tbl_b},\text{tbl_c}\} = \min (\{\text{tbl_a},\{\text{tbl_b},\text{tbl_c}\}\}, \{\text{tbl_b},\{\text{tbl_a},\text{tbl_c}\}\}, \{\text{tbl_c},\{\text{tbl_a},\text{tbl_b}\}\}). \end{align*} $$

The planner then estimates the costs of all possible join paths within these combinations.

For the RelOptInfo object {tbl_c, {tbl_a, tbl_b}}, the planner estimates all combinations of tbl_c and the cheapest path of {tbl_a, tbl_b}. In this example, the cheapest path for {tbl_a, tbl_b} is a hash join where tbl_a and tbl_b are the outer and inner tables, respectively.

As with Level 2, the estimated join paths include nested loop joins, merge joins, hash joins, and their variations. The planner processes the combinations {tbl_a, {tbl_b, tbl_c}} and {tbl_b, {tbl_a, tbl_c}} in the same manner, finally selecting the cheapest overall access path.

The EXPLAIN output for this query is shown below:

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
```

```
testdb=# EXPLAIN SELECT * FROM tbl_a AS a, tbl_b AS b, tbl_c AS c
testdb-#                      WHERE a.id = b.id AND b.id = c.id AND a.data < 40;
                                   QUERY PLAN
--------------------------------------------------------------------------------
 Nested Loop  (cost=170.77..269.94 rows=20 width=24)
   Join Filter: (a.id = c.id)
   ->  Hash Join  (cost=170.49..262.44 rows=20 width=16)
         Hash Cond: (b.id = a.id)
         ->  Seq Scan on tbl_b b  (cost=0.00..73.00 rows=5000 width=8)
         ->  Hash  (cost=170.00..170.00 rows=39 width=8)
               ->  Seq Scan on tbl_a a  (cost=0.00..170.00 rows=39 width=8)
                     Filter: (data < 40)
   ->  Index Scan using tbl_c_pkey on tbl_c c  (cost=0.29..0.36 rows=1 width=8)
         Index Cond: (id = b.id)
(10 rows)
```

Outer relation of Indexed Nested Loop Join The outermost join is an indexed nested loop join (Line 5). The inner relation is a parameterized index scan (Line 13), while the outer relation is the result of the hash join between tbl_b and tbl_a (Lines 7-12).

Consequently, the executor first performs the hash join of tbl_a and tbl_b and then performs the indexed nested loop join with tbl_c.

# 3.7. Parallel Query

[Parallel Query](https://www.postgresql.org/docs/current/parallel-query.html), introduced in version 9.6 (2016), is a feature that processes a single query using multiple background worker processes.

When specific conditions are met, the PostgreSQL process executing the query acts as the Leader. The Leader starts up to a maximum number of Worker processes, as defined by the parameter [max_parallel_workers_per_gather](https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-MIN-PARALLEL-INDEX-SCAN-SIZE). Each Worker process performs a portion of the scan processing and returns its results to the Leader, which then aggregates them to produce the final output.

Figure 3.37 illustrates a parallel sequential scan being processed by two Worker processes.

![](/images/postgres-internals/pgsql03-fig-3-37.webp)

#### Figure 3.37. Parallel Query Concept.

The parameter [parallel_leader_participation](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-PARALLEL-LEADER-PARTICIPATION), introduced in version 11 (and enabled by default), allows the Leader process to assist in query execution while waiting for responses from Workers. To simplify the following explanations and diagrams, however, the Leader process is assumed to wait only (i.e., parallel_leader_participation is off).

PostgreSQL continues to improve Parallel Query capabilities with each release. Table 3.4 highlights key updates from the official release notes.

| Version | Release Year | Description |
| --- | --- | --- |
| 9.6 | 2016 | Seq Scan. Nested Loop Join and Hash Join. |
| 10 | 2017 | Merge Join. B-tree Index Scan, Bitmap Heap Scan. Allow non-correlated subqueries. |
| 11 | 2018 | CREATE INDEX can now use parallel processing while building a B-tree index. Allow hash joins to be performed in parallel using a shared hash table. Allow UNION to run each SELECT in parallel if the individual SELECTs cannot be parallelized. Allow parallelization of commands CREATE TABLE ... AS, SELECT INTO, and CREATE MATERIALIZED VIEW. |
| 12 | 2019 | Allow parallelized queries when in SERIALIZABLE isolation mode. |
| 14 | 2021 | Allow a query referencing multiple foreign tables to perform foreign table scans in parallel. Allow REFRESH MATERIALIZED VIEW to use parallelism. |
| 15 | 2022 | Allow SELECT DISTINCT to be parallelized. Allow a query referencing multiple foreign tables to perform parallel foreign table scans in more cases. Allow parallel commit on postgres_fdw servers. |
| 16 | 2023 | Allow parallelization of FULL and internal right OUTER hash joins. Allow postgres_fdw to do aborts in parallel. |

- **Note:** Parallel Query is primarily a read-only feature and currently does not support cursor operations.

The following sections provide an overview of the Parallel Query architecture, followed by an exploration of parallel join operations and parallel aggregation.

Section Contents

- 3.7.1. Overview
- 3.7.2. Parallel Join
- 3.7.3. Parallel Aggregate

## 3.7.1. Overview

Figure 3.38 illustrates the execution flow of a parallel query in PostgreSQL.

![](/images/postgres-internals/pgsql03-fig-3-38.webp)

#### Figure 3.38. How Parallel Query Performs.

- (1) **Leader Creates Plan:** The optimizer creates a plan tree that includes nodes capable of parallel execution.
- (2) **Leader Stores Shared Information:** To synchronize execution between the Leader and Worker processes, the Leader stores essential information (such as the plan tree and session state) in its Dynamic Shared Memory (DSM) area.
- (3) **Leader Creates Workers:** The Leader starts the background worker processes.
- (4) **Worker Sets Up State:** Each worker reads the shared information from the DSM to initialize its internal state, ensuring an execution environment consistent with the Leader.
- (5) **Worker Scans and Returns Results:** Each worker actively retrieves and scans data blocks on demand by executing functions such as SeqNext() or IndexNext(). These results are then returned to the Leader.
- (6) **Leader Gathers Results:** The Leader receives and aggregates the results from all workers.
- (7) **Cleanup:** After the query finishes, the workers are terminated, and the Leader releases the DSM area.

During parallel query processing, the Leader and Worker processes communicate via the DSM area. The Leader process allocates memory space on demand, allowing worker processes to read and write data to these shared regions.

The following concrete examples utilize Table `d`, created as follows:

```sql
testdb=# CREATE TABLE d (id double precision, data int);
CREATE TABLE
testdb=# INSERT INTO d SELECT i::double precision, (random()*1000)::int FROM generate_series(1, 1000000) AS i;
INSERT 0 1000000
testdb=# ANALYZE;
ANALYZE
```

### 3.7.1.1. Creating Parallel Plan

The optimizer does not always consider a parallel query. It considers parallel execution only when the size of the table to be scanned is greater than or equal to [min_parallel_table_scan_size](https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-MIN-PARALLEL-TABLE-SCAN-SIZE) (default: 8 MB), or if the index size is greater than or equal to [min_parallel_index_scan_size](https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-MIN-PARALLEL-INDEX-SCAN-SIZE) (default: 512 kB).

The following is the simplest parallel query plan:

```
1
2
3
4
5
6
7
8
```

```
testdb=# EXPLAIN SELECT * FROM d WHERE id BETWEEN 1 AND 100;
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Gather  (cost=1000.00..16609.10 rows=1 width=12)
   Workers Planned: 2
   ->  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=12)
         Filter: ((id >= '1'::double precision) AND (id <= '100'::double precision))
(4 rows)
```

As shown above, the simplest parallel plan consists of a `Gather` node and a `Parallel SeqScan` node. Figure 3.39 illustrates the plan tree for this query.

![](/images/postgres-internals/pgsql03-fig-3-39.webp)

#### Figure 3.39. Leader's Plan Tree

The Gather node is specific to parallel queries and collects results from the worker processes. In addition to Gather, parallel queries utilize other specialized nodes:

- **Gather Merge:** Collects results from workers while preserving their sorted order.
- **Parallel Append:** Used for scanning partitioned tables or UNION ALL queries in parallel (see the [Official Documentation](https://www.postgresql.org/docs/current/parallel-plans.html#PARALLEL-APPEND)).
- **Finalize/Partial Aggregate:** Used for parallelizing aggregate functions (see Section 3.7.3).

The subplan tree below the Gather node is executed by worker processes. For a node to be included in this subplan, its ‘parallel_safe’ attribute must be set to `True`. In the example above, the Parallel Seq Scan node and its associated filters are executed by the workers.

### 3.7.1.2. Storing Shared Information

To execute a query collaboratively, the Leader stores information required by the Worker processes in its Dynamic Shared Memory (DSM) area.

The information shared between the Leader and Workers is categorized into two main types: **Execution State** and **Query**.

- **Execution State:** This encompasses the environmental information necessary for both the Leader and Workers to execute the same query consistently. (Refer to [README.parallel](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/README.parallel) for a comprehensive list). Key components include: All configuration parameters (GUCs).
- The transaction snapshot and the current subtransaction’s ID (see [Chapter 5](/book/postgres-internals/pgsql05/index) for details).
- The set of libraries dynamically loaded via [dfmgr.c](https://github.com/postgres/postgres/blob/master/src/backend/utils/fmgr/dfmgr.c).

This state is stored by the [InitializeParallelDSM()](https://github.com/postgres/postgres/blob/0d884f570b72c5b030f7908032946078537ea121/src/backend/access/transam/parallel.c#L207) function.

**Query Information:** This includes data specific to the execution plan and data access methods:

- The PlannedStmt and ParamListInfo structures.
- The specialized descriptors for nodes executed by Workers. For example, a Parallel Seq Scan node uses ParallelTableScanDesc, while an Index Scan node uses ParallelIndexScanDesc. Detailed initialization is handled by [ExecParallelInitializeDSM()](https://github.com/postgres/postgres/blob/97525bc5c8ffb31475d23955d08e9ec9c1408f33/src/backend/executor/execParallel.c#L438).
- Instrumentation and resource usage structures for reporting purposes.

This information is stored by the [ExecInitParallelPlan()](https://github.com/postgres/postgres/blob/0d884f570b72c5b030f7908032946078537ea121/src/backend/executor/execParallel.c#L587) function.

Additionally, the Leader allocates a TupleQueue (defined in [tqueue.c](https://github.com/postgres/postgres/blob/master/src/backend/executor/tqueue.c)) within the DSM. This queue serves as the communication channel through which the Leader reads the results returned by the Workers.

### 3.7.1.3. Creating Workers

The number of workers in the query plan may be different from the number of workers actually started. This is because the total number of workers is limited by the [max_parallel_workers](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-MAX-PARALLEL-WORKERS) parameter. Also, there may not be enough worker slots if other parallel queries are running at the same time.

The EXPLAIN ANALYZE command displays both the “Planned” and “Launched” number of Workers, allowing for verification of resource allocation.

```
testdb=# EXPLAIN ANALYZE SELECT * FROM d WHERE id BETWEEN 1 AND 100;
                                                    QUERY PLAN
------------------------------------------------------------------------------------------------------------------
 Gather  (cost=1000.00..16609.10 rows=1 width=12) (actual time=60.035..60.994 rows=100 loops=1)
   Workers Planned: 2
   Workers Launched: 2
   ->  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=12) (actual time=31.073..52.248 rows=50 loops=2)
         Filter: ((id >= '1'::double precision) AND (id <= '100'::double precision))
         Rows Removed by Filter: 499950
 Planning Time: 0.265 ms
 Execution Time: 61.012 ms
(8 rows)
```

### 3.7.1.4. Setting Up Workers

Upon startup, each Worker reads the shared Execution State and Query information prepared by the Leader in the DSM.

By applying the Execution State, the Worker initializes its environment to match the Leader’s session precisely. This ensures that configuration parameters, transaction snapshots, and loaded libraries are consistent across all processes involved in the query.

To process the query, the Worker reconstructs its own plan tree from the shared PlannedStmt. The [ExecSerializePlan()](https://github.com/postgres/postgres/blob/6e80951f49f3bc18b5bdfb7e87bc2e0bcfb4af00/src/backend/executor/execParallel.c#L145) function (and its counterparts) is used to create a sub-plan tree consisting only of parallel_safe nodes &mdash; typically the portion of the Leader’s plan tree located beneath the Gather node.

Figure 3.40 illustrates the relationship between the Leader’s plan tree and the plan tree created for the Worker.

![](/images/postgres-internals/pgsql03-fig-3-40.webp)

#### Figure 3.40. Worker's Plan Tree Created from Leader's Plan Tree

### 3.7.1.5. Scanning Rows and Returning Results

As discussed in Section 3.4.1.1, the executor’s methods for accessing data tuples are highly abstracted. This principle also applies to parallel queries.

Since the Leader and Workers share the query execution environment via the DSM, a single sequential scan can be executed in parallel. Each process actively retrieves and scans data blocks on demand by calling the SeqNext() function.

Similarly, the results are returned to the Gather node via the TupleQueue located in the DSM.

### 3.7.1.6. Gathering Results

The Gather node is a specific node for parallel queries that collects the results returned by the Workers.

## 3.7.2. Parallel Join

Parallel queries in PostgreSQL support nested loop joins, merge joins, and hash joins.

The following examples utilize tables `d` and `f`.

```sql
testdb=# CREATE TABLE d (id double precision, data int);
CREATE TABLE
testdb=# INSERT INTO d SELECT i::double precision, (random()*1000)::int FROM generate_series(1, 1000000) AS i;
INSERT 0 1000000
testdb=# CREATE INDEX d_id_idx ON d (id);
CREATE INDEX
testdb=# CREATE TABLE f (id double precision, data int);
CREATE TABLE
testdb=# INSERT INTO f SELECT i::double precision, (random()*1000)::int FROM generate_series(1, 10000000) AS i;
INSERT 0 10000000
testdb=# \d d
                      Table &#34;public.d&#34;
 Column |       Type       | Collation | Nullable | Default
--------+------------------+-----------+----------+---------
 id     | double precision |           |          |
 data   | integer          |           |          |
Indexes:
    &#34;d_id_idx&#34; btree (id)

testdb=# \d f
                      Table &#34;public.f&#34;
 Column |       Type       | Collation | Nullable | Default
--------+------------------+-----------+----------+---------
 id     | double precision |           |          |
 data   | integer          |           |          |

testdb=# ANALYZE;
ANALYZE
```

### 3.7.2.1. Nested Loop Join

In a standard parallel nested loop join, the inner table is not processed in parallel. Instead, each Worker must process the entire inner table independently.

For example, in a materialized nested loop join, each Worker materializes its own copy of the inner table. This redundancy makes the join less efficient as the number of workers increases.

```
testdb=# SET enable_nestloop = ON;
SET
testdb=# SET enable_mergejoin = OFF;
SET
testdb=# SET enable_hashjoin = OFF;
SET

testdb=# EXPLAIN SELECT * FROM d, f WHERE d.data = f.data AND f.id < 10000;
                                  QUERY PLAN
-------------------------------------------------------------------------------
 Gather  (cost=1000.00..97163469.29 rows=9651513 width=24)
   Workers Planned: 2
   ->  Nested Loop  (cost=0.00..96197317.99 rows=4825756 width=24)
         Join Filter: (d.data = f.data)
         ->  Parallel Seq Scan on f  (cost=0.00..121935.99 rows=4831 width=12)
               Filter: (id < '10000'::double precision)
         ->  Materialize  (cost=0.00..27992.00 rows=1000000 width=12)
               ->  Seq Scan on d  (cost=0.00..18109.00 rows=1000000 width=12)
(8 rows)
```

![](/images/postgres-internals/pgsql03-fig-3-41.webp)

#### Figure 3.41. Materialize Nested Loop Join in Parallel Query.

In contrast, an Indexed Nested Loop Join is much more efficient. While the inner table scan itself is not “shared,” each Worker uses the index to quickly retrieve only the relevant rows from the inner table.

```
testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id AND f.id < 10000;
                                  QUERY PLAN
-------------------------------------------------------------------------------
 Gather  (cost=1000.42..142818.71 rows=967 width=24)
   Workers Planned: 2
   ->  Nested Loop  (cost=0.42..141722.01 rows=484 width=24)
         ->  Parallel Seq Scan on f  (cost=0.00..121935.99 rows=4831 width=12)
               Filter: (id < '10000'::double precision)
         ->  Index Scan using d_id_idx on d  (cost=0.42..4.09 rows=1 width=12)
               Index Cond: (id = f.id)
(7 rows)
```

![](/images/postgres-internals/pgsql03-fig-3-42.webp)

#### Figure 3.42. Indexed Nested Loop Join in Parallel Query.

### 3.7.2.2. Merge Join

Similar to nested loop joins, a standard merge join processes the inner table for all rows. Consequently, each Worker must perform its own sorting process for the inner table independently.

However, if the inner table is accessed using an index scan, the join operation can be performed efficiently, similar to an Indexed Nested Loop Join.

```
testdb=# SET enable_nestloop = OFF;
SET
testdb=# SET enable_mergejoin = ON;
SET
testdb=# SET enable_hashjoin = OFF;
SET
testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id AND d.id < 100000;
                                       QUERY PLAN
----------------------------------------------------------------------------------------
 Gather  (cost=837387.83..853944.33 rows=97361 width=24)
   Workers Planned: 2
   ->  Merge Join  (cost=836387.83..843208.23 rows=48680 width=24)
         Merge Cond: (f.id = d.id)
         ->  Sort  (cost=836385.61..848880.80 rows=4998079 width=12)
               Sort Key: f.id
               ->  Parallel Seq Scan on f  (cost=0.00..109440.79 rows=4998079 width=12)
         ->  Index Scan using d_id_idx on d  (cost=0.42..3569.24 rows=97361 width=12)
               Index Cond: (id < '100000'::double precision)
(9 rows)
```

### 3.7.2.3. Hash Join

In PostgreSQL versions 9.6 and 10, each Worker involved in a parallel hash join builds its own private hash table for the inner table. This leads to high memory usage and redundant work.

```
testdb=# SET enable_nestloop = OFF;
SET
testdb=# SET enable_mergejoin = OFF;
SET
testdb=# SET enable_hashjoin = ON;
SET
testdb=# SET enable_parallel_hash = OFF;
SET
testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id;
                                    QUERY PLAN
----------------------------------------------------------------------------------
 Gather  (cost=36492.00..323368.59 rows=1000000 width=24)
   Workers Planned: 2
   ->  Hash Join  (cost=35492.00..222368.59 rows=500000 width=24)
         Hash Cond: (f.id = d.id)
         ->  Parallel Seq Scan on f  (cost=0.00..109440.79 rows=4998079 width=12)
         ->  Hash  (cost=18109.00..18109.00 rows=1000000 width=12)
               ->  Seq Scan on d  (cost=0.00..18109.00 rows=1000000 width=12)
(7 rows)
```

Parallel Hash Join was introduced in version 11 (controlled by the [enable_parallel_hash](https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-ENABLE-PARALLEL-HASH) parameter, which is on by default). With this feature, all Workers cooperate to build a shared hash table in the DSM. This allows for a more efficient build phase and reduces memory overhead.

```
testdb=# SET enable_parallel_hash = ON;
SET
testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id;
                                      QUERY PLAN
--------------------------------------------------------------------------------------
 Gather  (cost=22801.00..304736.59 rows=1000000 width=24)
   Workers Planned: 2
   ->  Parallel Hash Join  (cost=21801.00..203736.59 rows=500000 width=24)
         Hash Cond: (f.id = d.id)
         ->  Parallel Seq Scan on f  (cost=0.00..109440.79 rows=4998079 width=12)
         ->  Parallel Hash  (cost=13109.00..13109.00 rows=500000 width=12)
               ->  Parallel Seq Scan on d  (cost=0.00..13109.00 rows=500000 width=12)
(7 rows)
```

## 3.7.3. Parallel Aggregate

Most aggregate functions in PostgreSQL can be processed in parallel. Whether a specific function supports parallelization depends on whether its `Partial Mode` is set to `YES` in the [Official Documentation](https://www.postgresql.org/docs/current/functions-aggregate.html).

The planner chooses between two primary strategies based on the estimated number of target rows.

### 3.7.3.1. Strategy 1: Simple Aggregation (Small Row Count)

When the predicted number of rows is small, workers perform the scan, but the actual aggregation happens in the Leader process:

1. Each Worker scans rows via a Parallel Seq Scan node.
2. The Gather node receives these raw rows from the Workers.
3. The Aggregate node calculates the final result from the gathered rows.

```
testdb=# EXPLAIN SELECT avg(id) FROM d where id BETWEEN 1 AND 10;
                                        QUERY PLAN
------------------------------------------------------------------------------------------
 Aggregate  (cost=16609.10..16609.11 rows=1 width=8)
   ->  Gather  (cost=1000.00..16609.10 rows=1 width=8)
         Workers Planned: 2
         ->  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=8)
               Filter: ((id >= '1'::double precision) AND (id <= '10'::double precision))
(5 rows)

testdb=# EXPLAIN SELECT var_pop(id) FROM d where id BETWEEN 1 AND 10;
                                        QUERY PLAN
------------------------------------------------------------------------------------------
 Aggregate  (cost=16609.10..16609.11 rows=1 width=8)
   ->  Gather  (cost=1000.00..16609.10 rows=1 width=8)
         Workers Planned: 2
         ->  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=8)
               Filter: ((id >= '1'::double precision) AND (id <= '10'::double precision))
(5 rows)
```

### 3.7.3.2. Strategy 2: Partial/Finalize Aggregation (Large Row Count)

When the predicted number of rows is large, it is more efficient to reduce the data volume before sending it over the DSM:

1. Each Worker performs a Partial Aggregate on its locally scanned rows.
2. The Gather node collects these intermediate, partially aggregated results (rather than raw rows).
3. The Finalize Aggregate node combines the intermediate results into a final answer.

```
testdb=# EXPLAIN SELECT avg(id) FROM d where data > 100;
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=16485.14..16485.15 rows=1 width=8)
   ->  Gather  (cost=16484.93..16485.14 rows=2 width=32)
         Workers Planned: 2
         ->  Partial Aggregate  (cost=15484.93..15484.94 rows=1 width=32)
               ->  Parallel Seq Scan on d  (cost=0.00..14359.00 rows=450371 width=8)
                     Filter: (data > 100)
(6 rows)

testdb=# EXPLAIN  SELECT var_pop(id) FROM d where data > 100;
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=16485.14..16485.15 rows=1 width=8)
   ->  Gather  (cost=16484.93..16485.14 rows=2 width=32)
         Workers Planned: 2
         ->  Partial Aggregate  (cost=15484.93..15484.94 rows=1 width=32)
               ->  Parallel Seq Scan on d  (cost=0.00..14359.00 rows=450371 width=8)
                     Filter: (data > 100)
(6 rows)
```

### 3.7.3.3. Mathematical Logic for Parallel Aggregation

To combine results from different workers (e.g., sums, averages, and variances), PostgreSQL uses the following formulas (See Appendix 1.2 for details):

$$ \begin{align*} S_{n} &= S_{n_{1}} + S_{n_{2}} \\ A_{n} &= \frac{1}{n_{1} + n_{2}} (S_{n_{1}} + S_{n_{2}} ) \\ V_{n} &= (V_{n_{1}} + V_{n_{2}}) + \frac{n_{1} n_{2}}{n_{1} + n_{2}} \left(\frac{S_{n_{1}}}{n_{1}} - \frac{S_{n_{2}}}{n_{2}} \right)^{2} \end{align*} $$

The Finalize Aggregate node uses these formulas to merge the partial results. For queries involving three or more workers, this process is repeated iteratively to reach the final value.
