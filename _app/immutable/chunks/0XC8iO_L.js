const e="frontend-architecture",t="implementing",i="التنفيذ",n="exercise-6-entities",r="التمرين 6: الكيانات",d=[{depth:2,id:"resources",text:"الموارد"},{depth:2,id:"exercise-instructions",text:"تعليمات التمرين"},{depth:2,id:"ratings-entity-type",text:"نوع كيان التقييمات"},{depth:2,id:"transcript",text:"التفريغ النصي"}],o=`<p>الدرس 34 من 38 · التنفيذ · 2 دقيقة و57 ثانية</p>
<div class="lecture-video"><iframe src="https://player.vimeo.com/video/1007109771?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" title="التمرين 6: الكيانات — الفيديو الأصلي" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>
<p>الفيديو الأصلي باللغة الإنجليزية. إذا تعذّر تشغيله هنا، <a href="https://frontendatscale.com/courses/frontend-architecture/implementing/exercise-6-entities/" target="_blank" rel="noopener noreferrer">شاهده على موقع المؤلف</a>. التفريغ النصي العربي الكامل أدناه.</p>
   <h2 id="resources">الموارد</h2>
<ul>
<li><a href="https://github.com/Charca/fullsnack" target="_blank" rel="noopener noreferrer">مستودع المشروع</a>..... تحقق من ال <code>restaurant-entities</code> فرع.</li>
<li><a href="https://www.figma.com/design/cKot2kO0cg2PpR3QwgppXm/FullSnack-Spec?node-id=0-1&#x26;t=WZTyl5KhUdk21WtA-0" target="_blank" rel="noopener noreferrer">مواصفات Figma</a></li>
</ul>
<h2 id="exercise-instructions">تعليمات التمرين</h2>
<ol>
<li>إنشاء وظيفة &quot;جلب&quot; لجلب البيانات من <code>/reviews</code> نقطة النهاية.</li>
<li>إنشاء دالة في النموذج (على سبيل المثال. <code>getRatings()</code>) التي من شأنها جلب البيانات من نقاط النهاية اللازمة وسوف يعود أ <code>Ratings</code> الكيان (انظر نوع TypeScript أدناه.)</li>
<li>استخدم الدالة النموذجية لعرض البيانات في واجهة المستخدم.</li>
</ol>
<h2 id="ratings-entity-type">نوع كيان التقييمات</h2>
<pre tabindex="0" data-language="ts"><code class="language-ts"></code></pre>
<h2 id="transcript">التفريغ النصي</h2>
<p><bdi dir="ltr">[00:02]</bdi> في هذا التمرين، سنقوم بتنفيذ نموذج لكيان تصنيف المطاعم لدينا. هناك مكانان في وحدة المطعم حيث تظهر التقييمات والمراجعات. واحد في الأعلى حيث نحصل على ملخص صغير، ثم في الأسفل نحصل على معلومات أكثر اكتمالا حول جميع التقييمات والمراجعات.</p>
<p><bdi dir="ltr">[00:28]</bdi> نقطة النهاية التي نستدعيها للحصول على معلومات المطعم تعطينا أيضًا بيانات قسم ملخّص التقييمات. إنها نقطة معلومات المطعم: نأخذ منها مصفوفة تضم ثلاث مراجعات، ودرجة التقييم وعدد التقييمات. ولعرض بقية المراجعات، نستخدم نقطة نهاية المراجعات بإضافة المسار «/reviews». نحصل منها على مراجعات إضافية بالبنية نفسها التي رأيناها سابقًا.</p>
<p><bdi dir="ltr">[01:04]</bdi> الآن سيكون التمرين لك هو إنشاء دالة في النموذج يمكننا الاتصال بها للحصول على المعلومات لهذا القسم هنا. لن يشمل ذلك فقط قائمة المراجعات بالتنسيق المبسط، تلك التي نحصل عليها من نقطة النهاية هذه، ولكن أيضًا عدد التقييمات ودرجة التقييم الفعلية التي حصلنا عليها لهذا المطعم.</p>
<p><bdi dir="ltr">[01:29]</bdi> يمكنك استخدام هذا النوع كنقطة انطلاق. ستجد النوع أيضًا في وصف هذا الفيديو. أسمي هذا التقييم، ولدينا التصنيف، وهو الرقم بين واحد وخمسة، وعدد التقييمات، ومجموعة من المراجعات. مع كل هذه المعلومات، يمكننا تقديم هذا القسم هنا.</p>
<p><bdi dir="ltr">[01:57]</bdi> هناك ثلاثة أشياء يجب عليك القيام بها كجزء من هذا التمرين. الأول هو إنشاء دالة الجلب لجلب البيانات من نقطة نهاية المراجعات. والثاني هو إنشاء دالة النموذج الخاص بك التي يمكنك الاتصال بها، مثل &quot;الحصول على تقييمات&quot; أو &quot;الحصول على تقييمات المطعم&quot;، والتي ستأخذ معرف مطعمنا وتعطيك كائنًا في هذا التنسيق، ويحتمل تجميعه من نقاط نهاية متعددة. أخيرًا، استخدم دالة النموذج هذه في واجهة المستخدم.</p>
<p><bdi dir="ltr">[02:24]</bdi> بنفس الطريقة التي نستخدم بها الدالة لتقديم المعلومات هنا في الرأس، فأنت تريد استخدام هذه الوظيفة لتقديم بعض هذه المعلومات في مكون التصنيفات الموجود في أسفل هذه الصفحة.</p>
<p><bdi dir="ltr">[02:42]</bdi> هذا هو التمرين. يمكنك استخدام فرع كيانات المطاعم. ستجد أيضًا اسم الفرع في الوصف كنقطة انطلاق. سأراكم في الفيديو التالي حيث سأريكم حلي لهذا التمرين.</p>   
`,a={book:e,chapter:t,chapterTitle:i,slug:n,title:r,headings:d,html:o};export{e as book,t as chapter,i as chapterTitle,a as default,d as headings,o as html,n as slug,r as title};
