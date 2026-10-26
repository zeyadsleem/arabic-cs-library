const s="kinney",a="react-performance",n="أداء React",l="usememo-usecallback-in-react-19",p="استخدام useMemo وuseCallback",t=[{depth:2,id:"ما-الذي-يحله-حفظ-النتائج-فعلا",text:"ما الذي يحلّه حفظ النتائج فعلًا"},{depth:2,id:"usememo-تخزين-الحسابات-المكلفة-مؤقتا",text:"useMemo: تخزين الحسابات المكلفة مؤقتًا"},{depth:3,id:"النمط-الأساسي",text:"النمط الأساسي"},{depth:3,id:"متى-يفيد-usememo-فعلا",text:"متى يفيد useMemo فعلًا"},{depth:3,id:"متى-لا-يفيد-usememo-وقد-يضر",text:"متى لا يفيد useMemo (وقد يضرّ)"},{depth:2,id:"usecallback-تثبيت-مراجع-الدوال",text:"useCallback: تثبيت مراجع الدوال"},{depth:3,id:"النمط-الأساسي",text:"النمط الأساسي"},{depth:3,id:"أنماط-usecallback-الواقعية",text:"أنماط useCallback الواقعية"},{depth:3,id:"متى-يصبح-usecallback-بلا-جدوى",text:"متى يصبح useCallback بلا جدوى"},{depth:2,id:"react-19-نقطة-التحول",text:"React 19: نقطة التحوّل"},{depth:3,id:"تحسينات-مترجم-react",text:"تحسينات مترجم React"},{depth:3,id:"متى-لا-يزال-الحفظ-اليدوي-مفيدا",text:"متى لا يزال الحفظ اليدوي مفيدًا"},{depth:2,id:"قياس-أثر-الأداء",text:"قياس أثر الأداء"},{depth:2,id:"أفضل-الممارسات-والإرشادات",text:"أفضل الممارسات والإرشادات"},{depth:3,id:"شجرة-قرار-حفظ-النتائج",text:"شجرة قرار حفظ النتائج"},{depth:3,id:"أفضل-ممارسات-مصفوفة-الاعتمادات",text:"أفضل ممارسات مصفوفة الاعتمادات"},{depth:3,id:"المزالق-الشائعة",text:"المزالق الشائعة"},{depth:2,id:"اختبار-المكونات-المحفوظة",text:"اختبار المكوّنات المحفوظة"},{depth:2,id:"متى-لا-تقلق-بشأن-حفظ-النتائج",text:"متى لا تقلق بشأن حفظ النتائج"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>إنّ <code>useMemo</code> و<code>useCallback</code> في React خُطّافا تحسين للأداء — مع التركيز على كلمة <em>التحسين</em>. فهما ليسا حلًّا سحريًا يجعل تطبيقك سريعًا، بل أداتان جراحيتان لمعالجة اختناقات أداء محددة. ومع تحسينات المترجم (compiler) في React 19 وسلوكه الافتراضي الأفضل، يصبح فهم متى وكيف تستخدم هذين الخُطّافين أكثر إلحاحًا (ولحسن الحظ، أقل تكرارًا).</p>
<p>في هذا الدليل، سنستكشف متى يفيد حفظ النتائج فعلًا، ومتى يضرّ، وكيف يغيّر React 19 قواعد اللعبة. وبحلول النهاية، ستعرف تمامًا متى تلجأ إلى هذين الخُطّافين ومتى تترك تحسينات React المدمجة تقوم بالعمل الشاق.</p>
<h2 id="ما-الذي-يحله-حفظ-النتائج-فعلا">ما الذي يحلّه حفظ النتائج فعلًا</h2>
<p>قبل الغوص في الخُطّافين أنفسهما، لنوضّح المشكلات التي يعالجها حفظ النتائج في React:</p>
<ol>
<li><strong>الحسابات المكلفة</strong>: عندما يُعاد تصيير مكوّن، تُعاد أي حسابات مكلفة داخل دالة التصيير — حتى لو لم تتغيّر المدخلات.</li>
<li><strong>مشكلات تساوي المراجع</strong>: الكائنات والدوال الجديدة التي تُنشأ في كل تصيير قد تُسبّب إعادة تصيير غير ضرورية في المكوّنات الأبناء التي تعتمد على تساوي المراجع.</li>
<li><strong>استقرار الاعتمادات</strong>: خُطّافات مثل <code>useEffect</code> تعتمد على تساوي المراجع لتحديد موعد إعادة التشغيل.</li>
</ol>
<p>فكّر في حفظ النتائج كالتخزين المؤقت — فأنت تخزّن نتيجة وتعيد استخدامها حتى تتغيّر المدخلات. لكنه، مثل كل ذاكرات التخزين المؤقت، يأتي بتكلفة إضافية.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>حفظ النتائج ليس مجانيًا. فكل قيمة محفوظة تحتاج إلى ذاكرة لتخزينها ومنطق مقارنة لفحص الاعتمادات. لا تلجأ إلى حفظ النتائج إلا إذا كنت تعالج مشكلة أداء حقيقية.</p>
</blockquote>
<h2 id="usememo-تخزين-الحسابات-المكلفة-مؤقتا"><code>useMemo</code>: تخزين الحسابات المكلفة مؤقتًا</h2>
<p>يخزّن <code>useMemo</code> نتيجة عملية حسابية، ولا يعيد حسابها إلا عندما تتغيّر اعتماداته.</p>
<h3 id="النمط-الأساسي">النمط الأساسي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params">{ items, searchTerm }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> filteredItems = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Filtering items...&#x27;</span>); <span class="hljs-comment">// This should only run when dependencies change</span>
    <span class="hljs-keyword">return</span> items
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchTerm.<span class="hljs-title function_">toLowerCase</span>()))
      .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>));
  }, [items, searchTerm]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لولا <code>useMemo</code>، لجرى هذا الترشيح والترتيب في كل تصيير — حتى لو لم يتغيّر <code>items</code> و<code>searchTerm</code>. ومع وجود آلاف العناصر، يكون ذلك إسرافًا.</p>
