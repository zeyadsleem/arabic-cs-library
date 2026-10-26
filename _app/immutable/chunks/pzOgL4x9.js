const t="kinney",l="aws",n="نشر تطبيقات الويب على AWS",s="certificate-renewal-and-us-east-1",a="تجديد الشهادات وشرط us-east-1",o=[{depth:2,id:"كيف-يعمل-التجديد-التلقائي-في-acm",text:"كيف يعمل التجديد التلقائي في ACM"},{depth:3,id:"الشهادات-المتحقق-منها-عبر-dns",text:"الشهادات المُتحقَّق منها عبر DNS"},{depth:3,id:"الشهادات-المتحقق-منها-عبر-البريد-الإلكتروني",text:"الشهادات المُتحقَّق منها عبر البريد الإلكتروني"},{depth:2,id:"الجدول-الزمني-للتجديد",text:"الجدول الزمني للتجديد"},{depth:3,id:"ما-قد-يخطئ",text:"ما قد يخطئ"},{depth:2,id:"لماذا-تشترط-cloudfront-منطقة-us-east-1",text:"لماذا تشترط CloudFront منطقة us-east-1"},{depth:3,id:"مسار-تصحيح-لا-أجد-شهادتي",text:"مسار تصحيح «لا أجد شهادتي»"},{depth:3,id:"الخدمات-الأخرى-مختلفة",text:"الخدمات الأخرى مختلفة"},{depth:2,id:"تجميع-الخيوط",text:"تجميع الخيوط"}],e=`<p>انتهاء صلاحية الشهادة من المشكلات التي لا تبدو عاجلة حتى يتعطّل موقعك في الثانية صباحًا من يوم سبت. الشهادة الصالحة تؤدي عملها بهدوء. أما الشهادة المنتهية فتُطلق تحذيرًا في المتصفح يملأ الصفحة ويقول لمستخدميك «قد يحاول هذا الموقع سرقة معلوماتك». لا يوجد تراجع رشيق—فالمتصفح يحجب الاتصال كليًا. التجديد التلقائي في ACM هو الميزة التي تمنع حدوث ذلك، لكنه لا يعمل إلا إذا أعددت الأمور بشكل صحيح.</p>
<p>إن أردت صياغة AWS الرسمية لسلوك الشهادات في هذا الدرس، فـ<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">دليل مستخدم AWS Certificate Manager</a> هو المصدر الموثوق.</p>
<pre><code>flowchart LR
    Request[&quot;Request certificate in us-east-1&quot;] --&gt; Validate[&quot;Validate with DNS CNAME&quot;]
    Validate --&gt; Attach[&quot;Attach certificate to CloudFront&quot;]
    Attach --&gt; Renew[&quot;ACM starts renewal 60 days before expiry&quot;]
    Renew --&gt; Check{&quot;CNAME still present&lt;br/&gt;and certificate still in use?&quot;}
    Check -- &quot;Yes&quot; --&gt; Reissue[&quot;Renew in place with the same ARN&quot;]
    Check -- &quot;No&quot; --&gt; Alerts[&quot;Health and EventBridge notifications&quot;]
</code></pre>
<h2 id="كيف-يعمل-التجديد-التلقائي-في-acm">كيف يعمل التجديد التلقائي في ACM</h2>
<p>شهادات ACM العامة صالحة لمدة <strong>13 شهرًا</strong> (395 يومًا). وبدءًا من <strong>60 يومًا</strong> قبل الانتهاء، تشرع ACM في محاولة تجديد الشهادة تلقائيًا. وتعتمد عملية التجديد على طريقة التحقق التي استخدمتها عند طلب الشهادة أصلًا.</p>
<h3 id="الشهادات-المتحقق-منها-عبر-dns">الشهادات المُتحقَّق منها عبر DNS</h3>
<p>بالنسبة للشهادات التي جرى التحقق منها عبر DNS، تفحص ACM ما إذا كان سجل التحقق CNAME الأصلي لا يزال موجودًا في DNS لديك. فإن كان موجودًا، تتحقق ACM من النطاق وتصدر شهادة مجدّدة. وتحمل الشهادة الجديدة ARN نفسه الذي تحمله القديمة—وأي توزيع CloudFront أو موازن تحميل أو نقطة نهاية API Gateway يستخدم ذلك ARN يلتقط الشهادة المجدّدة تلقائيًا دون أي توقف ودون أي تدخل يدوي. وهي بصراحة واحدة من أفضل ميزات «أعدّها وانسَها» في AWS كلها.</p>
<p>ولهذا يكون التحقق عبر DNS هو التوصية الافتراضية في <a href="https://stevekinney.com/courses/aws/dns-validation-vs-email-validation">التحقق عبر DNS مقابل التحقق عبر البريد الإلكتروني</a>: <strong>سجل CNAME هو مفتاح التجديد التلقائي</strong>. أزله ولن تستطيع ACM إعادة التحقق من النطاق. أبقِه يصبح التجديد غير مرئي.</p>
<h3 id="الشهادات-المتحقق-منها-عبر-البريد-الإلكتروني">الشهادات المُتحقَّق منها عبر البريد الإلكتروني</h3>
<p>بالنسبة للشهادات المُتحقَّق منها عبر البريد الإلكتروني، ترسل ACM رسالة تجديد إلى العناوين نفسها التي استخدمتها في التحقق الأصلي. ويجب أن ينقر شخص ما على رابط الموافقة. وإن لم يستجب أحد، تنتهي صلاحية الشهادة.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إن كنت قد استخدمت التحقق عبر البريد الإلكتروني، وغادر الشخص الذي وافق على الشهادة أصلًا الشركة، أو تغيّرت أدواره، أو ببساطة لم يعد يفحص ذلك العنوان، فستبقى رسالة التجديد دون رد وستنتهي صلاحية شهادتك. لقد أسقط هذا مواقع إنتاج. استخدم التحقق عبر DNS.</p>
</blockquote>
<h2 id="الجدول-الزمني-للتجديد">الجدول الزمني للتجديد</h2>
<p>إليك ما يحدث مع اقتراب الشهادة من الانتهاء:</p>
<table>
<thead>
<tr>
<th>الأيام المتبقية قبل الانتهاء</th>
<th>ما يحدث</th>
</tr>
</thead>
<tbody>
<tr>
<td>60 يومًا</td>
<td>تبدأ ACM محاولات التجديد للشهادات المُتحقَّق منها عبر DNS</td>
</tr>
<tr>
<td>45 يومًا</td>
<td>إن فشل التحقق عبر DNS، ترسل ACM حدث AWS Health وإشعار EventBridge</td>
</tr>
<tr>
<td>30 يومًا</td>
<td>ترسل ACM إشعارًا آخر إن كان التجديد لا يزال يفشل</td>
</tr>
<tr>
<td>15 يومًا</td>
<td>إشعار آخر</td>
</tr>
<tr>
<td>7 أيام</td>
<td>إشعار آخر</td>
</tr>
<tr>
<td>3 أيام</td>
<td>إشعار آخر</td>
</tr>
<tr>
<td>يوم واحد</td>
<td>الإشعار الأخير قبل الانتهاء</td>
</tr>
<tr>
<td>0 أيام</td>
<td>تنتهي صلاحية الشهادة. يعرض المتصفح تحذيرًا أمنيًا. ولا يستطيع المستخدمون الوصول إلى موقعك.</td>
</tr>
</tbody>
</table>
<p>إن كانت سجلات التحقق عبر DNS موجودة والشهادة مرتبطة بمورد AWS نشط، فلن ترى أيًّا من هذه الإشعارات أبدًا. يحدث التجديد بصمت قرب علامة الستين يومًا.</p>
<h3 id="ما-قد-يخطئ">ما قد يخطئ</h3>
<p>حتى مع التحقق عبر DNS، قد يفشل التجديد إذا:</p>
<ol>
<li><strong>حُذف سجل CNAME</strong>: ينظّف أحدهم سجلات DNS فيحذف سجل CNAME الخاص بالتحقق في ACM. عندئذ لا تستطيع ACM إعادة التحقق من النطاق.</li>
<li><strong>الشهادة غير مستخدمة</strong>: تشترط ACM أن تكون الشهادة مرتبطة بخدمة AWS واحدة على الأقل (CloudFront أو ELB أو API Gateway). والشهادة غير المستخدمة لا تُجدَّد تلقائيًا.</li>
<li><strong>انتهت صلاحية النطاق نفسه</strong>: إذا انقضى تسجيل نطاقك، اختفت سجلات DNS ولم تستطع ACM التحقق من أي شيء.</li>
</ol>
<p>يمكنك فحص أهلية شهادة ما للتجديد:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.{Status:Status,RenewalEligibility:RenewalEligibility,NotAfter:NotAfter}&quot;</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ISSUED&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RenewalEligibility&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ELIGIBLE&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;NotAfter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2027-04-18T12:00:00Z&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إن أظهر <code>RenewalEligibility</code> القيمة <code>INELIGIBLE</code>، فحقّق في الأمر فورًا. تحقّق من أن سجل CNAME لا يزال في DNS وأن الشهادة مرتبطة بمورد AWS حي.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تحذف سجلات CNAME الخاصة بالتحقق في ACM من DNS أبدًا. فهي صغيرة، ولا تكلّف شيئًا، وهي الآلية التي تُبقي شهاداتك حيّة. تعامل معها كبنية تحتية دائمة.</p>
</blockquote>
<h2 id="لماذا-تشترط-cloudfront-منطقة-us-east-1">لماذا تشترط CloudFront منطقة us-east-1</h2>
<p>هذا هو القيد الذي يُربك كل مهندس تقريبًا في أول مرة يستخدم فيها ACM مع CloudFront. ويستحق شرحًا كاملًا.</p>
<p><strong>CloudFront</strong> شبكة توصيل محتوى عالمية. توزيع CloudFront الخاص بك لا يعيش في منطقة واحدة—بل يعمل عبر مئات مواقع الحافة حول العالم. لكن مستوى التحكم في CloudFront، وهو النظام الذي يدير إعدادات التوزيعات، يعمل في <code>us-east-1</code>. وحين تربط شهادة بتوزيع CloudFront، يبحث CloudFront عن تلك الشهادة في سجل ACM في <code>us-east-1</code> ولا مكان آخر.</p>
<p>هذا يعني:</p>
<ul>
<li>الشهادة في <code>us-east-1</code> تعمل مع CloudFront.</li>
<li>الشهادة في <code>us-west-2</code> لا تعمل مع CloudFront. فلن يراها CloudFront.</li>
<li>الشهادة في <code>eu-west-1</code> لا تعمل مع CloudFront. فلن يراها CloudFront.</li>
<li>لا توجد طريقة لنسخ شهادة أو نقلها بين المناطق. فإن أنشأتها في المنطقة الخطأ، فعليك طلب شهادة جديدة في <code>us-east-1</code>.</li>
</ul>
<blockquote>
<p><strong>تحذير</strong></p>
<p>شهادات CloudFront <strong>يجب</strong> أن تكون في <code>us-east-1</code>. فإن وثّرت شهادتك في أي منطقة أخرى، فلن تظهر في وحدة تحكم CloudFront ولن يمكن ربطها عبر سطر الأوامر. هذا ليس عيبًا—بل هو مقصود بالتصميم. فـ CloudFront خدمة عالمية لها مستوى تحكم في <code>us-east-1</code>، وكل الموارد العالمية (الشهادات وقواعد WAF ودوال Lambda@Edge) يجب توفيرها هناك.</p>
</blockquote>
<h3 id="مسار-تصحيح-لا-أجد-شهادتي">مسار تصحيح «لا أجد شهادتي»</h3>
<p>إن كنت تحاول ربط شهادة بـ CloudFront وهي لا تظهر:</p>
<ol>
<li>افحص المنطقة. نفّذ <code>aws acm list-certificates --region us-east-1 --output json</code>. فإن لم تكن شهادتك في القائمة، فهي في منطقة أخرى.</li>
<li>إن كانت الشهادة في المنطقة الخطأ، فاطلب شهادة جديدة في <code>us-east-1</code>. لا يوجد اختصار.</li>
<li>إن كانت الشهادة في <code>us-east-1</code> لكنها لا تظهر في وحدة تحكم CloudFront، فافحص حالتها. لا يمكن ربط إلا الشهادات ذات الحالة <code>ISSUED</code>. أما الشهادة في حالة <code>PENDING_VALIDATION</code> فهي غير صالحة للاستخدام.</li>
</ol>
<pre><code class="language-bash">aws acm list-certificates \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;CertificateSummaryList[*].{Domain:DomainName,ARN:CertificateArn,Status:Status}&quot;</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Domain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ARN&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ISSUED&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<h3 id="الخدمات-الأخرى-مختلفة">الخدمات الأخرى مختلفة</h3>
<p>شرط <code>us-east-1</code> هذا خاص بـ CloudFront (وبعدد قليل من الخدمات العالمية الأخرى مثل AWS Global Accelerator). فإن كنت تستخدم ACM مع Application Load Balancer أو API Gateway، فيجب أن تكون الشهادة في المنطقة نفسها التي يوجد فيها ذلك المورد—وليس بالضرورة في <code>us-east-1</code>.</p>
<p>وفي هذه الدورة، بما أن واجهتك الأمامية تُقدَّم عبر CloudFront، فإن <code>us-east-1</code> هي المنطقة الوحيدة التي تهمّ بالنسبة لـ ACM. فكل أمر <code>aws acm</code> في هذه الدورة يتضمن صراحةً <code>--region us-east-1</code>، وينبغي أن تتضمن أوامرك ذلك أيضًا.</p>
<h2 id="تجميع-الخيوط">تجميع الخيوط</h2>
<p>تبدو دورة حياة شهادة ACM مُعدّة جيدًا هكذا:</p>
<ol>
<li><strong>اطلب</strong> الشهادة في <code>us-east-1</code> مع التحقق عبر DNS.</li>
<li><strong>أضف</strong> سجل التحقق CNAME إلى DNS لديك.</li>
<li><strong>انتظر</strong> أن تتحقق ACM من الشهادة وتصدرها.</li>
<li><strong>اربط</strong> الشهادة بتوزيع CloudFront الخاص بك (وهو ما يغطيه الوحدة القادمة).</li>
<li><strong>انسَ أمرها</strong>: تجدّد ACM الشهادة تلقائيًا كل 13 شهرًا، مع إعادة التحقق عبر سجل CNAME نفسه.</li>
</ol>
<p>تلك الخطوة الأخيرة هي كل المقصود. فشهادة مُتحقَّق منها عبر DNS في <code>us-east-1</code>، ومرتبطة بتوزيع CloudFront، وسجل CNAME الخاص بها متروك في مكانه، هي شهادة لن تضطر إلى التفكير فيها مرة أخرى. وفي البنية التحتية، الأشياء التي لا تضطر إلى التفكير فيها أبدًا هي الأشياء التي لا تتعطّل في الثانية صباحًا.</p>
`,c={book:t,chapter:"aws",chapterTitle:n,slug:s,title:a,headings:o,html:e};export{t as book,l as chapter,n as chapterTitle,c as default,o as headings,e as html,s as slug,a as title};
