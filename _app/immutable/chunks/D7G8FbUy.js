const s="kinney",a="react-performance",n="أداء React",l="avoiding-over-memoization",p="تجنّب الإفراط في حفظ النتائج",t=[{depth:2,id:"ضريبة-حفظ-النتائج",text:"ضريبة حفظ النتائج"},{depth:2,id:"متى-يفيد-حفظ-النتائج-فعلا",text:"متى يفيد حفظ النتائج فعلًا"},{depth:3,id:"الحسابات-المكلفة",text:"الحسابات المكلفة"},{depth:3,id:"منع-إعادة-تصيير-المكونات-الأبناء",text:"منع إعادة تصيير المكوّنات الأبناء"},{depth:3,id:"مراجع-مستقرة-لاعتمادات-التأثيرات",text:"مراجع مستقرة لاعتمادات التأثيرات"},{depth:2,id:"النموذج-الذهني-قس-الأداء-قبل-أن-تحسن",text:"النموذج الذهني: قِس الأداء قبل أن تحسّن"},{depth:2,id:"أنماط-الإفراط-الشائعة-في-حفظ-النتائج-التي-يجب-تجنبها",text:"أنماط الإفراط الشائعة في حفظ النتائج التي يجب تجنّبها"},{depth:3,id:"حفظ-القيم-الأولية-والحسابات-البسيطة",text:"حفظ القيم الأولية والحسابات البسيطة"},{depth:3,id:"حفظ-دوال-لا-تسبب-إعادة-تصيير",text:"حفظ دوال لا تسبّب إعادة تصيير"},{depth:3,id:"حفظ-كل-خاصية-على-حدة",text:"حفظ كل خاصية على حدة"},{depth:2,id:"استراتيجيات-ذكية-لحفظ-النتائج",text:"استراتيجيات ذكية لحفظ النتائج"},{depth:3,id:"الحفظ-الانتقائي",text:"الحفظ الانتقائي"},{depth:3,id:"احفظ-النتائج-في-المستوى-الصحيح",text:"احفظ النتائج في المستوى الصحيح"},{depth:2,id:"react-19-والتحسين-التلقائي",text:"React 19 والتحسين التلقائي"},{depth:2,id:"قياس-الأثر",text:"قياس الأثر"},{depth:2,id:"المنهج-العملي",text:"المنهج العملي"}],e=`<p>خُطّافات حفظ النتائج في React أدوات أداء قوية. لكنك، كما هو الحال مع أي أداة، قد تفرط في استخدامها تمامًا. فعندما تحفظ نتائج كل شيء «احتياطًا»، فقد تجعل تطبيقك أبطأ في الواقع. يركّز هذا الدليل على تحديد أنماط الإفراط في حفظ النتائج وتجنّبها.</p>
<p>للاطلاع على تفاصيل الواجهة البرمجية، راجع <a href="https://stevekinney.com/courses/react-performance/usememo-usecallback-in-react-19">useMemo وuseCallback في React 19</a>. وللاطلاع على حفظ نتائج المكوّنات، راجع <a href="https://stevekinney.com/courses/react-performance/react-memo-react-19-and-compiler-era">React.memo في React 19 وعصر المترجم</a>.</p>
<h2 id="ضريبة-حفظ-النتائج">ضريبة حفظ النتائج</h2>
<p>في كل مرة تستخدم فيها <code>useMemo</code> أو <code>useCallback</code>، فأنت تطلب من React أن:</p>
<ol>
<li><strong>يخزّن</strong> المدخلات والنتيجة السابقتين في الذاكرة</li>
<li><strong>يقارن</strong> المدخلات الحالية بالسابقة (باستخدام التساوي السطحي)</li>
<li><strong>يقرّر</strong> ما إذا كان سيعيد النتيجة المخزّنة مؤقتًا أم يحسب نتيجة جديدة</li>
</ol>
<p>هذا ليس مجانيًا. فأنت تقايض الذاكرة بوقت الحساب، وتضيف تكلفة مقارنة في كل تصيير. وأحيانًا تستحقّ هذه المقايضة العناء تمامًا — لكنك أحيانًا تدفع إيجارًا لذاكرة مؤقتة لم تكن بحاجة إليها أبدًا.</p>
<p>إليك مثالًا كلاسيكيًا على الإفراط في حفظ النتائج:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary memoization</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">const</span> displayName = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${user.firstName}</span> <span class="hljs-subst">\${user.lastName}</span>\`</span>;
  }, [user.<span class="hljs-property">firstName</span>, user.<span class="hljs-property">lastName</span>]);

  <span class="hljs-keyword">const</span> handleClick = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Profile clicked&#x27;</span>);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{displayName}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>ما الخطأ هنا؟ كلا الحفظين يكلّف أكثر مما يوفّر. فدمج النصوص سريع للغاية، ودالة <code>console.log</code> لا تعتمد على أي خصائص أو حالة. وتكلفة المقارنة تفوق أي فائدة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Just let it render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">const</span> displayName = <span class="hljs-string">\`<span class="hljs-subst">\${user.firstName}</span> <span class="hljs-subst">\${user.lastName}</span>\`</span>;

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Profile clicked&#x27;</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{displayName}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متى-يفيد-حفظ-النتائج-فعلا">متى يفيد حفظ النتائج فعلًا</h2>
<p>يتألّق حفظ النتائج عندما تكون لديك <strong>حسابات مكلفة</strong> أو عندما تحتاج إلى <strong>استقرار المراجع</strong> لمنع إعادات التصيير غير الضرورية في المكوّنات التابعة. وهذه هي الحالات التي يفيد فيها فعلًا:</p>
<h3 id="الحسابات-المكلفة">الحسابات المكلفة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good use of useMemo</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataAnalysis</span>(<span class="hljs-params">{ dataset }: { dataset: <span class="hljs-built_in">number</span>[] }</span>) {
  <span class="hljs-keyword">const</span> statistics = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This is computationally expensive</span>
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">mean</span>: dataset.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / dataset.<span class="hljs-property">length</span>,
      <span class="hljs-attr">median</span>: [...dataset].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b)[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(dataset.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>)],
      <span class="hljs-attr">standardDeviation</span>: <span class="hljs-title function_">calculateStdDev</span>(dataset), <span class="hljs-comment">// Complex calculation</span>
    };
  }, [dataset]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StatsDashboard</span> <span class="hljs-attr">stats</span>=<span class="hljs-string">{statistics}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="منع-إعادة-تصيير-المكونات-الأبناء">منع إعادة تصيير المكوّنات الأبناء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ memo prevents unnecessary re-renders</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveChild</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveChild</span>(<span class="hljs-params">{
  data,
  onUpdate,
}: {
  data: ComplexData;
  onUpdate: () =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-comment">// This component does heavy rendering work</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ComplexVisualization</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">onUpdate</span>=<span class="hljs-string">{onUpdate}</span> /&gt;</span></span>;
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Parent</span>(<span class="hljs-params">{ items, selectedId }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> selectedItem = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> items.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span> === selectedId),
    [items, selectedId],
  );

  <span class="hljs-keyword">const</span> handleUpdate = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Update logic here</span>
    },
    [<span class="hljs-comment">/* dependencies */</span>],
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* Other content that re-renders frequently */}
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveChild</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{selectedItem}</span> <span class="hljs-attr">onUpdate</span>=<span class="hljs-string">{handleUpdate}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="مراجع-مستقرة-لاعتمادات-التأثيرات">مراجع مستقرة لاعتمادات التأثيرات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Prevents infinite re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataFetcher</span>(<span class="hljs-params">{ userId, filters }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> requestConfig = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      userId,
      ...filters,
      <span class="hljs-attr">headers</span>: { <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">\`Bearer <span class="hljs-subst">\${token}</span>\`</span> },
    }),
    [userId, filters, token],
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchData</span>(requestConfig).<span class="hljs-title function_">then</span>(setData);
  }, [requestConfig]); <span class="hljs-comment">// Won&#x27;t cause infinite loop</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DataDisplay</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="النموذج-الذهني-قس-الأداء-قبل-أن-تحسن">النموذج الذهني: قِس الأداء قبل أن تحسّن</h2>
<p>بدلًا من حفظ النتائج بشكل دفاعي، قِس الأداء باستراتيجية. فمحلّل الأداء (profiler) المدمج في React (أو أدوات مثل React DevTools Profiler) سيريك:</p>
<ul>
<li>أي المكوّنات تُصيَّر بأكبر تكرار</li>
<li>كم يستغرق كل تصيير من الوقت</li>
<li>ما إذا كانت المكوّنات الأبناء يُعاد تصييرها بلا داعٍ</li>
</ul>
<p>إليك سير عمل عمليًا:</p>
<ol>
<li><strong>ابنِ أولًا، واحفظ النتائج لاحقًا</strong>: اجعل مكوّنك يعمل بشكل صحيح</li>
<li><strong>قِس المناطق المشبوهة</strong>: استخدم React DevTools لتحديد الاختناقات الفعلية</li>
<li><strong>قِس قبل وبعد</strong>: تأكّد من أن حفظ النتائج يفيد فعلًا</li>
<li><strong>ركّز على الأداء الذي يراه المستخدم</strong>: المكوّن الذي يُصيَّر في 0.1ms لا يحتاج إلى تحسين</li>
</ol>
<h2 id="أنماط-الإفراط-الشائعة-في-حفظ-النتائج-التي-يجب-تجنبها">أنماط الإفراط الشائعة في حفظ النتائج التي يجب تجنّبها</h2>
<h3 id="حفظ-القيم-الأولية-والحسابات-البسيطة">حفظ القيم الأولية والحسابات البسيطة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Not worth it</span>
<span class="hljs-keyword">const</span> isEven = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> count % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>, [count]);
<span class="hljs-keyword">const</span> message = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`Hello <span class="hljs-subst">\${name}</span>\`</span>, [name]);
<span class="hljs-keyword">const</span> isEmpty = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> items.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>, [items.<span class="hljs-property">length</span>]);

<span class="hljs-comment">// ✅ Just compute them</span>
<span class="hljs-keyword">const</span> isEven = count % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>;
<span class="hljs-keyword">const</span> message = <span class="hljs-string">\`Hello <span class="hljs-subst">\${name}</span>\`</span>;
<span class="hljs-keyword">const</span> isEmpty = items.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>;
</code></pre>
<h3 id="حفظ-دوال-لا-تسبب-إعادة-تصيير">حفظ دوال لا تسبّب إعادة تصيير</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Callback doesn&#x27;t prevent any re-renders</span>
<span class="hljs-keyword">const</span> handleSubmit = <span class="hljs-title function_">useCallback</span>(
  <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-title function_">onSubmit</span>(data);
  },
  [onSubmit],
);

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>/* ... */<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>;
</code></pre>
<p>إذا لم يكن النموذج ملفوفًا بـ <code>memo</code>، فتحسين دالة الاستدعاء بلا جدوى.</p>
<h3 id="حفظ-كل-خاصية-على-حدة">حفظ كل خاصية على حدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Memoization overload</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos, filter, sortBy }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> filteredTodos = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">category</span> === filter),
    [todos, filter],
  );

  <span class="hljs-keyword">const</span> sortedTodos = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> filteredTodos.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a[sortBy].<span class="hljs-title function_">localeCompare</span>(b[sortBy])),
    [filteredTodos, sortBy],
  );

  <span class="hljs-keyword">const</span> todoCount = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> sortedTodos.<span class="hljs-property">length</span>, [sortedTodos]);

  <span class="hljs-keyword">const</span> completedCount = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> sortedTodos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span>,
    [sortedTodos],
  );

  <span class="hljs-comment">// ... more memoized values</span>
}
</code></pre>
<p>لقد أنشأت سلسلة اعتمادات تعتمد فيها كل قيمة محفوظة على القيمة السابقة لها. وغالبًا ما يكون حساب هذه القيم مباشرة أو ربطها في <code>useMemo</code> واحد أنظف وأسرع.</p>
<h2 id="استراتيجيات-ذكية-لحفظ-النتائج">استراتيجيات ذكية لحفظ النتائج</h2>
<h3 id="الحفظ-الانتقائي">الحفظ الانتقائي</h3>
<p>ركّز على الأجزاء المكلفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Memoize only the expensive calculation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params">{ products, searchTerm, priceRange }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Filter is cheap enough to run every time</span>
  <span class="hljs-keyword">const</span> filteredProducts = products.<span class="hljs-title function_">filter</span>(
    <span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> p.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(searchTerm) &amp;&amp; p.<span class="hljs-property">price</span> &gt;= priceRange.<span class="hljs-property">min</span> &amp;&amp; p.<span class="hljs-property">price</span> &lt;= priceRange.<span class="hljs-property">max</span>,
  );

  <span class="hljs-comment">// But complex sorting/grouping might be worth memoizing</span>
  <span class="hljs-keyword">const</span> groupedProducts = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">groupByCategory</span>(filteredProducts);
  }, [filteredProducts]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">GroupedProductDisplay</span> <span class="hljs-attr">groups</span>=<span class="hljs-string">{groupedProducts}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="احفظ-النتائج-في-المستوى-الصحيح">احفظ النتائج في المستوى الصحيح</h3>
<p>أحيانًا لا تكون المشكلة في أنك تحفظ أكثر من اللازم، بل في أنك تحفظ في المكان الخطأ:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Memoizing in every instance</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params">{ todo }: { todo: Todo }</span>) {
  <span class="hljs-keyword">const</span> formattedDate = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Intl</span>.<span class="hljs-title class_">DateTimeFormat</span>(<span class="hljs-string">&#x27;en-US&#x27;</span>).<span class="hljs-title function_">format</span>(todo.<span class="hljs-property">createdAt</span>),
    [todo.<span class="hljs-property">createdAt</span>],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{formattedDate}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Memoize the formatter, not the result</span>
<span class="hljs-keyword">const</span> dateFormatter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Intl</span>.<span class="hljs-title class_">DateTimeFormat</span>(<span class="hljs-string">&#x27;en-US&#x27;</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params">{ todo }: { todo: Todo }</span>) {
  <span class="hljs-keyword">const</span> formattedDate = dateFormatter.<span class="hljs-title function_">format</span>(todo.<span class="hljs-property">createdAt</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{formattedDate}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="react-19-والتحسين-التلقائي">React 19 والتحسين التلقائي</h2>
<p>للحصول على معلومات مفصّلة عن كيفية تغيير مترجم React 19 لاحتياجات حفظ النتائج، راجع <a href="https://stevekinney.com/courses/react-performance/react-memo-react-19-and-compiler-era">React.memo في React 19 وعصر المترجم</a> و<a href="https://stevekinney.com/courses/react-performance/usememo-usecallback-in-react-19">useMemo وuseCallback في React 19</a>.</p>
<p>والخلاصة الأساسية: سيتولّى مترجم React كثيرًا من التحسينات تلقائيًا، ما يقلّل الحاجة إلى الحفظ اليدوي بمرور الوقت.</p>
<h2 id="قياس-الأثر">قياس الأثر</h2>
<p>إليك طريقة بسيطة لقياس ما إذا كان حفظ النتائج يفيدك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">time</span>(<span class="hljs-string">&#x27;expensive-calculation&#x27;</span>);

  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> computed = <span class="hljs-title function_">performExpensiveCalculation</span>(data);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">timeEnd</span>(<span class="hljs-string">&#x27;expensive-calculation&#x27;</span>);
    <span class="hljs-keyword">return</span> computed;
  }, [data]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>إذا أظهر المؤقّت باستمرار قيمًا أقل من 1-2ms، فأنت على الأرجح لا تحتاج إلى حفظ النتائج. وإذا كان يُظهر 10ms أو أكثر على الأجهزة الأبطأ، فأبقِ عليه.</p>
<h2 id="المنهج-العملي">المنهج العملي</h2>
<p>بدلًا من إضافة <code>useMemo</code> و<code>useCallback</code> في كل مكان، جرّب هذا المنهج:</p>
<ol>
<li><strong>ابدأ ببساطة</strong>: اكتب مكوّناتك دون أي حفظ للنتائج</li>
<li><strong>قِس الأداء عندما تلاحظ بطئًا</strong>: استخدم React DevTools للعثور على مشكلات الأداء الفعلية</li>
<li><strong>احفظ النتائج باستراتيجية</strong>: لا تضف الحفظ إلا حيث يُظهر القياس أنه يفيد</li>
<li><strong>أزِله عند الشك</strong>: إذا لم تستطع قياس الفائدة، فأزل الحفظ</li>
</ol>
<p>تذكّر: التحسين قبل الأوان أصل كل الشرور، لكن تجاهل مشكلات الأداء الحقيقية كذلك. والمفتاح هو إيجاد التوازن — وعادة ما يتضمّن هذا التوازن حفظًا أقل للنتائج مما قد تظن.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
