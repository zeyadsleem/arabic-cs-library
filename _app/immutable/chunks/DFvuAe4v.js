const t="ahastack",a="htmx",n="htmx",p="index",h="htmx",c=[],e=`<p>تصف htmx نفسها بأنها «امتداد لـ HTML».</p>
<p>وتقدّم بضع أفكار عبقرية:</p>
<ul>
<li>يستطيع أي عنصر HTML أن يبدأ طلب HTTP (لا النماذج (forms) أو الروابط وحدها)</li>
<li>يستطيع أي حدث أن يُطلق طلب HTTP</li>
<li>يمكنك استعمال جميع طرق HTTP (PUT و DELETE و PATCH) تصريحيًا، إلى جانب GET (النماذج والروابط) و POST (المتاح في HTML للنماذج فقط)</li>
</ul>
<p>هذه الأفكار الثلاث وحدها عبقرية.</p>
<p>ثمّ تتيح لنا بسهولة تجاوز فكرة «استبدال الشاشة بأكملها»، وتقدّم «استبدال هذا الجزء من HTML فقط بشظية (fragment) من HTML».</p>
<p>إنها مكتبة (library) صغيرة عبقرية، بلا أي اعتماديات، تُثبَّت عبر وسم script (script tag). وهي محايدة تجاه الخادم (backend-agnostic).</p>
<p>الإصدار الحالي هو htmx 4. راجع <a href="/arabic-cs-library/book/ahastack/whats-changed/index">ما تغيّر منذ 2024</a> إن كنت تستعمل إصدارًا أقدم.</p>
<p>نستعمل htmx للتعامل مع اتصالات HTTP بين العميل والخادم بعد تحميل الصفحة.</p>
<p>فمثلًا عندما ينقر المستخدم على رابط، نحمّل بعض البيانات من الخادم، فنحصل عليها بصيغة HTML، ونضيفها إلى الصفحة ديناميكيًا.</p>
<p>ونفعل ذلك بطريقة تصريحية (declarative).</p>
<p>لا بكتابة شيفرة JavaScript أمرية تُملي على الصفحة ما تفعله، بل نرتفع مستوىً من التجريد (abstraction) ونصرّح بما نريده منها أن تفعله.</p>
<p><a href="https://htmx.org">اطّلع على الصفحة الرئيسية لـ htmx</a></p>
<p><a href="https://thevalleyofcode.com/htmx">تعلّم htmx في The Valley of Code</a></p>
`,s={book:t,chapter:a,chapterTitle:n,slug:p,title:h,headings:c,html:e};export{t as book,a as chapter,n as chapterTitle,s as default,c as headings,e as html,p as slug,h as title};
