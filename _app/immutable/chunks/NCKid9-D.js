const t="kinney",i="aws",n="نشر تطبيقات الويب على AWS",o="full-static-pipeline",e="خط أنابيب الموقع الثابت الكامل",s=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"يبني-على",text:"يبني على"},{depth:2,id:"المعمارية",text:"المعمارية"},{depth:2,id:"ترتيب-العمليات",text:"ترتيب العمليات"},{depth:3,id:"إنشاء-حاوية-s3",text:"إنشاء حاوية S3"},{depth:3,id:"إنشاء-توزيع-cloudfront-مع-oac",text:"إنشاء توزيع CloudFront مع OAC"},{depth:2,id:"لماذا-هذا-الترتيب",text:"لماذا هذا الترتيب"},{depth:2,id:"صلاحيات-iam-التي-تجعله-يعمل",text:"صلاحيات IAM التي تجعله يعمل"},{depth:2,id:"ما-تفعله-كل-خدمة-وقت-التشغيل",text:"ما تفعله كل خدمة وقت التشغيل"},{depth:2,id:"سير-عمل-النشر",text:"سير عمل النشر"},{depth:2,id:"التحقق",text:"التحقق"},{depth:2,id:"أنماط-الفشل-الشائعة",text:"أنماط الفشل الشائعة"},{depth:2,id:"ما-بعد-هذه-الدورة-النشر-المستمر",text:"ما بعد هذه الدورة: النشر المستمر"}],r=`<p>تخيّل شخصًا يفتح رابطًا إلى موقعك ليتحقّق مما إذا كانت معدات التخييم الربيعية الجديدة متاحة بعد. لا يهمّه أن متجرك في الحقيقة حاوية S3 خاصة خلف CloudFront. ما يهمّه أن الصفحة تُحمَّل بسرعة، وتستخدم HTTPS، ولا تنهار عندما يُحدّث مسارًا عميقًا. وتلك السباكة غير المرئية هي خط الأنابيب الذي تبنيه الآن.</p>
<p>لقد أمضيت قوس الاستضافة الثابتة المبكّر في تعلّم خدمات AWS الفردية. تستطيع إنشاء حاوية S3، وضبط توزيع CloudFront، وتقييده بالتحكم في الوصول إلى الأصل. وكل قطعة تعمل بمفردها. لكن القيمة في كيفية تركيبها: يصل الطلب إلى CloudFront، فيقدّم CloudFront محتوى مخزّنًا مؤقتًا من S3 عبر HTTPS، ويكلّف الأمر كله بنسات. هذا هو خط الأنابيب. ويرسم هذا الدرس المعمارية من طرف إلى طرف ويشرح ترتيب العمليات: ما تنشئه أولًا، وما يعتمد على ما، ولماذا.</p>
<p>وإن أردت كتل البناء المعتمدة من AWS مفتوحة إلى جانب هذا الدرس، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html">درس موقع S3 الثابت</a> و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html">دليل OAC في CloudFront</a> قريبين.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>هذه أول لحظة تتوقّف فيها الدورة عن كونها «حفنة من خدمات AWS صرت تعرفها معرفة غامضة» وتصبح «نشرًا يمكنك شحنه فعلًا». فإن فهمت هذا التدفق، فلكل وحدة لاحقة مكان تتعلّق به. فـ Lambda يضيف حوسبة إلى الواجهة الأمامية نفسها. وAPI Gateway يضيف حافة HTTP إلى النطاق نفسه. وDynamoDB يضيف حالة إلى التطبيق نفسه. فهذا هو العمود الفقري.</p>
<h2 id="يبني-على">يبني على</h2>
<ul>
<li><a href="https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket">إنشاء حاوية S3 وإعدادها</a></li>
<li><a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a></li>
<li><a href="https://stevekinney.com/courses/aws/origin-access-control-for-s3">التحكم في الوصول إلى الأصل في S3</a></li>
<li><a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكات التخزين المؤقت والإبطال</a></li>
</ul>
<h2 id="المعمارية">المعمارية</h2>
<p>هذا شكل خط الأنابيب الأساسي:</p>
<pre><code>flowchart LR
    Browser[&quot;Browser&quot;] --&gt; CloudFront[&quot;CloudFront distribution&lt;br/&gt;HTTPS, cache, SPA fallback&lt;br/&gt;*.cloudfront.net&quot;]
    CloudFront --&gt;|cache miss| S3[&quot;Private S3 bucket&lt;br/&gt;static assets&quot;]
</code></pre>
<ol>
<li><strong>CloudFront</strong> ينهي HTTPS باستخدام شهادته الافتراضية، ويفحص ذاكرة الحافة المؤقتة، وعند غياب الملف (miss) يجلب من S3 باستخدام التحكم في الوصول إلى الأصل.</li>
<li><strong>S3</strong> يخزّن الملفات الثابتة في حاوية خاصة. ولا يقرأ منها إلا CloudFront.</li>
</ol>
<p>خدمتان، ومسؤوليتان محدّدتان بوضوح. بلا خوادم. بلا حاويات. بلا موازنات حمل. وأنا أحبّ فعلًا مدى بساطة ما ينتهي إليه الأمر.</p>
<p>وإن كان لديك نطاق مخصّص، فيمكنك اختياريًا إضافة Route 53 وACM إلى خط الأنابيب. ويُغطّى ذلك في قسم <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> في نهاية الدورة. والمعمارية الموسّعة تبدو هكذا:</p>
<pre><code>flowchart LR
    Browser[&quot;Browser&quot;] --&gt; Route53[&quot;Route 53 alias record&lt;br/&gt;example.com&quot;]
    Route53 --&gt; CloudFront[&quot;CloudFront distribution&lt;br/&gt;HTTPS, cache, SPA fallback&quot;]
    CloudFront --&gt;|cache miss| S3[&quot;Private S3 bucket&lt;br/&gt;static assets&quot;]
    ACM[&quot;ACM certificate&lt;br/&gt;us-east-1&quot;] --&gt; CloudFront
</code></pre>
<h2 id="ترتيب-العمليات">ترتيب العمليات</h2>
<p>الترتيب مهم. فلا يمكنك إرفاق OAC بتوزيع غير موجود. ولا يمكنك تقييد S3 قبل أن يكون لدى CloudFront ARN توزيع. وهذا هو التتابع الذي يحافظ على صدق سلسلة التبعيات.</p>
<h3 id="إنشاء-حاوية-s3">إنشاء حاوية S3</h3>
<p>تبقى الحاوية أساس التخزين: فهي تحمل ملفاتك. ولا شيء آخر في خط الأنابيب يعتمد على تهيئة S3 بطريقة معيّنة وقت الإنشاء — فيمكنك تحديث سياسة الحاوية لاحقًا دائمًا. وقد غطّيت هذا في <a href="https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket">إنشاء حاوية S3 وإعدادها</a> ورفعت الملفات في <a href="https://stevekinney.com/courses/aws/uploading-and-organizing-files">رفع الملفات وتنظيمها</a>.</p>
<p>في هذه المرحلة، يمكن أن تكون الحاوية عامة أو خاصة. وتطلب منك الدورة جعلها عامة مؤقتًا لترى استضافة S3 المباشرة بمعزل عن غيرها. فتلك نقطة تعلّم عابرة، لا الحالة النهائية. والحالة النهائية هي حاوية خاصة مع CloudFront وOAC.</p>
<h3 id="إنشاء-توزيع-cloudfront-مع-oac">إنشاء توزيع CloudFront مع OAC</h3>
<p>بعد أن تصبح الحاوية جاهزة، يمكنك إنشاء التوزيع. وهذه هي الخطوة التي يجتمع فيها كل شيء:</p>
<ul>
<li><strong>الأصل</strong> يشير إلى حاوية S3 لديك. وقد أعددت هذا في <a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a>.</li>
<li><strong>التحكم في الوصول إلى الأصل</strong> يقيّد الحاوية بحيث لا يقرأ منها إلا CloudFront. وقد أعددته في <a href="https://stevekinney.com/courses/aws/origin-access-control-for-s3">التحكم في الوصول إلى الأصل في S3</a>.</li>
<li><strong>شهادة CloudFront الافتراضية</strong> توفّر HTTPS على نطاق <code>*.cloudfront.net</code> تلقائيًا.</li>
<li><strong>سلوكات التخزين المؤقت</strong> و<strong>استجابات الأخطاء المخصّصة</strong> تتولّيان التخزين المؤقت وتوجيه SPA. وقد أعددتهما في <a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكات التخزين المؤقت والإبطال</a> و<a href="https://stevekinney.com/courses/aws/custom-error-pages-and-spa-routing">صفحات الأخطاء المخصّصة وتوجيه SPA</a>.</li>
</ul>
<p>بعد إنشاء التوزيع، تحدّث سياسة حاوية S3 لتسمح فقط للكيان الخدمي (service principal) الخاص بـ CloudFront، وتعيد تمكين حجب الوصول العام على الحاوية. وعند هذه النقطة، تُرجع عناوين URL المباشرة لـ S3 الرمز 403.</p>
<p>وعند هذه النقطة، يصبح موقعك حيًّا على نطاق <code>*.cloudfront.net</code>. وإن أردت إضافة نطاق مخصّص، فقسم <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> الاختياري في نهاية الدورة يغطّي Route 53 وACM وربط كل شيء معًا.</p>
<h2 id="لماذا-هذا-الترتيب">لماذا هذا الترتيب</h2>
<p>تسير سلسلة التبعيات في اتجاه واحد:</p>
<pre><code>flowchart RL
    CloudFront[&quot;CloudFront&quot;] --&gt; S3[&quot;S3&quot;]
</code></pre>
<ul>
<li>CloudFront يعتمد على S3 (بوصفه أصله).</li>
<li>سياسة حاوية S3 تعتمد على ARN توزيع CloudFront.</li>
<li>لا يمكن إرفاق OAC قبل وجود التوزيع.</li>
</ul>
<p>الترتيب ليس اعتباطيًا: بل يفرضه الاعتماد المتبادل بين الخدمات. فإن حاولت ضبط OAC قبل وجود التوزيع، فلا شيء تُرفقه به. وإن حاولت تقييد الحاوية قبل أن تحصل على ARN التوزيع، فليس للسياسة كيان تثق به.</p>
<h2 id="صلاحيات-iam-التي-تجعله-يعمل">صلاحيات IAM التي تجعله يعمل</h2>
<p>كل عملية في خط الأنابيب هذا تتطلّب صلاحيات IAM. وقد بنيت الفهم الأساسي في <a href="https://stevekinney.com/courses/aws/iam-mental-model">نموذج IAM الذهني</a> و<a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>. وبالنسبة إلى خط أنابيب النشر، الصلاحيات الأساسية هي:</p>
<ul>
<li><strong>S3</strong>: <code>s3:PutObject</code> و<code>s3:DeleteObject</code> و<code>s3:ListBucket</code> على حاويتك.</li>
<li><strong>CloudFront</strong>: <code>cloudfront:CreateInvalidation</code> على توزيعك.</li>
</ul>
<p>وقد بنيت روبوت نشر محدود النطاق بهذه الصلاحيات نفسها لـ S3 وCloudFront في <a href="https://stevekinney.com/courses/aws/iam-policy-exercise">تمرين سياسة IAM لروبوت النشر</a>. والسياسة نفسها هي ما ستستخدمه في خطوط أنابيب CI/CD.</p>
<h2 id="ما-تفعله-كل-خدمة-وقت-التشغيل">ما تفعله كل خدمة وقت التشغيل</h2>
<p>بعد نشر خط الأنابيب، هذا ما يحدث عندما يزور مستخدم <code>https://d1234abcdef.cloudfront.net/dashboard</code>:</p>
<ol>
<li><strong>تحليل DNS</strong>: يستعلم المتصفح DNS عن نطاق <code>*.cloudfront.net</code> ويحصل على عنوان IP لأقرب موقع حافة.</li>
<li><strong>مصافحة TLS</strong>: يتّصل المتصفح بموقع حافة CloudFront. ويعرض CloudFront شهادته الافتراضية. فيتحقّق منها المتصفح وينشئ اتصالًا مشفّرًا.</li>
<li><strong>فحص ذاكرة الحافة المؤقتة</strong>: يفحص CloudFront ما إذا كان <code>/dashboard</code> مخزّنًا مؤقتًا في موقع الحافة هذا.</li>
<li><strong>غياب في الذاكرة المؤقتة (الزيارة الأولى)</strong>: يرسل CloudFront طلبًا موقّعًا إلى S3 (باستخدام بيانات اعتماد SigV4 الخاصة بـ OAC). ولا يملك S3 ملفًا عند <code>/dashboard</code>، فيُرجع 403.</li>
<li><strong>استجابة خطأ مخصّصة</strong>: تعترض استجابة الخطأ المخصّصة في CloudFront الرمز 403، وتقدّم <code>/index.html</code> بدلًا منه، وتُرجع رمز الحالة 200. ثم يتولّى الموجّه في جانب العميل ويعرض واجهة <code>/dashboard</code>.</li>
<li><strong>إصابة في الذاكرة المؤقتة (الزيارات اللاحقة)</strong>: يُقدَّم الطلب التالي لـ <code>/dashboard</code> من موقع الحافة نفسه مباشرة من الذاكرة المؤقتة. بلا رحلة ذهاب وعودة إلى S3.</li>
</ol>
<p>كل طبقة تفعل شيئًا واحدًا. S3 يخزّن الملفات. CloudFront يخزّن مؤقتًا ويوجّه. ACM يؤمّن. Route 53 يحلّ الأسماء. والقطع تتركّب دون تداخل.</p>
<pre><code>sequenceDiagram
    participant Browser
    participant CloudFront
    participant S3

    Browser-&gt;&gt;CloudFront: GET /dashboard
    alt Cache hit
        CloudFront--&gt;&gt;Browser: Cached response
    else Cache miss
        CloudFront-&gt;&gt;S3: Signed origin request
        S3--&gt;&gt;CloudFront: 403 for missing object
        CloudFront--&gt;&gt;Browser: index.html with SPA fallback
    end
</code></pre>
<h2 id="سير-عمل-النشر">سير عمل النشر</h2>
<p>بعد أن تصبح البنية التحتية في مكانها، نشر نسخة جديدة من موقعك أمران فقط:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Upload new files to S3</span>
aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete \\
  --output json

<span class="hljs-comment"># Invalidate CloudFront cache</span>
aws cloudfront create-invalidation \\
  --distribution-id E1A2B3C4D5E6F7 \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الخيار <code>--delete</code> يحذف من S3 الملفات القديمة التي لم تعد موجودة في مجلد البناء لديك. والإبطال يخبر CloudFront بإسقاط النسخ المخزّنة مؤقتًا كي تجلب مواقع الحافة النسخ الجديدة. وقد تعلّمت عن هذين في <a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكات التخزين المؤقت والإبطال</a>.</p>
<p>هذا هو الأساس. وفي الدرسين التاليين، ستلفّ هذين الأمرين في سكربت نشر ثم تؤتمتهما بـ GitHub Actions بحيث يحدث النشر في كل دفعة إلى <code>main</code>.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن أردت اختبار خط الأنابيب قبل أتمتته، فشغّل الأمرين أعلاه يدويًا بعد كل بناء. فهذا بالضبط ما يفعله خط الأنابيب المؤتمت: إنه فقط يزيلك من الحلقة.</p>
</blockquote>
<h2 id="التحقق">التحقق</h2>
<p>استخدم هذه الفحوصات بعد ربط تطبيق Scratch Lab معًا:</p>
<pre><code class="language-bash">curl -I https://YOUR_CLOUDFRONT_DOMAIN
curl -I https://YOUR_CLOUDFRONT_DOMAIN/collections/tents
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>تريد أن تتحقّق ثلاثة أمور:</p>
<ul>
<li>أن يُرجع <code>curl -I https://YOUR_CLOUDFRONT_DOMAIN</code> الرمز <code>200</code> مع مصافحة TLS صحيحة.</li>
<li>أن يُرجع المسار العميق <code>200</code> ويقدّم HTML، مما يثبت عمل احتياطي SPA.</li>
<li>أن يُرجع عنوان URL المباشر لـ S3 الرمز <code>403</code>، مما يثبت أن الحاوية خاصة.</li>
</ul>
<h2 id="أنماط-الفشل-الشائعة">أنماط الفشل الشائعة</h2>
<ul>
<li><strong>الحاوية ما زالت عامة:</strong> إذا كان عنوان URL لـ S3 يعمل مباشرة، فالتحكم في الوصول إلى الأصل لا يحمي الحاوية فعليًا.</li>
<li><strong>احتياطي SPA مضبوط في S3 فقط:</strong> يمنحك ذلك صفحة، لكن غالبًا برمز حالة خاطئ. وينبغي أن يمتلك CloudFront سلوك المتصفح النهائي.</li>
<li><strong>CloudFront يُرجع 403 لملفات موجودة:</strong> سياسة الحاوية لا تثق بكيان التوزيع الخدمي، أو أن OAC غير مُرفق بالأصل.</li>
</ul>
<h2 id="ما-بعد-هذه-الدورة-النشر-المستمر">ما بعد هذه الدورة: النشر المستمر</h2>
<p>بعد أن يستقرّ خط الأنابيب هذا، يتيح لك <strong>النشر المستمر في CloudFront</strong> شحن تغييرات عالية المخاطر على التوزيع (سلوكات تخزين مؤقت جديدة، وإعدادات أصل جديدة، وCloudFront Functions جديدة) خلف تقسيم مرجّح. فتنشئ <em>توزيعًا مرحليًا</em> مرتبطًا بتوزيعك الأساسي، وتوجّه نسبة من الحركة إليه عبر سياسة نشر مستمر، ثم ترقّي إعدادات التوزيع المرحلي إلى الأساسي بعد التحقّق منها. فكّر فيه كـ blue/green لـ CloudFront نفسه. وهو غير مشمول في هذه الدورة — فالنطاق هو شحن النسخة الأولى، لا التحسين عليها — لكنه الإجابة الصحيحة عندما تحتاج إلى تغيير التوزيع دون انتقال خطير.</p>
`,a={book:t,chapter:"aws",chapterTitle:n,slug:o,title:e,headings:s,html:r};export{t as book,i as chapter,n as chapterTitle,a as default,s as headings,r as html,o as slug,e as title};
