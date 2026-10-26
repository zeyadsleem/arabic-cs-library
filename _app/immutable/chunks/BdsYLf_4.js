const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="static-website-hosting-on-s3",t="استضافة موقع ثابت على S3",e=[{depth:2,id:"ما-الذي-تضيفه-استضافة-الموقع-الثابت",text:"ما الذي تضيفه استضافة الموقع الثابت"},{depth:2,id:"تفعيل-استضافة-الموقع-الثابت",text:"تفعيل استضافة الموقع الثابت"},{depth:2,id:"عنوان-نقطة-نهاية-الموقع",text:"عنوان نقطة نهاية الموقع"},{depth:2,id:"كيف-يعمل-مستند-الفهرس",text:"كيف يعمل مستند الفهرس"},{depth:2,id:"تهيئة-مستند-الخطأ-لتطبيقات-الصفحة-الواحدة",text:"تهيئة مستند الخطأ لتطبيقات الصفحة الواحدة"},{depth:2,id:"إنشاء-صفحة-خطأ",text:"إنشاء صفحة خطأ"},{depth:2,id:"جمع-كل-ذلك-معا",text:"جمع كل ذلك معًا"},{depth:2,id:"ما-الذي-لا-يمنحك-إياه-استضافة-s3",text:"ما الذي لا يمنحك إياه استضافة S3"}],o=`<p>لديك دلو S3 يحتوي على ملفات، وسياسة دلو تسمح بالقراءة العامة. لكن إذا انتقلت الآن إلى <code>https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/</code>، فستحصل على صفحة خطأ XML — لأن S3 لا يعرف أنك تريده أن يقدّم <code>index.html</code> عندما يصل أحدهم إلى عنوان الجذر. السبب أن السلوك الافتراضي لـ S3 هو تخزين الكائنات، لا استضافة الويب. ولتحويل دلوك إلى موقع فعلي، عليك تفعيل <strong>استضافة الموقع الثابت</strong>.</p>
<p>إذا أردت نسخة AWS الدقيقة من سير عمل استضافة الموقع، فإن <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html">درس S3 لاستضافة المواقع الثابتة</a> هو الدليل الرسمي.</p>
<blockquote>
<p><strong>نقطة تعلّم، وليست هدف الإنتاج</strong></p>
<p>هذا الدرس هو النسخة التي تُظهر لك «القطع» في الاستضافة الثابتة. يمنحك نقطة نهاية موقع حقيقية بسرعة، وهو أمر مفيد لفهم كيف يتصرف S3 كأصل ويب. لكنه ليس المعمارية النهائية التي تريد شحنها. لاحقًا ستضع CloudFront أمام دلو خاص وتُخرج الوصول المباشر إلى S3 من الصورة.</p>
</blockquote>
<h2 id="ما-الذي-تضيفه-استضافة-الموقع-الثابت">ما الذي تضيفه استضافة الموقع الثابت</h2>
<p>بدون استضافة الموقع الثابت، S3 مجرّد مخزن مفتاح-قيمة. تطلب مفتاحًا محددًا فتحصل على كائن محدد. تطلب مفتاحًا غير موجود فتحصل على خطأ XML. تطلب مسار الجذر فلا تحصل على شيء مفيد.</p>
<p>تفعيل استضافة الموقع الثابت يمنحك ثلاثة أشياء:</p>
<ol>
<li><strong>مستند فهرس</strong>—يقدّم S3 ملفًا افتراضيًا (عادةً <code>index.html</code>) عندما يطلب أحدهم مسارًا ينتهي بـ <code>/</code>. هذا هو السلوك الذي تتوقعه من أي خادم ويب.</li>
<li><strong>مستند خطأ</strong>—يقدّم S3 صفحة خطأ مخصّصة بدلًا من خطأ XML الافتراضي عندما لا يوجد المفتاح المطلوب.</li>
<li><strong>نقطة نهاية موقع</strong>—يمنحك S3 عنوانًا مخصّصًا يقدّم دلوك كموقع، مع تفعيل سلوك مستند الفهرس ومستند الخطأ.</li>
</ol>
<p>هذا هو الفرق بين «رفعت ملفات إلى تخزين سحابي» و«لديّ موقع ويب».</p>
<h2 id="تفعيل-استضافة-الموقع-الثابت">تفعيل استضافة الموقع الثابت</h2>
<p>يمكنك تفعيلها بأمر واحد في CLI:</p>
<pre><code class="language-bash">aws s3 website s3://my-frontend-app-assets/ \\
  --index-document index.html \\
  --error-document error.html
</code></pre>
<p>هذا كل شيء. أصبح دلوك الآن مهيّأ لتقديم <code>index.html</code> كمستند افتراضي، و<code>error.html</code> لأي أخطاء 404.</p>
<p>إذا أردت تحكّمًا أكبر أو احتجت إلى أتمتة ذلك في خط أنابيب، فاستخدم أمر <code>s3api</code> الأدنى مستوى:</p>
<pre><code class="language-bash">aws s3api put-bucket-website \\
  --bucket my-frontend-app-assets \\
  --website-configuration <span class="hljs-string">&#x27;{
    &quot;IndexDocument&quot;: {&quot;Suffix&quot;: &quot;index.html&quot;},
    &quot;ErrorDocument&quot;: {&quot;Key&quot;: &quot;error.html&quot;}
  }&#x27;</span> \\
  --region us-east-1
</code></pre>
<p>يمكنك التحقق من التهيئة:</p>
<pre><code class="language-bash">aws s3api get-bucket-website \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;IndexDocument&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Suffix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ErrorDocument&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;error.html&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>قبل التفعيل، يُظهر تبويب <strong>Properties</strong> أن <strong>استضافة الموقع الثابت</strong> في حالة <strong>معطّلة</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/94d36445f5bdcee0.webp" alt="يعرض تبويب Properties في دلو S3 استضافة الموقع الثابت معطّلة في أسفل الصفحة."></p>
<p>في وحدة التحكم، يعرض قسم <strong>Static website hosting</strong> في تبويب <strong>Properties</strong> نموذج التهيئة حيث تُدخل أسماء مستند الفهرس ومستند الخطأ.</p>
<p><img src="/arabic-cs-library/images/kinney/f8b0bee804de6d10.webp" alt="يعرض نموذج تعديل استضافة الموقع الثابت في S3 الميزةَ مفعّلة، مع تعيين مستند الفهرس إلى index.html ومستند الخطأ إلى error.html."></p>
<p>بعد الحفظ، يعرض القسم عنوان <strong>Bucket website endpoint</strong> الذي يمكنك فتحه في المتصفح.</p>
<p><img src="/arabic-cs-library/images/kinney/ce7d1cc0be53c9f2.webp" alt="يعرض تبويب Properties في دلو S3 استضافة الموقع الثابت مفعّلة، مع إظهار عنوان نقطة نهاية الموقع."></p>
<h2 id="عنوان-نقطة-نهاية-الموقع">عنوان نقطة نهاية الموقع</h2>
<p>بمجرد تفعيل استضافة الموقع الثابت، يمنحك S3 نقطة نهاية مخصّصة للموقع. يعتمد التنسيق على منطقتك:</p>
<pre><code>http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com
</code></pre>
<p>تستخدم بعض المناطق تنسيقًا مختلفًا قليلًا بنقطة بدلًا من شرطة:</p>
<pre><code>http://my-frontend-app-assets.s3-website.us-east-1.amazonaws.com
</code></pre>
<p>في <code>us-east-1</code>، التنسيق هو <code>s3-website-us-east-1</code> (بشرطة قبل اسم المنطقة).</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>نقاط نهاية مواقع S3 تدعم HTTP فقط، لا HTTPS. إذا حمّلت موقعك عبر عنوان موقع S3، فسيعرضه المتصفح على أنه «غير آمن». هذا أحد الأسباب الرئيسية التي تجعل مسار الإنتاج يضع CloudFront أمام الدلو — لأن CloudFront يمنحك HTTPS بشهادة ACM. في الوقت الحالي، HTTP كافٍ للاختبار والتطوير.</p>
</blockquote>
<blockquote>
<p><strong>نقطة نهاية الموقع مقابل نقطة نهاية REST</strong></p>
<p>يعرض S3 نقطتَي نهاية مختلفتين لكل دلو. <strong>نقطة نهاية الموقع</strong> (<code>bucket.s3-website-us-east-1.amazonaws.com</code>) هي ما تستخدمه في هذا الدرس — وهي تدعم مستندات الفهرس ومستندات الخطأ وإعادة التوجيه، لكن بلا HTTPS وبلا استدعاءات واجهة REST البرمجية من نوع <code>s3:GetObject</code>. أما <strong>نقطة نهاية REST</strong> (<code>bucket.s3.us-east-1.amazonaws.com</code>) فهي نقطة نهاية واجهة S3 الكاملة — تدعم HTTPS واستدعاءات SDK، لكنها لا تحترم تهيئة استضافة الموقع. عندما تربط CloudFront في <a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a>، ستستخدم <strong>نقطة نهاية REST</strong> كأصل (لا نقطة نهاية الموقع)، لأن CloudFront يتحدث واجهة REST. واستخدام النقطة الخاطئة هنا مصيدة شائعة — فمزيج CloudFront مع نقطة نهاية الموقع <em>يبدو</em> ناجحًا حتى تصل إلى OAC أو استجابات الخطأ المخصّصة، ثم يفشل بصمت.</p>
</blockquote>
<h2 id="كيف-يعمل-مستند-الفهرس">كيف يعمل مستند الفهرس</h2>
<p>مع تفعيل استضافة الموقع الثابت، يتعامل S3 مع طلبات الجذر والمجلدات بالطريقة التي تتوقعها من خادم ويب:</p>
<ul>
<li><strong><code>/</code></strong> يقدّم <code>index.html</code> من جذر الدلو</li>
<li><strong><code>/about/</code></strong> يقدّم <code>about/index.html</code> (إن وُجد)</li>
<li><strong><code>/about</code></strong> (بدون شرطة مائلة أخيرة) <strong>لا</strong> يُحلّ تلقائيًا إلى <code>about/index.html</code> — وهذا ما يفاجئ الناس</li>
</ul>
<p>النقطة الأخيرة مهمة. إذا كان لديك ملف بالمفتاح <code>about/index.html</code> وانتقل أحدهم إلى <code>/about</code> (بلا شرطة مائلة)، فسيعيد S3 رمز 404. الشرطة المائلة الأخيرة مهمة لأن S3 لا يبحث عن لاحقة مستند الفهرس إلا عندما ينتهي المسار بـ <code>/</code>. أعني، هذا منطقي بمجرد أن تتذكّر أن S3 ليس خادم ويب حقيقيًا — إنه تخزين كائنات يتظاهر بأنه كذلك.</p>
<p>في تطبيق صفحة واحدة حيث يحدث كل التوجيه في جهة العميل، هذا غير ذي صلة في الغالب — فلديك <code>index.html</code> واحد فقط في الجذر، وكل مسار لا يطابق ملفًا حقيقيًا يجب أن يسقط إلى مستند الخطأ (الذي تهيّئه ليكون <code>index.html</code> أيضًا). المزيد عن ذلك بعد قليل.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا كنت تنشر موقعًا ثابتًا متعدد الصفحات (لا تطبيق صفحة واحدة)، فتأكد من أن أداة البناء لديك تولّد ملفات <code>index.html</code> داخل كل مجلد. مثلًا، صفحة «about» يجب أن تكون في <code>about/index.html</code>، لا <code>about.html</code>. هذا يضمن أن يعمل <code>/about/</code> والروابط إلى المجلد بشكل صحيح.</p>
</blockquote>
<h2 id="تهيئة-مستند-الخطأ-لتطبيقات-الصفحة-الواحدة">تهيئة مستند الخطأ لتطبيقات الصفحة الواحدة</h2>
<p>إذا كنت تنشر تطبيق صفحة واحدة (React Router أو Vue Router أو ما شابه)، فأنت تحتاج أن يقدّم كل مسار غير مطابق ملف <code>index.html</code> كي يتولّاه الموجّه في جهة العميل. على Vercel أو Netlify تهيّئ ذلك بقاعدة <code>rewrites</code>. على S3 تضبط مستند الخطأ على <code>index.html</code>:</p>
<pre><code class="language-bash">aws s3 website s3://my-frontend-app-assets/ \\
  --index-document index.html \\
  --error-document index.html
</code></pre>
<p>الآن عندما ينتقل أحدهم إلى <code>/dashboard/settings</code> ولا يوجد كائن بهذا المفتاح، يقدّم S3 ملف <code>index.html</code> مع رمز حالة 404. يلتقطه الموجّه في جهة العميل ويعرض الصفحة الصحيحة.</p>
<p>لكن هناك مشكلة: لا يزال S3 يعيد رمز حالة HTTP 404، رغم أن المستخدم يرى صفحة سليمة. تفسّر محرّكات البحث وبعض الأدوات ذلك الرمز 404 على أنه صفحة معطوبة. وهذا سبب آخر لأهمية CloudFront في معمارية الإنتاج: يستطيع CloudFront إعادة رمز 200 مع الاستمرار في تقديم بديل تطبيق الصفحة الواحدة.</p>
<h2 id="إنشاء-صفحة-خطأ">إنشاء صفحة خطأ</h2>
<p>إذا لم تكن تبني تطبيق صفحة واحدة، فأنشئ صفحة خطأ مناسبة. صفحة <code>error.html</code> بسيطة:</p>
<pre><code class="language-html"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Page Not Found<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">
      <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">font-family</span>: -apple-system, BlinkMacSystemFont, <span class="hljs-string">&#x27;Segoe UI&#x27;</span>, sans-serif;
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">justify-content</span>: center;
        <span class="hljs-attribute">align-items</span>: center;
        <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f5f5f5</span>;
      }
      <span class="hljs-selector-class">.error</span> {
        <span class="hljs-attribute">text-align</span>: center;
      }
      <span class="hljs-selector-tag">h1</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">4rem</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
      }
      <span class="hljs-selector-tag">p</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.2rem</span>;
      }
      <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#0066cc</span>;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>404<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This page does not exist.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span>Go back home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre>
<p>ارفعها إلى الدلو:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">cp</span> ./error.html s3://my-frontend-app-assets/error.html \\
  --content-type <span class="hljs-string">&quot;text/html&quot;</span> \\
  --region us-east-1
</code></pre>
<h2 id="جمع-كل-ذلك-معا">جمع كل ذلك معًا</h2>
<p>هذا هو التسلسل الكامل للانتقال من الصفر إلى موقع عامل مستضاف على S3. إذا كنت تتابع من البداية، فقد أنجزت معظم هذه الخطوات بالفعل:</p>
<pre><code class="language-bash"><span class="hljs-comment"># 1. Create the bucket</span>
aws s3 mb s3://my-frontend-app-assets \\
  --region us-east-1

<span class="hljs-comment"># 2. Disable Block Public Access</span>
aws s3api put-public-access-block \\
  --bucket my-frontend-app-assets \\
  --public-access-block-configuration \\
    <span class="hljs-string">&quot;BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false&quot;</span> \\
  --region us-east-1

<span class="hljs-comment"># 3. Apply the bucket policy</span>
aws s3api put-bucket-policy \\
  --bucket my-frontend-app-assets \\
  --policy <span class="hljs-string">&#x27;{
    &quot;Version&quot;: &quot;2012-10-17&quot;,
    &quot;Statement&quot;: [
      {
        &quot;Sid&quot;: &quot;PublicReadGetObject&quot;,
        &quot;Effect&quot;: &quot;Allow&quot;,
        &quot;Principal&quot;: &quot;*&quot;,
        &quot;Action&quot;: &quot;s3:GetObject&quot;,
        &quot;Resource&quot;: &quot;arn:aws:s3:::my-frontend-app-assets/*&quot;
      }
    ]
  }&#x27;</span> \\
  --region us-east-1

<span class="hljs-comment"># 4. Enable static website hosting</span>
aws s3 website s3://my-frontend-app-assets/ \\
  --index-document index.html \\
  --error-document error.html

<span class="hljs-comment"># 5. Upload your files</span>
aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete
</code></pre>
<p>افتح <code>http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com</code> في متصفحك. يجب أن ترى موقعك.</p>
<h2 id="ما-الذي-لا-يمنحك-إياه-استضافة-s3">ما الذي لا يمنحك إياه استضافة S3</h2>
<p>استضافة المواقع الثابتة على S3 نقطة انطلاق، لا حلًا كاملًا. إليك ما ينقصك:</p>
<ul>
<li><strong>HTTPS</strong>—نقاط نهاية مواقع S3 تعمل بـ HTTP فقط. تحتاج إلى CloudFront وشهادة ACM من أجل HTTPS.</li>
<li><strong>الأداء العالمي</strong>—يقدّم S3 الملفات من منطقة واحدة. المستخدمون على الجانب الآخر من العالم يحصلون على زمن استجابة أعلى. أما CloudFront فيخزّن الملفات مؤقتًا في مواقع حافة حول العالم.</li>
<li><strong>نطاق مخصّص</strong>—نقطة نهاية موقع S3 ليست عنوانًا جميلًا. تحتاج إلى Route 53 (أو مزوّد DNS آخر) لاستخدام نطاقك الخاص.</li>
<li><strong>التحكم في التخزين المؤقت</strong>—يقدّم S3 الملفات بترويسات تخزين مؤقت افتراضية. أما CloudFront فيمنحك تحكمًا دقيقًا في سلوك التخزين المؤقت ومدد TTL.</li>
</ul>
<p>كل هذه الفجوات يسدّها بقية مسار الاستضافة الثابتة. S3 هو الأساس — المكان الذي تعيش فيه ملفاتك. أما التحكم في النطاق وACM وCloudFront وRoute 53 فهي الطبقات التي تحوّله إلى نشر بمستوى الإنتاج.</p>
<p>موقعك الآن حيّ على S3، لكن ماذا يحدث عندما تكتب فوق ملف بالخطأ أو تحذف شيئًا ما كان يجب حذفه؟ في الدرس التالي ستُفعّل <strong>الإصدارات</strong> للحماية من فقدان البيانات غير المقصود، وتُعدّ قواعد دورة الحياة لإدارة تكاليف التخزين، وتفهم كيف يعمل تسعير S3 حتى لا تكون هناك مفاجآت في فاتورتك.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:o};export{s as book,p as chapter,n as chapterTitle,l as default,e as headings,o as html,a as slug,t as title};
