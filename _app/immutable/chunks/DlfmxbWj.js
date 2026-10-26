const s="kinney",c="aws",a="نشر تطبيقات الويب على AWS",n="requesting-a-certificate-in-acm",t="طلب شهادة في ACM",p=[{depth:2,id:"قبل-أن-تبدأ-مسألة-المنطقة",text:"قبل أن تبدأ: مسألة المنطقة"},{depth:2,id:"طلب-شهادة-من-وحدة-التحكم",text:"طلب شهادة من وحدة التحكّم"},{depth:2,id:"طلب-شهادة-باستخدام-cli",text:"طلب شهادة باستخدام CLI"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"دورة-حياة-الشهادة",text:"دورة حياة الشهادة"},{depth:2,id:"أذونات-iam-لـ-acm",text:"أذونات IAM لـ ACM"},{depth:2,id:"ما-لديك-حتى-الآن",text:"ما لديك حتى الآن"}],l=`<p>تعرف لماذا يهمّ HTTPS. والآن تحتاج إلى شهادة. <strong>AWS Certificate Manager (ACM)</strong> هي الخدمة التي توفّر شهادات SSL/TLS وتديرها وتجدّدها للاستخدام مع خدمات AWS. طلب الشهادة مباشر، لكن ثمة قرارات قليلة عليك اتّخاذها مسبقًا — وقيد حرج واحد يتعلّق بالمنطقة سيوفّر عليك ساعات من التنقيح إن عرفته الآن.</p>
<p>في هذه المرحلة من الدورة، لديك بالفعل المتطلّب المسبق الغائب الذي يتعثّر فيه معظم الناس: السيطرة على النطاق ومكان لنشر سجلات DNS. وهذا مهم لأن التحقّق في ACM ليس طقسًا مجرّدًا لشهادة. إنه مهمة DNS.</p>
<h2 id="قبل-أن-تبدأ-مسألة-المنطقة">قبل أن تبدأ: مسألة المنطقة</h2>
<p>شهادات ACM موارد إقليمية. فالشهادة الموفَّرة في <code>us-west-2</code> متاحة فقط للخدمات العاملة في <code>us-west-2</code>. وهذا مهم لأن CloudFront — شبكة CDN التي ستستخدمها لاحقًا في مسار الاستضافة الثابتة لتقديم واجهتك الأمامية — خدمة عالمية تتطلّب أن تكون شهاداتها في <strong><code>us-east-1</code></strong> (الولايات المتحدة الشرقية، شمال فرجينيا).</p>
<p>إذا وفّرت شهادتك في أي منطقة أخرى، فلن تراها CloudFront. لن تظهر في القائمة المنسدلة بوحدة التحكّم. وسيُرجع CLI خطأ. ولا سبيل إلى نقل شهادة أو نسخها بين المناطق.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>أنشئ دائمًا شهادات CloudFront في <code>us-east-1</code>. هذا هو الخطأ الواحد الأكثر شيوعًا لدى الناس مع ACM. وإن لم تتذكّر شيئًا آخر من هذه الوحدة، فتذكّر هذا.</p>
</blockquote>
<p>أعددت AWS CLI بملفات تعريف مسمّاة في <a href="https://stevekinney.com/courses/aws/setting-up-the-aws-cli">إعداد AWS CLI</a>. تأكّد من أن أوامرك تحدّد <code>--region us-east-1</code> صراحةً.</p>
<h2 id="طلب-شهادة-من-وحدة-التحكم">طلب شهادة من وحدة التحكّم</h2>
<p>يمنحك سير العمل في وحدة التحكّم صورة واضحة عمّا تفعله ACM تحت الغطاء.</p>
<ol>
<li>افتح <a href="https://console.aws.amazon.com/acm/home?region=us-east-1">وحدة تحكّم ACM</a>. تأكّد من أن القائمة المنسدلة للمنطقة في الزاوية العلوية اليمنى تقول <strong>US East (N. Virginia)</strong>. وإن لم تقل ذلك، فبدّلها قبل المتابعة.</li>
<li>انقر <strong>Request a certificate</strong>.</li>
<li>اختر <strong>Request a public certificate</strong> ثم انقر <strong>Next</strong>.</li>
<li>تحت <strong>Domain names</strong>، أدخل نطاقك: <code>example.com</code>. وإن أردت النطاق الجذري و<code>www</code> معًا، فأضف <code>www.example.com</code> اسم نطاق إضافيًا. (سنغطّي شهادات Wildcard في درس لاحق.)</li>
<li>تحت <strong>Validation method</strong>، اختر <strong>DNS validation</strong>. هذا هو الافتراضي والخيار الصحيح في معظم الحالات. وسنغطّي الفرق بين التحقّق عبر DNS والتحقّق عبر البريد في الدرس التالي.</li>
<li>تحت <strong>Key algorithm</strong>، اترك الافتراضي: <strong>RSA 2048</strong>. فهو متوافق مع كل شيء.</li>
<li>انقر <strong>Request</strong>.</li>
</ol>
<p>تنشئ ACM الشهادة وتضبط حالتها على <strong>Pending validation</strong>. والشهادة غير قابلة للاستخدام بعد — إذ عليك إثبات أنك تملك النطاق. وتُغطّى خطوة التحقّق تلك في الدرس التالي.</p>
<h2 id="طلب-شهادة-باستخدام-cli">طلب شهادة باستخدام CLI</h2>
<p>CLI أسرع وقابل للبرمجة النصية. وهذا مكافئ لما فعلته للتوّ في وحدة التحكّم:</p>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names www.example.com \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تُرجع ACM استجابة JSON تتضمّن <strong>ARN</strong> الشهادة (اسم مورد Amazon):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;CertificateArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ قيمة ARN هذه. ستحتاجه عندما ترفق الشهادة بـ CloudFront، وعندما تفحص حالة التحقّق، وعندما تنقّح أي شيء يتعلّق بهذه الشهادة. فكل عملية في ACM تشير إلى الشهادة عبر ARN الخاص بها.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمكنك تخزين ARN في متغيّر صدفة لاستخدامه في الأوامر اللاحقة:</p>
<pre><code class="language-bash">CERT_ARN=$(aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names www.example.com \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output text)
</code></pre>
<p>يُرجع العلم <code>--output text</code> سلسلة ARN وحدها دون تنسيق JSON، وهو أسهل في الالتقاط داخل متغيّر.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">ACMClient</span>,
  <span class="hljs-title class_">RequestCertificateCommand</span>,
  <span class="hljs-title class_">DescribeCertificateCommand</span>,
  waitUntilCertificateValidated,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-acm&#x27;</span>;

<span class="hljs-keyword">const</span> acm = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ACMClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> }); <span class="hljs-comment">// must be us-east-1 for CloudFront</span>

<span class="hljs-keyword">const</span> requested = <span class="hljs-keyword">await</span> acm.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">RequestCertificateCommand</span>({
    <span class="hljs-title class_">DomainName</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
    <span class="hljs-title class_">SubjectAlternativeNames</span>: [<span class="hljs-string">&#x27;www.example.com&#x27;</span>],
    <span class="hljs-title class_">ValidationMethod</span>: <span class="hljs-string">&#x27;DNS&#x27;</span>,
    <span class="hljs-title class_">IdempotencyToken</span>: <span class="hljs-string">\`cert-<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>\`</span>, <span class="hljs-comment">// optional, prevents dupes on retry</span>
  }),
);
<span class="hljs-keyword">const</span> certArn = requested.<span class="hljs-property">CertificateArn</span>!;

<span class="hljs-comment">// Read back the DNS validation records so you can write them into Route 53:</span>
<span class="hljs-keyword">const</span> described = <span class="hljs-keyword">await</span> acm.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DescribeCertificateCommand</span>({ <span class="hljs-title class_">CertificateArn</span>: certArn }));
<span class="hljs-keyword">const</span> validationRecords = described.<span class="hljs-property">Certificate</span>?.<span class="hljs-property">DomainValidationOptions</span>?.<span class="hljs-title function_">map</span>(
  <span class="hljs-function">(<span class="hljs-params">opt</span>) =&gt;</span> opt.<span class="hljs-property">ResourceRecord</span>,
).<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>);

<span class="hljs-comment">// After the DNS validation records are in Route 53, block until issuance:</span>
<span class="hljs-keyword">await</span> <span class="hljs-title function_">waitUntilCertificateValidated</span>(
  { <span class="hljs-attr">client</span>: acm, <span class="hljs-attr">maxWaitTime</span>: <span class="hljs-number">1800</span> },
  { <span class="hljs-title class_">CertificateArn</span>: certArn },
);
</code></pre>
<p>الدالة المساعدة <code>waitUntilCertificateValidated</code> هي مكافئ SDK لـ<code>aws acm wait certificate-validated</code> — فأداة الانتظار في CLI والدالة المساعدة في SDK مولّدتان من مواصفة الانتظار نفسها التي تنشرها AWS، لذا سلوكهما متطابق.</p>
<h2 id="دورة-حياة-الشهادة">دورة حياة الشهادة</h2>
<p>بعد أن تطلب شهادة، تمرّ بسلسلة من الحالات. أنصحك بمسح هذه القائمة الآن لتعرف ما الذي ستتوقّعه:</p>
<ol>
<li><strong>Pending validation</strong>: أنشأت ACM الشهادة لكنها تنتظر منك إثبات ملكيتك للنطاق. وبمجرد نشر سجلات DNS، يتحوّل التحقّق عادةً إلى <strong>Issued</strong> في غضون دقائق، وإن كانت AWS تمنح نفسها حتى 30 دقيقة. ولست مضطرًا إلى مراقبتها — فدرس التمرين يستخدم <code>aws acm wait certificate-validated</code> للانتظار حتى تصبح الشهادة جاهزة.</li>
<li><strong>Issued</strong>: نجح التحقّق. والشهادة جاهزة للإرفاق بتوزيع CloudFront أو موازن حمل أو نقطة نهاية API Gateway.</li>
<li><strong>Inactive</strong>: تُدرجه <a href="https://docs.aws.amazon.com/acm/latest/APIReference/API_CertificateDetail.html">واجهة ACM البرمجية</a> حالةً محتملة، لكنه نادر في الاستخدام العادي. ولن تصادفه مع الشهادات <code>AMAZON_ISSUED</code> المتحقّقة عبر DNS التي تنشئها هذه الدورة.</li>
<li><strong>Expired</strong>: بلغت الشهادة تاريخ انتهائها دون تجديد. وتجدّد ACM تلقائيًا الشهادات المستخدمة التي لديها سجلات تحقّق DNS صالحة، لذا لا يحدث هذا عادةً إلا إذا حدث خطأ في التجديد.</li>
<li><strong>Revoked</strong>: أُبطلت الشهادة صراحةً. وهذا نادر.</li>
<li><strong>Failed</strong>: فشل التحقّق — عادةً لأن التحقّق عبر DNS أو البريد لم يكتمل خلال 72 ساعة.</li>
</ol>
<p>يمكنك فحص حالة شهادتك في أي وقت:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمّن الاستجابة كل شيء عن الشهادة — حالتها، وأسماء نطاقاتها، وطريقة التحقّق، وسجلات التحقّق التي تحتاج إلى إضافتها إلى DNS:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Certificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;CertificateArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SubjectAlternativeNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;www.example.com&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING_VALIDATION&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AMAZON_ISSUED&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;KeyAlgorithm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;RSA-2048&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;DomainValidationOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ValidationDomain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ValidationStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING_VALIDATION&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ResourceRecord&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_abc123.example.com.&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;CNAME&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_def456.acm-validations.aws.&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ValidationMethod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DNS&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;DomainName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;www.example.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ValidationDomain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;www.example.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ValidationStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING_VALIDATION&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ResourceRecord&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_ghi789.www.example.com.&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;CNAME&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_jkl012.acm-validations.aws.&quot;</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;ValidationMethod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DNS&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تحتوي مصفوفة <code>DomainValidationOptions</code> على سجلات DNS التي تحتاج إلى إضافتها. فكل نطاق (أو نطاق فرعي) في شهادتك يحصل على سجل تحقّق خاص به. وفي الدرس التالي، سنستعرض إضافة هذه السجلات وإكمال التحقّق.</p>
<h2 id="أذونات-iam-لـ-acm">أذونات IAM لـ ACM</h2>
<p>لطلب شهادة، يحتاج مستخدم أو دور IAM لديك إلى الإذن <code>acm:RequestCertificate</code>. وإذا اتبعت إعداد الحساب في <a href="https://stevekinney.com/courses/aws/creating-and-securing-an-aws-account">إنشاء حساب AWS وتأمينه</a> وكنت تستخدم مستخدمًا إداريًا، فلديك هذا الإذن بالفعل. ولإعدادات أكثر تقييدًا، هذه سياسة دنيا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;acm:RequestCertificate&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;acm:DescribeCertificate&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;acm:ListCertificates&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تدعم ACM أذونات على مستوى المورد لـ<code>RequestCertificate</code> — إذ يجب أن يكون <code>Resource</code> هو <code>&quot;*&quot;</code>. يمكنك تقييد <code>DescribeCertificate</code> وغيرها من عمليات القراءة إلى ARNs شهادات محدّدة بعد وجود الشهادة، لكن الطلب الأول يتطلّب دائمًا موردًا شموليًا.</p>
</blockquote>
<h2 id="ما-لديك-حتى-الآن">ما لديك حتى الآن</h2>
<p>في هذه المرحلة، لديك شهادة في ACM حالتها <strong>Pending validation</strong>. إنها موجودة، ولها ARN، لكنها غير قابلة للاستخدام بعد. والخطوة التالية هي إثبات لـ ACM أنك تملك النطاق المذكور في الشهادة فعلًا — ولهذا تحتاج إلى فهم الفرق بين التحقّق عبر DNS والتحقّق عبر البريد.</p>
`,o={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,c as chapter,a as chapterTitle,o as default,p as headings,l as html,n as slug,t as title};
