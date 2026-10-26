const s="kinney",e="aws",a="نشر تطبيقات الويب على AWS",n="accessing-secrets-from-lambda",p="الوصول إلى الأسرار من Lambda",l=[{depth:2,id:"القراءة-من-parameter-store",text:"القراءة من Parameter Store"},{depth:2,id:"القراءة-من-secrets-manager",text:"القراءة من Secrets Manager"},{depth:2,id:"أذونات-iam",text:"أذونات IAM"},{depth:3,id:"من-أجل-parameter-store",text:"من أجل Parameter Store"},{depth:3,id:"من-أجل-secrets-manager",text:"من أجل Secrets Manager"},{depth:3,id:"إرفاق-السياسة",text:"إرفاق السياسة"},{depth:2,id:"استراتيجيات-التخزين-المؤقت",text:"استراتيجيات التخزين المؤقت"},{depth:2,id:"إضافة-lambda-لمعاملات-وأسرار-aws",text:"إضافة Lambda لمعاملات وأسرار AWS"},{depth:2,id:"جمع-كل-ذلك-معا",text:"جمع كل ذلك معًا"}],t=`<p>أنت تعرف كيف تخزّن الأسرار في Parameter Store وSecrets Manager. الآن تحتاج إلى قراءتها من دالة Lambda. النمط واضح: نفّذ استدعاءً عبر SDK أثناء التهيئة، وخزّن النتيجة في متغيّر على مستوى الوحدة، وأعد استخدامها عبر الاستدعاءات. هذا هو نمط التهيئة نفسه الذي استخدمته لمتغيّرات البيئة في <a href="https://stevekinney.com/courses/aws/lambda-environment-variables">متغيّرات بيئة Lambda</a> — والفرق أن القيمة تأتي من استدعاء واجهة برمجية بدلًا من <code>process.env</code>.</p>
<p>إذا أردت نسخة AWS الرسمية من جانب وقت التشغيل في هذا النمط، فإن <a href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html">نظرة Secrets Manager العامة</a> و<a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html">دليل متغيّرات بيئة Lambda</a> مرجعان يستحقّان أن يبقيا مفتوحين.</p>
<pre><code>flowchart LR
    Cold[&quot;Cold start or expired cache&quot;] --&gt; Fetch[&quot;Fetch parameter or secret with the SDK&quot;]
    Fetch --&gt; Cache[&quot;Store value in a module-level cache&quot;]
    Cache --&gt; Handler[&quot;Handler uses cached value&quot;]
    Handler --&gt; Warm{&quot;Warm invocation and TTL still valid?&quot;}
    Warm -- &quot;Yes&quot; --&gt; Handler
    Warm -- &quot;No&quot; --&gt; Fetch
</code></pre>
<h2 id="القراءة-من-parameter-store">القراءة من Parameter Store</h2>
<p>ثبّت حزمة عميل SSM في مشروع Lambda لديك:</p>
<pre><code class="language-bash">npm install @aws-sdk/client-ssm
</code></pre>
<p>إليك دالة Lambda تقرأ مفتاح واجهة برمجية من Parameter Store في وقت التهيئة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParameterCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">let</span> <span class="hljs-attr">apiKey</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">loadConfig</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">if</span> (apiKey) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParameterCommand</span>({
      <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/api-key&#x27;</span>,
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
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to load API key&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Configuration loaded&#x27;</span>, <span class="hljs-attr">keyPrefix</span>: apiKey.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">4</span>) }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> <code>WithDecryption: true</code> مطلوب لمعاملات <code>SecureString</code>. وبدونه تحصل على نص مشفّر.</p>
<p>تعمل الدالة <code>loadConfig</code> في أول استدعاء. وفي الاستدعاءات الدافئة اللاحقة يكون <code>apiKey</code> مضبوطًا بالفعل ويُتخطّى استدعاء SDK. هذا يعني أنك تجري استدعاءً واحدًا لكل بدء بارد، لا استدعاءً لكل طلب.</p>
<h2 id="القراءة-من-secrets-manager">القراءة من Secrets Manager</h2>
<p>ثبّت حزمة عميل Secrets Manager:</p>
<pre><code class="language-bash">npm install @aws-sdk/client-secrets-manager
</code></pre>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">SecretsManagerClient</span>, <span class="hljs-title class_">GetSecretValueCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-secrets-manager&#x27;</span>;

<span class="hljs-keyword">const</span> secretsManager = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SecretsManagerClient</span>({});

<span class="hljs-keyword">let</span> <span class="hljs-attr">stripeConfig</span>: { <span class="hljs-attr">apiKey</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">webhookSecret</span>: <span class="hljs-built_in">string</span> } | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">loadSecrets</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">if</span> (stripeConfig) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> secretsManager.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetSecretValueCommand</span>({
      <span class="hljs-title class_">SecretId</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/stripe-key&#x27;</span>,
    }),
  );

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">SecretString</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Secret value is empty&#x27;</span>);
  }

  stripeConfig = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(response.<span class="hljs-property">SecretString</span>);
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadSecrets</span>();

  <span class="hljs-keyword">if</span> (!stripeConfig) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to load Stripe configuration&#x27;</span> }),
    };
  }

  <span class="hljs-comment">// Use stripeConfig.apiKey and stripeConfig.webhookSecret in your business logic</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Stripe configuration loaded&#x27;</span> }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> يعيد Secrets Manager القيمة بعد فكّ تشفيرها تلقائيًا. فلا حاجة إلى خيار <code>WithDecryption</code>.</p>
<h2 id="أذونات-iam">أذونات IAM</h2>
<p>يحتاج دور تنفيذ دالة Lambda إلى إذن لقراءة المعاملات أو الأسرار المحددة التي يستخدمها. تذكّر من <a href="https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions">أدوار تنفيذ Lambda وأذوناتها</a> أن دور التنفيذ يتحكم في خدمات AWS التي يمكن للدالة الوصول إليها.</p>
<h3 id="من-أجل-parameter-store">من أجل Parameter Store</h3>
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
<p>العبارة الأولى تمنح الوصول إلى كل المعاملات تحت المسار <code>/my-frontend-app/production/</code>. والعبارة الثانية تمنح الإذن بفكّ تشفير معاملات SecureString باستخدام مفتاح KMS المُدار من AWS. أما إذا استخدمت مفتاح KMS مُدارًا من العميل، فاستبدل ARN المورد بـ ARN مفتاحك.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>ARN المعامل في سياسات IAM <strong>لا</strong> يتضمن شرطة مائلة بادئة قبل اسم المعامل. فالمعامل المسمّى <code>/my-frontend-app/production/api-key</code> له ARN بالشكل <code>arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/api-key</code> — لاحظ الشرطة المائلة الواحدة بين <code>parameter</code> و<code>my-frontend-app</code>. هذا ما يوقع الناس في الخطأ، لأن اسم المعامل يبدأ بـ <code>/</code> لكن مسار ARN لا يضاعفها.</p>
</blockquote>
<h3 id="من-أجل-secrets-manager">من أجل Secrets Manager</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;secretsmanager:GetSecretValue&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يتولّى Secrets Manager فكّ التشفير داخليًا عندما تستدعي <code>GetSecretValue</code>، فلا تحتاج إلى إذن <code>kms:Decrypt</code> منفصل — إلا إذا استخدمت مفتاح KMS مُدارًا من العميل. في تلك الحالة، أضف عبارة <code>kms:Decrypt</code> لذلك المفتاح.</p>
<h3 id="إرفاق-السياسة">إرفاق السياسة</h3>
<p>أرفق هذه الأذونات بدور تنفيذ Lambda باستخدام سياسة مضمّنة:</p>
<pre><code class="language-bash">aws iam put-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-name parameter-store-access \\
  --policy-document file://parameter-store-policy.json \\
  --output json
</code></pre>
<p>أو أنشئ سياسة مُدارة وأرفقها — وهو النهج الذي تعلمته في <a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a>. في الحالتين ينطبق مبدأ الامتياز الأدنى: امنح الوصول إلى المعاملات المحددة التي تحتاجها دالتك، لا إلى كل المعاملات في حسابك.</p>
<h2 id="استراتيجيات-التخزين-المؤقت">استراتيجيات التخزين المؤقت</h2>
<p>نمط الجلب في وقت التهيئة الموضّح أعلاه يعمل جيدًا للأسرار التي لا تتغير أثناء تشغيل الدالة. لكن إذا استخدمت التدوير التلقائي في Secrets Manager، فقد يتغيّر السر بينما بيئة تنفيذ Lambda لديك لا تزال دافئة. عندها تصبح القيمة المخزّنة مؤقتًا قديمة.</p>
<p>إليك نمط تخزين مؤقت مع مدة صلاحية (TTL):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParameterCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">let</span> <span class="hljs-attr">cachedValue</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">let</span> cacheExpiry = <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CACHE_TTL_MS</span> = <span class="hljs-number">5</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>; <span class="hljs-comment">// 5 minutes</span>

<span class="hljs-keyword">const</span> getParameter = <span class="hljs-title function_">async</span> (<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> now = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();

  <span class="hljs-keyword">if</span> (cachedValue &amp;&amp; now &lt; cacheExpiry) {
    <span class="hljs-keyword">return</span> cachedValue;
  }

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParameterCommand</span>({
      <span class="hljs-title class_">Name</span>: name,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
    }),
  );

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">Parameter</span>?.<span class="hljs-property">Value</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Parameter <span class="hljs-subst">\${name}</span> not found\`</span>);
  }

  cachedValue = response.<span class="hljs-property">Parameter</span>.<span class="hljs-property">Value</span>;
  cacheExpiry = now + <span class="hljs-variable constant_">CACHE_TTL_MS</span>;

  <span class="hljs-keyword">return</span> cachedValue;
};
</code></pre>
<p><em>ملاحظة:</em> بعد 5 دقائق، يعيد الاستدعاء التالي جلب المعامل. هذا يُبقي الذاكرة المؤقتة حديثة دون استدعاء الواجهة البرمجية في كل طلب.</p>
<p>مدة صلاحية 5 دقائق تعني أن دالتك تعيد جلب السر مرة واحدة كل 5 دقائق لكل بيئة تنفيذ على الأكثر. وقد وجدت أن هذا توازن جيد لمعظم التطبيقات بين حداثة القيمة وتكلفة استدعاءات الواجهة البرمجية.</p>
<h2 id="إضافة-lambda-لمعاملات-وأسرار-aws">إضافة Lambda لمعاملات وأسرار AWS</h2>
<p>توفّر AWS إضافة Lambda تتولّى التخزين المؤقت نيابةً عنك. فبدلًا من إجراء استدعاءات SDK من كودك، تضيف طبقة Lambda تشغّل ذاكرة مؤقتة محلية عبر HTTP. وتستعيد دالتك المعاملات باستدعاء <code>localhost:2773</code> بدلًا من واجهة SSM أو Secrets Manager البرمجية.</p>
<p>أضف طبقة الإضافة إلى دالتك:</p>
<pre><code class="language-bash">EXTENSION_ARN=$(aws ssm get-parameter \\
  --name <span class="hljs-string">&quot;/aws/service/aws-parameters-and-secrets-lambda-extension/x86/latest&quot;</span> \\
  --query <span class="hljs-string">&quot;Parameter.Value&quot;</span> \\
  --region us-east-1 \\
  --output text)

aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --layers <span class="hljs-string">&quot;<span class="hljs-variable">$EXTENSION_ARN</span>&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>ARN الإضافة <strong>خاص بالمعمارية</strong> و<strong>خاص بالمنطقة</strong> في الوقت نفسه. فمسار <code>x86/latest</code> أعلاه يُحلّ إلى طبقة مبنية لدوال Lambda من نوع <code>x86_64</code>؛ أما <code>arm64/latest</code> فيُحلّ إلى طبقة مختلفة مبنية لدوال <code>arm64</code> (Graviton). وإرفاق طبقة x86 بدالة arm64 لا يفشل وقت النشر — بل تُقلع الدالة، لكن أي استدعاء إلى <code>localhost:2773</code> يفشل في وقت التشغيل لأن ملف الإضافة التنفيذي لا يمكن تشغيله على ذلك المعالج. والأسوأ من ذلك أن المعاملات العامة في AWS تُحلّ في المنطقة التي تستدعيها منها، فبحث <code>aws ssm get-parameter</code> في <code>us-east-1</code> يمنحك ARN من <code>us-east-1</code> لن يعمل في دالة منشورة في <code>eu-west-1</code>. طابق كلا الأمرين — خيار المعمارية (<code>x86</code> مقابل <code>arm64</code>) والمنطقة (<code>--region</code>) — مع الدالة التي تُرفق بها الطبقة.</p>
</blockquote>
<p>ثم استرجع المعاملات عبر HTTP:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> getParameterFromExtension = <span class="hljs-title function_">async</span> (<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
    <span class="hljs-string">\`http://localhost:2773/systemsmanager/parameters/get?name=<span class="hljs-subst">\${<span class="hljs-built_in">encodeURIComponent</span>(name)}</span>&amp;withDecryption=true\`</span>,
    {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;X-Aws-Parameters-Secrets-Token&#x27;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">AWS_SESSION_TOKEN</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
      },
    },
  );

  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">return</span> data.<span class="hljs-property">Parameter</span>.<span class="hljs-property">Value</span>;
};
</code></pre>
<p>ولأجل Secrets Manager:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> getSecretFromExtension = <span class="hljs-title function_">async</span> (<span class="hljs-attr">secretId</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(
    <span class="hljs-string">\`http://localhost:2773/secretsmanager/get?secretId=<span class="hljs-subst">\${<span class="hljs-built_in">encodeURIComponent</span>(secretId)}</span>\`</span>,
    {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;X-Aws-Parameters-Secrets-Token&#x27;</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">AWS_SESSION_TOKEN</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
      },
    },
  );

  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">return</span> data.<span class="hljs-property">SecretString</span>;
};
</code></pre>
<p>تخزّن الإضافة القيم مؤقتًا بمدة صلاحية قابلة للتهيئة (الافتراضي 300 ثانية). وتتحكم في المدة عبر متغيّري البيئة <code>SSM_PARAMETER_STORE_TTL</code> و<code>SECRETS_MANAGER_TTL</code> على الدالة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يقايض نهج الإضافة تبعيات SDK باستدعاءات HTTP. وهو مفيد عندما تريد تخزينًا مؤقتًا دون كتابة منطق التخزين المؤقت، أو عندما تريد إبقاء حزمة النشر صغيرة بعدم تضمين حزم SDK الخاصة بـ SSM أو Secrets Manager. أما حالات الاستخدام البسيطة التي فيها أسرار قليلة، فنهج SDK المباشر مناسب تمامًا.</p>
</blockquote>
<h2 id="جمع-كل-ذلك-معا">جمع كل ذلك معًا</h2>
<p>إليك دالة Lambda كاملة تقرأ اسم جدول DynamoDB من متغيّر بيئة (غير حساس، ولا يتغيّر)، ومفتاح واجهة برمجية من Parameter Store (حساس، ونادرًا ما يتغيّر)، وتستخدم الاثنين:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParameterCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});
<span class="hljs-keyword">const</span> tableName = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span>;

<span class="hljs-keyword">let</span> <span class="hljs-attr">apiKey</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">loadSecrets</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">if</span> (apiKey) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParameterCommand</span>({
      <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/api-key&#x27;</span>,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
    }),
  );

  apiKey = response.<span class="hljs-property">Parameter</span>?.<span class="hljs-property">Value</span>;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadSecrets</span>();

  <span class="hljs-keyword">if</span> (!tableName || !apiKey) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing configuration&#x27;</span> }),
    };
  }

  <span class="hljs-comment">// Use tableName for DynamoDB operations, apiKey for third-party API calls</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;All configuration loaded&#x27;</span>,
      <span class="hljs-attr">table</span>: tableName,
    }),
  };
};
</code></pre>
<p>هذا النمط — متغيّرات البيئة للتهيئة غير الحساسة، وParameter Store أو Secrets Manager للقيم الحساسة، والتخزين المؤقت في وقت التهيئة لكليهما — هو النهج القياسي لدوال Lambda في الإنتاج. أصبح لديك الآن خدمتان تحلّان مشكلات متشابهة. ويقدّم الدرس التالي مقارنة مباشرة بين Parameter Store وSecrets Manager لمساعدتك على تحديد أيهما تلجأ إليه في السيناريوهات المختلفة.</p>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:p,headings:l,html:t};export{s as book,e as chapter,a as chapterTitle,c as default,l as headings,t as html,n as slug,p as title};
