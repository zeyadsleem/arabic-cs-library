const n="kinney",a="figma",e="Figma للمطوّرين",s="component-properties",i="خصائص المكوّن",t=[{depth:2,id:"الخصائص-المنطقية",text:"الخصائص المنطقية"},{depth:2,id:"الخصائص-النصية",text:"الخصائص النصية"},{depth:2,id:"تبديل-النسخة-instance-swap",text:"تبديل النسخة (Instance Swap)"},{depth:2,id:"تبسيط-نسخ-المكونات",text:"تبسيط نسخ المكوّنات"}],p=`<p>في Figma، هناك أربعة أنواع لخصائص المكوّن:</p>
<ul>
<li><a href="https://stevekinney.com/courses/figma/variants">الأنماط البديلة (Variants)</a></li>
<li><a href="#boolean-properties">منطقية (Boolean)</a></li>
<li><a href="#simplifying-component-instances">تبديل النسخة (Instance Swap)</a></li>
<li><a href="#text-properties">نصية (Text)</a></li>
</ul>
<blockquote>
<p><strong>خصائص المكوّن مقابل المتغيّرات</strong></p>
<p>من السهل الالتباس بين خصائص المكوّن والمتغيّرات. وبالنسبة إليّ، من المفيد أن أفكّر في خصائص المكوّن على أنها الخاصية التي قد تمرّرها إلى مكوّن وتستخدمها محليًا، مقابل متغيّر مخزّن عالميًا.</p>
</blockquote>
<h2 id="الخصائص-المنطقية">الخصائص المنطقية <span class="content-anchor" id="boolean-properties"></span></h2>
<p>الخصائص المنطقية تضبط القيم <code>true</code> و<code>false</code>. وهذا يتيح لنا تشغيل خاصية أو إيقافها. لنفترض أن لدينا مكوّن شارة (badge) وأردنا إضافة القدرة على إضافة وسم (hash tag) إلى الشارة — وأردنا أن يكون شيئًا يمكننا تشغيله وإيقافه.</p>
<p><img src="/arabic-cs-library/images/kinney/1db95f27b72c840f.webp" alt="مثال على مكوّن شارة ووسم"></p>
<p>يمكننا البدء بإنشاء خاصية مكوّن منطقية من <strong>Properties</strong> في اللوحة اليسرى.</p>
<p><img src="/arabic-cs-library/images/kinney/65f41b5ca5d833e5.webp" alt="إنشاء خاصية مكوّن جديدة"></p>
<p>ومن هناك يمكننا إعطاءها قيمة افتراضية — وقد خمّنتها — هي <code>true</code> أو <code>false</code>، مع اسم مناسب للخاصية.</p>
<p><img src="/arabic-cs-library/images/kinney/0f865ddfee41e455.webp" alt="الخصائص عند إنشاء مكوّن جديد في Figma"></p>
<p>ثم يمكننا الانتقال إلى الطبقة التي نريد تفعيلها بهذه الخاصية وربط ظهورها بخاصية المكوّن.</p>
<p><img src="/arabic-cs-library/images/kinney/239b9aa7b749c3fc.webp" alt="ربط ظهور طبقة بخاصية مكوّن"></p>
<p>الآن، عندما نستخدم نسخة من ذلك المكوّن، سنرى أن لدينا القدرة على تشغيل خاصية المكوّن وإيقافها.</p>
<p><img src="/arabic-cs-library/images/kinney/2894c304d9e79825.gif" alt="تشغيل ظهور طبقة وإيقافه بناءً على خاصية مكوّن"></p>
<h2 id="الخصائص-النصية">الخصائص النصية <span class="content-anchor" id="text-properties"></span></h2>
<p>يمكننا أيضًا إنشاء خصائص مكوّن ذات قيمة نصية. وهناك سببان رئيسيان قد يدفعانك إلى التفكير في استخدامها:</p>
<ol>
<li>تريد تغيير النص في مكوّن معيّن بسهولة دون الحاجة إلى التعمّق في طبقات المكوّن.</li>
<li>تريد استخدام النص نفسه في عدة مواضع.</li>
</ol>
<p>السبب الأول هو الأكثر شيوعًا على الأرجح، لكن السبب الثاني قد يكون مفيدًا إذا كنت تسعى إلى شيء أكثر براعة مع أنماط مكوّنك البديلة وتريد استخدام التسمية نفسها في أكثر من موضع.</p>
<p><img src="/arabic-cs-library/images/kinney/20db1a9cd2a20ad9.webp" alt="خاصية نصية للمكوّنات"></p>
<p>يمكننا بعد ذلك ضبط قيمة أي حقل نصي على هذه الخاصية في لوحة <strong>Text</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/85a4794a777b1212.webp" alt="ضبط خاصية نصية على مكوّن"></p>
<p>الآن يمكنك تغيير قيمة الخاصية النصية بسهولة بمجرد النقر على نسخة المكوّن.</p>
<p><img src="/arabic-cs-library/images/kinney/00bf89a688eb8bf9.gif" alt="تغيير خاصية نصية في مكوّن"></p>
<h2 id="تبديل-النسخة-instance-swap">تبديل النسخة (Instance Swap) <span class="content-anchor" id="instance-swap"></span></h2>
<p>تتيح لك خاصية <strong>instance swap</strong> استبدال مكوّن معيّن بآخر. وعند تعريف هذه الخاصية، تحدّد قيمة نسخة افتراضية. ويمكنك أيضًا تعريف بعض التفضيلات للمكوّنات الأخرى التي تهتم بالتبديل بينها.</p>
<p>تتيح لك <strong>preferred values</strong> هذه تعريف مجموعة من المكوّنات التي تريد التبديل بينها. وإن كان هذا يبدو نوعًا ما مثل <a href="https://stevekinney.com/courses/figma/variants">الأنماط البديلة</a>، فأنت محق. وعادةً أستخدم مزيجًا من المقاربتين عندما أنشئ مكوّنات لتصميم ما.</p>
<blockquote>
<p><strong>الأنماط البديلة مقابل تبديل النسخة</strong></p>
<p>قد تختلف تجربتك، ولك مطلق الحرية في أن تخالفني، لكنني عادةً أصنع <a href="https://stevekinney.com/courses/figma/variants">الأنماط البديلة</a> لكل حالات الزر المختلفة (مثل hover وactive وdisabled وما إلى ذلك). لكنني أصنع مكوّنات مختلفة لكل نوع من الأزرار (مثل primary وsecondary وghost وما إلى ذلك). وهذا يتيح لي التبديل بين الحالات بـ <a href="https://stevekinney.com/courses/figma/variants">الأنماط البديلة</a> عند <a href="https://stevekinney.com/courses/figma/prototyping">النمذجة الأولية (prototyping)</a>، و<a href="#instance-swap">تبديل النسخة</a> بسهولة بين الأنواع عند التصميم. وحشر <em>كل شيء</em> في الأنماط البديلة يجعل التنظيم فوضى.</p>
</blockquote>
<h2 id="تبسيط-نسخ-المكونات">تبسيط نسخ المكوّنات <span class="content-anchor" id="simplifying-component-instances"></span></h2>
<p>إذا كنت تريد إخفاء معظم تعقيدات المكوّن عن أي شخص يستخدمه، فيمكنك الذهاب إلى المكوّن الرئيسي واختيار «Simplify all instances». وهذا يقلّل عدد المقابض التي يستطيع أحدهم (أو يجب عليه) العبث بها، ويتيح لك إبقاء الأمور <em>بسيطة</em>.</p>
<blockquote>
<p><strong>التبسيط لن يحميك</strong></p>
<p>تبسيط نسخة سيخفي الطبقات، لكن <strong>أي شخص لديه صلاحية التحرير</strong> في ملف التصميم سيظل قادرًا على تحرير تلك الطبقات.</p>
</blockquote>
<p><img src="/arabic-cs-library/images/kinney/b1c1406cc771421a.gif" alt="تبسيط نسخ المكوّنات"></p>
<p>لنتحدّث بعد ذلك عن <a href="https://stevekinney.com/courses/figma/variants">الأنماط البديلة</a>.</p>
`,r={book:n,chapter:a,chapterTitle:e,slug:s,title:i,headings:t,html:p};export{n as book,a as chapter,e as chapterTitle,r as default,t as headings,p as html,s as slug,i as title};
