const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",t="cloudfront-function-solution",a="الحل",o=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"دالة-ترويسات-الأمان",text:"دالة ترويسات الأمان"},{depth:3,id:"إنشاء-الدالة",text:"إنشاء الدالة"},{depth:3,id:"اختبار-الدالة",text:"اختبار الدالة"},{depth:2,id:"دالة-إعادة-التوجيه-القديمة",text:"دالة إعادة التوجيه القديمة"},{depth:3,id:"إنشاء-الدالة-1",text:"إنشاء الدالة"},{depth:3,id:"الاختبار-طلب-إلى-old-path",text:"الاختبار: طلب إلى /old-path"},{depth:3,id:"الاختبار-طلب-إلى-about-تمرير",text:"الاختبار: طلب إلى /about (تمرير)"},{depth:2,id:"نشر-الدالتين",text:"نشر الدالتين"},{depth:3,id:"التحقق-من-أن-كلتيهما-live",text:"التحقق من أن كلتيهما LIVE"},{depth:2,id:"الربط-بالتوزيع",text:"الربط بالتوزيع"},{depth:3,id:"الحصول-على-إعدادات-التوزيع-الحالية",text:"الحصول على إعدادات التوزيع الحالية"},{depth:3,id:"تحرير-إعدادات-التوزيع",text:"تحرير إعدادات التوزيع"},{depth:3,id:"تحديث-التوزيع",text:"تحديث التوزيع"},{depth:3,id:"انتظار-اكتمال-النشر",text:"انتظار اكتمال النشر"},{depth:2,id:"التحقق-في-بيئة-الإنتاج",text:"التحقق في بيئة الإنتاج"},{depth:3,id:"التحقق-من-ترويسات-الأمان",text:"التحقق من ترويسات الأمان"},{depth:3,id:"التحقق-من-إعادة-التوجيه",text:"التحقق من إعادة التوجيه"},{depth:3,id:"التحقق-من-تمرير-المسارات-الأخرى",text:"التحقق من تمرير المسارات الأخرى"},{depth:2,id:"هدف-إضافي-سياسة-أمان-المحتوى",text:"هدف إضافي: سياسة أمان المحتوى"},{depth:2,id:"هدف-إضافي-عمليات-إعادة-توجيه-متعددة",text:"هدف إضافي: عمليات إعادة توجيه متعددة"},{depth:2,id:"التنظيف",text:"التنظيف"}],e=`<p>هذا هو الحل الكامل لكل خطوة، بما في ذلك شيفرة الدالة، وكل أوامر CLI، والمخرجات المتوقعة في كل مرحلة.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من سلوك وقت التشغيل أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html">دليل CloudFront Functions</a> هو المرجع الرسمي.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>دوال طلب المشاهد (viewer-request) يمكنها تغيير التوجيه قبل أن تقرّر CloudFront ما تجلبه، ولهذا تنتمي عمليات إعادة التوجيه إلى هناك.</li>
<li>دوال استجابة المشاهد (viewer-response) يمكنها تعديل الترويسات أثناء الخروج، ما يجعلها المكان المناسب لترويسات الأمان.</li>
<li>النشر إلى <code>LIVE</code> وربط الدالة بالتوزيع هو الخطوة التشغيلية التي تحوّل شيفرة عاملة إلى سلوك حقيقي على الحافة.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>كل دوال CloudFront Functions من هذا التمرين متاحة كملفات مستقلة في <a href="https://github.com/stevekinney/scratch-lab/tree/main/cloudfront/functions">مستودع Scratch Lab</a>.</p>
</blockquote>
<h2 id="دالة-ترويسات-الأمان">دالة ترويسات الأمان</h2>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> response = event.<span class="hljs-property">response</span>;
  <span class="hljs-keyword">var</span> headers = response.<span class="hljs-property">headers</span>;

  headers[<span class="hljs-string">&#x27;strict-transport-security&#x27;</span>] = {
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;max-age=63072000; includeSubDomains; preload&#x27;</span>,
  };
  headers[<span class="hljs-string">&#x27;x-content-type-options&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;nosniff&#x27;</span> };
  headers[<span class="hljs-string">&#x27;x-frame-options&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;DENY&#x27;</span> };
  headers[<span class="hljs-string">&#x27;referrer-policy&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;strict-origin-when-cross-origin&#x27;</span> };

  <span class="hljs-keyword">return</span> response;
}
</code></pre>
<p><em>ملاحظة:</em> إن ضبط الخصائص على كائن <code>headers</code> الموجود يحافظ على أي ترويسات موجودة أصلًا.</p>
<h3 id="إنشاء-الدالة">إنشاء الدالة</h3>
<pre><code class="language-bash">aws cloudfront create-function \\
  --name security-headers \\
  --function-config <span class="hljs-string">&#x27;{&quot;Comment&quot;:&quot;Add security headers to all responses&quot;,&quot;Runtime&quot;:&quot;cloudfront-js-2.0&quot;}&#x27;</span> \\
  --function-code <span class="hljs-string">&#x27;function handler(event) { var response = event.response; var headers = response.headers; headers[&quot;strict-transport-security&quot;] = { value: &quot;max-age=63072000; includeSubDomains; preload&quot; }; headers[&quot;x-content-type-options&quot;] = { value: &quot;nosniff&quot; }; headers[&quot;x-frame-options&quot;] = { value: &quot;DENY&quot; }; headers[&quot;referrer-policy&quot;] = { value: &quot;strict-origin-when-cross-origin&quot; }; return response; }&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة (مختصرة):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Location&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://cloudfront.amazonaws.com/2020-05-31/function/security-headers&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ETag&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ETVPDKIKX0DER&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;FunctionSummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;security-headers&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;UNPUBLISHED&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;FunctionConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Comment&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Add security headers to all responses&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cloudfront-js-2.0&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;FunctionMetadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;FunctionARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:function/security-headers&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Stage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DEVELOPMENT&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ قيمة <code>ETag</code> — ستحتاجها للاختبار والنشر.</p>
<h3 id="اختبار-الدالة">اختبار الدالة</h3>
<pre><code class="language-bash">aws cloudfront test-function \\
  --name security-headers \\
  --if-match ETVPDKIKX0DER \\
  --event-object <span class="hljs-string">&#x27;{&quot;version&quot;:&quot;1.0&quot;,&quot;context&quot;:{&quot;eventType&quot;:&quot;viewer-response&quot;},&quot;viewer&quot;:{&quot;ip&quot;:&quot;0.0.0.0&quot;},&quot;request&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;uri&quot;:&quot;/&quot;,&quot;querystring&quot;:{},&quot;headers&quot;:{},&quot;cookies&quot;:{}},&quot;response&quot;:{&quot;statusCode&quot;:200,&quot;statusDescription&quot;:&quot;OK&quot;,&quot;headers&quot;:{&quot;content-type&quot;:{&quot;value&quot;:&quot;text/html&quot;}},&quot;cookies&quot;:{}}}&#x27;</span> \\
  --stage DEVELOPMENT \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع: تتضمن نتيجة الدالة ترويسات الأمان الأربعة <strong>و</strong> ترويسة <code>content-type</code> الأصلية:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TestResult&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;FunctionSummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;security-headers&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;UNPUBLISHED&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ComputeUtilization&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;12&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;FunctionOutput&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;response\\&quot;:{\\&quot;statusCode\\&quot;:200,\\&quot;statusDescription\\&quot;:\\&quot;OK\\&quot;,\\&quot;headers\\&quot;:{\\&quot;content-type\\&quot;:{\\&quot;value\\&quot;:\\&quot;text/html\\&quot;},\\&quot;strict-transport-security\\&quot;:{\\&quot;value\\&quot;:\\&quot;max-age=63072000; includeSubDomains; preload\\&quot;},\\&quot;x-content-type-options\\&quot;:{\\&quot;value\\&quot;:\\&quot;nosniff\\&quot;},\\&quot;x-frame-options\\&quot;:{\\&quot;value\\&quot;:\\&quot;DENY\\&quot;},\\&quot;referrer-policy\\&quot;:{\\&quot;value\\&quot;:\\&quot;strict-origin-when-cross-origin\\&quot;}},\\&quot;cookies\\&quot;:{}}}&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ينبغي أن تكون قيمة <code>ComputeUtilization</code> منخفضة (أقل بكثير من 100). إذا اقتربت من 100، فالدالة بطيئة جدًا.</p>
<h2 id="دالة-إعادة-التوجيه-القديمة">دالة إعادة التوجيه القديمة</h2>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;

  <span class="hljs-keyword">if</span> (request.<span class="hljs-property">uri</span> === <span class="hljs-string">&#x27;/old-path&#x27;</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">301</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Moved Permanently&#x27;</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-attr">location</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;/new-path&#x27;</span> },
      },
    };
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<h3 id="إنشاء-الدالة-1">إنشاء الدالة</h3>
<pre><code class="language-bash">aws cloudfront create-function \\
  --name legacy-redirect \\
  --function-config <span class="hljs-string">&#x27;{&quot;Comment&quot;:&quot;Redirect /old-path to /new-path&quot;,&quot;Runtime&quot;:&quot;cloudfront-js-2.0&quot;}&#x27;</span> \\
  --function-code <span class="hljs-string">&#x27;function handler(event) { var request = event.request; if (request.uri === &quot;/old-path&quot;) { return { statusCode: 301, statusDescription: &quot;Moved Permanently&quot;, headers: { location: { value: &quot;/new-path&quot; } } }; } return request; }&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>احفظ <code>ETag</code>.</p>
