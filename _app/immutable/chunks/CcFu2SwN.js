const s="kinney",a="react-typescript",n="React مع TypeScript",l="safer-createcontext-helpers",t="مساعدات createContext أكثر أمانًا",p=[{depth:2,id:"المشكلة-مع-createcontext-الافتراضي",text:"المشكلة مع createContext الافتراضي"},{depth:2,id:"مساعد-createcontext-أكثر-أمانا",text:"مساعد createContext أكثر أمانًا"},{depth:2,id:"متقدم-سياق-بنمط-الإجراءات",text:"متقدّم: سياق بنمط الإجراءات"},{depth:2,id:"التحقق-وقت-التشغيل-باستخدام-zod",text:"التحقّق وقت التشغيل باستخدام Zod"},{depth:2,id:"حالات-الاستخدام-الواقعية",text:"حالات الاستخدام الواقعية™"},{depth:3,id:"سياق-السمة-مع-كشف-تفضيل-النظام",text:"سياق السمة مع كشف تفضيل النظام"},{depth:3,id:"سلة-التسوق-مع-تحديثات-متفائلة",text:"سلة التسوّق مع تحديثات متفائلة"},{depth:2,id:"اختبار-سياقاتك-الآمنة",text:"اختبار سياقاتك الآمنة"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"التخزين-المؤقت-لقيمة-المزود",text:"التخزين المؤقت لقيمة المزوّد"},{depth:3,id:"ثبات-دوال-الاستدعاء",text:"ثبات دوال الاستدعاء"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>React Context قوي، لكن واجهة <code>createContext</code> الافتراضية تترك لك حقيقة غير مريحة: قد تكون قيمة السياق <code>undefined</code> إن نسي أحدهم تغليف شجرة مكوّناته بمزوّد (Provider). وهذا يقود إلى برمجة دفاعية، وفحوص وقت التشغيل، وجلسات تنقيح متأخرة حين تكتشف أخيرًا سبب رمي تطبيقك للأخطاء في الإنتاج.</p>
<p>لنبنِ بعض الدوال المساعدة التي تمنحك سياقًا متينًا مع TypeScript — حيث تضمن الأنواع أن سياقك متاح دائمًا، ولا تحتاج أبدًا إلى كتابة رسالة خطأ «يجب استخدام السياق داخل المزوّد» مرة أخرى.</p>
<h2 id="المشكلة-مع-createcontext-الافتراضي">المشكلة مع createContext الافتراضي</h2>
<p>إليك ما يلجأ إليه أغلب المطوّرين عند إنشاء سياق مكتوب الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserContextType</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ❌ The context value could be undefined</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserContext</span> = createContext&lt;<span class="hljs-title class_">UserContextType</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-comment">// ... your state logic here</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-title class_">UserContextType</span> = {
    <span class="hljs-attr">user</span>: currentUser,
    login,
    logout,
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useUser</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">UserContext</span>);
  <span class="hljs-comment">// ❌ You have to remember this check everywhere</span>
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useUser must be used within a UserProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}
</code></pre>
<p>هذا النمط يعمل، لكنه هشّ. كل خُطّاف مخصّص يحتاج إلى ذلك الفحص وقت التشغيل، ولا يستطيع TypeScript مساعدتك على التقاط المزوّدات المفقودة وقت التجميع، وأنت دائمًا على بُعد مزوّد واحد منسي من خطأ وقت التشغيل.</p>
<h2 id="مساعد-createcontext-أكثر-أمانا">مساعد createContext أكثر أمانًا</h2>
<p>لنبنِ مساعدًا يزيل هذه المشكلات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, <span class="hljs-title class_">Context</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">/**
 * Creates a context that never returns undefined and provides a typed hook
 * <span class="hljs-doctag">@param</span> <span class="hljs-variable">displayName</span> - Name for debugging and error messages
 * <span class="hljs-doctag">@returns</span> Tuple of [hook, Provider component, raw context]
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> createSafeContext&lt;T&gt;(<span class="hljs-attr">displayName</span>: <span class="hljs-built_in">string</span>) {
  <span class="hljs-comment">// ✅ No undefined in the type - we&#x27;re confident about this</span>
  <span class="hljs-keyword">const</span> context = createContext&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;production&#x27;</span>) {
    context.<span class="hljs-property">displayName</span> = displayName;
  }

  <span class="hljs-comment">// ✅ Custom hook that guarantees a value</span>
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">useContextHook</span>(<span class="hljs-params"></span>): T {
    <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useContext</span>(context);

    <span class="hljs-keyword">if</span> (contextValue === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(
        <span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span> must be used within a <span class="hljs-subst">\${displayName}</span>Provider. \`</span> +
          <span class="hljs-string">\`Make sure your component is wrapped with &lt;<span class="hljs-subst">\${displayName}</span>Provider&gt;.\`</span>,
      );
    }

    <span class="hljs-keyword">return</span> contextValue;
  }

  <span class="hljs-comment">// ✅ Provider component that prevents null values</span>
  <span class="hljs-keyword">function</span> <span class="hljs-title function_">ContextProvider</span>(<span class="hljs-params">{ children, value }: { children: ReactNode; value: T }</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">context.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">context.Provider</span>&gt;</span></span>;
  }

  <span class="hljs-comment">// Set display names for better debugging</span>
  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;production&#x27;</span>) {
    useContextHook.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span>\`</span>;
    <span class="hljs-title class_">ContextProvider</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`<span class="hljs-subst">\${displayName}</span>Provider\`</span>;
  }

  <span class="hljs-keyword">return</span> [useContextHook, <span class="hljs-title class_">ContextProvider</span>, context] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}
</code></pre>
<p>الآن يصبح إنشاء سياقك نظيفًا وآمنًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserContextType</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ✅ Returns exactly what you need: hook, Provider, and raw context</span>
<span class="hljs-keyword">const</span> [useUser, <span class="hljs-title class_">UserProvider</span>] = createSafeContext&lt;<span class="hljs-title class_">UserContextType</span>&gt;(<span class="hljs-string">&#x27;User&#x27;</span>);

<span class="hljs-comment">// ✅ Your component logic stays focused on business logic</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserManager</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [currentUser, setCurrentUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">login</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> authApi.<span class="hljs-title function_">login</span>(email, password);
    <span class="hljs-title function_">setCurrentUser</span>(user);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">logout</span> = (<span class="hljs-params"></span>) =&gt; {
    authApi.<span class="hljs-title function_">logout</span>();
    <span class="hljs-title function_">setCurrentUser</span>(<span class="hljs-literal">null</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-title class_">UserContextType</span> = {
    <span class="hljs-attr">user</span>: currentUser,
    login,
    logout,
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProvider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserProvider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Components can use the hook without fear</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { user, logout } = <span class="hljs-title function_">useUser</span>(); <span class="hljs-comment">// Never undefined!</span>

  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoginPrompt</span> /&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{logout}</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متقدم-سياق-بنمط-الإجراءات">متقدّم: سياق بنمط الإجراءات</h2>
<p>للحالة الأكثر تعقيدًا، قد ترغب في سياقات منفصلة للحالة والإجراءات (وهذا يمنع إعادة التصيير غير الضرورية حين تحتاج المكوّنات إلى إطلاق الإجراءات فقط):</p>
<pre><code class="language-typescript"><span class="hljs-comment">/**
 * Creates separate state and actions contexts for performance optimization
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> createStateActionContext&lt;<span class="hljs-title class_">State</span>, <span class="hljs-title class_">Actions</span>&gt;(<span class="hljs-attr">displayName</span>: <span class="hljs-built_in">string</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">StateContext</span> = createContext&lt;<span class="hljs-title class_">State</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">ActionsContext</span> = createContext&lt;<span class="hljs-title class_">Actions</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;production&#x27;</span>) {
    <span class="hljs-title class_">StateContext</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`<span class="hljs-subst">\${displayName}</span>State\`</span>;
    <span class="hljs-title class_">ActionsContext</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`<span class="hljs-subst">\${displayName}</span>Actions\`</span>;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">useStateHook</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">State</span> {
    <span class="hljs-keyword">const</span> state = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">StateContext</span>);
    <span class="hljs-keyword">if</span> (state === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span>State must be used within a <span class="hljs-subst">\${displayName}</span>Provider\`</span>);
    }
    <span class="hljs-keyword">return</span> state;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">useActionsHook</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Actions</span> {
    <span class="hljs-keyword">const</span> actions = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">ActionsContext</span>);
    <span class="hljs-keyword">if</span> (actions === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span>Actions must be used within a <span class="hljs-subst">\${displayName}</span>Provider\`</span>);
    }
    <span class="hljs-keyword">return</span> actions;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">Provider</span>(<span class="hljs-params">{
    children,
    state,
    actions,
  }: {
    children: ReactNode;
    state: State;
    actions: Actions;
  }</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StateContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{state}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ActionsContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{actions}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ActionsContext.Provider</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">StateContext.Provider</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;production&#x27;</span>) {
    useStateHook.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span>State\`</span>;
    useActionsHook.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span>Actions\`</span>;
    <span class="hljs-title class_">Provider</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">\`<span class="hljs-subst">\${displayName}</span>Provider\`</span>;
  }

  <span class="hljs-keyword">return</span> [useStateHook, useActionsHook, <span class="hljs-title class_">Provider</span>] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}
</code></pre>
<p>إليك كيف تستخدمه مع قائمة مهام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoState</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[];
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
}

## <span class="hljs-title class_">Example</span>: <span class="hljs-title class_">Non</span>‑<span class="hljs-title class_">Nullable</span> <span class="hljs-title class_">ThemeContext</span>

A concrete example <span class="hljs-keyword">with</span> a <span class="hljs-string">\`ThemeContext\`</span> that can’t be used outside its provider.

<span class="hljs-string">\`\`</span><span class="hljs-string">\`tsx
type Theme = &#x27;light&#x27; | &#x27;dark&#x27;;

interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) =&gt; void;
}

const [useTheme, ThemeProvider] = createSafeContext&lt;ThemeContextValue&gt;(&#x27;Theme&#x27;);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState&lt;Theme&gt;(&#x27;light&#x27;);
  const value = useMemo(() =&gt; ({ theme, setTheme }), [theme]);
  return &lt;ThemeProvider value={value}&gt;{children}&lt;/ThemeProvider&gt;;
}

// ❌ If you forget to wrap with &lt;AppThemeProvider&gt;, useTheme() will throw
export function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // Never undefined
  return (
    &lt;button onClick={() =&gt; setTheme(theme === &#x27;light&#x27; ? &#x27;dark&#x27; : &#x27;light&#x27;)}&gt;
      Theme: {theme}
    &lt;/button&gt;
  );
}
</span></code></pre>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoActions</span> {
  <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">toggleTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">deleteTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">setFilter</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">filter</span>: <span class="hljs-title class_">TodoState</span>[<span class="hljs-string">&#x27;filter&#x27;</span>]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> [useTodoState, useTodoActions, <span class="hljs-title class_">TodoProvider</span>] = createStateActionContext&lt;
  <span class="hljs-title class_">TodoState</span>,
  <span class="hljs-title class_">TodoActions</span>
&gt;(<span class="hljs-string">&#x27;Todo&#x27;</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoManager</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(todoReducer, {
    <span class="hljs-attr">todos</span>: [],
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
    <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">const</span> <span class="hljs-attr">actions</span>: <span class="hljs-title class_">TodoActions</span> = {
    <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { text } }),
    <span class="hljs-attr">toggleTodo</span>: <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { id } }),
    <span class="hljs-attr">deleteTodo</span>: <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { id } }),
    <span class="hljs-attr">setFilter</span>: <span class="hljs-function">(<span class="hljs-params">filter</span>) =&gt;</span> <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_FILTER&#x27;</span>, <span class="hljs-attr">payload</span>: { filter } }),
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span> <span class="hljs-attr">state</span>=<span class="hljs-string">{state}</span> <span class="hljs-attr">actions</span>=<span class="hljs-string">{actions}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Components only re-render when their specific slice changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoFilters</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { filter } = <span class="hljs-title function_">useTodoState</span>(); <span class="hljs-comment">// Only re-renders when filter changes</span>
  <span class="hljs-keyword">const</span> { setFilter } = <span class="hljs-title function_">useTodoActions</span>(); <span class="hljs-comment">// Never re-renders</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {([&#x27;all&#x27;, &#x27;active&#x27;, &#x27;completed&#x27;] as const).map((filterOption) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{filterOption}</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(filterOption)}
          className={filter === filterOption ? &#x27;active&#x27; : &#x27;&#x27;}
        &gt;
          {filterOption}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التحقق-وقت-التشغيل-باستخدام-zod">التحقّق وقت التشغيل باستخدام Zod</h2>
<p>لمزيد من الأمان، يمكنك الجمع بين هذا النمط والتحقّق وقت التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserContextSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">user</span>: z
    .<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
      <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
      <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
    })
    .<span class="hljs-title function_">nullable</span>(),
  <span class="hljs-attr">login</span>: z.<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>),
  <span class="hljs-attr">logout</span>: z.<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>),
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserContextType</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserContextSchema</span>&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> createValidatedContext&lt;T&gt;(<span class="hljs-attr">displayName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> context = createContext&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">useContextHook</span>(<span class="hljs-params"></span>): T {
    <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useContext</span>(context);

    <span class="hljs-keyword">if</span> (contextValue === <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`use<span class="hljs-subst">\${displayName}</span> must be used within a <span class="hljs-subst">\${displayName}</span>Provider\`</span>);
    }

    <span class="hljs-comment">// ✅ Runtime validation ensures the context value matches your schema</span>
    <span class="hljs-keyword">const</span> validationResult = schema.<span class="hljs-title function_">safeParse</span>(contextValue);

    <span class="hljs-keyword">if</span> (!validationResult.<span class="hljs-property">success</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`<span class="hljs-subst">\${displayName}</span> context validation failed:\`</span>, validationResult.<span class="hljs-property">error</span>);
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`<span class="hljs-subst">\${displayName}</span> context value is invalid. Check the console for details.\`</span>);
    }

    <span class="hljs-keyword">return</span> validationResult.<span class="hljs-property">data</span>;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">ContextProvider</span>(<span class="hljs-params">{ children, value }: { children: ReactNode; value: T }</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">context.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">context.Provider</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> [useContextHook, <span class="hljs-title class_">ContextProvider</span>, context] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}

<span class="hljs-comment">// Usage with validation</span>
<span class="hljs-keyword">const</span> [useValidatedUser, <span class="hljs-title class_">ValidatedUserProvider</span>] = <span class="hljs-title function_">createValidatedContext</span>(<span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-title class_">UserContextSchema</span>);
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>التحقّق وقت التشغيل يضيف عبئًا، لذا استخدمه بحكمة. فهو ممتاز أثناء التطوير وللسياقات التي تستقبل بيانات من مصادر خارجية، لكن قد ترغب في تعطيله في بناءات الإنتاج.</p>
</blockquote>
<h2 id="حالات-الاستخدام-الواقعية">حالات الاستخدام الواقعية™</h2>
<h3 id="سياق-السمة-مع-كشف-تفضيل-النظام">سياق السمة مع كشف تفضيل النظام</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ThemeContextType</span> {
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span> | <span class="hljs-string">&#x27;system&#x27;</span>;
  <span class="hljs-attr">resolvedTheme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  <span class="hljs-attr">setTheme</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span> | <span class="hljs-string">&#x27;system&#x27;</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> [useTheme, <span class="hljs-title class_">ThemeProvider</span>] = createSafeContext&lt;<span class="hljs-title class_">ThemeContextType</span>&gt;(<span class="hljs-string">&#x27;Theme&#x27;</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemeManager</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [theme, setTheme] = useState&lt;<span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span> | <span class="hljs-string">&#x27;system&#x27;</span>&gt;(<span class="hljs-string">&#x27;system&#x27;</span>);
  <span class="hljs-keyword">const</span> [systemTheme, setSystemTheme] = useState&lt;<span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> mediaQuery = <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">matchMedia</span>(<span class="hljs-string">&#x27;(prefers-color-scheme: dark)&#x27;</span>);
    <span class="hljs-title function_">setSystemTheme</span>(mediaQuery.<span class="hljs-property">matches</span> ? <span class="hljs-string">&#x27;dark&#x27;</span> : <span class="hljs-string">&#x27;light&#x27;</span>);

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">MediaQueryListEvent</span></span>) =&gt; {
      <span class="hljs-title function_">setSystemTheme</span>(e.<span class="hljs-property">matches</span> ? <span class="hljs-string">&#x27;dark&#x27;</span> : <span class="hljs-string">&#x27;light&#x27;</span>);
    };

    mediaQuery.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, handleChange);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> mediaQuery.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, handleChange);
  }, []);

  <span class="hljs-keyword">const</span> resolvedTheme = theme === <span class="hljs-string">&#x27;system&#x27;</span> ? systemTheme : theme;

  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-title class_">ThemeContextType</span> = {
    theme,
    resolvedTheme,
    setTheme,
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span></span>;
}

<span class="hljs-comment">// Components can safely assume theme context exists</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemeToggle</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { theme, setTheme } = <span class="hljs-title function_">useTheme</span>(); <span class="hljs-comment">// Never undefined!</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setTheme(theme === &#x27;light&#x27; ? &#x27;dark&#x27; : &#x27;light&#x27;)}&gt;Toggle Theme<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="سلة-التسوق-مع-تحديثات-متفائلة">سلة التسوّق مع تحديثات متفائلة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CartItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">quantity</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CartState</span> {
  <span class="hljs-attr">items</span>: <span class="hljs-title class_">CartItem</span>[];
  <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isUpdating</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CartActions</span> {
  <span class="hljs-attr">addItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">CartItem</span>, <span class="hljs-string">&#x27;quantity&#x27;</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">removeItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">updateQuantity</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">quantity</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">clearCart</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> [useCartState, useCartActions, <span class="hljs-title class_">CartProvider</span>] = createStateActionContext&lt;
  <span class="hljs-title class_">CartState</span>,
  <span class="hljs-title class_">CartActions</span>
&gt;(<span class="hljs-string">&#x27;Cart&#x27;</span>);

<span class="hljs-comment">// Usage in components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CartBadge</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { items } = <span class="hljs-title function_">useCartState</span>(); <span class="hljs-comment">// Only re-renders when items change</span>
  <span class="hljs-keyword">const</span> itemCount = items.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">quantity</span>, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Badge</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{itemCount}</span> /&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AddToCartButton</span>(<span class="hljs-params">{ product }: { product: Product }</span>) {
  <span class="hljs-keyword">const</span> { addItem } = <span class="hljs-title function_">useCartActions</span>(); <span class="hljs-comment">// Never re-renders</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> addItem(product)}&gt;Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h2 id="اختبار-سياقاتك-الآمنة">اختبار سياقاتك الآمنة</h2>
<p>يصبح الاختبار أنظف بكثير حين لا تتعامل مع قيم سياق غير معرّفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen, fireEvent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserProvider</span>, useUser } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./UserContext&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TestComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { user, logout } = <span class="hljs-title function_">useUser</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-testid</span>=<span class="hljs-string">&quot;user-name&quot;</span>&gt;</span>{user?.name || &#x27;No user&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{logout}</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;provides user context correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> mockUser = { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span> };
  <span class="hljs-keyword">const</span> mockLogout = jest.<span class="hljs-title function_">fn</span>();

  <span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProvider</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">user:</span> <span class="hljs-attr">mockUser</span>,
        <span class="hljs-attr">login:</span> <span class="hljs-attr">jest.fn</span>(),
        <span class="hljs-attr">logout:</span> <span class="hljs-attr">mockLogout</span>,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">UserProvider</span>&gt;</span></span>,
  );

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;user-name&#x27;</span>)).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>);

  fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Logout&#x27;</span>));
  <span class="hljs-title function_">expect</span>(mockLogout).<span class="hljs-title function_">toHaveBeenCalledTimes</span>(<span class="hljs-number">1</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;throws helpful error when used outside provider&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Use error boundary to catch the error</span>
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> /&gt;</span></span>);
  }).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;useUser must be used within a UserProvider&#x27;</span>);
});
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>تضيف هذه الدوال المساعدة عبئًا ضئيلًا، لكن إليك بعض النصائح للحصول على أفضل أداء:</p>
<h3 id="التخزين-المؤقت-لقيمة-المزود">التخزين المؤقت لقيمة المزوّد</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedUserProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [currentUser, setCurrentUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Memoize the context value to prevent unnecessary re-renders</span>
  <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">user</span>: currentUser,
      <span class="hljs-attr">login</span>: <span class="hljs-title function_">async</span> (<span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>) =&gt; {
        <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> authApi.<span class="hljs-title function_">login</span>(email, password);
        <span class="hljs-title function_">setCurrentUser</span>(user);
      },
      <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> {
        authApi.<span class="hljs-title function_">logout</span>();
        <span class="hljs-title function_">setCurrentUser</span>(<span class="hljs-literal">null</span>);
      },
    }),
    [currentUser],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProvider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserProvider</span>&gt;</span></span>;
}
</code></pre>
<h3 id="ثبات-دوال-الاستدعاء">ثبات دوال الاستدعاء</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">StableCallbackProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Stable callbacks don&#x27;t cause unnecessary re-renders</span>
  <span class="hljs-keyword">const</span> login = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>) =&gt; {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> authApi.<span class="hljs-title function_">login</span>(email, password);
    <span class="hljs-title function_">setUser</span>(user);
  }, []);

  <span class="hljs-keyword">const</span> logout = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    authApi.<span class="hljs-title function_">logout</span>();
    <span class="hljs-title function_">setUser</span>(<span class="hljs-literal">null</span>);
  }, []);

  <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({ user, login, logout }), [user, login, logout]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProvider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserProvider</span>&gt;</span></span>;
}
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تساعد مساعدات السياق الآمنة على إزالة فئة كاملة من أخطاء React، مع توفير تجربة تطوير أفضل. وهذه هي الفوائد الأساسية:</p>
<ul>
<li><strong>أمان الأنواع</strong>: قيم السياق لا تكون <code>undefined</code> أبدًا — وTypeScript يعرف ذلك</li>
<li><strong>رسائل خطأ أفضل</strong>: رسائل خطأ واضحة وقابلة للتنفيذ عند غياب المزوّدات</li>
<li><strong>الأداء</strong>: فصل سياقات الحالة والإجراءات يمنع إعادة التصيير غير الضرورية</li>
<li><strong>تجربة المطوّر</strong>: شيفرة أقل، وتركيز أكبر على منطقك الفعلي</li>
<li><strong>أمان وقت التشغيل</strong>: تحقّق اختياري يضمن ثبات عقود السياق لديك</li>
</ul>
<p>تتقدّم هذه الأنماط من مبدّل سمات بسيط إلى إدارة حالة تطبيق معقّدة. وهي تعمل بشكل ممتاز خاصة في أنظمة التصميم ومكتبات المكوّنات حيث تريد تقديم واجهات برمجية خالية من الأخطاء للمطوّرين الآخرين.</p>
<p>الاستثمار في إنشاء هذه المساعدات يدفع أرباحه مع نمو تطبيقك — ستقضي وقتًا أقل في تنقيح المشكلات المتعلقة بالسياق ووقتًا أطول في بناء المزايا التي تهمّ مستخدميك.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
