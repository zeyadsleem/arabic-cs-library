const s="kinney",c="aws",n="نشر تطبيقات الويب على AWS",a="uploading-and-organizing-files",e="رفع الملفات وتنظيمها",t=[{depth:2,id:"نسخ-الملفات-باستخدام-aws-s3-cp",text:"نسخ الملفات باستخدام aws s3 cp"},{depth:2,id:"المزامنة-باستخدام-aws-s3-sync",text:"المزامنة باستخدام aws s3 sync"},{depth:3,id:"علم-delete",text:"علم --delete"},{depth:3,id:"العلمان-exclude-و-include",text:"العلَمان --exclude و--include"},{depth:2,id:"أنواع-المحتوى-مهمة",text:"أنواع المحتوى مهمة"},{depth:2,id:"تنظيم-الملفات-ببادئات-المفاتيح",text:"تنظيم الملفات ببادئات المفاتيح"},{depth:3,id:"سرد-الكائنات-حسب-البادئة",text:"سرد الكائنات حسب البادئة"},{depth:2,id:"الرفع-نفسه-باستخدام-sdk",text:"الرفع نفسه باستخدام SDK"},{depth:2,id:"الرفع-من-وحدة-التحكم",text:"الرفع من وحدة التحكم"},{depth:2,id:"سكربت-نشر",text:"سكربت نشر"}],p=`<p>لديك حاوية. والآن تحتاج إلى ملفات فيها. فهذه مخرجات <code>npm run build</code> الخاصة بك تذهب إلى السحابة—HTML وCSS وJavaScript والصور التي يتكوّن منها تطبيق الواجهة الأمامية. ويمنحك AWS CLI أمرين أساسيين لإدخال الملفات إلى S3: <code>aws s3 cp</code> لنسخ الملفات الفردية و<code>aws s3 sync</code> للحفاظ على تزامن دليل محلي وحاوية. كلاهما ضروري، ومعرفة متى تستخدم كلًّا منهما توفر عليك الوقت والنطاق الترددي.</p>
<p>إن أردت نسخة AWS من سطح الأوامر قريبة منك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html">دليل مستخدم Amazon S3</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html">مرجع الأمر <code>aws s3 sync</code></a> مفتوحين.</p>
<h2 id="نسخ-الملفات-باستخدام-aws-s3-cp">نسخ الملفات باستخدام <code>aws s3 cp</code></h2>
<p>يعمل أمر <code>cp</code> كما تتوقع—ينسخ ملفًا من مكان إلى آخر. ويمكنك النسخ من جهازك المحلي إلى S3، أو من S3 إلى جهازك، أو من موقع S3 إلى آخر.</p>
<p>ارفع ملفًا واحدًا:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">cp</span> ./build/index.html s3://my-frontend-app-assets/index.html \\
  --region us-east-1
</code></pre>
<p>ارفع دليلًا كاملًا بإضافة علم <code>--recursive</code>:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">cp</span> ./build/ s3://my-frontend-app-assets/ \\
  --recursive \\
  --region us-east-1
</code></pre>
<p>هذا ينسخ كل ملف في دليل <code>build/</code> المحلي إلى جذر حاوية S3، مع الحفاظ على بنية الدليل. وإذا كانت مخرجات بنائك تبدو هكذا:</p>
<pre><code>build/
├── index.html
├── assets/
│   ├── main.js
│   ├── main.css
│   └── logo.png
└── favicon.ico
</code></pre>
<p>ستحمل كائنات S3 الناتجة هذه المفاتيح:</p>
<ul>
<li><code>index.html</code></li>
<li><code>assets/main.js</code></li>
<li><code>assets/main.css</code></li>
<li><code>assets/logo.png</code></li>
<li><code>favicon.ico</code></li>
</ul>
<p>تذكّر: لا يوجد مجلد <code>assets/</code> حقيقي في S3. فالشرطة المائلة جزء من سلسلة المفتاح. لكن كل أداة—CLI ووحدة التحكم وSDK—تعامله كمجلد افتراضي، وفي الممارسة العملية هذا كل ما تحتاج معرفته.</p>
<h2 id="المزامنة-باستخدام-aws-s3-sync">المزامنة باستخدام <code>aws s3 sync</code></h2>
<p>أمر <code>sync</code> هو ما ستستخدمه للنشر. فعلى خلاف <code>cp</code>، لا يرفع إلا الملفات التي تغيّرت—يقارن أحجام الملفات وأختامها الزمنية بين دليلك المحلي والحاوية، ولا ينقل إلا الفروق.</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>شغّله بعد كل بناء ولن تُرفع إلا الملفات التي تغيّرت. وفي نشر نمطي غيّرت فيه بضعة مكوّنات، يعني هذا رفع حفنة من حزم JavaScript بدلًا من دليل البناء كله.</p>
<h3 id="علم-delete">علم <code>--delete</code></h3>
<p>افتراضيًا، لا يحذف <code>sync</code> من S3 الملفات التي لم تعد موجودة محليًا. فإذا أعدت تسمية ملف أو حذفت صفحة، تبقى النسخة القديمة في الحاوية. ويصلح علم <code>--delete</code> هذا:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete
</code></pre>
<p>هذا يجعل حاوية S3 مرآة دقيقة لدليل <code>build/</code> المحلي. فالملفات الموجودة في الحاوية وغير الموجودة محليًا تُحذف.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>يحذف علم <code>--delete</code> الكائنات من S3 نهائيًا. وإذا لم تكن النسخ المُصدَّرة مفعّلة (سنغطي هذا في <a href="https://stevekinney.com/courses/aws/s3-versioning-lifecycle-and-cost">النسخ المُصدَّرة ودورة الحياة والتكلفة في S3</a>)، فتلك الملفات قد ذهبت. تحقق دائمًا من أنك تزامن الدليل الصحيح قبل استخدام <code>--delete</code> في الإنتاج.</p>
</blockquote>
<h3 id="العلمان-exclude-و-include">العلَمان <code>--exclude</code> و<code>--include</code></h3>
<p>أحيانًا تريد مزامنة معظم مخرجات بنائك مع استثناء ملفات معينة—ربما ملف <code>.DS_Store</code> الذي يتركه macOS، أو <code>sourcemap</code> لا تريد أن يكون متاحًا للعامة:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete \\
  --exclude <span class="hljs-string">&quot;*.map&quot;</span> \\
  --exclude <span class="hljs-string">&quot;.DS_Store&quot;</span>
</code></pre>
<h2 id="أنواع-المحتوى-مهمة">أنواع المحتوى مهمة</h2>
<p>إليك المأزق الذي يعثر فيه كل مهندس واجهة أمامية في أول نشر له إلى S3: <strong>أنواع المحتوى</strong>. فعندما ترفع ملفًا إلى S3، يخمّن CLI نوع MIME بناءً على امتداد الملف. ويصيب في معظمها—<code>.html</code> تصبح <code>text/html</code>، و<code>.css</code> تصبح <code>text/css</code>، و<code>.js</code> تصبح <code>text/javascript</code>. لكنه لا يخمّن بشكل صحيح دائمًا، خصوصًا لصيغ ملفات أحدث مثل <code>.woff2</code> أو <code>.webp</code> أو <code>.mjs</code>.</p>
<p>إذا قدّمت S3 ملف JavaScript بنوع محتوى خاطئ، فسيرفض المتصفح تنفيذه. وسترى خطأً في وحدة التحكم مثل <code>Refused to execute script because its MIME type is not an executable MIME type</code>. لقد أمضيت وقتًا أطول مما أرغب في الاعتراف به في تصحيح هذه المشكلة نفسها.</p>
<p>يمكنك تعيين نوع المحتوى صراحةً عند الرفع:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">cp</span> ./build/assets/main.js s3://my-frontend-app-assets/assets/main.js \\
  --content-type <span class="hljs-string">&quot;application/javascript&quot;</span> \\
  --region us-east-1
</code></pre>
<p>وللرفع بالجملة، يمكنك الجمع بين <code>--exclude</code> و<code>--include</code> مع <code>--content-type</code> لمعالجة أنواع ملفات محددة:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --exclude <span class="hljs-string">&quot;*.js&quot;</span> \\
  --delete

aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --exclude <span class="hljs-string">&quot;*&quot;</span> \\
  --include <span class="hljs-string">&quot;*.js&quot;</span> \\
  --content-type <span class="hljs-string">&quot;application/javascript&quot;</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عمليًا، يعمل تخمين CLI لنوع MIME جيدًا مع أنواع ملفات الواجهة الأمامية الأكثر شيوعًا. وعادةً لا تحتاج إلى تجاوز أنواع المحتوى إلا في الحالات الحدية. لكن إذا حُمّل موقعك ولم يعمل JavaScript، فتحقق من نوع المحتوى أولًا—فغالبًا هو المشكلة.</p>
</blockquote>
<h2 id="تنظيم-الملفات-ببادئات-المفاتيح">تنظيم الملفات ببادئات المفاتيح</h2>
<p>لا تملك S3 مجلدات حقيقية، لكن <strong>بادئات المفاتيح</strong> تمنحك طريقة لتنظيم الكائنات تعمل جيدًا بما يكفي. ومعظم أدوات بناء الواجهة الأمامية تخرج الملفات أصلًا في بنية معقولة، وهذه البنية تتحول مباشرة إلى مفاتيح S3.</p>
<p>نمط شائع لنشر الواجهة الأمامية:</p>
<pre><code>my-frontend-app-assets/
├── index.html
├── assets/
│   ├── main.a1b2c3d4.js
│   ├── main.e5f6g7h8.css
│   └── vendor.i9j0k1l2.js
├── images/
│   ├── logo.png
│   └── hero.webp
└── fonts/
    ├── inter.woff2
    └── mono.woff2
</code></pre>
<p>أسماء الملفات المُجزّأة (<code>main.a1b2c3d4.js</code>) مهمة. فمعظم أدوات بناء الواجهة الأمامية (Vite وwebpack وNext.js) تضيف تجزئات محتوى إلى أسماء الملفات حتى تحمل الملفات الجديدة أسماء مختلفة عند نشر نسخة جديدة، فلا تتداخل الملفات القديمة المخزنة مؤقتًا. يُسمى هذا <strong>إبطال التخزين المؤقت</strong>، وهو يتناغم مع سلوك التخزين المؤقت في S3 وCloudFront.</p>
<h3 id="سرد-الكائنات-حسب-البادئة">سرد الكائنات حسب البادئة</h3>
<p>يمكنك سرد كل الكائنات تحت بادئة محددة:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">ls</span> s3://my-frontend-app-assets/assets/ \\
  --region us-east-1
</code></pre>
<p>أو الحصول على سرد مفصّل بأمر <code>s3api</code>:</p>
<pre><code class="language-bash">aws s3api list-objects-v2 \\
  --bucket my-frontend-app-assets \\
  --prefix <span class="hljs-string">&quot;assets/&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Contents&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;assets/main.a1b2c3d4.js&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Size&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">245678</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StorageClass&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;STANDARD&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;assets/main.e5f6g7h8.css&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Size&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34567</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StorageClass&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;STANDARD&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="الرفع-نفسه-باستخدام-sdk">الرفع نفسه باستخدام SDK</h2>
<p>سكربتات البناء وأدوات نشر التطبيقات بلا خادم والتطبيقات التي ترفع محتوى المستخدمين كلها تلجأ إلى SDK بدلًا من تنفيذ أوامر shell. وإليك مكافئات SDK للأوامر أعلاه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { readFile } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs/promises&#x27;</span>;
<span class="hljs-keyword">import</span> { S3Client, <span class="hljs-title class_">PutObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Upload</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-storage&#x27;</span>;

<span class="hljs-keyword">const</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-title function_">S3Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-comment">// Single-object upload (the SDK equivalent of \`aws s3 cp\`):</span>
<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;index.html&#x27;</span>,
    <span class="hljs-title class_">Body</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">readFile</span>(<span class="hljs-string">&#x27;./build/index.html&#x27;</span>),
    <span class="hljs-title class_">ContentType</span>: <span class="hljs-string">&#x27;text/html&#x27;</span>,
    <span class="hljs-title class_">CacheControl</span>: <span class="hljs-string">&#x27;public, max-age=60&#x27;</span>,
  }),
);

<span class="hljs-comment">// Streaming upload for large files — use @aws-sdk/lib-storage&#x27;s \`Upload\`</span>
<span class="hljs-comment">// helper, which handles multipart automatically once the body exceeds</span>
<span class="hljs-comment">// the part threshold. \`aws s3 cp\` does this implicitly for you.</span>
<span class="hljs-keyword">import</span> { createReadStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;
<span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Upload</span>({
  <span class="hljs-attr">client</span>: s3,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;assets/bundle.zip&#x27;</span>,
    <span class="hljs-title class_">Body</span>: <span class="hljs-title function_">createReadStream</span>(<span class="hljs-string">&#x27;./build/bundle.zip&#x27;</span>),
    <span class="hljs-title class_">ContentType</span>: <span class="hljs-string">&#x27;application/zip&#x27;</span>,
  },
}).<span class="hljs-title function_">done</span>();
</code></pre>
<p>لا يوجد في SDK مكافئ مباشر لـ <code>aws s3 sync</code>—فـ <code>sync</code> تسهيل على مستوى CLI يمشي عبر دليل، ويقارنه بالحاوية، ويصدر استدعاءات <code>PutObject</code>/<code>DeleteObject</code> لكل ملف. وإعادة إنتاجه بنفسك تعني جولة <code>fs.readdir</code> زائد <code>PutObjectCommand</code> لكل ملف تغيّر. وبالنسبة إلى سكربتات النشر، عادةً يكون تنفيذ <code>aws s3 sync</code> من Node أبسط من إعادة بناء منطق الفروق. ويفوز SDK عندما ترفع محتوى <em>التطبيق</em>—صور المستخدمين الرمزية، وتصديرات CSV، والتقارير المولّدة—ملفًا واحدًا في كل مرة.</p>
<h2 id="الرفع-من-وحدة-التحكم">الرفع من وحدة التحكم</h2>
<p>تعمل وحدة تحكم AWS جيدًا لرفع ملف أو ملفين أثناء التطوير. انتقل إلى S3، وانقر على حاويتك، وانقر «Upload»، واسحب ملفاتك إليها. بل تتيح لك وحدة التحكم تعيين البيانات الوصفية (بما في ذلك نوع المحتوى) لكل ملف.</p>
<p><img src="/arabic-cs-library/images/kinney/656328e94b299001.webp" alt="مربع حوار الرفع في S3 يعرض منطقة السحب والإفلات قبل إضافة أي ملفات."></p>
<p>بعد إفلات ملفاتك، يضعها مربع حوار الرفع في قائمة للمراجعة قبل أن تنقر <strong>Upload</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/d127b7280063626e.webp" alt="مربع حوار الرفع في S3 مع أربعة ملفات في القائمة: index.html وerror.html وstyles.css وapp.js."></p>
<p>بعد اكتمال الرفع، تعرض وحدة التحكم ملخص نجاح، ويمكنك رؤية الملفات الأربعة كلها مسرودة في علامة تبويب <strong>Objects</strong> الخاصة بالحاوية.</p>
<p><img src="/arabic-cs-library/images/kinney/ff975818d0c17a55.webp" alt="صفحة نجاح الرفع في S3 تؤكد رفع الملفات الأربعة بنجاح."></p>
<p><img src="/arabic-cs-library/images/kinney/92e1343b83f83889.webp" alt="علامة تبويب Objects في حاوية S3 تسرد index.html وerror.html وstyles.css وapp.js مع أحجامها وتواريخ آخر تعديل."></p>
<p>يمكنك أيضًا فحص كائن فردي للتحقق من نوع محتواه. انقر على أي ملف في علامة تبويب Objects لفتح صفحة تفاصيله، ثم مرّر إلى <strong>Metadata</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/a5732d18d33b3a95.webp" alt="صفحة تفاصيل كائن S3 للملف index.html تُظهر حقل البيانات الوصفية Content-Type معيَّنًا إلى text/html."></p>
<p>لكن لا تعتمد على وحدة التحكم في النشر. فهي بطيئة وعرضة للخطأ ويستحيل أتمتتها. وCLI هي الأداة الصحيحة لأي شيء ستفعله أكثر من مرة—ولاحقًا في هذه الدورة، ستؤتمت عملية النشر كاملة باستخدام CLI وGitHub Actions.</p>
<h2 id="سكربت-نشر">سكربت نشر</h2>
<p>إليك نمط نشر عملي يجمع ما تعلمته. بعد تشغيل بنائك، زامن المخرجات إلى S3:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Build the frontend</span>
npm run build

<span class="hljs-comment"># Sync to S3, removing old files</span>
aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete \\
  --exclude <span class="hljs-string">&quot;.DS_Store&quot;</span>
</code></pre>
<p>هذا نشر بأمرين. ليس أنيقًا تمامًا مثل <code>git push</code> إلى Vercel، لكن لديك تحكم كامل في ما يُرفع، وإلى أين يذهب، وكيف يُقدَّم. وعندما تضيف إبطال CloudFront إلى هذا السكربت في قسم CloudFront، ستحصل على خط أنابيب نشر يضاهي أي شيء تقدمه Vercel أو Netlify، إلا أنك تملك كل جزء منه.</p>
<p>ملفاتك في الحاوية، لكن لا أحد يراها بعد. فالحاوية مقفلة افتراضيًا مع تفعيل حظر الوصول العام. بعد ذلك، ستكتب <strong>سياسة حاوية</strong> تمنح وصول قراءة عامًا إلى أصولك الثابتة—وتفهم كيف ترتبط سياسات الحاويات بسياسات IAM التي كتبتها في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:e,headings:t,html:p};export{s as book,c as chapter,n as chapterTitle,l as default,t as headings,p as html,a as slug,e as title};
