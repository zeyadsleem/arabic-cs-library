const s="kinney",e="aws",n="نشر تطبيقات الويب على AWS",a="connecting-dynamodb-to-lambda",t="ربط DynamoDB بـ Lambda",p=[{depth:2,id:"حلقة-الطلب-الكاملة",text:"حلقة الطلب الكاملة"},{depth:2,id:"تحديث-دور-التنفيذ",text:"تحديث دور التنفيذ"},{depth:2,id:"المعالج-الكامل",text:"المعالج الكامل"},{depth:2,id:"ضبط-اسم-الجدول-كمتغير-بيئة",text:"ضبط اسم الجدول كمتغيّر بيئة"},{depth:2,id:"النشر-والاختبار",text:"النشر والاختبار"},{depth:2,id:"استدعاؤها-من-الواجهة-الأمامية",text:"استدعاؤها من الواجهة الأمامية"},{depth:2,id:"ما-الذي-بنيته",text:"ما الذي بنيته"}],l=`<p>لديك كل القطع: جدول DynamoDB لتخزين البيانات، ودالة Lambda لتشغيل الشيفرة، وAPI Gateway لعرضها عبر HTTP. الآن توصلها في الحلقة التي يحتاجها كل تطبيق أمامي متكامل: تطبيق React يجري طلب HTTP، ويوجّهه API Gateway إلى Lambda، فتقرأ Lambda من DynamoDB أو تكتب فيها، ثم تتدفق الاستجابة عائدة إلى المتصفح.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من نموذج الوصول إلى الجداول أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html">دليل مطوّر DynamoDB</a> هو المرجع الرسمي.</p>
<p>هذه هي اللحظة التي تنتقل فيها الدورة من «أستطيع نشر ملفات ثابتة» إلى «لدي واجهة خلفية عاملة».</p>
<h2 id="حلقة-الطلب-الكاملة">حلقة الطلب الكاملة</h2>
<p>إليك ما يحدث عندما يستدعي متصفح المستخدم واجهتك:</p>
<ol>
<li><strong>الواجهة الأمامية</strong> تجري استدعاء <code>fetch()</code> إلى عنوان URL الخاص بـ API Gateway</li>
<li><strong>API Gateway</strong> يتلقى طلب HTTP ويطلق دالة Lambda لديك (وقد أعددت هذا في <a href="https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda">ربط API Gateway بـ Lambda</a>)</li>
<li><strong>Lambda</strong> تحلّل الطلب، وتستدعي DynamoDB، وتبني استجابة</li>
<li><strong>DynamoDB</strong> تقرأ البيانات أو تكتبها وتُرجع النتيجة إلى Lambda</li>
<li><strong>Lambda</strong> تُرجع استجابة HTTP إلى API Gateway</li>
<li><strong>API Gateway</strong> يرسل الاستجابة عائدة إلى المتصفح</li>
</ol>
<pre><code>flowchart LR
    Frontend[&quot;Frontend fetch()&quot;] --&gt; APIGateway[&quot;API Gateway&quot;]
    APIGateway --&gt; Lambda[&quot;Lambda handler&quot;]
    Lambda --&gt; DynamoDB[&quot;DynamoDB table&quot;]
    DynamoDB --&gt; Lambda
    Lambda --&gt; APIGateway
    APIGateway --&gt; Frontend
</code></pre>
<p>القطعة الوحيدة الناقصة: دالة Lambda لديك لا تملك إذنًا للتحدث إلى DynamoDB بعد. فدور التنفيذ الذي أنشأته في <a href="https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions">أدوار تنفيذ Lambda وأذوناتها</a> يملك أذونات التسجيل فقط. وتحتاج إلى إضافة سياسة DynamoDB.</p>
<h2 id="تحديث-دور-التنفيذ">تحديث دور التنفيذ</h2>
<p>تحتاج دالة Lambda إلى إذن لتنفيذ عمليات DynamoDB على جدول <code>my-frontend-app-data</code>. أنشئ سياسة تمنح العمليات التي يستخدمها معالجك بالضبط — لا أكثر.</p>
<p>احفظ هذا باسم <code>lambda-dynamodb-policy.json</code> (وهو متاح أيضًا باسم <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/lambda-dynamodb.json"><code>lambda-dynamodb.json</code></a> في مستودع Scratch Lab):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowDynamoDBAccess&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;dynamodb:GetItem&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;dynamodb:PutItem&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;dynamodb:UpdateItem&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;dynamodb:DeleteItem&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;dynamodb:Query&quot;</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يتبع هذا مبدأ الامتياز الأدنى من <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ الامتياز الأدنى</a>: يمكن للدالة قراءة العناصر وكتابتها وتحديثها وحذفها والاستعلام عنها — لكن على هذا الجدول المحدّد فقط. ولا يمكنها إنشاء الجداول أو حذفها، ولا فحص الجدول كاملًا، ولا لمس أي جدول آخر في حسابك.</p>
<p>في لوحة التحكم، يمكنك إنشاء هذه السياسة في محرّر JSON في <strong>Create policy</strong> ضمن IAM — وهو المكان نفسه الذي عرّفت فيه سياسة الثقة لدور التنفيذ.</p>
<p><img src="/arabic-cs-library/images/kinney/7d974120c618a4ba.webp" alt="محرّر IAM Create Policy JSON وهو يعرض سياسة بإجراءات DynamoDB تشمل PutItem وGetItem وUpdateItem وQuery مقصورة على ARN جدول محدّد."></p>
<p>أنشئ السياسة وأرفقها:</p>
<pre><code class="language-bash">aws iam create-policy \\
  --policy-name MyFrontendAppLambdaDynamoDB \\
  --policy-document file://lambda-dynamodb-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-bash">aws iam attach-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تحقّق من أن الدور يملك الآن السياستين:</p>
<pre><code class="language-bash">aws iam list-attached-role-policies \\
  --role-name my-frontend-app-lambda-role \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;AttachedPolicies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;PolicyName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWSLambdaBasicExecutionRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;PolicyArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;PolicyName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MyFrontendAppLambdaDynamoDB&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;PolicyArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا نسيت إضافة هذه السياسة، فستُطلق دالة Lambda استثناء <code>AccessDeniedException</code> عندما تحاول استدعاء DynamoDB. وستخبرك رسالة الخطأ بالضبط أي إجراء رُفض وعلى أي مورد — استخدم ذلك لإصلاح السياسة. لا تحلّ هذا بمنح <code>dynamodb:*</code> على <code>*</code>. فذلك يمنح دالتك وصولًا إلى كل جدول DynamoDB في حسابك.</p>
</blockquote>
<h2 id="المعالج-الكامل">المعالج الكامل</h2>
<p>هذا معالج Lambda كامل ينفّذ واجهة API لعمليات CRUD على العناصر المخزّنة في DynamoDB. وهو المعالج الذي ستنشره خلف API Gateway الذي أعددته سابقًا في الدورة.</p>
<blockquote>
<p><strong>يجب أن يأتي <code>userId</code> من JWT، لا من سلسلة الاستعلام</strong></p>
<p>في تطبيق حقيقي، اقرأ <code>userId</code> من <code>event.requestContext.authorizer?.jwt?.claims?.sub</code> بعد التحقق من JWT — لا من معاملات الاستعلام أبدًا، لأن أي مستدعٍ يمكنه تزويرها. ونحن نقرأ من <code>queryStringParameters</code> تبسيطًا تعليميًا. راجع <a href="https://stevekinney.com/courses/aws/dynamodb-reading-and-writing-data">قراءة البيانات وكتابتها باستخدام SDK</a> للشرح الكامل.</p>
</blockquote>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">DynamoDBDocumentClient</span>,
  <span class="hljs-title class_">GetCommand</span>,
  <span class="hljs-title class_">PutCommand</span>,
  <span class="hljs-title class_">DeleteCommand</span>,
  <span class="hljs-title class_">QueryCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-title class_">DynamoDBDocumentClient</span>.<span class="hljs-title function_">from</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({}));
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TABLE_NAME</span> = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span> ?? <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;
  <span class="hljs-keyword">const</span> userId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">userId</span>;

  <span class="hljs-keyword">if</span> (!userId) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">400</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing userId parameter&#x27;</span> });
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;GET&#x27;</span>: {
        <span class="hljs-keyword">const</span> itemId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">itemId</span>;

        <span class="hljs-keyword">if</span> (itemId) {
          <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
            <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
              <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
              <span class="hljs-title class_">Key</span>: { userId, itemId },
            }),
          );

          <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">Item</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">404</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Item not found&#x27;</span> });
          }

          <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">200</span>, result.<span class="hljs-property">Item</span>);
        }

        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
            <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
            <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId&#x27;</span>,
            <span class="hljs-title class_">ExpressionAttributeValues</span>: { <span class="hljs-string">&#x27;:userId&#x27;</span>: userId },
          }),
        );

        <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">200</span>, { <span class="hljs-attr">items</span>: result.<span class="hljs-property">Items</span> ?? [] });
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;POST&#x27;</span>: {
        <span class="hljs-keyword">const</span> body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span> ?? <span class="hljs-string">&#x27;{}&#x27;</span>);

        <span class="hljs-keyword">if</span> (!body.<span class="hljs-property">title</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">400</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing title in request body&#x27;</span> });
        }

        <span class="hljs-keyword">const</span> itemId = crypto.<span class="hljs-title function_">randomUUID</span>();

        <span class="hljs-keyword">const</span> item = {
          userId,
          itemId,
          <span class="hljs-attr">title</span>: body.<span class="hljs-property">title</span>,
          <span class="hljs-attr">status</span>: body.<span class="hljs-property">status</span> ?? <span class="hljs-string">&#x27;pending&#x27;</span>,
          <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
        };

        <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutCommand</span>({
            <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
            <span class="hljs-title class_">Item</span>: item,
          }),
        );

        <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">201</span>, item);
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;DELETE&#x27;</span>: {
        <span class="hljs-keyword">const</span> itemId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">itemId</span>;

        <span class="hljs-keyword">if</span> (!itemId) {
          <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">400</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing itemId parameter&#x27;</span> });
        }

        <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">DeleteCommand</span>({
            <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
            <span class="hljs-title class_">Key</span>: { userId, itemId },
          }),
        );

        <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">200</span>, { <span class="hljs-attr">deleted</span>: <span class="hljs-literal">true</span> });
      }

      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">405</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Method not allowed&#x27;</span> });
    }
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Handler error:&#x27;</span>, error);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">500</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Internal server error&#x27;</span> });
  }
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">respond</span>(<span class="hljs-params"><span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">body</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> {
    statusCode,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
    },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(body),
  };
}
</code></pre>
<p><em>ملاحظة:</em> تحافظ الدالة المساعدة <code>respond</code> على اتساق تنسيق الاستجابة عبر كل الفروع.</p>
<p>بضعة أمور تستحق الملاحظة:</p>
<ul>
<li><strong>GET دون <code>itemId</code></strong> يستعلم عن كل العناصر التي تخص المستخدم. وGET مع <code>itemId</code> يجلب عنصرًا واحدًا. وهذا نمط REST قياسي.</li>
<li><strong>POST</strong> يولّد <code>itemId</code> فريدًا باستخدام <code>crypto.randomUUID()</code> — أصلي في Node 18+، وخالٍ من التصادم، ولا يسرّب معلومات طابع زمني كما يفعل <code>Date.now()</code>.</li>
<li><strong>الدالة المساعدة <code>respond</code></strong> تقلّل الشيفرة المتكررة. فكل استجابة تحتاج <code>statusCode</code> و<code>Content-Type</code> — ووضع ذلك في دالة يعني ألا تكرّره في كل فرع. ولـ HTTP APIs (وهي ما تستخدمه هذه الدورة)، تنتمي ترويسات CORS إلى إعداد API Gateway، لا إلى استجابة Lambda — راجع <a href="https://stevekinney.com/courses/aws/api-gateway-cors-configuration">إعداد CORS في API Gateway</a>.</li>
<li><strong>معالجة الأخطاء</strong> تلتقط أخطاء DynamoDB وتُرجع 500. وفي الإنتاج، ستسجّل الخطأ كاملًا وتُرجع رسالة منظّفة إلى العميل.</li>
</ul>
<h2 id="ضبط-اسم-الجدول-كمتغير-بيئة">ضبط اسم الجدول كمتغيّر بيئة</h2>
<p>تضمين اسم الجدول مباشرة يعمل، لكن استخدام متغيّر بيئة يجعل دالتك قابلة للنقل بين البيئات (التطوير، والتهيئة، والإنتاج). حدّث إعداد الدالة:</p>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --environment <span class="hljs-string">&#x27;Variables={TABLE_NAME=my-frontend-app-data}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يقرأ المعالج بالفعل من <code>process.env.TABLE_NAME</code> مع قيمة احتياطية هي <code>my-frontend-app-data</code>، لذا لا يتطلب هذا التغيير تحديث الشيفرة.</p>
<p>في لوحة التحكم، يعرض قسم <strong>Configuration → Environment variables</strong> المتغيّر <code>TABLE_NAME</code> إلى جانب أي متغيّرات أخرى تستخدمها الدالة.</p>
<p>نموذج Lambda Edit environment variables وهو يعرض TABLE_NAME مضبوطًا على frontend-items. لكن يمكنك الآن توجيه الشيفرة نفسها إلى جدول مختلف بتغيير متغيّر البيئة — وهذا مفيد عندما يكون لديك جدول <code>my-frontend-app-data-dev</code> للتطوير.</p>
<h2 id="النشر-والاختبار">النشر والاختبار</h2>
<p>ابنِ المعالج المحدّث وغلّفه وانشره:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..

aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>لماذا لا يوجد <code>node_modules</code> في ملف zip؟</strong></p>
<p>لقد أضفت للتو <code>@aws-sdk/client-dynamodb</code> و<code>@aws-sdk/lib-dynamodb</code> إلى <code>package.json</code>، لذا قد تتساءل إن كان ملف zip يحتاج الآن إلى تضمين <code>node_modules</code>. إن وقت التشغيل <code>nodejs22.x</code> يضمّن AWS SDK v3، لذا فإن أي شيء تحت <code>@aws-sdk/*</code> يُحلّ في وقت التشغيل — ويكفي <code>npm install</code> المحلي للتحقق من الأنواع أثناء التطوير. ومع ذلك، تثبّت AWS إصدارًا فرعيًا محدّدًا في وقت التشغيل، لا أحدث إصدار، وهو يختلف حسب المنطقة. وللتعلم، الاعتماد على نسخة وقت التشغيل كافٍ. أما للإنتاج، فغلّف SDK بنفسك لتتحكم في الإصدار صراحةً ولا تُفاجأ عندما تتغيّر النسخة المضمّنة في وقت التشغيل. وبمجرد إضافة اعتماد <em>غير</em> مثبّت مسبقًا (محلّل Markdown، مكتبة تواريخ، أي شيء خارج <code>@aws-sdk/*</code>)، ستحتاج إلى نسخ <code>node_modules</code> إلى <code>dist/</code> قبل التغليف بغض النظر. راجع التحذير في <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a> للآليات الدقيقة.</p>
</blockquote>
<p>اختبر إنشاء عنصر:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload <span class="hljs-string">&#x27;{&quot;requestContext&quot;:{&quot;http&quot;:{&quot;method&quot;:&quot;POST&quot;,&quot;path&quot;:&quot;/&quot;}},&quot;queryStringParameters&quot;:{&quot;userId&quot;:&quot;user-123&quot;},&quot;body&quot;:&quot;{\\&quot;title\\&quot;:\\&quot;Deploy to production\\&quot;}&quot;}&#x27;</span> \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>افحص الاستجابة:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>ينبغي أن ترى استجابة 201 مع العنصر المنشأ، بما في ذلك <code>itemId</code> المولّد والطابع الزمني <code>createdAt</code>.</p>
<p>اختبر سرد العناصر الخاصة بالمستخدم:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload <span class="hljs-string">&#x27;{&quot;requestContext&quot;:{&quot;http&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;path&quot;:&quot;/&quot;}},&quot;queryStringParameters&quot;:{&quot;userId&quot;:&quot;user-123&quot;}}&#x27;</span> \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>ينبغي أن تتضمن الاستجابة العنصر الذي أنشأته للتو في مصفوفة <code>items</code>.</p>
<h2 id="استدعاؤها-من-الواجهة-الأمامية">استدعاؤها من الواجهة الأمامية</h2>
<p>بمجرد أن تصبح واجهتك معروضة عبر API Gateway (وقد أعددته في <a href="https://stevekinney.com/courses/aws/creating-an-http-api">إنشاء HTTP API</a> وأعددت CORS له في <a href="https://stevekinney.com/courses/aws/api-gateway-cors-configuration">إعداد CORS في API Gateway</a>)، تبدو شيفرة واجهتك الأمامية هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">API_URL</span> = <span class="hljs-string">&#x27;https://your-api-id.execute-api.us-east-1.amazonaws.com&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createItem</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${API_URL}</span>/?userId=<span class="hljs-subst">\${userId}</span>\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ title }),
  });

  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getItems</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${API_URL}</span>/?userId=<span class="hljs-subst">\${userId}</span>\`</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}
</code></pre>
<p>هذه هي واجهة <code>fetch</code> نفسها التي تستخدمها في أي تطبيق أمامي. والفرق الوحيد أن عنوان URL يشير إلى نقطة نهاية API Gateway بدلًا من دالة Vercel أو Netlify. هذا كل شيء — فمن منظور الواجهة الأمامية، هذه مجرد واجهة API أخرى.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا كنت تحصل على أخطاء CORS عند استدعاء واجهتك من الواجهة الأمامية، فالإصلاح يقع على HTTP API في API Gateway، لا في استجابة Lambda. راجع <a href="https://stevekinney.com/courses/aws/api-gateway-cors-configuration">إعداد CORS في API Gateway</a> للإعداد الدقيق — دع API Gateway يتولى CORS كي لا تكرّر الترويسات في كل فرع من فروع Lambda.</p>
</blockquote>
<h2 id="ما-الذي-بنيته">ما الذي بنيته</h2>
<p>خُذ خطوة إلى الوراء وانظر إلى ما يعمل:</p>
<ul>
<li><strong>S3</strong> يستضيف ملفات واجهتك الأمامية الثابتة.</li>
<li><strong>CloudFront</strong> يقدّمها عالميًا عبر HTTPS.</li>
<li><strong>Route 53</strong> يوجّه نطاقك إلى CloudFront.</li>
<li><strong>API Gateway</strong> يوفّر نقطة نهاية HTTP لواجهتك.</li>
<li><strong>Lambda</strong> تشغّل منطق واجهتك الخلفية.</li>
<li><strong>DynamoDB</strong> يخزّن بياناتك (هذه الوحدة)</li>
<li><strong>IAM</strong> يربط كل ذلك معًا بأذونات الامتياز الأدنى.</li>
</ul>
<p>هذا تطبيق متكامل كامل وقادر على الإنتاج يعمل على بنية تحتية بلا خوادم. لا خوادم لإدارتها. ولا قواعد بيانات لترقيعها. ولا مجموعات اتصالات لضبطها. تدفع مقابل ما تستخدمه، وعند حركة المرور المنخفضة، لا يكلّفك ما تستخدمه شيئًا يُذكر.</p>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,e as chapter,n as chapterTitle,o as default,p as headings,l as html,a as slug,t as title};
