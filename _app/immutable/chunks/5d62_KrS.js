const s="kinney",c="aws",a="نشر تطبيقات الويب على AWS",n="secrets-in-lambda-solution",p="الحل",t=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"تخزين-السر",text:"تخزين السرّ"},{depth:2,id:"كتابة-المعالج",text:"كتابة المعالج"},{depth:2,id:"تحديث-دور-التنفيذ",text:"تحديث دور التنفيذ"},{depth:2,id:"النشر-والاستدعاء",text:"النشر والاستدعاء"},{depth:2,id:"التحقق-من-أن-السر-ليس-في-متغيرات-البيئة",text:"التحقّق من أن السرّ ليس في متغيّرات البيئة"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:2,id:"حل-الهدف-الإضافي-getparametersbypath",text:"حل الهدف الإضافي: GetParametersByPath"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>هذا هو الحل الكامل لـ<a href="https://stevekinney.com/courses/aws/secrets-in-lambda-exercise">تمرين: تخزين سرّ واسترجاعه في Lambda</a>. إذا وقعت في مشكلة، فلا تقلق — ثمة بعض المزالق هنا يتعثّر فيها الجميع في المرة الأولى.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>يصبح Parameter Store مصدر الحقيقة للسرّ، ما يُخرج القيمة من نظام التحكّم بالمصادر ومن إعدادات Lambda.</li>
<li>تُحمّل الدالة السرّ في وقت التهيئة، فتدفع كلفة البحث مرة واحدة لكل بيئة دافئة بدلًا من كل استدعاء.</li>
<li>فحص الإعداد النهائي مهم لأن السرّ لا يكون قد انتقل فعلًا حتى يختفي من متغيّرات البيئة وإعدادات النشر.</li>
</ul>
<p>إذا أردت نسخة AWS من سير عمل تخزين الأسرار مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html">نظرة عامة على AWS Secrets Manager</a> و<a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html">توثيق Parameter Store</a> قريبًا منك.</p>
<h2 id="تخزين-السر">تخزين السرّ</h2>
<pre><code class="language-bash">aws ssm put-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/third-party-api-key&quot;</span> \\
  --value <span class="hljs-string">&quot;sk_test_exercise_abc123&quot;</span> \\
  --<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;SecureString&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تحقّق منه:</p>
<pre><code class="language-bash">aws ssm get-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/third-party-api-key&quot;</span> \\
  --with-decryption \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>المخرجات المتوقّعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Parameter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/my-frontend-app/production/third-party-api-key&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SecureString&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sk_test_exercise_abc123&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;LastModifiedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T10:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/third-party-api-key&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يمكنك أيضًا التحقّق من المعامل في وحدة تحكّم AWS تحت <strong>Systems Manager → Parameter Store</strong>:</p>
<p><img src="/arabic-cs-library/images/kinney/fdaed0203b072c70.webp" alt="عرض تفاصيل Parameter Store وهو يُظهر معامل SecureString مع ARN الخاص به ونوعه وطبقته وقيمته المقنّعة."></p>
<h2 id="كتابة-المعالج">كتابة المعالج</h2>
<p>إعداد المشروع:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p lambda/src
<span class="hljs-built_in">cd</span> lambda
npm init -y
npm install @aws-sdk/client-ssm
npm install -D typescript @types/aws-lambda @types/node
</code></pre>
<p>أنشئ <code>tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;commonjs&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declarationMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sourceMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أضف سكربت البناء إلى <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ <code>src/handler.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParameterCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">let</span> <span class="hljs-attr">apiKey</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">loadConfig</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">if</span> (apiKey) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParameterCommand</span>({
      <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/third-party-api-key&#x27;</span>,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
    }),
  );

  apiKey = response.<span class="hljs-property">Parameter</span>?.<span class="hljs-property">Value</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadConfig</span>();

  <span class="hljs-keyword">if</span> (!apiKey) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to load API key from Parameter Store&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Secret loaded successfully from Parameter Store&#x27;</span>,
      <span class="hljs-attr">keyPrefix</span>: apiKey.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">7</span>),
    }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> أنشئ العميل على مستوى الوحدة النمطية كي يُعاد استخدامه بين الاستدعاءات.</p>
