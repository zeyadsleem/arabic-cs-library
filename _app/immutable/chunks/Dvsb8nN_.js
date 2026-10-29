const a="mathematics-for-cs",e="ch06-state-machines",i="آلات الحالة",s="index",c="آلات الحالة",t=[{depth:2,id:"محتوى-الفصل",text:"محتوى الفصل"}],r=`<h1>آلات الحالة</h1>
<p>آلات الحالة نموذج مجرّد بسيط للعمليات التي تجري خطوةً خطوة. ولأن برامج الحاسوب يمكن فهمها على أنها تعرّف عمليات حسابية متتابعة الخطوات، فلا عجب أن تظهر آلات الحالة في علوم الحاسوب ظهورًا متكرّرًا، وأن تظهر أيضًا في مواضع أخرى كثيرة مثل تصميم الدارات الرقمية ونمذجة العمليات الاحتمالية. ويعرض هذا الفصل مبدأ الثبات لـ Floyd، وهو صيغة من الاستقراء مصمَّمة على مقاس مسألة واحدة: برهان خصائص آلات الحالة.</p>
<p>من أهمّ استعمالات الاستقراء في علوم الحاسوب إثبات أن خاصية مرغوبة، أو أكثر، تظلّ صادقة في كل خطوة من خطوات عملية ما. والخاصية التي تُحفظ عبر سلسلة من العمليات أو الخطوات تُسمّى <strong>ثابتًا محفوظًا</strong> (preserved invariant). ومن أمثلة الثوابت المرغوبة أن يبقى ارتفاع طائرة فوق ١٠٠٠ قدم ما لم تُفتح قلّابات الأجنحة، أو أن تبقى حرارة مفاعل نووي دون عتبة الانصهار.</p>
<p>يبدأ الفصل بتعريف آلة الحالة وانتقالاتها، ثم يصوغ مبدأ الثبات ويطبّقه على مسألتين: روبوت يتحرّك قطرًا على شبكة الأعداد الصحيحة، ومسألة الجرارين في فيلم Die Hard 3. وبعد ذلك ينتقل إلى الصحة الجزئية والانتهاء، وهما الخاصيتان اللتان نميّزهما Floyd في تحقّق البرامج، ويعرض المتغيّرات المشتقّة أداةً لإثبات الانتهاء. ويُختم الفصل بمسألة الزواج المستقرّ، وما يُسمّى «طقس التزاوج»، وهو خوارزمية أنيقة تُنتج تزويجًا مستقرًّا، ويُبرهن على صحّتها كلها بالثابت المحفوظ نفسه الذي بدأ به الفصل.</p>
<h2 id="محتوى-الفصل">محتوى الفصل</h2>
<ul>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-states-and-transitions">الحالات والانتقالات</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-the-invariant-principle">مبدأ الثبات</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-statement-of-the-invariant-principle">صياغة مبدأ الثبات</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-the-die-hard-example">مثال Die Hard</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-partial-correctness-and-termination">الصحة الجزئية والانتهاء</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-derived-variables">المتغيّرات المشتقّة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-termination-with-well-ordered-sets">الانتهاء بالمجموعات المرتّبة جيّدًا (اختياري)</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-a-southeast-jumping-robot">روبوت يقفز جنوبًا وشرقًا (اختياري)</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-the-stable-marriage-problem">مسألة الزواج المستقرّ</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-there-is-a-marriage-day">يوم الزواج</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-they-all-live-happily-ever-after">وعاشوا جميعًا في سعادة دائمة…</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-especially-the-men">… والرجال على وجه الخصوص</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch06-state-machines/sec-applications">تطبيقات طقس التزاوج</a></li>
</ul>
`,h={book:a,chapter:e,chapterTitle:i,slug:s,title:c,headings:t,html:r};export{a as book,e as chapter,i as chapterTitle,h as default,t as headings,r as html,s as slug,c as title};