<h3 id="الاختبار-طلب-إلى-old-path">الاختبار: طلب إلى /old-path</h3>
<pre><code class="language-bash">aws cloudfront test-function \\
  --name legacy-redirect \\
  --if-match ETVPDKIKX0DER \\
  --event-object <span class="hljs-string">&#x27;{&quot;version&quot;:&quot;1.0&quot;,&quot;context&quot;:{&quot;eventType&quot;:&quot;viewer-request&quot;},&quot;viewer&quot;:{&quot;ip&quot;:&quot;0.0.0.0&quot;},&quot;request&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;uri&quot;:&quot;/old-path&quot;,&quot;querystring&quot;:{},&quot;headers&quot;:{&quot;host&quot;:{&quot;value&quot;:&quot;example.com&quot;}},&quot;cookies&quot;:{}}}&#x27;</span> \\
  --stage DEVELOPMENT \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع: استجابة 301 مع <code>location: /new-path</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TestResult&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;FunctionSummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;legacy-redirect&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;UNPUBLISHED&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ComputeUtilization&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;8&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;FunctionOutput&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;response\\&quot;:{\\&quot;statusCode\\&quot;:301,\\&quot;statusDescription\\&quot;:\\&quot;Moved Permanently\\&quot;,\\&quot;headers\\&quot;:{\\&quot;location\\&quot;:{\\&quot;value\\&quot;:\\&quot;/new-path\\&quot;}}}}&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="الاختبار-طلب-إلى-about-تمرير">الاختبار: طلب إلى /about (تمرير)</h3>
