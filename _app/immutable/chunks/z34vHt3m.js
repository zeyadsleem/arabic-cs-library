const o="kinney",l="aws",e="نشر تطبيقات الويب على AWS",n="route-53-dns-exercise",t="تمرين: تهيئة DNS لموقعك",s=[{depth:2,id:"لماذا-يهم",text:"لماذا يهمّ"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلّبات المسبقة"},{depth:2,id:"تأكيد-منطقة-الاستضافة",text:"تأكيد منطقة الاستضافة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-سجل-alias-من-النوع-a-للنطاق-الجذري",text:"إنشاء سجل Alias من النوع A للنطاق الجذري"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-سجل-alias-من-النوع-aaaa-لـ-ipv6",text:"إنشاء سجل Alias من النوع AAAA لـ IPv6"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-سجلات-لـ-www-اختياري-لكن-موصى-به",text:"إنشاء سجلات لـ www (اختياري لكن موصى به)"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"التحقق-من-تحليل-dns",text:"التحقّق من تحليل DNS"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"سرد-كل-السجلات-في-منطقة-استضافتك",text:"سرد كل السجلات في منطقة استضافتك"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تشخيص-الفشل",text:"تشخيص الفشل"},{depth:2,id:"ما-بنيته",text:"ما بنيته"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],a=`<p>لديك توزيع CloudFront يقدّم واجهتك الأمامية وشهادة ACM مرفقة به. ويعمل التوزيع على عنوان URL الخاص به <code>d111111abcdef8.cloudfront.net</code>، لكن لا أحد يطلق نطاق CloudFront إلى الإنتاج. في هذا التمرين، ستوصل نطاقك الخاص بحيث يزور المستخدمون <code>example.com</code> فيحصلون على موقعك المقدَّم عبر CloudFront.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا بدت وحدة تحكّم Route 53 مختلفة قليلًا عند تنفيذك هذا، فأبقِ <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html">دليل تهيئة DNS في Route 53</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/route53/change-resource-record-sets.html">مرجع الأمر <code>aws route53 change-resource-record-sets</code></a> مفتوحين.</p>
</blockquote>
<h2 id="لماذا-يهم">لماذا يهمّ</h2>
<p>DNS هو القطعة الأخيرة في مكدّس الاستضافة الثابتة. فبدونه، يكون نشرك عاملًا لكنه غير قابل للوصول على نطاق حقيقي. وبمجرد إكمال هذا التمرين، سيكون لديك نشر كامل من الطرف إلى الطرف: يخزّن S3 الملفات، وتوزّعها CloudFront، ويؤمّن ACM الاتصال، ويجعل Route 53 كل شيء قابلًا للوصول على اسم نطاقك. وهذا هو المكدّس نفسه الذي تعمل عليه تطبيقات الواجهة الأمامية الإنتاجية.</p>
<h2 id="المتطلبات-المسبقة">المتطلّبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>حساب AWS مع إعداد وصول CLI (انظر <a href="https://stevekinney.com/courses/aws/setting-up-the-aws-cli">إعداد AWS CLI</a>)</li>
<li>توزيع CloudFront مُدرج فيه نطاقك كاسم نطاق بديل وشهادة ACM مرفقة به (انظر <a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a> و<a href="https://stevekinney.com/courses/aws/attaching-an-ssl-certificate">إرفاق شهادة SSL</a>)</li>
<li>اسم نطاق تتحكّم به، ويكون DNS مستضافًا بالفعل في Route 53 أو مفوَّضًا إلى منطقة استضافة في Route 53.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>في مسار الدورة الجديد، يفترض أن تكون لديك منطقة الاستضافة بالفعل بحلول وصولك إلى هذا التمرين. فإن سجّلت النطاق عبر Route 53، فالأرجح أن AWS أنشأتها تلقائيًا. وإن كان النطاق في مكان آخر، فالأرجح أنك وجّهت المسجّل إلى خوادم أسماء Route 53 خلال دروس أساسيات DNS.</p>
</blockquote>
<h2 id="تأكيد-منطقة-الاستضافة">تأكيد منطقة الاستضافة</h2>
<p>قبل أن تضيف سجلات alias، تأكّد من أنك تعمل في منطقة الاستضافة الصحيحة. استبدل <code>example.com</code> بنطاقك الفعلي:</p>
<pre><code class="language-bash">aws route53 list-hosted-zones-by-name \\
  --dns-name example.com \\
  --output json
</code></pre>
<p>من الاستجابة، لاحظ أمرين:</p>
<ol>
<li><strong>معرّف منطقة الاستضافة</strong> (مثل <code>/hostedzone/Z1234567890ABC</code>). ستستخدم جزء المعرّف (<code>Z1234567890ABC</code>) في الأوامر اللاحقة.</li>
<li><strong>اسم النطاق</strong> في المنطقة يطابق النطاق الذي أنت على وشك توجيهه.</li>
</ol>
<p>إذا <strong>لم</strong> تكن لديك منطقة استضافة بعد، فتوقّف هنا وأنشئ واحدة باستخدام <a href="https://stevekinney.com/courses/aws/hosted-zones-and-record-types">مناطق الاستضافة وأنواع السجلات</a>، ثم تأكّد من أن مسجّلك يشير إلى خوادم أسماء Route 53 قبل المتابعة.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>منطقة الاستضافة موجودة في Route 53.</li>
<li>لديك معرّف منطقة الاستضافة محفوظًا.</li>
<li>إذا كان نطاقك مسجّلًا خارجيًا، فخوادم أسمائه تشير بالفعل إلى Route 53.</li>
</ul>
<h2 id="إنشاء-سجل-alias-من-النوع-a-للنطاق-الجذري">إنشاء سجل Alias من النوع A للنطاق الجذري</h2>
<p>أنشئ سجل A من نوع alias يوجّه نطاقك المجرّد (<code>example.com</code>) إلى توزيع CloudFront. ستحتاج إلى:</p>
<ul>
<li>معرّف منطقة الاستضافة من الخطوة السابقة</li>
<li>اسم نطاق توزيع CloudFront (مثل <code>d111111abcdef8.cloudfront.net</code>)</li>
</ul>
<p>معرّف منطقة الاستضافة في CloudFront لأهداف alias هو دائمًا <code>Z2FDTNDATAQYW2</code>.</p>
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
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>أعاد الأمر كائن <code>ChangeInfo</code> مع <code>&quot;Status&quot;: &quot;PENDING&quot;</code>.</li>
<li>لا أخطاء بشأن هدف alias. وإن رأيت خطأً، فتحقّق من أن توزيع CloudFront يُدرج <code>example.com</code> كاسم نطاق بديل.</li>
</ul>
<h2 id="إنشاء-سجل-alias-من-النوع-aaaa-لـ-ipv6">إنشاء سجل Alias من النوع AAAA لـ IPv6</h2>
<p>أنشئ سجل AAAA مطابقًا كي يُحلّ نطاقك عبر IPv6:</p>
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
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>نجح الأمر مع <code>&quot;Status&quot;: &quot;PENDING&quot;</code>.</li>
<li>لديك الآن سجلّا alias من النوعين A وAAAA لـ<code>example.com</code>.</li>
</ul>
<h2 id="إنشاء-سجلات-لـ-www-اختياري-لكن-موصى-به">إنشاء سجلات لـ www (اختياري لكن موصى به)</h2>
<p>إذا أردت أن يعمل <code>www.example.com</code> أيضًا، فأنشئ سجلات alias له. تأكّد من إدراج <code>www.example.com</code> كاسم نطاق بديل في توزيع CloudFront (أو أن شهادة ACM تغطّي <code>*.example.com</code>).</p>
<p>أنشئ سجلي alias من النوعين A وAAAA لـ<code>www.example.com</code> يشيران إلى توزيع CloudFront نفسه.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>إذا أنشأت سجلات www، فلديك الآن أربعة سجلات alias إجمالًا: A وAAAA لكل من <code>example.com</code> و<code>www.example.com</code>.</li>
</ul>
<h2 id="التحقق-من-تحليل-dns">التحقّق من تحليل DNS</h2>
<p>انتظر نحو 60 ثانية كي تنشر Route 53 التغييرات، ثم تحقّق:</p>
<p>افحص سجل A:</p>
<pre><code class="language-bash">dig example.com A +short
</code></pre>
<p>يجب أن ترى عنوان IP واحدًا أو أكثر (وهي عناوين IP لخوادم حافة CloudFront).</p>
<p>افحص سجل AAAA:</p>
<pre><code class="language-bash">dig example.com AAAA +short
</code></pre>
<p>يجب أن ترى عنوان IPv6 واحدًا أو أكثر.</p>
<p>إذا لم تكن السجلات تُحلّ بعد، فاستعلم من خادم أسماء Route 53 مباشرةً لتأكيد صحة السجلات في المصدر:</p>
<pre><code class="language-bash">dig example.com A @ns-1234.awsdns-56.org +short
</code></pre>
<p>استبدل خادم الأسماء بأحد الخوادم الأربعة من منطقة استضافتك.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>يُرجع <code>dig example.com A +short</code> عناوين IP.</li>
<li>يُرجع <code>dig example.com AAAA +short</code> عناوين IPv6.</li>
<li>فتح <code>https://example.com</code> في متصفّح يُظهر واجهتك الأمامية بشهادة SSL صالحة.</li>
</ul>
<h2 id="سرد-كل-السجلات-في-منطقة-استضافتك">سرد كل السجلات في منطقة استضافتك</h2>
<p>تحقّق من الحالة الكاملة لمنطقة استضافتك:</p>
<pre><code class="language-bash">aws route53 list-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --output json
</code></pre>
<p>يجب أن ترى سجلات NS وSOA (منشأة تلقائيًا)، إضافة إلى سجلي alias من النوعين A وAAAA اللذين أنشأتهما للتوّ. وإذا أكملت تمرين ACM، فقد ترى أيضًا سجل تحقّق CNAME.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<ul>
<li>تتضمّن المخرجات سجلات NS وSOA وA وAAAA لنطاقك.</li>
<li>تُظهر سجلات A وAAAA هدف <code>AliasTarget</code> باسم نطاق توزيع CloudFront.</li>
</ul>
<h2 id="تشخيص-الفشل">تشخيص الفشل</h2>
<ul>
<li><strong>تبدو سجلات alias صحيحة في Route 53 لكن النطاق لا يُحلّ علنًا:</strong> ما زال مسجّلك يشير إلى خوادم أسماء قديمة. قارن إعدادات المسجّل بسجلات NS الأربعة في منطقة استضافتك.</li>
<li><strong>يعمل نطاق CloudFront لكن <code>https://example.com</code> لا يعمل:</strong> سجلا alias من النوعين A وAAAA للنطاق الجذري مفقودان، أو يشيران إلى التوزيع الخاطئ أو معرّف منطقة الاستضافة الخاطئ.</li>
<li><strong>يعمل <code>example.com</code> لكن <code>www.example.com</code> يفشل:</strong> أنشأت سجلات النطاق الجذري فقط. أضف سجلات alias مطابقة لـ<code>www</code> إن أردت أن يُحلّ كلا الاسمين.</li>
</ul>
<h2 id="ما-بنيته">ما بنيته</h2>
<p>لديك الآن تهيئة DNS كاملة: منطقة استضافة في Route 53 مع سجلات alias توجّه نطاقك إلى توزيع CloudFront. وواجهتك الأمامية متاحة على <code>https://example.com</code> بشهادة SSL صالحة، وتوزيع CDN عالمي، وتحليل DNS يتولّاه Route 53.</p>
<p>بهذا يكتمل مكدّس الأساس: S3 (تخزين) + CloudFront (CDN) + ACM (شهادات) + Route 53 (DNS). ما زلت أشعر بشيء من الإثارة حين أرى نطاقًا حقيقيًا يُحلّ إلى بنية تحتية أعددتها بنفسي — إنها إحدى تلك اللحظات التي يتّضح فيها كل شيء.</p>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>الاختبار بـ<code>nslookup</code></strong>: شغّل <code>nslookup example.com</code> وقارن المخرجات بـ<code>dig</code>. لاحظ كيف يُظهر <code>nslookup</code> أي خادم أسماء أجاب عن الاستعلام.</li>
<li><strong>فحص سلوك TTL</strong>: شغّل <code>dig example.com A</code> (بلا <code>+short</code>) وانظر إلى قيمة TTL في قسم الإجابة. شغّله مرة أخرى بعد 30 ثانية ولاحظ أن TTL انخفض. هذا هو العدّ التنازلي للذاكرة المؤقتة.</li>
<li><strong>الاستعلام من مُحلِّلات مختلفة</strong>: قارن النتائج من مُحلِّلات DNS عامة مختلفة لترى ما إذا كانت كلها تُرجع الإجابة نفسها: <code><span class="line"><span style="color:#82AAFF;font-style:italic">dig</span><span style="color:#ECC48D"> example.com</span><span style="color:#ECC48D"> A</span><span style="color:#ECC48D"> @1.1.1.1</span><span style="color:#ECC48D"> +short</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">dig</span><span style="color:#ECC48D"> example.com</span><span style="color:#ECC48D"> A</span><span style="color:#ECC48D"> @8.8.8.8</span><span style="color:#ECC48D"> +short</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">dig</span><span style="color:#ECC48D"> example.com</span><span style="color:#ECC48D"> A</span><span style="color:#ECC48D"> @9.9.9.9</span><span style="color:#ECC48D"> +short</span></span></code></li>
<li><strong>إعادة توجيه www إلى النطاق الجذري</strong>: إذا لم تنشئ سجلات www، فأعدّ حاوية S3 بسيطة لإعادة التوجيه ترسل <code>www.example.com</code> إلى <code>example.com</code>. هذا يضمن أن المستخدمين الذين يكتبون <code>www</code> يصلون إلى موقعك.</li>
</ul>
`,c={book:o,chapter:"aws",chapterTitle:e,slug:n,title:t,headings:s,html:a};export{o as book,l as chapter,e as chapterTitle,c as default,s as headings,a as html,n as slug,t as title};
