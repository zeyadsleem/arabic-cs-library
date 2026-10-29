---
title: "آلات الحالة"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# آلات الحالة

آلات الحالة نموذج مجرّد بسيط للعمليات التي تجري خطوةً خطوة. ولأن برامج الحاسوب يمكن فهمها على أنها تعرّف عمليات حسابية متتابعة الخطوات، فلا عجب أن تظهر آلات الحالة في علوم الحاسوب ظهورًا متكرّرًا، وأن تظهر أيضًا في مواضع أخرى كثيرة مثل تصميم الدارات الرقمية ونمذجة العمليات الاحتمالية. ويعرض هذا الفصل مبدأ الثبات لـ Floyd، وهو صيغة من الاستقراء مصمَّمة على مقاس مسألة واحدة: برهان خصائص آلات الحالة.

من أهمّ استعمالات الاستقراء في علوم الحاسوب إثبات أن خاصية مرغوبة، أو أكثر، تظلّ صادقة في كل خطوة من خطوات عملية ما. والخاصية التي تُحفظ عبر سلسلة من العمليات أو الخطوات تُسمّى **ثابتًا محفوظًا** (preserved invariant). ومن أمثلة الثوابت المرغوبة أن يبقى ارتفاع طائرة فوق ١٠٠٠ قدم ما لم تُفتح قلّابات الأجنحة، أو أن تبقى حرارة مفاعل نووي دون عتبة الانصهار.

يبدأ الفصل بتعريف آلة الحالة وانتقالاتها، ثم يصوغ مبدأ الثبات ويطبّقه على مسألتين: روبوت يتحرّك قطرًا على شبكة الأعداد الصحيحة، ومسألة الجرارين في فيلم Die Hard 3. وبعد ذلك ينتقل إلى الصحة الجزئية والانتهاء، وهما الخاصيتان اللتان نميّزهما Floyd في تحقّق البرامج، ويعرض المتغيّرات المشتقّة أداةً لإثبات الانتهاء. ويُختم الفصل بمسألة الزواج المستقرّ، وما يُسمّى «طقس التزاوج»، وهو خوارزمية أنيقة تُنتج تزويجًا مستقرًّا، ويُبرهن على صحّتها كلها بالثابت المحفوظ نفسه الذي بدأ به الفصل.

## محتوى الفصل

- [الحالات والانتقالات](/book/mathematics-for-cs/ch06-state-machines/sec-states-and-transitions)
- [مبدأ الثبات](/book/mathematics-for-cs/ch06-state-machines/sec-the-invariant-principle)
- [صياغة مبدأ الثبات](/book/mathematics-for-cs/ch06-state-machines/sec-statement-of-the-invariant-principle)
- [مثال Die Hard](/book/mathematics-for-cs/ch06-state-machines/sec-the-die-hard-example)
- [الصحة الجزئية والانتهاء](/book/mathematics-for-cs/ch06-state-machines/sec-partial-correctness-and-termination)
- [المتغيّرات المشتقّة](/book/mathematics-for-cs/ch06-state-machines/sec-derived-variables)
- [الانتهاء بالمجموعات المرتّبة جيّدًا (اختياري)](/book/mathematics-for-cs/ch06-state-machines/sec-termination-with-well-ordered-sets)
- [روبوت يقفز جنوبًا وشرقًا (اختياري)](/book/mathematics-for-cs/ch06-state-machines/sec-a-southeast-jumping-robot)
- [مسألة الزواج المستقرّ](/book/mathematics-for-cs/ch06-state-machines/sec-the-stable-marriage-problem)
- [يوم الزواج](/book/mathematics-for-cs/ch06-state-machines/sec-there-is-a-marriage-day)
- [وعاشوا جميعًا في سعادة دائمة…](/book/mathematics-for-cs/ch06-state-machines/sec-they-all-live-happily-ever-after)
- [… والرجال على وجه الخصوص](/book/mathematics-for-cs/ch06-state-machines/sec-especially-the-men)
- [تطبيقات طقس التزاوج](/book/mathematics-for-cs/ch06-state-machines/sec-applications)
