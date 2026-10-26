const e="kinney",d="aws",n="نشر تطبيقات الويب على AWS",t="static-site-deployment-exercise",o="تمرين: نشر موقع ثابت من طرف إلى طرف",s=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلّبات المسبقة"},{depth:2,id:"إنشاء-حاوية-s3",text:"إنشاء حاوية S3"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تحميل-موقعك",text:"تحميل موقعك"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-تحكم-بالوصول-إلى-الأصل",text:"إنشاء تحكّم بالوصول إلى الأصل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-توزيع-cloudfront",text:"إنشاء توزيع CloudFront"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تحديث-سياسة-حاوية-s3",text:"تحديث سياسة حاوية S3"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"التحقق-من-خط-الأنابيب-الكامل",text:"التحقّق من خط الأنابيب الكامل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"اختبار-عملية-نشر",text:"اختبار عملية نشر"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],c=`<p>ستنشر موقعًا ثابتًا من الصفر إلى الإنتاج. بلا اختصارات، وبلا تخطّي خطوات. هذا هو تمريني المفضّل في الدورة كلها. وبحلول النهاية، سيكون موقعك متاحًا مباشرةً على نطاق <code>*.cloudfront.net</code>—يُقدَّم عبر CloudFront، ومؤمّنًا بـHTTPS، ومخزّنًا في حاوية S3 خاصة. يدمج هذا التمرين مسار الاستضافة الثابتة الأساسي: IAM وS3 وCloudFront وOAC.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>لقد بنيت كل قطعة على حدة في أقسام الاستضافة الثابتة المبكّرة. ويثبت هذا التمرين أنها تتكامل في نشر عامل. وهو أيضًا تجربة أولية لسير العمل الذي ستؤتمته بـGitHub Actions: فكل خطوة يدوية هنا تقابل خطوة في خط أنابيب CI/CD لديك. وإن استطعت فعلها يدويًا، فأنت تفهم ما تفعله الأتمتة.</p>
<p>إن أردت نسخة AWS من سير العمل من طرف إلى طرف مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html">درس موقع S3 الثابت</a> و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html">دليل OAC في CloudFront</a> قريبين منك.</p>
<h2 id="المتطلبات-المسبقة">المتطلّبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<p>قبل أن تبدأ:</p>
<ul>
<li>AWS CLI الإصدار 2 مهيّأ ببيانات اعتماد تملك أذونات بمستوى المسؤول (أو على الأقل: الوصول إلى S3 وCloudFront وIAM). راجع <a href="https://stevekinney.com/courses/aws/setting-up-the-aws-cli">إعداد AWS CLI</a>.</li>
<li>دليل بناء موقع ثابت يحتوي على الأقل ملف <code>index.html</code>. وإن لم يكن لديك واحد، فأنشئ موقعًا بسيطًا:</li>
</ul>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p build
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;&lt;!DOCTYPE html&gt;&lt;head&gt;&lt;title&gt;My Site&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;h1&gt;It works.&lt;/h1&gt;&lt;/body&gt;&#x27;</span> &gt; build/index.html
</code></pre>
<h2 id="إنشاء-حاوية-s3">إنشاء حاوية S3</h2>
<p>أنشئ حاوية لحفظ ملفاتك الثابتة. واحجب كل وصول عام من البداية—فسيكون CloudFront الطريق الوحيد للوصول إلى هذه الملفات.</p>
<ul>
<li>أنشئ الحاوية عبر <code>aws s3 mb</code>.</li>
<li>فعّل حجب الوصول العام عبر <code>aws s3api put-public-access-block</code>.</li>
<li>تحقّق من وجود الحاوية عبر <code>aws s3 ls</code>.</li>
</ul>
<p>راجع <a href="https://stevekinney.com/courses/aws/creating-and-configuring-a-bucket">إنشاء حاوية وتهيئتها</a> للأوامر.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<pre><code class="language-bash">aws s3api get-public-access-block \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن تكون الإعدادات الأربعة كلها <code>true</code>.</p>
<h2 id="تحميل-موقعك">تحميل موقعك</h2>
<p>زامن دليل بنائك مع الحاوية:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>راجع <a href="https://stevekinney.com/courses/aws/uploading-and-organizing-files">تحميل الملفات وتنظيمها</a> لخيارات مثل ترويسات <code>--cache-control</code>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">ls</span> s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>ينبغي أن ترى <code>index.html</code> (وأي ملفات أخرى) مدرجة.</p>
<h2 id="إنشاء-تحكم-بالوصول-إلى-الأصل">إنشاء تحكّم بالوصول إلى الأصل</h2>
<p>أنشئ OAC سيستخدمه CloudFront لمصادقة الطلبات إلى حاوية S3 لديك:</p>
<ul>
<li>استخدم <code>aws cloudfront create-origin-access-control</code>.</li>
<li>اضبط <code>SigningProtocol</code> على <code>sigv4</code>، و<code>SigningBehavior</code> على <code>always</code>، و<code>OriginAccessControlOriginType</code> على <code>s3</code>.</li>
<li>احفظ <code>Id</code> الخاص بـOAC من الاستجابة.</li>
</ul>
<p>راجع <a href="https://stevekinney.com/courses/aws/origin-access-control-for-s3">التحكّم في الوصول إلى الأصل في S3</a>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<pre><code class="language-bash">aws cloudfront list-origin-access-controls \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;OriginAccessControlList.Items[*].{Id:Id,Name:Name}&quot;</span>
</code></pre>
<p>ينبغي أن يظهر OAC الخاص بك في القائمة.</p>
<h2 id="إنشاء-توزيع-cloudfront">إنشاء توزيع CloudFront</h2>
<p>أنشئ توزيعًا يربط الحاوية وOAC والشهادة معًا. وينبغي أن تتضمّن تهيئة توزيعك:</p>
<ul>
<li><strong>الأصل</strong>: حاوية S3 لديك مع إرفاق معرّف OAC.</li>
<li><strong>كائن الجذر الافتراضي</strong>: <code>index.html</code>.</li>
<li><strong>سياسة بروتوكول المشاهد</strong>: <code>redirect-to-https</code>.</li>
<li><strong>سياسة التخزين المؤقت</strong>: السياسة المُدارة <code>CachingOptimized</code> (<code>658327ea-f89d-4fab-a63d-7e88639e58f6</code>).</li>
<li><strong>استجابات الأخطاء المخصّصة</strong>: اربط 403 و404 بـ<code>/index.html</code> مع رمز استجابة 200.</li>
<li><strong>شهادة المشاهد</strong>: استخدم شهادة CloudFront الافتراضية (<code>CloudFrontDefaultCertificate: true</code>).</li>
</ul>
<p>راجع <a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a> و<a href="https://stevekinney.com/courses/aws/custom-error-pages-and-spa-routing">صفحات الأخطاء المخصّصة وتوجيه SPA</a>.</p>
<p>احفظ معرّف التوزيع واسم النطاق من الاستجابة.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>انتظر النشر:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> YOUR_DISTRIBUTION_ID \\
  --region us-east-1
