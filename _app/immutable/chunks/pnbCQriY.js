const s="kinney",e="aws",n="نشر تطبيقات الويب على AWS",a="dns-validation-vs-email-validation",t="التحقق عبر DNS مقابل التحقق عبر البريد الإلكتروني",o=[{depth:2,id:"ما-يثبته-التحقق-فعلا",text:"ما يثبته التحقق فعلًا"},{depth:2,id:"التحقق-عبر-dns-النهج-المفضل",text:"التحقق عبر DNS: النهج المفضّل"},{depth:3,id:"لماذا-التحقق-عبر-dns-أفضل",text:"لماذا التحقق عبر DNS أفضل"},{depth:2,id:"التحقق-عبر-البريد-الإلكتروني-متى-قد-تحتاجه",text:"التحقق عبر البريد الإلكتروني: متى قد تحتاجه"},{depth:2,id:"فحص-حالة-التحقق",text:"فحص حالة التحقق"},{depth:2,id:"نطاقات-متعددة-تعني-سجلات-متعددة",text:"نطاقات متعددة تعني سجلات متعددة"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],c=`<p>لقد طلبت شهادة في ACM وهي الآن في حالة <strong>Pending validation</strong>. وتحتاج ACM إلى دليل على أنك تملك النطاق قبل أن تصدر الشهادة. وهذا ليس متطلبًا خاصًا بـ AWS — فكل جهة إصدار شهادات تفعل ذلك. والسؤال هو كيف تثبت الملكية. تمنحك ACM خيارين: <strong>التحقق عبر DNS</strong> و<strong>التحقق عبر البريد الإلكتروني</strong>. والتحقق عبر DNS هو الخيار الصحيح دائمًا تقريبًا، وبنهاية هذا الدرس ستفهم لماذا.</p>
<p>إذا أردت نسخة AWS من سلوك التحقق أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html">دليل التحقق عبر DNS في ACM</a> هو المرجع المعتمد.</p>
<p><img src="/arabic-cs-library/images/kinney/3c53fe690c72c8e0.svg" alt="مقارنة جنبًا إلى جنب بين التحقّق عبر DNS والتحقّق عبر البريد الإلكتروني في ACM، بما في ذلك خطوات الإصدار وسلوك التجديد."></p>
<h2 id="ما-يثبته-التحقق-فعلا">ما يثبته التحقق فعلًا</h2>
<p>عندما تطلب شهادة لـ <code>example.com</code>، تحتاج ACM إلى التحقق من أن الشخص الذي يقدّم الطلب يتحكم فعلًا في ذلك النطاق. فمن دون هذه الخطوة، يمكن لأي شخص طلب شهادة لـ <code>google.com</code> أو <code>your-bank.com</code> واستخدامها لانتحال هوية تلك المواقع. والتحقق من النطاق هو ما يجعل نموذج الثقة في TLS يعمل.</p>
<p>كلا طريقتي التحقق تجيبان عن السؤال نفسه: «هل يمكنك إثبات التحكم في هذا النطاق؟» لكنهما تستخدمان إشارات مختلفة للإجابة.</p>
<h2 id="التحقق-عبر-dns-النهج-المفضل">التحقق عبر DNS: النهج المفضّل</h2>
<p>مع <strong>التحقق عبر DNS</strong>، تعطيك ACM سجل CNAME تضيفه إلى إعدادات DNS لنطاقك. ويبدو السجل هكذا:</p>
<table>
<thead>
<tr>
<th>اسم السجل</th>
<th>نوع السجل</th>
<th>قيمة السجل</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>_abc123.example.com</code></td>
<td>CNAME</td>
<td><code>_def456.acm-validations.aws</code></td>
</tr>
</tbody>
</table>
<p>تضيف سجل CNAME هذا إلى DNS لديك، وتفحص ACM دوريًا ما إذا كان السجل موجودًا. وبمجرد أن تجده، تعتبر النطاق مُتحقَّقًا منه وتصدر الشهادة. وتستغرق العملية كلها عادةً بضع دقائق، رغم أنها قد تستغرق حتى 30 دقيقة حسب انتشار DNS.</p>
<p>وهذه طريقة استرداد سجلات التحقق من شهادة معلّقة:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.DomainValidationOptions&quot;</span>
</code></pre>
<p>يصفّي العلم <code>--query</code> المخرجات لتعرض خيارات التحقق فقط، وهو ما يهمك الآن:</p>
<pre><code class="language-json"><span class="hljs-punctuation">[</span>
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
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>إذا كان نطاقك مُدارًا في Route 53، فتقدّم لوحة تحكم ACM زر <strong>Create records in Route 53</strong> الذي يضيف سجلات CNAME نيابة عنك بنقرة واحدة. ومن CLI، يمكنك فعل الشيء نفسه إن كان نطاقك المستضاف في Route 53:</p>
<pre><code class="language-bash">aws route53 change-resource-record-sets \\
  --hosted-zone-id Z1234567890ABC \\
  --region us-east-1 \\
  --output json \\
  --change-batch <span class="hljs-string">&#x27;{
    &quot;Changes&quot;: [
      {
        &quot;Action&quot;: &quot;UPSERT&quot;,
        &quot;ResourceRecordSet&quot;: {
          &quot;Name&quot;: &quot;_abc123.example.com.&quot;,
          &quot;Type&quot;: &quot;CNAME&quot;,
          &quot;TTL&quot;: 300,
          &quot;ResourceRecords&quot;: [
            {
              &quot;Value&quot;: &quot;_def456.acm-validations.aws.&quot;
            }
          ]
        }
      }
    ]
  }&#x27;</span>
</code></pre>
<p>إذا كان DNS لديك مستضافًا في مكان آخر (GoDaddy أو Cloudflare أو Namecheap)، فتضيف سجل CNAME عبر واجهة إدارة DNS لدى ذلك المزوّد. ويأتي اسم السجل وقيمته من مخرجات ACM أعلاه.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>بعض مزوّدي DNS يطلبون إدخال اسم CNAME دون النقطة الأخيرة ودون لاحقة نطاقك. فإذا أخبرتك ACM بإنشاء <code>_abc123.example.com.</code>، فقد تحتاج إلى إدخال <code>_abc123</code> فقط في واجهة مزوّد DNS. راجع وثائق مزوّدك إن لم يُعثر على السجل.</p>
</blockquote>
<h3 id="لماذا-التحقق-عبر-dns-أفضل">لماذا التحقق عبر DNS أفضل</h3>
<p>يتفوق التحقق عبر DNS في ثلاثة جوانب:</p>
<ol>
<li><strong>التجديد التلقائي</strong>: وهذا هو الأهم. تستخدم ACM سجل CNAME نفسه لإعادة التحقق من النطاق عندما يحين موعد تجديد الشهادة. وما دام السجل باقيًا في DNS لديك، تجدّد ACM الشهادة تلقائيًا — بلا تدخل بشري، ولا رسائل بريد للرد عليها، ولا خطر لانتهاء صلاحية الشهادة لأن أحدهم كان في إجازة.</li>
<li><strong>لا حاجة إلى بنية بريد إلكتروني</strong>: يتطلب التحقق عبر البريد أن يتلقى شخص ما رابطًا في رسالة مرسلة إلى عناوين محدّدة على نطاقك وينقر عليه. وإذا لم تكن لديك بريد مهيّأ لنطاقك (وكثير من مهندسي الواجهات الأمامية الذين يديرون مشاريع جانبية ليس لديهم)، فالتحقق عبر البريد خيار غير قابل للتنفيذ.</li>
<li><strong>قابل للبرمجة</strong>: يمكنك أتمتة عملية طلب الشهادة والتحقق بأكملها باستخدام CLI. اطلب الشهادة، واستخرج سجلات CNAME، وأنشئها في Route 53، وانتظر التحقق — كل ذلك في سكربت صدفة أو خط CI. أما التحقق عبر البريد فيتطلب إنسانًا ينقر رابطًا.</li>
</ol>
<h2 id="التحقق-عبر-البريد-الإلكتروني-متى-قد-تحتاجه">التحقق عبر البريد الإلكتروني: متى قد تحتاجه</h2>
<p>مع <strong>التحقق عبر البريد الإلكتروني</strong>، ترسل ACM رسالة إلى مجموعة عناوين محدّدة مسبقًا مرتبطة بالنطاق:</p>
<ul>
<li><code>admin@example.com</code></li>
<li><code>administrator@example.com</code></li>
<li><code>hostmaster@example.com</code></li>
<li><code>postmaster@example.com</code></li>
<li><code>webmaster@example.com</code></li>
</ul>
<p>وترسل أيضًا إلى عناوين جهة اتصال WHOIS للنطاق (إن لم تكن محمية بالخصوصية، وهي كذلك دائمًا تقريبًا هذه الأيام).</p>
<p>تحتوي الرسالة على رابط. انقر الرابط، فيُتحقَّق من النطاق. بسيط نظريًا، لكنه هشّ عمليًا.</p>
<p>يوجد التحقق عبر البريد في الحالات التي يتعذّر فيها عليك تعديل سجلات DNS فعلًا — ربما يدير فريق آخر DNS لديك بعملية تغيير بطيئة، أو لا تدعم واجهة API لمزوّد DNS لديك سجلات CNAME للنطاق الفرعي للتحقق. وهذه الحالات غير شائعة بما يكفي بحيث لا يصادفها معظم الناس أبدًا.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>الشهادات المُتحقَّق منها عبر البريد <strong>لا</strong> تتجدد تلقائيًا عبر ACM. فعندما تقترب الشهادة من الانتهاء، ترسل ACM رسالة تحقق أخرى. وإن لم يردّ أحد على تلك الرسالة، تنتهي صلاحية الشهادة ويسقط موقعك. ولأي نشر إنتاجي، التحقق عبر DNS هو الخيار المسؤول الوحيد. لقد رأيت هذا يحدث — وهو ليس ممتعًا.</p>
</blockquote>
<h2 id="فحص-حالة-التحقق">فحص حالة التحقق</h2>
<p>بعد إضافة سجل CNAME (أو النقر على رابط البريد)، يمكنك الاستعلام عن حالة الشهادة:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.Status&quot;</span>
</code></pre>
<p>يُرجع هذا <code>&quot;PENDING_VALIDATION&quot;</code> حتى يكتمل التحقق، ثم يتحوّل إلى <code>&quot;ISSUED&quot;</code>. ويمكنك أيضًا استخدام <code>wait</code> للحجب حتى تُصدر الشهادة:</p>
<pre><code class="language-bash">aws acm <span class="hljs-built_in">wait</span> certificate-validated \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1
</code></pre>
<p>يستعلم هذا الأمر كل 60 ثانية وينتهي عندما تتغيّر حالة الشهادة إلى <code>ISSUED</code> (أو تنتهي مهلته بعد 40 محاولة).</p>
<h2 id="نطاقات-متعددة-تعني-سجلات-متعددة">نطاقات متعددة تعني سجلات متعددة</h2>
<p>إذا كانت شهادتك تغطّي <code>example.com</code> و<code>www.example.com</code>، فستولّد ACM سجل تحقق CNAME منفصلًا لكل اسم نطاق. وتحتاج إلى إضافة كلها. فإذا تحققت من <code>example.com</code> ونسيت <code>www.example.com</code>، فستبقى الشهادة في حالة <strong>Pending validation</strong> إلى ما لا نهاية. (اسألني كيف أعرف.)</p>
<p>تعرض مخرجات <code>describe-certificate</code> حالة التحقق لكل نطاق على حدة، لترى أيها لا يزال معلّقًا:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.DomainValidationOptions[*].{Domain:DomainName,Status:ValidationStatus}&quot;</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Domain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SUCCESS&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Domain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;www.example.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PENDING_VALIDATION&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا بقي التحقق معلّقًا أكثر من 72 ساعة، فستضع ACM الشهادة في حالة <strong>Failed</strong>. وستحتاج إلى طلب شهادة جديدة والبدء من جديد. وتنطبق هذه المهلة على التحقق عبر DNS والبريد معًا.</p>
</blockquote>
<h2 id="الخلاصة">الخلاصة</h2>
<p>استخدم التحقق عبر DNS. أضف سجل CNAME، واتركه في مكانه إلى الأبد، ولا تفكر في تجديد الشهادة مرة أخرى. أما التحقق عبر البريد فهو بقية من زمن سبق انتشار أتمتة DNS — لا يزال موجودًا للحالات الطرفية، لكن لمهندس واجهات أمامية ينشر على AWS مع CloudFront، التحقق عبر DNS هو المسار الوحيد القابل للتوسّع.</p>
<p>بعد ذلك، ستضع تلك الشهادة الصادرة موضع العمل بربطها بـ CloudFront، لتنتقل من «أملك النطاق» إلى «يمكن لـ CDN أن يقدّمه فعلًا عبر HTTPS».</p>
`,p={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:o,html:c};export{s as book,e as chapter,n as chapterTitle,p as default,o as headings,c as html,a as slug,t as title};
