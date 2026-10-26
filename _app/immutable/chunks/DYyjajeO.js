const s="kinney",r="aws",n="نشر تطبيقات الويب على AWS",a="parameter-store-hierarchical-configuration",t="Parameter Store: التهيئة الهرمية",e=[{depth:2,id:"إنشاء-المعاملات-باستخدام-cli",text:"إنشاء المعاملات باستخدام CLI"},{depth:2,id:"المسارات-الهرمية",text:"المسارات الهرمية"},{depth:2,id:"string-مقابل-securestring",text:"String مقابل SecureString"},{depth:2,id:"استرجاع-المعاملات",text:"استرجاع المعاملات"},{depth:3,id:"الحصول-على-معامل-واحد",text:"الحصول على معامل واحد"},{depth:3,id:"الحصول-على-كل-المعاملات-حسب-المسار",text:"الحصول على كل المعاملات حسب المسار"},{depth:2,id:"استرجاع-المعاملات-باستخدام-sdk",text:"استرجاع المعاملات باستخدام SDK"},{depth:2,id:"الطبقة-القياسية-مقابل-الطبقة-المتقدمة",text:"الطبقة القياسية مقابل الطبقة المتقدّمة"},{depth:2,id:"إدارة-الإصدارات",text:"إدارة الإصدارات"},{depth:2,id:"التنظيف",text:"التنظيف"}],p=`<p><strong>Parameter Store</strong> جزء من AWS Systems Manager (SSM). إنه مخزن مفتاح-قيمة لبيانات التهيئة — نفس نوع البيانات التي كنت تضعها في متغيرات بيئة Lambda، لكن مع تشفير وتحكّم في الوصول وإصدارات وفضاء أسماء هرمي مدمج.</p>
<p>إذا أردت نسخة AWS من الميزة نفسها أثناء قراءتك، فإن <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html">توثيق Parameter Store</a> هو المرجع الرسمي.</p>
<p>إذا كانت متغيرات بيئة Lambda أشبه بملف <code>.env</code> مسطّح، فإن Parameter Store أشبه بشجرة تهيئة منظّمة. أجد هذا التمييز مفيدًا لأنه يغيّر طريقة تفكيرك في تنظيم التهيئة. تنظّم المعاملات حسب التطبيق والبيئة والغرض باستخدام مسارات تشبه أدلّة نظام الملفات: <code>/my-frontend-app/production/api-key</code>. وعلى خلاف متغيرات البيئة، يمكنك مشاركة المعاملات بين عدة دوال Lambda دون تكرار القيم.</p>
<p><img src="/arabic-cs-library/images/kinney/a03090c0b84b911b.svg" alt="مخطط يوضح مسارات Parameter Store مجمّعة حسب التطبيق والبيئة، مع سياسة IAM محصورة في شجرة الإنتاج فقط."></p>
<h2 id="إنشاء-المعاملات-باستخدام-cli">إنشاء المعاملات باستخدام CLI</h2>
<p>ينشئ الأمر <code>put-parameter</code> معاملًا جديدًا أو يحدّث معاملًا قائمًا. إليك معامل نص عادي:</p>
<pre><code class="language-bash">aws ssm put-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/table-name&quot;</span> \\
  --value <span class="hljs-string">&quot;my-frontend-app-data&quot;</span> \\
  --<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;String&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمّن الاستجابة رقم الإصدار والطبقة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Tier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Standard&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الآن أنشئ معامل <strong>SecureString</strong> لشيء حسّاس — مفتاح API:</p>
<pre><code class="language-bash">aws ssm put-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/api-key&quot;</span> \\
  --value <span class="hljs-string">&quot;sk_live_abc123xyz&quot;</span> \\
  --<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;SecureString&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>في وحدة التحكم، يعرض نموذج <strong>Create parameter</strong> خيار النوع <strong>SecureString</strong> مع محدّد مفتاح KMS.</p>
<p><img src="/arabic-cs-library/images/kinney/896464961b187605.webp" alt="نموذج Create parameter في AWS Systems Manager Parameter Store يعرض الاسم /my-frontend-app/api-key مملوءًا وSecureString محدّدًا كنوع مع مفتاح KMS الافتراضي."></p>
<p>تُشفَّر القيمة عند السكون باستخدام مفتاح KMS تديره AWS. يمكنك أيضًا تحديد مفتاح KMS خاص بك عبر العلم <code>--key-id</code>، لكن المفتاح الافتراضي يفي بالغرض في معظم حالات الاستخدام.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لتحديث معامل موجود، أضف العلم <code>--overwrite</code>. بدونه يفشل <code>put-parameter</code> إذا كان المعامل موجودًا بالفعل. هذه ميزة أمان — فلا تكتب فوق قيم الإنتاج عن غير قصد.</p>
</blockquote>
<h2 id="المسارات-الهرمية">المسارات الهرمية</h2>
<p>الشرطات المائلة في أسماء المعاملات ليست مجرد مظهر. إنها تحدّد تسلسلًا هرميًا يمكنك الاستعلام عنه، والأهم من ذلك أنها تتيح لك حصر أذونات IAM في أشجار فرعية كاملة.</p>
<p>إليك بنية نموذجية لتطبيق واجهة أمامية ببيئتين:</p>
<pre><code>/my-frontend-app/
├── production/
│   ├── table-name          (String)
│   ├── api-key             (SecureString)
│   ├── api-endpoint        (String)
│   └── feature-flags       (String)
├── staging/
│   ├── table-name          (String)
│   ├── api-key             (SecureString)
│   ├── api-endpoint        (String)
│   └── feature-flags       (String)
</code></pre>
<p>يمنحك هذا التسلسل الهرمي أمرين. أولًا، يمكنك استرجاع جميع معاملات بيئة معيّنة في استدعاء واحد. ثانيًا، يمكنك كتابة سياسة IAM تمنح دالة Lambda وصولًا إلى <code>/my-frontend-app/production/*</code> دون منحها وصولًا إلى معاملات staging.</p>
<p>في وحدة التحكم، تعرض قائمة <strong>Parameter Store</strong> جميع المعاملات في حسابك. يمكنك التصفية حسب المسار لرؤية تسلسل <code>/my-frontend-app/</code> فقط.</p>
<p><img src="/arabic-cs-library/images/kinney/d29c7300d68d8ec6.webp" alt="تعرض قائمة AWS Systems Manager Parameter Store المعاملات بأسمائها وأنواعها وتواريخ آخر تعديل لها."></p>
<p>لنضِف بضعة معاملات أخرى:</p>
<pre><code class="language-bash">aws ssm put-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/api-endpoint&quot;</span> \\
  --value <span class="hljs-string">&quot;https://api.example.com/v1&quot;</span> \\
  --<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;String&quot;</span> \\
  --region us-east-1 \\
  --output json

aws ssm put-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/feature-flags&quot;</span> \\
  --value <span class="hljs-string">&#x27;{&quot;darkMode&quot;:true,&quot;newCheckout&quot;:false}&#x27;</span> \\
  --<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;String&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="string-مقابل-securestring">String مقابل SecureString</h2>
<p>يدعم Parameter Store ثلاثة أنواع:</p>
<table>
<thead>
<tr>
<th>النوع</th>
<th>التشفير</th>
<th>حالة الاستخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>String</code></td>
<td>لا شيء</td>
<td>أسماء الجداول، وعناوين URL للنقاط الطرفية، ورايات الميزات</td>
</tr>
<tr>
<td><code>StringList</code></td>
<td>لا شيء</td>
<td>قيم مفصولة بفواصل</td>
</tr>
<tr>
<td><code>SecureString</code></td>
<td>KMS</td>
<td>مفاتيح API، والرموز، وكلمات المرور، وسلاسل الاتصال</td>
</tr>
</tbody>
</table>
<p>تُخزَّن معاملات <strong>String</strong> كنص عادي. استخدمها للتهيئة غير الحسّاسة — نفس نوع القيم التي تضعها في متغيرات بيئة Lambda.</p>
<p>تُشفَّر معاملات <strong>SecureString</strong> عند السكون بمفتاح KMS. عند استرجاع SecureString، يجب أن تطلب فك التشفير صراحةً عبر العلم <code>--with-decryption</code> (CLI) أو <code>WithDecryption: true</code> (SDK). وبدون ذلك تحصل على النص المشفّر، وهو بلا فائدة.</p>
<p>يخزّن <strong>StringList</strong> قيمًا مفصولة بفواصل في معامل واحد. يكون مفيدًا أحيانًا، لكن في معظم الأوقات يكون استخدام سلسلة JSON في معامل <code>String</code> عادي أفضل.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تتطلّب معاملات SecureString أذونات KMS لفك التشفير. إذا لم يكن دور تنفيذ دالة Lambda يملك إذن <code>kms:Decrypt</code> على مفتاح KMS المستخدم لتشفير المعامل، فيمكن للدالة قراءة اسم المعامل لكنها لا تستطيع فك تشفير القيمة. ستحصل على خطأ رفض الوصول وقت التشغيل، لا وقت النشر.</p>
</blockquote>
<h2 id="استرجاع-المعاملات">استرجاع المعاملات</h2>
<h3 id="الحصول-على-معامل-واحد">الحصول على معامل واحد</h3>
<pre><code class="language-bash">aws ssm get-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/table-name&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الاستجابة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Parameter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/my-frontend-app/production/table-name&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;String&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-data&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;LastModifiedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T10:00:00.000Z&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/table-name&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بالنسبة إلى معاملات SecureString، أضف <code>--with-decryption</code>:</p>
<pre><code class="language-bash">aws ssm get-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/api-key&quot;</span> \\
  --with-decryption \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>بدون <code>--with-decryption</code>، يحتوي الحقل <code>Value</code> على النص المشفّر.</p>
<h3 id="الحصول-على-كل-المعاملات-حسب-المسار">الحصول على كل المعاملات حسب المسار</h3>
<p>هنا يُثمر التسلسل الهرمي. استرجع كل معامل تحت مسار معيّن:</p>
<pre><code class="language-bash">aws ssm get-parameters-by-path \\
  --path <span class="hljs-string">&quot;/my-frontend-app/production&quot;</span> \\
  --with-decryption \\
  --recursive \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يعيد هذا جميع المعاملات الأربعة تحت <code>/my-frontend-app/production/</code> في استدعاء API واحد. يتضمّن العلم <code>--recursive</code> المعاملات في المسارات المتداخلة. وبدونه تُعاد فقط العناصر الفرعية المباشرة للمسار المحدّد.</p>
<h2 id="استرجاع-المعاملات-باستخدام-sdk">استرجاع المعاملات باستخدام SDK</h2>
<p>إليك كيفية استرجاع معامل من دالة Lambda باستخدام AWS SDK v3:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParameterCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">const</span> getParameter = <span class="hljs-title function_">async</span> (<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParameterCommand</span>({
      <span class="hljs-title class_">Name</span>: name,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
    }),
  );

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">Parameter</span>?.<span class="hljs-property">Value</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Parameter <span class="hljs-subst">\${name}</span> not found or has no value\`</span>);
  }

  <span class="hljs-keyword">return</span> response.<span class="hljs-property">Parameter</span>.<span class="hljs-property">Value</span>;
};
</code></pre>
<p><em>ملاحظة:</em> <code>WithDecryption: true</code> مطلوب لمعاملات <code>SecureString</code>. وليس له أي تأثير على معاملات <code>String</code>، لذا يمكنك ضبطه بأمان لجميع المعاملات.</p>
<p>لاسترجاع كل المعاملات تحت مسار:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SSMClient</span>, <span class="hljs-title class_">GetParametersByPathCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-ssm&#x27;</span>;

<span class="hljs-keyword">const</span> ssm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SSMClient</span>({});

<span class="hljs-keyword">const</span> getParametersByPath = <span class="hljs-title function_">async</span> (<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt; =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParametersByPathCommand</span>({
      <span class="hljs-title class_">Path</span>: path,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">Recursive</span>: <span class="hljs-literal">true</span>,
    }),
  );

  <span class="hljs-keyword">const</span> <span class="hljs-attr">parameters</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt; = {};
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> param <span class="hljs-keyword">of</span> response.<span class="hljs-property">Parameters</span> ?? []) {
    <span class="hljs-keyword">if</span> (param.<span class="hljs-property">Name</span> &amp;&amp; param.<span class="hljs-property">Value</span>) {
      <span class="hljs-keyword">const</span> key = param.<span class="hljs-property">Name</span>.<span class="hljs-title function_">replace</span>(path, <span class="hljs-string">&#x27;&#x27;</span>).<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/^\\//</span>, <span class="hljs-string">&#x27;&#x27;</span>);
      parameters[key] = param.<span class="hljs-property">Value</span>;
    }
  }

  <span class="hljs-keyword">return</span> parameters;
};
</code></pre>
<p><em>ملاحظة:</em> أزل بادئة المسار للحصول على مفتاح نظيف مثل <code>api-key</code> بدلًا من المسار الكامل.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>يقتصر <code>GetParametersByPath</code> على <strong>10 معاملات في كل استدعاء</strong>. إذا كان العدد أكثر من ذلك، تتضمّن الاستجابة <code>NextToken</code> يجب تمريره في استدعاء متابعة. يتجاهل المثال أعلاه ترقيم الصفحات — فإذا كان لديك أكثر من 10 معاملات تحت المسار، فسترى أول 10 فقط دون أي تنبيه. الشكل الصحيح هو حلقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">let</span> <span class="hljs-attr">nextToken</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">do</span> {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> ssm.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetParametersByPathCommand</span>({
      <span class="hljs-title class_">Path</span>: path,
      <span class="hljs-title class_">WithDecryption</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">Recursive</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">NextToken</span>: nextToken,
    }),
  );
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> param <span class="hljs-keyword">of</span> response.<span class="hljs-property">Parameters</span> ?? []) {
    <span class="hljs-comment">/* collect */</span>
  }
  nextToken = response.<span class="hljs-property">NextToken</span>;
} <span class="hljs-keyword">while</span> (nextToken);
</code></pre>
<p>أو استخدم مساعد ترقيم الصفحات في AWS SDK v3: <code>paginateGetParametersByPath({ client: ssm }, { Path: path })</code>.</p>
</blockquote>
<h2 id="الطبقة-القياسية-مقابل-الطبقة-المتقدمة">الطبقة القياسية مقابل الطبقة المتقدّمة</h2>
<p>لـ Parameter Store طبقتان:</p>
<table>
<thead>
<tr>
<th>الميزة</th>
<th>القياسية</th>
<th>المتقدّمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>التكلفة</strong></td>
<td>مجانية</td>
<td>0.05 دولار لكل معامل شهريًا</td>
</tr>
<tr>
<td><strong>أقصى حجم للقيمة</strong></td>
<td>4 KB</td>
<td>8 KB</td>
</tr>
<tr>
<td><strong>أقصى عدد معاملات لكل منطقة</strong></td>
<td>10,000</td>
<td>100,000</td>
</tr>
<tr>
<td><strong>سياسات المعاملات</strong></td>
<td>لا</td>
<td>نعم (انتهاء الصلاحية، الإشعارات)</td>
</tr>
<tr>
<td><strong>الإنتاجية</strong></td>
<td>40 TPS (افتراضي)</td>
<td>حتى 1,000 TPS (إنتاجية أعلى)</td>
</tr>
</tbody>
</table>
<p>بالنسبة إلى كل تطبيق واجهة أمامية تقريبًا، الطبقة القياسية أكثر من كافية. أنت تخزّن حفنة من قيم التهيئة، لا عشرات الآلاف. حدّ القيمة البالغ 4 KB هو نفسه حدّ متغيرات البيئة في Lambda، وهو وفير لمفاتيح API وسلاسل التهيئة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تحتاج إلى اختيار طبقة مسبقًا. تكون المعاملات افتراضيًا في الطبقة القياسية. وإذا احتجت لاحقًا إلى ميزات متقدّمة، يمكنك تغيير طبقة المعامل عبر <code>put-parameter --tier Advanced --overwrite</code>. يمكنك أيضًا ضبط الطبقة على <code>Intelligent-Tiering</code> وترك AWS يرقّي المعاملات إلى المتقدّمة فقط عندما تتجاوز حدود الطبقة القياسية.</p>
</blockquote>
<h2 id="إدارة-الإصدارات">إدارة الإصدارات</h2>
<p>في كل مرة تحدّث فيها معاملًا، يزيد Parameter Store رقم إصداره. يمكنك استرجاع إصدار محدّد بإلحاق <code>:version</code> بالاسم:</p>
<pre><code class="language-bash">aws ssm get-parameter \\
  --name <span class="hljs-string">&quot;/my-frontend-app/production/api-key:1&quot;</span> \\
  --with-decryption \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يمنحك هذا مسار تدقيق خفيفًا والقدرة على التراجع عن تغيير في التهيئة دون إعادة نشر أي شيء.</p>
<p>يتولّى Parameter Store معظم احتياجات التهيئة، لكنه لا يدوّر بيانات الاعتماد نيابةً عنك. عندما تحتاج إلى تدوير تلقائي — لكلمات مرور قواعد البيانات، أو رموز OAuth، أو أي بيانات اعتماد لها دورة حياة — فهنا يأتي دور Secrets Manager. يغطي الدرس التالي Secrets Manager ومتى يستحق تكلفته.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>معاملات الطبقة القياسية مجانية، لذا لا يوجد سبب متعلّق بالفواتير لحذفها — لكن الحذف يبقي فضاء أسماء المعاملات نظيفًا:</p>
<pre><code class="language-bash">aws ssm delete-parameters \\
  --names \\
    <span class="hljs-string">&quot;/my-frontend-app/production/table-name&quot;</span> \\
    <span class="hljs-string">&quot;/my-frontend-app/production/api-key&quot;</span> \\
    <span class="hljs-string">&quot;/my-frontend-app/production/api-endpoint&quot;</span> \\
    <span class="hljs-string">&quot;/my-frontend-app/production/feature-flags&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:p};export{s as book,r as chapter,n as chapterTitle,l as default,e as headings,p as html,a as slug,t as title};
