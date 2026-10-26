const s="kinney",a="react-typescript",n="React مع TypeScript",l="context-and-selectors-typing",t="أنواع Context والمحدِّدات",p=[{depth:2,id:"النمط-الأساسي-للسياق-المكتوب-الأنواع",text:"النمط الأساسي للسياق المكتوب الأنواع"},{depth:2,id:"نمط-فصل-الحالة-والإجراءات",text:"نمط فصل الحالة والإجراءات"},{depth:2,id:"نمط-المحدد-أداء-يهم-فعلا",text:"نمط المحدِّد: أداء يهمّ فعلًا"},{depth:2,id:"أنواع-متقدمة-عبر-الاتحادات-المميزة",text:"أنواع متقدّمة عبر الاتحادات المُميَّزة"},{depth:2,id:"حالات-الاستخدام-الواقعية",text:"حالات الاستخدام الواقعية™"},{depth:3,id:"سلة-التسوق-مع-تحسين-الأداء",text:"سلة التسوّق مع تحسين الأداء"},{depth:3,id:"نموذج-متعدد-الخطوات-مع-حالة-التحقق",text:"نموذج متعدّد الخطوات مع حالة التحقّق"},{depth:3,id:"لوحة-تحكم-لحظية",text:"لوحة تحكم لحظية"},{depth:2,id:"مطبات-الأداء-وكيفية-تجنبها",text:"مَطبّات الأداء وكيفية تجنّبها"},{depth:3,id:"تساوي-المراجع-في-المحددات",text:"تساوي المراجع في المحدِّدات"},{depth:3,id:"إعادة-إنشاء-مزود-السياق",text:"إعادة إنشاء مزوّد السياق"},{depth:2,id:"اختبار-سياقاتك-المكتوبة-الأنواع",text:"اختبار سياقاتك المكتوبة الأنواع"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>السياق (context) في React يشبه ذلك الصديق الذي يعرف كل الحاضرين في الحفلة — مفيدٌ جدًا لمشاركة البيانات عبر شجرة مكوّناتك، لكن من دون أنواع دقيقة قد يتحوّل إلى مصدر مفاجآت وقت التشغيل وآلام التنقيح. لنتعرّف كيف نبني سياقات (contexts) مكتوبة الأنواع بالكامل باستخدام TypeScript، لا تكتفي بمنع الأخطاء بل تقدّم أيضًا تجربة تطوير ممتازة عبر أنماط الحالة والإجراءات ومحدِّدات (selectors) محسّنة للأداء.</p>
<p>سنغطّي كل شيء من السياقات المكتوبة الأنواع الأساسية إلى الأنماط المتقدّمة مثل السياقات المعتمدة على المحدِّدات التي تقلّل إعادة التصيير غير الضرورية، إضافة إلى بعض «حالات الاستخدام الواقعية™» التي تبرز فيها هذه الأنماط.</p>
<h2 id="النمط-الأساسي-للسياق-المكتوب-الأنواع">النمط الأساسي للسياق المكتوب الأنواع</h2>
<p>لنبدأ بالأساس — سياق مكتوب الأنواع بشكل صحيح يلتقط الأخطاء وقت التجميع بدلًا من وقت التشغيل. إليك ما يلجأ إليه أغلب المطوّرين أولًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Define your context value type explicitly</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserContextType</span> {
  <span class="hljs-attr">currentUser</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ✅ Create context with undefined as default</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserContext</span> = createContext&lt;<span class="hljs-title class_">UserContextType</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProviderProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProvider</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">UserProviderProps</span></span>) {
  <span class="hljs-comment">// Your state logic here...</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-title class_">UserContextType</span> = {
    currentUser,
    isLoading,
    login,
    logout,
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Custom hook with runtime safety check</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useUser</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">UserContextType</span> {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">UserContext</span>);
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useUser must be used within a UserProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}
</code></pre>
<p>يمنحنا هذا النمط أمان الأنواع وفحوصًا وقت التشغيل، لكن ما زال ثمة مجال للتحسين. المشكلة الرئيسة؟ كل مكوّن يستخدم <code>useUser()</code> سيُعاد تصييره كلما تغيّر <em>أيّ</em> جزء من قيمة السياق، حتى إن كان يهمّه <code>currentUser.name</code> وحدها.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>أنشئ دائمًا خُطّافًا مخصّصًا للسياق بدلًا من تعريض <code>useContext</code> مباشرة. يتيح لك ذلك إضافة فحوص وقت التشغيل وتغليف نمط استخدام السياق.</p>
</blockquote>
<h2 id="نمط-فصل-الحالة-والإجراءات">نمط فصل الحالة والإجراءات</h2>
<p>للحالة الأكثر تعقيدًا، يمكن فصل السياق إلى حالة وإجراءات منفصلتين لتحسين الأداء وقابلية الصيانة معًا. يستعير هذا النمط أفكارًا من Redux لكنه يبقي الأمور أبسط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, useReducer, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Separate state and actions</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoState</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[];
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoActions</span> {
  <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">toggleTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">deleteTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">setFilter</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">filter</span>: <span class="hljs-title class_">TodoState</span>[<span class="hljs-string">&#x27;filter&#x27;</span>]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">loadTodos</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
}

<span class="hljs-comment">// ✅ Create separate contexts</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoStateContext</span> = createContext&lt;<span class="hljs-title class_">TodoState</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoActionsContext</span> = createContext&lt;<span class="hljs-title class_">TodoActions</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-comment">// ✅ Reducer for state management</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TodoAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_FILTER&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">filter</span>: <span class="hljs-title class_">TodoState</span>[<span class="hljs-string">&#x27;filter&#x27;</span>] } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_LOADING&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_TODOS&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[] } };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">todoReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">TodoState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">TodoAction</span></span>): <span class="hljs-title class_">TodoState</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">todos</span>: [
          ...state.<span class="hljs-property">todos</span>,
          {
            <span class="hljs-attr">id</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">id</span>,
            <span class="hljs-attr">text</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">text</span>,
            <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
          },
        ],
      };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>:
      <span class="hljs-keyword">return</span> {
        ...state,
        <span class="hljs-attr">todos</span>: state.<span class="hljs-property">todos</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === action.<span class="hljs-property">payload</span>.<span class="hljs-property">id</span> ? { ...todo, <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> } : todo,
        ),
      };
    <span class="hljs-comment">// ... other cases</span>
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(todoReducer, {
    <span class="hljs-attr">todos</span>: [],
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
    <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-comment">// ✅ Actions that use the dispatch function</span>
  <span class="hljs-keyword">const</span> <span class="hljs-attr">actions</span>: <span class="hljs-title class_">TodoActions</span> = {
    <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>,
        <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(), text },
      });
    },
    <span class="hljs-attr">toggleTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { id } });
    },
    <span class="hljs-attr">deleteTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { id } });
    },
    <span class="hljs-attr">setFilter</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">filter</span>: <span class="hljs-title class_">TodoState</span>[<span class="hljs-string">&#x27;filter&#x27;</span>]</span>) =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_FILTER&#x27;</span>, <span class="hljs-attr">payload</span>: { filter } });
    },
    <span class="hljs-attr">loadTodos</span>: <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_LOADING&#x27;</span>, <span class="hljs-attr">payload</span>: { <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">true</span> } });
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> todos = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchTodos</span>();
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_TODOS&#x27;</span>, <span class="hljs-attr">payload</span>: { todos } });
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_LOADING&#x27;</span>, <span class="hljs-attr">payload</span>: { <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span> } });
      }
    },
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoStateContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{state}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoActionsContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{actions}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">TodoActionsContext.Provider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoStateContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Separate hooks for state and actions</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoState</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">TodoState</span> {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">TodoStateContext</span>);
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useTodoState must be used within a TodoProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoActions</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">TodoActions</span> {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">TodoActionsContext</span>);
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useTodoActions must be used within a TodoProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}
</code></pre>
<p>لهذا النهج عدّة مزايا:</p>
<ul>
<li><strong>الأداء</strong>: المكوّنات التي تُطلق الإجراءات فقط لا تُعاد تصييرها عند تغيّر الحالة</li>
<li><strong>الوضوح</strong>: الفصل يجعل من الواضح ما هي الحالة وما هو السلوك</li>
<li><strong>الاختبار</strong>: يمكنك اختبار الإجراءات بمعزل عن المكوّنات التي تستخدمها</li>
</ul>
<h2 id="نمط-المحدد-أداء-يهم-فعلا">نمط المحدِّد: أداء يهمّ فعلًا</h2>
<p>هنا تصبح الأمور مثيرة. يتيح لك نمط المحدِّد أن تشترك المكوّنات في الشرائح المحدّدة من الحالة التي تعنيها فقط، ما يقلّل بشكل كبير إعادة التصيير غير الضرورية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, useCallback, useSyncExternalStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ State store with subscription capabilities</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">AppStateStore</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">AppState</span>;
  <span class="hljs-keyword">private</span> listeners = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>&gt;();

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">initialState</span>: <span class="hljs-title class_">AppState</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = initialState;
  }

  getState = (): <span class="hljs-function"><span class="hljs-params">AppState</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>;
  };

  setState = (<span class="hljs-attr">newState</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">AppState</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>, ...newState };
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">listener</span>) =&gt;</span> <span class="hljs-title function_">listener</span>());
  };

  subscribe = (<span class="hljs-attr">listener</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-function">(<span class="hljs-params">() =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>.<span class="hljs-title function_">add</span>(listener);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>.<span class="hljs-title function_">delete</span>(listener);
    };
  };
}

