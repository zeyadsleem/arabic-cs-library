const i="mathematics-for-cs",a="ch08-infinite-sets",s="المجموعات غير المنتهية",e="index",c="المجموعات غير المنتهية",t=[{depth:2,id:"محتوى-الفصل",text:"محتوى الفصل"}],r=`<h1>المجموعات غير المنتهية</h1>
<p>هذا الفصل عن المجموعات غير المنتهية، وعن بعض ما يعترض البرهان عليها من صعوبات. ومهلًا! لماذا نطرح اللانهاية في كتاب في رياضيات علوم الحاسوب؟ فكل مجموعة بيانات في حاسوب محدودة بحجم ذاكرة الحاسوب، وحجم الذاكرة الممكن محدود بدوره، لسبب بسيط هو أن الكون محدود (أو يبدو محدودًا على الأقل). فلماذا لا نكتفي بمجموعات منتهية ذات حجم كبير لكن محدود؟ هذا سؤال وجيه، لكن دعنا نحاول أن نقنعك بأن التعامل مع المجموعات غير المنتهية أمر لا مفرّ منه.</p>
<p>قد لا تكون لاحظت ذلك، لكنك قبلت حتى الآن الاستعمال المألوف للأعداد الصحيحة والأعداد الجذرية والأعداد الصمّاء ومتتالياتها. وكل هذه مجموعات غير منتهية. ثم هل تريد حقًّا أن تتخلّى الفيزياء أو بقية العلوم عن الأعداد الحقيقية بحجّة أنه لا يمكن إجراء إلا عدد محدود من القياسات المحدودة في كون محدود؟ إن تجاهل هذه الحدود الكبيرة وغير المؤكّدة (ويبدو أن الكون آخذ في الاتّساع طوال الوقت) وقبول نظريات تستعمل الأعداد الحقيقية أمر مقنع جدًّا — وأبسط بكثير.</p>
<p>وكذلك في علوم الحاسوب: من غير المعقول أن يكون كتابة برنامج يجمع أعدادًا صحيحة غير سالبة بعدد من الأرقام يساوي مثلًا عدد نجوم السماء — تريليونات المجرّات وفي كل منها مليارات النجوم — عملًا مختلفًا عن كتابة برنامج يجمع أي عددين صحيحين، مهما كان عدد أرقامهما. والأمر نفسه في تصميم مترجم: ليس مفيدًا ولا معقولًا أن نستفيد من أن عدد البرامج التي ستُترجم في كون محدود عدد محدود.</p>
<p>وتوفّر المجموعات غير المنتهية أيضًا مجالًا جيّدًا للتمرّن على طرق البرهان، لأن تسلّل خطوة غير مبرَّرة تحت ستار الحدس أصعب فيها. وقد أسفرت دراسة المجموعات غير المنتهية عن نتيجة مذهلة حقًّا: فقد أدّت هذه الدراسة إلى اكتشاف حدود منطقية أساسية لما يمكن للحواسيب أن تفعله. فمثلًا سنستعمل في القسم ٨.٢ استدلالًا طُوِّر من أجل المجموعات غير المنتهية لنبرهن أنه لا يمكن أن يوجد مدقّق أنواع كامل للغة برمجة. لذا نطلب منك في هذا الفصل أن تتجرّع الأمر المرّ وتبدأ التعلّم على التعامل مع اللانهاية.</p>
<h2 id="محتوى-الفصل">محتوى الفصل</h2>
<ul>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-infinite-cardinality">العددية غير المنتهية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-infinity-is-different">اللانهاية مختلفة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-countable-sets">المجموعات القابلة للعدّ</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-power-sets-strictly-bigger">مجموعات القوى أكبر تمامًا</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-more-countable-and-uncountable-sets">المزيد من المجموعات القابلة للعدّ وغير القابلة للعدّ</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-diagonal-argument">الحجّة القُطرية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-the-halting-problem">مسألة التوقّف</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-logic-of-sets">منطق المجموعات</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-zfc-axioms">مسلّمات ZFC للمجموعات</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-avoiding-russells-paradox">تجنّب مفارقة راسل</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-does-all-this-really-work">هل يعمل كل هذا حقًّا؟</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch08-infinite-sets/sec-large-infinities-in-computer-science">اللانهايات الكبرى في علوم الحاسوب</a></li>
</ul>
`,n={book:i,chapter:a,chapterTitle:s,slug:e,title:c,headings:t,html:r};export{i as book,a as chapter,s as chapterTitle,n as default,t as headings,r as html,e as slug,c as title};
