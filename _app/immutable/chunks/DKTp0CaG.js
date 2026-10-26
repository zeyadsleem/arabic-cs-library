const s="kinney",o="aws",n="نشر تطبيقات الويب على AWS",a="iam-policy-solution",t="الحل",p=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"السياسة",text:"السياسة"},{depth:3,id:"لماذا-ثلاثة-بيانات-بدلا-من-بيان-واحد",text:"لماذا ثلاثة بيانات بدلًا من بيان واحد؟"},{depth:2,id:"شرح-البيان-تلو-البيان",text:"شرح البيان تلو البيان"},{depth:3,id:"البيان-1-allows3objectsync",text:"البيان 1: AllowS3ObjectSync"},{depth:3,id:"البيان-2-allows3listbucket",text:"البيان 2: AllowS3ListBucket"},{depth:3,id:"البيان-3-allowcloudfrontinvalidation",text:"البيان 3: AllowCloudFrontInvalidation"},{depth:2,id:"جولة-كاملة-في-cli",text:"جولة كاملة في CLI"},{depth:3,id:"إنشاء-المستخدم",text:"إنشاء المستخدم"},{depth:3,id:"إنشاء-مفاتيح-الوصول",text:"إنشاء مفاتيح الوصول"},{depth:3,id:"إنشاء-السياسة",text:"إنشاء السياسة"},{depth:3,id:"إرفاق-السياسة-بالمستخدم",text:"إرفاق السياسة بالمستخدم"},{depth:3,id:"تهيئة-ملف-تعريف-cli-لروبوت-النشر",text:"تهيئة ملف تعريف CLI لروبوت النشر"},{depth:3,id:"التحقق-من-الهوية",text:"التحقّق من الهوية"},{depth:3,id:"اختبار-رفض-الإجراءات-غير-المصرح-بها",text:"اختبار رفض الإجراءات غير المصرّح بها"},{depth:2,id:"هدف-إضافي-منع-صريح-على-deletebucket",text:"هدف إضافي: منع صريح على DeleteBucket"}],l=`<p>إليك السياسة الكاملة، وأوامر CLI لتوصيلها، وشرحًا لكل قرار. سأستعرض كل بيان حتى ترى المنطق، لا النتيجة النهائية فقط.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>تفصل السياسة بين أذونات مستوى الحاوية وأذونات مستوى الكائن، وهي حيلة IAM الأساسية التي تجعل التحكّم في وصول S3 يبدو أقل اعتباطية.</li>
<li>إذن CloudFront محدّد النطاق بتوزيع واحد، لذا يستطيع روبوت النشر تحديث الذاكرة المؤقتة التي يملكها فعلًا فقط.</li>
<li>فحص <code>get-caller-identity</code> الأخير يثبت أنك لم تُنشئ JSON لسياسة فحسب، بل أنشأت أصلًا يمكنه المصادقة ضمن الحدود التي أردتها.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن أردت نسخة AWS من آليات السياسات أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html">مرجع سياسات IAM بصيغة JSON</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/iam/create-policy.html">مرجع الأمر <code>aws iam create-policy</code></a> مفتوحين.</p>
</blockquote>
<h2 id="السياسة">السياسة</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>هذه السياسة متاحة باسم <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/deploy-bot-policy.json"><code>deploy-bot-policy.json</code></a> في مستودع Scratch Lab.</p>
</blockquote>
<p>أنشئ ملفًا باسم <code>deploy-bot-policy.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3ObjectSync&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:DeleteObject&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3ListBucket&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowCloudFrontInvalidation&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;cloudfront:CreateInvalidation&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="لماذا-ثلاثة-بيانات-بدلا-من-بيان-واحد">لماذا ثلاثة بيانات بدلًا من بيان واحد؟</h3>
<p>يمكنك دمج إجراءات S3 في بيان واحد مع كلا ARN للمورد، هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3Deploy&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:DeleteObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowCloudFrontInvalidation&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;cloudfront:CreateInvalidation&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تعمل النسختان بشكل متطابق. تقيّم AWS كل إجراء مقابل كل مورد في المصفوفات—فـ<code>s3:ListBucket</code> يطابق ARN الحاوية، و<code>s3:PutObject</code>/<code>s3:DeleteObject</code> يطابقان ARN الكائنات. والنسخة المدمجة أكثر إيجازًا. أما النسخة المفصولة فتجعل من الواضح أي إجراءات تخص أي موارد. وكلا النهجين مقبول؛ اختر ما يراه فريقك أكثر قابلية للقراءة.</p>
<p>نسخة البيانات الثلاث أكثر توثيقًا لذاتها قليلًا: كل Sid يخبرك بالضبط بما يخصّه ذلك القسم. وعندما تنمو السياسة إلى عشرة أو خمسة عشر بيانًا، فإن الوضوح الإضافي يغطّي كلفته.</p>
<h2 id="شرح-البيان-تلو-البيان">شرح البيان تلو البيان</h2>
<h3 id="البيان-1-allows3objectsync">البيان 1: AllowS3ObjectSync</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3ObjectSync&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:DeleteObject&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><strong><code>s3:PutObject</code></strong>—يطلبه <code>aws s3 sync</code> لتحميل الملفات الجديدة أو المتغيّرة.</li>
<li><strong><code>s3:DeleteObject</code></strong>—يطلبه <code>aws s3 sync --delete</code> لإزالة الملفات من S3 التي لم تعد موجودة في دليل البناء المحلي. وبدونه، تتراكم الملفات القديمة في حاويتك.</li>
<li><strong>المورد ينتهي بـ<code>/*</code></strong>—تعمل هذه الإجراءات على كائنات فردية داخل الحاوية، لا على الحاوية نفسها. ونمط البدل <code>/*</code> يطابق كل مفتاح كائن في الحاوية.</li>
</ul>
<p>ما لا تسمح به: <code>s3:GetObject</code> (قراءة الملفات مرة أخرى)، أو <code>s3:DeleteBucket</code> (حذف الحاوية نفسها)، أو أي إجراء S3 آخر. يستطيع روبوت النشر دفع الملفات وإزالة القديم منها. هذا كل شيء.</p>
<h3 id="البيان-2-allows3listbucket">البيان 2: AllowS3ListBucket</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3ListBucket&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><strong><code>s3:ListBucket</code></strong>—يطلبه <code>aws s3 sync</code> لمقارنة الدليل المحلي بما هو موجود بالفعل في الحاوية. وبدون إذن السرد، لا يستطيع sync تحديد الملفات التي يجب تحميلها أو حذفها.</li>
<li><strong>المورد بلا <code>/*</code></strong>—<code>ListBucket</code> عملية على مستوى الحاوية، لا على مستوى الكائن. ويشير ARN إلى الحاوية نفسها.</li>
</ul>
<p>هذا هو الفرق الذي يوقع الناس في الخطأ أكثر من غيره. وكما ورد في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>، فإن الخلط بين ARN الحاوية وARN الكائن هو السبب الأكثر شيوعًا لجلسات تصحيح «سياستي لا تعمل».</p>
<h3 id="البيان-3-allowcloudfrontinvalidation">البيان 3: AllowCloudFrontInvalidation</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowCloudFrontInvalidation&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;cloudfront:CreateInvalidation&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><strong><code>cloudfront:CreateInvalidation</code></strong>—يخبر CloudFront بإبطال النسخ المخزّنة مؤقتًا من ملفاتك في مواقع الحافة حول العالم حتى يرى المستخدمون أحدث نشر.</li>
<li><strong>المورد يستهدف توزيعًا واحدًا محدّدًا</strong>—لا يستطيع روبوت النشر إبطال ذاكرة إلا هذا التوزيع، ولا أي توزيع آخر في الحساب.</li>
<li><strong>لا منطقة في ARN</strong>—CloudFront خدمة عالمية، لذا فمقطع المنطقة في ARN فارغ (<code>::</code> بين <code>cloudfront</code> ومعرّف الحساب).</li>
</ul>
<p>ما لا تسمح به: <code>cloudfront:UpdateDistribution</code> (تغيير إعدادات التوزيع)، أو <code>cloudfront:DeleteDistribution</code> (إزالة التوزيع)، أو الإبطال على توزيعات أخرى. يستطيع روبوت النشر مسح الذاكرة المؤقتة. وانتهى الأمر.</p>
<h2 id="جولة-كاملة-في-cli">جولة كاملة في CLI</h2>
<p>إليك كل الأوامر بالتسلسل:</p>
<h3 id="إنشاء-المستخدم">إنشاء المستخدم</h3>
<pre><code class="language-bash">aws iam create-user \\
  --user-name deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="إنشاء-مفاتيح-الوصول">إنشاء مفاتيح الوصول</h3>
<pre><code class="language-bash">aws iam create-access-key \\
  --user-name deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>احفظ <code>AccessKeyId</code> و<code>SecretAccessKey</code> من الاستجابة.</p>
<h3 id="إنشاء-السياسة">إنشاء السياسة</h3>
<pre><code class="language-bash">aws iam create-policy \\
  --policy-name DeployBotPolicy \\
  --policy-document file://deploy-bot-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمّن الاستجابة ARN الخاص بالسياسة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Policy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;PolicyName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DeployBotPolicy&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;PolicyId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ANPAIOSFODNN7EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:policy/DeployBotPolicy&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DefaultVersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;v1&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AttachmentCount&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;IsAttachable&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;CreateDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T00:00:00Z&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إرفاق-السياسة-بالمستخدم">إرفاق السياسة بالمستخدم</h3>
<pre><code class="language-bash">aws iam attach-user-policy \\
  --user-name deploy-bot \\
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="تهيئة-ملف-تعريف-cli-لروبوت-النشر">تهيئة ملف تعريف CLI لروبوت النشر</h3>
<pre><code class="language-bash">aws configure --profile deploy-bot
</code></pre>
<p>أدخل معرّف مفتاح الوصول، ومفتاح الوصول السرّي، و<code>us-east-1</code>، و<code>json</code>.</p>
<h3 id="التحقق-من-الهوية">التحقّق من الهوية</h3>
<pre><code class="language-bash">aws sts get-caller-identity \\
  --profile deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقّعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;UserId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AIDAIOSFODNN7EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Account&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;123456789012&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:user/deploy-bot&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="اختبار-رفض-الإجراءات-غير-المصرح-بها">اختبار رفض الإجراءات غير المصرّح بها</h3>
<pre><code class="language-bash">aws iam list-users \\
  --profile deploy-bot \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقّع: خطأ <code>AccessDenied</code>. وهذا سلوك صحيح—فروبوت النشر لا يملك أذونات IAM. والسياسة تفعل بالضبط ما ينبغي.</p>
<h2 id="هدف-إضافي-منع-صريح-على-deletebucket">هدف إضافي: منع صريح على DeleteBucket</h2>
<p>إن كنت قد حاولت الهدف الإضافي بإضافة منع صريح لـ<code>s3:DeleteBucket</code>، فهذا ما يبدو عليه:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3ObjectSync&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:DeleteObject&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3ListBucket&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowCloudFrontInvalidation&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;cloudfront:CreateInvalidation&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DenyBucketDeletion&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Deny&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:DeleteBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بيان <code>DenyBucketDeletion</code> زائد تقنيًا هنا—فرُوبوت النشر لا يملك أي Allow لـ<code>s3:DeleteBucket</code>، فهو ممنوع ضمنًا بالفعل. لكن كما نوقش في <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ أقل امتياز</a>، تعمل بيانات المنع الصريح كـ<strong>حواجز أمان</strong>. فإن عدّل أحدهم هذه السياسة لاحقًا وأضاف <code>s3:*</code> إلى بيان Allow بالخطأ، فسيظل المنع الصريح يمنع حذف الحاوية. دفاع في العمق.</p>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,o as chapter,n as chapterTitle,c as default,p as headings,l as html,a as slug,t as title};
