const s="kinney",u="aws",n="نشر تطبيقات الويب على AWS",a="route-53-dns-solution",t="الحل",o=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"تأكيد-المنطقة-المستضافة",text:"تأكيد المنطقة المستضافة"},{depth:3,id:"تأكيد-خوادم-الأسماء-للمسجل-الخارجي-فقط",text:"تأكيد خوادم الأسماء (للمسجّل الخارجي فقط)"},{depth:2,id:"إنشاء-سجل-a-مستعار-لنطاق-الجذر",text:"إنشاء سجل A مستعار لنطاق الجذر"},{depth:2,id:"إنشاء-سجل-aaaa-مستعار-لـ-ipv6",text:"إنشاء سجل AAAA مستعار لـ IPv6"},{depth:2,id:"إنشاء-سجلات-لـ-www",text:"إنشاء سجلات لـ www"},{depth:2,id:"التحقق-من-تحليل-dns",text:"التحقق من تحليل DNS"},{depth:3,id:"التحقق-في-المتصفح",text:"التحقق في المتصفح"},{depth:2,id:"سرد-كل-السجلات",text:"سرد كل السجلات"},{depth:2,id:"الملخص",text:"الملخّص"}],p=`<p>هذا هو حل <a href="https://stevekinney.com/courses/aws/route-53-dns-exercise">تمرين DNS في Route 53</a>. وتتضمن كل خطوة الأوامر الدقيقة، والمخرجات المتوقعة، وإرشادات استكشاف الأخطاء.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا بدت وحدة تحكم Route 53 مختلفة قليلًا عند تنفيذك، فأبقِ <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html">دليل تهيئة DNS في Route 53</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html">مرجع أمر <code>aws route53 change-resource-record-sets</code></a> مفتوحين.</p>
</blockquote>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>سجلات الاسم المستعار تتيح لنطاق الجذر أن يشير إلى CloudFront دون خرق قواعد DNS المعتادة بشأن سجلات CNAME عند جذر المنطقة.</li>
<li>لا يصبح Route 53 موثوقًا (authoritative) إلا بعد أن يفوّض المسجّل النطاق إلى خوادم أسمائه، ولهذا فإن تغييرات خوادم الأسماء تهمّ بقدر ما يهمّ إنشاء السجلات.</li>
<li>التحقّق بـ <code>dig</code> والمتصفح معًا يثبت أن المكدّس من DNS إلى TLS إلى CloudFront يعمل فعلًا، لا أنه مُعدّ على الورق فقط.</li>
</ul>
<h2 id="تأكيد-المنطقة-المستضافة">تأكيد المنطقة المستضافة</h2>
<pre><code class="language-bash">aws route53 list-hosted-zones-by-name \\
  --dns-name example.com \\
  --output json
</code></pre>
<p><strong>المخرجات المتوقعة:</strong></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;HostedZones&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/hostedzone/Z1234567890ABC&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Config&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;PrivateZone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ResourceRecordSetCount&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ معرّف المنطقة المستضافة لاستخدامه لاحقًا:</p>
<pre><code class="language-bash">HOSTED_ZONE_ID=<span class="hljs-string">&quot;Z1234567890ABC&quot;</span>
</code></pre>
<p>أو استخرجه برمجيًا:</p>
<pre><code class="language-bash">HOSTED_ZONE_ID=$(aws route53 list-hosted-zones \\
  --output json \\
  --query <span class="hljs-string">&quot;HostedZones[?Name==&#x27;example.com.&#x27;].Id | [0]&quot;</span> \\
  | <span class="hljs-built_in">tr</span> -d <span class="hljs-string">&#x27;&quot;&#x27;</span> | sed <span class="hljs-string">&#x27;s|/hostedzone/||&#x27;</span>)

<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;<span class="hljs-variable">$HOSTED_ZONE_ID</span>&quot;</span>
</code></pre>
<p><strong>إذا حدث خطأ ما:</strong></p>
<ul>
<li>يعيد الاستعلام قائمة فارغة: ليس لديك منطقة مستضافة فعلًا بعد. ارجع إلى <a href="https://stevekinney.com/courses/aws/hosted-zones-and-record-types">المناطق المستضافة وأنواع السجلات</a>، وأنشئ واحدة، وتأكّد من أن المسجّل يشير إلى خوادم أسمائها قبل المتابعة.</li>
<li>المنطقة المستضافة موجودة لكن DNS العام يفشل لاحقًا: المسجّل ما زال يستخدم خوادم الأسماء الخطأ.</li>
</ul>
<h3 id="تأكيد-خوادم-الأسماء-للمسجل-الخارجي-فقط">تأكيد خوادم الأسماء (للمسجّل الخارجي فقط)</h3>
<p>إذا كان نطاقك مسجّلًا خارج Route 53، فتأكّد من أن المسجّل يستخدم خوادم أسماء Route 53 بالفعل:</p>
<pre><code>ns-1234.awsdns-56.org
ns-567.awsdns-12.net
ns-890.awsdns-34.co.uk
ns-123.awsdns-78.com
</code></pre>
<p>استخدم خوادم الأسماء الفعلية من منطقتك المستضافة، لا هذه الأمثلة. وبعد التحديث، تحقّق من أن التفويض يعمل:</p>
<pre><code class="language-bash">dig example.com NS +short
</code></pre>
<p><strong>المخرجات المتوقعة</strong> (بعد الانتشار):</p>
<pre><code>ns-1234.awsdns-56.org.
ns-567.awsdns-12.net.
ns-890.awsdns-34.co.uk.
ns-123.awsdns-78.com.
</code></pre>
<p>إذا كنت لا تزال ترى خوادم الأسماء القديمة، فالانتشار لم يكتمل. وقد يستغرق ذلك حتى 48 ساعة، لكنه ينتهي عادةً في غضون ساعات قليلة.</p>
<h2 id="إنشاء-سجل-a-مستعار-لنطاق-الجذر">إنشاء سجل A مستعار لنطاق الجذر</h2>
<p>احصل على اسم نطاق توزيع CloudFront لديك إن لم تكن قد حفظته:</p>
<pre><code class="language-bash">aws cloudfront get-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --output json \\
  --query <span class="hljs-string">&quot;Distribution.DomainName&quot;</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-string">&quot;d111111abcdef8.cloudfront.net&quot;</span>
</code></pre>
<p>أنشئ سجل A المستعار:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id <span class="hljs-string">&quot;<span class="hljs-variable">$HOSTED_ZONE_ID</span>&quot;</span> \\
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
<p><strong>المخرجات المتوقعة:</strong></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ChangeInfo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/change/C2345678901BCD&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SubmittedAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:01:00.000Z&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>إذا حدث خطأ ما:</strong></p>
<ul>
<li><code>InvalidChangeBatch: Alias target name does not lie within the target zone</code>: لا يطابق <code>DNSName</code> في هدف الاسم المستعار لديك توزيع CloudFront صالحًا. تحقّق مرتين من اسم نطاق التوزيع.</li>
<li><code>InvalidChangeBatch: RRSet with DNS name example.com. is not permitted in zone</code>: الأرجح أنك تحاول إنشاء السجل في المنطقة المستضافة الخطأ. تحقّق من أن المنطقة المستضافة خاصة بـ <code>example.com</code>.</li>
<li><code>NoSuchHostedZone</code>: معرّف المنطقة المستضافة خطأ. شغّل <code>aws route53 list-hosted-zones --output json</code> للعثور على المعرّف الصحيح.</li>
</ul>
<h2 id="إنشاء-سجل-aaaa-مستعار-لـ-ipv6">إنشاء سجل AAAA مستعار لـ IPv6</h2>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id <span class="hljs-string">&quot;<span class="hljs-variable">$HOSTED_ZONE_ID</span>&quot;</span> \\
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
<p><strong>المخرجات المتوقعة:</strong></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ChangeInfo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/change/C3456789012CDE&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SubmittedAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:02:00.000Z&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>المخرجات متطابقة في البنية مع سجل A. والفرق الوحيد هو <code>&quot;Type&quot;: &quot;AAAA&quot;</code> في الطلب.</p>
<h2 id="إنشاء-سجلات-لـ-www">إنشاء سجلات لـ www</h2>
<p>أنشئ سجلي الاسم المستعار A وAAAA معًا لـ <code>www.example.com</code> في استدعاء واحد:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id <span class="hljs-string">&quot;<span class="hljs-variable">$HOSTED_ZONE_ID</span>&quot;</span> \\
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
<p><strong>المخرجات المتوقعة:</strong></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ChangeInfo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/change/C4567890123DEF&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;SubmittedAt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:03:00.000Z&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>إذا حدث خطأ ما:</strong></p>
<ul>
<li><code>InvalidChangeBatch: Alias target name does not lie within the target zone</code>: تأكّد من أن <code>www.example.com</code> مُدرج كاسم نطاق بديل (CNAME) على توزيع CloudFront لديك. يمكنك التحقّق بالأمر: <code><span class="line"><span style="color:#82AAFF;font-style:italic">aws</span><span style="color:#ECC48D"> cloudfront</span><span style="color:#ECC48D"> get-distribution-config</span><span style="color:#F78C6C"> &lt;/span&gt;</span>
<span class="line"><span style="color:#82AAFF"> --id</span><span style="color:#ECC48D"> E1A2B3C4D5E6F7</span><span style="color:#F78C6C"> &lt;/span&gt;</span>
<span class="line"><span style="color:#82AAFF"> --output</span><span style="color:#ECC48D"> json</span><span style="color:#F78C6C"> &lt;/span&gt;</span>
<span class="line"><span style="color:#82AAFF"> --query</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">DistributionConfig.Aliases</span><span style="color:#D9F5DD">&quot;</span></span></code> ينبغي أن تتضمن المخرجات كلا الاسمين <code>example.com</code> و<code>www.example.com</code>. وإذا كان <code>www.example.com</code> مفقودًا، فحدّث التوزيع لإضافته.</li>
</ul>
<h2 id="التحقق-من-تحليل-dns">التحقق من تحليل DNS</h2>
<p>انتظر نحو 60 ثانية، ثم تحقّق:</p>
<pre><code class="language-bash">dig example.com A +short
</code></pre>
<p><strong>المخرجات المتوقعة</strong> (ستختلف عناوين IP):</p>
<pre><code>13.224.67.18
13.224.67.43
13.224.67.112
13.224.67.84
</code></pre>
<pre><code class="language-bash">dig example.com AAAA +short
</code></pre>
<p><strong>المخرجات المتوقعة</strong> (ستختلف عناوين IPv6):</p>
<pre><code>2600:9000:2252:7800:1a:b6c1:4a40:93a1
2600:9000:2252:ae00:1a:b6c1:4a40:93a1
2600:9000:2252:c200:1a:b6c1:4a40:93a1
2600:9000:2252:a400:1a:b6c1:4a40:93a1
</code></pre>
<p>إذا لم تر نتائج، فاستعلم من خادم أسماء Route 53 مباشرةً:</p>
<pre><code class="language-bash">dig example.com A @ns-1234.awsdns-56.org +short
</code></pre>
<p>إذا أعاد الاستعلام المباشر نتائج بينما لا يعيدها الاستعلام العام، فانتشار DNS الناتج عن تغيير خوادم الأسماء لدى المسجّل لا يزال جاريًا.</p>
<p>أما النطاق الفرعي www:</p>
<pre><code class="language-bash">dig www.example.com A +short
</code></pre>
<p>ينبغي أن ترى النمط نفسه من عناوين IP الخاصة بـ CloudFront.</p>
<h3 id="التحقق-في-المتصفح">التحقق في المتصفح</h3>
<p>افتح <code>https://example.com</code> في متصفح. ينبغي أن ترى:</p>
<ul>
<li>محتوى واجهتك الأمامية محمّلًا من S3 عبر CloudFront</li>
<li>شهادة SSL صالحة (انقر أيقونة القفل للتحقّق من أنها صادرة عن Amazon)</li>
<li>عنوان URL يعرض <code>https://example.com</code> (لا نطاق CloudFront)</li>
</ul>
<p>وإذا أنشأت سجلات www، فينبغي أن يعرض <code>https://www.example.com</code> المحتوى نفسه.</p>
<h2 id="سرد-كل-السجلات">سرد كل السجلات</h2>
<pre><code class="language-bash">aws route53 list-resource-record-sets \\
  --hosted-zone-id <span class="hljs-string">&quot;<span class="hljs-variable">$HOSTED_ZONE_ID</span>&quot;</span> \\
  --output json
</code></pre>
<p><strong>المخرجات المتوقعة:</strong></p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ResourceRecordSets&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;NS&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;TTL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">172800</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ResourceRecords&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ns-1234.awsdns-56.org.&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ns-567.awsdns-12.net.&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ns-890.awsdns-34.co.uk.&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ns-123.awsdns-78.com.&quot;</span> <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SOA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;TTL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">900</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ResourceRecords&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ns-1234.awsdns-56.org. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400&quot;</span> <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;A&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AliasTarget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;HostedZoneId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Z2FDTNDATAQYW2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;DNSName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d111111abcdef8.cloudfront.net.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;EvaluateTargetHealth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AAAA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AliasTarget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;HostedZoneId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Z2FDTNDATAQYW2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;DNSName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d111111abcdef8.cloudfront.net.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;EvaluateTargetHealth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;www.example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;A&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AliasTarget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;HostedZoneId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Z2FDTNDATAQYW2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;DNSName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d111111abcdef8.cloudfront.net.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;EvaluateTargetHealth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;www.example.com.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AAAA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;AliasTarget&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;HostedZoneId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Z2FDTNDATAQYW2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;DNSName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;d111111abcdef8.cloudfront.net.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;EvaluateTargetHealth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الأمور الأساسية التي يجب تأكيدها:</p>
<ul>
<li>سجلات <strong>NS وSOA</strong> موجودة لـ <code>example.com</code> (أُنشئت تلقائيًا، فلا تحذفها).</li>
<li>سجلات <strong>A وAAAA المستعارة</strong> موجودة لـ <code>example.com</code>، وكلاهما يشير إلى توزيع CloudFront لديك.</li>
<li>سجلات <strong>A وAAAA المستعارة</strong> موجودة لـ <code>www.example.com</code> (إن أنشأتها للنطاق الفرعي www).</li>
<li>كل سجلات الاسم المستعار تعرض <code>&quot;HostedZoneId&quot;: &quot;Z2FDTNDATAQYW2&quot;</code> واسم نطاق توزيع CloudFront لديك.</li>
</ul>
<h2 id="الملخص">الملخّص</h2>
<p>التدفق الكامل، مكثّفًا:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Store your values</span>
HOSTED_ZONE_ID=<span class="hljs-string">&quot;Z1234567890ABC&quot;</span>
CF_DOMAIN=<span class="hljs-string">&quot;d111111abcdef8.cloudfront.net&quot;</span>

<span class="hljs-comment"># Create hosted zone (skip if already exists)</span>
aws route53 create-hosted-zone \\
  --name example.com \\
  --caller-reference <span class="hljs-string">&quot;example-com-<span class="hljs-subst">$(date +%s)</span>&quot;</span> \\
  --region us-east-1 \\
  --output json

<span class="hljs-comment"># Create all alias records in one call</span>
aws route53 change-resource-record-sets \\
  --hosted-zone-id <span class="hljs-string">&quot;<span class="hljs-variable">$HOSTED_ZONE_ID</span>&quot;</span> \\
  --output json \\
  --change-batch <span class="hljs-string">&quot;{
    \\&quot;Changes\\&quot;: [
      {
        \\&quot;Action\\&quot;: \\&quot;UPSERT\\&quot;,
        \\&quot;ResourceRecordSet\\&quot;: {
          \\&quot;Name\\&quot;: \\&quot;example.com\\&quot;,
          \\&quot;Type\\&quot;: \\&quot;A\\&quot;,
          \\&quot;AliasTarget\\&quot;: {
            \\&quot;HostedZoneId\\&quot;: \\&quot;Z2FDTNDATAQYW2\\&quot;,
            \\&quot;DNSName\\&quot;: \\&quot;<span class="hljs-variable">$CF_DOMAIN</span>\\&quot;,
            \\&quot;EvaluateTargetHealth\\&quot;: false
          }
        }
      },
      {
        \\&quot;Action\\&quot;: \\&quot;UPSERT\\&quot;,
        \\&quot;ResourceRecordSet\\&quot;: {
          \\&quot;Name\\&quot;: \\&quot;example.com\\&quot;,
          \\&quot;Type\\&quot;: \\&quot;AAAA\\&quot;,
          \\&quot;AliasTarget\\&quot;: {
            \\&quot;HostedZoneId\\&quot;: \\&quot;Z2FDTNDATAQYW2\\&quot;,
            \\&quot;DNSName\\&quot;: \\&quot;<span class="hljs-variable">$CF_DOMAIN</span>\\&quot;,
            \\&quot;EvaluateTargetHealth\\&quot;: false
          }
        }
      },
      {
        \\&quot;Action\\&quot;: \\&quot;UPSERT\\&quot;,
        \\&quot;ResourceRecordSet\\&quot;: {
          \\&quot;Name\\&quot;: \\&quot;www.example.com\\&quot;,
          \\&quot;Type\\&quot;: \\&quot;A\\&quot;,
          \\&quot;AliasTarget\\&quot;: {
            \\&quot;HostedZoneId\\&quot;: \\&quot;Z2FDTNDATAQYW2\\&quot;,
            \\&quot;DNSName\\&quot;: \\&quot;<span class="hljs-variable">$CF_DOMAIN</span>\\&quot;,
            \\&quot;EvaluateTargetHealth\\&quot;: false
          }
        }
      },
      {
        \\&quot;Action\\&quot;: \\&quot;UPSERT\\&quot;,
        \\&quot;ResourceRecordSet\\&quot;: {
          \\&quot;Name\\&quot;: \\&quot;www.example.com\\&quot;,
          \\&quot;Type\\&quot;: \\&quot;AAAA\\&quot;,
          \\&quot;AliasTarget\\&quot;: {
            \\&quot;HostedZoneId\\&quot;: \\&quot;Z2FDTNDATAQYW2\\&quot;,
            \\&quot;DNSName\\&quot;: \\&quot;<span class="hljs-variable">$CF_DOMAIN</span>\\&quot;,
            \\&quot;EvaluateTargetHealth\\&quot;: false
          }
        }
      }
    ]
  }&quot;</span>

<span class="hljs-comment"># Verify</span>
dig example.com A +short
dig example.com AAAA +short
dig www.example.com A +short
</code></pre>
<p>أصبح لديك الآن DNS مُعدًّا بالكامل. وموقعك متاح على <code>https://example.com</code> و<code>https://www.example.com</code>، ويُقدَّم عبر CloudFront، ومؤمَّن بـ ACM، ومحتواه مخزّن في S3.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:o,html:p};export{s as book,u as chapter,n as chapterTitle,l as default,o as headings,p as html,a as slug,t as title};
