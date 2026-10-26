const s="kinney",e="aws",n="نشر تطبيقات الويب على AWS",a="s3-versioning-lifecycle-and-cost",t="الإصدارات وقواعد دورة الحياة والكلفة",p=[{depth:2,id:"لماذا-تهم-الإصدارات",text:"لماذا تهمّ الإصدارات"},{depth:2,id:"تمكين-الإصدارات",text:"تمكين الإصدارات"},{depth:2,id:"العمل-مع-الإصدارات",text:"العمل مع الإصدارات"},{depth:2,id:"مشكلة-الكلفة",text:"مشكلة الكلفة"},{depth:2,id:"قواعد-دورة-الحياة",text:"قواعد دورة الحياة"},{depth:3,id:"إنشاء-قاعدة-دورة-حياة",text:"إنشاء قاعدة دورة حياة"},{depth:3,id:"قاعدة-أكثر-تقدما",text:"قاعدة أكثر تقدّمًا"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"فهم-أسعار-s3",text:"فهم أسعار S3"},{depth:2,id:"فئات-التخزين-في-لمحة",text:"فئات التخزين في لمحة"},{depth:2,id:"ما-الذي-بنيته",text:"ما الذي بنيته"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>لديك موقع ثابت عامل على S3. الآن تحتاج إلى حمايته. فكل عملية نشر تجريها تكتب فوق النسخة السابقة من ملفاتك. وإذا خرج بناء سيئ وأردت التراجع، فتلك الملفات القديمة قد اختفت. وإذا نفّذ شخص في فريقك بالخطأ <code>aws s3 sync --delete</code> على الدليل الخطأ، فكل شيء يختفي. (اسألني كيف أعرف.) <strong>الإصدارات</strong> تحلّ هذا بالاحتفاظ بكل إصدار من كل كائن في الحاوية، و<strong>قواعد دورة الحياة</strong> تمنع الإصدارات من رفع كلفة تخزينك.</p>
<p>إذا أردت مواد AWS المصدرية إلى جانب هذا الدرس، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html">دليل الإصدارات في S3</a> و<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html">مرجع قواعد دورة الحياة</a> و<a href="https://aws.amazon.com/s3/pricing/">صفحة أسعار Amazon S3</a> في متناول يدك.</p>
<h2 id="لماذا-تهم-الإصدارات">لماذا تهمّ الإصدارات</h2>
<p>بدون الإصدارات، S3 نظام «الكتابة الأخيرة تفوز». فعندما ترفع <code>index.html</code> جديدًا، يُستبدل القديم بصمت. وعندما تحذف <code>main.js</code>، يختفي نهائيًا. لا سلة محذوفات، ولا تراجع، ولا مطالبة «هل أنت متأكد؟».</p>
<p>مع تمكين <strong>الإصدارات</strong>، تحتفظ S3 بكل إصدار من كل كائن. ارفع <code>index.html</code> جديدًا، وتبقى النسخة القديمة موجودة، ويمكن الوصول إليها بمعرّف إصدارها. واحذف <code>index.html</code>، فتضيف S3 <strong>علامة حذف</strong> بدلًا من إزالة الكائن فعليًا—فتصبح النسخة الحالية غير مرئية، لكن كل الإصدارات السابقة ما زالت قابلة للاسترجاع.</p>
<p>هذه شبكة أمانك. نشر سيئ؟ تراجع إلى الإصدار السابق. حذف عرضي؟ أزل علامة الحذف. هل كتب شخص فوق الملف الخطأ؟ كل إصدار ما زال موجودًا.</p>
<pre><code>flowchart LR
    Upload[&quot;Upload index.html&quot;] --&gt; Current[&quot;Current version&quot;]
    NewUpload[&quot;Upload a newer index.html&quot;] --&gt; Noncurrent[&quot;Previous version becomes noncurrent&quot;]
    Delete[&quot;Delete the object&quot;] --&gt; Marker[&quot;Delete marker becomes current&quot;]
    Noncurrent --&gt; Retain[&quot;Retained for rollback&quot;]
    Retain --&gt; Rule[&quot;Lifecycle rule after N days&quot;]
    Rule --&gt; Expire[&quot;Expire or transition old versions&quot;]
</code></pre>
<h2 id="تمكين-الإصدارات">تمكين الإصدارات</h2>
<p>مكّن الإصدارات على حاويتك:</p>
<pre><code class="language-bash">aws s3api put-bucket-versioning \\
  --bucket my-frontend-app-assets \\
  --versioning-configuration Status=Enabled \\
  --region us-east-1
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-bucket-versioning \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>من هذه اللحظة فصاعدًا، يحصل كل كائن ترفعه على معرّف إصدار، والحذف أو الكتابة فوق كائن يحفظ الإصدارات السابقة.</p>
<p><img src="/arabic-cs-library/images/kinney/5889a482645e4824.webp" alt="تبويب خصائص حاوية S3 وهو يعرض حالة الإصدارات مضبوطة على Enabled مع شريط نجاح يؤكد التغيير."></p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا يمكن تعطيل الإصدارات بعد تمكينها—بل تعليقها فقط. وعند التعليق، تُخزّن الكائنات الجديدة بلا معرّفات إصدار، لكن الكائنات ذات الإصدارات تبقى. فإن مكّنت الإصدارات، فخطّط لإبقائها مفعّلة واستخدام قواعد دورة الحياة لإدارة الإصدارات القديمة. فتبديل الإصدارات تشغيلًا وإيقافًا يُنشئ خليطًا مربكًا من الكائنات ذات الإصدارات وغيرها.</p>
</blockquote>
<h2 id="العمل-مع-الإصدارات">العمل مع الإصدارات</h2>
<p>بعد تمكين الإصدارات ورفع ملف بضع مرات، يمكنك سرد كل الإصدارات:</p>
<pre><code class="language-bash">aws s3api list-object-versions \\
  --bucket my-frontend-app-assets \\
  --prefix <span class="hljs-string">&quot;index.html&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Versions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;VersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;3HL4kqtJvjVBH40Nrjfkd&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;IsLatest&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T14:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Size&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1234</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;VersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2LB2z3tPdN2aRFGhK0mRr&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;IsLatest&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Size&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1180</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لاسترجاع إصدار محدّد:</p>
<pre><code class="language-bash">aws s3api get-object \\
  --bucket my-frontend-app-assets \\
  --key <span class="hljs-string">&quot;index.html&quot;</span> \\
  --version-id <span class="hljs-string">&quot;2LB2z3tPdN2aRFGhK0mRr&quot;</span> \\
  --region us-east-1 \\
  index-previous.html
</code></pre>
<p>هذا ينزّل الإصدار الأقدم إلى ملف محلي يُسمى <code>index-previous.html</code>. ويمكنك فحصه، أو مقارنته بالإصدار الحالي، أو رفعه مجددًا للتراجع.</p>
<h2 id="مشكلة-الكلفة">مشكلة الكلفة</h2>
<p>الإصدارات رائعة للسلامة، لكن لها كلفة: كل إصدار من كل كائن يشغل مساحة تخزين. فإذا نشرت واجهتك الأمامية ثلاث مرات يوميًا وكان ناتج بنائك 50 MB، فذلك 150 MB من الكائنات ذات الإصدارات يوميًا—نحو 4.5 GB شهريًا. وبسعر S3 Standard (0.023 دولار لكل GB شهريًا)، فهذا نحو 0.10 دولار شهريًا. ليس كثيرًا.</p>
<p>لكن إذا كنت تعمل منذ سنة بلا قواعد دورة حياة، فلديك 54 GB من الإصدارات القديمة راكدة تكلّفك نحو 1.25 دولار شهريًا. ما زال ليس كثيرًا، لكن المبدأ مهم: البيانات غير المستخدمة لا ينبغي أن تتراكم إلى ما لا نهاية. وهنا تأتي قواعد دورة الحياة.</p>
<h2 id="قواعد-دورة-الحياة">قواعد دورة الحياة</h2>
<p><strong>قاعدة دورة الحياة</strong> تخبر S3 بما تفعله بالكائنات (أو الإصدارات القديمة من الكائنات) بعد عدد معيّن من الأيام. وأكثر إجراءين فائدة لنشر الواجهة الأمامية:</p>
<ol>
<li><strong>نقل</strong> الإصدارات القديمة إلى فئة تخزين أرخص</li>
<li><strong>إبطال</strong> (حذف) الإصدارات القديمة بعد عدد معيّن من الأيام</li>
</ol>
<p>بالنسبة إلى موقع ثابت، النهج العملي هو حذف الإصدارات غير الحالية بعد فترة استبقاء معقولة. فنادرًا ما تحتاج إلى التراجع أكثر من بضعة أيام.</p>
<h3 id="إنشاء-قاعدة-دورة-حياة">إنشاء قاعدة دورة حياة</h3>
<p>أنشئ ملف إعداد لدورة الحياة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Rules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ID&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DeleteOldVersions&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;NoncurrentVersionExpiration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;NoncurrentDays&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تسري هذه القاعدة على كل الكائنات في الحاوية (البادئة الفارغة تعني كل شيء) وتحذف الإصدارات غير الحالية بعد 30 يومًا. أما الإصدارات الحالية (الأحدث) فلا تتأثر بهذه القاعدة أبدًا.</p>
<p>في لوحة التحكم، يتيح لك نموذج <strong>Create lifecycle rule</strong> في تبويب <strong>Management</strong> في الحاوية إعداد القاعدة نفسها بصريًا—بإعطائها اسمًا، وضبط النطاق، واختيار إجراء الإبطال.</p>
<p><img src="/arabic-cs-library/images/kinney/ba8f9e97f183879a.webp" alt="نموذج S3 Create Lifecycle Rule وهو يعرض اسم القاعدة expire-old-versions وخيارات النطاق للتصفية حسب البادئة."></p>
<p>طبّقها:</p>
<pre><code class="language-bash">aws s3api put-bucket-lifecycle-configuration \\
  --bucket my-frontend-app-assets \\
  --lifecycle-configuration file://lifecycle.json \\
  --region us-east-1
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-bucket-lifecycle-configuration \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ثلاثون يومًا قيمة افتراضية معقولة لنشر الواجهة الأمامية. فتحصل على شهر كامل من إمكانية التراجع دون تكديس سنوات من الإصدارات القديمة. وإذا كان معدّل نشرك مرتفعًا وكنت واثقًا في خط أنابيب CI/CD، فيمكنك تقليله إلى 7 أو 14 يومًا.</p>
</blockquote>
<h3 id="قاعدة-أكثر-تقدما">قاعدة أكثر تقدّمًا</h3>
<p>إذا أردت توفير مزيد قبل الحذف، فيمكنك نقل الإصدارات القديمة إلى فئة تخزين أرخص أولًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Rules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ID&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ManageOldVersions&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;NoncurrentVersionTransitions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;NoncurrentDays&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;StorageClass&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;STANDARD_IA&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;NoncurrentVersionExpiration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;NoncurrentDays&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">90</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا ينقل الإصدارات غير الحالية إلى <strong>S3 Standard-IA</strong> (الوصول غير المتكرر) بعد 30 يومًا، ثم يحذفها بعد 90 يومًا. وتكلّف Standard-IA نحو 0.0125 دولار لكل GB شهريًا—نحو نصف سعر تخزين Standard. ولموقع واجهة أمامية، التوفير ضئيل، لكن النمط يستحق المعرفة عندما تدير حاويات ببيانات أكثر.</p>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  S3Client,
  <span class="hljs-title class_">PutBucketVersioningCommand</span>,
  <span class="hljs-title class_">PutBucketLifecycleConfigurationCommand</span>,
  <span class="hljs-title class_">ListObjectVersionsCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">const</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-title function_">S3Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutBucketVersioningCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-title class_">VersioningConfiguration</span>: { <span class="hljs-title class_">Status</span>: <span class="hljs-string">&#x27;Enabled&#x27;</span> },
  }),
);

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutBucketLifecycleConfigurationCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-title class_">LifecycleConfiguration</span>: {
      <span class="hljs-title class_">Rules</span>: [
        {
          <span class="hljs-attr">ID</span>: <span class="hljs-string">&#x27;expire-noncurrent-versions&#x27;</span>,
          <span class="hljs-title class_">Status</span>: <span class="hljs-string">&#x27;Enabled&#x27;</span>,
          <span class="hljs-title class_">Filter</span>: {},
          <span class="hljs-title class_">NoncurrentVersionTransitions</span>: [{ <span class="hljs-title class_">NoncurrentDays</span>: <span class="hljs-number">30</span>, <span class="hljs-title class_">StorageClass</span>: <span class="hljs-string">&#x27;STANDARD_IA&#x27;</span> }],
          <span class="hljs-title class_">NoncurrentVersionExpiration</span>: { <span class="hljs-title class_">NoncurrentDays</span>: <span class="hljs-number">90</span> },
        },
      ],
    },
  }),
);

