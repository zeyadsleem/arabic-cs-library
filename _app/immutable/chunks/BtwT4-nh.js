const s="kinney",e="aws",a="نشر تطبيقات الويب على AWS",n="s3-static-site-solution",t="الحل",p=[{depth:2,id:"لماذا-يعمل-هذا",text:"لماذا يعمل هذا"},{depth:2,id:"إنشاء-ملفات-الموقع-الثابت",text:"إنشاء ملفات الموقع الثابت"},{depth:2,id:"إنشاء-الحاوية",text:"إنشاء الحاوية"},{depth:2,id:"تعطيل-حجب-الوصول-العام",text:"تعطيل حجب الوصول العام"},{depth:2,id:"تطبيق-سياسة-الحاوية",text:"تطبيق سياسة الحاوية"},{depth:2,id:"رفع-الملفات",text:"رفع الملفات"},{depth:2,id:"تمكين-استضافة-الموقع-الثابت",text:"تمكين استضافة الموقع الثابت"},{depth:2,id:"اعرض-موقعك",text:"اعرض موقعك"},{depth:2,id:"تمكين-الإصدارات",text:"تمكين الإصدارات"},{depth:2,id:"نشر-تحديث-والتحقق-من-الإصدارات",text:"نشر تحديث والتحقق من الإصدارات"},{depth:2,id:"هدف-إضافي-إضافة-قاعدة-دورة-حياة",text:"هدف إضافي: إضافة قاعدة دورة حياة"},{depth:2,id:"هدف-إضافي-اختبار-التراجع",text:"هدف إضافي: اختبار التراجع"},{depth:2,id:"هدف-إضافي-التحقق-من-أنواع-المحتوى",text:"هدف إضافي: التحقق من أنواع المحتوى"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],l=`<p>هذا هو الحل الكامل لتمرين نشر موقع ثابت على S3. وكل أمر معروض مع ناتجه المتوقع لتتمكن من التحقق من كل خطوة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن تحرّكت تسميات لوحة التحكم أثناء أدائك هذا التمرين، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html">درس موقع S3 الثابت</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html">مرجع أمر <code>aws s3 sync</code></a> مفتوحين. فـ AWS تغيّر واجهة المستخدم أكثر مما تغيّر المفاهيم الأساسية.</p>
</blockquote>
<h2 id="لماذا-يعمل-هذا">لماذا يعمل هذا</h2>
<ul>
<li>تحوّل استضافة المواقع في S3 حاوية مليئة بالكائنات إلى أصل HTTP له سلوك مستند الفهرسة ومستند الخطأ.</li>
<li>سياسة الحاوية العامة للقراءة هي ما يجعل نقطة نهاية الموقع قابلة للاستخدام من متصفح؛ فالرفع وحده لا يكفي.</li>
<li>تمنحك الإصدارات مسار استرداد في اللحظة التي تكتب فوق <code>index.html</code>، ولهذا تنتمي إلى التمرين نفسه الذي فيه أول عملية نشر.</li>
</ul>
<h2 id="إنشاء-ملفات-الموقع-الثابت">إنشاء ملفات الموقع الثابت</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>هذه الملفات متاحة أيضًا في <a href="https://github.com/stevekinney/scratch-lab/tree/main/playground/build">مستودع Scratch Lab</a> إن كنت تفضّل استنساخها بدلًا من إنشائها يدويًا.</p>
</blockquote>
<p>أنشئ مجلد <code>build/</code> فيه أربعة ملفات:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p build
</code></pre>
<p>أنشئ <code>build/index.html</code>:</p>
<pre><code class="language-html"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>My S3 Static Site<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;styles.css&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello from S3<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This site is hosted entirely on Amazon S3.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;timestamp&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;app.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre>
<p>أنشئ <code>build/styles.css</code>:</p>
<pre><code class="language-css">* {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font-family</span>: -apple-system, BlinkMacSystemFont, <span class="hljs-string">&#x27;Segoe UI&#x27;</span>, sans-serif;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#0a0a0a</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#ededed</span>;
}

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">2rem</span>;
}

<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3rem</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1rem</span>;
}

<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.2rem</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">0.5rem</span>;
}
</code></pre>
<p>أنشئ <code>build/app.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;timestamp&#x27;</span>).<span class="hljs-property">textContent</span> =
  <span class="hljs-string">&#x27;Page loaded at: &#x27;</span> + <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toLocaleTimeString</span>();
</code></pre>
<p>أنشئ <code>build/error.html</code>:</p>
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
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#0a0a0a</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#ededed</span>;
      }
      <span class="hljs-selector-class">.error</span> {
        <span class="hljs-attribute">text-align</span>: center;
      }
      <span class="hljs-selector-tag">h1</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">4rem</span>;
      }
      <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#4a9eff</span>;
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
<h2 id="إنشاء-الحاوية">إنشاء الحاوية</h2>
<pre><code class="language-bash">aws s3 mb s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code>make_bucket: my-frontend-app-assets
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">ls</span> --region us-east-1
</code></pre>
<p>الناتج المتوقع (سيختلف التاريخ لديك):</p>
<pre><code>2026-03-18 12:00:00 my-frontend-app-assets
</code></pre>
<h2 id="تعطيل-حجب-الوصول-العام">تعطيل حجب الوصول العام</h2>
<pre><code class="language-bash">aws s3api put-public-access-block \\
  --bucket my-frontend-app-assets \\
  --public-access-block-configuration \\
    <span class="hljs-string">&quot;BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false&quot;</span> \\
  --region us-east-1
</code></pre>
<p>لا ينتج هذا الأمر أي مخرجات عند النجاح.</p>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-public-access-block \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;PublicAccessBlockConfiguration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;BlockPublicAcls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;IgnorePublicAcls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;BlockPublicPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;RestrictPublicBuckets&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="تطبيق-سياسة-الحاوية">تطبيق سياسة الحاوية</h2>
<pre><code class="language-bash">aws s3api put-bucket-policy \\
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
</code></pre>
<p>لا ينتج هذا الأمر أي مخرجات عند النجاح.</p>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-bucket-policy \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع (تُعاد السياسة كنص JSON داخل حقل <code>Policy</code>):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Policy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;Version\\&quot;:\\&quot;2012-10-17\\&quot;,\\&quot;Statement\\&quot;:[{\\&quot;Sid\\&quot;:\\&quot;PublicReadGetObject\\&quot;,\\&quot;Effect\\&quot;:\\&quot;Allow\\&quot;,\\&quot;Principal\\&quot;:\\&quot;*\\&quot;,\\&quot;Action\\&quot;:\\&quot;s3:GetObject\\&quot;,\\&quot;Resource\\&quot;:\\&quot;arn:aws:s3:::my-frontend-app-assets/*\\&quot;}]}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="رفع-الملفات">رفع الملفات</h2>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code>upload: build/app.js to s3://my-frontend-app-assets/app.js
upload: build/error.html to s3://my-frontend-app-assets/error.html
upload: build/index.html to s3://my-frontend-app-assets/index.html
upload: build/styles.css to s3://my-frontend-app-assets/styles.css
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">ls</span> s3://my-frontend-app-assets/ \\
  --region us-east-1
</code></pre>
<p>الناتج المتوقع (ستختلف الأحجام والتواريخ):</p>
<pre><code>2026-03-18 12:00:00         98 app.js
2026-03-18 12:00:00        587 error.html
2026-03-18 12:00:00        488 index.html
2026-03-18 12:00:00        374 styles.css
</code></pre>
<h2 id="تمكين-استضافة-الموقع-الثابت">تمكين استضافة الموقع الثابت</h2>
<pre><code class="language-bash">aws s3 website s3://my-frontend-app-assets/ \\
  --index-document index.html \\
  --error-document error.html
</code></pre>
<p>لا ينتج هذا الأمر أي مخرجات عند النجاح.</p>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-bucket-website \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;IndexDocument&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Suffix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ErrorDocument&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;error.html&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="اعرض-موقعك">اعرض موقعك</h2>
<p>افتح عنوان URL هذا في متصفحك:</p>
<pre><code>http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com
</code></pre>
<p>ويجب أن ترى:</p>
<ul>
<li>العنوان «Hello from S3» في وسط خلفية داكنة</li>
<li>النص «This site is hosted entirely on Amazon S3.»</li>
<li>طابعًا زمنيًا يبيّن وقت تحميل الصفحة</li>
</ul>
<p><img src="/arabic-cs-library/images/kinney/72c4395efa79b42b.webp" alt="متصفح يعرض موقع S3 الثابت المنشور، وفيه عنوان Hello from S3 على خلفية داكنة وطابع زمني لتحميل الصفحة."></p>
<p>اختبر صفحة الخطأ بالانتقال إلى مسار غير موجود:</p>
<pre><code>http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com/nonexistent
</code></pre>
<p>ويجب أن ترى صفحة 404 المخصّصة وفيها «This page does not exist.»</p>
<p>ويمكنك التحقق أيضًا باستخدام <code>curl</code>:</p>
<pre><code class="language-bash">curl -s http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com | <span class="hljs-built_in">head</span> -5
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code class="language-html"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

</code></pre>
<h2 id="تمكين-الإصدارات">تمكين الإصدارات</h2>
<pre><code class="language-bash">aws s3api put-bucket-versioning \\
  --bucket my-frontend-app-assets \\
  --versioning-configuration Status=Enabled \\
  --region us-east-1
</code></pre>
<p>لا ينتج هذا الأمر أي مخرجات عند النجاح.</p>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-bucket-versioning \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="نشر-تحديث-والتحقق-من-الإصدارات">نشر تحديث والتحقق من الإصدارات</h2>
<p>عدّل <code>build/index.html</code> وغيّر وسم <code>&lt;h1&gt;</code>:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello from S3 (v2)<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
</code></pre>
<p>أعد النشر:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>الناتج المتوقع (يُرفع الملف المتغيّر فقط):</p>
<pre><code>upload: build/index.html to s3://my-frontend-app-assets/index.html
</code></pre>
<p>تحقّق من أن الإصدارات حفظت النسختين:</p>
<pre><code class="language-bash">aws s3api list-object-versions \\
  --bucket my-frontend-app-assets \\
  --prefix <span class="hljs-string">&quot;index.html&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع (ستختلف معرّفات الإصدارات):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Versions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;VersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;3HL4kqtJvjVBH40Nrjfkd&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;IsLatest&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T14:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Size&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">493</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StorageClass&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;STANDARD&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;VersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2LB2z3tPdN2aRFGhK0mRr&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;IsLatest&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Size&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">488</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StorageClass&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;STANDARD&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>المدخل الأول (<code>IsLatest: true</code>) هو النسخة المحدّثة التي تحمل «Hello from S3 (v2)». أما المدخل الثاني فهو النسخة الأصلية.</p>
<h2 id="هدف-إضافي-إضافة-قاعدة-دورة-حياة">هدف إضافي: إضافة قاعدة دورة حياة</h2>
<p>أنشئ ملفًا اسمه <code>lifecycle.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Rules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ID&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DeleteOldVersions&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;NoncurrentVersionExpiration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;NoncurrentDays&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>طبّقه:</p>
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
<p>الناتج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Rules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ID&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DeleteOldVersions&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;NoncurrentVersionExpiration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;NoncurrentDays&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="هدف-إضافي-اختبار-التراجع">هدف إضافي: اختبار التراجع</h2>
<p>نزّل النسخة السابقة باستخدام معرّف إصدارها (استخدم معرّف الإصدار الفعلي من ناتج <code>list-object-versions</code>):</p>
<pre><code class="language-bash">aws s3api get-object \\
  --bucket my-frontend-app-assets \\
  --key <span class="hljs-string">&quot;index.html&quot;</span> \\
  --version-id <span class="hljs-string">&quot;2LB2z3tPdN2aRFGhK0mRr&quot;</span> \\
  --region us-east-1 \\
  index-old.html
</code></pre>
<p>أعد رفعها كنسخة حالية:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">cp</span> index-old.html s3://my-frontend-app-assets/index.html \\
  --region us-east-1
</code></pre>
<p>حدّث المتصفح — ويجب أن ترى العنوان الأصلي «Hello from S3» (بلا «(v2)»).</p>
<h2 id="هدف-إضافي-التحقق-من-أنواع-المحتوى">هدف إضافي: التحقق من أنواع المحتوى</h2>
<p>افحص نوع محتوى ملف CSS لديك:</p>
<pre><code class="language-bash">aws s3api head-object \\
  --bucket my-frontend-app-assets \\
  --key <span class="hljs-string">&quot;styles.css&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع (جزئيًا):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ContentType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/css&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ContentLength&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">374</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;LastModified&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يجب أن تكون قيمة <code>ContentType</code> هي <code>text/css</code>. وافحص ملف JavaScript بالطريقة نفسها — ويجب أن تكون <code>text/javascript</code>.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>لقد نشرت موقعًا ثابتًا على S3 مع:</p>
<ul>
<li>حاوية متاحة للعموم بسياسة حاوية</li>
<li>استضافة موقع ثابت بمستندي الفهرسة والخطأ</li>
<li>إصدارات مُمكّنة للحماية بالتراجع</li>
<li>قاعدة دورة حياة لتنظيف الإصدارات القديمة</li>
</ul>
<p>هذا هو الأساس الذي يبني عليه بقية مسار الاستضافة. وبعد ذلك، ستنتقل إلى التحكم في النطاق وسلطة DNS لتتمكن من التحقق من شهادة ACM بنظافة، ثم تضع CloudFront أمام هذه الحاوية لإضافة HTTPS والتخزين المؤقت العالمي على الحافة وسير عمل نشر سليم.</p>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,e as chapter,a as chapterTitle,c as default,p as headings,l as html,n as slug,t as title};
