const s="kinney",o="aws",a="نشر تطبيقات الويب على AWS",n="lambda-execution-roles-and-permissions",t="أدوار التنفيذ والأذونات",l=[{depth:2,id:"ما-هو-دور-التنفيذ",text:"ما هو دور التنفيذ"},{depth:2,id:"إنشاء-سياسة-الثقة",text:"إنشاء سياسة الثقة"},{depth:2,id:"إنشاء-الدور",text:"إنشاء الدور"},{depth:2,id:"إرفاق-سياسة-التنفيذ-الأساسية",text:"إرفاق سياسة التنفيذ الأساسية"},{depth:2,id:"إضافة-أذونات-مخصصة",text:"إضافة أذونات مخصصة"},{depth:2,id:"الأذونات-التي-ستحتاجها-دالتك",text:"الأذونات التي ستحتاجها دالتك"},{depth:2,id:"مع-sdk",text:"مع SDK"},{depth:2,id:"التحقق-من-الدور",text:"التحقق من الدور"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],p=`<p>كل دالة Lambda تحتاج إلى إذن لفعل الأشياء—كتابة السجلات، والقراءة من DynamoDB، والوصول إلى S3. لكن دوال Lambda ليس لديها أسماء مستخدمين أو مفاتيح وصول. بدلًا من ذلك، تفترض كل دالة دور IAM عند تشغيلها. هذا هو <strong>دور التنفيذ</strong>، وهو أهم قرار أمني واحد تتخذه لكل دالة.</p>
<p>إذا أردت نسخة AWS من نموذج الأذونات نفسه أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html">دليل دور تنفيذ Lambda</a> هو المرجع الرسمي.</p>
<p>إذا كنت قد عملت على <a href="https://stevekinney.com/courses/aws/iam-mental-model">النموذج الذهني لـ IAM</a>، فأنت تعرف بالفعل كيف تعمل الأدوار: الدور مجموعة من الأذونات يمكن لخدمة AWS أن تفترضها. دور التنفيذ هو ذلك المفهوم نفسه مطبّقًا على Lambda. تقول دالتك «أنا <code>my-frontend-app-api</code>»، فتقول Lambda «دعني أتحقق من الدور الذي يُفترض أن تفترضه»، ثم تحدد سياسات الدور ما تستطيع دالتك فعله.</p>
<h2 id="ما-هو-دور-التنفيذ">ما هو دور التنفيذ</h2>
<p>يتكوّن <strong>دور التنفيذ</strong> من جزأين:</p>
<ol>
<li><strong>سياسة الثقة</strong>—تُخبر AWS أي خدمة يُسمح لها بافتراض هذا الدور. بالنسبة إلى Lambda، الخدمة الموثوقة هي <code>lambda.amazonaws.com</code>.</li>
<li><strong>سياسات الأذونات</strong>—الأذونات الفعلية التي تحصل عليها الدالة عند تشغيلها. وهي نفس سياسات IAM التي كتبتها في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>.</li>
</ol>
<pre><code>flowchart LR
    Lambda[&quot;Lambda function&quot;] --&gt; STS[&quot;Assume execution role&quot;]
    STS --&gt; Role[&quot;IAM execution role&quot;]
    Role --&gt; Logs[&quot;CloudWatch Logs permissions&quot;]
    Role --&gt; DynamoDB[&quot;DynamoDB permissions&quot;]
    Role --&gt; Secrets[&quot;SSM and Secrets permissions&quot;]
</code></pre>
<p>من دون دور تنفيذ، لا تستطيع Lambda تشغيل دالتك إطلاقًا. الدور معامل مطلوب عند إنشاء الدالة.</p>
<h2 id="إنشاء-سياسة-الثقة">إنشاء سياسة الثقة</h2>
<p>سياسة الثقة مستند JSON يجيب عن سؤال واحد: «من يُسمح له بافتراض هذا الدور؟» بالنسبة إلى Lambda، الجواب هو خدمة Lambda دائمًا.</p>
<p>أنشئ ملفًا باسم <code>trust-policy.json</code> (متوفر أيضًا باسم <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/lambda-trust-policy.json"><code>lambda-trust-policy.json</code></a> في مستودع Scratch Lab):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Service&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lambda.amazonaws.com&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تقول هذه السياسة: «خدمة Lambda (<code>lambda.amazonaws.com</code>) مسموح لها بافتراض هذا الدور باستخدام إجراء <code>sts:AssumeRole</code>». حقل <strong>Principal</strong> هو ما يجعل هذه سياسة ثقة لا سياسة أذونات—فهو يحدّد من يستطيع استخدام الدور، لا ما يستطيع الدور فعله.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>سياسة الثقة ليست مثل سياسات الأذونات التي ترفقها بالدور. تتحكم سياسة الثقة بمن يستطيع <em>افتراض</em> الدور. أما سياسات الأذونات فتتحكم بما يستطيع الدور <em>فعله</em> بعد افتراضه. الخلط بينهما مصدر شائع للارتباك.</p>
</blockquote>
<p>إذا احتجت يومًا إلى التحقق مما تقوله سياسة ثقة دور ما فعلًا (مثلًا لأنك تتعقّب خطأ <code>AccessDenied</code> في استدعاء <code>sts:AssumeRole</code>)، فاقرأ حقل <code>AssumeRolePolicyDocument</code> في الدور:</p>
<pre><code class="language-bash">aws iam get-role \\
  --role-name my-frontend-app-lambda-role \\
  --query <span class="hljs-string">&#x27;Role.AssumeRolePolicyDocument&#x27;</span> \\
  --output json
</code></pre>
<p>ينبغي أن يُظهر الإخراج <code>lambda.amazonaws.com</code> كأصل موثوق. إذا وجدت فيه شيئًا آخر—أو كان الأصل هو <code>Service: &quot;*&quot;</code>—فهذا هو خطؤك.</p>
<h2 id="إنشاء-الدور">إنشاء الدور</h2>
<p>استخدم AWS CLI لإنشاء دور التنفيذ:</p>
<pre><code class="language-bash">aws iam create-role \\
  --role-name my-frontend-app-lambda-role \\
  --assume-role-policy-document file://trust-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن الاستجابة ARN الخاص بالدور، وستحتاجه عند إنشاء دالة Lambda:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;RoleName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-lambda-role&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:role/my-frontend-app-lambda-role&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AssumeRolePolicyDocument&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Service&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lambda.amazonaws.com&quot;</span>
          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ قيمة ARN هذه. ستمرّرها إلى <code>aws lambda create-function</code> في الدرس التالي.</p>
<p>في وحدة التحكم، يتولّى معالج <strong>Create role</strong> ذلك في خطوة <strong>Select trusted entity</strong>—اختر <strong>AWS service</strong>، ثم اختر <strong>Lambda</strong> كحالة الاستخدام.</p>
<p><img src="/arabic-cs-library/images/kinney/752877a58602f8d4.webp" alt="صفحة IAM Create Role مع اختيار AWS service كنوع الكيان الموثوق وLambda كاختيار الخدمة أو حالة الاستخدام."></p>
<h2 id="إرفاق-سياسة-التنفيذ-الأساسية">إرفاق سياسة التنفيذ الأساسية</h2>
<p>دالة Lambda التي لا تستطيع كتابة السجلات هي دالة Lambda لا تستطيع تصحيح أخطائها. توفّر AWS سياسة مُدارة باسم <strong><code>AWSLambdaBasicExecutionRole</code></strong> تمنح ثلاثة أذونات بالضبط:</p>
<ul>
<li><code>logs:CreateLogGroup</code>—إنشاء مجموعة سجلات CloudWatch للدالة</li>
<li><code>logs:CreateLogStream</code>—إنشاء تدفّق سجلات داخل تلك المجموعة</li>
<li><code>logs:PutLogEvents</code>—كتابة مدخلات السجل</li>
</ul>
<p>أرفقها بدورك:</p>
<pre><code class="language-bash">aws iam attach-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>هذا هو دور التنفيذ الأدنى القابل للعمل. يجب أن تكون هذه السياسة مرفقة بكل دالة Lambda على الأقل حتى يظهر إخراج <code>console.log</code> في مكان ما فعلًا.</p>
<p>في وحدة التحكم، تُظهر علامة التبويب <strong>Permissions</strong> للدور المكتمل سياسة <code>AWSLambdaBasicExecutionRole</code> المرفقة.</p>
<p>صفحة تفاصيل دور IAM تُظهر سياسة AWSLambdaBasicExecutionRole مرفقة في قسم Permissions policies. تكتب Lambda السجلات إلى CloudWatch Logs. ستتعمّق في CloudWatch على نحو صحيح في قسم CloudWatch، لكن هذه السياسة الآن تضمن ألا تُهمَل سجلاتك بصمت.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يبدأ ARN للسياسات المُدارة من AWS دائمًا بـ <code>arn:aws:iam::aws:policy/</code>. كلمة <code>aws</code> في موضع الحساب تخبرك أن هذه سياسة تديرها AWS، لا سياسة أنشأتها أنت. بادئة المسار <code>service-role/</code> عرف للسياسات المصمّمة لتُرفق بأدوار الخدمات.</p>
</blockquote>
<h2 id="إضافة-أذونات-مخصصة">إضافة أذونات مخصصة</h2>
<p>تغطي سياسة التنفيذ الأساسية التسجيل فقط. كلما كبر تطبيقك، ستحتاج دالتك إلى الوصول إلى خدمات AWS أخرى. تضيف هذه الأذونات بإنشاء سياسات إضافية وإرفاقها. بصراحة، هنا يبدأ IAM في أن يبدو ملموسًا—فأنت لم تعد تكتب سياسات مجردة فقط، بل تقرّر بالضبط ما يمكن لكودك العامل أن يلمسه.</p>
<p>مثلًا، إذا كانت دالتك تحتاج إلى القراءة من حاوية S3:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3Read&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ هذا باسم <code>lambda-s3-policy.json</code> وأرفقه:</p>
<pre><code class="language-bash">aws iam create-policy \\
  --policy-name MyFrontendAppLambdaS3Read \\
  --policy-document file://lambda-s3-policy.json \\
  --region us-east-1 \\
  --output json

aws iam attach-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaS3Read \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينطبق مبدأ الامتياز الأقل من <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ الامتياز الأقل</a> هنا تمامًا كما انطبق مع مستخدمي IAM: امنح فقط الأذونات التي تحتاجها دالتك فعلًا، محدّدة النطاق إلى الموارد التي تصل إليها. لا ينبغي أن تحصل دالة Lambda تقرأ جدول DynamoDB واحدًا على <code>dynamodb:*</code> على <code>*</code>.</p>
<h2 id="الأذونات-التي-ستحتاجها-دالتك">الأذونات التي ستحتاجها دالتك</h2>
<p>مع تقدمك في الدورة، ستضيف سياسات إلى دور التنفيذ هذا تدريجيًا:</p>
<table>
<thead>
<tr>
<th>القسم</th>
<th>الخدمة</th>
<th>الإجراءات</th>
<th>السبب</th>
</tr>
</thead>
<tbody>
<tr>
<td>قسم Lambda (الآن)</td>
<td>CloudWatch Logs</td>
<td><code>logs:CreateLogGroup</code>، <code>logs:CreateLogStream</code>، <code>logs:PutLogEvents</code></td>
<td>تسجيل الدالة</td>
</tr>
<tr>
<td>قسم DynamoDB</td>
<td>DynamoDB</td>
<td><code>dynamodb:GetItem</code>، <code>dynamodb:PutItem</code>، <code>dynamodb:Query</code>، إلخ.</td>
<td>قراءة البيانات وكتابتها</td>
</tr>
<tr>
<td>قسم الأسرار</td>
<td>Parameter Store / Secrets Manager</td>
<td><code>ssm:GetParameter</code>، <code>secretsmanager:GetSecretValue</code></td>
<td>الوصول إلى الإعدادات والأسرار</td>
</tr>
</tbody>
</table>
<p>في كل مرة تضيف تكاملًا جديدًا، ستنشئ سياسة جديدة محدّدة النطاق إلى الموارد التي تحتاجها دالتك بالضبط وترفقها بالدور القائم. دور واحد، سياسات متعددة. هذا يُبقي أذوناتك قابلة للتدقيق ويجعل واضحًا ما تستطيع دالتك فعله.</p>
<h2 id="مع-sdk">مع SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">IAMClient</span>,
  <span class="hljs-title class_">CreateRoleCommand</span>,
  <span class="hljs-title class_">AttachRolePolicyCommand</span>,
  <span class="hljs-title class_">PutRolePolicyCommand</span>,
  <span class="hljs-title class_">ListAttachedRolePoliciesCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-iam&#x27;</span>;

<span class="hljs-keyword">const</span> iam = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IAMClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> role = <span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateRoleCommand</span>({
    <span class="hljs-title class_">RoleName</span>: <span class="hljs-string">&#x27;my-frontend-app-lambda-role&#x27;</span>,
    <span class="hljs-title class_">AssumeRolePolicyDocument</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-title class_">Version</span>: <span class="hljs-string">&#x27;2012-10-17&#x27;</span>,
      <span class="hljs-title class_">Statement</span>: [
        {
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Principal</span>: { <span class="hljs-title class_">Service</span>: <span class="hljs-string">&#x27;lambda.amazonaws.com&#x27;</span> },
          <span class="hljs-title class_">Action</span>: <span class="hljs-string">&#x27;sts:AssumeRole&#x27;</span>,
        },
      ],
    }),
  }),
);

<span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">AttachRolePolicyCommand</span>({
    <span class="hljs-title class_">RoleName</span>: <span class="hljs-string">&#x27;my-frontend-app-lambda-role&#x27;</span>,
    <span class="hljs-title class_">PolicyArn</span>: <span class="hljs-string">&#x27;arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole&#x27;</span>,
  }),
);

<span class="hljs-comment">// Inline policy for scoped S3 read:</span>
<span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutRolePolicyCommand</span>({
    <span class="hljs-title class_">RoleName</span>: <span class="hljs-string">&#x27;my-frontend-app-lambda-role&#x27;</span>,
    <span class="hljs-title class_">PolicyName</span>: <span class="hljs-string">&#x27;S3AssetsRead&#x27;</span>,
    <span class="hljs-title class_">PolicyDocument</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-title class_">Version</span>: <span class="hljs-string">&#x27;2012-10-17&#x27;</span>,
      <span class="hljs-title class_">Statement</span>: [
        {
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Action</span>: [<span class="hljs-string">&#x27;s3:GetObject&#x27;</span>],
          <span class="hljs-title class_">Resource</span>: <span class="hljs-string">&#x27;arn:aws:s3:::my-frontend-app-assets/*&#x27;</span>,
        },
      ],
    }),
  }),
);

<span class="hljs-keyword">const</span> attached = <span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListAttachedRolePoliciesCommand</span>({ <span class="hljs-title class_">RoleName</span>: <span class="hljs-string">&#x27;my-frontend-app-lambda-role&#x27;</span> }),
);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(attached.<span class="hljs-property">AttachedPolicies</span>);
</code></pre>
<h2 id="التحقق-من-الدور">التحقق من الدور</h2>
<p>يمكنك التحقق من السياسات المرفقة بدورك:</p>
<pre><code class="language-bash">aws iam list-attached-role-policies \\
  --role-name my-frontend-app-lambda-role \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الإخراج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;AttachedPolicies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;PolicyName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWSLambdaBasicExecutionRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;PolicyArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إذا رأيت <code>AWSLambdaBasicExecutionRole</code> في القائمة، فدورك جاهز للخطوة التالية: نشر الدالة.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>استخدام أصل سياسة الثقة الخطأ.</strong> إذا نسخت سياسة ثقة من مثال EC2، فسيكون الأصل <code>ec2.amazonaws.com</code> ولن تستطيع Lambda افتراض الدور. رسالة الخطأ—«The role defined for the function cannot be assumed by Lambda»—واضحة بمجرد أن تعرف ما تبحث عنه، لكنها مربكة في المرة الأولى.</p>
<p><strong>إرفاق <code>AdministratorAccess</code> لجعل الأمور تعمل.</strong> هذا مغرٍ أثناء التطوير وكارثي في الإنتاج. دالة Lambda بوصول إداري يمكنها حذف موارد حساب AWS بأكمله. استخدم الأذونات الدنيا، حتى أثناء التطوير. إذا فشلت دالتك بخطأ رفض وصول، فستخبرك رسالة الخطأ بالضبط أي إجراء ومورد تحتاج إلى إضافته.</p>
<p><strong>نسيان الانتظار حتى ينتشر الدور.</strong> تغييرات IAM متسقة نهائيًا. إذا أنشأت دورًا ثم أنشأت دالة Lambda به فورًا، فقد يفشل إنشاء الدالة لأن IAM لم ينشر الدور إلى كل نقاط نهاية AWS بعد. انتظر 10–15 ثانية—أو إذا كنت تكتب النشر كنص برمجي، فأضف منطق إعادة المحاولة مع تراجع على استدعاء <code>create-function</code> بدلًا من انتظار ثابت، لأن زمن الانتشار غير مضمون.</p>
<p>أصبح لديك دور تنفيذ بأذونات تسجيل. في الدرس التالي، ستحزم معالج TypeScript الخاص بك في ملف zip للنشر وتستخدم <code>aws lambda create-function</code> لنشره بهذا الدور.</p>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:l,html:p};export{s as book,o as chapter,a as chapterTitle,c as default,l as headings,p as html,n as slug,t as title};
