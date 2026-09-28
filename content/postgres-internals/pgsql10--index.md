---
title: "النسخ الاحتياطي الأساسي والاستعادة الزمنية"
lang: ar
source: https://www.interdb.jp/pg/pgsql10/index.html
---

# 10.1. النسخة الاحتياطية الأساسية

قبل إدخال أداة [pg_basebackup](http://www.postgresql.org/docs/current/static/app-pgbasebackup.html) في الإصدار 9.1 (2011)، كانت النسخ الاحتياطية المتصلة (الكاملة) تعتمد على الأمرين [pg_backup_start](http://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-BACKUP) و[pg_backup_stop](http://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-BACKUP).

ومع أن هذين الأمرين أصبحا الآن أقل شيوعًا، فإنهما يبقيان ضروريين لفهم آليات النسخ الاحتياطي و**الاستعادة الزمنية (PITR)** في PostgreSQL. وتستكشف الأقسام الفرعية التالية هذين الأمرين قبل مناقشة عمل pg_basebackup.

يوضّح الشكل 10.1 الإجراء القياسي لأخذ نسخة احتياطية أساسية:

- (1) إصدار الأمر pg_backup_start (في الإصدار 14 أو أقدم، pg_start_backup).
- (2) أخذ لقطة من تجمّع قاعدة البيانات باستخدام أمر أرشفة مفضّل.
- (3) إصدار الأمر pg_backup_stop (في الإصدار 14 أو أقدم، pg_stop_backup).

![](/images/postgres-internals/pgsql10-fig-10-01.webp)

#### الشكل 10.1. أخذ نسخة احتياطية أساسية.

لا يتطلب هذا الإجراء أي أقفال على الجداول، لذا يواصل المستخدمون إصدار الاستعلامات دون انقطاع. ويوفّر ذلك ميزة كبيرة مقارنة بأنظمة إدارة قواعد البيانات المفتوحة المصدر الرئيسية الأخرى.

تستدعي أداة pg_basebackup هذين الأمرين داخليًا وترث ميزاتهما.

** معلومات

الأمران pg_backup_start وpg_backup_stop معرّفان في [xlogfuncs.c](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/xlogfuncs.c).

** معلومات تاريخية

حتى الإصدار 14، كان الأمر pg_backup_start والأمر pg_backup_stop يُسمّيان pg_start_backup وpg_stop_backup على الترتيب.

محتويات القسم

- 10.1.1. الأمر pg_backup_start
- 10.1.2. الأمر pg_backup_stop
- 10.1.3. الأداة pg_basebackup

## 10.1.1. الأمر pg_backup_start

يهيّئ الأمر pg_backup_start لنسخة احتياطية أساسية باستدعاء الدالة [do_pg_backup_start()](https://github.com/postgres/postgres/blob/d32d1463995c036853eeb9ec99cc367ffc7794ae/src/backend/access/transam/xlog.c#L8791) داخليًا.

كما نوقش في القسم 9.8، تبدأ الاستعادة من نقطة إعادة التنفيذ. لذلك ينفّذ pg_backup_start نقطة تفتيش لإنشاء نقطة إعادة تنفيذ صراحةً في بداية النسخ الاحتياطي. وبما أن نقاط التفتيش العادية قد تحدث عدة مرات أثناء النسخ الاحتياطي، يجب أن يحفظ النظام موضع نقطة التفتيش هذه تحديدًا في ملف غير pg_control.

وتحديدًا، ينفّذ pg_backup_start أربع عمليات:

1. إجبار قاعدة البيانات على وضع كتابة الصفحة الكاملة.
2. التبديل إلى ملف قطعة WAL جديد (في الإصدار 8.4 أو أحدث).
3. تنفيذ نقطة تفتيش.
4. إنشاء **ملف backup_label** &mdash; يحتوي هذا الملف، الموجود في المستوى الأعلى من الدليل الأساسي، على معلومات أساسية عن النسخة الاحتياطية، بما فيها موضع نقطة التفتيش.

وتمثّل العمليتان الثالثة والرابعة جوهر هذا الأمر. وتضمن العمليتان الأولى والثانية استعادة أكثر موثوقية لتجمّع قاعدة البيانات.

### 10.1.1.1. ملف backup_label

يحتوي ملف backup_label على العناصر التالية (سبعة عناصر في الإصدار 11 أو أحدث):

- **CHECKPOINT LOCATION:** موضع LSN لسجل نقطة التفتيش الذي أنشأه هذا الأمر.
- **START WAL LOCATION:** يُستخدم أساسًا للنسخ المتماثل المتدفّق ([الفصل 11](/book/postgres-internals/pgsql11/index)). ويقرأ الخادم الاحتياطي هذه القيمة مرة واحدة فقط عند بدء التشغيل الأولي.
- **BACKUP METHOD:** الطريقة المستخدمة لإنشاء النسخة الاحتياطية.
- **BACKUP FROM:** يشير إلى ما إذا كانت النسخة الاحتياطية قد أُخذت من خادم أساسي أو احتياطي.
- **START TIME:** الطابع الزمني لتنفيذ pg_backup_start.
- **LABEL:** التسمية المحددة في الأمر pg_backup_start.
- **START TIMELINE:** الخط الزمني عند بداية النسخة الاحتياطية (أُدخل في الإصدار 11 لإجراء فحوص السلامة).

مثال على ملف backup_label أنشأته pg_basebackup:

```bash
$ cat $PGDATA/backup_label
START WAL LOCATION: 0/1B000028 (file 00000001000000000000001B)
CHECKPOINT LOCATION: 0/1B000060
BACKUP METHOD: streamed
BACKUP FROM: primary
START TIME: 2024-1-1 11:45:19 GMT
LABEL: pg_basebackup base backup
START TIMELINE: 1
```

أثناء الاستعادة، يسترجع PostgreSQL القيمة *CHECKPOINT LOCATION* من ملف backup_label ليقرأ سجل نقطة التفتيش من سجل الأرشيف المناسب. ثم يحدّد نقطة إعادة التنفيذ ويبدأ عملية الاستعادة.

** لماذا يمكن إنشاء نسخة احتياطية أساسية باستخدام أدوات أرشفة عامة مثل cp أو scp؟

الجواب يكمن في عملية الاستعادة. فهي تستعيد تجمّع قاعدة البيانات إلى حالة متسقة حتى إذا كانت الملفات غير متسقة فيزيائيًا.

قد تنسخ الأدوات القياسية الملفات في أوقات مختلفة، ما يؤدي إلى عدم اتساق داخلي. ومع ذلك، يمكن لتجمّع قاعدة البيانات أن يبلغ حالة متسقة بإعادة تنفيذ ملفات WAL المؤرشفة.

لذلك، لا تُعدّ اللقطات على مستوى نظام الملفات أو أدوات النسخ الاحتياطي المتخصصة ضرورة حتمية.

## 10.1.2. الأمر pg_backup_stop

يكمل الأمر pg_backup_stop النسخة الاحتياطية باستدعاء الدالة [do_pg_backup_stop()](https://github.com/postgres/postgres/blob/d32d1463995c036853eeb9ec99cc367ffc7794ae/src/backend/access/transam/xlog.c#L9119) داخليًا.

وينفّذ خمس عمليات:

1. إعادة قاعدة البيانات إلى وضع *عدم كتابة الصفحة الكاملة* إذا كان pg_backup_start قد غيّره.
2. كتابة سجل WAL يشير إلى نهاية النسخة الاحتياطية.
3. تبديل ملف قطعة WAL.
4. إنشاء **ملف تاريخ النسخ الاحتياطي** &mdash; يتضمّن هذا الملف محتويات ملف backup_label والطابع الزمني للإكمال.
5. حذف ملف backup_label &mdash; هذا الملف ضروري للاستعادة من النسخة الاحتياطية، لكنه لم يعد مطلوبًا في تجمّع قاعدة البيانات الأصلي بعد النسخ.

يتبع ملف تاريخ النسخ الاحتياطي نمط التسمية التالي:

- **نمط ملف تاريخ النسخ الاحتياطي:**: `{WAL_segment}.{offset}.backup` حيث offset: قيمة LSN الابتدائية للنسخة الاحتياطية الأساسية.

## 10.1.3. الأداة pg_basebackup

[pg_basebackup](https://www.postgresql.org/docs/current/app-pgbasebackup.html) أداة لأخذ نسخ احتياطية متصلة.

حتى الإصدار 16، كانت تدعم النسخ الاحتياطية الكاملة لتجمّع قاعدة البيانات بأكمله. وأضاف الإصدار 17 النسخ الاحتياطية التزايدية، وهي موضوع القسم 10.5.

لتنفيذ نسخ احتياطية عن بعد، تستخدم pg_basebackup عملية **walsender**، وهي مكوّن من مكوّنات النسخ المتماثل المتدفّق الموضحة في [الفصل 11](/book/postgres-internals/pgsql11/index).

فمثلًا، لأخذ نسخة احتياطية كاملة من المضيف 192.168.1.10 إلى الدليل المحلي `/usr/local/pgsql/backup/full`:

```bash
$ pg_basebackup -h 192.168.1.10 -p 5432 -D /usr/local/pgsql/backup/full -X stream -P -v
```

يوضّح الشكل 10.2 تسلسل عمل pg_basebackup:

![](/images/postgres-internals/pgsql10-fig-10-02.webp)

#### الشكل 10.2. تسلسل أخذ pg_basebackup لنسخة احتياطية كاملة.

- (1) **طلب اتصال**: تطلب pg_basebackup اتصال walsender من خادم PostgreSQL.
- (2) **إنشاء عملية walsender**: ينشئ الخادم عملية walsender ويقيم الاتصال.
- (3) **طلب نسخة احتياطية أساسية**: تطلب pg_basebackup النسخة الاحتياطية.
- (4) **تنفيذ do_pg_backup_start()**: تشغّل عملية walsender هذه الدالة.
- (5) **إرسال جميع الملفات**: ترسل عملية walsender جميع ملفات تجمّع قاعدة البيانات، باستثناء ملفات WAL في pg_wal.
- (6) **تنفيذ do_pg_backup_stop()**: تشغّل عملية walsender هذه الدالة.
- (7) **إرسال ملفات WAL**: ترسل عملية walsender ملفات WAL في pg_wal إذا لم يكن الخيار ‘&ndash;wal-method’ مساويًا ’none’.
- (8) **إرسال ملف backup_manifest**: تنشئ عملية walsender ملف البيان وترسله.

تُستثنى ملفات WAL في الخطوة 5 لضمان أن pg_basebackup تلتقط القطع الأخيرة.

وفي الخطوة 6، تبدّل do_pg_backup_stop() قطعة WAL الحالية، ما يضمن دفع جميع الملفات المتولّدة أثناء النسخ الاحتياطي إلى دليل pg_wal.

```bash
$ ls /usr/local/pgsql/backup/full
PG_VERSION        global        pg_ident.conf  pg_serial     pg_tblspc             postgresql.conf
backup_label      log           pg_logical     pg_snapshots  pg_twophase
backup_manifest   pg_commit_ts  pg_multixact   pg_stat       pg_wal
base              pg_dynshmem   pg_notify      pg_stat_tmp   pg_xact
current_logfiles  pg_hba.conf   pg_replslot    pg_subtrans   postgresql.auto.conf
```

** لماذا تستخدم pg_basebackup عملية walsender؟

تتولّى عملية walsender النسخ المتماثل، كما هو موضّح في [الفصل 11](/book/postgres-internals/pgsql11/index).

ومع أن pg_basebackup ليست نسخًا متماثلًا مباشرةً، فإن **postgres** و**walsender** كانتا العمليتين الوحيدتين المتاحتين لاتصالات البرامج الخارجية أثناء تطويرها. ونتيجة لذلك، وُسِّع بروتوكول walsender ليدعم pg_basebackup.

### 10.1.3.1. ملفات بيان النسخ الاحتياطي

ملف بيان النسخ الاحتياطي ملف JSON يحتوي على بيانات وصفية ومعلومات تحقق.

يسرد الجدول 10.1 المكوّنات الرئيسية.

| المفتاح | القيم |
| --- | --- |
| PostgreSQL-Backup-Manifest-Version | رقم إصدار بيان النسخ الاحتياطي. |
| Files | قائمة كائنات تحتوي على مسار كل ملف وحجمه وبصمته وغير ذلك. |
| WAL-Ranges | الخط الزمني ونطاق LSN أثناء إجراء النسخ الاحتياطي: **Start-LSN**: LSN الخاص بنقطة إعادة التنفيذ الناتجة عن CHECKPOINT عند استدعاء الدالة do_pg_backup_start(). ** End-LSN**: LSN الخاص بسجل WAL الذي أنشأته الدالة do_pg_backup_stop(). |
| Manifest-Checksum | قيمة البصمة لملف البيان هذا. |

وفيما يلي مثال منقول لملف بيان النسخ الاحتياطي:

```bash
$ cat /usr/local/pgsql/backup/full/backup_manifest
{ &#34;PostgreSQL-Backup-Manifest-Version&#34;: 2,
&#34;System-Identifier&#34;: 7426689740139212305,
&#34;Files&#34;: [
{ &#34;Path&#34;: &#34;backup_label&#34;, &#34;Size&#34;: 225, &#34;Last-Modified&#34;: &#34;2024-10-17 10:41:48 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;1950abcb&#34; },
{ &#34;Path&#34;: &#34;postgresql.conf&#34;, &#34;Size&#34;: 30771, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:00 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;a9c769e0&#34; },
{ &#34;Path&#34;: &#34;postgresql.auto.conf&#34;, &#34;Size&#34;: 88, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;536f950b&#34; },
{ &#34;Path&#34;: &#34;pg_ident.conf&#34;, &#34;Size&#34;: 2640, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;0ce04d87&#34; },
{ &#34;Path&#34;: &#34;pg_xact/0000&#34;, &#34;Size&#34;: 8192, &#34;Last-Modified&#34;: &#34;2024-10-17 10:41:48 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;4c2ce5fc&#34; },
{ &#34;Path&#34;: &#34;pg_hba.conf&#34;, &#34;Size&#34;: 5711, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;d62da38c&#34; },
{ &#34;Path&#34;: &#34;PG_VERSION&#34;, &#34;Size&#34;: 3, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;64440205&#34; },
{ &#34;Path&#34;: &#34;base/4/113&#34;, &#34;Size&#34;: 8192, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;d1bc40bb&#34; },
{ &#34;Path&#34;: &#34;base/4/1417&#34;, &#34;Size&#34;: 0, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;00000000&#34; },
{ &#34;Path&#34;: &#34;base/4/2610_fsm&#34;, &#34;Size&#34;: 24576, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;b9b5f34f&#34; },
{ &#34;Path&#34;: &#34;base/4/3542&#34;, &#34;Size&#34;: 16384, &#34;Last-Modified&#34;: &#34;2024-10-17 10:29:12 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;e7f849bf&#34; },

... snip ...

{ &#34;Path&#34;: &#34;global/pg_control&#34;, &#34;Size&#34;: 8192, &#34;Last-Modified&#34;: &#34;2024-10-17 10:41:48 GMT&#34;, &#34;Checksum-Algorithm&#34;: &#34;CRC32C&#34;, &#34;Checksum&#34;: &#34;43872087&#34; }
],
&#34;WAL-Ranges&#34;: [
{ &#34;Timeline&#34;: 1, &#34;Start-LSN&#34;: &#34;0/4000028&#34;, &#34;End-LSN&#34;: &#34;0/4000120&#34; }
],
&#34;Manifest-Checksum&#34;: &#34;4c6d8a85379990904f6986f5bfd98db9f4640cfc96f440f8674abe6251cfffb8&#34;}
```

# 10.2. كيفية عمل الاستعادة الزمنية

يوضّح الشكل 10.3 المفهوم الأساسي للاستعادة الزمنية (PITR).

في وضع PITR، يعيد PostgreSQL تنفيذ بيانات WAL من سجلات الأرشيف فوق النسخة الاحتياطية الأساسية. وتبدأ هذه العملية من نقطة إعادة التنفيذ التي أنشأها pg_backup_start وتستمر حتى نقطة استعادة محددة. ويُشار إلى هذه النقطة بـ**هدف الاستعادة** (recovery target).

![](/images/postgres-internals/pgsql10-fig-10-03.webp)

#### الشكل 10.3. المفهوم الأساسي للاستعادة الزمنية.

تعمل عملية PITR كما يلي:

لنفترض حدوث خطأ في الساعة 12:05 بتوقيت غرينتش في 1 يناير 2024. ينبغي إزالة تجمّع قاعدة البيانات واستعادة تجمّع جديد باستخدام نسخة احتياطية أساسية أُخذت قبل ذلك الوقت.

للبدء، اضبط المعلمة [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND) وعيّن المعلمة [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME) على لحظة الخطأ (12:05 بتوقيت غرينتش) في ملف postgresql.conf (أو recovery.conf في الإصدار 11 أو أقدم).

```
# Place archive logs under /mnt/server/archivedir directory.
restore_command = 'cp /mnt/server/archivedir/%f %p'
recovery_target_time = &#34;2024-1-1 12:05 GMT&#34;
```

عند تشغيل PostgreSQL، يدخل وضع PITR إذا كان تجمّع قاعدة البيانات يحتوي على ملف **backup_label** وملف **recovery.signal** (أو recovery.conf في الإصدار 11 أو أقدم).

** recovery.conf / recovery.signal

أزال الإصدار 12 (2019) ملف recovery.conf؛ وأصبحت جميع معلمات الاستعادة تُكتب الآن في postgresql.conf.

لمعلومات مفصّلة، راجع [التوثيق الرسمي](https://www.postgresql.org/docs/current/runtime-config-wal.html#RUNTIME-CONFIG-WAL-ARCHIVE-RECOVERY).

في الإصدار 12 وما بعده، تتطلب استعادة خادم من نسخة احتياطية أساسية وجود ملف فارغ باسم **recovery.signal** في دليل تجمّع قاعدة البيانات.

```bash
$ touch /usr/local/pgsql/data/recovery.signal
```

تكاد عملية الاستعادة الزمنية (PITR) تكون مماثلة لعملية الاستعادة العادية الموصوفة في القسم 9.8. ولا يوجد سوى فرقين:

- **مصدر قطع WAL/سجلات الأرشيف:** في وضع الاستعادة العادية: تُقرأ قطع WAL من الدليل الفرعي pg_wal (أو pg_xlog في الإصدار 9.6 أو أقدم).
- في وضع PITR: تُقرأ قطع WAL من دليل الأرشيف المحدد في المعلمة [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND).

**مصدر موضع نقطة التفتيش:**

- في وضع الاستعادة العادية: يُقرأ الموضع من ملف pg_control.
- في وضع PITR: يُقرأ الموضع من ملف backup_label.

ويكون مخطط عملية PITR كما يلي:

1. يقرأ PostgreSQL القيمة ‘CHECKPOINT LOCATION’ من ملف backup_label باستخدام الدالة الداخلية read_backup_label() للعثور على نقطة إعادة التنفيذ.
2. يقرأ PostgreSQL قيم المعلمات من postgresql.conf (أو recovery.conf)، مثل [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND) و[recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME).
3. يبدأ PostgreSQL إعادة تنفيذ بيانات WAL من نقطة إعادة التنفيذ المستخرجة من ‘CHECKPOINT LOCATION’. ويقرأ النظام بيانات WAL من سجلات الأرشيف بتنفيذ [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND). وينسخ هذا الأمر السجلات من منطقة الأرشيف إلى منطقة مؤقتة. ويحذف PostgreSQL ملفات السجل المنسوخة بعد استخدامها. وفي هذا المثال، يعيد PostgreSQL تنفيذ بيانات WAL من نقطة إعادة التنفيذ حتى اللحظة السابقة مباشرةً لـ‘2024-1-1 12:05:00’. وإذا لم يُضبط هدف استعادة في postgresql.conf، يعيد PostgreSQL التنفيذ حتى نهاية سجلات الأرشيف.
4. عند اكتمال عملية الاستعادة، يُنشأ **ملف تاريخ الخط الزمني** (مثل 00000002.history) في الدليل الفرعي pg_wal. وإذا كانت ميزة الأرشفة مفعّلة، تُنشأ نسخة أيضًا في دليل الأرشيف. راجع القسم 10.3.2 للتفاصيل.

تحتوي سجلات عمليتي الالتزام والإلغاء على طابع زمني يشير إلى وقت حدوث كل عملية (معرّف في `xl_xact_commit` و`xl_xact_abort`).

** ** xl_xact_commit

```
/* Version 9.5 or later */
typedef struct xl_xact_commit
{
	TimestampTz xact_time;		/* time of commit */

	/* xl_xact_xinfo follows if XLOG_XACT_HAS_INFO */
	/* xl_xact_dbinfo follows if XINFO_HAS_DBINFO */
	/* xl_xact_subxacts follows if XINFO_HAS_SUBXACT */
	/* xl_xact_relfilelocators follows if XINFO_HAS_RELFILELOCATORS */
	/* xl_xact_stats_items follows if XINFO_HAS_DROPPED_STATS */
	/* xl_xact_invals follows if XINFO_HAS_INVALS */
	/* xl_xact_twophase follows if XINFO_HAS_TWOPHASE */
	/* twophase_gid follows if XINFO_HAS_GID. As a null-terminated string. */
	/* xl_xact_origin follows if XINFO_HAS_ORIGIN, stored unaligned! */
} xl_xact_commit;

/* Version 9.4 or earlier */
typedef struct xl_xact_commit
{
        TimestampTz	xact_time;          /* time of commit */
        uint32          xinfo;              /* info flags */
        int            	nrels;              /* number of RelFileNodes */
        int            	nsubxacts;          /* number of subtransaction XIDs */
        int            	nmsgs;              /* number of shared inval msgs */
        Oid            	dbId;               /* MyDatabaseId */
        Oid            	tsId;               /* MyDatabaseTableSpace */
        /* Array of RelFileNode(s) to drop at commit */
        RelFileNode     xnodes[1];          /* VARIABLE LENGTH ARRAY */
        /* ARRAY OF COMMITTED SUBTRANSACTION XIDs FOLLOWS */
        /* ARRAY OF SHARED INVALIDATION MESSAGES FOLLOWS */
} xl_xact_commit;
```

** ** xl_xact_abort

```
/* Version 9.5 or later */
typedef struct xl_xact_abort
{
	TimestampTz xact_time;		/* time of abort */

	/* xl_xact_xinfo follows if XLOG_XACT_HAS_INFO */
	/* xl_xact_dbinfo follows if XINFO_HAS_DBINFO */
	/* xl_xact_subxacts follows if XINFO_HAS_SUBXACT */
	/* xl_xact_relfilelocators follows if XINFO_HAS_RELFILELOCATORS */
	/* xl_xact_stats_items follows if XINFO_HAS_DROPPED_STATS */
	/* No invalidation messages needed. */
	/* xl_xact_twophase follows if XINFO_HAS_TWOPHASE */
	/* twophase_gid follows if XINFO_HAS_GID. As a null-terminated string. */
	/* xl_xact_origin follows if XINFO_HAS_ORIGIN, stored unaligned! */
} xl_xact_abort;

/* Version 9.4 or earlier */
typedef struct xl_xact_abort
{
        TimestampTz     xact_time;          /* time of abort */
        int            	nrels;              /* number of RelFileNodes */
        int             nsubxacts;          /* number of subtransaction XIDs */
        /* Array of RelFileNode(s) to drop at abort */
        RelFileNode     xnodes[1];          /* VARIABLE LENGTH ARRAY */
        /* ARRAY OF ABORTED SUBTRANSACTION XIDs FOLLOWS */
} xl_xact_abort;
```

لذلك، إذا ضُبط [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME)، يقرّر PostgreSQL ما إذا كان سيواصل الاستعادة كلما أعاد تنفيذ سجل التزام أو إلغاء. ويقارن PostgreSQL وقت الهدف بالطابع الزمني في السجل؛ فإذا تجاوز الطابع الزمني وقت الهدف، تنتهي عملية PITR.

** معلومات

الدالة read_backup_label() معرّفة في [xlog.c](https://github.com/postgres/postgres/blob/master/src/backend/access/transam/xlog.c). والبنيتان xl_xact_commit وxl_xact_abort معرّفتان في [xact.h](https://github.com/postgres/postgres/blob/master/src/include/access/xact.h).

# 10.3. معرّف الخط الزمني وملف تاريخ الخط الزمني

يستخدم PostgreSQL **الخط الزمني** (timeline) للتمييز بين تجمّع قاعدة البيانات الأصلي والتجمّعات المستعادة. وهو مفهوم محوري في PITR. ويصف هذا القسم عنصرين مرتبطين بالخط الزمني: معرّف الخط الزمني (timelineId) وملفات تاريخ الخط الزمني.

محتويات القسم

- 10.3.1. معرّف الخط الزمني
- 10.3.2. ملف تاريخ الخط الزمني

## 10.3.1. معرّف الخط الزمني

يُسنَد إلى كل خط زمني **معرّف الخط الزمني** (timelineId)، وهو عدد صحيح غير مُوقَّع من 4 بايتات يبدأ من 1.

ويخصّ كل خط زمني معرّفًا فريدًا لتجمّع قاعدة بيانات واحد. وتنشئ أداة initdb تجمّع قاعدة البيانات الأصلي بمعرّف خط زمني 1.

وكلما استُعيد تجمّع قاعدة بيانات، يزداد معرّف الخط الزمني بمقدار 1. فمثلًا، في القسم السابق، يكون معرّف الخط الزمني للتجمّع المستعاد من التجمّع الأصلي هو 2.

يوضّح الشكل 10.4 عملية PITR من منظور معرّف الخط الزمني.

![](/images/postgres-internals/pgsql10-fig-10-04.webp)

#### الشكل 10.4. علاقة معرّف الخط الزمني بين تجمّع قاعدة بيانات أصلي وتجمّع مستعاد.

1. للعودة إلى نقطة بداية الاستعادة، يُزال تجمّع قاعدة البيانات الحالي وتُستعاد نسخة احتياطية أساسية أُخذت في الماضي. ويمثّل المنحنى الأحمر في الشكل هذه الحالة.
2. بعد ذلك، يبدأ خادم PostgreSQL ويعيد تنفيذ بيانات WAL في سجلات الأرشيف. وتبدأ هذه العملية من نقطة إعادة التنفيذ التي أنشأها pg_backup_start وتستمر حتى هدف الاستعادة بتتبّع الخط الزمني الأولي (معرّف الخط الزمني 1). ويمثّل الخط الأزرق في الشكل هذه الحالة.
3. ثم يُسنَد معرّف خط زمني جديد 2 إلى تجمّع قاعدة البيانات المستعاد، ويعمل PostgreSQL على الخط الزمني الجديد.

وكما ذُكر في القسم 9.2، تساوي الخانات الثماني الأولى من اسم ملف قطعة WAL معرّف الخط الزمني لتجمّع قاعدة البيانات الذي أنشأ القطعة. وعندما يتغيّر معرّف الخط الزمني، يتغيّر اسم ملف قطعة WAL أيضًا.

ويمكن وصف عملية الاستعادة مرة أخرى بالتركيز على ملفات قطع WAL. لنفترض أن تجمّع قاعدة بيانات يُستعاد باستخدام سجلَي أرشيف ‘000000010000000000000009’ و‘00000001000000000000000A’. فيُسنَد إلى تجمّع قاعدة البيانات المستعاد حديثًا معرّف الخط الزمني 2، وينشئ PostgreSQL قطعة WAL بدءًا من ‘00000002000000000000000A’.

يوضّح الشكل 10.5 هذه الحالة.

![](/images/postgres-internals/pgsql10-fig-10-05.webp)

#### الشكل 10.5. علاقة ملفات قطع WAL بين تجمّع قاعدة بيانات أصلي وتجمّع مستعاد.

## 10.3.2. ملف تاريخ الخط الزمني

عند اكتمال عملية PITR، يُنشأ ملف تاريخ الخط الزمني (مثل ‘00000002.history’) في دليل الأرشيف والدليل الفرعي pg_wal (أو pg_xlog في الإصدار 9.6 أو أقدم). ويسجّل هذا الملف الخط الزمني الذي تفرّع منه ومتى.

وقاعدة تسمية هذا الملف معروضة أدناه:

- **نمط ملف تاريخ الخط الزمني:** `[TimelineId].history`

يحتوي ملف تاريخ الخط الزمني على سطر واحد على الأقل، ويتكوّن كل سطر من العناصر الثلاثة التالية:

- **timelineId:** معرّف الخط الزمني لسجلات الأرشيف المستخدمة في الاستعادة.
- **LSN:** موضع LSN الذي حدث فيه تبديل الخط الزمني.
- **reason:** شرح مقروء للبشر لسبب تغيّر الخط الزمني.

وفيما يلي مثال محدد:

```bash
$ cat /home/postgres/archivelogs/00000002.history
1	  0/A000198	before 2024-1-1 12:05:00.861324+00
```

والمعنى كما يلي:

> يستند تجمّع قاعدة البيانات (معرّف الخط الزمني 2) إلى النسخة الاحتياطية الأساسية من معرّف الخط الزمني 1. وقد استُعيد إلى ما قبل ‘2024-1-1 12:05:00.861324+00’ بإعادة تنفيذ سجلات الأرشيف حتى LSN ‘0/A000198’.

وبهذه الطريقة، يوفّر كل ملف تاريخ خط زمني سجلًا كاملًا لتجمّع قاعدة بيانات مستعاد بعينه. علاوة على ذلك، تستخدم عملية PITR نفسها هذا الملف. ويشرح القسم التالي التفاصيل.

** معلومات

تغيّر تنسيق ملف تاريخ الخط الزمني في الإصدار 9.3 (2013).

والتنسيقان معروضان أدناه:

في الإصدار 9.3 وما بعده:

```
timelineId	LSN	&#34;reason&#34;
```

حتى الإصدار 9.2:

```
timelineId	WAL_segment	&#34;reason&#34;
```

# 10.4. الاستعادة الزمنية باستخدام ملف تاريخ الخط الزمني

ملف تاريخ الخط الزمني ضروري لتنفيذ عملية الاستعادة الزمنية (PITR) الثانية وما بعدها. ويوضّح المثال التالي فائدته خلال محاولة استعادة ثانية.

تأمّل سيناريو يحدث فيه خطأ عند ‘12:15:00’ في تجمّع قاعدة بيانات مستعاد بمعرّف خط زمني 2. لاستعادة قاعدة البيانات إلى هذه النقطة، ينبغي إعداد ملف postgresql.conf (أو recovery.conf في الإصدار 11 أو أقدم) كما يلي:

```
restore_command = 'cp /mnt/server/archivedir/%f %p'
recovery_target_time = &#34;2024-1-1 12:15:00 GMT&#34;
recovery_target_timeline = 2
```

تحدّد المعلمة [recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME) وقت الاستعادة المطلوب. وتُضبط المعلمة [recovery_target_timeline](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIMELINE) على 2 للاستعادة على طول ذلك الخط الزمني تحديدًا.

تؤدي إعادة تشغيل خادم PostgreSQL إلى الدخول في وضع PITR واستعادة قاعدة البيانات إلى الوقت الهدف على طول معرّف الخط الزمني 2 (انظر الشكل 10.6).

![](/images/postgres-internals/pgsql10-fig-10-06.webp)

#### الشكل 10.6. استعادة قاعدة البيانات عند 12:15:00 على طول معرّف الخط الزمني 2.

أثناء الاستعادة، ينفّذ PostgreSQL الخطوات التالية:

1. يقرأ PostgreSQL قيمة ‘CHECKPOINT LOCATION’ من ملف backup_label.
2. يقرأ PostgreSQL قيم المعلمات من postgresql.conf (أو recovery.conf في الإصدار 11 أو أقدم)؛ وفي هذا المثال، [restore_command](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RESTORE-COMMAND) و[recovery_target_time](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIME) و[recovery_target_timeline](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIMELINE).
3. يقرأ PostgreSQL ملف تاريخ الخط الزمني “00000002.history” المقابل لقيمة [recovery_target_timeline](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-RECOVERY-TARGET-TIMELINE).
4. يعيد PostgreSQL تنفيذ بيانات WAL باستخدام هذه الخطوات: من نقطة إعادة التنفيذ حتى LSN ‘0/A000198’ (المحدد في ملف 00000002.history)، يقرأ PostgreSQL بيانات WAL من سجلات الأرشيف ذات معرّف الخط الزمني 1 ويعيد تنفيذها.
5. من النقطة بعد LSN ‘0/A000198’ إلى النقطة قبل الطابع الزمني ‘2024-1-1 12:15:00’، يقرأ PostgreSQL بيانات WAL من سجلات الأرشيف ذات معرّف الخط الزمني 2 ويعيد تنفيذها.

عند اكتمال عملية الاستعادة، يتقدّم معرّف الخط الزمني الحالي إلى 3. وينشئ PostgreSQL ملف تاريخ خط زمني جديدًا “00000003.history” في الدليل الفرعي pg_wal (أو pg_xlog في الإصدار 9.6 أو أقدم) وفي دليل الأرشيف.

```bash
$ cat /home/postgres/archivelogs/00000003.history
1         0/A000198     before 2024-1-1 12:05:00.861324+00

2         0/B000078     before 2024-1-1 12:15:00.927133+00
```

ولعمليات PITR المتعددة، يجب ضبط معرّف الخط الزمني المناسب صراحةً لضمان استخدام ملف تاريخ الخط الزمني الصحيح.

وتعمل ملفات تاريخ الخط الزمني لا كسجلات لتاريخ تجمّع قاعدة البيانات فحسب، بل أيضًا كتعليمات استعادة لعملية PITR.

# 10.5. النسخ الاحتياطي التزايدي

النسخ الاحتياطية المنتظمة ضرورية للتشغيل الطبيعي. ومع ذلك، يستهلك الاحتفاظ بعدة نسخ احتياطية كاملة مساحة تخزين كبيرة.

ولمعالجة هذه المشكلة، قدّم PostgreSQL النسخ الاحتياطية التزايدية في الإصدار 17 (2024). ويحفظ النسخ الاحتياطي التزايدي الأجزاء المتغيّرة فقط من الملفات المعدَّلة منذ النسخة الاحتياطية السابقة.

تصف الأقسام الفرعية التالية نظرة عامة على النسخ الاحتياطية التزايدية، وعملية إنشائها باستخدام pg_basebackup، وتنسيق البيانات الداخلي.

محتويات القسم

- 10.5.1. نظرة عامة على النسخ الاحتياطي التزايدي
- 10.5.2. كيفية أخذ نسخ احتياطية تزايدية
- 10.5.3. تنسيق ملف INCREMENTAL

## 10.5.1. نظرة عامة على النسخ الاحتياطي التزايدي

### 10.5.1.1. أخذ نسخة احتياطية تزايدية

يعتمد النسخ الاحتياطي التزايدي على نسخة احتياطية كاملة وملفات ملخّص WAL. وتجمع هذه الملفات عملية مُلخِّص WAL، الموصوفة في القسم 9.6.2. ويبدأ هذا القسم بشرح النسخة الاحتياطية الكاملة الأولية.

1. **أخذ النسخة الاحتياطية الكاملة:** بعد إصدار do_pg_backup_start()، تُؤخذ نسخة احتياطية كاملة. وتحتوي هذه النسخة على جميع ملفات العلاقات. ويفترض هذا الشرح أن نقطة إعادة التنفيذ للنسخة الاحتياطية الكاملة هي $REDO_{full}$.
2. **تتبّع التغييرات:** تتتبّع عملية مُلخِّص WAL التغييرات في جميع كتل قاعدة البيانات وتكتب هذه التعديلات في ملفات ملخّص WAL.
3. **أخذ النسخة الاحتياطية التزايدية:** لنفترض أن نقطة إعادة التنفيذ لهذه النسخة التزايدية هي $REDO_{inc01}$. وباستخدام ملفات الملخّص المتولّدة بين $REDO_{full}$ و$REDO_{inc01}$، يحفظ النسخ الاحتياطي التزايدي الكتل المتغيّرة فقط بدلًا من ملفات العلاقات كاملة.

![](/images/postgres-internals/pgsql10-fig-10-07.webp)

#### الشكل 10.7. مفهوم أخذ نسخة احتياطية تزايدية.

وهناك نقطتان مهمتان بشأن هذه العملية:

- تُخزَّن ملفات العلاقات وخرائط الظهور كملفات نسخ احتياطي تزايدية، بينما **تُنسخ ملفات خريطة المساحة الحرة (FSM) كاملة دائمًا**. وذلك لأن تفريعات FSM لا يتتبّعها مُلخِّص WAL، كما ذُكر في القسم 9.6.2.
- إذا أُنشئت علاقة بعد النسخة الاحتياطية السابقة، ينسخ النظام ملف العلاقة كاملًا.

وتتبع ملفات النسخ الاحتياطي التزايدي اصطلاحات التسمية التالية:

- **العلاقة:** `INCREMENTAL.{oid}`
- **خريطة الظهور:** `INCREMENTAL.{oid}_vm`

فمثلًا، يُسمى ملف النسخ الاحتياطي التزايدي للجدول t1 (OID = 16551) ‘INCREMENTAL.16551’.

ويوضّح المثال التالي ملفي النسخة الكاملة والتزايدية للجدول t1:

```bash
$ ls -la -h backup/full/base/16425/ | grep &#34;16551$&#34;
-rw------- 1 postgres postgres 32K Oct 17 11:11 16551
16551
$ ls -la -h backup/inc01/base/16425/ | grep &#34;16551$&#34;
-rw------- 1 postgres postgres 24K Oct 17 11:20 INCREMENTAL.16551
INCREMENTAL.16551
```

### 10.5.1.2. إعادة بناء النسخة الاحتياطية

يوفّر PostgreSQL أداة [pg_combinebackup](https://www.postgresql.org/docs/current/app-pgcombinebackup.html) لإعادة بناء نسخة احتياطية أساسية من النسخ الاحتياطية التزايدية.

إذا كانت نسخة احتياطية كاملة موجودة في ‘/usr/local/pgsql/backup/full’ ونسخة تزايدية في ‘/usr/local/pgsql/backup/inc01’، فإن الأمر التالي يعيد بناء النسخة الاحتياطية الأساسية تحت ‘/usr/local/pgsql/reconstructed’:

```bash
$ pg_combinebackup -d -n -o /usr/local/pgsql/reconstructed  \
>    /usr/local/pgsql/backup/full/  \
>    /usr/local/pgsql/backup/inc01/
```

يوضّح الشكل 10.8 كيفية إعادة بناء pg_combinebackup لنسخة احتياطية أساسية. وجوهر الأمر أن pg_combinebackup تطبّق تغييرات الكتل المخزّنة في ملف النسخ الاحتياطي التزايدي على ملف العلاقة الأصلي.

فمثلًا، إذا كان الجدول t1 (OID=16551) موجودًا في النسخة الاحتياطية الكاملة وكانت نسخة تزايدية تحتوي على INCREMENTAL.16551، تكتب pg_combinebackup فوق الكتل المتغيّرة (مثل الكتلتين 0 و3) من الملف التزايدي في الملف الأصلي ‘16551’.

![](/images/postgres-internals/pgsql10-fig-10-08.webp)

#### الشكل 10.8. مفهوم إعادة بناء نسخة احتياطية أساسية.

## 10.5.2. كيفية أخذ نسخ احتياطية تزايدية

لأخذ نسخة احتياطية تزايدية، استخدم الخيار ‘&ndash;incremental’ متبوعًا بمسار ملف بيان النسخة الاحتياطية السابقة.

فمثلًا، لأخذ نسخة احتياطية تزايدية من المضيف 192.168.1.10 إلى الدليل المحلي ‘/usr/local/pgsql/backup/inc01’ استنادًا إلى النسخة الاحتياطية الكاملة في ‘/usr/local/pgsql/backup/full’، نفّذ الأمر التالي:

```bash
$ pg_basebackup -h 192.168.1.10 -p 5432 \
>   --incremental /usr/local/pgsql/backup/full/backup_manifest \
>   -D /usr/local/pgsql/backup/inc01 -X stream -P -v
```

يوضّح الشكل 10.9 تسلسل أخذ pg_basebackup لنسخة احتياطية تزايدية:

![](/images/postgres-internals/pgsql10-fig-10-09.webp)

#### الشكل 10.9. تسلسل عمل pg_basebackup في وضع النسخ الاحتياطي التزايدي.

- (1) طلب اتصال
- (2) إنشاء عملية walsender
- (3) إرسال ملف بيان النسخة الاحتياطية: ترسل pg_basebackup ملف backup_manifest الخاص بالنسخة السابقة.
- (4) تهيئة معلمات النسخ الاحتياطي التزايدي: تستدعي عملية walsender الدالة FinalizeIncrementalManifest() لاسترجاع الخط الزمني وStart-LSN من ملف بيان النسخة السابقة.
- (5) طلب نسخة احتياطية أساسية
- (6) تنفيذ do_pg_backup_start()
- (7) تحديد الكتل المعدَّلة: تستدعي عملية walsender الدالة PrepareForIncrementalbackup() لإنشاء قائمة بجميع كتل العلاقات المعدَّلة. وتحدّد هذه التغييرات بتحليل ملفات الملخّص من Start-LSN (المسترجع في الخطوة 4) إلى أحدث نقطة إعادة تنفيذ (المتولّدة في الخطوة 6).
- (8) إرسال ملفات INCREMENTAL: ترسل عملية walsender ملفات نسخ احتياطي تزايدية بدلًا من ملفات العلاقات وخرائط الظهور كاملة. وتتكوّن هذه الملفات من كتلة ترويسة وكتل متغيّرة، وفقًا للقائمة المنشأة في الخطوة 7.
- (9) تنفيذ do_pg_backup_stop()
- (10) إرسال ملفات WAL
- (11) إرسال ملف backup_manifest

وفي الخطوة 8، ترسل عملية walsender ملف العلاقة كاملًا إذا كانت العلاقة قد أُنشئت بعد النسخة الاحتياطية السابقة.

لأخذ النسخة الاحتياطية التزايدية التالية، نفّذ الأمر التالي مع توجيه الخيار ‘&ndash;incremental’ إلى ملف بيان النسخة الاحتياطية التزايدية السابقة:

```bash
$ pg_basebackup -h 192.168.1.10 -p 5432 \
>   --incremental /usr/local/pgsql/backup/inc01/backup_manifest \
>   -D /usr/local/pgsql/backup/inc02 -X stream -P -v
```

## 10.5.3. تنسيق ملف INCREMENTAL

يتكوّن ملف INCREMENTAL عادةً من كتلة ترويسة وكتل معدَّلة، حجم كل منها 8 كيلوبايت.

![](/images/postgres-internals/pgsql10-fig-10-10.webp)

#### الشكل 10.10. تنسيق ملف INCREMENTAL.

وتحتوي كتلة الترويسة على أربعة أنواع من المعلومات:

- **رقم سحري (Magic Number)**: تبدأ الترويسة بـ‘0xd3ae1f0d’ لتحديدها كملف نسخ احتياطي تزايدي.
- **num_incremental_block**: عدد الكتل المعدَّلة.
- **truncation_block_length**: تمثّل هذه القيمة عادةً العدد الكلي للكتل في الجدول وخريطة الظهور المقابلين لهذا الملف. ووفقًا للمعالجة الداخلية، قد تتجاوز هذه القيمة. انظر [الشيفرة المصدرية](https://github.com/postgres/postgres/blob/7f3b41ce48a58f090da94dbcc737483c217ce9c3/src/backend/backup/basebackup_incremental.c#L845) للتفاصيل.
- **قائمة أرقام الكتل المعدَّلة**: تخزّن أرقام الكتل المعدَّلة. فمثلًا، إذا عُدِّلت الكتلتان 0 و3، تخزّن “0” و“3”.

تكون كتلة الترويسة عادةً 8 كيلوبايت، أو مضاعفًا لـ8 كيلوبايت. وتُحشى الكتلة بالأصفار للحفاظ على محاذاة 8 كيلوبايت بعد قائمة أرقام الكتل. وإذا تجاوزت القائمة 8 كيلوبايت، يضيف PostgreSQL كتل ترويسة إضافية.

وإذا اقتُطع جدول أو أُسقط أو **بقي دون تغيير**، تصبح كتلة ترويسة 12 بايتًا تحتوي على ثلاثة حقول: رقم سحري، وnum_incremental_block مضبوط على 0، وtruncation_block_length يساوي 1. ويصبح ملف INCREMENTAL نفسه أيضًا ملفًا بحجم 12 بايت يحتوي على هذه الترويسة فقط.

يوضّح الشكل 10.11 أربعة أمثلة على ملفات INCREMENTAL، كما هو مشروح في القسم 9.6.2.2:

![](/images/postgres-internals/pgsql10-fig-10-11.webp)

#### الشكل 10.11. أربعة أمثلة على ملفات INCREMENTAL
