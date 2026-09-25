const s="patterns-dev",n="vanilla",a="أنماط JavaScript",t="factory-pattern",l="نمط المصنع (factory)",p=[{depth:2,id:"دالة-مصنع-بسيطة",text:"دالة مصنع بسيطة"},{depth:2,id:"مثال-أكثر-فائدة-مصنع-لعميل-client-http",text:"مثال أكثر فائدة: مصنع لعميل (client) HTTP"},{depth:2,id:"مصانع-جداول-البحث-مشكلة-المركبة-بالطريقة-الصحيحة",text:"مصانع جداول البحث: مشكلة المركبة، بالطريقة الصحيحة"},{depth:2,id:"المصنع-مقابل-الصنف-مقابل-حاوية-حقن-التبعيات",text:"المصنع مقابل الصنف مقابل حاوية حقن التبعيات"},{depth:2,id:"مصانع-آمنة-النوع-في-typescript",text:"مصانع آمنة النوع في TypeScript"},{depth:2,id:"التجفيف-كمصنع-خفيف",text:"التجفيف كمصنع خفيف"},{depth:2,id:"متى-لا-تستخدم-مصنعا",text:"متى لا تستخدم مصنعًا"},{depth:2,id:"المقايضات",text:"المقايضات"},{depth:2,id:"المراجع",text:"المراجع"}],c=`<p>المصنع (factory) دالة تتمثل مهمتها في <em>إعادة كائن</em> — ربما بأشكال كائن مختلفة وفق ما تمرره — من دون أن يضطر المستدع إلى التعامل مع <code>new</code> أو تسلسلات الأصناف أو معرفة النوع الملموس الذي يستلمه.</p>
<p>في JavaScript الحديثة، لا تحتاج تقريبًا إلى صنف لفعل ذلك. تكفي دالة تلتقط بعض الإعدادات وتعيد كائنًا حرفيًا. لم تعد الأسئلة المهمة «كيف أنفذ مصنعًا»، بل «متى يتفوق المصنع على صنف، ومتى يتفوق على اتحاد مميز أو حاوية حقن تبعيات؟»</p>
<h2 id="دالة-مصنع-بسيطة">دالة مصنع بسيطة</h2>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">createLogger</span> = (<span class="hljs-params">{ level = <span class="hljs-string">&quot;info&quot;</span>, prefix = <span class="hljs-string">&quot;&quot;</span> } = {}</span>) =&gt; {

<span class="hljs-keyword">const</span> ranks = { <span class="hljs-attr">debug</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">info</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">warn</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">error</span>: <span class="hljs-number">3</span> };

<span class="hljs-keyword">const</span> threshold = ranks[level];

<span class="hljs-keyword">const</span> <span class="hljs-title function_">log</span> = (<span class="hljs-params">lvl, msg, ...rest</span>) =&gt; {

<span class="hljs-keyword">if</span> (ranks[lvl] &lt; threshold) <span class="hljs-keyword">return</span>;

<span class="hljs-variable language_">console</span>[lvl](<span class="hljs-string">\`<span class="hljs-subst">\${prefix}</span><span class="hljs-subst">\${msg}</span>\`</span>, ...rest);

};

<span class="hljs-keyword">return</span> {

<span class="hljs-attr">debug</span>: <span class="hljs-function">(<span class="hljs-params">m, ...r</span>) =&gt;</span> <span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;debug&quot;</span>, m, ...r),

<span class="hljs-attr">info</span>:  <span class="hljs-function">(<span class="hljs-params">m, ...r</span>) =&gt;</span> <span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;info&quot;</span>, m, ...r),

<span class="hljs-attr">warn</span>:  <span class="hljs-function">(<span class="hljs-params">m, ...r</span>) =&gt;</span> <span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;warn&quot;</span>, m, ...r),

<span class="hljs-attr">error</span>: <span class="hljs-function">(<span class="hljs-params">m, ...r</span>) =&gt;</span> <span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;error&quot;</span>, m, ...r),

};

};

<span class="hljs-keyword">const</span> log = <span class="hljs-title function_">createLogger</span>({ <span class="hljs-attr">level</span>: <span class="hljs-string">&quot;warn&quot;</span>, <span class="hljs-attr">prefix</span>: <span class="hljs-string">&quot;[api] &quot;</span> });

log.<span class="hljs-title function_">info</span>(<span class="hljs-string">&quot;ignored&quot;</span>);          <span class="hljs-comment">// silenced by threshold</span>

log.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&quot;rate limit hit&quot;</span>);   <span class="hljs-comment">// [api] rate limit hit</span>
</code></pre>
<p>هناك أمران يجعلان هذا يعمل بوصفه مصنعًا لا مجرد «دالة تعيد كائنًا»:</p>
<ul>
<li><strong>إنه يضم الإعداد.</strong> تحدث خريطة <code>ranks</code> والبحث عن <code>threshold</code> مرة واحدة بالضبط، عند إنشاء المسجل. وكل استدعاء لـ<code>log.warn</code> يعيد استخدام القيم المغلقة.</li>
<li><strong>إنه يعيد واجهة، لا نوعًا.</strong> يعتمد المستدعون على الشكل <code>{ debug, info, warn, error }</code>. سواء أتى ذلك من صنف أو كائن حرفي أو Proxy، فالأمر غير مرئي لهم — وهذا هو الفصل الذي سعى المصنع دائمًا إلى تمكينه.</li>
</ul>
<h2 id="مثال-أكثر-فائدة-مصنع-لعميل-client-http">مثال أكثر فائدة: مصنع لعميل (client) HTTP</h2>
<p>الإعدادات التي تختلف حسب البيئة أو المستأجر أو الخدمة هي الحالة النموذجية للمصنع:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">createApiClient</span> = (<span class="hljs-params">{ baseUrl, auth, fetch = globalThis.fetch }</span>) =&gt; {

<span class="hljs-keyword">const</span> <span class="hljs-title function_">headers</span> = (<span class="hljs-params"></span>) =&gt; ({

<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>,

...(auth?.<span class="hljs-property">token</span> &amp;&amp; { <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">\`Bearer <span class="hljs-subst">\${auth.token}</span>\`</span> }),

});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">request</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params">method, path, body</span>) =&gt; {

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${baseUrl}</span><span class="hljs-subst">\${path}</span>\`</span>, {

method,

<span class="hljs-attr">headers</span>: <span class="hljs-title function_">headers</span>(),

<span class="hljs-attr">body</span>: body &amp;&amp; <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(body),

});

<span class="hljs-keyword">if</span> (!res.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`<span class="hljs-subst">\${res.status}</span> <span class="hljs-subst">\${res.statusText}</span>\`</span>);

<span class="hljs-keyword">return</span> res.<span class="hljs-property">status</span> === <span class="hljs-number">204</span> ? <span class="hljs-literal">null</span> : res.<span class="hljs-title function_">json</span>();

};

<span class="hljs-keyword">return</span> {

<span class="hljs-attr">get</span>:  <span class="hljs-function">(<span class="hljs-params">p</span>)     =&gt;</span> <span class="hljs-title function_">request</span>(<span class="hljs-string">&quot;GET&quot;</span>, p),

<span class="hljs-attr">post</span>: <span class="hljs-function">(<span class="hljs-params">p, b</span>)  =&gt;</span> <span class="hljs-title function_">request</span>(<span class="hljs-string">&quot;POST&quot;</span>, p, b),

<span class="hljs-attr">put</span>:  <span class="hljs-function">(<span class="hljs-params">p, b</span>)  =&gt;</span> <span class="hljs-title function_">request</span>(<span class="hljs-string">&quot;PUT&quot;</span>, p, b),

<span class="hljs-attr">del</span>:  <span class="hljs-function">(<span class="hljs-params">p</span>)     =&gt;</span> <span class="hljs-title function_">request</span>(<span class="hljs-string">&quot;DELETE&quot;</span>, p),

};

};

<span class="hljs-keyword">const</span> api = <span class="hljs-title function_">createApiClient</span>({

<span class="hljs-attr">baseUrl</span>: <span class="hljs-string">&quot;https://api.example.com&quot;</span>,

<span class="hljs-attr">auth</span>: { <span class="hljs-attr">token</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">API_TOKEN</span> },

});
</code></pre>
<p>لاحظ ما <em>غير</em> موجود هنا: لا <code>this</code> ولا <code>new</code> ولا وراثة ولا استدعاءات <code>bind</code>. والمُعامل <code>fetch</code> مقصود؛ فتمريره يجعل اختبار المصنع سهلًا إلى حد بعيد عبر تمرير نسخة وهمية.</p>
<h2 id="مصانع-جداول-البحث-مشكلة-المركبة-بالطريقة-الصحيحة">مصانع جداول البحث: مشكلة المركبة، بالطريقة الصحيحة</h2>
<p>إذا كانت مهمة المصنع هي «اختيار التنفيذ المناسب بناءً على وسم نصي»، فلا تستسلم لرغبة كتابة <code>switch</code>. فجدول البحث أقصر وأسهل في التوسعة، وأصعب في نسيان تحديثه:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> fieldFactories = {

<span class="hljs-attr">text</span>:     <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span>,     ...props, <span class="hljs-attr">validate</span>: nonEmpty }),

<span class="hljs-attr">email</span>:    <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;email&quot;</span>,    ...props, <span class="hljs-attr">validate</span>: isEmail }),

<span class="hljs-attr">number</span>:   <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;number&quot;</span>,   ...props, <span class="hljs-attr">validate</span>: <span class="hljs-built_in">isFinite</span> }),

<span class="hljs-attr">checkbox</span>: <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;checkbox&quot;</span>, ...props, <span class="hljs-attr">validate</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-literal">true</span> }),

};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">createField</span> = (<span class="hljs-params">{ type, ...rest }</span>) =&gt; {

<span class="hljs-keyword">const</span> make = fieldFactories[type];

<span class="hljs-keyword">if</span> (!make) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unknown field type: <span class="hljs-subst">\${type}</span>\`</span>);

<span class="hljs-keyword">return</span> <span class="hljs-title function_">make</span>(rest);

};
</code></pre>
<p>إضافة نوع حقل جديد تعني إضافة مفتاح إلى <code>fieldFactories</code> — بلا تحرير منطق التوزيع، وبلا تعارضات دمج في كتلة <code>switch</code> طويلة، ويمكنك فحص السجل (<code>Object.keys(fieldFactories)</code>) إذا احتجت إلى عرض واجهة «أنواع الحقول المدعومة».</p>
<p>الشكل نفسه — <code>componentMap[type]</code> — يقود معظم عارضات النماذج الديناميكية في React وVue، ومعظم أنظمة الإضافات التي تصدر في مكتبات JavaScript.</p>
<h2 id="المصنع-مقابل-الصنف-مقابل-حاوية-حقن-التبعيات">المصنع مقابل الصنف مقابل حاوية حقن التبعيات</h2>
<p>كثيرًا ما يختلط هذه الأنماط الثلاثة. فهي تحل مشكلات متداخلة، لكن تكلفتها مختلفة:</p>
<table>
<thead>
<tr>
<th>الأسلوب</th>
<th>الأفضل لـ</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>صنف مع <code>new</code></strong></td>
<td>كائنات طويلة العمر ذات هوية، وتعدد أشكال عبر <code>instanceof</code>، وطرق في المسار الساخن تستفيد من نموذج أولي مشترك</td>
<td>دلالات <code>this</code> وربطها، وصعوبة أكبر في التركيب والمحاكاة</td>
</tr>
<tr>
<td><strong>دالة مصنع</strong></td>
<td>التقاط الإعدادات، وتبديل البيئة، وإعادة أشكال مختلفة، وسهولة المحاكاة</td>
<td>إغلاق واحد لكل نسخة (الطرق لا تكون مشتركة)</td>
</tr>
<tr>
<td><strong>حاوية حقن تبعيات</strong> (<code>tsyringe</code>، <code>InversifyJS</code>، مزودو NestJS)</td>
<td>توصيل رسوم الخدمات حيث تهم الملكية ودورة الحياة</td>
<td>بنية المزخرفات والبيانات الوصفية، ومفاجآت وقت التشغيل، وإفراط في التعقيد خارج التطبيقات الكبيرة</td>
</tr>
</tbody>
</table>
<p>قاعدة عملية مفيدة: إذا كنت ستستدعي <code>new SomeClass()</code> من أكثر من موضعين، فعادةً ما كنت تريد مصنعًا. وإذا كنت ستستدعي مصنعًا عبر حدود الوحدات مع مخاوف دورة حياة شاملة (نطاق الطلب، مفرد، عابر)، فقد تريد حاوية.</p>
<h2 id="مصانع-آمنة-النوع-في-typescript">مصانع آمنة النوع في TypeScript</h2>
<p>أكبر مكسب للمصنع في TypeScript هو <strong>الاتحاد المميز (discriminated union)</strong> مع <strong>أنواع إرجاع شرطية</strong>. يحصل المستدعي على نوع دقيق وفق الوسم الذي مرره:</p>
<pre><code class="language-javascript">type <span class="hljs-title class_">FieldSpec</span> =

| { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span>; placeholder?: string }

| { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;number&quot;</span>; min?: number; max?: number }

| { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;checkbox&quot;</span>; defaultChecked?: boolean };

type <span class="hljs-title class_">Field</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">FieldSpec</span>[<span class="hljs-string">&quot;type&quot;</span>]&gt; = <span class="hljs-title class_">Extract</span>&lt;<span class="hljs-title class_">FieldSpec</span>, { <span class="hljs-attr">type</span>: T }&gt; &amp; {

<span class="hljs-attr">id</span>: string;

<span class="hljs-title function_">validate</span>(<span class="hljs-attr">value</span>: unknown): boolean;

};

<span class="hljs-keyword">function</span> createField&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">FieldSpec</span>[<span class="hljs-string">&quot;type&quot;</span>]&gt;(

<span class="hljs-attr">spec</span>: <span class="hljs-title class_">Extract</span>&lt;<span class="hljs-title class_">FieldSpec</span>, { <span class="hljs-attr">type</span>: T }&gt;

): <span class="hljs-title class_">Field</span>&lt;T&gt; {

<span class="hljs-comment">// implementation</span>

<span class="hljs-keyword">return</span> { <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(), <span class="hljs-attr">validate</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-literal">true</span>, ...spec } <span class="hljs-keyword">as</span> <span class="hljs-title class_">Field</span>&lt;T&gt;;

}

<span class="hljs-keyword">const</span> a = <span class="hljs-title function_">createField</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;number&quot;</span>, <span class="hljs-attr">min</span>: <span class="hljs-number">0</span> }); <span class="hljs-comment">// typed with \`min\`/\`max\`</span>

<span class="hljs-keyword">const</span> b = <span class="hljs-title function_">createField</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;text&quot;</span> });           <span class="hljs-comment">// typed with \`placeholder\`</span>
</code></pre>
<p>يضيّق المصرف شكل الإرجاع بناءً على مُميّز الإدخال. وهذا هو الجزء من النمط الذي لا تستطيع الأصناف نسخه بأمان حتى الآن من دون فوضى الأحمال الزائدة.</p>
<h2 id="التجفيف-كمصنع-خفيف">التجفيف كمصنع خفيف</h2>
<p>للكائنات ذات الدالة الواحدة، تكون الدالة المجففة <em>هي</em> المصنع:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">withRetries</span> = (<span class="hljs-params">n</span>) =&gt; <span class="hljs-title function_">async</span> (fn) =&gt; {

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {

<span class="hljs-keyword">try</span> { <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">fn</span>(); }

<span class="hljs-keyword">catch</span> (e) { <span class="hljs-keyword">if</span> (i === n - <span class="hljs-number">1</span>) <span class="hljs-keyword">throw</span> e; }

}

};

<span class="hljs-keyword">const</span> retry3 = <span class="hljs-title function_">withRetries</span>(<span class="hljs-number">3</span>);

<span class="hljs-keyword">await</span> <span class="hljs-title function_">retry3</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/flaky&quot;</span>));
</code></pre>
<p><code>withRetries(3)</code> استدعاء مصنع يعيد إغلاقًا مُعلمًا بالمُعامل <code>n</code>. وعندما يحتوي «الكائن» الذي ستعيده على طريقة واحدة بالضبط، فتجاوز الكائن الحرفي.</p>
<h2 id="متى-لا-تستخدم-مصنعا">متى لا تستخدم مصنعًا</h2>
<ul>
<li><strong>لا تبنيه إلا بطريقة واحدة أبدًا.</strong> المصنع الذي لا يمرر موقع الاستدعاء الوحيد نفسه إلا خيارات ثابتة ليس سوى دالة منشئة بخطوات إضافية. ضمّنه.</li>
<li><strong>تحتاج إلى فحوص <code>instanceof</code>.</strong> تعيد المصانع كائنات عادية؛ فلا يوجد صنف للتحقق منه. إذا كان المستدعون يتفرعون حسب النوع باستخدام <code>instanceof</code>، فأنت تريد صنفًا، أو حقل تمييز في الكائن المعاد.</li>
<li><strong>أنت مغري بإعادة مكون React أو Vue.</strong> مصانع المكونات التي تلتقط حالة وقت العرض تسوء عادةً مع الخطافات والتفاعلية. استخدم التركيب أو المكونات عالية الترتيب بدلًا من ذلك.</li>
<li><strong>«المصنع» ليس سوى <code>new X()</code> ملفوفًا.</strong> هذا ليس تجريدًا، بل ضجيج.</li>
</ul>
<h2 id="المقايضات">المقايضات</h2>
<table>
<thead>
<tr>
<th>الفائدة</th>
<th>التكلفة</th>
</tr>
</thead>
<tbody>
<tr>
<td>لا <code>new</code> ولا <code>this</code> ولا أخطاء ربط</td>
<td>لا نموذج أولي مشترك — تُعاد تخصيص الطرق لكل نسخة</td>
</tr>
<tr>
<td>سهولة تبديل التنفيذ خلف واجهة مستقرة</td>
<td>لا <code>instanceof</code> لفحوص النوع في وقت التشغيل</td>
</tr>
<tr>
<td>سهولة المحاكاة (تمرير بدائل عبر الخيارات)</td>
<td>توزيع جدول البحث يفقد أدوات الوصول الساكن (البحث عن جميع مراجع طريقة صنف)</td>
</tr>
<tr>
<td>يتركب بسلاسة مع الإغلاقات والتطبيق الجزئي</td>
<td>قد يخفي تعقيدًا يكون تمثيله في صنف أكثر أمانةً</td>
</tr>
</tbody>
</table>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1">JavaScript Factory Functions with ES6+</a> - Eric Elliott</li>
<li><a href="https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions">الاتحادات المميزة في TypeScript</a> - دليل TypeScript</li>
<li><a href="https://github.com/microsoft/tsyringe">tsyringe</a> - حاوية خفيفة لحقن التبعيات في TypeScript</li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,t as slug,l as title};