<span class="hljs-comment">// Inspect every object version (including delete markers):</span>
<span class="hljs-keyword">const</span> versions = <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ListObjectVersionsCommand</span>({ <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span> }));
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(versions.<span class="hljs-property">Versions</span>, versions.<span class="hljs-property">DeleteMarkers</span>);
</code></pre>
<h2 id="فهم-أسعار-s3">فهم أسعار S3</h2>
<p>لأسعار S3 ثلاثة مكوّنات:</p>
<p><strong>التخزين.</strong> تدفع مقابل الحجم الإجمالي للبيانات المخزّنة. ويكلّف S3 Standard 0.023 دولار لكل GB شهريًا لأول 50 TB. ولتطبيق واجهة أمامية نموذجي بناتج بناء 50 MB وتاريخ إصدارات 30 يومًا، تكون كلفة التخزين الشهرية أقل بكثير من دولار واحد.</p>
<p><strong>الطلبات.</strong> تدفع لكل طلب. وتكلّف طلبات PUT وCOPY وPOST وLIST 0.005 دولار لكل 1,000 طلب. وتكلّف طلبات GET وSELECT 0.0004 دولار لكل 1,000 طلب. ولموقع ثابت بحركة مرور منخفضة إلى متوسطة، هذه بنسات.</p>
<p><strong>نقل البيانات.</strong> تدفع مقابل البيانات المنقولة من S3 إلى الإنترنت. وأول 100 GB شهريًا مجانية. وبعد ذلك، 0.09 دولار لكل GB للـ 10 TB التالية. ولمعظم مواقع الواجهة الأمامية، ستبقى داخل الفئة المجانية بسهولة—خصوصًا بمجرد وضع CloudFront أمام S3، لأن CloudFront يقدّم المحتوى المخبّأ من مواقعه الطرفية بدلًا من ضرب S3 مع كل طلب.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تتضمن فئة AWS المجانية 5 GB من تخزين S3 Standard، و20,000 طلب GET، و2,000 طلب PUT شهريًا للأشهر الاثني عشر الأولى. والمشروع الشخصي أو تمرين الدورة سيندرج بسهولة ضمن هذه الحدود.</p>
</blockquote>
<h2 id="فئات-التخزين-في-لمحة">فئات التخزين في لمحة</h2>
<p>تقدّم S3 عدة <strong>فئات تخزين</strong> بخصائص سعر ووصول مختلفة. ولنشر الواجهة الأمامية، ستستخدم S3 Standard حصريًا تقريبًا، لكن إليك المشهد:</p>
<table>
<thead>
<tr>
<th>فئة التخزين</th>
<th>الكلفة لكل GB/شهر</th>
<th>حالة الاستخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td>S3 Standard</td>
<td>$0.023</td>
<td>بيانات يُوصل إليها بكثرة (بناؤك الحالي)</td>
</tr>
<tr>
<td>S3 Standard-IA</td>
<td>$0.0125</td>
<td>وصول غير متكرر (الإصدارات القديمة)</td>
</tr>
<tr>
<td>S3 One Zone-IA</td>
<td>$0.01</td>
<td>غير متكرر، ولا حاجة إلى مرونة متعددة مناطق التوفر</td>
</tr>
<tr>
<td>S3 Glacier Flexible Retrieval</td>
<td>$0.0036</td>
<td>أرشفة (استرجاع يستغرق دقائق إلى ساعات)</td>
</tr>
<tr>
<td>S3 Glacier Deep Archive</td>
<td>$0.00099</td>
<td>أرشفة طويلة الأمد (استرجاع يستغرق ساعات)</td>
</tr>
</tbody>
</table>
<p>لهذه الدورة، تحتاج فقط إلى Standard وربما Standard-IA لانتقالات دورة الحياة. أما فئتا Glacier فلأحمال عمل الأرشفة التي لا تحتاج وصولًا سريعًا—لا لتقديم موقع.</p>
<h2 id="ما-الذي-بنيته">ما الذي بنيته</h2>
<p>في هذه المرحلة، لديك إعداد موقع S3 ثابت كامل:</p>
<ul>
<li>حاوية في <code>us-east-1</code> باسم فريد عالميًا</li>
<li>ملفات بناء مرفوعة عبر <code>aws s3 sync</code></li>
<li>سياسة حاوية تمنح وصول قراءة عامًا</li>
<li>استضافة موقع ثابت ممكّنة مع مستندي الفهرس والخطأ</li>
<li>إصدارات ممكّنة للحماية من الكتابة فوق الملفات عرضيًا</li>
<li>قاعدة دورة حياة لتنظيف الإصدارات القديمة بعد 30 يومًا</li>
</ul>
<p>هذا موقع عامل متاح للعامة. وهو HTTP فقط، ويُقدَّم من منطقة واحدة، ويستخدم عنوان URL قبيحًا لنقطة نهاية S3—لكنه يعمل. والأهم أنك الآن تفهم طبقة التخزين جيدًا بما يكفي لتتوقف عن التعامل معها كسحر.</p>
<p>التالي، ستنتقل إلى جانب النطاقات من القصة: كيف تتحكم في نطاق، وكيف يصبح Route 53 مرجعًا موثوقًا له، ولماذا يجب أن يوجد ذلك قبل أن يعمل التحقق من ACM بنظافة. ثم ستعود وتبني مسار الإنتاج فوق أساس S3 هذا.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>لا يمكن حذف حاوية ذات إصدارات حتى تُزال كل نسخة كائن <strong>و</strong>كل علامة حذف. نفّذ هاتين المرحلتين—واحدة للإصدارات وواحدة لعلامات الحذف—مع حماية بحيث لا تفشل حاوية جديدة فارغة من إحدى القائمتين. ثم أزل الحاوية:</p>
<pre><code class="language-bash"><span class="hljs-comment"># 1. Delete every non-current object version (skip if there are none)</span>
VERSIONS=$(aws s3api list-object-versions \\
  --bucket my-frontend-app-assets \\
  --output json \\
  --query <span class="hljs-string">&#x27;Versions[].{Key:Key,VersionId:VersionId}&#x27;</span>)
<span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$VERSIONS</span>&quot;</span> != <span class="hljs-string">&quot;null&quot;</span> ] &amp;&amp; [ <span class="hljs-string">&quot;<span class="hljs-variable">$VERSIONS</span>&quot;</span> != <span class="hljs-string">&quot;[]&quot;</span> ]; <span class="hljs-keyword">then</span>
  aws s3api delete-objects \\
    --bucket my-frontend-app-assets \\
    --delete <span class="hljs-string">&quot;{\\&quot;Objects\\&quot;: <span class="hljs-variable">$VERSIONS</span>}&quot;</span> \\
    --region us-east-1 \\
    --output json
