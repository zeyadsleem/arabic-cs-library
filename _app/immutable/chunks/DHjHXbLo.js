const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="dynamodb-reading-and-writing-data",l="قراءة البيانات وكتابتها باستخدام SDK",t=[{depth:2,id:"إعداد-عميل-المستندات",text:"إعداد عميل المستندات"},{depth:2,id:"putitem-إنشاء-عنصر-أو-استبداله",text:"PutItem: إنشاء عنصر أو استبداله"},{depth:2,id:"getitem-القراءة-بالمفتاح",text:"GetItem: القراءة بالمفتاح"},{depth:2,id:"updateitem-التحديثات-الجزئية",text:"UpdateItem: التحديثات الجزئية"},{depth:2,id:"الكتابات-الشرطية-القفل-المتفائل",text:"الكتابات الشرطية (القفل المتفائل)"},{depth:2,id:"deleteitem-إزالة-عنصر",text:"DeleteItem: إزالة عنصر"},{depth:2,id:"تجميع-كل-ذلك-في-معالج",text:"تجميع كل ذلك في معالج"},{depth:2,id:"معدلات-الأداء",text:"معدّلات الأداء"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],e=`<p>لديك جدول DynamoDB. الآن تحتاج إلى وضع البيانات فيه وإخراجها منه. تعرض DynamoDB أربع عمليات أساسية للعمل مع العناصر الفردية: <strong>PutItem</strong> (إنشاء أو استبدال)، و<strong>GetItem</strong> (قراءة بالمفتاح)، و<strong>UpdateItem</strong> (تحديث جزئي)، و<strong>DeleteItem</strong> (إزالة). وهذه تقابل مباشرةً عمليات CRUD التي بنيتها مئة مرة في تطبيقات الواجهة الأمامية.</p>
<p>إذا أردت نسخة AWS الدقيقة من سلوك الوصول إلى البيانات أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html">دليل مطوّر DynamoDB</a> هو المرجع المعتمد.</p>
<p>يوفّر AWS SDK v3 طريقتين لاستدعاء هذه العمليات. فـ <code>DynamoDBClient</code> منخفض المستوى يتطلب منك وصف بياناتك بصيغة واصفات الأنواع في DynamoDB—بتغليف كل نص في <code>{ S: &quot;value&quot; }</code> وكل رقم في <code>{ N: &quot;123&quot; }</code>. أما <code>DynamoDBDocumentClient</code> عالي المستوى فيتولى ذلك التسويق نيابةً عنك، فتعمل بكائنات JavaScript عادية. استخدم عميل المستندات. دائمًا.</p>
<h2 id="إعداد-عميل-المستندات">إعداد عميل المستندات</h2>
<p>ثبّت حزم SDK في مشروع Lambda لديك:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
</code></pre>
<p>أنشئ العميل على المستوى الأعلى في ملف المعالج. فالشيفرة خارج دالة المعالج تُنفّذ أثناء مرحلة التهيئة وتُعاد استخدامها عبر الاستدعاءات الدافئة—وأنت لا تريد إنشاء عميل جديد مع كل طلب.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBDocumentClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-title class_">DynamoDBDocumentClient</span>.<span class="hljs-title function_">from</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({}));
</code></pre>
<p><em>ملاحظة:</em> إنشاء العميل خارج المعالج يعني أنه يبقى عبر الاستدعاءات الدافئة.</p>
<p>الكائن الفارغ <code>{}</code> الذي يُمرّر إلى <code>DynamoDBClient</code> يعني «استخدم الإعداد الافتراضي»—المنطقة من بيئة تنفيذ Lambda، وبيانات الاعتماد من دور التنفيذ. لست بحاجة إلى كتابة منطقة بشكل صريح أو تمرير مفاتيح وصول.</p>
<h2 id="putitem-إنشاء-عنصر-أو-استبداله">PutItem: إنشاء عنصر أو استبداله</h2>
<p>يكتب <code>PutCommand</code> عنصرًا إلى الجدول. وإذا كان هناك عنصر بالمفتاح الأساسي نفسه موجودًا بالفعل، فإنه يُستبدل كليًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PutCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TABLE_NAME</span> = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span> ?? <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createItem</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">itemId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">Item</span>: {
        userId,
        itemId,
        title,
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span>,
        <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      },
    }),
  );
}
</code></pre>
<p>لاحظ أنك تمرّر كائن JavaScript عاديًا كـ <code>Item</code>. فعميل المستندات يتولى تحويله إلى الصيغة الداخلية لـ DynamoDB. لست بحاجة إلى <code>{ S: &quot;user-123&quot; }</code>—بل تكتب <code>&quot;user-123&quot;</code> فقط.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>يستبدل <code>PutCommand</code> العنصر بأكمله إذا وُجد عنصر بالمفتاح نفسه. وإذا أردت تحديث سمات محدّدة دون المساس بغيرها، فاستخدم <code>UpdateCommand</code> بدلًا من ذلك. وهذا مصدر شائع لفقدان البيانات—فتجلب عنصرًا، وتعدّل حقلًا واحدًا، ثم تضع العنصر بأكمله، فتكتب فوق تغييرات أجراها طلب آخر بين قراءتك وكتابتك.</p>
</blockquote>
<h2 id="getitem-القراءة-بالمفتاح">GetItem: القراءة بالمفتاح</h2>
<p>يجلب <code>GetCommand</code> عنصرًا واحدًا بمفتاحه الأساسي الكامل. أما جدول المفتاح المركّب، فيجب أن تقدّم كلا مفتاحي التقسيم والفرز.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">GetCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getItem</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">itemId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">Key</span>: {
        userId,
        itemId,
      },
    }),
  );

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">Item</span>;
}
</code></pre>
<p><em>ملاحظة:</em> يكون <code>result.Item</code> مساويًا لـ <code>undefined</code> إذا لم يطابق أي عنصر المفتاح—وهذا ليس خطأً، بل <code>undefined</code> فقط.</p>
<p><code>GetItem</code> سريع ورخيص—فهو يقرأ عنصرًا واحدًا بمفتاحه الأساسي بزمن استجابة متوقّع بغض النظر عن حجم الجدول. هذه هي نقطة قوة DynamoDB، وبصراحة، إنها العملية التي أستخدمها أكثر من غيرها.</p>
<p>إذا لم يكن العنصر موجودًا، فإن <code>result.Item</code> يساوي <code>undefined</code>. لا تُطلق DynamoDB خطأً عند غياب العنصر—بل عليك أن تتحقق من <code>undefined</code> بنفسك.</p>
<h2 id="updateitem-التحديثات-الجزئية">UpdateItem: التحديثات الجزئية</h2>
<p>يعدّل <code>UpdateCommand</code> سمات محدّدة في عنصر موجود دون استبداله بأكمله. وهو يستخدم <strong>تعبيرات التحديث</strong>—لغة مصغّرة لوصف التغييرات التي تريد إجراءها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">UpdateCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">updateItemStatus</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">itemId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">status</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">Key</span>: {
        userId,
        itemId,
      },
      <span class="hljs-title class_">UpdateExpression</span>: <span class="hljs-string">&#x27;SET #status = :status, updatedAt = :updatedAt&#x27;</span>,
      <span class="hljs-title class_">ExpressionAttributeNames</span>: {
        <span class="hljs-string">&#x27;#status&#x27;</span>: <span class="hljs-string">&#x27;status&#x27;</span>,
      },
      <span class="hljs-title class_">ExpressionAttributeValues</span>: {
        <span class="hljs-string">&#x27;:status&#x27;</span>: status,
        <span class="hljs-string">&#x27;:updatedAt&#x27;</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
      },
      <span class="hljs-title class_">ReturnValues</span>: <span class="hljs-string">&#x27;ALL_NEW&#x27;</span>,
    }),
  );

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">Attributes</span>;
}
</code></pre>
<p><em>ملاحظة:</em> <code>ReturnValues: 'ALL_NEW'</code> يُرجع العنصر كاملًا بعد التحديث.</p>
<p>هذا أكثر إسهابًا من PutItem، لكن دعنا نمضي خلاله:</p>
<ul>
<li><strong><code>UpdateExpression</code></strong>: يصف ما يجب تغييره. و<code>SET</code> يعيّن القيم. ويمكنك أيضًا استخدام <code>REMOVE</code> لحذف السمات، و<code>ADD</code> لزيادة الأرقام، و<code>DELETE</code> لإزالة عناصر من المجموعات.</li>
<li><strong><code>ExpressionAttributeNames</code></strong>: يربط أسماء العناصر النائبة (المسبوقة بـ <code>#</code>) بأسماء السمات الفعلية. وتحتاج إليه من أجل <code>status</code> لأنه كلمة محجوزة في DynamoDB.</li>
<li><strong><code>ExpressionAttributeValues</code></strong>: يربط القيم النائبة (المسبوقة بـ <code>:</code>) بالقيم التي تريد تعيينها.</li>
<li><strong><code>ReturnValues</code></strong>: يتحكم بما يُعاد. فـ <code>ALL_NEW</code> يُرجع العنصر بأكمله بعد التحديث. ومن الخيارات الأخرى <code>NONE</code> (الافتراضي)، و<code>ALL_OLD</code>، و<code>UPDATED_OLD</code>، و<code>UPDATED_NEW</code>.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لدى DynamoDB أكثر من 500 كلمة محجوزة—منها كلمات شائعة مثل <code>status</code> و<code>name</code> و<code>data</code> و<code>type</code> و<code>count</code>. فإذا حصلت على <code>ValidationException</code> بشأن كلمات محجوزة، فغلّف اسم السمة في <code>ExpressionAttributeNames</code>. وعادة آمنة: استخدم دائمًا عناصر نائبة بـ <code>#</code> لأسماء السمات في التعبيرات.</p>
</blockquote>
<h2 id="الكتابات-الشرطية-القفل-المتفائل">الكتابات الشرطية (القفل المتفائل)</h2>
<p>يقبل كل من <code>PutCommand</code> و<code>UpdateCommand</code> تعبير <code>ConditionExpression</code> يفشل الكتابة إذا لم يتحقق شرط على العنصر. وهكذا تُنفّذ التزامن المتفائل: اقرأ عنصرًا، وتذكّر رقم إصداره، وعند الكتابة مرة أخرى، اشترط أن الإصدار ما زال مطابقًا.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Two users editing the same list. Fetch current version:</span>
<span class="hljs-keyword">const</span> current = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
    <span class="hljs-title class_">Key</span>: { userId, listId },
  }),
);
<span class="hljs-keyword">const</span> currentVersion = current.<span class="hljs-property">Item</span>?.<span class="hljs-property">version</span> ?? <span class="hljs-number">0</span>;

<span class="hljs-comment">// Write only if the version hasn&#x27;t changed since we read it:</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">UpdateCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
    <span class="hljs-title class_">Key</span>: { userId, listId },
    <span class="hljs-title class_">UpdateExpression</span>: <span class="hljs-string">&#x27;SET #n = :name, version = version + :inc&#x27;</span>,
    <span class="hljs-title class_">ConditionExpression</span>: <span class="hljs-string">&#x27;version = :expected&#x27;</span>,
    <span class="hljs-title class_">ExpressionAttributeNames</span>: { <span class="hljs-string">&#x27;#n&#x27;</span>: <span class="hljs-string">&#x27;name&#x27;</span> },
    <span class="hljs-title class_">ExpressionAttributeValues</span>: {
      <span class="hljs-string">&#x27;:name&#x27;</span>: <span class="hljs-string">&#x27;Updated name&#x27;</span>,
      <span class="hljs-string">&#x27;:inc&#x27;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&#x27;:expected&#x27;</span>: currentVersion,
    },
  }),
);
</code></pre>
<p>إذا حدّث كاتب آخر العنصر بين قراءتك وكتابتك، يفشل <code>ConditionExpression</code> وتُرجع DynamoDB <code>ConditionalCheckFailedException</code>. ويمكن لمعالجك التقاط ذلك، وإعادة القراءة، والمحاولة مجددًا—أو عرض 409 للعميل.</p>
<p>يغطي <code>ConditionExpression</code> أيضًا «أدرج فقط إذا لم يكن هذا العنصر موجودًا بالفعل» (<code>attribute_not_exists(userId)</code> على <code>PutCommand</code>)، ما يمنع طلبي POST متزامنين من إنشاء المورد نفسه بالمعرّف نفسه.</p>
<h2 id="deleteitem-إزالة-عنصر">DeleteItem: إزالة عنصر</h2>
<p>يزيل <code>DeleteCommand</code> عنصرًا بمفتاحه الأساسي.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DeleteCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">deleteItem</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">itemId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">DeleteCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">Key</span>: {
        userId,
        itemId,
      },
    }),
  );
}
</code></pre>
<p>إذا لم يكن العنصر موجودًا، ينجح <code>DeleteCommand</code> بصمت. لا خطأ ولا استثناء. وهذا عادةً ما تريده—فحذف شيء اختفى بالفعل ليس مشكلة.</p>
<h2 id="تجميع-كل-ذلك-في-معالج">تجميع كل ذلك في معالج</h2>
<blockquote>
<p><strong>تحذير</strong></p>
<p>في تطبيق حقيقي، لا تقبل <code>userId</code> أبدًا من معاملات الاستعلام—فأي مستدعٍ يمكنه تزويرها. اقرأه من <code>event.requestContext.authorizer?.jwt?.claims?.sub</code> بعد أن يتحقق مُوثِّق JWT (راجع <a href="https://stevekinney.com/courses/aws/api-gateway-authentication">مصادقة API Gateway</a>) من الرمز. ونحن نستخدم معاملات الاستعلام هنا كتبسيط تعليمي فقط.</p>
</blockquote>
<p>إليك معالجًا كاملًا يستخدم العمليات الأربع كلها، وموجّهًا حسب طريقة HTTP:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">DynamoDBDocumentClient</span>,
  <span class="hljs-title class_">PutCommand</span>,
  <span class="hljs-title class_">GetCommand</span>,
  <span class="hljs-title class_">UpdateCommand</span>,
  <span class="hljs-title class_">DeleteCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-title class_">DynamoDBDocumentClient</span>.<span class="hljs-title function_">from</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({}));
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TABLE_NAME</span> = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span> ?? <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;
  <span class="hljs-keyword">const</span> userId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">userId</span>;
  <span class="hljs-keyword">const</span> itemId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">itemId</span>;

  <span class="hljs-keyword">if</span> (!userId) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing userId parameter&#x27;</span> }),
    };
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;GET&#x27;</span>: {
        <span class="hljs-keyword">if</span> (!itemId) {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
            <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
            <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing itemId parameter&#x27;</span> }),
          };
        }

        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
            <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
            <span class="hljs-title class_">Key</span>: { userId, itemId },
          }),
        );

        <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">Item</span>) {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">statusCode</span>: <span class="hljs-number">404</span>,
            <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
            <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Item not found&#x27;</span> }),
          };
        }

        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
          <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
          <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result.<span class="hljs-property">Item</span>),
        };
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;POST&#x27;</span>: {
        <span class="hljs-keyword">const</span> body = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span> ?? <span class="hljs-string">&#x27;{}&#x27;</span>);
        <span class="hljs-keyword">const</span> newItemId = crypto.<span class="hljs-title function_">randomUUID</span>();

        <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutCommand</span>({
            <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
            <span class="hljs-title class_">Item</span>: {
              userId,
              <span class="hljs-attr">itemId</span>: newItemId,
              <span class="hljs-attr">title</span>: body.<span class="hljs-property">title</span> ?? <span class="hljs-string">&#x27;Untitled&#x27;</span>,
              <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span>,
              <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
            },
          }),
        );

        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">statusCode</span>: <span class="hljs-number">201</span>,
          <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
          <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ userId, <span class="hljs-attr">itemId</span>: newItemId }),
        };
      }

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;DELETE&#x27;</span>: {
        <span class="hljs-keyword">if</span> (!itemId) {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">statusCode</span>: <span class="hljs-number">400</span>,
            <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
            <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Missing itemId parameter&#x27;</span> }),
          };
        }

        <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
          <span class="hljs-keyword">new</span> <span class="hljs-title class_">DeleteCommand</span>({
            <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
            <span class="hljs-title class_">Key</span>: { userId, itemId },
          }),
        );

        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
          <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
          <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">deleted</span>: <span class="hljs-literal">true</span> }),
        };
      }

      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">statusCode</span>: <span class="hljs-number">405</span>,
          <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
          <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Method not allowed&#x27;</span> }),
        };
    }
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;DynamoDB error:&#x27;</span>, error);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Internal server error&#x27;</span> }),
    };
  }
};
</code></pre>
<p>نمط المعالج هذا—تحليل الطريقة، والتحقق من المعاملات، واستدعاء DynamoDB، وإرجاع استجابة—هو النمط نفسه الذي ستستخدمه لكل نقطة نهاية API مدعومة بـ Lambda.</p>
<h2 id="معدلات-الأداء">معدّلات الأداء</h2>
<p>خياران في <code>GetCommand</code> و<code>QueryCommand</code> يستحقّان المعرفة. لا تحتاج أيًّا منهما في التمرين، لكنهما يظهران أول مرة تهتم فيها بالكلفة أو الصحة على نطاق واسع.</p>
<p><strong><code>ProjectionExpression</code></strong> يخبر DynamoDB بالسمات التي يجب إرجاعها. فافتراضيًا، كل قراءة تعيد العنصر بأكمله—بما في ذلك سمات كبيرة مثل النصوص الطويلة أو الكائنات الثنائية أو JSON المتداخل. والإسقاط يضيّق الحمولة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
    <span class="hljs-title class_">Key</span>: { userId, itemId },
    <span class="hljs-title class_">ProjectionExpression</span>: <span class="hljs-string">&#x27;userId, itemId, #n&#x27;</span>,
    <span class="hljs-title class_">ExpressionAttributeNames</span>: { <span class="hljs-string">&#x27;#n&#x27;</span>: <span class="hljs-string">&#x27;name&#x27;</span> },
  }),
);
</code></pre>
<p>العنصر النائب <code>#n</code> ضروري لأن <code>name</code> كلمة محجوزة في DynamoDB—وقاعدة العناصر النائبة نفسها تنطبق على الإسقاطات كما تنطبق على تعبيرات التحديث. وشيء لا تشدّد عليه الوثائق: <code>ProjectionExpression</code> لا يقلّل رسوم RCU في <code>GetItem</code> (فـ DynamoDB تُفوتر بناءً على حجم العنصر لا الحجم المُعاد) ولا يقلّل RCU في <code>Query</code>/<code>Scan</code> أيضًا (فهي تُفوتر بالبيانات الممسوحة لا المسقَطة). وما <em>يفعله</em> هو تقليل البايتات المنقولة—وهو مفيد للعناصر الكبيرة على نطاق واسع، لا لتمرين تعليمي.</p>
<p><strong><code>ConsistentRead: true</code></strong> يفرض قراءة متسقة بقوة مضمونة لرؤية أحدث كتابة مُثبّتة. فافتراضيًا، تكون القراءات متسقة في النهاية: تنتشر الكتابة عبر التخزين الموزّع في DynamoDB في جزء من الثانية، وقد <em>تُرجع</em> قراءة خلال تلك النافذة القيمة السابقة. والقراءات القوية تكلف ضعف عدد وحدات RCU.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
    <span class="hljs-title class_">Key</span>: { userId, itemId },
    <span class="hljs-title class_">ConsistentRead</span>: <span class="hljs-literal">true</span>,
  }),
);
</code></pre>
<p>بالنسبة إلى واجهة API خلفية للواجهة الأمامية، الافتراضي (الاتساق في النهاية) هو ما تريده دائمًا تقريبًا—فاحتمال أن يقرأ المستخدم بياناته في المللي ثانية نفسها التي كتبها فيها منخفض، و404 مع إعادة المحاولة مقبول عادةً. ولا تلجأ إلى <code>ConsistentRead: true</code> إلا عندما يكتب طلب واحد عنصرًا ويقرأه في الوقت نفسه، ويجب أن تعكس القراءة الكتابة.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>نسيان مفتاح الفرز في GetItem أو DeleteItem.</strong> إذا كان جدولك ذا مفتاح مركّب، فيجب تقديم مفتاحي التقسيم والفرز. وتقديم مفتاح التقسيم وحده يُرجع <code>ValidationException</code>، لا قائمة بالعناصر المطابقة. ولجلب عدة عناصر بمفتاح التقسيم، استخدم Query (وسنغطيه في الدرس التالي).</p>
<p><strong>عدم معالجة <code>undefined</code> من GetItem.</strong> لا تُطلق DynamoDB خطأً عند غياب العنصر—بل تُرجع <code>undefined</code>. فإذا تلقّت واجهتك الأمامية استجابة 200 بلا بيانات ولم تتحقق من ذلك، فستقضي ساعة في تصحيح ما يبدو خطأً في التسلسل.</p>
<p><strong>حزم SDK.</strong> وقت التشغيل <code>nodejs22.x</code> يحزم AWS SDK v3، لذا يُحلّ <code>@aws-sdk/client-dynamodb</code> و<code>@aws-sdk/lib-dynamodb</code> في وقت التشغيل دون أن يكونا في ملف zip لديك. وللتعلم، هذا جيد. أما للإنتاج، فاحزم SDK بنفسك—فـ AWS تثبّت إصدارًا فرعيًا محدّدًا في وقت التشغيل (لا الأحدث)، وهو يختلف حسب المنطقة. والتحكم في الإصدار في <code>package.json</code> الخاص بك يعني أنك لن تُفاجأ أبدًا بتحديث وقت التشغيل.</p>
<p>الآن بعد أن تستطيع قراءة العناصر الفردية وكتابتها، فإن الخطوة التالية هي جلب عدة عناصر دفعة واحدة باستخدام Query وScan—ولماذا يجب أن تفضّل Query دائمًا تقريبًا.</p>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:l,headings:t,html:e};export{s as book,p as chapter,n as chapterTitle,c as default,t as headings,e as html,a as slug,l as title};
