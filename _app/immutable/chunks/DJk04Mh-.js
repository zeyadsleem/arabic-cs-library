const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-react-hooks",t="خُطّافات React مع TypeScript",p=[{depth:2,id:"usestate-ضبط-الأنواع-على-نحو-صحيح",text:"useState: ضبط الأنواع على نحو صحيح"},{depth:3,id:"الأنماط-الأساسية-لـ-usestate",text:"الأنماط الأساسية لـ useState"},{depth:3,id:"أنماط-الحالة-المعقدة",text:"أنماط الحالة المعقّدة"},{depth:3,id:"أنماط-تهيئة-الحالة",text:"أنماط تهيئة الحالة"},{depth:2,id:"usereducer-إدارة-حالة-آمنة-الأنواع",text:"useReducer: إدارة حالة آمنة الأنواع"},{depth:3,id:"النمط-الأساسي-لـ-usereducer",text:"النمط الأساسي لـ useReducer"},{depth:3,id:"أنماط-usereducer-المتقدمة",text:"أنماط useReducer المتقدّمة"},{depth:2,id:"useref-أبعد-من-مراجع-dom",text:"useRef: أبعد من مراجع DOM"},{depth:3,id:"مراجع-عناصر-dom",text:"مراجع عناصر DOM"},{depth:3,id:"القيم-القابلة-للتغيير-مع-useref",text:"القيم القابلة للتغيير مع useRef"},{depth:2,id:"usecallback-و-usememo-تحديد-أنواع-محسن",text:"useCallback و useMemo: تحديد أنواع محسَّن"},{depth:3,id:"أنماط-usecallback",text:"أنماط useCallback"},{depth:3,id:"أنماط-usememo",text:"أنماط useMemo"},{depth:2,id:"أنماط-الخطافات-المخصصة",text:"أنماط الخُطّافات المخصّصة"},{depth:3,id:"خطاف-مخصص-أساسي",text:"خُطّاف مخصّص أساسي"},{depth:3,id:"خطافات-مخصصة-عامة",text:"خُطّافات مخصّصة عامة"},{depth:3,id:"أنماط-الخطافات-المخصصة-المتقدمة",text:"أنماط الخُطّافات المخصّصة المتقدّمة"},{depth:2,id:"useimperativehandle-كشف-واجهات-المكونات",text:"useImperativeHandle: كشف واجهات المكوّنات"},{depth:2,id:"usecontext-مع-typescript",text:"useContext مع TypeScript"},{depth:2,id:"أنماط-تركيب-الخطافات",text:"أنماط تركيب الخُطّافات"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"ما-ينبغي-فعله",text:"ما ينبغي فعله ✅"},{depth:3,id:"ما-ينبغي-تجنبه",text:"ما ينبغي تجنّبه ❌"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>تمكّن خُطّافات React مع TypeScript معًا من أنماط قويّة للغاية، لكنّها تأتي أيضًا مع تحدّيات فريدة في تحديد الأنواع. يغطّي هذا الدليل كل شيء من تحديد أنواع الخُطّافات الأساسيّة إلى أنماط الخُطّافات المخصّصة المتقدّمة التي ستستخدمها في تطبيقات الإنتاج.</p>
<h2 id="usestate-ضبط-الأنواع-على-نحو-صحيح">useState: ضبط الأنواع على نحو صحيح</h2>
<p>أكثر الخُطّافات شيوعًا يحتاج إلى تحديد دقيق للأنواع من أجل الحالات المعقّدة.</p>
<h3 id="الأنماط-الأساسية-لـ-usestate">الأنماط الأساسية لـ useState</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Component</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// TypeScript infers from initial value</span>
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// number</span>
  <span class="hljs-keyword">const</span> [text, setText] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>); <span class="hljs-comment">// string</span>
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// boolean</span>

  <span class="hljs-comment">// Explicit typing for complex types</span>
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Array state</span>
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-comment">// Object state with specific shape</span>
  <span class="hljs-keyword">const</span> [form, setForm] = useState&lt;{
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">age</span>?: <span class="hljs-built_in">number</span>;
  }&gt;({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  });

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h3 id="أنماط-الحالة-المعقدة">أنماط الحالة المعقّدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Union types for state</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoadingState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-keyword">function</span> useFetch&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">LoadingState</span>&lt;T&gt;&gt;({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetch</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> });
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">fetch</span>(url);
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, data });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-attr">error</span>: error <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span> });
    }
  };

  <span class="hljs-keyword">return</span> { state, fetch };
}

