const s="kinney",r="aws",n="نشر تطبيقات الويب على AWS",a="secrets-manager-rotation-and-encryption",t="Secrets Manager: التدوير والتشفير",e=[{depth:2,id:"إنشاء-سر",text:"إنشاء سر"},{depth:2,id:"مع-sdk",text:"مع SDK"},{depth:2,id:"استرجاع-سر",text:"استرجاع سر"},{depth:2,id:"التشفير-باستخدام-kms",text:"التشفير باستخدام KMS"},{depth:2,id:"التدوير-التلقائي",text:"التدوير التلقائي"},{depth:2,id:"مراحل-النسخ",text:"مراحل النسخ"},{depth:2,id:"التسعير",text:"التسعير"},{depth:2,id:"متى-يستحق-secrets-manager",text:"متى يستحق Secrets Manager"},{depth:2,id:"تحديث-سر",text:"تحديث سر"},{depth:2,id:"حذف-سر",text:"حذف سر"}],p=`<p><strong>Secrets Manager</strong> خدمة AWS مستقلة بُنيت لغرض واحد: تخزين بيانات الاعتماد الحساسة وتدويرها. صحيح أن Parameter Store يستطيع الاحتفاظ بقيم مشفّرة (SecureString)، لكن Secrets Manager يذهب أبعد من ذلك بتدوير مدمج، وتكامل بين الخدمات، وواجهة برمجية مصمّمة خصيصًا لإدارة دورة حياة بيانات الاعتماد.</p>
<p>إذا أردت النسخة الرسمية من AWS لسلوك الخدمة أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html">نظرة عامة على AWS Secrets Manager</a> و<a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html">توثيق Parameter Store</a> هما المرجعان المعتمدان.</p>
<p>فكّر في الأمر هكذا: Parameter Store مخزن إعدادات يدعم التشفير فحسب. أما Secrets Manager فخزنة بيانات اعتماد يكون التدوير فيها ميزة أساسية من الدرجة الأولى.</p>
<h2 id="إنشاء-سر">إنشاء سر</h2>
<p>يمكنك إنشاء سر من CLI بسلسلة JSON:</p>
<pre><code class="language-bash">aws secretsmanager create-secret \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/stripe-key&quot;</span> \\
  --secret-string <span class="hljs-string">&#x27;{&quot;apiKey&quot;:&quot;sk_live_abc123xyz&quot;,&quot;webhookSecret&quot;:&quot;whsec_def456&quot;}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن الاستجابة ARN الخاص بالسر واسمه:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/stripe-key-AbCdEf&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/my-frontend-app/production/stripe-key&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;VersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-5678-90ab-cdef-EXAMPLE11111&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لاحظ اللاحقة العشوائية في ARN (<code>-AbCdEf</code>). يضيفها Secrets Manager تلقائيًا لضمان التفرّد. وعند الإشارة إلى السر في سياسات IAM، يمكنك استخدام الاسم أو ARN الكامل.</p>
<p>في وحدة التحكم، تعرض قائمة <strong>Secrets</strong> كل الأسرار في حسابك مع أسمائها وأوصافها وتواريخ آخر تدوير لها.</p>
<p><img src="/arabic-cs-library/images/kinney/7a5d69a1e85a2b05.webp" alt="صفحة قائمة Secrets في AWS Secrets Manager تعرض قائمة الأسرار مع أعمدة للاسم والوصف وآخر استرجاع وآخر تغيير."></p>
<p>يمكنك أيضًا تخزين سلسلة نصية عادية بدلًا من JSON:</p>
<pre><code class="language-bash">aws secretsmanager create-secret \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/sendgrid-key&quot;</span> \\
  --secret-string <span class="hljs-string">&quot;SG.abc123xyz&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لكن JSON هو الافتراضي الأفضل. ألجأ إليه دائمًا تقريبًا. فمعظم بيانات الاعتماد لها قيم مترابطة متعددة—مفتاح API وسر، أو اسم مستخدم وكلمة مرور، أو معرّف عميل وسر عميل. وتخزينها معًا ككائن JSON يُبقيها متزامنة.</p>
<h2 id="مع-sdk">مع SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">SecretsManagerClient</span>,
  <span class="hljs-title class_">CreateSecretCommand</span>,
  <span class="hljs-title class_">GetSecretValueCommand</span>,
  <span class="hljs-title class_">UpdateSecretCommand</span>,
  <span class="hljs-title class_">RotateSecretCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-secrets-manager&#x27;</span>;

<span class="hljs-keyword">const</span> secrets = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SecretsManagerClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">await</span> secrets.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateSecretCommand</span>({
    <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/stripe-key&#x27;</span>,
    <span class="hljs-title class_">SecretString</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">apiKey</span>: <span class="hljs-string">&#x27;sk_live_abc123xyz&#x27;</span>,
      <span class="hljs-attr">webhookSecret</span>: <span class="hljs-string">&#x27;whsec_def456&#x27;</span>,
    }),
  }),
);

<span class="hljs-keyword">const</span> value = <span class="hljs-keyword">await</span> secrets.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetSecretValueCommand</span>({ <span class="hljs-title class_">SecretId</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/stripe-key&#x27;</span> }),
);
<span class="hljs-keyword">const</span> { apiKey, webhookSecret } = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(value.<span class="hljs-property">SecretString</span>!);

<span class="hljs-comment">// Rotate on a schedule:</span>
<span class="hljs-keyword">await</span> secrets.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">RotateSecretCommand</span>({
    <span class="hljs-title class_">SecretId</span>: <span class="hljs-string">&#x27;/my-frontend-app/production/database-password&#x27;</span>,
    <span class="hljs-title class_">RotationLambdaARN</span>: <span class="hljs-string">&#x27;arn:aws:lambda:us-east-1:123456789012:function:my-rotation-function&#x27;</span>,
    <span class="hljs-title class_">RotationRules</span>: { <span class="hljs-title class_">AutomaticallyAfterDays</span>: <span class="hljs-number">30</span> },
  }),
);
</code></pre>
<h2 id="استرجاع-سر">استرجاع سر</h2>
<pre><code class="language-bash">aws secretsmanager get-secret-value \\
  --secret-id <span class="hljs-string">&quot;/my-frontend-app/production/stripe-key&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن الاستجابة القيمة المفكوكة التشفير:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/stripe-key-AbCdEf&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/my-frontend-app/production/stripe-key&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;VersionId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-5678-90ab-cdef-EXAMPLE11111&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;SecretString&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;apiKey\\&quot;:\\&quot;sk_live_abc123xyz\\&quot;,\\&quot;webhookSecret\\&quot;:\\&quot;whsec_def456\\&quot;}&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;VersionStages&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;AWSCURRENT&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CreatedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T10:00:00.000Z&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يحتوي حقل <code>SecretString</code> على قيمتك المفكوكة التشفير. وإذا خزّنت JSON، فأنت تحلّله في كود تطبيقك.</p>
<h2 id="التشفير-باستخدام-kms">التشفير باستخدام KMS</h2>
<p>كل سر في Secrets Manager مشفّر بمفتاح KMS. يستخدم Secrets Manager افتراضيًا مفتاحًا مُدارًا من AWS (<code>aws/secretsmanager</code>). يمكنك أيضًا تحديد مفتاح KMS مُدار من العميل عند إنشاء السر:</p>
<pre><code class="language-bash">aws secretsmanager create-secret \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/database-password&quot;</span> \\
  --secret-string <span class="hljs-string">&quot;my-database-password-here&quot;</span> \\
  --kms-key-id <span class="hljs-string">&quot;arn:aws:kms:us-east-1:123456789012:key/1a2b3c4d-5678-90ab-cdef-EXAMPLE22222&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لماذا قد تستخدم مفتاحًا مُدارًا من العميل؟ لسببين. أولًا، يتيح لك التحكم فيمن يمكنه فكّ تشفير السر بشكل مستقل عن من يمكنه الوصول إلى Secrets Manager. ثانيًا، يتيح لك تتبّع استخدام مفتاح KMS في CloudTrail، ما يمنحك مسار تدقيق منفصلًا لعمليات فكّ التشفير.</p>
<p>بالنسبة إلى معظم التطبيقات الأمامية، المفتاح الافتراضي المُدار من AWS كافٍ. ستستخدم مفتاحًا مُدارًا من العميل عندما تتطلب سياسة الأمان في مؤسستك ذلك، أو عندما تحتاج إلى مشاركة الأسرار بين حسابات AWS (الوصول بين الحسابات يتطلب مفتاحًا مُدارًا من العميل).</p>
<h2 id="التدوير-التلقائي">التدوير التلقائي</h2>
<p>هذه هي الميزة التي تفصل Secrets Manager عن كل شيء آخر. يمكنك تهيئة سر ليدور تلقائيًا وفق جدول—كل 30 يومًا، أو كل 7 أيام، أو أي شيء تتطلبه سياسة الأمان لديك.</p>
<p>يعمل التدوير عبر دالة Lambda. عندما يُطلق جدول التدوير، يستدعي Secrets Manager دالة Lambda للتدوير تقوم بما يلي:</p>
<ol>
<li>إنشاء بيانات اعتماد جديدة لدى الخدمة الخارجية (مثلًا، توليد كلمة مرور قاعدة بيانات جديدة)</li>
<li>تخزين بيانات الاعتماد الجديدة في Secrets Manager كنسخة معلّقة</li>
<li>اختبار بيانات الاعتماد الجديدة للتأكد من أنها تعمل</li>
<li>ترقية بيانات الاعتماد الجديدة إلى النسخة الحالية</li>
</ol>
<p>بالنسبة إلى الخدمات الأصلية في AWS مثل RDS وRedshift وDocumentDB، توفّر AWS دوال Lambda جاهزة للتدوير. تُفعّل التدوير بأمر CLI واحد:</p>
<pre><code class="language-bash">aws secretsmanager rotate-secret \\
  --secret-id <span class="hljs-string">&quot;/my-frontend-app/production/database-password&quot;</span> \\
  --rotation-lambda-arn <span class="hljs-string">&quot;arn:aws:lambda:us-east-1:123456789012:function:my-rotation-function&quot;</span> \\
  --rotation-rules <span class="hljs-string">&#x27;{&quot;AutomaticallyAfterDays&quot;: 30}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>أما خدمات الطرف الثالث (Stripe وSendGrid وTwilio)، فأنت تكتب دالة Lambda للتدوير خاصة بك تستدعي واجهة الخدمة البرمجية لتوليد مفتاح جديد.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا كانت قاعدة بيانات RDS أو Aurora لديك داخل VPC خاصة (وهو الافتراضي لأي شيء بمستوى الإنتاج)، فيجب أن تعمل دالة Lambda للتدوير داخل VPC نفسها أيضًا، <em>ويجب</em> أن تكون لتلك VPC <strong>نقطة نهاية VPC لـ Secrets Manager</strong> (<code>com.amazonaws.us-east-1.secretsmanager</code>). فمن دون نقطة النهاية، لا تستطيع دالة Lambda للتدوير الوصول إلى واجهة Secrets Manager البرمجية لتأكيد النجاح، ويفشل التدوير بصمت مع أخطاء مهلة غامضة. هذا هو السبب الأكثر شيوعًا لتعطّل تدوير RDS بعد الإعداد الأولي.</p>
</blockquote>
<blockquote>
<p><strong>تحذير</strong></p>
<p>التدوير التلقائي يعني أن تطبيقك يجب أن يتعامل مع تغيّر بيانات الاعتماد بلطف. إذا خزّنت دالة Lambda سرًا مؤقتًا وقت التهيئة ولم تحدّثه أبدًا، فستسبب بيانات الاعتماد المدوّرة أعطالًا حتى البدء البارد التالي. الحل هو التخزين المؤقت مع TTL وإعادة الجلب عند انتهاء صلاحية الذاكرة المؤقتة. يغطي الدرس التالي استراتيجيات التخزين المؤقت بالتفصيل.</p>
</blockquote>
<h2 id="مراحل-النسخ">مراحل النسخ</h2>
<p>يستخدم Secrets Manager <strong>مراحل النسخ</strong> لإدارة التدوير دون توقف. المرحلتان المهمتان هما:</p>
<ul>
<li><strong><code>AWSCURRENT</code></strong>—النسخة النشطة. وهي ما يحصل عليه تطبيقك افتراضيًا عند استرجاع السر.</li>
<li><strong><code>AWSPENDING</code></strong>—النسخة التي تُختبر أثناء التدوير. وبمجرد التحقق منها، تصبح <code>AWSCURRENT</code>.</li>
</ul>
<p>ثمة أيضًا <strong><code>AWSPREVIOUS</code></strong>—النسخة القديمة، محفوظة كي تستطيع التطبيقات التي خزّنت القيمة السابقة مؤقتًا أن تصادق خلال نافذة التدوير. هكذا يعمل التدوير دون توقف: تظل بيانات الاعتماد القديمة صالحة حتى تُلغيها دالة Lambda للتدوير صراحةً.</p>
<h2 id="التسعير">التسعير</h2>
<p>Secrets Manager ليس مجانيًا. إليك تفصيل التكلفة:</p>
<table>
<thead>
<tr>
<th>المكوّن</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td>التخزين</td>
<td>0.40 دولار لكل سر شهريًا</td>
</tr>
<tr>
<td>استدعاءات API</td>
<td>0.05 دولار لكل 10,000 استدعاء API</td>
</tr>
</tbody>
</table>
<p>عشرة أسرار تكلف 4.00 دولارات شهريًا. ومئة سر تكلف 40.00 دولارًا شهريًا. تكلفة استدعاءات API ضئيلة لمعظم التطبيقات—فدالة Lambda تسترجع سرًا مرة واحدة لكل بدء بارد تولّد استدعاءات API قليلة جدًا.</p>
<p>قارن هذا بالطبقة القياسية من Parameter Store، وهي مجانية. لتطبيق أمامي ببضعة أسرار لا تحتاج إلى تدوير تلقائي، يصعب تبرير 0.40 دولار لكل سر شهريًا. أما بيانات اعتماد قاعدة بيانات يجب أن تدور كل 30 يومًا دون توقف، فهي تستحق كل قرش.</p>
<h2 id="متى-يستحق-secrets-manager">متى يستحق Secrets Manager</h2>
<p>استخدم Secrets Manager عندما:</p>
<ul>
<li><strong>تحتاج إلى تدوير تلقائي.</strong> هذا هو الفارق الأساسي. إذا كانت بيانات اعتماد تحتاج إلى التدوير وفق جدول—كلمات مرور قواعد البيانات، ومفاتيح حسابات الخدمات—فإن Secrets Manager هو الأداة.</li>
<li><strong>تستخدم RDS أو Redshift أو DocumentDB.</strong> توفّر AWS دوال تدوير جاهزة لهذه الخدمات. التدوير شبه جاهز بالكامل.</li>
<li><strong>تتطلب مؤسستك إدارة دورة حياة بيانات الاعتماد.</strong> يتتبّع Secrets Manager تواريخ الإنشاء والتدوير وسجل النسخ. وفرق الامتثال تحب ذلك.</li>
<li><strong>تحتاج إلى تكرار بين المناطق.</strong> يستطيع Secrets Manager تكرار الأسرار إلى مناطق متعددة لاستعادة الكوارث.</li>
</ul>
<p>استخدم Parameter Store SecureString عندما:</p>
<ul>
<li><strong>لا تحتاج بيانات الاعتماد إلى تدوير تلقائي.</strong> مفتاح API لطرف ثالث تحدّثه يدويًا مرة في السنة لا يحتاج إلى Secrets Manager.</li>
<li><strong>التكلفة مهمة.</strong> الطبقة القياسية من Parameter Store مجانية. لمشروع شخصي أو شركة ناشئة في مرحلة مبكرة، يصعب التغلّب على المجاني.</li>
<li><strong>تريد تخزين الإعدادات والأسرار في المكان نفسه.</strong> يتعامل Parameter Store مع كليهما ببنية مسارات هرمية.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>من الأنماط الشائعة استخدام كليهما: Parameter Store للإعدادات غير الحساسة والأسرار التي لا تدور، وSecrets Manager لبيانات اعتماد قواعد البيانات وغيرها من الأسرار التي تحتاج إلى تدوير تلقائي. إنهما ليسا خدمتين متنافستين—بل يكمّل إحداهما الآخر.</p>
</blockquote>
<h2 id="تحديث-سر">تحديث سر</h2>
<p>لتحديث قيمة سر:</p>
<pre><code class="language-bash">aws secretsmanager put-secret-value \\
  --secret-id <span class="hljs-string">&quot;/my-frontend-app/production/stripe-key&quot;</span> \\
  --secret-string <span class="hljs-string">&#x27;{&quot;apiKey&quot;:&quot;sk_live_newkey789&quot;,&quot;webhookSecret&quot;:&quot;whsec_newsecret456&quot;}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>هذا ينشئ نسخة جديدة من السر. وتنتقل النسخة السابقة إلى مرحلة <code>AWSPREVIOUS</code>.</p>
<h2 id="حذف-سر">حذف سر</h2>
<p>لا يحذف Secrets Manager الأسرار فورًا. بل يجدول الحذف بنافذة استرداد:</p>
<pre><code class="language-bash">aws secretsmanager delete-secret \\
  --secret-id <span class="hljs-string">&quot;/my-frontend-app/production/stripe-key&quot;</span> \\
  --recovery-window-in-days 7 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>خلال نافذة الاسترداد (7 أيام كحد أدنى، و30 يومًا افتراضيًا)، يمكنك استعادة السر. وهذا يحمي من الحذف غير المقصود. وإذا كنت متأكدًا تمامًا وتريد تخطي نافذة الاسترداد، فأضف <code>--force-delete-without-recovery</code>، لكن فكّر مرتين قبل استخدامه.</p>
<p>أنت تعرف الآن أين تخزّن الأسرار. السؤال التالي: كيف تقرأها دالة Lambda الخاصة بك فعليًا وقت التشغيل؟ يغطي الدرس التالي استدعاءات SDK، وأذونات IAM، واستراتيجيات التخزين المؤقت التي تجعل استرجاع الأسرار فعّالًا.</p>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:p};export{s as book,r as chapter,n as chapterTitle,o as default,e as headings,p as html,a as slug,t as title};
