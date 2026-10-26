const s="kinney",o="aws",n="نشر تطبيقات الويب على AWS",a="static-site-deployment-solution",t="الحل: نشر موقع ثابت من البداية إلى النهاية",p=[{depth:2,id:"لماذا-يعمل-هذا",text:"لماذا يعمل هذا"},{depth:2,id:"إنشاء-حاوية-s3",text:"إنشاء حاوية S3"},{depth:2,id:"ارفع-موقعك",text:"ارفع موقعك"},{depth:2,id:"إنشاء-origin-access-control",text:"إنشاء Origin Access Control"},{depth:2,id:"إنشاء-توزيع-cloudfront",text:"إنشاء توزيع CloudFront"},{depth:2,id:"تحديث-سياسة-حاوية-s3",text:"تحديث سياسة حاوية S3"},{depth:2,id:"التحقق-من-خط-الأنابيب-الكامل",text:"التحقق من خط الأنابيب الكامل"},{depth:2,id:"اختبار-عملية-نشر",text:"اختبار عملية نشر"},{depth:2,id:"ملخص-الموارد-المنشأة",text:"ملخص الموارد المنشأة"}],l=`<p>هذا هو الحل الكامل لـ<a href="https://stevekinney.com/courses/aws/static-site-deployment-exercise">تمرين نشر موقع ثابت من البداية إلى النهاية</a>. وقد أدرجت كل أمر مع ناتجه المتوقع كي تقارن أثناء عملك.</p>
<h2 id="لماذا-يعمل-هذا">لماذا يعمل هذا</h2>
<ul>
<li>يحوّل سير العمل هذا خدمتين إلى مسار نشر واحد: S3 يخزّن الملفات، وCloudFront يقدّمها عبر HTTPS على نطاق <code>*.cloudfront.net</code>.</li>
<li>تبقى الحاوية خاصة لأن CloudFront هو نقطة الدخول العامة الوحيدة التي تحتاج إلى وصول قراءة مباشر.</li>
<li>حلقة المزامنة مع الإبطال في النهاية هي دورة النشر العملية التي ستكررها طويلًا بعد انتهاء التمرين.</li>
</ul>
<p>إن أردت نسخة AWS من سير العمل من البداية إلى النهاية مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html">درس موقع S3 الثابت</a> و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html">دليل OAC في CloudFront</a> قريبين.</p>
<h2 id="إنشاء-حاوية-s3">إنشاء حاوية S3</h2>
<p>أنشئ الحاوية:</p>
<pre><code class="language-bash">aws s3 mb s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code>make_bucket: my-frontend-app-assets
</code></pre>
<p>مكّن حظر الوصول العام:</p>
<pre><code class="language-bash">aws s3api put-public-access-block \\
  --bucket my-frontend-app-assets \\
  --public-access-block-configuration \\
    <span class="hljs-string">&quot;BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true&quot;</span> \\
  --region us-east-1
</code></pre>
<p>لا ناتج عند النجاح.</p>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3api get-public-access-block \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;PublicAccessBlockConfiguration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;BlockPublicAcls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;IgnorePublicAcls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;BlockPublicPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;RestrictPublicBuckets&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="ارفع-موقعك">ارفع موقعك</h2>
<p>أنشئ موقعًا أدنى إن لم يكن لديك واحد:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p build
<span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;&lt;!DOCTYPE html&gt;&lt;head&gt;&lt;title&gt;My Site&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;h1&gt;It works.&lt;/h1&gt;&lt;/body&gt;&#x27;</span> &gt; build/index.html
</code></pre>
<p>ارفع:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الناتج المتوقع:</p>
<pre><code>upload: build/index.html to s3://my-frontend-app-assets/index.html
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">ls</span> s3://my-frontend-app-assets \\
  --region us-east-1
</code></pre>
<p>المتوقع:</p>
<pre><code>2026-03-18 12:00:00        102 index.html
</code></pre>
<h2 id="إنشاء-origin-access-control">إنشاء Origin Access Control</h2>
<pre><code class="language-bash">aws cloudfront create-origin-access-control \\
  --origin-access-control-config <span class="hljs-string">&#x27;{
    &quot;Name&quot;: &quot;my-frontend-app-oac&quot;,
    &quot;Description&quot;: &quot;OAC for my-frontend-app-assets S3 bucket&quot;,
    &quot;SigningProtocol&quot;: &quot;sigv4&quot;,
    &quot;SigningBehavior&quot;: &quot;always&quot;,
    &quot;OriginAccessControlOriginType&quot;: &quot;s3&quot;
  }&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Location&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://cloudfront.amazonaws.com/2020-05-31/origin-access-control/E1OAC2EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ETag&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;E1ETAG1EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;OriginAccessControl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;E1OAC2EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;OriginAccessControlConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-oac&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;OAC for my-frontend-app-assets S3 bucket&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;SigningProtocol&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sigv4&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;SigningBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;always&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;OriginAccessControlOriginType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;s3&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ قيمة <code>Id</code> (<code>E1OAC2EXAMPLE</code>).</p>
<h2 id="إنشاء-توزيع-cloudfront">إنشاء توزيع CloudFront</h2>
<p>احفظ ما يلي باسم <code>distribution-config.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;CallerReference&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-2026-03-18&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Comment&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;CloudFront distribution for my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Enabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;DefaultRootObject&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index.html&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;PriceClass&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PriceClass_100&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;HttpVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http2and3&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IsIPV6Enabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Origins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;S3-my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-assets.s3.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;OriginAccessControlId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;E1OAC2EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;S3OriginConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;OriginAccessIdentity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;DefaultCacheBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;TargetOriginId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;S3-my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ViewerProtocolPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;redirect-to-https&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;CachePolicyId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;658327ea-f89d-4fab-a63d-7e88639e58f6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Compress&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AllowedMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;CachedMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CustomErrorResponses&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;ErrorCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">403</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ResponsePagePath&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/index.html&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ResponseCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;200&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ErrorCachingMinTTL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;ErrorCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">404</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ResponsePagePath&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/index.html&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ResponseCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;200&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ErrorCachingMinTTL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ViewerCertificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;CloudFrontDefaultCertificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Restrictions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;GeoRestriction&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;RestrictionType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;none&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ التوزيع:</p>
<pre><code class="language-bash">aws cloudfront create-distribution \\
  --distribution-config file://distribution-config.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع (مختصرًا):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Distribution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;E1A2B3C4D5E6F7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d1234abcdef.cloudfront.net&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;InProgress&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ معرّف التوزيع واسم النطاق.</p>
<p>انتظر النشر:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1
</code></pre>
<p>لا ناتج عند النجاح. تحقّق:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/index.html
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/2 200
content-type: text/html
</code></pre>
<h2 id="تحديث-سياسة-حاوية-s3">تحديث سياسة حاوية S3</h2>
<p>احفظ ما يلي باسم <code>bucket-policy-oac.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowCloudFrontServicePrincipal&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Service&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cloudfront.amazonaws.com&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;AWS:SourceArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>طبّق السياسة:</p>
<pre><code class="language-bash">aws s3api put-bucket-policy \\
  --bucket my-frontend-app-assets \\
  --policy file://bucket-policy-oac.json \\
  --region us-east-1
</code></pre>
<p>لا ناتج عند النجاح.</p>
<p>تحقّق من أن CloudFront ما زال يعمل:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/index.html
</code></pre>
<p>المتوقع: <code>200 OK</code>.</p>
<p>تحقّق من أن الوصول المباشر إلى S3 محظور:</p>
<pre><code class="language-bash">curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>المتوقع: <code>403 Forbidden</code>.</p>
<h2 id="التحقق-من-خط-الأنابيب-الكامل">التحقق من خط الأنابيب الكامل</h2>
<pre><code class="language-bash"><span class="hljs-comment"># HTTPS works on the CloudFront domain</span>
curl -I https://d1234abcdef.cloudfront.net
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/2 200
content-type: text/html
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># SPA routing works</span>
curl -I https://d1234abcdef.cloudfront.net/any/spa/route
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/2 200
content-type: text/html
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># Direct S3 access is blocked</span>
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/1.1 403 Forbidden
</code></pre>
<h2 id="اختبار-عملية-نشر">اختبار عملية نشر</h2>
<p>حدّث محتوى الموقع:</p>
<pre><code class="language-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;&lt;!DOCTYPE html&gt;&lt;head&gt;&lt;title&gt;My Site&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;h1&gt;Updated content.&lt;/h1&gt;&lt;/body&gt;&#x27;</span> &gt; build/index.html
</code></pre>
<p>زامن إلى S3:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./build s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete \\
  --output json
</code></pre>
<p>المتوقع:</p>
<pre><code>upload: build/index.html to s3://my-frontend-app-assets/index.html
</code></pre>
<p>أبطل الذاكرة المؤقتة:</p>
<pre><code class="language-bash">aws cloudfront create-invalidation \\
  --distribution-id E1A2B3C4D5E6F7 \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Invalidation&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;I1EXAMPLE&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;InProgress&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;CreateTime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:05:00Z&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;InvalidationBatch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;/*&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;CallerReference&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cli-1710763500&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>انتظر دقيقة، ثم تحقّق:</p>
<pre><code class="language-bash">curl -s https://d1234abcdef.cloudfront.net | grep <span class="hljs-string">&quot;Updated content&quot;</span>
</code></pre>
<p>المتوقع:</p>
<pre><code>&lt;h1&gt;Updated content.&lt;/h1&gt;
</code></pre>
<h2 id="ملخص-الموارد-المنشأة">ملخص الموارد المنشأة</h2>
<table>
<thead>
<tr>
<th>المورد</th>
<th>المعرّف</th>
</tr>
</thead>
<tbody>
<tr>
<td>حاوية S3</td>
<td><code>my-frontend-app-assets</code></td>
</tr>
<tr>
<td>Origin Access Control</td>
<td><code>E1OAC2EXAMPLE</code></td>
</tr>
<tr>
<td>توزيع CloudFront</td>
<td><code>E1A2B3C4D5E6F7</code></td>
</tr>
<tr>
<td>نطاق CloudFront</td>
<td><code>d1234abcdef.cloudfront.net</code></td>
</tr>
<tr>
<td>سياسة حاوية S3</td>
<td>وصول CloudFront فقط عبر OAC</td>
</tr>
</tbody>
</table>
<p>موقعك الثابت الآن مباشر على <code>https://d1234abcdef.cloudfront.net</code>، مقدَّمًا عالميًا عبر CloudFront، ومخزَّنًا في حاوية S3 خاصة، ومؤمَّنًا بـ HTTPS عبر شهادة CloudFront الافتراضية. وتحدّث دورة النشر (المزامنة + الإبطال) الموقع في أقل من دقيقة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>أتريد وضع هذا خلف نطاق مخصّص؟ راجع قسم <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> الاختياري في نهاية الدورة.</p>
</blockquote>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,o as chapter,n as chapterTitle,c as default,p as headings,l as html,a as slug,t as title};
