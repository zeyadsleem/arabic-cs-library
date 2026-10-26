const s="kinney",n="full-stack-typescript",a="TypeScript للويب الكامل",p="introduction-to-zod",l="مقدّمة إلى Zod",e=[{depth:2,id:"تثبيت-zod",text:"تثبيت Zod"},{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:2,id:"التحقق-من-الأوليات",text:"التحقّق من الأوليّات"},{depth:3,id:"تحليل-الكائنات",text:"تحليل الكائنات"},{depth:2,id:"توليد-الأنواع-من-المخطط",text:"توليد الأنواع من المخطط"}],t=`<p>يمنحك TypeScript أمان أنواع في وقت الترجمة، لكن عندما تأتي بياناتك من العالم الخارجي (واجهات API، مدخلات المستخدم، متغيّرات البيئة)، فلا ضمان أن تتصرّف كما ينبغي. هنا يدخل <strong><a href="https://www.npmjs.com/package/zod">Zod</a></strong> — مكتبة تحقّق في وقت التشغيل بلا اعتمادات، مبنية على TypeScript أولًا، وتضمن أن بياناتك آمنة الأنواع مثل شيفرتك (وتنجّيك من كوابيس وقت التشغيل غير المتوقعة).</p>
<p><a href="https://www.npmjs.com/package/zod">Zod</a> مكتبة لإعلان المخططات والتحقّق منها مبنية على TypeScript أولًا. وعلى خلاف استخدام واجهات TypeScript الصرفية (التي تختفي في وقت التشغيل)، تستطيع مخططات Zod أن:</p>
<ul>
<li>تتحقّق من مدخلات المستخدم في وقت التشغيل (على الخادم أو حتى على العميل).</li>
<li>تزوّدك بأنواع <strong>مستنتَجة من Zod</strong> فلا تحتاج إلى تعريف أشكال البيانات مرتين.</li>
<li><strong>مصدر حقيقة واحد:</strong> مخطط واحد يتحقّق من البيانات ويستنتج أنواع TypeScript.</li>
<li><strong>رسائل أخطاء أفضل:</strong> تغذية راجعة واضحة ومنظّمة عن الأخطاء للمطوّرين والمستخدمين معًا.</li>
<li><strong>تصميم معياري قابل للتركيب:</strong> ابنِ المخططات وأعد استخدامها لكل احتياجات بياناتك.</li>
<li><strong>ميزات متقدمة:</strong> تحويلات، وتحسينات مخصّصة، وتحقّقات غير متزامنة — وكل ما يلزم.</li>
</ul>
<h2 id="تثبيت-zod">تثبيت Zod</h2>
<p>مثل معظم المكتبات، يمكنك تثبيت Zod باستخدام مدير الحزم المفضل لديك.</p>
<pre><code class="language-bash"><span class="hljs-comment"># Using npm:</span>
npm install zod

<span class="hljs-comment"># Using yarn:</span>
yarn add zod

<span class="hljs-comment"># Using pnpm:</span>
pnpm add zod
</code></pre>
<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي <span class="content-anchor" id="basic-usage"></span></h2>
<h2 id="التحقق-من-الأوليات">التحقّق من الأوليّات</h2>
<p>في أبسط مستوياته، يمكننا استخدام Zod للتحقّق من أن شيئًا ما من نوع معيّن:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> stringSchema = z.<span class="hljs-title function_">string</span>();

stringSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-string">&#x27;hello&#x27;</span>);
</code></pre>
<p>وكما قد تتوقع، ينطبق الأمر نفسه على الأعداد.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> numberSchema = z.<span class="hljs-title function_">number</span>();

numberSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-number">42</span>); <span class="hljs-comment">// Valid</span>
<span class="hljs-comment">// numberSchema.parse(&quot;42&quot;); // Throws ZodError: Expected number, received string</span>
</code></pre>
<p>يمكنك حتى التحقّق من أشياء مثل <code>BitInt</code> وكائنات <code>Date</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> bigintSchema = z.<span class="hljs-title function_">bigint</span>();
<span class="hljs-keyword">const</span> dateSchema = z.<span class="hljs-title function_">date</span>();

bigintSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-number">123n</span>);
dateSchema.<span class="hljs-title function_">parse</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>());
</code></pre>
<h3 id="تحليل-الكائنات">تحليل الكائنات</h3>
<p>من الواضح أن الأمثلة أعلاه بسيطة أكثر من اللازم. يتجلّى نفع Zod عندما نريد أن نرى هل يطابق كائنٌ مخططًا معيّنًا.</p>
<p>يمكننا البدء بتعريف المخططات — ويمكنك التفكير فيها كما تفكّر في <code>type</code> أو <code>interface</code> في TypeScript.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">UserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>(),
});

<span class="hljs-comment">// Automatically infer the TypeScript type</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UserType</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserSchema</span>&gt;;
</code></pre>
<p>يمكننا أيضًا إضافة بعض التحقّق الإضافي (مثل التأكّد من أن شيئًا ما بريد إلكتروني أو له طول معيّن)، وهو ما لم نكن نستطيع فعله في TypeScript بغير ذلك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">UserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Name can&#x27;t be empty&quot;</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(<span class="hljs-string">&#x27;Invalid email format&#x27;</span>),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">120</span>),
});

<span class="hljs-comment">// Automatically infer the TypeScript type</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UserType</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserSchema</span>&gt;;
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، لمحقّقات صيغ النصوص مثل <code>.email()</code> مكافئات على المستوى الأعلى: <code>z.email()</code> و<code>z.uuid()</code> و<code>z.url()</code> وغيرها. وما زالت الصيغة المتسلسلة (<code>z.string().email()</code>) تعمل. كما أن خيار <code>{ message: &quot;...&quot; }</code> في المحقّقات مهجور لصالح <code>{ error: &quot;...&quot; }</code>.</p>
</blockquote>
<p>بمجرد أن يكون لديك مخطط، يمكنك استخدام Zod للتحقّق من الكائنات وضمان مطابقتها لذلك المخطط.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Using parse() – throws on failure</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> validUser = <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">parse</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>,
  });
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Valid user:&#x27;</span>, validUser);
} <span class="hljs-keyword">catch</span> (error) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Validation error:&#x27;</span>, error);
}

<span class="hljs-comment">// Using safeParse() – returns a result object</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">safeParse</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;bob@example&#x27;</span>, <span class="hljs-comment">// Invalid email!</span>
  <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>,
});

<span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Validation failed:&#x27;</span>, result.<span class="hljs-property">error</span>.<span class="hljs-property">errors</span>);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Valid user:&#x27;</span>, result.<span class="hljs-property">data</span>);
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>استخدم <code>safeParse()</code> لتجنّب فوضى <code>try</code>/<code>catch</code> مع معالجة الأخطاء بأناقة في الوقت نفسه.</p>
</blockquote>
<h2 id="توليد-الأنواع-من-المخطط">توليد الأنواع من المخطط</h2>
<p>سحر Zod هو أن مخططك هو مصدر حقيقتك الوحيد. فلن تكتب أنواعًا مكرّرة!</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">price</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Product</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">ProductSchema</span>&gt;;

<span class="hljs-comment">// Now, Product is:</span>
<span class="hljs-comment">// { id: string; name: string; price: number; }</span>
</code></pre>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يمكن كتابة <code>z.string().uuid()</code> بالصيغة <code>z.uuid()</code>. ولاحظ أن <code>z.uuid()</code> في v4 يفرض تحقّقًا أكثر صرامة وفق RFC 9562. واستخدم <code>z.guid()</code> إن احتجت سلوك v3 الأكثر تسامحًا.</p>
</blockquote>
<p>تحصل بياناتك المتحقَّق منها تلقائيًا على نوع TypeScript الصحيح — لا مزيد من الأنواع غير المتطابقة بين فحوص وقت التشغيل وتوقعات وقت الترجمة.</p>
<p><strong>التالي</strong>: <a href="https://stevekinney.com/courses/full-stack-typescript/advanced-types-with-zod">أنواع متقدمة مع Zod</a></p>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,t as html,p as slug,l as title};
