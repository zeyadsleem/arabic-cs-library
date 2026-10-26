const s="kinney",e="aws",a="نشر تطبيقات الويب على AWS",n="writing-a-lambda-handler",p="كتابة معالج Lambda في TypeScript",t=[{depth:2,id:"إعداد-المشروع",text:"إعداد المشروع"},{depth:2,id:"ملف-tsconfigjson",text:"ملف tsconfig.json"},{depth:2,id:"توقيع-المعالج",text:"توقيع المعالج"},{depth:3,id:"النوع-apigatewayproxyhandlerv2",text:"النوع: APIGatewayProxyHandlerV2"},{depth:3,id:"كائن-الحدث",text:"كائن الحدث"},{depth:3,id:"كائن-الاستجابة",text:"كائن الاستجابة"},{depth:2,id:"معالج-كامل",text:"معالج كامل"},{depth:2,id:"كائن-السياق",text:"كائن السياق"},{depth:2,id:"الترجمة-والبناء",text:"الترجمة والبناء"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"},{depth:2,id:"معالجة-الأخطاء-ودلالات-إعادة-المحاولة",text:"معالجة الأخطاء ودلالات إعادة المحاولة"}],l=`<p>أنت تعرف ما هو Lambda وكيف يعمل نموذج التنفيذ. الآن تحتاج إلى كتابة الشيفرة التي تشغّلها Lambda فعليًا. <strong>معالج</strong> Lambda هو مجرد دالة غير متزامنة مُصدَّرة بتوقيع محدّد — يستقبل حدثًا، وينفّذ بعض العمل، ويعيد استجابة. إذا سبق أن كتبت مسار API في Next.js أو دالة serverless في Vercel، فالشكل يكاد يكون متطابقًا.</p>
<p>إذا أردت نسخة AWS من عقد المعالج أمامك، فإن <a href="https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html">دليل معالجات Node.js في Lambda</a> هو المرجع الرسمي.</p>
<h2 id="إعداد-المشروع">إعداد المشروع <span class="content-anchor" id="project-setup"></span></h2>
<p>ابدأ بإنشاء دليل مشروع Lambda وتهيئته. هذا يتبع بنية المشروع المستخدمة في أعراف الدورة:</p>
<pre><code>my-frontend-app/
├── lambda/
│   ├── src/
│   │   └── handler.ts
│   ├── package.json
│   └── tsconfig.json
</code></pre>
<p>هيّئ المشروع وثبّت التبعيات:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p lambda/src
<span class="hljs-built_in">cd</span> lambda
npm init -y
npm install -D typescript @types/aws-lambda @types/node
</code></pre>
<p>التبعية الأساسية هنا هي <code>@types/aws-lambda</code> — توفّر هذه الحزمة تعريفات أنواع TypeScript لكل مصدر أحداث في Lambda. لن تثبّت AWS SDK كتبعية لأن Lambda توفّره في بيئة التنفيذ مسبقًا. تحتاج إلى الأنواع فقط.</p>
<h2 id="ملف-tsconfigjson">ملف tsconfig.json</h2>
<p>أنشئ ملف <code>tsconfig.json</code> في الدليل <code>lambda/</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;commonjs&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
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
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يستخدم وقت تشغيل Node.js 22 في Lambda نظام CommonJS افتراضيًا. إبقاء <code>&quot;module&quot;: &quot;commonjs&quot;</code> يبقي الأمور بسيطة. يمكنك استخدام ESM مع Lambda، لكنه يضيف عبئًا في التهيئة بلا فائدة عملية لمعظم دوال Lambda.</p>
</blockquote>
<h2 id="توقيع-المعالج">توقيع المعالج</h2>
<p>يتبع كل معالج Lambda النمط نفسه: دالة غير متزامنة مُصدَّرة تستقبل <code>event</code> وتعيد استجابة. يعتمد نوع الحدث على ما يشغّل الدالة. وبما أنك تبني خلفية API ستقف خلف API Gateway لاحقًا في الدورة، فستستخدم النوع <code>APIGatewayProxyHandlerV2</code>.</p>
<p>إليك المعالج الأدنى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hello from Lambda&#x27;</span> }),
  };
};
</code></pre>
<p>لنفصّل هذا.</p>
<h3 id="النوع-apigatewayproxyhandlerv2">النوع: <code>APIGatewayProxyHandlerV2</code></h3>
<p>يأتي هذا النوع من <code>@types/aws-lambda</code> ويخبر TypeScript بثلاثة أمور:</p>
<ol>
<li>المعامل <code>event</code> هو <code>APIGatewayProxyEventV2</code> — طلب HTTP من HTTP API في API Gateway.</li>
<li>نوع الإرجاع هو <code>APIGatewayProxyResultV2</code> — استجابة HTTP تحتوي على <code>statusCode</code> و<code>headers</code> و<code>body</code>.</li>
<li>المعالج غير متزامن ويعيد <code>Promise</code>.</li>
</ol>
<p>تشير “V2” في الاسم إلى HTTP API في API Gateway (النسخة الأحدث والأرخص والأسرع). يوجد أيضًا <code>APIGatewayProxyHandler</code> (بدون V2) لواجهة REST API الأقدم. تستخدم هذه الدورة HTTP APIs، لذا ستستخدم أنواع V2 في كل مكان.</p>
<h3 id="كائن-الحدث">كائن الحدث</h3>
<p>يحتوي كائن <code>event</code> على كل ما يتعلق بطلب HTTP الوارد. إليك الحقول التي ستستخدمها أكثر من غيرها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;
  <span class="hljs-keyword">const</span> path = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">path</span>;
  <span class="hljs-keyword">const</span> queryParams = event.<span class="hljs-property">queryStringParameters</span>;
  <span class="hljs-keyword">const</span> body = event.<span class="hljs-property">body</span> ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(event.<span class="hljs-property">body</span>) : <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">const</span> headers = event.<span class="hljs-property">headers</span>;

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      method,
      path,
      queryParams,
      <span class="hljs-attr">receivedBody</span>: body,
    }),
  };
};
</code></pre>
<p><em>ملاحظة:</em> طريقة HTTP مضمّنة داخل <code>requestContext</code>، وليست في المستوى الأعلى.</p>
<p><em>ملاحظة:</em> <code>event.body</code> دائمًا سلسلة نصية — تحتاج إلى تحليلها بنفسك.</p>
<h3 id="كائن-الاستجابة">كائن الاستجابة</h3>
<p>يجب أن تتضمّن الاستجابة <code>statusCode</code> و<code>body</code>. ويجب أن يكون <code>body</code> سلسلة نصية — فإن كنت تعيد JSON، فأنت بحاجة إلى <code>JSON.stringify</code> بنفسك. كائن <code>headers</code> اختياري لكن يجب أن تضبط <code>Content-Type</code> دائمًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">return</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
    <span class="hljs-string">&#x27;Cache-Control&#x27;</span>: <span class="hljs-string">&#x27;no-cache&#x27;</span>,
  },
  <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hello from Lambda&#x27;</span> }),
};
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>إذا نسيت استخدام <code>JSON.stringify</code> على الجسم، فستستدعي Lambda <code>.toString()</code> على الكائن الذي تمرّره، وستعيد واجهة API لديك <code>[object Object]</code> بدلًا من JSON. هذا من أكثر أخطاء Lambda شيوعًا.</p>
</blockquote>
<h2 id="معالج-كامل">معالج كامل</h2>
<p>إليك معالجًا أكثر واقعية يوضّح تحليل معاملات الاستعلام، والتعامل مع طرق HTTP المختلفة، وإعادة استجابات خطأ مناسبة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GreetingResponse</span> {
  <span class="hljs-attr">greeting</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorResponse</span> {
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> method = event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">http</span>.<span class="hljs-property">method</span>;

  <span class="hljs-keyword">if</span> (method !== <span class="hljs-string">&#x27;GET&#x27;</span>) {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">errorResponse</span>: <span class="hljs-title class_">ErrorResponse</span> = { <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Method not allowed&#x27;</span> };

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">405</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(errorResponse),
    };
  }

  <span class="hljs-keyword">const</span> name = event.<span class="hljs-property">queryStringParameters</span>?.<span class="hljs-property">name</span> ?? <span class="hljs-string">&#x27;World&#x27;</span>;

  <span class="hljs-keyword">const</span> <span class="hljs-attr">response</span>: <span class="hljs-title class_">GreetingResponse</span> = {
    <span class="hljs-attr">greeting</span>: <span class="hljs-string">\`Hello, <span class="hljs-subst">\${name}</span>!\`</span>,
    <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toISOString</span>(),
  };

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(response),
  };
};
</code></pre>
<p><em>ملاحظة:</em> يتعامل العامل <code>??</code> مع معاملات الاستعلام المفقودة وتلك التي قيمتها <code>undefined</code> على حد سواء.</p>
<p>هذا المعالج:</p>
<ul>
<li>يفحص طريقة HTTP ويعيد 405 إذا لم يكن الطلب من نوع GET</li>
<li>يقرأ معامل الاستعلام <code>name</code>، ويستخدم “World” كقيمة افتراضية</li>
<li>يعيد استجابة JSON تحتوي على تحية وطابع زمني</li>
</ul>
<h2 id="كائن-السياق">كائن السياق</h2>
<p>يستقبل المعالج أيضًا وسيطًا ثانيًا: كائن <strong>السياق</strong>. يحتوي على بيانات وصفية عن الاستدعاء نفسه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event, context) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Request ID:&#x27;</span>, context.<span class="hljs-property">awsRequestId</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Function name:&#x27;</span>, context.<span class="hljs-property">functionName</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Remaining time:&#x27;</span>, context.<span class="hljs-title function_">getRemainingTimeInMillis</span>(), <span class="hljs-string">&#x27;ms&#x27;</span>);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">requestId</span>: context.<span class="hljs-property">awsRequestId</span> }),
  };
};
</code></pre>
<p>الحقول الأكثر فائدة:</p>
<ul>
<li><strong><code>awsRequestId</code></strong>: معرّف فريد لهذا الاستدعاء. أدرجه في استجابات الخطأ حتى تتمكّن من العثور على مدخل السجل المقابل.</li>
<li><strong><code>functionName</code></strong>: اسم الدالة التي يجري استدعاؤها.</li>
<li><strong><code>getRemainingTimeInMillis()</code></strong>: مقدار الوقت المتبقي قبل أن تُنهي Lambda دالتك. مفيد إذا احتجت إلى الخروج من عملية طويلة بلطف.</li>
</ul>
<p>لن تستخدم كائن السياق في كل معالج، لكن من الجيد أن تعرف أنه موجود.</p>
<h2 id="الترجمة-والبناء">الترجمة والبناء</h2>
<p>أضف نصًا برمجيًا للبناء إلى <code>lambda/package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>شغّل البناء:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cd</span> lambda
npm run build
</code></pre>
<p>يترجم TypeScript الملف <code>src/handler.ts</code> إلى <code>dist/handler.js</code>. ملف JavaScript المترجم هو ما تشغّله Lambda فعليًا. في الدرس التالي، ستحزم هذا الناتج في ملف zip وتنشره.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>إعادة كائن بدلًا من جسم محوّل إلى سلسلة نصية.</strong> تتوقّع Lambda أن يكون <code>body</code> سلسلة نصية. إذا مرّرت كائنًا، فستتشوّه الاستجابة. لقد أهدرت وقتًا على هذا الخطأ أكثر مما أود الاعتراف به.</p>
<p><strong>نسيان معالجة الحقول المفقودة.</strong> يمكن أن تكون معاملات الاستعلام والترويسات وجسم الطلب جميعًا <code>undefined</code>. يساعد TypeScript هنا — يعلّم النوع <code>APIGatewayProxyEventV2</code> هذه الحقول كاختيارية، لذا سيحذّرك المترجم إذا وصلت إليها دون فحص.</p>
<p><strong>استخدام callbacks بدلًا من async/await.</strong> تدعم Lambda النمطين، لكن نمط callback (<code>callback(null, response)</code>) من بقايا عصر Node.js 6. استخدم معالجات async. فهي أنظف، وتعمل مع try/catch، وهي ما تتوقّعه الأنواع.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تتضمّن حزمة <code>@types/aws-lambda</code> أنواعًا لكل مصدر أحداث في Lambda: أحداث S3، وتدفقات DynamoDB، ورسائل SNS، وطلبات CloudFront، وغيرها. ورغم أن هذه الدورة تركّز على أحداث API Gateway، ينطبق النمط نفسه على جميعها: استورد نوع المعالج المناسب، وسيخبرك TypeScript بالضبط كيف يبدو الحدث.</p>
</blockquote>
<h2 id="معالجة-الأخطاء-ودلالات-إعادة-المحاولة">معالجة الأخطاء ودلالات إعادة المحاولة</h2>
<p>تعتمد طريقة تعامل Lambda مع الأخطاء المرمية كليًا على <em>من استدعى الدالة</em> — وهذا ما يربك الناس لأن القواعد ليست واضحة من منظور المعالج.</p>
<ul>
<li><strong>الاستدعاءات المتزامنة</strong> (API Gateway، وعناوين URL للدوال، واستدعاءات <code>invoke</code> المباشرة): إذا رمى معالجك استثناءً، تُظهر Lambda الاستثناء للمستدعي. ويعيد API Gateway استجابة 5xx إلى المتصفح. وLambda <strong>لا</strong> تعيد المحاولة. المعالج مسؤول عن منطق إعادة المحاولة الخاص به.</li>
<li><strong>الاستدعاءات غير المتزامنة</strong> (أحداث S3، وSNS، وEventBridge): تعيد Lambda تلقائيًا محاولة الاستدعاء الفاشل <strong>مرتين</strong> (محاولتان إضافيتان، ثلاث محاولات إجمالًا)، مع تأخير أُسّي. إذا فشلت المحاولات الثلاث كلها، فإما يُسقَط الحدث أو يُرسَل إلى <strong>وجهة</strong> أو <strong>قائمة انتظار الرسائل الميتة (DLQ)</strong> إذا كانت مهيأة.</li>
<li><strong>الاستدعاءات القائمة على التدفقات</strong> (DynamoDB Streams، وKinesis): تعيد Lambda المحاولة <em>بلا نهاية</em> على الدفعة الفاشلة حتى تنجح أو يتقادم السجل ويخرج من التدفق — إلا إذا ضبطت <code>MaximumRetryAttempts</code> و<code>MaximumRecordAgeInSeconds</code> في تعيين مصدر الحدث. يمكن لسجل سام أن يعطّل شريحة إلى الأبد إذا لم تضبط ذلك.</li>
</ul>
<p>بالنسبة إلى أحمال العمل غير المتزامنة، هيّئ دائمًا DLQ أو وجهة فشل حتى لا تفقد الأحداث بصمت:</p>
<pre><code class="language-bash">aws lambda put-function-event-invoke-config \\
  --function-name my-worker \\
  --destination-config <span class="hljs-string">&#x27;{&quot;OnFailure&quot;:{&quot;Destination&quot;:&quot;arn:aws:sqs:us-east-1:123456789012:my-worker-dlq&quot;}}&#x27;</span> \\
  --region us-east-1
</code></pre>
<p>في شيفرة المعالج، فضّل التقاط الأخطاء المتوقعة وإعادة استجابة منظّمة بدلًا من تركها تُرمى. الرمي مخصّص للإخفاقات غير المتوقعة حقًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">doWork</span>(event);
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">statusCode</span>: <span class="hljs-number">200</span>, <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data) };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;handler error&#x27;</span>, { error, <span class="hljs-attr">awsRequestId</span>: event.<span class="hljs-property">requestContext</span>.<span class="hljs-property">requestId</span> });
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">500</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;internal server error&#x27;</span> }),
    };
  }
};
</code></pre>
<p>أصبح لديك معالج TypeScript مترجم جاهز. قبل أن تتمكّن من نشره، تحتاج إلى دور تنفيذ IAM — الدور الذي تفترضه Lambda عند تشغيل دالتك. يحدّد ذلك الدور خدمات AWS التي يمكن لدالتك الوصول إليها. ستنشئ واحدًا في الدرس التالي، بناءً على مفاهيم IAM من <a href="https://stevekinney.com/courses/aws/iam-mental-model">نموذج IAM الذهني</a>.</p>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:p,headings:t,html:l};export{s as book,e as chapter,a as chapterTitle,c as default,t as headings,l as html,n as slug,p as title};
