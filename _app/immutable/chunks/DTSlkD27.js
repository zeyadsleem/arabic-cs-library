const s="kinney",a="react-performance",n="أداء React",p="custom-equality-checks-areequal",l="فحوصات التساوي المخصّصة عبر areEqual",t=[{depth:2,id:"لماذا-لا-يكفي-التساوي-الافتراضي-دائما",text:"لماذا لا يكفي التساوي الافتراضي دائمًا"},{depth:2,id:"توقيع-دالة-areequal",text:"توقيع دالة areEqual"},{depth:2,id:"أنماط-عملية-لـ-areequal",text:"أنماط عملية لـ areEqual"},{depth:3,id:"مقارنة-خصائص-محددة-من-الكائن",text:"مقارنة خصائص محدّدة من الكائن"},{depth:3,id:"مقارنة-محتوى-المصفوفات",text:"مقارنة محتوى المصفوفات"},{depth:3,id:"أنماط-كائنات-التهيئة",text:"أنماط كائنات التهيئة"},{depth:2,id:"تقنيات-متقدمة-لـ-areequal",text:"تقنيات متقدّمة لـ areEqual"},{depth:3,id:"استخدام-weakmap-من-أجل-الأداء",text:"استخدام WeakMap من أجل الأداء"},{depth:3,id:"تساو-تقريبي-للبيانات-الرقمية",text:"تساوٍ تقريبي للبيانات الرقمية"},{depth:2,id:"مزالق-شائعة-وكيفية-تجنبها",text:"مزالق شائعة وكيفية تجنّبها"},{depth:3,id:"فخ-التساوي-العميق",text:"فخ التساوي العميق"},{depth:3,id:"نسيان-مراجع-الدوال",text:"نسيان مراجع الدوال"},{depth:3,id:"الإفراط-في-التحسين",text:"الإفراط في التحسين"},{depth:2,id:"حالات-استخدام-واقعية",text:"حالات استخدام واقعية™"},{depth:3,id:"تحسين-حقول-النماذج",text:"تحسين حقول النماذج"},{depth:3,id:"مكونات-تصوير-البيانات",text:"مكوّنات تصوير البيانات"},{depth:2,id:"اختبار-دوال-areequal",text:"اختبار دوال areEqual"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"متى-تستخدم-areequal",text:"متى تستخدم areEqual"},{depth:3,id:"متى-لا-تستخدم-areequal",text:"متى لا تستخدم areEqual"},{depth:2,id:"التكامل-مع-الخطافات-الأخرى",text:"التكامل مع الخُطّافات الأخرى"}],e=`<p>ميزات حفظ النتائج في React مثل <code>React.memo()</code> و<code>useMemo()</code> و<code>useCallback()</code> أدوات أداء قوية، لكنها لا تكون أذكى من فحوصات التساوي الخاصة بها. فافتراضيًا يستخدم React المقارنة السطحية — وهي تعمل على نحو ممتاز حتى تتوقف عن ذلك. وعندما تحتاج إلى تحكّم أكبر في موعد إعادة تصيير مكوّناتك، تتيح لك دوال التساوي المخصّصة مع <code>areEqual</code> كتابة منطق خاص بمجال عملك يكون سريعًا وصحيحًا في آن واحد.</p>
<p>وإن فهم متى تكتب فحوصات التساوي المخصّصة وكيفية كتابتها أمر حاسم لبناء تطبيقات React تبقى سريعة مع نموّها. وسنستكشف المقايضات والأنماط الشائعة والتقنيات العملية لتنفيذ دوال <code>areEqual</code> التي تتجنّب فخ الأداء الناتج عن المقارنة العميقة مع الحفاظ على اتساق واجهتك.</p>
<h2 id="لماذا-لا-يكفي-التساوي-الافتراضي-دائما">لماذا لا يكفي التساوي الافتراضي دائمًا</h2>
<p>تعمل المقارنة السطحية الافتراضية في React بشكل مثالي مع القيم الأولية ومراجع الكائنات البسيطة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Shallow equality handles these well</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MemoizedCounter</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ count, label }</span>) =&gt;</span> (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    {label}: {count}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
));

<span class="hljs-comment">// Won&#x27;t re-render if count and label haven&#x27;t changed</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MemoizedCounter</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{5}</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Items&quot;</span> /&gt;</span></span>;
</code></pre>
<p>لكن الأمور تتعقّد مع الكائنات المعقّدة والمصفوفات، أو عندما تحتاج إلى مقارنات خاصة بمنطق عملك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will always re-render due to new object reference</span>
<span class="hljs-keyword">const</span> user = { <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">lastSeen</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() };
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>;

<span class="hljs-comment">// ❌ Array contents are the same, but reference changes</span>
<span class="hljs-keyword">const</span> items = users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">id</span>);
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ItemList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{items}</span> /&gt;</span></span>;

<span class="hljs-comment">// ❌ Configuration object recreated on every render</span>
<span class="hljs-keyword">const</span> settings = { <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span>, <span class="hljs-attr">notifications</span>: <span class="hljs-literal">true</span> };
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span> <span class="hljs-attr">settings</span>=<span class="hljs-string">{settings}</span> /&gt;</span></span>;
</code></pre>
<p>وهنا تتألّق دوال التساوي المخصّصة — فهي تتيح لك تحديد معنى «التساوي» بدقة لحالة استخدامك الخاصة.</p>
<h2 id="توقيع-دالة-areequal">توقيع دالة areEqual</h2>
<p>عند استخدام <code>React.memo()</code> مع دالة تساوي مخصّصة، فأنت تنفّذ نمط <code>areEqual</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prevProps</span>: <span class="hljs-title class_">Props</span>, <span class="hljs-attr">nextProps</span>: <span class="hljs-title class_">Props</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-comment">// Return true if props are &quot;equal&quot; (don&#x27;t re-render)</span>
  <span class="hljs-comment">// Return false if props are &quot;different&quot; (do re-render)</span>
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">MemoizedComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-title class_">Component</span>, areEqual);
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>قيمة الإرجاع معكوسة عمّا قد تتوقّع: فالقيمة <code>true</code> تعني «لا تُعِد التصيير» والقيمة <code>false</code> تعني «أعِد التصيير».</p>
</blockquote>
<h2 id="أنماط-عملية-لـ-areequal">أنماط عملية لـ areEqual</h2>
<h3 id="مقارنة-خصائص-محددة-من-الكائن">مقارنة خصائص محدّدة من الكائن</h3>
<p>بدلًا من المقارنة العميقة لكائنات بأكملها، ركّز على الخصائص التي تهمّ فعلًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileProps</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">lastLogin</span>: <span class="hljs-title class_">Date</span>;
    <span class="hljs-attr">preferences</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;;
  };
  <span class="hljs-attr">onEdit</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">UserProfileProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">UserProfileProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-comment">// Only care about user identity and display name, not lastLogin or preferences</span>
  <span class="hljs-keyword">return</span> (
    prev.<span class="hljs-property">user</span>.<span class="hljs-property">id</span> === next.<span class="hljs-property">user</span>.<span class="hljs-property">id</span> &amp;&amp;
    prev.<span class="hljs-property">user</span>.<span class="hljs-property">name</span> === next.<span class="hljs-property">user</span>.<span class="hljs-property">name</span> &amp;&amp;
    prev.<span class="hljs-property">user</span>.<span class="hljs-property">email</span> === next.<span class="hljs-property">user</span>.<span class="hljs-property">email</span> &amp;&amp;
    prev.<span class="hljs-property">onEdit</span> === next.<span class="hljs-property">onEdit</span>
  );
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserProfile</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ user, onEdit }</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onEdit}</span>&gt;</span>Edit Profile<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  ),
  areEqual,
);
</code></pre>
<p>لن يُعاد تصيير هذا المكوّن عند تغيّر <code>lastLogin</code> أو <code>preferences</code>، لكنه سيُحدَّث عند تغيّر معلومات العرض الخاصة بالمستخدم.</p>
<h3 id="مقارنة-محتوى-المصفوفات">مقارنة محتوى المصفوفات</h3>
<p>للمصفوفات التي يهمّ فيها الترتيب لكنك تريد تجنّب إعادات التصيير غير الضرورية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TaskListProps</span> {
  <span class="hljs-attr">tasks</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span> }&gt;;
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;
}

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">TaskListProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">TaskListProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (prev.<span class="hljs-property">filter</span> !== next.<span class="hljs-property">filter</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span> (prev.<span class="hljs-property">tasks</span>.<span class="hljs-property">length</span> !== next.<span class="hljs-property">tasks</span>.<span class="hljs-property">length</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// Compare each task by its essential properties</span>
  <span class="hljs-keyword">return</span> prev.<span class="hljs-property">tasks</span>.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">prevTask, index</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> nextTask = next.<span class="hljs-property">tasks</span>[index];
    <span class="hljs-keyword">return</span> (
      prevTask.<span class="hljs-property">id</span> === nextTask.<span class="hljs-property">id</span> &amp;&amp;
      prevTask.<span class="hljs-property">title</span> === nextTask.<span class="hljs-property">title</span> &amp;&amp;
      prevTask.<span class="hljs-property">completed</span> === nextTask.<span class="hljs-property">completed</span>
    );
  });
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskList</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ tasks, filter }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> filteredTasks = tasks.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">task</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-keyword">return</span> !task.<span class="hljs-property">completed</span>;
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;completed&#x27;</span>) <span class="hljs-keyword">return</span> task.<span class="hljs-property">completed</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {filteredTasks.map((task) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TaskItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{task.id}</span> <span class="hljs-attr">task</span>=<span class="hljs-string">{task}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}, areEqual);
</code></pre>
<h3 id="أنماط-كائنات-التهيئة">أنماط كائنات التهيئة</h3>
<p>عند التعامل مع كائنات الإعدادات أو التهيئة، غالبًا ما يهمّك التساوي المنطقي بدلًا من تساوي المراجع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartProps</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> }&gt;;
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">showGrid</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">colors</span>: <span class="hljs-built_in">string</span>[];
    <span class="hljs-attr">animation</span>?: { <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">easing</span>: <span class="hljs-built_in">string</span> };
  };
}

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">ChartProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">ChartProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-comment">// Data comparison - check length first for quick exit</span>
  <span class="hljs-keyword">if</span> (prev.<span class="hljs-property">data</span>.<span class="hljs-property">length</span> !== next.<span class="hljs-property">data</span>.<span class="hljs-property">length</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span> (!prev.<span class="hljs-property">data</span>.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">point, i</span>) =&gt;</span> point.<span class="hljs-property">x</span> === next.<span class="hljs-property">data</span>[i].<span class="hljs-property">x</span> &amp;&amp; point.<span class="hljs-property">y</span> === next.<span class="hljs-property">data</span>[i].<span class="hljs-property">y</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// Options comparison - focus on visual impact</span>
  <span class="hljs-keyword">const</span> prevOpts = prev.<span class="hljs-property">options</span>;
  <span class="hljs-keyword">const</span> nextOpts = next.<span class="hljs-property">options</span>;

  <span class="hljs-keyword">if</span> (prevOpts.<span class="hljs-property">width</span> !== nextOpts.<span class="hljs-property">width</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span> (prevOpts.<span class="hljs-property">height</span> !== nextOpts.<span class="hljs-property">height</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span> (prevOpts.<span class="hljs-property">showGrid</span> !== nextOpts.<span class="hljs-property">showGrid</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// Array comparison for colors</span>
  <span class="hljs-keyword">if</span> (prevOpts.<span class="hljs-property">colors</span>.<span class="hljs-property">length</span> !== nextOpts.<span class="hljs-property">colors</span>.<span class="hljs-property">length</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">if</span> (!prevOpts.<span class="hljs-property">colors</span>.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">color, i</span>) =&gt;</span> color === nextOpts.<span class="hljs-property">colors</span>[i])) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// Animation is optional and doesn&#x27;t affect the chart structure</span>
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Chart</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ data, options }</span>) =&gt;</span> {
  <span class="hljs-comment">// Expensive chart rendering logic</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> {<span class="hljs-attr">...options</span>} /&gt;</span></span>;
}, areEqual);
</code></pre>
<h2 id="تقنيات-متقدمة-لـ-areequal">تقنيات متقدّمة لـ areEqual</h2>
<h3 id="استخدام-weakmap-من-أجل-الأداء">استخدام WeakMap من أجل الأداء</h3>
<p>للكائنات المعقّدة التي تقارنها كثيرًا، فكّر في تخزين نتائج المقارنة مؤقتًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> comparisonCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeakMap</span>();

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">ComplexProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">ComplexProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-comment">// Check cache first</span>
  <span class="hljs-keyword">const</span> cacheKey = prev.<span class="hljs-property">complexObject</span>;
  <span class="hljs-keyword">const</span> cachedResult = comparisonCache.<span class="hljs-title function_">get</span>(cacheKey);

  <span class="hljs-keyword">if</span> (cachedResult &amp;&amp; cachedResult.<span class="hljs-property">nextObject</span> === next.<span class="hljs-property">complexObject</span>) {
    <span class="hljs-keyword">return</span> cachedResult.<span class="hljs-property">result</span>;
  }

  <span class="hljs-comment">// Perform actual comparison</span>
  <span class="hljs-keyword">const</span> result =
    prev.<span class="hljs-property">complexObject</span>.<span class="hljs-property">id</span> === next.<span class="hljs-property">complexObject</span>.<span class="hljs-property">id</span> &amp;&amp;
    prev.<span class="hljs-property">complexObject</span>.<span class="hljs-property">version</span> === next.<span class="hljs-property">complexObject</span>.<span class="hljs-property">version</span>;

  <span class="hljs-comment">// Cache the result</span>
  comparisonCache.<span class="hljs-title function_">set</span>(cacheKey, {
    <span class="hljs-attr">nextObject</span>: next.<span class="hljs-property">complexObject</span>,
    result,
  });

  <span class="hljs-keyword">return</span> result;
};
</code></pre>
<h3 id="تساو-تقريبي-للبيانات-الرقمية">تساوٍ تقريبي للبيانات الرقمية</h3>
<p>أحيانًا يكون التساوي التام صارمًا أكثر من اللازم — خصوصًا مع الأعداد العشرية أو الخصائص البصرية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">EPSILON</span> = <span class="hljs-number">0.001</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnimatedProps</span> {
  <span class="hljs-attr">position</span>: { <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> };
  <span class="hljs-attr">rotation</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">scale</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">AnimatedProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">AnimatedProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">fuzzyEqual</span> = (<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span></span>) =&gt; <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">abs</span>(a - b) &lt; <span class="hljs-variable constant_">EPSILON</span>;

  <span class="hljs-keyword">return</span> (
    <span class="hljs-title function_">fuzzyEqual</span>(prev.<span class="hljs-property">position</span>.<span class="hljs-property">x</span>, next.<span class="hljs-property">position</span>.<span class="hljs-property">x</span>) &amp;&amp;
    <span class="hljs-title function_">fuzzyEqual</span>(prev.<span class="hljs-property">position</span>.<span class="hljs-property">y</span>, next.<span class="hljs-property">position</span>.<span class="hljs-property">y</span>) &amp;&amp;
    <span class="hljs-title function_">fuzzyEqual</span>(prev.<span class="hljs-property">rotation</span>, next.<span class="hljs-property">rotation</span>) &amp;&amp;
    <span class="hljs-title function_">fuzzyEqual</span>(prev.<span class="hljs-property">scale</span>, next.<span class="hljs-property">scale</span>)
  );
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AnimatedElement</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ position, rotation, scale }</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">transform:</span> \`<span class="hljs-attr">translate</span>(\${<span class="hljs-attr">position.x</span>}<span class="hljs-attr">px</span>, \${<span class="hljs-attr">position.y</span>}<span class="hljs-attr">px</span>)
                <span class="hljs-attr">rotate</span>(\${<span class="hljs-attr">rotation</span>}<span class="hljs-attr">deg</span>)
                <span class="hljs-attr">scale</span>(\${<span class="hljs-attr">scale</span>})\`,
      }}
    &gt;</span>
      Animated Content
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  ),
  areEqual,
);
</code></pre>
<h2 id="مزالق-شائعة-وكيفية-تجنبها">مزالق شائعة وكيفية تجنّبها</h2>
<h3 id="فخ-التساوي-العميق">فخ التساوي العميق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t do this - it&#x27;s slow and defeats the purpose</span>
<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">Props</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">Props</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(prev) === <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(next);
};
</code></pre>
<p>قد تكون فحوصات التساوي العميق أبطأ من إعادة التصيير نفسها. فكن انتقائيًا في ما تقارنه بدلًا من ذلك.</p>
<h3 id="نسيان-مراجع-الدوال">نسيان مراجع الدوال</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Missing function comparison</span>
<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">Props</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">Props</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> prev.<span class="hljs-property">data</span> === next.<span class="hljs-property">data</span>; <span class="hljs-comment">// Forgot about prev.onSave!</span>
};

<span class="hljs-comment">// ✅ Include all relevant props</span>
<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">Props</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">Props</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> prev.<span class="hljs-property">data</span> === next.<span class="hljs-property">data</span> &amp;&amp; prev.<span class="hljs-property">onSave</span> === next.<span class="hljs-property">onSave</span>;
};
</code></pre>
<h3 id="الإفراط-في-التحسين">الإفراط في التحسين</h3>
<p>ليست كل مكوّن بحاجة إلى تساوٍ مخصّص. قِس الأداء أولًا، وحسّن ثانيًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary complexity for a simple component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SimpleButton</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ label, onClick }</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>,
  <span class="hljs-function">(<span class="hljs-params">prev, next</span>) =&gt;</span> prev.<span class="hljs-property">label</span> === next.<span class="hljs-property">label</span> &amp;&amp; prev.<span class="hljs-property">onClick</span> === next.<span class="hljs-property">onClick</span>,
);

<span class="hljs-comment">// ✅ Default shallow comparison is fine here</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SimpleButton</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ label, onClick }</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>);
</code></pre>
<h2 id="حالات-استخدام-واقعية">حالات استخدام واقعية™</h2>
<h3 id="تحسين-حقول-النماذج">تحسين حقول النماذج</h3>
<p>تستفيد النماذج ذات الحقول الكثيرة من فحوصات التساوي الدقيقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span> {
  <span class="hljs-attr">field</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">touched</span>: <span class="hljs-built_in">boolean</span>;
  };
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">FormFieldProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">FormFieldProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> prevField = prev.<span class="hljs-property">field</span>;
  <span class="hljs-keyword">const</span> nextField = next.<span class="hljs-property">field</span>;

  <span class="hljs-keyword">return</span> (
    prevField.<span class="hljs-property">name</span> === nextField.<span class="hljs-property">name</span> &amp;&amp;
    prevField.<span class="hljs-property">value</span> === nextField.<span class="hljs-property">value</span> &amp;&amp;
    prevField.<span class="hljs-property">error</span> === nextField.<span class="hljs-property">error</span> &amp;&amp;
    prevField.<span class="hljs-property">touched</span> === nextField.<span class="hljs-property">touched</span> &amp;&amp;
    prev.<span class="hljs-property">onChange</span> === next.<span class="hljs-property">onChange</span>
  );
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">FormField</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ field, onChange }</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{field.value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(field.name, e.target.value)} /&gt;
      {field.touched &amp;&amp; field.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{field.error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  ),
  areEqual,
);
</code></pre>
<h3 id="مكونات-تصوير-البيانات">مكوّنات تصوير البيانات</h3>
<p>غالبًا ما تحتاج الرسوم البيانية والمنحنيات إلى تساوٍ مخصّص من أجل الأداء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataVisualizationProps</span> {
  <span class="hljs-attr">dataset</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[] }&gt;;
  <span class="hljs-attr">viewport</span>: { <span class="hljs-attr">startIndex</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">endIndex</span>: <span class="hljs-built_in">number</span> };
  <span class="hljs-attr">styling</span>: { <span class="hljs-attr">colors</span>: <span class="hljs-built_in">string</span>[]; <span class="hljs-attr">lineWidth</span>: <span class="hljs-built_in">number</span> };
}

<span class="hljs-keyword">const</span> areEqual = (<span class="hljs-attr">prev</span>: <span class="hljs-title class_">DataVisualizationProps</span>, <span class="hljs-attr">next</span>: <span class="hljs-title class_">DataVisualizationProps</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
  <span class="hljs-comment">// Quick viewport check first</span>
  <span class="hljs-keyword">if</span> (
    prev.<span class="hljs-property">viewport</span>.<span class="hljs-property">startIndex</span> !== next.<span class="hljs-property">viewport</span>.<span class="hljs-property">startIndex</span> ||
    prev.<span class="hljs-property">viewport</span>.<span class="hljs-property">endIndex</span> !== next.<span class="hljs-property">viewport</span>.<span class="hljs-property">endIndex</span>
  ) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// Only compare data in the visible range</span>
  <span class="hljs-keyword">const</span> visiblePrev = prev.<span class="hljs-property">dataset</span>.<span class="hljs-title function_">slice</span>(prev.<span class="hljs-property">viewport</span>.<span class="hljs-property">startIndex</span>, prev.<span class="hljs-property">viewport</span>.<span class="hljs-property">endIndex</span>);
  <span class="hljs-keyword">const</span> visibleNext = next.<span class="hljs-property">dataset</span>.<span class="hljs-title function_">slice</span>(next.<span class="hljs-property">viewport</span>.<span class="hljs-property">startIndex</span>, next.<span class="hljs-property">viewport</span>.<span class="hljs-property">endIndex</span>);

  <span class="hljs-keyword">if</span> (visiblePrev.<span class="hljs-property">length</span> !== visibleNext.<span class="hljs-property">length</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; visiblePrev.<span class="hljs-property">length</span>; i++) {
    <span class="hljs-keyword">if</span> (visiblePrev[i].<span class="hljs-property">id</span> !== visibleNext[i].<span class="hljs-property">id</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// Values array comparison could be optimized further based on your needs</span>
  }

  <span class="hljs-comment">// Styling comparison</span>
  <span class="hljs-keyword">return</span> (
    prev.<span class="hljs-property">styling</span>.<span class="hljs-property">lineWidth</span> === next.<span class="hljs-property">styling</span>.<span class="hljs-property">lineWidth</span> &amp;&amp;
    prev.<span class="hljs-property">styling</span>.<span class="hljs-property">colors</span>.<span class="hljs-property">length</span> === next.<span class="hljs-property">styling</span>.<span class="hljs-property">colors</span>.<span class="hljs-property">length</span> &amp;&amp;
    prev.<span class="hljs-property">styling</span>.<span class="hljs-property">colors</span>.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">color, i</span>) =&gt;</span> color === next.<span class="hljs-property">styling</span>.<span class="hljs-property">colors</span>[i])
  );
};
</code></pre>
<h2 id="اختبار-دوال-areequal">اختبار دوال areEqual</h2>
<p>ينبغي اختبار دوال التساوي المخصّصة مثل أي منطق عمل آخر:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;UserProfile areEqual&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> baseUser = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>, <span class="hljs-attr">lastLogin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() };
  <span class="hljs-keyword">const</span> baseProps = { <span class="hljs-attr">user</span>: baseUser, <span class="hljs-attr">onEdit</span>: jest.<span class="hljs-title function_">fn</span>() };

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return true when relevant props are unchanged&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> nextProps = {
      <span class="hljs-attr">user</span>: { ...baseUser, <span class="hljs-attr">lastLogin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() }, <span class="hljs-comment">// Changed irrelevant prop</span>
      <span class="hljs-attr">onEdit</span>: baseProps.<span class="hljs-property">onEdit</span>,
    };

    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">areEqual</span>(baseProps, nextProps)).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return false when user name changes&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> nextProps = {
      <span class="hljs-attr">user</span>: { ...baseUser, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span> },
      <span class="hljs-attr">onEdit</span>: baseProps.<span class="hljs-property">onEdit</span>,
    };

    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">areEqual</span>(baseProps, nextProps)).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return false when callback changes&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> nextProps = {
      <span class="hljs-attr">user</span>: baseUser,
      <span class="hljs-attr">onEdit</span>: jest.<span class="hljs-title function_">fn</span>(), <span class="hljs-comment">// Different function reference</span>
    };

    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">areEqual</span>(baseProps, nextProps)).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
  });
});
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="متى-تستخدم-areequal">متى تستخدم areEqual</h3>
<p>استخدم التساوي المخصّص عندما:</p>
<ul>
<li>تُسبّب المقارنة السطحية الافتراضية إعادات تصيير غير ضرورية</li>
<li>تتعامل مع كائنات متداخلة معقّدة</li>
<li>يكون تصيير المكوّن مكلفًا</li>
<li>تكون لديك متطلبات تساوٍ خاصة بمجال عملك</li>
</ul>
<h3 id="متى-لا-تستخدم-areequal">متى لا تستخدم areEqual</h3>
<p>تخطَّ التساوي المخصّص عندما:</p>
<ul>
<li>يكون تصيير المكوّن سريعًا أصلًا</li>
<li>تتغيّر الخصائص بشكل متكرر على أي حال</li>
<li>يكون منطق التساوي نفسه معقّدًا وبطيئًا</li>
<li>يكون السلوك الافتراضي جيدًا بما يكفي</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>قِس أداء تطبيقك بـ React DevTools Profiler قبل التحسين. فأحيانًا يكون فحص التساوي نفسه أكثر تكلفة من مجرد إعادة التصيير.</p>
</blockquote>
<h2 id="التكامل-مع-الخطافات-الأخرى">التكامل مع الخُطّافات الأخرى</h2>
<p>لا يقتصر التساوي المخصّص على <code>React.memo()</code>. فيمكنك تطبيق أنماط مشابهة مع خُطّافات أخرى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Custom comparison in useMemo</span>
<span class="hljs-keyword">const</span> expensiveValue = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">processData</span>(data);
}, [data.<span class="hljs-property">id</span>, data.<span class="hljs-property">version</span>]); <span class="hljs-comment">// Only depend on relevant properties</span>

<span class="hljs-comment">// Custom comparison function for useCallback</span>
<span class="hljs-keyword">const</span> memoizedCallback = <span class="hljs-title function_">useCallback</span>(
  <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title function_">handleUserAction</span>(id),
  [currentUser?.<span class="hljs-property">id</span>], <span class="hljs-comment">// Only recreate when current user changes</span>
);
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
