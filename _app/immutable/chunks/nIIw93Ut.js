const s="hono",e="api",a="مرجع الواجهة",n="hono",p="App - Hono",l=[{depth:2,id:"الطرق",text:"الطرق"},{depth:2,id:"غير-موجود",text:"غير موجود"},{depth:2,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"},{depth:2,id:"fire",text:"fire()"},{depth:2,id:"fetch",text:"fetch()"},{depth:2,id:"request",text:"request()"},{depth:2,id:"mount",text:"mount()"},{depth:2,id:"الوضع-الصارم",text:"الوضع الصارم"},{depth:2,id:"خيار-router",text:"خيار router"},{depth:2,id:"الأنواع-العامة",text:"الأنواع العامة"}],t=`<p><code>Hono</code> هو الكائن الأساسي.
سيتم استيراده أولًا واستخدامه حتى النهاية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">//...</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app <span class="hljs-comment">// for Cloudflare Workers or Bun</span>
</code></pre>
<h2 id="الطرق">الطرق</h2>
<p>نسخة من <code>Hono</code> يمتلك الدوال التالية.</p>
<ul>
<li>app.<strong>HTTP_METHOD</strong>(<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>p</mi><mi>a</mi><mi>t</mi><mi>h</mi><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">path,</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mpunct">,</span></span></span></span></span>handler|middleware...)</li>
<li>app.<strong>all</strong>(<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>p</mi><mi>a</mi><mi>t</mi><mi>h</mi><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">path,</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mpunct">,</span></span></span></span></span>handler|middleware...)</li>
<li>app.<strong>on</strong>(method|method[], path|path[], handler|middleware...)</li>
<li>app.<strong>use</strong>(<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>p</mi><mi>a</mi><mi>t</mi><mi>h</mi><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">path,</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">h</span><span class="mpunct">,</span></span></span></span></span>middleware)</li>
<li>app.<strong>route</strong>(path, <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>a</mi><mi>p</mi><mi>p</mi></mrow><annotation encoding="application/x-tex">app</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal">pp</span></span></span></span></span>)</li>
<li>app.<strong>basePath</strong>(path)</li>
<li>app.<strong>notFound</strong>(handler)</li>
<li>app.<strong>onError</strong>(err, handler)</li>
<li>app.<strong>mount</strong>(path, anotherApp, <span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>o</mi><mi>p</mi><mi>t</mi><mi>i</mi><mi>o</mi><mi>n</mi><mi>s</mi></mrow><annotation encoding="application/x-tex">options</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal">pt</span><span class="mord mathnormal">i</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal">s</span></span></span></span></span>)</li>
<li>app.<strong>fire</strong>()</li>
<li>app.<strong>fetch</strong>(request, env, event)</li>
<li>app.<strong>request</strong>(path, options)</li>
</ul>
<p>الجزء الأول منها يُستخدم للتوجيه (routing)، يُرجى الرجوع إلى <a href="https://hono.dev/docs/api/routing">قسم التوجيه</a>.</p>
<h2 id="غير-موجود">غير موجود</h2>
<p><code>app.notFound</code> يتيح لك تخصيص استجابة Not Found.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">notFound</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Custom 404 Message&#x27;</span>, <span class="hljs-number">404</span>)
})
</code></pre>
<p>الـ <code>notFound</code> تُستدعى الطريقة (method) فقط من التطبيق ذي المستوى الأعلى (top-level). لمزيد من المعلومات، راجع هذا <a href="https://github.com/honojs/hono/issues/3465#issuecomment-2381210165">مشكلة</a>.</p>
<h2 id="معالجة-الأخطاء">معالجة الأخطاء</h2>
<p><code>app.onError</code> يتيح لك التعامل مع الأخطاء غير الملتقطة (uncaught errors) وإرجاع استجابة (Response) مخصصة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">onError</span>(<span class="hljs-function">(<span class="hljs-params">err, c</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`<span class="hljs-subst">\${err}</span>\`</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Custom Error Message&#x27;</span>, <span class="hljs-number">500</span>)
})
</code></pre>
<p>إذا كان لكلٍّ من التطبيق الأب ومساراتِه <code>onError</code> المعالجات، تحصل معالجات مستوى المسار على الأولوية.</p>
<h2 id="fire">fire()</h2>
<p><strong><code>app.fire()</code> مهمَل</strong>. استخدم <code>fire()</code> من <code>@hono/service-worker</code> بدلاً من ذلك. راجع <a href="https://hono.dev/docs/getting-started/service-worker">توثيق Service Worker</a> لمزيد من التفاصيل.</p>
<p><code>app.fire()</code> يضيف تلقائيًا <code>fetch</code> مستمع الأحداث.</p>
<p>يمكن أن يكون هذا مفيداً للبيئات التي تلتزم بـ <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API">Service Worker API</a>، مثل <a href="https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/">Cloudflare Workers غير المعتمدة على وحدات ES</a>.</p>
<p><code>app.fire()</code> ينفّذ ما يلي نيابةً عنك:</p>
<pre><code class="language-ts"><span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;fetch&#x27;</span>, (<span class="hljs-attr">event</span>: <span class="hljs-title class_">FetchEventLike</span>): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
  event.<span class="hljs-title function_">respondWith</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">dispatch</span>(...))
})
</code></pre>
<h2 id="fetch">fetch()</h2>
<p><code>app.fetch</code> ستكون نقطة الدخول لتطبيقك.</p>
<p>بالنسبة لـ Cloudflare Workers، يمكنك استخدام ما يلي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = <span class="hljs-built_in">any</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ExecutionContext</span> = <span class="hljs-built_in">any</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-title function_">fetch</span>(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">env</span>: <span class="hljs-title class_">Env</span>, <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">ExecutionContext</span></span>) {
    <span class="hljs-keyword">return</span> app.<span class="hljs-title function_">fetch</span>(request, env, ctx)
  },
}
</code></pre>
<p>أو ببساطة نفّذ:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>Bun:</p>
<!-- prettier-ignore -->
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app <span class="hljs-comment">// [!code --]</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {  <span class="hljs-comment">// [!code ++]</span>
  <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>, <span class="hljs-comment">// [!code ++]</span>
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>, <span class="hljs-comment">// [!code ++]</span>
} <span class="hljs-comment">// [!code ++]</span>
</code></pre>
<h2 id="request">request()</h2>
<p><code>request</code> طريقة مفيدة للاختبار.</p>
<p>يمكنك تمرير عنوان URL أو اسم مسار (pathname) لإرسال طلب GET.
<code>app</code> سيُرجع <code>Response</code> كائن.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">test</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fn</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">expect</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">any</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;GET /hello is ok&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>)
})
</code></pre>
<p>يمكنك أيضًا تمرير <code>Request</code> الكائن:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">test</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fn</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">expect</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">any</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;POST /message is ok&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> req = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Request</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
  })
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(req)
  <span class="hljs-title function_">expect</span>(res.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>)
})
</code></pre>
<h2 id="mount">mount()</h2>
<p><strong><code>app.mount()</code> مهمَل</strong>. استخدم <a href="https://hono.dev/docs/middleware/builtin/mount">تركيب البرمجية الوسيطة</a> بدلاً من ذلك.</p>
<p>الـ <code>mount()</code> تتيح لك تركيب (mount) تطبيقات مبنية بأطر عمل أخرى داخل تطبيق Hono الخاص بك.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Router</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">IttyRouter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;itty-router&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-comment">// Create itty-router application</span>
<span class="hljs-keyword">const</span> ittyRouter = <span class="hljs-title class_">IttyRouter</span>()

