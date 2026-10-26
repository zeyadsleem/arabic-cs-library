const s="kinney",o="aws",n="نشر تطبيقات الويب على AWS",a="lambda-cold-starts-and-performance",e="البدء البارد والأداء",t=[{depth:2,id:"ما-الذي-يحدث-أثناء-البدء-البارد",text:"ما الذي يحدث أثناء البدء البارد"},{depth:2,id:"كم-يستغرق-البدء-البارد",text:"كم يستغرق البدء البارد؟"},{depth:3,id:"حجم-حزمة-النشر",text:"حجم حزمة النشر"},{depth:3,id:"عدد-الاعتماديات-وحجمها",text:"عدد الاعتماديات وحجمها"},{depth:3,id:"اختيار-وقت-التشغيل",text:"اختيار وقت التشغيل"},{depth:3,id:"إعداد-الذاكرة",text:"إعداد الذاكرة"},{depth:3,id:"اختيار-المعمارية",text:"اختيار المعمارية"},{depth:3,id:"إعداد-vpc",text:"إعداد VPC"},{depth:2,id:"متى-يحدث-البدء-البارد",text:"متى يحدث البدء البارد"},{depth:2,id:"استراتيجيات-التخفيف-العملية",text:"استراتيجيات التخفيف العملية"},{depth:3,id:"أبق-حزمتك-صغيرة",text:"أبقِ حزمتك صغيرة"},{depth:3,id:"استخدم-الاستيرادات-الكسولة-للاعتماديات-النادرة-الاستخدام",text:"استخدم الاستيرادات الكسولة للاعتماديات النادرة الاستخدام"},{depth:3,id:"زد-الذاكرة",text:"زد الذاكرة"},{depth:3,id:"تهيئة-العملاء-خارج-المعالج",text:"تهيئة العملاء خارج المعالج"},{depth:2,id:"التزامن-المخصص",text:"التزامن المخصّص"},{depth:2,id:"حدود-التزامن-والتقييد-429",text:"حدود التزامن والتقييد 429"},{depth:2,id:"قياس-البدء-البارد",text:"قياس البدء البارد"}],p=`<p>لقد نشرت دالة Lambda واستدعيتها، وهي تعمل. لكن إذا استدعيتها بعد فترة من عدم النشاط، فإن الاستجابة الأولى أبطأ بشكل ملحوظ من التي تليها. تلك الاستجابة الأولى البطيئة هي <strong>البدء البارد</strong>، وهي خاصية الأداء في Lambda التي تهمّ مهندسي الواجهة الأمامية الذين يبنون واجهات API خلفية أكثر من أي شيء آخر.</p>
<p>إذا أردت نسخة AWS من تفاصيل دورة الحياة الكامنة وراء البدء البارد، فإن <a href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html">دليل بيئة تشغيل Lambda</a> و<a href="https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html">دليل أفضل ممارسات Lambda</a> هما المرجعان الرسميان.</p>
<p>يضيف البدء البارد زمن استجابة إلى أول طلب بعد فترة خمول. وبالنسبة إلى نقطة نهاية API تستدعيها واجهتك الأمامية عند تحميل الصفحة، يمثّل ذلك الزمن الفرق بين تجربة سريعة الاستجابة ومؤشّر تحميل مرئي. لا يمكنك إزالة البدء البارد كليًا، لكن يمكنك جعله سريعًا بما يكفي كي لا يلاحظه المستخدمون.</p>
<h2 id="ما-الذي-يحدث-أثناء-البدء-البارد">ما الذي يحدث أثناء البدء البارد</h2>
<p>تذكّر دورة حياة وقت التشغيل من <a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هو Lambda؟</a>: تمرّ كل بيئة تنفيذ بمرحلة التهيئة، ثم الاستدعاء، ثم (في النهاية) الإيقاف. والبدء البارد هو ما يحدث عندما لا تملك Lambda بيئة تنفيذ دافئة متاحة لدالتك.</p>
<p>أثناء <strong>مرحلة التهيئة</strong>، تفعل Lambda ما يلي:</p>
<ol>
<li><strong>تنزيل حزمة النشر الخاصة بك</strong> من التخزين الداخلي إلى بيئة التنفيذ.</li>
<li><strong>تشغيل وقت التشغيل</strong>—في حالتك، Node.js 22.</li>
<li><strong>تشغيل شيفرة الوحدة النمطية من المستوى الأعلى</strong>—كل عبارة <code>import</code>، وكل تهيئة لمتغيّر على مستوى الوحدة، وكل مُنشئ عميل قاعدة بيانات.</li>
</ol>
<p>ولا تُنفّذ دالة المعالج الخاصة بك إلا بعد اكتمال كل ذلك. الخطوتان 1 و2 تتحكم فيهما Lambda. أما الخطوة 3 فتتحكم فيها أنت.</p>
<p>يتخطى <strong>البدء الدافئ</strong> الخطوات الثلاث كلها. فبيئة التنفيذ تعمل بالفعل، ووقت التشغيل مهيّأ بالفعل، وشيفرتك العليا نُفّذت بالفعل. وتنتقل Lambda مباشرةً إلى استدعاء دالة المعالج. ولهذا يكون الطلب الثاني أسرع: فهو يعيد استخدام البيئة الموجودة.</p>
<h2 id="كم-يستغرق-البدء-البارد">كم يستغرق البدء البارد؟</h2>
<p>بالنسبة إلى دالة Node.js بحزمة نشر صغيرة وبلا اعتماديات ثقيلة، يقع زمن البدء البارد عادةً في نطاق <strong>100-400 مللي ثانية</strong>. أما الدالة التي تحتوي على دليل <code>node_modules</code> كبير وعدة عملاء AWS SDK ومنطق تهيئة معقّد، فقد يصل زمن البدء البارد فيها إلى <strong>1-3 ثوانٍ</strong>.</p>
<p>إليك ما يؤثر في مدة البدء البارد، تقريبًا بترتيب الأثر:</p>
<h3 id="حجم-حزمة-النشر">حجم حزمة النشر</h3>
<p>العامل الأكبر. فـ Lambda تنزّل ملف zip الخاص بك من التخزين الداخلي قبل أن تستطيع تشغيل وقت التشغيل. وملف zip بحجم 1 MB يُنزّل أسرع من ملف بحجم 50 MB. ولهذا يهمّ تقليم الشيفرة (tree-shaking) وإزالة الاعتماديات غير المستخدمة والانتقائية فيما يدخل إلى <code>node_modules</code> في Lambda بطريقة لا تهمّ في نشر Vercel (حيث تخفي طبقة CDN كلفة بدء التشغيل).</p>
<h3 id="عدد-الاعتماديات-وحجمها">عدد الاعتماديات وحجمها</h3>
<p>كل عبارة <code>import</code> أو <code>require</code> في شيفرتك العليا تُنفّذ أثناء التهيئة. فإذا كانت دالتك تستورد AWS SDK v3 كاملًا (<code>@aws-sdk/client-s3</code> و<code>@aws-sdk/client-dynamodb</code> و<code>@aws-sdk/client-ses</code>) لكنها لا تستخدم إلا DynamoDB، فإن تلك الاستيرادات غير المستخدمة تُنفّذ مع ذلك أثناء التهيئة. استورد فقط ما تستخدمه.</p>
<h3 id="اختيار-وقت-التشغيل">اختيار وقت التشغيل</h3>
<p>Node.js وPython لديهما أسرع بدء بارد بين أوقات التشغيل المُدارة في Lambda. أما Java و.NET فبدءهما البارد أبطأ بكثير لأن أوقات تشغيلهما تستغرق وقتًا أطول للتهيئة. وهذا أحد أسباب كون Node.js خيارًا طبيعيًا لواجهات API الخلفية للواجهة الأمامية: فأنت تعرف اللغة أصلًا، وأداء البدء البارد من بين الأفضل المتاح.</p>
<blockquote>
<p><strong>SnapStart</strong></p>
<p>إذا انتهى بك الأمر يومًا على Lambda بـ JVM، فإن <strong>SnapStart</strong> تأخذ لقطة من وقت التشغيل المهيّأ بعد التحميل الأول وتستعيدها عند البدء البارد، فتقلّص أوقات البدء البارد لـ JVM من ثوانٍ إلى نحو 200 مللي ثانية. وهي متاحة اليوم لأوقات تشغيل Java و.NET وPython. وNode.js ليست في تلك القائمة—فهي سريعة بما يكفي بالفعل بحيث لا تُطبّق عليها SnapStart—لكنك ستراها مذكورة في وثائق AWS وإعلانات الوظائف، لذا يستحقّ الاسم أن تعرفه.</p>
</blockquote>
<h3 id="إعداد-الذاكرة">إعداد الذاكرة</h3>
<p>تخصّص Lambda وحدة المعالجة المركزية بشكل متناسب مع الذاكرة. فدالة بـ 128 MB تحصل على جزء صغير من vCPU؛ ودالة بـ 1,024 MB تحصل على قدر أكبر بكثير. وزيادة CPU تعني تهيئة أسرع—فتُنفّذ عبارات <code>import</code> أسرع، ويهيّأ عملاء SDK أسرع. وبالنسبة إلى الدوال الحساسة للبدء البارد، فإن رفع الذاكرة من 128 MB إلى 512 MB أو 1,024 MB يقلّل زمن البدء البارد غالبًا بنسبة 40-60%، وزيادة الكلفة ضئيلة لأن الدالة تهيّأ أسرع (فأنت تدفع لكل مللي ثانية).</p>
<h3 id="اختيار-المعمارية">اختيار المعمارية</h3>
<p>تدعم Lambda المعماريتين <code>x86_64</code> (الافتراضية) و<code>arm64</code> (AWS Graviton2). وARM64 أقل كلفة بنسبة 20% لكل GB-ثانية من الحوسبة—و<a href="https://aws.amazon.com/lambda/pricing/">صفحة أسعار Lambda</a> تذكر <em>أداء سعر أفضل بنسبة تصل إلى 34%</em> إجمالًا، وهو رقم يشمل كون arm64 يعمل غالبًا أسرع ويُفوتر مللي ثانيات أقل. مرّر <code>--architectures arm64</code> على الدوال الجديدة. والسبب الوحيد للبقاء على <code>x86_64</code> هو أنك تحزم وحدات أصلية مبنية لها.</p>
<h3 id="إعداد-vpc">إعداد VPC</h3>
<p>إذا كانت دالة Lambda لديك مضبوطة لتعمل داخل VPC (سحابة خاصة افتراضية)، فإن البدء البارد يتضمن إنشاء واجهة شبكة وربطها. كان هذا يضيف سابقًا 5-10 ثوانٍ إلى زمن البدء البارد، لكن AWS حسّنت شبكات VPC تحسينًا كبيرًا—فالعقوبة الآن نحو 1-2 ثانية. ومع ذلك، تجنّب وضع الدوال في VPC إلا إذا كانت تحتاج إلى الوصول إلى موارد موجودة داخل VPC فقط مثل قاعدة بيانات RDS. وفي هذه الدورة، لا تحتاج دوالك إلى وصول VPC.</p>
<h2 id="متى-يحدث-البدء-البارد">متى يحدث البدء البارد</h2>
<p>لا يحدث البدء البارد مع كل طلب. بل يحدث عندما:</p>
<ul>
<li><strong>لم تُستدعَ دالتك مؤخرًا.</strong> فـ Lambda تبقي بيئات التنفيذ دافئة لنحو 5-15 دقيقة من عدم النشاط (المدة الدقيقة غير مضمونة وتتفاوت).</li>
<li><strong>تحدث قفزات في حركة المرور.</strong> إذا كانت دالتك تتعامل مع 10 طلبات متزامنة ووصل طلب حادٍ عشر، فإن Lambda تنشئ بيئة تنفيذ جديدة لذلك الطلب الحادي عشر. ويختبر المستخدم الحادي عشر بدءًا باردًا رغم أن الدالة كانت تعمل باستمرار.</li>
<li><strong>تنشر شيفرة جديدة.</strong> بعد <code>update-function-code</code>، تستخدم البيئات الدافئة الموجودة الشيفرة القديمة. أما البيئات الجديدة بالشيفرة الجديدة فتمرّ ببدء بارد.</li>
</ul>
<p>بالنسبة إلى واجهة API أمامية تتلقى حركة مرور منتظمة، يصبح البدء البارد نادرًا بعد الاستدعاء الأول. أما واجهة API تتلقى حركة متقطّعة—بضعة طلبات في الساعة من أداة داخلية—فإن البدء البارد فيها هو القاعدة.</p>
<h2 id="استراتيجيات-التخفيف-العملية">استراتيجيات التخفيف العملية</h2>
<h3 id="أبق-حزمتك-صغيرة">أبقِ حزمتك صغيرة</h3>
<p>هذا أعلى تغيير أثرًا يمكنك إجراؤه. أزل الاعتماديات غير المستخدمة، واستخدم تقليم الشيفرة، ودقّق <code>package.json</code> بانتظام. لا أستطيع التشديد على هذه النقطة بما يكفي.</p>
<pre><code class="language-bash"><span class="hljs-comment"># Check the size of your deployment package</span>
<span class="hljs-built_in">ls</span> -lh function.zip
</code></pre>
<p>الهدف الجيد لمعالج API نموذجي هو أقل من 5 MB مضغوطًا. وإذا تجاوز ملف zip لديك 10 MB، فمن المحتمل أن لديك اعتماديات لا تحتاجها.</p>
<p><strong>استخدم esbuild للحزم وتقليم الشيفرة.</strong> فـ <code>tsc</code> يُخرج ملف <code>.js</code> واحدًا لكل <code>.ts</code> ولا يحذف الاستيرادات غير المستخدمة—لذا ينتهي ملف zip لديك بشحن كل ملف تحت <code>node_modules</code>. أما esbuild فيحزم كل ما يلمسه المعالج فعليًا في ملف واحد ويحذف الباقي:</p>
<pre><code class="language-bash">npx esbuild src/handler.ts \\
  --bundle \\
  --platform=node \\
  --target=node22 \\
  --format=cjs \\
  --minify \\
  --external:@aws-sdk/* \\
  --outfile=dist/handler.js
</code></pre>
<p>علّم <code>@aws-sdk/*</code> كخارجي—فـ AWS SDK مثبّت مسبقًا في وقت تشغيل Lambda Node.js 22، لذا فإن حزمه يضيف ميغابايتات إلى ملف zip لديك بلا فائدة. ولكل اعتمادية أخرى، دع esbuild يقلّمها. فالمعالج الذي كان 28 MB مع <code>tsc</code> الخام و<code>npm install</code> ينزل عادةً إلى أقل من 500 KB بعد ذلك.</p>
<h3 id="استخدم-الاستيرادات-الكسولة-للاعتماديات-النادرة-الاستخدام">استخدم الاستيرادات الكسولة للاعتماديات النادرة الاستخدام</h3>
<p>إذا كان معالجك يستخدم اعتمادية كبيرة بشكل شرطي (مثل مكتبة معالجة صور لمسار واحد محدّد)، فاستوردها داخل المعالج بدلًا من المستوى الأعلى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> path = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">path</span>;

  <span class="hljs-keyword">if</span> (path === <span class="hljs-string">&#x27;/generate-thumbnail&#x27;</span>) {
    <span class="hljs-comment">// Only loaded when this code path is hit</span>
    <span class="hljs-keyword">const</span> sharp = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;sharp&#x27;</span>);
    <span class="hljs-comment">// ... use sharp</span>
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;OK&#x27;</span> }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> استدعاءات <code>import()</code> الديناميكية تُنفّذ فقط عند تنفيذ مسار الشيفرة، لا أثناء التهيئة.</p>
<p>هذا يبقي مرحلة التهيئة سريعة للحالة الشائعة. أما المسار غير الشائع فيدفع كلفة الاستيراد فقط عندما يُستخدم فعليًا.</p>
<h3 id="زد-الذاكرة">زد الذاكرة</h3>
<p>إذا كانت أوقات البدء البارد لديك في نطاق 500 مللي ثانية وأكثر، فجرّب مضاعفة الذاكرة:</p>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --memory-size 512 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الزيادة في الكلفة لكل مللي ثانية يقابلها عادةً انخفاض في المدة. اختبر الإعدادين وقارن الكلفة الإجمالية، لا سعر المللي ثانية فقط.</p>
<h3 id="تهيئة-العملاء-خارج-المعالج">تهيئة العملاء خارج المعالج</h3>
<p>إذا كانت دالتك تستخدم AWS SDK (لـ DynamoDB أو S3 أو غيرها)، فأنشئ العميل على المستوى الأعلى بحيث يُهيّأ مرة واحدة أثناء التهيئة ويُعاد استخدامه عبر الاستدعاءات الدافئة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBDocumentClient</span>, <span class="hljs-title class_">GetCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-title class_">DynamoDBDocumentClient</span>.<span class="hljs-title function_">from</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({}));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
      <span class="hljs-title class_">TableName</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span>,
      <span class="hljs-title class_">Key</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;some-id&#x27;</span> },
    }),
  );

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result.<span class="hljs-property">Item</span>),
  };
};
</code></pre>
<p><em>ملاحظة:</em> تهيئة المستوى الأعلى تُنفّذ مرة واحدة أثناء التهيئة وتبقى عبر الاستدعاءات الدافئة.</p>
<p>هذه ممارسة عامة أفضل، لا مجرّد تحسين للبدء البارد. فالدالة الدافئة تعيد استخدام العميل الموجود (واتصالات TCP الخاصة به) بدلًا من إنشاء عميل جديد مع كل طلب.</p>
<h2 id="التزامن-المخصص">التزامن المخصّص</h2>
<p>تقدّم Lambda ميزة تُسمى <strong>التزامن المخصّص</strong> تُنشئ مسبقًا عددًا محدّدًا من بيئات التنفيذ الدافئة لدالتك. وهذه البيئات جاهزة دائمًا، ما يزيل البدء البارد كليًا—ولكن بكلفة.</p>
<pre><code class="language-bash"><span class="hljs-comment"># Publish a version first</span>
VERSION=$(aws lambda publish-version \\
  --function-name my-frontend-app-api \\
  --query <span class="hljs-string">&#x27;Version&#x27;</span> --output text \\
  --region us-east-1)

<span class="hljs-comment"># Then attach provisioned concurrency to that version</span>
aws lambda put-provisioned-concurrency-config \\
  --function-name my-frontend-app-api \\
  --qualifier <span class="hljs-string">&quot;<span class="hljs-variable">$VERSION</span>&quot;</span> \\
  --provisioned-concurrent-executions 5 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يتطلب التزامن المخصّص إصدارًا منشورًا ومرقّمًا (أو اسمًا مستعارًا يشير إلى واحد)—و<a href="https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html"><code>$LATEST</code> غير مدعوم صراحةً</a> وسترفضه واجهة API. وفي الإنتاج، النمط المعتاد هو ربط التزامن المخصّص باسم مستعار (<code>prod</code> أو <code>staging</code> أو ما شابه) يشير إلى إصدار منشور محدّد: فالاسم المستعار يستوعب منطق التوجيه، ويلتصق التزامن المخصّص بالإصدار الذي يحلّ إليه الاسم المستعار.</p>
<p>هذا يبقي 5 بيئات تنفيذ دافئة في كل الأوقات. وتدفع مقابلها سواء تعاملت مع الطلبات أم لا—فهي في جوهرها كلفة تشغيل خادم صغير باستمرار.</p>
<p>بالنسبة إلى معظم واجهات API الخلفية للواجهة الأمامية، التزامن المخصّص مبالغة. وهو منطقي لأحمال العمل الإنتاجية الحرجة من حيث زمن الاستجابة حيث لا يكون البدء البارد العرضي مقبولًا (معالجة المدفوعات، الألعاب في الوقت الفعلي). أما لواجهة API أمامية نموذجية، فالاستراتيجيات أعلاه—حزم صغيرة، وذاكرة أعلى، وتهيئة على المستوى الأعلى—كافية وأرخص بكثير.</p>
<h2 id="حدود-التزامن-والتقييد-429">حدود التزامن والتقييد 429</h2>
<p>لا تنشئ Lambda عددًا لا نهائيًا من بيئات التنفيذ. فحسابك لديه حصة <strong>تنفيذ متزامن</strong> (تبدأ بـ 1,000 لكل منطقة، وقابلة للرفع عند الطلب). وكل استدعاء قيد التنفيذ يُحتسب واحدًا. وإذا تجاوزت حركة المرور الحصة، تفشل الاستدعاءات الجديدة فورًا بـ <code>429 TooManyRequestsException</code> ورمز الخطأ <code>Rate exceeded</code>. ويعرض API Gateway ذلك للمتصفح كـ <code>500</code> أو <code>502</code> حسب نمط التكامل—فلن تحصل على 503 لطيف.</p>
<p>مِقبضان يستحقّان المعرفة:</p>
<ul>
<li><strong>التزامن المحجوز</strong> يحدّ دالة واحدة عند N من التنفيذات المتزامنة، <em>ويضمن</em> لها N على الأقل من حصة الحساب مع منعها من استهلاك أكثر من ذلك. وهذا مفيد عندما لا ينبغي لدالة مزعجة واحدة (تحويل فيديو) أن تجوّع دالة حرجة من حيث زمن الاستجابة (<code>api.example.com</code>).</li>
<li><strong>التزامن غير المحجوز</strong> هو بقية الحصة، ويُتشارك بين كل دالة لم تضبط حجزًا.</li>
</ul>
<pre><code class="language-bash"><span class="hljs-comment"># Cap a function at 50 concurrent executions</span>
aws lambda put-function-concurrency \\
  --function-name video-transcoder \\
  --reserved-concurrent-executions 50 \\
  --region us-east-1
</code></pre>
<p>بالنسبة إلى واجهة خلفية أمامية نموذجية، الحصة الافتراضية وفيرة. لكنها تصبح مصدر قلق حقيقي عندما يكون لديك مزيج من أحمال عمل دفعية متقلّبة وواجهات API مستقرة في الحساب نفسه.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>قبل اللجوء إلى التزامن المخصّص، قِس زمن البدء البارد الفعلي لديك. فإذا كانت دالتك تهيّأ في 200 مللي ثانية وكان متطلب زمن الاستجابة p95 لواجهتك أقل من 500 مللي ثانية، فأنت بخير بالفعل. حسّن بناءً على القياس، لا على القلق.</p>
</blockquote>
<h2 id="قياس-البدء-البارد">قياس البدء البارد</h2>
<p>يمكنك رؤية مدة البدء البارد في سجلات CloudWatch لدالتك. فـ Lambda تسجّل حقل <code>Init Duration</code> في الاستدعاءات التي تمرّ ببدء بارد:</p>
<pre><code>REPORT RequestId: abc-123 Duration: 15.23 ms Billed Duration: 16 ms
Memory Size: 128 MB Max Memory Used: 67 MB Init Duration: 245.67 ms
</code></pre>
<p>يظهر حقل <code>Init Duration</code> فقط في استدعاءات البدء البارد. وإذا لم تره، فالاستدعاء كان بدءًا دافئًا. قارن <code>Duration</code> (زمن تنفيذ معالجك) بـ <code>Init Duration</code> (كلفة البدء البارد) لتفهم من أين يأتي زمن الاستجابة لديك.</p>
<p>أنت الآن تفهم كل مفاهيم Lambda الأساسية: كتابة المعالجات، وتهيئة أدوار التنفيذ، والنشر والاختبار، وضبط متغيّرات البيئة، وإدارة أداء البدء البارد. في الوحدة التالية، ستضع طبقة HTTP أمام دالتك باستخدام API Gateway، كي تستطيع واجهتك الأمامية استدعاءها بطلب <code>fetch</code>.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:e,headings:t,html:p};export{s as book,o as chapter,n as chapterTitle,l as default,t as headings,p as html,a as slug,e as title};
