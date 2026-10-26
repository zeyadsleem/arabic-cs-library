const s="kinney",o="aws",a="نشر تطبيقات الويب على AWS",n="api-gateway-stages-and-custom-domains",t="المراحل والنشر والنطاقات المخصّصة",e=[{depth:2,id:"المراحل-بيئات-لواجهة-api",text:"المراحل: بيئات لواجهة API"},{depth:3,id:"مرحلة-default",text:"مرحلة $default"},{depth:3,id:"إنشاء-مراحل-مسماة",text:"إنشاء مراحل مسمّاة"},{depth:3,id:"متغيرات-المرحلة",text:"متغيرات المرحلة"},{depth:2,id:"أسماء-النطاقات-المخصصة",text:"أسماء النطاقات المخصّصة"},{depth:3,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:3,id:"إنشاء-النطاق-المخصص",text:"إنشاء النطاق المخصّص"},{depth:3,id:"إنشاء-تعيين-api",text:"إنشاء تعيين API"},{depth:3,id:"إنشاء-سجل-dns",text:"إنشاء سجل DNS"},{depth:2,id:"تحديث-cors-لنطاقك-المخصص",text:"تحديث CORS لنطاقك المخصّص"},{depth:2,id:"تحديد-المعدل",text:"تحديد المعدّل"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],p=`<p>حتى الآن، لدى HTTP API الخاصة بك مرحلة واحدة (<code>$default</code>) وعنوان URL واحد (نقطة النهاية <code>execute-api</code> المولّدة تلقائيًا). هذا يكفي للتطوير، لكن الإنتاج يحتاج إلى المزيد: اسم نطاق مخصّص يطابق واجهتك الأمامية، وبيئات منفصلة للتطوير والإنتاج، وعنوان URL لا يتغيّر عند إعادة إنشاء API. يغطي هذا الدرس الثلاثة جميعًا.</p>
<p>إذا أردت النسخة الرسمية من AWS لسلوك النطاقات المخصّصة أثناء قراءتك، فإن <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-custom-domain-names.html">دليل النطاقات المخصّصة في HTTP API</a> هو المرجع المعتمد.</p>
<h2 id="المراحل-بيئات-لواجهة-api">المراحل: بيئات لواجهة API</h2>
<p><strong>المرحلة</strong> هدف نشر مسمّى لواجهة API الخاصة بك. فكّر فيها مثل فروع البيئات — <code>dev</code> و<code>staging</code> و<code>prod</code> — لكل منها عنوان URL خاص وربما تهيئة خاصة. مرحلة <code>$default</code> التي كنت تستخدمها هي الأبسط: النشر التلقائي مفعّل، والتغييرات تسري فورًا، ولا توجد بادئة مرحلة في عنوان URL.</p>
<h3 id="مرحلة-default">مرحلة <code>$default</code></h3>
<p>تُنشأ مرحلة <code>$default</code> تلقائيًا عند إنشاء HTTP API. ولها خاصيتان مميّزتان:</p>
<ol>
<li><strong>النشر التلقائي</strong> — كل تغيير في المسارات أو التكاملات أو التهيئة يُنشر فورًا.</li>
<li><strong>لا بادئة مرحلة</strong> — عنوان URL هو <code>https://{api-id}.execute-api.{region}.amazonaws.com/items</code>، وليس <code>https://{api-id}.execute-api.{region}.amazonaws.com/prod/items</code>.</li>
</ol>
<p>بالنسبة إلى كثير من التطبيقات، مرحلة <code>$default</code> هي كل ما تحتاجه. إذا كنت تبني واجهة API واحدة لواجهة أمامية واحدة، فلا سبب لإنشاء مراحل إضافية. استخدم متغيرات البيئة في دالة Lambda للتعامل مع السلوك الخاص بكل بيئة (مثل التوجيه إلى قواعد بيانات مختلفة).</p>
<h3 id="إنشاء-مراحل-مسماة">إنشاء مراحل مسمّاة</h3>
<p>إذا أردت بيئات منفصلة ومعزولة — مرحلة <code>dev</code> تختبر فيها التغييرات ومرحلة <code>prod</code> يعمل فيها الشيفرة المستقرّة — يمكنك إنشاء مراحل مسمّاة:</p>
<pre><code class="language-bash">aws apigatewayv2 create-stage \\
  --api-id abc123def4 \\
  --stage-name prod \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;AutoDeploy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CreatedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00+00:00&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;DefaultRouteSettings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;DetailedMetricsEnabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;StageName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;prod&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في وحدة التحكم، يعرض قسم <strong>Stages</strong> في التنقّل الأيسر جميع مراحل واجهة API. والنقر على مرحلة يكشف عنوان URL الخاص باستدعائها وإعدادات النشر.</p>
<p><img src="/arabic-cs-library/images/kinney/00461c360030c981.webp" alt="تعرض صفحة Stages في API Gateway مرحلة $default مدرجة مع خيارات لتحديدها وعرض تفاصيلها بما في ذلك عنوان URL للاستدعاء."></p>
<p>لا تنشر المراحل المسمّاة تلقائيًا. تحتاج إلى إنشاء <strong>عملية نشر</strong> وربطها بالمرحلة:</p>
<pre><code class="language-bash">aws apigatewayv2 create-deployment \\
  --api-id abc123def4 \\
  --stage-name prod \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمّن المراحل المسمّاة اسم المرحلة في عنوان URL: <code>https://abc123def4.execute-api.us-east-1.amazonaws.com/prod/items</code>. تُزال هذه البادئة قبل أن يصل الطلب إلى معالج Lambda — فلا يزال <code>event.requestContext.http.path</code> يعرض <code>/items</code>، وليس <code>/prod/items</code>.</p>
<p>يمكنك تفعيل النشر التلقائي على مرحلة مسمّاة إذا أردت السلوك نفسه الذي توفّره مرحلة <code>$default</code>:</p>
<pre><code class="language-bash">aws apigatewayv2 update-stage \\
  --api-id abc123def4 \\
  --stage-name prod \\
  --auto-deploy \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="متغيرات-المرحلة">متغيرات المرحلة</h3>
<p>يمكن أن تحتوي المراحل على متغيرات — أزواج مفتاح-قيمة تصل إليها من معالج Lambda عبر كائن الحدث:</p>
<pre><code class="language-bash">aws apigatewayv2 update-stage \\
  --api-id abc123def4 \\
  --stage-name prod \\
  --stage-variables <span class="hljs-string">&#x27;{&quot;TABLE_NAME&quot;:&quot;my-frontend-app-data&quot;,&quot;LOG_LEVEL&quot;:&quot;warn&quot;}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>في معالجك، يمكن الوصول إلى متغيرات المرحلة عبر <code>event.stageVariables</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> tableName = event.<span class="hljs-property">stageVariables</span>?.<span class="hljs-property">TABLE_NAME</span> ?? <span class="hljs-string">&#x27;my-frontend-app-data-dev&#x27;</span>;
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تكون متغيرات المرحلة مفيدة لتوجيه المراحل المختلفة إلى موارد خلفية مختلفة — جدول DynamoDB في <code>dev</code> مقابل جدول DynamoDB في <code>prod</code>، على سبيل المثال. لكن للتهيئة الحسّاسة، استخدم متغيرات بيئة Lambda أو Secrets Manager بدلًا منها. متغيرات المرحلة مرئية في تهيئة API Gateway وغير مشفّرة.</p>
</blockquote>
<h2 id="أسماء-النطاقات-المخصصة">أسماء النطاقات المخصّصة</h2>
<p>عنوان URL المولّد تلقائيًا (<code>https://abc123def4.execute-api.us-east-1.amazonaws.com</code>) يعمل، لكنه ليس شيئًا تريده في الإنتاج. يجب أن تستدعي واجهتك الأمامية <code>https://api.example.com</code>، بدلًا من اسم مضيف غامض تولّده AWS. تمنحك أسماء النطاقات المخصّصة عنوان URL ثابتًا بهوية علامتك يستمر حتى إذا أعدت إنشاء API.</p>
<h3 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h3>
<p>قبل إنشاء اسم نطاق مخصّص، تحتاج إلى:</p>
<ol>
<li><strong>نطاق تتحكّم به</strong> — يُدار عبر Route 53 أو أي مزوّد DNS.</li>
<li><strong>شهادة ACM</strong> تغطي النطاق — تُنشأ في المنطقة نفسها التي توجد فيها واجهة API (بالنسبة إلى HTTP APIs، هذه هي المنطقة التي تعيش فيها API، على خلاف CloudFront الذي يتطلّب <code>us-east-1</code>). تُهيّأ شهادات ACM في <a href="https://stevekinney.com/courses/aws/attaching-an-ssl-certificate">إرفاق شهادة SSL</a>.</li>
</ol>
<h3 id="إنشاء-النطاق-المخصص">إنشاء النطاق المخصّص</h3>
<pre><code class="language-bash">aws apigatewayv2 create-domain-name \\
  --domain-name api.example.com \\
  --domain-name-configurations \\
    CertificateArn=arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234-efgh-5678 \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;api.example.com&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;DomainNameConfigurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ApiGatewayDomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d-abc123.execute-api.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;CertificateArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234-efgh-5678&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;DomainNameStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AVAILABLE&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;EndpointType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;REGIONAL&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;SecurityPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;TLS_1_2&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تتضمّن الاستجابة <code>ApiGatewayDomainName</code> — وهذا هو الهدف الذي تحتاجه لسجل DNS لديك.</p>
<h3 id="إنشاء-تعيين-api">إنشاء تعيين API</h3>
<p>يربط <strong>تعيين API</strong> نطاقك المخصّص بواجهة API ومرحلة محدّدتين. وهذا يخبر API Gateway: «عندما يصل طلب إلى <code>api.example.com</code>، وجّهه إلى واجهة API هذه على هذه المرحلة.»</p>
<pre><code class="language-bash">aws apigatewayv2 create-api-mapping \\
  --domain-name api.example.com \\
  --api-id abc123def4 \\
  --stage <span class="hljs-string">&#x27;$default&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ApiMappingId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;mapping123&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Stage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$default&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يمكنك أيضًا استخدام المعامل <code>--api-mapping-key</code> لتعيين بادئة مسار. على سبيل المثال، التعيين باستخدام <code>--api-mapping-key v1</code> يجعل واجهة API متاحة على <code>api.example.com/v1/items</code> بدلًا من <code>api.example.com/items</code>. وهذا مفيد لإدارة إصدارات API.</p>
<h3 id="إنشاء-سجل-dns">إنشاء سجل DNS</h3>
<p>وجّه نطاقك المخصّص إلى اسم نطاق API Gateway. إذا كنت تستخدم Route 53، فأنشئ سجل A بهدف alias:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --change-batch <span class="hljs-string">&#x27;{
    &quot;Changes&quot;: [
      {
        &quot;Action&quot;: &quot;CREATE&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;api.example.com&quot;,
          &quot;Type&quot;: &quot;A&quot;,
          &quot;AliasTarget&quot;: {
            &quot;DNSName&quot;: &quot;d-abc123.execute-api.us-east-1.amazonaws.com&quot;,
            &quot;HostedZoneId&quot;: &quot;Z1UJRXOUMOOFQ8&quot;,
            &quot;EvaluateTargetHealth&quot;: false
          }
        }
      }
    ]
  }&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p><code>DNSName</code> هو <code>ApiGatewayDomainName</code> من استجابة <code>create-domain-name</code>. أما <code>HostedZoneId</code> فهو المنطقة المستضافة لخدمة API Gateway في منطقتك — وهذه قيمة ثابتة لكل منطقة، وليست المنطقة المستضافة لنطاقك. بالنسبة إلى نقاط نهاية API Gateway الإقليمية في <code>us-east-1</code>، فإن معرّف المنطقة المستضافة في Route 53 هو <code>Z1UJRXOUMOOFQ8</code>.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>يستغرق انتشار DNS وقتًا. بعد إنشاء السجل، قد لا يُحلّ نطاقك المخصّص فورًا. أمهله بضع دقائق واختبر باستخدام <code>dig api.example.com</code> للتحقّق من وجود السجل قبل استكشاف الأخطاء.</p>
</blockquote>
<p>إذا كنت تستخدم مزوّد DNS خارجيًا (ليس Route 53)، فأنشئ سجل CNAME يوجّه <code>api.example.com</code> إلى قيمة <code>ApiGatewayDomainName</code>. تذكّر الفرق بين سجلات alias وسجلات CNAME من <a href="https://stevekinney.com/courses/aws/alias-records-vs-cname-records">سجلات Alias مقابل سجلات CNAME</a> — يُفضَّل سجل alias عند استخدام Route 53 لأنه يدعم قمة المنطقة ولا يفرض كلفة إضافية لاستعلام DNS.</p>
<h2 id="تحديث-cors-لنطاقك-المخصص">تحديث CORS لنطاقك المخصّص</h2>
<p>بعد إعداد نطاق مخصّص، حدّث تهيئة CORS لتشمل الأصل الجديد الذي ستستخدمه واجهتك الأمامية. إذا كانت واجهتك الأمامية تستدعي <code>api.example.com</code> وموقعك يعمل على <code>example.com</code>:</p>
<pre><code class="language-bash">aws apigatewayv2 update-api \\
  --api-id abc123def4 \\
  --cors-configuration <span class="hljs-string">&#x27;{&quot;AllowOrigins&quot;:[&quot;https://example.com&quot;,&quot;http://localhost:3000&quot;],&quot;AllowMethods&quot;:[&quot;GET&quot;,&quot;POST&quot;,&quot;PUT&quot;,&quot;DELETE&quot;],&quot;AllowHeaders&quot;:[&quot;Content-Type&quot;,&quot;Authorization&quot;],&quot;MaxAge&quot;:86400}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="تحديد-المعدل">تحديد المعدّل</h2>
<p>تعرض كل مرحلة في API Gateway عناصر تحكّم في تحديد المعدّل تحمي دوال Lambda من الاستغلال العابر. تهمّك قيمتان: <strong>حدّ الاندفاع</strong> (حجم دلو الرموز، الذي يحدّ الارتفاعات القصيرة) و<strong>حدّ المعدّل</strong> (معدّل إعادة التعبئة في الحالة المستقرّة، بالطلبات في الثانية). إن <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html">القيم الافتراضية على مستوى الحساب</a> — حدّ اندفاع <strong>5,000</strong> و<strong>10,000</strong> طلب في الثانية في الحالة المستقرّة، مشتركة بين <em>جميع</em> واجهات API في الحساب — سخية بما يكفي لإفلاس مشروع شخصي إذا ساء شيء. اضبط حدودًا صريحة ومتحفّظة على مرحلتك:</p>
<pre><code class="language-bash">aws apigatewayv2 update-stage \\
  --api-id <span class="hljs-string">&quot;<span class="hljs-variable">$API_ID</span>&quot;</span> \\
  --stage-name <span class="hljs-string">&#x27;$default&#x27;</span> \\
  --default-route-settings <span class="hljs-string">&#x27;{&quot;ThrottlingBurstLimit&quot;:100,&quot;ThrottlingRateLimit&quot;:50}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يقصّر هذا المرحلة على 50 طلبًا في الثانية بشكل مستمر، مع مجال لاستيعاب اندفاعات قصيرة تصل إلى 100 طلب قبل أن يبدأ تحديد المعدّل. (الاندفاع ليس هو «التنفيذات المتزامنة» — فذلك مفهوم في Lambda يُتحكّم به بشكل منفصل. الاندفاع هو حجم دلو الرموز الذي يسمح للحركة بتجاوز معدّل الحالة المستقرّة لفترة قصيرة.) تتلقّى الطلبات المحدّدة استجابة <code>429 Too Many Requests</code>. بالنسبة إلى واجهة API شخصية لواجهة أمامية، تترك هذه الأرقام هامشًا واسعًا للحركة الحقيقية مع منع العملاء الجامحين من توليد تكاليف استدعاء Lambda غير متوقّعة.</p>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">ApiGatewayV2Client</span>,
  <span class="hljs-title class_">CreateStageCommand</span>,
  <span class="hljs-title class_">CreateDeploymentCommand</span>,
  <span class="hljs-title class_">UpdateStageCommand</span>,
  <span class="hljs-title class_">CreateDomainNameCommand</span>,
  <span class="hljs-title class_">CreateApiMappingCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-apigatewayv2&#x27;</span>;

<span class="hljs-keyword">const</span> apigw = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGatewayV2Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-comment">// Create a stage (called &#x27;prod&#x27;), then deploy and point the stage at it.</span>
<span class="hljs-keyword">const</span> stage = <span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateStageCommand</span>({
    <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span>,
    <span class="hljs-title class_">StageName</span>: <span class="hljs-string">&#x27;prod&#x27;</span>,
    <span class="hljs-title class_">AutoDeploy</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-title class_">ThrottleSettings</span>: { <span class="hljs-title class_">RateLimit</span>: <span class="hljs-number">50</span>, <span class="hljs-title class_">BurstLimit</span>: <span class="hljs-number">100</span> },
  }),
);

<span class="hljs-comment">// If AutoDeploy is off, you make a deployment + point the stage at it.</span>
<span class="hljs-keyword">const</span> deployment = <span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateDeploymentCommand</span>({ <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span> }));
<span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateStageCommand</span>({
    <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span>,
    <span class="hljs-title class_">StageName</span>: <span class="hljs-string">&#x27;prod&#x27;</span>,
    <span class="hljs-title class_">DeploymentId</span>: deployment.<span class="hljs-property">DeploymentId</span>,
  }),
);

<span class="hljs-comment">// Custom domain + mapping:</span>
<span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateDomainNameCommand</span>({
    <span class="hljs-title class_">DomainName</span>: <span class="hljs-string">&#x27;api.example.com&#x27;</span>,
    <span class="hljs-title class_">DomainNameConfigurations</span>: [
      {
        <span class="hljs-title class_">CertificateArn</span>: <span class="hljs-string">&#x27;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6&#x27;</span>,
        <span class="hljs-title class_">EndpointType</span>: <span class="hljs-string">&#x27;REGIONAL&#x27;</span>,
      },
    ],
  }),
);
<span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateApiMappingCommand</span>({
    <span class="hljs-title class_">DomainName</span>: <span class="hljs-string">&#x27;api.example.com&#x27;</span>,
    <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span>,
    <span class="hljs-title class_">Stage</span>: <span class="hljs-string">&#x27;prod&#x27;</span>,
  }),
);
</code></pre>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>استخدام منطقة الشهادة الخاطئة.</strong> بالنسبة إلى HTTP APIs، يجب أن تكون شهادة ACM في المنطقة نفسها التي توجد فيها API. وهذا يختلف عن CloudFront، الذي يتطلّب شهادات في <code>us-east-1</code> بصرف النظر عن مكان تشغيل التوزيع.</p>
<p><strong>نسيان تعيين API.</strong> إنشاء اسم نطاق مخصّص ليس كافيًا — تحتاج أيضًا إلى تعيين API لربط النطاق بواجهة API ومرحلة محدّدتين. وبدون التعيين، تعيد الطلبات إلى النطاق المخصّص 403.</p>
<p><strong>الخلط في بادئة المرحلة.</strong> تضيف المراحل المسمّاة بادئة إلى عنوان URL الخاص بـ <code>execute-api</code>، لكن النطاقات المخصّصة مع تعيينات API لا تفعل ذلك. إذا كانت مرحلتك <code>prod</code> وكان نطاقك المخصّص يعيّن إليها، فإن الطلبات إلى <code>api.example.com/items</code> تُوجَّه بشكل صحيح — ولا تحتاج إلى <code>api.example.com/prod/items</code>.</p>
<p>واجهة API لديك منشورة وقابلة للتوجيه ولها اسم نطاق مناسب. لكنها مفتوحة على مصراعيها — فأي شخص يملك عنوان URL يمكنه استدعاء أي نقطة نهاية. يغطي الدرس التالي إضافة المصادقة إلى مسارات API لديك، بحيث لا يستطيع الوصول إلى نقاط النهاية الخاصة بك إلا المستخدمون المخوّلون.</p>
`,l={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:e,html:p};export{s as book,o as chapter,a as chapterTitle,l as default,e as headings,p as html,n as slug,t as title};
