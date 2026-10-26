const s="kinney",a="react-typescript",n="React مع TypeScript",l="full-crud-todo-app",t="تطبيق مهام كامل بعمليات CRUD — تجميع كل شيء",p=[{depth:2,id:"إعداد-المشروع-والأنواع",text:"إعداد المشروع والأنواع"},{depth:2,id:"طبقة-خدمة-الـ-api",text:"طبقة خدمة الـ API"},{depth:2,id:"المكون-الرئيسي-لتطبيق-المهام",text:"المكوّن الرئيسي لتطبيق المهام"},{depth:2,id:"المكونات-الأساسية",text:"المكوّنات الأساسية"},{depth:3,id:"نموذج-إنشاء-المهمة",text:"نموذج إنشاء المهمة"},{depth:3,id:"عنصر-قائمة-المهام",text:"عنصر قائمة المهام"},{depth:3,id:"شريط-التصفية",text:"شريط التصفية"},{depth:2,id:"الخطافات-المخصصة",text:"الخُطّافات المخصّصة"},{depth:3,id:"خطاف-usetodostate",text:"خُطّاف useTodoState"},{depth:3,id:"خطاف-usedebounce",text:"خُطّاف useDebounce"},{depth:2,id:"التنسيق-css-modules",text:"التنسيق (CSS Modules)"},{depth:2,id:"الاختبارات",text:"الاختبارات"},{depth:2,id:"تحسينات-الأداء",text:"تحسينات الأداء"},{depth:2,id:"اعتبارات-النشر",text:"اعتبارات النشر"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"ما-تعلمته",text:"ما تعلمته"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>حان الوقت لتجميع كل ما تعلمناه معاً. لقد تعلمنا كيفية إنشاء المهام وقراءتها وتحديثها وحذفها باستخدام TypeScript. والآن دعونا نبني تطبيق مهام كاملاً جاهزاً للإنتاج يجمع بين كل هذه العمليات مع إدارة حالة سليمة ومعالجة للأخطاء وتجربة مستخدم رائعة.</p>
<p>هذه ذروة كل ما تعلمناه — تطبيق واقعي يضم كل الميزات التي يتوقعها المستخدمون.</p>
<h2 id="إعداد-المشروع-والأنواع">إعداد المشروع والأنواع</h2>
<p>أولاً، دعونا نعرّف نظام الأنواع الشامل الخاص بنا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Core todo type matching JSONPlaceholder API</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Extended todo with local state</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LocalTodo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">isOptimistic</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isDeleting</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isUpdating</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>?: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">updatedAt</span>?: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-comment">// API response types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Filter and sort options</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FilterStatus</span> = <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SortField</span> = <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;title&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span> | <span class="hljs-string">&#x27;createdAt&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SortOrder</span> = <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoFilters</span> {
  <span class="hljs-attr">status</span>: <span class="hljs-title class_">FilterStatus</span>;
  <span class="hljs-attr">search</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sortBy</span>: <span class="hljs-title class_">SortField</span>;
  <span class="hljs-attr">sortOrder</span>: <span class="hljs-title class_">SortOrder</span>;
}

<span class="hljs-comment">// App state</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppState</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">LocalTodo</span>[];
  <span class="hljs-attr">filters</span>: <span class="hljs-title class_">TodoFilters</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">selectedIds</span>: <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;;
  <span class="hljs-attr">undoStack</span>: <span class="hljs-title class_">LocalTodo</span>[];
}
</code></pre>
<h2 id="طبقة-خدمة-الـ-api">طبقة خدمة الـ API</h2>
<p>أنشئ طبقة خدمة لجميع عمليات الـ API:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">TodoAPI</span> {
  <span class="hljs-keyword">private</span> baseURL = <span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com&#x27;</span>;

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">fetchTodos</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Todo</span>[]&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.baseURL}</span>/todos\`</span>);
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch todos&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">createTodo</span>(<span class="hljs-attr">data</span>: <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">Todo</span>, <span class="hljs-string">&#x27;id&#x27;</span>&gt;): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Todo</span>&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.baseURL}</span>/todos\`</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(data),
    });
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to create todo&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">updateTodo</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Todo</span>&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.baseURL}</span>/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(updates),
    });
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to update todo&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">deleteTodo</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.baseURL}</span>/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
    });
    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to delete todo&#x27;</span>);
  }
}

