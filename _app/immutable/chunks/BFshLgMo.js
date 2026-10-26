const o="kinney",s="aws",e="نشر تطبيقات الويب على AWS",n="cloudfront-distribution-exercise",t="تمرين: إعداد توزيع CloudFront",d=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلّبات المسبقة"},{depth:2,id:"إنشاء-تحكم-بالوصول-إلى-الأصل",text:"إنشاء تحكّم بالوصول إلى الأصل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-التوزيع",text:"إنشاء التوزيع"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تحديث-سياسة-حاوية-s3",text:"تحديث سياسة حاوية S3"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إعادة-تفعيل-حجب-الوصول-العام",text:"إعادة تفعيل حجب الوصول العام"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"اختبار-توجيه-spa",text:"اختبار توجيه SPA"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إرفاق-سياسة-ترويسات-الاستجابة",text:"إرفاق سياسة ترويسات الاستجابة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"التحقق-النهائي",text:"التحقّق النهائي"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],c=`<p>لديك حاوية S3 تحتوي ملفات موقع ثابت. ومهمّتك أن تضع CloudFront أمامها: أنشئ توزيعًا، وأحكِم إغلاق الحاوية بـ«التحكّم في الوصول إلى الأصل»، وهيئ توجيه SPA. وبحلول النهاية، ينبغي أن تكون لديك واجهة أمامية موزّعة عالميًا ومؤمّنة بـHTTPS على نطاق <code>*.cloudfront.net</code> تقدّم تطبيق SPA الخاص بك بشكل صحيح على كل المسارات.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>بلا CloudFront، موقعك حاوية S3 في منطقة واحدة بلا HTTPS، وبلا تخزين مؤقت على الحافة، وبلا ترويسات أمان. أما مع CloudFront، فلديك شبكة CDN موزّعة عالميًا تقدّم المحتوى من مواقع حافة قريبة من مستخدميك، وتفرض HTTPS، وتتعامل مع توجيه SPA، وتضيف ترويسات أمان—وهي البنية نفسها التي تمنحك إياها Vercel وNetlify جاهزة. هذا التمرين هو الجسر من «ملفات في حاوية» إلى «نشر إنتاجي».</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن تغيّرت مخرجات وحدة التحكّم أو سطر الأوامر أثناء تنفيذك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html">دليل مطوّر CloudFront</a> و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html">دليل إعداد OAC</a> مفتوحين.</p>
</blockquote>
<h2 id="المتطلبات-المسبقة">المتطلّبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<p>قبل أن تبدأ، تأكّد من أن لديك:</p>
<ul>
<li>حاوية S3 (<code>my-frontend-app-assets</code>) تحتوي على الأقل ملف <code>index.html</code> محمّلًا. راجع <a href="https://stevekinney.com/courses/aws/uploading-and-organizing-files">تحميل الملفات وتنظيمها</a> إن كنت بحاجة إلى إعداد ذلك.</li>
<li>AWS CLI الإصدار 2 مهيّأ ببيانات اعتماد تملك أذونات CloudFront وS3.</li>
</ul>
<h2 id="إنشاء-تحكم-بالوصول-إلى-الأصل">إنشاء تحكّم بالوصول إلى الأصل</h2>
<p>أنشئ OAC سيستخدمه CloudFront لمصادقة الطلبات إلى حاوية S3 لديك.</p>
<ul>
<li>استخدم <code>aws cloudfront create-origin-access-control</code> مع تهيئة JSON.</li>
<li>اضبط <code>SigningProtocol</code> على <code>sigv4</code>، و<code>SigningBehavior</code> على <code>always</code>، و<code>OriginAccessControlOriginType</code> على <code>s3</code>.</li>
<li>احفظ <code>Id</code> الخاص بـOAC من الاستجابة—فأنت تحتاجه لتهيئة التوزيع.</li>
</ul>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّل <code>aws cloudfront list-origin-access-controls --region us-east-1 --output json</code> وتأكّد من ظهور OAC الخاص بك في القائمة.</p>
<h2 id="إنشاء-التوزيع">إنشاء التوزيع</h2>
<p>أنشئ توزيع CloudFront بهذه الإعدادات:</p>
<ul>
<li><strong>الأصل</strong>: حاوية S3 لديك (<code>my-frontend-app-assets.s3.us-east-1.amazonaws.com</code>)، مع إرفاق معرّف OAC.</li>
<li><strong>كائن الجذر الافتراضي</strong>: <code>index.html</code></li>
<li><strong>فئة السعر</strong>: <code>PriceClass_100</code></li>
<li><strong>سياسة التخزين المؤقت</strong>: استخدم السياسة المُدارة <code>CachingOptimized</code> (<code>658327ea-f89d-4fab-a63d-7e88639e58f6</code>).</li>
<li><strong>سياسة بروتوكول المشاهد</strong>: <code>redirect-to-https</code></li>
<li><strong>الضغط</strong>: مُفعّل</li>
<li><strong>إصدار HTTP</strong>: <code>http2and3</code></li>
<li><strong>شهادة المشاهد</strong>: استخدم شهادة CloudFront الافتراضية (<code>CloudFrontDefaultCertificate: true</code>). فهذا يمنحك HTTPS على نطاق <code>*.cloudfront.net</code> تلقائيًا. وإن أردت نطاقًا مخصّصًا لاحقًا، فراجع القسم الاختياري <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> في نهاية الدورة.</li>
<li><strong>استجابات الأخطاء المخصّصة</strong>: اربط كلاً من <code>403</code> و<code>404</code> بـ<code>/index.html</code> مع رمز استجابة <code>200</code> ومدة تخزين مؤقت للأخطاء <code>10</code> ثوانٍ.</li>
</ul>
<p>اكتب تهيئة التوزيع الكاملة بصيغة JSON واستخدم <code>aws cloudfront create-distribution --distribution-config file://distribution-config.json</code>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>يعيد أمر <code>create-distribution</code> معرّف توزيع <code>Id</code> و<code>DomainName</code>. احفظ كليهما. وينبغي أن تكون <code>Status</code> هي <code>&quot;InProgress&quot;</code>. انتظر النشر:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> YOUR_DISTRIBUTION_ID \\
  --region us-east-1
