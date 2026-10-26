const s="kinney",c="aws",n="نشر تطبيقات الويب على AWS",a="attaching-an-ssl-certificate",t="إرفاق شهادة SSL",o=[{depth:2,id:"شرط-us-east-1-مجددا",text:"شرط us-east-1 (مجددًا)"},{depth:2,id:"تحديث-تهيئة-التوزيع",text:"تحديث تهيئة التوزيع"},{depth:3,id:"الجزء-الأول-viewercertificate",text:"الجزء الأول: ViewerCertificate"},{depth:3,id:"الجزء-الثاني-aliases",text:"الجزء الثاني: Aliases"},{depth:3,id:"الجزء-الثالث-إعادة-توجيه-https",text:"الجزء الثالث: إعادة توجيه HTTPS"},{depth:2,id:"إرسال-التحديث",text:"إرسال التحديث"},{depth:2,id:"مع-sdk",text:"مع SDK"},{depth:2,id:"dns-القطعة-المفقودة",text:"DNS: القطعة المفقودة"},{depth:2,id:"التحقق-من-الشهادة",text:"التحقق من الشهادة"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"},{depth:2,id:"كائن-viewercertificate-الكامل",text:"كائن ViewerCertificate الكامل"}],e=`<blockquote>
<p><strong>ملاحظة</strong></p>
<p>هذا الدرس جزء من ملحق <strong>النطاقات المخصّصة وDNS والشهادات</strong> الاختياري. فإن كنت تعمل في الدورة الأساسية، فتوزيع CloudFront لديك يقدّم المحتوى بالفعل عبر HTTPS على نطاقه <code>*.cloudfront.net</code>. عُد إلى هنا عندما تصبح مستعدًا لإرفاق نطاق مخصّص.</p>
</blockquote>
<p>توزيع CloudFront لديك يعمل، لكنه ما زال يقدّم المحتوى على نطاق <code>*.cloudfront.net</code>. هذا مقبول للاختبار، لكنك تحتاج إلى نطاقك المخصّص مع HTTPS قبل أن يصبح جاهزًا للإنتاج. يربط هذا الدرس شهادة ACM التي أنشأتها في قسم ACM بتوزيع CloudFront لديك.</p>
<p>إن أردت نسخة AWS من قواعد أسماء النطاقات البديلة أثناء عملك، فـ<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html">دليل CloudFront للنطاقات المخصّصة وCNAMEs</a> هو المرجع الرسمي.</p>
<p>إن لم تكن قد طلبت شهادة بعد، فعُد إلى <a href="https://stevekinney.com/courses/aws/requesting-a-certificate-in-acm">طلب شهادة في ACM</a> وأنشئ واحدة لنطاقك. تحتاج إلى شهادة في حالة <code>ISSUED</code> قبل المتابعة.</p>
<h2 id="شرط-us-east-1-مجددا">شرط us-east-1 (مجددًا)</h2>
<p>يستحق هذا التكرار لأنه يوقع الناس في كل مرة: شهادة ACM لديك <strong>يجب</strong> أن تكون في <code>us-east-1</code>. فـ CloudFront خدمة عالمية، ومستوى التحكم فيها يسكن في <code>us-east-1</code>. ولا يرى إلا الشهادات الموجودة في تلك المنطقة.</p>
<p>إن أنشأت شهادتك في منطقة أخرى، فأنت بحاجة إلى شهادة جديدة في <code>us-east-1</code>. ولا سبيل إلى نسخ الشهادات أو نقلها بين المناطق. وقد غطّينا هذا بالتفصيل في <a href="https://stevekinney.com/courses/aws/certificate-renewal-and-us-east-1">تجديد الشهادة وشرط us-east-1</a>.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>شهادات CloudFront <strong>يجب</strong> أن تكون في <code>us-east-1</code>. فإن أنشأت شهادتك في أي منطقة أخرى، فلن تراها CloudFront. تحقّق من أن شهادتك في المنطقة الصحيحة قبل تحديث توزيعك:</p>
<pre><code class="language-bash">aws acm list-certificates \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;CertificateSummaryList[*].{Domain:DomainName,ARN:CertificateArn,Status:Status}&quot;</span>
</code></pre>
</blockquote>
<h2 id="تحديث-تهيئة-التوزيع">تحديث تهيئة التوزيع</h2>
<p>يتطلب إرفاق شهادة تحديث تهيئة <code>ViewerCertificate</code> في توزيعك وإضافة نطاقك المخصّص إلى قائمة <code>Aliases</code>. وهذا تغيير من جزأين.</p>
<p>أولًا، اجلب التهيئة الحالية:</p>
<pre><code class="language-bash">aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1 \\
  --output json &gt; distribution-config-current.json
</code></pre>
<p>دوّن <code>ETag</code> من الاستجابة—تحتاجه للتحديث.</p>
<h3 id="الجزء-الأول-viewercertificate">الجزء الأول: ViewerCertificate</h3>
<p>استبدل قسم <code>ViewerCertificate</code> في <code>DistributionConfig</code>. التهيئة الحالية تستخدم شهادة CloudFront الافتراضية:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ViewerCertificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;CloudFrontDefaultCertificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في وحدة التحكم، تعرض صفحة <strong>Edit settings</strong> القائمة المنسدلة <strong>Custom SSL certificate</strong> دون شهادة محددة (أي باستخدام شهادة <code>*.cloudfront.net</code> الافتراضية).</p>
<p><img src="/arabic-cs-library/images/kinney/1c651b01a6002bea.webp" alt="نموذج Edit settings في CloudFront يعرض حقل Custom SSL certificate مع قائمة Choose certificate فارغة، ما يدل على أن شهادة CloudFront الافتراضية هي المستخدمة."></p>
<blockquote>
<p><strong>الشهادة الافتراضية تتجاهل <code>MinimumProtocolVersion</code></strong></p>
<p>عندما تكون <code>CloudFrontDefaultCertificate</code> مساوية لـ <code>true</code>، <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/APIReference/API_ViewerCertificate.html">تفرض CloudFront بصمت سياسة الأمان <code>TLSv1</code></a> بغضّ النظر عمّا تعيّنه في <code>MinimumProtocolVersion</code>. ولهذا لا يكلّفك مقطع الشهادة الافتراضية أعلاه عناء حقل <code>MinimumProtocolVersion</code>—فوجوده سيكون مجرد كذبة. وبمجرد أن تنتقل إلى شهادتك من ACM (التالي)، يصبح للحقل معنى.</p>
</blockquote>
<p>استبدله بشهادتك من ACM:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ViewerCertificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;ACMCertificateArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SSLSupportMethod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sni-only&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;MinimumProtocolVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;TLSv1.2_2021&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لنفصّل كل حقل:</p>
<ul>
<li><strong><code>ACMCertificateArn</code></strong>: ARN شهادتك من ACM. يحلّ هذا الحقل محل <code>CloudFrontDefaultCertificate</code>. ولا يمكنك الجمع بينهما—فإما الشهادة الافتراضية وإما شهادتك من ACM.</li>
<li><strong><code>SSLSupportMethod</code></strong>: تعني <code>&quot;sni-only&quot;</code> أن CloudFront يستخدم <strong>Server Name Indication</strong> (SNI) لتحديد الشهادة التي يقدّمها أثناء مصافحة TLS. هذا هو النهج القياسي وهو مجاني. أما البديل <code>&quot;vip&quot;</code> فيستخدم عنوان IP مخصّصًا في كل موقع حافة—ويكلّف 600 دولار شهريًا، ووُجد فقط للتوافق مع عملاء قديمين لا يدعمون SNI. استخدم <code>&quot;sni-only&quot;</code>.</li>
<li><strong><code>MinimumProtocolVersion</code></strong>: <code>&quot;TLSv1.2_2021&quot;</code> هي سياسة الأمان الأحدث لتوزيعات <code>sni-only</code>. وهي تتطلب TLS 1.2 أو أعلى وتستخدم مجموعات تشفير حديثة. لا تستخدم إصدارات أقدم مثل <code>TLSv1</code> أو <code>TLSv1_2016</code>—فهي تسمح بتشفيرات أضعف.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p><code>&quot;TLSv1.2_2021&quot;</code> هي الحد الأدنى الموصى به لإصدار البروتوكول وقت كتابة هذا الدرس. تدعم TLS 1.2 و1.3، مع مجموعة حديثة من التشفيرات. وكل متصفح تقريبًا صدر في العقد الماضي يدعم TLS 1.2، فلا يوجد قلق عملي بشأن التوافق.</p>
</blockquote>
<h3 id="الجزء-الثاني-aliases">الجزء الثاني: Aliases</h3>
<p>تحتاج CloudFront إلى معرفة النطاقات المخصّصة التي ينبغي توجيهها إلى هذا التوزيع. أضف نطاقك (واختياريًا النطاق الفرعي <code>www</code>) إلى قسم <code>Aliases</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Aliases&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;www.example.com&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إن لم تحتوِ التهيئة الحالية على أسماء بديلة، فستبدو هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Aliases&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استبدلها بأسماء نطاقاتك. يجب أن تطابق النطاقات المذكورة هنا أسماء النطاقات التي تغطيها شهادتك من ACM. فإن كانت شهادتك تغطي <code>example.com</code> و<code>*.example.com</code> (نطاق شامل)، فيمكنك سرد أي نطاق فرعي. وإن كانت تغطي <code>example.com</code> فقط، فلا يمكنك سرد سوى <code>example.com</code>.</p>
<h3 id="الجزء-الثالث-إعادة-توجيه-https">الجزء الثالث: إعادة توجيه HTTPS</h3>
<p>تأكد من أن <code>ViewerProtocolPolicy</code> في <code>DefaultCacheBehavior</code> مضبوطة على <code>&quot;redirect-to-https&quot;</code>. كان هذا مضبوطًا بالفعل في <a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a>، لكن تحقّق من أنه ما زال في مكانه:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;DefaultCacheBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;ViewerProtocolPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;redirect-to-https&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يضمن هذا إعادة توجيه أي طلب HTTP إلى توزيعك تلقائيًا إلى HTTPS. فلا يرى المستخدمون اتصالًا غير آمن أبدًا.</p>
<h2 id="إرسال-التحديث">إرسال التحديث</h2>
<p>طبّق التغييرات:</p>
<pre><code class="language-bash">aws cloudfront update-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --if-match E2QWRUHEXAMPLE \\
  --distribution-config file://distribution-config-updated.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>استبدل <code>E2QWRUHEXAMPLE</code> بقيمة <code>ETag</code> من استجابة <code>get-distribution-config</code>.</p>
<p>انتظر النشر:</p>
<pre><code class="language-bash">aws cloudfront <span class="hljs-built_in">wait</span> distribution-deployed \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1
</code></pre>
<h2 id="مع-sdk">مع SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">CloudFrontClient</span>,
  <span class="hljs-title class_">GetDistributionConfigCommand</span>,
  <span class="hljs-title class_">UpdateDistributionCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-cloudfront&#x27;</span>;

<span class="hljs-keyword">const</span> cloudfront = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CloudFrontClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> current = <span class="hljs-keyword">await</span> cloudfront.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">GetDistributionConfigCommand</span>({ <span class="hljs-title class_">Id</span>: <span class="hljs-string">&#x27;E1A2B3C4D5E6F7&#x27;</span> }));
<span class="hljs-keyword">const</span> config = current.<span class="hljs-property">DistributionConfig</span>!;

config.<span class="hljs-property">ViewerCertificate</span> = {
  <span class="hljs-title class_">ACMCertificateArn</span>:
    <span class="hljs-string">&#x27;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&#x27;</span>,
  <span class="hljs-title class_">SSLSupportMethod</span>: <span class="hljs-string">&#x27;sni-only&#x27;</span>,
  <span class="hljs-title class_">MinimumProtocolVersion</span>: <span class="hljs-string">&#x27;TLSv1.2_2021&#x27;</span>,
};
config.<span class="hljs-property">Aliases</span> = { <span class="hljs-title class_">Quantity</span>: <span class="hljs-number">2</span>, <span class="hljs-title class_">Items</span>: [<span class="hljs-string">&#x27;example.com&#x27;</span>, <span class="hljs-string">&#x27;www.example.com&#x27;</span>] };

<span class="hljs-keyword">await</span> cloudfront.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateDistributionCommand</span>({
    <span class="hljs-title class_">Id</span>: <span class="hljs-string">&#x27;E1A2B3C4D5E6F7&#x27;</span>,
    <span class="hljs-title class_">IfMatch</span>: current.<span class="hljs-property">ETag</span>,
    <span class="hljs-title class_">DistributionConfig</span>: config,
  }),
);
</code></pre>
<h2 id="dns-القطعة-المفقودة">DNS: القطعة المفقودة</h2>
<p>بعد نشر التوزيع بشهادتك وأسمائك البديلة، تحتاج إلى إنشاء سجلات DNS تشير بنطاقك إلى توزيع CloudFront. وهذا عمل قسم توجيه النطاقات المخصّصة في Route 53. وإلى أن يحدث ذلك، موقعك متاح على:</p>
<ul>
<li><strong>نطاق CloudFront</strong>: <code>https://d1234abcdef.cloudfront.net</code> (ما زال يعمل، مستخدمًا شهادة ACM الخاصة بـ <code>*.cloudfront.net</code> في الخلفية)</li>
<li><strong>النطاق المخصّص</strong>: <code>https://example.com</code> (لا يعمل إلا بعد إنشاء سجلات Alias النهائية في Route 53)</li>
</ul>
<h2 id="التحقق-من-الشهادة">التحقق من الشهادة</h2>
<p>بعد تهيئة DNS (أو حتى قبلها، باستخدام نطاق CloudFront)، يمكنك التحقق من أن شهادة SSL مرفقة بشكل صحيح:</p>
<pre><code class="language-bash">curl -vI https://d1234abcdef.cloudfront.net 2&gt;&amp;1 | grep -A 5 <span class="hljs-string">&quot;SSL certificate&quot;</span>
</code></pre>
<p>أو استخدم <code>openssl</code> لمزيد من التفاصيل:</p>
<pre><code class="language-bash">openssl s_client -connect d1234abcdef.cloudfront.net:443 -servername d1234abcdef.cloudfront.net &lt; /dev/null 2&gt;/dev/null | openssl x509 -noout -subject -dates
</code></pre>
<p>يعرض هذا موضوع الشهادة (اسم النطاق) وتواريخ صلاحيتها.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>الشهادة في منطقة خاطئة</strong>: تُرجع CloudFront خطأ مثل <code>InvalidViewerCertificate</code> إذا أشار ARN الشهادة إلى شهادة غير موجودة في <code>us-east-1</code>. تحقّق من المنطقة مرة أخرى.</p>
<p><strong>النطاق غير موجود في Aliases</strong>: إن كانت شهادتك تغطي <code>example.com</code> لكنك لم تضف <code>example.com</code> إلى قائمة <code>Aliases</code>، فلن يستخدم CloudFront الشهادة لطلبات ذلك النطاق. فقائمة <code>Aliases</code> تخبر CloudFront عن النطاقات التي يجيب عنها هذا التوزيع.</p>
<p><strong>الشهادة غير صادرة بعد</strong>: إذا كانت شهادتك ما زالت في حالة <code>PENDING_VALIDATION</code>، فترفضها CloudFront. أكمل عملية التحقق أولًا (راجع <a href="https://stevekinney.com/courses/aws/dns-validation-vs-email-validation">التحقق عبر DNS مقابل التحقق عبر البريد الإلكتروني</a>). (لقد ارتكبت هذا الخطأ بالتأكيد—أرسلت التحديث قبل أن ينتشر التحقق عبر DNS ثم تساءلت لماذا تصرخ CloudFront في وجهي.)</p>
<p><strong>النطاق مستخدم بالفعل</strong>: إذا كان <code>example.com</code> مدرجًا بالفعل كاسم بديل على توزيع CloudFront آخر (حتى في حساب AWS مختلف)، فترفض CloudFront التحديث. لا يمكن ربط كل نطاق إلا بتوزيع واحد في وقت واحد. أزله من التوزيع القديم أولًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن حصلت على خطأ <code>CNAMEAlreadyExists</code>، فهذا يعني أن النطاق مرتبط بالفعل بتوزيع CloudFront آخر. قد يحدث هذا إن كنت تنتقل من إعداد أقدم. استخدم <code>aws cloudfront list-distributions</code> للعثور على التوزيع الآخر وإزالة الاسم البديل منه أولًا.</p>
</blockquote>
<h2 id="كائن-viewercertificate-الكامل">كائن ViewerCertificate الكامل</h2>
<p>إليك تهيئة التوزيع المحدّثة الكاملة مع الشهادة والأسماء البديلة وإعادة توجيه HTTPS للرجوع إليها:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ViewerCertificate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;ACMCertificateArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SSLSupportMethod&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sni-only&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;MinimumProtocolVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;TLSv1.2_2021&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Aliases&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;www.example.com&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;DefaultCacheBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;ViewerProtocolPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;redirect-to-https&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يمنحك هذا HTTPS على نطاقك المخصّص، مفروضًا عبر إعادة التوجيه، مع TLS 1.2 أو أحدث وتشفيرات حديثة. وهذا هو مستوى أمان TLS نفسه الذي تحصل عليه من Vercel أو Netlify افتراضيًا—أنت فقط تهيّئه صراحةً.</p>
<p>صار توزيعك يملك HTTPS، ونطاقًا مخصّصًا (بانتظار DNS)، وتوجيه SPA. وتبقى القطعة الأخيرة في أحجية CloudFront، وهي ترويسات الاستجابة: تهيئة CORS، وترويسات الأمان مثل HSTS وX-Frame-Options، وتوجيهات التحكم في الذاكرة. في الدرس التالي، ستهيّئ سياسة ترويسات استجابة ترفع وضع الأمان في توزيعك إلى المعايير الحديثة.</p>
`,p={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:o,html:e};export{s as book,c as chapter,n as chapterTitle,p as default,o as headings,e as html,a as slug,t as title};
