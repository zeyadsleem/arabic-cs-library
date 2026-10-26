const s="kinney",l="aws",a="نشر تطبيقات الويب على AWS",n="cloudwatch-alarms-solution",t="الحل",p=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"إنشاء-موضوع-sns",text:"إنشاء موضوع SNS"},{depth:3,id:"التحقق",text:"التحقق"},{depth:2,id:"الاشتراك-ببريدك-الإلكتروني",text:"الاشتراك ببريدك الإلكتروني"},{depth:2,id:"إنشاء-إنذار-عدد-الأخطاء",text:"إنشاء إنذار عدد الأخطاء"},{depth:2,id:"إنشاء-إنذار-المدة",text:"إنشاء إنذار المدة"},{depth:2,id:"اختبار-إنذار-الأخطاء",text:"اختبار إنذار الأخطاء"},{depth:2,id:"إطلاق-إنذار-حقيقي-اختياري",text:"إطلاق إنذار حقيقي (اختياري)"},{depth:3,id:"نشر-معالج-فاشل",text:"نشر معالج فاشل"},{depth:3,id:"الاستدعاء-المتكرر-لتوليد-أخطاء",text:"الاستدعاء المتكرر لتوليد أخطاء"},{depth:3,id:"انتظار-الإنذار",text:"انتظار الإنذار"},{depth:3,id:"إعادة-نشر-المعالج-العامل",text:"إعادة نشر المعالج العامل"},{depth:2,id:"سرد-كل-الإنذارات",text:"سرد كل الإنذارات"},{depth:2,id:"هدف-إضافي-إنذار-5xx-في-api-gateway",text:"هدف إضافي: إنذار 5XX في API Gateway"},{depth:2,id:"هدف-إضافي-إضافة-إجراءات-ok-إلى-إنذار-المدة",text:"هدف إضافي: إضافة إجراءات OK إلى إنذار المدة"},{depth:2,id:"هدف-إضافي-سجل-الإنذار",text:"هدف إضافي: سجل الإنذار"},{depth:2,id:"التنظيف",text:"التنظيف"}],o=`<p>هذا هو الحل الكامل لكل خطوة، بما في ذلك كل أوامر CLI والمخرجات المتوقعة في كل مرحلة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت إبقاء نسخة AWS من تدفّق الإنذار مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">نظرة CloudWatch العامة</a> قريبة. فهي أسرع طريقة للتحقق من تسميات لوحة التحكم ومصطلحات الإنذار عندما تتغيّر الواجهة.</p>
</blockquote>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>تفصل SNS تسليم الإشعارات عن تعريفات الإنذارات، فيمكن لعدة إنذارات أن تتفرّع إلى مسار تنبيه واحد دون تكرار الإعداد.</li>
<li>لا تهم حدود الإنذار إلا إذا كانت تراقب المقياس والإحصاءة والأبعاد الصحيحة، ولهذا يحظى ربط المقياس بالعناية نفسها التي تحظى بها قيمة الحد.</li>
<li>فرض حالة إنذار هو أسرع طريقة للتحقق من مسار الإشعارات قبل أن تثق به أثناء انقطاع حقيقي.</li>
</ul>
<h2 id="إنشاء-موضوع-sns">إنشاء موضوع SNS</h2>
<pre><code class="language-bash">aws sns create-topic \\
  --name my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TopicArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="التحقق">التحقق</h3>
<pre><code class="language-bash">aws sns list-topics \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن المخرجات موضوعك في مصفوفة <code>Topics</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Topics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;TopicArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="الاشتراك-ببريدك-الإلكتروني">الاشتراك ببريدك الإلكتروني</h2>
<pre><code class="language-bash">aws sns subscribe \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --protocol email \\
  --notification-endpoint your-email@example.com \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;SubscriptionArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pending confirmation&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>افحص بريدك الإلكتروني وانقر رابط التأكيد. ثم تحقّق:</p>
<pre><code class="language-bash">aws sns list-subscriptions-by-topic \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة بعد التأكيد:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Subscriptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;SubscriptionArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts:a1b2c3d4-5678-90ab-cdef-example11111&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Owner&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;123456789012&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Protocol&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;email&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Endpoint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;your-email@example.com&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;TopicArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أصبح <code>SubscriptionArn</code> ARN حقيقيًا الآن، وليس <code>pending confirmation</code>.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا كان <code>SubscriptionArn</code> لا يزال يعرض <code>pending confirmation</code>، فأنت لم تنقر رابط التأكيد في البريد. افحص مجلد الرسائل غير المرغوب فيها. لن تسلّم SNS إشعارات الإنذار حتى يُؤكَّد الاشتراك.</p>
</blockquote>
<h2 id="إنشاء-إنذار-عدد-الأخطاء">إنشاء إنذار عدد الأخطاء</h2>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-error-count \\
  --alarm-description <span class="hljs-string">&quot;Alarm when Lambda error count exceeds 3 in 5 minutes&quot;</span> \\
  --namespace AWS/Lambda \\
  --metric-name Errors \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --statistic Sum \\
  --period 300 \\
  --evaluation-periods 2 \\
  --threshold 3 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --ok-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لا ينتج هذا الأمر أي مخرجات عند النجاح. تحقّق باستخدام:</p>
<pre><code class="language-bash">aws cloudwatch describe-alarms \\
  --alarm-names my-frontend-app-api-error-count \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة (الحقول ذات الصلة):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;MetricAlarms&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AlarmName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api-error-count&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AlarmDescription&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Alarm when Lambda error count exceeds 3 in 5 minutes&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StateValue&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;INSUFFICIENT_DATA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;MetricName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Errors&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Namespace&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWS/Lambda&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Statistic&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Sum&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Dimensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;FunctionName&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Period&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">300</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;EvaluationPeriods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Threshold&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3.0</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ComparisonOperator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GreaterThanThreshold&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AlarmActions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;OKActions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>قيمة <code>StateValue</code> وهي <code>INSUFFICIENT_DATA</code> متوقعة لإنذار جديد — فـ CloudWatch لم تقيّمه بعد.</p>
<h2 id="إنشاء-إنذار-المدة">إنشاء إنذار المدة</h2>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-high-duration \\
  --alarm-description <span class="hljs-string">&quot;Alarm when average Lambda duration exceeds 2 seconds&quot;</span> \\
  --namespace AWS/Lambda \\
  --metric-name Duration \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --statistic Average \\
  --period 300 \\
  --evaluation-periods 2 \\
  --threshold 2000 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تحقّق:</p>
<pre><code class="language-bash">aws cloudwatch describe-alarms \\
  --alarm-names my-frontend-app-api-high-duration \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة (الحقول ذات الصلة):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;MetricAlarms&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AlarmName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api-high-duration&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AlarmDescription&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Alarm when average Lambda duration exceeds 2 seconds&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StateValue&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;INSUFFICIENT_DATA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;MetricName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Duration&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Namespace&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWS/Lambda&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Statistic&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Average&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Dimensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;FunctionName&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Period&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">300</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;EvaluationPeriods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Threshold&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2000.0</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ComparisonOperator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GreaterThanThreshold&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AlarmActions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يحتوي هذا الإنذار على <code>AlarmActions</code> فقط (دون <code>OKActions</code>). وإضافة إجراءات OK هي أحد الأهداف الإضافية.</p>
<h2 id="اختبار-إنذار-الأخطاء">اختبار إنذار الأخطاء</h2>
<p>افرض على الإنذار الانتقال إلى الحالة <code>ALARM</code>:</p>
<pre><code class="language-bash">aws cloudwatch set-alarm-state \\
  --alarm-name my-frontend-app-api-error-count \\
  --state-value ALARM \\
  --state-reason <span class="hljs-string">&quot;Testing alarm notification pipeline&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لا ينتج هذا الأمر أي مخرجات عند النجاح. افحص بريدك الإلكتروني — ينبغي أن تتلقى إشعارًا من <code>AWS Notifications</code> يتضمن تفاصيل الإنذار:</p>
<ul>
<li><strong>اسم الإنذار</strong>: <code>my-frontend-app-api-error-count</code></li>
<li><strong>الحالة الجديدة</strong>: <code>ALARM</code></li>
<li><strong>السبب</strong>: <code>Testing alarm notification pipeline</code></li>
<li><strong>وقت تغيّر الحالة</strong>: الطابع الزمني الذي شغّلت فيه الأمر</li>
</ul>
<p>سيعود الإنذار إلى حالته الفعلية (<code>INSUFFICIENT_DATA</code> أو <code>OK</code>) في فترة التقييم التالية (خلال 5 دقائق).</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا لم تتلقَّ البريد، فافحص ثلاثة أمور: (1) أن اشتراك SNS مؤكّد، (2) أن البريد ليس في مجلد الرسائل غير المرغوب فيها، (3) أن ARN في <code>--alarm-actions</code> يطابق ARN موضوع SNS لديك تمامًا.</p>
</blockquote>
<h2 id="إطلاق-إنذار-حقيقي-اختياري">إطلاق إنذار حقيقي (اختياري)</h2>
<h3 id="نشر-معالج-فاشل">نشر معالج فاشل</h3>
<p>أنشئ ملفًا باسم <code>failing-handler.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Intentional error to trigger CloudWatch alarm&#x27;</span>);
};
</code></pre>
<p>استبدل محتوى <code>src/handler.ts</code> بشيفرة المعالج الفاشل أعلاه، ثم ابنِ الحزمة وغلّفها وانشر:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..

aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="الاستدعاء-المتكرر-لتوليد-أخطاء">الاستدعاء المتكرر لتوليد أخطاء</h3>
<pre><code class="language-bash"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> {1..5}; <span class="hljs-keyword">do</span>
  aws lambda invoke \\
    --function-name my-frontend-app-api \\
    --cli-binary-format raw-in-base64-out \\
    --payload <span class="hljs-string">&#x27;{}&#x27;</span> \\
    --region us-east-1 \\
    --output json \\
    /tmp/response-<span class="hljs-variable">$i</span>.json
  <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Invocation <span class="hljs-variable">$i</span> complete&quot;</span>
<span class="hljs-keyword">done</span>
</code></pre>
<p>سيُرجع كل استدعاء حقل <code>FunctionError</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;StatusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;FunctionError&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Unhandled&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ExecutedVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$LATEST&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تشير القيمة <code>FunctionError: &quot;Unhandled&quot;</code> إلى أن الدالة أطلقت استثناءً غير معالَج. ومع ذلك تُرجع Lambda <code>StatusCode: 200</code> على مستوى الاستدعاء — فقيمة 200 تعني أن Lambda <em>استدعت</em> الدالة بنجاح، لا أن الدالة نجحت.</p>
<h3 id="انتظار-الإنذار">انتظار الإنذار</h3>
<p>الإنذار مهيّأ بفترة مدتها 5 دقائق وفترتَي تقييم، لذا تحتاج إلى انتظار حتى 10 دقائق حتى ينتقل الإنذار من <code>INSUFFICIENT_DATA</code> إلى <code>ALARM</code>. يمكنك مراقبة الحالة:</p>
<pre><code class="language-bash">aws cloudwatch describe-alarms \\
  --alarm-names my-frontend-app-api-error-count \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&#x27;MetricAlarms[0].{State:StateValue,Reason:StateReason}&#x27;</span>
</code></pre>
<p>بمجرد انطلاق الإنذار، ستتلقى إشعار بريد إلكتروني.</p>
<h3 id="إعادة-نشر-المعالج-العامل">إعادة نشر المعالج العامل</h3>
<p>لا تترك الدالة المعطّلة منشورة. أعد نشر معالجك العامل الأصلي:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..

aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>بعد بضع استدعاءات ناجحة (أو فترة بلا أخطاء)، ينتقل الإنذار عائدًا إلى <code>OK</code> وتتلقى إشعارًا آخر.</p>
<h2 id="سرد-كل-الإنذارات">سرد كل الإنذارات</h2>
<pre><code class="language-bash">aws cloudwatch describe-alarms \\
  --alarm-name-prefix my-frontend-app \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تُظهر المخرجات المتوقعة كلا الإنذارين:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;MetricAlarms&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AlarmName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api-error-count&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;MetricName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Errors&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Statistic&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Sum&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Threshold&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3.0</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ComparisonOperator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GreaterThanThreshold&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Period&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">300</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;EvaluationPeriods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AlarmName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api-high-duration&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;MetricName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Duration&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Statistic&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Average&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Threshold&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2000.0</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ComparisonOperator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GreaterThanThreshold&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Period&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">300</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;EvaluationPeriods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="هدف-إضافي-إنذار-5xx-في-api-gateway">هدف إضافي: إنذار 5XX في API Gateway</h2>
<p>اعثر على معرّف API الخاص بـ API Gateway:</p>
<pre><code class="language-bash">aws apigatewayv2 get-apis \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&#x27;Items[?Name==\`my-frontend-app-api\`].ApiId&#x27;</span>
</code></pre>
<p>أنشئ الإنذار:</p>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-5xx \\
  --alarm-description <span class="hljs-string">&quot;Alarm when API Gateway returns any 5XX error&quot;</span> \\
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
<p>يستخدم هذا الإنذار فترة تقييم واحدة وحدًّا صفريًا — أي خطأ 5XX يطلقه فورًا.</p>
<h2 id="هدف-إضافي-إضافة-إجراءات-ok-إلى-إنذار-المدة">هدف إضافي: إضافة إجراءات OK إلى إنذار المدة</h2>
<p>أعد تشغيل <code>put-metric-alarm</code> بالمعاملات نفسها مع <code>--ok-actions</code>:</p>
<pre><code class="language-bash">aws cloudwatch put-metric-alarm \\
  --alarm-name my-frontend-app-api-high-duration \\
  --alarm-description <span class="hljs-string">&quot;Alarm when average Lambda duration exceeds 2 seconds&quot;</span> \\
  --namespace AWS/Lambda \\
  --metric-name Duration \\
  --dimensions Name=FunctionName,Value=my-frontend-app-api \\
  --statistic Average \\
  --period 300 \\
  --evaluation-periods 2 \\
  --threshold 2000 \\
  --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --ok-actions arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يحدّث <code>put-metric-alarm</code> إنذارًا موجودًا إذا كان هناك إنذار بالاسم نفسه — فلست بحاجة إلى حذفه أولًا.</p>
<h2 id="هدف-إضافي-سجل-الإنذار">هدف إضافي: سجل الإنذار</h2>
<pre><code class="language-bash">aws cloudwatch describe-alarm-history \\
  --alarm-name my-frontend-app-api-error-count \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقعة (إذا كنت قد اختبرت الإنذار):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;AlarmHistoryItems&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AlarmName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api-error-count&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T15:05:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;HistoryItemType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;StateUpdate&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;HistorySummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Alarm updated from ALARM to INSUFFICIENT_DATA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;HistoryData&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;version\\&quot;:\\&quot;1.0\\&quot;,\\&quot;oldState\\&quot;:{\\&quot;stateValue\\&quot;:\\&quot;ALARM\\&quot;},\\&quot;newState\\&quot;:{\\&quot;stateValue\\&quot;:\\&quot;INSUFFICIENT_DATA\\&quot;,\\&quot;stateReason\\&quot;:\\&quot;Unchecked: Initial alarm creation\\&quot;}}&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AlarmName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api-error-count&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T15:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;HistoryItemType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;StateUpdate&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;HistorySummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Alarm updated from INSUFFICIENT_DATA to ALARM&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;HistoryData&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;version\\&quot;:\\&quot;1.0\\&quot;,\\&quot;oldState\\&quot;:{\\&quot;stateValue\\&quot;:\\&quot;INSUFFICIENT_DATA\\&quot;},\\&quot;newState\\&quot;:{\\&quot;stateValue\\&quot;:\\&quot;ALARM\\&quot;,\\&quot;stateReason\\&quot;:\\&quot;Testing alarm notification pipeline\\&quot;}}&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يعرض هذا الجدول الزمني الكامل لانتقالات الحالة — وهو مفيد لفهم مدى تكرار انطلاق إنذارك وما إذا كان حساسًا أكثر من اللازم أو هادئًا أكثر من اللازم.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>إذا انتهيت من التجربة ولا تريد إنذارات شاردة تزعجك (أو اشتراك بريد إلكتروني عالقًا نسيت أمره)، ففكّك كل شيء بالترتيب العكسي لما بنيته.</p>
<p>احذف الإنذارات:</p>
<pre><code class="language-bash">aws cloudwatch delete-alarms \\
  --alarm-names my-frontend-app-api-error-count my-frontend-app-api-high-duration my-frontend-app-api-5xx \\
  --region us-east-1
</code></pre>
<p>ألغِ اشتراك بريدك الإلكتروني في موضوع SNS. احصل على ARN الاشتراك أولًا:</p>
<pre><code class="language-bash">aws sns list-subscriptions-by-topic \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ثم ألغِ الاشتراك باستخدام <code>SubscriptionArn</code> من الاستجابة:</p>
<pre><code class="language-bash">aws sns unsubscribe \\
  --subscription-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts:abcd1234-... \\
  --region us-east-1
</code></pre>
<p>احذف الموضوع نفسه:</p>
<pre><code class="language-bash">aws sns delete-topic \\
  --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts \\
  --region us-east-1
</code></pre>
`,u={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:o};export{s as book,l as chapter,a as chapterTitle,u as default,p as headings,o as html,n as slug,t as title};