<pre><code class="language-bash">aws cloudfront test-function \\
  --name legacy-redirect \\
  --if-match ETVPDKIKX0DER \\
  --event-object <span class="hljs-string">&#x27;{&quot;version&quot;:&quot;1.0&quot;,&quot;context&quot;:{&quot;eventType&quot;:&quot;viewer-request&quot;},&quot;viewer&quot;:{&quot;ip&quot;:&quot;0.0.0.0&quot;},&quot;request&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;uri&quot;:&quot;/about&quot;,&quot;querystring&quot;:{},&quot;headers&quot;:{&quot;host&quot;:{&quot;value&quot;:&quot;example.com&quot;}},&quot;cookies&quot;:{}}}&#x27;</span> \\
  --stage DEVELOPMENT \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع: يمرّ الطلب دون تغيير — يحتوي <code>FunctionOutput</code> على كائن الطلب الأصلي مع <code>uri: &quot;/about&quot;</code>.</p>
<h2 id="نشر-الدالتين">نشر الدالتين</h2>
<pre><code class="language-bash">aws cloudfront publish-function \\
  --name security-headers \\
  --if-match ETVPDKIKX0DER \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-bash">aws cloudfront publish-function \\
  --name legacy-redirect \\
  --if-match ETVPDKIKX0DER \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>استبدل قيم <code>ETag</code> بالقيم التي تلقّيتها من خطوة الإنشاء (أو من أحدث عملية على كل دالة). كل عملية نشر تُرجع <code>ETag</code> جديدًا.</p>
