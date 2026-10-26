const s="kinney",p="aws",n="نشر تطبيقات الويب على AWS",a="dynamodb-tables-and-keys",t="الجداول ومفاتيح التقسيم ومفاتيح الفرز",e=[{depth:2,id:"مفاتيح-التقسيم-ومفاتيح-الفرز",text:"مفاتيح التقسيم ومفاتيح الفرز"},{depth:2,id:"الفهارس-الثانوية-العامة",text:"الفهارس الثانوية العامة"},{depth:2,id:"اختيار-مفاتيح-جيدة",text:"اختيار مفاتيح جيدة"},{depth:2,id:"إنشاء-جدول-باستخدام-cli",text:"إنشاء جدول باستخدام CLI"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"ملاحظة-حول-تعريفات-السمات",text:"ملاحظة حول تعريفات السمات"},{depth:2,id:"أنماط-تصميم-المفاتيح-لتطبيقات-الواجهة-الأمامية",text:"أنماط تصميم المفاتيح لتطبيقات الواجهة الأمامية"},{depth:3,id:"بيانات-مقيدة-بالمستخدم",text:"بيانات مقيّدة بالمستخدم"},{depth:3,id:"بيانات-مرتبة-حسب-الطابع-الزمني",text:"بيانات مرتّبة حسب الطابع الزمني"},{depth:3,id:"خلط-أنواع-الكيانات-تصميم-الجدول-الواحد",text:"خلط أنواع الكيانات (تصميم الجدول الواحد)"}],o=`<p>يحتاج كل جدول DynamoDB إلى مفتاح أساسي، والمفتاح الذي تختاره يحدد كيفية وصولك إلى بياناتك طوال عمر ذلك الجدول. ولا يمكنك تغيير المفتاح الأساسي للجدول بعد إنشائه. هذا هو أهم قرار تتخذه عند تصميم جدول DynamoDB، ويستحق أن تصيبه من البداية.</p>
<p>إن أردت الاطلاع على نسخة AWS من قواعد شكل الجدول أثناء قراءتك، فإن <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html">دليل المكوّنات الأساسية في DynamoDB</a> هو المرجع الرسمي.</p>
<p><img src="/arabic-cs-library/images/kinney/8ccb3cdfd8758f40.svg" alt="مخطط يوضح العناصر مجمّعة حسب مفتاح التقسيم ومرتّبة بمفتاح الفرز داخل كل مجموعة، وكيف يستهدف الاستعلام قسمًا واحدًا."></p>
<h2 id="مفاتيح-التقسيم-ومفاتيح-الفرز">مفاتيح التقسيم ومفاتيح الفرز</h2>
<p>يدعم DynamoDB نوعين من المفاتيح الأساسية:</p>
<p><strong>مفتاح أساسي بسيط (مفتاح التقسيم فقط).</strong> سمة واحدة تحدد كل عنصر بشكل فريد. ويستخدم DynamoDB قيمة مفتاح التقسيم لتحديد القسم الداخلي الذي يخزّن العنصر. وإذا كنت تبني جدولًا يُوصَل فيه إلى كل عنصر بمعرّف فريد—مثل جدول مستخدمين مفتاحه <code>userId</code>—فالمفتاح الأساسي البسيط كافٍ.</p>
<p><strong>مفتاح أساسي مركّب (مفتاح تقسيم + مفتاح فرز).</strong> سمتان تحددان كل عنصر بشكل فريد معًا. وتُخزَّن العناصر ذات <strong>مفتاح التقسيم</strong> نفسه معًا وتُرتَّب بـ <strong>مفتاح الفرز</strong>. وهذا يمكّن استعلامات النطاق: «أعطني كل العناصر التي لها مفتاح التقسيم هذا حيث يقع مفتاح الفرز بين هاتين القيمتين».</p>
<p>المفتاح المركّب هو حيث يصبح DynamoDB مثيرًا للاهتمام في تطبيقات الواجهة الأمامية. تخيّل جدولًا يخزّن عناصر لمستخدمين مختلفين:</p>
<table>
<thead>
<tr>
<th><code>userId</code> (مفتاح التقسيم)</th>
<th><code>itemId</code> (مفتاح الفرز)</th>
<th><code>title</code></th>
<th><code>status</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>user-123</code></td>
<td><code>item-001</code></td>
<td>النشر إلى S3</td>
<td>done</td>
</tr>
<tr>
<td><code>user-123</code></td>
<td><code>item-002</code></td>
<td>تهيئة CloudFront</td>
<td>in-progress</td>
</tr>
<tr>
<td><code>user-456</code></td>
<td><code>item-001</code></td>
<td>كتابة معالج Lambda</td>
<td>done</td>
</tr>
<tr>
<td><code>user-456</code></td>
<td><code>item-003</code></td>
<td>إعداد API Gateway</td>
<td>pending</td>
</tr>
</tbody>
</table>
<p>مع هذا التصميم، يمكنك:</p>
<ul>
<li>الحصول على عنصر محدد: مفتاح التقسيم <code>user-123</code> + مفتاح الفرز <code>item-001</code></li>
<li>الحصول على كل عناصر مستخدم: الاستعلام بمفتاح التقسيم <code>user-123</code> (يعيد العنصرين، مرتّبين بـ <code>itemId</code>)</li>
<li>الحصول على نطاق من العناصر: الاستعلام بمفتاح التقسيم <code>user-123</code> حيث يبدأ مفتاح الفرز بـ <code>item-00</code></li>
</ul>
<p>لا يمكنك الاستعلام بكفاءة عبر مفاتيح التقسيم—مثل «احصل على كل العناصر التي حالتها <code>done</code> لدى جميع المستخدمين». فهذا يتطلب <strong>مسحًا (scan)</strong> يقرأ كل عنصر في الجدول، أو فهرسًا ثانويًا. وهذه هي المقايضة التي تقبلها مع DynamoDB: أداء متوقع لأنماط وصولك الأساسية، على حساب المرونة في الاستعلامات التي لم تخطّط لها.</p>
<h2 id="الفهارس-الثانوية-العامة">الفهارس الثانوية العامة</h2>
<p>الإصلاح القياسي لعبارة «أحتاج إلى الاستعلام بسمة ليست مفتاح التقسيم» هو <strong>فهرس ثانوي عام (GSI)</strong>. فـGSI هو عرض ثانٍ للجدول نفسه بمخطط مفاتيح مختلف. ويُبقي DynamoDB الـGSI متزامنًا مع الجدول الأساسي تلقائيًا—فأنت لا تكتب إليه مباشرة؛ بل تنتشر الكتابات إلى الجدول الأساسي إليه.</p>
<p>لحالة «العثور على العناصر حسب الحالة عبر جميع المستخدمين»، أنشئ GSI مفتاحه <code>status</code>:</p>
<pre><code class="language-bash">aws dynamodb update-table \\
  --table-name my-frontend-app-data \\
  --attribute-definitions \\
    AttributeName=status,AttributeType=S \\
    AttributeName=updatedAt,AttributeType=S \\
  --global-secondary-index-updates <span class="hljs-string">&#x27;[
    {
      &quot;Create&quot;: {
        &quot;IndexName&quot;: &quot;status-updatedAt-index&quot;,
        &quot;KeySchema&quot;: [
          {&quot;AttributeName&quot;: &quot;status&quot;, &quot;KeyType&quot;: &quot;HASH&quot;},
          {&quot;AttributeName&quot;: &quot;updatedAt&quot;, &quot;KeyType&quot;: &quot;RANGE&quot;}
        ],
        &quot;Projection&quot;: {&quot;ProjectionType&quot;: &quot;ALL&quot;}
      }
    }
  ]&#x27;</span> \\
  --region us-east-1
</code></pre>
<p>ثم استعلم عنه بدلًا من الجدول الأساسي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span>,
    <span class="hljs-title class_">IndexName</span>: <span class="hljs-string">&#x27;status-updatedAt-index&#x27;</span>,
    <span class="hljs-title class_">KeyConditionExpression</span>: <span class="hljs-string">&#x27;#s = :s&#x27;</span>,
    <span class="hljs-title class_">ExpressionAttributeNames</span>: { <span class="hljs-string">&#x27;#s&#x27;</span>: <span class="hljs-string">&#x27;status&#x27;</span> },
    <span class="hljs-title class_">ExpressionAttributeValues</span>: { <span class="hljs-string">&#x27;:s&#x27;</span>: <span class="hljs-string">&#x27;done&#x27;</span> },
  }),
);
</code></pre>
<p>ثمة أمور قليلة تستحق معرفتها قبل أن تلجأ إلى GSI:</p>
<ul>
<li>الفهارس الثانوية العامة <strong>متسقة نهائيًا</strong> مع الجدول الأساسي. فالكتابة تظهر في الـGSI بعد بضعة أجزاء من الثانية، لا فورًا.</li>
<li>الفهارس الثانوية العامة <strong>تكلّف أكثر</strong>—تخزينًا (فالسمات المسقطة تتكرر) وسعة كتابة (فكل كتابة في الجدول الأساسي تنتشر).</li>
<li>يمكنك أن تملك حتى 20 فهرسًا ثانويًا عامًا لكل جدول، لكن إن احتجت أكثر من ثلاثة أو أربعة فأنت على الأرجح تصارع نموذج البيانات.</li>
<li>لا يمكن <em>إضافة</em> الفهارس الثانوية العامة إلا إلى جدول موجود؛ ولا يمكنك تحويل GSI إلى مفتاح أساسي. فصمّم من أجلها مسبقًا.</li>
</ul>
<p>القاعدة العامة: <strong>صمّم الجدول الأساسي حول نمط وصولك الأساسي الواحد، وأضف GSI لكل نمط وصول إضافي لا تستطيع تجنبه</strong>. ومحاضرة <a href="https://www.youtube.com/watch?v=HaEPXoXVf2k">تصميم DynamoDB بدءًا من أنماط الوصول</a> من Rick Houlihan هي التعمّق المرجعي في الموضوع.</p>
<h2 id="اختيار-مفاتيح-جيدة">اختيار مفاتيح جيدة</h2>
<p>القاعدة الذهبية لمفاتيح التقسيم: <strong>تعدّدية عالية مع توزيع متساوٍ</strong>. فكل قيمة فريدة لمفتاح التقسيم تُقابل قسمًا ماديًا في DynamoDB. وإذا كانت كل بياناتك تشترك في مفتاح التقسيم نفسه، فإنها كلها تهبط على القسم نفسه، فتصطدم بحدود معدّل النقل.</p>
<p>مفاتيح تقسيم جيدة:</p>
<ul>
<li><code>userId</code>—فريد لكل مستخدم، ويتوزع بالتساوي</li>
<li><code>orderId</code>—فريد لكل طلب، وبتعدّدية عالية</li>
<li>معرّفات UUID—أقصى تعدّدية بحكم التعريف</li>
</ul>
<p>مفاتيح تقسيم سيئة:</p>
<ul>
<li><code>status</code>—قيم محتملة قليلة فقط (<code>active</code>، <code>inactive</code>)، ما ينشئ أقسامًا ساخنة</li>
<li><code>country</code>—تعدّدية منخفضة، ومن المرجّح أن يكون بلد واحد فيه عناصر أكثر بكثير من غيره</li>
<li><code>date</code>—كل الكتابات في اليوم نفسه تصطدم بالقسم نفسه</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا كانت لديك خلفية في قواعد البيانات العلائقية، ففكّر في مفتاح التقسيم كالقيمة التي تصفّي بها عادةً في جملة <code>WHERE</code>. ومفتاح الفرز هو ما كنت ستستخدمه في <code>ORDER BY</code> داخل تلك المجموعة المصفّاة.</p>
</blockquote>
<h2 id="إنشاء-جدول-باستخدام-cli">إنشاء جدول باستخدام CLI</h2>
<p>أنشئ جدول <code>my-frontend-app-data</code> بمفتاح أساسي مركّب—<code>userId</code> مفتاحًا للتقسيم و<code>itemId</code> مفتاحًا للفرز:</p>
<pre><code class="language-bash">aws dynamodb create-table \\
  --table-name my-frontend-app-data \\
  --attribute-definitions \\
    AttributeName=userId,AttributeType=S \\
    AttributeName=itemId,AttributeType=S \\
  --key-schema \\
    AttributeName=userId,KeyType=HASH \\
    AttributeName=itemId,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لنفصّل ما يفعله كل معامل:</p>
<ul>
<li><strong><code>--table-name</code></strong>: اسم الجدول. وهكذا تشير إليه في شيفرة Lambda وسياسات IAM.</li>
<li><strong><code>--attribute-definitions</code></strong>: يعلن أنواع البيانات لسمات المفاتيح. و<code>S</code> تعني سلسلة نصية. ويدعم DynamoDB أيضًا <code>N</code> (رقم) و<code>B</code> (ثنائي)، لكن السلاسل النصية تغطي معظم حالات الواجهة الأمامية.</li>
<li><strong><code>--key-schema</code></strong>: يحدد السمات التي تشكّل المفتاح الأساسي. و<code>HASH</code> هو مفتاح التقسيم و<code>RANGE</code> هو مفتاح الفرز. (التسمية تأتي من آلية التجزئة الداخلية التي يستخدمها DynamoDB للتقسيم—وليست أكثر التسميات بداهة، أعلم.)</li>
<li><strong><code>--billing-mode PAY_PER_REQUEST</code></strong>: تسعير عند الطلب. تدفع مقابل كل قراءة وكتابة، دون تخطيط للسعة.</li>
</ul>
<p>تتضمن الاستجابة وصف الجدول:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;TableDescription&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;TableName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-data&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;TableStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;CREATING&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;KeySchema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AttributeName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;userId&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;KeyType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HASH&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;AttributeName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;itemId&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;KeyType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;RANGE&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;BillingModeSummary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;BillingMode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PAY_PER_REQUEST&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;TableArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لاحظ أن <code>TableStatus</code> هي <code>CREATING</code>. تستغرق جداول DynamoDB بضع ثوانٍ لتصبح نشطة. يمكنك التحقق من الحالة:</p>
<p>في وحدة التحكم، يعرض نموذج <strong>Create table</strong> اسم الجدول، ومفتاح التقسيم، وحقول مفتاح الفرز في قسم <strong>Table details</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/3ca88eca88ca1832.webp" alt="نموذج إنشاء الجدول في DynamoDB يعرض اسم الجدول frontend-items، ومفتاح التقسيم userId من النوع String، ومفتاح الفرز itemId من النوع String."></p>
<pre><code class="language-bash">aws dynamodb describe-table \\
  --table-name my-frontend-app-data \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Table.TableStatus&quot;</span>
</code></pre>
<p>انتظر حتى تتغيّر الحالة من <code>CREATING</code> إلى <code>ACTIVE</code> قبل كتابة البيانات.</p>
<p>وبمجرد أن تصبح ACTIVE، تعرض علامة التبويب <strong>Overview</strong> للجدول في وحدة التحكم مخطط المفاتيح، ووضع السعة، وحالة الجدول.</p>
<p><img src="/arabic-cs-library/images/kinney/9ade6688e335fc33.webp" alt="صفحة النظرة العامة لجدول DynamoDB تعرض جدول frontend-items مع مفتاح التقسيم userId، ومفتاح الفرز itemId، وحالة الجدول Active."></p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>المعامل <code>--attribute-definitions</code> يعرّف فقط السمات المستخدمة في مخطط المفاتيح (أو الفهارس الثانوية). أنت لا تعلن سمات غير مفتاحية هنا. فـDynamoDB بلا مخطط للسمات غير المفتاحية—يمكنك إضافة أي سمات تريدها عند كتابة العناصر. وهذا يربك القادمين من قواعد بيانات SQL الذين يتوقعون تعريف كل الأعمدة مسبقًا.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DynamoDBClient</span>, <span class="hljs-title class_">CreateTableCommand</span>, waitUntilTableExists } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-dynamodb&#x27;</span>;

<span class="hljs-keyword">const</span> ddb = <span class="hljs-keyword">new</span> <span class="hljs-title class_">DynamoDBClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">await</span> ddb.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateTableCommand</span>({
    <span class="hljs-title class_">TableName</span>: <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span>,
    <span class="hljs-title class_">AttributeDefinitions</span>: [
      { <span class="hljs-title class_">AttributeName</span>: <span class="hljs-string">&#x27;userId&#x27;</span>, <span class="hljs-title class_">AttributeType</span>: <span class="hljs-string">&#x27;S&#x27;</span> },
      { <span class="hljs-title class_">AttributeName</span>: <span class="hljs-string">&#x27;itemId&#x27;</span>, <span class="hljs-title class_">AttributeType</span>: <span class="hljs-string">&#x27;S&#x27;</span> },
    ],
    <span class="hljs-title class_">KeySchema</span>: [
      { <span class="hljs-title class_">AttributeName</span>: <span class="hljs-string">&#x27;userId&#x27;</span>, <span class="hljs-title class_">KeyType</span>: <span class="hljs-string">&#x27;HASH&#x27;</span> },
      { <span class="hljs-title class_">AttributeName</span>: <span class="hljs-string">&#x27;itemId&#x27;</span>, <span class="hljs-title class_">KeyType</span>: <span class="hljs-string">&#x27;RANGE&#x27;</span> },
    ],
    <span class="hljs-title class_">BillingMode</span>: <span class="hljs-string">&#x27;PAY_PER_REQUEST&#x27;</span>,
  }),
);

<span class="hljs-keyword">await</span> <span class="hljs-title function_">waitUntilTableExists</span>({ <span class="hljs-attr">client</span>: ddb, <span class="hljs-attr">maxWaitTime</span>: <span class="hljs-number">60</span> }, { <span class="hljs-title class_">TableName</span>: <span class="hljs-string">&#x27;my-frontend-app-data&#x27;</span> });
</code></pre>
<p>العمليات على مستوى العنصر (<code>PutItem</code>، و<code>GetItem</code>، و<code>UpdateItem</code>، و<code>DeleteItem</code>، و<code>Query</code>، و<code>Scan</code>) هي التي تلجأ إليها فعليًا من شيفرة التطبيق—وتلك الدروس (<a href="https://stevekinney.com/courses/aws/dynamodb-reading-and-writing-data">قراءة البيانات وكتابتها</a> و<a href="https://stevekinney.com/courses/aws/dynamodb-querying-and-scanning">الاستعلام والمسح</a>) تبدأ بـ SDK لأن هذه هي طريقة استخدامها في Lambda.</p>
<h2 id="ملاحظة-حول-تعريفات-السمات">ملاحظة حول تعريفات السمات</h2>
<p>من المُغري أن تسرد كل سمة ستكون في عناصرك في <code>--attribute-definitions</code>. لا تفعل ذلك. فـDynamoDB سيرفض طلبك إذا عرّفت سمات ليست جزءًا من أي مخطط مفاتيح أو فهرس. عرّف فقط السمات التي تشكّل مفاتيحك.</p>
<p>يمكن أن تحتوي عناصرك على أي عدد تريده من السمات الإضافية—<code>title</code>، و<code>status</code>، و<code>createdAt</code>، و<code>priority</code>—ولن تعلنها أبدًا في تعريف الجدول. بل تضمّنها فقط عند كتابة عنصر.</p>
<h2 id="أنماط-تصميم-المفاتيح-لتطبيقات-الواجهة-الأمامية">أنماط تصميم المفاتيح لتطبيقات الواجهة الأمامية</h2>
<p>إليك أنماطًا شائعة تعمل جيدًا مع خلفيات واجهات API الأمامية:</p>
<h3 id="بيانات-مقيدة-بالمستخدم">بيانات مقيّدة بالمستخدم</h3>
<p>مفتاح التقسيم: <code>userId</code>، مفتاح الفرز: <code>itemId</code></p>
<p>هذا هو النمط الذي تستخدمه لـ <code>my-frontend-app-data</code>. فعناصر كل مستخدم تُخزَّن معًا، ويمكنك الاستعلام بكفاءة عن كل عناصر مستخدم معيّن. وهذا يغطي نمط الوصول الأمامي الأكثر شيوعًا: «أرني أشيائي».</p>
<h3 id="بيانات-مرتبة-حسب-الطابع-الزمني">بيانات مرتّبة حسب الطابع الزمني</h3>
<p>مفتاح التقسيم: <code>userId</code>، مفتاح الفرز: <code>createdAt</code> (سلسلة ISO 8601)</p>
<p>تُرتَّب العناصر تلقائيًا حسب وقت الإنشاء. ويمكنك الاستعلام عن العناصر الحديثة لمستخدم بإضافة شرط على مفتاح الفرز: «أعطني عناصر <code>user-123</code> حيث <code>createdAt</code> أكبر من <code>2026-03-01</code>».</p>
<h3 id="خلط-أنواع-الكيانات-تصميم-الجدول-الواحد">خلط أنواع الكيانات (تصميم الجدول الواحد)</h3>
<p>مفتاح التقسيم: <code>pk</code>، مفتاح الفرز: <code>sk</code></p>
<p>يخزّن مستخدمو DynamoDB المتقدمون أحيانًا أنواع كيانات متعددة في جدول واحد باستخدام أسماء مفاتيح عامة. فأسماء المفاتيح العامة (<code>pk</code>، <code>sk</code>) تتيح لجدول واحد أن يحمل أنواع كيانات كثيرة في آن واحد: فسجل المستخدم يستخدم <code>pk = USER#user-123</code> و<code>sk = PROFILE</code>، بينما عناصر المستخدم نفسه تستخدم <code>pk = USER#user-123</code> و<code>sk = ITEM#item-456</code>. واستعلام <code>Query</code> واحد على <code>pk = USER#user-123</code> يجلب سجل المستخدم <em>و</em>كل عناصره في رحلة واحدة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تحتاج إلى تصميم الجدول الواحد في هذه الدورة—فالمفتاح المركّب <code>userId</code>/<code>itemId</code> هو كل ما تحتاجه. لكنك سترى نمط <code>pk</code>/<code>sk</code> باستمرار في شيفرة DynamoDB الإنتاجية، والآن تعرف لماذا سُمّيت المفاتيح بهذا القدر من التجريد: فهي عامة عن قصد حتى يستطيع جدول واحد أن يعني أشياء مختلفة لعناصر مختلفة.</p>
</blockquote>
<p>أصبح لديك جدول بمفتاح أساسي مركّب. في الخطوة التالية، ستكتب بيانات إليه وتقرأها مرة أخرى باستخدام AWS SDK v3 من TypeScript—اللغة نفسها التي كُتبت بها معالجات Lambda لديك.</p>
`,c={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:e,html:o};export{s as book,p as chapter,n as chapterTitle,c as default,e as headings,o as html,a as slug,t as title};
