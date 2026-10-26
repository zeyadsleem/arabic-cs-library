const n="kinney",o="figma",t="Figma للمطوّرين",i="generating-a-color-palette",r="توليد لوحة ألوان",a=[{depth:2,id:"توليد-متغيرات-الألوان",text:"توليد متغيّرات الألوان"},{depth:2,id:"تمرين",text:"تمرين"},{depth:2,id:"استخدام-الألوان-في-الشيفرة",text:"استخدام الألوان في الشيفرة"}],e=`<blockquote>
<p><strong>ابتكار لوحة ألوان</strong></p>
<p>نظرية الألوان خارج قليلًا عن الموضوعات التي سنغطّيها اليوم، لكنني أردت أن أرشدك إلى بعض الأدوات التي أستخدمها عندما أحاول ابتكار لوحة ألوان. <strong>إخلاء مسؤولية</strong>: أنا مهندس و<em>لست</em> مصمّمًا.</p>
<ul>
<li><a href="http://uicolors.app/">UIColors.app</a></li>
<li><a href="https://coolors.co/">Coolors</a></li>
<li><a href="https://paletton.com/">Paletton</a></li>
</ul>
</blockquote>
<p>هناك تقنيتان أساسيتان — بل واحدة ونصف في الحقيقة — لإنشاء لوحة ألوان:</p>
<ul>
<li>خُذ بعض الرموز غير الدلالية (non-semantic tokens) ثم اشتقّ ألوانك الدلالية منها.</li>
<li>تجاوز تلك الخطوة واذهب مباشرة إلى بعض الألوان الدلالية.</li>
</ul>
<p>وعلى مدى زمني طويل بما يكفي، سينتهي بك الأمر على الأرجح إلى استخدام الكثير من الألوان المختلفة في تطبيقك، لذا من المنطقي أن تتبع المقاربة الأولى، لكنك تريد دائمًا أن تنتهي إلى شيء أقرب إلى الثانية.</p>
<blockquote>
<p><strong>الحجّة لصالح الألوان الدلالية</strong></p>
<p>إليك <strong>تمرين ذهني</strong>: لنفترض أن علامة شركتك التجارية لون أحمر من نوع ما. لذا تستخدم <code>red</code> في كل أنحاء شيفرتك وتصميماتك. ثم تقرّر السلطات المؤسسية إعادة بناء العلامة أو يحدث نوع من الاندماج أو الاستحواذ. ستكون أكثر سعادة كشخص أو كفريق إذا استخدمت <code>brand</code> أو <code>primary</code> بدلًا من <code>red</code> في كل مكان. وينطبق الأمر نفسه على حالات مثل النجاح والخطأ والمعلومات والخطر.</p>
</blockquote>
<p>أبدأ عادةً بالألوان الدلالية التالية:</p>
<ul>
<li><strong>المعلومات (Information)</strong>: يُعبَّر عنها غالبًا بلون أزرق يدل على الوضوح والهدوء.</li>
<li><strong>النجاح (Success)</strong>: يُستخدم الأخضر عادةً، وهو يوحي بالأمان و«المضيّ قدمًا».</li>
<li><strong>التحذير (Warning)</strong>: البرتقالي أو الأصفر، للدلالة على الحذر دون خطر وشيك.</li>
<li><strong>المعلومات/الإجراءات الخطرة (Dangerous Information/Actions)</strong>: الأحمر، لأنه يشير عالميًا إلى التوقّف أو الخطأ.</li>
</ul>
<h2 id="توليد-متغيرات-الألوان">توليد متغيّرات الألوان</h2>
<p>هناك <em>الكثير</em> من الأدوات لتوليد لوحة ألوان. ويعجبني حقًا <a href="https://uicolors.app/">uicolors.app</a>. فلديهم <a href="https://www.figma.com/community/plugin/1242548152689430610/tailwind-css-color-generator">إضافة رائعة حقًا لـ Figma</a> تتيح لك توليد لوحة ألوان تتوافق مع دلالات <a href="https://tailwindcss.com/">Tailwind</a>. ولست مضطرًا لاستخدام Tailwind كي تستعملها. إنها بالتأكيد نقطة انطلاق جيدة للبدء.</p>
<p><img src="/arabic-cs-library/images/kinney/13998371ea9c453a.webp" alt="مولّد ألوان Tailwind CSS"></p>
<p>وكما ترى، تُنشئ فورًا <a href="https://stevekinney.com/courses/figma/styles">الأنماط</a> و<a href="https://stevekinney.com/courses/figma/variables">المتغيّرات</a> في أثناء ذلك. ويمكنك أيضًا تحديد <strong>Generate a color guide</strong> لإنشاء مكوّن يتيح لك رؤية لوحة ألوانك بسهولة.</p>
<h2 id="تمرين">تمرين</h2>
<p>لنولّد لوحة ألوان بالألوان الدلالية التالية:</p>
<ul>
<li><strong>Primary</strong></li>
<li><strong>Success</strong></li>
<li><strong>Information</strong></li>
<li><strong>Warning</strong></li>
<li><strong>Danger</strong></li>
</ul>
<p>واختياريًا، يمكنك إنشاء مجموعة ألوان <strong>Neutral</strong> و<strong>Secondary</strong>. استخدم إطارًا (frame) و<a href="https://stevekinney.com/courses/figma/auto-layout">التخطيط التلقائي (auto layout)</a> لإنشاء دليل أنماط لرموزك. وينبغي أن يبدو على نحو ما يلي.</p>
<p><img src="/arabic-cs-library/images/kinney/d65a9470e22b6263.webp" alt="لوحة ألوان مولَّدة باستخدام وظيفة Tailwind CSS Color Generator"></p>
<h2 id="استخدام-الألوان-في-الشيفرة">استخدام الألوان في الشيفرة</h2>
<p>يمكنك ربط هذه الألوان بـ <a href="https://stevekinney.com/courses/figma/dev-mode">dev-mode</a> أو تصدير المتغيّرات، لكن يمكنك أيضًا استخدام <a href="https://uicolors.app/"><strong>UI Colors</strong></a> لإنشاء سمة Tailwind أو متغيّرات CSS تستخدمها في شيفرتك الفعلية.</p>
<p><img src="/arabic-cs-library/images/kinney/85fbe4e0e0734659.webp" alt="موقع UIColors.app"></p>
<p>النقر على <strong>Export</strong> يسهّل الحصول على أنماطك كشيفرة بالصيغة التي تحتاجها.</p>
<p><img src="/arabic-cs-library/images/kinney/7b354fc736db8b61.webp" alt="تصدير الألوان من UIColors.app"></p>
<p>وهناك أيضًا عدد من الأدوات الأخرى التي يمكنك استخدامها لإخراج متغيّراتك من Figma.</p>
<ul>
<li><a href="https://www.figma.com/community/plugin/1264267851877180830">Token Variable Export</a></li>
<li><a href="https://www.figma.com/community/plugin/1260472771849439434">Advanced Variable Export</a></li>
</ul>
`,s={book:n,chapter:o,chapterTitle:t,slug:i,title:r,headings:a,html:e};export{n as book,o as chapter,t as chapterTitle,s as default,a as headings,e as html,i as slug,r as title};
