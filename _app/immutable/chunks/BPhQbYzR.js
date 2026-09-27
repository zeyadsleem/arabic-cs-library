const a="game-programming-patterns",e="sequencing-patterns",n="Sequencing Patterns",r="index",t="أنماط التسلسل",i=[{depth:2,id:"الأنماط",text:"الأنماط"}],o=`<p>^title Sequencing Patterns</p>
<p>ألعاب الفيديو ممتعة في المقام الأول لأنها تنقلنا إلى مكانٍ آخر. لبضع دقائق
(ولنكن صادقين مع أنفسنا: لزمنٍ أطول بكثير) نصبح سكان عالمٍ افتراضي. وإنشاء هذه
العوالم إحدى أعلى متع أن تكون مبرمج ألعاب.</p>
<p>أحد الجوانب التي تتسم بها معظم عوالم الألعاب هذه هو <em>الزمن</em> — فالعالم الاصطناعي
حيّ يتنفّس بإيقاعه الخاص. وكبناة عوالم، علينا أن نخترع الزمن ونصنع التروس التي
تُدير ساعة لعبتنا الكبرى.</p>
<p>الأنماط في هذا القسم أدوات للقيام بذلك تماماً. فـ <a href="/arabic-cs-library/book/game-programming-patterns/game-loop/index">حلقة
اللعبة</a> هي المحور المركزي الذي تدور حوله الساعة. وتسمع الكائنات
نبضها عبر <a href="/arabic-cs-library/book/game-programming-patterns/update-method/index">دوال التحديث</a>. ويمكننا إخفاء الطابع المتسلسل
للحاسوب خلف واجهة من لقطات للحظات زمنية باستخدام <a href="/arabic-cs-library/book/game-programming-patterns/double-buffer/index">المخزن المؤقت
المزدوج</a>، بحيث يبدو العالم وكأنه يتحدّث في وقت واحد.</p>
<h2 id="الأنماط">الأنماط</h2>
<ul>
<li><a href="/arabic-cs-library/book/game-programming-patterns/double-buffer/index">المخزن المؤقت المزدوج (Double Buffer)</a></li>
<li><a href="/arabic-cs-library/book/game-programming-patterns/game-loop/index">حلقة اللعبة (Game Loop)</a></li>
<li><a href="/arabic-cs-library/book/game-programming-patterns/update-method/index">دالة التحديث (Update Method)</a></li>
</ul>
`,p={book:a,chapter:e,chapterTitle:n,slug:r,title:t,headings:i,html:o};export{a as book,e as chapter,n as chapterTitle,p as default,i as headings,o as html,r as slug,t as title};