<span class="hljs-comment">// ✅ Context that provides the store</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AppStateContext</span> = createContext&lt;<span class="hljs-title class_">AppStateStore</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AppStateProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">AppStateStore</span>({
        <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">todos</span>: [],
        <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span>,
        <span class="hljs-attr">notifications</span>: [],
        <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
      }),
    [],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppStateContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{store}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">AppStateContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Selector hook that prevents unnecessary re-renders</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useAppState&lt;T&gt;(<span class="hljs-attr">selector</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">AppState</span></span>) =&gt;</span> T): T {
  <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">AppStateContext</span>);
  <span class="hljs-keyword">if</span> (!store) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useAppState must be used within AppStateProvider&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useSyncExternalStore</span>(
    store.<span class="hljs-property">subscribe</span>,
    <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">selector</span>(store.<span class="hljs-title function_">getState</span>()), [selector, store]),
  );
}

<span class="hljs-comment">// ✅ Actions hook for state updates</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useAppActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> store = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">AppStateContext</span>);
  <span class="hljs-keyword">if</span> (!store) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useAppActions must be used within AppStateProvider&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">setUser</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> store.<span class="hljs-title function_">setState</span>({ user }),
    <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> currentState = store.<span class="hljs-title function_">getState</span>();
      store.<span class="hljs-title function_">setState</span>({ <span class="hljs-attr">todos</span>: [...currentState.<span class="hljs-property">todos</span>, todo] });
    },
    <span class="hljs-attr">setTheme</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span></span>) =&gt;</span> store.<span class="hljs-title function_">setState</span>({ theme }),
    <span class="hljs-attr">setLoading</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> store.<span class="hljs-title function_">setState</span>({ isLoading }),
  };
}
</code></pre>
<p>الآن تستطيع المكوّنات أن تشترك في ما تحتاجه بالضبط:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ This component only re-renders when the user changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useAppState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">user</span>);
  <span class="hljs-keyword">const</span> { setUser } = <span class="hljs-title function_">useAppActions</span>();

  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoginPrompt</span> /&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setUser(null)}&gt;Logout<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ This component only re-renders when todos change</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoCount</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> todoCount = <span class="hljs-title function_">useAppState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">todos</span>.<span class="hljs-property">length</span>);
  <span class="hljs-keyword">const</span> completedCount = <span class="hljs-title function_">useAppState</span>(
    <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">todos</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span>,
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {completedCount} of {todoCount} completed
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ This component only re-renders when theme changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemeToggle</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">useAppState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">theme</span>);
  <span class="hljs-keyword">const</span> { setTheme } = <span class="hljs-title function_">useAppActions</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setTheme(theme === &#x27;light&#x27; ? &#x27;dark&#x27; : &#x27;light&#x27;)}&gt;
      Current theme: {theme}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>خُطّاف <code>useSyncExternalStore</code> هو الطريقة التي توصي بها React 18 للاشتراك في المخازن الخارجية. فهو يتولّى التفاصيل المعقّدة لضمان عمل محدِّداتك بشكل صحيح مع ميزات React المتزامنة.</p>
</blockquote>
<h2 id="أنواع-متقدمة-عبر-الاتحادات-المميزة">أنواع متقدّمة عبر الاتحادات المُميَّزة</h2>
<p>لمنح أمان أنواع أكبر، يمكنك استخدام الاتحادات المُميَّزة (discriminated unions) لضمان أن تكون حالة سياقك دائمًا في إعداد صالح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Use discriminated unions for complex state</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AuthState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;authenticated&#x27;</span>; <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppContextType</span> {
  <span class="hljs-attr">auth</span>: <span class="hljs-title class_">AuthState</span>;
  <span class="hljs-attr">setAuth</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">auth</span>: <span class="hljs-title class_">AuthState</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ✅ Type-safe state transitions</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useAuth</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { auth, setAuth } = <span class="hljs-title function_">useAppContext</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">login</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">credentials</span>: <span class="hljs-title class_">LoginCredentials</span></span>) =&gt; {
    <span class="hljs-title function_">setAuth</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> });
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> authApi.<span class="hljs-title function_">login</span>(credentials);
      <span class="hljs-title function_">setAuth</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;authenticated&#x27;</span>, user });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setAuth</span>({
        <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
        <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Login failed&#x27;</span>,
      });
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">logout</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setAuth</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> });
  };

  <span class="hljs-keyword">return</span> { auth, login, logout };
}

