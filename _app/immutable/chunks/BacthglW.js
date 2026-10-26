const s="kinney",l="aws",a="نشر تطبيقات الويب على AWS",n="request-and-response-mapping",t="ربط الطلبات والاستجابات",p=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"يبني-على",text:"يبني على"},{depth:2,id:"الحدث-الوارد-apigatewayproxyeventv2",text:"الحدث الوارد: APIGatewayProxyEventV2"},{depth:2,id:"الحقول-المهمة",text:"الحقول المهمة"},{depth:3,id:"طريقة-http-والمسار",text:"طريقة HTTP والمسار"},{depth:3,id:"معاملات-سلسلة-الاستعلام",text:"معاملات سلسلة الاستعلام"},{depth:3,id:"الترويسات",text:"الترويسات"},{depth:3,id:"جسم-الطلب",text:"جسم الطلب"},{depth:3,id:"معاملات-المسار",text:"معاملات المسار"},{depth:3,id:"المرحلة",text:"المرحلة"},{depth:2,id:"صيغة-الاستجابة",text:"صيغة الاستجابة"},{depth:3,id:"الحقول-المطلوبة",text:"الحقول المطلوبة"},{depth:3,id:"الحقول-الاختيارية",text:"الحقول الاختيارية"},{depth:2,id:"نمط-معالج-كامل",text:"نمط معالج كامل"},{depth:2,id:"إصدار-صيغة-الحمولة-10-مقابل-20",text:"إصدار صيغة الحمولة 1.0 مقابل 2.0"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"},{depth:2,id:"التحقق",text:"التحقق"},{depth:2,id:"أنماط-الفشل-الشائعة",text:"أنماط الفشل الشائعة"}],e=`<p>لنفترض أن واجهة Scratch Lab الأمامية ترسل <code>POST /notes</code> عندما ينشئ أحدهم ملاحظة جديدة. المتصفح يفكّر بلغة HTTP، أما دالة Lambda لديك فلا. تقف API Gateway في المنتصف، فتحوّل طلب HTTP ذاك إلى كائن حدث JSON، وتسلّمه إلى Lambda، ثم تحوّل قيمة الإرجاع من Lambda مرة أخرى إلى استجابة HTTP في طريق الخروج. وفهم طبقة الترجمة هذه هو الفرق بين بناء واجهة برمجية بثقة وبين التخمين في أسماء الحقول حتى يعمل شيء ما.</p>
<p>وإن أردت صياغة الربط الدقيقة من AWS أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html">دليل ربط معاملات HTTP API</a> هو المرجع الرسمي.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>هنا تلتقي حدوس الواجهة الأمامية بسباكة AWS. فإذا فهمت شكل كائن الحدث وشكل كائن الاستجابة، تكفّ API Gateway عن أن تبدو سحرية وتبدأ تبدو ميكانيكية. وهذا بالضبط ما تريده. فالأنظمة الميكانيكية أسهل في التصحيح.</p>
<h2 id="يبني-على">يبني على</h2>
<ul>
<li><a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هي Lambda ولماذا يهتم بها مهندسو الواجهة الأمامية</a></li>
<li><a href="https://stevekinney.com/courses/aws/creating-an-http-api">إنشاء HTTP API</a></li>
<li><a href="https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda">ربط API Gateway بـ Lambda</a></li>
</ul>
<pre><code>sequenceDiagram
    participant Browser
    participant APIGateway as API Gateway
    participant Lambda

    Browser-&gt;&gt;APIGateway: HTTP request
    APIGateway-&gt;&gt;Lambda: APIGatewayProxyEventV2 JSON
    Lambda--&gt;&gt;APIGateway: { statusCode, headers, body }
    APIGateway--&gt;&gt;Browser: HTTP response
</code></pre>
<h2 id="الحدث-الوارد-apigatewayproxyeventv2">الحدث الوارد: <code>APIGatewayProxyEventV2</code></h2>
<p>عندما تستخدم HTTP API بإصدار صيغة الحمولة 2.0 (وهو ما أعددته في <a href="https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda">ربط API Gateway بـ Lambda</a>)، يتلقّى معالجك كائن <code>APIGatewayProxyEventV2</code>. وهذا شكل حدث حقيقي لطلب <code>POST /items?category=books</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;routeKey&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST /items&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;rawPath&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/items&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;rawQueryString&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category=books&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;content-type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;authorization&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Bearer eyJhbG...&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;host&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4.execute-api.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;user-agent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mozilla/5.0...&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;accountId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;123456789012&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;apiId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;domainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4.execute-api.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/items&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;protocol&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HTTP/1.1&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sourceIp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;203.0.113.42&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;userAgent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mozilla/5.0...&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;requestId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123-request-id&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;stage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$default&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;time&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;18/Mar/2026:12:00:00 +0000&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;timeEpoch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1774051200000</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;name\\&quot;:\\&quot;TypeScript in Action\\&quot;,\\&quot;price\\&quot;:29.99}&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;isBase64Encoded&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذه حقول كثيرة. وإليك الحقول التي ستستخدمها في كل معالج تقريبًا.</p>
<h2 id="الحقول-المهمة">الحقول المهمة</h2>
<h3 id="طريقة-http-والمسار">طريقة HTTP والمسار</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;
<span class="hljs-keyword">const</span> path = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">path</span>;
</code></pre>
<p>تقع الطريقة والمسار متداخلين تحت <code>requestContext.http</code>، لا في المستوى الأعلى. وهذا يوقع من اعتادوا على مسارات API في Express أو Next.js حيث يكون <code>req.method</code> خاصية في المستوى الأعلى.</p>
<h3 id="معاملات-سلسلة-الاستعلام">معاملات سلسلة الاستعلام</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> category = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">category</span>;
</code></pre>
<p><code>queryStringParameters</code> كائن يربط أسماء المعاملات بقيمها. وإذا لم يكن للطلب سلسلة استعلام، فالحقل <code>undefined</code> — لا كائنًا فارغًا. استخدم التابع الاختياري (optional chaining) دائمًا.</p>
<p>أما معاملات الاستعلام المتكررة (مثل <code>?tag=js&amp;tag=ts</code>)، فـ API Gateway يدمج القيم بفاصلة: <code>&quot;js,ts&quot;</code>. وإن كنت تحتاج القيم منفردة، فقسّم على الفاصلة.</p>
<h3 id="الترويسات">الترويسات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> contentType = event.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;content-type&#x27;</span>];
<span class="hljs-keyword">const</span> authorization = event.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;authorization&#x27;</span>];
</code></pre>
<p>كل أسماء الترويسات بأحرف صغيرة. فإذا أرسل العميل <code>Content-Type</code>، تصل إليه بوصفه <code>event.headers['content-type']</code>. وهذا سلوك ثابت من API Gateway — لا تحتاج إلى معالجة اختلافات حالة الأحرف.</p>
<h3 id="جسم-الطلب">جسم الطلب</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> body = event.<span class="hljs-property">body</span> ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span>) : <span class="hljs-literal">null</span>;
</code></pre>
<p><em>ملاحظة:</em> <code>event.body</code> دائمًا سلسلة نصية. وعليك تحليلها بنفسك.</p>
<p>الجسم <code>body</code> دائمًا سلسلة نصية، حتى عندما يرسل العميل <code>Content-Type: application/json</code>. فـ API Gateway لا يحلّله نيابة عنك. وإذا لم يكن للطلب جسم (طلبات GET مثلًا)، فـ <code>event.body</code> يكون <code>undefined</code>.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لفّ <code>JSON.parse</code> داخل try/catch. فبإمكان العميل إرسال جسم مشوّه يفشل تحليله، والاستثناء غير المعالَج في معالجك يُرجع 500 بلا أي معلومات مفيدة للمستدعي.</p>
</blockquote>
<pre><code class="language-typescript"><span class="hljs-keyword">let</span> <span class="hljs-attr">body</span>: <span class="hljs-built_in">unknown</span> = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">try</span> {
  body = event.<span class="hljs-property">body</span> ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span>) : <span class="hljs-literal">null</span>;
} <span class="hljs-keyword">catch</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid JSON in request body&#x27;</span> }),
  };
}
</code></pre>
<h3 id="معاملات-المسار">معاملات المسار</h3>
<p>إذا كان مسارك يتضمّن معاملات مسار (مثل <code>GET /items/{id}</code>)، فالقيم متاحة في <code>event.pathParameters</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> itemId = event.<span class="hljs-property">pathParameters</span>?.<span class="hljs-property">id</span>;
</code></pre>
<p>ومثل <code>queryStringParameters</code>، يكون الحقل <code>pathParameters</code> مساويًا <code>undefined</code> عندما لا تُعرَّف معاملات مسار على المسار — لا كائنًا فارغًا. (كنت أتمنى لو كان كائنًا فارغًا، لكن هذه هي الحال.)</p>
<h3 id="المرحلة">المرحلة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> stage = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">stage</span>;
</code></pre>
<p>بالنسبة إلى المرحلة <code>$default</code>، تكون هذه القيمة <code>&quot;$default&quot;</code>. وإذا أنشأت مراحل مسمّاة (وهو ما يُغطّى في <a href="https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains">مراحل API Gateway والنطاقات المخصّصة</a>)، يظهر اسم المرحلة هنا. وقد يفيد هذا في السلوك الشرطي — جداول قاعدة بيانات مختلفة لكل بيئة، ومستويات تسجيل مختلفة، وما إلى ذلك.</p>
<h2 id="صيغة-الاستجابة">صيغة الاستجابة</h2>
<p>يُرجع معالجك كائنًا تحوّله API Gateway إلى استجابة HTTP. والصيغة مباشرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">return</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
  },
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">items</span>: [] }),
};
</code></pre>
<h3 id="الحقول-المطلوبة">الحقول المطلوبة</h3>
<ul>
<li><strong><code>statusCode</code></strong>: رمز حالة HTTP صحيح. تمرّره API Gateway إلى العميل كما هو.</li>
<li><strong><code>body</code></strong>: سلسلة نصية. وإذا كنت تُرجع JSON، فعليك تمريره على <code>JSON.stringify</code>. وإن نسيت، يتلقّى العميل <code>[object Object]</code>.</li>
</ul>
<h3 id="الحقول-الاختيارية">الحقول الاختيارية</h3>
<ul>
<li><strong><code>headers</code></strong>: كائن بترويسات الاستجابة. ينبغي أن تضبط <code>Content-Type</code> دائمًا. ويمكنك أيضًا ضبط ترويسات التخزين المؤقت أو الترويسات المخصّصة أو ترويسات CORS (وإن كان الأفضل معالجة CORS على مستوى API Gateway — وهو ما يُغطّى في <a href="https://stevekinney.com/courses/aws/api-gateway-cors-configuration">إعداد CORS في API Gateway</a>).</li>
<li><strong><code>isBase64Encoded</code></strong>: اضبطه على <code>true</code> إذا كان الجسم بيانات ثنائية مرمّزة بـ base64 (صور، ملفات PDF). والقيمة الافتراضية <code>false</code>.</li>
<li><strong><code>cookies</code></strong>: مصفوفة بقيم ترويسة <code>Set-Cookie</code>. واستخدام هذا الحقل بدلًا من ضبط ملفات تعريف الارتباط في كائن <code>headers</code> يضمن تنسيقًا سليمًا عند ضبط عدة ملفات.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-keyword">return</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
    <span class="hljs-string">&#x27;Cache-Control&#x27;</span>: <span class="hljs-string">&#x27;max-age=300&#x27;</span>,
  },
  <span class="hljs-attr">cookies</span>: [<span class="hljs-string">&#x27;session=abc123; HttpOnly; Secure; SameSite=Strict&#x27;</span>],
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">items</span>: [] }),
};
</code></pre>
<h2 id="نمط-معالج-كامل">نمط معالج كامل</h2>
<p>هذا نمط يعالج الحالات الشائعة — التوجيه حسب الطريقة، وتحليل الجسم، وقراءة معاملات المسار، وإرجاع استجابات أخطاء مناسبة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Item</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;
  <span class="hljs-keyword">const</span> path = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">path</span>;

  <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;GET&#x27;</span> &amp;&amp; path === <span class="hljs-string">&#x27;/items&#x27;</span>) {
    <span class="hljs-keyword">const</span> category = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">category</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[] = []; <span class="hljs-comment">// Fetch from database in a real application</span>

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ items }),
    };
  }

  <span class="hljs-keyword">if</span> (method === <span class="hljs-string">&#x27;POST&#x27;</span> &amp;&amp; path === <span class="hljs-string">&#x27;/items&#x27;</span>) {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">body</span>: { <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span> };

    <span class="hljs-keyword">try</span> {
      body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span> || <span class="hljs-string">&#x27;{}&#x27;</span>);
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid JSON&#x27;</span> }),
      };
    }

    <span class="hljs-keyword">if</span> (!body.<span class="hljs-property">name</span> || <span class="hljs-keyword">typeof</span> body.<span class="hljs-property">price</span> !== <span class="hljs-string">&#x27;number&#x27;</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing required fields: name, price&#x27;</span> }),
      };
    }

    <span class="hljs-keyword">const</span> <span class="hljs-attr">item</span>: <span class="hljs-title class_">Item</span> = {
      <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),
      <span class="hljs-attr">name</span>: body.<span class="hljs-property">name</span>,
      <span class="hljs-attr">price</span>: body.<span class="hljs-property">price</span>,
    };

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">201</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(item),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">404</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Not found&#x27;</span> }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> استخدم <code>event.queryStringParameters</code> للتصفية والترتيب والتقسيم إلى صفحات.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p><code>crypto.randomUUID()</code> متاح أصلًا في Node.js 20. فلا حاجة إلى تثبيت حزمة <code>uuid</code> لتوليد معرّفات بسيطة.</p>
</blockquote>
<h2 id="إصدار-صيغة-الحمولة-10-مقابل-20">إصدار صيغة الحمولة 1.0 مقابل 2.0</h2>
<p>إذا كنت تقرأ دروسًا أو إجابات على Stack Overflow، فقد ترى أشكال أحداث تبدو مختلفة عمّا هو موصوف هنا. والسبب أن API Gateway لديه إصداران لصيغة الحمولة:</p>
<table>
<thead>
<tr>
<th>الميزة</th>
<th>الإصدار 1.0</th>
<th>الإصدار 2.0</th>
</tr>
</thead>
<tbody>
<tr>
<td>موضع الطريقة</td>
<td><code>event.httpMethod</code></td>
<td><code>event.requestContext.http.method</code></td>
</tr>
<tr>
<td>موضع المسار</td>
<td><code>event.path</code></td>
<td><code>event.requestContext.http.path</code></td>
</tr>
<tr>
<td>معاملات الاستعلام</td>
<td><code>event.queryStringParameters</code></td>
<td><code>event.queryStringParameters</code></td>
</tr>
<tr>
<td>معاملات استعلام متعددة القيم</td>
<td><code>event.multiValueQueryStringParameters</code></td>
<td>مفصولة بفواصل في حقل واحد</td>
</tr>
<tr>
<td>ترويسات متعددة القيم</td>
<td><code>event.multiValueHeaders</code></td>
<td>مفصولة بفواصل في حقل واحد</td>
</tr>
<tr>
<td>نوع TypeScript</td>
<td><code>APIGatewayProxyEvent</code></td>
<td><code>APIGatewayProxyEventV2</code></td>
</tr>
</tbody>
</table>
<p>الإصدار 2.0 هو الافتراضي لـ HTTP APIs المنشأة بـ <code>--payload-format-version 2.0</code>. والإصدار 1.0 هو الصيغة التي تستخدمها REST APIs. وهذه الدورة تستخدم 2.0 حصريًا.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>الوصول إلى <code>event.httpMethod</code> بدلًا من <code>event.requestContext.http.method</code>.</strong> هذا حقل من الإصدار 1.0. وفي الإصدار 2.0 لا وجود له. فإذا أشار كودك إلى <code>event.httpMethod</code>، فإمّا أنك تستخدم صيغة الحمولة الخاطئة أو تتبع درسًا عن REST API.</p>
<p><strong>إرجاع كائن كجسم.</strong> يجب أن يكون الجسم سلسلة نصية. فإرجاع <code>{ items: [] }</code> بدلًا من <code>JSON.stringify({ items: [] })</code> يُنتج <code>[object Object]</code> في الاستجابة.</p>
<p><strong>عدم معالجة الحقول غير المعرّفة.</strong> يمكن أن تكون <code>queryStringParameters</code> و<code>pathParameters</code> و<code>body</code> جميعًا <code>undefined</code>. وTypeScript ينبّهك إلى ذلك إن كنت تستخدم الأنواع الصحيحة — فانتبه لتلك التنبيهات.</p>
<p>واجهتك البرمجية تعمل، لكن جرّب استدعاءها من تطبيق React يعمل على <code>localhost:3000</code>. سيمنع المتصفح الطلب بخطأ CORS. لقد رأيت هذا من قبل — والآن أنت في الجانب الخادم من المشكلة. ويغطّي الدرس التالي ضبط CORS على HTTP API لديك حتى تتمكّن واجهتك الأمامية من استدعائها فعلًا.</p>
<h2 id="التحقق">التحقق</h2>
<p>استخدم طلبًا حقيقيًا واحدًا واستدعاءً مباشرًا واحدًا لـ Lambda لإثبات أنك فهمت الربط:</p>
<pre><code class="language-bash">curl -i https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/items

aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --payload fileb://test-event.json \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>ينبغي أن تكون قادرًا على الإجابة عن هذه الأسئلة بلا تخمين:</p>
<ul>
<li>أي حقل يحتوي طريقة HTTP؟</li>
<li>أي حقل يحتوي جسم الطلب الخام؟</li>
<li>أي حقل يحتوي اسم المرحلة؟</li>
<li>أي جزء من قيمة إرجاعك يصبح جسم استجابة المتصفح الفعلي؟</li>
</ul>
<h2 id="أنماط-الفشل-الشائعة">أنماط الفشل الشائعة</h2>
<ul>
<li><strong>نسيان تحليل <code>event.body</code>:</strong> فـ API Gateway يعطيك سلسلة نصية، لا كائنًا محلَّلًا سلفًا.</li>
<li><strong>قراءة حقل المسار الخاطئ:</strong> <code>requestContext.http.path</code> و<code>rawPath</code> مرتبطان، لكنهما ليسا متبادلين في كل جلسة تصحيح.</li>
<li><strong>إرجاع كائن عادي كـ <code>body</code>:</strong> إذا تجاوزت <code>JSON.stringify</code>، يحصل العميل على بيانات تالفة بدلًا من JSON.</li>
<li><strong>افتراض اصطلاحات Express:</strong> فلا وجود لـ <code>req</code> ولا <code>res</code> ولا حزمة برمجيات وسيطة تملأ الأجزاء الناقصة بهدوء.</li>
</ul>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:e};export{s as book,l as chapter,a as chapterTitle,c as default,p as headings,e as html,n as slug,t as title};