<span class="hljs-comment">// Functional updates with proper typing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// TypeScript infers prevCount as number</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">prevCount</span>) =&gt;</span> prevCount + <span class="hljs-number">1</span>);

  <span class="hljs-comment">// Complex functional update</span>
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateItem</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Item</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prevItems</span>) =&gt;</span>
      prevItems.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> (item.<span class="hljs-property">id</span> === id ? { ...item, ...updates } : item)),
    );
  };

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h3 id="أنماط-تهيئة-الحالة">أنماط تهيئة الحالة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Lazy initial state for expensive computations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ✅ Function is only called once</span>
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">ComplexData</span>&gt;(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">computeExpensiveInitialData</span>();
  });

  <span class="hljs-comment">// ❌ Computed on every render (bad!)</span>
  <span class="hljs-keyword">const</span> [badData, setBadData] = useState&lt;<span class="hljs-title class_">ComplexData</span>&gt;(<span class="hljs-title function_">computeExpensiveInitialData</span>());

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">// Generic initial state helper</span>
<span class="hljs-keyword">function</span> useStateWithStorage&lt;T&gt;(
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">initialValue</span>: T,
): [T, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt;</span> <span class="hljs-built_in">void</span>] {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;T&gt;(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> stored = <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(key);
    <span class="hljs-keyword">return</span> stored ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(stored) : initialValue;
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">setStateAndStore</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: T | ((prev: T) =&gt; T)</span>) =&gt; {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> nextState = <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;function&#x27;</span> ? (value <span class="hljs-title function_">as</span> (<span class="hljs-attr">prev</span>: T) =&gt; T)(prev) : value;
      <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(key, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(nextState));
      <span class="hljs-keyword">return</span> nextState;
    });
  };

  <span class="hljs-keyword">return</span> [state, setStateAndStore];
}
</code></pre>
<h2 id="usereducer-إدارة-حالة-آمنة-الأنواع">useReducer: إدارة حالة آمنة الأنواع</h2>
<p>لمعالجة منطق الحالة المعقّد، يوفّر useReducer مع TypeScript أمانًا ممتازًا في الأنواع.</p>
<h3 id="النمط-الأساسي-لـ-usereducer">النمط الأساسي لـ useReducer</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Define state shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CounterState</span> {
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">step</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Define action types with discriminated unions</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CounterAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;increment&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;decrement&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;incrementBy&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;reset&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;setStep&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-comment">// Reducer with exhaustive checking</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">counterReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">CounterState</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">CounterAction</span></span>): <span class="hljs-title class_">CounterState</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;increment&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> + state.<span class="hljs-property">step</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;decrement&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> - state.<span class="hljs-property">step</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;incrementBy&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> + action.<span class="hljs-property">payload</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;reset&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: <span class="hljs-number">0</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;setStep&#x27;</span>:
      <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">step</span>: action.<span class="hljs-property">payload</span> };
    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// Exhaustiveness check</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled action: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(counterReducer, {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">step</span>: <span class="hljs-number">1</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch({ type: &#x27;increment&#x27; })}&gt;+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch({ type: &#x27;decrement&#x27; })}&gt;-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="أنماط-usereducer-المتقدمة">أنماط useReducer المتقدّمة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic reducer for CRUD operations</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Entity</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CrudState</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Entity</span>&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CrudAction</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Entity</span>&gt; =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_ITEMS&#x27;</span>; <span class="hljs-attr">payload</span>: T[] }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>; <span class="hljs-attr">payload</span>: T }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_ITEM&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt; } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_ITEM&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_LOADING&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">boolean</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_ERROR&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> };

<span class="hljs-keyword">function</span> createCrudReducer&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Entity</span>&gt;() {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">crudReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">CrudState</span>&lt;T&gt;, <span class="hljs-attr">action</span>: <span class="hljs-title class_">CrudAction</span>&lt;T&gt;</span>): <span class="hljs-title class_">CrudState</span>&lt;T&gt; {
    <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_ITEMS&#x27;</span>:
        <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">items</span>: action.<span class="hljs-property">payload</span>, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span> };
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_ITEM&#x27;</span>:
        <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">items</span>: [...state.<span class="hljs-property">items</span>, action.<span class="hljs-property">payload</span>] };
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;UPDATE_ITEM&#x27;</span>:
        <span class="hljs-keyword">return</span> {
          ...state,
          <span class="hljs-attr">items</span>: state.<span class="hljs-property">items</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>
            item.<span class="hljs-property">id</span> === action.<span class="hljs-property">payload</span>.<span class="hljs-property">id</span> ? { ...item, ...action.<span class="hljs-property">payload</span>.<span class="hljs-property">updates</span> } : item,
          ),
        };
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;DELETE_ITEM&#x27;</span>:
        <span class="hljs-keyword">return</span> {
          ...state,
          <span class="hljs-attr">items</span>: state.<span class="hljs-property">items</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">id</span> !== action.<span class="hljs-property">payload</span>),
        };
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_LOADING&#x27;</span>:
        <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">loading</span>: action.<span class="hljs-property">payload</span> };
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_ERROR&#x27;</span>:
        <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">error</span>: action.<span class="hljs-property">payload</span> };
      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> state;
    }
  };
}

