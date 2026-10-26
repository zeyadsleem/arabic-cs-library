const s="kinney",a="react-typescript",n="React مع TypeScript",l="updating-todos-optimistic",p="التحديثات المتفائلة",t=[{depth:2,id:"put-مقابل-patch-فهم-الفرق",text:"PUT مقابل PATCH: فهم الفرق"},{depth:2,id:"النمط-الأساسي-للتحديث",text:"النمط الأساسي للتحديث"},{depth:2,id:"التحديثات-المتفائلة-مع-التراجع",text:"التحديثات المتفائلة مع التراجع"},{depth:2,id:"التحرير-المضمن-باستخدام-typescript",text:"التحرير المضمّن باستخدام TypeScript"},{depth:2,id:"التحديثات-الدفعية",text:"التحديثات الدفعية"},{depth:2,id:"خطاف-مخصص-للتحديثات",text:"خُطّاف مخصّص للتحديثات"},{depth:2,id:"مثال-كامل",text:"مثال كامل"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"ما-التالي",text:"ما التالي؟"}],c=`<p>تحديث المهام هو النقطة التي تلتقي فيها تجربة المستخدم بالتعقيد التقني. يتوقّع المستخدمون تغذية راجعة فورية حين يعلّمون مهمة على أنها منجزة، لكن طلبات الشبكة تستغرق وقتًا. تحلّ التحديثات المتفائلة هذه المشكلة بتحديث واجهة المستخدم فورًا بينما يجري الطلب في الخلفية. يساعدنا TypeScript على تنفيذ هذا النمط بأمان، ويضمن تعاملنا مع حالتي النجاح والفشل على نحو سليم.</p>
<h2 id="put-مقابل-patch-فهم-الفرق">PUT مقابل PATCH: فهم الفرق</h2>
<p>قبل الغوص في الشيفرة، لنوضّح متى نستخدم PUT ومتى نستخدم PATCH:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// PUT: Replace entire resource</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PutTodoDTO</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// PATCH: Update specific fields</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PatchTodoDTO</span> {
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Example: Toggle completion with PATCH (more efficient)</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/todos/<span class="hljs-subst">\${todo.id}</span>\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> }),
  });
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
};

<span class="hljs-comment">// Example: Full update with PUT</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">updateEntireTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/todos/<span class="hljs-subst">\${todo.id}</span>\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(todo),
  });
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
};
</code></pre>
<h2 id="النمط-الأساسي-للتحديث">النمط الأساسي للتحديث</h2>
<p>لنبدأ بتحديث بسيط دون سلوك متفائل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">BasicTodoUpdater</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isUpdating, setIsUpdating] = useState&lt;<span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Load initial todos</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos?_limit=5&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setTodos);
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateTodo</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setIsUpdating</span>(id);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(updates),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to update todo&#x27;</span>);
      }

      <span class="hljs-keyword">const</span> <span class="hljs-attr">updatedTodo</span>: <span class="hljs-title class_">Todo</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-comment">// Update local state with server response</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === id ? updatedTodo : todo)));
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Update failed&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsUpdating</span>(<span class="hljs-literal">null</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleComplete</span> = (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
    <span class="hljs-title function_">updateTodo</span>(todo.<span class="hljs-property">id</span>, { <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
              <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleComplete(todo)}
              disabled={isUpdating === todo.id}
            /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
                <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isUpdating</span> === <span class="hljs-string">todo.id</span> ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
              }}
            &gt;</span>
              {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            {isUpdating === todo.id &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> Updating...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التحديثات-المتفائلة-مع-التراجع">التحديثات المتفائلة مع التراجع</h2>
<p>الآن لننفّذ تحديثات متفائلة تتراجع عند الفشل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">OptimisticUpdate</span> {
  <span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">previousState</span>: <span class="hljs-title class_">Todo</span>;
  <span class="hljs-attr">newState</span>: <span class="hljs-title class_">Todo</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimisticTodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [pendingUpdates, setPendingUpdates] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-title class_">OptimisticUpdate</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());
  <span class="hljs-keyword">const</span> [failedUpdates, setFailedUpdates] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateTodoOptimistically</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;</span>) =&gt; {
    <span class="hljs-comment">// Find current todo</span>
    <span class="hljs-keyword">const</span> currentTodo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === todoId);
    <span class="hljs-keyword">if</span> (!currentTodo) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Create optimistic state</span>
    <span class="hljs-keyword">const</span> optimisticTodo = { ...currentTodo, ...updates };

    <span class="hljs-comment">// Store the update for potential rollback</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">update</span>: <span class="hljs-title class_">OptimisticUpdate</span> = {
      todoId,
      <span class="hljs-attr">previousState</span>: currentTodo,
      <span class="hljs-attr">newState</span>: optimisticTodo,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    };

    <span class="hljs-title function_">setPendingUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(todoId, update));
    <span class="hljs-title function_">setFailedUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
      next.<span class="hljs-title function_">delete</span>(todoId);
      <span class="hljs-keyword">return</span> next;
    });

    <span class="hljs-comment">// Apply optimistic update immediately</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === todoId ? optimisticTodo : todo)));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(updates),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Update failed&#x27;</span>);
      }

      <span class="hljs-keyword">const</span> <span class="hljs-attr">serverTodo</span>: <span class="hljs-title class_">Todo</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-comment">// Update with server response</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === todoId ? serverTodo : todo)));

      <span class="hljs-comment">// Remove from pending</span>
      <span class="hljs-title function_">setPendingUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(todoId);
        <span class="hljs-keyword">return</span> next;
      });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Rollback on failure</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === todoId ? currentTodo : todo)));

      <span class="hljs-comment">// Mark as failed</span>
      <span class="hljs-title function_">setFailedUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(todoId));

      <span class="hljs-comment">// Remove from pending</span>
      <span class="hljs-title function_">setPendingUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(todoId);
        <span class="hljs-keyword">return</span> next;
      });

      <span class="hljs-comment">// Optionally, auto-retry after delay</span>
      <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setFailedUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
          next.<span class="hljs-title function_">delete</span>(todoId);
          <span class="hljs-keyword">return</span> next;
        });
      }, <span class="hljs-number">3000</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleTodo</span> = (<span class="hljs-params"><span class="hljs-attr">todo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
    <span class="hljs-title function_">updateTodoOptimistically</span>(todo.<span class="hljs-property">id</span>, { <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">retryUpdate</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> update = pendingUpdates.<span class="hljs-title function_">get</span>(todoId);
    <span class="hljs-keyword">if</span> (update) {
      <span class="hljs-keyword">const</span> updates = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(update.<span class="hljs-property">newState</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, key</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> k = key <span class="hljs-keyword">as</span> keyof <span class="hljs-title class_">Todo</span>;
        <span class="hljs-keyword">if</span> (update.<span class="hljs-property">newState</span>[k] !== update.<span class="hljs-property">previousState</span>[k]) {
          acc[k] = update.<span class="hljs-property">newState</span>[k];
        }
        <span class="hljs-keyword">return</span> acc;
      }, {} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;);

      <span class="hljs-title function_">updateTodoOptimistically</span>(todoId, updates);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; {
          const isPending = pendingUpdates.has(todo.id);
          const hasFailed = failedUpdates.has(todo.id);

          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
              <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isPending</span> ? <span class="hljs-attr">0.7</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
                <span class="hljs-attr">color:</span> <span class="hljs-attr">hasFailed</span> ? &#x27;<span class="hljs-attr">red</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">inherit</span>&#x27;,
              }}
            &gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo)} /&gt;
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
                <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                  <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
                }}
              &gt;</span>
                {todo.title}
              <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
              {isPending &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> ⏳<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
              {hasFailed &amp;&amp; (
                <span class="hljs-tag">&lt;&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> ❌ Failed<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> retryUpdate(todo.id)}&gt;Retry<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/&gt;</span>
              )}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          );
        })}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    &lt;/div&gt;
  );
}
</code></pre>
<h2 id="التحرير-المضمن-باستخدام-typescript">التحرير المضمّن باستخدام TypeScript</h2>
<p>نفّذ تحريرًا مضمّنًا مع سلامة أنواع سليمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">EditableTodo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">isEditing</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">editText</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">InlineEditTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">EditableTodo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [savingIds, setSavingIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">startEditing</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">isEditing</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">editText</span>: todo.<span class="hljs-property">title</span> } : todo,
      ),
    );
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">cancelEditing</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">isEditing</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">editText</span>: <span class="hljs-literal">undefined</span> } : todo,
      ),
    );
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateEditText</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === todoId ? { ...todo, <span class="hljs-attr">editText</span>: text } : todo)),
    );
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">saveEdit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> todo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === todoId);
    <span class="hljs-keyword">if</span> (!todo || !todo.<span class="hljs-property">editText</span>?.<span class="hljs-title function_">trim</span>()) {
      <span class="hljs-title function_">cancelEditing</span>(todoId);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> newTitle = todo.<span class="hljs-property">editText</span>.<span class="hljs-title function_">trim</span>();

    <span class="hljs-comment">// Optimistically update</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
        t.<span class="hljs-property">id</span> === todoId ? { ...t, <span class="hljs-attr">title</span>: newTitle, <span class="hljs-attr">isEditing</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">editText</span>: <span class="hljs-literal">undefined</span> } : t,
      ),
    );

    <span class="hljs-title function_">setSavingIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(todoId));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">title</span>: newTitle }),
      });

      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to save&#x27;</span>);
      }

      <span class="hljs-keyword">const</span> <span class="hljs-attr">updated</span>: <span class="hljs-title class_">Todo</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> (t.<span class="hljs-property">id</span> === todoId ? { ...updated, <span class="hljs-attr">isEditing</span>: <span class="hljs-literal">false</span> } : t)));
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Rollback</span>
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
          t.<span class="hljs-property">id</span> === todoId ? { ...t, <span class="hljs-attr">title</span>: todo.<span class="hljs-property">title</span>, <span class="hljs-attr">isEditing</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">editText</span>: <span class="hljs-literal">undefined</span> } : t,
        ),
      );

      <span class="hljs-title function_">alert</span>(<span class="hljs-string">&#x27;Failed to save. Please try again.&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setSavingIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
        next.<span class="hljs-title function_">delete</span>(todoId);
        <span class="hljs-keyword">return</span> next;
      });
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; {
          const isSaving = savingIds.has(todo.id);

          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
                <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                  /* toggle handler */
                }}
              /&gt;

              {todo.isEditing ? (
                <span class="hljs-tag">&lt;&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                    <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
                    <span class="hljs-attr">value</span>=<span class="hljs-string">{todo.editText</span> || &#x27;&#x27;}
                    <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateEditText(todo.id, e.target.value)}
                    onKeyDown={(e) =&gt; {
                      if (e.key === &#x27;Enter&#x27;) saveEdit(todo.id);
                      if (e.key === &#x27;Escape&#x27;) cancelEditing(todo.id);
                    }}
                    disabled={isSaving}
                    autoFocus
                  /&gt;
                  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> saveEdit(todo.id)} disabled={isSaving}&gt;
                    {isSaving ? &#x27;💾&#x27; : &#x27;✓&#x27;}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> cancelEditing(todo.id)} disabled={isSaving}&gt;
                    ✗
                  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;/&gt;</span>
              ) : (
                <span class="hljs-tag">&lt;&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
                    <span class="hljs-attr">onDoubleClick</span>=<span class="hljs-string">{()</span> =&gt;</span> startEditing(todo.id)}
                    style={{
                      textDecoration: todo.completed ? &#x27;line-through&#x27; : &#x27;none&#x27;,
                      cursor: &#x27;text&#x27;,
                    }}
                  &gt;
                    {todo.title}
                  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                  {isSaving &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> 💾<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
                <span class="hljs-tag">&lt;/&gt;</span>
              )}
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
          );
        })}
      &lt;/ul&gt;
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;hint&quot;</span>&gt;</span>Double-click to edit<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;/div&gt;
  );
}
</code></pre>
<h2 id="التحديثات-الدفعية">التحديثات الدفعية</h2>
<p>أحيانًا تحتاج إلى تحديث عدة مهام دفعة واحدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">BatchUpdateOperation</span> {
  <span class="hljs-attr">ids</span>: <span class="hljs-built_in">number</span>[];
  <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">BatchUpdateTodos</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [selectedIds, setSelectedIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  <span class="hljs-keyword">const</span> [isBatchUpdating, setIsBatchUpdating] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleSelection</span> = (<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
      <span class="hljs-keyword">if</span> (next.<span class="hljs-title function_">has</span>(todoId)) {
        next.<span class="hljs-title function_">delete</span>(todoId);
      } <span class="hljs-keyword">else</span> {
        next.<span class="hljs-title function_">add</span>(todoId);
      }
      <span class="hljs-keyword">return</span> next;
    });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">selectAll</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(todos.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span>)));
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deselectAll</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">batchUpdate</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">operation</span>: <span class="hljs-title class_">BatchUpdateOperation</span></span>) =&gt; {
    <span class="hljs-keyword">if</span> (operation.<span class="hljs-property">ids</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-title function_">setIsBatchUpdating</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Store original states for rollback</span>
    <span class="hljs-keyword">const</span> originalStates = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-title class_">Todo</span>&gt;();
    operation.<span class="hljs-property">ids</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> todo = todos.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-property">id</span> === id);
      <span class="hljs-keyword">if</span> (todo) originalStates.<span class="hljs-title function_">set</span>(id, todo);
    });

    <span class="hljs-comment">// Apply optimistic updates</span>
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span>
        operation.<span class="hljs-property">ids</span>.<span class="hljs-title function_">includes</span>(todo.<span class="hljs-property">id</span>) ? { ...todo, ...operation.<span class="hljs-property">updates</span> } : todo,
      ),
    );

    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">allSettled</span>(
      operation.<span class="hljs-property">ids</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span>
        <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
          <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
          <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
          <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(operation.<span class="hljs-property">updates</span>),
        }).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (!res.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to update todo <span class="hljs-subst">\${id}</span>\`</span>);
          <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">json</span>();
        }),
      ),
    );

    <span class="hljs-comment">// Process results</span>
    <span class="hljs-keyword">const</span> successIds = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;();
    <span class="hljs-keyword">const</span> failedIds = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;();

    results.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">result, index</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> todoId = operation.<span class="hljs-property">ids</span>[index];
      <span class="hljs-keyword">if</span> (result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;fulfilled&#x27;</span>) {
        successIds.<span class="hljs-title function_">add</span>(todoId);
      } <span class="hljs-keyword">else</span> {
        failedIds.<span class="hljs-title function_">add</span>(todoId);
      }
    });

    <span class="hljs-comment">// Rollback failed updates</span>
    <span class="hljs-keyword">if</span> (failedIds.<span class="hljs-property">size</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
        prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (failedIds.<span class="hljs-title function_">has</span>(todo.<span class="hljs-property">id</span>)) {
            <span class="hljs-keyword">const</span> original = originalStates.<span class="hljs-title function_">get</span>(todo.<span class="hljs-property">id</span>);
            <span class="hljs-keyword">return</span> original || todo;
          }
          <span class="hljs-keyword">return</span> todo;
        }),
      );

      <span class="hljs-title function_">alert</span>(<span class="hljs-string">\`Failed to update <span class="hljs-subst">\${failedIds.size}</span> todo(s)\`</span>);
    }

    <span class="hljs-title function_">setIsBatchUpdating</span>(<span class="hljs-literal">false</span>);
    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">markSelectedComplete</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">batchUpdate</span>({
      <span class="hljs-attr">ids</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(selectedIds),
      <span class="hljs-attr">updates</span>: { <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> },
    });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">markSelectedIncomplete</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">batchUpdate</span>({
      <span class="hljs-attr">ids</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(selectedIds),
      <span class="hljs-attr">updates</span>: { <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span> },
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;batch-controls&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{selectAll}</span>&gt;</span>Select All<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{deselectAll}</span>&gt;</span>Deselect All<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{markSelectedComplete}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{selectedIds.size</span> === <span class="hljs-string">0</span> || <span class="hljs-attr">isBatchUpdating</span>}&gt;</span>
          Mark Complete ({selectedIds.size})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{markSelectedIncomplete}</span>
          <span class="hljs-attr">disabled</span>=<span class="hljs-string">{selectedIds.size</span> === <span class="hljs-string">0</span> || <span class="hljs-attr">isBatchUpdating</span>}
        &gt;</span>
          Mark Incomplete ({selectedIds.size})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {isBatchUpdating &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Updating selected todos...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
              <span class="hljs-attr">checked</span>=<span class="hljs-string">{selectedIds.has(todo.id)}</span>
              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleSelection(todo.id)}
              disabled={isBatchUpdating}
            /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
              <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> {
                /* individual toggle */
              }}
              disabled={isBatchUpdating}
            /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
                <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isBatchUpdating</span> &amp;&amp; <span class="hljs-attr">selectedIds.has</span>(<span class="hljs-attr">todo.id</span>) ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
              }}
            &gt;</span>
              {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="خطاف-مخصص-للتحديثات">خُطّاف مخصّص للتحديثات</h2>
<p>لنغلّق منطق التحديث في خُطّاف قابل لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseOptimisticUpdateOptions</span>&lt;T&gt; {
  <span class="hljs-attr">onSuccess</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">retryCount</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> useOptimisticUpdate&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span> }&gt;(
  <span class="hljs-attr">items</span>: T[],
  <span class="hljs-attr">setItems</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">Dispatch</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SetStateAction</span>&lt;T[]&gt;&gt;,
  <span class="hljs-attr">updateFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;,
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">UseOptimisticUpdateOptions</span>&lt;T&gt; = {},
) {
  <span class="hljs-keyword">const</span> [pendingUpdates, setPendingUpdates] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
  <span class="hljs-keyword">const</span> [failedUpdates, setFailedUpdates] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-title class_">Error</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-keyword">const</span> update = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt;) =&gt; {
      <span class="hljs-keyword">const</span> item = items.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> === id);
      <span class="hljs-keyword">if</span> (!item) <span class="hljs-keyword">return</span>;

      <span class="hljs-comment">// Clear any previous errors</span>
      <span class="hljs-title function_">setFailedUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(id);
        <span class="hljs-keyword">return</span> next;
      });

      <span class="hljs-comment">// Mark as pending</span>
      <span class="hljs-title function_">setPendingUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(id));

      <span class="hljs-comment">// Apply optimistic update</span>
      <span class="hljs-keyword">const</span> optimisticItem = { ...item, ...updates };
      <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> (i.<span class="hljs-property">id</span> === id ? optimisticItem : i)));

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> updated = <span class="hljs-keyword">await</span> <span class="hljs-title function_">updateFn</span>(id, updates);

        <span class="hljs-comment">// Apply server response</span>
        <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> (i.<span class="hljs-property">id</span> === id ? updated : i)));

        options.<span class="hljs-property">onSuccess</span>?.(updated);
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-comment">// Rollback</span>
        <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> (i.<span class="hljs-property">id</span> === id ? item : i)));

        <span class="hljs-keyword">const</span> err = error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Update failed&#x27;</span>);
        <span class="hljs-title function_">setFailedUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(id, err));

        options.<span class="hljs-property">onError</span>?.(err, item);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setPendingUpdates</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
          next.<span class="hljs-title function_">delete</span>(id);
          <span class="hljs-keyword">return</span> next;
        });
      }
    },
    [items, setItems, updateFn, options],
  );

  <span class="hljs-keyword">const</span> retry = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> error = failedUpdates.<span class="hljs-title function_">get</span>(id);
      <span class="hljs-keyword">if</span> (error) {
        <span class="hljs-comment">// Find the item and retry with same updates</span>
        <span class="hljs-keyword">const</span> item = items.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">id</span> === id);
        <span class="hljs-keyword">if</span> (item) {
          <span class="hljs-comment">// You&#x27;d need to store the original updates to retry properly</span>
          <span class="hljs-comment">// This is simplified</span>
          <span class="hljs-title function_">update</span>(id, {});
        }
      }
    },
    [failedUpdates, items, update],
  );

  <span class="hljs-keyword">return</span> {
    update,
    retry,
    <span class="hljs-attr">isPending</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> pendingUpdates.<span class="hljs-title function_">has</span>(id),
    <span class="hljs-attr">hasError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> failedUpdates.<span class="hljs-title function_">has</span>(id),
    <span class="hljs-attr">getError</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> failedUpdates.<span class="hljs-title function_">get</span>(id),
    <span class="hljs-attr">pendingCount</span>: pendingUpdates.<span class="hljs-property">size</span>,
    <span class="hljs-attr">errorCount</span>: failedUpdates.<span class="hljs-property">size</span>,
  };
}
</code></pre>
<h2 id="مثال-كامل">مثال كامل</h2>
<p>إليك كل شيء مجتمعةً:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CompleteTodoUpdater</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> updateTodo = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Todo</span>&gt;): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Todo</span>&gt; =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PATCH&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(updates),
    });

    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Update failed&#x27;</span>);
    <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
  };

  <span class="hljs-keyword">const</span> { update, retry, isPending, hasError, getError, pendingCount, errorCount } =
    <span class="hljs-title function_">useOptimisticUpdate</span>(todos, setTodos, updateTodo, {
      <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Updated:&#x27;</span>, todo),
      <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error, todo</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to update:&#x27;</span>, todo, error),
    });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;status-bar&quot;</span>&gt;</span>
        {pendingCount &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>⏳ {pendingCount} pending<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
        {errorCount &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>❌ {errorCount} failed<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
            <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span>
            <span class="hljs-attr">onToggle</span>=<span class="hljs-string">{()</span> =&gt;</span> update(todo.id, { completed: !todo.completed })}
            onEdit={(title) =&gt; update(todo.id, { title })}
            isPending={isPending(todo.id)}
            hasError={hasError(todo.id)}
            error={getError(todo.id)}
            onRetry={() =&gt; retry(todo.id)}
          /&gt;
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>نفّذ التراجع دائمًا</strong> — يمكن أن تفشل طلبات الشبكة</li>
<li><strong>اعرض تغذية راجعة بصرية</strong> — يحتاج المستخدمون إلى معرفة ما يحدث</li>
<li><strong>استخدم PATCH للتحديثات الجزئية</strong> — أكثر كفاءة من PUT</li>
<li><strong>استخدم الدفعات كلما أمكن</strong> — قلّل عدد طلبات الشبكة</li>
<li><strong>تعامل مع سباقات الطلبات</strong> — ألغِ التحديثات القديمة أو تجاهلها</li>
</ol>
<h2 id="الخلاصة">الخلاصة</h2>
<p>توفّر التحديثات المتفائلة تغذية راجعة فورية مع الحفاظ على سلامة البيانات. المفاهيم الأساسية:</p>
<ul>
<li>تحديثات فورية لواجهة المستخدم مع مزامنة في الخلفية</li>
<li>التراجع عند الفشل</li>
<li>تغذية راجعة بصرية أثناء التحديثات</li>
<li>عمليات دفعية من أجل الكفاءة</li>
<li>أنواع TypeScript سليمة في كل مكان</li>
</ul>
<h2 id="ما-التالي">ما التالي؟</h2>
<p>لنُكمل عمليات CRUD بتنفيذ DELETE مع تنظيف سليم للحالة.</p>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
