const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="creating-and-configuring-a-bucket",t="إنشاء حاوية S3 وإعدادها",e=[{depth:2,id:"إنشاء-حاوية-باستخدام-cli",text:"إنشاء حاوية باستخدام CLI"},{depth:2,id:"اختيار-منطقة",text:"اختيار منطقة"},{depth:2,id:"فهم-حجب-الوصول-العام",text:"فهم حجب الوصول العام"},{depth:2,id:"التشفير-الافتراضي",text:"التشفير الافتراضي"},{depth:2,id:"قوائم-acl-معطلة-افتراضيا",text:"قوائم ACL معطّلة افتراضيًا"},{depth:2,id:"إنشاء-حاوية-باستخدام-api-منخفض-المستوى",text:"إنشاء حاوية باستخدام API منخفض المستوى"},{depth:2,id:"العملية-نفسها-باستخدام-aws-sdk-for-javascript-v3",text:"العملية نفسها باستخدام AWS SDK for JavaScript v3"},{depth:2,id:"التحقق-من-حاويتك",text:"التحقق من حاويتك"},{depth:2,id:"ما-لديك-حتى-الآن",text:"ما لديك حتى الآن"}],c=`<p>تعرف ما هو S3 وكيف تعمل الحاويات والكائنات. الآن حان وقت إنشاء واحدة. وبنهاية هذا الدرس، سيكون لديك حاوية S3 مهيّأة وجاهزة لاستيعاب ملفات موقعك الثابت. وسنستخدم AWS CLI لأنها الطريقة التي ستؤتمت بها هذا لاحقًا — فالنقر في لوحة التحكم مناسب للاستكشاف، لكنه لا يتوسّع.</p>
<p>إذا أردت نسخة AWS من قواعد الحاويات إلى جانب هذا الدرس، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html">دليل مستخدم Amazon S3</a> و<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">قواعد تسمية الحاويات</a> في متناول يدك.</p>
<h2 id="إنشاء-حاوية-باستخدام-cli">إنشاء حاوية باستخدام CLI</h2>
<p>أبسط طريقة لإنشاء حاوية هي أمر <code>aws s3 mb</code> (وmb اختصار «make bucket»):</p>
<pre><code class="language-bash">aws s3 mb s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>ينبغي أن ترى مخرجات مثل:</p>
<pre><code>make_bucket: my-frontend-app-assets
</code></pre>
<p>هذا كل شيء. لديك حاوية. وفي لوحة التحكم، يؤكد شريط نجاح أخضر إنشاء الحاوية وينقلك مباشرة إلى صفحة تفاصيلها.</p>
<p><img src="/arabic-cs-library/images/kinney/f86e1083ae581dca.webp" alt="صفحة تفاصيل حاوية S3 وهي تعرض شريط نجاح أخضر بعنوان Successfully created bucket في الأعلى مع اسم الحاوية والمنطقة."></p>
<p>لكن الافتراضيات التي طبّقتها AWS عليها تهم كثيرًا، وفهمها سينقذك من فئة من مشكلات التصحيح تؤرق كل قادم جديد إلى S3.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا حصلت على خطأ <code>BucketAlreadyExists</code>، فشخص آخر في العالم يملك اسم الحاوية ذلك بالفعل. تذكّر: أسماء الحاويات فريدة عالميًا عبر كل حسابات AWS. جرّب إضافة لاحقة فريدة مثل اسمك أو سلسلة عشوائية: <code>my-frontend-app-assets-jsmith-2026</code>.</p>
</blockquote>
<p>إذا كنت تفضّل إنشاء الحاوية عبر لوحة تحكم AWS، فإن نموذج Create Bucket يسأل عن الأمرين نفسهما: اسم ومنطقة.</p>
<p><img src="/arabic-cs-library/images/kinney/d07fadea87edd0d9.webp" alt="نموذج S3 Create Bucket وهو يعرض حقل اسم الحاوية مملوءًا بـ my-frontend-app-assets والمنطقة مضبوطة على US East (N. Virginia) us-east-1."></p>
<h2 id="اختيار-منطقة">اختيار منطقة</h2>
<p>نستخدم <code>us-east-1</code> في هذه الدورة، وثمة سبب عملي لذلك. فعندما تربط شهادة ACM بتوزيع CloudFront في النهاية، يجب توفير الشهادة في <code>us-east-1</code>. وتتطلب عدة خدمات AWS أخرى <code>us-east-1</code> لميزات محدّدة. وإبقاء حاوية S3 في المنطقة نفسها يبسّط كل شيء ويتجنّب تكاليف النقل بين المناطق.</p>
<p>ومع ذلك، يمكن أن توجد حاويات S3 في أي منطقة AWS. فإذا كان مستخدموك في أوروبا أساسًا، فقد تختار <code>eu-west-1</code>. وإن كانوا في آسيا، فـ <code>ap-northeast-1</code>. ولتطبيق إنتاجي، ينبغي أن تكون منطقة حاويتك قريبة من مستخدميك — أو، بدقة أكبر، قريبة من أصل CloudFront، لأن CloudFront سيكون ما يقدّم ملفاتك فعلًا.</p>
<p>يمكنك التحقق من منطقة حاويتك بعد الإنشاء:</p>
<pre><code class="language-bash">aws s3api get-bucket-location \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;LocationConstraint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>قيد الموقع <code>null</code> يعني <code>us-east-1</code> — وهي شذوذ تاريخي. وكل منطقة أخرى تُرجع اسمها كسلسلة نصية.</p>
<h2 id="فهم-حجب-الوصول-العام">فهم حجب الوصول العام</h2>
<p>كل حاوية S3 أُنشئت منذ أبريل 2023 لديها <strong>Block Public Access</strong> ممكّنًا افتراضيًا. وهذه أربعة إعدادات منفصلة، وجميعها مفعّلة:</p>
<ol>
<li><strong>BlockPublicAcls</strong> — يحجب تطبيق قوائم ACL العامة الجديدة</li>
<li><strong>IgnorePublicAcls</strong> — يتجاهل أي قوائم ACL عامة موجودة</li>
<li><strong>BlockPublicPolicy</strong> — يحجب سياسات الحاوية العامة الجديدة</li>
<li><strong>RestrictPublicBuckets</strong> — يقيّد الوصول لأي حاوية ذات سياسة عامة</li>
</ol>
<p>هذا يعني أن AWS تقول: «نفترض أنك لا تريد هذه الحاوية عامة إلا إذا أخبرتنا بخلاف ذلك صراحةً.» ولمعظم حالات استخدام S3، هذا صحيح تمامًا. وللاستضافة موقع ثابت، لديك مساران:</p>
<p><strong>المسار 1: CloudFront مع التحكم في الوصول إلى الأصل (موصى به).</strong> تُبقي Block Public Access ممكّنًا وتدع CloudFront يصل إلى الحاوية عبر آلية خاصة تسمى التحكم في الوصول إلى الأصل. وتبقى الحاوية خاصة، ويكون CloudFront الشيء الوحيد القادر على القراءة منها. وهذا مسار الإنتاج الذي ستبنيه بمجرد أن يبدأ قسم CloudFront.</p>
<p><strong>المسار 2: استضافة موقع S3 مباشرة.</strong> تعطّل بعض إعدادات Block Public Access وترفق سياسة حاوية تسمح بالقراءات العامة. وهذا أبسط في الإعداد وهو ما سنفعله في هذه الوحدة لترى الأجزاء المتحركة بوضوح. والمقابل أن أي شخص يملك عنوان URL لـ S3 يمكنه الوصول إلى ملفاتك مباشرة.</p>
<p>في هذه الوحدة، سنختار المسار 2 لأنه يعلّم الآليات بوضوح. تعامل معه كنسخة مختبرية من النشر، لا كخط النهاية. وستقيّد الحاوية بشكل صحيح بمجرد انتقالك إلى CloudFront والتحكم في الوصول إلى الأصل.</p>
<p>لفحص إعدادات Block Public Access الحالية:</p>
<pre><code class="language-bash">aws s3api get-public-access-block \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;PublicAccessBlockConfiguration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;BlockPublicAcls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;IgnorePublicAcls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;BlockPublicPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;RestrictPublicBuckets&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في لوحة التحكم، يعرض تبويب <strong>Permissions</strong> في الحاوية هذه الإعدادات الأربعة نفسها ضمن <strong>Block Public Access (bucket settings)</strong> — وكلها ممكّنة افتراضيًا.</p>
<p><img src="/arabic-cs-library/images/kinney/8f28109774ea5b57.webp" alt="تبويب S3 bucket Permissions وهو يعرض إعدادات Block Public Access مع تمكين الخيارات الأربعة كلها، وموسومة On في لوحة التحكم."></p>
<p>حين تكون مستعدًا لجعل الحاوية متاحة للعامة لاستضافة موقع ثابت، ستحتاج إلى تعطيل هذه الإعدادات. وسنفعل ذلك في <a href="https://stevekinney.com/courses/aws/bucket-policies-and-public-access">سياسات الحاويات والوصول العام</a>، بعد أن تفهم ما هي سياسة الحاوية فعلًا.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تعطّل Block Public Access حتى تفهم بالضبط ما تعرّضه. فالحاوية العامة المهيّأة بشكل خاطئ من أكثر حوادث الأمان شيوعًا في AWS. وكل بضعة أشهر، تتصدّر شركة الأخبار لأنها عرضت عن غير قصد حاوية S3 مليئة ببيانات العملاء. ولموقع ثابت فيه HTML وCSS وJavaScript، الوصول العام مقبول. أما لأي شيء يحتوي على بيانات مستخدمين أو مفاتيح API أو مستندات داخلية، فليس مقبولًا.</p>
</blockquote>
<h2 id="التشفير-الافتراضي">التشفير الافتراضي</h2>
<p>منذ يناير 2023، جميع حاويات S3 الجديدة لديها <strong>تشفير من جانب الخادم</strong> ممكّن افتراضيًا باستخدام مفاتيح مُدارة من Amazon S3 (SSE-S3). وهذا يعني أن كل كائن ترفعه يُشفّر تلقائيًا أثناء السكون. ولست بحاجة إلى ضبط أي شيء — إنه يعمل فقط.</p>
<p>ولموقع ثابت، هذا نظري في الغالب. فملفات HTML وJavaScript لديك عامة على أي حال، لذا لا يضيف تشفيرها أثناء السكون أمانًا ذا معنى. لكن من الجيد معرفة أن الافتراضي موجود، لأنه عندما تبدأ بتخزين بيانات خاصة (مثل رفعات المستخدمين أو حالة التطبيق)، يصبح التشفير أثناء السكون متطلبًا امتثاليًا تتولاه S3 نيابة عنك تلقائيًا.</p>
<p>يمكنك التحقق من إعداد التشفير:</p>
<pre><code class="language-bash">aws s3api get-bucket-encryption \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ServerSideEncryptionConfiguration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Rules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;ApplyServerSideEncryptionByDefault&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;SSEAlgorithm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AES256&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;BucketKeyEnabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="قوائم-acl-معطلة-افتراضيا">قوائم ACL معطّلة افتراضيًا</h2>
<p>استخدم S3 تاريخيًا <strong>قوائم التحكم في الوصول (ACLs)</strong> لإدارة الأذونات على الحاويات والكائنات. وقوائم ACL آلية قديمة، وتوصي AWS الآن باستخدام سياسات الحاويات بدلًا منها. ومنذ أبريل 2023، جميع الحاويات الجديدة لديها قوائم ACL معطّلة افتراضيًا — فالحاوية مضبوطة على «BucketOwnerEnforced»، ما يعني أن مالك الحاوية يملك كل الكائنات، ولا تأثير لقوائم ACL.</p>
<p>وهذا هو الافتراضي الصحيح. ولا ينبغي أن تحتاج إلى لمس قوائم ACL لأي شيء في هذه الدورة. فإن رأيت دروسًا قديمة أو إجابات Stack Overflow تخبرك بضبط ACL مثل <code>--acl public-read</code>، فتجاهلها. وبصراحة، كمية النصائح القديمة عن S3 المنتشرة هناك <em>جديرة بالملاحظة</em>. استخدم سياسات الحاويات بدلًا منها — فهي أكثر مرونة وأسهل في التدقيق.</p>
<h2 id="إنشاء-حاوية-باستخدام-api-منخفض-المستوى">إنشاء حاوية باستخدام API منخفض المستوى</h2>
<p>أمر <code>aws s3 mb</code> هو الطريق السريع. ولمزيد من التحكم، استخدم <code>aws s3api create-bucket</code>:</p>
<pre><code class="language-bash">aws s3api create-bucket \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Location&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/my-frontend-app-assets&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ولمناطق غير <code>us-east-1</code>، تحتاج إلى تضمين <code>--create-bucket-configuration</code>:</p>
<pre><code class="language-bash">aws s3api create-bucket \\
  --bucket my-frontend-app-assets \\
  --region us-west-2 \\
  --create-bucket-configuration LocationConstraint=us-west-2 \\
  --output json
</code></pre>
<p>وهذا شذوذ تاريخي آخر — فـ <code>us-east-1</code> هي منطقة S3 الأصلية ولا تتطلب قيد الموقع. وكل منطقة أخرى تتطلبه.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أنشأت الحاوية بالفعل باستخدام <code>aws s3 mb</code>، فلست بحاجة إلى إنشائها مرة أخرى باستخدام <code>s3api</code>. فالأمران ينشئان الحاوية نفسها — و<code>s3 mb</code> مجرّد غلاف أعلى مستوى حول <code>s3api create-bucket</code>.</p>
</blockquote>
<h2 id="العملية-نفسها-باستخدام-aws-sdk-for-javascript-v3">العملية نفسها باستخدام AWS SDK for JavaScript v3</h2>
<p>كل أمر CLI في هذه الدورة يقابل استدعاء SDK. يقرأ مهندسو الواجهات الأمامية CLI على أنه «عمل بنية تحتية» وSDK على أنه «عمل تطبيق» — لكنها العمليات نفسها بوسائل نقل مختلفة. وهذا مكافئ SDK v3 لكل ما سبق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  S3Client,
  <span class="hljs-title class_">CreateBucketCommand</span>,
  <span class="hljs-title class_">PutBucketEncryptionCommand</span>,
  <span class="hljs-title class_">PutPublicAccessBlockCommand</span>,
  <span class="hljs-title class_">HeadBucketCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">const</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-title function_">S3Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });
<span class="hljs-comment">// Credentials resolve via the default provider chain: env vars, ~/.aws/credentials,</span>
<span class="hljs-comment">// IAM role, SSO session, etc. Never hardcode keys in application code.</span>

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateBucketCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-comment">// us-east-1 is the only region where LocationConstraint must be omitted.</span>
  }),
);

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutPublicAccessBlockCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-title class_">PublicAccessBlockConfiguration</span>: {
      <span class="hljs-title class_">BlockPublicAcls</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">IgnorePublicAcls</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">BlockPublicPolicy</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">RestrictPublicBuckets</span>: <span class="hljs-literal">true</span>,
    },
  }),
);

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutBucketEncryptionCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-title class_">ServerSideEncryptionConfiguration</span>: {
      <span class="hljs-title class_">Rules</span>: [{ <span class="hljs-title class_">ApplyServerSideEncryptionByDefault</span>: { <span class="hljs-title class_">SSEAlgorithm</span>: <span class="hljs-string">&#x27;AES256&#x27;</span> } }],
    },
  }),
);

<span class="hljs-comment">// Verify — HeadBucketCommand throws if the bucket doesn&#x27;t exist or is forbidden.</span>
<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HeadBucketCommand</span>({ <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span> }));
</code></pre>
<p>تصل CLI وSDK إلى نقاط نهاية API نفسها. فإن استطعت كتابة أحدهما، استطعت كتابة الآخر — فالأشكال متطابقة.</p>
<h2 id="التحقق-من-حاويتك">التحقق من حاويتك</h2>
<p>لنتأكد من أن كل شيء يبدو صحيحًا. اسرد حاوياتك:</p>
<pre><code class="language-bash">aws s3api list-buckets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن ترى حاويتك في القائمة مع تاريخ إنشاء. ويمكنك أيضًا فحص الحاوية تحديدًا:</p>
<pre><code class="language-bash">aws s3api head-bucket \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>إذا عاد الأمر دون خطأ، فالحاوية موجودة ولديك وصول إليها. و404 تعني أن الحاوية غير موجودة؛ و403 تعني أنها موجودة لكنك لا تملك الإذن (وهو ما قد يحدث إن كان شخص آخر يملك حاوية بهذا الاسم، كما هو مشمول في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لديك</a>).</p>
<p><img src="/arabic-cs-library/images/kinney/25ee600050e1c3e3.webp" alt="قائمة S3 Buckets وهي تعرض حاوية my-frontend-app-assets المنشأة حديثًا مع تاريخ إنشائها ومنطقتها."></p>
<h2 id="ما-لديك-حتى-الآن">ما لديك حتى الآن</h2>
<p>لديك الآن حاوية S3 بـ:</p>
<ul>
<li>اسم فريد عالميًا</li>
<li>تشفير من جانب الخادم ممكّن (افتراضي)</li>
<li>Block Public Access ممكّن (افتراضي — سنعدّله لاحقًا)</li>
<li>قوائم ACL معطّلة (افتراضي — لن نغيّر هذا)</li>
<li>موطن في <code>us-east-1</code></li>
</ul>
<p>التالي، سترفع ملفات إلى هذه الحاوية وتتعلم كيف يعمل <code>aws s3 cp</code> و<code>aws s3 sync</code> — بما في ذلك المزالق المتعلقة بأنواع المحتوى التي توقع كل مهندس واجهات أمامية في المرة الأولى.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:c};export{s as book,p as chapter,n as chapterTitle,l as default,e as headings,c as html,a as slug,t as title};
