const s="kinney",e="aws",a="نشر تطبيقات الويب على AWS",n="api-gateway-lambda-solution",t="الحل",p=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"المعالج",text:"المعالج"},{depth:3,id:"lambdasrchandlerts",text:"lambda/src/handler.ts"},{depth:3,id:"البناء-والضغط",text:"البناء والضغط"},{depth:2,id:"نشر-دالة-lambda",text:"نشر دالة Lambda"},{depth:3,id:"تحديث-دالة-موجودة",text:"تحديث دالة موجودة"},{depth:3,id:"إنشاء-دالة-جديدة",text:"إنشاء دالة جديدة"},{depth:3,id:"التحقق-بالاستدعاء-المباشر",text:"التحقق بالاستدعاء المباشر"},{depth:2,id:"إنشاء-http-api",text:"إنشاء HTTP API"},{depth:2,id:"إنشاء-التكامل",text:"إنشاء التكامل"},{depth:2,id:"إنشاء-المسارات",text:"إنشاء المسارات"},{depth:3,id:"get-items",text:"GET /items"},{depth:3,id:"post-items",text:"POST /items"},{depth:3,id:"التحقق-من-المسارات",text:"التحقق من المسارات"},{depth:2,id:"منح-الإذن",text:"منح الإذن"},{depth:3,id:"الاختبار-باستخدام-curl",text:"الاختبار باستخدام curl"},{depth:2,id:"تهيئة-cors",text:"تهيئة CORS"},{depth:3,id:"اختبار-طلب-الفحص-المسبق",text:"اختبار طلب الفحص المسبق"},{depth:2,id:"الاستدعاء-من-react",text:"الاستدعاء من React"},{depth:2,id:"هدف-إضافي-get-itemsid",text:"هدف إضافي: GET /items/{id}"},{depth:3,id:"إضافة-المسار",text:"إضافة المسار"},{depth:3,id:"تحديث-المعالج",text:"تحديث المعالج"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>هذا هو الحل الكامل لكل خطوة، بما في ذلك كود المعالج، وكل أوامر CLI، والمخرجات المتوقعة في كل مرحلة.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>مسارات HTTP API تسلّم الطلب كاملًا إلى دالة Lambda واحدة، وهذا يُبقي تهيئة البوابة بسيطة ويدفع منطق التطبيق إلى كود TypeScript عادي.</li>
<li>إذن Lambda هو التبعية الخفيّة التي تجعل التكامل حقيقيًا. فبدونه توجد الواجهة البرمجية لكنها لا تستطيع استدعاء أي شيء.</li>
<li>اختبار المتصفح مهم لأن خلفية تعمل في <code>curl</code> لكنها تفشل في CORS تبقى معطوبة من منظور فريق الواجهة الأمامية.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت إبقاء نسخة AWS من سير عمل المسار والتكامل وCORS مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html">توثيق HTTP APIs</a> و<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html">دليل تكامل Lambda</a> و<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html">دليل CORS في HTTP API</a> في متناول يدك.</p>
</blockquote>
<h2 id="المعالج">المعالج</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>هذا المعالج متاح بصيغة <a href="https://github.com/stevekinney/scratch-lab/blob/main/lambda/src/items-handler.ts"><code>items-handler.ts</code></a> في مستودع Scratch Lab.</p>
</blockquote>
<h3 id="lambdasrchandlerts"><code>lambda/src/handler.ts</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Item</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[] = [
  { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;TypeScript in Action&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">29.99</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;AWS for Humans&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">34.99</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;3&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;React Patterns&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">24.99</span> },
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;

  <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;GET&#x27;</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ items }),
    };
  }

  <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;POST&#x27;</span>) {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">body</span>: { <span class="hljs-attr">name</span>?: <span class="hljs-built_in">string</span>; <span class="hljs-attr">price</span>?: <span class="hljs-built_in">number</span> };

    <span class="hljs-keyword">try</span> {
      body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span> || <span class="hljs-string">&#x27;{}&#x27;</span>);
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid JSON in request body&#x27;</span> }),
      };
    }

    <span class="hljs-keyword">if</span> (!body.<span class="hljs-property">name</span> || <span class="hljs-keyword">typeof</span> body.<span class="hljs-property">price</span> !== <span class="hljs-string">&#x27;number&#x27;</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
          <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing required fields: name (string), price (number)&#x27;</span>,
        }),
      };
    }

    <span class="hljs-keyword">const</span> <span class="hljs-attr">newItem</span>: <span class="hljs-title class_">Item</span> = {
      <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),
      <span class="hljs-attr">name</span>: body.<span class="hljs-property">name</span>,
      <span class="hljs-attr">price</span>: body.<span class="hljs-property">price</span>,
    };

    items.<span class="hljs-title function_">push</span>(newItem);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">201</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(newItem),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">405</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Method not allowed&#x27;</span> }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> وجّه الطلبات بحسب طريقة HTTP لأن <code>GET /items</code> و<code>POST /items</code> كلاهما يصل إلى دالة Lambda نفسها.</p>