</code></pre>
<h2 id="تحديث-سياسة-حاوية-s3">تحديث سياسة حاوية S3</h2>
<p>استبدل سياسة حاويتك الحالية بأخرى تسمح لـCloudFront فقط بالقراءة منها:</p>
<ul>
<li><strong>الأصل</strong>: أصل الخدمة <code>cloudfront.amazonaws.com</code>.</li>
<li><strong>الإجراء</strong>: <code>s3:GetObject</code>.</li>
<li><strong>المورد</strong>: <code>arn:aws:s3:::my-frontend-app-assets/*</code>.</li>
<li><strong>الشرط</strong>: <code>StringEquals</code> على <code>AWS:SourceArn</code> مطابقًا لـARN توزيعك (<code>arn:aws:cloudfront::123456789012:distribution/YOUR_DISTRIBUTION_ID</code>).</li>
</ul>
<p>طبّق السياسة عبر <code>aws s3api put-bucket-policy</code>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>اختبر أن CloudFront يقدّم محتواك:</p>
<pre><code class="language-bash">curl -I https://YOUR_DISTRIBUTION_DOMAIN/index.html
</code></pre>
<p>ينبغي أن تحصل على <code>200 OK</code>. والآن اختبر أن الوصول المباشر إلى S3 محجوب:</p>
<pre><code class="language-bash">curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>ينبغي أن تحصل على <code>403 Forbidden</code>.</p>
<h2 id="إعادة-تفعيل-حجب-الوصول-العام">إعادة تفعيل حجب الوصول العام</h2>
<p>لم تعد حاويتك بحاجة إلى أن تكون متاحة للعامة. أعد تفعيل إعدادات حجب الوصول العام الأربعة كلها:</p>
<pre><code class="language-bash">aws s3api put-public-access-block \\
  --bucket my-frontend-app-assets \\
  --public-access-block-configuration \\
    <span class="hljs-string">&quot;BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true&quot;</span> \\
  --region us-east-1
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>تحقّق من أن CloudFront لا يزال يعمل بعد إعادة تفعيل حجب الوصول العام:</p>
<pre><code class="language-bash">curl -I https://YOUR_DISTRIBUTION_DOMAIN/index.html
</code></pre>
<p>لا يزال <code>200 OK</code>. فسياسة أصل خدمة CloudFront لا تتأثّر بحجب الوصول العام.</p>
<h2 id="اختبار-توجيه-spa">اختبار توجيه SPA</h2>
<p>انتقل إلى مسار لا يقابل ملفًا حقيقيًا في حاوية S3 لديك:</p>
<pre><code class="language-bash">curl -I https://YOUR_DISTRIBUTION_DOMAIN/dashboard/settings
</code></pre>
<p>ينبغي أن تحصل على <code>200 OK</code> مع <code>content-type: text/html</code>. وهذا يؤكّد أن استجابة الخطأ المخصّصة تعمل—فـCloudFront يقدّم <code>index.html</code> للمسارات المفقودة.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>افتح نطاق توزيعك في متصفّح وانتقل إلى مسار SPA. ينبغي أن تُحمّل الصفحة بشكل صحيح، وألّا يُنتج التحديث خطأ 403 أو 404.</p>
<h2 id="إرفاق-سياسة-ترويسات-الاستجابة">إرفاق سياسة ترويسات الاستجابة</h2>
<p>أرفق السياسة المُدارة <code>SecurityHeadersPolicy</code> (<code>67f7725c-6f97-4210-82d7-5512b31e9d03</code>) بسلوك التخزين المؤقت الافتراضي:</p>
<ul>
<li>اجلب تهيئة التوزيع الحالية عبر <code>aws cloudfront get-distribution-config</code>.</li>
<li>أضف <code>ResponseHeadersPolicyId</code> إلى <code>DefaultCacheBehavior</code>.</li>
<li>حدّث التوزيع عبر <code>aws cloudfront update-distribution</code>، مستخدمًا <code>ETag</code> من الجلب.</li>
</ul>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>بعد نشر التوزيع، تحقّق من ترويسات الأمان:</p>
<pre><code class="language-bash">curl -I https://YOUR_DISTRIBUTION_DOMAIN/index.html
</code></pre>
<p>ينبغي أن ترى:</p>
<pre><code>strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
</code></pre>
<h2 id="التحقق-النهائي">التحقّق النهائي</h2>
<p>في هذه المرحلة، ينبغي أن يكون توزيع CloudFront لديك:</p>
<ol>
<li>أصل S3 مع تحكّم في الوصول إلى الأصل (بلا وصول عام إلى الحاوية).</li>
<li>سياسة التخزين المؤقت المُدارة <code>CachingOptimized</code>.</li>
<li>HTTPS عبر شهادة CloudFront الافتراضية مع <code>redirect-to-https</code>.</li>
<li>استجابات أخطاء مخصّصة لتوجيه SPA (403 و404 إلى <code>/index.html</code> مع 200).</li>
<li>ترويسات أمان عبر سياسة ترويسات الاستجابة.</li>
</ol>
<p>شغّل فحصًا نهائيًا:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Distribution details</span>
aws cloudfront get-distribution \\
  --<span class="hljs-built_in">id</span> YOUR_DISTRIBUTION_ID \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Distribution.{Id:Id,Domain:DomainName,Status:Status}&quot;</span>

<span class="hljs-comment"># Verify HTTPS works</span>
curl -I https://YOUR_DISTRIBUTION_DOMAIN

<span class="hljs-comment"># Verify SPA routing</span>
curl -I https://YOUR_DISTRIBUTION_DOMAIN/any/spa/route

<span class="hljs-comment"># Verify S3 is locked down</span>
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong>يعيد CloudFront الخطأ <code>403 Forbidden</code> لملفات موجودة:</strong> سياسة حاوية S3 لا تثق بتحكّم الوصول إلى الأصل الخاص بتوزيعك، أو أن الأصل لا يزال مهيّأً لاستخدام الحاوية بشكل غير صحيح.</li>
<li><strong>يعيد <code>/dashboard/settings</code> رمز 403 أو 404 بدلًا من هيكل تطبيقك:</strong> استجابات الأخطاء المخصّصة لتوجيه SPA مفقودة أو تشير إلى المسار الخطأ.</li>
<li><strong>لا يزال الوصول المباشر إلى S3 يعمل بعد تهيئة CloudFront:</strong> أعد تفعيل حجب الوصول العام وتأكّد من أن سياسة الحاوية تمنح صلاحية القراءة لـCloudFront فقط، ولم تعد تمنحها لـ<code>Principal: &quot;*&quot;</code>.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>سياسة ترويسات استجابة مخصّصة</strong>: أنشئ سياسة مخصّصة بـ<code>max-age</code> لـHSTS مدّته سنتان، مع <code>includeSubDomains</code> و<code>preload</code>. وأضف ترويسة <code>Permissions-Policy</code> تعطّل الكاميرا والميكروفون وتحديد الموقع الجغرافي.</li>
<li><strong>ترويسات Cache-Control على كائنات S3</strong>: أعد تحميل أصولك بترويسات <code>Cache-Control</code> متباينة: مدة قصيرة لـ<code>index.html</code>، ومدة طويلة مع <code>immutable</code> للأصول المُجزَّأة.</li>
<li><strong>إبطال مستهدف</strong>: انشر تغييرًا على <code>index.html</code>، ثم أنشئ إبطالًا لـ<code>/index.html</code> فقط بدلًا من <code>/*</code>. وتحقق من أن النسخة القديمة لا تزال مخزّنة مؤقتًا للمسارات الأخرى.</li>
</ul>
`,i={book:o,chapter:"aws",chapterTitle:e,slug:n,title:t,headings:d,html:c};export{o as book,s as chapter,e as chapterTitle,i as default,d as headings,c as html,n as slug,t as title};
