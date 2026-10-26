const s="kinney",c="aws",n="نشر تطبيقات الويب على AWS",a="cicd-with-github-actions",t="CI/CD باستخدام GitHub Actions",p=[{depth:2,id:"المصادقة-oidc-مقابل-مفاتيح-الوصول",text:"المصادقة: OIDC مقابل مفاتيح الوصول"},{depth:2,id:"إعداد-oidc-الجانب-الخاص-بـ-aws",text:"إعداد OIDC: الجانب الخاص بـ AWS"},{depth:3,id:"إنشاء-موفر-هوية-oidc-الخاص-بـ-github",text:"إنشاء موفّر هوية OIDC الخاص بـ GitHub"},{depth:3,id:"إنشاء-دور-iam-من-أجل-github-actions",text:"إنشاء دور IAM من أجل GitHub Actions"},{depth:3,id:"إرفاق-الأذونات-بالدور",text:"إرفاق الأذونات بالدور"},{depth:2,id:"سير-عمل-github-actions",text:"سير عمل GitHub Actions"},{depth:2,id:"تفكيك-سير-العمل",text:"تفكيك سير العمل"},{depth:3,id:"المشغل",text:"المُشغِّل"},{depth:3,id:"الأذونات",text:"الأذونات"},{depth:3,id:"بيانات-اعتماد-aws",text:"بيانات اعتماد AWS"},{depth:3,id:"خطوات-النشر",text:"خطوات النشر"},{depth:2,id:"تهيئة-الأسرار-إذا-كنت-تستخدم-مفاتيح-الوصول",text:"تهيئة الأسرار (إذا كنت تستخدم مفاتيح الوصول)"},{depth:2,id:"التحقق-من-سير-العمل",text:"التحقّق من سير العمل"},{depth:2,id:"المشكلات-الشائعة",text:"المشكلات الشائعة"}],l=`<p>لديك سكربت نشر يعمل. تشغّله من حاسوبك المحمول، فيرفع إلى S3، ويبطل ذاكرة CloudFront المؤقتة، ويُحدَّث الموقع. المشكلة: عليك أن تتذكّر تشغيله. و«أنت» نقطة فشل واحدة. فإن كنت في إجازة، فلا أحد ينشر. وإن نشرت من شجرة عمل غير نظيفة، انتقلت شيفرة معطوبة إلى الإنتاج. وإن تعطّل حاسوبك في منتصف النشر، بقي الموقع في حالة نصف محدّثة.</p>
<p>إن أردت الجانب الخاص بـ AWS من خط الأنابيب هذا مفتوحًا في تبويب آخر، فأبقِ <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html">دليل IAM لإدارة مفاتيح الوصول</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html">مرجع الأمر <code>aws s3 sync</code></a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html">مرجع الأمر <code>aws cloudfront create-invalidation</code></a> في متناول يدك.</p>
<p>CI/CD يصلح هذا. ادفع إلى <code>main</code>، فيعمل خط الأنابيب، وينتشر الموقع. بلا تدخّل بشري في الحلقة. يعدّ هذا الدرس سير عمل GitHub Actions يفعل بالضبط ما يفعله سكربت النشر لديك — لكن مُشغَّلًا تلقائيًا عند كل دفعة.</p>
<h2 id="المصادقة-oidc-مقابل-مفاتيح-الوصول">المصادقة: OIDC مقابل مفاتيح الوصول</h2>
<p>قبل كتابة سير العمل، تحتاج إلى تحديد كيفية مصادقة GitHub Actions مع AWS. وهناك مقاربتان:</p>
<p><strong>مفاتيح وصول طويلة الأجل</strong>: أنشئ مستخدم IAM (مثل <code>deploy-bot</code> من <a href="https://stevekinney.com/courses/aws/iam-policy-exercise">تمرين سياسة IAM لروبوت النشر</a>)، وولّد مفاتيح وصول، وخزّنها كأسرار في مستودع GitHub. ويستخدم سير العمل تلك البيانات في كل تشغيل.</p>
<p><strong>OIDC (OpenID Connect)</strong>: تطلب GitHub Actions رمزًا قصير الأجل من AWS باستخدام هوية اتحادية. فلا تُخزَّن أسرار طويلة الأجل في أي مكان. وتثق AWS بموفّر هوية GitHub، وتتحقّق من الرمز، وتعيد بيانات اعتماد مؤقتة تنتهي بعد انتهاء سير العمل.</p>
<p>OIDC هو الخيار الأفضل، وأذهب إلى حدّ القول إنه ينبغي أن يكون خيارك الافتراضي. فمفاتيح الوصول أسرار ثابتة يمكن أن تتسرّب — فإن وصل أحد إلى أسرار مستودعك، صارت لديه بيانات اعتماد AWS دائمة. أما رموز OIDC فنطاقها محدود بتشغيل واحد لسير العمل، وتنتهي تلقائيًا. ولهذا السبب توصي كل من AWS وGitHub بـ OIDC.</p>
<h2 id="إعداد-oidc-الجانب-الخاص-بـ-aws">إعداد OIDC: الجانب الخاص بـ AWS</h2>
<p>تحتاج إلى فعل شيئين في AWS: إنشاء موفّر هوية، وإنشاء دور IAM يمكن لـ GitHub Actions افتراضه.</p>
<h3 id="إنشاء-موفر-هوية-oidc-الخاص-بـ-github">إنشاء موفّر هوية OIDC الخاص بـ GitHub</h3>
<p>هذا يخبر AWS أن تثق بالرموز التي تصدرها نقطة نهاية OIDC الخاصة بـ GitHub.</p>
<p>أعلنت AWS <a href="https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/">في 2023</a> أنها لم تعد تتحقّق من بصمة الإبهام لموفّر OIDC الخاص بـ GitHub، لكن واجهة IAM البرمجية ما زالت تتطلّب سلسلة سداسية عشرية من 40 حرفًا. فالحقل مطلوب نحويًا ومتجاهَل تشغيليًا لنقطة نهاية GitHub اليوم. ولديك خياران:</p>
<p><strong>الخيار 1: ثبّت بصمة الإبهام الحالية ديناميكيًا.</strong> اجلبها بـ <code>openssl</code> حتى لا تلصق قيمة قديمة:</p>
<pre><code class="language-bash">THUMBPRINT=$(openssl s_client -servername token.actions.githubusercontent.com \\
    -showcerts -connect token.actions.githubusercontent.com:443 &lt;/dev/null 2&gt;/dev/null \\
  | openssl x509 -fingerprint -noout -sha1 \\
  | <span class="hljs-built_in">cut</span> -d<span class="hljs-string">&#x27;=&#x27;</span> -f2 | <span class="hljs-built_in">tr</span> -d <span class="hljs-string">&#x27;:&#x27;</span> | <span class="hljs-built_in">tr</span> <span class="hljs-string">&#x27;[:upper:]&#x27;</span> <span class="hljs-string">&#x27;[:lower:]&#x27;</span>)

aws iam create-open-id-connect-provider \\
  --url <span class="hljs-string">&quot;https://token.actions.githubusercontent.com&quot;</span> \\
  --client-id-list <span class="hljs-string">&quot;sts.amazonaws.com&quot;</span> \\
  --thumbprint-list <span class="hljs-string">&quot;<span class="hljs-variable">$THUMBPRINT</span>&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p><strong>الخيار 2: مرّر أي سلسلة سداسية عشرية صحيحة نحويًا.</strong> بما أن AWS تتجاهل هذه القيمة لنقطة نهاية GitHub، فإن قيمة بديلة تعمل:</p>
<pre><code class="language-bash">aws iam create-open-id-connect-provider \\
  --url <span class="hljs-string">&quot;https://token.actions.githubusercontent.com&quot;</span> \\
  --client-id-list <span class="hljs-string">&quot;sts.amazonaws.com&quot;</span> \\
  --thumbprint-list <span class="hljs-string">&quot;6938fd4d98bab03faadb97b34396831e3780aea1&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>استخدم الخيار 1 في السكربتات التي ستشغّلها على موفّري هوية متعددين؛ أما الخيار 2 فيكفي لمرة واحدة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تحتاج إلى إنشاء موفّر الهوية هذا إلا مرة واحدة لكل حساب AWS. فإن كان لديك مستودعات متعددة تنشر إلى الحساب نفسه، فكلها تتشارك هذا الموفّر. ويحصل كل مستودع على دور IAM خاص به بأذونات محدودة النطاق.</p>
</blockquote>
<h3 id="إنشاء-دور-iam-من-أجل-github-actions">إنشاء دور IAM من أجل GitHub Actions</h3>
<p>أنشئ سياسة ثقة تسمح لـ GitHub Actions بافتراض هذا الدور، مقيّدة بمستودعك المحدّد:</p>
<p>احفظ هذا باسم <code>github-actions-trust-policy.json</code> (متوفر أيضًا في <a href="https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/github-actions-trust-policy.json">مستودع Scratch Lab</a>):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Federated&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRoleWithWebIdentity&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;token.actions.githubusercontent.com:aud&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;token.actions.githubusercontent.com:sub&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;repo:your-org/your-repo:ref:refs/heads/main&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>كتلة <code>Condition</code> حرجة. فبدونها، يمكن <em>أي</em> مستودع GitHub أن يفترض هذا الدور. وشرط <code>sub</code> يقيّده بالدفعات إلى فرع <code>main</code> في مستودعك المحدّد. واستبدل <code>your-org/your-repo</code> باسم مؤسستك ومستودعك الفعليين في GitHub. والشرطان كلاهما في <code>StringEquals</code> لأن قيمة <code>sub</code> نصّ حرفي تام — ولا تستخدم <code>StringLike</code> إلا حين يتضمّن النمط حرف بدل (<code>*</code>).</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تستخدم <code>&quot;StringLike&quot;: {&quot;token.actions.githubusercontent.com:sub&quot;: &quot;repo:your-org/your-repo:*&quot;}</code> مع حرف بدل في النهاية. فذلك يسمح لأي فرع، وأي طلب سحب، وأي وسم في مستودعك بافتراض الدور. وقيّده بـ <code>ref:refs/heads/main</code> إن كنت تريد عمليات نشر الإنتاج من الفرع الرئيسي فقط.</p>
</blockquote>
<p>وكبديل للثقة المقيّدة بالفرع، يمكنك تقييد الثقة ببيئة GitHub (مثل <code>production</code>) باستخدام <code>&quot;repo:your-org/your-repo:environment:production&quot;</code> كنمط <code>sub</code>. وتدعم بيئات GitHub المراجعين المطلوبين ومؤقّتات الانتظار، ما يعني أن دور AWS لا يمكن افتراضه حتى يوافق إنسان على النشر في واجهة GitHub. وهذا هو النمط الذي تريده لأحمال العمل التي يجب ألا تصل فيها عمليات الدمج العارضة على الفرع الرئيسي إلى الإنتاج.</p>
<p>ملاحظة: أحداث <code>pull_request</code> من النسخ المتشعّبة تولّد قيم <code>sub</code> تحتوي <code>pull_request</code>، لا <code>refs/heads/main</code>، لذا لن تسمح سياسة ثقة مقيّدة بالفرع لطلب سحب من نسخة متشعّبة بافتراض الدور عن غير قصد. لكن لا تعمّم هذا السلوك على موفّري OIDC آخرين — فـ AWS تتعامل مع GitHub معاملة خاصة فقط.</p>
<p>أنشئ الدور:</p>
<pre><code class="language-bash">aws iam create-role \\
  --role-name GitHubActionsDeployRole \\
  --assume-role-policy-document file://github-actions-trust-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="إرفاق-الأذونات-بالدور">إرفاق الأذونات بالدور</h3>
<p>يحتاج الدور إلى الأذونات نفسها التي يملكها روبوت النشر: مزامنة S3 وإبطال ذاكرة CloudFront. وقد كتبت هذه السياسة بالفعل في <a href="https://stevekinney.com/courses/aws/iam-policy-exercise">تمرين سياسة IAM لروبوت النشر</a>. أرفقها بالدور الجديد:</p>
<pre><code class="language-bash">aws iam attach-role-policy \\
  --role-name GitHubActionsDeployRole \\
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \\
  --region us-east-1
</code></pre>
<p>يمكنك إعادة استخدام <code>DeployBotPolicy</code> نفسها تمامًا — فالأذونات لا تتغيّر لمجرد أن المبدأ دور لا مستخدم. وهذا تطبيق لمبدأ الامتياز الأدنى الذي تعلمته في <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ الامتياز الأدنى</a> على خط أنابيب CI/CD لديك: دور النشر يمكنه مزامنة الملفات وإبطال الذاكرات المؤقتة، ولا شيء غير ذلك.</p>
<h2 id="سير-عمل-github-actions">سير عمل GitHub Actions</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ملف سير العمل هذا متوفر في <a href="https://github.com/stevekinney/scratch-lab/blob/main/.github/workflows/deploy.yml">مستودع Scratch Lab</a>.</p>
</blockquote>
<p>أنشئ ملف سير العمل في <code>.github/workflows/deploy.yml</code>:</p>
<pre><code class="language-yaml"><span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span> <span class="hljs-string">to</span> <span class="hljs-string">AWS</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">main</span>

<span class="hljs-attr">permissions:</span>
  <span class="hljs-attr">id-token:</span> <span class="hljs-string">write</span>
  <span class="hljs-attr">contents:</span> <span class="hljs-string">read</span>

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Checkout</span> <span class="hljs-string">code</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v4</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Set</span> <span class="hljs-string">up</span> <span class="hljs-string">Node.js</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-number">22</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">npm</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Build</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">run</span> <span class="hljs-string">build</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Configure</span> <span class="hljs-string">AWS</span> <span class="hljs-string">credentials</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">aws-actions/configure-aws-credentials@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">role-to-assume:</span> <span class="hljs-string">arn:aws:iam::123456789012:role/GitHubActionsDeployRole</span>
          <span class="hljs-attr">aws-region:</span> <span class="hljs-string">us-east-1</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Deploy</span> <span class="hljs-string">to</span> <span class="hljs-string">S3</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">|
          aws s3 sync ./build/assets s3://my-frontend-app-assets/assets \\
            --cache-control &quot;public, max-age=31536000, immutable&quot; \\
            --region us-east-1 \\
            --delete \\
            --output json
</span>
          <span class="hljs-string">aws</span> <span class="hljs-string">s3</span> <span class="hljs-string">cp</span> <span class="hljs-string">./build/index.html</span> <span class="hljs-string">s3://my-frontend-app-assets/index.html</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--cache-control</span> <span class="hljs-string">&quot;public, max-age=60&quot;</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--content-type</span> <span class="hljs-string">&quot;text/html&quot;</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--region</span> <span class="hljs-string">us-east-1</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--output</span> <span class="hljs-string">json</span>

          <span class="hljs-string">aws</span> <span class="hljs-string">s3</span> <span class="hljs-string">sync</span> <span class="hljs-string">./build</span> <span class="hljs-string">s3://my-frontend-app-assets</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--exclude</span> <span class="hljs-string">&quot;assets/*&quot;</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--exclude</span> <span class="hljs-string">&quot;index.html&quot;</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--region</span> <span class="hljs-string">us-east-1</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--delete</span> <span class="hljs-string">\\</span>
            <span class="hljs-string">--output</span> <span class="hljs-string">json</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Invalidate</span> <span class="hljs-string">CloudFront</span> <span class="hljs-string">cache</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">|
          aws cloudfront create-invalidation \\
            --distribution-id E1A2B3C4D5E6F7 \\
            --paths &quot;/*&quot; \\
            --region us-east-1 \\
            --output json
</span></code></pre>
<p>هذا هو سير العمل كاملًا. ادفع إلى <code>main</code> فيبني وينشر ويبطل الذاكرة المؤقتة.</p>
<h2 id="تفكيك-سير-العمل">تفكيك سير العمل</h2>
<h3 id="المشغل">المُشغِّل</h3>
<pre><code class="language-yaml"><span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">main</span>
</code></pre>
<p>يعمل سير العمل عند كل دفعة إلى <code>main</code>. وطلبات السحب لا تشغّل نشرًا. والدفعات إلى فروع الميزات لا تشغّل نشرًا. ولا تؤدي إلى نشر إنتاجي إلا عمليات الدمج إلى <code>main</code>.</p>
<h3 id="الأذونات">الأذونات</h3>
<pre><code class="language-yaml"><span class="hljs-attr">permissions:</span>
  <span class="hljs-attr">id-token:</span> <span class="hljs-string">write</span>
  <span class="hljs-attr">contents:</span> <span class="hljs-string">read</span>
</code></pre>
<p>إذن <code>id-token: write</code> مطلوب لـ OIDC. فهو يسمح لسير العمل بطلب JWT من نقطة نهاية OIDC الخاصة بـ GitHub. وإذن <code>contents: read</code> يتيح لسير العمل سحب شيفرة المستودع. وبدون <code>id-token: write</code>، تفشل خطوة <code>aws-actions/configure-aws-credentials</code> بخطأ بيانات اعتماد.</p>
<h3 id="بيانات-اعتماد-aws">بيانات اعتماد AWS</h3>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Configure</span> <span class="hljs-string">AWS</span> <span class="hljs-string">credentials</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">aws-actions/configure-aws-credentials@v4</span>
  <span class="hljs-attr">with:</span>
    <span class="hljs-attr">role-to-assume:</span> <span class="hljs-string">arn:aws:iam::123456789012:role/GitHubActionsDeployRole</span>
    <span class="hljs-attr">aws-region:</span> <span class="hljs-string">us-east-1</span>
</code></pre>
<p>تستخدم هذه الخطوة إجراء <code>aws-actions/configure-aws-credentials</code> لتبادل رمز OIDC الخاص بـ GitHub ببيانات اعتماد AWS مؤقتة. وتُصدَّر بيانات الاعتماد كمتغيّرات بيئة (<code>AWS_ACCESS_KEY_ID</code> و<code>AWS_SECRET_ACCESS_KEY</code> و<code>AWS_SESSION_TOKEN</code>) تلتقطها أوامر <code>aws</code> اللاحقة تلقائيًا. وتنتهي بيانات الاعتماد عند انتهاء سير العمل.</p>
<h3 id="خطوات-النشر">خطوات النشر</h3>
<p>خطوات النشر هي عملية الرفع نفسها على ثلاث مراحل من <a href="https://stevekinney.com/courses/aws/automating-deploys-with-aws-cli">سكربت النشر في الدرس السابق</a>: أصول مجزّأة بترويسات تخزين مؤقت طويلة الأجل، و<code>index.html</code> بمدة TTL قصيرة، وكل ما عدا ذلك بالإعدادات الافتراضية. وخطوة الإبطال تمسح ذاكرة CloudFront المؤقتة.</p>
<h2 id="تهيئة-الأسرار-إذا-كنت-تستخدم-مفاتيح-الوصول">تهيئة الأسرار (إذا كنت تستخدم مفاتيح الوصول)</h2>
<p>إن لم تستطع استخدام OIDC (فبعض المؤسسات تفرض قيودًا على موفّري الهوية)، فالبديل هو تخزين مفاتيح الوصول كأسرار في مستودع GitHub. اذهب إلى <strong>Settings</strong> &gt; <strong>Secrets and variables</strong> &gt; <strong>Actions</strong> في مستودعك وأضف:</p>
<ul>
<li><code>AWS_ACCESS_KEY_ID</code>: معرّف مفتاح الوصول من مستخدم روبوت النشر.</li>
<li><code>AWS_SECRET_ACCESS_KEY</code>: مفتاح الوصول السرّي من مستخدم روبوت النشر.</li>
</ul>
<p>ثم استبدل خطوة بيانات الاعتماد في سير العمل:</p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Configure</span> <span class="hljs-string">AWS</span> <span class="hljs-string">credentials</span>
  <span class="hljs-attr">uses:</span> <span class="hljs-string">aws-actions/configure-aws-credentials@v4</span>
  <span class="hljs-attr">with:</span>
    <span class="hljs-attr">aws-access-key-id:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.AWS_ACCESS_KEY_ID</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">aws-secret-access-key:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.AWS_SECRET_ACCESS_KEY</span> <span class="hljs-string">}}</span>
    <span class="hljs-attr">aws-region:</span> <span class="hljs-string">us-east-1</span>
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>مفاتيح الوصول المخزّنة كأسرار في المستودع بيانات اعتماد طويلة الأجل. فإن وصل أحد إلى إعدادات مستودعك، صارت لديه بيانات اعتماد AWS الخاصة بك. دوّر مفاتيح الوصول بانتظام وقيّد سياسة مستخدم IAM بأضيق نطاق ممكن — وهذا بالضبط ما صُمّم له <a href="https://stevekinney.com/courses/aws/iam-policy-exercise">تمرين سياسة IAM لروبوت النشر</a>. أما OIDC فيتجنّب هذا الخطر كليًا.</p>
</blockquote>
<h2 id="التحقق-من-سير-العمل">التحقّق من سير العمل</h2>
<p>بعد دفع ملف سير العمل إلى <code>main</code>، اذهب إلى تبويب <strong>Actions</strong> في مستودعك على GitHub. ينبغي أن ترى سير عمل «Deploy to AWS» قيد التشغيل. وكل خطوة تعرض مخرجاتها:</p>
<ul>
<li><strong>Checkout</strong>: يسحب الشيفرة.</li>
<li><strong>Setup Node.js</strong>: يثبّت Node 22.</li>
<li><strong>Install dependencies</strong>: يشغّل <code>npm ci</code> (تثبيت نظيف، أسرع من <code>npm install</code> في CI).</li>
<li><strong>Build</strong>: يشغّل أمر البناء لديك.</li>
<li><strong>Configure AWS credentials</strong>: يبادل رمز OIDC ببيانات اعتماد مؤقتة.</li>
<li><strong>Deploy to S3</strong>: يعرض مخرجات <code>aws s3 sync</code> بما فيها الملفات المرفوعة والمحذوفة.</li>
<li><strong>Invalidate CloudFront cache</strong>: يعرض معرّف الإبطال.</li>
</ul>
<p>إن فشلت أي خطوة، يتوقّف سير العمل ولا تعمل الخطوات التالية. والبناء الفاشل لا يؤدي إلى نشر جزئي.</p>
<h2 id="المشكلات-الشائعة">المشكلات الشائعة</h2>
<p><strong>«Credentials could not be loaded»</strong>: موفّر هوية OIDC غير موجود في حساب AWS لديك، أو سياسة ثقة الدور لا تطابق مستودعك وفرعك. تحقّق مرتين من شرط <code>sub</code> في سياسة الثقة.</p>
<p><strong>«AccessDenied» على S3 أو CloudFront</strong>: الدور موجود وبيانات الاعتماد تعمل، لكن السياسة المرفقة لا تمنح الأذونات المطلوبة. تحقّق من أن السياسة تسمح بـ <code>s3:PutObject</code> و<code>s3:DeleteObject</code> و<code>s3:ListBucket</code> و<code>cloudfront:CreateInvalidation</code> على الموارد الصحيحة.</p>
<p><strong>البناء ينجح لكن الملفات لا تتحدّث</strong>: اكتملت مزامنة S3، لكنك نسيت خطوة الإبطال. فـ CloudFront ما زال يقدّم نسخًا مخزّنة مؤقتًا. أضف خطوة <code>create-invalidation</code> أو انتظر انتهاء مدة TTL للذاكرة المؤقتة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمكنك إضافة خطوة تحقّق أخيرة إلى سير العمل تفحص النشر:</p>
<pre><code class="language-yaml"><span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Verify</span> <span class="hljs-string">deployment</span>
  <span class="hljs-attr">run:</span> <span class="hljs-string">|
    HTTP_STATUS=$(curl -s -o /dev/null -w &quot;%{http_code}&quot; https://YOUR_CLOUDFRONT_DOMAIN)
    echo &quot;Site returned HTTP $HTTP_STATUS&quot;
</span></code></pre>
<p>استبدل <code>YOUR_CLOUDFRONT_DOMAIN</code> بعنوان URL الخاص بك <code>*.cloudfront.net</code> (أو بنطاقك المخصّص إن أكملت قسم <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">النطاقات المخصّصة وDNS والشهادات</a> الاختياري). هذا لا يوقف سير العمل عند الفشل، لكنه يمنحك تغذية راجعة فورية في سجلات سير العمل.</p>
</blockquote>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,c as chapter,n as chapterTitle,o as default,p as headings,l as html,a as slug,t as title};
