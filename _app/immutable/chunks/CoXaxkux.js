const n="kinney",c="aws",s="نشر تطبيقات الويب على AWS",a="acm-certificate-exercise",t="تمرين: طلب شهادة والتحقّق منها",e=[{depth:2,id:"لماذا-يهم",text:"لماذا يهمّ"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلّبات المسبقة"},{depth:2,id:"طلب-الشهادة",text:"طلب الشهادة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"استرجاع-سجلات-التحقق",text:"استرجاع سجلات التحقّق"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إضافة-سجلات-التحقق-إلى-dns",text:"إضافة سجلات التحقّق إلى DNS"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"انتظار-التحقق",text:"انتظار التحقّق"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"التحقق-من-الشهادة",text:"التحقّق من الشهادة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تشخيص-الفشل",text:"تشخيص الفشل"},{depth:2,id:"ما-بنيته",text:"ما بنيته"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"التنظيف",text:"التنظيف"}],o=`<p>لقد قرأت عن ACM والشهادات والتحقّق عبر DNS. والآن ستفعل ذلك فعلًا: اطلب شهادة، وأضف سجلات التحقّق، وتحقّق من أن ACM تُصدر الشهادة. وبحلول نهاية هذا التمرين، سيكون لديك شهادة SSL/TLS صالحة في <code>us-east-1</code> جاهزة للإرفاق بتوزيع CloudFront.</p>
<h2 id="لماذا-يهم">لماذا يهمّ</h2>
<p>كل واجهة أمامية إنتاجية على AWS تحتاج إلى شهادة. وسير عمل طلب الشهادة والتحقّق منها شيء تفعله مرة لكل نطاق (أو مرة لكل نطاق wildcard)، وإذا فعلته بشكل صحيح، فتتولّى ACM التجديد لبقية عمر الشهادة. وإتقان هذا من المحاولة الأولى يعني شيئًا أقل لتنقّحه عند ربط CloudFront.</p>
<h2 id="المتطلبات-المسبقة">المتطلّبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>حساب AWS مع إعداد وصول CLI (انظر <a href="https://stevekinney.com/courses/aws/setting-up-the-aws-cli">إعداد AWS CLI</a>)</li>
<li>اسم نطاق تتحكّم به.</li>
<li>صلاحية DNS لذلك النطاق: <strong>المسار الموصى به:</strong> يستضيف Route 53 نظام DNS للنطاق، إما لأنك سجّلت النطاق هناك أو لأنك وجّهت المسجّل بالفعل إلى منطقة استضافة في Route 53. <strong>المسار البديل:</strong> DNS مستضاف في مكان آخر ويمكنك إضافة سجلات CNAME يدويًا.
<ul>
<li><strong>المسار الموصى به:</strong> يستضيف Route 53 نظام DNS للنطاق، إما لأنك سجّلت النطاق هناك أو لأنك وجّهت المسجّل بالفعل إلى منطقة استضافة في Route 53.</li>
<li><strong>المسار البديل:</strong> DNS مستضاف في مكان آخر ويمكنك إضافة سجلات CNAME يدويًا.</li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>النسخة الأسهل من هذا التمرين نطاق يكون DNS فيه مستضافًا بالفعل في Route 53. فإن اتبعت دروس النطاقات وDNS بنطاق رخيص مسجّل في Route 53، فالتحقّق في ACM أشبه بمسألة نسخ ولصق بدلًا من رحلة بحث في لوحة مزوّد آخر.</p>
</blockquote>
<h2 id="طلب-الشهادة">طلب الشهادة</h2>
<p>اطلب شهادة تغطّي النطاق الجذري وكل النطاقات الفرعية. استبدل <code>example.com</code> بنطاقك الفعلي:</p>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names <span class="hljs-string">&quot;*.example.com&quot;</span> \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يجب أن ترى استجابة تتضمّن <code>CertificateArn</code>. احفظ هذه القيمة — ستحتاجها في الخطوات المتبقية.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;CertificateArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>تلقّيت <code>CertificateArn</code> في الاستجابة.</li>
<li>اكتمل الأمر دون أخطاء.</li>
<li>حدّدت <code>--region us-east-1</code>.</li>
</ul>
<h2 id="استرجاع-سجلات-التحقق">استرجاع سجلات التحقّق</h2>
<p>احصل على سجلات CNAME التي تحتاج ACM إلى إضافتها إلى DNS:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn &lt;your-certificate-arn&gt; \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.DomainValidationOptions[*].{Domain:DomainName,Name:ResourceRecord.Name,Value:ResourceRecord.Value,Status:ValidationStatus}&quot;</span>
</code></pre>
<p>تُظهر المخرجات سجل CNAME واحدًا أو أكثر، مع حالة التحقّق الخاصة به:</p>
<pre><code class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Domain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_abc123.example.com.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;_def456.acm-validations.aws.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING_VALIDATION&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>دوّن <code>Name</code> و<code>Value</code> لكل سجل. فأنت تحتاج إلى إضافتها إلى DNS.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>ترى سجل CNAME واحدًا أو أكثر بحالة <code>PENDING_VALIDATION</code>.</li>
<li>دوّنت <code>Name</code> و<code>Value</code> لكل سجل.</li>
</ul>
<h2 id="إضافة-سجلات-التحقق-إلى-dns">إضافة سجلات التحقّق إلى DNS</h2>
<p><strong>إذا كان DNS نطاقك في Route 53:</strong> أبسط نهج هو وحدة تحكّم ACM. افتح <a href="https://console.aws.amazon.com/acm/home?region=us-east-1">وحدة تحكّم ACM</a>، واعثر على شهادتك، ووسّعها، وانقر <strong>Create records in Route 53</strong>. فتنشئ ACM سجلات CNAME في منطقة استضافتك تلقائيًا.</p>
<p><strong>إذا كان نطاقك مستضافًا في مكان آخر:</strong> سجّل الدخول إلى وحدة تحكّم مزوّد DNS لديك وأنشئ سجل CNAME بالخصائص التالية:</p>
<ul>
<li><strong>Name/Host</strong>: القيمة من حقل <code>Name</code> (مثل <code>_abc123.example.com</code>). بعض المزوّدين يريدون <code>_abc123</code> فقط دون لاحقة النطاق — راجع توثيق مزوّدك.</li>
<li><strong>Type</strong>: CNAME</li>
<li><strong>Value/Points to</strong>: القيمة من حقل <code>Value</code> (مثل <code>_def456.acm-validations.aws</code>). بعض المزوّدين يريدونها دون النقطة الأخيرة.</li>
<li><strong>TTL</strong>: 300 (5 دقائق) مناسب.</li>
</ul>
<p>كرّر ذلك لكل نطاق في شهادتك إن كانت سجلات التحقّق متعددة.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>أضفت كل سجلات تحقّق CNAME إلى DNS.</li>
<li>يمكنك التحقّق من وجود السجلات بـ<code>dig</code> أو <code>nslookup</code>:</li>
</ul>
<pre><code class="language-bash">dig CNAME _abc123.example.com
</code></pre>
<p>يجب أن ترى القيمة <code>_def456.acm-validations.aws.</code> في قسم الإجابة.</p>
<h2 id="انتظار-التحقق">انتظار التحقّق</h2>
<p>تفحص ACM سجلات DNS دوريًا. ويكتمل التحقّق عادةً في غضون دقائق لكن قد يستغرق حتى 30 دقيقة.</p>
<p>يمكنك استقصاء الحالة دوريًا:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn &lt;your-certificate-arn&gt; \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.Status&quot;</span>
</code></pre>
<p>أو استخدم أداة الانتظار المدمجة للانتظار حتى يكتمل التحقّق:</p>
<pre><code class="language-bash">aws acm <span class="hljs-built_in">wait</span> certificate-validated \\
  --certificate-arn &lt;your-certificate-arn&gt; \\
  --region us-east-1
</code></pre>
<p>يخرج هذا الأمر صامتًا عندما تبلغ الشهادة حالة <code>ISSUED</code>، أو تنتهي مهلته بعد نحو 40 دقيقة.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>حالة الشهادة <code>ISSUED</code>.</li>
<li>خرج أمر <code>wait</code> دون خطأ.</li>
</ul>
<h2 id="التحقق-من-الشهادة">التحقّق من الشهادة</h2>
<p>أكّد أن الشهادة صادرة وتغطّي النطاقات الصحيحة:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn &lt;your-certificate-arn&gt; \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.{Status:Status,Domains:SubjectAlternativeNames,Renewal:RenewalEligibility}&quot;</span>
</code></pre>
<p>المخرجات المتوقّعة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ISSUED&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Domains&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;*.example.com&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Renewal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ELIGIBLE&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>الحالة <code>ISSUED</code>.</li>
<li>الشهادة تغطّي <code>example.com</code> و<code>*.example.com</code> (أو أي نطاقات طلبتها).</li>
<li>أهلية التجديد <code>ELIGIBLE</code>.</li>
</ul>
<h2 id="تشخيص-الفشل">تشخيص الفشل</h2>
<ul>
<li><strong>تبقى الشهادة في <code>PENDING_VALIDATION</code>:</strong> سجل CNAME للتحقّق عبر DNS مفقود، أو نُسخ الاسم أو القيمة بشكل خاطئ، أو قام مزوّد DNS لديك بتسوية السجل أو توكيله بدلًا من نشره تمامًا كما طلبت ACM.</li>
<li><strong>تحقّقت من اسم واحد فقط وتوقّعت الاثنين:</strong> أعد تشغيل <code>describe-certificate</code> وافحص <code>DomainValidationOptions</code>. فأحيانًا تعيد ACM استخدام سجل تحقّق واحد للنطاق الجذري وأسماء wildcard، لكنك ما زلت بحاجة إلى تأكيد ما يتوقّعه طلب شهادتك فعلًا.</li>
<li><strong>تبدو الشهادة سليمة لكن CloudFront لا يستطيع استخدامها لاحقًا:</strong> طُلبت الشهادة خارج <code>us-east-1</code>. ولا تقبل CloudFront شهادات ACM إلا من تلك المنطقة.</li>
</ul>
<h2 id="ما-بنيته">ما بنيته</h2>
<p>لديك الآن شهادة SSL/TLS صالحة في <code>us-east-1</code> تغطّي نطاقك وكل النطاقات الفرعية. وستتجدّد هذه الشهادة تلقائيًا ما دام سجل تحقّق CNAME باقيًا في DNS والشهادة مرتبطة بخدمة AWS. والمهمة التالية إرفاقها بـ CloudFront كي يستطيع التوزيع الإجابة عن نطاقك الحقيقي عبر HTTPS.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تحذف سجلات تحقّق CNAME من DNS. فهي مطلوبة للتجديد التلقائي. عاملها كسجلات دائمة.</p>
</blockquote>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>سرد كل الشهادات</strong>: شغّل <code>aws acm list-certificates --region us-east-1 --output json</code> لترى كل شهادة في حسابك. لاحظ كيف تُظهر كل واحدة نطاقها وحالتها.</li>
<li><strong>طلب شهادة ثانية</strong>: جرّب طلب شهادة لنطاق فرعي مختلف (مثل <code>staging.example.com</code>) دون wildcard. قارن عملية التحقّق — هل هي مختلفة؟</li>
<li><strong>استكشاف المخرجات الكاملة</strong>: شغّل <code>aws acm describe-certificate</code> دون علم <code>--query</code> لترى بيانات الشهادة الوصفية الكاملة: خوارزمية المفتاح، والجهة المُصدرة، وتاريخ الإنشاء، وبنية <code>DomainValidationOptions</code> الكاملة.</li>
<li><strong>أتمتتها</strong>: اكتب سكربت صدفة قصيرًا يطلب شهادة، ويستخرج سجلات CNAME، ويطبع السجلات التي تحتاج إلى إضافتها إلى DNS. إضافة: إن كان نطاقك في Route 53، فاجعل السكربت ينشئ السجلات تلقائيًا.</li>
</ul>
<h2 id="التنظيف">التنظيف</h2>
<p>شهادات ACM مجانية ما دامت غير مستخدمة، لكن سجل CNAME للتحقّق يبقى في Route 53 وقد يسبّب ارتباكًا إن نسيت وجوده. وعندما تنتهي من شهادة:</p>
<pre><code class="language-bash">aws acm delete-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234 \\
  --region us-east-1
</code></pre>
<p>ثم احذف سجل CNAME للتحقّق من Route 53 باستخدام <code>change-resource-record-sets</code> مع <code>Action: DELETE</code>. اسم السجل وقيمته هما نفس ما استخدمته للتحقّق — اعثر عليهما بـ<code>aws acm describe-certificate</code> إن لم تكن بحوزتك.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا كانت هذه الشهادة ما زالت مرفقة بتوزيع CloudFront، فسترفض ACM حذفها. افصلها عن التوزيع أولًا.</p>
</blockquote>
`,i={book:n,chapter:"aws",chapterTitle:s,slug:a,title:t,headings:e,html:o};export{n as book,c as chapter,s as chapterTitle,i as default,e as headings,o as html,a as slug,t as title};
