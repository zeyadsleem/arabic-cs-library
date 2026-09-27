const e="game-programming-patterns",n="decoupling-patterns",a="Decoupling Patterns",r="index",t="أنماط فصل الترابط",i=[{depth:2,id:"الأنماط",text:"الأنماط"}],o=`<p>^title أنماط فصل الترابط</p>
<p>بمجرد أن تتقن لغة برمجة، تصبح كتابة شيفرة تفعل ما تريده سهلة إلى حدٍّ كبير. أما
الصعب هو كتابة شيفرة يسهل تكيّفها حين تتغيّر <em>متطلباتك</em>. فنادراً ما نتمتع برفاهية
مجموعة ميزات مثالية قبل أن نشغّل محرّرنا.</p>
<p>ولنا أداة قوية تجعل التغيير أسهل، وهي <em>فصل الترابط</em> (decoupling). فحين نقول إن قطعتَي
شيفرة «مفصولتان في الترابط»، فإننا نعني أن التغيير في إحداهما لا يستلزم عادةً تغييراً
في الأخرى. وحين تغيّر ميزة ما في لعبتك، كلما قلّت المواضع في الشيفرة التي عليك
لمسها، كان الأمر أسهل.</p>
<p>تفصل <a href="/arabic-cs-library/book/game-programming-patterns/component/index">المكوّنات</a> مجالات مختلفة في لعبتك عن بعضها داخل كيان واحد
يملك جوانب من جميعها. ويفصل <a href="/arabic-cs-library/book/game-programming-patterns/event-queue/index">طوابير الأحداث</a> كائنين
يتواصلان مع بعضهما، ساكنياً و<em>في الزمن</em> معاً. وتتيح
<a href="/arabic-cs-library/book/game-programming-patterns/service-locator/index">محدّدات الخدمات</a> للشيفرة الوصول إلى مرفق دون أن ترتبط
بالشيفرة التي توفّره.</p>
<h2 id="الأنماط">الأنماط</h2>
<ul>
<li><a href="/arabic-cs-library/book/game-programming-patterns/component/index">المكوّن</a></li>
<li><a href="/arabic-cs-library/book/game-programming-patterns/event-queue/index">طابور الأحداث</a></li>
<li><a href="/arabic-cs-library/book/game-programming-patterns/service-locator/index">محدّد الخدمات</a></li>
</ul>
`,m={book:e,chapter:n,chapterTitle:a,slug:r,title:t,headings:i,html:o};export{e as book,n as chapter,a as chapterTitle,m as default,i as headings,o as html,r as slug,t as title};
