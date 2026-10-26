const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="hosted-zones-and-record-types",t="المناطق المستضافة وأنواع السجلات",e=[{depth:2,id:"إنشاء-منطقة-مستضافة",text:"إنشاء منطقة مستضافة"},{depth:2,id:"المناطق-المستضافة-العامة-مقابل-الخاصة",text:"المناطق المستضافة العامة مقابل الخاصة"},{depth:2,id:"سجلات-ns-والتفويض",text:"سجلات NS والتفويض"},{depth:2,id:"سجلات-soa",text:"سجلات SOA"},{depth:2,id:"أنواع-السجلات",text:"أنواع السجلات"},{depth:3,id:"سجلات-a",text:"سجلات A"},{depth:3,id:"سجلات-aaaa",text:"سجلات AAAA"},{depth:3,id:"سجلات-cname",text:"سجلات CNAME"},{depth:3,id:"سجلات-mx",text:"سجلات MX"},{depth:3,id:"سجلات-txt",text:"سجلات TXT"},{depth:2,id:"إنشاء-السجلات-عبر-cli",text:"إنشاء السجلات عبر CLI"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"تكاليف-المنطقة-المستضافة",text:"تكاليف المنطقة المستضافة"},{depth:2,id:"ما-الذي-بنيته",text:"ما الذي بنيته"},{depth:2,id:"التنظيف",text:"التنظيف"}],o=`<p><strong>المنطقة المستضافة</strong> هي حاوية Route 53 لسجلات DNS. وإذا تصوّرت DNS كدفتر هاتف، فالمنطقة المستضافة هي الصفحة الخاصة بنطاقك—إذ تضم كل سجل يخبر الإنترنت بكيفية الوصول إلى خدماتك. وعندما تنشئ منطقة مستضافة لـ <code>example.com</code>، تصبح Route 53 خادم الأسماء الموثوق لذلك النطاق، ويُجاب عن كل استعلام DNS لـ <code>example.com</code> أو نطاقاته الفرعية بالسجلات التي تهيّئها داخل المنطقة.</p>
<p>إن أردت شرح AWS المرجعي للمناطق المستضافة والتفويض، فأبقِ <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html">دليل تهيئة DNS في Route 53</a> و<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html">دليل المناطق المستضافة</a> مفتوحين.</p>
<p>إذا كنت قد سجّلت نطاقك عبر Route 53 في الدرس السابق، فقد تكون لديك منطقة مستضافة بالفعل. أما إذا كان نطاقك موجودًا في مكان آخر، فهذه هي الخطوة التي تصبح فيها Route 53 موثوقة لـ DNS.</p>
<h2 id="إنشاء-منطقة-مستضافة">إنشاء منطقة مستضافة</h2>
<p>يمكنك إنشاء منطقة مستضافة في وحدة التحكم أو في CLI. وإليك نسخة CLI:</p>
<pre><code class="language-bash">aws route53 create-hosted-zone \\
  --name example.com \\
  --caller-reference <span class="hljs-string">&quot;example-com-<span class="hljs-subst">$(date +%s)</span>&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p><code>--caller-reference</code> سلسلة فريدة تمنع إنشاء مناطق مستضافة مكرّرة إذا شغّلت الأمر مرتين عن غير قصد. والطابع الزمني يفي بالغرض هنا.</p>
<p>تتضمن الاستجابة معرّف المنطقة المستضافة وخوادم الأسماء الأربعة التي خصّصتها Route 53:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;HostedZone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/hostedzone/Z1234567890ABC&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;CallerReference&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example-com-1710720000&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Config&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;PrivateZone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ResourceRecordSetCount&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;DelegationSet&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;NameServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-string">&quot;ns-1234.awsdns-56.org&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-string">&quot;ns-567.awsdns-12.net&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-string">&quot;ns-890.awsdns-34.co.uk&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-string">&quot;ns-123.awsdns-78.com&quot;</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ChangeInfo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/change/C1234567890ABC&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SubmittedAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لاحظ أن <code>ResourceRecordSetCount</code> يبدأ من 2. فـRoute 53 تنشئ تلقائيًا سجلين لكل منطقة مستضافة جديدة: <strong>سجل NS</strong> و<strong>سجل SOA</strong>. وهذان أساس منطقتك، ولا ينبغي أن تحذفهما.</p>
<h2 id="المناطق-المستضافة-العامة-مقابل-الخاصة">المناطق المستضافة العامة مقابل الخاصة</h2>
<p>تدعم Route 53 نوعين من المناطق المستضافة:</p>
<ul>
<li><strong>المناطق المستضافة العامة</strong> تجيب عن استعلامات DNS القادمة من الإنترنت العام. وهذا ما تستخدمه لواجهتك الأمامية: يستعلم المستخدمون حول العالم عن DNS لـ <code>example.com</code>، فتجيب منطقتك المستضافة العامة.</li>
<li><strong>المناطق المستضافة الخاصة</strong> تجيب عن استعلامات DNS من داخل شبكة VPC واحدة أو أكثر (سحابة خاصة افتراضية). وتُستخدم لاكتشاف الخدمات الداخلية—حيث تجد خدمة مصغّرة خدمة أخرى داخل شبكة AWS لديك. وهذا ليس ما تحتاجه لاستضافة الواجهة الأمامية.</li>
</ul>
<p>في هذه الدورة، كل منطقة مستضافة عامة. وإذا رأيت <code>&quot;PrivateZone&quot;: false</code> في مخرجاتك، فأنت على المسار الصحيح.</p>
<h2 id="سجلات-ns-والتفويض">سجلات NS والتفويض</h2>
<p>تسرد <strong>سجلات NS (خادم الأسماء)</strong> في منطقتك المستضافة خوادم الأسماء الأربعة التي خصّصتها Route 53. وهذه هي الخوادم التي ستجيب عن استعلامات DNS لنطاقك. لكن هناك عقبة: وجود سجلات NS داخل منطقتك المستضافة لا يفعل شيئًا بحد ذاته. تحتاج أيضًا إلى إخبار مسجّل نطاقك باستخدام خوادم الأسماء هذه.</p>
<p>إذا سجّلت نطاقك عبر Route 53، يحدث هذا تلقائيًا—إذ تنشئ Route 53 المنطقة المستضافة وتحدّث خوادم أسماء التسجيل في خطوة واحدة. أما إذا سجّلت نطاقك في مكان آخر (GoDaddy أو Namecheap أو Squarespace أو Cloudflare)، فعليك تسجيل الدخول إلى مسجّلك واستبدال خوادم الأسماء الافتراضية بخوادم Route 53 الأربعة.</p>
<p>هذه هي لحظة <strong>التفويض</strong>: أنت تخبر التسلسل الهرمي لـ DNS: «عندما يسأل أحدهم عن <code>example.com</code>، أرسله إلى Route 53». وإلى أن تفعل ذلك، تكون منطقتك المستضافة موجودة لكن لا أحد يعرف أنه يجب سؤالها عن أي شيء.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>عند تغيير خوادم الأسماء لدى مسجّلك، قد يتعطّل تحليل DNS لنطاقك لفترة من الوقت. فتتوقف خوادم الأسماء القديمة عن الإجابة، وتتولى الخوادم الجديدة العمل مع انتشار التغيير عبر ذاكرات DNS المؤقتة. خطّط لذلك في نافذة زيارات منخفضة، واخفض مدد TTL مسبقًا (كما نوقش في <a href="https://stevekinney.com/courses/aws/dns-for-frontend-engineers">DNS لمهندسي الواجهة الأمامية</a>).</p>
</blockquote>
<h2 id="سجلات-soa">سجلات SOA</h2>
<p>يحتوي <strong>سجل SOA (بداية التفويض)</strong> على معلومات إدارية عن المنطقة: خادم الأسماء الأساسي، وبريد مدير النطاق، والرقم التسلسلي (الذي يزداد عند التغييرات)، وقيم التوقيت لفترات تحديث التخزين المؤقت. تدير Route 53 سجل SOA نيابة عنك. لا تحتاج إلى تحريره، والأفضل أن تتركه وشأنه.</p>
<h2 id="أنواع-السجلات">أنواع السجلات</h2>
<p>إليك أنواع سجلات DNS التي ستتعامل معها في Route 53. كل نوع يخدم غرضًا مختلفًا، ومعرفة متى تستخدم كلًا منها هي الفرق بين عملية نشر عاملة وجلسة تصحيح محيّرة.</p>
<h3 id="سجلات-a">سجلات A</h3>
<p>يربط <strong>سجل A</strong> اسم نطاق بعنوان IPv4. وهذا هو النوع الأساسي من سجلات DNS—إذ يجيب عن السؤال «بأي عنوان IP ينبغي أن أتصل؟»</p>
<pre><code>example.com.    300    IN    A    192.0.2.1
</code></pre>
<p>في Route 53، ستستخدم غالبًا سجلات A مع ميزة <strong>الاسم البديل (alias)</strong> بدلًا من الإشارة إلى عنوان IP خام. فسجل A البديل يشير إلى مورد AWS (مثل توزيع CloudFront) ويُحلّ إلى عناوين IP التي يستخدمها ذلك المورد حاليًا. وستستخدم ذلك لاحقًا عندما توجّه نطاقك إلى CloudFront.</p>
<h3 id="سجلات-aaaa">سجلات AAAA</h3>
<p><strong>سجل AAAA</strong> مطابق لسجل A، لكن لعناوين IPv6. عناوين IPv6 بطول 128 بت (مقارنة بـ 32 بت في IPv4)، لذا تبدو مثل <code>2001:0db8:85a3::8a2e:0370:7334</code>.</p>
<p>يدعم CloudFront بروتوكول IPv6 افتراضيًا. وإذا أردت أن يُحلّ نطاقك عبر IPv4 وIPv6 معًا، فأنشئ سجل A وسجل AAAA يشيران إلى توزيع CloudFront نفسه.</p>
<h3 id="سجلات-cname">سجلات CNAME</h3>
<p>يربط <strong>سجل CNAME (الاسم القانوني)</strong> اسم نطاق باسم نطاق آخر. فبدلًا من الإجابة بعنوان IP، يقول: «اذهب واسأل ذلك النطاق الآخر بدلًا مني».</p>
<pre><code>www.example.com.    300    IN    CNAME    d111111abcdef8.cloudfront.net.
</code></pre>
<p>عندما يصادف مُحلِّل سجل CNAME، فإنه يتبع السلسلة: يبحث عن النطاق الهدف (<code>d111111abcdef8.cloudfront.net</code>) ويعيد أي سجل A أو AAAA يجده هناك.</p>
<p>لسجلات CNAME قيد جوهري واحد: <strong>لا يمكن استخدامها عند قمة المنطقة</strong>. فقمة المنطقة هي النطاق المجرّد—<code>example.com</code> دون أي بادئة نطاق فرعي. وهذا قاعدة أساسية في بروتوكول DNS، لا قيد من AWS. فإذا حاولت إنشاء سجل CNAME لـ <code>example.com</code>، فسيتعارض مع سجلي NS وSOA اللذين يجب أن يوجدَا عند القمة. ولهذا السبب تحديدًا توجد سجلات الاسم البديل في Route 53—فهي تحل هذه المشكلة.</p>
<h3 id="سجلات-mx">سجلات MX</h3>
<p>تحدد <strong>سجلات MX (تبادل البريد)</strong> خوادم البريد المسؤولة عن استقبال البريد لنطاقك. ويتضمن كل سجل MX رقم أولوية (تُجرَّب الأرقام الأقل أولًا) واسم المضيف لخادم البريد.</p>
<pre><code>example.com.    300    IN    MX    10 mail.example.com.
example.com.    300    IN    MX    20 mail-backup.example.com.
</code></pre>
<p>على الأرجح لا تحتاج إلى إنشاء سجلات MX لنشر واجهة أمامية. لكن إذا كنت تدير النطاق كاملًا في Route 53 وتستخدم مزوّد بريد خارجيًا (Google Workspace أو Microsoft 365)، فستضيف سجلات MX الخاصة به إلى منطقتك المستضافة.</p>
<h3 id="سجلات-txt">سجلات TXT</h3>
<p>تحمل <strong>سجلات TXT</strong> سلاسل نصية اعتباطية. وهي سكين الجيش السويسري في DNS، وتُستخدم في:</p>
<ul>
<li><strong>التحقق من النطاق</strong>: تستخدم Google Search Console ومزوّدو البريد وسلطات الشهادات سجلات TXT لإثبات تحكّمك بنطاق.</li>
<li><strong>مصادقة البريد</strong>: سجلات SPF وDKIM وDMARC كلها سجلات TXT تساعد في منع انتحال البريد.</li>
<li><strong>التحقق من الشهادات أو الخدمات</strong>: تثبت بعض الأنظمة ملكية النطاق بسجلات TXT. ويصادف أن ACM يستخدم سجلات CNAME للتحقق عبر DNS، لكن الفكرة نفسها.</li>
</ul>
<pre><code>example.com.    300    IN    TXT    &quot;v=spf1 include:_spf.google.com ~all&quot;
</code></pre>
<h2 id="إنشاء-السجلات-عبر-cli">إنشاء السجلات عبر CLI</h2>
<p>لإنشاء سجل DNS في Route 53، تستخدم الأمر <code>change-resource-record-sets</code>. وإليك مثالًا ينشئ سجل A قياسيًا:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --output json \\
  --change-batch <span class="hljs-string">&#x27;{
    &quot;Changes&quot;: [
      {
        &quot;Action&quot;: &quot;UPSERT&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;www.example.com&quot;,
          &quot;Type&quot;: &quot;A&quot;,
          &quot;TTL&quot;: 300,
          &quot;ResourceRecords&quot;: [
            {
              &quot;Value&quot;: &quot;192.0.2.1&quot;
            }
          ]
        }
      }
    ]
  }&#x27;</span>
</code></pre>
<p>إجراء <code>UPSERT</code> ينشئ السجل إن لم يكن موجودًا، أو يحدّثه إن كان موجودًا. وهذا هو ما تريده دائمًا تقريبًا—فهو عديم الأثر التكراري (idempotent)، لذا لا يسبب تشغيل الأمر مرتين أي خطأ.</p>
<p>يمكنك أيضًا سرد كل السجلات في منطقة مستضافة:</p>
<pre><code class="language-bash">aws route53 list-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --output json
</code></pre>
<p>يعيد هذا كل سجل في المنطقة، بما في ذلك سجلا NS وSOA اللذان أنشأتهما Route 53 تلقائيًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم <code>UPSERT</code> بدلًا من <code>CREATE</code> لتغييرات السجلات. فـ<code>CREATE</code> يفشل إذا كان السجل موجودًا بالفعل، ما يجعله مزعجًا في السكربتات والأتمتة. أما <code>UPSERT</code> فيتعامل مع الحالتين.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">Route53Client</span>,
  <span class="hljs-title class_">CreateHostedZoneCommand</span>,
  <span class="hljs-title class_">ListResourceRecordSetsCommand</span>,
  <span class="hljs-title class_">ChangeResourceRecordSetsCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-route-53&#x27;</span>;

<span class="hljs-keyword">const</span> r53 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Route53Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> zone = <span class="hljs-keyword">await</span> r53.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateHostedZoneCommand</span>({
    <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
    <span class="hljs-title class_">CallerReference</span>: <span class="hljs-string">\`zone-<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>\`</span>,
  }),
);
<span class="hljs-keyword">const</span> zoneId = zone.<span class="hljs-property">HostedZone</span>!.<span class="hljs-property">Id</span>!.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;/&#x27;</span>).<span class="hljs-title function_">pop</span>()!;

<span class="hljs-keyword">await</span> r53.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">ChangeResourceRecordSetsCommand</span>({
    <span class="hljs-title class_">HostedZoneId</span>: zoneId,
    <span class="hljs-title class_">ChangeBatch</span>: {
      <span class="hljs-title class_">Changes</span>: [
        {
          <span class="hljs-title class_">Action</span>: <span class="hljs-string">&#x27;UPSERT&#x27;</span>,
          <span class="hljs-title class_">ResourceRecordSet</span>: {
            <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
            <span class="hljs-title class_">Type</span>: <span class="hljs-string">&#x27;A&#x27;</span>,
            <span class="hljs-attr">TTL</span>: <span class="hljs-number">300</span>,
            <span class="hljs-title class_">ResourceRecords</span>: [{ <span class="hljs-title class_">Value</span>: <span class="hljs-string">&#x27;192.0.2.1&#x27;</span> }],
          },
        },
      ],
    },
  }),
);

<span class="hljs-keyword">const</span> records = <span class="hljs-keyword">await</span> r53.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ListResourceRecordSetsCommand</span>({ <span class="hljs-title class_">HostedZoneId</span>: zoneId }));
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(records.<span class="hljs-property">ResourceRecordSets</span>);
</code></pre>
<h2 id="تكاليف-المنطقة-المستضافة">تكاليف المنطقة المستضافة</h2>
<p>تفرض Route 53 رسومًا قدرها <strong>0.50 دولار لكل منطقة مستضافة شهريًا</strong> لأول 25 منطقة. وإذا أنشأت منطقة مستضافة وحذفتها خلال 12 ساعة، فلا تُحصَّل منك رسوم. وتُحتسب استعلامات DNS بشكل منفصل بواقع 0.40 دولار لكل مليون استعلام في التوجيه القياسي—وبالنسبة إلى واجهة أمامية نموذجية، هذه بضعة سنتات.</p>
<p>رسوم المنطقة المستضافة هي التكلفة المستمرة الوحيدة التي تدفعها لمجرد وجود DNS مهيّأ، بصرف النظر عن الزيارات. ولمجال واحد يشغّل واجهتك الأمامية، فأنت تنظر إلى 0.50 دولار شهريًا إضافة إلى تكاليف استعلامات لا تُذكر.</p>
<h2 id="ما-الذي-بنيته">ما الذي بنيته</h2>
<p>أنت تفهم الآن ما هي المنطقة المستضافة، وكيف تنشئ واحدة، وما أنواع السجلات المتاحة، ومتى تستخدم كلًا منها. وبصراحة، أجد هذا من المجالات التي تكون فيها المفردات أخطر من المفاهيم نفسها—فبمجرد أن ترى سجل NS وسجل A جنبًا إلى جنب، يترابط النظام كله في ذهنك.</p>
<p>وهذا يهم فورًا، لأن الخطوة التالية هي التحقق من الشهادة. فـACM على وشك أن يسلمك سجلات DNS ويطلب منك إثبات تحكّمك بالنطاق. وهذا الطلب لا يكون منطقيًا إلا عندما تعرف أين تعيش تلك السجلات ومن هو الموثوق بها.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>تكلّف المناطق المستضافة <strong>0.50 دولار شهريًا</strong> طالما بقيت موجودة. وإذا أنشأت واحدة لهذا التمرين ولم تعد تحتاجها، فاحذفها. ويجب أن تكون المنطقة المستضافة فارغة—بحيث لا يبقى سوى سجلي NS وSOA الافتراضيين—قبل الحذف. وأي سجلات A أو AAAA أو CNAME أضفتها يجب إزالتها أولًا باستخدام <code>change-resource-record-sets</code> مع <code>Action: DELETE</code>.</p>
<p>وبمجرد أن تصبح المنطقة فارغة:</p>
<pre><code class="language-bash">aws route53 delete-hosted-zone \\
  --<span class="hljs-built_in">id</span> Z1234567890ABC \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>استبدل <code>Z1234567890ABC</code> بمعرّف منطقتك المستضافة الفعلي من مخرجات <code>list-hosted-zones</code>.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:o};export{s as book,p as chapter,n as chapterTitle,l as default,e as headings,o as html,a as slug,t as title};
