const e="crafting-interpreters",t="appendix-ii",r="Appendix II",n="index",i="الملحق الثاني",a=[{depth:2,id:"التعبيرات",text:"التعبيرات"},{depth:3,id:"تعبير-الإسناد",text:"تعبير الإسناد"},{depth:3,id:"تعبير-ثنائي",text:"تعبير ثنائي"},{depth:3,id:"تعبير-استدعاء",text:"تعبير استدعاء"},{depth:3,id:"تعبير-الجلب-get",text:"تعبير الجلب (get)"},{depth:3,id:"تعبير-تجميع",text:"تعبير تجميع"},{depth:3,id:"تعبير-قيمة-حرفية",text:"تعبير قيمة حرفية"},{depth:3,id:"تعبير-منطقي",text:"تعبير منطقي"},{depth:3,id:"تعبير-الضبط-set",text:"تعبير الضبط (set)"},{depth:3,id:"تعبير-الاستدعاء-الفائق-super",text:"تعبير الاستدعاء الفائق (super)"},{depth:3,id:"تعبير-this",text:"تعبير this"},{depth:3,id:"تعبير-أحادي",text:"تعبير أحادي"},{depth:3,id:"تعبير-متغير",text:"تعبير متغيّر"},{depth:2,id:"الجمل",text:"الجمل"},{depth:3,id:"جملة-الكتلة-block",text:"جملة الكتلة (block)"},{depth:3,id:"جملة-الصنف-class",text:"جملة الصنف (class)"},{depth:3,id:"جملة-تعبير",text:"جملة تعبير"},{depth:3,id:"جملة-دالة",text:"جملة دالة"},{depth:3,id:"جملة-if",text:"جملة if"},{depth:3,id:"جملة-print",text:"جملة print"},{depth:3,id:"جملة-return",text:"جملة return"},{depth:3,id:"جملة-متغير",text:"جملة متغيّر"},{depth:3,id:"جملة-while",text:"جملة while"}],o=`<p>لمنفعة القارئ، هاهو الشيفرة التي يُنتجها <a href="/arabic-cs-library/book/crafting-interpreters/representing-code/index#metaprogramming-the-trees">السكربت الصغير الذي بنيناه</a>
لأتمتة توليد أصناف شجرة التحليل الخاصّة بـ jlox.</p>
<h2 id="التعبيرات">التعبيرات</h2>
<p>التعبيرات هي أوّل عُقد شجرة التحليل التي نراها، وهي مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/representing-code/index">تمثيل
الشيفرة</a>&quot;. ويُعرّف صنف <code>Expr</code> الرئيسي (class) واجهة الزائر
(visitor interface) المستخدَمة للتوجيه نحو أنواع التعبيرات المحدّدة، ويحتوي الأصناف
الفرعية لتلك التعبيرات الأخرى كأصناف متداخلة.</p>
<p>^code expr</p>
<h3 id="تعبير-الإسناد">تعبير الإسناد</h3>
<p>إسناد (assignment) المتغيّرات مُقدَّم في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index#assignment">الجمل والحالة</a>&quot;.</p>
<p>^code expr-assign</p>
<h3 id="تعبير-ثنائي">تعبير ثنائي</h3>
<p>المعاملات الثنائية مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/representing-code/index">تمثيل
الشيفرة</a>&quot;.</p>
<p>^code expr-binary</p>
<h3 id="تعبير-استدعاء">تعبير استدعاء</h3>
<p>تعبيرات استدعاء الدوال مُقدَّمة في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/functions/index#function-calls">الدوال</a>&quot;.</p>
<p>^code expr-call</p>
<h3 id="تعبير-الجلب-get">تعبير الجلب (get)</h3>
<p>الوصول إلى الخصائص، أو تعبيرات &quot;get&quot;، مُقدَّمة في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/classes/index#properties-on-instances">الأصناف</a>&quot;.</p>
<p>^code expr-get</p>
<h3 id="تعبير-تجميع">تعبير تجميع</h3>
<p>استخدام الأقواس لتجميع التعبيرات مُقدَّم في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/representing-code/index">تمثيل
الشيفرة</a>&quot;.</p>
<p>^code expr-grouping</p>
<h3 id="تعبير-قيمة-حرفية">تعبير قيمة حرفية</h3>
<p>تعبيرات القيم الحرفية مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/representing-code/index">تمثيل
الشيفرة</a>&quot;.</p>
<p>^code expr-literal</p>
<h3 id="تعبير-منطقي">تعبير منطقي</h3>
<p>معاملا <code>and</code> و<code>or</code> المنطقيان مُقدَّمان في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/control-flow/index#logical-operators">التحكّم في
المسار</a>&quot;.</p>
<p>^code expr-logical</p>
<h3 id="تعبير-الضبط-set">تعبير الضبط (set)</h3>
<p>إسناد الخصائص، أو تعبيرات &quot;set&quot;، مُقدَّمة في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/classes/index#properties-on-instances">الأصناف</a>&quot;.</p>
<p>^code expr-set</p>
<h3 id="تعبير-الاستدعاء-الفائق-super">تعبير الاستدعاء الفائق (super)</h3>
<p>تعبير <code>super</code> مُقدَّم في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/inheritance/index#calling-superclass-methods">الوراثة</a>&quot;.</p>
<p>^code expr-super</p>
<h3 id="تعبير-this">تعبير this</h3>
<p>تعبير <code>this</code> مُقدَّم في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/classes/index#this">الأصناف</a>&quot;.</p>
<p>^code expr-this</p>
<h3 id="تعبير-أحادي">تعبير أحادي</h3>
<p>المعاملات الأحادية مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/representing-code/index">تمثيل الشيفرة</a>&quot;.</p>
<p>^code expr-unary</p>
<h3 id="تعبير-متغير">تعبير متغيّر</h3>
<p>تعبيرات الوصول إلى المتغيّرات (variables) مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index#variable-syntax">البيانات
والحالة</a>&quot;.</p>
<p>^code expr-variable</p>
<h2 id="الجمل">الجمل</h2>
<p>تشكّل الجمل تسلسلاً ثانياً من عُقد شجرة التحليل مستقلاً عن
التعبيرات. وقد أضفنا أول عبارتين منها في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index">البيانات
والحالة</a>&quot;.</p>
<p>^code stmt</p>
<h3 id="جملة-الكتلة-block">جملة الكتلة (block)</h3>
<p>جملة الكتلة بأقواسها المعقوفة التي تُعرّف نطاقاً (scope) محلياً مُقدَّمة في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index#block-syntax-and-semantics">الجمل والحالة</a>&quot;.</p>
<p>^code stmt-block</p>
<h3 id="جملة-الصنف-class">جملة الصنف (class)</h3>
<p>إعلانات الأصناف مُقدَّمة -- ومن المتوقّع تماماً -- في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/classes/index#class-declarations">الأصناف</a>&quot;.</p>
<p>^code stmt-class</p>
<h3 id="جملة-تعبير">جملة تعبير</h3>
<p>جملة التعبير مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index#statements">البيانات
والحالة</a>&quot;.</p>
<p>^code stmt-expression</p>
<h3 id="جملة-دالة">جملة دالة</h3>
<p>إعلانات الدوال مُقدَّمة -- وقد خمّنت ذلك -- في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/functions/index#function-declarations">الدوال</a>&quot;.</p>
<p>^code stmt-function</p>
<h3 id="جملة-if">جملة <code>if</code></h3>
<p>جملة <code>if</code> مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/control-flow/index#conditional-execution">التحكّم في
المسار</a>&quot;.</p>
<p>^code stmt-if</p>
<h3 id="جملة-print">جملة <code>print</code></h3>
<p>جملة <code>print</code> مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index#statements">البيانات
والحالة</a>&quot;.</p>
<p>^code stmt-print</p>
<h3 id="جملة-return">جملة <code>return</code></h3>
<p>تحتاج دالة كي تُرجع منها، لذا فإنّ جُمل <code>return</code> مُقدَّمة في
&quot;<a href="/arabic-cs-library/book/crafting-interpreters/functions/index#return-statements">الدوال</a>&quot;.</p>
<p>^code stmt-return</p>
<h3 id="جملة-متغير">جملة متغيّر</h3>
<p>إعلانات المتغيّرات مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/statements-and-state/index#variable-syntax">البيانات
والحالة</a>&quot;.</p>
<p>^code stmt-var</p>
<h3 id="جملة-while">جملة <code>while</code></h3>
<p>جملة <code>while</code> مُقدَّمة في &quot;<a href="/arabic-cs-library/book/crafting-interpreters/control-flow/index#while-loops">التحكّم في
المسار</a>&quot;.</p>
<p>^code stmt-while</p>
`,p={book:e,chapter:t,chapterTitle:r,slug:n,title:i,headings:a,html:o};export{e as book,t as chapter,r as chapterTitle,p as default,a as headings,o as html,n as slug,i as title};
