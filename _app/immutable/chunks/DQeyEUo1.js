const s="kinney",a="react-typescript",n="React مع TypeScript",l="passing-dispatch-and-context",t="تمرير dispatch واستخدام Context",p=[{depth:2,id:"المشكلة-تمرير-dispatch-عبر-الخصائص-عمليا",text:"المشكلة: تمرير dispatch عبر الخصائص عمليًا"},{depth:2,id:"الخطوة-1-أنشئ-سياقك-المكتوب-الأنواع",text:"الخطوة 1: أنشئ سياقك المكتوب الأنواع"},{depth:2,id:"الخطوة-2-نفذ-المزود",text:"الخطوة 2: نفّذ المزوّد"},{depth:2,id:"الخطوة-3-استراتيجية-الترحيل-التدريجي",text:"الخطوة 3: استراتيجية الترحيل التدريجي"},{depth:2,id:"الخطوة-4-أنماط-محسنة-لتجربة-أفضل",text:"الخطوة 4: أنماط محسّنة لتجربة أفضل"},{depth:2,id:"الخطوة-5-أمان-أنواع-متقدم-مع-بناة-الإجراءات",text:"الخطوة 5: أمان أنواع متقدّم مع بُناة الإجراءات"},{depth:2,id:"مثال-ترحيل-واقعي-إدارة-حالة-النماذج",text:"مثال ترحيل واقعي: إدارة حالة النماذج"},{depth:2,id:"اعتبارات-الأداء-والمطبات",text:"اعتبارات الأداء والمَطبّات"},{depth:3,id:"التخزين-المؤقت-لقيمة-السياق",text:"التخزين المؤقت لقيمة السياق"},{depth:3,id:"الاشتراكات-الانتقائية-في-السياق",text:"الاشتراكات الانتقائية في السياق"},{depth:2,id:"اختبار-ترحيل-السياق",text:"اختبار ترحيل السياق"},{depth:2,id:"مطبات-الترحيل-الشائعة-وحلولها",text:"مَطبّات الترحيل الشائعة وحلولها"},{depth:3,id:"المطبة-1-نسيان-التخزين-المؤقت-لمنشئي-الإجراءات",text:"المطبّة 1: نسيان التخزين المؤقت لمنشئي الإجراءات"},{depth:3,id:"المطبة-2-موضع-مزود-السياق",text:"المطبّة 2: موضع مزوّد السياق"},{depth:3,id:"المطبة-3-الإفراط-في-استخدام-السياق",text:"المطبّة 3: الإفراط في استخدام السياق"},{depth:2,id:"متى-لا-تستخدم-هذا-النمط",text:"متى لا تستخدم هذا النمط"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],c=`<p>بنيت تطبيق React بحجم معقول باستخدام TypeScript، وفي مرحلة ما بدأت تمرّر دوال dispatch عبر عدّة طبقات من المكوّنات. ربما بدأ الأمر بريئًا — تمرير <code>dispatch</code> من <code>useReducer</code> نزولًا مستوى واحد فقط. لكنك الآن تمرّرها عبر أربعة مكوّنات لا تحتاجها أصلًا، لمجرد أن تصل إلى المكوّن الذي يحتاجها فعلًا.</p>
<p>سنمرّ معًا على رحلة إعادة الهيكلة من دوال dispatch المنقولة عبر الخصائص (prop drilling) إلى حلٍّ نظيف ومكتوب الأنواع يعتمد على Context. ستتعلّم كيف تنتقل بأمان، وكيف تحافظ على أمان الأنواع طوال الطريق، وكيف تتجنّب الأخطاء الشائعة التي تجعل المطوّرين يلعنون واجهات Context.</p>
<h2 id="المشكلة-تمرير-dispatch-عبر-الخصائص-عمليا">المشكلة: تمرير dispatch عبر الخصائص عمليًا</h2>
<p>إليك سيناريو نموذجي ينمو عضويًا في تطبيقات React. تبدأ باستخدام <code>useReducer</code> في المكوّن الرئيسي وتحتاج إلى تمرير دالة dispatch نزولًا إلى المكوّنات المتداخلة بعمق:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Types for our todo application</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;high&#x27;</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TodoAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>] } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_PRIORITY&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>] } };

<span class="hljs-comment">// ❌ The problematic pattern - prop drilling dispatch everywhere</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, dispatch] = <span class="hljs-title function_">useReducer</span>(todoReducer, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">dispatch</span>=<span class="hljs-string">{dispatch}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> <span class="hljs-attr">todos</span>=<span class="hljs-string">{todos}</span> <span class="hljs-attr">dispatch</span>=<span class="hljs-string">{dispatch}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> <span class="hljs-attr">dispatch</span>=<span class="hljs-string">{dispatch}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MainContent</span>(<span class="hljs-params">{ todos, dispatch }: { todos: Todo[]; dispatch: Dispatch&lt;TodoAction&gt; }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span> <span class="hljs-attr">todos</span>=<span class="hljs-string">{todos}</span> <span class="hljs-attr">dispatch</span>=<span class="hljs-string">{dispatch}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoStats</span> <span class="hljs-attr">todos</span>=<span class="hljs-string">{todos}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos, dispatch }: { todos: Todo[]; dispatch: Dispatch&lt;TodoAction&gt; }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span> <span class="hljs-attr">dispatch</span>=<span class="hljs-string">{dispatch}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Finally! The component that actually needs dispatch</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params">{ todo, dispatch }: { todo: Todo; dispatch: Dispatch&lt;TodoAction&gt; }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
        <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch({ type: &#x27;TOGGLE_TODO&#x27;, payload: { id: todo.id } })}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch({ type: &#x27;DELETE_TODO&#x27;, payload: { id: todo.id } })}&gt;
        Delete
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ كيف لا يستخدم <code>MainContent</code> و<code>TodoList</code> دالة dispatch <em>فعليًا</em> — إنما يمرّرانها كأنها بطاطا ساخنة. هذه هي مشكلة تمرير الخصائص عبر الطبقات (prop drilling) الكلاسيكية، وهي تتفاقم كلما نمت شجرة مكوّناتك.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تمرير دوال dispatch عبر الخصائص ينشئ اقترانًا محكمًا بين المكوّنات ويجعل إعادة الهيكلة مؤلمة. فنقل مكوّن يحتاج إلى dispatch يصبح عملية جراحية كبرى تمسّ كل مكوّن في الشجرة.</p>
</blockquote>
<h2 id="الخطوة-1-أنشئ-سياقك-المكتوب-الأنواع">الخطوة 1: أنشئ سياقك المكتوب الأنواع</h2>
<p>الخطوة الأولى في ترحيلنا هي إنشاء سياق مكتوب الأنواع بشكل صحيح. سنبدأ باستخراج أنواع الحالة وdispatch، ثم إنشاء بنية السياق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { createContext, useContext, useReducer, <span class="hljs-title class_">ReactNode</span>, <span class="hljs-title class_">Dispatch</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ First, centralize your action types</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">TodoAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>] } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_PRIORITY&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>] } };

<span class="hljs-comment">// ✅ Define what our context will provide</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoContextValue</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[];
  <span class="hljs-attr">dispatch</span>: <span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">TodoAction</span>&gt;;
}

<span class="hljs-comment">// ✅ Create context with undefined as default</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoContext</span> = createContext&lt;<span class="hljs-title class_">TodoContextValue</span> | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-comment">// ✅ Custom hook with runtime safety</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoContext</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">TodoContextValue</span> {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">TodoContext</span>);
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useTodoContext must be used within a TodoProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}
</code></pre>
<p>يعطينا هذا سياقًا مكتوب الأنواع مع أمان وقت التشغيل. القيمة الافتراضية <code>undefined</code> تفرض علينا توفير خُطّاف مخصّص يفحص ما إذا كنا داخل مزوّد فعلًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم <code>undefined</code> دائمًا كقيمة افتراضية لسياقك، وقدّم خُطّافًا مخصّصًا. هذا يمنع الاستخدام العرضي للسياق خارج المزوّد، وهو ما كان سيفشل بصمت مع كائن افتراضي.</p>
</blockquote>
<h2 id="الخطوة-2-نفذ-المزود">الخطوة 2: نفّذ المزوّد</h2>
<p>لننشئ الآن مكوّن المزوّد (Provider) الذي سيحلّ محل تمرير الخصائص. المفتاح هنا هو أن هذا المزوّد يجب أن يغلّف كل منطق إدارة الحالة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoProviderProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">initialTodos</span>?: <span class="hljs-title class_">Todo</span>[];
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoProvider</span>(<span class="hljs-params">{ children, initialTodos = [] }: <span class="hljs-title class_">TodoProviderProps</span></span>) {
  <span class="hljs-keyword">const</span> [todos, dispatch] = <span class="hljs-title function_">useReducer</span>(todoReducer, initialTodos);

  <span class="hljs-comment">// ✅ Memoize the context value to prevent unnecessary re-renders</span>
  <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({ todos, dispatch }), [todos]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">TodoContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Your reducer stays the same</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">todoReducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">Todo</span>[], <span class="hljs-attr">action</span>: <span class="hljs-title class_">TodoAction</span></span>): <span class="hljs-title class_">Todo</span>[] {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>:
      <span class="hljs-keyword">return</span> [
        ...state,
        {
          <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),
          <span class="hljs-attr">text</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">text</span>,
          <span class="hljs-attr">priority</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">priority</span>,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
        },
      ];
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>:
      <span class="hljs-keyword">return</span> state.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === action.<span class="hljs-property">payload</span>.<span class="hljs-property">id</span> ? { ...todo, <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> } : todo,
      );
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>:
      <span class="hljs-keyword">return</span> state.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">id</span> !== action.<span class="hljs-property">payload</span>.<span class="hljs-property">id</span>);
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;SET_PRIORITY&#x27;</span>:
      <span class="hljs-keyword">return</span> state.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === action.<span class="hljs-property">payload</span>.<span class="hljs-property">id</span> ? { ...todo, <span class="hljs-attr">priority</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">priority</span> } : todo,
      );
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
}
</code></pre>
<p>لاحظ أننا نستخدم <code>useMemo</code> لقيمة السياق. هذا أمر حاسم — فمن دونه سيُنشئ كل تصيير كائنًا جديدًا، مما يُعيد تصيير جميع المكوّنات المستهلكة بلا داعٍ.</p>
<h2 id="الخطوة-3-استراتيجية-الترحيل-التدريجي">الخطوة 3: استراتيجية الترحيل التدريجي</h2>
<p>إليك جمال هذا الأسلوب: يمكنك ترحيل المكوّن واحدًا تلو الآخر دون كسر أي شيء. ابدأ من أعمق المكوّنات وتدرّج إلى الأعلى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Step 3a: First, wrap your app with the provider</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Step 3b: Update the leaf components first</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params">{ todo }: { todo: Todo }</span>) {
  <span class="hljs-keyword">const</span> { dispatch } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
        <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch({ type: &#x27;TOGGLE_TODO&#x27;, payload: { id: todo.id } })}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch({ type: &#x27;DELETE_TODO&#x27;, payload: { id: todo.id } })}&gt;
        Delete
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Step 3c: Remove props from parent components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { todos } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Step 3d: Clean up intermediate components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MainContent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { todos } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoStats</span> <span class="hljs-attr">todos</span>=<span class="hljs-string">{todos}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>الترحيل تدريجي وآمن — يمكنك النشر بعد كل خطوة دون كسر الوظائف القائمة.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>ابدأ الترحيل من المكوّنات الطرفية (التي تستخدم dispatch فعليًا) وتدرّج إلى الأعلى. هذا يضمن أن يبقى لديك تطبيق يعمل في كل أثناء الترحيل.</p>
</blockquote>
<h2 id="الخطوة-4-أنماط-محسنة-لتجربة-أفضل">الخطوة 4: أنماط محسّنة لتجربة أفضل</h2>
<p>بعد أن يعمل السياق الأساسي، يمكنك تحسينه بأنماط أكثر ملاءمة. تحسين شائع هو فصل dispatch إلى منشئ إجراءات دلالية (semantic action creators):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Create action creators for better developer experience</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { dispatch } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]</span>) =&gt;</span> {
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { text, priority } });
      },
      <span class="hljs-attr">toggleTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { id } });
      },
      <span class="hljs-attr">deleteTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { id } });
      },
      <span class="hljs-attr">setPriority</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]</span>) =&gt;</span> {
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_PRIORITY&#x27;</span>, <span class="hljs-attr">payload</span>: { id, priority } });
      },
    }),
    [dispatch],
  );
}

<span class="hljs-comment">// ✅ Now your components become much cleaner</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params">{ todo }: { todo: Todo }</span>) {
  <span class="hljs-keyword">const</span> { toggleTodo, deleteTodo } = <span class="hljs-title function_">useTodoActions</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo.id)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> deleteTodo(todo.id)}&gt;Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AddTodoForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { addTodo } = <span class="hljs-title function_">useTodoActions</span>();
  <span class="hljs-keyword">const</span> [text, setText] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [priority, setPriority] = useState&lt;<span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]&gt;(<span class="hljs-string">&#x27;medium&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">if</span> (text.<span class="hljs-title function_">trim</span>()) {
      <span class="hljs-title function_">addTodo</span>(text.<span class="hljs-title function_">trim</span>(), priority);
      <span class="hljs-title function_">setText</span>(<span class="hljs-string">&#x27;&#x27;</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{text}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setText(e.target.value)} placeholder=&quot;Add a todo...&quot; /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{priority}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setPriority(e.target.value as Todo[&#x27;priority&#x27;])}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;low&quot;</span>&gt;</span>Low<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;medium&quot;</span>&gt;</span>Medium<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;high&quot;</span>&gt;</span>High<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Add<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>يمنحك هذا النمط عدّة فوائد:</p>
<ul>
<li><strong>إكمال تلقائي أفضل</strong>: يمكن لمحرّرك أن يقترح <code>addTodo</code> بدلًا من إجبارك على تذكّر شكل الإجراء بالضبط</li>
<li><strong>أمان الأنواع</strong>: يضمن TypeScript أنك تمرّر المعاملات الصحيحة</li>
<li><strong>إعادة هيكلة أسهل</strong>: غيّر شكل الإجراء في مكان واحد بدلًا من في كل مكوّناتك</li>
</ul>
<h2 id="الخطوة-5-أمان-أنواع-متقدم-مع-بناة-الإجراءات">الخطوة 5: أمان أنواع متقدّم مع بُناة الإجراءات</h2>
<p>لمنح أمان أنواع أفضل، يمكنك إنشاء بُناة إجراءات (action builders) تضمن أن تكون إجراءاتك مصوغة على نحو صحيح دائمًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Action builders with full type safety</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> todoActions = {
  <span class="hljs-attr">addTodo</span>: (<span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]): <span class="hljs-function"><span class="hljs-params">TodoAction</span> =&gt;</span> ({
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>,
    <span class="hljs-attr">payload</span>: { text, priority },
  }),
  <span class="hljs-attr">toggleTodo</span>: (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">TodoAction</span> =&gt;</span> ({
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>,
    <span class="hljs-attr">payload</span>: { id },
  }),
  <span class="hljs-attr">deleteTodo</span>: (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">TodoAction</span> =&gt;</span> ({
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;DELETE_TODO&#x27;</span>,
    <span class="hljs-attr">payload</span>: { id },
  }),
  <span class="hljs-attr">setPriority</span>: (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]): <span class="hljs-function"><span class="hljs-params">TodoAction</span> =&gt;</span> ({
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_PRIORITY&#x27;</span>,
    <span class="hljs-attr">payload</span>: { id, priority },
  }),
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// ✅ Enhanced actions hook using builders</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { dispatch } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]</span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>(todoActions.<span class="hljs-title function_">addTodo</span>(text, priority)),
      <span class="hljs-attr">toggleTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title function_">dispatch</span>(todoActions.<span class="hljs-title function_">toggleTodo</span>(id)),
      <span class="hljs-attr">deleteTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title function_">dispatch</span>(todoActions.<span class="hljs-title function_">deleteTodo</span>(id)),
      <span class="hljs-attr">setPriority</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]</span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>(todoActions.<span class="hljs-title function_">setPriority</span>(id, priority)),
    }),
    [dispatch],
  );
}
</code></pre>
<p>يبسّط هذا الأسلوب الاختبار أيضًا — يمكنك اختبار بُناة الإجراءات بمعزل عن مكوّناتك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Easy to test action builders</span>
<span class="hljs-keyword">import</span> { todoActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./TodoContext&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;todoActions&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;addTodo creates correct action&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> action = todoActions.<span class="hljs-title function_">addTodo</span>(<span class="hljs-string">&#x27;Buy groceries&#x27;</span>, <span class="hljs-string">&#x27;high&#x27;</span>);
    <span class="hljs-title function_">expect</span>(action).<span class="hljs-title function_">toEqual</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Buy groceries&#x27;</span>, <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span> },
    });
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;toggleTodo creates correct action&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> action = todoActions.<span class="hljs-title function_">toggleTodo</span>(<span class="hljs-string">&#x27;todo-123&#x27;</span>);
    <span class="hljs-title function_">expect</span>(action).<span class="hljs-title function_">toEqual</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_TODO&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;todo-123&#x27;</span> },
    });
  });
});
</code></pre>
<h2 id="مثال-ترحيل-واقعي-إدارة-حالة-النماذج">مثال ترحيل واقعي: إدارة حالة النماذج</h2>
<p>إليك مثالًا أكثر تعقيدًا يوضّح كيفية ترحيل إدارة حالة النماذج من تمرير الخصائص إلى السياق. هذا النمط مفيد بشكل خاص للنماذج متعدّدة الخطوات أو المعالجات المتدرجة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before: Prop drilling form dispatch through multiple steps</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RegistrationFormState</span> {
  <span class="hljs-attr">currentStep</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">userData</span>: {
    <span class="hljs-attr">personalInfo</span>?: <span class="hljs-title class_">PersonalInfo</span>;
    <span class="hljs-attr">accountDetails</span>?: <span class="hljs-title class_">AccountDetails</span>;
    <span class="hljs-attr">preferences</span>?: <span class="hljs-title class_">UserPreferences</span>;
  };
  <span class="hljs-attr">validation</span>: {
    <span class="hljs-attr">personalInfo</span>?: <span class="hljs-title class_">ValidationErrors</span>;
    <span class="hljs-attr">accountDetails</span>?: <span class="hljs-title class_">ValidationErrors</span>;
    <span class="hljs-attr">preferences</span>?: <span class="hljs-title class_">ValidationErrors</span>;
  };
  <span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;NEXT_STEP&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PREV_STEP&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_PERSONAL_INFO&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-title class_">PersonalInfo</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_ACCOUNT_DETAILS&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-title class_">AccountDetails</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_PREFERENCES&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-title class_">UserPreferences</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_VALIDATION_ERRORS&#x27;</span>; <span class="hljs-attr">payload</span>: { <span class="hljs-attr">step</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">errors</span>: <span class="hljs-title class_">ValidationErrors</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_SUBMITTING&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">boolean</span> };

<span class="hljs-comment">// ✅ After: Clean context-based approach</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">RegistrationContext</span> = createContext&lt;
  | {
      <span class="hljs-attr">state</span>: <span class="hljs-title class_">RegistrationFormState</span>;
      <span class="hljs-attr">dispatch</span>: <span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">FormAction</span>&gt;;
    }
  | <span class="hljs-literal">undefined</span>
&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useRegistrationForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">RegistrationContext</span>);
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useRegistrationForm must be used within RegistrationProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useRegistrationActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { dispatch } = <span class="hljs-title function_">useRegistrationForm</span>();

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">nextStep</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;NEXT_STEP&#x27;</span> }),
      <span class="hljs-attr">prevStep</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PREV_STEP&#x27;</span> }),
      <span class="hljs-attr">updatePersonalInfo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">info</span>: <span class="hljs-title class_">PersonalInfo</span></span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_PERSONAL_INFO&#x27;</span>, <span class="hljs-attr">payload</span>: info }),
      <span class="hljs-attr">updateAccountDetails</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">details</span>: <span class="hljs-title class_">AccountDetails</span></span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_ACCOUNT_DETAILS&#x27;</span>, <span class="hljs-attr">payload</span>: details }),
      <span class="hljs-attr">updatePreferences</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">prefs</span>: <span class="hljs-title class_">UserPreferences</span></span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;UPDATE_PREFERENCES&#x27;</span>, <span class="hljs-attr">payload</span>: prefs }),
      <span class="hljs-attr">setValidationErrors</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">step</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">errors</span>: <span class="hljs-title class_">ValidationErrors</span></span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_VALIDATION_ERRORS&#x27;</span>, <span class="hljs-attr">payload</span>: { step, errors } }),
      <span class="hljs-attr">setSubmitting</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span>
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;SET_SUBMITTING&#x27;</span>, <span class="hljs-attr">payload</span>: isSubmitting }),
    }),
    [dispatch],
  );
}

<span class="hljs-comment">// ✅ Now form steps are clean and focused</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PersonalInfoStep</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { state } = <span class="hljs-title function_">useRegistrationForm</span>();
  <span class="hljs-keyword">const</span> { updatePersonalInfo, nextStep } = <span class="hljs-title function_">useRegistrationActions</span>();

  <span class="hljs-comment">// Only concerned with personal info, no prop drilling needed</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">PersonalInfo</span></span>) =&gt; {
    <span class="hljs-title function_">updatePersonalInfo</span>(data);
    <span class="hljs-title function_">nextStep</span>();
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PersonalInfoForm</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{state.userData.personalInfo}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="اعتبارات-الأداء-والمطبات">اعتبارات الأداء والمَطبّات</h2>
<p>عند الانتقال من تمرير الخصائص إلى السياق، انتبه إلى هذه الآثار على الأداء:</p>
<h3 id="التخزين-المؤقت-لقيمة-السياق">التخزين المؤقت لقيمة السياق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This causes all consumers to re-render on every provider render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [todos, dispatch] = <span class="hljs-title function_">useReducer</span>(todoReducer, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">todos</span>, <span class="hljs-attr">dispatch</span> }}&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">TodoContext.Provider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Memoize the context value</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoProvider</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [todos, dispatch] = <span class="hljs-title function_">useReducer</span>(todoReducer, []);

  <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({ todos, dispatch }),
    [todos, dispatch], <span class="hljs-comment">// dispatch is stable from useReducer</span>
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">TodoContext.Provider</span>&gt;</span></span>;
}
</code></pre>
<h3 id="الاشتراكات-الانتقائية-في-السياق">الاشتراكات الانتقائية في السياق</h3>
<p>لأداء أفضل مع كائنات حالة كبيرة، فكّر في فصل سياقك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Split state and actions for better performance</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoStateContext</span> = createContext&lt;<span class="hljs-title class_">Todo</span>[] | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoDispatchContext</span> = createContext&lt;<span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">TodoAction</span>&gt; | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoState</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">TodoStateContext</span>);
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useTodoState must be used within TodoProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoDispatch</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">TodoDispatchContext</span>);
  <span class="hljs-keyword">if</span> (context === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useTodoDispatch must be used within TodoProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-comment">// Components that only dispatch actions won&#x27;t re-render when state changes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AddTodoButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> dispatch = <span class="hljs-title function_">useTodoDispatch</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> dispatch(todoActions.addTodo(&#x27;New todo&#x27;, &#x27;medium&#x27;))}&gt;Add Todo<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اختبار-ترحيل-السياق">اختبار ترحيل السياق</h2>
<p>يصبح الاختبار السليم أكثر وضوحًا بعد الترحيل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen, fireEvent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TodoProvider</span>, useTodoActions, useTodoState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./TodoContext&#x27;</span>;

<span class="hljs-comment">// ✅ Test wrapper for components that use context</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TestWrapper</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Test component that exercises the context</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TestComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> todos = <span class="hljs-title function_">useTodoState</span>();
  <span class="hljs-keyword">const</span> { addTodo, toggleTodo } = <span class="hljs-title function_">useTodoActions</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-testid</span>=<span class="hljs-string">&quot;todo-count&quot;</span>&gt;</span>{todos.length}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> addTodo(&#x27;Test todo&#x27;, &#x27;high&#x27;)}&gt;Add Todo<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">data-testid</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">todo-</span>\${<span class="hljs-attr">todo.id</span>}\`}&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo.id)}&gt;Toggle<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;context works correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestComponent</span> /&gt;</span></span>, { <span class="hljs-attr">wrapper</span>: <span class="hljs-title class_">TestWrapper</span> });

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;todo-count&#x27;</span>)).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;0&#x27;</span>);

  fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Add Todo&#x27;</span>));

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;todo-count&#x27;</span>)).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;1&#x27;</span>);
  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Test todo&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
});

<span class="hljs-comment">// ✅ Test hooks in isolation using renderHook</span>
<span class="hljs-keyword">import</span> { renderHook, act } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;useTodoActions provides expected interface&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> { result } = <span class="hljs-title function_">renderHook</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">useTodoActions</span>(), {
    <span class="hljs-attr">wrapper</span>: <span class="hljs-title class_">TestWrapper</span>,
  });

  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">addTodo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">toggleTodo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">deleteTodo</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> result.<span class="hljs-property">current</span>.<span class="hljs-property">setPriority</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;function&#x27;</span>);
});
</code></pre>
<h2 id="مطبات-الترحيل-الشائعة-وحلولها">مَطبّات الترحيل الشائعة وحلولها</h2>
<h3 id="المطبة-1-نسيان-التخزين-المؤقت-لمنشئي-الإجراءات">المطبّة 1: نسيان التخزين المؤقت لمنشئي الإجراءات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This causes infinite re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { dispatch } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]</span>) =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { text, priority } });
    },
    <span class="hljs-comment">// ... other actions</span>
  };
}

<span class="hljs-comment">// ✅ Memoize action creators</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoActions</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { dispatch } = <span class="hljs-title function_">useTodoContext</span>();

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">addTodo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">Todo</span>[<span class="hljs-string">&#x27;priority&#x27;</span>]</span>) =&gt;</span> {
        <span class="hljs-title function_">dispatch</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_TODO&#x27;</span>, <span class="hljs-attr">payload</span>: { text, priority } });
      },
      <span class="hljs-comment">// ... other actions</span>
    }),
    [dispatch],
  );
}
</code></pre>
<h3 id="المطبة-2-موضع-مزود-السياق">المطبّة 2: موضع مزوّد السياق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Provider too low in the tree</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span> {/* This can&#x27;t access TodoContext */}
      <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Provider at the right level</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span> {/* Now this can access TodoContext if needed */}
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="المطبة-3-الإفراط-في-استخدام-السياق">المطبّة 3: الإفراط في استخدام السياق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t put everything in global context</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppProvider</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProvider</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">NotificationProvider</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ShoppingCartProvider</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">AnalyticsProvider</span>&gt;</span>
                {/* This is getting ridiculous */}
                <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">AnalyticsProvider</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ShoppingCartProvider</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">NotificationProvider</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">UserProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Use context judiciously - compose providers where needed</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AppProviders</span>(<span class="hljs-params">{ children }: { children: ReactNode }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">UserProvider</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoSection</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoProvider</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">AddTodoForm</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TodoProvider</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متى-لا-تستخدم-هذا-النمط">متى لا تستخدم هذا النمط</h2>
<p>السياق ليس الحل الصحيح دائمًا. التزم بتمرير الخصائص عندما:</p>
<ul>
<li><strong>يحتاج dispatch إلى النزول مستوى أو مستويين فقط</strong>: يضيف السياق تعقيدًا بلا داعٍ في الحالات البسيطة</li>
<li><strong>الحالة محلية فعلًا</strong>: لا تجعل حالة خاصّة بمكوّن عامّة</li>
<li><strong>الأداء حاسم وهناك تحديثات متكرّرة</strong>: يسبّب السياق إعادة تصيير جميع المستهلكين</li>
<li><strong>أنت تبني مكتبة مكوّنات قابلة لإعادة الاستخدام</strong>: تقدّم الخصائص مرونة أفضل لمستهلكي المكتبة</li>
</ul>
<h2 id="الخلاصة">الخلاصة</h2>
<p>الانتقال من دوال dispatch المنقولة عبر الخصائص إلى نمط Context مكتوب الأنواع يمنحك:</p>
<ul>
<li><strong>واجهات مكوّنات أنظف</strong>: لا مزيد من تمرير خصائص لا تستخدمها المكوّنات</li>
<li><strong>تجربة مطوّر أفضل</strong>: منشئ إجراءات دلالية بدلًا من تذكّر أشكال dispatch</li>
<li><strong>إعادة هيكلة أسهل</strong>: انقل المكوّنات دون تحديث سلسلة الخصائص بالكامل</li>
<li><strong>أمان أنواع في كل مكان</strong>: يضمن TypeScript بقاء إجراءاتك وحالتك متزامنة</li>
<li><strong>قابلية الاختبار</strong>: خُطّافات السياق سهلة الاختبار بمعزلها</li>
</ul>
<p>يمكن تنفيذ الترحيل تدريجيًا، مكوّنًا تلو الآخر، دون كسر وظائفك القائمة. ابدأ بالمكوّنات التي تستخدم dispatch فعليًا، وتدرّج صعودًا في شجرة المكوّنات، ولا تنسَ تخزين قيم السياق ومنشئي الإجراءات مؤقتًا.</p>
<p>يعمل هذا النمط بشكل ممتاز مع حالة النماذج، وسلات التسوّق، ومصادقة المستخدم، وأي سيناريو آخر تجد نفسك فيه تمرّر دالة dispatch نفسها عبر عدّة طبقات من المكوّنات. تصبح مكوّناتك أكثر تركيزًا على مسؤولياتها الفعلية بدلًا من أن تصبح خدمات توصيل لدوال dispatch لا تستخدمها.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
