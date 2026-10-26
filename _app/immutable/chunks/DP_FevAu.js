const e="kinney",n="aws",o="نشر تطبيقات الويب على AWS",t="end-to-end-scratch-lab-api-exercise",d="المشروع الختامي: واجهة برمجية متكاملة من الطرف إلى الطرف لتطبيق Scratch Lab",a=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"مهمتك",text:"مهمتك"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"الخطوات-التفصيلية",text:"الخطوات التفصيلية"},{depth:3,id:"1-إنشاء-جدول-dynamodb",text:"1. إنشاء جدول DynamoDB"},{depth:3,id:"2-تخزين-مفتاح-واجهة-البحث-البرمجية",text:"2. تخزين مفتاح واجهة البحث البرمجية"},{depth:3,id:"3-تحديث-دور-تنفيذ-lambda",text:"3. تحديث دور تنفيذ Lambda"},{depth:3,id:"4-كتابة-معالج-lambda",text:"4. كتابة معالج Lambda"},{depth:3,id:"5-توصيل-مسارات-api-gateway",text:"5. توصيل مسارات API Gateway"},{depth:3,id:"6-إضافة-نطاق-مخصص-اختياري-لكنه-واقعي",text:"6. إضافة نطاق مخصص (اختياري لكنه واقعي)"},{depth:3,id:"7-النداء-من-الواجهة-الأمامية",text:"7. النداء من الواجهة الأمامية"},{depth:2,id:"نقاط-التحقق",text:"نقاط التحقق"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],c=`<p>لقد بنيت كل الأجزاء. حان الآن لبناء الواجهة الخلفية التي تتجمّع منها هذه الأجزاء.</p>
<p>هذا هو المشروع الختامي للجزء الثاني—النظير المقابل لـ<a href="https://stevekinney.com/courses/aws/static-site-deployment-exercise">تمرين: نشر موقع ثابت من الطرف إلى الطرف</a> الذي ختم الجزء الأول. بنهاية هذا التمرين، يجب أن يستطيع تطبيق المفكّرة <a href="https://github.com/stevekinney/scratch-lab">Scratch Lab</a> أن ينفّذ <code>fetch()</code> على واجهة برمجية حقيقية على نطاقك أنت، تصل إلى دالة Lambda حقيقية، تقرأ من جدول DynamoDB حقيقي وتكتب فيه، باستخدام بيانات اعتماد تُجلب من Parameter Store (أو Secrets Manager). كل طبقة تعرّفت عليها، مكدّسة فوق بعضها.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>كل خدمة بمفردها لعبة. أما حين تُوصَل ببعضها فإنها تصبح واجهة خلفية. السبب في أن الدورة تعلّم Lambda وAPI Gateway وDynamoDB وSecrets Manager كلًا على حدة هو أن الأجزاء المتحركة أسهل في التفكير فيها بمعزل عن غيرها—لكن شحن البرمجيات يعني جمعها معًا والتعايش مع الحواف الخشنة عند نقاط الالتحام. تلك هي المهارة التي يبنيها هذا المشروع الختامي.</p>
<p><img src="/arabic-cs-library/images/kinney/699d71bfcaf946d8.svg" alt="مخطط لسلسلة طلب الواجهة الخلفية كاملة: يستدعي المتصفح Route 53، ثم API Gateway، ثم Lambda التي تقرأ من DynamoDB وParameter Store وتكتب في CloudWatch."></p>
<h2 id="مهمتك">مهمتك</h2>
<p>ابنِ واجهة خلفية للملاحظات من أجل <a href="https://github.com/stevekinney/scratch-lab">Scratch Lab</a> تقوم بما يلي:</p>
<ul>
<li>تكشف خمسة مسارات عبر API Gateway HTTP API: <code>GET /notes</code> → إعادة كل الملاحظات الخاصة بالمستخدم المُوثَّق. <code>POST /notes</code> → إنشاء ملاحظة جديدة وإعادتها. <code>GET /notes/{noteId}</code> → إعادة ملاحظة واحدة. <code>PUT /notes/{noteId}</code> → تحديث ملاحظة وإعادتها. <code>DELETE /notes/{noteId}</code> → حذف ملاحظة.
<ul>
<li><code>GET /notes</code> → إعادة كل الملاحظات الخاصة بالمستخدم المُوثَّق.</li>
<li><code>POST /notes</code> → إنشاء ملاحظة جديدة وإعادتها.</li>
<li><code>GET /notes/{noteId}</code> → إعادة ملاحظة واحدة.</li>
<li><code>PUT /notes/{noteId}</code> → تحديث ملاحظة وإعادتها.</li>
<li><code>DELETE /notes/{noteId}</code> → حذف ملاحظة.</li>
</ul>
</li>
<li>تشغّل دالة Lambda واحدة (<code>scratch-lab-api</code>) خلف API Gateway، وتتعامل مع المسارات الخمسة كلها عبر فحص <code>event.requestContext.http</code>.</li>
<li>تحفظ الملاحظات في جدول DynamoDB (<code>scratch-lab-notes</code>) بمفتاح تقسيم <code>userId</code> ومفتاح ترتيب <code>noteId</code>.</li>
<li>تقرأ مفتاح <code>SEARCH_API_KEY</code> العائد لطرف ثالث من Parameter Store أو Secrets Manager عند البدء البارد لدالة Lambda وتخزّنه مؤقتًا في نطاق الوحدة (module scope).</li>
<li>تعيد استجابات صحيحة من حيث CORS حتى تستطيع واجهة Scratch Lab الأمامية (المقدَّمة من توزيع CloudFront الذي أنشأته في الجزء الأول) أن تنادي الواجهة البرمجية من المتصفح.</li>
</ul>
<p>يملك Scratch Lab بالفعل طبقة تخزين عبر واجهة برمجية مدمجة فيه. استنسخ المستودع، واضبط متغيّر البيئة <code>VITE_API_URL</code> على نقطة نهاية API Gateway الخاصة بك، وسينادي التطبيق واجهتك الخلفية تلقائيًا. ترسل الواجهة الأمامية ترويسة <code>x-notepad-user-id</code> مع كل طلب لتحديد هوية المستخدم.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<p>يجب أن تكون قد أكملت الجزء الأول (الموقع الثابت على CloudFront) وكل دروس الجزء الثاني حتى هذه النقطة. ينبغي أن يكون لديك بالفعل:</p>
<ul>
<li>نشر S3 + CloudFront من <a href="https://stevekinney.com/courses/aws/static-site-deployment-exercise">تمرين: نشر موقع ثابت من الطرف إلى الطرف</a>.</li>
<li>مشروع Lambda عامل من <a href="https://stevekinney.com/courses/aws/lambda-function-exercise">تمرين: بناء دالة Lambda ونشرها</a>.</li>
<li>HTTP API من <a href="https://stevekinney.com/courses/aws/api-gateway-lambda-exercise">تمرين: بناء واجهة برمجية باستخدام API Gateway وLambda</a>.</li>
<li>نمط جدول DynamoDB من <a href="https://stevekinney.com/courses/aws/dynamodb-lambda-exercise">تمرين: بناء واجهة برمجية للبيانات باستخدام DynamoDB</a>.</li>
<li>سرّ مخزَّن وقابل للقراءة من <a href="https://stevekinney.com/courses/aws/secrets-in-lambda-exercise">تمرين: تخزين سرّ واسترجاعه في Lambda</a>.</li>
</ul>
<p>لا شيء في هذا التمرين يقدّم خدمة لم تستخدمها من قبل. الهدف هو التوصيل، لا الاكتشاف.</p>
<h2 id="الخطوات-التفصيلية">الخطوات التفصيلية</h2>
<h3 id="1-إنشاء-جدول-dynamodb">1. إنشاء جدول DynamoDB</h3>
<p>أنشئ <code>scratch-lab-notes</code> بما يلي:</p>
<ul>
<li>مفتاح التقسيم: <code>userId</code> (String)</li>
<li>مفتاح الترتيب: <code>noteId</code> (String)</li>
<li>وضع الفوترة: عند الطلب (on-demand)</li>
</ul>
<p>عُد إلى <a href="https://stevekinney.com/courses/aws/dynamodb-tables-and-keys">الجداول ومفاتيح التقسيم ومفاتيح الترتيب</a> إن كانت صيغة أعلام <code>aws dynamodb create-table</code> غامضة عليك.</p>
<h3 id="2-تخزين-مفتاح-واجهة-البحث-البرمجية">2. تخزين مفتاح واجهة البحث البرمجية</h3>
<p>اختر واحدة من الخدمتين اللتين تعلمتهما:</p>
<ul>
<li><strong>Parameter Store</strong> على هيئة <code>SecureString</code> في المسار <code>/scratch-lab/production/search-api-key</code>، أو</li>
<li><strong>Secrets Manager</strong> في المسار <code>/scratch-lab/production/search-api-key</code>.</li>
</ul>
<p>استخدم ما تشعر معه براحة أكبر. درس <a href="https://stevekinney.com/courses/aws/parameter-store-vs-secrets-manager">Parameter Store مقابل Secrets Manager</a> هو شجرة القرار.</p>
<h3 id="3-تحديث-دور-تنفيذ-lambda">3. تحديث دور تنفيذ Lambda</h3>
<p>يحتاج دور التنفيذ الخاص بك إلى:</p>
<ul>
<li><code>dynamodb:GetItem</code> و<code>PutItem</code> و<code>DeleteItem</code> و<code>Query</code> على <code>scratch-lab-notes</code>.</li>
<li><code>ssm:GetParameter</code> (و<code>kms:Decrypt</code> إن استخدمت <code>SecureString</code> مع مفتاح يديره العميل) أو <code>secretsmanager:GetSecretValue</code>، بحسب المخزن الذي اخترته.</li>
<li><code>logs:CreateLogGroup</code> و<code>logs:CreateLogStream</code> و<code>logs:PutLogEvents</code> (وهي موجودة عادةً بالفعل من أساسيات دور تنفيذ Lambda).</li>
</ul>
<p>اجعل نطاق كل ARN لمورد محددًا للجدول أو المُعامل أو السرّ المعني. لا تستخدم <code>*</code>.</p>
<h3 id="4-كتابة-معالج-lambda">4. كتابة معالج Lambda</h3>
<p>على المعالج أن:</p>
<ul>
<li>يوجّه الطلبات بناءً على <code>event.requestContext.http.method</code> و<code>event.requestContext.http.path</code>. عبارة <code>switch</code> صغيرة على <code>\${method} \${routeKey}</code> تكفي تمامًا—لست بحاجة إلى إطار عمل للتوجيه.</li>
<li>يستخرج معرّف المستخدم من ترويسة <code>x-notepad-user-id</code>. يولّد Scratch Lab هذا المعرّف تلقائيًا ويرسله مع كل طلب.</li>
<li>يستخدم DynamoDB Document Client (<code>@aws-sdk/lib-dynamodb</code>) حتى لا تضطر إلى تحويل الأنواع يدويًا.</li>
<li>يحمّل مفتاح واجهة البحث البرمجية مرة واحدة لكل بدء بارد ويخزّنه في متغيّر على مستوى الوحدة. لا تعِد جلبه مع كل استدعاء.</li>
<li>يعيد ترويسات CORS مع كل استجابة (<code>Access-Control-Allow-Origin</code> و<code>Access-Control-Allow-Methods</code> و<code>Access-Control-Allow-Headers</code>).</li>
</ul>
<p>ثمة تفصيل يستحق أن تُحسنه: يجب أن يعيد <code>GET /notes</code> مصفوفة <code>Note[]</code> مسطّحة، لا كائنًا يغلّفها مثل <code>{ notes: [...] }</code>. تنادي واجهة Scratch Lab الأمامية <code>response.json()</code> وتتوقع المصفوفة مباشرة.</p>
<h3 id="5-توصيل-مسارات-api-gateway">5. توصيل مسارات API Gateway</h3>
<p>أنشئ خمسة مسارات على HTTP API الموجود لديك، ويكون <code>scratch-lab-api</code> هدف التكامل مع Lambda في كل منها:</p>
<pre><code>GET    /notes
POST   /notes
GET    /notes/{noteId}
PUT    /notes/{noteId}
DELETE /notes/{noteId}
</code></pre>
<p>فعّل CORS على الواجهة البرمجية مع نطاق CloudFront الخاص بك كأصل مسموح. تأكد من أن الطرق المسموحة تتضمن <code>PUT</code> وأن الترويسات المسموحة تتضمن <code>x-notepad-user-id</code>. ثم انشر إلى مرحلتك.</p>
<h3 id="6-إضافة-نطاق-مخصص-اختياري-لكنه-واقعي">6. إضافة نطاق مخصص (اختياري لكنه واقعي)</h3>
<p>وجّه <code>api.example.com</code> إلى مرحلة API Gateway باستخدام النمط الوارد في <a href="https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains">المراحل والنشر والنطاقات المخصصة</a>. يتيح لك ذلك أن تنادي الواجهة الأمامية <code>fetch('https://api.example.com/notes')</code> بدلًا من عنوان <code>*.execute-api.amazonaws.com</code>.</p>
<h3 id="7-النداء-من-الواجهة-الأمامية">7. النداء من الواجهة الأمامية</h3>
<p>استنسخ <a href="https://github.com/stevekinney/scratch-lab">Scratch Lab</a> واضبط متغيّر البيئة <code>VITE_API_URL</code> على نقطة نهاية API Gateway الخاصة بك:</p>
<pre><code class="language-bash">VITE_API_URL=https://api.example.com npm run dev
</code></pre>
<p>يتحوّل التطبيق من localStorage إلى الواجهة الخلفية البرمجية تلقائيًا عند ضبط <code>VITE_API_URL</code>. أنشئ ملاحظة، وحرّرها، وتحقق من أن الرحلة الكاملة تعمل من الطرف إلى الطرف: المتصفح → Route 53 → API Gateway → Lambda → DynamoDB → الاستجابة → المتصفح.</p>
<h2 id="نقاط-التحقق">نقاط التحقق</h2>
<ul>
<li>طلب <code>POST /notes</code> بجسم JSON يحفظ عنصرًا جديدًا يمكنك رؤيته في وحدة تحكم DynamoDB.</li>
<li>يعيد <code>GET /notes</code> كل الملاحظات الخاصة بقيمة ترويسة <code>x-notepad-user-id</code> على هيئة مصفوفة JSON مسطّحة.</li>
<li>يعيد <code>GET /notes/{noteId}</code> ملاحظة واحدة أو استجابة 404.</li>
<li>يحدّث <code>PUT /notes/{noteId}</code> الحقول <code>title</code> و<code>body</code> و<code>updatedAt</code> في الملاحظة، ويعيد طلب GET لاحق القيم الجديدة.</li>
<li>يحذف <code>DELETE /notes/{noteId}</code> العنصر، ويعيد طلب GET لاحق استجابة 404.</li>
<li>تسجّل Lambda رسالة واحدة «loaded search api key» عند البدء البارد ولا تسجّل شيئًا في الاستدعاءات الدافئة. (أثبت أن التخزين المؤقت يعمل.)</li>
<li>يستطيع المتصفح نداء الواجهة البرمجية من أصل CloudFront الخاص بك دون خطأ CORS في طلب الفحص المسبق.</li>
<li>كل ARN لمورد في IAM على دور التنفيذ يشير إلى جدول أو مُعامل أو سرّ محدد، لا إلى <code>*</code>.</li>
</ul>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong><code>AccessDeniedException: User is not authorized to perform: dynamodb:...</code></strong> — دور التنفيذ تفتقده صلاحية DynamoDB أو أن ARN المورد لا يطابق ARN الجدول الفعلي. نفّذ <code>aws dynamodb describe-table --table-name scratch-lab-notes --query 'Table.TableArn'</code> وقارن.</li>
<li><strong>خطأ CORS في المتصفح، وLambda لا يسجّل أي وصول</strong> — طلب الفحص المسبق <code>OPTIONS</code> يفشل عند API Gateway، لا عند دالة Lambda. أصلح CORS على مستوى الواجهة البرمجية (وجّه <code>OPTIONS</code> أو فعّل CORS على الواجهة)، لا داخل المعالج.</li>
<li><strong>البدء البارد يستغرق 3 ثوانٍ أو أكثر</strong> — أنت تجلب السرّ وتتصل بـ DynamoDB داخل المعالج بدلًا من نطاق الوحدة. انقل الاثنين إلى <code>const</code> على مستوى الوحدة.</li>
<li><strong><code>ValidationException</code> عند الكتابة إلى DynamoDB</strong> — أنت تمرّر أنواع JavaScript الأصلية إلى عميل DynamoDB منخفض المستوى بدلًا من Document Client. انتقل إلى <code>@aws-sdk/lib-dynamodb</code>.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>مصادقة حقيقية.</strong> استبدل ترويسة <code>x-notepad-user-id</code> بمُوثِّق JWT على API Gateway، باستخدام مصدر رموز تُصدره مسبقًا. يغطي درس <a href="https://stevekinney.com/courses/aws/api-gateway-authentication">المصادقة باستخدام API Gateway</a> شكل ذلك.</li>
<li><strong>القابلية للملاحظة.</strong> أضف سجلات منظّمة من <a href="https://stevekinney.com/courses/aws/cloudwatch-log-groups-and-structured-logging">مجموعات السجلات وتدفقاتها والتسجيل المنظّم</a> مع <code>awsRequestId</code> في كل سطر سجل، ثم إنذارًا من <a href="https://stevekinney.com/courses/aws/cloudwatch-alarms-and-sns">الإنذارات والإشعارات باستخدام SNS</a> على معدل استجابات 5xx.</li>
<li><strong>البحث من جهة الخادم.</strong> ترسل واجهة Scratch Lab الأمامية بالفعل مُعامل الاستعلام <code>?search=</code> مع <code>GET /notes</code>. نفّذه في معالج Lambda باستخدام <code>Scan</code> من DynamoDB مع <code>FilterExpression</code> يفحص <code>contains(title, :q) OR contains(body, :q)</code>. هذا مقبول في النطاقات الصغيرة—وإن أزعجك، فذلك بالضبط هو الوقت الذي تلجأ فيه إلى OpenSearch.</li>
</ul>
<p>حين يعمل كل شيء، تكون قد حصلت على واجهة خلفية حقيقية على AWS بمقاس الإنتاج—كل خدمة من الجزء الثاني موصولة في مسار طلب واحد. وهذا هو مغزى الدورة بأكملها.</p>
`,s={book:e,chapter:"aws",chapterTitle:o,slug:t,title:d,headings:a,html:c};export{e as book,n as chapter,o as chapterTitle,s as default,a as headings,c as html,t as slug,d as title};