<p><em>ملاحظة:</em> تخطَّ استدعاء API إذا كانت القيمة مخزّنة مؤقتًا من استدعاء سابق.</p>
<p>ابنِ:</p>
<pre><code class="language-bash">npm run build
</code></pre>
<h2 id="تحديث-دور-التنفيذ">تحديث دور التنفيذ</h2>
<p>أنشئ <code>parameter-store-policy.json</code> (وهو متاح أيضًا باسم <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/parameter-store.json"><code>parameter-store.json</code></a> في مستودع Scratch Lab):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ssm:GetParameter&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/third-party-api-key&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;kms:Decrypt&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:kms:us-east-1:123456789012:alias/aws/ssm&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أرفقه بدور التنفيذ:</p>
<pre><code class="language-bash">aws iam put-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-name parameter-store-access \\
  --policy-document file://parameter-store-policy.json \\
  --output json
</code></pre>
<p>تحقّق من أن السياسة مرفقة:</p>
<pre><code class="language-bash">aws iam list-role-policies \\
  --role-name my-frontend-app-lambda-role \\
  --output json
</code></pre>
<p>المخرجات المتوقّعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;PolicyNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;parameter-store-access&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يمكنك أيضًا التحقّق من محتوى السياسة:</p>
<pre><code class="language-bash">aws iam get-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-name parameter-store-access \\
  --output json
</code></pre>
<h2 id="النشر-والاستدعاء">النشر والاستدعاء</h2>
<p>حزّم الدالة. تُضمّن بيئة التشغيل <code>nodejs22.x</code> حزمة AWS SDK v3، لكن احزم <code>node_modules</code> على أي حال — إذ تثبّت AWS إصدارًا فرعيًا محدّدًا في بيئة التشغيل، لا الأحدث، وهو يتفاوت حسب المنطقة. وحزم نسختك الخاصة يعني أنك تتحكّم في الإصدار ولا تفاجئك تحديثات بيئة التشغيل:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist
<span class="hljs-built_in">cp</span> -r ../node_modules .
zip -r ../function.zip .
<span class="hljs-built_in">cd</span> ..
</code></pre>
<p>انشر — إن كنت تحدّث دالة موجودة:</p>
<pre><code class="language-bash">aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>أو أنشئ دالة جديدة:</p>
<pre><code class="language-bash">aws lambda create-function \\
  --function-name my-frontend-app-api \\
  --runtime nodejs22.x \\
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \\
  --handler handler.handler \\
  --zip-file fileb://function.zip \\
  --<span class="hljs-built_in">timeout</span> 10 \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>المهلة الافتراضية 3 ثوانٍ. ويتضمّن أول استدعاء (بدء بارد) استدعاء SDK إلى Parameter Store، وقد يستغرق ثانية أو ثانيتين. وضبط المهلة على 10 ثوانٍ يمنحك هامشًا واسعًا.</p>
</blockquote>
<p>استدعِ الدالة:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --payload <span class="hljs-string">&#x27;{&quot;requestContext&quot;:{&quot;http&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;path&quot;:&quot;/secret&quot;}},&quot;queryStringParameters&quot;:{}}&#x27;</span> \\
  --cli-binary-format raw-in-base64-out \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>اقرأ الاستجابة:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المخرجات المتوقّعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;statusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Content-Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;message\\&quot;:\\&quot;Secret loaded successfully from Parameter Store\\&quot;,\\&quot;keyPrefix\\&quot;:\\&quot;sk_test\\&quot;}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>قيمة <code>keyPrefix</code> هي <code>sk_test</code> — أول 7 أحرف من <code>sk_test_exercise_abc123</code>.</p>
<h2 id="التحقق-من-أن-السر-ليس-في-متغيرات-البيئة">التحقّق من أن السرّ ليس في متغيّرات البيئة</h2>
<pre><code class="language-bash">aws lambda get-function-configuration \\
  --function-name my-frontend-app-api \\
  --query <span class="hljs-string">&#x27;Environment&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>إذا كانت لديك متغيّرات بيئة من تمرين سابق (مثل <code>TABLE_NAME</code>)، فستظهر هنا. أما مفتاح API فلا يظهر. فهو موجود في Parameter Store فقط.</p>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<p><strong>«AccessDeniedException» عند استدعاء الدالة.</strong> دور التنفيذ تفتقده أذونات <code>ssm:GetParameter</code> أو <code>kms:Decrypt</code>. راجع مستند السياسة وتحقّق من إرفاقه بالدور الصحيح. وتحقّق أيضًا من أن ARN المعامل في السياسة يطابق اسم المعامل تمامًا — وتذكّر أن مسار ARN لا يضاعف الشرطة المائلة البادئة.</p>
