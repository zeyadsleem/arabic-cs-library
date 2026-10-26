const s="kinney",o="aws",a="نشر تطبيقات الويب على AWS",n="creating-an-http-api",t="إنشاء HTTP API",p=[{depth:2,id:"إنشاء-api",text:"إنشاء API"},{depth:2,id:"المرحلة-default",text:"المرحلة $default"},{depth:2,id:"تعبير-اختيار-المسار",text:"تعبير اختيار المسار"},{depth:2,id:"الإنشاء-السريع-الاختصار",text:"الإنشاء السريع: الاختصار"},{depth:2,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"التحقق-من-واجهتك",text:"التحقق من واجهتك"},{depth:2,id:"التنظيف",text:"التنظيف"}],e=`<p>اخترت HTTP APIs. الآن تحتاج إلى إنشاء واحدة. على Vercel، توجد نقطة نهاية API بمجرد إنشاء ملف في دليل <code>api/</code>. وعلى AWS، تُنشئ واجهة API صراحةً — مورد مسمّى بعنوان URL خاص وإعدادات خاصة ودورة حياة خاصة. والميزة أنك تتحكم في كل شيء. والعيب أنك <em>مضطر</em> إلى إنشاء كل شيء.</p>
<p>إذا أردت نسخة AWS الدقيقة من إعداد HTTP API أثناء القراءة، فأبقِ <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html">وثائق HTTP APIs</a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/create-api.html">مرجع أمر <code>aws apigatewayv2 create-api</code></a> مفتوحين.</p>
<p>الخبر السار: إنشاء HTTP API من CLI يتطلب أمرًا واحدًا.</p>
<h2 id="إنشاء-api">إنشاء API</h2>
<p>استخدم <code>aws apigatewayv2 create-api</code> لإنشاء HTTP API جديدة:</p>
<pre><code class="language-bash">aws apigatewayv2 create-api \\
  --name my-frontend-app-api \\
  --protocol-type HTTP \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن الاستجابة الحقول التي ستحتاجها لكل ما يلي:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ApiEndpoint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://abc123def4.execute-api.us-east-1.amazonaws.com&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ApiId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;abc123def4&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CreatedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00+00:00&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ProtocolType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;HTTP&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;RouteSelectionExpression&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${request.method} \${request.path}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أمران يستحقان الملاحظة هنا:</p>
<ul>
<li><strong><code>ApiId</code></strong>: هذا هو المعرّف الذي ستستخدمه في كل أمر لاحق. احفظه. فكل مسار وتكامل ومرحلة وإعداد نطاق يشير إلى هذا المعرّف.</li>
<li><strong><code>ApiEndpoint</code></strong>: هذا هو عنوان URL المولّد تلقائيًا الذي ستكون واجهتك متاحة عليه.</li>
</ul>
<p>في لوحة التحكم، تعرض صفحة <strong>Create API</strong> الاختيار بين HTTP API وWebSocket API وREST API منذ البداية — وHTTP API هو الخيار الصحيح لنقطة نهاية REST مدعومة بـ Lambda.</p>
<p>صفحة API Gateway Create API وهي تعرض خيارات HTTP API وWebSocket API وREST API مع أزرار Build. وهي تتبع النمط <code>https://{api-id}.execute-api.{region}.amazonaws.com</code>. وستستبدل هذا بنطاق مخصّص لاحقًا، لكنه يعمل فورًا للاختبار.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>احفظ <code>ApiId</code> في متغيّر صدفة كي تشير إليه في الأوامر اللاحقة دون نسخ ولصق:</p>
<pre><code class="language-bash">API_ID=<span class="hljs-string">&quot;abc123def4&quot;</span>
</code></pre>
</blockquote>
<h2 id="المرحلة-default">المرحلة <code>$default</code></h2>
<p>عندما تنشئ HTTP API باستخدام لوحة التحكم أو الإنشاء السريع (<code>--target</code>)، تنشئ API Gateway تلقائيًا <strong>مرحلة <code>$default</code></strong>. وعندما تبني API خطوة بخطوة من CLI (وهو ما نفعله في هذه الدورة)، فأنت بحاجة إلى إنشائها بنفسك:</p>
<pre><code class="language-bash">aws apigatewayv2 create-stage \\
  --api-id abc123def4 \\
  --stage-name <span class="hljs-string">&#x27;$default&#x27;</span> \\
  --auto-deploy \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>لمرحلة <code>$default</code> خاصيتان مهمتان:</p>
<ol>
<li><strong>النشر التلقائي ممكّن.</strong> فأي تغييرات تجريها على المسارات أو التكاملات أو الإعدادات تُنشر تلقائيًا. ولست بحاجة إلى تشغيل أمر نشر منفصل.</li>
<li><strong>لا بادئة مرحلة في عنوان URL.</strong> تقدّم مرحلة <code>$default</code> واجهتك عند جذر عنوان <code>ApiEndpoint</code>. فإذا كانت نقطة نهايتك <code>https://abc123def4.execute-api.us-east-1.amazonaws.com</code>، فالمسار <code>/items</code> متاح على <code>https://abc123def4.execute-api.us-east-1.amazonaws.com/items</code> — بلا بادئة <code>/prod</code> أو <code>/dev</code>.</li>
</ol>
<p>وهذا يختلف عن REST APIs، حيث يكون لديك دائمًا اسم مرحلة في عنوان URL (مثل <code>/prod/items</code>). وتحافظ مرحلة <code>$default</code> على نظافة عناوين URL وتطابق سلوك التوجيه الذي اعتدته من Vercel أو Netlify.</p>
<p>يمكنك التحقق من وجود المرحلة:</p>
<pre><code class="language-bash">aws apigatewayv2 get-stages \\
  --api-id abc123def4 \\
  --region us-east-1 \\
  --output json
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AutoDeploy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;CreatedDate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00+00:00&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;DefaultRouteSettings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;DetailedMetricsEnabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StageName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$default&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;StageVariables&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في لوحة التحكم، يعرض النقر على مرحلة <code>$default</code> <strong>Invoke URL</strong> — عنوان URL الأساسي لكل مساراتك.</p>
<p><img src="/arabic-cs-library/images/kinney/a7d91278d57741d1.webp" alt="صفحة تفاصيل مرحلة API Gateway وهي تعرض اسم المرحلة $default وعنوان URL للاستدعاء في منطقة us-east-1."></p>
<h2 id="تعبير-اختيار-المسار">تعبير اختيار المسار</h2>
<p>كان <code>RouteSelectionExpression</code> في مخرجات API هو <code>\${request.method} \${request.path}</code>. وهذا يخبر API Gateway كيف يطابق الطلبات الواردة مع المسارات. ولـ HTTP APIs، يكون هذا دائمًا <code>\${request.method} \${request.path}</code> — طريقة HTTP يتبعها المسار. ولا يمكنك تغييره، ولست بحاجة إلى ذلك.</p>
<p>عندما يأتي طلب، تقيّم API Gateway الطريقة والمسار مقابل مساراتك المعرّفة. فمفتاح مسار مثل <code>GET /items</code> يطابق طلبات GET إلى <code>/items</code>. ومفتاح مسار مثل <code>POST /items</code> يطابق طلبات POST إلى المسار نفسه. وإن لم يطابق أي مسار، يحصل الطلب على 404.</p>
<h2 id="الإنشاء-السريع-الاختصار">الإنشاء السريع: الاختصار</h2>
<p>إذا كان لديك دالة Lambda بالفعل وتريد تخطّي خطوتَي التكامل والمسار المنفصلتين (اللتين سنغطّيهما في الدرس التالي)، فيمكنك استخدام علم <code>--target</code> لإنشاء كل شيء بأمر واحد:</p>
<pre><code class="language-bash">aws apigatewayv2 create-api \\
  --name my-frontend-app-api \\
  --protocol-type HTTP \\
  --target arn:aws:lambda:us-east-1:123456789012:<span class="hljs-keyword">function</span>:my-frontend-app-api \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينشئ هذا واجهة API، ومسار التقاط شامل <code>$default</code>، وتكامل وكيل Lambda — كل ذلك في ضربة واحدة. وينشئ أيضًا مرحلة <code>$default</code> مع تمكين النشر التلقائي.</p>
<p>المشكلة: يربط الإنشاء السريع مسار التقاط شامل واحدًا (<code>$default</code>) يرسل كل طلب إلى دالة Lambda واحدة. وهذا مناسب لواجهات API البسيطة التي يتولى فيها معالجك التوجيه بنفسه، لكنه يمنحك تحكمًا أقل في الإعداد لكل مسار. وفي هذه الدورة، سننشئ المسارات والتكاملات صراحةً لتفهم كيف تترابط القطع.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا يمنح الإنشاء السريع API Gateway إذنًا لاستدعاء دالة Lambda تلقائيًا. فلا تزال بحاجة إلى تشغيل <code>aws lambda add-permission</code> بشكل منفصل، وهو ما نغطّيه في الدرس التالي. ومن دون ذلك الإذن، يُرجع كل طلب خطأ 500 برسالة «Internal Server Error» وبلا تفاصيل مفيدة.</p>
</blockquote>
<h2 id="باستخدام-sdk">باستخدام SDK</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> {
  <span class="hljs-title class_">ApiGatewayV2Client</span>,
  <span class="hljs-title class_">CreateApiCommand</span>,
  <span class="hljs-title class_">GetApiCommand</span>,
  <span class="hljs-title class_">GetApisCommand</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-apigatewayv2&#x27;</span>;

<span class="hljs-keyword">const</span> apigw = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiGatewayV2Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> created = <span class="hljs-keyword">await</span> apigw.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreateApiCommand</span>({
    <span class="hljs-title class_">Name</span>: <span class="hljs-string">&#x27;my-frontend-app-api&#x27;</span>,
    <span class="hljs-title class_">ProtocolType</span>: <span class="hljs-string">&#x27;HTTP&#x27;</span>,
    <span class="hljs-title class_">Description</span>: <span class="hljs-string">&#x27;HTTP API for the frontend&#x27;</span>,
    <span class="hljs-title class_">CorsConfiguration</span>: {
      <span class="hljs-title class_">AllowOrigins</span>: [<span class="hljs-string">&#x27;https://example.com&#x27;</span>],
      <span class="hljs-title class_">AllowMethods</span>: [<span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-string">&#x27;POST&#x27;</span>],
      <span class="hljs-title class_">AllowHeaders</span>: [<span class="hljs-string">&#x27;content-type&#x27;</span>],
    },
  }),
);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(created.<span class="hljs-property">ApiId</span>, created.<span class="hljs-property">ApiEndpoint</span>);
</code></pre>
<h2 id="التحقق-من-واجهتك">التحقق من واجهتك</h2>
<p>تحقّق من وجود API وافحص إعداداته في أي وقت:</p>
<pre><code class="language-bash">aws apigatewayv2 get-api \\
  --api-id abc123def4 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>إذا كانت لديك واجهات API متعددة وتحتاج إلى العثور على الصحيحة:</p>
<pre><code class="language-bash">aws apigatewayv2 get-apis \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>في هذه المرحلة، لديك HTTP API بمرحلة <code>$default</code> وعنوان URL مولّد تلقائيًا. ولا تملك واجهة API أي مسارات أو تكاملات بعد، لذا فإن الوصول إلى عنوان URL يُرجع استجابة <code>{&quot;message&quot;:&quot;Not Found&quot;}</code>. وهذا صحيح — فأنت لم تخبر API Gateway إلى أين يرسل الطلبات.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>إذا احتجت إلى البدء من جديد أو حذف واجهة API أنشأتها للاختبار:</p>
<pre><code class="language-bash">aws apigatewayv2 delete-api \\
  --api-id abc123def4 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يزيل هذا واجهة API وكل مساراتها وتكاملاتها ومراحلها. ولا تتأثر دالة Lambda — فهي لا تزال موجودة، لكن دون واجهة API أمامها.</p>
<p>واجهة API بلا مسارات هي واجهة API تُرجع 404 لكل شيء. في الدرس التالي، ستنشئ تكامل وكيل Lambda وتربط المسارات بدالة Lambda لديك بحيث تصل طلبات HTTP فعلًا إلى معالجك. وستمنح API Gateway أيضًا إذنًا لاستدعاء الدالة — وهي خطوة توقع الجميع تقريبًا في المرة الأولى.</p>
`,l={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:e};export{s as book,o as chapter,a as chapterTitle,l as default,p as headings,e as html,n as slug,t as title};