<h3 id="التحقق-من-أن-كلتيهما-live">التحقق من أن كلتيهما LIVE</h3>
<pre><code class="language-bash">aws cloudfront describe-function \\
  --name security-headers \\
  --stage LIVE \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-bash">aws cloudfront describe-function \\
  --name legacy-redirect \\
  --stage LIVE \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن تُظهر كلتاهما <code>&quot;Stage&quot;: &quot;LIVE&quot;</code> في الاستجابة.</p>
<h2 id="الربط-بالتوزيع">الربط بالتوزيع</h2>
<h3 id="الحصول-على-إعدادات-التوزيع-الحالية">الحصول على إعدادات التوزيع الحالية</h3>
<pre><code class="language-bash">aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1 \\
  --output json &gt; dist-config.json
</code></pre>
<h3 id="تحرير-إعدادات-التوزيع">تحرير إعدادات التوزيع</h3>
<p>افتح <code>dist-config.json</code>. ابحث عن قسم <code>DefaultCacheBehavior</code> وأضف كتلة <code>FunctionAssociations</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;DefaultCacheBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;FunctionAssociations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;FunctionARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:function/legacy-redirect&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;EventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;viewer-request&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;FunctionARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:function/security-headers&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;EventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;viewer-response&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تُغلّف استجابة <code>get-distribution-config</code> الإعدادات في مفتاح <code>DistributionConfig</code> وتتضمن ترويسة <code>ETag</code>. حين تمرّر الإعدادات إلى <code>update-distribution</code>، فأنت تحتاج كائن <code>DistributionConfig</code> الداخلي (لا الغلاف الخارجي) وقيمة <code>ETag</code> كقيمة <code>--if-match</code>.</p>
</blockquote>
<h3 id="تحديث-التوزيع">تحديث التوزيع</h3>
<pre><code class="language-bash">aws cloudfront update-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --if-match ETAG_FROM_GET \\
  --distribution-config file://dist-config.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="انتظار-اكتمال-النشر">انتظار اكتمال النشر</h3>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1
