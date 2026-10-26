const s="kinney",e="aws",a="نشر تطبيقات الويب على AWS",n="end-to-end-scratch-lab-api-solution",t="الحل",p=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"1-إنشاء-جدول-dynamodb",text:"1. إنشاء جدول DynamoDB"},{depth:2,id:"2-تخزين-مفتاح-api-الخاص-بالبحث",text:"2. تخزين مفتاح API الخاص بالبحث"},{depth:2,id:"3-سياسة-دور-التنفيذ",text:"3. سياسة دور التنفيذ"},{depth:2,id:"4-معالج-lambda",text:"4. معالج Lambda"},{depth:2,id:"5-مسارات-api-gateway",text:"5. مسارات API Gateway"},{depth:2,id:"6-اختبار-دخاني",text:"6. اختبار دخاني"},{depth:2,id:"7-ربط-الواجهة-الأمامية",text:"7. ربط الواجهة الأمامية"},{depth:2,id:"ملخص-الموارد-المنشأة",text:"ملخّص الموارد المنشأة"}],l=`<p>هذا هو الحل الكامل لـ<a href="https://stevekinney.com/courses/aws/end-to-end-scratch-lab-api-exercise">تمرين واجهة برمجة تطبيقات Scratch Lab من طرف إلى طرف</a>. كل أمر معروض مع مخرجاته المتوقّعة.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<p>لكل قطعة مهمة واحدة. جدول DynamoDB يخزّن البيانات. ومعالج Lambda يوجّه الطلبات ويتحدّث إلى الجدول. وAPI Gateway يستقبل HTTP ويمرّرها إلى Lambda. ودور التنفيذ يمنح الأذونات التي تحتاجها Lambda بالضبط، ولا شيء أكثر. ويخزّن السر مفتاح API الخاص بطرف ثالث خارج الشيفرة وخارج البيئة معًا. وهذا الفصل هو ما يجعل كل خدمة قابلة للاستبدال دون تمزيق بقية الأجزاء.</p>
<h2 id="1-إنشاء-جدول-dynamodb">1. إنشاء جدول DynamoDB</h2>
<pre><code class="language-bash">aws dynamodb create-table \\
  --table-name scratch-lab-notes \\
  --attribute-definitions \\
    AttributeName=userId,AttributeType=S \\
    AttributeName=noteId,AttributeType=S \\
  --key-schema \\
    AttributeName=userId,KeyType=HASH \\
    AttributeName=noteId,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST \\
  --region us-east-1 \\
  --output json

aws dynamodb <span class="hljs-built_in">wait</span> table-exists \\
  --table-name scratch-lab-notes \\
  --region us-east-1
</code></pre>
<h2 id="2-تخزين-مفتاح-api-الخاص-بالبحث">2. تخزين مفتاح API الخاص بالبحث</h2>
<p>باستخدام Parameter Store كـ<code>SecureString</code>:</p>
<pre><code class="language-bash">aws ssm put-parameter \\
  --name /scratch-lab/production/search-api-key \\
  --value <span class="hljs-string">&quot;sk_test_example_replace_me&quot;</span> \\
  --<span class="hljs-built_in">type</span> SecureString \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="3-سياسة-دور-التنفيذ">3. سياسة دور التنفيذ</h2>
<p>احفظها باسم <code>scratch-lab-api-policy.json</code> (وهي متاحة أيضًا باسم <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/scratch-lab-api.json"><code>scratch-lab-api.json</code></a> في مستودع Scratch Lab):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;dynamodb:GetItem&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dynamodb:PutItem&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dynamodb:DeleteItem&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dynamodb:Query&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:dynamodb:us-east-1:123456789012:table/scratch-lab-notes&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ssm:GetParameter&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:ssm:us-east-1:123456789012:parameter/scratch-lab/production/search-api-key&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;logs:CreateLogGroup&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;logs:CreateLogStream&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;logs:PutLogEvents&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:logs:us-east-1:123456789012:*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أرفقها بدور تنفيذ Lambda:</p>
<pre><code class="language-bash">aws iam put-role-policy \\
  --role-name scratch-lab-api-role \\
  --policy-name scratch-lab-api-policy \\
  --policy-document file://scratch-lab-api-policy.json
</code></pre>
<h2 id="4-معالج-lambda">4. معالج Lambda</h2>
<p><code>lambda/src/handler.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2, <span class="hljs-title class_">APIGatewayProxyResultV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">DynamoDBDocumentClient</span>,
  <span class="hljs-title class_">GetCommand</span>,
  <span class="hljs-title class_">PutCommand</span>,
  <span class="hljs-title class_">DeleteCommand</span>,
  <span class="hljs-title class_">QueryCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParameterCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TABLE_NAME</span> = <span class="hljs-string">&#x27;scratch-lab-notes&#x27;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SEARCH_API_KEY_PARAM</span> = <span class="hljs-string">&#x27;/scratch-lab/production/search-api-key&#x27;</span>;

<span class="hljs-keyword">const</span> ddb = <span class="hljs-title class_">DynamoDBDocumentClient</span>.<span class="hljs-title function_">from</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({}));
<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">let</span> <span class="hljs-attr">searchApiKey</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">const</span> loadSearchApiKey = <span class="hljs-title function_">async</span> (): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; =&gt; {
  <span class="hljs-keyword">if</span> (searchApiKey) <span class="hljs-keyword">return</span> searchApiKey;
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParameterCommand</span>({ <span class="hljs-title class_">Name</span>: <span class="hljs-variable constant_">SEARCH_API_KEY_PARAM</span>, <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span> }),
  );
  <span class="hljs-keyword">const</span> value = response.<span class="hljs-property">Parameter</span>?.<span class="hljs-property">Value</span>;
  <span class="hljs-keyword">if</span> (!value) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;search api key is empty&#x27;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;loaded search api key&#x27;</span>);
  searchApiKey = value;
  <span class="hljs-keyword">return</span> value;
};

<span class="hljs-keyword">const</span> corsHeaders = {
  <span class="hljs-string">&#x27;Access-Control-Allow-Origin&#x27;</span>: <span class="hljs-string">&#x27;https://example.com&#x27;</span>,
  <span class="hljs-string">&#x27;Access-Control-Allow-Methods&#x27;</span>: <span class="hljs-string">&#x27;GET,POST,PUT,DELETE,OPTIONS&#x27;</span>,
  <span class="hljs-string">&#x27;Access-Control-Allow-Headers&#x27;</span>: <span class="hljs-string">&#x27;content-type,x-notepad-user-id&#x27;</span>,
};

<span class="hljs-keyword">const</span> json = (<span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">body</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-function"><span class="hljs-params">APIGatewayProxyResultV2</span> =&gt;</span> ({
  statusCode,
  <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>, ...corsHeaders },
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(body),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadSearchApiKey</span>();

  <span class="hljs-keyword">const</span> userId = event.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-notepad-user-id&#x27;</span>];
  <span class="hljs-keyword">if</span> (!userId) <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">401</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;missing x-notepad-user-id header&#x27;</span> });

  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;
  <span class="hljs-keyword">const</span> routeKey = event.<span class="hljs-property">routeKey</span>;
  <span class="hljs-keyword">const</span> noteId = event.<span class="hljs-property">pathParameters</span>?.<span class="hljs-property">noteId</span>;

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;GET&#x27;</span> &amp;&amp; routeKey === <span class="hljs-string">&#x27;GET /notes&#x27;</span>) {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
          <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
          <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :u&#x27;</span>,
          <span class="hljs-title class_">ExpressionAttributeValues</span>: { <span class="hljs-string">&#x27;:u&#x27;</span>: userId },
        }),
      );
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">200</span>, result.<span class="hljs-property">Items</span> ?? []);
    }

    <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;POST&#x27;</span> &amp;&amp; routeKey === <span class="hljs-string">&#x27;POST /notes&#x27;</span>) {
      <span class="hljs-keyword">const</span> body = event.<span class="hljs-property">body</span> ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span>) : {};
      <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>();
      <span class="hljs-keyword">const</span> note = {
        userId,
        <span class="hljs-attr">noteId</span>: body.<span class="hljs-property">id</span>,
        <span class="hljs-attr">title</span>: body.<span class="hljs-property">title</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
        <span class="hljs-attr">body</span>: body.<span class="hljs-property">body</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
        <span class="hljs-attr">createdAt</span>: body.<span class="hljs-property">createdAt</span> ?? now,
        <span class="hljs-attr">updatedAt</span>: body.<span class="hljs-property">updatedAt</span> ?? now,
      };
      <span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">PutCommand</span>({ <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>, <span class="hljs-title class_">Item</span>: note }));
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">201</span>, {
        <span class="hljs-attr">id</span>: note.<span class="hljs-property">noteId</span>,
        <span class="hljs-attr">title</span>: note.<span class="hljs-property">title</span>,
        <span class="hljs-attr">body</span>: note.<span class="hljs-property">body</span>,
        <span class="hljs-attr">createdAt</span>: note.<span class="hljs-property">createdAt</span>,
        <span class="hljs-attr">updatedAt</span>: note.<span class="hljs-property">updatedAt</span>,
      });
    }

    <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;GET&#x27;</span> &amp;&amp; routeKey === <span class="hljs-string">&#x27;GET /notes/{noteId}&#x27;</span> &amp;&amp; noteId) {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({ <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>, <span class="hljs-title class_">Key</span>: { userId, noteId } }),
      );
      <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">Item</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">404</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;note not found&#x27;</span> });
      <span class="hljs-keyword">const</span> item = result.<span class="hljs-property">Item</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">200</span>, {
        <span class="hljs-attr">id</span>: item.<span class="hljs-property">noteId</span>,
        <span class="hljs-attr">title</span>: item.<span class="hljs-property">title</span>,
        <span class="hljs-attr">body</span>: item.<span class="hljs-property">body</span>,
        <span class="hljs-attr">createdAt</span>: item.<span class="hljs-property">createdAt</span>,
        <span class="hljs-attr">updatedAt</span>: item.<span class="hljs-property">updatedAt</span>,
      });
    }

    <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;PUT&#x27;</span> &amp;&amp; routeKey === <span class="hljs-string">&#x27;PUT /notes/{noteId}&#x27;</span> &amp;&amp; noteId) {
      <span class="hljs-keyword">const</span> body = event.<span class="hljs-property">body</span> ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span>) : {};
      <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>();
      <span class="hljs-keyword">const</span> note = {
        userId,
        noteId,
        <span class="hljs-attr">title</span>: body.<span class="hljs-property">title</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
        <span class="hljs-attr">body</span>: body.<span class="hljs-property">body</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
        <span class="hljs-attr">createdAt</span>: body.<span class="hljs-property">createdAt</span> ?? now,
        <span class="hljs-attr">updatedAt</span>: now,
      };
      <span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">PutCommand</span>({ <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>, <span class="hljs-title class_">Item</span>: note }));
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">200</span>, {
        <span class="hljs-attr">id</span>: note.<span class="hljs-property">noteId</span>,
        <span class="hljs-attr">title</span>: note.<span class="hljs-property">title</span>,
        <span class="hljs-attr">body</span>: note.<span class="hljs-property">body</span>,
        <span class="hljs-attr">createdAt</span>: note.<span class="hljs-property">createdAt</span>,
        <span class="hljs-attr">updatedAt</span>: note.<span class="hljs-property">updatedAt</span>,
      });
    }

    <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;DELETE&#x27;</span> &amp;&amp; routeKey === <span class="hljs-string">&#x27;DELETE /notes/{noteId}&#x27;</span> &amp;&amp; noteId) {
      <span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DeleteCommand</span>({ <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>, <span class="hljs-title class_">Key</span>: { userId, noteId } }));
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">204</span>, {});
    }

    <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">404</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;route not found&#x27;</span> });
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;handler error&#x27;</span>, { error, <span class="hljs-attr">awsRequestId</span>: event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">requestId</span> });
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">json</span>(<span class="hljs-number">500</span>, { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;internal server error&#x27;</span> });
  }
};
</code></pre>
<p>ابنِ الشيفرة وضمّنها وانشرها باستخدام النمط نفسه <code>npm run build</code> + <code>zip</code> + <code>aws lambda update-function-code</code> من <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>.</p>
<h2 id="5-مسارات-api-gateway">5. مسارات API Gateway</h2>
<p>بافتراض وجود HTTP API قائمة بمعرّف <code>abc123def4</code>:</p>
<pre><code class="language-bash">INTEGRATION_ID=$(aws apigatewayv2 create-integration \\
  --api-id abc123def4 \\
  --integration-type AWS_PROXY \\
  --integration-uri arn:aws:lambda:us-east-1:123456789012:<span class="hljs-keyword">function</span>:scratch-lab-api \\
  --payload-format-version 2.0 \\
  --region us-east-1 \\
  --query IntegrationId --output text)

<span class="hljs-keyword">for</span> ROUTE <span class="hljs-keyword">in</span> <span class="hljs-string">&quot;GET /notes&quot;</span> <span class="hljs-string">&quot;POST /notes&quot;</span> <span class="hljs-string">&quot;GET /notes/{noteId}&quot;</span> <span class="hljs-string">&quot;PUT /notes/{noteId}&quot;</span> <span class="hljs-string">&quot;DELETE /notes/{noteId}&quot;</span>; <span class="hljs-keyword">do</span>
  aws apigatewayv2 create-route \\
    --api-id abc123def4 \\
    --route-key <span class="hljs-string">&quot;<span class="hljs-variable">$ROUTE</span>&quot;</span> \\
    --target <span class="hljs-string">&quot;integrations/<span class="hljs-variable">$INTEGRATION_ID</span>&quot;</span> \\
    --region us-east-1 \\
    --output json
<span class="hljs-keyword">done</span>

aws lambda add-permission \\
  --function-name scratch-lab-api \\
  --statement-id scratch-lab-api-invoke \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn <span class="hljs-string">&quot;arn:aws:execute-api:us-east-1:123456789012:abc123def4/*/*&quot;</span> \\
  --region us-east-1
</code></pre>
<p>فعّل CORS على الـAPI:</p>
<pre><code class="language-bash">aws apigatewayv2 update-api \\
  --api-id abc123def4 \\
  --cors-configuration <span class="hljs-string">&quot;AllowOrigins=https://example.com,AllowMethods=GET,POST,PUT,DELETE,OPTIONS,AllowHeaders=content-type,x-notepad-user-id&quot;</span> \\
  --region us-east-1
</code></pre>
<h2 id="6-اختبار-دخاني">6. اختبار دخاني</h2>
<pre><code class="language-bash"><span class="hljs-comment"># Create</span>
curl -sS -X POST https://api.example.com/notes \\
  -H <span class="hljs-string">&quot;content-type: application/json&quot;</span> \\
  -H <span class="hljs-string">&quot;x-notepad-user-id: user-123&quot;</span> \\
  -d <span class="hljs-string">&#x27;{&quot;id&quot;:&quot;note-1&quot;,&quot;title&quot;:&quot;First note&quot;,&quot;body&quot;:&quot;Hello world&quot;,&quot;createdAt&quot;:&quot;2026-04-16T12:00:00Z&quot;,&quot;updatedAt&quot;:&quot;2026-04-16T12:00:00Z&quot;}&#x27;</span>

<span class="hljs-comment"># Read all</span>
curl -sS https://api.example.com/notes \\
  -H <span class="hljs-string">&quot;x-notepad-user-id: user-123&quot;</span>

<span class="hljs-comment"># Update</span>
curl -sS -X PUT https://api.example.com/notes/note-1 \\
  -H <span class="hljs-string">&quot;content-type: application/json&quot;</span> \\
  -H <span class="hljs-string">&quot;x-notepad-user-id: user-123&quot;</span> \\
  -d <span class="hljs-string">&#x27;{&quot;title&quot;:&quot;Updated note&quot;,&quot;body&quot;:&quot;New content&quot;,&quot;createdAt&quot;:&quot;2026-04-16T12:00:00Z&quot;}&#x27;</span>

<span class="hljs-comment"># Delete</span>
curl -sS -X DELETE https://api.example.com/notes/note-1 \\
  -H <span class="hljs-string">&quot;x-notepad-user-id: user-123&quot;</span>
</code></pre>
<p>ينبغي أن تُرجع الأوامر الأربعة كلها رمز 2xx مع JSON المتوقّع.</p>
<h2 id="7-ربط-الواجهة-الأمامية">7. ربط الواجهة الأمامية</h2>
<p>استنسخ Scratch Lab ووجّهه إلى الـAPI الخاص بك:</p>
<pre><code class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/stevekinney/scratch-lab.git
<span class="hljs-built_in">cd</span> scratch-lab
npm install
VITE_API_URL=https://api.example.com npm run dev
</code></pre>
<p>أنشئ ملاحظة في المتصفّح. وينبغي أن ترى العنصر يظهر في وحدة تحكّم DynamoDB. عدّل الملاحظة وتحقّق من أن <code>updatedAt</code> يتغيّر في طلب GET التالي.</p>
<p><img src="/arabic-cs-library/images/kinney/634119f21216e8a2.webp" alt="تطبيق المفكّرة Scratch Lab يعمل على CloudFront مع ملاحظة منشأة، عارضًا الرحلة الكاملة عبر المكدّس من المتصفّح إلى DynamoDB والعودة."></p>
<h2 id="ملخص-الموارد-المنشأة">ملخّص الموارد المنشأة</h2>
<table>
<thead>
<tr>
<th>المورد</th>
<th>المعرّف</th>
</tr>
</thead>
<tbody>
<tr>
<td>جدول DynamoDB</td>
<td><code>scratch-lab-notes</code></td>
</tr>
<tr>
<td>سر Parameter Store</td>
<td><code>/scratch-lab/production/search-api-key</code></td>
</tr>
<tr>
<td>دالة Lambda</td>
<td><code>scratch-lab-api</code></td>
</tr>
<tr>
<td>دور التنفيذ</td>
<td><code>scratch-lab-api-role</code> مع إرفاق <code>scratch-lab-api-policy</code></td>
</tr>
<tr>
<td>تكامل API Gateway</td>
<td><code>AWS_PROXY</code> ← <code>scratch-lab-api</code></td>
</tr>
<tr>
<td>مسارات API Gateway</td>
<td><code>GET /notes</code>, <code>POST /notes</code>, <code>GET /notes/{noteId}</code>, <code>PUT /notes/{noteId}</code>, <code>DELETE /notes/{noteId}</code></td>
</tr>
</tbody>
</table>
<p>عند تفكيك هذا، اتبع الترتيب الوارد في <a href="https://stevekinney.com/courses/aws/cleanup-and-teardown">التنظيف والتفكيك</a>: المسارات قبل التكامل، والتكامل قبل الدالة، والدالة قبل الدور، والجدول في النهاية.</p>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,e as chapter,a as chapterTitle,c as default,p as headings,l as html,n as slug,t as title};
