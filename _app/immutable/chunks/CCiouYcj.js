const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",l="advanced-schema-design-with-zod",p="تصميم مخططات متقدّمة مع Zod",t=[{depth:2,id:"بنى-البيانات-التعاودية-مع-zlazy",text:"بنى البيانات التعاودية مع z.lazy()"},{depth:2,id:"المعالجة-المسبقة-للتحقق-المعقد-مع-zpreprocess-وzsuperpreprocess",text:"المعالجة المسبقة للتحقق المعقّد مع z.preprocess() وz.superPreprocess()"},{depth:2,id:"التناغم-بين-zod-وtypescript-شراكة-قوية",text:"التناغم بين Zod وTypeScript: شراكة قوية"},{depth:3,id:"استنتاج-الأنواع-جسر-بين-وقت-التشغيل-ووقت-التصريف",text:"استنتاج الأنواع: جسر بين وقت التشغيل ووقت التصريف"},{depth:3,id:"بصمات-الدوال-ضمان-سلامة-الأنواع-عند-حدود-الدوال",text:"بصمات الدوال: ضمان سلامة الأنواع عند حدود الدوال"},{depth:3,id:"التحقق-اللامتزامن-التعامل-مع-مصادر-البيانات-الخارجية",text:"التحقق اللامتزامن: التعامل مع مصادر البيانات الخارجية"},{depth:3,id:"zod-في-الميدان-تطبيقات-واقعية",text:"Zod في الميدان: تطبيقات واقعية"},{depth:2,id:"التحقق-من-طلبات-api-واستجاباتها",text:"التحقق من طلبات API واستجاباتها"},{depth:2,id:"التحقق-من-النماذج",text:"التحقق من النماذج"},{depth:2,id:"تسلسل-البيانات-وإلغاء-تسلسلها",text:"تسلسل البيانات وإلغاء تسلسلها"},{depth:2,id:"التحقق-من-التهيئة",text:"التحقق من التهيئة"},{depth:2,id:"خرائط-أخطاء-مخصصة",text:"خرائط أخطاء مخصّصة"},{depth:3,id:"تعيين-خريطة-أخطاء-عالمية",text:"تعيين خريطة أخطاء عالمية"},{depth:3,id:"خريطة-أخطاء-على-مستوى-المخطط",text:"خريطة أخطاء على مستوى المخطط"},{depth:3,id:"لماذا-تستخدم-خرائط-الأخطاء",text:"لماذا تستخدم خرائط الأخطاء؟"},{depth:3,id:"مثال-تحويل-السلاسل-النصية-إلى-أرقام",text:"مثال: تحويل السلاسل النصية إلى أرقام"},{depth:2,id:"دمج-المخططات",text:"دمج المخططات"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"الفرق-عن-التقاطع",text:"الفرق عن التقاطع"}],e=`<p>يقدّم Zod أنماط تصميم متقدّمة للمخططات للتعامل مع سيناريوهات التحقق المعقّدة بفعالية.</p>
<h2 id="بنى-البيانات-التعاودية-مع-zlazy">بنى البيانات التعاودية مع <code>z.lazy()</code></h2>
<p>تعامل مع المخططات التي تشير إلى نفسها تعاوديًا (مثل البنى الشجرية). ويتيح لك <code>z.lazy()</code> تعريف مخطط يشير إلى نفسه دون إحداث مشكلات اعتماد دائري أثناء تعريف المخطط.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Category</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">subcategories</span>?: <span class="hljs-title class_">Category</span>[]; <span class="hljs-comment">// Recursive reference</span>
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">categorySchema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;<span class="hljs-title class_">Category</span>&gt; = z.<span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">subcategories</span>: z.<span class="hljs-title function_">array</span>(categorySchema).<span class="hljs-title function_">optional</span>(), <span class="hljs-comment">// Use lazy schema here</span>
  }),
);

<span class="hljs-keyword">const</span> <span class="hljs-attr">validCategory</span>: <span class="hljs-title class_">Category</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Electronics&#x27;</span>,
  <span class="hljs-attr">subcategories</span>: [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Computers&#x27;</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Phones&#x27;</span>, <span class="hljs-attr">subcategories</span>: [{ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Smartphones&#x27;</span> }] },
  ],
};

categorySchema.<span class="hljs-title function_">parse</span>(validCategory); <span class="hljs-comment">// Valid</span>

