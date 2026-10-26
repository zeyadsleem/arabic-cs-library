const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="validating-query-and-path-parameters",p="التحقق من معاملات الاستعلام والمسار",t=[{depth:2,id:"جمع-كل-شيء-معا",text:"جمع كل شيء معًا"}],e=`<p>يمكننا إنشاء وسيط مشابه للتحقق من الاستعلامات والمسارات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> validateParams =
  &lt;T&gt;(<span class="hljs-attr">schema</span>: <span class="hljs-title class_">ZodSchema</span>&lt;T&gt;): <span class="hljs-title class_">RequestHandler</span>&lt;<span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;params&#x27;</span>] &amp; T, <span class="hljs-title class_">ErrorResponse</span>&gt; =&gt;
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">response</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      request.<span class="hljs-property">params</span> = schema.<span class="hljs-title function_">parse</span>(request.<span class="hljs-property">params</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;params&#x27;</span>];
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(request, response, error);
    }
  };

<span class="hljs-keyword">const</span> validateQuery =
  &lt;T&gt;(
    <span class="hljs-attr">schema</span>: <span class="hljs-title class_">ZodSchema</span>&lt;T&gt;,
  ): <span class="hljs-title class_">RequestHandler</span>&lt;<span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;params&#x27;</span>], <span class="hljs-title class_">ErrorResponse</span>, <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;body&#x27;</span>], <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;query&#x27;</span>] &amp; T&gt; =&gt;
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">response</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      request.<span class="hljs-property">query</span> = schema.<span class="hljs-title function_">parse</span>(request.<span class="hljs-property">query</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;query&#x27;</span>];
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(request, response, error);
    }
  };
</code></pre>
<h2 id="جمع-كل-شيء-معا">جمع كل شيء معًا</h2>
<p>الآن يمكننا إنشاء وسيط واحد يتحقق من كل الخيارات المختلفة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-keyword">type</span> <span class="hljs-title class_">NextFunction</span>, <span class="hljs-keyword">type</span> <span class="hljs-title class_">Request</span>, <span class="hljs-keyword">type</span> <span class="hljs-title class_">Response</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-keyword">type</span> <span class="hljs-title class_">ZodSchema</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;
<span class="hljs-keyword">import</span> { handleError } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./handle-error.js&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidationOptions</span> = { <span class="hljs-attr">body</span>?: <span class="hljs-title class_">ZodSchema</span>; <span class="hljs-attr">params</span>?: <span class="hljs-title class_">ZodSchema</span>; <span class="hljs-attr">query</span>?: <span class="hljs-title class_">ZodSchema</span> };

<span class="hljs-comment">/**
 * Creates a middleware to validate multiple parts of a request against Zod schemas
 * <span class="hljs-doctag">@param</span> schemas Object containing optional Zod schemas for body, params, and query
 * <span class="hljs-doctag">@returns</span> Express middleware that validates the specified parts of the request
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">validate</span> = (<span class="hljs-params"><span class="hljs-attr">schemas</span>: <span class="hljs-title class_">ValidationOptions</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">if</span> (schemas.<span class="hljs-property">body</span>) {
        <span class="hljs-keyword">const</span> validatedBody = schemas.<span class="hljs-property">body</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">body</span>);
        req.<span class="hljs-property">body</span> = validatedBody <span class="hljs-keyword">as</span> <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;body&#x27;</span>];
      }

      <span class="hljs-keyword">if</span> (schemas.<span class="hljs-property">params</span>) {
        <span class="hljs-keyword">const</span> validatedParams = schemas.<span class="hljs-property">params</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">params</span>);
        req.<span class="hljs-property">params</span> = validatedParams <span class="hljs-keyword">as</span> <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;params&#x27;</span>];
      }

      <span class="hljs-keyword">if</span> (schemas.<span class="hljs-property">query</span>) {
        <span class="hljs-keyword">const</span> validatedQuery = schemas.<span class="hljs-property">query</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">query</span>);
        req.<span class="hljs-property">query</span> = validatedQuery <span class="hljs-keyword">as</span> <span class="hljs-title class_">Request</span>[<span class="hljs-string">&#x27;query&#x27;</span>];
      }

      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
    }
  };
};
</code></pre>
<p><strong>التالي</strong>: <a href="https://stevekinney.com/courses/full-stack-typescript/adding-client-side-validation">إضافة تحققات من جهة العميل</a></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
