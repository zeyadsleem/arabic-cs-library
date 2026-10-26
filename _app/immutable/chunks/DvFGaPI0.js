const s="kinney",l="aws",n="نشر تطبيقات الويب على AWS",a="writing-a-lambda-at-edge-function",t="كتابة دالة Lambda@Edge",e=[{depth:2,id:"شرط-us-east-1",text:"شرط us-east-1"},{depth:2,id:"توقيع-المعالج",text:"توقيع المعالج"},{depth:3,id:"شكل-كائن-الحدث",text:"شكل كائن الحدث"},{depth:3,id:"إرجاع-طلب-مقابل-استجابة",text:"إرجاع طلب مقابل استجابة"},{depth:2,id:"كتابة-الدالة-ونشرها",text:"كتابة الدالة ونشرها"},{depth:3,id:"كتابة-المعالج",text:"كتابة المعالج"},{depth:3,id:"إنشاء-دور-التنفيذ",text:"إنشاء دور التنفيذ"},{depth:3,id:"النشر-إلى-us-east-1",text:"النشر إلى us-east-1"},{depth:3,id:"نشر-نسخة-مرقمة",text:"نشر نسخة مرقّمة"},{depth:3,id:"الربط-بسلوك-cloudfront",text:"الربط بسلوك CloudFront"},{depth:2,id:"نموذج-النسخ-المتماثل",text:"نموذج النسخ المتماثل"},{depth:2,id:"قيود-يجب-تذكرها",text:"قيود يجب تذكّرها"},{depth:2,id:"التنظيف",text:"التنظيف"}],p=`<p>تمثّل Lambda@Edge دالة Lambda كاملة تعمل في ذاكرات الحافة الإقليمية في CloudFront بدلًا من منطقة واحدة. فإن كانت CloudFront Functions أشبه بـ Vercel Edge Functions — صغيرة وسريعة ومقيّدة — فإن Lambda@Edge أشبه بـ Vercel Serverless Function نقلتها AWS أقرب إلى مستخدميك. فتحصل على وقت تشغيل Node.js كامل، وحزم npm، ووصول إلى الشبكة، وحتى 30 ثانية من وقت التنفيذ في أحداث الأصل.</p>
<p>وإن أردت نسخة AWS من نموذج وقت التشغيل والنسخ المتماثل أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html">دليل Lambda@Edge</a> هو المرجع الرسمي.</p>
<p>لقد كتبت دالة Lambda ونشرتها بالفعل في <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>. ويتبع Lambda@Edge النمط العام نفسه، لكن مع حفنة من القيود الإضافية التي توقع الناس في الأخطاء. ويمرّ هذا الدرس عليها كلها. وبصراحة، معظم المزالق ليست صعبة بمجرد أن تعرف بوجودها — المشكلة هي المرة الأولى التي لا تعرف فيها.</p>
<h2 id="شرط-us-east-1">شرط us-east-1</h2>
<p>يجب إنشاء دوال Lambda@Edge في <code>us-east-1</code>. وهذا هو الشرط نفسه الذي صادفته مع شهادات ACM في <a href="https://stevekinney.com/courses/aws/certificate-renewal-and-us-east-1">تجديد الشهادات وشرط us-east-1</a> — فـ CloudFront خدمة عالمية، ومستوى التحكّم فيها يعيش في <code>us-east-1</code>. وعندما تربط دالة Lambda بتوزيع CloudFront، تنسخ AWS كود دالتك إلى ذاكرات الحافة الإقليمية حول العالم. لكن مصدر الحقيقة لذلك النسخ هو <code>us-east-1</code> دائمًا.</p>
<p>وإن حاولت ربط دالة Lambda من أي منطقة أخرى بسلوك CloudFront، فسترفضها الواجهة البرمجية.</p>
<h2 id="توقيع-المعالج">توقيع المعالج</h2>
<p>تستخدم معالجات Lambda@Edge النوعين <code>CloudFrontRequestHandler</code> أو <code>CloudFrontResponseHandler</code> من <code>@types/aws-lambda</code>. وبنية الحدث مختلفة عمّا استخدمته مع API Gateway.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontRequestHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontRequestHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;

  <span class="hljs-comment">// Modify the request</span>
  request.<span class="hljs-property">uri</span> = request.<span class="hljs-property">uri</span>.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/^\\/api\\//</span>, <span class="hljs-string">&#x27;/v2/api/&#x27;</span>);

  <span class="hljs-keyword">return</span> request;
};
</code></pre>
<p><em>ملاحظة:</em> يعيش الطلب في <code>event.Records[0].cf.request</code> — لا في <code>event.request</code> كما في CloudFront Functions.</p>
<p>يلفّ كائن الحدث بيانات CloudFront داخل <code>event.Records[0].cf</code>. ووجود هذه البنية سببه أن Lambda@Edge يستخدم آلية تسليم الأحداث نفسها التي تستخدمها محفّزات Lambda الأخرى — مصفوفة <code>Records</code> — رغم أنه يوجد دائمًا سجل واحد بالضبط.</p>
<h3 id="شكل-كائن-الحدث">شكل كائن الحدث</h3>
<p>بالنسبة إلى حدث <strong>طلب الأصل</strong> (origin request)، يبدو كائن الحدث هكذا:</p>
<pre><code class="language-typescript">{
  <span class="hljs-title class_">Records</span>: [
    {
      <span class="hljs-attr">cf</span>: {
        <span class="hljs-attr">config</span>: {
          <span class="hljs-attr">distributionDomainName</span>: <span class="hljs-string">&#x27;d111111abcdef8.cloudfront.net&#x27;</span>,
          <span class="hljs-attr">distributionId</span>: <span class="hljs-string">&#x27;E1A2B3C4D5E6F7&#x27;</span>,
          <span class="hljs-attr">eventType</span>: <span class="hljs-string">&#x27;origin-request&#x27;</span>,
          <span class="hljs-attr">requestId</span>: <span class="hljs-string">&#x27;abcdef123456&#x27;</span>,
        },
        <span class="hljs-attr">request</span>: {
          <span class="hljs-attr">clientIp</span>: <span class="hljs-string">&#x27;203.0.113.1&#x27;</span>,
          <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
          <span class="hljs-attr">uri</span>: <span class="hljs-string">&#x27;/about&#x27;</span>,
          <span class="hljs-attr">querystring</span>: <span class="hljs-string">&#x27;page=1&#x27;</span>,
          <span class="hljs-attr">headers</span>: {
            <span class="hljs-attr">host</span>: [{ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;Host&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;example.com&#x27;</span> }],
            <span class="hljs-string">&#x27;user-agent&#x27;</span>: [{ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;User-Agent&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Mozilla/5.0...&#x27;</span> }],
          },
          <span class="hljs-attr">origin</span>: {
            <span class="hljs-attr">s3</span>: {
              <span class="hljs-attr">domainName</span>: <span class="hljs-string">&#x27;my-frontend-app-assets.s3.amazonaws.com&#x27;</span>,
              <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;&#x27;</span>,
              <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span>,
              <span class="hljs-attr">authMethod</span>: <span class="hljs-string">&#x27;none&#x27;</span>,
            },
          },
        },
      },
    },
  ];
}
</code></pre>
<p>لاحظ الفروق عن CloudFront Functions:</p>
<ul>
<li><strong>الترويسات</strong> مصفوفات من كائنات لها خاصيتا <code>key</code> و<code>value</code>، لا كائنات مفردة. والسبب أن ترويسات HTTP يمكن أن تحمل قيمًا متعددة.</li>
<li><strong>سلسلة الاستعلام</strong> سلسلة نصية عادية، لا كائنًا محلَّلًا.</li>
<li><strong>الخاصية <code>origin</code></strong> موجودة في أحداث طلب الأصل وتخبرك إلى أين ستوجّه CloudFront الطلب. ويمكنك تعديلها لتغيير الأصل ديناميكيًا.</li>
</ul>
<blockquote>
<p><strong>لماذا <code>authMethod: 'none'</code></strong></p>
<p>الحقل <code>authMethod</code> يتتبّع OAI (هوية الوصول إلى الأصل) فقط. و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html">توثّق AWS ذلك صراحةً</a>: فالحقل «لا يدعم التحكم في الوصول إلى الأصل (OAC)». وإذا كان توزيعك يستخدم OAC — وهو النمط الحديث الذي تعلّمه هذه الدورة — فمصادقة OAC تحدث في طبقة التوزيع وتكون غير مرئية لحدث Lambda@Edge. اضبط <code>authMethod: 'none'</code>. وإن كنت على نمط OAI القديم، فاستخدم <code>'origin-access-identity'</code> بدلًا من ذلك.</p>
</blockquote>
<h3 id="إرجاع-طلب-مقابل-استجابة">إرجاع طلب مقابل استجابة</h3>
<p>تمامًا كما في CloudFront Functions، إرجاع كائن <code>request</code> يخبر CloudFront بمواصلة المعالجة. أما إرجاع كائن <strong>استجابة</strong> فيقصر مسار طلب الأصل ويرسل استجابة مباشرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontRequestHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontRequestHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;

  <span class="hljs-keyword">if</span> (request.<span class="hljs-property">uri</span> === <span class="hljs-string">&#x27;/health&#x27;</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;200&#x27;</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;OK&#x27;</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;content-type&#x27;</span>: [{ <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> }],
      },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;healthy&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> request;
};
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>في كائنات استجابة Lambda@Edge، يكون <code>status</code> <strong>سلسلة نصية</strong>، لا رقمًا. فكتابة <code>status: 200</code> بدلًا من <code>status: '200'</code> تسبّب خطأ وقت التشغيل. وهذا يوقع القادمين من معالجات Lambda العادية حيث يكون <code>statusCode</code> رقمًا.</p>
</blockquote>
<h2 id="كتابة-الدالة-ونشرها">كتابة الدالة ونشرها</h2>
<h3 id="كتابة-المعالج">كتابة المعالج</h3>
<p>أنشئ دالة Lambda@Edge تضيف ترويسة مخصّصة إلى طلبات الأصل. وهذا مفيد لتمرير معلومات إلى أصلك لم يرسلها المشاهد.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontRequestHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontRequestHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;

  request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-forwarded-by-edge&#x27;</span>] = [
    {
      <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;X-Forwarded-By-Edge&#x27;</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;true&#x27;</span>,
    },
  ];

  <span class="hljs-keyword">return</span> request;
};
</code></pre>
<p>ابنِ هذه الحزمة وحزّمها بالطريقة نفسها التي فعلتها في <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>: ترجِم بـ TypeScript، ثم اضغط الناتج في ملف zip.</p>
<h3 id="إنشاء-دور-التنفيذ">إنشاء دور التنفيذ</h3>
<p>يتطلّب Lambda@Edge سياسة ثقة تسمح <strong>لكلٍّ من</strong> <code>lambda.amazonaws.com</code> و<code>edgelambda.amazonaws.com</code> بتبنّي الدور. وهذا مختلف عن دالة Lambda العادية التي تحتاج <code>lambda.amazonaws.com</code> فقط. وهو أمر يسهل تفويته.</p>
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
  --role-name my-frontend-app-edge-role \\
  --assume-role-policy-document file://edge-trust-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>أرفق سياسة دور التنفيذ الأساسي حتى تتمكّن الدالة من كتابة السجلات:</p>
<pre><code class="language-bash">aws iam attach-role-policy \\
  --role-name my-frontend-app-edge-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="النشر-إلى-us-east-1">النشر إلى us-east-1</h3>
<pre><code class="language-bash">aws lambda create-function \\
  --function-name my-frontend-app-edge-rewrite \\
  --runtime nodejs22.x \\
  --role arn:aws:iam::123456789012:role/my-frontend-app-edge-role \\
  --handler handler.handler \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="نشر-نسخة-مرقمة">نشر نسخة مرقّمة</h3>
<p>هذه هي الخطوة الحاسمة التي تختلف عن Lambda العادي. فـ Lambda@Edge <strong>يتطلّب</strong> نسخة منشورة ومرقّمة. ولا يمكنك استخدام <code>$LATEST</code>.</p>
<pre><code class="language-bash">aws lambda publish-version \\
  --function-name my-frontend-app-edge-rewrite \\
  --description <span class="hljs-string">&quot;Initial deployment&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمّن الاستجابة حقل <code>Version</code> (مثل <code>&quot;1&quot;</code>) وARN مُرقَّمًا:</p>
<pre><code>arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-edge-rewrite:1
</code></pre>
<p>ذلك الـ ARN المُرَقَّم — مع <code>:1</code> في نهايته — هو ما تستخدمه عند ربط الدالة بـ CloudFront.</p>
<h3 id="الربط-بسلوك-cloudfront">الربط بسلوك CloudFront</h3>
<p>استرجع إعدادات توزيعك، وأضف كتلة <code>LambdaFunctionAssociations</code> إلى السلوك، ثم حدّث:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;LambdaFunctionAssociations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;LambdaFunctionARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-edge-rewrite:1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;EventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;origin-request&quot;</span><span class="hljs-punctuation">,</span>
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
<p>بعد أن ينتهي نشر التوزيع (ويستغرق هذا بضع دقائق)، ستعمل دالة Lambda@Edge لديك في كل طلب أصل.</p>
<h2 id="نموذج-النسخ-المتماثل">نموذج النسخ المتماثل</h2>
<p>عندما تربط دالة Lambda@Edge بتوزيع CloudFront، تنسخ AWS دالتك إلى ذاكرات الحافة الإقليمية في العالم. ولهذا ثلاثة آثار:</p>
<ol>
<li><strong>النشر ليس فوريًا.</strong> فبخلاف CloudFront Functions (التي تنتشر في ثوانٍ)، تستغرق نسخ Lambda@Edge عدة دقائق لتُنشر عالميًا.</li>
<li><strong>لا يمكنك حذف الدالة ما دامت النسخ موجودة.</strong> فإذا أزلت ربط Lambda@Edge من توزيعك، فلا تحذف AWS النسخ فورًا. وقد تحتاج إلى الانتظار ساعات (وأحيانًا حتى يوم) قبل أن تتمكّن من حذف دالة Lambda نفسها. وستُرجع الواجهة البرمجية خطأ <code>ReplicatedFunctionStillCreating</code> أو <code>ResourceConflictException</code> حتى يكتمل تنظيف النسخ.</li>
<li><strong>كل تحديث يتطلّب نسخة جديدة.</strong> فلا يمكنك تحديث نسخة في مكانها. بل تنشر نسخة جديدة (<code>:2</code>، <code>:3</code>، إلخ)، وتحدّث سلوك CloudFront ليشير إلى ARN النسخة الجديدة، وتنتظر النسخ المتماثل.</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يتبع تحديث دالة Lambda@Edge هذه الدورة: حدّث كود الدالة، وانشر نسخة جديدة، وحدّث سلوك CloudFront ليشير إلى ARN النسخة الجديدة، وانتظر نشر التوزيع. إنها خطوات أكثر من CloudFront Functions، لكنك تحصل في المقابل على وقت تشغيل Node.js كامل.</p>
</blockquote>
<h2 id="قيود-يجب-تذكرها">قيود يجب تذكّرها</h2>
<ul>
<li><strong>لا متغيّرات بيئة يحدّدها المستخدم.</strong> فـ Lambda@Edge لا يدعم متغيّرات البيئة التي يحدّدها المستخدم إطلاقًا، سواء عملت الدالة في أحداث المشاهد أو أحداث الأصل.</li>
<li><strong>حدّ الذاكرة 128 ميغابايت لأحداث المشاهد.</strong> فإن كانت دالتك التي تُطلقها أحداث المشاهد تحتاج ذاكرة أكثر، فعليك إعادة النظر في نهجك — إمّا نقل المنطق إلى محفّز أصل (حتى 10,240 ميغابايت) أو تبسيطه.</li>
<li><strong>مهلة 5 ثوانٍ لأحداث المشاهد و30 ثانية لأحداث الأصل.</strong> فدالة طلب مشاهد تستغرق 5 ثوانٍ ستجعل موقعك يبدو معطوبًا. أبقِ الدوال التي تُطلقها أحداث المشاهد سريعة — فإن كانت بطيئة بما يكفي ليلاحظها المستخدم، فهي بطيئة جدًا.</li>
<li><strong>حجم حزمة 1 ميغابايت لأحداث المشاهد.</strong> وهذا هو حجم ملف zip المضغوط. فإن حزمت مكتبات كبيرة، فقد تتجاوز ذلك. استخدم tree-shaking وأبقِ الاعتماديات في حدها الأدنى.</li>
</ul>
<p>تُغطّى هذه القيود بالتفصيل في <a href="https://stevekinney.com/courses/aws/edge-function-debugging-and-limitations">تصحيح دوال الحافة وقيودها</a>. وأهم ما يجب تذكّره هنا هو الأقل بداهةً: Lambda@Edge لا يدعم متغيّرات البيئة التي يحدّدها المستخدم إطلاقًا، عدا المتغيّرات المحجوزة التي تحقنها AWS تلقائيًا.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>يستغرق تنظيف نسخ Lambda@Edge ساعات بعد فك الربط. فاتبع هذا التتابع بعناية.</p>
<p>أزل ربط Lambda@Edge من إعدادات سلوك توزيعك وانتظر حتى يصل التوزيع إلى حالة <code>Deployed</code>. ثم حاول حذف الدالة:</p>
<pre><code class="language-bash">aws lambda delete-function \\
  --function-name my-frontend-app-edge-rewrite \\
  --region us-east-1
</code></pre>
<p>إذا أرجع هذا <code>ResourceConflictException</code>، فنسخ الحافة لم تنتهِ من التنظيف بعد. انتظر من 30 إلى 60 دقيقة وحاول مجددًا. وبعد حذف الدالة، نظّف أيضًا مجموعات سجلات CloudWatch في كل منطقة نُفّذت فيها الدالة — فـ Lambda@Edge ينشئ مجموعة سجلات لكل منطقة، لا في <code>us-east-1</code> فقط:</p>
<pre><code class="language-bash"><span class="hljs-comment"># List all Lambda@Edge log groups (they follow the pattern /aws/lambda/us-east-1.&lt;function-name&gt;)</span>
aws logs describe-log-groups \\
  --log-group-name-prefix /aws/lambda/ \\
  --region us-east-1 \\
  --query <span class="hljs-string">&#x27;logGroups[*].logGroupName&#x27;</span> \\
  --output text
</code></pre>
<p>احذف كل مجموعة سجلات في كل منطقة وجدت فيها واحدة.</p>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:p};export{s as book,l as chapter,n as chapterTitle,o as default,e as headings,p as html,a as slug,t as title};
