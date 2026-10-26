const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="validating-schema-with-middleware",t="التحقق من المخطط باستخدام وسيط",p=[{depth:2,id:"التحقق-من-post",text:"التحقق من POST"},{depth:2,id:"التحقق-من-put",text:"التحقق من PUT"}],e=`<p>يمكننا إنشاء وسيط يتيح لنا التحقق من جسم الطلب باستخدام مخطط Zod.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">validateBody</span> =
  (<span class="hljs-params"><span class="hljs-attr">schema</span>: <span class="hljs-title class_">ZodSchema</span></span>) =&gt; <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">response</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      schema.<span class="hljs-title function_">parse</span>(request.<span class="hljs-property">body</span>);
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(request, response, error);
    }
  };
</code></pre>
<p>والأفضل من ذلك، يمكننا أن نحاول الاحتفاظ بالنوع.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> validateBody =
  &lt;T&gt;(<span class="hljs-attr">schema</span>: <span class="hljs-title class_">ZodSchema</span>&lt;T&gt;): <span class="hljs-title class_">RequestHandler</span>&lt;<span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-built_in">unknown</span>&gt;, <span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-built_in">unknown</span>&gt;, T&gt; =&gt;
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">response</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      schema.<span class="hljs-title function_">parse</span>(request.<span class="hljs-property">body</span>);
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(request, response, error);
    }
  };
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، لا يزال <code>ZodSchema</code> يعمل كمرادف للنوع. تغيّر النوع العام الأساسي <code>ZodType</code> من <code>ZodType&lt;Output, Def, Input&gt;</code> إلى <code>ZodType&lt;Output, Input&gt;</code>، لكن نمط الوسيط هذا يعمل بالطريقة نفسها في كلا الإصدارين.</p>
</blockquote>
<h2 id="التحقق-من-post">التحقق من <code>POST</code></h2>
<pre><code class="language-typescript">app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/tasks&#x27;</span>, <span class="hljs-title function_">validateBody</span>(<span class="hljs-title class_">NewTaskSchema</span>), <span class="hljs-title function_">async</span> (req, res) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> task = <span class="hljs-title class_">NewTaskSchema</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">body</span>);
    <span class="hljs-keyword">await</span> createTask.<span class="hljs-title function_">run</span>([task.<span class="hljs-property">title</span>, task.<span class="hljs-property">description</span>]);
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">sendStatus</span>(<span class="hljs-number">201</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
  }
});
</code></pre>
<h2 id="التحقق-من-put">التحقق من <code>PUT</code></h2>
<pre><code class="language-typescript">app.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/tasks/:id&#x27;</span>, <span class="hljs-title function_">validateBody</span>(<span class="hljs-title class_">UpdateTaskSchema</span>), <span class="hljs-title function_">async</span> (req, res) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> { id } = <span class="hljs-title class_">TaskParamsSchema</span>.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">params</span>);

    <span class="hljs-keyword">const</span> previous = <span class="hljs-title class_">TaskSchema</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">await</span> getTask.<span class="hljs-title function_">get</span>([id]));
    <span class="hljs-keyword">const</span> updates = req.<span class="hljs-property">body</span>;
    <span class="hljs-keyword">const</span> task = { ...previous, ...updates };

    <span class="hljs-keyword">await</span> updateTask.<span class="hljs-title function_">run</span>([task.<span class="hljs-property">title</span>, task.<span class="hljs-property">description</span>, task.<span class="hljs-property">completed</span>, id]);
    <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">sendStatus</span>(<span class="hljs-number">200</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">handleError</span>(req, res, error);
  }
});
</code></pre>
<p><strong>التالي</strong>: <a href="https://stevekinney.com/courses/full-stack-typescript/validating-query-and-path-parameters">التحقق من معاملات الاستعلام والمسار باستخدام وسيط</a></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
