const e="kinney",d="aws",a="نشر تطبيقات الويب على AWS",s="api-gateway-lambda-exercise",n="تمرين: بناء API باستخدام API Gateway وLambda",t=[{depth:2,id:"لماذا-يهم",text:"لماذا يهمّ"},{depth:2,id:"مهمتك",text:"مهمّتك"},{depth:2,id:"كتابة-معالج-lambda",text:"كتابة معالج Lambda"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"نشر-دالة-lambda",text:"نشر دالة Lambda"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-http-api",text:"إنشاء HTTP API"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-التكامل",text:"إنشاء التكامل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"إنشاء-المسارات",text:"إنشاء المسارات"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"منح-الإذن",text:"منح الإذن"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"تهيئة-cors",text:"تهيئة CORS"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"استدعاء-api-من-react",text:"استدعاء API من React"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"ملخص-نقاط-التحقق",text:"ملخّص نقاط التحقّق"},{depth:2,id:"تشخيص-الفشل",text:"تشخيص الفشل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],o=`<p>ستبني API كاملة من الصفر — HTTP API في API Gateway بمسارين، كل منهما موصول بدالة Lambda، مع إعداد CORS كي يستطيع تطبيق React استدعاءها. وبحلول نهاية هذا التمرين، سيكون لديك API عاملة تقبل طلبات GET وPOST وتُرجع استجابات JSON إلى واجهتك الأمامية.</p>
<p>يربط هذا التمرين كل شيء من قسمَي Lambda وAPI Gateway. ستكتب المعالج، وتنشر الدالة، وتنشئ API، وتوصل التكامل، وتستدعيها من المتصفّح.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت نسخة AWS من سير عمل المسارات والتكاملات وCORS مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html">توثيق HTTP APIs</a>، و<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html">دليل تكامل Lambda</a>، و<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html">دليل CORS في HTTP API</a> قريبًا منك.</p>
</blockquote>
<h2 id="لماذا-يهم">لماذا يهمّ</h2>
<p>على Vercel، إنشاء نقطة نهاية API يعني إسقاط ملف في دليل <code>api/</code>. وعلى AWS، تبني كل طبقة بنفسك: الحوسبة (Lambda)، وطبقة HTTP (API Gateway)، والتوجيه، والأذونات، وإعداد CORS. يبدو ذلك عملًا أكثر — وهو كذلك — لكن حين ينكسر شيء في الثانية صباحًا، تعرف تمامًا أين تنظر لأنك بنيت كل قطعة. هذا هو المقايضة.</p>
<h2 id="مهمتك">مهمّتك</h2>
<p>ابنِ وانشر API بنقطتَي نهاية:</p>
<ul>
<li><strong><code>GET /items</code></strong> — تُرجع مصفوفة JSON من العناصر</li>
<li><strong><code>POST /items</code></strong> — تقبل جسمًا بصيغة JSON فيه <code>name</code> و<code>price</code>، وتُرجع العنصر المنشأ مع <code>id</code> مولّد</li>
</ul>
<p>ثم استدعِ نقطتَي النهاية من تطبيق React يعمل على <code>localhost:3000</code> (أو <code>localhost:5173</code> إن كنت تستخدم Vite).</p>
<p>استخدم معرّف الحساب <code>123456789012</code>، والمنطقة <code>us-east-1</code>، واسم الدالة <code>my-frontend-app-api</code>، و<code>--output json</code> في كل الأوامر.</p>
<h2 id="كتابة-معالج-lambda">كتابة معالج Lambda</h2>
<p>أنشئ (أو حدّث) <code>lambda/src/handler.ts</code> بمعالج:</p>
<ol>
<li>يستخدم النوع <code>APIGatewayProxyHandlerV2</code></li>
<li>يقرأ <code>event.requestContext.http.method</code> للتمييز بين GET وPOST</li>
<li>لطلبات GET: يُرجع استجابة 200 بجسم JSON يحتوي مصفوفة <code>items</code> (اكتب 2-3 عناصر ثابتة، لكل منها حقول <code>id</code> و<code>name</code> و<code>price</code>)</li>
<li>لطلبات POST: يُحلّل <code>event.body</code> كـJSON، ويتحقّق من وجود <code>name</code> و<code>price</code>، ويولّد <code>id</code> باستخدام <code>crypto.randomUUID()</code>، ويُرجع استجابة 201 بالعنصر المنشأ</li>
<li>يُرجع استجابة 405 لأي طريقة HTTP أخرى</li>
</ol>
<p>ابنِ المشروع وأنشئ ملف zip الخاص بالنشر.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>ينجح <code>npm run build</code> دون أخطاء TypeScript. ويحتوي <code>lambda/function.zip</code> على المعالج المترجم.</p>
<h2 id="نشر-دالة-lambda">نشر دالة Lambda</h2>
<p>إذا كانت لديك بالفعل دالة <code>my-frontend-app-api</code> من تمرين Lambda، فحدّث شفرتها. وإن لم تكن، فأنشئ دالة جديدة بدور التنفيذ من <a href="https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions">أدوار وأذونات تنفيذ Lambda</a>.</p>
<p>لتحديث دالة موجودة:</p>
<pre><code class="language-bash">aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://lambda/function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>استدعِ الدالة مباشرةً بحدث اختبار GET وحدث اختبار POST. فحدث GET يُرجع 200 مع العناصر. وحدث POST يُرجع 201 مع العنصر المنشأ.</p>
<h2 id="إنشاء-http-api">إنشاء HTTP API</h2>
<p>أنشئ HTTP API باسم <code>my-frontend-app-api</code> ونوع بروتوكول <code>HTTP</code>.</p>
<p>احفظ <code>ApiId</code> من الاستجابة — ستحتاجه في كل أمر لاحق.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>يُرجع <code>aws apigatewayv2 get-api --api-id YOUR_API_ID --region us-east-1 --output json</code> واجهة API بالاسم ونوع البروتوكول الصحيحين.</p>
<h2 id="إنشاء-التكامل">إنشاء التكامل</h2>
<p>أنشئ تكامل وكيل Lambda يشير إلى دالتك:</p>
<ul>
<li>نوع التكامل: <code>AWS_PROXY</code></li>
<li>عنوان URI للتكامل: ARN دالة Lambda</li>
<li>إصدار صيغة الحمولة: <code>2.0</code></li>
</ul>
<p>احفظ <code>IntegrationId</code> من الاستجابة.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>يُظهر <code>aws apigatewayv2 get-integrations --api-id YOUR_API_ID --region us-east-1 --output json</code> تكاملًا واحدًا بنوع <code>AWS_PROXY</code> وARN الدالة الصحيح.</p>
<h2 id="إنشاء-المسارات">إنشاء المسارات</h2>
<p>أنشئ مسارين:</p>
<ol>
<li><code>GET /items</code> مستهدفًا تكاملك</li>
<li><code>POST /items</code> مستهدفًا التكامل نفسه</li>
</ol>
<p>تذكّر: قيمة <code>--target</code> هي <code>integrations/{IntegrationId}</code>، مع بادئة <code>integrations/</code>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>يُظهر <code>aws apigatewayv2 get-routes --api-id YOUR_API_ID --region us-east-1 --output json</code> المسارين بمفاتيح المسارات والأهداف الصحيحة.</p>
<h2 id="منح-الإذن">منح الإذن</h2>
<p>أضف سياسة قائمة على الموارد إلى دالة Lambda تسمح لـ API Gateway باستدعائها. استخدم <code>apigateway.amazonaws.com</code> كأصل، واضبط ARN المصدر على <code>arn:aws:execute-api:us-east-1:123456789012:YOUR_API_ID/*</code>.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<pre><code class="language-bash">curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/items
</code></pre>
<p>تُرجع استجابة 200 بمصفوفة العناصر. وإن حصلت على خطأ 500، فإذن Lambda مفقود.</p>
<h2 id="تهيئة-cors">تهيئة CORS</h2>
<p>حدّث API بإعداد CORS يسمح بـ:</p>
<ul>
<li>الأصول: <code>http://localhost:3000</code> و<code>http://localhost:5173</code></li>
<li>الطرق: <code>GET</code> و<code>POST</code></li>
<li>الترويسات: <code>Content-Type</code></li>
<li>أقصى عمر: <code>86400</code></li>
</ul>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>اختبر استجابة preflight:</p>
<pre><code class="language-bash">curl -i -X OPTIONS \\
  https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/items \\
  -H <span class="hljs-string">&quot;Origin: http://localhost:3000&quot;</span> \\
  -H <span class="hljs-string">&quot;Access-Control-Request-Method: POST&quot;</span> \\
  -H <span class="hljs-string">&quot;Access-Control-Request-Headers: Content-Type&quot;</span>
</code></pre>
<p>تتضمّن الاستجابة <code>access-control-allow-origin: http://localhost:3000</code> و<code>access-control-allow-methods</code> يحتوي <code>GET</code> و<code>POST</code>.</p>
<h2 id="استدعاء-api-من-react">استدعاء API من React</h2>
<p>أنشئ مكوّن React أدنى (أو استخدم مشروع React موجودًا) يستدعي نقطتَي النهاية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">API_URL</span> = <span class="hljs-string">&#x27;https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com&#x27;</span>;

<span class="hljs-comment">// GET /items</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchItems</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${API_URL}</span>/items\`</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}

<span class="hljs-comment">// POST /items</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createItem</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${API_URL}</span>/items\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ name, price }),
  });
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}
</code></pre>
<p>افتح تبويب Network في أدوات مطوّري المتصفّح وتحقّق:</p>
<ol>
<li>طلب GET يُرجع مصفوفة العناصر</li>
<li>طلب POST يُرجع العنصر المنشأ مع <code>id</code> مولّد</li>
<li>لا أخطاء CORS تظهر في وحدة التحكّم</li>
</ol>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>ينجح استدعاءا <code>fetch</code> من المتصفّح. ويُظهر تبويب Network استجابات 200/201 بأجسام JSON الصحيحة. ولا أخطاء CORS في وحدة التحكّم.</p>
<h2 id="ملخص-نقاط-التحقق">ملخّص نقاط التحقّق</h2>
<ul>
<li>معالج Lambda يُبنى ويتعامل مع GET وPOST</li>
<li>دالة Lambda منشورة وقابلة للاستدعاء من CLI</li>
<li>HTTP API موجودة بنوع البروتوكول الصحيح</li>
<li>التكامل يتصل بدالة Lambda بصيغة حمولة 2.0</li>
<li>المسارات موجودة لـ<code>GET /items</code> و<code>POST /items</code></li>
<li>إذن Lambda يسمح لـ API Gateway باستدعاء الدالة</li>
<li><code>curl</code> إلى نقطة نهاية API يُرجع JSON المتوقّع</li>
<li>CORS مُعدّ وطلبات preflight تنجح</li>
<li>تطبيق React يستطيع استدعاء نقطتَي النهاية دون أخطاء CORS</li>
</ul>
<h2 id="تشخيص-الفشل">تشخيص الفشل</h2>
<ul>
<li><strong><code>curl</code> يُرجع <code>{&quot;message&quot;:&quot;Internal Server Error&quot;}</code>:</strong> تستطيع API Gateway الوصول إلى المسار، لكن إذن Lambda مفقود أو معالجك رمى استثناءً. افحص <code>aws lambda add-permission</code> وسجلات CloudWatch.</li>
<li><strong><code>curl</code> يُرجع <code>{&quot;message&quot;:&quot;Not Found&quot;}</code>:</strong> المسار غير موجود، أو يشير إلى التكامل الخاطئ، أو أنشأته تحت تركيبة طريقة/مسار مختلفة.</li>
<li><strong>ما زال المتصفّح يُظهر أخطاء CORS رغم أن CLI يعمل:</strong> إعدادات CORS في API Gateway لا تتضمّن أصل الواجهة الأمامية أو الطرق أو الترويسات الدقيقة التي يطلبها المتصفّح.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف مسار <code>GET /items/{id}</code>.</strong> أنشئ مسارًا ثالثًا بمعامل مسار. حدّث معالجك ليقرأ <code>event.pathParameters?.id</code> ويُرجع عنصرًا واحدًا. اختبره بـ<code>curl</code> ومن تطبيق React.</li>
<li><strong>أضف معالجة أخطاء لأجسام POST غير الصالحة.</strong> أرسل طلب POST بجسم فارغ، وجسم غير JSON، وجسم JSON يفتقد حقولًا مطلوبة. تحقّق من أن معالجك يُرجع استجابات 400 مناسبة في كل حالة.</li>
<li><strong>أضف نطاقًا مخصّصًا.</strong> إذا كان لديك نطاق مُدار في Route 53 وشهادة ACM، فأنشئ اسم نطاق مخصّصًا لواجهتك واختبر أنه يعمل.</li>
</ul>
<p>عندما تكون جاهزًا، قارن عملك بـ<a href="https://stevekinney.com/courses/aws/api-gateway-lambda-solution">الحل: بناء API باستخدام API Gateway وLambda</a>.</p>
`,c={book:e,chapter:"aws",chapterTitle:a,slug:s,title:n,headings:t,html:o};export{e as book,d as chapter,a as chapterTitle,c as default,t as headings,o as html,s as slug,n as title};
