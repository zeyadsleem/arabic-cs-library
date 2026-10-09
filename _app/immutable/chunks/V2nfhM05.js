const t="sql-mystery",e="index",s="لغز القتل في SQL",a="index",n="لغز جريمة SQL",r=[{depth:2,id:"جديد-على-sql",text:"جديد على SQL؟"},{depth:2,id:"يبدأ-المحققون-المخضرمون-في-sql-من-هنا",text:"يبدأ المحققون المخضرمون في SQL من هنا"},{depth:3,id:"استكشاف-بنية-قاعدة-البيانات",text:"استكشاف بنية قاعدة البيانات"},{depth:3,id:"والباقي-متروك-لك",text:"والباقي متروك لك!"},{depth:3,id:"تحقق-من-حلك",text:"تحقّق من حلّك"},{depth:3,id:"الإسناد",text:"الإسناد"}],h=`<p><img src="/arabic-cs-library/images/sql-mystery/index-0-174092-clue-illustration.webp" alt="رسم توضيحي لمحقّق ينظر إلى لوح أدلة." id="intro"></p>
<p>وقعت جريمة قتل في مدينة SQL! صُمّم لغز جريمة SQL ليكون في الوقت نفسه درسًا ذاتيًا لتعلّم مفاهيم SQL وأوامرها، ولعبة ممتعة لمستخدمي SQL المخضرمين لحلّ جريمة مثيرة.</p>
<h2 id="جديد-على-sql">جديد على SQL؟</h2>
<p>هذا التمرين مقصود به التدرب على مهارات SQL أكثر من كونه درسًا تعليميًا كاملًا. وإن لم تستخدم SQL قط، <a href="https://mystery.knightlab.com/book/sql-mystery/walkthrough/index">جرّب الشرح التفصيلي</a>. وإن كنت تريد فعلًا أن تتعلم الكثير عن SQL، فقد تفضّل درسًا تعليميًا كاملًا مثل <a href="https://selectstarsql.com/">Select Star SQL.</a></p>
<p>وإن كنت مرتاحًا مع SQL، فيمكنك <a href="#experienced">البدء من هنا مباشرة</a>!</p>
<h2 id="يبدأ-المحققون-المخضرمون-في-sql-من-هنا">يبدأ المحققون المخضرمون في SQL من هنا <span class="content-anchor" id="experienced"></span></h2>
<p>وقعت جريمة، والمحقق يحتاج إلى مساعدتك. أعطاك المحقق تقرير مسرح الجريمة، لكنك فقدته بطريقة ما. وتتذكر بضبابية أن الجريمة كانت <strong>جريمة قتل (murder)</strong> وقعت في وقت ما في <strong>15 يناير 2018</strong> وأنها حدثت في <strong>مدينة SQL</strong>. ابدأ باسترجاع تقرير مسرح الجريمة المقابل من قاعدة بيانات قسم الشرطة.</p>
<h3 id="استكشاف-بنية-قاعدة-البيانات">استكشاف بنية قاعدة البيانات</h3>
<p>كثيرًا ما يستطيع مستخدمو SQL المخضرمون استخدام استعلامات (queries) قاعدة البيانات لاستنتاج بنية قاعدة بيانات (database). لكن كل نظام قاعدة بيانات له طرق مختلفة في إدارة هذه المعلومات. وقد بُني لغز جريمة SQL باستخدام SQLite. استخدم أمر SQL هذا لإيجاد الجداول في قاعدة بيانات لغز الجريمة.</p>
<p>وإلى جانب معرفة أسماء الجداول، تحتاج إلى معرفة بنية كل جدول. والطريقة التي يعمل بها ذلك تعتمد أيضًا على تقنية قاعدة البيانات التي تستخدمها. وهذه هي طريقة فعل ذلك مع SQLite.</p>
<h3 id="والباقي-متروك-لك">والباقي متروك لك!</h3>
<p>إن كنت مرتاحًا حقًا مع SQL، فالأرجح أنك ستستطيع المتابعة من هنا.</p>
<p>لكن انقر هنا لعرض مخطط البنية (schema diagram). <img src="/arabic-cs-library/images/sql-mystery/index-1-schema.webp" alt=""></p>
<p>ويمكنك دائمًا الانتقال إلى <a href="https://mystery.knightlab.com/book/sql-mystery/walkthrough/index">الشرح التفصيلي</a>.</p>
<h3 id="تحقق-من-حلك">تحقّق من حلّك</h3>
<h3 id="الإسناد">الإسناد</h3>
<p>أنشأ لغز جريمة SQL كل من <a href="https://twitter.com/joonparkmusic">Joon Park</a> و<a href="https://twitter.com/Cathy_MeiyingHe">Cathy He</a> عندما كانا زميلين في Knight Lab. راجع <a href="https://github.com/NUKnightLab/sql-mysteries">مستودع GitHub</a> لمزيد من المعلومات.</p>
<p>تكفّل <a href="https://twitter.com/joegermuska">Joe Germuska</a> بتكييفه وإنتاجه للويب.</p>
<p>استُلهم هذا اللغز من <a href="https://github.com/veltman/clmystery">جريمة في مدينة Terminal المجاورة.</a></p>
<p>يعمل SQL في المتصفح بفضل <a href="https://github.com/sql-js/sql.js/">SQL.js</a></p>
<p>أنشأ مكوّنات الويب المخصّصة لاستعلامات SQL وأتاحها للملكية العامة Zi Chong Kao، مبتكر <a href="https://selectstarsql.com/">Select Star SQL.</a></p>
<p>رسم المحقق مقدَّم من <a href="https://www.vecteezy.com/">Vectors by Vecteezy</a></p>
<p>الشيفرة الأصلية لهذا المشروع منشورة تحت <a href="https://github.com/NUKnightLab/sql-mysteries/blob/master/LICENSE">رخصة MIT</a></p>
<p>النص الأصلي والمحتوى الآخر لهذا المشروع منشوران تحت <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons CC BY-SA 4.0</a></p>
`,p={book:t,chapter:e,chapterTitle:s,slug:a,title:n,headings:r,html:h};export{t as book,e as chapter,s as chapterTitle,p as default,r as headings,h as html,a as slug,n as title};
