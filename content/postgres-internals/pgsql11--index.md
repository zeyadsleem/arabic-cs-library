---
title: "النسخ المتماثل المتدفّق"
lang: ar
source: https://www.interdb.jp/pg/pgsql11/index.html
---

# 11.1. بدء النسخ المتماثل المتدفّق

في النسخ المتماثل المتدفّق، تعمل ثلاثة أنواع من العمليات تعاونيًا:

- عملية **walsender** على الخادم الأساسي ترسل بيانات WAL إلى الخادم الاحتياطي.
- عملية **walreceiver** على الخادم الاحتياطي تستقبل بيانات WAL وتعيد تنفيذها.
- عملية **startup** على الخادم الاحتياطي تبدأ عملية walreceiver.

تتواصل عمليتا walsender وwalreceiver عبر اتصال TCP واحد.

يوضّح الشكل 11.1 تسلسل بدء النسخ المتماثل المتدفّق:

![](/images/postgres-internals/pgsql11-fig-11-01.webp)

#### الشكل 11.1. تسلسل بدء النسخ المتماثل المتدفّق.

- (1) تشغيل الخادمين الأساسي والاحتياطي.
- (2) يبدأ الخادم الاحتياطي عملية startup.
- (3) يبدأ الخادم الاحتياطي عملية walreceiver.
- (4) ترسل عملية walreceiver طلب اتصال إلى الخادم الأساسي. وإذا لم يكن الخادم الأساسي يعمل، ترسل عملية walreceiver هذه الطلبات دوريًا.
- (5) عندما يستقبل الخادم الأساسي طلب اتصال، يبدأ عملية walsender. ثم يُنشأ اتصال TCP بين walsender وwalreceiver.
- (6) ترسل عملية walreceiver أحدث LSN (رقم تسلسل السجل) لتجمّع قاعدة البيانات على الخادم الاحتياطي. وتُعرف هذه المبادلة بـ**المصافحة** (handshaking).
- (7) إذا كان أحدث LSN على الخادم الاحتياطي أقل من أحدث LSN على الخادم الأساسي (LSN الاحتياطي < LSN الأساسي)، يرسل walsender بيانات WAL من LSN الأول إلى LSN الثاني. ويوفّر الدليل الفرعي pg_wal على الخادم الأساسي (أو pg_xlog في الإصدار 9.6 أو أقدم) قطع WAL هذه. ثم يعيد الخادم الاحتياطي تنفيذ بيانات WAL المستلمة. وفي هذه المرحلة، يلحق الخادم الاحتياطي بالخادم الأساسي، وهو ما يُسمى **اللحاق** (catch-up).
- (8) يبدأ النسخ المتماثل المتدفّق بالعمل.

تحتفظ كل عملية walsender بحالة تقابل مرحلة عمل walreceiver أو التطبيق المتصل. والحالات الممكنة لعملية walsender هي:

