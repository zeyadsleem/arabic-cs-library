const s="kinney",t="aws",e="نشر تطبيقات الويب على AWS",n="iam-policy-exercise",a="تمرين: سياسة IAM لبوت النشر",o=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"مهمتك",text:"مهمتك"},{depth:2,id:"خطوة-بخطوة",text:"خطوة بخطوة"},{depth:3,id:"إنشاء-مستخدم-iam",text:"إنشاء مستخدم IAM"},{depth:3,id:"إنشاء-مفاتيح-وصول-للمستخدم",text:"إنشاء مفاتيح وصول للمستخدم"},{depth:3,id:"كتابة-السياسة",text:"كتابة السياسة"},{depth:3,id:"إنشاء-السياسة-في-iam",text:"إنشاء السياسة في IAM"},{depth:3,id:"ربط-السياسة-بالمستخدم",text:"ربط السياسة بالمستخدم"},{depth:3,id:"التحقق-من-الإعداد",text:"التحقق من الإعداد"},{depth:2,id:"مع-sdk",text:"مع SDK"},{depth:2,id:"نقاط-التحقق",text:"نقاط التحقق"},{depth:2,id:"تشخيص-الفشل",text:"تشخيص الفشل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>ستُنشئ <strong>بوت نشر</strong>—مستخدم IAM غرضه الوحيد نشر واجهتك الأمامية. يستطيع هذا المستخدم مزامنة الملفات إلى حاوية S3 محدّدة وإبطال ذاكرة توزيع CloudFront محدّد. ولا يستطيع فعل أي شيء آخر. لا قراءة جداول DynamoDB، ولا إنشاء دوال Lambda، ولا تعديل أذونات IAM.</p>
<p>في الإنتاج، ستكون هوية النشر هذه <strong>دور IAM اتحاديًا عبر OIDC</strong> لا مستخدمًا بمفاتيح وصول ثابتة—فـ GitHub Actions تستطيع طلب بيانات اعتماد قصيرة العمر من AWS دون تخزين أي أسرار. وستُرقّي <code>deploy-bot</code> (أو مكافئه من دور OIDC) إلى النشر عبر GitHub Actions في درس CI/CD. أما الآن، فبناءه كمستخدم IAM بمفاتيح محدّدة النطاق هو المسار التعليمي الصحيح: فهو يفرض عليك التفكير صريحًا في الأذونات المطلوبة وسببها.</p>
<blockquote>
<p><strong>احذف هذه المفاتيح بعد درس CI/CD</strong></p>
<p>مفاتيح الوصول التي تولّدها في هذا التمرين هي عجلات تدريب. فبمجرد أن تصل إلى <a href="https://stevekinney.com/courses/aws/cicd-with-github-actions">CI/CD مع GitHub Actions</a> وتربط الدور الاتحادي عبر OIDC، <strong>احذف مفاتيح وصول <code>deploy-bot</code></strong> (<code>aws iam delete-access-key --user-name deploy-bot --access-key-id &lt;id&gt;</code>). إن مفاتيح الوصول طويلة العمر التي تبقى متروكة بعد أن تعود لا تحتاجها هي الطريقة المدرسية التي تُخترق بها حسابات AWS. يبقى دور IAM، وتبقى السياسة المرتبطة به، أما المفاتيح فتُحذف.</p>
</blockquote>
<p>هذا هو بوت النشر نفسه الذي ستربطه بخط أنابيب GitHub Actions لاحقًا في الدورة. أريدك أن تبنيه الآن كي تفهم بالضبط ما الأذونات التي يملكها ولماذا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن أردت نسخة AWS من ميكانيكا السياسات أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html">مرجع سياسات IAM بصيغة JSON</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/iam/create-policy.html">مرجع أمر <code>aws iam create-policy</code></a> مفتوحين.</p>
</blockquote>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>كل خط أنابيب CI/CD يحتاج بيانات اعتماد. على Vercel، تتولى المنصة ذلك عنك—فلا تفكر أبدًا في الأذونات التي تملكها عملية النشر. أما على AWS، فأنت تتحكم في تلك الأذونات صراحةً. والأذونات التي تختارها تحدّد نطاق الضرر إذا تسرّبت بيانات الاعتماد تلك.</p>
<p>بوت نشر يملك <code>AdministratorAccess</code> يستطيع حذف قاعدة بياناتك. أما بوت نشر بسياسة محدّدة النطاق، فأسوأ ما يفعله أن يكتب فوق ملفاتك الثابتة. الفرق بين يوم سيئ ويوم كارثي.</p>
<h2 id="مهمتك">مهمتك</h2>
<p>أنشئ مستخدم IAM باسم <code>deploy-bot</code> يتضمن:</p>
<ul>
<li><strong>لا وصول إلى وحدة التحكم</strong>—هذا المستخدم موجود لاستخدام CLI/API فقط.</li>
<li><strong>مفاتيح وصول</strong> للوصول البرمجي.</li>
<li><strong>سياسة IAM مخصّصة</strong> تسمح بهذه العمليات بالضبط ولا شيء غيرها: مزامنة الملفات إلى حاوية <code>my-frontend-app-assets</code> في S3 (الرفع والحذف والسرد) وإنشاء إبطالات ذاكرة على توزيع CloudFront ذي المعرّف <code>E1A2B3C4D5E6F7</code>
<ul>
<li>مزامنة الملفات إلى حاوية <code>my-frontend-app-assets</code> في S3 (الرفع والحذف والسرد)</li>
<li>إنشاء إبطالات ذاكرة على توزيع CloudFront ذي المعرّف <code>E1A2B3C4D5E6F7</code></li>
</ul>
</li>
</ul>
<p>استخدم معرّف الحساب <code>123456789012</code> والمنطقة <code>us-east-1</code> في جميع قيم ARN.</p>
<h2 id="خطوة-بخطوة">خطوة بخطوة</h2>
<h3 id="إنشاء-مستخدم-iam">إنشاء مستخدم IAM</h3>
<p>في وحدة تحكم AWS، انتقل إلى <strong>IAM</strong> &gt; <strong>Users</strong> &gt; <strong>Create user</strong>.</p>
<ul>
<li>عيّن اسم المستخدم إلى <code>deploy-bot</code>.</li>
<li><strong>لا</strong> تمكّن الوصول إلى وحدة التحكم. سيثبت هذا المستخدم هويته عبر مفاتيح الوصول فقط.</li>
<li>تخطَّ خطوة الأذونات الآن—سترفق سياسة بعد إنشائه.</li>
<li>تابع النقر حتى إنشاء المستخدم.</li>
</ul>
<p>بدلًا من ذلك، استخدم CLI:</p>
<pre><code class="language-bash">aws iam create-user \\
  --user-name deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="إنشاء-مفاتيح-وصول-للمستخدم">إنشاء مفاتيح وصول للمستخدم</h3>
<p>انتقل إلى تبويب <strong>Security credentials</strong> الخاص بمستخدم <code>deploy-bot</code> وأنشئ مفتاح وصول. اختر <strong>Other</strong> كحالة الاستخدام.</p>
<p>أو عبر CLI:</p>
<pre><code class="language-bash">aws iam create-access-key \\
  --user-name deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>احفظ معرّف مفتاح الوصول ومفتاح الوصول السري في مكان آمن. ستحتاجهما لاحقًا عند تهيئة خط أنابيب النشر.</p>
<h3 id="كتابة-السياسة">كتابة السياسة</h3>
<p>أنشئ ملفًا اسمه <code>deploy-bot-policy.json</code> يحتوي سياسة تقوم بما يلي:</p>
<ol>
<li>تسمح بـ <code>s3:PutObject</code> و<code>s3:DeleteObject</code> على الكائنات في حاوية <code>my-frontend-app-assets</code>.</li>
<li>تسمح بـ <code>s3:ListBucket</code> على حاوية <code>my-frontend-app-assets</code> نفسها.</li>
<li>تسمح بـ <code>cloudfront:CreateInvalidation</code> على التوزيع <code>E1A2B3C4D5E6F7</code>.</li>
</ol>
<p>تذكّر:</p>
<ul>
<li><code>s3:PutObject</code> و<code>s3:DeleteObject</code> تعملان على <strong>الكائنات</strong>، لذا يحتاج ARN المورد إلى <code>/*</code> في نهايته.</li>
<li><code>s3:ListBucket</code> تعمل على <strong>الحاوية</strong>، لذا لا يحتوي ARN المورد على <code>/*</code>.</li>
<li>أقواس ARN لتوزيعات CloudFront لا تحمل منطقة (استخدم مقطع منطقة فارغًا) وتتبع النمط <code>arn:aws:cloudfront::&lt;account-id&gt;:distribution/&lt;distribution-id&gt;</code>.</li>
<li>كل عبارة تحتاج <code>Effect</code> و<code>Action</code> و<code>Resource</code>.</li>
<li>تحتاج السياسة إلى <code>&quot;Version&quot;: &quot;2012-10-17&quot;</code>.</li>
</ul>
<h3 id="إنشاء-السياسة-في-iam">إنشاء السياسة في IAM</h3>
<pre><code class="language-bash">aws iam create-policy \\
  --policy-name DeployBotPolicy \\
  --policy-document file://deploy-bot-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>دوّن ARN السياسة من الناتج—ستحتاجه في الخطوة التالية.</p>
<h3 id="ربط-السياسة-بالمستخدم">ربط السياسة بالمستخدم</h3>
<pre><code class="language-bash">aws iam attach-user-policy \\
  --user-name deploy-bot \\
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="التحقق-من-الإعداد">التحقق من الإعداد</h3>
<p>أعدّ ملف تعريف مسمّى لبوت النشر:</p>
<pre><code class="language-bash">aws configure --profile deploy-bot
</code></pre>
<p>أدخل معرّف مفتاح الوصول ومفتاح الوصول السري الذي حفظته سابقًا، و<code>us-east-1</code> كمنطقة، و<code>json</code> كتنسيق إخراج.</p>
<p>تحقّق من الهوية:</p>
<pre><code class="language-bash">aws sts get-caller-identity \\
  --profile deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن ترى ARN الخاص بمستخدم <code>deploy-bot</code> في الاستجابة.</p>
<h2 id="مع-sdk">مع SDK</h2>
<p>التمرين كله بـ TypeScript، للمقارنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">IAMClient</span>,
  <span class="hljs-title class_">CreateUserCommand</span>,
  <span class="hljs-title class_">CreateAccessKeyCommand</span>,
  <span class="hljs-title class_">CreatePolicyCommand</span>,
  <span class="hljs-title class_">AttachUserPolicyCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-iam&#x27;</span>;

<span class="hljs-keyword">const</span> iam = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IAMClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateUserCommand</span>({ <span class="hljs-title class_">UserName</span>: <span class="hljs-string">&#x27;deploy-bot&#x27;</span> }));

<span class="hljs-keyword">const</span> keys = <span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateAccessKeyCommand</span>({ <span class="hljs-title class_">UserName</span>: <span class="hljs-string">&#x27;deploy-bot&#x27;</span> }));
<span class="hljs-comment">// This response is the ONLY time the secret is returned — store it now.</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Access key:&#x27;</span>, keys.<span class="hljs-property">AccessKey</span>?.<span class="hljs-property">AccessKeyId</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Secret:&#x27;</span>, keys.<span class="hljs-property">AccessKey</span>?.<span class="hljs-property">SecretAccessKey</span>);

<span class="hljs-keyword">const</span> policy = <span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreatePolicyCommand</span>({
    <span class="hljs-title class_">PolicyName</span>: <span class="hljs-string">&#x27;DeployBotPolicy&#x27;</span>,
    <span class="hljs-title class_">PolicyDocument</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-title class_">Version</span>: <span class="hljs-string">&#x27;2012-10-17&#x27;</span>,
      <span class="hljs-title class_">Statement</span>: [
        {
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Action</span>: [<span class="hljs-string">&#x27;s3:PutObject&#x27;</span>, <span class="hljs-string">&#x27;s3:DeleteObject&#x27;</span>],
          <span class="hljs-title class_">Resource</span>: <span class="hljs-string">&#x27;arn:aws:s3:::my-frontend-app-assets/*&#x27;</span>,
        },
        {
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Action</span>: [<span class="hljs-string">&#x27;s3:ListBucket&#x27;</span>],
          <span class="hljs-title class_">Resource</span>: <span class="hljs-string">&#x27;arn:aws:s3:::my-frontend-app-assets&#x27;</span>,
        },
        {
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Action</span>: [<span class="hljs-string">&#x27;cloudfront:CreateInvalidation&#x27;</span>],
          <span class="hljs-title class_">Resource</span>: <span class="hljs-string">&#x27;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&#x27;</span>,
        },
      ],
    }),
  }),
);

<span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">AttachUserPolicyCommand</span>({
    <span class="hljs-title class_">UserName</span>: <span class="hljs-string">&#x27;deploy-bot&#x27;</span>,
    <span class="hljs-title class_">PolicyArn</span>: policy.<span class="hljs-property">Policy</span>!.<span class="hljs-property">Arn</span>!,
  }),
);
</code></pre>
<h2 id="نقاط-التحقق">نقاط التحقق</h2>
<ul>
<li>مستخدم IAM باسم <code>deploy-bot</code> موجود دون وصول إلى وحدة التحكم</li>
<li>مفاتيح الوصول منشأة ومخزّنة بأمان</li>
<li><code>DeployBotPolicy</code> سياسة يديرها العميل في حسابك</li>
<li>السياسة تسمح بأربعة إجراءات بالضبط: <code>s3:PutObject</code> و<code>s3:DeleteObject</code> و<code>s3:ListBucket</code> و<code>cloudfront:CreateInvalidation</code></li>
<li>إجراءات S3 محدّدة النطاق عند <code>my-frontend-app-assets</code> (الحاوية والكائنات، بأنماط ARN الصحيحة)</li>
<li>إجراء CloudFront محدّد النطاق عند التوزيع <code>E1A2B3C4D5E6F7</code></li>
<li>السياسة مرتبطة بالمستخدم <code>deploy-bot</code></li>
<li>الأمر <code>aws sts get-caller-identity --profile deploy-bot</code> يعيد الهوية الصحيحة</li>
</ul>
<h2 id="تشخيص-الفشل">تشخيص الفشل</h2>
<ul>
<li><strong>يفشل <code>aws sts get-caller-identity</code> بخطأ <code>InvalidClientTokenId</code>:</strong> الملف الشخصي المسمّى يستخدم زوج مفاتيح وصول خاطئًا، أو نُسخت المفاتيح بشكل خاطئ عند إنشائها.</li>
<li><strong>تفشل أوامر النشر لاحقًا بخطأ <code>AccessDenied</code> على S3:</strong> تحقّق مرة أخرى من أن إجراءات الكائنات تستخدم <code>arn:aws:s3:::my-frontend-app-assets/*</code> بينما يستخدم <code>s3:ListBucket</code> ARN الحاوية دون <code>/*</code>.</li>
<li><strong>يفشل إبطال CloudFront رغم أن مزامنة S3 تعمل:</strong> ARN التوزيع خاطئ. فأقواس ARN الخاصة بـ CloudFront تحذف مقطع المنطقة ويجب أن تشير إلى <code>E1A2B3C4D5E6F7</code> في الحساب <code>123456789012</code>.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>اختبر الحدود.</strong> جرّب تشغيل أمر لا ينبغي أن يملك بوت النشر وصولًا إليه—مثل <code>aws iam list-users --profile deploy-bot --region us-east-1 --output json</code>. تأكد من حصولك على خطأ <code>AccessDenied</code>. هذه هي السياسة وهي تؤدي عملها.</li>
<li><strong>أضف عبارة Deny.</strong> أضف عبارة Deny صريحة تمنع بوت النشر من حذف الحاوية نفسها (<code>s3:DeleteBucket</code>). تقنيًا، البوت لا يستطيع فعل ذلك أصلًا (فالإجراء ليس في عبارات Allow)، لكن Deny الصريح يعمل كحاجز أمان حتى لو وسّع شخص ما عبارات Allow لاحقًا.</li>
<li><strong>استخدم Sids.</strong> إن لم تضمّن حقول <code>Sid</code> في عبارات سياستك، فأضف حقولًا وصفية. فعندما تعود إلى هذه السياسة بعد ثلاثة أشهر، ستكون <code>&quot;Sid&quot;: &quot;AllowS3DeploySync&quot;</code> أنفع من التحديق في قائمة إجراءات محاولًا تذكر الغرض منها.</li>
</ul>
<p>عندما تجهز، قارن عملك بـ <a href="https://stevekinney.com/courses/aws/iam-policy-solution">الحل: سياسة IAM لبوت النشر</a>.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>أبقِ <code>deploy-bot</code> موجودًا—ستستخدمه مرة أخرى في درس CI/CD. وعندما تنتهي من الدورة بأكملها، شغّل هذا التسلسل لتفكيك المستخدم. لـ IAM قواعد ترتيب صارمة: عطّل مفتاح الوصول، ثم افصل السياسة، ثم احذف مفتاح الوصول، ثم احذف المستخدم. أخطئ خطوة واحدة ويفشل استدعاء <code>delete-user</code> الأخير بخطأ <code>DeleteConflict</code>.</p>
<p>أولًا، اعثر على معرّف مفتاح الوصول (الذي حفظته سابقًا يفي بالغرض أيضًا، لكن هذا يوفّر عليك التنقيب في ملاحظاتك):</p>
<pre><code class="language-bash">aws iam list-access-keys \\
  --user-name deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ثم عطّل المفتاح وأزله:</p>
<pre><code class="language-bash">aws iam update-access-key \\
  --user-name deploy-bot \\
  --access-key-id AKIAEXAMPLE \\
  --status Inactive \\
  --region us-east-1

aws iam delete-access-key \\
  --user-name deploy-bot \\
  --access-key-id AKIAEXAMPLE \\
  --region us-east-1
</code></pre>
<p>افصل السياسة واحذفها:</p>
<pre><code class="language-bash">aws iam detach-user-policy \\
  --user-name deploy-bot \\
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \\
  --region us-east-1

aws iam delete-policy \\
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \\
  --region us-east-1
</code></pre>
<p>أخيرًا، احذف المستخدم:</p>
<pre><code class="language-bash">aws iam delete-user \\
  --user-name deploy-bot \\
  --region us-east-1
</code></pre>
<p>وأزل أيضًا الملف الشخصي المسمّى من تهيئة AWS المحلية بفتح <code>~/.aws/credentials</code> و<code>~/.aws/config</code> وحذف قسمَي <code>[deploy-bot]</code>.</p>
`,c={book:s,chapter:"aws",chapterTitle:e,slug:n,title:a,headings:o,html:l};export{s as book,t as chapter,e as chapterTitle,c as default,o as headings,l as html,n as slug,a as title};
