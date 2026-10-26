const t="kinney",c="aws",s="نشر تطبيقات الويب على AWS",n="cloudwatch-metrics-and-dashboards",a="المقاييس ولوحات المعلومات",o=[{depth:2,id:"كيف-تعمل-المقاييس",text:"كيف تعمل المقاييس"},{depth:2,id:"المقاييس-الرئيسية-حسب-الخدمة",text:"المقاييس الرئيسية حسب الخدمة"},{depth:3,id:"lambda-awslambda",text:"Lambda (AWS/Lambda)"},{depth:3,id:"api-gateway-awsapigateway",text:"API Gateway (AWS/ApiGateway)"},{depth:3,id:"dynamodb-awsdynamodb",text:"DynamoDB (AWS/DynamoDB)"},{depth:2,id:"الاستعلام-عن-المقاييس-من-cli",text:"الاستعلام عن المقاييس من CLI"},{depth:2,id:"إنشاء-لوحة-معلومات-cloudwatch",text:"إنشاء لوحة معلومات CloudWatch"},{depth:3,id:"إنشاء-لوحة-المعلومات",text:"إنشاء لوحة المعلومات"},{depth:3,id:"التحقق-من-لوحة-المعلومات",text:"التحقق من لوحة المعلومات"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"اختيار-الإحصاءة-الصحيحة",text:"اختيار الإحصاءة الصحيحة"},{depth:2,id:"التنظيف",text:"التنظيف"}],e=`<p>تخبرك السجلات بما حدث. أما <strong>المقاييس</strong> (metrics) فتخبرك كيف تسير الأمور. كل خدمة AWS نشرتها في هذه الدورة — Lambda وAPI Gateway وDynamoDB — تنشر قياسات رقمية إلى CloudWatch على فترات منتظمة. أعداد الاستدعاءات، ومعدّلات الأخطاء، ومئينات زمن الاستجابة، والطلبات المقيّدة. وقد كانت هذه البيانات تتراكم منذ أن نشرت دالة Lambda لأول مرة. لكنك لم تنظر إليها بعد.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من نموذج المقاييس أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">نظرة CloudWatch العامة</a> هي المرجع المعتمد.</p>
<p>في هذا الدرس، ستتعلم أي المقاييس تهم لكل خدمة، وكيف تستعلم عنها من CLI، وكيف تبني لوحة معلومات CloudWatch تعرض صحة تطبيقك بنظرة واحدة.</p>
<h2 id="كيف-تعمل-المقاييس">كيف تعمل المقاييس</h2>
<p><strong>المقياس</strong> سلسلة نقاط بيانات مرتبة زمنيًا. ولكل نقطة بيانات طابع زمني وقيمة ووحدة. وتنشر Lambda نقطة بيانات <code>Duration</code> في كل مرة تعمل فيها دالتك — والقيمة هي زمن التنفيذ بالمللي ثانية. وعلى مدى يوم، قد يكون لديك آلاف نقاط بيانات <code>Duration</code>، ويمكن لـ CloudWatch تجميعها في متوسطات أو قيم عظمى أو مئينات أو مجاميع على أي نافذة زمنية تختارها.</p>
<p>تُنظّم المقاييس حسب <strong>مساحة الأسماء</strong> (الخدمة التي نشرتها)، و<strong>اسم المقياس</strong> (ما يُقاس)، و<strong>الأبعاد</strong> (أي مورد محدّد داخل تلك الخدمة). مثلًا:</p>
<ul>
<li>مساحة الأسماء: <code>AWS/Lambda</code></li>
<li>اسم المقياس: <code>Duration</code></li>
<li>البُعد: <code>FunctionName = my-frontend-app-api</code></li>
</ul>
<p>يحدّد هذا المزيج بشكل فريد «كم تستغرق دالة Lambda الخاصة بي للتنفيذ؟»</p>
<h2 id="المقاييس-الرئيسية-حسب-الخدمة">المقاييس الرئيسية حسب الخدمة</h2>
<p>لست بحاجة إلى مراقبة كل مقياس تنشره AWS. وهذه هي المقاييس التي تهم لواجهة خلفية لتطبيق أمامي.</p>
<h3 id="lambda-awslambda">Lambda (<code>AWS/Lambda</code>)</h3>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>ما يخبرك به</th>
<th>الإحصاءة التي تراقبها</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Invocations</code></td>
<td>عدد مرات تشغيل دالتك</td>
<td><code>Sum</code> — إجمالي حجم الاستدعاءات</td>
</tr>
<tr>
<td><code>Errors</code></td>
<td>عدد الاستدعاءات التي أرجعت خطأً</td>
<td><code>Sum</code> — إجمالي حالات الفشل</td>
</tr>
<tr>
<td><code>Duration</code></td>
<td>مدة كل استدعاء (بالملي ثانية)</td>
<td><code>Average</code> و<code>p95</code> — زمن الاستجابة النموذجي والأسوأ</td>
</tr>
<tr>
<td><code>Throttles</code></td>
<td>الاستدعاءات المرفوضة بسبب حدود التزامن</td>
<td><code>Sum</code> — يجب أن تكون صفرًا</td>
</tr>
<tr>
<td><code>ConcurrentExecutions</code></td>
<td>عدد البيئات العاملة في الوقت نفسه</td>
<td><code>Maximum</code> — ذروة التزامن</td>
</tr>
</tbody>
</table>
<p>معدّل الأخطاء هو <code>Errors / Invocations</code>. فإذا كانت <code>Invocations</code> تساوي 1,000 و<code>Errors</code> تساوي 50، فمعدّل أخطائك 5%. وهذا أهم مقياس منفرد لأي واجهة خلفية API. ولو كان بوسعي مراقبة رقم واحد فقط، لكان هذا هو.</p>
<h3 id="api-gateway-awsapigateway">API Gateway (<code>AWS/ApiGateway</code>)</h3>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>ما يخبرك به</th>
<th>الإحصاءة التي تراقبها</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Count</code></td>
<td>إجمالي طلبات API</td>
<td><code>Sum</code> — حجم حركة المرور</td>
</tr>
<tr>
<td><code>4XXError</code></td>
<td>أخطاء العميل (طلبات سيئة، غير موجود، غير مصرّح)</td>
<td><code>Sum</code> و<code>Average</code> — المعدّل المرتفع يعني أن عقد API غير واضح أو أن العملاء يسيئون التصرف</td>
</tr>
<tr>
<td><code>5XXError</code></td>
<td>أخطاء الخادم (فشلت دالة Lambda أو انتهت مهلتها)</td>
<td><code>Sum</code> — يجب أن تكون قريبة من الصفر</td>
</tr>
<tr>
<td><code>Latency</code></td>
<td>الزمن الكلي من استلام الطلب إلى الاستجابة (بالملي ثانية)</td>
<td><code>Average</code> و<code>p95</code></td>
</tr>
<tr>
<td><code>IntegrationLatency</code></td>
<td>الزمن الذي قضته دالة Lambda تحديدًا (بالملي ثانية)</td>
<td><code>Average</code> — قارنه بـ <code>Latency</code> لترى الحمل الإضافي لـ API Gateway</td>
</tr>
</tbody>
</table>
<p>الفجوة بين <code>Latency</code> و<code>IntegrationLatency</code> هي الحمل الإضافي لـ API Gateway. فإذا كانت <code>IntegrationLatency</code> تساوي 50 مللي ثانية بينما <code>Latency</code> تساوي 200 مللي ثانية، فإن API Gateway يضيف 150 مللي ثانية — وقد يشير ذلك إلى بدء بارد أو حمل إضافي من التفويض.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تستخدم مقاييس API Gateway البُعد <code>ApiId</code> (المعرّف الفريد لواجهتك) بدلًا من اسم API. ويمكنك العثور على معرّف API باستخدام <code>aws apigatewayv2 get-apis --region us-east-1 --output json</code>.</p>
</blockquote>
<h3 id="dynamodb-awsdynamodb">DynamoDB (<code>AWS/DynamoDB</code>)</h3>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>ما يخبرك به</th>
<th>الإحصاءة التي تراقبها</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ConsumedReadCapacityUnits</code></td>
<td>معدّل النقل القرائي المستهلك</td>
<td><code>Sum</code> — مقدار سعة القراءة التي تستخدمها</td>
</tr>
<tr>
<td><code>ConsumedWriteCapacityUnits</code></td>
<td>معدّل النقل الكتابي المستهلك</td>
<td><code>Sum</code> — مقدار سعة الكتابة التي تستخدمها</td>
</tr>
<tr>
<td><code>ThrottledRequests</code></td>
<td>الطلبات المرفوضة بسبب حدود معدّل النقل</td>
<td><code>Sum</code> — يجب أن تكون صفرًا في الجداول عند الطلب</td>
</tr>
<tr>
<td><code>SuccessfulRequestLatency</code></td>
<td>الزمن الذي استغرقته DynamoDB لمعالجة طلب (بالملي ثانية)</td>
<td><code>Average</code> — DynamoDB سريعة؛ فإن ارتفع هذا فثمة خطب في نمط وصولك</td>
</tr>
<tr>
<td><code>SystemErrors</code></td>
<td>أخطاء DynamoDB الداخلية</td>
<td><code>Sum</code> — نادرة، لكنها تستحق المراقبة</td>
</tr>
</tbody>
</table>
<p>إذا كنت تستخدم وضع السعة عند الطلب (الذي أعددته في <a href="https://stevekinney.com/courses/aws/what-is-dynamodb">ما هي DynamoDB؟</a>)، فينبغي أن يبقى <code>ThrottledRequests</code> عند الصفر ما لم تكن تصل إلى حدود على مستوى الحساب.</p>
<h2 id="الاستعلام-عن-المقاييس-من-cli">الاستعلام عن المقاييس من CLI</h2>
<p>يمكنك سحب بيانات المقاييس مباشرة من سطر الأوامر باستخدام <code>aws cloudwatch get-metric-statistics</code>. وهذا مفيد للفحوص السريعة دون فتح لوحة التحكم.</p>
<p>احصل على عدد أخطاء Lambda للساعة الأخيرة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># macOS</span>
START=$(<span class="hljs-built_in">date</span> -v-1H -u +%Y-%m-%dT%H:%M:%SZ)
<span class="hljs-comment"># Linux</span>
START=$(<span class="hljs-built_in">date</span> -d <span class="hljs-string">&#x27;1 hour ago&#x27;</span> -u +%Y-%m-%dT%H:%M:%SZ)

aws cloudwatch get-metric-statistics \\
  --namespace AWS/Lambda \\
  --metric-name Errors \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --start-time <span class="hljs-variable">$START</span> \\
  --end-time $(<span class="hljs-built_in">date</span> -u +%Y-%m-%dT%H:%M:%SZ) \\
  --period 300 \\
  --statistics Sum \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يُرجع هذا نقاط بيانات مجمّعة في حزم مدتها 5 دقائق (300 ثانية):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Errors&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Datapoints&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T14:00:00+00:00&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Sum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Unit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Count&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T14:05:00+00:00&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Sum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2.0</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Unit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Count&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احصل على متوسط مدة Lambda للساعة الأخيرة:</p>
<pre><code class="language-bash">aws cloudwatch get-metric-statistics \\
  --namespace AWS/Lambda \\
  --metric-name Duration \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --start-time <span class="hljs-variable">$START</span> \\
  --end-time $(<span class="hljs-built_in">date</span> -u +%Y-%m-%dT%H:%M:%SZ) \\
  --period 300 \\
  --statistics Average Maximum \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمكنك طلب إحصاءات متعددة في استدعاء واحد بسردها بعد <code>--statistics</code>. فـ <code>Average Maximum</code> يمنحك المدة النموذجية والأسوأ في الاستجابة نفسها.</p>
</blockquote>
<h2 id="إنشاء-لوحة-معلومات-cloudwatch">إنشاء لوحة معلومات CloudWatch</h2>
<p><strong>لوحة المعلومات</strong> صفحة قابلة للتخصيص من الودجات (widgets) تعرض المقاييس. فبدلًا من تشغيل أوامر CLI كلما أردت فحص صحة تطبيقك، تبني لوحة معلومات مرة واحدة وتلقي عليها نظرة كلما احتجت.</p>
<h3 id="إنشاء-لوحة-المعلومات">إنشاء لوحة المعلومات</h3>
<p>تُعرَّف لوحات معلومات CloudWatch بصيغة JSON. وتحدّد كل ودجة المقاييس التي تُرسم بيانيًا وكيفية عرضها. وهذه لوحة معلومات بثلاث ودجات: أخطاء Lambda، ومدة Lambda، وزمن استجابة API Gateway.</p>
<pre><code class="language-bash">aws cloudwatch put-dashboard \\
  --dashboard-name my-frontend-app-dashboard \\
  --dashboard-body <span class="hljs-string">&#x27;{
    &quot;widgets&quot;: [
      {
        &quot;type&quot;: &quot;metric&quot;,
        &quot;x&quot;: 0,
        &quot;y&quot;: 0,
        &quot;width&quot;: 12,
        &quot;height&quot;: 6,
        &quot;properties&quot;: {
          &quot;title&quot;: &quot;Lambda Errors&quot;,
          &quot;metrics&quot;: [
            [&quot;AWS/Lambda&quot;, &quot;Errors&quot;, &quot;FunctionName&quot;, &quot;my-frontend-app-api&quot;, {&quot;stat&quot;: &quot;Sum&quot;, &quot;period&quot;: 300}]
          ],
          &quot;view&quot;: &quot;timeSeries&quot;,
          &quot;stacked&quot;: false,
          &quot;region&quot;: &quot;us-east-1&quot;
        }
      },
      {
        &quot;type&quot;: &quot;metric&quot;,
        &quot;x&quot;: 12,
        &quot;y&quot;: 0,
        &quot;width&quot;: 12,
        &quot;height&quot;: 6,
        &quot;properties&quot;: {
          &quot;title&quot;: &quot;Lambda Duration (ms)&quot;,
          &quot;metrics&quot;: [
            [&quot;AWS/Lambda&quot;, &quot;Duration&quot;, &quot;FunctionName&quot;, &quot;my-frontend-app-api&quot;, {&quot;stat&quot;: &quot;Average&quot;, &quot;period&quot;: 300}],
            [&quot;AWS/Lambda&quot;, &quot;Duration&quot;, &quot;FunctionName&quot;, &quot;my-frontend-app-api&quot;, {&quot;stat&quot;: &quot;p95&quot;, &quot;period&quot;: 300}]
          ],
          &quot;view&quot;: &quot;timeSeries&quot;,
          &quot;stacked&quot;: false,
          &quot;region&quot;: &quot;us-east-1&quot;
        }
      },
      {
        &quot;type&quot;: &quot;metric&quot;,
        &quot;x&quot;: 0,
        &quot;y&quot;: 6,
        &quot;width&quot;: 12,
        &quot;height&quot;: 6,
        &quot;properties&quot;: {
          &quot;title&quot;: &quot;API Gateway Latency (ms)&quot;,
          &quot;metrics&quot;: [
            [&quot;AWS/ApiGateway&quot;, &quot;Latency&quot;, &quot;ApiId&quot;, &quot;your-api-id&quot;, {&quot;stat&quot;: &quot;Average&quot;, &quot;period&quot;: 300}],
            [&quot;AWS/ApiGateway&quot;, &quot;Latency&quot;, &quot;ApiId&quot;, &quot;your-api-id&quot;, {&quot;stat&quot;: &quot;p95&quot;, &quot;period&quot;: 300}]
          ],
          &quot;view&quot;: &quot;timeSeries&quot;,
          &quot;stacked&quot;: false,
          &quot;region&quot;: &quot;us-east-1&quot;
        }
      },
      {
        &quot;type&quot;: &quot;metric&quot;,
        &quot;x&quot;: 12,
        &quot;y&quot;: 6,
        &quot;width&quot;: 12,
        &quot;height&quot;: 6,
        &quot;properties&quot;: {
          &quot;title&quot;: &quot;DynamoDB Throttled Requests&quot;,
          &quot;metrics&quot;: [
            [&quot;AWS/DynamoDB&quot;, &quot;ThrottledRequests&quot;, &quot;TableName&quot;, &quot;my-frontend-app-data&quot;, {&quot;stat&quot;: &quot;Sum&quot;, &quot;period&quot;: 300}]
          ],
          &quot;view&quot;: &quot;timeSeries&quot;,
          &quot;stacked&quot;: false,
          &quot;region&quot;: &quot;us-east-1&quot;
        }
      }
    ]
  }&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتحكم خاصيتا <code>x</code> و<code>y</code> في موضع الودجة على شبكة من 24 عمودًا. وتتحكم خاصيتا <code>width</code> و<code>height</code> في الحجم. وودجتان جنبًا إلى جنب بعرض 12 لكل منهما تملآن الصف كاملًا.</p>
<p>لعرض المئينات، يقبل JSON لوحة معلومات CloudWatch الصيغة المختصرة للإحصاءة مثل <code>&quot;stat&quot;: &quot;p95&quot;</code>. ولست بحاجة إلى كتابتها <code>p95.00</code>.</p>
<h3 id="التحقق-من-لوحة-المعلومات">التحقق من لوحة المعلومات</h3>
<pre><code class="language-bash">aws cloudwatch list-dashboards \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يمكنك أيضًا فتح لوحة تحكم CloudWatch في متصفحك، والانتقال إلى <strong>Dashboards</strong>، ورؤية <code>my-frontend-app-dashboard</code> مع عرض جميع الودجات الأربع بيانات حقيقية.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لوحات معلومات CloudWatch مجانية لأول ثلاث لوحات (حتى 50 مقياسًا لكل منها). وبعد ذلك، تكلّف كل لوحة 3 دولارات شهريًا. ولتطبيق واحد، لوحة واحدة بعدد قليل من الودجات هي كل ما تحتاجه.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">CloudWatchClient</span>,
  <span class="hljs-title class_">GetMetricStatisticsCommand</span>,
  <span class="hljs-title class_">PutDashboardCommand</span>,
  <span class="hljs-title class_">PutMetricDataCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-cloudwatch&#x27;</span>;

<span class="hljs-keyword">const</span> cloudwatch = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CloudWatchClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-comment">// Emit a custom metric from application code. This is how you get metrics</span>
<span class="hljs-comment">// for things CloudWatch doesn&#x27;t produce automatically (sign-ups, cart</span>
<span class="hljs-comment">// conversions, business KPIs).</span>
<span class="hljs-keyword">await</span> cloudwatch.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutMetricDataCommand</span>({
    <span class="hljs-title class_">Namespace</span>: <span class="hljs-string">&#x27;MyFrontendApp&#x27;</span>,
    <span class="hljs-title class_">MetricData</span>: [{ <span class="hljs-title class_">MetricName</span>: <span class="hljs-string">&#x27;SignUps&#x27;</span>, <span class="hljs-title class_">Value</span>: <span class="hljs-number">1</span>, <span class="hljs-title class_">Unit</span>: <span class="hljs-string">&#x27;Count&#x27;</span> }],
  }),
);

<span class="hljs-comment">// Read aggregated metrics back:</span>
<span class="hljs-keyword">const</span> stats = <span class="hljs-keyword">await</span> cloudwatch.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetMetricStatisticsCommand</span>({
    <span class="hljs-title class_">Namespace</span>: <span class="hljs-string">&#x27;AWS/Lambda&#x27;</span>,
    <span class="hljs-title class_">MetricName</span>: <span class="hljs-string">&#x27;Errors&#x27;</span>,
    <span class="hljs-title class_">Dimensions</span>: [{ <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;FunctionName&#x27;</span>, <span class="hljs-title class_">Value</span>: <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span> }],
    <span class="hljs-title class_">StartTime</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>),
    <span class="hljs-title class_">EndTime</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
    <span class="hljs-title class_">Period</span>: <span class="hljs-number">300</span>,
    <span class="hljs-title class_">Statistics</span>: [<span class="hljs-string">&#x27;Sum&#x27;</span>],
  }),
);

<span class="hljs-comment">// Create or overwrite a dashboard:</span>
<span class="hljs-keyword">await</span> cloudwatch.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutDashboardCommand</span>({
    <span class="hljs-title class_">DashboardName</span>: <span class="hljs-string">&#x27;my-frontend-app&#x27;</span>,
    <span class="hljs-title class_">DashboardBody</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">widgets</span>: [
        {
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;metric&#x27;</span>,
          <span class="hljs-attr">properties</span>: {
            <span class="hljs-attr">metrics</span>: [[<span class="hljs-string">&#x27;AWS/Lambda&#x27;</span>, <span class="hljs-string">&#x27;Errors&#x27;</span>, <span class="hljs-string">&#x27;FunctionName&#x27;</span>, <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span>]],
            <span class="hljs-attr">stat</span>: <span class="hljs-string">&#x27;Sum&#x27;</span>,
            <span class="hljs-attr">period</span>: <span class="hljs-number">60</span>,
            <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span>,
          },
        },
      ],
    }),
  }),
);
</code></pre>
<h2 id="اختيار-الإحصاءة-الصحيحة">اختيار الإحصاءة الصحيحة</h2>
<p>تدعم المقاييس إحصاءات متعددة، واختيار الإحصاءة الخاطئة يمنحك صورة مضللة.</p>
<ul>
<li><strong>Sum</strong>: العدد الإجمالي. استخدمها مع <code>Invocations</code> و<code>Errors</code> و<code>Throttles</code> و<code>Count</code>. «كم خطأ حدث في الساعة الأخيرة؟»</li>
<li><strong>Average</strong>: المتوسط الحسابي. استخدمها مع <code>Duration</code> و<code>Latency</code>. «ما زمن الاستجابة النموذجي؟» كن حذرًا — فالمتوسطات تخفي القيم الشاذة.</li>
<li><strong>Maximum</strong>: أسوأ حالة في الفترة. مفيدة لرصد حالات البدء البارد في <code>Duration</code>.</li>
<li><strong>p95 / p99</strong>: إحصاءات المئينات. «اكتملت 95% من الطلبات خلال X مللي ثانية.» وهذا مفيد دائمًا تقريبًا أكثر من Average لمقاييس زمن الاستجابة، لأنه يريك ما يعيشه أبطأ مستخدميك.</li>
<li><strong>SampleCount</strong>: عدد نقاط البيانات التي جُمّعت. مفيد للتحقق من أن دالتك تتلقى حركة مرور فعلًا.</li>
</ul>
<p>لزمن الاستجابة، ارسم دائمًا Average وp95 معًا. فإن كانا متقاربين، فأداؤك متسق. وإن كان p95 ثلاثة أضعاف المتوسط، فلديك قيم شاذة (غالبًا حالات بدء بارد) تستحق التحقيق.</p>
<p>يمكنك رؤية مقاييسك الآن ولديك لوحة معلومات. لكن لوحات المعلومات تتطلب منك أن تنظر إليها. في الدرس التالي، ستنشئ إنذارات تراقب هذه المقاييس نيابة عنك وترسل إشعارات بريد إلكتروني عندما يسوء شيء — لتكتشف المشكلات قبل مستخدميك.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>حين تنتهي من لوحة المعلومات، احذفها لتبقي مساحة عمل CloudWatch مرتبة:</p>
<pre><code class="language-bash">aws cloudwatch delete-dashboards \\
  --dashboard-names my-frontend-app-dashboard \\
  --region us-east-1
</code></pre>
<p>لوحات معلومات CloudWatch مجانية لأول ثلاث، لذا فالأمر ليس شاغلًا فاتوريًا على نطاق الدورة — لكن تنظيف ما تنشئه عادة جيدة.</p>
`,d={book:t,chapter:"aws",chapterTitle:s,slug:n,title:a,headings:o,html:e};export{t as book,c as chapter,s as chapterTitle,d as default,o as headings,e as html,n as slug,a as title};