- **start-up** - من بداية walsender حتى نهاية المصافحة. انظر الشكلين 11.1(5)-(6).
- **catch-up** - خلال مرحلة اللحاق. انظر الشكل 11.1(7).
- **streaming** - بينما يعمل النسخ المتماثل المتدفّق. انظر الشكل 11.1(8).
- **backup** - أثناء إرسال ملفات تجمّع قاعدة البيانات بأكمله لأدوات النسخ الاحتياطي مثل أداة [pg_basebackup](http://www.postgresql.org/docs/current/static/app-pgbasebackup.html).

يعرض العرض [pg_stat_replication](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-REPLICATION-VIEW) حالة جميع عمليات walsender قيد التشغيل. وفيما يلي مثال:

```
testdb=# SELECT application_name,state FROM pg_stat_replication;
 application_name |   state
------------------+-----------
 standby1         | streaming
 standby2         | streaming
 pg_basebackup    | backup
(3 rows)
```

كما هو موضّح أعلاه، تعمل عمليتا walsender لإرسال بيانات WAL لخادمي النسخ الاحتياطي المتصلين، وتعمل عملية أخرى لإرسال جميع ملفات تجمّع قاعدة البيانات من أجل أداة [pg_basebackup](http://www.postgresql.org/docs/current/static/app-pgbasebackup.html).

## 11.1.1. ماذا يحدث عندما يُعاد تشغيل الخادم الاحتياطي بعد توقّف طويل؟

في الإصدار 9.3 أو أقدم، لا يستطيع الخادم الاحتياطي اللحاق بالخادم الأساسي إذا كانت قطع WAL المطلوبة قد أُعيد تدويرها بالفعل على الخادم الأساسي.

ولا يوجد حل موثوق لهذه المشكلة سوى ضبط قيمة كبيرة لمعلمة الإعداد [wal_keep_size](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-KEEP-SIZE) (أو wal_keep_segments في الإصدار 12 أو أقدم). وتقلّل هذه المعلمة احتمال حدوث المشكلة، لكنها تبقى حلًا مؤقتًا.

وفي الإصدار 9.4 أو أحدث، يمكن لـ**فتحات النسخ** (replication slots) منع هذه المشكلة. وفتحة النسخ ميزة توسّع مرونة إرسال بيانات WAL. راجع القسم 11.4 للتفاصيل.

# 11.2. كيفية تنفيذ النسخ المتماثل المتدفّق

يتضمّن النسخ المتماثل المتدفّق جانبين رئيسيين: شحن السجلات ومزامنة قاعدة البيانات.

- **شحن السجلات:** هذه هي الآلية الجوهرية التي يرسل فيها الخادم الأساسي بيانات WAL باستمرار إلى خوادم النسخ الاحتياطي المتصلة فور كتابتها.
- **مزامنة قاعدة البيانات:** هذه خاصة بالنسخ المتماثل المتزامن، حيث ينسّق الخادم الأساسي مع كل خادم احتياطي لضمان بقاء تجمّعات قواعد بياناتها متزامنة.

يتطلب الفهم الدقيق للنسخ المتماثل المتدفّق معرفة كيف يدير خادم أساسي واحد خوادم احتياطية متعددة. ويبدأ هذا القسم بحالة بسيطة (نظام بخادم أساسي واحد وخادم احتياطي واحد) قبل مناقشة الحالة العامة (نظام بخادم أساسي واحد وخوادم احتياطية متعددة) في القسم التالي.

محتويات القسم

- 11.2.1. التواصل بين الخادم الأساسي وخادم احتياطي متزامن
- 11.2.2. اكتشاف أعطال خوادم النسخ الاحتياطي
- 11.2.3. التعامل مع الأعطال في النسخ المتماثل المتزامن
- 11.2.4. التعارضات

## 11.2.1. التواصل بين الخادم الأساسي وخادم احتياطي متزامن

لنفترض أن الخادم الاحتياطي في وضع النسخ المتماثل المتزامن، وأن المعلمة [hot_standby](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY) معطّلة، وأن [wal_level](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-LEVEL) مضبوطة على ‘*replica*’. وإعداد الخادم الأساسي كما يلي:

```
synchronous_standby_names = 'standby1'
hot_standby = off
wal_level = replica
```

من بين المُطلِقات الثلاثة لكتابة بيانات WAL المذكورة في القسم 9.5، يركّز هذا القسم على عمليات الالتزام بالمعاملات.

لنفترض أن عملية خلفية واحدة على الخادم الأساسي تصدر عبارة INSERT بسيطة في وضع الالتزام التلقائي. فتبدأ العملية الخلفية معاملة، وتصدر العبارة، وتلتزم فورًا. ويوضّح الشكل 11.2 تسلسل عملية الالتزام هذه:

![](/images/postgres-internals/pgsql11-fig-11-02.webp)

#### الشكل 11.2. مخطط تسلسل التواصل في النسخ المتماثل المتدفّق.

- (1) تكتب العملية الخلفية بيانات WAL وتدفعها إلى ملف قطعة WAL بتنفيذ XLogInsert() وXLogFlush().
- (2) ترسل عملية walsender بيانات WAL من قطعة WAL إلى عملية walreceiver.
- (3) بعد إرسال البيانات، تنتظر العملية الخلفية استجابة ACK من الخادم الاحتياطي. وتحديدًا، تحصل العملية الخلفية على مزلاج (latch) عبر الدالة الداخلية SyncRepWaitForLSN() وتنتظر تحريره.
- (4) تكتب عملية walreceiver على الخادم الاحتياطي بيانات WAL المستلمة في قطعة WAL الخاصة بالخادم الاحتياطي باستخدام استدعاء النظام write() وترجع استجابة ACK إلى walsender.
- (5) تدفع عملية walreceiver بيانات WAL إلى قطعة WAL باستخدام fsync()، وترجع استجابة ACK أخرى إلى walsender، وتُعلم عملية startup بأن بيانات WAL قد حُدِّثت.
- (6) تعيد عملية startup تنفيذ بيانات WAL المكتوبة في قطعة WAL.
- (7) تحرّر عملية walsender مزلاج العملية الخلفية عند استقبال استجابة ACK من walreceiver. ثم تُكمل العملية الخلفية عملية الالتزام أو الإلغاء. ويتوقف توقيت هذا التحرير على المعلمة [synchronous_commit](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT): إذا ضُبطت على ‘on’ (الافتراضي)، يُحرَّر المزلاج عند استقبال ACK من الخطوة (5).
- وإذا ضُبطت على ‘remote_write’، يُحرَّر المزلاج عند استقبال ACK من الخطوة (4).

وتُعلم كل استجابة ACK الخادم الأساسي بالحالة الداخلية للخادم الاحتياطي. وهي تحتوي على أربعة عناصر:

- موضع LSN الذي كُتبت فيه أحدث بيانات WAL.
- موضع LSN الذي دُفعت فيه أحدث بيانات WAL.
- موضع LSN الذي أعادت فيه عملية startup تنفيذ أحدث بيانات WAL.
- الطابع الزمني لإرسال الاستجابة.

** ** XLogWalRcvSendReply

```
XLogWalRcvSendReply(void)@src/backend/replication/walreceiver.c
	/* Construct a new message */
	writePtr = LogstreamResult.Write;
	flushPtr = LogstreamResult.Flush;
	applyPtr = GetXLogReplayRecPtr(NULL);

	resetStringInfo(&reply_message);
	pq_sendbyte(&reply_message, 'r');
	pq_sendint64(&reply_message, writePtr);
	pq_sendint64(&reply_message, flushPtr);
	pq_sendint64(&reply_message, applyPtr);
	pq_sendint64(&reply_message, GetCurrentTimestamp());
	pq_sendbyte(&reply_message, requestReply ? 1 : 0);
```

ترجع عملية walreceiver استجابات ACK عند كتابة بيانات WAL أو دفعها، وبشكل دوري كنَبْضة قلب (heartbeat). ونتيجة لذلك، يحتفظ الخادم الأساسي دائمًا بحالة دقيقة لجميع خوادم النسخ الاحتياطي المتصلة.

ويعرض الاستعلام التالي المعلومات المتعلقة بـLSN لخوادم النسخ الاحتياطي المتصلة:

```
testdb=# SELECT application_name AS host,
        write_location AS write_LSN, flush_location AS flush_LSN,
        replay_location AS replay_LSN FROM pg_stat_replication;

   host   | write_lsn | flush_lsn | replay_lsn
----------+-----------+-----------+------------
 standby1 | 0/5000280 | 0/5000280 | 0/5000280
 standby2 | 0/5000280 | 0/5000280 | 0/5000280
(2 rows)
```

** معلومات

تُضبط فترة نَبْضة القلب بالمعلمة [wal_receiver_status_interval](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-RECEIVER-STATUS-INTERVAL) (الافتراضي: 10 ثوانٍ).

## 11.2.2. اكتشاف أعطال خوادم النسخ الاحتياطي

يستخدم النسخ المتماثل المتدفّق إجراءين شائعين لاكتشاف الأعطال:

1. **اكتشاف عطل عملية الخادم الاحتياطي**: يقرّر الخادم الأساسي العطل *فورًا* إذا اكتشف انقطاع الاتصال بين walsender وwalreceiver.
2. ويقرّر الخادم الأساسي أيضًا العطل *فورًا* إذا أرجعت دالة شبكة منخفضة المستوى خطأ أثناء الوصول إلى مقبس walreceiver.
3. **اكتشاف عطل العتاد والشبكات**: يقرّر الخادم الأساسي العطل إذا لم تستجب عملية walreceiver خلال فترة [wal_sender_timeout](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-SENDER-TIMEOUT) (الافتراضي: 60 ثانية).
4. قد يستغرق تأكيد عطل الخادم الاحتياطي حتى *wal_sender_timeout* ثانية إذا تعذّر على الخادم الاحتياطي إرسال الاستجابات بسبب أعطال العتاد أو الشبكة.

ولا يكون اكتشاف العطل فوريًا دائمًا، وقد يتضمن تأخرًا زمنيًا وفقًا لسبب العطل.

## 11.2.3. التعامل مع الأعطال في النسخ المتماثل المتزامن

يكون سلوك الخادم الأساسي بالغ الأهمية عند تعطّل خادم احتياطي متزامن.

إذا تعطّل الخادم الاحتياطي وتوقف عن إرجاع استجابات ACK، ينتظر الخادم الأساسي تلك الاستجابات إلى أجل غير مسمى. ولأن النسخ المتماثل المتدفّق يفتقر إلى آلية للعودة تلقائيًا إلى الوضع غير المتزامن بعد مهلة، تتوقف جميع عمليات الخادم الأساسي &mdash; بما فيها الالتزام بالمعاملات ومعالجة الاستعلامات اللاحقة &mdash; حتى يُكتشف العطل ويُعالَج.

ولتجنّب توقف عمليات الخادم الأساسي كليًا، ضع في الاعتبار الاستراتيجيات التالية:

**زيادة التوافر:** استخدم عدة خوادم احتياطية ليتمكن الخادم الأساسي من مواصلة العمل إذا تعطّل أحدها. **التجاوز اليدوي إلى الوضع غير المتزامن:** إذا اكتُشف عطل دائم، يمكن تبديل الوضع من متزامن إلى غير متزامن بتنفيذ الخطوات التالية: اضبط المعلمة [synchronous_standby_names](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-SYNCHRONOUS-STANDBY-NAMES) على سلسلة فارغة.

```
synchronous_standby_names = ''
```

نفّذ الأمر pg_ctl مع خيار *reload*.

```bash
$ pg_ctl -D $PGDATA reload
```

لا يؤثر هذا الإجراء في العملاء المتصلين. فيواصل الخادم الأساسي معالجة المعاملات، وتبقى جميع الجلسات بين العملاء وعملياتها الخلفية.

## 11.2.4. التعارضات

في النسخ المتماثل المتدفّق، يمكن للخوادم الاحتياطية تنفيذ أوامر SELECT بشكل مستقل عن الخادم الأساسي. ومع ذلك، قد تنشأ تعارضات بين الخادم الاحتياطي والخادم الأساسي في ظروف معينة، ما قد يؤدي إلى أخطاء.

يوضّح الشكل 11.3 مثالًا نموذجيًا: يُسقط الخادم الأساسي جدولًا يقوم الخادم الاحتياطي بتحديده.

![](/images/postgres-internals/pgsql11-fig-11-03.webp)

#### الشكل 11.3. تعارض ناتج عن DROP TABLE.

- (1) يحدّد الخادم الاحتياطي جدولًا.
- (2) يُسقط الخادم الأساسي الجدول الذي يحدّده الخادم الاحتياطي حاليًا.
- (3) يرسل الخادم الأساسي سجلات XLOG المتعلقة بأمر DROP TABLE.
- (4) يعلّق الخادم الاحتياطي إعادة تنفيذ بيانات WAL الخاصة بأمر DROP TABLE مدة 30 ثانية افتراضيًا (قابلة للضبط عبر [max_standby_archive_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-ARCHIVE-DELAY) أو [max_standby_streaming_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-STREAMING-DELAY)).
- (5) إذا لم يُحلّ التعارض خلال الوقت المحدد (أي لم تكتمل عبارة SELECT)، ترجع عبارة SELECT خطأ وتنتهي.

- الخادم الأساسي

```
testdb=# -- Primary

testdb=# DROP TABLE tbl;
DROP TABLE

testdb=#
```

- الخادم الاحتياطي

```
testdb=# -- Standby
testdb=# SELECT count(*) FROM tbl;

ERROR:  canceling statement due to conflict with recovery
DETAIL:  User was holding a relation lock for too long.
```

سبب هذا التعارض هو بيانات WAL المتولّدة عن **قفل الوصول الحصري** الذي يحصل عليه أمر DROP TABLE داخليًا على الخادم الأساسي[1](#fn:1). وتتعارض بيانات WAL هذه مع عبارة SELECT على الخادم الاحتياطي. (وكما هو موضّح في القسم 9.5.1، تتضمّن بيانات WAL ليس فقط تغييرات البيانات بل أيضًا معلومات الأقفال.)

ووفقًا لـ[التوثيق الرسمي](https://www.postgresql.org/docs/current/hot-standby.html#HOT-STANDBY-CONFLICT)، تنقسم أسباب التعارضات إلى ثلاثة أنواع:

1. **أقفال الوصول الحصري على الخادم الأساسي**: تتعارض هذه مع أي قفل على الخادم الاحتياطي. راجع [التوثيق الرسمي](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-TABLES) للأوامر التي تحصل على هذه الأقفال، مثل LOCK IN ACCESS EXCLUSIVE MODE وDROP TABLE وTRUNCATE وREINDEX وVACUUM FULL.
2. **إسقاط قواعد البيانات أو فضاءات الجداول**.
3. **تطبيق سجل تنظيف vacuum من WAL**: يحدث ذلك إذا كانت معاملات الخادم الاحتياطي لا تزال ترى صفوفًا قيد الإزالة أو إذا كانت الاستعلامات تصل إلى الصفحة المتأثرة.

وهذا مثال آخر: يحذف الخادم الأساسي صفوفًا وينفّذ أمر VACUUM على جدول يحدّده الخادم الاحتياطي.

- الخادم الأساسي

```sql
testdb=# -- Primary

testdb=# DELETE FROM FROM tbl
testdb-#      WHERE data > 100000;
DELETE 1050

testdb=# VACUUM tbl;
VACUUM

testdb=#
```

- الخادم الاحتياطي

```
testdb=# -- Standby
testdb=# SELECT count(*) FROM tbl;

ERROR:  canceling statement due to conflict with recovery
DETAIL:  User query might have needed to see row versions that must be removed.
```

تكون التعارضات الناتجة عن معالجة VACUUM مزعجة بشكل خاص لأنها تحدث أثناء أوامر VACUUM الصريحة وعمليات vacuum التلقائي أيضًا (الموصوفة في القسم 6.5).

### 11.2.4.1. تخفيف التعارضات الناتجة عن الأقفال

على خوادم النسخ الاحتياطي، تقلّل زيادة قيمتي [max_standby_archive_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-ARCHIVE-DELAY) و[max_standby_streaming_delay](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-STANDBY-STREAMING-DELAY) (الافتراضي: 30 ثانية) التعارضات. ويتيح هذان الإعدادان للخادم الاحتياطي تأخير إعادة تنفيذ بيانات WAL، ما يقلّل احتمال الأخطاء.

ومع ذلك، لا يمكن لهاتين المعلمتين إزالة التعارضات دائمًا.

وبالإضافة إلى ذلك، فإنهما تؤثران في العمليات الخلفية الأخرى على الخادم الاحتياطي بمنعها من الوصول إلى أحدث البيانات خلال التأخير. ونتيجة لذلك، لا يكون الخادم الاحتياطي متزامنًا تمامًا خلال هذه التعارضات.

ويجب على المسؤولين ضبط هاتين المعلمتين مع الموازنة الدقيقة بين هذه المقايضات التشغيلية.

### 11.2.4.2. تجنّب التعارضات الناتجة عن معالجة vacuum

على الخادم الأساسي، يؤدي ضبط المعلمة [hot_standby_feedback](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY-FEEDBACK) (الافتراضي: معطّلة) على “on” إلى تجنّب التعارضات الناتجة عن vacuum. واستنادًا إلى حالة الخادم الاحتياطي، يؤخّر الخادم الأساسي حذف البيانات التي لا يزال الخادم الاحتياطي بحاجة إليها.

ويرسل الخادم الاحتياطي حالته إلى الخادم الأساسي على فترات تحدّدها [wal_receiver_status_interval](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-RECEIVER-STATUS-INTERVAL) (الافتراضي: 10 ثوانٍ).

ومع أن *hot_standby_feedback* تحلّ تعارضات vacuum، فإن لها عيوبًا على الخادم الأساسي:

- **انتفاخ الجداول والفهارس**: يحول الاحتفاظ بالصفوف القديمة المرئية للخادم الاحتياطي دون تنفيذ vacuum، ما يزيد انتفاخ الجداول والفهارس على الخادم الأساسي.
- **مشكلات تراكم WAL:** قد يؤدي تراكم بيانات إضافية من أجل اتساق الخادم الاحتياطي إلى زيادة استهلاك WAL.

** pg_stat_database_conflicts

يؤدي الاستعلام عن العرض [pg_stat_database_conflicts](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-DATABASE-CONFLICTS-VIEW) على خادم احتياطي إلى عرض أسباب التعارضات وعددها:

```
testdb=# -- Standby
testdb=# \x
Expanded display is on.
testdb=# SELECT * FROM pg_stat_database_conflicts WHERE datname = 'testdb';
-[ RECORD 1 ]------------+-------
datid                    | 16384
datname                  | testdb
confl_tablespace         | 0
confl_lock               | 1
confl_snapshot           | 1
confl_bufferpin          | 0
confl_deadlock           | 0
confl_active_logicalslot | 0
```

** معلومات تاريخية

حتى الإصدار 15، كانت المعلمة [vacuum_defer_cleanup_age](https://www.postgresql.org/docs/14/runtime-config-replication.html#GUC-VACUUM-DEFER-CLEANUP-AGE) تدعم تأخير حذف الصفوف الميتة. وإذا ضُبطت على عدد موجب، أخّرت عمليات vacuum حذف الصفوف الميتة لعدد المعاملات المحدد.

وأُزيلت هذه المعلمة في الإصدار 16 لأنها لم تكن تزيل التعارضات دائمًا.

ويؤدي استخدام [hot_standby_feedback](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-HOT-STANDBY-FEEDBACK) وفتحات النسخ (الموصوفة في القسم 11.4) إلى إدارة التعارضات بفعالية أكبر.

1. حالة التعارض هذه سمة تصميمية مقصودة لتوفير مهلة سماح تمنع أخطاء الاستعلامات الفورية على الخادم الاحتياطي. فعندما يُسقط الخادم الأساسي كائنات يصل إليها الخادم الاحتياطي حاليًا، يدخل النسخ المتماثل المتدفّق في حالة التعارض هذه. ولإعلام خوادم النسخ الاحتياطي بهذه الحالة، يسجّل PostgreSQL الحصول على أقفال الوصول الحصري في XLOG. ولاحظ أن هذه السجلات تُنشأ خصيصًا من أجل النسخ المتماثل وليس من أجل الاستعادة القياسية. ونتيجة لذلك، لا ينشئها PostgreSQL إذا كان wal_level مضبوطًا على minimal.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 11.3. إدارة خوادم احتياطية متعددة

يصف هذا القسم كيفية عمل النسخ المتماثل المتدفّق مع خوادم احتياطية متعددة.

محتويات القسم

- 11.3.1. أولوية النسخ المتماثل والحالات المتزامنة
- 11.3.2. كيف يدير الخادم الأساسي خوادم احتياطية متعددة
- 11.3.3. السلوك عند حدوث عطل

## 11.3.1. أولوية النسخ المتماثل والحالات المتزامنة

يصنّف الخادم الأساسي كل خادم احتياطي وفقًا لدوره وموثوقيته لإدارة خوادم احتياطية متعددة بكفاءة في بيئة نسخ متماثل متزامن. ويعتمد هذا التصنيف على سمتين داخليتين: **sync_priority** و**sync_state**.

ويسند الخادم الأساسي هاتين السمتين إلى جميع خوادم النسخ الاحتياطي المُدارة ويتعامل مع كل خادم وفقًا لهاتين القيمتين. ويقوم الخادم الأساسي بهذا الإسناد حتى إذا كان يدير خادمًا احتياطيًا واحدًا فقط.

### 11.3.1.1. sync_priority

تشير السمة sync_priority إلى أولوية الخادم الاحتياطي في الوضع المتزامن.

وتمثّل القيمة الأقل أولوية أعلى. وتعني القيمة الخاصة 0 أن الخادم الاحتياطي في الوضع غير المتزامن.

ويسند الخادم الأساسي الأولويات وفقًا للترتيب المذكور في المعلمة [synchronous_standby_names](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-SYNCHRONOUS-STANDBY-NAMES).

فمثلًا، في الإعداد التالي، تكون أولويتا standby1 وstandby2 هما 1 و2 على الترتيب.

```
synchronous_standby_names = 'standby1, standby2'
```

أما خوادم النسخ الاحتياطي غير المذكورة في هذه المعلمة فتعمل في الوضع غير المتزامن بأولوية 0.

### 11.3.1.2. sync_state

تشير السمة *sync_state* إلى الحالة الحالية للخادم الاحتياطي. ويمكن أن تكون إحدى الحالات التالية:

- **sync:** الخادم الاحتياطي في الوضع المتزامن وهو الخادم الاحتياطي العامل حاليًا بأعلى أولوية.
- **potential:** الخادم الاحتياطي في الوضع المتزامن وهو خادم احتياطي بأولوية أقل. وإذا تعطّل الخادم *sync* الحالي، يُرقّى هذا الخادم إلى حالة *sync*.
- **async:** الخادم الاحتياطي في الوضع غير المتزامن. ولا يدخل أبدًا في حالتي *sync* أو *potential*.
- **quorum:** تعمل خوادم النسخ الاحتياطي في وضع النصاب (quorum). انظر القسم 11.3.2.1 للتفاصيل.

ويؤدي إصدار الاستعلام التالي إلى عرض أولوية خوادم النسخ الاحتياطي وحالتها:

```
testdb=# SELECT application_name AS host,
         sync_priority, sync_state FROM pg_stat_replication;
   host   | sync_priority | sync_state
----------+---------------+------------
 standby1 |             1 | sync
 standby2 |             2 | potential
(2 rows)
```

## 11.3.2. كيف يدير الخادم الأساسي خوادم احتياطية متعددة

ينتظر الخادم الأساسي استجابات ACK من الخادم الاحتياطي المتزامن وحده. فلا يؤكّد سوى كتابة الخادم الاحتياطي المتزامن لبيانات WAL ودفعها. ولذلك يضمن النسخ المتماثل المتدفّق أن يبقى الخادم الاحتياطي المتزامن وحده في حالة متسقة ومتزامنة مع الخادم الأساسي.

ويوضّح الشكل 11.4 حالة تصل فيها استجابة ACK من الخادم الاحتياطي المرشّح (potential) قبل استجابة الخادم الأساسي (sync).

![](/images/postgres-internals/pgsql11-fig-11-04.webp)

#### الشكل 11.4. إدارة خوادم احتياطية متعددة.

- (1) تواصل العملية الخلفية على الخادم الأساسي انتظار استجابة ACK من الخادم الاحتياطي المتزامن، حتى بعد استقبال ACK من الخادم المرشّح.
- (2) بعد استقبال ACK من الخادم الاحتياطي المتزامن، تحرّر العملية الخلفية المزلاج وتُكمل المعاملة.

وفي الحالة المعاكسة (وصول ACK من الخادم المتزامن قبل المرشّح)، يُكمل الخادم الأساسي الالتزام فورًا دون التحقق مما إذا كان الخادم المرشّح قد كتب بيانات WAL أو دفعها.

### 11.3.2.1. النسخ المتماثل المتزامن القائم على النصاب

قدّم الإصدار 9.6 (2016) النسخ المتماثل المتزامن القائم على النصاب. وتتيح هذه الميزة اعتبار المعاملات ملتزمة بمجرد أن تؤكّدها مجموعة فرعية (نصاب) من خوادم النسخ الاحتياطي المتزامنة.

وللنسخ المتماثل المتزامن القائم على النصاب وضعان: ANY وFIRST.

#### وضع ANY

تنسيق synchronous_standby_names في وضع ANY هو:

```
ANY num_sync ( standby_name [, ...] )
```

في وضع ANY، يُكمل الخادم الأساسي الالتزام بالمعاملة الحالية بمجرد أن ترجع أي ’num_sync’ من خوادم النسخ الاحتياطي في القائمة استجابات ACK.

فمثلًا، يتيح الإعداد التالي الالتزام بمجرد أن يرجع أي خادمَي نسخ احتياطي استجابات:

```
synchronous_standby_names = 'ANY 2 (standby1, standby2, standby3)'
```

يوضّح الشكل 11.5 سلوك إعداد وضع ANY:

![](/images/postgres-internals/pgsql11-fig-11-05.webp)

#### الشكل 11.5. سلوك إعداد وضع ANY.

وحالة *sync_priority* و*sync_state* لهذا الإعداد هي:

```
testdb=# SELECT application_name AS host,
        sync_priority, sync_state FROM pg_stat_replication;
   host   | sync_priority | sync_state
----------+---------------+------------
 standby1 |             1 | quorum
 standby2 |             1 | quorum
 standby3 |             1 | quorum
(3 rows)
```

#### وضع FIRST

تنسيق synchronous_standby_names في وضع FIRST هو:

```json
[FIRST] num_sync ( standby_name [, ...] )
```

في وضع FIRST، يُكمل الخادم الأساسي الالتزام بعد أن ترجع أول ’num_sync’ من خوادم النسخ الاحتياطي في القائمة استجابات ACK.

فمثلًا، يجعل الإعداد التالي الخادم الأساسي ينتظر حتى ترجع standby1 وstandby2 استجابتي ACK، حتى إذا استجاب standby3 أولًا:

```
synchronous_standby_names = 'FIRST 2 (standby1, standby2, standby3)'
```

يوضّح الشكل 11.6 سلوك إعداد وضع FIRST:

![](/images/postgres-internals/pgsql11-fig-11-06.webp)

#### الشكل 11.6. سلوك إعداد وضع FIRST.

وفيما يلي حالة sync_priority وsync_state للإعداد أعلاه:

```sql
SELECT application_name AS host,
        sync_priority, sync_state FROM pg_stat_replication;
   host   | sync_priority | sync_state
----------+---------------+------------
 standby3 |             3 | potential
 standby2 |             2 | sync
 standby1 |             1 | sync
(3 rows)
```

## 11.3.3. السلوك عند حدوث عطل

عندما يتعطّل خادم احتياطي مرشّح أو غير متزامن، ينهي الخادم الأساسي عملية walsender المتصلة بالخادم المتعطّل ويواصل كل المعالجة. وبعبارة أخرى، لا يؤثر عطل أي من نوعي الخوادم الاحتياطية في معالجة المعاملات على الخادم الأساسي.

وعندما يتعطّل خادم احتياطي متزامن، ينهي الخادم الأساسي عملية walsender المتصلة بالخادم المتعطّل ويستبدل الخادم الاحتياطي المتزامن بأعلى خادم مرشّح أولوية. انظر الشكل 11.7.

![](/images/postgres-internals/pgsql11-fig-11-07.webp)

#### الشكل 11.7. استبدال الخادم الاحتياطي المتزامن.

وخلافًا لعطل خادم مرشّح أو غير متزامن، يؤدي عطل خادم احتياطي متزامن إلى توقف معالجة الاستعلامات على الخادم الأساسي حتى تكتمل عملية الاستبدال. (لذلك، يُعدّ اكتشاف الأعطال وظيفة بالغة الأهمية لزيادة توافر نظام النسخ المتماثل. ويُوصف اكتشاف الأعطال في القسم التالي.)

وفي كل الأحوال، إذا عمل خادم احتياطي واحد أو أكثر في الوضع المتزامن، يحتفظ الخادم الأساسي بخادم احتياطي متزامن واحد بالضبط في جميع الأوقات. ويبقى هذا الخادم الاحتياطي المتزامن في حالة متسقة ومتزامنة مع الخادم الأساسي.

# 11.4. فتحات النسخ

كما نوقش في القسم 11.1.1، تضمن فتحات النسخ (المُدخلة في الإصدار 9.4) الاحتفاظ بقطع WAL وإصدارات الصفوف القديمة حتى اكتمال النسخ المتماثل.

ويستكشف هذا القسم آلية فتحات النسخ.

لاحظ أنه على الرغم من أن فتحات النسخ أساسية للنسخ المتماثل المنطقي، فإن هذا القسم لا يتناولها في ذلك السياق.

محتويات القسم

- 11.4.1. مزايا فتحات النسخ في النسخ المتماثل المتدفّق
- 11.4.2. فتحات النسخ والعمليات والملفات ذات الصلة
- 11.4.3. بنية البيانات
- 11.4.4. بدء فتحة النسخ
- 11.4.5. إدارة فتحات النسخ

## 11.4.1. مزايا فتحات النسخ في النسخ المتماثل المتدفّق

في النسخ المتماثل المتدفّق، ومع أن فتحات النسخ ليست إلزامية، فإنها توفّر المزايا التالية مقارنة بـ[wal_keep_size](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-KEEP-SIZE):

1. ضمان عمل النسخ المتماثل المتدفّق دون فقدان قطع WAL المطلوبة: تتتبّع فتحات النسخ قطع WAL المطلوبة وتمنع إزالتها. وفي المقابل، عند استخدام wal_keep_size وحدها، قد يحذف PostgreSQL قطعًا ضرورية إذا لم تقرأها خوادم النسخ الاحتياطي لفترة طويلة.
2. الاحتفاظ بالحد الأدنى الضروري فقط من قطع WAL: مع فتحات النسخ، يحتفظ الدليل pg_wal بقطع WAL المطلوبة فقط ويحذف غير الضرورية. وبالعكس، تحتفظ wal_keep_size بكمية ثابتة من قطع WAL بصرف النظر عن الحاجة الفعلية.

** max_slot_wal_keep_size

بما أن فتحات النسخ قد تحتفظ بقطع WAL إلى أجل غير مسمى، فقد تمتلئ مساحة التخزين في أسوأ الحالات، ما قد يؤدي إلى ذعر في نظام التشغيل.

ولمعالجة هذه المشكلة، قدّم الإصدار 13 معلمة الإعداد [max_slot_wal_keep_size](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-SLOT-WAL-KEEP-SIZE). وتحدّ هذه المعلمة الحجم الأقصى لقطع WAL في الدليل pg_wal عند نقطة التفتيش.

ويكمن الفرق الجوهري بين استخدام max_slot_wal_keep_size مع فتحات النسخ واستخدام wal_keep_size في طريقة إدارتهما لقطع WAL:

- تحدّد max_slot_wal_keep_size حدًا أقصى للحجم مع السماح لفتحات النسخ بالاحتفاظ بالحد الأدنى المطلوب فقط.
- تحدّد wal_keep_size كمية ثابتة من قطع WAL يُحتفظ بها، بصرف النظر عن الحاجة إليها.

## 11.4.2. فتحات النسخ والعمليات والملفات ذات الصلة

تُخزَّن فتحات النسخ في منطقة الذاكرة المخصّصة ضمن الذاكرة المشتركة.

يوضّح الشكل 11.8 فتحات النسخ والعمليات والملفات ذات الصلة:

![](/images/postgres-internals/pgsql11-fig-11-08.webp)

#### الشكل 11.8. فتحات النسخ والعمليات والملفات ذات الصلة.

### 11.4.2.1. العمليات ذات الصلة

العمليات المتعلقة بفتحات النسخ كما يلي:

- **walsender**: تحدّث هذه العملية باستمرار فتحة النسخ المقابلة لتعكس الحالة الحالية لبيانات WAL على الخادم الاحتياطي.
- **عملية نقاط التفتيش الخلفية**: تقرأ هذه العملية فتحات النسخ لتحديد ما إذا كان يمكن حذف قطع WAL أثناء نقطة التفتيش.
- **العملية الخلفية لـPostgres**: تعرض هذه العملية معلومات الفتحة عبر عرض النظام [pg_replication_slots](https://www.postgresql.org/docs/current/view-pg-replication-slots.html).

### 11.4.2.2. الملفات ذات الصلة

الملفات المتعلقة بفتحات النسخ كما يلي:

- **ملفات الحالة** تحت دليل *pg_replslot*: تحفظ عمليات walsender بانتظام معلومات مفصّلة عن فتحات نسخها في ملفات الحالة في هذا الدليل. وأثناء إعادة تشغيل الخادم، يحمّل PostgreSQL هذه المعلومات مرة أخرى إلى الذاكرة لاستعادة حالة فتحات النسخ.
- **ملفات قطع WAL** تحت دليل *pg_wal*.

## 11.4.3. بنية البيانات

تُعرَّف فتحات النسخ بالبنية `ReplicationSlot` في [slot.h](https://github.com/postgres/postgres/blob/master/src/include/replication/slot.h).

** ** ReplicationSlot

```python
/*
 * Shared memory state of a single replication slot.
 *
 * The in-memory data of replication slots follows a locking model based
 * on two linked concepts:
 * - A replication slot's in_use flag is switched when added or discarded using
 * the LWLock ReplicationSlotControlLock, which needs to be hold in exclusive
 * mode when updating the flag by the backend owning the slot and doing the
 * operation, while readers (concurrent backends not owning the slot) need
 * to hold it in shared mode when looking at replication slot data.
 * - Individual fields are protected by mutex where only the backend owning
 * the slot is authorized to update the fields from its own slot.  The
 * backend owning the slot does not need to take this lock when reading its
 * own fields, while concurrent backends not owning this slot should take the
 * lock when reading this slot's data.
 */
typedef struct ReplicationSlot
{
	/* lock, on same cacheline as effective_xmin */
	slock_t		mutex;

	/* is this slot defined */
	bool		in_use;

	/* Who is streaming out changes for this slot? 0 in unused slots. */
	pid_t		active_pid;

	/* any outstanding modifications? */
	bool		just_dirtied;
	bool		dirty;

	/*
	 * For logical decoding, it's extremely important that we never remove any
	 * data that's still needed for decoding purposes, even after a crash;
	 * otherwise, decoding will produce wrong answers.  Ordinary streaming
	 * replication also needs to prevent old row versions from being removed
	 * too soon, but the worst consequence we might encounter there is
	 * unwanted query cancellations on the standby.  Thus, for logical
	 * decoding, this value represents the latest xmin that has actually been
	 * written to disk, whereas for streaming replication, it's just the same
	 * as the persistent value (data.xmin).
	 */
	TransactionId effective_xmin;
	TransactionId effective_catalog_xmin;

	/* data surviving shutdowns and crashes */
	ReplicationSlotPersistentData data;

	/* is somebody performing io on this slot? */
	LWLock		io_in_progress_lock;

	/* Condition variable signaled when active_pid changes */
	ConditionVariable active_cv;

	/* all the remaining data is only used for logical slots */

	/*
	 * When the client has confirmed flushes >= candidate_xmin_lsn we can
	 * advance the catalog xmin.  When restart_valid has been passed,
	 * restart_lsn can be increased.
	 */
	TransactionId candidate_catalog_xmin;
	XLogRecPtr	candidate_xmin_lsn;
	XLogRecPtr	candidate_restart_valid;
	XLogRecPtr	candidate_restart_lsn;

	/*
	 * This value tracks the last confirmed_flush LSN flushed which is used
	 * during a shutdown checkpoint to decide if logical's slot data should be
	 * forcibly flushed or not.
	 */
	XLogRecPtr	last_saved_confirmed_flush;

	/* The time since the slot has become inactive */
	TimestampTz inactive_since;
} ReplicationSlot;

#define SlotIsPhysical(slot) ((slot)->data.database == InvalidOid)
#define SlotIsLogical(slot) ((slot)->data.database != InvalidOid)

/*
 * Shared memory control area for all of replication slots.
 */
typedef struct ReplicationSlotCtlData
{
	/*
	 * This array should be declared [FLEXIBLE_ARRAY_MEMBER], but for some
	 * reason you can't do that in an otherwise-empty struct.
	 */
	ReplicationSlot replication_slots[1];
} ReplicationSlotCtlData;
```

ومع أن البنية تحتوي على عناصر كثيرة، لأنها مشتركة بين النسخ المتماثل المتدفّق والمنطقي معًا، فإن العناصر الرئيسية ذات الصلة بالنسخ المتماثل المتدفّق هي التالية:

- **active_pid**: معرّف العملية (PID) لعملية walsender التي تدير هذه الفتحة.
- **ReplicationSlotPersistentData data**: عناصر معرّفة ببنية `ReplicationSlotPersistentData`. وتشمل العناصر الرئيسية: **name**: اسم الفتحة.
- **restart_lsn**: أقدم LSN قد تحتاج إليه فتحة النسخ هذه. وتقرأ عملية نقاط التفتيش أصغر قيمة restart_lsn بين جميع الفتحات لتحديد ما إذا كان يمكن حذف قطع WAL.

ويُحفظ العنصر ReplicationSlotPersistentData data بانتظام في الدليل pg_replslot.

** ** ReplicationSlotPersistentData

```python
/*
 * On-Disk data of a replication slot, preserved across restarts.
 */
typedef struct ReplicationSlotPersistentData
{

	NameData	name;

	/* database the slot is active on */
	Oid			database;

	/*
	 * The slot's behaviour when being dropped (or restored after a crash).
	 */
	ReplicationSlotPersistency persistency;

	/*
         * xmin horizon for data
         *
         * NB: This may represent a value that hasn't been written to disk yet;
         * see notes for effective_xmin, below.
         */
	 TransactionId xmin;

	/*
	 * xmin horizon for catalog tuples
	 *
	 * NB: This may represent a value that hasn't been written to disk yet;
	 * see notes for effective_xmin, below.
	 */
	TransactionId catalog_xmin;

	/* oldest LSN that might be required by this replication slot */
	XLogRecPtr	restart_lsn;

	/* RS_INVAL_NONE if valid, or the reason for having been invalidated */
	ReplicationSlotInvalidationCause invalidated;

	/*
	 * Oldest LSN that the client has acked receipt for.  This is used as the
	 * start_lsn point in case the client doesn't specify one, and also as a
	 * safety measure to jump forwards in case the client specifies a
	 * start_lsn that's further in the past than this value.
	 */
	XLogRecPtr	confirmed_flush;

	/*
	 * LSN at which we enabled two_phase commit for this slot or LSN at which
	 * we found a consistent point at the time of slot creation.
	 */
	XLogRecPtr	two_phase_at;

	/*
	 * Allow decoding of prepared transactions?
	 */
	bool		two_phase;

	/* plugin name */
	NameData	plugin;

	/*
	 * Was this slot synchronized from the primary server?
	 */
	char		synced;

	/*
	 * Is this a failover slot (sync candidate for standbys)? Only relevant
	 * for logical slots on the primary server.
	 */
	bool		failover;
} ReplicationSlotPersistentData;
```

## 11.4.4. بدء فتحة النسخ

يوضّح الشكل 11.9 تسلسل بدء فتحة النسخ:

![](/images/postgres-internals/pgsql11-fig-11-09.webp)

#### الشكل 11.9. تسلسل بدء فتحة النسخ.

(1) إنشاء فتحة نسخ (فيزيائية) باستخدام الدالة [pg_create_physical_replication_slot()](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-REPLICATION). وباستثناء اسم الفتحة، يضبط PostgreSQL البيانات في فتحة النسخ على قيمها الافتراضية.

```
testdb=# SELECT * FROM pg_create_physical_replication_slot('standby_slot');
slot_name   | lsn
---------------+-----
standby_slot  |
(1 row)
```

(2) كتابة جزء من بيانات الفتحة في الدليل pg_replslot. وتعرّف بنية ReplicationSlotPersistentData هذه البيانات. وينشئ PostgreSQL ملفًا باسم ‘state’ تحت الدليل الفرعي المقابل لاسم الفتحة، كما هو موضّح أدناه:

```bash
$ ls -1 pg_replslot/
standby_slot
$ find pg_replslot/
pg_replslot/
pg_replslot/standby_slot
pg_replslot/standby_slot/state
```

(3) إعادة ربط الخادم الاحتياطي بالخادم الأساسي. ولإعادة ربط الخادم الاحتياطي، اضبط معلمة الإعداد [primary_slot_name](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-PRIMARY-SLOT-NAME) على اسم فتحة النسخ.

```
# standby's postgresql.conf

primary_slot_name = 'standby_slot'
```

ثم أصدر الأمر pg_ctl مع خيار “reload”:

```bash
$ pg_ctl -D $PGDATA_STANDBY reload
```

(4) تحديث فتحة النسخ، بما في ذلك حقول مثل active_pid وrestart_lsn. (5) كتابة جزء من بيانات الفتحة المحدَّثة في الدليل pg_replslot.

## 11.4.5. إدارة فتحات النسخ

بعد ضبط فتحات النسخ في الذاكرة المشتركة، تحدّث عمليات walsender الفتحات باستمرار لتعكس الحالات الحالية لخوادم النسخ الاحتياطي المقابلة.

وفيما يلي مثال على حالات فتحات النسخ:

```
testdb=# \x
Expanded display is on.
testdb=# SELECT * FROM pg_replication_slots;
-[ RECORD 1 ]-------+--------------
slot_name           | standby_slot
plugin              |
slot_type           | physical
datoid              |
database            |
temporary           | f
active              | t
active_pid          | 236772
xmin                | 754
catalog_xmin        |
restart_lsn         | 0/303B968
confirmed_flush_lsn |
wal_status          | reserved
safe_wal_size       |
two_phase           | f
inactive_since      |
conflicting         |
invalidation_reason |
failover            | f
synced              | f
```

يحفظ خادم PostgreSQL الأساسي بانتظام معلومات مفصّلة عن فتحات نسخه في ملفات ‘state’ في الدليل pg_replslot.

وعند إعادة تشغيل الخادم الأساسي، يحمّل هذه المعلومات المحفوظة مرة أخرى إلى الذاكرة لاستعادة حالة فتحات نسخه.
