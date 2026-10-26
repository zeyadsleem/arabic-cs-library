const s="kinney",o="aws",n="نشر تطبيقات الويب على AWS",a="cloudfront-distribution-solution",t="الحل",p=[{depth:2,id:"لماذا-يعمل-هذا",text:"لماذا يعمل هذا"},{depth:2,id:"إنشاء-origin-access-control",text:"إنشاء Origin Access Control"},{depth:2,id:"إنشاء-التوزيع",text:"إنشاء التوزيع"},{depth:2,id:"تحديث-سياسة-حاوية-s3",text:"تحديث سياسة حاوية S3"},{depth:2,id:"إعادة-تمكين-حظر-الوصول-العام",text:"إعادة تمكين حظر الوصول العام"},{depth:2,id:"اختبار-توجيه-spa",text:"اختبار توجيه SPA"},{depth:2,id:"إرفاق-سياسة-ترويسات-الأمان",text:"إرفاق سياسة ترويسات الأمان"},{depth:2,id:"التحقق-النهائي",text:"التحقق النهائي"},{depth:2,id:"ملخص-الموارد-المنشأة",text:"ملخص الموارد المنشأة"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>هذا هو الحل الكامل لـ<a href="https://stevekinney.com/courses/aws/cloudfront-distribution-exercise">تمرين توزيع CloudFront</a>. وكل أمر معروض مع ناتجه المتوقع.</p>
<h2 id="لماذا-يعمل-هذا">لماذا يعمل هذا</h2>
<ul>
<li>تُبقي Origin Access Control حاوية S3 خاصة مع السماح لـ CloudFront بقراءة الملفات التي يحتاجها مستخدموك.</li>
<li>تجعل استجابات الأخطاء المخصّصة تطبيق الصفحة الواحدة يتصرف كموجّه واجهة أمامية بدلًا من كومة أخطاء كائنات مفقودة.</li>
<li>يصبح التوزيع نقطة فرض HTTPS والتخزين المؤقت وترويسات الأمان، ولهذا يجلس بين مستخدميك والحاوية.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن تغيّر ناتج وحدة التحكم أو CLI أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html">دليل مطوّري CloudFront</a> و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html">دليل إعداد OAC</a> مفتوحين.</p>
</blockquote>
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
<p>الناتج المتوقع:</p>
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
<h2 id="إنشاء-التوزيع">إنشاء التوزيع</h2>
<p>احفظ ما يلي باسم <code>distribution-config.json</code> (وهو متاح أيضًا في <a href="https://github.com/stevekinney/scratch-lab/blob/main/cloudfront/distribution-config.json">مستودع Scratch Lab</a>):</p>
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
<p>الناتج المتوقع (مختصرًا إلى الحقول التي تحتاجها):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Distribution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;E1A2B3C4D5E6F7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d1234abcdef.cloudfront.net&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;InProgress&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DistributionConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
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
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ معرّف التوزيع (<code>E1A2B3C4D5E6F7</code>) واسم النطاق (<code>d1234abcdef.cloudfront.net</code>).</p>
<p>انتظر نشر التوزيع:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1
</code></pre>
<p>يحجب هذا الأمر التنفيذ حتى تتغير الحالة من <code>InProgress</code> إلى <code>Deployed</code>. وعدم وجود ناتج يعني النجاح.</p>
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
<p>تحقّق من السياسة:</p>
<pre><code class="language-bash">aws s3api get-bucket-policy \\
  --bucket my-frontend-app-assets \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>اختبر الوصول عبر CloudFront:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/index.html
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/2 200
content-type: text/html
</code></pre>
<p>اختبر أن الوصول المباشر إلى S3 محظور:</p>
<pre><code class="language-bash">curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/1.1 403 Forbidden
</code></pre>
<h2 id="إعادة-تمكين-حظر-الوصول-العام">إعادة تمكين حظر الوصول العام</h2>
<pre><code class="language-bash">aws s3api put-public-access-block \\
  --bucket my-frontend-app-assets \\
  --public-access-block-configuration \\
    <span class="hljs-string">&quot;BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true&quot;</span> \\
  --region us-east-1
</code></pre>
<p>لا ناتج عند النجاح.</p>
<p>تحقّق من تمكين حظر الوصول العام:</p>
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
<p>تحقّق من أن CloudFront ما زال يعمل:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/index.html
</code></pre>
<p>ما زال <code>200 OK</code>. فسياسة الخدمة الأساسية لـ CloudFront لا تُعد سياسة «عامة».</p>
<h2 id="اختبار-توجيه-spa">اختبار توجيه SPA</h2>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/dashboard/settings
</code></pre>
<p>المتوقع:</p>
<pre><code>HTTP/2 200
content-type: text/html
</code></pre>
<p>تعترض استجابة الخطأ المخصّصة رمز 403 القادم من S3 (لأن <code>/dashboard/settings</code> غير موجود ككائن) وتعيد <code>/index.html</code> برمز حالة 200. أما موجّهك في جهة العميل فيتولى الباقي.</p>
<p>اختبر مسارًا آخر غير موجود:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/users/123/profile
</code></pre>
<p>النتيجة نفسها: <code>200 OK</code> مع <code>text/html</code>.</p>
<h2 id="إرفاق-سياسة-ترويسات-الأمان">إرفاق سياسة ترويسات الأمان</h2>
<p>اجلب تهيئة التوزيع الحالية:</p>
<pre><code class="language-bash">aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1 \\
  --output json &gt; distribution-config-current.json
</code></pre>
<p>دوّن <code>ETag</code> في الاستجابة (مثل <code>E3ETAG3EXAMPLE</code>).</p>
<p>عدّل <code>DistributionConfig</code> لتضيف <code>ResponseHeadersPolicyId</code> إلى <code>DefaultCacheBehavior</code>. وينبغي أن يبدو السلوك المحدّث هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;DefaultCacheBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;TargetOriginId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;S3-my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ViewerProtocolPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;redirect-to-https&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;CachePolicyId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;658327ea-f89d-4fab-a63d-7e88639e58f6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ResponseHeadersPolicyId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;67f7725c-6f97-4210-82d7-5512b31e9d03&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Compress&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AllowedMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;CachedMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استخرج <code>DistributionConfig</code> (دون غلاف <code>ETag</code>) إلى <code>distribution-config-updated.json</code> وأرسله:</p>
<pre><code class="language-bash">aws cloudfront update-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --if-match E3ETAG3EXAMPLE \\
  --distribution-config file://distribution-config-updated.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>انتظر النشر:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1
</code></pre>
<p>تحقّق من ترويسات الأمان:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/index.html
</code></pre>
<p>المتوقع (من بين ترويسات أخرى):</p>
<pre><code>strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
</code></pre>
<h2 id="التحقق-النهائي">التحقق النهائي</h2>
<p>شغّل كل الفحوصات:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Distribution status</span>
aws cloudfront get-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Distribution.{Id:Id,Domain:DomainName,Status:Status}&quot;</span>
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;E1A2B3C4D5E6F7&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Domain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d1234abcdef.cloudfront.net&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Deployed&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># HTTPS works</span>
curl -I https://d1234abcdef.cloudfront.net

<span class="hljs-comment"># SPA routing works</span>
curl -I https://d1234abcdef.cloudfront.net/any/spa/route

<span class="hljs-comment"># S3 is locked down</span>
curl -I https://my-frontend-app-assets.s3.us-east-1.amazonaws.com/index.html
</code></pre>
<p>النتائج المتوقعة: تعيد CloudFront الرمز <code>200 OK</code> لكل من الجذر ومسار SPA. أما الوصول المباشر إلى S3 فيعيد <code>403 Forbidden</code>.</p>
<p>افتح نطاق CloudFront في متصفح لترى الموقع مباشرًا:</p>
<p><img src="/arabic-cs-library/images/kinney/e6808f0fa9cac56d.webp" alt="الموقع الثابت المقدّم عبر CloudFront بـ HTTPS، ويعرض «Hello from S3» على خلفية داكنة مع طابع زمني لتحميل الصفحة."></p>
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
<td>Origin Access Control</td>
<td><code>E1OAC2EXAMPLE</code></td>
</tr>
<tr>
<td>توزيع CloudFront</td>
<td><code>E1A2B3C4D5E6F7</code></td>
</tr>
<tr>
<td>نطاق التوزيع</td>
<td><code>d1234abcdef.cloudfront.net</code></td>
</tr>
<tr>
<td>سياسة حاوية S3</td>
<td>محدّثة لتسمح لـ CloudFront فقط</td>
</tr>
<tr>
<td>سياسة ترويسات الاستجابة</td>
<td><code>67f7725c-6f97-4210-82d7-5512b31e9d03</code> (SecurityHeadersPolicy مُدارة)</td>
</tr>
<tr>
<td>سياسة الذاكرة المؤقتة</td>
<td><code>658327ea-f89d-4fab-a63d-7e88639e58f6</code> (CachingOptimized مُدارة)</td>
</tr>
</tbody>
</table>
<p>توزيعك الآن مباشر ومؤمّن على نطاقه <code>*.cloudfront.net</code>. وإن أردت إرفاق نطاق مخصّص لاحقًا، فراجع قسم <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> الاختياري في نهاية الدورة.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>عندما تنتهي من هذا التمرين، فكّك الموارد لتجنّب الرسوم المستمرة. يجب أن يكون التوزيع <em>معطّلًا</em> قبل أن تسمح لك CloudFront بحذفه—والتعطيل هو الجزء البطيء (15–30 دقيقة). أما الحذف الفعلي فسريع بمجرد أن تبلغ الحالة <code>Deployed</code>.</p>
<blockquote>
<p><strong>قبل أن تنسخ هذه الأوامر</strong></p>
<p>المعرّفات أدناه (<code>E1A2B3C4D5E6F7</code> للتوزيع، و<code>E1OAC2EXAMPLE</code> لـ OAC) هي عناصر نائبة—استبدلها بمعرّفاتك الفعلية. اعثر على معرّفاتك بالأمر <code>aws cloudfront list-distributions --query 'DistributionList.Items[].{Id:Id,Domain:DomainName}' --output table</code> و<code>aws cloudfront list-origin-access-controls --output table</code>.</p>
<p>شغّل هذه الأوامر في جلسة shell واحدة كي تبقى <code>$ETAG</code> و<code>$NEW_ETAG</code> و<code>$OAC_ETAG</code> في النطاق. فإن عدت في طرفية جديدة، فأعد جلب كل ETag قبل تشغيل الأمر الذي يستخدمه.</p>
<p>تحقّق مرة أخرى من أن <code>&quot;Enabled&quot;: false</code> في <code>distribution-config.json</code> قبل إرسال التحديث. فتركها <code>true</code> هو أكثر طريقة شائعة لفشل هذا التنظيف—إذ يرفض <code>delete-distribution</code> توزيعًا ممكّنًا بخطأ <code>DistributionNotDisabled</code>، ويبدو استدعاء <code>wait distribution-deployed</code> التالي عالقًا.</p>
</blockquote>
<p>اجلب التهيئة الحالية وETag:</p>
<pre><code class="language-bash">ETAG=$(aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --query <span class="hljs-string">&#x27;ETag&#x27;</span> --output text)

aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --query <span class="hljs-string">&#x27;DistributionConfig&#x27;</span> \\
  --output json &gt; distribution-config.json
</code></pre>
<p>عدّل <code>distribution-config.json</code> واضبط <code>&quot;Enabled&quot;: false</code>، ثم أرسل التحديث:</p>
<pre><code class="language-bash">aws cloudfront update-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --distribution-config file://distribution-config.json \\
  --if-match <span class="hljs-string">&quot;<span class="hljs-variable">$ETAG</span>&quot;</span>
</code></pre>
<p>انتظر <code>Status: Deployed</code> (هذه هي الخطوة البطيئة—اصنع فنجان قهوة):</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7
</code></pre>
<p>اجلب ETag الجديد (فهو يتغير مع كل تحديث)، ثم احذف:</p>
<pre><code class="language-bash">NEW_ETAG=$(aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --query <span class="hljs-string">&#x27;ETag&#x27;</span> --output text)

aws cloudfront delete-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --if-match <span class="hljs-string">&quot;<span class="hljs-variable">$NEW_ETAG</span>&quot;</span>
</code></pre>
<p>احذف OAC:</p>
<pre><code class="language-bash">OAC_ETAG=$(aws cloudfront get-origin-access-control \\
  --<span class="hljs-built_in">id</span> E1OAC2EXAMPLE \\
  --query <span class="hljs-string">&#x27;ETag&#x27;</span> --output text)

aws cloudfront delete-origin-access-control \\
  --<span class="hljs-built_in">id</span> E1OAC2EXAMPLE \\
  --if-match <span class="hljs-string">&quot;<span class="hljs-variable">$OAC_ETAG</span>&quot;</span>
</code></pre>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,o as chapter,n as chapterTitle,c as default,p as headings,l as html,a as slug,t as title};
