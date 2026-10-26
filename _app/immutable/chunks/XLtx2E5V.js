const s="kinney",o="aws",n="نشر تطبيقات الويب على AWS",a="dynamodb-lambda-solution",t="الحل",p=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"إنشاء-جدول-dynamodb",text:"إنشاء جدول DynamoDB"},{depth:2,id:"إضافة-أذونات-dynamodb-إلى-دور-lambda",text:"إضافة أذونات DynamoDB إلى دور Lambda"},{depth:3,id:"lambda-dynamodb-policyjson",text:"lambda-dynamodb-policy.json"},{depth:3,id:"إنشاء-السياسة-وإرفاقها",text:"إنشاء السياسة وإرفاقها"},{depth:3,id:"التحقق",text:"التحقق"},{depth:2,id:"تثبيت-sdk-وتحديث-المعالج",text:"تثبيت SDK وتحديث المعالج"},{depth:3,id:"lambdasrchandlerts",text:"lambda/src/handler.ts"},{depth:3,id:"البناء",text:"البناء"},{depth:2,id:"تعيين-متغير-البيئة-والنشر",text:"تعيين متغيّر البيئة والنشر"},{depth:3,id:"تعيين-متغير-البيئة",text:"تعيين متغيّر البيئة"},{depth:3,id:"الحزم-والنشر",text:"الحزم والنشر"},{depth:3,id:"التحقق-من-متغير-البيئة",text:"التحقق من متغيّر البيئة"},{depth:2,id:"اختبار-إنشاء-عنصر",text:"اختبار إنشاء عنصر"},{depth:3,id:"إنشاء-عنصر-ثان",text:"إنشاء عنصر ثانٍ"},{depth:2,id:"اختبار-سرد-العناصر",text:"اختبار سرد العناصر"},{depth:2,id:"اختبار-حذف-عنصر",text:"اختبار حذف عنصر"},{depth:3,id:"التحقق-من-اختفاء-العنصر",text:"التحقق من اختفاء العنصر"},{depth:2,id:"اختبار-حالات-الخطأ",text:"اختبار حالات الخطأ"},{depth:3,id:"معامل-userid-المفقود",text:"معامل userId المفقود"},{depth:3,id:"طريقة-غير-مدعومة",text:"طريقة غير مدعومة"},{depth:2,id:"هدف-إضافي-نقطة-نهاية-التحديث",text:"هدف إضافي: نقطة نهاية التحديث"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>هذا هو الحل الكامل لكل خطوة، بما في ذلك إنشاء جدول DynamoDB، وسياسة IAM، وكود المعالج، وأوامر النشر، والمخرجات المتوقعة في كل مرحلة.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>يتماشى مخطط الجدول مع نمط الوصول في المعالج: يجمّع <code>userId</code> عناصر مستخدم واحد معًا، ويحدّد <code>itemId</code> كل سجل بشكل فريد داخل ذلك القسم.</li>
<li>دور Lambda محدود بجدول واحد، فتحصل الواجهة البرمجية على وصول البيانات الذي تحتاجه بالضبط دون أن يتحوّل إلى <code>dynamodb:*</code> على <code>*</code>.</li>
<li>تُثبت اختبارات POST وGET وDELETE دورة حياة الطلب كاملة، وليس فقط ما إذا كان DynamoDB قد قبل تعريف الجدول.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت إبقاء نسخة AWS من سلوك الجدول والاستعلام مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/cli/latest/reference/dynamodb/create-table.html">مرجع الأمر <code>aws dynamodb create-table</code></a> و<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html">دليل DynamoDB Query</a> و<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html">دليل DynamoDB Scan</a> في متناول يدك.</p>
</blockquote>
<h2 id="إنشاء-جدول-dynamodb">إنشاء جدول DynamoDB</h2>
<pre><code class="language-bash">aws dynamodb create-table \\
  --table-name my-frontend-app-data \\
  --attribute-definitions \\
    AttributeName=userId,AttributeType=S \\
    AttributeName=itemId,AttributeType=S \\
  --key-schema \\
    AttributeName=userId,KeyType=HASH \\
    AttributeName=itemId,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TableDescription&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;TableName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-data&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;TableStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;CREATING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;KeySchema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AttributeName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;userId&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;KeyType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HASH&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AttributeName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;itemId&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;KeyType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;RANGE&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;BillingModeSummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;BillingMode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PAY_PER_REQUEST&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;TableArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>انتظر حتى يصبح الجدول نشطًا:</p>
<pre><code class="language-bash">aws dynamodb <span class="hljs-built_in">wait</span> table-exists \\
  --table-name my-frontend-app-data \\
  --region us-east-1
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws dynamodb describe-table \\
  --table-name my-frontend-app-data \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Table.TableStatus&quot;</span>
</code></pre>
<p>المخرجات المتوقعة: <code>&quot;ACTIVE&quot;</code></p>
<h2 id="إضافة-أذونات-dynamodb-إلى-دور-lambda">إضافة أذونات DynamoDB إلى دور Lambda</h2>
<h3 id="lambda-dynamodb-policyjson"><code>lambda-dynamodb-policy.json</code></h3>
<p>هذه السياسة متاحة بصيغة <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/lambda-dynamodb.json"><code>lambda-dynamodb.json</code></a> في مستودع Scratch Lab.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowDynamoDBAccess&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dynamodb:GetItem&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dynamodb:PutItem&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dynamodb:DeleteItem&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dynamodb:Query&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إنشاء-السياسة-وإرفاقها">إنشاء السياسة وإرفاقها</h3>
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
<h3 id="التحقق">التحقق</h3>
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
<h2 id="تثبيت-sdk-وتحديث-المعالج">تثبيت SDK وتحديث المعالج</h2>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
</code></pre>
<h3 id="lambdasrchandlerts"><code>lambda/src/handler.ts</code></h3>
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
<p><em>ملاحظة:</em> يُنشأ العميل خارج المعالج كي يبقى عبر الاستدعاءات الدافئة.</p>
<h3 id="البناء">البناء</h3>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
</code></pre>
<p>المتوقع: يُنشأ <code>dist/handler.js</code> بلا أي أخطاء TypeScript.</p>
<h2 id="تعيين-متغير-البيئة-والنشر">تعيين متغيّر البيئة والنشر</h2>
<h3 id="تعيين-متغير-البيئة">تعيين متغيّر البيئة</h3>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --environment <span class="hljs-string">&#x27;Variables={TABLE_NAME=my-frontend-app-data}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="الحزم-والنشر">الحزم والنشر</h3>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda/dist
zip -r ../function.zip .
<span class="hljs-built_in">cd</span> ..

aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="التحقق-من-متغير-البيئة">التحقق من متغيّر البيئة</h3>
<pre><code class="language-bash">aws lambda get-function-configuration \\
  --function-name my-frontend-app-api \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Environment&quot;</span>
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Variables&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;TABLE_NAME&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-data&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="اختبار-إنشاء-عنصر">اختبار إنشاء عنصر</h2>
<p>احفظ الملف باسم <code>test-create.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;title\\&quot;: \\&quot;Learn DynamoDB\\&quot;}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استدعِ الدالة:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-create.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>الاستجابة المتوقعة (منسّقة):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;statusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">201</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Content-Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;userId\\&quot;:\\&quot;user-123\\&quot;,\\&quot;itemId\\&quot;:\\&quot;a1b2c3d4-e5f6-7890-abcd-ef1234567890\\&quot;,\\&quot;title\\&quot;:\\&quot;Learn DynamoDB\\&quot;,\\&quot;status\\&quot;:\\&quot;pending\\&quot;,\\&quot;createdAt\\&quot;:\\&quot;2026-03-18T12:00:00.000Z\\&quot;}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ستختلف قيمتا <code>itemId</code> (وهي UUID) و<code>createdAt</code> بحسب وقت تشغيلك الأمر.</p>
<p>في وحدة التحكم، يُظهر الاستدعاء نفسه عبر تبويب <strong>Test</strong> نتيجة التنفيذ مع رمز الحالة 201 وبيانات العنصر.</p>
<p><img src="/arabic-cs-library/images/kinney/4fac9aa0efe62bc5.webp" alt="يعرض تبويب Test في Lambda نتيجة التنفيذ بحالة Succeeded، مع إظهار جسم الاستجابة عنصر DynamoDB أُنشئ حديثًا."></p>
<h3 id="إنشاء-عنصر-ثان">إنشاء عنصر ثانٍ</h3>
<p>احفظ الملف باسم <code>test-create-2.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;title\\&quot;: \\&quot;Deploy to production\\&quot;}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-create-2.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<h2 id="اختبار-سرد-العناصر">اختبار سرد العناصر</h2>
<p>احفظ الملف باسم <code>test-list.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-list.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المتوقع: <code>statusCode: 200</code> مع جسم يحتوي مصفوفة <code>items</code> تضمّ العنصرين معًا.</p>
<p>عند تحليل الجسم:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;itemId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Learn DynamoDB&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pending&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;createdAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;itemId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;b2c3d4e5-f6a7-8901-bcde-f12345678901&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Deploy to production&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pending&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;createdAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:01.000Z&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="اختبار-حذف-عنصر">اختبار حذف عنصر</h2>
<p>استخدم <code>itemId</code> من العنصر الأول الذي أنشأته. احفظ الملف باسم <code>test-delete.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DELETE&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;itemId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استبدل <code>a1b2c3d4-e5f6-7890-abcd-ef1234567890</code> بقيمة <code>itemId</code> الفعلية من استجابة POST.</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-delete.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المتوقع: <code>statusCode: 200</code> مع الجسم <code>{&quot;deleted&quot;:true}</code>.</p>
<h3 id="التحقق-من-اختفاء-العنصر">التحقق من اختفاء العنصر</h3>
<p>أعد تشغيل اختبار السرد:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-list.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المتوقع: تحتوي مصفوفة <code>items</code> الآن على عنصر واحد فقط — عنصر «Deploy to production».</p>
<h2 id="اختبار-حالات-الخطأ">اختبار حالات الخطأ</h2>
<h3 id="معامل-userid-المفقود">معامل userId المفقود</h3>
<p>احفظ الملف باسم <code>test-no-user.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-no-user.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المتوقع: <code>statusCode: 400</code> مع الجسم <code>{&quot;error&quot;:&quot;Missing userId parameter&quot;}</code>.</p>
<h3 id="طريقة-غير-مدعومة">طريقة غير مدعومة</h3>
<p>احفظ الملف باسم <code>test-put.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PUT&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-put.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المتوقع: <code>statusCode: 405</code> مع الجسم <code>{&quot;error&quot;:&quot;Method not allowed&quot;}</code>.</p>
<h2 id="هدف-إضافي-نقطة-نهاية-التحديث">هدف إضافي: نقطة نهاية التحديث</h2>
<p>للتعامل مع طلبات PATCH الخاصة بتحديث الحالة، أضف هذه الحالة إلى عبارة switch:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;PATCH&#x27;</span>: {
  <span class="hljs-keyword">const</span> itemId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">itemId</span>;
  <span class="hljs-keyword">const</span> body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span> ?? <span class="hljs-string">&#x27;{}&#x27;</span>);

  <span class="hljs-keyword">if</span> (!itemId) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">400</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing itemId parameter&#x27;</span> });
  }

  <span class="hljs-keyword">if</span> (!body.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">400</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing status in request body&#x27;</span> });
  }

  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">Key</span>: { userId, itemId },
      <span class="hljs-title class_">UpdateExpression</span>: <span class="hljs-string">&#x27;SET #status = :status, updatedAt = :updatedAt&#x27;</span>,
      <span class="hljs-title class_">ExpressionAttributeNames</span>: {
        <span class="hljs-string">&#x27;#status&#x27;</span>: <span class="hljs-string">&#x27;status&#x27;</span>,
      },
      <span class="hljs-title class_">ExpressionAttributeValues</span>: {
        <span class="hljs-string">&#x27;:status&#x27;</span>: body.<span class="hljs-property">status</span>,
        <span class="hljs-string">&#x27;:updatedAt&#x27;</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      },
      <span class="hljs-title class_">ReturnValues</span>: <span class="hljs-string">&#x27;ALL_NEW&#x27;</span>,
    }),
  );

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">respond</span>(<span class="hljs-number">200</span>, result.<span class="hljs-property">Attributes</span> ?? {});
}
</code></pre>
<p>ستحتاج أيضًا إلى إضافة <code>UpdateCommand</code> إلى استيراداتك من <code>@aws-sdk/lib-dynamodb</code>، وتحديث سياسة IAM لتشمل <code>dynamodb:UpdateItem</code>.</p>
<p>احفظ مستند السياسة المحدّث باسم <code>lambda-dynamodb-policy-v2.json</code>:</p>
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
<p>أنشئ إصدارًا جديدًا من السياسة (تدعم سياسات IAM المُدارة حتى 5 إصدارات):</p>
<pre><code class="language-bash">aws iam create-policy-version \\
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB \\
  --policy-document file://lambda-dynamodb-policy-v2.json \\
  --set-as-default \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>إذا استخدمت سياسة مضمّنة (<code>aws iam put-role-policy</code>) بدلًا من سياسة مُدارة، فحدّثها بالأمر نفسه والمستند الجديد:</p>
<pre><code class="language-bash">aws iam put-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-name MyFrontendAppLambdaDynamoDB \\
  --policy-document file://lambda-dynamodb-policy-v2.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="التنظيف">التنظيف</h2>
<p>إذا أردت حذف الجدول بعد الاختبار:</p>
<pre><code class="language-bash">aws dynamodb delete-table \\
  --table-name my-frontend-app-data \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>حذف جدول DynamoDB إجراء دائم ويمسح كل البيانات الموجودة في الجدول. لا تشغّل هذا الأمر إلا إذا كنت قد انتهيت من التمرين ولم تعد بحاجة إلى البيانات.</p>
</blockquote>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,o as chapter,n as chapterTitle,c as default,p as headings,l as html,a as slug,t as title};
