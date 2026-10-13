const s="hono",a="getting-started",n="مقدمات",l="aws-lambda",p="AWS Lambda",t=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-النشر",text:"3. النشر"},{depth:2,id:"تقديم-البيانات-الثنائية",text:"تقديم البيانات الثنائية"},{depth:2,id:"الوصول-إلى-كائن-aws-lambda",text:"الوصول إلى كائن AWS Lambda"},{depth:2,id:"الوصول-إلى-requestcontext",text:"الوصول إلى RequestContext"},{depth:3,id:"قبل-الإصدار-v3100-مهمل",text:"قبل الإصدار v3.10.0 (مهمل)"},{depth:2,id:"بث-استجابات-lambda",text:"بث استجابات Lambda"}],e=`<p>AWS Lambda هي منصة بلا خوادم (serverless) من Amazon Web Services.
يمكنك تشغيل الكود الخاص بك استجابةً للأحداث، وتتم إدارة موارد الحوسبة الأساسية تلقائيًا نيابة عنك.</p>
<p>يعمل Hono على AWS Lambda مع بيئة Node.js 18+.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>عند إنشاء التطبيق على AWS Lambda،
<a href="https://docs.aws.amazon.com/cdk/v2/guide/home.html"><code>CDK</code></a>
مفيدة لإعداد الوظائف مثل دور IAM (IAM Role) و API Gateway وغيرها.</p>
<p>هيّئ مشروعك باستخدام <code>cdk</code> CLI.</p>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
npm i hono @hono/aws-lambda
npm i -D esbuild
<span class="hljs-built_in">mkdir</span> lambda
<span class="hljs-built_in">touch</span> lambda/index.ts
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
yarn add hono @hono/aws-lambda
yarn add -D esbuild
<span class="hljs-built_in">mkdir</span> lambda
<span class="hljs-built_in">touch</span> lambda/index.ts
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
pnpm add hono @hono/aws-lambda
pnpm add -D esbuild
<span class="hljs-built_in">mkdir</span> lambda
<span class="hljs-built_in">touch</span> lambda/index.ts
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
bun add hono @hono/aws-lambda
bun add -D esbuild
<span class="hljs-built_in">mkdir</span> lambda
<span class="hljs-built_in">touch</span> lambda/index.ts
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>lambda/index.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="3-النشر">3. النشر</h2>
<p>تعديل <code>lib/my-app-stack.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cdk <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Construct</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;constructs&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> lambda <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-lambda&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">NodejsFunction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-lambda-nodejs&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyAppStack</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">cdk.Stack</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">scope</span>: <span class="hljs-title class_">Construct</span>, <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">props</span>?: cdk.<span class="hljs-title class_">StackProps</span></span>) {
    <span class="hljs-variable language_">super</span>(scope, id, props)

    <span class="hljs-keyword">const</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-title class_">NodejsFunction</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;lambda&#x27;</span>, {
      <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;lambda/index.ts&#x27;</span>,
      <span class="hljs-attr">handler</span>: <span class="hljs-string">&#x27;handler&#x27;</span>,
      <span class="hljs-attr">runtime</span>: lambda.<span class="hljs-property">Runtime</span>.<span class="hljs-property">NODEJS_22_X</span>,
    })
    <span class="hljs-keyword">const</span> fnUrl = fn.<span class="hljs-title function_">addFunctionUrl</span>({
      <span class="hljs-attr">authType</span>: lambda.<span class="hljs-property">FunctionUrlAuthType</span>.<span class="hljs-property">NONE</span>,
    })
    <span class="hljs-keyword">new</span> cdk.<span class="hljs-title class_">CfnOutput</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;lambdaUrl&#x27;</span>, {
      <span class="hljs-attr">value</span>: fnUrl.<span class="hljs-property">url</span>!,
    })
  }
}
</code></pre>
<p>أخيرًا، شغّل الأمر للنشر:</p>
<pre><code class="language-sh">cdk deploy
</code></pre>
<h2 id="تقديم-البيانات-الثنائية">تقديم البيانات الثنائية</h2>
<p>يدعم Hono البيانات الثنائية كاستجابة.
في Lambda، يلزم ترميز base64 لإرجاع بيانات ثنائية (binary).
بمجرد تعيين النوع الثنائي إلى <code>Content-Type</code> الترويسة، يُرمّز Hono البيانات تلقائيًا إلى base64.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/binary&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-comment">// ...</span>
  c.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>)
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;image/png&#x27;</span>) <span class="hljs-comment">// means binary data</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">body</span>(buffer) <span class="hljs-comment">// supports \`ArrayBufferLike\` type, encoded to base64.</span>
})
</code></pre>
<h2 id="الوصول-إلى-كائن-aws-lambda">الوصول إلى كائن AWS Lambda</h2>
<p>في Hono، يمكنك الوصول إلى أحداث (Events) وسياق (Context) AWS Lambda عن طريق ربط <code>LambdaEvent</code>, <code>LambdaContext</code> النوع وباستخدام <code>c.env</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">LambdaEvent</span>, <span class="hljs-title class_">LambdaContext</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">event</span>: <span class="hljs-title class_">LambdaEvent</span>
  <span class="hljs-attr">lambdaContext</span>: <span class="hljs-title class_">LambdaContext</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/aws-lambda-info/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">isBase64Encoded</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">event</span>.<span class="hljs-property">isBase64Encoded</span>,
    <span class="hljs-attr">awsRequestId</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">lambdaContext</span>.<span class="hljs-property">awsRequestId</span>,
  })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="الوصول-إلى-requestcontext">الوصول إلى RequestContext</h2>
