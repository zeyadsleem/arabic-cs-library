const s="kinney",l="aws",n="نشر تطبيقات الويب على AWS",a="cloudwatch-alarms-and-sns",t="الإنذارات والإشعارات باستخدام SNS",e=[{depth:2,id:"كيف-تعمل-الإنذارات",text:"كيف تعمل الإنذارات"},{depth:3,id:"حالات-الإنذار",text:"حالات الإنذار"},{depth:2,id:"إعداد-sns",text:"إعداد SNS"},{depth:3,id:"إنشاء-موضوع-sns",text:"إنشاء موضوع SNS"},{depth:3,id:"الاشتراك-ببريدك-الإلكتروني",text:"الاشتراك ببريدك الإلكتروني"},{depth:3,id:"التحقق-من-الاشتراك",text:"التحقق من الاشتراك"},{depth:2,id:"إنشاء-إنذار-لأخطاء-lambda",text:"إنشاء إنذار لأخطاء Lambda"},{depth:2,id:"إنشاء-إنذار-لمدة-تنفيذ-lambda",text:"إنشاء إنذار لمدة تنفيذ Lambda"},{depth:2,id:"إنشاء-إنذار-لأخطاء-5xx-في-api-gateway",text:"إنشاء إنذار لأخطاء 5XX في API Gateway"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"التحقق-من-إنذاراتك",text:"التحقق من إنذاراتك"},{depth:2,id:"اختبار-إنذار",text:"اختبار إنذار"},{depth:2,id:"اختيار-الحدود",text:"اختيار الحدود"}],o=`<p>لوحات المعلومات رائعة حين تنظر إليها بنشاط. أما الإنذارات فهي للحين الذي لا تنظر فيه. <strong>إنذار CloudWatch</strong> يراقب مقياسًا ويطلق إجراءً عندما يتجاوز ذلك المقياس حدًّا تحدّده أنت. والإجراء الأكثر شيوعًا: إرسال بريد إلكتروني إليك عبر <strong>SNS</strong> (خدمة الإشعارات البسيطة). تستيقظ على بريد يقول «ارتفع معدّل أخطاء Lambda عند الساعة 3 صباحًا» بدلًا من شكوى مستخدم عند الساعة 9 صباحًا.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من أوليات المراقبة أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">نظرة CloudWatch العامة</a> هي المرجع الرسمي.</p>
<p>إذا كنت قد استخدمت إشعارات النشر في Vercel أو تنبيهات فشل GitHub Actions، فهذا هو المفهوم نفسه — إلا أنك تحدّد بالضبط ما يعنيه «الفشل» وكيف تُبلَّغ به.</p>
<pre><code>flowchart LR
    Metric[&quot;CloudWatch metric&quot;] --&gt; Alarm[&quot;Alarm evaluates threshold&lt;br/&gt;period + evaluation windows&quot;]
    Alarm --&gt; State{&quot;Alarm state&quot;}
    State -- &quot;OK&quot; --&gt; Healthy[&quot;No action or OK notification&quot;]
    State -- &quot;ALARM&quot; --&gt; SNS[&quot;SNS topic&quot;]
    SNS --&gt; Email[&quot;Email notification&quot;]
    State -- &quot;INSUFFICIENT_DATA&quot; --&gt; Wait[&quot;Wait for more data&quot;]
</code></pre>
<h2 id="كيف-تعمل-الإنذارات">كيف تعمل الإنذارات</h2>
<p>يتكوّن الإنذار من ثلاثة عناصر:</p>
<ol>
<li><strong>مقياس تراقبه</strong> — مثل <code>Errors</code> في Lambda من أجل <code>my-frontend-app-api</code></li>
<li><strong>شرط</strong> — مثل «مجموع الأخطاء أكبر من 5»</li>
<li><strong>إجراء</strong> — مثل «أرسل إشعارًا إلى موضوع SNS هذا»</li>
</ol>
<p>تقيّم الإنذارات الشرط على نافذة زمنية قابلة للضبط. وتحدّد <strong>فترة</strong> (مدة كل نافذة تقييم) و<strong>فترات تقييم</strong> (عدد النوافذ المتتالية التي يجب أن تتجاوز الحد قبل أن ينطلق الإنذار). وهذا يمنع الارتفاعات العابرة من إيقاظك ليلًا.</p>
<h3 id="حالات-الإنذار">حالات الإنذار</h3>
<p>يكون كل إنذار في واحدة من ثلاث حالات في أي لحظة:</p>
<ul>
<li><strong>OK</strong>: المقياس ضمن الحد. كل شيء على ما يرام.</li>
<li><strong>ALARM</strong>: تجاوز المقياس الحد لعدد فترات التقييم المطلوب. وهناك ما يستدعي الانتباه.</li>
<li><strong>INSUFFICIENT_DATA</strong>: لا تملك CloudWatch بيانات كافية لتقييم الشرط. وهذه هي الحالة الابتدائية لكل إنذار جديد. وهي أيضًا الحالة التي يدخلها إنذارك عندما لا تكون دالتك قد استُدعيت مؤخرًا — فلا استدعاءات تعني لا نقاط بيانات.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يبدأ الإنذار الجديد في <code>INSUFFICIENT_DATA</code>، لا في <code>OK</code>. وهذا طبيعي. وبمجرد أن تتلقى دالتك حركة مرور وتملك CloudWatch نقاط بيانات كافية لتقييم الشرط، سينتقل الإنذار إلى <code>OK</code> (أو إلى <code>ALARM</code>، إن كان يومك سيئًا).</p>
</blockquote>
<p>في لوحة التحكم، تعرض صفحة <strong>Alarms</strong> إنذارك مع حالته الحالية وإعداد الإجراء ووقت آخر تحديث للحالة.</p>
<p><img src="/arabic-cs-library/images/kinney/e6c394d48a5a6861.webp" alt="صفحة CloudWatch Alarms وهي تعرض إنذارًا واحدًا باسم my-frontend-app-api-errors في حالة Insufficient data مع تمكين الإجراءات."></p>
<h2 id="إعداد-sns">إعداد SNS</h2>
<p>قبل إنشاء إنذار، تحتاج إلى مكان لإرسال الإشعارات إليه. <strong>SNS</strong> (خدمة الإشعارات البسيطة) هي خدمة المراسلة نشر/اشتراك في AWS. تُنشئ <strong>موضوعًا</strong> (قناة إشعارات)، وتشترك ببريدك الإلكتروني فيه، ثم توجّه إنذاراتك إلى ذلك الموضوع.</p>
<h3 id="إنشاء-موضوع-sns">إنشاء موضوع SNS</h3>
<pre><code class="language-bash">aws sns create-topic \\
  --name my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يُرجع هذا ARN الموضوع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TopicArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ ذلك ARN — ستستخدمه عند إنشاء الإنذارات.</p>
<h3 id="الاشتراك-ببريدك-الإلكتروني">الاشتراك ببريدك الإلكتروني</h3>
<pre><code class="language-bash">aws sns subscribe \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --protocol email \\
  --notification-endpoint your-email@example.com \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;SubscriptionArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pending confirmation&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p><strong>يجب</strong> أن تؤكّد الاشتراك. ترسل AWS رسالة تأكيد إلى العنوان الذي حدّدته. انقر الرابط في تلك الرسالة. وإلى أن تؤكّد، لن تسلّم SNS الإشعارات — فستنطلق إنذاراتك، لكنك لن ترى الرسائل أبدًا.</p>
</blockquote>
<h3 id="التحقق-من-الاشتراك">التحقق من الاشتراك</h3>
<p>بعد التأكيد، افحص حالة الاشتراك:</p>
<pre><code class="language-bash">aws sns list-subscriptions-by-topic \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن يكون <code>SubscriptionArn</code> الآن ARN حقيقيًا بدلًا من <code>pending confirmation</code>.</p>
<h2 id="إنشاء-إنذار-لأخطاء-lambda">إنشاء إنذار لأخطاء Lambda</h2>
<p>ينطلق هذا الإنذار عندما تنتج دالة Lambda أكثر من 5 أخطاء في فترة مدتها 5 دقائق، لفترتين متتاليتين.</p>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-errors \\
  --alarm-description <span class="hljs-string">&quot;Alarm when Lambda error count exceeds 5 in 5 minutes&quot;</span> \\
  --namespace AWS/Lambda \\
  --metric-name Errors \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --statistic Sum \\
  --period 300 \\
  --evaluation-periods 2 \\
  --threshold 5 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --ok-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لنفكّك ما يفعله كل معامل:</p>
<ul>
<li><strong><code>--period 300</code></strong>: كل نافذة تقييم مدتها 5 دقائق (300 ثانية).</li>
<li><strong><code>--evaluation-periods 2</code></strong>: يجب تجاوز الحد لفترتين متتاليتين (10 دقائق إجمالًا) قبل أن ينطلق الإنذار.</li>
<li><strong><code>--threshold 5</code></strong>: أكثر من 5 أخطاء في فترة واحدة يطلق تجاوزًا.</li>
<li><strong><code>--comparison-operator GreaterThanThreshold</code></strong>: ينطلق الإنذار عندما تكون القيمة <strong>أكبر من</strong> 5، لا مساوية لـ 5.</li>
<li><strong><code>--alarm-actions</code></strong>: موضوع SNS الذي يُبلَّغ عند انتقال الإنذار إلى <code>ALARM</code>.</li>
<li><strong><code>--ok-actions</code></strong>: موضوع SNS الذي يُبلَّغ عند عودة الإنذار إلى <code>OK</code>. وهذا اختياري لكنه مفيد — فأنت تريد معرفة متى تُحلّ المشكلة، لا متى تبدأ فقط.</li>
</ul>
<h2 id="إنشاء-إنذار-لمدة-تنفيذ-lambda">إنشاء إنذار لمدة تنفيذ Lambda</h2>
<p>ينطلق هذا الإنذار عندما يتجاوز متوسط مدة تنفيذ دالتك 3 ثوانٍ — وهي علامة على أن شيئًا يعمل ببطء، ربما بسبب البدء البارد (cold starts) أو خدمة لاحقة تستغرق وقتًا طويلًا.</p>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-duration \\
  --alarm-description <span class="hljs-string">&quot;Alarm when average Lambda duration exceeds 3 seconds&quot;</span> \\
  --namespace AWS/Lambda \\
  --metric-name Duration \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --statistic Average \\
  --period 300 \\
  --evaluation-periods 2 \\
  --threshold 3000 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لاحظ أن <code>Duration</code> يُقاس بالمللي ثانية، لذا فإن حدّ 3 ثوانٍ هو <code>3000</code>.</p>
<h2 id="إنشاء-إنذار-لأخطاء-5xx-في-api-gateway">إنشاء إنذار لأخطاء 5XX في API Gateway</h2>
<p>ينطلق هذا الإنذار عندما تُرجع واجهة API أخطاء خادم — أي أن دالة Lambda تتعطّل أو تنتهي مهلتها.</p>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-5xx \\
  --alarm-description <span class="hljs-string">&quot;Alarm when API Gateway 5XX error count exceeds 0&quot;</span> \\
  --namespace AWS/ApiGateway \\
  --metric-name 5XXError \\
  --dimensions Name=ApiId,Value=your-api-id \\
  --statistic Sum \\
  --period 300 \\
  --evaluation-periods 1 \\
  --threshold 0 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يستخدم هذا الإنذار فترة تقييم واحدة وحدًّا صفريًا — أي خطأ 5XX في أي نافذة مدتها 5 دقائق يطلقه فورًا. وأخطاء 5XX خطيرة بما يكفي لأن تريد معرفتها على الفور. (ثق بي في هذه.)</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا كانت واجهة API تتلقى حركة مرور غير متكررة، فستبقى الإنذارات غالبًا في <code>INSUFFICIENT_DATA</code> بدلًا من <code>OK</code>. أضف <code>--treat-missing-data notBreaching</code> إلى أي أمر <code>put-metric-alarm</code> لمعاملة الفترات الخالية من البيانات على أنها غير متجاوزة — وهذا يتجنّب انتقالات الحالة المزعجة في البيئات منخفضة الحركة وأثناء التطوير.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SNSClient</span>, <span class="hljs-title class_">CreateTopicCommand</span>, <span class="hljs-title class_">SubscribeCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-sns&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">CloudWatchClient</span>, <span class="hljs-title class_">PutMetricAlarmCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-cloudwatch&#x27;</span>;

<span class="hljs-keyword">const</span> sns = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SNSClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });
<span class="hljs-keyword">const</span> cloudwatch = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CloudWatchClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> topic = <span class="hljs-keyword">await</span> sns.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateTopicCommand</span>({ <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;my-frontend-app-alerts&#x27;</span> }));
<span class="hljs-keyword">await</span> sns.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">SubscribeCommand</span>({
    <span class="hljs-title class_">TopicArn</span>: topic.<span class="hljs-property">TopicArn</span>,
    <span class="hljs-title class_">Protocol</span>: <span class="hljs-string">&#x27;email&#x27;</span>,
    <span class="hljs-title class_">Endpoint</span>: <span class="hljs-string">&#x27;alerts@example.com&#x27;</span>,
  }),
);

<span class="hljs-keyword">await</span> cloudwatch.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutMetricAlarmCommand</span>({
    <span class="hljs-title class_">AlarmName</span>: <span class="hljs-string">&#x27;my-frontend-app-lambda-errors&#x27;</span>,
    <span class="hljs-title class_">AlarmDescription</span>: <span class="hljs-string">&#x27;Lambda function errors exceeded threshold&#x27;</span>,
    <span class="hljs-title class_">MetricName</span>: <span class="hljs-string">&#x27;Errors&#x27;</span>,
    <span class="hljs-title class_">Namespace</span>: <span class="hljs-string">&#x27;AWS/Lambda&#x27;</span>,
    <span class="hljs-title class_">Dimensions</span>: [{ <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;FunctionName&#x27;</span>, <span class="hljs-title class_">Value</span>: <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span> }],
    <span class="hljs-title class_">Statistic</span>: <span class="hljs-string">&#x27;Sum&#x27;</span>,
    <span class="hljs-title class_">Period</span>: <span class="hljs-number">60</span>,
    <span class="hljs-title class_">EvaluationPeriods</span>: <span class="hljs-number">1</span>,
    <span class="hljs-title class_">Threshold</span>: <span class="hljs-number">5</span>,
    <span class="hljs-title class_">ComparisonOperator</span>: <span class="hljs-string">&#x27;GreaterThanOrEqualToThreshold&#x27;</span>,
    <span class="hljs-title class_">AlarmActions</span>: [topic.<span class="hljs-property">TopicArn</span>!],
    <span class="hljs-title class_">TreatMissingData</span>: <span class="hljs-string">&#x27;notBreaching&#x27;</span>,
  }),
);
</code></pre>
<h2 id="التحقق-من-إنذاراتك">التحقق من إنذاراتك</h2>
<p>اسرد كل إنذاراتك:</p>
<pre><code class="language-bash">aws cloudwatch describe-alarms \\
  --alarm-name-prefix my-frontend-app \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يعرض هذا الحالة الحالية لكل إنذار وإعداده ووقت آخر تغيّر لحالته.</p>
<h2 id="اختبار-إنذار">اختبار إنذار</h2>
<p>يمكنك ضبط حالة إنذار يدويًا للتحقق من أن اشتراك SNS يعمل:</p>
<pre><code class="language-bash">aws cloudwatch set-alarm-state \\
  --alarm-name my-frontend-app-api-errors \\
  --state-value ALARM \\
  --state-reason <span class="hljs-string">&quot;Testing alarm notification&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>افحص بريدك الإلكتروني. ينبغي أن تتلقى إشعارًا من SNS. وبعد التحقق، سيعود الإنذار إلى حالته الفعلية في فترة التقييم التالية.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم <code>set-alarm-state</code> لاختبار مسار الإشعارات قبل أي حادث حقيقي. فاكتشاف أن اشتراك بريدك غير مؤكّد أثناء انقطاع فعلي تجربة سيئة.</p>
</blockquote>
<h2 id="اختيار-الحدود">اختيار الحدود</h2>
<p>تعتمد قيم الحد على تطبيقك. وهذه نقاط بداية لواجهة خلفية نموذجية لواجهة أمامية:</p>
<table>
<thead>
<tr>
<th>الإنذار</th>
<th>المقياس</th>
<th>الإحصاءة</th>
<th>الحد</th>
<th>الفترة</th>
<th>فترات التقييم</th>
</tr>
</thead>
<tbody>
<tr>
<td>معدّل الأخطاء</td>
<td><code>Errors</code></td>
<td><code>Sum</code></td>
<td>5</td>
<td>300s</td>
<td>2</td>
</tr>
<tr>
<td>المدة</td>
<td><code>Duration</code></td>
<td><code>Average</code></td>
<td>3000 ms</td>
<td>300s</td>
<td>2</td>
</tr>
<tr>
<td>أخطاء 5XX</td>
<td><code>5XXError</code></td>
<td><code>Sum</code></td>
<td>0</td>
<td>300s</td>
<td>1</td>
</tr>
<tr>
<td>عمليات التقييد</td>
<td><code>Throttles</code></td>
<td><code>Sum</code></td>
<td>0</td>
<td>300s</td>
<td>1</td>
</tr>
</tbody>
</table>
<p>ابدأ بهذه، وراقب كيف تتصرف مع حركة مرور حقيقية، ثم عدّل. فإن كان إنذار الأخطاء ينطلق عشر مرات يوميًا، فإما أن حدّك منخفض جدًا أو لديك مشكلة حقيقية تحتاج إلى إصلاح.</p>
<p>أصبح لديك الآن إنذارات تخبرك عندما يسوء شيء ما. لكن عندما ينطلق إنذار، تحتاج إلى معرفة <em>ما</em> الذي ساء. في الدرس التالي، ستتعلم تتبّع طلب واحد عبر API Gateway وLambda وDynamoDB باستخدام معرّفات الارتباط (correlation IDs) وCloudWatch Logs Insights — لتحوّل «شيء ما تعطّل» إلى «هذا الطلب المحدّد فشل في هذه الخطوة المحدّدة».</p>
`,p={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:o};export{s as book,l as chapter,n as chapterTitle,p as default,e as headings,o as html,a as slug,t as title};
