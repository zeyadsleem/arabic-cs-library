const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="global-error-types-express",p="أنواع الأخطاء العامة مع Express",t=[],r=`<p>لمقاربة متسقة في أنحاء تطبيقك، عرّف أنواع الأخطاء في موضع مركزي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// errors.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">ErrorCode</span> {
  <span class="hljs-variable constant_">NOT_FOUND</span> = <span class="hljs-string">&#x27;NOT_FOUND&#x27;</span>,
  <span class="hljs-variable constant_">VALIDATION_ERROR</span> = <span class="hljs-string">&#x27;VALIDATION_ERROR&#x27;</span>,
  <span class="hljs-variable constant_">UNAUTHORIZED</span> = <span class="hljs-string">&#x27;UNAUTHORIZED&#x27;</span>,
  <span class="hljs-variable constant_">FORBIDDEN</span> = <span class="hljs-string">&#x27;FORBIDDEN&#x27;</span>,
  <span class="hljs-variable constant_">INTERNAL_ERROR</span> = <span class="hljs-string">&#x27;INTERNAL_ERROR&#x27;</span>,
  <span class="hljs-variable constant_">DATABASE_ERROR</span> = <span class="hljs-string">&#x27;DATABASE_ERROR&#x27;</span>,
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ErrorResponse</span> {
  <span class="hljs-attr">error</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">code</span>: <span class="hljs-title class_">ErrorCode</span>;
    <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> {
  <span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">code</span>: <span class="hljs-title class_">ErrorCode</span>;
  <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">code</span>: <span class="hljs-title class_">ErrorCode</span>, <span class="hljs-attr">statusCode</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;AppError&#x27;</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">code</span> = code;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">statusCode</span> = statusCode;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">details</span> = details;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NotFoundError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AppError</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Resource not found&#x27;</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message, <span class="hljs-title class_">ErrorCode</span>.<span class="hljs-property">NOT_FOUND</span>, <span class="hljs-number">404</span>, details);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;NotFoundError&#x27;</span>;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AppError</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">message = <span class="hljs-string">&#x27;Validation failed&#x27;</span>, <span class="hljs-attr">details</span>?: <span class="hljs-built_in">unknown</span></span>) {
    <span class="hljs-variable language_">super</span>(message, <span class="hljs-title class_">ErrorCode</span>.<span class="hljs-property">VALIDATION_ERROR</span>, <span class="hljs-number">400</span>, details);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;ValidationError&#x27;</span>;
  }
}

<span class="hljs-comment">// Additional error classes…</span>
</code></pre>
<p>ثم استخدم هذه الأنواع في أنحاء تطبيقك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">NotFoundError</span>, <span class="hljs-title class_">ValidationError</span>, <span class="hljs-title class_">ErrorResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./errors&#x27;</span>;

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{ id: <span class="hljs-built_in">string</span> }&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;<span class="hljs-title class_">UserResponse</span> | <span class="hljs-title class_">ErrorResponse</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-comment">// Route implementation…</span>
  },
);
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:r};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,r as html,l as slug,p as title};
