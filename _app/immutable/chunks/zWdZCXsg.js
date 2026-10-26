const s="kinney",a="react-typescript",n="React مع TypeScript",l="react-state-management-with-typescript",t="إدارة حالة React مع TypeScript",p=[{depth:2,id:"usestate-الاستنتاج-والأنماط-والمزالق",text:"useState: الاستنتاج والأنماط والمزالق"},{depth:3,id:"كيف-يعمل-استنتاج-usestate",text:"كيف يعمل استنتاج useState"},{depth:3,id:"العمل-مع-الأنواع-الاتحادية",text:"العمل مع الأنواع الاتحادية"},{depth:3,id:"فخ-المصفوفة-الفارغة-والكائن",text:"فخّ المصفوفة الفارغة والكائن"},{depth:3,id:"نمط-الحالة-الابتدائية-nullundefined",text:"نمط الحالة الابتدائية null/undefined"},{depth:2,id:"usereducer-حالة-متقدمة-بأمان-في-الأنواع",text:"useReducer: حالة متقدّمة بأمان في الأنواع"},{depth:3,id:"التحديد-الأساسي-بأنواع-usereducer",text:"التحديد الأساسي بأنواع useReducer"},{depth:3,id:"الأنواع-الاتحادية-المميزة-للحالة-المعقدة",text:"الأنواع الاتحادية المُميَّزة للحالة المعقّدة"},{depth:2,id:"أنماط-متقدمة-في-تحديد-أنواع-الإجراءات",text:"أنماط متقدّمة في تحديد أنواع الإجراءات"},{depth:3,id:"الحل-القائم-على-النوع-الاتحادي",text:"الحل القائم على النوع الاتحادي"},{depth:3,id:"دوال-إنشاء-الإجراءات-بأنواع-آمنة",text:"دوال إنشاء الإجراءات بأنواع آمنة"},{depth:3,id:"إجراءات-عامة-للأنماط-الشائعة",text:"إجراءات عامة للأنماط الشائعة"},{depth:2,id:"مثال-واقعي-حالة-نموذج-معقدة",text:"مثال واقعي: حالة نموذج معقّدة"},{depth:2,id:"نموذج-مدفوع-بالمخفض-مع-أنواع-action-وdispatch-المشتقة",text:"نموذج مدفوع بالمخفّض مع أنواع Action وDispatch المشتقّة"},{depth:2,id:"التحديثات-الوظيفية-وأمان-الأنواع",text:"التحديثات الوظيفية وأمان الأنواع"},{depth:2,id:"خطافات-مخصصة-مع-إدارة-الحالة",text:"خُطّافات مخصّصة مع إدارة الحالة"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"الأخطاء-الشائعة-وأفضل-الممارسات",text:"الأخطاء الشائعة وأفضل الممارسات"},{depth:3,id:"تحديد-الأنواع-العامة-أكثر-من-اللازم",text:"تحديد الأنواع العامة أكثر من اللازم"},{depth:3,id:"عدم-استنفاد-الأنواع-الاتحادية-المميزة",text:"عدم استنفاد الأنواع الاتحادية المُميَّزة"},{depth:3,id:"النسيان-للإغلاقات-القديمة",text:"النسيان للإغلاقات القديمة"},{depth:2,id:"ملخص-أفضل-الممارسات",text:"ملخّص أفضل الممارسات"}],e=`<p>خُطّافات إدارة الحالة في React بسيطةً إلى حدّ الجمال في JavaScript، لكنّ TypeScript يحوّلها إلى أدواتٍ دقيقّة تلتقط الأخطاء قبل وقوعها. فبدلًا من أن تقطب أصابعك وتمنّي أن تعمل تحديثات حالتك كما ينبغي، يمكنك نمذجة حالتك بأنواع اتحادية مُميَّزة، واستخدام حرّاس أنواع (type guards) صحيحة، وبناء مخفّضات (reducers) تجعل الحالات المستحيلة مستحيلةَ التمثيل حرفيًا. فلنستكشف كيف تُوظّف هذه الخُطّافات بكامل قوّة نظام أنواع TypeScript.</p>
<h2 id="usestate-الاستنتاج-والأنماط-والمزالق"><code>useState</code>: الاستنتاج والأنماط والمزالق</h2>
<p>يتبع استنتاج TypeScript مع <code>useState</code> أنماطًا يمكن التنبّؤ بها، لكنّ هناك حالات حدّية قد تفاجئك. وفهم هذه الأنماط يساعدك على كتابة شيفرة إدارة حالة أكثر موثوقية وتجنّب المفاجآت وقت التشغيل.</p>
<h3 id="كيف-يعمل-استنتاج-usestate">كيف يعمل استنتاج <code>useState</code></h3>
<p>يستنتج TypeScript نوع الحالة من القيمة الابتدائية التي تمرّرها إلى <code>useState</code>. وهذا يعمل بإتقان في الحالات المباشرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// inferred as number</span>
<span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>); <span class="hljs-comment">// inferred as string</span>
<span class="hljs-keyword">const</span> [isVisible, setVisible] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// inferred as boolean</span>
</code></pre>
<p>كما أنّ دوال الضبط تأخذ أنواعها الصحيحة. فـ <code>setCount</code> يتوقّع <code>number</code> أو <code>(prev: number) =&gt; number</code>، وستصرخ TypeScript في وجهك إن حاولت تمرير نصّ.</p>
<p>لكنّ هنا يبدأ الجزء المثير: يستنتج TypeScript <em>النوع الحرفي</em> (literal type) من قيمتك الابتدائية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [status, setStatus] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;idle&#x27;</span>); <span class="hljs-comment">// inferred as string, not &#x27;idle&#x27;</span>
<span class="hljs-keyword">const</span> [theme, setTheme] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;light&#x27;</span>); <span class="hljs-comment">// inferred as string, not &#x27;light&#x27;</span>
</code></pre>
<p>هذا هو ما تريده عادةً، لكنّك أحيانًا تحتاج إلى دقّة أكبر.</p>
<h3 id="العمل-مع-الأنواع-الاتحادية">العمل مع الأنواع الاتحادية</h3>
<p>حين تريد تقييد الحالة بقيم معيّنة، عليك أن توجّه استنتاج TypeScript. وأشيع نهج هو التحديد الصريح للنوع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Explicit union type</span>
<span class="hljs-keyword">const</span> [status, setStatus] = useState&lt;<span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>&gt;(<span class="hljs-string">&#x27;idle&#x27;</span>);

<span class="hljs-comment">// ✅ Using const assertion for the initial value</span>
<span class="hljs-keyword">const</span> [theme, setTheme] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;light&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>);
<span class="hljs-comment">// Note: This only constrains the initial value, not subsequent updates</span>
</code></pre>
<p>يُفضَّل نهج التحديد الصريح عادةً لأنه يقيّد كلٌّ من القيمة الابتدائية وكل التحديثات اللاحقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [status, setStatus] = useState&lt;<span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span>&gt;(<span class="hljs-string">&#x27;idle&#x27;</span>);

<span class="hljs-comment">// ✅ This works</span>
<span class="hljs-title function_">setStatus</span>(<span class="hljs-string">&#x27;loading&#x27;</span>);

<span class="hljs-comment">// ❌ TypeScript error: Argument of type &#x27;&quot;pending&quot;&#x27; is not assignable</span>
<span class="hljs-title function_">setStatus</span>(<span class="hljs-string">&#x27;pending&#x27;</span>);
</code></pre>
<blockquote>
<p><strong>تلميح</strong></p>
<p>عند العمل مع الأنواع الاتحادية، عرّفها على حدة من أجل إعادة الاستخدام وتحسين رسائل الأخطاء.</p>
</blockquote>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">LoadingStatus</span> = <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;

<span class="hljs-keyword">const</span> [status, setStatus] = useState&lt;<span class="hljs-title class_">LoadingStatus</span>&gt;(<span class="hljs-string">&#x27;idle&#x27;</span>);
</code></pre>
<h3 id="فخ-المصفوفة-الفارغة-والكائن">فخّ المصفوفة الفارغة والكائن</h3>
<p>هنا يقع كثير من المطوّرين في الفخّ: تهيئة الحالة بمصفوفة أو كائن فارغ.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Inferred as never[] - you can&#x27;t add anything!</span>
<span class="hljs-keyword">const</span> [items, setItems] = <span class="hljs-title function_">useState</span>([]);

<span class="hljs-comment">// ❌ This will cause a TypeScript error</span>
<span class="hljs-title function_">setItems</span>([<span class="hljs-string">&#x27;first item&#x27;</span>]); <span class="hljs-comment">// Type &#x27;string&#x27; is not assignable to type &#x27;never&#x27;</span>
</code></pre>
<p>يستنتج TypeScript النوع <code>never[]</code> لأنّ المصفوفة الفارغة لا تقدّم أي تلميح عن الأنواع التي يجب أن تحتويها. عليك أن تكون صريحًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Explicit typing</span>
<span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);
<span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);

<span class="hljs-comment">// ✅ With interface for complex objects</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
</code></pre>
<p>المبدأ نفسه ينطبق على الكائنات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Inferred as {}, which is not very useful</span>
<span class="hljs-keyword">const</span> [filters, setFilters] = <span class="hljs-title function_">useState</span>({});

<span class="hljs-comment">// ✅ Be explicit about the shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FilterState</span> {
  <span class="hljs-attr">category</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">minPrice</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">maxPrice</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> [filters, setFilters] = useState&lt;<span class="hljs-title class_">FilterState</span>&gt;({
  <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
  <span class="hljs-attr">minPrice</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">maxPrice</span>: <span class="hljs-number">1000</span>,
});

<span class="hljs-comment">// ✅ Or use Partial if some properties are optional initially</span>
<span class="hljs-keyword">const</span> [filters, setFilters] = useState&lt;<span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">FilterState</span>&gt;&gt;({});
</code></pre>
<h3 id="نمط-الحالة-الابتدائية-nullundefined">نمط الحالة الابتدائية null/undefined</h3>
<p>سيناريو شائع آخر هو البدء بـ <code>null</code> أو <code>undefined</code> حين لا تكون البيانات قد حُمِّلت بعد:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Inferred as null - you can never update it!</span>
<span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// ✅ Explicit union with null</span>
<span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// ✅ Using undefined as the &quot;not loaded&quot; state</span>
<span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">ApiResponse</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);
</code></pre>
<p>هذا النمط شائع خصوصًا مع تحميل البيانات غير المتزامنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfile</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> [profile, setProfile] = useState&lt;<span class="hljs-title class_">UserProfile</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">loadProfile</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> userData = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUserProfile</span>();
    <span class="hljs-title function_">setProfile</span>(userData); <span class="hljs-comment">// ✅ TypeScript knows this should be UserProfile | null</span>
  }

  <span class="hljs-title function_">loadProfile</span>();
}, []);
</code></pre>
<h2 id="usereducer-حالة-متقدمة-بأمان-في-الأنواع"><code>useReducer</code>: حالة متقدّمة بأمان في الأنواع</h2>
<p>يتألّق <code>useReducer</code> حين يصبح منطق حالتك معقّدًا. ومع التحديد الصحيح للأنواع، تحصل على ضمانات وقت التصريف بشأن أفعالك وانتقالات حالتك.</p>
<h3 id="التحديد-الأساسي-بأنواع-usereducer">التحديد الأساسي بأنواع <code>useReducer</code></h3>
<p>أبسط حالة لـ <code>useReducer</code> مع TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CounterState</span> {
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">step</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Define all possible actions with discriminated union</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CounterAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;increment&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;decrement&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;set&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setStep&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;reset&#x27;</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">counterReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">CounterState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">CounterAction</span></span>): <span class="hljs-title class_">CounterState</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;increment&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> + state.<span class="hljs-property">step</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;decrement&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> - state.<span class="hljs-property">step</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;set&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: action.<span class="hljs-property">payload</span> }; <span class="hljs-comment">// TypeScript knows payload exists</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;setStep&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">step</span>: action.<span class="hljs-property">payload</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;reset&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">step</span>: <span class="hljs-number">1</span> };
    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// This ensures we handle all action types</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(counterReducer, { <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">step</span>: <span class="hljs-number">1</span> });

  <span class="hljs-comment">// TypeScript validates these action objects</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;increment&#x27;</span> });
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">setCount</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>) =&gt; <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;set&#x27;</span>, <span class="hljs-attr">payload</span>: value });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Count: {state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>+{state.step}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>النوع <code>never</code> في الحالة الافتراضية حيلةٌ أنيقة — إن أضفت نوع إجراء جديد ونسيتَ معالجته، لصاحبت TypeScript في وجهك.</p>
<h3 id="الأنواع-الاتحادية-المميزة-للحالة-المعقدة">الأنواع الاتحادية المُميَّزة للحالة المعقّدة</h3>
<p>بدلًا من نمذجة حالات التحميل بأعلام منطقية منفصلة (وهو ما قد يؤدي إلى تركيبات مستحيلة)، استخدم أنواعًا اتحادية مُميَّزة تجعل الحالات غير الصالحة غير قابلة للتمثيل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problematic approach - allows impossible states</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BadAsyncState</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
}
<span class="hljs-comment">// What if loading=true AND error=true? What if data exists but loading=true?</span>

<span class="hljs-comment">// ✅ Better approach - impossible states are impossible</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">function</span> useAsyncData&lt;T&gt;(<span class="hljs-attr">fetchFn</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">AsyncState</span>&lt;T&gt;&gt;({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchFn</span>();
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>,
      });
    }
  };

  <span class="hljs-keyword">return</span> { state, fetchData };
}
</code></pre>
<p>يفرض هذا النهج عليك معالجة كل حالة صراحةً ويمنع أخطاءً مثل إظهار مؤشّرات التحميل مع عرض رسائل الخطأ في الوقت نفسه.</p>
<h2 id="أنماط-متقدمة-في-تحديد-أنواع-الإجراءات">أنماط متقدّمة في تحديد أنواع الإجراءات</h2>
<p>عند بناء تطبيقات معقّدة، تصبح أنواع أفعالك حيويةً للصيانة. وهذه أنماط مجرَّبة في الميدان لتوسيع منطق مخفّض الحالة.</p>
<h3 id="الحل-القائم-على-النوع-الاتحادي">الحل القائم على النوع الاتحادي</h3>
<p>بدلًا من ثوابت نصّية، عرّف أفعالك كنوع اتحادي مُميَّز. هذا يمنحك أمانًا وقت التصريف لكلٍّ من دوال إنشاء الإجراءات ومنطق المخفّض:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Type-safe actions with discriminated union</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CounterAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;increment&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;decrement&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;set&#x27;</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;incrementBy&#x27;</span>; <span class="hljs-attr">amount</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">counterReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">CounterAction</span></span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;increment&#x27;</span>:
      <span class="hljs-keyword">return</span> state + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;decrement&#x27;</span>:
      <span class="hljs-keyword">return</span> state - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;set&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows \`value\` exists here</span>
      <span class="hljs-keyword">return</span> action.<span class="hljs-property">value</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;incrementBy&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows \`amount\` exists here</span>
      <span class="hljs-keyword">return</span> state + action.<span class="hljs-property">amount</span>;
    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// This ensures exhaustive handling</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">return</span> state;
  }
}
</code></pre>
<h3 id="دوال-إنشاء-الإجراءات-بأنواع-آمنة">دوال إنشاء الإجراءات بأنواع آمنة</h3>
<p>أنشئ دوال إنشاء إجراءات آمنةً من حيث الأنواع تمنع الأفعال المشوّهة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Action creators with proper typing</span>
<span class="hljs-keyword">const</span> counterActions = {
  <span class="hljs-attr">increment</span>: (): <span class="hljs-function"><span class="hljs-params">CounterAction</span> =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;increment&#x27;</span> }),
  <span class="hljs-attr">decrement</span>: (): <span class="hljs-function"><span class="hljs-params">CounterAction</span> =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;decrement&#x27;</span> }),
  <span class="hljs-attr">set</span>: (<span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>): <span class="hljs-function"><span class="hljs-params">CounterAction</span> =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;set&#x27;</span>, value }),
  <span class="hljs-attr">incrementBy</span>: (<span class="hljs-attr">amount</span>: <span class="hljs-built_in">number</span>): <span class="hljs-function"><span class="hljs-params">CounterAction</span> =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;incrementBy&#x27;</span>, amount }),
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// Usage in component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, dispatch] = <span class="hljs-title function_">useReducer</span>(counterReducer, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(counterActions.increment())}&gt;+1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(counterActions.incrementBy(5))}&gt;+5<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(counterActions.set(0))}&gt;Reset<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="إجراءات-عامة-للأنماط-الشائعة">إجراءات عامة للأنماط الشائعة</h3>
<p>للأفعال التي تتبع أنماطًا متشابهة، يمكنك إنشاء أنواع إجراءات عامة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic action patterns</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncAction</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>, <span class="hljs-title class_">TData</span> = <span class="hljs-literal">undefined</span>&gt; = <span class="hljs-title class_">TData</span> <span class="hljs-keyword">extends</span> <span class="hljs-literal">undefined</span>
  ? { <span class="hljs-attr">type</span>: <span class="hljs-string">\`<span class="hljs-subst">\${T}</span>_PENDING\`</span> } | { <span class="hljs-attr">type</span>: <span class="hljs-string">\`<span class="hljs-subst">\${T}</span>_FULFILLED\`</span> } | { <span class="hljs-attr">type</span>: <span class="hljs-string">\`<span class="hljs-subst">\${T}</span>_REJECTED\`</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> }
  : | { <span class="hljs-attr">type</span>: <span class="hljs-string">\`<span class="hljs-subst">\${T}</span>_PENDING\`</span> }
    | { <span class="hljs-attr">type</span>: <span class="hljs-string">\`<span class="hljs-subst">\${T}</span>_FULFILLED\`</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">TData</span> }
    | { <span class="hljs-attr">type</span>: <span class="hljs-string">\`<span class="hljs-subst">\${T}</span>_REJECTED\`</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// Usage for API calls</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserAction</span> = <span class="hljs-title class_">AsyncAction</span>&lt;<span class="hljs-string">&#x27;FETCH_USER&#x27;</span>, <span class="hljs-title class_">User</span>&gt; | <span class="hljs-title class_">AsyncAction</span>&lt;<span class="hljs-string">&#x27;DELETE_USER&#x27;</span>&gt;;

<span class="hljs-comment">// This generates:</span>
<span class="hljs-comment">// | { type: &#x27;FETCH_USER_PENDING&#x27; }</span>
<span class="hljs-comment">// | { type: &#x27;FETCH_USER_FULFILLED&#x27;; data: User }</span>
<span class="hljs-comment">// | { type: &#x27;FETCH_USER_REJECTED&#x27;; error: string }</span>
<span class="hljs-comment">// | { type: &#x27;DELETE_USER_PENDING&#x27; }</span>
<span class="hljs-comment">// | { type: &#x27;DELETE_USER_FULFILLED&#x27; }</span>
<span class="hljs-comment">// | { type: &#x27;DELETE_USER_REJECTED&#x27;; error: string }</span>
</code></pre>
<h2 id="مثال-واقعي-حالة-نموذج-معقدة">مثال واقعي: حالة نموذج معقّدة</h2>
<p>إليك مثالًا عمليًا يستعرض أنماط تحديد متقدّمة للأنواع في إدارة النماذج:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormState</span> {
  <span class="hljs-attr">fields</span>: {
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">confirmPassword</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof <span class="hljs-title class_">FormState</span>[<span class="hljs-string">&#x27;fields&#x27;</span>], <span class="hljs-built_in">string</span>&gt;&gt;;
  <span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">submitCount</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h2 id="نموذج-مدفوع-بالمخفض-مع-أنواع-action-وdispatch-المشتقة">نموذج مدفوع بالمخفّض مع أنواع Action وDispatch المشتقّة</h2>
<p>اشتقّ <code>Action</code> و<code>Dispatch</code> مباشرةً من دوال إنشاء الإجراءات حتى تبقى العناصر كلّها متزامنة، وتُثبت الشمول بالاستعانة بـ <code>never</code>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// 1) State</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoginState</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;submitting&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// 2) Action creators (as const for literal types)</span>
<span class="hljs-keyword">const</span> loginActions = {
  <span class="hljs-attr">updateEmail</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;updateEmail&#x27;</span>, value }) <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  <span class="hljs-attr">updatePassword</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;updatePassword&#x27;</span>, value }) <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  <span class="hljs-attr">submit</span>: <span class="hljs-function">() =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;submit&#x27;</span> }) <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  <span class="hljs-attr">success</span>: <span class="hljs-function">() =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;success&#x27;</span> }) <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  <span class="hljs-attr">failure</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> ({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;failure&#x27;</span>, message }) <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
};

<span class="hljs-comment">// 3) Derive Action and Dispatch from creators</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoginAction</span> = <span class="hljs-title class_">ReturnType</span>&lt;(<span class="hljs-keyword">typeof</span> loginActions)[keyof <span class="hljs-keyword">typeof</span> loginActions]&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoginDispatch</span> = <span class="hljs-title class_">React</span>.<span class="hljs-property">Dispatch</span>&lt;<span class="hljs-title class_">LoginAction</span>&gt;;

<span class="hljs-comment">// 4) Reducer with exhaustive check</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">loginReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">LoginState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">LoginAction</span></span>): <span class="hljs-title class_">LoginState</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;updateEmail&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">email</span>: action.<span class="hljs-property">value</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;updatePassword&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">password</span>: action.<span class="hljs-property">value</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;submit&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;submitting&#x27;</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">undefined</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;failure&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-attr">error</span>: action.<span class="hljs-property">message</span> };
    <span class="hljs-attr">default</span>: {
      <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">return</span> state;
    }
  }
}

<span class="hljs-comment">// 5) Hook that exposes typed dispatch</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useLoginForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(loginReducer, {
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span>,
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">onEmailChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt;
    <span class="hljs-title function_">dispatch</span>(loginActions.<span class="hljs-title function_">updateEmail</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>));
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">onPasswordChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt;
    <span class="hljs-title function_">dispatch</span>(loginActions.<span class="hljs-title function_">updatePassword</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>));

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">submit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">dispatch</span>(loginActions.<span class="hljs-title function_">submit</span>());
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">fakeLogin</span>(state.<span class="hljs-property">email</span>, state.<span class="hljs-property">password</span>);
      <span class="hljs-title function_">dispatch</span>(loginActions.<span class="hljs-title function_">success</span>());
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-title function_">dispatch</span>(loginActions.<span class="hljs-title function_">failure</span>(e <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? e.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>));
    }
  };

  <span class="hljs-keyword">return</span> { state, <span class="hljs-attr">dispatch</span>: dispatch <span class="hljs-keyword">as</span> <span class="hljs-title class_">LoginDispatch</span>, onEmailChange, onPasswordChange, submit };
}
</code></pre>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FormAction</span> =
| { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;updateField&#x27;</span>; <span class="hljs-attr">field</span>: keyof <span class="hljs-title class_">FormState</span>[<span class="hljs-string">&#x27;fields&#x27;</span>]; <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> }
| { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setError&#x27;</span>; <span class="hljs-attr">field</span>: keyof <span class="hljs-title class_">FormState</span>[<span class="hljs-string">&#x27;fields&#x27;</span>]; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> }
| { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;clearError&#x27;</span>; <span class="hljs-attr">field</span>: keyof <span class="hljs-title class_">FormState</span>[<span class="hljs-string">&#x27;fields&#x27;</span>] }
| { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setSubmitting&#x27;</span>; <span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span> }
| { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;submitAttempt&#x27;</span> }
| { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;reset&#x27;</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">formReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">FormState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">FormAction</span></span>): <span class="hljs-title class_">FormState</span> {
<span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
<span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;updateField&#x27;</span>:
<span class="hljs-keyword">return</span> {
...state,
<span class="hljs-attr">fields</span>: {
...state.<span class="hljs-property">fields</span>,
[action.<span class="hljs-property">field</span>]: action.<span class="hljs-property">value</span>,
},
<span class="hljs-comment">// Clear error when user starts typing</span>
<span class="hljs-attr">errors</span>: {
...state.<span class="hljs-property">errors</span>,
[action.<span class="hljs-property">field</span>]: <span class="hljs-literal">undefined</span>,
},
};
<span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;setError&#x27;</span>:
<span class="hljs-keyword">return</span> {
...state,
<span class="hljs-attr">errors</span>: {
...state.<span class="hljs-property">errors</span>,
[action.<span class="hljs-property">field</span>]: action.<span class="hljs-property">error</span>,
},
};
<span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;clearError&#x27;</span>:
<span class="hljs-keyword">return</span> {
...state,
<span class="hljs-attr">errors</span>: {
...state.<span class="hljs-property">errors</span>,
[action.<span class="hljs-property">field</span>]: <span class="hljs-literal">undefined</span>,
},
};
<span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;setSubmitting&#x27;</span>:
<span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">isSubmitting</span>: action.<span class="hljs-property">isSubmitting</span> };
<span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;submitAttempt&#x27;</span>:
<span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">submitCount</span>: state.<span class="hljs-property">submitCount</span> + <span class="hljs-number">1</span> };
<span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;reset&#x27;</span>:
<span class="hljs-keyword">return</span> {
<span class="hljs-attr">fields</span>: { <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&#x27;&#x27;</span> },
<span class="hljs-attr">errors</span>: {},
<span class="hljs-attr">isSubmitting</span>: <span class="hljs-literal">false</span>,
<span class="hljs-attr">submitCount</span>: <span class="hljs-number">0</span>,
};
<span class="hljs-attr">default</span>:
<span class="hljs-keyword">const</span> \\<span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = action;
<span class="hljs-keyword">return</span> state;
}
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useForm</span>(<span class="hljs-params"></span>) {
<span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(formReducer, {
<span class="hljs-attr">fields</span>: { <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&#x27;&#x27;</span> },
<span class="hljs-attr">errors</span>: {},
<span class="hljs-attr">isSubmitting</span>: <span class="hljs-literal">false</span>,
<span class="hljs-attr">submitCount</span>: <span class="hljs-number">0</span>,
});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">updateField</span> = (<span class="hljs-params"><span class="hljs-attr">field</span>: keyof <span class="hljs-title class_">FormState</span>[<span class="hljs-string">&#x27;fields&#x27;</span>], <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
<span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;updateField&#x27;</span>, field, value });
};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">validateAndSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
<span class="hljs-comment">// Validation logic here...</span>
<span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;submitAttempt&#x27;</span> });
<span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setSubmitting&#x27;</span>, <span class="hljs-attr">isSubmitting</span>: <span class="hljs-literal">true</span> });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Submit logic...</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Form submitted:&#x27;</span>, state.<span class="hljs-property">fields</span>);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setError&#x27;</span>, <span class="hljs-attr">field</span>: <span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Submission failed&#x27;</span> });
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setSubmitting&#x27;</span>, <span class="hljs-attr">isSubmitting</span>: <span class="hljs-literal">false</span> });
    }

};

<span class="hljs-keyword">return</span> { state, updateField, validateAndSubmit, dispatch };
}
</code></pre>
<h2 id="التحديثات-الوظيفية-وأمان-الأنواع">التحديثات الوظيفية وأمان الأنواع</h2>
<p>يتألّق استنتاج TypeScript مع التحديثات الوظيفية للحالة. فمعامل الاستدعاء يأخذ نوعه الصحيح تلقائيًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

<span class="hljs-comment">// ✅ TypeScript knows \`prev\` is string[]</span>
<span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, <span class="hljs-string">&#x27;new item&#x27;</span>]);

<span class="hljs-comment">// ✅ Works with complex objects too</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormState</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">errors</span>: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-keyword">const</span> [form, setForm] = useState&lt;<span class="hljs-title class_">FormState</span>&gt;({
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">errors</span>: [],
});

<span class="hljs-title function_">setForm</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
  ...prev,
  <span class="hljs-attr">errors</span>: [...prev.<span class="hljs-property">errors</span>, <span class="hljs-string">&#x27;Email is required&#x27;</span>], <span class="hljs-comment">// TypeScript validates everything</span>
}));
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>احذر أن تعدّل الحالة مباشرة، حتى مع التحديثات الوظيفية. أعِد دائمًا كائنًا أو مصفوفة جديدة.</p>
</blockquote>
<h2 id="خطافات-مخصصة-مع-إدارة-الحالة">خُطّافات مخصّصة مع إدارة الحالة</h2>
<p>الخُطّافات المخصّصة التي تستخدم <code>useState</code> في داخلها تستفيد من التحديد العام للأنواع لتصبح قابلة لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useLocalStorage&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">initialValue</span>: T) {
  <span class="hljs-keyword">const</span> [storedValue, setStoredValue] = useState&lt;T&gt;(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> item = <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">getItem</span>(key);
      <span class="hljs-keyword">return</span> item ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(item) : initialValue;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Error reading localStorage key &quot;<span class="hljs-subst">\${key}</span>&quot;:\`</span>, error);
      <span class="hljs-keyword">return</span> initialValue;
    }
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">setValue</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((val: T) =&gt; T)</span>) =&gt; {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> valueToStore = value <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Function</span> ? <span class="hljs-title function_">value</span>(storedValue) : value;
      <span class="hljs-title function_">setStoredValue</span>(valueToStore);
      <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">setItem</span>(key, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(valueToStore));
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Error setting localStorage key &quot;<span class="hljs-subst">\${key}</span>&quot;:\`</span>, error);
    }
  };

  <span class="hljs-keyword">return</span> [storedValue, setValue] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}

<span class="hljs-comment">// Usage with proper type inference</span>
<span class="hljs-keyword">const</span> [settings, setSettings] = <span class="hljs-title function_">useLocalStorage</span>(<span class="hljs-string">&#x27;userSettings&#x27;</span>, {
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  <span class="hljs-attr">notifications</span>: <span class="hljs-literal">true</span>,
});
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>لا يقتصر التحديد الصحيح للأنواع على منع الأخطاء — بل يمكنه أن يوجّه تحسينات الأداء أيضًا. فحين تنمذج حالتك بدقّة، تتمكّن من استخدام خُطّافات تحسين React بفاعلية أكبر:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">OptimizedState</span> {
  <span class="hljs-attr">expensiveData</span>: <span class="hljs-title class_">ComplexObject</span>[];
  <span class="hljs-attr">uiState</span>: {
    <span class="hljs-attr">selectedId</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">isModalOpen</span>: <span class="hljs-built_in">boolean</span>;
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useOptimizedState</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">OptimizedState</span>&gt;({
    <span class="hljs-attr">expensiveData</span>: [],
    <span class="hljs-attr">uiState</span>: { <span class="hljs-attr">selectedId</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">isModalOpen</span>: <span class="hljs-literal">false</span> },
  });

  <span class="hljs-comment">// Separate setters for different concerns</span>
  <span class="hljs-keyword">const</span> updateUiState = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">OptimizedState</span>[<span class="hljs-string">&#x27;uiState&#x27;</span>]&gt;</span>) =&gt;</span> {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      <span class="hljs-attr">uiState</span>: { ...prev.<span class="hljs-property">uiState</span>, ...updates },
    }));
  }, []);

  <span class="hljs-keyword">const</span> updateExpensiveData = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">ComplexObject</span>[]</span>) =&gt;</span> {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">expensiveData</span>: data }));
  }, []);

  <span class="hljs-keyword">return</span> { state, updateUiState, updateExpensiveData };
}
</code></pre>
<h2 id="الأخطاء-الشائعة-وأفضل-الممارسات">الأخطاء الشائعة وأفضل الممارسات</h2>
<h3 id="تحديد-الأنواع-العامة-أكثر-من-اللازم">تحديد الأنواع العامة أكثر من اللازم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary - TypeScript can infer this</span>
<span class="hljs-keyword">const</span> [name, setName] = useState&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;&#x27;</span>);

<span class="hljs-comment">// ✅ Let TypeScript infer simple types</span>
<span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

<span class="hljs-comment">// ✅ But be explicit when necessary</span>
<span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
</code></pre>
<h3 id="عدم-استنفاد-الأنواع-الاتحادية-المميزة">عدم استنفاد الأنواع الاتحادية المُميَّزة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span> | <span class="hljs-string">&#x27;idle&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleStatus</span>(<span class="hljs-params"><span class="hljs-attr">status</span>: <span class="hljs-title class_">Status</span></span>) {
  <span class="hljs-keyword">switch</span> (status) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Loading...&#x27;</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Success!&#x27;</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Error occurred&#x27;</span>;
    <span class="hljs-comment">// ❌ Missing &#x27;idle&#x27; case - but TypeScript won&#x27;t catch this without...</span>
  }

  <span class="hljs-comment">// ✅ Add this to catch missing cases</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = status;
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled status: <span class="hljs-subst">\${status}</span>\`</span>);
}
</code></pre>
<h3 id="النسيان-للإغلاقات-القديمة">النسيان للإغلاقات القديمة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Timer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// ❌ Use functional updates to avoid stale closures</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-number">1</span>); <span class="hljs-comment">// Always gets current value</span>
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(timer);
  }, []); <span class="hljs-comment">// Now the empty deps array is safe</span>
}
</code></pre>
<h2 id="ملخص-أفضل-الممارسات">ملخّص أفضل الممارسات</h2>
<ol>
<li><strong>دع الاستنتاج يعمل مع الأنواع الأولية</strong>: <code>useState(0)</code> و<code>useState('')</code> و<code>useState(false)</code></li>
<li><strong>كن صريحًا مع الأنواع الاتحادية</strong>: <code>useState&lt;Status&gt;('idle')</code></li>
<li><strong>حدّد أنواع الحاويات الفارغة دائمًا</strong>: <code>useState&lt;T[]&gt;([])</code> و<code>useState&lt;Partial&lt;T&gt;&gt;({})</code></li>
<li><strong>استخدم الأنواع الاتحادية المُميَّزة للحالة المعقّدة</strong>: تمنع تركيبات الحالات المستحيلة</li>
<li><strong>فضّل التحديثات الوظيفية</strong>: فهي أكثر أمانًا وتحصل على فحص أنواع أفضل</li>
<li><strong>عرّف الأنواع على حدة</strong>: اجعلها قابلة لإعادة الاستخدام وحسّن رسائل الأخطاء</li>
<li><strong>استخدم الفحص الشامل</strong>: أضف فحوصات <code>never</code> في مخفّضات الحالة</li>
</ol>
<p>بهذه الأنماط، ستكتب شيفرة إدارة حالة في React آمنةً من حيث الأنواع وقابلةً للصيانة في آنٍ واحد. والمفتاح أن تفكّر في شكل حالتك مسبقًا وأن تنمذجه وأنت تراعي نظام أنواع TypeScript.</p>
<p>وسيشكرك نفسك في المستقبل (وزملاؤك) على أمان الأنواع الإضافي حين لا يبلغ خللُ الحالة الصعب إلى بيئة الإنتاج.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