<p><em>ملاحظة:</em> تُعاد هذه المصفوفة في الذاكرة إلى حالتها الأصلية عند كل بدء بارد. أما الواجهة البرمجية الحقيقية فستكتب إلى DynamoDB.</p>
<h3 id="البناء-والضغط">البناء والضغط</h3>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..
</code></pre>
<p>المتوقع: يُنشأ <code>dist/handler.js</code> بلا أخطاء. ويحتوي <code>function.zip</code> على المخرجات المُصرّفة.</p>
<h2 id="نشر-دالة-lambda">نشر دالة Lambda</h2>
<h3 id="تحديث-دالة-موجودة">تحديث دالة موجودة</h3>
<p>إذا كانت لديك الدالة من تمرين Lambda:</p>
<pre><code class="language-bash">aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://lambda/function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="إنشاء-دالة-جديدة">إنشاء دالة جديدة</h3>
<p>إذا كنت تبدأ من الصفر، فأنشئ دور التنفيذ والدالة أولًا:</p>
<pre><code class="language-bash">aws iam create-role \\
  --role-name my-frontend-app-lambda-role \\
  --assume-role-policy-document file://trust-policy.json \\
  --region us-east-1 \\
  --output json

aws iam attach-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \\
  --region us-east-1 \\
  --output json

aws lambda create-function \\
  --function-name my-frontend-app-api \\
  --runtime nodejs22.x \\
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \\
  --handler handler.handler \\
  --zip-file fileb://lambda/function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="التحقق-بالاستدعاء-المباشر">التحقق بالاستدعاء المباشر</h3>
<p>اختبر GET:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload <span class="hljs-string">&#x27;{&quot;requestContext&quot;:{&quot;http&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;path&quot;:&quot;/items&quot;}}}&#x27;</span> \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>الاستجابة المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;statusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Content-Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;items\\&quot;:[{\\&quot;id\\&quot;:\\&quot;1\\&quot;,\\&quot;name\\&quot;:\\&quot;TypeScript in Action\\&quot;,\\&quot;price\\&quot;:29.99},{\\&quot;id\\&quot;:\\&quot;2\\&quot;,\\&quot;name\\&quot;:\\&quot;AWS for Humans\\&quot;,\\&quot;price\\&quot;:34.99},{\\&quot;id\\&quot;:\\&quot;3\\&quot;,\\&quot;name\\&quot;:\\&quot;React Patterns\\&quot;,\\&quot;price\\&quot;:24.99}]}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>اختبر POST:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload <span class="hljs-string">&#x27;{&quot;requestContext&quot;:{&quot;http&quot;:{&quot;method&quot;:&quot;POST&quot;,&quot;path&quot;:&quot;/items&quot;}},&quot;body&quot;:&quot;{\\&quot;name\\&quot;:\\&quot;Node.js Essentials\\&quot;,\\&quot;price\\&quot;:19.99}&quot;}&#x27;</span> \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>الاستجابة المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;statusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">201</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Content-Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;id\\&quot;:\\&quot;a1b2c3d4-e5f6-7890-abcd-ef1234567890\\&quot;,\\&quot;name\\&quot;:\\&quot;Node.js Essentials\\&quot;,\\&quot;price\\&quot;:19.99}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>سيكون <code>id</code> قيمة UUID مختلفة في كل استدعاء.</p>
<h2 id="إنشاء-http-api">إنشاء HTTP API</h2>
<pre><code class="language-bash">aws apigatewayv2 create-api \\
  --name my-frontend-app-api \\
  --protocol-type HTTP \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiEndpoint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://abc123def4.execute-api.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ApiId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CreatedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00+00:00&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ProtocolType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HTTP&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteSelectionExpression&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${request.method} \${request.path}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ معرّف الواجهة البرمجية:</p>
