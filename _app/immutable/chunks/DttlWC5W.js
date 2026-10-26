const s="kinney",l="aws",n="نشر تطبيقات الويب على AWS",a="lambda-environment-variables",t="متغيرات البيئة والإعدادات",e=[{depth:2,id:"تعيين-متغيرات-البيئة-عبر-سطر-الأوامر",text:"تعيين متغيرات البيئة عبر سطر الأوامر"},{depth:2,id:"الوصول-إلى-متغيرات-البيئة-داخل-المعالج",text:"الوصول إلى متغيرات البيئة داخل المعالج"},{depth:2,id:"متغيرات-البيئة-المدمجة-في-lambda",text:"متغيرات البيئة المدمجة في Lambda"},{depth:2,id:"حد-4-كيلوبايت",text:"حدّ 4 كيلوبايت"},{depth:2,id:"متى-لا-تستخدم-متغيرات-البيئة",text:"متى لا تستخدم متغيرات البيئة"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"تحديث-متغير-واحد",text:"تحديث متغيّر واحد"},{depth:2,id:"متغيرات-البيئة-والبدايات-الباردة",text:"متغيرات البيئة والبدايات الباردة"}],p=`<p>تعمل متغيرات البيئة في Lambda بالطريقة نفسها التي تعمل بها في Vercel أو Netlify: تضبط أزواج المفتاح والقيمة على الدالة، ويقرأها كودك من <code>process.env</code>. عنوان نقطة نهاية API لخدمة خارجية، أو اسم جدول DynamoDB، أو راية ميزة—أي قيمة تتغيّر بين البيئات أو لا ينبغي تثبيتها في الكود تذهب إلى متغيّر بيئة.</p>
<p>إن أردت أن تكون قواعد AWS وحدودها الدقيقة أمامك أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html">دليل متغيرات البيئة في Lambda</a> هو المرجع الرسمي.</p>
<p>إن سبق لك ضبط <code>NEXT_PUBLIC_API_URL</code> في ملف <code>.env.local</code> أو تهيئة متغيرات البيئة في لوحة تحكم Vercel، فأنت تفهم الفكرة بالفعل. الفرق الوحيد هو طريقة ضبطها.</p>
<h2 id="تعيين-متغيرات-البيئة-عبر-سطر-الأوامر">تعيين متغيرات البيئة عبر سطر الأوامر</h2>
<p>يمكنك ضبط متغيرات البيئة عند إنشاء الدالة أو تحديثها على دالة موجودة. إليك كيفية إضافتها أثناء الإنشاء:</p>
<pre><code class="language-bash">aws lambda create-function \\
  --function-name my-frontend-app-api \\
  --runtime nodejs22.x \\
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \\
  --handler handler.handler \\
  --zip-file fileb://function.zip \\
  --environment <span class="hljs-string">&#x27;Variables={TABLE_NAME=my-frontend-app-data,STAGE=production}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لتحديث متغيرات البيئة على دالة موجودة، استخدم <code>update-function-configuration</code>:</p>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --environment <span class="hljs-string">&#x27;Variables={TABLE_NAME=my-frontend-app-data,STAGE=production,LOG_LEVEL=info}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>في وحدة التحكم، يعرض قسم <strong>Configuration → Environment variables</strong> جميع المتغيرات بنص صريح مع زر <strong>Edit</strong> يتيح لك إضافتها أو تعديلها أو حذفها.</p>
<p><img src="/arabic-cs-library/images/kinney/73ec664ba720f480.webp" alt="علامة تبويب Configuration لدالة Lambda تعرض قسم Environment variables مع TABLE_NAME مضبوطًا على frontend-items."></p>
<p>يعرض تبويب Configuration في دالة Lambda قسم Environment variables مع ضبط TABLE_NAME على frontend-items.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تستبدل راية <code>--environment</code> <strong>جميع</strong> متغيرات البيئة على الدالة، لا المتغيرات التي تحددها وحدها. إذا كانت لدالتك ثلاثة متغيرات موجودة وشغّلت <code>update-function-configuration</code> بمتغيرين فقط، فسيُحذف المتغير الثالث. أدرج دائمًا كل متغير تريد أن تحتفظ به الدالة.</p>
</blockquote>
<h2 id="الوصول-إلى-متغيرات-البيئة-داخل-المعالج">الوصول إلى متغيرات البيئة داخل المعالج</h2>
<p>في معالج TypeScript لديك، تتاح متغيرات البيئة عبر <code>process.env</code>، تمامًا كما هي في أي تطبيق Node.js:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">const</span> tableName = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span>;
<span class="hljs-keyword">const</span> stage = process.<span class="hljs-property">env</span>.<span class="hljs-property">STAGE</span> ?? <span class="hljs-string">&#x27;development&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">if</span> (!tableName) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;TABLE_NAME environment variable is not set&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">table</span>: tableName,
      stage,
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Configuration loaded successfully&#x27;</span>,
    }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> قراءة <code>process.env</code> في المستوى الأعلى تُنفَّذ مرة واحدة أثناء التهيئة، لا في كل استدعاء.</p>
<p>هناك نمطان يستحقان الانتباه هنا. أولًا، قراءة متغيرات البيئة في المستوى الأعلى (خارج دالة المعالج) تعني أن القيمة تُقرأ مرة واحدة أثناء مرحلة التهيئة وتُعاد استخدامها عبر الاستدعاءات. هذا أكفأ من قراءة <code>process.env</code> في كل طلب. ثانيًا، تحقّق دائمًا من وجود متغيرات البيئة المطلوبة—فـ <code>process.env.TABLE_NAME</code> نوعه <code>string | undefined</code> في TypeScript، وينبغي أن تفشل دالتك بوضوح عند غياب متغيّر بدلًا من أن تنكسر بصمت.</p>
<h2 id="متغيرات-البيئة-المدمجة-في-lambda">متغيرات البيئة المدمجة في Lambda</h2>
<p>تضبط Lambda أيضًا عدة متغيرات بيئة تلقائيًا. أنت لا تهيّئ هذه المتغيرات—فهي موجودة دائمًا:</p>
<table>
<thead>
<tr>
<th>المتغيّر</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>AWS_REGION</code></td>
<td>منطقة الدالة (مثل <code>us-east-1</code>)</td>
</tr>
<tr>
<td><code>AWS_LAMBDA_FUNCTION_NAME</code></td>
<td>اسم الدالة</td>
</tr>
<tr>
<td><code>AWS_LAMBDA_FUNCTION_MEMORY_SIZE</code></td>
<td>الذاكرة المخصصة بالميغابايت</td>
</tr>
<tr>
<td><code>AWS_LAMBDA_FUNCTION_VERSION</code></td>
<td>إصدار الدالة الذي يُنفَّذ</td>
</tr>
<tr>
<td><code>AWS_EXECUTION_ENV</code></td>
<td>معرّف بيئة التشغيل (مثل <code>AWS_Lambda_nodejs22.x</code>)</td>
</tr>
<tr>
<td><code>_HANDLER</code></td>
<td>إعداد المعالج (مثل <code>handler.handler</code>)</td>
</tr>
</tbody>
</table>
<p>هذه مفيدة للتسجيل وتصحيح الأخطاء. على سبيل المثال، قد تدرج <code>AWS_REGION</code> في مخرجات السجل لتتأكد من أن دالتك تعمل في المكان الذي تتوقعه. أحبّ تسجيل اسم الدالة والمنطقة في كل بداية باردة—فهذا يوفر الوقت عند تصحيح الأخطاء عبر بيئات متعددة.</p>
<h2 id="حد-4-كيلوبايت">حدّ 4 كيلوبايت</h2>
<p>تفرض Lambda حدًا إجماليًا قدره <strong>4 KB</strong> على جميع متغيرات البيئة مجتمعة—بما في ذلك المفاتيح والقيم والتنسيق. يبدو هذا صغيرًا، وهو <em>بالفعل</em> كذلك. حفنة من قيم الإعداد القصيرة تتسع بسهولة؛ أما كتلة JSON تحتوي إعدادات تطبيقك بالكامل فلا.</p>
<p>إذا وصلت إلى حدّ 4 KB، فهذه إشارة إلى أن إعداداتك تجاوزت متغيرات البيئة. عند تلك النقطة، ينبغي أن تنقل الإعدادات إلى <strong>Parameter Store</strong>، الذي ستغطيه في قسم الأسرار. يدعم قيمًا تصل إلى 8 KB لكل معامل (أو 64 KB للمعاملات المتقدمة) دون حد إجمالي لعدد المعاملات.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>قاعدة عملية تقريبية: استخدم متغيرات البيئة للقيم البسيطة غير الحساسة التي تحتاجها دالتك عند بدء التشغيل—أسماء الجداول، ومعرّفات المراحل، ورايات الميزات، وعناوين URL لنقاط نهاية API. واستخدم Parameter Store أو Secrets Manager لكل ما هو حساس أو كبير أو يحتاج إلى مشاركة بين دوال متعددة.</p>
</blockquote>
<h2 id="متى-لا-تستخدم-متغيرات-البيئة">متى لا تستخدم متغيرات البيئة</h2>
<p>متغيرات البيئة هي الأداة الصحيحة للإعدادات التي:</p>
<ul>
<li>تتغيّر بين البيئات (dev وstaging وproduction)</li>
<li>ليست حساسة بما يكفي لتستوجب التشفير عند التخزين</li>
<li>صغيرة (اسم جدول، أو URL، أو معرّف مرحلة)</li>
<li>تحتاج إلى أن تكون متاحة فورًا عند بدء تشغيل الدالة</li>
</ul>
<p>وهي الأداة <strong>الخاطئة</strong> لـ:</p>
<ul>
<li><strong>مفاتيح API وكلمات مرور قواعد البيانات والرموز.</strong> ينبغي أن تذهب هذه إلى Secrets Manager أو إلى نوع <code>SecureString</code> في Parameter Store. متغيرات البيئة مرئية لأي شخص يملك إذن <code>lambda:GetFunctionConfiguration</code>، وتظهر في وحدة تحكم Lambda بنص صريح. يغطي قسم الأسرار الإعداد الآمن بالتفصيل.</li>
<li><strong>كائنات الإعداد الكبيرة.</strong> إذا كان إعدادك يقترب من حدّ 4 KB، فانقله إلى Parameter Store.</li>
<li><strong>الإعدادات التي تتغيّر كثيرًا.</strong> يتطلب تحديث متغيّر بيئة تشغيل <code>update-function-configuration</code>، وهذا يطلق تحديثًا قصيرًا للدالة. أما الإعدادات التي تريد تغييرها دون إعادة نشر، فيتيح لك Parameter Store تحديث القيمة والتقاطها من دالتك في الاستدعاء التالي (مع التخزين المؤقت المناسب).</li>
</ul>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<p>نمط القراءة-التعديل-الكتابة أدناه أنظف مع SDK لأنك تحصل على دمج صحيح للكائنات بدلًا من بهلوانيات <code>jq</code> في الصدفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">LambdaClient</span>,
  <span class="hljs-title class_">GetFunctionConfigurationCommand</span>,
  <span class="hljs-title class_">UpdateFunctionConfigurationCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-lambda&#x27;</span>;

<span class="hljs-keyword">const</span> lambda = <span class="hljs-keyword">new</span> <span class="hljs-title class_">LambdaClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> current = <span class="hljs-keyword">await</span> lambda.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetFunctionConfigurationCommand</span>({ <span class="hljs-title class_">FunctionName</span>: <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span> }),
);

<span class="hljs-keyword">await</span> lambda.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateFunctionConfigurationCommand</span>({
    <span class="hljs-title class_">FunctionName</span>: <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span>,
    <span class="hljs-title class_">Environment</span>: {
      <span class="hljs-title class_">Variables</span>: {
        ...(current.<span class="hljs-property">Environment</span>?.<span class="hljs-property">Variables</span> ?? {}),
        <span class="hljs-attr">LOG_LEVEL</span>: <span class="hljs-string">&#x27;debug&#x27;</span>,
      },
    },
  }),
);
</code></pre>
<p>التحذير نفسه كما في CLI: يُستبدل <code>Environment.Variables</code> عبر API ولا يُدمج. النشر (spread) أعلاه يقوم بالدمج على جهة العميل قبل الاستدعاء.</p>
<h2 id="تحديث-متغير-واحد">تحديث متغيّر واحد</h2>
<p>بما أن راية <code>--environment</code> تستبدل جميع المتغيرات، يتطلب تحديث متغيّر واحد إعادة تحديد كل شيء. هذا مزعج لكنه قابل للإدارة. أحد الأساليب هو استخدام <code>get-function-configuration</code> لقراءة المتغيرات الحالية، ثم تعديل JSON، ثم إعادة تمريره:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Get current environment variables</span>
aws lambda get-function-configuration \\
  --function-name my-frontend-app-api \\
  --query <span class="hljs-string">&#x27;Environment.Variables&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يعيد هذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TABLE_NAME&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-data&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;STAGE&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;production&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;LOG_LEVEL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;info&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم حدّث بالمجموعة المعدّلة:</p>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --environment <span class="hljs-string">&#x27;Variables={TABLE_NAME=my-frontend-app-data,STAGE=production,LOG_LEVEL=debug}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<blockquote>
<p><strong>ماذا يحدث للحاويات الدافئة؟</strong></p>
<p>إخبار Lambda بتحديث متغيرات البيئة يعني استبدال بيئة تنفيذ جديدة في الاستدعاء التالي—تُلتقط القيمة الجديدة فورًا، لا تدريجيًا. أي حاويات دافئة تعمل بالقيم القديمة تُسحب في الخلفية. لا تحتاج إلى إعادة نشر الكود لدفع تغيير إعداد، ولا تحتاج إلى انتظار طرح تدريجي: الطلب التالي يحصل على الإعداد الجديد.</p>
</blockquote>
<h2 id="متغيرات-البيئة-والبدايات-الباردة">متغيرات البيئة والبدايات الباردة</h2>
<p>تكون متغيرات البيئة متاحة أثناء مرحلة التهيئة، ما يعني أنه يمكنك قراءتها بأمان في كود الوحدة النمطية في المستوى الأعلى. هذا هو النمط الموصى به فعليًا: اقرأ الإعدادات مرة واحدة أثناء التهيئة وأعد استخدامها عبر الاستدعاءات. لا تقرأ <code>process.env</code> داخل معالجك في كل طلب—فهو يعمل، لكنه يهدر الوقت في شيء يحتاج إلى الحدوث مرة واحدة فقط.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Good: read once during init</span>
<span class="hljs-keyword">const</span> tableName = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-comment">// tableName is already available here</span>
};
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// Works but wasteful: read on every invocation</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> tableName = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span>;
  <span class="hljs-comment">// reads process.env on every single request</span>
};
</code></pre>
<p>فرق الأداء ضئيل لمتغيّر واحد، لكن النمط مهم: التهيئة في المستوى الأعلى ممارسة Lambda فضلى تؤتي ثمارها عندما تهيّئ عملاء قواعد البيانات أو تحلل إعدادات معقدة أو تحمّل بيانات مخزّنة مؤقتًا.</p>
<p>دالتك منشورة ومهيّأة وقابلة للاستدعاء. الموضوع الأخير قبل ربطها بالإنترنت عبر API Gateway هو موضوع يؤثر في كل API تبنيه بـ Lambda: البدايات الباردة. في الدرس التالي، ستتعلم ما يسببها، وكيف تؤثر في زمن الاستجابة، وما يمكنك فعله حيالها.</p>
`,o={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:p};export{s as book,l as chapter,n as chapterTitle,o as default,e as headings,p as html,a as slug,t as title};