<span class="hljs-comment">// Usage with specific type</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Entity</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserManager</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(createCrudReducer&lt;<span class="hljs-title class_">User</span>&gt;(), {
    <span class="hljs-attr">items</span>: [],
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="useref-أبعد-من-مراجع-dom">useRef: أبعد من مراجع DOM</h2>
<p>ولـ useRef استخدامات متعدّدة، لكلٍّ منها متطلّبات خاصّة في تحديد الأنواع.</p>
<h3 id="مراجع-عناصر-dom">مراجع عناصر DOM</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AutoFocusInput</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Specific element type with null initial value</span>
  <span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// TypeScript knows current might be null</span>
    inputRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// Multiple element types</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MediaPlayer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> videoRef = useRef&lt;<span class="hljs-title class_">HTMLVideoElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> audioRef = useRef&lt;<span class="hljs-title class_">HTMLAudioElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> canvasRef = useRef&lt;<span class="hljs-title class_">HTMLCanvasElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">playVideo</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (videoRef.<span class="hljs-property">current</span>) {
      videoRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">play</span>();
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{videoRef}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{audioRef}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{canvasRef}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}
</code></pre>
<h3 id="القيم-القابلة-للتغيير-مع-useref">القيم القابلة للتغيير مع useRef</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Storing mutable values that don&#x27;t trigger re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Timer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Store interval ID</span>
  <span class="hljs-keyword">const</span> intervalRef = useRef&lt;<span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span>&gt;();

  <span class="hljs-comment">// Store previous values</span>
  <span class="hljs-keyword">const</span> prevCountRef = useRef&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// Store callbacks without re-renders</span>
  <span class="hljs-keyword">const</span> callbackRef = useRef&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>&gt;();

  <span class="hljs-comment">// Store complex state</span>
  <span class="hljs-keyword">const</span> stateRef = useRef&lt;{
    <span class="hljs-attr">startTime</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">endTime</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">duration</span>?: <span class="hljs-built_in">number</span>;
  }&gt;({
    <span class="hljs-attr">startTime</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">start</span> = (<span class="hljs-params"></span>) =&gt; {
    intervalRef.<span class="hljs-property">current</span> = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Timer logic</span>
    }, <span class="hljs-number">1000</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">stop</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (intervalRef.<span class="hljs-property">current</span>) {
      <span class="hljs-built_in">clearInterval</span>(intervalRef.<span class="hljs-property">current</span>);
      stateRef.<span class="hljs-property">current</span>.<span class="hljs-property">endTime</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
      stateRef.<span class="hljs-property">current</span>.<span class="hljs-property">duration</span> = stateRef.<span class="hljs-property">current</span>.<span class="hljs-property">endTime</span> - stateRef.<span class="hljs-property">current</span>.<span class="hljs-property">startTime</span>;
    }
  };

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Cleanup on unmount</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (intervalRef.<span class="hljs-property">current</span>) {
        <span class="hljs-built_in">clearInterval</span>(intervalRef.<span class="hljs-property">current</span>);
      }
    };
  }, []);

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="usecallback-و-usememo-تحديد-أنواع-محسن">useCallback و useMemo: تحديد أنواع محسَّن</h2>
<p>تحتاج هذه الخُطّافات إلى تحديد دقيق لأنواع اعتمادياتها وقيمها المعادة.</p>
<h3 id="أنماط-usecallback">أنماط useCallback</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useCallback, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ users }: { users: User[] }</span>) {
  <span class="hljs-keyword">const</span> [selectedId, setSelectedId] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// TypeScript infers return type and parameter types</span>
  <span class="hljs-keyword">const</span> handleSelect = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setSelectedId</span>(user.<span class="hljs-property">id</span>);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Selected <span class="hljs-subst">\${user.name}</span>\`</span>);
  }, []); <span class="hljs-comment">// Empty deps because setSelectedId is stable</span>

  <span class="hljs-comment">// Generic callback</span>
  <span class="hljs-keyword">const</span> createHandler = <span class="hljs-title function_">useCallback</span>(
    &lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span>
      <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Clicked item <span class="hljs-subst">\${item.id}</span>\`</span>);
      },
    [],
  );

  <span class="hljs-comment">// Callback with dependencies</span>
  <span class="hljs-keyword">const</span> handleDelete = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (selectedId === userId) {
        <span class="hljs-title function_">setSelectedId</span>(<span class="hljs-literal">null</span>);
      }
      <span class="hljs-comment">// Delete logic</span>
    },
    [selectedId],
  );

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">// Callback with proper dependency typing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchBar</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-comment">// Debounced search with proper typing</span>
  <span class="hljs-keyword">const</span> search = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">searchQuery</span>: <span class="hljs-built_in">string</span>) =&gt; {
      <span class="hljs-keyword">if</span> (searchQuery.<span class="hljs-property">length</span> &lt; <span class="hljs-number">3</span>) {
        <span class="hljs-title function_">setResults</span>([]);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/search?q=<span class="hljs-subst">\${searchQuery}</span>\`</span>);
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-title function_">setResults</span>(data);
    },
    [], <span class="hljs-comment">// No dependencies needed</span>
  );

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h3 id="أنماط-usememo">أنماط useMemo</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">category</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataProcessor</span>(<span class="hljs-params">{ items }: { items: DataItem[] }</span>) {
  <span class="hljs-comment">// Computed values with proper typing</span>
  <span class="hljs-keyword">const</span> total = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">value</span>, <span class="hljs-number">0</span>);
  }, [items]);

  <span class="hljs-comment">// Complex transformations</span>
  <span class="hljs-keyword">const</span> groupedByCategory = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">groups</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">DataItem</span>[]&gt; = {};

    items.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (!groups[item.<span class="hljs-property">category</span>]) {
        groups[item.<span class="hljs-property">category</span>] = [];
      }
      groups[item.<span class="hljs-property">category</span>].<span class="hljs-title function_">push</span>(item);
    });

    <span class="hljs-keyword">return</span> groups;
  }, [items]);

  <span class="hljs-comment">// Generic memoization helper</span>
  <span class="hljs-keyword">const</span> sortedItems = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> [...items].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">value</span> - a.<span class="hljs-property">value</span>);
  }, [items]);

  <span class="hljs-comment">// Expensive component tree</span>
  <span class="hljs-keyword">const</span> expensiveComponent = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveVisualization</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{items}</span> /&gt;</span></span>,
    [items]
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{expensiveComponent}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-الخطافات-المخصصة">أنماط الخُطّافات المخصّصة</h2>
<p>إنشاء خُطّافات مخصّصة قابلة لإعادة الاستخدام وآمنة الأنواع.</p>
<h3 id="خطاف-مخصص-أساسي">خُطّاف مخصّص أساسي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple custom hook with proper return type</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useCounter</span>(<span class="hljs-params">initialValue = <span class="hljs-number">0</span></span>): {
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">increment</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">decrement</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">reset</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
} {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(initialValue);

  <span class="hljs-keyword">const</span> increment = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>), []);
  <span class="hljs-keyword">const</span> decrement = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c - <span class="hljs-number">1</span>), []);
  <span class="hljs-keyword">const</span> reset = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setCount</span>(initialValue), [initialValue]);

  <span class="hljs-keyword">return</span> { count, increment, decrement, reset };
}

<span class="hljs-comment">// Using tuple returns for simpler API</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useToggle</span>(<span class="hljs-params">initialValue = <span class="hljs-literal">false</span></span>): [<span class="hljs-built_in">boolean</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>, <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>] {
  <span class="hljs-keyword">const</span> [state, setState] = <span class="hljs-title function_">useState</span>(initialValue);

  <span class="hljs-keyword">const</span> toggle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">s</span>) =&gt;</span> !s), []);
  <span class="hljs-keyword">const</span> set = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-title function_">setState</span>(value), []);

  <span class="hljs-keyword">return</span> [state, toggle, set];
}
</code></pre>
<h3 id="خطافات-مخصصة-عامة">خُطّافات مخصّصة عامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic fetch hook</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FetchState</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">function</span> useFetch&lt;T = <span class="hljs-built_in">unknown</span>&gt;(
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">options</span>?: <span class="hljs-title class_">RequestInit</span>
): <span class="hljs-title class_">FetchState</span>&lt;T&gt; &amp; { <span class="hljs-attr">refetch</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> } {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">FetchState</span>&lt;T&gt;&gt;({
    <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">const</span> fetchData = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, options);
      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP error! status: <span class="hljs-subst">\${response.status}</span>\`</span>);
      }
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-title function_">setState</span>({ data, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: error <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span> });
    }
  }, [url, options]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchData</span>();
  }, [fetchData]);

  <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">refetch</span>: fetchData };
}

<span class="hljs-comment">// Usage with type parameter</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> { data, loading, error } = useFetch&lt;<span class="hljs-title class_">User</span>&gt;(
    <span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>
  );

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!data) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="أنماط-الخطافات-المخصصة-المتقدمة">أنماط الخُطّافات المخصّصة المتقدّمة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Hook with configuration options</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseAsyncOptions</span>&lt;T&gt; {
  <span class="hljs-attr">onSuccess</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">initialData</span>?: T;
  <span class="hljs-attr">enabled</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> useAsync&lt;T&gt;(<span class="hljs-attr">asyncFunction</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;, <span class="hljs-attr">options</span>: <span class="hljs-title class_">UseAsyncOptions</span>&lt;T&gt; = {}) {
  <span class="hljs-keyword">const</span> { onSuccess, onError, initialData, enabled = <span class="hljs-literal">true</span> } = options;

  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;{
    <span class="hljs-attr">data</span>: T | <span class="hljs-literal">undefined</span>;
    <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
  }&gt;({
    <span class="hljs-attr">data</span>: initialData,
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">const</span> execute = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">if</span> (!enabled) <span class="hljs-keyword">return</span>;

    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">asyncFunction</span>();
      <span class="hljs-title function_">setState</span>({ data, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> });
      onSuccess?.(data);
      <span class="hljs-keyword">return</span> data;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">const</span> err = error <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>;
      <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: err }));
      onError?.(err);
      <span class="hljs-keyword">throw</span> err;
    }
  }, [asyncFunction, enabled, onSuccess, onError]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">execute</span>();
  }, [execute]);

  <span class="hljs-keyword">return</span> { ...state, execute };
}
</code></pre>
<h2 id="useimperativehandle-كشف-واجهات-المكونات">useImperativeHandle: كشف واجهات المكوّنات</h2>
<p>إنشاء واجهات للمكوّنات بأنواع دقيقة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, useImperativeHandle, useRef, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Define the exposed API</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormHandle</span> {
  <span class="hljs-attr">submit</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">reset</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">validate</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">getValue</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">fieldName</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormProps</span> {
  <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">fields</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span> }&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Form</span> = forwardRef&lt;<span class="hljs-title class_">FormHandle</span>, <span class="hljs-title class_">FormProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ onSubmit, fields }, ref</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [values, setValues] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt;({});
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt;({});

  <span class="hljs-title function_">useImperativeHandle</span>(
    ref,
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">submit</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-title function_">validate</span>()) {
          <span class="hljs-title function_">onSubmit</span>(values);
        }
      },
      <span class="hljs-attr">reset</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setValues</span>({});
        <span class="hljs-title function_">setErrors</span>({});
      },
      <span class="hljs-attr">validate</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">newErrors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt; = {};

        fields.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">field</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (field.<span class="hljs-property">required</span> &amp;&amp; !values[field.<span class="hljs-property">name</span>]) {
            newErrors[field.<span class="hljs-property">name</span>] = <span class="hljs-string">\`<span class="hljs-subst">\${field.label}</span> is required\`</span>;
          }
        });

        <span class="hljs-title function_">setErrors</span>(newErrors);
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(newErrors).<span class="hljs-property">length</span> === <span class="hljs-number">0</span>;
      },
      <span class="hljs-attr">getValue</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">fieldName</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> values[fieldName],
    }),
    [values, fields, onSubmit]
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      {fields.map(field =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{field.name}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{field.label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{values[field.name]</span> || &#x27;&#x27;}
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{e</span> =&gt;</span>
              setValues(prev =&gt; ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
          /&gt;
          {errors[field.name] &amp;&amp; (
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{errors[field.name]}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
});

<span class="hljs-title class_">Form</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;Form&#x27;</span>;

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> formRef = useRef&lt;<span class="hljs-title class_">FormHandle</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleExternalSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
    formRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">submit</span>();
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">validateForm</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> isValid = formRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">validate</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Form is valid:&#x27;</span>, isValid);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Form</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{formRef}</span>
        <span class="hljs-attr">fields</span>=<span class="hljs-string">{[</span>
          { <span class="hljs-attr">name:</span> &#x27;<span class="hljs-attr">username</span>&#x27;, <span class="hljs-attr">label:</span> &#x27;<span class="hljs-attr">Username</span>&#x27;, <span class="hljs-attr">required:</span> <span class="hljs-attr">true</span> },
          { <span class="hljs-attr">name:</span> &#x27;<span class="hljs-attr">email</span>&#x27;, <span class="hljs-attr">label:</span> &#x27;<span class="hljs-attr">Email</span>&#x27;, <span class="hljs-attr">required:</span> <span class="hljs-attr">true</span> },
        ]}
        <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{data</span> =&gt;</span> console.log(&#x27;Submitted:&#x27;, data)}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleExternalSubmit}</span>&gt;</span>Submit from outside<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{validateForm}</span>&gt;</span>Validate<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}
</code></pre>
<h2 id="usecontext-مع-typescript">useContext مع TypeScript</h2>
<p>أنماط سياق آمنة الأنواع للحالة العامة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, useState, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Define context value type</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthContextValue</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">credentials</span>: <span class="hljs-title class_">Credentials</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Create context with undefined default</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">AuthContext</span> = createContext&lt;<span class="hljs-title class_">AuthContextValue</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-comment">// Provider component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AuthProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">login</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">credentials</span>: <span class="hljs-title class_">Credentials</span></span>) =&gt; {
    <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">authenticateUser</span>(credentials);
      <span class="hljs-title function_">setUser</span>(user);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">logout</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setUser</span>(<span class="hljs-literal">null</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AuthContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">user</span>, <span class="hljs-attr">login</span>, <span class="hljs-attr">logout</span>, <span class="hljs-attr">loading</span> }}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">AuthContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Custom hook with type guard</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useAuth</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">AuthContextValue</span> {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">AuthContext</span>);

  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useAuth must be used within an AuthProvider&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-comment">// Generic context factory</span>
<span class="hljs-keyword">function</span> createContextWithHook&lt;T&gt;(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Context</span> = createContext&lt;T | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Provider</span> = <span class="hljs-title class_">Context</span>.<span class="hljs-property">Provider</span>;

  <span class="hljs-keyword">const</span> useContextHook = (): <span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">Context</span>);
    <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`use<span class="hljs-subst">\${name}</span> must be used within a <span class="hljs-subst">\${name}</span>Provider\`</span>);
    }
    <span class="hljs-keyword">return</span> context;
  };

  <span class="hljs-keyword">return</span> [<span class="hljs-title class_">Provider</span>, useContextHook] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> [<span class="hljs-title class_">ThemeProvider</span>, useTheme] = createContextWithHook&lt;{
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  <span class="hljs-attr">toggleTheme</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}&gt;(<span class="hljs-string">&#x27;Theme&#x27;</span>);
</code></pre>
<h2 id="أنماط-تركيب-الخطافات">أنماط تركيب الخُطّافات</h2>
<p>تركيب الخُطّافات للحصول على وظائف معقّدة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Composing multiple hooks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useUserProfile</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: user, <span class="hljs-attr">loading</span>: userLoading } = useFetch&lt;<span class="hljs-title class_">User</span>&gt;(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>);

  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: posts, <span class="hljs-attr">loading</span>: postsLoading } = useFetch&lt;<span class="hljs-title class_">Post</span>[]&gt;(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>/posts\`</span>);

  <span class="hljs-keyword">const</span> [isFollowing, setIsFollowing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> checkFollowing = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${user.id}</span>/is-following\`</span>);
    <span class="hljs-keyword">const</span> { following } = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
    <span class="hljs-title function_">setIsFollowing</span>(following);
  }, [user]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">checkFollowing</span>();
  }, [checkFollowing]);

  <span class="hljs-keyword">const</span> toggleFollow = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> method = isFollowing ? <span class="hljs-string">&#x27;DELETE&#x27;</span> : <span class="hljs-string">&#x27;POST&#x27;</span>;
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${user.id}</span>/follow\`</span>, { method });
    <span class="hljs-title function_">setIsFollowing</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> !prev);
  }, [user, isFollowing]);

  <span class="hljs-keyword">return</span> {
    user,
    posts,
    <span class="hljs-attr">loading</span>: userLoading || postsLoading,
    isFollowing,
    toggleFollow,
  };
}

<span class="hljs-comment">// Hook that returns other hooks conditionally</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useConditionalFeature</span>(<span class="hljs-params"><span class="hljs-attr">enabled</span>: <span class="hljs-built_in">boolean</span></span>) {
  <span class="hljs-comment">// Always call hooks, but make their behavior conditional</span>
  <span class="hljs-keyword">const</span> websocket = <span class="hljs-title function_">useWebSocket</span>(enabled ? <span class="hljs-string">&#x27;ws://localhost:3000&#x27;</span> : <span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> polling = <span class="hljs-title function_">usePolling</span>(enabled ? <span class="hljs-literal">null</span> : <span class="hljs-string">&#x27;/api/data&#x27;</span>);

  <span class="hljs-keyword">return</span> enabled ? websocket : polling;
}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="ما-ينبغي-فعله">ما ينبغي فعله ✅</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Type state explicitly when needed</span>
<span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// ✅ Use const assertions for reducer actions</span>
<span class="hljs-keyword">const</span> action = { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;INCREMENT&#x27;</span> } <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// ✅ Properly type ref.current checks</span>
<span class="hljs-keyword">if</span> (inputRef.<span class="hljs-property">current</span>) {
  inputRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
}

<span class="hljs-comment">// ✅ Use generics for reusable hooks</span>
<span class="hljs-keyword">function</span> useAsync&lt;T&gt;(<span class="hljs-attr">asyncFn</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;) {}

<span class="hljs-comment">// ✅ Return consistent types from custom hooks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useApi</span>(<span class="hljs-params"></span>): { <span class="hljs-attr">data</span>: <span class="hljs-title class_">Data</span> | <span class="hljs-literal">null</span>; <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span> } {}
</code></pre>
<h3 id="ما-ينبغي-تجنبه">ما ينبغي تجنّبه ❌</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t use any for hook state</span>
<span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-built_in">any</span>&gt;();

<span class="hljs-comment">// ❌ Don&#x27;t ignore dependency arrays</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {}, []); <span class="hljs-comment">// Missing dependency!</span>

<span class="hljs-comment">// ❌ Don&#x27;t mutate refs directly in render</span>
inputRef.<span class="hljs-property">current</span> = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;input&#x27;</span>); <span class="hljs-comment">// Wrong!</span>

<span class="hljs-comment">// ❌ Don&#x27;t call hooks conditionally</span>
<span class="hljs-keyword">if</span> (condition) {
  <span class="hljs-title function_">useState</span>(); <span class="hljs-comment">// Error!</span>
}

<span class="hljs-comment">// ❌ Don&#x27;t forget cleanup in effects</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {}, <span class="hljs-number">1000</span>);
  <span class="hljs-comment">// return () =&gt; clearTimeout(timer); // Don&#x27;t forget!</span>
}, []);
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تقدّم خُطّافات React مع TypeScript أساسًا قويًا لبناء منطق آمن الأنواع وقابل لإعادة الاستخدام. والمفتاح هو فهم متى تكون صريحًا في الأنواع ومتى تترك الاستدلال في TypeScript يقوم بالعمل. ركّز على إنشاء خُطّافات آمنة الأنواع ومريحة في الاستخدام معًا، وتذكّر أنّ تحديد الأنواع الجيّد يساعد في منع الأخطاء قبل وقوعها.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