<span class="hljs-keyword">const</span> todoAPI = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TodoAPI</span>();
</code></pre>
<h2 id="المكون-الرئيسي-لتطبيق-المهام">المكوّن الرئيسي لتطبيق المهام</h2>
<p>والآن التطبيق الرئيسي مع جميع عمليات CRUD:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">LocalTodo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [filters, setFilters] = useState&lt;<span class="hljs-title class_">TodoFilters</span>&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;all&#x27;</span>,
    <span class="hljs-attr">search</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">sortBy</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
    <span class="hljs-attr">sortOrder</span>: <span class="hljs-string">&#x27;asc&#x27;</span>,
  });
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [selectedIds, setSelectedIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  <span class="hljs-keyword">const</span> [undoStack, setUndoStack] = useState&lt;<span class="hljs-title class_">LocalTodo</span>[]&gt;([]);

  <span class="hljs-comment">// Load todos on mount</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">loadTodos</span>();
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadTodos</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> todoAPI.<span class="hljs-title function_">fetchTodos</span>();
      <span class="hljs-title function_">setTodos</span>(
        data.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> ({
          ...todo,
          <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
          <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
        })),
      );
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Failed to load todos&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-comment">// CREATE</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">createTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!title.<span class="hljs-title function_">trim</span>()) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> tempId = -<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> <span class="hljs-attr">optimisticTodo</span>: <span class="hljs-title class_">LocalTodo</span> = {
      <span class="hljs-attr">id</span>: tempId,
      <span class="hljs-attr">userId</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">title</span>: title.<span class="hljs-title function_">trim</span>(),
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">isOptimistic</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
      <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
    };

    <span class="hljs-comment">// Add optimistic todo</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [optimisticTodo, ...prev]);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> created = <span class="hljs-keyword">await</span> todoAPI.<span class="hljs-title function_">createTodo</span>({
        <span class="hljs-attr">userId</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">title</span>: title.<span class="hljs-title function_">trim</span>(),
        <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
      });

      <span class="hljs-comment">// Replace optimistic with real</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === tempId
            ? { ...created, <span class="hljs-attr">createdAt</span>: optimisticTodo.<span class="hljs-property">createdAt</span>, <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() }
            : todo,
        ),
      );
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-comment">// Remove optimistic on failure</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">id</span> !== tempId));
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Failed to create todo&#x27;</span>);
    }
  };

  <span class="hljs-comment">// UPDATE</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">const</span> originalTodo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === id);
    <span class="hljs-keyword">if</span> (!originalTodo) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Optimistic update</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === id ? { ...todo, ...updates, <span class="hljs-attr">isUpdating</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() } : todo,
      ),
    );

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> updated = <span class="hljs-keyword">await</span> todoAPI.<span class="hljs-title function_">updateTodo</span>(id, updates);

      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === id ? { ...updated, <span class="hljs-attr">isUpdating</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() } : todo,
        ),
      );
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-comment">// Rollback on failure</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === id ? { ...originalTodo, <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Update failed&#x27;</span> } : todo)),
      );
    }
  };

  <span class="hljs-comment">// DELETE</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> todoToDelete = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === id);
    <span class="hljs-keyword">if</span> (!todoToDelete) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Add to undo stack</span>
    <span class="hljs-title function_">setUndoStack</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, todoToDelete]);

    <span class="hljs-comment">// Mark as deleting</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === id ? { ...todo, <span class="hljs-attr">isDeleting</span>: <span class="hljs-literal">true</span> } : todo)));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> todoAPI.<span class="hljs-title function_">deleteTodo</span>(id);

      <span class="hljs-comment">// Remove from todos</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">id</span> !== id));

      <span class="hljs-comment">// Auto-clear undo after 5 seconds</span>
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setUndoStack</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> !== id));
      }, <span class="hljs-number">5000</span>);
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-comment">// Restore on failure</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
          todo.<span class="hljs-property">id</span> === id ? { ...todoToDelete, <span class="hljs-attr">isDeleting</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Delete failed&#x27;</span> } : todo,
        ),
      );
    }
  };

  <span class="hljs-comment">// UNDO DELETE</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">undoDelete</span> = (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">LocalTodo</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, { ...todo, <span class="hljs-attr">isDeleting</span>: <span class="hljs-literal">false</span> }].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>));
    <span class="hljs-title function_">setUndoStack</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> !== todo.<span class="hljs-property">id</span>));
  };

  <span class="hljs-comment">// BATCH OPERATIONS</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleSelected</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> todosToToggle = todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> selectedIds.<span class="hljs-title function_">has</span>(t.<span class="hljs-property">id</span>));
    <span class="hljs-keyword">const</span> newCompletedState = !todosToToggle.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">completed</span>);

    <span class="hljs-comment">// Optimistic update all selected</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        selectedIds.<span class="hljs-title function_">has</span>(todo.<span class="hljs-property">id</span>)
          ? { ...todo, <span class="hljs-attr">completed</span>: newCompletedState, <span class="hljs-attr">isUpdating</span>: <span class="hljs-literal">true</span> }
          : todo,
      ),
    );

    <span class="hljs-comment">// Update each on server</span>
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">allSettled</span>(
      <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(selectedIds).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> todoAPI.<span class="hljs-title function_">updateTodo</span>(id, { <span class="hljs-attr">completed</span>: newCompletedState })),
    );

    <span class="hljs-comment">// Handle results</span>
    results.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">result, index</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> todoId = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(selectedIds)[index];
      <span class="hljs-keyword">if</span> (result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span>) {
        <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
          prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
            todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">isUpdating</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">updatedAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() } : todo,
          ),
        );
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
          prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
            todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">isUpdating</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Update failed&#x27;</span> } : todo,
          ),
        );
      }
    });

    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteSelected</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (selectedIds.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> confirmed = <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">confirm</span>(
      <span class="hljs-string">\`Delete <span class="hljs-subst">\${selectedIds.size}</span> todo<span class="hljs-subst">\${selectedIds.size &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">&#x27;s&#x27;</span> : <span class="hljs-string">&#x27;&#x27;</span>}</span>?\`</span>,
    );

    <span class="hljs-keyword">if</span> (!confirmed) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> id <span class="hljs-keyword">of</span> selectedIds) {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">deleteTodo</span>(id);
    }

    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  };

  <span class="hljs-comment">// FILTERING AND SORTING</span>
  <span class="hljs-keyword">const</span> filteredAndSortedTodos = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> result = [...todos];

    <span class="hljs-comment">// Filter by status</span>
    <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;active&#x27;</span>) {
      result = result.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> !t.<span class="hljs-property">completed</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;completed&#x27;</span>) {
      result = result.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">completed</span>);
    }

    <span class="hljs-comment">// Filter by search</span>
    <span class="hljs-keyword">if</span> (filters.<span class="hljs-property">search</span>) {
      <span class="hljs-keyword">const</span> searchLower = filters.<span class="hljs-property">search</span>.<span class="hljs-title function_">toLowerCase</span>();
      result = result.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">title</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchLower));
    }

    <span class="hljs-comment">// Sort</span>
    result.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> compareValue = <span class="hljs-number">0</span>;

      <span class="hljs-keyword">switch</span> (filters.<span class="hljs-property">sortBy</span>) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;title&#x27;</span>:
          compareValue = a.<span class="hljs-property">title</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">title</span>);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;completed&#x27;</span>:
          compareValue = <span class="hljs-title class_">Number</span>(a.<span class="hljs-property">completed</span>) - <span class="hljs-title class_">Number</span>(b.<span class="hljs-property">completed</span>);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;createdAt&#x27;</span>:
          compareValue = (a.<span class="hljs-property">createdAt</span>?.<span class="hljs-title function_">getTime</span>() || <span class="hljs-number">0</span>) - (b.<span class="hljs-property">createdAt</span>?.<span class="hljs-title function_">getTime</span>() || <span class="hljs-number">0</span>);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-attr">default</span>:
          compareValue = a.<span class="hljs-property">id</span> - b.<span class="hljs-property">id</span>;
      }

      <span class="hljs-keyword">return</span> filters.<span class="hljs-property">sortOrder</span> === <span class="hljs-string">&#x27;asc&#x27;</span> ? compareValue : -compareValue;
    });

    <span class="hljs-keyword">return</span> result;
  }, [todos, filters]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;todo-app&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">CreateTodoForm</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{createTodo}</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">FilterBar</span>
        <span class="hljs-attr">filters</span>=<span class="hljs-string">{filters}</span>
        <span class="hljs-attr">onFilterChange</span>=<span class="hljs-string">{setFilters}</span>
        <span class="hljs-attr">todoCount</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">total:</span> <span class="hljs-attr">todos.length</span>,
          <span class="hljs-attr">active:</span> <span class="hljs-attr">todos.filter</span>((<span class="hljs-attr">t</span>) =&gt;</span> !t.completed).length,
          completed: todos.filter((t) =&gt; t.completed).length,
        }}
      /&gt;

      {selectedIds.size &gt; 0 &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">BulkActions</span>
          <span class="hljs-attr">selectedCount</span>=<span class="hljs-string">{selectedIds.size}</span>
          <span class="hljs-attr">onToggleComplete</span>=<span class="hljs-string">{toggleSelected}</span>
          <span class="hljs-attr">onDelete</span>=<span class="hljs-string">{deleteSelected}</span>
          <span class="hljs-attr">onClear</span>=<span class="hljs-string">{()</span> =&gt;</span> setSelectedIds(new Set())}
        /&gt;
      )}

      {isLoading ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">LoadingSpinner</span> /&gt;</span>
      ) : error ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{error}</span> <span class="hljs-attr">onRetry</span>=<span class="hljs-string">{loadTodos}</span> /&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoList</span>
          <span class="hljs-attr">todos</span>=<span class="hljs-string">{filteredAndSortedTodos}</span>
          <span class="hljs-attr">selectedIds</span>=<span class="hljs-string">{selectedIds}</span>
          <span class="hljs-attr">onToggleSelect</span>=<span class="hljs-string">{(id)</span> =&gt;</span> {
            setSelectedIds((prev) =&gt; {
              const next = new Set(prev);
              if (next.has(id)) {
                next.delete(id);
              } else {
                next.add(id);
              }
              return next;
            });
          }}
          onToggleComplete={(id) =&gt;
            updateTodo(id, {
              completed: !todos.find((t) =&gt; t.id === id)?.completed,
            })
          }
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        /&gt;
      )}

      {undoStack.length &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">UndoNotification</span> <span class="hljs-attr">todos</span>=<span class="hljs-string">{undoStack}</span> <span class="hljs-attr">onUndo</span>=<span class="hljs-string">{undoDelete}</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="المكونات-الأساسية">المكوّنات الأساسية</h2>
<h3 id="نموذج-إنشاء-المهمة">نموذج إنشاء المهمة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CreateTodoFormProps</span> {
  <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CreateTodoForm</span>(<span class="hljs-params">{ onSubmit }: <span class="hljs-title class_">CreateTodoFormProps</span></span>) {
  <span class="hljs-keyword">const</span> [title, setTitle] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [error, setError] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();

    <span class="hljs-keyword">if</span> (!title.<span class="hljs-title function_">trim</span>()) {
      <span class="hljs-title function_">setError</span>(<span class="hljs-string">&#x27;Title is required&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">if</span> (title.<span class="hljs-property">length</span> &lt; <span class="hljs-number">3</span>) {
      <span class="hljs-title function_">setError</span>(<span class="hljs-string">&#x27;Title must be at least 3 characters&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-title function_">onSubmit</span>(title);
    <span class="hljs-title function_">setTitle</span>(<span class="hljs-string">&#x27;&#x27;</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;create-todo-form&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{title}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
          setTitle(e.target.value);
          setError(&#x27;&#x27;);
        }}
        placeholder=&quot;What needs to be done?&quot;
        className={error ? &#x27;error&#x27; : &#x27;&#x27;}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Add Todo<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error-text&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="عنصر-قائمة-المهام">عنصر قائمة المهام</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoListItemProps</span> {
  <span class="hljs-attr">todo</span>: <span class="hljs-title class_">LocalTodo</span>;
  <span class="hljs-attr">isSelected</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onToggleSelect</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onToggleComplete</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onUpdate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onDelete</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoListItem</span>(<span class="hljs-params">{
  todo,
  isSelected,
  onToggleSelect,
  onToggleComplete,
  onUpdate,
  onDelete,
}: <span class="hljs-title class_">TodoListItemProps</span></span>) {
  <span class="hljs-keyword">const</span> [isEditing, setIsEditing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [editTitle, setEditTitle] = <span class="hljs-title function_">useState</span>(todo.<span class="hljs-property">title</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSaveEdit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (editTitle.<span class="hljs-title function_">trim</span>() &amp;&amp; editTitle !== todo.<span class="hljs-property">title</span>) {
      <span class="hljs-title function_">onUpdate</span>({ <span class="hljs-attr">title</span>: editTitle.<span class="hljs-title function_">trim</span>() });
    }
    <span class="hljs-title function_">setIsEditing</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleCancelEdit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setEditTitle</span>(todo.<span class="hljs-property">title</span>);
    <span class="hljs-title function_">setIsEditing</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">todo-item</span> \${<span class="hljs-attr">todo.isOptimistic</span> ? &#x27;<span class="hljs-attr">optimistic</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;} \${
        <span class="hljs-attr">todo.isDeleting</span> ? &#x27;<span class="hljs-attr">deleting</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;
      }\`}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{isSelected}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{onToggleSelect}</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
        <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{onToggleComplete}</span>
        <span class="hljs-attr">disabled</span>=<span class="hljs-string">{todo.isUpdating}</span>
      /&gt;</span>

      {isEditing ? (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;edit-form&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{editTitle}</span>
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setEditTitle(e.target.value)}
            onKeyDown={(e) =&gt; {
              if (e.key === &#x27;Enter&#x27;) handleSaveEdit();
              if (e.key === &#x27;Escape&#x27;) handleCancelEdit();
            }}
            autoFocus
          /&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleSaveEdit}</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleCancelEdit}</span>&gt;</span>Cancel<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ) : (
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">title</span> \${<span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">completed</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}
          <span class="hljs-attr">onDoubleClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsEditing(true)}
        &gt;
          {todo.title}
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      )}

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;actions&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsEditing(true)}&gt;Edit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onDelete}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{todo.isDeleting}</span>&gt;</span>
          Delete
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {todo.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{todo.error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      {todo.isOptimistic &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;status&quot;</span>&gt;</span>Saving...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      {todo.isUpdating &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;status&quot;</span>&gt;</span>Updating...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      {todo.isDeleting &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;status&quot;</span>&gt;</span>Deleting...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="شريط-التصفية">شريط التصفية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FilterBarProps</span> {
  <span class="hljs-attr">filters</span>: <span class="hljs-title class_">TodoFilters</span>;
  <span class="hljs-attr">onFilterChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">filters</span>: <span class="hljs-title class_">TodoFilters</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">todoCount</span>: {
    <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">active</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">completed</span>: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FilterBar</span>(<span class="hljs-params">{ filters, onFilterChange, todoCount }: <span class="hljs-title class_">FilterBarProps</span></span>) {
  <span class="hljs-keyword">const</span> updateFilter = &lt;K <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">TodoFilters</span>&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">key</span>: K, <span class="hljs-attr">value</span>: <span class="hljs-title class_">TodoFilters</span>[K]</span>) =&gt;</span> {
    <span class="hljs-title function_">onFilterChange</span>({ ...filters, [key]: value });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;filter-bar&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;status-filters&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{filters.status</span> === <span class="hljs-string">&#x27;all&#x27;</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateFilter(&#x27;status&#x27;, &#x27;all&#x27;)}
        &gt;
          All ({todoCount.total})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{filters.status</span> === <span class="hljs-string">&#x27;active&#x27;</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateFilter(&#x27;status&#x27;, &#x27;active&#x27;)}
        &gt;
          Active ({todoCount.active})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{filters.status</span> === <span class="hljs-string">&#x27;completed&#x27;</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateFilter(&#x27;status&#x27;, &#x27;completed&#x27;)}
        &gt;
          Completed ({todoCount.completed})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;search&quot;</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Search todos...&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{filters.search}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateFilter(&#x27;search&#x27;, e.target.value)}
      /&gt;

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;sort-controls&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{filters.sortBy}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateFilter(&#x27;sortBy&#x27;, e.target.value as SortField)}
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;id&quot;</span>&gt;</span>Sort by ID<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Sort by Title<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;completed&quot;</span>&gt;</span>Sort by Status<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;createdAt&quot;</span>&gt;</span>Sort by Date<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> updateFilter(&#x27;sortOrder&#x27;, filters.sortOrder === &#x27;asc&#x27; ? &#x27;desc&#x27; : &#x27;asc&#x27;)}
        &gt;
          {filters.sortOrder === &#x27;asc&#x27; ? &#x27;↑&#x27; : &#x27;↓&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الخطافات-المخصصة">الخُطّافات المخصّصة</h2>
<h3 id="خطاف-usetodostate">خُطّاف useTodoState</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useTodoState</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">LocalTodo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> execute = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">operation</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;) =&gt; {
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">operation</span>();
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;An error occurred&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    }
  }, []);

  <span class="hljs-keyword">return</span> {
    todos,
    setTodos,
    isLoading,
    error,
    execute,
  };
}
</code></pre>
<h3 id="خطاف-usedebounce">خُطّاف useDebounce</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useDebounce&lt;T&gt;(<span class="hljs-attr">value</span>: T, <span class="hljs-attr">delay</span>: <span class="hljs-built_in">number</span>): T {
  <span class="hljs-keyword">const</span> [debouncedValue, setDebouncedValue] = useState&lt;T&gt;(value);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> handler = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setDebouncedValue</span>(value);
    }, delay);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearTimeout</span>(handler);
    };
  }, [value, delay]);

  <span class="hljs-keyword">return</span> debouncedValue;
}
</code></pre>
<h2 id="التنسيق-css-modules">التنسيق (CSS Modules)</h2>
<pre><code class="language-css"><span class="hljs-comment">/* TodoApp.module.css */</span>
<span class="hljs-selector-class">.todo-app</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">800px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">2rem</span>;
}

<span class="hljs-selector-class">.todo-item</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.3s</span> ease;
}

<span class="hljs-selector-class">.todo-item</span><span class="hljs-selector-class">.optimistic</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.6</span>;
}

<span class="hljs-selector-class">.todo-item</span><span class="hljs-selector-class">.deleting</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.3</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-<span class="hljs-number">10px</span>);
}

<span class="hljs-selector-class">.title</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">cursor</span>: text;
}

<span class="hljs-selector-class">.title</span><span class="hljs-selector-class">.completed</span> {
  <span class="hljs-attribute">text-decoration</span>: line-through;
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.6</span>;
}

<span class="hljs-selector-class">.filter-bar</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">gap</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">2rem</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#f5f5f5</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
}

<span class="hljs-selector-class">.status-filters</span> <span class="hljs-selector-tag">button</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.5rem</span> <span class="hljs-number">1rem</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
  <span class="hljs-attribute">background</span>: white;
  <span class="hljs-attribute">cursor</span>: pointer;
}

<span class="hljs-selector-class">.status-filters</span> <span class="hljs-selector-tag">button</span><span class="hljs-selector-class">.active</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#007bff</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#007bff</span>;
}

<span class="hljs-selector-class">.error</span> {
  <span class="hljs-attribute">color</span>: red;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.875rem</span>;
}

<span class="hljs-selector-class">.status</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
  <span class="hljs-attribute">font-style</span>: italic;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0.5rem</span>;
}
</code></pre>
<h2 id="الاختبارات">الاختبارات</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen, fireEvent, waitFor } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@testing-library/jest-dom&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;TodoApp&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;creates a todo optimistically&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoApp</span> /&gt;</span></span>);

    <span class="hljs-keyword">const</span> input = screen.<span class="hljs-title function_">getByPlaceholderText</span>(<span class="hljs-string">&#x27;What needs to be done?&#x27;</span>);
    <span class="hljs-keyword">const</span> button = screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Add Todo&#x27;</span>);

    fireEvent.<span class="hljs-title function_">change</span>(input, { <span class="hljs-attr">target</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;New Todo&#x27;</span> } });
    fireEvent.<span class="hljs-title function_">click</span>(button);

    <span class="hljs-comment">// Should show immediately (optimistic)</span>
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;New Todo&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Saving...&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

    <span class="hljs-comment">// Wait for server response</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">queryByText</span>(<span class="hljs-string">&#x27;Saving...&#x27;</span>)).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBeInTheDocument</span>();
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;handles delete with undo&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoApp</span> /&gt;</span></span>);

    <span class="hljs-comment">// Wait for todos to load</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Sample Todo&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });

    <span class="hljs-comment">// Delete a todo</span>
    <span class="hljs-keyword">const</span> deleteButton = screen.<span class="hljs-title function_">getAllByText</span>(<span class="hljs-string">&#x27;Delete&#x27;</span>)[<span class="hljs-number">0</span>];
    fireEvent.<span class="hljs-title function_">click</span>(deleteButton);

    <span class="hljs-comment">// Should show undo option</span>
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Undo&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

    <span class="hljs-comment">// Click undo</span>
    fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Undo&#x27;</span>));

    <span class="hljs-comment">// Todo should be restored</span>
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Sample Todo&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});
</code></pre>
<h2 id="تحسينات-الأداء">تحسينات الأداء</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Memoize expensive computations</span>
<span class="hljs-keyword">const</span> stats = <span class="hljs-title function_">useMemo</span>(
  <span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">total</span>: todos.<span class="hljs-property">length</span>,
    <span class="hljs-attr">completed</span>: todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span>,
    <span class="hljs-attr">active</span>: todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> !t.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span>,
    <span class="hljs-attr">percentComplete</span>:
      todos.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>
        ? <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>((todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span> / todos.<span class="hljs-property">length</span>) * <span class="hljs-number">100</span>)
        : <span class="hljs-number">0</span>,
  }),
  [todos],
);

<span class="hljs-comment">// Virtualize long lists</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">VirtualTodoList</span>(<span class="hljs-params">{ todos }: { todos: LocalTodo[] }</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style }: { index: <span class="hljs-built_in">number</span>; style: React.CSSProperties }</span>) =&gt; (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoListItem</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todos[index]}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">FixedSizeList</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{600}</span> <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{todos.length}</span> <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{80}</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>&gt;</span>
      {Row}
    <span class="hljs-tag">&lt;/<span class="hljs-name">FixedSizeList</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اعتبارات-النشر">اعتبارات النشر</h2>
<ol>
<li><strong>متغيرات البيئة</strong>: استخدم ملف <code>.env</code> لعناوين URL الخاصة بالـ API</li>
<li><strong>تتبّع الأخطاء</strong>: ادمج Sentry لالتقاط أخطاء بيئة الإنتاج</li>
<li><strong>التحليلات</strong>: تتبّع تفاعلات المستخدم</li>
<li><strong>PWA</strong>: أضف service worker للعمل دون اتصال</li>
<li><strong>SEO</strong>: أضف وسوم meta وبيانات منظّمة</li>
</ol>
<h2 id="الخلاصة">الخلاصة</h2>
<p>لقد بنينا تطبيق مهام كاملاً جاهزاً للإنتاج يتضمن:</p>
<ul>
<li>✅ عمليات CRUD كاملة (الإنشاء والقراءة والتحديث والحذف)</li>
<li>✅ تحديثات متفائلة لاستجابة فورية</li>
<li>✅ إمكانية التراجع عن عمليات الحذف</li>
<li>✅ عمليات دفعية لتحسين الكفاءة</li>
<li>✅ إمكانات البحث والتصفية والترتيب</li>
<li>✅ معالجة الأخطاء والاسترداد منها</li>
<li>✅ حالات تحميل وتغذية راجعة للمستخدم</li>
<li>✅ TypeScript في كل مكان لضمان أمان الأنواع</li>
<li>✅ بنية نظيفة مع طبقة خدمة</li>
<li>✅ مكوّنات وخُطّافات قابلة لإعادة الاستخدام</li>
<li>✅ تحسينات في الأداء</li>
<li>✅ اختبارات شاملة</li>
</ul>
<p>يستعرض هذا التطبيق تطوير React الواقعي مع TypeScript، ويوضح كيفية التعامل مع إدارة الحالة المعقّدة والعمليات غير المتزامنة وتفاعلات المستخدم بطريقة آمنة من ناحية الأنواع.</p>
<h2 id="ما-تعلمته">ما تعلمته</h2>
<p>من خلال هذه السلسلة، أتقنت:</p>
<ol>
<li><strong>useState مع TypeScript</strong> - استنتاج الأنواع والتحديد الصريح لها</li>
<li><strong>جلب البيانات</strong> - العمليات غير المتزامنة مع معالجة سليمة للأخطاء</li>
<li><strong>حالات التحميل</strong> - الأنواع الاتحادية المتمايزة (discriminated unions) لحالة غير متزامنة</li>
<li><strong>عمليات CRUD</strong> - أنماط الإنشاء والقراءة والتحديث والحذف</li>
<li><strong>التحديثات المتفائلة</strong> - استجابة فورية للواجهة مع إمكانية التراجع</li>
<li><strong>إدارة الحالة</strong> - حالة معقّدة مع TypeScript</li>
<li><strong>أنماط العالم الواقعي</strong> - بنية برمجية جاهزة للإنتاج</li>
</ol>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<ul>
<li>إضافة مصادقة ومهام خاصة بمستخدم معيّن</li>
<li>تنفيذ تحديثات فورية (real-time) باستخدام WebSockets</li>
<li>إضافة إعادة ترتيب بالسحب والإفلات</li>
<li>إنشاء تطبيق جوال باستخدام React Native</li>
<li>النشر إلى الإنتاج مع CI/CD</li>
</ul>
<p>تهانينا! أصبحت تملك الآن المعرفة اللازمة لبناء تطبيقات React جاهزة للإنتاج باستخدام TypeScript. الأنماط التي تعلمتها هنا تنطبق على أي تطبيق يعتمد على البيانات، وليس على المهام فقط.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