<p><strong>خطأ «ParameterNotFound».</strong> اسم المعامل في شفرتك لا يطابق الاسم الذي استخدمته في <code>put-parameter</code>. أسماء المعاملات حسّاسة لحالة الأحرف ويجب أن تتضمّن المسار الكامل مع الشرطة المائلة البادئة.</p>
<p><strong>انتهاء مهلة الدالة.</strong> المهلة الافتراضية 3 ثوانٍ، وقد لا تكفي لبدء بارد يتضمّن استدعاء SDK. ارفع المهلة إلى 10 ثوانٍ بـ:</p>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --<span class="hljs-built_in">timeout</span> 10 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p><strong>«Cannot find module '@aws-sdk/client-ssm'»</strong> لم يُضمَّن دليل <code>node_modules</code> في ملف zip الخاص بالنشر. تتضمّن بيئة التشغيل <code>nodejs22.x</code> حزمة AWS SDK v3، لكن هذا التمرين يحزم نسخته الخاصة للتحكّم في الإصدار. تأكّد من نسخ <code>node_modules</code> إلى دليل <code>dist/</code> قبل الضغط.</p>
<h2 id="حل-الهدف-الإضافي-getparametersbypath">حل الهدف الإضافي: GetParametersByPath</h2>
<p>خزّن معاملًا ثانيًا:</p>
<pre><code class="language-bash">aws ssm put-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/api-endpoint&quot;</span> \\
  --value <span class="hljs-string">&quot;https://api.example.com/v1&quot;</span> \\
  --<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;String&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>حدّث سياسة IAM للسماح بـ<code>ssm:GetParametersByPath</code> وتوسيع المورد إلى بادئة المسار:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ssm:GetParameter&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;ssm:GetParametersByPath&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/*&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;kms:Decrypt&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:kms:us-east-1:123456789012:alias/aws/ssm&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>معالج محدّث باستخدام <code>GetParametersByPathCommand</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParametersByPathCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">let</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt; | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">loadConfig</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">if</span> (config) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParametersByPathCommand</span>({
      <span class="hljs-title class_">Path</span>: <span class="hljs-string">&#x27;/my-frontend-app/production&#x27;</span>,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">Recursive</span>: <span class="hljs-literal">true</span>,
    }),
  );

  config = {};
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> param <span class="hljs-keyword">of</span> response.<span class="hljs-property">Parameters</span> ?? []) {
    <span class="hljs-keyword">if</span> (param.<span class="hljs-property">Name</span> &amp;&amp; param.<span class="hljs-property">Value</span>) {
      <span class="hljs-keyword">const</span> key = param.<span class="hljs-property">Name</span>.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;/my-frontend-app/production/&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>);
      config[key] = param.<span class="hljs-property">Value</span>;
    }
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadConfig</span>();

  <span class="hljs-keyword">if</span> (!config) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to load configuration&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;All configuration loaded from Parameter Store&#x27;</span>,
      <span class="hljs-attr">parameters</span>: <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(config),
      <span class="hljs-attr">apiEndpoint</span>: config[<span class="hljs-string">&#x27;api-endpoint&#x27;</span>],
      <span class="hljs-attr">keyPrefix</span>: config[<span class="hljs-string">&#x27;third-party-api-key&#x27;</span>]?.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">7</span>),
    }),
  };
};
</code></pre>
<p>تتضمّن الاستجابة الآن المعاملين، محمّلين في استدعاء API واحد.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>احذف معاملات Parameter Store عندما تنتهي:</p>
<pre><code class="language-bash">aws ssm delete-parameters \\
  --names \\
    <span class="hljs-string">&quot;/my-frontend-app/production/third-party-api-key&quot;</span> \\
    <span class="hljs-string">&quot;/my-frontend-app/production/api-endpoint&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>معاملات الطبقة القياسية مجانية، لذا فالأمر تنظيمٌ لا شأن له بالتكلفة — لكنه يُبقي فضاء أسماء المعاملات نظيفًا.</p>
`,e={book:s,chapter:"aws",chapterTitle:a,slug:n,title:p,headings:t,html:l};export{s as book,c as chapter,a as chapterTitle,e as default,t as headings,l as html,n as slug,p as title};
