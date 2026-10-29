---
title: "أنواع البيانات العودية"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# أنواع البيانات العودية

تؤدّي أنواع البيانات العودية دورًا محوريًّا في البرمجة، والاستقراء في حقيقته كلّه عنها. فالنوع العودي يُعرَّف بتعريف عودي يقول كيف نُنشئ عناصر بيانات جديدة من عناصر سابقة، ويأتي مع كل نوع عودي تعريفٌ عودي للخصائص والدوال المعرَّفة عليه. والأهم من ذلك أن التعريف العودي يحمل معه طريقة استقراء بنيوي نبرهن بها أن كل بيانات النوع المعني تملك خاصية ما.

يعرض هذا الفصل أمثلة قليلة من أنواع البيانات العودية والدوال المعرَّفة عوديًّا عليها: سلاسل المحارف، وسلاسل الأقواس «المتوازنة»، والأعداد الصحيحة غير السالبة، والتعبيرات الحسابية، وألعاب اللاعبين اثنين ذات المعلومات التامّة. ويُبنى كل مثال على النمط نفسه: تعريف عودي للنوع، ثم تعريفات عودية للدوال عليه، ثم براهين بالاستقراء البنيوي تُثبت أن تلك التعريفات تفعل ما تُفترض فيها.

وتُختم هذه الأمثلة بأشجار البحث، وهي بنية بيانات شائعة الاستعمال تُدعم البحث الفعّال. نعرّفها بدورها نوعًا عوديًّا، ونستخرج منها إجراء بحث وإجراء إدراج، ونبرهن صحّتهما بالاستقراء البنيوي نفسه. وفي أثناء ذلك نرى كيف تُترجم مطالب عملية — كأن يبقى عمق الشجرة لوغاريتميًّا في حجمها — إلى تعريفات ومبرهنات دقيقة.

والفكرة الناظمة للفصل كلّه أن الاستقراء ليس ملحقًا بالبرمجة، بل هو الأداة الطبيعية للاستدلال على أنواع البيانات التي تُبنى بالتكرار، وهي الأنواع التي لا يكاد يخلو منها برنامج.

## محتوى الفصل

- [التعريفات العودية والاستقراء البنيوي](/book/mathematics-for-cs/ch07-recursive-data-types/sec-recursive-definitions-and-structural-induction)
- [الاستقراء البنيوي](/book/mathematics-for-cs/ch07-recursive-data-types/sec-structural-induction)
- [سلاسل الأقواس المتوافقة](/book/mathematics-for-cs/ch07-recursive-data-types/sec-strings-of-matched-brackets)
- [الدوال العودية على الأعداد الصحيحة غير السالبة](/book/mathematics-for-cs/ch07-recursive-data-types/sec-recursive-functions-on-nonnegative-integers)
- [بعض الدوال العودية القياسية](/book/mathematics-for-cs/ch07-recursive-data-types/sec-some-standard-recursive-functions)
- [تعريفات دوال غير سليمة الصياغة](/book/mathematics-for-cs/ch07-recursive-data-types/sec-ill-formed-function-definitions)
- [التعبيرات الحسابية](/book/mathematics-for-cs/ch07-recursive-data-types/sec-arithmetic-expressions)
- [التقييم والتعويض في التعبيرات الحسابية](/book/mathematics-for-cs/ch07-recursive-data-types/sec-evaluation-and-substitution)
- [الألعاب كنوع بيانات عودي](/book/mathematics-for-cs/ch07-recursive-data-types/sec-games-as-a-recursive-data-type)
- [استراتيجيات اللعب](/book/mathematics-for-cs/ch07-recursive-data-types/sec-game-strategies)
- [المبرهنة الأساسية لألعاب الفوز والخسارة](/book/mathematics-for-cs/ch07-recursive-data-types/sec-fundamental-theorem-for-win-lose-games)
- [أشجار البحث](/book/mathematics-for-cs/ch07-recursive-data-types/sec-search-trees)
- [التفريع الثنائي](/book/mathematics-for-cs/ch07-recursive-data-types/sec-binary-branching)
- [الأشجار الثنائية](/book/mathematics-for-cs/ch07-recursive-data-types/sec-binary-trees)
- [خصائص الأشجار العودية](/book/mathematics-for-cs/ch07-recursive-data-types/sec-properties-of-recursive-trees)
- [العمق مقابل الحجم](/book/mathematics-for-cs/ch07-recursive-data-types/sec-depth-versus-size)
- [أشجار AVL](/book/mathematics-for-cs/ch07-recursive-data-types/sec-avl-trees)
- [العلامات العددية](/book/mathematics-for-cs/ch07-recursive-data-types/sec-number-labels)
- [الإدراج في أشجار AVL](/book/mathematics-for-cs/ch07-recursive-data-types/sec-insertions-into-avl-trees)
- [الاستقراء في علوم الحاسوب](/book/mathematics-for-cs/ch07-recursive-data-types/sec-induction-in-computer-science)
