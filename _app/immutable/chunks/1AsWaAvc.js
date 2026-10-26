const s="kinney",p="aws",a="نشر تطبيقات الويب على AWS",n="api-gateway-cors-configuration",t="تهيئة CORS",o=[{depth:2,id:"لماذا-يوجد-cors",text:"لماذا يوجد CORS"},{depth:2,id:"كيف-تعمل-طلبات-الاستباق",text:"كيف تعمل طلبات الاستباق"},{depth:2,id:"تهيئة-cors-على-http-api",text:"تهيئة CORS على HTTP API"},{depth:3,id:"ما-الذي-يفعله-كل-حقل",text:"ما الذي يفعله كل حقل"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"اختبار-cors",text:"اختبار CORS"},{depth:2,id:"cors-في-شيفرة-واجهتك-الأمامية",text:"CORS في شيفرة واجهتك الأمامية"},{depth:2,id:"أصول-التطوير-مقابل-أصول-الإنتاج",text:"أصول التطوير مقابل أصول الإنتاج"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],e=`<p>لقد واجهت أخطاء CORS من قبل. كل مهندس واجهة أمامية حدّق يومًا في أخطاء <code>Access-Control-Allow-Origin</code> في وحدة تحكم المتصفح، وتخبّط لإضافة ترويسات في مكان ما، ثم نجح في النهاية عبر مزيج من إجابات Stack Overflow والحظ الأعمى. الفرق الآن: أنت تملك واجهة API. لم تعد تنتظر فريق خلفية ليصلح ترويساته. أنت تهيّئ CORS بنفسك، على HTTP API خاصتك، وتفهم بالضبط ما يفعله كل إعداد.</p>
<p>إذا أردت سلوك CORS الدقيق كما تصفه AWS بجوار هذا الدرس، فإن <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html">دليل CORS في HTTP API</a> هو المرجع الرسمي.</p>
<pre><code>sequenceDiagram
    participant Browser
    participant API as API Gateway

    Browser-&gt;&gt;API: OPTIONS /items&lt;br/&gt;Origin + requested method and headers
    API--&gt;&gt;Browser: 204 + Access-Control-Allow-* headers
    Browser-&gt;&gt;API: POST /items
    API--&gt;&gt;Browser: API response + Access-Control-Allow-Origin
</code></pre>
<h2 id="لماذا-يوجد-cors">لماذا يوجد CORS</h2>
<p>يعمل تطبيق React لديك على <code>http://localhost:3000</code> أثناء التطوير. ونقطة نهاية API Gateway لديك على <code>https://abc123def4.execute-api.us-east-1.amazonaws.com</code>. أصلان مختلفان. تحجب <strong>سياسة الأصل نفسه</strong> في المتصفح الطلبات بين أصول مختلفة ما لم يسمح بها الخادم صراحةً عبر ترويسات CORS.</p>
<p>CORS ليس مفهومًا خاصًا بـ API Gateway — إنه آلية أمان في المتصفح. صادفته أول مرة عندما هيّأت ترويسات CORS على S3 في <a href="https://stevekinney.com/courses/aws/bucket-policies-and-public-access">سياسات الدلاء والوصول العام</a>، ثم مرة أخرى عند إعداد ترويسات استجابة CloudFront في <a href="https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security">ترويسات CloudFront وCORS والأمان</a>. الآلية نفسها هنا: يجب أن يعيد الخادم ترويسات تخبر المتصفح «نعم، هذا الأصل مسموح له باستدعائي».</p>
<h2 id="كيف-تعمل-طلبات-الاستباق">كيف تعمل طلبات الاستباق</h2>
<p>لا يطلق كل طلب عبر الأصول طلب استباق. طلبات GET البسيطة ذات الترويسات القياسية تمرّ مباشرة — يرسل المتصفح الطلب ويفحص ترويسات CORS في الاستجابة. لكن طلبات POST ذات <code>Content-Type: application/json</code>، أو أي طلب بترويسات مخصّصة مثل <code>Authorization</code>، يطلق <strong>طلب استباق</strong>: يرسل المتصفح طلب <code>OPTIONS</code> إلى عنوان URL نفسه أولًا، سائلًا «هل هذا مسموح؟»</p>
<p>تسلسل الطلب الاستباقي:</p>
<ol>
<li>يستدعي تطبيق React لديك <code>fetch('https://your-api.example.com/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '...' })</code></li>
<li>يرسل المتصفح طلب <code>OPTIONS /items</code> مع ترويسات <code>Origin</code> و<code>Access-Control-Request-Method</code> و<code>Access-Control-Request-Headers</code></li>
<li>يعيد API Gateway ترويسات <code>Access-Control-Allow-Origin</code> و<code>Access-Control-Allow-Methods</code> و<code>Access-Control-Allow-Headers</code></li>
<li>إذا سمحت ترويسات الاستجابة بالطلب، يرسل المتصفح طلب <code>POST /items</code> الفعلي</li>
<li>إذا لم تسمح ترويسات الاستجابة بالطلب، يحجبه المتصفح وترى خطأ CORS</li>
</ol>
<p>تتعامل HTTP APIs مع طلبات الاستباق تلقائيًا عندما تهيّئ CORS على واجهة API. لا تحتاج إلى إنشاء مسار OPTIONS أو كتابة شيفرة Lambda للرد على طلبات الاستباق. هذه إحدى ميزات HTTP APIs على REST APIs، حيث تتطلّب تهيئة CORS ضبط أساليب OPTIONS على كل مورد.</p>
<h2 id="تهيئة-cors-على-http-api">تهيئة CORS على HTTP API</h2>
<p>افتراضيًا، لا تحتوي HTTP API لديك على أي تهيئة CORS. في وحدة التحكم، الانتقال إلى <strong>CORS</strong> في الشريط الجانبي الأيسر يعرض جميع الحقول فارغة — لا أصول مسموحة، ولا أساليب، ولا ترويسات.</p>
<p><img src="/arabic-cs-library/images/kinney/6adb9000b7916a94.webp" alt="تعرض صفحة CORS في API Gateway الحالة الافتراضية غير المهيّأة مع عدم السماح بأي أصول أو أساليب أو ترويسات."></p>
<p>تهيئة CORS خاصية على واجهة API نفسها — وهذا بصراحة أحد الأمور المفضّلة لدي في HTTP APIs. استخدم <code>aws apigatewayv2 update-api</code> لضبطها:</p>
<pre><code class="language-bash">aws apigatewayv2 update-api \\
  --api-id abc123def4 \\
  --cors-configuration <span class="hljs-string">&#x27;{&quot;AllowOrigins&quot;:[&quot;http://localhost:3000&quot;,&quot;https://example.com&quot;],&quot;AllowMethods&quot;:[&quot;GET&quot;,&quot;POST&quot;,&quot;PUT&quot;,&quot;DELETE&quot;],&quot;AllowHeaders&quot;:[&quot;Content-Type&quot;,&quot;Authorization&quot;],&quot;MaxAge&quot;:86400}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمّن الاستجابة تهيئة CORS:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiEndpoint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://abc123def4.execute-api.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ApiId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CorsConfiguration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;AllowHeaders&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Content-Type&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Authorization&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AllowMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;POST&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;PUT&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DELETE&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AllowOrigins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;http://localhost:3000&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;https://example.com&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;MaxAge&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">86400</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ProtocolType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HTTP&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في وحدة التحكم، يعرض قسم <strong>CORS</strong> في التنقّل الأيسر حقول CORS الستة جميعها مع زر <strong>Configure</strong> يفتح لوحة الإعدادات.</p>
<p><img src="/arabic-cs-library/images/kinney/9c44de355dbd58f6.webp" alt="تعرض صفحة تهيئة CORS في API Gateway الحقول Access-Control-Allow-Origin وAccess-Control-Allow-Methods وغيرها من حقول CORS مع قيمها الحالية."></p>
<h3 id="ما-الذي-يفعله-كل-حقل">ما الذي يفعله كل حقل</h3>
<p><strong><code>AllowOrigins</code></strong> — الأصول المسموح لها باستدعاء واجهة API. يجب أن تتضمّن كل قيمة المخطّط (<code>http://</code> أو <code>https://</code>) واسم المضيف والمنفذ (إن كان غير قياسي). أثناء التطوير، تُدرج عادةً <code>http://localhost:3000</code> (أو أي منفذ يستخدمه خادم التطوير لديك). في الإنتاج، هذا هو نطاقك: <code>https://example.com</code>.</p>
<p>يمكنك استخدام <code>*</code> للسماح بأي أصل، لكن لا تفعل ذلك إذا كانت واجهة API تستخدم المصادقة. فالأصل الشامل المقترن ببيانات الاعتماد يعني أن أي موقع على الإنترنت يمكنه إرسال طلبات موثّقة إلى واجهة API باستخدام رموز مستخدميك.</p>
<p><strong><code>AllowMethods</code></strong> — أساليب HTTP المسموح للمتصفح باستخدامها. اذكر فقط الأساليب التي تدعمها واجهة API فعليًا. إذا كانت واجهة API تحتوي فقط على مسارات <code>GET</code> و<code>POST</code>، فلا سبب للسماح بـ <code>DELETE</code>.</p>
<p><strong><code>AllowHeaders</code></strong> — ترويسات الطلب المسموح للمتصفح بإرسالها. <code>Content-Type</code> و<code>Authorization</code> هما الترويستان اللتان تحتاجهما دائمًا تقريبًا. وإذا استخدمت ترويسات مخصّصة، فأضفها هنا.</p>
<p><strong><code>MaxAge</code></strong> — المدة (بالثواني) التي يجب أن يخزّن فيها المتصفح استجابة الاستباق مؤقتًا. ضبطه على <code>86400</code> (24 ساعة) يعني أن المتصفح يرسل طلب استباق واحدًا فقط لكل نقطة نهاية يوميًا، بدلًا من واحد قبل كل طلب. وهذا يقلّل زمن الاستجابة وحركة الشبكة.</p>
<p><strong><code>ExposeHeaders</code></strong> — ترويسات الاستجابة المسموح للمتصفح بقراءتها. افتراضيًا، يعرّض المتصفح مجموعة محدودة فقط من ترويسات الاستجابة «الآمنة» لجافاسكريبت. إذا أعادت واجهة API ترويسات مخصّصة تحتاج واجهتك الأمامية إلى قراءتها، فاذكرها هنا.</p>
<p><strong><code>AllowCredentials</code></strong> — اضبطه على <code>true</code> إذا كانت واجهة API تستخدم ملفات تعريف الارتباط أو الترويسة <code>Authorization</code> مع بيانات الاعتماد. وعندما يكون <code>true</code>، لا يمكن أن يكون <code>AllowOrigins</code> هو <code>*</code> — بل يجب أن تذكر أصولًا محدّدة.</p>
<pre><code class="language-bash">aws apigatewayv2 update-api \\
  --api-id abc123def4 \\
  --cors-configuration <span class="hljs-string">&#x27;{&quot;AllowOrigins&quot;:[&quot;https://example.com&quot;],&quot;AllowMethods&quot;:[&quot;GET&quot;,&quot;POST&quot;],&quot;AllowHeaders&quot;:[&quot;Content-Type&quot;,&quot;Authorization&quot;],&quot;AllowCredentials&quot;:true,&quot;ExposeHeaders&quot;:[&quot;X-Request-Id&quot;],&quot;MaxAge&quot;:86400}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>يرفض المتصفح ضبط <code>AllowCredentials=true</code> مع <code>AllowOrigins=&quot;*&quot;</code>. إذا كنت تحتاج إلى بيانات الاعتماد، فيجب أن تحدّد أصولًا دقيقة. هذه قاعدة يفرضها المتصفح، وليست قيدًا من API Gateway.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ApiGatewayV2Client</span>, <span class="hljs-title class_">UpdateApiCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-apigatewayv2&#x27;</span>;

<span class="hljs-keyword">const</span> apigw = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGatewayV2Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateApiCommand</span>({
    <span class="hljs-title class_">ApiId</span>: <span class="hljs-string">&#x27;abc123def4&#x27;</span>,
    <span class="hljs-title class_">CorsConfiguration</span>: {
      <span class="hljs-title class_">AllowOrigins</span>: [<span class="hljs-string">&#x27;https://example.com&#x27;</span>],
      <span class="hljs-title class_">AllowMethods</span>: [<span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-string">&#x27;POST&#x27;</span>],
      <span class="hljs-title class_">AllowHeaders</span>: [<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;Authorization&#x27;</span>],
      <span class="hljs-title class_">AllowCredentials</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-title class_">ExposeHeaders</span>: [<span class="hljs-string">&#x27;X-Request-Id&#x27;</span>],
      <span class="hljs-title class_">MaxAge</span>: <span class="hljs-number">86400</span>,
    },
  }),
);
</code></pre>
<h2 id="اختبار-cors">اختبار CORS</h2>
<p>بعد تهيئة CORS، اختبر باستخدام <code>curl</code> لرؤية الترويسات التي يعيدها API Gateway:</p>
<pre><code class="language-bash">curl -i -X OPTIONS \\
  https://abc123def4.execute-api.us-east-1.amazonaws.com/items \\
  -H <span class="hljs-string">&quot;Origin: http://localhost:3000&quot;</span> \\
  -H <span class="hljs-string">&quot;Access-Control-Request-Method: POST&quot;</span> \\
  -H <span class="hljs-string">&quot;Access-Control-Request-Headers: Content-Type&quot;</span>
</code></pre>
<p>يجب أن تتضمّن الاستجابة ترويسات CORS:</p>
<pre><code>HTTP/2 204
access-control-allow-headers: Content-Type, Authorization
access-control-allow-methods: GET, POST, PUT, DELETE
access-control-allow-origin: http://localhost:3000
access-control-max-age: 86400
</code></pre>
<p>حالة 204 مع الترويسات الصحيحة تعني أن CORS مهيّأ بشكل سليم. إذا رأيت 403 أو ترويسات مفقودة، فتحقّق جيدًا من <code>AllowOrigins</code> — يجب أن يطابق الأصل في الطلب أحد الأصول المسموحة مطابقة تامة (بما في ذلك المخطّط والمنفذ).</p>
<h2 id="cors-في-شيفرة-واجهتك-الأمامية">CORS في شيفرة واجهتك الأمامية</h2>
<p>مع تهيئة CORS على جانب API، تعمل استدعاءات <code>fetch</code> في واجهتك الأمامية دون أي تهيئة خاصة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://abc123def4.execute-api.us-east-1.amazonaws.com/items&#x27;</span>, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
  <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;TypeScript in Action&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">29.99</span> }),
});

<span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
</code></pre>
<p>لا حاجة إلى <code>mode: 'cors'</code> — فـ <code>fetch</code> يستخدم وضع CORS افتراضيًا للطلبات عبر الأصول. ولا حاجة إلى وسيط. ولا حاجة إلى حل <code>no-cors</code> البديل (الذي يبتلع جسم الاستجابة). ترويسات CORS من API Gateway تخبر المتصفح بالسماح بالطلب.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>أثناء التطوير المحلي، قد تفضّل استخدام وسيط في خادم التطوير Vite أو Next.js لتجنّب CORS تمامًا. هذا يعمل بشكل جيد للتطوير لكنه يخفي مشكلات تهيئة CORS التي ستظهر في الإنتاج. اختبر مقابل نقطة نهاية API Gateway الحقيقية مرة واحدة على الأقل قبل النشر.</p>
</blockquote>
<h2 id="أصول-التطوير-مقابل-أصول-الإنتاج">أصول التطوير مقابل أصول الإنتاج</h2>
<p>من الأنماط الشائعة تضمين أصل التطوير المحلي ونطاق الإنتاج معًا. داخل كتلة JSON الخاصة بـ <code>--cors-configuration</code>، يبدو ذلك هكذا:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;AllowOrigins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;http://localhost:3000&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;http://localhost:5173&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;https://example.com&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<p>المنفذ <code>3000</code> هو منفذ خادم التطوير المعتاد في React. والمنفذ <code>5173</code> هو منفذ Vite الافتراضي. أدرج أي منافذ تستخدمها أدوات التطوير لديك.</p>
<p>في إعداد أكثر تطورًا، ستستخدم مراحل API Gateway (المغطاة في <a href="https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains">مراحل API Gateway والنطاقات المخصّصة</a>) لفصل تهيئة التطوير والإنتاج، مع أصول CORS مختلفة لكل مرحلة. لكن للبدء، فإن إدراج جميع أصولك على واجهة API واحدة يعمل بشكل جيد.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>إدراج شرطة مائلة نهائية في الأصل.</strong> <code>https://example.com/</code> ليس هو <code>https://example.com</code>. يجب أن يطابق الأصل مطابقة تامة، ويرسل المتصفح الأصول دون شرطة مائلة نهائية.</p>
<p><strong>نسيان إدراج المنفذ في localhost.</strong> <code>http://localhost</code> و<code>http://localhost:3000</code> أصلان مختلفان. إذا كان خادم التطوير لديك يعمل على المنفذ 3000، فيجب أن يتضمّن الأصل <code>:3000</code>.</p>
<p><strong>ضبط ترويسات CORS في دالة Lambda بدلًا من تهيئة API.</strong> بالنسبة إلى HTTP APIs (التي تستخدمها هذه الدورة في كل مكان)، هذا هشّ — إذ يجب عليك التعامل مع طلبات OPTIONS في معالجك وتذكّر إدراج ترويسات CORS في كل استجابة. دع API Gateway يتولّى ذلك. فهذا هو الغرض من تهيئة CORS المدمجة.</p>
<blockquote>
<p><strong>واجهات REST API مختلفة</strong></p>
<p>إذا وجدت نفسك لاحقًا على REST API (النسخة الأقدم من API Gateway) أو تكامل غير وكيل، فإن CORS يُهيَّأ بشكل مختلف: لا يوجد علم <code>--cors-configuration</code>، وستحتاج إلى تهيئة أسلوب OPTIONS لكل مورد، وإما تفعيل مساعدات CORS في وحدة التحكم أو ضبط الترويسات في تعيين استجابة الأسلوب. لا تزال قاعدة «لا تضع CORS في المعالج» سارية، لكن المكان الذي تضعها فيه يتغيّر.</p>
</blockquote>
<p>واجهة API لديك قابلة للاستدعاء من واجهتك الأمامية. لكن لديها الآن عنوان URL واحد: نقطة النهاية <code>execute-api</code> المولّدة تلقائيًا. من المحتمل أنك تريد نطاقًا مخصّصًا مثل <code>api.example.com</code>، وربما تريد بيئات منفصلة للتطوير والإنتاج. يغطي الدرس التالي المراحل وعمليات النشر وأسماء النطاقات المخصّصة.</p>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:o,html:e};export{s as book,p as chapter,a as chapterTitle,c as default,o as headings,e as html,n as slug,t as title};
