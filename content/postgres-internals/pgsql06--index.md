---
title: "معالجة التفريغ (Vacuum)"
lang: ar
source: https://www.interdb.jp/pg/pgsql06/index.html
---

# 6.1. نظرة عامة على معالجة VACUUM

تنفّذ معالجة التفريغ (vacuum) المهام التالية للجداول المحدّدة أو لجميع جداول قاعدة البيانات:

1. إزالة الصفوف الميتة: إزالة الصفوف الميتة وتقليل تشظّي الصفوف الحية في كل صفحة.
2. إزالة صفوف الفهرس التي تشير إلى الصفوف الميتة.
3. تجميد معرّفات المعاملات القديمة: تجميد معرّفات المعاملات القديمة للصفوف عند الحاجة.
4. تحديث كتالوجات النظام المتعلقة بمعرّف المعاملة المجمَّد (pg_database وpg_class).
5. إزالة الأجزاء غير الضرورية من سجل الالتزام إن أمكن.
6. أعمال أخرى: تحديث FSM وVM للجداول المعالَجة.
7. تحديث عدة إحصاءات (pg_stat_all_tables، وغيرها).

يفترض هذا التوثيق الإلمام بالمصطلحات التالية: الصفوف الميتة، وتجميد معرّف المعاملة، وFSM، وسجل الالتزام.

راجع [الفصل 5](/book/postgres-internals/pgsql05/index) للتفاصيل حول هذه المفاهيم. ويُقدَّم VM في القسم 6.2.

يصف شبه الكود (pseudocode) التالي معالجة التفريغ.

#### شبه الكود: VACUUM

```
       // Phase 1: initializing

(1)    FOR each table
(2)      Acquire a ShareUpdateExclusiveLock lock for the target table

         /* The first block */

         // Phase 2: Scan Heap
(3)      Scan all pages to get all dead tuples, and freeze old tuples if necessary
         // Phase 3: Vacuuming Indexes
(4)      Remove the index tuples that point to the respective dead tuples if exists

         /* The second block */

         // Phase 4: Vacuuming Heap
(5)      FOR each page of the table
(6)         Remove the dead tuples, and Reallocate the live tuples in the page
(7)         Update FSM and VM
         END FOR

         /* The third block */

         // Phase 5: Cleaning up indexes
(8)      Clean up indexes
         // Phase 6: Truncating heap
(9)      Truncate the last page if possible
(10)     Update both the statistics and system catalogs of the target table

         Release the ShareUpdateExclusiveLock lock
      END FOR

      /* Post-processing */

      // Phase 7: Final Cleaning
(11)  Update statistics and system catalogs
(12)  Remove both unnecessary files and pages of the clog if possible
```