<h3 id="متى-يفيد-usememo-فعلا">متى يفيد <code>useMemo</code> فعلًا</h3>
<p>هذه هي الحالات التي يقدّم فيها <code>useMemo</code> قيمة حقيقية:</p>
<p><strong>1. العمليات المكلفة حسابيًا</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">DataAnalyzer</span>(<span class="hljs-params">{ dataset }: { dataset: <span class="hljs-built_in">number</span>[] }</span>) {
  <span class="hljs-comment">// ✅ Good: Expensive statistical calculation</span>
  <span class="hljs-keyword">const</span> statistics = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> sorted = [...dataset].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> mean = dataset.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, n</span>) =&gt;</span> sum + n, <span class="hljs-number">0</span>) / dataset.<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> median = sorted[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(sorted.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>)];
    <span class="hljs-keyword">const</span> standardDeviation = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sqrt</span>(
      dataset.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, n</span>) =&gt;</span> sum + <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(n - mean, <span class="hljs-number">2</span>), <span class="hljs-number">0</span>) / dataset.<span class="hljs-property">length</span>,
    );

    <span class="hljs-keyword">return</span> { mean, median, standardDeviation };
  }, [dataset]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Render statistics */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p><strong>2. تحويلات البيانات المعقّدة</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ users, filters }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// ✅ Good: Complex filtering and transformation</span>
  <span class="hljs-keyword">const</span> processedUsers = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> users
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">department</span> &amp;&amp; user.<span class="hljs-property">department</span> !== filters.<span class="hljs-property">department</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">active</span> !== <span class="hljs-literal">undefined</span> &amp;&amp; user.<span class="hljs-property">active</span> !== filters.<span class="hljs-property">active</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">searchTerm</span>) {
          <span class="hljs-keyword">const</span> searchLower = filters.<span class="hljs-property">searchTerm</span>.<span class="hljs-title function_">toLowerCase</span>();
          <span class="hljs-keyword">return</span> (
            user.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchLower) ||
            user.<span class="hljs-property">email</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchLower)
          );
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      })
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> ({
        ...user,
        <span class="hljs-attr">displayName</span>: <span class="hljs-string">\`<span class="hljs-subst">\${user.name}</span> (<span class="hljs-subst">\${user.department}</span>)\`</span>,
        <span class="hljs-attr">initials</span>: user.<span class="hljs-property">name</span>
          .<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27; &#x27;</span>)
          .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">part</span>) =&gt;</span> part[<span class="hljs-number">0</span>])
          .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;&#x27;</span>),
      }))
      .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>));
  }, [users, filters]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Render processed users */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p><strong>3. تثبيت مراجع الكائنات للمكوّنات الأبناء</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartConfig</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;line&#x27;</span> | <span class="hljs-string">&#x27;bar&#x27;</span>;
  <span class="hljs-attr">colors</span>: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">animations</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ data, chartType }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// ✅ Good: Prevents unnecessary re-renders of expensive Chart component</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">chartConfig</span>: <span class="hljs-title class_">ChartConfig</span> = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">type</span>: chartType,
      <span class="hljs-attr">colors</span>: [<span class="hljs-string">&#x27;#ff6384&#x27;</span>, <span class="hljs-string">&#x27;#36a2eb&#x27;</span>, <span class="hljs-string">&#x27;#ffce56&#x27;</span>],
      <span class="hljs-attr">animations</span>: <span class="hljs-literal">true</span>,
    }),
    [chartType],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{chartConfig}</span> /&gt;</span></span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveChart</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ data, config }: <span class="hljs-title class_">ChartProps</span></span>) =&gt;</span> {
  <span class="hljs-comment">// Expensive rendering logic here</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Chart re-rendering&#x27;</span>); <span class="hljs-comment">// Should only log when data or config changes</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Complex chart rendering */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
});
</code></pre>
<h3 id="متى-لا-يفيد-usememo-وقد-يضر">متى لا يفيد <code>useMemo</code> (وقد يضرّ)</h3>
<p><strong>1. الحسابات البسيطة</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserCard</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-comment">// ❌ Bad: The memoization overhead exceeds the computation cost</span>
  <span class="hljs-keyword">const</span> displayName = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${user.firstName}</span> <span class="hljs-subst">\${user.lastName}</span>\`</span>;
  }, [user.<span class="hljs-property">firstName</span>, user.<span class="hljs-property">lastName</span>]);

  <span class="hljs-comment">// ✅ Better: Just do it inline</span>
  <span class="hljs-keyword">const</span> displayName = <span class="hljs-string">\`<span class="hljs-subst">\${user.firstName}</span> <span class="hljs-subst">\${user.lastName}</span>\`</span>;
}
</code></pre>
<p><strong>2. الاعتمادات التي تتغيّر دائمًا</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Timer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [time, setTime] = <span class="hljs-title function_">useState</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>());

  <span class="hljs-comment">// ❌ Bad: time changes constantly, so memoization never helps</span>
  <span class="hljs-keyword">const</span> formattedTime = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Intl</span>.<span class="hljs-title class_">DateTimeFormat</span>(<span class="hljs-string">&#x27;en-US&#x27;</span>, {
      <span class="hljs-attr">hour</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
      <span class="hljs-attr">minute</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
      <span class="hljs-attr">second</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
    }).<span class="hljs-title function_">format</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(time));
  }, [time]);

  <span class="hljs-comment">// ✅ Better: Just format it directly</span>
  <span class="hljs-keyword">const</span> formattedTime = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Intl</span>.<span class="hljs-title class_">DateTimeFormat</span>(<span class="hljs-string">&#x27;en-US&#x27;</span>, {
    <span class="hljs-attr">hour</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
    <span class="hljs-attr">minute</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
    <span class="hljs-attr">second</span>: <span class="hljs-string">&#x27;2-digit&#x27;</span>,
  }).<span class="hljs-title function_">format</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(time));
}
</code></pre>
<p><strong>3. القيم الأولية</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params">{ count }: { count: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-comment">// ❌ Bad: Primitives are already &quot;memoized&quot; by reference</span>
  <span class="hljs-keyword">const</span> doubled = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> count * <span class="hljs-number">2</span>, [count]);

  <span class="hljs-comment">// ✅ Better: Direct calculation</span>
  <span class="hljs-keyword">const</span> doubled = count * <span class="hljs-number">2</span>;
}
</code></pre>
<h2 id="usecallback-تثبيت-مراجع-الدوال"><code>useCallback</code>: تثبيت مراجع الدوال</h2>
<p>يحفظ <code>useCallback</code> تعريف دالة — لا نتيجتها. وهذا مفيد بالأساس لمنع إعادة التصيير غير الضرورية في المكوّنات الأبناء التي تعتمد على تساوي مراجع الدوال.</p>
<h3 id="النمط-الأساسي">النمط الأساسي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-keyword">const</span> [editingId, setEditingId] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Function reference stays stable unless editingId changes</span>
  <span class="hljs-keyword">const</span> handleToggleEdit = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setEditingId</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> (current === id ? <span class="hljs-literal">null</span> : id));
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
          <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span>
          <span class="hljs-attr">onToggleEdit</span>=<span class="hljs-string">{handleToggleEdit}</span>
          <span class="hljs-attr">isEditing</span>=<span class="hljs-string">{editingId</span> === <span class="hljs-string">todo.id}</span>
        /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoItem</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ todo, onToggleEdit, isEditing }: <span class="hljs-title class_">TodoItemProps</span></span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Rendering TodoItem <span class="hljs-subst">\${todo.id}</span>\`</span>); <span class="hljs-comment">// Should minimize logs</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onToggleEdit(todo.id)}&gt;{isEditing ? &#x27;Cancel&#x27; : &#x27;Edit&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});
</code></pre>
<p>لولا <code>useCallback</code>، لكان <code>handleToggleEdit</code> دالة جديدة في كل تصيير، ما يؤدي إلى إعادة تصيير جميع مكوّنات <code>TodoItem</code> حتى عندما لا تتغيّر خاصية <code>todo</code> الخاصة بها.</p>
<h3 id="أنماط-usecallback-الواقعية">أنماط <code>useCallback</code> الواقعية</h3>
<p><strong>1. معالجات الأحداث للمكوّنات المحفوظة</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserManagement</span>(<span class="hljs-params">{ users }: { users: User[] }</span>) {
  <span class="hljs-keyword">const</span> [selectedUsers, setSelectedUsers] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-comment">// ✅ Stable function reference prevents unnecessary re-renders</span>
  <span class="hljs-keyword">const</span> handleUserSelect = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">selected</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setSelectedUsers</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> newSet = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
      <span class="hljs-keyword">if</span> (selected) {
        newSet.<span class="hljs-title function_">add</span>(userId);
      } <span class="hljs-keyword">else</span> {
        newSet.<span class="hljs-title function_">delete</span>(userId);
      }
      <span class="hljs-keyword">return</span> newSet;
    });
  }, []);

  <span class="hljs-keyword">const</span> handleSelectAll = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setSelectedUsers</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">id</span>)));
  }, [users]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSelectAll}</span>&gt;</span>Select All<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {users.map((user) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span>
          <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span>
          <span class="hljs-attr">selected</span>=<span class="hljs-string">{selectedUsers.has(user.id)}</span>
          <span class="hljs-attr">onSelect</span>=<span class="hljs-string">{handleUserSelect}</span>
        /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><strong>2. دوال الاستدعاء (callbacks) ذات الاعتمادات الخارجية</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params">{ searchTerm, onResultClick }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">SearchResult</span>[]&gt;([]);

  <span class="hljs-comment">// ✅ Function depends on searchTerm, so it&#x27;s included in dependencies</span>
  <span class="hljs-keyword">const</span> handleResultClick = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-title class_">SearchResult</span></span>) =&gt;</span> {
      <span class="hljs-comment">// Log the search context with the click</span>
      analytics.<span class="hljs-title function_">track</span>(<span class="hljs-string">&#x27;search_result_clicked&#x27;</span>, {
        searchTerm,
        <span class="hljs-attr">resultId</span>: result.<span class="hljs-property">id</span>,
        <span class="hljs-attr">resultType</span>: result.<span class="hljs-property">type</span>,
      });

      <span class="hljs-title function_">onResultClick</span>(result);
    },
    [searchTerm, onResultClick],
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {results.map((result) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ResultCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{result.id}</span> <span class="hljs-attr">result</span>=<span class="hljs-string">{result}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleResultClick}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="متى-يصبح-usecallback-بلا-جدوى">متى يصبح <code>useCallback</code> بلا جدوى</h3>
<p><strong>1. لا توجد مكوّنات أبناء محفوظة</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-comment">// ❌ Bad: No memoized children, so stable reference doesn&#x27;t matter</span>
  <span class="hljs-keyword">const</span> handleClick = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Clicked <span class="hljs-subst">\${id}</span>\`</span>);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {items.map((item) =&gt; (
        // Non-memoized component will re-render anyway
        <span class="hljs-tag">&lt;<span class="hljs-name">ItemCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleClick(item.id)} /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><strong>2. الدوال التي تتغيّر دائمًا</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">BadCounter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [multiplier, setMultiplier] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">1</span>);

  <span class="hljs-comment">// ❌ Bad: Dependencies change frequently, negating memoization benefits</span>
  <span class="hljs-keyword">const</span> handleIncrement = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + multiplier);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`New count will be: <span class="hljs-subst">\${count + multiplier}</span>\`</span>);
  }, [count, multiplier]); <span class="hljs-comment">// Both values change often!</span>
}
</code></pre>
<h2 id="react-19-نقطة-التحول">React 19: نقطة التحوّل</h2>
<p>يقدّم React 19 تغييرات جوهرية تؤثّر في متى تحتاج إلى هذين الخُطّافين:</p>
<h3 id="تحسينات-مترجم-react">تحسينات مترجم React</h3>
<p>يستطيع مترجم React في الإصدار 19 أن يحسّن تلقائيًا حالات كثيرة كنت تحتاج فيها سابقًا إلى حفظ النتائج يدويًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// React 19 can optimize this automatically</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AutoOptimized</span>(<span class="hljs-params">{ items, filter }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// The compiler may automatically memoize this transformation</span>
  <span class="hljs-keyword">const</span> filteredItems = items
    .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">category</span> === filter)
    .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>));

  <span class="hljs-comment">// The compiler may automatically stabilize this function reference</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleItemClick</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Clicked item <span class="hljs-subst">\${id}</span>\`</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ItemCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleItemClick(item.id)} /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="متى-لا-يزال-الحفظ-اليدوي-مفيدا">متى لا يزال الحفظ اليدوي مفيدًا</h3>
<p>حتى مع تحسينات React 19، يبقى حفظ النتائج اليدوي قيّمًا في حالات محددة:</p>
<p><strong>1. الحدود بين المكوّنات التي لا يراها المترجم</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Still valuable: External API calls or complex integrations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">WeatherWidget</span>(<span class="hljs-params">{ location }: { location: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> weatherData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Complex weather calculation that the compiler can&#x27;t optimize</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">calculateWeatherMetrics</span>(location);
  }, [location]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* weather display */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p><strong>2. تكاملات مكتبات الطرف الثالث المكلفة</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ChartComponent</span>(<span class="hljs-params">{ data }: { data: ChartData }</span>) {
  <span class="hljs-comment">// ✅ Still needed: Third-party library optimizations</span>
  <span class="hljs-keyword">const</span> chartOptions = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> expensiveChartLibrary.<span class="hljs-title function_">generateConfig</span>(data);
  }, [data]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveChart</span> <span class="hljs-attr">options</span>=<span class="hljs-string">{chartOptions}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="قياس-أثر-الأداء">قياس أثر الأداء</h2>
<p>قبل إضافة حفظ النتائج، قِس أثر الأداء. ويُعدّ React DevTools Profiler أفضل صديق لك هنا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfiledComponent</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Add console.time to measure expensive operations</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">time</span>(<span class="hljs-string">&#x27;data-processing&#x27;</span>);

  <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">expensiveDataProcessing</span>(data);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">timeEnd</span>(<span class="hljs-string">&#x27;data-processing&#x27;</span>);
    <span class="hljs-keyword">return</span> result;
  }, [data]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* component content */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم React DevTools Profiler لتسجيل أزمنة تصيير المكوّنات قبل إضافة حفظ النتائج وبعده. إذا كان التحسّن ضئيلًا (&lt; 16ms لـ 60fps)، فتخطَّ حفظ النتائج.</p>
</blockquote>
<h2 id="أفضل-الممارسات-والإرشادات">أفضل الممارسات والإرشادات</h2>
<h3 id="شجرة-قرار-حفظ-النتائج">شجرة قرار حفظ النتائج</h3>
<ol>
<li><strong>هل الحساب مكلف فعلًا؟</strong> (&gt; 5ms باستمرار) إن كان لا: لا تلجأ إلى الحفظ، وإن كان نعم: تابع
<ul>
<li>إن كان لا: لا تلجأ إلى الحفظ</li>
<li>وإن كان نعم: تابع</li>
</ul>
</li>
<li><strong>هل تتغيّر الاعتمادات بشكل متكرر؟</strong> إن كان نعم: لن يفيد الحفظ كثيرًا، وإن كان لا: تابع
<ul>
<li>إن كان نعم: لن يفيد الحفظ كثيرًا</li>
<li>وإن كان لا: تابع</li>
</ul>
</li>
<li><strong>هل تعالج مشكلة أداء حقيقية؟</strong> إن كان لا: لا تُحسّن قبل الأوان، وإن كان نعم: احفظ النتائج
<ul>
<li>إن كان لا: لا تُحسّن قبل الأوان</li>
<li>وإن كان نعم: احفظ النتائج</li>
</ul>
</li>
</ol>
<h3 id="أفضل-ممارسات-مصفوفة-الاعتمادات">أفضل ممارسات مصفوفة الاعتمادات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params">{ user, settings }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// ✅ Good: All dependencies included</span>
  <span class="hljs-keyword">const</span> userPreferences = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">theme</span>: settings.<span class="hljs-property">theme</span>,
      <span class="hljs-attr">language</span>: user.<span class="hljs-property">preferredLanguage</span>,
      <span class="hljs-attr">notifications</span>: settings.<span class="hljs-property">notifications</span> &amp;&amp; user.<span class="hljs-property">allowNotifications</span>,
    };
  }, [settings.<span class="hljs-property">theme</span>, settings.<span class="hljs-property">notifications</span>, user.<span class="hljs-property">preferredLanguage</span>, user.<span class="hljs-property">allowNotifications</span>]);

  <span class="hljs-comment">// ✅ Good: No dependencies needed (uses setter function)</span>
  <span class="hljs-keyword">const</span> handleToggleTheme = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setTheme</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> (prev === <span class="hljs-string">&#x27;dark&#x27;</span> ? <span class="hljs-string">&#x27;light&#x27;</span> : <span class="hljs-string">&#x27;dark&#x27;</span>));
  }, []);
}
</code></pre>
<h3 id="المزالق-الشائعة">المزالق الشائعة</h3>
<p><strong>1. الاعتمادات الناقصة</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">BuggyComponent</span>(<span class="hljs-params">{ items, filter }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> [sortOrder, setSortOrder] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;asc&#x27;</span>);

  <span class="hljs-comment">// ❌ Bug: Missing sortOrder in dependencies</span>
  <span class="hljs-keyword">const</span> sortedItems = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> items
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">type</span> === filter)
      .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> sortOrder === <span class="hljs-string">&#x27;asc&#x27;</span> ? a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>) : b.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(a.<span class="hljs-property">name</span>);
      });
  }, [items, filter]); <span class="hljs-comment">// Missing sortOrder!</span>
}
</code></pre>
<p><strong>2. الكائنات كاعتمادات</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TrickyComponent</span>(<span class="hljs-params">{ config }: { config: Config }</span>) {
  <span class="hljs-comment">// ❌ Potentially problematic: config object might be new every render</span>
  <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">processData</span>(config);
  }, [config]);

  <span class="hljs-comment">// ✅ Better: Depend on specific properties</span>
  <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">processData</span>(config);
  }, [config.<span class="hljs-property">apiUrl</span>, config.<span class="hljs-property">timeout</span>, config.<span class="hljs-property">retries</span>]);
}
</code></pre>
<h2 id="اختبار-المكونات-المحفوظة">اختبار المكوّنات المحفوظة</h2>
<p>تتطلّب المكوّنات المحفوظة اعتبارات خاصة عند اختبارها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;MemoizedComponent&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not recalculate when irrelevant props change&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> expensiveCalculation = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-string">&#x27;calculated result&#x27;</span>);

    <span class="hljs-keyword">function</span> <span class="hljs-title function_">TestComponent</span>(<span class="hljs-params">{ data, irrelevantProp }: <span class="hljs-title class_">Props</span></span>) {
      <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">expensiveCalculation</span>(data), [data]);
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{result}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }

    <span class="hljs-keyword">const</span> { rerender } = <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;test&quot;</span> <span class="hljs-attr">irrelevantProp</span>=<span class="hljs-string">&quot;value1&quot;</span> /&gt;</span></span>);

    <span class="hljs-title function_">expect</span>(expensiveCalculation).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);

    <span class="hljs-comment">// Re-render with different irrelevant prop</span>
    <span class="hljs-title function_">rerender</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">&quot;test&quot;</span> <span class="hljs-attr">irrelevantProp</span>=<span class="hljs-string">&quot;value2&quot;</span> /&gt;</span></span>);

    <span class="hljs-comment">// Should not call expensive calculation again</span>
    <span class="hljs-title function_">expect</span>(expensiveCalculation).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);
  });
});
</code></pre>
<h2 id="متى-لا-تقلق-بشأن-حفظ-النتائج">متى لا تقلق بشأن حفظ النتائج</h2>
<p>تعني تحسينات React 19 أنه يمكنك غالبًا تخطّي التحسين اليدوي في هذه الحالات:</p>
<ul>
<li>مكوّنات بسيطة بحسابات ضئيلة</li>
<li>مكوّنات لا يُعاد تصييرها إلا نادرًا</li>
<li>نُسخ التطوير (ركّز على أداء نسخة الإنتاج)</li>
<li>القوائم الصغيرة (أقل من 100 عنصر عادةً)</li>
<li>التطبيقات التي لا تعاني مشكلات أداء</li>
</ul>
<p>تذكّر: <strong>التحسين قبل الأوان أصل كل الشرور</strong>. ابدأ بشيفرة نظيفة ومقروءة. وأضف حفظ النتائج عندما تواجه مشكلات أداء فعلية، لا مشكلات متخيَّلة.</p>
<h2 id="الخلاصة">الخلاصة</h2>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
