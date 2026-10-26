const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="using-zod-with-express",p="استخدام Zod مع Express",t=[{depth:2,id:"التحقق-من-معاملات-الاستعلام",text:"التحقق من معاملات الاستعلام"},{depth:3,id:"التحقق-من-معاملات-url",text:"التحقق من معاملات URL"},{depth:2,id:"التحقق-من-الاستجابات",text:"التحقق من الاستجابات"},{depth:3,id:"التحليل-الآمن-مقابل-الرمي",text:"التحليل الآمن مقابل الرمي"},{depth:2,id:"لماذا-تستخدم-zod",text:"لماذا تستخدم Zod؟"}],e=`<p>تساعدك تعريفات الأنواع في TypeScript على التقاط الأخطاء في وقت التصريف، لكنها لا تستطيع التحقق من البيانات عندما تكون شيفرتك قيد التشغيل فعلًا. وهنا تتألق مكتبة للتحقق من المخططات مثل <a href="https://www.npmjs.com/package/zod">zod</a>. فهي تردم الفجوة بفرض فحوص وقت التشغيل مع الحفاظ على سلامة الأنواع.</p>
<p>وفيما يلي مثال على استخدام Zod في تطبيق <a href="https://expressjs.com/">Express</a> للتأكد من أن الطلبات الواردة تطابق البنية المتوقعة قبل أن يعالجها معالج المسار.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;
<span class="hljs-keyword">import</span> express, { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span>, <span class="hljs-title class_">NextFunction</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

<span class="hljs-comment">// Define a schema for creating users</span>
<span class="hljs-keyword">const</span> createUserSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">3</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">20</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">password</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">8</span>),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-comment">// Infer the TypeScript type from the schema</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CreateUserInput</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> createUserSchema&gt;;

<span class="hljs-comment">// Middleware for validating request body</span>
<span class="hljs-keyword">function</span> validateBody&lt;T <span class="hljs-keyword">extends</span> z.<span class="hljs-property">ZodTypeAny</span>&gt;(<span class="hljs-attr">schema</span>: T) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      req.<span class="hljs-property">body</span> = schema.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">body</span>);
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> z.<span class="hljs-property">ZodError</span>) {
        <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({
          <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Validation failed&#x27;</span>,
          <span class="hljs-attr">details</span>: error.<span class="hljs-property">errors</span>,
        });
      }
      <span class="hljs-title function_">next</span>(error);
    }
  };
}

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-title function_">validateBody</span>(createUserSchema),
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, <span class="hljs-title class_">CreateUserInput</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
    <span class="hljs-comment">// req.body is validated &amp; typed as CreateUserInput</span>
    <span class="hljs-keyword">const</span> { username, email, password, age } = req.<span class="hljs-property">body</span>;
    <span class="hljs-comment">// … create user logic here …</span>
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;User created&#x27;</span> });
  },
);
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يُفضَّل استخدام <code>z.email()</code> بدلًا من <code>z.string().email()</code>. كما تغيّرت بصمة النوع العام <code>ZodType</code> من <code>ZodType&lt;Output, Def, Input&gt;</code> إلى <code>ZodType&lt;Output, Input&gt;</code> (إذ حُذفت المعلمة <code>Def</code>). ولا يزال المرادف <code>z.ZodTypeAny</code> المستخدم هنا يعمل في الإصدار v4.</p>
</blockquote>
<h2 id="التحقق-من-معاملات-الاستعلام">التحقق من معاملات الاستعلام</h2>
<p>عند التعامل مع نقاط نهاية GET التي تتضمن سلاسل استعلام، يمكنك تعريف مخطط لـ req.query. ولأن معاملات الاستعلام تصل دائمًا كسلاسل، فقد تحتاج إلى z.string().transform(…) أو z.coerce.number() لتحويلها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> searchQuerySchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">q</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">page</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">regex</span>(<span class="hljs-regexp">/^\\d+$/</span>).<span class="hljs-title function_">transform</span>(<span class="hljs-title class_">Number</span>).<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">limit</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">regex</span>(<span class="hljs-regexp">/^\\d+$/</span>).<span class="hljs-title function_">transform</span>(<span class="hljs-title class_">Number</span>).<span class="hljs-title function_">optional</span>(),
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SearchQuery</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> searchQuerySchema&gt;;

<span class="hljs-keyword">function</span> validateQuery&lt;T <span class="hljs-keyword">extends</span> z.<span class="hljs-property">ZodTypeAny</span>&gt;(<span class="hljs-attr">schema</span>: T) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      req.<span class="hljs-property">query</span> = schema.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">query</span>);
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid query&#x27;</span>, <span class="hljs-attr">details</span>: error });
    }
  };
}

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/search&#x27;</span>,
  <span class="hljs-title function_">validateQuery</span>(searchQuerySchema),
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;{}, {}, {}, <span class="hljs-title class_">SearchQuery</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
    <span class="hljs-comment">// req.query is validated &amp; typed as SearchQuery</span>
    <span class="hljs-keyword">const</span> { q, page = <span class="hljs-number">1</span>, limit = <span class="hljs-number">10</span> } = req.<span class="hljs-property">query</span>;
    <span class="hljs-comment">// … search logic …</span>
    res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">query</span>: q, page, limit });
  },
);
</code></pre>
<h3 id="التحقق-من-معاملات-url">التحقق من معاملات URL</h3>
<p>إذا كانت مساراتك تتضمن معاملات مسار (مثل /:userId)، فيمكنك التحقق من req.params بنهج مشابه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> userParamsSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">userId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserParams</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userParamsSchema&gt;;

<span class="hljs-keyword">function</span> validateParams&lt;T <span class="hljs-keyword">extends</span> z.<span class="hljs-property">ZodTypeAny</span>&gt;(<span class="hljs-attr">schema</span>: T) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">NextFunction</span></span>) =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      req.<span class="hljs-property">params</span> = schema.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">params</span>);
      <span class="hljs-title function_">next</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid params&#x27;</span>, <span class="hljs-attr">details</span>: error });
    }
  };
}

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
  <span class="hljs-title function_">validateParams</span>(userParamsSchema),
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;<span class="hljs-title class_">UserParams</span>&gt;, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) =&gt;</span> {
    <span class="hljs-comment">// req.params.userId is validated &amp; typed as a string UUID</span>
    res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">userId</span>: req.<span class="hljs-property">params</span>.<span class="hljs-property">userId</span> });
  },
);
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يُفضَّل استخدام <code>z.uuid()</code> بدلًا من <code>z.string().uuid()</code>. ويفرض <code>z.uuid()</code> في الإصدار v4 تحققًا أشد صرامة وفق RFC 9562؛ فاستخدم <code>z.guid()</code> للحصول على السلوك المتوافق مع v3.</p>
</blockquote>
<h2 id="التحقق-من-الاستجابات">التحقق من الاستجابات</h2>
<p>يستطيع Zod أيضًا التحقق من بياناتك الصادرة. وهذا ليس ضروريًا دائمًا، لكن في البيئات العالية المخاطر (مثل البيانات المالية أو الطبية)، قد يكون مفيدًا للتأكد من أن شيفرتك تعيد بالضبط التنسيق الذي تقصده.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> userListResponseSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">success</span>: z.<span class="hljs-title function_">boolean</span>(),
  <span class="hljs-attr">data</span>: z.<span class="hljs-title function_">array</span>(createUserSchema), <span class="hljs-comment">// returning a list of users</span>
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">sendUserListResponse</span>(<span class="hljs-params"><span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>, <span class="hljs-attr">payload</span>: <span class="hljs-built_in">unknown</span></span>) {
  <span class="hljs-comment">// Validate the shape before sending</span>
  <span class="hljs-keyword">const</span> parsedPayload = userListResponseSchema.<span class="hljs-title function_">parse</span>(payload);
  res.<span class="hljs-title function_">json</span>(parsedPayload);
}
</code></pre>
<h3 id="التحليل-الآمن-مقابل-الرمي">التحليل الآمن مقابل الرمي</h3>
<p>إذا كنت تفضّل ألا تتعامل مع الاستثناءات بـ <code>try</code>/<code>catch</code>، ففكّر في <code>schema.safeParse(data)</code> بدلًا من <code>schema.parse(data)</code>. فهو يعيد <code>{ success: boolean; data?: T; error?: ZodError }</code>، ما يتيح لك الرد بحالة 400 إذا كانت success تساوي false.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> result = createUserSchema.<span class="hljs-title function_">safeParse</span>(req.<span class="hljs-property">body</span>);
<span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
  <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">errors</span>: result.<span class="hljs-property">error</span>.<span class="hljs-property">errors</span> });
}
<span class="hljs-comment">// result.data is valid</span>
</code></pre>
<h2 id="لماذا-تستخدم-zod">لماذا تستخدم Zod؟</h2>
<ol>
<li>تحصل على تحقق في وقت التشغيل <em>و</em> تنميط ساكن من المخطط نفسه.</li>
<li>تضمن ألا تصل إلى معالجات مساراتك إلا بيانات صالحة، فتجنّب الأعطال المحتملة أو الثغرات الأمنية.</li>
<li>يتكامل Zod جيدًا مع أطر شائعة مثل <a href="https://www.npmjs.com/package/express">Express</a> وNestJS، أو أي شيء آخر في منظومة Node.js.</li>
<li>يمكنك توسيع هذا النمط ليشمل معاملات الاستعلام ومعاملات URL وحتى بيانات الاستجابة، لتبقى سلسلة البيانات كلها قوية الأنواع ومتحقَّقًا منها.</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