- (1) الحصول على كل جدول من الجداول المحدّدة.
- (2) الحصول على قفل ShareUpdateExclusiveLock للجدول. ويتيح هذا القفل قراءات متزامنة من معاملات أخرى.
- (3) مسح جميع الصفحات لجمع كل الصفوف الميتة وتجميد الصفوف القديمة عند الحاجة.
- (4) إزالة صفوف الفهرس التي تشير إلى الصفوف الميتة المقابلة إن وُجدت.
- (5) تنفيذ المهمتين (6) و(7) لكل صفحة في الجدول.
- (6) إزالة الصفوف الميتة وإعادة توزيع الصفوف الحية في الصفحة.
- (7) تحديث كلٍّ من FSM وVM للجدول الهدف.
- (8) تنظيف الفهارس باستخدام الدالة [index_vacuum_cleanup()](https://github.com/postgres/postgres/blob/306dd6e727bf7a4e76f02cb31c2e22ac3b0deca3/src/backend/access/index/indexam.c#L816).
- (9) بتر الصفحة الأخيرة إذا لم تكن تحتوي على صفوف.
- (10) تحديث الإحصاءات وكتالوجات النظام المتعلقة بمعالجة التفريغ للجدول الهدف.
- (11) تحديث الإحصاءات العامة وكتالوجات النظام المتعلقة بمعالجة التفريغ.
- (12) إزالة الملفات والصفحات غير الضرورية من سجل الالتزام إن أمكن.

يقسّم PostgreSQL عملية التفريغ إلى سبع مراحل متمايزة. وللتوضيح، يشرح هذا التوثيق العملية باستخدام 3+1 كتل مبسّطة.

يوضّح شبه الكود كيف تتوافق هذه المراحل السبع مع الكتل 3+1.

وتُوجز هذه الكتل فيما يلي.

** خيار PARALLEL

يدعم [أمر VACUUM](https://www.postgresql.org/docs/current/sql-vacuum.html) خيار PARALLEL منذ الإصدار 13. وإذا حُدِّد هذا الخيار ووُجدت فهارس متعددة، تُعالَج مرحلتا تفريغ الفهارس وتنظيف الفهارس على التوازي.

تسري هذه الميزة على أمر VACUUM فقط ولا يدعمها التفريغ التلقائي (autovacuum).

** مراحل معالجة التفريغ

يحدّد عمود phase في عرض [pg_stat_progress_vacuum](https://www.postgresql.org/docs/current/progress-reporting.html#VACUUM-PROGRESS-REPORTING) المرحلة الحالية لعملية تفريغ نشطة.

```
testdb=# SELECT datname, relid, phase FROM pg_stat_progress_vacuum;
 datname | relid |     phase
---------+-------+---------------
 testdb  | 16415 | scanning heap
(1 row)
```

## 6.1.1. الكتلة الأولى

تنفّذ هذه الكتلة عملية التجميد وتزيل صفوف الفهرس التي تشير إلى الصفوف الميتة.

يمسح PostgreSQL أولاً الجدول الهدف لبناء قائمة بالصفوف الميتة وتجميد الصفوف القديمة. وتُخزَّن القائمة في ذاكرة محلية تُسمى [maintenance_work_mem](https://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-MAINTENANCE-WORK-MEM). ويصف القسم 6.3 عملية التجميد.

وبعد المسح، يزيل PostgreSQL صفوف الفهرس بالرجوع إلى قائمة الصفوف الميتة. ويوضّح الشكل 6.1 مثالاً على إزالة صف فهرس يشير إلى صف ميت.

![](/images/postgres-internals/pgsql06-fig-6-01.webp)

#### الشكل 6.1. تفريغ الفهارس.

إذا امتلأت maintenance_work_mem قبل اكتمال المسح، ينتقل PostgreSQL إلى المهام التالية (الخطوات 4 إلى 7). ثم يعود إلى الخطوة (3) لمواصلة ما تبقّى من المسح.

## 6.1.2. الكتلة الثانية

تزيل هذه الكتلة الصفوف الميتة وتحدّث كلاً من FSM وVM صفحةً بصفحة. ويوضّح الشكل 6.2 مثالاً:

![](/images/postgres-internals/pgsql06-fig-6-02.webp)

#### الشكل 6.2. تفريغ الكومة.

افترض أن الجدول يحتوي على ثلاث صفحات. وبالتركيز على الصفحة رقم 0، توجد ثلاثة صفوف، والصف Tuple_2 ميت (الشكل 6.2(1)). ويزيل PostgreSQL الصف Tuple_2 ويعيد ترتيب الصفوف المتبقية لمعالجة التشظّي. ثم يحدّث كلاً من FSM وVM لهذه الصفحة (الشكل 6.2(2)). ويواصل PostgreSQL هذه العملية حتى الصفحة الأخيرة.

لاحظ أن مؤشرات الأسطر غير الضرورية لا تُزال؛ بل يُعاد استخدامها مستقبلاً. وذلك لأنه إذا أُزيلت مؤشرات الأسطر، وجب تحديث جميع صفوف الفهرس في الفهارس المرتبطة.

## 6.1.3. الكتلة الثالثة

تنفّذ الكتلة الثالثة التنظيف بعد حذف الفهرس وتحدّث الإحصاءات وكتالوجات النظام لكل جدول هدف.

وإذا لم تحتوِ الصفحات الأخيرة على صفوف، يبترها PostgreSQL من ملف الجدول. ويوضّح الشكل 6.3 مثالاً مبالغاً فيه قليلاً حيث لا تحتوي الصفحات 1 و3 و4 على صفوف بعد تفريغ الكومة.

![](/images/postgres-internals/pgsql06-fig-6-03.webp)

#### الشكل 6.3. بتر الصفحات.

أثناء بتر الكومة، تُزال الصفحتان 4 و3 من ملف الجدول، ما يقلّل حجمه بمقدار 16 كيلوبايت (8 كيلوبايت $\times$ صفحتان).

ومع أن الصفحة 1 لا تحتوي هي الأخرى على صفوف، فإنها لا تُزال[^1].

## 6.1.4. المعالجة اللاحقة

عند اكتمال معالجة التفريغ، يحدّث PostgreSQL جميع الإحصاءات وكتالوجات النظام. كما يزيل الأجزاء غير الضرورية من سجل الالتزام إن أمكن (القسم 6.4).

** المخزن المؤقت الحلقي

تستخدم معالجة التفريغ **مخزناً مؤقتاً حلقياً (ring buffer)**، موضّحاً في القسم 8.4.3. لذلك لا تُخزَّن الصفحات المعالَجة في المخازن المؤقتة المشتركة.

[^1]: لإزالة مثل هذه الصفحات الداخلية، استخدم الأمر REPACK (VACUUM FULL) كما هو موضّح في القسم 6.6.

# 6.2. خريطة الظهور (Visibility Map)

معالجة التفريغ مكلفة. لذلك قدّم PostgreSQL خريطة الظهور (Visibility Map, VM) في الإصدار 8.4 لتقليل هذه الكلفة.

المفهوم الأساسي لخريطة VM بسيط:

- لكل جدول خريطة ظهور خاصة تخزّن ظهور كل صفحة.
- يحدّد هذا الظهور ما إذا كانت الصفحة تحتوي على صفوف ميتة.
- تتخطّى معالجة التفريغ الصفحات الخالية من الصفوف الميتة بالرجوع إلى VM.

يوضّح الشكل 6.4 كيفية استخدام VM.

![](/images/postgres-internals/pgsql06-fig-6-04.webp)

#### الشكل 6.4. كيفية استخدام VM.

افترض أن جدولاً يتكوّن من ثلاث صفحات. فإذا كانت الصفحتان 0 و2 تحتويان على صفوف ميتة بينما لا تحتوي الصفحة 1 عليها، تسجّل VM هذه الحالة. ثم تتخطّى معالجة التفريغ الصفحة 1 بالرجوع إلى VM.

تتكوّن كل خريطة VM من صفحة واحدة أو أكثر بحجم 8 كيلوبايت، ويُخزَّن الملف بلاحقة ‘vm’. فمثلاً، يُعرض فيما يلي ملف جدول برقم relfilenode هو 18751 إلى جانب ملفي FSM (18751_fsm) وVM (18751_vm) الخاصين به.

```bash
$ cd $PGDATA
$ ls -la base/16384/18751*
-rw------- 1 postgres postgres  8192 Apr 21 10:21 base/16384/18751
-rw------- 1 postgres postgres 24576 Apr 21 10:18 base/16384/18751_fsm
-rw------- 1 postgres postgres  8192 Apr 21 10:18 base/16384/18751_vm
```

## 6.2.1. تحسين خريطة VM

حسّن PostgreSQL خريطة VM في الإصدار 9.6 لتحسين كفاءة عملية التجميد. وتتتبّع خريطة VM المحسّنة كلاً من ظهور الصفحة وما إذا كانت جميع الصفوف في الصفحة مجمَّدة (راجع القسم 6.3.3 للتفاصيل).

# 6.3. عملية التجميد

لعملية التجميد، الموضّحة في القسم 5.10.2، نمطان. وللتبسيط، يُشار إلى هذين النمطين بـ**النمط الكسول (lazy mode)** و**النمط المتلهّف (eager mode)**. وينفّذ PostgreSQL العملية بأحد النمطين حسب شروط معيّنة.

** ملاحظة

يُسمى VACUUM غالباً داخلياً «Lazy VACUUM». غير أن النمط الكسول المعرّف في هذا التوثيق هو نمط من أنماط عملية التجميد.

تعمل عملية التجميد عادةً بالنمط الكسول، أما النمط المتلهّف فيعمل عند تحقّق شروط محدّدة.

في النمط الكسول، تمسح عملية التجميد الصفحات التي تحتوي على صفوف ميتة فقط باستخدام خريطة الظهور (VM) للجدول الهدف.

وفي المقابل، يمسح النمط المتلهّف جميع الصفحات بصرف النظر عن احتوائها على صفوف ميتة. ويحدّث هذا النمط أيضاً كتالوجات النظام المتعلقة بعملية التجميد ويزيل الأجزاء غير الضرورية من سجل الالتزام إن أمكن.

يصف القسمان 6.3.1 و6.3.2 هذين النمطين على الترتيب. ويصف القسم 6.3.3 التحسينات التي أُدخلت على عملية التجميد في النمط المتلهّف.

محتويات القسم

- 6.3.1. النمط الكسول
- 6.3.2. النمط المتلهّف
- 6.3.3. تحسين عملية التجميد في النمط المتلهّف

## 6.3.1. النمط الكسول

يحسب PostgreSQL قيمة **freezeLimit_txid** في بداية عملية التجميد ويجمّد الصفوف التي تكون قيمة t_xmin فيها أقل من هذه القيمة.

وتُعرَّف freezeLimit_txid كما يلي:

$$ \begin{align*} \text{freezeLimit_txid} = (\text{OldestXmin} - \text{vacuum_freeze_min_age}) \end{align*} $$

حيث OldestXmin هو أقدم معرّف معاملة بين المعاملات الجارية حالياً.

فمثلاً، إذا كانت ثلاث معاملات (بالمعرّفات 100 و101 و102) تعمل عند تنفيذ أمر VACUUM، يكون OldestXmin هو 100. وإذا لم توجد معاملات أخرى، يكون OldestXmin هو معرّف المعاملة التي تنفّذ أمر VACUUM. و[vacuum_freeze_min_age](https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-MIN-AGE) معامل تهيئة (القيمة الافتراضية 50,000,000).

يوضّح الشكل 6.5 مثالاً محدّداً. يتكوّن Table_1 من ثلاث صفحات، تضمّ كل منها ثلاثة صفوف. وعند تنفيذ أمر VACUUM، يكون معرّف المعاملة الحالي 50,002,500 ولا توجد معاملات أخرى. في هذه الحالة، يكون OldestXmin هو 50,002,500؛ وبالتالي تكون freezeLimit_txid هي 2,500. وتسير عملية التجميد كما يلي:

![](/images/postgres-internals/pgsql06-fig-6-05.webp)

#### الشكل 6.5. تجميد الصفوف في النمط الكسول.

- **الصفحة 0:** يجمّد PostgreSQL الصفوف الثلاثة كلها لأن قيم t_xmin فيها أقل من freezeLimit_txid. بالإضافة إلى ذلك، تزيل عملية التفريغ هذه الصف Tuple_1 لأنه صف ميت.
- **الصفحة 1:** تتخطّى عملية التفريغ هذه الصفحة بالرجوع إلى خريطة الظهور (VM).
- **الصفحة 2:** يجمّد PostgreSQL الصفين Tuple_7 وTuple_8، ويزيل Tuple_7.

وقبل اكتمال عملية التفريغ، يحدّث PostgreSQL الإحصاءات المتعلقة بالتفريغ، مثل n_live_tup وn_dead_tup وlast_vacuum وvacuum_count في [pg_stat_all_tables](https://www.postgresql.org/docs/current/static/monitoring-stats.html#PG-STAT-ALL-TABLES-VIEW%22).

وكما هو موضّح في المثال أعلاه، قد لا يجمّد النمط الكسول جميع الصفوف المؤهّلة لأنه قد يتخطّى صفحات.

## 6.3.2. النمط المتلهّف

يعوّض النمط المتلهّف قيود النمط الكسول. فهو يمسح جميع الصفحات لفحص كل صف في الجدول، ويحدّث كتالوجات النظام المعنية، ويزيل الملفات والصفحات غير الضرورية من سجل الالتزام حيثما أمكن.

يُنفَّذ النمط المتلهّف عند تحقّق الشرط التالي:

$$ \begin{align*} \text{pg_database.datfrozenxid} < (\text{OldestXmin} - \text{vacuum_freeze_table_age}) \end{align*} $$

حيث:

- **pg_database.datfrozenxid** عمود في كتالوج النظام [pg_database](https://www.postgresql.org/docs/current/static/catalog-pg-database.html) يحمل أقدم معرّف معاملة مجمَّد لكل قاعدة بيانات.
- [vacuum_freeze_table_age](https://www.postgresql.org/docs/current/static/runtime-config-client.html#GUC-VACUUM-FREEZE-TABLE-AGE) معامل تهيئة قيمته الافتراضية 150,000,000.

يوضّح الشكل 6.6 مثالاً محدّداً:

![](/images/postgres-internals/pgsql06-fig-6-06.webp)

#### الشكل 6.6. تجميد الصفوف القديمة في النمط المتلهّف. (الإصدار 9.5 وما قبله)

افترض أن قيمة pg_database.datfrozenxid هي 1821.

في Table_1، أُزيل كلٌّ من Tuple_1 وTuple_7، بينما أُدرج Tuple_10 وTuple_11 في الصفحة الثانية. وعند تنفيذ أمر VACUUM، يكون معرّف المعاملة الحالي 150,002,000 ولا توجد معاملات متزامنة أخرى. وبالتالي تُضبط OldestXmin على 150,002,000 وتصبح freezeLimit_txid هي 100,002,000.

في هذه الحالة يتحقّق الشرط لأن:

$$ \begin{align*} 1821 < (150002000 - 150000000) \end{align*} $$

لذلك تُنفَّذ عملية التجميد بالنمط المتلهّف كما يلي.

- **الصفحة 0:** يفحص PostgreSQL الصفين Tuple_2 وTuple_3 رغم أن جميع الصفوف مجمَّدة بالفعل.
- **الصفحة 1:** يجمّد PostgreSQL الصفوف الثلاثة في هذه الصفحة لأن جميع قيم t_xmin أقل من freezeLimit_txid. وكان النمط الكسول سيتخطّى هذه الصفحة.
- **الصفحة 2:** يجمّد PostgreSQL الصف Tuple_10، ولكن ليس Tuple_11.

وبعد تجميد كل جدول، يحدّث PostgreSQL العمود **pg_class.relfrozenxid** في الجدول الهدف. و[pg_class](https://www.postgresql.org/docs/current/static/catalog-pg-class.html) كتالوج نظام، ويحمل كل عمود pg_class.relfrozenxid أحدث معرّف معاملة مجمَّد للجدول المقابل.

في هذا المثال، يُحدَّث pg_class.relfrozenxid الخاص بـ Table_1 إلى قيمة freezeLimit_txid الحالية (100,002,000). ويدل ذلك على أن جميع الصفوف ذات t_xmin الأقل من 100,002,000 في Table_1 مجمَّدة.

### 6.3.2.1. تحديث pg_database.datfrozenxid

قبل اكتمال عملية التفريغ، يحدّث PostgreSQL **pg_database.datfrozenxid** عند الحاجة، وهو يحمل أدنى قيمة pg_class.relfrozenxid في قاعدة البيانات المقابلة.

فمثلاً، إذا جُمِّد Table_1 فقط في النمط المتلهّف، فإن pg_database.datfrozenxid لقاعدة البيانات يبقى دون تغيير. وذلك لأن pg_class.relfrozenxid للعلاقات الأخرى (الجداول الأخرى وكتالوجات النظام المرئية من قاعدة البيانات الحالية) لم يتغيّر (الشكل 6.7(1)).

وإذا جُمِّدت جميع العلاقات في قاعدة البيانات الحالية في النمط المتلهّف، يُحدَّث pg_database.datfrozenxid لأن pg_class.relfrozenxid لجميع العلاقات في قاعدة البيانات تُحدَّث إلى قيمة freezeLimit_txid الحالية (الشكل 6.7(2)).

![](/images/postgres-internals/pgsql06-fig-6-07.webp)

#### الشكل 6.7. العلاقة بين pg_database.datfrozenxid وقيم pg_class.relfrozenxid.

** كيفية عرض pg_class.relfrozenxid وpg_database.datfrozenxid.

يعرض الاستعلام الأول أدناه قيم relfrozenxid لجميع العلاقات المرئية في قاعدة البيانات ’testdb’.

ويعرض الاستعلام الثاني قيمة pg_database.datfrozenxid لقاعدة البيانات ’testdb’.

```
testdb=# VACUUM table_1;
VACUUM
testdb=# SELECT n.nspname as &#34;Schema&#34;, c.relname as &#34;Name&#34;, c.relfrozenxid
             FROM pg_catalog.pg_class c
             LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
             WHERE c.relkind IN ('r','')
                   AND n.nspname <> 'information_schema' AND n.nspname !~ '^pg_toast'
                   AND pg_catalog.pg_table_is_visible(c.oid)
                   ORDER BY c.relfrozenxid::text::bigint DESC;
   Schema   |            Name         | relfrozenxid
------------+-------------------------+--------------
 public     | table_1                 |    100002000
 public     | table_2                 |         1846
 pg_catalog | pg_database             |         1827
 pg_catalog | pg_user_mapping         |         1821
 pg_catalog | pg_largeobject          |         1821

...

 pg_catalog | pg_transform            |         1821
(57 rows)

testdb=# SELECT datname, datfrozenxid FROM pg_database WHERE datname = 'testdb';
 datname | datfrozenxid
---------+--------------
 testdb  |         1821
(1 row)
```

** خيار FREEZE

يجبر أمر VACUUM المزوَّد بخيار FREEZE PostgreSQL على تجميد جميع معرّفات المعاملات في الجداول المحدّدة. ويحدث ذلك في النمط المتلهّف، لكن تُضبط قيمة freezeLimit على OldestXmin (وليس ‘OldestXmin - vacuum_freeze_min_age’).

فمثلاً، إذا نفّذ المعرّف 5000 الأمر VACUUM FULL ولم تكن هناك معاملات أخرى تعمل، تُضبط OldestXmin على 5000 وتُجمَّد معرّفات المعاملات الأقل من 5000.

## 6.3.3. تحسين عملية التجميد في النمط المتلهّف

النمط المتلهّف في الإصدار 9.5 وما قبله غير كفء لأنه يمسح جميع الصفحات دائماً. فمثلاً، في المثال الوارد في القسم 6.3.2، تمسح العملية الصفحة 0 حتى لو كانت جميع الصفوف فيها مجمَّدة بالفعل.

لمعالجة هذه المشكلة، حسّن الإصدار 9.6 (عام 2016) كلاً من VM وعملية التجميد. وكما ذُكر في القسم 6.2.1، تسجّل خريطة VM الجديدة ما إذا كانت جميع الصفوف في كل صفحة مجمَّدة. وعندما تعمل عملية التجميد بالنمط المتلهّف، تتخطّى العملية الصفحات التي لا تحتوي إلا على صفوف مجمَّدة.

يوضّح الشكل 6.8 مثالاً. أثناء تجميد هذا الجدول، تتخطّى العملية الصفحة 0 بالرجوع إلى VM. وبعد تجميد الصفحة 1، تُحدَّث معلومات VM المرتبطة بها لأن جميع الصفوف في تلك الصفحة أصبحت مجمَّدة.

![](/images/postgres-internals/pgsql06-fig-6-08.webp)

#### الشكل 6.8. تجميد الصفوف القديمة في النمط المتلهّف (الإصدار 9.6 وما بعده).

# 6.4. إزالة ملفات سجل الالتزام غير الضرورية

يخزّن سجل الالتزام، الموضّح في القسم 5.4، حالات المعاملات. ويحاول PostgreSQL إزالة ملفات سجل الالتزام غير الضرورية كلما حدّث pg_database.datfrozenxid. لاحظ أن هذه العملية تزيل أيضاً صفحات سجل الالتزام المقابلة.

يوضّح الشكل 6.9 مثالاً على هذه العملية. فإذا وُجد أدنى pg_database.datfrozenxid في ملف سجل الالتزام ‘0002’، يمكن للنظام إزالة الملفين الأقدم (‘0000’ و‘0001’). وهذا ممكن لأن جميع المعاملات في هذين الملفين تُعامَل كمعرّفات معاملات مجمَّدة في عنقود قواعد البيانات بأكمله.

![](/images/postgres-internals/pgsql06-fig-6-09.webp)

#### الشكل 6.9. إزالة ملفات وصفحات سجل الالتزام غير الضرورية.

** pg_database.datfrozenxid وملف سجل الالتزام

فيما يلي المخرجات الفعلية لقيمة pg_database.datfrozenxid وملفات سجل الالتزام:

```bash
$ psql testdb -c &#34;SELECT datname, datfrozenxid FROM pg_database&#34;
  datname  | datfrozenxid
-----------+--------------
 template1 |      7308883
 template0 |      7556347
 postgres  |      7339732
 testdb    |      7506298
(4 rows)
```

```bash
$ ls -la -h data/pg_xact/	# In versions 9.6 or earlier, &#34;ls -la -h data/pg_clog/&#34;
total 316K
drwx------  2 postgres postgres   28 Dec 29 17:15 .
drwx------ 20 postgres postgres 4.0K Dec 29 17:13 ..
-rw-------  1 postgres postgres 256K Dec 29 17:15 0006
-rw-------  1 postgres postgres  56K Dec 29 17:15 0007
```

# 6.5. خفير التفريغ التلقائي (Autovacuum Daemon)

يؤتمت PostgreSQL معالجة التفريغ باستخدام خفير التفريغ التلقائي (autovacuum daemon). وتُبسّط هذه الأتمتة صيانة قاعدة البيانات إلى حد كبير.

يستدعي خفير التفريغ التلقائي دورياً عدة عمليات autovacuum_worker. وبشكل افتراضي، يستيقظ الخفير كل دقيقة واحدة (وفق [autovacuum_naptime](https://www.postgresql.org/docs/current/static/runtime-config-autovacuum.html#GUC-AUTOVACUUM-NAPTIME)) ويشغّل ثلاثة عمال (وفق [autovacuum_max_works](https://www.postgresql.org/docs/current/static/runtime-config-autovacuum.html#GUC-AUTOVACUUM-MAX-WORKERS)).

تنفّذ هذه العمال معالجة التفريغ بالتزامن لجداولها المعنية. ويحدث هذا النشاط تدريجياً لضمان أقل تأثير ممكن على أداء قاعدة البيانات.

محتويات القسم

- 6.5.1. شروط تشغيل التفريغ التلقائي
- 6.5.2. نصائح للصيانة

## 6.5.1. شروط تشغيل التفريغ التلقائي

يعمل التفريغ التلقائي على جدول هدف إذا تحقّق أيٌّ من الشروط التالية:

### 6.5.1.1. الشرط 1

يتجاوز معرّف المعاملة الحالي الحدّ التالي:

$$ \begin{align*} \text{relfrozenxid} + \text{autovacuum_freeze_max_age} \end{align*} $$

حيث:

- **relfrozenxid** القيمة المعرّفة للجدول الهدف في [pg_class](https://www.postgresql.org/docs/current/catalog-pg-class.html).
- [autovacuum_freeze_max_age](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-FREEZE-MAX-AGE) معامل تهيئة (القيمة الافتراضية: 200,000,000).

وعند تحقّق هذا الشرط، ينفّذ التفريغ التلقائي عملية التجميد للجدول الهدف.

### 6.5.1.2. الشرط 2

يتجاوز عدد الصفوف الميتة الحدّ التالي:

$$ \begin{align*} \text{autovacuum_vacuum_threshold} + \text{autovacuum_vacuum_scale_factor} \times \text{reltuples} \end{align*} $$

حيث:

- [autovacuum_vacuum_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-THRESHOLD) (القيمة الافتراضية: 50) و[autovacuum_vacuum_scale_factor](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-SCALE-FACTOR) (القيمة الافتراضية: 0.2) معاملا تهيئة.
- **reltuples** العدد الإجمالي للصفوف في الجدول الهدف.

فمثلاً، إذا كان في جدول 10,000 صف و2,100 صف ميت، يعمل التفريغ التلقائي لأن:

$$ \begin{align*} 2100 > 50 + 0.2 \times 10000. \end{align*} $$

### 6.5.1.3. الشرط 3 (الإصدار 13 وما بعده)

يتجاوز عدد الصفوف المُدرجة في الجدول الهدف الحدّ التالي:

$$ \text{autovacuum_vacuum_insert_threshold} + \text{autovacuum_vacuum_insert_scale_factor} \times \text{reltuples} $$

حيث:

- [autovacuum_vacuum_insert_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-INSERT-THRESHOLD) (القيمة الافتراضية: 1000) و[autovacuum_vacuum_insert_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-INSERT-THRESHOLD) (القيمة الافتراضية: 0.2) معاملا تهيئة.
- **reltuples** عدد الصفوف في الجدول الهدف.

فمثلاً، إذا كان في جدول 10,000 صف و3,010 صفوف مُدرجة، يعمل التفريغ التلقائي لأن:

$$ \begin{align*} 3010 > 1000 + 0.2 \times 10000. \end{align*} $$

أُضيف هذا الشرط في الإصدار 13.

### 6.5.1.4. الشرط 4

ينفّذ التفريغ التلقائي أيضاً عملية التحليل (analyze) إذا تحقّق الشرط التالي:

$$ \begin{align*} \text{mod_since_analyze} > \text{autovacuum_analyze_threshold} + \text{autovacuum_analyze_scale_factor} \times \text{reltuples} \end{align*} $$

حيث:

- **mod_since_analyze** عدد الصفوف المعدَّلة (عبر INSERT أو DELETE أو UPDATE) منذ عملية التحليل السابقة.
- [autovacuum_analyze_threshold](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-ANALYZE-THRESHOLD) (القيمة الافتراضية: 50) و[autovacuum_analyze_scale_factor](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-ANALYZE-SCALE-FACTOR) (القيمة الافتراضية: 0.1) معاملا تهيئة.
- **reltuples** عدد الصفوف في الجدول الهدف.

فمثلاً، إذا كان في جدول 10,000 صف و1,100 صف معدَّل منذ آخر تحليل، يعمل التفريغ التلقائي لأن:

$$ \begin{align*} 1100 > 50 + 0.1 \times 10000. \end{align*} $$ ** معلومات

تحدّد الدالة [relation_needs_vacanalyze()](https://github.com/postgres/postgres/blob/master/src/backend/postmaster/autovacuum.c) ما إذا كانت الجداول الهدف تحتاج إلى عمليات تفريغ أو تحليل.

## 6.5.2. نصائح للصيانة

كما ذُكر مراراً، يُعدّ انتفاخ الجداول (table bloat) تحدياً كبيراً في إدارة PostgreSQL. وتسبّب هذه المشكلة عدة عوامل، والتفريغ التلقائي أحدها.

يعمل التفريغ التلقائي عندما يتجاوز عدد الصفوف الميتة حدوداً محدّدة: 250 لجدول من 1,000 سطر، و20,050 لـ100,000 سطر، و20,000,050 لـ100,000,000 سطر. وتُظهر هذه الأمثلة أن التفريغ التلقائي يعمل بوتيرة أقل مع ازدياد عدد الصفوف في الجدول.

من النصائح الشائعة تقليل قيمة [autovacuum_vacuum_scale_factor](https://www.postgresql.org/docs/current/runtime-config-autovacuum.html#GUC-AUTOVACUUM-VACUUM-SCALE-FACTOR). فالقيمة الافتراضية (0.2) كبيرة غالباً للجداول الضخمة.

يمكن لـPostgreSQL ضبط قيمة *autovacuum_vacuum_scale_factor* المناسبة لكل جدول باستخدام [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html). ويضبط المثال التالي القيمة الجديدة لجدول pgbench_accounts:

```sql
postgres=# ALTER TABLE pgbench_accounts SET (autovacuum_vacuum_scale_factor = 0.05);
ALTER TABLE
```

يمكن لإعدادات محدّدة أن تضمن عمل التفريغ التلقائي بصرف النظر عن العدد الإجمالي للصفوف.

فمثلاً، إذا لزم التفريغ كلما بلغت الصفوف الميتة 50,000، يمكن ضبط معاملات التخزين التالية. وبهذه الإعدادات، يُشغّل التفريغ التلقائي التفريغ في كل مرة يُبلَغ فيها حدّ 10,000 صف ميت:

```sql
postgres=# ALTER TABLE pgbench_accounts SET (autovacuum_vacuum_threshold = 50000);
ALTER TABLE
postgres=# ALTER TABLE pgbench_accounts SET (autovacuum_vacuum_scale_factor = 0.0);
ALTER TABLE
```

# 6.6. استعادة المساحة المنتفخة

يزيل أمر VACUUM الصفوف الميتة ويمنع التفاف معرّف المعاملة. غير أنه لا يستطيع استعادة مساحة القرص الناتجة عن **انتفاخ الجدول (table bloat)**.

انتفاخ الجدول حالة لا يقلّ فيها الحجم الفيزيائي للجدول حتى بعد إزالة الصفوف الميتة. ويوضّح الشكل 6.10 مثالاً متطرفاً.

![](/images/postgres-internals/pgsql06-fig-6-10.webp)

#### الشكل 6.10. يبقى انتفاخ الجدول بعد VACUUM.

افترض أن جدولاً يتكوّن من ثلاث صفحات، وتضمّ كل صفحة ستة صفوف. وتحذف الأوامر التالية معظم الصفوف ثم تزيل الصفوف الميتة الناتجة:

```
testdb=# DELETE FROM tbl WHERE id % 6 != 0;
testdb=# VACUUM tbl;
```

يزيل أمر VACUUM الصفوف الميتة، لكن حجم الجدول يبقى دون تغيير. ونتيجة لذلك، يظل ملف العلاقة شاغلاً ثلاث صفحات، رغم أنه لم يتبقَّ سوى ثلاثة صفوف حية.

وبشكل عام، تحدث هذه المشكلة عند توليد كمية كبيرة من الصفوف الميتة.

حتى الإصدار 18، كان الحل المدمج الوحيد هو إعادة بناء ملفات العلاقات والفهارس باستخدام CLUSTER أو VACUUM FULL. ويحصل كلا الأمرين على أقفال ACCESS EXCLUSIVE على الجدول بأكمله أثناء التنفيذ، ما يحجب جميع العمليات طوال إعادة البناء. ويُعطّل ذلك العمليات إذا استغرقت إعادة البناء وقتاً طويلاً.

قدّم PostgreSQL 19 (عام 2026) الأمر REPACK (وليس امتداد pg_repack). ويستخدم كلٌّ من VACUUM FULL وCLUSTER الآن التنفيذ الأساسي نفسه. علاوةً على ذلك، أُضيف نمط CONCURRENTLY للحصول على قفل ACCESS EXCLUSIVE أثناء تبديل الملفات فقط، ما يتيح إعادة بناء الجدول بتوافر أعلى أثناء العمل من ذي قبل.

| إصدار PostgreSQL | قفل ACCESS EXCLUSIVE | متاح أثناء العمل غالباً |
| --- | --- | --- |
| 18 أو أقدم | VACUUM FULL CLUSTER | لا ينطبق |
| 19 أو أحدث | REPACK REPACK USING INDEX (مكافئ CLUSTER) | REPACK CONCURRENTLY REPACK CONCURRENTLY USING INDEX |

تصف الأقسام التالية الأمر REPACK (بديل VACUUM FULL) والأمر REPACK CONCURRENTLY.

محتويات القسم

- 6.6.1. REPACK (VACUUM FULL)
- 6.6.2. REPACK CONCURRENTLY

** ملاحظة

يستخدم REPACK CONCURRENTLY آلية **فك ترميز WAL (WAL decoding)** المستخدمة في النسخ المنطقي (logical replication).

لذلك يُنصح القرّاء غير الملمّين بـ**WAL** أو **النسخ المنطقي** بقراءة [الفصل 9](/book/postgres-internals/pgsql09/index) و[الفصل 12](/book/postgres-internals/pgsql12/index) قبل العودة إلى هذا القسم.

## 6.6.1. REPACK (VACUUM FULL)

يستخدم الأمر REPACK (VACUUM FULL) استراتيجية بسيطة تُعيد إنشاء ملف جدول فيزيائي جديد تحت قفل حصري. ويوضّح الشكل 6.11 مخطط هذا الأمر.

![To simplify, index files are omitted.](/images/postgres-internals/pgsql06-fig-6-11.webp)

#### الشكل 6.11. مخطط معالجة REPACK (VACUUM FULL).

للتبسيط، تُحذف ملفات الفهرس.

- (1) **إنشاء ملف جدول جديد:** عند تنفيذ أمر REPACK، يُنشئ PostgreSQL ملف جدول جديداً بحجم 8 كيلوبايت ويحصل على قفل AccessExclusiveLock على الجدولين الجديد والقديم معاً. وتمنع الأقفال العمليات الأخرى من الوصول إلى الجدولين.
- (2) **نسخ الصفوف الحية إلى الجدول الجديد:** ينسخ PostgreSQL الصفوف الحية فقط من ملف الجدول القديم إلى الجدول الجديد.
- (3) **إزالة الملف القديم وإعادة بناء البنى المرتبطة:** بعد نسخ جميع الصفوف الحية، يزيل PostgreSQL الملف القديم. ثم يعيد بناء جميع الفهارس المرتبطة ويحدّث FSM وVM والإحصاءات وكتالوجات النظام.

فيما يلي شبه الكود الخاص بـ REPACK (VACUUM FULL):

#### شبه الكود: REPACK (VACUUM FULL)

```
(1)  FOR each table
(2)     Acquire AccessExclusiveLock lock for the (old) table
(3)     Create a new table file with AccessExclusiveLock
(4)     FOR each live tuple in the old table
(5)        Copy the live tuple to the new table file
(6)        Freeze the tuple IF necessary
        END FOR
(7)     Remove the old table file (after releasing the exclusive lock)
(8)     Rebuild all indexes
(9)     Update FSM and VM
(10)    Update statistics
        Release AccessExclusiveLock lock for the new table
     END FOR
(11) Remove unnecessary clog files and pages if possible
```

يجب مراعاة نقطتين عند استخدام الأمر REPACK (VACUUM FULL):

1. لا يمكن لأي عملية الوصول (قراءة أو كتابة) إلى الجدول أثناء العملية.
2. تستهلك العملية مؤقتاً ما يصل إلى ضعف مساحة القرص التي يشغلها الجدول. لذلك تحقّق من سعة القرص المتبقية قبل معالجة جدول كبير.

## 6.6.2. REPACK CONCURRENTLY

يتيح خيار **CONCURRENTLY**، الذي أُدخل في الإصدار 19، إجراء عمليات بحث وتحديث متزامنة على الجدول الهدف أثناء استعادة المساحة، باستثناء قفل AccessExclusiveLock قصير أثناء المرحلة النهائية.

تطابق استراتيجية التنفيذ الأساسية الأمر REPACK العادي بإنشاء جدول جديد ونسخ الصفوف الحية من الجدول القديم. غير أن خيار CONCURRENTLY يُدخل العمليات الداخلية التالية:

- في بداية عملية REPACK، تُلتقط لقطة MVCC.
- تنسخ العملية الخلفية الصفوف الحية المرئية لهذه اللقطة فقط إلى الجدول الجديد.
- تُطبَّق التغييرات التي تحدث أثناء عملية النسخ لاحقاً على الجدول الجديد.

لالتقاط التغييرات أثناء النسخ، يستخدم أمر REPACK آلية فك ترميز WAL المستخدمة في النسخ المنطقي. وهو يعمل كما يلي:

- تبدأ العملية الخلفية التي تنفّذ REPACK عاملاً خلفياً (background worker) يُسمى repack_decoding_worker. ويفكّ العامل ترميز سجلات WAL التي تولّدها المعاملات المتزامنة، ويستخرج التغييرات التي أُجريت على الجدول الهدف، ويكتبها في **BufFile** مؤقت (منفَّذ في [buffile.c](https://github.com/postgres/postgres/blob/master/src/backend/storage/file/buffile.c)).

وتقرأ العملية الخلفية الخاصة بـ REPACK عناصر التغيير من ملف BufFile وتطبّقها على الجدول الجديد.

تعمل هذه الآلية ما دام معامل التهيئة *wal_level* مضبوطاً على “replica” أو أعلى. ويجب أن يكون لجدول الهدف *REPLICA IDENTITY* مهيّأة (“DEFAULT” أو “USING INDEX”).

لاحظ أن خيار CONCURRENTLY لا يمكن استخدامه للجداول التالية:

- الجداول المُقسَّمة
- الجداول UNLOGGED
- جداول TOAST
- الجداول التي لا تحتوي على REPLICA IDENTITY (“DEFAULT” أو “USING INDEX”)
- كتالوجات النظام

### 6.6.2.1. التقاط التغييرات المتزامنة وتطبيقها

يبدأ repack_decoding_worker في كل مرة يُنفَّذ فيها الأمر REPACK CONCURRENTLY وينتهي بمجرد انتهاء العملية.

يفكّ هذا العامل ترميز سجلات WAL بدءاً من قيمة LSN عند التقاط اللقطة. ويستخرج التغييرات التي أُجريت على الجدول الهدف فقط ويمرّرها إلى العملية الخلفية الخاصة بـ REPACK عبر ملف BufFile.

لتبسيط الشرح، تُحذف هنا عمليات القفل، مع التركيز بدلاً من ذلك على مسار فك ترميز WAL وتطبيق التغييرات.

افترض أن الجدول الهدف *tbl* معرّف كما يلي:

```
testdb=# \d tbl
                 Table &#34;public.tbl&#34;
 Column |  Type   | Collation | Nullable | Default
--------+---------+-----------+----------+---------
 id     | integer |           | not null |
 data   | text    |           |          |
Indexes:
    &#34;tbl_pkey&#34; PRIMARY KEY, btree (id)
```

في هذا المثال، تكون REPLICA IDENTITY هي المفتاح الأساسي: “tbl_pkey”.

يوضّح الشكل 6.12 عملية REPACK CONCURRENTLY تصورية من مرحلتين (أما التنفيذ الفعلي فيتكوّن من ثلاث مراحل، كما هو موضّح في القسم التالي).

![To simplify, the old index file is omitted.](/images/postgres-internals/pgsql06-fig-6-12.webp)

#### الشكل 6.12. نظرة عامة على REPACK CONCURRENTLY.

للتبسيط، يُحذف ملف الفهرس القديم.

**المرحلة 1: نسخ الصفوف**

- (1) تُنشئ العملية backend_1 (التي تنفّذ أمر REPACK) عملية repack_decoding_worker.
- (2) يبدأ repack_decoding_worker معاملةً ويشارك لقطته الدقيقة مع backend_1 لضمان الاتساق.
- (3) تُنشئ backend_1 ملف جدول جديداً.
- (4) تُدرج backend_2 الصف Tuple_B في الجدول القديم. وتضيف هذه العملية الصف Tuple_B إلى الجدول القديم وتولّد سجل WAL المقابل.
- (5) تنسخ backend_1 الصفوف الحية (مثل Tuple_A) من الجدول القديم إلى الجدول الجديد باستخدام اللقطة المُحصَّلة. وفي هذه اللحظة، يكون Tuple_B غير مرئي للقطة، لذلك لا يُنسخ.

**المرحلة 2: تطبيق التغييرات**

- (6) بعد إكمال النسخ، تبني backend_1 جميع الفهارس المرتبطة بالجدول الجديد. في هذا المثال، لا ينعكس في الفهرس الجديد في البداية سوى Tuple_A.
- (7) تنفّذ backend_1 الدالة XLogFlush() لضمان حفظ WAL المولَّد في المرحلة 1 بشكل دائم.
- (8) يفكّ repack_decoding_worker ترميز سجلات WAL المولَّدة أثناء المرحلة 1 ويُخرج التغييرات (في هذا المثال “INSERT Tuple_B”) إلى ملف BufFile.
- (9) تقرأ backend_1 ملف BufFile وتطبّق التغييرات على الجدول الجديد. هنا، يُدرَج Tuple_B في الجدول الجديد عبر مسار INSERT العادي. ونتيجة لذلك، تُحدَّث جميع الفهارس على الجدول الجديد تلقائياً بواسطة آلية صيانة الفهارس المعتادة في PostgreSQL.

وبتطبيق التغييرات لاحقاً، يمكن إعادة بناء الجدول مع السماح للمستخدمين بإجراء عمليات بحث وتحديث متزامنة.

### 6.6.2.2. المراحل الثلاث لـ REPACK CONCURRENTLY

يصف هذا القسم الفرعي العملية وفق التنفيذ الفعلي.

للتركيز على أنواع الأقفال المحتجزة أثناء كل مرحلة، تُحذف هنا تفاعلات العمليات الخلفية الداخلية وتفاصيل repack_decoding_worker.

وكما هو موضّح في الشكل 6.13، يطبّق التنفيذ التغييرات مرتين لتقليل حالات التعطّل التشغيلي الناتجة عن قفل AccessExclusiveLock.

![To simplify, the old index file is omitted.](/images/postgres-internals/pgsql06-fig-6-13.webp)

#### الشكل 6.13. المراحل الثلاث لـ REPACK CONCURRENTLY.

للتبسيط، يُحذف ملف الفهرس القديم.

يقوم هذا النهج على افتراض أن حجم التغييرات المتزامنة المولَّدة أثناء المرحلة 2 سيكون صغيراً نسبياً. وهذا ما يتيح إكمال المرحلة 3 — التي تطبّق التغييرات المتبقية وتنفّذ التبديل النهائي تحت القفل الصارم — بسرعة.

عند تشغيل أمر REPACK بخيار CONCURRENTLY، يبدأ repack_decoding_worker، وتحدث المعالجة التالية:

- **المرحلة 1: نسخ الصفوف** تُنسخ الصفوف الحية بالطريقة نفسها الموضّحة في القسم السابق. وأثناء هذه المرحلة، تحتفظ العملية الخلفية الخاصة بـ REPACK بقفل ShareUpdateExclusiveLock على الجدول القديم وقفل AccessExclusiveLock على الجدول الجديد.
- **المرحلة 2: تطبيق تغييرات المرحلة 1** تُطبَّق التغييرات التي حدثت أثناء المرحلة 1 على الجدول الجديد. والأقفال المحتجزة مماثلة لتلك الموجودة في المرحلة 1. وأثناء هذه المرحلة، قد تحدث عمليات تحديث وإدراج من عمليات خلفية أخرى. في هذا المثال، يُحدَّث Tuple_X ليصبح Tuple_Z.
- **المرحلة 3: تطبيق تغييرات المرحلة 2** يُحصَّل قفل AccessExclusiveLock على الجدول القديم لمنع إجراء مزيد من التحديثات عليه. وبعدم حدوث تغييرات إضافية، تُطبَّق التغييرات المتراكمة أثناء المرحلة 2 على الجدول الجديد.

وبعد ذلك، ينتهي repack_decoding_worker. وعلى غرار REPACK (VACUUM FULL) العادي، يُتبادَل الجدولان/الفهرسان القديم والجديد، وتُزال ملفات الجدول/الفهرس القديمة، وتُحدَّث FSM وVM والإحصاءات.

وكما هو موضّح في هذا المثال، قد يؤدي تطبيق التغييرات المتزامنة أثناء المرحلتين 2 و3 إلى توليد صفوف ميتة جديدة في ملف الجدول الجديد. لذلك، وعلى خلاف التنفيذ غير المتزامن، لا يمكن لـ REPACK CONCURRENTLY ضمان جدول خالٍ تماماً من الصفوف الميتة.
