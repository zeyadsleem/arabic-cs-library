const s="kinney",e="aws",n="نشر تطبيقات الويب على AWS",a="automating-deploys-with-aws-cli",l="أتمتة عمليات النشر باستخدام AWS CLI",t=[{depth:2,id:"الأمران-اللذان-تؤتمتهما",text:"الأمران اللذان تؤتمتهما"},{depth:2,id:"سكربت-النشر",text:"سكربت النشر"},{depth:2,id:"ما-الذي-يفعله-السكربت",text:"ما الذي يفعله السكربت"},{depth:2,id:"علامة-delete",text:"علامة --delete"},{depth:2,id:"الإبطال-الانتقائي-مقابل",text:"الإبطال الانتقائي مقابل /*"},{depth:2,id:"استراتيجيات-كسر-التخزين-المؤقت",text:"استراتيجيات كسر التخزين المؤقت"},{depth:3,id:"إصدار-سلاسل-الاستعلام",text:"إصدار سلاسل الاستعلام"},{depth:3,id:"أدلة-ذات-طوابع-زمنية",text:"أدلّة ذات طوابع زمنية"},{depth:2,id:"إضافة-خطوة-بناء",text:"إضافة خطوة بناء"},{depth:2,id:"إصدار-عمليات-النشر",text:"إصدار عمليات النشر"},{depth:2,id:"سكربت-نشر-قائم-على-sdk",text:"سكربت نشر قائم على SDK"}],p=`<p>تشغيل أمرين من أوامر CLI بعد كل عملية بناء لا بأس به في مشروع تعمل عليه في أصيل يوم سبت. لكنه ليس مقبولًا لفريق يشحن إلى الإنتاج. أنت تريد أمرًا واحدًا: <code>./deploy.sh</code>—ابنِ الموقع، وارفع الملفات، وأبطل صلاحية التخزين المؤقت، وانتهيت. يحوّل هذا الدرس عملية النشر اليدوية من <a href="https://stevekinney.com/courses/aws/full-static-pipeline">خط أنابيب الموقع الثابت الكامل</a> إلى سكربت نشر قابل للتكرار ويسهل نسخه ولصقه.</p>
<p>إن أردت الاطلاع على نسخة AWS من أسطح الأوامر الدقيقة أثناء قراءتك، فأبقِ <a href="https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html">مرجع الأمر <code>aws s3 sync</code></a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html">مرجع الأمر <code>aws cloudfront create-invalidation</code></a> مفتوحين.</p>
<h2 id="الأمران-اللذان-تؤتمتهما">الأمران اللذان تؤتمتهما</h2>
<p>أنت تعرف بالفعل العمليتين الأساسيتين من <a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكيات التخزين المؤقت وإبطال الصلاحية</a>:</p>
<ol>
<li><strong><code>aws s3 sync</code></strong>: ارفع مخرجات البناء إلى S3، مع إزالة الملفات التي لم تعد موجودة.</li>
<li><strong><code>aws cloudfront create-invalidation</code></strong>: أخبر CloudFront بإسقاط النسخ المخزّنة مؤقتًا حتى تلتقط مواقع الحافة الملفات الجديدة.</li>
</ol>
<p>يلفّ السكربت هذين الأمرين بمعالجة الأخطاء، وترويسات تخزين مؤقت متمايزة، وإخراج للحالة.</p>
<h2 id="سكربت-النشر">سكربت النشر</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>هذا السكربت متاح باسم <a href="https://github.com/stevekinney/scratch-lab/blob/main/deploy.sh"><code>deploy.sh</code></a> في مستودع Scratch Lab.</p>
</blockquote>
<p>احفظ هذا باسم <code>deploy.sh</code> في جذر مشروعك:</p>
<pre><code class="language-bash"><span class="hljs-meta">#!/usr/bin/env bash</span>
<span class="hljs-built_in">set</span> -euo pipefail

<span class="hljs-comment"># Configuration</span>
BUCKET=<span class="hljs-string">&quot;my-frontend-app-assets&quot;</span>
DISTRIBUTION_ID=<span class="hljs-string">&quot;E1A2B3C4D5E6F7&quot;</span>
REGION=<span class="hljs-string">&quot;us-east-1&quot;</span>
BUILD_DIR=<span class="hljs-string">&quot;./build&quot;</span>

<span class="hljs-comment"># Verify the build directory exists</span>
<span class="hljs-keyword">if</span> [ ! -d <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>&quot;</span> ]; <span class="hljs-keyword">then</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Error: Build directory &#x27;<span class="hljs-variable">$BUILD_DIR</span>&#x27; not found. Run your build command first.&quot;</span>
  <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Deploying to s3://<span class="hljs-variable">$BUCKET</span> from <span class="hljs-variable">$BUILD_DIR</span>...&quot;</span>

<span class="hljs-comment"># Step 1: Sync hashed assets with long-lived cache headers</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Uploading hashed assets...&quot;</span>
aws s3 <span class="hljs-built_in">sync</span> <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>/assets&quot;</span> <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>/assets&quot;</span> \\
  --cache-control <span class="hljs-string">&quot;public, max-age=31536000, immutable&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --delete \\
  --output json

<span class="hljs-comment"># Step 2: Upload index.html with a short cache TTL</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Uploading index.html...&quot;</span>
aws s3 <span class="hljs-built_in">cp</span> <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>/index.html&quot;</span> <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>/index.html&quot;</span> \\
  --cache-control <span class="hljs-string">&quot;public, max-age=60&quot;</span> \\
  --content-type <span class="hljs-string">&quot;text/html&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --output json

<span class="hljs-comment"># Step 3: Sync everything else (favicon, robots.txt, etc.) with default cache</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Uploading remaining files...&quot;</span>
aws s3 <span class="hljs-built_in">sync</span> <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>&quot;</span> <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>&quot;</span> \\
  --exclude <span class="hljs-string">&quot;assets/*&quot;</span> \\
  --exclude <span class="hljs-string">&quot;index.html&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --delete \\
  --output json

<span class="hljs-comment"># Step 4: Invalidate the CloudFront cache</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Creating CloudFront invalidation...&quot;</span>
INVALIDATION_ID=$(aws cloudfront create-invalidation \\
  --distribution-id <span class="hljs-string">&quot;<span class="hljs-variable">$DISTRIBUTION_ID</span>&quot;</span> \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --query <span class="hljs-string">&#x27;Invalidation.Id&#x27;</span> \\
  --output text)
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Invalidation created: <span class="hljs-variable">$INVALIDATION_ID</span>&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Deploy complete.&quot;</span>
</code></pre>
<p><em>ملاحظة:</em> تزيل علامة <code>--delete</code> الملفات القديمة المُجزّأة من S3 التي لم يعد بناؤك ينتجها.</p>
<p>اجعل السكربت قابلًا للتنفيذ:</p>
<pre><code class="language-bash"><span class="hljs-built_in">chmod</span> +x deploy.sh
</code></pre>
<p>شغّله:</p>
<pre><code class="language-bash">./deploy.sh
</code></pre>
<h2 id="ما-الذي-يفعله-السكربت">ما الذي يفعله السكربت</h2>
<p>يقسّم السكربت الرفع إلى ثلاث مراحل، لكل منها ترويسات <code>Cache-Control</code> مختلفة. وهذه هي استراتيجية التخزين المؤقت من <a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكيات التخزين المؤقت وإبطال الصلاحية</a> مطبَّقة على عملية النشر:</p>
<ol>
<li><strong>الأصول المُجزّأة</strong> (<code>/assets/*</code>): <code>max-age=31536000, immutable</code>. هذه هي مخرجات أداة التجميع لديك: <code>main.a1b2c3.js</code>، و<code>styles.d4e5f6.css</code>. تتغيّر أسماء الملفات عندما يتغيّر المحتوى، لذا يمكن تخزينها مؤقتًا إلى الأبد. وتوجّه تعليمة <code>immutable</code> المتصفحات إلى عدم إزعاج نفسها بإعادة التحقق.</li>
<li><strong><code>index.html</code></strong>: <code>max-age=60</code>. يجب أن تتحدث نقطة الدخول لديك بسرعة. ستون ثانية مدة قصيرة بما يكفي ليرى المستخدمون أحدث عملية نشر خلال دقيقة، وطويلة بما يكفي لاستيعاب ذُرى الزيارات.</li>
<li><strong>كل شيء آخر</strong>: <code>favicon.ico</code>، و<code>robots.txt</code>، و<code>manifest.json</code>، وأي شيء آخر في دليل البناء لديك. تستخدم هذه سلوك التخزين المؤقت الافتراضي في S3.</li>
</ol>
<h2 id="علامة-delete">علامة <code>--delete</code></h2>
<p>علامة <code>--delete</code> في <code>aws s3 sync</code> حاسمة. فبدونها تتراكم كل نسخة من كل أصل مُجزّأ في حاوية S3 لديك. وبعد بضعة أشهر، ستكون لديك آلاف الملفات اليتيمة: <code>main.a1b2c3.js</code>، و<code>main.d4e5f6.js</code>، و<code>main.g7h8i9.js</code>، كلها راقدة في S3، وكلها تكلّفك رسوم تخزين (ضئيلة جدًا، لكنها رسوم على أي حال).</p>
<p>مع <code>--delete</code>، يقارن <code>aws s3 sync</code> دليل البناء المحلي لديك بالحاوية، ويزيل أي شيء في الحاوية غير موجود في الدليل المحلي. وبذلك تُنظَّف الأصول المُجزّأة القديمة تلقائيًا.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تعني علامة <code>--delete</code> أن دليل البناء لديك هو مصدر الحقيقة. فإذا كان بناؤك ناقصًا أو معطوبًا، فستزيل <code>--delete</code> الملفات العاملة من S3 وتستبدلها بما يوجد في دليل البناء لديك. شغّل أمر البناء دائمًا قبل النشر. يتحقق السكربت من وجود دليل البناء، لكنه لا يستطيع التحقق من نجاح البناء.</p>
</blockquote>
<h2 id="الإبطال-الانتقائي-مقابل">الإبطال الانتقائي مقابل <code>/*</code></h2>
<p>يستخدم السكربت <code>--paths &quot;/*&quot;</code> لإبطال كل شيء. وهذه أبسط طريقة وتعمل جيدًا مع معظم المشاريع. لكن لديك خيارات:</p>
<p><strong>الإبطال الكامل</strong> (<code>/*</code>): يمسح كل كائن مخزّن مؤقتًا في جميع مواقع الحافة. ويُحتسب مسار إبطال واحدًا. وبعد إبطال <code>/*</code>، يكون الطلب التالي لأي ملف إخفاقًا في التخزين المؤقت.</p>
<pre><code class="language-bash">aws cloudfront create-invalidation \\
  --distribution-id E1A2B3C4D5E6F7 \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p><strong>الإبطال الانتقائي</strong>: أبطل صلاحية الملفات التي تغيّرت فعليًا فقط. وهو أدقّ جراحيًا، لكنه يتطلب منك معرفة الملفات التي تغيّرت.</p>
<pre><code class="language-bash">aws cloudfront create-invalidation \\
  --distribution-id E1A2B3C4D5E6F7 \\
  --paths <span class="hljs-string">&quot;/index.html&quot;</span> <span class="hljs-string">&quot;/manifest.json&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p><strong>متى تستخدم الإبطال الانتقائي</strong>: إذا كنت تنشر إلى موقع عالي الزيارات ولم يتغيّر معظم محتواك المخزّن مؤقتًا، فإن الإبطال الانتقائي يتجنب موجة من إخفاقات التخزين المؤقت لملفات ما تزال صالحة. وعمليًا، وبما أن أصولك المُجزّأة تحمل أسماء ملفات جديدة في كل عملية نشر على أي حال، فالملف الوحيد الذي يحتاج فعلًا إلى إبطال هو <code>index.html</code>. أما الأصول المُجزّأة القديمة فستنتهي صلاحيتها طبيعيًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>بالنسبة إلى معظم مشاريع الواجهة الأمامية، <code>/*</code> هو الخيار الصحيح. فأول 1,000 مسار إبطال شهريًا مجاني، و<code>/*</code> يُحتسب مسارًا واحدًا. أنت لا توفّر المال بكونك انتقائيًا—بل توفّر كفاءة التخزين المؤقت. وما لم تكن تتعامل مع ملايين الطلبات في الدقيقة، فإن إعادة ملء التخزين المؤقت بعد إبطال <code>/*</code> لا تُذكر.</p>
</blockquote>
<h2 id="استراتيجيات-كسر-التخزين-المؤقت">استراتيجيات كسر التخزين المؤقت</h2>
<p>يستخدم سكربت النشر بالفعل أكثر استراتيجيات كسر التخزين المؤقت فعالية: <strong>أسماء ملفات مُجزّأة</strong> للأصول و<strong>مدد TTL قصيرة</strong> لـ <code>index.html</code>. لكن هناك مقاربتين أخريين تستحقان الفهم:</p>
<h3 id="إصدار-سلاسل-الاستعلام">إصدار سلاسل الاستعلام</h3>
<p>ألحق سلسلة استعلام للإصدار بروابط الأصول: <code>main.js?v=202603181200</code>. يعامل CloudFront كل رابط فريد (بما في ذلك سلاسل الاستعلام، إذا كانت سياسة التخزين المؤقت تشملها) ككائن منفصل مخزّن مؤقتًا. وهذا يتجنب عمليات الإبطال تمامًا—فالرابط الجديد إخفاق في التخزين المؤقت بحكم التعريف.</p>
<p>المشكلة: سياسة <code>CachingOptimized</code> الافتراضية في CloudFront لا تشمل سلاسل الاستعلام في مفتاح التخزين المؤقت. وستحتاج إلى سياسة تخزين مؤقت مخصّصة. كما يجب أن تشير شيفرة HTML لديك إلى الروابط ذات الإصدار، ما يعني أن أداة البناء لديك يجب أن تحقن سلسلة الإصدار. أدوات التجميع الحديثة تُجزّئ أسماء الملفات بالفعل، وهي مقاربة أفضل لأن التجزئة قائمة على المحتوى لا على الوقت.</p>
<h3 id="أدلة-ذات-طوابع-زمنية">أدلّة ذات طوابع زمنية</h3>
<p>ارفع كل عملية نشر إلى دليل ذي إصدار: <code>s3://my-frontend-app-assets/v20260318/</code>. ووجّه CloudFront إلى أحدث إصدار. وهذا يمنحك تراجعًا فوريًا (ما عليك إلا توجيه CloudFront إلى الإصدار السابق) لكنه يضيف تعقيدًا إلى خط أنابيب النشر وبنية الحاوية لديك.</p>
<p>بالنسبة إلى معظم مشاريع الواجهة الأمامية، تمثّل أسماء الملفات المُجزّأة مع إبطال <code>/*</code> التوازن الصحيح بين البساطة والفعالية. وبصراحة، لم أحتج يومًا إلى أكثر من ذلك.</p>
<h2 id="إضافة-خطوة-بناء">إضافة خطوة بناء</h2>
<p>عمليًا، نادرًا ما تنشر دون أن تبني أولًا. إليك السكربت موسّعًا بخطوة بناء:</p>
<pre><code class="language-bash"><span class="hljs-meta">#!/usr/bin/env bash</span>
<span class="hljs-built_in">set</span> -euo pipefail

BUCKET=<span class="hljs-string">&quot;my-frontend-app-assets&quot;</span>
DISTRIBUTION_ID=<span class="hljs-string">&quot;E1A2B3C4D5E6F7&quot;</span>
REGION=<span class="hljs-string">&quot;us-east-1&quot;</span>
BUILD_DIR=<span class="hljs-string">&quot;./build&quot;</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Building...&quot;</span>
npm run build

<span class="hljs-keyword">if</span> [ ! -d <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>&quot;</span> ]; <span class="hljs-keyword">then</span>
  <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Error: Build did not produce &#x27;<span class="hljs-variable">$BUILD_DIR</span>&#x27; directory.&quot;</span>
  <span class="hljs-built_in">exit</span> 1
<span class="hljs-keyword">fi</span>

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Deploying to s3://<span class="hljs-variable">$BUCKET</span>...&quot;</span>

aws s3 <span class="hljs-built_in">sync</span> <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>/assets&quot;</span> <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>/assets&quot;</span> \\
  --cache-control <span class="hljs-string">&quot;public, max-age=31536000, immutable&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --delete \\
  --output json

aws s3 <span class="hljs-built_in">cp</span> <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>/index.html&quot;</span> <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>/index.html&quot;</span> \\
  --cache-control <span class="hljs-string">&quot;public, max-age=60&quot;</span> \\
  --content-type <span class="hljs-string">&quot;text/html&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --output json

aws s3 <span class="hljs-built_in">sync</span> <span class="hljs-string">&quot;<span class="hljs-variable">$BUILD_DIR</span>&quot;</span> <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>&quot;</span> \\
  --exclude <span class="hljs-string">&quot;assets/*&quot;</span> \\
  --exclude <span class="hljs-string">&quot;index.html&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --delete \\
  --output json

INVALIDATION_ID=$(aws cloudfront create-invalidation \\
  --distribution-id <span class="hljs-string">&quot;<span class="hljs-variable">$DISTRIBUTION_ID</span>&quot;</span> \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span> \\
  --query <span class="hljs-string">&#x27;Invalidation.Id&#x27;</span> \\
  --output text)
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Deploy complete. Invalidation: <span class="hljs-variable">$INVALIDATION_ID</span>&quot;</span>
</code></pre>
<p>يضمن <code>set -euo pipefail</code> في الأعلى أن يتوقف السكربت فورًا إذا فشل أي أمر. فإذا خرج <code>npm run build</code> بقيمة غير صفرية، لا يستمر النشر. وإذا فشل <code>aws s3 sync</code>، لا يعمل الإبطال. وهذا يمنع عمليات النشر الجزئية.</p>
<h2 id="إصدار-عمليات-النشر">إصدار عمليات النشر</h2>
<p>لأغراض التدقيق، قد ترغب في وسم كل عملية نشر. أضف هذا إلى سكربتك:</p>
<pre><code class="language-bash">DEPLOY_TIMESTAMP=$(<span class="hljs-built_in">date</span> -u +<span class="hljs-string">&quot;%Y-%m-%dT%H:%M:%SZ&quot;</span>)
GIT_SHA=$(git rev-parse --short HEAD 2&gt;/dev/null || <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;unknown&quot;</span>)

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Deploying commit <span class="hljs-variable">$GIT_SHA</span> at <span class="hljs-variable">$DEPLOY_TIMESTAMP</span>&quot;</span>
</code></pre>
<p>يمنحك هذا أثرًا في مخرجات الطرفية لديك. ولمزيد من التتبع الدائم، يمكنك كتابة بيان نشر إلى S3:</p>
<pre><code class="language-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;{\\&quot;commit\\&quot;: \\&quot;<span class="hljs-variable">$GIT_SHA</span>\\&quot;, \\&quot;timestamp\\&quot;: \\&quot;<span class="hljs-variable">$DEPLOY_TIMESTAMP</span>\\&quot;}&quot;</span> | \\
  aws s3 <span class="hljs-built_in">cp</span> - <span class="hljs-string">&quot;s3://<span class="hljs-variable">$BUCKET</span>/_deploy-manifest.json&quot;</span> \\
  --content-type <span class="hljs-string">&quot;application/json&quot;</span> \\
  --region <span class="hljs-string">&quot;<span class="hljs-variable">$REGION</span>&quot;</span>
</code></pre>
<p>الآن يمكنك دائمًا التحقق من الإصدار المنشور بجلب <code>https://example.com/_deploy-manifest.json</code>.</p>
<h2 id="سكربت-نشر-قائم-على-sdk">سكربت نشر قائم على SDK</h2>
<p>الفرق التي تعيش أصلًا في TypeScript تميل إلى تفضيل سكربت نشر قائم على Node على سكربت Bash—فمشاركة الأنواع مع بقية قاعدة الشيفرة أسهل، وهو يعمل بالطريقة نفسها على جهاز كل مطوّر دون غرائب <code>bash</code> / <code>zsh</code> / <code>fish</code>. إليك خط الأنابيب نفسه في TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// scripts/deploy.ts</span>
<span class="hljs-keyword">import</span> { readdir } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs/promises&#x27;</span>;
<span class="hljs-keyword">import</span> { createReadStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;
<span class="hljs-keyword">import</span> { join, relative } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;
<span class="hljs-keyword">import</span> {
  S3Client,
  <span class="hljs-title class_">PutObjectCommand</span>,
  <span class="hljs-title class_">DeleteObjectCommand</span>,
  <span class="hljs-title class_">ListObjectsV2Command</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CloudFrontClient</span>, <span class="hljs-title class_">CreateInvalidationCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-cloudfront&#x27;</span>;
<span class="hljs-keyword">import</span> mime <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;mime-types&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">BUCKET</span> = <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">DISTRIBUTION_ID</span> = <span class="hljs-string">&#x27;E1A2B3C4D5E6F7&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">BUILD_DIR</span> = <span class="hljs-string">&#x27;./build&#x27;</span>;

<span class="hljs-keyword">const</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-title function_">S3Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });
<span class="hljs-keyword">const</span> cloudfront = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CloudFrontClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span>* <span class="hljs-title function_">walk</span>(<span class="hljs-attr">dir</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">AsyncGenerator</span>&lt;<span class="hljs-built_in">string</span>&gt; {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">readdir</span>(dir, { <span class="hljs-attr">withFileTypes</span>: <span class="hljs-literal">true</span> })) {
    <span class="hljs-keyword">const</span> path = <span class="hljs-title function_">join</span>(dir, entry.<span class="hljs-property">name</span>);
    <span class="hljs-keyword">if</span> (entry.<span class="hljs-title function_">isDirectory</span>()) <span class="hljs-keyword">yield</span>* <span class="hljs-title function_">walk</span>(path);
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">yield</span> path;
  }
}

<span class="hljs-comment">// Upload every file with appropriate Cache-Control + Content-Type.</span>
<span class="hljs-keyword">const</span> localKeys = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;();
<span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> file <span class="hljs-keyword">of</span> <span class="hljs-title function_">walk</span>(<span class="hljs-variable constant_">BUILD_DIR</span>)) {
  <span class="hljs-keyword">const</span> key = <span class="hljs-title function_">relative</span>(<span class="hljs-variable constant_">BUILD_DIR</span>, file).<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/\\\\/g</span>, <span class="hljs-string">&#x27;/&#x27;</span>);
  localKeys.<span class="hljs-title function_">add</span>(key);
  <span class="hljs-keyword">const</span> isHashed = key.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;assets/&#x27;</span>);
  <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutObjectCommand</span>({
      <span class="hljs-title class_">Bucket</span>: <span class="hljs-variable constant_">BUCKET</span>,
      <span class="hljs-title class_">Key</span>: key,
      <span class="hljs-title class_">Body</span>: <span class="hljs-title function_">createReadStream</span>(file),
      <span class="hljs-title class_">ContentType</span>: mime.<span class="hljs-title function_">lookup</span>(file) || <span class="hljs-string">&#x27;application/octet-stream&#x27;</span>,
      <span class="hljs-title class_">CacheControl</span>: isHashed ? <span class="hljs-string">&#x27;public, max-age=31536000, immutable&#x27;</span> : <span class="hljs-string">&#x27;public, max-age=60&#x27;</span>,
    }),
  );
}

<span class="hljs-comment">// Delete anything in the bucket that&#x27;s no longer in the build directory.</span>
<span class="hljs-comment">// ListObjectsV2 returns at most 1000 keys per call — paginate.</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">continuationToken</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">do</span> {
  <span class="hljs-keyword">const</span> existing = <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListObjectsV2Command</span>({ <span class="hljs-title class_">Bucket</span>: <span class="hljs-variable constant_">BUCKET</span>, <span class="hljs-title class_">ContinuationToken</span>: continuationToken }),
  );
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> obj <span class="hljs-keyword">of</span> existing.<span class="hljs-property">Contents</span> ?? []) {
    <span class="hljs-keyword">if</span> (obj.<span class="hljs-property">Key</span> &amp;&amp; !localKeys.<span class="hljs-title function_">has</span>(obj.<span class="hljs-property">Key</span>)) {
      <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DeleteObjectCommand</span>({ <span class="hljs-title class_">Bucket</span>: <span class="hljs-variable constant_">BUCKET</span>, <span class="hljs-title class_">Key</span>: obj.<span class="hljs-property">Key</span> }));
    }
  }
  continuationToken = existing.<span class="hljs-property">IsTruncated</span> ? existing.<span class="hljs-property">NextContinuationToken</span> : <span class="hljs-literal">undefined</span>;
} <span class="hljs-keyword">while</span> (continuationToken);

<span class="hljs-keyword">await</span> cloudfront.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateInvalidationCommand</span>({
    <span class="hljs-title class_">DistributionId</span>: <span class="hljs-variable constant_">DISTRIBUTION_ID</span>,
    <span class="hljs-title class_">InvalidationBatch</span>: {
      <span class="hljs-title class_">CallerReference</span>: <span class="hljs-string">\`deploy-<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>\`</span>,
      <span class="hljs-title class_">Paths</span>: { <span class="hljs-title class_">Quantity</span>: <span class="hljs-number">1</span>, <span class="hljs-title class_">Items</span>: [<span class="hljs-string">&#x27;/*&#x27;</span>] },
    },
  }),
);
</code></pre>
<p>شغّله بـ <code>npx tsx scripts/deploy.ts</code>. خط الأنابيب متطابق—والاختيار بين نسخة Bash وهذه النسخة مسألة تفضيل المطوّر وحده.</p>
<p>سكربت النشر يعمل، لكن ما يزال عليك تشغيله يدويًا. في الخطوة التالية، ستنقل هذا إلى سير عمل GitHub Actions يعمل تلقائيًا عند كل دفعة إلى <code>main</code>، بما في ذلك كيفية مصادقة GitHub Actions مع AWS باستخدام OIDC بدلًا من مفاتيح وصول طويلة العمر.</p>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:l,headings:t,html:p};export{s as book,e as chapter,n as chapterTitle,o as default,t as headings,p as html,a as slug,l as title};
