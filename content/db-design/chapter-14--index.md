---
title: "مستخدمو قاعدة البيانات"
lang: ar
source: https://opentextbc.ca/dbdesign01/chapter/chapter-14-database-users/
---

المتن الرئيسي

## المستخدمون النهائيون

المستخدمون النهائيون (end users) هم الأشخاص الذين تتطلب وظائفهم الوصول إلى قاعدة البيانات للاستعلام عنها وتحديثها وإنتاج التقارير.

### مستخدم التطبيق

مستخدم التطبيق (application user) هو شخص يستخدم برنامج تطبيقيًا موجودًا لإنجاز المهام اليومية.

### المستخدم المتقدّم

المستخدمون المتقدّمون (sophisticated users) هم من لديه طريقة خاصة به للوصول إلى قاعدة البيانات. وهذا يعني أنه لا يستخدم البرنامج التطبيقي المتوفر في النظام. بل قد يعرّف تطبيقه الخاص أو يصف احتياجه مباشرة باستخدام لغات الاستعلام. ويصون هؤلاء المستخدمون المتخصصون قواعد بياناتهم الشخصية باستخدام حزم برامج جاهزة توفّر أوامر سهلة الاستخدام تعتمد على القوائم المنسدلة، مثل MS Access.

### مبرمجو التطبيقات

ينفّذ هؤلاء المستخدمون برامج تطبيقية بعينها للوصول إلى البيانات المخزَّنة. ويجب أن يكونوا على اطلاع بنظم إدارة قواعد البيانات (DBMS) لإنجاز مهمتهم.

### مسؤولو قواعد البيانات (DBA)

قد يكون هذا شخصًا واحدًا أو مجموعة أشخاص في المؤسسة مسؤولين عن منح صلاحية الوصول إلى قاعدة البيانات ومراقبة استخدامها وإدارة جميع الموارد التي تدعم استخدام نظام قاعدة البيانات بالكامل.

مبرمج التطبيقات (application programmer): مستخدم ينفّذ برامج تطبيقية بعينها للوصول إلى البيانات المخزَّنة

مستخدم التطبيق (application user): يستخدم برنامج تطبيقيًا موجودًا لإنجاز المهام اليومية

مسؤول قاعدة البيانات (database administrator, DBA): مسؤول عن منح صلاحية الوصول إلى قاعدة البيانات ومراقبتها وإدارة جميع الموارد التي تدعم استخدام نظام قاعدة البيانات بالكامل

المستخدم النهائي (end user): أشخاص تتطلب وظائفهم الوصول إلى قاعدة البيانات للاستعلام عنها وتحديثها وإنتاج التقارير

المستخدم المتقدّم (sophisticated user): من يستخدم طرقًا أخرى، بخلاف البرنامج التطبيقي، للوصول إلى قاعدة البيانات

لا توجد تمارين مقدَّمة لهذا الفصل.

```sql
Key Terms

application programmer: user who implements specific application programs to access the stored data

application user: accesses an existing application program to perform daily tasks.

database administrator (DBA): responsible for authorizing access to the database, monitoring its use and managing all the resources to support the use of the entire database system

end user: people whose jobs require access to a database for querying, updating and generating reports

sophisticated user: those who use other methods, other than the application program, to access the database
```
