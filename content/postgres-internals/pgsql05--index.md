---
title: "التحكّم بالتزامن"
lang: ar
source: https://www.interdb.jp/pg/pgsql05/index.html
---

# 5.1 معرّف المعاملة (Transaction ID)

في بداية كل معاملة (transaction)، يمنح مدير المعاملات معرّفاً فريداً يُعرف بمعرّف المعاملة (transaction ID، ويُختصر **txid**). ومعرّف المعاملة في PostgreSQL عدد صحيح غير سالب بعرض 32 بت، ما يمنحه نطاقاً أقصى يقارب 4.2 مليار (ألف مليون) قيمة.

تُعيد الدالة المدمجة [txid_current()](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-TXID-SNAPSHOT) معرّف المعاملة الحالي:

```
testdb=# BEGIN;
BEGIN
testdb=# SELECT txid_current();
 txid_current
--------------
          100
(1 row)
```

يحجز PostgreSQL ثلاثة معرّفات معاملات خاصة:

- **0:** يمثّل معرّف معاملة غير صالح (Invalid).
- **1:** يمثّل معرّف معاملة الإقلاع (Bootstrap)، ويُستخدم فقط أثناء تهيئة عنقود قواعد البيانات.
- **2:** يمثّل معرّف المعاملة المجمَّد (Frozen)، كما هو موضّح في القسم 5.10.2.

يمكن مقارنة معرّفات المعاملات. فمن منظور المعرّف 100، تُعدّ المعرّفات الأكبر من 100 «في المستقبل» و**غير مرئية**. أما المعرّفات الأقل من 100 فتُعدّ «في الماضي» و**مرئية** (الشكل 5.1 أ)).

![](/images/postgres-internals/pgsql05-fig-5-01.webp)

#### الشكل 5.1. معرّفات المعاملات في PostgreSQL.

لأن فضاء معرّفات المعاملات البالغ 32 بت غير كافٍ في الأنظمة العملية، يتعامل معه PostgreSQL كدائرة. فبالنسبة إلى أي معرّف معاملة محدّد، تكون المعرّفات السابقة البالغة 2.1 مليار «في الماضي»، بينما تكون المعرّفات اللاحقة البالغة 2.1 مليار «في المستقبل» (الشكل 5.1 ب)).

تُوصَف **مشكلة التفاف معرّف المعاملة (txid wraparound)** وحلولها في القسم 5.10.1.

** معلومات

لا يمنح الأمر BEGIN معرّف معاملة.

في PostgreSQL، لا يمنح مدير المعاملات معرّف معاملة إلا عند تنفيذ أول أمر بعد BEGIN.

```
testdb=# BEGIN;                    -- TXID is not assigned yet.
BEGIN
testdb=# SELECT txid_current();    -- TXUD is just assigned.
 txid_current
--------------
          100
(1 row)
```

# 5.2 بنية الصف (Tuple Structure)

تُصنَّف صفوف الكومة (heap tuples) في صفحات الجداول إلى نوعين: صفوف البيانات القياسية وصفوف TOAST. يصف هذا القسم بنية صفوف البيانات القياسية.

