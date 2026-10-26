const n="kinney",e="figma",p="Figma للمطوّرين",a="building-a-checkbox-component",t="بناء مكوّن مربّع اختيار",i=[{depth:2,id:"توسيع-المكون",text:"توسيع المكوّن"}],s=`<blockquote>
<p><strong>الحل</strong></p>
<p>هذا هو حلّ التمرين في قسم <a href="https://stevekinney.com/courses/figma/interactive-components">المكوّنات التفاعلية</a>.</p>
</blockquote>
<p>لنبدأ بإعداد بعض متغيّرات الألوان. لقد تخلّيت منذ زمن طويل عن محاولة الحصول على أصغر مجموعة متغيّرات ألوان ممكنة بشريًا. وأنا الآن أستهدف أصغر مجموعة <em>ممكنة عمليًا</em>. لذا، سأصنع على الأرجح متغيّرين لألوان خلفية مربّع الاختيار.</p>
<p><img src="/arabic-cs-library/images/kinney/ede35292cd48ac63.webp" alt="متغيّرات جديدة لخلفية مربّع الاختيار"></p>
<p>سأصنع بضعة تنويعات:</p>
<ul>
<li><strong>Checked</strong> إما true أو false.</li>
<li><strong>Focused</strong> إما true أو false.</li>
</ul>
<p>سينتهي بي الأمر إلى شيء كهذا.</p>
<p><img src="/arabic-cs-library/images/kinney/26c10435026f8671.webp" alt="حالات مربّع الاختيار"></p>
<p>والآن، نريد إنشاء مجموعة مكوّنات. ولأنني أحسنت التسمية، ينبغي أن نحصل على قدر جيد من ذلك مجانًا هنا.</p>
<p><img src="/arabic-cs-library/images/kinney/ef758900a783f46d.webp" alt="الأنماط البديلة لمكوّن مربّع الاختيار في Figma"></p>
<p>بعد ذلك، نريد إضافة تفاعل إلى المكوّن.</p>
<p>لو أردت، يمكنك محاولة محاكاة حالة التركيز بانتقال عند المرور بالمؤشّر، لكن ذلك يبدو متكلَّفًا قليلًا، لذا لن أفعل.</p>
<p>يمكنك رؤيته أثناء العمل <a href="https://www.figma.com/proto/k2WU0bJ53LG4Kl6hoBCITR/Curricula-Components?page-id=0%3A1&amp;type=design&amp;node-id=22-1009&amp;viewport=-5532%2C-4146%2C5.6&amp;t=AyXsLsPZMzFZrDNN-1&amp;scaling=min-zoom&amp;mode=design">هنا</a>.</p>
<h2 id="توسيع-المكون">توسيع المكوّن</h2>
<p>بعد ذلك، سنوسّع مربّع الاختيار لدينا ليصبح عنصر قائمة مهام. هذا ليس شيئًا لم نره من قبل. نحتاج فقط إلى إنشاء مكوّن يحوي أيضًا بعض النص و<a href="https://stevekinney.com/courses/figma/auto-layout">التخطيط التلقائي</a>.</p>
<p><img src="/arabic-cs-library/images/kinney/4cc46c505f83cdf2.webp" alt="مكوّن عنصر قائمة المهام"></p>
<p><strong>المشكلة</strong> في هذا المكوّن أن مربّع الاختيار وحده هو التفاعلي. نريد أن نجعل النقر على العنصر نفسه تفاعليًا.</p>
<p>بدلًا من ذلك، نحتاج إلى فعل شيء مشابه لمكوّن مربّع الاختيار وإنشاء نمطين بديلين وربط تفاعلاتهما. و<strong>الخبر السار</strong> أننا <em>ما زلنا</em> نرث من مكوّن <strong>Checkbox</strong> من حيث النمط. لكنني لم أجد طريقة جيدة لتمرير خصائص المكوّن.</p>
<p><img src="/arabic-cs-library/images/kinney/9ad1abc7c4e0e8db.webp" alt="الأنماط البديلة لمكوّن عنصر قائمة المهام"></p>
<p>الآن، الأمر المنطقي التالي هو إنشاء مكوّن قائمة مهام يحوي عدة عناصر قائمة مهام. لكن لذلك، سنحتاج إلى الاستفادة من تقنية تُسمّى <a href="https://stevekinney.com/courses/figma/cropped-grid-components">مكوّنات الشبكة المقصوصة</a>.</p>
`,o={book:n,chapter:e,chapterTitle:p,slug:a,title:t,headings:i,html:s};export{n as book,e as chapter,p as chapterTitle,o as default,i as headings,s as html,a as slug,t as title};
