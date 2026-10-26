const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="typed-error-middleware-with-express",p="وسيط أخطاء محدّد الأنواع مع Express",r=[{depth:3,id:"وسيط-أخطاء-محدد-الأنواع",text:"وسيط أخطاء محدّد الأنواع"}],t=`<h3 id="وسيط-أخطاء-محدد-الأنواع">وسيط أخطاء محدّد الأنواع</h3>
<p>لوسيط الأخطاء في Express توقيع مميّز:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define structured error types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Error</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;
}

<span class="hljs-comment">// Create typed error classes</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">NotFoundError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">AppError</span> {
  statusCode = <span class="hljs-number">404</span>;
  code = <span class="hljs-string">&#x27;NOT_FOUND&#x27;</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Resource not found&#x27;</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;NotFoundError&#x27;</span>;
  }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">AppError</span> {
  statusCode = <span class="hljs-number">400</span>;
  code = <span class="hljs-string">&#x27;VALIDATION_ERROR&#x27;</span>;
  <span class="hljs-attr">details</span>: <span class="hljs-built_in">unknown</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Validation failed&#x27;</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;ValidationError&#x27;</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">details</span> = details;
  }
}

<span class="hljs-comment">// Create a type-safe error handler</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">errorHandler</span>(<span class="hljs-params"><span class="hljs-attr">err</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(err);

  <span class="hljs-comment">// Handle known error types</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;statusCode&#x27;</span> <span class="hljs-keyword">in</span> err &amp;&amp; <span class="hljs-string">&#x27;code&#x27;</span> <span class="hljs-keyword">in</span> err) {
    <span class="hljs-keyword">const</span> appError = err <span class="hljs-keyword">as</span> <span class="hljs-title class_">AppError</span>;

    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(appError.<span class="hljs-property">statusCode</span>).<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">error</span>: {
        <span class="hljs-attr">message</span>: appError.<span class="hljs-property">message</span>,
        <span class="hljs-attr">code</span>: appError.<span class="hljs-property">code</span>,
        ...(appError.<span class="hljs-property">details</span> &amp;&amp; { <span class="hljs-attr">details</span>: appError.<span class="hljs-property">details</span> }),
      },
    });
  }

  <span class="hljs-comment">// Handle unknown errors</span>
  res.<span class="hljs-title function_">status</span>(<span class="hljs-number">500</span>).<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">error</span>: {
      <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Internal server error&#x27;</span>,
      <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;INTERNAL_ERROR&#x27;</span>,
    },
  });
}

<span class="hljs-comment">// Register the error handler (must be last)</span>
app.<span class="hljs-title function_">use</span>(errorHandler);

<span class="hljs-comment">// Usage in routes</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserById</span>(req.<span class="hljs-property">params</span>.<span class="hljs-property">id</span>);

    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NotFoundError</span>(<span class="hljs-string">\`User with ID <span class="hljs-subst">\${req.params.id}</span> not found\`</span>);
    }

    res.<span class="hljs-title function_">json</span>(user);
  }),
);

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-title function_">asyncHandler</span>(<span class="hljs-title function_">async</span> (req, res) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Validation logic</span>
      <span class="hljs-keyword">const</span> validatedData = <span class="hljs-title function_">validateUser</span>(req.<span class="hljs-property">body</span>);

      <span class="hljs-comment">// Create user</span>
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUser</span>(validatedData);

      res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>(user);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">if</span> (error.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;ValidationError&#x27;</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ValidationError</span>(<span class="hljs-string">&#x27;User validation failed&#x27;</span>, error.<span class="hljs-property">details</span>);
      }
      <span class="hljs-keyword">throw</span> error;
    }
  }),
);
</code></pre>
<p>تضمن هذه المقاربة المنظّمة لمعالجة الأخطاء ما يلي:</p>
<ol>
<li>كل الأخطاء محدّدة الأنواع تحديدًا سليمًا</li>
<li>تتبع استجابات الأخطاء صيغة متسقة</li>
<li>تؤدي أنواع الأخطاء المختلفة إلى رموز حالة HTTP المناسبة</li>
<li>تُحفظ تفاصيل الأخطاء عند الحاجة</li>
</ol>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:r,html:t};export{s as book,a as chapter,n as chapterTitle,e as default,r as headings,t as html,l as slug,p as title};