يتكوّن صف الكومة (tuple) من ثلاثة أجزاء: بنية `HeapTupleHeaderData` المعرّفة في [htup_details.h](https://github.com/postgres/postgres/blob/ee943004466418595363d567f18c053bae407792/src/include/access/htup_details.h)، وخريطة بتّات للقيم الفارغة (NULL bitmap)، وبيانات المستخدم (الشكل 5.2).

![](/images/postgres-internals/pgsql05-fig-5-02.webp)

#### الشكل 5.2. بنية الصف.

فيما يلي بنية `HeapTupleHeaderData` والبنى المرتبطة بها:

```
typedef struct HeapTupleFields
{
        TransactionId t_xmin;		   /* inserting xact ID */
        TransactionId t_xmax;              /* deleting or locking xact ID */

        union
        {
                CommandId       t_cid;     /* inserting or deleting command ID, or both */
                TransactionId 	t_xvac;    /* old-style VACUUM FULL xact ID */
        } t_field3;
} HeapTupleFields;

typedef struct DatumTupleFields
{
        int32          datum_len_;          /* varlena header (do not touch directly!) */
        int32          datum_typmod;   	    /* -1, or identifier of a record type */
        Oid            datum_typeid;   	    /* composite type OID, or RECORDOID */

        /*
         * Note: field ordering is chosen with thought that Oid might someday
         * widen to 64 bits.
         */
} DatumTupleFields;

typedef struct HeapTupleHeaderData
{
        union
        {
                HeapTupleFields t_heap;
                DatumTupleFields t_datum;
        } t_choice;

        ItemPointerData t_ctid;         /* current TID of this or newer tuple */

        /* Fields below here must match MinimalTupleData! */
        uint16          t_infomask2;    /* number of attributes + various flags */
        uint16          t_infomask;     /* various flag bits, see below */
        uint8           t_hoff;         /* sizeof header incl. bitmap, padding */
        /* ^ - 23 bytes - ^ */
        bits8           t_bits[1];      /* bitmap of NULLs -- VARIABLE LENGTH */

        /* MORE DATA FOLLOWS AT END OF STRUCT */
} HeapTupleHeaderData;

typedef HeapTupleHeaderData *HeapTupleHeader;
```

رغم أن بنية HeapTupleHeaderData تضمّ عدة حقول، فإن الحقول الأربعة التالية أساسية لفهم التحكّم بالتزامن (concurrency control):

- **t_xmin:** يخزّن معرّف المعاملة التي أدرجت الصف.
- **t_xmax:** يخزّن معرّف المعاملة التي حذفت الصف أو حدّثته. وإذا لم يكن الصف محذوفاً أو محدَّثاً، فتُضبط t_xmax على 0 (غير صالح).
- **t_cid:** يخزّن معرّف الأمر (cid)، وهو عدد أوامر SQL المنفَّذة قبل الأمر الحالي ضمن المعاملة نفسها، بدءاً من 0. على سبيل المثال، في كتلة معاملة تضمّ ثلاثة أوامر INSERT: ‘BEGIN;INSERT;INSERT;INSERT;COMMIT’، يكون t_cid للصف الذي أدرجه الأمر الأول 0، وللثاني 1، وللثالث 2.
- **t_ctid:** يخزّن معرّف الصف (tid)، الذي يشير إما إلى الصف نفسه وإما إلى نسخة أحدث منه. وكما هو موضّح في القسم 1.3، يحدّد tid الموضع الفيزيائي للصف داخل الجدول. وعند تحديث صف، يُحدَّث t_ctid الخاص به ليشير إلى النسخة الجديدة من الصف؛ وإلا فإنه يشير إلى الصف نفسه.

# 5.3. إدراج الصفوف وحذفها وتحديثها

يصف هذا القسم عمليات إدراج الصفوف وحذفها وتحديثها. كما يقدّم لمحة موجزة عن خريطة المساحة الحرة (Free Space Map, FSM)، التي تُستخدم أثناء عمليات الإدراج والتحديث.

للتركيز على التفاصيل المتعلقة بالصف، تُحذف ترويسات الصفحات ومؤشرات الأسطر من الأوصاف التالية. ويوضّح الشكل 5.3 التمثيل الأساسي للصفوف المستخدم في هذا القسم.

![](/images/postgres-internals/pgsql05-fig-5-03.webp)

#### الشكل 5.3. تمثيل الصفوف.

محتويات القسم

- 5.3.1. الإدراج
- 5.3.2. الحذف
- 5.3.3. التحديث
- 5.3.4. خريطة المساحة الحرة

## 5.3.1. الإدراج

في عملية الإدراج، يُوضع صف جديد مباشرةً في إحدى صفحات الجدول الهدف (الشكل 5.4).

![](/images/postgres-internals/pgsql05-fig-5-04.webp)

#### الشكل 5.4. إدراج صف.

لنفترض أن معاملة بمعرّف 99 تُدرج صفاً. عندئذٍ تُضبط حقول الترويسة للصف المُدرج كما يلي:

- **Tuple_1:** **t_xmin:** يُضبط على 99 (معرّف المعاملة المُدرِجة).
- **t_xmax:** يُضبط على 0 (غير صالح)، لأن الصف لم يُحذف ولم يُحدَّث.
- **t_cid:** يُضبط على 0، ما يدل على أن هذا أول أمر تنفّذه المعاملة 99.
- **t_ctid:** يُضبط على (0, 1). وهو يشير إلى الصف نفسه لأنه أحدث نسخة.

** pageinspect

إن امتداد [pageinspect](https://www.postgresql.org/docs/current/pageinspect.html) وحدة مساهمة تعرض محتويات صفحات قاعدة البيانات.

```sql
testdb=# CREATE EXTENSION pageinspect;
CREATE EXTENSION
testdb=# CREATE TABLE tbl (data text);
CREATE TABLE
testdb=# INSERT INTO tbl VALUES('A');
INSERT 0 1
testdb=# SELECT lp as tuple, t_xmin, t_xmax, t_field3 as t_cid, t_ctid
                FROM heap_page_items(get_raw_page('tbl', 0));
 tuple | t_xmin | t_xmax | t_cid | t_ctid
-------+--------+--------+-------+--------
     1 |     99 |      0 |     0 | (0,1)
(1 row)
```

## 5.3.2. الحذف

في عملية الحذف، يُحذف الصف الهدف منطقياً. ويُسجَّل معرّف المعاملة التي تنفّذ أمر DELETE في الحقل t_xmax الخاص بالصف (الشكل 5.5).

![](/images/postgres-internals/pgsql05-fig-5-05.webp)

#### الشكل 5.5. حذف صف.

لنفترض أن المعاملة 201 تحذف Tuple_1. عندئذٍ تُحدَّث حقول الترويسة كما يلي:

- **Tuple_1:** **t_xmax:** يُضبط على 201.

بمجرد أن تُودِع المعاملة 201، يصبح Tuple_1 غير ضروري. وفي PostgreSQL، تُسمّى الصفوف غير الضرورية هذه **صفوفاً ميتة (dead tuples)**.

تُزال الصفوف الميتة في النهاية عبر **عملية التفريغ (VACUUM)**، وهي مفصّلة في [الفصل 6](/book/postgres-internals/pgsql06/index).

## 5.3.3. التحديث

في عملية التحديث، يحذف PostgreSQL النسخة الموجودة منطقياً ويُدرج نسخة جديدة (الشكل 5.6).

![](/images/postgres-internals/pgsql05-fig-5-06.webp)

#### الشكل 5.6. تحديث الصف مرتين.

لنفترض أن صفاً أدرجته أصلاً المعاملة 99 يُحدَّث مرتين بواسطة المعاملة 100.

يحذف أمر UPDATE الأول Tuple_1 منطقياً بضبط t_xmax على 100، ثم يُدرج Tuple_2. بالإضافة إلى ذلك، يُحدَّث t_ctid الخاص بـ Tuple_1 ليشير إلى Tuple_2.

- **Tuple_1:** **t_xmax:** يُضبط على 100.
- **t_ctid:** يُحدَّث من (0, 1) إلى (0, 2).

**Tuple_2:**

- **t_xmin:** يُضبط على 100.
- **t_xmax:** يُضبط على 0.
- **t_cid:** يُضبط على 0.
- **t_ctid:** يُضبط على (0, 2).

يتبع أمر UPDATE الثاني المنطق نفسه: يُحذف Tuple_2 منطقياً، ويُدرَج Tuple_3.

- **Tuple_2:** **t_xmax:** يُضبط على 100.
- **t_ctid:** يُحدَّث من (0, 2) إلى (0, 3).

**Tuple_3:**

- **t_xmin:** يُضبط على 100.
- **t_xmax:** يُضبط على 0.
- **t_cid:** يُضبط على 1.
- **t_ctid:** يُضبط على (0, 3).

إذا أودعت المعاملة 100، يصبح Tuple_1 وTuple_2 صفين ميتين. وإذا تراجعت المعاملة 100، يصبح Tuple_2 وTuple_3 صفين ميتين.

## 5.3.4. خريطة المساحة الحرة

يستخدم PostgreSQL **خريطة المساحة الحرة (Free Space Map, FSM)** لاختيار صفحة ذات سعة كافية عند إدراج صف كومة أو صف فهرس.

وكما هو موضّح في القسم 1.2.3، لكل جدول وفهرس خريطة FSM مرتبطة به. وتتتبّع كل خريطة FSM المساحة الحرة المتاحة في كل صفحة من الملف المقابل لها.

تُخزَّن ملفات FSM بلاحقة “.fsm” وتُحمَّل إلى الذاكرة المشتركة حسب الحاجة.

** pg_freespacemap

يعرض الامتداد [pg_freespacemap](https://www.postgresql.org/docs/current/static/pgfreespacemap.html) المساحة الحرة المتاحة لجدول أو فهرس محدّد.

يُظهر الاستعلام التالي نسبة المساحة الحرة لكل صفحة في جدول.

```sql
testdb=# CREATE EXTENSION pg_freespacemap;
CREATE EXTENSION

testdb=# SELECT *, round(100 * avail/8192 ,2) as &#34;freespace ratio&#34;
                FROM pg_freespace('accounts');
 blkno | avail | freespace ratio
-------+-------+-----------------
     0 |  7904 |           96.00
     1 |  7520 |           91.00
     2 |  7136 |           87.00
     3 |  7136 |           87.00
     4 |  7136 |           87.00
     5 |  7136 |           87.00
....
```

# 5.4. سجل الالتزام (clog)

يحتفظ PostgreSQL بحالات المعاملات في **سجل الالتزام (Commit Log)**، الذي يُشار إليه عادةً بـ**clog**. ويُخصَّص سجل الالتزام داخل الذاكرة المشتركة ويُستخدم طوال معالجة المعاملات كلها.

يصف هذا القسم حالات المعاملة، وطريقة عمل سجل الالتزام، وصيانته.

محتويات القسم

- 5.4.1. حالة المعاملة
- 5.4.2. كيف يعمل سجل الالتزام
- 5.4.3. صيانة سجل الالتزام

## 5.4.1. حالة المعاملة

يعرّف PostgreSQL أربع حالات للمعاملة: IN_PROGRESS وCOMMITTED وABORTED وSUB_COMMITTED.

الحالات الثلاث الأولى بديهية. فمثلاً، ما دامت المعاملة نشطة، تكون حالتها IN_PROGRESS.

الحالة SUB_COMMITTED مخصّصة للمعاملات الفرعية؛ وتُحذف تفاصيلها من هذا التوثيق.

## 5.4.2. كيف يعمل سجل الالتزام

يتكوّن سجل الالتزام من صفحة واحدة أو أكثر بحجم 8 كيلوبايت في الذاكرة المشتركة. وهو يشكّل منطقياً مصفوفةً تتوافق فهارسها مع معرّفات المعاملات (txids). ويخزّن كل عنصر في المصفوفة حالة معرّف المعاملة المقابل. ويوضّح الشكل 5.7 بنية سجل الالتزام وطريقة عمله.

![](/images/postgres-internals/pgsql05-fig-5-07.webp)

#### الشكل 5.7. كيف يعمل سجل الالتزام.

- **T1:** تُودِع المعاملة 200؛ فتتغيّر حالتها من IN_PROGRESS إلى COMMITTED.
- **T2:** تتراجع المعاملة 201؛ فتتغيّر حالتها من IN_PROGRESS إلى ABORTED.

مع تقدّم معرّف المعاملة الحالي، يُضيف PostgreSQL صفحة جديدة متى امتلأت الصفحة الحالية.

لتنفيذ التحكّم بالتزامن، تسترجع دوال داخلية حالة المعاملة من سجل الالتزام. ثم تُعيد هذه الدوال حالة المعاملة المطلوبة. (راجع «بتّات التلميح (Hint Bits)» في القسم 5.7.1.1 لمزيد من التفاصيل.)

## 5.4.3. صيانة سجل الالتزام

يكتب PostgreSQL بيانات سجل الالتزام إلى ملفات في الدليل الفرعي pg_xact[^1] عند الإيقاف أو كلما عملت عملية نقطة تحقق (checkpoint). وتُسمّى هذه الملفات تسمية تسلسلية، مثل ‘0000’ و‘0001’.

الحد الأقصى لحجم كل ملف 256 كيلوبايت. فمثلاً، إذا شغل سجل الالتزام ثماني صفحات (بإجمالي 64 كيلوبايت)، تُكتب البيانات كلها في الملف 0000. وإذا شغل 37 صفحة (بإجمالي 296 كيلوبايت)، تُوزَّع البيانات بين الملفين 0000 (256 كيلوبايت) و0001 (40 كيلوبايت).

أثناء بدء التشغيل، يحمّل PostgreSQL البيانات من ملفات pg_xact لتهيئة سجل الالتزام في الذاكرة المشتركة.

يزداد الحجم الإجمالي لسجل الالتزام باستمرار مع إضافة صفحات جديدة. غير أن البيانات القديمة تصبح في النهاية غير ضرورية. وتزيل عملية التفريغ (VACUUM)، الموضّحة في [الفصل 6](/book/postgres-internals/pgsql06/index)، صفحات وملفات سجل الالتزام القديمة بانتظام. وتُقدَّم تفاصيل إزالة بيانات سجل الالتزام في القسم 6.4.

[^1]: ملاحظة: كان “pg_xact” يُسمّى “pg_clog” في الإصدار 9.6 وما قبله.

# 5.5. لقطة المعاملة (Transaction Snapshot)

**لقطة المعاملة (transaction snapshot)** مجموعة بيانات تخزّن معلومات عن نشاط جميع المعاملات عند لحظة زمنية محدّدة، وذلك بالنسبة إلى معاملة فردية. وفي هذا السياق، تكون المعاملة **نشطة** إذا كانت قيد التنفيذ أو لم تبدأ بعد.

يعرّف PostgreSQL التمثيل النصي الداخلي للقطة المعاملة بالصيغة `xmin:xmax:xip_list`. فمثلاً، في تمثيل مبسّط مثل ‘100:100:’، يدل ذلك على أن معرّفات المعاملات الأقل من 100 ليست نشطة، بينما المعرّفات المساوية لـ100 أو الأكبر منها نشطة.

تُستخدم صيغة التمثيل هذه في الأوصاف التالية. (لمزيد من التفاصيل حول الصيغة، راجع ** أدناه.)

** الدالة المدمجة pg_current_snapshot وصيغة تمثيلها النصي

تُعيد الدالة [pg_current_snapshot](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-PG-SNAPSHOT) لقطةً للمعاملة الحالية.

```
testdb=# SELECT pg_current_snapshot();
 pg_current_snapshot
---------------------
 100:104:100,102
(1 row)
```

يتبع التمثيل النصي للقطة الصيغة `xmin:xmax:xip_list`. ويُعرَّف كل مكوّن كما يلي:

- **xmin:** أقدم معرّف معاملة ما زال نشطاً. فكل المعاملات الأسبق منه إما مودَعة ومرئية وإما متراجعة وميتة.
- **xmax:** أول معرّف معاملة لم يُسنَد بعد. فكل المعرّفات المساوية لهذه القيمة أو الأكبر منها لم تكن قد بدأت عند لحظة اللقطة، ولذلك فهي غير مرئية.
- **xip_list:** قائمة بمعرّفات المعاملات النشطة عند لحظة اللقطة. وتضمّ هذه القائمة المعرّفات النشطة الواقعة بين xmin وxmax فقط.

فمثلاً، في اللقطة ‘100:104:100,102’، يكون xmin هو 100، وxmax هو 104، وتضمّ xip_list القيمتين 100 و102.

يوضّح الشكل 5.8 مثالين محدّدين لتمثيل اللقطات.

![](/images/postgres-internals/pgsql05-fig-5-08.webp)

#### الشكل 5.8. أمثلة على تمثيل لقطة المعاملة.

- **المثال 1:** ‘100:100:’ كما هو موضّح في الشكل 5.8(أ)، تدل هذه اللقطة على ما يلي: معرّفات المعاملات الأقل من 100 **ليست** نشطة (xmin = 100).
- معرّفات المعاملات المساوية لـ100 أو الأكبر منها **نشطة** (xmax = 100).

**المثال 2:** ‘100:104:100,102’ كما هو موضّح في الشكل 5.8(ب)، تدل هذه اللقطة على ما يلي:

- معرّفات المعاملات الأقل من 100 **ليست** نشطة.
- معرّفات المعاملات المساوية لـ104 أو الأكبر منها **نشطة**.
- المعرّفان 100 و102 **نشطان** لأنهما يظهران في xip_list.
- المعرّفان 101 و103 **ليسا** نشطين.

يوفّر مدير المعاملات هذه اللقطات. ففي مستوى العزل (isolation level) READ COMMITTED (القراءة المُودَعة)، تحصل المعاملة على لقطة جديدة كلما نُفّذ أمر SQL. وفي المقابل، في مستويي REPEATABLE READ (القراءة القابلة للتكرار) أو SERIALIZABLE (القابل للتسلسل)، لا تحصل المعاملة على لقطة إلا عند تنفيذ أول أمر SQL. وهذه اللقطات ضرورية لفحص ظهور الصفوف (visibility)، وهو موضّح في القسم 5.7.

عند إجراء فحص الظهور، يجب التعامل مع المعاملات الموصوفة بأنها **نشطة** في اللقطة على أنها **قيد التنفيذ**، حتى لو كانت قد أُودِعت أو تراجعت بعد ذلك. وتُنشئ هذه القاعدة الفرق السلوكي الجوهري بين READ COMMITTED وREPEATABLE READ (أو SERIALIZABLE).

يوضّح السيناريو التالي، الممثَّل في الشكل 5.9، التفاعل بين مدير المعاملات والمعاملات الفردية.

![](/images/postgres-internals/pgsql05-fig-5-09.webp)

#### الشكل 5.9. مدير المعاملات والمعاملات.

يحتفظ مدير المعاملات بمعلومات عن جميع المعاملات الجارية حالياً. في هذا السيناريو، تبدأ ثلاث معاملات بالتتابع: تستخدم Transaction_A وTransaction_B مستوى READ COMMITTED، بينما تستخدم Transaction_C مستوى REPEATABLE READ.

- **T1:** تبدأ Transaction_A وتنفّذ أول أمر SELECT لها. في هذه اللحظة، يمنح مدير المعاملات المعرّف 200 ويُعيد اللقطة ‘200:200:’.
- **T2:** تبدأ Transaction_B وتنفّذ أول أمر SELECT لها. يمنح مدير المعاملات المعرّف 201 ويُعيد اللقطة ‘200:200:’ لأن Transaction_A (المعرّف 200) ما زالت قيد التنفيذ. وبالتالي، تكون Transaction_A غير مرئية لـTransaction_B.
- **T3:** تبدأ Transaction_C وتنفّذ أول أمر SELECT لها. يمنح مدير المعاملات المعرّف 202 ويُعيد اللقطة ‘200:200:’. وتكون كلٌّ من Transaction_A وTransaction_B غير مرئية لـTransaction_C.
- **T4:** تُودِع Transaction_A. فيزيل مدير المعاملات معلومات هذه المعاملة.
- **T5:** تنفّذ Transaction_B وTransaction_C أوامر SELECT لاحقة: تحصل Transaction_B على لقطة جديدة لأنها تعمل بمستوى READ COMMITTED. فتتلقى اللقطة ‘201:201:’ لأن Transaction_A أصبحت مودَعة الآن. وبذلك تصبح Transaction_A مرئية لـTransaction_B.
- وفي المقابل، لا تطلب Transaction_C لقطة جديدة. بل تواصل استخدام اللقطة الأولية (‘200:200:’) كما يقتضي مستوى REPEATABLE READ. لذلك تظل Transaction_A غير مرئية لـTransaction_C.

# 5.6. قواعد فحص الظهور

تحدّد قواعد فحص الظهور ما إذا كان الصف مرئياً أم غير مرئي. وتستخدم هذه القواعد الحقلين t_xmin وt_xmax للصف، وسجل الالتزام، ولقطة المعاملة.

نظراً لتعقيد مجموعة القواعد الكاملة، يعرض هذا التوثيق القواعد الدنيا اللازمة للأقسام اللاحقة فقط. وتُغفل الأوصاف التالية منطق المعاملات الفرعية ولا تأخذ في الحسبان الصفوف المُحدَّثة أكثر من مرتين ضمن معاملة واحدة (أي يُتجاهل t_ctid).

تُصنَّف القواعد العشر المختارة في الحالات الثلاث التالية بناءً على حالة t_xmin.

محتويات القسم

- 5.6.1. حالة t_xmin هي ABORTED
- 5.6.2. حالة t_xmin هي IN_PROGRESS
- 5.6.3. حالة t_xmin هي COMMITTED

## 5.6.1. حالة t_xmin هي ABORTED

الصف الذي تكون فيه حالة t_xmin هي ABORTED يكون دائماً *غير مرئي* (القاعدة 1) لأن المعاملة التي أدرجته فشلت.

```
/* t_xmin status == ABORTED */
Rule 1:	  IF t_xmin status is 'ABORTED' THEN
                 RETURN 'Invisible'
          END IF
```

- **القاعدة 1:** إذا كان Status(t_xmin) = ABORTED $\Rightarrow$ غير مرئي

## 5.6.2. حالة t_xmin هي IN_PROGRESS

الصف الذي تكون فيه حالة t_xmin هي IN_PROGRESS يكون عموماً *غير مرئي* (القاعدتان 3 و4)، باستثناء واحد يتعلق بالمعاملة المُدرِجة (القاعدة 2).

```
 /* t_xmin status == IN_PROGRESS */
       IF t_xmin status is 'IN_PROGRESS' THEN
              IF t_xmin = current_txid THEN
Rule 2:              IF t_xmax = INVALID THEN
                           RETURN 'Visible'
Rule 3:              ELSE  /* this tuple has been deleted or updated  */
                           /* by the current transaction itself.      */
                            RETURN 'Invisible'
                     END IF
Rule 4:       ELSE   /* t_xmin != current_txid */
                     RETURN 'Invisible'
              END IF
       END IF
```

إذا أدرجت معاملة أخرى الصف وكانت حالة t_xmin الخاصة به IN_PROGRESS، يكون الصف *غير مرئي* (القاعدة 4). وبعبارة أخرى، تكون التغييرات غير المودَعة من معاملة ما *غير مرئية* للمعاملات الأخرى.

ويحدث الاستثناء عندما تكون المعاملة الحالية هي التي أدرجت الصف وتكون t_xmax هي INVALID. في هذه الحالة، يكون الصف *مرئياً* للمعاملة الحالية (القاعدة 2) لأنه أُدرج بواسطة المعاملة الحالية نفسها.

ومع ذلك، حتى إذا كانت t_xmin تساوي معرّف المعاملة الحالية (أي أن المعاملة الحالية أدرجت الصف) وكانت t_xmax **ليست** INVALID، فإن الصف *غير مرئي* لأن المعاملة الحالية حدّثته أو حذفته بالفعل (القاعدة 3).

- **القاعدة 2:** إذا كان Status(t_xmin) = IN_PROGRESS $\wedge$ t_xmin = current_txid $\wedge$ t_xmax = INVALID $\Rightarrow$ مرئي
- **القاعدة 3:** إذا كان Status(t_xmin) = IN_PROGRESS $\wedge$ t_xmin = current_txid $\wedge$ t_xmax $\ne$ INVALID $\Rightarrow$ غير مرئي
- **القاعدة 4:** إذا كان Status(t_xmin) = IN_PROGRESS $\wedge$ t_xmin $\ne$ current_txid $\Rightarrow$ غير مرئي

## 5.6.3. حالة t_xmin هي COMMITTED

الصف الذي تكون فيه حالة t_xmin هي COMMITTED يكون *مرئياً* (القواعد 6 و8 و9)، مع ثلاثة استثناءات.

```
 /* t_xmin status == COMMITTED */
        IF t_xmin status is 'COMMITTED' THEN
Rule 5:        IF t_xmin is 'active' in the obtained transaction snapshot THEN
                      RETURN 'Invisible'
Rule 6:        ELSE IF t_xmax = INVALID OR status of t_xmax is 'ABORTED' THEN
                      RETURN 'Visible'
               ELSE IF t_xmax status is 'IN_PROGRESS' THEN
Rule 7:               IF t_xmax =  current_txid THEN
                             RETURN 'Invisible'
Rule 8:               ELSE  /* t_xmax != current_txid */
                             RETURN 'Visible'
                      END IF
               ELSE IF t_xmax status is 'COMMITTED' THEN
Rule 9:               IF t_xmax is 'active' in the obtained transaction snapshot THEN
                             RETURN 'Visible'
Rule 10:              ELSE
                             RETURN 'Invisible'
                      END IF
               END IF
        END IF
```

القاعدة 6 واضحة مباشرة لأن t_xmax إما INVALID وإما ABORTED. وفيما يلي وصف الاستثناءات الثلاثة إلى جانب القاعدتين 8 و9.

يحدث الاستثناء الأول عندما تكون t_xmin نشطة في لقطة المعاملة المُحصَّلة (القاعدة 5). وفي هذه الحالة يكون الصف *غير مرئي* لأن t_xmin تُعامَل على أنها قيد التنفيذ.

ويحدث الاستثناء الثاني عندما تساوي t_xmax معرّف المعاملة الحالية (القاعدة 7). في هذه الحالة، وعلى غرار القاعدة 3، يكون الصف *غير مرئي* لأن المعاملة الحالية حذفته أو حدّثته.

وفي المقابل، إذا كانت حالة t_xmax هي IN_PROGRESS ولم تكن t_xmax هي معرّف المعاملة الحالية (القاعدة 8)، يكون الصف *مرئياً*. وذلك لأن المعاملة الحاذفة ما زالت قيد التنفيذ ولم تُودِع بعد.

ويحدث الاستثناء الثالث عندما تكون حالة t_xmax هي COMMITTED ولا تكون t_xmax **نشطة** في لقطة المعاملة المُحصَّلة (القاعدة 10). وفي هذه الحالة يكون الصف *غير مرئي* لأن معاملة أخرى أودعت حذفه أو تحديثه.

وفي المقابل، إذا كانت حالة t_xmax هي COMMITTED لكن t_xmax نشطة في اللقطة المُحصَّلة (القاعدة 9)، يكون الصف *مرئياً*. وذلك لأن المعاملة الحاذفة تُعامَل على أنها قيد التنفيذ.

- **القاعدة 5:** إذا كان Status(t_xmin) = COMMITTED $\wedge$ Snapshot(t_xmin) = active $\Rightarrow$ غير مرئي
- **القاعدة 6:** إذا كان Status(t_xmin) = COMMITTED $\wedge$ ((t_xmax = INVALID $\vee$ Status(t_xmax) = ABORTED)) $\Rightarrow$ مرئي
- **القاعدة 7:** إذا كان Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = IN_PROGRESS $\wedge$ t_xmax = current_txid $\Rightarrow$ غير مرئي
- **القاعدة 8:** إذا كان Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = IN_PROGRESS $\wedge$ t_xmax $\ne$ current_txid $\Rightarrow$ مرئي
- **القاعدة 9:** إذا كان Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = COMMITTED $\wedge$ Snapshot(t_xmax) = active $\Rightarrow$ مرئي
- **القاعدة 10:** إذا كان Status(t_xmin) = COMMITTED $\wedge$ Status(t_xmax) = COMMITTED $\wedge$ Snapshot(t_xmax) $\ne$ active $\Rightarrow$ غير مرئي

وخلاصة القول، يكون الصف ذو t_xmin بحالة COMMITTED *مرئياً* عموماً. غير أنه يكون *غير مرئي* فقط إذا كانت المعاملة المُدرِجة ما زالت قيد التنفيذ (القاعدة 5)، أو إذا كان الصف قد حُذف أو حُدِّث منطقياً (القاعدتان 7 و10).

# 5.7. فحص الظهور

يصف هذا القسم عملية فحص الظهور في PostgreSQL. وتختار هذه العملية صفوف الكومة ذات الإصدارات المناسبة لمعاملة معيّنة. كما يشرح هذا القسم كيف يمنع PostgreSQL الشذوذات المعرّفة في معيار ANSI SQL-92: القراءات القذرة (Dirty Reads)، والقراءات غير القابلة للتكرار (Non-Repeatable Reads)، والقراءات الشبحية (Phantom Reads).

محتويات القسم

- 5.7.1. فحص الظهور
- 5.7.2. بتّات التلميح
- 5.7.3. القراءات الشبحية في مستوى REPEATABLE READ في PostgreSQL

## 5.7.1. فحص الظهور

يوضّح الشكل 5.10 سيناريو لفحص الظهور.

![](/images/postgres-internals/pgsql05-fig-5-10.webp)

#### الشكل 5.10. سيناريو لوصف فحص الظهور.

في السيناريو الموضّح في الشكل 5.10، تُنفَّذ أوامر SQL بالتسلسل التالي:

- **T1:** بدء المعاملة (المعرّف 200)
- **T2:** بدء المعاملة (المعرّف 201)
- **T3:** تنفيذ أوامر SELECT للمعرّفين 200 و201
- **T4:** تنفيذ أمر UPDATE للمعرّف 200
- **T5:** تنفيذ أوامر SELECT للمعرّفين 200 و201
- **T6:** إيداع المعاملة 200
- **T7:** تنفيذ أمر SELECT للمعرّف 201

لتبسيط الوصف، يفترض هذا السيناريو معاملتين فقط: المعرّفان 200 و201. ومستوى العزل للمعرّف 200 هو READ COMMITTED. ومستوى العزل للمعرّف 201 إما READ COMMITTED وإما REPEATABLE READ.

فيما يلي وصف لكيفية إجراء أوامر SELECT فحص الظهور لكل صف.

**أوامر SELECT في T3:**

عند T3، لا يوجد في الجدول ’tbl’ سوى Tuple_1. وهو *مرئي* وفق **القاعدة 6**. لذلك تُعيد أوامر SELECT في المعاملتين معاً القيمة ‘Jekyll’.

- Rule6(Tuple_1) $\Rightarrow$ Status(t_xmin:199) = COMMITTED $\wedge$ t_xmax = INVALID $\Rightarrow$ مرئي

```
testdb=# -- txid 200
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

```
testdb=# -- txid 201
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

**أوامر SELECT في T5:**

أولاً، لننظر في أمر SELECT الذي تنفّذه المعاملة 200. يكون Tuple_1 *غير مرئي* وفق **القاعدة 7**، ويكون Tuple_2 *مرئياً* وفق **القاعدة 2**. وبالتالي يُعيد أمر SELECT هذا القيمة ‘Hyde’.

- Rule7(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = IN_PROGRESS $\wedge$ t_xmax:200 = current_txid:200 $\Rightarrow$ غير مرئي
- Rule2(Tuple_2): Status(t_xmin:200) = IN_PROGRESS $\wedge$ t_xmin:200 = current_txid:200 $\wedge$ t_xmax = INVALID $\Rightarrow$ مرئي

```
testdb=# -- txid 200
testdb=# SELECT * FROM tbl;
 name
------
 Hyde
(1 row)
```

وفي المقابل، في أمر SELECT الذي تنفّذه المعاملة 201، يكون Tuple_1 *مرئياً* وفق **القاعدة 8**، ويكون Tuple_2 *غير مرئي* وفق **القاعدة 4**. لذلك يُعيد أمر SELECT هذا القيمة ‘Jekyll’.

- Rule8(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = IN_PROGRESS $\wedge$ t_xmax:200 $\ne$ current_txid:201 $\Rightarrow$ مرئي
- Rule4(Tuple_2): Status(t_xmin:200) = IN_PROGRESS $\wedge$ t_xmin:200 $\ne$ current_txid:201 $\Rightarrow$ غير مرئي

```
testdb=# -- txid 201
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

** قراءة قذرة

**القراءة القذرة (Dirty Read)** (أو **تعارض الكتابة-القراءة (wr-conflict)**) هي ظهور التحديثات غير المودَعة لمعاملات أخرى. ولا تحدث مثل هذه القراءات عند أي مستوى عزل في PostgreSQL.

**أمر SELECT في T7:**

فيما يلي وصف سلوك أوامر SELECT عند T7 لكلا مستويي العزل.

عندما تستخدم المعاملة 201 مستوى READ COMMITTED، تكون لقطة المعاملة ‘201:201:’. وفي هذه الحالة تُعامَل المعاملة 200 على أنها COMMITTED. لذلك يكون Tuple_1 *غير مرئي* وفق **القاعدة 10**، ويكون Tuple_2 *مرئياً* وفق **القاعدة 6**. ويُعيد أمر SELECT القيمة ‘Hyde’.

- Rule10(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = COMMITTED $\wedge$ Snapshot(t_xmax:200) $\ne$ active $\Rightarrow$ غير مرئي
- Rule6(Tuple_2): Status(t_xmin:200) = COMMITTED $\wedge$ t_xmax = INVALID $\Rightarrow$ مرئي

```
testdb=# -- txid 201 (READ COMMITTED)
testdb=# SELECT * FROM tbl;
 name
------
 Hyde
(1 row)
```

لاحظ أن نتائج أوامر SELECT تختلف تبعاً لما إذا كانت المعاملة 200 قد أُودِعت أم لا. وتُعرف هذه الظاهرة بـ**القراءة غير القابلة للتكرار (Non-Repeatable Read)**.

وفي المقابل، عندما تستخدم المعاملة 201 مستوى REPEATABLE READ، تكون لقطة المعاملة ‘200:200:’. وبالتالي تُعامَل المعاملة 200 على أنها IN_PROGRESS. لذلك يكون Tuple_1 *مرئياً* وفق **القاعدة 9**، ويكون Tuple_2 *غير مرئي* وفق **القاعدة 5**. ويُعيد أمر SELECT القيمة ‘Jekyll’.

لا تحدث القراءات غير القابلة للتكرار في مستويي العزل REPEATABLE READ (أو SERIALIZABLE).

- Rule9(Tuple_1): Status(t_xmin:199) = COMMITTED $\wedge$ Status(t_xmax:200) = COMMITTED $\wedge$ Snapshot(t_xmax:200) = active $\Rightarrow$ مرئي
- Rule5(Tuple_2): Status(t_xmin:200) = COMMITTED $\wedge$ Snapshot(t_xmin:200) = active $\Rightarrow$ غير مرئي

```
testdb=# -- txid 201 (REPEATABLE READ)
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
```

## 5.7.2. بتّات التلميح (Hint Bits)

يوفّر PostgreSQL ثلاث دوال داخلية للحصول على حالة المعاملة: TransactionIdIsInProgress() وTransactionIdDidCommit() وTransactionIdDidAbort(). وتستخدم هذه الدوال ذاكرات تخزين مؤقت (caches) لتقليل الوصول المتكرّر إلى سجل الالتزام. غير أن تنفيذها عند فحص كل صف سيُنشئ اختناقات.

ولمعالجة هذه المشكلة، يستخدم PostgreSQL بتّات التلميح (hint bits)، المعرّفة كما يلي:

```
#define HEAP_XMIN_COMMITTED       0x0100   /* t_xmin committed */
#define HEAP_XMIN_INVALID         0x0200   /* t_xmin invalid/aborted */
#define HEAP_XMAX_COMMITTED       0x0400   /* t_xmax committed */
#define HEAP_XMAX_INVALID         0x0800   /* t_xmax invalid/aborted */
```

يضبط PostgreSQL بتّات التلميح في t_infomask الخاص بالصف أثناء عمليات القراءة أو الكتابة متى أمكن ذلك.

فمثلاً، إذا فحص PostgreSQL حالة t_xmin ووجدها COMMITTED، فإنه يضبط بتّة التلميح HEAP_XMIN_COMMITTED في t_infomask الخاص بذلك الصف.

وبمجرد ضبط بتّات التلميح، لا يعود PostgreSQL بحاجة إلى استدعاء TransactionIdDidCommit() أو TransactionIdDidAbort(). وتتيح هذه الآلية للنظام فحص حالتي t_xmin وt_xmax لكل صف بكفاءة.

## 5.7.3. القراءات الشبحية في مستوى REPEATABLE READ في PostgreSQL

يعرّف معيار ANSI SQL-92 مستوى REPEATABLE READ بأنه مستوى عزل يسمح بالقراءات الشبحية (Phantom Reads). غير أن تطبيق PostgreSQL يمنعها. ومن حيث المبدأ، لا يسمح عزل اللقطة (Snapshot Isolation, SI) بالقراءات الشبحية.

لنفترض أن معاملتين، Tx_A وTx_B، تعملان بالتزامن. مستوى العزل لديهما هو READ COMMITTED وREPEATABLE READ، ومعرّفا المعاملة هما 100 و101 على الترتيب. أولاً، تُدرج Tx_A صفاً وتُودِع. ويكون t_xmin للصف المُدرج هو 100.

بعد ذلك، تنفّذ Tx_B أمر SELECT. ويكون الصف الذي أدرجته Tx_A *غير مرئي* وفق **القاعدة 5**. لذلك لا تحدث قراءات شبحية.

- Rule5(الصف الجديد): Status(t_xmin:100) = COMMITTED $\wedge$ Snapshot(t_xmin:100) = active $\Rightarrow$ غير مرئي

```sql
testdb=# -- Tx_A: txid 100
testdb=# START TRANSACTION
testdb-#  ISOLATION LEVEL READ COMMITTED;
START TRANSACTION
testdb=# SELECT txid_current();
 txid_current
--------------
          100
(1 row)

testdb=# INSERT INTO tbl(id, data)
                VALUES (1,'phantom');
INSERT 1
testdb=# COMMIT;
COMMIT
```

```
testdb=# -- Tx_B: txid 101
testdb=# START TRANSACTION
testdb-#  ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION
testdb=# SELECT txid_current();
 txid_current
--------------
          101
(1 row)

testdb=# SELECT * FROM tbl WHERE id=1;
 id | data
----+------
(0 rows)
```

# 5.8. منع التحديثات المفقودة

**التحديث المفقود (Lost Update)**، المعروف أيضاً بـ**تعارض الكتابة-الكتابة (ww-conflict)**، شذوذ يحدث عندما تحدّث معاملات متزامنة الصفوف نفسها. ويجب على PostgreSQL منع هذا الشذوذ في مستويي REPEATABLE READ وSERIALIZABLE. (لاحظ أن مستوى READ COMMITTED لا يحتاج إلى منع التحديثات المفقودة.) ويصف هذا القسم كيف يمنع PostgreSQL التحديثات المفقودة، ويقدّم أمثلة على ذلك.

محتويات القسم

- 5.8.1. سلوك أوامر UPDATE المتزامنة
- 5.8.2. أمثلة

## 5.8.1. سلوك أوامر UPDATE المتزامنة

عند تنفيذ أمر UPDATE، تُستدعى الدالة ExecUpdate داخلياً. وفيما يلي شبه الكود (pseudocode) الخاص بـ ExecUpdate:

#### شبه الكود: ExecUpdate

```
(1)   FOR each row that will be updated by this UPDATE command
(2)        WHILE true

                /*
                 * The First Block
                 */
(3)             IF the target row is 'being updated' THEN
(4)	             WAIT for the termination of the transaction that updated the target row

(5)                  IF (the status of the terminated transaction is COMMITTED)
   	               AND (the isolation level of this transaction is REPEATABLE READ or SERIALIZABLE) THEN
(6)	                  ABORT this transaction  /* First-Updater-Win */
                     ELSE
(7)                       GOTO step (2)
                     END IF

                /*
                 * The Second Block
                 */
(8)             ELSE IF the target row has been updated by another concurrent transaction THEN
(9)                  IF (the isolation level of this transaction is READ COMMITTED THEN
(10)                      UPDATE the target row
                     ELSE
(11)                      ABORT this transaction  /* First-Updater-Win */
                     END IF

                /*
                 * The Third Block
                 */
                ELSE  /* The target row is not yet modified               */
                      /* or has been updated by a terminated transaction. */
(12)                  UPDATE the target row
                END IF
           END WHILE
      END FOR
```

** شبه الكود: ExecUpdate (1) احصل على كل صف سيُحدَّث بهذا الأمر UPDATE. (2) كرّر العملية التالية حتى يُحدَّث الصف الهدف (أو تتراجع هذه المعاملة). (3) إذا كان الصف الهدف قيد التحديث، فانتقل إلى الخطوة (4)؛ وإلا فانتقل إلى الخطوة (8). (4) انتظر انتهاء المعاملة التي حدّثت الصف الهدف، لأن PostgreSQL يستخدم مخطط أول مُحدِّث يفوز (first-updater-win) في SI. (5) إذا كانت حالة المعاملة التي حدّثت الصف الهدف هي COMMITTED وكان مستوى عزل هذه المعاملة هو REPEATABLE READ (أو SERIALIZABLE)، فانتقل إلى الخطوة (6)؛ وإلا فانتقل إلى الخطوة (7). (6) أجهِض هذه المعاملة لمنع التحديثات المفقودة. (7) انتقل إلى الخطوة (2) وحاول تحديث الصف الهدف في الجولة التالية. (8) إذا حدّثت معاملة متزامنة أخرى الصف الهدف، فانتقل إلى الخطوة (9)؛ وإلا فانتقل إلى الخطوة (12). (9) إذا كان مستوى عزل هذه المعاملة هو READ COMMITTED، فانتقل إلى الخطوة (10)؛ وإلا فانتقل إلى الخطوة (11). (10) حدِّث الصف الهدف، وانتقل إلى الخطوة (1). (11) أجهِض هذه المعاملة لمنع التحديثات المفقودة. (12) حدِّث الصف الهدف، وانتقل إلى الخطوة (1)، لأن الصف الهدف لم يُعدَّل بعد أو حُدِّث بواسطة معاملة منتهية (أي لا يوجد تعارض كتابة-كتابة). وتستخدم الدالة حلقة while لتحديث كل صف. وينقسم داخل الحلقة إلى ثلاث كتل بناءً على الشروط الموضّحة في الشكل 5.11.

![](/images/postgres-internals/pgsql05-fig-5-11.webp)

#### الشكل 5.11. الكتل الداخلية الثلاث في ExecUpdate.

- [1] الصف الهدف قيد التحديث (الشكل 5.11[1]): تعني عبارة «قيد التحديث» أن معاملة متزامنة أخرى تحدّث الصف. وفي هذه الحالة، تنتظر المعاملة الحالية انتهاء المعاملة الأخرى لأن عزل اللقطة في PostgreSQL يستخدم مخطط **أول مُحدِّث يفوز (first-updater-win)**. فمثلاً، إذا استهدفت المعاملتان المتزامنتان Tx_A وTx_B الصف نفسه، تنتظر Tx_B انتهاء Tx_A إذا كانت الأخيرة قد حدّثته بالفعل وما زالت قيد التنفيذ. وبعد أن تُودِع Tx_A، تمضي Tx_B قدماً. وتحدّث Tx_B الصف إذا كان مستوى عزلها READ COMMITTED؛ وإلا (REPEATABLE READ أو SERIALIZABLE) فإنها تجهض فوراً لمنع التحديثات المفقودة.
- [2] حُدِّث الصف الهدف بواسطة معاملة متزامنة (الشكل 5.11[2]): تحاول المعاملة الحالية تحديث الصف الهدف؛ غير أن معاملة متزامنة أخرى حدّثته وأودعته بالفعل. وفي هذه الحالة، إذا كان مستوى عزل المعاملة الحالية READ COMMITTED، فإنها تحدّث الصف الهدف؛ وإلا فإن المعاملة الحالية تجهض فوراً لمنع التحديثات المفقودة.
- [3] لا يوجد تعارض (الشكل 5.11[3]): عندما لا يوجد تعارض، يمكن للمعاملة الحالية تحديث الصف الهدف.

## 5.8.2. أمثلة

تُعرض فيما يلي ثلاثة أمثلة. يوضّح المثالان الأول والثاني السلوك عندما يكون الصف الهدف قيد التحديث. ويوضّح المثال الثالث السلوك بعد تحديث الصف الهدف.

### 5.8.2.1. المثال 1

تحدّث المعاملتان Tx_A وTx_B الصف نفسه في الجدول نفسه. وكلتاهما تستخدم مستوى العزل READ COMMITTED.

```sql
testdb=# -- Tx_A
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Hyde';
UPDATE 1

testdb=# COMMIT;
COMMIT
```

```sql
testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Utterson';

(this transaction is being blocked)

UPDATE 1
```

تعمل Tx_B كما يلي:

1. تنتظر Tx_B انتهاء Tx_A بعد تنفيذ أمر UPDATE، لأن Tx_A تحدّث الصف الهدف حالياً (الخطوة (4) من ExecUpdate).
2. تحاول Tx_B تحديث الصف الهدف بعد أن تُودِع Tx_A (الخطوة (7) من ExecUpdate).
3. تحدّث Tx_B الصف الهدف مرة أخرى خلال الجولة الثانية من ExecUpdate (الخطوات (2) و(8) و(9) و(10) من ExecUpdate).

### 5.8.2.2. المثال 2

تحدّث Tx_A وTx_B الصف نفسه. وتستخدم Tx_A المستوى READ COMMITTED، وتستخدم Tx_B المستوى REPEATABLE READ.

```sql
testdb=# -- Tx_A
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Hyde';
UPDATE 1

testdb=# COMMIT;
COMMIT
```

```
testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Utterson';

(this transaction is being blocked)

ERROR:couldn't serialize access due to concurrent update
```

تتصرّف Tx_B كما يلي:

1. تنتظر Tx_B انتهاء Tx_A بعد تنفيذ أمر UPDATE (الخطوة (4) من ExecUpdate).
2. تجهض Tx_B لحلّ التعارض بعد أن تُودِع Tx_A. ويحدث ذلك لأن الصف الهدف حُدِّث ولأن Tx_B تستخدم مستوى العزل REPEATABLE READ (الخطوتان (5) و(6) من ExecUpdate).

### 5.8.2.3. المثال 3

تحاول Tx_B (بمستوى REPEATABLE READ) تحديث صف هدف سبق أن حدّثته Tx_A المودَعة. وتجهض Tx_B في هذه الحالة (الخطوات (2) و(8) و(9) و(11) من ExecUpdate).

```sql
testdb=# -- Tx_A
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL READ COMMITTED;
START TRANSACTION

testdb=# UPDATE tbl SET name = 'Hyde';
UPDATE 1

testdb=# COMMIT;
COMMIT
```

```
testdb=#
testdb=#
testdb=# -- Tx_B
testdb=# START TRANSACTION
testdb-#    ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION
testdb=# SELECT * FROM tbl;
  name
--------
 Jekyll
(1 row)
testdb=# UPDATE tbl SET name = 'Utterson';
ERROR:couldn't serialize access due to concurrent update
```

# 5.9. عزل اللقطة القابل للتسلسل (Serializable Snapshot Isolation)

يتضمّن PostgreSQL **عزل اللقطة القابل للتسلسل (Serializable Snapshot Isolation, SSI)** منذ الإصدار 9.1 (عام 2011) لتحقيق مستوى عزل SERIALIZABLE حقيقي.

ولأن شرح SSI معقّد، يقدّم هذا القسم مخططاً عاماً فقط. ولمزيد من التفاصيل، راجع الورقة الأصلية: «[Serializable Snapshot Isolation in PostgreSQL](https://arxiv.org/abs/1208.4179)».

في ما يلي، تُستخدم عدة مصطلحات تقنية دون تعريف. يُرجى الرجوع إلى المراجع الخاصة بهذه المصطلحات:

- رسم الأسبقية (precedence graph) (يُعرف أيضاً بالرسم البياني للتبعية ورسم التسلسل)
- شذوذات التسلسل (serialization anomalies) (مثل انحراف الكتابة (Write-Skew))

** مراجع

1. Abraham Silberschatz, Henry F. Korth, and S. Sudarshan, “[Database System Concepts](https://www.amazon.com/dp/0073523321)”, McGraw-Hill Education, ISBN-13: 978-0073523323
2. Thomas M. Connolly, and Carolyn E. Begg, “[Database Systems](https://www.amazon.com/dp/0321523067)”, Pearson, ISBN-13: 978-0321523068

محتويات القسم

- 5.9.1. الاستراتيجية الأساسية لتنفيذ SSI
- 5.9.2. تنفيذ SSI في PostgreSQL
- 5.9.3. كيف يعمل SSI
- 5.9.4. شذوذات التسلسل الإيجابية الكاذبة

## 5.9.1. الاستراتيجية الأساسية لتنفيذ SSI

يحدث شذوذ التسلسل إذا وُجدت حلقة في الرسم البياني للأسبقية. ويوضّح أبسط الشذوذات، وهو انحراف الكتابة (write-skew)، ذلك.

يوضّح الشكل 5.12(1) جدولاً زمنياً. هنا، تقرأ Transaction_A الصف Tuple_B وتقرأ Transaction_B الصف Tuple_A. ثم تكتب Transaction_A الصف Tuple_A وتكتب Transaction_B الصف Tuple_B. في هذه الحالة يوجد تعارضا قراءة-كتابة (rw-conflicts). وتشكّل هذه التعارضات حلقة في الرسم البياني للأسبقية لهذا الجدول الزمني، كما هو موضّح في الشكل 5.12(2). وبذلك يحتوي هذا الجدول الزمني على شذوذ تسلسل هو انحراف الكتابة (Write-Skew).

![](/images/postgres-internals/pgsql05-fig-5-12.webp)

#### الشكل 5.12. الجدول الزمني لانحراف الكتابة ورسمه البياني للأسبقية.

من الناحية المفاهيمية، توجد ثلاثة أنواع من التعارضات: تعارضات الكتابة-القراءة (wr-conflicts) (القراءات القذرة)، وتعارضات الكتابة-الكتابة (ww-conflicts) (التحديثات المفقودة)، وتعارضات القراءة-الكتابة (rw-conflicts). غير أن PostgreSQL يتجاهل تعارضات wr وww لأنه يمنعها كما هو موضّح في الأقسام السابقة. لذلك لا يأخذ تنفيذ SSI في PostgreSQL في الحسبان سوى تعارضات rw.

يعتمد PostgreSQL الاستراتيجية التالية لتنفيذ SSI:

1. تسجيل جميع الكائنات (الصفوف والصفحات والعلاقات) التي تصل إليها المعاملات على هيئة أقفال SIREAD.
2. كشف تعارضات rw باستخدام أقفال SIREAD كلما كُتب صف كومة أو صف فهرس.
3. إجهاض المعاملة إذا اكتُشف شذوذ تسلسل عند فحص تعارضات rw المكتشفة.

## 5.9.2. تنفيذ SSI في PostgreSQL

لتحقيق الاستراتيجية الموضّحة أعلاه، ينفّذ PostgreSQL دوال وبنى بيانات متنوعة. ويركّز هذا القسم على بنيتي بيانات رئيسيتين لوصف آلية SSI: **أقفال SIREAD** و**تعارضات rw**. وتُخزَّن هاتان البنيتان في الذاكرة المشتركة.

** ملاحظة

للتبسيط، يُغفل هذا التوثيق بعض بنى البيانات المهمة، مثل SERIALIZABLEXACT. وبناءً على ذلك، فإن شروح الدوال — وتحديداً CheckForSerializableConflictOut() وCheckForSerializableConflictIn() وPreCommit_CheckForSerializationFailure() — مبسّطة إلى حد كبير هي الأخرى.

فمثلاً، يبيّن هذا القسم الدوال التي تكتشف التعارضات لكنه لا يشرح تفاصيل الكشف. راجع الشيفرة المصدرية للحصول على معلومات مفصّلة: [src/backend/storage/lmgr/predicate.c](https://github.com/postgres/postgres/blob/master/src/backend/storage/lmgr/predicate.c).

### 5.9.2.1. أقفال SIREAD

قفل SIREAD، ويُسمى داخلياً قفل محمول (predicate lock)، زوج يتكوّن من كائن ومعرّفات معاملات (افتراضية). ويخزّن معلومات عن المعاملات التي وصلت إلى الكائنات.

لاحظ أن هذا الوصف يُغفل معرّفات المعاملات الافتراضية. ويُستخدم مصطلح txid بدلاً من معرّف المعاملة الافتراضي لتبسيط الشرح التالي.

تُنشئ الدالة CheckForSerializableConflictOut() أقفال SIREAD كلما نُفّذ أمر DML في النمط SERIALIZABLE. فمثلاً، إذا قرأ المعرّف 100 الصف Tuple_1 في جدول، يُنشأ قفل SIREAD بالشكل {Tuple_1, {100}}. وإذا قرأ المعرّف 101 الصف Tuple_1 أيضاً، يُحدَّث قفل SIREAD إلى {Tuple_1, {100, 101}}.

يُنشأ قفل SIREAD أيضاً عند قراءة صفحة فهرس. ويحدث ذلك أثناء [المسح الفهرس فقط (Index-Only Scans)](https://www.postgresql.org/docs/current/static/indexes-index-only-scans.html) (الموضّح في القسم 7.2)، حيث يُقرأ الفهرس دون الوصول إلى صفحة الجدول.

#### مستويات الأقفال وتجميعها:

لأقفال SIREAD ثلاثة مستويات: **الصف** و**الصفحة** و**العلاقة**.

يجمع PostgreSQL أقفال SIREAD لتقليل المساحة في الذاكرة. فإذا أُنشئت أقفال SIREAD لجميع الصفوف داخل صفحة واحدة، دُمجت في قفل SIREAD واحد على مستوى الصفحة، وحُرّرت الأقفال الفردية على مستوى الصف (راجع الشكل 5.13). وينطبق المنطق نفسه عندما تُقرأ جميع صفحات علاقة ما.

![تقرأ المعاملة Tx الصفّين tuple_1 وtuple_2 في الصفحة Page_1، فتنشئ قفلَي SIREAD على مستوى الصف. وعندما تقرأ Tx بعد ذلك الصف tuple_3، مكملةً مسح الصفحة Page_1، يستبدل PostgreSQL القفلين الفرديين على مستوى الصف بقفل SIREAD واحد على مستوى الصفحة.](/images/postgres-internals/pgsql05-fig-5-13.webp)

#### الشكل 5.13. مثال على تجميع أقفال SIREAD.

تقرأ المعاملة Tx الصفين tuple_1 وtuple_2 في Page_1، فيُنشأ قفلان من أقفال SIREAD على مستوى الصف. وعندما تقرأ Tx بعد ذلك الصف tuple_3، مكملةً مسح Page_1، يستبدل PostgreSQL الأقفال الفردية على مستوى الصف بقفل SIREAD واحد على مستوى الصفحة.

عند استخدام مسح تسلسلي (sequential scan)، يُنشئ PostgreSQL قفل SIREAD على مستوى العلاقة منذ البداية، بصرف النظر عن الفهارس أو شروط WHERE. وفي بعض الحالات، قد يتسبّب هذا التنفيذ في كشف إيجابي كاذب لشذوذات التسلسل. وتُقدَّم التفاصيل في القسم 5.9.4.

### 5.9.2.2. تعارضات rw

تعارض rw ثلاثية تتكوّن من قفل SIREAD ومعرّفي معاملتين: إحداهما تقرأ والأخرى تكتب الكائن المرتبط بقفل SIREAD.

تُستدعى الدالة CheckForSerializableConflictIn() كلما نُفّذ أمر INSERT أو UPDATE أو DELETE في النمط SERIALIZABLE. وتنشئ هذه الدالة تعارضات rw عندما تكتشف تعارضاً بفحص أقفال SIREAD الموجودة.

فمثلاً، يقرأ المعرّف 100 الصف Tuple_1، ثم يحدّث المعرّف 101 الصف Tuple_1. في هذه الحالة، تكتشف CheckForSerializableConflictIn()، التي يستدعيها أمر UPDATE في المعرّف 101، تعارض rw على Tuple_1 بين المعرّفين 100 و101. فتنشئ تعارض rw بالشكل {r=100, w=101, {Tuple_1}}.

### 5.9.2.3. كشف التعارضات وأول مُودِع يفوز

تفحص كلٌّ من الدالتين CheckForSerializableConflictOut() وCheckForSerializableConflictIn()، وكذلك الدالة PreCommit_CheckForSerializationFailure() التي تُستدعى عند تنفيذ أمر COMMIT في النمط SERIALIZABLE، شذوذات التسلسل باستخدام تعارضات rw المُنشأة. وإذا اكتشفت شذوذات، فلا تُودِع سوى المعاملة الأولى التي أودعت، وتُجهَض المعاملات الأخرى وفق مخطط **أول مُودِع يفوز (first-committer-win)**.

## 5.9.3. كيف يعمل SSI

يصف هذا القسم كيف يحلّ SSI شذوذات انحراف الكتابة باستخدام الجدول البسيط tbl الموضّح فيما يلي:

```
testdb=# CREATE TABLE tbl (id INT primary key, flag bool DEFAULT false);
testdb=# INSERT INTO tbl (id) SELECT generate_series(1,2000);
testdb=# ANALYZE tbl;
```

تنفّذ المعاملتان Tx_A وTx_B الأوامر الموضّحة في الشكل 5.14.

![](/images/postgres-internals/pgsql05-fig-5-14.webp)

#### الشكل 5.14. سيناريو انحراف الكتابة.

افترض أن جميع الأوامر تستخدم مسحاً فهارسياً (index scan). وعند تنفيذها، تقرأ هذه الأوامر كلاً من صفوف الكومة وصفحات الفهرس. وتضمّ كل صفحة فهرس صف الفهرس الذي يشير إلى صف الكومة المقابل (الشكل 5.15).

![](/images/postgres-internals/pgsql05-fig-5-15.webp)

#### الشكل 5.15. العلاقة بين الفهرس والجدول في السيناريو الموضّح في الشكل 5.14.

- **T1:** تنفّذ Tx_A أمر SELECT. ويقرأ هذا الأمر صف كومة (Tuple_2000) وصفحة واحدة من المفتاح الأساسي (Pkey_2).
- **T2:** تنفّذ Tx_B أمر SELECT. ويقرأ هذا الأمر صف كومة (Tuple_1) وصفحة واحدة من المفتاح الأساسي (Pkey_1).
- **T3:** تنفّذ Tx_A أمر UPDATE لتحديث Tuple_1.
- **T4:** تنفّذ Tx_B أمر UPDATE لتحديث Tuple_2000.
- **T5:** تُودِع Tx_A.
- **T6:** تحاول Tx_B الإيداع؛ غير أنها تجهض بسبب شذوذ انحراف الكتابة.

يوضّح الشكل 5.16 كيف يكتشف PostgreSQL شذوذ انحراف الكتابة ويحلّه في هذا السيناريو.

![](/images/postgres-internals/pgsql05-fig-5-16.webp)

#### الشكل 5.16. أقفال SIREAD وتعارضات rw، والجدول الزمني للسيناريو الموضّح في الشكل 5.14.

- **T1:** أثناء تنفيذ أمر SELECT الخاص بـ Tx_A، تُنشئ CheckForSerializableConflictOut() أقفال SIREAD. في هذا السيناريو، تُنشئ الدالة قفلَي SIREAD، هما L1 وL2، مرتبطين بـ Pkey_2 وTuple_2000 على الترتيب.
- **T2:** أثناء تنفيذ أمر SELECT الخاص بـ Tx_B، تُنشئ CheckForSerializableConflictOut() قفلَي SIREAD، هما L3 وL4، مرتبطين بـ Pkey_1 وTuple_1 على الترتيب.
- **T3:** عندما تنفّذ Tx_A أمر UPDATE الخاص بها، يستدعي النظام كلاً من CheckForSerializableConflictOut() وCheckForSerializableConflictIn() قبل ExecUpdate وبعده. في هذا السيناريو، لا تفعل CheckForSerializableConflictOut() شيئاً. وتنشئ CheckForSerializableConflictIn() تعارض rw، هو C1، يشمل كلاً من Pkey_1 وTuple_1 بين Tx_B وTx_A. ويحدث ذلك لأن كلاً من Pkey_1 وTuple_1 قرأتهما Tx_B ثم كتبتهما Tx_A لاحقاً.
- **T4:** عندما تنفّذ Tx_B أمر UPDATE الخاص بها، تُنشئ CheckForSerializableConflictIn() تعارض rw، هو C2، يشمل كلاً من Pkey_2 وTuple_2000 بين Tx_A وTx_B. في هذا السيناريو، يشكّل C1 وC2 حلقة في الرسم البياني للأسبقية، ما يضع Tx_A وTx_B في حالة غير قابلة للتسلسل. غير أنه لأن أيّاً من المعاملتين لم تُودِع بعد، فإن CheckForSerializableConflictIn() لا تجهض Tx_B. ويحدث هذا السلوك لأن تنفيذ SSI في PostgreSQL يقوم على مخطط **أول مُودِع يفوز**.
- **T5:** عندما تحاول Tx_A الإيداع، تُستدعى PreCommit_CheckForSerializationFailure(). وتكتشف هذه الدالة شذوذات التسلسل وتنفّذ عملية إيداع إن أمكن. في هذا السيناريو، تُودِع Tx_A لأن Tx_B ما زالت قيد التنفيذ.
- **T6:** عندما تحاول Tx_B الإيداع، تكتشف PreCommit_CheckForSerializationFailure() شذوذ تسلسل. ولأن Tx_A أودعت بالفعل، تجهض Tx_B.

### 5.9.3.1. سيناريوهات أخرى

إذا نفّذت Tx_B أمر UPDATE بعد أن أودعت Tx_A (بعد **T5**)، تجهض Tx_B فوراً. ويحدث ذلك لأن CheckForSerializableConflictIn()، التي يستدعيها أمر UPDATE الخاص بـ Tx_B، تكتشف شذوذ تسلسل (الشكل 5.17(1)).

وإذا نفّذت Tx_B أمر SELECT بدلاً من COMMIT عند **T6**، تجهض Tx_B فوراً. ويحدث ذلك لأن CheckForSerializableConflictOut()، التي يستدعيها أمر SELECT الخاص بـ Tx_B، تكتشف شذوذ تسلسل (الشكل 5.17(2)).

![](/images/postgres-internals/pgsql05-fig-5-17.webp)

#### الشكل 5.17. سيناريوهات أخرى لانحراف الكتابة.

** معلومات

يفصّل [هذا الدليل (Wiki)](https://wiki.postgresql.org/wiki/SSI) عدة شذوذات أكثر تعقيداً.

## 5.9.4. شذوذات التسلسل الإيجابية الكاذبة

في النمط SERIALIZABLE، يضمن PostgreSQL دائماً وبالكامل قابلية تسلسل المعاملات المتزامنة لأن شذوذات التسلسل السلبية الكاذبة لا تحدث أبداً.

غير أن PostgreSQL قد يكتشف شذوذات إيجابية كاذبة في بعض الظروف. وينبغي للمستخدمين أخذ هذا السلوك في الحسبان عند استخدام النمط SERIALIZABLE.

فيما يلي وصف للحالات التي يكتشف فيها PostgreSQL شذوذات إيجابية كاذبة.

### 5.9.4.1. السيناريو الإيجابي الكاذب 1.

يوضّح الشكل 5.18 سيناريو يحدث فيه شذوذ تسلسل إيجابي كاذب.

![](/images/postgres-internals/pgsql05-fig-5-18.webp)

#### الشكل 5.18. سيناريو يحدث فيه شذوذ تسلسل إيجابي كاذب.

كما ذُكر في شرح أقفال SIREAD، يُنشئ PostgreSQL قفل SIREAD على مستوى العلاقة عند استخدام مسح تسلسلي.

يوضّح الشكل 5.19(1) أقفال SIREAD وتعارضات rw أثناء مسح تسلسلي.

في هذه الحالة، يرتبط تعارضا rw، وهما C1 وC2، بقفل SIREAD على مستوى العلاقة الخاص بالجدول ’tbl’. وتُنشئ هذه التعارضات حلقة في الرسم البياني للأسبقية.

وبالتالي يكتشف PostgreSQL شذوذ انحراف كتابة إيجابي كاذب ويجهض إما Tx_A وإما Tx_B رغم عدم وجود تعارض فعلي.

![](/images/postgres-internals/pgsql05-fig-5-19.webp)

#### الشكل 5.19. شذوذ إيجابي كاذب (1) - استخدام مسح تسلسلي.

### 5.9.4.2. السيناريو الإيجابي الكاذب 2.

يكتشف PostgreSQL أيضاً شذوذاً إيجابياً كاذباً أثناء مسح فهرس إذا حصلت المعاملتان Tx_A وTx_B معاً على قفل SIREAD نفسه الخاص بصفحة الفهرس. ويوضّح الشكل 5.20 هذه الحالة.

![](/images/postgres-internals/pgsql05-fig-5-20.webp)

#### الشكل 5.20. شذوذ إيجابي كاذب (2) - مسح فهرس يستخدم صفحة الفهرس نفسها.

افترض أن صفحة الفهرس Pkey_1 تضمّ عنصري فهرس: أحدهما يشير إلى Tuple_1 والآخر يشير إلى Tuple_2.

عندما تنفّذ Tx_A وTx_B أمرَي SELECT وUPDATE الخاصين بكل منهما، تقرأ المعاملتان معاً Pkey_1 وتكتبانه.

في هذه الحالة، يُنشئ تعارضا rw، وهما C1 وC2، وكلاهما مرتبط بـ Pkey_1، حلقة في الرسم البياني للأسبقية. وبذلك يكتشف PostgreSQL شذوذ انحراف كتابة إيجابي كاذب.

(إذا حصلت Tx_A وTx_B على قفلي SIREAD لصفحتي فهرس مختلفتين، فلا يُكتشف أي إيجابي كاذب ويمكن للمعملتين معاً أن تُودِعا.)

# 5.10. عمليات الصيانة المطلوبة

تتطلّب آلية التحكّم بالتزامن في PostgreSQL عمليات الصيانة التالية:

1. إزالة الصفوف الميتة وصفوف الفهرس التي تشير إلى الصفوف الميتة المقابلة.
2. إزالة الأجزاء غير الضرورية من سجل الالتزام.
3. تجميد (freeze) معرّفات المعاملات القديمة.
4. تحديث FSM وVM والإحصاءات.

شرح القسم 5.3.2 والقسم 5.4.3 الحاجة إلى العمليتين الأولى والثانية. وتعالج العملية الثالثة مشكلة التفاف معرّف المعاملة، التي يصفها القسم الفرعي التالي.

في PostgreSQL، تتولّى عملية VACUUM هذه المهام. ويصف [الفصل 6](/book/postgres-internals/pgsql06/index) أمر VACUUM بالتفصيل.

محتويات القسم

- 5.10.1 مشكلة التفاف المعاملة
- 5.10.2 عملية التجميد

## 5.10.1. مشكلة التفاف المعاملة

لنفترض أن معاملة بمعرّف 100 تُدرج Tuple_1؛ وبالتالي يكون t_xmin الخاص بـ Tuple_1 هو 100.

يعمل الخادم مدة طويلة جداً دون أي تعديلات على Tuple_1. وعندما يبلغ معرّف المعاملة الحالي 2.1 مليار + 100، يُنفَّذ أمر SELECT. في هذه اللحظة، يكون Tuple_1 *مرئياً* لأن المعرّف 100 يُعدّ في الماضي.

وإذا نُفّذ أمر SELECT نفسه عندما يبلغ معرّف المعاملة الحالي 2.1 مليار + 101، يصبح Tuple_1 *غير مرئي*. ويحدث ذلك لأن المعرّف 100 يُعدّ الآن في المستقبل بالنسبة إلى معرّف المعاملة الحالي (الشكل 5.21).

وهذه هي **مشكلة التفاف المعاملة (transaction wraparound problem)** في PostgreSQL.

![](/images/postgres-internals/pgsql05-fig-5-21.webp)

#### الشكل 5.21. مشكلة الالتفاف.

## 5.10.2. عملية التجميد

لحلّ هذه المشكلة، يستخدم PostgreSQL مفهوماً يُسمى *معرّف المعاملة المجمَّد* وينفّذ عملية تُسمى **FREEZE**.

يعرّف PostgreSQL معرّف المعاملة المجمَّد بأنه معرّف معاملة خاص محجوز (القيمة 2). وهذا المعرّف أقدم دائماً من جميع معرّفات المعاملات الأخرى؛ لذلك يكون معرّف المعاملة المجمَّد دائماً غير نشط و*مرئياً* لجميع المعاملات.

تستدعي عملية التفريغ عملية التجميد. وتمسح عملية التجميد ملفات الجداول وتُعيد كتابة t_xmin للصفوف إلى معرّف المعاملة المجمَّد (2) إذا كانت قيمة t_xmin أقدم من معرّف المعاملة الحالي ناقص [vacuum_freeze_min_age](https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-MIN-AGE) (القيمة الافتراضية 50 مليوناً). ويقدّم [الفصل 6](/book/postgres-internals/pgsql06/index) مزيداً من التفاصيل.

فمثلاً، في الشكل 5.22 أ)، يكون معرّف المعاملة الحالي 50,002,500 عندما يستدعي الأمر VACUUM عملية التجميد. في هذه الحالة، تُعيد العملية كتابة t_xmin لكل من Tuple_1 وTuple_2 إلى 2.

في الإصدار 9.4 (2014) وما بعده، يضبط PostgreSQL بتّة XMIN_FROZEN في الحقل t_infomask الخاص بالصف بدلاً من إعادة كتابة قيمة t_xmin (الشكل 5.22 ب).

![](/images/postgres-internals/pgsql05-fig-5-22.webp)

#### الشكل 5.22. عملية التجميد.
