const s="postgres-internals",a="pgsql03",n="معالجة الاستعلامات",t="index",e="معالجة الاستعلامات",p=[{depth:2,id:"311-المحلل-النحوي",text:"3.1.1. المحلّل النحوي"},{depth:2,id:"312-المحلل-analyzeranalyser",text:"3.1.2. المحلّل (Analyzer/Analyser)"},{depth:2,id:"313-المعيد-الكتابة",text:"3.1.3. المُعيد الكتابة"},{depth:3,id:"3131-طرق-العرض",text:"3.1.3.1. طرق العرض"},{depth:2,id:"314-المخطط-والمنفذ",text:"3.1.4. المخطِّط والمنفِّذ"},{depth:2,id:"321-المسح-التسلسلي",text:"3.2.1. المسح التسلسلي"},{depth:2,id:"322-مسح-الفهرس",text:"3.2.2. مسح الفهرس"},{depth:3,id:"3221-كلفة-البدء",text:"3.2.2.1. كلفة البدء"},{depth:3,id:"3222-كلفة-التشغيل",text:"3.2.2.2. كلفة التشغيل"},{depth:3,id:"3223-الكلفة-الإجمالية",text:"3.2.2.3. الكلفة الإجمالية"},{depth:2,id:"323-الفرز",text:"3.2.3. الفرز"},{depth:2,id:"324-تقدير-العدد-الأساسي-cardinality-estimation",text:"3.2.4. تقدير العدد الأساسي (Cardinality Estimation)"},{depth:3,id:"3241-الانتقائية-مقابل-العدد-الأساسي",text:"3.2.4.1. الانتقائية مقابل العدد الأساسي"},{depth:3,id:"3242-بيان-صعوبة-تقدير-العدد-الأساسي",text:"3.2.4.2. بيان صعوبة تقدير العدد الأساسي"},{depth:3,id:"3243-حل-جزئي-الإحصاءات-الموسعة",text:"3.2.4.3. حل جزئي: الإحصاءات الموسَّعة"},{depth:2,id:"331-المعالجة-المسبقة",text:"3.3.1. المعالجة المسبقة"},{depth:2,id:"332-تحديد-مسار-الوصول-الأقل-كلفة",text:"3.3.2. تحديد مسار الوصول الأقل كلفة"},{depth:3,id:"3321-المثال-الأول",text:"3.3.2.1. المثال الأول"},{depth:3,id:"3322-المثال-الثاني",text:"3.3.2.2. المثال الثاني"},{depth:2,id:"333-إنشاء-شجرة-الخطة",text:"3.3.3. إنشاء شجرة الخطة"},{depth:3,id:"3331-المثال-الأول",text:"3.3.3.1. المثال الأول"},{depth:3,id:"3332-المثال-الثاني",text:"3.3.3.2. المثال الثاني"},{depth:2,id:"341-كيفية-عمل-المنفذ",text:"3.4.1. كيفية عمل المنفِّذ"},{depth:3,id:"3411-دوال-المسح",text:"3.4.1.1. دوال المسح"},{depth:3,id:"3412-الملفات-المؤقتة",text:"3.4.1.2. الملفات المؤقتة"},{depth:2,id:"342-الدوال-التجميعية",text:"3.4.2. الدوال التجميعية"},{depth:3,id:"3421-المجموع-والمتوسط",text:"3.4.2.1. المجموع والمتوسط"},{depth:3,id:"3422-التباين",text:"3.4.2.2. التباين"},{depth:2,id:"343-القيود",text:"3.4.3. القيود"},{depth:3,id:"3431-قيود-not-null-وcheck",text:"3.4.3.1. قيود NOT NULL وCHECK"},{depth:3,id:"3432-قيود-primary-key-وunique",text:"3.4.3.2. قيود PRIMARY KEY وUNIQUE"},{depth:3,id:"3433-قيود-foreign-key",text:"3.4.3.3. قيود FOREIGN KEY"},{depth:2,id:"361-المعالجة-المسبقة",text:"3.6.1. المعالجة المسبقة"},{depth:2,id:"362-تحديد-المسار-الأقل-كلفة",text:"3.6.2. تحديد المسار الأقل كلفة"},{depth:3,id:"3621-المعالجة-في-المستوى-1",text:"3.6.2.1. المعالجة في المستوى 1"},{depth:3,id:"3622-المعالجة-في-المستوى-2",text:"3.6.2.2. المعالجة في المستوى 2"},{depth:2,id:"363-تحديد-المسار-الأقل-كلفة-لاستعلام-بثلاثة-جداول",text:"3.6.3. تحديد المسار الأقل كلفة لاستعلام بثلاثة جداول"},{depth:2,id:"371-نظرة-عامة",text:"3.7.1. نظرة عامة"},{depth:3,id:"3711-إنشاء-الخطة-المتوازية",text:"3.7.1.1. إنشاء الخطة المتوازية"},{depth:3,id:"3712-تخزين-المعلومات-المشتركة",text:"3.7.1.2. تخزين المعلومات المشتركة"},{depth:3,id:"3713-إنشاء-العمال",text:"3.7.1.3. إنشاء العمال"},{depth:3,id:"3714-تهيئة-العمال",text:"3.7.1.4. تهيئة العمال"},{depth:3,id:"3715-مسح-الصفوف-وإعادة-النتائج",text:"3.7.1.5. مسح الصفوف وإعادة النتائج"},{depth:3,id:"3716-جمع-النتائج",text:"3.7.1.6. جمع النتائج"},{depth:2,id:"372-الربط-المتوازي",text:"3.7.2. الربط المتوازي"},{depth:3,id:"3721-الربط-بالحلقة-المتداخلة",text:"3.7.2.1. الربط بالحلقة المتداخلة"},{depth:3,id:"3722-الربط-بالدمج",text:"3.7.2.2. الربط بالدمج"},{depth:3,id:"3723-الربط-بالتجزئة",text:"3.7.2.3. الربط بالتجزئة"},{depth:2,id:"373-التجميع-المتوازي",text:"3.7.3. التجميع المتوازي"},{depth:3,id:"3731-الاستراتيجية-1-تجميع-بسيط-عدد-صفوف-صغير",text:"3.7.3.1. الاستراتيجية 1: تجميع بسيط (عدد صفوف صغير)"},{depth:3,id:"3732-الاستراتيجية-2-تجميع-جزئينهائي-عدد-صفوف-كبير",text:"3.7.3.2. الاستراتيجية 2: تجميع جزئي/نهائي (عدد صفوف كبير)"},{depth:3,id:"3733-المنطق-الرياضي-للتجميع-المتوازي",text:"3.7.3.3. المنطق الرياضي للتجميع المتوازي"}],l=`<h1>3.1. نظرة عامة (Overview)</h1>
<p>في PostgreSQL، تتولى عملية خلفية واحدة عادةً معالجة جميع الاستعلامات التي يصدرها عميل متصل.</p>
<p>وتتكوّن الواجهة الخلفية من خمسة أنظمة فرعية رئيسية:</p>
<ol>
<li><strong>المحلّل النحوي (Parser):</strong> يُنشئ شجرة تحليل من عبارة SQL نصية.</li>
<li><strong>المحلّل (Analyzer/Analyser):</strong> يجري تحليلًا دلاليًا لشجرة التحليل ويُنشئ شجرة استعلام.</li>
<li><strong>المُعيد الكتابة (Rewriter):</strong> يحوّل شجرة الاستعلام وفقًا للقواعد المخزَّنة في <a href="http://www.postgresql.org/docs/current/static/rules.html">نظام القواعد</a>، إن وُجدت مثل هذه القواعد.</li>
<li><strong>المخطِّط (Planner):</strong> يُنشئ شجرة خطة هي الأكثر كفاءة من شجرة الاستعلام.</li>
<li><strong>المنفِّذ (Executor):</strong> ينفّذ الاستعلام بالوصول إلى الجداول والفهارس بالترتيب المحدد في شجرة الخطة.</li>
</ol>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-01.webp" alt=""></p>
<h4>الشكل 3.1. معالجة الاستعلامات.</h4>
<p>يقدّم هذا القسم نظرة عامة على هذه الأنظمة الفرعية. ولأن المخطِّط والمنفِّذ بالغي التعقيد، تُشرح وظائفهما بالتفصيل في الأقسام اللاحقة.</p>
<p>محتويات القسم</p>
<ul>
<li>3.1.1. المحلّل النحوي</li>
<li>3.1.2. المحلّل (Analyzer/Analyser)</li>
<li>3.1.3. المُعيد الكتابة</li>
<li>3.1.4. المخطِّط والمنفِّذ</li>
</ul>
<h2 id="311-المحلل-النحوي">3.1.1. المحلّل النحوي</h2>
<p>يُنشئ المحلّل النحوي شجرة تحليل من عبارة SQL نصية يمكن للأنظمة الفرعية اللاحقة معالجتها. وفيما يلي مثال محدد يوضّح هذه العملية.</p>
<p>لنتأمل الاستعلام التالي:</p>
<pre><code>testdb=# SELECT id, data FROM tbl_a WHERE id &lt; 300 ORDER BY data;
</code></pre>
<p>شجرة التحليل بنية بيانات جذرها بنية <code>SelectStmt</code> المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/include/nodes/parsenodes.h">parsenodes.h</a>.</p>
<p>ويوضّح الشكل 3.2(ب) شجرة التحليل للاستعلام الموضّح في الشكل 3.2(أ).</p>
<p>** ** SelectStmt</p>
<pre><code>typedef struct SelectStmt
{
	NodeTag		type;

	/*
	 * These fields are used only in &amp;#34;leaf&amp;#34; SelectStmts.
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
	 * In a &amp;#34;leaf&amp;#34; node representing a VALUES list, the above fields are all
	 * null, and instead this field is set.  Note that the elements of the
	 * sublists are just expressions, without ResTarget decoration. Also note
	 * that a list element can be DEFAULT (represented as a SetToDefault
	 * node), regardless of the context of the VALUES list. It's up to parse
	 * analysis to reject that where not valid.
	 */
	List	   *valuesLists;	/* untransformed list of expression lists */

	/*
	 * These fields are used in both &amp;#34;leaf&amp;#34; SelectStmts and upper-level
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
</code></pre>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-02.webp" alt=""></p>
<h4>الشكل 3.2. مثال على شجرة تحليل.</h4>
<p>تُقابل عناصر استعلام SELECT عُقدًا مقابلة في شجرة التحليل، ويُشار إليها بالأرقام المتطابقة في الشكل 3.2. على سبيل المثال:</p>
<ul>
<li>(1) عنصر في قائمة الأهداف، يمثّل العمود ‘id’.</li>
<li>(4) يمثّل عبارة WHERE.</li>
</ul>
<p>ويتحقق المحلّل النحوي من صحة بناء الجملة للاستعلام المُدخَل فقط. وبناءً على ذلك، لا يُعيد خطأً إلا إذا كان الاستعلام يحتوي على مخالفة نحوية.</p>
<p>ولا يجري المحلّل النحوي فحوصًا دلالية؛ فعلى سبيل المثال، لن يُعيد خطأً حتى إذا أشار الاستعلام إلى جدول غير موجود. وتتولى جميع عمليات التحقق الدلالي وظيفة المحلّل (analyzer/analyser).</p>
<h2 id="312-المحلل-analyzeranalyser">3.1.2. المحلّل (Analyzer/Analyser)</h2>
<p>يجري المحلّل تحليلًا دلاليًا لشجرة التحليل التي أنشأها المحلّل النحوي، ويُنتج شجرة استعلام.</p>
<p>وجذر شجرة الاستعلام هو بنية <code>Query</code> المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/include/nodes/parsenodes.h">parsenodes.h</a>. وتحتوي هذه البنية على بيانات وصفية للاستعلام — مثل نوع الأمر (SELECT وINSERT وغيرهما) — وعلى عدة أوراق. وتشكّل كل ورقة قائمة أو شجرة تحمل بيانات لعبارة محددة.</p>
<p>** ** Query</p>
<pre><code class="language-python">/*
 * Query -
 *	  Parse analysis turns <span class="hljs-built_in">all</span> statements into a Query tree
 *	  <span class="hljs-keyword">for</span> further processing by the rewriter <span class="hljs-keyword">and</span> planner.
 *
 *	  Utility statements (i.e. non-optimizable statements) have the
 *	  utilityStmt field <span class="hljs-built_in">set</span>, <span class="hljs-keyword">and</span> the rest of the Query <span class="hljs-keyword">is</span> mostly dummy.
 *
 *	  Planning converts a Query tree into a Plan tree headed by a PlannedStmt
 *	  node --- the Query structure <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> used by the executor.
 *
 *	  All the fields ignored <span class="hljs-keyword">for</span> the query jumbling are <span class="hljs-keyword">not</span> semantically
 *	  significant (such <span class="hljs-keyword">as</span> alias names), <span class="hljs-keyword">as</span> <span class="hljs-keyword">is</span> ignored anything that can
 *	  be deduced <span class="hljs-keyword">from</span> child nodes (<span class="hljs-keyword">else</span> we<span class="hljs-string">&#x27;d just be double-hashing that
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
	 * We store this as a signed value as this is the form it&#x27;</span>s displayed to
	 * users <span class="hljs-keyword">in</span> places such <span class="hljs-keyword">as</span> EXPLAIN <span class="hljs-keyword">and</span> pg_stat_statements.  Primarily this
	 * <span class="hljs-keyword">is</span> done due to lack of an SQL <span class="hljs-built_in">type</span> to represent the full <span class="hljs-built_in">range</span> of
	 * uint64.
	 */
	int64		queryId pg_node_attr(equal_ignore, query_jumble_ignore, read_write_ignore, read_as(<span class="hljs-number">0</span>));

	/* do I <span class="hljs-built_in">set</span> the command result tag? */
	<span class="hljs-built_in">bool</span>		canSetTag pg_node_attr(query_jumble_ignore);

	Node	   *utilityStmt;	/* non-null <span class="hljs-keyword">if</span> commandType == CMD_UTILITY */

	/*
	 * rtable index of target relation <span class="hljs-keyword">for</span> INSERT/UPDATE/DELETE/MERGE; <span class="hljs-number">0</span> <span class="hljs-keyword">for</span>
	 * SELECT.  This <span class="hljs-keyword">is</span> ignored <span class="hljs-keyword">in</span> the query jumble <span class="hljs-keyword">as</span> unrelated to the
	 * compilation of the query ID.
	 */
	<span class="hljs-built_in">int</span>			resultRelation pg_node_attr(query_jumble_ignore);

	/* has aggregates <span class="hljs-keyword">in</span> tlist <span class="hljs-keyword">or</span> havingQual */
	<span class="hljs-built_in">bool</span>		hasAggs pg_node_attr(query_jumble_ignore);
	/* has window functions <span class="hljs-keyword">in</span> tlist */
	<span class="hljs-built_in">bool</span>		hasWindowFuncs pg_node_attr(query_jumble_ignore);
	/* has <span class="hljs-built_in">set</span>-returning functions <span class="hljs-keyword">in</span> tlist */
	<span class="hljs-built_in">bool</span>		hasTargetSRFs pg_node_attr(query_jumble_ignore);
	/* has subquery SubLink */
	<span class="hljs-built_in">bool</span>		hasSubLinks pg_node_attr(query_jumble_ignore);
	/* distinctClause <span class="hljs-keyword">is</span> <span class="hljs-keyword">from</span> DISTINCT ON */
	<span class="hljs-built_in">bool</span>		hasDistinctOn pg_node_attr(query_jumble_ignore);
	/* WITH RECURSIVE was specified */
	<span class="hljs-built_in">bool</span>		hasRecursive pg_node_attr(query_jumble_ignore);
	/* has INSERT/UPDATE/DELETE/MERGE <span class="hljs-keyword">in</span> WITH */
	<span class="hljs-built_in">bool</span>		hasModifyingCTE pg_node_attr(query_jumble_ignore);
	/* FOR [KEY] UPDATE/SHARE was specified */
	<span class="hljs-built_in">bool</span>		hasForUpdate pg_node_attr(query_jumble_ignore);
	/* rewriter has applied some RLS policy */
	<span class="hljs-built_in">bool</span>		hasRowSecurity pg_node_attr(query_jumble_ignore);
	/* parser has added an RTE_GROUP RTE */
	<span class="hljs-built_in">bool</span>		hasGroupRTE pg_node_attr(query_jumble_ignore);
	/* <span class="hljs-keyword">is</span> a RETURN statement */
	<span class="hljs-built_in">bool</span>		isReturn pg_node_attr(query_jumble_ignore);

	<span class="hljs-type">List</span>	   *cteList;		/* WITH <span class="hljs-built_in">list</span> (of CommonTableExp<span class="hljs-string">r&#x27;s) */

	List	   *rtable;			/* list of range table entries */

	/*
	 * list of RTEPermissionInfo nodes for the rtable entries having
	 * perminfoindex &gt; 0
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
	 * the defaults &amp;#34;old&amp;#34; and &amp;#34;new&amp;#34;, or NULL (if the default &amp;#34;old&amp;#34;/&amp;#34;new&amp;#34; is
	 * already in use as the alias for some other relation).
	 */
	char	   *returningOldAlias pg_node_attr(query_jumble_ignore);
	char	   *returningNewAlias pg_node_attr(query_jumble_ignore);
	List	   *returningList;	/* return-values list (of TargetEntry) */

	List	   *groupClause;	/* a list of SortGroupClause&#x27;</span>s */
	<span class="hljs-built_in">bool</span>		groupDistinct;	/* <span class="hljs-keyword">is</span> the group by clause distinct? */

	<span class="hljs-type">List</span>	   *groupingSets;	/* a <span class="hljs-built_in">list</span> of GroupingSe<span class="hljs-string">t&#x27;s if present */

	Node	   *havingQual;		/* qualifications applied to groups */

	List	   *windowClause;	/* a list of WindowClause&#x27;</span>s */

	<span class="hljs-type">List</span>	   *distinctClause; /* a <span class="hljs-built_in">list</span> of SortGroupClause<span class="hljs-string">&#x27;s */

	List	   *sortClause;		/* a list of SortGroupClause&#x27;</span>s */

	Node	   *limitOffset;	/* <span class="hljs-comment"># of result tuples to skip (int8 expr) */</span>
	Node	   *limitCount;		/* <span class="hljs-comment"># of result tuples to return (int8 expr) */</span>
	LimitOption limitOption;	/* limit <span class="hljs-built_in">type</span> */

	<span class="hljs-type">List</span>	   *rowMarks;		/* a <span class="hljs-built_in">list</span> of RowMarkClause<span class="hljs-string">&#x27;s */

	Node	   *setOperations;	/* set-operation tree if this is top level of
								 * a UNION/INTERSECT/EXCEPT query */

	/*
	 * A list of pg_constraint OIDs that the query depends on to be
	 * semantically valid
	 */
	List	   *constraintDeps pg_node_attr(query_jumble_ignore);

	/* a list of WithCheckOption&#x27;</span>s (added during rewrite) */
	<span class="hljs-type">List</span>	   *withCheckOptions pg_node_attr(query_jumble_ignore);

	/*
	 * The following two fields identify the portion of the source text string
	 * containing this query.  They are typically only populated <span class="hljs-keyword">in</span> top-level
	 * Queries, <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> sub-queries.  When <span class="hljs-keyword">not</span> <span class="hljs-built_in">set</span>, they might both be zero, <span class="hljs-keyword">or</span>
	 * both be -<span class="hljs-number">1</span> meaning &amp;<span class="hljs-comment">#34;unknown&amp;#34;.</span>
	 */
	/* start location, <span class="hljs-keyword">or</span> -<span class="hljs-number">1</span> <span class="hljs-keyword">if</span> unknown */
	ParseLoc	stmt_location;
	/* length <span class="hljs-keyword">in</span> <span class="hljs-built_in">bytes</span>; <span class="hljs-number">0</span> means &amp;<span class="hljs-comment">#34;rest of string&amp;#34; */</span>
	ParseLoc	stmt_len pg_node_attr(query_jumble_ignore);
} Query;
</code></pre>
<p>يوضّح الشكل 3.3 شجرة الاستعلام للاستعلام الموضّح في الشكل 3.2(أ) من القسم الفرعي السابق.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-03.webp" alt=""></p>
<h4>الشكل 3.3. شجرة استعلام استعلام SELECT في الشكل 3.2.</h4>
<p>وتُلخَّص شجرة الاستعلام الموضّحة أعلاه كما يلي:</p>
<ul>
<li><strong>targetlist:</strong> قائمة بالأعمدة التي تشكّل نتيجة الاستعلام. في هذا المثال، تحتوي القائمة على عمودين: ‘id’ و‘data’. وإذا استخدم الاستعلام المُدخَل نجمة (’*’), فإن المحلّل يوسّعها صراحةً إلى جميع الأعمدة المتاحة.</li>
<li><strong>range table:</strong> قائمة بالعلاقات (الجداول) المستخدمة في الاستعلام. في هذا المثال، يحمل جدول النطاق بيانات وصفية للجدول ’tbl_a’، مثل معرّف OID الخاص به واسمه.</li>
<li><strong>jointree:</strong> بنية تخزّن عبارتي FROM وWHERE.</li>
<li><strong>sortClause:</strong> قائمة ببنى <code>SortGroupClause</code>.</li>
</ul>
<p>ويصف <a href="http://www.postgresql.org/docs/current/static/querytree.html">التوثيق الرسمي</a> تفاصيل أشجار الاستعلام بإيجاز.</p>
<h2 id="313-المعيد-الكتابة">3.1.3. المُعيد الكتابة</h2>
<p>المُعيد الكتابة هو النظام الفرعي القائم على <a href="http://www.postgresql.org/docs/current/static/rules.html">نظام القواعد</a>. وهو يحوّل شجرة الاستعلام وفقًا للقواعد المخزَّنة في كتالوج النظام <a href="http://www.postgresql.org/docs/current/static/view-pg-rules.html">pg_rules</a>، عند الاقتضاء.</p>
<p>ورغم أن المُعيد الكتابة ونظام القواعد ميزتان قويتان، يركّز هذا القسم على كيفية تنفيذهما لـ <a href="https://www.postgresql.org/docs/current/static/rules-views.html">طرق العرض</a>، باستخدام مثال محدد.</p>
<h3 id="3131-طرق-العرض">3.1.3.1. طرق العرض</h3>
<p>عند تعريف طريقة عرض بالأمر <a href="http://www.postgresql.org/docs/current/static/sql-createview.html">CREATE VIEW</a>، تُنشأ قاعدة مقابلة تلقائيًا وتُخزَّن في كتالوج النظام.</p>
<p>افترض أن طريقة العرض التالية قد عُرِّفت وأن قاعدتها المقابلة مخزَّنة في كتالوج النظام pg_rules:</p>
<pre><code>sampledb=# CREATE VIEW employees_list
sampledb-#      AS SELECT e.id, e.name, d.name AS department
sampledb-#            FROM employees AS e, departments AS d WHERE e.department_id = d.id;
</code></pre>
<p>وعند إصدار الاستعلام الموضّح أدناه، يُنشئ المحلّل النحوي شجرة تحليل كما هو موضّح في الشكل 3.4(أ).</p>
<pre><code>sampledb=# SELECT * FROM employees_list;
</code></pre>
<p>في هذه المرحلة، يحوّل المُعيد الكتابة عقدة جدول النطاق إلى شجرة تحليل استعلام فرعي بناءً على تعريف طريقة العرض المخزَّن في كتالوج النظام pg_rules.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-04.webp" alt=""></p>
<h4>الشكل 3.4. مثال على مرحلة إعادة الكتابة.</h4>
<p>** معلومة</p>
<p>ولأن PostgreSQL ينفّذ طرق العرض باستخدام هذه الآلية، لم تكن قابلة للتحديث قبل الإصدار 9.2 (عام 2012). ورغم أن طرق العرض القابلة للتحديث أُدخلت في الإصدار 9.3 (عام 2013)، فلا تزال هناك عدة قيود. لمزيد من التفاصيل، راجع <a href="https://www.postgresql.org/docs/current/static/sql-createview.html#SQL-CREATEVIEW-UPDATABLE-VIEWS">التوثيق الرسمي</a>.</p>
<h2 id="314-المخطط-والمنفذ">3.1.4. المخطِّط والمنفِّذ</h2>
<p>يستقبل المخطِّط شجرة استعلام من المُعيد الكتابة ويُنشئ شجرة خطة (استعلام) مُحسَّنة للتنفيذ الفعّال بواسطة المنفِّذ.</p>
<p>ويعتمد مخطِّط PostgreSQL على <strong>التحسين القائم على الكلفة</strong> المحض؛ فهو لا يدعم التحسين القائم على القواعد ولا التلميحات. وبوصفه أكثر النظام الفرعي تعقيدًا في PostgreSQL، تُقدَّم نظرة عامة مفصلة على المخطِّط في الأقسام اللاحقة من هذا الفصل.</p>
<p>** pg_hint_plan وpg_plan_advice</p>
<p>قبل الإصدار 19، لم يكن PostgreSQL يدعم أصليًا تلميحات المخطِّط في SQL الأساسية، ما جعل إضافة <a href="https://github.com/ossc-db/pg_hint_plan">pg_hint_plan</a> الخيار الأساسي للمطوّرين.</p>
<p>ويقدّم الإصدار 19 (عام 2026) <a href="https://www.postgresql.org/docs/19/pgplanadvice.html">pg_plan_advice</a> كوحدة مساهمة، فتصبح تلميحات الاستعلام متاحة رسميًا.</p>
<p>وعلى غرار أنظمة إدارة قواعد البيانات العلائقية الأخرى، يعرض الأمر <a href="http://www.postgresql.org/docs/current/static/sql-explain.html">EXPLAIN</a> في PostgreSQL شجرة الخطة. ويرد مثال محدد أدناه:</p>
<pre><code>1
2
3
4
5
6
7
8
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT * FROM tbl_a WHERE id &lt; 300 ORDER BY data;
                          QUERY PLAN
---------------------------------------------------------------
 Sort  (cost=182.34..183.09 rows=300 width=8)
   Sort Key: data
   -&gt;  Seq Scan on tbl_a  (cost=0.00..170.00 rows=300 width=8)
         Filter: (id &lt; 300)
(4 rows)
</code></pre>
<p>يمثّل هذا المخرَج شجرة الخطة الموضّحة في الشكل 3.5.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-05.webp" alt=""></p>
<h4>الشكل 3.5. شجرة خطة بسيطة والعلاقة بين شجرة الخطة ونتيجة الأمر EXPLAIN.</h4>
<p>تتكوّن شجرة الخطة من عناصر تُسمى <strong>عُقد الخطة</strong> (plan nodes)، وهي مرتبطة بقائمة plantree في بنية <code>PlannedStmt</code>. وهذه العناصر معرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/include/nodes/plannodes.h">plannodes.h</a>. لمزيد من التفاصيل، راجع القسم 3.3.3 والقسم 3.5.4.2.</p>
<p>وتحتوي كل عقدة خطة على البيانات الوصفية التي يحتاجها المنفِّذ. وفي استعلام ذي جدول واحد، تتدفق البيانات عبر شجرة الخطة من الأوراق (الأسفل) إلى الجذر. ويتبع هذا التنفيذ <strong>نموذج البركان</strong> (Volcano Model) (المعروف أيضًا باسم <strong>نموذج المكرِّر</strong> Iterator Model)، حيث تُعالَج الصفوف وتُمرَّر إلى الأعلى واحدًا واحدًا.</p>
<p>على سبيل المثال، تتكوّن شجرة الخطة في الشكل 3.5 من عقدة Sort وعقدة مسح تسلسلي. وبناءً على ذلك، ينفّذ المنفِّذ مسحًا تسلسليًا للجدول <em>tbl_a</em> ثم يفرز النتيجة المستردة<a href="#fn:1">1</a>.</p>
<p>ويتفاعل المنفِّذ مع الجداول والفهارس عبر مدير المخازن المؤقتة، كما هو موصوف في <a href="/arabic-cs-library/book/postgres-internals/pgsql08/index">الفصل 8</a>. وأثناء المعالجة، يستخدم المنفِّذ مناطق الذاكرة المخصَّصة مثل temp_buffers وwork_mem، ويُنشئ ملفات مؤقتة إذا تجاوزت البيانات الذاكرة المتاحة. انظر الشكل 3.6.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-06.webp" alt=""></p>
<h4>الشكل 3.6. العلاقة بين المنفِّذ ومدير المخازن المؤقتة والملفات المؤقتة.</h4>
<p>علاوة على ذلك، عند الوصول إلى الصفوف، يستخدم PostgreSQL آلية تحكّم بالتزامن للحفاظ على ذرّية وعزل المعاملات النشطة. وتُفصَّل هذه الآلية في <a href="/arabic-cs-library/book/postgres-internals/pgsql05/index">الفصل 5</a>.</p>
<ol>
<li>من منظور تدفق التحكّم بدلًا من تدفق البيانات، يعالج المنفِّذ شجرة الخطة من الأعلى إلى الأسفل. فمثلًا، في هذا المثال، يستدعي المنفِّذ عقدة Sort، التي تُشغِّل بدورها عقدة المسح التسلسلي. <a href="#fnref:1">↩︎</a></li>
</ol>
<h1>3.2. تقدير الكلفة في استعلام ذي جدول واحد</h1>
<p>يستخدم PostgreSQL نموذج تحسين استعلامات <strong>قائمًا على الكلفة</strong>. والكلف قيم بلا أبعاد؛ فهي لا تعمل كمؤشرات أداء مطلقة، بل تُستخدم لمقارنة الأداء النسبي لعمليات مختلفة.</p>
<p>وتُقدَّر الكلف بواسطة الدوال المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c">costsize.c</a>. ولكل عملية ينفّذها المنفِّذ دالة كلفة مقابلة. على سبيل المثال، تُحسَب كلفتا المسح التسلسلي ومسح الفهرس بواسطة cost_seqscan() وcost_index() على التوالي.</p>
<p>ويصنّف PostgreSQL الكلف إلى ثلاثة أنواع: <strong>كلفة البدء</strong> (start-up) و<strong>كلفة التشغيل</strong> (run) و<strong>الكلفة الإجمالية</strong> (total). ولأن الكلفة الإجمالية هي مجموع كلفة البدء وكلفة التشغيل، فإن الكلفتين الأوليين فقط تُقدَّران بشكل مستقل.</p>
<ul>
<li><strong>كلفة البدء (Start-up cost):</strong> الكلفة المتكبَّدة قبل جلب أول صف (tuple). وفي مسح الفهرس، تشمل هذه الكلفة كلفة قراءة صفحات الفهرس للوصول إلى أول صف في الجدول الهدف.</li>
<li><strong>كلفة التشغيل (Run cost):</strong> كلفة جلب جميع الصفوف.</li>
<li><strong>الكلفة الإجمالية (Total cost):</strong> الكلفة الكلية، وتُحسَب كمجموع كلفتي البدء والتشغيل.</li>
</ul>
<p>ويعرض الأمر <a href="https://www.postgresql.org/docs/current/static/sql-explain.html">EXPLAIN</a> كلفة البدء والكلفة الإجمالية لكل عملية. ويُعرض مثال أساسي أدناه:</p>
<pre><code>1
2
3
4
5
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT * FROM tbl;
                       QUERY PLAN
---------------------------------------------------------
 Seq Scan on tbl  (cost=0.00..145.00 rows=10000 width=8)
(1 row)
</code></pre>
<p>في السطر 4، يقدّم المخرَج تفاصيل المسح التسلسلي. ويحتوي قسم الكلفة على قيمتين: <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.00</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">145.00</span></span></span></span>، تمثّلان كلفة البدء والكلفة الإجمالية على التوالي.</p>
<p>ويستكشف هذا القسم عمليات التقدير للمسح التسلسلي ومسح الفهرس وعمليات الفرز بالتفصيل.</p>
<p>وتستخدم الأمثلة التالية الجدول والفهرس المعرَّفين أدناه:</p>
<pre><code>testdb=# CREATE TABLE tbl (id int PRIMARY KEY, data int);
testdb=# CREATE INDEX tbl_data_idx ON tbl (data);
testdb=# INSERT INTO tbl SELECT generate_series(1,10000),generate_series(1,10000);
testdb=# ANALYZE;
testdb=# \\d tbl
      Table &amp;#34;public.tbl&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &amp;#34;tbl_pkey&amp;#34; PRIMARY KEY, btree (id)
    &amp;#34;tbl_data_idx&amp;#34; btree (data)
</code></pre>
<p>محتويات القسم</p>
<ul>
<li>3.2.1. المسح التسلسلي</li>
<li>3.2.2. مسح الفهرس</li>
<li>3.2.3. الفرز</li>
<li>3.2.4. تقدير العدد الأساسي</li>
</ul>
<h2 id="321-المسح-التسلسلي">3.2.1. المسح التسلسلي</h2>
<p>تُقدَّر كلفة المسح التسلسلي بواسطة الدالة cost_seqscan(). ويستكشف هذا القسم الفرعي تقدير الكلفة للاستعلام التالي:</p>
<pre><code>testdb=# SELECT * FROM tbl WHERE id &lt;= 8000;
</code></pre>
<p>في المسح التسلسلي، تكون كلفة البدء <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>. وتُعرَّف كلفة التشغيل بالمعادلة التالية:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 108: …mp;= (\\text{cpu_̲tuple_cost} + \\…" style="color:#cc0000">\\begin{aligned} \\text{&#x27;run cost&#x27;} &amp;amp;= \\text{&#x27;cpu run cost&#x27;} + \\text{&#x27;disk run cost&#x27;} \\ &amp;amp;= (\\text{cpu_tuple_cost} + \\text{cpu_operator_cost}) \\times N_{\\text{tuple}} + \\text{seq_page_cost} \\times N_{\\text{page}} \\end{aligned}</span></p>
<p>حيث:</p>
<p><a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-SEQ-PAGE-COST">seq_page_cost</a> و<a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-CPU-TUPLE-COST">cpu_tuple_cost</a> و<a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-CPU-OPERATOR-COST">cpu_operator_cost</a> معاملات تُضبَط في ملف postgresql.conf. وقيمها الافتراضية <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1.0</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.01</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.0025</span></span></span></span> على التوالي. و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">tuple</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">page</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span> هما عدد جميع صفوف هذا الجدول وجميع صفحاته على التوالي. ويمكن استرداد هاتين القيمتين باستخدام الاستعلام التالي:</p>
<pre><code>testdb=# SELECT relpages, reltuples FROM pg_class WHERE relname = 'tbl';
 relpages | reltuples
----------+-----------
       45 |     10000
(1 row)
</code></pre>
<p>وبناءً على نتيجة الاستعلام:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Multiple \\tag" style="color:#cc0000">\\begin{align} N_{\\text{tuple}} &amp;amp;= 10000 \\tag{3-1} \\ N_{\\text{page}} &amp;amp;= 45 \\tag{3-2} \\end{align}</span></p>
<p>لذلك،</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’run cost’</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mopen">(</span><span class="mord">0.01</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.0025</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">10000</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">45</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">170.0</span><span class="mspace"> </span><span class="mord text"><span class="mord">’total cost’</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">170.0</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">170</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>وتؤكّد نتيجة الأمر EXPLAIN هذه التقديرات:</p>
<pre><code>1
2
3
4
5
6
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT * FROM tbl WHERE id &lt;= 8000;
                       QUERY PLAN
--------------------------------------------------------
 Seq Scan on tbl  (cost=0.00..170.00 rows=8000 width=8)
   Filter: (id &lt;= 8000)
(2 rows)
</code></pre>
<p>في السطر 4، يُظهر المخرَج كلفة البدء والكلفة الإجمالية بالقيمتين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.00</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">170.00</span></span></span></span>. ويقدّر المخطِّط أيضًا أن <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">8000</span></span></span></span> صف سيُختار.</p>
<p>ويعرض السطر 5 عامل التصفية: «<span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;&amp;&#x27; at position 12: (\\text{id} &amp;̲lt;= 8000)" style="color:#cc0000">(\\text{id} &amp;lt;= 8000)</span>»، المعروف رسميًا باسم <em>مُسند تصفية على مستوى الجدول</em> (table-level filter predicate).</p>
<p>ولاحظ أن هذا النوع من عوامل التصفية يُطبَّق بعد قراءة جميع الصفوف من الجدول؛ فهو لا يقلّل نطاق الصفحات الممسوحة على القرص.</p>
<p>** معلومة</p>
<p>كما يظهر في تقدير كلفة التشغيل، يفترض PostgreSQL أنه يجب قراءة جميع الصفحات من التخزين. ولا يأخذ المحسِّن في الاعتبار ما إذا كانت الصفحات الممسوحة مقيمة حاليًا في المخازن المؤقتة المشتركة.</p>
<h2 id="322-مسح-الفهرس">3.2.2. مسح الفهرس</h2>
<p>رغم أن PostgreSQL يدعم <a href="https://www.postgresql.org/docs/current/static/indexes-types.html">أساليب فهرسة</a> متنوعة — مثل B-Tree و<a href="https://www.postgresql.org/docs/current/static/gist.html">GiST</a> و<a href="https://www.postgresql.org/docs/current/static/gin.html">GIN</a> و<a href="https://www.postgresql.org/docs/current/static/brin.html">BRIN</a> — فإن كلفة مسح الفهرس تُقدَّر باستخدام دالة الكلفة المشتركة <a href="https://github.com/postgres/postgres/blob/ef6e028f05b3e4ab23c5edfdfff457e0d2a649f6/src/backend/optimizer/path/costsize.c#L549">cost_index()</a>.</p>
<p>ويشرح هذا القسم الفرعي عملية تقدير كلفة مسح الفهرس للاستعلام التالي:</p>
<pre><code>testdb=# SELECT id, data FROM tbl WHERE data &lt;= 240;
</code></pre>
<p>وقبل التقدير، يجب تحديد عدد صفحات الفهرس (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">index,page</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>) وصفوف الفهرس (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">index,tuple</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>):</p>
<pre><code>testdb=# SELECT relpages, reltuples FROM pg_class WHERE relname = 'tbl_data_idx';
 relpages | reltuples
----------+-----------
       30 |     10000
(1 row)
</code></pre>
<p>وبناءً على نتيجة الاستعلام:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Multiple \\tag" style="color:#cc0000">\\begin{align} N_{\\text{index,tuple}} &amp;amp;= 10000 \\tag{3-3} \\ N_{\\text{index,page}} &amp;amp;= 30 \\tag{3-4} \\end{align}</span></p>
<h3 id="3221-كلفة-البدء">3.2.2.1. كلفة البدء</h3>
<p>تمثّل كلفة بدء مسح الفهرس الكلفة المتكبَّدة من قراءة صفحات الفهرس للوصول إلى أول صف في الجدول الهدف. وتُعرَّف بالمعادلة التالية:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 141: …times \\text{cpu_̲operator_cost} …" style="color:#cc0000">\\begin{align*} \\text{&#x27;start-up cost&#x27;} = {\\mathrm{ceil}(\\log_2 (N_{\\text{index,tuple}})) + (H_{\\text{index}} + 1) \\times 50} \\times \\text{cpu_operator_cost} \\end{align*}</span></p>
<p>في هذه المعادلة، <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0813em;">H</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0813em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">index</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> هو ارتفاع شجرة الفهرس. وتُوثَّق تفاصيل هذا الحساب في تعليقات <a href="https://github.com/postgres/postgres/blob/ef6e028f05b3e4ab23c5edfdfff457e0d2a649f6/src/backend/utils/adt/selfuncs.c#L7022">btcostestimate()</a>.</p>
<p>في هذا المثال، <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">index,tuple</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span> يساوي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">10000</span></span></span></span> وفقًا للمعادلة (3-3)، و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0813em;">H</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0813em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">index</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> يساوي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>. وباستخدام القيمة الافتراضية <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.0025</span></span></span></span> لـ <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 10: \\text{cpu_̲operator_cost}" style="color:#cc0000">\\text{cpu_operator_cost}</span>، يكون الحساب كما يلي:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’start-up cost’</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mord"><span class="mord mathrm">ceil</span></span><span class="mopen">(</span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord">10000</span><span class="mclose">))</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">50</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.0025</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0.285</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-5</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></p>
<h3 id="3222-كلفة-التشغيل">3.2.2.2. كلفة التشغيل</h3>
<p>كلفة تشغيل مسح الفهرس هي مجموع كلفتي المعالج ومدخلات/مخرجات الجدول والفهرس معًا:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’run cost’</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mopen">(</span><span class="mord text"><span class="mord">’index cpu cost’</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">’table cpu cost’</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord text"><span class="mord">’index IO cost’</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">’table IO cost’</span></span><span class="mclose">)</span><span class="mord">.</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>** معلومة</p>
<p>إذا طُبِّق <a href="https://www.postgresql.org/docs/current/static/indexes-index-only-scans.html">المسح بالفهرس فقط</a> (الموصوف في القسم 7.2)، فلا تُقدَّر <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord text"><span class="mord">’table cpu cost’</span></span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord text"><span class="mord">’table IO cost’</span></span></span></span></span>.</p>
<p>وتُحسَب المكوّنات الثلاثة الأولى كما يلي:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 113: …imes (\\text{cpu_̲index_tuple_cos…" style="color:#cc0000">\\begin{align*} \\text{&#x27;index cpu cost&#x27;} &amp;amp;= \\text{Selectivity} \\times N_{\\text{index,tuple}} \\times (\\text{cpu_index_tuple_cost} + \\text{qual_op_cost}) \\ \\text{&#x27;table cpu cost&#x27;} &amp;amp;= \\text{Selectivity} \\times N_{\\text{tuple}} \\times \\text{cpu_tuple_cost} \\ \\text{&#x27;index IO cost&#x27;} &amp;amp;= \\mathrm{ceil}(\\text{Selectivity} \\times N_{\\text{index,page}}) \\times \\text{random_page_cost} \\end{align*}</span></p>
<p>حيث:</p>
<ul>
<li><a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-CPU-INDEX-TUPLE-COST">cpu_index_tuple_cost</a> و<a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-RANDOM-PAGE-COST">random_page_cost</a> معاملان يُضبَطان في postgresql.conf (القيمتان الافتراضيتان <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.005</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">4.0</span></span></span></span> على التوالي).</li>
<li><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 11: \\text{qual_̲op_cost}" style="color:#cc0000">\\text{qual_op_cost}</span> يمثّل كلفة تقييم مُسند الفهرس (القيمة الافتراضية <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.0025</span></span></span></span>).</li>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord text"><span class="mord">Selectivity</span></span></span></span></span> هي النسبة المقدَّرة لنطاق بحث الفهرس الذي يحقّق عبارة WHERE (قيمة عشرية بين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>). و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord text"><span class="mord">Selectivity</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">tuple</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span> تمثّل عدد صفوف الجدول الواجب قراءتها.</li>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord text"><span class="mord">Selectivity</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">index,page</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span> تمثّل عدد صفحات الفهرس الواجب قراءتها.</li>
</ul>
<p>وتُوصف الانتقائية (Selectivity) بالتفصيل في ** التالي.</p>
<p>** الانتقائية (Selectivity)</p>
<p>تُقدَّر انتقائية مُسندات الاستعلام باستخدام إما <strong>القيم الأكثر شيوعًا (MCV)</strong> وإما <strong>حدود المدرج التكراري (histogram_bounds)</strong>، وكلاهما مخزَّن كإحصاءات في <a href="https://www.postgresql.org/docs/current/static/view-pg-stats.html">pg_stats</a>.</p>
<p>وفيما يلي وصف موجز لحساب الانتقائية بأمثلة محددة. لمزيد من التفاصيل، راجع <a href="https://www.postgresql.org/docs/current/static/row-estimation-examples.html">التوثيق الرسمي</a>.</p>
<h4>القيم الأكثر شيوعًا (MCV)</h4>
<p>تُخزَّن قيم MCV لكل عمود في عرض pg_stats في عمودين مرتبطين:</p>
<ul>
<li><strong>most_common_vals:</strong> قائمة بأكثر القيم تكرارًا في العمود.</li>
<li><strong>most_common_freqs:</strong> قائمة بتكرارات تلك القيم.</li>
</ul>
<p>لنتأمل جدولًا باسم «countries» بالبنية التالية:</p>
<ul>
<li><strong>country:</strong> اسم البلد.</li>
<li><strong>continent:</strong> القارة التي ينتمي إليها البلد.</li>
</ul>
<p>** ** countries</p>
<pre><code>  1
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
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">--</span>
<span class="hljs-comment">-- PostgreSQL database dump</span>
<span class="hljs-comment">--</span>

<span class="hljs-comment">-- Dumped from database version 9.6.0</span>
<span class="hljs-comment">-- Dumped by pg_dump version 9.6.0</span>

<span class="hljs-keyword">SET</span> statement_timeout <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">SET</span> lock_timeout <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">SET</span> idle_in_transaction_session_timeout <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">SET</span> client_encoding <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;UTF8&#x27;</span>;
<span class="hljs-keyword">SET</span> standard_conforming_strings <span class="hljs-operator">=</span> <span class="hljs-keyword">on</span>;
<span class="hljs-keyword">SET</span> check_function_bodies <span class="hljs-operator">=</span> <span class="hljs-literal">false</span>;
<span class="hljs-keyword">SET</span> client_min_messages <span class="hljs-operator">=</span> warning;
<span class="hljs-keyword">SET</span> row_security <span class="hljs-operator">=</span> off;

<span class="hljs-keyword">SET</span> search_path <span class="hljs-operator">=</span> public, pg_catalog;

<span class="hljs-keyword">SET</span> default_tablespace <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;&#x27;</span>;

<span class="hljs-keyword">SET</span> default_with_oids <span class="hljs-operator">=</span> <span class="hljs-literal">false</span>;

<span class="hljs-comment">--</span>
<span class="hljs-comment">-- Name: countries; Type: TABLE; Schema: public; Owner: postgres</span>
<span class="hljs-comment">--</span>

<span class="hljs-keyword">CREATE TABLE</span> countries (
    continent text,
    country text
);

<span class="hljs-keyword">ALTER TABLE</span> countries OWNER <span class="hljs-keyword">TO</span> postgres;

<span class="hljs-comment">--</span>
<span class="hljs-comment">-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres</span>
<span class="hljs-comment">--</span>

<span class="hljs-keyword">COPY</span> countries (continent, country) <span class="hljs-keyword">FROM</span> stdin;
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
Africa	Guinea<span class="hljs-operator">-</span>Bissau
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
Africa	Sao Tome <span class="hljs-keyword">and</span> Principe
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
Europe	Bosnia <span class="hljs-keyword">and</span> Herzegovina
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
North America	Antigua <span class="hljs-keyword">and</span> Barbuda
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
North America	Saint Kitts <span class="hljs-keyword">and</span> Nevis
North America	Saint Lucia
North America	Saint Vincent <span class="hljs-keyword">and</span> the Grenadines
North America	Trinidad <span class="hljs-keyword">and</span> Tobago
North America	United States
Oceania	Australia
Oceania	Fiji
Oceania	Kiribati
Oceania	Marshall Islands
Oceania	Micronesia
Oceania	Nauru
Oceania	<span class="hljs-keyword">New</span> Zealand
Oceania	Palau
Oceania	Papua <span class="hljs-keyword">New</span> Guinea
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
\\.

<span class="hljs-comment">--</span>
<span class="hljs-comment">-- Name: idx_continent; Type: INDEX; Schema: public; Owner: postgres</span>
<span class="hljs-comment">--</span>

<span class="hljs-keyword">CREATE</span> INDEX idx_continent <span class="hljs-keyword">ON</span> countries <span class="hljs-keyword">USING</span> btree (continent);

<span class="hljs-comment">--</span>
<span class="hljs-comment">-- PostgreSQL database dump complete</span>
<span class="hljs-comment">--</span>
</code></pre>
<pre><code>testdb=# \\d countries
   Table &amp;#34;public.countries&amp;#34;
  Column   | Type | Modifiers
-----------+------+-----------
 country   | text |
 continent | text |
Indexes:
    &amp;#34;continent_idx&amp;#34; btree (continent)

testdb=# SELECT continent, count(*) AS &amp;#34;number of countries&amp;#34;,
testdb-#     (count(*)/(SELECT count(*) FROM countries)::real) AS &amp;#34;number of countries / all countries&amp;#34;
testdb-#       FROM countries GROUP BY continent ORDER BY &amp;#34;number of countries&amp;#34; DESC;
   continent   | number of countries | number of countries / all countries
---------------+---------------------+-------------------------------------
 Africa        |                  53 |                   0.274611398963731
 Europe        |                  47 |                   0.243523316062176
 Asia          |                  44 |                   0.227979274611399
 North America |                  23 |                   0.119170984455959
 Oceania       |                  14 |                  0.0725388601036269
 South America |                  12 |                  0.0621761658031088
(6 rows)
</code></pre>
<p>بالنسبة لاستعلام يحتوي على العبارة <strong>WHERE continent = ‘Asia’</strong>، يقدّر المخطِّط الكلفة باستخدام قيمة MCV للعمود ‘continent’:</p>
<pre><code>testdb=# SELECT * FROM countries WHERE continent = 'Asia';
</code></pre>
<p>لإجراء هذا التقدير، يرجع المخطِّط إلى ‘most_common_vals’ و‘most_common_freqs’ في عرض pg_stats:</p>
<pre><code>testdb=# \\x
Expanded display is on.
testdb=# SELECT most_common_vals, most_common_freqs FROM pg_stats
testdb-#                  WHERE tablename = 'countries' AND attname='continent';
-[ RECORD 1 ]-----+-------------------------------------------------------------
most_common_vals  | {Africa,Europe,Asia,&amp;#34;North America&amp;#34;,Oceania,&amp;#34;South America&amp;#34;}
most_common_freqs | {0.274611,0.243523,0.227979,0.119171,0.0725389,0.0621762}
</code></pre>
<p>وكما هو موضّح أعلاه، فإن التكرار في most_common_freqs المقابل لـ ‘Asia’ في most_common_vals هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.227979</span></span></span></span>. وبناءً على ذلك، تُعتمد هذه القيمة انتقائيةً لتقدير الكلفة.</p>
<h4>حدود المدرج التكراري (histogram_bounds)</h4>
<p>إذا لم تكن قيم MCV متاحة — على سبيل المثال، عند التعامل مع أنواع صحيحة أو عشرية مزدوجة الدقة فريدة أو شديدة التنوّع — تُستخدم حدود المدرج التكراري (histogram_bounds).</p>
<ul>
<li><strong>histogram_bounds:</strong> قائمة بالقيم التي تقسم بيانات العمود إلى مجموعات (دِلاء) متساوية في السكان تقريبًا.</li>
</ul>
<p>فيما يلي مثال على حدود المدرج التكراري للعمود ‘data’ في الجدول <em>tbl</em>:</p>
<pre><code>testdb=# SELECT histogram_bounds FROM pg_stats WHERE tablename = 'tbl' AND attname = 'data';
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
</code></pre>
<p>بشكل افتراضي، يقسم histogram_bounds البيانات إلى 100 دلو. ويوضّح الشكل 3.7 هذه الدلاء وحدودها المقابلة.</p>
<p>وتُرقَّم الدلاء بدءًا من 0، وتحتوي كل دلو على العدد نفسه تقريبًا من الصفوف.</p>
<p>وتمثّل قيم histogram_bounds حدود هذه الدلاء. على سبيل المثال، إذا كانت القيمة رقم 0 من حدود المدرج هي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> والقيمة رقم 1 هي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span>، فإن الدلو[0] يحتوي على صفوف قيمها في النطاق $[1,100)$ (أي القيم الأكبر من أو المساوية لـ <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> والأقل من <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span>).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-07.webp" alt=""></p>
<h4>الشكل 3.7. الدلاء وhistogram_bounds.</h4>
<p>يُحسَب انتقائية الاستعلام <strong>WHERE</strong> <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;&amp;&#x27; at position 13: \\text{data} &amp;̲lt;= 240" style="color:#cc0000">\\text{data} &amp;lt;= 240</span> كما يلي. وبما أن القيمة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">240</span></span></span></span> تقع في الدلو الثاني (بين الحدين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">200</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">300</span></span></span></span>)، يُطبَّق الاستقراء الخطي:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.113em;vertical-align:-0.8065em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3065em;"><span style="top:-3.3065em;"><span class="pstrut" style="height:3.427em;"></span><span class="mord"><span class="mord text"><span class="mord">Selectivity</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8065em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3065em;"><span style="top:-3.3065em;"><span class="pstrut" style="height:3.427em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">100</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">240</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">hb[2]</span></span><span class="mclose">)</span><span class="mord">/</span><span class="mopen">(</span><span class="mord text"><span class="mord">hb[3]</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">hb[2]</span></span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace"> </span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8065em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3065em;"><span style="top:-3.3065em;"><span class="pstrut" style="height:3.427em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">100</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">240</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">200</span><span class="mclose">)</span><span class="mord">/</span><span class="mopen">(</span><span class="mord">300</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">200</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">100</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">40/100</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace"> </span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8065em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3065em;"><span style="top:-3.3065em;"><span class="pstrut" style="height:3.427em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0.024</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8065em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3065em;"><span style="top:-3.3065em;"><span class="pstrut" style="height:3.427em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-6</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8065em;"><span></span></span></span></span></span></span></span></span></p>
<p>وبناءً على المعادلات (3-1) و(3-3) و(3-4) و(3-6)، تُحسَب الكلف كما يلي:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Multiple \\tag" style="color:#cc0000">\\begin{align*} \\text{&#x27;index cpu cost&#x27;} &amp;amp;= 0.024 \\times 10000 \\times (0.005 + 0.0025) = 1.8 \\tag{3-7} \\ \\text{&#x27;table cpu cost&#x27;} &amp;amp;= 0.024 \\times 10000 \\times 0.01 = 2.4 \\tag{3-8} \\ \\text{&#x27;index IO cost&#x27;} &amp;amp;= \\mathrm{ceil}(0.024 \\times 30) \\times 4.0 = 4.0 \\tag{3-9} \\end{align*}</span></p>
<p>وتُعرَّف <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord text"><span class="mord">’table IO cost’</span></span></span></span></span> بالمعادلة التالية:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 50: …t&#x27;} = \\text{max_̲IO_cost} + \\tex…" style="color:#cc0000">\\begin{align*} \\text{&#x27;table IO cost&#x27;} = \\text{max_IO_cost} + \\text{indexCorrelation}^2 \\times (\\text{min_IO_cost} - \\text{max_IO_cost}) \\end{align*}</span></p>
<p>يمثّل <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 10: \\text{max_̲IO_cost}" style="color:#cc0000">\\text{max_IO_cost}</span> أسوأ كلفة إدخال/إخراج، وتحدث عند مسح جميع صفحات الجدول عشوائيًا:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 25: …ign*} \\text{max_̲IO_cost} = N_{\\…" style="color:#cc0000">\\begin{align*} \\text{max_IO_cost} = N_{\\text{page}} \\times \\text{random_page_cost} \\end{align*}</span></p>
<p>وباستخدام <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">page</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">45</span></span></span></span> من المعادلة (3-2):</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 24: …lign} \\text{max_̲IO_cost} = 45 \\…" style="color:#cc0000">\\begin{align} \\text{max_IO_cost} = 45 \\times 4.0 = 180.0 \\tag{3-10} \\end{align}</span></p>
<p>ويمثّل <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 10: \\text{min_̲IO_cost}" style="color:#cc0000">\\text{min_IO_cost}</span> أفضل كلفة إدخال/إخراج، وتحدث عند مسح صفحات الجدول المختارة تسلسليًا:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 25: …ign*} \\text{min_̲IO_cost} = 1 \\t…" style="color:#cc0000">\\begin{align*} \\text{min_IO_cost} = 1 \\times \\text{random_page_cost} + (\\mathrm{ceil}(\\text{Selectivity} \\times N_{\\text{page}}) - 1) \\times \\text{seq_page_cost} \\end{align*}</span></p>
<p>في هذه الحالة،</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 24: …lign} \\text{min_̲IO_cost} = 1 \\t…" style="color:#cc0000">\\begin{align} \\text{min_IO_cost} = 1 \\times 4.0 + (\\mathrm{ceil}(0.024 \\times 45)) - 1) \\times 1.0 = 5.0 \\tag{3-11} \\end{align}</span></p>
<p>تُناقَش <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord text"><span class="mord">indexCorrelation</span></span></span></span></span> بالتفصيل في ** التالي. وفي هذا المثال، الارتباط هو:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">indexCorrelation</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">1.0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-12</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></p>
<p>وبناءً على ذلك، وفقًا للمعادلات (3-10) و(3-11) و(3-12):</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2241em;vertical-align:-0.3621em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8621em;"><span style="top:-2.9979em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’table IO cost’</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">180.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1.</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">5.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">180.0</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">5.0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3621em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8621em;"><span style="top:-2.9979em;"><span class="pstrut" style="height:3em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-13</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3621em;"><span></span></span></span></span></span></span></span></span></p>
<p>وأخيرًا، تُحدَّد كلفة التشغيل الإجمالية بدمج المعادلات (3-7) و(3-8) و(3-9) و(3-13):</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’run cost’</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mopen">(</span><span class="mord">1.8</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2.4</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">4.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">5.0</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">13.2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-14</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></p>
<p>** ارتباط الفهرس (Index Correlation)</p>
<p>ارتباط الفهرس (index correlation) هو الارتباط الإحصائي بين ترتيب الصفوف الفيزيائي والترتيب المنطقي لقيم العمود (كما هو معرَّف في التوثيق الرسمي). وتتراوح هذه القيمة بين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord">1</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">+</span><span class="mord">1</span></span></span></span>.</p>
<p>ويوضّح المثال التالي العلاقة بين مسح الفهرس وارتباط الفهرس.</p>
<p>يتكوّن الجدول <em>tbl_corr</em> من خمسة أعمدة: عمودان من نوع نصي وثلاثة من نوع صحيح.</p>
<p>وتخزّن الأعمدة الصحيحة قيمًا من <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> إلى <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">12</span></span></span></span>. ومن الناحية الفيزيائية، يتكوّن <em>tbl_corr</em> من ثلاث صفحات، وتحتوي كل صفحة على أربعة صفوف. ولكل عمود صحيح فهرس B-Tree مقابل.</p>
<pre><code>testdb=# \\d tbl_corr
    Table &amp;#34;public.tbl_corr&amp;#34;
  Column  |  Type   | Modifiers
----------+---------+-----------
 col      | text    |
 col_asc  | integer |
 col_desc | integer |
 col_rand | integer |
 data     | text    |
Indexes:
    &amp;#34;tbl_corr_asc_idx&amp;#34; btree (col_asc)
    &amp;#34;tbl_corr_desc_idx&amp;#34; btree (col_desc)
    &amp;#34;tbl_corr_rand_idx&amp;#34; btree (col_rand)
</code></pre>
<p>والتوزيع المنطقي للبيانات كما يلي:</p>
<pre><code>testdb=# SELECT col,col_asc,col_desc,col_rand
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
</code></pre>
<p>ويُستردّ ارتباط الفهرس لهذه الأعمدة من عرض pg_stats:</p>
<pre><code>testdb=# SELECT tablename,attname, correlation FROM pg_stats WHERE tablename = 'tbl_corr';
 tablename | attname  | correlation
-----------+----------+-------------
 tbl_corr  | col_asc  |           1
 tbl_corr  | col_desc |          -1
 tbl_corr  | col_rand |    0.125874
(3 rows)
</code></pre>
<p>لنتأمل استعلامًا يستهدف قيمًا بين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">4</span></span></span></span> في ‘col_asc’:</p>
<pre><code>testdb=# SELECT * FROM tbl_corr WHERE col_asc BETWEEN 2 AND 4;
</code></pre>
<p>ولأن ترتيب الصفوف الفيزيائي يطابق ترتيب الفهرس المنطقي (الارتباط = <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>)، فإن جميع الصفوف الهدف مخزَّنة في الصفحة الأولى. وبناءً على ذلك، يحتاج المنفِّذ إلى قراءة صفحة واحدة فقط، كما هو موضّح في الشكل 3.8(أ).</p>
<p>وفي المقابل، لنتأمل استعلامًا مماثلًا على ‘col_rand’:</p>
<pre><code>testdb=# SELECT * FROM tbl_corr WHERE col_rand BETWEEN 2 AND 4;
</code></pre>
<p>وبسبب الارتباط المنخفض (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.125874</span></span></span></span>)، تتوزّع الصفوف الهدف على مواقع فيزيائية مختلفة. وهذا يتطلب من المنفِّذ قراءة جميع الصفحات، كما هو موضّح في الشكل 3.8(ب).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-08.webp" alt=""></p>
<h4>الشكل 3.8. مثالان على ارتباط الفهرس.</h4>
<p>وفي النهاية، ارتباط الفهرس مقياس إحصائي يُستخدم أثناء تقدير الكلفة ليعكس تأثير الوصول العشوائي إلى الإدخال/الإخراج. وهو يراعي التباين بين ترتيب الفهرس والترتيب الفيزيائي للصفوف داخل الجدول.</p>
<h3 id="3223-الكلفة-الإجمالية">3.2.2.3. الكلفة الإجمالية</h3>
<p>بناءً على المعادلتين (3-5) و(3-14)، تُحسَب الكلفة الإجمالية كما يلي:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’total cost’</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0.285</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">13.2</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">13.485</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-15</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></p>
<p>وتؤكّد نتيجة الأمر EXPLAIN هذه التقديرات:</p>
<pre><code>1
2
3
4
5
6
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT id, data FROM tbl WHERE data &lt;= 240;
                                QUERY PLAN
---------------------------------------------------------------------------
 Index Scan using tbl_data_idx on tbl  (cost=0.29..13.49 rows=240 width=8)
   Index Cond: (data &lt;= 240)
(2 rows)
</code></pre>
<p>في السطر 4، تُعرض كلفة البدء والكلفة الإجمالية بالقيمتين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.29</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">13.49</span></span></span></span> على التوالي (مقرَّبتين من القيم المحسوبة). ويقدّر المخطِّط أيضًا أن <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">240</span></span></span></span> صفًا (tuple) سيُمسح.</p>
<p>ويعرض السطر 5 شرط الفهرس <strong>Index Cond:</strong> <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;&amp;&#x27; at position 14: (\\text{data} &amp;̲lt;= 240)" style="color:#cc0000">(\\text{data} &amp;lt;= 240)</span>. وهذا رسميًا <em>مُسند وصول</em> (access predicate)، يحدّد شرطي البدء والتوقف لمسح الفهرس.</p>
<p>** seq_page_cost وrandom_page_cost</p>
<p>القيمتان الافتراضيتان لـ <a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-SEQ-PAGE-COST">seq_page_cost</a> و<a href="https://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-RANDOM-PAGE-COST">random_page_cost</a> هما <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1.0</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">4.0</span></span></span></span> على التوالي.</p>
<p>وتعني هاتان القيمتان الافتراضيتان أن PostgreSQL يفترض أن الإدخال/الإخراج العشوائي أبطأ أربع مرات من الإدخال/الإخراج التسلسلي، وهي نسبة نموذجية لأقراص التخزين المغناطيسية التقليدية (HDDs).</p>
<p>غير أنه في البيئات الحديثة التي صارت فيها أقراص الحالة الصلبة (SSDs) معيارًا، غالبًا ما تكون القيمة الافتراضية لـ random_page_cost مرتفعة بشكل مفرط. وإذا بقيت هذه القيمة على وضعها الافتراضي أثناء العمل على قرص SSD، فقد يفضّل المخطِّط عمليات المسح التسلسلي على مسح الفهرس حتى عندما يكون الفهرس أكثر كفاءة. ولذلك، يُوصى عمومًا بتقليل random_page_cost إلى <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1.0</span></span></span></span> في التخزين القائم على SSD.</p>
<p>وتُوثَّق آثار الإعدادات غير المناسبة لـ random_page_cost على أداء الاستعلام في <a href="https://web.archive.org/web/20171123101558/https://amplitude.engineering/how-a-single-postgresql-config-change-improved-slow-query-performance-by-50x-85593b8991b0?gi=15341f11d527">هذه المدونة</a>.</p>
<h2 id="323-الفرز">3.2.3. الفرز</h2>
<p>يُستخدم مسار الفرز في عمليات مثل ORDER BY والمعالجة المسبقة لعمليات الربط بالدمج ووظائف داخلية أخرى. وتُقدَّر كلف الفرز بواسطة الدالة cost_sort().</p>
<p>وفي عملية الفرز، يعتمد اختيار الخوارزمية على حجم البيانات. فإذا اتسع جميع الصفوف الواجب فرزها للذاكرة المخصَّصة بواسطة work_mem، تُستخدم خوارزمية الفرز السريع (quicksort). وإلا، يُنشأ ملف مؤقت وتُستخدم خوارزمية الفرز الدمجي الخارجي (external merge sort).</p>
<p>وتمثّل كلفة بدء مسار الفرز كلفة عملية الفرز نفسها. ويُعبَّر عنها بالصيغة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">sort</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">sort</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">))</span></span></span></span>، حيث <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">sort</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> هو عدد الصفوف الواجب فرزها.</p>
<p>وتمثّل كلفة التشغيل كلفة قراءة الصفوف المفروزة بالفعل، وهي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">sort</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>.</p>
<p>ويستكشف هذا القسم الفرعي تقدير الكلفة للاستعلام التالي، بافتراض أن العملية تتسع في work_mem دون الحاجة إلى ملفات مؤقتة:</p>
<pre><code>testdb=# SELECT id, data FROM tbl WHERE data &lt;= 240 ORDER BY id;
</code></pre>
<p>في هذا السيناريو، تُعرَّف كلفة البدء بالمعادلة التالية:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 61: …text{comparison_̲cost} \\times N_…" style="color:#cc0000">\\begin{align*} \\text{&#x27;start-up cost&#x27;} = C + \\text{comparison_cost} \\times N_{\\text{sort}} \\times \\log_2(N_{\\text{sort}}) \\end{align*}</span></p>
<p>حيث:</p>
<ul>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.0715em;">C</span></span></span></span> هي الكلفة الإجمالية للعملية السابقة (في هذه الحالة، مسح الفهرس). ووفقًا للمعادلة (3-15)، فهي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">13.485</span></span></span></span>.</li>
<li><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">sort</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> هو عدد الصفوف الواجب فرزها، وهو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">240</span></span></span></span>.</li>
<li><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 17: …text{comparison_̲cost}" style="color:#cc0000">\\text{comparison_cost}</span> تُعرَّف بأنها <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 19: …times \\text{cpu_̲operator_cost}" style="color:#cc0000">2 \\times \\text{cpu_operator_cost}</span>.</li>
</ul>
<p>وباستخدام القيمة الافتراضية <span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 10: \\text{cpu_̲operator_cost}" style="color:#cc0000">\\text{cpu_operator_cost}</span> البالغة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.0025</span></span></span></span>، تُحسَب كلفة البدء كما يلي:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’start-up cost’</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">13.485</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.0025</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">240.0</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord">240.0</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">22.973</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6151em;"></span><span class="mord text"><span class="mord">run cost</span></span></span></span></span> هي كلفة قراءة الصفوف المفروزة من الذاكرة:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 45: …t&#x27;} = \\text{cpu_̲operator_cost} …" style="color:#cc0000">\\begin{align*} \\text{&#x27;run cost&#x27;} = \\text{cpu_operator_cost} \\times N_{\\text{sort}} = 0.0025 \\times 240 = 0.6 \\end{align*}</span></p>
<p>وبناءً على ذلك، تكون <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord text"><span class="mord">total cost</span></span></span></span></span>:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2em;vertical-align:-0.35em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">’total cost’</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">22.973</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">0.6</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">23.573</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>ويؤكّد مخرَج الأمر EXPLAIN هذه التقديرات:</p>
<pre><code>1
2
3
4
5
6
7
8
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT id, data FROM tbl WHERE data &lt;= 240 ORDER BY id;
                                   QUERY PLAN
---------------------------------------------------------------------------------
 Sort  (cost=22.97..23.57 rows=240 width=8)
   Sort Key: id
   -&gt;  Index Scan using tbl_data_idx on tbl  (cost=0.29..13.49 rows=240 width=8)
         Index Cond: (data &lt;= 240)
(4 rows)
</code></pre>
<p>في السطر 4، تُعرض كلفة البدء والكلفة الإجمالية بالقيمتين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">22.97</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">23.57</span></span></span></span> على التوالي.</p>
<h2 id="324-تقدير-العدد-الأساسي-cardinality-estimation">3.2.4. تقدير العدد الأساسي (Cardinality Estimation)</h2>
<p>افترضت المناقشات السابقة أن الانتقائية يمكن تحديدها بدقة مطلقة. لكن في الواقع، كان تقدير الانتقائية واحدًا من أكثر المشكلات إلحاحًا وصعوبة في أنظمة قواعد البيانات منذ نشأتها.</p>
<h3 id="3241-الانتقائية-مقابل-العدد-الأساسي">3.2.4.1. الانتقائية مقابل العدد الأساسي</h3>
<p>بينما يستخدم PostgreSQL داخليًا الانتقائية، يركّز مجال قواعد البيانات الأوسع عمومًا على <strong>العدد الأساسي</strong> (Cardinality). ويُمثَّل العدد الأساسي بعدد صحيح، وتُعرَّف العلاقة بين الانتقائية والعدد الأساسي كما يلي:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord text"><span class="mord">Selectivity</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.3435em;vertical-align:-0.9721em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">tuple</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">Cardinality</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.9721em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>حيث <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.109em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">tuple</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span> هو العدد الإجمالي للصفوف (rows) في الجدول. وسيُستخدم مصطلح العدد الأساسي في ما يلي بشكل أساسي.</p>
<h3 id="3242-بيان-صعوبة-تقدير-العدد-الأساسي">3.2.4.2. بيان صعوبة تقدير العدد الأساسي</h3>
<p>يوضّح مثال ملموس صعوبة تقدير العدد الأساسي.</p>
<p>لنتأمل قاعدة بيانات تمثّل <strong>100 قروي</strong>. ويسجّل جدول <code>residents</code> فئة <em>العمر</em> (under18 وyoung وmiddle وelder) وحالة <em>رخصة</em> القيادة (none وstandard وgold). (وهنا، «رخصة gold» مصطلح يُستخدم في اليابان لرخصة تُمنح للسائقين الذين لم يتسبّبوا بحوادث أو مخالفات لمدة خمس سنوات.)</p>
<h4><strong>إعداد قاعدة البيانات</strong></h4>
<p>تُعرَّف بنية الجدول كما يلي:</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE</span> TYPE license <span class="hljs-keyword">AS</span> ENUM (<span class="hljs-string">&#x27;none&#x27;</span>, <span class="hljs-string">&#x27;standard&#x27;</span>, <span class="hljs-string">&#x27;gold&#x27;</span>);
<span class="hljs-keyword">CREATE</span> TYPE
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE</span> TYPE age <span class="hljs-keyword">AS</span> ENUM (<span class="hljs-string">&#x27;under18&#x27;</span>, <span class="hljs-string">&#x27;young&#x27;</span>, <span class="hljs-string">&#x27;middle&#x27;</span>, <span class="hljs-string">&#x27;elder&#x27;</span>);
<span class="hljs-keyword">CREATE</span> TYPE

testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE TABLE</span> residents (id <span class="hljs-type">int</span>, name text, license license, age age);
<span class="hljs-keyword">CREATE TABLE</span>

testdb<span class="hljs-operator">=</span># \\d residents
<span class="hljs-keyword">Table</span> <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;public.residents<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;
 <span class="hljs-keyword">Column</span>  <span class="hljs-operator">|</span>  Type   <span class="hljs-operator">|</span> <span class="hljs-keyword">Collation</span> <span class="hljs-operator">|</span> Nullable <span class="hljs-operator">|</span> <span class="hljs-keyword">Default</span>
<span class="hljs-comment">---------+---------+-----------+----------+---------</span>
 id      <span class="hljs-operator">|</span> <span class="hljs-type">integer</span> <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
 name    <span class="hljs-operator">|</span> text    <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
 license <span class="hljs-operator">|</span> license <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
 age     <span class="hljs-operator">|</span> age     <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
</code></pre>
<p>ويتوفر ملف <code>residents.csv</code> هنا:</p>
<p>** ** residents.csv</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">cat</span> residents.csv
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
</code></pre>
<pre><code>testdb=# COPY residents FROM '/usr/local/pgsql/residents.csv' (FORMAT csv);
COPY 100
testdb=# ANALYZE;
ANALYZE
</code></pre>
<h4><strong>توزيع التكرارات</strong></h4>
<p>تُستردّ <strong>القيم الأكثر شيوعًا (MCVs)</strong> وتكراراتها لعمودي age وlicense من pg_stats:</p>
<p>توزيع فئة العمر:</p>
<pre><code>testdb=# SELECT most_common_vals, most_common_freqs FROM pg_stats WHERE tablename = 'residents' AND attname='age';
       most_common_vals       |  most_common_freqs
------------------------------+---------------------
 {middle,young,under18,elder} | {0.35,0.25,0.2,0.2}
(1 row)
</code></pre>
<table>
<thead>
<tr>
<th>فئة العمر</th>
<th>التكرار</th>
<th>عدد القرويين المقابل (من أصل 100)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>under18</strong></td>
<td>0.2</td>
<td>20 شخصًا</td>
</tr>
<tr>
<td><strong>young</strong></td>
<td>0.25</td>
<td>25 شخصًا</td>
</tr>
<tr>
<td><strong>middle</strong></td>
<td>0.35</td>
<td>35 شخصًا</td>
</tr>
<tr>
<td><strong>elder</strong></td>
<td>0.2</td>
<td>20 شخصًا</td>
</tr>
</tbody>
</table>
<p>توزيع حالة الرخصة:</p>
<pre><code>testdb=# SELECT most_common_vals, most_common_freqs FROM pg_stats WHERE tablename = 'residents' AND attname='license';
   most_common_vals   | most_common_freqs
----------------------+-------------------
 {standard,none,gold} | {0.55,0.4,0.05}
(1 row)
</code></pre>
<table>
<thead>
<tr>
<th>حالة الرخصة</th>
<th>التكرار</th>
<th>عدد القرويين المقابل (من أصل 100)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>none</strong></td>
<td>0.4</td>
<td>40 شخصًا</td>
</tr>
<tr>
<td><strong>standard</strong></td>
<td>0.55</td>
<td>55 شخصًا</td>
</tr>
<tr>
<td><strong>gold</strong></td>
<td>0.05</td>
<td>5 أشخاص</td>
</tr>
</tbody>
</table>
<h4><strong>فشل التقدير الأولي (دون إدراك الارتباط)</strong></h4>
<p>يُنفَّذ بيان SELECT لاسترداد القرويين الذين تقل أعمارهم عن 18 عامًا ولا يمتلكون رخصة (none). ويقارن EXPLAIN ANALYZE القيمة المقدَّرة من المخطِّط بنتيجة التنفيذ الفعلية:</p>
<pre><code>testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'none';
                                      QUERY PLAN
--------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=8 width=18) (actual rows=20.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'none'::license))
   Rows Removed by Filter: 80
 Planning Time: 0.183 ms
 Execution Time: 0.048 ms
(8 rows)
</code></pre>
<p>العدد الأساسي المقدَّر هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">8</span></span></span></span>، بينما عدد الصفوف الفعلي هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">20</span></span></span></span>.</p>
<p>وتعكس هذه القيمة الفعلية القيد الواقعي القائل إن من تقل أعمارهم عن 18 عامًا لا يمكنهم الحصول على رخصة قيادة (بموجب قانون هذه القرية أو القانون الياباني). وبناءً على ذلك، تنتمي مجموعة من تقل أعمارهم عن 18 عامًا بأكملها بالضرورة إلى فئة الرخصة «none»، ما يؤدي إلى <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">20</span></span></span></span> صفًا مطابقًا بالضبط.</p>
<h4><strong>السبب الجذري: افتراض الاستقلال</strong></h4>
<p>يحسب مخطِّط PostgreSQL التقدير <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">8</span></span></span></span> بضرب نسبة under18 (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.2</span></span></span></span>) في نسبة none (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.4</span></span></span></span>)، بافتراض أن العمودين مستقلان: <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">0.2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">0.4</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">100</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">0.08</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">100</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">8</span></span></span></span>.</p>
<p>تحسب مخطِّطات معظم أنظمة إدارة قواعد البيانات العلائقية العدد الأساسي بافتراض أن الأعمدة مستقلة بعضها عن بعض ما لم يُنص على خلاف ذلك. وهذا يتجاهل الارتباطات المحتملة بين البيانات. وبناءً على ذلك، كلما قوي الارتباط بين الأعمدة، تراجعت دقة تقدير المخطِّط. ولا يزال تقدير العدد الأساسي مجال بحث نشطًا.</p>
<h3 id="3243-حل-جزئي-الإحصاءات-الموسعة">3.2.4.3. حل جزئي: الإحصاءات الموسَّعة</h3>
<p>لمعالجة ذلك، أدخل PostgreSQL دعم الإحصاءات الموسَّعة في الإصدار 13. وباستخدام عبارة <a href="https://www.postgresql.org/docs/current/sql-createstatistics.html">CREATE STATISTICS</a>، يمكن التقاط الارتباط بين عمودي age وlicense في كائن إحصاءات جديد.</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE</span> STATISTICS stat_residents (mcv) <span class="hljs-keyword">ON</span> license, age <span class="hljs-keyword">FROM</span> residents;
<span class="hljs-keyword">CREATE</span> STATISTICS
testdb<span class="hljs-operator">=</span># ANALYZE;
ANALYZE
</code></pre>
<p>وبعد تحليل الإحصاءات الموسَّعة، تصبح نتائج التقدير لفئة العمر under18 أقرب إلى الواقع:</p>
<p>age = ‘under18’ وlicense = ’none’</p>
<pre><code>testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'none';
                                      QUERY PLAN
-------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=20 width=18) (actual rows=20.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'none'::license))
   Rows Removed by Filter: 80
 Planning Time: 0.515 ms
 Execution Time: 0.049 ms
(8 rows)
</code></pre>
<p>age = ‘under18’ وlicense = ‘standard’</p>
<pre><code>testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'standard';
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=1 width=18) (actual rows=0.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'standard'::license))
   Rows Removed by Filter: 100
 Planning Time: 0.538 ms
 Execution Time: 0.073 ms
(6 rows)
</code></pre>
<p>age = ‘under18’ وlicense = ‘gold’</p>
<pre><code>testdb=# EXPLAIN (ANALYZE TRUE, TIMING FALSE, BUFFERS FALSE)
testdb-# 	 	  SELECT * FROM residents WHERE age = 'under18' AND license = 'gold';
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Seq Scan on residents  (cost=0.00..2.50 rows=1 width=18) (actual rows=0.00 loops=1)
   Filter: ((age = 'under18'::age) AND (license = 'gold'::license))
   Rows Removed by Filter: 100
 Planning Time: 0.112 ms
 Execution Time: 0.053 ms
(6 rows)
</code></pre>
<p>يُقدَّر حاملو رخصة «none» ضمن فئة under18 بـ <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">20</span></span></span></span>، وهو رقم دقيق.</p>
<p>أما القيمة المقدَّرة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> لحاملي رخصتي «standard» و«gold» ضمن فئة under18 فمن المرجّح أنها نتيجة تقريب أو منطق تنعيم، لكنها تمثّل تحسنًا كبيرًا مقارنةً بافتراض الاستقلال.</p>
<p>** حدود الإحصاءات الموسَّعة</p>
<p>يمكن ضبط الإحصاءات الموسَّعة في PostgreSQL للأعمدة ضمن <strong>جدول واحد</strong> فقط. ولا يمكن تطبيق هذه الميزة على عمليات الربط التي تشمل عدة جداول.</p>
<p>وبناءً على ذلك، لا يزال تقدير العدد الأساسي لعمليات JOIN يمثّل تحدّيًا كبيرًا. ورغم استمرار البحوث المكثفة، لم يتحقق بعد حل عملي قابل للتطبيق عالميًا لتقدير العدد الأساسي عبر الجداول.</p>
<h1>3.3. إنشاء شجرة الخطة لاستعلام ذي جدول واحد</h1>
<p>ولأن معالجة المخطِّط بالغة التعقيد، يوضّح هذا القسم الحالة الأكثر أساسية: إنشاء شجرة خطة لاستعلام ذي جدول واحد. وتُغطّى العملية الأكثر تعقيدًا لإنشاء أشجار الخطط للاستعلامات متعددة الجداول في القسم 3.6.</p>
<p>وينفّذ مخطِّط PostgreSQL الخطوات الثلاث التالية:</p>
<ol>
<li><strong>المعالجة المسبقة (Preprocessing):</strong> يجري تحويلات وتبسيطات أولية على الاستعلام.</li>
<li><strong>إنشاء المسارات وتقدير الكلفة (Path Creation and Cost Estimation):</strong> يقدّر كلف جميع مسارات الوصول الممكنة لتحديد الخيار الأقل كلفة.</li>
<li><strong>إنشاء شجرة الخطة (Plan Tree Creation):</strong> يُنشئ شجرة الخطة النهائية بناءً على المسار الأقل كلفة الذي حُدِّد.</li>
</ol>
<p>و<strong>مسار الوصول</strong> (access path) وحدة معالجة تُستخدم حصريًا أثناء مرحلة تقدير الكلفة. على سبيل المثال، للمسح التسلسلي ومسح الفهرس والفرز وعمليات الربط المتنوعة مسارات مقابلة لكل منها. وهذه المسارات توجد داخل المخطِّط فقط لتسهيل اختيار خطة مثالية؛ ولا تُستخدم أثناء التنفيذ الفعلي.</p>
<p>وأكثر بنية بيانات أساسية لمسارات الوصول هي بنية <code>Path</code> المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/include/nodes/pathnodes.h">pathnodes.h</a>، وهي تقابل المسح التسلسلي. وجميع مسارات الوصول الأخرى امتدادات أو تنويعات على هذه البنية الأساسية.</p>
<p>** ** Path</p>
<pre><code>typedef struct PathKey
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
</code></pre>
<p>لإدارة هذه الخطوات، يحتفظ المخطِّط داخليًا ببنية <code>PlannerInfo</code>، التي تحمل شجرة الاستعلام وبيانات وصفية عن العلاقات المعنية ومسارات الوصول المرشَّحة.</p>
<p>** ** PlannerInfo</p>
<pre><code class="language-javascript"><span class="hljs-comment">/*----------
 * PlannerInfo
 *		Per-query information for planning/optimization
 *
 * This struct is conventionally called &amp;#34;root&amp;#34; in all the planner routines.
 * It holds links to all of the planner&#x27;s working state, in addition to the
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
 * <span class="hljs-doctag">NOTE:</span> When adding new entries containing relids and relid bitmapsets,
 * remember to check that they will be correctly processed by
 * the remove_self_join_rel function - relid of removing relation will be
 * correctly replaced with the keeping one.
 *----------
 */</span>
#ifndef <span class="hljs-variable constant_">HAVE_PLANNERINFO_TYPEDEF</span>
typedef struct <span class="hljs-title class_">PlannerInfo</span> <span class="hljs-title class_">PlannerInfo</span>;
#define <span class="hljs-variable constant_">HAVE_PLANNERINFO_TYPEDEF</span> <span class="hljs-number">1</span>
#endif

struct <span class="hljs-title class_">PlannerInfo</span>
{
	<span class="hljs-title function_">pg_node_attr</span>(no_copy_equal, no_read, no_query_jumble)

	<span class="hljs-title class_">NodeTag</span>		type;

	<span class="hljs-comment">/* the Query being planned */</span>
	<span class="hljs-title class_">Query</span>	   *parse;

	<span class="hljs-comment">/* global info for current planner run */</span>
	<span class="hljs-title class_">PlannerGlobal</span> *glob;

	<span class="hljs-comment">/* 1 at the outermost Query */</span>
	<span class="hljs-title class_">Index</span>		query_level;

	<span class="hljs-comment">/* NULL at outermost Query */</span>
	<span class="hljs-title class_">PlannerInfo</span> *parent_root <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/*
	 * plan_params contains the expressions that this query level needs to
	 * make available to a lower query level that is currently being planned.
	 * outer_params contains the paramIds of PARAM_EXEC Params that outer
	 * query levels will make available to this query level.
	 */</span>
	<span class="hljs-comment">/* list of PlannerParamItems, see below */</span>
	<span class="hljs-title class_">List</span>	   *plan_params;
	<span class="hljs-title class_">Bitmapset</span>  *outer_params;

	<span class="hljs-comment">/*
	 * simple_rel_array holds pointers to &amp;#34;base rels&amp;#34; and &amp;#34;other rels&amp;#34; (see
	 * comments for RelOptInfo for more info).  It is indexed by rangetable
	 * index (so entry 0 is always wasted).  Entries can be NULL when an RTE
	 * does not correspond to a base relation, such as a join RTE or an
	 * unreferenced view RTE; or if the RelOptInfo hasn&#x27;t been made yet.
	 */</span>
	struct <span class="hljs-title class_">RelOptInfo</span> **simple_rel_array <span class="hljs-title function_">pg_node_attr</span>(<span class="hljs-title function_">array_size</span>(simple_rel_array_size));
	<span class="hljs-comment">/* allocated size of array */</span>
	int			simple_rel_array_size;

	<span class="hljs-comment">/*
	 * simple_rte_array is the same length as simple_rel_array and holds
	 * pointers to the associated rangetable entries.  Using this is a shade
	 * faster than using rt_fetch(), mostly due to fewer indirections.  (Not
	 * printed because it&#x27;d be redundant with parse-&gt;rtable.)
	 */</span>
	<span class="hljs-title class_">RangeTblEntry</span> **simple_rte_array <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/*
	 * append_rel_array is the same length as the above arrays, and holds
	 * pointers to the corresponding AppendRelInfo entry indexed by
	 * child_relid, or NULL if the rel is not an appendrel child.  The array
	 * itself is not allocated if append_rel_list is empty.  (Not printed
	 * because it&#x27;d be redundant with append_rel_list.)
	 */</span>
	struct <span class="hljs-title class_">AppendRelInfo</span> **append_rel_array <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/*
	 * all_baserels is a Relids set of all base relids (but not joins or
	 * &amp;#34;other&amp;#34; rels) in the query.  This is computed in deconstruct_jointree.
	 */</span>
	<span class="hljs-title class_">Relids</span>		all_baserels;

	<span class="hljs-comment">/*
	 * outer_join_rels is a Relids set of all outer-join relids in the query.
	 * This is computed in deconstruct_jointree.
	 */</span>
	<span class="hljs-title class_">Relids</span>		outer_join_rels;

	<span class="hljs-comment">/*
	 * all_query_rels is a Relids set of all base relids and outer join relids
	 * (but not &amp;#34;other&amp;#34; relids) in the query.  This is the Relids identifier
	 * of the final join we need to form.  This is computed in
	 * deconstruct_jointree.
	 */</span>
	<span class="hljs-title class_">Relids</span>		all_query_rels;

	<span class="hljs-comment">/*
	 * join_rel_list is a list of all join-relation RelOptInfos we have
	 * considered in this planning run.  For small problems we just scan the
	 * list to do lookups, but when there are many join relations we build a
	 * hash table for faster lookups.  The hash table is present and valid
	 * when join_rel_hash is not NULL.  Note that we still maintain the list
	 * even when using the hash table for lookups; this simplifies life for
	 * GEQO.
	 */</span>
	<span class="hljs-title class_">List</span>	   *join_rel_list;
	struct <span class="hljs-variable constant_">HTAB</span> *join_rel_hash <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/*
	 * When doing a dynamic-programming-style join search, join_rel_level[k]
	 * is a list of all join-relation RelOptInfos of level k, and
	 * join_cur_level is the current level.  New join-relation RelOptInfos are
	 * automatically added to the join_rel_level[join_cur_level] list.
	 * join_rel_level is NULL if not in use.
	 *
	 * Note: we&#x27;ve already printed all baserel and joinrel RelOptInfos above,
	 * so we don&#x27;t dump join_rel_level or other lists of RelOptInfos.
	 */</span>
	<span class="hljs-comment">/* lists of join-relation RelOptInfos */</span>
	<span class="hljs-title class_">List</span>	  **join_rel_level <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);
	<span class="hljs-comment">/* index of list being extended */</span>
	int			join_cur_level;

	<span class="hljs-comment">/* init SubPlans for query */</span>
	<span class="hljs-title class_">List</span>	   *init_plans;

	<span class="hljs-comment">/*
	 * per-CTE-item list of subplan IDs (or -1 if no subplan was made for that
	 * CTE)
	 */</span>
	<span class="hljs-title class_">List</span>	   *cte_plan_ids;

	<span class="hljs-comment">/* List of Lists of Params for MULTIEXPR subquery outputs */</span>
	<span class="hljs-title class_">List</span>	   *multiexpr_params;

	<span class="hljs-comment">/* list of JoinDomains used in the query (higher ones first) */</span>
	<span class="hljs-title class_">List</span>	   *join_domains;

	<span class="hljs-comment">/* list of active EquivalenceClasses */</span>
	<span class="hljs-title class_">List</span>	   *eq_classes;

	<span class="hljs-comment">/* set true once ECs are canonical */</span>
	bool		ec_merging_done;

	<span class="hljs-comment">/* list of &amp;#34;canonical&amp;#34; PathKeys */</span>
	<span class="hljs-title class_">List</span>	   *canon_pathkeys;

	<span class="hljs-comment">/*
	 * list of OuterJoinClauseInfos for mergejoinable outer join clauses
	 * w/nonnullable var on left
	 */</span>
	<span class="hljs-title class_">List</span>	   *left_join_clauses;

	<span class="hljs-comment">/*
	 * list of OuterJoinClauseInfos for mergejoinable outer join clauses
	 * w/nonnullable var on right
	 */</span>
	<span class="hljs-title class_">List</span>	   *right_join_clauses;

	<span class="hljs-comment">/*
	 * list of OuterJoinClauseInfos for mergejoinable full join clauses
	 */</span>
	<span class="hljs-title class_">List</span>	   *full_join_clauses;

	<span class="hljs-comment">/* list of SpecialJoinInfos */</span>
	<span class="hljs-title class_">List</span>	   *join_info_list;

	<span class="hljs-comment">/* counter for assigning RestrictInfo serial numbers */</span>
	int			last_rinfo_serial;

	<span class="hljs-comment">/*
	 * all_result_relids is empty for SELECT, otherwise it contains at least
	 * parse-&gt;resultRelation.  For UPDATE/DELETE/MERGE across an inheritance
	 * or partitioning tree, the result rel&#x27;s child relids are added.  When
	 * using multi-level partitioning, intermediate partitioned rels are
	 * included. leaf_result_relids is similar except that only actual result
	 * tables, not partitioned tables, are included in it.
	 */</span>
	<span class="hljs-comment">/* set of all result relids */</span>
	<span class="hljs-title class_">Relids</span>		all_result_relids;
	<span class="hljs-comment">/* set of all leaf relids */</span>
	<span class="hljs-title class_">Relids</span>		leaf_result_relids;

	<span class="hljs-comment">/*
	 * list of AppendRelInfos
	 *
	 * Note: for AppendRelInfos describing partitions of a partitioned table,
	 * we guarantee that partitions that come earlier in the partitioned
	 * table&#x27;s PartitionDesc will appear earlier in append_rel_list.
	 */</span>
	<span class="hljs-title class_">List</span>	   *append_rel_list;

	<span class="hljs-comment">/* list of RowIdentityVarInfos */</span>
	<span class="hljs-title class_">List</span>	   *row_identity_vars;

	<span class="hljs-comment">/* list of PlanRowMarks */</span>
	<span class="hljs-title class_">List</span>	   *rowMarks;

	<span class="hljs-comment">/* list of PlaceHolderInfos */</span>
	<span class="hljs-title class_">List</span>	   *placeholder_list;

	<span class="hljs-comment">/* array of PlaceHolderInfos indexed by phid */</span>
	struct <span class="hljs-title class_">PlaceHolderInfo</span> **placeholder_array <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore, <span class="hljs-title function_">array_size</span>(placeholder_array_size));
	<span class="hljs-comment">/* allocated size of array */</span>
	int			placeholder_array_size <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/* list of ForeignKeyOptInfos */</span>
	<span class="hljs-title class_">List</span>	   *fkey_list;

	<span class="hljs-comment">/* desired pathkeys for query_planner() */</span>
	<span class="hljs-title class_">List</span>	   *query_pathkeys;

	<span class="hljs-comment">/* groupClause pathkeys, if any */</span>
	<span class="hljs-title class_">List</span>	   *group_pathkeys;

	<span class="hljs-comment">/*
	 * The number of elements in the group_pathkeys list which belong to the
	 * GROUP BY clause.  Additional ones belong to ORDER BY / DISTINCT
	 * aggregates.
	 */</span>
	int			num_groupby_pathkeys;

	<span class="hljs-comment">/* pathkeys of bottom window, if any */</span>
	<span class="hljs-title class_">List</span>	   *window_pathkeys;
	<span class="hljs-comment">/* distinctClause pathkeys, if any */</span>
	<span class="hljs-title class_">List</span>	   *distinct_pathkeys;
	<span class="hljs-comment">/* sortClause pathkeys, if any */</span>
	<span class="hljs-title class_">List</span>	   *sort_pathkeys;
	<span class="hljs-comment">/* set operator pathkeys, if any */</span>
	<span class="hljs-title class_">List</span>	   *setop_pathkeys;

	<span class="hljs-comment">/* Canonicalised partition schemes used in the query. */</span>
	<span class="hljs-title class_">List</span>	   *part_schemes <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/* RelOptInfos we are now trying to join */</span>
	<span class="hljs-title class_">List</span>	   *initial_rels <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/*
	 * Upper-rel RelOptInfos. Use fetch_upper_rel() to get any particular
	 * upper rel.
	 */</span>
	<span class="hljs-title class_">List</span>	   *upper_rels[<span class="hljs-variable constant_">UPPERREL_FINAL</span> + <span class="hljs-number">1</span>] <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/* Result tlists chosen by grouping_planner for upper-stage processing */</span>
	struct <span class="hljs-title class_">PathTarget</span> *upper_targets[<span class="hljs-variable constant_">UPPERREL_FINAL</span> + <span class="hljs-number">1</span>] <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/*
	 * The fully-processed groupClause is kept here.  It differs from
	 * parse-&gt;groupClause in that we remove any items that we can prove
	 * redundant, so that only the columns named here actually need to be
	 * compared to determine grouping.  Note that it&#x27;s possible for *all* the
	 * items to be proven redundant, implying that there is only one group
	 * containing all the query&#x27;s rows.  Hence, if you want to check whether
	 * GROUP BY was specified, test for nonempty parse-&gt;groupClause, not for
	 * nonempty processed_groupClause.  Optimizer chooses specific order of
	 * group-by clauses during the upper paths generation process, attempting
	 * to use different strategies to minimize number of sorts or engage
	 * incremental sort.  See preprocess_groupclause() and
	 * get_useful_group_keys_orderings() for details.
	 *
	 * Currently, when grouping sets are specified we do not attempt to
	 * optimize the groupClause, so that processed_groupClause will be
	 * identical to parse-&gt;groupClause.
	 */</span>
	<span class="hljs-title class_">List</span>	   *processed_groupClause;

	<span class="hljs-comment">/*
	 * The fully-processed distinctClause is kept here.  It differs from
	 * parse-&gt;distinctClause in that we remove any items that we can prove
	 * redundant, so that only the columns named here actually need to be
	 * compared to determine uniqueness.  Note that it&#x27;s possible for *all*
	 * the items to be proven redundant, implying that there should be only
	 * one output row.  Hence, if you want to check whether DISTINCT was
	 * specified, test for nonempty parse-&gt;distinctClause, not for nonempty
	 * processed_distinctClause.
	 */</span>
	<span class="hljs-title class_">List</span>	   *processed_distinctClause;

	<span class="hljs-comment">/*
	 * The fully-processed targetlist is kept here.  It differs from
	 * parse-&gt;targetList in that (for INSERT) it&#x27;s been reordered to match the
	 * target table, and defaults have been filled in.  Also, additional
	 * resjunk targets may be present.  preprocess_targetlist() does most of
	 * that work, but note that more resjunk targets can get added during
	 * appendrel expansion.  (Hence, upper_targets mustn&#x27;t get set up till
	 * after that.)
	 */</span>
	<span class="hljs-title class_">List</span>	   *processed_tlist;

	<span class="hljs-comment">/*
	 * For UPDATE, this list contains the target table&#x27;s attribute numbers to
	 * which the first N entries of processed_tlist are to be assigned.  (Any
	 * additional entries in processed_tlist must be resjunk.)  DO NOT use the
	 * resnos in processed_tlist to identify the UPDATE target columns.
	 */</span>
	<span class="hljs-title class_">List</span>	   *update_colnos;

	<span class="hljs-comment">/*
	 * Fields filled during create_plan() for use in setrefs.c
	 */</span>
	<span class="hljs-comment">/* for GroupingFunc fixup (can&#x27;t print: array length not known here) */</span>
	<span class="hljs-title class_">AttrNumber</span> *grouping_map <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);
	<span class="hljs-comment">/* List of MinMaxAggInfos */</span>
	<span class="hljs-title class_">List</span>	   *minmax_aggs;

	<span class="hljs-comment">/* context holding PlannerInfo */</span>
	<span class="hljs-title class_">MemoryContext</span> planner_cxt <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/* # of pages in all non-dummy tables of query */</span>
	<span class="hljs-title class_">Cardinality</span> total_table_pages;

	<span class="hljs-comment">/* tuple_fraction passed to query_planner */</span>
	<span class="hljs-title class_">Selectivity</span> tuple_fraction;
	<span class="hljs-comment">/* limit_tuples passed to query_planner */</span>
	<span class="hljs-title class_">Cardinality</span> limit_tuples;

	<span class="hljs-comment">/*
	 * Minimum security_level for quals. Note: qual_security_level is zero if
	 * there are no securityQuals.
	 */</span>
	<span class="hljs-title class_">Index</span>		qual_security_level;

	<span class="hljs-comment">/* true if any RTEs are RTE_JOIN kind */</span>
	bool		hasJoinRTEs;
	<span class="hljs-comment">/* true if any RTEs are marked LATERAL */</span>
	bool		hasLateralRTEs;
	<span class="hljs-comment">/* true if havingQual was non-null */</span>
	bool		hasHavingQual;
	<span class="hljs-comment">/* true if any RestrictInfo has pseudoconstant = true */</span>
	bool		hasPseudoConstantQuals;
	<span class="hljs-comment">/* true if we&#x27;ve made any of those */</span>
	bool		hasAlternativeSubPlans;
	<span class="hljs-comment">/* true once we&#x27;re no longer allowed to add PlaceHolderInfos */</span>
	bool		placeholdersFrozen;
	<span class="hljs-comment">/* true if planning a recursive WITH item */</span>
	bool		hasRecursion;

	<span class="hljs-comment">/*
	 * The rangetable index for the RTE_GROUP RTE, or 0 if there is no
	 * RTE_GROUP RTE.
	 */</span>
	int			group_rtindex;

	<span class="hljs-comment">/*
	 * Information about aggregates. Filled by preprocess_aggrefs().
	 */</span>
	<span class="hljs-comment">/* AggInfo structs */</span>
	<span class="hljs-title class_">List</span>	   *agginfos;
	<span class="hljs-comment">/* AggTransInfo structs */</span>
	<span class="hljs-title class_">List</span>	   *aggtransinfos;
	<span class="hljs-comment">/* number of aggs with DISTINCT/ORDER BY/WITHIN GROUP */</span>
	int			numOrderedAggs;
	<span class="hljs-comment">/* does any agg not support partial mode? */</span>
	bool		hasNonPartialAggs;
	<span class="hljs-comment">/* is any partial agg non-serializable? */</span>
	bool		hasNonSerialAggs;

	<span class="hljs-comment">/*
	 * These fields are used only when hasRecursion is true:
	 */</span>
	<span class="hljs-comment">/* PARAM_EXEC ID for the work table */</span>
	int			wt_param_id;
	<span class="hljs-comment">/* a path for non-recursive term */</span>
	struct <span class="hljs-title class_">Path</span> *non_recursive_path;

	<span class="hljs-comment">/*
	 * These fields are workspace for createplan.c
	 */</span>
	<span class="hljs-comment">/* outer rels above current node */</span>
	<span class="hljs-title class_">Relids</span>		curOuterRels;
	<span class="hljs-comment">/* not-yet-assigned NestLoopParams */</span>
	<span class="hljs-title class_">List</span>	   *curOuterParams;

	<span class="hljs-comment">/*
	 * These fields are workspace for setrefs.c.  Each is an array
	 * corresponding to glob-&gt;subplans.  (We could probably teach
	 * gen_node_support.pl how to determine the array length, but it doesn&#x27;t
	 * seem worth the trouble, so just mark them read_write_ignore.)
	 */</span>
	bool	   *isAltSubplan <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);
	bool	   *isUsedSubplan <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/* optional private data for join_search_hook, e.g., GEQO */</span>
	<span class="hljs-keyword">void</span>	   *join_search_private <span class="hljs-title function_">pg_node_attr</span>(read_write_ignore);

	<span class="hljs-comment">/* Does this query modify any partition key columns? */</span>
	bool		partColsUpdated;

	<span class="hljs-comment">/* PartitionPruneInfos added in this query&#x27;s plan. */</span>
	<span class="hljs-title class_">List</span>	   *partPruneInfos;
};
</code></pre>
<p>توضّح الأمثلة التالية تحويل أشجار الاستعلام إلى أشجار خطط.</p>
<p>محتويات القسم</p>
<ul>
<li>3.3.1. المعالجة المسبقة</li>
<li>3.3.2. تحديد مسار الوصول الأقل كلفة</li>
<li>3.3.3. إنشاء شجرة الخطة</li>
</ul>
<h2 id="331-المعالجة-المسبقة">3.3.1. المعالجة المسبقة</h2>
<p>قبل إنشاء شجرة الخطة، يجري المخطِّط معالجة مسبقة لشجرة الاستعلام المخزَّنة في بنية <code>PlannerInfo</code>.</p>
<p>ورغم أن المعالجة المسبقة تشمل عمليات عديدة، يركّز هذا القسم الفرعي على الخطوات الرئيسية المتعلقة بالاستعلامات ذات الجدول الواحد. وتُفصَّل عمليات معالجة مسبقة إضافية، مثل تلك المتعلقة بعمليات الربط والاستعلامات الفرعية، في القسم 3.6.</p>
<p>وتشمل خطوات المعالجة المسبقة الجوهرية ما يلي:</p>
<ol>
<li><strong>تبسيط قوائم الأهداف والعبارات (Simplifying Target Lists and Clauses):</strong> يبسّط المخطِّط قوائم الأهداف وعبارات LIMIT والتعبيرات الأخرى. على سبيل المثال، تُجري الدالة eval_const_expressions()، المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/optimizer/util/clauses.c">clauses.c</a>، طيّ الثوابت بإعادة كتابة تعبيرات مثل «(1 + 2)» إلى «3».</li>
<li><strong>تطبيع التعبيرات المنطقية (Normalizing Boolean Expressions):</strong> يُبسَّط المنطق البولياني لأغراض الكفاءة؛ فعلى سبيل المثال، تُعاد كتابة النفي المزدوج «NOT(NOT a)» على صورة «a».</li>
<li><strong>تسطيح تعبيرات AND/OR (Flattening AND/OR Expressions):</strong> رغم أن معيار SQL يعرّف AND وOR كعوامل ثنائية، يتعامل PostgreSQL معهما داخليًا كعوامل متعددة المعاملات. ويفترض المخطِّط أن جميع تعبيرات AND وOR المتداخلة ينبغي تسطيحها لتقليل عمق الشجرة وتحسين سرعة التقييم.</li>
</ol>
<p>وكمثال محدد، لنتأمل التعبير البولياني «(id = 1) OR (id = 2) OR (id = 3)». ويوضّح الشكل 3.9(أ) البنية الأولية لشجرة الاستعلام باستخدام عوامل ثنائية. ويبسّط المخطِّط هذه الشجرة بتسطيحها إلى عامل ثلاثي واحد، كما هو موضّح في الشكل 3.9(ب).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-09.webp" alt=""></p>
<h4>الشكل 3.9. مثال على تسطيح تعبيرات AND/OR.</h4>
<h2 id="332-تحديد-مسار-الوصول-الأقل-كلفة">3.3.2. تحديد مسار الوصول الأقل كلفة</h2>
<p>لتحديد مسار الوصول الأقل كلفة، يقدّر المخطِّط كلف جميع مسارات الوصول الممكنة ويختار المسار ذا الكلفة الأدنى. وتحديدًا، ينفّذ المخطِّط العمليات التالية:</p>
<ol>
<li><strong>إنشاء بنية RelOptInfo:</strong> تُنشأ بنية <code>RelOptInfo</code> بواسطة الدالة make_one_rel() وتُخزَّن في <em>simple_rel_array</em> ضمن بنية <code>PlannerInfo</code> (انظر الشكل 3.10). وفي حالتها الأولية، تحمل RelOptInfo العضو <em>baserestrictinfo</em> — الذي يحتوي على عبارات WHERE في الاستعلام — والعضو <em>indexlist</em>، الذي يخزّن البيانات الوصفية لأي فهارس مرتبطة بالجدول الهدف.</li>
</ol>
<p>** ** RelOptInfo</p>
<pre><code class="language-python">typedef enum RelOptKind
{
	RELOPT_BASEREL,
	RELOPT_JOINREL,
	RELOPT_OTHER_MEMBER_REL,
	RELOPT_OTHER_JOINREL,
	RELOPT_UPPER_REL,
	RELOPT_OTHER_UPPER_REL
} RelOptKind;

/*
 * Is the given relation a simple relation i.e a base <span class="hljs-keyword">or</span> &amp;<span class="hljs-comment">#34;other&amp;#34; member</span>
 * relation?
 */
<span class="hljs-comment">#define IS_SIMPLE_REL(rel) \\</span>
	((rel)-&gt;reloptkind == RELOPT_BASEREL || \\
	 (rel)-&gt;reloptkind == RELOPT_OTHER_MEMBER_REL)

/* Is the given relation a join relation? */
<span class="hljs-comment">#define IS_JOIN_REL(rel)	\\</span>
	((rel)-&gt;reloptkind == RELOPT_JOINREL || \\
	 (rel)-&gt;reloptkind == RELOPT_OTHER_JOINREL)

/* Is the given relation an upper relation? */
<span class="hljs-comment">#define IS_UPPER_REL(rel)	\\</span>
	((rel)-&gt;reloptkind == RELOPT_UPPER_REL || \\
	 (rel)-&gt;reloptkind == RELOPT_OTHER_UPPER_REL)

/* Is the given relation an &amp;<span class="hljs-comment">#34;other&amp;#34; relation? */</span>
<span class="hljs-comment">#define IS_OTHER_REL(rel) \\</span>
	((rel)-&gt;reloptkind == RELOPT_OTHER_MEMBER_REL || \\
	 (rel)-&gt;reloptkind == RELOPT_OTHER_JOINREL || \\
	 (rel)-&gt;reloptkind == RELOPT_OTHER_UPPER_REL)

typedef struct RelOptInfo
{
	pg_node_attr(no_copy_equal, no_read, no_query_jumble)

	NodeTag		<span class="hljs-built_in">type</span>;

	RelOptKind	reloptkind;

	/*
	 * <span class="hljs-built_in">all</span> relations included <span class="hljs-keyword">in</span> this RelOptInfo; <span class="hljs-built_in">set</span> of base + OJ relids
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
	<span class="hljs-built_in">bool</span>		consider_startup;
	/* ditto, <span class="hljs-keyword">for</span> parameterized paths? */
	<span class="hljs-built_in">bool</span>		consider_param_startup;
	/* consider parallel paths? */
	<span class="hljs-built_in">bool</span>		consider_parallel;

	/*
	 * default result targetlist <span class="hljs-keyword">for</span> Paths scanning this relation; <span class="hljs-built_in">list</span> of
	 * Vars/Exprs, cost, width
	 */
	struct PathTarget *reltarget;

	/*
	 * materialization information
	 */
	<span class="hljs-type">List</span>	   *pathlist;		/* Path structures */
	<span class="hljs-type">List</span>	   *ppilist;		/* ParamPathInfos used <span class="hljs-keyword">in</span> pathlist */
	<span class="hljs-type">List</span>	   *partial_pathlist;	/* partial Paths */
	struct Path *cheapest_startup_path;
	struct Path *cheapest_total_path;
	struct Path *cheapest_unique_path;
	<span class="hljs-type">List</span>	   *cheapest_parameterized_paths;

	/*
	 * parameterization information needed <span class="hljs-keyword">for</span> both base rels <span class="hljs-keyword">and</span> join rels
	 * (see also lateral_vars <span class="hljs-keyword">and</span> lateral_referencers)
	 */
	/* rels directly laterally referenced */
	Relids		direct_lateral_relids;
	/* minimum parameterization of rel */
	Relids		lateral_relids;

	/*
	 * information about a base rel (<span class="hljs-keyword">not</span> <span class="hljs-built_in">set</span> <span class="hljs-keyword">for</span> join rels!)
	 */
	Index		relid;
	/* containing tablespace */
	Oid			reltablespace;
	/* RELATION, SUBQUERY, FUNCTION, etc */
	RTEKind		rtekind;
	/* smallest attrno of rel (often &lt;<span class="hljs-number">0</span>) */
	AttrNumber	min_attr;
	/* largest attrno of rel */
	AttrNumber	max_attr;
	/* array indexed [min_attr .. max_attr] */
	Relids	   *attr_needed pg_node_attr(read_write_ignore);
	/* array indexed [min_attr .. max_attr] */
	int32	   *attr_widths pg_node_attr(read_write_ignore);

	/*
	 * Zero-based <span class="hljs-built_in">set</span> containing attnums of NOT NULL columns.  Not populated
	 * <span class="hljs-keyword">for</span> rels corresponding to non-partitioned inh==true RTEs.
	 */
	Bitmapset  *notnullattnums;
	/* relids of outer joins that can null this baserel */
	Relids		nulling_relids;
	/* LATERAL Vars <span class="hljs-keyword">and</span> PHVs referenced by rel */
	<span class="hljs-type">List</span>	   *lateral_vars;
	/* rels that reference this baserel laterally */
	Relids		lateral_referencers;
	/* <span class="hljs-built_in">list</span> of IndexOptInfo */
	<span class="hljs-type">List</span>	   *indexlist;
	/* <span class="hljs-built_in">list</span> of StatisticExtInfo */
	<span class="hljs-type">List</span>	   *statlist;
	/* size estimates derived <span class="hljs-keyword">from</span> pg_class */
	BlockNumber pages;
	Cardinality tuples;
	double		allvisfrac;
	/* indexes <span class="hljs-keyword">in</span> PlannerInfo<span class="hljs-string">&#x27;s eq_classes list of ECs that mention this rel */
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
	/* use &amp;#34;struct FdwRoutine&amp;#34; to avoid including fdwapi.h here */
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
	 * means it&#x27;</span>s considered unpartitioned
	 */
	<span class="hljs-built_in">int</span>			nparts;
	/* Partition bounds */
	struct PartitionBoundInfoData *boundinfo pg_node_attr(read_write_ignore);
	/* <span class="hljs-literal">True</span> <span class="hljs-keyword">if</span> partition bounds were created by partition_bounds_merge() */
	<span class="hljs-built_in">bool</span>		partbounds_merged;
	/* Partition constraint, <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> the root */
	<span class="hljs-type">List</span>	   *partition_qual;

	/*
	 * Array of RelOptInfos of partitions, stored <span class="hljs-keyword">in</span> the same order <span class="hljs-keyword">as</span> bounds
	 * (don<span class="hljs-string">&#x27;t print, too bulky and duplicative)
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
	 * These arrays are of length partkey-&gt;partnatts, which we don&#x27;</span>t have at
	 * hand, so don<span class="hljs-string">&#x27;t try to print
	 */

	/* Non-nullable partition key expressions */
	List	  **partexprs pg_node_attr(read_write_ignore);
	/* Nullable partition key expressions */
	List	  **nullable_partexprs pg_node_attr(read_write_ignore);
} RelOptInfo;
</span></code></pre>
<ol>
<li><strong>تقدير الكلف وإضافة مسارات الوصول:</strong> يقيّم المخطِّط جميع أساليب الوصول المحتملة عبر الخطوات الفرعية التالية: <strong>المسح التسلسلي:</strong> يُنشأ مسار للمسح التسلسلي، وتُقدَّر كلفته، ويُضاف المسار إلى قائمة pathlist في بنية RelOptInfo.</li>
<li><strong>مسح الفهرس:</strong> إذا وُجدت فهارس ملائمة، تُنشأ مسارات وصول للفهرس. ويقدّر المخطِّط كلف عمليات مسح الفهرس هذه ويضيف المسارات الناتجة إلى pathlist.</li>
<li><strong>المسح بخرائط البتات:</strong> إذا كان المسح بخرائط البتات ممكنًا، تُنشأ مسارات مقابلة. وتُقدَّر كلفها وتُضاف إلى pathlist.</li>
</ol>
<p><strong>اختيار المسار الأقل كلفة:</strong> يقارن المخطِّط جميع المدخلات في قائمة pathlist في بنية RelOptInfo ويختار المدخلة ذات الكلفة الإجمالية الأدنى.</p>
<p><strong>تقدير الكلف المساعدة:</strong> إذا تضمّن الاستعلام دوال LIMIT أو ORDER BY أو AGGREGATE، يقدّر المخطِّط الكلف الإضافية المرتبطة بهذه العمليات ويحدّث الخطة وفقًا لذلك.</p>
<p>ويوضّح المثالان التاليان هذه العملية بالتفصيل.</p>
<h3 id="3321-المثال-الأول">3.3.2.1. المثال الأول</h3>
<p>يستكشف هذا المثال استعلامًا بسيطًا ذا جدول واحد بلا فهارس. ويتضمّن الاستعلام عبارتي WHERE وORDER BY معًا:</p>
<pre><code>testdb=# \\d tbl_1
     Table &amp;#34;public.tbl_1&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# SELECT * FROM tbl_1 WHERE id &lt; 300 ORDER BY data;
</code></pre>
<p>ويوضّح الشكلان 3.10 و3.11 عمليات المخطِّط لهذا الاستعلام.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-10.webp" alt=""></p>
<h4>الشكل 3.10. كيفية تحديد المسار الأقل كلفة في المثال الأول</h4>
<ul>
<li>(1) <strong>إنشاء بنية RelOptInfo:</strong> يُنشئ المخطِّط بنية RelOptInfo ويخزّنها في simple_rel_array ضمن PlannerInfo.</li>
<li>(2) <strong>إضافة عبارة WHERE إلى baserestrictinfo:</strong> تُضاف العبارة «id &lt; 300» إلى baserestrictinfo بواسطة الدالة distribute_restrictinfo_to_rels() (المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/initsplan.c">initsplan.c</a>). ولأن الجدول الهدف لا يحتوي على فهارس، يبقى indexlist في RelOptInfo بالقيمة NULL.</li>
<li>(3) <strong>إضافة مفتاح pathkey الخاص بالفرز إلى sort_pathkeys:</strong> تضيف الدالة standard_qp_callback() (المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/planner.c">planner.c</a>) مفاتيح pathkey الملائمة إلى sort_pathkeys في PlannerInfo. ومفتاح pathkey بنية بيانات تمثّل ترتيب الفرز لمسار ما. وفي هذا المثال، يُضاف العمود ‘data’ كمفتاح pathkey بسبب عبارة ORDER BY.</li>
<li>(4) <strong>تقدير كلفة المسح التسلسلي:</strong> يُنشئ المخطِّط بنية <code>Path</code> ويقدّر كلفة المسح التسلسلي باستخدام الدالة cost_seqscan(). وتُكتب هذه الكلف المقدَّرة في المسار، الذي يُضاف بعد ذلك إلى RelOptInfo بواسطة الدالة add_path() (المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/optimizer/util/pathnode.c">pathnode.c</a>).</li>
</ul>
<p>ولعدم وجود فهارس، يكون المسح التسلسلي أسلوب الوصول الوحيد المتاح، ما يجعله مسار الوصول الأقل كلفة المحدَّد تلقائيًا للعلاقة الأساسية.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-11.webp" alt=""></p>
<h4>الشكل 3.11. كيفية تحديد المسار الأقل كلفة في المثال الأول. (تابع من الشكل 3.10)</h4>
<ul>
<li>(5) <strong>إنشاء RelOptInfo جديدة للفرز:</strong> تُنشأ بنية RelOptInfo جديدة خصيصًا لمعالجة إجراء ORDER BY. ولاحظ أن هذه البنية الجديدة لا تحتوي على baserestrictinfo (معلومات عبارة WHERE).</li>
<li>(6) <strong>إنشاء SortPath وربطه:</strong> تُنشأ بنية <code>SortPath</code> وتُضاف إلى RelOptInfo الجديدة. ويتكوّن SortPath من مكوّنين رئيسيين: المسار نفسه (الذي يخزّن البيانات الوصفية لعملية الفرز) ومسار فرعي (يشير إلى مسار الوصول الأساسي الأقل كلفة).</li>
</ul>
<p>** ** SortPath</p>
<pre><code>typedef struct SortPath
{
	Path	path;
	Path	*subpath;		/* path representing input source */
} SortPath;
</code></pre>
<p>ورغم أن RelOptInfo الجديدة تفتقر إلى baserestrictinfo، فإن حقل parent في مسار المسح التسلسلي يحتفظ برابط إلى RelOptInfo الأصلية. وبناءً على ذلك، يمكن للمخطِّط أثناء مرحلة إنشاء شجرة الخطة (الموصوفة في القسم 3.3.3) أن يربط عبارة WHERE بشكل صحيح بعقدة المسح التسلسلي بوصفها «Filter».</p>
<p>وتُنشأ شجرة الخطة النهائية بناءً على مسار الوصول الأقل كلفة المحدَّد هنا. وتُقدَّم تفاصيل هذا التحويل في القسم 3.3.3.</p>
<h3 id="3322-المثال-الثاني">3.3.2.2. المثال الثاني</h3>
<p>يفحص هذا المثال استعلامًا ذا جدول واحد على جدول يحتوي على فهرسين. ويتضمّن الاستعلام عبارة WHERE:</p>
<pre><code>testdb=# \\d tbl_2
     Table &amp;#34;public.tbl_2&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &amp;#34;tbl_2_pkey&amp;#34; PRIMARY KEY, btree (id)
    &amp;#34;tbl_2_data_idx&amp;#34; btree (data)

testdb=# SELECT * FROM tbl_2 WHERE id &lt; 240;
</code></pre>
<p>وتوضّح الأشكال 3.12 حتى 3.14 عمليات المخطِّط لهذا الاستعلام.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-12.webp" alt=""></p>
<h4>الشكل 3.12. كيفية تحديد المسار الأقل كلفة في المثال الثاني.</h4>
<ul>
<li>(1) <strong>إنشاء بنية RelOptInfo:</strong> يهيّئ المخطِّط بنية RelOptInfo للجدول الهدف.</li>
<li>(2) <strong>إضافة baserestrictinfo وindexlist:</strong> تُضاف عبارة WHERE «id &lt; 240» إلى baserestrictinfo. وفي الوقت نفسه، تُضاف البيانات الوصفية للفهرسين – tbl_2_pkey وtbl_2_data_idx – إلى indexlist.</li>
<li>(3) <strong>تقدير كلفة المسح التسلسلي:</strong> يُنشئ المخطِّط مسار Path للمسح التسلسلي، ويقدّر كلفته، ويضيفه إلى pathlist في RelOptInfo.</li>
</ul>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-13.webp" alt=""></p>
<h4>الشكل 3.13. كيفية تحديد المسار الأقل كلفة في المثال الثاني. (تابع من الشكل 3.12)</h4>
<ul>
<li>(4) <strong>إنشاء أول IndexPath وتقييمه:</strong> يعالج المخطِّط الفهارس في indexlist تسلسليًا. أولًا، ينشئ <code>IndexPath</code> الخاص بـ tbl_2_pkey. ولأن tbl_2_pkey معرَّف على العمود ‘id’ وتصفّي عبارة WHERE بواسطة العمود نفسه، تُخزَّن العبارة في حقل indexclauses في IndexPath. ثم تقيّم الدالة add_path() هذا المسار. وإذا كانت كلفته الإجمالية أقل من مسار المسح التسلسلي القائم، فإنه يُدرَج في بداية pathlist.</li>
<li>(5) <strong>إنشاء مسارات IndexPath اللاحقة وتقييمها:</strong> بعد ذلك، يُنشأ IndexPath الخاص بـ tbl_2_data_idx. غير أنه لأن الاستعلام لا يحتوي على عامل تصفية متعلق بالعمود ‘data’، يبقى indexclauses في هذا المسار بالقيمة NULL. وتُقدَّر الكلفة، ويُمرَّر المسار إلى add_path().</li>
</ul>
<p>** ** IndexPath</p>
<pre><code class="language-python">typedef struct IndexPath
{
	Path		path;
	IndexOptInfo *indexinfo;
	<span class="hljs-type">List</span>	   *indexclauses;
	<span class="hljs-type">List</span>	   *indexorderbys;
	<span class="hljs-type">List</span>	   *indexorderbycols;
	ScanDirection indexscandir;
	Cost		indextotalcost;
	Selectivity indexselectivity;
} IndexPath;

/*
 * IndexOptInfo
 *		Per-index information <span class="hljs-keyword">for</span> planning/optimization
 *
 *		indexkeys[] <span class="hljs-keyword">and</span> canreturn[] each have ncolumns entries.
 *
 *		indexcollations[], opfamily[], <span class="hljs-keyword">and</span> opcintype[] each have nkeycolumns
 *		entries.  These don<span class="hljs-string">&#x27;t contain any information about INCLUDE columns.
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
	/* back-link to index&#x27;</span>s table; don<span class="hljs-string">&#x27;t print, else infinite recursion */
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
	 * table column numbers of index&#x27;</span>s columns (both key <span class="hljs-keyword">and</span> included
	 * columns), <span class="hljs-keyword">or</span> <span class="hljs-number">0</span> <span class="hljs-keyword">for</span> expression columns
	 */
	<span class="hljs-built_in">int</span>		   *indexkeys pg_node_attr(array_size(ncolumns));
	/* OIDs of collations of index columns */
	Oid		   *indexcollations pg_node_attr(array_size(nkeycolumns));
	/* OIDs of operator families <span class="hljs-keyword">for</span> columns */
	Oid		   *opfamily pg_node_attr(array_size(nkeycolumns));
	/* OIDs of opclass declared <span class="hljs-built_in">input</span> data types */
	Oid		   *opcintype pg_node_attr(array_size(nkeycolumns));
	/* OIDs of btree opfamilies, <span class="hljs-keyword">if</span> orderable.  NULL <span class="hljs-keyword">if</span> partitioned index */
	Oid		   *sortopfamily pg_node_attr(array_size(nkeycolumns));
	/* <span class="hljs-keyword">is</span> sort order descending? <span class="hljs-keyword">or</span> NULL <span class="hljs-keyword">if</span> partitioned index */
	<span class="hljs-built_in">bool</span>	   *reverse_sort pg_node_attr(array_size(nkeycolumns));
	/* do NULLs come first <span class="hljs-keyword">in</span> the sort order? <span class="hljs-keyword">or</span> NULL <span class="hljs-keyword">if</span> partitioned index */
	<span class="hljs-built_in">bool</span>	   *nulls_first pg_node_attr(array_size(nkeycolumns));
	/* opclass-specific options <span class="hljs-keyword">for</span> columns */
	bytea	  **opclassoptions pg_node_attr(read_write_ignore);
	/* which index cols can be returned <span class="hljs-keyword">in</span> an index-only scan? */
	<span class="hljs-built_in">bool</span>	   *canreturn pg_node_attr(array_size(ncolumns));
	/* OID of the access method (<span class="hljs-keyword">in</span> pg_am) */
	Oid			relam;

	/*
	 * expressions <span class="hljs-keyword">for</span> non-simple index columns; redundant to <span class="hljs-built_in">print</span> since we
	 * <span class="hljs-built_in">print</span> indextlist
	 */
	<span class="hljs-type">List</span>	   *indexprs pg_node_attr(read_write_ignore);
	/* predicate <span class="hljs-keyword">if</span> a partial index, <span class="hljs-keyword">else</span> NIL */
	<span class="hljs-type">List</span>	   *indpred;

	/* targetlist representing index columns */
	<span class="hljs-type">List</span>	   *indextlist;

	/*
	 * parent relation<span class="hljs-string">&#x27;s baserestrictinfo list, less any conditions implied by
	 * the index&#x27;</span>s predicate (unless i<span class="hljs-string">t&#x27;s a target rel, see comments in
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
	/* true if index doesn&#x27;</span>t really exist */
	<span class="hljs-built_in">bool</span>		hypothetical;

	/*
	 * Remaining fields are copied <span class="hljs-keyword">from</span> the index AM<span class="hljs-string">&#x27;s API struct
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
	/* AM&#x27;</span>s cost estimator */
	/* Rather than include amapi.h here, we declare amcostestimate like this */
	void		(*amcostestimate) (struct PlannerInfo *, struct IndexPath *, double, Cost *, Cost *, Selectivity *, double *, double *) pg_node_attr(read_write_ignore);
};
</code></pre>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-14.webp" alt=""></p>
<h4>الشكل 3.14. كيفية تحديد المسار الأقل كلفة في المثال الثاني. (تابع من الشكل 3.13)</h4>
<ul>
<li>(6) <strong>إنشاء بنية RelOptInfo جديدة:</strong> تُهيَّأ بنية RelOptInfo جديدة لإتمام عملية الاختيار.</li>
<li>(7) <strong>اختيار المسار الأقل كلفة وتخزينه:</strong> في هذا المثال، يُختار مسح الفهرس باستخدام tbl_2_pkey بوصفه المسار الأقل كلفة. وبناءً على ذلك، يُضاف هذا المسار إلى pathlist في RelOptInfo الجديدة بوصفه الخطة المثلى.</li>
</ul>
<p>** ملاحظة</p>
<p>لا تضيف الدالة add_path() بالضرورة كل مسار تستقبله. فقد تُهمل مسارًا جديدًا إذا كان أغلى بكثير من مسار قائم له ترتيب فرز (pathkeys) مماثل أو أفضل. ونظرًا لتعقيد منطق التقليم هذا، راجع تعليقات الشيفرة المصدرية الخاصة بالدالة add_path() لمزيد من التفاصيل.</p>
<h2 id="333-إنشاء-شجرة-الخطة">3.3.3. إنشاء شجرة الخطة</h2>
<p>في المرحلة الأخيرة، يُنشئ المخطِّط شجرة خطة بناءً على المسار الأقل كلفة المحدَّد.</p>
<p>وجذر شجرة الخطة بنية <code>PlannedStmt</code>، المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/include/nodes/plannodes.h">plannodes.h</a>. ورغم أنها تحتوي على تسعة عشر حقلًا، تُوصف أربعة حقول تمثيلية أدناه:</p>
<ul>
<li><strong>commandType</strong> يخزّن نوع العملية، مثل SELECT أو UPDATE أو INSERT.</li>
<li><strong>rtable</strong> يخزّن مدخلات جدول النطاق.</li>
<li><strong>relationOids</strong> يخزّن معرّفات OIDs للجداول المرتبطة بالاستعلام.</li>
<li><strong>plantree</strong> يخزّن شجرة الخطة الفعلية، وهي تتكوّن من عقد خطط متنوعة.</li>
</ul>
<p>** ** PlannedStmt</p>
<pre><code class="language-python">typedef struct PlannedStmt
{
	pg_node_attr(no_equal, no_query_jumble)

	NodeTag		<span class="hljs-built_in">type</span>;

	/* select|insert|update|delete|merge|utility */
	CmdType		commandType;

	/* query identifier (copied <span class="hljs-keyword">from</span> Query) */
	int64		queryId;

	/* plan identifier (can be <span class="hljs-built_in">set</span> by plugins) */
	int64		planId;

	/* <span class="hljs-keyword">is</span> it insert|update|delete|merge RETURNING? */
	<span class="hljs-built_in">bool</span>		hasReturning;

	/* has insert|update|delete|merge <span class="hljs-keyword">in</span> WITH? */
	<span class="hljs-built_in">bool</span>		hasModifyingCTE;

	/* do I <span class="hljs-built_in">set</span> the command result tag? */
	<span class="hljs-built_in">bool</span>		canSetTag;

	/* redo plan when TransactionXmin changes? */
	<span class="hljs-built_in">bool</span>		transientPlan;

	/* <span class="hljs-keyword">is</span> plan specific to current role? */
	<span class="hljs-built_in">bool</span>		dependsOnRole;

	/* parallel mode required to execute? */
	<span class="hljs-built_in">bool</span>		parallelModeNeeded;

	/* which forms of JIT should be performed */
	<span class="hljs-built_in">int</span>			jitFlags;

	/* tree of Plan nodes */
	struct Plan *planTree;

	/*
	 * <span class="hljs-type">List</span> of PartitionPruneInfo contained <span class="hljs-keyword">in</span> the plan
	 */
	<span class="hljs-type">List</span>	   *partPruneInfos;

	/* <span class="hljs-built_in">list</span> of RangeTblEntry nodes */
	<span class="hljs-type">List</span>	   *rtable;

	/*
	 * RT indexes of relations that are <span class="hljs-keyword">not</span> subject to runtime pruning <span class="hljs-keyword">or</span> are
	 * needed to perform runtime pruning
	 */
	Bitmapset  *unprunableRelids;

	/*
	 * <span class="hljs-built_in">list</span> of RTEPermissionInfo nodes <span class="hljs-keyword">for</span> rtable entries needing one
	 */
	<span class="hljs-type">List</span>	   *permInfos;

	/* rtable indexes of target relations <span class="hljs-keyword">for</span> INSERT/UPDATE/DELETE/MERGE */
	/* integer <span class="hljs-built_in">list</span> of RT indexes, <span class="hljs-keyword">or</span> NIL */
	<span class="hljs-type">List</span>	   *resultRelations;

	/* <span class="hljs-built_in">list</span> of AppendRelInfo nodes */
	<span class="hljs-type">List</span>	   *appendRelations;

	/*
	 * Plan trees <span class="hljs-keyword">for</span> SubPlan expressions; note that some could be NULL
	 */
	<span class="hljs-type">List</span>	   *subplans;

	/* indices of subplans that require REWIND */
	Bitmapset  *rewindPlanIDs;

	/* a <span class="hljs-built_in">list</span> of PlanRowMark<span class="hljs-string">&#x27;s */
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
	/* length in bytes; 0 means &amp;#34;rest of string&amp;#34; */
	ParseLoc	stmt_len;
} PlannedStmt;
</span></code></pre>
<p>وتقابل كل عقدة في شجرة الخطة عملية معينة، مثل مسح تسلسلي أو فرز أو مسح فهرس.</p>
<p>وتعمل بنية <code>PlanNode</code> كعقدة أساسية، وتبدأ جميع عقد الخطط المحددة الأخرى (مثل SeqScan أو Sort) بحقل Plan.</p>
<p>وعلى سبيل المثال، تتكوّن <code>ScanNode</code>، وهي نوع مجرّد ترث منه جميع أنواع خطط مسح العلاقات، من بنية Plan يتبعها المتغير الصحيح scanrelid.</p>
<p>وتحتوي بنية PlanNode على أربعة عشر حقلًا، منها الحقول السبعة التمثيلية التالية:</p>
<ul>
<li><strong>startup_cost</strong> و<strong>total_cost</strong> تمثّلان الكلف المقدَّرة للعملية المقابلة للعقدة.</li>
<li><strong>plan_rows</strong> هو العدد المقدَّر للصفوف الواجب مسحها.</li>
<li><strong>targetlist</strong> يخزّن عناصر قائمة الأهداف المستردة من شجرة الاستعلام.</li>
<li><strong>qual</strong> قائمة بشروط التأهيل (عوامل التصفية) الواجب تطبيقها.</li>
<li><strong>lefttree</strong> و<strong>righttree</strong> مؤشّران إلى العقد الفرعية، ما يتيح البنية الهرمية للشجرة.</li>
</ul>
<p>** ** PlanNode</p>
<pre><code class="language-python">/* ----------------
 *		Plan node
 *
 * All plan nodes &amp;<span class="hljs-comment">#34;derive&amp;#34; from the Plan structure by having the</span>
 * Plan structure <span class="hljs-keyword">as</span> the first field.  This ensures that everything works
 * when nodes are cast to Plan<span class="hljs-string">&#x27;s.  (node pointers are frequently cast to Plan*
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
	 * planner&#x27;</span>s estimate of result size of this plan step
	 */
	/* number of rows plan <span class="hljs-keyword">is</span> expected to emit */
	Cardinality plan_rows;
	/* average row width <span class="hljs-keyword">in</span> <span class="hljs-built_in">bytes</span> */
	<span class="hljs-built_in">int</span>			plan_width;

	/*
	 * information needed <span class="hljs-keyword">for</span> parallel query
	 */
	/* engage parallel-aware logic? */
	<span class="hljs-built_in">bool</span>		parallel_aware;
	/* OK to use <span class="hljs-keyword">as</span> part of parallel plan? */
	<span class="hljs-built_in">bool</span>		parallel_safe;

	/*
	 * information needed <span class="hljs-keyword">for</span> asynchronous execution
	 */
	/* engage asynchronous-capable logic? */
	<span class="hljs-built_in">bool</span>		async_capable;

	/*
	 * Common structural data <span class="hljs-keyword">for</span> <span class="hljs-built_in">all</span> Plan types.
	 */
	/* unique across entire final plan tree */
	<span class="hljs-built_in">int</span>			plan_node_id;
	/* target <span class="hljs-built_in">list</span> to be computed at this node */
	<span class="hljs-type">List</span>	   *targetlist;
	/* implicitly-ANDed qual conditions */
	<span class="hljs-type">List</span>	   *qual;
	/* <span class="hljs-built_in">input</span> plan tree(s) */
	struct Plan *lefttree;
	struct Plan *righttree;
	/* Init Plan nodes (un-correlated expr subselects) */
	<span class="hljs-type">List</span>	   *initPlan;

	/*
	 * Information <span class="hljs-keyword">for</span> management of parameter-change-driven rescanning
	 *
	 * extParam includes the paramIDs of <span class="hljs-built_in">all</span> external PARAM_EXEC params
	 * affecting this plan node <span class="hljs-keyword">or</span> its children.  setParam params <span class="hljs-keyword">from</span> the
	 * node<span class="hljs-string">&#x27;s initPlans are not included, but their extParams are.
	 *
	 * allParam includes all the extParam paramIDs, plus the IDs of local
	 * params that affect the node (i.e., the setParams of its initplans).
	 * These are _all_ the PARAM_EXEC params that affect this node.
	 */
	Bitmapset  *extParam;
	Bitmapset  *allParam;
} Plan;
</span></code></pre>
<p>** ** ScanNode</p>
<pre><code>/*
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
</code></pre>
<p>تصف الأقسام التالية شجرتي الخطة المنشأتين من المسارين الأقل كلفة المحدَّدين في المثالين السابقين.</p>
<h3 id="3331-المثال-الأول">3.3.3.1. المثال الأول</h3>
<p>يصف هذا القسم شجرة الخطة المنشأة للاستعلام في القسم 3.3.2.1.</p>
<p>ويتكوّن المسار الأقل كلفة، الموضّح في الشكل 3.11، من SortPath كجذر ومسار مسح تسلسلي كابن له.</p>
<p>ورغم أن التفاصيل المعقّدة لعملية التحويل تُحذف هنا، فإن شجرة الخطة تُنشأ بشكل شبه مباشر من البنية الهرمية للمسار الأقل كلفة.</p>
<p>في هذا المثال، تُسنَد عقدة <code>SortNode</code> إلى حقل plantree في بنية PlannedStmt، وتُسنَد عقدة <code>SeqScanNode</code> إلى lefttree في عقدة Sort. وتظهر هذه البنية في الشكل 3.15(أ).</p>
<p>** ** SortNode</p>
<pre><code>/* ----------------
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
</code></pre>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-15.webp" alt=""></p>
<h4>الشكل 3.15. أمثلة على أشجار الخطط.</h4>
<h3 id="3332-المثال-الثاني">3.3.3.2. المثال الثاني</h3>
<p>يصف المثال الثاني شجرة الخطة للاستعلام في القسم 3.3.2.2.</p>
<p>وكما هو موضّح في الشكل 3.14، فإن المسار الأقل كلفة هو مسار مسح الفهرس؛ ولذلك تتكوّن شجرة الخطة الناتجة من <code>IndexScanNode</code> وحده. ويظهر ذلك في الشكل 3.15(ب).</p>
<p>** ** IndexScanNode</p>
<pre><code class="language-python">/* ----------------
 *		index scan node
 *
 * indexqualorig <span class="hljs-keyword">is</span> an implicitly-ANDed <span class="hljs-built_in">list</span> of index qual expressions, each
 * <span class="hljs-keyword">in</span> the same form it appeared <span class="hljs-keyword">in</span> the query WHERE condition.  Each should
 * be of the form (indexkey OP comparisonval) <span class="hljs-keyword">or</span> (comparisonval OP indexkey).
 * The indexkey <span class="hljs-keyword">is</span> a Var <span class="hljs-keyword">or</span> expression referencing column(s) of the index<span class="hljs-string">&#x27;s
 * base table.  The comparisonval might be any expression, but it won&#x27;</span>t use
 * <span class="hljs-built_in">any</span> columns of the base table.  The expressions are ordered by index
 * column position (but items referencing the same index column can appear
 * <span class="hljs-keyword">in</span> <span class="hljs-built_in">any</span> order).  indexqualorig <span class="hljs-keyword">is</span> used at runtime only <span class="hljs-keyword">if</span> we have to recheck
 * a lossy indexqual.
 *
 * indexqual has the same form, but the expressions have been commuted <span class="hljs-keyword">if</span>
 * necessary to put the indexkeys on the left, <span class="hljs-keyword">and</span> the indexkeys are replaced
 * by Var nodes identifying the index columns (their varno <span class="hljs-keyword">is</span> INDEX_VAR <span class="hljs-keyword">and</span>
 * their varattno <span class="hljs-keyword">is</span> the index column number).
 *
 * indexorderbyorig <span class="hljs-keyword">is</span> similarly the original form of <span class="hljs-built_in">any</span> ORDER BY expressions
 * that are being implemented by the index, <span class="hljs-keyword">while</span> indexorderby <span class="hljs-keyword">is</span> modified to
 * have index column Vars on the left-hand side.  Here, multiple expressions
 * must appear <span class="hljs-keyword">in</span> exactly the ORDER BY order, <span class="hljs-keyword">and</span> this <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> necessarily the
 * index column order.  Only the expressions are provided, <span class="hljs-keyword">not</span> the auxiliary
 * sort-order information <span class="hljs-keyword">from</span> the ORDER BY SortGroupClauses; i<span class="hljs-string">t&#x27;s assumed
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
 * indexes (for other indexes it should be &amp;#34;don&#x27;</span>t care&amp;<span class="hljs-comment">#34;).</span>
 * ----------------
 */
typedef struct Scan
{
	pg_node_attr(abstract)

	Plan		plan;
	Index		scanrelid;		/* relid <span class="hljs-keyword">is</span> index into the <span class="hljs-built_in">range</span> table */
} Scan;

typedef struct IndexScan
{
	Scan		scan;
	/* OID of index to scan */
	Oid			indexid;
	/* <span class="hljs-built_in">list</span> of index quals (usually OpExprs) */
	<span class="hljs-type">List</span>	   *indexqual;
	/* the same <span class="hljs-keyword">in</span> original form */
	<span class="hljs-type">List</span>	   *indexqualorig;
	/* <span class="hljs-built_in">list</span> of index ORDER BY exprs */
	<span class="hljs-type">List</span>	   *indexorderby;
	/* the same <span class="hljs-keyword">in</span> original form */
	<span class="hljs-type">List</span>	   *indexorderbyorig;
	/* OIDs of sort ops <span class="hljs-keyword">for</span> ORDER BY exprs */
	<span class="hljs-type">List</span>	   *indexorderbyops;
	/* forward <span class="hljs-keyword">or</span> backward <span class="hljs-keyword">or</span> don<span class="hljs-string">&#x27;t care */
	ScanDirection indexorderdir;
} IndexScan;
</span></code></pre>
<p>في هذا المثال، تعمل عبارة WHERE «id &lt; 240» كمُسند وصول. وبناءً على ذلك، تُخزَّن في حقل indexqual في IndexScanNode، بدلًا من حقل qual العام.</p>
<h1>3.4. أداء المنفِّذ</h1>
<p>يصف هذا القسم العملية الأساسية للمنفِّذ أثناء معالجة الاستعلامات.</p>
<p>كما يصف معالجة الدوال التجميعية والمعالجة الداخلية لقيود الجداول، وكلاهما مهم للاستخدام العملي.</p>
<p>محتويات القسم</p>
<ul>
<li>3.4.1. كيفية عمل المنفِّذ</li>
<li>3.4.2. الدوال التجميعية</li>
<li>3.4.3. القيود</li>
</ul>
<h2 id="341-كيفية-عمل-المنفذ">3.4.1. كيفية عمل المنفِّذ</h2>
<p>يستخدم PostgreSQL نموذج البركان (المعروف أيضًا بنموذج المكرِّر) لتنفيذ الاستعلامات.</p>
<p>وفي هذا النموذج، يعالج المنفِّذ شجرة الخطة باستدعاء الدوال المرتبطة بكل عقدة. ومن منظور تدفق البيانات، تنتقل الصفوف إلى الأعلى من العقد الورقية إلى الجذر.</p>
<p>ولكل عقدة خطة دوال محددة مسؤولة عن عملها، وتقع في الدليل <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/">src/backend/executor/</a>. على سبيل المثال:</p>
<ul>
<li><strong>المسح التسلسلي (SeqScan):</strong> معرَّف في <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeIndexscan.c">nodeSeqscan.c</a>.</li>
<li><strong>مسح الفهرس (IndexScan):</strong> معرَّف في <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeIndexscan.c">nodeIndexscan.c</a>.</li>
<li><strong>الفرز (Sort):</strong> معرَّف في <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeSort.c">nodeSort.c</a>.</li>
</ul>
<p>ويُفهَم عمل المنفِّذ بأفضل صورة من خلال فحص مخرَج الأمر EXPLAIN، الذي يعكس بنية شجرة الخطة. لنتأمل النتيجة التالية من المثال الأول (القسم 3.3.3.1):</p>
<pre><code>1
2
3
4
5
6
7
8
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT * FROM tbl_1 WHERE id &lt; 300 ORDER BY data;
                          QUERY PLAN
---------------------------------------------------------------
 Sort  (cost=182.34..183.09 rows=300 width=8)
   Sort Key: data
   -&gt;  Seq Scan on tbl_1  (cost=0.00..170.00 rows=300 width=8)
         Filter: (id &lt; 300)
(4 rows)
</code></pre>
<p>وعند تحليل مسار التنفيذ، يُقرأ مخرَج EXPLAIN عادةً من الأسفل إلى الأعلى:</p>
<ul>
<li><strong>السطر 6 (SeqScan):</strong> تمسح عقدة SeqScan (المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeSeqscan.c">nodeSeqscan.c</a>) الجدول الهدف تسلسليًا، وتطبّق عامل التصفية «id &lt; 300»، وتمرّر الصفوف الناتجة إلى الأعلى نحو SortNode.</li>
<li><strong>السطر 4 (Sort):</strong> تستقبل عقدة SortNode (المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/nodeSort.c">nodeSort.c</a>) الصفوف واحدًا واحدًا من عقدتها الفرعية (SeqScanNode) وتخزّنها في مخزن work_mem المؤقت. وبعد أن تنتهي العقدة الفرعية من تزويد الصفوف، تنفّذ SortNode عملية الفرز.</li>
</ul>
<p>ومن منظور تدفق التحكّم، يبدأ المنفِّذ من SortNode. ثم تستدعي SortNode عقدة SeqScan مرارًا للحصول على الصفوف. وكما هو موضّح في الشكل 3.16، تُجمَع هذه الصفوف في الذاكرة قبل تنفيذ الفرز النهائي.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-16.webp" alt=""></p>
<h4>الشكل 3.16. معالجة الفرز في المنفِّذ.</h4>
<h3 id="3411-دوال-المسح">3.4.1.1. دوال المسح</h3>
<p>كما ذُكر في القسم 1.3، تُخزَّن صفوف البيانات في كتل فيزيائية بحجم 8 كيلوبايت. وللوصول إلى صف بيانات واحد، على المنفِّذ أن يجتاز طبقات عديدة، مثل مدير المخازن المؤقتة (انظر <a href="/arabic-cs-library/book/postgres-internals/pgsql08/index">الفصل 8</a>) والتحكّم بالتزامن (انظر <a href="/arabic-cs-library/book/postgres-internals/pgsql05/index">الفصل 5</a>). علاوة على ذلك، تختلف طريقة الوصول حسب ما إذا كانت كتلة البيانات تنتمي إلى جدول أو فهرس.</p>
<p>وطريقة وصول المنفِّذ إلى صف بيانات واحد مجرَّدة للغاية، وتُخفي تعقيد الطبقات الوسيطة.</p>
<p>فعلى سبيل المثال، في حالة المسح التسلسلي، يمكن الوصول إلى صفوف جدول تسلسليًا مع مراعاة المعاملات عبر استدعاء الدالة <a href="https://github.com/postgres/postgres/blob/6ba9892f5cb8c2f1c2592198d938cc8f5cf52edc/src/backend/executor/nodeSeqscan.c#L50">SeqNext()</a> مرارًا. وفي حالة مسح الفهرس، يمكن تنفيذ مسح فهرس عبر استدعاء الدالة <a href="https://github.com/postgres/postgres/blob/6ba9892f5cb8c2f1c2592198d938cc8f5cf52edc/src/backend/executor/nodeIndexscan.c#L80">IndexNext()</a> مرارًا.</p>
<h3 id="3412-الملفات-المؤقتة">3.4.1.2. الملفات المؤقتة</h3>
<p>يستخدم المنفِّذ الذاكرة work_mem والمخازن المؤقتة temp_buffers المخصَّصة في الذاكرة لمعالجة الاستعلامات. غير أنه إذا تجاوزت مهمة – مثل الفرز أو التجميع بالتجزئة — الذاكرة المتاحة، يتحوّل المنفِّذ إلى ملفات مؤقتة على القرص.</p>
<p>وباستخدام خيار ANALYZE، ينفّذ الأمر EXPLAIN الاستعلام ويعرض أعداد الصفوف الفعلية وزمن التشغيل واستخدام الذاكرة أو القرص. ويُعرض مثال على ذلك أدناه:</p>
<pre><code> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
</code></pre>
<pre><code>testdb=# EXPLAIN ANALYZE SELECT id, data FROM tbl_25m ORDER BY id;
                                                        QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=3944070.01..3945895.01 rows=730000 width=4104) (actual time=885.648..1033.746 rows=730000 loops=1)
   Sort Key: id
   Sort Method: external sort  Disk: 10000kB
   -&gt;  Seq Scan on tbl_25m  (cost=0.00..10531.00 rows=730000 width=4104) (actual time=0.024..102.548 rows=730000 loops=1)
 Planning time: 1.548 ms
 Execution time: 1109.571 ms
(6 rows)
</code></pre>
<p>في السطر 6، يشير مخرَج EXPLAIN ANALYZE إلى أن المنفِّذ أجرى «فرزًا خارجيًا» واستخدم ملفًا مؤقتًا بحجم 10,000 كيلوبايت.</p>
<p>وتُنشأ الملفات المؤقتة تحت الدليل الفرعي <code>$PGDATA/base/pg_tmp</code>. وهي تتبع قاعدة تسمية محددة:</p>
<ul>
<li><strong>نمط الملف المؤقت:</strong> <code>pgsql_tmp[PID].[seq_number]</code></li>
</ul>
<p>على سبيل المثال، ملف باسم ‘pgsql_tmp8903.5’ يمثّل الملف المؤقت السادس (لأن رقم التسلسل يبدأ من الصفر) الذي أنشأته عملية Postgres ذات المعرّف PID 8903.</p>
<pre><code class="language-bash">$ <span class="hljs-built_in">ls</span> -la <span class="hljs-variable">$PGDATA</span>/base/pgsql_tmp*
-rw-------  1 postgres  postgres  10240000 12  4 14:18 pgsql_tmp8903.5
</code></pre>
<h2 id="342-الدوال-التجميعية">3.4.2. الدوال التجميعية</h2>
<p>عمليًا، يُعدّ الحساب الفعّال للدوال التجميعية دورًا حاسمًا لأنظمة قواعد البيانات. ويصف هذا القسم كيفية تعامل المنفِّذ مع الدوال التجميعية — مثل sum وaverage وvariance.</p>
<p>ويُستخدم الجدول التالي <code>d</code> في أمثلة هذا القسم:</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE TABLE</span> d (x <span class="hljs-type">DOUBLE PRECISION</span>);
<span class="hljs-keyword">CREATE TABLE</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">INSERT INTO</span> d <span class="hljs-keyword">SELECT</span> GENERATE_SERIES(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
<span class="hljs-keyword">INSERT</span> <span class="hljs-number">0</span> <span class="hljs-number">10</span>
</code></pre>
<p>وعند إصدار دالة sum، تُنشأ شجرة خطة كما هو موضّح في الشكل 3.17.</p>
<pre><code>testdb=# SELECT sum(x) FROM d;
 sum
-----
  55
(1 row)
</code></pre>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-17.webp" alt=""></p>
<h4>الشكل 3.17. شجرة خطة لدالة sum.</h4>
<p>وتظهر نتيجة الأمر EXPLAIN لهذا الاستعلام أدناه:</p>
<pre><code>1
2
3
4
5
6
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT sum(x) FROM d;
                       QUERY PLAN
--------------------------------------------------------
 Aggregate  (cost=38.25..38.26 rows=1 width=8)
   -&gt;  Seq Scan on d  (cost=0.00..32.60 rows=2260 width=8)
(2 rows)
</code></pre>
<ul>
<li><strong>السطر 5:</strong> تمسح عقدة SeqScan الجدول الهدف تسلسليًا وتمرّر قيم العمود الهدف ‘x’ إلى عقدة Aggregate.</li>
<li><strong>السطر 4:</strong> تستقبل عقدة Aggregate البيانات من عقدة SeqScan وتعالجها وفق الدالة التجميعية المحددة (مثل sum أو avg أو variance أو count).</li>
</ul>
<p>ويقدّم الشكل 3.18 نظرة عامة على كيفية معالجة الدالة التجميعية داخل المنفِّذ.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-18.webp" alt=""></p>
<h4>الشكل 3.18. معالجة الدوال التجميعية في المنفِّذ.</h4>
<p>وتستكشف الأقسام الفرعية التالية المعالجة الداخلية للدوال التجميعية بأمثلة محددة.</p>
<h3 id="3421-المجموع-والمتوسط">3.4.2.1. المجموع والمتوسط</h3>
<p>صيغتا المجموع <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> والمتوسط <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> هما:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Multiple \\tag" style="color:#cc0000">\\begin{align*} S_{n} &amp;amp;= \\sum_{i=1}^{n} x_{i} \\tag{3-16} \\ A_{n} &amp;amp;= \\frac{1}{n} \\sum_{i=1}^{n} x_{i} = \\frac{1}{n} S_{n} \\tag{3-17} \\end{align*}</span></p>
<p>حيث <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> يمثّل قيمة العمود الهدف في الصف رقم <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>.</p>
<p>وكما يظهر في هاتين الصيغتين، فإن الفرق الأساسي بين المجموع والمتوسط هو القسمة النهائية على العدد الإجمالي للعناصر <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>.</p>
<p>داخليًا، تُراكم عقدة <code>Aggregate</code> القيم الممسوحة تسلسليًا. وفي المرحلة النهائية من المعالجة، تُعيد العقدة المجموع المتراكم في عملية sum. وفي عملية avg، تُعيد المجموع المتراكم مقسومًا على عدد الصفوف المعالَجة (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>).</p>
<p>وتوضّح الشيفرة الزائفة التالية هذا المنطق:</p>
<pre><code class="language-python">d =[<span class="hljs-number">1.0</span>, <span class="hljs-number">2.0</span>, <span class="hljs-number">3.0</span>, <span class="hljs-number">4.0</span>, <span class="hljs-number">5.0</span>, <span class="hljs-number">6.0</span>, <span class="hljs-number">7.0</span>, <span class="hljs-number">8.0</span>, <span class="hljs-number">9.0</span>, <span class="hljs-number">10.0</span>]

N = <span class="hljs-number">0</span>
S = <span class="hljs-number">0</span>

<span class="hljs-comment"># Seq Scan</span>
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> d:

    <span class="hljs-comment"># Aggregate: Sum</span>
    N += <span class="hljs-number">1</span>
    S += x

<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;Sum=&amp;#34;, S)</span>
<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;Avg=&amp;#34;, S/N)</span>
</code></pre>
<h3 id="3422-التباين">3.4.2.2. التباين</h3>
<p>لأغراض التبسيط، يُعرَّف التباين <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> بناءً على مجموع مربعات الانحرافات عن المتوسط:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.9291em;vertical-align:-1.2777em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span><span class="katex-tag"><span class="katex-strut" style="height:2.9291em;vertical-align:-1.2777em;"></span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-18</span></span><span class="mord">)</span></span></span></span></span></span></p>
<p>وبناءً على هذا التعريف، يوفّر PostgreSQL نوعين من التباين:</p>
<ul>
<li><strong>تباين العيّنة (var_samp):</strong> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.2484em;vertical-align:-0.4033em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4033em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>. ويُستخدم عندما تمثّل البيانات عيّنة من مجتمع أكبر.</li>
<li><strong>تباين المجتمع (var_pop):</strong> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>. ويُستخدم عندما تمثّل البيانات المجتمع بأكمله.</li>
</ul>
<p>وتعرض الأمثلة التالية مخرَج الدالتين:</p>
<pre><code>testdb=# SELECT var_samp(x) FROM d;
     var_samp
-------------------
 9.166666666666666
(1 row)

testdb=# SELECT var_pop(x) FROM d;
 var_pop
---------
    8.25
(1 row)
</code></pre>
<h4>3.4.2.2.1. حساب التباين بمرور واحد (الإصدارات 11 أو أقدم)</h4>
<p>يتطلب التنفيذ الساذج لصيغة التباين (3-18) مرورين على البيانات: الأول لحساب المتوسط والثاني لحساب مجموع مربعات الفروق.</p>
<p>ولتحسين ذلك، يمكن اختصار الحساب إلى مرور واحد باستخدام الصيغة التالية:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.9291em;vertical-align:-1.2145em;"></span><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7145em;"><span style="top:-3.7145em;"><span class="pstrut" style="height:3.6514em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2145em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7145em;"><span style="top:-3.7145em;"><span class="pstrut" style="height:3.6514em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace"> </span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2145em;"><span></span></span></span></span></span></span></span><span class="katex-tag"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7145em;"><span style="top:-3.7145em;"><span class="pstrut" style="height:3.6514em;"></span><span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-19</span></span><span class="mord">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2145em;"><span></span></span></span></span></span></span></span></span></p>
<p>وتتيح هذه المقاربة للمنفِّذ حساب التباين تكراريًا بالحفاظ على مجاميع جارية لكل من مجموع المربعات (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mop op-symbol small-op" style="position:relative;top:0em;">∑</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span>) ومجموع القيم (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>).</p>
<p>وتوضّح الشيفرة الزائفة التالية هذا المنطق:</p>
<pre><code class="language-python">d =[<span class="hljs-number">1.0</span>, <span class="hljs-number">2.0</span>, <span class="hljs-number">3.0</span>, <span class="hljs-number">4.0</span>, <span class="hljs-number">5.0</span>, <span class="hljs-number">6.0</span>, <span class="hljs-number">7.0</span>, <span class="hljs-number">8.0</span>, <span class="hljs-number">9.0</span>, <span class="hljs-number">10.0</span>]

N = <span class="hljs-number">0</span>
S = <span class="hljs-number">0</span>
X2 = <span class="hljs-number">0</span>

<span class="hljs-comment"># SeqScan</span>
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> d:

    <span class="hljs-comment"># Aggregate: Variance</span>
    N += <span class="hljs-number">1</span>
    S += x
    X2 += x**<span class="hljs-number">2</span>

V = X2 - S**<span class="hljs-number">2</span>/N

<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;V=&amp;#34;, V)</span>
<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;Var_samp=&amp;#34;, V/(N-1))</span>
<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;Var_pop=&amp;#34;, V/N)</span>
</code></pre>
<p>** إعادة كتابة طريقة المرورين إلى طريقة المرور الواحد</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.9317em;vertical-align:-1.2158em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7158em;"><span style="top:-3.7158em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2158em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7158em;"><span style="top:-3.7158em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2</span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2</span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace"> </span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2158em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7158em;"><span style="top:-3.7158em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:1.654em;"><span style="top:-3.9029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="minner"><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:1.654em;"><span style="top:-3.9029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace"> </span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2158em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7158em;"><span style="top:-3.7158em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span><span class="mspace"> </span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2158em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.7158em;"><span style="top:-3.7158em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6514em;"><span style="top:-1.8723em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">1</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">∑</span></span></span><span style="top:-4.3em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2777em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">n</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.2158em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<h4>3.4.2.2.2. طريقة Youngs وCramer (الإصدارات 12 أو أحدث)</h4>
<p>في عام 2016، سلّطت ورقة بحثية بعنوان «<a href="https://sigmodrecord.org/publications/sigmodRecord/1612/pdfs/05_vision_Kamat.pdf">A Closer Look at Variance ImplementationsIn Modern Database Systems</a>» الضوء على قيود الدقة في حساب التباين في PostgreSQL.</p>
<p>ولمعالجة هذه المخاوف، طُوِّرت <a href="https://www.postgresql.org/message-id/flat/153313051300.1397.9594490737341194671@wrigleys.postgresql.org">رقعة</a> في نوفمبر 2018، ما أدى إلى تبنّي طريقة <a href="http://i.stanford.edu/pub/cstr/reports/cs/tr/79/773/CS-TR-79-773.pdf">Youngs وCramer</a> في الإصدار 12 من PostgreSQL. وتوفّر هذه الخوارزمية استقرارًا عدديًا ودقة أعلى بكثير من صيغة المرور الواحد القياسية<a href="#fn:1">1</a>.</p>
<p>وتوضّح الشيفرة الزائفة التالية تنفيذ طريقة Youngs وCramer (راجع الملحق 1.1 للتفاصيل.):</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.8em;vertical-align:-0.65em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size2">{</span></span><span class="mord"><span class="mtable"><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.014em;"><span style="top:-3.014em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.514em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.014em;"><span style="top:-3.014em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0</span><span class="mspace"> </span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.514em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.014em;"><span style="top:-3.014em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2083em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mopen mtight">(</span><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.52em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.514em;"><span></span></span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span><span class="katex-tag"><span class="katex-strut" style="height:1.8em;vertical-align:-0.65em;"></span><span class="mord text"><span class="mord">(</span><span class="mord"><span class="mord">3-20</span></span><span class="mord">)</span></span></span></span></span></span></p>
<p>وفيما يلي الشيفرة الزائفة لطريقة Youngs وCramer:</p>
<pre><code class="language-python">d =[<span class="hljs-number">1.0</span>, <span class="hljs-number">2.0</span>, <span class="hljs-number">3.0</span>, <span class="hljs-number">4.0</span>, <span class="hljs-number">5.0</span>, <span class="hljs-number">6.0</span>, <span class="hljs-number">7.0</span>, <span class="hljs-number">8.0</span>, <span class="hljs-number">9.0</span>, <span class="hljs-number">10.0</span>]

N = <span class="hljs-number">0</span>
S = <span class="hljs-number">0</span>
V = <span class="hljs-number">0</span>

<span class="hljs-comment"># SeqScan</span>
<span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> d:

    <span class="hljs-comment"># Aggregate: Variance</span>
    N += <span class="hljs-number">1</span>
    S += x
    <span class="hljs-keyword">if</span> <span class="hljs-number">1</span> &lt; N:
        V += (x * N - S)**<span class="hljs-number">2</span> / (N * (N-<span class="hljs-number">1</span>))

<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;V=&amp;#34;, V)</span>
<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;Var_samp=&amp;#34;, V/(N-1))</span>
<span class="hljs-built_in">print</span>(&amp;<span class="hljs-comment">#34;Var_pop=&amp;#34;, V/N)</span>
</code></pre>
<h2 id="343-القيود">3.4.3. القيود</h2>
<p>عندما ينفّذ PostgreSQL عبارة INSERT أو UPDATE أو DELETE، يتحقق المنفِّذ من القيود المعرَّفة على الجدول الهدف.</p>
<p>ويركّز هذا القسم على الأنواع الثلاثة الشائعة التالية من القيود:</p>
<ol>
<li>قيود NOT NULL وCHECK</li>
<li>قيود PRIMARY KEY وUNIQUE</li>
<li>قيود FOREIGN KEY</li>
</ol>
<p>ولتوضيح كيفية معالجة PostgreSQL لهذه القيود، لنتأمل إدراج صف واحد.</p>
<p>وتوضّح الشيفرة الزائفة أدناه التدفق الرئيسي للدالة <code>ExecInsert()</code>:</p>
<pre><code>ExecInsert() @ nodeModifyTable.c

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
</code></pre>
<p>والخطوات الرئيسية هي:</p>
<p><strong>الكتلة 1: التحقق من قيود الجدول</strong></p>
<ul>
<li>(1) تتحقق ExecConstraints() من قيود <strong>NOT NULL</strong> وقيود <strong>CHECK</strong>.</li>
</ul>
<p><strong>الكتلة 2: إدراج صف الكومة</strong></p>
<ul>
<li>(2) تُدرج table_tuple_insert() الصف في جدول الكومة.</li>
</ul>
<p><strong>الكتلة 3: إدراج صفوف الفهرس وفرض الفرادة</strong></p>
<ul>
<li>(3) تعالج ExecInsertIndexTuples() جميع الفهارس التابعة للجدول.</li>
<li>(4) تُدرج index_insert() صف الفهرس المقابل في كل فهرس.</li>
<li>(5) تتحقق _bt_check_unique() مما إذا كان هناك مفتاح متعارض موجود بالفعل. وهنا تُفرَض قيود <strong>UNIQUE</strong> و<strong>PRIMARY KEY</strong>.</li>
</ul>
<p><strong>الكتلة 4: تنفيذ محفّزات AFTER ROW INSERT</strong></p>
<ul>
<li>(6) تنفّذ ExecARInsertTriggers() محفّزات AFTER INSERT.</li>
<li>(7) تتحقق RI_FKey_check_ins() من قيود <strong>FOREIGN KEY</strong>.</li>
</ul>
<p>وتشرح الأقسام التالية كل نوع من أنواع القيود بمزيد من التفصيل.</p>
<h3 id="3431-قيود-not-null-وcheck">3.4.3.1. قيود NOT NULL وCHECK</h3>
<p>يتحقق PostgreSQL من هذين القيدين في <strong>الكتلة 1</strong>.</p>
<p>تتحقق الدالة ExecConstraints() من قيود <strong>NOT NULL</strong> وقيود <strong>CHECK</strong>. وبتعبير أدق، تقيّم الدالة ExecRelCheck() قيود CHECK.</p>
<p>ويخزّن PostgreSQL تعريفات قيود CHECK في كتالوج النظام <a href="https://www.postgresql.org/docs/current/catalog-pg-constraint.html">pg_constraint</a>. ويحمّل PostgreSQL هذه التعريفات في الذاكرة ويقيّم التعبيرات المقابلة لكل صف يُدرَج أو يُحدَّث.</p>
<p>وتنطبق الآلية نفسها على عبارات UPDATE.</p>
<h3 id="3432-قيود-primary-key-وunique">3.4.3.2. قيود PRIMARY KEY وUNIQUE</h3>
<p>يتحقق PostgreSQL من قيود <strong>PRIMARY KEY</strong> و<strong>UNIQUE</strong> في <strong>الكتلة 3</strong>.</p>
<p>عند إدراج صف فهرس في فهرس UNIQUE، يتحقق PostgreSQL مما إذا كان هناك مفتاح متعارض موجود بالفعل في الفهرس.</p>
<p>وتجري الدالة _bt_check_unique() هذا التحقق لفهارس B-tree. ولأن الدالة تفحص الفهرس مباشرةً، يجري التحقق في زمن يقارب <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، حيث <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> عدد مدخلات الفهرس.</p>
<p>وتنطبق الآلية نفسها على عبارات UPDATE.</p>
<h3 id="3433-قيود-foreign-key">3.4.3.3. قيود FOREIGN KEY</h3>
<p>يتحقق PostgreSQL من قيود <strong>FOREIGN KEY</strong> في <strong>الكتلة 4</strong>.</p>
<p>تتطلب قيود FOREIGN KEY من PostgreSQL التحقق من صفوف في جدول آخر. لذلك يكون التنفيذ أكثر تعقيدًا من تنفيذ النوعين السابقين من القيود.</p>
<p>لنتأمل الجدولين التاليين:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> tbl_parent (
    id <span class="hljs-type">int</span> <span class="hljs-keyword">PRIMARY KEY</span>,
    data text
);

<span class="hljs-keyword">CREATE TABLE</span> tbl_child (
    cid <span class="hljs-type">int</span> <span class="hljs-keyword">REFERENCES</span> tbl_parent(id),
    data text
);
</code></pre>
<p>افترض أن PostgreSQL ينفّذ العبارة التالية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> tbl_child <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;test&#x27;</span>);
</code></pre>
<p>أثناء الكتلة 4، ينفّذ PostgreSQL دالة محفّز FOREIGN KEY.</p>
<p>في الإصدارات 18 والأقدم، يولّد المحفّز استعلامًا مشابهًا لما يلي وينفّذه:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span>
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">ONLY</span> <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;public<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;.<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;tbl_parent<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>; x
<span class="hljs-keyword">WHERE</span> <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;id<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>; OPERATOR(pg_catalog.<span class="hljs-operator">=</span>) $<span class="hljs-number">1</span>
<span class="hljs-keyword">FOR</span> KEY SHARE <span class="hljs-keyword">OF</span> x;
</code></pre>
<p>يستخدم بيان SELECT هذا <em>FOR KEY SHARE</em> لقفل الصف المُشار إليه. ويمنع هذا القفل المعاملات المتزامنة من حذف الصف أو تعديل المفتاح المُشار إليه أثناء تحقق PostgreSQL من قيد المفتاح الأجنبي.</p>
<p>وينفّذ PostgreSQL بيان SELECT هذا عبر <a href="https://www.postgresql.org/docs/current/spi.html">واجهة برمجة الخادم (SPI)</a>.</p>
<p>ولأن SPI ينفّذ استعلام SQL داخليًا، يجب على PostgreSQL إجراء معالجة استعلام للاستعلام المولَّد. وتضيف هذه المعالجة كلفة إلى كل تحقق من مفتاح أجنبي.</p>
<p>وبناءً على ذلك، يؤدي إدراج صف واحد في الجدول الابن إلى تنفيذ استعلام SELECT داخلي إضافي.</p>
<h4>التحقق المباشر من FOREIGN KEY في PostgreSQL 19</h4>
<p>يقدّم الإصدار 19 من PostgreSQL (عام 2026) مسار تنفيذ جديدًا للتحقق من FOREIGN KEY.</p>
<p>عندما يدعم فهرس مناسب قيد PRIMARY KEY أو UNIQUE المُشار إليه، يمكن لـ PostgreSQL التحقق من FOREIGN KEY بفحص الفهرس المُشار إليه مباشرةً بدلًا من توليد استعلام SELECT داخلي وتنفيذه عبر SPI.</p>
<ul>
<li>يجري PostgreSQL بحثًا مباشرًا في فهرس PRIMARY KEY أو UNIQUE المُشار إليه.</li>
<li>يتجنّب ذلك كلفة المخطِّط والمنفِّذ وSPI المرتبطة بتنفيذ عبارة SQL داخلية.</li>
<li>لا يزال PostgreSQL يحصل على قفل الصف المطلوب على الصف المُشار إليه للحفاظ على دلالات FOREIGN KEY.</li>
<li>إذا لم يتوفر بحث مباشر في الفهرس، يعود PostgreSQL إلى التنفيذ التقليدي القائم على SPI.</li>
</ul>
<p>ولا يغيّر هذا التحسين سلوك فرض قيود FOREIGN KEY. بل يقلّل كلفة كل تحقق من قيد بإزالة مسار تنفيذ استعلام SPI الداخلي متى أمكن، ما يحسّن أداء INSERT وUPDATE لكثير من أحمال العمل.</p>
<ol>
<li>تحسب هذه الطريقة التباين تكراريًا دون الحاجة إلى مجموع المربعات، ما يقلّل خطر الإلغاء الكارثي في الحساب العشري العائم. <a href="#fnref:1">↩︎</a></li>
</ol>
<h1>3.5. عمليات الربط (Join Operations)</h1>
<p>يدعم PostgreSQL ثلاث عمليات ربط: الربط بالحلقة المتداخلة، والربط بالدمج، والربط بالتجزئة. وللربط بالحلقة المتداخلة والربط بالدمج في PostgreSQL عدة صور مختلفة.</p>
<p>وفي ما يلي، نفترض أن القارئ على دراية بالسلوك الأساسي لهذه الأنواع الثلاثة من الربط.</p>
<p>وإذا لم تكن هذه المصطلحات مألوفة لديك، فراجع المراجع التالية:</p>
<p>** مراجع</p>
<ol>
<li>Abraham Silberschatz, Henry F. Korth, and S. Sudarshan, «<a href="https://www.amazon.com/dp/0073523321">Database System Concepts</a>»، McGraw-Hill Education، ISBN-13: 978-0073523323</li>
<li>Thomas M. Connolly, and Carolyn E. Begg, «<a href="https://www.amazon.com/dp/0321523067">Database Systems</a>»، Pearson، ISBN-13: 978-0321523068</li>
</ol>
<p>غير أنه لما كانت الشروح المتعلقة بالربط الهجين بالتجزئة مع الانحراف المدعوم في PostgreSQL قليلة، فسيُشرح هنا بمزيد من التفصيل.</p>
<p>محتويات القسم</p>
<ul>
<li>الربط بالحلقة المتداخلة</li>
<li>الربط بالدمج</li>
<li>الربط بالتجزئة</li>
<li>مسارات الربط وعقده</li>
</ul>
<p>لاحظ أن أساليب الربط الثلاثة المدعومة في PostgreSQL يمكنها تنفيذ جميع عمليات الربط، ليس INNER JOIN فقط، بل أيضًا LEFT/RIGHT OUTER JOIN وFULL OUTER JOIN وغيرها. غير أننا نركّز في هذا الفصل على NATURAL INNER JOIN لأغراض التبسيط.</p>
<h1>3.6. إنشاء شجرة الخطة لاستعلام متعدد الجداول</h1>
<p>يُشرح في هذا القسم عملية إنشاء شجرة خطة لاستعلام متعدد الجداول.</p>
<p>محتويات القسم</p>
<ul>
<li>3.6.1. المعالجة المسبقة</li>
<li>3.6.2. تحديد المسار الأقل كلفة</li>
<li>3.6.3. تحديد المسار الأقل كلفة لاستعلام بثلاثة جداول</li>
</ul>
<h2 id="361-المعالجة-المسبقة">3.6.1. المعالجة المسبقة</h2>
<p>تستدعي الدالة subquery_planner()، المعرَّفة في <a href="https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/planner.c">planner.c</a>، مرحلة المعالجة المسبقة.</p>
<p>وبينما وُصفت المعالجة المسبقة للاستعلامات ذات الجدول الواحد في القسم 3.3.1، يركّز هذا القسم الفرعي على المعالجة المسبقة الخاصة بالاستعلامات متعددة الجداول.</p>
<p>ونظرًا للعدد الكبير من المهام المنفَّذة، تُوصف العمليات الأساسية فقط هنا.</p>
<p><strong>معالجة تعبيرات الجداول الشائعة (CTEs) وتحويلها:</strong> إذا وُجدت قوائم WITH، يعالج المخطِّط كل تعبير جدول شائع (CTE) باستخدام الدالة SS_process_ctes().</p>
<p><strong>رفع الاستعلامات الفرعية:</strong> إذا كان استعلام فرعي في عبارة FROM لا يحتوي على عبارات GROUP BY أو HAVING أو ORDER BY أو LIMIT أو DISTINCT، ولا يستخدم INTERSECT أو EXCEPT، يحوّله المخطِّط إلى صيغة ربط باستخدام الدالة pull_up_subqueries(). على سبيل المثال، يمكن تحويل استعلام يحتوي على استعلام فرعي في عبارة FROM إلى ربط طبيعي:</p>
<pre><code>testdb=# SELECT * FROM tbl_a AS a, (SELECT * FROM tbl_b) as b WHERE a.id = b.id;
</code></pre>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">⇓</span></span></span></span></span></p>
<pre><code>testdb=# SELECT * FROM tbl_a AS a, tbl_b as b WHERE a.id = b.id;
</code></pre>
<p><strong>تحويل عمليات الربط الخارجي إلى ربط داخلي:</strong> يحوّل المخطِّط عملية ربط خارجي إلى ربط داخلي كلما سمحت شروط الربط أو قيود عبارة WHERE بتنفيذ ربط داخلي أكثر كفاءة دون تغيير مجموعة النتائج.</p>
<h2 id="362-تحديد-المسار-الأقل-كلفة">3.6.2. تحديد المسار الأقل كلفة</h2>
<p>لتحديد شجرة الخطة المثلى، على المخطِّط أن ينظر في جميع توليفات الفهارس وأساليب الربط. وهذه عملية مكلفة للغاية وتصبح مستحيلة إذا زاد عدد الجداول بسبب الانفجار التوليفي.</p>
<p>وعندما يكون عدد جداول الربط صغيرًا نسبيًا (أقل من 12 عادةً)، يستخدم المخطِّط البرمجة الديناميكية لتحديد الخطة المثلى.</p>
<p>** محسِّن الاستعلام الجيني (GQO)</p>
<p>عند تنفيذ استعلام يربط جداول كثيرة، يُستغرَق وقت هائل لتحسين خطة الاستعلام. ولمعالجة هذه الحالة، ينفّذ PostgreSQL <a href="http://www.postgresql.org/docs/current/static/geqo.html">محسِّن الاستعلام الجيني (GQO)</a>.</p>
<p>وGQO خوارزمية تقريبية تُستخدم لتحديد خطة معقولة في زمن معقول. وإذا تجاوز عدد جداول الربط الحد المحدَّد بالمعامل <a href="http://www.postgresql.org/docs/current/static/runtime-config-query.html#GUC-GEQO-THRESHOLD">geqo_threshold</a> (القيمة الافتراضية 12)، ينشئ PostgreSQL خطة استعلام باستخدام هذه الخوارزمية الجينية بدلًا من البرمجة الديناميكية.</p>
<p>يتضمّن تحديد شجرة الخطة المثلى عبر البرمجة الديناميكية مستويات المعالجة التالية (راجع الشكل 3.34):</p>
<ul>
<li><strong>المستوى 1:</strong> حدِّد المسار الأقل كلفة لكل جدول على حدة. ويُخزَّن المسار الأقل كلفة لكل جدول في بنية <code>RelOptInfo</code> الخاصة به.</li>
<li><strong>المستوى 2:</strong> في ما يلي، يُمثَّل RelOptInfo لمجموعة جداول بأقواس معقوصة، مثل {A, B}. وإذا وُجد جدولان A وB، يحدّد المخطِّط مسار الربط الأقل كلفة لـ {A, B}. وهذه النتيجة هي الجواب النهائي لربط جدولين. وإذا وُجدت ثلاثة جداول، يحدّد المخطِّط المسار الأقل كلفة لكل زوج ممكن: {A, B} و{A, C} و{B, C}.</li>
<li><strong>المستوى 3 وما فوق:</strong> واصل هذه العملية تدريجيًا. وتُستخدم نتائج توليفات الربط في المستويات الأدنى لتحديد المسارات الأقل كلفة لمجموعات أكبر (مثل {A, B, C}) حتى الوصول إلى مجموعة واحدة تحتوي على جميع الجداول.</li>
</ul>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-34.webp" alt=""></p>
<h4>الشكل 3.34. كيفية تحديد مسار الوصول الأقل كلفة باستخدام البرمجة الديناميكية.</h4>
<p>وبإعادة استخدام المسارات الأقل كلفة للمسائل الجزئية في كل مستوى، يمكن للمخطِّط تحديد شجرة الخطة المثلى بكفاءة.</p>
<p>ويصف القسم التالي كيفية تحديد المخطِّط للخطة الأقل كلفة للاستعلام التالي:</p>
<pre><code>testdb=# \\d tbl_a
     Table &amp;#34;public.tbl_a&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &amp;#34;tbl_a_pkey&amp;#34; PRIMARY KEY, btree (id)

testdb=# \\d tbl_b
     Table &amp;#34;public.tbl_b&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# SELECT * FROM tbl_a AS a, tbl_b AS b WHERE a.id = b.id AND b.data &lt; 400;
</code></pre>
<h3 id="3621-المعالجة-في-المستوى-1">3.6.2.1. المعالجة في المستوى 1</h3>
<p>في المستوى 1، يُنشئ المخطِّط بنية RelOptInfo ويقدّر أقل الكلف لكل علاقة في الاستعلام. وتُضاف بنى RelOptInfo هذه إلى simple_rel_array داخل بنية PlannerInfo الخاصة بالاستعلام (راجع الشكل 3.35).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-35.webp" alt=""></p>
<h4>الشكل 3.35. PlannerInfo وRelOptInfo بعد المعالجة في المستوى 1.</h4>
<p>يحتوي RelOptInfo الخاص بالجدول tbl_a على ثلاثة مسارات وصول، تُضاف إلى قائمة pathlist الخاصة به. وترتبط كل بنية RelOptInfo بأقل مسارات الكلف لديها:</p>
<ul>
<li>مسار كلفة البدء الأقل</li>
<li>مسار الكلفة الإجمالية الأقل</li>
<li>مسار الكلفة المُمَعمَلة (parameterized) الأقل (راجع القسم 3.5.1.3 لتفاصيل المسارات المُمَعمَلة)</li>
</ul>
<p>وفي المقابل، لا يحتوي RelOptInfo الخاص بالجدول tbl_b إلا على مسار وصول واحد بالمسح التسلسلي لأن tbl_b لا يملك فهرسًا مرتبطًا به.</p>
<h3 id="3622-المعالجة-في-المستوى-2">3.6.2.2. المعالجة في المستوى 2</h3>
<p>في المستوى 2، تُنشأ بنية RelOptInfo لعلاقة الربط وتُضاف إلى join_rel_list في PlannerInfo (راجع الشكل 3.36 [1]).</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-36.webp" alt=""></p>
<h4>الشكل 3.36. PlannerInfo وRelOptInfo بعد المعالجة في المستوى 2.</h4>
<p>ثم يقدّر المخطِّط كلف جميع مسارات الربط الممكنة ويحدّد أفضل مسار وصول — ذاك ذا الكلفة الإجمالية الأقل. وتخزّن RelOptInfo هذه النتيجة كمسار الكلفة الإجمالية الأقل لديها.</p>
<p>ويعرض الجدول 3.3 جميع توليفات مسارات وصول الربط التي نُظر فيها في هذا المثال. ولأن الاستعلام ربط تساوٍ (equi-join)، يقدّر المخطِّط الكلف لأساليب الربط الثلاثة كلها (الحلقة المتداخلة والدمج والتجزئة). وللتوضيح، تُستخدم الترميزات التالية:</p>
<ul>
<li><strong>SeqScanPath(table):</strong> مسار المسح التسلسلي للجدول.</li>
<li><strong>Materialized-&gt;SeqScanPath(table):</strong> مسار المسح التسلسلي المُجسَّد للجدول.</li>
<li><strong>IndexScanPath(table, attribute):</strong> مسار مسح الفهرس باستخدام السمة المحددة.</li>
<li><strong>ParameterizedIndexScanPath(table, attr1, attr2):</strong> مسار فهرس الجدول باستخدام attr1، مُمَعمَل بواسطة attr2 من الجدول الخارجي.</li>
</ul>
<table>
<thead>
<tr>
<th></th>
<th>المسار الخارجي</th>
<th>المسار الداخلي</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>الربط بالحلقة المتداخلة</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>2</td>
<td>SeqScanPath(tbl_a)</td>
<td>Materialized-&gt;SeqScanPath(tbl_b)</td>
<td>ربط حلقة متداخلة مُجسَّد</td>
</tr>
<tr>
<td>3</td>
<td>IndexScanPath(tbl_a,id)</td>
<td>SeqScanPath(tbl_b)</td>
<td>ربط حلقة متداخلة مع مسح فهرس خارجي</td>
</tr>
<tr>
<td>4</td>
<td>IndexScanPath(tbl_a,id)</td>
<td>Materialized-&gt;SeqScanPath(tbl_b)</td>
<td>ربط حلقة متداخلة مُجسَّد مع مسح فهرس خارجي</td>
</tr>
<tr>
<td>5</td>
<td>SeqScanPath(tbl_b)</td>
<td>SeqScanPath(tbl_a)</td>
<td></td>
</tr>
<tr>
<td>6</td>
<td>SeqScanPath(tbl_b)</td>
<td>Materialized-&gt;SeqScanPath(tbl_a)</td>
<td>ربط حلقة متداخلة مُجسَّد</td>
</tr>
<tr>
<td>7</td>
<td>SeqScanPath(tbl_b)</td>
<td>ParametalizedIndexScanPath(tbl_a, id, tbl_b.id)</td>
<td>ربط حلقة متداخلة مفهرس</td>
</tr>
<tr>
<td>الربط بالدمج</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>2</td>
<td>IndexScanPath(tbl_a,id)</td>
<td>SeqScanPath(tbl_b)</td>
<td>ربط دمج مع مسح فهرس خارجي</td>
</tr>
<tr>
<td>3</td>
<td>SeqScanPath(tbl_b)</td>
<td>SeqScanPath(tbl_a)</td>
<td></td>
</tr>
<tr>
<td>الربط بالتجزئة</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>2</td>
<td>SeqScanPath(tbl_b)</td>
<td>SeqScanPath(tbl_a)</td>
<td></td>
</tr>
</tbody>
</table>
<p>في فئة الربط بالحلقة المتداخلة، على سبيل المثال، تُقدَّر سبعة مسارات ربط. ويستخدم المسار الأول مسحًا تسلسليًا لكل من tbl_a (الخارجي) وtbl_b (الداخلي). ويستخدم المسار الثاني مسحًا تسلسليًا لـ tbl_a ومسحًا تسلسليًا مُجسَّدًا لـ tbl_b، وهكذا.</p>
<p>ويحدّد المخطِّط أخيرًا المسار الأقل كلفة بين جميع مسارات الربط المقدَّرة ويضيفه إلى pathlist في RelOptInfo الممثِّل للمجموعة {tbl_a, tbl_b} (راجع الشكل 3.36 [2]).</p>
<p>في هذا المثال، وكما يظهر في مخرَج EXPLAIN أدناه، يختار المخطِّط ربطًا بالتجزئة يكون فيه tbl_b الجدول الداخلي وtbl_a الجدول الخارجي.</p>
<pre><code>testdb=# EXPLAIN  SELECT * FROM tbl_b AS b, tbl_c AS c WHERE c.id = b.id AND b.data &lt; 400;
                              QUERY PLAN
----------------------------------------------------------------------
 Hash Join  (cost=90.50..277.00 rows=400 width=16)
   Hash Cond: (c.id = b.id)
   -&gt;  Seq Scan on tbl_c c  (cost=0.00..145.00 rows=10000 width=8)
   -&gt;  Hash  (cost=85.50..85.50 rows=400 width=8)
         -&gt;  Seq Scan on tbl_b b  (cost=0.00..85.50 rows=400 width=8)
               Filter: (data &lt; 400)
(6 rows)
</code></pre>
<h2 id="363-تحديد-المسار-الأقل-كلفة-لاستعلام-بثلاثة-جداول">3.6.3. تحديد المسار الأقل كلفة لاستعلام بثلاثة جداول</h2>
<p>عملية تحديد المسار الأقل كلفة لاستعلام يشمل ثلاثة جداول هي كما يلي:</p>
<pre><code>testdb=# \\d tbl_a
     Table &amp;#34;public.tbl_a&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# \\d tbl_b
     Table &amp;#34;public.tbl_b&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer |
 data   | integer |

testdb=# \\d tbl_c
     Table &amp;#34;public.tbl_c&amp;#34;
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null
 data   | integer |
Indexes:
    &amp;#34;tbl_c_pkey&amp;#34; PRIMARY KEY, btree (id)

testdb=# SELECT * FROM tbl_a AS a, tbl_b AS b, tbl_c AS c
testdb-#                WHERE a.id = b.id AND b.id = c.id AND a.data &lt; 40;
</code></pre>
<ul>
<li><strong>المستوى 1:</strong> يقدّر المخطِّط المسارات الأقل كلفة لجميع الجداول على حدة ويخزّن هذه المعلومات في كائنات RelOptInfo المقابلة: {tbl_a} و{tbl_b} و{tbl_c}.</li>
<li><strong>المستوى 2:</strong> يحدّد المخطِّط جميع الأزواج الممكنة من الجداول الثلاثة ويقدّر المسار الأقل كلفة لكل توليفة. وتُخزَّن النتائج في كائنات RelOptInfo المقابلة: {tbl_a, tbl_b} و{tbl_b, tbl_c} و{tbl_a, tbl_c}.</li>
<li><strong>المستوى 3:</strong> يحدّد المخطِّط أخيرًا المسار الأقل كلفة للاستعلام بأكمله باستخدام كائنات RelOptInfo التي حصل عليها سابقًا.</li>
</ul>
<p>وفيما يلي وصف أكثر تفصيلًا لمعالجة المستوى 3 (راجع الشكل 3.34):</p>
<p>ينظر المخطِّط في ثلاث توليفات من كائنات RelOptInfo: {tbl_a, {tbl_b, tbl_c}} و{tbl_b, {tbl_a, tbl_c}} و{tbl_c, {tbl_a, tbl_b}}. ويُعبَّر عن ذلك كما يلي:</p>
<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;EOF&#x27;, got &#x27;_&#x27; at position 26: …gn*} {\\text{tbl_̲a},\\text{tbl_b}…" style="color:#cc0000">\\begin{align*} {\\text{tbl_a},\\text{tbl_b},\\text{tbl_c}} = \\min ({\\text{tbl_a},{\\text{tbl_b},\\text{tbl_c}}}, {\\text{tbl_b},{\\text{tbl_a},\\text{tbl_c}}}, {\\text{tbl_c},{\\text{tbl_a},\\text{tbl_b}}}). \\end{align*}</span></p>
<p>ثم يقدّر المخطِّط كلف جميع مسارات الربط الممكنة ضمن هذه التوليفات.</p>
<p>بالنسبة لكائن RelOptInfo الممثَّل بـ {tbl_c, {tbl_a, tbl_b}}، يقدّر المخطِّط جميع توليفات tbl_c والمسار الأقل كلفة لـ {tbl_a, tbl_b}. وفي هذا المثال، المسار الأقل كلفة لـ {tbl_a, tbl_b} هو ربط بالتجزئة يكون فيه tbl_a الجدول الخارجي وtbl_b الجدول الداخلي على التوالي.</p>
<p>وكما في المستوى 2، تشمل مسارات الربط المقدَّرة عمليات الربط بالحلقة المتداخلة والربط بالدمج والربط بالتجزئة وصورها المختلفة. ويعالج المخطِّط التوليفتين {tbl_a, {tbl_b, tbl_c}} و{tbl_b, {tbl_a, tbl_c}} بالطريقة نفسها، ثم يختار أخيرًا مسار الوصول الأقل كلفة إجمالًا.</p>
<p>ويظهر مخرَج EXPLAIN لهذا الاستعلام أدناه:</p>
<pre><code> 1
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
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT * FROM tbl_a AS a, tbl_b AS b, tbl_c AS c
testdb-#                      WHERE a.id = b.id AND b.id = c.id AND a.data &lt; 40;
                                   QUERY PLAN
--------------------------------------------------------------------------------
 Nested Loop  (cost=170.77..269.94 rows=20 width=24)
   Join Filter: (a.id = c.id)
   -&gt;  Hash Join  (cost=170.49..262.44 rows=20 width=16)
         Hash Cond: (b.id = a.id)
         -&gt;  Seq Scan on tbl_b b  (cost=0.00..73.00 rows=5000 width=8)
         -&gt;  Hash  (cost=170.00..170.00 rows=39 width=8)
               -&gt;  Seq Scan on tbl_a a  (cost=0.00..170.00 rows=39 width=8)
                     Filter: (data &lt; 40)
   -&gt;  Index Scan using tbl_c_pkey on tbl_c c  (cost=0.29..0.36 rows=1 width=8)
         Index Cond: (id = b.id)
(10 rows)
</code></pre>
<p><strong>العلاقة الخارجية في الربط المفهرس بالحلقة المتداخلة.</strong> الربط الأقصى خارجية هو ربط مفهرس بالحلقة المتداخلة (السطر 5). والعلاقة الداخلية مسح فهرس مُمَعمَل (السطر 13)، بينما العلاقة الخارجية هي نتيجة الربط بالتجزئة بين tbl_b وtbl_a (الأسطر 7-12).</p>
<p>وبناءً على ذلك، ينفّذ المنفِّذ أولًا الربط بالتجزئة بين tbl_a وtbl_b ثم ينفّذ الربط المفهرس بالحلقة المتداخلة مع tbl_c.</p>
<h1>3.7. الاستعلام المتوازي (Parallel Query)</h1>
<p><a href="https://www.postgresql.org/docs/current/parallel-query.html">الاستعلام المتوازي</a>، الذي أُدخل في الإصدار 9.6 (عام 2016)، ميزة تعالج استعلامًا واحدًا باستخدام عدة عمليات عمال في الخلفية.</p>
<p>وعند تحقق شروط محددة، تعمل عملية PostgreSQL المنفِّذة للاستعلام كقائد (Leader). ويطلق القائد عددًا من عمليات العمال بحد أقصى يحدّده المعامل <a href="https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-MIN-PARALLEL-INDEX-SCAN-SIZE">max_parallel_workers_per_gather</a>. وتنفّذ كل عملية عامل جزءًا من معالجة المسح وتُعيد نتائجها إلى القائد، الذي يجمّعها لإنتاج المخرَج النهائي.</p>
<p>ويوضّح الشكل 3.37 مسحًا تسلسليًا متوازيًا تعالجه عمليتا عامل.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-37.webp" alt=""></p>
<h4>الشكل 3.37. مفهوم الاستعلام المتوازي.</h4>
<p>والمعامل <a href="https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-PARALLEL-LEADER-PARTICIPATION">parallel_leader_participation</a>، الذي أُدخل في الإصدار 11 (والمفعَّل افتراضيًا)، يتيح لعملية القائد المساعدة في تنفيذ الاستعلام أثناء انتظار ردود العمال. غير أنه لتبسيط الشروح والأشكال التالية، يُفترض أن عملية القائد تنتظر فقط (أي أن parallel_leader_participation معطَّل).</p>
<p>ويواصل PostgreSQL تحسين قدرات الاستعلام المتوازي في كل إصدار. ويسلّط الجدول 3.4 الضوء على تحديثات رئيسية من ملاحظات الإصدار الرسمية.</p>
<table>
<thead>
<tr>
<th>الإصدار</th>
<th>سنة الإصدار</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td>9.6</td>
<td>2016</td>
<td>المسح التسلسلي. الربط بالحلقة المتداخلة والربط بالتجزئة.</td>
</tr>
<tr>
<td>10</td>
<td>2017</td>
<td>الربط بالدمج. مسح فهرس B-tree، ومسح الكومة بخرائط البتات. السماح بالاستعلامات الفرعية غير المترابطة.</td>
</tr>
<tr>
<td>11</td>
<td>2018</td>
<td>يمكن لأمر CREATE INDEX الآن استخدام المعالجة المتوازية أثناء بناء فهرس B-tree. السماح بتنفيذ عمليات الربط بالتجزئة على التوازي باستخدام جدول تجزئة مشترك. السماح بتنفيذ UNION لكل SELECT على التوازي إذا تعذّر توازي استعلامات SELECT الفردية. السماح بتوازي الأوامر CREATE TABLE ... AS وSELECT INTO وCREATE MATERIALIZED VIEW.</td>
</tr>
<tr>
<td>12</td>
<td>2019</td>
<td>السماح بالاستعلامات المتوازية في وضع العزل SERIALIZABLE.</td>
</tr>
<tr>
<td>14</td>
<td>2021</td>
<td>السماح لاستعلام يشير إلى عدة جداول خارجية بتنفيذ مسح الجداول الخارجية على التوازي. السماح لـ REFRESH MATERIALIZED VIEW باستخدام التوازي.</td>
</tr>
<tr>
<td>15</td>
<td>2022</td>
<td>السماح بتوازي SELECT DISTINCT. السماح لاستعلام يشير إلى عدة جداول خارجية بتنفيذ مسح متوازٍ للجداول الخارجية في مزيد من الحالات. السماح بالالتزام المتوازي على خوادم postgres_fdw.</td>
</tr>
<tr>
<td>16</td>
<td>2023</td>
<td>السماح بتوازي عمليات الربط بالتجزئة الخارجية FULL والخارجية اليمنى الداخلية. السماح لـ postgres_fdw بالإجهاض على التوازي.</td>
</tr>
</tbody>
</table>
<ul>
<li><strong>ملاحظة:</strong> الاستعلام المتوازي ميزة للقراءة أساسًا ولا يدعم حاليًا عمليات المؤشر.</li>
</ul>
<p>وتقدّم الأقسام التالية نظرة عامة على معمارية الاستعلام المتوازي، ثم تستكشف عمليات الربط المتوازية والتجميع المتوازي.</p>
<p>محتويات القسم</p>
<ul>
<li>3.7.1. نظرة عامة</li>
<li>3.7.2. الربط المتوازي</li>
<li>3.7.3. التجميع المتوازي</li>
</ul>
<h2 id="371-نظرة-عامة">3.7.1. نظرة عامة</h2>
<p>يوضّح الشكل 3.38 مسار تنفيذ استعلام متوازٍ في PostgreSQL.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-38.webp" alt=""></p>
<h4>الشكل 3.38. كيفية تنفيذ الاستعلام المتوازي.</h4>
<ul>
<li>(1) <strong>القائد ينشئ الخطة:</strong> ينشئ المحسِّن شجرة خطة تتضمّن عقدًا قادرة على التنفيذ المتوازي.</li>
<li>(2) <strong>القائد يخزّن المعلومات المشتركة:</strong> لمزامنة التنفيذ بين عملية القائد وعمليات العمال، يخزّن القائد معلومات أساسية (مثل شجرة الخطة وحالة الجلسة) في منطقة الذاكرة المشتركة الديناميكية (DSM) الخاصة به.</li>
<li>(3) <strong>القائد ينشئ العمال:</strong> يطلق القائد عمليات العمال في الخلفية.</li>
<li>(4) <strong>العامل يهيّئ حالته:</strong> يقرأ كل عامل المعلومات المشتركة من DSM لتهيئة حالته الداخلية، بما يضمن بيئة تنفيذ متوافقة مع القائد.</li>
<li>(5) <strong>العامل يمسح ويعيد النتائج:</strong> يسترجع كل عامل كتل البيانات ويمسحها عند الطلب بشكل نشط عبر تنفيذ دوال مثل SeqNext() أو IndexNext(). ثم تُعاد هذه النتائج إلى القائد.</li>
<li>(6) <strong>القائد يجمع النتائج:</strong> يستقبل القائد النتائج من جميع العمال ويجمّعها.</li>
<li>(7) <strong>التنظيف:</strong> بعد انتهاء الاستعلام، تُنهى عمليات العمال، ويحرّر القائد منطقة DSM.</li>
</ul>
<p>أثناء معالجة الاستعلام المتوازي، تتواصل عملية القائد وعمليات العمال عبر منطقة DSM. وتخصّص عملية القائد مساحة الذاكرة عند الطلب، ما يتيح لعمليات العمال القراءة والكتابة في هذه المناطق المشتركة.</p>
<p>وتستخدم الأمثلة العملية التالية الجدول <code>d</code>، المنشأ كما يلي:</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE TABLE</span> d (id <span class="hljs-type">double precision</span>, data <span class="hljs-type">int</span>);
<span class="hljs-keyword">CREATE TABLE</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">INSERT INTO</span> d <span class="hljs-keyword">SELECT</span> i::<span class="hljs-type">double precision</span>, (random()<span class="hljs-operator">*</span><span class="hljs-number">1000</span>)::<span class="hljs-type">int</span> <span class="hljs-keyword">FROM</span> generate_series(<span class="hljs-number">1</span>, <span class="hljs-number">1000000</span>) <span class="hljs-keyword">AS</span> i;
<span class="hljs-keyword">INSERT</span> <span class="hljs-number">0</span> <span class="hljs-number">1000000</span>
testdb<span class="hljs-operator">=</span># ANALYZE;
ANALYZE
</code></pre>
<h3 id="3711-إنشاء-الخطة-المتوازية">3.7.1.1. إنشاء الخطة المتوازية</h3>
<p>لا ينظر المحسِّن في الاستعلام المتوازي دائمًا. فهو لا ينظر في التنفيذ المتوازي إلا عندما يكون حجم الجدول الواجب مسحه أكبر من أو يساوي <a href="https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-MIN-PARALLEL-TABLE-SCAN-SIZE">min_parallel_table_scan_size</a> (القيمة الافتراضية: 8 ميجابايت)، أو إذا كان حجم الفهرس أكبر من أو يساوي <a href="https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-MIN-PARALLEL-INDEX-SCAN-SIZE">min_parallel_index_scan_size</a> (القيمة الافتراضية: 512 كيلوبايت).</p>
<p>وفيما يلي أبسط خطة استعلام متوازٍ:</p>
<pre><code>1
2
3
4
5
6
7
8
</code></pre>
<pre><code>testdb=# EXPLAIN SELECT * FROM d WHERE id BETWEEN 1 AND 100;
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Gather  (cost=1000.00..16609.10 rows=1 width=12)
   Workers Planned: 2
   -&gt;  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=12)
         Filter: ((id &gt;= '1'::double precision) AND (id &lt;= '100'::double precision))
(4 rows)
</code></pre>
<p>وكما هو موضّح أعلاه، تتكوّن أبسط خطة متوازية من عقدة <code>Gather</code> وعقدة <code>Parallel SeqScan</code>. ويوضّح الشكل 3.39 شجرة الخطة لهذا الاستعلام.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-39.webp" alt=""></p>
<h4>الشكل 3.39. شجرة خطة القائد</h4>
<p>عقدة Gather خاصة بالاستعلامات المتوازية وتجمع النتائج من عمليات العمال. وإضافة إلى Gather، تستخدم الاستعلامات المتوازية عقدًا متخصصة أخرى:</p>
<ul>
<li><strong>Gather Merge:</strong> تجمع النتائج من العمال مع الحفاظ على ترتيبها المفروز.</li>
<li><strong>Parallel Append:</strong> تُستخدم لمسح الجداول المُجزَّأة أو استعلامات UNION ALL على التوازي (انظر <a href="https://www.postgresql.org/docs/current/parallel-plans.html#PARALLEL-APPEND">التوثيق الرسمي</a>).</li>
<li><strong>Finalize/Partial Aggregate:</strong> تُستخدم لتوازي الدوال التجميعية (انظر القسم 3.7.3).</li>
</ul>
<p>وتنفّذ عمليات العمال شجرة الخطة الفرعية الواقعة تحت عقدة Gather. ولكي تُدرَج عقدة في هذه الخطة الفرعية، يجب أن تكون سمة ‘parallel_safe’ فيها مضبوطة على <code>True</code>. وفي المثال أعلاه، تنفّذ عمليات العمال عقدة Parallel Seq Scan وعوامل التصفية المرتبطة بها.</p>
<h3 id="3712-تخزين-المعلومات-المشتركة">3.7.1.2. تخزين المعلومات المشتركة</h3>
<p>لتنفيذ استعلام تعاونيًا، يخزّن القائد المعلومات التي تحتاجها عمليات العمال في منطقة الذاكرة المشتركة الديناميكية (DSM) الخاصة به.</p>
<p>وتُصنَّف المعلومات المشتركة بين القائد والعمال إلى نوعين رئيسيين: <strong>حالة التنفيذ</strong> و<strong>الاستعلام</strong>.</p>
<ul>
<li><strong>حالة التنفيذ:</strong> تشمل المعلومات البيئية اللازمة لتنفيذ القائد والعمال الاستعلام نفسه باتساق. (راجع <a href="https://github.com/postgres/postgres/blob/master/src/backend/access/transam/README.parallel">README.parallel</a> للحصول على قائمة شاملة). ومن مكوّناتها الرئيسية: جميع معاملات التهيئة (GUCs).</li>
<li>لقطة المعاملة ومعرّف المعاملة الفرعية الحالية (انظر <a href="/arabic-cs-library/book/postgres-internals/pgsql05/index">الفصل 5</a> للتفاصيل).</li>
<li>مجموعة المكتبات المحمَّلة ديناميكيًا عبر <a href="https://github.com/postgres/postgres/blob/master/src/backend/utils/fmgr/dfmgr.c">dfmgr.c</a>.</li>
</ul>
<p>وتُخزَّن هذه الحالة بواسطة الدالة <a href="https://github.com/postgres/postgres/blob/0d884f570b72c5b030f7908032946078537ea121/src/backend/access/transam/parallel.c#L207">InitializeParallelDSM()</a>.</p>
<p><strong>معلومات الاستعلام:</strong> تشمل بيانات خاصة بخطة التنفيذ وأساليب الوصول إلى البيانات:</p>
<ul>
<li>بنيتا PlannedStmt وParamListInfo.</li>
<li>الواصفات المتخصصة للعقد التي ينفّذها العمال. على سبيل المثال، تستخدم عقدة Parallel Seq Scan الواصف ParallelTableScanDesc، بينما تستخدم عقدة Index Scan الواصف ParallelIndexScanDesc. وتُعالَج التهيئة التفصيلية بواسطة <a href="https://github.com/postgres/postgres/blob/97525bc5c8ffb31475d23955d08e9ec9c1408f33/src/backend/executor/execParallel.c#L438">ExecParallelInitializeDSM()</a>.</li>
<li>بنى القياس واستخدام الموارد لأغراض إعداد التقارير.</li>
</ul>
<p>وتُخزَّن هذه المعلومات بواسطة الدالة <a href="https://github.com/postgres/postgres/blob/0d884f570b72c5b030f7908032946078537ea121/src/backend/executor/execParallel.c#L587">ExecInitParallelPlan()</a>.</p>
<p>إضافة إلى ذلك، يخصّص القائد طابور TupleQueue (المعرَّف في <a href="https://github.com/postgres/postgres/blob/master/src/backend/executor/tqueue.c">tqueue.c</a>) داخل DSM. ويعمل هذا الطابور كقناة التواصل التي يقرأ القائد عبرها النتائج التي يعيدها العمال.</p>
<h3 id="3713-إنشاء-العمال">3.7.1.3. إنشاء العمال</h3>
<p>قد يختلف عدد العمال في خطة الاستعلام عن عدد العمال الذين أُطلقوا فعليًا. ويرجع ذلك إلى أن العدد الإجمالي للعمال محدود بالمعامل <a href="https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-MAX-PARALLEL-WORKERS">max_parallel_workers</a>. كذلك قد لا تتوفر خانات عمال كافية إذا كانت استعلامات متوازية أخرى قيد التنفيذ في الوقت نفسه.</p>
<p>ويعرض الأمر EXPLAIN ANALYZE كلا العددين: العمال المخطَّط لهم (Planned) والعمال المُطلقين (Launched)، ما يتيح التحقق من تخصيص الموارد.</p>
<pre><code>testdb=# EXPLAIN ANALYZE SELECT * FROM d WHERE id BETWEEN 1 AND 100;
                                                    QUERY PLAN
------------------------------------------------------------------------------------------------------------------
 Gather  (cost=1000.00..16609.10 rows=1 width=12) (actual time=60.035..60.994 rows=100 loops=1)
   Workers Planned: 2
   Workers Launched: 2
   -&gt;  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=12) (actual time=31.073..52.248 rows=50 loops=2)
         Filter: ((id &gt;= '1'::double precision) AND (id &lt;= '100'::double precision))
         Rows Removed by Filter: 499950
 Planning Time: 0.265 ms
 Execution Time: 61.012 ms
(8 rows)
</code></pre>
<h3 id="3714-تهيئة-العمال">3.7.1.4. تهيئة العمال</h3>
<p>عند بدء التشغيل، يقرأ كل عامل معلومات حالة التنفيذ والاستعلام المشتركة التي أعدّها القائد في DSM.</p>
<p>وبتطبيق حالة التنفيذ، يهيّئ العامل بيئته لتطابق جلسة القائد بدقة. وهذا يضمن اتساق معاملات التهيئة ولقطات المعاملات والمكتبات المحمَّلة عبر جميع العمليات المشاركة في الاستعلام.</p>
<p>ولمعالجة الاستعلام، يعيد العامل بناء شجرة خطته من PlannedStmt المشترك. وتُستخدم الدالة <a href="https://github.com/postgres/postgres/blob/6e80951f49f3bc18b5bdfb7e87bc2e0bcfb4af00/src/backend/executor/execParallel.c#L145">ExecSerializePlan()</a> (ونظيراتها) لإنشاء شجرة خطة فرعية تتكوّن من عقد parallel_safe فقط — وهي عادةً الجزء من شجرة خطة القائد الواقع تحت عقدة Gather.</p>
<p>ويوضّح الشكل 3.40 العلاقة بين شجرة خطة القائد وشجرة الخطة المنشأة للعامل.</p>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-40.webp" alt=""></p>
<h4>الشكل 3.40. شجرة خطة العامل المنشأة من شجرة خطة القائد</h4>
<h3 id="3715-مسح-الصفوف-وإعادة-النتائج">3.7.1.5. مسح الصفوف وإعادة النتائج</h3>
<p>كما نوقش في القسم 3.4.1.1، فإن طرائق المنفِّذ للوصول إلى صفوف البيانات مجرَّدة للغاية. وينطبق هذا المبدأ أيضًا على الاستعلامات المتوازية.</p>
<p>ولأن القائد والعمال يتشاركون بيئة تنفيذ الاستعلام عبر DSM، يمكن تنفيذ مسح تسلسلي واحد على التوازي. ويسترجع كل عملية كتل البيانات ويمسحها عند الطلب بشكل نشط عبر استدعاء الدالة SeqNext().</p>
<p>وبالمثل، تُعاد النتائج إلى عقدة Gather عبر طابور TupleQueue الموجود في DSM.</p>
<h3 id="3716-جمع-النتائج">3.7.1.6. جمع النتائج</h3>
<p>عقدة Gather عقدة خاصة بالاستعلامات المتوازية تجمع النتائج التي يعيدها العمال.</p>
<h2 id="372-الربط-المتوازي">3.7.2. الربط المتوازي</h2>
<p>تدعم الاستعلامات المتوازية في PostgreSQL الربط بالحلقة المتداخلة والربط بالدمج والربط بالتجزئة.</p>
<p>وتستخدم الأمثلة التالية الجدولين <code>d</code> و<code>f</code>.</p>
<pre><code class="language-sql">testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE TABLE</span> d (id <span class="hljs-type">double precision</span>, data <span class="hljs-type">int</span>);
<span class="hljs-keyword">CREATE TABLE</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">INSERT INTO</span> d <span class="hljs-keyword">SELECT</span> i::<span class="hljs-type">double precision</span>, (random()<span class="hljs-operator">*</span><span class="hljs-number">1000</span>)::<span class="hljs-type">int</span> <span class="hljs-keyword">FROM</span> generate_series(<span class="hljs-number">1</span>, <span class="hljs-number">1000000</span>) <span class="hljs-keyword">AS</span> i;
<span class="hljs-keyword">INSERT</span> <span class="hljs-number">0</span> <span class="hljs-number">1000000</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE</span> INDEX d_id_idx <span class="hljs-keyword">ON</span> d (id);
<span class="hljs-keyword">CREATE</span> INDEX
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">CREATE TABLE</span> f (id <span class="hljs-type">double precision</span>, data <span class="hljs-type">int</span>);
<span class="hljs-keyword">CREATE TABLE</span>
testdb<span class="hljs-operator">=</span># <span class="hljs-keyword">INSERT INTO</span> f <span class="hljs-keyword">SELECT</span> i::<span class="hljs-type">double precision</span>, (random()<span class="hljs-operator">*</span><span class="hljs-number">1000</span>)::<span class="hljs-type">int</span> <span class="hljs-keyword">FROM</span> generate_series(<span class="hljs-number">1</span>, <span class="hljs-number">10000000</span>) <span class="hljs-keyword">AS</span> i;
<span class="hljs-keyword">INSERT</span> <span class="hljs-number">0</span> <span class="hljs-number">10000000</span>
testdb<span class="hljs-operator">=</span># \\d d
                      <span class="hljs-keyword">Table</span> <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;public.d<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;
 <span class="hljs-keyword">Column</span> <span class="hljs-operator">|</span>       Type       <span class="hljs-operator">|</span> <span class="hljs-keyword">Collation</span> <span class="hljs-operator">|</span> Nullable <span class="hljs-operator">|</span> <span class="hljs-keyword">Default</span>
<span class="hljs-comment">--------+------------------+-----------+----------+---------</span>
 id     <span class="hljs-operator">|</span> <span class="hljs-type">double precision</span> <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
 data   <span class="hljs-operator">|</span> <span class="hljs-type">integer</span>          <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
Indexes:
    <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;d_id_idx<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>; btree (id)

testdb<span class="hljs-operator">=</span># \\d f
                      <span class="hljs-keyword">Table</span> <span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;public.f<span class="hljs-operator">&amp;</span>#<span class="hljs-number">34</span>;
 <span class="hljs-keyword">Column</span> <span class="hljs-operator">|</span>       Type       <span class="hljs-operator">|</span> <span class="hljs-keyword">Collation</span> <span class="hljs-operator">|</span> Nullable <span class="hljs-operator">|</span> <span class="hljs-keyword">Default</span>
<span class="hljs-comment">--------+------------------+-----------+----------+---------</span>
 id     <span class="hljs-operator">|</span> <span class="hljs-type">double precision</span> <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>
 data   <span class="hljs-operator">|</span> <span class="hljs-type">integer</span>          <span class="hljs-operator">|</span>           <span class="hljs-operator">|</span>          <span class="hljs-operator">|</span>

testdb<span class="hljs-operator">=</span># ANALYZE;
ANALYZE
</code></pre>
<h3 id="3721-الربط-بالحلقة-المتداخلة">3.7.2.1. الربط بالحلقة المتداخلة</h3>
<p>في الربط المتوازي القياسي بالحلقة المتداخلة، لا يُعالَج الجدول الداخلي على التوازي. وبدلًا من ذلك، على كل عامل معالجة الجدول الداخلي بأكمله بشكل مستقل.</p>
<p>على سبيل المثال، في الربط المُجسَّد بالحلقة المتداخلة، يجسّد كل عامل نسخته الخاصة من الجدول الداخلي. وتجعل هذه التكرارية الربط أقل كفاءة مع زيادة عدد العمال.</p>
<pre><code>testdb=# SET enable_nestloop = ON;
SET
testdb=# SET enable_mergejoin = OFF;
SET
testdb=# SET enable_hashjoin = OFF;
SET

testdb=# EXPLAIN SELECT * FROM d, f WHERE d.data = f.data AND f.id &lt; 10000;
                                  QUERY PLAN
-------------------------------------------------------------------------------
 Gather  (cost=1000.00..97163469.29 rows=9651513 width=24)
   Workers Planned: 2
   -&gt;  Nested Loop  (cost=0.00..96197317.99 rows=4825756 width=24)
         Join Filter: (d.data = f.data)
         -&gt;  Parallel Seq Scan on f  (cost=0.00..121935.99 rows=4831 width=12)
               Filter: (id &lt; '10000'::double precision)
         -&gt;  Materialize  (cost=0.00..27992.00 rows=1000000 width=12)
               -&gt;  Seq Scan on d  (cost=0.00..18109.00 rows=1000000 width=12)
(8 rows)
</code></pre>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-41.webp" alt=""></p>
<h4>الشكل 3.41. الربط المُجسَّد بالحلقة المتداخلة في الاستعلام المتوازي.</h4>
<p>في المقابل، يكون الربط المفهرس بالحلقة المتداخلة أكثر كفاءة بكثير. فرغم أن مسح الجدول الداخلي نفسه غير «مشترك»، يستخدم كل عامل الفهرس لاسترجاع الصفوف ذات الصلة فقط من الجدول الداخلي بسرعة.</p>
<pre><code>testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id AND f.id &lt; 10000;
                                  QUERY PLAN
-------------------------------------------------------------------------------
 Gather  (cost=1000.42..142818.71 rows=967 width=24)
   Workers Planned: 2
   -&gt;  Nested Loop  (cost=0.42..141722.01 rows=484 width=24)
         -&gt;  Parallel Seq Scan on f  (cost=0.00..121935.99 rows=4831 width=12)
               Filter: (id &lt; '10000'::double precision)
         -&gt;  Index Scan using d_id_idx on d  (cost=0.42..4.09 rows=1 width=12)
               Index Cond: (id = f.id)
(7 rows)
</code></pre>
<p><img src="/arabic-cs-library/images/postgres-internals/pgsql03-fig-3-42.webp" alt=""></p>
<h4>الشكل 3.42. الربط المفهرس بالحلقة المتداخلة في الاستعلام المتوازي.</h4>
<h3 id="3722-الربط-بالدمج">3.7.2.2. الربط بالدمج</h3>
<p>على غرار الربط بالحلقة المتداخلة، يعالج الربط القياسي بالدمج الجدول الداخلي لجميع الصفوف. وبناءً على ذلك، على كل عامل تنفيذ عملية الفرز الخاصة به للجدول الداخلي بشكل مستقل.</p>
<p>غير أنه إذا وُصل إلى الجدول الداخلي باستخدام مسح فهرس، فيمكن تنفيذ عملية الربط بكفاءة، على غرار الربط المفهرس بالحلقة المتداخلة.</p>
<pre><code>testdb=# SET enable_nestloop = OFF;
SET
testdb=# SET enable_mergejoin = ON;
SET
testdb=# SET enable_hashjoin = OFF;
SET
testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id AND d.id &lt; 100000;
                                       QUERY PLAN
----------------------------------------------------------------------------------------
 Gather  (cost=837387.83..853944.33 rows=97361 width=24)
   Workers Planned: 2
   -&gt;  Merge Join  (cost=836387.83..843208.23 rows=48680 width=24)
         Merge Cond: (f.id = d.id)
         -&gt;  Sort  (cost=836385.61..848880.80 rows=4998079 width=12)
               Sort Key: f.id
               -&gt;  Parallel Seq Scan on f  (cost=0.00..109440.79 rows=4998079 width=12)
         -&gt;  Index Scan using d_id_idx on d  (cost=0.42..3569.24 rows=97361 width=12)
               Index Cond: (id &lt; '100000'::double precision)
(9 rows)
</code></pre>
<h3 id="3723-الربط-بالتجزئة">3.7.2.3. الربط بالتجزئة</h3>
<p>في الإصدارين 9.6 و10 من PostgreSQL، يبني كل عامل مشارك في ربط متوازٍ بالتجزئة جدول تجزئة خاصًا به للجدول الداخلي. ويؤدي ذلك إلى استخدام مرتفع للذاكرة وعمل مكرّر.</p>
<pre><code>testdb=# SET enable_nestloop = OFF;
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
   -&gt;  Hash Join  (cost=35492.00..222368.59 rows=500000 width=24)
         Hash Cond: (f.id = d.id)
         -&gt;  Parallel Seq Scan on f  (cost=0.00..109440.79 rows=4998079 width=12)
         -&gt;  Hash  (cost=18109.00..18109.00 rows=1000000 width=12)
               -&gt;  Seq Scan on d  (cost=0.00..18109.00 rows=1000000 width=12)
(7 rows)
</code></pre>
<p>أُدخل الربط المتوازي بالتجزئة في الإصدار 11 (ويتحكّم به المعامل <a href="https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-ENABLE-PARALLEL-HASH">enable_parallel_hash</a>، وهو مفعَّل افتراضيًا). وبهذه الميزة، يتعاون جميع العمال لبناء جدول تجزئة مشترك في DSM. ويتيح ذلك مرحلة بناء أكثر كفاءة ويقلّل كلفة الذاكرة.</p>
<pre><code>testdb=# SET enable_parallel_hash = ON;
SET
testdb=# EXPLAIN SELECT * FROM d, f WHERE d.id = f.id;
                                      QUERY PLAN
--------------------------------------------------------------------------------------
 Gather  (cost=22801.00..304736.59 rows=1000000 width=24)
   Workers Planned: 2
   -&gt;  Parallel Hash Join  (cost=21801.00..203736.59 rows=500000 width=24)
         Hash Cond: (f.id = d.id)
         -&gt;  Parallel Seq Scan on f  (cost=0.00..109440.79 rows=4998079 width=12)
         -&gt;  Parallel Hash  (cost=13109.00..13109.00 rows=500000 width=12)
               -&gt;  Parallel Seq Scan on d  (cost=0.00..13109.00 rows=500000 width=12)
(7 rows)
</code></pre>
<h2 id="373-التجميع-المتوازي">3.7.3. التجميع المتوازي</h2>
<p>يمكن معالجة معظم الدوال التجميعية في PostgreSQL على التوازي. ويعتمد ما إذا كانت دالة معينة تدعم التوازي على ما إذا كان وضعها <code>Partial Mode</code> مضبوطًا على <code>YES</code> في <a href="https://www.postgresql.org/docs/current/functions-aggregate.html">التوثيق الرسمي</a>.</p>
<p>ويختار المخطِّط بين استراتيجيتين رئيسيتين بناءً على العدد المقدَّر للصفوف الهدف.</p>
<h3 id="3731-الاستراتيجية-1-تجميع-بسيط-عدد-صفوف-صغير">3.7.3.1. الاستراتيجية 1: تجميع بسيط (عدد صفوف صغير)</h3>
<p>عندما يكون العدد المتوقَّع للصفوف صغيرًا، ينفّذ العمال المسح، لكن التجميع الفعلي يحدث في عملية القائد:</p>
<ol>
<li>يمسح كل عامل الصفوف عبر عقدة Parallel Seq Scan.</li>
<li>تستقبل عقدة Gather هذه الصفوف الخام من العمال.</li>
<li>تحسب عقدة Aggregate النتيجة النهائية من الصفوف المجموعة.</li>
</ol>
<pre><code>testdb=# EXPLAIN SELECT avg(id) FROM d where id BETWEEN 1 AND 10;
                                        QUERY PLAN
------------------------------------------------------------------------------------------
 Aggregate  (cost=16609.10..16609.11 rows=1 width=8)
   -&gt;  Gather  (cost=1000.00..16609.10 rows=1 width=8)
         Workers Planned: 2
         -&gt;  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=8)
               Filter: ((id &gt;= '1'::double precision) AND (id &lt;= '10'::double precision))
(5 rows)

testdb=# EXPLAIN SELECT var_pop(id) FROM d where id BETWEEN 1 AND 10;
                                        QUERY PLAN
------------------------------------------------------------------------------------------
 Aggregate  (cost=16609.10..16609.11 rows=1 width=8)
   -&gt;  Gather  (cost=1000.00..16609.10 rows=1 width=8)
         Workers Planned: 2
         -&gt;  Parallel Seq Scan on d  (cost=0.00..15609.00 rows=1 width=8)
               Filter: ((id &gt;= '1'::double precision) AND (id &lt;= '10'::double precision))
(5 rows)
</code></pre>
<h3 id="3732-الاستراتيجية-2-تجميع-جزئينهائي-عدد-صفوف-كبير">3.7.3.2. الاستراتيجية 2: تجميع جزئي/نهائي (عدد صفوف كبير)</h3>
<p>عندما يكون العدد المتوقَّع للصفوف كبيرًا، يكون تقليل حجم البيانات قبل إرسالها عبر DSM أكثر كفاءة:</p>
<ol>
<li>ينفّذ كل عامل تجميعًا جزئيًا (Partial Aggregate) على صفوفه الممسوحة محليًا.</li>
<li>تجمع عقدة Gather هذه النتائج الوسيطة المجمَّعة جزئيًا (بدلًا من الصفوف الخام).</li>
<li>تدمج عقدة Finalize Aggregate النتائج الوسيطة في جواب نهائي.</li>
</ol>
<pre><code>testdb=# EXPLAIN SELECT avg(id) FROM d where data &gt; 100;
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=16485.14..16485.15 rows=1 width=8)
   -&gt;  Gather  (cost=16484.93..16485.14 rows=2 width=32)
         Workers Planned: 2
         -&gt;  Partial Aggregate  (cost=15484.93..15484.94 rows=1 width=32)
               -&gt;  Parallel Seq Scan on d  (cost=0.00..14359.00 rows=450371 width=8)
                     Filter: (data &gt; 100)
(6 rows)

testdb=# EXPLAIN  SELECT var_pop(id) FROM d where data &gt; 100;
                                     QUERY PLAN
-------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=16485.14..16485.15 rows=1 width=8)
   -&gt;  Gather  (cost=16484.93..16485.14 rows=2 width=32)
         Workers Planned: 2
         -&gt;  Partial Aggregate  (cost=15484.93..15484.94 rows=1 width=32)
               -&gt;  Parallel Seq Scan on d  (cost=0.00..14359.00 rows=450371 width=8)
                     Filter: (data &gt; 100)
(6 rows)
</code></pre>
<h3 id="3733-المنطق-الرياضي-للتجميع-المتوازي">3.7.3.3. المنطق الرياضي للتجميع المتوازي</h3>
<p>لدمج النتائج من عمال مختلفين (مثل المجاميع والمتوسطات والتباينات)، يستخدم PostgreSQL الصيغ التالية (انظر الملحق 1.2 للتفاصيل):</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.604em;vertical-align:-1.052em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.552em;"><span style="top:-3.552em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.052em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.552em;"><span style="top:-3.552em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span><span class="mspace"> </span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.052em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.552em;"><span style="top:-3.552em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace"> </span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.052em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.552em;"><span style="top:-3.552em;"><span class="pstrut" style="height:3.654em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.2222em;">V</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.2222em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1076em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3173em;"><span style="top:-2.357em;margin-left:0em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2501em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.836em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:1.654em;"><span style="top:-3.9029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.052em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>وتستخدم عقدة Finalize Aggregate هذه الصيغ لدمج النتائج الجزئية. وفي الاستعلامات التي تشمل ثلاثة عمال أو أكثر، تُكرَّر هذه العملية تكراريًا للوصول إلى القيمة النهائية.</p>
`,i={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:p,html:l};export{s as book,a as chapter,n as chapterTitle,i as default,p as headings,l as html,t as slug,e as title};
