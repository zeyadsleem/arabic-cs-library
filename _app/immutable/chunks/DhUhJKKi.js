const t="kinney",c="aws",o="نشر تطبيقات الويب على AWS",n="what-is-cloudwatch",a="ما الذي تفعله CloudWatch ولماذا تحتاج إليها",d=[{depth:2,id:"لماذا-هذا-مهم",text:"لماذا هذا مهم"},{depth:2,id:"يبني-على",text:"يبني على"},{depth:2,id:"الركائز-الثلاث",text:"الركائز الثلاث"},{depth:3,id:"السجلات",text:"السجلات"},{depth:3,id:"المقاييس",text:"المقاييس"},{depth:3,id:"الإنذارات",text:"الإنذارات"},{depth:2,id:"كيف-تنشر-الخدمات-في-cloudwatch",text:"كيف تنشر الخدمات في CloudWatch"},{depth:2,id:"cloudwatch-مقابل-ما-تعرفه-بالفعل",text:"CloudWatch مقابل ما تعرفه بالفعل"},{depth:2,id:"الطبقة-المجانية-في-cloudwatch",text:"الطبقة المجانية في CloudWatch"},{depth:2,id:"ما-ستبنيه-في-هذه-الوحدة",text:"ما ستبنيه في هذه الوحدة"},{depth:2,id:"التحقق",text:"التحقق"},{depth:2,id:"أنماط-الفشل-الشائعة",text:"أنماط الفشل الشائعة"}],e=`<p>تطبيق Scratch Lab صار مباشرًا على الإنترنت، والناس يضغطون هنا وهناك، ثم يظهر أسوأ نوع من الأخطاء: «ضغطت الزر ولم يحدث شيء». لا أثر مكدّس (stack trace). ولا خطوات إعادة إنتاج واضحة. مجرد إحساس غامض وخيبة أمل. هنا تتوقف المراقبة عن كونها زينة مؤسسية، وتبدأ في أن تكون الطريقة الوحيدة التي تستعيد بها أمسيتك.</p>
<p>إذا أردت الصياغة المرجعية من AWS للخدمة أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">نظرة CloudWatch العامة</a> هي المرجع الرسمي.</p>
<p>على Vercel تحصل على لوحة معلومات. ترى فيها استدعاءات دوالك، وتتحقّق من معدّلات الأخطاء، وتقرأ السجلات — كل ذلك في مكان واحد وبلا أي إعداد. وتمنحك AWS القدرات نفسها عبر <strong>CloudWatch</strong>، لكن بقدرة أكبر وبأمور أكثر تحتاج إلى إعداد. CloudWatch هي خدمة المراقبة والرصد التي تجمع البيانات من كل خدمة AWS بنيتها في هذه الدورة — Lambda وAPI Gateway وDynamoDB وS3 وCloudFront — وتمنحك مكانًا واحدًا تراقب فيه ما يجري.</p>
<p>لقد مررت بـ CloudWatch مرورًا عابرًا من قبل. ففي <a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هي Lambda؟</a> تعلّمت أن مخرجات <code>console.log</code> تذهب إلى CloudWatch Logs. وفي هذه الوحدة ستتعلّم كيف تستخدم تلك البيانات فعلًا: كيف تبحث في السجلات، وتتتبّع المقاييس، وتُعدّ الإنذارات، وتتتبّع الطلبات عبر مكدّسك بالكامل.</p>
<h2 id="لماذا-هذا-مهم">لماذا هذا مهم</h2>
<p>السجلات والمقاييس والإنذارات هي ما يجعل الخلفية قابلة للرصد بدلًا من أن تكون غامضة. فبمجرد أن تعتمد واجهتك الأمامية على دالة Lambda ومسار في API Gateway وجدول DynamoDB، لم تعد عبارة «إنها تعمل على جهازي» خطة تصحيح جدّية. أنت تحتاج إلى سجل لما حدث، وأين حدث، وهل الأمر يزداد سوءًا.</p>
<h2 id="يبني-على">يبني على</h2>
<ul>
<li><a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هي Lambda ولماذا يهتمّ مهندسو الواجهة الأمامية</a></li>
<li><a href="https://stevekinney.com/courses/aws/creating-an-http-api">إنشاء HTTP API</a></li>
<li><a href="https://stevekinney.com/courses/aws/what-is-dynamodb">ما هي DynamoDB ومتى تستخدمها</a></li>
</ul>
<pre><code>flowchart LR
    Browser[&quot;Browser request&quot;] --&gt; APIGateway[&quot;API Gateway&quot;]
    APIGateway --&gt; Lambda[&quot;Lambda&quot;]
    Lambda --&gt; DynamoDB[&quot;DynamoDB&quot;]

    APIGateway -. access logs / metrics .-&gt; CloudWatch[&quot;CloudWatch&quot;]
    Lambda -. logs / metrics .-&gt; CloudWatch
    DynamoDB -. metrics .-&gt; CloudWatch
    CloudWatch --&gt; Alarm[&quot;Alarms / dashboards / queries&quot;]
</code></pre>
<h2 id="الركائز-الثلاث">الركائز الثلاث</h2>
<p>تنظّم CloudWatch الرصد حول ثلاثة مفاهيم: <strong>السجلات</strong> و<strong>المقاييس</strong> و<strong>الإنذارات</strong>. وهذه ليست خاصة بـ AWS — فهي الركائز الثلاث نفسها التي تجدها في أي منصة رصد (Datadog وNew Relic وGrafana). لكن AWS تخبزها في المنصة نفسها.</p>
<h3 id="السجلات">السجلات</h3>
<p>السجلات هي المخرجات النصية الخام من خدماتك. فعندما تشغّل دالة Lambda لديك <code>console.log('Processing request')</code>، تنتهي تلك السلسلة في CloudWatch Logs. وعندما يتلقّى API Gateway طلبًا، يمكنه تسجيل تفاصيل الطلب. وكل خدمة AWS تُنتج مخرجات تكتبها في CloudWatch Logs.</p>
<p>تُنظَّم السجلات في <strong>مجموعات سجلات</strong> و<strong>تدفّقات سجلات</strong>. ومجموعة السجلات حاوية — عادةً واحدة لكل مورد خدمة (دالة Lambda لديك تحصل على <code>/aws/lambda/my-frontend-app-api</code>). وتدفّق السجلات سلسلة أحداث داخل تلك المجموعة، وعادةً واحد لكل بيئة تنفيذ أو نسخة.</p>
<p>إذا سبق أن فتحت وحدة تحكم أدوات مطوّري المتصفح لتصحيح مشكلة في الواجهة الأمامية، فإن CloudWatch Logs هي الفكرة نفسها لخلفيتك. إلا أنه بدلًا من أن تختفي مخرجات <code>console.log</code> عند إغلاق التبويب، تخزّن CloudWatch كل شيء وتتيح لك البحث فيه.</p>
<h3 id="المقاييس">المقاييس</h3>
<p><strong>المقاييس</strong> قياسات رقمية تُنشر على فواصل منتظمة. تنشر Lambda عدد المرات التي استُدعيت فيها دالتك، ومدة كل استدعاء، وعدد ما فشل منها. وينشر API Gateway أعداد الطلبات ومئينات زمن الاستجابة ومعدّلات الأخطاء. وتنشر DynamoDB معدّلي القراءة والكتابة، والطلبات المقيَّدة، والسعة المستهلكة.</p>
<p>تُنشر هذه المقاييس تلقائيًا — لا حاجة إلى إعداد أي شيء. فبمجرد أن نشرت دالة Lambda في <a href="https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function">نشر دالة Lambda واختبارها</a>، بدأت Lambda تدفع مقاييس <code>Invocations</code> و<code>Errors</code> و<code>Duration</code> و<code>Throttles</code> إلى CloudWatch.</p>
<p>المقاييس بيانات سلاسل زمنية. يمكنك رسمها بيانيًا، وتجميعها على نوافذ زمنية، ومقارنتها بين الخدمات. وهكذا تجيب عن أسئلة مثل «هل تبطؤ واجهتي API؟» أو «هل تتزايد الأخطاء بعد آخر نشر؟»</p>
<p>يمنحك تبويب <strong>Monitor</strong> في دالة Lambda نظرة سريعة على هذه المقاييس في لوحة التحكم — أعداد الاستدعاءات، وأعداد الأخطاء، ومئينات المدة على نوافذ زمنية قابلة للضبط.</p>
<p><img src="/arabic-cs-library/images/kinney/d3b4a25aa5e4380b.webp" alt="تبويب Monitor في دالة Lambda وهو يعرض رسومًا بيانية لمقاييس الاستدعاءات والمدة وعدد الأخطاء."></p>
<h3 id="الإنذارات">الإنذارات</h3>
<p><strong>الإنذار</strong> يراقب مقياسًا واحدًا ويطلق إجراءً عندما يتجاوز ذلك المقياس حدًّا معيّنًا. والإجراء الأكثر شيوعًا هو إرسال إشعار — «تجاوز معدّل أخطاء Lambda لديك 5% لثلاث دقائق متتالية، وهذا بريد إلكتروني».</p>
<p>وللإنذارات ثلاث حالات:</p>
<ul>
<li><strong>OK</strong>: المقياس ضمن الحد.</li>
<li><strong>ALARM</strong>: تجاوز المقياس الحدّ لعدد فترات التقييم المحدّد.</li>
<li><strong>INSUFFICIENT_DATA</strong>: لا تملك CloudWatch بيانات كافية لتحديد الحالة. وهذه هي الحالة الابتدائية لكل إنذار جديد، وهي شائعة أيضًا عندما لا تكون الدالة قد استُدعيت مؤخرًا.</li>
</ul>
<p>تتصل الإنذارات بـ<strong>موضوعات SNS</strong> (خدمة الإشعارات البسيطة) لتوصيل الإشعارات. وموضوع SNS قناة — تشترك بعنوان بريدك الإلكتروني في الموضوع، وعندما ينطلق إنذار ترسل لك SNS بريدًا. وستُعدّ هذا في <a href="https://stevekinney.com/courses/aws/cloudwatch-alarms-and-sns">الإنذارات والإشعارات باستخدام SNS</a>.</p>
<h2 id="كيف-تنشر-الخدمات-في-cloudwatch">كيف تنشر الخدمات في CloudWatch</h2>
<p>إليك ما يجعل CloudWatch مختلفة عن تركيب أداة مراقبة من طرف ثالث: خدمات AWS تنشر في CloudWatch تلقائيًا. لا تثبّت وكيلًا، ولا تضيف مكتبة، ولا تضبط مفتاح API. البيانات تتدفق فحسب.</p>
<table>
<thead>
<tr>
<th>الخدمة</th>
<th>ما تنشره</th>
<th>أين تجده</th>
</tr>
</thead>
<tbody>
<tr>
<td>Lambda</td>
<td>السجلات (مخرجات <code>console.log</code>)، والمقاييس (<code>Invocations</code> و<code>Errors</code> و<code>Duration</code> و<code>Throttles</code> و<code>ConcurrentExecutions</code>)</td>
<td>مجموعة السجلات: <code>/aws/lambda/my-frontend-app-api</code>، النطاق (namespace): <code>AWS/Lambda</code></td>
</tr>
<tr>
<td>API Gateway</td>
<td>سجلات الوصول (إن كانت مفعّلة)، والمقاييس (<code>Count</code> و<code>4XXError</code> و<code>5XXError</code> و<code>Latency</code> و<code>IntegrationLatency</code>)</td>
<td>النطاق: <code>AWS/ApiGateway</code></td>
</tr>
<tr>
<td>DynamoDB</td>
<td>المقاييس (<code>ConsumedReadCapacityUnits</code> و<code>ConsumedWriteCapacityUnits</code> و<code>ThrottledRequests</code> و<code>SystemErrors</code>)</td>
<td>النطاق: <code>AWS/DynamoDB</code></td>
</tr>
<tr>
<td>CloudFront</td>
<td>المقاييس (<code>Requests</code> و<code>BytesDownloaded</code> و<code>4xxErrorRate</code> و<code>5xxErrorRate</code>)</td>
<td>النطاق: <code>AWS/CloudFront</code></td>
</tr>
<tr>
<td>S3</td>
<td>المقاييس (<code>NumberOfObjects</code> و<code>BucketSizeBytes</code>)، وسجلات الوصول (إن كانت مفعّلة)</td>
<td>النطاق: <code>AWS/S3</code></td>
</tr>
</tbody>
</table>
<p><strong>النطاق</strong> (namespace) هو الطريقة التي تنظّم بها CloudWatch المقاييس حسب الخدمة. وعند الاستعلام عن المقاييس تحدّد النطاق لتخبر CloudWatch عن أي خدمة تسأل. فكل مقاييس Lambda تعيش تحت <code>AWS/Lambda</code>، وكل مقاييس API Gateway تحت <code>AWS/ApiGateway</code>، وهكذا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>سجلات Lambda مفعّلة دائمًا — لا شيء يُشغَّل. أما تسجيل الوصول في API Gateway فيتطلّب إعدادًا صريحًا. وفي هذه الوحدة ستركّز على سجلات Lambda والمقاييس المدمجة عبر خدمات الخلفية الثلاث كلها (Lambda وAPI Gateway وDynamoDB).</p>
</blockquote>
<h2 id="cloudwatch-مقابل-ما-تعرفه-بالفعل">CloudWatch مقابل ما تعرفه بالفعل</h2>
<p>إذا سبق أن استخدمت Vercel Analytics أو سجلات الدوال في Netlify، فإن CloudWatch تغطّي الأرضية نفسها — وأكثر. والمقابل هو الإعداد.</p>
<table>
<thead>
<tr>
<th></th>
<th>Vercel/Netlify</th>
<th>CloudWatch</th>
</tr>
</thead>
<tbody>
<tr>
<td>السجلات</td>
<td>تلقائية، ظاهرة في لوحة المعلومات</td>
<td>تلقائية، لكنك تتنقّل بين مجموعات السجلات وتدفّقاتها</td>
</tr>
<tr>
<td>المقاييس</td>
<td>رسوم بيانية جاهزة في لوحة المعلومات</td>
<td>أنت تختار أي المقاييس ترسمها</td>
</tr>
<tr>
<td>التنبيهات</td>
<td>أساسية (فـ Vercel لديها تنبيهات محدودة)</td>
<td>إنذارات قابلة للضبط بالكامل مع قنوات إشعار متعددة</td>
</tr>
<tr>
<td>الاستعلام</td>
<td>بحث محدود</td>
<td>CloudWatch Logs Insights — لغة استعلام كاملة</td>
</tr>
<tr>
<td>لوحات المعلومات</td>
<td>مقاس واحد يناسب الجميع</td>
<td>أنت تبني لوحتك بنفسك</td>
</tr>
<tr>
<td>التكلفة</td>
<td>مشمولة في خطتك</td>
<td>الطبقة المجانية سخية، ثم الدفع حسب الاستخدام</td>
</tr>
</tbody>
</table>
<p>الفرق الجوهري: Vercel تمنحك آراءً جاهزة. أما CloudWatch فتمنحك أوليات (primitives). أنت من يقرّر ما تراقبه، وأي حدود تضبط، وكيف تُبلَّغ. هذا عمل أكبر في البداية، لكنه يعني أن مراقبتك تطابق تطبيقك فعلًا بدلًا من لوحة معلومات عامة. وبصراحة، صرت أفضّل هذا — فبمجرد أن تُعدّ إنذاراتك ولوحاتك الخاصة، تبدأ المقاييس المعلّبة من المنصات الأخرى تبدو وكأنها تجيب عن أسئلة لم تسألها قطّ.</p>
<h2 id="الطبقة-المجانية-في-cloudwatch">الطبقة المجانية في CloudWatch</h2>
<p>تملك CloudWatch طبقة مجانية سخية تغطّي معظم التطبيقات الصغيرة والمتوسطة:</p>
<ul>
<li><strong>السجلات</strong>: 5 GB من البيانات شهريًا موزّعة بين الاستقبال والتخزين الأرشيفي ومسح Logs Insights</li>
<li><strong>المقاييس</strong>: 10 مقاييس مخصّصة أو مفصّلة للمراقبة، إضافة إلى مليون طلب API شهريًا</li>
<li><strong>لوحات المعلومات والإنذارات</strong>: 3 لوحات مخصّصة تضم كل منها حتى 50 مقياسًا، إضافة إلى 10 مقاييس إنذار قياسية</li>
</ul>
<p>المقاييس المدمجة من خدمات AWS (تلك الموجودة في الجدول أعلاه) لا تُحتسب على حصّة مقاييسك المخصّصة. ولا تدفع مقابل المقاييس المخصّصة إلا إذا نشرت مقاييسك الخاصة.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>مدة الاحتفاظ في CloudWatch Logs افتراضيًا هي <strong>ألا تنتهي صلاحيتها أبدًا</strong>. ستتراكم سجلاتك إلى الأبد، وستدفع في النهاية مقابل التخزين. وفي الدرس التالي ستتعلّم كيف تضبط سياسة احتفاظ — و30 يومًا مدة افتراضية معقولة للتطوير، و90 يومًا للإنتاج.</p>
</blockquote>
<h2 id="ما-ستبنيه-في-هذه-الوحدة">ما ستبنيه في هذه الوحدة</h2>
<p>عبر الدروس الأربعة التالية، ستقوم بما يلي:</p>
<ol>
<li>تتنقّل بين مجموعات السجلات، وتنفّذ تسجيلًا منظمًا بصيغة JSON في دالة Lambda لديك، وتستعلم عن السجلات باستخدام CloudWatch Logs Insights.</li>
<li>تحدّد المقاييس الأساسية لـ Lambda وAPI Gateway وDynamoDB، وتنشئ لوحة معلومات في CloudWatch.</li>
<li>تنشئ إنذارات ترسل إليك إشعارات بالبريد الإلكتروني عندما ترتفع معدّلات الأخطاء أو يتدهور زمن الاستجابة.</li>
<li>تتتبّع طلبًا واحدًا من API Gateway عبر Lambda إلى DynamoDB باستخدام معرّفات الارتباط واستعلامات Insights.</li>
</ol>
<p>وبحلول نهاية هذه الوحدة ستكون لديك تغطية مراقبة عبر كل خدمة خلفية نشرتها في هذه الدورة: دوال Lambda من <a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هي Lambda ولماذا يهتمّ مهندسو الواجهة الأمامية</a>، ونقاط نهاية API Gateway من <a href="https://stevekinney.com/courses/aws/creating-an-http-api">إنشاء HTTP API</a>، وجداول DynamoDB من <a href="https://stevekinney.com/courses/aws/what-is-dynamodb">ما هي DynamoDB ومتى تستخدمها</a>.</p>
<h2 id="التحقق">التحقق</h2>
<p>قبل أن تتعمّق أكثر في الوحدة، تأكّد من أن CloudWatch تخبرك الحقيقة بالفعل عن طلب حقيقي واحد:</p>
<pre><code class="language-bash">aws logs describe-log-groups \\
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \\
  --region us-east-1 \\
  --output json

aws cloudwatch list-metrics \\
  --namespace AWS/Lambda \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>إذا أعاد هذان الأمران مجموعة سجلات دالتك ومقاييس Lambda، فخط أنابيب الرصد موجود. أنت لا تبدأ من الصفر. أنت تتعلّم كيف تقرأ الإشارات التي لديك بالفعل.</p>
<h2 id="أنماط-الفشل-الشائعة">أنماط الفشل الشائعة</h2>
<ul>
<li><strong>افتراض أن السجلات تساوي الرصد:</strong> مخرجات <code>console.log</code> الخام أفضل من لا شيء، لكنها تتحوّل سريعًا إلى درج مليء بالخردة.</li>
<li><strong>معاملة المقاييس كأنها سجلات:</strong> المقاييس تخبرك أن شكل النظام تغيّر. لكنها لا تخبرك بالسبب.</li>
<li><strong>تجاهل إعدادات الاحتفاظ:</strong> الافتراضي في CloudWatch هو «احتفظ بها إلى الأبد»، وهي طريقة لطيفة لشراء تخزين لسجلات لن تقرأها أبدًا.</li>
<li><strong>توقّع أن كل خدمة AWS تسجّل بالطريقة نفسها:</strong> Lambda تسجّل افتراضيًا. وتسجيل الوصول في API Gateway يتطلّب إعدادًا صريحًا. أما DynamoDB فيظهر غالبًا كمقاييس إلا إذا أضفت أدوات قياس خاصة بك حول الاستدعاءات.</li>
</ul>
`,s={book:t,chapter:"aws",chapterTitle:o,slug:n,title:a,headings:d,html:e};export{t as book,c as chapter,o as chapterTitle,s as default,d as headings,e as html,n as slug,a as title};
