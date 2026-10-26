const e="kinney",r="aws",t="نشر تطبيقات الويب على AWS",n="whats-next-services-youll-eventually-need",o="ما التالي: خدمات ستحتاجها في النهاية",a=[{depth:2,id:"amplify",text:"Amplify"},{depth:2,id:"cognito",text:"Cognito"},{depth:2,id:"step-functions",text:"Step Functions"},{depth:2,id:"eventbridge",text:"EventBridge"},{depth:2,id:"sqs",text:"SQS"},{depth:2,id:"ecs-وfargate",text:"ECS وFargate"},{depth:2,id:"waf",text:"WAF"},{depth:2,id:"متى-تعود-إلى-vercel-أو-amplify",text:"متى تعود إلى Vercel أو Amplify"},{depth:2,id:"كلمة-عن-الخدمات-التي-لا-تحتاجها-بعد",text:"كلمة عن الخدمات التي لا تحتاجها بعد"},{depth:2,id:"قائمة-التحقق-النهائية-للتفكيك",text:"قائمة التحقق النهائية للتفكيك"}],s=`<p>أنت تعرف الآن كيف تنشر واجهة أمامية ثابتة باستخدام S3 وCloudFront، وتشغّل دوالًا بلا خادم باستخدام Lambda، وتعرض واجهات برمجية عبر API Gateway، وتخزّن البيانات في DynamoDB، وتدير الأسرار باستخدام Secrets Manager وParameter Store، وتراقب كل ذلك بـ CloudWatch. هذه مكدّس حقيقي، ويمكنك بناء تطبيقات إنتاجية وشحنها بما تعلّمته بالضبط.</p>
<p>إذا أردت النسخة الرسمية من AWS لخدمات هذه الجولة، فابدأ بـ<a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html">دليل مطوّر Amazon ECS</a> و<a href="https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html">دليل مطوّر AWS WAF</a>.</p>
<p>لكن AWS لديها أكثر من 200 خدمة، وسيحتاج تطبيقك في مرحلة ما إلى شيء ليس في عدّتك الحالية. هذا الدرس خريطة للخدمات التي يُرجَّح أن تلجأ إليها بعد ذلك — ليس درسًا تعليميًا، بل سياق كافٍ لتعرف ما تفعله كل خدمة ومتى تصبح ذات صلة.</p>
<h2 id="amplify">Amplify</h2>
<p><strong>AWS Amplify</strong> منصة مُدارة لتطبيقات الويب والجوال كاملة المكدّس. فكّر فيها كردّ AWS على Vercel أو Netlify — فهي تتولى الاستضافة والتكامل المستمر والنشر الآلي وتهيئة الخلفية عبر واجهة واحدة.</p>
<p><strong>متى تلجأ إليها:</strong> عندما تريد تجربة المطوّر التي تمنحها Vercel (نشر بدفع Git، وبيئات معاينة، واستضافة مُدارة) لكن على بنية AWS التحتية. تدعم Amplify أُطر Next.js وNuxt وAstro وغيرها مع التصيير من جهة الخادم، وتهيّئ موارد الخلفية (المصادقة وواجهات API والتخزين) عبر سير عمل CLI.</p>
<p><strong>لماذا لم تستخدمها في هذه الدورة:</strong> تُجرّد Amplify الخدمات التي أمضيت 12 وحدة في تعلّمها. وهذا التجريد قيّم عندما تريد السرعة، لكن هذه الدورة كانت عن فهم ما يحدث تحت السطح. والآن بعد أن تعرف ما تفعله Amplify خلف الكواليس — S3 وCloudFront وLambda وAPI Gateway وDynamoDB — يمكنك استخدامها بثقة مستنيرة بدلًا من ثقة عمياء.</p>
<h2 id="cognito">Cognito</h2>
<p>تقدّم <strong>Amazon Cognito</strong> مصادقة المستخدمين وتفويضهم. فهي تتولى التسجيل وتسجيل الدخول وإعادة تعيين كلمات المرور والمصادقة متعددة العوامل وتسجيل الدخول الاجتماعي (Google وApple وFacebook) دون أن تبني أيًا من تلك البنية التحتية بنفسك.</p>
<p><strong>متى تلجأ إليها:</strong> عندما يحتاج تطبيقك إلى حسابات مستخدمين. لقد أعددت مُفاوِضات JWT أو مُفاوِضات Lambda في <a href="https://stevekinney.com/courses/aws/api-gateway-authentication">مصادقة API Gateway</a> — وCognito هي ما يولّد تلك الرموز JWT. وهي تمنحك واجهة تسجيل دخول مُستضافة، ومجموعات مستخدمين لإدارة الهويات، وتكاملًا مباشرًا مع API Gateway وLambda.</p>
<p><strong>من زاوية الواجهة الأمامية:</strong> توفّر Cognito حزمة SDK لـ JavaScript (<code>amazon-cognito-identity-js</code> ومكتبة Amplify Auth الأحدث) تتولى تدفق المصادقة كله من تطبيق React لديك. فتستدعي دالة، ويرى المستخدم نموذج تسجيل دخول، وتحصل بالمقابل على رموز يتحقق منها مُفاوِض API Gateway لديك. بلا خادم مصادقة تبنيه أو تصونه.</p>
<h2 id="step-functions">Step Functions</h2>
<p><strong>AWS Step Functions</strong> خدمة تنسيق بلا خادم. فهي تتيح لك ربط عدة دوال Lambda (وخدمات AWS أخرى) في تدفقات عمل فيها تفرّع وإعادة محاولة ومعالجة أخطاء وتنفيذ متوازٍ.</p>
<p><strong>متى تلجأ إليها:</strong> عندما يتجاوز منطق خلفيتك دالة Lambda واحدة. فبدلًا من دالة واحدة تعالج إرسال نموذج وترسل بريدًا إلكترونيًا وتحدّث قاعدة بيانات وتولّد ملف PDF، تقسّم العمل إلى خطوات — كل خطوة دالة Lambda، وStep Functions تدير التدفق بينها. وإن فشلت الخطوة الثالثة، تعيد Step Functions محاولتها دون إعادة تشغيل الخطوتين الأولى والثانية.</p>
<p><strong>النموذج الذهني:</strong> إذا كانت Lambda استدعاء دالة واحدًا، فـ Step Functions هي <code>async/await</code> مع <code>try/catch</code> لسلسلة من استدعاءات الدوال — إلا أن التنسيق يعمل على بنية AWS التحتية لا في كودك.</p>
<h2 id="eventbridge">EventBridge</h2>
<p><strong>Amazon EventBridge</strong> ناقل أحداث بلا خادم. فهو يوجّه الأحداث بين خدمات AWS وتطبيقات SaaS الخارجية وكودك المخصّص بناءً على قواعد تحدّدها.</p>
<p><strong>متى تلجأ إليه:</strong> عندما يحتاج تطبيقك إلى التفاعل مع أشياء تحدث في حساب AWS لديك دون اقتران محكم. يرفع مستخدم ملفًا إلى S3، وتريد تغيير حجمه بـ Lambda. يتغيّر عنصر في DynamoDB، وتريد إرسال إشعار. تُطلق خدمة خارجية (Stripe أو Shopify أو Auth0) خطاف ويب، وتريد معالجته. يفصل EventBridge بين «حدث شيء ما» و«افعل شيئًا بشأنه».</p>
<p><strong>لماذا يهمّ ذلك:</strong> بدون EventBridge، تنتهي إلى دوال Lambda تستدعي دوال Lambda أخرى، فتصنع تشابكًا من الاستدعاءات المباشرة يصعب تصحيحه ويصعب تغييره أكثر. أما EventBridge فيمنحك طبقة توجيه مركزية يمكنك فيها إضافة معالجات الأحداث أو إزالتها أو تعديلها دون لمس المنتجين.</p>
<h2 id="sqs">SQS</h2>
<p><strong>Amazon Simple Queue Service (SQS)</strong> طابور رسائل مُدار. تضع الرسائل فيه، ويسحبها المستهلكون، وتضمن SQS أن كل رسالة تُعالَج مرة واحدة على الأقل.</p>
<p><strong>متى تلجأ إليها:</strong> عندما تتلقى دالة Lambda دفعة من الطلبات وتحتاج إلى معالجتها بموثوقية دون فقدان أي منها. فبدلًا من أن يؤدي معالج API عملًا شاقًا بشكل متزامن (فيجعل المستخدم ينتظر)، يضع رسالة في طابور SQS ويعود فورًا. وتستقصي دالة Lambda منفصلة الطابور وتعالج الرسائل بوتيرتها. وإن انهار المعالج، تعود الرسالة إلى الطابور وتُعاد محاولتها.</p>
<p><strong>من زاوية الواجهة الأمامية:</strong> SQS هي ما يجعل استجابات «تلقّينا طلبك وسنعالجه قريبًا» ممكنة. فكلما احتاجت واجهتك البرمجية إلى عمل أكثر مما تستطيع إنجازه في زمن استجابة معقول، كان الطابور هو الجواب.</p>
<h2 id="ecs-وfargate">ECS وFargate</h2>
<p><strong>Amazon Elastic Container Service (ECS)</strong> تشغّل حاويات Docker. و<strong>Fargate</strong> نوع الإطلاق بلا خادم في ECS — فأنت تعرّف حاويتك، وFargate تتولى الخوادم والتوسّع والجدولة.</p>
<p><strong>متى تلجأ إليها:</strong> عندما لا تناسبك Lambda. ربما يعمل عبء عملك أطول من 15 دقيقة (وهو الحد الأقصى في Lambda). وربما تحتاج إلى اتصال WebSocket دائم. وربما تشغّل خدمة لم تُصمَّم لنموذج الطلب والاستجابة — عامل خلفية، أو عملية طويلة الأمد، أو خدمة تحتاج إلى حفظ الحالة في الذاكرة. وتتيح لك Fargate تشغيل حاوية دون إدارة مثيلات EC2.</p>
<p><strong>كيف ترتبط بما تعرفه:</strong> فكّر في Fargate كـ«Lambda للحاويات». فأنت لا تدير الخوادم، وتدفع مقابل ما تستخدمه (تقريبًا). لكن بدلًا من كتابة دالة معالج، تحزم تطبيقك كصورة Docker وتترك ECS تشغّله.</p>
<h2 id="waf">WAF</h2>
<p><strong>AWS Web Application Firewall (WAF)</strong> ترشّح حركة الويب الخبيثة قبل أن تصل إلى تطبيقك. فهي تحمي من الهجمات الشائعة مثل حقن SQL والبرمجة النصية عبر المواقع (XSS) ومحاولات حجب الخدمة الموزعة.</p>
<p><strong>متى تلجأ إليها:</strong> عندما يكون تطبيقك متاحًا للعموم وتريد حماية تتجاوز ما توفّره CloudFront افتراضيًا. تتكامل WAF مباشرة مع CloudFront وAPI Gateway، فتتيح لك تعريف قواعد تحجب الطلبات المشبوهة بناءً على عناوين IP أو أنماط الطلبات أو الموقع الجغرافي أو تحديد المعدّل.</p>
<p><strong>النسخة العملية:</strong> WAF هي الخدمة التي تتيح لك أن تقول «احجب أي عنوان IP يرسل أكثر من 1000 طلب في الدقيقة» أو «احجب الطلبات التي تحتوي أنماط حقن SQL في سلسلة الاستعلام». ويمكنك استخدام مجموعات القواعد المُدارة من AWS (مجموعات قواعد جاهزة تصونها AWS) للحمايات الشائعة دون كتابة قواعد مخصّصة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن كنت تستخدم خطة السعر الثابت من الطبقة المجانية لـ CloudFront، فإن حماية WAF الأساسية مشمولة بلا تكلفة إضافية. أما القواعد المخصّصة التي تتجاوز المجموعة المُدارة، فتحاسب عليها WAF لكل قاعدة ولكل مليون طلب يُقيَّم.</p>
</blockquote>
<h2 id="متى-تعود-إلى-vercel-أو-amplify">متى تعود إلى Vercel أو Amplify</h2>
<p>هذه الدورة عن فهم ما يحدث تحت السطح، لا حكم بأن AWS الخام هي الخيار الصحيح دائمًا. والآن بعد أن بنيت الشيء، إليك الحالات التي يكون فيها العودة إلى التجريد أفضل حقًا:</p>
<ul>
<li><strong>عمليات نشر المعاينة لكل طلب سحب تهمّ أكثر من التحكم الدقيق.</strong> فعناوين URL للمعاينة لكل فرع في Vercel، مع مكدّس التصيير من جهة الخادم كاملًا وموصولًا تلقائيًا، مضاعِف إنتاجية يصعب حقًا تكراره على AWS الخام دون كتابة الكثير من الغراء في التكامل المستمر.</li>
<li><strong>أنت تبني Next.js بكثافة على التصيير من جهة الخادم.</strong> فـ Next.js على Vercel هو التطبيق المرجعي. أما على AWS الخام فأنت تجمّعه بـ Lambda@Edge أو Fargate وستصرف وقتًا غير هين على الوصلات. ومنتج Hosting في Amplify يسدّ جزءًا من هذه الفجوة.</li>
<li><strong>تحتاج إلى صفر موظفين للبنية التحتية.</strong> تسعير Vercel أعلى عند التوسّع، لكن إن كان البديل هو توظيف شخص لتشغيل CloudFront وS3 وLambda والمراقبة، فـ Vercel أرخص.</li>
<li><strong>التخصيص المعتمد على الحافة جوهري في المنتج.</strong> فوقت تشغيل الحافة وEdge Middleware في Vercel تجربة مطوّر أنظف من Lambda@Edge مع دوال CloudFront، وهما المكافئ التقريبي على AWS الخام.</li>
</ul>
<p>اتجه مباشرة إلى AWS عندما:</p>
<ul>
<li><strong>تكون على AWS أصلًا لأسباب أخرى.</strong> فمنصة بيانات على RDS أو خلفية أعمال على ECS تجعل «استخدم AWS للواجهة الأمامية أيضًا» الجواب الأبسط.</li>
<li><strong>تحكم الامتثال أو إقامة البيانات أو تحسين التكلفة عند التوسّع القرار.</strong> فعند 100 ألف دولار شهريًا أو أكثر، تتراكم ميزة التكلفة في AWS الخام.</li>
<li><strong>تريد تحكمًا صريحًا في نموذج التخزين المؤقت والتوجيه.</strong> فتجريدات Vercel ذات موقف، أما AWS فمجموعة أوليات.</li>
</ul>
<p>المسارَان مشروعان. والمهارات من هذه الدورة هي ما يتيح لك اتخاذ القرار بناءً على الأدلة لا على الانطباعات.</p>
<h2 id="كلمة-عن-الخدمات-التي-لا-تحتاجها-بعد">كلمة عن الخدمات التي لا تحتاجها بعد</h2>
<p>لدى AWS خدمات للتعلّم الآلي، ومحطات استقبال الأقمار الصناعية، والحوسبة الكمومية، وإدارة أجهزة إنترنت الأشياء. ولا تحتاج أيًا منها لتطبيق واجهة أمامية. والقائمة أعلاه تغطي الخدمات التي سيصادفها أولًا مهندس واجهة أمامية يبني تطبيقات ويب بعد الأساس الذي توفّره هذه الدورة.</p>
<p>ونمط تعلّم خدمات AWS الجديدة هو النمط نفسه الذي اتبعته هنا: افهم المشكلة التي تحلّها الخدمة، وابنِ شيئًا صغيرًا بها، ووصّلها بمكدّسك الحالي، ثم اقرأ الوثائق وعندك سياق كافٍ لتعرف ما يهمّ وما يمكنك تجاوزه. وهذا الجزء الأخير هو المفتاح — أجد وثائق AWS <em>أسهل بكثير</em> في القراءة بعد أن يصبح لديك نموذج ذهني لكيفية ترابط القطع.</p>
<p>لديك الآن ذلك السياق. فأنت تفهم سياسات IAM جيدًا بما يكفي لمنح خدمة جديدة الأذونات التي تحتاجها، وتفهم CloudWatch جيدًا بما يكفي لتصحيح أعطالها، وتفهم API Gateway جيدًا بما يكفي لوضعها أمام أي خلفية تبنيها. وهذه الأساسيات تنتقل إلى كل خدمة جديدة تتبنّاها.</p>
<p>كان أصعب جزء في AWS هو البداية — فهم نموذج الحساب، وفكّ رموز IAM، والتنقل في لوحة التحكم، وبناء خط أنابيب النشر الأول. لقد أنجزت كل ذلك. وكل ما يأتي من هنا تراكمي: خدمة جديدة واحدة في كل مرة، موصولة ببنية تفهمها بالفعل. أنت تعرف كيف تترابط القطع، والباقي مجرد إضافة قطع أكثر.</p>
<h2 id="قائمة-التحقق-النهائية-للتفكيك">قائمة التحقق النهائية للتفكيك</h2>
<p>إن كنت قد بنيت مع الدورة وتريد تفكيك كل ما أنشأته، فاعمل عبر هذه القائمة. وكل قسم أدناه يربط بالدرس الذي فيه أوامر التفكيك الكاملة — فهذه قائمة تحقق، لا نسخة ثانية من الأوامر نفسها.</p>
<p>الموارد مرتّبة بترتيب الاعتماد العكسي (فكّك ما يعتمد على غيره أولًا):</p>
<p><strong>CloudFront وDNS</strong></p>
<ul>
<li>احذف توزيع CloudFront (عطّله أولًا، ثم احذفه بعد 10–15 دقيقة). راجع <a href="https://stevekinney.com/courses/aws/cloudfront-distribution-exercise">تمرين توزيع CloudFront</a>.</li>
<li>أزل سجل Alias في Route 53 الذي يشير إلى CloudFront. راجع <a href="https://stevekinney.com/courses/aws/route-53-dns-exercise">تمرين DNS في Route 53</a>.</li>
<li>احذف المنطقة المُستضافة. راجع <a href="https://stevekinney.com/courses/aws/hosted-zones-and-record-types">المناطق المُستضافة وأنواع السجلات</a>.</li>
<li>احذف شهادة ACM (فقط بعد حذف التوزيع — فلن تُحرّر CloudFront الشهادة وهي قيد الاستخدام). راجع <a href="https://stevekinney.com/courses/aws/acm-certificate-exercise">تمرين شهادة ACM</a>.</li>
</ul>
<p><strong>API Gateway</strong></p>
<ul>
<li>احذف HTTP API. <code>aws apigatewayv2 delete-api --api-id your-api-id --region us-east-1</code></li>
</ul>
<p><strong>Lambda</strong></p>
<ul>
<li>احذف دالة Lambda. <code>aws lambda delete-function --function-name my-frontend-app-api --region us-east-1</code></li>
<li>احذف مجموعة سجلات CloudWatch (تعيد Lambda إنشاءها عند النشر). <code>aws logs delete-log-group --log-group-name /aws/lambda/my-frontend-app-api --region us-east-1</code></li>
</ul>
<p><strong>DynamoDB</strong></p>
<ul>
<li>احذف الجدول. راجع <a href="https://stevekinney.com/courses/aws/dynamodb-lambda-solution">الحل: بناء واجهة API للبيانات مدعومة بـ Lambda مع DynamoDB</a> — ففيه قسم للتنظيف في الأسفل.</li>
</ul>
<p><strong>الأسرار والإعدادات</strong></p>
<ul>
<li>احذف معاملات Parameter Store. راجع <a href="https://stevekinney.com/courses/aws/parameter-store-hierarchical-configuration">Parameter Store: إعدادات هرمية</a> و<a href="https://stevekinney.com/courses/aws/secrets-in-lambda-solution">الحل: تخزين سرّ واسترداده في Lambda</a>. فتمرين الأسرار في الدورة يستخدم Parameter Store فقط — وإن كنت قد تابعت <a href="https://stevekinney.com/courses/aws/parameter-store-vs-secrets-manager">Parameter Store مقابل Secrets Manager</a> وأنشأت سرًّا حقيقيًا في Secrets Manager للمقارنة، فاحذفه بـ <code>aws secretsmanager delete-secret --secret-id &lt;name&gt; --force-delete-without-recovery</code> (للأسرار التجريبية فقط).</li>
</ul>
<p><strong>مراقبة CloudWatch</strong></p>
<ul>
<li>احذف إنذارات CloudWatch. راجع <a href="https://stevekinney.com/courses/aws/cloudwatch-alarms-solution">الحل: إعداد إنذارات لدوال Lambda</a>.</li>
<li>ألغِ الاشتراك في موضوع SNS واحذفه. راجع ملف الحل نفسه.</li>
<li>احذف لوحة معلومات CloudWatch. راجع <a href="https://stevekinney.com/courses/aws/cloudwatch-metrics-and-dashboards">مقاييس CloudWatch ولوحات المعلومات</a>.</li>
</ul>
<p><strong>S3</strong></p>
<ul>
<li>أفرغ حاوية S3 ثم احذفها. <code>aws s3 rm s3://your-bucket-name --recursive &amp;&amp; aws s3api delete-bucket --bucket your-bucket-name --region us-east-1</code></li>
</ul>
<p><strong>IAM</strong></p>
<p>لا تسمح لك IAM بحذف دور إلى أن تفصل كل سياسة مُدارة مُرفقة <em>و</em>تزيل كل سياسة مضمنة. ودور تنفيذ Lambda يراكم عدة سياسات من هذه على مدى الدورة — تناولها بالترتيب قبل أمر <code>delete-role</code> النهائي:</p>
<ul>
<li>افصل سياسة DynamoDB المُدارة واحذفها. <code>aws iam detach-role-policy --role-name my-frontend-app-lambda-role --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB &amp;&amp; aws iam delete-policy --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB</code></li>
<li>افصل دور التنفيذ الأساسي المُدار من AWS. <code>aws iam detach-role-policy --role-name my-frontend-app-lambda-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole</code> (لا تحاول تنفيذ <code>delete-policy</code> على هذه — فهي مملوكة لـ AWS.)</li>
<li>احذف السياسة المضمنة <code>parameter-store-access</code> التي أضيفت في تمرين الأسرار. <code>aws iam delete-role-policy --role-name my-frontend-app-lambda-role --policy-name parameter-store-access</code></li>
<li>اعرض ما تبقّى للتأكد من أن الدور خالٍ قبل الحذف. <code>aws iam list-attached-role-policies --role-name my-frontend-app-lambda-role</code> و<code>aws iam list-role-policies --role-name my-frontend-app-lambda-role</code> — ويجب أن تُرجعا كلتاهما مصفوفتين فارغتين.</li>
<li>احذف دور تنفيذ Lambda. <code>aws iam delete-role --role-name my-frontend-app-lambda-role</code></li>
<li>فكّك مستخدم IAM <code>deploy-bot</code>: عطّل مفتاح الوصول، وافصل <code>DeployBotPolicy</code>، واحذف المفتاح، ثم احذف المستخدم. راجع <a href="https://stevekinney.com/courses/aws/iam-policy-exercise">تمرين: سياسة IAM لبوت نشر</a> لتسلسل الأوامر الكامل — فقواعد الترتيب في IAM تهمّ هنا.</li>
</ul>
<p><strong>الفوترة</strong></p>
<ul>
<li>احذف ميزانية AWS. راجع <a href="https://stevekinney.com/courses/aws/cost-monitoring-and-budget-alarms">مراقبة التكلفة وإنذارات الميزانية</a>.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>بعد التفكيك، شغّل <code>aws s3 ls</code> و<code>aws dynamodb list-tables --region us-east-1</code> و<code>aws lambda list-functions --region us-east-1</code> لتتأكد أن شيئًا لم يبقَ خلفك. فالموارد المنسية هي أكثر مصادر الفواتير المفاجئة شيوعًا.</p>
</blockquote>
`,l={book:e,chapter:"aws",chapterTitle:t,slug:n,title:o,headings:a,html:s};export{e as book,r as chapter,t as chapterTitle,l as default,a as headings,s as html,n as slug,o as title};
