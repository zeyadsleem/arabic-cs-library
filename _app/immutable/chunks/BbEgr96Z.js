const t="kinney",a="aws",n="نشر تطبيقات الويب على AWS",o="edge-function-debugging-and-limitations",d="تصحيح دوال الحافة وقيودها",e=[{depth:2,id:"أين-تذهب-السجلات",text:"أين تذهب السجلات"},{depth:3,id:"سجلات-lambdaedge",text:"سجلات Lambda@Edge"},{depth:3,id:"سجلات-cloudfront-functions",text:"سجلات CloudFront Functions"},{depth:2,id:"أنماط-الأخطاء-الشائعة",text:"أنماط الأخطاء الشائعة"},{depth:3,id:"أعادت-الدالة-استجابة-غير-صالحة",text:"«أعادت الدالة استجابة غير صالحة»"},{depth:3,id:"انتهت-مهلة-التنفيذ",text:"«انتهت مهلة التنفيذ»"},{depth:3,id:"تجاوزت-الدالة-الحجم-المسموح",text:"«تجاوزت الدالة الحجم المسموح»"},{depth:3,id:"الدالة-تعمل-في-الاختبار-لكن-لا-تعمل-في-الإنتاج",text:"الدالة تعمل في الاختبار لكن لا تعمل في الإنتاج"},{depth:3,id:"دالة-lambda-المرتبطة-بتوزيع-cloudfront-غير-صالحة-أو-لا-تملك-الأذونات-المطلوبة",text:"«دالة Lambda المرتبطة بتوزيع CloudFront غير صالحة أو لا تملك الأذونات المطلوبة»"},{depth:2,id:"حدود-حجم-الاستجابة",text:"حدود حجم الاستجابة"},{depth:2,id:"قيود-الوصول-إلى-الشبكة",text:"قيود الوصول إلى الشبكة"},{depth:2,id:"تأخير-النسخ-المتماثل",text:"تأخير النسخ المتماثل"},{depth:2,id:"cloudfront-keyvaluestore",text:"CloudFront KeyValueStore"},{depth:2,id:"ملخص-القيود",text:"ملخّص القيود"},{depth:2,id:"سير-عمل-التصحيح",text:"سير عمل التصحيح"}],s=`<p>دوال الحافة (edge functions) قوية، لكنها تفشل بطرق مربكة حقًا في أول مرة تصادفها. سجلاتك ليست حيث تتوقّع. ودالتك تعمل محليًا لكنها تفشل على الحافة. ونشرك ينجح لكن الدالة لا تبدو وكأنها تعمل. يغطّي هذا الدرس أين تنظر عندما تسوء الأمور، وما القيود التي يجب أن تضعها في ذهنك قبل أن تكتب سطر شيفرة واحدًا.</p>
<p>إذا أردت نسخة AWS من سلوك وقت التشغيل أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html">دليل CloudFront Functions</a> هو المرجع الرسمي.</p>
<h2 id="أين-تذهب-السجلات">أين تذهب السجلات</h2>
<p>هذا هو المصدر الأول للارتباك — لا أستطيع أن أخبرك كم مرة حدّقت في مجموعة سجلات فارغة في CloudWatch بـ <code>us-east-1</code> قبل أن أتذكّر أن السجلات في منطقة أخرى. تكتب كل من Lambda@Edge وCloudFront Functions في CloudWatch Logs، لكنهما تكتبان في <strong>مناطق مختلفة</strong> وبسلوكيات مختلفة.</p>
<h3 id="سجلات-lambdaedge">سجلات Lambda@Edge</h3>
<p>تكتب دوال Lambda@Edge السجلات في <strong>منطقة AWS الأقرب إلى موقع الحافة الذي نفّذ الدالة</strong>. فإذا أطلق مستخدم في طوكيو دالتك، ظهرت السجلات في مجموعة سجلات CloudWatch في <code>ap-northeast-1</code>. وإذا أطلقها مستخدم في لندن، ظهرت السجلات في <code>eu-west-2</code>.</p>
<p>وتتبع مجموعة السجلات نمط تسمية Lambda القياسي:</p>
<pre><code>/aws/lambda/us-east-1.my-frontend-app-edge-rewrite
</code></pre>
<p>لاحِظ البادئة <code>us-east-1.</code> — فهي تشير إلى أن الدالة نُشرت في <code>us-east-1</code> ونُسخت إلى المنطقة الحالية.</p>
<p>للعثور على سجلات Lambda@Edge، تحتاج إلى معرفة (أو تخمين) المنطقة التي عالجت الطلب. وإذا كنت تختبر من موقعك، فافحص منطقة CloudFront الأقرب إليك:</p>
<pre><code class="language-bash">aws logs describe-log-groups \\
  --log-group-name-prefix /aws/lambda/us-east-1.my-frontend-app-edge-rewrite \\
  --region ap-northeast-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا كنت تصحّح دالة Lambda@Edge ولا ترى سجلات في <code>us-east-1</code>، فهذا متوقّع. فقد <strong>نُشرت</strong> الدالة في <code>us-east-1</code> لكنها <strong>نُفّذت</strong> في أي منطقة كانت الأقرب إلى المستخدم. افحص CloudWatch في المنطقة الأقرب إلى مصدر الطلب.</p>
</blockquote>
<h3 id="سجلات-cloudfront-functions">سجلات CloudFront Functions</h3>
<p>تتعامل CloudFront Functions مع التسجيل بشكل مختلف. فسجلات التنفيذ الناتجة عن عبارات <code>console.log()</code> لا تُكتب تلقائيًا في CloudWatch. وبدلًا من ذلك، توفّر CloudFront Functions:</p>
<ol>
<li><strong>مخرجات الاختبار.</strong> عندما تختبر دالة باستخدام <code>aws cloudfront test-function</code>، تتضمن المخرجات أي عبارات <code>console.log()</code> ونتيجة الدالة.</li>
<li><strong>مقاييس CloudWatch.</strong> تنشر CloudFront مقاييس الدالة (الاستدعاءات والأخطاء واستهلاك الحوسبة وعمليات التقييد) إلى CloudWatch في <code>us-east-1</code>. وهذه مقاييس لا سجلات — ترى أن دالتك أخطأت، لكن لا ترى رسالة الخطأ.</li>
</ol>
<p>لإضافة تسجيل فوري إلى CloudFront Function، يمكنك تفعيل CloudWatch Logs بإنشاء إعداد تسجيل. وتظهر السجلات في <code>us-east-1</code> ضمن مجموعة سجلات اسمها:</p>
<pre><code>/aws/cloudfront/function/url-rewrite
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>للتصحيح السريع لـ CloudFront Functions، استخدم أمر CLI‏ <code>test-function</code> مع حمولات أحداث مختلفة بدلًا من النشر وانتظار حركة مرور حقيقية. فهو أسرع ويمنحك مخرجات <code>console.log()</code> كاملة.</p>
</blockquote>
<h2 id="أنماط-الأخطاء-الشائعة">أنماط الأخطاء الشائعة</h2>
<h3 id="أعادت-الدالة-استجابة-غير-صالحة">«أعادت الدالة استجابة غير صالحة»</h3>
<p>يظهر هذا الخطأ في استجابة الخطأ القياسية من CloudFront (خطأ 502 أو 503) عندما تعيد دالة الحافة كائن استجابة مشوّهًا. والأسباب الشائعة:</p>
<p><strong>Lambda@Edge:</strong> إعادة <code>status: 200</code> بدلًا من <code>status: '200'</code>. فالحالة يجب أن تكون سلسلة نصية لا عددًا.</p>
<p><strong>CloudFront Functions:</strong> إعادة كائن استجابة تنقصه حقول مطلوبة. كحد أدنى تحتاج إلى <code>statusCode</code> و<code>statusDescription</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Wrong—missing statusDescription</span>
<span class="hljs-keyword">return</span> { <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span> };

<span class="hljs-comment">// Correct</span>
<span class="hljs-keyword">return</span> { <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;OK&#x27;</span> };
</code></pre>
<h3 id="انتهت-مهلة-التنفيذ">«انتهت مهلة التنفيذ»</h3>
<ul>
<li><strong>CloudFront Functions:</strong> تجاوزت دالتك حد استهلاك الحوسبة. ويُقاس ذلك كنسبة مئوية (0–100) من الوقت الأقصى المسموح، لا بثوانٍ على الساعة الجدارية. فإن رأيت هذا، فدالتك تقوم بعمل أكثر من اللازم — بسّط المنطق أو انقله إلى Lambda@Edge.</li>
<li><strong>Lambda@Edge:</strong> تجاوزت دالة حدث المشاهد 5 ثوانٍ أو تجاوزت دالة حدث الأصل 30 ثانية. وإذا كانت دالتك تجري اتصالات شبكة، فافحص مهل تلك الاتصالات.</li>
</ul>
<h3 id="تجاوزت-الدالة-الحجم-المسموح">«تجاوزت الدالة الحجم المسموح»</h3>
<ul>
<li><strong>CloudFront Functions:</strong> تتجاوز شيفرتك 10 KB. أزل التعليقات، أو اختصر أسماء المتغيّرات، أو قسّم المنطق بين دالة طلب المشاهد ودالة استجابة المشاهد. أو أخرج البيانات من الدالة كليًا — انظر KeyValueStore أدناه.</li>
<li><strong>Lambda@Edge:</strong> تتجاوز حزمة نشرك المضغوطة 1 MB (أحداث المشاهد) أو 50 MB (أحداث الأصل). أزل الاعتماديات غير المستخدمة، أو استخدم tree-shaking، أو فكّر فيما إذا كانت الاعتمادية ضرورية فعلًا.</li>
</ul>
<h3 id="الدالة-تعمل-في-الاختبار-لكن-لا-تعمل-في-الإنتاج">الدالة تعمل في الاختبار لكن لا تعمل في الإنتاج</h3>
<p>هذا يعني عادةً أحد أمرين:</p>
<ol>
<li><strong>نشرت إلى DEVELOPMENT لكن ليس إلى LIVE.</strong> فـ CloudFront Functions لها نشر على مرحلتين. وأمر <code>test-function</code> يختبر مرحلة DEVELOPMENT. ويجب أن تشغّل <code>publish-function</code> للترقية إلى LIVE.</li>
<li><strong>الدالة غير مرتبطة بالسلوك الصحيح.</strong> تحقّق من الارتباط باستخدام <code>get-distribution-config</code>، وافحص أن ARN الدالة يظهر في <code>FunctionAssociations</code> أو <code>LambdaFunctionAssociations</code> للسلوك الصحيح.</li>
</ol>
<h3 id="دالة-lambda-المرتبطة-بتوزيع-cloudfront-غير-صالحة-أو-لا-تملك-الأذونات-المطلوبة">«دالة Lambda المرتبطة بتوزيع CloudFront غير صالحة أو لا تملك الأذونات المطلوبة»</h3>
<p>هذا يعني واحدًا أو أكثر ممّا يلي:</p>
<ul>
<li>دالة Lambda غير موجودة في <code>us-east-1</code></li>
<li>أشرت إلى <code>$LATEST</code> بدلًا من إصدار مرقّم</li>
<li>دور التنفيذ لا يتضمّن <code>edgelambda.amazonaws.com</code> في سياسة الثقة الخاصة به</li>
<li>دور IAM لا يملك سياسة <code>AWSLambdaBasicExecutionRole</code> مرتبطة به</li>
</ul>
<p>راجع إعداد الدور في <a href="https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function">كتابة دالة Lambda@Edge</a>.</p>
<h2 id="حدود-حجم-الاستجابة">حدود حجم الاستجابة</h2>
<p>لدوال الحافة حدود صارمة على الاستجابة التي يمكنها توليدها:</p>
<table>
<thead>
<tr>
<th>المُشغِّل</th>
<th>الحد الأقصى لحجم الاستجابة (بما فيها الترويسات)</th>
</tr>
</thead>
<tbody>
<tr>
<td>طلب المشاهد (استجابة مُولَّدة)</td>
<td>40 KB</td>
</tr>
<tr>
<td>استجابة المشاهد</td>
<td>يمكنها تعديل الاستجابة (رمز الحالة والترويسات والجسم وملفات تعريف الارتباط) لكنها لا تستطيع توليد استجابة جديدة كليًا من الصفر بالطريقة التي تستطيع بها دالة طلب المشاهد أن تقطع الطريق قبل الوصول إلى الأصل</td>
</tr>
<tr>
<td>طلب الأصل (استجابة مُولَّدة)</td>
<td>1 MB</td>
</tr>
<tr>
<td>استجابة الأصل</td>
<td>لا تستطيع توليد استجابة؛ يمكنها فقط تعديل الاستجابة الموجودة</td>
</tr>
</tbody>
</table>
<p>إذا ولّدت دالة الحافة استجابة تتجاوز الحد، أرجعت CloudFront خطأ 502 إلى المشاهد.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تنطبق هذه الحدود عندما <strong>تولّد</strong> دالتك استجابة (تقطع الطريق دون الذهاب إلى الأصل). أما إذا كنت تعدّل استجابة جاءت من الأصل، فحجم الاستجابة تحكمه حدود CloudFront القياسية، لا حدود دالة الحافة.</p>
</blockquote>
<h2 id="قيود-الوصول-إلى-الشبكة">قيود الوصول إلى الشبكة</h2>
<p><strong>لا تستطيع CloudFront Functions إجراء اتصالات شبكة.</strong> لا طلبات HTTP، ولا استعلامات DNS، ولا اتصالات مآخذ (sockets). وهذا قيد صارم في وقت التشغيل. وإذا كانت دالتك تحتاج إلى استدعاء خدمة خارجية — التحقق من JWT مقابل نقطة نهاية JWKS، أو البحث عن علامة ميزة، أو الاستعلام من قاعدة بيانات — فيجب أن تستخدم Lambda@Edge.</p>
<p><strong>Lambda@Edge</strong> تستطيع إجراء اتصالات شبكة، لكن ضع في الحسبان:</p>
<ul>
<li>اتصالات الشبكة تضيف زمن استجابة. فدالة طلب المشاهد التي تجري اتصال HTTP بواجهة API لديك ستحجب طلب المستخدم حتى يكتمل ذلك الاتصال.</li>
<li>مهلة 5 ثوانٍ لأحداث المشاهد تشمل وقت الشبكة. فإن كانت خدمتك الخارجية بطيئة، تنتهي مهلة دالتك ويحصل المستخدم على خطأ 502.</li>
<li>فكّر في تخزين البيانات الخارجية مؤقتًا في النطاق العام للدالة (خارج المعالج) لإعادة استخدامها بين الاستدعاءات على بيئة التنفيذ نفسها.</li>
</ul>
<h2 id="تأخير-النسخ-المتماثل">تأخير النسخ المتماثل</h2>
<p>تُنسخ دوال Lambda@Edge إلى ذاكرات الحافة الإقليمية (regional edge caches) في أنحاء العالم. وهذا النسخ يستغرق وقتًا:</p>
<ul>
<li><strong>النشر الأول:</strong> عدة دقائق بعد ربط الدالة بتوزيع.</li>
<li><strong>التحديثات:</strong> كل إصدار جديد يتطلّب ارتباطًا جديدًا وجولة أخرى من النسخ. خصّص 5–10 دقائق لطرح عالمي كامل.</li>
<li><strong>الحذف:</strong> بعد إزالة ارتباط Lambda@Edge، تُنظَّف النسخ المتماثلة بشكل غير متزامن. وقد لا تستطيع حذف دالة Lambda لساعات. وتُرجع الواجهة البرمجية <code>ReplicatedFunctionStillCreating</code> أو <code>ResourceConflictException</code> حتى يكتمل التنظيف.</li>
</ul>
<p>لا تعاني CloudFront Functions من هذه المشكلة. فهي تنتشر في ثوانٍ لأنها تعمل على مواقع حافة CloudFront نفسها، لا على بنية Lambda منفصلة.</p>
<h2 id="cloudfront-keyvaluestore">CloudFront KeyValueStore</h2>
<p><strong>KeyValueStore</strong> (ويُختصر KVS، وأصبح متاحًا للجميع في ديسمبر 2023) هو الرفيق التشغيلي لـ CloudFront Functions. وهو مخزن مفتاح-قيمة موزّع عالميًا ومنخفض زمن الاستجابة، تستطيع CloudFront Functions القراءة منه عبر <code>cf.kvs().get(key)</code>. وهو يحلّ مشكلتين تدفعانك لولا ذلك إلى Lambda@Edge:</p>
<ul>
<li><strong>بيانات أكبر من 10 KB.</strong> خرائط إعادة التوجيه، وملفات JSON لعلامات الميزات، وإعدادات التوجيه لكل مستأجر — أبقِ الدالة صغيرة وابحث عن البيانات في وقت التشغيل.</li>
<li><strong>بيانات تتغيّر باستقلال عن الدالة.</strong> تحديثات KVS لا تعيد نشر الدالة. يمكنك قلب علامة ميزة في KVS دون لمس توزيع CloudFront إطلاقًا.</li>
</ul>
<p>ولـ KVS أيضًا سطح تشغيلي معقول: فـ AWS CLI تدعمه دعمًا كاملًا (<code>aws cloudfront-keyvaluestore</code>)، والكتابات تنتشر عالميًا في ثوانٍ، والقراءات داخل الدالة أقل من مللي ثانية. فأي حالة استخدام لـ CloudFront Functions تكون فيها البيانات أكثر إثارة للاهتمام من المنطق، فارجع إلى KVS قبل أن ترجع إلى Lambda@Edge.</p>
<h2 id="ملخص-القيود">ملخّص القيود</h2>
<p>إليك كل قيد في جدول واحد للرجوع السريع:</p>
<table>
<thead>
<tr>
<th>القيد</th>
<th>CloudFront Functions</th>
<th>Lambda@Edge (المشاهد)</th>
<th>Lambda@Edge (الأصل)</th>
</tr>
</thead>
<tbody>
<tr>
<td>وقت التشغيل</td>
<td>JS (ES5.1 + ميزات مختارة من ES6–12)</td>
<td>Node.js / Python</td>
<td>Node.js / Python</td>
</tr>
<tr>
<td>أقصى مدة تنفيذ</td>
<td>أقل من مللي ثانية</td>
<td>5 ثوانٍ</td>
<td>30 ثانية</td>
</tr>
<tr>
<td>الذاكرة</td>
<td>2 MB</td>
<td>128 MB</td>
<td>حتى 10,240 MB</td>
</tr>
<tr>
<td>حجم الحزمة</td>
<td>10 KB</td>
<td>1 MB</td>
<td>50 MB</td>
</tr>
<tr>
<td>الوصول إلى الشبكة</td>
<td>لا</td>
<td>نعم</td>
<td>نعم</td>
</tr>
<tr>
<td>نظام الملفات</td>
<td>لا</td>
<td><code>/tmp</code> (512 MB)</td>
<td><code>/tmp</code> (512 MB)</td>
</tr>
<tr>
<td>متغيّرات البيئة</td>
<td>لا</td>
<td>لا</td>
<td>لا</td>
</tr>
<tr>
<td>الوصول إلى جسم الطلب</td>
<td>لا</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>موقع السجلات</td>
<td><code>us-east-1</code></td>
<td>أقرب منطقة</td>
<td>أقرب منطقة</td>
</tr>
<tr>
<td>سرعة النشر</td>
<td>ثوانٍ</td>
<td>دقائق</td>
<td>دقائق</td>
</tr>
</tbody>
</table>
<h2 id="سير-عمل-التصحيح">سير عمل التصحيح</h2>
<p>عندما لا تعمل دالة الحافة، اتبع هذا التسلسل:</p>
<ol>
<li><strong>اختبر محليًا أولًا.</strong> استخدم <code>aws cloudfront test-function</code> لـ CloudFront Functions. ولـ Lambda@Edge، استدعِ الدالة مباشرةً بحدث اختبار يطابق بنية أحداث CloudFront.</li>
<li><strong>افحص الارتباط.</strong> شغّل <code>aws cloudfront get-distribution-config --id E1A2B3C4D5E6F7 --region us-east-1 --output json</code> وتحقّق من أن ARN الدالة يظهر في السلوك ونوع الحدث الصحيحين.</li>
<li><strong>افحص منطقة CloudWatch الصحيحة.</strong> ولـ Lambda@Edge، افحص المنطقة الأقرب إلى المكان الذي تُجري منه طلبات الاختبار.</li>
<li><strong>افحص مقاييس CloudFront.</strong> في وحدة تحكم CloudWatch (في <code>us-east-1</code>)، انظر إلى مقاييس دالة CloudFront: عدد الاستدعاءات، ومعدّل الأخطاء، واستهلاك الحوسبة.</li>
<li><strong>افحص حالة التوزيع.</strong> إذا كان التوزيع لا يزال قيد النشر، فتغييراتك ليست مباشرة بعد. شغّل <code>aws cloudfront get-distribution --id E1A2B3C4D5E6F7 --region us-east-1 --output json</code> وافحص حقل <code>Status</code>. ينبغي أن يكون <code>Deployed</code> لا <code>InProgress</code>.</li>
</ol>
`,r={book:t,chapter:"aws",chapterTitle:n,slug:o,title:d,headings:e,html:s};export{t as book,a as chapter,n as chapterTitle,r as default,e as headings,s as html,o as slug,d as title};