</code></pre>
<p>ثم تحقّق من أن نطاق CloudFront يقدّم موقعك:</p>
<pre><code class="language-bash">curl -I https://YOUR_CLOUDFRONT_DOMAIN/index.html
</code></pre>
<p>ينبغي أن تحصل على <code>200 OK</code>.</p>
<h2 id="تحديث-سياسة-حاوية-s3">تحديث سياسة حاوية S3</h2>
<p>استبدل سياسة الحاوية بحيث تسمح لـCloudFront فقط بالقراءة من الحاوية:</p>
<ul>
<li><strong>الأصل</strong>: أصل الخدمة <code>cloudfront.amazonaws.com</code>.</li>
<li><strong>الإجراء</strong>: <code>s3:GetObject</code>.</li>
<li><strong>المورد</strong>: <code>arn:aws:s3:::my-frontend-app-assets/*</code>.</li>
<li><strong>الشرط</strong>: <code>StringEquals</code> على <code>AWS:SourceArn</code> مطابقًا لـARN توزيعك.</li>
</ul>
<p>راجع <a href="https://stevekinney.com/courses/aws/origin-access-control-for-s3">التحكّم في الوصول إلى الأصل في S3</a> و<a href="https://stevekinney.com/courses/aws/bucket-policies-and-public-access">سياسات الحاوية والوصول العام</a>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>ينبغي أن يظل CloudFront يعمل:</p>
<pre><code class="language-bash">curl -I https://YOUR_CLOUDFRONT_DOMAIN/index.html
</code></pre>
<p>وينبغي أن يكون الوصول المباشر إلى S3 محجوبًا:</p>
<pre><code class="language-bash">curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>ينبغي أن يُرجع <code>403 Forbidden</code>.</p>
<h2 id="التحقق-من-خط-الأنابيب-الكامل">التحقّق من خط الأنابيب الكامل</h2>
<p>مرّ على كل طبقة من طبقات خط الأنابيب:</p>
<pre><code class="language-bash"><span class="hljs-comment"># HTTPS works on the CloudFront domain</span>
curl -I https://YOUR_CLOUDFRONT_DOMAIN

<span class="hljs-comment"># SPA routing works (returns index.html for non-existent paths)</span>
curl -I https://YOUR_CLOUDFRONT_DOMAIN/any/spa/route

<span class="hljs-comment"># Direct S3 access is blocked</span>
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li><code>curl -I https://YOUR_CLOUDFRONT_DOMAIN</code> يعيد <code>200 OK</code></li>
<li><code>curl -I https://YOUR_CLOUDFRONT_DOMAIN/any/spa/route</code> يعيد <code>200 OK</code> (توجيه SPA)</li>
<li>الوصول المباشر إلى S3 يعيد <code>403 Forbidden</code></li>
</ul>
<h2 id="اختبار-عملية-نشر">اختبار عملية نشر</h2>
<p>انشر تغييرًا للتحقّق من أن دورة التحديث تعمل:</p>
<ol>
<li>عدّل <code>index.html</code> (غيّر نص العنوان).</li>
<li>زامن الملف المحدّث مع S3:</li>
</ol>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete \\
  --output json
</code></pre>
<ol>
<li>أبطل ذاكرة CloudFront المؤقتة:</li>
</ol>
<pre><code class="language-bash">aws cloudfront create-invalidation \\
  --distribution-id YOUR_DISTRIBUTION_ID \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<ol>
<li>انتظر دقيقة، ثم أعد تحميل <code>https://YOUR_CLOUDFRONT_DOMAIN</code>. ينبغي أن ترى المحتوى المحدّث.</li>
</ol>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>محتواك المحدّث متاح مباشرةً على <code>https://YOUR_CLOUDFRONT_DOMAIN</code>. ودورة النشر (المزامنة + الإبطال) تعمل من طرف إلى طرف.</p>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong>يعيد CloudFront الخطأ <code>403 Forbidden</code> لملفات موجودة:</strong> سياسة حاوية S3 لا تثق بتحكّم الوصول إلى الأصل الخاص بتوزيعك، أو أن الأصل لا يزال مهيّأً بشكل غير صحيح.</li>
<li><strong>لا تظهر الصفحة المحدّثة أبدًا بعد المزامنة:</strong> وصل الملف الجديد إلى S3، لكن CloudFront لا يزال يقدّم النسخة المخزّنة مؤقتًا. تأكّد من اكتمال الإبطال قبل إعادة الاختبار.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>ترويسات تخزين مؤقت متباينة</strong>: أعد تحميل أصولك مع <code>--cache-control &quot;public, max-age=31536000, immutable&quot;</code> للملفات المُجزَّأة و<code>--cache-control &quot;public, max-age=60&quot;</code> لـ<code>index.html</code>. تحقّق من ظهور الترويسات في استجابات <code>curl -I</code>.</li>
<li><strong>ترويسات أمان</strong>: أرفق السياسة المُدارة <code>SecurityHeadersPolicy</code> (<code>67f7725c-6f97-4210-82d7-5512b31e9d03</code>) بسلوك التخزين المؤقت الافتراضي لتوزيعك. تحقّق من ظهور <code>strict-transport-security</code> و<code>x-content-type-options</code> و<code>x-frame-options</code> في ترويسات الاستجابة.</li>
<li><strong>سكربت نشر</strong>: اكتب سكربت <code>deploy.sh</code> يؤتمت خطوتي المزامنة والإبطال. راجع <a href="https://stevekinney.com/courses/aws/automating-deploys-with-aws-cli">أتمتة النشر باستخدام AWS CLI</a> للقالب.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>أتريد وضع هذا خلف نطاق مخصّص مع HTTPS على شهادتك الخاصة؟ راجع القسم الاختياري <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> في نهاية الدورة. فهو يستعرض Route 53 وACM وربط كل شيء معًا.</p>
</blockquote>
<p>حين تصبح جاهزًا، قارن عملك بـ<a href="https://stevekinney.com/courses/aws/static-site-deployment-solution">الحل: نشر موقع ثابت من طرف إلى طرف</a>.</p>
`,i={book:e,chapter:"aws",chapterTitle:n,slug:t,title:o,headings:s,html:c};export{e as book,d as chapter,n as chapterTitle,i as default,s as headings,c as html,t as slug,o as title};
