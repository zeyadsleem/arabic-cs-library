const o="kinney",n="tailwind",e="Tailwind CSS",i="tailwind-oxide",t="ما هو Oxide؟",r=[{depth:2,id:"مقارنة-بالطريقة-الأقدم",text:"مقارنة بالطريقة الأقدم"}],c=`<p><a href="https://medium.com/@bomber.marek/whats-tailwind-oxide-engine-the-next-evolution-of-tailwind-css-32e7ef8e19a1">Oxide</a> هو محرك Tailwind 4 عالي الأداء — إعادة كتابة كاملة كان مخططًا لها في الأصل لـ Tailwind 3.x.</p>
<ul>
<li><strong>مبني بـ Rust:</strong> الأجزاء الحرجة للأداء أُعيدت كتابتها من أجل السرعة</li>
<li><strong>مدعوم بـ Lightning CSS:</strong> محلّل/محوّل CSS سريع مبني بـ Rust (الاعتماد الوحيد)</li>
<li><strong>محلّل CSS مخصص:</strong> أسرع مرتين من PostCSS</li>
<li><strong>سلسلة أدوات موحّدة:</strong> <code>@import</code> مدمج، وبادئات البائعين، والتداخل، وتحويلات CSS الحديثة</li>
<li><strong>بلا تهيئة:</strong> يجد ملفات القوالب تلقائيًا</li>
<li><strong>تهيئة أولًا بـ CSS:</strong> استخدم <code>@theme</code> ومتغيّرات CSS بدلًا من JavaScript</li>
<li><strong>متغيّرات قابلة للتركيب:</strong> اجمع <code>group-*</code> و<code>peer-*</code> و<code>has-*</code> و<code>not-*</code></li>
<li><strong>CSS الحديث:</strong> طبقات تسلسل أصلية، و<code>@property</code>، و<code>color-mix()</code>، واستعلامات الحاويات</li>
<li><strong>إزالة الأدوات المهجورة:</strong> نُظّفت من v3</li>
<li><strong>قيم افتراضية متغيرة:</strong> يستخدم <code>border</code> و<code>ring</code> الآن <code>currentColor</code></li>
<li><strong>القوائم الآمنة:</strong> استخدم <code>@source inline()</code> في CSS (لا JavaScript)</li>
<li><strong>استبعاد صريح:</strong> <code>@source not inline()</code></li>
</ul>
<h2 id="مقارنة-بالطريقة-الأقدم">مقارنة بالطريقة الأقدم</h2>
<ul>
<li><strong>الأداء:</strong> بناءات كاملة أسرع 10 مرات (105ms مقابل 960ms)، وبناءات تزايدية أسرع 100 مرة</li>
<li><strong>تجربة المطوّر:</strong> كشف بلا تهيئة، وتهيئة أولًا بـ CSS (دون <code>tailwind.config.js</code>)</li>
<li><strong>سلسلة الأدوات:</strong> معالجة CSS مدمجة (دون حاجة إلى <code>postcss-import</code> أو <code>autoprefixer</code>)؛ وحزم PostCSS/CLI منفصلة</li>
<li><strong>CSS الحديث:</strong> <code>@layer</code> و<code>@property</code> و<code>color-mix()</code> واستعلامات الحاويات أصلية (دون حاجة إلى إضافة)</li>
<li><strong>المرونة:</strong> متغيّرات قابلة للتركيب لمحدّدات مركّبة</li>
<li><strong>كشف الأصناف:</strong> المسح النصي العادي نفسه، ولا يزال يتطلب أصنافًا ثابتة، لكنه تلقائي</li>
<li><strong>أُزيل/تغيّر:</strong> لا <code>corePlugins</code>، و<code>theme()</code> مهجورة، و<code>@apply</code> تتطلب <code>@reference</code>، و<code>@layer</code> ← <code>@utility</code>، وترتيب المتغيّرات من اليسار إلى اليمين (كان من اليمين إلى اليسار)</li>
<li><strong>دعم المتصفحات:</strong> يتطلب Safari 16.4+ وChrome 111+ وFirefox 128+ (كان لـ v3 دعم أوسع)</li>
</ul>
`,d={book:o,chapter:n,chapterTitle:e,slug:i,title:t,headings:r,html:c};export{o as book,n as chapter,e as chapterTitle,d as default,r as headings,c as html,i as slug,t as title};
