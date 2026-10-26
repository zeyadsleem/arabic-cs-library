const n="kinney",e="figma",i="Figma للمطوّرين",a="creating-a-callout-component",t="إنشاء مكوّن صندوق توضيحي (Callout)",s=[{depth:2,id:"ألوان-السطح-والحدود",text:"ألوان السطح والحدود"},{depth:2,id:"نصف-قطر-الحدود",text:"نصف قطر الحدود"},{depth:2,id:"استخدام-التخطيط-التلقائي",text:"استخدام التخطيط التلقائي"},{depth:2,id:"إعداد-الخصائص",text:"إعداد الخصائص"},{depth:2,id:"إخفاء-المتن-وإظهاره",text:"إخفاء المتن وإظهاره"},{depth:2,id:"إضافة-الأنماط-البديلة",text:"إضافة الأنماط البديلة"},{depth:2,id:"إضافات",text:"إضافات"}],r=`<p>لننظر في أخذ بعض المفاهيم التي تعلّمناها حتى الآن وإنشاء مكوّن <strong>Callout</strong> يمكننا استخدامه في تصميماتنا. وستبدو النتيجة النهائية <em>شيئًا</em> كهذا.</p>
<p><img src="/arabic-cs-library/images/kinney/bc3a717a1a862f17.webp" alt="مكوّن الصندوق التوضيحي مكتملًا"></p>
<h2 id="ألوان-السطح-والحدود">ألوان السطح والحدود</h2>
<p>سنبدأ بإطار أساسي، لكننا نريد أن نمنحه متغيّرَي الخلفية والحدود اللذين أعددناهما في قسم <a href="https://stevekinney.com/courses/figma/semantic-colors">الألوان الدلالية</a>.</p>
<p><img src="/arabic-cs-library/images/kinney/7359e1e0561d4e5a.webp" alt="أساسيات صندوق توضيحي في Figma بمتغيّرات ألواننا الدلالية"></p>
<h2 id="نصف-قطر-الحدود">نصف قطر الحدود</h2>
<p>بعد ذلك، سنُرفق <a href="https://stevekinney.com/courses/figma/number-variable-tokens">متغيّر نصف قطر الحدود</a>.</p>
<p><img src="/arabic-cs-library/images/kinney/bcacf3c9a8d02002.webp" alt="استخدام متغيّر Figma لنصف قطر الحدود"></p>
<h2 id="استخدام-التخطيط-التلقائي">استخدام التخطيط التلقائي</h2>
<p>سننتهي على الأرجح بتخطيطين تلقائيين.</p>
<ul>
<li>واحد بين الأيقونة والعنوان ونص المتن. وسيكون هذا المكوّن نفسه.</li>
<li>وآخر للأيقونة والعنوان.</li>
</ul>
<p>الضغط على <strong>Shift-A</strong> على المكوّن سيحوّله إلى إطار تخطيط تلقائي.</p>
<p>ومن هنا سنستخدم <a href="https://stevekinney.com/courses/figma/number-variable-tokens">متغيّرات التباعد</a> لضبط الحشو والفجوة في التخطيط التلقائي.</p>
<p><img src="/arabic-cs-library/images/kinney/b1dc54b98c93c51c.webp" alt="استخدام متغيّر لضبط الهامش الداخلي والفراغ في تخطيط تلقائي"></p>
<p>سنستخدم ذلك التباعد <strong>الطفيف</strong> بين الأيقونة والعنوان، ثم التباعد <strong>الأساسي</strong> لحشو الصندوق التوضيحي والمسافة بين العنوان والمتن.</p>
<p>أصبح لدينا الآن نقطة بداية جيدة لمكوّن الصندوق التوضيحي.</p>
<p><img src="/arabic-cs-library/images/kinney/fa3fb6407b65caaa.webp" alt="التخطيط الأساسي لمكوّن الصندوق التوضيحي"></p>
<p>أصبحنا جاهزين للمضي واختيار <strong>Create a component</strong>.</p>
<h2 id="إعداد-الخصائص">إعداد الخصائص</h2>
<p>سنريد إظهار بعض خصائص مكوّننا لجعل العمل معه أسهل.</p>
<p>لنُظهر الخصائص المتداخلة من <strong>Icon</strong>. انقر على <strong>+</strong> بجوار <strong>Properties</strong> واختر <strong>Expose properties from Nested Instances</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/4bbcd7334879a1b6.webp" alt="إظهار الخصائص من النسخ المتداخلة"></p>
<h2 id="إخفاء-المتن-وإظهاره">إخفاء المتن وإظهاره</h2>
<p>قد لا نريد دائمًا إظهار المتن. وفي هذه الحالة يمكننا ربطه بـ <a href="https://stevekinney.com/courses/figma/component-properties">خاصية مكوّن</a> منطقية لإنشاء مفتاح تشغيل وإيقاف.</p>
<p>على طبقة نص متن المكوّن، انقر على الأيقونة الصغيرة في أعلى اليمين.</p>
<p><img src="/arabic-cs-library/images/kinney/509d3ddd59792200.webp" alt="إنشاء خاصية منطقية"></p>
<p>ثم سترى نافذة تحتوي على معظم ما تريده جاهزًا.</p>
<p><img src="/arabic-cs-library/images/kinney/f15bd086986992d5.webp" alt="إنشاء خاصية منطقية لمتن الصندوق التوضيحي"></p>
<h2 id="إضافة-الأنماط-البديلة">إضافة الأنماط البديلة</h2>
<p>نريد الآن إضافة الأنماط البديلة التالية:</p>
<ul>
<li>Primary</li>
<li>Secondary</li>
<li>Success</li>
<li>Info</li>
<li>Warning</li>
<li>Danger</li>
</ul>
<p>يمكنك إنشاء <a href="https://stevekinney.com/courses/figma/variants">أنماط بديلة</a> تعدّل فيها الألوان وفق <a href="https://stevekinney.com/courses/figma/semantic-colors">الألوان الدلالية</a> التي أعددناها سابقًا. ويمكنك أيضًا المضي قدمًا وضبط أيقونة افتراضية لكل نمط — ويمكن تجاوز ذلك بالخصائص المتداخلة التي أعددناها سابقًا.</p>
<p><img src="/arabic-cs-library/images/kinney/57fa10ef8b4d5cd6.webp" alt="خصائص مكوّن الصندوق التوضيحي"></p>
<h2 id="إضافات">إضافات</h2>
<p>مراعاةً للوقت سنمضي قدمًا، لكن إن حدّثتك نفسك — أو إن حدّثتني أنا لاحقًا. يمكنك أن تأخذ مكوّنك وتطبّق ما يلي:</p>
<ul>
<li>نوعًا من تأثير الظل على الصندوق التوضيحي نفسه.</li>
<li>تطبيق <a href="https://stevekinney.com/courses/figma/typography">أنماط الطباعة</a> على العنوان والمتن.</li>
</ul>
`,p={book:n,chapter:e,chapterTitle:i,slug:a,title:t,headings:s,html:r};export{n as book,e as chapter,i as chapterTitle,p as default,s as headings,r as html,a as slug,t as title};
