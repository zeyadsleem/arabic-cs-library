---
title: "النسخ المتماثل المنطقي"
lang: ar
source: https://www.interdb.jp/pg/pgsql12/index.html
---

# 12.1. نظرة عامة ومفاهيم أساسية

#### نسخة تجريبية: العمل قيد الإنجاز.

يقدّم هذا القسم المفاهيم الأساسية اللازمة لفهم الأقسام التالية.

محتويات القسم

- 12.1.1. العمليات ذات الصلة
- 12.1.2. مخطط النسخ المتماثل المنطقي
- 12.1.3. هوية النسخة
- 12.1.4. أصل النسخ المتماثل
- 12.1.5. فتحة النسخ
- 12.1.6. التعارضات

## 12.1.1. العمليات ذات الصلة

في النسخ المتماثل المنطقي، تعمل أربعة أنواع من العمليات تعاونيًا:

- عملية **walsender** على الناشر ترسل بيانات WAL إلى المشترك وتنفّذ مهام تنسيق متنوعة.
- عملية **مُشغّل النسخ المتماثل المنطقي** (logical replication launcher) على المشترك تشغّل عمال التطبيق.
- **عامل التطبيق** (apply worker) على المشترك يتصل بعملية walsender على الناشر، ويستقبل تدفقات التغييرات المنطقية، ويحلّل الرسائل، ويحدّث الجداول الهدف.
- **عامل مزامنة الجدول** (table sync worker) على المشترك ينفّذ المزامنة الأولية للبيانات لجدول محدّد. وهو يلحق بتدفق النسخ المتماثل الرئيسي قبل تسليم التحديثات إلى عامل التطبيق. راجع القسم 12.2.2 للتفاصيل.

## 12.1.2. مخطط النسخ المتماثل المنطقي

النسخ المتماثل المنطقي في PostgreSQL **قائم على الصفوف**. فهو يلتقط التغييرات على الصفوف الفردية ويدفقها بتنسيق مُفكَّك الترميز. ولأن الرسائل المنطقية تحتوي على **نتائج العمليات المحسوبة مسبقًا**، يتجنّب النسخ المتماثل المنطقي حالات عدم الاتساق الناتجة عن الدوال غير الحتمية مثل random() أو now().

ويقارن المثال التالي بين النسخ المتماثل المنطقي والنسخ المتماثل المتدفّق، كما هو موضّح في الشكل 12.2.

![](/images/postgres-internals/pgsql12-fig-12-02.webp)

#### الشكل 12.2. مقارنة مفاهيمية لإرسال البيانات: النسخ المتماثل المتدفّق مقابل المنطقي.

تأمّل سيناريو تنفّذ فيه معاملتان متزامنتان (txid=99 و100) عبارات SQL تؤثر في *tbl_a* و*tbl_b*.

في **النسخ المتماثل المتدفّق**، يكتب الناشر بيانات WAL ($w_{1}$ إلى $w_{5}$) في ملف WAL بالتسلسل فور تنفيذ كل عبارة SQL. ويقرأ walsender هذه السجلات ويرسلها فورًا إلى walreceiver على الخادم الاحتياطي، بصرف النظر عن حالة الالتزام بالمعاملة. ويكتب walreceiver البيانات المستلمة في ملف WAL الخاص به بالترتيب المستلم نفسه، حافظًا بذلك على نسخة فيزيائية مطابقة للخادم الأساسي.

في المقابل، يعالج **النسخ المتماثل المنطقي** البيانات استنادًا إلى حدود المعاملات ونطاقات المنشورات. فبينما يقرأ walsender بيانات WAL فور توليدها، فإنه لا يرسل البيانات على الفور. بل يراكم التغييرات في منطقة ذاكرة تسمى **ReorderBuffer**، حيث تُعاد تجميع التغييرات لكل معاملة.

تتضمن عملية ReorderBuffer داخل walsender ثلاث عمليات رئيسية:

- **الترشيح:** يرشّح walsender التغييرات المُفكَّكة الترميز بناءً على نطاق المنشور. فحتى بعد التزام txid=100، لا يجهّز walsender للإرسال سوى التغييرات المتعلقة بالجداول المشترك بها. فمثلًا، إذا كان المشترك يتابع *tbl_a* فقط، يتجاهل walsender التغيير $c_{3}$ (المُفكَّك من $w_{3}$ الخاص بـ*tbl_b*). راجع القسم 12.4.1 للتفاصيل.
- **فكّ الترميز والتخزين المؤقت:** بينما يقرأ walsender سجل WAL، يفكّ ترميز كل سجل $w_{n}$ إلى تغيير منطقي $c_{n}$ ويخزّنه في ReorderBuffer. راجع القسم 12.4.3 للتفاصيل.
- **الإرسال:** عند مصادفة سجل الالتزام $w_{5}$ الخاص بـtxid=100، يجمع walsender التغييرات المخزّنة المؤقتة ذات الصلة ($c_{1}$ و$c_{4}$) ويرسلها إلى المشترك كسلسلة من الرسائل، تُختم برسالة الالتزام $c_{5}$. وتبقى التغييرات من المعاملات غير الملتزمة، مثل $c_{2}$ من txid=99، مخزّنة مؤقتًا ولا تُرسل بعد. راجع القسم 12.6 للتفاصيل.

وتوصف بنية ReorderBuffer في القسم 12.3.

ويوفّر PostgreSQL الإضافة **pgoutput** افتراضيًا للنسخ المتماثل المنطقي القياسي، وإن كانت عملية الخرج قابلة للتوسيع عبر الإضافات. راجع القسم 12.5 للتفاصيل.

ويحقّق عامل التطبيق على المشترك النسخ المتماثل بإعادة بناء المعاملات وتنفيذها استنادًا إلى الرسائل المستلمة. وترد تفاصيل إضافية في القسم 12.7.

### 12.1.2.1. غير المتزامن مقابل المتزامن

يدعم PostgreSQL وضعين للنسخ المتماثل المنطقي: **غير المتزامن** و**المتزامن**. والوضع غير المتزامن هو الافتراضي. انظر الشكل 12.3.

![](/images/postgres-internals/pgsql12-fig-12-03.webp)

#### الشكل 12.3. مقارنة تدفق المعاملات في وضعي النسخ المتماثل المنطقي غير المتزامن والمتزامن.

في **الوضع غير المتزامن**، تكتمل عبارة COMMIT على الناشر فورًا بعد دفع WAL المحلي، دون انتظار استجابة من المشترك.

وفي **الوضع المتزامن** (تحديدًا عندما تُضبط synchronous_commit على ‘remote_apply’)، تنتظر عملية الالتزام على الناشر حتى تستقبل إشعارًا (ACK) من المشترك. وكما هو موضّح في الشكل 12.3، لا يرسل عامل التطبيق هذا الإشعار إلا بعد إنهاء تطبيق التغييرات في قاعدة بيانات المشترك.

والوقت الإضافي اللازم لإتمام الالتزام المتزامن مقارنةً بالوضع غير المتزامن هو **زمن الاستجابة من الطرف إلى الطرف** (End-to-End Latency).

تتطلب المعاملات التي تتضمن كميات كبيرة من التغييرات وقتًا أطول لفكّ الترميز والنقل والتطبيق. ونتيجة لذلك:

- في **الوضع غير المتزامن**، تزيد أحجام المعاملات الأكبر تأخّر النسخ المتماثل، ما يوسّع نافذة عدم اتساق البيانات.
- في **الوضع المتزامن**، تزيد الأحجام الأكبر زمن الالتزام على الناشر، لأن العملية الخلفية يجب أن تنتظر اكتمال خط النسخ المتماثل بأكمله.

### 12.1.2.2. إدارة المعاملات الكبيرة وتحسينها

يفحص هذا القسم سلوك «المعاملات الكبيرة» &mdash; أي تلك ذات أحجام التغييرات الكبيرة &mdash; وتطوّر تقنيات التحسين.

#### [1] معالجة المعاملات القياسية (streaming = off)

عندما يتجاوز حجم التغييرات سعة ReorderBuffer (المحددة بـ[logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM))، يحفظ walsender البيانات في **ملفات انسكاب** (spill files) على القرص. ويوضّح الشكل 12.4 ذلك [1].

![](/images/postgres-internals/pgsql12-fig-12-04.webp)

#### الشكل 12.4: سلوك المعاملات الكبيرة عند تعطيل streaming.

وتدفق المعالجة كما يلي:

- (1) تُنفَّذ عمليات INSERT على tbl_a، وتتراكم التغييرات المُفكَّكة في ReorderBuffer.
- (2) عند تجاوز حد الذاكرة، يمسح ReorderBuffer السجلات المحتفظ بها حاليًا.
- (3) يولّد walsender **ملفات انسكاب** وينقل البيانات الفائضة عن الذاكرة إلى القرص لتحرير مساحة المخزن المؤقت.
- (4) **تلتزم** المعاملة على الناشر.
- (5) بعد اكتشاف الالتزام، يرسل walsender التغييرات المجمّعة (من ملفات الانسكاب والذاكرة) إلى المشترك.
- (6) يطبّق عامل التطبيق الرسائل المستلمة بالتسلسل.

وترد آليات ملفات الانسكاب في القسم 12.4.4.

وفي هذا الإعداد، يرسل walsender تغييرات معاملة واحدة فقط في كل مرة لكل اتصال. ونتيجة لذلك، يسلسل المشترك تطبيق التغييرات، ما يؤدي غالبًا إلى تأخّر كبير في النسخ المتماثل (الشكل 12.4 [2]).

#### [2] البث الجاري للمعاملات الكبيرة (الإصدار 14 وما بعده)

قدّم الإصدار 14 (2021) الإرسال الاستباقي لبيانات التغييرات قبل التزام المعاملة. ويخفّف ذلك كلفة النقل ويقلّل تأخّر النسخ المتماثل. ويوضّح الشكل 12.5 ذلك [1].

![](/images/postgres-internals/pgsql12-fig-12-05.webp)

#### الشكل 12.5: آلية البث الجاري للمعاملات الكبيرة.

وتدفق التشغيل كما يلي:

- (1) تُنفَّذ عمليات INSERT، وتتراكم البيانات في ReorderBuffer.
- (2) عند تجاوز حد الذاكرة (المحدد بـ[logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM))، **يبدأ walsender الإرسال فورًا**، دون انتظار الالتزام.
- (3) يخزّن عامل التطبيق البيانات الواردة مؤقتًا في الذاكرة باستخدام بنية `StringInfoData` باسم *original_msg*.
- (4) إذا بلغ حد الذاكرة على جانب المشترك، يحفظ العامل البيانات في **ملفات مؤقتة** (Temp files).
- (5) **تلتزم** المعاملة على الناشر.
- (6) يسترجع عامل التطبيق البيانات من الملفات المؤقتة (أو الذاكرة) ويطبّق التغييرات.

وخلافًا لـwalsender الذي يدير التغييرات داخل ReorderBuffer منظّم، يخزّن عامل التطبيق التغييرات الواردة مؤقتًا كتدفق ثنائي خام داخل بنية StringInfoData عامة (original_msg).

فعّل البث بتحديد “streaming = on” في أمر [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html). وتُحكم سعة مخزن رسائل عامل التطبيق أيضًا بـlogical_decoding_work_mem. وترد تفاصيل إدارة الملفات المؤقتة في القسم 12.7.2.1.

وتُزيل هذه الطريقة زمن النقل الذي يحدث عادةً بعد الالتزام. وحتى مع وجود معاملات كبيرة متزامنة، يضمن النقل الاستباقي بدء عملية التطبيق فورًا بعد الالتزام (الشكل 12.5 [2]).

#### [3] التطبيق المتوازي للتغييرات المبثوثة (الإصدار 16 وما بعده)

قدّم الإصدار 16 القدرة على **توزيع عملية التطبيق بالتوازي أثناء البث** قبل التزام المعاملة. ويتراكب ذلك مع نقل البيانات والتطبيق معًا. ويوضّح الشكل 12.6 ذلك [1].

![](/images/postgres-internals/pgsql12-fig-12-06.webp)

#### الشكل 12.6: آلية وكفاءة عمال التطبيق المتوازيين أثناء البث.

وتدفق البث المتوازي كما يلي:

- (1) تؤدي عمليات INSERT إلى تراكم البيانات في ReorderBuffer.
- (2) عند تجاوز حد الذاكرة، يبدأ walsender إرسال بيانات التغييرات.
- (3) يستقبل **عامل التطبيق القائد** (leader apply worker) التدفق ويوزّع البيانات على **عامل تطبيق متوازٍ** (parallel apply worker).
- (4) **يبدأ عامل التطبيق المتوازي فورًا بتطبيق التغييرات** على الجداول الهدف.
- (5) **تُنفَّذ عبارة COMMIT** على الناشر.
- (6) يستقبل عامل التطبيق القائد رسالة الالتزام ويرسلها إلى عامل التطبيق المتوازي.
- (7) يُكمل عامل التطبيق المتوازي المعاملة المحلية وينهي التطبيق.

فعّل التطبيق المتوازي بتحديد *streaming* = *‘parallel’* في [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html).

وتتيح هذه البنية تراكبًا شبه كامل بين معالجة الناشر وتطبيق المشترك. ويقلّل ذلك بشكل جذري تأخّر النسخ المتماثل خلال التحديثات الكبيرة (الشكل 12.6 [2]).

ومع ذلك، لا يُضمن التنفيذ المتوازي في كل سيناريو. فإذا بلغ العمال النشطون حدّ [max_parallel_apply_workers_per_subscription](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-PARALLEL-APPLY-WORKERS-PER-SUBSCRIPTION)، يعود المشترك إلى التطبيق التسلسلي عند الالتزام &ndash; مطابقًا لسلوك “streaming = on”. وتُناقش قيود أخرى في القسم 12.7.3.

## 12.1.3. هوية النسخة

النسخ المتماثل المنطقي في PostgreSQL قائم على الصفوف ويعمل على صفوف البيانات المنطقية لا على تخطيطات التخزين الفيزيائية (مثل الكتل أو الإزاحات). ونتيجة لذلك، عندما ينفّذ المشترك عمليات UPDATE أو DELETE، يحتاج النظام إلى «مفتاح بحث» لتحديد الصف الذي يجب تعديله بالضبط. ويُعرف هذا الإعداد بـ**هوية النسخة** (Replica Identity).

وإذا لم تُعرَّف هوية نسخة مناسبة، لا يستطيع المشترك تحديد الصفوف الهدف بشكل فريد. ويؤدي ذلك إلى أخطاء في النسخ المتماثل أو تعديلات بيانات غير مقصودة. ولمنع مثل هذه المشكلات، يرفض الناشر محاولات UPDATE أو DELETE على جدول تفتقر هويته إلى هوية نسخة بإرجاع خطأ:

```
testdb=# UPDATE tbl SET data = 'updated_value' WHERE id = 1;
ERROR:  cannot update table &#34;tbl&#34; because it does not have a replica identity and publishes updates
HINT:  To enable updating the table, set REPLICA IDENTITY using ALTER TABLE.
```

### 12.1.3.1. أنواع هوية النسخة

يوفّر PostgreSQL أربعة أوضاع لهوية النسخة، قابلة للضبط لكل جدول على حدة:

| الوضع | الوصف | الاستخدام والخصائص |
| --- | --- | --- |
| **DEFAULT** | يستخدم أعمدة **المفتاح الأساسي** كمعرّف. | يُطبَّق هذا الوضع تلقائيًا عند تعريف مفتاح أساسي. |
| **USING INDEX** | يستخدم **فهرسًا فريدًا غير فارغ** محدّدًا كمعرّف. | هذا مفيد للجداول التي لا تحتوي على مفتاح أساسي حيث يعمل فهرس فريد محدّد كمفتاح. |
| **FULL** | يسجّل **القيم القديمة لجميع الأعمدة** في الصف. | يُطلب هذا للجداول التي لا تحتوي على قيود فريدة. ويزيد هذا الوضع حجم الرسائل؛ انظر القسم 12.4.3 للتفاصيل. |
| **NOTHING** | لا يسجّل أي معلومات هوية. | هذا هو الافتراضي للجداول التي لا تحتوي على مفتاح أساسي. وتُتابع عمليات INSERT، لكن لا يمكن نسخ UPDATE وDELETE. |

