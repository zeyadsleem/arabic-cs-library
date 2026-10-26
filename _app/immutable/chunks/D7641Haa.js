const s="kinney",o="aws",a="نشر تطبيقات الويب على AWS",n="lambda-function-solution",t="الحل",p=[{depth:2,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:2,id:"إعداد-المشروع",text:"إعداد المشروع"},{depth:3,id:"lambdatsconfigjson",text:"lambda/tsconfig.json"},{depth:3,id:"lambdapackagejson-قسم-scripts",text:"lambda/package.json (قسم scripts)"},{depth:2,id:"المعالج",text:"المعالج"},{depth:3,id:"lambdasrchandlerts",text:"lambda/src/handler.ts"},{depth:3,id:"البناء",text:"البناء"},{depth:2,id:"دور-التنفيذ",text:"دور التنفيذ"},{depth:3,id:"trust-policyjson",text:"trust-policy.json"},{depth:3,id:"إنشاء-الدور",text:"إنشاء الدور"},{depth:3,id:"إرفاق-سياسة-التنفيذ-الأساسية",text:"إرفاق سياسة التنفيذ الأساسية"},{depth:3,id:"التحقق-من-الدور",text:"التحقق من الدور"},{depth:2,id:"التغليف-والنشر",text:"التغليف والنشر"},{depth:3,id:"إنشاء-ملف-zip-للنشر",text:"إنشاء ملف zip للنشر"},{depth:3,id:"إنشاء-الدالة",text:"إنشاء الدالة"},{depth:3,id:"التحقق-من-وجود-الدالة",text:"التحقق من وجود الدالة"},{depth:2,id:"استدعاء-الدالة",text:"استدعاء الدالة"},{depth:3,id:"حدث-اختبار-مع-معامل-name",text:"حدث اختبار مع معامل name"},{depth:3,id:"حدث-اختبار-بدون-معامل-name",text:"حدث اختبار بدون معامل name"},{depth:2,id:"قراءة-السجلات",text:"قراءة السجلات"},{depth:3,id:"التحقق-من-وجود-مجموعة-السجلات",text:"التحقق من وجود مجموعة السجلات"},{depth:3,id:"قراءة-أحدث-أحداث-السجل",text:"قراءة أحدث أحداث السجل"},{depth:2,id:"هدف-إضافي-متغير-بيئة",text:"هدف إضافي: متغيّر بيئة"},{depth:3,id:"ضبط-متغير-البيئة",text:"ضبط متغيّر البيئة"},{depth:3,id:"تحديث-المعالج-لاستخدامه",text:"تحديث المعالج لاستخدامه"},{depth:3,id:"إعادة-البناء-وإعادة-النشر",text:"إعادة البناء وإعادة النشر"},{depth:3,id:"الاستدعاء-والتحقق",text:"الاستدعاء والتحقق"},{depth:2,id:"هدف-إضافي-قياس-البدء-البارد",text:"هدف إضافي: قياس البدء البارد"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>إليك الحل الكامل لكل خطوة، بما في ذلك كود المعالج، وسياسة الثقة، وكل أوامر CLI، والإخراج المتوقع في كل مرحلة.</p>
<h2 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h2>
<ul>
<li>دور التنفيذ وسياسة الثقة يحلّان مشكلتين مختلفتين: أحدهما يخبر Lambda أنها تستطيع افتراض الدور، والآخر يخبر الدور بما تستطيع الدالة فعله بعد ذلك.</li>
<li>حزم <code>dist/handler.js</code> في ملف zip للنشر يمنح Lambda بالضبط الملف التنفيذي الذي تتوقعه وقت التشغيل بدلًا من أن تطلب منها تحويل TypeScript نيابةً عنك.</li>
<li>استدعاء CLI وفحوص سجلات CloudWatch يثبتان كلا شقّي النظام: مسار الكود ومسار التشغيل.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا بدا إخراج وحدة التحكم أو CLI مختلفًا قليلًا عند تنفيذك لذلك، فأبقِ <a href="https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html">مرجع أمر <code>aws lambda create-function</code></a> و<a href="https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html">مرجع أمر <code>aws lambda update-function-code</code></a> مفتوحين.</p>
</blockquote>
<h2 id="إعداد-المشروع">إعداد المشروع <span class="content-anchor" id="project-setup"></span></h2>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p lambda/src
<span class="hljs-built_in">cd</span> lambda
npm init -y
npm install -D typescript @types/aws-lambda @types/node
</code></pre>
<h3 id="lambdatsconfigjson"><code>lambda/tsconfig.json</code></h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;commonjs&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declarationMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sourceMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="lambdapackagejson-قسم-scripts"><code>lambda/package.json</code> (قسم scripts)</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="المعالج">المعالج</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>جميع معالجات Lambda، وملفات <code>tsconfig.json</code>، وملفات JSON لأحداث الاختبار من هذه الدورة متوفرة في <a href="https://github.com/stevekinney/scratch-lab/tree/main/lambda">مستودع Scratch Lab</a>.</p>
</blockquote>
<h3 id="lambdasrchandlerts"><code>lambda/src/handler.ts</code></h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GreetingResponse</span> {
  <span class="hljs-attr">greeting</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> name = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">name</span> ?? <span class="hljs-string">&#x27;World&#x27;</span>;

  <span class="hljs-keyword">const</span> <span class="hljs-attr">response</span>: <span class="hljs-title class_">GreetingResponse</span> = {
    <span class="hljs-attr">greeting</span>: <span class="hljs-string">\`Hello, <span class="hljs-subst">\${name}</span>!\`</span>,
    <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
  };

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Greeting request:&#x27;</span>, { name, <span class="hljs-attr">timestamp</span>: response.<span class="hljs-property">timestamp</span> });

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(response),
  };
};
</code></pre>
<p><em>ملاحظة:</em> يتعامل العاملان <code>?.</code> و<code>??</code> مع الحالة التي تكون فيها <code>queryStringParameters</code> مساوية لـ <code>undefined</code>.</p>
<h3 id="البناء">البناء</h3>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
</code></pre>
<p>المتوقع: إنشاء <code>dist/handler.js</code>، و<code>dist/handler.js.map</code>، و<code>dist/handler.d.ts</code>، و<code>dist/handler.d.ts.map</code> من دون أخطاء.</p>
<h2 id="دور-التنفيذ">دور التنفيذ</h2>
<h3 id="trust-policyjson"><code>trust-policy.json</code></h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Service&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lambda.amazonaws.com&quot;</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إنشاء-الدور">إنشاء الدور</h3>
<pre><code class="language-bash">aws iam create-role \\
  --role-name my-frontend-app-lambda-role \\
  --assume-role-policy-document file://trust-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الإخراج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;RoleName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-lambda-role&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:role/my-frontend-app-lambda-role&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AssumeRolePolicyDocument&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Principal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;Service&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lambda.amazonaws.com&quot;</span>
          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sts:AssumeRole&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إرفاق-سياسة-التنفيذ-الأساسية">إرفاق سياسة التنفيذ الأساسية</h3>
<pre><code class="language-bash">aws iam attach-role-policy \\
  --role-name my-frontend-app-lambda-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="التحقق-من-الدور">التحقق من الدور</h3>
<pre><code class="language-bash">aws iam list-attached-role-policies \\
  --role-name my-frontend-app-lambda-role \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الإخراج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;AttachedPolicies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;PolicyName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AWSLambdaBasicExecutionRole&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;PolicyArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="التغليف-والنشر">التغليف والنشر</h2>
<h3 id="إنشاء-ملف-zip-للنشر">إنشاء ملف zip للنشر</h3>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda/dist
zip -r ../function.zip .
<span class="hljs-built_in">cd</span> ..
</code></pre>
<h3 id="إنشاء-الدالة">إنشاء الدالة</h3>
<pre><code class="language-bash">aws lambda create-function \\
  --function-name my-frontend-app-api \\
  --runtime nodejs22.x \\
  --architectures arm64 \\
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \\
  --handler handler.handler \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الإخراج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;FunctionName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;FunctionArn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Runtime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;nodejs22.x&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Architectures&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;arm64&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::123456789012:role/my-frontend-app-lambda-role&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Handler&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;handler.handler&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CodeSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1523</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Timeout&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;MemorySize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">128</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;LastUpdateStatus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Successful&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;State&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Active&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا ظهرت لك رسالة «The role defined for the function cannot be assumed by Lambda»، فانتظر 10-15 ثانية وحاول مرة أخرى. انتشار دور IAM متسق نهائيًا—فالدور موجود، لكن نقطة نهاية Lambda ربما لم تره بعد.</p>
</blockquote>
<h3 id="التحقق-من-وجود-الدالة">التحقق من وجود الدالة</h3>
<pre><code class="language-bash">aws lambda get-function \\
  --function-name my-frontend-app-api \\
  --region us-east-1 \\
  --output json
</code></pre>
<h2 id="استدعاء-الدالة">استدعاء الدالة</h2>
<h3 id="حدث-اختبار-مع-معامل-name">حدث اختبار مع معامل name</h3>
<p>احفظه باسم <code>test-event.json</code>:</p>
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
<p>استدعِ الدالة:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-event.json \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>إخراج الطرفية المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;StatusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;ExecutedVersion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$LATEST&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تحقق من الاستجابة:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>المتوقع (منسّق للقراءة):</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;statusCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Content-Type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/json&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;greeting\\&quot;:\\&quot;Hello, Lambda!\\&quot;,\\&quot;timestamp\\&quot;:\\&quot;2026-03-18T12:00:00.000Z\\&quot;}&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حقل <code>body</code> كائن JSON محوّل إلى سلسلة نصية. إذا حلّلته، فستحصل على:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;greeting&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Hello, Lambda!&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:00.000Z&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في وحدة التحكم، تُظهر علامة التبويب <strong>Test</strong> النتيجة نفسها مع حالة التنفيذ وجسم الاستجابة موسّعين.</p>
<p><img src="/arabic-cs-library/images/kinney/4fac9aa0efe62bc5.webp" alt="علامة تبويب Lambda Test تُظهر نتيجة التنفيذ بحالة Succeeded، مع statusCode 200 وجسم Hello from Lambda ظاهرًا في قسم Details."></p>
<h3 id="حدث-اختبار-بدون-معامل-name">حدث اختبار بدون معامل name</h3>
<p>احفظه باسم <code>test-event-no-name.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;requestContext&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;http&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;method&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/greeting&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استدعِ الدالة:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-event-no-name.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>الجسم المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;greeting&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Hello, World!&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:00:05.000Z&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تُستخدم القيمة الافتراضية <code>&quot;World&quot;</code> عندما تكون <code>queryStringParameters</code> مفقودة أو لا تتضمن <code>name</code>.</p>
<h2 id="قراءة-السجلات">قراءة السجلات</h2>
<h3 id="التحقق-من-وجود-مجموعة-السجلات">التحقق من وجود مجموعة السجلات</h3>
<pre><code class="language-bash">aws logs describe-log-groups \\
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>الإخراج المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;logGroups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;logGroupName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/aws/lambda/my-frontend-app-api&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;arn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:logs:us-east-1:123456789012:log-group:/aws/lambda/my-frontend-app-api:*&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;storedBytes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1234</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="قراءة-أحدث-أحداث-السجل">قراءة أحدث أحداث السجل</h3>
<pre><code class="language-bash">aws logs describe-log-streams \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --order-by LastEventTime \\
  --descending \\
  --<span class="hljs-built_in">limit</span> 1 \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>استخدم <code>logStreamName</code> من الاستجابة لجلب الأحداث:</p>
<pre><code class="language-bash">aws logs get-log-events \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --log-stream-name <span class="hljs-string">&quot;2026/03/18/[<span class="hljs-variable">$LATEST</span>]abcdef1234567890&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ينبغي أن ترى مدخلات سجل تتضمن:</p>
<ul>
<li><code>START RequestId: ...</code></li>
<li>إخراج <code>console.log</code> الخاص بك: <code>Greeting request: { name: 'Lambda', timestamp: '...' }</code></li>
<li><code>END RequestId: ...</code></li>
<li><code>REPORT RequestId: ... Duration: X.XX ms Billed Duration: XX ms Memory Size: 128 MB Max Memory Used: XX MB Init Duration: XXX.XX ms</code></li>
</ul>
<p>يظهر سطر <code>Init Duration</code> في استدعاءات البدء البارد فقط. إذا استدعيت الدالة مرة ثانية بسرعة، فلن يظهر—لأن الاستدعاء الثاني أعاد استخدام بيئة التنفيذ الدافئة.</p>
<h2 id="هدف-إضافي-متغير-بيئة">هدف إضافي: متغيّر بيئة</h2>
<h3 id="ضبط-متغير-البيئة">ضبط متغيّر البيئة</h3>
<pre><code class="language-bash">aws lambda update-function-configuration \\
  --function-name my-frontend-app-api \\
  --environment <span class="hljs-string">&#x27;Variables={GREETING_PREFIX=Howdy}&#x27;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="تحديث-المعالج-لاستخدامه">تحديث المعالج لاستخدامه</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GreetingResponse</span> {
  <span class="hljs-attr">greeting</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> prefix = process.<span class="hljs-property">env</span>.<span class="hljs-property">GREETING_PREFIX</span> ?? <span class="hljs-string">&#x27;Hello&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> name = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">name</span> ?? <span class="hljs-string">&#x27;World&#x27;</span>;

  <span class="hljs-keyword">const</span> <span class="hljs-attr">response</span>: <span class="hljs-title class_">GreetingResponse</span> = {
    <span class="hljs-attr">greeting</span>: <span class="hljs-string">\`<span class="hljs-subst">\${prefix}</span>, <span class="hljs-subst">\${name}</span>!\`</span>,
    <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
  };

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Greeting request:&#x27;</span>, { name, prefix, <span class="hljs-attr">timestamp</span>: response.<span class="hljs-property">timestamp</span> });

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(response),
  };
};
</code></pre>
<h3 id="إعادة-البناء-وإعادة-النشر">إعادة البناء وإعادة النشر</h3>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
<span class="hljs-built_in">cd</span> dist &amp;&amp; zip -r ../function.zip . &amp;&amp; <span class="hljs-built_in">cd</span> ..

aws lambda update-function-code \\
  --function-name my-frontend-app-api \\
  --zip-file fileb://function.zip \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="الاستدعاء-والتحقق">الاستدعاء والتحقق</h3>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-event.json \\
  --region us-east-1 \\
  --output json \\
  response.json

<span class="hljs-built_in">cat</span> response.json
</code></pre>
<p>الجسم المتوقع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;greeting&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Howdy, Lambda!&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2026-03-18T12:05:00.000Z&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تغيّرت بادئة التحية من <code>&quot;Hello&quot;</code> إلى <code>&quot;Howdy&quot;</code> من دون تغيير منطق الكود—فقط متغيّر البيئة.</p>
<h2 id="هدف-إضافي-قياس-البدء-البارد">هدف إضافي: قياس البدء البارد</h2>
<p>استدعِ الدالة مع تتبّع السجل:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-event.json \\
  --log-type Tail \\
  --region us-east-1 \\
  --output json \\
  response.json
</code></pre>
<p>تتضمن الاستجابة حقل <code>LogResult</code> يحتوي إخراج سجل مشفّرًا بـ base64. يمكنك التقاطه وفكّ ترميزه في استدعاء واحد باستبدال <code>--output json</code> بـ <code>--query 'LogResult' --output text</code> — فهذا يوجّه سلسلة السجل مباشرة إلى <code>base64 --decode</code>:</p>
<pre><code class="language-bash">aws lambda invoke \\
  --function-name my-frontend-app-api \\
  --cli-binary-format raw-in-base64-out \\
  --payload file://test-event.json \\
  --log-type Tail \\
  --region us-east-1 \\
  --query <span class="hljs-string">&#x27;LogResult&#x27;</span> \\
  --output text \\
  response.json | <span class="hljs-built_in">base64</span> --decode
</code></pre>
<p>يُكتب <code>response.json</code> رغم ذلك (فهو معامل ملف الإخراج الموضعي)، ويصل حقل <code>LogResult</code> إلى stdout من أجل الأنبوب.</p>
<p>في البدء البارد، يتضمن الإخراج:</p>
<pre><code>REPORT RequestId: abc-123 Duration: 12.34 ms Billed Duration: 13 ms
Memory Size: 128 MB Max Memory Used: 67 MB Init Duration: 198.45 ms
</code></pre>
<p>استدعِ الدالة فورًا مرة أخرى. يختفي حقل <code>Init Duration</code>—لأن الاستدعاء الثاني كان بدءًا دافئًا.</p>
<h2 id="التنظيف">التنظيف</h2>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>تُعاد دالة <code>my-frontend-app-api</code> ومجموعة سجلات CloudWatch الخاصة بها استخدامًا في بقية هذه الدورة—في أقسام API Gateway وDynamoDB وSecrets Manager وCloudWatch. لا تنظّف إلا إذا انتهيت من الدورة بالكامل.</p>
</blockquote>
<pre><code class="language-bash">aws lambda delete-function \\
  --function-name my-frontend-app-api \\
  --region us-east-1

<span class="hljs-comment"># The log group is NOT deleted automatically when the function is deleted</span>
aws logs delete-log-group \\
  --log-group-name /aws/lambda/my-frontend-app-api \\
  --region us-east-1
</code></pre>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:t,headings:p,html:l};export{s as book,o as chapter,a as chapterTitle,c as default,p as headings,l as html,n as slug,t as title};