<p>في Hono، يمكنك الوصول إلى سياق طلب AWS Lambda عن طريق ربط <code>LambdaEvent</code> النوع وباستخدام <code>c.env.event.requestContext</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">LambdaEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">event</span>: <span class="hljs-title class_">LambdaEvent</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/custom-context/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> lambdaContext = c.<span class="hljs-property">env</span>.<span class="hljs-property">event</span>.<span class="hljs-property">requestContext</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(lambdaContext)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h3 id="قبل-الإصدار-v3100-مهمل">قبل الإصدار v3.10.0 (مهمل)</h3>
<p>يمكنك الوصول إلى سياق طلب AWS Lambda (request context) عبر ربط <code>ApiGatewayRequestContext</code> النوع وباستخدام <code>c.env.</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ApiGatewayRequestContext</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">requestContext</span>: <span class="hljs-title class_">ApiGatewayRequestContext</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/custom-context/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> lambdaContext = c.<span class="hljs-property">env</span>.<span class="hljs-property">requestContext</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(lambdaContext)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="بث-استجابات-lambda">بث استجابات Lambda</h2>
<p>عبر تغيير وضع الاستدعاء (invocation mode) في AWS Lambda، يمكنك تحقيق <a href="https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/">استجابة البث</a>.</p>
<pre><code class="language-diff">fn.addFunctionUrl({
  authType: lambda.FunctionUrlAuthType.NONE,
<span class="hljs-addition">+  invokeMode: lambda.InvokeMode.RESPONSE_STREAM,</span>
})
</code></pre>
<p>عادةً، يتطلب التنفيذ كتابة أجزاء (chunks) إلى NodeJS.WritableStream باستخدام awslambda.streamifyResponse، لكن مع محول AWS Lambda (AWS Lambda Adaptor)، يمكنك تحقيق استجابة البث التقليدية لـ Hono باستخدام streamHandle بدلًا من handle.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { streamHandle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>
<span class="hljs-keyword">import</span> { streamText } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/streaming&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/stream&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">streamText</span>(c, <span class="hljs-title function_">async</span> (stream) =&gt; {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {
      <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">writeln</span>(<span class="hljs-string">\`<span class="hljs-subst">\${i}</span>\`</span>)
      <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">sleep</span>(<span class="hljs-number">1</span>)
    }
  })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">streamHandle</span>(app)
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
