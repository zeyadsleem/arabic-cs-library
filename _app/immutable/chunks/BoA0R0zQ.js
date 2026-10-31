const e="kinney",t="aws",o="نشر تطبيقات الويب على AWS",n="lambda-function-exercise",a="تمرين: بناء دالة Lambda ونشرها",d=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"مهمتك",text:"مهمّتك"},{depth:2,id:"إعداد-المشروع",text:"إعداد المشروع"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"كتابة-المعالج",text:"كتابة المعالج"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-دور-التنفيذ",text:"إنشاء دور التنفيذ"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقّق"},{depth:2,id:"التضمين-والنشر",text:"التضمين والنشر"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقّق"},{depth:2,id:"استدعاء-الدالة",text:"استدعاء الدالة"},{depth:3,id:"نقطة-تحقق-4",text:"نقطة تحقّق"},{depth:2,id:"الاستدعاء-دون-معامل-اسم",text:"الاستدعاء دون معامل اسم"},{depth:3,id:"نقطة-تحقق-5",text:"نقطة تحقّق"},{depth:2,id:"قراءة-السجلات",text:"قراءة السجلات"},{depth:3,id:"نقطة-تحقق-6",text:"نقطة تحقّق"},{depth:2,id:"ملخص-نقاط-التحقق",text:"ملخّص نقاط التحقّق"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],c=`<p>ستبني دالة Lambda وتنشرها من الصفر—بلا معالجات إعداد في وحدة التحكّم، وبلا أطر عمل، وبلا تجريدات. وبحلول نهاية هذا التمرين، سيكون لديك دالة TypeScript تعمل في AWS يمكنك استدعاؤها من سطر الأوامر وقراءة سجلاتها في CloudWatch.</p>
<p>هذا هو سير العمل نفسه الذي ستستخدمه لكل دالة Lambda تنشرها في بقية الدورة. فاعتد عليه الآن.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن بدت مخرجات وحدة التحكّم أو سطر الأوامر مختلفة قليلًا عند تنفيذك، فأبقِ <a href="https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html">مرجع الأمر <code>aws lambda create-function</code></a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html">مرجع الأمر <code>aws lambda update-function-code</code></a> مفتوحين.</p>
</blockquote>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>على Vercel، يعني نشر دالة بلا خادم دفع الشيفرة إلى Git وانتظار المنصّة لتتدبّر الباقي. أما على AWS، فأنت تملك كل خطوة: كتابة المعالج، وإنشاء دور التنفيذ، وتضمين الشيفرة، ونشرها، والتحقّق من أنها تعمل. يبدو هذا عملًا إضافيًا—وهو كذلك—لكنه يعني أنك تفهم بالضبط ما الذي يعمل، وبأي أذونات، وأين تنظر حين ينكسر شيء.</p>
<h2 id="مهمتك">مهمّتك</h2>
<p>ابنِ دالة Lambda باسم <code>my-frontend-app-api</code> وانشرها، بحيث:</p>
<ul>
<li>تقبل طلب GET مع معامل استعلام اختياري <code>name</code></li>
<li>تُرجع استجابة JSON تحتوي تحية وطابعًا زمنيًا</li>
<li>تعمل بدور تنفيذ محدّد النطاق بشكل صحيح (أذونات التسجيل فقط)</li>
<li>يمكن استدعاؤها من سطر الأوامر بحدث اختبار</li>
</ul>
<p>استخدم معرّف الحساب <code>123456789012</code>، والمنطقة <code>us-east-1</code>، وبيئة التشغيل <code>nodejs22.x</code>.</p>
<h2 id="إعداد-المشروع">إعداد المشروع</h2>
<p>أنشئ بنية المشروع:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p lambda/src
<span class="hljs-built_in">cd</span> lambda
npm init -y
npm install -D typescript @types/aws-lambda @types/node
</code></pre>
<p>أنشئ <code>tsconfig.json</code> في دليل <code>lambda/</code> بهدف وحدة <code>commonjs</code>، وهدف <code>ES2022</code>، والوضع الصارم مُفعّلًا، والمخرجات إلى <code>dist/</code>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>أصبح لديك دليل <code>lambda/</code> يحتوي <code>package.json</code> و<code>tsconfig.json</code> و<code>node_modules/</code> ودليل <code>src/</code> فارغ.</p>
<h2 id="كتابة-المعالج">كتابة المعالج</h2>
<p>أنشئ <code>src/handler.ts</code> بمعالج يقوم بما يلي:</p>
<ol>
<li>يستخدم النوع <code>APIGatewayProxyHandlerV2</code> من <code>@types/aws-lambda</code></li>
<li>يقرأ معامل الاستعلام <code>name</code> من الحدث، بقيمة افتراضية <code>&quot;World&quot;</code></li>
<li>يُرجع استجابة 200 مع <code>Content-Type: application/json</code></li>
<li>ينبغي أن يكون جسم الاستجابة كائن JSON يحتوي <code>greeting</code> (سلسلة مثل <code>&quot;Hello, World!&quot;</code>) و<code>timestamp</code> (سلسلة تاريخ بصيغة ISO 8601)</li>
</ol>
<p>أضف سكربت بناء إلى <code>package.json</code> يشغّل <code>tsc</code>، ثم ابنِ المشروع.</p>
<h3 id="نقطة-تحقق-1">نقطة تحقّق</h3>
<p>تشغيل <code>npm run build</code> يُنتج <code>dist/handler.js</code> بلا أخطاء TypeScript.</p>
<h2 id="إنشاء-دور-التنفيذ">إنشاء دور التنفيذ</h2>
<p>أنشئ ملف سياسة ثقة (<code>trust-policy.json</code>) يسمح لخدمة Lambda (<code>lambda.amazonaws.com</code>) بافتراض الدور.</p>
<p>استخدم سطر الأوامر من أجل:</p>
<ol>
<li>إنشاء دور باسم <code>my-frontend-app-lambda-role</code> بسياسة الثقة تلك</li>
<li>إرفاق السياسة المُدارة <code>AWSLambdaBasicExecutionRole</code> بالدور</li>
</ol>
<p>تذكّر:</p>
<ul>
<li>تحتاج سياسة الثقة إلى <code>sts:AssumeRole</code> كإجراء و<code>lambda.amazonaws.com</code> كأصل</li>
<li>ARN الخاص بالسياسة المُدارة هو <code>arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole</code></li>
<li>لقد غطّيت العلاقة بين الأدوار وسياسات الثقة وسياسات الأذونات في <a href="https://stevekinney.com/courses/aws/iam-mental-model">النموذج الذهني لـIAM</a> و<a href="https://stevekinney.com/courses/aws/writing-your-first-iam-policy">كتابة أول سياسة IAM لك</a></li>
</ul>
<h3 id="نقطة-تحقق-2">نقطة تحقّق</h3>
<p>يعيد <code>aws iam get-role --role-name my-frontend-app-lambda-role</code> الدور بسياسة الثقة الصحيحة. ويعرض <code>aws iam list-attached-role-policies --role-name my-frontend-app-lambda-role</code> السياسة <code>AWSLambdaBasicExecutionRole</code>.</p>
<h2 id="التضمين-والنشر">التضمين والنشر</h2>
<p>أنشئ ملف zip الخاص بالنشر من المخرجات المُصرّفة:</p>
<ol>
<li>انتقل إلى دليل <code>dist/</code></li>
<li>اضغط المحتويات (لا الدليل نفسه)</li>
<li>استخدم <code>aws lambda create-function</code> مع اسم الدالة وبيئة التشغيل وARN الدور ومسار المعالج وملف zip و<code>--architectures arm64</code></li>
</ol>
<p>ينبغي أن يكون مسار المعالج <code>handler.handler</code>—فكلمة <code>handler</code> الأولى هي اسم الملف (بدون <code>.js</code>)، والثانية هي اسم الدالة المُصدَّرة.</p>
<h3 id="نقطة-تحقق-3">نقطة تحقّق</h3>
<p>يعيد <code>aws lambda get-function --function-name my-frontend-app-api --region us-east-1</code> تهيئة الدالة عارضًا <code>nodejs22.x</code> كبيئة تشغيل وARN دور التنفيذ لديك.</p>
<h2 id="استدعاء-الدالة">استدعاء الدالة</h2>
<p>أنشئ ملف حدث اختبار (<code>test-event.json</code>) يحاكي طلب GET مع معامل الاستعلام <code>name=Lambda</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/greeting&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Lambda&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استدعِ الدالة باستخدام سطر الأوامر واقرأ ملف الاستجابة.</p>
<h3 id="نقطة-تحقق-4">نقطة تحقّق</h3>
<p>يحتوي ملف الاستجابة على كائن JSON فيه <code>statusCode: 200</code> وجسم يتضمّن، عند تحليله، <code>greeting: &quot;Hello, Lambda!&quot;</code> و<code>timestamp</code> صالحًا.</p>
<h2 id="الاستدعاء-دون-معامل-اسم">الاستدعاء دون معامل اسم</h2>
<p>أنشئ حدث اختبار ثانيًا بلا <code>queryStringParameters</code> (أو احذف الحقل كليًا) واستدعِ الدالة مرة أخرى.</p>
<h3 id="نقطة-تحقق-5">نقطة تحقّق</h3>
<p>تتضمّن الاستجابة <code>greeting: &quot;Hello, World!&quot;</code>—أي أن قيمتك الافتراضية تعمل بشكل صحيح.</p>
<h2 id="قراءة-السجلات">قراءة السجلات</h2>
<p>بعد استدعاء الدالة، تحقّق من أن السجلات تتدفق إلى CloudWatch. وتأكّد من وجود مجموعة السجلات <code>/aws/lambda/my-frontend-app-api</code>:</p>
<pre><code class="language-bash">aws logs describe-log-groups \\
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="نقطة-تحقق-6">نقطة تحقّق</h3>
<p>مجموعة السجلات موجودة وتحتوي على تدفّق سجلات واحد على الأقل مع أحداث من استدعاءاتك.</p>
<h2 id="ملخص-نقاط-التحقق">ملخّص نقاط التحقّق</h2>
<ul>
<li>مشروع <code>lambda/</code> يُبنى بـ<code>npm run build</code> ويُنتج <code>dist/handler.js</code></li>
<li>دور IAM باسم <code>my-frontend-app-lambda-role</code> موجود بسياسة الثقة الصحيحة</li>
<li>السياسة <code>AWSLambdaBasicExecutionRole</code> مُرفقة بالدور</li>
<li>دالة <code>my-frontend-app-api</code> منشورة ببيئة تشغيل <code>nodejs22.x</code> ومعمارية <code>arm64</code></li>
<li>الاستدعاء بـ<code>name=Lambda</code> يعيد <code>&quot;Hello, Lambda!&quot;</code></li>
<li>الاستدعاء دون اسم يعيد <code>&quot;Hello, World!&quot;</code></li>
<li>مجموعة سجلات CloudWatch <code>/aws/lambda/my-frontend-app-api</code> موجودة ولديها أحداث سجل</li>
</ul>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong>يفشل <code>create-function</code> لأن Lambda لا تستطيع افتراض الدور:</strong> سياسة الثقة خاطئة. يجب أن يثق الدور بأصل الخدمة <code>lambda.amazonaws.com</code>.</li>
<li><strong>يفشل الاستدعاء بخطأ <code>Runtime.ImportModuleError</code> أو <code>Cannot find module</code>:</strong> بنية ملف zip خاطئة، أو مسار المعالج لا يطابق الملف المنشور، أو أن <code>dist/handler.js</code> لم يُبنَ قبل التضمين.</li>
<li><strong>تعمل الدالة لكن لا تظهر سجلات في CloudWatch:</strong> دور التنفيذ يفتقد <code>AWSLambdaBasicExecutionRole</code>، أو أنك فحصت السجلات قبل أن يُنشئ أول استدعاء ناجح التدفّق.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف متغيّر بيئة.</strong> اضبط متغيّر بيئة <code>GREETING_PREFIX</code> (مثل <code>&quot;Howdy&quot;</code>) واستخدمه في معالجك بدلًا من تثبيت <code>&quot;Hello&quot;</code> في الشيفرة. تحقّق من التغيير باستدعاء الدالة وفحص الاستجابة.</li>
<li><strong>افحص مدة البدء البارد.</strong> استدعِ الدالة مع <code>--log-type Tail</code> وفكّ ترميز مخرجات السجل بصيغة base64. وابحث عن حقل <code>Init Duration</code>. ثم استدعِها مرة أخرى وتأكّد من أن الاستدعاء الثاني لا يحتوي <code>Init Duration</code>—فهو بدء دافئ. هذا من الأمور التي تكون رؤيتها بنفسك أكثر إشباعًا بكثير من القراءة عنها.</li>
<li><strong>قِس حجم حزمة النشر.</strong> افحص حجم <code>function.zip</code>. جرّب إضافة اعتمادية (مثل <code>lodash</code>) لترى كيف يتغيّر حجم ملف zip. ثم أزلها—فأنت لا تحتاجها، وإبقاء الحزمة صغيرة يهمّ لأداء البدء البارد.</li>
</ul>
<p>حين تصبح جاهزًا، قارن عملك بـ<a href="https://stevekinney.com/courses/aws/lambda-function-solution">الحل: بناء دالة Lambda ونشرها</a>.</p>
`,s={book:e,chapter:"aws",chapterTitle:o,slug:n,title:a,headings:d,html:c};export{e as book,t as chapter,o as chapterTitle,s as default,d as headings,c as html,n as slug,a as title};
