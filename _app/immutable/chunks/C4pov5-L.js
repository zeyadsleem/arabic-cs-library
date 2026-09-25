const t="patterns-dev",e="vanilla",n="أنماط JavaScript",o="factory-pattern",r="نمط المصنع (factory)",d=[{depth:2,id:"دالة-مصنع-بسيطة",text:"دالة مصنع بسيطة"},{depth:2,id:"مثال-أكثر-فائدة-مصنع-لعميل-client-http",text:"مثال أكثر فائدة: مصنع لعميل (client) HTTP"},{depth:2,id:"مصانع-جداول-البحث-مشكلة-المركبة-بالطريقة-الصحيحة",text:"مصانع جداول البحث: مشكلة المركبة، بالطريقة الصحيحة"},{depth:2,id:"المصنع-مقابل-الصنف-مقابل-حاوية-حقن-التبعيات",text:"المصنع مقابل الصنف مقابل حاوية حقن التبعيات"},{depth:2,id:"مصانع-آمنة-النوع-في-typescript",text:"مصانع آمنة النوع في TypeScript"},{depth:2,id:"التجفيف-كمصنع-خفيف",text:"التجفيف كمصنع خفيف"},{depth:2,id:"متى-لا-تستخدم-مصنعا",text:"متى لا تستخدم مصنعًا"},{depth:2,id:"المقايضات",text:"المقايضات"},{depth:2,id:"المراجع",text:"المراجع"}],i=`<p>المصنع (factory) دالة تتمثل مهمتها في <em>إعادة كائن</em> — ربما بأشكال كائن مختلفة وفق ما تمرره — من دون أن يضطر المستدع إلى التعامل مع <code>new</code> أو تسلسلات الأصناف أو معرفة النوع الملموس الذي يستلمه.</p>
<p>في JavaScript الحديثة، لا تحتاج تقريبًا إلى صنف لفعل ذلك. تكفي دالة تلتقط بعض الإعدادات وتعيد كائنًا حرفيًا. لم تعد الأسئلة المهمة «كيف أنفذ مصنعًا»، بل «متى يتفوق المصنع على صنف، ومتى يتفوق على اتحاد مميز أو حاوية حقن تبعيات؟»</p>
<h2 id="دالة-مصنع-بسيطة">دالة مصنع بسيطة</h2>
<pre><code>const createLogger = ({ level = &quot;info&quot;, prefix = &quot;&quot; } = {}) =&gt; {
  const ranks = { debug: 0, info: 1, warn: 2, error: 3 };
  const threshold = ranks[level];

  const log = (lvl, msg, ...rest) =&gt; {
    if (ranks[lvl] &lt; threshold) return;
    console[lvl](\`\${prefix}\${msg}\`, ...rest);
  };

  return {
    debug: (m, ...r) =&gt; log(&quot;debug&quot;, m, ...r),
    info:  (m, ...r) =&gt; log(&quot;info&quot;, m, ...r),
    warn:  (m, ...r) =&gt; log(&quot;warn&quot;, m, ...r),
    error: (m, ...r) =&gt; log(&quot;error&quot;, m, ...r),
  };
};

const log = createLogger({ level: &quot;warn&quot;, prefix: &quot;[api] &quot; });
log.info(&quot;ignored&quot;);          // silenced by threshold
log.warn(&quot;rate limit hit&quot;);   // [api] rate limit hit
</code></pre>
<p>هناك أمران يجعلان هذا يعمل بوصفه مصنعًا لا مجرد «دالة تعيد كائنًا»:</p>
<ul>
<li><strong>إنه يضم الإعداد.</strong> تحدث خريطة <code>ranks</code> والبحث عن <code>threshold</code> مرة واحدة بالضبط، عند إنشاء المسجل. وكل استدعاء لـ<code>log.warn</code> يعيد استخدام القيم المغلقة.</li>
<li><strong>إنه يعيد واجهة، لا نوعًا.</strong> يعتمد المستدعون على الشكل <code>{ debug, info, warn, error }</code>. سواء أتى ذلك من صنف أو كائن حرفي أو Proxy، فالأمر غير مرئي لهم — وهذا هو الفصل الذي سعى المصنع دائمًا إلى تمكينه.</li>
</ul>
<h2 id="مثال-أكثر-فائدة-مصنع-لعميل-client-http">مثال أكثر فائدة: مصنع لعميل (client) HTTP</h2>
<p>الإعدادات التي تختلف حسب البيئة أو المستأجر أو الخدمة هي الحالة النموذجية للمصنع:</p>
<pre><code>const createApiClient = ({ baseUrl, auth, fetch = globalThis.fetch }) =&gt; {
  const headers = () =&gt; ({
    &quot;Content-Type&quot;: &quot;application/json&quot;,
    ...(auth?.token &amp;&amp; { Authorization: \`Bearer \${auth.token}\` }),
  });

  const request = async (method, path, body) =&gt; {
    const res = await fetch(\`\${baseUrl}\${path}\`, {
      method,
      headers: headers(),
      body: body &amp;&amp; JSON.stringify(body),
    });
    if (!res.ok) throw new Error(\`\${res.status} \${res.statusText}\`);
    return res.status === 204 ? null : res.json();
  };

  return {
    get:  (p)     =&gt; request(&quot;GET&quot;, p),
    post: (p, b)  =&gt; request(&quot;POST&quot;, p, b),
    put:  (p, b)  =&gt; request(&quot;PUT&quot;, p, b),
    del:  (p)     =&gt; request(&quot;DELETE&quot;, p),
  };
};

const api = createApiClient({
  baseUrl: &quot;https://api.example.com&quot;,
  auth: { token: process.env.API_TOKEN },
});
</code></pre>
<p>لاحظ ما <em>غير</em> موجود هنا: لا <code>this</code> ولا <code>new</code> ولا وراثة ولا استدعاءات <code>bind</code>. والمُعامل <code>fetch</code> مقصود؛ فتمريره يجعل اختبار المصنع سهلًا إلى حد بعيد عبر تمرير نسخة وهمية.</p>
<h2 id="مصانع-جداول-البحث-مشكلة-المركبة-بالطريقة-الصحيحة">مصانع جداول البحث: مشكلة المركبة، بالطريقة الصحيحة</h2>
<p>إذا كانت مهمة المصنع هي «اختيار التنفيذ المناسب بناءً على وسم نصي»، فلا تستسلم لرغبة كتابة <code>switch</code>. فجدول البحث أقصر وأسهل في التوسعة، وأصعب في نسيان تحديثه:</p>
<pre><code>const fieldFactories = {
  text:     (props) =&gt; ({ type: &quot;text&quot;,     ...props, validate: nonEmpty }),
  email:    (props) =&gt; ({ type: &quot;email&quot;,    ...props, validate: isEmail }),
  number:   (props) =&gt; ({ type: &quot;number&quot;,   ...props, validate: isFinite }),
  checkbox: (props) =&gt; ({ type: &quot;checkbox&quot;, ...props, validate: () =&gt; true }),
};

const createField = ({ type, ...rest }) =&gt; {
  const make = fieldFactories[type];
  if (!make) throw new Error(\`Unknown field type: \${type}\`);
  return make(rest);
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
<pre><code>type FieldSpec =
  | { type: &quot;text&quot;; placeholder?: string }
  | { type: &quot;number&quot;; min?: number; max?: number }
  | { type: &quot;checkbox&quot;; defaultChecked?: boolean };

type Field&lt;T extends FieldSpec[&quot;type&quot;]&gt; = Extract&lt;FieldSpec, { type: T }&gt; &amp; {
  id: string;
  validate(value: unknown): boolean;
};

function createField&lt;T extends FieldSpec[&quot;type&quot;]&gt;(
  spec: Extract&lt;FieldSpec, { type: T }&gt;
): Field&lt;T&gt; {
  // implementation
  return { id: crypto.randomUUID(), validate: () =&gt; true, ...spec } as Field&lt;T&gt;;
}

const a = createField({ type: &quot;number&quot;, min: 0 }); // typed with \`min\`/\`max\`
const b = createField({ type: &quot;text&quot; });           // typed with \`placeholder\`
</code></pre>
<p>يضيّق المصرف شكل الإرجاع بناءً على مُميّز الإدخال. وهذا هو الجزء من النمط الذي لا تستطيع الأصناف نسخه بأمان حتى الآن من دون فوضى الأحمال الزائدة.</p>
<h2 id="التجفيف-كمصنع-خفيف">التجفيف كمصنع خفيف</h2>
<p>للكائنات ذات الدالة الواحدة، تكون الدالة المجففة <em>هي</em> المصنع:</p>
<pre><code>const withRetries = (n) =&gt; async (fn) =&gt; {
  for (let i = 0; i &lt; n; i++) {
    try { return await fn(); }
    catch (e) { if (i === n - 1) throw e; }
  }
};

const retry3 = withRetries(3);
await retry3(() =&gt; fetch(&quot;/flaky&quot;));
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
`,c={book:t,chapter:e,chapterTitle:n,slug:o,title:r,headings:d,html:i};export{t as book,e as chapter,n as chapterTitle,c as default,d as headings,i as html,o as slug,r as title};