<span class="hljs-comment">// ✅ Components get full type narrowing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AuthenticatedApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { auth } = <span class="hljs-title function_">useAuth</span>();

  <span class="hljs-keyword">switch</span> (auth.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;idle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoginForm</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSpinner</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;authenticated&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows auth.user exists here!</span>
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{auth.user}</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-comment">// TypeScript knows auth.error exists here!</span>
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{auth.error}</span> /&gt;</span></span>;
  }
}
</code></pre>
<h2 id="حالات-الاستخدام-الواقعية">حالات الاستخدام الواقعية™</h2>
<p>إليك بعض السيناريوهات التي تبرز فيها هذه الأنماط فعلًا:</p>
<h3 id="سلة-التسوق-مع-تحسين-الأداء">سلة التسوّق مع تحسين الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Separate contexts for cart data and UI state</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CartDataContext</span> = createContext&lt;<span class="hljs-title class_">CartState</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CartUIContext</span> = createContext&lt;<span class="hljs-title class_">CartUIActions</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-comment">// Components that show cart count don&#x27;t re-render when UI state changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CartBadge</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> itemCount = <span class="hljs-title function_">useCartData</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">items</span>.<span class="hljs-property">length</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Badge</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{itemCount}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// Cart drawer only re-renders when UI state changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CartDrawer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> isOpen = <span class="hljs-title function_">useCartUI</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">isDrawerOpen</span>);
  <span class="hljs-keyword">const</span> { closeDrawer } = <span class="hljs-title function_">useCartActions</span>();

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Drawer</span> <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{isOpen}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{closeDrawer}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="نموذج-متعدد-الخطوات-مع-حالة-التحقق">نموذج متعدّد الخطوات مع حالة التحقّق</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FormState</span> = {
  <span class="hljs-attr">currentStep</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">formData</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">RegistrationData</span>&gt;;
  <span class="hljs-attr">validation</span>: <span class="hljs-title class_">ValidationErrors</span>;
  <span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// Each step component only subscribes to its relevant data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PersonalInfoStep</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> personalInfo = <span class="hljs-title function_">useFormState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">formData</span>.<span class="hljs-property">personalInfo</span>);
  <span class="hljs-keyword">const</span> errors = <span class="hljs-title function_">useFormState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">validation</span>.<span class="hljs-property">personalInfo</span>);

  <span class="hljs-comment">// Component only re-renders when personal info or its validation changes</span>
}
</code></pre>
<h3 id="لوحة-تحكم-لحظية">لوحة تحكم لحظية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Dashboard components can subscribe to specific metrics</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MetricCard</span>(<span class="hljs-params">{ metric }: { metric: keyof DashboardMetrics }</span>) {
  <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useDashboardState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">metrics</span>[metric]);
  <span class="hljs-keyword">const</span> isLoading = <span class="hljs-title function_">useDashboardState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">loading</span>[metric]);

  <span class="hljs-comment">// Only re-renders when this specific metric changes</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> <span class="hljs-attr">loading</span>=<span class="hljs-string">{isLoading}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="مطبات-الأداء-وكيفية-تجنبها">مَطبّات الأداء وكيفية تجنّبها</h2>
<p>عند تنفيذ هذه الأنماط، انتبه لهذه الأخطاء الشائعة:</p>
<h3 id="تساوي-المراجع-في-المحددات">تساوي المراجع في المحدِّدات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This creates a new array on every selector call</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> activeTodos = <span class="hljs-title function_">useAppState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">todos</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> !todo.<span class="hljs-property">completed</span>));
  <span class="hljs-comment">// This will cause re-renders even when the actual active todos haven&#x27;t changed</span>
}

