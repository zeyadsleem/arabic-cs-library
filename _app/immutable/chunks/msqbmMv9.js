const n="kinney",d="aws",s="نشر تطبيقات الويب على AWS",a="dynamodb-lambda-exercise",t="تمرين: بناء واجهة API للبيانات باستخدام DynamoDB",o=[{depth:2,id:"لماذا-يهم-ذلك",text:"لماذا يهم ذلك"},{depth:2,id:"مهمتك",text:"مهمتك"},{depth:2,id:"إنشاء-جدول-dynamodb",text:"إنشاء جدول DynamoDB"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"إضافة-أذونات-dynamodb-إلى-دور-lambda",text:"إضافة أذونات DynamoDB إلى دور Lambda"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"تثبيت-sdk-وتحديث-المعالج",text:"تثبيت SDK وتحديث المعالج"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"تعيين-متغير-البيئة-والنشر",text:"تعيين متغير البيئة والنشر"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اختبار-إنشاء-عنصر",text:"اختبار إنشاء عنصر"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اختبار-سرد-العناصر",text:"اختبار سرد العناصر"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اختبار-حذف-عنصر",text:"اختبار حذف عنصر"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اختبار-حالات-الخطأ",text:"اختبار حالات الخطأ"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"ملخص-نقاط-التحقق",text:"ملخص نقاط التحقق"},{depth:2,id:"تشخيص-الفشل",text:"تشخيص الفشل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],e=`<p>ستبني واجهة API بيانات كاملة مدعومة بـ DynamoDB. بحلول نهاية هذا التمرين، ستكون لديك نقطة نهاية عاملة يمكن لواجهتك الأمامية استدعاؤها لإنشاء العناصر وسردها وحذفها، مع تخزين البيانات في جدول DynamoDB وتقديمها عبر البنية نفسها من Lambda وAPI Gateway التي أعددتها سابقًا في الدورة.</p>
<p>هذا هو التمرين الذي يتحول فيه «الموقع الثابت» إلى «تطبيق متكامل». وهو محطتي المفضلة في هذه الدورة كلها.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت أن تُبقي نسخة AWS من سلوك الجدول والاستعلام مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/cli/latest/reference/dynamodb/create-table.html">مرجع أمر <code>aws dynamodb create-table</code></a>، و<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html">دليل DynamoDB Query</a>، و<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html">دليل DynamoDB Scan</a> قريبة منك.</p>
</blockquote>
<h2 id="لماذا-يهم-ذلك">لماذا يهم ذلك</h2>
<p>على Vercel أو Netlify، قد تستخدم قاعدة بيانات مستضافة مثل PlanetScale أو Supabase وتستدعيها من دالة بلا خادم. على AWS، تبني المكافئ — لكنك تملك كل قطعة. الجدول، والدالة، وطبقة HTTP، والأذونات. عندما يتعطل شيء، تعرف بالضبط أين تنظر. وعندما يكلفك شيء مالًا، تعرف بالضبط السبب.</p>
<h2 id="مهمتك">مهمتك</h2>
<p>ابنِ واجهة API بيانات:</p>
<ul>
<li>تخزّن العناصر في جدول DynamoDB باسم <code>my-frontend-app-data</code></li>
<li>تدعم GET (سرد العناصر لمستخدم) وPOST (إنشاء عنصر) وDELETE (حذف عنصر)</li>
<li>تعمل كدالة Lambda بالأذونات الصحيحة لـ DynamoDB</li>
<li>تُرجع رموز حالة HTTP واستجابات JSON مناسبة</li>
</ul>
<p>استخدم معرّف الحساب <code>123456789012</code>، والمنطقة <code>us-east-1</code>، وأسماء الجدول والدور من أعراف الدورة.</p>
<h2 id="إنشاء-جدول-dynamodb">إنشاء جدول DynamoDB</h2>
<p>أنشئ جدول <code>my-frontend-app-data</code> بـ:</p>
<ul>
<li><strong>مفتاح تقسيم</strong> باسم <code>userId</code> (سلسلة نصية)</li>
<li><strong>مفتاح فرز</strong> باسم <code>itemId</code> (سلسلة نصية)</li>
<li><strong>فوترة عند الطلب</strong> (<code>PAY_PER_REQUEST</code>)</li>
</ul>
<p>استخدم CLI لإنشاء الجدول وانتظر حتى يصبح نشطًا.</p>
<p>في وحدة التحكم، تعرض قائمة <strong>Tables</strong> حالة الجدول على أنها <strong>Active</strong> بمجرد اكتمال التهيئة.</p>
<p><img src="/arabic-cs-library/images/kinney/6cfa6c9fcac2fdb3.webp" alt="قائمة جداول DynamoDB تعرض جدول frontend-items بالحالة Active."></p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>تشغيل <code>aws dynamodb describe-table --table-name my-frontend-app-data --region us-east-1 --output json --query &quot;Table.TableStatus&quot;</code> يُرجع <code>&quot;ACTIVE&quot;</code>.</p>
<h2 id="إضافة-أذونات-dynamodb-إلى-دور-lambda">إضافة أذونات DynamoDB إلى دور Lambda</h2>
<p>دور تنفيذ Lambda لديك (<code>my-frontend-app-lambda-role</code>) يملك حاليًا أذونات التسجيل فقط. أنشئ سياسة وأرفقها تمنح:</p>
<ul>
<li><code>dynamodb:GetItem</code></li>
<li><code>dynamodb:PutItem</code></li>
<li><code>dynamodb:DeleteItem</code></li>
<li><code>dynamodb:Query</code></li>
</ul>
<p>قيّد السياسة على ARN الجدول المحدد: <code>arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data</code>.</p>
<p>تذكّر مبدأ الامتياز الأدنى من <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ الامتياز الأدنى</a>—لا تمنح <code>dynamodb:*</code> ولا تستخدم <code>*</code> كمورد.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p><code>aws iam list-attached-role-policies --role-name my-frontend-app-lambda-role --region us-east-1 --output json</code> يعرض كلا من <code>AWSLambdaBasicExecutionRole</code> وسياستك الجديدة لـ DynamoDB.</p>
<h2 id="تثبيت-sdk-وتحديث-المعالج">تثبيت SDK وتحديث المعالج</h2>
<p>أضف حزم SDK الخاصة بـ DynamoDB إلى مشروع Lambda لديك:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
</code></pre>
<p>حدّث <code>src/handler.ts</code> ليقوم بما يلي:</p>
<ol>
<li>إنشاء <code>DynamoDBDocumentClient</code> على المستوى الأعلى (خارج دالة المعالج)</li>
<li>قراءة اسم الجدول من <code>process.env.TABLE_NAME</code>، مع الرجوع إلى <code>my-frontend-app-data</code></li>
<li>معالجة ثلاث طرق HTTP: <strong>GET</strong>: إذا تم توفير <code>itemId</code>، فأرجع ذلك العنصر الواحد (404 إذا لم يوجد). وإذا لم يوجد <code>itemId</code>، فاستعلم عن كل العناصر الخاصة بـ <code>userId</code> المعطى. <strong>POST</strong>: حلّل جسم الطلب بحثًا عن <code>title</code>، وأنشئ <code>itemId</code>، واكتب العنصر في DynamoDB. أرجع العنصر المنشأ بحالة 201. <strong>DELETE</strong>: احذف العنصر المحدد بـ <code>userId</code> و<code>itemId</code>. أرجع <code>{ &quot;deleted&quot;: true }</code>.</li>
</ol>
<ul>
<li><strong>GET</strong>: إذا تم توفير <code>itemId</code>، فأرجع ذلك العنصر الواحد (404 إذا لم يوجد). وإذا لم يوجد <code>itemId</code>، فاستعلم عن كل العناصر الخاصة بـ <code>userId</code> المعطى.</li>
<li><strong>POST</strong>: حلّل جسم الطلب بحثًا عن <code>title</code>، وأنشئ <code>itemId</code>، واكتب العنصر في DynamoDB. أرجع العنصر المنشأ بحالة 201.</li>
<li><strong>DELETE</strong>: احذف العنصر المحدد بـ <code>userId</code> و<code>itemId</code>. أرجع <code>{ &quot;deleted&quot;: true }</code>.</li>
</ul>
<ol start="4">
<li>إرجاع 400 للمعلمات المطلوبة المفقودة</li>
<li>إرجاع 405 لطرق HTTP غير المدعومة</li>
<li>التقاط الأخطاء وإرجاع 500 برسالة خطأ عامة</li>
</ol>
<p>ابنِ المشروع وتحقق من أنه يُصرّف دون أخطاء.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p><code>npm run build</code> يكتمل دون أخطاء TypeScript. و<code>dist/handler.js</code> موجود.</p>
<h2 id="تعيين-متغير-البيئة-والنشر">تعيين متغير البيئة والنشر</h2>
<p>عيّن متغير البيئة <code>TABLE_NAME</code> على دالة Lambda لديك:</p>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --environment <span class="hljs-string">&#x27;Variables={TABLE_NAME=my-frontend-app-data}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>حزّم وانشر شيفرة المعالج المحدثة.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p><code>aws lambda get-function-configuration --function-name my-frontend-app-api --region us-east-1 --output json --query &quot;Environment&quot;</code> يعرض <code>TABLE_NAME</code> مضبوطًا على <code>my-frontend-app-data</code>.</p>
<h2 id="اختبار-إنشاء-عنصر">اختبار إنشاء عنصر</h2>
<p>استدعِ الدالة بحدث POST:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;POST&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;title\\&quot;: \\&quot;Learn DynamoDB\\&quot;}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>احفظ هذا باسم <code>test-create.json</code> واستدعِ الدالة. تحقق من الاستجابة.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>تحتوي الاستجابة على <code>statusCode: 201</code> ويتضمن الجسم <code>userId</code> و<code>itemId</code> و<code>title</code> و<code>status</code> و<code>createdAt</code>.</p>
<h2 id="اختبار-سرد-العناصر">اختبار سرد العناصر</h2>
<p>أنشئ عنصرًا ثانيًا بعنوان مختلف (استخدم <code>userId</code> نفسه)، ثم استدعِ بحدث GET يتضمن <code>userId</code> فقط — دون <code>itemId</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>تحتوي الاستجابة على <code>statusCode: 200</code> ويتضمن الجسم مصفوفة <code>items</code> بالعنصرين اللذين أنشأتهما.</p>
<h2 id="اختبار-حذف-عنصر">اختبار حذف عنصر</h2>
<p>استخدم <code>itemId</code> من أحد العناصر التي أنشأتها. استدعِ بحدث DELETE:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DELETE&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;queryStringParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;userId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user-123&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;itemId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;item-1234567890&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استبدل <code>item-1234567890</code> بـ <code>itemId</code> الفعلي من إحدى استجابات POST لديك. ثم اسرد العناصر مجددًا عبر GET للتأكد من زوال العنصر.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>استجابة DELETE تحتوي على <code>statusCode: 200</code> و<code>{ &quot;deleted&quot;: true }</code>. واستجابة GET اللاحقة للمستخدم نفسه تعرض عنصرًا واحدًا فقط.</p>
<h2 id="اختبار-حالات-الخطأ">اختبار حالات الخطأ</h2>
<p>استدعِ الدالة مع فقدان المعامل <code>userId</code> وتأكد من حصولك على استجابة 400. واستدعِ بطريقة غير مدعومة (مثل PUT) وتأكد من حصولك على 405.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>فقدان <code>userId</code> يُرجع <code>statusCode: 400</code>. والطريقة غير المدعومة تُرجع <code>statusCode: 405</code>.</p>
<h2 id="ملخص-نقاط-التحقق">ملخص نقاط التحقق</h2>
<ul>
<li>جدول DynamoDB <code>my-frontend-app-data</code> موجود وحالته <code>ACTIVE</code></li>
<li>دور Lambda لديه <code>AWSLambdaBasicExecutionRole</code> وسياسة DynamoDB مرفقتان</li>
<li>المعالج يُصرّف دون أخطاء</li>
<li>متغير البيئة <code>TABLE_NAME</code> مضبوط على دالة Lambda</li>
<li>POST ينشئ عنصرًا ويُرجع 201</li>
<li>GET يسرد كل العناصر لمستخدم</li>
<li>DELETE يحذف عنصرًا</li>
<li>المعلمات المفقودة تُرجع 400</li>
<li>الطرق غير المدعومة تُرجع 405</li>
</ul>
<h2 id="تشخيص-الفشل">تشخيص الفشل</h2>
<ul>
<li><strong>يفشل استدعاء Lambda بـ <code>AccessDeniedException</code>:</strong> دور التنفيذ تفتقد أذونات DynamoDB، أو تشير السياسة إلى ARN جدول خاطئ.</li>
<li><strong>تحصل على أخطاء تحقق أو قراءات فارغة حتى بعد كتابة ناجحة:</strong> متغير البيئة <code>TABLE_NAME</code> أو أسماء مفاتيح التقسيم والفرز في شيفرتك لا تطابق مخطط الجدول الفعلي.</li>
<li><strong>DELETE ينجح لكن العنصر يظهر مجددًا في GET التالي:</strong> أعدت استخدام <code>itemId</code> خاطئ، أو لم يتضمن طلب الحذف مفتاح التقسيم <code>userId</code> نفسه للعنصر الأصلي.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>وصّلها عبر API Gateway.</strong> إذا أكملت تمرين API Gateway، فاربط دالتك بمسار HTTP API واستدعها من <code>curl</code> أو المتصفح بدل استخدام <code>aws lambda invoke</code>.</li>
<li><strong>أضف نقطة نهاية تحديث.</strong> تعامل مع طلبات PATCH التي تحدّث حقل <code>status</code> لعنصر موجود باستخدام <code>UpdateCommand</code> مع <code>UpdateExpression</code>. أرجع العنصر المحدّث بـ <code>ReturnValues: 'ALL_NEW'</code>.</li>
<li><strong>أضف ترقيم صفحات.</strong> عدّل معالج GET لقبول معامل استعلام <code>limit</code> وإرجاع قيمة <code>nextCursor</code>. ويمكن للعميل تمرير المؤشر مرة أخرى للحصول على الصفحة التالية من النتائج.</li>
</ul>
<p>عندما تكون جاهزًا، تحقق من عملك مقابل <a href="https://stevekinney.com/courses/aws/dynamodb-lambda-solution">الحل: بناء واجهة API للبيانات مدعومة بـ Lambda باستخدام DynamoDB</a>.</p>
`,c={book:n,chapter:"aws",chapterTitle:s,slug:a,title:t,headings:o,html:e};export{n as book,d as chapter,s as chapterTitle,c as default,o as headings,e as html,a as slug,t as title};
