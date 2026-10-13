const s="hono",a="getting-started",n="مقدمات",l="lambda-edge",p="Lambda@Edge",c=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-النشر",text:"3. النشر"},{depth:2,id:"الاستدعاء",text:"الاستدعاء"}],e=`<p><a href="https://aws.amazon.com/lambda/edge/">Lambda@Edge</a> هي منصة بدون خادم (serverless) من Amazon Web Services. تتيح لك تشغيل دوال Lambda في مواقع الحافة (edge locations) لـ Amazon CloudFront، مما يمكنك من تخصيص سلوكيات طلبات/استجابات HTTP.</p>
<p>يدعم Hono منصة Lambda@Edge مع بيئة Node.js 18+.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>عند إنشاء التطبيق على Lambda@Edge،
<a href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-cdk.html"><code>CDK</code></a>
مفيدة لإعداد الدوال مثل CloudFront و IAM Role و API Gateway وغيرها.</p>
<p>هيّئ مشروعك باستخدام <code>cdk</code> CLI.</p>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
npm i hono @hono/lambda-edge
<span class="hljs-built_in">mkdir</span> lambda
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
yarn add hono @hono/lambda-edge
<span class="hljs-built_in">mkdir</span> lambda
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
pnpm add hono @hono/lambda-edge
<span class="hljs-built_in">mkdir</span> lambda
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
cdk init app -l typescript
bun add hono @hono/lambda-edge
<span class="hljs-built_in">mkdir</span> lambda
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>lambda/index_edge.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/lambda-edge&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono on Lambda@Edge!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="3-النشر">3. النشر</h2>
<p>تعديل <code>bin/my-app.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-meta">#!/usr/bin/env node</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;source-map-support/register&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cdk <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MyAppStack</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../lib/my-app-stack&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> cdk.<span class="hljs-title class_">App</span>()
<span class="hljs-keyword">new</span> <span class="hljs-title class_">MyAppStack</span>(app, <span class="hljs-string">&#x27;MyAppStack&#x27;</span>, {
  <span class="hljs-attr">env</span>: {
    <span class="hljs-attr">account</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">CDK_DEFAULT_ACCOUNT</span>,
    <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span>,
  },
})
</code></pre>
<p>تعديل <code>lambda/cdk-stack.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Construct</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;constructs&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cdk <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cloudfront <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-cloudfront&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> origins <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-cloudfront-origins&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> lambda <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-lambda&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">NodejsFunction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-lambda-nodejs&#x27;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> s3 <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-cdk-lib/aws-s3&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyAppStack</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">cdk.Stack</span> {
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">edgeFn</span>: lambda.<span class="hljs-property">Function</span>

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">scope</span>: <span class="hljs-title class_">Construct</span>, <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">props</span>?: cdk.<span class="hljs-title class_">StackProps</span></span>) {
    <span class="hljs-variable language_">super</span>(scope, id, props)
    <span class="hljs-keyword">const</span> edgeFn = <span class="hljs-keyword">new</span> <span class="hljs-title class_">NodejsFunction</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;edgeViewer&#x27;</span>, {
      <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;lambda/index_edge.ts&#x27;</span>,
      <span class="hljs-attr">handler</span>: <span class="hljs-string">&#x27;handler&#x27;</span>,
      <span class="hljs-attr">runtime</span>: lambda.<span class="hljs-property">Runtime</span>.<span class="hljs-property">NODEJS_20_X</span>,
    })

    <span class="hljs-comment">// Upload any html</span>
    <span class="hljs-keyword">const</span> originBucket = <span class="hljs-keyword">new</span> s3.<span class="hljs-title class_">Bucket</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;originBucket&#x27;</span>)

    <span class="hljs-keyword">new</span> cloudfront.<span class="hljs-title class_">Distribution</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">&#x27;Cdn&#x27;</span>, {
      <span class="hljs-attr">defaultBehavior</span>: {
        <span class="hljs-attr">origin</span>: <span class="hljs-keyword">new</span> origins.<span class="hljs-title function_">S3Origin</span>(originBucket),
        <span class="hljs-attr">edgeLambdas</span>: [
          {
            <span class="hljs-attr">functionVersion</span>: edgeFn.<span class="hljs-property">currentVersion</span>,
            <span class="hljs-attr">eventType</span>: cloudfront.<span class="hljs-property">LambdaEdgeEventType</span>.<span class="hljs-property">VIEWER_REQUEST</span>,
          },
        ],
      },
    })
  }
}
</code></pre>
<p>أخيرًا، شغّل الأمر للنشر:</p>
<pre><code class="language-sh">cdk deploy
</code></pre>
<h2 id="الاستدعاء">الاستدعاء</h2>
<p>إذا كنت تريد إضافة المصادقة الأساسية (Basic Auth) ومواصلة معالجة الطلب بعد التحقق، يمكنك استخدام <code>c.env.callback()</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { basicAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/basic-auth&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Callback</span>, <span class="hljs-title class_">CloudFrontRequest</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/lambda-edge&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/lambda-edge&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">callback</span>: <span class="hljs-title class_">Callback</span>
  <span class="hljs-attr">request</span>: <span class="hljs-title class_">CloudFrontRequest</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">basicAuth</span>({
    <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;hono&#x27;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;acoolproject&#x27;</span>,
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  c.<span class="hljs-property">env</span>.<span class="hljs-title function_">callback</span>(<span class="hljs-literal">null</span>, c.<span class="hljs-property">env</span>.<span class="hljs-property">request</span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:c,html:e};export{s as book,a as chapter,n as chapterTitle,t as default,c as headings,e as html,l as slug,p as title};
