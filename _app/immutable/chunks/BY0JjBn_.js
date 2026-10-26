const a="kinney",p="aws",s="نشر تطبيقات الويب على AWS",n="connecting-api-gateway-to-lambda",t="ربط API Gateway بـ Lambda",e=[{depth:2,id:"القطع-الثلاث",text:"القطع الثلاث"},{depth:2,id:"إنشاء-التكامل",text:"إنشاء التكامل"},{depth:2,id:"إنشاء-المسارات",text:"إنشاء المسارات"},{depth:3,id:"معاملات-المسار",text:"معاملات المسار"},{depth:3,id:"مسارات-الالتقاط-الشامل",text:"مسارات الالتقاط الشامل"},{depth:2,id:"منح-الإذن",text:"منح الإذن"},{depth:2,id:"اختبار-الاتصال",text:"اختبار الاتصال"},{depth:2,id:"سرد-المسارات-والتكاملات",text:"سرد المسارات والتكاملات"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],o=`<p>لديك HTTP API بعنوان URL يُرجع 404 لكل شيء. ولديك دالة Lambda تعمل عندما تستدعيها مباشرة. الآن تربط بينهما. تتكون عملية الربط من ثلاث خطوات: إنشاء تكامل، وإنشاء مسار، ومنح إذن. وإن أغفلت أيًّا منها، فستُرجع واجهتك 404 أو 500 دون رسالة خطأ مفيدة. وقد رأيت كلًّا من هذه العقبات تعثر بها الناس مرة واحدة على الأقل.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من آليات التكامل أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html">دليل تكامل وكيل Lambda لواجهات HTTP</a> هو المرجع الرسمي.</p>
<h2 id="القطع-الثلاث">القطع الثلاث</h2>
<p>هكذا تترابط القطع:</p>
<ol>
<li><strong>التكامل</strong> — يخبر API Gateway أي خلفية يستدعي (دالة Lambda لديك) وكيف يستدعيها (تكامل وكيل بصيغة الحمولة الإصدار 2.0).</li>
<li><strong>المسار</strong> — يربط طريقة HTTP ومسارًا (مثل <code>GET /items</code>) بذلك التكامل.</li>
<li><strong>الإذن</strong> — سياسة قائمة على المورد على دالة Lambda تسمح لـ <code>apigateway.amazonaws.com</code> باستدعائها.</li>
</ol>
<pre><code>flowchart LR
    Request[&quot;HTTP request&quot;] --&gt; Route[&quot;Route&lt;br/&gt;METHOD /path&quot;]
    Route --&gt; Integration[&quot;Integration&lt;br/&gt;AWS_PROXY&quot;]
    Integration --&gt; Lambda[&quot;Lambda function&quot;]
    Permission[&quot;Lambda resource policy&lt;br/&gt;allow apigateway.amazonaws.com&quot;] -. required .-&gt; Lambda
</code></pre>
<p>لقد كتبت المعالج ونشرته بالفعل في <a href="https://stevekinney.com/courses/aws/writing-a-lambda-handler">كتابة معالج Lambda</a> و<a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>. والآن تربط طبقة HTTP.</p>
<blockquote>
<p><strong>متى لا تحتاج إلى API Gateway</strong></p>
<p>إذا كان كل ما تريده هو <em>نقطة نهاية</em> HTTPS واحدة لدالة Lambda واحدة — بلا نطاق مخصّص، ولا مسارات، ولا مصادقة، ولا مراحل — فإن <strong>عناوين URL لدوال Lambda</strong> (Lambda Function URLs) تفعل ذلك بأمر واحد. وهي تمنحك عنوان URL بالشكل <code>https://&lt;id&gt;.lambda-url.us-east-1.on.aws</code> موصولًا مباشرة بدالة، مع مصادقة IAM اختيارية، دون تكلفة إضافية تتجاوز استدعاء Lambda. وهي لا تحلّ محل API Gateway لواجهات API الحقيقية (فلا توجيه، ولا تقييد معدّل، ولا مُفوّضين، ولا خطط استخدام)، لكنها مثالية لمستقبِل webhook أو نقطة نهاية لمرة واحدة.</p>
<pre><code class="language-bash">aws lambda create-function-url-config \\
  --function-name my-webhook \\
  --auth-type NONE \\
  --region us-east-1
</code></pre>
<p>ولكل ما تبقّى في هذه الدورة، ستلتزم بـ API Gateway — فأنت تريد المسارات وCORS والنطاق المخصّص.</p>
</blockquote>
<h2 id="إنشاء-التكامل">إنشاء التكامل</h2>
<p><strong>التكامل</strong> يربط واجهتك بخدمة خلفية. وفي هذه الدورة، تكون الخلفية دائمًا دالة Lambda، ما يجعله <strong>تكامل وكيل Lambda</strong> (Lambda proxy integration). وتعني كلمة «وكيل» أن API Gateway يمرّر طلب HTTP كاملًا إلى Lambda ويُرجع استجابة Lambda مباشرة إلى العميل — بلا تحويل للطلب أو الاستجابة.</p>
<pre><code class="language-bash">aws apigatewayv2 create-integration \\
  --api-id abc123def4 \\
  --integration-type AWS_PROXY \\
  --integration-uri arn:aws:lambda:us-east-1:123456789012:<span class="hljs-keyword">function</span>:my-frontend-app-api \\
  --payload-format-version 2.0 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن الاستجابة <code>IntegrationId</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ConnectionType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;INTERNET&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IntegrationId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IntegrationType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWS_PROXY&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IntegrationUri&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;PayloadFormatVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;TimeoutInMillis&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30000</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ <code>IntegrationId</code> — ستحتاجه في الخطوة التالية.</p>
<pre><code class="language-bash">INTEGRATION_ID=<span class="hljs-string">&quot;a1b2c3&quot;</span>
</code></pre>
<p>في لوحة التحكم، تتيح لك صفحة <strong>Integrations → Attach integrations to routes</strong> اختيار مسار والاختيار بين إنشاء تكامل جديد أو إرفاق تكامل موجود — ثم اختر <strong>Lambda function</strong> من قائمة نوع التكامل المنسدلة.</p>
<p><img src="/arabic-cs-library/images/kinney/87a03c09041974d4.webp" alt="نموذج API Gateway Create an integration وهو يعرض اختيار Lambda function كنوع التكامل مع ظهور حقلي AWS Region وLambda function."></p>
<p>بضعة أمور عن هذه الخيارات:</p>
<ul>
<li><strong><code>--integration-type AWS_PROXY</code></strong>: هذا نوع التكامل لتكاملات وكيل Lambda. يرسل API Gateway طلب HTTP الكامل كحدث Lambda ويُرجع استجابة Lambda كاستجابة HTTP.</li>
<li><strong><code>--integration-uri</code></strong>: ARN دالة Lambda. وهو ARN نفسه الذي حصلت عليه عند نشر الدالة.</li>
<li><strong><code>--payload-format-version 2.0</code></strong>: يخبر هذا API Gateway باستخدام صيغة الحدث الإصدار 2.0 (<code>APIGatewayProxyEventV2</code>)، وهي الصيغة التي يتوقعها معالج TypeScript لديك. والإصدار 1.0 هو الصيغة الأقدم التي تستخدمها واجهات REST API. استخدم دائمًا 2.0 مع واجهات HTTP API.</li>
</ul>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا أغفلت <code>--payload-format-version</code>، فسيلجأ API Gateway إلى <code>1.0</code> في بعض إعدادات التكامل. وهذا يعني أن دالة Lambda تتلقى <code>APIGatewayProxyEvent</code> (الإصدار 1) بدلًا من <code>APIGatewayProxyEventV2</code> (الإصدار 2). وأشكال الأحداث مختلفة — فالحقول في مواضع مختلفة، وبعض الحقول ناقصة كليًا. فإن تعذّر على معالجك فجأة العثور على <code>event.requestContext.http.method</code>، فافحص إصدار صيغة الحمولة.</p>
</blockquote>
<h2 id="إنشاء-المسارات">إنشاء المسارات</h2>
<p><strong>المسار</strong> يربط طريقة HTTP ومسارًا بتكامل. ويتبع مفتاح المسار الصيغة <code>METHOD /path</code>. أنشئ مسارًا لـ <code>GET /items</code>:</p>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id abc123def4 \\
  --route-key <span class="hljs-string">&quot;GET /items&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiKeyRequired&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;xyz789&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteKey&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET /items&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>قيمة <code>--target</code> هي <code>integrations/{IntegrationId}</code> — لاحظ البادئة <code>integrations/</code>. وهذه هي الصيغة التي يتوقعها API Gateway.</p>
<p>في لوحة التحكم، يعرض نموذج <strong>Create a route</strong> قائمة الطريقة المنسدلة (ANY وGET وPOST وغيرها) وحقل المسار جنبًا إلى جنب.</p>
<p><img src="/arabic-cs-library/images/kinney/d8334b11050a28a2.webp" alt="نموذج API Gateway Create a route وهو يعرض الطريقة مضبوطة على ANY وحقل المسار مملوءًا بـ /items."></p>
<p>أنشئ مسارًا ثانيًا لـ <code>POST /items</code>:</p>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id abc123def4 \\
  --route-key <span class="hljs-string">&quot;POST /items&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يشير المساران إلى التكامل نفسه (دالة Lambda نفسها). وشيفرة معالجك مسؤولة عن التمييز بين GET وPOST باستخدام <code>event.requestContext.http.method</code> — وهو النمط الذي أعددته بالفعل في <a href="https://stevekinney.com/courses/aws/writing-a-lambda-handler">كتابة معالج Lambda</a>.</p>
<p>بعد إضافة المسارات، تعرض صفحة <strong>Routes</strong> كل المسارات المهيّأة في عرض شجري مع مسار الالتقاط الشامل <code>$default</code> الذي أنشأه معالج لوحة التحكم.</p>
<p><img src="/arabic-cs-library/images/kinney/3d3db919a58ef7fb.webp" alt="صفحة API Gateway Routes وهي تعرض شجرة المسارات مع مسار التقاط شامل $default وتكامل Lambda المرفق."></p>
<h3 id="معاملات-المسار">معاملات المسار</h3>
<p>تدعم المسارات معاملات المسار باستخدام الأقواس المعقوفة:</p>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id abc123def4 \\
  --route-key <span class="hljs-string">&quot;GET /items/{id}&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>في معالج Lambda لديك، تتوفر قيمة معامل المسار عند <code>event.pathParameters.id</code>.</p>
<h3 id="مسارات-الالتقاط-الشامل">مسارات الالتقاط الشامل</h3>
<p>يمكنك إنشاء مسار التقاط شامل باستخدام <code>$default</code> كمفتاح مسار:</p>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id abc123def4 \\
  --route-key <span class="hljs-string">&quot;<span class="hljs-variable">$default</span>&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يطابق مسار <code>$default</code> أي طلب لا يطابق مسارًا أكثر تحديدًا. وهذا مفيد عندما تريد دالة Lambda واحدة تتولى كل التوجيه داخليًا — على غرار طريقة عمل مسار الالتقاط الشامل في API الخاص بـ Next.js.</p>
<h2 id="منح-الإذن">منح الإذن</h2>
<p>هذه هي الخطوة التي توقع الجميع. فيمكن لـ API Gateway التوجيه إلى دالة Lambda، لكن دالة Lambda لم تأذن لـ API Gateway باستدعائها. ومن دون هذا الإذن، يُرجع كل طلب خطأ 500.</p>
<p>الإذن هو <strong>سياسة قائمة على المورد</strong> على دالة Lambda — المفهوم نفسه الذي تعلمته في <a href="https://stevekinney.com/courses/aws/bucket-policies-and-public-access">سياسات الحاويات والوصول العام</a>، لكنه مطبّق على دالة Lambda بدلًا من حاوية S3. وهو يخبر Lambda: «يُسمح لـ API Gateway هذا باستدعائك».</p>
<pre><code class="language-bash">aws lambda add-permission \\
  --function-name my-frontend-app-api \\
  --statement-id apigateway-invoke \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn <span class="hljs-string">&quot;arn:aws:execute-api:us-east-1:123456789012:abc123def4/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;Sid\\&quot;:\\&quot;apigateway-invoke\\&quot;,\\&quot;Effect\\&quot;:\\&quot;Allow\\&quot;,\\&quot;Principal\\&quot;:{\\&quot;Service\\&quot;:\\&quot;apigateway.amazonaws.com\\&quot;},\\&quot;Action\\&quot;:\\&quot;lambda:InvokeFunction\\&quot;,\\&quot;Resource\\&quot;:\\&quot;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api\\&quot;,\\&quot;Condition\\&quot;:{\\&quot;ArnLike\\&quot;:{\\&quot;AWS:SourceArn\\&quot;:\\&quot;arn:aws:execute-api:us-east-1:123456789012:abc123def4/*\\&quot;}}}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لنفكّك <code>--source-arn</code>:</p>
<ul>
<li><code>arn:aws:execute-api</code> — مساحة أسماء الخدمة لـ API Gateway</li>
<li><code>us-east-1</code> — المنطقة</li>
<li><code>123456789012</code> — معرّف حسابك</li>
<li><code>abc123def4</code> — معرّف API</li>
<li><code>/*</code> — يسمح لأي مرحلة وطريقة ومسار باستدعاء الدالة</li>
</ul>
<p>محرف البدل <code>/*</code> مناسب هنا لأن دالة Lambda لديك تتولى التوجيه داخليًا. وإذا أردت تقييد الاستدعاء بمسارات محدّدة، فيمكنك استخدام نمط أكثر تحديدًا مثل <code>/*/GET/items</code>.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p><code>--statement-id</code> مجرّد تسمية تعرّف بيان الإذن هذا. ويجب أن تكون فريدة داخل سياسة موارد الدالة. فإذا حاولت إضافة إذن بمعرّف بيان موجود بالفعل، فسيفشل الأمر. استخدم اسمًا وصفيًا مثل <code>apigateway-invoke</code> أو <code>apigateway-access</code>.</p>
</blockquote>
<h2 id="اختبار-الاتصال">اختبار الاتصال</h2>
<p>بوجود القطع الثلاث كلها، تصبح واجهتك حيّة. ولأن المرحلة <code>$default</code> مفعّلة فيها النشر التلقائي، فمساراتك متاحة فورًا. اختبر باستخدام <code>curl</code>:</p>
<pre><code class="language-bash">curl https://abc123def4.execute-api.us-east-1.amazonaws.com/items
</code></pre>
<p>إذا كان كل شيء موصولًا بشكل صحيح، فستستعيد استجابة JSON من دالة Lambda.</p>
<p>وإذا حصلت على خطأ 500 مع <code>{&quot;message&quot;:&quot;Internal Server Error&quot;}</code>، فالسبب الأرجح هو إذن Lambda الناقص (الخطوة 3). افحص سياسة موارد الدالة:</p>
<pre><code class="language-bash">aws lambda get-policy \\
  --function-name my-frontend-app-api \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>فإذا أرجع هذا «No policy is associated with the given resource»، فأنت بحاجة إلى تشغيل <code>aws lambda add-permission</code> مرة أخرى.</p>
<h2 id="سرد-المسارات-والتكاملات">سرد المسارات والتكاملات</h2>
<p>لرؤية كل المسارات على واجهتك:</p>
<pre><code class="language-bash">aws apigatewayv2 get-routes \\
  --api-id abc123def4 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لرؤية كل التكاملات:</p>
<pre><code class="language-bash">aws apigatewayv2 get-integrations \\
  --api-id abc123def4 \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">ApiGatewayV2Client</span>,
  <span class="hljs-title class_">CreateIntegrationCommand</span>,
  <span class="hljs-title class_">CreateRouteCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-apigatewayv2&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LambdaClient</span>, <span class="hljs-title class_">AddPermissionCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-lambda&#x27;</span>;

<span class="hljs-keyword">const</span> apigw = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGatewayV2Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });
<span class="hljs-keyword">const</span> lambda = <span class="hljs-keyword">new</span> <span class="hljs-title class_">LambdaClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> integration = <span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateIntegrationCommand</span>({
    <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span>,
    <span class="hljs-title class_">IntegrationType</span>: <span class="hljs-string">&#x27;AWS_PROXY&#x27;</span>,
    <span class="hljs-title class_">IntegrationUri</span>: <span class="hljs-string">&#x27;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api&#x27;</span>,
    <span class="hljs-title class_">PayloadFormatVersion</span>: <span class="hljs-string">&#x27;2.0&#x27;</span>,
  }),
);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> routeKey <span class="hljs-keyword">of</span> [<span class="hljs-string">&#x27;GET /items&#x27;</span>, <span class="hljs-string">&#x27;POST /items&#x27;</span>, <span class="hljs-string">&#x27;GET /items/{id}&#x27;</span>] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>) {
  <span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateRouteCommand</span>({
      <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span>,
      <span class="hljs-title class_">RouteKey</span>: routeKey,
      <span class="hljs-title class_">Target</span>: <span class="hljs-string">\`integrations/<span class="hljs-subst">\${integration.IntegrationId}</span>\`</span>,
    }),
  );
}

<span class="hljs-comment">// Grant API Gateway permission to invoke the Lambda. This is a _resource</span>
<span class="hljs-comment">// policy_ on the Lambda, not an IAM policy — it lives on the Lambda itself.</span>
<span class="hljs-keyword">await</span> lambda.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">AddPermissionCommand</span>({
    <span class="hljs-title class_">FunctionName</span>: <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span>,
    <span class="hljs-title class_">StatementId</span>: <span class="hljs-string">&#x27;apigateway-invoke&#x27;</span>,
    <span class="hljs-title class_">Action</span>: <span class="hljs-string">&#x27;lambda:InvokeFunction&#x27;</span>,
    <span class="hljs-title class_">Principal</span>: <span class="hljs-string">&#x27;apigateway.amazonaws.com&#x27;</span>,
    <span class="hljs-title class_">SourceArn</span>: <span class="hljs-string">&#x27;arn:aws:execute-api:us-east-1:123456789012:abc123def4/*/*&#x27;</span>,
  }),
);
</code></pre>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>نسيان البادئة <code>integrations/</code> في <code>--target</code>.</strong> يجب أن يكون الهدف <code>integrations/{IntegrationId}</code>، لا معرّف التكامل وحده. فمن دون البادئة، يُنشأ المسار لكن بلا هدف، وتطابق الطلبات المسار لكنها تُرجع 500.</p>
<p><strong>استخدام صيغة الحمولة الإصدار 1.0 مع أنواع المعالج الإصدار 2.</strong> إذا كان معالجك يستخدم <code>APIGatewayProxyHandlerV2</code> بينما يستخدم التكامل صيغة الحمولة 1.0، فلن يطابق هيكل الحدث تعريفات نوعك. وستكون حقول مثل <code>event.requestContext.http</code> غير معرّفة.</p>
<p><strong>عدم تطابق معرّفات API.</strong> عندما تعمل مع واجهات API متعددة أثناء التطوير، تحقق مرتين من أنك تنشئ المسارات والتكاملات على API الصحيح. ويجب أن يتطابق <code>--api-id</code> في كل الأوامر.</p>
<p>مسارات واجهتك حيّة، لكن ثمة فجوة بين ما تراه في <code>curl</code> وما يحدث في معالج Lambda. فكيف يتحول طلب HTTP إلى حدث Lambda؟ وكيف تتحول قيمة إرجاع معالجك إلى استجابة HTTP؟ يغطّي الدرس التالي ربط الطلب والاستجابة بالتفصيل — الشكل الدقيق لكائن الحدث الذي يتلقاه معالجك وصيغة الاستجابة التي يتوقعها API Gateway.</p>
`,c={book:a,chapter:"aws",chapterTitle:s,slug:n,title:t,headings:e,html:o};export{a as book,p as chapter,s as chapterTitle,c as default,e as headings,o as html,n as slug,t as title};
