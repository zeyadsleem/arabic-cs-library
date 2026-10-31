const e="kinney",c="aws",t="نشر تطبيقات الويب على AWS",o="secrets-in-lambda-exercise",n="تمرين: تخزين سرّ واسترجاعه في Lambda",a=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"مهمتك",text:"مهمتك"},{depth:2,id:"تخزين-السر-في-parameter-store",text:"تخزين السرّ في Parameter Store"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"كتابة-معالج-lambda",text:"كتابة معالج Lambda"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقق"},{depth:2,id:"تحديث-دور-التنفيذ",text:"تحديث دور التنفيذ"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقق"},{depth:2,id:"النشر-والاستدعاء",text:"النشر والاستدعاء"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقق"},{depth:2,id:"الاختبار-عبر-api-gateway",text:"الاختبار عبر API Gateway"},{depth:3,id:"نقطة-تحقق-4",text:"نقطة تحقق"},{depth:2,id:"التحقق-من-أن-السر-ليس-في-متغيرات-البيئة",text:"التحقق من أن السرّ ليس في متغيّرات البيئة"},{depth:3,id:"نقطة-تحقق-5",text:"نقطة تحقق"},{depth:2,id:"ملخص-نقاط-التحقق",text:"ملخص نقاط التحقق"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],d=`<p>ستخزّن سرًّا في Parameter Store، وتكتب دالة Lambda تقرأه عند بدء التشغيل، وتمنح دور تنفيذ الدالة الصلاحيات المناسبة، وتتحقق من أن السلسلة كاملة تعمل عبر API Gateway.</p>
<p>هذا هو سير العمل نفسه الذي ستستخدمه في الإنتاج لإبقاء مفاتيح API بعيدة عن متغيّرات البيئة وعن شيفرة المصدر.</p>
<p>إن أردت نسخة AWS من سير عمل تخزين الأسرار مفتوحة أمامك أثناء العمل، فأبقِ <a href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html">نظرة عامة على AWS Secrets Manager</a> و<a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html">وثائق Parameter Store</a> قريبين منك.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>على Vercel، الأسرار هي متغيّرات بيئة—تضبطها في لوحة التحكم وتثق بالمنصّة. أما على AWS، فأنت تختار أين تعيش الأسرار ومن يستطيع الوصول إليها. وهذا الخيار له عواقب: فالسرّ الموجود في متغيّر بيئة Lambda مرئي لأي شخص يستطيع وصف الدالة. أما السرّ في Parameter Store فمشفَّر بـ KMS، ومحدَّد النطاق بـ IAM، ومُدقَّق في CloudTrail. يجعل هذا التمرين ذلك الفرق ملموسًا.</p>
<h2 id="مهمتك">مهمتك</h2>
<ol>
<li>خزّن مفتاح API لطرف ثالث في Parameter Store على هيئة SecureString</li>
<li>اكتب دالة Lambda تقرأ السرّ عند التهيئة وتستخدمه في الاستجابات</li>
<li>امنح دور تنفيذ الدالة صلاحية قراءة المُعامل وفك تشفيره</li>
<li>استدعِ الدالة وتحقق من قدرتها على الوصول إلى السرّ</li>
<li>نادِ الدالة عبر API Gateway من متصفح أو من <code>curl</code></li>
</ol>
<p>استخدم معرّف الحساب <code>123456789012</code>، والمنطقة <code>us-east-1</code>، وبيئة التشغيل <code>nodejs22.x</code>.</p>
<h2 id="تخزين-السر-في-parameter-store">تخزين السرّ في Parameter Store</h2>
<p>أنشئ مُعامل SecureString في المسار <code>/my-frontend-app/production/third-party-api-key</code>. استخدم أي قيمة تريدها للسرّ—شيء مثل <code>sk_test_exercise_abc123</code> كافٍ.</p>
<p>استخدم <code>aws ssm put-parameter</code> مع:</p>
<ul>
<li><code>--name</code> مضبوطًا على المسار الكامل</li>
<li><code>--value</code> مضبوطًا على مفتاح API التجريبي الخاص بك</li>
<li><code>--type</code> مضبوطًا على <code>SecureString</code></li>
<li><code>--region us-east-1</code></li>
</ul>
<p>بعد إنشائه، تحقّق من وجود المُعامل باسترجاعه بـ<code>aws ssm get-parameter</code>. واحرص على تضمين العلم الذي يفكّ تشفير القيمة—فبدونه سترى نصًا مشفّرًا بدلًا من مفتاحك.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p><code>aws ssm get-parameter --name &quot;/my-frontend-app/production/third-party-api-key&quot; --with-decryption --region us-east-1 --output json</code> يعيد مُعاملك مع القيمة مفكوكة التشفير.</p>
<h2 id="كتابة-معالج-lambda">كتابة معالج Lambda</h2>
<p>أنشئ مشروع Lambda (أو أعد استخدام المشروع من <a href="https://stevekinney.com/courses/aws/lambda-function-exercise">تمرين دالة Lambda</a>) بالاعتماديات التالية:</p>
<pre><code class="language-bash">npm install @aws-sdk/client-ssm
npm install -D typescript @types/aws-lambda @types/node
</code></pre>
<p>اكتب معالجًا في <code>src/handler.ts</code> يقوم بما يلي:</p>
<ol>
<li>يستورد <code>SSMClient</code> و<code>GetParameterCommand</code> من <code>@aws-sdk/client-ssm</code></li>
<li>ينشئ عميل SSM على مستوى الوحدة</li>
<li>يعلن متغيّرًا على مستوى الوحدة لمفتاح API المخزّن مؤقتًا</li>
<li>يعرّف دالة غير متزامنة <code>loadConfig</code> تجلب المُعامل (مع فك التشفير) وتخزّنه مؤقتًا—لكنها تتخطى الجلب إن كانت القيمة مخزّنة بالفعل</li>
<li>ينادي <code>loadConfig()</code> في أعلى المعالج</li>
<li>يعيد استجابة JSON تحتوي على <code>message</code> وعلى أول 7 أحرف من مفتاح API (لإثبات أن الدالة تستطيع قراءته دون كشف القيمة كاملة)</li>
</ol>
<p>استخدم النوع <code>APIGatewayProxyHandlerV2</code> للمعالج.</p>
<p>ابنِ المشروع وتحقّق من أنه يُترجَم بلا أخطاء.</p>
<h3 id="نقطة-تحقق-1">نقطة تحقق</h3>
<p>تشغيل <code>npm run build</code> ينتج <code>dist/handler.js</code> دون أخطاء TypeScript.</p>
<h2 id="تحديث-دور-التنفيذ">تحديث دور التنفيذ</h2>
<p>يحتاج دور تنفيذ Lambda الخاص بك (<code>my-frontend-app-lambda-role</code>) إلى صلاحيتين جديدتين:</p>
<ol>
<li><strong><code>ssm:GetParameter</code></strong> على ARN المُعامل المحدد. تذكّر: ARN المُعامل المسمّى <code>/my-frontend-app/production/third-party-api-key</code> هو <code>arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/third-party-api-key</code>. لاحظ أن المسار في ARN لا يضاعف الشرطة المائلة الأولى.</li>
<li><strong><code>kms:Decrypt</code></strong> على مفتاح KMS الذي تديره AWS لخدمة SSM، حتى تستطيع الدالة فك تشفير قيمة SecureString.</li>
</ol>
<p>اكتب ملف JSON للسياسة وأرفقه بدور التنفيذ باستخدام <code>aws iam put-role-policy</code> (سياسة مضمّنة) أو <code>aws iam create-policy</code> متبوعًا بـ<code>aws iam attach-role-policy</code> (سياسة مُدارة). في هذا التمرين، فضّل النهج <strong>المضمّن</strong>—فالسياسة خاصة بهذا الدور وحده ولا تحتاج إلى مشاركتها، وهذا يطابق النمط المستخدم في <a href="https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions">أدوار وصلاحيات تنفيذ Lambda</a>. أما السياسات المُدارة فهي الخيار الصحيح عندما تُعاد السياسة نفسها عبر أدوار متعددة.</p>
<p>تحقّق من إرفاق السياسة بسرد سياسات الدور.</p>
<h3 id="نقطة-تحقق-2">نقطة تحقق</h3>
<p>لدور التنفيذ سياسة تمنح <code>ssm:GetParameter</code> على ARN المُعامل المحدد و<code>kms:Decrypt</code> على مفتاح KMS.</p>
<h2 id="النشر-والاستدعاء">النشر والاستدعاء</h2>
<p>حزّم دالة Lambda وانشرها:</p>
<ol>
<li>ابنِ مشروع TypeScript</li>
<li>اضغط محتويات مجلد <code>dist/</code> (مع <code>node_modules/</code>—احزم <code>@aws-sdk/client-ssm</code> رغم أن بيئة التشغيل تتضمنه، حتى تتحكم في نسخة SDK الدقيقة بدلًا من الاعتماد على ما تثبّته AWS في بيئة التشغيل)</li>
<li>أنشئ دالة Lambda أو حدّثها</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن كان لديك بالفعل دالة باسم <code>my-frontend-app-api</code> من تمرين سابق، فاستخدم <code>aws lambda update-function-code</code> بدلًا من <code>create-function</code>.</p>
</blockquote>
<p>استدعِ الدالة بحدث اختبار:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --payload <span class="hljs-string">&#x27;{&quot;requestContext&quot;:{&quot;http&quot;:{&quot;method&quot;:&quot;GET&quot;,&quot;path&quot;:&quot;/secret&quot;}},&quot;queryStringParameters&quot;:{}}&#x27;</span> \\
  --cli-binary-format raw-in-base64-out \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>اقرأ ملف الاستجابة وتحقّق من أن الدالة أعادت أول 7 أحرف من مفتاح API الخاص بك.</p>
<h3 id="نقطة-تحقق-3">نقطة تحقق</h3>
<p>يحتوي ملف الاستجابة على رمز حالة 200 وجسم يحمل رسالة تؤكد تحميل السرّ. وتطابق بادئة المفتاح أول 7 أحرف من القيمة التي خزّنتها.</p>
<h2 id="الاختبار-عبر-api-gateway">الاختبار عبر API Gateway</h2>
<p>إن كانت لديك واجهة HTTP API في API Gateway من <a href="https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda">توصيل API Gateway بـ Lambda</a>، فأضف مسارًا يشير إلى هذه الدالة—أو استدعِ نقطة النهاية الموجودة إن كانت الدالة موصولة بالفعل.</p>
<p>وإن لم يكن لديك API Gateway مُعدّ، فيمكنك الاختبار باستدعاء سطر الأوامر من القسم السابق. وتكامل API Gateway هدف إضافي.</p>
<h3 id="نقطة-تحقق-4">نقطة تحقق</h3>
<p>طلب <code>curl</code> إلى نقطة نهاية API Gateway يعيد استجابة JSON وقد حُمّل السرّ بنجاح.</p>
<h2 id="التحقق-من-أن-السر-ليس-في-متغيرات-البيئة">التحقق من أن السرّ ليس في متغيّرات البيئة</h2>
<p>شغّل <code>get-function-configuration</code> وتأكد من أن مفتاح API <strong>ليس</strong> ضمن متغيّرات البيئة:</p>
<pre><code class="language-bash">aws lambda get-function-configuration \\
  --function-name my-frontend-app-api \\
  --query <span class="hljs-string">&#x27;Environment.Variables&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن يُظهر الناتج إعدادك غير الحساس (مثل <code>TABLE_NAME</code>) دون مفتاح API. فمفتاح API يعيش في Parameter Store، ولا يمكن الوصول إليه إلا عبر SDK بصلاحيات IAM مناسبة.</p>
<h3 id="نقطة-تحقق-5">نقطة تحقق</h3>
<p>متغيّرات بيئة الدالة لا تحتوي على مفتاح API. فالمفتاح موجود في Parameter Store فقط.</p>
<h2 id="ملخص-نقاط-التحقق">ملخص نقاط التحقق</h2>
<ul>
<li>مُعامل SecureString موجود في <code>/my-frontend-app/production/third-party-api-key</code></li>
<li><code>aws ssm get-parameter</code> مع <code>--with-decryption</code> يعيد القيمة الصحيحة</li>
<li>معالج Lambda يُترجَم ويقرأ المُعامل باستخدام <code>SSMClient</code></li>
<li>دور التنفيذ لديه صلاحيتا <code>ssm:GetParameter</code> و<code>kms:Decrypt</code></li>
<li>استدعاء الدالة يعيد أول 7 أحرف من مفتاح API</li>
<li>مفتاح API <strong>لا</strong> يظهر في متغيّرات بيئة الدالة</li>
</ul>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong>المعالج يرمي خطأ وصول عند قراءة المُعامل:</strong> دور التنفيذ تفتقده إما <code>ssm:GetParameter</code> لمسار المُعامل أو <code>kms:Decrypt</code> للمفتاح الذي يحمي SecureString.</li>
<li><strong>النشر ينجح لكن الدالة تعيد <code>undefined</code> أو قيمة قديمة:</strong> اسم المُعامل في الشيفرة لا يطابق المسار المخزّن، أو أنك حدّثت المُعامل لكنك لم تعِد نشر الشيفرة التي تشير إليه.</li>
<li><strong>السرّ لا يزال يظهر في إعداد الدالة:</strong> لقد أصلحت مسار الجلب لكنك أبقيت متغيّر البيئة القديم في مكانه. أزل السرّ من إعداد Lambda كليًا حتى يكون Parameter Store المصدر الوحيد للحقيقة.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>جلب عدة مُعاملات باستخدام <code>GetParametersByPath</code>.</strong> خزّن مُعاملًا ثانيًا في <code>/my-frontend-app/production/api-endpoint</code> على هيئة <code>String</code> عادي. عدّل المعالج ليستخدم <code>GetParametersByPathCommand</code> لتحميل كل المُعاملات تحت <code>/my-frontend-app/production/</code> في استدعاء واحد. تحقّق من ظهور القيمتين في الاستجابة.</li>
<li><strong>أضف مدة صلاحية للتخزين المؤقت.</strong> عدّل دالة <code>loadConfig</code> لتعيد جلب المُعامل بعد 5 دقائق بدلًا من تخزينه مؤقتًا إلى ما لا نهاية. اختبر ذلك بتحديث قيمة المُعامل في Parameter Store ثم استدعاء الدالة بعد انتهاء مدة الصلاحية.</li>
<li><strong>جرّب امتداد Lambda.</strong> أضف طبقة AWS Parameters and Secrets Lambda Extension إلى دالتك. عدّل المعالج ليجلب المُعامل عبر <code>http://localhost:2773</code> بدلًا من SDK. قارن مدة البدء البارد مع الامتداد وبدونه.</li>
</ul>
<p>حين تكون جاهزًا، تحقّق من عملك مقابل <a href="https://stevekinney.com/courses/aws/secrets-in-lambda-solution">الحل: تخزين سرّ واسترجاعه في Lambda</a>.</p>
`,r={book:e,chapter:"aws",chapterTitle:t,slug:o,title:n,headings:a,html:d};export{e as book,c as chapter,t as chapterTitle,r as default,a as headings,d as html,o as slug,n as title};
