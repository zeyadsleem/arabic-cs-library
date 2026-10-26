const s="kinney",a="react-performance",n="أداء React",l="context-api-performance-pitfalls",t="مزالق أداء Context API",p=[{depth:2,id:"كيف-يعمل-context-حقا",text:"كيف يعمل Context حقًا"},{depth:2,id:"المزالق-الكلاسيكية",text:"المزالق الكلاسيكية"},{depth:3,id:"المزلق-الأول-السياق-العملاق",text:"المزلق الأول: السياق العملاق"},{depth:3,id:"المزلق-الثاني-قيم-سياق-غير-مستقرة",text:"المزلق الثاني: قيم سياق غير مستقرة"},{depth:3,id:"المزلق-الثالث-عدم-فصل-الحالة-عن-الإجراءات",text:"المزلق الثالث: عدم فصل الحالة عن الإجراءات"},{depth:2,id:"أنماط-متقدمة-للسياق",text:"أنماط متقدّمة للسياق"},{depth:3,id:"النمط-الأول-تركيب-السياقات",text:"النمط الأول: تركيب السياقات"},{depth:3,id:"النمط-الثاني-نمط-المحدد-مع-usesyncexternalstore",text:"النمط الثاني: نمط المحدِّد مع useSyncExternalStore"},{depth:3,id:"النمط-الثالث-نمط-المصنع-لعدة-نسخ",text:"النمط الثالث: نمط المصنع لعدة نُسخ"},{depth:2,id:"تقنيات-التحسين",text:"تقنيات التحسين"},{depth:3,id:"التقنية-الأولى-حدود-الحفظ",text:"التقنية الأولى: حدود الحفظ"},{depth:3,id:"التقنية-الثانية-وسيط-سياق-مع-zustand",text:"التقنية الثانية: وسيط سياق مع Zustand"},{depth:3,id:"التقنية-الثالثة-تهيئة-السياق-بتحميل-كسول",text:"التقنية الثالثة: تهيئة السياق بتحميل كسول"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"context-مقابل-إدارة-الحالة-الأخرى",text:"Context مقابل إدارة الحالة الأخرى"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يبدو Context حلًّا مثاليًا لتمرير الخصائص عبر الطبقات (prop drilling) — إلى أن يُعاد تصيير تطبيقك كاملًا في كل مرة يكتب فيها أحدهم في مربّع بحث. فـ Context API ميزة من أكثر ميزات React فائدة، وفي الوقت نفسه من أكبر مزالق الأداء فيها. فإن استخدمته بشكل خاطئ، أطلقت سلاسل إعادات تصيير تجعل تطبيقك يبدو وكأنه يعمل على جهاز عتيق. وإن أحسنت استخدامه، حصلت على شجرة مكوّنات نظيفة بتحديثات فعّالة.</p>
<p>المشكلة ليست في Context نفسه، بل في طريقة استخدامنا له. فإلقاء كل شيء في سياق واحد، وعدم فصل الحالة عن الإجراءات، وتجاهل حدود الحفظ، وسوء فهم متى يُطلق Context إعادات التصيير — كلها الأسباب الحقيقية. يكشف هذا الدليل كل مزلق من مزالق أداء Context، والأهم من ذلك يريك بالضبط كيف تتجنّبها مع الاستفادة من قوة Context لشيفرة نظيفة قابلة للصيانة.</p>
<h2 id="كيف-يعمل-context-حقا">كيف يعمل Context حقًا</h2>
<p>أولًا، لنُزل الغموض عن ما يفعله Context فعلًا ومتى يُطلق إعادات التصيير:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Context doesn&#x27;t optimize anything—it&#x27;s just a broadcast mechanism</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = <span class="hljs-title class_">React</span>.<span class="hljs-property">createContext</span>&lt;<span class="hljs-title class_">Theme</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [theme, setTheme] = useState&lt;<span class="hljs-title class_">Theme</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);

  <span class="hljs-comment">// Every time theme changes, ALL consumers re-render</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{theme}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span> {/* Re-renders */}
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> /&gt;</span> {/* Re-renders */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span> {/* Re-renders */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span> {/* Re-renders */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Understanding Context&#x27;s re-render behavior</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContextRenderFlow</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Parent renders&#x27;</span>);

  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [theme, setTheme] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;light&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">CountContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{count}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{theme}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount((c) =&gt; c + 1)}&gt;
          Increment (all count consumers re-render)
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setTheme((t) =&gt; (t === &#x27;light&#x27; ? &#x27;dark&#x27; : &#x27;light&#x27;))}&gt;
          Toggle theme (all theme consumers re-render)
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">NonConsumer</span> /&gt;</span> {/* Doesn&#x27;t re-render on context change */}
        <span class="hljs-tag">&lt;<span class="hljs-name">CountConsumer</span> /&gt;</span> {/* Re-renders on count change */}
        <span class="hljs-tag">&lt;<span class="hljs-name">ThemeConsumer</span> /&gt;</span> {/* Re-renders on theme change */}
        <span class="hljs-tag">&lt;<span class="hljs-name">BothConsumer</span> /&gt;</span> {/* Re-renders on either change */}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Provider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">CountContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Key insight: Only components that useContext re-render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">NonConsumer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;NonConsumer renders&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>I don&#x27;t re-render on context changes<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CountConsumer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> count = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">CountContext</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;CountConsumer renders&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="المزالق-الكلاسيكية">المزالق الكلاسيكية</h2>
<h3 id="المزلق-الأول-السياق-العملاق">المزلق الأول: السياق العملاق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Everything in one context</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppContextValue</span> {
  <span class="hljs-comment">// User data</span>
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">credentials</span>: <span class="hljs-title class_">Credentials</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// Theme</span>
  <span class="hljs-attr">theme</span>: <span class="hljs-title class_">Theme</span>;
  <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// UI State</span>
  <span class="hljs-attr">sidebarOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">setSidebarOpen</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">open</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">modalState</span>: <span class="hljs-title class_">ModalState</span>;
  <span class="hljs-attr">openModal</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">modal</span>: <span class="hljs-title class_">ModalConfig</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">closeModal</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// App data</span>
  <span class="hljs-attr">notifications</span>: <span class="hljs-title class_">Notification</span>[];
  <span class="hljs-attr">addNotification</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">notification</span>: <span class="hljs-title class_">Notification</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">removeNotification</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AppContext</span> = createContext&lt;<span class="hljs-title class_">AppContextValue</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// Problem: Changing ANY value re-renders ALL consumers</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadContextProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [theme, setTheme] = useState&lt;<span class="hljs-title class_">Theme</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);
  <span class="hljs-keyword">const</span> [sidebarOpen, setSidebarOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-comment">// ... more state</span>

  <span class="hljs-comment">// ❌ New object every render!</span>
  <span class="hljs-keyword">const</span> value = {
    user,
    <span class="hljs-attr">isAuthenticated</span>: !!user,
    <span class="hljs-attr">login</span>: <span class="hljs-title function_">async</span> (credentials) =&gt; {
      <span class="hljs-comment">/* ... */</span>
    },
    <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setUser</span>(<span class="hljs-literal">null</span>),
    theme,
    <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setTheme</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> (t === <span class="hljs-string">&#x27;light&#x27;</span> ? <span class="hljs-string">&#x27;dark&#x27;</span> : <span class="hljs-string">&#x27;light&#x27;</span>)),
    sidebarOpen,
    setSidebarOpen,
    <span class="hljs-comment">// ... more values</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">AppContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// Every component using ANY part of context re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Sidebar</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { sidebarOpen } = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">AppContext</span>)!;
  <span class="hljs-comment">// Re-renders when user, theme, or ANYTHING changes!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{sidebarOpen</span> ? &#x27;<span class="hljs-attr">open</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">closed</span>&#x27;}&gt;</span>Sidebar<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="المزلق-الثاني-قيم-سياق-غير-مستقرة">المزلق الثاني: قيم سياق غير مستقرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Creating new objects/arrays/functions on every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UnstableProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ❌ New object every render = all consumers re-render</span>
  <span class="hljs-keyword">const</span> value = {
    user,
    <span class="hljs-attr">permissions</span>: user?.<span class="hljs-property">roles</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">permissions</span>).<span class="hljs-title function_">flat</span>() || [],
    <span class="hljs-attr">isAdmin</span>: user?.<span class="hljs-property">roles</span>.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;admin&#x27;</span>) || <span class="hljs-literal">false</span>,
    <span class="hljs-attr">updateUser</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) =&gt;</span> {
      <span class="hljs-title function_">setUser</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> (prev ? { ...prev, ...updates } : <span class="hljs-literal">null</span>));
    },
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Stable context value with useMemo</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">StableProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> updateUser = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) =&gt;</span> {
    <span class="hljs-title function_">setUser</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> (prev ? { ...prev, ...updates } : <span class="hljs-literal">null</span>));
  }, []);

  <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      user,
      <span class="hljs-attr">permissions</span>: user?.<span class="hljs-property">roles</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">permissions</span>).<span class="hljs-title function_">flat</span>() || [],
      <span class="hljs-attr">isAdmin</span>: user?.<span class="hljs-property">roles</span>.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;admin&#x27;</span>) || <span class="hljs-literal">false</span>,
      updateUser,
    }),
    [user, updateUser],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span></span>;
}
</code></pre>
<h3 id="المزلق-الثالث-عدم-فصل-الحالة-عن-الإجراءات">المزلق الثالث: عدم فصل الحالة عن الإجراءات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: State and actions in same context</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">StateActionContext</span> = createContext&lt;{
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">setCount</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">increment</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">decrement</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
} | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// Problem: Components only using actions re-render on state change</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">IncrementButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { increment } = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">StateActionContext</span>)!;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Button re-renders on every count change!&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Separate state and dispatch contexts</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">StateContext</span> = createContext&lt;{ <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span> } | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">DispatchContext</span> = createContext&lt;{
  <span class="hljs-attr">increment</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">decrement</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
} | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SplitProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// Actions are stable (never change)</span>
  <span class="hljs-keyword">const</span> actions = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">increment</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>),
      <span class="hljs-attr">decrement</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c - <span class="hljs-number">1</span>),
    }),
    [],
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StateContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">count</span> }}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DispatchContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{actions}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">DispatchContext.Provider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">StateContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Now button doesn&#x27;t re-render on count change!</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedIncrementButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { increment } = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">DispatchContext</span>)!;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Button only renders once!&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-متقدمة-للسياق">أنماط متقدّمة للسياق</h2>
<h3 id="النمط-الأول-تركيب-السياقات">النمط الأول: تركيب السياقات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Split contexts by concern and compose them</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Contexts</span> {
  <span class="hljs-attr">auth</span>: <span class="hljs-title class_">AuthContext</span>;
  <span class="hljs-attr">theme</span>: <span class="hljs-title class_">ThemeContext</span>;
  <span class="hljs-attr">ui</span>: <span class="hljs-title class_">UIContext</span>;
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">DataContext</span>;
}