<span class="hljs-comment">// ✅ Use useMemo for expensive computations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> todos = <span class="hljs-title function_">useAppState</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">todos</span>);
  <span class="hljs-keyword">const</span> activeTodos = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> !todo.<span class="hljs-property">completed</span>), [todos]);
}

<span class="hljs-comment">// ✅ Or move the memoization into a custom selector</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useActiveTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useAppState</span>(<span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.<span class="hljs-property">todos</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> !todo.<span class="hljs-property">completed</span>), []));
}
</code></pre>
<h3 id="إعادة-إنشاء-مزود-السياق">إعادة إنشاء مزوّد السياق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This creates a new context value object on every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppProvider</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-keyword">const</span> [state, setState] = <span class="hljs-title function_">useState</span>(initialState);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">state</span>, <span class="hljs-attr">setState</span> }}&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">AppContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Memoize the context value</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppProvider</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-keyword">const</span> [state, setState] = <span class="hljs-title function_">useState</span>(initialState);

  <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({ state, setState }), [state]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">AppContext.Provider</span>&gt;</span></span>;
}
</code></pre>
<h2 id="اختبار-سياقاتك-المكتوبة-الأنواع">اختبار سياقاتك المكتوبة الأنواع</h2>
<p>يصبح اختبار السياقات أسهل بكثير مع أنماط TypeScript الصحيحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TodoProvider</span>, useTodoState, useTodoActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./TodoContext&#x27;</span>;

