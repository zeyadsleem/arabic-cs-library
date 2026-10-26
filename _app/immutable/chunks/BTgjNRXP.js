const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",l="type-branding-with-zod",t="وسم الأنواع مع Zod",p=[],e=`<p>يمكنك «وسم» أنواعك بحيث يراها TypeScript فريدة، حتى لو كانت في وقت التشغيل مجرّد نصوص أو أعداد عادية.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> emailSchema = z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>().<span class="hljs-property">brand</span>&lt;<span class="hljs-string">&#x27;EmailAddress&#x27;</span>&gt;();

<span class="hljs-keyword">type</span> <span class="hljs-title class_">EmailAddress</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> emailSchema&gt;;
<span class="hljs-comment">// =&gt; string &amp; { __brand: &quot;EmailAddress&quot; }</span>

<span class="hljs-keyword">const</span> email = emailSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;test@example.com&#x27;</span>);
<span class="hljs-comment">// Type is EmailAddress</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">sendEmail</span>(<span class="hljs-params"><span class="hljs-attr">to</span>: <span class="hljs-title class_">EmailAddress</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Sending email to&#x27;</span>, to);
}

<span class="hljs-title function_">sendEmail</span>(email);
<span class="hljs-comment">// Works</span>

<span class="hljs-title function_">sendEmail</span>(<span class="hljs-string">&#x27;unbranded string&#x27;</span>);
<span class="hljs-comment">// Type error: not EmailAddress</span>
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يُفضَّل كتابة <code>z.string().email()</code> بالصيغة <code>z.email()</code>. كما تقبل طريقة <code>.brand()</code> وسيطًا ثانيًا اختياريًا (<code>&quot;in&quot;</code> أو <code>&quot;out&quot;</code> أو <code>&quot;inout&quot;</code>) للتحكّم في موضع الوسم في النوع المستنتَج.</p>
</blockquote>
<p>الوسم مجرّد حيلة في TypeScript وقت الترجمة، لكنه يساعدك على تجنّب تمرير نص عادي — مثلًا — حيث يُطلب <code>EmailAddress</code>. ويمكنك وسم الكائنات أيضًا.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
