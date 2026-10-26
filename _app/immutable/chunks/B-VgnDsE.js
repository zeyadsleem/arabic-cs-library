const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="typing-headers-and-cookies-in-express",l="تحديد أنواع الترويسات وملفات تعريف الارتباط",t=[{depth:2,id:"تحديد-أنواع-ترويسات-الطلب",text:"تحديد أنواع ترويسات الطلب"},{depth:2,id:"تعيين-ترويسات-الاستجابة",text:"تعيين ترويسات الاستجابة"},{depth:2,id:"العمل-بملفات-تعريف-الارتباط",text:"العمل بملفات تعريف الارتباط"}],e=`<p>تؤدّي ترويسات الطلب والاستجابة دورًا حاسمًا في تواصل HTTP. ويمكن لـ TypeScript أن يساعد في ضمان تحديد أنواعها تحديدًا سليمًا.</p>
<h2 id="تحديد-أنواع-ترويسات-الطلب">تحديد أنواع ترويسات الطلب</h2>
<p>تصل الترويسات كنصوص أو بلا قيمة (undefined):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define expected authorization header</span>

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthHeaders</span> {
  <span class="hljs-attr">authorization</span>?: <span class="hljs-built_in">string</span>;
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/protected&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, {}, {}, <span class="hljs-title class_">AuthHeaders</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> authHeader = req.<span class="hljs-property">headers</span>.<span class="hljs-property">authorization</span>;

  <span class="hljs-keyword">if</span> (!authHeader) {
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">401</span>).<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Unauthorized&#x27;</span>);
  }

  <span class="hljs-comment">// Process authorization header</span>

  <span class="hljs-keyword">const</span> token = authHeader.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;Bearer &#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// …</span>
});
</code></pre>
<p>لكن المعامل العام الخامس في Request أقل استخدامًا شيوعًا. والمقاربة العملية أكثر هي استخدام تأكيدات الأنواع أو التحقق من الترويسات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Header validation middleware</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">requireHeader</span>(<span class="hljs-params"><span class="hljs-attr">headerName</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!req.<span class="hljs-property">headers</span>[headerName]) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({
        <span class="hljs-attr">error</span>: <span class="hljs-string">\`Missing required header: <span class="hljs-subst">\${headerName}</span>\`</span>,
      });
    }

    <span class="hljs-title function_">next</span>();
  };
}

<span class="hljs-comment">// Using the middleware</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/protected&#x27;</span>, <span class="hljs-title function_">requireHeader</span>(<span class="hljs-string">&#x27;authorization&#x27;</span>), <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// We can now safely assert this exists</span>

  <span class="hljs-keyword">const</span> authHeader = req.<span class="hljs-property">headers</span>.<span class="hljs-property">authorization</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;

  <span class="hljs-comment">// …</span>
});
</code></pre>
<h2 id="تعيين-ترويسات-الاستجابة">تعيين ترويسات الاستجابة</h2>
<p>في شأن ترويسات الاستجابة، تساعدك TypeScript بقدر أكثر محدودية لأن الترويسات تُعيَّن إجرائيًا:</p>
<pre><code class="language-typescript">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/data&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// Set headers</span>

  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;application/json&#x27;</span>);

  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">&#x27;no-cache&#x27;</span>);

  <span class="hljs-comment">// Send response</span>

  res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">data</span>: <span class="hljs-string">&#x27;example&#x27;</span> });
});
</code></pre>
<p>ويمكننا تحسين ذلك بالثوابت ودوال مساعدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define header constants</span>

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">HEADERS</span> = {
  <span class="hljs-attr">CONTENT_TYPE</span>: <span class="hljs-string">&#x27;Content-Type&#x27;</span>,

  <span class="hljs-attr">CACHE_CONTROL</span>: <span class="hljs-string">&#x27;Cache-Control&#x27;</span>,

  <span class="hljs-attr">AUTHORIZATION</span>: <span class="hljs-string">&#x27;Authorization&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// Define header value constants</span>

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CONTENT_TYPES</span> = {
  <span class="hljs-title class_">JSON</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,

  <span class="hljs-attr">HTML</span>: <span class="hljs-string">&#x27;text/html&#x27;</span>,

  <span class="hljs-attr">XML</span>: <span class="hljs-string">&#x27;application/xml&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// Helper function for setting common headers</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">setStandardHeaders</span>(<span class="hljs-params"><span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>): <span class="hljs-built_in">void</span> {
  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-variable constant_">HEADERS</span>.<span class="hljs-property">CONTENT_TYPE</span>, <span class="hljs-variable constant_">CONTENT_TYPES</span>.<span class="hljs-property">JSON</span>);

  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-variable constant_">HEADERS</span>.<span class="hljs-property">CACHE_CONTROL</span>, <span class="hljs-string">&#x27;no-cache&#x27;</span>);
}

<span class="hljs-comment">// Usage</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/data&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-title function_">setStandardHeaders</span>(res);

  <span class="hljs-comment">// Additional custom headers</span>

  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;X-Custom-Header&#x27;</span>, <span class="hljs-string">&#x27;value&#x27;</span>);

  res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">data</span>: <span class="hljs-string">&#x27;example&#x27;</span> });
});
</code></pre>
<h2 id="العمل-بملفات-تعريف-الارتباط">العمل بملفات تعريف الارتباط</h2>
<p>تضيف ملفات تعريف الارتباط (cookies) طبقة أخرى من التعقيد. ويوسّع وسيط <code>cookie-parser</code> الشائع كائن الطلب:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> cookieParser <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cookie-parser&#x27;</span>;

<span class="hljs-comment">// Setup cookie parser</span>

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">cookieParser</span>());

<span class="hljs-comment">// Define expected cookies</span>

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthCookies</span> {
  <span class="hljs-attr">sessionId</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Create a middleware to validate required cookies</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">requireCookie</span>(<span class="hljs-params"><span class="hljs-attr">cookieName</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!req.<span class="hljs-property">cookies</span>?.[cookieName]) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({
        <span class="hljs-attr">error</span>: <span class="hljs-string">\`Missing required cookie: <span class="hljs-subst">\${cookieName}</span>\`</span>,
      });
    }

    <span class="hljs-title function_">next</span>();
  };
}

<span class="hljs-comment">// Use it in routes</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>, <span class="hljs-title function_">requireCookie</span>(<span class="hljs-string">&#x27;sessionId&#x27;</span>), <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// Safe to assert this cookie exists</span>

  <span class="hljs-keyword">const</span> sessionId = req.<span class="hljs-property">cookies</span>.<span class="hljs-property">sessionId</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;

  <span class="hljs-comment">// Use the session ID</span>

  <span class="hljs-comment">// …</span>

  res.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Dashboard&#x27;</span>);
});

<span class="hljs-comment">// Setting cookies</span>

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/login&#x27;</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
  <span class="hljs-comment">// Authentication logic</span>

  <span class="hljs-comment">// …</span>

  <span class="hljs-comment">// Set cookie</span>

  res.<span class="hljs-title function_">cookie</span>(<span class="hljs-string">&#x27;sessionId&#x27;</span>, <span class="hljs-string">&#x27;abc123&#x27;</span>, {
    <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-attr">secure</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span>,

    <span class="hljs-attr">maxAge</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// 24 hours</span>
  });

  res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> });
});
</code></pre>
<p>تأتي أنواع cookie-parser مضمنة في <code>@types/cookie-parser</code>، الذي يوسّع واجهة Request في Express.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
