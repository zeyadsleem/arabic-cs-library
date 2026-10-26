const s="kinney",p="aws",a="نشر تطبيقات الويب على AWS",n="s3-static-site-exercise",t="تمرين: نشر موقع ثابت على S3",e=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"جهز-موقعك-الثابت",text:"جهّز موقعك الثابت"},{depth:2,id:"أنشئ-الدلو",text:"أنشئ الدلو"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تعطيل-حظر-الوصول-العام",text:"تعطيل حظر الوصول العام"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تطبيق-سياسة-دلو",text:"تطبيق سياسة دلو"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"ارفع-ملفاتك",text:"ارفع ملفاتك"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تمكين-استضافة-المواقع-الثابتة",text:"تمكين استضافة المواقع الثابتة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"اعرض-موقعك",text:"اعرض موقعك"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تمكين-الإصدارات",text:"تمكين الإصدارات"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"نشر-تحديث",text:"نشر تحديث"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>لقد تعلمت الأجزاء المنفردة: إنشاء دلو، ورفع الملفات، وكتابة سياسة دلو، وتمكين استضافة المواقع الثابتة، وتهيئة الإصدارات. الآن اجمعها كلها. في هذا التمرين، ستنشر موقعًا ثابتًا كاملًا على S3 وتصل إليه في المتصفح.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا تحرّكت تسميات وحدة التحكم أثناء إنجازك هذا التمرين، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html">درس استضافة موقع ثابت على S3</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html">مرجع الأمر <code>aws s3 sync</code></a> مفتوحين. تغيّر AWS واجهة المستخدم أكثر مما تغيّر المفاهيم الأساسية.</p>
</blockquote>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>كل نشر للواجهة الأمامية هو في جوهره الشيء نفسه: خذ مخرجات البناء، وضعها في مكان يمكن الوصول إليه، ووجّه عنوان URL إليها. يخفي Vercel وNetlify هذه العملية خلف <code>git push</code>. وإنجازها يدويًا على S3 يعلّمك ما يحدث فعليًا تحت الغطاء—ويمنحك الأساس لخط الأنابيب الآلي الذي ستبنيه لاحقًا في هذه الدورة.</p>
<h2 id="جهز-موقعك-الثابت">جهّز موقعك الثابت</h2>
<p>أنشئ موقعًا ثابتًا بسيطًا على جهازك المحلي. لا تحتاج إلى إطار عمل—HTML وCSS وJavaScript العادية تكفي.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>هذه الملفات متاحة أيضًا في <a href="https://github.com/stevekinney/scratch-lab/tree/main/playground/build">مستودع Scratch Lab</a> إذا كنت تفضّل استنساخها بدلًا من إنشائها يدويًا.</p>
</blockquote>
<p>أنشئ مجلدًا باسم <code>build/</code> يحتوي هذه الملفات الثلاثة:</p>
<p><strong><code>build/index.html</code></strong></p>
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
<p><strong><code>build/styles.css</code></strong></p>
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
<p><strong><code>build/app.js</code></strong></p>
<pre><code class="language-javascript"><span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;timestamp&#x27;</span>).<span class="hljs-property">textContent</span> =
  <span class="hljs-string">&#x27;Page loaded at: &#x27;</span> + <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toLocaleTimeString</span>();
</code></pre>
<p><strong><code>build/error.html</code></strong></p>
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
<h2 id="أنشئ-الدلو">أنشئ الدلو</h2>
<p>أنشئ دلو S3. تذكّر أن أسماء الدلاء فريدة عالميًا—إذا كان <code>my-frontend-app-assets</code> محجوزًا، فأضف لاحقة فريدة.</p>
<pre><code class="language-bash">aws s3 mb s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّل <code>aws s3 ls --region us-east-1</code> وتأكد من ظهور دلوك في القائمة.</p>
<h2 id="تعطيل-حظر-الوصول-العام">تعطيل حظر الوصول العام</h2>
<p>بما أنك تستضيف موقعًا عامًا، فعطّل Block Public Access:</p>
<pre><code class="language-bash">aws s3api put-public-access-block \\
  --bucket my-frontend-app-assets \\
  --public-access-block-configuration \\
    <span class="hljs-string">&quot;BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false&quot;</span> \\
  --region us-east-1
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّل ما يلي وتأكد من أن الإعدادات الأربعة كلها <code>false</code>:</p>
<pre><code class="language-bash">aws s3api get-public-access-block \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="تطبيق-سياسة-دلو">تطبيق سياسة دلو</h2>
<p>طبّق سياسة دلو تسمح بالقراءة العامة:</p>
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
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّل <code>aws s3api get-bucket-policy --bucket my-frontend-app-assets --region us-east-1 --output json</code> وتأكد من أن السياسة مطبقة.</p>
<h2 id="ارفع-ملفاتك">ارفع ملفاتك</h2>
<p>زامن مجلد <code>build/</code> المحلي مع الدلو:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّل <code>aws s3 ls s3://my-frontend-app-assets/ --region us-east-1</code> وتأكد من رؤية الملفات الأربعة كلها: <code>index.html</code> و<code>styles.css</code> و<code>app.js</code> و<code>error.html</code>.</p>
<p>المخرجات المتوقعة:</p>
<pre><code>2026-03-18 12:00:00        456 app.js
2026-03-18 12:00:00        612 error.html
2026-03-18 12:00:00        534 index.html
2026-03-18 12:00:00        423 styles.css
</code></pre>
<h2 id="تمكين-استضافة-المواقع-الثابتة">تمكين استضافة المواقع الثابتة</h2>
<p>هيّئ الدلو لاستضافة المواقع الثابتة:</p>
<pre><code class="language-bash">aws s3 website s3://my-frontend-app-assets/ \\
  --index-document index.html \\
  --error-document error.html
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>شغّل ما يلي وتأكد من ضبط مستندي الفهرس والخطأ:</p>
<pre><code class="language-bash">aws s3api get-bucket-website \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
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
<p>افتح عنوان URL هذا في متصفحك (استبدل اسم دلوك الفعلي):</p>
<pre><code>http://my-frontend-app-assets.s3-website-us-east-1.amazonaws.com
</code></pre>
<p>ينبغي أن ترى صفحة «مرحبًا من S3» مع طابع زمني يعرض الوقت الحالي. ينبغي أن يكون CSS مطبّقًا (خلفية داكنة ونص موسّط) وينبغي أن يعمل JavaScript (يتحدّث الطابع الزمني في كل تحميل للصفحة).</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>تُحمَّل الصفحة وتعرض «مرحبًا من S3»</li>
<li>يُطبَّق CSS (خلفية داكنة ونص فاتح)</li>
<li>يظهر الطابع الزمني في الأسفل</li>
<li>الانتقال إلى مسار غير موجود (مثل <code>/nonexistent</code>) يعرض صفحة 404 المخصصة</li>
</ul>
<h2 id="تمكين-الإصدارات">تمكين الإصدارات</h2>
<p>مكّن الإصدارات لتكون محميًا من الكتابة فوق الملفات بالخطأ:</p>
<pre><code class="language-bash">aws s3api put-bucket-versioning \\
  --bucket my-frontend-app-assets \\
  --versioning-configuration Status=Enabled \\
  --region us-east-1
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<pre><code class="language-bash">aws s3api get-bucket-versioning \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Enabled&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="نشر-تحديث">نشر تحديث</h2>
<p>أجرِ تغييرًا على <code>build/index.html</code>—حدّث <code>&lt;h1&gt;</code> ليقول «مرحبًا من S3 (v2)». ثم أعد النشر:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>حدّث المتصفح. ينبغي أن ترى العنوان المحدّث. الآن اسرد إصدارات <code>index.html</code>:</p>
<pre><code class="language-bash">aws s3api list-object-versions \\
  --bucket my-frontend-app-assets \\
  --prefix <span class="hljs-string">&quot;index.html&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>ينبغي أن ترى نسختين من <code>index.html</code>—الأصلية والمحدّثة. وينبغي أن يكون حقل <code>IsLatest</code> في النسخة الأحدث <code>true</code>.</p>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong>نقطة نهاية الموقع تعيد <code>403 Forbidden</code>:</strong> أحد الأجزاء الثلاثة للاستضافة العامة مفقود. تحقق من Block Public Access، ثم سياسة الدلو، ثم تهيئة استضافة الموقع بهذا الترتيب.</li>
<li><strong>متصفحك يحمّل HTML بأنماط أو JavaScript معطوبة:</strong> إما أن الملفات لم تُزامَن من <code>build/</code> أو أن مفاتيح الكائنات لا تطابق أسماء الملفات المشار إليها في <code>index.html</code>.</li>
<li><strong>رفعت التحديث لكنك ما زلت ترى الصفحة القديمة:</strong> أعد تحميل المتصفح بقوة أو افتح الموقع في نافذة خاصة. مع استضافة المواقع المباشرة على S3، يكون التخزين المؤقت للمتصفح هو السبب عادةً.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف قاعدة دورة حياة</strong> تحذف الإصدارات غير الحالية بعد 7 أيام. تحقق منها بـ <code>get-bucket-lifecycle-configuration</code>.</li>
<li><strong>اختبر التراجع.</strong> نزّل النسخة السابقة من <code>index.html</code> باستخدام معرّف إصدارها، ثم أعد رفعها بـ <code>aws s3 cp</code>. تأكد من عودة الموقع إلى المحتوى الأصلي.</li>
<li><strong>أضف مجلدًا فرعيًا.</strong> أنشئ صفحة <code>build/about/index.html</code> وتأكد من أن الانتقال إلى <code>/about/</code> (بشرطة مائلة نهائية) يقدّم الصفحة.</li>
<li><strong>تحقق من أنواع المحتوى.</strong> شغّل <code>aws s3api head-object --bucket my-frontend-app-assets --key &quot;styles.css&quot; --region us-east-1 --output json</code> وتأكد من أن نوع المحتوى هو <code>text/css</code>.</li>
</ul>
<h2 id="التنظيف">التنظيف</h2>
<p>لا يمكن حذف دلو ذي إصدارات حتى تُزال كل نسخة كائن <strong>و</strong>كل علامة حذف. شغّل هاتين المرحلتين—واحدة للإصدارات وواحدة لعلامات الحذف—مع حمايات حتى لا يفشل دلو جديد لا يحتوي على شيء في إحدى القائمتين. ثم أزل الدلو:</p>
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
<p><strong>لماذا حمايات الصدفة</strong></p>
<p>يُرجع <code>list-object-versions</code> <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html">المصفوفتين <code>Versions</code> و<code>DeleteMarkers</code> منفصلتين</a> ويحذف أيًا من المفتاحين تمامًا عندما يكون فارغًا. استعلام <code>--query</code> يسترجع المفتاح المفقود يعطيك <code>null</code>، وتمرير <code>{&quot;Objects&quot;: null}</code> (أو <code>{&quot;Objects&quot;: []}</code>) إلى <code>delete-objects</code> يفشل في التحقق من المعاملات—فهو ليس عملية بلا أثر. تتخطى حمايات الصدفة الاستدعاء عندما لا يكون هناك شيء للحذف. تخطَّ أي مرحلة عندما <em>توجد</em> مدخلات وسيفشل <code>aws s3 rb</code> بـ <code>BucketNotEmpty</code>—فعلامات الحذف تُحتسب كائنات. إذا انتهى بك الأمر بأكثر من 1,000 مدخل من أي نوع، فستحتاج أيضًا إلى الترقيم: يحدّ <code>list-object-versions</code> كل استجابة عند 1,000.</p>
</blockquote>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:e,html:l};export{s as book,p as chapter,a as chapterTitle,c as default,e as headings,l as html,n as slug,t as title};