<span class="hljs-keyword">fi</span>

<span class="hljs-comment"># 2. Delete every delete marker (skip if there are none)</span>
MARKERS=$(aws s3api list-object-versions \\
  --bucket my-frontend-app-assets \\
  --output json \\
  --query <span class="hljs-string">&#x27;DeleteMarkers[].{Key:Key,VersionId:VersionId}&#x27;</span>)
<span class="hljs-keyword">if</span> [ <span class="hljs-string">&quot;<span class="hljs-variable">$MARKERS</span>&quot;</span> != <span class="hljs-string">&quot;null&quot;</span> ] &amp;&amp; [ <span class="hljs-string">&quot;<span class="hljs-variable">$MARKERS</span>&quot;</span> != <span class="hljs-string">&quot;[]&quot;</span> ]; <span class="hljs-keyword">then</span>
  aws s3api delete-objects \\
    --bucket my-frontend-app-assets \\
    --delete <span class="hljs-string">&quot;{\\&quot;Objects\\&quot;: <span class="hljs-variable">$MARKERS</span>}&quot;</span> \\
    --region us-east-1 \\
    --output json
<span class="hljs-keyword">fi</span>

<span class="hljs-comment"># 3. Remove the now-empty bucket</span>
aws s3 rb s3://my-frontend-app-assets --region us-east-1
</code></pre>
<blockquote>
<p><strong>لماذا الحراسات في الصدفة</strong></p>
<p><code>aws s3api list-object-versions</code> <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html">يُرجع <code>Versions</code> و<code>DeleteMarkers</code> كمصفوفتين منفصلتين</a> ويحذف أيًّا من المفتاحين كليًا عندما يكون فارغًا—فـ <code>--query</code> الذي يجلب المفتاح المفقود يعيده كـ <code>null</code>. وتمرير <code>{&quot;Objects&quot;: null}</code> أو <code>{&quot;Objects&quot;: []}</code> إلى <code>delete-objects</code> يفشل بخطأ تحقّق من المعاملات، لا بعملية صامتة بلا أثر، لذا يجب على كل مرحلة فحص القائمة قبل استدعاء API. وتخطَّ أي مرحلة عندما <em>توجد</em> مدخلات وستفشل <code>aws s3 rb</code> بـ <code>BucketNotEmpty</code>: فعلامات الحذف تُحتسب كائنات. وإذا كانت حاويتك تضم أكثر من 1,000 إصدار أو علامة حذف، فستحتاج أيضًا إلى الترقيم الصفحي—فـ <code>list-object-versions</code> يحدّ كل استجابة عند 1,000 مدخل.</p>
</blockquote>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,e as chapter,n as chapterTitle,o as default,p as headings,l as html,a as slug,t as title};
