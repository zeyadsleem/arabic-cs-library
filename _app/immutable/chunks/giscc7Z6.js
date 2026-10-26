const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="spa-status-codes-with-lambda-edge",t="رموز حالة تطبيقات SPA باستخدام Lambda@Edge",e=[{depth:2,id:"البنية",text:"البنية"},{depth:2,id:"الخطوة-1-تحديث-دالة-cloudfront",text:"الخطوة 1: تحديث دالة CloudFront"},{depth:2,id:"الخطوة-2-كتابة-دالة-lambdaedge",text:"الخطوة 2: كتابة دالة Lambda@Edge"},{depth:2,id:"الخطوة-3-نشر-دالة-lambdaedge",text:"الخطوة 3: نشر دالة Lambda@Edge"},{depth:3,id:"إنشاء-دور-التنفيذ",text:"إنشاء دور التنفيذ"},{depth:3,id:"النشر-إلى-us-east-1",text:"النشر إلى us-east-1"},{depth:3,id:"نشر-نسخة-مرقمة",text:"نشر نسخة مرقّمة"},{depth:2,id:"الخطوة-4-الربط-بتوزيعك",text:"الخطوة 4: الربط بتوزيعك"},{depth:2,id:"الخطوة-5-اختبار-رموز-الحالة",text:"الخطوة 5: اختبار رموز الحالة"},{depth:2,id:"إبقاء-المسارات-متزامنة",text:"إبقاء المسارات متزامنة"},{depth:2,id:"التنظيف",text:"التنظيف"}],o=`<p>دالة CloudFront Function الخاصة بك تعيد كتابة كل المسارات غير الملفية إلى <code>/index.html</code>، وSPA يتولى الباقي. ويمكن للمستخدمين تحديث الصفحة على <code>/notes/abc123</code> فيعمل التطبيق. لكن كل مسار—صالحًا كان أو غير صالح—يعيد رمز الحالة 200. فـ <code>/notes/abc123</code> يعيد 200، و<code>/totally-fake-path</code> يعيد 200، و<code>/admin/secret/please</code> يعيد 200. ويعرض SPA مكوّن «غير موجود» للمسارات غير المعروفة، لكن استجابة HTTP تقول إن كل شيء على ما يرام.</p>
<p>إن أردت نسخة AWS من نموذج أحداث Lambda@Edge قريبة منك أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html">دليل Lambda@Edge</a> هو المرجع الرسمي.</p>
<p>هذا مهم في الإنتاج. فزاحفات محركات البحث تستخدم رمز الحالة، لا المحتوى المرئي، لتقرر ما إذا كانت الصفحة حقيقية. ورمز 200 على مسار نفايات يعني أن Google قد تفهرسه. ولا تستطيع أدوات المراقبة التمييز بين حركة حقيقية وروبوتات تضرب عناوين عشوائية. وإذا احتجت يومًا إلى تصحيح سلسلة إعادة توجيه أو تعقّب روابط معطوبة من مواقع خارجية، فإن إعادة كل مسار لرمز 200 تجعل السجلات عديمة الفائدة.</p>
<p>الإصلاح هو دالة Lambda@Edge تتحقق من عنوان URL الأصلي مقابل مسارات تطبيقك المعروفة وتعيد 404 لأي شيء لا يطابقها—مع الاستمرار في تقديم HTML كي يعرض SPA واجهة «غير موجود».</p>
<h2 id="البنية">البنية</h2>
<p>يتطلب هذا دالتين على الحافة تعملان معًا:</p>
<pre><code>sequenceDiagram
    participant Browser
    participant CF as CloudFront Function&lt;br/&gt;(viewer-request)
    participant Cache as CloudFront Cache
    participant S3
    participant Edge as Lambda@Edge&lt;br/&gt;(viewer-response)

    Browser-&gt;&gt;CF: GET /totally-fake-path
    CF-&gt;&gt;CF: Set x-original-uri: /totally-fake-path
    CF-&gt;&gt;Cache: Rewritten: GET /index.html
    alt Cache miss
        Cache-&gt;&gt;S3: GET /index.html
        S3--&gt;&gt;Cache: 200 + HTML
    end
    Cache-&gt;&gt;Edge: Response + original request headers
    Edge-&gt;&gt;Edge: /totally-fake-path doesn't match known routes
    Edge--&gt;&gt;Browser: 404 + HTML (SPA renders NotFound)
</code></pre>
<ol>
<li><strong>CloudFront Function (viewer-request):</strong> تخزّن URI الأصلي في ترويسة مخصصة قبل إعادة الكتابة إلى <code>/index.html</code>.</li>
<li><strong>Lambda@Edge (viewer-response):</strong> تقرأ URI الأصلي من الترويسة، وتتحقق منه مقابل أنماط المسارات المعروفة، وتضبط رمز الحالة على 404 إن لم يطابق.</li>
</ol>
<p>لماذا Lambda@Edge وليس CloudFront Function لحدث viewer-response؟ يمكنك إجراء مطابقة أنماط بسيطة في CloudFront Function. لكن Lambda@Edge تصبح أكثر منطقية عندما تكون أنماط المسارات معقدة، أو عندما تريد تحميلها من بيان بناء، أو عندما تحتاج إلى وقت تشغيل Node.js الكامل لمنطق المطابقة. وهي أيضًا فرصة جيدة لرؤية Lambda@Edge في عملها على مشكلة حقيقية بعد تعلّم الآلية في <a href="https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function">كتابة دالة Lambda@Edge</a>.</p>
<h2 id="الخطوة-1-تحديث-دالة-cloudfront">الخطوة 1: تحديث دالة CloudFront</h2>
<p>تحتاج دالة CloudFront Function الخاصة بك إلى حفظ URI الأصلي قبل إعادة كتابته. فبدون ذلك، لا ترى دالة Lambda@Edge إلا <code>/index.html</code>—الـ URI المُعاد كتابته—ولا سبيل لها إلى معرفة ما طلبه المشاهد فعلًا.</p>
<p>حدّث دالة إعادة كتابة SPA:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> uri = request.<span class="hljs-property">uri</span>;

  <span class="hljs-keyword">if</span> (uri.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;.&#x27;</span>)) {
    <span class="hljs-keyword">return</span> request;
  }

  <span class="hljs-comment">// Pass the original URI to downstream functions</span>
  request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-original-uri&#x27;</span>] = { <span class="hljs-attr">value</span>: uri };
  request.<span class="hljs-property">uri</span> = <span class="hljs-string">&#x27;/index.html&#x27;</span>;

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p>تنتقل ترويسة <code>x-original-uri</code> مع الطلب عبر خط أنابيب CloudFront. وتقرأها دالة Lambda@Edge من كائن الطلب في حدث viewer-response.</p>
<p>حدّث الدالة وأعد نشرها باستخدام سير العمل من <a href="https://stevekinney.com/courses/aws/writing-a-cloudfront-function">كتابة CloudFront Function</a>:</p>
<pre><code class="language-bash">aws cloudfront update-function \\
  --name url-rewrite \\
  --if-match CURRENT_ETAG \\
  --function-config <span class="hljs-string">&#x27;{&quot;Comment&quot;:&quot;SPA rewrite with original URI passthrough&quot;,&quot;Runtime&quot;:&quot;cloudfront-js-2.0&quot;}&#x27;</span> \\
  --function-code fileb://url-rewrite.js \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ثم انشر:</p>
<pre><code class="language-bash">aws cloudfront publish-function \\
  --name url-rewrite \\
  --if-match ETAG_FROM_UPDATE \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="الخطوة-2-كتابة-دالة-lambdaedge">الخطوة 2: كتابة دالة Lambda@Edge</h2>
<p>أنشئ دالة Lambda@Edge تعمل على أحداث <strong>viewer-response</strong>. فهي تقرأ URI الأصلي من الترويسة المخصصة وتتحقق منه مقابل أنماط المسارات التي يتعرف عليها موجّه Scratch Lab من جهة العميل.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontResponseHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-comment">// Route patterns that the SPA knows how to handle.</span>
<span class="hljs-comment">// These mirror the patterns in src/hooks/use-router.ts.</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">knownRoutes</span>: <span class="hljs-title class_">RegExp</span>[] = [
  <span class="hljs-regexp">/^\\/$/</span>, <span class="hljs-comment">// Home</span>
  <span class="hljs-regexp">/^\\/notes\\/[^/]+$/</span>, <span class="hljs-comment">// Note detail: /notes/:id</span>
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontResponseHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> response = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">response</span>;
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;

  <span class="hljs-comment">// Read the original URI stashed by the CloudFront Function.</span>
  <span class="hljs-comment">// If the header is missing, this is a request for a static file—leave it alone.</span>
  <span class="hljs-keyword">const</span> originalUriHeader = request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-original-uri&#x27;</span>];
  <span class="hljs-keyword">if</span> (!originalUriHeader || !originalUriHeader[<span class="hljs-number">0</span>]) {
    <span class="hljs-keyword">return</span> response;
  }

  <span class="hljs-keyword">const</span> originalUri = originalUriHeader[<span class="hljs-number">0</span>].<span class="hljs-property">value</span>;
  <span class="hljs-keyword">const</span> isKnownRoute = knownRoutes.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">pattern</span>) =&gt;</span> pattern.<span class="hljs-title function_">test</span>(originalUri));

  <span class="hljs-keyword">if</span> (!isKnownRoute) {
    response.<span class="hljs-property">status</span> = <span class="hljs-string">&#x27;404&#x27;</span>;
    response.<span class="hljs-property">statusDescription</span> = <span class="hljs-string">&#x27;Not Found&#x27;</span>;
  }

  <span class="hljs-keyword">return</span> response;
};
</code></pre>
<p><em>ملاحظة:</em> أبقِ هذه الأنماط متزامنة مع موجّهك من جهة العميل. فإذا أضفت مسارًا إلى التطبيق، فأضف نمطًا هنا.</p>
<p>بضعة أمور جديرة بالملاحظة:</p>
<ul>
<li><strong>لا يتغير جسم الاستجابة.</strong> فالـ HTML هو <code>index.html</code> نفسه بغض النظر عن رمز الحالة. ويعرض SPA مكوّن <code>NotFound</code> للمسارات غير المعروفة بناءً على URL، لا على رمز الحالة. فرموز الحالة للآلات—الزاحفات وأدوات المراقبة وسجلات وصولك.</li>
<li><strong><code>response.status</code> سلسلة نصية.</strong> هذه غرابة Lambda@Edge من <a href="https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function">كتابة دالة Lambda@Edge</a>—<code>'404'</code> وليس <code>404</code>.</li>
<li><strong>طلبات الملفات الثابتة تتجاوز الفحص.</strong> إذا لم تضبط CloudFront Function الترويسة <code>x-original-uri</code>، فالطلب كان لملف بامتداد (CSS أو JS أو صور). وينبغي أن تحتفظ تلك الملفات برمز الحالة الذي أعادته S3.</li>
</ul>
<h2 id="الخطوة-3-نشر-دالة-lambdaedge">الخطوة 3: نشر دالة Lambda@Edge</h2>
<p>ابنِ الدالة وحزمها بالطريقة نفسها التي فعلتها في <a href="https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function">كتابة دالة Lambda@Edge</a>:</p>
<pre><code class="language-bash">npx tsc --outDir dist
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..
</code></pre>
<h3 id="إنشاء-دور-التنفيذ">إنشاء دور التنفيذ</h3>
<p>إن لم يكن لديك دور بالفعل من درس Lambda@Edge، فأنشئ دورًا يثق بـ <code>lambda.amazonaws.com</code> و<code>edgelambda.amazonaws.com</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Service&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;lambda.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;edgelambda.amazonaws.com&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">aws iam create-role \\
  --role-name my-frontend-app-status-code-role \\
  --assume-role-policy-document file://edge-trust-policy.json \\
  --region us-east-1 \\
  --output json

aws iam attach-role-policy \\
  --role-name my-frontend-app-status-code-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="النشر-إلى-us-east-1">النشر إلى us-east-1</h3>
<pre><code class="language-bash">aws lambda create-function \\
  --function-name my-frontend-app-status-codes \\
  --runtime nodejs22.x \\
  --role arn:aws:iam::123456789012:role/my-frontend-app-status-code-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="نشر-نسخة-مرقمة">نشر نسخة مرقّمة</h3>
<p>تتطلب Lambda@Edge نسخة منشورة—لا يمكنك استخدام <code>$LATEST</code>:</p>
<pre><code class="language-bash">aws lambda publish-version \\
  --function-name my-frontend-app-status-codes \\
  --description <span class="hljs-string">&quot;SPA status code routing&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>احفظ ARN المنسوخ من الاستجابة (ينتهي بـ <code>:1</code>).</p>
<h2 id="الخطوة-4-الربط-بتوزيعك">الخطوة 4: الربط بتوزيعك</h2>
<p>استرجع إعداد توزيعك وأضف دالة Lambda@Edge إلى <code>LambdaFunctionAssociations</code> في السلوك الافتراضي:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;LambdaFunctionAssociations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;LambdaFunctionARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:lambda:us-east-1:123456789012:function/my-frontend-app-status-codes:1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;EventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;viewer-response&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;IncludeBody&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">aws cloudfront update-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --if-match ETAG_FROM_GET \\
  --distribution-config file://dist-config.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا يمكن للسلوك أن يحمل إلا دالة واحدة لكل نوع حدث. فإذا كانت لديك CloudFront Function على <code>viewer-response</code> (مثل دالة ترويسات الأمان من <a href="https://stevekinney.com/courses/aws/cloudfront-function-exercise">التمرين</a>)، فستحتاج إما إلى نقل هذا المنطق إلى دالة Lambda@Edge هذه، أو إلى استخدام <a href="https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security">سياسة ترويسات استجابة مُدارة</a> بدلًا منها. ويمكنك أن تجمع CloudFront Function على <code>viewer-request</code> مع Lambda@Edge على <code>viewer-response</code> في السلوك نفسه—فهما على نوعي حدث مختلفين.</p>
</blockquote>
<p>انتظر حتى يُنشر التوزيع:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1
</code></pre>
<h2 id="الخطوة-5-اختبار-رموز-الحالة">الخطوة 5: اختبار رموز الحالة</h2>
<p>بعد نشر التوزيع، تحقق من رموز الحالة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Valid route: home page</span>
curl -s -o /dev/null -w <span class="hljs-string">&quot;%{http_code}&quot;</span> https://YOUR_CLOUDFRONT_DOMAIN/
<span class="hljs-comment"># Expected: 200</span>

<span class="hljs-comment"># Valid route: a note page</span>
curl -s -o /dev/null -w <span class="hljs-string">&quot;%{http_code}&quot;</span> https://YOUR_CLOUDFRONT_DOMAIN/notes/abc123
<span class="hljs-comment"># Expected: 200</span>

<span class="hljs-comment"># Invalid route: random path</span>
curl -s -o /dev/null -w <span class="hljs-string">&quot;%{http_code}&quot;</span> https://YOUR_CLOUDFRONT_DOMAIN/totally-fake-path
<span class="hljs-comment"># Expected: 404</span>

<span class="hljs-comment"># Invalid route: almost a valid path</span>
curl -s -o /dev/null -w <span class="hljs-string">&quot;%{http_code}&quot;</span> https://YOUR_CLOUDFRONT_DOMAIN/notes/
<span class="hljs-comment"># Expected: 404</span>

<span class="hljs-comment"># Static asset: still served normally</span>
curl -s -o /dev/null -w <span class="hljs-string">&quot;%{http_code}&quot;</span> https://YOUR_CLOUDFRONT_DOMAIN/favicon.svg
<span class="hljs-comment"># Expected: 200</span>
</code></pre>
<p>افتح نطاق CloudFront في متصفح وانتقل إلى <code>/totally-fake-path</code>. ينبغي أن يعرض SPA واجهة «غير موجود»—التجربة البصرية نفسها كما كانت. لكن رمز حالة HTTP الآن 404، وهو ما ستراه محركات البحث وأدوات المراقبة وسجلات CloudWatch الخاصة بك.</p>
<h2 id="إبقاء-المسارات-متزامنة">إبقاء المسارات متزامنة</h2>
<p>يجب أن تطابق أنماط المسارات في دالة Lambda@Edge موجّهك من جهة العميل. فإذا أضفت مسارًا جديدًا إلى تطبيق Scratch Lab (مثلًا <code>/settings</code>)، فعليك إضافة نمط إلى دالة Lambda@Edge ونشر نسخة جديدة.</p>
<p>ولتطبيق صغير مثل Scratch Lab، صيانة القائمة يدويًا أمر مقبول. أما لتطبيق أكبر، فلديك بضعة خيارات:</p>
<ul>
<li><strong>توليد قائمة الأنماط وقت البناء.</strong> استخرج أنماط المسارات من إعداد الموجّه واكتبها في مصدر دالة Lambda قبل التحزيم.</li>
<li><strong>استخدام CloudFront KeyValueStore.</strong> خزّن أنماط المسارات في نسخة KVS تقرأها الدالة وقت التشغيل، وحدّث الأنماط دون إعادة نشر الدالة.</li>
<li><strong>قبول المقايضة.</strong> إذا أعاد مسار غير معروف رمز 200 لفترة وجيزة قبل تحديث الدالة، فذلك مقبول عادةً. فالهدف الأساسي هو منع رموز 200 الدائمة على مسارات النفايات.</li>
</ul>
<h2 id="التنظيف">التنظيف</h2>
<p>لإزالة دالة Lambda@Edge، افصلها أولًا عن التوزيع، وانتظر حتى يصل التوزيع إلى حالة <code>Deployed</code>، ثم احذف الدالة. وتستغرق نسخ Lambda@Edge وقتًا في التنظيف—راجع <a href="https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function">كتابة دالة Lambda@Edge</a> لتسلسل التنظيف الكامل.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:o};export{s as book,p as chapter,n as chapterTitle,l as default,e as headings,o as html,a as slug,t as title};
