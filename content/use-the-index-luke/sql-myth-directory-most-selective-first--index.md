---
title: "الأكثر انتقائية أولاً"
lang: ar
source: https://use-the-index-luke.com/sql/myth-directory/most-selective-first
---

في كل مرة يُنشأ فيها فهرس مركّب، يجب اختيار ترتيب الأعمدة بحكمة. وقد خُصص [*الفهارس المُدمجة*](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index) لهذه المسألة.

غير أن هناك خرافة تقول إنه ينبغي دائماً وضع العمود الأكثر انتقائية في الموضع الأول؛ وهذا خطأ محض.

#### مهم

أهم اعتبار عند تعريف فهرس مُدمج هو كيفية اختيار ترتيب الأعمدة بحيث يمكن استخدامه بأكبر قدر ممكن من التكرار.

وبعد ذلك، توجد حتى أسباب لوضع العمود الأقل انتقائية أولاً؛ فتستطيع قاعدة بيانات Oracle مثلاً استخدام `INDEX SKIP SCAN` في تلك الحالة. لكنها ميزة متقدمة. أما العامل الأهم... أمهلني، هل قلت ذلك من قبل؟

ويرتبط جوهر هذه الخرافة الحقيقي بفهرسة شروط النطاق المستقلة — وهي الحالة الوحيدة التي ينبغي أن تؤثر فيها الانتقائية في تصميم الفهرس (انظر [*دمج الفهارس: الجمع بين فهارس متعددة*](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index)).

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=myth-most-selective-first&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

الخرافة راسخة رسوخاً استثنائياً في بيئة SQL Server، بل تظهر حتى في الوثائق الرسمية. والسبب أن SQL Server يحتفظ بمدرج تكراري (histogram) للعمود الأول في الفهرس فقط. لكن هذا يعني أن التوصية ينبغي أن تُصاغ هكذا: «الأعمدة غير المتساوية التوزيع أولاً»، لأن المدرجات التكرارية ليست مفيدة كثيراً للأعمدة المتساوية التوزيع على أي حال.

ولست أول من يحارب هذه الخرافة. وإليك بعض المراجع الإضافية التي تدحضها:

لا تضع تلقائياً الحد الأكثر انتقائية أولاً في فهرس مُدمج.

— Guy Harrison في «[Oracle Performance Survival Guide](http://guyharrison.squarespace.com/blog/2009/10/5/oracle-performance-survival-guide-available-as-pdf.html)»

> من الحكايات الخرافية التي كثيراً ما تُقتبس عن الفهارس التوجيهُ بأن «توضع الأعمدة الأكثر انتقائية أولاً». ولم يكن ذلك يوماً قاعدة عملية سليمة (ربما باستثناء ما قبل الإصدار 6.0).— Jonathan Lewis في «[Oracle Scratchpad](https://jonathanlewis.wordpress.com/2007/02/14/conditional-sql-2/)»

لا جدوى من وضع العمود الأكثر انتقائية في الفهرس على اليسار إذا لم تصفِّ عليه إلا استعلامات قليلة جداً. أما الاستعلامات التي لا تصفّي عليه بل تصفّي على أعمدة الفهرس الأخرى فسيكون عليها أن تمسح، والمسح مكلف.

— Gail Shaw في «[SQL (Server) in the Wild](https://www.sqlinthewild.co.za/index.php/2009/01/19/index-columns-selectivity-and-equality-predicates/)»
