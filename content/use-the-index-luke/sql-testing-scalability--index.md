---
title: "الأداء وقابلية التوسع"
lang: ar
source: https://use-the-index-luke.com/sql/testing-scalability
---

يتناول هذا الفصل أداء قواعد البيانات وقابليتها للتوسع.

وفي هذا السياق، أستخدم التعريف التالي لقابلية التوسع:

```
Scalability is the ability of a system, network, or process,
to handle a growing amount of work in a capable manner
or
its ability to be enlarged to accommodate that growth.
```

— [Wikipedia](https://en.wikipedia.org/wiki/Scalability)

ترى أن هناك في الواقع تعريفين: الأول عن آثار الحِمل المتنامي على النظام، والثاني عن توسيع النظام للتعامل مع حِمل أكبر.

ويحظى التعريف الثاني بشعبية أكبر بكثير من الأول؛ فكلما تحدث أحدهم عن قابلية التوسع، كان الحديث دائماً تقريباً عن استخدام عتاد أكثر. و*التوسع الرأسي* و*التوسع الأفقي* هما الكلمتان المفتاحيتان المعنيتان، وقد أكملتهما حديثاً عبارات رنّانة جديدة مثل *النطاق الشبكي (web-scale)*.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-scalability&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

وعلى وجه العموم، تتعلق قابلية التوسع بأثر التغيرات البيئية في الأداء. والعتاد ليس سوى معامل بيئي واحد يمكن أن يتغير؛ ويتناول هذا الفصل معاملات أخرى مثل حجم البيانات وحِمل النظام أيضاً.

## المحتويات

1. *[حجم البيانات](/book/use-the-index-luke/sql-testing-scalability-data-volume/index)* — الفهرسة المتهاونة تعضّ من جديد
2. *[حِمل النظام](/book/use-the-index-luke/sql-testing-scalability-system-load/index)* — حِمل الإنتاج يؤثر في زمن الاستجابة
3. *[زمن الاستجابة والإنتاجية](/book/use-the-index-luke/sql-testing-scalability-response-time-throughput-scaling-horizontal/index)* — قابلية التوسع الأفقي