<span class="hljs-comment">// Individual focused contexts</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AuthContext</span> = createContext&lt;<span class="hljs-title class_">AuthState</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = createContext&lt;<span class="hljs-title class_">ThemeState</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UIContext</span> = createContext&lt;<span class="hljs-title class_">UIState</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">DataContext</span> = createContext&lt;<span class="hljs-title class_">DataState</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// Compose providers</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppProviders</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AuthProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">UIProvider</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">DataProvider</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">DataProvider</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">UIProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">AuthProvider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Or use a provider composer utility</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">composeProviders</span>(<span class="hljs-params">...<span class="hljs-attr">providers</span>: <span class="hljs-title class_">React</span>.FC&lt;{ children: ReactNode }&gt;[]</span>) {
  <span class="hljs-keyword">return</span> providers.<span class="hljs-title function_">reduce</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-title class_">Prev</span>, <span class="hljs-title class_">Curr</span></span>) =&gt;</span>
      <span class="hljs-function">(<span class="hljs-params">{ children }: { children: ReactNode }</span>) =&gt;</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Prev</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Curr</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Curr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Prev</span>&gt;</span></span>
      ),
    <span class="hljs-function">(<span class="hljs-params">{ children }: { children: ReactNode }</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children}<span class="hljs-tag">&lt;/&gt;</span></span>,
  );
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AppProvider</span> = <span class="hljs-title function_">composeProviders</span>(<span class="hljs-title class_">AuthProvider</span>, <span class="hljs-title class_">ThemeProvider</span>, <span class="hljs-title class_">UIProvider</span>, <span class="hljs-title class_">DataProvider</span>);
</code></pre>
<h3 id="النمط-الثاني-نمط-المحدد-مع-usesyncexternalstore">النمط الثاني: نمط المحدِّد مع <code>useSyncExternalStore</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Create a context with selector support</span>
<span class="hljs-keyword">function</span> createSelectableContext&lt;T&gt;() {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">StoreContext</span> = createContext&lt;{
    <span class="hljs-attr">getState</span>: <span class="hljs-function">() =&gt;</span> T;
    <span class="hljs-attr">subscribe</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">listener</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">setState</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updater</span>: (prev: T) =&gt; T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  } | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">Provider</span>(<span class="hljs-params">{ children, initialState }: { children: ReactNode; initialState: T }</span>) {
    <span class="hljs-keyword">const</span> stateRef = <span class="hljs-title function_">useRef</span>(initialState);
    <span class="hljs-keyword">const</span> listenersRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>&gt;());

    <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useMemo</span>(
      <span class="hljs-function">() =&gt;</span> ({
        <span class="hljs-attr">getState</span>: <span class="hljs-function">() =&gt;</span> stateRef.<span class="hljs-property">current</span>,
        <span class="hljs-attr">subscribe</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">listener</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
          listenersRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">add</span>(listener);
          <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> listenersRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">delete</span>(listener);
        },
        <span class="hljs-attr">setState</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updater</span>: (prev: T) =&gt; T</span>) =&gt;</span> {
          stateRef.<span class="hljs-property">current</span> = <span class="hljs-title function_">updater</span>(stateRef.<span class="hljs-property">current</span>);
          listenersRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">listener</span>) =&gt;</span> <span class="hljs-title function_">listener</span>());
        },
      }),
      [],
    );

    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StoreContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{store}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">StoreContext.Provider</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">function</span> useSelector&lt;<span class="hljs-title class_">Selected</span>&gt;(
    <span class="hljs-attr">selector</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: T</span>) =&gt;</span> <span class="hljs-title class_">Selected</span>,
    <span class="hljs-attr">equalityFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-title class_">Selected</span>, <span class="hljs-attr">b</span>: <span class="hljs-title class_">Selected</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span> = <span class="hljs-title class_">Object</span>.<span class="hljs-property">is</span>,
  ): <span class="hljs-title class_">Selected</span> {
    <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">StoreContext</span>);
    <span class="hljs-keyword">if</span> (!store) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Missing provider&#x27;</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-title function_">useSyncExternalStore</span>(
      store.<span class="hljs-property">subscribe</span>,
      <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">selector</span>(store.<span class="hljs-title function_">getState</span>()),
      <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">selector</span>(store.<span class="hljs-title function_">getState</span>()),
    );
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">useDispatch</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">StoreContext</span>);
    <span class="hljs-keyword">if</span> (!store) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Missing provider&#x27;</span>);
    <span class="hljs-keyword">return</span> store.<span class="hljs-property">setState</span>;
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-title class_">Provider</span>, useSelector, useDispatch };
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppState</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  <span class="hljs-attr">notifications</span>: <span class="hljs-title class_">Notification</span>[];
  <span class="hljs-attr">sidebarOpen</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AppStore</span> = createSelectableContext&lt;<span class="hljs-title class_">AppState</span>&gt;();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppStore.Provider</span>
      <span class="hljs-attr">initialState</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">user:</span> <span class="hljs-attr">null</span>,
        <span class="hljs-attr">theme:</span> &#x27;<span class="hljs-attr">light</span>&#x27;,
        <span class="hljs-attr">notifications:</span> [],
        <span class="hljs-attr">sidebarOpen:</span> <span class="hljs-attr">false</span>,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">NotificationBell</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">AppStore.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Components only re-render when selected state changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title class_">AppStore</span>.<span class="hljs-title function_">useSelector</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">user</span>);
  <span class="hljs-comment">// Only re-renders when user changes!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user?.name || &#x27;Guest&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">NotificationBell</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> count = <span class="hljs-title class_">AppStore</span>.<span class="hljs-title function_">useSelector</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">notifications</span>.<span class="hljs-property">length</span>);
  <span class="hljs-comment">// Only re-renders when notification count changes!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>🔔 {count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="النمط-الثالث-نمط-المصنع-لعدة-نسخ">النمط الثالث: نمط المصنع لعدة نُسخ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Create multiple instances of the same context type</span>