<span class="hljs-comment">// Handle \`GET /itty-router/hello\`</span>
ittyRouter.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;Hello from itty-router&#x27;</span>))

<span class="hljs-comment">// Hono application</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// Mount!</span>
app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&#x27;/itty-router&#x27;</span>, ittyRouter.<span class="hljs-property">handle</span>)
</code></pre>
<p>بشكل افتراضي، <code>mount()</code> يمرّر جديدًا <code>Request</code> مع إزالة مسار التثبيت من عنوان URL الخاص به. قدّم <code>replaceRequest</code> دالة للتحكم في <code>Request</code> يُمرَّر إلى التطبيق المُثبَّت:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handler</span> = (<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) =&gt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(request.<span class="hljs-property">url</span>)
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&#x27;/app&#x27;</span>, handler, {
  <span class="hljs-attr">replaceRequest</span>: <span class="hljs-function">(<span class="hljs-params">originalRequest</span>) =&gt;</span> originalRequest,
})
</code></pre>
<p>لتمرير الأصلي <code>Request</code> دون تغيير، اضبط <code>replaceRequest</code> إلى <code>false</code> كاختصار للدالة أعلاه:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handler</span> = (<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) =&gt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(request.<span class="hljs-property">url</span>)
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&#x27;/app&#x27;</span>, handler, {
  <span class="hljs-attr">replaceRequest</span>: <span class="hljs-literal">false</span>,
})
</code></pre>
<h2 id="الوضع-الصارم">الوضع الصارم</h2>
<p>الوضع الصارم افتراضيًا <code>true</code> ويميّز المسارات التالية.</p>
<ul>
<li><code>/hello</code></li>
<li><code>/hello/</code></li>
</ul>
<p><code>app.get('/hello')</code> لن يتطابق <code>GET /hello/</code>.</p>
<p>عند تعيين الوضع الصارم إلى <code>false</code>، سيعامل المساران على قدم المساواة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>({ <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span> })
</code></pre>
<h2 id="خيار-router">خيار router</h2>
<p>الـ <code>router</code> يحدِّد الخيار أي موجِّه (router) يُستخدم. الموجِّه الافتراضي هو <code>SmartRouter</code>. إذا كنت تريد استخدام <code>RegExpRouter</code>، مرّره إلى كائن جديد <code>Hono</code> النسخة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RegExpRouter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/router/reg-exp-router&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>({ <span class="hljs-attr">router</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExpRouter</span>() })
</code></pre>
<h2 id="الأنواع-العامة">الأنواع العامة</h2>
<p>يمكنك تمرير Generics لتحديد أنواع ارتباطات Cloudflare Workers والمتغيرات المستخدمة في <code>c.set</code>/<code>c.get</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = <span class="hljs-built_in">any</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">TOKEN</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Variables</span> = {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{
  <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span>
  <span class="hljs-title class_">Variables</span>: <span class="hljs-title class_">Variables</span>
}&gt;()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/auth/*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> token = c.<span class="hljs-property">env</span>.<span class="hljs-property">TOKEN</span> <span class="hljs-comment">// token is \`string\`</span>
  <span class="hljs-comment">// ...</span>
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;user&#x27;</span>, user) <span class="hljs-comment">// user should be \`User\`</span>
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})
</code></pre>
`,c={book:s,chapter:"api",chapterTitle:a,slug:n,title:p,headings:l,html:t};export{s as book,e as chapter,a as chapterTitle,c as default,l as headings,t as html,n as slug,p as title};