</code></pre>
<p>يحجب هذا الأمر التنفيذ حتى تتغيّر حالة التوزيع من <code>InProgress</code> إلى <code>Deployed</code>. قد يستغرق بضع دقائق.</p>
<h2 id="التحقق-في-بيئة-الإنتاج">التحقق في بيئة الإنتاج</h2>
<h3 id="التحقق-من-ترويسات-الأمان">التحقق من ترويسات الأمان</h3>
<pre><code class="language-bash">curl -I https://d111111abcdef8.cloudfront.net/
</code></pre>
<p>الترويسات المتوقعة في الاستجابة:</p>
<pre><code>HTTP/2 200
content-type: text/html
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
</code></pre>
<h3 id="التحقق-من-إعادة-التوجيه">التحقق من إعادة التوجيه</h3>
<pre><code class="language-bash">curl -I https://d111111abcdef8.cloudfront.net/old-path
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/2 301
location: /new-path
</code></pre>
<h3 id="التحقق-من-تمرير-المسارات-الأخرى">التحقق من تمرير المسارات الأخرى</h3>
<pre><code class="language-bash">curl -I https://d111111abcdef8.cloudfront.net/about
</code></pre>
<p>المتوقع: استجابة 200 عادية (أو 404 إن لم تكن الصفحة موجودة) مع وجود ترويسات الأمان ودون إعادة توجيه.</p>
<h2 id="هدف-إضافي-سياسة-أمان-المحتوى">هدف إضافي: سياسة أمان المحتوى</h2>
<p>وسّع دالة ترويسات الأمان لتضمّن ترويسة CSP:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> response = event.<span class="hljs-property">response</span>;
  <span class="hljs-keyword">var</span> headers = response.<span class="hljs-property">headers</span>;

  headers[<span class="hljs-string">&#x27;strict-transport-security&#x27;</span>] = {
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;max-age=63072000; includeSubDomains; preload&#x27;</span>,
  };
  headers[<span class="hljs-string">&#x27;x-content-type-options&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;nosniff&#x27;</span> };
  headers[<span class="hljs-string">&#x27;x-frame-options&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;DENY&#x27;</span> };
  headers[<span class="hljs-string">&#x27;referrer-policy&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;strict-origin-when-cross-origin&#x27;</span> };
  headers[<span class="hljs-string">&#x27;content-security-policy&#x27;</span>] = {
    <span class="hljs-attr">value</span>:
      <span class="hljs-string">&quot;default-src &#x27;self&#x27;; script-src &#x27;self&#x27;; style-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;; img-src &#x27;self&#x27; data:; font-src &#x27;self&#x27;&quot;</span>,
  };

  <span class="hljs-keyword">return</span> response;
}
</code></pre>
<p>بعد تحديث شيفرة الدالة باستخدام <code>aws cloudfront update-function</code>، تذكّر أن تنشرها مرة أخرى — فالتحديث لا يغيّر إلا مرحلة <code>DEVELOPMENT</code>.</p>
<h2 id="هدف-إضافي-عمليات-إعادة-توجيه-متعددة">هدف إضافي: عمليات إعادة توجيه متعددة</h2>
<p>استبدل فحص المسار الواحد بخريطة إعادة توجيه:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">var</span> redirects = {
  <span class="hljs-string">&#x27;/old-path&#x27;</span>: <span class="hljs-string">&#x27;/new-path&#x27;</span>,
  <span class="hljs-string">&#x27;/blog/old-post&#x27;</span>: <span class="hljs-string">&#x27;/blog/new-post&#x27;</span>,
  <span class="hljs-string">&#x27;/docs/v1&#x27;</span>: <span class="hljs-string">&#x27;/docs&#x27;</span>,
  <span class="hljs-string">&#x27;/legacy&#x27;</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> target = redirects[request.<span class="hljs-property">uri</span>];

  <span class="hljs-keyword">if</span> (target) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">301</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Moved Permanently&#x27;</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-attr">location</span>: { <span class="hljs-attr">value</span>: target },
      },
    };
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p>يتوسّع هذا ليشمل أكبر عدد ممكن من عمليات إعادة التوجيه ضمن 10 كيلوبايت.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>لا يمكن حذف دالة CloudFront Function ما دامت مرتبطة بأي توزيع. افصل الارتباط أولًا، وانتظر حتى يصل التوزيع إلى حالة <code>Deployed</code>، ثم احذف.</p>
<pre><code class="language-bash"><span class="hljs-comment"># After removing FunctionAssociations from the distribution config</span>
<span class="hljs-comment"># and waiting for Deployed status, fetch the current ETag:</span>
ETAG=$(aws cloudfront describe-function \\
  --name url-rewrite \\
  --query <span class="hljs-string">&#x27;ETag&#x27;</span> --output text \\
  --region us-east-1)

aws cloudfront delete-function \\
  --name url-rewrite \\
  --if-match <span class="hljs-string">&quot;<span class="hljs-variable">$ETAG</span>&quot;</span> \\
  --region us-east-1
</code></pre>
<p>كرّر الأمر مع دالة <code>security-headers</code> إن كنت قد أنشأتها أيضًا.</p>
`,u={book:s,chapter:"aws",chapterTitle:n,slug:t,title:a,headings:o,html:e};export{s as book,p as chapter,n as chapterTitle,u as default,o as headings,e as html,t as slug,a as title};