<span class="hljs-keyword">function</span> createNamedContext&lt;T&gt;(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Context</span> = createContext&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">Provider</span>(<span class="hljs-params">{ value, children }: { value: T; children: ReactNode }</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Context.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Context.Provider</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">useContextValue</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">Context</span>);
    <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`use<span class="hljs-subst">\${name}</span> must be used within <span class="hljs-subst">\${name}</span>Provider\`</span>);
    }
    <span class="hljs-keyword">return</span> value;
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-title class_">Provider</span>,
    <span class="hljs-attr">useContext</span>: useContextValue,
  };
}

<span class="hljs-comment">// Create multiple form contexts</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">LoginFormContext</span> = createNamedContext&lt;<span class="hljs-title class_">FormState</span>&gt;(<span class="hljs-string">&#x27;LoginForm&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">RegisterFormContext</span> = createNamedContext&lt;<span class="hljs-title class_">FormState</span>&gt;(<span class="hljs-string">&#x27;RegisterForm&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProfileFormContext</span> = createNamedContext&lt;<span class="hljs-title class_">FormState</span>&gt;(<span class="hljs-string">&#x27;ProfileForm&#x27;</span>);

<span class="hljs-comment">// Each form has isolated state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FormsPage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">LoginFormContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{loginFormState}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">LoginForm</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">LoginFormContext.Provider</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">RegisterFormContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{registerFormState}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">RegisterForm</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">RegisterFormContext.Provider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تقنيات-التحسين">تقنيات التحسين</h2>
<h3 id="التقنية-الأولى-حدود-الحفظ">التقنية الأولى: حدود الحفظ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Use memo to prevent context changes from propagating</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveComponent</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params">{ data }: { data: ComplexData }</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Only re-renders when data prop changes&#x27;</span>);
  <span class="hljs-comment">// Expensive computation...</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Complex UI */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContextConsumer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { user, theme } = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">AppContext</span>)!;

  <span class="hljs-comment">// ExpensiveComponent won&#x27;t re-render on theme change</span>
  <span class="hljs-comment">// if user hasn&#x27;t changed</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{theme}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveComponent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{user.data}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Strategic memo placement</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">StrategicMemoization</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { frequently, rarely } = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">MixedContext</span>)!;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* Re-renders frequently */}
      <span class="hljs-tag">&lt;<span class="hljs-name">FrequentUpdates</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{frequently}</span> /&gt;</span>

      {/* Memo boundary prevents unnecessary re-renders */}
      <span class="hljs-tag">&lt;<span class="hljs-name">MemoizedRareUpdates</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{rarely}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">MemoizedRareUpdates</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-keyword">function</span> <span class="hljs-title function_">RareUpdates</span>(<span class="hljs-params">{ value }: { value: <span class="hljs-built_in">any</span> }</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Only re-renders when rarely changes&#x27;</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveTree</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> /&gt;</span></span>;
});
</code></pre>
<h3 id="التقنية-الثانية-وسيط-سياق-مع-zustand">التقنية الثانية: وسيط سياق مع Zustand</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Use Zustand for complex state, Context for DI</span>
<span class="hljs-keyword">import</span> { create } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zustand&#x27;</span>;
<span class="hljs-keyword">import</span> { subscribeWithSelector } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zustand/middleware&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppStore</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  <span class="hljs-attr">notifications</span>: <span class="hljs-title class_">Notification</span>[];

  <span class="hljs-attr">setUser</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">addNotification</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">notification</span>: <span class="hljs-title class_">Notification</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> useAppStore = create&lt;<span class="hljs-title class_">AppStore</span>&gt;()(
  <span class="hljs-title function_">subscribeWithSelector</span>(<span class="hljs-function">(<span class="hljs-params">set</span>) =&gt;</span> ({
    <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span>,
    <span class="hljs-attr">notifications</span>: [],

    <span class="hljs-attr">setUser</span>: <span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> <span class="hljs-title function_">set</span>({ user }),
    <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span>
      <span class="hljs-title function_">set</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({
        <span class="hljs-attr">theme</span>: state.<span class="hljs-property">theme</span> === <span class="hljs-string">&#x27;light&#x27;</span> ? <span class="hljs-string">&#x27;dark&#x27;</span> : <span class="hljs-string">&#x27;light&#x27;</span>,
      })),
    <span class="hljs-attr">addNotification</span>: <span class="hljs-function">(<span class="hljs-params">notification</span>) =&gt;</span>
      <span class="hljs-title function_">set</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({
        <span class="hljs-attr">notifications</span>: [...state.<span class="hljs-property">notifications</span>, notification],
      })),
  })),
);

<span class="hljs-comment">// Provide store via Context for testing/isolation</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">StoreContext</span> = <span class="hljs-title function_">createContext</span>(useAppStore);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">StoreProvider</span>(<span class="hljs-params">{
  children,
  store = useAppStore,
}: {
  children: ReactNode;
  store?: <span class="hljs-keyword">typeof</span> useAppStore;
}</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StoreContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{store}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">StoreContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// Components use selectors for fine-grained subscriptions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserAvatar</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">StoreContext</span>);
  <span class="hljs-keyword">const</span> avatar = <span class="hljs-title function_">store</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">user</span>?.<span class="hljs-property">avatar</span>);
  <span class="hljs-comment">// Only re-renders when avatar changes!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;User&quot;</span> /&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemeToggle</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">StoreContext</span>);
  <span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">store</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">theme</span>);
  <span class="hljs-keyword">const</span> toggleTheme = <span class="hljs-title function_">store</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">toggleTheme</span>);
  <span class="hljs-comment">// Only re-renders when theme changes!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{toggleTheme}</span>&gt;</span>Current: {theme}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h3 id="التقنية-الثالثة-تهيئة-السياق-بتحميل-كسول">التقنية الثالثة: تهيئة السياق بتحميل كسول</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Defer expensive context initialization</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">LazyProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [isReady, setIsReady] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">ExpensiveState</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Initialize expensive state asynchronously</span>
    <span class="hljs-keyword">let</span> cancelled = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">initialize</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">const</span> expensiveState = <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadExpensiveState</span>();

      <span class="hljs-keyword">if</span> (!cancelled) {
        <span class="hljs-title function_">setState</span>(expensiveState);
        <span class="hljs-title function_">setIsReady</span>(<span class="hljs-literal">true</span>);
      }
    }

    <span class="hljs-title function_">initialize</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      cancelled = <span class="hljs-literal">true</span>;
    };
  }, []);

  <span class="hljs-keyword">if</span> (!isReady) {
    <span class="hljs-comment">// Provide minimal context during initialization</span>
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MinimalContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{null}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">LoadingFallback</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">MinimalContext.Provider</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FullContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{state}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">FullContext.Provider</span>&gt;</span></span>;
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Monitor context performance</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">ContextPerformanceMonitor</span>&lt;T&gt;({
  name,
  value,
  children,
}: {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}) {
  <span class="hljs-keyword">const</span> renderCount = <span class="hljs-title function_">useRef</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> previousValue = <span class="hljs-title function_">useRef</span>(value);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    renderCount.<span class="hljs-property">current</span>++;

    <span class="hljs-comment">// Track what changed</span>
    <span class="hljs-keyword">if</span> (previousValue.<span class="hljs-property">current</span> !== value) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">\`Context &quot;<span class="hljs-subst">\${name}</span>&quot; updated\`</span>);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Render count:&#x27;</span>, renderCount.<span class="hljs-property">current</span>);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Previous value:&#x27;</span>, previousValue.<span class="hljs-property">current</span>);
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;New value:&#x27;</span>, value);

      <span class="hljs-comment">// Deep comparison for objects</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;object&#x27;</span> &amp;&amp; value !== <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">const</span> changes = <span class="hljs-title function_">findChanges</span>(previousValue.<span class="hljs-property">current</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>, value <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>);
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Changes:&#x27;</span>, changes);
      }

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();

      previousValue.<span class="hljs-property">current</span> = value;
    }
  });

  <span class="hljs-comment">// Measure render time</span>
  <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

  <span class="hljs-keyword">const</span> content = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Context.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">Context.Provider</span>&gt;</span></span>;

  <span class="hljs-keyword">const</span> renderTime = performance.<span class="hljs-title function_">now</span>() - startTime;

  <span class="hljs-keyword">if</span> (renderTime &gt; <span class="hljs-number">16</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Slow context render: <span class="hljs-subst">\${name}</span> took <span class="hljs-subst">\${renderTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>);
  }

  <span class="hljs-keyword">return</span> content;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">findChanges</span>(<span class="hljs-params"><span class="hljs-attr">prev</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">next</span>: <span class="hljs-built_in">any</span></span>): <span class="hljs-built_in">string</span>[] {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">changes</span>: <span class="hljs-built_in">string</span>[] = [];

  <span class="hljs-comment">// Check all keys</span>
  <span class="hljs-keyword">const</span> allKeys = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>([...<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(prev || {}), ...<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(next || {})]);

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">of</span> allKeys) {
    <span class="hljs-keyword">if</span> (prev?.[key] !== next?.[key]) {
      changes.<span class="hljs-title function_">push</span>(key);
    }
  }

  <span class="hljs-keyword">return</span> changes;
}
</code></pre>
<h2 id="context-مقابل-إدارة-الحالة-الأخرى">Context مقابل إدارة الحالة الأخرى</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// When to use Context vs alternatives</span>

<span class="hljs-comment">// ✅ Good for Context: Truly global, rarely changing</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = createContext&lt;<span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AuthContext</span> = createContext&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">LocaleContext</span> = createContext&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;en&#x27;</span>);

<span class="hljs-comment">// ❌ Bad for Context: Frequently changing, performance-critical</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MousePositionContext</span> = <span class="hljs-title function_">createContext</span>({ <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }); <span class="hljs-comment">// Changes constantly!</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AnimationContext</span> = <span class="hljs-title function_">createContext</span>({ <span class="hljs-attr">frame</span>: <span class="hljs-number">0</span> }); <span class="hljs-comment">// 60fps updates!</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">FormContext</span> = <span class="hljs-title function_">createContext</span>({ <span class="hljs-attr">values</span>: {}, <span class="hljs-attr">errors</span>: {} }); <span class="hljs-comment">// Every keystroke!</span>

<span class="hljs-comment">// Better alternatives for high-frequency updates:</span>

<span class="hljs-comment">// 1. Local state for component-specific data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">LocalStateExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [mousePos, setMousePos] = <span class="hljs-title function_">useState</span>({ <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> });
  <span class="hljs-comment">// Only this component re-renders</span>
}

<span class="hljs-comment">// 2. Zustand/Jotai for complex shared state</span>
<span class="hljs-keyword">const</span> useMouseStore = <span class="hljs-title function_">create</span>(<span class="hljs-function">(<span class="hljs-params">set</span>) =&gt;</span> ({
  <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">updatePosition</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-title function_">set</span>({ x, y }),
}));

<span class="hljs-comment">// 3. Refs for values that don&#x27;t need to trigger renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">RefExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> mousePos = <span class="hljs-title function_">useRef</span>({ <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMouseMove</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">MouseEvent</span></span>) =&gt; {
    mousePos.<span class="hljs-property">current</span> = { <span class="hljs-attr">x</span>: e.<span class="hljs-property">clientX</span>, <span class="hljs-attr">y</span>: e.<span class="hljs-property">clientY</span> };
    <span class="hljs-comment">// No re-render!</span>
  };
}

<span class="hljs-comment">// 4. URL state for navigation-related data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">URLStateExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [searchParams, setSearchParams] = <span class="hljs-title function_">useSearchParams</span>();
  <span class="hljs-keyword">const</span> filter = searchParams.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;filter&#x27;</span>);
  <span class="hljs-comment">// Shareable, bookmarkable, back-button friendly</span>
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContextBestPractices</span> {
  <span class="hljs-comment">// Structure</span>
  <span class="hljs-attr">splitContexts</span>: <span class="hljs-string">&#x27;Separate by domain and update frequency&#x27;</span>;
  <span class="hljs-attr">separateStateAndDispatch</span>: <span class="hljs-string">&#x27;Split state from actions&#x27;</span>;
  <span class="hljs-attr">avoidMegaContexts</span>: <span class="hljs-string">&#x27;No kitchen-sink contexts&#x27;</span>;

  <span class="hljs-comment">// Performance</span>
  <span class="hljs-attr">memoizeValue</span>: <span class="hljs-string">&#x27;useMemo for context value objects&#x27;</span>;
  <span class="hljs-attr">useCallbacks</span>: <span class="hljs-string">&#x27;Stable function references&#x27;</span>;
  <span class="hljs-attr">strategicMemo</span>: <span class="hljs-string">&#x27;React.memo at strategic boundaries&#x27;</span>;

  <span class="hljs-comment">// Patterns</span>
  <span class="hljs-attr">useComposition</span>: <span class="hljs-string">&#x27;Compose multiple focused providers&#x27;</span>;
  <span class="hljs-attr">considerAlternatives</span>: <span class="hljs-string">&#x27;Zustand/Jotai for complex state&#x27;</span>;
  <span class="hljs-attr">lazyInitialize</span>: <span class="hljs-string">&#x27;Defer expensive initialization&#x27;</span>;

  <span class="hljs-comment">// Monitoring</span>
  <span class="hljs-attr">trackRenders</span>: <span class="hljs-string">&#x27;Monitor re-render frequency&#x27;</span>;
  <span class="hljs-attr">profilePerformance</span>: <span class="hljs-string">&#x27;Measure context update impact&#x27;</span>;
  <span class="hljs-attr">useDevTools</span>: <span class="hljs-string">&#x27;React DevTools Profiler&#x27;</span>;
}

<span class="hljs-comment">// Example of well-structured contexts</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">WellStructuredApp</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="hljs-comment">// Static/rare updates (Context is perfect)</span>
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">AuthProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">LocaleProvider</span>&gt;</span>
        {/* Medium frequency (Consider alternatives) */}
        <span class="hljs-tag">&lt;<span class="hljs-name">NotificationProvider</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">UIStateProvider</span>&gt;</span>
            {/* High frequency (Don&#x27;t use Context!) */}
            {/* Use local state, Zustand, or refs instead */}
            <span class="hljs-tag">&lt;<span class="hljs-name">AppContent</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">UIStateProvider</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">NotificationProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">LocaleProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">AuthProvider</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span></span>
);
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
