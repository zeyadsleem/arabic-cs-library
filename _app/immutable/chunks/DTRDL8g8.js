const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="cloudwatch-log-groups-and-structured-logging",t="مجموعات السجلات وتدفقاتها والتسجيل المهيكل",e=[{depth:2,id:"مجموعات-السجلات-وتدفقاتها",text:"مجموعات السجلات وتدفقاتها"},{depth:2,id:"إعدادات-الاحتفاظ",text:"إعدادات الاحتفاظ"},{depth:3,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"مشكلة-consolelog",text:"مشكلة console.log"},{depth:2,id:"تسجيل-json-المهيكل",text:"تسجيل JSON المهيكل"},{depth:2,id:"الاستعلام-باستخدام-cloudwatch-logs-insights",text:"الاستعلام باستخدام CloudWatch Logs Insights"},{depth:3,id:"الاستعلامات-الأساسية",text:"الاستعلامات الأساسية"},{depth:3,id:"استعلامات-التجميع",text:"استعلامات التجميع"},{depth:3,id:"تشغيل-استعلامات-insights-من-cli",text:"تشغيل استعلامات Insights من CLI"},{depth:3,id:"مرجع-صياغة-استعلامات-insights",text:"مرجع صياغة استعلامات Insights"},{depth:2,id:"التسجيل-المهيكل-مقابل-النص-العادي-العائد",text:"التسجيل المهيكل مقابل النص العادي: العائد"}],l=`<p>كل <code>console.log</code> كتبته في دوال Lambda لديك كان يصل إلى CloudWatch Logs منذ <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>. السجلات موجودة — لكن إن سبق أن حاولت العثور على خطأ محدّد في جدار نصي غير مهيكل، فأنت تعلم أن امتلاك السجلات والقدرة على استخدامها أمران مختلفان.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من واجهة خدمة التسجيل أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">نظرة CloudWatch العامة</a> هي المرجع الرسمي الذي يُستحسن إبقاؤه قريبًا.</p>
<p>في هذا الدرس، ستتعلم كيف تنظّم CloudWatch السجلات، وكيف تنتقل من <code>console.log('something happened')</code> إلى تسجيل JSON مهيكل، وكيف تستعلم عن سجلاتك باستخدام CloudWatch Logs Insights — لغة استعلام شبيهة بـ SQL تجعل سجلاتك قابلة للبحث فعلًا.</p>
<p><img src="/arabic-cs-library/images/kinney/21d6189da68b72ce.svg" alt="مخطط يوضح مجموعة سجلات Lambda تحتوي عدة تدفقات سجلات، ومدخلًا بصيغة JSON، واستعلام Logs Insights يقرأ الحقول المنظّمة."></p>
<h2 id="مجموعات-السجلات-وتدفقاتها">مجموعات السجلات وتدفقاتها</h2>
<p>تنظّم CloudWatch السجلات في مستويين: <strong>مجموعات السجلات</strong> (log groups) و<strong>تدفقات السجلات</strong> (log streams).</p>
<p><strong>مجموعة السجلات</strong> حاوية لسجلات مصدر واحد. تُنشئ Lambda مجموعة تلقائيًا لكل دالة، وفق اصطلاح التسمية <code>/aws/lambda/&lt;function-name&gt;</code>. وتحصل دالتك على <code>/aws/lambda/my-frontend-app-api</code>. ويمكن لـ API Gateway أيضًا أن يكتب إلى مجموعات السجلات إذا مكّنت تسجيل الوصول (وهو مشمول في <a href="https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains">مراحل API Gateway والنطاقات المخصّصة</a>).</p>
<p><strong>تدفق السجلات</strong> سلسلة من أحداث السجل داخل مجموعة سجلات. وتنشئ Lambda تدفق سجلات جديدًا لكل بيئة تنفيذ. فإذا توسّعت دالتك إلى ثلاث بيئات متزامنة، فسترى ثلاثة تدفقات سجلات. ويتضمن اسم كل تدفق التاريخ ومعرّفًا فريدًا — شيء مثل <code>2026/03/18/[$LATEST]a1b2c3d4e5f6</code>.</p>
<p>لرؤية مجموعات سجلاتك من CLI:</p>
<pre><code class="language-bash">aws logs describe-log-groups \\
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لسرد تدفقات السجلات داخل مجموعة:</p>
<pre><code class="language-bash">aws logs describe-log-streams \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --order-by LastEventTime \\
  --descending \\
  --<span class="hljs-built_in">limit</span> 5 \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="إعدادات-الاحتفاظ">إعدادات الاحتفاظ</h2>
<p>افتراضيًا، تحتفظ CloudWatch Logs بسجلاتك <strong>إلى الأبد</strong>. وهذا ليس ما تريده غالبًا. تتراكم السجلات، وتنمو تكاليف التخزين، ولا أحد يقرأ مخرجات تصحيح عمرها ستة أشهر.</p>
<p>اضبط سياسة احتفاظ على مجموعة سجلاتك:</p>
<pre><code class="language-bash">aws logs put-retention-policy \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --retention-in-days 30 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تشمل قيم الاحتفاظ الصالحة 1 و3 و5 و7 و14 و30 و60 و90 و120 و150 و180 و365 و400 و545 و731 و1096 و1827 و2192 و2557 و2922 و3288 و3653 يومًا. وللتطوير، 30 يومًا معقولة. وللإنتاج، تمنحك 90 يومًا تاريخًا كافيًا للتحقيق في الحوادث دون دفع تكلفة تخزين سنوات.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا لم تضبط سياسة احتفاظ، فستنمو تكاليف تخزين سجلاتك بلا حد. وهذا أحد افتراضات AWS التي تكلّفك المال بصمت مع مرور الوقت.</p>
</blockquote>
<p>يعيش الاحتفاظ على مجموعة السجلات، لا على الدالة. فإذا حذفت الدالة وأعدت نشرها، تنشئ Lambda مجموعة سجلات جديدة باحتفاظ لا نهائي — ويضيع إعداد الاحتفاظ لديك. لذلك كوّد الاحتفاظ في البنية التحتية كشيفرة (IaC) لديك (فبنية <code>Function</code> في CDK تكشف <code>logRetention</code>)، أو أنشئ مجموعة السجلات مسبقًا مع ضبط الاحتفاظ قبل نشر الدالة.</p>
<h3 id="باستخدام-sdk">باستخدام SDK</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">CloudWatchLogsClient</span>,
  <span class="hljs-title class_">PutRetentionPolicyCommand</span>,
  <span class="hljs-title class_">DescribeLogGroupsCommand</span>,
  <span class="hljs-title class_">StartQueryCommand</span>,
  <span class="hljs-title class_">GetQueryResultsCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-cloudwatch-logs&#x27;</span>;

<span class="hljs-keyword">const</span> logs = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CloudWatchLogsClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">await</span> logs.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutRetentionPolicyCommand</span>({
    <span class="hljs-attr">logGroupName</span>: <span class="hljs-string">&#x27;/aws/lambda/my-frontend-app-api&#x27;</span>,
    <span class="hljs-attr">retentionInDays</span>: <span class="hljs-number">30</span>,
  }),
);

<span class="hljs-comment">// Programmatic Insights query — useful for building small status pages</span>
<span class="hljs-comment">// or dashboards outside the AWS console.</span>
<span class="hljs-keyword">const</span> started = <span class="hljs-keyword">await</span> logs.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">StartQueryCommand</span>({
    <span class="hljs-attr">logGroupName</span>: <span class="hljs-string">&#x27;/aws/lambda/my-frontend-app-api&#x27;</span>,
    <span class="hljs-attr">startTime</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">endTime</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">queryString</span>: <span class="hljs-string">&#x27;fields @timestamp, @message | filter level = &quot;ERROR&quot; | limit 20&#x27;</span>,
  }),
);

<span class="hljs-comment">// Poll for completion (StartQuery is async):</span>
<span class="hljs-keyword">let</span> result;
<span class="hljs-keyword">do</span> {
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(r, <span class="hljs-number">500</span>));
  result = <span class="hljs-keyword">await</span> logs.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">GetQueryResultsCommand</span>({ <span class="hljs-attr">queryId</span>: started.<span class="hljs-property">queryId</span> }));
} <span class="hljs-keyword">while</span> (result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;Running&#x27;</span> || result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;Scheduled&#x27;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(result.<span class="hljs-property">results</span>);
</code></pre>
<h2 id="مشكلة-consolelog">مشكلة <code>console.log</code></h2>
<p>هكذا يسجّل معظم المطورين في دوال Lambda:</p>
<pre><code class="language-typescript"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Processing request for user:&#x27;</span>, userId);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Database query took&#x27;</span>, duration, <span class="hljs-string">&#x27;ms&#x27;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Error:&#x27;</span>, error.<span class="hljs-property">message</span>);
</code></pre>
<p>هذا يعمل. يمكنك قراءته في CloudWatch. لكن حين تكون لديك آلاف إدخالات السجل من مئات الاستدعاءات، فإن البحث عن «كل أخطاء المستخدم abc-123» يعني التمرير عبر نص غير مهيكل والأمل في أن تلتقطه عيناك.</p>
<p>المشكلة الجوهرية: يُنتج <code>console.log</code> سلاسل نصية. والسلاسل النصية يصعب تصفيتها وتجميعها والاستعلام عنها برمجيًا.</p>
<h2 id="تسجيل-json-المهيكل">تسجيل JSON المهيكل</h2>
<p><strong>التسجيل المهيكل</strong> (structured logging) يعني كتابة إدخالات السجل كائنات JSON بدلًا من سلاسل نصية عادية. ويمكن لـ CloudWatch Logs Insights تحليل JSON تلقائيًا، ما يعني أن كل حقل في JSON يصبح عمودًا قابلًا للبحث والتصفية.</p>
<p>هكذا يبدو التسجيل المهيكل عمليًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LogEntry</span> {
  <span class="hljs-attr">level</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">requestId</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">userId</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">duration</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">unknown</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">log</span>(<span class="hljs-params"><span class="hljs-attr">entry</span>: <span class="hljs-title class_">LogEntry</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(entry));
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> requestId = event.<span class="hljs-property">requestContext</span>?.<span class="hljs-property">requestId</span> ?? <span class="hljs-string">&#x27;unknown&#x27;</span>;
  <span class="hljs-keyword">const</span> userId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">userId</span>;

  <span class="hljs-title function_">log</span>({
    <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;INFO&#x27;</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Request received&#x27;</span>,
    requestId,
    userId,
    <span class="hljs-attr">path</span>: event.<span class="hljs-property">rawPath</span>,
    <span class="hljs-attr">method</span>: event.<span class="hljs-property">requestContext</span>?.<span class="hljs-property">http</span>?.<span class="hljs-property">method</span>,
  });

  <span class="hljs-keyword">const</span> start = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// Your business logic here</span>
    <span class="hljs-keyword">const</span> result = { <span class="hljs-attr">greeting</span>: <span class="hljs-string">\`Hello, <span class="hljs-subst">\${userId ?? <span class="hljs-string">&#x27;World&#x27;</span>}</span>!\`</span> };
    <span class="hljs-keyword">const</span> duration = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - start;

    <span class="hljs-title function_">log</span>({
      <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;INFO&#x27;</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Request completed&#x27;</span>,
      requestId,
      userId,
      duration,
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    });

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result),
    };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">const</span> duration = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - start;

    <span class="hljs-title function_">log</span>({
      <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;ERROR&#x27;</span>,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Request failed&#x27;</span>,
      requestId,
      userId,
      duration,
      <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-title class_">String</span>(error),
    });

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Internal server error&#x27;</span> }),
    };
  }
};
</code></pre>
<p><em>ملاحظة:</em> يحلّل CloudWatch Logs Insights JSON تلقائيًا، ما يجعل كل حقل قابلًا للاستعلام.</p>
<p>الفرق الجوهري: بدلًا من <code>console.log('Error:', error.message)</code>، تكتب <code>console.log(JSON.stringify({ level: 'ERROR', message: 'Request failed', error: error.message }))</code>. كل إدخال سجل كائن JSON من سطر واحد يمكن لـ CloudWatch تحليله وفهرسته.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لست بحاجة إلى مكتبة تسجيل. فدالة مساعدة بسيطة باسم <code>log</code> تستدعي <code>console.log(JSON.stringify(entry))</code> هي كل ما تحتاجه في Lambda. ومكتبات مثل <code>pino</code> أو <code>winston</code> تضيف ميزات لا تحتاجها عمومًا في سياق بلا خوادم — فالمبتغى هو مخرجات JSON مهيكلة، و<code>JSON.stringify</code> توصلك إلى ذلك.</p>
</blockquote>
<h2 id="الاستعلام-باستخدام-cloudwatch-logs-insights">الاستعلام باستخدام CloudWatch Logs Insights</h2>
<p><strong>CloudWatch Logs Insights</strong> لغة استعلام للبحث في بيانات السجلات وتحليلها. فإن كنت قد استخدمت SQL، فستبدو الصياغة مألوفة. وإن كنت قد استخدمت أدوات مطوّري المتصفح لتصفية مخرجات وحدة التحكم، فهذه هي النسخة الصناعية القوية.</p>
<h3 id="الاستعلامات-الأساسية">الاستعلامات الأساسية</h3>
<p>اعثر على أحدث 25 إدخال سجل:</p>
<pre><code>fields @timestamp, @message
| sort @timestamp desc
| limit 25
</code></pre>
<p>صفِّ الأخطاء فقط (بافتراض تسجيل JSON المهيكل):</p>
<pre><code>fields @timestamp, level, message, error, requestId
| filter level = &quot;ERROR&quot;
| sort @timestamp desc
| limit 50
</code></pre>
<p>اعثر على كل طلبات مستخدم محدّد:</p>
<pre><code>fields @timestamp, level, message, userId, duration
| filter userId = &quot;abc-123&quot;
| sort @timestamp desc
</code></pre>
<h3 id="استعلامات-التجميع">استعلامات التجميع</h3>
<p>احسب الأخطاء لكل ساعة:</p>
<pre><code>filter level = &quot;ERROR&quot;
| stats count(*) as errorCount by bin(1h)
| sort errorCount desc
</code></pre>
<p>احصل على متوسط مدة الطلب والمئين 95:</p>
<pre><code>filter level = &quot;INFO&quot; and message = &quot;Request completed&quot;
| stats avg(duration) as avgDuration,
        pct(duration, 95) as p95Duration
  by bin(5m)
</code></pre>
<p>اعثر على أبطأ الطلبات:</p>
<pre><code>filter level = &quot;INFO&quot; and message = &quot;Request completed&quot;
| sort duration desc
| limit 10
</code></pre>
<h3 id="تشغيل-استعلامات-insights-من-cli">تشغيل استعلامات Insights من CLI</h3>
<p>يمكنك تشغيل استعلامات Insights من سطر الأوامر باستخدام <code>aws logs start-query</code> و<code>aws logs get-query-results</code>. يعمل الاستعلام بشكل غير متزامن — فتبدأه، وتحصل على معرّف استعلام، ثم تستعلم عن النتائج.</p>
<pre><code class="language-bash"><span class="hljs-comment"># macOS</span>
aws logs start-query \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --start-time $(<span class="hljs-built_in">date</span> -v-1H +%s) \\
  --end-time $(<span class="hljs-built_in">date</span> +%s) \\
  --query-string <span class="hljs-string">&#x27;fields @timestamp, level, message, duration | filter level = &quot;ERROR&quot; | sort @timestamp desc | limit 20&#x27;</span> \\
  --region us-east-1 \\
  --output json

<span class="hljs-comment"># Linux</span>
aws logs start-query \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --start-time $(<span class="hljs-built_in">date</span> -d <span class="hljs-string">&#x27;1 hour ago&#x27;</span> +%s) \\
  --end-time $(<span class="hljs-built_in">date</span> +%s) \\
  --query-string <span class="hljs-string">&#x27;fields @timestamp, level, message, duration | filter level = &quot;ERROR&quot; | sort @timestamp desc | limit 20&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يُرجع هذا معرّف استعلام:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;queryId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-5678-90ab-cdef-example11111&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>اجلب النتائج:</p>
<pre><code class="language-bash">aws logs get-query-results \\
  --query-id <span class="hljs-string">&quot;a1b2c3d4-5678-90ab-cdef-example11111&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يتوقع المعاملان <code>--start-time</code> و<code>--end-time</code> طوابع زمنية بنظام epoch (الثواني منذ 1 يناير 1970). على macOS، يعطيك <code>date -v-1H +%s</code> «قبل ساعة» كطابع زمني بنظام epoch. وعلى Linux، استخدم <code>date -d '1 hour ago' +%s</code>.</p>
</blockquote>
<h3 id="مرجع-صياغة-استعلامات-insights">مرجع صياغة استعلامات Insights</h3>
<table>
<thead>
<tr>
<th>الأمر</th>
<th>الغرض</th>
<th>مثال</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>fields</code></td>
<td>اختيار الحقول التي تُعرض</td>
<td><code>fields @timestamp, level, message</code></td>
</tr>
<tr>
<td><code>filter</code></td>
<td>الإبقاء على السجلات المطابقة فقط</td>
<td><code>filter level = &quot;ERROR&quot;</code></td>
</tr>
<tr>
<td><code>stats</code></td>
<td>تجميع البيانات</td>
<td><code>stats count(*) by level</code></td>
</tr>
<tr>
<td><code>sort</code></td>
<td>ترتيب النتائج</td>
<td><code>sort @timestamp desc</code></td>
</tr>
<tr>
<td><code>limit</code></td>
<td>تحديد الحد الأقصى لعدد النتائج</td>
<td><code>limit 25</code></td>
</tr>
<tr>
<td><code>parse</code></td>
<td>استخراج حقول من نص غير مهيكل</td>
<td><code>parse @message &quot;User * performed *&quot; as user, action</code></td>
</tr>
</tbody>
</table>
<p>تشير البادئة <code>@</code> إلى حقول نظام تضيفها CloudWatch تلقائيًا: <code>@timestamp</code> و<code>@message</code> و<code>@logStream</code> و<code>@log</code>. أما حقول JSON المهيكلة لديك (مثل <code>level</code> و<code>requestId</code> و<code>duration</code>) فتُشار إليها دون البادئة <code>@</code>.</p>
<h2 id="التسجيل-المهيكل-مقابل-النص-العادي-العائد">التسجيل المهيكل مقابل النص العادي: العائد</h2>
<p>إليك سيناريو التصحيح نفسه بالطريقتين.</p>
<p><strong>سجلات نصية عادية</strong>: «اعثر على كل الطلبات الفاشلة للمستخدم abc-123 في الساعة الأخيرة». تفتح مجموعة السجلات، وتتمرّر عبر عشرات التدفقات، وتضغط <code>Ctrl+F</code> بحثًا عن «abc-123»، وتأمل أن تكون رسالة الخطأ قريبة من معرّف المستخدم في مخرجات السجل.</p>
<p><strong>سجلات JSON مهيكلة</strong>: تشغّل استعلام Insights:</p>
<pre><code>fields @timestamp, message, error, duration
| filter level = &quot;ERROR&quot; and userId = &quot;abc-123&quot;
| sort @timestamp desc
</code></pre>
<p>تظهر النتائج في ثوانٍ، مع استخراج كل حقل بعناية. وترى رسالة الخطأ، ومدة الطلب، والطابع الزمني لكل فشل. لا تمرير، ولا تخمين.</p>
<p>الدقائق الخمس التي تقضيها في الانتقال إلى التسجيل المهيكل تسدّد تكلفتها أول مرة تصحّح فيها مشكلة في الإنتاج عند الساعة 11 مساءً. لقد تعلمت هذا بالطريقة الصعبة — لا شيء يضاهي التمرير عبر نص غير مهيكل في منتصف الليل وأنت تتمنى لو أنفقت تلك الدقائق الخمس مبكرًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت أغلفة التسجيل المهيكل دون كتابتها بنفسك، فإن <strong>AWS Lambda Powertools for TypeScript</strong> (<code>@aws-lambda-powertools/logger</code> و<code>metrics</code> و<code>tracer</code>) تتعامل مع معرّفات الارتباط وتنسيق سجلات JSON وإصدار المقاييس المخصّصة ببضعة أسطر من الإعداد. وهي مُدارة من AWS والمعيار الفعلي في دوال Lambda المكتوبة بـ TypeScript في الإنتاج.</p>
</blockquote>
<p>الآن وقد أصبحت سجلاتك مهيكلة وقابلة للاستعلام، حان وقت النظر إلى الجانب الآخر من CloudWatch: المقاييس التي تنشرها Lambda وAPI Gateway وDynamoDB تلقائيًا. في الدرس التالي، ستبني لوحة معلومات تمنحك رؤية واحدة لصحة تطبيقك.</p>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:l};export{s as book,p as chapter,n as chapterTitle,o as default,e as headings,l as html,a as slug,t as title};
