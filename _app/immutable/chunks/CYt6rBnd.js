const s="kinney",l="aws",n="نشر تطبيقات الويب على AWS",a="pointing-a-domain-to-cloudfront",o="توجيه نطاق إلى CloudFront",t=[{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"إنشاء-سجل-a-alias-للنطاق-الجذري",text:"إنشاء سجل A Alias للنطاق الجذري"},{depth:2,id:"إضافة-سجل-aaaa-alias-لدعم-ipv6",text:"إضافة سجل AAAA Alias لدعم IPv6"},{depth:2,id:"التعامل-مع-النطاق-الفرعي-www",text:"التعامل مع النطاق الفرعي www"},{depth:3,id:"الخيار-أ-سجلات-alias-لكليهما",text:"الخيار أ: سجلات Alias لكليهما"},{depth:3,id:"الخيار-ب-cname-من-www-إلى-الجذر",text:"الخيار ب: CNAME من www إلى الجذر"},{depth:2,id:"مع-sdk",text:"مع SDK"},{depth:2,id:"التحقق-من-تحليل-dns",text:"التحقق من تحليل DNS"},{depth:2,id:"زمن-الانتشار",text:"زمن الانتشار"},{depth:2,id:"ما-الذي-بنيته",text:"ما الذي بنيته"}],e=`<p>توزيع CloudFront الخاص بك أصبح يعمل، لكنك تصل إليه الآن عبر شيء مثل <code>d111111abcdef8.cloudfront.net</code>. هذا ليس ما تنشره في الإنتاج. تريد أن يزور المستخدمون <code>example.com</code> ويُخدَم لهم واجهتك الأمامية عبر CloudFront—بشهادة ACM الخاصة بك، وسلوكيات ذاكرة التخزين المؤقت، وتحكّم وصول الأصل. هنا تربط Route 53 البنية التحتية ببعضها: تنشئ سجلات DNS تشير بنطاقك إلى التوزيع، فيختفي رابط CloudFront خلف علامتك التجارية.</p>
<p>إذا أردت نسخة AWS من آليات التوجيه أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html">دليل تهيئة DNS في Route 53</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html">مرجع أمر <code>aws route53 change-resource-record-sets</code></a> مفتوحين.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<p>قبل أن تنشئ سجلات DNS، تحتاج إلى ثلاثة أشياء جاهزة:</p>
<ol>
<li><strong>توزيع CloudFront</strong> مُدرج فيه نطاقك كـ<strong>اسم نطاق بديل (CNAME)</strong>. هيّأت التوزيع في <a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a> وأضفت الأسماء المستعارة في <a href="https://stevekinney.com/courses/aws/attaching-an-ssl-certificate">إرفاق شهادة SSL</a>. إذا لم يُدرج توزيعك <code>example.com</code> (واختياريًا <code>www.example.com</code>) كاسم نطاق بديل، فسترفض Route 53 إنشاء سجل alias يشير إليه.</li>
<li><strong>شهادة ACM</strong> تغطي نطاقك، ومرفقة بالتوزيع. طلبتها في <a href="https://stevekinney.com/courses/aws/requesting-a-certificate-in-acm">طلب شهادة في ACM</a>، وتحقّقت منها في <a href="https://stevekinney.com/courses/aws/dns-validation-vs-email-validation">التحقق عبر DNS مقابل التحقق عبر البريد الإلكتروني</a>، وأرفقتها في <a href="https://stevekinney.com/courses/aws/attaching-an-ssl-certificate">إرفاق شهادة SSL</a>. يجب أن تكون الشهادة في <code>us-east-1</code>.</li>
<li><strong>منطقة مستضافة في Route 53</strong> لنطاقك، مع خوادم أسماء مهيّأة عند مسجّل النطاق لديك. أعددت ذلك في دروس أساس النطاقات وDNS.</li>
</ol>
<h2 id="إنشاء-سجل-a-alias-للنطاق-الجذري">إنشاء سجل A Alias للنطاق الجذري</h2>
<p>الإعداد الأكثر شيوعًا هو توجيه النطاق المجرّد (<code>example.com</code>) إلى توزيع CloudFront. ولأن <code>example.com</code> هو <strong>جذر المنطقة</strong>، لا يمكنك استخدام سجل CNAME هنا (نغطي السبب في <a href="https://stevekinney.com/courses/aws/alias-records-vs-cname-records">سجلات Alias مقابل سجلات CNAME</a>). بدلًا من ذلك، تستخدم <strong>سجل alias</strong> في Route 53.</p>
<p>أولًا، احصل على معرّف منطقتك المستضافة:</p>
<pre><code class="language-bash">aws route53 list-hosted-zones \\
  --output json \\
  --query <span class="hljs-string">&quot;HostedZones[?Name==&#x27;example.com.&#x27;].Id&quot;</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">[</span><span class="hljs-string">&quot;/hostedzone/Z1234567890ABC&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<p>الآن أنشئ سجل A من نوع alias. تستخدم توزيعات CloudFront دائمًا <code>Z2FDTNDATAQYW2</code> كمعرّف المنطقة المستضافة لأهداف alias—وهي قيمة ثابتة لكل توزيعات CloudFront عالميًا:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --output json \\
  --change-batch <span class="hljs-string">&#x27;{
    &quot;Changes&quot;: [
      {
        &quot;Action&quot;: &quot;UPSERT&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;example.com&quot;,
          &quot;Type&quot;: &quot;A&quot;,
          &quot;AliasTarget&quot;: {
            &quot;HostedZoneId&quot;: &quot;Z2FDTNDATAQYW2&quot;,
            &quot;DNSName&quot;: &quot;d111111abcdef8.cloudfront.net&quot;,
            &quot;EvaluateTargetHealth&quot;: false
          }
        }
      }
    ]
  }&#x27;</span>
</code></pre>
<p>ثمة أمور قليلة جديرة بالملاحظة في ذلك الأمر:</p>
<ul>
<li><strong><code>HostedZoneId</code></strong> هو <code>Z2FDTNDATAQYW2</code>. هذا ليس معرّف منطقتك المستضافة—بل هو المعرّف الثابت الذي تستخدمه Route 53 لكل توزيعات CloudFront. كل سجل alias يشير إلى CloudFront يستخدم القيمة نفسها.</li>
<li><strong><code>DNSName</code></strong> هو اسم نطاق توزيع CloudFront الخاص بك (قيمة <code>d111111abcdef8.cloudfront.net</code>).</li>
<li><strong><code>EvaluateTargetHealth</code></strong> هو <code>false</code>. لا تدعم CloudFront فحوص صحة Route 53، لذا يجب أن تكون هذه القيمة <code>false</code> دائمًا لأهداف alias الخاصة بـ CloudFront.</li>
<li>لا يوجد حقل <code>TTL</code>. ترث سجلات alias قيمة TTL من المورد الهدف—وتتولى Route 53 ذلك تلقائيًا.</li>
</ul>
<p>تؤكد الاستجابة التغيير:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ChangeInfo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/change/C1234567890ABC&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SubmittedAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تعني <code>PENDING</code> أن Route 53 ينشر التغيير. يكتمل هذا عادةً في أقل من 60 ثانية.</p>
<h2 id="إضافة-سجل-aaaa-alias-لدعم-ipv6">إضافة سجل AAAA Alias لدعم IPv6</h2>
<p>تدعم CloudFront بروتوكول IPv6 افتراضيًا. لضمان تحليل نطاقك بشكل صحيح للعملاء على شبكات IPv6، أنشئ سجل alias ثانيًا من النوع <code>AAAA</code>:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --output json \\
  --change-batch <span class="hljs-string">&#x27;{
    &quot;Changes&quot;: [
      {
        &quot;Action&quot;: &quot;UPSERT&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;example.com&quot;,
          &quot;Type&quot;: &quot;AAAA&quot;,
          &quot;AliasTarget&quot;: {
            &quot;HostedZoneId&quot;: &quot;Z2FDTNDATAQYW2&quot;,
            &quot;DNSName&quot;: &quot;d111111abcdef8.cloudfront.net&quot;,
            &quot;EvaluateTargetHealth&quot;: false
          }
        }
      }
    ]
  }&#x27;</span>
</code></pre>
<p>الأمر مطابق لسجل A، إلا أن <code>&quot;Type&quot;</code> هو <code>&quot;AAAA&quot;</code>. يحلّل Route 53 الـ alias إلى عناوين IPv6 المناسبة لتوزيع CloudFront الخاص بك. (أعلم أنه يبدو زائدًا عن الحاجة، لكن دعم IPv6 من الأشياء التي ستكون سعيدًا لأنك أعددتها من البداية.)</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمكنك دمج السجلين في استدعاء واحد لـ <code>change-resource-record-sets</code> بتضمين التغييرين في مصفوفة <code>Changes</code>. هذا أنظف للنصوص البرمجية ويضمن إنشاء السجلين بشكل ذرّي.</p>
</blockquote>
<h2 id="التعامل-مع-النطاق-الفرعي-www">التعامل مع النطاق الفرعي www</h2>
<p>تعرض معظم المواقع حركة المرور على <code>example.com</code> و<code>www.example.com</code> معًا. لديك خياران:</p>
<h3 id="الخيار-أ-سجلات-alias-لكليهما">الخيار أ: سجلات Alias لكليهما</h3>
<p>أنشئ سجلات alias نفسها من النوعين A وAAAA لـ <code>www.example.com</code>، تشير إلى توزيع CloudFront نفسه. هذا يعني أن الجذر و<code>www</code> يحلّان مباشرة إلى CloudFront:</p>
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
          &quot;AliasTarget&quot;: {
            &quot;HostedZoneId&quot;: &quot;Z2FDTNDATAQYW2&quot;,
            &quot;DNSName&quot;: &quot;d111111abcdef8.cloudfront.net&quot;,
            &quot;EvaluateTargetHealth&quot;: false
          }
        }
      },
      {
        &quot;Action&quot;: &quot;UPSERT&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;www.example.com&quot;,
          &quot;Type&quot;: &quot;AAAA&quot;,
          &quot;AliasTarget&quot;: {
            &quot;HostedZoneId&quot;: &quot;Z2FDTNDATAQYW2&quot;,
            &quot;DNSName&quot;: &quot;d111111abcdef8.cloudfront.net&quot;,
            &quot;EvaluateTargetHealth&quot;: false
          }
        }
      }
    ]
  }&#x27;</span>
</code></pre>
<p>تأكد من أن <code>www.example.com</code> مُدرج كاسم نطاق بديل في توزيع CloudFront الخاص بك، وأن شهادة ACM تغطيه (شهادة wildcard مثل <code>*.example.com</code> تتولى ذلك تلقائيًا).</p>
<h3 id="الخيار-ب-cname-من-www-إلى-الجذر">الخيار ب: CNAME من www إلى الجذر</h3>
<p>أنشئ سجل CNAME يربط <code>www.example.com</code> بـ <code>example.com</code>. ولأن <code>www</code> ليس جذر المنطقة، فسجل CNAME صالح هنا:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --output json \\
  --change-batch <span class="hljs-string">&#x27;{
    &quot;Changes&quot;: [
      {
        &quot;Action&quot;: &quot;UPSERT&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;www.example.com&quot;,
          &quot;Type&quot;: &quot;CNAME&quot;,
          &quot;TTL&quot;: 300,
          &quot;ResourceRecords&quot;: [
            {
              &quot;Value&quot;: &quot;example.com&quot;
            }
          ]
        }
      }
    ]
  }&#x27;</span>
</code></pre>
<p>الخيار أ أفضل لأن سجلات alias مجانية (بلا رسوم استعلامات) وتُحلّ في خطوة واحدة. أما الخيار ب فيضيف بحث DNS إضافيًا ويتحمّل رسوم الاستعلامات المعتادة.</p>
<h2 id="مع-sdk">مع SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">Route53Client</span>,
  <span class="hljs-title class_">ChangeResourceRecordSetsCommand</span>,
  <span class="hljs-title class_">ListHostedZonesCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-route-53&#x27;</span>;

<span class="hljs-keyword">const</span> r53 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Route53Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });
<span class="hljs-comment">// Route 53 is a global service — the SDK requires a region for signing but</span>
<span class="hljs-comment">// the actual API endpoint is us-east-1 behind the scenes.</span>

<span class="hljs-keyword">const</span> zones = <span class="hljs-keyword">await</span> r53.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ListHostedZonesCommand</span>({}));
<span class="hljs-keyword">const</span> zoneId = zones.<span class="hljs-property">HostedZones</span>?.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">z</span>) =&gt;</span> z.<span class="hljs-property">Name</span> === <span class="hljs-string">&#x27;example.com.&#x27;</span>)
  ?.<span class="hljs-property">Id</span>?.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;/&#x27;</span>)
  .<span class="hljs-title function_">pop</span>()!;

<span class="hljs-keyword">await</span> r53.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">ChangeResourceRecordSetsCommand</span>({
    <span class="hljs-title class_">HostedZoneId</span>: zoneId,
    <span class="hljs-title class_">ChangeBatch</span>: {
      <span class="hljs-title class_">Changes</span>: [
        <span class="hljs-comment">// Apex A-alias + AAAA-alias + www in a single atomic change.</span>
        ...([<span class="hljs-string">&#x27;A&#x27;</span>, <span class="hljs-string">&#x27;AAAA&#x27;</span>] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>).<span class="hljs-title function_">flatMap</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">type</span></span>) =&gt;</span>
          [<span class="hljs-string">&#x27;example.com&#x27;</span>, <span class="hljs-string">&#x27;www.example.com&#x27;</span>].<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> ({
            <span class="hljs-title class_">Action</span>: <span class="hljs-string">&#x27;UPSERT&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
            <span class="hljs-title class_">ResourceRecordSet</span>: {
              <span class="hljs-title class_">Name</span>: name,
              <span class="hljs-title class_">Type</span>: <span class="hljs-keyword">type</span>,
              <span class="hljs-title class_">AliasTarget</span>: {
                <span class="hljs-comment">// The hardcoded CloudFront alias hosted zone ID.</span>
                <span class="hljs-title class_">HostedZoneId</span>: <span class="hljs-string">&#x27;Z2FDTNDATAQYW2&#x27;</span>,
                <span class="hljs-title class_">DNSName</span>: <span class="hljs-string">&#x27;d1234abcdef.cloudfront.net&#x27;</span>,
                <span class="hljs-title class_">EvaluateTargetHealth</span>: <span class="hljs-literal">false</span>,
              },
            },
          })),
        ),
      ],
    },
  }),
);
</code></pre>
<p>يتيح لك SDK تجميع عدة تغييرات سجلات في استدعاء واحد دون رقصة ملف JSON التي تحتاجها CLI. إن <code>UPSERT</code> عملية متساوية الأثر (idempotent): تنشئ السجل إن كان مفقودًا وتستبدله إن كان موجودًا.</p>
<h2 id="التحقق-من-تحليل-dns">التحقق من تحليل DNS</h2>
<p>بعد إنشاء سجلاتك، تحقّق من أن DNS يُحلّ بشكل صحيح.</p>
<p>افحص سجل A:</p>
<pre><code class="language-bash">dig example.com A +short
</code></pre>
<p>ينبغي أن ترى عنوان IP واحدًا أو أكثر—وهي عناوين IP لخوادم حافة CloudFront. ستختلف حسب المنطقة وبمرور الوقت؛ وهذا متوقع.</p>
<p>افحص سجل AAAA:</p>
<pre><code class="language-bash">dig example.com AAAA +short
</code></pre>
<p>ينبغي أن ترى عنوان IPv6 واحدًا أو أكثر.</p>
<p>لتجاوز ذاكرات التخزين المؤقت والاستعلام من Route 53 مباشرةً، استخدم أحد خوادم الأسماء من منطقتك المستضافة:</p>
<pre><code class="language-bash">dig example.com A @ns-1234.awsdns-56.org +short
</code></pre>
<p>إذا أعاد هذا عناوين IP الصحيحة لكن <code>dig example.com A +short</code> لم يفعل، فالسجلات صحيحة عند المصدر وأنت تنتظر انتهاء صلاحية ذاكرات التخزين المؤقت.</p>
<p>يمكنك أيضًا التحقق في المتصفح. انتقل إلى <code>https://example.com</code>. إذا كانت شهادة ACM مرفقة بالتوزيع واسم النطاق البديل مهيأ، فينبغي أن ترى موقعك يُخدَم عبر HTTPS بشهادة صالحة. افحص شريط عنوان المتصفح بحثًا عن أيقونة القفل.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا رأيت خطأ CloudFront مثل «Bad Request» أو «The request could not be satisfied»، فالسبب الأرجح أن نطاقك غير مُدرج كاسم نطاق بديل في توزيع CloudFront. ترفض CloudFront الطلبات لأسماء المضيف التي لا تعرفها. تحقّق مرة أخرى من إعدادات التوزيع في وحدة التحكم أو شغّل <code>aws cloudfront get-distribution-config --id E1A2B3C4D5E6F7 --output json --query &quot;DistributionConfig.Aliases&quot;</code>.</p>
</blockquote>
<h2 id="زمن-الانتشار">زمن الانتشار</h2>
<p>تسري تغييرات DNS في Route 53 خلال 60 ثانية على خوادم أسماء Route 53 نفسها. لكن هذا لا يعني أن كل مستخدم على الإنترنت يرى التغيير فورًا. ربما خزّنت المحلّلات العودية حول العالم الإجابة القديمة مؤقتًا، وستستمر في تقديمها حتى تنتهي صلاحية TTL.</p>
<p>إذا ضبطت TTL بقيمة 300 ثانية (5 دقائق) على السجل السابق، فأسوأ حالة هي أن يرى بعض المستخدمين السجل القديم لمدة تصل إلى 5 دقائق بعد التغيير. أما السجلات الجديدة التي لم تكن موجودة سابقًا، فلا ذاكرة قديمة تنتهي صلاحيتها—يصبح السجل مرئيًا بمجرد أن ينشره Route 53.</p>
<h2 id="ما-الذي-بنيته">ما الذي بنيته</h2>
<p>أنشأت سجلات alias من النوعين A وAAAA توجّه نطاقك إلى توزيع CloudFront الخاص بك. أصبح موقعك الآن متاحًا على <code>example.com</code> عبر HTTPS، يُخدَم من خلال شبكة الحافة العالمية لـ CloudFront، مع سحب المحتوى من حاوية S3 الخاصة بك. هذه هي الحزمة: S3 يخزّن الملفات، وCloudFront يوزّعها، وACM يؤمّنها، وRoute 53 يجعلها قابلة للوصول على نطاقك.</p>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:o,headings:t,html:e};export{s as book,l as chapter,n as chapterTitle,c as default,t as headings,e as html,a as slug,o as title};