<span class="hljs-keyword">const</span> <span class="hljs-attr">invalidCategory</span>: <span class="hljs-built_in">any</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Books&#x27;</span>,
  <span class="hljs-attr">subcategories</span>: [{ <span class="hljs-attr">name</span>: <span class="hljs-number">123</span> }], <span class="hljs-comment">// Invalid subcategory type</span>
};

<span class="hljs-comment">// categorySchema.parse(invalidCategory); // Throws ZodError: Expected object, received number at &#x27;subcategories[0].name&#x27;</span>
</code></pre>
<h2 id="المعالجة-المسبقة-للتحقق-المعقد-مع-zpreprocess-وzsuperpreprocess">المعالجة المسبقة للتحقق المعقّد مع <code>z.preprocess()</code> و<code>z.superPreprocess()</code></h2>
<p>استخدم المعالجة المسبقة للتعامل مع تحويلات بيانات معقّدة أو منطق تحقق شرطي قبل تطبيق التحقق الأساسي بالمخطط. وهذا مفيد بشكل خاص عند التعامل مع بيانات تحتاج إلى تهيئة كبيرة قبل أن يمكن التحقق منها وفق مخطط محدد.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> complexDataSchema = z.<span class="hljs-title function_">preprocess</span>(
  <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> input === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp; input.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;{&#x27;</span>) &amp;&amp; input.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;}&#x27;</span>)) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(input); <span class="hljs-comment">// Attempt to parse JSON string</span>
      } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-keyword">return</span> input; <span class="hljs-comment">// If parsing fails, return original string for string validation</span>
      }
    }
    <span class="hljs-keyword">return</span> input; <span class="hljs-comment">// Return original input if not a JSON-like string</span>
  },
  z.<span class="hljs-title function_">union</span>([
    z.<span class="hljs-title function_">object</span>({
      <span class="hljs-comment">// Schema for parsed JSON object</span>
      <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">literal</span>(<span class="hljs-string">&#x27;json&#x27;</span>),
      <span class="hljs-attr">data</span>: z.<span class="hljs-title function_">object</span>({ <span class="hljs-attr">value</span>: z.<span class="hljs-title function_">number</span>() }),
    }),
    z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;prefix-&#x27;</span>), <span class="hljs-comment">// Schema for string with prefix</span>
  ]),
);

complexDataSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;{ &quot;type&quot;: &quot;json&quot;, &quot;data&quot;: { &quot;value&quot;: 42 } }&#x27;</span>); <span class="hljs-comment">// Valid, parses JSON and validates object schema</span>
complexDataSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;prefix-string-value&#x27;</span>); <span class="hljs-comment">// Valid, validates string schema</span>
<span class="hljs-comment">// complexDataSchema.parse(&quot;invalid json string&quot;); // Throws ZodError for string schema validation failure</span>
</code></pre>
<p>بإتقانك بناء المخططات وتحسينها وتحويلها ومعالجة أخطائها، تملك القدرة على تعريف توقعات بيانات دقيقة وفرضها بصرامة في وقت التشغيل باستخدام Zod.</p>
<h2 id="التناغم-بين-zod-وtypescript-شراكة-قوية">التناغم بين Zod وTypeScript: شراكة قوية</h2>
<p>صُمّم Zod ليعمل بانسجام مع TypeScript، فيحسّن تجربة المطوّر ويعظّم سلامة الأنواع في كل أنحاء تطبيقاتك.</p>
<h3 id="استنتاج-الأنواع-جسر-بين-وقت-التشغيل-ووقت-التصريف">استنتاج الأنواع: جسر بين وقت التشغيل ووقت التصريف</h3>
<p>تشكّل قدرات استنتاج الأنواع القوية في Zod تغييرًا جذريًا لمطوّري TypeScript. فتتيح لك أداة <code>z.infer&lt;typeof schema&gt;</code> استخراج نوع TypeScript تلقائيًا من مخطط Zod. وهذا يلغي الحاجة إلى تعريف أنواع يدويًا تحاكي مخططاتك، فيقلّل التكرار ويضمن اتساق الأنواع بين منطق التحقق لديك وشيفرة TypeScript.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> productSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>),
  <span class="hljs-attr">price</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
  <span class="hljs-attr">description</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-comment">// Infer the TypeScript type from the Zod schema</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Product</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> productSchema&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">processProduct</span>(<span class="hljs-params"><span class="hljs-attr">product</span>: <span class="hljs-title class_">Product</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Processing product: <span class="hljs-subst">\${product.name}</span> (ID: <span class="hljs-subst">\${product.id}</span>), Price: $<span class="hljs-subst">\${product.price}</span>\`</span>);
  <span class="hljs-comment">// ... further logic with type-safe &#x27;product&#x27; object</span>
}

<span class="hljs-keyword">const</span> validProductData = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;a1b2c3d4-e5f6-7890-1234-567890abcdef&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Awesome Gadget&#x27;</span>,
  <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>,
};

<span class="hljs-keyword">const</span> parsedProduct = productSchema.<span class="hljs-title function_">parse</span>(validProductData); <span class="hljs-comment">// Runtime validation</span>
<span class="hljs-title function_">processProduct</span>(parsedProduct); <span class="hljs-comment">// Type-safe usage of validated data</span>
</code></pre>
<p>باستخدام <code>z.infer</code>، تنشئ مصدرًا واحدًا للحقيقة لبنية بياناتك، وهو مخطط Zod. ويفهم TypeScript تلقائيًا شكل البيانات المتحقَّق منها، فيوفّر سلامة أنواع في وقت التصريف لبيانات متحقَّق منها في وقت التشغيل.</p>
<h3 id="بصمات-الدوال-ضمان-سلامة-الأنواع-عند-حدود-الدوال">بصمات الدوال: ضمان سلامة الأنواع عند حدود الدوال</h3>
<p>يمكن استخدام مخططات Zod لتعريف بصمات أنواع دقيقة لمعاملات الدوال وقيمها المعادة، فتوسّع سلامة الأنواع إلى ما هو أبعد من بنى الكائنات لتشمل واجهات الدوال. وهذا مفيد بشكل خاص لضمان صحة الأنواع عند التعامل مع دوال تتعامل مع بيانات خارجية أو تجري تحويلات بيانات معقّدة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> configSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">apiKey</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">apiUrl</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>(),
  <span class="hljs-attr">timeout</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>().<span class="hljs-title function_">default</span>(<span class="hljs-number">5000</span>), <span class="hljs-comment">// Default timeout in milliseconds</span>
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Config</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> configSchema&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">initializeApp</span>(<span class="hljs-params"><span class="hljs-attr">configData</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-title class_">Config</span> {
  <span class="hljs-comment">// Input as &#x27;unknown&#x27; to force runtime validation</span>
  <span class="hljs-keyword">const</span> config = configSchema.<span class="hljs-title function_">parse</span>(configData); <span class="hljs-comment">// Runtime validation of config data</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;App initialized with config:&#x27;</span>, config);
  <span class="hljs-keyword">return</span> config; <span class="hljs-comment">// Type-safe Config object returned</span>
}

<span class="hljs-keyword">const</span> validConfigData = {
  <span class="hljs-attr">apiKey</span>: <span class="hljs-string">&#x27;your-api-key&#x27;</span>,
  <span class="hljs-attr">apiUrl</span>: <span class="hljs-string">&#x27;[https://api.example.com](https://www.google.com/search?q=https://api.example.com)&#x27;</span>,
  <span class="hljs-comment">// timeout is optional, default will be used</span>
};

<span class="hljs-keyword">const</span> appConfig = <span class="hljs-title function_">initializeApp</span>(validConfigData); <span class="hljs-comment">// Runtime validation and type-safe config</span>
<span class="hljs-comment">// initializeApp({ apiKey: 123, apiUrl: &quot;invalid-url&quot; }); // Runtime validation error</span>

<span class="hljs-comment">// Type-safe access to config properties</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;API Key:&#x27;</span>, appConfig.<span class="hljs-property">apiKey</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;API URL:&#x27;</span>, appConfig.<span class="hljs-property">apiUrl</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Timeout:&#x27;</span>, appConfig.<span class="hljs-property">timeout</span>);
</code></pre>
<p>باستخدام مخططات Zod لتعريف بصمات الدوال، تنشئ عقودًا واضحة لدوالك، فتضمن أنها تستقبل وتعيد بيانات بالتنسيق المتوقع، متحقَّقًا منها في وقت التشغيل.</p>
<h3 id="التحقق-اللامتزامن-التعامل-مع-مصادر-البيانات-الخارجية">التحقق اللامتزامن: التعامل مع مصادر البيانات الخارجية</h3>
<p>يدعم Zod التحقق اللامتزامن بالتابع <code>schema.parseAsync(data)</code>. وهذا حاسم في السيناريوهات التي يحتاج فيها منطق التحقق إلى التفاعل مع موارد خارجية، مثل قواعد البيانات أو واجهات API، لإجراء الفحوص.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> usernameSchema = z
  .<span class="hljs-title function_">string</span>()
  .<span class="hljs-title function_">min</span>(<span class="hljs-number">3</span>)
  .<span class="hljs-title function_">refine</span>(
    <span class="hljs-title function_">async</span> (username) =&gt; {
      <span class="hljs-comment">// Simulate asynchronous check against a database or API</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">500</span>)); <span class="hljs-comment">// Simulate network latency</span>
      <span class="hljs-keyword">const</span> isUsernameTaken = <span class="hljs-keyword">await</span> <span class="hljs-title function_">checkUsernameAvailability</span>(username); <span class="hljs-comment">// Assume this function checks username in a database</span>
      <span class="hljs-keyword">return</span> !isUsernameTaken; <span class="hljs-comment">// Username is valid if not taken</span>
    },
    { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Username is already taken&#x27;</span> },
  );

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">validateUsername</span>(<span class="hljs-params"><span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> validatedUsername = <span class="hljs-keyword">await</span> usernameSchema.<span class="hljs-title function_">parseAsync</span>(username);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Username &quot;<span class="hljs-subst">\${validatedUsername}</span>&quot; is valid and available.\`</span>);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> z.<span class="hljs-property">ZodError</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Username validation failed:&#x27;</span>, error.<span class="hljs-property">errors</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Unexpected error:&#x27;</span>, error);
    }
  }
}

<span class="hljs-comment">// Assume checkUsernameAvailability is an asynchronous function that checks username availability</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">checkUsernameAvailability</span>(<span class="hljs-params"><span class="hljs-attr">username</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">boolean</span>&gt; {
  <span class="hljs-comment">// ... (Implementation to check username in database or API) ...</span>
  <span class="hljs-comment">// Simulate:</span>
  <span class="hljs-keyword">const</span> takenUsernames = [<span class="hljs-string">&#x27;takenUser&#x27;</span>, <span class="hljs-string">&#x27;anotherTakenUser&#x27;</span>];
  <span class="hljs-keyword">return</span> takenUsernames.<span class="hljs-title function_">includes</span>(username);
}

<span class="hljs-title function_">validateUsername</span>(<span class="hljs-string">&#x27;newUser123&#x27;</span>); <span class="hljs-comment">// Validates asynchronously, assuming &quot;newUser123&quot; is available</span>
<span class="hljs-comment">// validateUsername(&quot;takenUser&quot;); // Validates asynchronously, throws ZodError: Username is already taken</span>
</code></pre>
<p>يعيد <code>parseAsync()</code> وعدًا يُحلّ بالبيانات المتحقَّق منها إذا نجح التحقق، أو يُرفض بـ <code>ZodError</code> إذا فشل التحقق. وهذا يتيح لك دمج التحقق اللامتزامن بانسجام في تدفق بيانات تطبيقك.</p>
<h3 id="zod-في-الميدان-تطبيقات-واقعية">Zod في الميدان: تطبيقات واقعية</h3>
<p>تجعل تعدّد استخدامات Zod قابلًا للتطبيق في سياقات متنوعة في تطوير TypeScript. وإليك بعض حالات الاستخدام الواقعية الشائعة:</p>
<h2 id="التحقق-من-طلبات-api-واستجاباتها">التحقق من طلبات API واستجاباتها</h2>
<p>في تطبيقات الخادم (مثل Express وNestJS)، استخدم Zod للتحقق من طلبات API الواردة واستجابات API الصادرة. وهذا يضمن سلامة البيانات عند حدود API لديك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> express, { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>()); <span class="hljs-comment">// Middleware to parse JSON bodies</span>

<span class="hljs-keyword">const</span> createUserSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">password</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">8</span>),
});

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/users&#x27;</span>, <span class="hljs-title function_">async</span> (<span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> userData = createUserSchema.<span class="hljs-title function_">parse</span>(req.<span class="hljs-property">body</span>); <span class="hljs-comment">// Validate request body</span>
    <span class="hljs-comment">// ... (Create user in database using validated userData) ...</span>
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;User created successfully&#x27;</span>, <span class="hljs-attr">user</span>: userData });
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> z.<span class="hljs-property">ZodError</span>) {
      res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">errors</span>: error.<span class="hljs-property">errors</span> }); <span class="hljs-comment">// Return validation errors to client</span>
    } <span class="hljs-keyword">else</span> {
      res.<span class="hljs-title function_">status</span>(<span class="hljs-number">500</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Server error&#x27;</span> });
    }
  }
});

app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3000</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Server listening on port 3000&#x27;</span>));
</code></pre>
<h2 id="التحقق-من-النماذج">التحقق من النماذج</h2>
<p>في تطبيقات الويب (مثل React وAngular وVue.js)، استخدم Zod للتحقق من مدخلات المستخدم في النماذج. وهذا يوفّر تحققًا قويًا من جهة العميل ويحسّن تجربة المستخدم.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> contactFormSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">2</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">message</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">10</span>),
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ContactFormData</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> contactFormSchema&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContactForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = useState&lt;<span class="hljs-title class_">ContactFormData</span>&gt;({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  });
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;z.<span class="hljs-property">ZodError</span>&lt;<span class="hljs-title class_">ContactFormData</span>&gt; | <span class="hljs-literal">null</span>&gt;(
    <span class="hljs-literal">null</span>,
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">const</span> validationResult = contactFormSchema.<span class="hljs-title function_">safeParse</span>(formData); <span class="hljs-comment">// Validate form data</span>

    <span class="hljs-keyword">if</span> (validationResult.<span class="hljs-property">success</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Form data is valid:&#x27;</span>, validationResult.<span class="hljs-property">data</span>);
      <span class="hljs-title function_">setErrors</span>(<span class="hljs-literal">null</span>); <span class="hljs-comment">// Clear errors</span>
      <span class="hljs-comment">// ... (Submit form data) ...</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Form validation errors:&#x27;</span>, validationResult.<span class="hljs-property">error</span>.<span class="hljs-property">errors</span>);
      <span class="hljs-title function_">setErrors</span>(validationResult.<span class="hljs-property">error</span>); <span class="hljs-comment">// Set errors to display to user</span>
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params">
    <span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span> | <span class="hljs-title class_">HTMLTextAreaElement</span>&gt;,
  </span>) =&gt; {
    <span class="hljs-title function_">setFormData</span>({ ...formData, [e.<span class="hljs-property">target</span>.<span class="hljs-property">name</span>]: e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span> });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>Name:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;name&quot;</span>
          <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.name}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span>
        /&gt;</span>
        {errors?.formErrors
          .filter((err) =&gt; err.path[0] === &#x27;name&#x27;)
          .map((err) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{err.message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      {/* ... (Email and Message fields and error display similar to Name) ... */}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تسلسل-البيانات-وإلغاء-تسلسلها">تسلسل البيانات وإلغاء تسلسلها</h2>
<p>تحقق من البيانات وحوّلها عند التسلسل إلى صيغ مثل JSON أو إلغاء التسلسل منها، أو عند التعامل مع أنظمة تخزين.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> userDataSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">userId</span>: z.<span class="hljs-title function_">number</span>(),
  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">profileData</span>: z
    .<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">bio</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">optional</span>(),
      <span class="hljs-attr">avatarUrl</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>().<span class="hljs-title function_">optional</span>(),
    })
    .<span class="hljs-title function_">nullable</span>(), <span class="hljs-comment">// Profile data can be null</span>
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserData</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> userDataSchema&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">serializeUserData</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">UserData</span></span>): <span class="hljs-built_in">string</span> {
  userDataSchema.<span class="hljs-title function_">parse</span>(user); <span class="hljs-comment">// Validate before serialization</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(user);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">deserializeUserData</span>(<span class="hljs-params"><span class="hljs-attr">jsonString</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">UserData</span> {
  <span class="hljs-keyword">const</span> parsedData = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(jsonString);
  <span class="hljs-keyword">return</span> userDataSchema.<span class="hljs-title function_">parse</span>(parsedData); <span class="hljs-comment">// Validate after deserialization</span>
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">userToSerialize</span>: <span class="hljs-title class_">UserData</span> = {
  <span class="hljs-attr">userId</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testUser&#x27;</span>,
  <span class="hljs-attr">profileData</span>: {
    <span class="hljs-attr">bio</span>: <span class="hljs-string">&#x27;Software developer&#x27;</span>,
    <span class="hljs-attr">avatarUrl</span>:
      <span class="hljs-string">&#x27;[https://example.com/avatar.png](https://www.google.com/search?q=https://example.com/avatar.png)&#x27;</span>,
  },
};

<span class="hljs-keyword">const</span> serialized = <span class="hljs-title function_">serializeUserData</span>(userToSerialize);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Serialized user data:&#x27;</span>, serialized);

<span class="hljs-keyword">const</span> deserialized = <span class="hljs-title function_">deserializeUserData</span>(serialized);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Deserialized user data:&#x27;</span>, deserialized);
</code></pre>
<h2 id="التحقق-من-التهيئة">التحقق من التهيئة</h2>
<p>افرض سلامة الأنواع على ملفات تهيئة التطبيق، بما يضمن صلاحية قيم التهيئة ويمنع أخطاء وقت التشغيل الناتجة عن تهيئة خاطئة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> yaml <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;js-yaml&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> appConfigSchema = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">server</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">host</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">port</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
  }),
  <span class="hljs-attr">database</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">url</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">url</span>(),
    <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">password</span>: z.<span class="hljs-title function_">string</span>(),
  }),
  <span class="hljs-attr">featureFlags</span>: z.<span class="hljs-title function_">record</span>(z.<span class="hljs-title function_">string</span>(), z.<span class="hljs-title function_">boolean</span>()).<span class="hljs-title function_">optional</span>(), <span class="hljs-comment">// Optional feature flags</span>
});
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AppConfig</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> appConfigSchema&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">loadConfig</span>(<span class="hljs-params"><span class="hljs-attr">configPath</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">AppConfig</span> {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> configFile = fs.<span class="hljs-title function_">readFileSync</span>(configPath, <span class="hljs-string">&#x27;utf8&#x27;</span>);
    <span class="hljs-keyword">const</span> configData = yaml.<span class="hljs-title function_">load</span>(configFile); <span class="hljs-comment">// Load YAML config</span>
    <span class="hljs-keyword">return</span> appConfigSchema.<span class="hljs-title function_">parse</span>(configData); <span class="hljs-comment">// Validate config data</span>
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> z.<span class="hljs-property">ZodError</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Configuration validation failed:&#x27;</span>, error.<span class="hljs-property">errors</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Error loading configuration:&#x27;</span>, error);
    }
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to load application configuration.&#x27;</span>);
  }
}

<span class="hljs-keyword">const</span> config = <span class="hljs-title function_">loadConfig</span>(<span class="hljs-string">&#x27;./config.yaml&#x27;</span>); <span class="hljs-comment">// Load and validate configuration from YAML file</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Loaded configuration:&#x27;</span>, config);

<span class="hljs-comment">// Type-safe access to configuration values</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Server Host:&#x27;</span>, config.<span class="hljs-property">server</span>.<span class="hljs-property">host</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Database URL:&#x27;</span>, config.<span class="hljs-property">database</span>.<span class="hljs-property">url</span>);
</code></pre>
<p>توضح هذه الأمثلة اتساع قابلية تطبيق Zod. وبإدماج Zod في مشاريع TypeScript لديك، يمكنك تحسين التحقق من البيانات وسلامة الأنواع تحسينًا كبيرًا في طبقات التطبيق المختلفة.</p>
<h2 id="خرائط-أخطاء-مخصصة">خرائط أخطاء مخصّصة</h2>
<p>قد تبدو رسائل الخطأ الافتراضية في Zod آلية بعض الشيء لذوقك. فاستخدم خريطة أخطاء مخصّصة لتعديلها عالميًا أو محليًا.</p>
<h3 id="تعيين-خريطة-أخطاء-عالمية">تعيين خريطة أخطاء عالمية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z, <span class="hljs-title class_">ZodError</span>, <span class="hljs-title class_">ZodIssueCode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

z.<span class="hljs-title function_">setErrorMap</span>(<span class="hljs-function">(<span class="hljs-params">issue, ctx</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (issue.<span class="hljs-property">code</span> === <span class="hljs-title class_">ZodIssueCode</span>.<span class="hljs-property">invalid_type</span>) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">message</span>: <span class="hljs-string">\`Invalid type: expected <span class="hljs-subst">\${issue.expected}</span>, got <span class="hljs-subst">\${issue.received}</span>\`</span> };
  }
  <span class="hljs-comment">// fallback to default message</span>
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">message</span>: ctx.<span class="hljs-property">defaultError</span> };
});

z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">parse</span>(<span class="hljs-number">123</span>);
<span class="hljs-comment">// =&gt; &quot;Invalid type: expected string, got number&quot;</span>
</code></pre>
<h3 id="خريطة-أخطاء-على-مستوى-المخطط">خريطة أخطاء على مستوى المخطط</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> mySchema = z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">errorMap</span>(<span class="hljs-function">(<span class="hljs-params">issue, ctx</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;This isn&#x27;t a string—cut it out.&quot;</span> };
});
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، لم يعد التابع <code>.errorMap()</code> على مستوى المخطط موجودًا. استخدم المعامل <code>error</code> مباشرةً على المُحقِّقات الفردية بدلًا منه. كما استُبدل <code>z.setErrorMap()</code> العالمي بـ <code>z.config()</code>.</p>
</blockquote>
<h3 id="لماذا-تستخدم-خرائط-الأخطاء">لماذا تستخدم خرائط الأخطاء؟</h3>
<ul>
<li>تنسيق مركزي ومتسق للأخطاء.</li>
<li>تجاوزات محلية أو عالمية.</li>
<li>رسائل أوْدّ وأكثر تخصصًا في النطاق.</li>
</ul>
<p>مخططات التحويل القسري: دع Zod يقوم بالتحليل</p>
<p>إذا وصلتك مدخلات نصية تمثل أرقامًا أو قيمًا منطقية أو تواريخ، فجرّب واجهات <code>z.coerce.*</code> الجديدة لتحويلها تلقائيًا.</p>
<h3 id="مثال-تحويل-السلاسل-النصية-إلى-أرقام">مثال: تحويل السلاسل النصية إلى أرقام</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> numberFromString = z.<span class="hljs-property">coerce</span>.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">10</span>);

<span class="hljs-comment">// &quot;15&quot; -&gt; 15 -&gt; passes</span>
numberFromString.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;15&#x27;</span>);

<span class="hljs-comment">// &quot;8&quot; -&gt; 8 -&gt; fails because it&#x27;s &lt; 10</span>
</code></pre>
<h4>تحويلات قسرية أخرى</h4>
<ul>
<li><code>z.coerce.boolean()</code></li>
<li><code>z.coerce.date()</code></li>
</ul>
<p>وهذا أبسط من كتابة <code>.preprocess()</code> أو <code>.transform()</code> يدويًا في حالات كثيرة.</p>
<h2 id="دمج-المخططات">دمج المخططات</h2>
<p>يدمج <code>objectSchemaA.merge(objectSchemaB)</code> مخططَي كائنات، جامعًا الخصائص (ومتجاوزًا بعضها).</p>
<h3 id="مثال">مثال</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> schemaA = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>(),
});

<span class="hljs-keyword">const</span> schemaB = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">18</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
});

<span class="hljs-keyword">const</span> merged = schemaA.<span class="hljs-title function_">merge</span>(schemaB);
<span class="hljs-comment">// =&gt; z.object({</span>
<span class="hljs-comment">//      name: z.string(),</span>
<span class="hljs-comment">//      age: z.number().min(18),</span>
<span class="hljs-comment">//      email: z.string().email(),</span>
<span class="hljs-comment">//    });</span>
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، أصبح <code>.merge()</code> مهجورًا. استخدم <code>.extend()</code> بدلًا منه: <code>schemaA.extend(schemaB.shape)</code>.</p>
</blockquote>
<h3 id="الفرق-عن-التقاطع">الفرق عن التقاطع</h3>
<ul>
<li>يعمل <code>merge</code> على مخططات الكائنات فقط ويدمج الخصائص (مع تجاوز المخطط الثاني للمفاتيح المتعارضة).</li>
<li>يستطيع <code>intersection</code> جمع أي مخططات (لا الكائنات فقط) ويشترط نجاح التحققين معًا.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
