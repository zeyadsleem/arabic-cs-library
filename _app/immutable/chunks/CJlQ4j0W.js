const e="kinney",p="full-stack-typescript",s="TypeScript للويب الكامل",n="generating-open-api-from-express",o="توليد OpenAPI من Express",t=[{depth:2,id:"فحص-مسارات-express-الموجودة",text:"فحص مسارات Express الموجودة"},{depth:2,id:"اختيار-أداة-توليد-openapi",text:"اختيار أداة توليد OpenAPI"}],r=`<p>إنشاء عقد OpenAPI من واجهة Express (API) موجودة يمكن أن يكون طريقة قيمة لتوثيق واجهتك، وتحسين التعاون، وتوليد حزم تطوير برامج (SDK) للعملاء. يُوضّح هذا الدليل خطوات توليد مواصفة OpenAPI من مسارات Express الموجودة.</p>
<h2 id="فحص-مسارات-express-الموجودة">فحص مسارات Express الموجودة</h2>
<p>قبل توليد عقد OpenAPI، افحص بعناية مسارات Express الموجودة. انتبه إلى:</p>
<ul>
<li><strong>النقاط (Endpoints):</strong> اسرد جميع نقاط API (مثلاً <code>/users</code>, <code>/products/{id}</code>).</li>
<li><strong>طرق HTTP:</strong> حدّد طرق HTTP المستخدمة لكل نقطة (مثلاً GET, POST, PUT, DELETE).</li>
<li><strong>مُعامِلات الطلب:</strong> لاحظ أي مُعامِلات مسار، أو مُعامِلات استعلام، أو هياكل جسم الطلب.</li>
<li><strong>هياكل الاستجابة:</strong> وثّق هياكل الاستجابة المتوقعة لكل نقطة.</li>
<li><strong>الرؤوس والكوكيز:</strong> حدّد أي رؤوس مخصّصة أو كوكيز مستخدمة في الطلبات أو الاستجابات.</li>
</ul>
<h2 id="اختيار-أداة-توليد-openapi">اختيار أداة توليد OpenAPI</h2>
<p>عدة أدوات يمكن أن تساعد في توليد عقود OpenAPI من واجهات Express (API) الموجودة. الخيارات الشائعة تشمل:</p>
<ul>
<li><strong><a href="https://www.npmjs.com/package/swagger-jsdoc"><code>swagger-jsdoc</code></a>:</strong> يُولّد مواصفات OpenAPI من تعليقات JSDoc في شيفرتك.</li>
<li><strong><a href="https://www.npmjs.com/package/express-openapi"><code>express-openapi</code></a>:</strong> يتيح لك تعريف واجهتك باستخدام ملف YAML أو JSON وربطه بمسارات Express.</li>
<li><strong><a href="https://www.npmjs.com/package/ts-node-dev"><code>ts-node-dev</code></a> و <a href="https://www.npmjs.com/package/openapi-typescript"><code>openapi-typescript</code></a>:</strong> عند دمجهما مع شيفرة ذات أنواع صحيحة، يمكنك توليد مواصفة openapi من شيفرة TypeScript الخاصة بك.</li>
<li><strong><a href="https://www.npmjs.com/package/openapi-express"><code>openapi-express</code></a>:</strong> يُولّد مواصفة openapi من خادم express قيد التشغيل.</li>
</ul>
`,i={book:e,chapter:p,chapterTitle:s,slug:n,title:o,headings:t,html:r};export{e as book,p as chapter,s as chapterTitle,i as default,t as headings,r as html,n as slug,o as title};
