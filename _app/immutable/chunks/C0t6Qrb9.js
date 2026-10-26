const s="kinney",o="aws",a="نشر تطبيقات الويب على AWS",n="infrastructure-as-code-and-cdk",t="البنية التحتية كشيفرة: متى تلجأ إلى CDK",p=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"يبنى-على",text:"يُبنى على"},{depth:2,id:"عناء-التهيئة-اليدوية",text:"عناء التهيئة اليدوية"},{depth:2,id:"cloudformation-الأساس",text:"CloudFormation: الأساس"},{depth:2,id:"cdk-البنية-التحتية-بـ-typescript",text:"CDK: البنية التحتية بـ TypeScript"},{depth:2,id:"sst-cdk-من-أجل-serverless",text:"SST: CDK من أجل Serverless"},{depth:2,id:"أيها-تستخدم",text:"أيها تستخدم؟"},{depth:2,id:"القيمة-الحقيقية",text:"القيمة الحقيقية"},{depth:2,id:"التحقق",text:"التحقّق"},{depth:2,id:"أنماط-الفشل-الشائعة",text:"أنماط الفشل الشائعة"}],l=`<p>أمضيت هذه الدورة كلها تتنقّل في وحدات تحكم AWS وتشغّل أوامر سطر الأوامر. أنشأت حاوية S3، وهيأت توزيع CloudFront، وأعددت API Gateway، وأرفقت أدوار IAM، وأنشأت جدول DynamoDB، وربطت كل ذلك معًا. إنه يعمل. لكن ثمة مشكلة: لو اضطررت إلى فعل كل ذلك من جديد — على حساب جديد، أو لبيئة Scratch Lab جديدة، أو لزميل — لاحتجت إلى تكرار كل خطوة من ذاكرتك، بالترتيب الصحيح، ومن دون أخطاء.</p>
<p>إن أردت الصياغة الرسمية من AWS لأداة IaC الخاصة بها في هذا الدرس، فإن <a href="https://docs.aws.amazon.com/cdk/v2/guide/home.html">دليل مطوّري AWS CDK</a> هو المرجع المعتمد.</p>
<blockquote>
<p><strong>CDK v2 فقط</strong></p>
<p>كل ما في هذا الدرس يستخدم <strong>CDK v2</strong> (<code>aws-cdk-lib</code>). فقد وصل CDK v1 إلى نهاية الدعم في منتصف 2023. وإن صادفت دروسًا تستورد من <code>@aws-cdk/aws-s3</code> أو <code>@aws-cdk/aws-lambda</code> (حزمة واحدة لكل خدمة)، فذلك v1 — لا تنسخه. أما v2 فيجمع كل شيء في <code>aws-cdk-lib</code> مع <code>constructs</code>. تحقّق من ذلك بالنظر إلى <code>package.json</code>: <code>&quot;aws-cdk-lib&quot;: &quot;^2.x&quot;</code> يعني v2.</p>
</blockquote>
<p><strong>البنية التحتية كشيفرة</strong> هي ما يحلّ تلك المشكلة. فبدلًا من تهيئة الخدمات يدويًا عبر لوحة تحكم ويب، تكتب شيفرة تصف بنيتك التحتية. وتُدخل تلك الشيفرة في نظام التحكّم في الإصدارات. وتنشرها بأمر واحد. وحين تحتاج إلى هدمها أو تحديثها أو تكرارها، تكون الشيفرة هي مصدر الحقيقة — لا سلسلة نقرات في لوحة التحكم تذكر نصفها.</p>
<p>إن كنت قد استخدمت <code>package.json</code> يومًا لوصف اعتماديات مشروعك، فقد فهمت الفكرة بالفعل. فـ IaC هو <code>package.json</code> لبنيتك التحتية على AWS.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>هذا هو الدرس الذي تنعطف فيه الدورة أخيرًا على نفسها. فحتى هذه اللحظة، كانت التهيئة اليدوية هي الخطوة الصحيحة لأنك كنت تحتاج إلى رؤية كل خدمة مكشوفة. لكن بمجرد أن تفهم القطع، لم يعد تكرار رقصة لوحة التحكم تعليميًا. إنه مجرد انحراف في التهيئة ينتظر أن يحدث.</p>
<h2 id="يبنى-على">يُبنى على</h2>
<ul>
<li><a href="https://stevekinney.com/courses/aws/full-static-pipeline">خط أنابيب الموقع الثابت الكامل</a></li>
<li><a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هي Lambda ولماذا يهتم مهندسو الواجهة الأمامية</a></li>
<li><a href="https://stevekinney.com/courses/aws/what-is-dynamodb">ما هو DynamoDB ومتى تستخدمه</a></li>
</ul>
<pre><code>flowchart LR
    Code[&quot;TypeScript / YAML / SST config&quot;] --&gt; Synth[&quot;CDK or SST synth&quot;]
    Synth --&gt; CFN[&quot;CloudFormation stack&quot;]
    CFN --&gt; Infra[&quot;AWS resources&quot;]
    Infra --&gt; Drift[&quot;Reproducible changes&lt;br/&gt;instead of console drift&quot;]
</code></pre>
<h2 id="عناء-التهيئة-اليدوية">عناء التهيئة اليدوية</h2>
<p>قد لا تشعر بالوجع بعد. فلديك مشروع واحد، وحساب واحد، وقد أعددت كل شيء للتو. لكن فكّر فيما يحدث مع نموّك:</p>
<p><strong>قابلية التكرار.</strong> ينضم مطوّر جديد إلى فريقك ويحتاج بيئة اختبار خاصة به. فتعطيه مستندًا من 47 خطوة. فيفوته الخطوة 23. وتنكسر البيئة بشكل يتطلّب ساعتين لتصحيحه، لأن رسالة الخطأ من CloudFront هي «Access Denied» والمشكلة الفعلية سياسة حاوية مفقودة.</p>
<p><strong>الانحراف.</strong> يُجري أحدهم إصلاحًا سريعًا في لوحة التحكم — يعدّل مهلة Lambda، أو يضيف ترويسة CORS، أو يغيّر إعداد سعة DynamoDB. وهذا التغيير موجود في AWS فقط، لا في أي توثيق أو شيفرة. وبعد ثلاثة أشهر، تنشر بيئة «جديدة» من مستندك فيتصرّف بشكل مختلف عن الإنتاج. وتقضي يومًا في اكتشاف السبب.</p>
<p><strong>التدقيق.</strong> يسأل فريق الأمان لديك: «ما الذي تغيّر في الشهر الماضي؟» مع تغييرات لوحة التحكم، الجواب: اذهب واقرأ سجلات CloudTrail وحاول إعادة بناء ما حدث. أما مع IaC، فالجواب: انظر إلى تاريخ Git.</p>
<p><strong>التعافي من الكوارث.</strong> يحدث شيء كارثي — حذف عارض، أو انقطاع منطقة، أو اختراق حساب. فما مدى سرعة إعادة البناء؟ مع التهيئة اليدوية: ساعات إلى أيام. ومع IaC: دقائق.</p>
<h2 id="cloudformation-الأساس">CloudFormation: الأساس</h2>
<p><strong>CloudFormation</strong> هي خدمة IaC الأصلية في AWS. تكتب قالبًا — ملف JSON أو YAML — يصف كل مورد تريده. فتقرأ CloudFormation القالب، وتنشئ الموارد، وتتتبّع حالتها. وحين تحدّث القالب، تستنتج CloudFormation ما تغيّر وتطبّق الفروق فقط.</p>
<p>إليك قالب CloudFormation صغيرًا ينشئ حاوية S3:</p>
<pre><code class="language-yaml"><span class="hljs-attr">AWSTemplateFormatVersion:</span> <span class="hljs-string">&#x27;2010-09-09&#x27;</span>
<span class="hljs-attr">Description:</span> <span class="hljs-string">S3</span> <span class="hljs-string">bucket</span> <span class="hljs-string">for</span> <span class="hljs-string">static</span> <span class="hljs-string">frontend</span> <span class="hljs-string">assets</span>

<span class="hljs-attr">Resources:</span>
  <span class="hljs-attr">FrontendBucket:</span>
    <span class="hljs-attr">Type:</span> <span class="hljs-string">AWS::S3::Bucket</span>
    <span class="hljs-attr">Properties:</span>
      <span class="hljs-attr">BucketName:</span> <span class="hljs-string">my-frontend-app-assets</span>
      <span class="hljs-attr">PublicAccessBlockConfiguration:</span>
        <span class="hljs-attr">BlockPublicAcls:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">BlockPublicPolicy:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">IgnorePublicAcls:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">RestrictPublicBuckets:</span> <span class="hljs-literal">true</span>
</code></pre>
<p>تنشره بـ:</p>
<pre><code class="language-bash">aws cloudformation deploy \\
  --template-file template.yaml \\
  --stack-name my-frontend-app \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تنشئ CloudFormation <strong>مكدّسًا</strong> — مجموعة موارد تُدار كوحدة واحدة. احذف المكدّس، فتُحذف الموارد كلها. وحدّث القالب، وأعد النشر، فتتولّى CloudFormation التغييرات.</p>
<p>والقيمة واضحة: ملف YAML هذا هو بنيتك التحتية. أدخله في Git، وراجعه في طلبات السحب، فيستطيع أي أحد نشر البيئة نفسها بأمر واحد.</p>
<p>والجانب السلبي واضح أيضًا: قوالب CloudFormation تصير مطوّلة بسرعة. فنشر واجهة أمامية ثابتة كامل — حاوية S3، وسياسة حاوية، وتوزيع CloudFront، وOAC، وشهادة ACM، وسجلات Route 53 — قد يبلغ بسهولة 200-300 سطر من YAML. وYAML ليس ممتعًا تمامًا في الكتابة على نطاق واسع. (بصراحة، لست متأكدًا أن YAML ممتع في الكتابة على <em>أي</em> نطاق.)</p>
<h2 id="cdk-البنية-التحتية-بـ-typescript">CDK: البنية التحتية بـ TypeScript</h2>
<p><strong>AWS Cloud Development Kit (CDK)</strong> يحلّ مشكلة الإطالة. فبدلًا من كتابة YAML، تكتب شيفرة حقيقية — TypeScript أو Python أو Java أو Go — تولّد قوالب CloudFormation في الخلف. ويمنحك CDK كامل قوة لغة برمجة: متغيّرات، وحلقات، وشرطيات، وتجريدات، وفحص أنواع.</p>
<p>إليك شكل بنيتك التحتية للموقع الثابت التي بنيتها يدويًا في CDK، باستخدام TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cdk <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> s3 <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-s3&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cloudfront <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-cloudfront&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> origins <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-cloudfront-origins&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> acm <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-certificatemanager&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> route53 <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-route53&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> targets <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-route53-targets&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">FrontendStack</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">cdk.Stack</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">scope</span>: cdk.<span class="hljs-title class_">App</span>, <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">super</span>(scope, id);

    <span class="hljs-keyword">const</span> bucket = <span class="hljs-keyword">new</span> s3.<span class="hljs-title class_">Bucket</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;Assets&#x27;</span>, {
      <span class="hljs-attr">bucketName</span>: <span class="hljs-string">&#x27;my-frontend-app-assets&#x27;</span>,
      <span class="hljs-attr">blockPublicAccess</span>: s3.<span class="hljs-property">BlockPublicAccess</span>.<span class="hljs-property">BLOCK_ALL</span>,
      <span class="hljs-attr">removalPolicy</span>: cdk.<span class="hljs-property">RemovalPolicy</span>.<span class="hljs-property">DESTROY</span>,
    });

    <span class="hljs-keyword">const</span> certificate = acm.<span class="hljs-property">Certificate</span>.<span class="hljs-title function_">fromCertificateArn</span>(
      <span class="hljs-variable language_">this</span>,
      <span class="hljs-string">&#x27;Certificate&#x27;</span>,
      <span class="hljs-string">&#x27;arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id&#x27;</span>,
    );

    <span class="hljs-keyword">const</span> distribution = <span class="hljs-keyword">new</span> cloudfront.<span class="hljs-title class_">Distribution</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;CDN&#x27;</span>, {
      <span class="hljs-attr">defaultBehavior</span>: {
        <span class="hljs-attr">origin</span>: origins.<span class="hljs-property">S3BucketOrigin</span>.<span class="hljs-title function_">withOriginAccessControl</span>(bucket),
        <span class="hljs-attr">viewerProtocolPolicy</span>: cloudfront.<span class="hljs-property">ViewerProtocolPolicy</span>.<span class="hljs-property">REDIRECT_TO_HTTPS</span>,
      },
      <span class="hljs-attr">defaultRootObject</span>: <span class="hljs-string">&#x27;index.html&#x27;</span>,
      <span class="hljs-attr">domainNames</span>: [<span class="hljs-string">&#x27;example.com&#x27;</span>],
      certificate,
      <span class="hljs-attr">errorResponses</span>: [
        {
          <span class="hljs-attr">httpStatus</span>: <span class="hljs-number">404</span>,
          <span class="hljs-attr">responseHttpStatus</span>: <span class="hljs-number">200</span>,
          <span class="hljs-attr">responsePagePath</span>: <span class="hljs-string">&#x27;/index.html&#x27;</span>,
        },
      ],
    });

    <span class="hljs-keyword">const</span> zone = route53.<span class="hljs-property">HostedZone</span>.<span class="hljs-title function_">fromLookup</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;Zone&#x27;</span>, {
      <span class="hljs-attr">domainName</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
    });

    <span class="hljs-keyword">new</span> route53.<span class="hljs-title class_">ARecord</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;DNS&#x27;</span>, {
      zone,
      <span class="hljs-attr">target</span>: route53.<span class="hljs-property">RecordTarget</span>.<span class="hljs-title function_">fromAlias</span>(<span class="hljs-keyword">new</span> targets.<span class="hljs-title class_">CloudFrontTarget</span>(distribution)),
    });
  }
}
</code></pre>
<p>هذا نحو 45 سطرًا من TypeScript. ينشئ حاوية S3 محجوب وصولها العام، وتوزيع CloudFront مع OAC، وإعادة توجيه HTTPS، ومعالجة أخطاء SPA، وسجل Alias في Route 53 — أي قوس الاستضافة الثابتة كله تقريبًا في ملف واحد. ولأنها TypeScript، تحصل على الإكمال التلقائي وأخطاء الأنواع والتحقّق وقت الترجمة.</p>
<p>تنشره بـ:</p>
<pre><code class="language-bash">npx cdk deploy --region us-east-1
</code></pre>
<p>يُصنّع CDK شيفرة TypeScript إلى قالب CloudFormation (غالبًا مئات الأسطر من YAML) وينشره. ولن تحتاج أبدًا إلى قراءة ذلك الـ YAML أو كتابته.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يستخدم CDK تجريدات — لبنات بناء قابلة لإعادة الاستخدام — على مستويات مختلفة من التجريد. فالصنف <code>Distribution</code> أعلاه «تجريد من المستوى الثاني (L2)» يضبط إعدادات افتراضية معقولة ويخفي تفاصيل CloudFormation المنخفضة المستوى. وإن احتجت إلى تحكّم كامل، يمكنك النزول إلى تجريدات المستوى الأول (L1) التي تُقابل موارد CloudFormation واحدًا لواحد.</p>
</blockquote>
<h2 id="sst-cdk-من-أجل-serverless">SST: CDK من أجل Serverless</h2>
<p><strong>SST</strong> (اسمها الأصلي «Serverless Stack») هو إطار عمل مبني فوق CDK ومصمّم خصيصًا لتطبيقات Serverless كاملة الحزمة. فإن كان CDK هو «البنية التحتية كشيفرة بـ TypeScript»، فـ SST هو «البنية التحتية كشيفرة بـ TypeScript، لكن برأي واضح في الأنماط التي ستستخدمها فعلًا».</p>
<p>يضيف SST عدة أشياء لا يوفّرها CDK جاهزة:</p>
<ul>
<li><strong>تطوير Lambda الحي.</strong> تعمل شيفرة دالة Lambda لديك محليًا وتتصل بموارد AWS حقيقية، فتحصل على تغذية راجعة فورية دون نشر عند كل تغيير. وإن كنت قد استخدمت <code>next dev</code> أو <code>vite dev</code>، فهذا مكافئه لواجهات الخلفية في Serverless.</li>
<li><strong>تجريدات أعلى مستوى.</strong> يوفّر SST مكوّنات مثل <code>StaticSite</code> و<code>Api</code> و<code>Table</code> تجمع موارد AWS متعددة في إعداد افتراضي واحد معقول. فيستغرق إنشاء تطبيق كامل الحزمة بضعة أسطر بدلًا من بضع صفحات.</li>
<li><strong>تكامل مع أطر الواجهة الأمامية.</strong> يعرف SST عن Next.js وAstro وSvelteKit وأطر أخرى. ويمكنه نشر واجهتك الأمامية وخلفيتك معًا، مع إدارة خط أنابيب البناء تلقائيًا.</li>
</ul>
<p>إليك الموقع الثابت نفسه في SST:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">new</span> sst.<span class="hljs-property">aws</span>.<span class="hljs-title class_">StaticSite</span>(<span class="hljs-string">&#x27;Frontend&#x27;</span>, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./build&#x27;</span>,
  <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
});
</code></pre>
<p>سطران. ينشئ SST حاوية S3 وتوزيع CloudFront وOAC وشهادة ACM وسجلات Route 53 تلقائيًا. ويطبّق أفضل الممارسات نفسها التي هيّأتها يدويًا طوال قوس الاستضافة الثابتة.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>SST مشروع مفتوح المصدر من طرف ثالث، وليس منتجًا من AWS. وله مجتمع قوي وتطوير نشط، لكنه اعتمادية تتحمّلها. فإن كانت آراء SST في بنية المشروع وأنماط النشر لا تناسبك، فإن CDK يمنحك القوة نفسها بمرونة أكبر.</p>
</blockquote>
<h2 id="أيها-تستخدم">أيها تستخدم؟</h2>
<p>هذا ليس تعمّقًا في أي من هذه الأدوات. فلن تتعلم CDK أو SST في هذا الدرس. لكن إليك مصفوفة القرار الصادقة:</p>
<p><strong>CloudFormation</strong> هو الخيار الصحيح إن أردت أقصى تحكّم، وبلا اعتماديات خارجية، وكنت مستعدًا لكتابة YAML/JSON مطوّل. ومعظم المؤسسات الكبيرة تستخدم CloudFormation (أو أدوات تولّده) لأنه اللبنة الأصلية في AWS.</p>
<p><strong>CDK</strong> هو الخيار الصحيح إن أردت أمان الأنواع وتجريدات قابلة لإعادة الاستخدام، وكنت مرتاحًا في كتابة TypeScript (وأنت كذلك كمهندس واجهة أمامية). وCDK منتج من AWS بدعم قوي ونظام بيئي كبير.</p>
<p><strong>SST</strong> هو الخيار الصحيح إن كنت تبني بالضبط نوع التطبيق الذي تعلّمه هذه الدورة — واجهة أمامية بواجهة خلفية Serverless — وتريد أسرع طريق من الشيفرة إلى بنية تحتية منشورة. فآراء SST توفّر الوقت عندما تطابق حالة استخدامك.</p>
<p>كل الأدوات الثلاث تنتج قوالب CloudFormation في النهاية. أما الاختلافات فتكمن في كيفية كتابتك وصيانتك للشيفرة التي تولّد تلك القوالب.</p>
<h2 id="القيمة-الحقيقية">القيمة الحقيقية</h2>
<p>إليك ما يهمّ فعلًا: الآن، تفهم كيف تعمل كل خدمة لأنك هيّأتها بيدك. وهذا الفهم دائم وقابل للنقل. لا يهمّ إن استخدمت CDK أو SST أو Terraform أو Pulumi أو CloudFormation الخام — فأنت تعرف ما تفعله سياسة الحاوية، ولماذا يوجد OAC، وكيف تعمل أدوار التنفيذ، وماذا تعني ترويسات CORS. لقد أنجزت الجزء الصعب.</p>
<p>IaC ليس بديلًا عن ذلك الفهم. إنه طريقة لتشفيره. فالشيفرة التي تكتبها في CDK لا تجود إلا بقدر جودة معرفتك بالخدمات الأساسية. ولأنك بنيت كل شيء يدويًا أولًا، ستعرف فعلًا ما تفعله IaC حين يحدث خطأ — وسيحدث، لأن البنية التحتية بنية تحتية سواء كتبتها بـ YAML أو TypeScript.</p>
<h2 id="التحقق">التحقّق</h2>
<p>لا تحتاج إلى نشر CDK في هذا الدرس، لكن ينبغي أن تكون قادرًا على التحقّق من النموذج الذهني:</p>
<ul>
<li>هل يمكنك الإشارة إلى تغيير يدوي واحد في الدورة وقول ما سيصير إليه في الشيفرة؟</li>
<li>هل يمكنك شرح مورد CloudFormation المختبئ تحت تجريد CDK الودود؟</li>
<li>هل يمكنك شرح ما سيحدث لو أعاد زميل إنشاء Scratch Lab في حساب آخر من تعريف IaC نفسه؟</li>
</ul>
<p>إن كانت هذه الأجوبة واضحة، فقد أدى الدرس مهمّته.</p>
<h2 id="أنماط-الفشل-الشائعة">أنماط الفشل الشائعة</h2>
<ul>
<li><strong>القفز إلى التجريدات قبل فهم الخدمات:</strong> يمنحك هذا سقالات سريعة وحدسًا بائسًا في التصحيح.</li>
<li><strong>التعامل مع CDK كسحر لا كتوليد لـ CloudFormation:</strong> حين تحدث أخطاء النشر، فأنت ما زلت تحتاج إلى نموذج AWS الأساسي.</li>
<li><strong>تشفير بنية تحتية سيئة بشكل أسرع:</strong> IaC يحفظ القرارات الجيدة <em>والسيئة</em> بأمانة.</li>
<li><strong>ترك الإطار يختار كل شيء بصمت:</strong> الإعدادات الافتراضية المعقولة رائعة إلى أن تكفّ عن مطابقة نظامك الفعلي.</li>
</ul>
`,e={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,o as chapter,a as chapterTitle,e as default,p as headings,l as html,n as slug,t as title};