<pre><code class="language-bash">API_ID=<span class="hljs-string">&quot;abc123def4&quot;</span>
</code></pre>
<h2 id="إنشاء-التكامل">إنشاء التكامل</h2>
<pre><code class="language-bash">aws apigatewayv2 create-integration \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --integration-type AWS_PROXY \\
  --integration-uri arn:aws:lambda:us-east-1:123456789012:<span class="hljs-keyword">function</span>:my-frontend-app-api \\
  --payload-format-version 2.0 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ConnectionType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;INTERNET&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IntegrationId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IntegrationType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWS_PROXY&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;IntegrationUri&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;PayloadFormatVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;TimeoutInMillis&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30000</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ معرّف التكامل:</p>
<pre><code class="language-bash">INTEGRATION_ID=<span class="hljs-string">&quot;a1b2c3&quot;</span>
</code></pre>
<h2 id="إنشاء-المسارات">إنشاء المسارات</h2>
<h3 id="get-items">GET /items</h3>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --route-key <span class="hljs-string">&quot;GET /items&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/<span class="hljs-variable">$INTEGRATION_ID</span>&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiKeyRequired&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;route-get-123&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteKey&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET /items&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="post-items">POST /items</h3>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --route-key <span class="hljs-string">&quot;POST /items&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/<span class="hljs-variable">$INTEGRATION_ID</span>&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiKeyRequired&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;route-post-456&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteKey&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST /items&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;integrations/a1b2c3&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="التحقق-من-المسارات">التحقق من المسارات</h3>
<pre><code class="language-bash">aws apigatewayv2 get-routes \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع: مساران بمفتاحَي مسار <code>GET /items</code> و<code>POST /items</code>، وكلاهما يستهدف التكامل نفسه.</p>
<p>في وحدة التحكم، تعرض صفحة <strong>Routes</strong> كلا المسارين مُدرجين تحت الواجهة البرمجية.</p>
<p><img src="/arabic-cs-library/images/kinney/6bf5325c96478758.webp" alt="تعرض صفحة Routes في API Gateway المسار ANY / المُنشأ لواجهة my-frontend-api من نوع HTTP API."></p>
<h2 id="منح-الإذن">منح الإذن</h2>
<pre><code class="language-bash">aws lambda add-permission \\
  --function-name my-frontend-app-api \\
  --statement-id apigateway-invoke \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com \\
  --source-arn <span class="hljs-string">&quot;arn:aws:execute-api:us-east-1:123456789012:<span class="hljs-variable">$API_ID</span>/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;Sid\\&quot;:\\&quot;apigateway-invoke\\&quot;,\\&quot;Effect\\&quot;:\\&quot;Allow\\&quot;,\\&quot;Principal\\&quot;:{\\&quot;Service\\&quot;:\\&quot;apigateway.amazonaws.com\\&quot;},\\&quot;Action\\&quot;:\\&quot;lambda:InvokeFunction\\&quot;,\\&quot;Resource\\&quot;:\\&quot;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api\\&quot;,\\&quot;Condition\\&quot;:{\\&quot;ArnLike\\&quot;:{\\&quot;AWS:SourceArn\\&quot;:\\&quot;arn:aws:execute-api:us-east-1:123456789012:abc123def4/*\\&quot;}}}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="الاختبار-باستخدام-curl">الاختبار باستخدام curl</h3>
<pre><code class="language-bash">curl https://<span class="hljs-variable">$API_ID</span>.execute-api.us-east-1.amazonaws.com/items
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;TypeScript in Action&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">29.99</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWS for Humans&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">34.99</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;React Patterns&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">24.99</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>اختبر POST:</p>
<pre><code class="language-bash">curl -X POST \\
  https://<span class="hljs-variable">$API_ID</span>.execute-api.us-east-1.amazonaws.com/items \\
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \\
  -d <span class="hljs-string">&#x27;{&quot;name&quot;:&quot;Node.js Essentials&quot;,&quot;price&quot;:19.99}&#x27;</span>
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Node.js Essentials&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">19.99</span> <span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أعاد <code>curl</code> الرسالة <code>{&quot;message&quot;:&quot;Internal Server Error&quot;}</code>، فإن إذن Lambda مفقود. شغّل أمر <code>add-permission</code> أعلاه. وإذا أعادت الواجهة البرمجية <code>{&quot;message&quot;:&quot;Not Found&quot;}</code>، فلم تُنشأ المسارات بشكل صحيح — تحقّق من <code>get-routes</code>.</p>
</blockquote>
<h2 id="تهيئة-cors">تهيئة CORS</h2>
<pre><code class="language-bash">aws apigatewayv2 update-api \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --cors-configuration <span class="hljs-string">&#x27;{&quot;AllowOrigins&quot;:[&quot;http://localhost:3000&quot;,&quot;http://localhost:5173&quot;],&quot;AllowMethods&quot;:[&quot;GET&quot;,&quot;POST&quot;],&quot;AllowHeaders&quot;:[&quot;Content-Type&quot;],&quot;MaxAge&quot;:86400}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المتوقع: تتضمن الاستجابة كتلة <code>CorsConfiguration</code> بالقيم التي ضبطتها.</p>
<h3 id="اختبار-طلب-الفحص-المسبق">اختبار طلب الفحص المسبق</h3>
<pre><code class="language-bash">curl -i -X OPTIONS \\
  https://<span class="hljs-variable">$API_ID</span>.execute-api.us-east-1.amazonaws.com/items \\
  -H <span class="hljs-string">&quot;Origin: http://localhost:3000&quot;</span> \\
  -H <span class="hljs-string">&quot;Access-Control-Request-Method: POST&quot;</span> \\
  -H <span class="hljs-string">&quot;Access-Control-Request-Headers: Content-Type&quot;</span>
</code></pre>
<p>الترويسات المتوقعة في الاستجابة:</p>
<pre><code>access-control-allow-headers: Content-Type
access-control-allow-methods: GET, POST
access-control-allow-origin: http://localhost:3000
access-control-max-age: 86400
</code></pre>
<h2 id="الاستدعاء-من-react">الاستدعاء من React</h2>
<p>إليك مكوّن React بسيطًا يستدعي نقطتَي النهاية معًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Item</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">API_URL</span> = <span class="hljs-string">&#x27;https://abc123def4.execute-api.us-east-1.amazonaws.com&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Items</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [price, setPrice] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${API_URL}</span>/items\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> response.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> <span class="hljs-title function_">setItems</span>(data.<span class="hljs-property">items</span>));
  }, []);

  <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">handleSubmit</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) {
    event.<span class="hljs-title function_">preventDefault</span>();

    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${API_URL}</span>/items\`</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ name, <span class="hljs-attr">price</span>: <span class="hljs-built_in">parseFloat</span>(price) }),
    });

    <span class="hljs-keyword">const</span> newItem = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
    <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">previous</span>) =&gt;</span> [...previous, newItem]);
    <span class="hljs-title function_">setName</span>(<span class="hljs-string">&#x27;&#x27;</span>);
    <span class="hljs-title function_">setPrice</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Items<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {items.map((item) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>
            {item.name}—\${item.price.toFixed(2)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Name&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{name}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(event)</span> =&gt;</span> setName(event.target.value)}
        /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span>
          <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Price&quot;</span>
          <span class="hljs-attr">step</span>=<span class="hljs-string">&quot;0.01&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{price}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(event)</span> =&gt;</span> setPrice(event.target.value)}
        /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Add Item<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>افتح المتصفح، وتحقّق من تحميل قائمة العناصر، وأضف عنصرًا جديدًا باستخدام النموذج، وتأكّد من ظهوره في القائمة. افحص تبويب Network في أدوات المطوّر لتتحقق من نجاح الطلبين برمزَي الحالة 200/201 وبلا أخطاء CORS.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تُعاد مصفوفة <code>items</code> في الذاكرة داخل معالج Lambda إلى حالتها الأصلية عند كل بدء بارد. فإذا أضفت عنصرًا عبر POST ثم انتظرت بضع دقائق (ما يكفي لتُعيد Lambda تدوير بيئة التنفيذ)، فسيختفي العنصر. هذا متوقع — فالحالة في الذاكرة ليست دائمة. في قسم DynamoDB ستستبدل هذه المصفوفة بـ DynamoDB للتخزين الدائم.</p>
</blockquote>
<h2 id="هدف-إضافي-get-itemsid">هدف إضافي: <code>GET /items/{id}</code></h2>
<h3 id="إضافة-المسار">إضافة المسار</h3>
<pre><code class="language-bash">aws apigatewayv2 create-route \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --route-key <span class="hljs-string">&quot;GET /items/{id}&quot;</span> \\
  --target <span class="hljs-string">&quot;integrations/<span class="hljs-variable">$INTEGRATION_ID</span>&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="تحديث-المعالج">تحديث المعالج</h3>
<p>أضف هذه الكتلة <strong>قبل</strong> فحص <code>if (method === 'GET')</code> الموجود — فالمسار الأكثر تحديدًا يحتاج إلى المطابقة أولًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;GET&#x27;</span> &amp;&amp; event.<span class="hljs-property">pathParameters</span>?.<span class="hljs-property">id</span>) {
  <span class="hljs-keyword">const</span> item = items.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span> === event.<span class="hljs-property">pathParameters</span>!.<span class="hljs-property">id</span>);

  <span class="hljs-keyword">if</span> (!item) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">404</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Item not found&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(item),
  };
}
</code></pre>
<p>أعد البناء والضغط وحدّث كود الدالة:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..

aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://lambda/function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>اختبر:</p>
<pre><code class="language-bash">curl https://<span class="hljs-variable">$API_ID</span>.execute-api.us-east-1.amazonaws.com/items/1
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;TypeScript in Action&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">29.99</span> <span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash">curl https://<span class="hljs-variable">$API_ID</span>.execute-api.us-east-1.amazonaws.com/items/999
</code></pre>
<p>المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;error&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item not found&quot;</span> <span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="التنظيف">التنظيف</h2>
<p>لإزالة كل ما أنشأته في هذا التمرين:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Delete the API (removes all routes, integrations, and stages)</span>
aws apigatewayv2 delete-api \\
  --api-id <span class="hljs-variable">$API_ID</span> \\
  --region us-east-1 \\
  --output json

<span class="hljs-comment"># Remove the Lambda permission</span>
aws lambda remove-permission \\
  --function-name my-frontend-app-api \\
  --statement-id apigateway-invoke \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لا تُحذف دالة Lambda ودور التنفيذ — ستستخدمهما مرة أخرى في وحدات لاحقة.</p>
`,o={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,e as chapter,a as chapterTitle,o as default,p as headings,l as html,n as slug,t as title};
