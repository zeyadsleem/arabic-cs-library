const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="dynamodb-querying-and-scanning",t="الاستعلام والمسح الضوئي في DynamoDB",l=[{depth:2,id:"query-الطريقة-الصحيحة-لقراءة-عناصر-متعددة",text:"Query: الطريقة الصحيحة لقراءة عناصر متعددة"},{depth:3,id:"شروط-مفتاح-الفرز",text:"شروط مفتاح الفرز"},{depth:3,id:"تصفية-النتائج",text:"تصفية النتائج"},{depth:3,id:"الترتيب-والتحديد",text:"الترتيب والتحديد"},{depth:2,id:"scan-قراءة-الجدول-بأكمله",text:"Scan: قراءة الجدول بأكمله"},{depth:3,id:"متى-يكون-scan-مقبولا",text:"متى يكون Scan مقبولًا"},{depth:2,id:"الترقيم-باستخدام-lastevaluatedkey",text:"الترقيم باستخدام LastEvaluatedKey"},{depth:2,id:"query-مقابل-scan-الملخص",text:"Query مقابل Scan: الملخّص"}],e=`<p>يجلب GetItem عنصرًا واحدًا بمفتاحه الأساسي الدقيق. لكن تطبيقات الواجهة الأمامية نادرًا ما تحتاج عنصرًا واحدًا في المرة—تحتاج إلى قائمة. «أرني كل عناصر هذا المستخدم». «أرني عناصر هذا المستخدم المنشأة بعد تاريخ معيّن». يمنحك DynamoDB أداتين لاسترجاع عناصر متعددة: <strong>Query</strong> و<strong>Scan</strong>. يبدوان متشابهين، لكنهما مختلفان جوهريًا في طريقة عملهما، وتكلفتهما، ومتى ينبغي استخدام كل منهما.</p>
<p>إن أردت صياغة AWS الدقيقة للمقايضة التي تجريها هنا، فأبقِ <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html">دليل Query في DynamoDB</a> و<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html">دليل Scan في DynamoDB</a> مفتوحين.</p>
<pre><code>flowchart LR
    Query[&quot;Query userId = user-123&quot;] --&gt; Partition[&quot;Read one matching partition&quot;]
    Partition --&gt; Results[&quot;Return sorted items&quot;]
    Scan[&quot;Scan table&quot;] --&gt; All[&quot;Read every partition&quot;]
    All --&gt; Filter[&quot;Filter after reading&quot;]
    Filter --&gt; Cost[&quot;Higher latency and read cost&quot;]
</code></pre>
<h2 id="query-الطريقة-الصحيحة-لقراءة-عناصر-متعددة">Query: الطريقة الصحيحة لقراءة عناصر متعددة</h2>
<p>يسترجع <strong>Query</strong> العناصر من قسم واحد. تحدد مفتاح القسم (وهو إلزامي) وتُصفّي اختياريًا بمفتاح الفرز. يعثر DynamoDB على القسم، ويقرأ العناصر داخله، ويعيدها—مرتبة مسبقًا حسب مفتاح الفرز.</p>
<p>هذا فعّال لأن DynamoDB يعرف بالضبط أين ينظر. لا يمسح الجدول بأكمله. يذهب مباشرة إلى القسم الذي حددته ويقرأ فقط العناصر المطابقة لشرط مفتاحك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBDocumentClient</span>, <span class="hljs-title class_">QueryCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-title class_">DynamoDBDocumentClient</span>.<span class="hljs-title function_">from</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({}));
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TABLE_NAME</span> = process.<span class="hljs-property">env</span>.<span class="hljs-property">TABLE_NAME</span> ?? <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getItemsForUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId&#x27;</span>,
      <span class="hljs-title class_">ExpressionAttributeValues</span>: {
        <span class="hljs-string">&#x27;:userId&#x27;</span>: userId,
      },
    }),
  );

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">Items</span> ?? [];
}
</code></pre>
<p><em>ملاحظة:</em> <code>Items</code> مصفوفة من كائنات JavaScript العادية، بفضل عميل المستندات.</p>
<p>إن <strong><code>KeyConditionExpression</code></strong> هو المعامل الحاسم. يحدد قيمة مفتاح القسم التي تريد الاستعلام عنها، ويقيّد مفتاح الفرز اختياريًا. يستخدم التعبير بنية العناصر النائبة نفسها التي رأيتها مع UpdateCommand—القيم المسبوقة بـ <code>:</code> تُعرّف في <code>ExpressionAttributeValues</code>.</p>
<h3 id="شروط-مفتاح-الفرز">شروط مفتاح الفرز</h3>
<p>يدعم مفتاح الفرز عدة معاملات مقارنة في تعبير شرط المفتاح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Items where itemId begins with a prefix</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
    <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId AND begins_with(itemId, :prefix)&#x27;</span>,
    <span class="hljs-title class_">ExpressionAttributeValues</span>: {
      <span class="hljs-string">&#x27;:userId&#x27;</span>: <span class="hljs-string">&#x27;user-123&#x27;</span>,
      <span class="hljs-string">&#x27;:prefix&#x27;</span>: <span class="hljs-string">&#x27;item-2026&#x27;</span>,
    },
  }),
);
</code></pre>
<p>معاملات مفتاح الفرز المتاحة:</p>
<table>
<thead>
<tr>
<th>المعامل</th>
<th>مثال</th>
<th>حالة الاستخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>=</code></td>
<td><code>itemId = :id</code></td>
<td>تطابق تام</td>
</tr>
<tr>
<td><code>&lt;</code>، <code>&lt;=</code>، <code>&gt;</code>، <code>&gt;=</code></td>
<td><code>createdAt &gt; :date</code></td>
<td>استعلامات نطاقية على الطوابع الزمنية</td>
</tr>
<tr>
<td><code>BETWEEN</code></td>
<td><code>itemId BETWEEN :start AND :end</code></td>
<td>نطاق بحدّين أدنى وأعلى</td>
</tr>
<tr>
<td><code>begins_with</code></td>
<td><code>begins_with(itemId, :prefix)</code></td>
<td>مطابقة البادئة</td>
</tr>
</tbody>
</table>
<p>تعمل هذه المعاملات على مفتاح الفرز فقط داخل <code>KeyConditionExpression</code>. أما مفتاح القسم فيجب أن يستخدم <code>=</code> دائمًا.</p>
<h3 id="تصفية-النتائج">تصفية النتائج</h3>
<p>أحيانًا تحتاج إلى التصفية بسمات ليست جزءًا من المفتاح. لهذا تضيف <strong><code>FilterExpression</code></strong>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getPendingItems</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId&#x27;</span>,
      <span class="hljs-title class_">FilterExpression</span>: <span class="hljs-string">&#x27;#status = :status&#x27;</span>,
      <span class="hljs-title class_">ExpressionAttributeNames</span>: {
        <span class="hljs-string">&#x27;#status&#x27;</span>: <span class="hljs-string">&#x27;status&#x27;</span>,
      },
      <span class="hljs-title class_">ExpressionAttributeValues</span>: {
        <span class="hljs-string">&#x27;:userId&#x27;</span>: userId,
        <span class="hljs-string">&#x27;:status&#x27;</span>: <span class="hljs-string">&#x27;pending&#x27;</span>,
      },
    }),
  );

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">Items</span> ?? [];
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تقلّل <code>FilterExpression</code> كمية البيانات التي يقرأها DynamoDB—إنها تقلّل فقط ما يعود في الاستجابة. يقرأ DynamoDB كل العناصر المطابقة لـ <code>KeyConditionExpression</code>، ثم يطبّق المرشح على النتائج. ما زلت تدفع ثمن القراءات. إذا كان في القسم 1,000 عنصر وطابق المرشح 10 عناصر، فأنت تُحاسَب على قراءة الألف كلها. المرشحات مفيدة لتقليل نقل الشبكة، لكنها ليست بديلًا عن تصميم مفاتيح جيد.</p>
</blockquote>
<h3 id="الترتيب-والتحديد">الترتيب والتحديد</h3>
<p>تُرتَّب العناصر داخل القسم تلقائيًا حسب مفتاح الفرز. يمكنك عكس الترتيب وتحديد عدد العناصر المعادة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getRecentItems</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId&#x27;</span>,
      <span class="hljs-title class_">ExpressionAttributeValues</span>: {
        <span class="hljs-string">&#x27;:userId&#x27;</span>: userId,
      },
      <span class="hljs-title class_">ScanIndexForward</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-title class_">Limit</span>: limit,
    }),
  );

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">Items</span> ?? [];
}
</code></pre>
<ul>
<li><strong><code>ScanIndexForward: false</code></strong> يعكس ترتيب الفرز (تنازليًا حسب مفتاح الفرز). القيمة الافتراضية هي <code>true</code> (تصاعديًا).</li>
<li><strong><code>Limit</code></strong> يحدّ عدد العناصر المعادة. ومع عكس ترتيب الفرز، يمنحك هذا «أحدث N عنصرًا»—وهو نمط تستخدمه تطبيقات الواجهة الأمامية باستمرار.</li>
</ul>
<h2 id="scan-قراءة-الجدول-بأكمله">Scan: قراءة الجدول بأكمله</h2>
<p>يقرأ <strong>Scan</strong> كل عنصر في الجدول، صفحة واحدة في المرة. وخلافًا لـ Query الذي يستهدف قسمًا معينًا، يفحص Scan كل عنصر على حدة ويطبّق مرشحًا على النتائج اختياريًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ScanCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-dynamodb&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getAllItems</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ScanCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
    }),
  );

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">Items</span> ?? [];
}
</code></pre>
<p>هذا يعمل، ولجدول فيه 50 عنصرًا أثناء التطوير، لا بأس به. لكن Scan له تكلفة تنمو خطيًا مع حجم الجدول:</p>
<ul>
<li>جدول فيه 100 عنصر: يقرأ Scan 100 عنصر. سريع ورخيص.</li>
<li>جدول فيه 100,000 عنصر: يقرأ Scan 100,000 عنصر. بطيء ومكلف.</li>
<li>جدول فيه 10 ملايين عنصر: يقرأ Scan 10 ملايين عنصر. بطيء جدًا ومكلف جدًا.</li>
</ul>
<p>يعتمد أداء Query على حجم القسم. ويعتمد أداء Scan على حجم الجدول. مع نمو جدولك، يبقى Query سريعًا ويصبح Scan أبطأ.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>قاعدة عملية مفيدة: إذا وجدت نفسك تمتدّ يدك إلى Scan، فاسأل هل سيتيح لك تصميم مفاتيح مختلف استخدام Query بدلًا منه. في معظم الحالات، الجواب هو نعم. Scan رائحة كود في DynamoDB—فهو يعني عادةً أن تصميم مفاتيحك لا يطابق أنماط وصولك.</p>
</blockquote>
<h3 id="متى-يكون-scan-مقبولا">متى يكون Scan مقبولًا</h3>
<p>Scan ليس خاطئًا دائمًا. تشمل حالات الاستخدام المعقولة:</p>
<ul>
<li><strong>أدوات الإدارة</strong> التي تحتاج إلى تصدير الجدول بأكمله أو تدقيقه</li>
<li><strong>الجداول الصغيرة</strong> (أقل من بضعة آلاف من العناصر) حيث تكون التكلفة ضئيلة</li>
<li><strong>ترحيل البيانات لمرة واحدة</strong> حيث تحتاج إلى لمس كل عنصر</li>
<li><strong>التطوير وتصحيح الأخطاء</strong>—مسح جدول فيه 20 عنصرًا تجريبيًا أمر لا بأس به</li>
</ul>
<p>بالنسبة لنقطة نهاية API في الواجهة الأمامية تعمل في كل طلب، يكاد Scan لا يكون الخيار الصحيح أبدًا.</p>
<h2 id="الترقيم-باستخدام-lastevaluatedkey">الترقيم باستخدام <code>LastEvaluatedKey</code></h2>
<p>يعيد كل من Query وScan 1 MB من البيانات كحد أقصى في كل طلب. إذا كانت هناك عناصر أخرى للقراءة، تتضمن الاستجابة <code>LastEvaluatedKey</code>—علامة مرجعية تخبر DynamoDB من أين يكمل في الطلب التالي.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getAllItemsForUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">allItems</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;[] = [];
  <span class="hljs-keyword">let</span> <span class="hljs-attr">lastKey</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt; | <span class="hljs-literal">undefined</span>;

  <span class="hljs-keyword">do</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
        <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
        <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId&#x27;</span>,
        <span class="hljs-title class_">ExpressionAttributeValues</span>: {
          <span class="hljs-string">&#x27;:userId&#x27;</span>: userId,
        },
        <span class="hljs-title class_">ExclusiveStartKey</span>: lastKey,
      }),
    );

    allItems.<span class="hljs-title function_">push</span>(...(result.<span class="hljs-property">Items</span> ?? []));
    lastKey = result.<span class="hljs-property">LastEvaluatedKey</span>;
  } <span class="hljs-keyword">while</span> (lastKey);

  <span class="hljs-keyword">return</span> allItems;
}
</code></pre>
<p>النمط:</p>
<ol>
<li>أرسل الطلب الأول دون <code>ExclusiveStartKey</code></li>
<li>إذا تضمنت الاستجابة <code>LastEvaluatedKey</code>، فأرسل طلبًا آخر بتلك القيمة كـ <code>ExclusiveStartKey</code></li>
<li>كرّر حتى تصبح <code>LastEvaluatedKey</code> غير معرّفة</li>
</ol>
<p>بالنسبة لواجهات API الأمامية، لا تريد عادةً ترقيم كل شيء—تريد إعادة صفحة من النتائج إلى العميل وتركه يطلب الصفحة التالية. يمكنك تمرير <code>LastEvaluatedKey</code> مرة أخرى إلى الواجهة الأمامية (بترميز base64) كمؤشر ترقيم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> userId = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">userId</span>;
  <span class="hljs-keyword">const</span> cursor = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">cursor</span>;

  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
      <span class="hljs-title class_">TableName</span>: <span class="hljs-variable constant_">TABLE_NAME</span>,
      <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;userId = :userId&#x27;</span>,
      <span class="hljs-title class_">ExpressionAttributeValues</span>: {
        <span class="hljs-string">&#x27;:userId&#x27;</span>: userId,
      },
      <span class="hljs-title class_">Limit</span>: <span class="hljs-number">20</span>,
      <span class="hljs-title class_">ExclusiveStartKey</span>: cursor ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-title function_">atob</span>(cursor)) : <span class="hljs-literal">undefined</span>,
    }),
  );

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-attr">items</span>: result.<span class="hljs-property">Items</span> ?? [],
      <span class="hljs-attr">nextCursor</span>: result.<span class="hljs-property">LastEvaluatedKey</span> ? <span class="hljs-title function_">btoa</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result.<span class="hljs-property">LastEvaluatedKey</span>)) : <span class="hljs-literal">null</span>,
    }),
  };
};
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>نمط الترقيم القائم على المؤشر شائع في واجهات API المدعومة بـ DynamoDB. يتلقى العميل <code>nextCursor</code> مع كل استجابة. وللحصول على الصفحة التالية، يدرج العميل <code>?cursor=...</code> في الطلب. عندما تكون <code>nextCursor</code> مساوية لـ <code>null</code>، لم تبقَ صفحات أخرى.</p>
</blockquote>
<h2 id="query-مقابل-scan-الملخص">Query مقابل Scan: الملخّص</h2>
<table>
<thead>
<tr>
<th></th>
<th>Query</th>
<th>Scan</th>
</tr>
</thead>
<tbody>
<tr>
<td>يقرأ</td>
<td>قسمًا واحدًا</td>
<td>الجدول بأكمله</td>
</tr>
<tr>
<td>المعاملات المطلوبة</td>
<td>مفتاح القسم</td>
<td>لا شيء</td>
</tr>
<tr>
<td>الأداء</td>
<td>ثابت وسريع</td>
<td>يتدهور مع حجم الجدول</td>
</tr>
<tr>
<td>التكلفة</td>
<td>تتناسب مع العناصر المطابقة</td>
<td>تتناسب مع حجم الجدول</td>
</tr>
<tr>
<td>يُستخدم لـ</td>
<td>نقاط نهاية التطبيق</td>
<td>أدوات الإدارة والترحيل</td>
</tr>
</tbody>
</table>
<p>صمّم مفاتيح جدولك حول Query. واستخدم Scan فقط عندما تحتاج حقًا إلى قراءة كل شيء. وجدت أنني إذا أُغريت باللجوء إلى Scan في كود الإنتاج، فهذا يعني دائمًا تقريبًا أنني بحاجة إلى إعادة التفكير في تصميم مفاتيحي.</p>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:l,html:e};export{s as book,p as chapter,n as chapterTitle,c as default,l as headings,e as html,a as slug,t as title};
