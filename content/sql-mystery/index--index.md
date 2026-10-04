---
title: "لغز جريمة SQL"
lang: ar
source: https://mystery.knightlab.com/
---

![A decorative illustration of a detective looking at an evidence board.](https://mystery.knightlab.com/images/sql-mystery/index-0-174092-clue-illustration.webp){#intro}

وقعت جريمة قتل في مدينة SQL! صُمّم لغز جريمة SQL ليكون في الوقت نفسه درسًا ذاتيًا لتعلّم مفاهيم SQL وأوامرها، ولعبة ممتعة لمستخدمي SQL المخضرمين لحلّ جريمة مثيرة.

## جديد على SQL؟

هذا التمرين مقصود به التدرب على مهارات SQL أكثر من كونه درسًا تعليميًا كاملًا. وإن لم تستخدم SQL قط، [جرّب الشرح التفصيلي](https://mystery.knightlab.com/book/sql-mystery/walkthrough/index). وإن كنت تريد فعلًا أن تتعلم الكثير عن SQL، فقد تفضّل درسًا تعليميًا كاملًا مثل [Select Star SQL.](https://selectstarsql.com/)

وإن كنت مرتاحًا مع SQL، فيمكنك [البدء من هنا مباشرة](#experienced)!

## يبدأ المحققون المخضرمون في SQL من هنا

وقعت جريمة، والمحقق يحتاج إلى مساعدتك. أعطاك المحقق تقرير مسرح الجريمة، لكنك فقدته بطريقة ما. وتتذكر بضبابية أن الجريمة كانت **جريمة قتل (murder)** وقعت في وقت ما في **15 يناير 2018** وأنها حدثت في **مدينة SQL**. ابدأ باسترجاع تقرير مسرح الجريمة المقابل من قاعدة بيانات قسم الشرطة.

### استكشاف بنية قاعدة البيانات

كثيرًا ما يستطيع مستخدمو SQL المخضرمون استخدام استعلامات (queries) قاعدة البيانات لاستنتاج بنية قاعدة بيانات (database). لكن كل نظام قاعدة بيانات له طرق مختلفة في إدارة هذه المعلومات. وقد بُني لغز جريمة SQL باستخدام SQLite. استخدم أمر SQL هذا لإيجاد الجداول في قاعدة بيانات لغز الجريمة.

وإلى جانب معرفة أسماء الجداول، تحتاج إلى معرفة بنية كل جدول. والطريقة التي يعمل بها ذلك تعتمد أيضًا على تقنية قاعدة البيانات التي تستخدمها. وهذه هي طريقة فعل ذلك مع SQLite.

### والباقي متروك لك!

إن كنت مرتاحًا حقًا مع SQL، فالأرجح أنك ستستطيع المتابعة من هنا.

لكن انقر هنا لعرض مخطط البنية (schema diagram). ![](https://mystery.knightlab.com/images/sql-mystery/index-1-schema.webp)

ويمكنك دائمًا الانتقال إلى [الشرح التفصيلي](https://mystery.knightlab.com/book/sql-mystery/walkthrough/index).

### تحقّق من حلّك

### الإسناد

أنشأ لغز جريمة SQL كل من [Joon Park](https://twitter.com/joonparkmusic) و[Cathy He](https://twitter.com/Cathy_MeiyingHe) عندما كانا زميلين في Knight Lab. راجع [مستودع GitHub](https://github.com/NUKnightLab/sql-mysteries) لمزيد من المعلومات.

تكفّل [Joe Germuska](https://twitter.com/joegermuska) بتكييفه وإنتاجه للويب.

استُلهم هذا اللغز من [جريمة في مدينة Terminal المجاورة.](https://github.com/veltman/clmystery)

يعمل SQL في المتصفح بفضل [SQL.js](https://github.com/sql-js/sql.js/)

أنشأ مكوّنات الويب المخصّصة لاستعلامات SQL وأتاحها للملكية العامة Zi Chong Kao، مبتكر [Select Star SQL.](https://selectstarsql.com/)

رسم المحقق مقدَّم من [Vectors by Vecteezy](https://www.vecteezy.com/)

الشيفرة الأصلية لهذا المشروع منشورة تحت [رخصة MIT](https://github.com/NUKnightLab/sql-mysteries/blob/master/LICENSE)

النص الأصلي والمحتوى الآخر لهذا المشروع منشوران تحت [Creative Commons CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