### 12.1.3.2. الإعداد والتحقق

يضبط أمر [ALTER TABLE &hellip; REPLICA IDENTITY](https://www.postgresql.org/docs/current/sql-altertable.html#SQL-ALTERTABLE-REPLICA-IDENTITY) هوية النسخة. وعند إنشاء مفتاح أساسي، يضبط النظام الوضع تلقائيًا على **DEFAULT**.

**مثال: تحديد فهرس فريد**

```
testdb=# CREATE TABLE tbl_ri (id int NOT NULL, name text, data int NOT NULL);
testdb=# CREATE UNIQUE INDEX tbl_ri_idx ON tbl_ri (id, data);
testdb=# ALTER TABLE tbl_ri REPLICA IDENTITY USING INDEX tbl_ri_idx;
```

**مثال: الإعداد إلى FULL**

```
testdb=# CREATE TABLE tbl_ri_full (id int, name text, data int);
testdb=# ALTER TABLE tbl_ri_full REPLICA IDENTITY FULL;
```

يُخزَّن إعداد هوية النسخة لكل جدول في العمود **relreplident** من كتالوج النظام **pg_class**. ويتحقق الاستعلام التالي من هذا الإعداد:

```
testdb=# -- Values: 'd' (default), 'n' (nothing), 'f' (full), 'i' (index)
testdb=# SELECT relname, relreplident FROM pg_class WHERE relname = 'tbl_ri';
 relname | relreplident
---------+--------------
 tbl_ri  | i
(1 row)

testdb=# SELECT relname, relreplident FROM pg_class WHERE relname = 'tbl_ri_full';
   relname   | relreplident
-------------+--------------
 tbl_ri_full | f
(1 row)
```

** معلومات

ومع أن *pg_class.relreplident* يشير إلى نوع هوية النسخة، فإنه لا يخزّن معرّف الفهرس المحدد (OID). وبدلًا من ذلك، عند إعداد “REPLICA IDENTITY USING INDEX”، يُسجَّل الفهرس المعيّن في كتالوج النظام **pg_index**. وتحديدًا، يُضبط العمود **indisreplident** (من النوع المنطقي) على *true* للفهرس المختار.

ويحدّد الاستعلام التالي أي فهرس بعينه يعمل كهوية نسخة لجدول معيّن:

```
testdb=# SELECT rel.relname AS table_name, idx_rel.relname AS index_name
	 FROM pg_class rel
	 JOIN pg_index idx ON rel.oid = idx.indrelid
	 JOIN pg_class idx_rel
	 ON idx.indexrelid = idx_rel.oid
	 WHERE rel.relname = 'tbl_ri' AND idx.indisreplident = true;
 table_name | index_name
------------+------------
 tbl_ri     | tbl_ri_idx
(1 row)
```

## 12.1.4. أصل النسخ المتماثل

يحدّد **أصل النسخ المتماثل** (Replication Origin) مصدر تغيير البيانات. وهو يخدم غرضين رئيسيين:

1. **تتبّع تقدّم النسخ المتماثل (التحكم في الاستعادة)**: عند تطبيق بيانات من عقدة خارجية، يسجّل المشترك LSN الخاص بالالتزام على الناشر (رقم تسلسل السجل) داخل سجل WAL الخاص به. وبهذا الربط، يضمن النظام أن يستأنف النسخ المتماثل المنطقي بدقة من النقطة الصحيحة بعد أي انقطاع.
2. **منع حلقات النسخ المتماثل اللانهائية (النسخ المتماثل الدائري)**: في النسخ المتماثل ثنائي الاتجاه، قد يُرسل تغيير أُرسل من العقدة A إلى العقدة B مرة أخرى عن غير قصد إلى العقدة A. وبتختم كل تغيير بأصل، يميّز النظام التغييرات المحلية من التغييرات المنسوخة، مانعًا إعادة الإرسال الزائدة.

ومع أن أصل النسخ المتماثل مدمج بعمق في إطار النسخ المتماثل المنطقي، فإن عنصره الأساسي هو **origin_id**. ويتيح هذا المعرّف المحلي للمشترك التمييز داخليًا بين الناشرين المختلفين (الأصول).

وآليات تتبّع التقدّم مضمنة في البنية ومفصّلة في القسم 12.8. ويركّز هذا القسم على منع الحلقات، وهي ميزة أُدخلت في الإصدار 16.

** معرّفات الأصل: معرّفات محلية لا مفاتيح عامة

من الضروري إدراك أن origin_id ليس معرّفًا فريدًا على مستوى التجمّع أو عالميًا. بل يسند المشترك هذه القيمة داخليًا للتمييز بين الناشرين المتعددين الذين يتصل بهم.

وبناءً على ذلك، لا تحمل القيمة العددية المحددة لـorigin_id أي دلالة للعقد الأخرى في طوبولوجيا النسخ المتماثل. وتعمل هذه القيمة فقط كتمييز ثنائي بسيط: هل هي صفر أم غير صفر.

- **origin_id يساوي 0** يشير إلى تغييرات من معاملات نُفِّذت أصلًا على تلك العقدة.
- **origin_id يساوي 1 أو أكبر** يشير إلى أن العقدة كانت تعيد تنفيذ تغييرات مستلمة من مصدر أعلى.

### 12.1.4.1. منع حلقات النسخ المتماثل اللانهائية عبر أصل النسخ المتماثل

يتيح النسخ المتماثل المنطقي في PostgreSQL بقاء جداول جانب المشترك قابلة للكتابة. ويسمح ذلك لعقدتين بالعمل في الوقت نفسه كناشرَين ومشتركَين، محقّقًا **النسخ المتماثل النشط-النشط** (إعداد متعدد الأساسيين)، كما هو موضّح في الشكل 12.7 [1].

![](/images/postgres-internals/pgsql12-fig-12-07.webp)

#### الشكل 12.7. النسخ المتماثل النشط-النشط وحلقة النسخ المتماثل اللانهائية.

قبل الإصدار 16، كان النسخ المتماثل المنطقي يعيد إرسال جميع التغييرات المُفكَّكة دون قيد. وفي إعداد ثنائي الاتجاه، كان تغيير ينشأ على العقدة 1 ينتقل إلى العقدة 2؛ ثم تعامله العقدة 2 كـ«تغيير محلي جديد» وترسله مرة أخرى إلى العقدة 1. وتُسمى هذه السلسلة التي لا تتوقف **حلقة نسخ متماثل لانهائية** (أو **نسخًا متماثلًا دائريًا**).

وعالج الإصدار 16 هذه المشكلة بالآلية التالية. ومع أن البنية متعددة الاستخدامات، فإن التنفيذ الحالي يتبع هذه السلوكيات:

- **origin = ‘any’ (الافتراضي)**: يرسل walsender التغييرات بصرف النظر عمّا إذا كان WAL قد تولّد محليًا أم بتطبيق رسائل من ناشر.
- **origin = ’none’**: يستبعد walsender سجلات WAL المتولّدة بتطبيق رسائل من عقدة خارجية.

وإعداد “origin” خيار إعداد في أمر [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html).

#### الآلية الداخلية وتسلسل الترشيح

ينسّق المشترك والناشر لتحديد الأصول وترشيحها:

1. **ختم الأصل**: عندما يلتزم عامل التطبيق على المشترك بمعاملة، يُلحق *origin_id* بسجل WAL الخاص بالالتزام (أو الإلغاء)[1](#fn:1). ويعيّن التنفيذ الحالي عددًا صحيحًا غير صفري للتغييرات الواردة من عقد خارجية.
2. **التقييم بواسطة walsender**: أثناء فكّ ترميز معاملة في ReorderBuffer، يفحص walsender معلومات الأصل داخل سجل WAL الخاص بالالتزام على الناشر.
3. **تنفيذ الترشيح**: إذا ضُبط origin = “none” وكان origin_id موجودًا، يتخطّى walsender إرسال تلك المعاملة بأكملها ويتجاهل البيانات.

ويوضّح الشكل 12.8 هذا السلوك باستخدام إعداد متسلسل (العقدة 1 $\rightarrow$ العقدة 2 $\rightarrow$ العقدة 3).

![](/images/postgres-internals/pgsql12-fig-12-08.webp)

#### الشكل 12.8. سلوك انتشار البيانات وفقًا لإعداد origin.

**[1] الحالة: origin = ‘any’ (الانتشار عبر جميع العقد)**

- **العقدة 1**: تنفّذ INSERT. وبما أنه لا يوجد أصل في سجل الالتزام، يرسل walsender البيانات إلى العقدة 2.
- **العقدة 2**: يطبّق عامل التطبيق البيانات ويسجّل “origin_id = 1”. ولأن origin = “any”، يرسل walsender هذه البيانات المختومة إلى العقدة 3.
- **العقدة 3**: يستقبل عامل التطبيق البيانات من العقدة 2. ورغم وجود origin_id، يطبّق العامل التغيير لأن `origin = “any”.

**[2] الحالة: origin = ’none’ (الإنهاء عند العقدة الوسيطة)**

- **العقدة 1**: تنفّذ INSERT. وتُرسل البيانات إلى العقدة 2 لعدم وجود أصل.
- **العقدة 2**: يطبّق عامل التطبيق التغيير ويسجّل “origin_id = 1”. وعندما يحدّد walsender قيمة origin_id عبر ReorderBuffer، يتخطّى إرسال الرسالة إلى العقدة 3.
- **العقدة 3**: لا تُستقبل أي بيانات لأن walsender على العقدة 2 يرشّح المعاملة.

ويؤدي ضبط origin = “none” في إعدادات الاشتراك على جميع العقد المشاركة إلى منع حلقات النسخ المتماثل اللانهائية، ما يتيح طوبولوجيات نشط-نشط.

## 12.1.5. فتحة النسخ

تتضمن فتحات النسخ المنطقية خمس سمات إضافية مقارنة بالنسخ المتماثل المتدفّق الفيزيائي. والسمات الثلاث التالية أساسية للمناقشات في الأقسام اللاحقة:

- **plugin**: اسم إضافة الخرج المستخدمة لفكّ الترميز المنطقي (مثل pgoutput).
- **database**: اسم قاعدة البيانات التي ترتبط بها فتحة النسخ. فبينما تكون فتحات النسخ الفيزيائية على مستوى النسخة، تُقصر فتحات النسخ المنطقية على قاعدة بيانات واحدة.
- **confirmed_flush_lsn**: رقم تسلسل السجل (LSN) الذي أكّد عامل التطبيق على المشترك استلام البيانات حتى عنده. ولم يعد الناشر يحتفظ بالمعاملات الملتزمة السابقة لهذا LSN، فأصبحت مؤهّلة للحذف. انظر القسم 12.8 للتفاصيل.

لاحظ أنه مع أن الفتحات المنطقية تتضمن أيضًا سمات مثل *catalog_xmin* و*two_phase*، فإن هذا التوثيق يحذف أوصافها. راجع [التوثيق الرسمي](https://www.postgresql.org/docs/current/view-pg-replication-slots.html) للتفاصيل.

## 12.1.6. التعارضات

لا ينسخ النسخ المتماثل المنطقي عمليات DDL ولا يتأثر بعمليات VACUUM على الناشر، خلافًا للنسخ المتماثل المتدفّق الفيزيائي. ونتيجة لذلك، لا تحدث أنواع التعارضات المرتبطة بالنسخ المتماثل المتدفّق.

ومع ذلك، تنشأ التعارضات أساسًا بسبب تعديلات بيانات متزامنة على مستوى التطبيق على المشترك. فمثلًا، إذا حُذف صف مباشرةً على المشترك ثم حاول الناشر تحديث الصف نفسه لاحقًا، يحدث تعارض **“update_missing”**.

وتتوفر قائمة شاملة بالتعارضات التي يكتشفها PostgreSQL في التوثيق الرسمي: [النسخ المتماثل المنطقي: التعارضات](https://www.postgresql.org/docs/current/logical-replication-conflicts.html).

1. في سجل WAL الخاص بالالتزام (أو الإلغاء)، يُضمَّن origin_id في الترويسة، بينما يُضاف “origin_commit_lsn” و“origin_commit_timestamp” إلى القسم الموسَّع.&#160;[&#x21a9;&#xfe0e;](#fnref:1)

# 12.2. بدء النسخ المتماثل المنطقي

#### نسخة تجريبية: العمل قيد الإنجاز.

قبل إعداد النسخ المتماثل المنطقي، يُفترض توافر الشروط التالية:

- أن يكون لدى الناشر الجداول التي ستُنسخ إلى المشترك.
- أن يكون المشترك قد أنشأ بالفعل جداول بالبنية نفسها الموجودة على الناشر، ولكن دون أي بيانات.

ويستخدم هذا القسم الجداول التالية:

```sql
CREATE TABLE tbl_1 (id int PRIMARY KEY, name text, data int);
CREATE TABLE tbl_2 (id int NOT NULL UNIQUE, name text, data int);
CREATE INDEX tbl_2_idx on tbl_2 (id, name);
CREATE TABLE tbl_3 (id int, name text, data int);
ALTER TABLE tbl_3 REPLICA IDENTITY FULL;
```

لإعداد النسخ المتماثل المنطقي، يُصدر أمران:

- [CREATE PUBLICATION](https://www.postgresql.org/docs/current/sql-createpublication.html) على الناشر.
- [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html) على المشترك.

محتويات القسم

- 12.2.1. إنشاء منشور
- 12.2.2. إنشاء اشتراك

## 12.2.1. إنشاء منشور

ينشئ أمر [CREATE PUBLICATION](https://www.postgresql.org/docs/current/sql-createpublication.html) بيانات المنشور في كتالوجات النظام التالية ويحدّث [pg_class](https://www.postgresql.org/docs/current/catalog-pg-class.html) إذا لزم الأمر:

- [pg_publication](https://www.postgresql.org/docs/current/catalog-pg-publication.html)
- [pg_publication_rel](https://www.postgresql.org/docs/current/catalog-pg-publication-rel.html)
- [pg_publication_namespace](https://www.postgresql.org/docs/current/catalog-pg-publication-namespace.html)

```sql
testdb=# -- Publisher
testdb=# CREATE PUBLICATION mypub FOR TABLE tbl_1, tbl_2, tbl_3;
CREATE PUBLICATION
testdb=# \x
Expanded display is on.
testdb=# SELECT * FROM pg_publication;
-[ RECORD 1 ]+------
oid          | 16460
pubname      | mypub
pubowner     | 10
puballtables | f
pubinsert    | t
pubupdate    | t
pubdelete    | t
pubtruncate  | t
pubviaroot   | f
pubgencols   | n

testdb=# \x
Expanded display is off.
testdb=# SELECT * FROM pg_publication_rel;
  oid  | prpubid | prrelid | prqual | prattrs
-------+---------+---------+--------+---------
 16461 |   16460 |   16438 |        |
 16462 |   16460 |   16446 |        |
 16463 |   16460 |   16455 |        |
(3 rows)
```

ويعرض عرض النظام [pg_publication_tables](https://www.postgresql.org/docs/current/view-pg-publication-tables.html) الربط بين المنشورات والجداول التي تنتمي إليها.

```
testdb=# -- Publisher
testdb=# SELECT * FROM pg_publication_tables;
 pubname | schemaname | tablename |    attnames    | rowfilter
---------+------------+-----------+----------------+-----------
 mypub   | public     | tbl_1     | {id,name,data} |
 mypub   | public     | tbl_2     | {id,name,data} |
 mypub   | public     | tbl_3     | {id,name,data} |
(3 rows)
```

## 12.2.2. إنشاء اشتراك

ينشئ أمر [CREATE SUBSCRIPTION](https://www.postgresql.org/docs/current/sql-createsubscription.html) على المشترك اشتراكًا.

```
testdb=# -- subscriber
testdb=# CREATE SUBSCRIPTION mysub
            CONNECTION 'host=192.168.3.10 port=5432 dbname=testdb'
            PUBLICATION mypub
            WITH (enabled = true, binary = false);
```

وتتكوّن هذه العملية من ثلاث مراحل (انظر الشكل 12.9):

- **المرحلة 1:** إنشاء الاشتراك و(افتراضيًا) طلب فتحة نسخ على الناشر.
- **المرحلة 2:** ربط عامل تطبيق بعملية walsender على الناشر.
- **المرحلة 3:** مزامنة الجداول مع نظيراتها على الناشر.

![](/images/postgres-internals/pgsql12-fig-12-09.webp)

#### الشكل 12.9. تسلسل تهيئة النسخ المتماثل المنطقي.

وتستكشف الأقسام الفرعية التالية هذه المراحل.

### 12.2.2.1. المرحلة 1

تتضمن هذه المرحلة مهمتين رئيسيتين:

- إنشاء بيانات الاشتراك في كتالوجَي النظام [pg_subscription](https://www.postgresql.org/docs/current/catalog-pg-subscription.html) و[pg_subscription_rel](https://www.postgresql.org/docs/current/catalog-pg-subscription-rel.html).
- (افتراضيًا) طلب فتحة نسخ على الناشر لإدارة النسخ المتماثل المنطقي.

ولتنفيذ هاتين المهمتين، ينفّذ المشترك التسلسل التالي:

- (1) تنشئ عملية postgres التي تصدر ‘CREATE SUBSCRIPTION’ اتصالًا بعملية walsender.
- (2) تتفاعل عملية postgres مع walsender من أجل: التحقق من وجود المنشور المحدد.
- استرجاع مخططات الجداول الهدف ومعرّفات OID الخاصة بها لضمان التوافق البنيوي.
- (افتراضيًا) طلب فتحة نسخ. وإذا حدّد الأمر فتحة موجودة، تحذف العملية هذا الطلب.

(3) تُدرج عملية postgres بيانات الاشتراك في ‘pg_subscription’ و‘pg_subscription_rel’. (4) يُنهي الناشر عملية walsender.

```
testdb=# -- Subscriber
testdb=# SELECT * FROM pg_subscription;
-[ RECORD 1 ]-------+---------------------------------------
oid                 | 16436
subdbid             | 16388
subskiplsn          | 0/0
subname             | mysub
subowner            | 10
subenabled          | t
subbinary           | f
substream           | p
subtwophasestate    | d
subdisableonerr     | f
subpasswordrequired | t
subrunasowner       | f
subfailover         | f
subconninfo         | host=192.168.3.10 port=5432 dbname=testdb
subslotname         | mysub
subsynccommit       | off
subpublications     | {mypub}
suborigin           | any

testdb=# \x
Expanded display is off.
testdb=# SELECT s.srsubid, s.srrelid, c.relname, s.srsublsn
testdb-#       FROM pg_subscription_rel AS s, pg_class AS c WHERE c.oid = s.srrelid;
 srsubid | srrelid | relname | srsublsn
---------+---------+---------+-----------
   16436 |   16414 | tbl_1   | 0/1BF35E0
   16436 |   16422 | tbl_2   | 0/1BF35E0
   16436 |   16431 | tbl_3   | 0/1BF5320
(3 rows)
```

وتُنشأ فتحة النسخ على الناشر كما يلي:

```
testdb=# -- Publisher
testdb=# SELECT * FROM pg_replication_slots;
-[ RECORD 1 ]-------+----------
slot_name           | mysub
plugin              | pgoutput
slot_type           | logical
datoid              | 16384
database            | testdb
temporary           | f
active              | t
active_pid          | 2051
xmin                |
catalog_xmin        | 823
restart_lsn         | 0/1BF5320
confirmed_flush_lsn | 0/1BF5358
wal_status          | reserved
safe_wal_size       |
two_phase           | f
two_phase_at        |
inactive_since      |
conflicting         | f
invalidation_reason |
failover            | f
synced              | f
```

### 12.2.2.2. المرحلة 2

تبدأ هذه المرحلة العمليات الخلفية اللازمة للنسخ المتماثل المنطقي.

- (5) يبدأ مُشغّل النسخ المتماثل المنطقي عامل تطبيق.
- (6) يتصل عامل التطبيق بعملية walsender على الناشر ويهيّئ أصل النسخ المتماثل الخاص به (بإنشاء مدخل في [pg_replication_origin](https://www.postgresql.org/docs/current/catalog-pg-replication-origin.html) إن لم يكن موجودًا).

وتواصل هاتان العمليتان &mdash; walsender على الناشر وعامل التطبيق على المشترك &mdash; العمل لتدفق التغييرات وتطبيقها.

### 12.2.2.3. المرحلة 3

تزامن هذه المرحلة الجداول مع الجداول المقابلة على الناشر.

ولتنفيذ هذه المهمة، يبدأ مُشغّل النسخ المتماثل المنطقي عمال تطبيق لاسترجاع صفوف الجداول الهدف.

ويبدأ المُشغّل أكبر عدد ممكن من العمال لتعظيم الكفاءة. ويُسمى العمال المستخدمون للمزامنة **عمال مزامنة الجداول** (table sync workers).

- (7) يبدأ المُشغّل عمال مزامنة الجداول.
- (8) يتصل عمال مزامنة الجداول بعمليات walsender.
- (9) ترسل عمليات walsender بيانات الجداول إلى عمال مزامنة الجداول، الذين يُدرجون البيانات بعد ذلك في الجداول الهدف.
- (10) بعد المزامنة، تنتهي عمليات walsender وعمال مزامنة الجداول.

وتستخدم عمليات walsender وعمال مزامنة الجداول بروتوكولي `COPY ... TO STDOUT` و`COPY ... FROM STDIN` لتدفق بيانات الجداول وإدراجها بكفاءة. راجع [tablesync.c](https://github.com/postgres/postgres/blob/master/src/backend/replication/logical/tablesync.c) لمزيد من التفاصيل.

** pg_createsubscriber

يدعم الإصدار 17 أداة [pg_createsubscriber](https://www.postgresql.org/docs/current/app-pgcreatesubscriber.html).

# 12.3. بنية ReorderBuffer

#### نسخة تجريبية: العمل قيد الإنجاز.

تخصّص كل عملية walsender منطقة **ReorderBuffer**. وتحدّ معلمة الإعداد [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM) حجم هذه المنطقة (الافتراضي 64 ميغابايت).

ويتكوّن ReorderBuffer من المكوّنات الثلاثة التالية (انظر الشكل 12.11):

- [ReorderBuffer](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/include/replication/reorderbuffer.h#L574)
- [ReorderBufferTXN](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/include/replication/reorderbuffer.h#L293)
- [ReorderBufferChange](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/include/replication/reorderbuffer.h#L76)

![](/images/postgres-internals/pgsql12-fig-12-11.webp)

#### الشكل 12.11. بنية ReorderBuffer.

العنصر المحوري في بنية `ReorderBuffer` هو جدول التجزئة *by_txn*، الذي يستخدم معرّف المعاملة (txid) مفتاحًا له. وكل مدخل في جدول التجزئة هذا هو بنية `ReorderBufferTXN`. وتخزّن هذه البنية البيانات الوصفية وبيانات WAL الفعلية المرتبطة بكل معاملة.

وتُمثَّل تعديلات البيانات الفردية (مثل INSERT وUPDATE وDELETE) ببنى `ReorderBufferChange`. ويُلحق النظام هذه البنى **بترتيب LSN** بالقائمة المترابطة المزدوجة **changes** داخل ReorderBufferTXN المقابلة.

## 12.3.1. ReorderBuffer

تحافظ هذه البنية على السياق الأساسي لفكّ الترميز المنطقي.

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **by_txn** | HTAB_* | جدول تجزئة يربط معرّفات txid بمدخلات ReorderBufferTXN. ويعمل كفهرس لاسترجاع المعاملات النشطة بسرعة. |

## 12.3.2. ReorderBufferTXN

تدير هذه البنية حالة معاملة فردية والتغييرات المرتبطة بها.

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **first_lsn** | XLogRecPtr | LSN الخاص بأول سجل تغيير ينتمي إلى هذه المعاملة. ويُستخدم لتحديد نقطة بداية المعاملة. |
| **final_lsn** | XLogRecPtr | LSN الخاص بسجل الالتزام (أو الإلغاء) لهذه المعاملة. |
| **origin_id** | RepOriginId | معرّف أصل النسخ المتماثل الذي أُنشئت فيه هذه المعاملة أصلًا. |
| **origin_lsn** | XLogRecPtr | LSN الخاص بسجل الالتزام على الناشر الذي نشأت فيه هذه المعاملة. |
| **base_snapshot** | Snapshot | اللقطة التاريخية المستخدمة لفكّ ترميز المعاملة. وتضمن صحة الظهور أثناء مسح الكتالوجات بتحديد البيانات التي كانت مرئية عند بداية المعاملة. |
| **changes** | dlist_head | قائمة مترابطة مزدوجة من بنى ReorderBufferChange، تخزّن سجلات تغييرات البيانات الفردية بترتيب LSN. انظر القسم الفرعي التالي. |

**ملاحظة:** مع أن *base_snapshot* ضرورية لتحديد الظهور مباشرةً بعد إنشاء الفتحة أو أثناء تغييرات الكتالوج، فإن المناقشات اللاحقة تحذفها للتركيز على تدفق البيانات في الحالة المستقرة.

## 12.3.3. ReorderBufferChange

تُمثّل هذه البنية تعديل بيانات فرديًا. وتضمّ هذه القائمة العناصر الرئيسية فقط.

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **lsn** | XLogRecPtr | LSN الخاص بسجل WAL الذي ولّد هذا التغيير تحديدًا. |
| **action** | ReorderBufferChangeType | نوع عملية التغيير (مثل INSERT أو UPDATE أو DELETE أو TRUNCATE). |
| **data** | union | اتحاد يحتوي على بيانات خاصة بالعملية، مثل بنيتَي tp (tuple) أو truncate. |
| **data.tp.rlocator** | RelFileLocator | يحدّد العلاقة الفيزيائية (الجدول) المتأثرة بالتغيير. وهو ثلاثي يتكوّن من spcOid (فضاء الجداول) وdbOid (قاعدة البيانات) وrelNumber (رقم RelFilenode). |
| **data.tp.oldtuple** | HeapTuple | النسخة «قبل» من الصف. وتُملأ لعمليات UPDATE أو DELETE إذا تطلّب ذلك إعداد **هوية النسخة** (انظر القسم 12.4.3). |
| **data.tp.newtuple** | HeapTuple | النسخة «بعد» من الصف، وتحتوي على البيانات الجديدة لعمليات INSERT أو UPDATE. |

** ** ReorderBufferChange

```
/*
 * Types of the change passed to a 'change' callback.
 *
 * For efficiency and simplicity reasons we want to keep Snapshots, CommandIds
 * and ComboCids in the same list with the user visible INSERT/UPDATE/DELETE
 * changes. Users of the decoding facilities will never see changes with
 * *_INTERNAL_* actions.
 *
 * The INTERNAL_SPEC_INSERT and INTERNAL_SPEC_CONFIRM, and INTERNAL_SPEC_ABORT
 * changes concern &#34;speculative insertions&#34;, their confirmation, and abort
 * respectively.  They're used by INSERT .. ON CONFLICT .. UPDATE.  Users of
 * logical decoding don't have to care about these.
 */
typedef enum ReorderBufferChangeType
{
	REORDER_BUFFER_CHANGE_INSERT,
	REORDER_BUFFER_CHANGE_UPDATE,
	REORDER_BUFFER_CHANGE_DELETE,
	REORDER_BUFFER_CHANGE_MESSAGE,
	REORDER_BUFFER_CHANGE_INVALIDATION,
	REORDER_BUFFER_CHANGE_INTERNAL_SNAPSHOT,
	REORDER_BUFFER_CHANGE_INTERNAL_COMMAND_ID,
	REORDER_BUFFER_CHANGE_INTERNAL_TUPLECID,
	REORDER_BUFFER_CHANGE_INTERNAL_SPEC_INSERT,
	REORDER_BUFFER_CHANGE_INTERNAL_SPEC_CONFIRM,
	REORDER_BUFFER_CHANGE_INTERNAL_SPEC_ABORT,
	REORDER_BUFFER_CHANGE_TRUNCATE,
} ReorderBufferChangeType;

/* forward declaration */
struct ReorderBufferTXN;

/*
 * a single 'change', can be an insert (with one tuple), an update (old, new),
 * or a delete (old).
 *
 * The same struct is also used internally for other purposes but that should
 * never be visible outside reorderbuffer.c.
 */
typedef struct ReorderBufferChange
{
	XLogRecPtr	lsn;

	/* The type of change. */
	ReorderBufferChangeType action;

	/* Transaction this change belongs to. */
	struct ReorderBufferTXN *txn;

	RepOriginId origin_id;

	/*
	 * Context data for the change. Which part of the union is valid depends
	 * on action.
	 */
	union
	{
		/* Old, new tuples when action == *_INSERT|UPDATE|DELETE */
		struct
		{
			/* relation that has been changed */
			RelFileLocator rlocator;

			/* no previously reassembled toast chunks are necessary anymore */
			bool		clear_toast_afterwards;

			/* valid for DELETE || UPDATE */
			HeapTuple	oldtuple;
			/* valid for INSERT || UPDATE */
			HeapTuple	newtuple;
		}			tp;

		/*
		 * Truncate data for REORDER_BUFFER_CHANGE_TRUNCATE representing one
		 * set of relations to be truncated.
		 */
		struct
		{
			Size		nrelids;
			bool		cascade;
			bool		restart_seqs;
			Oid		   *relids;
		}			truncate;

		/* Message with arbitrary data. */
		struct
		{
			char	   *prefix;
			Size		message_size;
			char	   *message;
		}			msg;

		/* New snapshot, set when action == *_INTERNAL_SNAPSHOT */
		Snapshot	snapshot;

		/*
		 * New command id for existing snapshot in a catalog changing tx. Set
		 * when action == *_INTERNAL_COMMAND_ID.
		 */
		CommandId	command_id;

		/*
		 * New cid mapping for catalog changing transaction, set when action
		 * == *_INTERNAL_TUPLECID.
		 */
		struct
		{
			RelFileLocator locator;
			ItemPointerData tid;
			CommandId	cmin;
			CommandId	cmax;
			CommandId	combocid;
		}			tuplecid;

		/* Invalidation. */
		struct
		{
			uint32		ninvalidations; /* Number of messages */
			SharedInvalidationMessage *invalidations;	/* invalidation message */
		}			inval;
	}			data;

	/*
	 * While in use this is how a change is linked into a transactions,
	 * otherwise it's the preallocated list.
	 */
	dlist_node	node;
} ReorderBufferChange;
```

# 12.4. ترشيح بيانات WAL وتخزينها مؤقتًا

#### نسخة تجريبية: العمل قيد الإنجاز.

يصف هذا القسم آلية ترشيح البيانات وتخزينها مؤقتًا داخل ReorderBuffer.

تبدأ المناقشة بعملية الترشيح متعددة المراحل التي ينفّذها walsender، والتي تحدّد السجلات المؤهّلة لفكّ الترميز. ويتبع ذلك عرض توضيحي لكيفية تراكم ReorderBuffer لهذه التغييرات عبر سيناريو معاملات ملموس.

علاوة على ذلك، يشرح هذا القسم الفروق في تخزين بيانات WAL لعمليات UPDATE وDELETE وفقًا لـ**هوية النسخة**.

وأخيرًا، يقدّم القسم نظرة عامة على آلية «الانسكاب إلى القرص» (Spill to Disk)، التي تُطلَق عندما يتجاوز `ReorderBuffer` حدّ ذاكرته.

محتويات القسم

- 12.4.1. الترشيح
- 12.4.2. تخزين بيانات WAL مؤقتًا
- 12.4.3. العلاقة بين هوية النسخة والصفوف المُفكَّكة
- 12.4.4. إدارة ذاكرة ReorderBuffer وتسلسل المعاملات (الانسكاب إلى القرص)

## 12.4.1. الترشيح

يقرّر walsender ما إذا كان سيفكّ ترميز سجل WAL ويسجّله في قائمة **changes** الخاصة بـReorderBuffer عبر بوابة ترشيح متعددة المراحل.

- **البوابة الأولى (OID قاعدة البيانات):** يتجاهل walsender فورًا سجلات WAL التي تنتمي إلى قواعد بيانات غير قاعدة البيانات الهدف.
- **البوابة الثانية (معرّف الأصل / دالة الاستدعاء):** منذ الإصدار 16، يفحص walsender الأصل قبل دخول البيانات إلى ReorderBuffer. وإذا كان origin = “none” مضبوطًا، يتجاهل walsender أي تغيير قادم من عقدة أخرى (origin_id > 0) في هذه المرحلة. ويمنع ذلك حلقات النسخ المتماثل اللانهائية. راجع القسم 12.1.4.1 للتفاصيل.
- **البوابة الثالثة (ذاكرة المنشور المؤقتة):** منذ الإصدار 15، ينفّذ walsender ترشيحًا على مستوى الجدول قبل التخزين المؤقت. فيتخطّى التغييرات على الجداول غير المضمّنة في منشور والصفوف المستبعدة بمرشّحات الصفوف دون تجميعها في المخزن المؤقت.
- **البوابة الرابعة (نوع العلاقة / البنية الفيزيائية):** يرشّح walsender أيضًا سجلات WAL المتعلقة بتحديثات الفهارس. فالنسخ المتماثل المنطقي يركّز على تغييرات البيانات على مستوى الصف؛ وبمجرد أن يحدّث عامل التطبيق صفًّا على المشترك، تتولّى آلية الفهرسة الخاصة بالمشترك تلقائيًا تحديثات الفهارس المرتبطة.

ولا تُخزَّن في ReorderBuffer إلا التغييرات التي تعبر جميع هذه البوابات بنجاح.

** الترشيح في الإصدار 14 أو أقدم

قبل الإصدار 15، كانت العملية تجري كما يلي:

1. فحص OID قاعدة البيانات لسجل WAL (الإصدار 10 أو أحدث).
2. فكّ ترميز سجل WAL وتجميع جميع التغييرات الناتجة في ReorderBuffer.
3. ترشيح التغييرات مقابل تعريفات المنشور فقط عند **الالتزام**.

وفي هذه الإصدارات، كان walsender يقيّم الترشيح على مستوى الجدول بتكاسل. ونتيجة لذلك، استهلك ReorderBuffer ذاكرة دون داعٍ بتجميع تغييرات كان سيُتجاهلها في النهاية عند الالتزام.

## 12.4.2. تخزين بيانات WAL مؤقتًا

لفهم كيفية إعادة بناء walsender للتغييرات المنطقية من بيانات WAL الخام، يفحص هذا القسم عملية التخزين المؤقت عبر سيناريو عملي لتداخل المعاملات.

### 12.4.1.1. الإعداد: العلاقات الهدف

يستخدم السيناريو جدولين، *tbl_a* و*tbl_b*. ويستخدم كلاهما مفتاحًا أساسيًا كـ**REPLICA IDENTITY** الافتراضية.

```sql
CREATE TABLE tbl_a (id int PRIMARY KEY, name text, data int);
CREATE TABLE tbl_b (id int PRIMARY KEY, name text, data int);

INSERT INTO tbl_a VALUES (1, 'Alice', 100);
INSERT INTO tbl_b VALUES (10, 'Ken', 100);
```

### 12.4.1.2. السيناريو: معالجة معاملات متداخلة

يوضّح الخط الزمني أدناه توليد سجلات WAL بواسطة معاملتين متزامنتين (txid 840 وtxid 841)، والعملية التي يلتقط بها ReorderBuffer هذه التغييرات.

```
T0: BEGIN; -- txid 840
T1: INSERT INTO tbl_a VALUES(2,'Bob',200);
T2:
T3: INSERT INTO tbl_b VALUES(11,'Luke',110);
T4:
T5:
T6: DELETE FROM tbl_b WHERE id=10;
T7: COMMIT;
T8:
```

```
T0: BEGIN; -- txid 841
T1:
T2: INSERT INTO tbl_a VALUES(3,'Candy',3);
T3:
T4: UPDATE tbl_a SET data=data+1 WHERE id=1;
T5: UPDATE tbl_a SET data=data+1 WHERE id=1;
T6:
T7:
T8: COMMIT;
```

**تسلسل العمليات:**

- **T0:** تبدأ كل من txid 840 وtxid 841.
- **T1:** تُدرج txid 840 صفًّا في *tbl_a*.
- **T2:** تُدرج txid 841 صفًّا في *tbl_a*.
- **T3:** تُدرج txid 840 صفًّا في *tbl_b*.
- **T4:** تحدّث txid 841 الجدول *tbl_a*.
- **T5:** تحدّث txid 841 الجدول *tbl_a* مرة أخرى.
- **T6:** تحذف txid 840 صفًّا من *tbl_b*.
- **T7:** تلتزم txid 840. ويؤدي ذلك إلى أن ينهي ReorderBuffer معالجة التغييرات المتراكمة لهذه المعاملة ويجهّزها.
- **T8:** تلتزم txid 841، وتُعالَج تغييراتها بعد ذلك.

** لماذا لا تؤثر مستويات العزل في فكّ الترميز المنطقي

لفهم سبب عدم تأثير مستويات عزل المعاملات في فكّ الترميز المنطقي، من الضروري النظر في متى وكيف تعمل هذه الآليات.

يعيد فكّ الترميز المنطقي بناء سجلات التغييرات الملتزمة (WAL) التي أُنهيت وأُطبّقت على الصفوف بالفعل. وعندما تصل هذه التغييرات إلى WAL، تكون قد اجتازت بالفعل جميع فحوص الظهور التي تفرضها مستويات العزل الخاصة بها أثناء التنفيذ. فالتحكم في التزامن يحكم ظهور الصفوف أثناء عمل المعاملة؛ في المقابل، تركّز عملية فكّ الترميز فقط على إعادة تجميع النتائج التاريخية للمعاملات المكتملة.

وبناءً على ذلك، لا يكون لمستوى العزل الأصلي للمعاملة أي تأثير في منطق فكّ الترميز نفسه.

وفيما يلي شرح لكيفية التقاط ReorderBuffer لبيانات WAL في كل خطوة.

### 12.4.1.3. تغييرات الحالة التفصيلية

#### **T1:** إدراج في tbl_a بواسطة txid 840

تنشئ txid 840 بنية ReorderBufferTXN جديدة. ويُضبط حقلها first_lsn على LSN الخاص ببيانات WAL المكتوبة بهذا الإدراج، ويُضاف سجل التغيير إلى قائمة changes (انظر الشكل 12.12).

![](/images/postgres-internals/pgsql12-fig-12-12.webp)

#### الشكل 12.12. حالة ReorderBuffer بعد T1.

تمثّل بنية ReorderBufferChange التغييرات الفردية. وهي تغلّف بيانات وصفية أساسية، تشمل LSN ونوع العملية (مثل INSERT) ومعرّفات OID للعلاقة الهدف (فضاء الجداول وقاعدة البيانات والعلاقة). كما تخزّن البنية بيانات الصف الفعلية.

** كتابات الصفحة الكاملة على المستوى المنطقي (FPW)

كما ذُكر في القسم 9.4.3.1، عندما تُضبط [wal_level](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-LEVEL) على **logical**، يتضمّن جزء البيانات الرئيسية لكتابة الصفحة الكاملة (FPW) بيانات الصف المعدَّلة الفعلية.

ويتيح ذلك لـwalsender تجاوز كتلة الصفحة أثناء استرجاع WAL. فيقرأ walsender بيانات الصف مباشرةً من قسم البيانات الرئيسية، ما يقلّل كلفة الاستخراج ويحسّن كفاءة فكّ الترميز.

#### **T2:** إدراج في tbl_a بواسطة txid 841

تهيّئ txid 841 بنية ReorderBufferTXN جديدة (انظر الشكل 12.13).

![](/images/postgres-internals/pgsql12-fig-12-13.webp)

#### الشكل 12.13. حالة ReorderBuffer بعد T2.

يجمع ReorderBuffer تغييرات txid 840 وtxid 841 في قوائم فرعية مستقلة لضمان العزل المعاملاتي داخل المخزن المؤقت.

#### **T3:** إدراج في tbl_b بواسطة txid 840

يُلحق ReorderBuffer بيانات WAL الناتجة عن عملية الإدراج في txid 840 بقائمة `changes` الخاصة بها (انظر الشكل 12.14).

![](/images/postgres-internals/pgsql12-fig-12-14.webp)

#### الشكل 12.14. حالة ReorderBuffer بعد T3.

#### **T4-T5:** تحديث tbl_a بواسطة txid 841

تنفّذ txid 841 عبارتي UPDATE متتاليتين على *tbl_a*.

يُلحق ReorderBuffer بيانات WAL الخاصة بأول UPDATE بقائمة changes الخاصة بـtxid 841 (انظر الشكل 12.15).

![](/images/postgres-internals/pgsql12-fig-12-15.webp)

#### الشكل 12.15. حالة ReorderBuffer بعد T4.

في إعداد REPLICA IDENTITY DEFAULT، يتضمّن سجل WAL العنصر *oldtuple* فقط إذا عُدّلت أعمدة المفتاح الأساسي.

وفي هذا السيناريو، بما أن المفتاح الأساسي (id) يبقى دون تغيير، يمكن للمشترك تحديد الصف الهدف بشكل فريد باستخدام *id = 1* الموجود في *newtuple*. ونتيجة لذلك، يُحذف *oldtuple* لأنه غير ضروري لتحديد الصف.

راجع القسم 12.4.3 لمزيد من التفاصيل.

يوضّح الشكل 12.16 الحالة بعد أن تحدّث عبارة UPDATE الثانية الصف نفسه مرة أخرى.

![](/images/postgres-internals/pgsql12-fig-12-16.webp)

#### الشكل 12.16. حالة ReorderBuffer بعد T5.

#### **T6:** حذف من tbl_b بواسطة txid 840

عندما تحذف txid 840 صفًّا من *tbl_b*، يُلحق ReorderBuffer سجل التغيير بقائمة changes (انظر الشكل 12.17).

![](/images/postgres-internals/pgsql12-fig-12-17.webp)

#### الشكل 12.17. حالة ReorderBuffer بعد T6.

ويخزّن هذا السجل بيانات المفتاح الأساسي فقط، التي تعمل كهوية نسخة (انظر الشكل 12.18).

![](/images/postgres-internals/pgsql12-fig-12-18.webp)

#### الشكل 12.18. تفاصيل سجل تغيير DELETE الذي يحتوي على بيانات المفتاح الأساسي فقط.

لا يحتاج المشترك إلا إلى معلومات المفتاح لتحديد الصف الهدف وحذفه. وبحذف الأعمدة غير المفتاحية (مثل ’name’ و‘data’)، يقلّل PostgreSQL استهلاك الذاكرة في ReorderBuffer ويخفّض عرض النطاق الشبكي.

#### **T7:** التزام بواسطة txid 840

عندما تلتزم txid 840، يمرّ ReorderBuffer على قائمة changes الخاصة ببنية ReorderBufferTXN المقابلة من الرأس. وتستقبل إضافة الخرج كل تغيير، وتنسّقه في رسالة نسخ متماثل، وترسله إلى المشترك.

ويصف القسم 12.6 إعادة ترتيب التغييرات وإرسال الرسائل. وبعد إرسال البيانات، يحذف ReorderBuffer مدخل ReorderBufferTXN (انظر الشكل 12.19).

![](/images/postgres-internals/pgsql12-fig-12-19.webp)

#### الشكل 12.19. حالة ReorderBuffer بعد T7.

#### **T8:** التزام بواسطة txid 841

وبالمثل، عندما تلتزم txid 841، تُعاد بناء تغييراتها المتراكمة وتُرسل إلى المشترك بالطريقة نفسها.

## 12.4.3. العلاقة بين هوية النسخة والصفوف المُفكَّكة

تعتمد البيانات المسجَّلة في WAL لعمليات UPDATE وDELETE على **هوية النسخة** المضبوطة للجدول الهدف.

### 12.4.3.1. عمليات UPDATE

يختلف سلوك عمليات UPDATE وفقًا لما إذا كانت هوية النسخة مضبوطة على مفتاح محدّد (مفتاح أساسي أو فهرس) أم على FULL.

أولًا، تأمّل الحالة التي تكون فيها هوية النسخة **DEFAULT (مفتاح أساسي)** أو **USING INDEX**:

ويختلف محتوى *oldtuple* و*newtuple* وفقًا للأعمدة المعدَّلة:

| هوية النسخة | نوع التحديث | oldtuple | newtuple |
| --- | --- | --- | --- |
| **PK / Index** | أعمدة غير مفتاحية | <none> | الصف الجديد كاملًا |
| **PK / Index** | **أعمدة مفتاحية** | **الأعمدة المفتاحية** | الصف الجديد كاملًا |

ويتوقف تسجيل PostgreSQL للعنصر *oldtuple* على ما إذا كانت الأعمدة المحدَّثة جزءًا من هوية النسخة. انظر الشكل 12.20.

![](/images/postgres-internals/pgsql12-fig-12-20.webp)

#### الشكل 12.20. بنية الحمولة لعمليات UPDATE في ظل REPLICA IDENTITY القياسية.

عند تحديث أعمدة تشكّل هوية النسخة، يحتوي *oldtuple* على قيم المفتاح السابقة. ويتيح ذلك للمشترك **تحديد** الصف الهدف الموجود باستخدام هذه القيم الأصلية. وتوضّح شبه الشيفرة التالية هذا المنطق:

```sql
-- Pseudo-SQL: Identifying the tuple via the old key
UPDATE tbl_a SET id = id + 100 WHERE id = 1;
```

وبالعكس، إذا لم تُحدَّث سوى الأعمدة غير الهوياتية، يبقى *oldtuple* فارغًا (none). وفي هذا السيناريو، يحدّد المشترك الصف الهدف باستخدام قيم المفتاح الموجودة أصلًا في *newtuple*.

```sql
-- Pseudo-SQL: Identifying the tuple via the current key
UPDATE tbl_a SET data = data + 100 WHERE id = 1;
```

** ملاحظة

عامل التطبيق **لا** يجمّع استعلامات SQL النصية ولا ينفّذها. ومع أنه يستفيد من بنية المُنفّذ، فإنه يتجاوز مرحلتي التحليل والتخطيط.

وبدلًا من ذلك، ينفّذ عمليات بحث مباشرة عن الصفوف &mdash; باستخدام مسوح الفهارس أو المسوح التسلسلية عبر دوال مثل [RelationFindReplTupleByIndex](https://github.com/postgres/postgres/blob/3b28dad70e2fa57a973697d51242c284d475c7df/src/backend/executor/execReplication.c#L182) &mdash; لتحديد البيانات الهدف وتعديلها.

وعندما تكون هوية النسخة **FULL**، يخزّن *oldtuple* الصف كاملًا كما كان قبل التحديث، ويخزّن *newtuple* الصف المحدَّث كاملًا. انظر الشكل 12.21.

| هوية النسخة | نوع التحديث | oldtuple | newtuple |
| --- | --- | --- | --- |
| **FULL** | أي أعمدة | الصف القديم كاملًا | الصف الجديد كاملًا |

![](/images/postgres-internals/pgsql12-fig-12-21.webp)

#### الشكل 12.21. بنية الحمولة لعمليات UPDATE في ظل REPLICA IDENTITY FULL.

لتحديد الصف الهدف بشكل فريد في جدول بلا مفتاح رسمي، يجب على المشترك مطابقة قيم جميع الأعمدة في جملة WHERE الخاصة به.

```sql
-- Pseudo-SQL: Full column matching required for identification
UPDATE tbl_a SET data = data + 100 WHERE id = 1 AND name = 'Alice' AND data = 100;
```

### 12.4.3.2. عمليات DELETE

في عمليات DELETE، يسجّل PostgreSQL العنصر *oldtuple* فقط، إذ لا توجد حالة لاحقة:

| هوية النسخة | oldtuple | newtuple |
| --- | --- | --- |
| **PK / Index** | **الأعمدة المفتاحية** | <none> |
| **FULL** | الصف القديم كاملًا | <none> |

عند استخدام هوية **PK** أو **Index**، يحفظ *oldtuple* المفتاح فقط، لأن هذه المعلومات كافية للمشترك لتحديد الصف الهدف وإزالته.

في المقابل، يتطلب إعداد **FULL** وجود *oldtuple* كاملًا لضمان قدرة المشترك على تحديد الصف المعني بالحذف بدقة. انظر الشكل 12.22.

![](/images/postgres-internals/pgsql12-fig-12-22.webp)

#### الشكل 12.22. تحديد الصفوف لعمليات DELETE عبر بيانات oldtuple.

## 12.4.4. إدارة ذاكرة ReorderBuffer وتسلسل المعاملات (الانسكاب إلى القرص)

لمنع استنفاد الذاكرة عند معالجة المعاملات الكبيرة، ينفّذ ReorderBuffer آلية **الانسكاب إلى القرص**. وتُطلَق هذه العملية كلما تجاوز الاستهلاك التراكمي للذاكرة لجميع المعاملات المخزّنة مؤقتًا الحدَّ الذي تحدّده معلمة [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM).

### 12.4.4.1. خوارزمية الانسكاب

وتوضّح الخطوات التالية كيفية إدارة ReorderBuffer لبصمته الذاكرية:

1. **مراقبة استهلاك الذاكرة**: لكل سجل WAL جديد يُلحق بـReorderBuffer، يزداد حجم الذاكرة المتتبَّع بمقدار حجم سجل ReorderBufferChange المضاف حديثًا.
2. **تقييم الحد**: يُقارَن حجم الذاكرة الحالي بحدّ *logical_decoding_work_mem*.
3. **إطلاق الإخلاء (إذا تجاوز الحد)**:
4. **تحديد الهدف**: يحدّد النظام المعاملة «الأثقل» &mdash; أي المعاملة التي **تراكم** حاليًا أكبر عدد من التغييرات المخزّنة.
5. **تسلسل البيانات**: تُكتب جميع التغييرات المخزّنة لتلك المعاملة تحديدًا في ملف `.spill` داخل الدليل `$PGDATA/pg_replslot/`.
6. **استعادة الذاكرة**: **تُحرَّر** الذاكرة المخصّصة للتغييرات المسلسَلة، بينما تبقى البيانات الوصفية للمعاملة (بنية ReorderBufferTXN) في المخزن المؤقت.
7. **تحديث حالة المعاملة**: تُحدَّث حالة المعاملة إلى *serialized = true*. وتشير هذه العلامة إلى أنه يجب قراءة البيانات مرة أخرى من القرص خلال مرحلة فكّ الترميز النهائية (مثل وقت الالتزام).

يوضّح الشكل 12.23 سيناريو تُسكب فيه معاملة إلى القرص لاستيعاب البيانات الواردة:

![](/images/postgres-internals/pgsql12-fig-12-23.webp)

#### الشكل 12.23. إدارة الذاكرة في ReorderBuffer والانسكاب إلى القرص.

1. يُلحق سجل WAL جديد من $\text{txid}_{2}$، لكن ReorderBuffer بلغ سعته بالفعل.
2. يحدّد النظام $\text{txid}_{3}$ كالمعاملة الأكثر تراكمًا للتغييرات. فتُسلسَل تغييراتها في ملف انسكاب، وتُحرَّر الذاكرة المرتبطة بها.
3. تُضاف تغييرات $\text{txid}_{2}$ بنجاح إلى ReorderBuffer باستخدام المساحة المتاحة حديثًا.

يعطي PostgreSQL الأولوية لسكب المعاملة «الأثقل» بدلًا من دفع جميع المعاملات دفعة واحدة. ويقلّل هذا النهج إدخال/إخراج القرص مع إبقاء استهلاك الذاكرة ضمن الحدود المسموح بها بفعالية.

### 12.4.4.2. بنية ملف الانسكاب واصطلاحات التسمية

تُخزَّن ملفات الانسكاب داخل دليل فتحة النسخ:

```
$PGDATA/pg_replslot/<slot_name>/
    \-+-- xid-856-lsn-0-6000000.spill
      |-- xid-856-lsn-0-7000000.spill
      +-- xid-856-lsn-0-8000000.spill
```

وتتيح اصطلاحات تسمية هذه الملفات تحديدها بشكل فريد بمعرّف المعاملة ونطاق LSN:

**التنسيق:** `xid-[XID]-lsn-[LSN_HIGH]-[LSN_LOW].spill`

- **XID**: معرّف المعاملة (ممثّلًا بالنظام العشري).
- **LSN_HIGH**: الخانات الـ32 العلوية من LSN (ممثّلة بالنظام السداسي عشري).
- **LSN_LOW**: الخانات الـ32 السفلية من LSN (ممثّلة بالنظام السداسي عشري).

**مثال عملي:**

```bash
$ ls -l -h $PGDATA/pg_replslot/myslot/
total 68M
-rw------- 1 postgres postgres  200 Mar 24 08:12 state
-rw------- 1 postgres postgres  30M Mar 24 08:12 xid-856-lsn-0-6000000.spill
-rw------- 1 postgres postgres  34M Mar 24 08:12 xid-856-lsn-0-7000000.spill
-rw------- 1 postgres postgres 4.5M Mar 24 08:12 xid-856-lsn-0-8000000.spill
```

# 12.5. إضافات خرج فكّ الترميز المنطقي: pgoutput

#### نسخة تجريبية: العمل قيد الإنجاز.

تُسلسِل إضافة الخرج أساسًا بيانات التغييرات &mdash; المنظّمة والمعاد ترتيبها بواسطة **ReorderBuffer** &mdash; إلى تنسيق متوافق مع المشترك.

وتنفّذ الإضافة المهام المحددة التالية:

- **تحويل البيانات وترشيحها:** تنفّذ الإضافة تحققًا نهائيًا من البيانات الثنائية داخل ReorderBuffer مقابل إعداد المنشور. وتحدّد ما إذا كان الجدول الهدف أو إجراءات محدّدة (مثل INSERT أو TRUNCATE) مضمّنة في الاشتراك، وتقيّم مرشّحات الصفوف أو قوائم الأعمدة. وبعد استبعاد البيانات غير ذات الصلة، تنسّق الإضافة الحمولة المتبقية في أنواع البيانات المناسبة (مثل النصية أو الثنائية) التي يفرضها بروتوكول النسخ المتماثل.
- **توليد الرسائل:** تبني الإضافة تسلسلًا منطقيًا من الرسائل، مثل BEGIN وINSERT/UPDATE/DELETE/TRUNCATE وCOMMIT. وتُمرَّر هذه الرسائل إلى عملية walsender، التي تدير النقل الشبكي.

وكما يوحي الاسم، فإن هذه الآلية **قابلة للإضافة**. ويمكن للإضافات المخصّصة دعم تنسيقات خرج فريدة أو منطق معالجة داخلي متخصص. وفي النسخ المتماثل المنطقي القياسي في PostgreSQL، تعمل الإضافة المدعومة رسميًا **pgoutput** كالإضافة الافتراضية.

ويتكوّن تنسيق رسائل pgoutput من سلسلة حزم بيانات موسومة. وتصف الأقسام التالية بنية هذه الرسائل.

** معلومات

مع أن PostgreSQL يدعم إصدارات بروتوكول متعددة (الإصدارات 1 حتى 4)، يركّز هذا القسم أساسًا على البنى الأساسية. وللاطلاع على مرجع شامل، راجع التوثيق الرسمي: [تنسيقات رسائل النسخ المتماثل المنطقي](https://www.postgresql.org/docs/current/protocol-logicalrep-message-formats.html).

محتويات القسم

- 12.5.1. TupleData (رسالة فرعية مشتركة)
- 12.5.2. التحكم في المعاملات
- 12.5.3. لغة معالجة البيانات (DML)
- 12.5.4. التحكم في البث

## 12.5.1. TupleData (رسالة فرعية مشتركة)

بنية TupleData رسالة فرعية مشتركة تُستخدم داخل عمليات DML لتمثيل محتويات الصفوف.

```json
[num_cols: Int16]
  For each column:
    [kind: Byte1('n'|'u'|'t'|'b')]
    if kind = 't' or 'b':
      [length: Int32] [value: Byte*n*]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **num_cols** | Int16 | عدد الأعمدة في الصف. |
| *لكل عمود:* |  |  |
| **kind** | Byte1 | ’n’ = NULL؛ ‘u’ = قيمة TOASTed غير متغيّرة؛ ’t’ = بتنسيق نصي؛ ‘b’ = بتنسيق ثنائي. |
| **length** | Int32 | طول قيمة العمود بالبايتات. يوجد فقط عندما يكون kind هو ’t’ أو ‘b’. |
| **value** | Byte*n* | قيمة العمود الفعلية. ويساوي *n* الطولَ السابق. ويوجد فقط عندما يكون kind هو ’t’ أو ‘b’. |

## 12.5.2. التحكم في المعاملات

### 12.5.2.1. البدء (‘B’)

تحدّد بداية معاملة. وتوفّر LSN الخاص بالمعاملة والطابع الزمني للالتزام، ما يتيح للمشترك الحفاظ على الترتيب الزمني.

```json
[Byte1('B')] [final_lsn: Int64] [commit_timestamp: Int64] [txid: Int32]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **‘B’** | Byte1 | يحدّد الرسالة كرسالة BEGIN. |
| **final_lsn** | Int64 (XLogRecPtr) | LSN النهائي للمعاملة. ويقابل عادةً *commit_lsn*، لكنه يعكس *prepare_lsn* في عمليات الالتزام على مرحلتين. |
| **commit_timestamp** | Int64 (TimestampTz) | الطابع الزمني للالتزام بالميكروثانية منذ حقبة PostgreSQL (2000-01-01). |
| **txid** | Int32 (TransactionId) | المعرّف XID (معرّف المعاملة) للمعاملة. |

### 12.5.2.2. الالتزام (‘C’)

تحدّد نهاية معاملة. وعند استقبالها، يطبّق المشترك التغييرات المتراكمة محليًا كوحدة ذرّية واحدة.

```json
[Byte1('C')] [flags: Int8] [commit_lsn: Int64] [end_lsn: Int64] [commit_timestamp: Int64]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **‘C’** | Byte1 | يحدّد الرسالة كرسالة COMMIT. |
| **flags** | Int8(0) | علامات محجوزة؛ غير مستخدمة حاليًا. |
| **commit_lsn** | Int64 (XLogRecPtr) | LSN الخاص بالالتزام. |
| **end_lsn** | Int64 (XLogRecPtr) | LSN النهائي للمعاملة. |
| **commit_timestamp** | Int64 (TimestampTz) | الطابع الزمني للالتزام. |

## 12.5.3. لغة معالجة البيانات (DML)

### 12.5.3.1. الأصل (‘O’)

تُستخدم في الإعدادات التي تتضمن نسخًا متماثلًا متعدد العقد. وهي تُعلم المشترك بالمكان الذي حدثت فيه المعاملة أصلًا لمنع حلقات النسخ المتماثل.

```json
[Byte1('O')] [origin_lsn: Int64] [origin_name: String]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| ‘O’ | Byte1 | يحدّد الرسالة كرسالة أصل. |
| origin_lsn | Int64 (XLogRecPtr) | LSN الخاص بالالتزام على الخادم الأصلي. |
| origin_name | String | اسم الأصل. لاحظ أنه قد توجد رسائل أصل متعددة داخل معاملة واحدة. |

### 12.5.3.2. العلاقة (‘R’)

توفّر بيانات وصفية لجدول محدّد. وتُرسل هذه الرسالة عادةً قبل أول رسالة DML لجدول ما في جلسة، وتربط معرّفًا فريدًا بمخطط الجدول وأعمدته.

```json
[Byte1('R')] [rel_id: Int32] [namespace: String] [relname: String]
             [replica_identity: Int8] [num_columns: Int16]
  For each column:
    [flags: Int8] [name: String] [type_oid: Int32] [atttypmod: Int32]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| ‘R’ | Byte1 | يحدّد الرسالة كرسالة علاقة. |
| rel_id | Int32 (Oid) | معرّف OID للعلاقة. |
| namespace | String | فضاء الأسماء (سلسلة فارغة بالنسبة إلى pg_catalog). |
| relname | String | اسم العلاقة. |
| replica_identity | Int8 | إعداد هوية النسخة للعلاقة (مثل relreplident في pg_class). ’d’=افتراضي، ’n’=لا شيء، ‘f’=كامل، ‘i’=فهرس. |
| num_columns | Int16 | عدد الأعمدة. |
| *لكل عمود:* |  |  |
| flags | Int8 | علامات العمود. 0 = لا علامات؛ 1 = العمود جزء من مفتاح هوية النسخة. |
| name | String | اسم العمود. |
| type_oid | Int32 (Oid) | معرّف OID لنوع بيانات العمود. |
| atttypmod | Int32 | مُعدِّل نوع العمود (atttypmod). |

### 12.5.3.3. الإدراج (‘I’)

تمثّل إدراج صف جديد. وتتضمّن معرّف العلاقة الهدف وTupleData الخاصة بالصف الجديد.

```json
[Byte1('I')] [rel_id: Int32] [Byte1('N')] [new_tuple: TupleData]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| ‘I’ | Byte1 | يحدّد الرسالة كرسالة إدراج. |
| rel_id | Int32 (Oid) | معرّف OID للعلاقة المقابلة للمعرّف في رسالة العلاقة. |
| ‘N’ | Byte1 | يحدّد TupleData التالية كصف جديد. |
| new_tuple | TupleData | TupleData تمثّل محتويات الصف الجديد. |

### 12.5.3.4. التحديث (‘U’)

تمثّل تحديث صف موجود. ووفقًا لإعداد REPLICA IDENTITY وما إذا تغيّرت الأعمدة المفتاحية، قد تتضمّن قيم الصف القديم لمساعدة المشترك على تحديد السجل الصحيح الذي يجب تعديله.

```
-- REPLICA IDENTITY DEFAULT or INDEX (key columns changed):
[Byte1('U')] [rel_id: Int32] [Byte1('K')] [old_tuple: TupleData] [Byte1('N')] [new_tuple: TupleData]

-- REPLICA IDENTITY FULL:
[Byte1('U')] [rel_id: Int32] [Byte1('O')] [old_tuple: TupleData] [Byte1('N')] [new_tuple: TupleData]

-- REPLICA IDENTITY DEFAULT or INDEX (key columns NOT changed):
[Byte1('U')] [rel_id: Int32] [Byte1('N')] [new_tuple: TupleData]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| ‘U’ | Byte1 | يحدّد الرسالة كرسالة تحديث. |
| rel_id | Int32 (Oid) | معرّف OID للعلاقة المقابلة للمعرّف في رسالة العلاقة. |
| ‘K’ | Byte1 | *(اختياري)* يحدّد TupleData التالية كمفتاح. ويوجد فقط إذا غيّر التحديث بيانات في أي عمود جزء من فهرس REPLICA IDENTITY. وهو متنافٍ مع ‘O’. |
| ‘O’ | Byte1 | *(اختياري)* يحدّد TupleData التالية كصف قديم. ويوجد فقط إذا كان الجدول مضبوطًا على REPLICA IDENTITY FULL. وهو متنافٍ مع ‘K’. |
| old_tuple | TupleData | *(اختياري)* TupleData للصف القديم أو المفتاح الأساسي. ويوجد فقط إذا كانت العلامة السابقة ‘K’ أو ‘O’ موجودة. |
| ‘N’ | Byte1 | يحدّد TupleData التالية كصف جديد. |
| new_tuple | TupleData | TupleData تمثّل محتويات الصف الجديد. |

### 12.5.3.5. الحذف (‘D’)

تمثّل حذف صف. ويستخدم المشترك بيانات المفتاح أو الصف القديم الموفَّرة لتحديد السجل وإزالته.

```
-- REPLICA IDENTITY DEFAULT or INDEX:
[Byte1('D')] [rel_id: Int32] [Byte1('K')] [old_key_tuple: TupleData]

-- REPLICA IDENTITY FULL:
[Byte1('D')] [rel_id: Int32] [Byte1('O')] [old_tuple: TupleData]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| ‘D’ | Byte1 | يحدّد الرسالة كرسالة حذف. |
| rel_id | Int32 (Oid) | معرّف OID للعلاقة المقابلة للمعرّف في رسالة العلاقة. |
| ‘K’ | Byte1 | *(إما ‘K’ أو ‘O’، وليس كلتاهما)* يحدّد TupleData التالية كمفتاح. ويوجد إذا كان الجدول يستخدم فهرسًا كهوية نسخة. |
| ‘O’ | Byte1 | *(إما ‘K’ أو ‘O’، وليس كلتاهما)* يحدّد TupleData التالية كصف قديم. ويوجد إذا كان الجدول مضبوطًا على REPLICA IDENTITY FULL. |
| old_key_tuple | TupleData | TupleData تمثّل محتويات الصف القديم أو المفتاح الأساسي، وفقًا للعلامة السابقة. |

### 12.5.3.6. الاقتطاع (‘T’)

تمثّل إزالة جماعية لجميع الصفوف في جدول واحد أو أكثر.

```json
[Byte1('T')] [num_relations: Int32] [options: Int8]
             [rel_id: Int32] ...   -- repeated num_relations times
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| ‘T’ | Byte1 | يحدّد الرسالة كرسالة اقتطاع. |
| num_relations | Int32 | عدد العلاقات المراد اقتطاعها. |
| options | Int8 | بتات خيارات TRUNCATE: البت 0 (1) = CASCADE؛ البت 1 (2) = RESTART IDENTITY. |
| rel_id | Int32 (Oid) | معرّف OID للعلاقة المقابلة للمعرّف في رسالة العلاقة. ويتكرر هذا الحقل num_relations مرة. |

## 12.5.4. التحكم في البث

تُستخدم الرسائل التالية عندما يرسل الناشر البيانات على شكل مقاطع لدعم **بث المعاملات الكبيرة**.

للتفاصيل، راجع القسم 12.6.3.

### 12.5.4.1. بدء البث (‘S’)

تحدّد بداية **مقطع بث**. وتُستخدم عندما تُقسَّم معاملة كبيرة جارية إلى مقاطع متعددة.

```json
[Byte1('S')] [txid: Int32] [first_segment: Int8]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **‘S’** | Byte1 | يحدّد الرسالة كرسالة بدء بث. |
| **txid** | Int32 (TransactionId) | المعرّف XID للمعاملة. |
| **first_segment** | Int8 | يُضبط على 1 إذا كان هذا أول مقطع لهذا XID؛ وإلا 0. |

### 12.5.4.2. إيقاف البث (‘E’)

تحدّد نهاية مقطع بث.

```json
[Byte1('E')]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **‘E’** | Byte1 | يحدّد الرسالة كرسالة إيقاف بث. |

### 12.5.4.3. التزام البث (‘c’)

تحدّد التزام معاملة مبثوثة. وتحتوي على معلومات مشابهة لرسالة الالتزام القياسية (‘C’) لكنها تعمل في سياق البث.

```json
[Byte1('c')] [txid: Int32] [flags: Int8] [commit_lsn: Int64] [end_lsn: Int64] [commit_timestamp: Int64]
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **‘c’** | Byte1 | يحدّد الرسالة كرسالة التزام بث. |
| **txid** | Int32 (TransactionId) | المعرّف XID للمعاملة. |
| **flags** | Int8(0) | علامات محجوزة؛ غير مستخدمة حاليًا. |
| **commit_lsn** | Int64 (XLogRecPtr) | LSN الخاص بالالتزام. |
| **end_lsn** | Int64 (XLogRecPtr) | LSN النهائي للمعاملة. |
| **commit_timestamp** | Int64 (TimestampTz) | الطابع الزمني للالتزام. |

### 12.5.4.4. إلغاء البث (‘A’)

تحدّد إلغاء (تراجع) معاملة مبثوثة. وتُستخدم أيضًا لإلغاء المعاملات الفرعية.

```json
[Byte1('A')] [txid: Int32] [subxid: Int32] [abort_lsn: Int64]? [abort_timestamp: Int64]?
```

| العنصر | النوع | الوصف |
| --- | --- | --- |
| **‘A’** | Byte1 | يحدّد الرسالة كرسالة إلغاء بث. |
| **txid** | Int32 (TransactionId) | المعرّف XID للمعاملة. |
| **subxid** | Int32 (TransactionId) | المعرّف XID للمعاملة الفرعية (مطابق لـtxid في المعاملات العليا). |
| **abort_lsn** | Int64 (XLogRecPtr) | LSN الخاص بعملية الإلغاء. ويوجد فقط إذا كان البث المتوازي مفعّلًا (البروتوكول v4+). |
| **abort_timestamp** | Int64 (TimestampTz) | الطابع الزمني للإلغاء. ويوجد فقط إذا كان البث المتوازي مفعّلًا (البروتوكول v4+). |

# 12.6. إعادة تجميع المعاملات وإرسال الرسائل

#### نسخة تجريبية: العمل قيد الإنجاز.

يصف هذا القسم كيفية إعادة تجميع ReorderBuffer للتغييرات المتراكمة وإرسالها إلى عامل التطبيق على المشترك عبر إضافة خرج.

محتويات القسم

- 12.6.1. مخطط إعادة تجميع المعاملات
- 12.6.2. إرسال الرسائل
- 12.6.3. بث المعاملات الكبيرة

## 12.6.1. مخطط إعادة تجميع المعاملات

عندما يكتشف walsender سجل **COMMIT** في WAL، يبدأ ReorderBuffer عملية إعادة التجميع. فينظّم التغييرات الملتقطة بترتيب LSN ويمرّرها إلى إضافة الخرج. وبعد أن تعالج الإضافة المعاملة، يحرّر `ReorderBuffer` الذاكرة بحذف سجلات التغيير ومدخل `ReorderBufferTXN`.

وتدفق المعالجة القياسي كما يلي:

1. **استرجاع بيانات المعاملة**: يُسترجع ReorderBufferTXN الخاص بالمعاملة الملتزمة.
2. **دمج المعاملات الفرعية**: إذا وُجدت معاملات فرعية، تُدمج قوائم تغييراتها في المعاملة العليا وتُرتَّب وفق LSN.
3. **ضمان الاتساق**: تُرتَّب القائمة النهائية لسجلات التغيير وفق LSN لضمان الاتساق الزمني.
4. **فحص الأصل**: كما هو مفصّل في القسم 12.1.4، توجد معلومات الأصل داخل سجلات COMMIT أو ABORT. وإذا كانت موجودة، يضمّنها ReorderBuffer في رسالة النسخ المتماثل؛ وإلا حذفها.
5. **التمرير إلى الإضافة**: تُكرَّر التغييرات وتُمرَّر بالتسلسل إلى إضافة الخرج (مثل **pgoutput**).
6. **التنظيف**: يُحرَّر ReorderBufferTXN وجميع كائنات ReorderBufferChange الداخلية لتحرير الذاكرة.

ومع أنه يجب دمج المعاملات الفرعية عمليًا، يفترض هذا القسم معاملات بلا معاملات فرعية للتبسيط. وفي هذه الحالة، تكون سجلات `ReorderBufferChange` مرتّبة طبيعيًا داخل قائمتها، ما يتيح للإضافة معالجتها بمرور بسيط على القائمة بترتيب تصاعدي.

وإذا **أُلغيت** معاملة، يتجاهل ReorderBuffer فورًا ReorderBufferTXN المقابلة وجميع التغييرات المرتبطة بها دون تمريرها إلى الإضافة.

### 12.6.1.1. أمثلة

يمثّل الشكلان 12.24 و12.25، مع تسلسلات البايتات التالية، الرسائل التي تولّدها pgoutput خلال معاملات نموذجية تتضمن جداول وإجراءات متعددة.

![](/images/postgres-internals/pgsql12-fig-12-24.webp)

#### الشكل 12.24. بنية ReorderBufferTXN وتغييراتها بالنسبة إلى txid 840.

**تسلسل الرسائل المتولّد لـtxid 840:**

```json
[B] lsn=0/1CAA128  ts=2026-03-28T16:55:00  txid=840
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16456  N      [t&#34;2&#34;][t&#34;Bob&#34;][t&#34;2&#34;]
[R] oid=16464  &#34;public&#34;.&#34;tbl_b&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16464  N      [t&#34;11&#34;][t&#34;Luke&#34;][t&#34;110&#34;]
[D] oid=16464  K      [t&#34;10&#34;][u][u]
[C] flags=0  commit=0/1CAA128  end=0/1CAA200  ts=2026-03-28T16:55:10
```

![](/images/postgres-internals/pgsql12-fig-12-25.webp)

#### الشكل 12.25. بنية ReorderBufferTXN وتغييراتها بالنسبة إلى txid 841.

**تسلسل الرسائل المتولّد لـtxid 841:**

```json
[B] lsn=0/1CA9E00  ts=2026-03-28T16:55:05  txid=841
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16456  N      [t&#34;3&#34;][t&#34;Candy&#34;][t&#34;3&#34;]
[U] oid=16456  N      [t&#34;1&#34;][t&#34;Alice&#34;][t&#34;2&#34;]
[U] oid=16456  N      [t&#34;1&#34;][t&#34;Alice&#34;][t&#34;3&#34;]
[C] flags=0  commit=0/1CA9E00  end=0/1CA9F00  ts=2026-03-28T16:55:15
```

**ملاحظة حول رسائل العلاقة (‘R’):** لا تُرسل رسالة العلاقة إلا إذا لم تُرسل البيانات الوصفية للجدول المحدد خلال جلسة walsender الحالية، أو إذا تغيّر تعريف الجدول. ويقلّل ذلك نقل البيانات الوصفية الزائد.

## 12.6.2. إرسال الرسائل

وبمجرد تسلسل هذه الرسائل بواسطة إضافة الخرج، تُغلَّف في بروتوكول النسخ المتماثل المنطقي وتُرسل عبر الشبكة. انظر الشكل 12.26.

![](/images/postgres-internals/pgsql12-fig-12-26.webp)

#### الشكل 12.26. تسلسل الرسائل للمعاملات القياسية (غير المبثوثة).

في معاملة قياسية (غير مبثوثة)، يستقبل عامل التطبيق على المشترك التسلسل كاملًا، من `Begin` إلى `Commit`، كتدفق متصل واحد فقط بعد أن يلتزم الناشر بالمعاملة.

** عرض رسائل النسخ المتماثل الخام

تستخدم رسائل النسخ المتماثل المنطقي تنسيقًا ثنائيًا ولا يمكن عرضها مباشرةً كنص عادي. ومع ذلك، يمكن فحص التدفق الثنائي الخام بتوجيه خرج أداة [pg_recvlogical](https://www.postgresql.org/docs/current/app-pgrecvlogical.html) إلى الأمر `od` (التفريغ الثماني).

```bash
$ # Create a slot using the pgoutput plugin
$ pg_recvlogical -d testdb --slot myslot --create-slot  -P pgoutput

$ # Start the slot and pipe the binary stream to od for inspection
$ pg_recvlogical -d testdb --slot=myslot --start -f -  -o proto_version=1  -o publication_names='my_publication' |  od -c  -A n
   B  \0  \0  \0  \0 001 276 203 270  \0 002 364 005 301   < 232
 350  \0  \0 003  \b  \n   R  \0  \0   @ 033   p   u   b   l   i
   c  \0   t   b   l   _   1  \0   d  \0 003 001   i   d  \0  \0
  \0  \0 027 377 377 377 377  \0   n   a   m   e  \0  \0  \0  \0
 031 377 377 377 377  \0   d   a   t   a  \0  \0  \0  \0 027 377
 377 377 377  \n   I  \0  \0   @ 033   N  \0 003   t  \0  \0  \0
 001   1   t  \0  \0  \0 005   A   l   i   c   e   t  \0  \0  \0
 001   1  \n   I  \0  \0   @ 033   N  \0 003   t  \0  \0  \0 001
   2   t  \0  \0  \0 003   B   o   b   t  \0  \0  \0 001   2  \n
   U  \0  \0   @ 033   N  \0 003   t  \0  \0  \0 001   1   t  \0
  \0  \0 005   A   l   i   c   e   t  \0  \0  \0 002   1   0  \n
   C  \0  \0  \0  \0  \0 001 276 203 270  \0  \0  \0  \0 001 276
... snip ...
```

ولأغراض التنقيح أو البحث، تُعدّ إضافة [test_decoding](https://www.postgresql.org/docs/current/test-decoding.html) بديلًا مناسبًا، إذ تفكّ ترميز WAL إلى تنسيق مقروء للبشر.

```bash
$ # Create a slot using the test_decoding plugin
$ pg_recvlogical -d testdb --slot myslot --create-slot  -P test_decoding

$ # View the decoded output
$ pg_recvlogical -d testdb --slot=myslot --start -f -

BEGIN 840
table public.tbl_a: INSERT: id[integer]:2 name[text]:'Bob' data[integer]:2
table public.tbl_b: INSERT: id[integer]:11 name[text]:'Luke' data[integer]:110
table public.tbl_b: DELETE: id[integer]:10
COMMIT 840
BEGIN 841
table public.tbl_a: INSERT: id[integer]:3 name[text]:'Candy' data[integer]:3
table public.tbl_a: UPDATE: id[integer]:1 name[text]:'Alice' data[integer]:2
table public.tbl_a: UPDATE: id[integer]:1 name[text]:'Alice' data[integer]:3
COMMIT 841
```

## 12.6.3. بث المعاملات الكبيرة

عندما تُضبط *streaming* على *‘on’* أو *‘parallel’* ويبلغ ReorderBuffer حدّ ذاكرته، لا يكتب PostgreSQL التغييرات في ملفات انسكاب محلية. وبدلًا من ذلك، يرسل الناشر هذه التغييرات فورًا إلى المشترك &mdash; تحديدًا إلى عامل التطبيق أو عامل التطبيق القائد.

ويوضّح المثال التالي كيفية تقسيم معاملة كبيرة إلى مقاطع. انظر الشكل 12.27.

![](/images/postgres-internals/pgsql12-fig-12-27.webp)

#### الشكل 12.27. تسلسل الرسائل للمعاملات المبثوثة.

إذا كانت txid 842 تستهلك أكبر قدر من الذاكرة عند فيضان المخزن المؤقت، يعيد الناشر ترتيب تغييراتها ويغلّفها بين علامتي **بدء البث (‘S’)** و**إيقاف البث (‘E’)** لتشكيل مقطع.

والجدير بالذكر أن رسالة **بدء البث** تحلّ محل رسالة **البدء (‘B’)** في المقطع الأول من معاملة مبثوثة.

### 12.6.3.1. المقطع الأول (txid=842)

```json
[S] txid=842  first_segment=1
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols  [id:int4(key)][name:text][data:int4]
[I] txid=842  oid=16456  N  [t&#34;1&#34;][t&#34;Data1&#34;][t&#34;100&#34;]
[I] txid=842  oid=16456  N  [t&#34;2&#34;][t&#34;Data2&#34;][t&#34;200&#34;]
... (thousands of INSERTs) ...
[I] txid=842  oid=16456  N  [t&#34;50000&#34;][t&#34;Data50000&#34;][t&#34;5000000&#34;]
[E]
```

وتؤدي الفيضانات اللاحقة إلى مقاطع إضافية. وبما أن هذه ليست الإرسال الأول لهذه المعاملة، تُضبط علامة *first_segment* في أمر **بدء البث** على 0.

### 12.6.3.2. المقطع الثاني (txid=842)

```json
[S] txid=842  first_segment=0
[I] txid=842  oid=16456  N  [t&#34;50001&#34;][t&#34;Data50001&#34;][t&#34;5000100&#34;]
... (further INSERTs) ...
[I] txid=842  oid=16456  N  [t&#34;100000&#34;][t&#34;Data100000&#34;][t&#34;10000000&#34;]
[E]
```

وعندما تلتزم txid 842 في النهاية على الناشر، يرسل الناشر رسالة **التزام البث (‘c’)**.

### 12.6.3.3. التزام البث

```json
[c] txid=842  flags=0  commit=0/1CB0000  end=0/1CB0100  ts=2026-03-28T17:10:00
```

وإذا أُلغيت المعاملة بدلًا من ذلك، يرسل الناشر رسالة **إلغاء البث (‘A’)** لإبلاغ المشترك بتجاهل المقاطع المستلمة سابقًا.

# 12.7. عامل التطبيق وإعادة تنفيذ المعاملات

#### نسخة تجريبية: العمل قيد الإنجاز.

عامل التطبيق هو المكوّن الجوهري المسؤول عن إعادة تنفيذ التغييرات المنطقية المستلمة من الناشر على الجداول المحلية للمشترك.

يستعرض هذا القسم أولًا التشغيل الأساسي لعامل التطبيق، ثم يحلّل الأوضاع المتقدمة التي تتضمن المعالجة التزايدية للمعاملات الكبيرة والاستخدام المنسّق لعمال التطبيق المتوازيين.

محتويات القسم

- 12.7.1. نظرة عامة على العملية (streaming = off)
- 12.7.2. وضع البث (streaming = on)
- 12.7.3. وضع عامل التطبيق المتوازي (streaming = parallel)

## 12.7.1. نظرة عامة على العملية (streaming = off)

ينفّذ عامل التطبيق على عقدة المشترك المهام الأساسية التالية:

- **ترشيح الأصل**: يفحص البيانات الوصفية للأصل في الرسالة الواردة لتحديد ما إذا كان ينبغي إعادة تنفيذ المعاملة أو تخطّيها لمنع الحلقات.
- **فحص تخطّي LSN (اللاتكرارية)**: يقارن LSN الخاص بالمعاملة الواردة بـ*remote_lsn* المحفوظ في العرض [pg_replication_origin_status](https://www.postgresql.org/docs/current/view-pg-replication-origin-status.html). وإذا كانت المعاملة قد طُبّقت بالفعل، يتخطّاها العامل لضمان اتساق البيانات.
- **التوزيع**: يوجّه الرسائل إلى معالجاتها المعنية وفقًا لنوع الرسالة، مثل INSERT أو UPDATE أو DELETE.
- **اكتشاف التعارضات**: يحدّد التعارضات التشغيلية، مثل محاولة تحديث صف غير موجود. وافتراضيًا، يبلّغ العامل عن هذه التعارضات ويوقف النسخ المتماثل لمنع التباعد.

### 12.7.1.1. ترشيح الأصل وتتبّع LSN

كما نوقش في القسم 12.1.4، يعتمد قرار تطبيق المعاملة على المعلمة *origin* ووجود *origin_id*.

وفي التنفيذ الحالي، إذا كانت *origin* = *’none’* مضبوطة وكان *origin_id* أكبر من صفر، يُجهض عامل التطبيق إعادة التنفيذ؛ وإلا يواصل العامل.

### 12.7.1.2. توزيع الرسائل وتدفق إعادة التنفيذ

عند استقبال تدفق من رسائل فكّ الترميز المنطقي، يعالجها عامل التطبيق بالتسلسل وفقًا لنوعها. تأمّل سيناريو يُدرَج فيه صف واحد في tbl_a على الناشر:

**عينة تدفق الرسائل:**

```json
[B] lsn=0/1CA96C0  ts=2026-03-29T16:55:05  txid=845
[R] oid=16456  &#34;public&#34;.&#34;tbl_a&#34;  'd'  3cols      [id:int4(key)][name:text][data:int4]
[I] oid=16456  N      [t&#34;3&#34;][t&#34;Candy&#34;][t&#34;3&#34;]
[C] flags=0  commit=0/1CA9E00  end=0/1CA9F00  ts=2026-03-29T16:55:15
```

وتدفق معالجة معاملة INSERT هذه كما يلي:

1. **رسالة البدء [B]**: يبدأ عامل التطبيق معاملة محلية ويلتقط LSN الالتزام على الناشر والطابع الزمني. ويضبط العامل [session_replication_role](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-SESSION-REPLICATION-ROLE) على *replica*، ضامنًا أن المُطلِقات والقيود المحلية تتبع أدوار النسخ المتماثل المحددة لها.
2. **رسالة العلاقة [R]**: يستقبل عامل التطبيق تعريف الجدول. ويحدّث العامل RelationSyncCache، رابطًا معرّف OID على جانب الناشر (مثل 16456) بمعرّف OID للجدول المحلي استنادًا إلى المخطط واسم الجدول.
3. **رسالة الإدراج [I]**: يحوّل العامل بيانات الصف الثنائية إلى تنسيق الجدول المحلي. وينفّذ عامل التطبيق إدراجًا داخليًا (عبر [ExecSimpleRelationInsert](https://github.com/postgres/postgres/blob/6ca631b9901264b97c5b165e66edd3a85847ee0b/src/backend/executor/execReplication.c#L810))، ما يحدّث أيضًا أي فهارس مرتبطة. وتولّد هذه العملية سجلات WAL الخاصة بها على المشترك.
4. **رسالة الالتزام [C]**: تلتزم المعاملة المحلية. ويُلحق عامل التطبيق *origin_id* المقابل للناشر بسجل WAL الخاص بالالتزام. ثم يحدّث العامل [pg_replication_origin](https://www.postgresql.org/docs/current/catalog-pg-replication-origin.html) لتخزين أحدث LSN مُطبَّق ويرسل إشعارًا (ACK) إلى walsender، مؤكّدًا أن البيانات قد دُفعت إلى القرص.

ومع أن INSERT هو المثال الأساسي هنا، فإن عمليات DML الأخرى مثل UPDATE وDELETE تتبع منطق توزيع مشابهًا.

ويحتوي سجل WAL الخاص بالالتزام على بيانات وصفية ملحقة من الناشر المصدر: تحديدًا *origin_id*، و*final_lsn* بوصفه *origin_lsn*، و*commit_timestamp* بوصفه *origin_timestamp*.

وكما ذُكر في القسم 12.4.3، تتضمن عمليات UPDATE وDELETE خطوة إضافية: يجب على عامل التطبيق تنفيذ عمليات بحث مباشرة عن الصفوف &mdash; باستخدام مسوح الفهارس أو المسوح التسلسلية عبر دوال مثل [RelationFindReplTupleByIndex](https://github.com/postgres/postgres/blob/3b28dad70e2fa57a973697d51242c284d475c7df/src/backend/executor/execReplication.c%23L182) &mdash; لتحديد البيانات الهدف بشكل فريد وتعديلها قبل تطبيق التغيير.

### 12.7.1.3. تحسين REPLICA IDENTITY FULL

في الإصدار 15 أو أقدم، كانت الجداول المضبوطة على *REPLICA IDENTITY FULL* تتطلب مسحًا تسلسليًا لتحديد الصف الهدف لعمليات UPDATE أو DELETE، ما أدى إلى كلفة أداء كبيرة في الجداول الكبيرة.

وابتداءً من الإصدار 16، يمكن لعامل التطبيق الاستفادة من الفهارس الموجودة لتحديد الصفوف حتى في ظل *REPLICA IDENTITY FULL*. وتحدّد الدالة [FindLogicalRepLocalIndex()](https://github.com/postgres/postgres/blob/32770ea03247bc42b38ccc53b84711e0c13d1498/src/backend/replication/logical/relation.c#L868) فهارس B-tree غير جزئية مناسبة يمكنها تحديد الصف بشكل فريد، ما يقلّل كثيرًا من الاعتماد على المسوح التسلسلية المكلفة.

## 12.7.2. وضع البث (streaming = on)

عندما تُضبط المعلمة *streaming* على *on*، يستقبل عامل التطبيق معاملات جارية من الناشر على شكل مقاطع متعددة قبل الالتزام النهائي.

تأمّل سيناريو يتضمن معاملتين متزامنتين: txid 842، وهي معاملة كبيرة تُرسل عبر مقطعي بث، وtxid 843، وهي معاملة أصغر تُرسل ككتلة رسائل قياسية. انظر الشكل 12.28.

![](/images/postgres-internals/pgsql12-fig-12-28.webp)

#### الشكل 12.28. عملية إعادة تنفيذ التغييرات المنطقية عند تفعيل streaming.

وتسلسل المعالجة الموضّح في الشكل 12.28 كما يلي:

- (1) **المقطع الأول من txid 842**: يستقبل عامل التطبيق مقطع البث الأولي ويراكم التغييرات في الذاكرة باستخدام بنية `StringInfoData` (داخليًا، مخزن *original_msg*).
- (2) **رسالة txid 843**: تصل كتلة قياسية غير مبثوثة لـtxid 843. ويفكّ عامل التطبيق ترميز هذه التغييرات فورًا ويطبّقها على الجدول المحلي.
- (3) **المقطع الثاني من txid 842**: يصل مقطع البث التالي لـtxid 842 ويُضاف إلى المخزن الموجود في الذاكرة.
- (4) **التزام txid 842**: عند استقبال رسالة **التزام البث**، يفكّ عامل التطبيق ترميز جميع التغييرات المتراكمة لـtxid 842 ويعيد تنفيذها بالتسلسل.

وخلاصة القول، يعالج عامل التطبيق الرسائل القياسية فورًا بينما يخزّن مقاطع البث في مخزن مؤقت حتى تُطلق رسالة الالتزام إعادة تنفيذ المعاملة بأكملها.

### 12.7.2.1. ضغط الذاكرة والانسكاب إلى القرص

تحكم المعلمة [logical_decoding_work_mem](https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-LOGICAL-DECODING-WORK-MEM) الذاكرة المخصّصة لتخزين التغييرات المبثوثة مؤقتًا. وإذا تجاوز حجم التغييرات المتراكمة هذا الحد، يسكب عامل التطبيق البيانات إلى ملفات مؤقتة.

وتوجد هذه الملفات المؤقتة في الدليل `$PGDATA/base/pgsql_tmp/`. واصطلاحات التسمية منظّمة كما يلي:

- **تنسيق الدليل**: `$PGDATA/base/pgsql_tmp/pgsql_tmp[PID].[FilesetSerial].fileset/`

- **تنسيق الملف**: `[SubID]-[txid].changes`

إذا عالج اشتراك بمعرّف OID *16403* معاملة مبثوثة بمعرّف txid 767 باستخدام عامل تطبيق بمعرّف PID *2212*، فسيكون مسار الملف كما يلي:

```
base/pgsql_tmp/pgsql_tmp2212.0.fileset/16403-767.changes
```

وبمجرد أن تلتزم المعاملة أو تُلغى، يحذف PostgreSQL هذه الملفات المؤقتة تلقائيًا.

## 12.7.3. وضع عامل التطبيق المتوازي (streaming = parallel)

أُدخل **التطبيق المتوازي** في الإصدار 16، ويعزّز أداء النسخ المتماثل المنطقي بالسماح بإعادة تنفيذ معاملات متعددة بالتوازي على المشترك. وخلافًا لوضع `streaming = 'on'` القياسي الذي يخزّن التغييرات المبثوثة مؤقتًا حتى وصول الالتزام، يتيح التطبيق المتوازي للعمال المعيّنين البدء بإعادة تنفيذ التغييرات فور استلامها.

** ملاحظة

لا ينطبق التطبيق المتوازي إلا على المعاملات *المبثوثة* &mdash; أي تلك المرسلة كسلسلة مقاطع لا كرسالة واحدة. ولذلك، تظل المعاملات غير المبثوثة تُستقبل وتُطبَّق مباشرةً بواسطة عامل التطبيق القائد نفسه، تمامًا كما في وضع `streaming = 'off'`؛ ولا يشارك أي عامل تطبيق متوازٍ في تلك الحالة.

وفيما يلي ملخّص لبنية هذا الوضع وقيوده:

- **عامل التطبيق القائد**: يحافظ على الاتصال بـwalsender ويوزّع عمال التطبيق المتوازيين على التغييرات الواردة.
- **عمال التطبيق المتوازيون**: يطلقهم عامل التطبيق القائد لتطبيق التغييرات بالتوازي.
- **حدّ العمال**: يُحكم عدد عمال التطبيق المتوازيين المتزامنين بالمعلمة [max_parallel_apply_workers_per_subscription](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-PARALLEL-APPLY-WORKERS-PER-SUBSCRIPTION).
- **آلية الرجوع الاحتياطي**: إذا تجاوز عدد المعاملات المبثوثة النشطة الحدّ المضبوط، يتولّى عامل التطبيق القائد المعاملات الكبيرة الإضافية بالرجوع إلى سلوك *streaming = ‘on’* (التخزين في الذاكرة أو على القرص).

وتوضّح الأقسام التالية نظرة عامة على معالجة عمال التطبيق المتوازيين باستخدام عدة سيناريوهات.

### 12.7.3.1. تسلسل إعادة التنفيذ في الوضع المتوازي

تأمّل أبسط سيناريو: معاملتان، txid 845 وtxid 846، وكلتاهما معاملة كبيرة تُدرج صفوفًا كثيرة في الجدولين tbl_a وtbl_b على الترتيب. انظر الشكل 12.29.

![](/images/postgres-internals/pgsql12-fig-12-29.webp)

#### الشكل 12.29. تسلسل إعادة تنفيذ المعاملات في وضع التطبيق المتوازي.

وكما هو موضّح في الشكل 12.29، يجري تدفق المعالجة كما يلي:

- (1) **وصول مقطع txid 845**: يحدّد عامل التطبيق القائد أن هذه معاملة مبثوثة ويطلق (أو يعيّن) عامل تطبيق متوازيًا.
- (2) **إعادة تنفيذ فورية**: يوزّع عامل التطبيق القائد المقطع على عامل التطبيق المتوازي، الذي يبدأ فورًا بإعادة تنفيذ التغييرات على الجدول المحلي.
- (3) **وصول مقطع txid 846**: يطلق عامل التطبيق القائد (أو يعيّن) عامل تطبيق متوازيًا.
- (4) **إعادة تنفيذ فورية**: يوزّع عامل التطبيق القائد المقطع على عامل تطبيق متوازٍ آخر، يعيد فورًا تنفيذ التغييرات على الجدول المحلي.
- (5) **وصول التزام البث لـtxid 845**: يستقبل عامل التطبيق القائد رسالة التزام البث الخاصة بـtxid 845 ويحيلها إلى عامل التطبيق المتوازي المعيّن.
- (6) **إنهاء txid 845**: يلتزم عامل التطبيق المتوازي بالمعاملة المحلية ويعود إلى حالة الاستعداد.
- (7) **انتظار القائد**: بينما يُنهى التزام txid 845، يتوقف عامل التطبيق القائد ولا يقرأ تغييرات إضافية &mdash; بما فيها رسالة التزام البث الخاصة بـtxid 846 &mdash; من الناشر. وبعد اكتمال التزام txid 845 فقط، يستأنف عامل التطبيق القائد القراءة، ويستقبل رسالة التزام البث الخاصة بـtxid 846 ويحيلها إلى عامل التطبيق المتوازي الذي يعالج txid 846. ويُشرح سبب هذا الانتظار في [القسم 12.7.3.2](#12-7-3-2) (انظر أيضًا [pa_wait_for_xact_finish()](https://github.com/postgres/postgres/blob/master/src/backend/replication/logical/applyparallelworker.c)).
- (8) **إنهاء txid 846**: يلتزم عامل التطبيق المتوازي بالمعاملة المحلية ويعود إلى حالة الاستعداد.

ويدير عامل التطبيق القائد توزيع المهام ديناميكيًا استنادًا إلى موارد النظام المتاحة:

- إذا كان عامل تطبيق متوازٍ معيّنًا بالفعل للمعاملة، يحيل عامل التطبيق القائد المقطع إلى ذلك العامل لإعادة التنفيذ فورًا.
- إذا لم يكن أي عامل معيّنًا وكان عدد عمال التطبيق المتوازيين النشطين دون حدّ [max_parallel_apply_workers_per_subscription](https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-MAX-PARALLEL-APPLY-WORKERS-PER-SUBSCRIPTION)، يطلق عامل التطبيق القائد عاملًا جديدًا ويفوّض المعاملة إليه.
- **آلية الرجوع الاحتياطي**: إذا بلغ حدّ عمال التطبيق المتوازيين، يعود عامل التطبيق القائد إلى سلوك *streaming = ‘on’*، فيراكم المقاطع الواردة في الذاكرة أو على القرص حتى تصل رسالة الالتزام.

### 12.7.3.2. تجنّب الأعطال الناتجة عن تبعيات المعاملات

يشرح هذا القسم الفرعي سبب توقف عامل التطبيق القائد عن قراءة التغييرات الإضافية وتطبيقها أثناء إنهاء التزام معاملة جارية.

في الوضع غير المتوازي، تُسلسَل التغييرات من معاملات متعددة على الناشر بواسطة MVCC، ويعيد عامل التطبيق على المشترك تنفيذها بالترتيب نفسه بالضبط، ما يمنع مشكلات الصحة.

أما في الوضع المتوازي، فتطبّق عمال تطبيق متوازون منفصلون التغييرات في الوقت نفسه. ونتيجة لذلك، لم يعد ترتيب المعاملات المسلسَل على الناشر محفوظًا تلقائيًا على المشترك.

ولحل ذلك، يتوقف عامل التطبيق القائد عن قراءة التغييرات الجديدة أثناء إنهاء التزام. ويوضّح المثال التالي هذا السلوك.

تأمّل الجدول tbl_a، الذي يكون فارغًا في البداية. وتنفّذ معاملتان، txid 851 وtxid 852، عملية INSERT وعملية UPDATE على tbl_a على الترتيب. انظر الشكل 12.30.

![](/images/postgres-internals/pgsql12-fig-12-30.webp)

#### الشكل 12.30. توقف عامل التطبيق القائد للحفاظ على ترتيب المعاملات.

على الناشر، تُدرج txid 851 صفوفًا وتلتزم؛ وعندها فقط تحدّث txid 852 تلك الصفوف في tbl_a.

- (1) **وصول مقطع txid 851**: يستقبل عامل التطبيق القائد مقطع txid 851 ويحيله إلى عامل التطبيق المتوازي 1.
- (2) **إعادة تنفيذ فورية**: يبدأ عامل التطبيق المتوازي 1 فورًا بإعادة تنفيذ تغييرات INSERT على الجدول المحلي.
- (3) **وصول التزام txid 851، وتوقف القائد**: يستقبل عامل التطبيق القائد رسالة التزام البث الخاصة بـtxid 851، ويحيلها إلى عامل التطبيق المتوازي 1، ويتوقف عن قراءة مزيد من الرسائل من الناشر حتى يكتمل هذا الالتزام.
- (4) **وصول مقطع txid 852 دون قراءته**: بينما يكون عامل التطبيق القائد متوقفًا، يرسل الناشر مقطع txid 852. ولا يسترجع عامل التطبيق القائد هذه الرسالة بعد. وكما هو موضّح في الشكل 12.30، لو أحالها عامل التطبيق القائد فورًا وطبّقها عامل التطبيق المتوازي 2، فلن يجد أمر UPDATE أي صفوف مطابقة على المشترك لأن إدراج txid 851 لم يلتزم بعد ولم يظهر.
- (5) **وصول التزام txid 852 أيضًا دون قراءته**: تصل رسالة التزام البث الخاصة بـtxid 852 كذلك إلى المشترك، لكنها تبقى غير مقروءة للسبب نفسه.
- (6) **استئناف القائد وإحالة txid 852**: بمجرد أن يُنهي عامل التطبيق المتوازي 1 التزام txid 851 محليًا، يستأنف عامل التطبيق القائد القراءة. فيسترجع المقطع ورسالة التزام البث معًا لـtxid 852، ويحيلهما إلى عامل التطبيق المتوازي 2.
- (7) **إعادة تنفيذ فورية وإنهاء**: يعيد عامل التطبيق المتوازي 2 تنفيذ تغييرات UPDATE ويلتزم، وخلال ذلك يتوقف عامل التطبيق القائد مرة أخرى كما في الخطوة (3).

وبتوقّف استقبال الرسائل من لحظة استلام رسالة الالتزام حتى إنهاء الالتزام المحلي، يمنع عامل التطبيق القائد التنفيذ خارج الترتيب ويحافظ على تسلسل المعاملات المنشأ على الناشر.

# 12.8. الآلية الداخلية لإعادة التشغيل واستعادة الانهيار

#### نسخة تجريبية: العمل قيد الإنجاز.

يقدّم هذا القسم نظرة عامة على إدارة بيانات التسجيل المسبق للكتابة (WAL) في النسخ المتماثل المنطقي. وبناءً على هذه الأساسيات، يفصّل بعد ذلك تسلسلات إعادة تشغيل المشترك واستعادة الانهيار.

محتويات القسم

- 12.8.1. إدارة بيانات WAL
- 12.8.2. تسلسل إعادة التشغيل
- 12.8.3. تسلسل الاستعادة

## 12.8.1. إدارة بيانات WAL

تُدار تقدّم النسخ المتماثل استنادًا إلى رقم تسلسل السجل (LSN) لبيانات WAL.

وخلافًا للنسخ المتماثل المتدفّق، حيث يتشارك الخادم الأساسي والخادم الاحتياطي مساحة WAL نفسها بالضبط، يتطلب النسخ المتماثل المنطقي **ربطًا** بين مساحتي WAL لدى الناشر والمشترك. وذلك لأن كل عقدة تستخدم LSN خاصًا بها مستقلًا.

وفي تنفيذ PostgreSQL، يتحمّل المشترك مسؤولية هذا الربط. فبينما يستخدم الناشر دائمًا معرّفات LSN الخاصة به، يحتفظ المشترك بسجل للتقابل بين معرّفات LSN المحلية لديه ومعرّفات LSN البعيدة المستلمة من الناشر.

### 12.8.1.1. آليات إدارة LSN لدى الناشر والمشترك

#### الناشر

يدير الناشر *confirmed_flush_lsn* داخل فتحة النسخ الخاصة به:

- **confirmed_flush_lsn**: هو LSN الذي أكّد مستهلك الفتحة المنطقية استلام البيانات حتى عنده. ولم تعد المعاملات الملتزمة قبل هذا LSN متاحة للنسخ المتماثل.
- **التخزين**: تُحفظ معلومات فتحة النسخ في الذاكرة وتُثبَّت عادةً في وسيط التخزين عند كل نقطة تفتيش.

#### المشترك

وكما ذُكر في القسم 12.7.1.2، تتضمن سجلات WAL المتولّدة عن عبارات COMMIT (وABORT) على المشترك بيانات وصفية من الناشر: *origin_id*، وLSN الالتزام على الناشر (*final_lsn*)، و*commit_timestamp*.

علاوة على ذلك، يحتفظ المشترك بأحدث ربط لـLSN الالتزام في الذاكرة:

- **local_lsn**: LSN الخاص بالتزام المشترك نفسه.
- **remote_lsn**: *final_lsn* الخاص بالناشر المقابل لذلك الالتزام.
- **الظهور**: تكون هذه القيم مرئية عبر عرض النظام [pg_replication_origin_status](https://www.postgresql.org/docs/current/view-pg-replication-origin-status.html).

ولأن pg_replication_origin_status عرض نظام، تُخزَّن حالته في الملف `$PGDATA/pg_logical/replorigin_checkpoint` عند كل نقطة تفتيش.

**ملاحظة حول السلامة عند الانهيار**: إذا انهار المشترك على نحو غير متوقع، فقد يُفقد أحدث ربط في ملف `replorigin_checkpoint`. ومع ذلك، يعيد النظام تلقائيًا بناء أحدث ربط خلال عملية الاستعادة اللاحقة. وتُوصف التفاصيل في القسم 12.8.3.

### 12.8.1.2. تدفق بيانات LSN في التسلسل الطبيعي

يوضّح المثال التالي كيفية إدارة معرّفات LSN عندما ينفّذ الناشر أمر INSERT (انظر الشكل 12.31).

![While this figure illustrates the origin_id and origin_lsn within the COMMIT WAL record written by the subscriber, the precise structure is as follows: In the COMMIT (or ABORT) WAL record, the origin_id is included in the header portion, whereas the origin_commit_lsn (or origin_abort_lsn) and origin_commit_timestamp (or origin_abort_timestamp) are appended to the extended section.](/images/postgres-internals/pgsql12-fig-12-31.webp)

#### الشكل 12.31. تدفق ربط LSN خلال معاملة عادية.

مع أن هذا الشكل يوضّح origin_id وorigin_lsn داخل سجل WAL الخاص بالالتزام المكتوب بواسطة المشترك، فإن البنية الدقيقة كما يلي: في سجل WAL الخاص بالالتزام (أو الإلغاء)، يُضمَّن origin_id في جزء الترويسة، بينما يُلحق origin_commit_lsn (أو origin_abort_lsn) وorigin_commit_timestamp (أو origin_abort_timestamp) بالقسم الموسَّع.

#### الشكل 12.31 [1]

يعكس *confirmed_flush_lsn* لفتحة النسخ القيمة $\text{LSN}^{P}\_{0}$، مؤكّدًا أن المشترك قد طبّق ودفع تغييرات المعاملة السابقة بنجاح.

ثم ينفّذ الناشر عملية INSERT (txid=100)، حيث يبدأ سجل WAL الخاص بالالتزام عند $\text{LSN}^{P}\_{1}$ وينتهي عند $\text{LSN}^{P}_{2}$.

وتولّد إضافة pgoutput رسائل تحتوي على معرّفات LSN هذه:

- **B (البدء)**: *final_lsn* = $\text{LSN}^{P}\_{1}$
- **C (الالتزام)**: *commit_lsn* = $\text{LSN}^{P}\_{1}$، *end_lsn* = $\text{LSN}^{P}\_{2}$

#### الشكل 12.31 [2]

تحتوي ذاكرة المشترك في البداية على *local_lsn* = $\text{LSN}^{S}\_{0}$ و*remote_lsn* = $\text{LSN}^{P}\_{0}$، بما يتسق مع ملف “replorigin_checkpoint”.

وبمجرد أن يطبّق عامل التطبيق التغييرات، يكتب سجل التزام في WAL الخاص بالمشترك عند $\text{LSN}^{S}\_{1}$. ويتضمن هذا السجل *origin_id* و*final_lsn* الخاص بالناشر ($\text{LSN}^{P}\_{1}$). ثم تُحدَّث حالة الذاكرة إلى *local_lsn* = $\text{LSN}^{S}\_{1}$ و*remote_lsn* = $\text{LSN}^{P}\_{1}$.

لاحظ أن ملف *replorigin_checkpoint* يبقى دون تغيير حتى نقطة التفتيش التالية.

#### الشكل 12.31 [3]

عند اكتمال المعاملة، يرسل المشترك إشعار ACK يحتوي على *write_lsn* و*flush_lsn* و*apply_lsn*.

وفي هذا السيناريو، تُضبط جميع القيم على $\text{LSN}^{P}\_{1}$. ولاحظ أن المشترك يعيد معرّفات LSN نسبةً إلى مساحة WAL الخاصة بـ**الناشر**.

ثم يحدّث الناشر *confirmed_flush_lsn* لفتحة نسخه إلى $\text{LSN}^{P}\_{1}$ استنادًا إلى هذا الإشعار.

## 12.8.2. تسلسل إعادة التشغيل

بمجرد إعداد النسخ المتماثل المنطقي، يبدأ الناشر والمشترك عملية النسخ المتماثل. وإذا توقفت العملية &mdash; مثلًا بسبب إعادة تشغيل أي من الطرفين &mdash; فإنها تستأنف تلقائيًا. انظر الشكل 12.32.

![](/images/postgres-internals/pgsql12-fig-12-32.webp)

#### الشكل 12.32. تسلسل إعادة تشغيل النسخ المتماثل المنطقي.

- (1) **قراءة نقطة التفتيش**: يقرأ المشترك ملف “replorigin_checkpoint” لتهيئة *local_lsn* و*remote_lsn*.
- (2) **إطلاق العامل**: يبدأ مُشغّل النسخ المتماثل المنطقي عامل تطبيق.
- (3) **طلب الاتصال**: يطلب عامل التطبيق اتصالًا من الناشر.
- (4) **إنشاء walsender**: يُنشئ مدير عمليات postmaster على الناشر عملية walsender.
- (5) **إقامة الاتصال**: يتصل عامل التطبيق بـwalsender.
- (6) **التفاوض على LSN**: يتفاوض عامل التطبيق وwalsender على نقطة البداية باستخدام *remote_lsn*. فيرسل المشترك *remote_lsn*، ويبدأ walsender فكّ ترميز WAL من ذلك الموضع على جانب الناشر.
- (7) **استئناف النسخ المتماثل**: تستأنف العملية من LSN المحدد.

## 12.8.3. تسلسل الاستعادة

يصف تسلسل الاستعادة العملية التي تلي انهيار المشترك.

وخلافًا لإعادة التشغيل القياسية، قد يكون *local_lsn* و*remote_lsn* المخزّنان في ملف “replorigin_checkpoint” قديمين، لأنهما يعكسان حالة نقطة التفتيش الأخيرة فقط. لذلك يجب على المشترك مسح بيانات WAL الخاصة به لإعادة بناء أحدث ربط قبل الاتصال بالناشر. انظر الشكل 12.33.

![](/images/postgres-internals/pgsql12-fig-12-33.webp)

#### الشكل 12.33. تسلسل استعادة النسخ المتماثل المنطقي.

#### [1] مسح قطع WAL

أثناء استعادة الانهيار القياسية (راجع القسم 9.8)، يمسح النظام قطع WAL ويستخرج *origin_id* و*origin_lsn* من سجلات الالتزام الصادرة عن الناشر.

#### [2] استعادة حالة الأصل

بعد اكتمال الاستعادة، يستعيد النظام أحدث *origin_lsn* (نقطة الالتزام على الناشر) وLSN الالتزام المقابل له على المشترك إلى الذاكرة كـ*remote_lsn* و*local_lsn* على الترتيب. ويُستعاد ملف “replorigin_checkpoint” أيضًا.

ومن هذه النقطة، يواصل النظام تسلسل إعادة التشغيل القياسي لإعادة الاتصال بالناشر.
