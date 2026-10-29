const a="mathematics-for-cs",e="ch07-recursive-data-types",r="أنواع البيانات العودية",s="index",c="أنواع البيانات العودية",i=[{depth:2,id:"محتوى-الفصل",text:"محتوى الفصل"}],t=`<h1>أنواع البيانات العودية</h1>
<p>تؤدّي أنواع البيانات العودية دورًا محوريًّا في البرمجة، والاستقراء في حقيقته كلّه عنها. فالنوع العودي يُعرَّف بتعريف عودي يقول كيف نُنشئ عناصر بيانات جديدة من عناصر سابقة، ويأتي مع كل نوع عودي تعريفٌ عودي للخصائص والدوال المعرَّفة عليه. والأهم من ذلك أن التعريف العودي يحمل معه طريقة استقراء بنيوي نبرهن بها أن كل بيانات النوع المعني تملك خاصية ما.</p>
<p>يعرض هذا الفصل أمثلة قليلة من أنواع البيانات العودية والدوال المعرَّفة عوديًّا عليها: سلاسل المحارف، وسلاسل الأقواس «المتوازنة»، والأعداد الصحيحة غير السالبة، والتعبيرات الحسابية، وألعاب اللاعبين اثنين ذات المعلومات التامّة. ويُبنى كل مثال على النمط نفسه: تعريف عودي للنوع، ثم تعريفات عودية للدوال عليه، ثم براهين بالاستقراء البنيوي تُثبت أن تلك التعريفات تفعل ما تُفترض فيها.</p>
<p>وتُختم هذه الأمثلة بأشجار البحث، وهي بنية بيانات شائعة الاستعمال تُدعم البحث الفعّال. نعرّفها بدورها نوعًا عوديًّا، ونستخرج منها إجراء بحث وإجراء إدراج، ونبرهن صحّتهما بالاستقراء البنيوي نفسه. وفي أثناء ذلك نرى كيف تُترجم مطالب عملية — كأن يبقى عمق الشجرة لوغاريتميًّا في حجمها — إلى تعريفات ومبرهنات دقيقة.</p>
<p>والفكرة الناظمة للفصل كلّه أن الاستقراء ليس ملحقًا بالبرمجة، بل هو الأداة الطبيعية للاستدلال على أنواع البيانات التي تُبنى بالتكرار، وهي الأنواع التي لا يكاد يخلو منها برنامج.</p>
<h2 id="محتوى-الفصل">محتوى الفصل</h2>
<ul>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-recursive-definitions-and-structural-induction">التعريفات العودية والاستقراء البنيوي</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-structural-induction">الاستقراء البنيوي</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-strings-of-matched-brackets">سلاسل الأقواس المتوافقة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-recursive-functions-on-nonnegative-integers">الدوال العودية على الأعداد الصحيحة غير السالبة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-some-standard-recursive-functions">بعض الدوال العودية القياسية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-ill-formed-function-definitions">تعريفات دوال غير سليمة الصياغة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-arithmetic-expressions">التعبيرات الحسابية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-evaluation-and-substitution">التقييم والتعويض في التعبيرات الحسابية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-games-as-a-recursive-data-type">الألعاب كنوع بيانات عودي</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-game-strategies">استراتيجيات اللعب</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-fundamental-theorem-for-win-lose-games">المبرهنة الأساسية لألعاب الفوز والخسارة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-search-trees">أشجار البحث</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-binary-branching">التفريع الثنائي</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-binary-trees">الأشجار الثنائية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-properties-of-recursive-trees">خصائص الأشجار العودية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-depth-versus-size">العمق مقابل الحجم</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-avl-trees">أشجار AVL</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-number-labels">العلامات العددية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-insertions-into-avl-trees">الإدراج في أشجار AVL</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch07-recursive-data-types/sec-induction-in-computer-science">الاستقراء في علوم الحاسوب</a></li>
</ul>
`,o={book:a,chapter:e,chapterTitle:r,slug:s,title:c,headings:i,html:t};export{a as book,e as chapter,r as chapterTitle,o as default,i as headings,t as html,s as slug,c as title};
