---
title: "الرسوم البسيطة"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# الرسوم البسيطة

تصوّر الرسوم البسيطة العلاقات المتناظرة، أي العلاقات المتبادلة. ومن أمثلة هذه العلاقات المتبادلة أن يكون شخصان متزوّجين، أو يتحدّثا اللغة نفسها، أو لا يتحدّثا اللغة نفسها، أو تقع أحداثهما في فترات زمنية متداخلة، أو يكونا موصولين بسلك ناقل. وتظهر هذه الرسوم في شتّى التطبيقات، منها الجدولة وإرضاء القيود ورسوميات الحاسوب والاتصالات، لكننا سنبدأ بتطبيق مصمَّم ليستلف انتباهك: سنُجري تحقيقًا مهنيًّا في السلوك الجنسي. وبالتحديد، سننظر في بعض البيانات عن أيّ الجنسين لديه في المتوسط شركاء من الجنس الآخر أكثر: الرجال أم النساء.

كانت الديموغرافيا الجنسية موضوعًا لكثير من الدراسات. ففي واحدة من أكبر هذه الدراسات، أجرى باحثون من جامعة شيكاغو مقابلات مع عيّنة عشوائية من ٢٥٠٠ شخص على مدى سنوات عدة، محاولين الإجابة عن هذا السؤال. وقد وجدت دراستهم، التي نُشرت عام ١٩٩٤ تحت عنوان *The Social Organization of Sexuality*، أن للرجال في المتوسط شركاء من الجنس الآخر أكثر بنسبة ٧٤٪ مما للنساء.

وقد وجدت دراسات أخرى أن الفجوة أكبر من ذلك. وعلى وجه الخصوص، ادّعت ABC News أن للرجل المتوسط ٢٠ شريكًا في حياته، وللمرأة المتوسطة ٦، أي فجوة نسبتها ٢٣٣٪. وكانت دراسة ABC News، التي بُثّت في برنامج Primetime Live عام ٢٠٠٤، تدّعي أنها من أكثر الدراسات علمية على الإطلاق، بهامش خطأ لا يتجاوز ٢.٥٪. وقد سُمّيت «American Sex Survey: A peek between the sheets»، وهو عنوان يثير بعض الأسئلة عن جدّية تقريرهم.

ثم مرة أخرى في أغسطس ٢٠٠٧، نقلت صحيفة *New York Times* دراسة أجراها المركز الوطني لإحصاءات الصحة التابع للحكومة الأمريكية، أظهرت أن للرجال سبعة شركاء وللنساء أربعة. فأي هذه الأرقام تراها أدقّ: أرقام جامعة شيكاغو، أم ABC News، أم المركز الوطني؟

لا تُجب — فهذا سؤال مخادع مصمَّم ليوقعك في الفخ. فباستعمال قليل من نظرية المخططات سنشرح لماذا لا يمكن أن تكون أي من هذه النتائج قريبة من الحقيقة بأي حال.

## محتوى الفصل

- [تجاور الرؤوس ودرجاتها](/book/mathematics-for-cs/ch12-simple-graphs/sec-vertex-adjacency-and-degrees)
- [الديموغرافيا الجنسية في أمريكا](/book/mathematics-for-cs/ch12-simple-graphs/sec-sexual-demographics-in-america)
- [بعض الرسوم الشائعة](/book/mathematics-for-cs/ch12-simple-graphs/sec-some-common-graphs)
- [التماثل الشكلي](/book/mathematics-for-cs/ch12-simple-graphs/sec-isomorphism)
- [الرسوم ثنائية التجزئة والمطابقات](/book/mathematics-for-cs/ch12-simple-graphs/sec-bipartite-graphs-and-matchings)
- [التلوين](/book/mathematics-for-cs/ch12-simple-graphs/sec-coloring)
- [المشي في الرسوم البسيطة](/book/mathematics-for-cs/ch12-simple-graphs/sec-walks-in-simple-graphs)
- [الاتصال](/book/mathematics-for-cs/ch12-simple-graphs/sec-connectivity)
- [المسارات والجولات الخاصة](/book/mathematics-for-cs/ch12-simple-graphs/sec-special-walks-and-tours)
- [الرسوم ذات الاتصال k](/book/mathematics-for-cs/ch12-simple-graphs/sec-k-connected-graphs)
- [الغابات والأشجار](/book/mathematics-for-cs/ch12-simple-graphs/sec-forests-and-trees)
- [المراجع](/book/mathematics-for-cs/ch12-simple-graphs/sec-references)