<span class="hljs-comment">// ✅ Create test wrapper</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TestComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { todos, isLoading } = <span class="hljs-title function_">useTodoState</span>();
  <span class="hljs-keyword">const</span> { addTodo } = <span class="hljs-title function_">useTodoActions</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-testid</span>=<span class="hljs-string">&quot;todo-count&quot;</span>&gt;</span>{todos.length}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-testid</span>=<span class="hljs-string">&quot;loading&quot;</span>&gt;</span>{isLoading.toString()}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> addTodo(&#x27;New todo&#x27;)}&gt;Add Todo<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds todo correctly&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">render</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>,
  );

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;todo-count&#x27;</span>)).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;0&#x27;</span>);

  fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Add Todo&#x27;</span>));

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;todo-count&#x27;</span>)).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;1&#x27;</span>);
});

<span class="hljs-comment">// ✅ Test context hooks in isolation</span>
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;useTodoActions provides expected methods&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">TestWrapper</span> = (<span class="hljs-params">{ children }: { children: ReactNode }</span>) =&gt; (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>
  );

  <span class="hljs-keyword">const</span> { result } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">useTodoActions</span>(), {
    <span class="hljs-attr">wrapper</span>: <span class="hljs-title class_">TestWrapper</span>,
  });

  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">addTodo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">toggleTodo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">deleteTodo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
});
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تمنحك السياقات المكتوبة الأنواع مع أنماط المحدِّدات أفضل ما في العالمين: بساطة React Context مع سمات الأداء لحلول إدارة الحالة الأكثر تقدّمًا. وهذه هي الرؤى الأساسية:</p>
<ul>
<li><strong>افصل الحالة عن الإجراءات</strong> لتحسين الأداء وقابلية الصيانة</li>
<li><strong>استخدم المحدِّدات</strong> لتقليل إعادة التصيير والاشتراك في البيانات المطلوبة فقط</li>
<li><strong>استثمر الاتحادات المُميَّزة</strong> لضمان انتقالات الحالة الآمنة من حيث الأنواع</li>
<li><strong>أنشئ خُطّافات مخصّصة</strong> تغلف استخدام السياق وتوفّر أمانًا وقت التشغيل</li>
<li><strong>اختبر السياقات بانتظام</strong> لضمان ثبات عقود الأنواع لديك وقت التشغيل</li>
</ul>
<p>قد تبدو هذه الأنماط مبالغة في الحالات البسيطة (ومن المرجّح أنها كذلك — استخدم <code>useState</code> لحالة المكوّن المحلية!)، لكن حين تدير حالة تطبيق معقّدة تحتاج إلى المشاركة بين مكوّنات كثيرة، ستوفّر عليك آلام الأداء وجلسات التنقيح المتأخرة في الليل.</p>
<p>الأنماط التي غطّيناها هنا تتوسّع جيدًا من التطبيقات متوسطة الحجم إلى المستودعات المؤسسية الكبيرة، وهي تعمل بسلاسة مع بقية أدوات منظومة React. وسيشكرك نسختك المستقبلية من نفسك (وزملاؤك) على أمان التجميع وأداء وقت التشغيل الذي توفّره هذه المقاربات.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
