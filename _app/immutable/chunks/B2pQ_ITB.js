const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",t="express-zod-api",p="بناء واجهة برمجية مع Express Zod API",l=[{depth:2,id:"التثبيت",text:"التثبيت"},{depth:2,id:"تعريف-نقاط-نهاية-الواجهة-البرمجية",text:"تعريف نقاط نهاية الواجهة البرمجية"},{depth:3,id:"مثال-إنشاء-نقطة-نهاية-لمستخدم",text:"مثال: إنشاء نقطة نهاية لمستخدم"},{depth:3,id:"مفاهيم-أساسية",text:"مفاهيم أساسية"},{depth:2,id:"التعامل-مع-معاملات-الاستعلام-والمسار",text:"التعامل مع معاملات الاستعلام والمسار"},{depth:3,id:"مثال-جلب-مستخدم-بالمعرف",text:"مثال: جلب مستخدم بالمعرّف"},{depth:3,id:"مثال-البحث-عن-مستخدمين-بمعاملات-استعلام",text:"مثال: البحث عن مستخدمين بمعاملات استعلام"},{depth:2,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"},{depth:3,id:"مثال-معالجة-أخطاء-مخصصة",text:"مثال: معالجة أخطاء مخصّصة"},{depth:2,id:"فوائد-express-zod-api",text:"فوائد express-zod-api"}],e=`<p><a href="https://www.npmjs.com/package/express-zod-api"><code>express-zod-api</code></a> مكتبة قوية تجمع أمان الأنواع الذي يوفّره Zod مع مرونة Express، وتمكّنك من تعريف نقاط نهاية واجهتك البرمجية والتحقق منها بسهولة. وسيرشدك هذا الدليل خلال إعداد واستخدام <code>express-zod-api</code> لبناء واجهات برمجية متينة وآمنة الأنواع.</p>
<h2 id="التثبيت">التثبيت</h2>
<p>ثبّت <code>express-zod-api</code> واعتماداتها النظيرة:</p>
<pre><code class="language-bash">npm install express-zod-api zod express
</code></pre>
<h2 id="تعريف-نقاط-نهاية-الواجهة-البرمجية">تعريف نقاط نهاية الواجهة البرمجية</h2>
<p>يدور <code>express-zod-api</code> حول تعريف نقاط نهاية الواجهة البرمجية كائناتٍ تحدّد المسار والتابع (method) والتحقق من المدخلات (باستخدام Zod) ومخطط الخرج.</p>
<h3 id="مثال-إنشاء-نقطة-نهاية-لمستخدم">مثال: إنشاء نقطة نهاية لمستخدم</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { createExpressEndpoints, z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express-zod-api&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

<span class="hljs-keyword">const</span> createUserEndpoint = {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;post&#x27;</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-attr">request</span>: {
    <span class="hljs-attr">body</span>: z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">3</span>),
      <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
      <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">optional</span>(),
    }),
  },
  <span class="hljs-attr">response</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
    <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">optional</span>(),
  }),
  <span class="hljs-attr">handler</span>: <span class="hljs-title function_">async</span> ({ input, res }) =&gt; {
    <span class="hljs-comment">// Input is automatically validated against the request schema</span>
    <span class="hljs-keyword">const</span> { username, email, age } = input.<span class="hljs-property">body</span>;

    <span class="hljs-comment">// Simulate user creation</span>
    <span class="hljs-keyword">const</span> newUser = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123e4567-e89b-12d3-a456-426614174000&#x27;</span>, <span class="hljs-comment">// Example UUID</span>
      username,
      email,
      age,
    };

    <span class="hljs-comment">// Respond with the validated response schema</span>
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>(newUser);
  },
};

<span class="hljs-comment">// Create Express endpoints from the API definition</span>
<span class="hljs-title function_">createExpressEndpoints</span>({
  <span class="hljs-attr">endpoints</span>: [createUserEndpoint],
  app,
});

app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3000</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Server listening on port 3000&#x27;</span>);
});
</code></pre>
<h3 id="مفاهيم-أساسية">مفاهيم أساسية</h3>
<ul>
<li><strong><code>method</code>:</strong> تابع HTTP المُستخدم في الطلب (مثل ‘get’ و‘post’ و‘put’ و‘delete’).</li>
<li><strong><code>path</code>:</strong> مسار نقطة النهاية في واجهتك البرمجية.</li>
<li><strong><code>request</code>:</strong> يعرّف التحقق من المدخلات باستخدام مخططات Zod لكل من <code>body</code> و<code>query</code> و<code>params</code>.</li>
<li><strong><code>response</code>:</strong> يعرّف مخطط الخرج باستخدام Zod.</li>
<li><strong><code>handler</code>:</strong> دالة غير متزامنة تستقبل <code>input</code> و<code>res</code> بعد التحقق منهما (كائن استجابة Express).</li>
</ul>
<h2 id="التعامل-مع-معاملات-الاستعلام-والمسار">التعامل مع معاملات الاستعلام والمسار</h2>
<p>يجعل <code>express-zod-api</code> التعامل مع معاملات الاستعلام والمسار أمرًا سهلًا.</p>
<h3 id="مثال-جلب-مستخدم-بالمعرف">مثال: جلب مستخدم بالمعرّف</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> getUserEndpoint = {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;get&#x27;</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
  <span class="hljs-attr">request</span>: {
    <span class="hljs-attr">params</span>: z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">userId</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
    }),
  },
  <span class="hljs-attr">response</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
    <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>(),
  }),
  <span class="hljs-attr">handler</span>: <span class="hljs-title function_">async</span> ({ input, res }) =&gt; {
    <span class="hljs-keyword">const</span> { userId } = input.<span class="hljs-property">params</span>;
    <span class="hljs-comment">// ... logic to get the user</span>
    <span class="hljs-keyword">const</span> user = {
      <span class="hljs-attr">id</span>: userId,
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;john_doe&#x27;</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
    };
    res.<span class="hljs-title function_">json</span>(user);
  },
};
</code></pre>
<h3 id="مثال-البحث-عن-مستخدمين-بمعاملات-استعلام">مثال: البحث عن مستخدمين بمعاملات استعلام</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> searchUsersEndpoint = {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;get&#x27;</span>,
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/search&#x27;</span>,
  <span class="hljs-attr">request</span>: {
    <span class="hljs-attr">query</span>: z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">query</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
      <span class="hljs-attr">page</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">default</span>(<span class="hljs-number">1</span>),
      <span class="hljs-attr">limit</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">default</span>(<span class="hljs-number">10</span>),
    }),
  },
  <span class="hljs-attr">response</span>: z.<span class="hljs-title function_">array</span>(
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
      <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
      <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>(),
    }),
  ),
  <span class="hljs-attr">handler</span>: <span class="hljs-title function_">async</span> ({ input, res }) =&gt; {
    <span class="hljs-keyword">const</span> { query, page, limit } = input.<span class="hljs-property">query</span>;
    <span class="hljs-comment">// ... search logic</span>
    <span class="hljs-keyword">const</span> users = [
      {
        <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123e4567-e89b-12d3-a456-426614174000&#x27;</span>,
        <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;john_doe&#x27;</span>,
        <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
      },
    ];
    res.<span class="hljs-title function_">json</span>(users);
  },
};
</code></pre>
<h2 id="معالجة-الأخطاء">معالجة الأخطاء</h2>
<p>يتعامل <code>express-zod-api</code> تلقائيًا مع أخطاء تحقّق Zod، فيعيد حالة 400 مع تفاصيل الخطأ. ويمكنك أيضًا معالجة أخطاء مخصّصة داخل معالجاتك.</p>
<h3 id="مثال-معالجة-أخطاء-مخصصة">مثال: معالجة أخطاء مخصّصة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> exampleEndpoint = {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-attr">handler</span>: <span class="hljs-title function_">async</span> ({ res }) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// some logic that can throw errors.</span>
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;custom error&#x27;</span>);
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">if</span> (e <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span>) {
        res.<span class="hljs-title function_">status</span>(<span class="hljs-number">500</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: e.<span class="hljs-property">message</span> });
      } <span class="hljs-keyword">else</span> {
        res.<span class="hljs-title function_">status</span>(<span class="hljs-number">500</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;unknown error&#x27;</span> });
      }
    }
  },
};
</code></pre>
<h2 id="فوائد-express-zod-api">فوائد <code>express-zod-api</code></h2>
<ul>
<li><strong>أمان الأنواع:</strong> يضمن Zod التحقق من مدخلات واجهتك البرمجية ومخرجاتها وتحديد أنواعها.</li>
<li><strong>تعريف مبسّط للواجهة البرمجية:</strong> عرّف نقاط نهاية واجهتك البرمجية كائنات، ما يجعلها سهلة القراءة والصيانة.</li>
<li><strong>تحقّق تلقائي:</strong> يُطبَّق تحقّق Zod تلقائيًا على الطلبات الواردة.</li>
<li><strong>تقليل الشيفرة المتكرّرة:</strong> يقلّل <code>express-zod-api</code> مقدار الشيفرة التي تحتاج إلى كتابتها للتحقق ومعالجة الأخطاء.</li>
<li><strong>توثيق واضح:</strong> تعمل مخططات Zod كتوثيق واضح لنقاط نهاية واجهتك البرمجية.</li>
<li><strong>تجربة مطوّر محسّنة:</strong> تعزّز المكتبة تجربة التطوير بتوفير أنواع قوية وتحقق سليم.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
