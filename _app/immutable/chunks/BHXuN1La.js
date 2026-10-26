const s="kinney",a="react-performance",n="أداء React",l="identity-stability-props",p="استقرار هوية الخصائص",t=[{depth:2,id:"متى-تهم-الهوية-فعلا",text:"متى تهمّ الهوية فعلًا"},{depth:3,id:"المكونات-المحفوظة-ذات-الخصائص-الكائنية",text:"المكوّنات المحفوظة ذات الخصائص الكائنية"},{depth:3,id:"اعتمادات-useeffect",text:"اعتمادات useEffect"},{depth:3,id:"قيم-السياق",text:"قيم السياق"},{depth:2,id:"تشريح-المراجع-غير-المستقرة",text:"تشريح المراجع غير المستقرة"},{depth:3,id:"كائنات-حرفية-مضمنة",text:"كائنات حرفية مضمّنة"},{depth:3,id:"توابع-المصفوفات-التي-تعيد-مصفوفات-جديدة",text:"توابع المصفوفات التي تعيد مصفوفات جديدة"},{depth:3,id:"تعريفات-الدوال",text:"تعريفات الدوال"},{depth:2,id:"استراتيجيات-للحصول-على-هوية-مستقرة",text:"استراتيجيات للحصول على هوية مستقرة"},{depth:3,id:"انقل-القيم-الثابتة-خارج-المكونات",text:"انقل القيم الثابتة خارج المكوّنات"},{depth:3,id:"usememo-للحسابات-المكلفة",text:"useMemo للحسابات المكلفة"},{depth:3,id:"usecallback-لاستقرار-الدوال",text:"useCallback لاستقرار الدوال"},{depth:3,id:"استخرج-المكونات-الأبناء",text:"استخرج المكوّنات الأبناء"},{depth:2,id:"أنماط-قيم-السياق",text:"أنماط قيم السياق"},{depth:3,id:"قسم-السياق-حسب-وتيرة-التحديث",text:"قسّم السياق حسب وتيرة التحديث"},{depth:3,id:"استخدم-المخفضات-للحالة-المعقدة",text:"استخدم المخفّضات للحالة المعقّدة"},{depth:2,id:"أنماط-مضادة-شائعة-يجب-تجنبها",text:"أنماط مضادة شائعة يجب تجنّبها"},{depth:3,id:"لا-تحفظ-كل-شيء",text:"لا تحفظ كل شيء"},{depth:3,id:"لا-تحفظ-خصائص-تمررها-فورا-إلى-الأسفل",text:"لا تحفظ خصائص تمرّرها فورًا إلى الأسفل"},{depth:3,id:"لا-تفرط-في-استخراج-الاعتمادات",text:"لا تفرط في استخراج الاعتمادات"},{depth:2,id:"تصحيح-مشكلات-الهوية",text:"تصحيح مشكلات الهوية"},{depth:3,id:"استخدم-react-devtools-profiler",text:"استخدم React DevTools Profiler"},{depth:3,id:"أضف-سجلات-تصحيح",text:"أضف سجلات تصحيح"},{depth:3,id:"استخدم-why-did-you-render",text:"استخدم why-did-you-render"},{depth:2,id:"مثال-واقعي-عربة-التسوق",text:"مثال واقعي: عربة التسوّق"}],e=`<p>يقوم نموذج أداء React على مقارنة القيم لتحديد متى تحتاج المكوّنات إلى إعادة التصيير. وعندما تمرّر كائنات أو مصفوفات أو دوال كخصائص، فإن <strong>هويتها</strong> — لا محتواها فقط — هي ما يحدّد ما إذا كان React يعتبرها «الشيء نفسه». فإن أخطأت في ذلك، أطلقت إعادات تصيير غير ضرورية قد تنتشر عبر شجرة مكوّناتك. وإن أحسنت، بقي تطبيقك سريع الاستجابة حتى مع نموّه.</p>
<p>والجزء الصعب ليس فهم المفهوم (تساوي المراجع مقابل التساوي العميق)، بل معرفة متى يهمّ فعلًا وكيف تصلحه دون إفراط في هندسة شيفرتك باستخدام <code>useMemo</code> و<code>useCallback</code> في كل مكان.</p>
<h2 id="متى-تهم-الهوية-فعلا">متى تهمّ الهوية فعلًا</h2>
<p>ليست كل مرجع غير مستقر يسبّب مشكلات أداء. فReact سريع جدًا في إعادة تصيير المكوّنات التي لم تتغيّر فعلًا. لكن استقرار الهوية يصبح حاسمًا في حالات محددة قليلة:</p>
<h3 id="المكونات-المحفوظة-ذات-الخصائص-الكائنية">المكوّنات المحفوظة ذات الخصائص الكائنية</h3>
<p>عندما تلفّ مكوّنًا بـ <code>React.memo()</code>، فإنه يجري مقارنة سطحية للخصائص. وإذا مرّرت مرجع كائن جديدًا في كل تصيير — حتى بمحتوى مطابق — يفشل الحفظ.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will re-render every time, despite React.memo</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveList</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ items, config }: { items: <span class="hljs-built_in">string</span>[]; config: { sortBy: <span class="hljs-built_in">string</span>; filterBy: <span class="hljs-built_in">string</span> } }</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Rendering expensive list...&#x27;</span>);
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {items.map((item) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item}</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
  },
);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> items = [<span class="hljs-string">&#x27;apple&#x27;</span>, <span class="hljs-string">&#x27;banana&#x27;</span>, <span class="hljs-string">&#x27;cherry&#x27;</span>];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount((c) =&gt; c + 1)}&gt;Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {/* New config object created every render! */}
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{items}</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">sortBy:</span> &#x27;<span class="hljs-attr">name</span>&#x27;, <span class="hljs-attr">filterBy:</span> &#x27;<span class="hljs-attr">all</span>&#x27; }} /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="اعتمادات-useeffect">اعتمادات <code>useEffect</code></h3>
<p>المراجع غير المستقرة في مصفوفات الاعتمادات تجعل التأثيرات تعمل في كل تصيير، حتى عندما لا تتغيّر البيانات الفعلية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Effect runs on every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchUserData</span>(userId, {
      <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-string">&#x27;avatar&#x27;</span>],
      <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
    }).<span class="hljs-title function_">then</span>(setUser);
  }, [userId, { <span class="hljs-attr">fields</span>: [<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-string">&#x27;avatar&#x27;</span>], <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span> }]);
  <span class="hljs-comment">//           ^^^^ New object every render!</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user?.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="قيم-السياق">قيم السياق</h3>
<p>ولعلّها أخطر حالة — فعندما تتغيّر هوية قيم السياق (context)، يُعاد تصيير كل مستهلك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ All consumers re-render when App re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [theme, setTheme] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;light&#x27;</span>);
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContext.Provider</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">theme</span>,
        <span class="hljs-attr">setTheme</span>,
        <span class="hljs-attr">user</span>,
        <span class="hljs-attr">updateUser:</span> (<span class="hljs-attr">data</span>) =&gt;</span> setUser((prev) =&gt; ({ ...prev, ...data })),
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">AppContext.Provider</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تشريح-المراجع-غير-المستقرة">تشريح المراجع غير المستقرة</h2>
<p>لنستعرض أكثر الطرق شيوعًا التي ينشئ بها المطوّرون مراجع جديدة عن غير قصد:</p>
<h3 id="كائنات-حرفية-مضمنة">كائنات حرفية مضمّنة</h3>
<p>في كل مرة تكتب <code>{}</code> في JSX، فأنت تنشئ كائنًا جديدًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ New object every render</span>
&lt;<span class="hljs-title class_">Component</span> config={{ <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span>, <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span> }} /&gt;;

<span class="hljs-comment">// ✅ Stable reference</span>
<span class="hljs-keyword">const</span> config = { <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span>, <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span> };
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{config}</span> /&gt;</span></span>;

<span class="hljs-comment">// ✅ Or memoize if it depends on props/state</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-title function_">useMemo</span>(
  <span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">theme</span>: currentTheme,
    <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span>,
  }),
  [currentTheme],
);
</code></pre>
<h3 id="توابع-المصفوفات-التي-تعيد-مصفوفات-جديدة">توابع المصفوفات التي تعيد مصفوفات جديدة</h3>
<p>عمليات مثل <code>.filter()</code> و<code>.map()</code> و<code>.slice()</code> تعيد دائمًا مصفوفات جديدة، حتى لو كان المحتوى مطابقًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-comment">// ❌ Creates new array every render, even if no todos are completed</span>
  <span class="hljs-keyword">const</span> completedTodos = todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">completed</span>);

  <span class="hljs-comment">// ✅ Memoize when the operation might be expensive or affects children</span>
  <span class="hljs-keyword">const</span> completedTodos = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">completed</span>), [todos]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveCompletedList</span> <span class="hljs-attr">todos</span>=<span class="hljs-string">{completedTodos}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="تعريفات-الدوال">تعريفات الدوال</h3>
<p>الدوال المعرّفة داخل المكوّنات يُعاد إنشاؤها في كل تصيير:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ New function every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSort</span> = (<span class="hljs-params"><span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// sorting logic</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SortableTable</span> <span class="hljs-attr">onSort</span>=<span class="hljs-string">{handleSort}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Stable callback</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> handleSort = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-comment">// sorting logic</span>
  }, []); <span class="hljs-comment">// No dependencies = same function every time</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SortableTable</span> <span class="hljs-attr">onSort</span>=<span class="hljs-string">{handleSort}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="استراتيجيات-للحصول-على-هوية-مستقرة">استراتيجيات للحصول على هوية مستقرة</h2>
<p>المفتاح هو تطبيق التقنية المناسبة في الوقت المناسب. وهذه هي أدواتك:</p>
<h3 id="انقل-القيم-الثابتة-خارج-المكونات">انقل القيم الثابتة خارج المكوّنات</h3>
<p>إذا كانت القيمة لا تتغيّر أبدًا، فعرّفها خارج المكوّن:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Defined once, never recreated</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">DEFAULT_FILTERS</span> = {
  <span class="hljs-attr">category</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
  <span class="hljs-attr">sortBy</span>: <span class="hljs-string">&#x27;date&#x27;</span>,
  <span class="hljs-attr">ascending</span>: <span class="hljs-literal">true</span>,
};

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CHART_OPTIONS</span> = {
  <span class="hljs-attr">responsive</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">maintainAspectRatio</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">plugins</span>: {
    <span class="hljs-attr">legend</span>: { <span class="hljs-attr">position</span>: <span class="hljs-string">&#x27;top&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span> },
  },
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">FilterPanel</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{DEFAULT_FILTERS}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">options</span>=<span class="hljs-string">{CHART_OPTIONS}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="usememo-للحسابات-المكلفة"><code>useMemo</code> للحسابات المكلفة</h3>
<p>استخدم <code>useMemo</code> عندما تقوم بعمل لا تريد تكراره فعلًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductGrid</span>(<span class="hljs-params">{ products, filters, sortBy }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// ✅ Only recompute when inputs change</span>
  <span class="hljs-keyword">const</span> filteredAndSorted = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> products
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">product</span>) =&gt;</span> <span class="hljs-title function_">matchesFilters</span>(product, filters))
      .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-title function_">compareBy</span>(a, b, sortBy));
  }, [products, filters, sortBy]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Grid</span>&gt;</span>
      {filteredAndSorted.map((product) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Grid</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="usecallback-لاستقرار-الدوال"><code>useCallback</code> لاستقرار الدوال</h3>
<p>استخدم <code>useCallback</code> عندما تؤثّر هوية الدالة في تصيير المكوّنات الأبناء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">DataTable</span>(<span class="hljs-params">{ data }: { data: TableRow[] }</span>) {
  <span class="hljs-keyword">const</span> [selectedRows, setSelectedRows] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-comment">// ✅ Function identity stable unless data changes</span>
  <span class="hljs-keyword">const</span> handleRowToggle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">rowId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setSelectedRows</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
      <span class="hljs-keyword">if</span> (next.<span class="hljs-title function_">has</span>(rowId)) {
        next.<span class="hljs-title function_">delete</span>(rowId);
      } <span class="hljs-keyword">else</span> {
        next.<span class="hljs-title function_">add</span>(rowId);
      }
      <span class="hljs-keyword">return</span> next;
    });
  }, []); <span class="hljs-comment">// No dependencies - function never changes</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
      {data.map((row) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">MemoizedRow</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{row.id}</span>
          <span class="hljs-attr">row</span>=<span class="hljs-string">{row}</span>
          <span class="hljs-attr">isSelected</span>=<span class="hljs-string">{selectedRows.has(row.id)}</span>
          <span class="hljs-attr">onToggle</span>=<span class="hljs-string">{handleRowToggle}</span>
        /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="استخرج-المكونات-الأبناء">استخرج المكوّنات الأبناء</h3>
<p>أحيانًا يكون الحل الأنظف هو نقل JSX المعقّد إلى مكوّنات منفصلة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Recreates complex config object every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserChart</span>
      <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span>
      <span class="hljs-attr">config</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">showTooltips:</span> <span class="hljs-attr">true</span>,
        <span class="hljs-attr">animationDuration:</span> <span class="hljs-attr">300</span>,
        <span class="hljs-attr">colors:</span> [&#x27;#<span class="hljs-attr">ff6b6b</span>&#x27;, &#x27;#<span class="hljs-attr">4ecdc4</span>&#x27;, &#x27;#<span class="hljs-attr">45b7d1</span>&#x27;],
        <span class="hljs-attr">legend:</span> { <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">bottom</span>&#x27;, <span class="hljs-attr">fontSize:</span> <span class="hljs-attr">12</span> },
      }}
    /&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Stable component with stable config</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CHART_CONFIG</span> = {
  <span class="hljs-attr">showTooltips</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">animationDuration</span>: <span class="hljs-number">300</span>,
  <span class="hljs-attr">colors</span>: [<span class="hljs-string">&#x27;#ff6b6b&#x27;</span>, <span class="hljs-string">&#x27;#4ecdc4&#x27;</span>, <span class="hljs-string">&#x27;#45b7d1&#x27;</span>],
  <span class="hljs-attr">legend</span>: { <span class="hljs-attr">position</span>: <span class="hljs-string">&#x27;bottom&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>, <span class="hljs-attr">fontSize</span>: <span class="hljs-number">12</span> },
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserChartSection</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserChart</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{CHART_CONFIG}</span> /&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserChartSection</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-قيم-السياق">أنماط قيم السياق</h2>
<p>السياق هو المجال الذي يهمّ فيه استقرار الهوية أكثر من أي مكان آخر، لأن القيم غير المستقرة تجعل كل مستهلك يعيد التصيير. وهذه أنماط فعّالة:</p>
<h3 id="قسم-السياق-حسب-وتيرة-التحديث">قسّم السياق حسب وتيرة التحديث</h3>
<p>بدلًا من سياق واحد كبير، قسّم القيم التي تتغيّر بمعدّلات مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Theme rarely changes - separate context</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = createContext&lt;{
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}&gt;(<span class="hljs-literal">null</span>!);

<span class="hljs-comment">// ✅ User data changes more frequently - separate context</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserContext</span> = createContext&lt;{
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">updateUser</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}&gt;(<span class="hljs-literal">null</span>!);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [theme, setTheme] = useState&lt;<span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Stable theme context value</span>
  <span class="hljs-keyword">const</span> themeValue = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      theme,
      <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setTheme</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> (t === <span class="hljs-string">&#x27;light&#x27;</span> ? <span class="hljs-string">&#x27;dark&#x27;</span> : <span class="hljs-string">&#x27;light&#x27;</span>)),
    }),
    [theme],
  );

  <span class="hljs-comment">// ✅ Stable user context value</span>
  <span class="hljs-keyword">const</span> userValue = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      user,
      <span class="hljs-attr">updateUser</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) =&gt;</span> <span class="hljs-title function_">setUser</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> (prev ? { ...prev, ...data } : <span class="hljs-literal">null</span>)),
    }),
    [user],
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{themeValue}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{userValue}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Provider</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="استخدم-المخفضات-للحالة-المعقدة">استخدم المخفّضات للحالة المعقّدة</h3>
<p>عندما يدير السياق حالة معقّدة بأنماط تحديث متعددة، توفّر المخفّضات (reducers) دوال إرسال (dispatch) مستقرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">AppState</span> = {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">settings</span>: <span class="hljs-title class_">Settings</span>;
  <span class="hljs-attr">notifications</span>: <span class="hljs-title class_">Notification</span>[];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AppAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_USER&#x27;</span>; <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_SETTINGS&#x27;</span>; <span class="hljs-attr">settings</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Settings</span>&gt; }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_NOTIFICATION&#x27;</span>; <span class="hljs-attr">notification</span>: <span class="hljs-title class_">Notification</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">appReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">AppState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">AppAction</span></span>): <span class="hljs-title class_">AppState</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_USER&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">user</span>: action.<span class="hljs-property">user</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;UPDATE_SETTINGS&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">settings</span>: { ...state.<span class="hljs-property">settings</span>, ...action.<span class="hljs-property">settings</span> } };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_NOTIFICATION&#x27;</span>:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">notifications</span>: [...state.<span class="hljs-property">notifications</span>, action.<span class="hljs-property">notification</span>],
      };
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(appReducer, {
    <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">settings</span>: {},
    <span class="hljs-attr">notifications</span>: [],
  });

  <span class="hljs-comment">// ✅ dispatch is always stable - no useMemo needed!</span>
  <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      ...state,
      dispatch,
    }),
    [state],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">AppContext.Provider</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-مضادة-شائعة-يجب-تجنبها">أنماط مضادة شائعة يجب تجنّبها</h2>
<h3 id="لا-تحفظ-كل-شيء">لا تحفظ كل شيء</h3>
<p>قد يكون العلاج أسوأ من الداء. لا تحفظ النتائج إلا عندما توجد فائدة أداء حقيقية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary memoization for simple values</span>
<span class="hljs-keyword">const</span> userName = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> user?.<span class="hljs-property">name</span> ?? <span class="hljs-string">&#x27;Guest&#x27;</span>, [user]);
<span class="hljs-keyword">const</span> isLoggedIn = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> !!user, [user]);

<span class="hljs-comment">// ✅ Simple derivations don&#x27;t need memoization</span>
<span class="hljs-keyword">const</span> userName = user?.<span class="hljs-property">name</span> ?? <span class="hljs-string">&#x27;Guest&#x27;</span>;
<span class="hljs-keyword">const</span> isLoggedIn = !!user;
</code></pre>
<h3 id="لا-تحفظ-خصائص-تمررها-فورا-إلى-الأسفل">لا تحفظ خصائص تمرّرها فورًا إلى الأسفل</h3>
<p>إذا كنت تمرّر قيمًا محفوظة كخصائص فقط، فقد لا تحتاج إلى الحفظ:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Memoizing just to pass down immediately</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Parent</span>(<span class="hljs-params">{ data }: { data: Item[] }</span>) {
  <span class="hljs-keyword">const</span> sortedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> data.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>)), [data]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{sortedData}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Let the child decide if it needs memoization</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Parent</span>(<span class="hljs-params">{ data }: { data: Item[] }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Child</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ data }: { data: Item[] }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> sortedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> data.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>)), [data]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* render sorted data */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
});
</code></pre>
<h3 id="لا-تفرط-في-استخراج-الاعتمادات">لا تفرط في استخراج الاعتمادات</h3>
<p>إدراج اعتمادات أكثر من اللازم يُبطل الغرض:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Too many dependencies</span>
<span class="hljs-keyword">const</span> expensiveValue = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">category</span> === selectedCategory);
}, [data, selectedCategory, user, theme, router]);
<span class="hljs-comment">//     ^^^ user, theme, router don&#x27;t affect the computation!</span>

<span class="hljs-comment">// ✅ Only include what actually matters</span>
<span class="hljs-keyword">const</span> expensiveValue = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">category</span> === selectedCategory);
}, [data, selectedCategory]);
</code></pre>
<h2 id="تصحيح-مشكلات-الهوية">تصحيح مشكلات الهوية</h2>
<p>عندما تشتبه في أن عدم استقرار الهوية يسبّب مشكلات أداء، إليك كيفية تتبّعه:</p>
<h3 id="استخدم-react-devtools-profiler">استخدم React DevTools Profiler</h3>
<p>يُظهر لك Profiler أي المكوّنات يُعاد تصييرها ولماذا:</p>
<ol>
<li>ثبّت إضافة React DevTools في المتصفح</li>
<li>افتح تبويب Profiler</li>
<li>انقر على «Start profiling»</li>
<li>تفاعل مع تطبيقك</li>
<li>ابحث عن المكوّنات التي تُصيَّر أكثر من المتوقع</li>
</ol>
<h3 id="أضف-سجلات-تصحيح">أضف سجلات تصحيح</h3>
<p>سجّل مؤقتًا وقت تشغيل العمليات المكلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> expensiveComputation = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;🔄 Recomputing expensive value&#x27;</span>);
  <span class="hljs-keyword">return</span> data.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, item</span>) =&gt;</span> {
    <span class="hljs-comment">// expensive work</span>
    <span class="hljs-keyword">return</span> acc + item.<span class="hljs-property">value</span>;
  }, <span class="hljs-number">0</span>);
}, [data]);
</code></pre>
<h3 id="استخدم-why-did-you-render">استخدم why-did-you-render</h3>
<p>تستطيع مكتبة <a href="https://github.com/welldone-software/why-did-you-render"><code>why-did-you-render</code></a> كشف إعادات التصيير غير الضرورية وتسجيلها تلقائيًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Install: npm install @welldone-software/why-did-you-render</span>

<span class="hljs-comment">// In development only:</span>
<span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
  <span class="hljs-keyword">const</span> whyDidYouRender = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@welldone-software/why-did-you-render&#x27;</span>);
  <span class="hljs-title function_">whyDidYouRender</span>(<span class="hljs-title class_">React</span>, {
    <span class="hljs-attr">trackAllPureComponents</span>: <span class="hljs-literal">true</span>,
  });
}

<span class="hljs-comment">// Then flag components you want to monitor:</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MyComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
<span class="hljs-title class_">MyComponent</span>.<span class="hljs-property">whyDidYouRender</span> = <span class="hljs-literal">true</span>;
</code></pre>
<h2 id="مثال-واقعي-عربة-التسوق">مثال واقعي: عربة التسوّق</h2>
<p>لنجمع كل ذلك في مثال واقعي لعربة تسوّق يعرض المشكلات والحلول معًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problematic version with identity issues</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ShoppingApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [cartItems, setCartItems] = useState&lt;<span class="hljs-title class_">CartItem</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [discounts, setDiscounts] = useState&lt;<span class="hljs-title class_">Discount</span>[]&gt;([]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">CartContext.Provider</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">items:</span> <span class="hljs-attr">cartItems</span>,
        <span class="hljs-attr">addItem:</span> (<span class="hljs-attr">item</span>) =&gt;</span> setCartItems((prev) =&gt; [...prev, item]),
        removeItem: (id) =&gt; setCartItems((prev) =&gt; prev.filter((i) =&gt; i.id !== id)),
        total: cartItems.reduce((sum, item) =&gt; sum + item.price * item.quantity, 0),
        user,
        discounts: discounts.filter((d) =&gt; d.isActive), // New array every render!
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">ShoppingCart</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">CartContext.Provider</span>&gt;</span></span>
  );
}
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Optimized version with stable identities</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CartState</span> = {
  <span class="hljs-attr">items</span>: <span class="hljs-title class_">CartItem</span>[];
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">discounts</span>: <span class="hljs-title class_">Discount</span>[];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CartAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>; <span class="hljs-attr">item</span>: <span class="hljs-title class_">CartItem</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REMOVE_ITEM&#x27;</span>; <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_USER&#x27;</span>; <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_DISCOUNTS&#x27;</span>; <span class="hljs-attr">discounts</span>: <span class="hljs-title class_">Discount</span>[] };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">cartReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">CartState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">CartAction</span></span>): <span class="hljs-title class_">CartState</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">items</span>: [...state.<span class="hljs-property">items</span>, action.<span class="hljs-property">item</span>] };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;REMOVE_ITEM&#x27;</span>:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">items</span>: state.<span class="hljs-property">items</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span> !== action.<span class="hljs-property">id</span>),
      };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_USER&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">user</span>: action.<span class="hljs-property">user</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_DISCOUNTS&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">discounts</span>: action.<span class="hljs-property">discounts</span> };
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ShoppingApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(cartReducer, {
    <span class="hljs-attr">items</span>: [],
    <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">discounts</span>: [],
  });

  <span class="hljs-comment">// ✅ Memoize expensive computations</span>
  <span class="hljs-keyword">const</span> total = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> state.<span class="hljs-property">items</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">price</span> * item.<span class="hljs-property">quantity</span>, <span class="hljs-number">0</span>),
    [state.<span class="hljs-property">items</span>],
  );

  <span class="hljs-keyword">const</span> activeDiscounts = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> state.<span class="hljs-property">discounts</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">discount</span>) =&gt;</span> discount.<span class="hljs-property">isActive</span>),
    [state.<span class="hljs-property">discounts</span>],
  );

  <span class="hljs-comment">// ✅ Stable context value</span>
  <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      ...state,
      total,
      activeDiscounts,
      dispatch,
    }),
    [state, total, activeDiscounts],
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">CartContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ShoppingCart</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">CartContext.Provider</span>&gt;</span></span>
  );
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
