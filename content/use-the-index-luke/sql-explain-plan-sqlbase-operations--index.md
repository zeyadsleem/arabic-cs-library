---
title: "عمليات خطة التنفيذ في SQLBase"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/sqlbase/operations
---

مرجع قصير لأشهر عمليات خطة التنفيذ في SQLBase. وهو مأخوذ أساساً من [وثائق API](https://otdskcprd.opentext.com/otdsws/login?client_id=KC&response_mode=form_post&response_type=id_token&scope=openid%20otds%3Aroles&state=OpenIdConnect.AuthenticationProperties%3DMF3vIitnPYSRw-8z5vaNCv50Lgbjwuu8I1WnVCmV68QPybRq26aS1Zfi3J5rGawYb9fgorY8pa8ENqfafsab4vZS6ueLr0rBY_1X5GZCS7__cUvyPhe5pqLozAKRerA6chkwFNHNtweSJ-PO8-IjoAPyXvWu02z5520FCqjC1NxKTj37b5q0cGgEX9QnQZ1B&nonce=638289879473055210.NTFhZWVlYmEtZmQwNi00MzZjLWEwOTgtODM0YzM1YWVhZWY0MTlkYmY4MGItMjUzNi00MDk0LWE3M2ItOTgxZDYyZDNlZWMw&redirect_uri=https%3A%2F%2Fknowledge.opentext.com%2Fotdsagent&x-client-SKU=ID_NET461&x-client-ver=5.3.0.0#10065)، التي تبدو ناقصة إلى حد كبير. وللدليل المتقدم فصل ثانٍ عن [العمليات الفيزيائية](http://support.guptatechnologies.com/Docs/SQLBaseDoc116/chpt16.html#481) أيضاً، لكنه لا يشرح كيفية تمييزها في خطة التنفيذ.

## الوصول إلى الفهرس والجدول

على غرار MySQL كثيراً، يعرض SQLBase سطراً واحداً لكل وصول إلى جدول في خطة التنفيذ. وترتيب الوصول، مثل MySQL أيضاً، من الأعلى إلى الأسفل: السطر الأول في خطة التنفيذ يقابل أول جدول يُوصَل إليه.

سيُعرض الفهرس المستخدم أيضاً في عمود `INDEX`.

ولا يعطي SQLBase أي إشارات إلى مسوحات النطاق مقابل الفريدة أو مسوحات الفهرس فقط («Index-only table access»).

وتقدّم القائمة التالية جدولاً مرجعياً مختصراً للعمليات الفيزيائية المعروفة في SQLBase مقابل نظيراتها في Oracle. وللأسف لا تظهر أسماء هذه العمليات الفيزيائية في خطة تنفيذ SQLBase:

Index leaf scanتقابل `INDEX FULL SCAN` في Oracle: تقرأ الفهرس بترتيبه. ويشمل `Index leaf scan` أيضاً الوصول اللاحق إلى الجدول عند الحاجة.

Matching index scan

يقابل `INDEX RANGE/UNIQUE SCAN` في Oracle مع `TABLE ACCESS BY INDEX ROWID` اللاحق عند الحاجة.

## عمليات الربط

تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».

تشير وثائق SQLBase وخطط التنفيذ إلى الجداول المؤقتة باعتبارها النتيجة الوسيطة. وتذكر الوثائق أيضاً جداول مؤقتة على القرص — ولا يتضح لي هل يعني ذلك أن النتائج الوسيطة تُجسَّد دائماً.

ويدعم SQLBase جميع تقنيات الربط الأساسية الثلاث:

NESTED LOOP / INDEX LOOP / ربط الحلقات بفهرس تجزئة

هذه في الأساس عمليات ربط بحلقات متداخلة، وتختلف فقط في الفهارس المستخدمة: `Simple loop join` لا يستخدم فهارس إطلاقاً (وقد يكرر المسوحات الكاملة على الجدول الداخلي)، أما `Loop join with (hash) index` فيستخدم فهرساً على الجدول الداخلي (وقد يكون فهرس تجزئة في حالة الربط المتساوي).

MERGE JOIN

ربط دمج الفهرس (المعروض كـ`MERGE JOIN` في خطة التنفيذ) هو ربط دمج بالترتيب مع شرط مسبق بوجود فهارس على أعمدة الربط في الجدولين — ما يمنع الحاجة إلى أي عملية فرز.

HASH JOIN

هو ربط بالتجزئة، كما يوحي الاسم.

## الترتيب والتجميع

لا يشير SQLBase إلى عمليات الفرز أو التجميع في خطة التنفيذ. غير أنه قادر على الاستفادة من فهرس لإزالة عمليات الفرز. لاحظ أن SQLBase يدعم أيضاً مُعدِّلَي `ASC`/`DESC` في `CREATE INDEX`.

## استعلامات Top-N

يمكن تنفيذ استعلامات Top-N باستخدام معامل جلسة:

```
SET LIMIT n
```

```sql
SELECT ...
```

```
SET LIMIT off
```

ويبدو أن ذلك لا يؤثر في التحسين. ولحمل المُحسِّن على تفضيل تنفيذ Top-N متدفق عند جلب جزء صغير من النتيجة الكاملة، استخدم [خيار «Optimize first fetch»](http://support.guptatechnologies.com/Docs/SQLBaseDoc116/sqltalk_cmd_ref.html#7726):

```
SET OPTIMIZEFIRSTFETCH 1
```

سيحسّن المُحسِّن الآن خطة التنفيذ بحيث يُعاد الصف الأول بأسرع ما يمكن. ولا تنسَ العودة إلى نمط التحسين الكامل بعد ذلك:

```
SET OPTIMIZEFIRSTFETCH 0
```

ولا تشير خطة التنفيذ إلى وجود حد Top-N، ولا إلى غياب عملية فرز للدلالة على تنفيذ متدفق.
